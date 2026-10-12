// Scoreboard pack checks: TRAIN and DUCK on each teaser's score, and the pack's DSP unit checks (§9.5 U1-U4 plus LOGO),
// folded in from looks/scoreboard/sound/verify.mjs and units.mjs. Thresholds: sound/acceptance.json.
import * as D from '../../../src/sound/dsp.mjs'
import * as Th from '../../../src/sound/theory.mjs'
import { buildTimeline } from '../../../src/sound/timeline.mjs'
import { limits } from '../acceptance.mjs'
import { SR, fft, edgeSteps, ncc, fix } from '../measure.mjs'

export const look = 'scoreboard'

export const checks = {
  /** no music onset (kick, clap, snare, hat; arp, lead, stab) 12-60 ms from a clock-train tick (anchors excepted) */
  TRAIN(ctx, lim) {
    const sc = ctx.score, P = sc.anchors.P.t
    const anchors = [0, P, sc.anchors.V ? sc.anchors.V.t : null, sc.base].filter(x => x != null)
    const roles = new RegExp(lim.roles), drums = new RegExp(lim.drums)
    const ons = [...sc.notes.filter(n => n.role !== 'logo' && roles.test(n.role)), ...sc.drums.filter(d => d.role !== 'logo' && drums.test(d.inst))]
      .filter(e => !anchors.some(a => Math.abs(a - e.t) <= 0.001))
    const ticks = sc.sfx.filter(x => x.train != null)
    const bad = []
    for (const tk of ticks) for (const e of ons) { const d = Math.abs(e.t - tk.t); if (d >= lim.minMs / 1000 && d <= lim.maxMs / 1000) bad.push(`${e.inst}@${e.t}~tick@${tk.t}`) }
    return { pass: !bad.length, detail: ticks.length ? `${ticks.length} ticks, ${bad.length} music onsets ${lim.minMs}-${lim.maxMs} ms from one${bad.length ? ': ' + bad.slice(0, 4).join(' ') : ''}` : 'no clock trains' }
  },
  /** the B3 clearance stays band-selective: a B3 cue's broadband duck within capX x its §5 table depth (hookAndVMinDb at
   *  the hook and at V; a hit at P keeps the payoff design) */
  DUCK(ctx, lim) {
    const sc = ctx.score, P = sc.anchors.P.t, Vt = sc.anchors.V ? sc.anchors.V.t : null, mix = ctx.pack.mix
    const b3 = limits('B3', ctx.look), kinds = new Set(b3.kinds)
    const hitP = sc.sfx.some(x => x.kind === 'hit' && Math.abs(x.t - P) <= 0.015)
    const bad = []
    let worst = 0
    for (const x of sc.sfx) {
      const g = x.cueGain ?? x.gain
      if (!kinds.has(x.kind) || g < b3.minGain || x.card || !x.duck) continue
      const atP = Math.abs(x.t - P) <= 0.015
      if (atP && hitP) continue
      const scale = Math.min(1.2, Math.max(0.3, g / 0.7))
      const tab = ((atP && mix.duckBig[x.kind]) || mix.duck[x.kind])[0] * scale
      const cap = x.t <= 0.02 || (Vt != null && Math.abs(x.t - Vt) <= 0.015) ? Math.max(tab, lim.hookAndVMinDb) : lim.capX * tab
      worst = Math.max(worst, x.duck.depth - tab)
      if (x.duck.depth > cap + lim.tolDb) bad.push(`${x.kind}@${x.t}:${x.duck.depth}>${cap.toFixed(1)}`)
    }
    return { pass: !bad.length, detail: bad.length ? `over the cap: ${bad.join(' ')}` : `largest extra over the table ${worst.toFixed(1)} dB` }
  },
}

// ---------------------------------------------------------------- units (§9.5 U1-U4, LOGO)
/** 4-term Blackman-Harris magnitude spectrum, zero-padded to a power of 2 */
function bhMag(x) {
  let n = 1
  while (n < x.length) n <<= 1
  const re = new Float64Array(n), im = new Float64Array(n), a = [0.35875, 0.48829, 0.14128, 0.01168]
  for (let i = 0; i < x.length; i++) { const p = 2 * Math.PI * i / (x.length - 1); re[i] = x[i] * (a[0] - a[1] * Math.cos(p) + a[2] * Math.cos(2 * p) - a[3] * Math.cos(3 * p)) }
  fft(re, im)
  const mag = new Float64Array(n / 2)
  for (let k = 0; k < n / 2; k++) mag[k] = Math.hypot(re[k], im[k])
  return { mag, df: SR / n }
}
/** worst off-series spectral peak re the fundamental (dB); step = the series spacing in multiples of f0 */
function aliasWorst(x, f0, step, tol) {
  const { mag, df } = bhMag(x)
  const k0 = Math.round(f0 / df)
  let fund = 0
  for (let k = Math.max(1, k0 - 6); k <= k0 + 6; k++) fund = Math.max(fund, mag[k])
  let worst = -300, at = 0
  for (let k = 3; k < mag.length - 3; k++) {
    if (!(mag[k] > mag[k - 1] && mag[k] >= mag[k + 1] && mag[k] > mag[k - 2] && mag[k] >= mag[k + 2])) continue
    const f = k * df, near = Math.round(f / (f0 * step))
    if (near >= 1 && Math.abs(f - near * f0 * step) <= tol * near * f0 * step + 2 * df) continue
    const v = 20 * Math.log10(mag[k] / fund)
    if (v > worst) { worst = v; at = f }
  }
  return { worst, at }
}
const mono = b => (b.L ? Float32Array.from(b.L, (v, i) => 0.5 * (v + b.R[i])) : b)
const peakDb = b => 20 * Math.log10(D.peakOf(b) || 1e-12)

// the voices under test: series = the instrument's partial spacing in multiples of the note (the arp's square an octave
// down puts its f0 at f/2); tol = the unison detune (the stab's ±18 cents is 1.04%); vib 0 renders the lead without
// vibrato (its 5.5 Hz sidebands are modulation, not aliasing)
const PITCHED = { b808: { dive: 7 }, sub: {}, arp: { cut: 6000, series: 0.5 }, pad: { a: 0.03, lp: 3700 }, lead: { vib: 0 }, stab: { tol: 0.011 }, logoBrass: { dur: 1.3 } }
// U2 plays each voice at the top of its own register (the 808 at A2, the sub at D1, the lead at D5 ...)
const REG = { b808: 45, sub: 26, arp: 74, pad: 69, lead: 76, stab: 62, logoBrass: 81, mriser: 62, revcrash: 62 }
const TRANSIENT_START = new Set(['tick', 'type', 'pop', 'ding', 'thud', 'cash', 'hit', 'roll', 'step', 'reveal'])
const DUR = { roll: 0.9, riser: 1.6, type: 0.4, whoosh: 0.35, swipe: 0.22 }

/** the pack's unit checks on a synthetic 09c-like timeline -> [{ id, name, pass, detail }] (+ own: each kind's 50 ms RMS) */
export async function units() {
  const { instruments } = await import('../../../looks/scoreboard/sound/instruments.mjs')
  const { rawSfx, cueCtx } = await import('../../../looks/scoreboard/sound/sfx.mjs')
  const { harmony } = await import('../../../looks/scoreboard/sound/harmony.mjs')
  const { compose } = await import('../../../looks/scoreboard/sound/compose.mjs')
  const { logo } = await import('../../../looks/scoreboard/sound/logo.mjs')
  const { mix } = await import('../../../looks/scoreboard/sound/mix.mjs')
  const U1 = limits('U1', look), U2 = limits('U2', look), U3 = limits('U3', look), U4 = limits('U4', look), LG = limits('LOGO', look)
  const out = []
  const add = (id, name, pass, detail) => out.push({ id, name, pass: !!pass, detail })
  const rec = {
    id: 'units', look, format: 'test', fps: 30, duration: 12, base: 9.5, brand: { logo: true, card: 'kit', t0: 9.5, dur: 2.5 },
    sfx: [{ t: 2, kind: 'riser', dur: 2, gain: 0.5 }, { t: 4, kind: 'hit', gain: 1 }, { t: 9.56, kind: 'pop', gain: 0.5 }], vo: [], verdict: null, beats: [],
  }
  const tl = buildTimeline(rec, { tempo: { lo: 136, hi: 152, target: 144, syncGrid: 4, absLo: 128, absHi: 160 } }, { overrides: {} })
  tl.setHarmony(harmony(tl, tl.stream('arr')))
  const ictx = (inst, k = 0) => ({ tl, rng: tl.stream(`noise:${inst}:${k}`), bpm: 144, beatLen: 60 / 144, chordAt: tl.chordAt, keyAt: tl.keyAt, k, D, T: Th })
  // U1 aliasing (the steady part, after attacks and dives, before the release)
  for (const [inst, extra] of Object.entries(PITCHED)) {
    for (const midi of U1.midi) {
      const ev = { t: 1, dur: 1.0, midi, vel: 1, inst, ...extra }
      const x = mono(instruments[inst](ev, { ...ictx(inst), ev }))
      const seg = x.subarray(Math.round(0.12 * SR), Math.round(0.95 * SR))
      const { worst, at } = aliasWorst(seg, Th.mtof(midi), extra.series || 1, extra.tol || U1.tol)
      add('U1', `${inst} ${Th.noteName(midi)}`, worst <= U1.maxDb, `worst off-series peak ${worst.toFixed(1)} dB at ${at.toFixed(0)} Hz (≤ ${U1.maxDb})`)
    }
  }
  // U2 clicks (voices)
  for (const [inst, extra] of Object.entries({ ...PITCHED, mriser: { dur: 1 }, revcrash: {} })) {
    const ev = { t: 1, dur: 0.5, midi: REG[inst], vel: 1, inst, ...extra }
    const e = edgeSteps(instruments[inst](ev, { ...ictx(inst, 3), ev }), U2.edgeMs)
    add('U2', inst, e.start <= U2.maxStep && e.end <= U2.maxStep, `first ${U2.edgeMs} ms max step ${e.start.toFixed(4)}, last ${e.end.toFixed(4)} (≤ ${U2.maxStep})`)
  }
  // U3 bounds, U2 SFX edges, U4 variation, and each kind's 50 ms RMS at gain 1 (the OWN table of the B3 clearance)
  const own = {}
  for (const kind of Object.keys(U3.peaks)) {
    const bufs = []
    for (let j = 0; j < 2; j++) {
      const c = { t: 5 + j * 0.9, tCue: 5 + j * 0.9, kind, gain: 1, dur: DUR[kind] || 0, i: 10 + j, n: j, inCard: false }
      const b = rawSfx[kind](c, cueCtx(tl, c))
      bufs.push(b)
      if (j) continue
      let finite = true
      for (const x of [b.L, b.R]) for (const v of x) if (!Number.isFinite(v)) finite = false
      const pk = peakDb(b)
      add('U3', kind, finite && pk <= U3.peaks[kind] + U3.overDb, `peak ${pk.toFixed(2)} dBFS (table ${U3.peaks[kind]} + ${U3.overDb}), finite ${finite}`)
      const e = edgeSteps(b, U2.edgeMs), tr = TRANSIENT_START.has(kind)
      add('U2', `sfx ${kind}`, e.end <= U2.maxStep && (tr || e.start <= U2.maxStep), `last ${U2.edgeMs} ms max step ${e.end.toFixed(4)}${tr ? '' : `, first ${e.start.toFixed(4)}`} (≤ ${U2.maxStep})`)
      const o = b.offset || 0, w = Math.round(0.05 * SR)
      let s = 0
      for (let i = o; i < o + w && i < b.L.length; i++) s += b.L[i] ** 2 + b.R[i] ** 2
      own[kind] = +(10 * Math.log10(s / (2 * w) + 1e-20)).toFixed(1)
    }
    const v = ncc(bufs[0].L, bufs[1].L)
    const exempt = (U4.exemptKinds || []).includes(kind)
    add('U4', kind, exempt || v < U4.maxNcc, `NCC ${v.toFixed(3)} (< ${U4.maxNcc})${exempt ? ' (exempt: one per teaser)' : ''}`)
  }
  // LOGO: the motif's four notes solo at the mix levels; n4's first windowMs leads each pickup by leadDb
  {
    compose(tl, tl.stream('arr:compose'), { D, T: Th })   // the sting's level reads the fader plan, which reads the bed
    const m = tl.logoMotif()
    const lg = logo(tl, { motif: m, rng: tl.stream('arr:logo'), D, T: Th })
    const notesAt = t => lg.notes.filter(n => Math.abs(n.t - t) < 1e-6 && /logoLead|logoArp|logoBrass/.test(n.inst))
    // the engine's per-instrument index k (events sorted by t, bus, inst, midi, j): the sting's brand seeds hang on it
    const kOf = new Map()
    { const cnt = {}; lg.notes.map((e, j) => ({ e, j })).sort((a, b) => a.e.t - b.e.t || (a.e.inst < b.e.inst ? -1 : a.e.inst > b.e.inst ? 1 : 0) || (a.e.midi ?? -1) - (b.e.midi ?? -1) || a.j - b.j).forEach(x => kOf.set(x.e, cnt[x.e.inst] = (cnt[x.e.inst] ?? -1) + 1)) }
    const rmsW = list => {
      const n = Math.round(LG.windowMs / 1000 * SR), L = new Float64Array(n), R = new Float64Array(n)
      for (const ev of list) {
        const b = D.toStereo(instruments[ev.inst](ev, { ...ictx(ev.inst, kOf.get(ev)), ev }), ev.pan || 0)
        const g = D.dbToGain(mix.levels[ev.inst] ?? 0)
        for (let i = 0; i < n && i < b.L.length; i++) { L[i] += b.L[i] * g; R[i] += b.R[i] * g }
      }
      let s = 0
      for (let i = 0; i < n; i++) s += L[i] * L[i] + R[i] * R[i]
      return 10 * Math.log10(s / (2 * n))
    }
    const v = m.notes.map(x => rmsW(notesAt(x.t)))
    const lead = Math.max(...v.slice(0, 3))
    add('LOGO', 'n4 vs n1-n3', v[3] >= lead + LG.leadDb, `${LG.windowMs} ms RMS n1 ${fix(v[0], 1)}, n2 ${fix(v[1], 1)}, n3 ${fix(v[2], 1)}, n4 ${fix(v[3], 1)} dBFS (n4 - loudest pickup ${(v[3] - lead).toFixed(1)} dB, ≥ ${LG.leadDb})`)
  }
  return { results: out, own }
}
