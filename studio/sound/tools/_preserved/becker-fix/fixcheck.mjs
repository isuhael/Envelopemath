// The critic's own measurements, re-run on the fixed pack (becker-rig review, 2026-10-11):
//  must 1  per-instrument K-weighted loudness re the band in the BUILD; the loudest voice in 500-1200 Hz
//  must 2  duck depth under the react voices (catch stabs, V button, the fanfare's TA) and at V
//  should  duck statistics (body share >= 6 dB down, dips deeper than 6 dB per minute), returns re mix, foley in-band
//          audibility (tick 500-3000, step 80-1200 and 1.5-4 kHz, roll 1.8-2.6 kHz, whoosh 700-3500 Hz), flams
//          (kick/snare/clap/tom 15-70 ms off a body cue >= 0.35 or a clock-train tick), the deflate's bending bass
// usage: node fixcheck.mjs <sound dir (score/report json)> <stems dir> [--only id]
import fs from 'node:fs'
import path from 'node:path'
import { readWav } from '/home/user/Envelopemath/studio/src/sound/wav.mjs'
import { loadPack } from '/home/user/Envelopemath/studio/src/sound/engine.mjs'
import { buildTimeline } from '/home/user/Envelopemath/studio/src/sound/timeline.mjs'
import * as D from '/home/user/Envelopemath/studio/src/sound/dsp.mjs'
import * as Th from '/home/user/Envelopemath/studio/src/sound/theory.mjs'
import { loudness } from '/home/user/Envelopemath/studio/src/sound/loudness.mjs'
const SR = 48000, nS = t => Math.round(t * SR)
const [repDir, stemDir] = process.argv.slice(2).filter(a => !a.startsWith('--'))
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1] : null
const recs = JSON.parse(fs.readFileSync('/home/user/Envelopemath/studio/test/fixtures/cues.json', 'utf8'))
const pack = await loadPack('becker-rig')
const ids = fs.readdirSync(repDir).filter(f => f.endsWith('.score.json')).map(f => f.replace('.score.json', '')).filter(id => /becker/.test(id) && (!only || id.startsWith(only))).sort()
const rms = (b, t0, t1) => { const i0 = Math.max(0, nS(t0)), i1 = Math.min(b.L.length, nS(t1)); let s = 0; for (let i = i0; i < i1; i++) s += (b.L[i] ** 2 + b.R[i] ** 2) / 2; return 10 * Math.log10(s / Math.max(1, i1 - i0) + 1e-20) }
const bp = (b, lo, hi) => { const x = { L: Float32Array.from(b.L), R: Float32Array.from(b.R) }; for (const [t, f] of [['hp', lo], ['hp', lo], ['lp', hi], ['lp', hi]]) D.filter(x, t, f, { q: 0.7071 }); return x }
function evalDb(points, n) { const pts = points.slice().sort((a, b) => a.t - b.t); const g = new Float32Array(n); let k = 0; for (let i = 0; i < n; i++) { const t = i / SR; while (k + 1 < pts.length && pts[k + 1].t <= t) k++; let db; if (t <= pts[0].t) db = pts[0].db; else if (k + 1 >= pts.length) db = pts[pts.length - 1].db; else { const a = pts[k], b = pts[k + 1]; db = a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t) } g[i] = Math.pow(10, db / 20) } return g }
const all = []
for (const id of ids) {
  const sc = JSON.parse(fs.readFileSync(path.join(repDir, `${id}.score.json`), 'utf8'))
  const rep = JSON.parse(fs.readFileSync(path.join(repDir, `${id}.report.json`), 'utf8'))
  const music = readWav(path.join(stemDir, `${id}.music.wav`)), sfx = readWav(path.join(stemDir, `${id}.sfx.wav`))
  const P = sc.anchors.P.t, V = sc.anchors.V ? sc.anchors.V.t : null, base = sc.base
  const out = { id: id.slice(0, 3) }
  // ---- must 1: BUILD balance (the critic's instbal: pre glue/duck, with musicDb and the per-voice automation)
  {
    const rec = recs[id], tl = buildTimeline(rec, pack, {})
    tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
    const comp = pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
    const sec = tl.section('BUILD'), N = nS(sec.t1) + SR
    const buses = {}, count = {}
    for (const ev of [...comp.notes, ...comp.drums].sort((a, b) => a.t - b.t)) {
      const fn = pack.instruments[ev.inst]; if (!fn) continue
      const k = count[ev.inst] || 0; count[ev.inst] = k + 1
      if (ev.t >= sec.t1 || ev.t < sec.t0 - 1.5) continue
      const b = D.toStereo(fn(ev, { tl, ev, rng: tl.stream(`noise:${ev.inst}:${k}`), bpm: tl.bpmAt(ev.t), beatLen: tl.beatLen(ev.t), chordAt: tl.chordAt, keyAt: tl.keyAt, k, D, T: Th }), ev.pan || 0)
      const bus = buses[ev.inst] || (buses[ev.inst] = D.stereo(N))
      D.addAt(bus, b, nS(ev.t), D.dbToGain(pack.mix.levels[ev.inst] ?? 0))
    }
    const md = evalDb(comp.automation.musicDb, N), i0 = nS(sec.t0), i1 = nS(sec.t1)
    const sum = D.stereo(i1 - i0), sl = {}
    for (const [inst, b] of Object.entries(buses)) {
      const ga = comp.automation.gain && comp.automation.gain[inst], g = ga ? evalDb(ga, N) : null
      const x = { L: new Float32Array(i1 - i0), R: new Float32Array(i1 - i0) }
      for (let i = i0; i < i1; i++) { const k = (g ? g[i] : 1) * (/R$/.test(inst) ? 1 : md[i]); x.L[i - i0] = b.L[i] * k; x.R[i - i0] = b.R[i] * k; sum.L[i - i0] += x.L[i - i0]; sum.R[i - i0] += x.R[i - i0] }
      sl[inst] = x
    }
    const tb = loudness(sum).integrated
    const lu = Object.entries(sl).map(([k, x]) => [k, loudness(x).integrated - tb]).filter(x => Number.isFinite(x[1])).sort((a, b) => b[1] - a[1])
    out.buildLU = Object.fromEntries(lu.map(([k, v]) => [k, +v.toFixed(1)]))
    const pw = x => { const y = bp(x, 500, 1200); let s = 0; for (let i = 0; i < y.L.length; i++) s += y.L[i] ** 2 + y.R[i] ** 2; return 10 * Math.log10(s / y.L.length + 1e-30) }
    const r5 = Object.entries(sl).map(([k, x]) => [k, pw(x)]).sort((a, b) => b[1] - a[1])
    out.loud500_1200 = r5.slice(0, 4).map(([k, v]) => `${k} ${(v - r5[0][1]).toFixed(1)}`).join(', ')
    out.must1 = (out.buildLU.mallet ?? -99) >= -10 && r5[0][0] === 'mallet'
    out.glockBeforeP = comp.notes.filter(n => n.inst === 'glock' && n.t < P - 0.01).length
  }
  // ---- must 2: the duck under the react voices and at V
  const dk = sc.duck.db, dAt = t => dk[Math.round(t * 100)]
  {
    const react = sc.notes.filter(n => /R$/.test(n.inst))
    const starts = [...new Set(react.map(n => n.t.toFixed(3)))]
    out.react = starts.map(t => `${react.find(n => n.t.toFixed(3) === t).inst}@${t} (bus un-ducked; duck curve ${dAt(+t)})`).join('; ') || 'none'
    if (V != null) { const d = sc.sfx.find(s => Math.abs(s.t - V) < 0.016 && s.kind === 'ding'); out.dingV = d ? `ding@V duck ${d.duck ? d.duck.depth : 0} dB` : 'no ding at V' }
    out.duckP = `P duck ${[0, 0.15, 0.3, 0.45, 0.6].map(x => dAt(P + x)).join('/')} dB at +0/.15/.3/.45/.6 s`
  }
  // ---- should: duck statistics, returns
  {
    const nb = Math.floor(base * 100)
    let deep = 0, dips = 0, inDip = false, worst = 0
    for (let k = 0; k < nb; k++) { if (dk[k] <= -6) deep++; if (dk[k] <= -6 && !inDip) { dips++; inDip = true } if (dk[k] > -3) inDip = false; worst = Math.min(worst, dk[k]) }
    const Pk = [Math.round(P * 100), Math.round((P + 0.6) * 100)]
    let deepX = 0; for (let k = 0; k < nb; k++) if (dk[k] <= -6 && !(k >= Pk[0] && k < Pk[1])) deepX++
    out.duck = `${(100 * deep / nb).toFixed(1)}% of body >= 6 dB down (${(100 * deepX / nb).toFixed(1)}% outside the payoff), ${(dips / (base / 60)).toFixed(1)} dips > 6 dB/min`
    const depths = sc.sfx.filter(s => s.duck && !s.card).map(s => `${s.kind}:${s.duck.depth}`)
    const byK = {}; for (const s of sc.sfx) if (s.duck && !s.card) (byK[s.kind] ||= []).push(s.duck.depth)
    out.duckByKind = Object.entries(byK).map(([k, v]) => `${k} ${Math.min(...v).toFixed(1)}-${Math.max(...v).toFixed(1)}`).join(', ')
    out.returns = rep.stems.returns.reMix
  }
  // ---- should: foley in-band audibility (cue window, SFX stem vs music stem)
  {
    const bands = { tick: [500, 3000, 0.08], step: [80, 1200, 0.09], roll: [1800, 2600, null], whoosh: [700, 3500, null] }
    const f = []
    for (const [kind, [lo, hi, len]] of Object.entries(bands)) {
      const cs = sc.sfx.filter(s => s.kind === kind && s.t < base)
      if (!cs.length) continue
      const a = bp(sfx, lo, hi), m = bp(music, lo, hi)
      const ds = cs.map(s => { const w = len ?? Math.max(0.08, Math.min(0.5, s.dur || 0.2)); return rms(a, s.t, s.t + w) - rms(m, s.t, s.t + w) }).sort((x, y) => x - y)
      f.push(`${kind} med ${ds[Math.floor(ds.length / 2)].toFixed(1)} dB (${ds.filter(x => x < 0).length}/${ds.length} under)`)
      if (kind === 'step') { const a2 = bp(sfx, 1500, 4000), m2 = bp(music, 1500, 4000); const d2 = cs.map(s => rms(a2, s.t, s.t + 0.05) - rms(m2, s.t, s.t + 0.05)).sort((x, y) => x - y); f.push(`step tap band 1.5-4k med ${d2[Math.floor(d2.length / 2)].toFixed(1)} dB (${d2.filter(x => x < 0).length}/${d2.length} under)`) }
    }
    out.foley = f.join('; ')
  }
  // ---- should: flams (the critic's threshold 0.35 and footsteps, plus clock-train ticks)
  {
    const body = sc.sfx.filter(s => ['thud', 'hit', 'cash', 'reveal', 'step'].includes(s.kind) && (s.cueGain ?? s.gain) >= 0.35)
    const ticks = sc.sfx.filter(s => s.train != null && (s.kind === 'tick' || s.kind === 'thud'))
    const anchors = [0, P, V, base].filter(x => x != null)
    const dr = sc.drums.filter(d => /^(kick|snare|clap|tom)$/.test(d.inst) && d.role !== 'logo' && !anchors.some(a => Math.abs(a - d.t) <= 0.001))
    const fl = []
    for (const d of dr) for (const s of [...body, ...ticks]) { const x = Math.abs(d.t - s.t); if (x > 0.015 + 1e-6 && x < 0.07 - 1e-6) fl.push(`${d.inst}@${d.t}~${s.kind}@${s.t}`) }
    out.flams = fl.length ? `${fl.length}: ${fl.slice(0, 4).join(', ')}` : 'none'
  }
  // ---- should: the deflate's bending bass (flagged strain) and the Gm span
  {
    const gm = (sc.harmony || []).filter(h => h.sym === 'Gm')
    const strain = sc.notes.filter(n => n.inst === 'bass' && n.chromatic === 'strain')
    out.deflate = gm.length ? gm.map(h => `Gm ${h.t0.toFixed(3)}-${h.t1.toFixed(3)}`).join(', ') + `; bass bends: ${strain.map(n => `${n.midi}@${n.t}/${n.dur}s`).join(', ') || 'none'}` : 'no buzz'
  }
  all.push(out)
  console.log(`${id}\n  must1 ${out.must1 ? 'PASS' : 'FAIL'}: mallet ${out.buildLU.mallet} LU re band in BUILD (bass ${out.buildLU.bass}, pad ${out.buildLU.pad}, pizz ${out.buildLU.pizz}, snare ${out.buildLU.snare}, kick ${out.buildLU.kick}); 500-1200 Hz: ${out.loud500_1200}; glock notes before P ${out.glockBeforeP}`)
  console.log(`  must2: ${out.react}${out.dingV ? '; ' + out.dingV : ''}; ${out.duckP}`)
  console.log(`  ducks: ${out.duck}; per kind ${out.duckByKind}`)
  console.log(`  returns ${out.returns} LU re mix; flams ${out.flams}`)
  console.log(`  foley: ${out.foley || 'none'}`)
  console.log(`  deflate: ${out.deflate}`)
}
console.log(`\nmust1 ${all.filter(x => x.must1).length}/${all.length}; mallet BUILD LU ${Math.min(...all.map(x => x.buildLU.mallet)).toFixed(1)}..${Math.max(...all.map(x => x.buildLU.mallet)).toFixed(1)}; returns ${Math.min(...all.map(x => x.returns))}..${Math.max(...all.map(x => x.returns))} LU; flams ${all.filter(x => x.flams !== 'none').length} specs`)
