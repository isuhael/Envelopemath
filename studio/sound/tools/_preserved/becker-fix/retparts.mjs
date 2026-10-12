import fs from 'node:fs'
import { loadPack, renderMix, masterFilters } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { loudness } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const id = Object.keys(recs).find(k => k.startsWith(process.argv[2]) && /becker/.test(k))
const pack = await loadPack('becker-rig')
const ung = b => { const m = loudness(b).momentary; let p = 0, n = 0; for (let h = 3; h < m.length; h += 4) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) } return -0.691 + 10 * Math.log10(p / n) }
const run = (label, patch) => {
  const p = { ...pack, mix: { ...pack.mix, sends: { ...pack.mix.sends }, sfxSends: { ...pack.mix.sfxSends } } }
  patch(p.mix)
  const m = renderMix(recs[id], p, {})
  const I = loudness(masterFilters(m.sum)).integrated
  console.log(label.padEnd(12), 'ret re mix', (loudness(masterFilters(m.stems.returns)).integrated - I).toFixed(2), 'ungated', (ung(masterFilters(m.stems.returns)) - I).toFixed(2))
}
run('all', () => {})
run('no sfx', m => { m.sfxSends = Object.fromEntries(Object.keys(m.sfxSends).map(k => [k, {}])) })
run('no logo', m => { for (const k of Object.keys(m.sends)) if (/^logo/.test(k)) m.sends[k] = {} })
run('no music', m => { for (const k of Object.keys(m.sends)) if (!/^logo/.test(k)) m.sends[k] = {} })
