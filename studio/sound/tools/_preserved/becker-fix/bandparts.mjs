// octave-band power per instrument and per stem, in dB re the MIX's 1 kHz octave, over [0, base]. usage: node bandparts.mjs <id>
import fs from 'node:fs'
import { loadPack, renderMix, masterFilters } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { buildTimeline } from '/home/user/Envelopemath/studio/src/sound/timeline.mjs'
import { ltas } from '/home/user/Envelopemath/studio/src/sound/audit.mjs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import * as Th from '/home/user/Envelopemath/studio/src/sound/theory.mjs'
import { loudness } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
const SR = 48000, nS = t => Math.round(t * SR)
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const id = Object.keys(recs).find(k => k.startsWith(process.argv[2]) && /becker/.test(k))
const rec = recs[id]
const pack = await loadPack('becker-rig')
const mix = renderMix(rec, pack, {})
const N = nS(rec.base), F = 8192
const BANDS = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
const bands = b => { const P = ltas(b.L, b.R, 0, Math.min(b.L.length, N), F); return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * F / SR); k <= Math.floor(f * Math.SQRT2 * F / SR); k++) x += P[k] || 0; return x }) }
const sum = masterFilters(mix.sum)
const ref = bands(sum)[5]
const row = (name, b) => { const v = bands(b); console.log(name.padEnd(10), v.map(x => (10 * Math.log10(x / ref + 1e-30)).toFixed(1).padStart(6)).join('')) }
console.log(id, '\n'.padEnd(11), BANDS.map(f => String(f).padStart(6)).join(''))
row('MIX', sum)
for (const k of ['music', 'sfx', 'returns']) row(k, masterFilters(mix.stems[k]))
// per instrument (pre-duck, with automation), rendered like the engine
const tl = buildTimeline(rec, pack, {})
tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
const comp = pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
function evalDb(points, n) { const pts = points.slice().sort((a, b) => a.t - b.t); const g = new Float32Array(n); let k = 0; for (let i = 0; i < n; i++) { const t = i / SR; while (k + 1 < pts.length && pts[k + 1].t <= t) k++; let db; if (t <= pts[0].t) db = pts[0].db; else if (k + 1 >= pts.length) db = pts[pts.length - 1].db; else { const a = pts[k], b = pts[k + 1]; db = a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t) } g[i] = Math.pow(10, db / 20) } return g }
const buses = {}, count = {}
for (const ev of [...comp.notes, ...comp.drums].sort((a, b) => a.t - b.t)) {
  const fn = pack.instruments[ev.inst]; if (!fn) continue
  const k = count[ev.inst] || 0; count[ev.inst] = k + 1
  if (ev.t >= rec.base) continue
  const b = D.toStereo(fn(ev, { tl, ev, rng: tl.stream(`noise:${ev.inst}:${k}`), bpm: tl.bpmAt(ev.t), beatLen: tl.beatLen(ev.t), chordAt: tl.chordAt, keyAt: tl.keyAt, k, D, T: Th }), ev.pan || 0)
  const bus = buses[ev.inst] || (buses[ev.inst] = D.stereo(N + SR))
  D.addAt(bus, b, nS(ev.t), D.dbToGain(pack.mix.levels[ev.inst] ?? 0))
}
// scale instruments to the music.dry stem's level (glue and bus gain are common): use the ratio of music.dry to the sum
const md = evalDb(comp.automation.musicDb, N + SR)
const tot = D.stereo(N + SR)
for (const [inst, b] of Object.entries(buses)) {
  const ga = comp.automation.gain && comp.automation.gain[inst]
  const g = ga ? evalDb(ga, N + SR) : null
  const onLogo = /R$/.test(inst)
  for (let i = 0; i < b.L.length; i++) { const x = (g ? g[i] : 1) * (onLogo ? 1 : md[i]); b.L[i] *= x; b.R[i] *= x; tot.L[i] += b.L[i]; tot.R[i] += b.R[i] }
}
const dryB = bands(masterFilters(mix.stems.musicDry)), totB = bands(tot)
const k = dryB[5] / totB[5]
for (const [inst, b] of Object.entries(buses).sort()) { for (const x of [b.L, b.R]) for (let i = 0; i < x.length; i++) x[i] *= Math.sqrt(k); row(inst, b) }
