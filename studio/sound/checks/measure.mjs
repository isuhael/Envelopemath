// Shared measurement helpers for the acceptance checks (no thresholds here: they live in sound/acceptance.json).
// The engine's own meters are reused as they are: BS.1770 loudness and the 4x true-peak meter (src/sound/loudness.mjs),
// octave bands, silence and correlation (src/sound/audit.mjs).
import { SR, biquadCoefs, biquad, filter } from '../../src/sound/dsp.mjs'
import { loudness } from '../../src/sound/loudness.mjs'

export { SR }
export const mean = a => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length)
export const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))) }
export const median = a => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null }
export const fix = (x, k = 2) => (x == null ? '-' : Number.isFinite(x) ? x.toFixed(k) : String(x))
export const inRange = (x, [lo, hi], eps = 0) => Number.isFinite(x) && x >= lo - eps && x <= hi + eps

/** mean power of a stereo buffer over [t0, t1) (the two channels averaged), in dB */
export function powDb(b, t0, t1) {
  const i0 = Math.max(0, Math.round(t0 * SR)), i1 = Math.min(b.L.length, Math.round(t1 * SR))
  let s = 0
  for (let i = i0; i < i1; i++) s += (b.L[i] * b.L[i] + b.R[i] * b.R[i]) / 2
  return 10 * Math.log10(s / Math.max(1, i1 - i0) + 1e-20)
}
/** RMS (linear) of one channel over [t0, t1) */
export function rmsCh(x, t0, t1) {
  const i0 = Math.max(0, Math.round(t0 * SR)), i1 = Math.min(x.length, Math.round(t1 * SR))
  let s = 0
  for (let i = i0; i < i1; i++) s += x[i] * x[i]
  return i1 > i0 ? Math.sqrt(s / (i1 - i0)) : 0
}
export const db = x => (x > 0 ? 20 * Math.log10(x) : -200)

/** the 100 ms-hop series value (momentary or short-term) of the window ending at t; null outside [minHop, length) */
export function seriesAt(series, t, minHop = 0) {
  const h = Math.round(t / 0.1) - 1
  return h >= minHop && h < series.length && series[h] != null && Number.isFinite(series[h]) ? series[h] : null
}
export const momentaryAt = (L, t) => seriesAt(L.momentary, t, 3)
export const shortTermAt = (L, t) => seriesAt(L.shortTerm, t, 29)

/** ungated loudness: the mean K-weighted power over the file (every 4th momentary block = 400 ms tiles), LUFS */
export function ungated(b) {
  const m = loudness(b).momentary
  let p = 0, n = 0
  for (let h = 3; h < m.length; h += 4) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) }
  return n && p > 0 ? -0.691 + 10 * Math.log10(p / n) : -Infinity
}
/** a copy band-passed with 2x HP + 2x LP (12 dB/oct Butterworths, 24 dB/oct each side) */
export function bandpass(b, lo, hi) {
  const x = { L: Float32Array.from(b.L), R: Float32Array.from(b.R) }
  for (const [t, f] of [['hp', lo], ['hp', lo], ['lp', hi], ['lp', hi]]) filter(x, t, f, { q: 0.7071 })
  return x
}
/** a copy high-passed by `passes` 2nd-order Butterworths at hz (the phone proxy: 2 passes at 250 Hz) */
export function highpass(b, hz, passes = 2) {
  const x = { L: Float32Array.from(b.L), R: Float32Array.from(b.R) }
  for (const ch of [x.L, x.R]) { const c = biquadCoefs('hp', hz, { q: 0.7071 }); for (let k = 0; k < passes; k++) biquad(ch, c) }
  return x
}
export const monoFold = b => { const m = new Float32Array(b.L.length); for (let i = 0; i < m.length; i++) m[i] = 0.5 * (b.L[i] + b.R[i]); return { L: m, R: m } }

/** radix-2 in-place FFT */
export function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t } }
  for (let len = 2; len <= n; len <<= 1) {
    const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a)
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0
      for (let k = 0; k < len / 2; k++) {
        const p = i + k, q = p + len / 2, tr = re[q] * cr - im[q] * ci, ti = re[q] * ci + im[q] * cr
        re[q] = re[p] - tr; im[q] = im[p] - ti; re[p] += tr; im[p] += ti
        const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr
      }
    }
  }
}

// ---------------------------------------------------------------- onsets (B5)
/** spectral-flux onset near t: the centre time of the strongest positive log-magnitude flux frame (1024, hop 64) within ±win */
export function fluxOnset(b, t, win = 0.06) {
  const N = 1024, hop = 64
  const i0 = Math.max(0, Math.round((t - win) * SR) - N), i1 = Math.min(b.L.length - N, Math.round((t + win) * SR))
  const w = new Float64Array(N)
  for (let i = 0; i < N; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N)
  let prev = null, best = null
  for (let s = i0; s <= i1; s += hop) {
    const re = new Float64Array(N), im = new Float64Array(N)
    for (let i = 0; i < N; i++) re[i] = 0.5 * (b.L[s + i] + b.R[s + i]) * w[i]
    fft(re, im)
    const mag = new Float64Array(N / 2)
    for (let k = 0; k < N / 2; k++) mag[k] = Math.log1p(1000 * Math.hypot(re[k], im[k]))
    if (prev) {
      let f = 0
      for (let k = 0; k < N / 2; k++) f += Math.max(0, mag[k] - prev[k])
      const tc = (s + N / 2) / SR
      if (Math.abs(tc - t) <= win && (!best || f > best.f)) best = { f, t: tc }
    }
    prev = mag
  }
  return best
}
/** energy-rise onset near t: the steepest rise between consecutive 2 ms frames of the mono sum, HP 100 Hz, within ±win */
export function riseOnset(b, t, win = 0.06) {
  const x = new Float64Array(Math.round(0.2 * SR)), i0 = Math.round((t - 0.1) * SR)
  for (let i = 0; i < x.length; i++) { const j = i0 + i; x[i] = j >= 0 && j < b.L.length ? 0.5 * (b.L[j] + b.R[j]) : 0 }
  biquad(x, biquadCoefs('hp', 100, { q: 0.7071 }))
  const F = 96, E = []
  for (let f = 0; f * F + F <= x.length; f++) { let s = 0; for (let i = f * F; i < (f + 1) * F; i++) s += x[i] * x[i]; E.push(10 * Math.log10(s / F + 1e-14)) }
  let best = null
  for (let f = 1; f < E.length; f++) { const ft = (t - 0.1) + f * F / SR; if (Math.abs(ft - t) > win) continue; const d = E[f] - E[f - 1]; if (!best || d > best.d) best = { d, t: ft } }
  return best
}

// ---------------------------------------------------------------- the score's grid (S8)
export const barAt = (sc, t) => { let b = sc.bars[0]; for (const x of sc.bars) if (x.t <= t + 1e-6) b = x; return b }
/** signed offset (s) of t from the nearest straight 16th / 32nd / 16th-triplet grid point */
export function straightGridErr(sc, t) {
  const bar = barAt(sc, t), beat = 60 / bar.bpm, x = (t - bar.t) / beat
  let best = null
  for (const d of [4, 8, 6]) { const e = (x - Math.round(x * d) / d) * beat; if (best == null || Math.abs(e) < Math.abs(best)) best = e }
  return best
}
/** signed offset (s) of t from the nearest swung 16th (odd 16ths late by (2·swing - 1) of a 16th: 0.58 -> 0.16) */
export function swingGridErr(sc, t, swing = 0.58) {
  const b = [...sc.bars].reverse().find(x => x.t <= t + 0.01)
  if (!b) return 0
  const s16 = 60 / b.bpm / 4, q = (t - b.t) / s16, late = (2 * swing - 1) * s16
  let best = null
  for (let k = Math.floor(q) - 1; k <= Math.ceil(q) + 1; k++) { if (k < 0) continue; const g = b.t + k * s16 + (k % 2 ? late : 0); if (best == null || Math.abs(t - g) < Math.abs(t - best)) best = g }
  return best == null ? 0 : t - best
}

// ---------------------------------------------------------------- automation (re-renders)
/** piecewise-linear dB points -> linear gain per sample (held before the first and after the last), as the engine */
export function evalDb(points, n) {
  const pts = points.slice().sort((a, b) => a.t - b.t)
  const g = new Float32Array(n)
  let k = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    while (k + 1 < pts.length && pts[k + 1].t <= t) k++
    let d
    if (t <= pts[0].t) d = pts[0].db
    else if (k + 1 >= pts.length) d = pts[pts.length - 1].db
    else { const a = pts[k], b = pts[k + 1]; d = a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t) }
    g[i] = Math.pow(10, d / 20)
  }
  return g
}

// ---------------------------------------------------------------- unit-check helpers (U1, U2, U4)
export const monoOf = b => (b.L ? Float32Array.from(b.L, (v, i) => 0.5 * (v + b.R[i])) : b)
/** largest |Δsample| over the first and the last `ms` of a buffer (mono or stereo); the edges count against 0 */
export function edgeSteps(b, ms = 1) {
  let start = 0, end = 0
  for (const x of b.L ? [b.L, b.R] : [b]) {
    const n = x.length, m = Math.round(ms / 1000 * SR)
    for (let i = 0; i < m && i < n; i++) start = Math.max(start, Math.abs(x[i] - (i ? x[i - 1] : 0)))
    for (let i = Math.max(0, n - m); i < n; i++) end = Math.max(end, Math.abs((i + 1 < n ? x[i + 1] : 0) - x[i]))
  }
  return { start, end }
}
/** normalised cross-correlation of two buffers at lag 0 (or the best of `lags`) */
export function ncc(a, b, lags = [0]) {
  const x = monoOf(a), y = monoOf(b), m = Math.min(x.length, y.length)
  let best = -Infinity
  for (const lag of lags) {
    let s = 0, ea = 0, ey = 0
    for (let i = Math.max(0, -lag); i < m && i + lag < m; i++) { s += x[i] * y[i + lag]; ea += x[i] * x[i]; ey += y[i + lag] * y[i + lag] }
    best = Math.max(best, s / Math.sqrt(ea * ey + 1e-30))
  }
  return best
}
