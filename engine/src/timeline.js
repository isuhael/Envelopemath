// Spec normalisation and per-frame composition.
import { createCanvas } from '@napi-rs/canvas'
import { W, H, registerFonts } from './theme.js'
import { paper } from './paper.js'
import { ease, clamp, lerp } from './util.js'
import { hook, write, lines, counter, ladder, drawCaption } from './ops/text.js'
import { annotate, highlight, stamp, postmark, postage, sticky } from './ops/marks.js'
import { envelope, receipt, stuff, emoji } from './ops/props.js'
import { bars, curve, grid } from './ops/charts.js'
import { choices, pick, timer, outro } from './ops/quiz.js'

export const OPS = { hook, write, lines, counter, ladder, annotate, highlight, stamp, postmark, postage, sticky, envelope, receipt, stuff, emoji, bars, curve, grid, choices, pick, timer, outro }
const CONTROL = new Set(['clear', 'flip'])

/**
 * Turn a raw JSON spec into a render-ready one: defaults filled, `clear`/`flip` resolved into
 * per-op `until` times, shakes collected and the duration computed when not given.
 */
export function prepare(raw) {
  registerFonts()
  const spec = structuredClone(raw)
  if (!Array.isArray(spec.ops)) throw new Error('spec.ops must be an array')
  spec.fps ??= 30
  spec.paper = { style: 'kraft', seed: 7, ...(spec.paper || {}) }
  spec.captions ??= []
  spec.camera ??= []
  const probe = createCanvas(10, 10).getContext('2d')
  const ops = []
  spec.ops.forEach((op, i) => {
    if (typeof op.t !== 'number') throw new Error(`op #${i} (${op.type}) needs a numeric t`)
    if (CONTROL.has(op.type)) return
    const def = OPS[op.type]
    if (!def) throw new Error(`op #${i}: unknown type "${op.type}" (known: ${Object.keys(OPS).join(', ')}, clear, flip)`)
    op._i = i
    op.fadeOut ??= 0.25
    def.prepare?.(op, probe)
    op._fixed = op.fixed ?? !!def.fixed
    ops.push(op)
  })
  const controls = spec.ops.filter(o => CONTROL.has(o.type)).sort((a, b) => a.t - b.t)
  for (const c of controls) {
    if (c.type === 'flip') c.dur ??= 0.5
    const cut = c.type === 'flip' ? c.t + c.dur / 2 : c.t
    for (const op of ops) {
      if (op.persist || op.t >= c.t) continue
      if (op.until != null && op.until <= cut) continue
      op.until = cut
      if (c.type === 'flip') op.fadeOut = 0
    }
  }
  spec._ops = ops.sort((a, b) => (a.z ?? 0) - (b.z ?? 0) || a.t - b.t)
  spec._flips = controls.filter(c => c.type === 'flip')
  spec._shakes = ops.filter(o => OPS[o.type].shake).map(o => OPS[o.type].shake(o)).filter(Boolean)
  const ends = [...ops.map(o => o.t + (OPS[o.type].duration(o) || 0)), ...spec.captions.map(c => c.end), ...controls.map(c => c.t + (c.dur || 0))]
  spec.duration ??= Math.ceil((Math.max(...ends) + 0.8) * 10) / 10
  return spec
}

export function camera(spec, t) {
  const ks = spec.camera
  const def = { zoom: 1, x: W / 2, y: H / 2 }
  if (!ks.length) return def
  const full = ks.map(k => ({ ...def, ...k }))
  if (t <= full[0].t) return full[0]
  for (let i = 0; i < full.length - 1; i++) {
    const a = full[i], b = full[i + 1]
    if (t <= b.t) {
      const k = ease.inOut(clamp((t - a.t) / Math.max(0.001, b.t - a.t)))
      return { zoom: lerp(a.zoom, b.zoom, k), x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k) }
    }
  }
  return full[full.length - 1]
}

function shake(spec, t) {
  let x = 0, y = 0
  for (const s of spec._shakes) {
    const k = (t - s.at) / 0.35
    if (k < 0 || k > 1) continue
    const a = s.amp * (1 - k) * (1 - k)
    x += Math.sin(t * 93) * a
    y += Math.cos(t * 71) * a
  }
  return [x, y]
}

function flipScale(spec, t) {
  let sx = 1
  for (const f of spec._flips) {
    if (t < f.t || t > f.t + f.dur) continue
    sx = Math.min(sx, Math.max(0.002, Math.abs(Math.cos(((t - f.t) / f.dur) * Math.PI))))
  }
  return sx
}

function drawOps(g, ops, t, spec) {
  for (const op of ops) {
    const lt = t - op.t
    if (lt < 0) continue
    let a = 1
    if (op.until != null && t >= op.until) {
      if (!op.fadeOut || t >= op.until + op.fadeOut) continue
      a = 1 - (t - op.until) / op.fadeOut
    }
    g.save()
    g.globalAlpha = a
    OPS[op.type].draw(g, op, lt, { t, spec })
    g.restore()
  }
}

/** Draw the frame at time t into a context already scaled to 1080x1920 units. */
export function drawFrame(g, spec, t) {
  g.fillStyle = '#1a140e'
  g.fillRect(0, 0, W, H)
  const cam = camera(spec, t)
  const [sx, sy] = shake(spec, t)
  const fx = flipScale(spec, t)
  g.save()
  g.translate(W / 2 + sx, H / 2 + sy)
  g.scale(fx, 1)
  g.save()
  g.scale(cam.zoom, cam.zoom)
  g.translate(-cam.x, -cam.y)
  g.drawImage(paper(spec.paper.style, spec.paper.seed), 0, 0)
  drawOps(g, spec._ops.filter(o => !o._fixed), t, spec)
  g.restore()
  g.translate(-W / 2, -H / 2)
  drawOps(g, spec._ops.filter(o => o._fixed), t, spec)
  g.restore()
  const cap = spec.captions.find(c => t >= c.t && t < c.end)
  if (cap) drawCaption(g, cap, t)
}
