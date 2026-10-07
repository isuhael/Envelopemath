// Text anchors: let `annotate` / `highlight` ops point at text inside another op
// (`target: {op, match, line, nth}`) instead of hand-measured pixel coordinates.
import { createCanvas } from '@napi-rs/canvas'
import { font } from './theme.js'
import { parseEm } from './ink.js'
import { fmtNum } from './util.js'

const probe = createCanvas(10, 10).getContext('2d')
const width = (txt, kind, size) => { probe.font = font(kind, size); return probe.measureText(txt).width }
const startX = (x, w, align) => (align === 'center' ? x - w / 2 : align === 'right' ? x - w : x)

function nthIndex(text, match, nth = 0) {
  let i = -1
  for (let k = 0; k <= nth; k++) {
    i = text.indexOf(match, i + 1)
    if (i < 0) return -1
  }
  return i
}

// One candidate line of text inside an op: its clean string, font, size, left x and baseline/centre.
function textLines(op) {
  switch (op.type) {
    case 'write': {
      const t = parseEm(op.text, op.em).clean
      const kind = op.font || 'hand'
      return [{ t, kind, size: op.size, x0: startX(op.x, width(t, kind, op.size), op.align), base: op.y }]
    }
    case 'lines':
      return op._sched.map((L, i) => {
        const t = parseEm(L.text, op.em).clean
        const kind = op.font || 'hand'
        return { t, kind, size: L.size, x0: startX(op.x, width(t, kind, L.size), op.align), base: op.y + i * op.lineHeight }
      })
    case 'hook':
      return op._lines.map((line, i) => {
        const t = line.replace(/\*/g, '')
        const cy = op.y + i * op.size * 1.32
        return { t, kind: op.font, size: op.size, x0: op.x - width(t, op.font, op.size) / 2, mid: cy + op.size * 0.06 }
      })
    case 'quote': {
      const top = op.y - op._h / 2
      return op._lines.map((t, i) => ({ t, kind: op.font, size: op.size, x0: op.x - width(t, op.font, op.size) / 2, base: top + op._pad + op.size * 0.85 + i * op._lh }))
    }
    case 'counter': {
      const t = fmtNum(op.to, op)
      return [{ t, kind: op.font, size: op.size, x0: startX(op.x, width(t, op.font, op.size), op.align), base: op.y }]
    }
    case 'ladder':
      return op._sched.flatMap((r, i) => {
        const y = op.y + i * op.rowH
        const vs = r.emph ? op.size * 1.15 : op.size
        const v = String(r.value)
        return [
          { t: r.label, kind: 'hand', size: op.size * 0.8, x0: op.x + op.gutter, base: y },
          { t: v, kind: 'hand', size: vs, x0: op.x + op.w - width(v, 'hand', vs), base: y },
        ]
      })
    default:
      return []
  }
}

/** Box {x, y, w, h} of `match` inside the target op (whole text when match is omitted). */
export function textBox(target, { match, line, nth = 0 } = {}) {
  const cands = textLines(target)
  if (!cands.length) throw new Error(`target: op type "${target.type}" has no text to anchor to`)
  const pick = line != null ? [cands[line]] : cands
  for (const c of pick) {
    if (!c) continue
    const idx = match == null ? 0 : nthIndex(c.t, match, nth)
    if (idx < 0) continue
    const m = match == null ? c.t : match
    const x = c.x0 + width(c.t.slice(0, idx), c.kind, c.size)
    const w = width(m, c.kind, c.size)
    const top = c.mid != null ? c.mid - c.size * 0.5 : c.base - c.size * 0.72
    return { x, y: top, w, h: c.size * (c.mid != null ? 1 : 0.88), base: c.base ?? c.mid + c.size * 0.35 }
  }
  throw new Error(`target: "${match}" not found in ${target.type} op${target.id ? ` "${target.id}"` : ''}`)
}

/** Resolve `target` on annotate/highlight ops. Called once all ops are prepared. */
export function resolveAnchors(ops) {
  for (const op of ops) {
    if (!op.target || !['annotate', 'highlight'].includes(op.type)) continue
    const ref = op.target.op
    const target = ops.find(o => (typeof ref === 'string' ? o.id === ref : o._i === ref))
    if (!target) throw new Error(`op #${op._i}: target op ${JSON.stringify(ref)} not found (use an op "id" or its index in spec.ops)`)
    const b = textBox(target, op.target)
    const pad = op.target.pad ?? 0
    if (op.fixed == null) op._fixed = target._fixed
    if (op.type === 'highlight') {
      Object.assign(op, { x: b.x - 8 - pad, y: b.y - 4 - pad, w: b.w + 16 + 2 * pad, h: b.h + 8 + 2 * pad })
      continue
    }
    switch (op.kind) {
      case 'underline':
      case 'double':
        Object.assign(op, { x: b.x, y: b.base + 10, w: b.w })
        break
      case 'strike':
        Object.assign(op, { x: b.x, y: b.y + b.h * 0.55, w: b.w })
        break
      case 'arrow': {
        const [fx, fy] = op.from
        const cx = b.x + b.w / 2, cy = b.y + b.h / 2, gap = 16 + pad
        op.to = fx < b.x ? [b.x - gap, cy] : fx > b.x + b.w ? [b.x + b.w + gap, cy] : fy < b.y ? [cx, b.y - gap] : [cx, b.y + b.h + gap]
        break
      }
      default:
        Object.assign(op, { x: b.x - pad, y: b.y - pad, w: b.w + 2 * pad, h: b.h + 2 * pad })
    }
  }
}
