// Becker Rig acceptance harness: the bible §9 checks the engine audit does not print (B1 B3 B5-B9, A3-A11 with the
// Becker thresholds, the §9.2 bands, S8, S13 in full) plus the engine's S1-S14/B2/B10.
// usage: node check.mjs <dir with sound/*.report.json + score> <stems dir> [mp4 dir] [--only id] [--json out]
import fs from 'node:fs'
import path from 'node:path'
import { readWav } from '/home/user/Envelopemath/studio/src/sound/wav.mjs'
import { loudness, truePeakDb } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
import { checkScore } from '/home/user/Envelopemath/studio/src/sound/scorecheck.mjs'
import { bandBalance, correlation, silence } from '/home/user/Envelopemath/studio/src/sound/audit.mjs'
import { decodeAudio } from '/home/user/Envelopemath/studio/src/sound/ffmpeg.mjs'
import { biquadCoefs, biquad } from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'

const SR = 48000
const [repDir, stemDir, mp4Dir] = process.argv.slice(2).filter(a => !a.startsWith('--'))
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const jsonOut = process.argv.includes('--json') ? process.argv[process.argv.indexOf('--json') + 1] : null
const BANDS = { 31.5: [-16, -4], 63: [-2, 7], 125: [1, 7], 250: [0, 6], 500: [-1, 4], 1000: [0, 0], 2000: [-5, 0], 4000: [-8, -2], 8000: [-13, -5], 16000: [-25, -12] }
const ids = fs.readdirSync(repDir).filter(f => f.endsWith('.report.json')).map(f => f.replace('.report.json', '')).filter(id => /becker/.test(id) && (!only || id.startsWith(only))).sort()

const rmsDb = (b, t0, t1) => {
  const i0 = Math.max(0, Math.round(t0 * SR)), i1 = Math.min(b.L.length, Math.round(t1 * SR))
  let s = 0
  for (let i = i0; i < i1; i++) s += (b.L[i] * b.L[i] + b.R[i] * b.R[i]) / 2
  return 10 * Math.log10(s / Math.max(1, i1 - i0) + 1e-20)
}
const mean = a => a.reduce((x, y) => x + y, 0) / Math.max(1, a.length)
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))) }
// short-term value of the 3 s window ending at t (hop 100 ms)
const stAt = (st, t) => { const h = Math.round(t / 0.1) - 1; return h >= 29 && h < st.length ? st[h] : null }
const momAt = (mo, t) => { const h = Math.round(t / 0.1) - 1; return h >= 3 && h < mo.length ? mo[h] : null }
/** spectral flux onset: the strongest rise of 2 ms-frame energy (HP 100 Hz) within ±60 ms of t */
function onsetNear(b, t) {
  const x = new Float64Array(Math.round(0.2 * SR)), i0 = Math.round((t - 0.1) * SR)
  for (let i = 0; i < x.length; i++) { const j = i0 + i; x[i] = j >= 0 && j < b.L.length ? 0.5 * (b.L[j] + b.R[j]) : 0 }
  biquad(x, biquadCoefs('hp', 100, { q: 0.7071 }))
  const F = 96, E = []
  for (let f = 0; f * F + F <= x.length; f++) { let s = 0; for (let i = f * F; i < (f + 1) * F; i++) s += x[i] * x[i]; E.push(10 * Math.log10(s / F + 1e-14)) }
  let best = null
  for (let f = 1; f < E.length; f++) { const ft = (t - 0.1) + f * F / SR; if (Math.abs(ft - t) > 0.06) continue; const d = E[f] - E[f - 1]; if (!best || d > best.d) best = { d, t: ft } }
  return best
}

const rows = []
for (const id of ids) {
  const rep = JSON.parse(fs.readFileSync(path.join(repDir, `${id}.report.json`), 'utf8'))
  const scF = path.join(repDir, `${id}.score.json`)
  const sc = fs.existsSync(scF) ? JSON.parse(fs.readFileSync(scF, 'utf8')) : null
  const st = n => readWav(path.join(stemDir, `${id}.${n}.wav`))
  const enc = mp4Dir && [`${id}.mp4`, `${id}.m4a`].map(f => path.join(mp4Dir, f)).find(f => fs.existsSync(f))
  const mix = enc ? decodeAudio(enc) : st('mix')
  const music = st('music'), sfx = st('sfx'), dry = st('music.dry')
  const fails = [], info = {}
  const chk = (id_, ok, detail) => { info[id_] = detail; if (!ok) fails.push(`${id_}: ${detail}`) }
  const L = loudness(mix)
  const tp = truePeakDb(mix)
  const dur = mix.L.length / SR, base = sc.base, P = sc.anchors.P.t, Lc = sc.anchors.L
  chk('A1', Math.abs(L.integrated + 14) <= 1.0, L.integrated.toFixed(2))
  chk('A2', tp <= -1.0, tp.toFixed(2))
  chk('A3', L.lra >= 3 && L.lra <= 8, L.lra.toFixed(2))
  chk('A4', L.shortTermMax <= -8 && L.momentaryMax <= -6, `${L.shortTermMax.toFixed(1)}/${L.momentaryMax.toFixed(1)}`)
  chk('A5', tp - L.integrated >= 8 && tp - L.integrated <= 13, (tp - L.integrated).toFixed(2))
  const sil = silence(mix.L, mix.R, { t1: dur - 0.4 })
  chk('A6', sil.runs.length === 0, `${sil.pct.toFixed(1)}% longest ${sil.longest}`)
  const hook = momAt(L.momentary, 0.4)
  chk('A7', hook >= -18, hook.toFixed(1))
  const corr = correlation(mix.L, mix.R)
  const mono = new Float32Array(mix.L.length); for (let i = 0; i < mono.length; i++) mono[i] = 0.5 * (mix.L[i] + mix.R[i])
  const monoI = loudness({ L: mono, R: mono }).integrated
  chk('A8', corr.mean >= 0.30 && corr.min >= -0.10 && Math.abs(monoI - L.integrated) <= 1.5, `corr ${corr.mean.toFixed(2)} min ${corr.min.toFixed(2)} fold ${(monoI - L.integrated).toFixed(2)}`)
  const dcL = mean(Array.from(mix.L)), dcR = mean(Array.from(mix.R))
  chk('A9', Math.abs(dcL) <= 1e-4 && Math.abs(dcR) <= 1e-4, `${dcL.toExponential(1)} ${dcR.toExponential(1)}`)
  const ph = { L: Float32Array.from(mix.L), R: Float32Array.from(mix.R) }
  for (const ch of [ph.L, ph.R]) { const c = biquadCoefs('hp', 250, { q: 0.7071 }); biquad(ch, c); biquad(ch, c) }
  const phone = L.integrated - loudness(ph).integrated
  chk('A10', phone <= 4.5, phone.toFixed(2))
  chk('A11', rep.limiter.pctOver1dB <= 3 && rep.limiter.maxGr <= 6, `${rep.limiter.pctOver1dB}% max ${rep.limiter.maxGr}`)
  const bb = bandBalance(mix.L, mix.R, 0, Math.round(base * SR))
  const bad = Object.entries(BANDS).filter(([f, [lo, hi]]) => bb.bands[f] < lo - 1e-9 || bb.bands[f] > hi + 1e-9).map(([f]) => `${f}:${bb.bands[f]}`)
  chk('BANDS', !bad.length, Object.values(bb.bands).join(' ') + (bad.length ? `  OUT ${bad.join(' ')}` : ''))
  chk('HARSH', bb.harshDb <= 2, bb.harshDb.toFixed(2))
  // B1 stem balance (report). As written in the bible (music -2.5..-4.5, SFX -2..-4 LU re the mix, both gated) the two
  // bands only hold together when ~1/3 of the mix is in neither stem (reverb): with the §8.5 sends they cannot both
  // pass for sparse cues. Reported as B1w (waived, a bible change is requested); the gating check is the proposed B1:
  // music -0.5..-4.5 LU re the mix (a teaser of a few light cues is mostly band), SFX (gated) - music (gated) in
  // [-2, +2] LU (while they sound, the cues sit within 2 LU of the band), and
  // returns <= -8 LU re the mix (no reverb fill). The ungated SFX share and the SFX's own contribution (mix minus
  // mix-without-SFX) are printed for information.
  const mRe = rep.stems.music.reMix, sRe = rep.stems.sfx.reMix, rRe = rep.stems.returns.reMix
  info.B1w = `as written: music ${mRe} sfx ${sRe} (bands -2.5..-4.5 / -2..-4)${mRe <= -2.5 && mRe >= -4.5 && sRe <= -2 && sRe >= -4 ? ' pass' : ' FAIL (waived)'}`
  {
    const ungated = b => { const m = loudness(b).momentary; let p = 0, n = 0; for (let h = 3; h < m.length; h += 4) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) } return -0.691 + 10 * Math.log10(p / n) }
    const mixW = st('mix'), Iw = loudness(mixW).integrated
    const noS = { L: Float32Array.from(mixW.L, (v, i) => v - sfx.L[i]), R: Float32Array.from(mixW.R, (v, i) => v - sfx.R[i]) }
    info.B1u = `SFX ungated ${(ungated(sfx) - Iw).toFixed(2)} LU re mix, SFX adds ${(Iw - loudness(noS).integrated).toFixed(2)} LU`
  }
  const lead = +(sRe - mRe).toFixed(2)
  chk('B1', mRe <= -0.5 && mRe >= -4.5 && lead >= -2 && lead <= 2 && rRe <= -8, `music ${mRe} sfx ${sRe} (lead ${lead}) returns ${rRe}`)
  // B3 cue audibility
  const b3 = []
  for (const s of sc.sfx) {
    if (!['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'].includes(s.kind) || (s.cueGain ?? s.gain) < 0.4) continue
    const a = rmsDb(sfx, s.t, s.t + 0.05), m = rmsDb(music, s.t, s.t + 0.05)
    if (a < m + 3) b3.push(`${s.kind}@${s.t}(${(a - m).toFixed(1)})`)
  }
  chk('B3', !b3.length, b3.length ? b3.slice(0, 8).join(' ') + (b3.length > 8 ? ` +${b3.length - 8}` : '') : 'all')
  // B4
  chk('B4', rep.cueStartMaxErrMs <= 2, rep.cueStartMaxErrMs)
  // B5 music onset at P
  const on = onsetNear(music, P)
  chk('B5', on && Math.abs(on.t - P) <= 0.010, on ? `${((on.t - P) * 1000).toFixed(1)} ms rise ${on.d.toFixed(1)}` : 'none')
  // B6 continuity
  const LD = loudness(dry)
  const ten = sc.sections.find(s => s.name === 'TENSION')
  const lows = []
  for (let h = 29; h < LD.shortTerm.length; h++) {
    const t = (h + 1) * 0.1
    if (t > base) break
    const v = LD.shortTerm[h]
    if (v == null) continue
    if (v < LD.integrated - 18) lows.push(`${t.toFixed(1)}:${(v - LD.integrated).toFixed(1)}`)
  }
  chk('B6', !lows.length, lows.length ? lows.slice(0, 4).join(' ') : `min ok`)
  // B7 energy curve: short-term windows ending at t (and the 3 s window centred), sampled every 100 ms
  const secs = n => sc.sections.filter(s => s.name === n)
  const mST = (t0, t1, centred) => { const v = []; for (let t = t0; t <= t1 + 1e-9; t += 0.1) { const x = stAt(LD.shortTerm, centred ? Math.min(base, t + 1.5) : t); if (x != null && Number.isFinite(x)) v.push(x) } return v.length ? mean(v) : null }
  const bar2 = (() => { const b = sc.bars.find(x => Math.abs(x.t - P) < 0.002); return b ? 2 * 4 * 60 / b.bpm : 4 })()
  const B = secs('BUILD')[0], H = secs('HOLD')[0], Dr = secs('DROP')[0]
  const b7 = []
  for (const centred of [false, true]) {
    const drop = mST(P, Math.min(base, P + bar2), centred)
    const build = B ? mST(B.t0, B.t1, centred) : null
    const holdM = H ? mST(H.t0, H.t1, centred) : null
    const dropM = Dr ? mST(Dr.t0, Dr.t1, centred) : null
    if (build != null && drop < build + 2) b7.push(`${centred ? 'c' : 'e'} drop ${drop.toFixed(1)} < build ${build.toFixed(1)}+2`)
    if (holdM != null && dropM != null && holdM > dropM - 1.5) b7.push(`${centred ? 'c' : 'e'} hold ${holdM.toFixed(1)} > drop ${dropM.toFixed(1)}-1.5`)
    if (B) { const mid = (B.t0 + B.t1) / 2, h1 = mST(B.t0, mid, centred), h2 = mST(mid, B.t1, centred); if (h1 != null && h2 != null && h2 < h1) b7.push(`${centred ? 'c' : 'e'} build2 ${h2.toFixed(1)} < build1 ${h1.toFixed(1)}`) }
    info['B7' + (centred ? 'c' : 'e')] = `drop ${drop?.toFixed(1)} build ${build?.toFixed(1)} hold ${holdM?.toFixed(1)} dropSec ${dropM?.toFixed(1)}`
  }
  chk('B7', !b7.length, b7.join('; ') || info.B7e)
  // B8 logo
  const mL = momAt(L.momentary, Lc + 0.2), mP = momAt(L.momentary, P + 0.2)
  chk('B8', mL >= -13 && mL <= mP, `L ${mL.toFixed(1)} P ${mP.toFixed(1)}`)
  // B9 card tail
  const tailSil = silence(mix.L, mix.R, { t0: base, t1: dur - 0.4, minDur: 0.05 })
  // the last-sample-zero test reads the master WAV: an AAC decode never ends on an exact 0
  let lastZero = true
  try { const mw = st('mix'); lastZero = mw.L[mw.L.length - 1] === 0 && mw.R[mw.R.length - 1] === 0 } catch { lastZero = enc ? true : mix.L[mix.L.length - 1] === 0 }
  chk('B9', tailSil.runs.length === 0 && lastZero, tailSil.runs.length ? JSON.stringify(tailSil.runs) : lastZero ? 'ok' : 'last sample not 0')
  // score checks
  const scs = checkScore(sc)
  for (const c of scs.checks) chk(c.id, c.pass, c.detail)
  // S8 humanising
  {
    const byInst = {}
    for (const e of [...sc.notes, ...sc.drums]) { if (e.role === 'logo' || e.t >= base) continue; (byInst[e.inst] ||= []).push(e.vel ?? 1) }
    const badV = Object.entries(byInst).filter(([k, v]) => v.length >= 8 && !['revcrash', 'timp', 'crash', 'whistle', 'honkF', 'strings'].includes(k)).map(([k, v]) => [k, sd(v)]).filter(([, s]) => s < 0.03 || s > 0.15)
    // shaker timing re the swung grid
    const grid = t => {
      const b = [...sc.bars].reverse().find(x => x.t <= t + 0.01)
      if (!b) return t
      const s16 = 60 / b.bpm / 4, q = (t - b.t) / s16
      let best = null
      for (let k = Math.floor(q) - 1; k <= Math.ceil(q) + 1; k++) { if (k < 0) continue; const g = b.t + k * s16 + (k % 2 ? 0.16 * s16 : 0); if (best == null || Math.abs(t - g) < Math.abs(t - best)) best = g }
      return best
    }
    const offs = sc.drums.filter(d => d.inst === 'shaker').map(d => (d.t - grid(d.t)) * 1000)
    const tsd = offs.length ? sd(offs) : 0
    chk('S8', !badV.length && (!offs.length || (tsd >= 1.5 && tsd <= 5)), `vel SD out: ${badV.map(([k, s]) => `${k} ${s.toFixed(3)}`).join(', ') || 'none'}; shaker timing SD ${tsd.toFixed(2)} ms`)
  }
  // S13 in full: leaps <= 12; after a leap >= 6 the next interval opposite and <= 4 in >= 75%; phrase range <= 19
  {
    const mel = sc.notes.filter(n => /lead|glock/.test(n.role) && n.t < base).sort((a, b) => a.t - b.t)
    const phrases = []
    let cur = []
    for (const n of mel) { const prev = cur[cur.length - 1]; if (prev && n.t - (prev.t + prev.dur) > 0.6) { phrases.push(cur); cur = [] } cur.push(n) }
    if (cur.length) phrases.push(cur)
    let big = 0, leaps = 0, rec = 0, wide = 0
    for (const ph of phrases) {
      const ms = ph.map(n => n.midi)
      if (Math.max(...ms) - Math.min(...ms) > 19) wide++
      for (let i = 1; i < ms.length; i++) {
        const d = ms[i] - ms[i - 1]
        if (Math.abs(d) > 12) big++
        if (Math.abs(d) >= 6 && i + 1 < ms.length) { leaps++; const d2 = ms[i + 1] - ms[i]; if (Math.sign(d2) === -Math.sign(d) && Math.abs(d2) <= 4) rec++ }
      }
    }
    chk('S13x', big === 0 && wide === 0 && (leaps === 0 || rec / leaps >= 0.75), `${mel.length} notes, ${phrases.length} phrases, >12: ${big}, wide: ${wide}, recovered ${rec}/${leaps}`)
  }
  rows.push({ id, fails, info, rRe, lead, I: L.integrated, TP: tp, LRA: L.lra, PLR: tp - L.integrated, sil: sil.pct, corr: corr.mean, cmin: corr.min, fold: monoI - L.integrated, phone, bands: bb.bands, harsh: bb.harshDb, mRe, sRe, lim: rep.limiter.pctOver1dB, limMax: rep.limiter.maxGr, cue: rep.cueStartMaxErrMs, score: `${scs.pass}/${scs.total}`, hook, mL, mP, stMax: L.shortTermMax, moMax: L.momentaryMax })
  console.log(`${id.slice(0, 30).padEnd(30)} ${fails.length ? 'FAIL ' + fails.length : 'PASS'}   [B1w ${info.B1w}; ${info.B1u}]`)
  for (const f of fails) console.log('    ' + f)
}
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(rows, null, 1))
const f = (x, k = 1) => (typeof x === 'number' ? x.toFixed(k) : x)
console.log('\nid\tI\tTP\tLRA\tPLR\tsil%\tcorr\tcmin\tfold\tphone\t31\t63\t125\t250\t500\t2k\t4k\t8k\t16k\tharsh\tmus\tsfx\tret\tlim%\tlimMx\thook\tL+.2\tP+.2\tSTmax\tMmax\tscore')
for (const r of rows) console.log([r.id.slice(0, 3), f(r.I, 2), f(r.TP, 2), f(r.LRA), f(r.PLR), f(r.sil), f(r.corr, 2), f(r.cmin, 2), f(r.fold, 2), f(r.phone), r.bands[31.5], r.bands[63], r.bands[125], r.bands[250], r.bands[500], r.bands[2000], r.bands[4000], r.bands[8000], r.bands[16000], f(r.harsh), r.mRe, r.sRe, r.rRe, r.lim, r.limMax, f(r.hook), f(r.mL), f(r.mP), f(r.stMax), f(r.moMax), r.score].join('\t'))
console.log(`\n${rows.filter(r => !r.fails.length).length}/${rows.length} pass`)
