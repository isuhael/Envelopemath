// Becker Rig instruments (sound bible §6.3): the "toy-box funk" band, one function per note or drum event.
// Every function returns a buffer whose peak is about `vel` at velocity 1 (pitched voices per note), so the static
// levels live in one place (mix.mjs). Randomness only from ctx.rng (the engine's seeded `noise:<inst>:<k>` stream).
import * as K from '../../../src/sound/kit.mjs'
import {
  SR, sec, mono, osc, unison, svf, adsr, expEnv, dcBlock, saturate, mtof, scale, peakOf, noise, onePoleLP,
} from '../../../src/sound/dsp.mjs'

const unit = (b, vel = 1) => { const p = peakOf(b); if (p > 0) scale(b, (vel || 0) / p); return b }
const st = (L, R) => ({ L, R })

/**
 * BR-Bounce, the rubbery synth bass: PolyBLEP square + saw 50/50, 24 dB LP whose envelope runs ~2.4 kHz -> 350 Hz
 * (τ 90 ms) at a resonance of Q 2 (the "bwop"), amp A 2 / D 160 / S 0.55 / R 50 ms.
 * ev.glideTo: slide into that MIDI note over the last 50 ms (legato into the next bar); ev.bend: semitones of pitch
 * bend over ev.bendTime from ev.bendAt (the buzz "deflate"); ev.bright scales the filter peak (octave pops).
 * The drive sits BEFORE the resonant LP (tanh 1.8 on the oscillators), so the filter cleans what the drive adds; a
 * gentle tanh 1.3 after it rounds the resonant onset spike, and a 12 dB LP at 1.4 kHz after that keeps the bass out of
 * the marimba's octave (0.5-3 kHz belongs to the toys). A sine at the fundamental (-9 dB) gives the note a round
 * floor; there is no sub-octave (37-58 Hz costs headroom and no phone plays it), and a 40 Hz HP clears the rest.
 */
export function bounce(ev) {
  const vel = ev.vel ?? 1, dur = Math.max(0.03, ev.dur), n = sec(dur + 0.06)
  const f = mtof(ev.midi)
  const g2 = ev.glideTo != null ? mtof(ev.glideTo) : null, G0 = sec(Math.max(0, dur - 0.05)), Gl = sec(0.05)
  const bend = ev.bend || 0, bendAt = ev.bendAt || 0, bendT = ev.bendTime || 0.25
  const fq = i => {
    let x = f
    if (g2 != null && i > G0) x = f * Math.pow(g2 / f, Math.min(1, (i - G0) / Gl))
    if (bend) { const t = i / SR - bendAt; if (t > 0) x *= Math.pow(2, bend * Math.min(1, t / bendT) / 12) }
    return x
  }
  const sq = osc('square', n, fq), sw = osc('saw', n, fq), x = mono(n)
  for (let i = 0; i < n; i++) x[i] = 0.5 * sq[i] + 0.5 * sw[i]
  saturate(x, 1.8)
  const peak = 2400 * (0.55 + 0.45 * vel) * (ev.bright ?? 1), floorHz = 350
  const tau = 0.09 * SR
  // q 1.08 on the cascade gives the second stage Q 2.0 (svf scales it by 1.848): the bible's resonance
  svf(x, 'lp', i => floorHz + (peak - floorHz) * Math.exp(-i / tau), { q: 1.08, poles: 4 })
  const e = adsr(n, { a: 0.002, d: 0.16, s: 0.55, r: 0.05, gate: dur })
  for (let i = 0; i < n; i++) x[i] *= e[i]
  dcBlock(x, 25)
  unit(x, 1)
  saturate(x, 1.3)
  svf(x, 'lp', 1400 * (ev.bright ?? 1))
  unit(x, 1)
  const fund = osc('sine', n, fq), es = adsr(n, { a: 0.004, d: 0.25, s: 0.7, r: 0.05, gate: dur }), gF = Math.pow(10, -9 / 20)
  for (let i = 0; i < n; i++) x[i] += fund[i] * es[i] * gF
  svf(x, 'hp', 40)
  return unit(x, vel)
}

/** BR-Mallet (marimba): partials 1, 3.9, 9.2 with τ 0.35 s·√(440/f), plus a 2 ms LP'd click. ev.gate: a dead stroke,
 *  damped over 40 ms after ev.dur (the logo's 85 ms pickups) */
export function mallet(ev, c) {
  const x = unit(K.mallet(c.rng, ev.midi, { vel: 1 }), ev.vel ?? 1)
  if (ev.gate) { const G = sec(ev.dur), R = sec(0.04); for (let i = G; i < x.length; i++) x[i] *= Math.max(0, 1 - (i - G) / R) }
  return x
}

/** BR-Glock: free-bar partials 1, 2.76, 5.40, 8.93 (×tauScale; 1.15 for the logo). ev.lp: low-passed echo */
export function glock(ev) {
  const g = K.glock(ev.midi, { vel: 1, tauScale: ev.tauScale ?? 1, len: Math.max(0.4, (ev.dur || 0) + 1.6 * (ev.tauScale ?? 1)) })
  if (ev.lp) svf(g, 'lp', ev.lp, { poles: 4 })
  // the bar is still ringing where the buffer stops: a 30 ms raised-cosine fade, so it ends on 0 (U2)
  const m = Math.min(g.length, sec(0.03)); for (let i = 0; i < m; i++) g[g.length - 1 - i] *= 0.5 - 0.5 * Math.cos(Math.PI * i / m)
  return unit(g, ev.vel ?? 1)
}

/** BR-Pizz: Karplus-Strong string, loss 0.996, excitation LP'd at 3 kHz, amp release 80 ms at the gate */
export const pizz = (ev, c) => unit(K.pluck(c.rng, ev.midi, Math.max(0.04, ev.dur), { vel: 1, bright: 3000, release: 0.08 }), ev.vel ?? 1)

/**
 * BR-Honk (brass stab): 3 saws ±8 cents, a lip scoop of -25 cents settling in ~12 ms, 12 dB LP that blats 600 Hz ->
 * 3.2 kHz over the 30 ms attack then settles to 1.2 kHz over 200 ms; amp A 12 / D 150 / S 0.6 / R 80 ms.
 * ev.logo: the logo's longer stab (D 400 ms, S 0.35, R 600 ms).
 */
export function honk(ev, c) {
  const vel = ev.vel ?? 1, dur = Math.max(0.04, ev.dur), f = mtof(ev.midi)
  const A = ev.logo ? { a: 0.012, d: 0.4, s: 0.35, r: 0.6 } : { a: 0.012, d: 0.15, s: 0.6, r: 0.08 }
  const n = sec(dur + A.r + 0.01)
  const out = unison('saw', n, i => f * Math.pow(2, (-25 * Math.exp(-i / (0.004 * SR))) / 1200), { voices: 3, detune: 8, spread: 0.35, rng: c.rng })
  const hi = 3200 * (0.7 + 0.3 * vel), lo = 600, fa = sec(0.03), fall = 0.2 / 3 * SR
  const settle = 1800   // the bible's 1.2 kHz, opened so the section has some bite above 2 kHz
  const cut = i => (i < fa ? lo * Math.pow(hi / lo, i / fa) : settle + (hi - settle) * Math.exp(-(i - fa) / fall))
  svf(out.L, 'lp', cut, { q: 0.8 }); svf(out.R, 'lp', cut, { q: 0.8 })
  const e = adsr(n, { ...A, gate: dur })
  for (let i = 0; i < n; i++) { out.L[i] *= e[i]; out.R[i] *= e[i] }
  saturate(out.L, 1.3); saturate(out.R, 1.3)
  return unit(out, vel)
}

/** BR-Strain (tremolo strings): 4 saws ±10 cents, LP 2.8 kHz, HP 180 Hz, AM at 16th-triplet rate (6·BPM/60), depth 70% */
export const strings = (ev, c) => unit(K.strings(c.rng, ev.midi, Math.max(0.05, ev.dur), { vel: 1, rate: 6 * c.bpm / 60, depth: 0.7, lp: 2800, hp: 180, a: 0.04, r: 0.12 }), ev.vel ?? 1)

/**
 * BR-Warm (pad): 2 triangles ±6 cents + 2 saws ±9 cents at -6 dB, panned ±50%, 12 dB LP 1.2 kHz, HP 250 Hz (the
 * bible's 150 Hz left a 250-450 Hz wall under the bass; the pad is a halo, the bass owns the floor; ev.hp: the logo's
 * D add9 keeps 150 Hz);
 * A 150 ms (10 ms with ev.fast: at t = 0, P, V and L), S 1, R 400 ms.
 */
export function warm(ev, c) {
  const vel = ev.vel ?? 1, dur = Math.max(0.05, ev.dur), f = mtof(ev.midi), r = ev.release ?? 0.4
  const n = sec(dur + r)
  const tri = unison('tri', n, f, { voices: 2, detune: 6, spread: 0.5, rng: c.rng })
  const saw = unison('saw', n, f, { voices: 2, detune: 9, spread: 0.6, rng: c.rng })
  const L = new Float32Array(n), R = new Float32Array(n)
  for (let i = 0; i < n; i++) { L[i] = tri.L[i] + 0.5 * saw.L[i]; R[i] = tri.R[i] + 0.5 * saw.R[i] }
  for (const ch of [L, R]) { svf(ch, 'lp', 1200); svf(ch, 'hp', ev.hp ?? 250) }
  const e = adsr(n, { a: ev.fast ? 0.01 : 0.15, d: 0.3, s: 1, r, gate: dur })
  for (let i = 0; i < n; i++) { L[i] *= e[i]; R[i] *= e[i] }
  // a fixed scale (not peak-normalised): the pad's level is an RMS level, and a held voice must not jump with its length
  return scale(st(L, R), vel * 0.75)
}

/** the music's slide whistle (BR-Riser, only when no SFX riser covers TENSION): sine ev.from -> ev.midi (notated on the
 *  pitch it lands on, A5), vibrato 6 Hz growing 0 -> ±20 cents */
export function whistle(ev) {
  const dur = Math.max(0.1, ev.dur), n = sec(dur + 0.02), f0 = mtof(ev.from ?? ev.midi - 12), f1 = mtof(ev.midi)
  const fq = i => { const t = i / SR, p = Math.min(1, t / dur); return f0 * Math.pow(f1 / f0, p) * Math.pow(2, (20 * p * Math.sin(2 * Math.PI * 6 * t)) / 1200) }
  const x = osc('sine', n, fq), h = osc('sine', n, i => 2 * fq(i))
  const a = sec(0.03), rel = sec(0.012), D = sec(dur)
  for (let i = 0; i < n; i++) {
    const p = Math.min(1, i / D)
    const g = (i < a ? i / a : 1) * Math.pow(10, (-9 * (1 - p)) / 20) * (i > D - rel ? Math.max(0, (D - i) / rel) : 1)
    x[i] = (x[i] + 0.06 * h[i]) * g
  }
  return unit(x, ev.vel ?? 1)
}

// ---------------------------------------------------------------- drums
/** BR-Kick: sine 130 -> 46 Hz (τ 25 ms), amp τ 115 ms gated at 230 ms, 2 ms noise click at -10 dB. Deeper than the
 *  bible's 55 Hz: with no sub-octave under the bass, the kick's tail is what keeps the 31.5 Hz octave inside its
 *  §9.2 window, at a fraction of the headroom a held sub costs */
export const kick = (ev, c) => squash(K.kick(c.rng, { vel: 1, f0: 130, f1: 46, tau: 0.025, decay: 0.115, gate: 0.23, click: -10, drive: 1.5 }), ev.vel)
/** the bright drums are rolled off above ~10 kHz (12 dB/oct): nothing shrill at level, and less for the AAC encoder to
 *  smear past the limiter's ceiling on the backbeats (A2, A5 are measured on the decoded file) */
const tame = (b, f, vel) => { if (b.L) { svf(b.L, 'lp', f); svf(b.R, 'lp', f) } else svf(b, 'lp', f); return unit(b, vel ?? 1) }
/** drum-bus style soft clip at the hit's own peak (tanh 1.5): 2-4 dB less crest for the same weight, so the backbeats
 *  (kick + snare + clap together) leave the master limiter little to flatten */
const squash = (b, vel) => { unit(b, 1); for (const x of b.L ? [b.L, b.R] : [b]) saturate(x, 1.5); return unit(b, vel ?? 1) }
/** BR-Snare: sines 185 + 330 Hz (τ 50 ms, -4 dB), noise BP 2.5 kHz (Q 0.7, τ 110 ms), 3 ms HP crack */
export const snare = (ev, c) => squash(tame(K.snare(c.rng, { vel: 1, tau: 0.11 }), 9000, 1), ev.vel)
/** ghost notes and the TENSION roll: the same snare, shorter (τ 70 ms) so 32nds stay distinct */
export const ghost = (ev, c) => squash(tame(K.snare(c.rng, { vel: 1, tau: 0.07 }), 10000, 1), ev.vel)
/** BR-Clap: SB-Clap brighter (BP 1.6 kHz) */
export const clap = (ev, c) => squash(K.clap(c.rng, { vel: 1, bp: 1600, spread: 0.2 }), ev.vel)
/** BR-Shaker: noise HP 6 kHz, A 4 ms, τ 28 ms */
export const shaker = (ev, c) => tame(K.shaker(c.rng, { vel: 1 }), 11000, ev.vel)
/** BR-Tamb: noise BP 9 kHz τ 60 ms + 3 seeded jingles 5-8 kHz τ 40 ms */
export const tamb = (ev, c) => tame(K.tambourine(c.rng, { vel: 1 }), 12000, ev.vel)
/** BR-Block (woodblock): sines f and 2.71 f, τ 35 ms, 0.8 ms click */
export const block = (ev, c) => K.woodblock(c.rng, { vel: ev.vel ?? 1, f: mtof(ev.midi ?? 81) })
/** synth tom for fills: sine 140 -> 100 Hz (ev.f0/f1), τ 120 ms */
export const tom = (ev, c) => unit(K.tom(c.rng, { vel: 1, f0: ev.f0 ?? 140, f1: ev.f1 ?? 100, tau: 0.12 }), ev.vel ?? 1)
/** BR-Timp: partials 1, 1.5, 1.99, 2.44, +1 st falling in 60 ms, τ 1.2 s, mallet thump. ev.midi: D2 (38) or A1 (33) */
export const timp = (ev, c) => unit(K.timpani(c.rng, { vel: 1, f: mtof(ev.midi ?? 38), tau: ev.tau ?? 1.2 }), ev.vel ?? 1)
/** BR-Crash: decorrelated noise HP 3.5 kHz + metal ×2.6, τ 1.1 s (ev.tau: 1.4 on P) */
export function crash(ev, c) { const b = K.crash(c.rng, { vel: ev.vel ?? 1, tau: ev.tau ?? 1.1, ratio: 2.6 }); svf(b.L, 'lp', 9500); svf(b.R, 'lp', 9500); return b }
/** reverse crash: the crash envelope reversed, ending exactly at the event time */
export function revcrash(ev, c) {
  const b = K.crash(c.rng, { vel: ev.vel ?? 1, tau: 0.22, len: ev.len ?? 0.6, reverse: true, ratio: 2.6 })
  const off = b.offset; svf(b.L, 'lp', 9500); svf(b.R, 'lp', 9500); b.offset = off
  return b
}

/** a soft air bed for the logo tail (pink noise, LP 2 kHz), held to the card end so the tail never drops out */
export function air(ev, c) {
  const dur = Math.max(0.1, ev.dur), n = sec(dur)
  const L = noise(n, c.rng, 'pink'), R = noise(n, c.rng, 'pink')
  for (const x of [L, R]) { onePoleLP(x, 2000); svf(x, 'hp', 300) }
  const a = sec(0.3)
  for (let i = 0; i < n; i++) { const g = i < a ? i / a : 1; L[i] *= g; R[i] *= g }
  return unit(st(L, R), ev.vel ?? 1)
}

export const instruments = {
  bass: bounce, mallet, glock, pizz, honk, honkF: honk, strings, pad: warm, whistle,
  kick, snare, ghost, roll: ghost, clap, shaker, tamb, block, tom, timp, crash, revcrash,
  // the react voices (on the un-ducked bus): catch stabs, the verdict button, the fanfare's "TA"
  honkR: honk, honkFR: honk, crashR: crash,
  // the logo (its own bus: not gated at base, not ducked)
  logoMallet: mallet, logoPizz: pizz, logoGlock: glock, logoEcho: glock, logoHonk: (ev, c) => honk({ ...ev, logo: true }, c),
  logoPad: warm, logoTimp: timp, logoCrash: crash, logoSwell: revcrash, logoAir: air,
}
export { expEnv }
