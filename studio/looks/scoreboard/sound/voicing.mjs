// Pad voicings for SB-Glass (sound bible §4.2, §9.4 S12): 4 voices in MIDI 57-76, voice-led over the whole teaser.
// The bible's sample voicings put G3 (55) under C, Gm9 and A7, outside its own 57-76 register, and Dm -> Dm(add9) as
// written moves a voice 7 st; so instead of a lookup table every chord gets its candidate voicings and a Viterbi pass
// picks the path with the least total movement under hard rules: every voice moves <= 5 st between consecutive chords
// (except into the first chord at P, after the TENSION gap), no adjacent minor 2nd (the E4-F4 cluster in a supersaw),
// and the chord's colour tones always present (a 9th chord with its 7th may leave its root to the 808).
import * as T from '../../../src/sound/theory.mjs'

const mod12 = x => ((x % 12) + 12) % 12
/** which pitch classes a 4-voice voicing must hold, and which may fill the remaining voices */
function needOf(ch) {
  const iv = ch.intervals.map(mod12), r = ch.root
  const has = i => iv.includes(i)
  const third = has(3) ? 3 : has(4) ? 4 : has(5) ? 5 : has(2) ? 2 : null
  const seventh = has(10) ? 10 : has(11) ? 11 : null
  const ninth = ch.intervals.includes(14) ? 2 : null
  // a 9th chord with its 7th (Gm9) is voiced rootless when it has to be (3rd, 7th, 9th and the 5th or the root): the 808
  // holds the root, and four voices cannot carry five tones and still lead by <= 5 st out of a Dm(add9) topped by E5
  const rootless = seventh != null && ninth != null
  const must = (rootless ? [third, seventh, ninth] : [0, third, seventh, ninth]).filter(x => x != null)
  const opt = [7, 0]
  const uniq = [...new Set(must)].map(i => mod12(r + i))
  return { must: uniq.slice(0, 4), fill: opt.map(i => mod12(r + i)), third: third != null ? mod12(r + third) : null, root: rootless ? mod12(r) : null }
}
/** every 4-note voicing of `sym` in [lo, hi] holding the needed tones, no adjacent semitone */
export function candidates(sym, { lo = 57, hi = 76 } = {}) {
  const ch = T.chord(sym)
  const pool = T.tonesIn(ch, lo, hi)
  const { must, third, root } = needOf(ch)
  const out = []
  const n = pool.length
  for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) for (let c = b + 1; c < n; c++) for (let d = c + 1; d < n; d++) {
    const v = [pool[a], pool[b], pool[c], pool[d]]
    const pcs = v.map(mod12)
    if (!must.every(p => pcs.includes(p))) continue
    if (v.some((m, i) => i > 0 && m - v[i - 1] === 1)) continue
    // own cost: stay near the register's centre, not too spread, avoid a doubled 3rd, avoid a low 3rd-and-root cluster
    const ctr = v.reduce((x, y) => x + y, 0) / 4
    let cost = 0.15 * Math.abs(ctr - 66) + 0.08 * Math.max(0, v[3] - v[0] - 14)
    if (third != null && pcs.filter(p => p === third).length > 1) cost += 1.5
    if (ch.intervals.includes(7) && ch.tones.length <= 3 && !pcs.includes(mod12(ch.root + 7))) cost += 1.2
    if (v[1] - v[0] <= 2) cost += 0.6
    if (root != null && !pcs.includes(root)) cost += 0.8   // rootless only when the leading needs it
    out.push({ v, cost })
  }
  return out
}
/**
 * Voice-lead a chord sequence: chords [{ sym, free? }] (free: no movement limit into this chord). Returns one voicing
 * per chord. Hard limit maxMove (5 st) on every voice; if no path exists the limit is relaxed for that step only.
 */
export function voiceLead(chords, { maxMove = 5, lo = 57, hi = 76 } = {}) {
  if (!chords.length) return []
  const cands = chords.map(c => candidates(c.sym, { lo, hi }))
  cands.forEach((cs, i) => { if (!cs.length) cands[i] = [{ v: T.voicing(chords[i].sym, { n: 4, lo, hi }), cost: 5 }] })
  let prev = cands[0].map(c => ({ cost: c.cost, back: -1 }))
  const backs = [prev]
  for (let k = 1; k < chords.length; k++) {
    const cur = []
    const free = !!chords[k].free
    for (const c of cands[k]) {
      let best = null
      for (let j = 0; j < cands[k - 1].length; j++) {
        const p = cands[k - 1][j].v
        let sum = 0, mx = 0
        for (let i = 0; i < 4; i++) { const d = Math.abs(c.v[i] - p[i]); sum += d; mx = Math.max(mx, d) }
        const pen = free ? 0.2 * sum : sum + (mx > maxMove ? 1000 : 0) + 0.02 * mx
        const tot = prev[j].cost + pen + c.cost
        if (!best || tot < best.cost - 1e-9) best = { cost: tot, back: j }
      }
      cur.push(best)
    }
    prev = cur
    backs.push(cur)
  }
  let j = 0
  for (let i = 1; i < prev.length; i++) if (prev[i].cost < prev[j].cost - 1e-9) j = i
  const out = new Array(chords.length)
  for (let k = chords.length - 1; k >= 0; k--) { out[k] = cands[k][j].v; j = backs[k][j].back }
  return out
}
