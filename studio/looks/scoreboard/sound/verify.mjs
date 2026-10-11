#!/usr/bin/env node
// Acceptance checks for the Scoreboard pack that `cli.mjs audit` does not run (sound bible §9): the stem relations and
// timing checks B1, B3, B5, B6, B7, B8, B9, the loudness checks A3, A4, A7, A11, the §9.2 octave bands and harshness for
// this look, and the humanising stats of S8. Two of the pack's own rules ride along:
//   TRAIN  no music onset (kick, clap, snare, hat, arp, lead, stab) 12-60 ms from a clock-train tick (anchors excepted)
//   DUCK   no B3 cue's broadband music duck deeper than 1.5x its §5 table depth (6 dB on the hook at t = 0 and at V; a
//          hit at P keeps the payoff design)
// It reads what the engine writes:
//   <dir>/<id>.report.json, <id>.score.json, <id>.wav (or the .m4a / ../<id>.mp4), and the stems
//   (<stems>/<id>.music.dry.wav, .music.wav, .sfx.wav).
// Usage (from studio/):
//   node src/cli.mjs sound specs/*-scoreboard-*.json --video ../renders/channel --out /tmp/snd-scoreboard/mp4 --score --wav --stems
//   node looks/scoreboard/sound/verify.mjs /tmp/snd-scoreboard/mp4/sound --stems /tmp/snd-scoreboard/mp4/stems [--json]
import fs from 'node:fs'
import path from 'node:path'
import { readWav } from '../../../src/sound/wav.mjs'
import { loudness } from '../../../src/sound/loudness.mjs'
import { bandBalance } from '../../../src/sound/audit.mjs'
import { decodeAudio } from '../../../src/sound/ffmpeg.mjs'
import { mix as MIX } from './mix.mjs'

const SR = 48000
// §9.2 Scoreboard windows, but for the 31.5 Hz octave. The critic's fix (2026-10-11) returned the kick's tail to 48 Hz
// (it had been tuned to D1, 36.7 Hz, only to reach this band) and asked for the bible's window to move instead of the
// kick: with a 48 Hz kick and the 808 on 58-110 Hz the band measures -14.5 to -18.5 dB. The window used here, -20..+3,
// is the change requested for BIBLE §9.2 (see the README's deviations); the measured value is printed either way
const BANDS = { 31.5: [-20, 3], 63: [4, 10], 125: [2, 8], 250: [0, 6], 500: [-1, 4], 1000: [0, 0], 2000: [-5, 0], 4000: [-9, -2], 8000: [-14, -5], 16000: [-26, -12] }
const BAND_ORDER = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
const B3_KINDS = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])

const args = process.argv.slice(2)
const flag = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null }
const dir = path.resolve(args.find(a => !a.startsWith('--') && a !== flag('--stems')) || '.')
const stemsDir = path.resolve(flag('--stems') || path.join(dir, 'stems'))
const asJson = args.includes('--json')

const rms = (b, t0, t1) => {
  const i0 = Math.max(0, Math.round(t0 * SR)), i1 = Math.min(b.L.length, Math.round(t1 * SR))
  let s = 0
  for (let i = i0; i < i1; i++) s += b.L[i] * b.L[i] + b.R[i] * b.R[i]
  return i1 > i0 ? Math.sqrt(s / (2 * (i1 - i0))) : 0
}
const db = x => (x > 0 ? 20 * Math.log10(x) : -200)
const mean = a => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length)
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))) }
/** short-term (3 s) or momentary (0.4 s) loudness at 100 ms hops: value k covers the window ending at (k + 1)·0.1 s */
const at = (series, t) => { const k = Math.round(t / 0.1) - 1; return k >= 0 && k < series.length ? series[k] : null }

/** spectral-flux onset near t in a stereo buffer: the time (s) of the strongest positive flux peak within ±win */
function fluxOnset(b, t, win = 0.06) {
  const N = 1024, hop = 64
  const i0 = Math.max(0, Math.round((t - win) * SR) - N), i1 = Math.min(b.L.length - N, Math.round((t + win) * SR))
  const w = new Float64Array(N); for (let i = 0; i < N; i++) w[i] = 0.5 - 0.5 * Math.cos(2 * Math.PI * i / N)
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
      const tc = (s + N / 2) / SR   // frame centre
      if (Math.abs(tc - t) <= win && (!best || f > best.f)) best = { f, t: tc }
    }
    prev = mag
  }
  return best
}
function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]] } }
  for (let len = 2; len <= n; len <<= 1) {
    const a = -2 * Math.PI / len, wr = Math.cos(a), wi = Math.sin(a)
    for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const p = i + k, q = p + len / 2; const tr = re[q] * cr - im[q] * ci, ti = re[q] * ci + im[q] * cr; re[q] = re[p] - tr; im[q] = im[p] - ti; re[p] += tr; im[p] += ti; const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr } }
  }
}
/** the 16th / 32nd / 16th-triplet grid point nearest to t (from the score's bars) */
function gridErr(score, t) {
  let bar = score.bars[0]
  for (const b of score.bars) if (b.t <= t + 1e-6) bar = b
  const beat = 60 / bar.bpm, x = (t - bar.t) / beat
  let best = null
  for (const d of [4, 8, 6]) { const e = (x - Math.round(x * d) / d) * beat; if (best == null || Math.abs(e) < Math.abs(best)) best = e }
  return best
}

function checkOne(id) {
  const rep = JSON.parse(fs.readFileSync(path.join(dir, `${id}.report.json`), 'utf8'))
  const sc = JSON.parse(fs.readFileSync(path.join(dir, `${id}.score.json`), 'utf8'))
  const wavF = path.join(dir, `${id}.wav`)
  const media = fs.existsSync(path.join(dir, `${id}.m4a`)) ? path.join(dir, `${id}.m4a`) : fs.existsSync(path.join(dir, '..', `${id}.mp4`)) ? path.join(dir, '..', `${id}.mp4`) : null
  const mix = media ? decodeAudio(media) : readWav(wavF)
  const master = fs.existsSync(wavF) ? readWav(wavF) : mix
  const stem = n => { const f = path.join(stemsDir, `${id}.${n}.wav`); return fs.existsSync(f) ? readWav(f) : null }
  const music = stem('music'), musicDry = stem('music.dry'), sfx = stem('sfx')
  const P = sc.anchors.P.t, L = sc.anchors.L, base = sc.base, dur = sc.duration
  const res = []
  const add = (k, pass, detail) => res.push({ k, pass: !!pass, detail })
  const ld = loudness(mix)
  // A3, A4, A7 (decoded delivery audio)
  add('A3', ld.lra >= 4 && ld.lra <= 9, `LRA ${ld.lra.toFixed(2)}`)
  add('A4', ld.shortTermMax <= -8 && ld.momentaryMax <= -6, `ST max ${ld.shortTermMax.toFixed(2)}, M max ${ld.momentaryMax.toFixed(2)}`)
  add('A7', ld.momentary[3] >= -18, `hook M(0-0.4) ${ld.momentary[3].toFixed(2)}`)
  add('A11', rep.limiter.pctOver1dB <= 3 && rep.limiter.maxGr <= 6, `>1 dB ${rep.limiter.pctOver1dB}% max ${rep.limiter.maxGr} dB`)
  // §9.2 bands (decoded mix, [0, base])
  const bb = bandBalance(mix.L, mix.R, 0, Math.round(base * SR))
  const off = Object.entries(BANDS).filter(([f, [lo, hi]]) => bb.bands[f] < lo || bb.bands[f] > hi).map(([f]) => `${f}:${bb.bands[f]}`)
  add('BANDS', !off.length, (off.length ? `out: ${off.join(' ')}; ` : '') + BAND_ORDER.map(f => `${f}:${bb.bands[f]}`).join(' '))
  add('HARSH', bb.harshDb <= 2, `2-5 kHz ${bb.harshDb} dB`)
  // B1 stem balance
  const mu = rep.stems.music.reMix, sx = rep.stems.sfx.reMix
  add('B1', mu <= -1.5 && mu >= -3.5 && sx <= -2.5 && sx >= -5, `music ${mu}, sfx ${sx}`)
  // B3 cue audibility
  if (music && sfx) {
    const bad = []
    let n = 0
    for (const s of sc.sfx) {
      if (!B3_KINDS.has(s.kind) || (s.cueGain ?? s.gain) < 0.4) continue
      n++
      const d = db(rms(sfx, s.t, s.t + 0.05)) - db(rms(music, s.t, s.t + 0.05))
      if (d < 3) bad.push(`${s.kind}@${s.t}${s.card ? '(card)' : ''}:${d.toFixed(1)}`)
    }
    const body = bad.filter(x => !x.includes('(card)'))
    add('B3', !body.length, `${n - bad.length}/${n}${bad.length ? ' low: ' + bad.join(' ') : ''}`)
  }
  // B5 payoff onset in the music stem
  if (music) { const o = fluxOnset(music, P); add('B5', o && Math.abs(o.t - P) <= 0.010, o ? `flux peak ${((o.t - P) * 1000).toFixed(1)} ms from P` : 'none') }
  // B6 / B7 on music.dry short-term loudness
  if (musicDry) {
    const ldm = loudness(musicDry), st = ldm.shortTerm
    const I = ldm.integrated
    const gap = [P - 60 / sc.bars.find(b => b.t <= P - 1e-3 && b.t + b.beats * 60 / b.bpm >= P - 1e-3).bpm / 2, P]
    let worst = Infinity, wt = null
    for (let k = 29; k < st.length; k++) { const t1 = (k + 1) * 0.1; if (t1 > base + 1e-6) break; if (st[k] < worst) { worst = st[k]; wt = t1 } }
    add('B6', I - worst <= 18, `min ST ${worst.toFixed(1)} @${wt?.toFixed(1)} vs I ${I.toFixed(1)}`)
    void gap
    const sec = n => sc.sections.find(s => s.name === n)
    const bPP = sc.bars.find(b => Math.abs(b.t - P) < 1e-3)
    const twoBars = bPP ? 8 * 60 / bPP.bpm : 3.3
    const stMean = (t0, t1, centred) => {
      const v = []
      for (let k = 0; k < st.length; k++) { const te = (k + 1) * 0.1, tc = te - 1.5, tt = centred ? tc : te; if (tt >= t0 - 1e-6 && tt <= t1 + 1e-6 && st[k] != null && Number.isFinite(st[k])) v.push(st[k]) }
      return v.length ? mean(v) : null
    }
    const build = sec('BUILD'), drop = sec('DROP'), hold = sec('HOLD')
    for (const centred of [false, true]) {
      const tag = centred ? 'c' : 'e'
      const mDrop = stMean(P, P + twoBars, centred), mBuild = build ? stMean(build.t0, build.t1, centred) : null
      const ok1 = mBuild == null || mDrop >= mBuild + 2
      const mHold = hold ? stMean(hold.t0, hold.t1, centred) : null, mDropSec = drop ? stMean(drop.t0, drop.t1, centred) : mDrop
      const ok2 = mHold == null || mHold <= mDropSec - 1.5
      let ok3 = true, h1 = null, h2 = null
      if (build) { const mid = (build.t0 + build.t1) / 2; h1 = stMean(build.t0, mid, centred); h2 = stMean(mid, build.t1, centred); ok3 = h1 == null || h2 == null || h2 >= h1 }
      add(`B7${tag}`, ok1 && ok2 && ok3, `drop ${mDrop?.toFixed(1)} vs build ${mBuild?.toFixed(1)} (+${(mDrop - mBuild).toFixed(1)}); hold ${mHold?.toFixed(1)} vs drop ${mDropSec?.toFixed(1)}; build halves ${h1?.toFixed(1)} -> ${h2?.toFixed(1)}`)
    }
  }
  // B8 logo loudness (decoded mix, momentary windows ending at L + 0.2 and P + 0.2)
  if (L != null) {
    const mL = at(ld.momentary, L + 0.2), mP = at(ld.momentary, P + 0.2)
    add('B8', mL >= -13 && mL <= mP, `M(L+0.2) ${mL?.toFixed(2)}, M(P+0.2) ${mP?.toFixed(2)}`)
  }
  // B9 card tail (master WAV): nothing under -45 dBFS (50 ms RMS) in [base, dur - 0.40], the last sample 0
  {
    let low = 0
    for (let t = base; t + 0.05 <= dur - 0.40 + 1e-9; t += 0.05) if (db(Math.max(rms({ L: master.L, R: master.L }, t, t + 0.05), rms({ L: master.R, R: master.R }, t, t + 0.05))) < -45) low++
    const n = master.L.length
    add('B9', low === 0 && master.L[n - 1] === 0 && master.R[n - 1] === 0, `${low} low windows, last sample ${master.L[n - 1]}/${master.R[n - 1]}`)
  }
  // TRAIN: clock-train ticks never flam against a music onset
  {
    const anchors = [0, P, sc.anchors.V ? sc.anchors.V.t : null, base].filter(x => x != null)
    const ons = [...sc.notes.filter(n => n.role !== 'logo' && /arp|lead|stab/.test(n.role)), ...sc.drums.filter(d => d.role !== 'logo' && /kick|clap|snare|hat/.test(d.inst))]
      .filter(e => !anchors.some(a => Math.abs(a - e.t) <= 0.001))
    const ticks = sc.sfx.filter(x => x.train != null)
    const bad = []
    for (const tk of ticks) for (const e of ons) { const d = Math.abs(e.t - tk.t); if (d >= 0.012 && d <= 0.060) bad.push(`${e.inst}@${e.t}~tick@${tk.t}`) }
    add('TRAIN', !bad.length, ticks.length ? `${ticks.length} ticks, ${bad.length} music onsets 12-60 ms from one${bad.length ? ': ' + bad.slice(0, 4).join(' ') : ''}` : 'no clock trains')
  }
  // DUCK: the B3 clearance stays band-selective (the broadband duck within 1.5x the §5 table; 6 dB at the hook and V)
  {
    const Vt = sc.anchors.V ? sc.anchors.V.t : null
    const hitP = sc.sfx.some(x => x.kind === 'hit' && Math.abs(x.t - P) <= 0.015)
    const bad = []
    let worst = 0
    for (const x of sc.sfx) {
      const g = x.cueGain ?? x.gain
      if (!B3_KINDS.has(x.kind) || g < 0.4 || x.card || !x.duck) continue
      const atP = Math.abs(x.t - P) <= 0.015
      if (atP && hitP) continue
      const scale = Math.min(1.2, Math.max(0.3, g / 0.7))
      const tab = ((atP && MIX.duckBig[x.kind]) || MIX.duck[x.kind])[0] * scale
      const cap = x.t <= 0.02 || (Vt != null && Math.abs(x.t - Vt) <= 0.015) ? Math.max(tab, 6) : 1.5 * tab
      worst = Math.max(worst, x.duck.depth - tab)
      if (x.duck.depth > cap + 0.05) bad.push(`${x.kind}@${x.t}:${x.duck.depth}>${cap.toFixed(1)}`)
    }
    add('DUCK', !bad.length, bad.length ? `over the cap: ${bad.join(' ')}` : `largest extra over the table ${worst.toFixed(1)} dB`)
  }
  // S8 humanising: velocity jitter is in the score (per instrument SD of vel), hat timing from the grid
  {
    const byInst = {}
    for (const e of [...sc.notes, ...sc.drums]) { if (e.role === 'logo') continue; (byInst[e.inst] = byInst[e.inst] || []).push(e) }
    const hats = (byInst.hat || []).map(e => gridErr(sc, e.t) * 1000)
    const kicks = [...(byInst.kick || []), ...(byInst.clap || []), ...(byInst.snare || [])].map(e => Math.abs(gridErr(sc, e.t)) * 1000)
    const rmsOff = Math.sqrt(mean(hats.map(x => x * x)))
    // velocity humanising: per instrument, the SD of the velocity jitter is read as the SD of vel within groups of equal
    // written velocity is not in the score, so report the raw SD per instrument for information
    const vsd = Object.fromEntries(Object.entries(byInst).filter(([, a]) => a.length >= 4).map(([k, a]) => [k, +sd(a.map(e => e.vel ?? 1)).toFixed(3)]))
    add('S8', rmsOff >= 1.5 && rmsOff <= 5 && Math.max(0, ...kicks) < 0.2, `hat timing SD ${rmsOff.toFixed(2)} ms, kick/snare/clap max off-grid ${Math.max(0, ...kicks).toFixed(3)} ms; vel SD ${JSON.stringify(vsd)}`)
  }
  return { id, checks: res, metrics: { I: ld.integrated, LRA: ld.lra, bands: bb.bands, harsh: bb.harshDb } }
}

const ids = fs.readdirSync(dir).filter(f => f.endsWith('.report.json')).map(f => f.replace('.report.json', '')).sort()
const out = ids.map(checkOne)
if (asJson) console.log(JSON.stringify(out, null, 1))
else {
  for (const r of out) {
    const fails = r.checks.filter(c => !c.pass)
    console.log(`${r.id.slice(0, 28).padEnd(28)} ${r.checks.length - fails.length}/${r.checks.length}  ${fails.map(c => `${c.k}[${c.detail}]`).join('  ')}`)
  }
  const all = out.flatMap(r => r.checks)
  console.log(`\n${all.filter(c => c.pass).length}/${all.length} checks pass`)
  if (args.includes('--detail')) for (const r of out) { console.log(`\n${r.id}`); for (const c of r.checks) console.log(`  ${c.pass ? 'ok ' : 'XX '} ${c.k.padEnd(6)} ${c.detail}`) }
}
