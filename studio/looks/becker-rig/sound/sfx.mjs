// Becker Rig SFX palette (sound bible §7): cartoon foley, synthesised. Rubbery, woody, bouncy, physical.
// Each renderer returns a stereo buffer at cue gain 1, normalised to its kind's peak (dBFS, pre-master); the engine
// multiplies by cue.gain. Pitched layers follow the chord (ctx.chord; D add9 in the card) and claim their pitch in a
// cluster (§8.4.2). Layers are tagged so the merge rule can drop a body (< 300 Hz) or a transient without raising the
// rest (§8.4.1, §4.6.1). Variation between consecutive cues of a kind comes from the seeded stream, the pitch rotation
// by `n` and the pan (U4).
import * as K from '../../../src/sound/kit.mjs'
import { mix } from './mix.mjs'
import * as T from '../../../src/sound/theory.mjs'
import { loudness } from '../../../src/sound/loudness.mjs'
import {
  SR, sec, mono, stereo, osc, noise, svf, onePoleLP, onePoleHP, dcBlock, saturate, expEnv, adsr, mtof, dbToGain, scale,
  peakOf, panMono, clamp,
} from '../../../src/sound/dsp.mjs'

// ---------------------------------------------------------------- helpers
/** kinds the B3 audibility check listens for (gain >= 0.4) */
export const AUDIBLE = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])
const unit = b => { const p = peakOf(b); if (p > 0) scale(b, 1 / p); return b }
const env = (x, e) => { for (let i = 0; i < x.length; i++) x[i] *= e[i] ?? 0; return x }
const rot = (arr, n) => arr[((n % arr.length) + arr.length) % arr.length]
const cents = c => Math.pow(2, c / 1200)
/** normalise the FULL layered sound to peakDb, then leave out the layers the merge rule drops (never raises the rest) */
function outLayers(parts, n, peakDb, ctx, meta = {}) {
  const full = K.layer(parts, n), pk = peakOf(full)
  const keep = parts.filter(p => !(p.body && ctx.dropBody) && !(p.transient && ctx.dropTransient) && !p.skip)
  const b = keep.length === parts.length ? full : K.layer(keep, n)
  if (pk > 0) scale(b, dbToGain(peakDb) / pk)
  b.meta = { ...meta, body: !ctx.dropBody }
  return b
}
/** a duck whose EFFECTIVE depth is `db` whatever the cue gain (the engine scales depth by clamp(gain / 0.7, 0.3, 1.2)) */
const duckFor = (cue, db, hold, rel) => [db / clamp(cue.gain / 0.7, 0.3, 1.2), hold, rel]
const thirdPc = ch => T.priorityTones(ch)[1] ?? ch.root
const fifthPc = ch => { const iv = ch.intervals.map(x => ((x % 12) + 12) % 12); const f = [7, 6, 8].find(x => iv.includes(x)); return (ch.root + (f ?? 7)) % 12 }
/** the pitch class p placed in the octave nearest to `centre` */
const nearOct = (p, centre) => { const m = T.placePc(p, Math.round(centre - 6)); return m }
/** a short band-passed or high-passed noise click with a linear decay (mono) */
const tick0 = (r, ms, o) => K.click(r, { ms, ...o })
/** sine partials (ratios, amps, taus) at f, phase from 0, attack a: mono of n samples */
function partials(n, f, list, a = 0.0005) {
  const x = mono(n), A = Math.max(1, a * SR)
  for (const [ratio, amp, tau] of list) {
    const fr = f * ratio
    if (fr >= 16000) continue
    const w = 2 * Math.PI * fr / SR, dec = Math.exp(-1 / (tau * SR))
    let e = amp, ph = 0
    for (let i = 0; i < n; i++) { x[i] += Math.sin(ph) * e * (i < A ? i / A : 1); ph += w; if (ph > 2 * Math.PI) ph -= 2 * Math.PI; e *= dec; if (e < 1e-6) break }
  }
  return x
}
/** soft-clip a buffer at its own peak (tanh drive k), keeping that peak: fattens an impact, lowers its crest */
const HIT_DRIVE = 1.5
function fatten(b, k) {
  const p = peakOf(b), meta = b.meta, off = b.offset
  if (!(p > 0)) return b
  scale(b, 1 / p)
  for (const x of b.L ? [b.L, b.R] : [b]) saturate(x, k)
  scale(b, p)
  if (meta) b.meta = meta
  if (off) b.offset = off
  return b
}
/** the card hit's momentary loudness (400 ms window, onset 200 ms in, at cue gain 1): about -7 dBFS peak */
const CARD_HIT_LU = -19.8
/** scale a buffer so its momentary loudness over [-0.2 s, +0.2 s] around its onset (the B8 window) reads `lu` */
function levelTo(b, lu) {
  const pad = sec(0.2), n = pad + sec(0.2), x = stereo(n)
  for (let i = pad; i < n; i++) { x.L[i] = b.L[i - pad] ?? 0; x.R[i] = b.R[i - pad] ?? 0 }
  const m = loudness(x).momentary[3]
  if (Number.isFinite(m)) scale(b, dbToGain(lu - m))
  return b
}
/**
 * The low pitch of each thud or body hit, worked out once per timeline in time order: the kind's own rule (thud: root,
 * or the 5th on odd n; hit: the root), but never the same pitch as the previous cue of that kind, which takes the other
 * option (thud: the 5th or root; hit: the 5th under the root). Two cues in a row on one pitch read as a copy (U4).
 */
function lowPitches(tl, kind) {
  const key = '_beckerLow_' + kind
  if (tl[key]) return tl[key]
  const map = new Map()
  let prev = null
  for (const c of tl.cues.filter(c => c.kind === kind && !c.inCard).sort((a, b) => a.t - b.t || a.i - b.i)) {
    const ch = tl.chordAt(c.t)
    let m, alt
    if (kind === 'thud') {
      const root = T.placePc(ch.root, 43), fifth = T.placePc(fifthPc(ch), 43)
      ;[m, alt] = c.n % 2 ? [fifth, root] : [root, fifth]
      m = m > 50 ? m - 12 : m; alt = alt > 50 ? alt - 12 : alt
    } else {
      m = T.rootIn(ch, 38, 45); alt = m - 5
    }
    if (prev != null && m === prev && !(kind === 'hit' && (tl.isAnchor ? tl.isAnchor(c.t, 0.015) : false))) m = alt
    map.set(c.i, m); prev = m
  }
  return (tl[key] = map)
}
/** a glock note (free-bar partials) for dings and the ka-ching */
const glockNote = (m, tauScale = 1, len = 1.0) => K.glock(m, { vel: 1, tauScale, len })

// ---------------------------------------------------------------- the kinds
const kinds = {
  /** thud (an object lands): 2 ms LP'd noise / sine diving 2.2f -> f over 40 ms, τ 70 ms (f = root, or the 5th on odd n,
   *  MIDI 43-50, never the previous thud's pitch) / "wood" BP 600 Hz Q 2, τ 30 ms, -10 dB. Peak -8 (-1.5 dB seeded), pan ±20%, room -14 */
  thud(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord, n = sec(0.3)
    let m = lowPitches(ctx.tl, 'thud').get(cue.i)
    if (m == null) { m = cue.n % 2 ? T.placePc(fifthPc(ch), 43) : T.placePc(ch.root, 43); if (m > 50) m -= 12 }
    m = ctx.claim(m)
    const f = mtof(m), tg = 0.04 / 3
    const body = osc('sine', n, i => f * Math.pow(2.2, Math.exp(-i / (tg * SR))))
    env(body, expEnv(n, 0.07 * (1 + 0.06 * r.bi()), 0.001)); saturate(body, 2.0); dcBlock(body, 25); unit(body)
    const tr = noise(sec(0.002), r); onePoleLP(tr, 4000); onePoleLP(tr, 4000)
    for (let i = 0; i < tr.length; i++) tr[i] *= 1 - i / tr.length
    unit(tr)
    const wd = noise(n, r); svf(wd, 'bp', 600 * (1 + 0.08 * r.bi()), { q: 2 }); env(wd, expEnv(n, 0.03, 0.0005)); unit(wd)
    const pan = r.bi() * 0.2
    const parts = [
      { buf: body, pan, body: true },
      { buf: tr, pan, gain: 0.45, transient: true },
      { buf: wd, pan, gain: dbToGain(-10) },
    ]
    // a strong landing (gain >= 0.4): 4.5 dB broadband (the §7 3 dB, plus 1.5 for a body in the bass's octave), the
    // rest of its clearance from compose's band-selective dip of the mids; a light one: the §7 table
    const meta = { pitches: ctx.dropBody ? [] : [m], pan }
    if (cue.gain >= 0.4 && !cue.inCard) meta.duck = duckFor(cue, 4.5, 0.05, 0.14)
    return outLayers(parts, n, -8 - 1.5 * r(), ctx, meta)
  },

  /** tick (pencil tap): 0.8 ms click / woodblock sines f and 2.71 f, τ 25 ms, plus a "presence" partial at 1.8 kHz
   *  (τ 18 ms) so the tap carries through the marimba's octave at the same peak; chord tone in MIDI 74-81, or a clock
   *  train's tick-tock A5 / D5. Peak -15.2 (the bible's -16 plus most of the U3 allowance), pan ±15% alternating,
   *  room -20 */
  tick(cue, ctx) {
    const r = ctx.rng, n = sec(0.08)
    let m = ctx.train ? (ctx.train.index % 2 === 0 ? 81 : 74) : rot(T.tonesIn(ctx.chord, 74, 81), cue.n)
    m = ctx.claim(m)
    const f = mtof(m) * cents(r.bi() * 4)
    const wood = partials(n, f, [[1, 1, 0.025], [2.71, 0.85, 0.016], [1800 / f, 0.8, 0.024]])
    const c = tick0(r, 0.8, { bp: 4000, q: 0.8 })
    // the desk under the pencil: a short low knock, 210 -> 150 Hz, τ 10 ms
    const kn = osc('sine', n, i => 150 + 60 * Math.exp(-i / sec(0.006)))
    env(kn, expEnv(n, 0.01, 0.0005))
    const pan = cue.n % 2 ? 0.15 : -0.15
    const parts = [{ buf: unit(wood), pan }, { buf: unit(kn), pan, gain: 0.3, body: true }, { buf: unit(c), pan, gain: 0.35, transient: true }]
    return outLayers(parts, n, -15.2, ctx, { pitches: [m], pan })
  },

  /** swipe (a throw, a swish): noise BP sweeping 1.2 -> 5 kHz (±8%) under a sin² bell; from 0.18 s a slide-whistle
   *  sine rising a 5th from a chord tone in octave 5, -14 dB re the noise. Peak -14, pan sweeps ±30%, room -16 */
  swipe(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.06, cue.dur || 0.22), n = sec(dur)
    const k = 1 + 0.08 * r.bi()
    const w = K.noiseSweep(r, dur, { f0: 1200 * k, f1: 5000 * k, q: 1.1, window: 'sin2', stereo: false, floor: 0.2 })
    unit(w)
    const dir = r.sign()
    const parts = [{ buf: K.panSweep(w, -0.3 * dir, 0.3 * dir) }]
    let pitches = []
    if (dur >= 0.18) {
      let m = rot(T.tonesIn(ctx.chord, 72, 83), cue.n + r.int(2))
      m = ctx.claim(m)
      const f0 = mtof(m)
      const s = osc('sine', n, i => f0 * Math.pow(1.5, Math.min(1, i / n)))
      for (let i = 0; i < n; i++) { const p = i / n; s[i] *= Math.pow(Math.sin(Math.PI * p), 2) * Math.min(1, i / sec(0.003)) }
      parts.push({ buf: unit(s), pan: 0.15 * dir, gain: dbToGain(-14) * 2.2 })
      pitches = [m, m + 7]
    }
    const lvl = -14 - 1.5 * Math.max(0, Math.log2(dur / 0.3))
    return outLayers(parts, n, lvl, ctx, { pitches, pan: 0 })
  },

  /** pop (a value pops in, a bloop): 1 ms click HP 3 kHz / sine from a chord tone in octave 5 gliding +7 st over 40 ms,
   *  τ 30 ms (the card's pop: a D6 bloop). Peak -11.1 (card -11.5), pan ±20% seeded, room -18 */
  pop(cue, ctx) {
    const r = ctx.rng, n = sec(0.11)
    let m = cue.inCard ? 86 : rot(T.tonesIn(ctx.chord, 72, 83), cue.n)
    m = ctx.claim(m)
    const f = mtof(m) * cents(r.bi() * 6)
    const fq = i => f * Math.pow(2, (7 * Math.min(1, i / sec(0.04))) / 12)
    const s = osc('sine', n, fq), o = osc('sine', n, i => 2 * fq(i)), o3 = osc('sine', n, i => 3 * fq(i))
    const e = expEnv(n, 0.03, 0.001)
    for (let i = 0; i < n; i++) s[i] = (s[i] + 0.5 * o[i] + 0.2 * o3[i]) * e[i]
    const fo = sec(0.005); for (let i = 0; i < fo; i++) s[n - 1 - i] *= i / fo
    const c = tick0(r, 1, { hp: 3000 })
    // a small "thock" under the bloop (a cork leaving the bottle): sine 240 -> 160 Hz, τ 18 ms, -8 dB
    const th = osc('sine', n, i => 160 + 80 * Math.exp(-i / sec(0.008)))
    env(th, expEnv(n, 0.018, 0.0005))
    const pan = r.bi() * 0.2
    const parts = [{ buf: unit(s), pan }, { buf: unit(th), pan, gain: 0.4, body: true }, { buf: unit(c), pan, gain: 0.45, transient: true }]
    // a bloop the B3 check listens to (gain >= 0.4): 4.5 dB broadband held 30 ms, released over 80 ms (the §7 1.5 dB
    // is for the light ones), plus compose's band-selective dip of the mids and the bass's choke: a bloop sits an octave
    // over the bass but B3 weighs it against the whole band
    const meta = { pitches: [m], pan }
    if (cue.gain >= 0.4 && !cue.inCard) meta.duck = duckFor(cue, 4.5, 0.03, 0.08)
    return outLayers(parts, n, cue.inCard ? -11.5 : -11.1, ctx, meta)
  },

  /** hit (an impact: shake and burst): 3 ms noise + 1 ms click (LP 6 kHz, -9 dB) / "punch" sine diving 4f -> f over 30 ms,
   *  f = root in MIDI 38-45, τ 160 ms (±5%), drive 2.0; "smack" noise BP 1.8 kHz Q 1, τ 40 ms, -6 dB, ±25% / room + hall.
   *  Big (at P, V or L, or gain >= 0.9 with a cash within 0.15 s): + timpani on the root and a crash (τ 1.1 s, ±70%, LP 7.5 kHz).
   *  Then a tanh 1.5 soft clip over the whole impact; peak -7.5 (-8 at P). At P and V the music already strikes its own
   *  timpani, so the SFX leaves it out (one low body);
   *  at L the logo owns the low end and the crash (the body is dropped by the card rule) */
  hit(cue, ctx) {
    const r = ctx.rng
    const cashNear = ctx.tl.cues.some(c => c.kind === 'cash' && Math.abs(c.t - cue.t) <= 0.15 + 1e-6)
    const big = ctx.atP || ctx.atV || ctx.atL || (cue.gain >= 0.9 && cashNear)
    const n = sec(big ? 1.6 : 0.6)
    const m = cue.inCard ? 38 : big ? T.rootIn(ctx.chord, 38, 45) : (lowPitches(ctx.tl, 'hit').get(cue.i) ?? T.rootIn(ctx.chord, 38, 45))
    const f = mtof(m), tg = 0.03 / 3
    const punch = osc('sine', n, i => f * Math.pow(4, Math.exp(-i / (tg * SR))))
    env(punch, expEnv(n, 0.16 * (1 + 0.05 * r.bi()), 0.0008)); saturate(punch, 2.0); dcBlock(punch, 25); unit(punch)
    const nz = noise(sec(0.003), r); for (let i = 0; i < nz.length; i++) nz[i] *= 1 - i / nz.length
    const ck = tick0(r, 1, { hp: 1500 })
    const tr = mono(Math.max(nz.length, ck.length) + sec(0.004)); for (let i = 0; i < tr.length; i++) tr[i] = (nz[i] || 0) + 0.8 * (ck[i] || 0)
    svf(tr, 'lp', 6000)                            // the burst's crack, not its fizz (AAC overshoot lives above 10 kHz)
    unit(tr)
    const smack = K.stereoNoise(sec(0.3), r, x => { svf(x, 'bp', 1800, { q: 1 }); env(x, expEnv(x.length, 0.04, 0.0005)) })
    // narrow the smack to about ±25%
    for (let i = 0; i < smack.L.length; i++) { const M = (smack.L[i] + smack.R[i]) / 2, S = (smack.L[i] - smack.R[i]) / 2 * 0.25; smack.L[i] = M + S; smack.R[i] = M - S }
    unit(smack)
    const parts = [
      // on the payoff the hit leans on slap and air rather than the punch's first cycle: less peak for the limiter to
      // shave, the same weight in the ear (the music's own timpani, kick and brass carry the low end there)
      { buf: punch, body: true, gain: ctx.atP ? 0.6 : big ? 0.8 : 1 },
      // the burst marks the onset; kept low (-9 dB, none in the card) so the hit's first millisecond is not a lone spike
      // for the limiter to shave and the AAC encoder to overshoot (A5 on the decoded file)
      { buf: tr, gain: dbToGain(-9), transient: true, skip: cue.inCard },
      { buf: smack, gain: dbToGain(-6) * (ctx.atP ? 2.2 : big ? 1.7 : 1.4) },
    ]
    if (big) {
      const tp = K.timpani(r, { vel: 1, f: mtof(cue.inCard ? 38 : T.rootIn(ctx.chord, 33, 38)), tau: 1.1 }); unit(tp)
      parts.push({ buf: tp, gain: 0.7, body: true, skip: ctx.atP || ctx.atV })
      const cr = K.crash(r, { vel: 1, tau: 1.1 * (1 + 0.05 * r.bi()), ratio: 2.6 })
      svf(cr.L, 'lp', 7500); svf(cr.R, 'lp', 7500)
      for (let i = 0; i < cr.L.length; i++) { const M = (cr.L[i] + cr.R[i]) / 2, S = (cr.L[i] - cr.R[i]) / 2 * 0.7; cr.L[i] = M + S; cr.R[i] = M - S }
      unit(cr)
      parts.push({ buf: cr, gain: ctx.atP ? 0.65 : 0.5 })
    }
    const meta = { pitches: ctx.dropBody ? [] : [m], pan: 0 }
    // on P the hit ducks the band exactly as deep and as long as the payoff duck (9 dB, hold 150 ms, release 0.3 s):
    // impact first, then the fanfare's "TA" and the DROP bloom back. A big hit elsewhere: the §7 big duck (10 dB); an
    // ordinary strong hit: at most the §7 6 dB, whatever its gain
    if (ctx.atP) meta.duck = duckFor(cue, 9, 0.15, 0.3)
    else if (big) meta.duck = [10, 0.15, 0.5]
    else if (cue.gain >= 0.4 && !cue.inCard) meta.duck = duckFor(cue, 6 * Math.min(1, clamp(cue.gain / 0.7, 0.3, 1.2)), 0.1, 0.3)
    if (cue.inCard && ctx.dropBody) {
      // the card's slam (§3.2): the logo owns the low end, so the hit keeps transient, slap and air, at a level of its own
      // levelled by loudness, not peak: the slap and the crash are noise, and a peak-normalised noise burst swings
      // about 2 dB in loudness from seed to seed, which the logo's B8 window would inherit
      const b = fatten(K.layer(parts.filter(p => !p.body && !p.skip), n), HIT_DRIVE)
      levelTo(b, CARD_HIT_LU)
      b.meta = { ...meta, body: false }
      return b
    }
    // the whole impact through a soft clip (tanh 1.5 at its own peak): about 3.5 dB less crest, so the same weight in
    // the ear sits 2.5-3 dB lower in peak, and the master limiter is not left to flatten every payoff
    return fatten(outLayers(parts, n, ctx.atP ? -8 : -7.5, ctx, meta), HIT_DRIVE)
  },

  /** ding (the verdict, a result): a BR-Glock note on the chord's 3rd (MIDI 86-93, or the nearest octave), then its 5th
   *  at +60 ms; the card's handle ding is F#6 + A6. Peak -10, pans -15% / +15%, hall -10 */
  ding(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord
    let a, b
    if (cue.inCard) { a = 90; b = 93 } else {
      a = T.placePc(thirdPc(ch), 83)                // the 3rd in MIDI 83-94 (86-93 when the chord has one there)
      b = T.placePc(fifthPc(ch), a + 1)
    }
    a = ctx.claim(a); b = ctx.claim(b)
    const meta = { pitches: [a, b], pan: 0 }
    // the verdict: the band steps back only the §7 3-4.5 dB (its brass button is its own punctuation of the verdict);
    // a verdict that is the payoff takes the §8.3 big depth (10 dB); any other ding the §7 table (3 dB, scaled by gain)
    if (ctx.atV) meta.duck = duckFor(cue, 4, 0.08, 0.22)
    else if (ctx.atP) meta.duck = duckFor(cue, 10, 0.15, 0.3)
    const n1 = glockNote(a + r.bi() * 0.03, 0.85, 1.0), n2 = glockNote(b + r.bi() * 0.03, 0.85, 0.94)
    const parts = [{ buf: unit(n1), pan: -0.15 }, { buf: unit(n2), pan: 0.15, at: 0.06, gain: 0.85 }]
    return outLayers(parts, sec(1.0), -10, ctx, meta)
  },

  /** whoosh (a dash, a swing, a heave): noise BP 700 Hz -> 3.5 kHz -> 900 Hz, amplitude modulated at 28 Hz (depth 20%,
   *  cloth flutter), a little low air. Peak -13.3 (most of the U3 allowance: a dash should be heard over the band),
   *  pan sweeps ±50%, room -16 */
  whoosh(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.1, cue.dur || 0.35), n = sec(dur)
    const w = K.noiseSweep(r, dur, { f0: 700, f1: 3500, f2: 900, peakAt: 0.55, q: 1.0, window: 'sin', stereo: false, floor: 0.25 })
    for (let i = 0; i < n; i++) w[i] *= 1 - 0.2 * 0.5 * (1 - Math.cos(2 * Math.PI * 28 * i / SR))
    const air = noise(n, r); onePoleLP(air, 400); onePoleLP(air, 400)
    for (let i = 0; i < n; i++) air[i] *= Math.sin(Math.PI * i / n)
    const dir = cue.n % 2 ? -1 : 1
    const parts = [{ buf: K.panSweep(unit(w), -0.5 * dir, 0.5 * dir) }, { buf: unit(air), gain: 0.12, body: true }]
    return outLayers(parts, n, -13.3, ctx, { pan: 0 })
  },

  /** cash (coins): 8-14 clinks (3 sines at f, 2.3f, 3.9f, τ 40-90 ms, chord tones in MIDI 86-100) spread exponentially
   *  over 0-0.45 s / "ka-ching": a glock root in octave 6, then octave 7 at +40 ms, τ 500 ms. Peak -9, clinks ±50%, hall -12 */
  cash(cue, ctx) {
    const r = ctx.rng, ch = ctx.chord, n = sec(1.0)
    const count = 8 + r.int(7)
    const tones = T.tonesIn(ch, 86, 100)
    const parts = []
    for (let k = 0; k < count; k++) {
      const at = k === 0 ? 0 : 0.45 * (Math.exp(2.2 * (k / (count - 1))) - 1) / (Math.exp(2.2) - 1) * (0.85 + 0.15 * r())
      const f = mtof(r.pick(tones)) * cents(r.bi() * 8)
      const tau = 0.04 + 0.05 * r()
      const c = partials(sec(tau * 6), f, [[1, 1, tau], [2.3, 0.5, tau * 0.7], [3.9, 0.28, tau * 0.45]])
      parts.push({ buf: unit(c), at, pan: r.bi() * 0.5, gain: (k === 0 ? 0.9 : 0.5 + 0.35 * r()) })
    }
    let a = ctx.claim(T.placePc(ch.root, 81)), b = ctx.claim(a + 12)                 // octave 6 (81-92), then +12 (<= 104)
    parts.push({ buf: unit(glockNote(a, 0.42, 0.9)), at: 0.0, pan: -0.08, gain: 0.8 })
    parts.push({ buf: unit(glockNote(b, 0.42, 0.9)), at: 0.04, pan: 0.08, gain: 0.6 })
    return outLayers(parts, n, -9, ctx, { pitches: [a, b], pan: 0 })
  },

  /** step (a footstep): 3 ms tap BP 2.5 kHz (+5 dB on the bible's mix, so the foot reads over the band) / noise LP
   *  900 Hz (±15%) + a 95 Hz sine, τ 25 ms / a heel "scuff": noise BP 200 Hz (Q 1.2), τ 35 ms. Peak -15.6 ±0.5 dB, ±10%
   *  alternating */
  step(cue, ctx) {
    const r = ctx.rng, n = sec(0.09)
    const x = noise(n, r); const lp = 900 * (1 + 0.15 * r.bi()); onePoleLP(x, lp); onePoleLP(x, lp)
    const s = osc('sine', n, 95)
    const e = expEnv(n, 0.025, 0.001)
    env(x, e); env(s, e)
    const sc = noise(n, r); svf(sc, 'bp', 200 * (1 + 0.1 * r.bi()), { q: 1.2 }); env(sc, expEnv(n, 0.035, 0.002))
    const c = tick0(r, 3, { bp: 2500, q: 0.8 })                 // a 3 ms heel tap: a click with some body in its band
    const pan = cue.n % 2 ? 0.1 : -0.1
    const parts = [{ buf: unit(x), pan }, { buf: unit(sc), pan, gain: 0.55, body: true }, { buf: unit(s), pan, gain: 0.6, body: true }, { buf: unit(c), pan, gain: 0.55, transient: true }]
    return outLayers(parts, n, -15.6 + 0.5 * r.bi(), ctx, { pan })
  },

  /** roll (a ratchet / flip counter): a click train (rate accelerates, then settles; peak 22/s) BP 2.2 kHz, each click
   *  carrying a woodblock blip (τ 20 ms: a hollow knock, not a pin-prick) that walks up the chord tones, the last click
   *  +1.5 dB (the bible's +4 dB set the peak and left the train itself 4 dB under it, masked by the band). Peak -15.5,
   *  pan sweeps ±30%, room -18 */
  roll(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.1, cue.dur || 1.5), n = sec(dur + 0.05)
    const b = stereo(n)
    const times = []
    let t = 0
    while (t < dur - 0.03) { times.push(t); const p = t / dur; t += 1 / (22 * (0.55 + 0.45 * Math.sin(Math.PI * Math.min(1, p * 1.15)))) * (1 + r.bi() * 0.06) }
    times.push(dur)
    const ch = ctx.chord, lo = T.placePc(ch.root, 72)
    const walk = T.tonesIn(ch, lo, lo + 12)
    const dir = cue.n % 2 ? -1 : 1
    times.forEach((tc, k) => {
      const lastC = k === times.length - 1, g = lastC ? dbToGain(1.5) : 1
      const c = unit(tick0(r, 1.2, { bp: 2200, q: 1.2 }))
      const m = walk[Math.min(walk.length - 1, Math.round((k / Math.max(1, times.length - 1)) * (walk.length - 1)))]
      const bl = unit(partials(sec(0.06), mtof(m), [[1, 1, 0.02], [2.71, 0.35, 0.01]]))
      const pan = dir * (-0.3 + 0.6 * tc / dur)
      const s = K.layer([{ buf: c, pan, gain: 0.8 * g }, { buf: bl, pan, gain: 0.55 * g }])
      const i0 = sec(tc)
      for (let i = 0; i < s.L.length && i0 + i < n; i++) { b.L[i0 + i] += s.L[i]; b.R[i0 + i] += s.R[i] }
    })
    return outLayers([{ buf: b }], n, -15.5, ctx, { pitches: walk, pan: 0 })
  },

  /** type (a pencil scribble): a 14/s train of noise clicks (BP 3 kHz, Q 2) with seeded ±15 ms jitter inside
   *  [t, t + dur], gains 0.6-1.0 / scratch: noise BP 4.5 kHz, AM at 9 Hz, -8 dB. Peak -18, ±10%, room -20 */
  type(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.1, cue.dur || 0.6), n = sec(dur + 0.06)
    const b = stereo(n)
    const count = Math.max(3, Math.round(dur * 14))
    for (let k = 0; k < count; k++) {
      const at = k === 0 ? 0 : clamp((k / count) * dur + r.bi() * 0.015, 0.01, dur - 0.004)
      const c = unit(tick0(r, 2, { bp: 3000, q: 2 }))
      const g = 0.6 + 0.4 * r(), pan = r.bi() * 0.1
      const s = panMono(c, pan, g)
      const i0 = sec(at)
      for (let i = 0; i < s.L.length && i0 + i < n; i++) { b.L[i0 + i] += s.L[i]; b.R[i0 + i] += s.R[i] }
    }
    const sc = noise(n, r); svf(sc, 'bp', 4500, { q: 1.5 })
    const scp = peakOf(sc) || 1, D = sec(dur), fo = sec(0.03)
    for (let i = 0; i < n; i++) {
      const am = 0.5 * (1 - Math.cos(2 * Math.PI * 9 * i / SR))
      const w = i < D ? Math.min(1, i / sec(0.004)) : Math.max(0, 1 - (i - D) / fo)
      const v = sc[i] / scp * am * w * dbToGain(-8)
      b.L[i] += v; b.R[i] += v
    }
    return outLayers([{ buf: b }], n, -18, ctx, { pan: 0 })
  },

  /** riser (strain, a heave): a slide-whistle sine A4 -> A5 (exponential over dur), vibrato 6 Hz growing 0 -> ±20 cents /
   *  a noise swell BP 500 Hz -> 3 kHz, width 20% -> 60%. Ends on A (the dominant root). Peak -10 at the end, no duck */
  riser(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.2, cue.dur || 2), n = sec(dur)
    const f0 = mtof(69), f1 = mtof(81)
    const fq = i => { const t = i / SR, p = Math.min(1, i / n); return f0 * Math.pow(f1 / f0, p) * cents(20 * p * Math.sin(2 * Math.PI * 6 * t)) }
    const s = osc('sine', n, fq), h2 = osc('sine', n, i => 2 * fq(i))
    const nz = K.stereoNoise(n, r, x => svf(x, 'bp', i => 500 * Math.pow(6, i / n), { q: 1.0 }))
    const np = Math.max(peakOf(nz.L), peakOf(nz.R)) || 1
    const L = new Float32Array(n), R = new Float32Array(n)
    const a = sec(0.002), fo = sec(0.005)
    for (let i = 0; i < n; i++) {
      const p = i / n
      const gs = Math.pow(10, (-14 * (1 - p)) / 20), gn = Math.pow(10, (-20 * (1 - p)) / 20) * 0.45
      const edge = Math.min(1, i / a) * Math.min(1, (n - 1 - i) / fo)
      const w = 0.2 + 0.4 * p
      const nl = nz.L[i] / np, nr = nz.R[i] / np, M = (nl + nr) / 2, S = (nl - nr) / 2 * w
      const v = (s[i] + 0.08 * h2[i]) * gs
      L[i] = (v + (M + S) * gn) * edge
      R[i] = (v + (M - S) * gn) * edge
    }
    return outLayers([{ buf: { L, R } }], n, -10, ctx, { pitches: [69, 81], pan: 0 })
  },

  /** buzz (a wrong honk): two PolyBLEP saws at D3 and Eb3 (the minor 2nd beats), LP 1.2 kHz falling with a -3 st pitch
   *  bend over 300 ms (the deflate). Peak -12, centre, room -16 */
  buzz(cue, ctx) {
    const n = sec(0.45)
    const bend = i => Math.pow(2, (-3 * Math.min(1, i / sec(0.3))) / 12)
    const x = osc('saw', n, i => 146.83 * bend(i)), y = osc('saw', n, i => 155.56 * bend(i))
    for (let i = 0; i < n; i++) x[i] = (x[i] + y[i]) * 0.5
    svf(x, 'lp', i => 1200 * (0.6 + 0.4 * Math.exp(-i / sec(0.15))), { q: 0.9 })
    const e = adsr(n, { a: 0.005, d: 0.25, s: 0.45, r: 0.08, gate: 0.37 })
    env(x, e)
    return outLayers([{ buf: panMono(x, 0) }], n, -12, ctx, { pitches: [50, 51], pan: 0 })
  },

  /** boing (a spring): a triangle at f0 = the root in octave 4 rising an octave over 0.25 s (then held), with 11 Hz
   *  vibrato of ±1 st decaying (τ 0.15 s). Peak -12, pan ±20%, room -16 */
  boing(cue, ctx) {
    const r = ctx.rng, n = sec(0.4)
    const m = ctx.claim(T.placePc(ctx.chord.root, 60))
    const f0 = mtof(m) * cents(r.bi() * 5)
    const x = osc('tri', n, i => { const t = i / SR; return f0 * Math.pow(2, Math.min(t, 0.25) / 0.25) * Math.pow(2, (Math.exp(-t / 0.15) * Math.sin(2 * Math.PI * 11 * t)) / 12) })
    const e = adsr(n, { a: 0.002, d: 0.3, s: 0.0, r: 0.05, gate: 0.34 })
    env(x, e)
    svf(x, 'lp', 5000)
    const pan = r.bi() * 0.2
    return outLayers([{ buf: panMono(unit(x), pan) }], n, -12, ctx, { pitches: [m], pan })
  },

  /** reveal (not emitted by this look): ding plus thud. Peak -8 */
  reveal(cue, ctx) {
    const th = raw.thud(cue, ctx), dg = raw.ding(cue, ctx)
    const n = Math.max(th.L.length, dg.L.length)
    const parts = [{ buf: th, body: true }, { buf: dg, gain: 1.2 }]
    return outLayers(parts, n, -8, ctx, { pitches: [...(th.meta.pitches || []), ...(dg.meta.pitches || [])], pan: 0 })
  },
}

/** the renderers, each buffer ending in a 6 ms raised-cosine fade (U2: no voice ends on a step, whatever its decay) */
function fadeEnd(b) {
  const chans = b.L ? [b.L, b.R] : [b], n = chans[0].length, m = Math.min(n, sec(0.006))
  for (const x of chans) for (let i = 0; i < m; i++) x[n - 1 - i] *= 0.5 - 0.5 * Math.cos(Math.PI * i / m)
  return b
}
export const raw = Object.fromEntries(Object.entries(kinds).map(([k, fn]) => [k, (cue, ctx) => { const b = fn(cue, ctx); return b ? fadeEnd(b) : b }]))

/**
 * The pack's SFX: the raw renderers above, times the per-cue trim compose() worked out with the leveller (balance.mjs,
 * bible B1): only body cues in the loudest moments are ridden down; card cues are never trimmed.
 */
export const sfx = Object.fromEntries(Object.entries(raw).map(([kind, fn]) => [kind, (cue, ctx) => {
  const b = fn(cue, ctx)
  const bk = ctx.tl && ctx.tl.becker
  // body cues: the leveller's trim; card cues: the card's trim against the master gain (both from compose's plan)
  let tr = (bk && (cue.inCard ? bk.music && bk.music.card : bk.trims && bk.trims.get(cue.i))) || 0
  if (cue.inCard && kind === 'pop') tr = Math.min(0, tr)          // the pop already sits at the top of its allowance (U3)
  // the ducks stay at the §7 depths: no extra depth for a trimmed cue or for one merged with a music hit (the
  // clearance comes from compose's band-selective dips of the band's mids, keyed by the same cues)
  if (tr) { const meta = b.meta, off = b.offset; scale(b, dbToGain(tr)); b.meta = meta; if (off) b.offset = off }
  return b
}]))
