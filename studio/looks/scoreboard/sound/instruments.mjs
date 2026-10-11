// Scoreboard instruments (sound bible §4.3, §3.2): one function per instrument, (ev, ctx) -> buffer at about unit peak
// for vel 1 (the level is mix.levels[inst]). Every voice starts at phase 0 (or a seeded phase for unison stacks), every
// pitch glide accumulates phase, attacks are >= 1 ms (drum transients >= 0.2 ms) and every voice ends at exactly 0.
//
// Generic event fields every instrument honours (see wrap()):
//   cutAt   seconds after the onset where the voice is released in 10 ms (the TENSION gap, bible §4.5)
//   gain    extra linear gain (used for layered doubles)
//   dip     { at, depth, hold, release }: a programmed dip (the logo's sustained layers under the card's handle ding)
//   dips    a list of them (the 808 under the B3 cues)
import {
  SR, sec, mono, stereo, clamp, mtof, dbToGain, osc, unison, noise, svf, onePoleLP, onePoleHP, dcBlock, adsr, expEnv,
  saturate, scale, isStereo, oversample2, Osc, rngFor, biquad, biquadCoefs, filter,
} from '../../../src/sound/dsp.mjs'
import * as K from '../../../src/sound/kit.mjs'

const TAU = Math.PI * 2
const chans = b => (isStereo(b) ? [b.L, b.R] : [b])

/** release a voice at `at` seconds with a `fade` raised-cosine; everything after is 0 (the buffer is shortened) */
export function cutVoice(b, at, fade = 0.010) {
  const i0 = sec(at), f = Math.max(1, sec(fade))
  const end = i0 + f
  for (const x of chans(b)) for (let i = i0; i < x.length; i++) { const k = (i - i0) / f; x[i] *= k >= 1 ? 0 : 0.5 * (1 + Math.cos(Math.PI * k)) }
  if (isStereo(b)) { if (b.L.length > end) { const o = b.offset; const nb = { L: b.L.slice(0, end), R: b.R.slice(0, end) }; if (o) nb.offset = o; return nb } return b }
  return b.length > end ? b.slice(0, end) : b
}
/** linear fade over the last `t` seconds (anti-click, bible §1: release >= 5 ms) */
function tailFade(b, t = 0.005) {
  for (const x of chans(b)) { const f = Math.min(x.length, sec(t)); for (let i = 0; i < f; i++) x[x.length - 1 - i] *= i / f }
  return b
}
/** a programmed dip (dB) at `at` s after the onset: 10 ms in, held, exponential recovery (the logo under the handle ding) */
function applyDip(b, dip) {
  for (const x of chans(b)) for (let i = Math.max(0, sec(dip.at - 0.01)); i < x.length; i++) {
    const t = i / SR
    const d = t < dip.at ? dip.depth * (t - dip.at + 0.01) / 0.01 : t < dip.at + dip.hold ? dip.depth : dip.depth * Math.exp(-(t - dip.at - dip.hold) / dip.release)
    if (d < 0.001 && t > dip.at + dip.hold) break
    x[i] *= Math.pow(10, -d / 20)
  }
}
const wrap = fn => (ev, ctx) => {
  let b = fn(ev, ctx)
  if (!b) return b
  if (ev.dip) applyDip(b, ev.dip)
  if (ev.dips) for (const d of ev.dips) applyDip(b, d)
  if (ev.gain != null && ev.gain !== 1) scale(b, ev.gain)
  if (ev.cutAt != null && ev.cutAt >= 0) b = cutVoice(b, ev.cutAt, 0.010)
  return tailFade(b, 0.005)
}

// ---------------------------------------------------------------- oscillators with optional 2x oversampling
/** a saw/pulse stack (detuned voices) as mono, rendered at 2x when `os` is 2 (bright notes above about MIDI 76) */
function stackMono(shape, n, f, { voices = 2, detune = 6, rng = null, pw = 0.5, os = 1 } = {}) {
  const out = mono(n)
  for (let v = 0; v < voices; v++) {
    const k = voices === 1 ? 0 : (v / (voices - 1)) * 2 - 1
    const ratio = Math.pow(2, (k * detune) / 1200)
    const ph = rng ? rng() : 0
    const fq = typeof f === 'function' ? (i => f(i) * ratio) : f * ratio
    const y = osc(shape, n, fq, { phase: ph, pw, os })
    for (let i = 0; i < n; i++) out[i] += y[i] / Math.sqrt(voices)
  }
  return out
}

// ---------------------------------------------------------------- drums
/**
 * SB-Kick: three layers summed, then normalised (peak 1 at vel 1):
 *   body   the bible's sine 160 -> 48 Hz (τ 30 ms), A 0.3 ms, τ 160 ms, gated at 280 ms, light drive
 *   punch  a sine 180 -> 90 Hz (glide τ 25 ms), amp τ 25 ms, at -4.5 dB: the 90-180 Hz thump that carries on phones
 *   knock  2 ms of noise band-passed at 3 kHz (Q 1.1), τ 5 ms, at -14 dB: the beater's click, in place of the HP 3 kHz click
 */
function kick(ev, c) {
  const body = K.kick(c.rng, { vel: 1, f0: 160, f1: 48, tau: 0.03, decay: 0.16, gate: 0.28, click: -200, drive: 1.25 })
  const n = body.length
  const pn = Math.min(n, sec(0.2))
  const punch = osc('sine', pn, i => 90 * Math.pow(2, Math.exp(-i / (0.025 * SR))))
  const pe = expEnv(pn, 0.025, 0.0004)
  const pg = dbToGain(-4.5)
  for (let i = 0; i < pn; i++) body[i] += punch[i] * pe[i] * pg
  const kn = sec(0.04), knock = noise(kn, c.rng)
  svf(knock, 'bp', 3000, { q: 1.1 })
  const ke = expEnv(kn, 0.005, 0.0002), kg = dbToGain(-14) * 2.5
  for (let i = 0; i < kn && i < n; i++) body[i] += knock[i] * ke[i] * kg
  K.norm(body, 0)
  return scale(body, ev.vel)
}
/** SB-Clap: 3 bursts (0, 9, 18 ms) and a tail τ 110 ms, BP 1.2 kHz Q 0.9 + HP 600 Hz; near-centre */
function clap(ev, c) { return K.clap(c.rng, { vel: ev.vel, bp: 1200 * (1 + (c.rng() - 0.5) * 0.06), q: 0.9, hp: 600, tail: 0.11, spread: 0.12 }) }
/** SB-Snare (rolls and fills): noise BP 2 kHz Q 0.8 τ 70 ms + a 185 Hz body τ 45 ms at -6 dB (pitch rises in TENSION) */
function snare(ev, c) {
  const x = K.snare(c.rng, { vel: 1, tones: [185], toneDb: -6, toneTau: 0.045, bp: 2000, q: 0.8, tau: 0.07, crack: false, pitchUp: ev.pitchUp || 0 })
  return scale(x, ev.vel)
}
/** SB-Hat: six squares (metal ratios) BP 10 kHz, HP 7 kHz; closed τ 22 ms, open τ 180 ms (choked at ev.choke s) */
function hat(ev, c) {
  const x = K.hat(c.rng, { vel: 1, open: !!ev.open, pitch: ev.pitch || 0, noiseMix: 0.18 })
  // ev.shelf: a high shelf at 10 kHz (dB), the E5 hats' -2 dB (the DROP already carries the crashes' sizzle)
  if (ev.shelf) biquad(x, biquadCoefs('highshelf', 10000, { gainDb: ev.shelf }))
  scale(x, ev.vel)
  return ev.choke != null && ev.choke > 0 ? cutVoice(x, ev.choke, 0.006) : x
}
/** SB-Crash: decorrelated noise HP 3.5 kHz + metal ×2.3 at -10 dB, τ 0.9 s (1.3 s on P) */
function crash(ev, c) { return K.crash(c.rng, { vel: ev.vel, tau: ev.tau || 0.9, ratio: 2.3, metalDb: -10, hp: 3500 }) }
/** the reverse crash: the crash envelope reversed, `len` s (0.6), its last sample on the event time */
function revcrash(ev, c) {
  const b = K.crash(c.rng, { vel: ev.vel, tau: ev.tau || 0.22, len: ev.len || 0.6, ratio: 2.3, metalDb: -10, hp: 3000, reverse: true })
  // white noise steps hard sample to sample: a 15 ms fade into the event time keeps its last 1 ms under 0.02 (U2)
  const n = b.L.length, f = sec(0.015)
  for (let i = 0; i < f; i++) { const g = i / f; b.L[n - 1 - i] *= g; b.R[n - 1 - i] *= g }
  return b
}
/**
 * SB-Riser (music; only when no SFX riser covers the TENSION): noise BP 300 Hz -> 6 kHz (exponential), +18 dB
 * linear-in-dB, decorrelated L/R with the width opening 20% -> 80%. ev.dur = the sweep length (it ends at the gap).
 */
function mriser(ev, c) {
  const dur = Math.max(0.2, ev.dur), n = sec(dur)
  const w = K.noiseSweep(c.rng, dur, { f0: 300, f1: 6000, q: 1.1, window: 'rise', riseDb: 18 })
  for (let i = 0; i < n; i++) {
    const k = 0.2 + 0.6 * i / n, m = 0.5 * (w.L[i] + w.R[i]), s = 0.5 * (w.L[i] - w.R[i]) * k
    w.L[i] = m + s; w.R[i] = m - s
  }
  const f = sec(0.012)
  for (let i = 0; i < f; i++) { const g = i / f; w.L[n - 1 - i] *= g; w.R[n - 1 - i] *= g }
  K.norm(w, 0)
  return scale(w, ev.vel)
}

// ---------------------------------------------------------------- SB-808
/**
 * SB-808: sine with a pitch dive (+7 st, τ 35 ms; +12 st, τ 50 ms on P, t = 0 and L), A 2 ms, held to the note end,
 * R 40 ms (12 ms when tied to the next 808 note); ev.tail: the P/L tail τ (s) instead of the hold. tanh(2.5x), DC
 * block, 12 dB LP at 1.2 kHz. ev.glideTo { midi, time }: the pitch slides into the next root over `time` ending at the
 * note end. A legato run (§4.3: rhythm B's octave pop gliding into the next root, ties <= 7 st) is ONE voice: the run's
 * first note carries ev.path [{ at (s from its onset), midi }] and ev.runDur, and renders every glide with continuous
 * phase and no new dive; the notes it glides into (ev.tiedIn) render nothing.
 */
function b808(ev) {
  if (ev.tiedIn) return null
  const dive = ev.dive ?? 7, dtau = ev.diveTau ?? 0.035
  const rel = ev.rel ?? 0.04, dur = Math.max(0.02, ev.runDur ?? ev.dur)
  const n = sec(dur + rel + 0.002)
  const segs = ev.path || [{ at: 0, midi: ev.midi }, ...(ev.glideTo ? [{ at: dur, midi: ev.glideTo.midi }] : [])]
  const gt = ev.glideTo?.time ?? 0.06
  const fs = segs.map(x => mtof(x.midi))
  let k = 0
  const fq = i => {
    const t = i / SR
    while (k + 1 < segs.length && t >= segs[k + 1].at) k++
    let b = fs[k]
    const nx = segs[k + 1]
    if (nx && t > nx.at - gt) { const u = Math.min(1, (t - (nx.at - gt)) / gt); b = fs[k] * Math.pow(fs[k + 1] / fs[k], u * u * (3 - 2 * u)) }
    return b * Math.pow(2, (dive * Math.exp(-t / dtau)) / 12)
  }
  // a sine, plus its octave locked to the same phase (ev.h2, default 0.58): the symmetric tanh(2.5x) of the bible only adds
  // odd harmonics, so the octave (116-220 Hz) that carries the 808 on phones (§4.3, §9.2 125 Hz band) would be missing
  const h2 = ev.h2 ?? 0.58
  const x = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) { x[i] = Math.sin(2 * Math.PI * ph) + h2 * Math.sin(4 * Math.PI * ph); ph += fq(i) / SR; if (ph >= 1) ph -= 1 }
  // A: a quadratic 3 ms onset (the dive starts at +7..+12 st, so a 2 ms linear ramp steps > 0.02 in its first 1 ms, U2)
  const A = sec(0.003), G = sec(dur), R = Math.max(1, sec(rel))
  for (let i = 0; i < n; i++) {
    let e = i < A ? (i / A) ** 2 : 1
    if (ev.tail) e *= Math.exp(-Math.max(0, i - A) / (ev.tail * SR))
    if (i >= G) e *= Math.max(0, 1 - (i - G) / R)
    x[i] *= e / (1 + h2 * 0.6)
  }
  saturate(x, 2.5)
  dcBlock(x, 20); svf(x, 'lp', 1200)
  return scale(x, ev.vel)
}
/** the P / L sub layer: a sine (D1), A 2 ms, τ 0.4 s, HP 28 Hz */
function sub(ev) {
  const f = mtof(ev.midi), n = sec(Math.max(ev.dur || 0, 2.0))
  const x = osc('sine', n, f)
  const e = expEnv(n, ev.tau || 0.4, 0.002)
  for (let i = 0; i < n; i++) x[i] *= e[i]
  onePoleHP(x, 28); onePoleHP(x, 28)
  K.norm(x, 0)
  return scale(x, ev.vel)
}

// ---------------------------------------------------------------- SB-Arp "ticker"
/** base LP cutoff by energy (bible §4.3) */
export const ARP_CUT = { 2: 1400, 3: 2200, 4: 3500, 5: 6000 }
/**
 * SB-Arp: 2 PolyBLEP saws (±6 cents) + a square an octave down at -10 dB (ev.sq: its level in dB, -Infinity drops it;
 * compose() lowers it in E4 and drops it in E5, where it only thickens 110-220 Hz under the pad); 24 dB LP whose cutoff starts at 3× the base
 * cutoff and falls to it (τ 120 ms), Q 1.2; amp A 1 ms, D 180 ms, S 0, R 60 ms (10 ms at a cut). ev.cut: the base
 * cutoff (Hz), ev.cutEnd: a cutoff the base glides to over the note (TENSION). The attack is a cubic 4 ms onset rather
 * than a linear 1 ms ramp (U2: the saws' wraps must not click). 2x oversampled above MIDI 76 or when
 * the filter opens past 9 kHz.
 */
function arp(ev, c) {
  const f = mtof(ev.midi), gate = Math.max(0.02, ev.dur), rel = ev.rel ?? 0.06
  const n = sec(gate + rel + 0.002)
  const base = ev.cut || 2200
  const os = ev.midi >= 76 || base * 3 > 9000 ? 2 : 1
  const x = stackMono('saw', n, f, { voices: 2, detune: 6, rng: c.rng, os })
  const sqDb = ev.sq ?? -10
  if (sqDb > -60) {
    const sq = osc('square', n, f / 2, { phase: 0 })
    const sg = dbToGain(sqDb)
    for (let i = 0; i < n; i++) x[i] += sq[i] * sg
  }
  const cutEnd = ev.cutEnd || base
  svf(x, 'lp', i => { const t = i / SR; const b = base * Math.pow(cutEnd / base, Math.min(1, t / Math.max(0.01, gate))); return Math.min(19000, b * (1 + 2 * Math.exp(-t / 0.12))) }, { q: 1.2, poles: 4 })
  // "D 180 ms, S 0": an exponential decay with τ 70 ms (-22 dB at 180 ms). The engine's adsr() reaches 99% of its
  // decay at d, which would make a 39 ms blip that the mix cannot hear; the gate then releases over `rel`
  // a cubic 4 ms onset: a saw wraps (a full-scale step) within any 1 ms above 1 kHz, so the envelope must still be under
  // 2% at 1 ms (U2); the pluck still reads as instant
  const A = sec(0.004), G = sec(gate), R = Math.max(1, sec(rel)), tau = 0.07 * SR
  for (let i = 0; i < n; i++) {
    let e = i < A ? (i / A) ** 3 : Math.exp(-(i - A) / tau)
    if (i >= G) e *= Math.max(0, 1 - (i - G) / R)
    x[i] *= e
  }
  return scale(x, ev.vel * 0.85)
}

// ---------------------------------------------------------------- SB-Glass pad
/**
 * SB-Glass: 5-voice supersaw (−14, −7, 0, +7, +14 cents, panned −60 … +60%, seeded phases); 12 dB LP at 2.2 kHz
 * (+1.5 kHz in E5; ev.lp), HP 120 Hz (the bible's 200 Hz thins A3-C4 and leaves the 250 Hz band under §9.2's range); A 30 ms (HOOK, DROP) or 200 ms, S 1, R 300 ms (10 ms at the gap).
 * ev.sweep { t0, t1, f0, f1 }: the TENSION LP sweep in absolute time (exponential). ev.swell: dB the note rises by
 * over ev.swellDur (the drop's +6 dB swell). ev.t is needed for the sweep.
 */
function pad(ev, c) {
  const f = mtof(ev.midi), dur = Math.max(0.05, ev.dur), r = ev.rel ?? 0.3
  const n = sec(dur + r + 0.002)
  const out = unison('saw', n, f, { voices: 5, detune: 14, spread: 0.6, rng: c.rng })
  const sw = ev.sweep
  const lp = sw ? (i => { const t = ev.t + i / SR; const k = clamp((t - sw.t0) / Math.max(0.01, sw.t1 - sw.t0), 0, 1); return sw.f0 * Math.pow(sw.f1 / sw.f0, k) }) : (ev.lp || 2200)
  for (const ch of [out.L, out.R]) { svf(ch, 'lp', lp); svf(ch, 'hp', 120) }
  const e = adsr(n, { a: ev.a ?? 0.2, d: 0.3, s: 1, r, gate: dur })
  const sDb = ev.swell || 0, sDur = Math.max(0.05, ev.swellDur || 1)
  for (let i = 0; i < n; i++) {
    const t = i / SR
    const g = sDb ? Math.pow(10, (-sDb + sDb * Math.min(1, t / sDur)) / 20) : 1
    out.L[i] *= e[i] * g * ev.vel; out.R[i] *= e[i] * g * ev.vel
  }
  return out
}

// ---------------------------------------------------------------- SB-Laser lead
/**
 * SB-Laser: PolyBLEP pulse (30%) + saw at -4 dB, 2 voices ±5 cents each, 12 dB LP at 3.2 kHz; portamento 40 ms from
 * ev.glideFrom; vibrato 5.5 Hz ±15 cents fading in from 250 ms. ADSR A 5 ms, D 200 ms, S 0.8, R 80 ms. 2x above MIDI 78.
 */
function lead(ev, c) {
  const f = mtof(ev.midi), dur = Math.max(0.03, ev.dur), r = ev.rel ?? 0.08
  const n = sec(dur + r + 0.002)
  const f0 = ev.glideFrom != null ? mtof(ev.glideFrom) : f, gt = 0.04
  const fq = i => {
    const t = i / SR
    const g = ev.glideFrom != null ? f0 * Math.pow(f / f0, Math.min(1, t / gt)) : f
    const v = t > 0.25 && ev.vib !== 0 ? Math.min(1, (t - 0.25) / 0.2) * 15 * Math.sin(TAU * 5.5 * (t - 0.25)) : 0
    return g * Math.pow(2, v / 1200)
  }
  const os = ev.midi >= 78 ? 2 : 1
  const sq = stackMono('pulse', n, fq, { voices: 2, detune: 5, rng: c.rng, pw: 0.3, os })
  const sw = stackMono('saw', n, fq, { voices: 2, detune: 5, rng: c.rng, os })
  const sg = dbToGain(-4)
  const x = mono(n)
  for (let i = 0; i < n; i++) x[i] = sq[i] + sw[i] * sg
  svf(x, 'lp', ev.lp || 3200)
  const e = adsr(n, { a: 0.005, d: 0.2, s: 0.8, r, gate: dur })
  for (let i = 0; i < n; i++) x[i] *= e[i]
  // a slight stereo spread from the two detuned voices: rendered mono, panned by the event (ev.pan)
  return scale(x, ev.vel * 0.6)
}

// ---------------------------------------------------------------- SB-Stab "stadium"
/**
 * SB-Stab: 7 saws (0, ±6, ±12, ±18 cents) per note, spread ±50%; A 2 ms (U2), τ 350 ms, released over 80 ms at the gate.
 * A 12 dB LP blat (9 kHz -> 3.2 kHz, τ 150 ms) keeps seven raw saws out of the harsh band. ev.noise adds the stab's
 * HP 2 kHz noise layer (τ 40 ms, -12 dB): set on one note of the chord. A 2-pole HP at ev.hp (250 Hz): the stab is the
 * arena's mid-range chord; at the anchors the kick, the 808 and the cue's body own the low end.
 */
function stab(ev, c) {
  const f = mtof(ev.midi), dur = Math.max(0.05, ev.dur), r = 0.08
  const n = sec(dur + r + 0.002)
  const os = ev.midi >= 74 ? 2 : 1
  const out = unison('saw', n, f, { voices: 7, detune: 18, spread: 0.5, rng: c.rng, os })
  const lpf = i => 3200 + 5800 * Math.exp(-i / (0.15 * SR))
  svf(out.L, 'lp', lpf); svf(out.R, 'lp', lpf)
  const G = sec(dur), A = sec(0.002)
  for (let i = 0; i < n; i++) {
    let e = (i < A ? i / A : 1) * Math.exp(-i / (0.35 * SR))
    if (i >= G) e *= Math.max(0, 1 - (i - G) / sec(r))
    out.L[i] *= e; out.R[i] *= e
  }
  if (ev.noise) {
    const nz = K.stereoNoise(n, c.rng, x => { svf(x, 'hp', 2000) })
    const ne = expEnv(n, 0.04, 0.0005), g = dbToGain(-12) * 2.2
    for (let i = 0; i < n; i++) { out.L[i] += nz.L[i] * ne[i] * g; out.R[i] += nz.R[i] * ne[i] * g }
  }
  if ((ev.hp ?? 250) > 0) filter(out, 'hp', ev.hp ?? 250, { q: 0.7071 })
  return scale(out, ev.vel * 0.7)
}

// ---------------------------------------------------------------- the logo's neon brass (§3.2)
/**
 * Neon brass (n4): 3 PolyBLEP saws ±9 cents; 24 dB LP 1.2 kHz -> 5 kHz over 15 ms, then -> 2.2 kHz over 600 ms
 * (ev.lpMax caps it: 3 kHz for the echoes); amp A 3 ms then exponential decay to -40 dB at 1.3 s (τ 0.282 s).
 */
function brass(ev, c) {
  const f = mtof(ev.midi), len = Math.max(0.3, ev.dur ?? 1.3)
  const n = sec(len * 1.6 + 0.05)
  const os = ev.midi >= 76 ? 2 : 1
  const out = unison('saw', n, f, { voices: 3, detune: 9, spread: 0.35, rng: c.rng, os })
  const cap = ev.lpMax || 20000
  const cut = i => {
    const t = i / SR
    const v = t < 0.015 ? 1200 * Math.pow(5000 / 1200, t / 0.015) : 2200 + (5000 - 2200) * Math.exp(-(t - 0.015) / 0.2)
    return Math.min(cap, v)
  }
  svf(out.L, 'lp', cut, { poles: 4 }); svf(out.R, 'lp', cut, { poles: 4 })
  const tau = len / Math.log(100)
  const e = expEnv(n, tau, 0.003)
  for (let i = 0; i < n; i++) { out.L[i] *= e[i]; out.R[i] *= e[i] }
  return scale(out, ev.vel * 0.75)
}

/**
 * The ring flare (cta.js BEATS.ring, t0 + 0.22·k): the badge lands and a green ring flares off its edge. A short bright
 * shimmer marks it on the logo bus: decorrelated noise in two bands (BP 7 kHz and 11 kHz), A 4 ms, τ 0.16 s (the ring
 * spreads and fades over 0.4 s), plus a faint glint on D7 and A7 (2349 / 3520 Hz, sines, τ 0.12 s, -10 dB): the logo
 * chord's root and 5th, so it sits inside the motif's A4 D5 E5 pickups without a new pitch.
 */
function flare(ev, c) {
  const n = sec(0.9)
  const out = K.stereoNoise(n, c.rng, x => { const y = Float32Array.from(x); svf(x, 'bp', 7000, { q: 1.2 }); svf(y, 'bp', 11000, { q: 1.4 }); for (let i = 0; i < x.length; i++) x[i] = x[i] + 0.7 * y[i] })
  const e = expEnv(n, 0.16, 0.004)
  const g1 = osc('sine', n, mtof(98)), g2 = osc('sine', n, mtof(105))
  const ge = expEnv(n, 0.12, 0.004), gg = dbToGain(-10)
  for (let i = 0; i < n; i++) { const p = (g1[i] + 0.8 * g2[i]) * ge[i] * gg; out.L[i] = out.L[i] * e[i] + p; out.R[i] = out.R[i] * e[i] + p }
  K.norm(out, 0)
  return scale(out, ev.vel)
}

/**
 * The logo is the channel's brand: every teaser plays the same em sting, sample for sample. Its voices take their
 * seeded phases and noise from a constant stream ('em-logo|<inst>:<k>') instead of the spec's own, so the unison beating
 * of the brass and pad (up to 1.3 dB of loudness at L) is the same everywhere.
 */
const brand = fn => (ev, ctx) => fn(ev, { ...ctx, rng: rngFor('em-logo', `${ev.inst}:${ctx.k}`) })
export const instruments = Object.fromEntries(Object.entries({
  kick, clap, snare, hat, crash, revcrash, mriser, b808, sub, arp, pad, lead, stab,
  // the logo bus (§3.2 "LED fanfare"): the same voices under their own names, so the logo has its own levels and sends
  logoLead: brand(lead), logoArp: brand(arp), logoBrass: brand(brass), logoEcho: brand(brass), logoPad: brand(pad), logo808: brand(b808),
  logoSub: brand(sub), logoCrash: brand(crash), logoSwell: brand(revcrash), logoFlare: brand(flare),
}).map(([k, fn]) => [k, wrap(fn)]))
