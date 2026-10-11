// The Becker Rig sound pack: "toy-box funk" + cartoon foley (sound bible §3, §6, §7). Contract: studio/sound/README.md.
// The engine finds it at looks/becker-rig/sound.mjs (unless studio/sound/packs/becker-rig.mjs exists).
//   harmony   sound/harmony.mjs      D major: BR1/BR2/BR3 phrases, the chromatic climb, fanfare, victory lap, cadence, deflate
//   compose   sound/compose.mjs      the band on the timeline, the reactions to the cues (react bus, band-selective dips),
//                                    and the em sting's toy fanfare
//   instruments sound/instruments.mjs BR-Bounce, BR-Mallet, BR-Glock, BR-Pizz, BR-Honk, BR-Strain, BR-Warm, the drums
//   sfx       sound/sfx.mjs          all 15 cue kinds as cartoon foley
//   mix       sound/mix.mjs          levels, sends, the §7 duck table, the payoff duck, the kick sidechain
//   balance   sound/balance.mjs      the SFX leveller, the band's tilt, the music-level solver (run by compose)
export const name = 'becker-rig'
export const look = 'becker-rig'
export const key = ['D', 'major']
export const tempo = { lo: 112, hi: 128, target: 120, syncGrid: 2, absLo: 104, absHi: 136 }
export const tensionBeats = 4
export { harmony } from './sound/harmony.mjs'
export { compose, logo } from './sound/compose.mjs'
export { instruments } from './sound/instruments.mjs'
export { sfx } from './sound/sfx.mjs'
export { mix } from './sound/mix.mjs'
