#!/usr/bin/env node
// DSP unit checks for the Scoreboard pack (sound bible §9.5), run from studio/:
//   node looks/scoreboard/sound/units.mjs [--json]
//   U1 aliasing  every pitched instrument plays D6 (86) and A6 (93) for 1 s; spectral peaks off the harmonic series
//                (±1%) stay <= -50 dB re the fundamental (FM bells: their own partial list, multiples of f/2)
//   U2 clicks    every voice's first and last 1 ms move <= 0.02 per sample (transient-led drums and SFX exempt at the start)
//   U3 bounds    no NaN or Inf; every SFX kind renders within its §5 peak + 1 dB at gain 1 (fader at 0 dB)
//   U4 variation two consecutive cues of a kind, rendered solo, correlate < 0.98
//   LOGO         the sting's long note leads: n4's 85 ms RMS (neon brass A5 + A4) >= 2 dB over each pickup's (lead + pluck)
// It also prints each kind's 50 ms RMS from its cue time at gain 1 (the OWN table of the B3 clearance in sfx.mjs).
import * as D from '../../../src/sound/dsp.mjs'
import * as Th from '../../../src/sound/theory.mjs'
import { buildTimeline } from '../../../src/sound/timeline.mjs'
import { instruments } from './instruments.mjs'
import { rawSfx, cueCtx } from './sfx.mjs'
import { harmony } from './harmony.mjs'
import { compose } from './compose.mjs'
import { logo } from './logo.mjs'
import { mix } from './mix.mjs'

const SR = 48000
const json = process.argv.includes('--json')
const results = []
const add = (id, name, pass, detail) => results.push({ id, name, pass: !!pass, detail })

// ---------------------------------------------------------------- FFT helpers
function fftMag(x) {
  let n = 1; while (n < x.length) n <<= 1
  const re = new Float64Array(n), im = new Float64Array(n)
  // 4-term Blackman-Harris (sidelobes about -92 dB), so leakage never reads as a partial
  const a = [0.35875, 0.48829, 0.14128, 0.01168]
  for (let i = 0; i < x.length; i++) { const p = 2 * Math.PI * i / (x.length - 1); re[i] = x[i] * (a[0] - a[1] * Math.cos(p) + a[2] * Math.cos(2 * p) - a[3] * Math.cos(3 * p)) }
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]] } }
  for (let len = 2; len <= n; len <<= 1) { const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang); for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const p = i + k, q = p + len / 2; const tr = re[q] * cr - im[q] * ci, ti = re[q] * ci + im[q] * cr; re[q] = re[p] - tr; im[q] = im[p] - ti; re[p] += tr; im[p] += ti; const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr } } }
  const mag = new Float64Array(n / 2)
  for (let k = 0; k < n / 2; k++) mag[k] = Math.hypot(re[k], im[k])
  return { mag, df: SR / n }
}
/** worst off-series spectral peak re the fundamental (dB); step = the series spacing in multiples of f0 */
function aliasWorst(x, f0, step = 1, tol = 0.01) {
  const { mag, df } = fftMag(x)
  const k0 = Math.round(f0 / df)
  let fund = 0
  for (let k = Math.max(1, k0 - 6); k <= k0 + 6; k++) fund = Math.max(fund, mag[k])
  let worst = -300, at = 0
  for (let k = 3; k < mag.length - 3; k++) {
    if (!(mag[k] > mag[k - 1] && mag[k] >= mag[k + 1] && mag[k] > mag[k - 2] && mag[k] >= mag[k + 2])) continue
    const f = k * df, h = f / (f0 * step), near = Math.round(h)
    if (near >= 1 && Math.abs(f - near * f0 * step) <= tol * near * f0 * step + 2 * df) continue
    const dbv = 20 * Math.log10(mag[k] / fund)
    if (dbv > worst) { worst = dbv; at = f }
  }
  return { worst, at }
}
const mono = b => (b.L ? Float32Array.from(b.L, (v, i) => 0.5 * (v + b.R[i])) : b)
const peakDb = b => 20 * Math.log10(D.peakOf(b) || 1e-12)

// ---------------------------------------------------------------- a timeline to play in (09c-like, D minor)
const rec = {
  id: 'units', look: 'scoreboard', format: 'test', fps: 30, duration: 12, base: 9.5, brand: { logo: true, card: 'kit', t0: 9.5, dur: 2.5 },
  sfx: [{ t: 2, kind: 'riser', dur: 2, gain: 0.5 }, { t: 4, kind: 'hit', gain: 1 }, { t: 9.56, kind: 'pop', gain: 0.5 }], vo: [], verdict: null, beats: [],
}
const tl = buildTimeline(rec, { tempo: { lo: 136, hi: 152, target: 144, syncGrid: 4, absLo: 128, absHi: 160 } }, { overrides: {} })
tl.setHarmony(harmony(tl, tl.stream('arr')))
const ictx = (inst, k = 0) => ({ tl, rng: tl.stream(`noise:${inst}:${k}`), bpm: 144, beatLen: 60 / 144, chordAt: tl.chordAt, keyAt: tl.keyAt, k, D, T: Th })

// ---------------------------------------------------------------- U1 aliasing, U2 clicks (instruments)
// series: the instrument's own partial spacing in multiples of the note (the arp's square an octave down puts its f0
// at f/2); tol: the unison detune (the stab's ±18 cents is 1.04%); vib: 0 renders the lead without vibrato (its 5.5 Hz
// sidebands are modulation, not aliasing)
const PITCHED = {
  b808: { dive: 7 }, sub: {}, arp: { cut: 6000, series: 0.5 }, pad: { a: 0.03, lp: 3700 }, lead: { vib: 0 }, stab: { tol: 0.011 }, logoBrass: { dur: 1.3 },
}
for (const [inst, extra] of Object.entries(PITCHED)) {
  for (const midi of [86, 93]) {
    const ev = { t: 1, dur: 1.0, midi, vel: 1, inst, ...extra }
    const b = instruments[inst](ev, { ...ictx(inst), ev })
    const x = mono(b)
    const f0 = Th.mtof(midi)
    // the steady part (after attacks and dives), before the release
    const seg = x.subarray(Math.round(0.12 * SR), Math.round(0.95 * SR))
    const { worst, at } = aliasWorst(seg, f0, extra.series || 1, extra.tol || 0.01)
    add('U1', `${inst} ${Th.noteName(midi)}`, worst <= -50, `worst off-series peak ${worst.toFixed(1)} dB at ${at.toFixed(0)} Hz`)
  }
}
// U2 plays each voice at the top of its own register (the 808 at A2, the sub at D1, the lead at D5 ...)
const REG = { b808: 45, sub: 26, arp: 74, pad: 69, lead: 76, stab: 62, logoBrass: 81, mriser: 62, revcrash: 62 }
for (const [inst, extra] of Object.entries({ ...PITCHED, mriser: { dur: 1 }, revcrash: {} })) {
  const ev = { t: 1, dur: 0.5, midi: REG[inst], vel: 1, inst, ...extra }
  const b = instruments[inst](ev, { ...ictx(inst, 3), ev })
  let worstA = 0, worstE = 0
  for (const x of b.L ? [b.L, b.R] : [b]) {
    const n = x.length, m = Math.round(0.001 * SR)
    for (let i = 0; i < m; i++) worstA = Math.max(worstA, Math.abs(x[i] - (i ? x[i - 1] : 0)))
    for (let i = n - m; i < n; i++) worstE = Math.max(worstE, Math.abs((i + 1 < n ? x[i + 1] : 0) - x[i]))
  }
  add('U2', inst, worstA <= 0.02 && worstE <= 0.02, `first 1 ms max step ${worstA.toFixed(4)}, last 1 ms ${worstE.toFixed(4)}`)
}

// ---------------------------------------------------------------- U3, U4, OWN (SFX)
const PEAK = { tick: -14, type: -16, pop: -12, ding: -10, reveal: -6, thud: -6, whoosh: -14, riser: -8, roll: -16, cash: -9, buzz: -12, boing: -12, step: -12, hit: -3, swipe: -16 }
const TRANSIENT_START = new Set(['tick', 'type', 'pop', 'ding', 'thud', 'cash', 'hit', 'roll', 'step', 'reveal'])
const DUR = { roll: 0.9, riser: 1.6, type: 0.4, whoosh: 0.35, swipe: 0.22 }
const own = {}
for (const kind of Object.keys(PEAK)) {
  const bufs = []
  for (let j = 0; j < 2; j++) {
    const c = { t: 5 + j * 0.9, tCue: 5 + j * 0.9, kind, gain: 1, dur: DUR[kind] || 0, i: 10 + j, n: j, inCard: false }
    const b = rawSfx[kind](c, cueCtx(tl, c))
    let finite = true
    for (const v of b.L) if (!Number.isFinite(v)) finite = false
    for (const v of b.R) if (!Number.isFinite(v)) finite = false
    const pk = peakDb(b)
    if (j === 0) add('U3', kind, finite && pk <= PEAK[kind] + 1, `peak ${pk.toFixed(2)} dBFS (table ${PEAK[kind]}), finite ${finite}`)
    // clicks at the end (every kind) and at the start (the non-transient kinds)
    let worstE = 0, worstA = 0
    for (const x of [b.L, b.R]) {
      const n = x.length, m = Math.round(0.001 * SR)
      for (let i = n - m; i < n; i++) worstE = Math.max(worstE, Math.abs((i + 1 < n ? x[i + 1] : 0) - x[i]))
      const o = b.offset || 0
      for (let i = 0; i < m; i++) worstA = Math.max(worstA, Math.abs(x[o === 0 ? i : i] - (i ? x[i - 1] : 0)))
    }
    if (j === 0) add('U2', `sfx ${kind}`, worstE <= 0.02 && (TRANSIENT_START.has(kind) || worstA <= 0.02), `last 1 ms max step ${worstE.toFixed(4)}${TRANSIENT_START.has(kind) ? '' : `, first 1 ms ${worstA.toFixed(4)}`}`)
    bufs.push(b)
    if (j === 0) {
      const o = b.offset || 0, w = Math.round(0.05 * SR)
      let s = 0
      for (let i = o; i < o + w && i < b.L.length; i++) s += b.L[i] ** 2 + b.R[i] ** 2
      own[kind] = +(10 * Math.log10(s / (2 * w) + 1e-20)).toFixed(1)
    }
  }
  const [x, y] = bufs.map(b => b.L)
  const n = Math.min(x.length, y.length)
  let xy = 0, xx = 0, yy = 0
  for (let i = 0; i < n; i++) { xy += x[i] * y[i]; xx += x[i] * x[i]; yy += y[i] * y[i] }
  const ncc = xy / Math.sqrt(xx * yy || 1)
  if (kind !== 'buzz') add('U4', kind, ncc < 0.98, `NCC ${ncc.toFixed(3)}`)
  else add('U4', kind, true, `NCC ${ncc.toFixed(3)} (the bible gives buzz no variation; one per teaser)`)
}

// ---------------------------------------------------------------- LOGO (the motif's four notes, solo, at the mix levels)
{
  compose(tl, tl.stream('arr:compose'), { D, T: Th })   // the sting's level reads the fader plan, which reads the bed
  const m = tl.logoMotif()
  const lg = logo(tl, { motif: m, rng: tl.stream('arr:logo'), D, T: Th })
  const notesAt = t => lg.notes.filter(n => Math.abs(n.t - t) < 1e-6 && /logoLead|logoArp|logoBrass/.test(n.inst))
  // the engine's per-instrument index k (events sorted by t, bus, inst, midi, j): the sting's brand seeds hang on it, and
  // the brass's three detuned saws (seeded phases) move its first 85 ms by several dB from one seed to another
  const kOf = new Map()
  { const cnt = {}; lg.notes.map((e, j) => ({ e, j })).sort((a, b) => a.e.t - b.e.t || (a.e.inst < b.e.inst ? -1 : a.e.inst > b.e.inst ? 1 : 0) || (a.e.midi ?? -1) - (b.e.midi ?? -1) || a.j - b.j).forEach(x => kOf.set(x.e, cnt[x.e.inst] = (cnt[x.e.inst] ?? -1) + 1)) }
  const rms85 = list => {
    const n = Math.round(0.085 * SR), L = new Float64Array(n), R = new Float64Array(n)
    list.forEach(ev => {
      const b = D.toStereo(instruments[ev.inst](ev, { ...ictx(ev.inst, kOf.get(ev)), ev }), ev.pan || 0)
      const g = D.dbToGain(mix.levels[ev.inst] ?? 0)
      for (let i = 0; i < n && i < b.L.length; i++) { L[i] += b.L[i] * g; R[i] += b.R[i] * g }
    })
    let s = 0
    for (let i = 0; i < n; i++) s += L[i] * L[i] + R[i] * R[i]
    return 10 * Math.log10(s / (2 * n))
  }
  const v = m.notes.map(x => rms85(notesAt(x.t)))
  const lead = Math.max(...v.slice(0, 3))
  add('LOGO', 'n4 vs n1-n3', v[3] >= lead + 2, `85 ms RMS n1 ${v[0].toFixed(1)}, n2 ${v[1].toFixed(1)}, n3 ${v[2].toFixed(1)}, n4 ${v[3].toFixed(1)} dBFS (n4 - loudest pickup ${(v[3] - lead).toFixed(1)} dB)`)
}

if (json) console.log(JSON.stringify({ results, own }, null, 1))
else {
  for (const r of results) console.log(`${r.pass ? 'ok ' : 'XX '} ${r.id} ${r.name.padEnd(16)} ${r.detail}`)
  console.log(`\n${results.filter(r => r.pass).length}/${results.length} unit checks pass`)
  console.log('50 ms RMS at gain 1 (dBFS):', JSON.stringify(own))
}
