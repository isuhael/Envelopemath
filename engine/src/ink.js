// Handwriting, a moving ballpoint pen, and wobbly hand-drawn strokes.
import { font, ink } from './theme.js'
import { rng, hash, clamp } from './util.js'

const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' })

// Split into user-perceived characters so emoji and flags are never cut in half.
export const glyphs = text => Array.from(segmenter.segment(text), s => s.segment)

// Measure the x offset of every glyph boundary so kerning survives glyph-by-glyph drawing.
function layout(g, chars) {
  const xs = [0]
  let acc = ''
  for (const ch of chars) { acc += ch; xs.push(g.measureText(acc).width) }
  return xs
}

// With `em: true`, "*word*" is drawn in red; returns the clean string and per-glyph flags.
export function parseEm(str, enabled) {
  if (!enabled || !str.includes('*')) return { clean: str, red: null }
  const red = []
  let clean = '', on = false
  for (const ch of glyphs(str)) {
    if (ch === '*') { on = !on; continue }
    clean += ch
    red.push(on)
  }
  return { clean, red }
}

/**
 * Draw `text` revealed up to `chars` glyphs (float: 3.5 = three glyphs + half of the fourth).
 * Returns the pen position (end of the revealed ink) and full width.
 */
export function handText(g, raw, x, y, o = {}, chars = Infinity) {
  const size = o.size || 80
  g.font = font(o.font || 'hand', size)
  g.textBaseline = 'alphabetic'
  const { clean: str, red } = parseEm(raw, o.em)
  const text = glyphs(str)
  const xs = layout(g, text)
  const width = xs[xs.length - 1]
  const x0 = o.align === 'center' ? x - width / 2 : o.align === 'right' ? x - width : x
  const r = rng(hash(str) ^ (o.seed || 0))
  const jitter = o.jitter ?? (o.font === 'type' ? 0.4 : 1)
  const n = Math.min(text.length, chars)
  g.fillStyle = ink(o.color)
  let penX = x0, penY = y
  for (let i = 0; i < Math.ceil(n); i++) {
    const ch = text[i]
    const dy = (r() - 0.5) * size * 0.04 * jitter
    const rot = (r() - 0.5) * 0.05 * jitter
    const alpha = 0.86 + r() * 0.14
    const cx = x0 + xs[i]
    const cw = xs[i + 1] - xs[i]
    const frac = clamp(n - i)
    if (ch === ' ') { penX = cx + cw; continue }
    g.save()
    g.globalAlpha *= alpha
    if (red) g.fillStyle = red[i] ? ink('red') : ink(o.color)
    if (frac < 1) {
      g.beginPath()
      g.rect(cx - 4, y - size * 1.2, cw * frac + 4, size * 1.6)
      g.clip()
    }
    g.translate(cx, y + dy)
    g.rotate(rot)
    g.fillText(ch, 0, 0)
    g.restore()
    penX = cx + cw * frac
    penY = y + dy - size * 0.25
  }
  return { penX, penY, width, x0, glyphX: xs }
}

export const penScale = p => (p === 'small' ? 0.6 : 1)

// A ballpoint pen whose tip sits at (x, y). `bob` animates a small writing wiggle; `scale` 0.6 = small pen.
export function pen(g, x, y, bob = 0, alpha = 1, scale = 1) {
  g.save()
  g.globalAlpha *= alpha
  g.translate(x + Math.sin(bob * 31) * 3, y + Math.cos(bob * 23) * 4)
  g.rotate(-0.62)
  g.scale(scale, scale)
  g.shadowColor = 'rgba(20,10,0,0.35)'
  g.shadowBlur = 14
  g.shadowOffsetX = 10
  g.shadowOffsetY = 16
  // body
  g.fillStyle = '#f4f1ea'
  g.beginPath()
  g.moveTo(14, -11); g.lineTo(330, -15); g.quadraticCurveTo(346, 0, 330, 15); g.lineTo(14, 11); g.closePath()
  g.fill()
  g.shadowColor = 'transparent'
  // grip + cap end
  g.fillStyle = '#1c2d5e'
  g.fillRect(40, -12, 70, 24)
  g.fillRect(300, -15, 34, 30)
  g.fillStyle = 'rgba(255,255,255,0.35)'
  g.fillRect(118, -10, 180, 5)
  // cone + tip
  g.fillStyle = '#d9d4c8'
  g.beginPath(); g.moveTo(14, -11); g.lineTo(0, -2); g.lineTo(0, 2); g.lineTo(14, 11); g.closePath(); g.fill()
  g.fillStyle = '#1c2d5e'
  g.beginPath(); g.arc(0, 0, 2.6, 0, Math.PI * 2); g.fill()
  g.restore()
}

// Jitter a polyline so it looks hand drawn; deterministic per seed.
export function wobble(points, seed, amp = 3, steps = 6) {
  const r = rng(seed)
  const out = []
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay] = points[i], [bx, by] = points[i + 1]
    for (let s = 0; s < steps; s++) {
      const k = s / steps
      out.push([ax + (bx - ax) * k + (r() - 0.5) * amp, ay + (by - ay) * k + (r() - 0.5) * amp])
    }
  }
  out.push(points[points.length - 1])
  return out
}

// Stroke the first fraction `k` (0..1) of a polyline, measured by length.
export function strokePartial(g, pts, k, { color = 'red', width = 7, alpha = 1 } = {}) {
  if (k <= 0 || pts.length < 2) return
  const lens = [0]
  for (let i = 1; i < pts.length; i++) lens.push(lens[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]))
  const target = lens[lens.length - 1] * clamp(k)
  g.save()
  g.globalAlpha *= alpha
  g.strokeStyle = ink(color)
  g.lineWidth = width
  g.lineCap = 'round'
  g.lineJoin = 'round'
  g.beginPath()
  g.moveTo(pts[0][0], pts[0][1])
  for (let i = 1; i < pts.length; i++) {
    if (lens[i] <= target) { g.lineTo(pts[i][0], pts[i][1]); continue }
    const seg = lens[i] - lens[i - 1]
    const f = seg ? (target - lens[i - 1]) / seg : 0
    g.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f)
    break
  }
  g.stroke()
  g.restore()
}

// Ellipse that overshoots its start, like a quick pen circle.
export function ellipsePts(cx, cy, rx, ry, seed) {
  const r = rng(seed)
  const pts = []
  const start = -2.2 + r() * 0.4
  const turns = 1.12
  const n = 64
  for (let i = 0; i <= n; i++) {
    const a = start + (i / n) * Math.PI * 2 * turns
    const wob = 1 + (r() - 0.5) * 0.04 + (i / n) * 0.05
    pts.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob])
  }
  return pts
}

// Diagonal pen hatching inside a rect, revealed bottom-up by `k`.
export function hatch(g, x, y, w, h, k, { color = 'ink', gap = 14, width = 3, seed = 1, alpha = 0.85 } = {}) {
  if (k <= 0) return
  const top = y + h * (1 - clamp(k))
  const r = rng(seed)
  g.save()
  g.beginPath(); g.rect(x, top, w, y + h - top); g.clip()
  g.strokeStyle = ink(color)
  g.globalAlpha *= alpha
  g.lineWidth = width
  g.lineCap = 'round'
  for (let i = -h; i < w; i += gap) {
    g.beginPath()
    g.moveTo(x + i + (r() - 0.5) * 3, y + h)
    g.lineTo(x + i + h + (r() - 0.5) * 3, y)
    g.stroke()
  }
  g.restore()
}
