// The timeline (sound bible §2): what the music hangs on. Built from a cue record (cues.mjs) before any pack runs.
//   cue prep (§2.1), the payoff P (§2.2), the tempo map (§2.3), the card anchor L (§2.4), sections and energy (§2.5),
//   the density map (§2.6), and the queries packs use (§2.7): beatAt, timeAt, barAt, chordAt, keyAt, plus helpers.
// Pure and deterministic: the same record (and overrides) gives the same timeline.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rngFor } from './dsp.mjs'
import { chord as parseChord, key as makeKey } from './theory.mjs'

export const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..')
export const OVERRIDES_FILE = path.join(STUDIO, 'sound', 'overrides.json')

/** per-look defaults from the bible (§1 key, §2.3 tempo, §2.5 TENSION length); a pack's own fields override these */
export const LOOK_DEFAULTS = {
  scoreboard: { key: ['D', 'minor'], tempo: { lo: 136, hi: 152, target: 144, syncGrid: 4, absLo: 128, absHi: 160 }, tensionBeats: 8, card: 'scoreboard' },
  'becker-rig': { key: ['D', 'major'], tempo: { lo: 112, hi: 128, target: 120, syncGrid: 2, absLo: 104, absHi: 136 }, tensionBeats: 4, card: 'becker-rig' },
  '*': { key: ['D', 'major'], tempo: { lo: 112, hi: 128, target: 120, syncGrid: 2, absLo: 104, absHi: 136 }, tensionBeats: 4, card: 'generic' },
}
/** default durations for cue kinds that take `dur` (as src/audio.mjs) */
export const DEFAULT_DUR = { whoosh: 0.35, riser: 2, roll: 1.5, type: 0.6, swipe: 0.22 }
/** §2.3 sync weights */
export const SYNC_W = { hit: 3, reveal: 3, thud: 2, ding: 1.5, cash: 1, step: 1, pop: 1, tick: 0.5, swipe: 0.5 }
/** §2.6 density weights (roll handled separately: 2 per 0.25 s active) */
export const LOAD_W = { tick: 0.5, type: 0.5, pop: 0.5, swipe: 0.5, whoosh: 0.5, step: 0.5, thud: 1, ding: 1, buzz: 1, boing: 1, cash: 1.5, hit: 2, reveal: 2, roll: 2, riser: 0 }
/** §8.4 merge priority (lower number = higher priority) */
export const BODY_PRIORITY = { hit: 0, reveal: 1, thud: 2, cash: 3, boing: 4, buzz: 5 }
export const LOGO_CHORD = 'D(add9)'
const EPS = 1e-9

export function readOverrides(file = OVERRIDES_FILE) {
  try { return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {} } catch (e) { throw new Error(`${file}: ${e.message}`) }
}
function tempoOf(look, pack) {
  const d = LOOK_DEFAULTS[look] || LOOK_DEFAULTS['*']
  const t = { ...d.tempo, ...((pack && pack.tempo) || {}) }
  t.syncGrid = t.syncGrid === '16th' || t.syncGrid === 16 ? 4 : t.syncGrid === '8th' || t.syncGrid === 8 ? 2 : +t.syncGrid || 2
  return t
}

// ---------------------------------------------------------------- §2.1 cue preparation
export function prepareCues(sfx, base) {
  const out = []
  sfx.forEach((c, raw) => {
    if (!(c.t >= -0.10)) return
    const kind = c.kind
    out.push({ ...c, kind, t: Math.max(0, c.t), tCue: c.t, gain: c.gain ?? 1, dur: c.dur ?? DEFAULT_DUR[kind] ?? 0, raw })
  })
  out.sort((a, b) => a.t - b.t || a.raw - b.raw)
  const perKind = {}
  out.forEach((c, i) => { c.i = i; c.n = perKind[c.kind] = (perKind[c.kind] ?? -1) + 1; c.inCard = c.t >= base - 1e-6 })
  return out
}
/** §2.1 clock trains: >= 6 same-kind cues at constant spacing (±6 ms between consecutive same-kind cues) */
export function findTrains(cues, { min = 6, tol = 0.006 } = {}) {
  const trains = []
  const kinds = [...new Set(cues.map(c => c.kind))].sort()
  for (const k of kinds) {
    const list = cues.filter(c => c.kind === k)
    let s = 0
    while (s < list.length - 1) {
      const p = list[s + 1].t - list[s].t
      let e = s + 1
      if (p > 0.05) while (e + 1 < list.length && Math.abs(list[e + 1].t - list[e].t - p) <= tol) e++
      const count = e - s + 1
      if (p > 0.05 && count >= min) {
        const members = list.slice(s, e + 1)
        const period = (members[members.length - 1].t - members[0].t) / (count - 1)
        const tr = { id: trains.length, kind: k, period, k: count, t0: members[0].t, t1: members[members.length - 1].t, members: members.map(c => c.i) }
        members.forEach((c, j) => { c.train = { id: tr.id, index: j, period, k: count } })
        trains.push(tr)
        s = e
      } else s++
    }
  }
  return trains
}
/** §2.1 clusters: cues within 15 ms of each other (chained). Only clusters of >= 2 are returned; members get .cluster */
export function findClusters(cues, { gap = 0.015 } = {}) {
  const clusters = []
  let cur = []
  const flush = () => {
    if (cur.length >= 2) {
      const ranked = cur.slice().sort((a, b) => (BODY_PRIORITY[a.kind] ?? 9) - (BODY_PRIORITY[b.kind] ?? 9) || b.gain - a.gain || a.i - b.i)
      const cl = { id: clusters.length, t: cur[0].t, members: cur.map(c => c.i), ranked: ranked.map(c => c.i) }
      ranked.forEach((c, r) => { c.cluster = { id: cl.id, rank: r, size: cur.length } })
      clusters.push(cl)
    }
    cur = []
  }
  for (const c of cues) {
    if (cur.length && c.t - cur[cur.length - 1].t > gap + EPS) flush()
    cur.push(c)
  }
  flush()
  return clusters
}

// ---------------------------------------------------------------- §2.2 the payoff
export function findPayoff(cues, base, verdict, over = {}) {
  const body = cues.filter(c => c.t >= 1.0 && c.t < base - 1.0)
  const cands = []
  if (over && Number.isFinite(+over.payoff)) cands.push({ score: 7, t: +over.payoff, rule: 'override' })
  for (const r of body.filter(c => c.kind === 'riser')) {
    const end = r.t + (r.dur || 2)
    const h = body.filter(c => ['hit', 'cash', 'reveal'].includes(c.kind) && c.t >= end - 0.25 - EPS && c.t <= end + 0.8 + EPS)
    if (h.length) cands.push({ score: 6, t: h[0].t, rule: 'riser', riser: r.i })
  }
  for (const c of body) if (c.kind === 'hit' && body.some(x => x.kind === 'cash' && x.t - c.t >= -EPS && x.t - c.t <= 0.15 + EPS)) cands.push({ score: 4, t: c.t, rule: 'hit+cash' })
  if (verdict) {
    const V = verdict.t
    const vh = body.some(c => c.kind === 'hit' && Math.abs(c.t - V) <= 0.05 + EPS)
    cands.push({ score: vh ? 5 : 3, t: V, rule: vh ? 'verdict+hit' : 'verdict' })
  }
  cands.sort((a, b) => a.score - b.score || a.t - b.t)
  let best = cands[cands.length - 1]
  if (!best || !(best.t > 0) || best.t >= base) {
    // not in the bible (no spec needs it): the heaviest cue in the body window, ties to the later; else 60% of base
    const w = body.filter(c => (LOAD_W[c.kind] || 0) > 0).map(c => ({ c, s: (LOAD_W[c.kind] || 0) * c.gain }))
    w.sort((a, b) => a.s - b.s || a.c.t - b.c.t)
    best = w.length ? { score: 0, t: w[w.length - 1].c.t, rule: 'fallback:heaviest' } : { score: 0, t: Math.round(Math.max(0.5, Math.min(base - 0.5, base * 0.6)) * 1000) / 1000, rule: 'fallback:none' }
  }
  return { ...best, candidates: cands }
}

// ---------------------------------------------------------------- §2.3 the tempo map
export function segmentOne(cues, P, T) {
  const sync = cues.filter(c => c.t >= 0 && c.t < P - 0.01 && SYNC_W[c.kind] != null)
  let best = null
  const scan = (lo, hi) => {
    for (let N = Math.ceil(P * lo / 60 - EPS); N <= Math.floor(P * hi / 60 + EPS); N++) {
      if (N < 1) continue
      const bpm = 60 * N / P, g = 60 / bpm / T.syncGrid
      let s = 0
      for (const c of sync) { const d = Math.abs(c.t / g - Math.round(c.t / g)) * g; s += SYNC_W[c.kind] * Math.max(0, 1 - d / 0.035) }
      const score = s - 0.5 * Math.abs(bpm - T.target) - (N % 4 === 0 ? 0 : N % 4 === 2 ? 4 : 8)
      if (!best || score > best.score + 1e-9) best = { score, n: N, bpm }
    }
  }
  scan(T.lo, T.hi)
  if (!best) scan(T.absLo, T.absHi)
  if (!best) { const N = Math.max(1, Math.round(P * T.target / 60)); best = { score: -Infinity, n: N, bpm: 60 * N / P, forced: true } }
  return best
}
export function pick(a, b, ref, T) {
  const lo = Math.max(ref * 0.92, T.absLo), hi = Math.min(ref * 1.08, T.absHi)
  let best = null
  for (let N = Math.ceil((b - a) * lo / 60 - EPS); N <= Math.floor((b - a) * hi / 60 + EPS); N++) {
    if (N < 1) continue
    const bpm = 60 * N / (b - a)
    const cost = Math.abs(bpm - ref) / ref * 100 + (N % 4 === 0 ? 0 : N % 4 === 2 ? 2.5 : 4)
    if (!best || cost < best.cost - 1e-9) best = { cost, n: N, bpm }
  }
  return best
}
/** the §2.3 plan: segment 1 and the later segments (with the verdict anchor test). Returns { seg1, V, plan: [{a,b,n,bpm,to}] } */
export function tempoPlan(cues, P, base, verdict, T, over = {}) {
  const s1 = segmentOne(cues, P, T)
  let plan = null, Vt = null
  const V = verdict ? verdict.t : null
  if (V != null && over.verdictAnchor !== false && V > P && V < base && V - P >= 4 * 60 / s1.bpm - EPS) {
    const a = pick(P, V, s1.bpm, T), b = pick(V, base, s1.bpm, T)
    if (a && b && Math.abs(a.bpm - s1.bpm) / s1.bpm <= 0.05 + EPS && Math.abs(b.bpm - s1.bpm) / s1.bpm <= 0.05 + EPS) {
      plan = [{ a: P, b: V, n: a.n, bpm: a.bpm, to: 'V' }, { a: V, b: base, n: b.n, bpm: b.bpm, to: 'base' }]
      Vt = V
    }
  }
  if (!plan) {
    const p = base > P ? pick(P, base, s1.bpm, T) : null
    if (p) plan = [{ a: P, b: base, n: p.n, bpm: p.bpm, to: 'base' }]
    else if (base > P) {
      // base left free (§2.3): keep BPM1 and hold the cadence chord until base
      const n = Math.max(0, Math.floor((base - P) * s1.bpm / 60 + EPS))
      plan = [{ a: P, b: base, n, bpm: s1.bpm, to: 'base', free: true }]
    } else plan = []
  }
  return { seg1: { a: 0, b: P, n: s1.n, bpm: s1.bpm, to: 'P', score: s1.score, forced: !!s1.forced }, V: Vt, plan }
}

// ---------------------------------------------------------------- §2.4 card anchor
export function cardAnchor(rec, cues, look, pack) {
  const b = rec.brand
  if (!b || b.t0 == null) return null
  const t0 = b.t0, dur = b.dur
  const k = Math.min(1, Math.max(0.6, (dur - 0.8) / 1.7))
  let L = t0 + 0.30, how = 'generic'
  const kind = b.card === 'kit' ? ((pack && pack.card) || (LOOK_DEFAULTS[look] || LOOK_DEFAULTS['*']).card) : 'generic'
  if (kind === 'scoreboard') {
    const p = cues.find(c => c.kind === 'pop' && c.t >= t0 - EPS && c.t <= t0 + 0.25 + EPS)
    if (p) { L = p.t + 0.30 * k; how = 'scoreboard:pop+0.30k' }
  } else if (kind === 'becker-rig') {
    const h = cues.find(c => c.kind === 'hit' && c.t >= t0 - EPS && c.t <= t0 + dur + EPS)
    if (h) { L = h.t; how = 'becker-rig:hit' }
  }
  return { t0, dur, k, L, how, kind: b.card }
}

// ---------------------------------------------------------------- the timeline
/**
 * Build the timeline for a cue record. pack: the sound pack (its tempo/key/tensionBeats/card override the look defaults).
 * opts: { overrides } (the parsed overrides.json; default: read studio/sound/overrides.json)
 */
export function buildTimeline(rec, pack = null, { overrides } = {}) {
  const over = ((overrides !== undefined ? overrides : readOverrides()) || {})[rec.id] || {}
  const look = rec.look
  const LD = LOOK_DEFAULTS[look] || LOOK_DEFAULTS['*']
  const T = tempoOf(look, pack)
  const base = rec.base, duration = rec.duration
  const cues = prepareCues(rec.sfx, base)
  const trains = findTrains(cues)
  const clusters = findClusters(cues)
  const payoff = findPayoff(cues, base, rec.verdict, over)
  const P = payoff.t
  const tp = tempoPlan(cues, P, base, rec.verdict, T, over)
  const segs = [tp.seg1, ...tp.plan]
  // global beat index at each segment start
  let beat = 0
  for (const s of segs) { s.beat0 = beat; beat += s.n; s.beat1 = beat }
  const lastSeg = segs[segs.length - 1]
  const card = cardAnchor(rec, cues, look, pack)

  // ---- queries
  const segAt = t => { for (let i = segs.length - 1; i >= 0; i--) if (t >= segs[i].a - EPS) return segs[i]; return segs[0] }
  const beatAt = t => {
    if (t >= base) return lastSeg.beat0 + (t - lastSeg.a) * lastSeg.bpm / 60
    const s = segAt(t)
    return s.beat0 + (t - s.a) * s.bpm / 60
  }
  const timeAt = b => {
    let s = segs[0]
    for (const x of segs) if (b >= x.beat0 - EPS) s = x
    return s.a + (b - s.beat0) * 60 / s.bpm
  }
  const bpmAt = t => segAt(Math.min(t, base - EPS)).bpm
  const beatLen = t => 60 / bpmAt(t)

  // ---- bars (§2.3: pickup bar 0 of r1 beats; later segments: whole bars, then a break of r beats before the end)
  const bars = []
  const pushBar = (b0, beats, seg, extra = {}) => bars.push({ i: bars.length, beat: b0, beats, t: timeAt(b0), t1: timeAt(b0 + beats), bpm: seg.bpm, seg: segs.indexOf(seg), ...extra })
  {
    const s = segs[0], r1 = s.n % 4
    let b = 0
    if (r1) { pushBar(0, r1, s, { pickup: true }); b = r1 }
    while (b + 4 <= s.n + EPS) { pushBar(b, 4, s); b += 4 }
    for (const x of segs.slice(1)) {
      const r = x.free ? 0 : x.n % 4
      let k = x.beat0
      const full = Math.floor(x.n / 4)
      for (let j = 0; j < full; j++) { pushBar(k, 4, x); k += 4 }
      if (x.free) {
        const left = (x.b - timeAt(k)) * x.bpm / 60
        if (left > 1e-6) pushBar(k, left, x, { brk: true, free: true })
      } else if (r) pushBar(k, r, x, { brk: true })
    }
  }
  // fix bar end times exactly at anchors (float drift)
  for (const b of bars) { b.t1 = Math.min(b.t1, base) }

  // ---- sections (§2.5), in beats
  const Pb = segs[0].n, baseB = lastSeg.beat1 ?? Pb
  const beatOfT = t => beatAt(t)
  const hookEnd = Math.min(Pb, bars.length ? (bars[0].pickup && bars[1] ? bars[1].beat + bars[1].beats : bars[0].beats) : Pb)
  let tStart
  if (payoff.rule === 'riser' && payoff.riser != null) {
    const rb = beatOfT(cues[payoff.riser].t)
    const fl = Math.floor(rb), fr = rb - fl
    tStart = fr <= 0.5 + 1e-9 ? fl : fl + 1   // nearest beat, a tie goes to the earlier one
  } else tStart = Pb - (pack && pack.tensionBeats || LD.tensionBeats)
  tStart = Math.min(tStart, Pb - 2)
  tStart = Math.max(tStart, hookEnd)
  const V = tp.V
  const PV = V != null ? segs[1] : null
  const Vb = V != null ? PV.beat1 : null
  const rPV = PV ? PV.n % 4 : 0
  const rLast = lastSeg === segs[0] ? 0 : (lastSeg.free ? 0 : lastSeg.n % 4)
  const breakB = V != null && rPV ? Vb - rPV : null
  const vLimit = V != null ? (breakB ?? Vb) : Infinity
  const cadNominal = baseB - 4 - rLast
  let dropEnd = Math.min(Pb + 8, vLimit, cadNominal)
  if (dropEnd < Pb + 4) dropEnd = Math.min(Pb + 4, vLimit, baseB)
  dropEnd = Math.max(dropEnd, Pb)
  const verdictEnd = V != null ? Math.min(Vb + 4, baseB) : null
  const cadStart = Math.min(baseB, Math.max(cadNominal, V != null ? verdictEnd : dropEnd))
  const S = []
  const add = (name, b0, b1, extra = {}) => { if (b1 - b0 > 1e-6) S.push({ name, b0, b1, t0: timeAt(b0), t1: timeAt(b1), ...extra }) }
  add('HOOK', 0, hookEnd)
  add('BUILD', hookEnd, tStart)
  add('TENSION', tStart, Pb)
  add('DROP', Pb, dropEnd)
  if (V != null) {
    add('HOLD', dropEnd, breakB ?? Vb)
    if (breakB != null) add('BREAK', breakB, Vb)
    add('VERDICT', Vb, verdictEnd)
    add('HOLD2', verdictEnd, cadStart)
  } else add('HOLD', dropEnd, cadStart)
  add('CADENCE', cadStart, baseB)
  if (card) S.push({ name: 'CARD', b0: baseB, b1: beatAt(duration), t0: base, t1: duration })
  // exact anchor times on section edges
  for (const s of S) { if (Math.abs(s.b0 - Pb) < 1e-9) s.t0 = P; if (Math.abs(s.b1 - Pb) < 1e-9) s.t1 = P; if (Math.abs(s.b1 - baseB) < 1e-9 && s.name !== 'CARD') s.t1 = base }
  const sectionAtBeat = b => { for (const s of S) if (b >= s.b0 - 1e-9 && b < s.b1 - 1e-9) return s; return b >= baseB ? S[S.length - 1] : S[0] }
  const sectionAt = t => sectionAtBeat(beatAt(t))
  // BUILD phrases (4 bars from the HOOK end) and the E3 -> E4 step
  const build = S.find(s => s.name === 'BUILD')
  const phrases = []
  let stepBar = null
  if (build) {
    const inBuild = bars.filter(b => b.beat >= build.b0 - 1e-9 && b.beat < build.b1 - 1e-9)
    for (let j = 0; j < inBuild.length; j += 4) phrases.push({ i: phrases.length, bars: inBuild.slice(j, j + 4).map(b => b.i), t0: inBuild[j].t, b0: inBuild[j].beat })
    const mid = (build.t0 + build.t1) / 2
    let best = null
    for (const b of inBuild) { const d = Math.abs(b.t - mid); if (!best || d < best.d - 1e-6) best = { d, b } }
    stepBar = best ? best.b.i : null
  }

  // ---- density map (§2.6), per beat over [0, base)
  const beats = []
  const rolls = cues.filter(c => c.kind === 'roll')
  for (let b = 0; b < baseB - 1e-9; b++) {
    const t0 = timeAt(b), t1 = Math.min(base, timeAt(b + 1))
    let load = 0, rollActive = false
    for (const c of cues) if (c.t >= t0 - EPS && c.t < t1 - EPS && c.kind !== 'roll') load += c.gain * (LOAD_W[c.kind] || 0)
    for (const r of rolls) { const ov = Math.min(t1, r.t + r.dur) - Math.max(t0, r.t); if (ov > 0) { load += 2 * ov / 0.25; rollActive = true } }
    beats.push({ i: b, t: t0, t1, load, rollActive, dense: load >= 1.5 - EPS || rollActive })
  }
  beats.forEach((x, j) => { x.sparse = x.load === 0 && (j === 0 || beats[j - 1].load === 0) })
  const weightOf = c => LOAD_W[c.kind] || 0

  // ---- bars: section, energy, density tags
  const hold = S.find(s => s.name === 'HOLD')
  const holdQuiet = hold && !cues.some(c => c.t >= hold.t0 - EPS && c.t < hold.t1 - EPS && weightOf(c) >= 1) && (hold.b1 - hold.b0) > 16 + 1e-9
  for (const b of bars) {
    const s = sectionAtBeat(b.beat + 1e-6)
    b.section = s.name
    const split = S.filter(x => x.b0 > b.beat + 1e-6 && x.b0 < b.beat + b.beats - 1e-6).map(x => ({ beat: x.b0 - b.beat, section: x.name }))
    if (split.length) b.split = split
    const bb = beats.filter(x => x.i >= b.beat - 1e-9 && x.i < b.beat + b.beats - 1e-9)
    b.dense = bb.filter(x => x.dense).length
    b.sparse = bb.filter(x => x.sparse).length
    b.load = bb.reduce((a, x) => a + x.load, 0)
    const inBar = cues.filter(c => c.t >= b.t - EPS && c.t < b.t1 - EPS)
    b.cues = inBar.length
    b.cueBar = inBar.some(c => weightOf(c) >= 1)
    b.rolls = rolls.filter(r => r.t < b.t1 && r.t + r.dur > b.t).map(r => r.i)
    let E
    switch (s.name) {
      case 'HOOK': E = b.i === 0 ? 4 : 3; break
      case 'BUILD': E = stepBar != null && b.i >= stepBar ? 4 : 3; break
      case 'TENSION': E = 4; break
      case 'DROP': E = 5; break
      case 'HOLD': {
        E = 3
        if (holdQuiet) { const k = Math.floor((b.beat - hold.b0) / 16 + 1e-9); E = Math.min(4, 3 + k) }
        break
      }
      case 'BREAK': E = 2; break
      case 'VERDICT': E = 4; break
      case 'HOLD2': case 'CADENCE': E = 3; break
      default: E = 3
    }
    b.energy = E
    if (phrases.length) { const ph = phrases.find(p => p.bars.includes(b.i)); if (ph) { b.phrase = ph.i; b.phraseBar = ph.bars.indexOf(b.i) } }
  }
  const barAt = t => {
    if (!bars.length) return null
    let lo = 0, hi = bars.length - 1
    if (t < bars[0].t) return bars[0]
    while (lo < hi) { const m = (lo + hi + 1) >> 1; if (bars[m].t <= t + EPS) lo = m; else hi = m - 1 }
    return bars[lo]
  }

  // ---- quiet stretches and accents
  const quiet = []
  {
    const ts = [0, ...cues.filter(c => c.t < base).flatMap(c => [c.t, c.t + (c.kind === 'roll' || c.kind === 'riser' || c.kind === 'type' ? c.dur : 0)]).sort((a, b) => a - b), base]
    let last = 0
    for (const t of ts) { if (t - last >= 1.5) quiet.push({ t0: last, t1: t, dur: t - last }); last = Math.max(last, t) }
  }
  const accents = cues.filter(c => weightOf(c) > 0).map(c => ({ i: c.i, t: c.t, kind: c.kind, strength: c.gain * weightOf(c) }))
    .sort((a, b) => b.strength - a.strength || a.t - b.t)

  // ---- key, harmony (set later by the engine from the pack's plan)
  const kd = pack && pack.key ? pack.key : LD.key
  const KEY = Array.isArray(kd) ? makeKey(kd[0], kd[1]) : kd.pcs ? kd : makeKey(kd.tonic, kd.mode)
  const CARD_KEY = makeKey('D', 'major')
  let harmonyPlan = []
  const logoChord = { ...parseChord(LOGO_CHORD), t0: base, t1: duration }

  const tl = {
    id: rec.id, look, format: rec.format, fps: rec.fps, duration, base,
    card, vo: rec.vo || [], verdict: rec.verdict || null, beatsSpec: rec.beats || [],
    cues, trains, clusters,
    anchors: {
      P: { t: P, rule: payoff.rule, beat: Pb, score: payoff.score, gap: timeAt(Pb - 0.5) },
      V: V != null ? { t: V, beat: Vb } : null,
      base: { t: base, beat: baseB },
      L: card ? { t: card.L, how: card.how } : null,
    },
    payoff, overrides: over,
    tempoSettings: T,
    tempo: segs.map(s => ({ a: s.a, b: s.b, n: s.n, bpm: s.bpm, beat0: s.beat0, beat1: s.beat1, to: s.to, ...(s.free ? { free: true } : {}), remainder: s === segs[0] ? 0 : (s.free ? 0 : s.n % 4), pickup: s === segs[0] ? s.n % 4 : 0 })),
    bars, beats, sections: S, phrases, stepBar,
    quiet, accents,
    key: KEY,
    // queries
    beatAt, timeAt, barAt, bpmAt, beatLen, sectionAt,
    /**
     * Time of 16th step `s` (1-based, 1..16 for a 4-beat bar) in bar `bar` (index or bar object), with swing: the 2nd and
     * 4th 16th of each beat are delayed by (swing - 0.5)·2 of a 16th (swing 0.58 -> 0.16 of a 16th, bible §6.1).
     */
    step(bar, s, swing = 0.5) {
      const b = typeof bar === 'number' ? bars[bar] : bar
      const q = (s - 1) / 4                       // beats from the bar start
      const off = ((s - 1) % 2 === 1) ? (swing - 0.5) * 2 * 0.25 : 0
      return timeAt(b.beat + q + off)
    },
    /** the section object containing t */
    section: name => S.find(s => s.name === name) || null,
    /** seeded stream for this spec: FNV-1a("<id>|<name>") -> mulberry32 */
    stream: name => rngFor(rec.id, name),
    /** chord at time t from the pack's harmony plan; from base on: the logo chord D(add9) */
    chordAt(t) {
      if (card && t >= base - EPS) return logoChord
      let lo = 0, hi = harmonyPlan.length - 1
      if (hi < 0) return { ...parseChord(KEY.mode === 'minor' ? 'Dm' : 'D'), t0: 0, t1: base }
      if (t < harmonyPlan[0].t0) return harmonyPlan[0]
      while (lo < hi) { const m = (lo + hi + 1) >> 1; if (harmonyPlan[m].t0 <= t + EPS) lo = m; else hi = m - 1 }
      return harmonyPlan[lo]
    },
    keyAt: t => (card && t >= base - EPS ? CARD_KEY : KEY),
    /** set the harmony plan (engine): spans [{ t | beat, sym, bass? }] -> normalised [{ t0, t1, sym, root, tones, bass }] */
    setHarmony(plan) {
      const spans = (plan || []).map(x => ({ ...x, t0: x.t0 != null ? x.t0 : x.t != null ? x.t : timeAt(x.beat) }))
        .filter(x => x.sym).sort((a, b) => a.t0 - b.t0)
      harmonyPlan = spans.map((x, j) => {
        const c = parseChord(x.sym)
        const t1 = j + 1 < spans.length ? spans[j + 1].t0 : base
        return { ...x, ...c, sym: c.sym, t0: x.t0, t1, bass: x.bass != null ? x.bass : c.bass, beat0: beatAt(x.t0), beat1: beatAt(t1) }
      })
      for (const b of bars) { const c = tl.chordAt(b.t + 1e-6); b.chord = { sym: c.sym, root: c.root, tones: c.tones, bass: c.bass } }
      return harmonyPlan
    },
    get harmony() { return harmonyPlan },
    // helpers
    cuesIn: (t0, t1, kinds = null) => cues.filter(c => c.t >= t0 - EPS && c.t < t1 - EPS && (!kinds || kinds.includes(c.kind))),
    rollAt: t => rolls.find(r => t >= r.t - EPS && t < r.t + r.dur + EPS) || null,
    trainAt: t => trains.find(x => t >= x.t0 - 0.05 && t <= x.t1 + x.period * 0.5) || null,
    isAnchor(t, tol = 0.001) {
      if (Math.abs(t) <= tol || Math.abs(t - P) <= tol || Math.abs(t - base) <= tol) return true
      if (V != null && Math.abs(t - V) <= tol) return true
      return !!(card && Math.abs(t - card.L) <= tol)
    },
    /**
     * §4.6.1 drums yield: a music kick/snare/clap at t near a strong cue (thud/hit/cash/reveal, gain >= 0.5).
     * -> { action: 'keep' | 'drop' (15-70 ms away: the SFX owns the beat) | 'merge' (within 15 ms: music stays, the SFX
     *    drops its transient), cue }. Anchors never yield.
     */
    drumYield(t, { near = 0.07, merge = 0.015, minGain = 0.5, kinds = ['thud', 'hit', 'cash', 'reveal'] } = {}) {
      if (tl.isAnchor(t)) return { action: 'keep', cue: null }
      let best = null
      for (const c of cues) {
        if (!kinds.includes(c.kind) || c.gain < minGain) continue
        const d = Math.abs(c.t - t)
        if (d <= near + EPS && (!best || d < best.d)) best = { d, c }
      }
      if (!best) return { action: 'keep', cue: null }
      return { action: best.d <= merge + EPS ? 'merge' : 'drop', cue: best.c }
    },
    /** the em sting (§3.1): the four logo notes, the echo and the handle ding, at this spec's L */
    logoMotif: () => logoMotif(card),
  }
  return tl
}

/**
 * The channel's sonic logo (bible §3.1), identical in every pack: n1..n4 A4 D5 E5 A5, pickups 0.1 s apart landing at L
 * (if L - 0.30 < t0 the pickups start at t0 spaced (L - t0)/3), the echo of n4, the reverse-swell end, the chord voicing
 * and the handle ding pitches. Returns null without a card.
 */
export function logoMotif(card) {
  if (!card) return null
  const L = card.L, t0 = card.t0
  const step = L - 0.30 < t0 - 1e-9 ? (L - t0) / 3 : 0.1
  const notes = [
    { t: L - 3 * step, midi: 69, vel: 0.70, pan: -0.2, gate: 0.085, n: 1 },
    { t: L - 2 * step, midi: 74, vel: 0.78, pan: 0, gate: 0.085, n: 2 },
    { t: L - step, midi: 76, vel: 0.86, pan: 0.2, gate: 0.085, n: 3 },
    { t: L, midi: 81, vel: 1.0, pan: 0, gate: 1.30, n: 4 },
  ]
  return {
    L, t0, notes,
    echoes: [{ t: L + 0.375, db: -10, lp: 3000 }, { t: L + 0.750, db: -18, lp: 3000 }],
    swell: { t1: L, dur: 0.60, db: -12 },
    chord: { sym: LOGO_CHORD, voicing: [38, 50, 57, 64, 66] },   // D2 sub, D3, A3, E4, F#4
    ding: [90, 93],                                              // F#6 + A6, the card's handle ding
    tail: { db: -22, fade: 0.40 },
  }
}
