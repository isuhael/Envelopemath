// The em sting, Scoreboard orchestration "LED fanfare" (sound bible §3.1, §3.2). The motif's notes and times come from
// the engine (tl.logoMotif(): A4 D5 E5 at L - 0.3 / - 0.2 / - 0.1 and A5 at L, the short-card rule included); this
// file only orchestrates them:
//   n1-n3   SB-Laser lead, plus the SB-Arp pluck an octave down (at -9 dB, by level)
//   n4      neon brass A5 (3 saws, the 1.2 -> 5 -> 2.2 kHz filter blat, -40 dB at 1.3 s), with A4 under it at -6 dB
//   echo    n4 again at L + 0.375 (-10 dB) and L + 0.750 (-18 dB), LP 3 kHz, ping-ponged
//   chord   SB-Glass pad D add9 (D3 A3 E4 F#4), A 10 ms, held to the card end (the master fades the last 0.40 s)
//   low end SB-808 D2 diving from D3 over 40 ms, τ 0.9 s, and the D1 sub (-10 dB, τ 0.4 s)
//   space   crash at L (-6 dB re n4), a 0.6 s reverse crash ending at L (-12 dB re n4), hall sends -8 dB
//   flare   a bright shimmer (BP noise 7 / 11 kHz, D7 + A7 glint, τ 0.16 s) at the ring flare, t0 + 0.22·k = L - 0.14·k
import { planFor } from './sfx.mjs'
import { CAL } from './cal.mjs'
const dB = d => Math.pow(10, d / 20)
/**
 * The master normalises each teaser to -14 LUFS, so a logo at a fixed level comes out 1-2 dB apart across teasers
 * (B8 wants it at >= -13 LUFS and under the payoff). The master gain is predictable from the bed (balance.mjs: about
 * GM_PLAN - M, M the plan's music-stem estimate, about ±0.25 dB), so the sting is scaled to land at LOGO_AT after mastering,
 * the middle of B8's window (>= -13 LUFS, under the payoff at -10.2 .. -11.7 LUFS).
 * LOGO_PRE: its loudness (momentary at L + 0.2, pre-master, scale 1), measured -17.38 ± 0.04 on all 15 (calibration.json).
 */
export const LOGO_AT = -12.1
export const LOGO_PRE = CAL.LOGO_PRE

export function logo(tl, ctx) {
  const m = ctx.motif
  if (!m) return { notes: [], drums: [] }
  const notes = [], drums = []
  const L = m.L, end = tl.duration
  const gEst = (CAL.GM_PLAN ?? CAL.GM) - planFor(tl).M
  const k = dB(Math.max(-3, Math.min(3, LOGO_AT - (LOGO_PRE + gEst))))
  // the handle ding must cut through the held chord and the 808 / crash tails (B3): those layers dip 9 dB under its first
  // 60 ms and come back over ~0.6 s; the motif's brass has decayed by then and keeps its line
  const ding = tl.cues.find(c => c.inCard && c.kind === 'ding')
  const dipAt = t => (ding ? { dip: { at: ding.t - t, depth: 9, hold: 0.07, release: 0.2 } } : {})
  for (const n of m.notes) {
    if (n.n < 4) {
      notes.push({ t: n.t, dur: n.gate, midi: n.midi, vel: n.vel, pan: n.pan, inst: 'logoLead', role: 'logo' })
      notes.push({ t: n.t, dur: n.gate, midi: n.midi - 12, vel: n.vel, pan: -n.pan, inst: 'logoArp', role: 'logo', cut: 2600 })
    } else {
      notes.push({ t: n.t, dur: 1.3, midi: n.midi, vel: n.vel, inst: 'logoBrass', role: 'logo' })
      notes.push({ t: n.t, dur: 1.3, midi: n.midi - 12, vel: n.vel * dB(-6), inst: 'logoBrass', role: 'logo' })
    }
  }
  m.echoes.forEach((e, k) => notes.push({ t: e.t, dur: 1.0, midi: 81, vel: dB(e.db), inst: 'logoEcho', role: 'logo', lpMax: e.lp, pan: k % 2 ? 0.35 : -0.35, ...dipAt(e.t) }))
  for (const v of m.chord.voicing.slice(1)) notes.push({ t: L, dur: Math.max(0.2, end - L), midi: v, vel: 1, inst: 'logoPad', role: 'logo', a: 0.01, lp: 2600, rel: 0.05, ...dipAt(L) })
  notes.push({ t: L, dur: Math.max(0.2, end - L - 0.05), midi: m.chord.voicing[0], vel: 1, inst: 'logo808', role: 'logo', dive: 12, diveTau: 0.04, tail: 0.9, rel: 0.05, ...dipAt(L) })
  notes.push({ t: L, dur: 1.5, midi: m.chord.voicing[0] - 12, vel: 1, inst: 'logoSub', role: 'logo', tau: 0.4, ...dipAt(L) })
  drums.push({ t: L, inst: 'logoCrash', vel: 1, tau: 1.3, ...dipAt(L) })
  drums.push({ t: L, inst: 'logoSwell', vel: 1, len: m.swell.dur, tau: 0.25 })
  // the ring flare (cta.js BEATS.ring = 0.22·k after the card starts): the badge visibly lands and its ring flares off the
  // edge 0.14·k before L, between n2 and n3; a short bright shimmer marks it, so the sting's first accent sits on the
  // landing the eye sees, and n4 at L stays the bible's downbeat (§2.4)
  if (tl.card && /pop/.test(tl.card.how)) drums.push({ t: L - 0.14 * tl.card.k, inst: 'logoFlare', vel: 1 })
  for (const e of [...notes, ...drums]) e.vel = (e.vel ?? 1) * k
  return { notes, drums }
}
