// Scoreboard SFX palette (sound bible §5): crisp, synthetic and heavy: LED segments, a scoreboard, an arena.
// Every kind renders at cue gain 1 at the bible's peak level (the engine multiplies by cue.gain), pitched to
// ctx.chord (from base on: D major add9), and honours the merge rule (§8.4): ctx.dropBody leaves out the layers below
// 300 Hz (meta.body = false), ctx.dropTransient leaves out the transient layer, ctx.claim() keeps a cluster's pitches
// a chord. Layers are normalised as a whole first, so leaving one out never raises the others.
// Variation (§5, U4): consecutive cues of a kind differ in at least two of pitch, filter cutoff (±8%), noise seed, pan.
import {
  SR, sec, mono, stereo, clamp, mtof, dbToGain, osc, noise, svf, onePoleLP, onePoleHP, dcBlock, expEnv, saturate, scale,
  peakOf, panMono, panGains, fm, rngFor, biquad, biquadCoefs,
} from '../../../src/sound/dsp.mjs'
import * as K from '../../../src/sound/kit.mjs'
import * as T from '../../../src/sound/theory.mjs'
import { loudness } from '../../../src/sound/loudness.mjs'
import { modal as D_modal } from '../../../src/sound/dsp.mjs'
import { plan as balancePlan, cueTrim, kfilter } from './balance.mjs'
import { curveFor, evalDb } from './energy.mjs'
import { CAL, lookup } from './cal.mjs'
import { mix } from './mix.mjs'
import { solve, isB3, GIVE_WAY } from './clearance.mjs'

const TAU = Math.PI * 2
const tonesIn = (ctx, lo, hi) => T.tonesIn(ctx.chord, lo, hi)
const rot = (arr, n) => arr[((n % arr.length) + arr.length) % arr.length]
const centsUp = c => Math.pow(2, c / 1200)
/** the chord root as MIDI nearest to [lo, hi] (inside when the octave fits) */
function rootNear(ch, lo, hi) {
  const a = T.placePc(ch.root, lo)
  if (a <= hi) return a
  return (a - hi) <= (lo - (a - 12)) ? a : a - 12
}

/**
 * Sum layered parts, normalise the FULL sound to peakDb, then leave out what the merge rule drops (parts flagged
 * body: true when ctx.dropBody, transient: true when ctx.dropTransient). A 5 ms tail fade ends every sound at 0.
 */
function finish(parts, n, peakDb, ctx, meta = {}) {
  const full = K.layer(parts, n), pk = peakOf(full)
  const keep = parts.filter(p => !(p.body && ctx.dropBody) && !(p.transient && ctx.dropTransient))
  const b = keep.length === parts.length ? full : K.layer(keep, n)
  if (pk > 0) scale(b, dbToGain(peakDb) / pk)
  const f = Math.min(n, sec(0.005))
  for (let i = 0; i < f; i++) { const g = i / f; b.L[n - 1 - i] *= g; b.R[n - 1 - i] *= g }
  b.meta = { ...meta, body: !ctx.dropBody, ...hookDuck(ctx) }
  return b
}
/**
 * The B3 clearance's broadband part (clearance.mjs): a meta.duck only when the solver needs more than the §5 table (the
 * engine applies the table otherwise). The engine scales a duck by clamp(gain / 0.7, 0.3, 1.2), so the depth is
 * pre-divided. Solo renders (ctx.__est: the fader's estimate, units.mjs) carry no clearance.
 */
function hookDuck(ctx) {
  const c = ctx.cue
  if (ctx.__est || !isB3(ctx.tl, c)) return {}
  const r = clearFor(ctx.tl).get(c.i)
  if (!r || r.fixed || r.broad <= r.table + 0.05) return {}
  const scale = Math.min(1.2, Math.max(0.3, c.gain / 0.7))
  return { duck: { depth: r.broad / scale, hold: r.hold, release: r.release } }
}
/** a noise click: `ms` of seeded white noise, linear decay, through a band-pass (bp) or a high-pass (hp) */
function click(rng, { ms = 1.2, bp = null, q = 1.5, hp = null, lp = null } = {}) {
  const m = Math.max(2, sec(ms / 1000)), n = m * 3
  const x = noise(n, rng)
  if (bp) svf(x, 'bp', bp, { q }); else if (hp) { svf(x, 'hp', hp); svf(x, 'hp', hp) }
  if (lp) svf(x, 'lp', lp)
  for (let i = 0; i < n; i++) x[i] *= Math.max(0, 1 - i / m)
  return x
}
/** a sine ping: A `a` s, τ, optional exponential glide of `glide` semitones over `gt` s, optional vibrato */
function ping(f, n, { a = 0.0005, tau = 0.009, glide = 0, gt = 0.06, vib = 0, vibSt = 0, vibTau = 0.15, shape = 'sine' } = {}) {
  const fq = i => {
    const t = i / SR
    let x = f
    if (glide) x *= Math.pow(2, (glide * Math.min(1, t / gt)) / 12)
    if (vib) x *= Math.pow(2, (vibSt * Math.exp(-t / vibTau) * Math.sin(TAU * vib * t)) / 12)
    return x
  }
  const y = osc(shape, n, fq)
  const e = expEnv(n, tau, a)
  for (let i = 0; i < n; i++) y[i] *= e[i]
  return y
}
/** decorrelated stereo noise with a mid/side width (0 = mono, 1 = fully decorrelated) */
function wideNoise(n, rng, width, fn) {
  const L = noise(n, rng), R = noise(n, rng)
  if (fn) { fn(L); fn(R) }
  for (let i = 0; i < n; i++) { const m = 0.5 * (L[i] + R[i]), s = 0.5 * (L[i] - R[i]) * width; L[i] = m + s; R[i] = m - s }
  return { L, R }
}
/** the thud / reveal / step body: a sine diving from f·2^(dive/12) to f (τ glide), A 1 ms, τ, tanh drive, DC block */
function diveBody(f, n, { dive = 12, glide = 0.015, tau = 0.12, drive = 1.8 } = {}) {
  const x = osc('sine', n, i => f * Math.pow(2, (dive * Math.exp(-i / (glide * SR))) / 12))
  const e = expEnv(n, tau, 0.001)
  for (let i = 0; i < n; i++) x[i] *= e[i]
  saturate(x, drive); dcBlock(x, 20)
  return x
}
/** FM bell (ratio 3.5, index I0 -> 0.3 over 180 ms, Carson clamp at 18 kHz), A 1 ms, τ */
function bell(midi, n, { I0 = 1.4, tau = 0.28, cents = 0 } = {}) {
  const f = mtof(midi) * centsUp(cents)
  const idx = i => 0.3 + (I0 - 0.3) * Math.exp(-i / (0.06 * SR))
  const x = fm(n, f, { ratio: 3.5, index: idx, fmax: 18000 })
  const e = expEnv(n, tau, 0.001)
  for (let i = 0; i < n; i++) x[i] *= e[i]
  return x
}
/** a reversed exponential noise swell of `len` s ending at its last sample (the reveal pre-roll) */
function revSwell(rng, len, { bp = 4000, q = 0.7 } = {}) {
  const n = sec(len)
  const s = wideNoise(n, rng, 0.5, x => svf(x, 'bp', bp, { q }))
  for (let i = 0; i < n; i++) { const g = Math.exp(-(n - 1 - i) / (0.06 * SR)) * Math.min(1, (n - 1 - i) / sec(0.002) + 0.0); s.L[i] *= g; s.R[i] *= g }
  // fade-in over the first 2 ms (anti-click); the last sample lands at the cue time
  const a = sec(0.002); for (let i = 0; i < a; i++) { s.L[i] *= i / a; s.R[i] *= i / a }
  return s
}

const raw = {
  // ---- tick: a soft beat on a number already on screen (chord tone D6-A6; clock trains: tick-tock 5th / root)
  tick(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord
    let m, peak = -14
    if (ctx.train) { m = ctx.train.index % 2 === 0 ? T.placePc(ch.root + 7, 84) : T.placePc(ch.root, 84); peak = -17 }
    else { const tones = tonesIn(ctx, 86, 93); m = tones.length ? rot(tones, cue.n) : T.placePc(ch.root, 86) }
    m = ctx.claim(m)
    const pan = (cue.n % 2 ? 1 : -1) * 0.12, n = sec(0.04)
    const p = ping(mtof(m) * centsUp(r.bi() * 5), n, { a: 0.0005, tau: 0.009 })
    const c = click(r, { ms: 1.2, bp: 6500 * (1 + r.bi() * 0.08), q: 1.5 })
    return finish([{ buf: p, pan }, { buf: c, pan, gain: 0.55, transient: true }], n, peak, ctx, { pitches: [m], pan })
  },

  // ---- thud: a hard cut lands. click / sine dive to the chord root (MIDI 38-45) / slap; the card variant (L + 0.10)
  //      keeps transient, slap and air only (the logo owns the low end)
  thud(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord
    const root = rootNear(ch, 38, 45), n = sec(0.45)
    const glide = 0.015 * (cue.n % 2 ? 0.88 : 1.12) * (1 + r.bi() * 0.05)
    const body = diveBody(mtof(root), n, { dive: 12, glide, tau: 0.12 * (1 + r.bi() * 0.06), drive: 1.8 })
    const ck = click(r, { ms: 3, hp: 2000 })
    const slapPan = (cue.n % 2 ? 1 : -1) * 0.3
    const slap = wideNoise(n, r, 0.6, x => svf(x, 'bp', 1200 * (1 + r.bi() * 0.08), { q: 0.8 }))
    const se = expEnv(n, 0.025, 0.0005)
    const [gl, gr] = panGains(slapPan)
    for (let i = 0; i < n; i++) { slap.L[i] *= se[i] * gl * 1.4; slap.R[i] *= se[i] * gr * 1.4 }
    const parts = [
      { buf: body, body: true },
      { buf: ck, gain: dbToGain(-10) * 2.5, transient: true },
      { buf: slap, gain: dbToGain(-8) * 1.6 },
    ]
    if (ctx.dropBody) {
      const air = wideNoise(n, r, 0.8, x => { svf(x, 'hp', 6000) })
      const ae = expEnv(n, 0.05, 0.001)
      for (let i = 0; i < n; i++) { air.L[i] *= ae[i]; air.R[i] *= ae[i] }
      parts.push({ buf: air, gain: dbToGain(-16) })
    }
    return finish(parts, n, -6, ctx, { pitches: ctx.dropBody ? [] : [root], pan: 0 })
  },

  // ---- ding: a count lands. FM bell pair, the two highest distinct chord tones in MIDI 84-93 (card: F#6 + A6)
  ding(cue, ctx) {
    const r = ctx.rng, n = sec(0.8)
    let a, b
    if (cue.inCard) { a = 90; b = 93 } else {
      const tones = [...new Set(tonesIn(ctx, 84, 93))]
      a = tones[tones.length - 2] ?? 86; b = tones[tones.length - 1] ?? 93
      if (r() < 1 / 3) b = a + 12
    }
    a = ctx.claim(a); b = ctx.claim(b)
    const n1 = bell(a, n, { I0: 1.4 * (1 + r.bi() * 0.1), tau: 0.28, cents: r.bi() * 4 })
    const n2 = bell(b, n, { I0: 1.4 * (1 + r.bi() * 0.1), tau: 0.28, cents: r.bi() * 4 })
    // the strike (note 1) carries the -10 dBFS peak; note 2 answers 70 ms later at 0.75, and where it lands on note 1's
    // ring the pair may reach -9.1 dBFS (inside the +1 dB of U3) — normalising the pair instead would sink the strike
    // 3-4 dB under its level, which is what B3 measures
    const one = finish([{ buf: n1, pan: -0.15 }], n, -10, ctx)
    const k = peakOf(one) / Math.max(1e-12, peakOf(K.layer([{ buf: n1, pan: -0.15 }], n)))
    const pair = K.layer([{ buf: n1, pan: -0.15, gain: k }, { buf: n2, pan: 0.15, at: 0.07, gain: 0.75 * k }], n)
    const pk = peakOf(pair), cap = dbToGain(-9.1)
    if (pk > cap) scale(pair, cap / pk)
    return finish([{ buf: pair }], n, 20 * Math.log10(Math.min(pk, cap)), ctx, { pitches: [a, b], pan: 0 })
  },

  // ---- roll: the odometer. Click train (accelerates, then settles; peak 22/s), each click with a tri blip walking up
  //      the chord from the root in octave 5 to its octave; the last click +4 dB. Card: D6 E6 F#6 A6, ending on A6
  roll(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.1, cue.dur || 1.5), n = sec(dur + 0.05)
    const b = stereo(n)
    const times = []
    let t = 0
    while (t < dur - 0.03) { times.push(t); const p = t / dur; t += (1 / (22 * (0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, p * 1.15))))) * (1 + r.bi() * 0.06) }
    times.push(dur)
    const ch = ctx.chord, root5 = T.placePc(ch.root, 72)
    const walk = cue.inCard ? [86, 88, 90, 93] : T.tonesIn(ch, root5, root5 + 12)
    const K_ = times.length, dir = cue.n % 2 ? -1 : 1
    const blipN = sec(0.035), clickHp = 3000 * (1 + r.bi() * 0.08)
    times.forEach((tc, k) => {
      const last = k === K_ - 1
      const g = last ? dbToGain(4) : 1
      const m = cue.inCard ? walk[(((k - (K_ - 1)) % 4) + 4 + 3) % 4] : walk[Math.min(walk.length - 1, Math.round((k / Math.max(1, K_ - 1)) * (walk.length - 1)))]
      const c = click(r, { ms: 1.5, hp: clickHp })
      const bl = ping(mtof(m), blipN, { a: 0.0004, tau: 0.006, shape: 'tri' })
      const pan = dir * (-0.35 + 0.7 * tc / dur)
      const [gl, gr] = panGains(pan)
      const i0 = sec(tc), bg = dbToGain(-4)
      for (let i = 0; i < c.length && i0 + i < n; i++) { b.L[i0 + i] += c[i] * g * gl; b.R[i0 + i] += c[i] * g * gr }
      for (let i = 0; i < bl.length && i0 + i < n; i++) { b.L[i0 + i] += bl[i] * g * bg * 1.6 * gl; b.R[i0 + i] += bl[i] * g * bg * 1.6 * gr }
    })
    return finish([{ buf: b }], n, -16, ctx, { pitches: walk, pan: 0 })
  },

  // ---- pop: a few objects land. 1 ms click / sine gliding up an octave in 60 ms from a chord tone in octave 5 (τ 60 ms).
  //      The card pop (L - 0.30) is transient and air only, no pitch, -6 dB: the logo's n1 carries the pitch
  pop(cue, ctx) {
    const r = ctx.rng, n = sec(0.3)
    const pan = r.bi() * 0.25
    if (cue.inCard) {
      const c = click(r, { ms: 1, hp: 3000 })
      const air = wideNoise(n, r, 0.7, x => { svf(x, 'hp', 4500); svf(x, 'lp', 12000) })
      const ae = expEnv(n, 0.03, 0.001)
      for (let i = 0; i < n; i++) { air.L[i] *= ae[i]; air.R[i] *= ae[i] }
      return finish([{ buf: c, pan, transient: true }, { buf: air, gain: 0.6 }], n, -18, ctx, { pitches: [], pan })
    }
    const tones = tonesIn(ctx, 72, 83)
    const m = ctx.claim(tones.length ? rot(tones, cue.n) : T.placePc(ctx.chord.root, 72))
    // τ 60 ms rather than the table's 25 ms: at 25 ms the octave glide is over before it is heard, and a 50 ms window
    // (B3) holds 5 dB less of the pop
    const g = ping(mtof(m) * centsUp(r.bi() * 6), n, { a: 0.001, tau: 0.06, glide: 12, gt: 0.06 })
    const c = click(r, { ms: 1, hp: 2500 })
    return finish([{ buf: g, pan }, { buf: c, pan, gain: 0.35, transient: true }], n, -12, ctx, { pitches: [m], pan })
  },

  // ---- cash: the money total lands. A bell strike at +0 (root, octave 7) and 5 mechanical clicks 22 ms apart / FM bells
  //      root + 5th (octave 6) at +100 and +130 ms / 12 coin pings on chord tones in MIDI 98-105 over 0.10-0.50 s
  cash(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord, n = sec(1.0)
    const parts = []
    // the mechanical clicks: HP 4 kHz noise bursts that ring τ 9 ms (a ratchet "krrk", not 2 ms ticks: the drawer has to
    // read in the first 50 ms, B3, before the bells at +100 ms)
    for (let k = 0; k < 5; k++) {
      const soft = k === 0 && ctx.dropTransient
      const cn = sec(0.06), c = noise(cn, r)
      svf(c, 'hp', 4000 * (1 + r.bi() * 0.06)); svf(c, 'bp', 6500 * (1 + r.bi() * 0.08), { q: 0.9 })
      const ce = expEnv(cn, 0.009, 0.0003)
      for (let i = 0; i < cn; i++) c[i] *= ce[i]
      // each click strikes the drawer's metal: a damped ring above 4 kHz (seeded ±3%), so it reads as mechanical
      const ring = D_modal(cn, 4200 * (1 + r.bi() * 0.03), [{ ratio: 1, amp: 1, tau: 0.016 }, { ratio: 1.41, amp: 0.6, tau: 0.011 }, { ratio: 1.83, amp: 0.35, tau: 0.008 }])
      for (let i = 0; i < cn; i++) c[i] = c[i] * 0.5 + ring[i] * 1.1
      parts.push({ buf: c, at: k * 0.022, gain: (1 - k * 0.125) * (soft ? 0.35 : 1) * 0.8, pan: (k % 2 ? 0.08 : -0.08) })
    }
    const a = ctx.claim(T.placePc(ch.root, 84)), b5 = ctx.claim(T.placePc(ch.root + 7, 84))
    // the drawer bell's first strike at +0 ms: a short bright FM "tink" on the root in octave 7 (MIDI 94-105, τ 70 ms), so
    // the cue carries its own first 50 ms (B3) instead of the music ducking deep for a ratchet; the ratchet and the
    // "ching" pair at +100 / +130 ms follow it
    const st = ctx.claim(T.placePc(ch.root, 94))
    parts.push({ buf: bell(st, sec(0.4), { I0: 2.0 * (1 + r.bi() * 0.1), tau: 0.07 }), at: 0, pan: r.bi() * 0.1, gain: 2.4 })
    parts.push({ buf: bell(a, sec(0.9), { I0: 1.2 * (1 + r.bi() * 0.1), tau: 0.35 }), at: 0.10, pan: -0.12, gain: 1.3 })
    parts.push({ buf: bell(b5, sec(0.87), { I0: 1.2 * (1 + r.bi() * 0.1), tau: 0.35 }), at: 0.13, pan: 0.12, gain: 1.15 })
    const coins = tonesIn(ctx, 98, 105)
    for (let k = 0; k < 12; k++) {
      const m = coins.length ? coins[r.int(coins.length)] : 98
      parts.push({ buf: ping(mtof(m) * centsUp(r.bi() * 8), sec(0.2), { a: 0.0005, tau: 0.03 }), at: 0.10 + r() * 0.40, pan: r.bi() * 0.6, gain: 0.22 })
    }
    return finish(parts, n, -9, ctx, { pitches: [st, a, b5], pan: 0 })
  },

  // ---- hit: the stadium impact (the biggest number). 4 ms full-band burst / body diving to the root (D2 in the card),
  //      drive 2.5, sub an octave down / wide crash τ 0.9 s
  hit(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord, n = sec(1.6)
    const root = cue.inCard ? 38 : rootNear(ch, 38, 45)
    const body = diveBody(mtof(root), n, { dive: 12, glide: 0.02, tau: 0.35, drive: 2.5 })
    const subN = osc('sine', n, mtof(root - 12))
    const se = expEnv(n, 0.25, 0.002)
    for (let i = 0; i < n; i++) subN[i] *= se[i]
    onePoleHP(subN, 30); onePoleHP(subN, 30)
    const bs = noise(sec(0.004), r)
    for (let i = 0; i < bs.length; i++) bs[i] *= 1 - i / bs.length
    const ctau = 0.9 * (1 + r.bi() * 0.05)
    const cr = wideNoise(n, r, 0.7, x => { svf(x, 'hp', 3500); svf(x, 'lp', 13000) })
    const mt = K.metal(n, { ratio: 2.3 * (1 + r.bi() * 0.02), bp: 8000, hp: 4000, q: 0.8 })
    const ce = expEnv(n, ctau, 0.001)
    for (let i = 0; i < n; i++) { cr.L[i] = (cr.L[i] + mt[i] * 0.6) * ce[i]; cr.R[i] = (cr.R[i] + mt[i] * 0.6) * ce[i] }
    // the band guard's P-stack shelf (bands.mjs pay16): a hit at P takes it on its crash layer, the source of most of a
    // short body's 16 kHz octave
    const sh = !cue.inCard && ctx.atP && ctx.tl ? (leversFor(ctx.tl)?.pay16 || 0) : 0
    if (sh) for (const x of [cr.L, cr.R]) biquad(x, biquadCoefs('highshelf', 10000, { gainDb: sh }))
    const parts = [
      { buf: body, body: true },
      { buf: subN, gain: dbToGain(-8), body: true },
      { buf: bs, gain: dbToGain(-6), transient: true },
      { buf: cr, gain: dbToGain(-6) * 0.9 },
    ]
    return finish(parts, n, -3, ctx, { pitches: ctx.dropBody ? [] : [root], pan: 0 })
  },

  // ---- reveal: the verdict. 180 ms reversed-noise pre-roll / thud body + root, 3rd, 5th FM bells (octaves 5-6)
  //      arpeggiated 0, 40, 80 ms / a 9 kHz "light-up" shimmer
  reveal(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord, pre = sec(0.18), n = pre + sec(1.4)
    const root = rootNear(ch, 38, 45)
    const body = diveBody(mtof(root), sec(0.6), { dive: 12, glide: 0.015, tau: 0.12, drive: 1.8 })
    const r5 = T.placePc(ch.root, 74), third = T.toneAbove(ch, r5), fifth = T.placePc(ch.root + 7, r5)
    const bells = [r5, third, fifth].map(m => ctx.claim(m))
    const bb = bells.map(m => bell(m, sec(1.3), { I0: 1.3 * (1 + r.bi() * 0.1), tau: 0.6 }))
    const sh = wideNoise(sec(1.2), r, 0.6, x => { svf(x, 'bp', 9000, { q: 1.4 }) })
    for (let i = 0; i < sh.L.length; i++) { const t = i / SR; const g = Math.min(1, t / 0.03) * Math.exp(-Math.max(0, t - 0.03) / 0.3); sh.L[i] *= g; sh.R[i] *= g }
    const parts = [
      { buf: revSwell(r, 0.18, { bp: 3500 }), gain: dbToGain(-14) * 1.4 },
      { buf: body, at: 0.18, gain: dbToGain(-3), body: true },
      ...bb.map((buf, k) => ({ buf, at: 0.18 + k * 0.04, pan: [-0.2, 0, 0.2][k], gain: 0.62 })),
      { buf: sh, at: 0.18, gain: 0.32 },
    ]
    const b = finish(parts, n, -6, ctx, { pitches: bells, pan: 0 })
    b.offset = pre
    return b
  },

  // ---- riser: noise BP 300 Hz -> 9 kHz (+20 dB, linear in dB), widening 10% -> 80%, plus three Shepard saws A2/A3/A4
  //      gliding +12 st (each a raised-cosine bell over log-frequency), LP 4 kHz; ends on A, cut in 5 ms at t + dur
  riser(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.2, cue.dur || 2), n = sec(dur)
    const nz = K.noiseSweep(r, dur, { f0: 300, f1: 9000, q: 1.2, window: 'rise', riseDb: 20 })
    for (const ch of [nz.L, nz.R]) svf(ch, 'lp', 12000)
    const sw = mono(n)
    for (const m0 of [45, 57, 69]) {
      const f = i => mtof(m0) * Math.pow(2, i / n)
      const x = osc('saw', n, f, { phase: r() })
      for (let i = 0; i < n; i++) {
        const pos = Math.log2(f(i) / mtof(45)) / 3
        sw[i] += x[i] * 0.5 * (1 - Math.cos(TAU * clamp(pos, 0, 1))) * Math.pow(10, (14 * (i / n - 1)) / 20)
      }
    }
    svf(sw, 'lp', 4000, { poles: 4 })
    for (let i = 0; i < n; i++) {
      const w = 0.1 + 0.7 * i / n, m = 0.5 * (nz.L[i] + nz.R[i]), s = 0.5 * (nz.L[i] - nz.R[i]) * w
      nz.L[i] = m + s + sw[i] * 0.22; nz.R[i] = m - s + sw[i] * 0.22
    }
    const b = finish([{ buf: nz }], n, -8, ctx, { pitches: [], pan: 0 })
    return b
  },

  // ---- swipe: a lead change. Noise BP 2 -> 7 kHz over dur, sin window, panned across ±40% (direction by n)
  swipe(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.05, cue.dur || 0.22)
    const w = K.noiseSweep(r, dur, { f0: 2000 * (1 + r.bi() * 0.08), f1: 7000 * (1 + r.bi() * 0.08), q: 1.1, window: 'sin', stereo: false, floor: 0.08 })
    const dir = cue.n % 2 ? -1 : 1
    return finish([{ buf: K.panSweep(w, -0.4 * dir, 0.4 * dir) }], w.length, -16, ctx, { pitches: [], pan: 0 })
  },

  // ---- whoosh: a race starts. Noise BP 500 Hz -> 4 kHz (peak at 60%) -> 800 Hz, plus LP 300 Hz air; ±50% sweep.
  //      Its window's floor is -16 dB re its peak (the swipe's is -22): the sweep starts at 500 Hz, where the band-pass
  //      rings up slowest, and at -22 dB the quietest whoosh of the set (04a's, gain 0.3 at t = 0) first passed -60
  //      dBFS 1.94 ms after its cue (B4: 2 ms). At -16 dB it does at 1.2 ms; the floor only holds over the window's
  //      first 13 ms (2026-10-13)
  whoosh(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.08, cue.dur || 0.35)
    const w = K.noiseSweep(r, dur, { f0: 500, f1: 4000, f2: 800, peakAt: 0.6, q: 0.9, window: 'sin', stereo: false, floor: WHOOSH_FLOOR })
    const air = noise(w.length, r); onePoleLP(air, 300); onePoleLP(air, 300)
    for (let i = 0; i < w.length; i++) w[i] += air[i] * dbToGain(-10) * 3 * Math.sin(Math.PI * i / w.length)
    const dir = cue.n % 2 ? -1 : 1
    return finish([{ buf: K.panSweep(w, -0.5 * dir, 0.5 * dir) }], w.length, -14, ctx, { pitches: [], pan: 0 })
  },

  // ---- buzz: struck out. Two PolyBLEP squares at D3 and Eb3 (the minor 2nd beats at 8.7 Hz), LP 1.8 kHz, A 5 ms, τ 120 ms
  buzz(cue, ctx) {
    const n = sec(0.38)
    const x = osc('square', n, 146.83), y = osc('square', n, 155.56)
    for (let i = 0; i < n; i++) x[i] = 0.5 * (x[i] + y[i])
    svf(x, 'lp', 1800)
    const e = expEnv(n, 0.12, 0.005)
    for (let i = 0; i < n; i++) x[i] *= e[i]
    return finish([{ buf: x }], n, -12, ctx, { pitches: [50, 51], pan: 0 })
  },

  // ---- not emitted by this look (kept for completeness, bible §5): step = the thud body at -12 dB; boing = a pop with
  //      an 11 Hz vibrato; type = a tick train at 14/s
  step(cue, ctx) {
    const r = ctx.rng, n = sec(0.2)
    const root = rootNear(ctx.chord, 38, 45)
    const body = diveBody(mtof(root), n, { dive: 12, glide: 0.012 * (1 + r.bi() * 0.1), tau: 0.05, drive: 1.5 })
    const c = click(r, { ms: 1, lp: 3000 + r() * 800 })
    const pan = cue.n % 2 ? 0.1 : -0.1
    return finish([{ buf: body, pan, body: true }, { buf: c, pan, gain: 0.3, transient: true }], n, -12, ctx, { pitches: ctx.dropBody ? [] : [root], pan })
  },
  boing(cue, ctx) {
    const r = ctx.rng, n = sec(0.4)
    const tones = tonesIn(ctx, 72, 83)
    const m = ctx.claim(tones.length ? rot(tones, cue.n) : 74)
    const g = ping(mtof(m) * centsUp(r.bi() * 6), n, { a: 0.001, tau: 0.09, glide: 12, gt: 0.25, vib: 11, vibSt: 1, vibTau: 0.15 })
    const pan = r.bi() * 0.2
    return finish([{ buf: g, pan }], n, -12, ctx, { pitches: [m], pan })
  },
  type(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.1, cue.dur || 0.6), n = sec(dur + 0.06)
    const b = stereo(n)
    const count = Math.max(2, Math.round(dur * 14))
    const tones = tonesIn(ctx, 86, 93)
    for (let k = 0; k < count; k++) {
      const at = k === 0 ? 0 : clamp(k / 14 + r.bi() * 0.012, 0.005, dur - 0.01)
      const m = tones.length ? rot(tones, k + cue.n) : 86
      const p = ping(mtof(m), sec(0.04), { a: 0.0005, tau: 0.008 })
      const c = click(r, { ms: 1, bp: 6000 * (1 + r.bi() * 0.08), q: 1.5 })
      const pan = (k % 2 ? 1 : -1) * 0.1, [gl, gr] = panGains(pan), g = 0.6 + 0.4 * r()
      const i0 = sec(at)
      for (let i = 0; i < p.length && i0 + i < n; i++) { const v = (p[i] + (i < c.length ? c[i] * 0.5 : 0)) * g; b.L[i0 + i] += v * gl; b.R[i0 + i] += v * gr }
    }
    return finish([{ buf: b }], n, -16, ctx, { pitches: [], pan: 0 })
  },
}

// ---------------------------------------------------------------- the SFX fader (B1, balance.mjs)
// The bed table (cal.mjs, measured by calibrate.mjs on all 15, pre-master, before any duck, at the bus's 0 dB: the
// energy curve is added back here, so a 1-bar DROP's +3 dB or an afterglow is in the estimate)
//   BEDS  the music's power over whole sections (the music-stem model of balance.mjs)
export const bedSec = (tl, t) => {
  const bar = tl.barAt(t + 1e-6)
  return lookup(CAL.BEDS, tl.sectionAt(t + 1e-6).name, bar ? bar.energy : 3, -18) + evalDb(curveFor(tl), t + 0.005)
}
/** the teaser's fader plan { trim, offset, S, M } (cached per timeline) */
export function planFor(tl) {
  return balancePlan(tl, {
    renderCue: c => raw[c.kind](c, cueCtx(tl, c)),
    // the music model sees each cue's broadband duck as the clearance solves it under that fader setting
    extraDuck: (c, trim) => {
      if (!isB3(tl, c)) return null
      const r = solveAt(tl, trim, 0).get(c.i)
      if (!r || r.fixed || r.broad <= r.table + 0.05) return null
      return { depth: r.broad / Math.min(1.2, Math.max(0.3, c.gain / 0.7)), hold: r.hold, release: r.release }
    },
    bedAt: t => bedSec(tl, t),
  })
}
/**
 * The cues' power over the body, K-weighted and ungated (LUFS-like, pre-master): every cue at its final level (the
 * fader's trim, the clearance's lift, the engine's cluster cap after both), summed over [0, base]. The master gain
 * model (logo.mjs gainEst) adds it to the music's: in a short, busy body the cues carry a real share of the mix, and the
 * master gain comes out that much lower than the music alone predicts (BIBLE §11.2 refit, 2026-10-13). Cached.
 */
const BODYP = new WeakMap()
export function sfxBodyPower(tl) {
  if (BODYP.has(tl)) return BODYP.get(tl)
  const p = planFor(tl), res = clearFor(tl), P = tl.anchors.P.t
  const N = Math.max(1, Math.round(tl.base * SR))
  const lvl = c => Math.pow(10, (cueTrim(c, Math.abs(c.t - P) <= 0.015, p.trim) + (isB3(tl, c) ? (res.get(c.i)?.lift || 0) : 0)) / 20) * c.gain
  const bufs = new Map()
  for (const c of tl.cues) {
    if (c.inCard || c.t >= tl.base) continue
    const b = raw[c.kind](c, cueCtx(tl, c))
    if (b) bufs.set(c.i, { b: b.L ? b : { L: b, R: b }, off: b.offset || 0, g: lvl(c) })
  }
  // §8.4.3 after the trims, as the engine caps
  for (const cl of tl.clusters) {
    const mem = cl.members.filter(i => bufs.has(i))
    if (mem.length < 2) continue
    const at = i => Math.round(tl.cues[i].t * SR) - bufs.get(i).off
    const a0 = Math.min(...mem.map(at)), a1 = Math.max(...mem.map(i => at(i) + bufs.get(i).b.L.length))
    const L = new Float64Array(a1 - a0), R = new Float64Array(a1 - a0)
    let top = 0
    for (const i of mem) { const x = bufs.get(i); let pk = 0; for (let j = 0; j < x.b.L.length; j++) { L[at(i) - a0 + j] += x.b.L[j] * x.g; R[at(i) - a0 + j] += x.b.R[j] * x.g; pk = Math.max(pk, Math.abs(x.b.L[j]), Math.abs(x.b.R[j])) } top = Math.max(top, pk * x.g) }
    let pk = 0
    for (let j = 0; j < L.length; j++) pk = Math.max(pk, Math.abs(L[j]), Math.abs(R[j]))
    const cap = top * Math.pow(10, 1.5 / 20)
    if (pk > cap) for (const i of mem) bufs.get(i).g *= cap / pk
  }
  const sum = { L: new Float64Array(N), R: new Float64Array(N) }
  for (const [i, x] of bufs) {
    const at = Math.round(tl.cues[i].t * SR) - x.off
    for (let j = Math.max(0, -at); j < x.b.L.length && at + j < N; j++) { sum.L[at + j] += x.b.L[j] * x.g; sum.R[at + j] += x.b.R[j] * x.g }
  }
  let e = 0
  for (const ch of ['L', 'R']) { const y = kfilter(sum[ch]); for (let j = 0; j < N; j++) e += y[j] * y[j] }
  const v = -0.691 + 10 * Math.log10(Math.max(1e-30, e / N))
  BODYP.set(tl, v)
  return v
}
/** the clearance solved under a fader setting (cached per timeline and setting) */
const SOLVES = new WeakMap()
function solveAt(tl, trim, offset) {
  const m = SOLVES.get(tl) || SOLVES.set(tl, new Map()).get(tl)
  const key = `${trim.toFixed(5)}|${offset.toFixed(4)}`
  if (!m.has(key)) m.set(key, solve(tl, { trim: c => cueTrim(c, Math.abs(c.t - tl.anchors.P.t) <= 0.015, trim), offset, giveWay: GIVE_WAY, levers: leversFor(tl) }))
  return m.get(key)
}
/** forget the solved clearances (compose() re-budgets the anchor stabs once the plan is known) */
export function resetSolves(tl) { SOLVES.delete(tl) }
/** the teaser's clearance (clearance.mjs solve) under its fader plan: Map(cue index -> levers) */
export function clearFor(tl) { const p = planFor(tl); return solveAt(tl, p.trim, p.offset) }

/** the SFX ctx as the engine builds it (engine.mjs renderMix), for solo renders: the fader estimate and units.mjs */
export function cueCtx(tl, c, claims = new Map(), { dropTransient = false } = {}) {
  const P = tl.anchors.P.t, V = tl.anchors.V ? tl.anchors.V.t : null, L = tl.card ? tl.card.L : null
  const cl = c.cluster ? { ...c.cluster, members: tl.clusters[c.cluster.id].ranked } : null
  return {
    tl, cue: c, n: c.n, i: c.i, rng: c.inCard ? rngFor('em-card', `${c.kind}:${tl.cues.filter(x => x.inCard && x.kind === c.kind && x.i < c.i).length}`) : tl.stream(`sfx:${c.i}`), chordAt: tl.chordAt, keyAt: tl.keyAt, beatAt: tl.beatAt,
    chord: tl.chordAt(c.t), bpm: tl.bpmAt(c.t), beatLen: tl.beatLen(c.t), train: c.train || null, cluster: cl, inCard: c.inCard,
    isAnchor: tl.isAnchor(c.t, 0.015), atP: Math.abs(c.t - P) <= 0.015, atV: V != null && Math.abs(c.t - V) <= 0.015, atL: L != null && Math.abs(c.t - L) <= 0.015,
    L, P, V, dropBody: !!(cl && cl.rank > 0) || (L != null && c.inCard && Math.abs(c.t - L) <= 0.15), dropTransient,
    claim(m) { if (!cl) return m; const set = claims.get(cl.id) || claims.set(cl.id, new Set()).get(cl.id); let x = m; while (set.has(x)) x = T.toneAbove(tl.chordAt(c.t), x); set.add(x); return x },
    D: null, T, __est: true,
  }
}
export { raw as rawSfx }

export const sfx = Object.fromEntries(Object.entries(raw).map(([kind, fn]) => [kind, (cue, ctx) => {
  // the fader (balance.mjs, cueTrim): a cut spares the soft cues under gain 0.7 and gives the payoff cluster a third;
  // a lift reaches the event cues and the payoff, not the ticks, rolls or dings
  // the end card is the brand: its cues use a constant stream, so the card sounds the same in every teaser
  if (cue.inCard) ctx.rng = rngFor('em-card', `${cue.kind}:${ctx.tl.cues.filter(c => c.inCard && c.kind === cue.kind && c.i < cue.i).length}`)
  const p = ctx.__est ? null : planFor(ctx.tl)
  // the clearance may lift a cue it cannot clear otherwise (the hook's frame-1 count, the verdict: clearance.mjs)
  const lift = p && isB3(ctx.tl, cue) ? (clearFor(ctx.tl).get(cue.i)?.lift || 0) : 0
  const trim = (p ? cueTrim(cue, ctx.atP, p.trim) : 0) + lift
  ctx.sfxTrim = trim
  ctx.bedOffset = p ? p.offset : 0
  const b = fn(cue, ctx)
  if (b && trim) scale(b, dbToGain(trim))
  if (b && b.meta) { b.meta.trimDb = +trim.toFixed(2); if (lift) b.meta.liftDb = +lift.toFixed(2) }
  // the reverb sends (sendsFor): the payoff's hall budget and the band guard's dry bells
  const sd = b && b.meta && !ctx.__est ? sendsFor(ctx.tl, cue, ctx.atP) : null
  if (sd) b.meta.sends = sd
  return b
}]))
/** the whoosh's window floor (re its peak): see whoosh() */
export const WHOOSH_FLOOR = 0.16
/**
 * A cue's reverb sends when they differ from mix.sfxSends (null otherwise), as the engine reads them (meta.sends):
 *   the payoff's hall budget (PAY_SEND_DB): the cues at P send PAY_SEND_DB under their table. The SFX returns never duck
 *     (engine §8.3) and the returns bus sits +3 dB (mix.returns), so a hit at P into its -8 dB hall, with the payoff's
 *     cash and the stab's arena hall, kept the true-peak limiter working for ~0.5 s after P (06b: 2.8 % of its samples
 *     over 1 dB, A11). The payoff still rings in the stab's arena hall; its own hall blooms 4 dB lower.
 *   the dry bells of the band guard (bands.mjs, compose()): every body cue's sends move by levers.sends dB.
 * The end card's cues keep the table (the card sounds the same in every teaser).
 */
export const PAY_SEND_DB = -4
export function sendsFor(tl, c, atP) {
  if (c.inCard) return null
  const lv = leversFor(tl), d = (atP ? PAY_SEND_DB : 0) + (lv ? lv.sends || 0 : 0)
  if (!(d < -0.01)) return null
  const s0 = mix.sfxSends[c.kind] || {}
  return Object.fromEntries(Object.entries(s0).map(([k, v]) => [k, +(v + d).toFixed(2)]))
}
/** the band guard's levers per timeline (compose() sets them; null before) */
const LEVERS = new WeakMap()
export const leversFor = tl => LEVERS.get(tl) || null
export const setLevers = (tl, lv) => LEVERS.set(tl, lv)

/**
 * The body cues as the engine will play them, for the band model (bands.mjs): each through this pack's wrapper (the
 * fader's trim, the clearance's lift and broadband duck), the engine's cluster cap after them, and the duck events the
 * engine builds from them (meta.duck, else the big table at P, else the table; scaled by gain) plus the payoff duck.
 */
export function bandCues(tl) {
  const P = tl.anchors.P.t, out = []
  for (const c of tl.cues) {
    if (c.inCard || c.t >= tl.base) continue
    const b = sfx[c.kind](c, { ...cueCtx(tl, c), __est: false })
    if (b) out.push({ c, buf: b, g: c.gain, meta: b.meta || {} })
  }
  const st = b => (b.L ? b : { L: b, R: b })
  const pk = b => { let q = 0; const x = st(b); for (let i = 0; i < x.L.length; i++) q = Math.max(q, Math.abs(x.L[i]), Math.abs(x.R[i])); return q }
  for (const cl of tl.clusters) {
    const mem = out.filter(x => cl.members.includes(x.c.i))
    if (mem.length < 2) continue
    const at = x => Math.round(x.c.t * SR) - (x.buf.offset || 0)
    const a0 = Math.min(...mem.map(at)), a1 = Math.max(...mem.map(x => at(x) + st(x.buf).L.length))
    const L = new Float64Array(a1 - a0), R = new Float64Array(a1 - a0)
    for (const x of mem) { const b = st(x.buf), o = at(x) - a0; for (let j = 0; j < b.L.length; j++) { L[o + j] += b.L[j] * x.g; R[o + j] += b.R[j] * x.g } }
    let q = 0
    for (let j = 0; j < L.length; j++) q = Math.max(q, Math.abs(L[j]), Math.abs(R[j]))
    const cap = Math.max(...mem.map(x => pk(x.buf) * x.g)) * Math.pow(10, 1.5 / 20)
    if (q > cap) for (const x of mem) x.g *= cap / q
  }
  const duckEvents = []
  for (const x of out) {
    const tbl = x.meta.duck || (Math.abs(x.c.t - P) <= 0.015 && mix.duckBig[x.c.kind]) || mix.duck[x.c.kind]
    const d = Array.isArray(tbl) ? { depth: tbl[0], hold: tbl[1], release: tbl[2] } : tbl
    if (!d || !(d.depth > 0)) continue
    duckEvents.push({ t: x.c.t, depth: d.depth * Math.min(1.2, Math.max(0.3, x.c.gain / 0.7)), hold: d.hold || 0, release: d.release || 0.1, ...(['roll', 'type'].includes(x.c.kind) ? { until: x.c.t + (x.c.dur || 0), attack: 0.02 } : {}) })
  }
  if (mix.payoffDuck && mix.payoffDuck.depth > 0) duckEvents.push({ t: P, depth: mix.payoffDuck.depth, hold: mix.payoffDuck.hold ?? 0.15, release: mix.payoffDuck.release ?? 0.45 })
  return { cues: out, duckEvents }
}
