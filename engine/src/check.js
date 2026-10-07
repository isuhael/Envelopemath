// Spec linter: catches text that leaves the platform-safe area or collides with other text.
import { createCanvas } from '@napi-rs/canvas'
import { font, SAFE, CAPTION_BAND } from './theme.js'
import { OPS } from './timeline.js'

const probe = createCanvas(10, 10).getContext('2d')
const textW = (txt, kind, size) => { probe.font = font(kind, size); return probe.measureText(txt).width }

function alignX(x, w, align) {
  return align === 'center' ? x - w / 2 : align === 'right' ? x - w : x
}

// Approximate bounding boxes (in 1080x1920 units) for ops whose content must stay readable.
export function boxes(op) {
  const B = (x0, y0, x1, y1, what = op.type) => ({ x0, y0, x1, y1, what })
  switch (op.type) {
    case 'write': {
      const w = textW(op.text, op.font || 'hand', op.size)
      const x0 = alignX(op.x, w, op.align)
      return [B(x0, op.y - op.size * 0.8, x0 + w, op.y + op.size * 0.25, `write "${op.text}"`)]
    }
    case 'lines':
      return op._sched.map((L, i) => {
        const w = textW(L.text, op.font || 'hand', L.size)
        const x0 = alignX(op.x, w, op.align)
        const y = op.y + i * op.lineHeight
        return B(x0, y - L.size * 0.8, x0 + w, y + L.size * 0.25, `lines[${i}] "${L.text}"`)
      })
    case 'counter': {
      const sample = `${op.prefix || ''}${Math.round(Math.max(Math.abs(op.to), Math.abs(op.from))).toLocaleString('en-US')}${op.suffix || ''}`
      const w = textW(sample, op.font, op.size)
      const x0 = alignX(op.x, w, op.align)
      return [B(x0, op.y - op.size * 0.8, x0 + w, op.y + op.size * 0.25, `counter ${op.to}`)]
    }
    case 'hook':
      return op._lines.map((l, i) => {
        const w = textW(l.replace(/\*/g, ''), 'marker', op.size) + 64
        const y = op.y + i * op.size * 1.32
        return B(op.x - w / 2, y - op.size * 0.61, op.x + w / 2, y + op.size * 0.61, `hook "${l}"`)
      })
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
    case 'envelope':
      return [B(op.x - op.w / 2, op.y - op.h / 2, op.x + op.w / 2, op.y + op.h / 2, 'envelope')]
    case 'bars':
      return [B(op.x - op.w / 2, op.y - op.h - 80, op.x + op.w / 2, op.y + 90, 'bars')]
    case 'curve':
      return [B(op.x, op.y - op.h - 80, op.x + op.w + 30, op.y + 70, 'curve')]
    case 'stack': {
      const left = op.ref ? op.x - op.w / 2 - 120 - op.ref.h * 0.5 : op.x - op.w / 2
      const lw = op.heightLabel ? textW(op.heightLabel, 'hand', 60) : 0
      return [B(Math.min(left, op.x + op.w / 2 + 30 - lw), op.y - op.h - 90, op.x + op.w / 2 + 60, op.y + (op.label || op.ref?.label ? 90 : 10), 'stack')]
    }
    case 'grid':
      return [B(op.x - (op.cols * op.cell) / 2, op.y - op.cell / 2, op.x + (op.cols * op.cell) / 2, op.y + op.rows * op.cell + (op.label ? 60 : 0), 'grid')]
    case 'receipt':
      return [B(op.x - op.w / 2, op.y, op.x + op.w / 2, op.y + 60 + op._rows.length * op.size * 1.45, 'receipt')]
    case 'sticky':
      return [B(op.x - op.w / 2, op.y - op.w * 0.45, op.x + op.w / 2, op.y + op.w * 0.45, 'sticky')]
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
    default:
      return []
  }
}

const overlap = (a, b) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1
const live = (op, end) => [op.t, op.until ?? end]

/** Returns human-readable warnings; an empty list means the spec looks clean. */
export function lint(spec) {
  const warn = []
  const zoomed = spec.camera.some(k => (k.zoom ?? 1) !== 1 || k.x != null || k.y != null)
  const items = spec._ops.map(op => ({ op, bx: boxes(op), span: live(op, spec.duration) }))
  for (const { op, bx } of items) {
    if (op.t > spec.duration) warn.push(`op #${op._i} ${op.type} starts after the video ends (${op.t}s > ${spec.duration}s)`)
    if (zoomed && !op._fixed) continue
    for (const b of bx) {
      const rail = b.y1 > SAFE.railY && b.x1 > SAFE.railX + 4
      if (rail || b.x0 < SAFE.x0 - 4 || b.x1 > SAFE.x1 + 4 || b.y0 < SAFE.y0 - 4 || b.y1 > SAFE.y1 + 4) {
        warn.push(`op #${op._i} ${b.what} leaves the safe area [${Math.round(b.x0)},${Math.round(b.y0)} → ${Math.round(b.x1)},${Math.round(b.y1)}]`)
      }
    }
  }
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const A = items[i], Bi = items[j]
      if (A.span[0] >= Bi.span[1] || Bi.span[0] >= A.span[1]) continue
      for (const a of A.bx) for (const b of Bi.bx) {
        if (overlap(a, b)) warn.push(`op #${A.op._i} ${a.what} overlaps op #${Bi.op._i} ${b.what} while both are on screen`)
      }
    }
  }
  const caps = [...spec.captions].sort((a, b) => a.t - b.t)
  for (let i = 1; i < caps.length; i++) if (caps[i].t < caps[i - 1].end - 0.01) warn.push(`caption at ${caps[i].t}s overlaps the previous caption`)
  if (caps.length) {
    for (const { op, bx, span } of items) {
      for (const c of caps) {
        if (c.t >= span[1] || span[0] >= c.end) continue
        if (bx.some(b => b.y1 > CAPTION_BAND.y0 && b.y0 < CAPTION_BAND.y1)) { warn.push(`op #${op._i} ${op.type} sits in the caption band (y ${CAPTION_BAND.y0}–${CAPTION_BAND.y1}) while captions play`); break }
      }
    }
  }
  if (spec.duration > 60) warn.push(`duration ${spec.duration}s is over 60s`)
  for (const op of spec._ops) if (!OPS[op.type]) warn.push(`unknown op ${op.type}`)
  return warn
}
