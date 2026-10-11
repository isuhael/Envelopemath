// Sound engine tests (sound bible §10.7): tempo-map vectors, timeline, logo, DSP units, loudness, determinism, remux.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import * as D from '../src/sound/dsp.mjs'
import * as T from '../src/sound/theory.mjs'
import * as K from '../src/sound/kit.mjs'
import { loudness, truePeakDb, truePeak } from '../src/sound/loudness.mjs'
import { limitTruePeak, fdnReverb, duckCurve } from '../src/sound/fx.mjs'
import { buildTimeline, logoMotif } from '../src/sound/timeline.mjs'
import { renderSound, renderMix, loadPack, KINDS } from '../src/sound/engine.mjs'
import { readWav } from '../src/sound/wav.mjs'
import { muxVerified } from '../src/sound/batch.mjs'
import { checkScore } from '../src/sound/scorecheck.mjs'

const here = path.dirname(new URL(import.meta.url).pathname)
const CUES = JSON.parse(fs.readFileSync(path.join(here, 'fixtures/cues.json'), 'utf8'))
const rec = id => Object.values(CUES).find(r => r.id.startsWith(id + '-'))
const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'sound-test-'))

// bible §2.3 reference table: id, P rule, P, N1, BPM1, later segments [to, end, beats, bpm], L
const VECTORS = [
  ['01a', 'riser', 14.5, 36, 148.966, [['V', 20.5, 15, 150.00], ['base', 24.5, 10, 150.00]], 24.86],
  ['01b', 'riser', 12.45, 24, 115.663, [['V', 19.3, 13, 113.87], ['base', 24.0, 9, 114.89]], 24.50],
  ['01c', 'riser', 15.9, 32, 120.755, [['V', 20.4, 9, 120.00], ['base', 25.3, 10, 122.45]], 25.80],
  ['02a', 'verdict+hit', 10.7, 20, 112.150, [['base', 13.4, 5, 111.11]], 13.90],
  ['02b', 'verdict', 10.7, 26, 145.794, [['base', 14.0, 8, 145.45]], 14.36],
  ['02c', 'verdict', 10.0, 24, 144.000, [['base', 13.0, 7, 140.00]], 13.36],
  ['03a', 'verdict+hit', 31.0, 62, 120.000, [['base', 37.2, 12, 116.13]], 37.70],
  ['03b', 'verdict', 25.8, 62, 144.186, [['base', 30.6, 12, 150.00]], 30.96],
  ['03c', 'verdict', 22.0, 52, 141.818, [['base', 29.8, 18, 138.46]], 30.16],
  ['04a', 'riser', 36.4, 86, 141.758, [['V', 42.5, 14, 137.70], ['base', 45.5, 7, 140.00]], 45.86],
  ['04b', 'hit+cash', 24.3, 48, 118.519, [['base', 36.0, 24, 123.08]], 36.50],
  ['04c', 'riser', 24.79, 60, 145.220, [['V', 33.5, 21, 144.66], ['base', 36.5, 7, 140.00]], 36.86],
  ['05a', 'verdict+hit', 21.2, 40, 113.208, [['base', 24.7, 7, 120.00]], 25.20],
  ['05b', 'hit+cash', 18.2, 36, 118.681, [['base', 22.1, 8, 123.08]], 22.60],
  ['05c', 'hit+cash', 9.13, 22, 144.578, [['V', 17.0, 19, 144.85], ['base', 22.8, 14, 144.83]], 23.16],
  ['06a', 'riser', 21.4, 52, 145.794, [['base', 26.5, 12, 141.18]], 26.86],
  ['06b', 'riser', 23.0, 56, 146.087, [['V', 26.0, 7, 140.00], ['base', 30.5, 11, 146.67]], 30.86],
  ['06c', 'riser', 20.4, 40, 117.647, [['base', 28.0, 15, 118.42]], 28.50],
  ['07a', 'riser', 12.0, 30, 150.000, [['V', 18.1, 16, 157.38], ['base', 22.8, 12, 153.19]], 23.16],
  ['07b', 'hit+cash', 16.9, 34, 120.710, [['base', 27.4, 21, 120.00]], 27.90],
  ['07c', 'hit+cash', 12.9, 26, 120.930, [['base', 19.1, 12, 116.13]], 19.60],
  ['08a', 'riser', 14.77, 36, 146.242, [['V', 18.4, 9, 148.76], ['base', 22.0, 9, 150.00]], 22.36],
  ['08b', 'verdict', 21.8, 44, 121.101, [['base', 27.0, 10, 115.38]], 27.50],
  ['08c', 'verdict+hit', 17.35, 36, 124.496, [['base', 22.0, 10, 129.03]], 22.50],
  ['09a', 'riser', 19.4, 40, 123.711, [['V', 24.2, 10, 125.00], ['base', 28.5, 9, 125.58]], 29.00],
  ['09b', 'riser', 17.8, 36, 121.348, [['base', 27.0, 18, 117.39]], 27.50],
  ['09c', 'riser', 19.12, 46, 144.351, [['V', 25.6, 16, 148.15], ['base', 31.5, 14, 142.37]], 31.86],
  ['10a', 'riser', 32.511, 80, 147.642, [['base', 36.5, 10, 150.41]], 36.86],
  ['10b', 'riser', 33.3, 68, 122.523, [['base', 36.6, 7, 127.27]], 37.10],
  ['10c', 'riser', 26.403, 66, 149.983, [['base', 31.0, 12, 156.62]], 31.36],
]

test('tempo map: the bible §2.3 table (30 specs) is reproduced', () => {
  for (const [id, rule, P, n1, bpm1, later, L] of VECTORS) {
    const tl = buildTimeline(rec(id), null, { overrides: {} })
    assert.equal(tl.anchors.P.t, P, `${id} P`)
    assert.equal(tl.anchors.P.rule, rule, `${id} rule`)
    assert.equal(tl.tempo[0].n, n1, `${id} N1`)
    assert.ok(Math.abs(tl.tempo[0].bpm - bpm1) < 0.01, `${id} BPM1 ${tl.tempo[0].bpm}`)
    const segs = tl.tempo.slice(1)
    assert.equal(segs.length, later.length, `${id} segments`)
    later.forEach(([to, b, n, bpm], j) => {
      assert.equal(segs[j].to, to, `${id} seg ${j} anchor`)
      assert.ok(Math.abs(segs[j].b - b) < 1e-9 && segs[j].n === n && Math.abs(segs[j].bpm - bpm) < 0.01, `${id} seg ${j}: ${segs[j].n} @ ${segs[j].bpm}`)
    })
    assert.ok(Math.abs(tl.card.L - L) < 0.006, `${id} L ${tl.card.L}`)
    // every anchor lands on a bar line; P is a downbeat
    assert.ok(tl.bars.some(b => Math.abs(b.t - P) < 1e-9), `${id} bar at P`)
    assert.ok(Math.abs(tl.timeAt(tl.beatAt(P)) - P) < 1e-9)
  }
})

test('timeline: Appendix A sections and energy (09c, 09b), cue prep, trains, clusters', () => {
  const a = buildTimeline(rec('09c'), null, { overrides: {} })
  assert.deepEqual(a.sections.map(s => [s.name, s.b0, s.b1]), [['HOOK', 0, 6], ['BUILD', 6, 40], ['TENSION', 40, 46], ['DROP', 46, 54], ['HOLD', 54, 62], ['VERDICT', 62, 66], ['HOLD2', 66, 70], ['CADENCE', 70, 76], ['CARD', 76, a.sections.at(-1).b1]])
  assert.equal(a.bars.map(b => b.energy).join(''), '43333344444455334333')
  assert.ok(a.bars[0].pickup && a.bars[0].beats === 2)
  assert.deepEqual(a.bars[10].split, [{ beat: 2, section: 'TENSION' }])
  assert.equal(a.cues[0].t, 0); assert.equal(a.cues[0].tCue, -0.05); assert.equal(a.cues[0].kind, 'ding')
  const b = buildTimeline(rec('09b'), null, { overrides: {} })
  assert.equal(b.bars.map(x => x.energy).join(''), '43334444455333')
  assert.equal(b.anchors.V, null)   // pick(V, base) would need +5.2%
  const train = (id, kind) => buildTimeline(rec(id), null, { overrides: {} }).trains.find(t => t.kind === kind)
  assert.ok(Math.abs(train('10a', 'tick').period - 1.0) < 0.002)
  assert.ok(Math.abs(train('10b', 'tick').period - 0.832) < 0.002)
  assert.ok(Math.abs(train('02a', 'thud').period - 0.5) < 0.002)
  assert.ok(Math.abs(train('09b', 'thud').period - 2.0) < 0.002)
  // every cue has n (per kind) and i (global)
  for (const c of a.cues) assert.ok(Number.isInteger(c.i) && Number.isInteger(c.n))
  // overrides: a forced payoff wins (score 7) and the verdict anchor can be disabled
  const o = buildTimeline(rec('09c'), null, { overrides: { [rec('09c').id]: { payoff: 16.6, verdictAnchor: false } } })
  assert.equal(o.anchors.P.t, 16.6); assert.equal(o.anchors.P.rule, 'override'); assert.equal(o.anchors.V, null)
})

test('logo: the em sting lands at L in both looks (and on short cards)', () => {
  for (const id of ['09c', '09b']) {
    const tl = buildTimeline(rec(id), null, { overrides: {} })
    const m = tl.logoMotif()
    assert.deepEqual(m.notes.map(n => n.midi), [69, 74, 76, 81])
    m.notes.forEach((n, k) => assert.ok(Math.abs(n.t - (tl.card.L - 0.3 + 0.1 * k)) < 1e-9))
    assert.deepEqual(m.ding, [90, 93])
  }
  const short = logoMotif({ L: 10.2, t0: 10.0 })
  assert.ok(Math.abs(short.notes[0].t - 10.0) < 1e-9 && Math.abs(short.notes[1].t - 10.0667) < 1e-3)
})

test('dsp: band-limited oscillators, envelopes, filters, theory', () => {
  // a 2x-oversampled saw at A6: every spectral peak off the harmonic series is <= -50 dB re the fundamental (bible U1)
  const f0 = D.mtof(93), n = 32768
  const x = D.osc('saw', n + 4800, f0, { os: 2 }).subarray(4800)
  const tri = D.osc('tri', n + 4800, f0).subarray(4800)
  for (const sig of [x, tri]) {
    const re = new Float64Array(n), im = new Float64Array(n)
    for (let i = 0; i < n; i++) re[i] = sig[i] * (0.5 - 0.5 * Math.cos(2 * Math.PI * i / n))
    // plain DFT on the peaks only would be slow; use a radix-2 FFT
    fftInPlace(re, im)
    const mag = k => Math.hypot(re[k], im[k])
    const k0 = Math.round(f0 * n / D.SR)
    let fund = 0
    for (let k = k0 - 3; k <= k0 + 3; k++) fund = Math.max(fund, mag(k))
    let worst = -Infinity
    for (let k = 20; k < n / 2 - 1; k++) {
      const m = mag(k)
      if (!(m > mag(k - 1) && m >= mag(k + 1))) continue
      const h = (k * D.SR / n) / f0
      if (Math.abs(h - Math.round(h)) <= 0.01 * Math.max(1, Math.round(h)) + 0.02) continue
      worst = Math.max(worst, 20 * Math.log10(m / fund))
    }
    assert.ok(worst <= -50, `alias peak ${worst.toFixed(1)} dB`)
  }
  // ADSR: starts at 0, ends exactly at 0 (no click)
  const e = D.adsr(D.sec(1), { a: 0.005, d: 0.1, s: 0.5, r: 0.2, gate: 0.5 })
  assert.equal(e[0], 0); assert.ok(e[D.sec(0.7) - 2] < 1e-3); assert.ok(Math.abs(e[D.sec(0.3)] - 0.5) < 0.01)
  // SVF low-pass: -3 dB at the cutoff for Q 0.7071
  const s = D.osc('sine', D.SR, 1000)
  D.svf(s, 'lp', 1000)
  assert.ok(Math.abs(20 * Math.log10(D.rmsOf(s, 4800) * Math.SQRT2) + 3.01) < 0.1)
  // Karplus-Strong tuning: the fundamental is within 5 cents of A4
  const ks = K.pluck(D.rngFor('t', 'ks'), 69, 0.6)
  const ac = L => { let s = 0; for (let i = 4800; i < 9600; i++) s += ks[i] * ks[i + L]; return s }
  let lag = 20
  for (let L = 20; L < 400; L++) if (ac(L) > ac(lag)) lag = L
  const y0 = ac(lag - 1), y1 = ac(lag), y2 = ac(lag + 1), hz = D.SR / (lag + 0.5 * (y0 - y2) / (y0 - 2 * y1 + y2))
  assert.ok(Math.abs(1200 * Math.log2(hz / 440)) < 2, `KS ${hz} Hz`)
  // theory
  assert.deepEqual(T.chord('Dm(add9)').tones, [2, 5, 9, 4])
  assert.equal(T.chord('Bb/D').bass, 2)
  assert.deepEqual(T.voicing('Dm', { n: 4, lo: 57, hi: 76 }).map(m => m % 12).sort(), [2, 2, 5, 9].sort())
  // seeded streams: same name, same numbers; different names differ
  assert.equal(D.rngFor('a', 'arr')(), D.rngFor('a', 'arr')())
  assert.notEqual(D.rngFor('a', 'arr')(), D.rngFor('a', 'hum')())
  assert.equal(D.fnv1a32('a'), 0xe40c292c)
})

test('meters and dynamics: BS.1770 loudness, true peak, limiter, duck, reverb', () => {
  const n = D.SR * 6, s = D.stereo(n)
  for (let i = 0; i < n; i++) { const v = 0.1 * Math.sin(2 * Math.PI * 997 * i / D.SR); s.L[i] = v; s.R[i] = v }
  assert.ok(Math.abs(loudness(s).integrated + 20) < 0.05)
  // a sine at fs/4 sampled at ±45°: sample peak 0.707, true peak 1.0
  const q = new Float32Array(D.SR)
  for (let i = 0; i < q.length; i++) q[i] = Math.sin(2 * Math.PI * 12000 * i / D.SR + Math.PI / 4)
  assert.ok(Math.abs(truePeakDb(q)) < 0.15)
  // the limiter holds the true-peak ceiling
  const r = D.rngFor('t', 'lim'), big = D.stereo(D.SR * 2)
  for (let i = 0; i < big.L.length; i++) { big.L[i] = r.bi() * (i % 9600 < 200 ? 2 : 0.3); big.R[i] = big.L[i] }
  const lim = limitTruePeak(big, { ceiling: -1.5 })
  assert.ok(truePeakDb(lim.out) <= -1.45, `TP ${truePeakDb(lim.out)}`)
  // duck: deepest wins, -D at t, held, then recovering
  const dk = duckCurve(D.SR, [{ t: 0.2, depth: 9, hold: 0.15, release: 0.45 }, { t: 0.25, depth: 3, hold: 0.05, release: 0.1 }])
  assert.ok(Math.abs(dk[D.sec(0.2)] + 9) < 1e-3 && Math.abs(dk[D.sec(0.3)] + 9) < 1e-3 && dk[D.sec(0.195) - 1] > -9 && dk[D.sec(0.9)] > -3)
  // reverb: finite, decays (energy in the last 100 ms of a 3 s render far below the first)
  const imp = D.stereo(D.SR * 3); imp.L[100] = imp.R[100] = 1
  const ir = fdnReverb(imp, 'HALL', { tail: 0 })
  for (const v of ir.L) assert.ok(Number.isFinite(v))
  assert.ok(D.rmsOf(ir.L, D.sec(2.9)) < D.rmsOf(ir.L, D.sec(0.03), D.sec(0.3)) * 0.05)
})

// a short synthetic Scoreboard teaser: riser -> hit + cash payoff, a verdict, the kit card's cues
const SYN = {
  id: 't-sound', look: 'scoreboard', format: 'test', fps: 30, duration: 10.5, base: 8,
  brand: { logo: true, card: 'kit', t0: 8, dur: 2.5 },
  sfx: [
    { t: -0.05, kind: 'ding', gain: 0.5 }, { t: 1.5, kind: 'thud', gain: 0.8 }, { t: 2.0, kind: 'roll', dur: 0.8, gain: 0.5 },
    { t: 2.9, kind: 'ding', gain: 0.6 }, { t: 3.4, kind: 'pop', gain: 0.5 }, { t: 3.6, kind: 'tick', gain: 0.5 }, { t: 3.6, kind: 'swipe', dur: 0.2, gain: 0.5 },
    { t: 4.0, kind: 'riser', dur: 1.6, gain: 0.7 }, { t: 5.6, kind: 'hit', gain: 1 }, { t: 5.7, kind: 'cash', gain: 0.8 },
    { t: 6.5, kind: 'reveal', gain: 0.7 }, { t: 7.0, kind: 'whoosh', dur: 0.3, gain: 0.5 }, { t: 7.2, kind: 'buzz', gain: 0.5 },
    { t: 7.4, kind: 'boing', gain: 0.5 }, { t: 7.5, kind: 'step', gain: 0.5 }, { t: 7.6, kind: 'type', dur: 0.3, gain: 0.5 },
    { t: 8.06, kind: 'pop', gain: 0.5 }, { t: 8.46, kind: 'thud', gain: 0.65 }, { t: 8.94, kind: 'roll', dur: 0.5, gain: 0.4 }, { t: 9.44, kind: 'ding', gain: 0.5 },
  ],
  vo: [], verdict: { t: 6.5, text: 'x' }, beats: [],
}

test('engine: a synthetic teaser masters to -14 LUFS, stereo, bounded, clean edges, deterministic', async () => {
  const d1 = tmp(), d2 = tmp()
  try {
    const opts = { encode: false, ffmpegCheck: false, overrides: {} }
    const a = await renderSound(SYN, { ...opts, outDir: d1 })
    const b = await renderSound(SYN, { ...opts, outDir: d2 })
    assert.equal(a.report.wavSha256, b.report.wavSha256, 'same record -> byte-identical master WAV')
    const c = await renderSound({ ...SYN, id: 't-sound-2' }, { ...opts, outDir: d2 })
    assert.notEqual(a.report.wavSha256, c.report.wavSha256, 'a different spec id (seeds) -> a different master')
    assert.ok(Math.abs(a.report.loudness.integrated + 14) <= 0.3, `I ${a.report.loudness.integrated}`)
    assert.ok(a.report.loudness.truePeak <= -1.45)
    const w = readWav(a.wav)
    assert.equal(w.rate, 48000)
    assert.equal(w.L.length, Math.round(SYN.duration * 48000))
    let diff = 0
    for (let i = 0; i < w.L.length; i++) { assert.ok(Number.isFinite(w.L[i]) && Number.isFinite(w.R[i]) && Math.abs(w.L[i]) <= 1 && Math.abs(w.R[i]) <= 1); diff += Math.abs(w.L[i] - w.R[i]) }
    assert.ok(diff > 1, 'a stereo master, not dual mono')
    assert.equal(w.L[w.L.length - 1], 0); assert.equal(w.R[w.R.length - 1], 0)
    // every cue starts at its cue time (bible B4; the reveal has a 180 ms pre-roll)
    for (const s of a.report.cueStart) if (!s.preroll) assert.ok(Math.abs(s.errMs) <= 2, `${s.kind} @ ${s.t}: ${s.errMs} ms`)
    // the score: logo at L, anchors, frame 1, payoff duck
    const sc = JSON.parse(fs.readFileSync(a.files.score, 'utf8'))
    const res = Object.fromEntries(checkScore(sc).checks.map(x => [x.id, x]))
    for (const id of ['S6', 'S7', 'S10', 'B2', 'B10']) assert.ok(res[id].pass, `${id}: ${res[id].detail}`)
    assert.equal(sc.anchors.P.t, 5.6)
    assert.ok(sc.duck.db.length === Math.floor(SYN.duration * 100))
  } finally { fs.rmSync(d1, { recursive: true, force: true }); fs.rmSync(d2, { recursive: true, force: true }) }
})

test('default pack: all 15 kinds render finite, within their level, and vary between occurrences', async () => {
  const pack = await loadPack('no-such-look')
  assert.equal(pack.name, 'default')
  for (const k of KINDS) assert.equal(typeof pack.sfx[k], 'function', k)
  const recK = { ...SYN, id: 't-kinds', sfx: KINDS.flatMap((kind, j) => [{ t: 0.5 + j * 0.45, kind, gain: 1 }, { t: 0.5 + j * 0.45 + 0.2, kind, gain: 1 }].map(c => (['roll', 'riser', 'type', 'whoosh', 'swipe'].includes(kind) ? { ...c, dur: 0.15 } : c))), duration: 12, base: 9.5, brand: null, verdict: null }
  const mix = renderMix(recK, pack, { overrides: {} })
  const LEVEL = { tick: -14, type: -18, pop: -12, ding: -10, reveal: -6, thud: -6, whoosh: -14, riser: -8, roll: -16, cash: -9, buzz: -12, boing: -12, step: -14, hit: -3, swipe: -16 }
  for (const c of mix.tl.cues) {
    const r = mix.rendered[c.i]
    assert.ok(r, `${c.kind} rendered`)
    for (const v of r.buf.L) assert.ok(Number.isFinite(v))
    assert.ok(20 * Math.log10(D.peakOf(r.buf)) <= LEVEL[c.kind] + 1, `${c.kind} level`)
  }
  // consecutive same-kind cues differ (bible U4: normalised cross-correlation < 0.98)
  for (const k of ['tick', 'pop', 'thud', 'hit', 'swipe', 'whoosh', 'cash']) {
    const [x, y] = mix.tl.cues.filter(c => c.kind === k).map(c => mix.rendered[c.i].buf.L)
    const n = Math.min(x.length, y.length)
    let xy = 0, xx = 0, yy = 0
    for (let i = 0; i < n; i++) { xy += x[i] * y[i]; xx += x[i] * x[i]; yy += y[i] * y[i] }
    assert.ok(xy / Math.sqrt(xx * yy) < 0.98, `${k} variation`)
  }
})

test('remux: new audio on an existing MP4, the video stream bit-identical, durations within a frame', async () => {
  const d = tmp()
  try {
    const src = path.join(d, 'src.mp4')
    execFileSync('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'lavfi', '-i', 'testsrc=size=270x480:rate=30:duration=10.5', '-f', 'lavfi', '-i', 'sine=f=220:d=10.5', '-c:v', 'libx264', '-preset', 'ultrafast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ac', '1', '-shortest', src])
    const r = await renderSound(SYN, { outDir: d, ffmpegCheck: false, overrides: {} })
    assert.ok(r.report.loudness.postEncode.truePeak <= -1.0, `AAC TP ${r.report.loudness.postEncode.truePeak}`)
    const m = muxVerified(src, r.m4a, path.join(d, 'out.mp4'), { duration: SYN.duration, fps: 30 })
    assert.ok(m.same, 'video stream md5 unchanged')
    assert.equal(m.audio.codec, 'aac'); assert.equal(m.audio.channels, 2); assert.equal(m.audio.rate, 48000)
    assert.ok(Math.abs(m.audio.duration - m.video.duration) <= 1 / 30, `audio ${m.audio.duration} / video ${m.video.duration}`)
    assert.ok(m.audio.kbps >= 172 && m.audio.kbps <= 212, `${m.audio.kbps} kb/s`)
    assert.ok(m.ok)
  } finally { fs.rmSync(d, { recursive: true, force: true }) }
})

function fftInPlace(re, im) {
  const n = re.length
  for (let i = 1, j = 0; i < n; i++) { let bit = n >> 1; for (; j & bit; bit >>= 1) j ^= bit; j ^= bit; if (i < j) { [re[i], re[j]] = [re[j], re[i]]; [im[i], im[j]] = [im[j], im[i]] } }
  for (let len = 2; len <= n; len <<= 1) {
    const ang = -2 * Math.PI / len
    for (let i = 0; i < n; i += len) for (let k = 0; k < len / 2; k++) {
      const wr = Math.cos(ang * k), wi = Math.sin(ang * k), a = i + k, b = a + len / 2
      const tr = re[b] * wr - im[b] * wi, ti = re[b] * wi + im[b] * wr
      re[b] = re[a] - tr; im[b] = im[a] - ti; re[a] += tr; im[a] += ti
    }
  }
}
