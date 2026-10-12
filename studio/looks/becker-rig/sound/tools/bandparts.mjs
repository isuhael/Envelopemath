#!/usr/bin/env node
// Where each §9.2 octave's energy comes from, for one Becker teaser: the mix, its music / SFX / returns stems and every
// instrument (pre glue and duck, with musicDb and its automation, scaled to the music.dry stem in the 1 kHz octave), in
// dB re the mix's 1 kHz octave over [0, base]. The first thing to run when a BANDS check fails.
// usage (from studio/): node looks/becker-rig/sound/tools/bandparts.mjs <id prefix> [--cues cues.json]
import { loadPack, renderMix, masterFilters } from '../../../../src/sound/engine.mjs'
import { buildTimeline } from '../../../../src/sound/timeline.mjs'
import * as D from '../../../../src/sound/dsp.mjs'
import * as Th from '../../../../src/sound/theory.mjs'
import { instrumentBuses } from '../../../../sound/checks/looks/becker-rig.mjs'
import { args, beckerRecords, octavePowers, BANDS, SR } from './common.mjs'

const { prefixes, flags } = args()
const recs = beckerRecords({ prefixes, cues: flags.cues })
if (recs.length !== 1) { console.error(`name one Becker teaser (matched ${recs.length})`); process.exit(2) }
const rec = recs[0]
const pack = await loadPack('becker-rig')
const mix = renderMix(rec, pack, {})
const N = Math.round(rec.base * SR)
const bands = b => octavePowers(b, N)
const sum = masterFilters(mix.sum)
const ref = bands(sum)[5]
const row = (name, b) => console.log(name.padEnd(10), bands(b).map(x => (10 * Math.log10(x / ref + 1e-30)).toFixed(1).padStart(6)).join(''))
console.log(rec.id, '\n'.padEnd(11), BANDS.map(f => String(f).padStart(6)).join(''))
row('MIX', sum)
for (const k of ['music', 'sfx', 'returns']) row(k, masterFilters(mix.stems[k]))
const tl = buildTimeline(rec, pack, {})
tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
const comp = pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
const buses = instrumentBuses(tl, comp, pack, { t1: rec.base, n: N + SR })
// scale the instruments to the music.dry stem (glue and bus gain are common): the 1 kHz octave ratio
const tot = D.stereo(N + SR)
for (const b of Object.values(buses)) D.addAt(tot, b, 0, 1)
const k = bands(masterFilters(mix.stems.musicDry))[5] / bands(tot)[5]
for (const [inst, b] of Object.entries(buses).sort()) { D.scale(b, Math.sqrt(k)); row(inst, b) }
