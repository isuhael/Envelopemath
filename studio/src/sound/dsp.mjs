// DSP primitives for the sound engine (sound bible §1, §10.2). 48 kHz, Float64 maths into Float32 buffers.
// Everything here is deterministic: no Math.random, no clock. Randomness comes only from seeded streams (rngFor).
//
// Buffers: a mono signal is a Float32Array. A stereo signal is { L, R } (two Float32Arrays of equal length), with two
// optional fields that the engine reads when it places the buffer on the timeline:
//   offset  samples of pre-roll: the buffer's sample `offset` sits at the event time (a reverse swell, a reveal pre-roll)
//   meta    anything the renderer wants to report (pitches, pan, duck, sends, body: false ...)
// Oscillators and filters are small stateful objects with a per-sample `next()`/`run()` so their pitch and cutoff can be
// modulated sample by sample; the helpers at the bottom render whole buffers.

export const SR = 48000
export const NYQ = SR / 2
export const TAU = Math.PI * 2
/** seconds -> samples (rounded, the bible's placement rule) */
export const sec = s => Math.max(0, Math.round(s * SR))
export const dbToGain = db => Math.pow(10, db / 20)
export const gainToDb = g => (g > 0 ? 20 * Math.log10(g) : -Infinity)
export const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
export const lerp = (a, b, k) => a + (b - a) * k
const DENORMAL = 1e-25
const flush = x => (x > -DENORMAL && x < DENORMAL ? 0 : x)

// ---------------------------------------------------------------- seeded randomness
/** mulberry32: the studio's PRNG (same as src/audio.mjs), returns floats in [0, 1) */
export function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
/** FNV-1a 32-bit hash of a string (UTF-8 bytes) */
export function fnv1a32(str) {
  let h = 0x811c9dc5
  for (const b of Buffer.from(String(str), 'utf8')) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0 }
  return h >>> 0
}
/** bible §1: seed(specId, stream) = FNV-1a-32("<specId>|<stream>") */
export const seedFor = (id, stream) => fnv1a32(`${id}|${stream}`)
/**
 * A seeded stream: r() -> [0, 1), plus helpers that each draw a FIXED number of values:
 * r.range(a, b), r.int(n) (0..n-1), r.pick(arr), r.sign() (+1/-1), r.bi() ([-1, 1)), r.gauss() (2 draws), r.chance(p).
 */
export function makeRng(seed) {
  const r = mulberry32(seed)
  const f = () => r()
  f.seed = seed >>> 0
  f.range = (a, b) => a + (b - a) * r()
  f.int = n => Math.min(n - 1, Math.floor(r() * n))
  f.pick = arr => arr[Math.min(arr.length - 1, Math.floor(r() * arr.length))]
  f.sign = () => (r() < 0.5 ? -1 : 1)
  f.bi = () => r() * 2 - 1
  f.chance = p => r() < p
  f.gauss = () => { const u = Math.max(1e-12, r()), v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(TAU * v) }
  return f
}
export const rngFor = (id, stream) => makeRng(seedFor(id, stream))

// ---------------------------------------------------------------- buffers
export const mono = n => new Float32Array(Math.max(0, n | 0))
export const stereo = n => ({ L: new Float32Array(Math.max(0, n | 0)), R: new Float32Array(Math.max(0, n | 0)), offset: 0 })
export const isStereo = b => !!b && b.L instanceof Float32Array
export const lenOf = b => (isStereo(b) ? b.L.length : b.length)

/** constant-power pan law (bible §1): pan in [-1, 1] -> [gL, gR], with L = cos θ, R = sin θ, θ = (pan + 1)·π/4 */
export function panGains(pan = 0) {
  const th = (clamp(pan, -1, 1) + 1) * Math.PI / 4
  return [Math.cos(th), Math.sin(th)]
}
/** mono -> stereo with constant-power pan (pan may be a number or a Float32Array of per-sample pans) */
export function panMono(x, pan = 0, gain = 1) {
  const out = stereo(x.length)
  if (typeof pan === 'number') {
    const [gl, gr] = panGains(pan)
    for (let i = 0; i < x.length; i++) { out.L[i] = x[i] * gl * gain; out.R[i] = x[i] * gr * gain }
  } else {
    for (let i = 0; i < x.length; i++) { const [gl, gr] = panGains(pan[i]); out.L[i] = x[i] * gl * gain; out.R[i] = x[i] * gr * gain }
  }
  return out
}
/** make anything stereo: a stereo buffer is returned as is (or re-panned with balance), mono is panned */
export function toStereo(b, pan = 0) {
  if (isStereo(b)) {
    if (!pan) return b
    // constant-power balance on a stereo source: scale L and R by the pan law, normalised to centre = 1
    const [gl, gr] = panGains(pan), k = Math.SQRT2
    for (let i = 0; i < b.L.length; i++) { b.L[i] *= gl * k; b.R[i] *= gr * k }
    return b
  }
  return panMono(b, pan)
}
/**
 * Stereo width via mid/side, in place: w = 0 folds to mono, 1 leaves it, > 1 widens (the side is scaled by w).
 * No delays are involved (bible §8.5: no Haas widening).
 */
export function width(b, w = 1) {
  for (let i = 0; i < b.L.length; i++) { const m = 0.5 * (b.L[i] + b.R[i]), s = 0.5 * (b.L[i] - b.R[i]) * w; b.L[i] = m + s; b.R[i] = m - s }
  return b
}
/** dst += src * g, placed so that src sample `src.offset || 0` lands on dst sample `at` (stereo or mono into mono/stereo) */
export function addAt(dst, src, at, g = 1) {
  const off = (src && src.offset) || 0
  const start = at - off
  if (isStereo(dst)) {
    const s = isStereo(src) ? src : { L: src, R: src }
    const n = s.L.length, D = dst.L.length
    const i0 = Math.max(0, -start), i1 = Math.min(n, D - start)
    for (let i = i0; i < i1; i++) { dst.L[start + i] += s.L[i] * g; dst.R[start + i] += s.R[i] * g }
  } else {
    const n = src.length, D = dst.length
    const i0 = Math.max(0, -start), i1 = Math.min(n, D - start)
    for (let i = i0; i < i1; i++) dst[start + i] += src[i] * g
  }
  return dst
}
export function scale(b, g) {
  if (isStereo(b)) { for (let i = 0; i < b.L.length; i++) { b.L[i] *= g; b.R[i] *= g } } else for (let i = 0; i < b.length; i++) b[i] *= g
  return b
}
export function peakOf(b) {
  let p = 0
  if (isStereo(b)) { for (let i = 0; i < b.L.length; i++) { const a = Math.abs(b.L[i]), c = Math.abs(b.R[i]); if (a > p) p = a; if (c > p) p = c } } else for (let i = 0; i < b.length; i++) { const a = Math.abs(b[i]); if (a > p) p = a }
  return p
}
export function rmsOf(x, i0 = 0, i1 = x.length) {
  let s = 0
  i0 = Math.max(0, i0); i1 = Math.min(x.length, i1)
  for (let i = i0; i < i1; i++) s += x[i] * x[i]
  return i1 > i0 ? Math.sqrt(s / (i1 - i0)) : 0
}
/** reverse a buffer (mono or stereo) in place-free copy; a reversed stereo buffer keeps its meta, offset = length - 1 */
export function reverse(b) {
  if (isStereo(b)) return { L: Float32Array.from(b.L).reverse(), R: Float32Array.from(b.R).reverse(), offset: b.L.length, meta: b.meta }
  return Float32Array.from(b).reverse()
}
/** multiply by an envelope array (shorter env: the rest is multiplied by its last value... or 0 with zeroTail) */
export function applyEnv(x, env) {
  const n = Math.min(x.length, env.length)
  for (let i = 0; i < n; i++) x[i] *= env[i]
  for (let i = n; i < x.length; i++) x[i] = 0
  return x
}
/** short linear fades at both ends (anti-click, bible §1: attack >= 1 ms, release >= 5 ms) */
export function fadeEdges(b, inS = 0.001, outS = 0.005) {
  const chans = isStereo(b) ? [b.L, b.R] : [b]
  for (const x of chans) {
    const fi = Math.min(x.length, sec(inS)), fo = Math.min(x.length, sec(outS))
    for (let i = 0; i < fi; i++) x[i] *= i / fi
    for (let i = 0; i < fo; i++) x[x.length - 1 - i] *= i / fo
  }
  return b
}

// ---------------------------------------------------------------- pitch helpers (more in theory.mjs)
export const mtof = m => 440 * Math.pow(2, (m - 69) / 12)
export const ftom = f => 69 + 12 * Math.log2(f / 440)
export const cents = c => Math.pow(2, c / 1200)

// ---------------------------------------------------------------- oscillators
/** 2-point PolyBLEP residual for a step at phase t (0..1), phase increment dt */
function blep(t, dt) {
  if (t < dt) { const x = t / dt; return x + x - x * x - 1 }
  if (t > 1 - dt) { const x = (t - 1) / dt; return x * x + x + x + 1 }
  return 0
}
/** 2-point PolyBLAMP residual (the integral of blep), for slope corners (triangle) */
function blamp(t, dt) {
  if (t < dt) { const x = t / dt - 1; return -x * x * x / 3 }
  if (t > 1 - dt) { const x = (t - 1) / dt + 1; return x * x * x / 3 }
  return 0
}

/**
 * A band-limited oscillator. shape: 'sine' | 'saw' | 'square' | 'pulse' | 'tri'.
 * PolyBLEP saw/square/pulse (pulse width `pw`, 0..1), PolyBLAMP triangle, plain sine. Phase in cycles [0, 1).
 * next(freqHz, pw?) returns one sample in about [-1, 1] and accumulates phase (glides never use sin(2π f(t) t)).
 */
export class Osc {
  constructor(shape = 'sine', { phase = 0, pw = 0.5, sr = SR } = {}) {
    this.shape = shape; this.ph = ((phase % 1) + 1) % 1; this.pw = pw; this.sr = sr; this.isr = 1 / sr
    const m = { sine: this._sine, saw: this._saw, square: this._pulse, pulse: this._pulse, tri: this._tri }[shape]
    if (!m) throw new Error(`Osc: unknown shape ${shape}`)
    this.next = m
  }
  _adv(f) {
    const dt = f * this.isr
    let p = this.ph + dt
    if (p >= 1) p -= Math.floor(p); else if (p < 0) p -= Math.floor(p)
    this.ph = p
  }
  _sine(f) { const y = Math.sin(TAU * this.ph); this._adv(f); return y }
  _saw(f) {
    const dt = Math.min(0.5, Math.abs(f) * this.isr), p = this.ph
    const y = 2 * p - 1 - blep(p, dt)
    this._adv(f); return y
  }
  _pulse(f, pw = this.pw) {
    const dt = Math.min(0.5, Math.abs(f) * this.isr), p = this.ph
    const w = pw < 0.02 ? 0.02 : pw > 0.98 ? 0.98 : pw
    // DC of a pulse is 2w - 1: removed so a pulse wave sits on 0
    const y = (p < w ? 1 : -1) + blep(p, dt) - blep((p - w + 1) % 1, dt) - (2 * w - 1)
    this._adv(f); return y
  }
  _tri(f) {
    // naive triangle, peak at p = 0.25, trough at 0.75 (slope 4 per cycle); corners corrected by PolyBLAMP
    const dt = Math.min(0.5, Math.abs(f) * this.isr), p = this.ph
    const q = (p + 0.25) % 1
    let y = q < 0.5 ? 4 * q - 1 : 3 - 4 * q
    y += 4 * dt * (blamp(q, dt) - blamp((p + 0.75) % 1, dt))
    this._adv(f); return y
  }
}

/**
 * Render an oscillator into a mono buffer of n samples. freq: Hz (number), or a function (i, t) -> Hz, or a Float32Array
 * (i is the output sample index at SR either way).
 * opts: { phase, pw (number | (i,t) => pw), gain, os: 1 | 2 }. os 2 renders at 96 kHz and decimates (sharp FIR): use it
 * for bright, unfiltered saws/squares above ~MIDI 80, where 1x PolyBLEP leaves folded partials near 20 kHz at about
 * -30 dB (measured: a raw A6 saw -29.9 dB at 23.4 kHz at 1x, -55.8 dB at 2x; behind a 24 dB LP at 6 kHz, 1x is -63.6 dB).
 */
export function osc(shape, n, freq, { phase = 0, pw = 0.5, gain = 1, os = 1 } = {}) {
  const fF = typeof freq === 'function', fA = freq instanceof Float32Array || freq instanceof Float64Array, pF = typeof pw === 'function'
  const fAt = i => (fF ? freq(i, i / SR) : fA ? freq[Math.min(freq.length - 1, i)] : freq)
  if (os === 2) {
    const out = oversample2(n, (n2, sr2) => {
      const o = new Osc(shape, { phase, pw: typeof pw === 'number' ? pw : 0.5, sr: sr2 }), b = mono(n2)
      for (let j = 0; j < n2; j++) { const i = j >> 1; b[j] = o.next(fAt(i), pF ? pw(i, i / SR) : o.pw) }
      return b
    })
    if (gain !== 1) for (let i = 0; i < n; i++) out[i] *= gain
    return out
  }
  const o = new Osc(shape, { phase, pw: typeof pw === 'number' ? pw : 0.5 })
  const out = mono(n)
  for (let i = 0; i < n; i++) out[i] = gain * o.next(fAt(i), pF ? pw(i, i / SR) : o.pw)
  return out
}

/**
 * Unison stack of `voices` detuned oscillators, spread over ±detune cents and ±spread pan (constant power), with seeded
 * start phases (rng). Returns stereo, normalised by 1/sqrt(voices). opts.os as in osc().
 */
export function unison(shape, n, freq, { voices = 3, detune = 10, spread = 0.5, rng = null, pw = 0.5, gain = 1, os = 1 } = {}) {
  const out = stereo(n)
  const fF = typeof freq === 'function', fA = freq instanceof Float32Array || freq instanceof Float64Array
  const base = fF ? freq : fA ? (i => freq[Math.min(freq.length - 1, i)]) : (() => freq)
  const norm = gain / Math.sqrt(voices)
  for (let v = 0; v < voices; v++) {
    const k = voices === 1 ? 0 : (v / (voices - 1)) * 2 - 1
    const ratio = cents(k * detune), [gl, gr] = panGains(k * spread)
    const y = osc(shape, n, i => base(i, i / SR) * ratio, { phase: rng ? rng() : 0, pw, os })
    for (let i = 0; i < n; i++) { out.L[i] += y[i] * norm * gl; out.R[i] += y[i] * norm * gr }
  }
  return out
}

/** seeded noise. color: 'white' | 'pink' (Paul Kellet) | 'brown' (leaky integrated) */
export function noise(n, rng, color = 'white', gain = 1) {
  const out = mono(n)
  if (color === 'white') { for (let i = 0; i < n; i++) out[i] = gain * (rng() * 2 - 1); return out }
  if (color === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0
    for (let i = 0; i < n; i++) {
      const w = rng() * 2 - 1
      b0 = 0.99886 * b0 + w * 0.0555179; b1 = 0.99332 * b1 + w * 0.0750759; b2 = 0.969 * b2 + w * 0.153852
      b3 = 0.8665 * b3 + w * 0.3104856; b4 = 0.55 * b4 + w * 0.5329522; b5 = -0.7616 * b5 - w * 0.016898
      out[i] = gain * 0.11 * (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362); b6 = w * 0.115926
    }
    return out
  }
  if (color === 'brown') {
    let y = 0
    for (let i = 0; i < n; i++) { y = 0.996 * y + 0.06 * (rng() * 2 - 1); out[i] = gain * y * 1.6 }
    return out
  }
  throw new Error(`noise: unknown color ${color}`)
}

// ---------------------------------------------------------------- filters
/**
 * TPT / zero-delay-feedback state-variable filter (Zavalishin, Simper). 12 dB/oct. run(x, fc?, q?) -> the mode's output;
 * after run(), .lp .bp .hp hold all three. Cutoff may change every sample (g = tan(π fc / SR) is recomputed only when it changes).
 */
export class SVF {
  constructor(mode = 'lp', fc = 1000, q = 0.7071) { this.mode = mode; this.ic1 = 0; this.ic2 = 0; this.lp = this.bp = this.hp = 0; this._fc = -1; this._q = -1; this.set(fc, q) }
  set(fc, q = this._q) {
    if (fc === this._fc && q === this._q) return
    this._fc = fc; this._q = q
    const g = Math.tan(Math.PI * clamp(fc, 5, SR * 0.49) / SR), k = 1 / Math.max(0.05, q)
    this.g = g; this.k = k
    this.a1 = 1 / (1 + g * (g + k)); this.a2 = g * this.a1; this.a3 = g * this.a2
  }
  run(x, fc, q) {
    if (fc !== undefined) this.set(fc, q === undefined ? this._q : q)
    const v3 = x - this.ic2
    const v1 = this.a1 * this.ic1 + this.a2 * v3
    const v2 = this.ic2 + this.a2 * this.ic1 + this.a3 * v3
    this.ic1 = flush(2 * v1 - this.ic1); this.ic2 = flush(2 * v2 - this.ic2)
    this.lp = v2; this.bp = v1; this.hp = x - this.k * v1 - v2
    return this.mode === 'lp' ? v2 : this.mode === 'hp' ? this.hp : this.mode === 'bp' ? v1 * this.k /* unity-peak band-pass */ : this.mode === 'notch' ? x - this.k * v1 : v2
  }
  reset() { this.ic1 = this.ic2 = 0 }
}
/**
 * Filter a mono buffer in place with an SVF. mode lp|hp|bp|notch; poles 2 (12 dB) or 4 (24 dB: two cascaded stages, the first
 * at Butterworth Q 0.541, the second at q... with q = 0.7071 the pair is a 4th-order Butterworth when q2 = 1.307).
 * fc / q may be numbers or functions (i, t) -> value or Float32Arrays (per-sample modulation).
 */
export function svf(x, mode, fc, { q = 0.7071, poles = 2 } = {}) {
  const fF = typeof fc === 'function', fA = fc instanceof Float32Array || fc instanceof Float64Array
  const qF = typeof q === 'function', qA = q instanceof Float32Array || q instanceof Float64Array
  const stages = poles >= 4 ? 2 : 1
  const st = [new SVF(mode, 1000, 0.7071), new SVF(mode, 1000, 0.7071)]
  for (let i = 0; i < x.length; i++) {
    const f = fF ? fc(i, i / SR) : fA ? fc[i] : fc
    const qq = qF ? q(i, i / SR) : qA ? q[i] : q
    let y = x[i]
    if (stages === 2) { y = st[0].run(y, f, mode === 'bp' ? qq : 0.5412); y = st[1].run(y, f, mode === 'bp' ? qq : qq * 1.8478) }
    else y = st[0].run(y, f, qq)
    x[i] = y
  }
  return x
}
/** stereo convenience: filter L and R independently with the same settings */
export function svfStereo(b, mode, fc, opts) { svf(b.L, mode, fc, opts); svf(b.R, mode, fc, opts); return b }

/** 1-pole low-pass (TPT), in place. hz may be a number or a function (i, t) -> Hz */
export function onePoleLP(x, hz) {
  let s = 0
  const fF = typeof hz === 'function'
  let G = 0
  if (!fF) { const g = Math.tan(Math.PI * clamp(hz, 1, SR * 0.49) / SR); G = g / (1 + g) }
  for (let i = 0; i < x.length; i++) {
    if (fF) { const g = Math.tan(Math.PI * clamp(hz(i, i / SR), 1, SR * 0.49) / SR); G = g / (1 + g) }
    const v = (x[i] - s) * G, y = v + s
    s = flush(y + v); x[i] = y
  }
  return x
}
/** 1-pole high-pass (TPT), in place */
export function onePoleHP(x, hz) {
  let s = 0
  const g = Math.tan(Math.PI * clamp(hz, 1, SR * 0.49) / SR), G = g / (1 + g)
  for (let i = 0; i < x.length; i++) { const v = (x[i] - s) * G, lp = v + s; s = flush(lp + v); x[i] = x[i] - lp }
  return x
}
/** DC blocker: 1-pole high-pass at `hz` (default 20 Hz), y = x - x1 + R y1 */
export function dcBlock(x, hz = 20) {
  const R = Math.exp(-TAU * hz / SR)
  let x1 = 0, y1 = 0
  for (let i = 0; i < x.length; i++) { const y = x[i] - x1 + R * y1; x1 = x[i]; y1 = flush(y); x[i] = y }
  return x
}

/** RBJ cookbook biquad coefficients. type: lp hp bp peak lowshelf highshelf notch allpass. Returns { b0 b1 b2 a1 a2 } (a0 = 1). */
export function biquadCoefs(type, f, { q = 0.7071, gainDb = 0 } = {}) {
  const w = TAU * clamp(f, 1, SR * 0.499) / SR, cw = Math.cos(w), sw = Math.sin(w)
  const A = Math.pow(10, gainDb / 40), al = sw / (2 * q)
  let b0, b1, b2, a0, a1, a2
  switch (type) {
    case 'lp': b0 = (1 - cw) / 2; b1 = 1 - cw; b2 = b0; a0 = 1 + al; a1 = -2 * cw; a2 = 1 - al; break
    case 'hp': b0 = (1 + cw) / 2; b1 = -(1 + cw); b2 = b0; a0 = 1 + al; a1 = -2 * cw; a2 = 1 - al; break
    case 'bp': b0 = al; b1 = 0; b2 = -al; a0 = 1 + al; a1 = -2 * cw; a2 = 1 - al; break
    case 'notch': b0 = 1; b1 = -2 * cw; b2 = 1; a0 = 1 + al; a1 = -2 * cw; a2 = 1 - al; break
    case 'allpass': b0 = 1 - al; b1 = -2 * cw; b2 = 1 + al; a0 = 1 + al; a1 = -2 * cw; a2 = 1 - al; break
    case 'peak': b0 = 1 + al * A; b1 = -2 * cw; b2 = 1 - al * A; a0 = 1 + al / A; a1 = -2 * cw; a2 = 1 - al / A; break
    case 'lowshelf': { const s = 2 * Math.sqrt(A) * al
      b0 = A * ((A + 1) - (A - 1) * cw + s); b1 = 2 * A * ((A - 1) - (A + 1) * cw); b2 = A * ((A + 1) - (A - 1) * cw - s)
      a0 = (A + 1) + (A - 1) * cw + s; a1 = -2 * ((A - 1) + (A + 1) * cw); a2 = (A + 1) + (A - 1) * cw - s; break }
    case 'highshelf': { const s = 2 * Math.sqrt(A) * al
      b0 = A * ((A + 1) + (A - 1) * cw + s); b1 = -2 * A * ((A - 1) + (A + 1) * cw); b2 = A * ((A + 1) + (A - 1) * cw - s)
      a0 = (A + 1) - (A - 1) * cw + s; a1 = 2 * ((A - 1) - (A + 1) * cw); a2 = (A + 1) - (A - 1) * cw - s; break }
    default: throw new Error(`biquad: unknown type ${type}`)
  }
  return { b0: b0 / a0, b1: b1 / a0, b2: b2 / a0, a1: a1 / a0, a2: a2 / a0 }
}
/** run a biquad (direct form II transposed) over a mono buffer in place. c: coefficients (biquadCoefs or raw) */
export function biquad(x, c) {
  let z1 = 0, z2 = 0
  const { b0, b1, b2, a1, a2 } = c
  for (let i = 0; i < x.length; i++) {
    const v = x[i], y = b0 * v + z1
    z1 = flush(b1 * v - a1 * y + z2); z2 = flush(b2 * v - a2 * y)
    x[i] = y
  }
  return x
}
/** convenience: filter(x, 'hp', 25, { q, gainDb }) in place (mono), or both channels of a stereo buffer */
export function filter(b, type, f, opts = {}) {
  const c = biquadCoefs(type, f, opts)
  if (isStereo(b)) { biquad(b.L, c); biquad(b.R, c); return b }
  return biquad(b, c)
}

// ---------------------------------------------------------------- envelopes
/**
 * ADSR as a Float32Array of `n` samples: linear attack `a`, exponential decay towards `s` (99% of the way at `d`),
 * sustain until `gate` seconds, exponential release that reaches exactly 0 at gate + r (no click).
 * If n is longer than gate + r the rest is 0. Times in seconds.
 */
export function adsr(n, { a = 0.002, d = 0.1, s = 0.7, r = 0.05, gate = Infinity, peak = 1 } = {}) {
  const out = mono(n)
  const A = Math.max(1, a * SR), td = Math.max(1e-4, d / 4.6) * SR, G = Math.min(n, Math.round(gate * SR)), Rn = Math.max(1, r * SR)
  let lvl = 0
  for (let i = 0; i < Math.min(n, G); i++) {
    lvl = i < A ? (i / A) * peak : peak * (s + (1 - s) * Math.exp(-(i - A) / td))
    out[i] = lvl
  }
  if (G < n) {
    // release from the level at the gate (attack may not have finished)
    const L0 = G > 0 ? out[G - 1] : 0, tr = Rn / 6.9
    for (let j = 0; j < n - G; j++) {
      if (j >= Rn) break
      const k = j / Rn
      out[G + j] = L0 * Math.max(0, (Math.exp(-j / tr) - 0.001 * k) / 0.999)
    }
  }
  return out
}
/** attack (linear, `a` s) then exponential decay with time constant `tau` s; n samples. */
export function expEnv(n, tau, a = 0.001, peak = 1) {
  const out = mono(n), A = Math.max(1, a * SR), T = Math.max(1e-6, tau) * SR
  for (let i = 0; i < n; i++) out[i] = peak * (i < A ? i / A : Math.exp(-(i - A) / T))
  return out
}
/** attack/release: linear attack `a`, hold to `hold`, then linear release `r` to 0 */
export function arEnv(n, a, hold, r) {
  const out = mono(n), A = Math.max(1, a * SR), H = hold * SR, R = Math.max(1, r * SR)
  for (let i = 0; i < n; i++) out[i] = i < A ? i / A : i < H ? 1 : Math.max(0, 1 - (i - H) / R)
  return out
}
/** exponential glide in semitones: offset st0 at t=0 decaying to 0 with time constant tau. Returns a fn (i) -> Hz around f */
export const glideSt = (f, st0, tau) => i => f * Math.pow(2, (st0 * Math.exp(-i / (tau * SR))) / 12)
/** exponential glide in Hz: f(t) = f1 + (f0 - f1)·e^(-t/τ) */
export const glideHz = (f0, f1, tau) => i => f1 + (f0 - f1) * Math.exp(-i / (tau * SR))
/** exponential sweep over dur: f(t) = f0 · (f1/f0)^(t/dur), held after dur */
export const sweep = (f0, f1, dur) => i => f0 * Math.pow(f1 / f0, Math.min(1, i / (dur * SR)))

// ---------------------------------------------------------------- sources
/**
 * FM operator pair (carrier f, modulator ratio·f, index I(t)). The index is clamped so the Carson bandwidth stays under
 * fmax (default 18 kHz): I <= (fmax - f) / (ratio·f) - 1 (bible §5 ding). Returns mono, unit amplitude (multiply by an env).
 * index: number | (i) -> number | Float32Array. Phase accumulates for both operators.
 */
export function fm(n, f, { ratio = 1, index = 1, fmax = 18000, feedback = 0, phase = 0 } = {}) {
  const out = mono(n)
  const iF = typeof index === 'function', iA = index instanceof Float32Array
  const fF = typeof f === 'function'
  let pc = phase, pm = 0, prev = 0
  for (let i = 0; i < n; i++) {
    const fc = fF ? f(i) : f, fmod = fc * ratio
    const imax = Math.max(0, (fmax - fc) / Math.max(1e-9, fmod) - 1)
    const I = Math.min(imax, iF ? index(i) : iA ? index[i] : index)
    const m = Math.sin(TAU * pm + feedback * prev)
    prev = m
    out[i] = Math.sin(TAU * pc + I * m)
    pc += fc / SR; pm += fmod / SR
    if (pc > 1) pc -= 1
    if (pm > 1) pm -= 1
  }
  return out
}
/** Carson clamp helper: the largest FM index whose bandwidth fits under fmax */
export const fmIndexMax = (f, ratio, fmax = 18000) => Math.max(0, (fmax - f) / (ratio * f) - 1)

/**
 * Additive/modal voice: partials [{ ratio, amp, tau }] at fundamental f (Hz), each a decaying sine (phase accumulated);
 * partials above maxHz (default 16 kHz) are dropped. Returns mono of n samples (sum, not normalised).
 */
export function modal(n, f, partials, { maxHz = 16000, attack = 0.0005 } = {}) {
  const out = mono(n), A = Math.max(1, attack * SR)
  for (const p of partials) {
    const fr = f * p.ratio
    if (fr >= maxHz || fr >= NYQ) continue
    const w = TAU * fr / SR, dec = Math.exp(-1 / (Math.max(1e-4, p.tau) * SR))
    // sin(w i) · amp · e^{-i/τ}, phase accumulated
    let ph = 0, e = p.amp
    for (let i = 0; i < n; i++) {
      out[i] += Math.sin(ph) * e * (i < A ? i / A : 1)
      ph += w; if (ph > TAU) ph -= TAU
      e *= dec
      if (e < 1e-7) break
    }
  }
  return out
}

/**
 * Karplus-Strong plucked string: delay line of SR/f samples (tuned with a 1st-order all-pass for the fraction), a 2-tap
 * averaging loop filter, loss per pass, excited by one period of seeded noise low-passed at `bright` Hz.
 * Returns mono of n samples. opts: { loss = 0.996, bright = 3000, rng (required for the excitation) }
 */
export function karplus(n, f, { loss = 0.996, bright = 3000, rng, pick = 0 } = {}) {
  if (!rng) throw new Error('karplus: pass a seeded rng')
  const out = mono(n)
  // total loop delay = N + 0.5 (averager) + allpass fraction
  const P = SR / f, N = Math.max(2, Math.floor(P - 0.5 - 0.01)), frac = P - 0.5 - N
  const C = (1 - frac) / (1 + frac)
  const buf = new Float64Array(N)
  const ex = noise(N, rng)
  onePoleLP(ex, bright); onePoleLP(ex, bright)
  let mean = 0
  for (let i = 0; i < N; i++) mean += ex[i]
  mean /= N
  let pk = 0
  for (let i = 0; i < N; i++) { buf[i] = ex[i] - mean; pk = Math.max(pk, Math.abs(buf[i])) }
  for (let i = 0; i < N; i++) buf[i] /= pk || 1
  // optional pick-position comb (pick in 0..0.5): removes harmonics like plucking off-centre
  if (pick > 0) { const d = Math.round(pick * N), tmp = Float64Array.from(buf); for (let i = 0; i < N; i++) buf[i] = tmp[i] - tmp[(i - d + N) % N] }
  let idx = 0, prev = 0, apx = 0, apy = 0
  for (let i = 0; i < n; i++) {
    const cur = buf[idx]
    const avg = 0.5 * (cur + prev)
    prev = cur
    // all-pass fractional delay
    const y = C * avg + apx - C * apy
    apx = avg; apy = flush(y)
    buf[idx] = y * loss
    out[i] = cur
    idx++; if (idx >= N) idx = 0
  }
  return out
}

// ---------------------------------------------------------------- shaping
/** tanh saturation normalised so ±1 maps to ±1: tanh(k x) / tanh(k), in place (mono) */
export function saturate(x, k = 2) {
  const nrm = 1 / Math.tanh(k)
  for (let i = 0; i < x.length; i++) x[i] = Math.tanh(k * x[i]) * nrm
  return x
}
/** soft clip any buffer (mono or stereo) */
export function saturateAny(b, k = 2) { if (isStereo(b)) { saturate(b.L, k); saturate(b.R, k) } else saturate(b, k); return b }

// ---------------------------------------------------------------- 2x oversampling (for unfiltered bright oscillators)
const HB = (() => {
  // 105-tap Kaiser-windowed low-pass at 2·SR (β 7.2, about 72 dB stopband): passband to 20 kHz, stopband from 24 kHz,
  // so harmonics between 24 and 48 kHz do not fold back into the audio band when decimating
  const N = 105, M = (N - 1) / 2, beta = 7.2, fc = 22000 / (2 * SR), h = new Float64Array(N)
  const I0 = x => { let s = 1, t = 1; for (let k = 1; k < 40; k++) { t *= (x / 2 / k) ** 2; s += t } return s }
  let sum = 0
  for (let i = 0; i < N; i++) {
    const m = i - M, sinc = m === 0 ? 2 * fc : Math.sin(TAU * fc * m) / (Math.PI * m)
    h[i] = sinc * I0(beta * Math.sqrt(1 - (m / M) ** 2)) / I0(beta); sum += h[i]
  }
  for (let i = 0; i < N; i++) h[i] /= sum
  return h
})()
/**
 * Render at 2·SR and decimate with a half-band FIR. gen(n2, sr2) must return a Float32Array of n2 samples at rate sr2;
 * oscillators inside must run at that rate: new Osc(shape, { sr: sr2 }). Returns n samples at SR.
 */
export function oversample2(n, gen) {
  const x = gen(n * 2 + HB.length, SR * 2)
  const out = mono(n), M = (HB.length - 1) / 2
  for (let i = 0; i < n; i++) {
    let s = 0
    const c = 2 * i + M
    for (let k = 0; k < HB.length; k++) { const j = c - M + k; if (j >= 0 && j < x.length) s += HB[k] * x[j] }
    out[i] = s
  }
  return out
}
