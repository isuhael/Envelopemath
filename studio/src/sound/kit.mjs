// Instrument toolkit for packs: drums (kick, snare, clap, hats, crash, toms, shaker, tambourine, woodblock, impacts,
// timpani), pitched voices (808, pluck, mallet, glock, FM bell, supersaw pad, brass stab) and small helpers.
// Every function is deterministic: anything random takes a seeded rng (ctx.rng in an instrument, ctx.rng in an sfx).
// Recipes follow the bible's tables (§4.3, §6.3) with their numbers as defaults, so packs can call them as-is or tune.
// Mono functions return Float32Array; stereo ones return { L, R }. Levels are unit-ish (peak about 1): set the level in
// the pack (mix.levels / norm()).
import {
  SR, TAU, sec, mono, stereo, clamp, mtof, dbToGain, Osc, osc, unison, noise, svf, SVF, onePoleLP, onePoleHP, dcBlock,
  biquad, biquadCoefs, adsr, expEnv, glideSt, glideHz, sweep, fm, fmIndexMax, modal, karplus, saturate, peakOf, panMono,
  panGains, reverse, isStereo, scale,
} from './dsp.mjs'

/** scale a buffer so its peak is `db` dBFS (no-op on silence). Returns the buffer. */
export function norm(b, db) { const p = peakOf(b); if (p > 0) scale(b, dbToGain(db) / p); return b }
/** sum mono/stereo parts into a new stereo buffer: parts = [{ buf, pan?, gain?, at? (s) }] */
export function layer(parts, n = null) {
  const len = n ?? Math.max(...parts.map(p => (isStereo(p.buf) ? p.buf.L.length : p.buf.length) + sec(p.at || 0)))
  const out = stereo(len)
  for (const p of parts) {
    const at = sec(p.at || 0), g = p.gain ?? 1
    if (isStereo(p.buf)) { for (let i = 0; i < p.buf.L.length && at + i < len; i++) { out.L[at + i] += p.buf.L[i] * g; out.R[at + i] += p.buf.R[i] * g } }
    else { const [gl, gr] = panGains(p.pan || 0); for (let i = 0; i < p.buf.length && at + i < len; i++) { out.L[at + i] += p.buf[i] * g * gl; out.R[at + i] += p.buf[i] * g * gr } }
  }
  return out
}
/** two independently seeded noises (decorrelated L/R), optionally filtered by fn(monoBuffer) */
export function stereoNoise(n, rng, fn = null, color = 'white') {
  const L = noise(n, rng, color), R = noise(n, rng, color)
  if (fn) { fn(L); fn(R) }
  return { L, R }
}
const env = (x, e) => { for (let i = 0; i < x.length; i++) x[i] *= e[i] ?? 0; return x }

// ---------------------------------------------------------------- drums
/** kick: sine with an exponential pitch drop f0 -> f1 (τ), amp τ, gated, plus a short HP'd noise click (bible SB-Kick) */
export function kick(rng, { vel = 1, f0 = 160, f1 = 48, tau = 0.03, decay = 0.16, gate = 0.28, click = -12, drive = 1.4 } = {}) {
  const n = sec(gate + 0.01)
  const body = osc('sine', n, glideHz(f0, f1, tau))
  const e = expEnv(n, decay, 0.0003)
  const g = sec(gate)
  for (let i = 0; i < n; i++) body[i] *= e[i] * (i < g ? 1 : Math.max(0, 1 - (i - g) / sec(0.01)))
  if (drive > 1) saturate(body, drive)
  const c = noise(sec(0.002), rng)
  onePoleHP(c, 3000)
  const cg = dbToGain(click)
  for (let i = 0; i < c.length; i++) body[i] += c[i] * cg * (1 - i / c.length)
  return scale(body, vel)
}
/** snare: tone (sines) + band-passed noise + HP crack (bible BR-Snare / SB-Snare) */
export function snare(rng, { vel = 1, tones = [185, 330], toneDb = -4, toneTau = 0.05, bp = 2500, q = 0.7, tau = 0.11, crack = true, pitchUp = 0 } = {}) {
  const n = sec(tau * 6 + 0.02)
  const out = mono(n)
  const tg = dbToGain(toneDb)
  for (const f of tones) {
    const s = osc('sine', n, pitchUp ? (i => f * Math.pow(2, pitchUp / 12)) : f)
    const e = expEnv(n, toneTau, 0.0003)
    for (let i = 0; i < n; i++) out[i] += s[i] * e[i] * tg / tones.length
  }
  const nz = noise(n, rng)
  svf(nz, 'bp', bp, { q })
  const e = expEnv(n, tau, 0.0005)
  for (let i = 0; i < n; i++) out[i] += nz[i] * e[i] * 1.6
  if (crack) { const c = noise(sec(0.003), rng); onePoleHP(c, 5000); for (let i = 0; i < c.length; i++) out[i] += c[i] * 0.5 * (1 - i / c.length) }
  return norm(out, 20 * Math.log10(vel || 1e-9))
}
/** clap: 3 short bursts 9 ms apart and a tail, band-passed (bible SB-Clap); stereo with decorrelated tail */
export function clap(rng, { vel = 1, bp = 1200, q = 0.9, hp = 600, tail = 0.11, spread = 0.15 } = {}) {
  const n = sec(0.024 + tail * 6)
  const out = stereo(n)
  for (const ch of ['L', 'R']) {
    const nz = noise(n, rng)
    svf(nz, 'bp', bp, { q }); onePoleHP(nz, hp)
    for (let i = 0; i < n; i++) {
      const t = i / SR
      let a = 0
      for (const o of [0, 0.009, 0.018]) if (t >= o && t < o + 0.006) a = Math.max(a, Math.exp(-(t - o) / 0.003))
      if (t >= 0.024) a = Math.max(a, Math.exp(-(t - 0.024) / tail) * 0.8)
      out[ch][i] = nz[i] * a
    }
  }
  // narrow the image to ±spread
  for (let i = 0; i < n; i++) { const m = (out.L[i] + out.R[i]) / 2, s = (out.L[i] - out.R[i]) / 2 * spread * 2; out.L[i] = m + s; out.R[i] = m - s }
  return norm(out, 20 * Math.log10(vel || 1e-9))
}
/** metallic six-square cluster (808-style hats/cymbals), band-passed. ratio scales the frequencies (crash uses ~2.3) */
export const METAL = [205.3, 304.4, 369.6, 522.7, 540.0, 800.0]
export function metal(n, { ratio = 1, bp = 10000, hp = 7000, q = 1 } = {}) {
  const out = mono(n)
  for (const f of METAL) { const o = new Osc('square', { phase: (f % 1) }); for (let i = 0; i < n; i++) out[i] += o.next(f * ratio) / 6 }
  svf(out, 'bp', bp, { q }); svf(out, 'hp', hp)
  return out
}
/** hi-hat: metal + a little noise, closed τ 22 ms / open τ 180 ms (bible SB-Hat). opts.pitch in semitones (trap rolls) */
export function hat(rng, { vel = 1, open = false, tau = null, pitch = 0, noiseMix = 0.35 } = {}) {
  const T = tau ?? (open ? 0.18 : 0.022)
  const n = sec(T * 6 + 0.005)
  const m = metal(n, { ratio: Math.pow(2, pitch / 12) })
  const nz = noise(n, rng); svf(nz, 'hp', 7000)
  const e = expEnv(n, T, 0.0003)
  for (let i = 0; i < n; i++) m[i] = (m[i] * (1 - noiseMix) + nz[i] * noiseMix * 0.5) * e[i]
  return norm(m, 20 * Math.log10(vel || 1e-9))
}
/** crash: decorrelated noise (HP 3.5 kHz) + metal at ×ratio, τ (bible SB-Crash). reverse: true gives the swell (ends at t) */
export function crash(rng, { vel = 1, tau = 0.9, ratio = 2.3, metalDb = -10, hp = 3500, reverse: rev = false, len = null } = {}) {
  const n = sec(len ?? tau * 5)
  const out = stereoNoise(n, rng, x => { svf(x, 'hp', hp); svf(x, 'lp', 14000) })
  const mt = metal(n, { ratio, bp: 9000, hp: 4000, q: 0.8 })
  const mg = dbToGain(metalDb) * 3
  const e = expEnv(n, tau, 0.001)
  for (let i = 0; i < n; i++) { out.L[i] = (out.L[i] + mt[i] * mg) * e[i]; out.R[i] = (out.R[i] + mt[i] * mg) * e[i] }
  norm(out, 20 * Math.log10(vel || 1e-9))
  if (!rev) return out
  // reverse swell: the envelope reversed; the last sample is at the event time (offset = length)
  const r = { L: Float32Array.from(out.L).reverse(), R: Float32Array.from(out.R).reverse() }
  const f = sec(0.005)
  for (let i = 0; i < f; i++) { const g = i / f; r.L[i] *= g; r.R[i] *= g; r.L[n - 1 - i] *= g; r.R[n - 1 - i] *= g }
  r.offset = n
  return r
}
/** tom: sine pitch drop f0 -> f1, τ (bible BR synth tom) */
export function tom(rng, { vel = 1, f0 = 140, f1 = 100, tau = 0.12, glide = 0.05 } = {}) {
  const n = sec(tau * 6)
  const x = osc('sine', n, glideHz(f0, f1, glide))
  const e = expEnv(n, tau, 0.0005)
  const c = noise(sec(0.003), rng); onePoleLP(c, 4000)
  for (let i = 0; i < n; i++) x[i] = x[i] * e[i] + (i < c.length ? c[i] * 0.2 : 0)
  return scale(x, vel)
}
/** shaker: HP noise, A 4 ms, τ 28 ms (bible BR-Shaker) */
export function shaker(rng, { vel = 1, hp = 6000, a = 0.004, tau = 0.028 } = {}) {
  const n = sec(a + tau * 6)
  const x = noise(n, rng); svf(x, 'hp', hp)
  return norm(env(x, expEnv(n, tau, a)), 20 * Math.log10(vel || 1e-9))
}
/** tambourine: BP 9 kHz noise τ 60 ms + 3 seeded jingles (5-8 kHz), τ 40 ms */
export function tambourine(rng, { vel = 1 } = {}) {
  const n = sec(0.4)
  const x = noise(n, rng); svf(x, 'bp', 9000, { q: 1.2 })
  env(x, expEnv(n, 0.06, 0.001))
  for (let k = 0; k < 3; k++) {
    const f = 5000 + rng() * 3000, s = osc('sine', n, f), e = expEnv(n, 0.04, 0.0005)
    for (let i = 0; i < n; i++) x[i] += s[i] * e[i] * 0.25
  }
  return norm(x, 20 * Math.log10(vel || 1e-9))
}
/** woodblock: sines f and 2.71 f, τ 35 ms, plus a 0.8 ms click (bible BR-Block) */
export function woodblock(rng, { vel = 1, f = 880, tau = 0.035 } = {}) {
  const n = sec(tau * 7)
  const x = modal(n, f, [{ ratio: 1, amp: 1, tau }, { ratio: 2.71, amp: 0.45, tau: tau * 0.6 }])
  const c = noise(sec(0.0008), rng)
  for (let i = 0; i < c.length; i++) x[i] += c[i] * 0.4
  return norm(x, 20 * Math.log10(vel || 1e-9))
}
/**
 * impact: a cinematic hit. body sine diving from f·2^(dive/12) to f (τ glide), amp τ, tanh drive, DC block; a full-band
 * noise burst; an optional sub an octave down. Returns mono (centre it).
 */
export function impact(rng, { vel = 1, f = 73.42, dive = 12, glide = 0.06, tau = 0.35, drive = 2.5, burst = -6, burstMs = 4, sub = -8, subTau = 0.25, len = null } = {}) {
  const n = sec(len ?? Math.max(tau, subTau) * 6)
  const body = osc('sine', n, glideSt(f, dive, glide))
  env(body, expEnv(n, tau, 0.001))
  saturate(body, drive); dcBlock(body, 20)
  if (sub > -60) {
    const s = osc('sine', n, f / 2)
    env(s, expEnv(n, subTau, 0.002))
    onePoleHP(s, 28)
    const g = dbToGain(sub)
    for (let i = 0; i < n; i++) body[i] += s[i] * g
  }
  const b = noise(sec(burstMs / 1000), rng), bg = dbToGain(burst)
  for (let i = 0; i < b.length; i++) body[i] += b[i] * bg * (1 - i / b.length)
  return norm(body, 20 * Math.log10(vel || 1e-9))
}
/** timpani: partials 1, 1.5, 1.99, 2.44, pitch +1 st falling to f in 60 ms, τ, plus a mallet thump (bible BR-Timp) */
export function timpani(rng, { vel = 1, f = 73.42, tau = 1.2 } = {}) {
  const n = sec(tau * 4)
  const out = mono(n)
  const parts = [[1, 1], [1.5, 0.5], [1.99, 0.35], [2.44, 0.2]]
  for (const [r, a] of parts) {
    const s = osc('sine', n, glideSt(f * r, 1, 0.02))
    const e = expEnv(n, tau / (1 + (r - 1) * 0.8), 0.002)
    for (let i = 0; i < n; i++) out[i] += s[i] * e[i] * a
  }
  const th = noise(sec(0.008), rng); onePoleLP(th, 600); onePoleLP(th, 600)
  for (let i = 0; i < th.length; i++) out[i] += th[i] * 2 * (1 - i / th.length)
  dcBlock(out, 20)
  return norm(out, 20 * Math.log10(vel || 1e-9))
}

// ---------------------------------------------------------------- pitched voices
/**
 * 808: sine with a pitch dive (+st semitones, τ), held for `dur`, R 40 ms, optional long tail τ; tanh drive, DC block,
 * 12 dB LP at 1.2 kHz (bible SB-808). glideTo: { midi, at (s), time (s) } for legato glides (phase accumulates).
 */
export function bass808(midi, dur, { vel = 1, dive = 7, tau = 0.035, drive = 2.5, release = 0.04, tail = null, glideTo = null } = {}) {
  const f = mtof(midi)
  const n = sec(dur + (tail ? tail * 4 : release))
  const g2 = glideTo ? mtof(glideTo.midi) : f
  const ga = glideTo ? glideTo.at : Infinity, gt = glideTo ? Math.max(0.001, glideTo.time ?? 0.06) : 1
  const fq = i => {
    const t = i / SR
    let base = f
    if (t > ga) base = f * Math.pow(g2 / f, Math.min(1, (t - ga) / gt))
    return base * Math.pow(2, dive * Math.exp(-t / tau) / 12)
  }
  const x = osc('sine', n, fq)
  const a = sec(0.002), G = sec(dur), R = sec(release)
  for (let i = 0; i < n; i++) {
    let e = i < a ? i / a : 1
    if (tail) e *= Math.exp(-Math.max(0, i - a) / (tail * SR))
    else if (i >= G) e *= Math.max(0, 1 - (i - G) / R)
    x[i] *= e
  }
  saturate(x, drive); dcBlock(x, 20); svf(x, 'lp', 1200)
  // final anti-click at the very end
  const f5 = Math.min(n, sec(0.005)); for (let i = 0; i < f5; i++) x[n - 1 - i] *= i / f5
  return scale(x, vel)
}
/** plucked string (Karplus-Strong) with an amp release at the gate (bible BR-Pizz) */
export function pluck(rng, midi, dur, { vel = 1, loss = 0.996, bright = 3000, release = 0.08, pick = 0 } = {}) {
  const n = sec(dur + release)
  const x = karplus(n, mtof(midi), { loss, bright: bright * (0.6 + 0.4 * vel), rng, pick })
  const G = sec(dur), R = sec(release)
  for (let i = G; i < n; i++) x[i] *= Math.max(0, 1 - (i - G) / R)
  const a = sec(0.001); for (let i = 0; i < a; i++) x[i] *= i / a
  return scale(x, vel)
}
/** marimba-style mallet: partials 1, 3.9, 9.2 with τ scaled by √(440/f), plus a 2 ms LP'd click (bible BR-Mallet) */
export function mallet(rng, midi, { vel = 1, tau = null, click = -14 } = {}) {
  const f = mtof(midi), T = tau ?? 0.35 * Math.sqrt(440 / f)
  const n = sec(T * 5 + 0.01)
  const x = modal(n, f, [{ ratio: 1, amp: 1, tau: T }, { ratio: 3.9, amp: 0.35 * (0.5 + 0.5 * vel), tau: T / 3 }, { ratio: 9.2, amp: 0.10 * vel, tau: T / 8 }])
  const c = noise(sec(0.002), rng); onePoleLP(c, 3000)
  const cg = dbToGain(click)
  for (let i = 0; i < c.length; i++) x[i] += c[i] * cg * (1 - i / c.length)
  return scale(x, vel)
}
/** glockenspiel: free-bar partials 1, 2.76, 5.40, 8.93 (bible BR-Glock); tauScale 1.15 for the logo */
export function glock(midi, { vel = 1, tauScale = 1, len = null } = {}) {
  const f = mtof(midi)
  const parts = [[1, 1, 1.2], [2.76, 0.35, 0.5], [5.40, 0.15, 0.25], [8.93, 0.06, 0.12]].map(([ratio, amp, tau]) => ({ ratio, amp, tau: tau * tauScale }))
  return scale(modal(sec(len ?? 1.2 * tauScale * 4), f, parts, { attack: 0.0005 }), vel)
}
/**
 * FM bell: carrier f, modulator ratio·f, index I0 -> I1 over `idxTime`, amp A then τ (bible §5 ding). The index is
 * clamped by the Carson rule (fmax 18 kHz).
 */
export function fmBell(midi, { vel = 1, ratio = 3.5, I0 = 2.5, I1 = 0.3, idxTime = 0.18, tau = 0.28, a = 0.001, len = null } = {}) {
  const f = mtof(midi), n = sec(len ?? tau * 6)
  const idx = i => I1 + (I0 - I1) * Math.exp(-i / (idxTime / 3 * SR))
  const x = fm(n, f, { ratio, index: idx })
  return scale(env(x, expEnv(n, tau, a)), vel)
}
/**
 * Supersaw/pad voice: `voices` PolyBLEP saws detuned ±detune cents, panned ±spread, seeded phases; 12 dB LP (cutoff may
 * be a function), HP; ADSR. Returns stereo. (bible SB-Glass, BR-Warm)
 */
export function padVoice(rng, midi, dur, { vel = 1, voices = 5, detune = 14, spread = 0.6, lp = 2200, hp = 200, a = 0.2, d = 0.3, s = 1, r = 0.3, shape = 'saw', tri = 0 } = {}) {
  const f = mtof(midi), n = sec(dur + r)
  const out = unison(shape, n, f, { voices, detune, spread, rng })
  if (tri > 0) { const t = osc('tri', n, f); for (let i = 0; i < n; i++) { out.L[i] = out.L[i] * (1 - tri) + t[i] * tri * 0.7; out.R[i] = out.R[i] * (1 - tri) + t[i] * tri * 0.7 } }
  for (const ch of [out.L, out.R]) { svf(ch, 'lp', lp); if (hp) svf(ch, 'hp', hp) }
  const e = adsr(n, { a, d, s, r, gate: dur })
  for (let i = 0; i < n; i++) { out.L[i] *= e[i] * vel; out.R[i] *= e[i] * vel }
  return out
}
/**
 * Brass stab: 3 saws ±detune, 12 dB LP whose cutoff blats lo -> hi over the attack then settles to `sus` over `fall`;
 * ADSR (bible BR-Honk; also SB "neon brass" with poles 4). Returns stereo.
 */
export function brass(rng, midi, dur, { vel = 1, detune = 8, lo = 600, hi = 3200, sus = 1200, fall = 0.2, a = 0.012, d = 0.15, s = 0.6, r = 0.08, poles = 2, voices = 3, spread = 0.3 } = {}) {
  const f = mtof(midi), n = sec(dur + r)
  const out = unison('saw', n, f, { voices, detune, spread, rng })
  const A = a * SR
  const cut = i => (i < A ? lo * Math.pow(hi / lo, i / A) : sus + (hi - sus) * Math.exp(-(i - A) / (fall / 3 * SR)))
  for (const ch of [out.L, out.R]) svf(ch, 'lp', cut, { q: 0.8, poles })
  const e = adsr(n, { a, d, s, r, gate: dur })
  for (let i = 0; i < n; i++) { out.L[i] *= e[i] * vel; out.R[i] *= e[i] * vel }
  return out
}
/** tremolo strings: 4 saws per note ±10 cents, LP 2.8 kHz, HP 180 Hz, amplitude modulated at `rate` Hz, depth (bible BR-Strain) */
export function strings(rng, midi, dur, { vel = 1, rate = 12, depth = 0.7, lp = 2800, hp = 180, a = 0.05, r = 0.15 } = {}) {
  const out = padVoice(rng, midi, dur, { vel, voices: 4, detune: 10, spread: 0.4, lp, hp, a, d: 0.1, s: 1, r })
  for (let i = 0; i < out.L.length; i++) { const m = 1 - depth * 0.5 * (1 - Math.cos(TAU * rate * i / SR)); out.L[i] *= m; out.R[i] *= m }
  return out
}
/** a simple lead: square (pulse width pw) + saw, 2 voices, LP, vibrato fading in (bible SB-Laser) */
export function lead(rng, midi, dur, { vel = 1, pw = 0.3, sawDb = -4, lp = 3200, vib = 5.5, vibCents = 15, vibDelay = 0.25, a = 0.005, d = 0.2, s = 0.8, r = 0.08, glideFrom = null, glideTime = 0.04 } = {}) {
  const f = mtof(midi), n = sec(dur + r)
  const f0 = glideFrom != null ? mtof(glideFrom) : f
  const fq = i => {
    const t = i / SR
    const g = glideFrom != null ? f0 * Math.pow(f / f0, Math.min(1, t / glideTime)) : f
    const v = t > vibDelay ? Math.min(1, (t - vibDelay) / 0.2) * vibCents * Math.sin(TAU * vib * (t - vibDelay)) : 0
    return g * Math.pow(2, v / 1200)
  }
  const sq = unison('pulse', n, fq, { voices: 2, detune: 5, spread: 0.2, rng, pw })
  const sw = unison('saw', n, fq, { voices: 2, detune: 5, spread: 0.2, rng })
  const sg = dbToGain(sawDb)
  for (let i = 0; i < n; i++) { sq.L[i] += sw.L[i] * sg; sq.R[i] += sw.R[i] * sg }
  for (const ch of [sq.L, sq.R]) svf(ch, 'lp', lp)
  const e = adsr(n, { a, d, s, r, gate: dur })
  for (let i = 0; i < n; i++) { sq.L[i] *= e[i] * vel; sq.R[i] *= e[i] * vel }
  return sq
}
/** a click: `ms` of noise through a band-pass at `bp` (or HP), linear decay. Mono. */
export function click(rng, { ms = 1.2, bp = 6500, q = 1.5, hp = null, gain = 1 } = {}) {
  const n = Math.max(2, sec(ms / 1000 * 3))
  const x = noise(n, rng)
  if (hp) svf(x, 'hp', hp); else svf(x, 'bp', bp, { q })
  const m = sec(ms / 1000)
  for (let i = 0; i < n; i++) x[i] *= gain * Math.max(0, 1 - i / Math.max(1, m * 2))
  return x
}
/** a sine ping (A, τ) at midi, optionally gliding by `glide` semitones over `glideTime` (exponential) */
export function ping(midi, { tau = 0.009, a = 0.0005, glide = 0, glideTime = 0.06, len = null, shape = 'sine' } = {}) {
  const f = mtof(midi), n = sec(len ?? tau * 7 + a)
  const fq = glide ? (i => f * Math.pow(2, glide * Math.min(1, i / (glideTime * SR)) / 12)) : f
  return env(osc(shape, n, fq), expEnv(n, tau, a))
}
/**
 * Band-passed noise sweep: centre f0 -> f1 (exponential) over dur, optional f2 for an up-and-down shape peaking at
 * `peakAt` (0..1); amplitude window 'sin' | 'sin2' | 'rise' (linear-in-dB +riseDb) | 'none'. Stereo (decorrelated) if
 * stereo. floor: minimum window level over the first half, reached in 1 ms (an audible start at the cue time).
 */
export function noiseSweep(rng, dur, { f0 = 2000, f1 = 7000, f2 = null, peakAt = 0.6, q = 1.2, window = 'sin', riseDb = 20, stereo: st = true, color = 'white', floor = 0 } = {}) {
  const n = Math.max(2, sec(dur))
  const fq = i => {
    const p = i / n
    if (f2 == null) return f0 * Math.pow(f1 / f0, p)
    return p < peakAt ? f0 * Math.pow(f1 / f0, p / peakAt) : f1 * Math.pow(f2 / f1, (p - peakAt) / (1 - peakAt))
  }
  const win = i => {
    const p = i / n
    if (window === 'sin') return Math.sin(Math.PI * p)
    if (window === 'sin2') return Math.sin(Math.PI * p) ** 2
    if (window === 'rise') return Math.pow(10, (riseDb * (p - 1)) / 20) * Math.min(1, (n - i) / sec(0.005))
    return 1
  }
  // floor: a minimum window level (re peak) reached within 1 ms, over the first half, so the sound is audible from its
  // cue time (bible B4: first sample above -60 dBFS within 2 ms of the cue)
  const one = () => {
    const x = noise(n, rng, color); svf(x, 'bp', fq, { q })
    const a = sec(0.001)
    for (let i = 0; i < n; i++) { let w = win(i); if (floor > 0 && i < n / 2) w = Math.max(w, floor * Math.min(1, i / a)); x[i] *= w }
    return x
  }
  if (!st) return one()
  return { L: one(), R: one() }
}
/** constant-power pan sweep of a mono buffer from p0 to p1 */
export function panSweep(x, p0, p1) {
  const n = x.length, pans = new Float32Array(n)
  for (let i = 0; i < n; i++) pans[i] = p0 + (p1 - p0) * (i / Math.max(1, n - 1))
  return panMono(x, pans)
}
export { reverse, sweep, adsr, expEnv, glideSt, glideHz, fm, fmIndexMax, modal, karplus, unison, osc, noise, svf, SVF, onePoleLP, onePoleHP, dcBlock, saturate, biquad, biquadCoefs, clamp, mtof }
