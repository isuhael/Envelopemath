// Spec linter: catches text that leaves the platform-safe area, collides with other text,
// sits under the captions, or leaves frame 0 (the thumbnail) without a readable hook.
import { createCanvas } from '@napi-rs/canvas'
import { font, SAFE, CAPTION_BAND } from './theme.js'
import { OPS } from './timeline.js'
import { wrap } from './ops/text.js'
import { fmtNum } from './util.js'

const probe = createCanvas(10, 10).getContext('2d')
const textW = (txt, kind, size) => { probe.font = font(kind, size); return probe.measureText(txt).width }
const clean = (op, txt) => (op.em ? txt.replace(/\*/g, '') : txt)

function alignX(x, w, align) {
  return align === 'center' ? x - w / 2 : align === 'right' ? x - w : x
}

// Approximate bounding boxes (in 1080x1920 units) for ops whose content must stay readable.
// A box may carry its own start time `t0` (e.g. the card that rises out of an opened envelope).
export function boxes(op) {
  const B = (x0, y0, x1, y1, what = op.type, t0) => ({ x0, y0, x1, y1, what, t0 })
  switch (op.type) {
    case 'write': {
      const t = clean(op, op.text)
      const w = textW(t, op.font || 'hand', op.size)
      const x0 = alignX(op.x, w, op.align)
      return [B(x0, op.y - op.size * 0.8, x0 + w, op.y + op.size * 0.25, `write "${t}"`)]
    }
    case 'lines':
      return op._sched.map((L, i) => {
        const t = clean(op, L.text)
        const w = textW(t, op.font || 'hand', L.size)
        const x0 = alignX(op.x, w, op.align)
        const y = op.y + i * op.lineHeight
        return B(x0, y - L.size * 0.8, x0 + w, y + L.size * 0.25, `lines[${i}] "${t}"`)
      })
    case 'counter': {
      const big = Math.max(Math.abs(op.to), Math.abs(op.from), ...(op.steps || []).map(s => Math.abs(s[1])))
      const w = textW(fmtNum(big, op), op.font, op.size)
      const x0 = alignX(op.x, w, op.align)
      return [B(x0, op.y - op.size * 0.8, x0 + w, op.y + op.size * 0.25, `counter ${op.to}`)]
    }
    case 'hook':
      return op._lines.map((l, i) => {
        const w = textW(l.replace(/\*/g, ''), op.font, op.size) + 64
        const y = op.y + i * op.size * 1.32
        return B(op.x - w / 2, y - op.size * 0.61, op.x + w / 2, y + op.size * 0.61, `hook "${l}"`)
      })
    case 'quote':
      return [B(op.x - op.w / 2, op.y - op._h / 2, op.x + op.w / 2, op.y + op._h / 2, `quote "${op.text.slice(0, 24)}…"`)]
    case 'ladder':
      return op._sched.map((r, i) => {
        const y = op.y + i * op.rowH
        return B(op.x, y - op.rowH * 0.42 - op.size * 0.5, op.x + op.w, y + op.size * 0.25, `ladder[${i}] "${r.label}"`)
      })
    case 'pick': {
      const gapX = op.ew + 30, gapY = op.eh + 40
      return op.options.map((o, i) => {
        const cx = op.x - ((op.cols - 1) * gapX) / 2 + (i % op.cols) * gapX
        const cy = op.y + Math.floor(i / op.cols) * gapY
        return B(cx - op.ew / 2, cy - op.eh / 2, cx + op.ew / 2, cy + op.eh / 2, `pick ${String.fromCharCode(65 + i)}`)
      })
    }
    case 'choices':
      return op.options.map((o, i) => {
        const y = op.y + i * (op.ch + 30)
        return B(op.x - op.w / 2, y - op.ch / 2, op.x + op.w / 2, y + op.ch / 2, `choice ${i}`)
      })
    case 'envelope': {
      const out = [B(op.x - op.w / 2, op.y - op.h / 2, op.x + op.w / 2, op.y + op.h / 2, 'envelope')]
      if (op.openAt != null) {
        // the card that slides up out of the opened envelope
        const ch = op.h * 1.05, top = op.y - op.h / 2
        out.push(B(op.x - op.w * 0.43, top - ch + op.h * 0.32, op.x + op.w * 0.43, top, 'envelope card', op.openAt + 0.45))
      }
      return out
    }
    case 'bars':
      return [B(op.x - op.w / 2, op.y - op.h - 80, op.x + op.w / 2, op.y + 90, 'bars')]
    case 'curve':
      return [B(op.x, op.y - op.h - 80, op.x + op.w + 30, op.y + (op.ticks ? 120 : 70), 'curve')]
    case 'stack': {
      const left = op.ref ? op.x - op.w / 2 - 120 - op.ref.h * 0.5 : op.x - op.w / 2
      const lw = op.heightLabel ? textW(op.heightLabel, 'hand', 60) : 0
      return [B(Math.min(left, op.x + op.w / 2 + 30 - lw), op.y - op.h - 90, op.x + op.w / 2 + 60, op.y + (op.label || op.ref?.label ? 90 : 10), 'stack')]
    }
    case 'grid':
      return [B(op.x - (op.cols * op.cell) / 2, op.y - op.cell / 2, op.x + (op.cols * op.cell) / 2, op.y + op.rows * op.cell + (op.label ? 60 : 0), 'grid')]
    case 'receipt': {
      // the strip grows as rows print, so each row claims its space only from its print time
      const rowH = op.size * 1.45
      const n = op._rows.length + (op.running ? 1 : 0)
      return Array.from({ length: n }, (_, i) => {
        const at = op.t + (op._rows[Math.min(i, op._rows.length - 1)].at ?? 0)
        return B(op.x - op.w / 2, op.y + (i ? 40 + i * rowH : 0), op.x + op.w / 2, op.y + 40 + (i + 1) * rowH + 14, `receipt row ${i}`, at)
      })
    }
    case 'sticky': {
      probe.font = font('hand', op.size)
      const n = wrap(probe, op.text, op.w - 50).length + (op.title ? 1 : 0)
      const h = Math.max(op.w * 0.8, 70 + n * op.size * 1.1)
      return [B(op.x - op.w / 2, op.y - h / 2, op.x + op.w / 2, op.y + h / 2, 'sticky')]
    }
    case 'stuff': {
      const rows = Math.ceil(op.items.length / op.cols)
      const w = op.w ?? 840
      return [B(op.x - w / 2, op.y - op.eh * 0.4, op.x + w / 2, op.y + (rows - 1) * (op.eh + 150) + op.eh * 0.5 + 90, 'stuff')]
    }
    case 'emoji':
      return [B(op.x - op.size / 2, op.y - op.size / 2, op.x + op.size / 2, op.y + op.size / 2, `emoji ${op.char}`)]
    case 'timer': {
      const lw = textW(op.label, 'type', 50) / 2
      return [B(op.x - Math.max(op.r, lw), op.y - op.r, op.x + Math.max(op.r, lw), op.y + op.r + 84, 'timer')]
    }
    case 'stamp': {
      const ls = String(op.text).split('\n')
      const w = Math.max(...ls.map(l => textW(l, 'type', op.size))) + op.size * 1.1
      const h = ls.length * op.size * 1.15 + op.size * 0.9
      return [B(op.x - w / 2, op.y - h / 2, op.x + w / 2, op.y + h / 2, `stamp "${ls.join(' ')}"`, op.t + 0.2)]
    }
    case 'postmark': {
      // the ring only: the rotated cancellation waves rise away from the content
      const r = op.r * 0.8
      return [B(op.x - r, op.y - r, op.x + r, op.y + r, 'postmark')]
    }
    case 'postage':
      return [B(op.x - op.w / 2, op.y - op.h / 2, op.x + op.w / 2, op.y + op.h / 2, `postage ${op.value}`)]
    case 'meter':
      return [B(op.x, op.y - 80, op.x + op.w, op.y + op.h, 'meter')]
    default:
      return []
  }
}

// boxes are estimates, so only flag overlaps deeper than TOL px on both axes
const TOL = 10
const overlap = (a, b) => Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0) > TOL && Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) > TOL
// a rubber stamp is meant to land on paper props; it must not cover text
const SURFACES = new Set(['envelope', 'receipt', 'quote', 'postage', 'sticky', 'stuff', 'choices', 'pick', 'bars', 'curve', 'grid', 'stack', 'meter'])
const stampOnSurface = (a, b) => (a.type === 'stamp' && SURFACES.has(b.type)) || (b.type === 'stamp' && SURFACES.has(a.type))
const READABLE_AT_ZERO = new Set(['hook', 'quote', 'counter', 'ladder', 'receipt', 'choices', 'pick'])

/** Returns human-readable warnings; an empty list means the spec looks clean. */
export function lint(spec) {
  const warn = []
  const zoomed = spec.camera.some(k => (k.zoom ?? 1) !== 1 || k.x != null || k.y != null)
  const end = spec.duration
  const items = spec._ops.map(op => ({ op, bx: boxes(op), until: op.until ?? end }))
  for (const { op, bx } of items) {
    if (op.t > end) warn.push(`op #${op._i} ${op.type} starts after the video ends (${op.t}s > ${end}s)`)
    if (zoomed && !op._fixed) continue
    for (const b of bx) {
      if (op.type === 'postmark') continue // decoration that lives in the flap area by design
      const rail = b.y1 > SAFE.railY && b.x1 > SAFE.railX + 4
      if (rail || b.x0 < SAFE.x0 - 4 || b.x1 > SAFE.x1 + 4 || b.y0 < SAFE.y0 - 4 || b.y1 > SAFE.y1 + 4) {
        warn.push(`op #${op._i} ${b.what} leaves the safe area [${Math.round(b.x0)},${Math.round(b.y0)} → ${Math.round(b.x1)},${Math.round(b.y1)}]`)
      }
    }
  }
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const A = items[i], Bi = items[j]
      if (A.op.allowOverlap || Bi.op.allowOverlap || stampOnSurface(A.op, Bi.op)) continue
      for (const a of A.bx) for (const b of Bi.bx) {
        const a0 = a.t0 ?? A.op.t, b0 = b.t0 ?? Bi.op.t
        if (a0 >= Bi.until || b0 >= A.until) continue
        if (overlap(a, b)) warn.push(`op #${A.op._i} ${a.what} overlaps op #${Bi.op._i} ${b.what} while both are on screen`)
      }
    }
  }
  // frame 0 is the thumbnail: something readable must already be there
  if (!spec._ops.some(o => READABLE_AT_ZERO.has(o.type) && o.t <= 0.05 && (o.type !== 'hook' && o.type !== 'quote' ? o.t < -0.3 : o.instant))) {
    warn.push('frame 0 has no readable text: put the hook on screen at t: 0 (it renders finished, so the first frame doubles as the thumbnail)')
  }
  const caps = [...spec.captions].sort((a, b) => a.t - b.t)
  for (let i = 1; i < caps.length; i++) if (caps[i].t < caps[i - 1].end - 0.01) warn.push(`caption at ${caps[i].t}s overlaps the previous caption`)
  for (const c of caps) {
    probe.font = font('sans', c.size || 56, 900)
    const n = wrap(probe, c.text, 860).length
    if (n > 2) warn.push(`caption at ${c.t}s wraps to ${n} lines (max 2; split it)`)
    const words = c.text.split(/\s+/).filter(Boolean).length
    const pace = words / Math.max(0.01, c.end - c.t)
    if (pace > 4) warn.push(`caption at ${c.t}s runs ${pace.toFixed(1)} words/s (max 4, i.e. ≥0.25 s per word)`)
  }
  if (caps.length) {
    for (const { op, bx, until } of items) {
      for (const c of caps) {
        if (c.t >= until || op.t >= c.end) continue
        if (bx.some(b => (b.t0 ?? op.t) < c.end && b.y1 > CAPTION_BAND.y0 && b.y0 < CAPTION_BAND.y1)) { warn.push(`op #${op._i} ${op.type} sits in the caption band (y ${CAPTION_BAND.y0}–${CAPTION_BAND.y1}) while captions play`); break }
      }
    }
  }
  const maxLen = spec.lane === 'long' ? 75 : 60
  if (end > maxLen) warn.push(`duration ${end}s is over ${maxLen}s${spec.lane === 'long' ? '' : ' (set "lane": "long" for up to 75s)'}`)
  for (const op of spec._ops) if (!OPS[op.type]) warn.push(`unknown op ${op.type}`)
  return warn
}
