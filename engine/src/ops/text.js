// Text ops: the masking-tape hook, handwriting, column arithmetic and ticking counters.
import { font, ink, INK } from '../theme.js'
import { handText, pen, penScale, penAngle } from '../ink.js'
import { clamp, ease, prog, lerp, rng, hash, fmtNum } from '../util.js'

// "*word*" marks emphasis (drawn in red). Returns [{text, em}].
function segments(line) {
  return line.split(/(\*[^*]+\*)/).filter(Boolean).map(s => (s.startsWith('*') ? { text: s.slice(1, -1), em: true } : { text: s, em: false }))
}
const plain = line => line.replace(/\*/g, '')

export function wrap(g, text, maxWidth) {
  const out = []
  for (const para of String(text).split('\n')) {
    let line = ''
    for (const word of para.split(' ')) {
      const next = line ? `${line} ${word}` : word
      if (line && g.measureText(plain(next)).width > maxWidth) { out.push(line); line = word } else line = next
    }
    out.push(line)
  }
  return out
}

// Close emphasis markers that a wrap split across lines.
function balance(lines) {
  let open = false
  return lines.map(l => {
    let s = open ? `*${l}` : l
    const count = (l.match(/\*/g) || []).length
    if (count % 2 === 1) open = !open
    if (open) s += '*'
    return s
  })
}

/** hook: big marker headline on strips of masking tape. Persistent unless `until`/clear. */
export const hook = {
  fixed: true,
  duration: op => 0.2 + 0.14 * (op._lines?.length || 1),
  prepare(op, g) {
    op.size ??= 84
    op.y ??= 400
    op.x ??= 540
    op.maxWidth ??= 860
    op.font ??= 'marker'
    // a hook on screen from the first frame is the thumbnail: show it finished, no slap-in
    op.instant ??= op.t <= 0.05
    g.font = font(op.font, op.size)
    const raw = Array.isArray(op.text) ? op.text : wrap(g, op.text, op.maxWidth)
    op._lines = balance(raw)
  },
  draw(g, op, lt) {
    const r = rng(hash(op._lines.join('|')))
    const lh = op.size * 1.32
    op._lines.forEach((line, i) => {
      const k = op.instant ? 1 : ease.out(prog(lt, i * 0.14, 0.2))
      if (k <= 0) return
      g.save()
      g.font = font(op.font, op.size)
      const tw = g.measureText(plain(line)).width
      const cy = op.y + i * lh
      const rot = (r() - 0.5) * 0.045
      g.translate(op.x, cy)
      g.rotate(rot)
      g.scale(lerp(1.25, 1, k), lerp(1.25, 1, k))
      g.globalAlpha *= k
      if (op.tape !== false) tape(g, tw + 64, op.size * 1.22, r)
      g.textBaseline = 'middle'
      let x = -tw / 2
      for (const s of segments(line)) {
        g.fillStyle = s.em ? INK.red : ink(op.color || 'black')
        g.fillText(s.text, x, op.size * 0.06)
        x += g.measureText(s.text).width
      }
      g.restore()
    })
  },
  sfx: op => (op.instant ? [] : (op._lines || [0]).map((_, i) => ({ at: op.t + i * 0.14, kind: 'tape' }))),
}

function tape(g, w, h, r) {
  g.save()
  g.shadowColor = 'rgba(30,20,5,0.25)'
  g.shadowBlur = 8
  g.shadowOffsetY = 3
  g.fillStyle = 'rgba(239,227,194,0.94)'
  g.beginPath()
  const teeth = 7
  g.moveTo(-w / 2, -h / 2)
  g.lineTo(w / 2, -h / 2)
  for (let i = 0; i <= teeth; i++) g.lineTo(w / 2 + (i % 2 ? 7 : 0) + (r() - 0.5) * 3, -h / 2 + (h * i) / teeth)
  g.lineTo(-w / 2, h / 2)
  for (let i = teeth; i >= 0; i--) g.lineTo(-w / 2 - (i % 2 ? 7 : 0) + (r() - 0.5) * 3, -h / 2 + (h * i) / teeth)
  g.closePath()
  g.fill()
  g.restore()
}

/** write: one line of handwriting, revealed at `cps` characters per second with a moving pen. */
export const write = {
  duration: op => op.text.length / op.cps,
  prepare(op) {
    op.size ??= 86
    op.cps ??= op.font === 'type' ? 22 : 15
    op.align ??= 'left'
  },
  draw(g, op, lt) {
    const chars = lt * op.cps
    g.save()
    if (op.rot) {
      g.translate(op.x, op.y)
      g.rotate((op.rot * Math.PI) / 180)
      g.translate(-op.x, -op.y)
    }
    const res = handText(g, op.text, op.x, op.y, op, chars)
    const end = op.text.length / op.cps
    if (op.pen !== false && op.font !== 'type' && lt < end + 0.3) pen(g, res.penX, res.penY + op.size * 0.2, lt, lt < end ? 1 : 1 - (lt - end) / 0.3, penScale(op.pen), penAngle(op.pen))
    g.restore()
  },
  sfx: op => [{ at: op.t, kind: op.font === 'type' ? 'type' : 'scribble', dur: op.text.length / op.cps, n: op.text.length }],
}

/**
 * lines: column arithmetic written line by line. `rule: i` draws the sum line above line i.
 * Lines may be strings or {text, color, size}.
 */
export const lines = {
  duration: op => op._end,
  prepare(op) {
    op.size ??= 86
    op.cps ??= 15
    op.gap ??= 0.3
    op.align ??= 'right'
    op.lineHeight ??= op.size * 1.22
    let cursor = 0
    op._sched = op.lines.map((l, i) => {
      const L = typeof l === 'string' ? { text: l } : { ...l }
      L.size ??= op.size
      L.color ??= op.color
      L.cps ??= op.cps
      if (L.at != null) cursor = L.at // per-line start (s after the op), e.g. to sync with the VO
      if (op.rule === i) { L.ruleAt = cursor; cursor += 0.3 }
      L.at = cursor
      cursor += L.text.length / L.cps + op.gap
      return L
    })
    op._end = cursor
  },
  draw(g, op, lt) {
    let maxW = 0
    let penPos = null
    op._sched.forEach((L, i) => {
      g.font = font(op.font || 'hand', L.size)
      maxW = Math.max(maxW, g.measureText(L.text).width)
      const y = op.y + i * op.lineHeight
      if (L.ruleAt != null && lt >= L.ruleAt) {
        const k = ease.out(prog(lt, L.ruleAt, 0.25))
        const x1 = op.align === 'right' ? op.x + 10 : op.align === 'center' ? op.x + maxW / 2 + 10 : op.x + maxW + 10
        const x0 = x1 - (maxW + 20)
        g.save()
        g.strokeStyle = ink(op.ruleColor || op.color)
        g.lineWidth = 5
        g.lineCap = 'round'
        g.beginPath()
        g.moveTo(x0, y - L.size * 0.95)
        g.lineTo(x0 + (x1 - x0) * k, y - L.size * 0.95 + 3)
        g.stroke()
        g.restore()
      }
      if (lt < L.at) return
      const chars = (lt - L.at) * L.cps
      const res = handText(g, L.text, op.x, y, { ...op, size: L.size, color: L.color, seed: i }, chars)
      if (chars < L.text.length + L.cps * 0.3) penPos = [res.penX, res.penY + L.size * 0.2]
    })
    if (penPos && op.pen !== false && op.font !== 'type') pen(g, penPos[0], penPos[1], lt, 1, penScale(op.pen), penAngle(op.pen))
  },
  sfx: op => op._sched.map(L => ({ at: op.t + L.at, kind: op.font === 'type' ? 'type' : 'scribble', dur: L.text.length / L.cps, n: L.text.length })),
}

/**
 * counter: a number that runs from `from` to `to` (formatted like money), then pops.
 * With `steps: [[t, value], ...]` (t relative to the op) it becomes a running total that
 * tweens to each value at its time — one op instead of a chain of counters.
 */
// time: 'hms' → 23:59:59, 'ms' → 59:59 (value in seconds); otherwise money/number formatting
function fmtValue(v, op) {
  if (!op.time) return fmtNum(v, op)
  const s = Math.max(0, Math.round(v))
  const two = n => String(n).padStart(2, '0')
  return op.time === 'ms' ? `${two(Math.floor(s / 60))}:${two(s % 60)}` : `${two(Math.floor(s / 3600))}:${two(Math.floor((s % 3600) / 60))}:${two(s % 60)}`
}

function stepValue(op, lt) {
  let prev = op.from, v = op.from, popAt = null
  for (const [st, val] of op.steps) {
    if (lt < st) break
    const tw = Math.min(0.35, op.stepDur ?? 0.35)
    const k = ease.out(prog(lt, st, tw))
    v = lerp(prev, val, k)
    popAt = st + tw
    prev = val
  }
  return { v, popAt }
}

export const counter = {
  duration: op => (op.steps ? op.steps[op.steps.length - 1][0] + 0.35 : op.dur),
  prepare(op) {
    op.from ??= op.steps ? op.steps[0][1] : 0
    op.dur ??= 1.4
    op.size ??= 130
    op.align ??= 'center'
    op.font ??= 'hand'
    if (op.steps) op.to ??= op.steps[op.steps.length - 1][1]
  },
  draw(g, op, lt) {
    let text, pop = 1
    if (op.steps) {
      const { v, popAt } = stepValue(op, lt)
      text = fmtValue(v, op)
      if (popAt != null && lt > popAt) pop = 1 + 0.06 * Math.sin(clamp((lt - popAt) / 0.2) * Math.PI)
    } else {
      const k = prog(lt, 0, op.dur)
      const v = lerp(op.from, op.to, (ease[op.ease] || ease.out)(k))
      text = fmtValue(k >= 1 ? op.to : v, op)
      pop = lt > op.dur ? 1 + 0.08 * Math.sin(clamp((lt - op.dur) / 0.25) * Math.PI) : 1
    }
    g.save()
    g.translate(op.x, op.y)
    g.scale(pop, pop)
    handText(g, text, 0, 0, { ...op, jitter: 0.3, seed: 3 })
    g.restore()
  },
  sfx: op => (op.steps
    ? op.steps.slice(1).map(([st]) => ({ at: op.t + st, kind: 'ticks', dur: 0.3 }))
    : [{ at: op.t, kind: 'ticks', dur: op.dur }, { at: op.t + op.dur, kind: 'pop' }]),
}

/**
 * ladder: a unit-conversion ladder. rows: [{label, value, factor}] — each rung writes
 * "label …… value", with the multiplier (e.g. "×52") written in red in the left gutter.
 */
export const ladder = {
  duration: op => op._end,
  prepare(op) {
    op.size ??= 88
    op.w ??= 820
    op.cps ??= 16
    op.gap ??= 0.35
    op.rowH ??= op.size * 1.5
    op.x ??= 110
    op.gutter ??= 120
    op.lastEmph ??= true
    let cursor = 0
    op._sched = op.rows.map((row, i) => {
      if (row.at != null) cursor = row.at // per-row start (s after the op)
      const at = cursor
      const n = (row.factor || '').length + row.label.length + String(row.value).length
      cursor += n / op.cps + op.gap
      const last = i === op.rows.length - 1
      return { ...row, at, last, emph: row.emph ?? (last && op.lastEmph) }
    })
    op._end = cursor
  },
  draw(g, op, lt) {
    const gutter = op.gutter
    let penPos = null
    op._sched.forEach((row, i) => {
      if (lt < row.at) return
      const y = op.y + i * op.rowH
      let budget = (lt - row.at) * op.cps
      if (row.factor) {
        handText(g, row.factor, op.x, y - op.rowH * 0.4, { size: op.size * 0.72, color: 'red', seed: i + 50 }, budget)
        budget -= row.factor.length
      }
      if (budget <= 0) return
      const col = row.color ?? (row.emph ? 'red' : op.color)
      const lab = handText(g, row.label, op.x + gutter, y, { size: op.size * 0.8, color: 'pencil', seed: i }, budget)
      budget -= row.label.length
      if (budget > 0) {
        const val = String(row.value)
        const res = handText(g, val, op.x + op.w, y, { size: row.emph ? op.size * 1.15 : op.size, color: col, align: 'right', seed: i + 9 }, budget)
        // dotted leader between label and value
        g.save()
        g.fillStyle = 'rgba(28,45,94,0.35)'
        for (let x = op.x + gutter + lab.width + 16; x < res.x0 - 16; x += 16) g.fillRect(x, y - 8, 5, 5)
        g.restore()
        if (budget < val.length + op.cps * 0.3) penPos = [res.penX, res.penY + op.size * 0.2]
      } else penPos = [lab.penX, lab.penY + op.size * 0.2]
    })
    if (penPos && op.pen !== false) pen(g, penPos[0], penPos[1], lt, 1, penScale(op.pen), penAngle(op.pen))
  },
  sfx: op => op._sched.map(r => ({ at: op.t + r.at, kind: 'scribble', dur: ((r.factor || '').length + r.label.length + String(r.value).length) / op.cps, n: 10 })),
}

/** caption track (spec.captions): bold subtitles with the spoken word highlighted. */
export function drawCaption(g, cap, t) {
  const size = cap.size || 56
  g.save()
  g.font = font('sans', size, 900)
  const linesOut = wrap(g, cap.text, 820).slice(0, 3)
  const words = cap.text.split(/\s+/)
  const k = clamp((t - cap.t) / Math.max(0.01, cap.end - cap.t))
  const active = Math.min(words.length - 1, Math.floor(k * words.length))
  const lh = size * 1.18
  const y0 = (cap.y || 1400) - ((linesOut.length - 1) * lh) / 2
  const appear = ease.out(clamp((t - cap.t) / 0.12))
  g.globalAlpha *= appear
  g.textBaseline = 'middle'
  g.lineJoin = 'round'
  let wi = 0
  linesOut.forEach((line, li) => {
    const ws = line.split(' ')
    const total = g.measureText(line).width
    let x = 540 - total / 2
    for (const w of ws) {
      const ww = g.measureText(w).width
      g.strokeStyle = 'rgba(10,10,10,0.92)'
      g.lineWidth = 12
      g.strokeText(w, x, y0 + li * lh)
      g.fillStyle = wi === active ? '#ffd84a' : '#ffffff'
      g.fillText(w, x, y0 + li * lh)
      x += ww + g.measureText(' ').width
      wi++
    }
  })
  g.restore()
}
