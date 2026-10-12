// The sound engine (sound bible §8, §10): timeline -> pack (harmony, compose, logo, sfx) -> voices -> buses -> master.
//
//   renderMix(rec, pack)       everything up to the pre-master sum, the stems and the score (pure JS, deterministic)
//   masterMix(mix, opts)       HP 25 Hz, low-mono 120 Hz, static gain to -14 LUFS, 4x true-peak limiter, edges
//   renderSound(rec, opts)     both, plus the outputs: master WAV (float32), AAC .m4a verified after decoding,
//                              <id>.score.json, <id>.report.json and optional stems
//
// Signal flow (bible §8.1):
//   notes/drums -> instrument buses (levels, automation, kick sidechain, body gate at base) -> MUSIC body bus
//     (HP 30 Hz, glue 2:1, event duck)  + REACT bus (as the body, minus the event duck; mix.react, routing.mjs)
//     + LOGO bus (not gated, not ducked)
//   cues -> SFX renderers (merge rule §8.4) -> SFX bus (HP 35 Hz, compressor 3:1)
//   sends -> music returns (PLATE/HALL/ROOM/delay, ducked by half the music duck and -6 dB under the logo)
//          + sfx/logo returns (not ducked)
//   MASTER = music + sfx + returns -> HP 25 -> low mono -> gain -> limiter -> edges -> WAV -> AAC (verified)
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { pathToFileURL } from 'node:url'
import * as D from './dsp.mjs'
import * as Th from './theory.mjs'
import { SR, sec, stereo, addAt, toStereo, dbToGain, isStereo, peakOf, filter } from './dsp.mjs'
import { buildTimeline, STUDIO, LOGO_CHORD } from './timeline.mjs'
import { fdnReverb, pingPong, compress, levelPercentile, duckCurve, dbCurveToGain, sidechainCurve, applyGain, lowMono, limitTruePeak } from './fx.mjs'
import { loudness, truePeakDb, truePeakEnvelope } from './loudness.mjs'
import { writeWavF32, sha256, encodeWavF32 } from './wav.mjs'
import * as FF from './ffmpeg.mjs'
import { BUS_RANK, busOf, routeOf } from './routing.mjs'

export const KINDS = ['tick', 'type', 'pop', 'ding', 'reveal', 'thud', 'whoosh', 'riser', 'roll', 'cash', 'buzz', 'boing', 'step', 'hit', 'swipe']
export const TARGET_LUFS = -14.0
export const CEILING_DBTP = -1.5
export const DELIVERY_TP = -1.0
// bible A5: decoded PLR (true peak − integrated) ≤ 13 dB; the encode loop aims 0.05 dB inside it
export const PLR_MAX = 13.0
/** engine defaults for the music duck under each cue kind: [depth dB, hold s, release τ s] (bible §5, Scoreboard column) */
export const DEFAULT_DUCK = {
  tick: [1, 0.04, 0.08], thud: [4, 0.06, 0.16], ding: [3, 0.08, 0.22], roll: [2.5, 0, 0.15], pop: [1.5, 0.03, 0.08],
  cash: [4, 0.1, 0.3], hit: [6, 0.1, 0.3], reveal: [6, 0.12, 0.4], riser: [0, 0, 0], swipe: [1.5, 0.03, 0.1],
  whoosh: [2, 0.05, 0.15], buzz: [4, 0.1, 0.25], step: [1, 0.03, 0.06], boing: [2, 0.05, 0.12], type: [1, 0, 0.08],
}
const SUSTAINED = new Set(['roll', 'type'])

// ---------------------------------------------------------------- packs
export const PACK_DIRS = [path.join(STUDIO, 'sound', 'packs'), path.join(STUDIO, 'looks')]
/**
 * Resolve the pack for a look: an explicit file (opts.pack), else studio/sound/packs/<look>.mjs, else
 * looks/<look>/sound.mjs, else the engine's default pack (src/sound/packs/default.mjs). Returns the normalised pack.
 */
export async function loadPack(look, { pack: explicit = null } = {}) {
  const cands = explicit ? [path.resolve(explicit)] : [path.join(STUDIO, 'sound', 'packs', `${look}.mjs`), path.join(STUDIO, 'looks', look, 'sound.mjs')]
  for (const f of cands) if (fs.existsSync(f)) return normalizePack(await import(pathToFileURL(f).href), f)
  if (explicit) throw new Error(`pack ${explicit} not found`)
  return normalizePack(await import('./packs/default.mjs'), path.join(path.dirname(new URL(import.meta.url).pathname), 'packs', 'default.mjs'))
}
let DEFAULT_PACK = null
async function defaultPack() { return DEFAULT_PACK || (DEFAULT_PACK = normalizePack(await import('./packs/default.mjs'), 'default')) }
export function normalizePack(mod, file = '(inline)') {
  const m = mod.default && typeof mod.default === 'object' && !mod.harmony ? mod.default : mod
  const mix = m.mix || {}
  const p = {
    file, name: m.name || path.basename(String(file), '.mjs'), look: m.look || '*',
    key: m.key, tempo: m.tempo, tensionBeats: m.tensionBeats, card: m.card,
    harmony: m.harmony || (() => []), compose: m.compose || (() => ({ notes: [], drums: [] })), logo: m.logo || (() => ({ notes: [], drums: [] })),
    instruments: m.instruments || {}, sfx: m.sfx || {},
    mix: {
      levels: {}, sends: {}, sfxSends: {}, duck: {}, duckBig: {}, sidechain: null, react: {},
      delay: { beats: 0.75, feedback: 0.3, lp: 3500, hp: 300, returnDb: -14 },
      glue: { ratio: 2, attack: 0.01, release: 0.12, knee: 6, targetGr: 2 },
      sfxComp: { ratio: 3, attack: 0.002, release: 0.08, knee: 3, maxGr: 2.5 },
      music: 0, sfxBus: 0, returns: 0, logo: 0,
      payoffDuck: { depth: 9, hold: 0.15, release: 0.45 },
      ...mix,
    },
    raw: m,
  }
  return p
}

// ---------------------------------------------------------------- helpers
const nS = t => Math.round(t * SR)
function evalDbPoints(points, n) {
  // piecewise-linear in dB between { t, db } points (held before the first and after the last) -> linear gain array
  const pts = points.slice().sort((a, b) => a.t - b.t)
  const g = new Float32Array(n)
  let k = 0
  for (let i = 0; i < n; i++) {
    const t = i / SR
    while (k + 1 < pts.length && pts[k + 1].t <= t) k++
    let db
    if (t <= pts[0].t) db = pts[0].db
    else if (k + 1 >= pts.length) db = pts[pts.length - 1].db
    else { const a = pts[k], b = pts[k + 1]; db = a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t) }
    g[i] = Math.pow(10, db / 20)
  }
  return g
}
function gateAt(n, t, fade = 0.010) {
  const g = new Float32Array(n).fill(1)
  const i0 = nS(t), f = Math.max(1, nS(fade))
  for (let i = i0; i < n; i++) { const k = (i - i0) / f; g[i] = k >= 1 ? 0 : 0.5 * (1 + Math.cos(Math.PI * k)) }
  return g
}
function addStereo(dst, src, g = 1) { const n = Math.min(dst.L.length, src.L.length); for (let i = 0; i < n; i++) { dst.L[i] += src.L[i] * g; dst.R[i] += src.R[i] * g } return dst }
function cloneStereo(b) { return { L: Float32Array.from(b.L), R: Float32Array.from(b.R) } }
function cut(b, n) { return { L: b.L.length === n ? b.L : b.L.slice(0, n), R: b.R.length === n ? b.R : b.R.slice(0, n) } }
const round = (x, k = 3) => (Number.isFinite(x) ? +x.toFixed(k) : x)

// ---------------------------------------------------------------- the mix
/**
 * Render everything up to the master for one cue record. Pure JS, deterministic.
 * opts: { pack (normalised), overrides, fallback (the default pack for missing kinds) }
 * Returns { tl, pack, n, sum, stems: { musicDry, music, sfx, returns }, score, info }.
 */
export function renderMix(rec, pack, { overrides, fallback = null } = {}) {
  const t0 = Date.now()
  const warnings = []
  const tl = buildTimeline(rec, pack, { overrides })
  const N = nS(rec.duration)
  const lib = { D, T: Th }
  // ---- harmony and composition
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), lib) || [])
  const comp = pack.compose(tl, tl.stream('arr:compose'), lib) || {}
  const notes = (comp.notes || []).map((e, j) => ({ ...e, kind: 'note', j }))
  const drums = (comp.drums || []).map((e, j) => ({ ...e, kind: 'drum', j }))
  const motif = tl.logoMotif()
  const lg = motif ? (pack.logo(tl, { motif, rng: tl.stream('arr:logo'), ...lib }) || {}) : {}
  const logoNotes = (lg.notes || []).map((e, j) => ({ role: 'logo', ...e, kind: 'note', bus: 'logo', j: 100000 + j }))
  const logoDrums = (lg.drums || []).map((e, j) => ({ role: 'logo', ...e, kind: 'drum', bus: 'logo', j: 100000 + j }))
  const auto = comp.automation || {}
  const events = [...notes, ...drums, ...logoNotes, ...logoDrums]
    .filter(e => Number.isFinite(e.t) && e.t < rec.duration && e.inst)
    .map(e => ({ ...e, bus: busOf(e) }))
    .sort((a, b) => a.t - b.t || BUS_RANK[a.bus] - BUS_RANK[b.bus] || (a.inst < b.inst ? -1 : a.inst > b.inst ? 1 : 0) || (a.midi ?? -1) - (b.midi ?? -1) || a.j - b.j)

  // bus 'logo' is the sting's: a music event there is the old way of escaping the duck, which bus 'react' replaces
  for (const inst of new Set(events.filter(e => e.bus === 'logo' && e.role !== 'logo').map(e => e.inst))) warnings.push(`"${inst}" events on bus 'logo' without role 'logo': a music voice that must not be ducked belongs on bus 'react' (mix.react, routing.mjs)`)
  // ---- instrument voices -> per-instrument buses (body, react and logo kept apart)
  const instBus = new Map()   // key `${bus}:${inst}` -> stereo
  const routes = new Map()    // the same key -> routeOf(bus, inst) (routing.mjs)
  const count = new Map()
  const instStats = {}
  for (const ev of events) {
    const def = pack.instruments[ev.inst]
    const fn = typeof def === 'function' ? def : def && def.render
    if (!fn) { warnings.push(`no instrument "${ev.inst}"`); continue }
    const k = count.get(ev.inst) || 0; count.set(ev.inst, k + 1)
    const ctx = { tl, ev, rng: tl.stream(`noise:${ev.inst}:${k}`), bpm: tl.bpmAt(ev.t), beatLen: tl.beatLen(ev.t), chordAt: tl.chordAt, keyAt: tl.keyAt, k, ...lib }
    let buf = fn(ev, ctx)
    if (!buf) continue
    buf = toStereo(buf, ev.pan || 0)
    const key = `${ev.bus}:${ev.inst}`
    if (!instBus.has(key)) { instBus.set(key, stereo(N)); routes.set(key, routeOf(ev.bus, ev.inst, pack.mix)) }
    const lvl = dbToGain(pack.mix.levels[ev.inst] ?? 0)
    addAt(instBus.get(key), buf, nS(ev.t), lvl)
    const st = instStats[ev.inst] || (instStats[ev.inst] = { events: 0, peak: 0 })
    st.events++; st.peak = Math.max(st.peak, peakOf(buf) * lvl)
  }
  // per-instrument gain automation, kick sidechain, body gate at base
  const base = rec.base
  const gate = tl.card ? gateAt(N, base) : null
  const sc = pack.mix.sidechain
  const scCurve = sc ? dbCurveToGain(sidechainCurve(N, drums.filter(d => (sc.triggers || ['kick']).includes(d.inst)).map(d => d.t), sc)) : null
  for (const [key, b] of instBus) {
    const inst = key.slice(key.indexOf(':') + 1), r = routes.get(key)
    if (auto.gain && auto.gain[inst]) applyGain(b, evalDbPoints(auto.gain[inst], N))
    if (scCurve && r.sidechain && (sc.targets || []).includes(inst)) applyGain(b, scCurve)
    if (gate && r.gate) applyGain(b, gate)
  }

  // ---- SFX (merge rule §8.4, card low end, transient merge with music hits)
  const cues = tl.cues
  const P = tl.anchors.P.t, Vt = tl.anchors.V ? tl.anchors.V.t : null, L = tl.card ? tl.card.L : null
  const musicHits = [...drums].filter(d => /kick|snare|clap/.test(d.inst)).map(d => d.t)
  const claims = new Map()   // cluster id -> Set of claimed midi
  const rendered = new Array(cues.length)
  const order = cues.slice().sort((a, b) => (a.cluster && b.cluster && a.cluster.id === b.cluster.id ? a.cluster.rank - b.cluster.rank : a.i - b.i))
  for (const c of order) {
    if (!KINDS.includes(c.kind)) throw new Error(`${rec.id}: unknown sfx kind "${c.kind}" (have: ${KINDS.join(', ')})`)
    let fn = pack.sfx[c.kind]
    if (!fn) { if (!fallback) throw new Error(`${pack.name}: no sfx renderer for "${c.kind}"`); fn = fallback.sfx[c.kind]; warnings.push(`sfx "${c.kind}" from the default pack`) }
    const cl = c.cluster ? { ...c.cluster, members: tl.clusters[c.cluster.id].ranked } : null
    const nearL = L != null && c.inCard && Math.abs(c.t - L) <= 0.15 + 1e-9
    const ctx = {
      tl, cue: c, n: c.n, i: c.i, rng: tl.stream(`sfx:${c.i}`), chordAt: tl.chordAt, keyAt: tl.keyAt, beatAt: tl.beatAt,
      chord: tl.chordAt(c.t), bpm: tl.bpmAt(c.t), beatLen: tl.beatLen(c.t),
      train: c.train || null, cluster: cl, inCard: c.inCard, isAnchor: tl.isAnchor(c.t, 0.015),
      atP: Math.abs(c.t - P) <= 0.015, atV: Vt != null && Math.abs(c.t - Vt) <= 0.015, atL: L != null && Math.abs(c.t - L) <= 0.015,
      L, P, V: Vt,
      // §8.4.1 only one low body per cluster; §3.2 the card's low end belongs to the logo
      dropBody: !!(cl && cl.rank > 0) || nearL,
      // §4.6.1 a music kick/snare/clap within 15 ms: the music hit stays and the SFX drops its transient layer
      dropTransient: !c.inCard && musicHits.some(t => Math.abs(t - c.t) <= 0.015),
      // §8.4.2 pitched layers form a chord: claim(midi) returns a free pitch (next chord tone up if taken)
      claim(m) {
        if (!cl) return m
        const set = claims.get(cl.id) || claims.set(cl.id, new Set()).get(cl.id)
        let x = m
        while (set.has(x)) x = Th.toneAbove(tl.chordAt(c.t), x)
        set.add(x)
        return x
      },
      ...lib,
    }
    let buf = fn(c, ctx)
    if (!buf) { rendered[c.i] = null; continue }
    const meta = buf.meta || {}
    buf = toStereo(buf, 0)
    buf.meta = meta
    if (ctx.dropBody && meta.body !== false) { D.svfStereo(buf, 'hp', 300, { poles: 4 }); meta.bodyFiltered = true }
    rendered[c.i] = { buf, meta, gain: c.gain, peak: peakOf(buf) * c.gain, dropBody: ctx.dropBody, dropTransient: ctx.dropTransient, big: ctx.atP }
  }
  // §8.4.3 cap each cluster's peak at the loudest member + 1.5 dB
  for (const cl of tl.clusters) {
    const mem = cl.members.map(i => ({ i, r: rendered[i] })).filter(x => x.r)
    if (mem.length < 2) continue
    const t0c = Math.min(...mem.map(x => nS(cues[x.i].t) - (x.r.buf.offset || 0)))
    const t1c = Math.max(...mem.map(x => nS(cues[x.i].t) - (x.r.buf.offset || 0) + x.r.buf.L.length))
    const tmp = stereo(t1c - t0c)
    for (const x of mem) addAt(tmp, x.r.buf, nS(cues[x.i].t) - t0c, x.r.gain)
    const pk = peakOf(tmp), cap = Math.max(...mem.map(x => x.r.peak)) * dbToGain(1.5)
    if (pk > cap) { const k = cap / pk; for (const x of mem) x.r.gain *= k; cl.capped = round(20 * Math.log10(k), 2) }
  }
  const sfxBus = stereo(N)
  const sends = { music: { PLATE: stereo(N), HALL: stereo(N), ROOM: stereo(N), DELAY: stereo(N) }, other: { PLATE: stereo(N), HALL: stereo(N), ROOM: stereo(N), DELAY: stereo(N) } }
  const duckEvents = []
  const sfxScore = []
  for (const c of cues) {
    const r = rendered[c.i]
    if (!r) continue
    addAt(sfxBus, r.buf, nS(c.t), r.gain)
    const s = r.meta.sends || pack.mix.sfxSends[c.kind] || {}
    for (const [k, db] of Object.entries(s)) { const K = k.toUpperCase(); if (sends.other[K] && db > -120) addAt(sends.other[K], r.buf, nS(c.t), r.gain * dbToGain(db)) }
    // §8.3 duck: depth by kind (big at P), scaled by clamp(gain / 0.7, 0.3, 1.2)
    const tbl = r.meta.duck || (r.big && pack.mix.duckBig[c.kind]) || pack.mix.duck[c.kind] || DEFAULT_DUCK[c.kind]
    const dk = Array.isArray(tbl) ? { depth: tbl[0], hold: tbl[1], release: tbl[2] } : tbl
    const depth = dk && dk.depth > 0 ? dk.depth * D.clamp(c.gain / 0.7, 0.3, 1.2) : 0
    const ev = depth > 0 ? { t: c.t, depth, hold: dk.hold || 0, release: dk.release || 0.1, ...(SUSTAINED.has(c.kind) ? { until: c.t + c.dur, attack: dk.attack ?? 0.02 } : {}), ...(dk.until != null ? { until: dk.until } : {}) } : null
    if (ev) duckEvents.push(ev)
    sfxScore.push({ i: c.i, t: round(c.t), kind: c.kind, gain: round(r.gain, 4), cueGain: c.gain, ...(c.dur && ['roll', 'riser', 'whoosh', 'swipe', 'type'].includes(c.kind) ? { dur: c.dur } : {}),
      pitches: r.meta.pitches || [], pan: r.meta.pan ?? 0, duck: ev ? { depth: round(ev.depth, 2), hold: ev.hold, release: ev.release } : null,
      ...(c.cluster ? { cluster: c.cluster.id } : {}), ...(c.train ? { train: c.train.id } : {}), ...(r.dropBody ? { dropBody: true } : {}), ...(r.dropTransient ? { dropTransient: true } : {}), ...(c.inCard ? { card: true } : {}), _r: r })
  }
  for (const e of auto.duck || []) duckEvents.push(e)
  // the payoff duck (§8.3, B2): the music sits >= 8 dB under over [P, P + 0.15] whatever cue (or none) marks P, then
  // blooms back. mix.payoffDuck: { depth, hold, release } (default 9 dB / 150 ms / 450 ms); null turns it off
  const pd = pack.mix.payoffDuck
  if (pd && pd.depth > 0) duckEvents.push({ t: P, depth: pd.depth, hold: pd.hold ?? 0.15, release: pd.release ?? 0.45 })
  const duckDb = duckCurve(N, duckEvents)

  // ---- MUSIC body bus, REACT buses and LOGO bus (routing.mjs: each (bus, instrument) is summed where its route says)
  // react voices on the music path are summed per (musicDb, glue) setting; via 'logo' they are summed into the logo bus
  const body = stereo(N), logo = stereo(N)
  const reacts = new Map()    // `${musicDb}|${glue}` -> { buf, musicDb, glue }
  for (const [key, b] of instBus) {
    const inst = key.slice(key.indexOf(':') + 1), r = routes.get(key)
    let dst = body
    if (r.sum === 'logo') dst = logo
    else if (r.sum === 'react') {
      const rk = `${r.musicDb}|${r.glue}`
      if (!reacts.has(rk)) reacts.set(rk, { buf: stereo(N), musicDb: r.musicDb, glue: r.glue })
      dst = reacts.get(rk).buf
    }
    addStereo(dst, b)
    // sends (post sidechain/gate, pre duck): route sends 'music' -> music returns (ducked), 'free' -> other returns
    const s = pack.mix.sends[inst] || {}
    for (const [k, db] of Object.entries(s)) {
      const K = k.toUpperCase(), grp = r.sends === 'free' ? sends.other : sends.music
      if (grp[K] && db > -120) addStereo(grp[K], b, dbToGain(db))
    }
  }
  const reactBufs = [...reacts.values()]
  if (auto.musicDb) {
    const g = evalDbPoints(auto.musicDb, N)
    applyGain(body, g)
    for (const x of reactBufs) if (x.musicDb) applyGain(x.buf, g)
  }
  if (pack.mix.music) { D.scale(body, dbToGain(pack.mix.music)); for (const x of reactBufs) if (x.musicDb) D.scale(x.buf, dbToGain(pack.mix.music)) }
  if (pack.mix.logo) D.scale(logo, dbToGain(pack.mix.logo))
  filter(body, 'hp', 30, { q: 0.7071 }); filter(logo, 'hp', 30, { q: 0.7071 })
  for (const x of reactBufs) filter(x.buf, 'hp', 30, { q: 0.7071 })
  // glue compressor 2:1, threshold so the DROP shows about targetGr dB of gain reduction. React voices with glue share
  // it: one detector over the body and them, the same gain reduction on each (the body alone when there are none)
  const G = pack.mix.glue
  const drop = tl.section('DROP') || { t0: 0, t1: Math.min(base, 4) }
  const glued = reactBufs.filter(x => x.glue)
  let det = body
  if (glued.length) { det = cloneStereo(body); for (const x of glued) addStereo(det, x.buf) }
  const lvlDrop = levelPercentile(det, nS(drop.t0), nS(drop.t1), 0.75)
  const glueThr = lvlDrop - G.targetGr * G.ratio / (G.ratio - 1)
  const { gr: glueGr } = compress(det, { threshold: glueThr, ratio: G.ratio, attack: G.attack, release: G.release, knee: G.knee })
  if (glued.length) {
    const g = new Float32Array(N)
    for (let i = 0; i < N; i++) g[i] = Math.pow(10, -glueGr[i] / 20)
    applyGain(body, g)
    for (const x of glued) applyGain(x.buf, g)
  }
  let grSum = 0, grN = 0
  for (let i = nS(drop.t0); i < nS(drop.t1); i++) { grSum += glueGr[i]; grN++ }
  const musicDry = cloneStereo(body)
  for (const x of reactBufs) addStereo(musicDry, x.buf)
  addStereo(musicDry, logo)
  const duckGain = dbCurveToGain(duckDb)
  applyGain(body, duckGain)
  const music = body
  for (const x of reactBufs) addStereo(music, x.buf)
  addStereo(music, logo)

  // ---- SFX bus: HP 35 Hz, compressor 3:1 with <= maxGr on the loudest hit
  if (pack.mix.sfxBus) D.scale(sfxBus, dbToGain(pack.mix.sfxBus))
  filter(sfxBus, 'hp', 35, { q: 0.7071 })
  const SC = pack.mix.sfxComp
  const hits = cues.filter(c => c.kind === 'hit' && rendered[c.i])
  const ref = hits.length ? Math.max(...hits.map(c => rendered[c.i].peak)) : Math.max(1e-9, ...cues.filter(c => rendered[c.i]).map(c => rendered[c.i].peak))
  const sfxThr = 20 * Math.log10(Math.max(1e-9, ref * dbToGain(pack.mix.sfxBus || 0))) - (hits.length ? SC.maxGr * SC.ratio / (SC.ratio - 1) : 1.5)
  const { gr: sfxGr } = compress(sfxBus, { threshold: sfxThr, ratio: SC.ratio, attack: SC.attack, release: SC.release, knee: SC.knee })
  let sfxGrMax = 0
  for (let i = 0; i < N; i++) if (sfxGr[i] > sfxGrMax) sfxGrMax = sfxGr[i]

  // ---- returns
  const returns = stereo(N), musicRet = stereo(N)
  const D_ = pack.mix.delay
  for (const K of ['PLATE', 'HALL', 'ROOM']) {
    if (peakOf(sends.music[K]) > 0) addStereo(musicRet, fdnReverb(sends.music[K], K, { tail: 0 }))
    if (peakOf(sends.other[K]) > 0) addStereo(returns, fdnReverb(sends.other[K], K, { tail: 0 }))
  }
  for (const [grp, dst] of [['music', musicRet], ['other', returns]]) {
    if (!(peakOf(sends[grp].DELAY) > 0)) continue
    const dl = pingPong(sends[grp].DELAY, i => tl.beatLen(i / SR) * (D_.beats ?? 0.75), { ...D_, tail: 0 })
    addStereo(dst, cut(dl, N), dbToGain(D_.returnDb ?? -14))
  }
  // music returns: half the music duck (in dB), and -6 dB from L - 0.30 for 0.5 s (bible §3.3.3)
  const retDuck = new Float32Array(N)
  for (let i = 0; i < N; i++) retDuck[i] = duckDb[i] * 0.5
  if (L != null) { const tail = duckCurve(N, [{ t: L - 0.30, attack: 0.01, depth: 6, hold: 0.5, release: 0.12 }]); for (let i = 0; i < N; i++) retDuck[i] = Math.min(retDuck[i], tail[i]) }
  applyGain(musicRet, dbCurveToGain(retDuck))
  addStereo(returns, musicRet)
  if (pack.mix.returns) D.scale(returns, dbToGain(pack.mix.returns))

  // ---- the pre-master sum
  const sum = stereo(N)
  addStereo(sum, music); addStereo(sum, sfxBus); addStereo(sum, returns)

  // ---- score (§9.4)
  const r3 = x => round(x, 4)
  const score = {
    id: rec.id, look: rec.look, pack: pack.name, duration: rec.duration, base,
    key: { tonic: tl.key.tonic, mode: tl.key.mode, pcs: tl.key.pcs, name: tl.key.name, card: 'D major' },
    anchors: { P: { t: P, rule: tl.anchors.P.rule }, V: tl.anchors.V ? { t: tl.anchors.V.t } : null, base, L },
    tempo: tl.tempo.map(s => ({ a: r3(s.a), b: r3(s.b), beats: s.n, bpm: round(s.bpm, 3), to: s.to, pickup: s.pickup, remainder: s.remainder, ...(s.free ? { free: true } : {}) })),
    sections: tl.sections.map(s => ({ name: s.name, t0: r3(s.t0), t1: r3(s.t1), b0: round(s.b0, 3), b1: round(s.b1, 3) })),
    bars: tl.bars.map(b => ({ i: b.i, t: r3(b.t), beats: round(b.beats, 3), bpm: round(b.bpm, 3), section: b.section, energy: b.energy, ...(b.split ? { split: b.split } : {}), ...(b.pickup ? { pickup: true } : {}), ...(b.brk ? { brk: true } : {}),
      chord: b.chord || null, dense: b.dense, sparse: b.sparse, cueBar: b.cueBar })),
    harmony: tl.harmony.map(h => ({ t0: r3(h.t0), t1: r3(h.t1), sym: h.sym, root: h.root, tones: h.tones, bass: h.bass })),
    trains: tl.trains.map(t => ({ kind: t.kind, period: r3(t.period), k: t.k, t0: t.t0, t1: t.t1 })),
    clusters: tl.clusters.map(c => ({ t: c.t, members: c.members, ranked: c.ranked, ...(c.capped ? { capped: c.capped } : {}) })),
    notes: events.filter(e => e.kind === 'note').map(e => ({ t: r3(e.t), dur: r3(e.dur ?? 0), midi: e.midi, vel: round(e.vel ?? 1, 3), inst: e.inst, role: e.role || e.inst, ...(e.chromatic ? { chromatic: e.chromatic } : {}), ...(e.pan ? { pan: round(e.pan, 3) } : {}), ...(e.bus === 'react' ? { bus: 'react' } : {}) })),
    drums: events.filter(e => e.kind === 'drum').map(e => ({ t: r3(e.t), inst: e.inst, vel: round(e.vel ?? 1, 3), ...(e.role === 'logo' ? { role: 'logo' } : {}), ...(e.bus === 'react' ? { bus: 'react' } : {}) })),
    sfx: sfxScore,
    duck: { rate: 100, db: Array.from({ length: Math.floor(N / 480) }, (_, k) => round(duckDb[k * 480], 2)) },
    logo: motif,
  }
  const info = { warnings, instStats, glue: { threshold: round(glueThr, 2), meanGrDrop: round(grN ? grSum / grN : 0, 2) }, sfxComp: { threshold: round(sfxThr, 2), maxGr: round(sfxGrMax, 2) }, ms: Date.now() - t0 }
  return { tl, pack, n: N, sum, stems: { musicDry, music, sfx: sfxBus, returns }, score, info, rendered }
}

// ---------------------------------------------------------------- the master (§8.6)
/** HP 25 Hz + low mono at 120 Hz, applied to a copy (the stems get the same so they sum to the pre-limiter master) */
export function masterFilters(b) { const x = cloneStereo(b); filter(x, 'hp', 25, { q: 0.7071 }); lowMono(x, 120); return x }
export function edges(b, { fadeIn = 0.001, fadeOut = 0.40 } = {}) {
  const n = b.L.length, fi = Math.max(1, sec(fadeIn)), fo = Math.min(n, sec(fadeOut))
  for (let i = 0; i < fi && i < n; i++) { const g = i / fi; b.L[i] *= g; b.R[i] *= g }
  for (let j = 0; j < fo; j++) { const i = n - fo + j, k = (j + 1) / fo, g = 0.5 * (1 + Math.cos(Math.PI * k)); b.L[i] *= g; b.R[i] *= g }
  if (n) { b.L[n - 1] = 0; b.R[n - 1] = 0 }
  return b
}
/**
 * Loudness to target (static gain), true-peak limiter, edges; re-measure and correct the gain (at most twice).
 * Returns { out, gain (linear, applied before the limiter), loud, tp, limiter: stats, iterations, ceiling }.
 */
export function masterMix(pre, { target = TARGET_LUFS, ceiling = CEILING_DBTP, tolerance = 0.1, ceilingCurve = null } = {}) {
  const I0 = loudness(pre).integrated
  let gainDb = Number.isFinite(I0) ? target - I0 : 0
  let res = null, it = 0
  for (; it < 3; it++) {
    const g = dbToGain(gainDb)
    const x = { L: new Float32Array(pre.L.length), R: new Float32Array(pre.R.length) }
    for (let i = 0; i < x.L.length; i++) { x.L[i] = pre.L[i] * g; x.R[i] = pre.R[i] * g }
    const lim = limitTruePeak(x, { ceiling, ceilingCurve })
    edges(lim.out)
    const ld = loudness(lim.out)
    res = { out: lim.out, gainDb, loud: ld, limiter: lim.stats, grCurve: lim.gr }
    if (!Number.isFinite(ld.integrated) || Math.abs(ld.integrated - target) <= tolerance) break
    gainDb += target - ld.integrated
  }
  res.iterations = it + 1
  res.tp = truePeakDb(res.out)
  res.ceiling = ceiling
  res.gain = dbToGain(res.gainDb)
  res.preLoudness = I0
  return res
}

// ---------------------------------------------------------------- outputs
/** spots where the decoded audio's true peak exceeds `limit` dBTP: [{ t, over (dB) }], grouped within 10 ms */
function overSpots(dec, limit, n) {
  const eL = truePeakEnvelope(dec.L), eR = truePeakEnvelope(dec.R), thr = dbToGain(limit)
  const out = []
  for (let i = 0; i < Math.min(n, eL.length); i++) {
    const v = Math.max(eL[i], eR[i])
    if (v <= thr) continue
    const over = 20 * Math.log10(v / thr), last = out[out.length - 1]
    if (last && i - last.i <= sec(0.010)) { if (over > last.over) { last.over = over; last.t = i / SR } last.i = i }
    else out.push({ i, t: i / SR, over })
  }
  return out
}
/** the master's true peak (dBTP, both channels) over [t - 25 ms, t + 25 ms]; env = per-sample max of the L/R envelopes */
function localPeakDb(env, t) {
  let m = 0
  for (let i = Math.max(0, nS(t - 0.025)); i < Math.min(env.length, nS(t + 0.025)); i++) if (env[i] > m) m = env[i]
  return m > 0 ? 20 * Math.log10(m) : -Infinity
}
/** lower a ceiling curve by `db` over [t - 25 ms, t + 25 ms] with 5 ms cosine edges (deepest wins) */
function dipCurve(curve, t, db) {
  const a = nS(t - 0.025), b = nS(t + 0.025), r = sec(0.005)
  for (let i = Math.max(0, a - r); i < Math.min(curve.length, b + r); i++) {
    const k = i < a ? (i - (a - r)) / r : i > b ? 1 - (i - b) / r : 1
    const v = -db * 0.5 * (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, k))))
    if (v < curve[i]) curve[i] = v
  }
}
/** the first sample of a rendered cue above -60 dBFS (in the master's level) relative to its cue time, in ms */
function cueStarts(mix, gain) {
  const thr = dbToGain(-60)
  const out = []
  for (const s of mix.score.sfx) {
    const r = s._r
    const c = mix.tl.cues[s.i]
    const off = r.buf.offset || 0
    let k = -1
    const g = r.gain * gain
    for (let j = 0; j < r.buf.L.length; j++) if (Math.max(Math.abs(r.buf.L[j]), Math.abs(r.buf.R[j])) * g >= thr) { k = j; break }
    const start = k < 0 ? null : (nS(c.t) - off + k) / SR
    out.push({ i: c.i, kind: c.kind, t: c.t, start: start == null ? null : round(start, 5), errMs: start == null ? null : round((start - c.t) * 1000, 2), preroll: off ? round(off / SR, 4) : 0 })
  }
  return out
}
/**
 * Where the limiter works: runs of > 1 dB gain reduction (merged across gaps < 50 ms), the 12 deepest, each with the
 * cues and music drums within 50 ms of its peak, so a pack designer can see what to turn down.
 */
function limiterHotspots(gr, mix, k = 12) {
  const runs = []
  let s = -1, pk = 0, at = 0, lastEnd = -1e9
  for (let i = 0; i <= gr.length; i++) {
    const v = i < gr.length ? gr[i] : 0
    if (v > 1) {
      if (s < 0) { if (runs.length && i - lastEnd < 0.05 * SR) { const r = runs.pop(); s = r.s; pk = r.pk; at = r.at } else { s = i; pk = 0 } }
      if (v > pk) { pk = v; at = i }
    } else if (s >= 0) { runs.push({ s, e: i, pk, at }); lastEnd = i; s = -1 }
  }
  const drums = mix.score.drums, cues = mix.tl.cues
  return runs.sort((a, b) => b.pk - a.pk).slice(0, k).map(r => {
    const t = r.at / SR
    return { t: round(t, 3), dur: round((r.e - r.s) / SR, 3), maxGr: round(r.pk, 2),
      cues: cues.filter(c => Math.abs(c.t - t) <= 0.05 || (c.t <= t && t <= c.t + (c.dur || 0))).map(c => `${c.kind}@${c.t}`),
      drums: drums.filter(d => Math.abs(d.t - t) <= 0.05).map(d => `${d.inst}@${d.t}`) }
  })
}
const stemLufs = (b, gain) => loudness(masterFilters(b)).integrated + 20 * Math.log10(gain)

/**
 * Render one cue record to files.
 * opts: { outDir, pack (path or normalised), overrides, encode = true (AAC + decode check), stems = false | dir,
 *         score = true, report = true, ffmpegCheck = true (loudnorm/ebur128 cross-checks), keepWav = true }
 * Returns { id, wav, m4a, score, report: {...}, files }.
 */
export async function renderSound(rec, opts = {}) {
  const t0 = Date.now()
  const outDir = path.resolve(opts.outDir || fs.mkdtempSync(path.join(os.tmpdir(), 'sound-')))
  fs.mkdirSync(outDir, { recursive: true })
  const pack = opts.pack && typeof opts.pack === 'object' ? opts.pack : await loadPack(rec.look, { pack: opts.pack })
  const mix = renderMix(rec, pack, { overrides: opts.overrides, fallback: await defaultPack() })
  const pre = masterFilters(mix.sum)
  let ceiling = opts.ceiling ?? CEILING_DBTP
  let m = masterMix(pre, { ceiling })
  const files = {}
  const id = rec.id
  const wav = path.join(outDir, `${id}.wav`)
  let wavSha = writeWavF32(wav, m.out)
  files.wav = wav
  let post = null, retries = 0, aacPreroll = null
  const trials = []
  if (opts.encode !== false) {
    const m4a = path.join(outDir, `${id}.m4a`)
    // AAC adds true peak where the codec cannot follow a transient. The encode runs behind a silent pre-roll that is then
    // trimmed (ffmpeg.mjs encodeAac): a hard hit at t = 0 meets an encoder that has had silence to fill its bit
    // reservoir, like any later hit, instead of the file's starved first frame. A failing encode then lowers the ceiling
    // LOCALLY around each spot that went over in the decoded audio (±25 ms; at most 3 times) to the master's OWN true peak
    // there less the excess + 0.3 dB, so every dip reaches the limiter even where the master sat under the ceiling
    // (a dip measured from the ceiling did nothing there: 04b at 36.5 s), then globally by 0.5 dB as the bible's §8.6
    // step 9 (at most 2 times)
    let curve = null, local = 0, global = 0
    const preroll = opts.aacPreroll ?? FF.AAC_PREROLL
    for (;;) {
      const enc = FF.encodeAac(wav, m4a, { preroll })
      aacPreroll = enc.preroll
      if (enc.warning) mix.info.warnings.push(enc.warning)
      const dec = FF.decodeAudio(m4a)
      post = { tp: truePeakDb(dec), ...(opts.ffmpegCheck !== false ? { ffmpeg: FF.ebur128(m4a) } : {}) }
      post.integrated = loudness(dec).integrated
      const worst = Math.max(post.tp, post.ffmpeg && post.ffmpeg.TP != null ? post.ffmpeg.TP : -Infinity)
      // the decoded peak must clear both the delivery ceiling and the PLR limit (AAC lands 0.05-0.2 LU under the master's target,
      // so a peak that is fine at -14.0 LUFS can break PLR 13 after encode)
      const limit = Math.min(DELIVERY_TP, post.integrated + PLR_MAX - 0.05)
      const spots = worst > limit ? overSpots(dec, limit - 0.1, m.out.L.length) : []
      trials.push({ ceiling, local: local, masterTp: round(m.tp, 2), aacTp: round(post.tp, 2), ...(post.ffmpeg ? { ffmpegTp: post.ffmpeg.TP } : {}), limiterMaxGr: round(m.limiter.maxGr, 2), limiterPctOver1dB: round(m.limiter.pctOver1dB, 3), spots: spots.map(x => ({ t: round(x.t, 4), overDb: round(x.over, 2) })) })
      if (worst <= limit) break
      if (local < 3 && spots.length) {
        local++
        curve = curve || new Float32Array(m.out.L.length)
        const eL = truePeakEnvelope(m.out.L), eR = truePeakEnvelope(m.out.R)
        for (let i = 0; i < eL.length; i++) if (eR[i] > eL[i]) eL[i] = eR[i]
        const last = trials[trials.length - 1]
        spots.forEach((sp, k) => {
          const pk = localPeakDb(eL, sp.t), db = Math.max(0, ceiling - pk) + sp.over + 0.3
          dipCurve(curve, sp.t, db)
          last.spots[k].masterTp = round(pk, 2); last.spots[k].dipDb = round(db, 2)
        })
      } else if (global < 2) { global++; ceiling -= 0.5 } else break
      retries++
      m = masterMix(pre, { ceiling, ceilingCurve: curve })
      wavSha = writeWavF32(wav, m.out)
    }
    files.m4a = m4a
  }
  const gain = m.gain
  // stems: same master gain and filters, before the limiter (they sum to the pre-limiter master)
  const stemNames = { musicDry: 'music.dry', music: 'music', sfx: 'sfx', returns: 'returns' }
  const stemLoud = {}
  for (const [k, name] of Object.entries(stemNames)) stemLoud[name] = round(stemLufs(mix.stems[k], gain), 2)
  if (opts.stems) {
    const sd = typeof opts.stems === 'string' ? path.resolve(opts.stems) : path.join(outDir, 'stems')
    fs.mkdirSync(sd, { recursive: true })
    for (const [k, name] of Object.entries(stemNames)) {
      const x = masterFilters(mix.stems[k]); D.scale(x, gain)
      const f = path.join(sd, `${id}.${name}.wav`); writeWavF32(f, x); files[name] = f
    }
    const f = path.join(sd, `${id}.mix.wav`); fs.copyFileSync(wav, f); files.mix = f
  }
  const starts = cueStarts(mix, gain)
  let loudnorm = null
  if (opts.ffmpegCheck !== false) { try { loudnorm = FF.loudnormMeasure(wav) } catch (e) { loudnorm = { error: e.message.slice(0, 200) } } }
  const L = m.loud
  const tl = mix.tl
  const report = {
    id, look: rec.look, pack: pack.name, packFile: pack.file, node: process.version, engine: 'envelope-sound/1',
    duration: rec.duration, base: rec.base, samples: m.out.L.length,
    P: { t: tl.anchors.P.t, rule: tl.anchors.P.rule }, V: tl.anchors.V ? tl.anchors.V.t : null, L: tl.card ? round(tl.card.L, 4) : null,
    bpm: tl.tempo.map(s => round(s.bpm, 3)),
    tempo: mix.score.tempo,
    sections: mix.score.sections.map(s => `${s.name} ${s.t0}-${s.t1}`),
    loudness: {
      target: TARGET_LUFS, preMaster: round(m.preLoudness, 2), integrated: round(L.integrated, 2), lra: round(L.lra, 2),
      momentaryMax: round(L.momentaryMax, 2), shortTermMax: round(L.shortTermMax, 2), truePeak: round(m.tp, 2),
      postEncode: post ? { integrated: round(post.integrated, 2), truePeak: round(post.tp, 2), ffmpeg: post.ffmpeg || null } : null,
      ffmpegLoudnorm: loudnorm,
    },
    master: { gainDb: round(m.gainDb, 2), ceiling, iterations: m.iterations, encodeRetries: retries, aacPreroll, encodeTrials: trials },
    limiter: { maxGr: round(m.limiter.maxGr, 2), pctOver1dB: round(m.limiter.pctOver1dB, 3), pctActive: round(m.limiter.pctOver0, 3), hotspots: limiterHotspots(m.grCurve, mix) },
    glue: mix.info.glue, sfxComp: mix.info.sfxComp,
    stems: Object.fromEntries(Object.entries(stemLoud).map(([k, v]) => [k, { lufs: v, reMix: round(v - L.integrated, 2) }])),
    instruments: Object.fromEntries(Object.entries(mix.info.instStats).map(([k, v]) => [k, { events: v.events, peakDb: round(20 * Math.log10(v.peak || 1e-9), 1) }])),
    cueStart: starts,
    cueStartMaxErrMs: round(Math.max(0, ...starts.filter(s => s.errMs != null && !s.preroll).map(s => Math.abs(s.errMs))), 2),
    warnings: [...new Set(mix.info.warnings)],
    wavSha256: wavSha,
    timing: { mixMs: mix.info.ms, totalMs: Date.now() - t0 },
  }
  if (opts.score !== false) {
    const sc = { ...mix.score, sfx: mix.score.sfx.map(({ _r, ...s }) => s) }
    const f = path.join(outDir, `${id}.score.json`); fs.writeFileSync(f, JSON.stringify(sc)); files.score = f
  }
  if (opts.report !== false) { const f = path.join(outDir, `${id}.report.json`); fs.writeFileSync(f, JSON.stringify(report, null, 1)); files.report = f }
  if (opts.keepWav === false && files.m4a) { fs.rmSync(wav, { force: true }); delete files.wav }
  return { id, files, report, wav: files.wav || null, m4a: files.m4a || null }
}

/** compose only (no audio): the timeline + harmony + notes, for quick score dumps */
export async function scoreOnly(rec, opts = {}) {
  const pack = opts.pack && typeof opts.pack === 'object' ? opts.pack : await loadPack(rec.look, { pack: opts.pack })
  const tl = buildTimeline(rec, pack, { overrides: opts.overrides })
  const lib = { D, T: Th }
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), lib) || [])
  const comp = pack.compose(tl, tl.stream('arr:compose'), lib) || {}
  const motif = tl.logoMotif()
  const lg = motif ? (pack.logo(tl, { motif, rng: tl.stream('arr:logo'), ...lib }) || {}) : {}
  return { tl, comp, logo: lg }
}
export { LOGO_CHORD }
