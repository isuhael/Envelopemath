import fs from 'node:fs'
import { loadPack } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { buildTimeline } from '/home/user/Envelopemath/studio/src/sound/timeline.mjs'
import { renderCues } from '/home/user/Envelopemath/studio/looks/becker-rig/sound/balance.mjs'
import { ltas } from '/home/user/Envelopemath/studio/src/sound/audit.mjs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import * as T from '/home/user/Envelopemath/studio/src/sound/theory.mjs'
const SR = 48000, F = 8192
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const pack = await loadPack('becker-rig')
const BANDS = [31.5, 63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000]
for (const id0 of process.argv.slice(2)) {
  const id = Object.keys(recs).find(k => k.startsWith(id0) && /becker/.test(k)), rec = recs[id]
  const tl = buildTimeline(rec, pack, {})
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T }))
  pack.compose(tl, tl.stream('arr:compose'), { D, T })
  const r = renderCues(tl)
  const N = Math.round(rec.base * SR)
  const byK = {}
  for (const { c, b } of r) { if (c.inCard) continue; const s = byK[c.kind] || (byK[c.kind] = D.stereo(N + SR * 2)); D.addAt(s, b, Math.round(c.t * SR), c.gain * D.dbToGain(tl.becker.trims.get(c.i) || 0)) }
  const tot = D.stereo(N + SR * 2); for (const s of Object.values(byK)) D.addAt(tot, s, 0, 1)
  const bands = b => { const P = ltas(b.L, b.R, 0, N, F); return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * F / SR); k <= Math.floor(f * Math.SQRT2 * F / SR); k++) x += P[k] || 0; return x }) }
  const ref = bands(tot)[5]
  console.log(id.slice(0, 3), 'SFX bands re SFX 1k')
  for (const [k, s] of [['ALL', tot], ...Object.entries(byK)]) console.log('  ', k.padEnd(7), bands(s).map(x => (10 * Math.log10(x / ref + 1e-30)).toFixed(1).padStart(6)).join(''))
}
