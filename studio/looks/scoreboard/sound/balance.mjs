// The SFX fader and the bed offset, per teaser (sound bible §9.3 B1, B3).
//
// B1 wants the music stem 1.5-3.5 LU under the mix and the SFX stem 2.5-5 LU under it; measured on the 15 teasers, both
// hold when the SFX stem sits about 1.35 LU under the music stem (S - M = -1.35). The cue lists differ a lot (04a's
// gain-1.0 thuds and hits measure -18 LUFS, 02b's ticks and dings -24), so each teaser gets its own SFX fader:
//   S(trim)  the teaser's own cues, rendered once with the pack's renderers (same seeded streams, the engine's ctx), the
//            engine's cluster cap applied, measured with the BS.1770 meter. How a cut or a lift reaches each cue: see
//            cueTrim().
//   M(trim)  the music stem, modelled: the bed's power (CAL.BEDS by section and energy, at the bus's 0 dB) plus the
//            energy curve (energy.mjs), under the ducks (the engine's rules: each cue's duck, the clearances, the
//            payoff duck), plus CAL.M_FIT (fitted on all 15 by calibrate.mjs). The master gain then follows as about
//            CAL.GM_PLAN - M: logo.mjs uses it.
// A cut solves S(trim) = M(trim) - 1.35 by bisection on [-8, 0] dB; a lift only reaches S = M - 1.95 (+2 dB at most).
// When even +2 dB leaves the SFX short, the bed gives way instead (offset, at most 2.5 dB; compose() lowers the mid and
// high layers by 1.4x the offset, which moves the music stem by about OFF_EFF x the offset). The mix itself follows
// the music and the returns (the cues are too intermittent to move the gated integrated level), so the returns trim in
// mix.mjs sets where both stems sit re the mix. Cached per timeline.
import { mix } from './mix.mjs'

const SR = 48000
// BS.1770-4 K-weighting at 48 kHz and the integrated gating (as src/sound/loudness.mjs), for the fader's fast S(trim)
const K1 = { b: [1.53512485958697, -2.69169618940638, 1.19839281085285], a: [1, -1.69065929318241, 0.73248077421585] }
const K2 = { b: [1.0, -2.0, 1.0], a: [1, -1.99004745483398, 0.99007225036621] }
export function kfilter(x) {
  const y = new Float64Array(x.length)
  for (const F of [K1, K2]) {
    let x1 = 0, x2 = 0, y1 = 0, y2 = 0
    const src = F === K1 ? x : y
    for (let i = 0; i < x.length; i++) { const v = src[i], o = F.b[0] * v + F.b[1] * x1 + F.b[2] * x2 - F.a[1] * y1 - F.a[2] * y2; x2 = x1; x1 = v; y2 = y1; y1 = o; y[i] = o }
  }
  return y
}
const LUk = ms => (ms > 0 ? -0.691 + 10 * Math.log10(ms) : -Infinity)
function integratedOf(hops) {
  const blocks = []
  for (let h = 3; h < hops.length; h++) blocks.push((hops[h] + hops[h - 1] + hops[h - 2] + hops[h - 3]) / 4)
  const a = blocks.filter(z => LUk(z) > -70)
  if (!a.length) return -Infinity
  const thr = LUk(a.reduce((x, y) => x + y, 0) / a.length) - 10
  const r = a.filter(z => LUk(z) > thr)
  return LUk(r.length ? r.reduce((x, y) => x + y, 0) / r.length : 0)
}
export const S_MINUS_M = -1.35
export const S_FLOOR = -2.1
/** the largest lift (dB) before the bed gives way */
export const LIFT_MAX = 4
import { CAL } from './cal.mjs'
export const M_FIT = CAL.M_FIT
/** the music stem moves by about OFF_EFF x the bed offset (the kick, the 808 and the sub keep their level; measured
 * 0.63-0.70 on 02c at offsets of -1.3 and -2.5 dB) */
export const OFF_EFF = CAL.OFF_EFF ?? 0.65
/** the SFX bus (HP 35 Hz, 3:1 compressor) takes a little off what the solo renders measure */
export const S_CAL = -0.3
export const SOFT = new Set(['pop', 'ding', 'cash', 'reveal'])
const SUSTAINED = new Set(['roll', 'type'])
const PLANS = new WeakMap()

/**
 * The trim (dB) a cue gets under a fader setting. A cut spares the soft B3-critical kinds below gain 0.7 (they have the
 * least room over the bed), and gives the payoff cluster a third of it (at most -2 dB) so P stays the biggest moment
 * (B8). A lift (LIFT_MAX at most) reaches the payoff and the event cues but not the UI texture (ticks, steps, type,
 * rolls) or the dings: their chord tones in MIDI 84-93 sit in the 1 kHz octave, the reference of the §9.2 bands, and a
 * lifted ding payoff in a sparse teaser leaves the 250 Hz and 2 kHz octaves short of their floors. The end card's cues
 * are never trimmed.
 */
export function cueTrim(c, atP, trim) { return classTrim(classOf(c, atP), trim) }
const NO_LIFT = new Set(['tick', 'step', 'type', 'roll', 'ding'])
const CLASSES = ['pay+', 'pay-', 'soft+', 'soft-', 'main+', 'main-', 'card']
const classOf = (c, atP) => (c.inCard ? 'card' : (atP ? 'pay' : SOFT.has(c.kind) && c.gain < 0.7 ? 'soft' : 'main') + (NO_LIFT.has(c.kind) ? '-' : '+'))
const classTrim = (cls, trim) => {
  if (cls === 'card') return 0                      // the end card is the brand: it sounds the same in every teaser
  if (trim >= 0) return cls.endsWith('-') ? 0 : trim
  const k = cls.slice(0, -1)
  return k === 'pay' ? Math.max(trim / 3, -2) : k === 'soft' ? 0 : trim
}

/**
 * plan(tl, { renderCue, extraDuck, bedAt }) -> { trim, offset, S, M }.
 * renderCue(c) -> stereo buffer at gain 1, fader 0 (offset honoured); extraDuck(c, trim) -> { depth, hold, release } |
 * null (the pack's meta.duck under the fader setting `trim`: the clearance solver); bedAt(t) -> the bed's power at t (dBFS, pre-master, un-ducked, offset 0: the BEDM table
 * of sfx.mjs plus the energy curve).
 */
export function plan(tl, { renderCue, extraDuck, bedAt }) {
  if (PLANS.has(tl)) return PLANS.get(tl)
  const cues = tl.cues
  const P = tl.anchors.P.t, base = tl.base
  const end = Math.max(tl.duration, ...cues.map(c => c.t + (c.dur || 0) + 2.0))
  const N = Math.round(end * SR)
  // the classes (classOf): the payoff cluster, the soft kinds under gain 0.7, the main body of cues (each split by whether
  // a lift reaches it), the card
  const mk = () => ({ L: new Float32Array(N), R: new Float32Array(N) })
  const grp = Object.fromEntries(CLASSES.map(k => [k, mk()]))
  const atP = c => Math.abs(c.t - P) <= 0.015
  const bufs = cues.map(c => renderCue(c))
  const peak = b => { let p = 0; const st = b.L ? b : { L: b, R: b }; for (let i = 0; i < st.L.length; i++) p = Math.max(p, Math.abs(st.L[i]), Math.abs(st.R[i])); return p }
  // §8.4.3 as the engine applies it: a cluster's summed peak is capped at its loudest member + 1.5 dB
  const capK = new Map()
  for (const cl of tl.clusters) {
    const mem = cl.members.filter(i => bufs[i])
    if (mem.length < 2) continue
    const t0 = Math.min(...mem.map(i => Math.round(cues[i].t * SR) - (bufs[i].offset || 0)))
    const t1 = Math.max(...mem.map(i => Math.round(cues[i].t * SR) - (bufs[i].offset || 0) + (bufs[i].L ? bufs[i].L.length : bufs[i].length)))
    const tmp = { L: new Float32Array(t1 - t0), R: new Float32Array(t1 - t0) }
    for (const i of mem) { const b = bufs[i], st = b.L ? b : { L: b, R: b }, o = Math.round(cues[i].t * SR) - (b.offset || 0) - t0; for (let j = 0; j < st.L.length; j++) { tmp.L[o + j] += st.L[j] * cues[i].gain; tmp.R[o + j] += st.R[j] * cues[i].gain } }
    const pk = peak(tmp), cap = Math.max(...mem.map(i => peak(bufs[i]) * cues[i].gain)) * Math.pow(10, 1.5 / 20)
    if (pk > cap) for (const i of mem) capK.set(i, cap / pk)
  }
  cues.forEach((c, i) => {
    const b = bufs[i]
    if (!b) return
    const st = b.L ? b : { L: b, R: b }
    const g = grp[classOf(c, atP(c))], k = c.gain * (capK.get(i) ?? 1)
    const at0 = Math.round(c.t * SR) - (b.offset || 0)
    for (let j = Math.max(0, -at0); j < st.L.length && at0 + j < N; j++) { g.L[at0 + j] += st.L[j] * k; g.R[at0 + j] += st.R[j] * k }
  })
  // S(trim): the BS.1770 integrated loudness of the summed classes. The K-weighting is linear, so each class is filtered
  // once and every 100 ms hop keeps the classes' cross energies: a fader setting's hop energy is then g' C g, and the
  // gating runs on those (the same blocks and gates as loudness.mjs), without re-filtering the sum for every trial
  const live = CLASSES.filter(k => grp[k].L.some(v => v !== 0) || grp[k].R.some(v => v !== 0))
  const HOP = 4800, H = Math.floor(N / HOP), nk = live.length
  const cross = new Float64Array(H * nk * nk)
  {
    const ys = live.map(k => [kfilter(grp[k].L), kfilter(grp[k].R)])
    for (let h = 0; h < H; h++) for (let a = 0; a < nk; a++) for (let b = a; b < nk; b++) {
      let e = 0
      for (const ch of [0, 1]) { const x = ys[a][ch], y = ys[b][ch]; for (let i = h * HOP; i < (h + 1) * HOP; i++) e += x[i] * y[i] }
      cross[(h * nk + a) * nk + b] = cross[(h * nk + b) * nk + a] = e / HOP
    }
  }
  const S = trim => {
    const g = live.map(k => Math.pow(10, classTrim(k, trim) / 20))
    const hops = new Float64Array(H)
    for (let h = 0; h < H; h++) { let e = 0; for (let a = 0; a < nk; a++) for (let b = 0; b < nk; b++) e += g[a] * g[b] * cross[(h * nk + a) * nk + b]; hops[h] = Math.max(0, e) }
    return integratedOf(hops) + S_CAL
  }
  // the bed and the ducks at 100 Hz over [0, base)
  const K = Math.max(1, Math.floor(base * 100))
  const bed = new Float64Array(K)
  for (let k = 0; k < K; k++) bed[k] = bedAt(k / 100)
  const M = trim => {
    const duck = new Float64Array(K)
    const ev = []
    for (const c of cues) {
      const scale = Math.min(1.2, Math.max(0.3, c.gain / 0.7))
      const x = extraDuck(c, trim)
      const tbl = x || (atP(c) && mix.duckBig[c.kind]) || mix.duck[c.kind]
      if (!tbl) continue
      const d = Array.isArray(tbl) ? { depth: tbl[0], hold: tbl[1], release: tbl[2] } : tbl
      if (!(d.depth > 0)) continue
      ev.push({ t: c.t, depth: d.depth * scale, hold: d.hold || 0, release: d.release || 0.1, until: SUSTAINED.has(c.kind) ? c.t + (c.dur || 0) : null })
    }
    if (mix.payoffDuck && mix.payoffDuck.depth > 0) ev.push({ t: P, depth: mix.payoffDuck.depth, hold: mix.payoffDuck.hold, release: mix.payoffDuck.release, until: null })
    for (const e of ev) {
      const tHold = Math.max(e.t + e.hold, e.until ?? -Infinity)
      for (let k = Math.max(0, Math.floor(e.t * 100)); k < K; k++) {
        const t = k / 100
        const v = t <= tHold ? -e.depth : -e.depth * Math.exp(-(t - tHold) / e.release)
        if (v > -0.01 && t > tHold) break
        if (v < duck[k]) duck[k] = v
      }
    }
    let e0 = 0, e1 = 0
    for (let k = 0; k < K; k++) { const p = Math.pow(10, bed[k] / 10); e0 += p; e1 += p * Math.pow(10, duck[k] / 10) }
    return 10 * Math.log10(e0 / K) + 10 * Math.log10(e1 / e0) + M_FIT
  }
  // cut to S - M = -1.35; lift only as far as S - M = -1.95 needs (the SFX stem's B1 floor with a margin): a lift also
  // raises every cue in the BUILD, which flattens the teaser's dynamics (A3)
  const f = (trim, d = S_MINUS_M) => S(trim) - (M(trim) + d)
  const solve = (lo, hi, d) => { for (let it = 0; it < 14; it++) { const mid = (lo + hi) / 2; if (f(mid, d) > 0) hi = mid; else lo = mid } return (lo + hi) / 2 }
  let trim = 0, offset = 0
  if (!cues.length || !Number.isFinite(S(0))) trim = 0
  else if (f(0) > 0) trim = f(-8) > 0 ? -8 : solve(-8, 0, S_MINUS_M)
  else if (f(0, S_FLOOR) >= 0) trim = 0
  else if (f(LIFT_MAX, S_FLOOR) < 0) { trim = LIFT_MAX; offset = -Math.min(2.5, -f(LIFT_MAX, S_FLOOR) / OFF_EFF) }
  else trim = solve(0, LIFT_MAX, S_FLOOR)
  const out = { trim: +trim.toFixed(3), offset: +offset.toFixed(3), S: S(trim), M: M(trim) + OFF_EFF * offset }
  PLANS.set(tl, out)
  return out
}
