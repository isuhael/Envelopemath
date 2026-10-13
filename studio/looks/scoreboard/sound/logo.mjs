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
import { planFor, sfxBodyPower, leversFor } from './sfx.mjs'
import { CAL, acceptance } from './cal.mjs'
import { modelFor, payoffPre } from './bands.mjs'
const dB = d => Math.pow(10, d / 20)
/**
 * The master normalises each teaser to -14 LUFS, so a logo at a fixed level comes out 1-2 dB apart across teasers
 * (B8 wants it at >= -13 LUFS and under the payoff). The sting is scaled to land at its aim after mastering:
 *   gainEst   the master gain, from the music model (balance.mjs: M) and the cues' power over the body (sfx.mjs
 *             sfxBodyPower: Su): G = GM_PLAN - 10 log10(10^(M/10) + GM_SFX 10^(Su/10)). With the music alone (GM_SFX 0,
 *             as until 2026-10-12) a short, busy body mastered 0.4-0.9 dB under the estimate: its cues carry a real share
 *             of the mix (calibration sd 0.35 dB; 0.15 dB with the cues counted).
 *   LOGO_PRE  the sting's momentary loudness in the 400 ms window ending exactly at L + 0.2 s, pre-master, at scale 1
 *             (calibrate.mjs measures that window on the delivery, not the meter's nearest hop).
 * The sting is levelled for its true loudness at L + 0.2: LOGO_AT, or the middle of the teaser's own B8 window when that
 * is lower (logoAim), the same in every teaser whatever the meter's phase.
 */
export const LOGO_AT = -12.4
export const LOGO_PRE = CAL.LOGO_PRE
/**
 * B8's window is [-13 LUFS, the payoff's own momentary loudness]. In a long teaser the payoff lands at -9.8 .. -11.1
 * LUFS and LOGO_AT sits well inside; in a short, dense one the master gain is low (its body is loud for its length)
 * and the payoff, whose B8 frame is half the TENSION's gap, can land near -12. So the sting aims at the middle of the
 * teaser's own window when that is lower than LOGO_AT: payoffEst = payoffPre (bands.mjs: the band model's music, glue
 * included, and cues in the payoff's B8 frame) + gainEst - CAL.PAY_LOSS, and CAL.PAY_HIT more when a hit marks P: the
 * hit is the SFX bus compressor's reference (2.5 dB on the loudest hit) and it drives the limiter (1.3-4 dB at P); a
 * payoff without a hit (a reveal on the verdict) loses only what the returns and the AAC leave out. calibrate.mjs
 * measures both. The window's floor is read from sound/acceptance.json (B8.minLufs).
 */
export const hitAtP = tl => tl.cues.some(c => c.kind === 'hit' && Math.abs(c.t - tl.anchors.P.t) <= 0.015)
export function payoffEst(tl) {
  const pre = payoffPre(modelFor(tl), leversFor(tl) || {})
  return pre == null ? null : pre + gainEst(tl) - (CAL.PAY_LOSS ?? 1.4) - (hitAtP(tl) ? CAL.PAY_HIT ?? 1.6 : 0)
}
/**
 * The meter's frame. B8 reads the meter's momentary value on its 100 ms hop grid nearest L + 0.2 (src/sound/
 * loudness.mjs, sound/checks/measure.mjs seriesAt), so the window it reads ends up to 50 ms from L + 0.2, and the sting
 * rises about CAL.LOGO_SLOPE (15 dB/s) there (n4, the pad, the 808 and the crash land at L): the reading is the true
 * level plus LOGO_SLOPE x b8Frame(L), up to +-0.74 dB. Twelve of the fifteen teasers read 0.59 dB over the true level
 * (L + 0.2 falls 40 ms before a hop), 03b and 03c 0.15 dB under it, 05c 0.74 dB under it. The sting keeps its true
 * level wherever that reading still sits B8_MARGIN plus the estimates' spread (b8Spread) inside the teaser's window (as
 * the meter reads it); where it would not, the sting moves by the least that restores the margin (the floor's first,
 * when the estimated window is narrower than the two margins). This guard exists only because of the hop grid: with B8 reading the window that ends exactly at
 * L + 0.2 and P + 0.2 (proposed for the harness), it would act only where a payoff is that quiet.
 */
export const B8_MARGIN = 0.5
/** the spread of the guard's estimates (calibrate.mjs stats): the sting's reading (the master gain model and LOGO_PRE)
 * and, against the payoff, that and the payoff's estimate. The guard keeps B8_MARGIN plus that spread inside each edge,
 * as the band guard aims BAND_MARGIN plus its spread inside each octave (bands.mjs bandAim): with B8_MARGIN alone the
 * guarded stings read 0.49-0.53 dB inside the floor (03b, 03c, 05c on 2026-10-13), half of them under the margin */
export function b8Spread() {
  const S = CAL.stats || {}, sdL = Math.hypot(S.GM_PLAN_sd ?? 0, S.LOGO_PRE_sd ?? 0)
  return { floor: sdL, payoff: Math.hypot(sdL, S.PAY_sd ?? 0) }
}
export const B8_AT = 0.2, METER_HOP = 0.1
export const b8Frame = L => Math.round((L + B8_AT) / METER_HOP) * METER_HOP - (L + B8_AT)
/** the sting's aim (LUFS, true momentary loudness at L + 0.2 after mastering) and why: { aim, base, read, guard } */
export function logoPlan(tl) {
  const floor = acceptance().checks?.B8?.minLufs ?? -13, mP = payoffEst(tl)
  const base = mP == null ? LOGO_AT : Math.min(LOGO_AT, (floor + mP) / 2)
  const off = tl.card ? (CAL.LOGO_SLOPE ?? 0) * b8Frame(tl.card.L) : 0
  const sd = b8Spread(), lo = floor + B8_MARGIN + sd.floor, hi = mP == null ? Infinity : mP - B8_MARGIN - sd.payoff
  // a window narrower than the two margins (as estimated) keeps the floor's margin: the payoff's estimate is the uncertain
  // side (its spread is 0.39 dB, and the B8 floor is a fixed number)
  let aim = base
  if (base + off < lo || lo > hi) aim = lo - off
  else if (base + off > hi) aim = hi - off
  return { aim, base, read: aim + off, guard: +(aim - base).toFixed(3) }
}
export const logoAim = tl => logoPlan(tl).aim
/** the sting's scale range (dB): the master gains of the set span 1.6 (05c) to 4.4 dB (09c), and the scale follows
 * them; the range only guards against a broken estimate (it was +-3 dB until 2026-10-13, which held 05c's sting 0.9 dB
 * under its aim) */
export const LOGO_K = [-3, 5]
/** the master gain the teaser will get (dB): the music model plus the cues' power over the body */
export function gainEst(tl) {
  // the music model, plus what the band guard's level levers add to it (bands.mjs leverLoudness)
  const M = planFor(tl).M + (leversFor(tl)?.dM || 0), Su = sfxBodyPower(tl)
  return (CAL.GM_PLAN ?? CAL.GM) - 10 * Math.log10(Math.pow(10, M / 10) + (CAL.GM_SFX ?? 0) * Math.pow(10, Su / 10))
}

export function logo(tl, ctx) {
  const m = ctx.motif
  if (!m) return { notes: [], drums: [] }
  const notes = [], drums = []
  const L = m.L, end = tl.duration
  const gEst = gainEst(tl)
  const k = dB(Math.max(LOGO_K[0], Math.min(LOGO_K[1], logoAim(tl) - (LOGO_PRE + gEst))))
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
