// Becker Rig pack checks, folded in from the fixer's scratchpad harness (check.mjs, becker-fix/fixcheck.mjs,
// becker-u/ucheck.mjs): MALLET (the critic's must 1), FLAMS, the critic's reported measurements (INFO), and the pack's
// DSP unit checks (§9.5 U1-U4; U3/U4 run over every Becker teaser's own cues). Thresholds: sound/acceptance.json.
import * as D from '../../../src/sound/dsp.mjs'
import * as Th from '../../../src/sound/theory.mjs'
import { loudness } from '../../../src/sound/loudness.mjs'
import { limits } from '../acceptance.mjs'
import { SR, fft, median, powDb, bandpass, evalDb, ungated, ncc, monoOf } from '../measure.mjs'

export const look = 'becker-rig'
const nS = t => Math.round(t * SR)

/**
 * Every music event re-rendered per instrument the way the engine renders it (the instrument's level, pan, seeded noise
 * stream `noise:<inst>:<k>`), with each voice's gain automation and the music bus's musicDb applied, before the glue,
 * the duck and the sends (the react voices, `…R`, ride the un-ducked bus: no musicDb). Events in [t0, t1) only (the
 * index k still counts every event). -> { [inst]: stereo buffer of n samples }. Shared with the pack's calibration
 * tools (looks/becker-rig/sound/tools/).
 */
export function instrumentBuses(tl, comp, pack, { t0 = -Infinity, t1 = Infinity, n }) {
  const buses = {}, count = {}
  for (const ev of [...comp.notes, ...comp.drums].sort((a, b) => a.t - b.t)) {
    const fn = pack.instruments[ev.inst]
    if (!fn) continue
    const k = count[ev.inst] || 0
    count[ev.inst] = k + 1
    if (ev.t >= t1 || ev.t < t0) continue
    const b = D.toStereo(fn(ev, { tl, ev, rng: tl.stream(`noise:${ev.inst}:${k}`), bpm: tl.bpmAt(ev.t), beatLen: tl.beatLen(ev.t), chordAt: tl.chordAt, keyAt: tl.keyAt, k, D, T: Th }), ev.pan || 0)
    const bus = buses[ev.inst] || (buses[ev.inst] = D.stereo(n))
    D.addAt(bus, b, nS(ev.t), D.dbToGain(pack.mix.levels[ev.inst] ?? 0))
  }
  const md = evalDb(comp.automation.musicDb, n)
  for (const [inst, b] of Object.entries(buses)) {
    const ga = comp.automation.gain && comp.automation.gain[inst], g = ga ? evalDb(ga, n) : null
    const react = /R$/.test(inst)
    for (let i = 0; i < n; i++) { const kk = (g ? g[i] : 1) * (react ? 1 : md[i]); b.L[i] *= kk; b.R[i] *= kk }
  }
  return buses
}

/** the BUILD per instrument (the critic's instbal): { sec, lu: { inst: LU re the band }, band: [[inst, dB re the loudest
 *  voice] in bandHz] } */
function buildBalance(ctx, lim) {
  const { tl, comp } = ctx.composed(), pack = ctx.pack
  const sec = tl.section('BUILD')
  if (!sec) return null
  const buses = instrumentBuses(tl, comp, pack, { t0: sec.t0 - 1.5, t1: sec.t1, n: nS(sec.t1) + SR })
  const i0 = nS(sec.t0), i1 = nS(sec.t1)
  const sum = D.stereo(i1 - i0), sl = {}
  for (const [inst, b] of Object.entries(buses)) {
    const x = { L: b.L.slice(i0, i1), R: b.R.slice(i0, i1) }
    for (let i = 0; i < x.L.length; i++) { sum.L[i] += x.L[i]; sum.R[i] += x.R[i] }
    sl[inst] = x
  }
  const tb = loudness(sum).integrated
  const lu = Object.fromEntries(Object.entries(sl).map(([k, x]) => [k, loudness(x).integrated - tb]).filter(x => Number.isFinite(x[1])).sort((a, b) => b[1] - a[1]))
  const pw = x => { const y = bandpass(x, lim.bandHz[0], lim.bandHz[1]); let s = 0; for (let i = 0; i < y.L.length; i++) s += y.L[i] ** 2 + y.R[i] ** 2; return 10 * Math.log10(s / y.L.length + 1e-30) }
  const r5 = Object.entries(sl).map(([k, x]) => [k, pw(x)]).sort((a, b) => b[1] - a[1])
  return { sec, lu, band: r5.map(([k, v]) => [k, v - r5[0][1]]) }
}

export const checks = {
  /** the marimba carries the BUILD: >= minLu re the band, and the loudest voice in 500-1200 Hz */
  MALLET(ctx, lim) {
    const r = buildBalance(ctx, lim)
    if (!r) return { pass: null, detail: 'no BUILD section' }
    const m = r.lu[lim.loudestInBand] ?? -99
    const ok = m >= lim.minLu - 1e-9 && r.band[0][0] === lim.loudestInBand
    const lu = k => (r.lu[k] == null ? '-' : r.lu[k].toFixed(1))
    return { pass: ok, value: +m.toFixed(1), detail: `${lim.loudestInBand} ${lu(lim.loudestInBand)} LU re the band in the BUILD (≥ ${lim.minLu}; bass ${lu('bass')}, pad ${lu('pad')}, pizz ${lu('pizz')}, snare ${lu('snare')}, kick ${lu('kick')}); ${lim.bandHz.join('-')} Hz: ${r.band.slice(0, 4).map(([k, v]) => `${k} ${v.toFixed(1)}`).join(', ')}` }
  },
  /** music kick/snare/clap/tom 15-70 ms off a body cue (gain >= minGain) or a clock-train tick/thud, anchors excepted */
  FLAMS(ctx, lim) {
    const sc = ctx.score, P = sc.anchors.P.t, V = sc.anchors.V ? sc.anchors.V.t : null
    const kinds = new Set(lim.kinds), tk = new Set(lim.trainKinds), drums = new Set(lim.drums)
    const body = sc.sfx.filter(s => kinds.has(s.kind) && (s.cueGain ?? s.gain) >= lim.minGain)
    const ticks = sc.sfx.filter(s => s.train != null && tk.has(s.kind))
    const anchors = [0, P, V, sc.base].filter(x => x != null)
    const dr = sc.drums.filter(d => drums.has(d.inst) && d.role !== 'logo' && !anchors.some(a => Math.abs(a - d.t) <= 0.001))
    const fl = []
    for (const d of dr) for (const s of [...body, ...ticks]) { const x = Math.abs(d.t - s.t); if (x > lim.minMs / 1000 + 1e-6 && x < lim.maxMs / 1000 - 1e-6) fl.push(`${d.inst}@${d.t}~${s.kind}@${s.t}`) }
    return { pass: !fl.length, detail: fl.length ? `${fl.length}: ${fl.slice(0, 4).join(', ')}` : `none (${dr.length} drum hits vs ${body.length} body cues, ${ticks.length} train ticks)` }
  },
}

/** the critic's reported measurements (never gated): -> { B1u, REACT, DUCKSTATS, FOLEY, DEFLATE } as strings */
export function info(ctx, lim) {
  const sc = ctx.score, rep = ctx.report, P = sc.anchors.P.t, V = sc.anchors.V ? sc.anchors.V.t : null, base = sc.base
  const out = {}
  // B1u: the SFX's ungated share and its own contribution (mix minus mix-without-SFX)
  {
    const mixW = ctx.stem('mix'), sfx = ctx.stem('sfx'), Iw = loudness(mixW).integrated
    const noS = { L: Float32Array.from(mixW.L, (v, i) => v - sfx.L[i]), R: Float32Array.from(mixW.R, (v, i) => v - sfx.R[i]) }
    out.B1u = `SFX ungated ${(ungated(sfx) - Iw).toFixed(2)} LU re mix, SFX adds ${(Iw - loudness(noS).integrated).toFixed(2)} LU`
  }
  const dk = sc.duck.db, dAt = t => dk[Math.round(t * 100)]
  // REACT: the react voices (un-ducked bus) and the duck curve under them; the ding at V; the payoff duck's bloom
  {
    const react = sc.notes.filter(n => /R$/.test(n.inst))
    const starts = [...new Set(react.map(n => n.t.toFixed(3)))]
    let s = starts.map(t => `${react.find(n => n.t.toFixed(3) === t).inst}@${t} (duck curve ${dAt(+t)})`).join('; ') || 'none'
    if (V != null) { const d = sc.sfx.find(x => Math.abs(x.t - V) < 0.016 && x.kind === 'ding'); s += d ? `; ding@V duck ${d.duck ? d.duck.depth : 0} dB` : '; no ding at V' }
    s += `; P duck ${[0, 0.15, 0.3, 0.45, 0.6].map(x => dAt(P + x)).join('/')} dB at +0/.15/.3/.45/.6 s`
    out.REACT = s
  }
  // DUCKSTATS: the body's share >= duckDeepDb down, dips per minute, per-kind duck depths; the returns
  {
    const nb = Math.floor(base * 100), deepDb = -lim.duckDeepDb, rel = -lim.duckReleaseDb
    let deep = 0, dips = 0, inDip = false
    for (let k = 0; k < nb; k++) { if (dk[k] <= deepDb) deep++; if (dk[k] <= deepDb && !inDip) { dips++; inDip = true } if (dk[k] > rel) inDip = false }
    const Pk = [Math.round(P * 100), Math.round((P + 0.6) * 100)]
    let deepX = 0
    for (let k = 0; k < nb; k++) if (dk[k] <= deepDb && !(k >= Pk[0] && k < Pk[1])) deepX++
    const byK = {}
    for (const s of sc.sfx) if (s.duck && !s.card) (byK[s.kind] ||= []).push(s.duck.depth)
    out.DUCKSTATS = `${(100 * deep / nb).toFixed(1)}% of body >= ${lim.duckDeepDb} dB down (${(100 * deepX / nb).toFixed(1)}% outside the payoff), ${(dips / (base / 60)).toFixed(1)} dips > ${lim.duckDeepDb} dB/min; per kind ${Object.entries(byK).map(([k, v]) => `${k} ${Math.min(...v).toFixed(1)}-${Math.max(...v).toFixed(1)}`).join(', ')}; returns ${rep.stems.returns.reMix} LU re mix`
  }
  // FOLEY: in-band audibility in the cue window, SFX stem vs music stem
  {
    const sfx = ctx.stem('sfx'), music = ctx.stem('music'), f = []
    for (const [kind, [lo, hi, len]] of Object.entries(lim.foleyBands)) {
      const cs = sc.sfx.filter(s => s.kind === kind && s.t < base)
      if (!cs.length) continue
      const a = bandpass(sfx, lo, hi), m = bandpass(music, lo, hi)
      const ds = cs.map(s => { const w = len ?? Math.max(0.08, Math.min(0.5, s.dur || 0.2)); return powDb(a, s.t, s.t + w) - powDb(m, s.t, s.t + w) })
      f.push(`${kind} med ${median(ds).toFixed(1)} dB (${ds.filter(x => x < 0).length}/${ds.length} under)`)
      if (kind === 'step') { const a2 = bandpass(sfx, 1500, 4000), m2 = bandpass(music, 1500, 4000); const d2 = cs.map(s => powDb(a2, s.t, s.t + 0.05) - powDb(m2, s.t, s.t + 0.05)); f.push(`step tap band 1.5-4k med ${median(d2).toFixed(1)} dB (${d2.filter(x => x < 0).length}/${d2.length} under)`) }
    }
    out.FOLEY = f.join('; ') || 'none'
  }
  // DEFLATE: the buzz's Gm span and the bending bass
  {
    const gm = (sc.harmony || []).filter(h => h.sym === 'Gm')
    const strain = sc.notes.filter(n => n.inst === 'bass' && n.chromatic === 'strain')
    out.DEFLATE = gm.length ? gm.map(h => `Gm ${h.t0.toFixed(3)}-${h.t1.toFixed(3)}`).join(', ') + `; bass bends: ${strain.map(n => `${n.midi}@${n.t}/${n.dur}s`).join(', ') || 'none'}` : 'no buzz'
  }
  return out
}

// ---------------------------------------------------------------- units (§9.5)
/** per teaser (in its worker): every cue rendered solo with the pack's raw renderers -> U3/U4 partials */
export async function specUnits(ctx) {
  const { renderCues } = await import('../../../looks/becker-rig/sound/balance.mjs')
  const U3 = limits('U3', look), U2 = limits('U2', look)
  const { tl } = ctx.composed()
  const u3 = {}, u4 = {}
  let nan = 0, tails = 0
  const last = {}
  for (const { c, b } of renderCues(tl)) {
    for (const x of [b.L, b.R]) for (const v of x) if (!Number.isFinite(v)) nan++
    const k = c.kind
    u3[k] = Math.max(u3[k] ?? -Infinity, 20 * Math.log10(D.peakOf(b)) - U3.peaks[k])
    const n = b.L.length
    if (Math.abs(b.L[n - 1]) > U2.maxStep || Math.abs(b.R[n - 1]) > U2.maxStep) tails++
    if (last[k] && !c.inCard) u4[k] = Math.max(u4[k] ?? 0, ncc(last[k], b, [-96, -48, 0, 48, 96]))
    if (!c.inCard) last[k] = b
  }
  return { u3, u4, nan, tails }
}

function hannMag(x, n = 32768) {
  const s0 = Math.min(Math.round(0.05 * SR), Math.max(0, x.length - n))
  const re = new Float64Array(n), im = new Float64Array(n)
  for (let i = 0; i < n; i++) re[i] = (x[s0 + i] || 0) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / n))
  fft(re, im)
  return k => Math.hypot(re[k], im[k])
}
/** worst off-series peak re the fundamental (dB); `partials` (ratios) for the inharmonic voices */
function worstAlias(x, f0, partials, tol) {
  const n = 32768, mag = hannMag(x, n)
  const k0 = Math.round(f0 * n / SR)
  let fund = 0
  for (let k = k0 - 4; k <= k0 + 4; k++) fund = Math.max(fund, mag(k))
  let worst = -Infinity, at = 0
  for (let k = 20; k < n / 2 - 1; k++) {
    const m = mag(k)
    if (!(m > mag(k - 1) && m >= mag(k + 1))) continue
    const f = k * SR / n
    const ok = partials
      ? partials.some(p => Math.abs(f / (p * f0) - 1) <= tol + 1.5 * SR / n / (p * f0))
      : Math.abs(f / f0 - Math.round(f / f0)) <= tol * Math.max(1, Math.round(f / f0)) + 0.02
    if (ok) continue
    const v = 20 * Math.log10(m / fund)
    if (v > worst) { worst = v; at = f }
  }
  return [worst, at]
}
// U1: each pitched voice (null = harmonic; else its partial ratios); U2: every pitched or sustained voice
const PITCHED = { bass: null, mallet: [1, 3.9, 9.2], glock: [1, 2.76, 5.40, 8.93], pizz: null, honk: null, strings: null, pad: null, whistle: null, logoHonk: null }
const EDGES = ['bass', 'mallet', 'glock', 'pizz', 'honk', 'honkF', 'strings', 'pad', 'whistle', 'logoMallet', 'logoGlock', 'logoHonk', 'logoPad', 'timp', 'tom', 'block']
const TRANSIENT_START = new Set(['mallet', 'glock', 'logoMallet', 'logoGlock', 'timp', 'tom', 'block', 'pizz'])

/** the pack's unit checks on its voices: U1, U2 (U3/U4 come from aggregateUnits over the teasers' specUnits) */
export async function units() {
  const { instruments } = await import('../../../looks/becker-rig/sound/instruments.mjs')
  const U1 = limits('U1', look), U2 = limits('U2', look)
  const out = []
  const add = (id, name, pass, detail) => out.push({ id, name, pass: !!pass, detail })
  const ctxFor = (name, midi) => ({ rng: D.rngFor('ucheck', `${name}:${midi}`), bpm: 120, beatLen: 0.5, k: 0, tl: null, chordAt: () => Th.chord('D') })
  for (const [inst, partials_] of Object.entries(PITCHED)) {
    for (const midi of U1.midi) {
      const ev = { midi, vel: 1, dur: 1.0, t: 0, from: midi }
      const b = monoOf(D.toStereo(instruments[inst](ev, ctxFor(inst, midi)), 0))
      const [w, at] = worstAlias(b, D.mtof(midi), partials_, U1.tol)
      add('U1', `${inst}@${midi}`, w <= U1.maxDb, `${w.toFixed(1)} dB @ ${at.toFixed(0)} Hz (≤ ${U1.maxDb})`)
    }
  }
  for (const inst of EDGES) {
    for (const midi of inst === 'bass' ? [38, 50] : [50, 74]) {
      const ev = { midi, vel: 1, dur: 0.4, t: 0, from: midi - 12, f0: 140, f1: 100 }
      const b = D.toStereo(instruments[inst](ev, ctxFor(inst, midi)), 0)
      let d0 = 0, d1 = 0
      for (const x of [b.L, b.R]) {
        const n = x.length, m = Math.round(U2.edgeMs / 1000 * SR)
        for (let i = 1; i < m; i++) d0 = Math.max(d0, Math.abs(x[i] - x[i - 1]))
        d0 = Math.max(d0, Math.abs(x[0]))
        for (let i = n - m; i < n; i++) d1 = Math.max(d1, Math.abs(x[i] - (x[i - 1] ?? 0)))
        d1 = Math.max(d1, Math.abs(x[n - 1]))
      }
      add('U2', `${inst}@${midi}`, d1 <= U2.maxStep && (d0 <= U2.maxStep || TRANSIENT_START.has(inst)), `start ${d0.toFixed(3)} end ${d1.toFixed(4)} (≤ ${U2.maxStep}${TRANSIENT_START.has(inst) ? '; start exempt' : ''})`)
    }
  }
  return { results: out }
}
/** U3, U4 and the SFX tails over every Becker teaser in the run, from their specUnits partials */
export function aggregateUnits(partials) {
  const U2 = limits('U2', look), U3 = limits('U3', look), U4 = limits('U4', look)
  const out = []
  const add = (id, name, pass, detail) => out.push({ id, name, pass: pass == null ? null : !!pass, detail })
  if (partials.length) {
    const u3 = {}, u4 = {}
    let nan = 0, tails = 0
    for (const p of partials) {
      for (const [k, v] of Object.entries(p.u3)) u3[k] = Math.max(u3[k] ?? -Infinity, v)
      for (const [k, v] of Object.entries(p.u4)) u4[k] = Math.max(u4[k] ?? 0, v)
      nan += p.nan; tails += p.tails
    }
    for (const [k, v] of Object.entries(u3)) add('U3', k, v <= U3.overDb, `peak re the §7 table ${v.toFixed(2)} dB (≤ +${U3.overDb}) over ${partials.length} teasers`)
    add('U3', 'NaN/Inf', nan === 0, `${nan}`)
    add('U2', 'sfx tails', tails === 0, `${tails} buffers end above ${U2.maxStep}`)
    for (const [k, v] of Object.entries(u4)) add('U4', k, v < U4.maxNcc || (U4.exemptKinds || []).includes(k), `max NCC ${v.toFixed(3)} (< ${U4.maxNcc})`)
  } else add('U3', 'cues', null, 'no Becker teaser in the run: U3/U4 need the teasers\' cues')
  return out
}
