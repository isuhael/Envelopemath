// Scoreboard harmony plan (sound bible §4.2): D minor (Aeolian), A / A7 only in TENSION, before an anchor and in the
// CADENCE. One chord per bar except where the bible splits a bar (TENSION, the HOLD's A7sus4 · A7 bar, the CADENCE).
//
//   HOOK              Dm (the pickup bar 0 too)
//   BUILD phrase 1    SB1 | Dm | Bb | F | C |
//   later phrases     seeded pick of SB1, SB2 | Dm | C | Bb | Bb |, SB3 | Dm | F | C | Bb | (never 3 in a row)
//   DENSE bars        the bar's chord over a D pedal (Bb/D, Cadd9/D, F6/D): a roll >= 1.5 s or >= 6 cues in the bar
//   TENSION (T beats) Bb for T - 2q, C for q, A for q (Asus4 the first half, then A), q = ceil(T / 4)
//   DROP              | Dm | Bb |, extended | Gm | A | if 4 bars
//   HOLD              | Dm(add9) | Bbmaj7 | Gm9 | A7sus4 · A7 |, end-aligned before V, start-aligned before the CADENCE
//   BREAK             A7 (the dominant held into V)
//   VERDICT           Dm(add9)
//   HOLD2             the HOLD progression from its 2nd chord
//   CADENCE           everything before the last 4 beats Gm9, then A7sus4 (2), A7 (2): into the logo's D major
export const PROGS = [['Dm', 'Bb', 'F', 'C'], ['Dm', 'C', 'Bb', 'Bb'], ['Dm', 'F', 'C', 'Bb']]
export const HOLD_PROG = ['Dm(add9)', 'Bbmaj7', 'Gm9', 'A7sus4|A7']
const EPS = 1e-9
// the D pedal under a DENSE bar: Bb/D as written; C and F take the D into the chord (Cadd9/D, F6/D, the same notes
// over the pedal) so the pedal is a tone of the sounding chord (§9.4 S2 counts the chord's tones, not a slash bass)
const PEDAL = { Bb: 'Bb/D', C: 'Cadd9/D', F: 'F6/D' }

/** a bar the bible calls DENSE for harmony (§4.2): a roll of >= 1.5 s overlaps it, or it holds >= 6 cues */
export function denseHarmonyBar(tl, b) {
  const longRoll = (b.rolls || []).some(i => (tl.cues[i].dur || 0) >= 1.5 - EPS)
  return longRoll || b.cues >= 6
}

export function harmony(tl, rng) {
  const plan = []
  const at = (beat, sym, why) => plan.push({ beat, sym, why })
  const barsIn = s => tl.bars.filter(b => b.beat >= s.b0 - EPS && b.beat < s.b1 - EPS)
  const holdBar = (b, idx) => {
    const sym = HOLD_PROG[((idx % 4) + 4) % 4]
    if (sym.includes('|')) {
      const [a, c] = sym.split('|')
      if (b.beats >= 4 - EPS) { at(b.beat, a, 'hold'); at(b.beat + 2, c, 'hold') } else at(b.beat, c, 'hold')
    } else at(b.beat, sym, 'hold')
  }
  const history = []
  for (const s of tl.sections) {
    const bars = barsIn(s)
    switch (s.name) {
      case 'HOOK': at(s.b0, 'Dm', 'hook'); break
      case 'BUILD': {
        if (!tl.phrases.length) { at(s.b0, 'Dm', 'build'); break }
        for (const ph of tl.phrases) {
          let k = ph.i === 0 ? 0 : rng.int(PROGS.length)
          const n = history.length
          if (n >= 2 && history[n - 1] === k && history[n - 2] === k) k = (k + 1 + rng.int(PROGS.length - 1)) % PROGS.length
          history.push(k)
          ph.bars.forEach((bi, j) => {
            const b = tl.bars[bi]
            let sym = PROGS[k][j % 4]
            if (PEDAL[sym] && denseHarmonyBar(tl, b)) sym = PEDAL[sym]
            at(b.beat, sym, `SB${k + 1}`)
          })
        }
        break
      }
      case 'TENSION': {
        const Tn = s.b1 - s.b0, q = Math.ceil(Tn / 4 - EPS), first = Tn - 2 * q
        if (first > EPS) at(s.b0, 'Bb', 'tension')
        at(s.b1 - 2 * q, 'C', 'tension')
        at(s.b1 - q, 'Asus4', 'tension')
        at(s.b1 - q / 2, 'A', 'tension')
        break
      }
      case 'DROP': {
        const prog = bars.length >= 4 ? ['Dm', 'Bb', 'Gm', 'A'] : ['Dm', 'Bb']
        bars.forEach((b, j) => at(Math.max(b.beat, s.b0), prog[j % prog.length], 'drop'))
        if (!bars.length) at(s.b0, 'Dm', 'drop')
        break
      }
      case 'HOLD': {
        const endAligned = !!tl.anchors.V
        bars.forEach((b, j) => holdBar(b, endAligned ? 4 - (bars.length % 4) + j : j))
        break
      }
      case 'HOLD2': bars.forEach((b, j) => holdBar(b, 1 + j)); break
      case 'BREAK': at(s.b0, 'A7', 'break'); break
      case 'VERDICT': at(s.b0, 'Dm(add9)', 'verdict'); break
      case 'CADENCE': {
        const Tn = s.b1 - s.b0
        if (Tn > 4 + EPS) at(s.b0, 'Gm9', 'cadence')
        if (Tn > 2 + EPS) at(Math.max(s.b0, s.b1 - 4), 'A7sus4', 'cadence')
        at(Math.max(s.b0, s.b1 - 2), 'A7', 'cadence')
        break
      }
      default: break
    }
  }
  // spans that start at the same beat: the later entry wins (a TENSION chord on a split BUILD bar replaces nothing,
  // since it starts at its own beat); drop exact duplicates of the previous span's chord
  plan.sort((a, b) => a.beat - b.beat)
  const out = []
  for (const p of plan) {
    const last = out[out.length - 1]
    if (last && Math.abs(last.beat - p.beat) < EPS) { out[out.length - 1] = p; continue }
    if (last && last.sym === p.sym) continue
    out.push(p)
  }
  return out.map(({ beat, sym }) => ({ beat, sym }))
}
