import * as I from '/home/user/Envelopemath/studio/looks/becker-rig/sound/instruments.mjs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import { truePeakDb } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
const ctx = n => ({ rng: D.rngFor('kb', n), bpm: 120 })
const k = I.kick({ vel: 1 }, ctx('k')), g = D.dbToGain
for (const midi of [38, 40, 43, 45, 47, 50]) {
  const b = I.bounce({ midi, vel: 0.95, dur: 0.25 }, ctx('b' + midi))
  const row = []
  for (const pol of [1, -1]) for (const dly of [0, 48]) {
    const n = 24000, x = new Float32Array(n)
    for (let i = 0; i < k.length && i < n; i++) x[i] += k[i] * g(-16.1)
    for (let i = 0; i < b.length && i + dly < n; i++) x[i + dly] += pol * b[i] * g(-10.3)
    row.push(`${pol > 0 ? '+' : '-'}${dly}: ${truePeakDb({ L: x, R: x }).toFixed(2)}`)
  }
  console.log(midi, row.join('  '), ' bass alone', truePeakDb({ L: b.map(v => v * g(-10.3)), R: b.map(v => v * g(-10.3)) }).toFixed(2), 'kick alone', truePeakDb({ L: k.map(v => v * g(-16.1)), R: k.map(v => v * g(-16.1)) }).toFixed(2))
}
