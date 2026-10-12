// Event routing (bible §8.1): which bus a note or drum event joins, and what that bus does to it. Shared by the engine
// (engine.mjs renderMix) and by any pack that models the engine's mix (e.g. looks/scoreboard/sound/clearance.mjs).
//
//   bus 'music'  the music body (the default): instrument gain automation, the kick sidechain, the body gate at base,
//                automation.musicDb and mix.music, HP 30 Hz, the glue, the EVENT DUCK; sends to the music returns
//                (which take half the duck and the -6 dB tail under the logo)
//   bus 'react'  a music voice that answers a cue and must not be ducked by it ("catch the hit", a payoff stab, a
//                verdict button): everything 'music' does except the event duck (cue ducks, automation.duck and the
//                payoff duck). How much of the rest it keeps is the pack's choice, in mix.react (REACT_DEFAULTS)
//   bus 'logo'   the em sting (the default for role 'logo'): gain automation and mix.logo, HP 30 Hz; no musicDb, glue,
//                duck, sidechain or gate; sends to the un-ducked returns
//
// mix.react = { via, musicDb, glue, sends, inst: { [inst]: { ...same keys } } }
//   via      'music' (default): the voice is processed as a music voice (sidechain, gate, musicDb, glue, sends as set
//            below), only the duck skips it. 'logo': the voice joins the logo bus and gets exactly what the sting gets
//            (the packs' original un-ducked path: no musicDb, no glue, no sidechain, no gate, un-ducked returns,
//            mix.logo) - its samples are summed into the logo bus, so the result is bit-identical to bus 'logo'
//   musicDb  (via 'music') true (default): follows automation.musicDb and mix.music, like the body. false: neither
//   glue     (via 'music') true (default): shares the glue compressor with the body (one detector over both, the same
//            gain reduction on both). false: bypasses it
//   sends    (via 'music') 'music' (default): its sends feed the music returns (half-ducked, dipped under the logo).
//            'free': the un-ducked returns, like the SFX and the logo
//   inst     per-instrument overrides of the keys above
export const BUSES = ['logo', 'react', 'music']
/** the engine's order at equal event times (then instrument, midi, index): logo, react, music */
export const BUS_RANK = Object.freeze({ logo: 0, react: 1, music: 2 })
export const REACT_DEFAULTS = Object.freeze({ via: 'music', musicDb: true, glue: true, sends: 'music' })

/** an event's bus: its own `bus`, else 'logo' for role 'logo', else 'music'. Throws on an unknown bus */
export function busOf(ev) {
  const b = ev.bus || (ev.role === 'logo' ? 'logo' : 'music')
  if (!(b in BUS_RANK)) throw new Error(`event ${ev.inst}@${ev.t}: unknown bus "${b}" (have: ${BUSES.join(', ')})`)
  return b
}

/** the react settings for one instrument: REACT_DEFAULTS < mix.react < mix.react.inst[inst]. Throws on a bad value */
export function reactSettings(mix, inst) {
  const { inst: per, ...top } = (mix && mix.react) || {}
  const r = { ...REACT_DEFAULTS, ...top, ...((per && per[inst]) || {}) }
  if (r.via !== 'music' && r.via !== 'logo') throw new Error(`mix.react.via must be 'music' or 'logo' (got "${r.via}")`)
  if (r.sends !== 'music' && r.sends !== 'free') throw new Error(`mix.react.sends must be 'music' or 'free' (got "${r.sends}")`)
  return r
}

/**
 * How the engine processes the voices of one (bus, instrument):
 *   { bus, sum ('body' | 'react' | 'logo': the buffer the voice is summed into), duck, musicDb (automation.musicDb and
 *     mix.music), glue, sidechain, gate, sends ('music' | 'free'), fader ('music' | 'logo' | null: the bus trim) }
 */
export function routeOf(bus, inst, mix) {
  if (bus === 'music') return { bus, sum: 'body', duck: true, musicDb: true, glue: true, sidechain: true, gate: true, sends: 'music', fader: 'music' }
  const logo = { bus, sum: 'logo', duck: false, musicDb: false, glue: false, sidechain: false, gate: false, sends: 'free', fader: 'logo' }
  if (bus === 'logo') return logo
  if (bus !== 'react') throw new Error(`unknown bus "${bus}" (have: ${BUSES.join(', ')})`)
  const r = reactSettings(mix, inst)
  if (r.via === 'logo') return logo
  return { bus, sum: 'react', duck: false, musicDb: !!r.musicDb, glue: !!r.glue, sidechain: true, gate: true, sends: r.sends, fader: r.musicDb ? 'music' : null }
}
