// Scoreboard arrangement (sound bible §4.4-§4.6): "neon scoreboard trap". Half-time drums (clap on beat 3), an 808,
// a 16th-note pluck "ticker" arp, the SB-Glass pad, arena stabs and crashes on the anchors, the em-motif lead in
// sparse bars, and a TENSION that rolls into a silent eighth before P. Everything hangs on the engine's timeline:
// bars, sections, energy, density, the anchors P / V / base, and the cues the music reacts to.
//
// Streams (bible §1): one per layer, created once: hum:kick, hum:clap, hum:hat, hum:arp, hum:bass, hum:pad, hum:snare,
// hum:lead (humanising), arr:fill, arr:trap, arr:lead (arrangement choices). `rng` (arr:compose) is not used, so the
// layers never share draws.
import * as T from '../../../src/sound/theory.mjs'
import { ARP_CUT } from './instruments.mjs'
import { voiceLead } from './voicing.mjs'
import { planFor, rawSfx, cueCtx, clearFor, bedSec, resetSolves } from './sfx.mjs'
import { energyCurve, setCurve, withOpening } from './energy.mjs'
import { prepareBed, stabBudget, selAutomation, GIVE_WAY, eventRenderer, renderSpan } from './clearance.mjs'
import { kfilter, cueTrim } from './balance.mjs'
import { CAL } from './cal.mjs'

const EPS = 1e-6
const W = { tick: 0.5, type: 0.5, pop: 0.5, swipe: 0.5, whoosh: 0.5, step: 0.5, thud: 1, ding: 1, buzz: 1, boing: 1, cash: 1.5, hit: 2, reveal: 2, roll: 2, riser: 0 }
const KICK = {
  A: [[1, 1.0], [11, 0.75]],
  B: [[1, 1.0], [7, 0.7], [11, 0.8]],
  C: [[1, 1.0], [4, 0.6], [11, 0.8], [15, 0.65]],
  half: [[1, 1.0]],
}
const HAT16 = [1.0, 0.45, 0.7, 0.45]
/** the pad's voices, bottom to top, are weighted +2 / +0.4 / -1.1 / -2.5 dB: the warmth sits in the low voice (the
 * 250 Hz octave of §9.2), and the top voice stays out of the 1 kHz octave that the dings and ticks already fill */
const PAD_TILT = [1.25, 1.05, 0.88, 0.75]
const ARP = { up: [0, 7, 12, 'T'], updown: [0, 7, 12, 'T', 19, 'T', 12, 7], pedal: [12, 0, 'T', 0, 19, 0, 'T', 0] }
const ARP_ALT = { up: 'updown', updown: 'pedal', pedal: 'up' }
const DMIN = [2, 4, 5, 7, 9, 10, 0]
const mod12 = x => ((x % 12) + 12) % 12
const clamp = (x, a, b) => (x < a ? a : x > b ? b : x)
const dB = d => Math.pow(10, d / 20)

/** diatonic step in D minor from MIDI m (m in the scale; else from the nearest scale tone below) by k steps */
function dstep(m, k) {
  let x = m
  while (!DMIN.includes(mod12(x))) x--
  const dir = Math.sign(k)
  for (let s = 0; s < Math.abs(k); s++) { do { x += dir } while (!DMIN.includes(mod12(x))) }
  return x
}
/** the third (or sus) interval of a chord above its root, in semitones */
function thirdOf(ch) { const iv = ch.intervals.map(mod12); return iv.includes(3) ? 3 : iv.includes(4) ? 4 : iv.includes(5) ? 5 : iv.includes(2) ? 2 : 7 }

export function compose(tl) {
  const notes = [], drums = []
  const base = tl.base, P = tl.anchors.P.t, Pb = tl.anchors.P.beat, gapT = tl.anchors.P.gap
  const V = tl.anchors.V ? tl.anchors.V.t : null
  const S = name => tl.section(name)
  const tension = S('TENSION'), drop = S('DROP')
  const secAt = t => tl.sectionAt(t + EPS).name
  const bars = tl.bars.filter(b => b.t < base - EPS)
  const hum = {}
  for (const k of ['kick', 'clap', 'hat', 'arp', 'bass', 'pad', 'snare', 'lead']) hum[k] = tl.stream(`hum:${k}`)
  const arr = { fill: tl.stream('arr:fill'), trap: tl.stream('arr:trap'), lead: tl.stream('arr:lead') }
  const g = (r, sd) => clamp(r.gauss() * sd, -2.5 * sd, 2.5 * sd)
  const stepT = (b, s) => tl.timeAt(b.beat + (s - 1) / 4)
  const beatLenAt = t => tl.beatLen(t)
  const heavy = c => (W[c.kind] || 0) >= 1
  const cuesIn = (t0, t1) => tl.cues.filter(c => c.t >= t0 - EPS && c.t < t1 - EPS)
  const beatIdx = t => Math.floor(tl.beatAt(t) + 1e-6)
  const beatInfo = t => tl.beats[beatIdx(t)] || null
  const inGap = t => t >= gapT - EPS && t < P - EPS
  const nearAnchor = (t, tol = 0.001) => tl.isAnchor(t, tol)
  // clock trains (§4.6.6): a train whose ticks sit off the 16th grid (by > 12 ms) would flam against the hats and the
  // ticker, so no music onset (kick, clap, snare, hat, arp, lead) lands 12-60 ms from one of its ticks (anchors excepted:
  // they never yield). A fast off-grid train (period < 1.5 beats: 02b, 02c) is the hats while it runs: the music hats
  // rest and the arp plays quarter notes. 10c's 1.000 s train is 10 16ths at 150 BPM, on the grid: nothing changes there
  const err16 = t => { const x = tl.beatAt(t) * 4; return Math.abs(x - Math.round(x)) * tl.beatLen(t) / 4 }
  const offTrains = tl.trains.filter(tr => tr.members.some(i => err16(tl.cues[i].t) > 0.012))
  const ticks = offTrains.flatMap(tr => tr.members.map(i => tl.cues[i].t)).sort((a, b) => a - b)
  const flams = t => !nearAnchor(t) && ticks.some(x => { const d = Math.abs(x - t); return d >= 0.0105 && d <= 0.0615 })
  const fastTrainAt = t => offTrains.find(tr => tr.period < 1.5 * tl.beatLen(tr.t0) && t >= tr.t0 - 0.05 && t <= tr.t1 + tr.period * 0.5) || null
  const tickIn = (t0, t1) => ticks.some(x => x >= t0 - 0.06 && x < t1 + 0.06)
  // a count that lands on frame 1 (a ding or pop at t = 0, B3): the hook's pad swells in, the arp rests its first 16th
  // and the hook crash drops to -9 dB, so the count reads over the board lighting up
  // one low body at V (§8.4.1, §4.6.1): when the verdict cue brings its own (a reveal's thud body, a hit, a thud), that
  // body is the kick at V, so neither the anchor nor the bar's pattern puts a music kick there
  const bodyAtV = V != null && tl.cues.some(c => ['reveal', 'hit', 'thud'].includes(c.kind) && c.gain >= 0.5 && Math.abs(c.t - V) <= 0.015)
  const countAtZero = tl.cues.some(c => c.t <= 0.02 && ['ding', 'pop', 'cash', 'reveal', 'thud', 'hit'].includes(c.kind) && c.gain >= 0.4)

  // ---------------------------------------------------------------- energy (§2.5, §4.6.5) and long-hold evolution
  // BUILD: after 4 bars without a cue of weight >= 1 the energy steps up (capped at E4), and the BUILD never steps down
  let run = 0, maxE = 0
  for (const b of bars) {
    if (b.section !== 'BUILD') { run = 0; continue }
    run = b.cueBar ? 0 : run + 1
    let E = b.energy
    if (run >= 5) E = Math.max(E, 4)
    maxE = Math.max(maxE, E)
    b.energy = maxE
  }
  // position in a quiet run (bars without a weight >= 1 cue), for the "every 2 bars something changes" rule
  const qpos = new Map()
  { let q = 0; for (const b of bars) { q = b.cueBar ? 0 : q + 1; qpos.set(b.i, q) } }
  const varOf = b => {
    const q = qpos.get(b.i) || 0
    const k = q >= 3 ? Math.floor((q - 1) / 2) : 0
    const m = k % 4
    return { k, cut: k === 0 ? 1 : m === 1 ? 1.2 : m === 0 ? 0.82 : 1, swap: k > 0 && (m === 1 || m === 3), alt: k > 0 && (m === 2 || m === 0), oct: k > 0 && m === 3 }
  }

  // ---------------------------------------------------------------- events
  const drum = (t, inst, vel, extra = {}) => {
    if (t >= base - EPS || t < -EPS || inGap(t)) return false
    if (/kick|clap|snare|hat/.test(inst) && flams(t)) return false
    if (inst === 'kick' && bodyAtV && Math.abs(t - V) <= 0.001) return false
    if (/kick|clap|snare/.test(inst)) {
      const y = tl.drumYield(t); if (y.action === 'drop') return false
      // B3: a music hit inside a pitched cue's first 50 ms masks it, so kicks, claps and snares also give way to dings
      // and pops (gain >= 0.4) within ±70 ms; anchors never yield
      if (!nearAnchor(t) && tl.cues.some(c => (c.kind === 'ding' || c.kind === 'pop') && c.gain >= 0.4 && Math.abs(c.t - t) <= 0.07)) return false
    }
    drums.push({ t: Math.max(0, t), inst, vel: clamp(vel, 0.05, 1), ...extra })
    return true
  }
  const note = (n) => {
    if (n.t >= base - EPS || inGap(n.t)) return
    if ((n.role === 'arp' || n.role === 'lead') && flams(n.t)) return
    notes.push(n)
  }

  // ---------------------------------------------------------------- groove per bar (§4.4, §4.5)
  const VEnd = V != null ? tl.timeAt(tl.anchors.V.beat + 8) : null   // no lead in the 2 bars after V
  const grooveFor = (b, secName) => {
    const E = b.energy
    const v = varOf(b)
    const isPickupHook = b.i === 0
    let gr
    switch (secName) {
      case 'HOOK':
        gr = isPickupHook
          ? { kick: 'B', clap: true, hats: 16, bass: 'B', arp: 'updown', rate: 16, cut: ARP_CUT[4], E: 4 }
          : { kick: 'A', clap: true, hats: 8, bass: 'A', arp: 'up', rate: 16, cut: ARP_CUT[3], E: 3 }
        break
      case 'BUILD':
        gr = E >= 4
          ? { kick: b.phraseBar === 3 ? 'C' : 'B', clap: true, hats: 16, trap: true, bass: 'B', arp: 'updown', rate: 16, cut: ARP_CUT[4], lead: true, fill: b.phraseBar === 3, E: 4 }
          : { kick: 'A', clap: true, hats: 8, bass: 'A', arp: 'up', rate: 16, cut: ARP_CUT[3], lead: (qpos.get(b.i) || 0) >= 3, fill: b.phraseBar === 3, E: 3 }
        break
      case 'DROP': {
        const j = bars.filter(x => x.section === 'DROP' && x.i < b.i).length
        gr = { kick: j % 2 ? 'C' : 'B', clap: true, clap16: j % 2 === 1, hats: 16, trap: true, ohat: true, bass: 'B', arp: 'updown', rate: 16, cut: ARP_CUT[5], oct: true, E: 5 }
        break
      }
      case 'HOLD': case 'HOLD2': {
        const s = S(secName), j = bars.filter(x => x.section === secName && x.i < b.i).length
        gr = E >= 4
          ? { kick: 'A', clap: true, hats: 16, bass: 'A', arp: 'pedal', rate: 16, cut: 2600, lead: true, fill: j % 4 === 3, E: 4 }
          : { kick: 'half', clap: true, hats: 8, hatDb: -3, bass: 'whole', arp: 'pedal', rate: 8, cut: 2000, lead: true, fill: j % 4 === 3, E: 3 }
        void s
        break
      }
      case 'VERDICT': gr = { kick: 'B', clap: true, hats: 16, bass: 'B', arp: 'updown', rate: 16, cut: ARP_CUT[4], E: 4 }; break
      case 'CADENCE': gr = { kick: 'A', clap: true, hats: 8, bass: 'A', arp: 'up', rate: 16, cut: ARP_CUT[3], E: 3 }; break
      case 'BREAK': gr = { kick: null, clap: false, hats: 0, bass: 'whole', arp: 'up', rate: 8, cut: ARP_CUT[2], E: 2 }; break
      case 'TENSION': gr = { kick: null, clap: false, hats: 0, bass: 'pedal', arp: 'updown', rate: 16, oct: true, cut: 1400, E: 4, tension: true }; break
      default: gr = { kick: 'A', clap: true, hats: 8, bass: 'A', arp: 'up', rate: 16, cut: ARP_CUT[3], E: 3 }
    }
    // long holds evolve (§4.6.5): cutoff ±20%, K-A <-> K-B, the arp pattern, the arp octave
    if (!gr.tension && secName !== 'DROP' && secName !== 'BREAK') {
      gr.cut *= v.cut
      if (v.swap && gr.kick === 'A') gr.kick = 'B'; else if (v.swap && gr.kick === 'B') gr.kick = 'A'
      if (v.alt) gr.arp = ARP_ALT[gr.arp]
      gr.arpOct = v.oct
    }
    if (V != null && b.t >= V - EPS && b.t < VEnd - EPS) gr.lead = false
    return gr
  }

  // ---------------------------------------------------------------- drums
  const trapState = { n: 0, first: arr.trap() < 0.5 ? 6 : 8 }
  const fillState = { n: 0 }
  const hatList = []   // { t, idx } for open-hat chokes
  for (const b of bars) {
    const nSteps = Math.round(b.beats * 4)
    const secIdx = (name) => bars.filter(x => x.section === name && x.i < b.i).length
    for (let s = 1; s <= nSteps; s++) {
      const t = stepT(b, s)
      if (t >= base - EPS) break
      const sn = secAt(t)
      const gr = grooveFor(b, sn)
      if (gr.tension || sn === 'BREAK') continue
      const beatInBar = Math.floor((s - 1) / 4)       // 0-based
      const lastBeat = beatInBar === Math.round(b.beats) - 1
      // fills own the last beat of a 4th bar (§4.4), unless a weight >= 1 cue or a dense beat sits there
      const bt0 = tl.timeAt(b.beat + beatInBar), bt1 = tl.timeAt(b.beat + beatInBar + 1)
      const bi = beatInfo(bt0 + EPS)
      const fillHere = gr.fill && lastBeat && b.beats >= 4 - EPS && !cuesIn(bt0, bt1).some(heavy) && !(bi && bi.dense) && secAt(bt0) === sn
      // kick
      const kp = KICK[gr.kick]
      if (kp) for (const [ks, kv] of kp) if (ks === s) drum(t, 'kick', kv - Math.abs(g(hum.kick, 0.04)))
      // clap on beat 3 (step 9); E5: step 16 every 2nd bar
      if (gr.clap && s === 9) drum(t, 'clap', 1.0 - Math.abs(g(hum.clap, 0.05)))
      if (gr.clap16 && s === 16) drum(t, 'clap', 0.4 + g(hum.clap, 0.03))
      // hats: 8ths at E <= 3 (and while a clock train runs), 16ths with accents at E >= 4; muted under rolls
      let hats = gr.hats
      if (hats === 16 && tl.trainAt(t)) hats = 8
      if (fastTrainAt(t)) hats = 0
      const shelf = gr.E >= 5 ? { shelf: -2 } : {}
      if (fillHere) continue
      if (!hats) continue
      const trapBeat = gr.trap && hats === 16 && lastBeat && b.beats >= 4 - EPS && secIdx(sn) % 2 === 1
      if (trapBeat) {
        if (s !== 13) continue
        const kind = (trapState.n % 2 === 0) ? trapState.first : (trapState.first === 6 ? 8 : 6)
        trapState.n++
        for (let k = 0; k < kind; k++) {
          const th = tl.timeAt(b.beat + 3 + k / kind)
          if (tl.rollAt(th)) continue
          const vel = 0.4 + 0.45 * k / (kind - 1)
          if (drum(th + g(hum.hat, 0.0015), 'hat', vel + g(hum.hat, 0.04), { pitch: 2 * k, pan: 0.12, ...shelf })) hatList.push(drums[drums.length - 1])
        }
        continue
      }
      if (hats === 8 && (s - 1) % 2 === 1) continue
      if (tl.rollAt(t)) continue
      const open = gr.ohat && (s === 7 || s === 15)
      let vel = hats === 16 ? HAT16[(s - 1) % 4] : ((s - 1) % 4 === 0 ? 0.8 : 0.55)
      if (open) vel = 0.6
      vel *= dB(gr.hatDb || 0)
      const th = Math.max(0, t + g(hum.hat, 0.003))
      if (drum(th, 'hat', vel + g(hum.hat, 0.05), { pan: open ? -0.15 : 0.12, ...(open ? { open: true } : {}), ...shelf })) hatList.push(drums[drums.length - 1])
    }
    // the fill on the last beat of a 4th bar: a 32nd hat roll or four snare 16ths (seeded)
    const sn0 = secAt(b.t)
    const gr0 = grooveFor(b, sn0)
    if (gr0.fill && b.beats >= 4 - EPS && !gr0.tension) {
      const bt0 = tl.timeAt(b.beat + 3), bt1 = tl.timeAt(b.beat + 4)
      const bi = beatInfo(bt0 + EPS)
      if (secAt(bt0) === sn0 && bt1 <= base + EPS && !cuesIn(bt0, bt1).some(heavy) && !(bi && bi.dense)) {
        const snareFill = (fillState.n++ % 2 === 0) ? arr.fill() < 0.5 : arr.fill() < 0.6
        if (snareFill) for (let k = 0; k < 4; k++) drum(tl.timeAt(b.beat + 3 + k / 4), 'snare', 0.5 + 0.1 * k + g(hum.snare, 0.03))
        else for (let k = 0; k < 8; k++) { const th = tl.timeAt(b.beat + 3 + k / 8); if (!tl.rollAt(th) && drum(th + g(hum.hat, 0.0015), 'hat', 0.45 + 0.4 * k / 7 + g(hum.hat, 0.03), { pan: 0.12 })) hatList.push(drums[drums.length - 1]) }
      }
    }
  }
  // the pickup bar's last beat: a 4-hit snare fill (§4.5 HOOK)
  if (bars[0] && bars[0].pickup) {
    const b = bars[0], k0 = b.beat + b.beats - 1
    for (let k = 0; k < 4; k++) drum(tl.timeAt(k0 + k / 4), 'snare', 0.5 + 0.12 * k + g(hum.snare, 0.03))
  }
  // the CADENCE's last beat: a 16th snare fill 0.5 -> 0.9 (§4.5)
  const cad = S('CADENCE')
  if (cad) {
    const k0 = tl.anchors.base.beat - 1
    for (let k = 0; k < 4; k++) drum(tl.timeAt(k0 + k / 4), 'snare', 0.5 + (0.4 * k) / 3 + g(hum.snare, 0.02))
  }
  // open hats are choked by the next closed hat
  hatList.sort((a, b) => a.t - b.t)
  hatList.forEach((h, i) => { if (h.open) { const nx = hatList.slice(i + 1).find(x => !x.open); if (nx) h.choke = Math.max(0.01, nx.t - h.t) } })

  // ---------------------------------------------------------------- TENSION: snare roll, music riser (§4.5)
  if (tension) {
    const b0 = tension.b0, Tn = Pb - b0, q = Tn / 4
    const subs = [0.5, 0.25, 1 / 6, 0.125]
    const hits = []
    for (let k = 0; k < 4; k++) {
      const a = b0 + k * q, z = Math.min(b0 + (k + 1) * q, Pb - 0.5)
      if (z <= a + EPS) continue
      for (let x = Math.ceil(a / subs[k] - 1e-6) * subs[k]; x < z - 1e-6; x += subs[k]) if (!hits.length || x > hits[hits.length - 1] + 1e-6) hits.push(x)
    }
    for (const x of hits) {
      const p = (x - b0) / Math.max(1e-6, Tn - 0.5)
      drum(tl.timeAt(x), 'snare', 0.35 + 0.65 * clamp(p, 0, 1) + g(hum.snare, 0.02), { pitchUp: 7 * clamp(p, 0, 1) })
    }
    // the music riser plays only when no SFX riser covers the TENSION
    const covered = tl.cues.some(c => c.kind === 'riser' && Math.min(c.t + c.dur, P) - Math.max(c.t, tension.t0) >= 0.5 * (P - tension.t0))
    // like every music voice it is released at the gap (§4.5): the gap then holds only the reverse crash, so the drop is
    // a clean onset in the music stem (B5) even under the 9 dB payoff duck
    if (!covered) drums.push({ t: tension.t0, inst: 'mriser', vel: 1, dur: gapT - tension.t0 })
  }

  // ---------------------------------------------------------------- anchors: the hook, the drop, the verdict
  // the stadium stab (§4.3 SB-Stab) on the three anchors. At P and V it plays on the react bus (routing.mjs: no event
  // duck; mix.react via 'logo': no musicDb, no glue), HP'd at 250 Hz so the cue's body keeps the low end, its level budgeted against the anchor's
  // cues after the bed is known (clearance.mjs stabBudget): the arena chord rings over the impact instead of under a
  // 9-15 dB duck. The hook's stab stays on the music bus (S10 wants it at velocity >= 0.9 on frame 1)
  const anchorStabs = []
  const stabChord = (t, sym, vel, extra = {}) => {
    // D3 A3 D4 F4 A4 D5 for Dm (root, 5th, root, 3rd, 5th, root); Dm(add9) puts the 9th (E5) on top
    const ch = T.chord(sym)
    const root3 = T.placePc(ch.root, 45), th = thirdOf(ch)
    const add9 = ch.intervals.includes(14)
    const v = [root3, root3 + 7, root3 + 12, root3 + 12 + th, root3 + 19, add9 ? root3 + 26 : root3 + 24]
    v.forEach((m, k) => { const n = { t, dur: 0.32, midi: m, vel, inst: 'stab', role: 'stab', ...extra, ...(k === 5 ? { noise: true } : {}) }; notes.push(n); if (extra.bus) anchorStabs.push(n) })
  }
  const hookSym = tl.chordAt(0).sym, pSym = tl.chordAt(P + EPS).sym
  stabChord(0, hookSym, 1)
  drums.push({ t: 0, inst: 'kick', vel: 1 }, { t: 0, inst: 'crash', vel: dB(countAtZero ? -9 : -3), tau: 0.9 })
  stabChord(P, pSym, 1, { bus: 'react' })
  // a hit at P brings its own wide crash (τ 0.9 s): the music's crash then stays out, the reverse crash still leads in, so
  // the most-watched second is not three crashes and E5's open hats in one wash. A payoff without a hit keeps it (τ 1.0 s)
  const hitOwnsP = tl.cues.some(c => c.kind === 'hit' && Math.abs(c.t - P) <= 0.015)
  // the reverse crash into P rides the react bus: the gap's duck (below) clears the body and halves the reverb tails
  // (a hard cut before the drop), and the swell still leads in
  drums.push({ t: P, inst: 'kick', vel: 1 }, { t: P, inst: 'clap', vel: 1 }, { t: P, inst: 'revcrash', vel: 0.9, len: 0.6, bus: 'react' })
  if (!hitOwnsP) drums.push({ t: P, inst: 'crash', vel: 1, tau: 1.0 })
  notes.push({ t: P, dur: 1.2, midi: 26, vel: 1, inst: 'sub', role: 'bass' })
  if (V != null) {
    stabChord(V, tl.chordAt(V + EPS).sym, dB(-3), { bus: 'react' })
    // one low body (§8.4.1, §4.6.1): when the verdict cue brings its own (a reveal's thud body, a hit, a thud), that body
    // is the kick at V; the music answers with the stab, the crash and the 808
    if (!bodyAtV) drums.push({ t: V, inst: 'kick', vel: 1 })
    drums.push({ t: V, inst: 'crash', vel: dB(-6), tau: 0.9 }, { t: V, inst: 'revcrash', vel: S('BREAK') ? 0.45 : 0.3, len: 0.6 })
  }

  // ---------------------------------------------------------------- the 808 (§4.3, §4.4)
  const bass = []
  {
    const line = []   // { t, t1, midi, vel, dive?, diveTau?, tail?, oct? }
    for (const b of bars) {
      const nSteps = Math.round(b.beats * 4)
      const t1Bar = Math.min(base, b.t1)
      // onsets: the rhythm's steps (per section at that step), plus every chord change inside the bar
      const ons = []
      for (let s = 1; s <= nSteps; s++) {
        const t = stepT(b, s)
        if (t >= base - EPS) break
        const sn = secAt(t), gr = grooveFor(b, sn)
        const rh = gr.bass
        const first = s === 1 || secAt(stepT(b, s) - 1e-4) !== sn
        if (rh === 'A' && (s === 1 || s === 11 || first)) ons.push({ s, t, hold: s === 11 ? 4 : 6, sn })
        else if (rh === 'B' && (s === 1 || s === 7 || s === 11 || s === 15 || first)) ons.push({ s, t, hold: s === 1 ? 6 : s === 15 ? 2 : 4, oct: s === 15, sn })
        else if ((rh === 'whole' || rh === 'pedal') && first) ons.push({ s, t, hold: 64, sn })
      }
      for (const h of tl.harmony) if (h.t0 > b.t + EPS && h.t0 < t1Bar - EPS && !ons.some(o => Math.abs(o.t - h.t0) < 0.01)) {
        const sn = secAt(h.t0)
        if (sn === 'TENSION' || grooveFor(b, sn).bass) ons.push({ s: 1 + (tl.beatAt(h.t0) - b.beat) * 4, t: h.t0, hold: 64, sn, change: true })
      }
      ons.sort((a, c) => a.t - c.t)
      ons.forEach((o, k) => {
        if (inGap(o.t)) return
        const holdEnd = tl.timeAt(b.beat + (o.s - 1 + o.hold) / 4)
        const next = ons[k + 1]
        let t1 = Math.min(holdEnd, next ? next.t : t1Bar, t1Bar, base)
        const ch = tl.chordAt(o.t + EPS)
        let midi = T.placePc(ch.bass, 34)
        if (o.oct) midi += 12
        const anchor = Math.abs(o.t) < 0.001 || Math.abs(o.t - P) < 0.001
        line.push({ t: o.t, t1, midi, vel: anchor ? 1 : clamp(0.88 + g(hum.bass, 0.04), 0.75, 0.97), anchor, isP: Math.abs(o.t - P) < 0.001, oct: !!o.oct, sn: o.sn, change: !!o.change })
      })
    }
    // a chord change that keeps the bass (A7sus4 -> A7, Asus4 -> A) continues the note instead of re-attacking it; the
    // rhythm's own onsets (K-B's 1, 7, 11: the 808 knock) always re-attack. Then ties and glides
    const out = []
    for (const n of line) {
      const last = out[out.length - 1]
      if (last && n.change && last.midi === n.midi && Math.abs(last.t1 - n.t) < 0.002 && !n.anchor) { last.t1 = n.t1; continue }
      out.push(n)
    }
    out.forEach((n, k) => {
      const nx = out[k + 1]
      const tied = nx && Math.abs(nx.t - n.t1) < 0.002
      const ev = { t: n.t, dur: Math.max(0.03, n.t1 - n.t), midi: n.midi, vel: n.vel, inst: 'b808', role: 'bass', rel: tied ? 0.012 : 0.04 }
      if (n.anchor) { ev.dive = 12; ev.diveTau = 0.05 }
      if (n.isP) ev.tail = 0.9
      // rhythm B's octave pop glides into the next root; other ties glide when <= 7 st away (§4.3)
      if (tied && (n.oct || Math.abs(nx.midi - n.midi) <= 7) && nx.midi !== n.midi && !(nx.t >= gapT - EPS && nx.t < P + EPS)) ev.glideTo = { midi: nx.midi, time: 0.06 }
      notes.push(ev)
      bass.push(ev)
    })
    // a glide is legato (§4.3): the note it slides into does not re-attack (no new dive, no phase reset). The run's first
    // note renders the whole run as one voice (instruments.mjs b808: ev.path, ev.runDur); the score keeps every note
    for (let k = 0; k < bass.length; k++) {
      const head = bass[k]
      if (!head.glideTo || head.tiedIn) continue
      const path = [{ at: 0, midi: head.midi }]
      let j = k
      while (bass[j].glideTo && bass[j + 1] && Math.abs(bass[j + 1].t - (bass[j].t + bass[j].dur)) < 0.003) {
        const nx = bass[j + 1]
        nx.tiedIn = true
        path.push({ at: nx.t - head.t, midi: nx.midi })
        j++
      }
      if (j === k) continue
      head.path = path
      head.runDur = bass[j].t + bass[j].dur - head.t
      head.rel = bass[j].rel
      head.run = bass.slice(k + 1, j + 1)
    }
  }

  // ---------------------------------------------------------------- the arp "ticker" (§4.3, §4.4, §4.6)
  {
    const buzzes = tl.cues.filter(c => c.kind === 'buzz')
    const rests = [[P, P + beatLenAt(P + EPS)], ...(V != null ? [[V, V + beatLenAt(V + EPS)]] : []), ...buzzes.map(c => [c.t, c.t + beatLenAt(c.t)]),
      // one focal sound: the ticker skips the 16th under a pitched cue's first 50 ms (B3)
      ...tl.cues.filter(c => ['ding', 'pop', 'cash', 'reveal'].includes(c.kind) && c.gain >= 0.4).map(c => [c.t - 0.03, c.t + 0.06]),
      // the beat before a heavy cue (weight >= 1, gain >= 0.5) rests: the ticker breathes in and the count lands in the
      // space. Not when another heavy cue sits in the 2 beats before (a busy stretch would silence the ticker)
      ...preRests()]
    function preRests() {
      const hv = tl.cues.filter(c => (W[c.kind] || 0) >= 1 && c.kind !== 'roll' && c.gain >= 0.5 && !c.inCard && c.t < base - EPS && !nearAnchor(c.t, 0.015))
      return hv.filter((c, k) => !hv.slice(0, k).some(x => x.t > c.t - 2 * beatLenAt(c.t) && x.t < c.t - 0.02)).map(c => [c.t - beatLenAt(c.t) + 0.005, c.t])
    }
    for (const b of bars) {
      const nSteps = Math.round(b.beats * 4)
      for (let s = 1; s <= nSteps; s++) {
        const t = stepT(b, s)
        if (t >= base - EPS || inGap(t)) continue
        if (rests.some(([a, z]) => t >= a - EPS && t < z - EPS)) continue
        const sn = secAt(t), gr = grooveFor(b, sn)
        if (!gr.arp) continue
        // the phrase's last beat rests: it belongs to the fill
        if (gr.fill && b.beats >= 4 - EPS && Math.floor((s - 1) / 4) === Math.round(b.beats) - 1) continue
        const roll = !!tl.rollAt(t)
        const rate = roll ? 8 : gr.rate
        if (rate === 8 && (s - 1) % 2 === 1) continue
        // a fast off-grid clock train: quarter notes while it runs (the ticks carry the 16ths)
        const quarters = !!fastTrainAt(t)
        if (quarters && (s - 1) % 4 !== 0) continue
        // E3: the ticker is gated 3+3+2 (16ths 1, 4 and 7 of each half bar), a syncopated pluck under the HOOK's second bar,
        // the first half of the BUILD and the CADENCE; E4 opens to straight 16ths, which is the lift
        const pos8 = (s - 1) % 8
        const gated = rate === 16 && gr.E === 3 && !gr.tension && !roll && !quarters
        if (gated && pos8 !== 0 && pos8 !== 3 && pos8 !== 6) continue
        const pat = ARP[gr.arp]
        const idx = quarters ? Math.floor((s - 1) / 4) % pat.length : gated ? (Math.floor((s - 1) / 8) * 3 + [0, 3, 6].indexOf(pos8)) % pat.length : rate === 8 ? ((s - 1) / 2) % pat.length : (s - 1) % pat.length
        const ch = tl.chordAt(t + EPS)
        const root = T.placePc(ch.root, 57)
        const deg = pat[idx]
        let midi = root + (deg === 'T' ? 12 + thirdOf(ch) : deg)
        if (gr.arpOct && midi + 12 <= 86) midi += 12
        const onBeat = (s - 1) % 4 === 0
        let vel = onBeat ? 1 - Math.abs(g(hum.arp, 0.03)) : gated ? (pos8 === 3 ? 0.84 : 0.76) + g(hum.arp, 0.03) : 0.6 + 0.15 * hum.arp()
        const bi = beatInfo(t + EPS)
        let db = 0
        if (roll) db -= 4
        else if (bi && bi.dense) db -= 3
        const stepLen = (rate === 8 ? 0.5 : 0.25) * beatLenAt(t + EPS) * (gated ? (pos8 === 6 ? 2 : 3) : 1)
        let cut = gr.cut, cutEnd
        if (gr.tension) {
          // the cutoff rises with the pad's sweep: 1.4 kHz -> 8 kHz over the TENSION (exponential)
          const k = clamp((t - tension.t0) / Math.max(0.01, gapT - tension.t0), 0, 1)
          cut = 1400 * Math.pow(8000 / 1400, k)
          const k2 = clamp((t + stepLen - tension.t0) / Math.max(0.01, gapT - tension.t0), 0, 1)
          cutEnd = 1400 * Math.pow(8000 / 1400, k2)
        }
        const pan = (gated ? (pos8 === 3 ? 1 : -1) : s % 2 ? -1 : 1) * 0.25
        const v = clamp(vel * dB(db), 0.1, 1)
        // the square an octave down thickens 110-220 Hz under the pad: -10 dB in E3, -16 dB in E4, out in E5
        const sq = gr.E >= 5 ? -100 : gr.E === 4 ? -16 : -10
        note({ t, dur: stepLen, midi, vel: v, inst: 'arp', role: 'arp', pan, cut, sq, ...(cutEnd ? { cutEnd } : {}) })
        if ((gr.oct || gr.tension) && midi + 12 <= 98) note({ t, dur: stepLen, midi: midi + 12, vel: clamp(v * dB(-4), 0.05, 1), inst: 'arp', role: 'arp', pan: -pan, cut, sq: -100, ...(cutEnd ? { cutEnd } : {}) })
      }
    }
  }

  // ---------------------------------------------------------------- the SB-Glass pad, voice-led (§4.2, §4.3)
  {
    const spans = []
    for (const h of tl.harmony) {
      let t0 = h.t0, t1 = Math.min(h.t1, base)
      if (t0 >= base - EPS) continue
      if (t0 < P - EPS && t1 > gapT) t1 = gapT
      if (inGap(t0) || t1 - t0 < 0.05) continue
      const last = spans[spans.length - 1]
      // the pad sounds the chord (a slash chord's bass belongs to the 808)
      const sym = h.sym.split('/')[0]
      if (last && last.sym === sym && Math.abs(last.t1 - t0) < 0.002) { last.t1 = t1; continue }
      spans.push({ t0, t1, sym, free: Math.abs(t0 - P) < 0.002 })
    }
    const vs = voiceLead(spans)
    spans.forEach((sp, k) => {
      const sn = secAt(sp.t0)
      const bar = tl.barAt(sp.t0 + EPS)
      const E = sn === 'TENSION' ? 4 : sn === 'BREAK' ? 2 : bar ? bar.energy : 3
      const velBase = { 2: 0.55, 3: 0.6, 4: 0.68, 5: 0.8 }[E] || 0.6
      const fast = (sn === 'HOOK' && !(countAtZero && sp.t0 < 0.02)) || sn === 'DROP'
      const ev = { t: sp.t0, dur: sp.t1 - sp.t0, inst: 'pad', role: 'pad', a: fast ? 0.03 : 0.2, lp: E >= 5 ? 3700 : 2200 }
      if (sn === 'TENSION') ev.sweep = { t0: tension.t0, t1: gapT, f0: 900, f1: 8000 }
      if (sp.free) { ev.swell = 6; ev.swellDur = tl.timeAt(Pb + 4) - P }
      if (sp.t1 >= gapT - 0.002 && sp.t0 < gapT) ev.rel = 0.01
      const ord = [...vs[k]].sort((a, b) => a - b)
      for (const m of vs[k]) notes.push({ ...ev, midi: m, vel: clamp((velBase + g(hum.pad, 0.03)) * PAD_TILT[ord.indexOf(m)], 0.3, 1) })
    })
  }

  // ---------------------------------------------------------------- the em-motif lead in sparse bars (§4.6.4)
  {
    const uses = new Map()
    let lastLand = null
    const isA = sym => T.chord(sym).root === 9
    const eligible = b => {
      if (!b || b.beats < 4 - EPS || b.split || b.dense || b.cueBar || b.sparse < 2) return false
      if (tickIn(b.t, b.t1)) return false
      const sn = secAt(b.t)
      if (!['BUILD', 'HOLD', 'HOLD2'].includes(sn) || secAt(b.t1 - 0.01) !== sn) return false
      const gr = grooveFor(b, sn)
      if (!gr.lead) return false
      const chs = tl.harmony.filter(h => h.t0 < b.t1 - EPS && h.t1 > b.t + EPS)
      return !chs.some(h => isA(h.sym))
    }
    for (let i = 0; i + 1 < bars.length; i++) {
      const b1 = bars[i], b2 = bars[i + 1]
      if (!eligible(b1) || !eligible(b2) || b2.i !== b1.i + 1) continue
      const c1 = tl.chordAt(b1.t + EPS), c2 = tl.chordAt(b2.t + EPS)
      // the call: the em motif 5-1-2-5 transposed diatonically onto a chord tone in A4-D5 (5th, then 3rd, then root)
      const pref = [7, thirdOf(c1), 0, 14, 10, 11].map(iv => mod12(c1.root + iv))
      const starts = T.tonesIn(c1, 69, 74).filter(m => dstep(m, 7) <= 86)
      if (!starts.length) continue
      starts.sort((a, z) => pref.indexOf(mod12(a)) - pref.indexOf(mod12(z)) || (lastLand != null ? Math.abs(a - lastLand) - Math.abs(z - lastLand) : 0))
      const s0 = starts[0]
      const motif = [s0, dstep(s0, 3), dstep(s0, 4), dstep(s0, 7)]
      const top = motif[3]
      // rhythm variants: 16-16-8-long from beat 1, 8-8-8-long from beat 1, or 16-16-8 pickups landing on beat 3
      const variants = [
        { pos: [0, 0.25, 0.5, 1.0], dur: [0.25, 0.25, 0.5, 1.5] },
        { pos: [0, 0.5, 1.0, 1.5], dur: [0.5, 0.5, 0.5, 1.0] },
        { pos: [1.0, 1.25, 1.5, 2.0], dur: [0.25, 0.25, 0.5, 0.75] },
      ]
      let placed = false
      const order = [0, 1, 2].map(k => (k + arr.lead.int(3)) % 3)
      for (const vi of order) {
        const rv = variants[vi]
        const callEnd = rv.pos[3] + rv.dur[3]
        // the answer descends by step to a chord tone of the next bar's chord on its beat 1
        // every descent length that lands on a chord tone; a seeded pick that avoids repeating the last landing note
        const ds = [2, 3, 4, 5].filter(dd => c2.tones.includes(mod12(dstep(top, -(dd + 1)))))
        if (!ds.length) continue
        const fresh = ds.filter(dd => dstep(top, -(dd + 1)) !== lastLand)
        const pool = fresh.length ? fresh : ds
        const d = pool[arr.lead.int(pool.length)]
        const avail = 4 - callEnd
        const unit = d * 0.5 <= avail + 1e-9 ? 0.5 : d * 0.25 <= avail + 1e-9 ? 0.25 : null
        if (!unit) continue
        const dStart = 4 - d * unit
        // nothing but chord tones may start on beat 3 (S2)
        const desc = Array.from({ length: d }, (_, k) => ({ pos: dStart + k * unit, midi: dstep(top, -(k + 1)) }))
        if (desc.some(x => Math.abs(x.pos - 2) < 1e-9 && !c1.tones.includes(mod12(x.midi)))) continue
        const land = dstep(top, -(d + 1))
        const landDur = arr.lead() < 0.5 ? 1.5 : 2
        const sig = `${motif.join(',')}|${rv.pos.join(',')}|${desc.map(x => x.midi).join(',')}|${land}`
        if ((uses.get(sig) || 0) >= 2) continue
        uses.set(sig, (uses.get(sig) || 0) + 1)
        const bl = beatLenAt(b1.t + EPS)
        motif.forEach((m, k) => notes.push({ t: tl.timeAt(b1.beat + rv.pos[k]), dur: rv.dur[k] * bl * (k < 3 ? 0.85 : 0.95), midi: m, vel: clamp([0.78, 0.84, 0.9, 1.0][k] + g(hum.lead, 0.03), 0.5, 1), inst: 'lead', role: 'lead', pan: 0.08 }))
        desc.forEach((x, k) => notes.push({ t: tl.timeAt(b1.beat + x.pos), dur: unit * bl * (k === d - 1 ? 1.0 : 0.85), midi: x.midi, vel: clamp(0.82 - 0.03 * k + g(hum.lead, 0.03), 0.5, 1), inst: 'lead', role: 'lead', pan: 0.08 }))
        notes.push({ t: b2.t, dur: landDur * beatLenAt(b2.t + EPS), midi: land, vel: clamp(0.86 + g(hum.lead, 0.03), 0.5, 1), inst: 'lead', role: 'lead', pan: 0.08, glideFrom: desc[d - 1].midi })
        lastLand = land
        placed = true
        break
      }
      if (placed) i++
    }
  }

  // ---------------------------------------------------------------- the gap: every voice released in 10 ms at P - 1/8
  const cutForGap = e => {
    if (/rev/.test(e.inst)) return
    if (e.t < gapT - EPS && e.t + (e.dur || 0) + 0.6 > gapT) {
      e.cutAt = gapT - e.t
      if (e.dur != null && e.t + e.dur > gapT) e.dur = gapT - e.t
    }
  }
  notes.forEach(cutForGap); drums.forEach(cutForGap)
  // de-duplicate drums placed twice at the same time (anchors and patterns)
  const seen = new Set()
  const dd = drums.filter(d => { const k = `${d.inst}@${Math.round(d.t * 1000)}`; if (seen.has(k)) return false; seen.add(k); return true })
  const nn = notes.filter(n => !(n.t >= gapT - EPS && n.t < P - EPS))
  // every note's gate ends 1.5 ms before the next note's onset on the same grid: the score rounds t and dur to 0.1 ms
  // separately, and a note ending exactly where its successor starts would read as both sounding (§9.4 S14 counts
  // notes at once). The voices' own releases follow the gate, so nothing audible changes
  for (const n of nn) if (n.dur > 0.01) n.dur -= 0.0015
  const ddOut = dd.filter(d => !(d.t >= gapT - EPS && d.t < P - EPS) || /rev/.test(d.inst))
  const hits = ddOut.filter(d => /kick|snare|clap/.test(d.inst)).map(d => d.t)
  const sfxRender = c => rawSfx[c.kind](c, cueCtx(tl, c, new Map(), { dropTransient: !c.inCard && hits.some(h => Math.abs(h - c.t) <= 0.015) }))
  const er = eventRenderer(tl, nn, ddOut)
  // the opening: a teaser whose first 3 s would measure under -14.5 LUFS short-term (a sparse hook: a clock train that
  // is the hats, a few soft cues) lifts its music bus from 0.3 s to 3 s, by up to 2.5 dB (openingLift)
  let musicDb = energyCurve(tl)
  const lift = openingLift(tl, er, musicDb, sfxRender)
  if (lift > 0.05) musicDb = withOpening(musicDb, lift)
  setCurve(tl, musicDb)

  // ---------------------------------------------------------------- B3 clearance (clearance.mjs)
  // the bed is rendered at every B3 cue window from these final lists; the anchor stabs are budgeted against their cues;
  // the SFX fader is planned (balance.mjs); then each cue's levers are solved: the selective dips go out as gain
  // automation on the pad, arp, lead, hats, clap, snare and music riser, the 808 dips onto its notes, the broadband part
  // and the cue lifts reach the engine through the SFX renderers (sfx.mjs). When a teaser's cues are too quiet for the
  // fader to reach B1, the bed also gives way: the GIVE_WAY layers come down by 1.4x the plan's offset
  prepareBed(tl, nn, ddOut, { musicDb, sfxRender, er })
  // the anchor stabs are budgeted against their cues twice: before the plan (cues at their kit gain), then with the
  // fader's trims (a busy teaser's cut cues leave the stab less room), and the clearance is solved again
  for (const n of anchorStabs) { n.vel0 = n.vel; n.vel = n.vel0 * stabBudget(tl, n.t) }
  const plan = planFor(tl)
  const trimOf = c => cueTrim(c, Math.abs(c.t - P) <= 0.015, plan.trim)
  for (const n of anchorStabs) n.vel = n.vel0 * stabBudget(tl, n.t, trimOf)
  resetSolves(tl)
  const res = clearFor(tl)
  for (const [i, r] of res) {
    if (!(r.low > 0.05)) continue
    const c = tl.cues[i]
    for (const n of bass) {
      if (n.tiedIn) continue
      const end = n.t + (n.runDur ?? n.dur) + (n.rel ?? 0.04)
      // every 808 voice that sounds in the cue's 50 ms window dips, one that starts inside it included (it starts dipped)
      if (n.t < c.t + 0.05 && c.t < end) (n.dips = n.dips || []).push({ at: c.t - n.t, depth: r.low, hold: 0.05, release: 0.08 })
    }
  }
  const gain = selAutomation(tl, res, { offset: plan.offset, giveWay: GIVE_WAY })
  // the TENSION gap (§4.5): every music voice is released at P - 1/8; a 12 dB event duck over the gap takes the reverb
  // tails down 6 dB with them (the engine ducks the returns by half the music duck), so the eighth before the drop is a
  // hard cut with only the riser and the reverse crash in it. It lets go 40 ms before P (τ 10 ms), so the tails are back
  // under the drop's onset: a near-silent hole right before a full-band attack is where the AAC encoder overshoots (02c
  // measured +4.6 dB over the ceiling at P with the duck held to P - 3 ms); the payoff duck takes over at P
  const duck = P - gapT > 0.08 ? [{ t: gapT, depth: 12, attack: 0.008, hold: 0, until: P - 0.04, release: 0.01 }] : []
  return { notes: nn, drums: ddOut, automation: { musicDb, ...(Object.keys(gain).length ? { gain } : {}), ...(duck.length ? { duck } : {}) } }
}

/**
 * The opening lift (dB, >= 0): the first 3 s decide whether a viewer stays, so no teaser opens weak. The music over
 * [0, 3 s] (the actual events, the energy curve) and the cues there (gain applied, no fader trim) are summed and
 * K-weighted; the master gain is estimated from the calibration (CAL.GM minus the music model of balance.mjs without
 * ducks); the music is lifted until the short-term loudness at 3 s reaches -14.5 LUFS, by at most 2.5 dB. A loud opening
 * is left alone.
 */
const OPEN_AT = -14.5, OPEN_MAX = 2.5
/** per timeline: { lift, pred0, pred } (the predicted short-term loudness at 3 s before and after the lift; calibrate.mjs
 * compares pred with the render and stores the mean residual as CAL.OPEN_FIT: the returns, the ducks, the glue) */
export const OPENING = new WeakMap()
function openingLift(tl, er, musicDb, sfxRender) {
  const T1 = Math.min(3, tl.base), SR = 48000
  if (T1 < 2.5) { OPENING.set(tl, { lift: 0, pred0: null, pred: null }); return 0 }
  const m = renderSpan(tl, er, musicDb, 0, T1), n = m.L.length
  const s = { L: new Float64Array(n), R: new Float64Array(n) }
  for (const c of tl.cues) {
    if (c.t >= T1 || c.inCard) continue
    const b = sfxRender(c)
    if (!b) continue
    const st = b.L ? b : { L: b, R: b }, at = Math.round(c.t * SR) - (b.offset || 0)
    for (let i = Math.max(0, at); i < Math.min(n, at + st.L.length); i++) { s.L[i] += st.L[i - at] * c.gain; s.R[i] += st.R[i - at] * c.gain }
  }
  let mm = 0, ms = 0, ss = 0
  for (const ch of ['L', 'R']) {
    const a = kfilter(m[ch]), b = kfilter(s[ch])
    for (let i = 0; i < n; i++) { mm += a[i] * a[i]; ms += a[i] * b[i]; ss += b[i] * b[i] }
  }
  let bed = 0
  const K = Math.max(1, Math.floor(tl.base * 100))
  for (let k = 0; k < K; k++) bed += Math.pow(10, bedSec(tl, k / 100) / 10)
  const G = CAL.GM - (10 * Math.log10(bed / K) + CAL.M_FIT)
  const L = g => -0.691 + 10 * Math.log10(Math.max(1e-30, (g * g * mm + 2 * g * ms + ss) / n)) + G + (CAL.OPEN_FIT ?? 0)
  let lift = 0
  if (L(1) < OPEN_AT) {
    let lo = 1, hi = Math.pow(10, OPEN_MAX / 20)
    if (L(hi) < OPEN_AT) lift = OPEN_MAX
    else { for (let k = 0; k < 20; k++) { const mid = (lo + hi) / 2; if (L(mid) < OPEN_AT) lo = mid; else hi = mid } lift = 20 * Math.log10(hi) }
  }
  OPENING.set(tl, { lift, pred0: L(1), pred: L(Math.pow(10, lift / 20)) })
  return lift
}
