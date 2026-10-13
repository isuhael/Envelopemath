#!/usr/bin/env node
// Refit balance.mjs's MODEL, step 1 of 2: render each Becker teaser with the music trim forced (default 0) and print one
// JSON line per teaser with what the model predicts and what the engine measures (pre-master, after the master filters):
//   mix   the mix's integrated loudness         M / Mu  the music stem, gated / ungated
//   U     the SFX stem, ungated                  I       the SFX stem, gated      R  the returns, ungated
//   cost  the duck cost the plan predicted       tilt    the band's tilt          Upred / Ipred  the plan's U and I
//   land  the band's loss to the landing yield (balance.mjs LAND), which the music model leaves out
//   (the plan renders every cue as the engine will, the ring budget included, so I - Ipred is the merges' loss: iBias)
// Step 2: python3 looks/becker-rig/sound/tools/fitsolve.py <the lines> (least squares; see README.md).
// usage (from studio/): node looks/becker-rig/sound/tools/fit.mjs [id prefixes] [--trim 0] [--cues cues.json] > /tmp/fit.jsonl
import { MODEL, LAND } from '../balance.mjs'
import { loadPack, renderMix, masterFilters } from '../../../../src/sound/engine.mjs'
import { loudness } from '../../../../src/sound/loudness.mjs'
import { ungated } from '../../../../sound/checks/measure.mjs'
import { args, beckerRecords } from './common.mjs'

const { prefixes, flags } = args(process.argv.slice(2), ['cues', 'trim'])
MODEL.fixedTrim = flags.trim != null ? +flags.trim : 0
const pack = await loadPack('becker-rig')
const f = b => masterFilters(b)
for (const rec of beckerRecords({ prefixes, cues: flags.cues })) {
  const t0 = Date.now()
  const mix = renderMix(rec, pack, {})
  const bk = mix.tl.becker
  console.log(JSON.stringify({
    id: rec.id.slice(0, 3), mix: loudness(f(mix.sum)).integrated, M: loudness(f(mix.stems.music)).integrated, Mu: ungated(f(mix.stems.music)),
    U: ungated(f(mix.stems.sfx)), I: loudness(f(mix.stems.sfx)).integrated, R: ungated(f(mix.stems.returns)),
    cost: bk.music.cost, tilt: bk.tilt.tilt, Upred: bk.U, Ipred: bk.I, trim: bk.music.trim,
    // the band's loss to the landing yield (balance.mjs LAND: the bass steps back, the trim does not pay it back; the plan
    // counts it in the master-gain prediction, so the music model is fitted without it)
    land: bk.land ? 10 * Math.log10(1 + LAND.bassShare * (Math.pow(10, bk.land.bassDb / 10) - 1)) : 0,
  }))
  console.error(`  ${rec.id} (${((Date.now() - t0) / 1000).toFixed(1)} s)`)
}
