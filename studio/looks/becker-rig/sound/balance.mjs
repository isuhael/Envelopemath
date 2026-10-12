// The Becker balance plan (bible §8.1 / B1, §9.2, B8), run by compose() before it writes a note.
//  1. The SFX leveller. compose() renders the body cues once with the pack's raw SFX renderers (the same seeded streams
//     the engine will use), measures the SFX stem's momentary loudness and rides down only the pile-ups: big cues (hits,
//     coins, risers, thuds...) whose neighbourhood stands above a threshold, at most 6 dB (3 dB for a cue B3 listens
//     to). The small foley (tick, step, roll, type, pop, swipe, whoosh) is never trimmed: it is what gets masked first.
//  2. The band's tilt against the SFX spectrum (§9.2).
//  3. The music level: the music stem is placed against the SFX stem's UNGATED level (the SFX's real share of the mix's
//     power), so music and SFX are balanced the same way in a teaser of three hits and in one of forty taps.
// Deterministic: a pure function of the cue list and the harmony.
import { SR, stereo, addAt, toStereo, filter, dbToGain } from '../../../src/sound/dsp.mjs'
import * as T from '../../../src/sound/theory.mjs'
import * as D from '../../../src/sound/dsp.mjs'
import { loudness } from '../../../src/sound/loudness.mjs'
import { duckCurve, compress } from '../../../src/sound/fx.mjs'
import { ltas } from '../../../src/sound/audit.mjs'
import { raw } from './sfx.mjs'
import { mix } from './mix.mjs'

/** pre-master gated loudness the SFX stem is pinned to (LUFS): the music stem sits near -24, so the SFX stem lands a
 *  little over it, both near -3 LU re the mix */
export const SFX_TARGET = -22.9
export const MAX_TRIM = 6
/** the leveller only rides the top RANGE dB of moments: below that, cues keep their level even if the target is not met */
export const RANGE = 14
/** cues the B3 audibility check listens for (gain >= 0.4) are ridden down at most this much */
export const MAX_TRIM_AUDIBLE = 3
const AUDIBLE = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])
/** the small foley: never ridden down (the critic's in-band masking: ticks, steps and rolls sat under the band) */
const SMALL = new Set(['tick', 'step', 'roll', 'type', 'pop', 'swipe', 'whoosh'])

export function renderCues(tl) {
  const P = tl.anchors.P.t, V = tl.anchors.V ? tl.anchors.V.t : null, L = tl.card ? tl.card.L : null
  const out = []
  for (const c of tl.cues) {
    const fn = raw[c.kind]
    if (!fn) continue
    const cl = c.cluster ? { ...c.cluster, members: tl.clusters[c.cluster.id].ranked } : null
    const nearL = L != null && c.inCard && Math.abs(c.t - L) <= 0.15 + 1e-9
    const ctx = {
      tl, cue: c, n: c.n, i: c.i, rng: tl.stream(`sfx:${c.i}`), chordAt: tl.chordAt, keyAt: tl.keyAt, beatAt: tl.beatAt,
      chord: tl.chordAt(c.t), bpm: tl.bpmAt(c.t), beatLen: tl.beatLen(c.t), train: c.train || null, cluster: cl,
      inCard: c.inCard, isAnchor: tl.isAnchor(c.t, 0.015), atP: Math.abs(c.t - P) <= 0.015, atV: V != null && Math.abs(c.t - V) <= 0.015,
      atL: L != null && Math.abs(c.t - L) <= 0.015, L, P, V, dropBody: !!(cl && cl.rank > 0) || nearL, dropTransient: false,
      claim: m => m, D, T,
    }
    out.push({ c, b: toStereo(fn(c, ctx), 0) })
  }
  return out
}
/** the SFX bus as the engine builds it: every cue at its gain and trim, HP 35 Hz, then the bus compressor (3:1, its
 *  threshold maxGr·1.5 dB under the loudest hit's peak), which rides a fat payoff hit by a dB or two */
function sumOf(tl, rendered, trims) {
  const N = Math.round(tl.duration * SR), sum = stereo(N)
  const gains = new Map(rendered.map(({ c }) => [c.i, c.gain * dbToGain(trims.get(c.i) || 0)]))
  // §8.4.3 as the engine applies it: a cluster's summed peak is capped at its loudest member + 1.5 dB
  const byI = new Map(rendered.map(x => [x.c.i, x]))
  for (const cl of tl.clusters || []) {
    const mem = cl.members.map(i => byI.get(i)).filter(Boolean)
    if (mem.length < 2) continue
    const at = x => Math.round(x.c.t * SR) - (x.b.offset || 0)
    const t0 = Math.min(...mem.map(at)), t1 = Math.max(...mem.map(x => at(x) + x.b.L.length))
    const tmp = stereo(t1 - t0)
    for (const x of mem) addAt(tmp, x.b, Math.round(x.c.t * SR) - t0, gains.get(x.c.i))
    const pk = D.peakOf(tmp), cap = Math.max(...mem.map(x => D.peakOf(x.b) * gains.get(x.c.i))) * dbToGain(1.5)
    if (pk > cap) for (const x of mem) gains.set(x.c.i, gains.get(x.c.i) * cap / pk)
  }
  let ref = 0, any = 0
  for (const { c, b } of rendered) {
    const g = gains.get(c.i)
    addAt(sum, b, Math.round(c.t * SR), g)
    const pk = D.peakOf(b) * g
    if (c.kind === 'hit') ref = Math.max(ref, pk)
    any = Math.max(any, pk)
  }
  filter(sum, 'hp', 35, { q: 0.7071 })
  const SC = mix.sfxComp
  const thr = 20 * Math.log10(Math.max(1e-9, (ref || any) * dbToGain(mix.sfxBus || 0))) - (ref ? SC.maxGr * SC.ratio / (SC.ratio - 1) : 1.5)
  compress(sum, { threshold: thr, ratio: SC.ratio, attack: SC.attack, release: SC.release, knee: SC.knee })
  return sum
}
/** -> { trims: Map(cue index -> dB), thr, I0, I, rendered } */
export function sfxLevels(tl, rendered = renderCues(tl)) {
  const none = new Map()
  const L0 = loudness(sumOf(tl, rendered, none))
  const I0 = L0.integrated
  if (!Number.isFinite(I0)) return { trims: none, thr: null, I0, I: I0 }
  if (I0 <= SFX_TARGET) {
    // a teaser of small taps: lift every body cue a little (at most +1 dB, inside the U3 allowance)
    const up = Math.min(1, SFX_TARGET - I0), t = new Map()
    for (const { c } of rendered) if (!c.inCard) t.set(c.i, Math.round(up * 100) / 100)
    return { trims: t, thr: null, I0, I: loudness(sumOf(tl, rendered, t)).integrated }
  }
  // each body cue's neighbourhood level: the loudest momentary window (400 ms, 100 ms hop) that overlaps its first 0.4 s
  const P = tl.anchors.P.t
  const mom = L0.momentary
  const local = new Map()
  for (const { c } of rendered) {
    if (c.inCard) continue
    let m = -Infinity
    const h0 = Math.max(3, Math.floor(c.t / 0.1)), h1 = Math.min(mom.length - 1, Math.ceil((c.t + Math.min(0.8, Math.max(0.4, c.dur || 0))) / 0.1) + 3)
    for (let h = h0; h <= h1; h++) if (mom[h] != null && mom[h] > m) m = mom[h]
    local.set(c.i, m)
  }
  // the payoff keeps its size (B8: P stands over the logo): its cues (P - 0.3 .. P + 0.35 s) are ridden only by what
  // they tower over the card's by more than 4 dB (momentary loudness at P + 0.2 s against L + 0.2 s, this render)
  const momAt = t => { const h = Math.round(t / 0.1) - 1; return h >= 3 && h < mom.length && mom[h] != null ? mom[h] : -70 }
  const Lc = tl.card ? tl.card.L : null
  const lead = Lc != null ? momAt(P + 0.2) - momAt(Lc + 0.2) : 0
  const capP = Math.max(0, Math.min(6, (lead - 4) * 1.2))
  const cap = new Map(rendered.map(({ c }) => [c.i, SMALL.has(c.kind) ? 0 : c.t >= P - 0.3 && c.t <= P + 0.35 ? capP : AUDIBLE.has(c.kind) && c.gain >= 0.4 ? MAX_TRIM_AUDIBLE : MAX_TRIM]))
  const trimsAt = thr => { const t = new Map(); for (const [i, m] of local) { const d = Math.min(cap.get(i), Math.max(0, m - thr)); if (d > 0) t.set(i, -Math.round(d * 100) / 100) } return t }
  const IAt = thr => loudness(sumOf(tl, rendered, trimsAt(thr))).integrated
  let hi = Math.max(...local.values()), lo = hi - RANGE
  if (!(IAt(lo) <= SFX_TARGET)) { const tr = trimsAt(lo); return { trims: tr, thr: lo, I0, I: IAt(lo) } }
  for (let k = 0; k < 14; k++) { const m = (lo + hi) / 2; if (IAt(m) > SFX_TARGET) hi = m; else lo = m }
  const thr = Math.round(lo * 100) / 100
  return { trims: trimsAt(thr), thr, I0, I: IAt(thr) }
}

/**
 * The music trim (B1). The music stem is placed against the SFX stem's GATED loudness I (the cues' level while they
 * sound): M = I - dIS (+ up to 2 dB for a strongly tilted SFX spectrum, see below), so in every teaser a hit sits about
 * the same 1 LU over the band, whether the teaser has three hits or
 * forty taps (the ungated share of the SFX swings 3-8 LU with cue density and is not a perceptual anchor). With the
 * bible's dry sends that lands the music about -2 LU, the gated SFX about -1 LU and the returns about -10 LU re the
 * mix. (The bible's B1 as written, music -2.5..-4.5 and SFX -2..-4 LU re the mix, can only hold together when about a
 * third of the mix is in neither stem, i.e. reverb: see README "B1".)
 * M before the trim is predicted as C + the duck cost (the engine's duck curve rebuilt from the cue list: the same
 * depth/hold/release, scaled by gain, deepest wins) + tiltUp·max(0, tilt); the trim is the difference, clamped to
 * [-3, +3] dB. The master gain is predicted from mix = (1 + a)·M + b·U (powers; U = the SFX's ungated level; a, b,
 * C and tiltUp fitted on the 15 teasers at trim 0; refit after any level change). MODEL.fixedTrim (a calibration
 * hook) overrides the trim.
 */
export const MODEL = { C: -23.37, a: 0.061, b: 1.165, tiltUp: 0.63, iBias: -0.42, dIS: 1.0, dISTilt: 0.8, dISTiltMax: 2.0, trimLo: -3, trimHi: 3, gRef: 5.7, fixedTrim: null }
export function duckCost(tl, rendered, trims = new Map()) {
  const N = Math.round(tl.base * SR), P = tl.anchors.P.t
  const DEF = { tick: [1, 0.04, 0.08], roll: [2.5, 0, 0.15], riser: [0, 0, 0] }
  const ev = []
  for (const { c, b } of rendered) {
    if (c.inCard) continue
    const meta = b.meta || {}
    const atP = Math.abs(c.t - P) <= 0.015
    const tr = trims.get(c.i) || 0
    const tb = meta.duck || (atP && mix.duckBig[c.kind]) || mix.duck[c.kind] || DEF[c.kind] || [0, 0, 0]
    const d = Array.isArray(tb) ? { depth: tb[0], hold: tb[1], release: tb[2] } : tb
    const depth = d.depth > 0 ? d.depth * Math.min(1.2, Math.max(0.3, c.gain / 0.7)) : 0
    if (depth > 0) ev.push({ t: c.t, depth, hold: d.hold || 0, release: d.release || 0.1, ...((c.kind === 'roll' || c.kind === 'type') ? { until: c.t + c.dur, attack: 0.02 } : {}) })
  }
  const pd = mix.payoffDuck === undefined ? { depth: 9, hold: 0.15, release: 0.45 } : mix.payoffDuck
  if (pd && pd.depth > 0) ev.push({ t: P, depth: pd.depth, hold: pd.hold, release: pd.release })
  const db = duckCurve(N, ev)
  let s = 0
  for (let i = 0; i < N; i++) s += Math.pow(10, db[i] / 10)
  return 10 * Math.log10(s / Math.max(1, N))
}
export function musicTrim(tl, rendered, lv, tilt, crowd = null) {
  const cost = duckCost(tl, rendered, lv.trims)
  const { C, a, b, tiltUp, dIS, dISTilt, dISTiltMax, trimLo, trimHi } = MODEL
  const Mfree = C + cost + tiltUp * Math.max(0, tilt)
  // cues bunched in one octave (|tilt| large: all bloops and dings, or all swishes and bursts) cut through on their own:
  // they sit up to 2 dB nearer the band (0.8 dB per tilt unit), which keeps that octave from swamping the long-term
  // spectrum (§9.2). The tilt only sees the slope between the cues' 1 and 2 kHz octaves; cues that ring in both (dings
  // on F#6 and D6, coins) read as level, yet own the 1 kHz octave that every §9.2 band is measured against. So the
  // nearness also reads that octave directly (CROWD, below): the larger of the two terms, capped at the same 2 dB
  // (iBias: the engine's SFX stem reads about 0.4 LU under this render of it: merges drop transients and low bodies)
  const M = lv.I + MODEL.iBias - dIS + nearness(tilt, crowd)
  let trim = Math.max(trimLo, Math.min(trimHi, Math.round((M - Mfree) * 100) / 100))
  if (MODEL.fixedTrim != null) trim = MODEL.fixedTrim
  // the master gain this teaser will get (-14 LUFS minus the predicted pre-master loudness): the card (its SFX and the
  // logo) is trimmed against it, so the em sting lands at the same loudness after mastering in every teaser (B8)
  const Mp = Mfree + trim
  const mixPre = 10 * Math.log10((1 + a) * Math.pow(10, Mp / 10) + b * Math.pow(10, lv.U / 10))
  const gain = -14 - mixPre
  const card = Math.max(-1.5, Math.min(1.0, Math.round((MODEL.gRef - gain) * 100) / 100))
  return { cost, M: +M.toFixed(2), Mfree: +Mfree.toFixed(2), trim, gain: +gain.toFixed(2), card }
}

/**
 * The reference-octave crowding (bible §9.2, §6.7.4). BANDS measures every octave against the mix's 1 kHz octave, over
 * [0, base]. Bells (dings, coins) ring for up to a second in 1-2 kHz with a hall tail, so their long-term energy in that
 * octave is far larger than their gated loudness suggests, and the more so the shorter the body they ring in. 06c's
 * condensed cut (a 15.7 s body, two dings and two coins) is the case: its cues owned about half of the mix's 1 kHz
 * octave, nearly all of it from those four bells, its 2 kHz/1 kHz tilt read level (0.54), and the band's 250 Hz octave
 * sat at its BANDS floor (0.2 dB). `crowd` is the cues' long-term 1 kHz-octave power over the body (this plan's SFX
 * render, after the leveller) re their gated loudness I, in dB; the 15 teasers of 2026-10-12 read 43.9 (08c) to 58.1
 * (09b). Above `ref` the band comes `k` dB nearer the cues per dB (in musicTrim, with the tilt term: the larger wins,
 * capped at MODEL.dISTiltMax), so the band keeps its share of the reference octave. With ref 54.5 it moves 06c (0.43 ->
 * 2.0 dB), 07c and 09b (1.5 -> 2.0); the rest keep their tilt term. Designed, not fitted: see tools/README.md.
 */
export const CROWD = { ref: 54.5, k: 1.0 }
export function nearness(tilt, crowd = null) {
  const { dISTilt, dISTiltMax } = MODEL
  const byTilt = dISTilt * Math.abs(tilt)
  const byCrowd = crowd != null && Number.isFinite(crowd) ? CROWD.k * Math.max(0, crowd - CROWD.ref) : 0
  return Math.min(dISTiltMax, Math.max(byTilt, byCrowd))
}

/**
 * The band's tilt (bible §9.2): the cues decide where a teaser's SFX sit in the spectrum (a teaser of bloops and pencil
 * taps is all 1 kHz, a teaser of throws and swishes is all 2-5 kHz). This measures the SFX stem's 2 kHz octave against
 * its 1 kHz octave over the body and returns a tilt for the band: positive (dull SFX) lifts the drums' and brass's
 * presence and the bass and eases the marimba, glock and pizz; negative does the opposite. From -3.5 to +2.5 dB.
 */
export const TILT_REF = 2
export function sfxTilt(tl, rendered, trims) {
  const sum = sumOf(tl, rendered, trims), N = 8192
  const P = ltas(sum.L, sum.R, 0, Math.min(sum.L.length, Math.round(tl.base * SR)), N)
  const band = (lo, hi) => { let x = 0; for (let k = Math.ceil(lo * N / SR); k <= Math.floor(hi * N / SR); k++) x += P[k]; return x }
  const b1 = band(707, 1414), b2 = band(1414, 2828)
  if (!(b1 > 0) || !(b2 > 0)) return { x: 0, tilt: 0, l1k: null }
  const x = 10 * Math.log10(b2 / b1)
  // bright SFX pull harder (0.3 dB per dB, to -3.5): a teaser of bloops and swishes is the one the 2 kHz octave runs over
  const t = x > TILT_REF ? Math.max(-3.5, -0.3 * (x - TILT_REF)) : Math.min(2.5, -0.2 * (x - TILT_REF))
  // l1k: the 1 kHz octave's long-term power (the CROWD measure reads it against the gated loudness I)
  return { x: Math.round(x * 10) / 10, tilt: Math.round(t * 100) / 100, l1k: Math.round(10 * Math.log10(b1) * 100) / 100 }
}

/** the whole plan for a teaser: { trims (SFX per cue), thr, I0, I, U, tilt: { x, tilt, l1k }, crowd, music: { cost, M, Mfree, trim, gain, card } } */
export function balancePlan(tl) {
  const rendered = renderCues(tl)
  const s = sfxLevels(tl, rendered)
  const lv = { ...s, U: ungated(sumOf(tl, rendered, s.trims)) }
  const tilt = sfxTilt(tl, rendered, s.trims)
  const crowd = tilt.l1k != null && Number.isFinite(lv.I) ? Math.round((tilt.l1k - lv.I) * 10) / 10 : null
  return { ...lv, tilt, crowd, music: musicTrim(tl, rendered, lv, tilt.tilt, crowd) }
}
/** ungated loudness (the mean K-weighted power over the whole file, LUFS): what the SFX really add to the mix */
export function ungated(b) {
  const m = loudness(b).momentary
  let p = 0, n = 0
  for (let h = 3; h < m.length; h += 4) { n++; if (m[h] != null && Number.isFinite(m[h])) p += Math.pow(10, (m[h] + 0.691) / 10) }
  return n && p > 0 ? -0.691 + 10 * Math.log10(p / n) : -Infinity
}
