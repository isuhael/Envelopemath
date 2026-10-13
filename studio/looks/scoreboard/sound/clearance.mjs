// B3 clearance for the Scoreboard pack (sound bible §9.3 B3, §8.3): a cue of gain >= 0.4 of kind thud, hit, ding, cash,
// reveal or pop sits >= 3 dB over the music stem in its first 50 ms. Instead of one broadband duck sized from a table,
// each cue is cleared from the ACTUAL bed: compose() hands its final notes and drums here, the bed is rendered at every
// B3 cue's 50 ms window (the engine's own instruments, levels, pans, noise streams, kick sidechain and bus level), and
// so are the cues (the SFX stem in the window holds every cue that rings there, not only the one being cleared). Then
// the levers are spent in this order, each only as far as it is needed (target: 3 dB + MARGIN):
//   1. the §5 table's broadband duck (always: it is the look's design)
//   2. a selective dip of the layers that mask a cue: pad, arp, lead, hats, clap, snare, the music riser (<= SEL_MAX)
//   3. the 808 and the kick's tail dip under the cue (<= LOW_MAX; never an anchor kick)
//   4. the cue itself lifts (the hook's frame-1 count, the verdict and soft cues of gain <= 0.5 up to +6 dB, others up to
//      +3 dB, never past gain 1)
//   5. more broadband, up to 1.5x the table (6 dB on the hook at t = 0 and at V): the kick, the 808 and the stab keep
//      their weight; then the cue's lift up to +6 dB (never past gain 1); beyond the cap only as a last resort (res.deep:
//      verify.mjs DUCK fails on it)
// Then the dips the later levers made unnecessary are given back (the 808 and kick dip first, then the selective dip).
// A hit at P keeps the payoff design (its table duck plus the engine's payoff duck: B2, "impact first, then the music").
// The anchor stabs at P and V play on the react bus, not ducked (compose.mjs, routing.mjs); their level is budgeted here
// so the anchor cue still clears B3 (stabBudget). Every event is modelled on its engine route (routing.mjs routeOf: the
// bus trim, musicDb, the kick sidechain, whether the duck reaches it); un-ducked voices are kept under '<inst>@free'
// keys. Deterministic: the bed and the cues render from the same seeded streams as the engine.
import * as D from '../../../src/sound/dsp.mjs'
import * as Th from '../../../src/sound/theory.mjs'
import { instruments } from './instruments.mjs'
import { mix } from './mix.mjs'
import { evalDb } from './energy.mjs'
import { BUS_RANK, busOf, routeOf } from '../../../src/sound/routing.mjs'

const SR = 48000
const WIN = 0.05
export const MARGIN = 1.5
export const SEL_MAX = 15
export const LOW_MAX = 8
export const ANCHOR_CAP = 6
/** the anchor stab's peak sits this far (dB) under the peak of the anchor's cues */
export const STAB_PEAK = 9
export const B3_KINDS = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])
/** the layers a selective dip reaches (they mask pitched cues in 0.2-8 kHz); the kick, 808, stab and crashes are not in it */
export const SEL = ['pad', 'arp', 'lead', 'hat', 'clap', 'snare', 'mriser']
export const LOW = ['b808', 'kick']
/** the layers that give way when a teaser's cues are too quiet for the SFX fader (balance.mjs): 1.4x the plan's offset.
 * The stab is not one of them, for the reason MID_LEVER gives below: the give-way is gain automation on the instrument,
 * which the engine applies on the react bus too, so it put the anchor stabs under their budget (until 2026-10-13; 02c,
 * the one teaser whose bed gives way, played them 0.3-0.4 dB under it) */
export const GIVE_WAY = ['arp', 'pad', 'hat', 'clap', 'snare', 'lead', 'crash', 'mriser']
/** the band guard's level levers (bands.mjs): the 808 floor and the mid layers that step back, as constant bus-gain
 * offsets on their instruments. The stab is not one of them: the engine applies automation.gain[inst] to every bus that
 * carries the instrument (engine.mjs), so a stab offset would also reach the anchor stabs at P and V on the react bus,
 * which stabBudget levels against their cues (until 2026-10-13 it did: the payoff's stab sat up to 3 dB under its
 * budget in 02b, 02c and 03c) */
export const MID_LEVER = ['arp', 'lead', 'clap', 'snare', 'mriser']
export const LEVER_INSTS = ['b808', ...MID_LEVER]
export const leverDb = (lv, inst) => (!lv ? 0 : inst === 'b808' ? lv.b808 || 0 : MID_LEVER.includes(inst) ? lv.mid || 0 : 0)
/** how long an instrument's voice rings past its gate (s), for finding the events that sound in a window */
const TAIL = { kick: 0.3, clap: 0.75, snare: 0.5, hat: 1.2, crash: 7, revcrash: 0, mriser: 0.05, b808: 1.3, sub: 2.1, arp: 0.12, pad: 0.35, lead: 0.12, stab: 0.12 }
const SUSTAINED = new Set(['roll', 'type'])
const dbp = x => 10 * Math.log10(Math.max(1e-30, x))
/** g' M g for a symmetric K x K matrix (flattened) */
function quad(M, g) {
  const K = g.length
  let s = 0
  for (let a = 0; a < K; a++) { if (!g[a]) continue; for (let b = 0; b < K; b++) s += g[a] * g[b] * M[a * K + b] }
  return Math.max(0, s)
}
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
/** the bus trim an event's route applies (mix.music, mix.logo or none), linear */
const faderOf = route => D.dbToGain(route.fader === 'music' ? (mix.music || 0) : route.fader === 'logo' ? (mix.logo || 0) : 0)

/** a cue the B3 check covers (the card's cues sit under the sting by design, bible §3.2) */
export const isB3 = (tl, c) => B3_KINDS.has(c.kind) && c.gain >= 0.4 && !c.inCard && c.t < tl.base - 1e-6
const scaleOf = c => clamp(c.gain / 0.7, 0.3, 1.2)
const atP = (tl, c) => Math.abs(c.t - tl.anchors.P.t) <= 0.015
const atV = (tl, c) => !!tl.anchors.V && Math.abs(c.t - tl.anchors.V.t) <= 0.015
const hitAtP = tl => tl.cues.some(x => x.kind === 'hit' && Math.abs(x.t - tl.anchors.P.t) <= 0.015)
/** the §5 table duck [depth, hold, release] a cue gets from the engine without a meta.duck */
function tableDuck(tl, c) {
  const t = (atP(tl, c) && mix.duckBig[c.kind]) || mix.duck[c.kind] || [0, 0, 0.1]
  return { depth: t[0] * scaleOf(c), hold: t[1], release: t[2] }
}
/** the engine's duck curve value (dB <= 0) of one event at time t (fx.mjs duckCurve, lookahead 5 ms) */
function duckVal(e, t) {
  if (!(e.depth > 0)) return 0
  const att = e.attack, t0 = att != null ? e.t : e.t - 0.005, tPeak = att != null ? e.t + att : e.t
  const tHold = Math.max(e.t + (e.hold || 0), e.until ?? -Infinity)
  if (t < t0) return 0
  if (t < tPeak) return -e.depth * (t - t0) / Math.max(1e-6, tPeak - t0)
  if (t <= tHold) return -e.depth
  return -e.depth * Math.exp(-(t - tHold) / Math.max(1e-3, e.release))
}
/** a selective dip's shape (dB <= 0): in over 5 ms before the cue, held over the B3 window, back linearly in dB */
export function selShape(t, depth) {
  const R = 0.12 + 0.01 * depth
  return [{ t: t - 0.006, db: 0 }, { t: t - 0.001, db: -depth }, { t: t + WIN + 0.01, db: -depth }, { t: t + WIN + 0.01 + R, db: 0 }]
}
function shapeVal(pts, t) {
  if (t <= pts[0].t || t >= pts[pts.length - 1].t) return 0
  for (let k = 0; k + 1 < pts.length; k++) if (t <= pts[k + 1].t) { const a = pts[k], b = pts[k + 1]; return a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t) }
  return 0
}

// ---------------------------------------------------------------- the bed and the cues in each window
const BEDS = new WeakMap()
/**
 * The engine's view of compose()'s events: sorted as the engine sorts them (t, bus, instrument, midi, index), each with
 * its per-instrument index k (its noise stream is noise:<inst>:<k>), and a cached renderer (dips left out).
 */
export function eventRenderer(tl, notes, drums) {
  const all = [...notes.map((e, j) => ({ e, j })), ...drums.map((e, j) => ({ e, j }))]
    .filter(x => Number.isFinite(x.e.t) && x.e.t < tl.duration && x.e.inst)
    .map(x => { const bus = busOf(x.e); return { ...x, bus, route: routeOf(bus, x.e.inst, mix), fader: 0 } })
    .sort((a, b) => a.e.t - b.e.t || BUS_RANK[a.bus] - BUS_RANK[b.bus] || (a.e.inst < b.e.inst ? -1 : a.e.inst > b.e.inst ? 1 : 0) || (a.e.midi ?? -1) - (b.e.midi ?? -1) || a.j - b.j)
  for (const x of all) x.fader = faderOf(x.route)
  const count = {}
  for (const x of all) { x.k = count[x.e.inst] = (count[x.e.inst] ?? -1) + 1 }
  const rendered = new Map()
  const render = x => {
    if (rendered.has(x)) return rendered.get(x)
    const fn = instruments[x.e.inst]
    let b = null
    if (fn) {
      const ev = { ...x.e }
      delete ev.dips; delete ev.dip
      const ctx = { tl, ev, rng: tl.stream(`noise:${ev.inst}:${x.k}`), bpm: tl.bpmAt(ev.t), beatLen: tl.beatLen(ev.t), chordAt: tl.chordAt, keyAt: tl.keyAt, k: x.k, D, T: Th }
      b = fn(ev, ctx)
      if (b) b = D.toStereo(b.L ? { L: Float32Array.from(b.L), R: Float32Array.from(b.R), offset: b.offset } : Float32Array.from(b), ev.pan || 0)
      // the velocity it was rendered at: the anchor stabs are budgeted after their first render (stabBudget), and the
      // stab is linear in velocity, so later readers scale the cached render (bands.mjs)
      if (b) b.vel0 = ev.vel
    }
    rendered.set(x, b)
    return b
  }
  return { all, render }
}
/** the music (every bus, levels, bus level and the energy curve applied; no dips, ducks or sidechain) over [t0, t1] */
export function renderSpan(tl, er, musicDb, t0, t1) {
  const i0 = Math.round(t0 * SR), n = Math.round((t1 - t0) * SR)
  const L = new Float64Array(n), R = new Float64Array(n)
  for (const x of er.all) {
    const e = x.e
    if (e.t > t1) break
    if (e.t + (e.runDur ?? e.dur ?? 0) + (TAIL[e.inst] ?? 1) < t0) continue
    const b = er.render(x)
    if (!b) continue
    const lvl = D.dbToGain(mix.levels[e.inst] ?? 0) * x.fader
    const at = Math.round(e.t * SR) - (b.offset || 0)
    for (let i = Math.max(i0, at); i < Math.min(i0 + n, at + b.L.length); i++) {
      const g = lvl * (x.route.musicDb ? Math.pow(10, evalDb(musicDb, i / SR) / 20) : 1)
      L[i - i0] += b.L[i - at] * g; R[i - i0] += b.R[i - at] * g
    }
  }
  return { L, R }
}
/**
 * Render the bed at every B3 cue window from compose()'s final event lists (before any clearance dip). Stores, per cue,
 * the music in [t, t + 50 ms] by key (instrument), at the bus level (energy curve and mix.music for the music bus), and
 * every cue that rings there (gain 1). Called by compose(); the solver reads it.
 */
export function prepareBed(tl, notes, drums, { musicDb, sfxRender, er = eventRenderer(tl, notes, drums) }) {
  const { all, render } = er
  const kicks = drums.filter(d => d.inst === 'kick').map(d => d.t).sort((a, b) => a - b)
  const sc = mix.sidechain
  const scDb = t => {
    let v = 0
    for (const k of kicks) { if (k > t) break; if (t - k > 1) continue; v = Math.min(v, duckVal({ t: k, depth: sc.depth, hold: sc.hold, release: sc.release, attack: sc.attack }, t)) }
    return v
  }
  const cues = tl.cues.filter(c => isB3(tl, c))
  // the music in each window, per key (an instrument, the anchor kicks apart, each unducked anchor stab apart): the
  // samples (gain, bus level and kick sidechain applied) are kept so the solver can sum the keys with their correlation
  // (the hook's kick, 808 and stab start in phase on frame 1: their powers do not simply add)
  const n2 = 2 * Math.round(WIN * SR)
  const cross = vecs => {
    const keys = [...vecs.keys()], K = keys.length, M = new Float64Array(K * K)
    for (let a = 0; a < K; a++) for (let b = a; b < K; b++) {
      const x = vecs.get(keys[a]), y = vecs.get(keys[b])
      let e = 0
      for (let i = 0; i < n2; i++) e += x[i] * y[i]
      M[a * K + b] = M[b * K + a] = e / n2
    }
    return { keys, M }
  }
  const win = new Map()
  for (const c of cues) {
    const t0 = c.t, t1 = c.t + WIN, i0 = Math.round(t0 * SR), n = n2 / 2
    const vecs = new Map()
    for (const x of all) {
      const e = x.e
      if (e.t > t1 + 1e-9) break
      // a legato run's first note renders the whole run (instruments.mjs b808)
      if (e.t + (e.runDur ?? e.dur ?? 0) + (TAIL[e.inst] ?? 1) < t0) continue
      const b = render(x)
      if (!b) continue
      const lvl = D.dbToGain(mix.levels[e.inst] ?? 0) * x.fader
      const at = Math.round(e.t * SR) - (b.offset || 0)
      // the unducked anchor stabs are kept apart by onset (stabBudget scales each); the anchor kicks never dip
      const anchorKick = e.inst === 'kick' && tl.isAnchor(e.t, 0.001)
      const key = !x.route.duck ? (e.inst === 'stab' ? `stab@free:${Math.round(e.t * 1000)}` : `${e.inst}@free`) : anchorKick ? 'kick@a' : e.inst
      let v = vecs.get(key)
      for (let i = Math.max(i0, at); i < Math.min(i0 + n, at + b.L.length); i++) {
        const t = i / SR
        let gdb = 0
        if (x.route.musicDb) gdb += evalDb(musicDb, t)
        if (x.route.sidechain && sc && sc.targets.includes(e.inst)) gdb += scDb(t)
        const g = lvl * Math.pow(10, gdb / 20)
        if (!v) vecs.set(key, v = new Float64Array(n2))
        v[i - i0] += b.L[i - at] * g; v[n + i - i0] += b.R[i - at] * g
      }
    }
    const { keys, M } = cross(vecs)
    const parts = Object.fromEntries(keys.map((k, a) => [k, M[a * keys.length + a]]))
    // the kick's tail may dip under this cue only when no anchor kick sounds near it (the dip is bus automation)
    const kickDip = !drums.some(d => d.inst === 'kick' && tl.isAnchor(d.t, 0.001) && d.t > c.t - 0.3 && d.t < c.t + 0.4)
    win.set(c.i, { t: c.t, parts, keys, M, sfx: [], kickDip })
  }
  // the cues in each window (gain 1, raw renders through the engine's ctx, the engine's cluster cap applied): sfxRender(c)
  // -> stereo buffer. Kept as a cross matrix too (a cluster's members ring together)
  const cueBufs = new Map()
  const cueBuf = c => { if (!cueBufs.has(c.i)) cueBufs.set(c.i, sfxRender(c)); return cueBufs.get(c.i) }
  const capK = new Map()
  for (const cl of tl.clusters) {
    const mem = cl.members.filter(i => cueBuf(tl.cues[i]))
    if (mem.length < 2) continue
    const st = i => { const b = cueBuf(tl.cues[i]); return b.L ? b : { L: b, R: b } }
    const a0 = Math.min(...mem.map(i => Math.round(tl.cues[i].t * SR) - (cueBuf(tl.cues[i]).offset || 0)))
    const a1 = Math.max(...mem.map(i => Math.round(tl.cues[i].t * SR) - (cueBuf(tl.cues[i]).offset || 0) + st(i).L.length))
    const L = new Float64Array(a1 - a0), R = new Float64Array(a1 - a0)
    let top = 0
    for (const i of mem) {
      const b = st(i), o = Math.round(tl.cues[i].t * SR) - (cueBuf(tl.cues[i]).offset || 0) - a0, g = tl.cues[i].gain
      let pk = 0
      for (let j = 0; j < b.L.length; j++) { L[o + j] += b.L[j] * g; R[o + j] += b.R[j] * g; pk = Math.max(pk, Math.abs(b.L[j]), Math.abs(b.R[j])) }
      top = Math.max(top, pk * g)
    }
    let pk = 0
    for (let j = 0; j < L.length; j++) pk = Math.max(pk, Math.abs(L[j]), Math.abs(R[j]))
    const cap = top * Math.pow(10, 1.5 / 20)
    if (pk > cap) for (const i of mem) capK.set(i, cap / pk)
  }
  for (const c of cues) {
    const w = win.get(c.i), i0 = Math.round(c.t * SR), n = n2 / 2
    const vecs = new Map()
    for (const o of tl.cues) {
      if (o.t > c.t + WIN + 0.2 || o.t + (o.dur || 0) + 3 < c.t) continue
      const b = cueBuf(o)
      if (!b) continue
      const st = b.L ? b : { L: b, R: b }, k = capK.get(o.i) ?? 1
      const at = Math.round(o.t * SR) - (b.offset || 0)
      let v = null
      for (let i = Math.max(i0, at); i < Math.min(i0 + n, at + st.L.length); i++) {
        if (!v) v = new Float64Array(n2)
        v[i - i0] = st.L[i - at] * k; v[n + i - i0] = st.R[i - at] * k
      }
      if (v) vecs.set(o.i, v)
    }
    const { keys, M } = cross(vecs)
    w.sfxKeys = keys; w.C = M
    w.sfx = keys.map((i, a) => ({ i, p: M[a * keys.length + a] }))
  }
  // the anchor stabs' summed peak (the 6 notes at their level), and the peak of the cues at each anchor (gain applied),
  // over the first 200 ms: the stab's budget keeps the limiter from eating the payoff (stabBudget)
  const stabPeak = new Map(), sfxPeak = new Map()
  for (const x of all) {
    if (x.route.duck || x.e.inst !== 'stab') continue
    const key = `stab@free:${Math.round(x.e.t * 1000)}`
    if (!stabPeak.has(key)) stabPeak.set(key, { t: x.e.t, L: new Float64Array(Math.round(0.2 * SR)), R: new Float64Array(Math.round(0.2 * SR)) })
    const acc = stabPeak.get(key), b = render(x)
    if (!b) continue
    const g = D.dbToGain(mix.levels.stab ?? 0) * x.fader * (x.route.musicDb ? Math.pow(10, evalDb(musicDb, x.e.t) / 20) : 1)
    for (let i = 0; i < acc.L.length && i < b.L.length; i++) { acc.L[i] += b.L[i] * g; acc.R[i] += b.R[i] * g }
  }
  for (const [key, acc] of stabPeak) {
    let pk = 0
    for (let i = 0; i < acc.L.length; i++) pk = Math.max(pk, Math.abs(acc.L[i]), Math.abs(acc.R[i]))
    stabPeak.set(key, pk)
    const L = new Float64Array(acc.L.length), R = new Float64Array(acc.L.length), i0 = Math.round(acc.t * SR)
    for (const o of tl.cues) {
      if (o.t > acc.t + 0.2 || o.t + (o.dur || 0) + 2 < acc.t) continue
      const b = cueBuf(o)
      if (!b) continue
      const st = b.L ? b : { L: b, R: b }, at = Math.round(o.t * SR) - (b.offset || 0) - i0
      const gk = o.gain * (capK.get(o.i) ?? 1)
      for (let i = Math.max(0, at); i < Math.min(L.length, at + st.L.length); i++) { L[i] += st.L[i - at] * gk; R[i] += st.R[i - at] * gk }
    }
    let sp = 0
    for (let i = 0; i < L.length; i++) sp = Math.max(sp, Math.abs(L[i]), Math.abs(R[i]))
    sfxPeak.set(key, sp)
  }
  const bed = { win, cues, solved: new Map(), stabK: new Map(), stabPeak, sfxPeak }
  BEDS.set(tl, bed)
  return bed
}
export const bedFor = tl => BEDS.get(tl) || null

/**
 * The anchor stabs at P and V play unducked: each is scaled so its 50 ms power sits 3 dB under what the anchor's cues
 * leave the music (Psfx - 3 - MARGIN - 3 dB), and its peak 9 dB under theirs (the payoff's hit already runs into the
 * limiter: the stab must fill 250 Hz-3 kHz, where the hit is thin, without adding to its peak), at most its nominal
 * velocity. Returns the linear velocity factor.
 */
export function stabBudget(tl, t, trimOf = () => 0) {
  const bed = bedFor(tl)
  if (!bed) return 1
  const c = bed.cues.find(x => Math.abs(x.t - t) <= 0.015)
  const key = `stab@free:${Math.round(t * 1000)}`
  if (!c) return 1
  const w = bed.win.get(c.i), ps = w.parts[key] || 0
  if (!(ps > 0)) return 1
  // the cues as the fader leaves them (compose() calls this again once the plan's trims are known)
  const psfx = quad(w.C, w.sfxKeys.map(i => tl.cues[i].gain * Math.pow(10, trimOf(tl.cues[i]) / 20)))
  const budget = psfx / Math.pow(10, (3 + MARGIN + 3) / 10)
  const sp = bed.sfxPeak.get(key) || 0, kp = bed.stabPeak.get(key) || 0
  const kPeak = sp > 0 && kp > 0 ? sp * Math.pow(10, -STAB_PEAK / 20) / kp : 1
  const k = Math.min(1, Math.sqrt(budget / ps), kPeak)
  bed.stabK.set(key, k * k)
  return k
}

// ---------------------------------------------------------------- the solver
/**
 * solve(tl, { trim(c) -> dB (the SFX fader's trim per cue), offset (the bed's give-way dB, compose's GIVE_WAY layers) })
 * -> Map(cue index -> { broad, hold, release, sel, low, lift, deep, margin, table }). broad is the engine depth (dB,
 * already scaled by the cue gain), sel and low are absolute dips (dB), lift is added to the cue's trim.
 */
export function solve(tl, { trim = () => 0, offset = 0, giveWay = [], levers = null } = {}) {
  const bed = bedFor(tl)
  if (!bed) throw new Error('scoreboard clearance: compose() must run before the clearance is solved')
  const out = new Map()
  const P = tl.anchors.P.t, payoff = mix.payoffDuck
  // the broadband ducks already decided (every cue's table duck, the payoff duck), the selective and 808 dips so far
  const ducks = tl.cues.filter(c => !isB3(tl, c) || c.inCard).map(c => {
    const d = tableDuck(tl, c)
    return { t: c.t, depth: d.depth, hold: d.hold, release: d.release, ...(SUSTAINED.has(c.kind) ? { until: c.t + (c.dur || 0), attack: 0.02 } : {}) }
  })
  if (payoff && payoff.depth > 0) ducks.push({ t: P, depth: payoff.depth, hold: payoff.hold ?? 0.15, release: payoff.release ?? 0.45 })
  const sels = [], lows = []
  const offDb = inst => (giveWay.includes(inst) ? 1.4 * Math.min(0, offset) : 0) + leverDb(levers, inst)
  const lifts = new Map()
  const groups = []
  for (const c of bed.cues) {
    const g = groups.find(x => Math.abs(x.t - c.t) <= 0.015)
    if (g) g.members.push(c); else groups.push({ t: c.t, members: [c] })
  }
  const hitP = hitAtP(tl)
  for (const grp of groups) {
    const c0 = grp.members[0], w = bed.win.get(c0.i)
    const tm = c0.t + WIN / 2
    const hook = c0.t <= 0.02, isV = grp.members.some(c => atV(tl, c)), isP = grp.members.some(c => atP(tl, c))
    const tab = grp.members.map(c => tableDuck(tl, c)).reduce((a, d) => (d.depth > a.depth ? d : a), { depth: 0, hold: 0, release: 0.1 })
    const ambBroad = Math.max(0, ...ducks.map(d => -duckVal(d, tm)))
    const ambSel = Math.max(0, ...sels.map(s => -shapeVal(s, tm)))
    const ambLow = Math.max(0, ...lows.map(s => -shapeVal(s, tm)))
    let lift = 0
    const liftOf = i => (lifts.get(i) || 0) + (grp.members.some(c => c.i === i) ? lift : 0)
    const psfx = () => quad(w.C, w.sfxKeys.map(i => tl.cues[i].gain * Math.pow(10, (trim(tl.cues[i]) + liftOf(i)) / 20)))
    const pmus = (broad, sel, low) => quad(w.M, w.keys.map(k => {
      if (k.startsWith('stab@free:')) return Math.sqrt(bed.stabK.get(k) ?? 1)
      if (k.includes('@free')) return 1
      let d = Math.max(broad, ambBroad)
      if (SEL.includes(k)) d += Math.max(sel, ambSel)
      if (LOW.includes(k) && (k !== 'kick' || w.kickDip)) d += Math.max(low, ambLow)
      return Math.pow(10, (offDb(k) - d) / 20)
    }))
    const ok = (b, s, l) => dbp(psfx()) - dbp(pmus(b, s, l)) >= 3 + MARGIN
    const res = { broad: tab.depth, hold: tab.hold, release: tab.release, sel: 0, low: 0, lift: 0, deep: false, table: +tab.depth.toFixed(2) }
    if (isP && hitP) {
      res.fixed = true
    } else {
      const cap = hook || isV ? Math.max(tab.depth, ANCHOR_CAP) : 1.5 * tab.depth
      // the hook's count and the verdict may come up 6 dB; elsewhere a soft cue (gain <= 0.5) 6 dB, others 3, never past gain 1
      const liftMax = Math.min(...grp.members.map(c => Math.max(0, Math.min(hook || isV || c.gain <= 0.5 + 1e-9 ? 6 : 3, -20 * Math.log10(c.gain)))))
      const search = (lo, hi, f) => { if (f(lo)) return lo; if (!f(hi)) return null; for (let k = 0; k < 18; k++) { const m = (lo + hi) / 2; if (f(m)) hi = m; else lo = m } return hi }
      const tryLift = x => { lift = x; return true }
      let b = tab.depth, s = 0, l = 0
      if (!ok(b, s, l)) {
        // escalate: the selective dip, the 808 and kick-tail dip, the cue's lift, broadband to the cap, beyond it
        const s1 = search(0, SEL_MAX, x => ok(b, x, 0)); s = s1 ?? SEL_MAX
        if (s1 == null) {
          const l1 = search(0, LOW_MAX, x => ok(b, s, x)); l = l1 ?? LOW_MAX
          if (l1 == null) {
            const lf = search(0, Math.max(0, liftMax), x => tryLift(x) && ok(b, s, l)); tryLift(lf ?? Math.max(0, liftMax))
            if (lf == null) {
              const b1 = search(b, cap, x => ok(x, s, l)); b = b1 ?? cap
              if (b1 == null) {
                // a cue that is still short (a pop on an E5 808, say) may come up to +6 dB (never past gain 1) before the
                // broadband duck goes past its cap
                const lMax2 = Math.min(...grp.members.map(c => Math.max(0, Math.min(6, -20 * Math.log10(c.gain)))))
                const lf2 = lMax2 > lift ? search(lift, lMax2, x => tryLift(x) && ok(b, s, l)) : null
                if (lf2 == null) { tryLift(Math.max(lift, lMax2)); const b2 = search(cap, 15, x => ok(x, s, l)); b = b2 ?? 15; res.deep = true }
              }
            }
          }
          // then give back what the later levers made unnecessary: the 808 and kick dip first, then the selective dip
          l = search(0, l, x => ok(b, s, x)) ?? l
          s = search(0, s, x => ok(b, x, l)) ?? s
        }
      }
      Object.assign(res, { broad: b, sel: s, low: l, lift })
      if (b > tab.depth + 0.05) { res.hold = Math.max(Math.min(tab.hold, 0.08), 0.055); res.release = b > 9 ? Math.min(tab.release, 0.12) : tab.release }
    }
    res.margin = +(dbp(psfx()) - dbp(pmus(res.broad, res.sel, res.low))).toFixed(2)
    for (const c of grp.members) {
      out.set(c.i, res)
      if (res.lift) lifts.set(c.i, res.lift)
    }
    ducks.push({ t: c0.t, depth: res.broad, hold: res.hold, release: res.release })
    if (res.sel > 0.05) sels.push(selShape(c0.t, res.sel))
    if (res.low > 0.05) lows.push([{ t: c0.t - 0.01, db: -res.low }, { t: c0.t + WIN, db: -res.low }, { t: c0.t + WIN + 0.2, db: 0 }])
  }
  return out
}

/** the deepest of several dip shapes, as engine gain points (evaluated at every breakpoint and between them) */
function combine(list, off = 0) {
  if (!list.length) return null
  const ts = [...new Set(list.flatMap(s => s.map(p => +p.t.toFixed(6))))].sort((a, b) => a - b)
  const val = t => Math.min(0, ...list.map(s => shapeVal(s, t)))
  const pts = [{ t: 0, db: +(val(0) + off).toFixed(3) }]
  for (let k = 0; k < ts.length; k++) {
    if (ts[k] > 0) pts.push({ t: ts[k], db: +(val(ts[k]) + off).toFixed(3) })
    if (k + 1 < ts.length) { const m = (ts[k] + ts[k + 1]) / 2; if (m > 0) pts.push({ t: m, db: +(val(m) + off).toFixed(3) }) }
  }
  return pts
}
/**
 * The clearance as engine gain automation ({ inst: [{ t, db }] }): the selective dips on the SEL layers, the kick-tail
 * dips on the kick (only where no anchor kick sounds), and the bed's give-way offset on the GIVE_WAY layers.
 */
export function selAutomation(tl, res, { offset = 0, giveWay = [], levers = null } = {}) {
  const bed = bedFor(tl)
  const sel = [], kick = []
  for (const [i, r] of res) {
    const t = tl.cues[i].t
    if (r.sel > 0.05) sel.push(selShape(t, r.sel))
    if (r.low > 0.05 && bed && bed.win.get(i) && bed.win.get(i).kickDip) kick.push(selShape(t, r.low))
  }
  const gain = {}
  for (const inst of new Set([...SEL, ...giveWay, 'kick', ...LEVER_INSTS])) {
    const off = (giveWay.includes(inst) ? 1.4 * Math.min(0, offset) : 0) + leverDb(levers, inst)
    const pts = combine(inst === 'kick' ? kick : SEL.includes(inst) ? sel : [], off)
    if (pts) gain[inst] = pts
    else if (Math.abs(off) > 0.01) gain[inst] = [{ t: 0, db: +off.toFixed(3) }]
  }
  return gain
}
