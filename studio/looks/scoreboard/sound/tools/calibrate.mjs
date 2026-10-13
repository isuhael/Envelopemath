#!/usr/bin/env node
// Calibration for the pack's models (the SFX fader's music model in balance.mjs, the logo level in logo.mjs), measured
// from a full render of the 15 Scoreboard teasers with stems (the B3 clearance needs no table: clearance.mjs renders
// the bed at every cue):
//   node src/cli.mjs audio specs/*-scoreboard-*.json --out <dir> --stems --no-check
//   node looks/scoreboard/sound/tools/calibrate.mjs <dir> --cues <cues.json> [--write]   (run it twice: GM_PLAN uses the tables)
// See tools/README.md for what each value is, when it goes stale and the whole refit procedure.
// It prints (and with --write stores in calibration.json, which the pack reads at load time):
//   BEDS      the music's power over whole sections, from music.dry (before the event duck), pre-master, by section and
//             energy, at the bus's 0 dB (the energy curve of energy.mjs taken out); teasers whose bed gave way (a plan
//             offset) are left out
//   M_FIT     music stem - (BEDS + the energy curve, under the ducks, + OFF_EFF x the offset), mean over the specs
//   GM        master gain + music stem (pre-master): the master gain follows as GM - M
//   GM_PLAN   master gain + the plan's own music estimate (what logo.mjs uses)
//   LOGO_PRE  the sting's momentary loudness in the 400 ms window ending exactly at L + 0.2, pre-master, at scale 1
//   OPEN_FIT  the delivered short-term loudness at 3 s minus compose()'s prediction (the opening lift's model leaves out
//             the returns, the ducks and the glue); it adds to the current value
//   GM_SFX    the cues' weight in the master gain model (logo.mjs gainEst), fitted with GM_PLAN
//   LOGO_SLOPE the sting's rise at L + 0.2 (dB/s): B8 reads the meter's 100 ms hop nearest L + 0.2, and logo.mjs's meter
//             guard predicts that reading from it
//   BAND_REF  the band model's cue weight (bands.mjs predict: the cues and their returns against the music, for the
//             SFX bus compressor and HP): w, fitted on the delivered 63-250 Hz octaves of every teaser and used on every
//             octave (a separate top-octave weight, w16, had no fixed point: see below)
//   BAND_FIT  the band model's residual per octave (delivered minus predicted, dB re 1 kHz, mean over the teasers)
//   BAND_SD   the residual's spread per octave: the band guard aims BAND_MARGIN + BAND_K x BAND_SD inside each window
//   PAY_LOSS, PAY_HIT  the payoff's delivered momentary loudness in B8's frame against the band model's (payoffPre)
//             plus the master gain: what a payoff loses (mean), and how much more when a hit marks P (the SFX bus
//             compressor and the limiter work on it); logo.mjs aims the sting inside [-13, the payoff]
//   RANGE     the range model (bands.mjs rangeEst, energy.mjs RANGE): body, the delivered body's 100 ms blocks against
//             the band model's at the master gain (median offset, mean over the teasers); card, the card's blocks against
//             the sting's true level at L + 0.2 (mean per block); fit and sd, the delivered A3 against rangeEst as
//             compose() runs it (mean residual and spread): the DROP's range lift aims RANGE.margin + RANGE.k x sd
//             inside A3's floor
// --per prints each teaser's residuals as well.
// Re-run after any change to the arrangement or the levels; the tables only describe this pack's own music.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { readWav } from '../../../../src/sound/wav.mjs'
import { decodeAudio } from '../../../../src/sound/ffmpeg.mjs'
import { loudness } from '../../../../src/sound/loudness.mjs'
import * as D from '../../../../src/sound/dsp.mjs'
import * as Th from '../../../../src/sound/theory.mjs'
import { buildTimeline } from '../../../../src/sound/timeline.mjs'
import { normalizePack } from '../../../../src/sound/engine.mjs'
import * as PACK from '../../sound.mjs'
import { planFor, sfxBodyPower, leversFor } from '../sfx.mjs'
import { modelFor, predict, payoffPre, octaves as octOf, OCT, dryBlocks, mixBlocks, rangeEst } from '../bands.mjs'
import { curveFor, evalDb, b7Halves } from '../energy.mjs'
import { OFF_EFF } from '../balance.mjs'
import { OPENING } from '../compose.mjs'
import { CAL } from '../cal.mjs'
import { b8Frame, hitAtP, gainEst, logoPlan } from '../logo.mjs'
import { kfilter } from '../balance.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const STUDIO = path.resolve(HERE, '..', '..', '..', '..')
const FIXTURE = path.join(STUDIO, 'test', 'fixtures', 'cues.json')
// arguments: <dir> --cues <file> [--skip a,b] [--write]; --name=value works too, and an unknown flag is an error
const USAGE = 'usage: node looks/scoreboard/sound/tools/calibrate.mjs <render dir> --cues <cues.json> [--skip <id prefixes,...>] [--per] [--write]'
const argv = process.argv.slice(2), opt = { write: false, per: false, cues: null, skip: '' }, pos = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i], eq = a.indexOf('='), k = a.startsWith('--') ? a.slice(2, eq > 0 ? eq : undefined) : null
  if (!k) { pos.push(a); continue }
  if (k === 'help' || k === 'h') { console.error(USAGE); process.exit(0) }
  if (k === 'write' && eq < 0) { opt.write = true; continue }
  if (k === 'per' && eq < 0) { opt.per = true; continue }
  if (k !== 'cues' && k !== 'skip') { console.error(`unknown flag ${a}\n${USAGE}`); process.exit(2) }
  const v = eq > 0 ? a.slice(eq + 1) : argv[i + 1] != null && !argv[i + 1].startsWith('--') ? argv[++i] : null
  if (v == null || v === '') { console.error(`${a} needs a value\n${USAGE}`); process.exit(2) }
  opt[k] = v
}
if (pos.length !== 1 || !opt.cues) { console.error(`${pos.length !== 1 ? 'name one render directory' : '--cues is required: the records the render was made from'}\n${USAGE}`); process.exit(2) }
const dir = path.resolve(pos[0])
const SR = 48000
const B3 = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])
const cuesFile = path.resolve(opt.cues)
const recs = JSON.parse(fs.readFileSync(cuesFile, 'utf8'))
const cueRec = id => recs[id] || null
const SKIP = opt.skip.split(',').filter(Boolean)
const ids = fs.readdirSync(dir).filter(f => f.endsWith('.score.json')).map(f => f.replace('.score.json', '')).filter(id => !SKIP.some(p => id.startsWith(p))).sort()
const pack = normalizePack(PACK, 'scoreboard')
const bedm = {}, fits = [], gms = [], logos = [], opens = [], slopes = [], bands = [], pays = [], b7s = [], ranges = []
const push = (o, sec, E, v) => { ((o[sec] = o[sec] || {})[E] = o[sec][E] || []).push(v) }
const secAt = (sc, t) => (sc.sections.find(s => t >= s.t0 - 1e-6 && t < s.t1 - 1e-6) || {}).name
for (const id of ids) {
  const sc = JSON.parse(fs.readFileSync(path.join(dir, `${id}.score.json`), 'utf8'))
  const rep = JSON.parse(fs.readFileSync(path.join(dir, `${id}.report.json`), 'utf8'))
  const G = rep.master.gainDb
  const mu = readWav(path.join(dir, 'stems', `${id}.music.dry.wav`))
  const barAt = t => sc.bars.filter(b => b.t <= t + 1e-6).pop()
  const pw = (t0, t1) => { const i0 = Math.round(t0 * SR), i1 = Math.round(t1 * SR); let s = 0; for (let i = i0; i < i1; i++) s += mu.L[i] ** 2 + mu.R[i] ** 2; return s / (2 * Math.max(1, i1 - i0)) / 10 ** (G / 10) }
  // the plan as the render saw it (same calibration loaded: calibrate right after a render)
  const rec = cueRec(id)
  if (!rec) { console.error(`${id}: no cue record, skipped`); continue }
  const tl = buildTimeline(rec, pack, { overrides: {} })
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }))
  // compose first: the fader's plan reads the clearance, which reads the bed compose() hands it
  pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
  const plan = planFor(tl), curve = curveFor(tl)
  const gave = plan.offset < -0.01
  if (!gave) {
    const K = Math.floor(sc.base * 100)
    for (let k = 0; k < K; k++) {
      const t = k / 100, b = barAt(t), sec = secAt(sc, t + 1e-6) || b.section
      push(bedm, sec, b.energy, pw(t, t + 0.01) / 10 ** (evalDb(curve, t + 0.005) / 10))
    }
  }
  fits.push({ id, sc, M: rep.stems.music.lufs - G, G, plan, curve, tl })
  const op = OPENING.get(tl)
  if (op && op.pred != null) {
    const m4o = path.join(dir, `${id}.m4a`)
    const mixO = fs.existsSync(m4o) ? decodeAudio(m4o) : readWav(path.join(dir, `${id}.wav`))
    opens.push(loudness(mixO).shortTerm[29] - op.pred)
  }
  const n4 = sc.notes.find(x => x.inst === 'logoBrass' && x.midi === 81)
  if (n4 && sc.anchors.L != null) {
    const m4a = path.join(dir, `${id}.m4a`)
    const mix = fs.existsSync(m4a) ? decodeAudio(m4a) : readWav(path.join(dir, `${id}.wav`))   // B8 is judged on the delivery
    const Lt = sc.anchors.L, mHop = loudness(mix).momentary[Math.round((Lt + 0.2) / 0.1) - 1]
    // the sting's momentary loudness in the 400 ms window ending exactly at L + 0.2 (BS.1770: K-weighted, the channels
    // summed), and its slope there (windows ending 50 ms either side, dB/s: the meter guard of logo.mjs reads it)
    const kl = kfilter(mix.L), kr = kfilter(mix.R)
    const win = te => { const i1 = Math.round(te * SR), i0 = i1 - Math.round(0.4 * SR); let e = 0; for (let i = i0; i < i1; i++) e += kl[i] * kl[i] + kr[i] * kr[i]; return -0.691 + 10 * Math.log10(e / (i1 - i0)) }
    slopes.push((win(Lt + 0.25) - win(Lt + 0.15)) / 0.1)
    logos.push({ id, m: win(Lt + 0.2) - G - 20 * Math.log10(n4.vel), hop: mHop - win(Lt + 0.2), d: b8Frame(Lt) })
    // the payoff in its B8 frame against the band model's (pre-master) plus this render's master gain
    const P = sc.anchors.P.t, mP = loudness(mix).momentary[Math.round((P + 0.2) / 0.1) - 1], pre = payoffPre(modelFor(tl), leversFor(tl) || {})
    if (pre != null && Number.isFinite(mP)) pays.push({ id, r: mP - (pre + G), hit: hitAtP(tl) })
  }
  fits[fits.length - 1].Su = sfxBodyPower(tl)
  // what the band guard's levers and the DROP's range lift add to the plan's music model (logo.mjs gainEst counts both)
  fits[fits.length - 1].dM = ((leversFor(tl) || {}).dM || 0) + (plan.dMrange || 0)
  // the delivered octaves over [0, base] (as the BANDS check reads them) against the band model compose() kept
  const bm = modelFor(tl)
  // the range model (bands.mjs rangeEst, energy.mjs RANGE): the delivered body's 100 ms blocks against the band model's
  // at this render's master gain (their median offset), the card's blocks against the sting's true level at L + 0.2
  // (the card is the same in every teaser but its level), and the delivered loudness range for the residual
  if (bm && bm.mix && sc.anchors.L != null) {
    const dl = decodeAudio(path.join(dir, `${id}.m4a`)), kl = kfilter(dl.L), kr = kfilter(dl.R)
    const blk = h => { let e = 0; for (let i = h * 4800; i < (h + 1) * 4800; i++) e += kl[i] * kl[i] + kr[i] * kr[i]; return 10 * Math.log10(e / 4800 + 1e-30) }
    const ew = te => { const i1 = Math.round(te * SR), i0 = i1 - Math.round(0.4 * SR); let e = 0; for (let i = i0; i < i1; i++) e += kl[i] * kl[i] + kr[i] * kr[i]; return -0.691 + 10 * Math.log10(e / (i1 - i0)) }
    const mb = mixBlocks(bm, leversFor(tl) || {}), H = mb.length
    const offs = []
    for (let h = 0; h < H; h++) offs.push(blk(h) - (10 * Math.log10(mb[h] + 1e-30) + G))
    offs.sort((a, b) => a - b)
    const sting = ew(sc.anchors.L + 0.2), card = []
    for (let h = H; h < Math.floor(dl.L.length / 4800); h++) card.push(blk(h) - 0.691 - sting)
    ranges.push({ id, tl, m: bm, lv: leversFor(tl) || {}, body: offs[offs.length >> 1], card, A3: loudness(dl).lra, G: gainEst(tl), aim: logoPlan(tl).aim, dur: tl.duration })
  }
  if (bm) {
    const m4b = path.join(dir, `${id}.m4a`)
    const dl = fs.existsSync(m4b) ? decodeAudio(m4b) : readWav(path.join(dir, `${id}.wav`))
    const o = octOf(dl, Math.round(Math.min(sc.base, dl.L.length / SR) * SR)), ref = o[OCT.indexOf(1000)]
    bands.push({ id, m: bm, lv: leversFor(tl) || {}, dlv: Object.fromEntries(OCT.map((f, i) => [f, 10 * Math.log10(o[i] / ref)])) })
    // B7's BUILD halves on the music.dry stem (as the harness reads them) against the band model's prediction
    const pr7 = b7Halves(tl, dryBlocks(bm, leversFor(tl) || {}), 0)
    if (pr7 && pr7.edge != null) {
      const ld = loudness(mu), B = sc.sections.find(x => x.name === 'BUILD'), mid = (B.t0 + B.t1) / 2
      const st = t => { const h = Math.round(t / 0.1) - 1; return h >= 29 && h < ld.shortTerm.length && Number.isFinite(ld.shortTerm[h]) ? ld.shortTerm[h] : null }
      const mST = (a, b, c) => { const v = []; for (let t = a; t <= b + 1e-9; t += 0.1) { const y = st(c ? Math.min(sc.base, t + 1.5) : t); if (y != null) v.push(y) } return v.length ? v.reduce((x, y) => x + y, 0) / v.length : null }
      const me = { edge: mST(mid, B.t1, false) - mST(B.t0, mid, false), centred: mST(mid, B.t1, true) - mST(B.t0, mid, true) }
      b7s.push({ id, m: me, p: pr7 })
    }
  }
}
const mean = a => a.reduce((x, y) => x + y, 0) / a.length
const BEDS = {}
for (const [s, o] of Object.entries(bedm)) for (const [E, a] of Object.entries(o)) (BEDS[s] = BEDS[s] || {})[E] = +(10 * Math.log10(mean(a))).toFixed(1)
// the music model's residual with these tables, each score's own duck curve, the energy curve and the offset
const gmPlan = []
for (const f of fits) {
  const sc = f.sc
  let e = 0, n = 0
  for (let k = 0; k < Math.floor(sc.base * 100); k++) {
    const t = k / 100, b = sc.bars.filter(x => x.t <= t + 1e-6).pop(), sec = secAt(sc, t + 1e-6) || b.section
    const v = (BEDS[sec] && (BEDS[sec][b.energy] ?? Object.values(BEDS[sec])[0])) ?? -18
    e += 10 ** ((v + evalDb(f.curve, t + 0.005) + (sc.duck.db[k] || 0)) / 10); n++
  }
  f.resid = f.M - (10 * Math.log10(e / n) + OFF_EFF * Math.min(0, f.plan.offset))
  gms.push(f.G + f.M)
}
// GM_PLAN and GM_SFX: the master gain model of logo.mjs (gainEst), G = GM_PLAN - 10 log10(10^(M/10) + GM_SFX 10^(Su/10)),
// M the plan's music estimate, Su the cues' power over the body (made with the calibration loaded now: run twice)
const gmOf = (f, k) => f.G + 10 * Math.log10(Math.pow(10, (f.plan.M + f.dM) / 10) + k * Math.pow(10, f.Su / 10))
let gmFit = null
for (let k = 0; k <= 3 + 1e-9; k += 0.01) {
  const v = fits.map(f => gmOf(f, k)), m = mean(v), s = Math.sqrt(mean(v.map(x => (x - m) ** 2)))
  if (!gmFit || s < gmFit.sd - 1e-9) gmFit = { k: +k.toFixed(2), m, sd: s }
}
for (const f of fits) gmPlan.push(gmOf(f, gmFit.k))
const LOGO_SLOPE = slopes.length ? mean(slopes) : (CAL.LOGO_SLOPE ?? 0)
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))) }
// BAND_REF and BAND_FIT: the least spread of the residuals (delivered minus predicted) over the low octaves the band
// guard watches, on a grid of the cues' weight w; the per-octave means are the residuals (BAND_FIT), their spreads
// BAND_SD. One weight serves every octave (bands.mjs predict): the SFX bus compressor that w stands for is broadband.
// Until 2026-10-13 the 8 and 16 kHz octaves had a weight of their own, w16, fitted on the 16 kHz octave alone, and it
// had no fixed point: the cues' share of the top octaves is about the same in every teaser, so a change of w16 moves
// every teaser's prediction alike, BAND_FIT 8000/16000 absorb it, and the 16 kHz spread hardly changes (its least-spread
// value wandered 0.81-1.13 from round to round, BAND_FIT 8000 by 0.36 dB, more than its own spread). --per prints what
// a free w16 would gain on the 16 kHz spread.
const WATCH = [63, 125, 250]
let bandFit = null
if (bands.length) {
  for (let w = 0.3; w <= 2 + 1e-9; w += 0.01) {
    const R = { w }, pr = bands.map(x => predict(x.m, x.lv, R, {}))
    let tot = 0
    for (const f of WATCH) tot += sd(bands.map((x, i) => x.dlv[f] - pr[i][f])) ** 2
    if (!bandFit || tot < bandFit.tot - 1e-12) bandFit = { tot, R: { w: +w.toFixed(2) } }
  }
  if (opt.per) {
    // the 16 kHz spread over a free top-octave weight (information only: the degeneracy above)
    const sd16 = w16 => { const pr = bands.map(x => predict(x.m, x.lv, { ...bandFit.R, w16 }, {})); return sd(bands.map((x, i) => x.dlv[16000] - pr[i][16000])) }
    let best = null
    for (let w16 = 0.3; w16 <= 2 + 1e-9; w16 += 0.01) { const s = sd16(w16); if (!best || s < best.s - 1e-12) best = { s, w16 } }
    const flat = []
    for (let w16 = 0.3; w16 <= 2 + 1e-9; w16 += 0.01) if (sd16(w16) <= best.s + 0.01) flat.push(w16)
    console.error(`16 kHz spread: ${sd16(bandFit.R.w).toFixed(3)} dB at w ${bandFit.R.w}; least ${best.s.toFixed(3)} at a free weight ${best.w16.toFixed(2)}; within 0.01 dB of it for ${flat[0].toFixed(2)}-${flat[flat.length - 1].toFixed(2)}`)
  }
  const pr = bands.map(x => predict(x.m, x.lv, bandFit.R, {}))
  bandFit.F = {}; bandFit.sd = {}
  for (const f of OCT) { if (f === 1000) continue; const r = bands.map((x, i) => x.dlv[f] - pr[i][f]); bandFit.F[f] = +mean(r).toFixed(2); bandFit.sd[f] = +sd(r).toFixed(2) }
}
// PAY_LOSS, PAY_HIT: delivered - (payoffPre + G) = -PAY_LOSS - PAY_HIT x [a hit at P]
let payFit = null
const plain = pays.filter(x => !x.hit), hits = pays.filter(x => x.hit)
if (plain.length && hits.length) {
  payFit = { loss: -mean(plain.map(x => x.r)), hit: -mean(hits.map(x => x.r)) + mean(plain.map(x => x.r)) }
  for (const x of pays) x.e = x.r + payFit.loss + (x.hit ? payFit.hit : 0)
}
if (opt.per) {
  console.error('per teaser: GM_PLAN residual (dB), LOGO_PRE residual (and what the meter hop adds to it), PAY residual, band residuals 63/125/250/16k (dB), B7 BUILD halves measured (predicted by the band model)')
  const gm = mean(gmPlan)
  for (const [i, f] of fits.entries()) {
    const lg = logos.find(x => x.id === f.id), py = pays.find(x => x.id === f.id), bd = bands.find(x => x.id === f.id)
    const pr = bd && bandFit ? predict(bd.m, bd.lv, bandFit.R, bandFit.F) : null
    const b7 = b7s.find(x => x.id === f.id)
    console.error(f.id.slice(0, 3), (gmPlan[i] - gm).toFixed(2), lg ? `${(lg.m - mean(logos.map(x => x.m))).toFixed(2)} (hop ${lg.hop >= 0 ? '+' : ''}${lg.hop.toFixed(2)} at ${lg.d >= 0 ? '+' : ''}${(lg.d * 1000).toFixed(0)} ms)` : '-', py && py.e != null ? py.e.toFixed(2) : '-', pr ? [63, 125, 250, 16000].map(o => (bd.dlv[o] - pr[o]).toFixed(2)).join(' ') : '-', b7 ? `B7 halves edge ${b7.m.edge.toFixed(2)} (pred ${b7.p.edge.toFixed(2)}) centred ${b7.m.centred.toFixed(2)} (pred ${b7.p.centred.toFixed(2)})` : '')
  }
}
// RANGE: the body's offset and the card's template (means), then the residual of the delivered A3 against rangeEst as
// compose() runs it (the master gain estimate, the sting's aim), its mean (fit) and spread (sd)
let rangeFit = null
if (ranges.length) {
  const K = Math.min(...ranges.map(x => x.card.length))
  const R0 = { body: +mean(ranges.map(x => x.body)).toFixed(2), card: Array.from({ length: K }, (_, k) => +mean(ranges.map(x => x.card[k])).toFixed(2)), fit: 0 }
  const keep = CAL.RANGE
  CAL.RANGE = R0
  const res = ranges.map(x => { const p = rangeEst(x.m, x.lv, { gainDb: x.G, sting: x.aim, durationS: x.dur }); return { id: x.id, r: p == null ? null : x.A3 - p, A3: x.A3 } }).filter(x => x.r != null)
  CAL.RANGE = keep
  const f = mean(res.map(x => x.r))
  rangeFit = { ...R0, fit: +f.toFixed(2), sd: +Math.sqrt(mean(res.map(x => (x.r - f) ** 2))).toFixed(2) }
  if (opt.per) for (const x of res) console.error(`${x.id.slice(0, 3)} A3 ${x.A3.toFixed(2)} range residual ${(x.r - f).toFixed(2)}`)
}
const cal = { BEDS, OFF_EFF, OPEN_FIT: opens.length ? +((CAL.OPEN_FIT ?? 0) + mean(opens)).toFixed(2) : CAL.OPEN_FIT, M_FIT: +mean(fits.map(f => f.resid)).toFixed(2), GM: +mean(gms).toFixed(2), GM_PLAN: gmPlan.length ? +mean(gmPlan).toFixed(2) : undefined, GM_SFX: gmFit ? gmFit.k : (CAL.GM_SFX ?? 0), LOGO_PRE: logos.length ? +mean(logos.map(x => x.m)).toFixed(2) : null, LOGO_SLOPE: +LOGO_SLOPE.toFixed(1),
  BAND_REF: bandFit ? bandFit.R : CAL.BAND_REF, BAND_FIT: bandFit ? bandFit.F : CAL.BAND_FIT, BAND_SD: bandFit ? bandFit.sd : CAL.BAND_SD, PAY_LOSS: payFit ? +payFit.loss.toFixed(2) : CAL.PAY_LOSS, PAY_HIT: payFit ? +payFit.hit.toFixed(2) : CAL.PAY_HIT, RANGE: rangeFit || CAL.RANGE,
  stats: { PAY_sd: payFit ? +sd(pays.map(x => x.e)).toFixed(2) : null, M_FIT_sd: +sd(fits.map(f => f.resid)).toFixed(2), GM_sd: +sd(gms).toFixed(2), GM_PLAN_sd: gmPlan.length ? +sd(gmPlan).toFixed(2) : null, LOGO_PRE_sd: logos.length ? +sd(logos.map(x => x.m)).toFixed(2) : null, LOGO_SLOPE_sd: slopes.length ? +sd(slopes).toFixed(1) : null, OPEN_FIT_sd: opens.length ? +sd(opens).toFixed(2) : null, specs: ids.length, from: `calibrate.mjs on an audio --stems render of ${ids.length} teasers, cue records ${cuesFile === FIXTURE ? 'test/fixtures/cues.json' : 'from a fresh dump (node src/cli.mjs cues)'}` } }
console.log(JSON.stringify(cal, null, 1))
if (opt.write) {
  // keep any table entry this render had no data for
  const f = path.join(HERE, '..', 'calibration.json')
  const old = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}
  for (const k of ['BEDS']) for (const [s, o] of Object.entries(old[k] || {})) for (const [E, v] of Object.entries(o)) if (!(cal[k][s] && cal[k][s][E] != null)) (cal[k][s] = cal[k][s] || {})[E] = v
  fs.writeFileSync(f, JSON.stringify(cal, null, 1) + '\n')
  console.error(`wrote ${f}`)
}
