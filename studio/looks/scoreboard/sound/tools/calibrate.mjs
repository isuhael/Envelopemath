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
//   LOGO_PRE  the sting's momentary loudness at L + 0.2, pre-master, at scale 1
//   OPEN_FIT  the delivered short-term loudness at 3 s minus compose()'s prediction (the opening lift's model leaves out
//             the returns, the ducks and the glue); it adds to the current value
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
import { planFor } from '../sfx.mjs'
import { curveFor, evalDb } from '../energy.mjs'
import { OFF_EFF } from '../balance.mjs'
import { OPENING } from '../compose.mjs'
import { CAL } from '../cal.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const STUDIO = path.resolve(HERE, '..', '..', '..', '..')
const FIXTURE = path.join(STUDIO, 'test', 'fixtures', 'cues.json')
// arguments: <dir> --cues <file> [--skip a,b] [--write]; --name=value works too, and an unknown flag is an error
const USAGE = 'usage: node looks/scoreboard/sound/tools/calibrate.mjs <render dir> --cues <cues.json> [--skip <id prefixes,...>] [--write]'
const argv = process.argv.slice(2), opt = { write: false, cues: null, skip: '' }, pos = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i], eq = a.indexOf('='), k = a.startsWith('--') ? a.slice(2, eq > 0 ? eq : undefined) : null
  if (!k) { pos.push(a); continue }
  if (k === 'help' || k === 'h') { console.error(USAGE); process.exit(0) }
  if (k === 'write' && eq < 0) { opt.write = true; continue }
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
const bedm = {}, fits = [], gms = [], logos = [], opens = []
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
    const m = loudness(mix).momentary[Math.round((sc.anchors.L + 0.2) / 0.1) - 1]
    logos.push(m - G - 20 * Math.log10(n4.vel))
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
  // GM_PLAN: master gain + the plan's music estimate (made with the calibration loaded now: run twice after a change)
  gmPlan.push(f.G + f.plan.M)
}
const sd = a => { const m = mean(a); return Math.sqrt(mean(a.map(x => (x - m) ** 2))) }
const cal = { BEDS, OFF_EFF, OPEN_FIT: opens.length ? +((CAL.OPEN_FIT ?? 0) + mean(opens)).toFixed(2) : CAL.OPEN_FIT, M_FIT: +mean(fits.map(f => f.resid)).toFixed(2), GM: +mean(gms).toFixed(2), GM_PLAN: gmPlan.length ? +mean(gmPlan).toFixed(2) : undefined, LOGO_PRE: logos.length ? +mean(logos).toFixed(2) : null,
  stats: { M_FIT_sd: +sd(fits.map(f => f.resid)).toFixed(2), GM_sd: +sd(gms).toFixed(2), GM_PLAN_sd: gmPlan.length ? +sd(gmPlan).toFixed(2) : null, LOGO_PRE_sd: logos.length ? +sd(logos).toFixed(2) : null, OPEN_FIT_sd: opens.length ? +sd(opens).toFixed(2) : null, specs: ids.length, from: `calibrate.mjs on an audio --stems render of ${ids.length} teasers, cue records ${cuesFile === FIXTURE ? 'test/fixtures/cues.json' : 'from a fresh dump (node src/cli.mjs cues)'}` } }
console.log(JSON.stringify(cal, null, 1))
if (opt.write) {
  // keep any table entry this render had no data for
  const f = path.join(HERE, '..', 'calibration.json')
  const old = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : {}
  for (const k of ['BEDS']) for (const [s, o] of Object.entries(old[k] || {})) for (const [E, v] of Object.entries(o)) if (!(cal[k][s] && cal[k][s][E] != null)) (cal[k][s] = cal[k][s] || {})[E] = v
  fs.writeFileSync(f, JSON.stringify(cal, null, 1) + '\n')
  console.error(`wrote ${f}`)
}
