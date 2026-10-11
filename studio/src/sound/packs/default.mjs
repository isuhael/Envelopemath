// The default sound pack: what every look gets until its own pack exists (studio/sound/packs/<look>.mjs).
//   sfx    a stereo, chord-aware port of the legacy SYNTH (src/audio.mjs): all 15 kinds, levels from the bible's §5
//          table, the merge-rule flags honoured (dropBody, dropTransient, claim)
//   music  a minimal neutral bed that follows the timeline: pad, sub bass, soft kick/hats/clap, a pluck arp in sparse
//          beats, stabs and crashes on the anchors, the pre-payoff gap, the dominant cadence, and the em sting at L
// It doubles as the reference implementation of the pack contract (studio/sound/README.md): copy it to start a pack.
import * as K from '../kit.mjs'
import * as T from '../theory.mjs'
import { SR, sec, stereo, mono, dbToGain, panMono, scale, svf, onePoleHP, onePoleLP, dcBlock, osc, noise, expEnv, saturate, glideSt, clamp, mtof, peakOf } from '../dsp.mjs'

export const name = 'default'
export const look = '*'
// key, tempo, tensionBeats and card come from the look's defaults (timeline.mjs LOOK_DEFAULTS) when a pack omits them

// ---------------------------------------------------------------- harmony
const MINOR = {
  tonic: 'Dm', progs: [['Dm', 'Bb', 'F', 'C'], ['Dm', 'C', 'Bb', 'Bb'], ['Dm', 'F', 'C', 'Bb']], tension: ['Bb', 'C', 'A'],
  drop: ['Dm', 'Bb'], hold: ['Dm(add9)', 'Bbmaj7', 'Gm7', 'A7sus4'], verdict: 'Dm(add9)', cad: 'Gm7',
}
const MAJOR = {
  tonic: 'D', progs: [['D', 'G', 'Bm', 'A'], ['D', 'Bm', 'G', 'A']], tension: ['G', 'A', 'A7'],
  drop: ['D', 'G'], hold: ['G', 'F#m', 'Bm', 'A'], verdict: 'D', cad: 'Em7',
}
const H = tl => (tl.key.mode === 'minor' ? MINOR : MAJOR)

export function harmony(tl, rng) {
  const h = H(tl), plan = []
  const at = (beat, sym) => plan.push({ beat, sym })
  const barsIn = s => tl.bars.filter(b => b.beat >= s.b0 - 1e-9 && b.beat < s.b1 - 1e-9)
  let lastProgs = []
  for (const s of tl.sections) {
    const bars = barsIn(s)
    switch (s.name) {
      case 'HOOK': at(s.b0, h.tonic); break
      case 'BUILD': {
        for (const ph of tl.phrases) {
          let k = ph.i === 0 ? 0 : rng.int(h.progs.length)
          // never the same progression 3 phrases in a row
          if (lastProgs.length >= 2 && lastProgs[lastProgs.length - 1] === k && lastProgs[lastProgs.length - 2] === k) k = (k + 1) % h.progs.length
          lastProgs.push(k)
          ph.bars.forEach((bi, j) => at(tl.bars[bi].beat, h.progs[k][j % 4]))
        }
        if (!tl.phrases.length) at(s.b0, h.tonic)
        break
      }
      case 'TENSION': {
        const Tn = s.b1 - s.b0, q = Math.ceil(Tn / 4), first = Tn - 2 * q
        if (first > 1e-9) at(s.b0, h.tension[0])
        at(s.b1 - 2 * q, first > 1e-9 ? h.tension[1] : h.tension[1])
        at(s.b1 - q, h.tension[2])
        break
      }
      case 'DROP': bars.forEach((b, j) => at(Math.max(b.beat, s.b0), h.drop[j % h.drop.length])); if (!bars.length) at(s.b0, h.tonic); break
      case 'HOLD': case 'HOLD2': {
        const endAligned = s.name === 'HOLD' && tl.anchors.V
        bars.forEach((b, j) => {
          const idx = s.name === 'HOLD2' ? (1 + j) : endAligned ? (h.hold.length - bars.length + j) : j
          at(Math.max(b.beat, s.b0), h.hold[((idx % h.hold.length) + h.hold.length) % h.hold.length])
        })
        break
      }
      case 'BREAK': at(s.b0, 'A7'); break
      case 'VERDICT': at(s.b0, h.verdict); break
      case 'CADENCE': {
        const Tn = s.b1 - s.b0
        if (Tn > 4 + 1e-9) at(s.b0, h.cad)
        if (Tn > 2 + 1e-9) at(Math.max(s.b0, s.b1 - 4), 'A7sus4')
        at(Math.max(s.b0, s.b1 - 2), 'A7')
        break
      }
      default: break
    }
  }
  return plan
}

// ---------------------------------------------------------------- composition: a minimal neutral bed
export function compose(tl, rng) {
  const hum = tl.stream('hum')
  const notes = [], drums = []
  const P = tl.anchors.P.t, Pb = tl.anchors.P.beat, base = tl.base
  const gapT = tl.timeAt(Pb - 0.5)             // §4.5 the gap: one eighth of silence before P
  const inGap = t => t >= gapT - 1e-6 && t < P - 1e-6
  const V = tl.anchors.V ? tl.anchors.V.t : null
  const drum = (t, inst, vel, extra = {}) => {
    if (t >= base - 1e-6 || inGap(t)) return
    if (/kick|clap|snare/.test(inst)) { const y = tl.drumYield(t); if (y.action === 'drop') return }
    drums.push({ t, inst, vel: clamp(vel, 0.05, 1), ...extra })
  }
  // pad + bass follow the harmony (pad register per the bible: Scoreboard 57-76, Becker Rig 55-74)
  const [padLo, padHi] = tl.look === 'scoreboard' ? [57, 76] : [55, 74]
  let prev = null
  tl.harmony.forEach((h, j) => {
    let t0 = h.t0, t1 = Math.min(h.t1, base)
    if (t0 < P && t1 > gapT) t1 = gapT
    if (t1 - t0 < 0.06) return
    const bar = tl.barAt(t0 + 1e-6), E = bar ? bar.energy : 3
    const v = T.voicing(h.sym, { n: 4, lo: padLo, hi: padHi, prev })
    prev = v
    for (const m of v) notes.push({ t: t0, dur: t1 - t0, midi: m, vel: clamp(0.42 + 0.06 * E + hum.gauss() * 0.03, 0.2, 0.9), inst: 'pad', role: 'pad' })
    // bass: the chord's bass on each bar line inside the span (and at the span start)
    const starts = [t0, ...tl.bars.filter(b => b.t > t0 + 1e-6 && b.t < t1 - 1e-6).map(b => b.t)]
    starts.forEach((s, k) => {
      const e = k + 1 < starts.length ? starts[k + 1] : t1
      const m = T.placePc(h.bass, 38)
      const big = Math.abs(s) < 1e-6 || Math.abs(s - P) < 1e-6
      notes.push({ t: s, dur: Math.max(0.05, e - s - 0.02), midi: m > 49 ? m - 12 : m, vel: big ? 1 : clamp(0.8 + hum.gauss() * 0.04, 0.6, 0.95), inst: 'bass', role: 'bass', ...(big ? { dive: 12 } : {}) })
    })
  })
  // drums per bar and energy
  for (const b of tl.bars) {
    if (b.t >= base - 1e-6) continue
    const E = b.energy, sec_ = b.section
    if (sec_ === 'BREAK' || sec_ === 'TENSION') continue
    for (let k = 0; k < Math.round(b.beats); k++) {
      const t = tl.timeAt(b.beat + k)
      const kickHere = E >= 5 ? true : E >= 4 ? k % 2 === 0 : k === 0
      if (kickHere) drum(t, 'kick', k === 0 ? 0.95 : 0.8 + hum.gauss() * 0.03)
      if (E >= 4 && k === 2) drum(t, 'clap', 0.8 + hum.gauss() * 0.04)
      // hats: off-beat 8ths at E3, every 8th from E4; muted under rolls and clock trains
      for (const half of E >= 4 ? [0, 0.5] : [0.5]) {
        const th = Math.max(0, tl.timeAt(b.beat + k + half) + hum.gauss() * 0.0025)
        if (tl.rollAt(th) || tl.trainAt(th)) continue
        drum(th, 'hat', (half ? 0.55 : 0.8) + hum.gauss() * 0.05, { pan: half ? 0.2 : -0.1 })
      }
    }
    // a pluck arp in sparse beats (E >= 3, BUILD and HOLD)
    if (E >= 3 && /BUILD|HOLD/.test(sec_)) {
      const beats = tl.beats.filter(x => x.i >= b.beat && x.i < b.beat + b.beats && x.sparse)
      for (const x of beats) {
        const ch = tl.chordAt(x.t + 1e-6)
        const tones = T.tonesIn(ch, 62, 81)
        for (let e8 = 0; e8 < 2; e8++) {
          const t = tl.timeAt(x.i + e8 / 2)
          if (inGap(t)) continue
          const m = tones[(x.i * 2 + e8) % tones.length]
          notes.push({ t, dur: tl.beatLen(t) * 0.45, midi: m, vel: clamp((e8 ? 0.55 : 0.72) + hum.gauss() * 0.04, 0.3, 0.9), inst: 'pluck', role: 'arp', pan: e8 ? 0.3 : -0.3 })
        }
      }
    }
  }
  // anchors: the hook at t = 0, the drop at P, the verdict at V
  const hit = (t, sym, vel) => {
    for (const m of T.voicing(sym, { n: 4, lo: 57, hi: 76 })) notes.push({ t, dur: 0.18, midi: m, vel, inst: 'stab', role: 'stab' })
    drums.push({ t, inst: 'kick', vel: 1 })
    drums.push({ t, inst: 'crash', vel: vel * 0.8 })
  }
  hit(0, tl.chordAt(0).sym, 1)
  hit(P, tl.chordAt(P + 1e-6).sym, 1)
  drums.push({ t: P, inst: 'revcrash', vel: 0.5 })
  if (V != null) { hit(V, tl.chordAt(V + 1e-6).sym, 0.75); drums.push({ t: V, inst: 'revcrash', vel: 0.35 }) }
  // de-duplicate kicks placed twice at an anchor
  const seen = new Set()
  const dd = drums.filter(d => { const k = `${d.inst}@${Math.round(d.t * 1000)}`; if (seen.has(k)) return false; seen.add(k); return true })
  return { notes, drums: dd, automation: {} }
}

// ---------------------------------------------------------------- the em sting (§3.1), neutral orchestration
export function logo(tl, ctx) {
  const m = ctx.motif
  if (!m) return { notes: [], drums: [] }
  const notes = [], drums = []
  for (const n of m.notes) {
    if (n.n < 4) notes.push({ t: n.t, dur: n.gate, midi: n.midi, vel: n.vel, pan: n.pan, inst: 'logoPluck', role: 'logo' })
    else notes.push({ t: n.t, dur: n.gate, midi: n.midi, vel: n.vel, pan: n.pan, inst: 'logoBell', role: 'logo' })
  }
  for (const e of m.echoes) notes.push({ t: e.t, dur: 0.6, midi: 81, vel: dbToGain(e.db), inst: 'logoBell', role: 'logo', lp: e.lp })
  const end = tl.duration
  for (const v of m.chord.voicing.slice(1)) notes.push({ t: m.L, dur: Math.max(0.2, end - m.L), midi: v, vel: 0.6, inst: 'logoPad', role: 'logo' })
  notes.push({ t: m.L, dur: 1.0, midi: m.chord.voicing[0], vel: 0.9, inst: 'logoSub', role: 'logo' })
  drums.push({ t: m.L, inst: 'revcrash', vel: dbToGain(m.swell.db) })
  drums.push({ t: m.L, inst: 'crash', vel: 0.35 })
  return { notes, drums }
}

// ---------------------------------------------------------------- instruments (ev, ctx) -> buffer
export const instruments = {
  pad: (ev, c) => K.padVoice(c.rng, ev.midi, ev.dur, { vel: ev.vel, voices: 4, detune: 10, spread: 0.8, lp: 2000, hp: 180, a: 0.12, d: 0.3, s: 1, r: 0.25 }),
  bass(ev) {
    // a round, plucky sub: sine + a little triangle (2nd-5th harmonics carry on phones), decays to a low sustain
    const n = sec(ev.dur + 0.06), f = mtof(ev.midi)
    const x = osc('sine', n, ev.dive ? glideSt(f, ev.dive, 0.04) : f)
    const t = osc('tri', n, f)
    const e = K.adsr(n, { a: 0.003, d: 0.5, s: 0.3, r: 0.05, gate: ev.dur })
    for (let i = 0; i < n; i++) x[i] = (x[i] + 0.45 * t[i]) * e[i]
    saturate(x, 2.2); dcBlock(x, 30); svf(x, 'lp', 1400)
    return scale(x, ev.vel)
  },
  kick: (ev, c) => K.kick(c.rng, { vel: ev.vel }),
  hat: (ev, c) => K.hat(c.rng, { vel: ev.vel }),
  clap: (ev, c) => K.clap(c.rng, { vel: ev.vel }),
  stab: (ev, c) => K.brass(c.rng, ev.midi, ev.dur, { vel: ev.vel, lo: 900, hi: 4000, sus: 1800, fall: 0.15, a: 0.002, d: 0.2, s: 0.3, r: 0.12 }),
  pluck: (ev, c) => K.pluck(c.rng, ev.midi, ev.dur, { vel: ev.vel, bright: 2600 }),
  crash: (ev, c) => K.crash(c.rng, { vel: ev.vel, tau: 0.9 }),
  revcrash: (ev, c) => K.crash(c.rng, { vel: ev.vel, tau: 0.22, len: 0.6, reverse: true }),
  logoPluck: (ev, c) => K.mallet(c.rng, ev.midi, { vel: ev.vel }),
  logoBell(ev) { const g = K.glock(ev.midi, { vel: ev.vel, tauScale: 1.15, len: ev.dur + 1.2 }); if (ev.lp) { svf(g, 'lp', ev.lp) } return g },
  logoPad: (ev, c) => K.padVoice(c.rng, ev.midi, ev.dur, { vel: ev.vel, voices: 3, detune: 8, spread: 0.5, lp: 2000, hp: 150, a: 0.01, d: 0.4, s: 0.8, r: 0.3 }),
  logoSub: ev => K.bass808(ev.midi, ev.dur, { vel: ev.vel, dive: 12, tau: 0.04, tail: 0.9, drive: 1.8 }),
}

// ---------------------------------------------------------------- mix
export const mix = {
  levels: { kick: -9, bass: -14, pad: -22, hat: -24, clap: -16, stab: -17, pluck: -17, crash: -18, revcrash: -18, logoPluck: -13, logoBell: -12, logoPad: -24, logoSub: -15 },
  sends: {
    pad: { hall: -14 }, stab: { hall: -8 }, clap: { plate: -12 }, pluck: { plate: -18, delay: -8 }, crash: { hall: -14 },
    logoPluck: { hall: -12 }, logoBell: { hall: -8 }, logoPad: { hall: -14 },
  },
  sfxSends: {
    tick: { plate: -24 }, thud: { plate: -16 }, ding: { hall: -12 }, roll: { plate: -22 }, pop: { plate: -20 }, cash: { hall: -10 },
    hit: { hall: -8 }, reveal: { hall: -9 }, swipe: { plate: -20 }, whoosh: { plate: -18 }, buzz: { plate: -20 },
    step: { room: -18 }, boing: { room: -16 }, type: { room: -20 }, riser: {},
  },
  duck: {}, // engine DEFAULT_DUCK
  duckBig: { hit: [9, 0.15, 0.45], reveal: [6, 0.12, 0.4] },
  sidechain: { triggers: ['kick'], targets: ['pad', 'pluck'], depth: 2.5, attack: 0.002, hold: 0.02, release: 0.12 },
}

// ---------------------------------------------------------------- SFX (cue, ctx) -> stereo buffer at cue gain 1
const out = (b, peakDb, meta = {}) => { K.norm(b, peakDb); b.meta = meta; return b }
/**
 * Layered sfx: normalise the FULL sound (every layer) to peakDb, then leave out the layers the merge rule drops
 * (parts flagged body: true when ctx.dropBody, transient: true when ctx.dropTransient). Dropping a layer never
 * raises the others.
 */
function outLayers(parts, n, peakDb, ctx, meta = {}) {
  const full = K.layer(parts, n), pk = peakOf(full)
  const keep = parts.filter(p => !(p.body && ctx.dropBody) && !(p.transient && ctx.dropTransient))
  const b = keep.length === parts.length ? full : K.layer(keep, n)
  if (pk > 0) scale(b, dbToGain(peakDb) / pk)
  b.meta = { ...meta, body: !ctx.dropBody }
  return b
}
const tonesIn = (ctx, lo, hi) => T.tonesIn(ctx.chord, lo, hi)
const rot = (arr, n) => arr[((n % arr.length) + arr.length) % arr.length]
function chordRoot(ctx, lo, hi) { return T.rootIn(ctx.chord, lo, hi) }

export const sfx = {
  tick(cue, ctx) {
    const r = ctx.rng
    let m
    if (ctx.train) {
      // a clock train: tick-tock, the chord's 5th then its root, octave 6
      const root = T.placePc(ctx.chord.root, 86)
      m = ctx.train.index % 2 === 0 ? T.placePc(ctx.chord.root + 7, 86) : root
    } else m = rot(tonesIn(ctx, 86, 93), cue.n)
    m = ctx.claim(m)
    const p = K.ping(m + r.bi() * 0.05, { tau: 0.009, a: 0.0005, len: 0.04 })
    const parts = [{ buf: p, pan: cue.n % 2 ? 0.12 : -0.12, gain: 0.8 }]
    if (!ctx.dropTransient) parts.push({ buf: K.click(r, { ms: 1.2, bp: 6500 * (1 + r.bi() * 0.08), q: 1.5 }), pan: cue.n % 2 ? 0.12 : -0.12, gain: 0.7 })
    return out(K.layer(parts, sec(0.04)), ctx.train ? -17 : -14, { pitches: [m], pan: cue.n % 2 ? 0.12 : -0.12 })
  },
  type(cue, ctx) {
    const r = ctx.rng, dur = cue.dur || 0.6, count = Math.max(3, Math.round(dur * 14))
    const b = stereo(sec(dur + 0.06))
    for (let k = 0; k < count; k++) {
      const jit = r.bi() * 0.015
      const at = k === 0 ? 0 : clamp((k / count) * dur + jit, 0, dur - 0.005)   // the first click sits on the cue
      const c = K.click(r, { ms: 2, bp: 3000, q: 2, gain: 0.6 + 0.4 * r() })
      const [gl, gr] = [0.5 + r.bi() * 0.1, 0.5 - r.bi() * 0.1]
      const i0 = sec(at)
      for (let i = 0; i < c.length && i0 + i < b.L.length; i++) { b.L[i0 + i] += c[i] * gl; b.R[i0 + i] += c[i] * gr }
    }
    return out(b, -18, { pan: 0 })
  },
  pop(cue, ctx) {
    const r = ctx.rng
    const m = ctx.claim(rot(tonesIn(ctx, 72, 83), cue.n))
    const g = K.ping(m + r.bi() * 0.06, { tau: 0.025, a: 0.001, glide: 12, glideTime: 0.06, len: 0.12 })
    const pan = r.bi() * 0.25
    const parts = [{ buf: g, pan }]
    if (!ctx.dropTransient) parts.push({ buf: K.click(r, { ms: 1, hp: 3000, gain: 0.5 }), pan })
    return out(K.layer(parts, sec(0.12)), -12, { pitches: [m], pan })
  },
  ding(cue, ctx) {
    const r = ctx.rng
    const tones = [...new Set(tonesIn(ctx, 84, 93))]
    let a = tones[tones.length - 2] ?? tones[0] ?? 86, b = tones[tones.length - 1] ?? 90
    if (!cue.inCard && r() < 1 / 3) b = a + 12 > 93 ? a : a + 12
    a = ctx.claim(a); b = ctx.claim(b)
    const n1 = K.fmBell(a, { ratio: 3.5, I0: 2.2 * (1 + r.bi() * 0.1), I1: 0.3, tau: 0.28, len: 0.8 })
    const n2 = K.fmBell(b, { ratio: 3.5, I0: 2.2 * (1 + r.bi() * 0.1), I1: 0.3, tau: 0.28, len: 0.73 })
    return out(K.layer([{ buf: n1, pan: -0.15 }, { buf: n2, pan: 0.15, at: 0.07, gain: 0.85 }], sec(0.8)), -10, { pitches: [a, b], pan: 0 })
  },
  reveal(cue, ctx) {
    const r = ctx.rng, pre = sec(0.18)
    const ch = ctx.chord, root = T.rootIn(ch, 38, 45)
    const body = K.impact(r, { f: mtof(root), dive: 12, glide: 0.045, tau: 0.12, drive: 1.8, burst: -60, sub: -60, len: 0.6 })
    const bells = [0, 1, 2].map(k => {
      const tones = tonesIn(ctx, 74, 90)
      const m = ctx.claim(tones[Math.min(tones.length - 1, k + 1)] ?? 74 + k * 4)
      return { m, buf: K.fmBell(m, { ratio: 3.5, I0: 2 * (1 + r.bi() * 0.1), tau: 0.6, len: 1.2 }) }
    })
    const rev = noise(pre, r); svf(rev, 'bp', 5000, { q: 0.7 })
    for (let i = 0; i < pre; i++) rev[i] *= Math.pow(i / pre, 2) * 0.2
    const shimmer = K.noiseSweep(r, 0.6, { f0: 9000, f1: 9000, q: 2, window: 'none' })
    const se = expEnv(shimmer.L.length, 0.3, 0.03); for (let i = 0; i < se.length; i++) { shimmer.L[i] *= se[i] * 0.3; shimmer.R[i] *= se[i] * 0.3 }
    const parts = [{ buf: rev, at: 0 }, ...bells.map((x, k) => ({ buf: x.buf, pan: [-0.2, 0, 0.2][k], at: 0.18 + k * 0.04, gain: 0.5 })), { buf: shimmer, at: 0.18 }, { buf: body, at: 0.18, gain: 0.7, body: true }]
    const b = outLayers(parts, pre + sec(1.4), -6, ctx, { pitches: bells.map(x => x.m), pan: 0 })
    b.offset = pre
    return b
  },
  thud(cue, ctx) {
    const r = ctx.rng
    // variation (bible U4): odd occurrences land on the chord's 5th instead of its root, and the dive time alternates
    // short/long (±30%) with a seeded wobble, so consecutive thuds never correlate; the slap is re-seeded and re-tuned
    const root = cue.n % 2 ? T.placePc(ctx.chord.root + 7, 38) : T.rootIn(ctx.chord, 38, 45)
    const slap = K.stereoNoise(sec(0.2), r, x => { svf(x, 'bp', 1200 * (1 + r.bi() * 0.08), { q: 0.8 }); const e = expEnv(x.length, 0.025, 0.0005); for (let i = 0; i < x.length; i++) x[i] *= e[i] })
    const parts = [
      { buf: K.impact(r, { f: mtof(root), dive: 12, glide: 0.018 * (cue.n % 2 ? 0.7 : 1.3) * (1 + 0.1 * r.bi()), tau: 0.12, drive: 1.8, burst: -60, sub: -60, len: 0.45 }), body: true },
      { buf: K.click(r, { ms: 3, hp: 2000, gain: 0.3 }), transient: true },
      { buf: slap, gain: 0.4 },
    ]
    return outLayers(parts, sec(0.45), -6, ctx, { pitches: ctx.dropBody ? [] : [root], pan: 0 })
  },
  whoosh(cue, ctx) {
    const r = ctx.rng, dur = cue.dur || 0.35
    const w = K.noiseSweep(r, dur, { f0: 500, f1: 4000, f2: 800, peakAt: 0.6, q: 0.9, window: 'sin', stereo: false, floor: 0.08 })
    const air = noise(w.length, r); onePoleLP(air, 300); onePoleLP(air, 300)
    for (let i = 0; i < w.length; i++) w[i] += air[i] * 0.3 * Math.sin(Math.PI * i / w.length)
    const dir = cue.n % 2 ? -1 : 1
    return out(K.panSweep(w, -0.5 * dir, 0.5 * dir), -14, { pan: 0 })
  },
  riser(cue, ctx) {
    const r = ctx.rng, dur = Math.max(0.2, cue.dur || 2), n = sec(dur)
    const nz = K.noiseSweep(r, dur, { f0: 300, f1: 9000, q: 1.2, window: 'rise', riseDb: 20 })
    // Shepard-style saws A2/A3/A4 gliding +12 st, each weighted by a raised-cosine bell over log-frequency
    const sw = mono(n)
    for (const m0 of [45, 57, 69]) {
      const f = i => mtof(m0) * Math.pow(2, i / n)
      const x = osc('saw', n, f)
      for (let i = 0; i < n; i++) {
        const pos = (Math.log2(f(i) / mtof(45))) / 3      // 0..1 over A2..A5
        sw[i] += x[i] * 0.5 * (1 - Math.cos(2 * Math.PI * clamp(pos, 0, 1))) * Math.pow(10, (12 * (i / n - 1)) / 20)
      }
    }
    svf(sw, 'lp', 4000, { poles: 4 })
    // width grows: blend the decorrelated noise from mono to full stereo
    for (let i = 0; i < n; i++) { const w = 0.1 + 0.7 * i / n, m = (nz.L[i] + nz.R[i]) / 2; nz.L[i] = m + (nz.L[i] - m) * w + sw[i] * 0.3; nz.R[i] = m + (nz.R[i] - m) * w + sw[i] * 0.3 }
    const f5 = sec(0.005); for (let i = 0; i < f5; i++) { const g = i / f5; nz.L[n - 1 - i] *= g; nz.R[n - 1 - i] *= g }
    return out(nz, -8, { pan: 0, pitches: [] })
  },
  roll(cue, ctx) {
    const r = ctx.rng, dur = cue.dur || 1.5
    const b = stereo(sec(dur + 0.05))
    // click times: the rate accelerates then settles (peak 22/s); first and last click are fixed at 0 and dur
    const times = []
    let t = 0
    while (t < dur - 0.02) { times.push(t); const p = t / dur; t += 1 / (22 * (0.6 + 0.4 * Math.sin(Math.PI * Math.min(1, p * 1.2)))) * (1 + r.bi() * 0.06) }
    times.push(dur)
    const ch = ctx.chord
    const walk = T.tonesIn(ch, T.placePc(ch.root, 72), T.placePc(ch.root, 72) + 12)
    const dir = cue.n % 2 ? -1 : 1
    times.forEach((tc, k) => {
      const last = k === times.length - 1
      const g = last ? dbToGain(4) : 1
      const c = K.click(r, { ms: 1.5, hp: 3000, gain: 0.8 * g })
      const m = walk[Math.min(walk.length - 1, Math.round((k / Math.max(1, times.length - 1)) * (walk.length - 1)))]
      const bl = K.ping(m, { tau: 0.006, len: 0.03, shape: 'tri' })
      const pan = dir * (-0.35 + 0.7 * tc / dur)
      const st = K.layer([{ buf: c, pan }, { buf: bl, pan, gain: 0.63 * g }])
      const i0 = sec(tc)
      for (let i = 0; i < st.L.length && i0 + i < b.L.length; i++) { b.L[i0 + i] += st.L[i]; b.R[i0 + i] += st.R[i] }
    })
    return out(b, -16, { pitches: walk, pan: 0 })
  },
  cash(cue, ctx) {
    const r = ctx.rng
    const parts = []
    // the mechanical clicks are the cash register's identity, so they stay when a music hit merges (dropTransient):
    // only the first click is softened (the music transient owns the attack) and the sound still starts at its cue
    for (let k = 0; k < 5; k++) parts.push({ buf: K.click(r, { ms: 3, hp: 4000, gain: (1 - k * 0.1) * (k === 0 && ctx.dropTransient ? 0.4 : 1) }), at: k * 0.022 })
    const root6 = T.placePc(ctx.chord.root, 84), fifth6 = T.placePc(ctx.chord.root + 7, 84)
    const a = ctx.claim(root6), b5 = ctx.claim(fifth6)
    parts.push({ buf: K.fmBell(a, { ratio: 3.5, I0: 1.6, tau: 0.35, len: 0.9 }), at: 0.10, pan: -0.1, gain: 0.6 })
    parts.push({ buf: K.fmBell(b5, { ratio: 3.5, I0: 1.6, tau: 0.35, len: 0.87 }), at: 0.13, pan: 0.1, gain: 0.5 })
    const coins = tonesIn(ctx, 98, 105)
    for (let k = 0; k < 12; k++) parts.push({ buf: K.ping(rot(coins, r.int(coins.length || 1)) || 100, { tau: 0.03, len: 0.15 }), at: 0.1 + r() * 0.4, pan: r.bi() * 0.6, gain: 0.25 })
    return out(K.layer(parts, sec(1.0)), -9, { pitches: [a, b5], pan: 0 })
  },
  buzz(cue, ctx) {
    const n = sec(0.38)
    const x = osc('square', n, 146.83), y = osc('square', n, 155.56)
    for (let i = 0; i < n; i++) x[i] = (x[i] + y[i]) * 0.5
    svf(x, 'lp', 1800)
    const e = expEnv(n, 0.12, 0.005); for (let i = 0; i < n; i++) x[i] *= e[i]
    return out(panMono(x, 0), -12, { pitches: [50, 51], pan: 0 })
  },
  boing(cue, ctx) {
    const r = ctx.rng, n = sec(0.4)
    const f0 = mtof(T.placePc(ctx.chord.root, 60)) * Math.pow(2, r.bi() * 5 / 1200)
    const x = osc('tri', n, i => { const t = i / SR; return f0 * Math.pow(2, Math.min(t, 0.25) / 0.25) * Math.pow(2, (Math.exp(-t / 0.15) * Math.sin(2 * Math.PI * 11 * t)) / 12) })
    const e = expEnv(n, 0.12, 0.003); for (let i = 0; i < n; i++) x[i] *= e[i]
    const pan = r.bi() * 0.2
    return out(panMono(x, pan), -12, { pitches: [T.placePc(ctx.chord.root, 60)], pan })
  },
  step(cue, ctx) {
    const r = ctx.rng, n = sec(0.09)
    const x = noise(n, r); onePoleLP(x, 900 * (1 + r.bi() * 0.15)); onePoleLP(x, 900)
    const s = osc('sine', n, 95)
    const e = expEnv(n, 0.025, 0.001)
    for (let i = 0; i < n; i++) x[i] = (x[i] * 2 + s[i] * 0.8) * e[i]
    const pan = cue.n % 2 ? 0.1 : -0.1
    return out(panMono(x, pan), -16 + r.bi() * 2, { pan })
  },
  hit(cue, ctx) {
    const r = ctx.rng
    const root = ctx.inCard ? 38 : T.rootIn(ctx.chord, 38, 45)
    const parts = [
      { buf: K.impact(r, { f: mtof(root), dive: 12, glide: 0.02 * (1 + 0.25 * r.bi()), tau: 0.35, drive: 2.5, burst: -60, sub: -8, subTau: 0.25, len: 1.6 }), body: true },
      { buf: noise(sec(0.004), r).map((v, i, a) => v * (1 - i / a.length)), gain: 0.5, transient: true },
      { buf: K.crash(r, { vel: 0.5, tau: 0.9 * (1 + r.bi() * 0.05), hp: 3500, ratio: 2.3 }) },
    ]
    return outLayers(parts, sec(1.6), -3, ctx, { pitches: ctx.dropBody ? [] : [root], pan: 0 })
  },
  swipe(cue, ctx) {
    const r = ctx.rng, dur = cue.dur || 0.22
    const w = K.noiseSweep(r, dur, { f0: 2000 * (1 + r.bi() * 0.08), f1: 7000, q: 1.1, window: 'sin', stereo: false, floor: 0.08 })
    const dir = cue.n % 2 ? -1 : 1
    return out(K.panSweep(w, -0.4 * dir, 0.4 * dir), -16, { pan: 0 })
  },
}
