// Scoreboard mix (sound bible §8.1-§8.5): element levels (peak dBFS at velocity 1, pre-bus), sends, ducks, the kick
// sidechain and the bus dynamics. Levels are tuned against §9 B1 (music stem -1.5 to -3.5 LU re the mix, SFX stem
// -2.5 to -5 LU), §9.2 (the octave-band targets) and A11 (the limiter works on <= 3% of the samples).
export const mix = {
  levels: {
    // the pad carries the 250-500 Hz octaves and most of the 1 kHz one (the §9.2 reference): it sits under the arp, the
    // clap and the snare, so the 2-4 kHz octaves clear their floors (§9.2) in every teaser
    // the stadium stab is the look's arena signature on t = 0, P and V (P and V on the unducked path, budgeted against
    // their cues: clearance.mjs); the ticker sits 3 dB under its first level: it was the loudest voice for the whole body
    kick: -8, b808: -10.5, sub: -20, clap: -10, snare: -10.5, hat: -12.5, crash: -14, revcrash: -9, mriser: -15,
    stab: -11, pad: -16, arp: -13.5, lead: -15,
    // the logo: n4 (the long A5 on neon brass) leads; n1-n3 on the lead 4 dB under it (their 85 ms RMS sit >= 2 dB under
    // n4's, units.mjs LOGO); the pluck octave 9 dB under the lead; the ring flare's shimmer 12 dB under n4
    logoLead: -14.8, logoArp: -23.8, logoBrass: -9.8, logoEcho: -9.8, logoPad: -26.8, logo808: -17.3, logoSub: -23.3, logoCrash: -18.8, logoSwell: -24.8, logoFlare: -21.8,
  },
  sends: {
    // a hard-cut, machine-tight look: the ticker is dry but for a little plate (no ping-pong under 16ths), the lead keeps
    // the dotted-8th delay, the pad sits at the bible's hall -14
    clap: { plate: -12 }, snare: { plate: -14 }, arp: { plate: -20 }, lead: { plate: -16, delay: -4 },
    pad: { hall: -14 }, stab: { hall: -6 }, crash: { hall: -12 },
    logoLead: { hall: -8 }, logoArp: { hall: -8 }, logoBrass: { hall: -8 }, logoEcho: { hall: -8 }, logoPad: { hall: -8 }, logoCrash: { hall: -12 },
  },
  sfxSends: {
    tick: { plate: -24 }, thud: { plate: -16 }, ding: { hall: -12 }, roll: { plate: -22 }, pop: { plate: -20 }, cash: { hall: -10 },
    hit: { hall: -8 }, reveal: { hall: -9 }, riser: {}, swipe: { plate: -20 }, whoosh: { plate: -18 }, buzz: { plate: -20 },
    step: { plate: -24 }, boing: { plate: -20 }, type: { plate: -24 },
  },
  // §5 duck column: [depth dB, hold s, release τ s]; roll and type hold over their dur (engine). step/boing/type as tick
  duck: {
    tick: [1, 0.04, 0.08], thud: [4, 0.06, 0.16], ding: [3, 0.08, 0.22], roll: [2.5, 0, 0.15], pop: [1.5, 0.03, 0.08],
    cash: [4, 0.1, 0.3], hit: [9, 0.15, 0.45], reveal: [6, 0.12, 0.4], riser: [0, 0, 0], swipe: [1.5, 0.03, 0.1],
    whoosh: [2, 0.05, 0.15], buzz: [4, 0.1, 0.25], step: [1, 0.04, 0.08], boing: [1, 0.04, 0.08], type: [1, 0.04, 0.08],
  },
  duckBig: { hit: [9, 0.15, 0.45], reveal: [6, 0.12, 0.4] },
  // §8.2: pad, arp and lead pump 3 dB on every music kick; the 808 owns the sustain and never ducks
  sidechain: { triggers: ['kick'], targets: ['pad', 'arp', 'lead'], depth: 3, attack: 0.002, hold: 0.02, release: 0.12 },
  // the react bus (src/sound/routing.mjs): the P and V stabs and the reverse crash into P skip the event duck AND ride
  // the logo path (no musicDb, no glue, un-ducked returns, mix.logo): clearance.mjs budgets the stabs that way and the
  // stab's hall is the arena tail over the impact. via 'music' measured no better on the bible's checks (README "Sound")
  react: { via: 'logo' },
  delay: { beats: 0.75, feedback: 0.3, lp: 3500, hp: 300, returnDb: -14 },
  glue: { ratio: 2, attack: 0.01, release: 0.12, knee: 6, targetGr: 1.5 },
  sfxComp: { ratio: 3, attack: 0.002, release: 0.08, knee: 3, maxGr: 2.5 },
  // the engine's payoff duck (B2 needs <= -8 dB over [P, P + 0.15]): held exactly that long, then a 0.3 s bloom
  payoffDuck: { depth: 9, hold: 0.15, release: 0.3 },
  // B1: the music stem sits 1.5-3.5 LU under the mix, the SFX stem 2.5-5 LU under it
  music: -2,
  // The returns stem has to carry about a quarter of the gated mix level for B1 to hold: the SFX stem is intermittent, so
  // its gated loudness counts its active blocks only, and with the music and SFX stems alone the mix sits barely 1.5 LU
  // over the music (measured with the returns at 0 dB: music -1.2 to -1.8 LU re the mix, SFX -2.2 to -2.9; the fader's
  // S - M cannot move both into their windows, it trades one against the other). With the ticker's ping-pong gone and the
  // pad hall at the bible's -14, +2.5 dB put the returns stem at about -6 LU re the mix (it was -4.6 to -6.1 with the
  // arp delay), and the wetness is the stab's arena hall, the clap plate and the lead's delay, not a delay under 16ths.
  // 2026-10-13: the condensed cuts and the band guard's sends lever left the returns stem at -5.7 to -8.2 LU (mean -6.6)
  // and the music stem 0.26 LU under B1's ceiling in 10c (a long, sparse body: the mix sits only 1.8 LU over its music).
  // The returns trim is the one lever that moves every music stem away from that ceiling, and it costs the dense bodies
  // (01a: many ducks, its music stem sits 3.1-3.3 LU under the mix, near B1's floor): +3.0 dB balances the two ends
  // (10c 0.4 LU inside, 01a 0.35; +3.5 left 01a at 0.22)
  returns: 3.0,
}
