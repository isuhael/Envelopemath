// Becker Rig harmony (sound bible §6.2): D major, "toy-box funk".
//   HOOK D · BUILD phrases BR1 | D G Bm A |, then a seeded BR1/BR2, or BR3 | D C G D | for sneaking phrases
//   TENSION the chromatic climb D/F# -> G -> G#°7 -> A7 (bass F# G G# A), resolving to D at P
//   DROP | D | G·A | · HOLD | G F#m Bm A | (end-aligned before V, start-aligned before the CADENCE, HOLD 2 from its
//   2nd chord) · BREAK A7 · VERDICT D · CADENCE Em7 -> A7sus4 -> A7 (into the logo's D add9)
//   A bar with a buzz turns Gm (borrowed iv) from the buzz to the bar end: the deflate.

export const BR1 = ['D', 'G', 'Bm', 'A']
export const BR2 = ['D', 'Bm', 'G', 'A']
export const BR3 = ['D', 'C', 'G', 'D']
export const HOLDP = ['G', 'F#m', 'Bm', 'A']
const DROP = [['D'], ['G', 'A'], ['D'], ['Bm', 'A']]   // one entry per bar; two chords = 2 beats each

/**
 * Where a buzz's deflate ends (the Gm span and the band's 1-beat sag): the bar end, or, when less than a beat of the
 * bar is left, one beat after the next downbeat (if that bar is still before the TENSION gap and base)
 */
export function deflateEnd(tl, t) {
  const bar = tl.barAt(t), beat = tl.beatLen(t)
  if (bar.t1 - t >= beat - 1e-6) return bar.t1
  const next = tl.bars[bar.i + 1], P = tl.anchors.P
  if (!next || next.beats < 2) return bar.t1
  const end = tl.timeAt(next.beat + 1)
  const ten = tl.section('TENSION')
  if (end >= tl.base - 1e-6 || end > P.gap - 1e-6 || (ten && end > ten.t0 - 1e-6) || (next.t <= P.t + 1e-6 && end > P.t)) return bar.t1
  return end
}

/** the TENSION climb for T beats: [{ sym, beats }] (bible §6.2 table) */
export function climb(T) {
  const C = ['D/F#', 'G', 'G#°7', 'A7']
  if (T <= 1) return [{ sym: 'A7', beats: T }]
  if (T === 2) return [{ sym: 'G#°7', beats: 1 }, { sym: 'A7', beats: 1 }]
  if (T === 3) return [{ sym: 'G', beats: 1 }, { sym: 'G#°7', beats: 1 }, { sym: 'A7', beats: 1 }]
  if (T === 4) return C.map(sym => ({ sym, beats: 1 }))
  if (T < 8) return [{ sym: C[0], beats: T - 3 }, ...C.slice(1).map(sym => ({ sym, beats: 1 }))]
  if (T === 8) return C.map(sym => ({ sym, beats: 2 }))
  return [{ sym: C[0], beats: T - 6 }, ...C.slice(1).map(sym => ({ sym, beats: 2 }))]
}

/** a BUILD phrase "sneaks" (BR3) when every bar is at E <= 3 with >= 3 sparse beats on average */
const sneaking = (tl, ph) => {
  const bars = ph.bars.map(i => tl.bars[i])
  return bars.length >= 2 && bars.every(b => b.energy <= 3) && bars.reduce((a, b) => a + b.sparse, 0) / bars.length >= 3
}

export function harmony(tl, rng) {
  const plan = []
  const at = (beat, sym, extra = {}) => plan.push({ beat, sym, ...extra })
  const barsIn = s => tl.bars.filter(b => b.beat >= s.b0 - 1e-9 && b.beat < s.b1 - 1e-9)
  const hasV = !!tl.anchors.V
  const progs = []
  for (const s of tl.sections) {
    const bars = barsIn(s)
    switch (s.name) {
      case 'HOOK': for (const b of bars) at(b.beat, 'D'); break
      case 'BUILD': {
        for (const ph of tl.phrases) {
          let k
          if (ph.i === 0) k = 0
          else if (sneaking(tl, ph)) k = 2
          else k = rng.int(2)
          // never the same progression three phrases in a row
          if (progs.length >= 2 && progs[progs.length - 1] === k && progs[progs.length - 2] === k) k = k === 0 ? 1 : 0
          progs.push(k)
          const P_ = [BR1, BR2, BR3][k]
          ph.bars.forEach((bi, j) => at(tl.bars[bi].beat, P_[j % 4], { phrase: ph.i, prog: ['BR1', 'BR2', 'BR3'][k] }))
        }
        if (!tl.phrases.length) at(s.b0, 'D')
        break
      }
      case 'TENSION': {
        let b = s.b0
        for (const c of climb(Math.round(s.b1 - s.b0))) { at(b, c.sym, { climb: true }); b += c.beats }
        break
      }
      case 'DROP':
        bars.forEach((b, j) => {
          const ch = DROP[j % DROP.length]
          at(Math.max(b.beat, s.b0), ch[0])
          if (ch[1] && b.beats >= 4) at(b.beat + 2, ch[1])
        })
        if (!bars.length) at(s.b0, 'D')
        break
      case 'HOLD': case 'HOLD2': {
        const next = tl.sections[tl.sections.indexOf(s) + 1]
        const endAligned = s.name === 'HOLD' && hasV && next && (next.name === 'BREAK' || next.name === 'VERDICT')
        bars.forEach((b, j) => {
          const idx = s.name === 'HOLD2' ? 1 + j : endAligned ? HOLDP.length - bars.length + j : j
          at(Math.max(b.beat, s.b0), HOLDP[((idx % 4) + 4) % 4])
        })
        if (!bars.length) at(s.b0, endAligned ? 'A' : 'G')
        break
      }
      case 'BREAK': at(s.b0, 'A7'); break
      case 'VERDICT': at(s.b0, 'D'); break
      case 'CADENCE': {
        const T = s.b1 - s.b0
        if (T > 4 + 1e-9) at(s.b0, 'Em7')
        if (T > 2 + 1e-9) at(Math.max(s.b0, s.b1 - 4), 'A7sus4')
        at(Math.max(s.b0, s.b1 - 2), 'A7')
        break
      }
      default: break
    }
  }
  // the deflate: from a buzz to its bar end the chord is Gm (borrowed iv); the bar line after it restates its own chord.
  // A buzz with less than a beat left in its bar carries the Gm through the next downbeat and the chord comes back one
  // beat into that bar (a 125 ms Gm flicker reads as a mistake, not a deflate)
  plan.sort((a, b) => a.beat - b.beat)
  const out = plan.map(x => ({ ...x, t: tl.timeAt(x.beat) }))
  const P = tl.anchors.P
  for (const c of tl.cues) {
    if (c.kind !== 'buzz' || c.t >= tl.base - 1e-6 || (c.t >= P.gap - 1e-6 && c.t < P.t)) continue
    const sec = tl.sectionAt(c.t).name
    if (sec === 'TENSION') continue
    const end = deflateEnd(tl, c.t)
    const at = t => out.filter(x => x.t <= t + 1e-9).pop()
    const back = at(end)
    // the chord after the deflate (restate it so the Gm span stops there)
    if (!out.some(x => Math.abs(x.t - end) < 1e-6) && end < tl.base - 1e-6 && back) out.push({ t: end, sym: back.sym })
    // a chord change inside the deflate would cut it short: drop it
    for (let j = out.length - 1; j >= 0; j--) if (out[j].t > c.t + 1e-6 && out[j].t < end - 1e-6) out.splice(j, 1)
    out.push({ t: c.t, sym: 'Gm', deflate: true })
  }
  out.sort((a, b) => a.t - b.t)
  // keep one span per time (the last written wins)
  const dedup = []
  for (const x of out) { if (dedup.length && Math.abs(dedup[dedup.length - 1].t - x.t) < 1e-9) dedup[dedup.length - 1] = x; else dedup.push(x) }
  return dedup.map(({ beat, ...x }) => x)
}
