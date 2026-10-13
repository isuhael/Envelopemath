// Becker Rig score (sound bible §6.4-6.6): "toy-box funk" laid on the timeline, and the em sting's "toy fanfare" (§3.2).
//
// The band: BR-Bounce bass, marimba ostinato (D4-F#5: see OST_LO), glock calls and answers, pizz chops, brass stabs,
// tremolo strings, the warm pad (a two-voice halo in the BUILD), dry punchy drums with swung 16ths (58%). The arrangement
// follows the engine's sections and energies:
//   HOOK   one of three seeded openings at t = 0 ("ta-da", "ba-DA", "ta-da-ling"), brass D major always on t = 0 (S10)
//   BUILD  E3 (bounce, ostinato, shaker 16ths) -> E4 at the midpoint (kick 4/7, ghost snares, pizz chops, slides)
//   TENSION "strain": heartbeat kick on every beat, snare roll 16ths -> 32nds, tremolo strings on the climb, bass
//          F# G G# A, no marimba; the slide whistle when no SFX riser covers it; the last 8th before P is silent
//   P      "ka-TA": a short brass "ka" with timpani, crash, kick, snare and clap on the downbeat (inside the payoff duck),
//          the sustained fanfare "TA" on the react bus from the next free swung 16th; glock A5
//   DROP   E5: four on the floor, clap, tambourine, brass stabs on 1 and the and-of-2, ostinato in its home octave, glock line
//   HOLD   "victory lap" E3 (bounce, pizz chops, ostinato), glock only in sparse bars and never in the 2 bars after V
//   BREAK  drums out, dominant pad, pizz tremolo on A3, a reverse crash into V
//   VERDICT "ding! ba-DAM": the ding owns V's downbeat, the band (kick, bass, brass button, crash) answers a 16th later
//   CADENCE Em7 -> A7sus4 -> A7, a swung snare + tom fill on the last beat, stop dead at base
// Reactions (§6.6): drums yield to body cues (>= 0.35, footsteps too) and to the cues B3 listens to; "catch the hit"
// brass stabs on the react bus (the engine's duck-exempt bus, routing.mjs: the cue they answer does not duck them; mix.mjs
// react.via 'logo' keeps them off musicDb and the glue, as calibrated); clock trains
// silence the shaker and block and keep the kit, ghosts, pizz chops and marimba off their ticks; the buzz deflate (Gm,
// the bass bends down 3 st, drums and marimba out for a beat); the bass chokes for bloops, dings, landings and steps;
// band-selective dips of the mid voices under the cues (a dynamic EQ in automation); dense beats lose the glock and thin
// the marimba; long cue-free holds change something every 2 bars.
import * as T from '../../../src/sound/theory.mjs'
import { climb, deflateEnd } from './harmony.mjs'
import { balancePlan, OWN, PAYOFF_OWN } from './balance.mjs'
import { mix } from './mix.mjs'

export const SWING = 0.58
const W = { tick: 0.5, type: 0.5, pop: 0.5, swipe: 0.5, whoosh: 0.5, step: 0.5, thud: 1, ding: 1, buzz: 1, boing: 1, cash: 1.5, hit: 2, reveal: 2, roll: 2, riser: 0 }
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
const AUD = new Set(['thud', 'hit', 'ding', 'cash', 'reveal', 'pop'])
// (OWN: the 50 ms a cue B3 listens to owns; PAYOFF_OWN: the payoff's own cues after P; both from balance.mjs)
const BELL = new Set(['pop', 'ding', 'tick', 'boing', 'cash'])
const GROOVE = new Set(['HOOK', 'BUILD', 'DROP', 'HOLD', 'HOLD2', 'VERDICT', 'CADENCE'])
const D_MAJOR = new Set([2, 4, 6, 7, 9, 11, 1])
const inKey = m => D_MAJOR.has(((m % 12) + 12) % 12) || ((m % 12) + 12) % 12 === 0   // + C natural (bVII)

// ---------------------------------------------------------------- patterns (16 steps per bar; [step, vel])
const KICK = { 3: [[1, 1.0], [11, 0.82]], '3b': [[1, 1.0], [8, 0.66], [11, 0.8]], 4: [[1, 1.0], [4, 0.66], [7, 0.72], [11, 0.85]], 5: [[1, 0.98], [5, 0.86], [9, 0.9], [13, 0.86], [16, 0.52]] }
const SNARE = { 3: [[5, 0.9], [13, 0.9]], 4: [[5, 0.9], [13, 0.9], [8, 0.18], [15, 0.34]], 5: [[5, 1.0], [13, 1.0]] }
// bass "bounce": [step, kind, 16ths, vel]  R root · O root+8va · 5 fifth · A approach tone (flagged passing when chromatic)
const BOUNCE = [[1, 'R', 2, 1.0], [4, 'O', 1, 0.72], [7, 'R', 1, 0.8], [9, '5', 2, 0.9], [12, 'O', 1, 0.72], [15, 'A', 1, 0.76]]
// marimba ostinato: [step, degree, vel]; R = root in OST_LO..OST_LO+11, 5 = the 5th directly below, 3 = the 3rd directly
// above. OST_LO is 67 (the bible's §6.4 says 74): the ostinato sits in D4-F#5, a warm mid marimba under the glock's
// octave (74-93), so the two toys stop masking each other and the marimba can be loud without piling the whole band's
// weight into the 1 kHz octave (§9.2)
const OST_LO = 67
const OST_A = [[1, 'R', 0.95], [4, '5', 0.66], [7, 'R', 0.8], [9, '3', 0.88], [11, '5', 0.66], [13, 'R', 0.8], [15, '3', 0.68]]
const OST_B = [[1, 'R', 0.95], [3, '3', 0.68], [6, '5', 0.64], [9, 'R', 0.88], [11, '3', 0.7], [12, '5', 0.62], [14, 'R', 0.68]]
// the TENSION climb's tremolo voicings and bass (bible §6.2)
const CLIMB_V = { 'D/F#': [57, 62, 66], G: [59, 62, 67], 'G#°7': [59, 62, 65], A7: [61, 64, 67] }
const CLIMB_B = { 'D/F#': 42, G: 43, 'G#°7': 44, A7: 45 }
// DROP glock lines over | D | G·A |: [step, midi, 16ths] (strong beats are chord tones; A5 lands on P)
const DROP_LINES = [
  [[[1, 81, 6], [7, 78, 2], [9, 81, 2], [11, 86, 2], [13, 85, 2], [15, 83, 2]], [[1, 83, 4], [5, 81, 2], [7, 79, 2], [9, 81, 4], [13, 85, 2], [15, 88, 2]]],
  [[[1, 81, 4], [5, 78, 2], [7, 74, 2], [9, 78, 4], [13, 76, 1], [14, 78, 1], [15, 79, 2]], [[1, 83, 3], [4, 81, 1], [5, 79, 4], [9, 76, 4], [13, 81, 4]]],
]

/** chord helpers: root / 3rd (or sus) / 5th pitch classes of a parsed chord */
const thirdPc = ch => T.priorityTones(ch)[1] ?? ch.root
const fifthPc = ch => { const iv = ch.intervals.map(x => ((x % 12) + 12) % 12); const f = [7, 6, 8].find(x => iv.includes(x)); return (ch.root + (f ?? 7)) % 12 }

export function compose(tl, rng) {
  const P = tl.anchors.P.t, Pb = tl.anchors.P.beat, gap = tl.anchors.P.gap, base = tl.base
  // the balance plan (balance.mjs, bible B1): the SFX leveller's per-cue trims (the SFX renderers read them from
  // tl.becker) and the music trim that evens out what the engine's duck costs the band in this teaser
  tl.becker = balancePlan(tl)
  const mTrim = tl.becker.music.trim
  const V = tl.anchors.V ? tl.anchors.V.t : null
  const notes = [], drums = []
  // humanising: one stream per layer, created once (bible §1: never share a stream between layers)
  const HS = {}
  const hum = name => HS[name] || (HS[name] = tl.stream('hum:' + name))
  const g = (name, sd) => hum(name).gauss() * sd
  const secAt = t => tl.sectionAt(t + 1e-6).name
  const inGap = t => t >= gap - 1e-6 && t < P - 1e-6
  const beatOf = t => tl.beats[Math.max(0, Math.min(tl.beats.length - 1, Math.floor(tl.beatAt(t) + 1e-6)))]
  const isDense = t => { const b = beatOf(t); return !!(b && b.dense) }
  const bar16 = t => tl.beatLen(t) / 4
  const barLen = b => b.beats * 60 / b.bpm

  // ---- clock trains (bible §6.6.3): ticks every 0.832 s (10b), thuds every 0.5 s (02a). The shaker and woodblock
  // mute while one runs; same-kind trains split by a few interruptions merge into one span
  const clocks = []
  for (const tr of tl.trains.filter(x => x.period <= 1.0 && (x.kind === 'tick' || x.kind === 'thud')).sort((a, b) => a.t0 - b.t0)) {
    let a = tr.t0, b = tr.t1 + tr.period * 0.5
    for (let k = 0; k < 4; k++) { const pre = tl.cues.find(c => c.kind === tr.kind && c.t < a - 1e-6 && c.t >= a - tr.period * 3); if (!pre) break; a = pre.t }
    const last = clocks[clocks.length - 1]
    if (last && last.kind === tr.kind && a - last.b <= tr.period * 2.5) last.b = Math.max(last.b, b)
    else clocks.push({ kind: tr.kind, a: a - 0.05, b })
  }
  const clocked = t => clocks.some(c => t >= c.a && t <= c.b)
  // the ticks and thuds of the clock trains: no kick, snare, clap or tom 15-70 ms off one (a double hit on the story's
  // clock), and no ghost snare or pizz chop on or next to one (within 70 ms)
  const clockCues = tl.cues.filter(c => (c.kind === 'tick' || c.kind === 'thud') && clocked(c.t) && !c.inCard)
  const nearClock = (t, lo, hi = 0.07) => clockCues.some(c => { const d = Math.abs(c.t - t); return d >= lo && d < hi })
  // ---- the buzz deflate (bible §6.2, §6.6.5): drums and marimba stop for 1 beat from the buzz (to the restatement one
  // beat into the next bar when the buzz lands in a bar's last beat, harmony.mjs deflateEnd), and the bass sags 3 st
  const deflates = tl.cues.filter(c => c.kind === 'buzz' && c.t < base - 1e-6 && secAt(c.t) !== 'TENSION' && !inGap(c.t) && c.t < P - 1e-6).map(c => {
    const end = deflateEnd(tl, c.t)
    return { t: c.t, t1: Math.max(end > tl.barAt(c.t).t1 + 1e-6 ? end : 0, c.t + tl.beatLen(c.t)), end, bar: tl.barAt(c.t) }
  })
  const deflated = t => deflates.some(d => t >= d.t - 0.005 && t < d.t1 - 1e-6)

  // ---- event adders
  // drums yield to the body cues (bible §6.6.1, §4.6.1), down to gain 0.35 and including footsteps: a kick, snare, clap
  // or tom 15-70 ms off a thud, hit, cash, reveal or step is a flam on the look's most repeated gesture (the throw). A
  // backbeat (snare or clap, `snap`) within 35 ms moves onto the cue instead (one hit; the SFX gives up its transient)
  const BODY = ['thud', 'hit', 'cash', 'reveal', 'step']
  const drum = (t, inst, vel, extra = {}) => {
    if (!(t >= 0) || t >= base - 1e-6 || inGap(t)) return false
    if (!extra.force && deflated(t)) return false
    if (/^(kick|snare|clap|tom)$/.test(inst) && !tl.isAnchor(t)) {
      // every body cue within 70 ms counts (drumYield reports only the nearest): a cue B3 listens to (gain >= 0.4) owns
      // its first 50 ms, so no kick merges with it or lands up to 70 ms before it, and a backbeat drops rather than
      // snapping onto it; a backbeat may snap onto a lighter cue within 35 ms if no other body cue is then 15-70 ms off
      const near = tl.cues.filter(c => BODY.includes(c.kind) && c.gain >= 0.35 && Math.abs(c.t - t) < 0.07)
      const flamAt = x => near.some(c => { const d = Math.abs(c.t - x); return d > 0.015 && d < 0.07 })
      if (near.some(c => Math.abs(c.t - t) <= 0.015 && AUD.has(c.kind) && c.gain >= 0.4)) return false
      if (flamAt(t)) {
        const to = near.filter(c => !(AUD.has(c.kind) && c.gain >= 0.4) && Math.abs(c.t - t) <= 0.035).sort((a, b) => Math.abs(a.t - t) - Math.abs(b.t - t))[0]
        if (extra.snap && to && !inGap(to.t) && to.t < base - 1e-6 && !flamAt(to.t)) t = to.t
        else return false
      }
      if (inst === 'kick' && !tl.isAnchor(t) && tl.cues.some(c => AUD.has(c.kind) && c.gain >= 0.4 && c.t - t > -0.015 && c.t - t < 0.08)) return false
      // ... and its first 50 ms are its own (B3's window): no kick, snare, clap or tom strikes 15-50 ms after it either
      // (a dense body puts a cue on the beat's doorstep: 03a's DROP backbeat landed 21 ms after a payoff pop)
      if (!tl.isAnchor(t) && tl.cues.some(c => AUD.has(c.kind) && c.gain >= 0.4 && !c.inCard && t - c.t >= 0.015 && t - c.t < OWN)) return false
      if (!tl.isAnchor(t) && nearClock(t, 0.015)) return false
    }
    if ((inst === 'ghost' || inst === 'block') && nearClock(t, 0)) return false
    if ((inst === 'shaker' || inst === 'block') && clocked(t)) return false
    const { force, snap, ...rest } = extra
    if (inst === 'kick' && tl.isAnchor(t)) vel = 1
    drums.push({ t, inst, vel: +clamp(vel, 0.05, 1).toFixed(4), ...rest })
    return true
  }
  const note = (t, dur, midi, vel, inst, role, extra = {}) => {
    if (!(t >= 0) || t >= base - 1e-6 || inGap(t)) return false
    if (inst === 'pizz' && role === 'pizz' && extra.chop && nearClock(t, 0)) return false
    let d = Math.min(dur, base - t)
    if (t < gap - 1e-6 && t + d > gap) d = gap - t          // every music voice is released at the gap
    if (d < 0.015) return false
    notes.push({ t, dur: d, midi, vel: +clamp(vel, 0.05, 1).toFixed(4), inst, role, ...extra })
    return true
  }
  const nearP = t => Math.abs(t - P) < 0.002

  // ---- long cue-free holds evolve (bible §4.6.5 via §6.6.6): a 2-bar block counter over bars with no cue of weight >= 1
  const variant = new Map()
  {
    let run = 0
    for (const b of tl.bars) { run = b.cueBar ? 0 : run + 1; variant.set(b.i, run >= 1 ? Math.floor((run - 1) / 2) % 4 : 0) }
  }

  // ---- glock answers (em-motif call + stepwise answer) in sparse bars, and the DROP line
  // the DROP line (A5 on P), chosen first so the answers around it lead into and out of it smoothly
  const dropLine = []
  {
    const dropBars = tl.bars.filter(b => b.section === 'DROP' && b.t >= P - 1e-6)
    const line = DROP_LINES[rng.int(DROP_LINES.length)]
    dropBars.slice(0, 2).forEach((b, j) => {
      for (const [s, m0, len] of line[j]) {
        if (s > Math.round(b.beats * 4)) continue
        const t = tl.step(b, s, SWING)
        const ch = tl.chordAt(t + 1e-6)
        const strong = s === 1 || s === 9
        const m = strong && !T.isChordTone(ch, m0) ? T.nearestTone(ch, m0) : m0
        dropLine.push({ t, dur: len * bar16(t) * 0.95, midi: m, vel: s === 1 ? 0.95 : 0.8 })
      }
    })
  }
  const glockNotes = glockPhrases(tl, { secAt, base, V, hum: hum('glock:pick'), isDense, fixed: dropLine })
  const glockBars = new Set(glockNotes.map(n => n.bar))
  for (const n of glockNotes) note(n.t, n.dur, n.midi, n.vel + g('glock', 0.04), 'glock', 'glock', { pan: clamp(0.12 + (n.midi - 81) / 40, -0.1, 0.35) })

  // ---- harder marimba mallets when the cues crowd the 1 kHz octave (tilt > 0): the bars' overtones carry the toy
  // into 2 kHz, where the cues leave room (the balance plan's tilt; at most +1.2 on the overtones above 1.5 kHz)
  const hard = Math.min(1.2, 0.6 * Math.max(0, tl.becker.tilt.tilt))

  // ---- the groove, bar by bar
  const fanfareEnd = tl.step(tl.barAt(P + 1e-6), 7, SWING) - 1e-3
  let prevChop = null, lastBassMidi = 38
  for (const b of tl.bars) {
    if (b.t >= base - 1e-6) break
    const steps = Math.round(b.beats * 4), E = b.energy, v = variant.get(b.i) || 0
    const st = s => tl.step(b, s, SWING)
    const grooveAt = t => GROOVE.has(secAt(t))
    const fillBar = (b.section === 'BUILD' && b.phraseBar === 3) || ((b.section === 'HOLD' || b.section === 'HOLD2') && (b.i - tl.bars.find(x => x.section === b.section).i) % 4 === 3)
    const last = s => s > steps - 4                       // in the bar's last beat
    // kick / snare / clap
    const kp = E >= 5 ? KICK[5] : E === 4 ? KICK[4] : v === 2 ? KICK['3b'] : KICK[3]
    for (const [s, vel] of kp) { if (s > steps) continue; const t = st(s); if (grooveAt(t)) drum(t, 'kick', vel + g('kick', 0.03)) }
    const sp = SNARE[Math.min(5, Math.max(3, E))]
    for (const [s, vel] of sp) {
      if (s > steps) continue
      const t = st(s)
      if (!grooveAt(t)) continue
      if (vel < 0.5) drum(t, 'ghost', vel + g('ghost', 0.04))
      else drum(t, 'snare', vel + g('snare', 0.03), { snap: true })
      if (E >= 5 && vel >= 0.5) drum(t, 'clap', 0.85 + g('clap', 0.04), { snap: true })
    }
    // shaker (16ths, 0.6 on the 8ths, 0.35 off; timing humanised ~2.5 ms SD) and the E5 tambourine
    for (let s = 1; s <= steps; s++) {
      const t0 = st(s)
      if (!grooveAt(t0)) continue
      const on8 = s % 2 === 1
      const t = Math.max(0, t0 + clamp(g('shaker:t', 0.0025), -0.006, 0.006))
      drum(t, 'shaker', (on8 ? 0.6 : 0.35) * (E >= 5 ? 1.1 : E === 4 ? 1.0 : 0.9) + g('shaker', 0.035), { pan: on8 ? 0.18 : 0.3 })
      if (E >= 5 && on8) drum(t0, 'tamb', (s % 4 === 3 ? 0.75 : 0.55) + g('tamb', 0.04), { pan: -0.25 })
    }
    // fill on the last beat of a phrase's 4th bar (unless a cue of weight >= 1 sits in it, or the beat is dense)
    if (fillBar && steps >= 16) {
      const t13 = st(13), t17 = b.t1
      const busy = tl.cues.some(c => c.t >= t13 - 1e-6 && c.t < t17 && (W[c.kind] || 0) >= 1) || isDense(t13)
      if (!busy && grooveAt(st(16))) {
        if (E >= 4) {
          drum(st(14), 'snare', 0.6 + g('snare', 0.03))
          drum(st(15), 'tom', 0.72 + g('tom', 0.03), { f0: 165, f1: 120 })
          drum(st(16), 'tom', 0.85 + g('tom', 0.03), { f0: 130, f1: 92 })
        } else {
          drum(st(14), 'snare', 0.58 + g('snare', 0.03))
          drum(st(15), 'snare', 0.68 + g('snare', 0.03))
          drum(st(16), 'snare', 0.82 + g('snare', 0.03))
        }
      }
    }
    // the bass bounce
    const nextBar = tl.bars[b.i + 1]
    for (const [s, kind, len, vel0] of BOUNCE) {
      if (s > steps) continue
      const t = st(s)
      if (!grooveAt(t) || deflated(t)) continue
      const ch = tl.chordAt(t + 1e-6)
      const R = T.placePc(ch.bass, 38)
      let m = R, extra = {}, vel = vel0
      if (kind === 'O') { m = R + 12; if (E >= 5) { vel = 0.9; extra.bright = 1.35 } }
      if (kind === '5') {
        const prevCh = tl.chordAt(st(8) + 1e-6)
        m = prevCh.sym !== ch.sym ? R : T.placePc(fifthPc(ch), R)            // a new chord on beat 3 takes its root
      }
      if (kind === 'A') {
        const tn = nextBar ? nextBar.t : base
        const nch = tl.chordAt(tn + 1e-6), target = T.placePc(nch.bass, 38)
        const opts = [target - 1, target + 1, target - 2, target + 2].filter(x => x >= 38 && x <= 52)
        m = opts.find(x => inKey(x) && x !== R) ?? opts[0]
        if (!inKey(m)) extra.chromatic = 'passing'
        if (E >= 4) extra.glideTo = target                                      // E4+: slide into each bar
      }
      const dur = len * bar16(t) * (len === 2 ? 0.82 : 0.78)
      const ok = note(t, dur, m, vel + g('bass', 0.035), 'bass', 'bass', extra)
      if (ok) lastBassMidi = m
    }
    // marimba ostinato (or the turnaround's em motif)
    const ost = v === 3 ? OST_B : OST_A
    // an evolving long hold lifts the ostinato an octave, but only when the whole bar fits under MIDI 86 (folding single
    // notes scrambles its contour). The DROP keeps it in its home octave: the octave above belongs to the glock line
    // and the fanfare's top voices (the bible's E5 "up an octave, folded at 86" masked both)
    const home = (s, deg) => { const ch = tl.chordAt(st(s) + 1e-6), R = T.placePc(ch.root, OST_LO); return deg === 'R' ? R : deg === '5' ? T.placePc(fifthPc(ch), R - 12) : T.placePc(thirdPc(ch), R + 1) }
    const up = v === 1 && E < 5 && ost.every(([s, deg]) => s > steps || home(s, deg) + 12 <= 86)
    const turn = steps >= 16 && E >= 3 && ((b.section === 'BUILD' && b.phraseBar === 3) || ((b.section === 'HOLD' || b.section === 'HOLD2') && tl.chordAt(st(13) + 1e-6).root === 9))
      && [13, 14, 15, 16].every(s => grooveAt(st(s)) && !deflated(st(s))) && [9, 2].includes(tl.chordAt(st(13) + 1e-6).root) && !glockBars.has(b.i)
    for (let j = 0; j < ost.length; j++) {
      const [s, deg, vel0] = ost[j]
      if (s > steps || (turn && s >= 13)) continue
      const t = st(s)
      if (!grooveAt(t) || deflated(t) || (t >= P - 1e-3 && t < fanfareEnd)) continue   // the fanfare owns P's first 1.5 beats
      if (nearClock(t, 0, 0.05)) continue                    // the story's clock owns its tick: the ostinato leaves it the slot
      let m = home(s, deg)
      if (up) m += 12
      while (m > 86) m -= 12
      const nextS = j + 1 < ost.length ? ost[j + 1][0] : 17
      const dur = Math.min(4 * bar16(t), (nextS <= steps ? st(nextS) : b.t1) - t) * 0.94
      // the marimba spreads by pitch like a real instrument seen from the front (low bars left, high bars right, ±30%)
      note(t, dur, m, (vel0 + g('mallet', 0.04)) * (isDense(t) ? 0.71 : 1), 'mallet', 'mallet', { pan: clamp((m - 71) / 24, -0.3, 0.3), ...(hard ? { hard } : {}) })
    }
    if (turn) [69, 74, 76, 81].forEach((m, k) => note(st(13 + k), (k === 3 ? 2 * bar16(b.t) : st(14 + k) - st(13 + k)) * 0.94, m, [0.72, 0.78, 0.84, 0.95][k] + g('mallet', 0.03), 'mallet', 'mallet', { motif: true, pan: clamp((m - 71) / 24, -0.3, 0.3) }))
    // pizz chops on 3, 7, 11, 15 (E4, the HOLD's victory lap, or an evolving long hold)
    if (E === 4 || b.section === 'HOLD' || b.section === 'HOLD2' || (E === 3 && v === 2)) {
      for (const s of [3, 7, 11, 15]) {
        if (s > steps) continue
        const t = st(s)
        if (!grooveAt(t) || deflated(t) || secAt(t) === 'DROP') continue
        const ch = tl.chordAt(t + 1e-6)
        const vc = T.voicing(ch.sym, { n: 3, lo: 55, hi: 74, prev: prevChop })
        prevChop = vc
        const vel = (s === 3 || s === 11 ? 0.66 : 0.58) + g('pizz', 0.04)
        vc.forEach((m, k) => note(t + k * 0.004, bar16(t) * 0.9, m, vel, 'pizz', 'pizz', { pan: (s % 8 === 3 ? -0.2 : 0.2), chop: true }))
      }
    }
    // DROP brass stabs on 1 and 7 (closed triads doubled an octave up); on P the fanfare replaces the first
    if (E >= 5 && secAt(b.t) === 'DROP') {
      for (const s of [1, 7]) {
        if (s > steps) continue
        const t = st(s)
        if (nearP(t) || secAt(t) !== 'DROP') continue
        const ch = tl.chordAt(t + 1e-6)
        const tri = T.voicing(ch.sym, { n: 3, lo: 57, hi: 72 })
        const vel = (s === 1 ? 0.9 : 0.78) + g('brass', 0.045)
        for (const m of [...tri, ...tri.map(x => x + 12)]) note(t, bar16(t) * 1.8, m, vel + g('brass', 0.02), 'honk', 'brass')
      }
    }
  }

  // ---- the deflate's bass: the Gm root (G2) at the buzz, bending down 3 st over 250 ms (the instrument's ev.bend), held
  // to the restatement; whatever bass note was still ringing stops at the buzz
  for (const d of deflates) {
    for (const n of notes) if (n.inst === 'bass' && n.t < d.t - 1e-6 && n.t + n.dur > d.t - 0.005) n.dur = Math.max(0.02, d.t - 0.005 - n.t)
    // (a bloop or ding the bass must make room for, right after the buzz, chokes the note: the slide then completes
    // before it, so the "wah" is never cut mid-bend)
    const nx = tl.cues.find(c => ['pop', 'ding', 'thud', 'step'].includes(c.kind) && c.gain >= 0.4 && !c.inCard && c.t > d.t + 0.02 && c.t < d.t + 0.3)
    note(d.t, (d.t1 - d.t) * 0.92, T.placePc(7, 38), 0.86 + g('bass', 0.02), 'bass', 'bass', { bend: -3, bendAt: 0, bendTime: nx ? Math.max(0.08, nx.t - d.t - 0.03) : 0.25, chromatic: 'strain' })
  }

  // ---- the pad: one voicing per harmony span (TENSION has the strings instead), voice-led, 3 voices in 55-74
  {
    const ten = tl.section('TENSION')
    let prev = null
    const spans = tl.harmony.filter(h => h.t0 < base - 1e-6 && !h.climb)
    const merged = []
    for (const h of spans) {
      const lastM = merged[merged.length - 1]
      const t0 = h.t0, t1 = Math.min(h.t1, base, ten && h.t0 < ten.t0 ? ten.t0 : Infinity)
      if (lastM && lastM.sym === h.sym && Math.abs(lastM.t1 - t0) < 1e-6 && !nearP(t0) && !(V != null && Math.abs(t0 - V) < 0.002) && !h.deflate) { lastM.t1 = t1; continue }
      merged.push({ sym: h.sym, t0, t1, deflate: h.deflate })
    }
    for (const h of merged) {
      if (h.t1 - h.t0 < 0.08) continue
      const fast = Math.abs(h.t0) < 1e-6 || nearP(h.t0) || (V != null && Math.abs(h.t0 - V) < 0.002) || h.deflate
      // the BUILD's pad is two guide tones (3rd + 7th, or 3rd + 5th) in 57-74: a halo under the marimba, not a wall
      const two = secAt(h.t0) === 'BUILD'
      const pt = T.priorityTones(T.chord(h.sym))
      const maxMove = v => (prev && prev.length === v.length ? Math.max(...v.map((m, k) => Math.abs(m - prev[k]))) : 0)
      let vc = two ? T.voicing(h.sym, { n: 2, lo: 57, hi: 74, prev, require: [pt[1], pt[2]].filter(x => x != null) }) : T.voicing(h.sym, { n: 3, lo: 55, hi: 74, prev })
      // (the guide tones give way to any two chord tones when they would make a voice leap more than 5 st, S12)
      if (two && maxMove(vc) > 5) { const alt = T.voicing(h.sym, { n: 2, lo: 57, hi: 74, prev }); if (maxMove(alt) < maxMove(vc)) vc = alt }
      prev = vc
      const bar = tl.barAt(h.t0 + 1e-6), E = bar ? bar.energy : 3
      for (const m of vc) note(h.t0, h.t1 - h.t0, m, 0.5 + 0.05 * (E - 3) + g('pad', 0.03), 'pad', 'pad', fast ? { fast: true } : {})
    }
  }

  // ---- the hook at t = 0, one of three seeded variants (brass D major always at t = 0, S10), so 15 Becker shorts in a
  // feed do not open identically: "ta-da!" (an 8th), "ba-DA!" (a 16th, then a higher voicing F#4 A4 D5 F#5 and the crash on the
  // and-of-1), or "ta-da-ling!" (the 8th and a glock run up the chord on the swung 16ths)
  const hookV = tl.stream('hook').int(3)
  {
    const b0 = tl.bars[0], st0 = s => tl.step(b0, s, SWING)
    if (hookV === 1) {
      for (const m of [62, 66, 69, 74]) note(0, bar16(0) * 0.9, m, 0.92, 'honkF', 'brass')
      for (const m of [66, 69, 74, 78]) note(st0(3), tl.beatLen(0) * 0.62, m, 1.0, 'honkF', 'brass')
      drum(0, 'timp', 0.8, { midi: 38 })
      drum(st0(3), 'timp', 0.9, { midi: 38 })
      drum(st0(3), 'crash', 0.7)
    } else {
      for (const m of [62, 66, 69, 74]) note(0, tl.beatLen(0) * 0.5, m, 1.0, 'honkF', 'brass')
      drum(0, 'timp', 0.9, { midi: 38 })
      drum(0, 'crash', 0.7)
      if (hookV === 2) [74, 78, 81, 86].forEach((m, k) => note(st0(2 + k), bar16(0) * (k === 3 ? 3 : 0.95), m, [0.66, 0.72, 0.8, 0.9][k], 'glock', 'glock'))
    }
  }

  // ---- TENSION: strain
  const ten = tl.section('TENSION')
  if (ten) {
    const Tn = Math.round(ten.b1 - ten.b0)
    for (let k = 0; k < Tn; k++) drum(tl.timeAt(ten.b0 + k), 'kick', 0.7 + g('kick', 0.02))       // the heartbeat
    // snare roll: 16ths for the first half, 32nds after, 0.3 -> 1.0, up to the gap
    {
      let beat = ten.b0
      const half = ten.b0 + Tn / 2
      while (true) {
        const t = tl.timeAt(beat)
        if (t >= gap - 1e-6) break
        const p = (t - ten.t0) / Math.max(1e-3, gap - ten.t0)
        drum(t, 'roll', 0.55 + 0.45 * Math.pow(p, 1.15) + g('roll', 0.02))
        beat += beat < half - 1e-9 ? 0.25 : 0.125
      }
    }
    // the climb: tremolo strings and the bass on F# G G# A, crescendo
    let beat = ten.b0
    const parts = climb(Tn)
    parts.forEach((c, j) => {
      const t0 = tl.timeAt(beat), t1 = Math.min(tl.timeAt(beat + c.beats), gap)
      const p = parts.length > 1 ? j / (parts.length - 1) : 1
      for (const m of CLIMB_V[c.sym]) note(t0, t1 - t0 + 0.004, m, 0.62 + 0.36 * p + g('strings', 0.02), 'strings', 'strings')
      const bm = CLIMB_B[c.sym]
      for (let e = beat; e < beat + c.beats - 1e-9; e += 0.5) {
        const t = tl.timeAt(e)
        if (t >= gap - 1e-6) break
        note(t, tl.beatLen(t) * 0.42, bm, 0.78 + 0.18 * p + g('bass', 0.025), 'bass', 'bass')
      }
      beat += c.beats
    })
    // the slide whistle when no SFX riser covers the TENSION
    const covered = tl.cues.filter(c => c.kind === 'riser').reduce((a, r) => a + Math.max(0, Math.min(ten.t1, r.t + r.dur) - Math.max(ten.t0, r.t)), 0)
    if (covered < 0.5 * (ten.t1 - ten.t0)) note(ten.t0, gap - ten.t0, 81, 0.85, 'whistle', 'lead', { from: 69 })
    drums.push({ t: P, inst: 'revcrash', vel: 1.0, len: Math.min(0.6, P - ten.t0), big: true })
  }

  // ---- P: the fanfare, voiced "ka-TA": a short brass "ka" on the downbeat with the hit (inside the payoff duck: it marks
  // the onset), then the sustained "TA" (D major doubled at the octave) from the next swung 16th to the and-of-2, on the
  // un-ducked react bus, so it blooms over the impact instead of playing 9 dB down under it
  {
    const pBar = tl.barAt(P + 1e-6)
    // the "TA" waits for the next swung 16th that leaves the payoff's other cues (a coin, a ding) their first 50 ms
    const busy = t => tl.cues.some(c => AUD.has(c.kind) && c.gain >= 0.4 && Math.abs(c.t - P) > 0.002 && c.t > t - 0.05 && c.t < t + 0.02)
    const tTa = [2, 3, 4].map(k => tl.step(pBar, k, SWING)).find(t => !busy(t)) ?? tl.step(pBar, 4, SWING)
    const dur = tl.step(pBar, 7, SWING) - tTa - 0.02
    // (a payoff marked by a ding or a pop, not a hit, keeps its first 50 ms: the "ka" is left out, the crash marks P)
    const bellP = tl.cues.some(c => Math.abs(c.t - P) <= 0.015 && (c.kind === 'ding' || c.kind === 'pop')) && !tl.cues.some(c => Math.abs(c.t - P) <= 0.015 && c.kind === 'hit')
    if (!bellP) for (const m of [62, 66, 69, 74]) note(P, bar16(P) * 0.9, m, 1.0, 'honkF', 'brass')
    for (const m of [62, 66, 69, 74, 78, 81, 86]) note(tTa, dur, m, 1.0, 'honkFR', 'brass', { bus: 'react' })
    drum(P, 'timp', 1.0, { midi: 38 })
    drum(P, 'crash', 0.9, { tau: 1.4 })
    drum(P, 'snare', 1.0)
    drum(P, 'clap', 0.9)
    // the glock line over the DROP (A5 on P)
    for (const n of dropLine) note(n.t, n.dur, n.midi, n.vel + g('glock', 0.04), 'glock', 'glock', { pan: clamp(0.12 + (n.midi - 81) / 40, -0.1, 0.35) })
  }

  // ---- BREAK: dominant pad (from the harmony), pizz tremolo on A3, a reverse crash into V
  const brk = tl.section('BREAK')
  if (brk) {
    for (let beat = brk.b0; beat < brk.b1 - 1e-9; beat += 0.25) {
      const t = tl.timeAt(beat), p = (beat - brk.b0) / Math.max(0.25, brk.b1 - brk.b0)
      note(t, bar16(t) * 0.9, 57, 0.38 + 0.4 * p + g('pizz', 0.03), 'pizz', 'pizz')
    }
  }
  if (V != null) {
    // the brass button and its crash on the react bus (the verdict ding ducks the band; the button is the band's own
    // punctuation of the verdict, so it is not ducked by it)
    // it answers the ding one swung 16th later ("ding! ba-DAM"), so the verdict's first 50 ms are the ding's own (B3)
    const tB = tl.step(tl.barAt(V + 1e-6), 2, SWING)
    for (const m of [62, 66, 69, 74]) note(tB, tl.beatLen(V) * 0.5, m, 0.95 + g('brass', 0.02), 'honkR', 'brass', { bus: 'react' })
    drum(tB, 'crashR', 0.5, { bus: 'react' })
    // the band's downbeat (kick and bass) comes with the button: the verdict's downbeat is the ding's alone
    for (let j = drums.length - 1; j >= 0; j--) if (drums[j].inst === 'kick' && Math.abs(drums[j].t - V) < 0.002) drums.splice(j, 1)
    for (let j = notes.length - 1; j >= 0; j--) if (notes[j].inst === 'bass' && Math.abs(notes[j].t - V) < 0.002) notes.splice(j, 1)
    drum(tB, 'kick', 1.0)
    const vb = notes.find(n => n.inst === 'bass' && n.t > tB + 1e-4)
    note(tB, Math.max(0.05, Math.min(tl.beatLen(V) * 0.42, (vb ? vb.t : tB + 1) - tB - 0.01)), T.placePc(tl.chordAt(V + 1e-6).bass, 38), 0.95 + g('bass', 0.02), 'bass', 'bass')
    drums.push({ t: V, inst: 'revcrash', vel: 0.45, len: brk ? Math.min(0.6, V - brk.t0 + 0.25) : 0.4 })
  }

  // ---- CADENCE: a snare + tom fill on the last beat, into the card
  {
    // on the swung 16ths, with the shaker (straight 16ths here flammed with it by ~20 ms on the 2nd and 4th)
    const b1 = tl.anchors.base.beat - 1
    const at = k => tl.timeAt(b1 + k * 0.25 + (k % 2 ? (SWING - 0.5) * 0.5 : 0))
    drum(at(0), 'snare', 0.55 + g('snare', 0.03))
    drum(at(1), 'tom', 0.68 + g('tom', 0.03), { f0: 170, f1: 125 })
    drum(at(2), 'snare', 0.72 + g('snare', 0.03))
    drum(at(3), 'tom', 0.86 + g('tom', 0.03), { f0: 128, f1: 90 })
  }

  // ---- catch the hit (bible §6.6.2): a brass stab of the current chord at the cue time, at most one per 2 bars, on the
  // react bus (the hit's own 6 dB duck would otherwise swallow the band's answer to it)
  {
    let lastCatch = -Infinity
    for (const c of tl.cues) {
      if (c.kind !== 'hit' || c.gain < 0.85 || c.t >= base - 1e-6 || tl.isAnchor(c.t, 0.015) || inGap(c.t)) continue
      if (c.t - lastCatch < 8 * tl.beatLen(c.t)) continue
      const ch = tl.chordAt(c.t + 1e-6)
      const tri = T.voicing(ch.sym, { n: 3, lo: 57, hi: 72 })
      let any = false
      const v = 0.93 + g('brass', 0.03)
      for (const m of tri) any = note(c.t, tl.beatLen(c.t) * 0.5, m, v + g('brass', 0.02), 'honkR', 'brass', { bus: 'react' }) || any
      if (any) lastCatch = c.t
    }
  }

  // ---- the bass makes room for a bloop, a ding, a landing or a footstep (gain >= 0.4): a note ringing into it is
  // choked 5 ms before it; a note starting within 60 ms of a bloop or ding is left out (the bounce is staccato; a missing
  // 16th reads as a rest), one starting with a landing or a step answers it 70 ms later (the thud is the downbeat, the
  // bass bounces off it)
  // (every cue B3 listens to, 2026-10-13: an impact is a landing the bass answers, a coin a bell it leaves out; a dense
  // body put bass notes inside 05b's light hits)
  const LAND = new Set(['thud', 'step', 'hit'])
  for (const c of tl.cues) {
    if (!['pop', 'ding', 'thud', 'step', 'hit', 'cash'].includes(c.kind) || c.gain < 0.4 || c.inCard || c.t >= base - 1e-6 || Math.abs(c.t - P) < 0.02 || (V != null && Math.abs(c.t - V) < 0.02)) continue
    for (let j = notes.length - 1; j >= 0; j--) {
      const n = notes[j]
      if (n.inst !== 'bass' || n.t + n.dur < c.t - 0.01 || n.t > c.t + 0.06 || tl.isAnchor(n.t)) continue
      if (n.t < c.t - 0.06) n.dur = Math.max(0.03, c.t - 0.005 - n.t)
      else if (!LAND.has(c.kind) || n.t > c.t + 0.015) notes.splice(j, 1)
      else { const d = n.t + n.dur - (c.t + 0.07); if (d < 0.04) notes.splice(j, 1); else { n.t = c.t + 0.07; n.dur = d } }
    }
  }

  // ---- de-duplicate drums placed twice (anchors), and the gap's release (10 ms) for every music voice
  const seen = new Set()
  const dd = drums.filter(d => { const k = `${d.inst}@${Math.round(d.t * 1000)}`; if (seen.has(k)) return false; seen.add(k); return true })
  spreadGuard([...notes, ...dd], base)
  const gain = {}
  // the band's tilt against the SFX (balance.mjs): presence (drums, brass) and bass up for dull SFX, toys down
  const tilt = tl.becker.tilt.tilt
  // dull SFX (tilt > 0, the cues crowd the 1 kHz octave: bloops, dings, taps): the drums' and brass's presence up, and
  // the low-mids (bass, kick, the pad) up, so the band frames the cues' octave from both sides; bright SFX (tilt < 0):
  // presence eased. The toys (marimba, glock, pizz) are never moved: they are the look
  // (presence: +1.6 dB per tilt unit when dull (not the shaker and tambourine: 8 kHz is not where dull cues leave a
  // hole), -1 when bright; bass and pad +1 when dull; toys +1 when bright;
  // the glock, the one toy that sings in the cues' own octave, steps back 1 dB per unit when the cues crowd it)
  const TILT = { snare: 1, clap: 1, ghost: 1, roll: 1, shaker: 1, tamb: 1, honk: 1, honkF: 1, honkR: 1, honkFR: 1 }
  // (the bass's dull lift frames dull cues from below; when the cues' own landings already carry the 125 Hz octave as
  // much as their bells carry the 1 kHz one, it is withheld: LOW.span dB of the cues' 125-over-1k octave takes it away)
  const tb = tl.becker.tilt, x125 = tb.l125 != null && tb.l1k != null ? tb.l125 - tb.l1k : -Infinity
  const lowYield = clamp(1 - x125 / LOW.span, 0, 1)
  const TOYS = { mallet: 1, glock: 1, pizz: 1 }
  for (const inst of new Set([...notes, ...dd].map(e => e.inst))) {
    const w = TILT[inst] || 0
    const off = inst === 'bass' ? Math.max(0, tilt) * lowYield : inst === 'pad' ? Math.max(0, tilt) : inst === 'glock' && tilt > 0 ? -1.0 * tilt : TOYS[inst] ? 1.0 * Math.max(0, -tilt)
      : w * (tilt > 0 ? (inst === 'shaker' || inst === 'tamb' ? 0 : 1.6) : 1) * tilt
    if (inst === 'revcrash') { if (off) gain[inst] = [{ t: 0, db: off }]; continue }
    gain[inst] = [{ t: gap - 0.0005, db: off }, { t: gap + 0.010, db: -90 }, { t: P - 0.0002, db: -90 }, { t: P, db: off }]
  }
  // the roll's crescendo: -6 dB at the TENSION start -> 0 dB at the gap, on top of its velocity ramp
  // the card's trim against this teaser's master gain (balance.mjs): every logo voice
  const cardDb = tl.becker.music.card || 0
  if (cardDb) for (const inst of ['logoMallet', 'logoPizz', 'logoGlock', 'logoEcho', 'logoHonk', 'logoPad', 'logoTimp', 'logoCrash', 'logoSwell']) gain[inst] = [{ t: 0, db: cardDb }]
  if (ten) { const o = tilt; gain.roll = [{ t: ten.t0, db: -6 + o }, { t: gap - 0.001, db: o }, { t: gap + 0.010, db: -90 }, { t: P - 0.0002, db: -90 }, { t: P, db: o }] }
  // band-selective clearance (a dynamic-EQ dip of the band's 400 Hz-4 kHz voices): under a pop, ding, cash, tick, step
  // or roll the mid voices step back while the bass, kick, shaker and the react bus keep the groove going, so the
  // broadband duck stays at the §7 depths (no pumping of the sustained bass)
  {
    const dp = dipPoints(tl, gap, P, base)
    if (dp.length) for (const inst of MID) {
      if (!gain[inst]) continue
      const off = gain[inst][0].db
      gain[inst] = [...gain[inst], ...dp.map(x => ({ t: x.t, db: off + x.db }))].sort((a, b) => a.t - b.t)
    }
    // the fanfare's "TA" (un-ducked) steps back under the payoff's own coins, dings and landings that follow the hit
    const dpP = dipPoints(tl, gap, P, base, { payoff: true })
    // ... and so does the band's own payoff crash (τ 1.4 s, ringing over them once the payoff duck lets go)
    for (const inst of ['honkFR', 'crash']) if (dpP.length && gain[inst]) { const off = gain[inst][0].db; gain[inst] = [...gain[inst], ...dpP.filter(x => x.t > P).map(x => ({ t: x.t, db: off + x.db }))].sort((a, b) => a.t - b.t) }
    // the reverse crash swells into P through the gap: a cue B3 listens to inside its swell gets its first 50 ms
    // (8 dB down, back by P - 10 ms so the swell still lands on P)
    const inSwell = tl.cues.filter(c => AUD.has(c.kind) && c.gain >= 0.4 && !c.inCard && c.t > P - 0.6 && c.t < P - 0.06)
    if (inSwell.length && gain.revcrash) {
      const off = gain.revcrash[0].db, pts = [...gain.revcrash]
      for (const c of inSwell) pts.push({ t: c.t - 0.005, db: off }, { t: c.t, db: off - 8 }, { t: c.t + OWN, db: off - 8 }, { t: Math.min(P - 0.01, c.t + OWN + 0.03), db: off })
      gain.revcrash = pts.sort((a, b) => a.t - b.t)
    } else if (inSwell.length) {
      const pts = [{ t: 0, db: 0 }]
      for (const c of inSwell) pts.push({ t: c.t - 0.005, db: 0 }, { t: c.t, db: -8 }, { t: c.t + OWN, db: -8 }, { t: Math.min(P - 0.01, c.t + OWN + 0.03), db: 0 })
      gain.revcrash = pts.sort((a, b) => a.t - b.t)
    }
  }
  // energy shaping on the music bus (bible B7: the DROP stands >= 2 LU over the BUILD, the HOLD sits under the DROP,
  // the BUILD's second half is not quieter than its first): dB per bar from its energy, ramped over 60 ms at bar lines
  const musicDb = []
  // a one-bar DROP hands its weight to the CADENCE's first bar (the payoff holds two bars before the band winds down)
  const pBar = tl.bars.find(b => Math.abs(b.t - P) < 0.002), twoBars = pBar ? 2 * pBar.beats * 60 / pBar.bpm : 4
  // a DROP of a single bar (short specs) stands 0.5 dB higher, so its 2-bar payoff window clears the BUILD by 2 LU
  const oneBarDrop = tl.bars.filter(b => b.section === 'DROP').length === 1
  const lvl = b => (b.section === 'TENSION' ? null : b.section === 'BREAK' ? -2 : b.energy >= 5 ? (oneBarDrop ? 1.6 : 1.1) : b.energy === 4 ? 0
    : /HOLD/.test(b.section) ? -5.5 : b.section === 'CADENCE' && b.t < P + twoBars - 0.05 ? 0 : b.section === 'HOOK' ? -1.7 - CLIMB.hookSettle : -1.7)
  // the BUILD climbs (B7): a crescendo of CLIMB.ramp dB across the section, centred on the bar levels
  const bld = tl.section('BUILD')
  const climbAt = t => (bld && t >= bld.t0 - 1e-6 && t < bld.t1 ? CLIMB.ramp * ((t - bld.t0) / Math.max(1e-3, bld.t1 - bld.t0) - 0.5) : 0)
  for (const b of tl.bars) {
    if (b.t >= base - 1e-6) break
    if (b.section === 'TENSION' || (b.split && b.split.some(x => x.section === 'TENSION'))) {
      const t0 = ten ? ten.t0 : b.t
      if (b.t < t0 - 1e-6) { musicDb.push({ t: b.t + 0.03, db: lvl(b) ?? -1 }); musicDb.push({ t: t0, db: lvl(b) ?? -1 }) }
      musicDb.push({ t: t0 + 0.03, db: -1 }, { t: P - 0.01, db: 1 })
      continue
    }
    const d = lvl(b)
    if (bld && b.section === 'BUILD') {
      // a crescendo bar: the level climbs from the bar line to the next (points every beat)
      const t1 = Math.min(b.t1, base), nb = Math.max(1, Math.round(b.beats))
      musicDb.push({ t: Math.max(0, b.t - 0.03), db: musicDb.length ? musicDb[musicDb.length - 1].db : d + climbAt(b.t) }, { t: b.t + 0.03, db: d + climbAt(b.t + 0.03) })
      for (let k = 1; k <= nb; k++) { const t = b.t + (t1 - b.t) * k / nb - (k === nb ? 0.031 : 0); musicDb.push({ t, db: +(d + climbAt(t)).toFixed(3) }) }
      continue
    }
    musicDb.push({ t: Math.max(0, b.t - 0.03), db: musicDb.length ? musicDb[musicDb.length - 1].db : d }, { t: b.t + 0.03, db: d })
  }
  musicDb.push({ t: base, db: musicDb.length ? musicDb[musicDb.length - 1].db : 0 })
  for (const x of musicDb) x.db = +(x.db + mTrim).toFixed(3)
  // the payoff's own cues keep the payoff duck (B3; 2026-10-13): the coins, dings, pops and landings that follow the hit
  // within PAYOFF_OWN s are part of the payoff, so the band stays down under each of their first 50 ms (the payoff duck's
  // depth and release) instead of blooming back over them. (Until now the hit's 1.1 s crash filled those windows and
  // B3 counted it as theirs; the crash is now a splash, see sfx.mjs SPLASH.) music.dry, and so B7, is pre-duck
  const pd = mix.payoffDuck || { depth: 9, release: 0.3 }
  const duck = tl.cues.filter(c => AUD.has(c.kind) && c.gain >= 0.4 && !c.inCard && c.t > P + 0.002 && c.t <= P + PAYOFF_OWN && c.t < base - 1e-6)
    .map(c => ({ t: c.t, depth: pd.depth, hold: OWN, release: pd.release }))
  return { notes, drums: dd, automation: { gain, musicDb, ...(duck.length ? { duck } : {}) } }
}

/**
 * The climb (bible B7; 2026-10-13). B7 compares the BUILD's two halves through 3 s loudness windows. In a condensed cut
 * the HOOK is 1-3 s long, so the windows of the BUILD's first half still hold the hook's "ta-da" and its E3 settle bar,
 * and the cues' dips and the deflate in its second half can tip the comparison (01b fell 0.14 LU, 05b rose only 0.28).
 * So the hook's settle bars sit CLIMB.hookSettle dB under the BUILD's E3 start (the ta-da itself, its first bar, keeps
 * its level: A7, S10), and the BUILD is a crescendo of CLIMB.ramp dB across its length, centred on the bar levels, so
 * the BUILD's mean (and B7's DROP-over-BUILD) is unchanged.
 */
export const CLIMB = { hookSettle: 1.5, ramp: 1.5 }
/** the bass's dull lift yields to the cues' landings: gone when the cues' 125 Hz octave stands LOW.span dB over their 1 kHz octave */
export const LOW = { span: 5 }

/**
 * The velocity spread guard (bible §9.4 S8; added 2026-10-13 for the condensed cuts). S8 reads each voice's raw velocity
 * spread (written accent x humanising jitter) over the body and wants it in 0.03-0.15. The written accents put the kick,
 * snare, roll, shaker and marimba near the top of that window (0.12-0.15 on the long bodies) and the pad and pizz chops,
 * whose accents are nearly flat, near its floor (0.03-0.06). A long body averages over a hundred events; a condensed one
 * has 8-20, and a handful of fills, heartbeat kicks or one chord more or less pushes the spread over an edge (02a's snare
 * 0.162 with 8 events, 01c's pizz 0.028, 03a's pad 0.029). So each voice S8 gates (>= SPREAD.minEvents body events, not
 * one of its accent-only voices) keeps its spread in SPREAD.lo-SPREAD.hi, the middle of the window: when it falls outside,
 * the velocities are scaled about the voice's mean (the accent shape and the order of the hits stay, only their depth
 * changes; the boost is at most SPREAD.maxBoost). The t = 0 hits keep at least their written 0.9 (S10). Deterministic.
 */
export const SPREAD = { lo: 0.06, hi: 0.12, minEvents: 8, maxBoost: 2.5, accentOnly: ['revcrash', 'timp', 'crash', 'whistle', 'honkF', 'strings'] }
function spreadGuard(events, base) {
  const skip = new Set(SPREAD.accentOnly), by = new Map()
  for (const e of events) if (e.t < base - 1e-6 && e.role !== 'logo' && !skip.has(e.inst)) { if (!by.has(e.inst)) by.set(e.inst, []); by.get(e.inst).push(e) }
  for (const evs of by.values()) {
    if (evs.length < SPREAD.minEvents) continue
    const v = evs.map(e => e.vel), m = v.reduce((a, b) => a + b, 0) / v.length
    const sd = Math.sqrt(v.reduce((a, b) => a + (b - m) ** 2, 0) / v.length)
    const k = sd > SPREAD.hi ? SPREAD.hi / sd : sd < SPREAD.lo && sd > 1e-6 ? Math.min(SPREAD.maxBoost, SPREAD.lo / sd) : 1
    if (k === 1) continue
    for (const e of evs) {
      const w = clamp(m + (e.vel - m) * k, 0.05, 1)
      e.vel = +(Math.abs(e.t) < 1e-3 ? Math.max(w, Math.min(e.vel, 0.9)) : w).toFixed(4)
    }
  }
}

/** the band's mid voices (the 400 Hz-4 kHz band of the mix): the toys, brass, strings, pad, snare family */
const MID = ['mallet', 'glock', 'pizz', 'honk', 'honkF', 'strings', 'pad', 'snare', 'clap', 'ghost', 'tom', 'whistle']
/** dip per cue kind: [depth dB (scaled by clamp(gain / 0.4, 0.3, 1)), hold s, release τ s] */
export const DIP = { pop: [6, 0.05, 0.1], ding: [6, 0.08, 0.22], cash: [6, 0.1, 0.3], tick: [3, 0.03, 0.08], step: [4, 0.03, 0.07], roll: [5, 0, 0.15], thud: [4, 0.05, 0.14], whoosh: [2.5, 0.05, 0.12], hit: [4, 0.05, 0.14] }
/** the payoff's dips (only the fanfare's "TA" is under them): every B3 kind after the hit, 8 dB */
const DIP_P = { pop: [8, 0.05, 0.1], ding: [8, 0.08, 0.2], cash: [8, 0.1, 0.25], thud: [8, 0.05, 0.14], hit: [8, 0.08, 0.2], reveal: [8, 0.08, 0.2] }
/**
 * The dip curve as gain points ({ t, db }, db <= 0, 2.5 ms apart where it moves, 0 dB at both ends): 5 ms lookahead
 * ramp, hold (a roll holds over its length), exponential release; the deepest cue wins. None around the payoff
 * (the payoff duck owns it), in the card, or after base.
 */
function dipPoints(tl, gap, P, base, { payoff = false } = {}) {
  const dt = 0.0025, n = Math.ceil(base / dt) + 1, c = new Float64Array(n)
  for (const q of tl.cues) {
    const d = payoff ? DIP_P[q.kind] : DIP[q.kind]
    if (!d || q.inCard || q.t >= base - 1e-6) continue
    if (payoff ? !(q.t > P + 0.002 && q.t < P + 1.2) : (q.t > gap - 0.05 && q.t < P + 0.4)) continue
    // the full dip down to gain 0.4 (the small foley at its usual 0.25-0.55 must read: a step, a tap, a ratchet), less
    // for the cues a spec marks as background (a 0.14 tick is meant to be felt, not heard)
    const depth = d[0] * clamp(q.gain / 0.4, 0.3, 1), hold = q.kind === 'roll' ? (q.dur || 0) : d[1], rel = d[2]
    const k0 = Math.max(0, Math.floor((q.t - 0.005) / dt)), k1 = Math.min(n - 1, Math.ceil((q.t + hold + 5 * rel) / dt))
    for (let k = k0; k <= k1; k++) {
      const t = k * dt
      if (!payoff && t > gap - 0.003 && t < P + 0.4) continue
      const v = t < q.t ? -depth * (t - (q.t - 0.005)) / 0.005 : t <= q.t + hold ? -depth : -depth * Math.exp(-(t - q.t - hold) / rel)
      if (v < c[k]) c[k] = v
    }
  }
  const out = []
  for (let k = 0; k < n; k++) {
    if (c[k] > -0.05 && (k === 0 || c[k - 1] > -0.05) && (k === n - 1 || c[k + 1] > -0.05)) continue
    out.push({ t: +(k * dt).toFixed(4), db: c[k] > -0.05 ? 0 : +c[k].toFixed(2) })
  }
  return out
}

/**
 * Glock answers (bible §6.5 BUILD, §4.6.4 via §6.6.6): in sparse bars at E >= 3, a 2-bar call and answer. The call is
 * the em motif (+5 +2 +5 semitones, "da-da-da-DAAA", rhythm 16-16-8-quarter or 8-8-8-quarter) starting on a chord tone
 * and landing on beat 3; the answer steps down the scale to a chord tone on the next bar's beat 1. No 2-bar phrase
 * more than twice; the next call starts within 5 st of the last note when it can.
 */
function glockPhrases(tl, { secAt, base, V, hum, isDense, fixed = [] }) {
  const out = []
  const used = new Map()
  const ok = new Set(['BUILD', 'HOLD', 'HOLD2'])
  const scale = [2, 4, 6, 7, 9, 11, 1]
  const down = m => { for (let d = 1; d <= 2; d++) if (scale.includes(((m - d) % 12 + 12) % 12)) return m - d; return m - 1 }
  const Vend = V != null ? V + 8 * tl.beatLen(V) : null
  let prev = null, prevEnd = -Infinity, k = 0, i = 0
  const bars = tl.bars
  // the DROP line's last note leads into the HOLD
  while (i + 1 < bars.length) {
    const b = bars[i], nb = bars[i + 1]
    const st = (bb, s) => tl.step(bb, s, SWING)
    const tA = st(b, 3), tLand = nb.t, tEnd = Math.min(nb.t1, st(nb, 9))
    // the call and answer weave between the cues (bible §4.6.4 via §6.6.6, the glock in the lead role): no big cue
    // (coins, hits, rolls, a buzz) in the 2 bars, and no bell-like cue (pop, ding, tick, boing: the glock's own
    // register) within 120 ms of a glock onset. Throws (swipe, thud), steps and scribbles may pass under the tune
    const onsets = [3, 5, 6, 7, 9, 13, 14, 15].map(k => st(b, k)).concat([tLand])
    const good = b.beats === 4 && nb.beats >= 2 && b.energy >= 3 && tEnd < base - 1e-6
      && [b.t + 1e-3, tA, st(b, 9), st(b, 16), tLand, tEnd - 1e-3].every(t => ok.has(secAt(t)))
      && !(V != null && tEnd > V - 1e-6 && tA < Vend)
      && !tl.cues.some(c => c.t >= tA - 0.12 && c.t < tEnd && ((W[c.kind] || 0) >= 1.5 || c.kind === 'roll' || c.kind === 'buzz'))
      && !tl.cues.some(c => BELL.has(c.kind) && onsets.some(t => Math.abs(c.t - t) < 0.12))
      && !tl.cues.some(c => c.kind === 'roll' && c.t < tEnd && c.t + c.dur > tA)
      && ![tA, st(b, 9), st(b, 13), tLand].some(isDense)
    if (!good) { i++; continue }
    const ch1 = tl.chordAt(st(b, 9) + 1e-6), ch1a = tl.chordAt(tA + 1e-6), ch2 = tl.chordAt(tLand + 1e-6)
    if (ch1.sym !== ch1a.sym || /Gm|°/.test(ch1.sym + ch2.sym)) { i++; continue }
    // the melody's last note before this call: an answer already placed, or the DROP line
    const before = [...fixed.filter(n => n.t < tA - 1e-6), ...out.filter(n => n.t < tA - 1e-6)].sort((a, c) => a.t - c.t).pop()
    if (before && before.t + before.dur > prevEnd - 1e-9) { prev = before.midi; prevEnd = before.t + before.dur }
    // and the first one after it (the DROP line): the answer must not end on a leap into it
    const after = fixed.filter(n => n.t >= tA).sort((a, c) => a.t - c.t)[0]
    if (after && after.t < tEnd + 0.7) { i++; continue }
    const near = prev != null && tA - prevEnd < 0.7
    const cands = T.tonesIn(ch1, 74, 81).filter(s => D_MAJOR.has(((s + 5) % 12 + 12) % 12) && D_MAJOR.has(((s + 7) % 12 + 12) % 12) && ((s % 12) + 12) % 12 !== 1
      && (prev == null || Math.abs(s - prev) <= (near ? 5 : 12)))
    const rhythms = [[3, 5, 7], [5, 6, 7]]
    const choices = []
    for (const s of cands) for (let r = 0; r < 2; r++) {
      const X = s + 12
      // the answer: step down the scale from X to the first chord tone of the landing chord at least 2 steps below
      const pass = []
      let y = down(X)
      while (pass.length < 3 && !(pass.length >= 1 && T.isChordTone(ch2, y))) { pass.push(y); y = down(y) }
      if (!T.isChordTone(ch2, y)) continue
      const key = `${s}|${r}|${pass.join(',')}|${y}`
      if ((used.get(key) || 0) >= 2) continue
      const lead = prev == null ? 0 : Math.abs(s - prev)
      choices.push({ s, r, X, pass, land: y, key, cost: (lead > 5 ? 10 + lead : lead) + (r === k % 2 ? 0 : 1.5) + Math.max(0, X - 88) * 0.6 + (used.get(key) || 0) * 3 + hum() * 0.8 })
    }
    if (!choices.length) { i++; continue }
    choices.sort((a, c) => a.cost - c.cost)
    const c = choices[0]
    used.set(c.key, (used.get(c.key) || 0) + 1)
    const s16 = tl.beatLen(b.t) / 4
    const [p1, p2, p3] = rhythms[c.r]
    const lens = c.r === 0 ? [2, 2, 2] : [1, 1, 2]
    ;[c.s, c.s + 5, c.s + 7].forEach((m, j) => out.push({ t: st(b, [p1, p2, p3][j]), dur: lens[j] * s16 * 0.95, midi: m, vel: [0.62, 0.68, 0.74][j], bar: b.i }))
    out.push({ t: st(b, 9), dur: 4 * s16 * 0.98, midi: c.X, vel: 0.86, bar: b.i })
    const ps = c.pass.length === 1 ? [13] : c.pass.length === 2 ? [13, 15] : [13, 14, 15]
    const pl = c.pass.length === 1 ? [4] : c.pass.length === 2 ? [2, 2] : [1, 1, 2]
    c.pass.forEach((m, j) => out.push({ t: st(b, ps[j]), dur: pl[j] * s16 * 0.95, midi: m, vel: 0.66 - 0.04 * j, bar: b.i }))
    out.push({ t: tLand, dur: Math.min(6 * s16, tEnd - tLand), midi: c.land, vel: 0.78, bar: nb.i })
    prev = c.land
    prevEnd = tLand + Math.min(6 * s16, tEnd - tLand)
    k++
    i += 2
    // breathe: after two answers in a row, leave a bar
    if (k % 2 === 0) i++
  }
  return out
}

// ---------------------------------------------------------------- the em sting, "toy fanfare" (bible §3.1-3.2)
export function logo(tl, ctx) {
  const m = ctx.motif
  if (!m) return { notes: [], drums: [] }
  const L = m.L, end = tl.duration
  const notes = [], drums = []
  for (const n of m.notes) {
    if (n.n < 4) {
      notes.push({ t: n.t, dur: n.gate, midi: n.midi, vel: n.vel, pan: n.pan, inst: 'logoMallet', role: 'logo', gate: true })
      notes.push({ t: n.t, dur: n.gate, midi: n.midi - 12, vel: n.vel * 0.4, pan: n.pan, inst: 'logoPizz', role: 'logo' })   // -8 dB
    } else {
      notes.push({ t: n.t, dur: n.gate, midi: n.midi, vel: 1.0, pan: 0, inst: 'logoGlock', role: 'logo', tauScale: 1.15 })
      for (const p of [62, 66, 69, 74]) notes.push({ t: L, dur: 0.42, midi: p, vel: 0.9, inst: 'logoHonk', role: 'logo' })
    }
  }
  // the echo of n4 (glock only), low-passed at 3 kHz
  for (const e of m.echoes) notes.push({ t: e.t, dur: 0.6, midi: 81, vel: Math.pow(10, e.db / 20), inst: 'logoEcho', role: 'logo', lp: e.lp, tauScale: 1.15 })
  // D add9 under n4: the warm pad D3 A3 E4 F#4 held to the card end (the D2 is the timpani's)
  for (const v of m.chord.voicing.slice(1)) notes.push({ t: L, dur: Math.max(0.2, end - L), midi: v, vel: 0.62, inst: 'logoPad', role: 'logo', fast: true, release: 0.05, hp: 150 })
  drums.push({ t: L, inst: 'logoTimp', vel: 1.0, midi: 38 })
  drums.push({ t: L, inst: 'logoCrash', vel: 0.5 })
  drums.push({ t: L, inst: 'logoSwell', vel: Math.pow(10, m.swell.db / 20), len: m.swell.dur })
  return { notes, drums }
}
