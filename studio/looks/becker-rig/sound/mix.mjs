// Becker Rig mix (sound bible §7 duck table, §8.1 levels, §8.2 sidechain, §8.5 sends). Levels are dB applied to
// instrument buffers that peak at about `vel` (pitched voices per note), set by measured per-voice loudness in the BUILD:
// the toy-box voices (marimba ostinato, pizz, glock) carry the look, the bass and the pad sit under them (bible §8.1's
// relative levels: marimba and pizz a few dB under the bass in peak, pad -20 RMS).
export const mix = {
  levels: {
    kick: -17.6, snare: -13.9, ghost: -17.4, roll: -19.9, clap: -17.1, shaker: -23.9, tamb: -31.4, block: -25.9, tom: -19.9, timp: -14.9, crash: -22.9, revcrash: -11.4,
    bass: -10.8, mallet: -19.4, glock: -24.4, pizz: -20.4, honk: -23.9, honkF: -20.9, strings: -25.9, pad: -23.1, whistle: -21.9,
    // the react voices (compose.mjs): the band's own answers to the cues ("catch the hit", the verdict button, the
    // fanfare's sustained "TA"), on the react bus (bus: 'react') so the cue they answer does not duck them away
    honkR: -23.9, honkFR: -26.4, crashR: -22.9,
    logoMallet: -11.5, logoPizz: -16.5, logoGlock: -25.5, logoEcho: -25.5, logoHonk: -34, logoPad: -29, logoTimp: -25, logoCrash: -30, logoSwell: -24, logoAir: -40,
  },
  // music sends (dB re each voice; the engine takes them post-level and pre-bus-fader, so the music bus fader stays at 0):
  // the bible's §8.5 values less 1.5 dB. Dry, punchy drums (snare room -11.5, clap -13.5, kick and bass none), a short
  // room on the toys, the hall on the sustained voices only. With the SFX sends below, the returns stem reads 9.5-11 LU
  // under the mix (they were 4-5 LU under it: as loud as the dry band in some teasers)
  sends: {
    snare: { room: -11.5 }, ghost: { room: -15.5 }, roll: { room: -15.5 }, clap: { room: -13.5 }, tom: { room: -13.5 }, tamb: { room: -17.5 },
    mallet: { room: -17.5 }, glock: { hall: -13.5 }, pizz: { room: -15.5 }, honk: { hall: -15.5 }, honkF: { hall: -15.5 }, strings: { hall: -13.5 },
    timp: { hall: -11.5 }, crash: { hall: -13.5 }, pad: { hall: -15.5 }, whistle: { room: -15.5 },
    honkR: { hall: -15.5 }, honkFR: { hall: -15.5 }, crashR: { hall: -13.5 },
    logoMallet: { hall: -10 }, logoPizz: { hall: -10 }, logoGlock: { hall: -10 }, logoEcho: { hall: -10 }, logoHonk: { hall: -10 },
    logoPad: { hall: -10 }, logoTimp: { hall: -10 }, logoCrash: { hall: -10 },
  },
  // SFX sends: the §7 table less 1.5 dB
  sfxSends: {
    thud: { room: -15.5 }, tick: { room: -21.5 }, swipe: { room: -17.5 }, pop: { room: -19.5 }, hit: { room: -11.5, hall: -17.5 },
    ding: { hall: -11.5 }, whoosh: { room: -17.5 }, cash: { hall: -13.5 }, step: { room: -19.5 }, roll: { room: -19.5 },
    type: { room: -21.5 }, riser: {}, buzz: { room: -17.5 }, boing: { room: -17.5 }, reveal: { hall: -11.5, room: -13.5 },
  },
  // music duck under each cue kind: [depth dB, hold s, release τ s] (bible §7). The clearance a cue needs over the
  // band's mids comes from the band-selective dips (compose.mjs `dips`), not from deeper broadband ducks
  duck: {
    thud: [3, 0.05, 0.14], tick: [1, 0.03, 0.08], swipe: [1.5, 0.03, 0.1], pop: [1.5, 0.03, 0.08], hit: [6, 0.1, 0.3],
    ding: [3, 0.08, 0.22], whoosh: [2, 0.05, 0.15], cash: [4, 0.1, 0.3], step: [1, 0.03, 0.06], roll: [2, 0, 0.15],
    type: [1, 0, 0.08], riser: [0, 0, 0], buzz: [4, 0.1, 0.25], boing: [2, 0.05, 0.12], reveal: [6, 0.12, 0.4],
  },
  duckBig: { hit: [10, 0.15, 0.5], reveal: [6, 0.12, 0.4] },
  // the payoff duck (B2: <= -8 dB over [P, P + 0.15]); a 0.3 s release lets the fanfare's "TA" and the DROP bloom back
  // within about half a second (impact first, then the music)
  payoffDuck: { depth: 9, hold: 0.15, release: 0.3 },
  sidechain: { triggers: ['kick'], targets: ['pad', 'strings'], depth: 1.5, attack: 0.002, hold: 0.02, release: 0.12 },
  // the react bus (src/sound/routing.mjs): the react voices skip the event duck AND ride the logo path (no musicDb, no
  // glue, un-ducked returns, mix.logo). Their levels above were set that way, the MALLET check and the calibration tools
  // model them without musicDb (sound/checks/looks/becker-rig.mjs instrumentBuses), and via 'music' measured no better
  // on the bible's checks (README "Sound": the react bus). Changing it means re-levelling honkR/honkFR/crashR
  react: { via: 'logo' },
  glue: { ratio: 2, attack: 0.01, release: 0.12, knee: 6, targetGr: 2 },
  sfxComp: { ratio: 3, attack: 0.002, release: 0.08, knee: 3, maxGr: 3 },
  music: 0, sfxBus: 0, returns: 0, logo: 0,
}
