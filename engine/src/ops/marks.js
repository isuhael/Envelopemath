// Marks on the paper: pen annotations, highlighter, rubber stamps, postmarks, postage, sticky notes.
import { createCanvas } from '@napi-rs/canvas'
import { font, ink, INK } from '../theme.js'
import { wobble, strokePartial, ellipsePts, handText } from '../ink.js'
import { wrap } from './text.js'
import { ease, prog, rng, hash, clamp, lerp } from '../util.js'

const shapes = new WeakMap()

function annotatePts(op) {
  if (shapes.has(op)) return shapes.get(op)
  const s = op.seed ?? hash(JSON.stringify([op.kind, op.x, op.y, op.from, op.to]))
  const r = rng(s)
  const pad = op.pad ?? 18
  let paths
  switch (op.kind) {
    case 'circle':
      paths = [ellipsePts(op.x + op.w / 2, op.y + op.h / 2, op.w / 2 + pad, op.h / 2 + pad, s)]
      break
    case 'underline':
      paths = [wobble([[op.x - 6, op.y + 4], [op.x + op.w + 6, op.y + (r() - 0.5) * 10]], s, 2.5, 10)]
      break
    case 'double':
      paths = [wobble([[op.x - 6, op.y], [op.x + op.w + 6, op.y + 3]], s, 2.5, 10), wobble([[op.x, op.y + 16], [op.x + op.w, op.y + 20]], s + 1, 2.5, 10)]
      break
    case 'strike':
      paths = [wobble([[op.x - 10, op.y + 6], [op.x + op.w + 10, op.y - 6]], s, 2, 10)]
      break
    case 'box':
      paths = [wobble([[op.x - pad, op.y - pad], [op.x + op.w + pad, op.y - pad + 4], [op.x + op.w + pad - 3, op.y + op.h + pad], [op.x - pad + 2, op.y + op.h + pad - 2], [op.x - pad + 4, op.y - pad - 6]], s, 3, 8)]
      break
    case 'check':
      paths = [wobble([[op.x, op.y + op.h * 0.55], [op.x + op.w * 0.38, op.y + op.h], [op.x + op.w, op.y]], s, 2, 6)]
      break
    case 'cross':
      paths = [wobble([[op.x, op.y], [op.x + op.w, op.y + op.h]], s, 2, 6), wobble([[op.x + op.w, op.y], [op.x, op.y + op.h]], s + 1, 2, 6)]
      break
    case 'arrow': {
      const [ax, ay] = op.from, [bx, by] = op.to
      const bend = op.bend ?? 0.25
      const mx = (ax + bx) / 2 - (by - ay) * bend, my = (ay + by) / 2 + (bx - ax) * bend
      const curve = []
      for (let i = 0; i <= 30; i++) {
        const k = i / 30
        curve.push([(1 - k) * (1 - k) * ax + 2 * (1 - k) * k * mx + k * k * bx, (1 - k) * (1 - k) * ay + 2 * (1 - k) * k * my + k * k * by])
      }
      const [px, py] = curve[27]
      const ang = Math.atan2(by - py, bx - px)
      const hl = op.head ?? 34
      paths = [wobble(curve, s, 1.5, 1), [[bx - Math.cos(ang - 0.5) * hl, by - Math.sin(ang - 0.5) * hl], [bx, by], [bx - Math.cos(ang + 0.5) * hl, by - Math.sin(ang + 0.5) * hl]]]
      break
    }
    default:
      throw new Error(`annotate: unknown kind "${op.kind}"`)
  }
  shapes.set(op, paths)
  return paths
}

/** annotate: hand-drawn circle / underline / double / strike / box / check / cross / arrow. */
export const annotate = {
  duration: op => op.dur,
  prepare(op) {
    op.dur ??= op.kind === 'arrow' ? 0.5 : 0.4
    op.color ??= 'red'
    op.width ??= 7
  },
  draw(g, op, lt) {
    const paths = annotatePts(op)
    const k = ease.out(prog(lt, 0, op.dur))
    const n = paths.length
    paths.forEach((p, i) => strokePartial(g, p, clamp(k * n - i), { color: op.color, width: op.width }))
  },
  sfx: op => [{ at: op.t, kind: 'scribble', dur: op.dur, n: 4 }],
}

/** highlight: a yellow marker swipe over a rect, left to right. */
export const highlight = {
  duration: op => op.dur,
  prepare(op) { op.dur ??= 0.35 },
  draw(g, op, lt) {
    const k = ease.out(prog(lt, 0, op.dur))
    if (k <= 0) return
    const r = rng(hash(`${op.x},${op.y}`))
    g.save()
    g.globalCompositeOperation = 'multiply'
    g.fillStyle = op.color ? ink(op.color) : INK.highlight
    const w = op.w * k
    g.beginPath()
    g.moveTo(op.x + r() * 8, op.y + r() * 6)
    g.lineTo(op.x + w, op.y + r() * 8)
    g.lineTo(op.x + w + (r() - 0.5) * 10, op.y + op.h - r() * 6)
    g.lineTo(op.x - r() * 6, op.y + op.h)
    g.closePath()
    g.fill()
    g.restore()
  },
  sfx: op => [{ at: op.t, kind: 'scribble', dur: op.dur, n: 2 }],
}

// Pre-render a distressed rubber-stamp impression once per op.
const stampCache = new WeakMap()
function stampImage(op) {
  if (stampCache.has(op)) return stampCache.get(op)
  const linesTxt = String(op.text).split('\n')
  const size = op.size
  const probe = createCanvas(10, 10).getContext('2d')
  probe.font = font('type', size)
  const tw = Math.max(...linesTxt.map(l => probe.measureText(l).width))
  const w = Math.ceil(tw + size * 1.1), h = Math.ceil(linesTxt.length * size * 1.15 + size * 0.9)
  const c = createCanvas(w + 20, h + 20)
  const g = c.getContext('2d')
  const col = ink(op.color)
  g.translate(10, 10)
  g.strokeStyle = col
  g.fillStyle = col
  g.lineWidth = Math.max(5, size * 0.09)
  g.strokeRect(4, 4, w - 8, h - 8)
  g.lineWidth = Math.max(2, size * 0.035)
  g.strokeRect(size * 0.2, size * 0.2, w - size * 0.4, h - size * 0.4)
  g.font = font('type', size)
  g.textAlign = 'center'
  g.textBaseline = 'middle'
  linesTxt.forEach((l, i) => g.fillText(l, w / 2, h / 2 + (i - (linesTxt.length - 1) / 2) * size * 1.12))
  // distress: knock out specks and a few dry streaks
  const r = rng(hash(op.text))
  g.globalCompositeOperation = 'destination-out'
  for (let i = 0; i < (w * h) / 260; i++) {
    g.globalAlpha = 0.4 + r() * 0.6
    g.beginPath(); g.arc(r() * w, r() * h, 0.6 + r() * 2.6, 0, Math.PI * 2); g.fill()
  }
  g.globalAlpha = 0.35
  for (let i = 0; i < 5; i++) {
    g.lineWidth = 2 + r() * 5
    g.beginPath(); const y = r() * h; g.moveTo(0, y); g.lineTo(w, y + (r() - 0.5) * 40); g.stroke()
  }
  stampCache.set(op, c)
  return c
}

/** stamp: a rubber-stamp verdict that slams onto the paper (and shakes the camera). */
export const stamp = {
  duration: () => 0.3,
  prepare(op) {
    op.size ??= 76
    op.color ??= 'red'
    op.rot ??= -8
  },
  draw(g, op, lt) {
    const img = stampImage(op)
    const k = prog(lt, 0, 0.28)
    const s = ease.slam(k)
    g.save()
    g.translate(op.x, op.y)
    g.rotate((op.rot * Math.PI) / 180)
    g.scale(s, s)
    g.globalAlpha *= clamp(k / 0.2) * (op.alpha ?? 0.9)
    g.drawImage(img, -img.width / 2, -img.height / 2)
    g.restore()
  },
  sfx: op => [{ at: op.t + 0.2, kind: 'stamp' }],
  shake: op => ({ at: op.t + 0.22, amp: op.shake ?? 16 }),
}

/** postmark: circular cancellation with ring text and wavy lines (the series badge). */
const pmCache = new WeakMap()
export const postmark = {
  duration: () => 0.2,
  prepare(op) {
    op.r ??= 112
    op.top ??= 'ENVELOPE MATH'
    op.bottom ??= 'BACK OF THE ENVELOPE'
    op.center ??= ['No.', '001']
    op.color ??= 'ink'
    op.rot ??= -12
    op.waves ??= true
    op.instant ??= op.t <= 0.05
  },
  draw(g, op, lt) {
    let c = pmCache.get(op)
    if (!c) {
      const R = op.r
      c = createCanvas(R * 2 + (op.waves ? 420 : 20), R * 2 + 20)
      const x = c.getContext('2d')
      const col = ink(op.color)
      x.translate(R + 10, R + 10)
      x.strokeStyle = col; x.fillStyle = col
      x.lineWidth = 6; x.beginPath(); x.arc(0, 0, R - 4, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 3; x.beginPath(); x.arc(0, 0, R - 46, 0, Math.PI * 2); x.stroke()
      x.font = font('type', 25)
      x.textAlign = 'center'; x.textBaseline = 'middle'
      const ring = (txt, mid, dir) => {
        const chars = [...txt]
        const step = Math.min(0.165, 3.0 / chars.length)
        chars.forEach((ch, i) => {
          const a = mid + (i - (chars.length - 1) / 2) * step * dir
          x.save(); x.rotate(a); x.translate(0, -dir * (R - 25)); x.fillText(ch, 0, 0); x.restore()
        })
      }
      ring(op.top, 0, 1)
      ring(op.bottom, 0, -1)
      x.font = font('type', 30)
      op.center.forEach((l, i) => x.fillText(l, 0, (i - (op.center.length - 1) / 2) * 34))
      if (op.waves) {
        x.lineWidth = 5
        for (let i = 0; i < 5; i++) {
          x.beginPath()
          for (let px = R + 12; px < R + 400; px += 4) {
            const py = -60 + i * 30 + Math.sin(px / 26) * 9
            px === R + 12 ? x.moveTo(px, py) : x.lineTo(px, py)
          }
          x.stroke()
        }
      }
      const r = rng(7)
      x.globalCompositeOperation = 'destination-out'
      for (let i = 0; i < 900; i++) { x.globalAlpha = r(); x.beginPath(); x.arc((r() - 0.3) * c.width, (r() - 0.5) * c.height, 0.5 + r() * 2.2, 0, 7); x.fill() }
      pmCache.set(op, c)
    }
    const k = op.instant ? 1 : ease.out(prog(lt, 0, 0.2))
    g.save()
    g.translate(op.x, op.y)
    g.rotate((op.rot * Math.PI) / 180)
    g.scale(lerp(1.15, 1, k), lerp(1.15, 1, k))
    g.globalAlpha *= k * (op.alpha ?? 0.72)
    g.drawImage(c, -op.r - 10, -op.r - 10)
    g.restore()
  },
  sfx: op => (op.instant ? [] : [{ at: op.t + 0.12, kind: 'stamp', gain: 0.35 }]),
}

/** postage: a perforated postage stamp with a value (e.g. the episode's key number). */
const psCache = new WeakMap()
export const postage = {
  duration: () => 0.35,
  prepare(op) {
    op.w ??= 210
    op.h ??= 250
    op.color ??= 'red'
    op.rot ??= 4
    op.label ??= 'ENVELOPE MATH'
    op.labelSize ??= 18
  },
  draw(g, op, lt) {
    let c = psCache.get(op)
    if (!c) {
      const { w, h } = op
      c = createCanvas(w + 30, h + 30)
      const x = c.getContext('2d')
      x.translate(15, 15)
      x.shadowColor = 'rgba(30,20,5,0.35)'; x.shadowBlur = 10; x.shadowOffsetY = 4
      x.fillStyle = '#fbf7ee'; x.fillRect(0, 0, w, h)
      x.shadowColor = 'transparent'
      x.globalCompositeOperation = 'destination-out'
      const pr = 7
      for (let px = 0; px <= w; px += pr * 2.6) { x.beginPath(); x.arc(px, 0, pr, 0, 7); x.arc(px, h, pr, 0, 7); x.fill() }
      for (let py = 0; py <= h; py += pr * 2.6) { x.beginPath(); x.arc(0, py, pr, 0, 7); x.arc(w, py, pr, 0, 7); x.fill() }
      x.globalCompositeOperation = 'source-over'
      const col = ink(op.color)
      x.strokeStyle = col; x.lineWidth = 4; x.strokeRect(16, 16, w - 32, h - 32)
      x.fillStyle = col
      x.globalAlpha = 0.12; x.fillRect(16, 16, w - 32, h - 32); x.globalAlpha = 1
      x.textAlign = 'center'; x.textBaseline = 'middle'
      x.font = font('marker', Math.min(64, (w - 50) / Math.max(3, String(op.value).length) * 1.7))
      x.fillText(String(op.value), w / 2, h * 0.47)
      x.font = font('type', op.labelSize)
      x.fillText(op.label, w / 2, h - 38)
      if (op.art) { x.font = font('hand', 46); x.fillText(op.art, w / 2, 52) }
      psCache.set(op, c)
    }
    const k = ease.back(prog(lt, 0, 0.35))
    g.save()
    g.translate(op.x, op.y - (1 - clamp(k)) * 70)
    g.rotate((op.rot * Math.PI) / 180)
    g.globalAlpha *= clamp(prog(lt, 0, 0.15))
    g.drawImage(c, -c.width / 2, -c.height / 2)
    g.restore()
  },
  sfx: op => [{ at: op.t, kind: 'paper', gain: 0.5 }],
}

/** sticky: a yellow sticky note for assumptions ("ASSUME: 7%/yr"). Text is written in. */
export const sticky = {
  duration: op => 0.3 + op.text.length / op.cps,
  prepare(op) {
    op.w ??= 400
    op.size ??= 60
    op.cps ??= 22
    op.rot ??= -4
    op.color ??= '#ffe36e'
  },
  draw(g, op, lt) {
    const k = ease.back(prog(lt, 0, 0.3))
    g.save()
    g.font = font('hand', op.size)
    const ls = wrap(g, op.text, op.w - 50)
    const h = Math.max(op.w * 0.8, 70 + (ls.length + (op.title ? 1 : 0)) * op.size * 1.1)
    g.translate(op.x, op.y)
    g.rotate((op.rot * Math.PI) / 180)
    g.scale(lerp(0.6, 1, k), lerp(0.6, 1, k))
    g.globalAlpha *= clamp(k * 2)
    g.shadowColor = 'rgba(30,20,5,0.3)'; g.shadowBlur = 16; g.shadowOffsetY = 8
    g.fillStyle = op.color
    g.fillRect(-op.w / 2, -h / 2, op.w, h)
    g.shadowColor = 'transparent'
    const curl = g.createLinearGradient(op.w / 2 - 70, h / 2 - 70, op.w / 2, h / 2)
    curl.addColorStop(0, 'rgba(0,0,0,0)'); curl.addColorStop(1, 'rgba(90,70,0,0.18)')
    g.fillStyle = curl; g.fillRect(-op.w / 2, -h / 2, op.w, h)
    let y = -h / 2 + 30 + op.size * 0.85
    let budget = (lt - 0.3) * op.cps
    if (op.title) {
      handText(g, op.title, -op.w / 2 + 26, y, { size: op.size * 0.9, color: 'red', font: 'type' })
      y += op.size * 1.1
    }
    for (const l of ls) {
      if (budget <= 0) break
      handText(g, l, -op.w / 2 + 26, y, { size: op.size, color: 'ink' }, budget)
      budget -= l.length
      y += op.size * 1.1
    }
    g.restore()
  },
  sfx: op => [{ at: op.t, kind: 'paper', gain: 0.4 }, { at: op.t + 0.3, kind: 'scribble', dur: op.text.length / op.cps, n: op.text.length }],
}

/**
 * quote: a claim card — the viral claim we're about to audit, in quotes, with an attribution line.
 * Annotations can target its text (`target: {op: "<id>", match: "FREE"}`).
 */
export const quote = {
  duration: () => 0.3,
  prepare(op, g) {
    op.x ??= 540
    op.y ??= 760
    op.w ??= 840
    op.size ??= 66
    op.font ??= 'marker'
    op.rot ??= -1.5
    op.instant ??= op.t <= 0.05
    g.font = font(op.font, op.size)
    op._lines = wrap(g, op.text, op.w - 130)
    op._lh = op.size * 1.25
    op._pad = 56
    op._h = op._pad * 2 + op._lines.length * op._lh + (op.by ? 56 : 0)
  },
  draw(g, op, lt) {
    const k = op.instant ? 1 : ease.out(prog(lt, 0, 0.3))
    const top = op.y - op._h / 2
    g.save()
    g.translate(op.x, op.y + (1 - k) * 40)
    g.rotate((op.rot * Math.PI) / 180)
    g.translate(-op.x, -op.y)
    g.globalAlpha *= k
    g.shadowColor = 'rgba(20,10,0,0.28)'; g.shadowBlur = 16; g.shadowOffsetY = 8
    g.fillStyle = '#fffdf7'
    g.fillRect(op.x - op.w / 2, top, op.w, op._h)
    g.shadowColor = 'transparent'
    g.fillStyle = INK.red
    g.font = font('marker', 150)
    g.textBaseline = 'alphabetic'
    g.fillText('“', op.x - op.w / 2 + 18, top + 120)
    g.textAlign = 'center'
    g.fillStyle = ink(op.color || 'black')
    g.font = font(op.font, op.size)
    op._lines.forEach((l, i) => g.fillText(l, op.x, top + op._pad + op.size * 0.85 + i * op._lh))
    if (op.by) {
      g.font = font('type', 34)
      g.fillStyle = 'rgba(28,45,94,0.8)'
      g.fillText(op.by, op.x, top + op._h - op._pad + 18)
    }
    g.restore()
  },
  sfx: op => (op.instant ? [] : [{ at: op.t, kind: 'paper', gain: 0.6 }]),
}

/** meter: a gauge that drains from `from`% to `to`% with a live typewriter label, then thumps. */
export const meter = {
  duration: op => op.dur + 0.3,
  prepare(op) {
    op.x ??= 160
    op.w ??= 760
    op.h ??= 70
    op.from ??= 100
    op.dur ??= 1.4
    op.label ??= 'CLAIM SURVIVAL'
    op.color ??= op.to < 50 ? 'red' : 'green'
  },
  draw(g, op, lt) {
    const k = ease.inOut(prog(lt, 0, op.dur))
    const v = lerp(op.from, op.to, k)
    strokePartial(g, wobble([[op.x, op.y], [op.x + op.w, op.y + 2], [op.x + op.w - 2, op.y + op.h], [op.x + 2, op.y + op.h - 1], [op.x, op.y - 3]], 77, 2.5, 8), ease.out(prog(lt, 0, 0.3)), { color: 'ink', width: 5 })
    g.save()
    g.fillStyle = ink(op.color)
    g.globalAlpha *= 0.85
    g.fillRect(op.x + 8, op.y + 8, Math.max(0, (op.w - 16) * (v / 100)), op.h - 16)
    g.restore()
    handText(g, `${op.label}: ${Math.round(v)}%`, op.x, op.y - 26, { size: 48, color: op.color, font: 'type', jitter: 0.2 })
  },
  sfx: op => [{ at: op.t, kind: 'ticks', dur: op.dur }, { at: op.t + op.dur, kind: 'stamp', gain: 0.6 }],
}
