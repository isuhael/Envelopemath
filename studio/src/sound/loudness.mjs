// Meters: ITU-R BS.1770-4 loudness (integrated, momentary, short-term), EBU Tech 3342 loudness range, and a 4x
// oversampled true-peak meter (bible §8.6). All in JS so the master does not depend on the ffmpeg build; ffmpeg's
// ebur128 is used by the audit only as an independent cross-check.
import { SR } from './dsp.mjs'

// K-weighting at 48 kHz (bible §8.6, the BS.1770-4 coefficients)
const K1 = { b: [1.53512485958697, -2.69169618940638, 1.19839281085285], a: [1, -1.69065929318241, 0.73248077421585] }
const K2 = { b: [1.0, -2.0, 1.0], a: [1, -1.99004745483398, 0.99007225036621] }
function kfilter(x) {
  const y = new Float64Array(x.length)
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0
  for (let i = 0; i < x.length; i++) {
    const v = x[i], o = K1.b[0] * v + K1.b[1] * x1 + K1.b[2] * x2 - K1.a[1] * y1 - K1.a[2] * y2
    x2 = x1; x1 = v; y2 = y1; y1 = o; y[i] = o
  }
  x1 = x2 = y1 = y2 = 0
  for (let i = 0; i < y.length; i++) {
    const v = y[i], o = K2.b[0] * v + K2.b[1] * x1 + K2.b[2] * x2 - K2.a[1] * y1 - K2.a[2] * y2
    x2 = x1; x1 = v; y2 = y1; y1 = o; y[i] = o
  }
  return y
}
const LU = ms => (ms > 0 ? -0.691 + 10 * Math.log10(ms) : -Infinity)

/**
 * K-weighted per-hop energy: the mean square summed over channels, for every 100 ms hop (4800 samples).
 * Window loudness for any window of whole hops is then LU(mean of its hops). Returns { hops: Float64Array, hop }.
 */
function hopEnergies(chans, hop = 4800) {
  const n = chans[0].length, H = Math.floor(n / hop)
  const e = new Float64Array(H)
  for (const x of chans) {
    const y = kfilter(x)
    for (let h = 0; h < H; h++) { let s = 0; for (let i = h * hop; i < (h + 1) * hop; i++) s += y[i] * y[i]; e[h] += s / hop }
  }
  return { hops: e, hop }
}
/** sliding window loudness over `w` hops, one value per hop (window ending at that hop); first w-1 values are null */
function windows(hops, w) {
  const out = new Array(hops.length).fill(null)
  let s = 0
  for (let h = 0; h < hops.length; h++) {
    s += hops[h]
    if (h >= w) s -= hops[h - w]
    if (h >= w - 1) out[h] = LU(Math.max(0, s / w))
  }
  return out
}

/**
 * Full loudness measurement of a stereo (or mono) signal.
 * Returns { integrated, momentary: [..] (400 ms, 100 ms hop), shortTerm: [..] (3 s, 100 ms hop), momentaryMax,
 *           shortTermMax, lra, lraLow, lraHigh }. LUFS / LU. Gating per BS.1770-4 (-70 abs, -10 rel) and Tech 3342
 * (LRA: short-term values, -70 abs, -20 rel, 10th-95th percentile).
 */
export function loudness(b) {
  const chans = b.L ? [b.L, b.R] : [b]
  const { hops } = hopEnergies(chans)
  const mom = windows(hops, 4), st = windows(hops, 30)
  // integrated: 400 ms blocks with 75% overlap = every hop's 4-hop window
  const blocks = []
  for (let h = 3; h < hops.length; h++) blocks.push((hops[h] + hops[h - 1] + hops[h - 2] + hops[h - 3]) / 4)
  const gated = (arr, absL, rel) => {
    const a = arr.filter(z => LU(z) > absL)
    if (!a.length) return { mean: 0, list: [] }
    const m = a.reduce((x, y) => x + y, 0) / a.length
    const thr = LU(m) + rel
    const r = a.filter(z => LU(z) > thr)
    return { mean: r.length ? r.reduce((x, y) => x + y, 0) / r.length : 0, list: r }
  }
  const I = LU(gated(blocks, -70, -10).mean)
  // LRA (Tech 3342): short-term energies, absolute gate -70, relative -20 re their integrated
  const stE = []
  for (let h = 29; h < hops.length; h++) { let s = 0; for (let k = 0; k < 30; k++) s += hops[h - k]; stE.push(s / 30) }
  const g = gated(stE, -70, -20).list.map(LU).sort((x, y) => x - y)
  const pct = p => (g.length ? g[Math.min(g.length - 1, Math.max(0, Math.round((p / 100) * (g.length - 1))))] : -Infinity)
  const lraLow = pct(10), lraHigh = pct(95)
  const finite = a => a.filter(v => v != null && Number.isFinite(v))
  return {
    integrated: I,
    momentary: mom, shortTerm: st,
    momentaryMax: Math.max(-Infinity, ...finite(mom)),
    shortTermMax: Math.max(-Infinity, ...finite(st)),
    lra: g.length ? lraHigh - lraLow : 0, lraLow, lraHigh,
  }
}
/** integrated loudness only (LUFS) */
export const integrated = b => loudness(b).integrated

// ---------------------------------------------------------------- true peak (4x oversampling)
/**
 * 4x polyphase interpolator: for the 3 in-between phases p/4 (p = 1..3), 48 taps each over input samples i-23 .. i+24:
 * a Kaiser-windowed sinc (β 8, half-width 24 samples) evaluated at τ = 23 + p/4 - k, normalised to unity DC gain.
 * Phase 0 is the sample itself.
 */
export const TP_TAPS = 48
const TP = (() => {
  const I0 = x => { let s = 1, t = 1; for (let k = 1; k < 40; k++) { t *= (x / 2 / k) ** 2; s += t } return s }
  const beta = 8, W = 24.5
  const phases = [null]
  for (let p = 1; p < 4; p++) {
    const ph = new Float64Array(TP_TAPS)
    let s = 0
    for (let k = 0; k < TP_TAPS; k++) {
      const tau = 23 + p / 4 - k
      const sinc = Math.sin(Math.PI * tau) / (Math.PI * tau)
      ph[k] = sinc * I0(beta * Math.sqrt(Math.max(0, 1 - (tau / W) ** 2))) / I0(beta)
      s += ph[k]
    }
    for (let k = 0; k < TP_TAPS; k++) ph[k] /= s
    phases.push(ph)
  }
  return phases
})()
/**
 * Per-sample true-peak envelope of one channel: tp[i] = max |x| over sample i and the 3 interpolated points between
 * samples i and i+1. Returns Float32Array.
 */
export function truePeakEnvelope(x) {
  const n = x.length, out = new Float32Array(n), K = TP_TAPS
  const p1 = TP[1], p2 = TP[2], p3 = TP[3]
  for (let i = 0; i < n; i++) {
    let m = Math.abs(x[i])
    const base = i - 23
    let s1 = 0, s2 = 0, s3 = 0
    if (base >= 0 && base + K <= n) {
      for (let k = 0; k < K; k++) { const v = x[base + k]; s1 += p1[k] * v; s2 += p2[k] * v; s3 += p3[k] * v }
    } else {
      for (let k = 0; k < K; k++) { const j = base + k; if (j < 0 || j >= n) continue; const v = x[j]; s1 += p1[k] * v; s2 += p2[k] * v; s3 += p3[k] * v }
    }
    const a1 = Math.abs(s1), a2 = Math.abs(s2), a3 = Math.abs(s3)
    if (a1 > m) m = a1
    if (a2 > m) m = a2
    if (a3 > m) m = a3
    out[i] = m
  }
  return out
}
/** true peak (linear) of a mono or stereo buffer */
export function truePeak(b) {
  const chans = b.L ? [b.L, b.R] : [b]
  let m = 0
  for (const x of chans) { const e = truePeakEnvelope(x); for (let i = 0; i < e.length; i++) if (e[i] > m) m = e[i] }
  return m
}
export const truePeakDb = b => { const p = truePeak(b); return p > 0 ? 20 * Math.log10(p) : -Infinity }
export { SR }
