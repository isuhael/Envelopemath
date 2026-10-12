#!/usr/bin/env node
// The balance plan balance.mjs makes for each Becker teaser (compose() runs it): the SFX leveller (I0 before, I after the
// rides, the threshold, how many cues of each kind were ridden and by how much at most), the SFX's ungated level U, the
// tilt, the reference-octave crowding (balance.mjs CROWD) and the music plan (cost, M, Mfree, trim, predicted master
// gain, card trim). No audio is rendered: fast.
// usage (from studio/): node looks/becker-rig/sound/tools/trims.mjs [id prefixes] [--cues cues.json]
import { loadPack } from '../../../../src/sound/engine.mjs'
import { buildTimeline } from '../../../../src/sound/timeline.mjs'
import * as D from '../../../../src/sound/dsp.mjs'
import * as Th from '../../../../src/sound/theory.mjs'
import { args, beckerRecords } from './common.mjs'

const { prefixes, flags } = args()
const pack = await loadPack('becker-rig')
for (const rec of beckerRecords({ prefixes, cues: flags.cues })) {
  const tl = buildTimeline(rec, pack, {})
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
  pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
  const bk = tl.becker
  const by = {}
  for (const c of tl.cues) (by[c.kind] ||= []).push(bk.trims.get(c.i) || 0)
  console.log(rec.id.slice(0, 3), 'I0', bk.I0?.toFixed(1), 'I', bk.I?.toFixed(1), 'U', bk.U?.toFixed(1), 'thr', bk.thr, 'tilt', JSON.stringify(bk.tilt), 'crowd', bk.crowd, JSON.stringify(bk.music),
    Object.entries(by).map(([k, v]) => `${k}:${v.filter(x => x < 0).length}/${v.length} min ${Math.min(...v).toFixed(1)}`).join(' '))
}
