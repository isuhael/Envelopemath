// Audio audit (bible §9.1-9.3, measurable without ears): loudness, true peak, LRA, crest factor, silence, stereo
// correlation and mono fold, phone-speaker proxy, octave-band balance and harshness, DC, cue-onset alignment, and a
// spectrogram PNG per file. Works on any MP4/M4A/WAV; with the engine's <id>.score.json / <id>.report.json next to the
// file (or a cue record) it also checks onsets against the cue list and limits the spectrum to [0, base].
import fs from 'node:fs'
import path from 'node:path'
import { SR, biquadCoefs, biquad } from './dsp.mjs'
import { loudness, truePeakDb } from './loudness.mjs'
import { decodeAudio, ebur128, spectrogram, probe } from './ffmpeg.mjs'
import { checkScore } from './scorecheck.mjs'

export const BANDS = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]

// ---------------------------------------------------------------- FFT (radix-2, in place)
function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) {
    let bit = n >> 1
    for (; j & bit; bit >>= 1) j ^= bit
    j ^= bit
    if (i < j) { let t = re[i]; re[i] = re[j]; re[j] = t; t = im[i]; im[i] = im[j]; im[j] = t }
  }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang)
    for (let i = 0; i < n; i += len) {
      let cr = 1, ci = 0
      for (let k = 0; k < len / 2; k++) {
        const a = i + k, b = a + len / 2
        const tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr
        re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti
        const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr
      }
    }
  }
}
/** long-term average power spectrum of the mono mix over [i0, i1): Hann 8192, 50% overlap -> Float64Array(4097) */
export function ltas(L, R, i0 = 0, i1 = L.length, N = 8192) {
  const P = new Float64Array(N / 2 + 1), w = new Float64Array(N)
  for (let i = 0; i < N; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N)
  const re = new Float64Array(N), im = new Float64Array(N)
  let frames = 0
  for (let s = i0; s + N <= i1; s += N / 2) {
    for (let i = 0; i < N; i++) { re[i] = 0.5 * (L[s + i] + R[s + i]) * w[i]; im[i] = 0 }
    fft(re, im)
    for (let k = 0; k <= N / 2; k++) P[k] += re[k] * re[k] + im[k] * im[k]
    frames++
  }
  if (frames) for (let k = 0; k <= N / 2; k++) P[k] /= frames
  return P
}
const bandPower = (P, lo, hi, N = 8192) => { let s = 0; for (let k = Math.ceil(lo * N / SR); k <= Math.min(N / 2, Math.floor(hi * N / SR)); k++) s += P[k]; return s }
/** octave bands re the 1 kHz octave (dB), plus the 2-5 kHz harshness margin over the 500 Hz-8 kHz regression line */
export function bandBalance(L, R, i0, i1) {
  const P = ltas(L, R, i0, i1)
  const pw = BANDS.map(f => bandPower(P, f / Math.SQRT2, Math.min(f * Math.SQRT2, SR / 2)))
  const ref = pw[BANDS.indexOf(1000)] || 1e-30
  const db = pw.map(p => 10 * Math.log10((p || 1e-30) / ref))
  // regression through the 500, 1k, 2k, 4k, 8k octave bands (dB vs log2 f)
  const xs = [500, 1000, 2000, 4000, 8000].map(f => Math.log2(f)), ys = [4, 5, 6, 7, 8].map(i => db[i])
  const mx = xs.reduce((a, b) => a + b) / 5, my = ys.reduce((a, b) => a + b) / 5
  const sl = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / xs.reduce((a, x) => a + (x - mx) ** 2, 0)
  const harshDb = 10 * Math.log10((bandPower(P, 2000, 5000) / Math.log2(5000 / 2000) || 1e-30) / ref) - (my + sl * (Math.log2(Math.sqrt(2000 * 5000)) - mx))
  return { bands: Object.fromEntries(BANDS.map((f, i) => [f, +db[i].toFixed(1)])), harshDb: +harshDb.toFixed(2) }
}

// ---------------------------------------------------------------- time-domain measures
/** runs of 50 ms RMS (max of channels) below thrDb lasting >= minDur inside [t0, t1] */
export function silence(L, R, { thrDb = -45, minDur = 1.0, t0 = 0, t1 = null } = {}) {
  const W = Math.round(0.05 * SR), n = L.length, end = Math.min(n, Math.round((t1 ?? n / SR) * SR))
  const thr = Math.pow(10, thrDb / 20)
  const runs = []
  let start = null
  for (let s = Math.round(t0 * SR); s + W <= end; s += W) {
    let a = 0, b = 0
    for (let i = s; i < s + W; i++) { a += L[i] * L[i]; b += R[i] * R[i] }
    const r = Math.sqrt(Math.max(a, b) / W)
    if (r < thr) { if (start == null) start = s } else if (start != null) { runs.push([start / SR, s / SR]); start = null }
  }
  if (start != null) runs.push([start / SR, end / SR])
  const long = runs.filter(([a, b]) => b - a >= minDur - 1e-9)
  const total = long.reduce((x, [a, b]) => x + b - a, 0)
  const longest = runs.reduce((x, [a, b]) => Math.max(x, b - a), 0)
  return { runs: long.map(([a, b]) => [+a.toFixed(2), +b.toFixed(2)]), pct: 100 * total / Math.max(1e-9, (end - Math.round(t0 * SR)) / SR), longest: +longest.toFixed(2) }
}
/** Pearson L/R correlation per 400 ms window (silent windows skipped): { mean, min } */
export function correlation(L, R) {
  const W = Math.round(0.4 * SR), vals = []
  for (let s = 0; s + W <= L.length; s += W) {
    let sl = 0, sr = 0, sll = 0, srr = 0, slr = 0
    for (let i = s; i < s + W; i++) { const a = L[i], b = R[i]; sl += a; sr += b; sll += a * a; srr += b * b; slr += a * b }
    const vl = sll - sl * sl / W, vr = srr - sr * sr / W
    if (vl < 1e-9 * W || vr < 1e-9 * W) continue
    vals.push((slr - sl * sr / W) / Math.sqrt(vl * vr))
  }
  return { mean: vals.length ? vals.reduce((a, b) => a + b) / vals.length : 1, min: vals.length ? Math.min(...vals) : 1 }
}
function crest(L, R) {
  let pk = 0, ss = 0
  for (let i = 0; i < L.length; i++) { pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); ss += (L[i] * L[i] + R[i] * R[i]) / 2 }
  const rms = Math.sqrt(ss / Math.max(1, L.length))
  return rms > 0 ? 20 * Math.log10(pk / rms) : 0
}
const dc = x => x.reduce((a, b) => a + b, 0) / Math.max(1, x.length)
/**
 * Cue-onset alignment: for each cue, the steepest rise of the 2 kHz-high-passed energy (1 ms frames) within ±25 ms of the
 * cue time, re the cue time (ms). Indicative only in a full mix (music transients nearby can win); report.json's
 * cueStart (solo renders) is the exact check (bible B4).
 */
export function onsets(L, R, cues) {
  const n = L.length, x = new Float64Array(n)
  for (let i = 0; i < n; i++) x[i] = 0.5 * (L[i] + R[i])
  biquad(x, biquadCoefs('hp', 2000, { q: 0.7071 }))
  const F = 48, E = new Float64Array(Math.floor(n / F))
  for (let f = 0; f < E.length; f++) { let s = 0; for (let i = f * F; i < (f + 1) * F; i++) s += x[i] * x[i]; E[f] = 10 * Math.log10(s / F + 1e-12) }
  const out = []
  for (const c of cues) {
    const fc = Math.round(c.t * 1000)
    let best = null
    for (let f = Math.max(2, fc - 25); f <= Math.min(E.length - 1, fc + 25); f++) { const d = E[f] - E[f - 2]; if (!best || d > best.d) best = { d, f } }
    if (best && best.d > 3) out.push({ t: c.t, kind: c.kind, errMs: best.f - 1 - c.t * 1000 + 0.5, rise: +best.d.toFixed(1) })
  }
  const errs = out.map(o => Math.abs(o.errMs)).sort((a, b) => a - b)
  return { n: cues.length, detected: out.length, medianAbsMs: errs.length ? +errs[Math.floor(errs.length / 2)].toFixed(1) : null, maxAbsMs: errs.length ? +errs[errs.length - 1].toFixed(1) : null, list: out }
}

/** find the engine's sidecar files for a media file: <dir>/<id>.score.json and <id>.report.json (or in extra dirs) */
function sidecars(file, dirs = []) {
  const id = path.basename(file).replace(/\.(mp4|m4a|wav|aac)$/i, '').replace(/\.(mix|sound)$/, '')
  const look = d => { const s = path.join(d, `${id}.score.json`), r = path.join(d, `${id}.report.json`); return { score: fs.existsSync(s) ? JSON.parse(fs.readFileSync(s, 'utf8')) : null, report: fs.existsSync(r) ? JSON.parse(fs.readFileSync(r, 'utf8')) : null } }
  for (const d of [path.dirname(file), ...dirs]) { const x = look(d); if (x.score || x.report) return { id, ...x } }
  return { id, score: null, report: null }
}

/**
 * Audit one media file. opts: { outDir (spectrogram + json; default next to the file), sidecarDirs, rec (a cue record),
 * spectrogram = true }. Returns the metrics object.
 */
export function auditFile(file, { outDir = null, sidecarDirs = [], rec = null, spectro = true } = {}) {
  const { id, score, report } = sidecars(file, sidecarDirs)
  const { L, R } = decodeAudio(file)
  const dur = L.length / SR
  const base = score ? score.base : rec ? rec.base : dur
  const cues = score ? score.sfx.map(s => ({ t: s.t, kind: s.kind })) : rec ? rec.sfx.filter(c => c.t >= 0).map(c => ({ t: c.t, kind: c.kind })) : []
  const ld = loudness({ L, R })
  const tp = truePeakDb({ L, R })
  let ff = null
  try { ff = ebur128(file) } catch (e) { ff = { error: e.message.slice(0, 120) } }
  const mono = new Float32Array(L.length)
  for (let i = 0; i < L.length; i++) mono[i] = 0.5 * (L[i] + R[i])
  const monoI = loudness({ L: mono, R: mono }).integrated
  const ph = { L: Float32Array.from(L), R: Float32Array.from(R) }
  for (const ch of [ph.L, ph.R]) { const c = biquadCoefs('hp', 250, { q: 0.7071 }); biquad(ch, c); biquad(ch, c) }
  const phoneI = loudness(ph).integrated
  const sil = silence(L, R, { t1: Math.max(0, dur - 0.40) })
  const corr = correlation(L, R)
  const bb = bandBalance(L, R, 0, Math.round(Math.min(base, dur) * SR))
  const on = cues.length ? onsets(L, R, cues) : null
  let streams = null
  try { streams = probe(file).streams } catch { streams = null }
  const a = streams ? streams.find(s => s.codec_type === 'audio') : null, v = streams ? streams.find(s => s.codec_type === 'video') : null
  const res = {
    id, file, duration: +dur.toFixed(3),
    I: +ld.integrated.toFixed(2), TP: +tp.toFixed(2), LRA: +ld.lra.toFixed(2), PLR: +(tp - ld.integrated).toFixed(2),
    momentaryMax: +ld.momentaryMax.toFixed(2), shortTermMax: +ld.shortTermMax.toFixed(2),
    hook: +(ld.momentary[3] ?? -Infinity).toFixed(2),
    ffmpeg: ff,
    crestDb: +crest(L, R).toFixed(2), dc: [+dc(L).toExponential(2), +dc(R).toExponential(2)],
    silencePct: +sil.pct.toFixed(1), silenceRuns: sil.runs, longestQuiet: sil.longest,
    corrMean: +corr.mean.toFixed(3), corrMin: +corr.min.toFixed(3), monoFoldDelta: +(monoI - ld.integrated).toFixed(2),
    phoneDrop: +(ld.integrated - phoneI).toFixed(2),
    bands: bb.bands, harshDb: bb.harshDb,
    onsets: on ? { n: on.n, detected: on.detected, medianAbsMs: on.medianAbsMs, maxAbsMs: on.maxAbsMs } : null,
    cueStartMaxErrMs: report ? report.cueStartMaxErrMs : null,
    delivery: a ? { codec: a.codec_name, profile: a.profile, channels: a.channels, rate: +a.sample_rate, kbps: a.bit_rate ? Math.round(a.bit_rate / 1000) : null, duration: +a.duration, video: v ? +v.duration : null } : null,
    P: score ? score.anchors.P.t : null, L: score ? score.anchors.L : null, base,
  }
  if (score) { const sc = checkScore(score); res.score = { pass: sc.pass, total: sc.total, failed: sc.checks.filter(c => !c.pass).map(c => `${c.id}: ${c.detail}`) }; res.scoreChecks = sc.checks }
  const od = outDir || path.dirname(file)
  fs.mkdirSync(od, { recursive: true })
  if (spectro) { const png = path.join(od, `${id}.spectrogram.png`); try { spectrogram(file, png); res.spectrogram = png } catch (e) { res.spectrogram = null } }
  fs.writeFileSync(path.join(od, `${id}.audit.json`), JSON.stringify({ ...res, onsetList: on ? on.list : [] }, null, 1))
  return res
}

/** one table row per audit result */
export function formatAudit(rows) {
  const head = ['id', 'I', 'TP', 'LRA', 'PLR', 'crest', 'sil%', 'gap', 'corr', 'cmin', 'mono', 'phone', '63', '1k', '8k', 'harsh', 'onset', 'cue', 'score']
  const lines = [head.join('\t')]
  for (const r of rows) lines.push([r.id.slice(0, 26), r.I, r.TP, r.LRA, r.PLR, r.crestDb, r.silencePct, r.longestQuiet, r.corrMean, r.corrMin, r.monoFoldDelta, r.phoneDrop, r.bands[63], r.bands[1000], r.bands[8000], r.harshDb, r.onsets ? `${r.onsets.medianAbsMs}/${r.onsets.maxAbsMs}` : '-', r.cueStartMaxErrMs ?? '-', r.score ? `${r.score.pass}/${r.score.total}` : '-'].join('\t'))
  const fails = rows.filter(r => r.score && r.score.failed.length)
  if (fails.length) lines.push('', 'score checks failed:', ...fails.flatMap(r => r.score.failed.map(f => `  ${r.id.slice(0, 26)}  ${f}`)))
  return lines.join('\n')
}
