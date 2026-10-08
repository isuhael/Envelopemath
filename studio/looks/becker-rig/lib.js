// Shared components for the "becker-rig" look: "puppet + type + physics", all closed-form in t.
//
//   1. maths of motion ......... track(), E (eases), physics (fall, arc, hop, wobble, springStep, squashAt)
//   2. the rig ................. POSES, poseTrack(), runPose(), fk(), ik2(), pinLimb(), blendJ(), Figure
//   3. world ................... makeWorld(), camera(), makeFx() (impact kit: shake + flash + burst + cue)
//   4. props ................... coin(), block(), gate(), ladder(), ramp(), balance(), bar(), floorLine(), icon()
//   5. kinetic numbers ......... num(), numLike(), fmtLike(), rollTo(), NumObj (an HTML number with mass)
//   6. chrome .................. chromeParts(), chrome(), durationOf(), toneOf(), brand mark, captions, verdict
//   7. kit plumbing ............ preloadFonts(), stubFormat()
//
// Every function here is pure in t (or builds DOM once). Nothing reads the clock, nothing keeps per-frame state.
import { h, s, css, setText, setHTML, attr, markup, plain, fitText, captionAt, prog, clamp, lerp, ease, rng } from '../../runtime/core.js'
import { C, F, T, L, S, RIG, M, tone } from './theme.js'

export { C, F, T, L, S, RIG, M }
export { TONE } from './theme.js'
// Core helpers re-exported so a format imports everything from '../lib.js'. NOTE: core's css() setter is
// re-exported as `style` because a format module exports its own `css` string.
export { h, s, setText, setHTML, attr, markup, plain, fitText, captionAt, prog, clamp, lerp, rng }
export { css as style, tween, typed, graphemes, window01, money, fmtNum, beat, SAFE } from '../../runtime/core.js'
const RAD = Math.PI / 180

// =====================================================================================================
// 1. MATHS OF MOTION
// =====================================================================================================

/** Named eases (core's plus a few for character motion). Every ease maps 0 -> 0 and 1 -> 1. */
export const E = {
  ...ease,
  inOutQuad: p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2),
  outQuad: p => 1 - (1 - p) * (1 - p),
  inQuad: p => p * p,
  // snappy spring: fast rise, ~10% overshoot, settled by p = 1
  snap: p => (p >= 1 ? 1 : 1 - Math.exp(-7 * p) * Math.cos(10.5 * p)),
  // softer back-out (overshoot ~6%)
  backSoft: p => ease.back(p, 1.1),
  // hold, then snap at the end (anticipation-friendly)
  late: p => Math.pow(p, 4),
}
const easeOf = e => (typeof e === 'function' ? e : E[e] || E.inOut)

function lerpAny(a, b, p) {
  if (typeof a === 'number' && typeof b === 'number') return a + (b - a) * p
  if (Array.isArray(a) && Array.isArray(b)) return a.map((x, i) => lerpAny(x, b[i] ?? x, p))
  if (a && b && typeof a === 'object') {
    const o = {}
    for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
      const x = a[k] ?? ZERO_POSE[k] ?? 0, y = b[k] ?? ZERO_POSE[k] ?? 0
      o[k] = typeof x === 'string' ? (p < 1 ? x : y) : lerpAny(x, y, p)
    }
    return o
  }
  return p < 1 ? a : b
}

/**
 * Keyframe track, pure in t. keys: [{ t, v, d = 0.28, e = 'inOut' }]
 * A key means "start moving to v at time t, arriving at t + d". Values: numbers, arrays, objects (poses), pose names.
 * Overlapping moves are seamless: each move starts from wherever the previous one had got to.
 *   const x = track([{ t: 0, v: 100 }, { t: 1, v: 400, d: 0.3, e: 'spring' }]); x.at(1.15)
 */
export function track(keys, { d = M.move, e = 'inOut' } = {}) {
  const K = keys.filter(k => k && k.t != null).map(k => ({ d, e, ...k, v: typeof k.v === 'string' ? poseOf(k.v) : k.v }))
    .sort((a, b) => a.t - b.t)
  if (!K.length) throw new Error('track needs at least one key')
  const starts = [K[0].v]
  const raw = (t, upto) => {
    let i = -1
    for (let j = 0; j <= upto; j++) if (K[j].t <= t) i = j
    if (i < 0) return K[0].v
    const k = K[i]
    return lerpAny(starts[i], k.v, easeOf(k.e)(prog(t, k.t, k.d)))
  }
  for (let i = 1; i < K.length; i++) starts[i] = raw(K[i].t, i - 1)
  return { keys: K, at: t => raw(t, K.length - 1) }
}

// ---------- closed-form physics ----------
/** Parabolic arc from a to b ([x, y]) at progress p, bulging `height` px upward over the chord. */
export const arc = (p, a, b, height = 120) => [lerp(a[0], b[0], p), lerp(a[1], b[1], p) - 4 * height * p * (1 - p)]

/** A hop: height above rest at time t for a jump starting at t0 lasting dur (parabola). */
export const hop = (t, t0, dur, height) => (t <= t0 || t >= t0 + dur ? 0 : 4 * height * prog(t, t0, dur) * (1 - prog(t, t0, dur)))

/** Damped wobble: amp * e^(-decay*dt) * sin(2*pi*freq*dt), 0 before t0. */
export const wobble = (t, t0, amp, freq = 3, decay = 4) => (t < t0 ? 0 : amp * Math.exp(-decay * (t - t0)) * Math.sin(2 * Math.PI * freq * (t - t0)))

/** Step response of a damped spring from `from` to `to` starting at t0 (overshoots, then settles). */
export function springStep(t, t0, from, to, { freq = 2.4, damp = 0.32 } = {}) {
  if (t <= t0) return from
  const dt = t - t0, w = 2 * Math.PI * freq, z = damp
  const wd = w * Math.sqrt(1 - z * z)
  const k = Math.exp(-z * w * dt) * (Math.cos(wd * dt) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * dt))
  return to + (from - to) * k
}

/**
 * Squash-and-stretch after an impact at tHit: returns { sx, sy } (sy < 1 = squashed). amt 0..0.4.
 * Volume-ish preserving: sx = 1 + 0.6 * squash.
 */
export function squashAt(t, tHit, amt = 0.22, { freq = 6.5, decay = 13 } = {}) {
  if (t < tHit || amt <= 0) return { sx: 1, sy: 1 }
  const dt = t - tHit
  const q = amt * Math.exp(-decay * dt) * Math.cos(2 * Math.PI * freq * dt)
  return { sx: 1 + 0.6 * q, sy: 1 - q }
}

/**
 * Drop under gravity from `height` px above the rest position at t0, with damped bounces (closed form).
 * Returns { y, hits, landed, lastHit, lastV }: y = height above rest (>= 0), hits = impact times.
 * g in px/s^2, e = restitution (0..1), n = max bounces.
 */
export function fall(t, t0, height, { g = 5200, e = 0.34, n = 3 } = {}) {
  const tau = Math.sqrt((2 * Math.max(0, height)) / g)
  const hits = [t0 + tau]
  let v = g * tau, tt = t0 + tau
  const bounces = []
  for (let k = 0; k < n; k++) {
    v *= e
    const T = (2 * v) / g
    if (T < 1 / 60) break
    bounces.push({ t0: tt, v, T })
    tt += T
    hits.push(tt)
  }
  const out = { hits, y: height, landed: false, lastHit: null, lastV: 0 }
  if (t < t0) return out
  const dt = t - t0
  if (dt < tau) { out.y = height - 0.5 * g * dt * dt; return out }
  out.landed = true
  out.lastHit = t0 + tau
  out.lastV = g * tau
  out.y = 0
  for (const b of bounces) {
    if (t < b.t0) break
    const s2 = t - b.t0
    if (s2 < b.T) { out.y = b.v * s2 - 0.5 * g * s2 * s2; return out }
    out.lastHit = b.t0 + b.T
    out.lastV = b.v
  }
  return out
}

/** Projectile with floor bounces: start p0 [x,y], velocity v0 [vx,vy] at t0; floor y; returns [x, y, spin]. */
export function toss(t, t0, p0, v0, { g = 3200, floor = L.floorY, r = 0, e = 0.4, friction = 0.6, n = 3 } = {}) {
  if (t <= t0) return [p0[0], p0[1], 0]
  let dt = t - t0, x = p0[0], y = p0[1], vx = v0[0], vy = v0[1]
  const yFloor = floor - r
  for (let k = 0; k <= n; k++) {
    // time to hit the floor: y + vy*s + g s^2/2 = yFloor
    const A = 0.5 * g, B = vy, Cc = y - yFloor
    const disc = B * B - 4 * A * Cc
    const s0 = disc < 0 ? Infinity : (-B + Math.sqrt(disc)) / (2 * A)
    if (dt < s0 || k === n) {
      const ss = Math.min(dt, s0)
      return [x + vx * ss, Math.min(yFloor, y + vy * ss + 0.5 * g * ss * ss), (x + vx * ss - p0[0]) / Math.max(1, r)]
    }
    x += vx * s0; y = yFloor
    vy = -(vy + g * s0) * e; vx *= friction
    dt -= s0
    if (Math.abs(vy) < 60) { vy = 0; return [x + vx * Math.min(dt, 0.15), yFloor, (x - p0[0]) / Math.max(1, r)] }
  }
  return [x, yFloor, 0]
}

/** Time of the first floor contact for toss() (for scheduling a cue). */
export function tossHit(t0, p0, v0, { g = 3200, floor = L.floorY, r = 0 } = {}) {
  const A = 0.5 * g, B = v0[1], Cc = p0[1] - (floor - r)
  const disc = B * B - 4 * A * Cc
  return disc < 0 ? null : t0 + (-B + Math.sqrt(disc)) / (2 * A)
}

/** Pop-in: { scale, opacity } for an object appearing at t0 over dur (scale from `from`, overshoot, settle). */
export function popIn(t, t0, dur = 0.22, from = 0.82) {
  const p = prog(t, t0, dur)
  if (t < t0) return { scale: from, opacity: 0 }
  return { scale: from + (1 - from) * E.back(p, 2.2), opacity: clamp(p * 3) }
}

/** Smoothstep of x between a and b (0 below a, 1 above b). */
export const smooth = (a, b, x) => { const p = clamp((x - a) / (b - a)); return p * p * (3 - 2 * p) }
/** Lerp two points [x, y]. */
export const lerp2 = (a, b, p) => [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p]
/** Sine pulse: 0 outside [t0, t0 + d], 1 at the middle. */
export const bump = (t, t0, d) => (t <= t0 || t >= t0 + d ? 0 : Math.sin(Math.PI * (t - t0) / d))
const hexRGB = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
// OKLCH blend: lightness and chroma move together and the hue comes from the more saturated end, so a ramp from
// ink to a hue never passes through a muddy grey-brown (ink -> red goes through a deep red, not maroon mud)
const s2l = c => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
const l2s = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)
function toLch(hex) {
  const [r, g, b] = hexRGB(hex).map(v => s2l(v / 255))
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s3 = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s3
  const A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s3, B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s3
  return [L, Math.hypot(A, B), Math.atan2(B, A)]
}
function fromLch([L, Cc, hh]) {
  const A = Cc * Math.cos(hh), B = Cc * Math.sin(hh)
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3, m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3, s3 = (L - 0.0894841775 * A - 1.2914855480 * B) ** 3
  const rgb = [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s3, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s3, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s3]
  return rgb.map(v => Math.round(255 * clamp(l2s(clamp(v)))))
}
/** Blend two '#RRGGBB' colours in OKLCH (p clamped 0..1) -> 'rgb(r,g,b)'. */
export const mixOk = (a, b, p) => {
  const x = toLch(a), y = toLch(b), q = clamp(p)
  if (q <= 0) return `rgb(${hexRGB(a).join(',')})`
  if (q >= 1) return `rgb(${hexRGB(b).join(',')})`
  const hh = x[1] < 0.03 ? y[2] : y[1] < 0.03 ? x[2] : x[2] + (((y[2] - x[2] + 3 * Math.PI) % (2 * Math.PI)) - Math.PI) * q
  return `rgb(${fromLch([lerp(x[0], y[0], q), lerp(x[1], y[1], q), hh]).join(',')})`
}
/** Blend two '#RRGGBB' colours (p clamped 0..1) -> 'rgb(r,g,b)'. */
export const mix = (a, b, p) => { const x = hexRGB(a), y = hexRGB(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }

// =====================================================================================================
// 2. THE RIG
// =====================================================================================================
//
// Angles in degrees. Absolute directions are measured from straight DOWN, positive = FORWARD (the way the
// figure faces). 90 = straight ahead, 180 = up, -90 = behind.
//   lean   torso lean, + = forward               tilt   head nod, + = chin down, - = looking up
//   aF/aB  front/back arm: [shoulder angle relative to the torso's "down", elbow bend (+ = forearm swings forward/up)]
//   lF/lB  front/back leg: [hip angle (absolute), knee bend (- = shin swings back, a normal knee)]
//   lift   px the body is raised off the ground (jumps)     rot   whole-body rotation about the hip (+ = tip forward)
//   tl     torso length factor (breathing)                    sx/sy  squash/stretch about the feet
// "F" limbs are the ones on the facing side; in a front-on pose they read as the right/left pair.

const ZERO_POSE = { lean: 0, tilt: 0, aF: [0, 0], aB: [0, 0], lF: [0, 0], lB: [0, 0], lift: 0, rot: 0, tl: 1, sx: 1, sy: 1 }

/** The pose library (joint-angle sets). Extend by adding entries; every format can use them by name. */
export const POSES = {
  stand:     { lean: 0, tilt: 0, aF: [16, 16], aB: [-16, 12], lF: [11, -5], lB: [-11, -2] },
  idle:      { lean: -1, tilt: 2, aF: [12, 20], aB: [-14, 14], lF: [10, -4], lB: [-12, -2] },
  lookUp:    { lean: -6, tilt: -22, aF: [14, 18], aB: [-16, 14], lF: [12, -4], lB: [-10, -3] },
  think:     { lean: -3, tilt: 12, aF: [40, 136], aB: [-16, 20], lF: [12, -4], lB: [-9, -3] },
  thinkUp:   { lean: -6, tilt: -16, aF: [44, 134], aB: [-18, 20], lF: [12, -4], lB: [-9, -3] },
  point:     { lean: 2, tilt: -6, aF: [96, 6], aB: [-14, 20], lF: [6, -4], lB: [-10, -2] },
  pointUp:   { lean: -4, tilt: -16, aF: [140, 4], aB: [-16, 22], lF: [8, -4], lB: [-10, -2] },
  push:      { lean: 26, tilt: -6, aF: [96, 18], aB: [88, 26], lF: [24, -38], lB: [-30, -8] },
  pull:      { lean: -22, tilt: 6, aF: [70, 4], aB: [62, 8], lF: [32, -10], lB: [-12, -34] },
  lift:      { lean: -4, tilt: -12, aF: [170, 14], aB: [160, 22], lF: [16, -30], lB: [-14, -24] },
  carry:     { lean: -8, tilt: 4, aF: [44, 96], aB: [34, 104], lF: [8, -6], lB: [-8, -4] },
  hold:      { lean: -2, tilt: 2, aF: [52, 70], aB: [-12, 16], lF: [8, -6], lB: [-8, -4] },   // one hand forward
  windup:    { lean: -16, tilt: -6, aF: [-150, -20], aB: [64, 30], lF: [26, -14], lB: [-22, -28] },
  release:   { lean: 22, tilt: -2, aF: [150, 6], aB: [-30, 24], lF: [30, -34], lB: [-34, -6] },
  follow:    { lean: 30, tilt: 8, aF: [80, 10], aB: [-40, 20], lF: [32, -40], lB: [-38, -4] },
  crouch:    { lean: 26, tilt: 8, aF: [-34, 40], aB: [-48, 34], lF: [72, -124], lB: [52, -116] },
  catch:     { lean: -6, tilt: -10, aF: [130, 30], aB: [120, 36], lF: [12, -10], lB: [-12, -8] },
  chopUp:    { lean: -6, tilt: -4, aF: [172, -8], aB: [160, -4], lF: [16, -10], lB: [-16, -8] },
  chopDown:  { lean: 26, tilt: 10, aF: [70, 4], aB: [62, 8], lF: [26, -40], lB: [-28, -10] },
  shrug:     { lean: 0, tilt: 8, aF: [40, 120], aB: [-40, -120], lF: [6, -4], lB: [-6, -4] },
  shocked:   { lean: -12, tilt: -16, aF: [150, 34], aB: [-150, -34], lF: [26, -60], lB: [-26, -56], lift: 46 },
  celebrate: { lean: -8, tilt: -18, aF: [158, -20], aB: [-158, 20], lF: [14, -4], lB: [-14, -4] },
  slump:     { lean: 22, tilt: 34, aF: [14, 6], aB: [6, 4], lF: [8, -16], lB: [-4, -12] },
  flat:      { lean: 0, tilt: 0, aF: [166, 0], aB: [194, 0], lF: [12, 0], lB: [-12, 0], rot: 90, sy: 0.5, sx: 1.1 },
  fall:      { lean: -10, tilt: -22, aF: [148, 34], aB: [-150, -30], lF: [20, -30], lB: [-16, -24] },   // "whoa": arms up, riding a drop
  win:       { lean: -6, tilt: -18, aF: [144, -16], aB: [-144, 16], lF: [16, -4], lB: [-16, -4] },     // both arms up in a wide V
  sit:       { lean: 20, tilt: 30, aF: [58, 34], aB: [48, 40], lF: [92, -96], lB: [84, -88] },        // seated on a ledge, hands on his knees
  // run cycle (4 poses): contact, passing, contact (other leg), passing
  run1: { lean: 14, tilt: 2, aF: [-50, 80], aB: [46, 86], lF: [34, -10], lB: [-30, -36] },
  run2: { lean: 16, tilt: 4, aF: [-6, 90], aB: [10, 84], lF: [4, -14], lB: [-14, -110], lift: 8 },
  run3: { lean: 14, tilt: 2, aF: [46, 86], aB: [-50, 80], lF: [-30, -36], lB: [34, -10] },
  run4: { lean: 16, tilt: 4, aF: [10, 84], aB: [-6, 90], lF: [-14, -110], lB: [4, -14], lift: 8 },
}
// aliases (the names the look brief uses)
POSES.idleBreathe = POSES.idle
POSES.throw = POSES.release
POSES.shockedJump = POSES.shocked
POSES.flattened = POSES.flat
export const poseOf = p => (typeof p === 'string' ? (POSES[p] ? { ...ZERO_POSE, ...POSES[p] } : (() => { throw new Error(`unknown pose "${p}"`) })()) : { ...ZERO_POSE, ...p })

/** Pose track: keys [{ t, pose: 'push' | {...}, d, e }] -> { at(t) -> pose }. Default ease: spring overshoot. */
export const poseTrack = (keys, opts = {}) => track(keys.map(k => ({ ...k, v: k.v ?? k.pose })), { e: 'spring', ...opts })

/** Run / walk cycle at `phase` (cycles, any real number); amt 1 = run, ~0.45 = walk. */
export function runPose(phase, amt = 1) {
  const cyc = [POSES.run1, POSES.run2, POSES.run3, POSES.run4]
  const f = ((phase % 1) + 1) % 1 * 4
  const i = Math.floor(f), p = E.inOutSine(f - i)
  const P = lerpAny(poseOf(cyc[i]), poseOf(cyc[(i + 1) % 4]), p)
  return amt === 1 ? P : lerpAny(poseOf('stand'), P, amt)
}

/** Blend two poses (objects or names). */
export const blendPose = (a, b, p) => lerpAny(poseOf(a), poseOf(b), p)

/** Procedural secondary motion: breathing + head follow-through. Pure in t. */
export function secondary(pose, t, { breathe = 1, prev = null } = {}) {
  const b = Math.sin((2 * Math.PI * t) / M.breathe)
  const o = { ...pose, aF: [...pose.aF], aB: [...pose.aB] }
  if (breathe) {
    o.tl = (o.tl || 1) * (1 + 0.014 * b * breathe)
    o.aF[0] += 2.2 * b * breathe
    o.aB[0] -= 2.2 * b * breathe
    o.tilt += 1.2 * b * breathe
  }
  if (prev) {
    // head and arms lag the torso (follow-through): proportional to the torso's recent change
    const dl = (pose.lean || 0) - (prev.lean || 0)
    o.tilt += 0.7 * dl
    o.aF[1] += 0.25 * dl
    o.aB[1] += 0.25 * dl
  }
  return o
}

const add = (a, b) => [a[0] + b[0], a[1] + b[1]]
const mul = (a, k) => [a[0] * k, a[1] * k]
const dir = a => [Math.sin(a * RAD), Math.cos(a * RAD)]

/**
 * Forward kinematics: pose -> joints in stage px.
 * opts: { x (root x), ground (floor y), y (fixed hip y instead of planting), face (1 right | -1 left), scale,
 *         plant: 'feet' (lowest foot on the ground) | 'all' (lowest point of anything) | false }
 * Returns J = { hip, nk (neck), sh (arm root), head, eF, hF, eB, hB, kF, fF, kB, fB, R, k, sw, face, headRot, sx, sy, ground }.
 */
export function fk(pose, { x = 540, ground = L.floorY, y = null, face = 1, scale = 1, plant = 'feet', stroke = figStroke(scale) } = {}) {
  const P = poseOf(pose)
  const k = scale, R = RIG.headR * k
  const lean = P.lean || 0, tilt = P.tilt || 0
  const hip = [0, 0]
  const tdir = dir(180 - lean), tlen = RIG.torso * k * (P.tl || 1)
  const nk = add(hip, mul(tdir, tlen))                         // top of the torso (neck)
  const sh = add(hip, mul(tdir, tlen * RIG.shoulder))           // arms attach a little below the neck
  const head = add(nk, mul(dir(180 - lean - tilt), R + RIG.neck * k))
  const arm = a => { const p1 = -lean + a[0], p2 = p1 + a[1]; const e = add(sh, mul(dir(p1), RIG.upperArm * k)); return [e, add(e, mul(dir(p2), RIG.foreArm * k))] }
  const leg = l => { const p1 = l[0], p2 = p1 + l[1]; const kn = add(hip, mul(dir(p1), RIG.thigh * k)); return [kn, add(kn, mul(dir(p2), RIG.shin * k))] }
  const [eF, hF] = arm(P.aF), [eB, hB] = arm(P.aB), [kF, fF] = leg(P.lF), [kB, fB] = leg(P.lB)
  let pts = { hip, nk, sh, head, eF, hF, eB, hB, kF, fF, kB, fB }
  if (P.rot) {
    const c = Math.cos(P.rot * RAD), sn = Math.sin(P.rot * RAD)
    for (const key in pts) { const [px, py] = pts[key]; pts[key] = [px * c - py * sn, px * sn + py * c] }
  }
  const sw = stroke / 2
  let hipY
  if (y != null) hipY = y
  else {
    let maxY
    if (plant === 'all') maxY = Math.max(...Object.entries(pts).map(([n, p]) => p[1] + (n === 'head' ? R - sw : 0)))
    else maxY = Math.max(pts.fF[1], pts.fB[1])
    hipY = ground - sw - maxY
  }
  hipY -= (P.lift || 0) * k
  const J = {}
  for (const key in pts) J[key] = [x + face * pts[key][0], hipY + pts[key][1]]
  Object.assign(J, { R, k, sw, face, headRot: lean + tilt + (P.rot || 0), sx: P.sx ?? 1, sy: P.sy ?? 1, ground })
  return J
}

/**
 * Two-bone IK: root -> target with bone lengths l1, l2. bend = +1 / -1 picks the side of the middle joint
 * (+1: the joint sits counter-clockwise of the root->target line on screen, e.g. a knee pointing right when the
 * leg points down). Unreachable targets are clamped to full reach. Returns { mid, end }.
 */
export function ik2(root, target, l1, l2, bend = 1) {
  const dx = target[0] - root[0], dy = target[1] - root[1]
  const d = clamp(Math.hypot(dx, dy), Math.abs(l1 - l2) + 1e-3, l1 + l2 - 1e-3)
  const base = Math.atan2(dy, dx)
  const a = Math.acos(clamp((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1))
  const ang = base - bend * a
  return { mid: [root[0] + l1 * Math.cos(ang), root[1] + l1 * Math.sin(ang)], end: [root[0] + d * Math.cos(base), root[1] + d * Math.sin(base)] }
}

/**
 * Pin a limb's end to a world point with IK (mutates and returns J).
 * limb: 'hF' | 'hB' | 'fF' | 'fB'. bend: +1 = natural (elbows back/down, knees forward) for the figure's facing.
 */
export function pinLimb(J, limb, target, bend = 1) {
  const arm = limb[0] === 'h'
  const root = arm ? J.sh : J.hip
  const l1 = (arm ? RIG.upperArm : RIG.thigh) * J.k, l2 = (arm ? RIG.foreArm : RIG.shin) * J.k
  const sgn = (arm ? -1 : 1) * bend * J.face
  const { mid, end } = ik2(root, target, l1, l2, sgn)
  const side = limb[1]
  if (arm) { J['e' + side] = mid; J['h' + side] = end } else { J['k' + side] = mid; J['f' + side] = end }
  return J
}

/** Shift a joint set horizontally by dx (mutates and returns J). */
export function shiftJ(J, dx) {
  if (dx) for (const key of ['hip', 'nk', 'sh', 'head', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']) J[key] = [J[key][0] + dx, J[key][1]]
  return J
}

/** Blend two joint sets (position-wise). Good for 0.2-0.4 s transitions between an FK pose and an IK solve. */
export function blendJ(a, b, p) {
  if (p <= 0) return a
  if (p >= 1) return b
  const o = { ...b }
  for (const key of ['hip', 'nk', 'sh', 'head', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']) o[key] = [lerp(a[key][0], b[key][0], p), lerp(a[key][1], b[key][1], p)]
  o.headRot = lerp(a.headRot, b.headRot, p)
  o.sx = lerp(a.sx, b.sx, p); o.sy = lerp(a.sy, b.sy, p)
  return o
}

/**
 * Limb stroke of the figure in px. Constant in screen px whatever the scale (one uniform line weight across the
 * kit: a small figure is not drawn with a thinner pen). fk() plants feet with the same value.
 */
export const figStroke = () => S.figure

/**
 * The figure: filled round head, one-line torso, 2-bone limbs, uniform stroke with round caps, no face.
 * Identifying detail: a pencil tucked behind the head ("back of the envelope" maths).
 *   const fig = new Figure(world.g.fig, { scale: 1, color: C.hero })
 *   fig.pose(t, track, { x, ground, face })      // FK + secondary motion + draw; returns joints
 *   fig.draw(J)                                   // draw joints you solved yourself (IK, blends)
 * opts: scale, color, detail ('pencil' | null), opacity,
 *       outline (knockout colour: a halo drawn under the WHOLE figure so he reads in front of ink props; null =
 *       none), outlineWidth (px the halo adds to the limb width, default 12; ~5 keeps overlapping figures apart
 *       without chopping a line he stands on), seam (px a front limb's thin knockout adds over his own body,
 *       default 4: overlaps read as depth, not cuts; 0 = none), stroke (limb width in px, default figStroke()).
 * Draw order: halo (every part, one silhouette) < pencil < back limbs < torso < head < front-leg seam < front leg
 * < front-arm seam < front arm. The pencil is under the head, so it reads as tucked behind it; the head has no
 * knockout of its own over the torso (no gap at the neck); the seams start a little way out from the hip and the
 * shoulder, so the joints stay one clean silhouette.
 */
let FIG_N = 0
export class Figure {
  constructor(parent, { scale = 1, color = C.hero, detail = 'pencil', opacity = 1, outline = C.void, outlineWidth = 12, seam = 4, stroke = figStroke(scale) } = {}) {
    this.k = scale
    this.sw = stroke
    this.ow = outlineWidth
    this.sm = seam
    this.g = s('g', { class: 'br-fig', 'data-deco': '' })
    const st = { fill: 'none', stroke: color, 'stroke-width': stroke, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }
    this.inner = s('g')
    // halo: the same limbs and head, wider, in the void colour, drawn under the whole figure, so he stays readable
    // in front of ink props (ladders, gates, rails). outline: null turns it off.
    this.ko = null
    if (outline && outlineWidth > 0) {
      const ko = { ...st, stroke: outline, 'stroke-width': stroke + outlineWidth }
      this.ko = { lB: s('path', ko), aB: s('path', ko), torso: s('path', ko), lF: s('path', ko), aF: s('path', ko), head: s('ellipse', { fill: outline }) }
    }
    // seams: a thin knockout under each front limb (from a little way out of its joint), over his own body
    this.seam = null
    if (seam > 0) {
      const sc = { ...st, stroke: outline || C.void, 'stroke-width': stroke + seam }
      this.seam = { lF: s('path', sc), aF: s('path', sc) }
    }
    this.limbs = { lB: s('path', st), aB: s('path', st), torso: s('path', st), lF: s('path', st), aF: s('path', st) }
    this.pencil = detail === 'pencil' ? pencil(scale) : null
    this.head = s('ellipse', { fill: color })
    const K = this.ko, SM = this.seam
    // the halo stops 2 px above the ground he stands on, so it never chops the floor line (or a ledge) at his feet
    if (K) {
      const id = 'br-fig-clip-' + (++FIG_N)
      this.clipR = s('rect', { x: -20000, y: -20000, width: 40000, height: 0 })
      const cp = s('clipPath', { id, clipPathUnits: 'userSpaceOnUse' }, this.clipR)
      this.halo = s('g', { 'clip-path': `url(#${id})` }, K.lB, K.aB, K.torso, K.lF, K.aF, K.head)
      this.g.append(cp)
    }
    this.inner.append(
      ...(K ? [this.halo] : []),
      ...(this.pencil ? [this.pencil] : []),
      this.limbs.lB, this.limbs.aB, this.limbs.torso, this.head,
      ...(SM ? [SM.lF] : []), this.limbs.lF,
      ...(SM ? [SM.aF] : []), this.limbs.aF,
    )
    this.g.append(this.inner)
    parent.append(this.g)
    this.opacity = opacity
  }
  /** Draw a joint set. o: { opacity, sx, sy (squash about the ground under the hips), stroke (limb width for this
   *  frame, e.g. counter-scaled under a camera zoom) }. Joints solved at another scale (J.k) scale the pencil too. */
  draw(J, o = {}) {
    const f = n => J[n][0].toFixed(1) + ',' + J[n][1].toFixed(1)
    const sw = o.stroke ?? this.sw, ow = this.ow * (sw / this.sw), sm = this.sm * (sw / this.sw)
    for (const k in this.limbs) { attr(this.limbs[k], 'stroke-width', sw.toFixed(2)); if (this.ko) attr(this.ko[k], 'stroke-width', (sw + ow).toFixed(2)) }
    const D = {
      lB: `M${f('hip')}L${f('kB')}L${f('fB')}`, lF: `M${f('hip')}L${f('kF')}L${f('fF')}`,
      aB: `M${f('sh')}L${f('eB')}L${f('hB')}`, aF: `M${f('sh')}L${f('eF')}L${f('hF')}`,
      torso: `M${f('hip')}L${f('nk')}`,
    }
    for (const k in D) { attr(this.limbs[k], 'd', D[k]); if (this.ko) attr(this.ko[k], 'd', D[k]) }
    if (this.clipR) attr(this.clipR, 'height', ((J.ground ?? L.floorY) - 2 + 20000).toFixed(1))
    if (this.seam) {
      // the seam starts 40% out along the upper segment, so the hip and the shoulder stay seamless
      const out = (a, b) => { const x = J[a][0] + 0.4 * (J[b][0] - J[a][0]), y = J[a][1] + 0.4 * (J[b][1] - J[a][1]); return x.toFixed(1) + ',' + y.toFixed(1) }
      attr(this.seam.lF, 'd', `M${out('hip', 'kF')}L${f('kF')}L${f('fF')}`)
      attr(this.seam.aF, 'd', `M${out('sh', 'eF')}L${f('eF')}L${f('hF')}`)
      attr(this.seam.lF, 'stroke-width', (sw + sm).toFixed(2)); attr(this.seam.aF, 'stroke-width', (sw + sm).toFixed(2))
    }
    for (const [el, r] of [[this.head, J.R], ...(this.ko ? [[this.ko.head, J.R + ow / 2]] : [])]) {
      attr(el, 'cx', J.head[0].toFixed(1)); attr(el, 'cy', J.head[1].toFixed(1))
      attr(el, 'rx', r.toFixed(1)); attr(el, 'ry', r.toFixed(1))
    }
    const pk = (J.k || this.k) / this.k
    if (this.pencil) attr(this.pencil, 'transform', `translate(${J.head[0].toFixed(1)},${J.head[1].toFixed(1)}) scale(${(J.face * pk).toFixed(4)},${pk.toFixed(4)}) rotate(${J.headRot.toFixed(1)})`)
    const sx = (o.sx ?? 1) * J.sx, sy = (o.sy ?? 1) * J.sy
    if (sx !== 1 || sy !== 1) {
      const cx = J.hip[0], cy = J.ground
      attr(this.inner, 'transform', `translate(${cx.toFixed(1)},${cy.toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)}) translate(${(-cx).toFixed(1)},${(-cy).toFixed(1)})`)
    } else attr(this.inner, 'transform', '')
    attr(this.g, 'opacity', String(o.opacity ?? this.opacity))
    return J
  }
  /** Horizontal extent [x0, x1] of the figure drawn for joints J: limbs (with their halo), head and the pencil's
   *  eraser end. Use it to keep him inside the frame: if (x0 < 24) shift his x by 24 - x0. */
  extentX(J) {
    const hw = this.sw / 2 + (this.ko ? this.ow / 2 : 0)
    let x0 = Infinity, x1 = -Infinity
    for (const k of ['hip', 'nk', 'sh', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']) { x0 = Math.min(x0, J[k][0] - hw); x1 = Math.max(x1, J[k][0] + hw) }
    x0 = Math.min(x0, J.head[0] - J.R); x1 = Math.max(x1, J.head[0] + J.R)
    if (this.pencil) {
      const a = J.headRot * RAD, px = -2.0 * J.R, py = -1.35 * J.R          // the eraser end, head-local (facing +x)
      const ex = J.head[0] + J.face * (px * Math.cos(a) - py * Math.sin(a))
      x0 = Math.min(x0, ex); x1 = Math.max(x1, ex)
    }
    return [x0, x1]
  }
  /** Evaluate a pose track at t with secondary motion, solve FK (at this figure's scale), draw. o: fk opts +
   *  { breathe, sx, sy, opacity, pose (use this pose instead of the track), noDraw (return J without drawing) } */
  pose(t, tr, o = {}) {
    const p = o.pose || tr.at(t)
    const prev = o.pose ? null : tr.at(t - 0.07)
    const J = fk(secondary(p, t, { breathe: o.breathe ?? 1, prev }), { scale: this.k, stroke: this.sw, ...o })
    return o.noDraw ? J : this.draw(J, o)
  }
}

// pencil tucked behind the ear, seen in profile. It is drawn UNDER the head: the sharpened end is hidden inside
// the disc, and only the back ~45% of the yellow body, the ferrule and the pink eraser stick out up-and-back
// (30 deg above the backward horizontal, ~1.3 head radii past the head's edge). Local frame: head centre at 0,0,
// facing +x, upright.
const ERASER = '#F29497'   // pink eraser (red mixed toward white; the pencil's only non-palette tint)
function pencil(k) {
  const g = s('g', { class: 'br-pencil' })
  const R = RIG.headR * k
  const Lt = 2.7 * R, w = 0.36 * R, sw = Math.max(2.2, 3 * k)
  const cone = 0.56, body = 2.08, ferr = 2.36            // section ends along the axis, in head radii from the tip
  // axis: from the tip toward the eraser along +x, rotated 30 deg up-and-back. The tip sits half a radius in front
  // of the centre, a quarter radius above the axis through it, so the axis leaves the disc 1.4 radii from the tip
  const inner = s('g', { transform: `translate(${(0.5 * R).toFixed(2)},0) rotate(210)` })
  const yb = w / 2
  const at = f => (f * R).toFixed(2)
  inner.append(
    // body (yellow, faceted), ferrule (grey band), eraser (pink, rounded)
    s('path', { d: `M${at(cone)},${-yb}L${at(body)},${-yb}L${at(body)},${yb}L${at(cone)},${yb}Z`, fill: C.coin, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('line', { x1: at(cone + 0.05), y1: 0, x2: at(body - 0.04), y2: 0, stroke: C.coinDeep, 'stroke-width': Math.max(1.5, 2.2 * k), 'stroke-linecap': 'round' }),
    s('path', { d: `M${at(ferr)},${-yb}Q${(Lt + 0.04 * R).toFixed(2)},${-yb} ${Lt.toFixed(2)},0Q${(Lt + 0.04 * R).toFixed(2)},${yb} ${at(ferr)},${yb}Z`, fill: ERASER, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('rect', { x: at(body), y: (-yb).toFixed(2), width: at(ferr - body), height: w.toFixed(2), fill: C.line, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    // sharpened wood cone + graphite point
    s('path', { d: `M${at(cone)},${-yb}L0,0L${at(cone)},${yb}Z`, fill: C.white, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('path', { d: `M${at(0.2)},${(-yb * 0.36).toFixed(2)}L0,0L${at(0.2)},${(yb * 0.36).toFixed(2)}Z`, fill: C.ink, stroke: C.ink, 'stroke-width': sw * 0.6, 'stroke-linejoin': 'round' }),
  )
  g.append(inner)
  return g
}

// =====================================================================================================
// 3. WORLD, CAMERA, IMPACT KIT
// =====================================================================================================

/**
 * The world: everything the camera moves. One full-stage div holding
 *   svg (layers g.back, g.mid, g.fig, g.front, g.fx)  <  html (text layer)  <  top svg (g.top: over the text)
 * opts: { floor: true, floorY }. Append order puts the world under the chrome (header, captions).
 */
export function makeWorld(ctx, { floor = true, floorY = L.floorY, clip = null } = {}) {
  const root = h('div', { class: 'br-world' })
  const svg = s('svg', { class: 'br-svg', width: 1080, height: 1920, viewBox: '0 0 1080 1920' })
  const g = { back: s('g'), mid: s('g'), fig: s('g'), front: s('g'), fx: s('g') }
  svg.append(g.back, g.mid, g.fig, g.front, g.fx)
  const html = h('div', { class: 'br-html' })
  const topSvg = s('svg', { class: 'br-svg', width: 1080, height: 1920, viewBox: '0 0 1080 1920' })
  g.top = s('g')
  topSvg.append(g.top)
  const flash = h('div', { class: 'br-flash' })
  root.append(svg, html, topSvg, flash)
  if (floor) g.back.append(floorLine(floorY))
  // clip: [top, bottom] -> the world only shows inside this horizontal band (a scrolling viewport).
  // World coordinates stay stage coordinates; text that scrolls out of the band is clipped away.
  let viewport = null
  if (clip) {
    viewport = h('div', { class: 'br-viewport', style: { top: clip[0] + 'px', height: clip[1] - clip[0] + 'px' } })
    css(root, { top: -clip[0] + 'px' })
    viewport.append(root)
    ctx.stage.append(viewport)
  } else ctx.stage.append(root)
  return { root, svg, g, html, flash, floorY, viewport, clip }
}

/** The floor: one ink line across (and beyond) the stage. */
export const floorLine = (y = L.floorY) => s('line', { x1: -6000, x2: 7000, y1: y, y2: y, stroke: C.ink, 'stroke-width': S.thin, 'stroke-linecap': 'round', opacity: 0.85 })

/**
 * Camera on the world: cam.set({ x, y, zoom, shake: [dx, dy] }) puts world point (x, y) at screen (fx, fy)
 * (pass fx/fy to set() to move the screen anchor too). Defaults are identity. Keep zooms small (<= 1.06) on
 * text-heavy formats: text must stay in the safe zones.
 */
export function camera(world, { fx: fx0 = 540, fy: fy0 = 960 } = {}) {
  return {
    set({ fx = fx0, fy = fy0, x = fx, y = fy, zoom = 1, shake = [0, 0] } = {}) {
      const tx = fx - x * zoom + shake[0], ty = fy - y * zoom + shake[1]
      css(world.root, { transform: `matrix(${zoom.toFixed(4)},0,0,${zoom.toFixed(4)},${tx.toFixed(2)},${ty.toFixed(2)})` })
    },
  }
}

/**
 * Impact kit. fx.impact(t, { x, y, shake, flash, burst, cue, gain, r, punch }) registers an impact at mount time:
 *   - sound: ctx.cue(t, cue) ('hit' default; pass cue: null for silence)
 *   - screen shake: per-frame deterministic jitter, `shake` px, decaying over ~0.28 s
 *   - flash: white frame over the world, opacity `flash` (0..1) for ~2 frames
 *   - burst: radial hit lines just outside an ellipse rx × ry around (x, y) (default circle r), length ~r
 *   - punch: camera zoom kick (e.g. 0.03), read back from fx.seek(t).zoom
 * In seek(t): const { shake, zoom } = fx.seek(t); cam.set({ shake, zoom })
 */
export function makeFx(world, ctx) {
  const hits = []
  const self = {
    impact(t, { x = 540, y = 900, shake = 12, flash = 0, burst = true, cue = 'hit', gain, r = 70, rx = null, ry = null, lines = 10, punch = 0, color = C.ink } = {}) {
      const i = hits.length
      const rand = rng(977 + i * 131)
      const hit = { t, x, y, shake, flash, punch, r, rx: rx ?? r, ry: ry ?? r, seed: 977 + i * 131, burst: null }
      if (burst) {
        const g = s('g', { opacity: 0 })
        const ls = []
        for (let k = 0; k < lines; k++) {
          const a = (k / lines) * 2 * Math.PI + rand() * 0.35
          const len = 0.75 + rand() * 0.5
          const el = s('line', { stroke: color, 'stroke-width': 7, 'stroke-linecap': 'round', fill: 'none' })
          ls.push({ el, a, len })
          g.append(el)
        }
        world.g.fx.append(g)
        hit.burst = { g, ls }
      }
      if (cue) ctx.cue(t, cue, gain != null ? { gain } : {})
      hits.push(hit)
      return self
    },
    seek(t) {
      let dx = 0, dy = 0, fl = 0, zoom = 1
      for (const hit of hits) {
        const dt = t - hit.t
        if (hit.burst) {
          const on = dt >= 0 && dt < 0.26
          attr(hit.burst.g, 'opacity', on ? String(1 - E.inQuad(prog(dt, 0, 0.26))) : '0')
          if (!on) {
            // hidden: park every line on the impact point, so the DOM is the same whichever frame came before
            const px = hit.x.toFixed(1), py = hit.y.toFixed(1)
            for (const L2 of hit.burst.ls) { attr(L2.el, 'x1', px); attr(L2.el, 'y1', py); attr(L2.el, 'x2', px); attr(L2.el, 'y2', py) }
          } else {
            const p = E.out(prog(dt, 0, 0.22))
            for (const L2 of hit.burst.ls) {
              // lines start just outside the (elliptical) impact zone and shoot outward
              const c = Math.cos(L2.a), sn = Math.sin(L2.a)
              const e = 1 / Math.hypot(c / hit.rx, sn / hit.ry)          // radius of the ellipse in this direction
              const r0 = e + hit.r * (0.15 + 0.5 * p), r1 = e + hit.r * (0.45 + 0.75 * p * L2.len)
              attr(L2.el, 'x1', (hit.x + c * r0).toFixed(1)); attr(L2.el, 'y1', (hit.y + sn * r0).toFixed(1))
              attr(L2.el, 'x2', (hit.x + c * r1).toFixed(1)); attr(L2.el, 'y2', (hit.y + sn * r1).toFixed(1))
            }
          }
        }
        if (dt < 0 || dt > 0.5) continue
        const n = Math.floor(dt * 30 + 1e-6)
        const amp = hit.shake * Math.exp(-dt / 0.09)
        const r = rng(hit.seed + n * 7)
        dx += amp * (r() * 2 - 1)
        dy += amp * (r() * 2 - 1)
        if (hit.flash && dt < 0.07) fl = Math.max(fl, hit.flash * (1 - dt / 0.07))
        if (hit.punch) zoom *= 1 + hit.punch * Math.min(1, dt / 0.035) * Math.exp(-dt / 0.13)
      }
      css(world.flash, { opacity: fl.toFixed(3) })
      return { shake: [dx, dy], zoom }
    },
  }
  return self
}

// =====================================================================================================
// 4. PROPS (SVG). Each returns { g, set(...) } and is drawn in ink with round caps.
// =====================================================================================================

const strokeAttrs = (w = S.prop, color = C.ink) => ({ stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })

/**
 * Coin with a value: yellow disc, ink rim, inner ring, mono value text fitted to the disc, optional sub label.
 * set({ x, y, r, rot, sx, sy, text, sub, opacity, spin }) — spin 0..1 squashes the disc horizontally (a turning coin).
 * Text px scales with r: keep r >= ~60 when the value must be read (the linter checks the effective size).
 */
export function coin(parent, { r = 80, text = '', sub = '', fill = C.coin } = {}) {
  const g = s('g', { class: 'br-coin' })
  const body = s('g')
  const disc = s('circle', { r, fill, ...strokeAttrs(Math.max(4, r * 0.11)) })
  const style = css
  const ring = s('circle', { r: r * 0.78, fill: 'none', stroke: C.coinDeep, 'stroke-width': Math.max(2, r * 0.05), opacity: 0.8 })
  const tx = s('text', { class: 'br-coin-t', 'text-anchor': 'middle', 'dominant-baseline': 'central', y: sub ? -r * 0.12 : 0 })
  const sb = s('text', { class: 'br-coin-s', 'text-anchor': 'middle', 'dominant-baseline': 'central', y: r * 0.42 })
  body.append(disc, ring, tx, sb)
  g.append(body)
  parent.append(g)
  const fit = (str) => Math.min(r * 0.62, (1.5 * r) / Math.max(1, [...str].length * 0.6))
  const st = { r0: r }
  const self = {
    g, r0: r,
    set({ x = 0, y = 0, r: rr = r, rot = 0, sx = 1, sy = 1, text: tt = text, sub: ss = sub, opacity = 1, spin = 0 } = {}) {
      const k = rr / st.r0
      attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${(k * sx * (1 - 0.8 * spin)).toFixed(3)},${(k * sy).toFixed(3)})`)
      // opacity on each shape (not the group): what is painted behind text must report its real opacity
      const op = String(+opacity.toFixed(3))
      attr(disc, 'opacity', op); attr(ring, 'opacity', String(+(0.8 * opacity).toFixed(3))); attr(tx, 'opacity', op); attr(sb, 'opacity', String(+(0.75 * opacity).toFixed(3)))
      style(g, { display: opacity <= 0.001 ? 'none' : '' })
      setText(tx, tt); setText(sb, ss)
      if (tx.__fitFor !== tt) { tx.__fitFor = tt; attr(tx, 'font-size', fit(tt).toFixed(1)) }
      attr(sb, 'font-size', (st.r0 * 0.26).toFixed(1))
      attr(tx, 'y', ss ? (-st.r0 * 0.1).toFixed(1) : '0')
      css(tx, { display: spin > 0.35 ? 'none' : '' }); css(sb, { display: spin > 0.35 || !ss ? 'none' : '' })
      return self
    },
  }
  return self.set()
}

/**
 * Number block (a crate with a value). set({ x, y (bottom centre), w, h, sx, sy, rot, text, opacity, fill })
 */
export function block(parent, { w = 260, h = 120, text = '', fill = C.white, color = C.ink, size = null, font = F.head, weight = 900, rx = 14 } = {}) {
  const g = s('g', { class: 'br-block' })
  const rect = s('rect', { x: -w / 2, y: -h, width: w, height: h, rx, fill, ...strokeAttrs(S.prop) })
  const tx = s('text', { x: 0, y: -h / 2, 'text-anchor': 'middle', 'dominant-baseline': 'central', fill: color, 'font-family': font, 'font-weight': weight, 'font-size': size || h * 0.5 })
  g.append(rect, tx)
  parent.append(g)
  const self = {
    g, rect, text: tx,
    set({ x = 0, y = 0, sx = 1, sy = 1, rot = 0, text: tt = text, opacity = 1, fill: ff } = {}) {
      attr(g, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${rot.toFixed(1)}) scale(${sx.toFixed(3)},${sy.toFixed(3)})`)
      attr(g, 'opacity', String(opacity))
      if (ff) attr(rect, 'fill', ff)
      setText(tx, tt)
      return self
    },
  }
  return self.set()
}

/**
 * Gate with an operator label (e.g. "×1.07"): two posts standing on the floor and a plate on top.
 * set({ x, glow (0..1 brightens the plate border), label, opacity }) — x is the gate centre.
 */
export function gate(parent, { x = 790, floorY = L.floorY, w = 196, h = 370, label = '×1.07', post = 26, plateH = 70, size = 44 } = {}) {
  const g = s('g', { class: 'br-gate' })
  const pl = s('rect', { x: -w / 2 + 10, y: -h, width: post, height: h, fill: C.ink })
  const pr = s('rect', { x: w / 2 - 10 - post, y: -h, width: post, height: h, fill: C.ink })
  const plate = s('rect', { x: -w / 2, y: -h - plateH / 2, width: w, height: plateH, rx: 10, fill: C.ink })
  const glow = s('rect', { x: -w / 2 - 6, y: -h - plateH / 2 - 6, width: w + 12, height: plateH + 12, rx: 14, fill: 'none', stroke: C.hero, 'stroke-width': 6, opacity: 0 })
  const tx = s('text', { x: 0, y: -h, 'text-anchor': 'middle', 'dominant-baseline': 'central', class: 'br-gate-t', 'font-size': size })
  g.append(pl, pr, glow, plate, tx)
  parent.append(g)
  const self = {
    g, inner: [-w / 2 + 10 + post, w / 2 - 10 - post], top: floorY - h,
    set({ x: xx = x, glow: gl = 0, label: lb = label, opacity = 1 } = {}) {
      attr(g, 'transform', `translate(${xx.toFixed(1)},${floorY})`)
      attr(glow, 'opacity', String(gl))
      attr(g, 'opacity', String(opacity))
      setText(tx, lb)
      return self
    },
  }
  return self.set()
}

/**
 * Ladder: rails at x0 and x1 from yBottom up to yTop, rungs at the given y values (color: ink by default).
 * Returns { g, rails, rungs: [line] } — rungs can be shown/hidden individually.
 */
export function ladder(parent, { x0 = 90, x1 = 190, yBottom = L.floorY, yTop = 600, rungs = [], rail = S.prop, rung = S.rung, color = C.ink } = {}) {
  const g = s('g', { class: 'br-ladder' })
  const rails = [x0, x1].map(x => s('line', { x1: x, x2: x, y1: yBottom, y2: yTop, ...strokeAttrs(rail, color) }))
  const rs = rungs.map(y => s('line', { x1: x0, x2: x1, y1: y, y2: y, ...strokeAttrs(rung, color) }))
  g.append(...rails, ...rs)
  parent.append(g)
  return { g, rails, rungs: rs }
}

/** Ramp / hill: a filled wedge from (x0, y0) up to (x1, y1) down to the floor, ink top edge. */
export function ramp(parent, { x0 = 200, y0 = L.floorY, x1 = 900, y1 = 900, floorY = L.floorY, fill = C.lineSoft } = {}) {
  const g = s('g', { class: 'br-ramp' })
  const body = s('path', { d: `M${x0},${y0}L${x1},${y1}L${x1},${floorY}Z`, fill })
  const top = s('line', { x1: x0, y1: y0, x2: x1, y2: y1, ...strokeAttrs(S.prop) })
  g.append(body, top)
  parent.append(g)
  const slope = (y1 - y0) / (x1 - x0)
  return { g, slope, yAt: x => y0 + (x - x0) * slope, angle: Math.atan2(y1 - y0, x1 - x0) / RAD }
}

/**
 * Balance scale: post on the floor, beam pivoting at the top, two pans hanging from the beam ends.
 * set({ tilt (deg, + = right side down) }) returns the pan anchor points { left: [x,y], right: [x,y] } (top of each pan).
 */
export function balance(parent, { x = 540, floorY = L.floorY, postH = 420, beam = 560, hang = 150, panW = 200 } = {}) {
  const g = s('g', { class: 'br-balance' })
  const base = s('path', { d: `M${x - 90},${floorY}L${x + 90},${floorY}L${x + 40},${floorY - 34}L${x - 40},${floorY - 34}Z`, fill: C.ink })
  const post = s('line', { x1: x, x2: x, y1: floorY - 30, y2: floorY - postH, ...strokeAttrs(S.prop) })
  const beamEl = s('line', strokeAttrs(S.prop))
  const pivot = s('circle', { cx: x, cy: floorY - postH, r: 14, fill: C.ink })
  const pans = [0, 1].map(() => {
    const pg = s('g')
    pg.append(
      s('path', { d: `M0,0L${-panW / 2 + 10},${hang}M0,0L${panW / 2 - 10},${hang}`, fill: 'none', ...strokeAttrs(S.thin) }),
      s('path', { d: `M${-panW / 2},${hang}L${panW / 2},${hang}Q${panW / 2 - 18},${hang + 44} 0,${hang + 44}Q${-panW / 2 + 18},${hang + 44} ${-panW / 2},${hang}Z`, fill: C.white, ...strokeAttrs(S.rung) }),
    )
    return pg
  })
  g.append(base, post, beamEl, ...pans, pivot)
  parent.append(g)
  const py = floorY - postH
  return {
    g,
    set({ tilt = 0 } = {}) {
      const c = Math.cos(tilt * RAD), sn = Math.sin(tilt * RAD)
      const L0 = [x - (beam / 2) * c, py - (beam / 2) * sn], R0 = [x + (beam / 2) * c, py + (beam / 2) * sn]
      attr(beamEl, 'x1', L0[0].toFixed(1)); attr(beamEl, 'y1', L0[1].toFixed(1)); attr(beamEl, 'x2', R0[0].toFixed(1)); attr(beamEl, 'y2', R0[1].toFixed(1))
      attr(pans[0], 'transform', `translate(${L0[0].toFixed(1)},${L0[1].toFixed(1)})`)
      attr(pans[1], 'transform', `translate(${R0[0].toFixed(1)},${R0[1].toFixed(1)})`)
      return { left: [L0[0], L0[1] + hang], right: [R0[0], R0[1] + hang] }
    },
  }
}

/** A bar (rect anchored at its bottom-left), set({ x, y, w, h, fill, opacity }). Grows upward when h grows. */
export function bar(parent, { fill = C.hero, stroke = C.ink, sw = 0, rx = 6 } = {}) {
  const r = s('rect', { fill, rx, ...(sw ? { stroke, 'stroke-width': sw } : {}) })
  parent.append(r)
  return {
    el: r,
    set({ x = 0, y = L.floorY, w = 80, h = 0, fill: f, opacity = 1 } = {}) {
      attr(r, 'x', x.toFixed(1)); attr(r, 'y', (y - Math.max(0, h)).toFixed(1))
      attr(r, 'width', Math.max(0, w).toFixed(1)); attr(r, 'height', Math.max(0, h).toFixed(1))
      if (f) attr(r, 'fill', f)
      attr(r, 'opacity', String(opacity))
    },
  }
}

/** A horizontal rounded segment (a "shelf" / growth bar) from x0 to x1 at y. set({ x0, x1, y, opacity }). */
export function hbar(parent, { color = C.hero, width = 10 } = {}) {
  const el = s('line', { stroke: color, 'stroke-width': width, 'stroke-linecap': 'round' })
  parent.append(el)
  return {
    el,
    set({ x0 = 0, x1 = 0, y = 0, opacity = 1 } = {}) {
      const vis = x1 - x0 > 0.5
      attr(el, 'x1', x0.toFixed(1)); attr(el, 'x2', Math.max(x0, x1).toFixed(1)); attr(el, 'y1', y.toFixed(1)); attr(el, 'y2', y.toFixed(1))
      attr(el, 'opacity', vis ? String(opacity) : '0')
    },
  }
}

// ---------- icons (FORMATS.md unit list). 100 x 100 box centred on 0,0, ink line art, round caps. ----------
const IC = {
  coin: () => [s('circle', { r: 40, fill: C.coin, ...strokeAttrs(6) }), s('circle', { r: 27, fill: 'none', stroke: C.coinDeep, 'stroke-width': 4 })],
  bill: () => [s('rect', { x: -46, y: -27, width: 92, height: 54, rx: 7, fill: C.heroSoft, ...strokeAttrs(6) }), s('circle', { r: 13, fill: 'none', ...strokeAttrs(5) }),
    s('path', { d: 'M-33,-14v28M33,-14v28', fill: 'none', ...strokeAttrs(5) })],
  cup: () => [s('path', { d: 'M-30,-30L-22,42L22,42L30,-30Z', fill: C.white, ...strokeAttrs(6) }), s('path', { d: 'M-36,-30H36V-42H-36Z', fill: C.ink, ...strokeAttrs(6) }),
    s('path', { d: 'M-27,0H27L25,18H-25Z', fill: C.lineSoft, ...strokeAttrs(5) })],
  hotdog: () => [s('rect', { x: -48, y: -12, width: 96, height: 22, rx: 11, fill: C.white, ...strokeAttrs(6) }),
    s('path', { d: 'M-42,2Q-42,30 -18,30H18Q42,30 42,2Z', fill: C.coin, ...strokeAttrs(6) }), s('path', { d: 'M-30,-1L-20,-6L-10,-1L0,-6L10,-1L20,-6L30,-1', fill: 'none', ...strokeAttrs(4) })],
  burger: () => [s('path', { d: 'M-42,-6Q-42,-40 0,-40Q42,-40 42,-6Z', fill: C.coin, ...strokeAttrs(6) }), s('rect', { x: -44, y: -2, width: 88, height: 16, rx: 8, fill: C.ink, ...strokeAttrs(6) }),
    s('path', { d: 'M-42,20H42Q42,38 26,38H-26Q-42,38 -42,20Z', fill: C.coin, ...strokeAttrs(6) })],
  pizza: () => [s('path', { d: 'M-38,-34Q0,-48 38,-34L0,44Z', fill: C.coin, ...strokeAttrs(6) }), s('path', { d: 'M-38,-34Q0,-48 38,-34', fill: 'none', ...strokeAttrs(10) }),
    s('circle', { cx: -8, cy: -14, r: 7, fill: C.ink }), s('circle', { cx: 12, cy: -8, r: 6, fill: C.ink }), s('circle', { cx: 0, cy: 14, r: 6, fill: C.ink })],
  phone: () => [s('rect', { x: -26, y: -46, width: 52, height: 92, rx: 10, fill: C.white, ...strokeAttrs(6) }), s('rect', { x: -16, y: -34, width: 32, height: 58, rx: 3, fill: C.lineSoft }),
    s('circle', { cy: 35, r: 4, fill: C.ink })],
  car: () => [s('path', { d: 'M-46,12V-2L-30,-6L-18,-26H18L32,-6L46,-2V12Z', fill: C.white, ...strokeAttrs(6) }), s('path', { d: 'M-14,-20H14L22,-8H-22Z', fill: C.lineSoft, ...strokeAttrs(4) }),
    s('circle', { cx: -26, cy: 14, r: 11, fill: C.ink }), s('circle', { cx: 26, cy: 14, r: 11, fill: C.ink })],
  house: () => [s('path', { d: 'M-40,-4L0,-40L40,-4V40H-40Z', fill: C.white, ...strokeAttrs(6) }), s('rect', { x: -10, y: 12, width: 20, height: 28, fill: C.ink }),
    s('path', { d: 'M-48,-2L0,-46L48,-2', fill: 'none', ...strokeAttrs(7) })],
  gas: () => [s('rect', { x: -32, y: -40, width: 44, height: 82, rx: 6, fill: C.white, ...strokeAttrs(6) }), s('rect', { x: -24, y: -30, width: 28, height: 20, rx: 3, fill: C.lineSoft }),
    s('path', { d: 'M12,-20H24Q32,-20 32,-12V22Q32,30 38,30', fill: 'none', ...strokeAttrs(5) })],
  ticket: () => [s('path', { d: 'M-46,-26H46V-8A8,8 0 0 0 46,8V26H-46V8A8,8 0 0 0 -46,-8Z', fill: C.coin, ...strokeAttrs(6) }), s('path', { d: 'M10,-20V20', fill: 'none', stroke: C.ink, 'stroke-width': 4, 'stroke-dasharray': '6 6' })],
  bag: () => [s('path', { d: 'M-36,-16H36L30,42H-30Z', fill: C.white, ...strokeAttrs(6) }), s('path', { d: 'M-16,-16V-26Q-16,-42 0,-42Q16,-42 16,-26V-16', fill: 'none', ...strokeAttrs(6) })],
  egg: () => [s('path', { d: 'M0,-44C24,-44 36,4 36,16C36,34 20,44 0,44C-20,44 -36,34 -36,16C-36,4 -24,-44 0,-44Z', fill: C.white, ...strokeAttrs(6) })],
  hour: () => [s('circle', { r: 40, fill: C.white, ...strokeAttrs(6) }), s('path', { d: 'M0,-24V0L16,10', fill: 'none', ...strokeAttrs(6) })],
  token: () => [s('rect', { x: -32, y: -32, width: 64, height: 64, rx: 10, transform: 'rotate(45)', fill: C.heroSoft, ...strokeAttrs(6) })],
}
export const ICONS = Object.keys(IC)
/** icon(parent, name, { x, y, size }) -> <g>. Unknown names fall back to a generic token. */
export function icon(parent, name, { x = 0, y = 0, size = 100 } = {}) {
  const g = s('g', { class: 'br-icon', transform: `translate(${x},${y}) scale(${size / 100})` })
  g.append(...(IC[name] || IC.token)())
  parent && parent.append(g)
  return g
}

// =====================================================================================================
// 5. KINETIC NUMBERS
// =====================================================================================================

/** Numeric value of a display string: "$1,245" -> 1245, "≈ $1.2M" -> 1200000, "−$480" -> -480. */
export function num(display) {
  const str = String(display)
  const m = /(-|−)?\s*[^\d-−]*?(\d[\d,]*(?:\.\d+)?)\s*([KMBT])?/i.exec(str)
  if (!m) return NaN
  const mult = { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[(m[3] || '').toUpperCase()] || 1
  return (m[1] ? -1 : 1) * parseFloat(m[2].replace(/,/g, '')) * mult
}

/** The look of a display string, so interpolated values print the same way: { prefix, suffix, dp, grouped }. */
export function numLike(display) {
  const m = /^(.*?)(\d[\d,]*)(\.(\d+))?(.*)$/.exec(String(display))
  if (!m) return { prefix: '', suffix: '', dp: 0, grouped: true }
  return { prefix: m[1], suffix: m[5], dp: m[4] ? m[4].length : 0, grouped: m[2].includes(',') || m[2].length > 4 }
}
/** Format n in the style of `like` (from numLike). Only for running counters: they must land on the display string. */
export function fmtLike(n, like) {
  const v = Math.abs(n)
  let body = v.toFixed(like.dp)
  let [i, f] = body.split('.')
  if (like.grouped) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return like.prefix + i + (f ? '.' + f : '') + like.suffix
}
/** Running counter text from `from` (number) to the display string `to` at progress p; exactly `to` at p >= 1. */
export function rollTo(p, from, to) {
  if (p >= 1) return String(to)
  const like = numLike(to), target = num(to)
  const k = Math.pow(10, -like.dp)
  return fmtLike(Math.round(lerp(from, target, clamp(p)) / k) * k, like)
}

/**
 * Swap one display string for another as a physical beat: the old value squashes away, the new one pops in.
 * Returns { phase: 0 | 1, sx, sy, opacity } — set the text to `from` while phase is 0 and `to` once it is 1.
 *   const w = swapAt(t, 3.0); n.set({ text: w.phase ? '$1,967' : '$1,000', sx: w.sx, sy: w.sy, opacity: w.opacity })
 */
export function swapAt(t, t0, dur = 0.26) {
  if (t < t0) return { phase: 0, sx: 1, sy: 1, opacity: 1 }
  const p = prog(t, t0, dur)
  if (p < 0.4) { const q = E.in(p / 0.4); return { phase: 0, sx: 1 + 0.12 * q, sy: 1 - 0.3 * q, opacity: 1 - 0.85 * q } }
  const q = (p - 0.4) / 0.6
  const k = 0.82 + 0.18 * E.back(q, 2.4)
  return { phase: 1, sx: k, sy: k, opacity: clamp(q * 3) }
}

/**
 * Slots for n objects stacked bottom-up in a grid (unit stacks, coin piles): cols per row, cell w x h, from the
 * bottom-left corner (x0, y0). Row k is shifted by `stagger` * (k % 2) for a brick look. Returns [[x, y], ...]
 * as centres. Pure layout, no DOM.
 */
export function stackSlots(n, { x0 = 200, y0 = L.floorY, cols = 10, w = 60, h = 60, stagger = 0 } = {}) {
  const out = []
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols
    out.push([x0 + c * w + w / 2 + (r % 2) * stagger, y0 - r * h - h / 2])
  }
  return out
}

/**
 * A number with mass (HTML, lives in world.html or the stage). The anchor (ax, ay) is placed at (x, y);
 * rotation and squash happen about the anchor (default: bottom centre, so it squashes onto what it lands on).
 *   const n = new NumObj(world.html, { cls: 'gl-worth', text: '$1,245', ax: 1, ay: 1 })
 *   n.set({ x, y, sx, sy, rot, opacity, text })
 */
export class NumObj {
  constructor(parent, { cls = '', text = '', ax = 0.5, ay = 1, style = {}, html = false } = {}) {
    this.el = h('div', { class: 'br-num ' + cls, style })
    this.ax = ax; this.ay = ay; this.html = html
    if (html) setHTML(this.el, markup(text)); else setText(this.el, text)
    parent.append(this.el)
  }
  get w() { return this.el.offsetWidth }
  get hgt() { return this.el.offsetHeight }
  set({ x = 0, y = 0, sx = 1, sy = 1, rot = 0, opacity = 1, text, color, z } = {}) {
    css(this.el, {
      transform: `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg) scale(${sx.toFixed(3)},${sy.toFixed(3)}) translate(${-this.ax * 100}%,${-this.ay * 100}%)`,
      opacity: opacity.toFixed(3),
      ...(color ? { color } : {}),
      ...(z != null ? { zIndex: String(z) } : {}),
    })
    if (text != null) { if (this.html) setHTML(this.el, markup(text)); else setText(this.el, text) }
    return this
  }
  /** mark/unmark as an intended overlap (in flight over other text) */
  overlap(on) { if (this.el.__ov !== on) { this.el.__ov = on; on ? this.el.setAttribute('data-overlap-ok', '') : this.el.removeAttribute('data-overlap-ok') } return this }
}

/** Measure the rendered width of a string in a CSS font, with the stage's tabular figures. upper: CSS uppercase. */
export function measure(text, font, { letterSpacing = 'normal', html = false, upper = false } = {}) {
  let p = document.getElementById('br-probe')
  if (!p) { p = h('div', { id: 'br-probe' }); document.body.append(p) }
  p.style.font = font
  p.style.fontVariantNumeric = 'tabular-nums'     // the stage sets tabular figures on everything
  p.style.letterSpacing = letterSpacing
  p.style.textTransform = upper ? 'uppercase' : 'none'
  if (html) p.innerHTML = markup(text); else p.textContent = text
  return p.getBoundingClientRect().width
}

// =====================================================================================================
// 6. CHROME: brand mark, header (hook), footer (assumption line), captions, verdict
// =====================================================================================================

const PARTS = new WeakMap()

/**
 * Build (once per spec) and measure the header + footer so a format can lay out under them.
 * Returns { header, footer, headerBottom, footerBottom, workTop } (px). chrome() reuses the same elements.
 * opts (first call wins): { footerTop } to move the footer (e.g. to the bottom of the working area).
 */
export function chromeParts(spec, ctx, opts = {}) {
  if (PARTS.has(spec)) return PARTS.get(spec)
  const stage = ctx.stage
  const header = h('div', { class: 'br-header' })
  setHTML(header, markup(spec.header || ''))
  stage.append(header)
  fitText(header, L.right - L.left, { maxH: L.headerBottom - L.headerTop, minPx: T.headerMin })
  const headerBottom = spec.header ? L.headerTop + header.offsetHeight : L.headerTop
  let footer = null, footerBottom = headerBottom
  if (spec.footer) {
    footer = h('div', { class: 'br-footer' })
    setHTML(footer, markup(spec.footer))
    stage.append(footer)
    const top = opts.footerTop ?? Math.max(L.footerTop, headerBottom + 12)
    css(footer, { top: top + 'px' })
    fitText(footer, L.railX - L.left, { maxH: 2 * T.small * 1.25 + 10, minPx: T.floor })   // <= 2 lines (mono glyphs overhang the line box)
    footerBottom = top + footer.offsetHeight
  }
  const parts = { header, footer, headerBottom, footerBottom: opts.footerTop != null ? headerBottom : footerBottom, workTop: (opts.footerTop != null ? headerBottom : footerBottom) + 28 }
  PARTS.set(spec, parts)
  return parts
}

/** Brand mark (decoration, y < 230): green disc with "≈" + BACK OF THE ENVELOPE. */
export function brandMark() {
  return h('div', { class: 'br-brand', 'data-deco': '' }, h('b', {}, h('span', {}, '≈')), h('span', {}, 'BACK OF THE ENVELOPE'))
}

// split markup into words. A word is a whitespace-delimited chunk; it can hold several runs with their own
// emphasis ("**$2,450**." is ONE word: the green number plus a plain full stop), so punctuation never wraps alone.
// -> [{ parts: [{ s, cls: '' | 'em' | 'mark2' }] } | { br: true }]
export function wordTokens(text) {
  const src = String(text)
  const runs = []
  const re = /\*\*(.+?)\*\*|__(.+?)__/g
  let last = 0, m
  while ((m = re.exec(src))) {
    if (m.index > last) runs.push({ s: src.slice(last, m.index), cls: '' })
    runs.push({ s: m[1] != null ? m[1] : m[2], cls: m[1] != null ? 'em' : 'mark2' })
    last = re.lastIndex
  }
  if (last < src.length) runs.push({ s: src.slice(last), cls: '' })
  const out = []
  let cur = null
  for (const r of runs) {
    for (const piece of r.s.split(/(\s+)/)) {
      if (!piece) continue
      if (/^\s+$/.test(piece)) {
        cur = null
        for (let i = 0; i < (piece.match(/\n/g) || []).length; i++) out.push({ br: true })
        continue
      }
      if (!cur) { cur = { parts: [] }; out.push(cur) }
      cur.parts.push({ s: piece, cls: r.cls })
    }
  }
  return out
}

/**
 * chrome(spec, ctx, body) — every format in the kit gets: brand mark, header, footer, captions, verdict.
 * The format can steer it with body.chrome = { captions: false, verdict: false, verdictCue: 'ding' | null,
 *   captionTop, verdictTop }.
 */
export function chrome(spec, ctx, body = {}) {
  const o = body.chrome || {}
  const stage = ctx.stage
  const parts = chromeParts(spec, ctx)
  const brand = brandMark()
  stage.append(brand)
  stage.append(parts.header)                       // move on top of the world
  if (parts.footer) stage.append(parts.footer)

  // ---- captions: one prebuilt line per vo entry, words pop in fast, line fades out ----
  const capOn = spec.captions !== false && o.captions !== false && Array.isArray(spec.vo) && spec.vo.length
  const capBox = h('div', { class: 'br-caps', style: { top: (o.captionTop ?? L.capTop) + 'px' } })
  const lines = []
  if (capOn) {
    stage.append(capBox)
    for (const v of spec.vo) {
      const el = h('div', { class: 'br-cap' })
      const words = []
      for (const tk of wordTokens(v.text)) {
        if (tk.br) { el.append(h('br')); continue }
        const sp = h('span', { class: 'w' }, ...tk.parts.map(pt => (pt.cls ? h('span', { class: pt.cls }, pt.s) : pt.s)))
        words.push(sp)
        el.append(sp, ' ')
      }
      capBox.append(el)
      // integer line box (the linter reads px from the rendered height); balanced lines (no one-word orphans)
      for (let px = T.caption; px >= 40; px -= 2) {
        css(el, { fontSize: px + 'px', lineHeight: Math.round(px * 1.12) + 'px' })
        if (el.scrollWidth <= L.capW + 0.5 && el.scrollHeight <= L.capBottom - L.capTop - 6 + 0.5) break
      }
      css(el, { display: 'none' })
      lines.push({ v, el, words })
    }
  }

  // ---- verdict ----
  const vd = spec.verdict && o.verdict !== false ? spec.verdict : null
  let vEl = null, vRise = 26
  const swooshes = []
  if (vd) {
    const vTop = o.verdictTop ?? L.capTop, maxH = L.capBottom - L.capTop - 4
    vEl = h('div', { class: 'br-verdict', style: { top: vTop + 'px' } })
    setHTML(vEl, markup(vd.text))
    stage.append(vEl)
    let lh = 1.08
    const fitV = x => { lh = x; vEl.style.lineHeight = String(x); vEl.style.fontSize = T.verdict + 'px'; return fitText(vEl, L.capW, { maxH, minPx: 44 }) }
    let fs = fitV(1.08)
    const em = vEl.querySelector('em')
    // the swoosh goes under the emphasis. When the emphasis ends above the last line, a swoosh at the normal
    // line-height would strike through the next line's caps: open the leading (1.3, else 1.22) and clamp it.
    const onLast = () => { const rs = [...em.getClientRects()], vb = vEl.getBoundingClientRect(); return vb.bottom - rs[rs.length - 1].bottom < 0.5 * fs * lh }
    let swoosh = !!em
    if (em && !onLast()) {
      swoosh = false
      for (const x of [1.3, 1.22]) { fs = fitV(x); if (vEl.offsetHeight <= maxH + 0.5 && fs >= 44) { swoosh = true; break } }
      if (!swoosh) fs = fitV(1.08)          // a 3-line verdict: keep it tight, green emphasis without a swoosh
    }
    css(vEl, { top: (vTop + Math.max(0, (L.capBottom - L.capTop - vEl.offsetHeight) / 2)).toFixed(0) + 'px' })
    {
      // the pop rises into place: never from below the caption band's bottom edge
      const rg = document.createRange(); rg.selectNodeContents(vEl)
      const inkBottom = Math.max(...[...rg.getClientRects()].map(r => r.bottom))
      vRise = clamp(L.capBottom - 3 - inkBottom, 0, 26)
    }
    if (em && swoosh) {
      const r0 = vEl.getBoundingClientRect()
      // baseline of the emphasis' last line: a zero-size inline-block sits on it
      const probe = h('span', { style: { display: 'inline-block', width: '0px', height: '0px' } })
      em.append(probe)
      const rects = [...em.getClientRects()].filter(r => r.width > 2)
      const descent = rects[rects.length - 1].bottom - probe.getBoundingClientRect().top
      probe.remove()
      const svg = s('svg', { class: 'br-vsw', width: r0.width, height: r0.height + 30, 'data-deco': '' })
      const lhPx = lh * fs, SW = 9
      for (const r of rects) {
        const x0 = r.left - r0.left, x1 = r.right - r0.left, b = r.bottom - r0.top - descent
        let yl = b + 0.30 * fs, yr = b + 0.24 * fs, yc = b + 0.46 * fs
        if (r0.bottom - r.bottom >= 0.5 * lhPx) {
          // not the last line: the path's lowest point + half the stroke stays 3 px above the next line's caps
          const limit = b + lhPx - 0.76 * fs - SW / 2 - 3
          const sag = Math.min(8, yc - (yl + yr) / 2)
          yc = (yl + yr) / 2 + sag
          const lowest = 0.25 * yl + 0.5 * yc + 0.25 * yr
          if (lowest > limit) { const d = lowest - limit; yl -= d; yr -= d; yc -= d }
        }
        const path = s('path', { d: `M${(x0 + 4).toFixed(1)},${yl.toFixed(1)} Q${((x0 + x1) / 2).toFixed(1)},${yc.toFixed(1)} ${(x1 - 4).toFixed(1)},${yr.toFixed(1)}`, fill: 'none', stroke: C.hero, 'stroke-width': SW, 'stroke-linecap': 'round' })
        svg.append(path)
        const len = Math.hypot(x1 - x0, 14) * 1.05
        attr(path, 'stroke-dasharray', len.toFixed(1))
        swooshes.push({ path, len })
      }
      vEl.append(svg)
    }
    css(vEl, { display: 'none' })
    if (o.verdictCue !== null) ctx.cue(vd.t, o.verdictCue || 'ding', { gain: 0.7 })
  }

  return {
    seek(t) {
      const vOn = vd && t >= vd.t
      // captions
      if (capOn) {
        const c = vOn ? null : captionAt(spec.vo, t)
        for (let i = 0; i < lines.length; i++) {
          const ln = lines[i]
          const on = c && c.index === i
          css(ln.el, { display: on ? '' : 'none' })
          if (!on) {
            // hidden lines keep one canonical state (not whatever the last visited frame left behind)
            for (const w of ln.words) css(w, { opacity: '0', transform: 'translateY(16px)' })
            continue
          }
          const end = ln.v.d != null ? ln.v.t + ln.v.d : (spec.vo[i + 1] ? spec.vo[i + 1].t : ln.v.t + 3)
          const out = 1 - prog(t, end, 0.15)
          const n = ln.words.length
          const stagger = Math.min(0.045, 0.32 / Math.max(1, n))
          ln.words.forEach((w, k) => {
            const p = prog(t, ln.v.t + k * stagger, 0.16)
            css(w, { opacity: (clamp(p * 2.2) * out).toFixed(3), transform: `translateY(${((1 - E.out(p)) * 16).toFixed(1)}px)` })
          })
        }
      }
      // verdict
      if (vEl) {
        css(vEl, { display: vOn ? '' : 'none' })
        if (vOn) {
          const p = prog(t, vd.t, 0.42)
          const sc = 0.86 + 0.14 * E.back(p, 2.4)
          css(vEl, { opacity: clamp(p * 4).toFixed(3), transform: `translateY(${((1 - E.out(p)) * vRise).toFixed(1)}px) scale(${sc.toFixed(3)})` })
          for (const sw of swooshes) attr(sw.path, 'stroke-dashoffset', (sw.len * (1 - E.inOut(prog(t, vd.t + 0.3, 0.38)))).toFixed(1))
        }
      }
    },
  }
}

/** Duration rule: last beat + hold, the last vo line end + 0.4, verdict.t + 2.5 (whichever is latest). */
export function durationOf(spec, lastBeat = 0, hold = 3) {
  if (spec.duration) return spec.duration
  let d = lastBeat + hold
  for (const v of spec.vo || []) d = Math.max(d, v.t + (v.d ?? 2.5) + 0.4)
  if (spec.verdict) d = Math.max(d, spec.verdict.t + 2.5)
  return Math.round(d * 30) / 30
}

/** tone -> { text, fill, soft } colours (good / bad / goal / neutral). */
export const toneOf = tone

// =====================================================================================================
// 7. KIT PLUMBING
// =====================================================================================================

/** Load every face the kit uses before measuring anything (fitText, column widths). */
export async function preloadFonts() {
  const faces = [
    '900 40px "Inter Tight"', '800 40px "Inter Tight"', '700 40px "Inter Tight"', '600 40px "Inter Tight"',
    '800 40px "JetBrains Mono"', '700 40px "JetBrains Mono"', '500 40px "JetBrains Mono"',
    '900 40px "Inter Full"', '800 40px "Inter Full"', '700 40px "Inter Full"', '600 40px "Inter Full"', '500 40px "Inter Full"', '400 40px "Inter Full"',
    '800 40px "Inter"', '700 40px "Inter"', '600 40px "Inter"',
  ]
  await Promise.all(faces.map(f => document.fonts.load(f, 'Aa0$,.%≈×÷−→').catch(() => null)))
  await document.fonts.ready
}

/**
 * Placeholder format used until a format is built: the header + footer + captions (chrome) and the figure
 * idling beside a centred "TODO <format>" block, so the kit loads and lints.
 */
export function stubFormat(name) {
  return (spec, ctx) => {
    chromeParts(spec, ctx)
    const world = makeWorld(ctx)
    const fig = new Figure(world.g.fig)
    const tr = poseTrack([{ t: 0, pose: 'think' }, { t: 1.5, pose: 'shrug', d: 0.3 }, { t: 3, pose: 'idle', d: 0.4 }])
    const box = new NumObj(world.html, { cls: 'br-todo', text: `TODO ${name}`, ax: 0.5, ay: 0.5 })
    return {
      duration: durationOf(spec, 4, 2),
      seek(t) { fig.pose(t, tr, { x: 200 }); box.set({ x: 560, y: 900 }) },
    }
  }
}
