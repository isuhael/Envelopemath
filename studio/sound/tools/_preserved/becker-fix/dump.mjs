// per-spec dump for the offline level optimiser: per instrument (as rendered, with its automation; tilt offset noted)
// the octave-band powers over [0, base] (pre-duck), its K-weighted energy and 500-1200 Hz power in the BUILD; the SFX
// and returns stems' octave bands; the music stem's loudness. usage: node dump.mjs <id> > out.json
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
const out = { id: id.slice(0, 3), tilt: mix.tl.becker.tilt.tilt, trim: mix.tl.becker.music.trim }
const f = b => masterFilters(b)
out.mixBands = bands(f(mix.sum)); out.sfxBands = bands(f(mix.stems.sfx)); out.retBands = bands(f(mix.stems.returns)); out.musicBands = bands(f(mix.stems.music))
out.musicI = loudness(f(mix.stems.music)).integrated; out.sfxI = loudness(f(mix.stems.sfx)).integrated; out.mixI = loudness(f(mix.sum)).integrated
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
const md = evalDb(comp.automation.musicDb, N + SR)
const sec = tl.section('BUILD')
out.inst = {}
const totB = new Array(10).fill(0)
for (const [inst, b] of Object.entries(buses)) {
  const ga = comp.automation.gain && comp.automation.gain[inst]
  const g = ga ? evalDb(ga, N + SR) : null
  const onLogo = /R$/.test(inst)
  for (let i = 0; i < b.L.length; i++) { const x = (g ? g[i] : 1) * (onLogo ? 1 : md[i]); b.L[i] *= x; b.R[i] *= x }
  const r = { tiltOff: ga ? ga[0].db : 0, bands: bands(b) }
  r.bands.forEach((x, k) => { totB[k] += x })
  if (sec) {
    const i0 = nS(sec.t0), i1 = nS(sec.t1), sl = { L: b.L.slice(i0, i1), R: b.R.slice(i0, i1) }
    // K-weighted mean energy (ungated) via loudness of the slice: use momentary blocks power mean
    const m = loudness(sl).momentary
    let p = 0, n = 0; for (let h = 3; h < m.length; h++) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) }
    r.buildK = n ? p / n : 0
    const x = { L: Float32Array.from(sl.L), R: Float32Array.from(sl.R) }
    for (const [t, fq] of [['hp', 500], ['hp', 500], ['lp', 1200], ['lp', 1200]]) D.filter(x, t, fq, { q: 0.7071 })
    let s = 0; for (let i = 0; i < x.L.length; i++) s += x.L[i] ** 2 + x.R[i] ** 2
    r.build5_12 = s / Math.max(1, x.L.length)
  }
  out.inst[inst] = r
}
// scale factor between the instrument sum (pre glue/duck) and the music stem in the 1 kHz band
out.instScale = out.musicBands[5] / Math.max(1e-30, totB[5] - (out.inst.logo || 0))
console.log(JSON.stringify(out))
