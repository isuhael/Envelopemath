import fs from 'node:fs'
import { loadPack } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { buildTimeline } from '/home/user/Envelopemath/studio/src/sound/timeline.mjs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import * as Th from '/home/user/Envelopemath/studio/src/sound/theory.mjs'
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const pack = await loadPack('becker-rig')
for (const id0 of process.argv.slice(2)) {
  const id = Object.keys(recs).find(k => k.startsWith(id0) && /becker/.test(k)), rec = recs[id]
  const tl = buildTimeline(rec, pack, {})
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
  pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
  const bk = tl.becker
  const by = {}
  for (const c of tl.cues) { const t = bk.trims.get(c.i) || 0; const b = by[c.kind] || (by[c.kind] = []); b.push(t) }
  console.log(id.slice(0, 3), 'I0', bk.I0?.toFixed(1), 'I', bk.I?.toFixed(1), 'U', bk.U?.toFixed(1), 'thr', bk.thr, JSON.stringify(bk.music), Object.entries(by).map(([k, v]) => `${k}:${v.filter(x => x < 0).length}/${v.length} min ${Math.min(...v).toFixed(1)}`).join(' '))
}
