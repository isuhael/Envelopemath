// render one spec with the music trim forced (default 0) and print the balance quantities for the B1 model fit
import fs from 'node:fs'
import { MODEL } from '/home/user/Envelopemath/studio/looks/becker-rig/sound/balance.mjs'
import { loadPack, renderMix, masterFilters } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { loudness } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const id = Object.keys(recs).find(k => k.startsWith(process.argv[2]) && /becker/.test(k))
MODEL.fixedTrim = process.argv[3] != null ? +process.argv[3] : 0
const pack = await loadPack('becker-rig')
const mix = renderMix(recs[id], pack, {})
const ung = b => { const m = loudness(b).momentary; let p = 0, n = 0; for (let h = 3; h < m.length; h += 4) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) } return -0.691 + 10 * Math.log10(p / n) }
const f = b => masterFilters(b)
const bk = mix.tl.becker
console.log(JSON.stringify({ id: id.slice(0, 3), mix: loudness(f(mix.sum)).integrated, M: loudness(f(mix.stems.music)).integrated, Mu: ung(f(mix.stems.music)), U: ung(f(mix.stems.sfx)), I: loudness(f(mix.stems.sfx)).integrated, R: ung(f(mix.stems.returns)), cost: bk.music.cost, tilt: bk.tilt.tilt, Upred: bk.U, trim: bk.music.trim }))
