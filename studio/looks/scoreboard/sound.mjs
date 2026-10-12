// The Scoreboard sound pack: "neon scoreboard trap" (studio/sound/BIBLE.md §3-§5; pack contract in
// studio/sound/README.md). The engine finds it here (looks/<look>/sound.mjs) when studio/sound/packs/scoreboard.mjs
// does not exist. Everything is synthesised from seeded noise and band-limited oscillators; same spec, same WAV.
//
//   sound/harmony.mjs      §4.2 the D minor plan: SB1-SB3 phrases, D pedal under dense bars, the TENSION climb,
//                          DROP, HOLD, BREAK, VERDICT, the Gm9 -> A7sus4 -> A7 cadence into the logo's D major
//   sound/compose.mjs      §4.4-§4.6 grooves by section and energy, the 808 line, the ticker arp, the voice-led pad,
//                          the em-motif lead, the TENSION roll and gap, the anchors, and the reactions to the cues
//   sound/voicing.mjs      the SB-Glass voice leading (4 voices in MIDI 57-76, <= 5 st per voice)
//   sound/instruments.mjs  §4.3 SB-808, kick, clap, snare, hats, crash, arp, pad, lead, stab, music riser, logo brass
//   sound/sfx.mjs          §5 all 15 SFX kinds, the SFX fader wrapper
//   sound/clearance.mjs    §9.3 B3: the bed rendered at every cue window, the lever solver (selective dips, 808 and
//                          kick-tail dips, cue lifts, broadband within 1.5x the table), the anchor-stab budget
//   sound/logo.mjs         §3.2 the em sting as an LED fanfare
//   sound/mix.mjs          §8 levels, sends, ducks, sidechain, bus dynamics, mix.react (the P/V stabs and the reverse
//                          crash ride the engine's react bus via the logo path: src/sound/routing.mjs)
//   the acceptance checks, TRAIN, DUCK and the units (U1-U4, LOGO) live in studio/sound/checks/looks/scoreboard.mjs
//   (`node src/cli.mjs verify`); the calibration tool in sound/tools/
export const name = 'scoreboard'
export const look = 'scoreboard'
export const key = ['D', 'minor']
export const tempo = { lo: 136, hi: 152, target: 144, syncGrid: 4, absLo: 128, absHi: 160 }
export const tensionBeats = 8
export { harmony } from './sound/harmony.mjs'
export { compose } from './sound/compose.mjs'
export { logo } from './sound/logo.mjs'
export { instruments } from './sound/instruments.mjs'
export { sfx } from './sound/sfx.mjs'
export { mix } from './sound/mix.mjs'
