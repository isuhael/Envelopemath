#!/usr/bin/env node
// The level optimiser's input (opt.py), one JSON line per Becker teaser: per instrument (as rendered, with its
// automation; its tilt offset noted) the octave-band powers over [0, base] (pre-duck), its K-weighted energy and its
// 500-1200 Hz power in the BUILD; the SFX and returns stems' octave bands; the stems' loudness.
// usage (from studio/): node looks/becker-rig/sound/tools/dump.mjs [id prefixes] [--cues cues.json] > /tmp/dump.jsonl
import { loadPack, renderMix, masterFilters } from '../../../../src/sound/engine.mjs'
import { buildTimeline } from '../../../../src/sound/timeline.mjs'
import * as D from '../../../../src/sound/dsp.mjs'
import * as Th from '../../../../src/sound/theory.mjs'
import { loudness } from '../../../../src/sound/loudness.mjs'
import { instrumentBuses } from '../../../../sound/checks/looks/becker-rig.mjs'
import { args, beckerRecords, octavePowers, SR } from './common.mjs'

const { prefixes, flags } = args()
const pack = await loadPack('becker-rig')
const nS = t => Math.round(t * SR)
for (const rec of beckerRecords({ prefixes, cues: flags.cues })) {
  const mix = renderMix(rec, pack, {})
  const N = nS(rec.base)
  const bands = b => octavePowers(b, N)
  const f = b => masterFilters(b)
  const out = { id: rec.id.slice(0, 3), tilt: mix.tl.becker.tilt.tilt, trim: mix.tl.becker.music.trim }
  out.mixBands = bands(f(mix.sum)); out.sfxBands = bands(f(mix.stems.sfx)); out.retBands = bands(f(mix.stems.returns)); out.musicBands = bands(f(mix.stems.music))
  out.musicI = loudness(f(mix.stems.music)).integrated; out.sfxI = loudness(f(mix.stems.sfx)).integrated; out.mixI = loudness(f(mix.sum)).integrated
  const tl = buildTimeline(rec, pack, {})
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
  const comp = pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
  const buses = instrumentBuses(tl, comp, pack, { t1: rec.base, n: N + SR })
  const sec = tl.section('BUILD')
  out.inst = {}
  const totB = new Array(10).fill(0)
  for (const [inst, b] of Object.entries(buses)) {
    const ga = comp.automation.gain && comp.automation.gain[inst]
    const r = { tiltOff: ga ? ga[0].db : 0, bands: bands(b) }
    r.bands.forEach((x, k) => { totB[k] += x })
    if (sec) {
      const i0 = nS(sec.t0), i1 = nS(sec.t1), sl = { L: b.L.slice(i0, i1), R: b.R.slice(i0, i1) }
      // K-weighted mean energy (ungated) of the slice: the mean power of its momentary blocks
      const m = loudness(sl).momentary
      let p = 0, n = 0
      for (let h = 3; h < m.length; h++) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) }
      r.buildK = n ? p / n : 0
      const x = { L: Float32Array.from(sl.L), R: Float32Array.from(sl.R) }
      for (const [t, fq] of [['hp', 500], ['hp', 500], ['lp', 1200], ['lp', 1200]]) D.filter(x, t, fq, { q: 0.7071 })
      let s = 0
      for (let i = 0; i < x.L.length; i++) s += x.L[i] ** 2 + x.R[i] ** 2
      r.build5_12 = s / Math.max(1, x.L.length)
    }
    out.inst[inst] = r
  }
  // scale factor between the instrument sum (pre glue/duck) and the music stem in the 1 kHz band
  out.instScale = out.musicBands[5] / Math.max(1e-30, totB[5] - (out.inst.logo || 0))
  console.log(JSON.stringify(out))
}
