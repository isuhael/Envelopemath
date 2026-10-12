// Becker Rig U1-U4 (bible §9.6): aliasing at D6/A6 for the pitched voices, clicks at voice edges, SFX bounds, variation.
import fs from 'node:fs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import * as T from '/home/user/Envelopemath/studio/src/sound/theory.mjs'
import * as pack from '/home/user/Envelopemath/studio/looks/becker-rig/sound.mjs'
import { buildTimeline } from '/home/user/Envelopemath/studio/src/sound/timeline.mjs'
import { renderCues } from '/home/user/Envelopemath/studio/looks/becker-rig/sound/balance.mjs'
const SR = D.SR
function fft(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]] } }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len, wr = Math.cos(ang), wi = Math.sin(ang)
    for (let i = 0; i < n; i += len) { let cr = 1, ci = 0; for (let k = 0; k < len / 2; k++) { const a = i + k, b = a + len / 2, tr = re[b] * cr - im[b] * ci, ti = re[b] * ci + im[b] * cr; re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti; const nr = cr * wr - ci * wi; ci = cr * wi + ci * wr; cr = nr } }
  }
}
const rngFor = name => D.rngFor('ucheck', name)
const mono = b => b.L ? Float32Array.from(b.L, (v, i) => 0.5 * (v + b.R[i])) : b
const ctxFor = (name, midi) => ({ rng: rngFor(`${name}:${midi}`), bpm: 120, beatLen: 0.5, k: 0, tl: null, chordAt: () => T.chord('D') })
const out = []
// ---- U1
const PITCHED = { bass: null, mallet: [1, 3.9, 9.2], glock: [1, 2.76, 5.40, 8.93], pizz: null, honk: null, strings: null, pad: null, whistle: null, logoHonk: null }
const worstAlias = (x, f0, partials) => {
  const n = 32768, s0 = Math.min(Math.round(0.05 * SR), Math.max(0, x.length - n))
  const re = new Float64Array(n), im = new Float64Array(n)
  for (let i = 0; i < n; i++) re[i] = (x[s0 + i] || 0) * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / n))
  fft(re, im)
  const mag = k => Math.hypot(re[k], im[k])
  const k0 = Math.round(f0 * n / SR)
  let fund = 0
  for (let k = k0 - 4; k <= k0 + 4; k++) fund = Math.max(fund, mag(k))
  let worst = -Infinity, at = 0
  for (let k = 20; k < n / 2 - 1; k++) {
    const m = mag(k)
    if (!(m > mag(k - 1) && m >= mag(k + 1))) continue
    const f = k * SR / n
    const ok = partials
      ? partials.some(p => Math.abs(f / (p * f0) - 1) <= 0.01 + 1.5 * SR / n / (p * f0)) || Math.abs(f / f0 - Math.round(f / f0)) <= 0.01 * Math.max(1, Math.round(f / f0)) + 0.02 && !partials
      : Math.abs(f / f0 - Math.round(f / f0)) <= 0.01 * Math.max(1, Math.round(f / f0)) + 0.02
    if (ok) continue
    const db = 20 * Math.log10(m / fund)
    if (db > worst) { worst = db; at = f }
  }
  return [worst, at]
}
for (const [inst, partials] of Object.entries(PITCHED)) {
  for (const midi of [86, 93]) {
    const fn = pack.instruments[inst]
    const ev = { midi, vel: 1, dur: 1.0, t: 0, from: midi }
    const b = mono(D.toStereo(fn(ev, ctxFor(inst, midi)), 0))
    const [w, at] = worstAlias(b, D.mtof(midi), partials)
    out.push(['U1', `${inst}@${midi}`, w <= -50, `${w.toFixed(1)} dB @ ${at.toFixed(0)} Hz`])
  }
}
// ---- U2: first and last 1 ms of each pitched/sustained voice
for (const inst of ['bass', 'mallet', 'glock', 'pizz', 'honk', 'honkF', 'strings', 'pad', 'whistle', 'logoMallet', 'logoGlock', 'logoHonk', 'logoPad', 'timp', 'tom', 'block']) {
  for (const midi of inst === 'bass' ? [38, 50] : [50, 74]) {
    const ev = { midi, vel: 1, dur: 0.4, t: 0, from: midi - 12, f0: 140, f1: 100 }
    const b = D.toStereo(pack.instruments[inst](ev, ctxFor(inst, midi)), 0)
    let d0 = 0, d1 = 0
    for (const x of [b.L, b.R]) {
      const n = x.length, m = 48
      for (let i = 1; i < m; i++) d0 = Math.max(d0, Math.abs(x[i] - x[i - 1]))
      d0 = Math.max(d0, Math.abs(x[0]))
      for (let i = n - m; i < n; i++) d1 = Math.max(d1, Math.abs(x[i] - (x[i - 1] ?? 0)))
      d1 = Math.max(d1, Math.abs(x[n - 1]))
    }
    out.push(['U2', `${inst}@${midi}`, d1 <= 0.02 && (d0 <= 0.02 || ['mallet', 'glock', 'logoMallet', 'logoGlock', 'timp', 'tom', 'block', 'pizz'].includes(inst)), `start ${d0.toFixed(3)} end ${d1.toFixed(4)}`])
  }
}
// ---- U3 + U4 + SFX U2 tails over all 15 specs' cues
// the bible's §7 peak column (hit: -4, the big variant -3)
const NOMINAL = { thud: -8, tick: -16, swipe: -14, pop: -12, hit: -4, ding: -10, whoosh: -14, cash: -9, step: -16, roll: -16, type: -18, riser: -10, buzz: -12, boing: -12, reveal: -8 }
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json'))
const u3 = {}, u4 = {}
let nan = 0, tails = 0
for (const [id, rec] of Object.entries(recs).sort()) {
  if (rec.look !== 'becker-rig') continue
  const tl = buildTimeline(rec, pack, { overrides: {} })
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T }))
  pack.compose(tl, tl.stream('arr:compose'), { D, T })
  const r = renderCues(tl)
  const last = {}
  for (const { c, b } of r) {
    for (const x of [b.L, b.R]) for (const v of x) if (!Number.isFinite(v)) nan++
    const pk = 20 * Math.log10(D.peakOf(b))
    const k = c.kind
    u3[k] = Math.max(u3[k] ?? -Infinity, pk - NOMINAL[k])
    const n = b.L.length; if (Math.abs(b.L[n - 1]) > 0.02 || Math.abs(b.R[n - 1]) > 0.02) tails++
    if (last[k] && !c.inCard) {
      const a = mono(last[k]), y = mono(b), m = Math.min(a.length, y.length)
      let best = 0
      for (const lag of [-96, -48, 0, 48, 96]) {
        let s = 0, ea = 0, ey = 0
        for (let i = Math.max(0, -lag); i < m && i + lag < m; i++) { s += a[i] * y[i + lag]; ea += a[i] * a[i]; ey += y[i + lag] * y[i + lag] }
        best = Math.max(best, s / Math.sqrt(ea * ey + 1e-30))
      }
      u4[k] = Math.max(u4[k] ?? 0, best)
    }
    if (!c.inCard) last[k] = b
  }
}
for (const [k, v] of Object.entries(u3)) out.push(['U3', k, v <= 1, `peak re nominal ${v.toFixed(2)} dB`])
out.push(['U3', 'NaN/Inf', nan === 0, `${nan}`])
out.push(['U2', 'sfx tails', tails === 0, `${tails} buffers end above 0.02`])
for (const [k, v] of Object.entries(u4)) out.push(['U4', k, v < 0.98, `max NCC ${v.toFixed(3)}`])
let fails = 0
for (const [u, what, ok, d] of out) { if (!ok) fails++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${u} ${what.padEnd(14)} ${d}`) }
console.log(`${out.length - fails}/${out.length} pass`)
