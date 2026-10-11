// Effects and dynamics (bible §8): FDN reverbs (PLATE, HALL, ROOM), tempo-synced ping-pong delay, compressor,
// the event-driven duck generator, the kick sidechain, M/S low-mono, and the 4x oversampled true-peak limiter.
import { SR, TAU, sec, stereo, mono, clamp, dbToGain, biquadCoefs, biquad, onePoleLP, onePoleHP, isStereo } from './dsp.mjs'
import { truePeakEnvelope } from './loudness.mjs'

// ---------------------------------------------------------------- FDN reverb (bible §8.5)
export const REVERBS = {
  PLATE: { delays: [709, 863, 1013, 1151, 1279, 1433, 1601, 1777], rt60: 1.2, rt60hi: 0.7, hiHz: 5000, pre: 0.012, g: 0.65, diff: [113, 337, 509, 761], sendHP: 200, returnLP: 10000 },
  HALL: { delays: [1433, 1601, 1867, 2053, 2251, 2399, 2617, 2797], rt60: 2.6, rt60hi: 1.4, hiHz: 4000, pre: 0.028, g: 0.70, diff: [223, 397, 641, 883], sendHP: 250, returnLP: 8000 },
  ROOM: { delays: [337, 419, 509, 593, 677, 787, 863, 947], rt60: 0.45, rt60hi: 0.30, hiHz: 4000, pre: 0.004, g: 0.60, diff: [89, 157, 229, 311], sendHP: 150, returnLP: 7000 },
}
/** Schroeder all-pass diffuser (in place) */
function allpass(x, D, g) {
  const buf = new Float64Array(D)
  let k = 0
  for (let i = 0; i < x.length; i++) {
    const d = buf[k], v = x[i] + g * d
    const y = d - g * v
    buf[k] = v; k = (k + 1) % D
    x[i] = y
  }
  return x
}
/**
 * 8-line feedback delay network with a Householder matrix (A = I - (2/N)·11ᵀ), a damping shelf in each line (a 1-pole
 * low-pass crossover at hiHz: gain g_lo below, g_hi above, from the low and high RT60), 4 input diffusers per channel and
 * a pre-delay. Input: stereo send; L feeds the even lines, R the odd lines (each through its diffusers). Output:
 * L = lines 0, 2, 4, 6 with signs + - + -, R = lines 1, 3, 5, 7 with + - + -. Send HP and return LP per the table.
 * The output is normalised so the impulse response carries unit energy per channel (a sustained send at -12 dB returns
 * at about -12 dB). Returns a new stereo buffer of the input's length plus `tail` seconds.
 */
export function fdnReverb(send, name, { tail = null } = {}) {
  const P = REVERBS[name]
  if (!P) throw new Error(`fdnReverb: unknown reverb ${name}`)
  const n0 = send.L.length, extra = sec(tail == null ? P.rt60 * 1.1 : tail)   // tail 0: same length as the send
  const n = n0 + extra
  const pre = sec(P.pre)
  const inL = new Float64Array(n), inR = new Float64Array(n)
  for (let i = 0; i < n0; i++) { if (i + pre < n) { inL[i + pre] = send.L[i]; inR[i + pre] = send.R[i] } }
  // send high-pass (2nd order)
  const hp = biquadCoefs('hp', P.sendHP, { q: 0.7071 })
  biquad(inL, hp); biquad(inR, hp)
  for (const d of P.diff) { allpass(inL, d, P.g); allpass(inR, d, P.g) }
  const N = 8
  const gLo = P.delays.map(d => Math.pow(10, (-3 * d) / (SR * P.rt60)))
  const gHi = P.delays.map(d => Math.pow(10, (-3 * d) / (SR * P.rt60hi)))
  const lpG = (() => { const g = Math.tan(Math.PI * P.hiHz / SR); return g / (1 + g) })()
  const out = stereo(n)
  const norm = REVERB_NORM[name] ?? (REVERB_NORM[name] = measureNorm(name))
  // one flat ring buffer per line (unrolled over the 8 lines for speed)
  const [d0, d1, d2, d3, d4, d5, d6, d7] = P.delays
  const b0 = new Float64Array(d0), b1 = new Float64Array(d1), b2 = new Float64Array(d2), b3 = new Float64Array(d3)
  const b4 = new Float64Array(d4), b5 = new Float64Array(d5), b6 = new Float64Array(d6), b7 = new Float64Array(d7)
  let i0 = 0, i1 = 0, i2 = 0, i3 = 0, i4 = 0, i5 = 0, i6 = 0, i7 = 0
  let s0 = 0, s1 = 0, s2 = 0, s3 = 0, s4 = 0, s5 = 0, s6 = 0, s7 = 0
  const [h0, h1, h2, h3, h4, h5, h6, h7] = gHi, k0 = gLo[0] - h0, k1 = gLo[1] - h1, k2 = gLo[2] - h2, k3 = gLo[3] - h3, k4 = gLo[4] - h4, k5 = gLo[5] - h5, k6 = gLo[6] - h6, k7 = gLo[7] - h7
  const G = lpG, F = 2 / N
  for (let i = 0; i < n; i++) {
    // read, damp (shelf: g_hi·y + (g_lo - g_hi)·LP(y))
    let y, v, l
    y = b0[i0]; v = (y - s0) * G; l = v + s0; s0 = l + v; const o0 = h0 * y + k0 * l
    y = b1[i1]; v = (y - s1) * G; l = v + s1; s1 = l + v; const o1 = h1 * y + k1 * l
    y = b2[i2]; v = (y - s2) * G; l = v + s2; s2 = l + v; const o2 = h2 * y + k2 * l
    y = b3[i3]; v = (y - s3) * G; l = v + s3; s3 = l + v; const o3 = h3 * y + k3 * l
    y = b4[i4]; v = (y - s4) * G; l = v + s4; s4 = l + v; const o4 = h4 * y + k4 * l
    y = b5[i5]; v = (y - s5) * G; l = v + s5; s5 = l + v; const o5 = h5 * y + k5 * l
    y = b6[i6]; v = (y - s6) * G; l = v + s6; s6 = l + v; const o6 = h6 * y + k6 * l
    y = b7[i7]; v = (y - s7) * G; l = v + s7; s7 = l + v; const o7 = h7 * y + k7 * l
    // Householder feedback: x - (2/N)·Σx; inputs: L to the even lines, R to the odd lines (signs + + - - per pair)
    const h = F * (o0 + o1 + o2 + o3 + o4 + o5 + o6 + o7)
    const xl = inL[i] * 0.5, xr = inR[i] * 0.5
    b0[i0] = o0 - h + xl; b1[i1] = o1 - h + xr; b2[i2] = o2 - h - xl; b3[i3] = o3 - h - xr
    b4[i4] = o4 - h + xl; b5[i5] = o5 - h + xr; b6[i6] = o6 - h - xl; b7[i7] = o7 - h - xr
    if (++i0 === d0) i0 = 0; if (++i1 === d1) i1 = 0; if (++i2 === d2) i2 = 0; if (++i3 === d3) i3 = 0
    if (++i4 === d4) i4 = 0; if (++i5 === d5) i5 = 0; if (++i6 === d6) i6 = 0; if (++i7 === d7) i7 = 0
    out.L[i] = (o0 - o2 + o4 - o6) * norm
    out.R[i] = (o1 - o3 + o5 - o7) * norm
  }
  const lp = biquadCoefs('lp', P.returnLP, { q: 0.7071 })
  biquad(out.L, lp); biquad(out.R, lp)
  return out
}
const REVERB_NORM = {}
function measureNorm(name) {
  REVERB_NORM[name] = 1
  const P = REVERBS[name], n = sec(0.05)
  const imp = stereo(n)
  imp.L[sec(0.001)] = 1; imp.R[sec(0.001)] = 1
  const ir = fdnReverb(imp, name, { tail: P.rt60 * 1.6 })
  let e = 0
  for (let i = 0; i < ir.L.length; i++) e += ir.L[i] * ir.L[i]
  // a unit impulse in both channels carries energy 1 per channel; scale the response to the same
  return 1 / Math.sqrt(e || 1)
}

// ---------------------------------------------------------------- tempo-synced ping-pong delay (bible §8.5)
/**
 * Ping-pong delay. delayAt(i) -> delay in seconds at output sample i (e.g. 0.75 beat from the tempo map); changes are
 * smoothed over 50 ms. The mono sum of the send enters the left line; each repeat crosses sides. feedback, and an LP/HP
 * inside the loop. Returns the wet stereo signal of length n + tail.
 */
export function pingPong(send, delayAt, { feedback = 0.3, lp = 3500, hp = 300, tail = 2.5 } = {}) {
  const n0 = send.L.length, n = n0 + sec(tail)
  const maxD = sec(2.0) + 4
  const bl = new Float64Array(maxD), br = new Float64Array(maxD)
  let w = 0
  const out = stereo(n)
  const gl = (() => { const g = Math.tan(Math.PI * lp / SR); return g / (1 + g) })()
  const gh = (() => { const g = Math.tan(Math.PI * hp / SR); return g / (1 + g) })()
  let sLl = 0, sLr = 0, sHl = 0, sHr = 0
  let d = delayAt(0) * SR
  const smooth = 1 - Math.exp(-1 / (0.05 * SR / 4))
  const read = (b, pos) => {
    const p = ((pos % maxD) + maxD) % maxD, i0 = Math.floor(p), f = p - i0
    return b[i0] * (1 - f) + b[(i0 + 1) % maxD] * f
  }
  for (let i = 0; i < n; i++) {
    const target = clamp(delayAt(Math.min(i, n0 - 1)) * SR, 1, maxD - 2)
    d += (target - d) * smooth
    const yl = read(bl, w - d), yr = read(br, w - d)
    const x = i < n0 ? 0.5 * (send.L[i] + send.R[i]) : 0
    // loop filters (1-pole LP then 1-pole HP) on each crossing: right -> left, left -> right
    const vl = (yr - sLl) * gl, ll = vl + sLl; sLl = ll + vl
    const vr = (yl - sLr) * gl, lr = vr + sLr; sLr = lr + vr
    const hl = (ll - sHl) * gh, hll = hl + sHl; sHl = hll + hl
    const hr = (lr - sHr) * gh, hrr = hr + sHr; sHr = hrr + hr
    bl[w] = x + feedback * (ll - hll)   // the input enters left; the right's repeat comes back left
    br[w] = feedback * (lr - hrr)       // the left's repeat goes right
    out.L[i] = yl; out.R[i] = yr
    w = (w + 1) % maxD
  }
  return out
}

// ---------------------------------------------------------------- dynamics
/**
 * Feed-forward stereo-linked compressor (peak detector with attack/release smoothing in dB, soft knee).
 * Returns { gr: Float32Array (gain reduction in dB, >= 0, per sample) } and modifies the buffer in place.
 * opts: { threshold (dBFS), ratio, attack (s), release (s), knee (dB), makeup (dB) }
 */
export function compress(b, { threshold = -12, ratio = 2, attack = 0.01, release = 0.12, knee = 6, makeup = 0 } = {}) {
  const chans = isStereo(b) ? [b.L, b.R] : [b]
  const n = chans[0].length, gr = new Float32Array(n)
  const aA = Math.exp(-1 / (attack * SR)), aR = Math.exp(-1 / (release * SR))
  let env = 0
  const mk = dbToGain(makeup)
  for (let i = 0; i < n; i++) {
    let pk = 0
    for (const x of chans) { const a = Math.abs(x[i]); if (a > pk) pk = a }
    const lvl = pk > 1e-9 ? 20 * Math.log10(pk) : -180
    const over = lvl - threshold
    let target
    if (over <= -knee / 2) target = 0
    else if (over >= knee / 2) target = over * (1 - 1 / ratio)
    else target = (1 - 1 / ratio) * (over + knee / 2) ** 2 / (2 * knee)
    env = target > env ? aA * env + (1 - aA) * target : aR * env + (1 - aR) * target
    gr[i] = env
    const g = Math.pow(10, -env / 20) * mk
    for (const x of chans) x[i] *= g
  }
  return { gr }
}
/** detector level (dBFS, the compressor's peak detector without smoothing) percentile over [i0, i1) */
export function levelPercentile(b, i0, i1, p = 0.75) {
  const chans = isStereo(b) ? [b.L, b.R] : [b]
  const step = 48, vals = []
  for (let i = Math.max(0, i0); i < Math.min(chans[0].length, i1); i += step) {
    let pk = 0
    for (let j = i; j < Math.min(i + step, i1); j++) for (const x of chans) { const a = Math.abs(x[j]); if (a > pk) pk = a }
    if (pk > 1e-6) vals.push(20 * Math.log10(pk))
  }
  if (!vals.length) return -120
  vals.sort((a, b) => a - b)
  return vals[Math.min(vals.length - 1, Math.floor(p * vals.length))]
}

/**
 * Event-driven duck curve (bible §8.3). events: [{ t, depth (dB, positive), hold (s), release (τ, s), attack?, until? }].
 * Each event: 0 dB until t - lookahead, linear in dB to -depth at t (or over `attack` for sustained events), hold to
 * max(t + hold, until), then -depth·e^(-(τ - end)/release). Combined = the minimum (deepest wins, no stacking).
 * Returns Float32Array of the duck in dB (<= 0) for n samples.
 */
export function duckCurve(n, events, { lookahead = 0.005 } = {}) {
  const db = new Float32Array(n)
  for (const e of events) {
    if (!(e.depth > 0)) continue
    const D = e.depth
    const att = e.attack != null ? e.attack : lookahead
    const t0 = e.attack != null ? e.t : e.t - lookahead
    const tPeak = e.attack != null ? e.t + att : e.t
    const tHold = Math.max(e.t + (e.hold || 0), e.until != null ? e.until : -Infinity)
    const tau = Math.max(1e-3, e.release || 0.1)
    const iEnd = Math.min(n, Math.round((tHold + tau * 7) * SR))
    for (let i = Math.max(0, Math.round(t0 * SR)); i < iEnd; i++) {
      const t = i / SR
      let v
      if (t < tPeak) v = -D * clamp((t - t0) / Math.max(1e-6, tPeak - t0), 0, 1)
      else if (t <= tHold) v = -D
      else v = -D * Math.exp(-(t - tHold) / tau)
      if (v < db[i]) db[i] = v
    }
  }
  return db
}
/** dB curve -> linear gain (optionally scaled in dB by k, e.g. 0.5 for the reverb returns) */
export function dbCurveToGain(db, k = 1) {
  const g = new Float32Array(db.length)
  for (let i = 0; i < db.length; i++) g[i] = Math.pow(10, (db[i] * k) / 20)
  return g
}
/**
 * Kick sidechain gain curve (bible §8.2): for each trigger time, duck `depth` dB with attack, hold, then exponential
 * release (τ). Deepest wins. Returns dB curve (<= 0).
 */
export function sidechainCurve(n, times, { depth = 3, attack = 0.002, hold = 0.02, release = 0.12 } = {}) {
  return duckCurve(n, times.map(t => ({ t, depth, hold, release, attack })))
}
/** multiply a buffer (mono/stereo) by a gain curve (linear) in place */
export function applyGain(b, g) {
  const chans = isStereo(b) ? [b.L, b.R] : [b]
  for (const x of chans) { const n = Math.min(x.length, g.length); for (let i = 0; i < n; i++) x[i] *= g[i] }
  return b
}

/** M/S low-mono (bible §8.5): high-pass the Side channel at `hz` (2nd-order Butterworth), in place */
export function lowMono(b, hz = 120) {
  const n = b.L.length, S = new Float64Array(n)
  for (let i = 0; i < n; i++) S[i] = 0.5 * (b.L[i] - b.R[i])
  biquad(S, biquadCoefs('hp', hz, { q: 0.7071 }))
  for (let i = 0; i < n; i++) { const M = 0.5 * (b.L[i] + b.R[i]); b.L[i] = M + S[i]; b.R[i] = M - S[i] }
  return b
}

/**
 * True-peak limiter (bible §8.6): ceiling in dBTP, lookahead 5 ms, attack 5 ms, release 80 ms, peaks detected 4x
 * oversampled. Gain: required g[n] = min(1, ceiling / tp[n]); a sliding minimum over the lookahead window, a moving
 * average over the same window (the attack ramp, never above the requirement), then exponential release. The output is
 * the input delayed by the lookahead... compensated: the returned buffer is aligned with the input (no latency).
 * Returns { out (new stereo buffer), gr: Float32Array (dB, >= 0), stats: { maxGr, pctOver1dB, pctOver0 } }.
 */
export function limitTruePeak(b, { ceiling = -1.5, lookahead = 0.005, release = 0.08, ceilingCurve = null } = {}) {
  // ceilingCurve: optional Float32Array of extra dB (<= 0) per sample, added to the ceiling (local ceilings)
  const n = b.L.length, c = dbToGain(ceiling)
  const eL = truePeakEnvelope(b.L), eR = truePeakEnvelope(b.R)
  const La = Math.max(1, sec(lookahead))
  const req = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    const ci = ceilingCurve && ceilingCurve[i] < 0 ? c * Math.pow(10, ceilingCurve[i] / 20) : c
    const p = Math.max(eL[i], eR[i]); req[i] = p > ci ? ci / p : 1
  }
  // the gain at sample i must be <= req[j] for j in [i, i + La] (look ahead): sliding min over the future window
  const fmin = new Float64Array(n)
  {
    const dq = new Int32Array(n + La + 1); let h = 0, t = 0
    // process from the end: window [i, i + La]
    for (let i = n - 1; i >= 0; i--) {
      while (t > h && req[dq[t - 1]] >= req[i]) t--
      dq[t++] = i
      while (dq[h] > i + La) h++
      fmin[i] = req[dq[h]]
    }
  }
  // attack ramp: moving average of fmin over the past La+1 samples is <= fmin of every sample in the window, and since
  // fmin[k] covers [k, k + La], the average at i is <= req[i] (each averaged fmin[k], k in [i - La, i], covers i)
  const avg = new Float64Array(n)
  { let s = 0; for (let i = 0; i < n; i++) { s += fmin[i]; if (i > La) s -= fmin[i - La - 1]; avg[i] = s / Math.min(i + 1, La + 1) } }
  // for i < La the average spans fewer samples; take the min with fmin there to stay safe
  for (let i = 0; i < Math.min(n, La); i++) avg[i] = Math.min(avg[i], fmin[i])
  const aR = 1 - Math.exp(-1 / (release * SR))
  const out = stereo(n), gr = new Float32Array(n)
  let g = 1, over1 = 0, over0 = 0, maxGr = 0
  for (let i = 0; i < n; i++) {
    const tgt = avg[i]
    g = tgt < g ? tgt : g + (tgt - g) * aR
    if (g > tgt) g = tgt
    out.L[i] = b.L[i] * g; out.R[i] = b.R[i] * g
    const d = -20 * Math.log10(g)
    gr[i] = d
    if (d > 1) over1++
    if (d > 0.01) over0++
    if (d > maxGr) maxGr = d
  }
  return { out, gr, stats: { maxGr, pctOver1dB: (100 * over1) / n, pctOver0: (100 * over0) / n } }
}
export { onePoleLP, onePoleHP, mono, TAU }
