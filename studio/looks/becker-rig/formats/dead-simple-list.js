// becker-rig · dead-simple-list (FORMATS.md §1): "N dead simple numbers" (P1).
//
// The list is a stack of ledges on the void, one numbered slot per item, all on screen and empty from frame 1:
// an outlined number tab, the label (dim until reached) and a dashed socket where the answer will go.
// The figure stands on the floor at the far right, right of the list, and does the maths with his hands, as a tool:
// every formula is split at its first operator. The number ("$100,000") drops into the slot as a white glyph
// block and types itself; the operator and the rest ("× 0.25") type onto an ink plate that pops into his hands
// (he holds it low, below his hips, so it only ever shares the bottom ~100 px of the list).
// He winds up and throws the plate: it tumbles up the screen and slams down onto the number. Impact (hit lines,
// chips, shake, sound), and the pair crunches into the answer, which squashes into its socket; its note follows.
// The goal answer is a two-handed heave that lands on a gold plate with the big impact (white flash, camera
// punch, cash); he celebrates and points up at it.
//
// Layout (measured with the real fonts at mount; the first that fits wins):
//   rows   label line(s) + value line. Labels may wrap to 2 lines (3 as a last resort). The block, the answer and
//          its note are left-aligned under the label.
//   lines  long lists: one row per item, a label column (wraps to 2 lines, note underneath when there is room)
//          and every answer right-aligned on ONE edge; a row whose label cannot sit beside a long answer is
//          stacked (label full width, answer on its own line under it, same edge). A wide block ducks the label.
// Only the bottom ~100 px under his held plate is shared, normally by the bottom (last) row alone: its label and
// block step in left of the plates while they are there; its answer lands after the last plate is gone. With 5
// items or fewer the rows spread out (pitch up to ~260 px, values up to 84 px) and the list is centred. If nothing
// fits: notes shrink, the input line is dropped, the figure shrinks (0.84 -> 0.66), 3-line labels are allowed, a
// tight lines pass, then the goal plate steps down to 1x; only then does it throw.
//
// lookOpts (all optional):
//   hits: ['kick' | 'chop' | 'slam', ...]   the throw per item: kick = underhand flick, chop = overhand throw,
//                                            slam = two-handed overhead heave (default: chop and kick alternate;
//                                            the goal is always a slam). 'toss' / 'throw' / 'heave' are aliases.
//   actions: [{ item, verb }]                verbs from a spec brief map onto throws (smash/chop -> chop, ...)
//   figureScale: number                      the figure's size (default 0.84, about 220 px; 0.6-1.1)
//   input: 'show' | 'hide'                   the input line (default: shown only if the header lacks input.value)
//   layout: 'rows' | 'lines'                 force a layout
import {
  h, s, style, attr, setHTML, fitText, prog, clamp, lerp, plain, markup, typed, graphemes,
  C, F, L, M, E, poseTrack, Figure, makeWorld, makeFx, camera, NumObj, pinLimb, blendJ,
  chromeParts, durationOf, measure, squashAt, popIn, hop, toss, rng, toneOf, mix, smooth, bump, RIG, fk, poseOf,
} from '../lib.js'

const TAB_X = 60, TAB = 58, X0 = TAB_X + TAB + 22   // number tab, then the text column
const CR = 834                                       // right edge for labels, results and notes (every row)
const FXk = k => Math.round(944 - 52 * k)            // the figure's hip x (he faces left, toward the list): far right
const XMAX = 934                                     // nothing he holds passes this x (the right button rail)
const LANE = 895                                     // the plate flies up this lane edge-on (right of every row)
const BP = { x: 18, y: 8, b: 6 }                     // glyph block padding + border
const OP = { x: 16, y: 8 }                           // operator plate padding
let HL = 1.06                                        // the goal result is a little bigger, on a gold plate (1.0 as a fallback)
const PLATE = [18, 8]
const LEDGE_X0 = 60
const WIND = 0.28                                    // wind-up before a throw (s)

export const css = `
.ds-tabbg { position: absolute; left: 0; top: 0; box-sizing: border-box; border-radius: 14px; }
.ds-tabn { position: absolute; left: 0; top: 0; text-align: center; font: 900 40px/40px ${F.head}; letter-spacing: -0.02em; }
.ds-label { position: absolute; left: 0; top: 0; white-space: nowrap; font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; }
.ds-label.wrap { white-space: normal; text-wrap: balance; }
.ds-val { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; }
.ds-val .u { font-weight: 800; letter-spacing: -0.01em; }
.ds-block { box-sizing: border-box; background: ${C.white}; border: ${BP.b}px solid ${C.ink}; border-radius: 14px; padding: 0 ${BP.x}px;
  font-family: ${F.mono}; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; white-space: pre; text-align: left; }
.ds-op { box-sizing: border-box; background: ${C.ink}; border-radius: 14px; padding: 0 ${OP.x}px;
  font-family: ${F.mono}; font-weight: 800; letter-spacing: -0.02em; color: ${C.hero}; white-space: pre; text-align: left; }
.ds-caret { display: inline-block; width: 0.14em; height: 0.9em; margin-left: 0.05em; background: currentColor; vertical-align: -0.1em; }
.ds-note { position: absolute; left: 0; top: 0; font-family: ${F.mono}; font-weight: 700; letter-spacing: -0.02em; color: ${C.grey}; white-space: nowrap; }
.ds-note em { color: ${C.ink}; }
.ds-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 16px; transform-origin: 50% 50%; }
.ds-input { position: absolute; left: 62px; top: 0; font: 700 44px/44px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; white-space: nowrap; }
.ds-input b { color: ${C.ink}; font-weight: 800; }
`

// ---------------------------------------------------------------------------------------------- poses (facing-relative)
const P = {
  // while he holds the plate his hands stay at or below his shoulders (the plate hangs from them and never hides
  // his head); the throw itself is a fling from low to high
  dip: { lean: 18, tilt: 8, aF: [30, 70], aB: [20, 76], lF: [40, -72], lB: [20, -64] },                 // crouch, plate held low
  deep: { lean: 30, tilt: 14, aF: [12, 30], aB: [4, 36], lF: [74, -124], lB: [54, -116] },             // deep squat, plate at the knees
  back: { lean: -14, tilt: -4, aF: [-64, 44], aB: [-44, 36], lF: [28, -22], lB: [-20, -32] },          // swung back low (a fling)
  flick: { lean: -10, tilt: -16, aF: [150, 8], aB: [140, 12], lF: [16, -10], lB: [-14, -8] },          // underhand fling, arms up
  fling: { lean: 20, tilt: -8, aF: [156, 4], aB: [-30, 24], lF: [30, -34], lB: [-34, -6] },             // one-arm fling up and out
  heave: { lean: 6, tilt: -16, aF: [164, 6], aB: [156, 10], lF: [24, -20], lB: [-20, -14] },           // two-handed release, arms up
  proud: { lean: -4, tilt: -6, aF: [26, 118], aB: [-26, -118], lF: [12, -4], lB: [-12, -2] },         // hands on hips
  hold: { lean: 4, tilt: 12, aF: [10, 20], aB: [4, 26], lF: [12, -10], lB: [-10, -8] },               // plate held low, below his hips
  wagA: { lean: -4, tilt: 4, aF: [64, 82], aB: [-14, 16], lF: [10, -4], lB: [-10, -2] },              // "no, no": forearm up, tipped forward
  wagB: { lean: -4, tilt: 10, aF: [64, 122], aB: [-14, 16], lF: [10, -4], lB: [-10, -2] },            // ... and tipped back
  nod: { lean: 4, tilt: 26, aF: [16, 16], aB: [-16, 12], lF: [11, -5], lB: [-11, -2] },
}
const ACTS = ['point', 'wag', 'shrug', 'nod', 'cheer', 'proud']
const VERB = { smash: 'chop', chop: 'chop', carve: 'chop', hammer: 'chop', throw: 'chop', kick: 'kick', punch: 'kick',
  push: 'kick', stack: 'kick', drag: 'kick', toss: 'kick', flick: 'kick', slam: 'slam', crush: 'slam', heave: 'slam' }
const HIT = { kick: 'kick', toss: 'kick', chop: 'chop', throw: 'chop', slam: 'slam', heave: 'slam' }

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// "$1,300 a month" -> ["$1,300", " a month"]: trailing unit words are set smaller (same string, same order).
// Only words without digits split off, so "$10K in ≈ 2.4 yrs" stays whole.
const splitResult = str => { const m = /^((?:≈\s*)?[−+-]?[$€£]?\d[\d,]*(?:\.\d+)?[KMBkmb%]?)(\s+[^\d]+)$/.exec(String(str)); return m ? [m[1], m[2]] : [String(str), ''] }
const unitPx = v => Math.max(46, Math.round(0.6 * v))
// "$100,000 × 0.25" -> ["$100,000", "× 0.25"]: the number goes in the block, the operator and the rest on the plate
const splitFormula = f => { const m = /\s([×÷−+=*/x])\s/.exec(f); return m ? [f.slice(0, m.index).trim(), f.slice(m.index + 1).trim()] : [f.trim(), ''] }

export default function deadSimpleList(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const items = (d.items || []).slice(0, 8)
  const N = items.length
  if (!N) throw new Error('dead-simple-list: data.items is empty')
  const typeDur = d.typeDur != null ? Math.max(0.1, +d.typeDur) : 0.6
  const isGoal = it => it.tone === 'goal'
  const F2 = items.map(it => { const [a, b] = splitFormula(String(it.formula || '')); return { num: a, op: b || '=' } })

  // ============================================================================================ measure
  const parts = chromeParts(spec, ctx)
  const fV = v => `900 ${v}px ${F.head}`, fL = l => `800 ${l}px ${F.head}`, fM = m => `800 ${m}px ${F.mono}`, fN = n => `700 ${n}px ${F.mono}`
  const memo = new Map()
  const mm = (key, fn) => { if (!memo.has(key)) memo.set(key, fn()); return memo.get(key) }
  const wV = (str, v) => mm(`v|${v}|${str}`, () => measure(str, fV(v), { letterSpacing: '-0.03em' }))
  const wL = (str, l) => mm(`l|${l}|${str}`, () => measure(str, fL(l), { letterSpacing: '-0.01em', html: true }))
  const wM = (str, m) => mm(`m|${m}|${str}`, () => measure(str, fM(m), { letterSpacing: '-0.02em' }))
  const wN = (str, n) => mm(`n|${n}|${str}`, () => measure(str, fN(n), { letterSpacing: '-0.02em', html: true }))
  const wU = (str, u) => mm(`u|${u}|${str}`, () => measure(str, `800 ${u}px ${F.head}`, { letterSpacing: '-0.01em' }))
  const glyphW = (i, v) => { const [a, b] = splitResult(items[i].result || ''); return wV(a, v) + (b ? wU(b, unitPx(v)) : 0) }
  const resW = (i, v) => { const it = items[i]; const w = glyphW(i, v); return isGoal(it) ? w * HL + 2 * PLATE[0] + 12 : w }
  const blockW = (i, m) => Math.ceil(wM(F2[i].num, m) + 0.2 * m + 2 * (BP.x + BP.b))
  const opW = (i, m) => Math.ceil(wM(F2[i].op, m) + 0.2 * m + 2 * OP.x)
  const blockH = m => Math.round(1.2 * m) + 2 * BP.y + 2 * BP.b
  const opH = m => Math.round(1.2 * m) + 2 * OP.y
  const plateH = v => Math.round(v * HL) + 2 * PLATE[1] + 12
  // label line count at a width (probe with the real wrapping)
  const probe = h('div', { class: 'ds-label wrap', style: { visibility: 'hidden' } })
  ctx.stage.append(probe)
  const nLines = (i, w, l, lh) => mm(`nl|${i}|${w}|${l}`, () => {
    if (!items[i].label) return 0
    style(probe, { width: w + 'px', fontSize: l + 'px', lineHeight: lh + 'px' })
    probe.innerHTML = markup(items[i].label)
    return Math.round(probe.offsetHeight / lh)
  })
  // greedy word wrap of a note into lines no wider than A (null if one word is wider)
  function wrapN(text, n, A) {
    const words = String(text).split(/\s+/).filter(Boolean), lines = []
    let cur = ''
    for (const w of words) {
      if (wN(w, n) > A) return null
      const nx = cur ? cur + ' ' + w : w
      if (!cur || wN(nx, n) <= A) cur = nx
      else { lines.push(cur); cur = w }
    }
    if (cur) lines.push(cur)
    // two lines: balance them (the narrowest longest line), so the second line is never a lone orphan word
    if (lines.length === 2) {
      let best = lines
      for (let s2 = 1; s2 < words.length; s2++) {
        const a = words.slice(0, s2).join(' '), b = words.slice(s2).join(' ')
        if (wN(a, n) <= A && wN(b, n) <= A && Math.max(wN(a, n), wN(b, n)) < Math.max(...best.map(x => wN(x, n)))) best = [a, b]
      }
      return best
    }
    return lines
  }

  // ---- the figure's corner: bottom right, on the floor, right of the list (his body stays right of CR). He holds
  // each plate LOW, hanging from his hands at hip height, so the corner the plates need is only the bottom ~100 px:
  // normally only the bottom row shares it, and that row is the last item, whose answer lands after every plate
  // has gone (it keeps the full right edge).
  const figTop = k => L.floorY - 262 * k                            // head top
  const holdJ = k => fk(poseOf(P.hold), { x: FXk(k), face: -1, scale: k })
  // The corner's left edge depends on WHEN: a row's label is there from frame 1 (every plate he will hold), its
  // block and dock from its own turn (plates i..N-1), its answer and note after its hit (plates i+1..N-1).
  const corner = (k, m) => {
    const J = holdJ(k), handX = (J.hF[0] + J.hB[0]) / 2, hy = Math.min(J.hF[1], J.hB[1])
    const left = items.map((_, j) => { const pw = opW(j, m); return Math.min(handX, XMAX - pw / 2) - pw / 2 })
    const body = FXk(k) - 70 * k
    const cx = from => Math.round(Math.min(CR, body - 6, ...left.slice(from).map(x => x - 18)))
    return { y: Math.round(hy - 8 - 4), all: cx(0), from: i => cx(i), after: i => cx(i + 1) }
  }

  // ---- input line (the viewer-owned number), only if the hook does not already show it
  const inp = d.input
  let showInput = !!(inp && inp.value) && lo.input !== 'hide' &&
    (lo.input === 'show' || !plain(spec.header || '').includes(plain(inp.value)))
  const YB = L.floorY - 4                     // the lowest ledge sits just above the floor line
  let Y0 = parts.workTop

  // right edges per row: { L: label (static), B: block + dock (its turn), V: answer + note (after its hit) }. A part
  // of a row is in the corner when its bottom (labB: the label's, Sy: the value line's) comes down into it
  const rightOf = (Sy, cz, labB = Sy) => Sy.map((y, i) => ({
    L: labB[i] > cz.y + 4 ? cz.all : CR,
    B: y > cz.y + 4 ? cz.from(i) : CR,
    V: y > cz.y + 4 ? cz.after(i) : CR,
  }))

  // ---- layout candidates
  function tryRows(v, slack, k, nlMax, nMin) {
    const l = v >= 64 ? 44 : v >= 58 ? 42 : 40
    const lh = Math.round(1.2 * l)
    let m = clamp(Math.round(v * 0.68), 40, 52)
    while (m > 40 && items.some((_, i) => opW(i, m) > 330)) m = Math.max(40, m - 2)
    const cz = corner(k, m)
    // the value line: a plain row fits its answer and the glyph block; only the goal row is as tall as its gold plate
    const Vh = Math.max(Math.round(1.21 * v), blockH(m) + 2)
    const VhA = items.map(it => (isGoal(it) ? Math.max(Vh, plateH(v) - 8) : Vh))
    // label lines at the full width first (a corner row is re-checked below)
    const nl = Math.max(1, ...items.map((_, i) => nLines(i, CR - X0, l, lh)))
    if (nl > nlMax) return null
    const Lh = nl * lh
    const base = Lh + 6 + Vh + 8                       // a plain row
    const baseA = VhA.map(x => Lh + 6 + x + 8)
    const nlhB = Math.round(1.25 * 40) + 2
    // notes: one size for every row; each note goes after the result, after the label, as a 2-line margin note,
    // or (only that row grows) as 1-2 lines under the value. Of the two preference orders, keep the one that puts
    // the most notes in the same place (a calmer sheet).
    const placeNotes = (R, n) => {
      const nlh = Math.round(1.25 * n)
      const place = order => items.map((it, i) => {
        if (!it.note) return { kind: 'none' }
        const nw = wN(it.note, n), rw = resW(i, v), lw = it.label && nl === 1 ? wL(it.label, l) : Infinity
        for (const kind of order) {
          if (kind === 'val' && X0 + rw + 26 + nw <= R[i]) return { kind, n, x: X0 + rw + 26 }
          if (kind === 'label' && it.label && X0 + lw + 26 + nw <= R[i]) return { kind, n, x: X0 + lw + 26 }
        }
        const x = X0 + rw + 28
        const lines = wrapN(it.note, n, R[i] - x)
        if (lines && lines.length === 2 && 2 * nlh <= VhA[i] + 10) return { kind: 'block', n, x, lines, lh: nlh }
        const bl = wrapN(it.note, n, R[i] - X0)
        if (bl && bl.length <= 2) return { kind: 'below', n, x: X0, lines: bl, lh: nlhB }
        return null
      })
      const calm = out => { const c = {}; for (const o of out) if (o.kind !== 'none') c[o.kind] = (c[o.kind] || 0) + 1; return Math.max(0, ...Object.values(c)) }
      const opts = [place(['val', 'label']), place(['label', 'val'])].filter(o => o.every(Boolean))
      return opts.length ? opts.reduce((a, b) => (calm(b) > calm(a) ? b : a)) : null
    }
    for (const n of [40, 38, 36].filter(x => x >= nMin)) {
      let below = items.map(() => 0)
      for (let pass = 0; pass < 3; pass++) {
        const hs = below.map((b, i) => baseA[i] + b * nlhB)
        const sumH = hs.reduce((a, b) => a + b, 0)
        const gapMax = N > 1 ? (YB - Y0 - sumH) / (N - 1) : Infinity
        if (gapMax < slack || base + gapMax < 120) break
        const gap = N > 1 ? Math.min(gapMax, N <= 5 ? Math.max(slack, 260 - base) : 92) : 0
        const total = sumH + (N - 1) * gap
        const top = N <= 5 ? Y0 + Math.max(0, (YB - Y0 - total) / 2) : YB - total
        let acc = top
        const Sy = hs.map((hh, i) => { acc += hh + (i ? gap : 0); return Math.round(acc) })
        const RR = rightOf(Sy, cz, Sy.map((y, i) => y - below[i] * nlhB - 8 - VhA[i] - 6))
        let ok = true
        for (let i = 0; i < N && ok; i++) {
          const it = items[i]
          if (X0 + resW(i, v) > RR[i].V || X0 + blockW(i, m) + 6 + opW(i, m) > RR[i].B + 0.4 * opW(i, m)) ok = false
          else if (it.label && nLines(i, RR[i].L - X0, l, lh) > nl) ok = false
        }
        if (!ok) return null
        const notes = placeNotes(RR.map(x => x.V), n)
        if (!notes) break
        const need = notes.map(o => (o.kind === 'below' ? o.lines.length : 0))
        if (need.every((x, i) => x === below[i])) {
          return { mode: 'rows', v, l, lh, nl, m, Lh, Vh, VhA, rowH: base, pitch: base + gap, gap, Sy, R: RR, notes, k, belowH: below.map(b => b * nlhB) }
        }
        below = need
      }
    }
    return null
  }

  function tryLines(v, allowDrop, k, tight = false) {
    const l = 40, lh = tight ? 46 : 48, pad = tight ? 8 : 14       // tight: the last resort before giving up
    let m = Math.min(48, Math.max(40, Math.round(v * 0.72)))     // formulas never below the 40 px must-read floor
    while (m > 40 && items.some((_, i) => opW(i, m) > 300)) m = Math.max(40, m - 2)
    const cz = corner(k, m)
    const goal = items.some(isGoal)
    const Vh = Math.max(Math.round(1.21 * v), blockH(m) + 2, goal ? plateH(v) - 8 : 0)
    // Every answer is right-aligned on ONE edge (the value column never steps in). A row is "side by side" (its
    // label column ends where its own answer begins, and left of the corner) or, when the label cannot sit beside
    // a long answer in 2 lines, "stacked": the label runs the full width and the answer sits on its own line under
    // it, still on the value edge. A block wider than the answer ducks the label while it is shown.
    const solve = RR => {
      const VE = Math.min(...RR.map(x => x.V))
      const rw = items.map((_, i) => {
        const colW = Math.floor(Math.min(VE - resW(i, v) - 30, RR[i].L) - X0)
        const nS = colW >= 180 ? nLines(i, colW, l, lh) : 99
        if (nS <= 2) return { stack: false, colW, lines: nS }
        const fw = Math.floor(RR[i].L - X0), nT = nLines(i, fw, l, lh)
        return nT <= 2 ? { stack: true, colW: fw, lines: nT } : null
      })
      if (rw.some(x => !x)) return null
      let notes = null, best = null
      const drops = o => o.filter(x => x.kind === 'drop').length
      for (const n of [40, 38, 36]) {
        const cur = items.map((it, i) => {
          if (!it.note) return { kind: 'none' }
          if (!rw[i].stack && rw[i].lines <= 1 && wN(it.note, n) <= rw[i].colW) return { kind: 'under', n }
          if (rw[i].stack && X0 + wN(it.note, n) + 26 <= VE - resW(i, v)) return { kind: 'vleft', n }
          return { kind: 'drop', n }
        })
        if (!drops(cur)) { notes = cur; break }
        if (!best || drops(cur) < drops(best)) best = cur
      }
      if (!notes) { if (!allowDrop) return null; notes = best }
      const hs = rw.map((x, i) => (x.stack ? x.lines * lh + (tight ? 0 : 4) + Vh + pad : Math.max((x.lines + (notes[i].kind === 'under' ? 1 : 0)) * lh, Vh) + pad))
      return { rw, notes, hs, VE }
    }
    let R = items.map(() => ({ L: CR, B: CR, V: CR })), sol = null, Sy = null
    for (let pass = 0; pass < 4; pass++) {
      sol = solve(R)
      if (!sol) return null
      const sumH = sol.hs.reduce((x, y) => x + y, 0)
      const gapMax = N > 1 ? (YB - Y0 - sumH) / (N - 1) : 0
      if (gapMax < (tight ? 0 : 6)) return null
      const gap = N > 1 ? Math.min(gapMax, N <= 5 ? Math.max(6, 240 - Math.max(...sol.hs)) : 60) : 0
      const total = sumH + (N - 1) * gap
      const top = N <= 5 ? Y0 + Math.max(0, (YB - Y0 - total) / 2) : YB - total
      let acc = top
      Sy = sol.hs.map((hh, i) => { acc += hh + (i ? gap : 0); return Math.round(acc) })
      // the label's bottom: a side row's label sits on the answer's line; a stacked row's ends above its answer
      const labB = Sy.map((y, i) => (sol.rw[i].stack ? y - pad / 2 - Vh - (tight ? 0 : 4) : y - pad / 2))
      const R2 = rightOf(Sy, cz, labB)
      if (R2.every((x, i) => x.B === R[i].B && x.L === R[i].L && x.V === R[i].V)) break
      R = R2
      if (pass === 3) return null
    }
    for (let i = 0; i < N; i++) if (X0 + blockW(i, m) > R[i].B) return null
    R = R.map(x => ({ ...x, V: sol.VE }))
    return { mode: 'lines', v, l, lh, m, Vh, pad, sgap: tight ? 0 : 4, hs: sol.hs, Sy, R, notes: sol.notes, lines: sol.rw.map(x => x.lines), colW: sol.rw.map(x => x.colW), stack: sol.rw.map(x => x.stack), k }
  }

  function pickLayout(k, nlMax) {
    // notes at the 40 px must-read size first (a smaller value beats a smaller note), then down to 36
    if (lo.layout !== 'lines') {
      for (const nMin of [40, 36]) for (const slack of [36, 12]) for (let v = 84; v >= 56; v -= 4) { const x = tryRows(v, slack, k, Math.min(2, nlMax), nMin); if (x) return x }
    }
    // keep every note if that works at a decent value size; otherwise drop the notes that have no room
    if (lo.layout !== 'rows') for (const [drop, vMin] of [[false, 56], [true, 48]]) for (let v = 68; v >= vMin; v -= 4) { const x = tryLines(v, drop, k); if (x) return x }
    for (let v = 60; v >= 52; v -= 4) { const x = tryRows(v, 0, k, nlMax, 36); if (x) return x }
    if (lo.layout !== 'rows') for (let v = 56; v >= 48; v -= 4) { const x = tryLines(v, true, k, true); if (x) return x }
    return null
  }
  const k0 = clamp(lo.figureScale ?? 0.84, 0.6, 1.1)
  let lay = null
  // the goal is the visual climax: when the rows layout has room, its answer is set clearly bigger than the rest
  // (1.45x, then 1.3x, 1.15x) on its gold plate, as long as every other answer stays at 64 px or more
  if (items.some(isGoal) && lo.layout !== 'lines') {
    Y0 = parts.workTop + (showInput ? 58 + 18 : 0)
    big: for (const hl of [1.45, 1.3, 1.15]) {
      HL = hl; memo.clear()
      for (let v = 84; v >= 64; v -= 4) for (const slack of [36, 24]) { const x = tryRows(v, slack, k0, 2, 40); if (x) { lay = x; break big } }
    }
  }
  const attempts = []
  for (const hl of [1.06, 1]) for (const inpOn of showInput ? [true, false] : [false]) for (const k of [k0, Math.min(k0, 0.74), Math.min(k0, 0.66)]) for (const nl of [2, 3]) attempts.push([hl, inpOn, k, nl])
  if (!lay) for (const [hl, inpOn, k, nl] of attempts) {
    if (HL !== hl) { HL = hl; memo.clear() }
    Y0 = parts.workTop + (inpOn ? 58 + 18 : 0)
    lay = pickLayout(k, nl)
    if (lay) { if (showInput && !inpOn) console.warn('dead-simple-list: no room for the input line; the hook has to carry the number'); showInput = inpOn; break }
  }
  if (!lay) { probe.remove(); throw new Error('dead-simple-list: the items do not fit the work area (shorten labels or formulas, or use fewer items)') }
  const rows = lay.mode === 'rows'
  const { v, l, m, Vh, k } = lay
  const FX = FXk(k)
  const SyA = lay.Sy, RA = lay.R
  const Sy = i => SyA[i]
  const VhI = i => (lay.VhA ? lay.VhA[i] : Vh)                       // value line height (rows: the goal's is taller)
  const yV = i => Sy(i) - (rows ? 8 : lay.pad / 2 + 1) - (lay.belowH ? lay.belowH[i] : 0) - VhI(i) / 2   // value line centre
  // rows: each label sits directly on its own value line (a 1-line label in a list of 2-line ones does not float)
  const nlR = items.map((it, i) => (rows && it.label ? Math.max(1, Math.min(lay.nl, nLines(i, RA[i].L - X0, l, lay.lh))) : rows ? lay.nl : 0))
  const yLT = i => yV(i) - VhI(i) / 2 - 6 - nlR[i] * lay.lh          // label top (rows)
  const yL = i => yLT(i) + nlR[i] * lay.lh / 2                       // label block centre (rows)
  probe.remove()
  const stk = i => !rows && lay.stack[i]
  const yRowC = i => Sy(i) - lay.pad / 2 - (lay.hs[i] - lay.pad) / 2   // row centre (lines, side by side)
  const yLabTop = i => (stk(i) ? yV(i) - Vh / 2 - lay.sgap - lay.lines[i] * lay.lh : null)   // a stacked row's label
  const yTab = i => (rows ? yLT(i) + lay.lh / 2 : stk(i) ? yLabTop(i) + lay.lh / 2 : yRowC(i))
  const BH = blockH(m), PH = opH(m)

  // ============================================================================================ timing
  // ts: the block lands and starts typing; res: the plate slams down (the result appears). An item at t <= 0.3
  // is fully typed at frame 1 (the hook shows the number and the operator in his hands).
  const TI = []
  items.forEach((it, i) => {
    const prev = TI[i - 1]
    const t0 = it.t != null ? +it.t : prev ? prev.res + 2.6 : 0.4
    const res = Math.max(it.resultT != null ? +it.resultT : t0 + typeDur + 0.3, t0 + 0.3)
    TI.push({ t0, res })
  })

  // ============================================================================================ build
  const world = makeWorld(ctx)
  const g = world.g
  if (showInput) {
    const el = h('div', { class: 'ds-input' })
    el.innerHTML = [inp.label ? esc(inp.label) : '', `<b>${esc(inp.value)}</b>`, inp.note ? esc(inp.note) : ''].filter(Boolean).join(' ')
    el.style.top = parts.workTop + 'px'
    ctx.stage.append(el)                       // fixed, like the header: the camera shake never moves it
    fitText(el, L.railX - 62, { minPx: 40 })
  }

  // ledges: one under each row, all out to one right edge (the lowest row stands on the floor)
  const ledgeX = Math.min(...items.map((_, i) => (Sy(i) >= L.floorY - 6 ? Infinity : RA[i].L + 14)))
  const ledges = items.map((_, i) => {
    if (Sy(i) >= L.floorY - 6) return null
    const el = s('line', { x1: LEDGE_X0, x2: ledgeX, y1: Sy(i), y2: Sy(i), stroke: C.line, 'stroke-width': 6, 'stroke-linecap': 'round' })
    g.back.append(el)
    return el
  })

  const R = items.map((it, i) => {
    const r = { it, i, goal: isGoal(it), tone: toneOf(it.tone), style: styleOf(i), right: RA[i].B, rightL: RA[i].L }
    // number tab: a box behind the digit (the linter reads the digit against what is painted behind it)
    r.tabBg = h('div', { class: 'ds-tabbg' })
    r.tabN = h('div', { class: 'ds-tabn' }, String(i + 1))
    style(r.tabBg, { width: TAB + 'px', height: TAB + 'px', transform: `translate(${TAB_X}px,${(yTab(i) - TAB / 2).toFixed(1)}px)` })
    style(r.tabN, { width: TAB + 'px', transform: `translate(${TAB_X}px,${(yTab(i) - 20).toFixed(1)}px)` })
    world.html.append(r.tabBg, r.tabN)
    // label
    if (it.label) {
      r.label = h('div', { class: 'ds-label wrap' })
      setHTML(r.label, markup(it.label))
      if (rows) style(r.label, { width: (r.rightL - X0) + 'px', fontSize: l + 'px', lineHeight: lay.lh + 'px', transform: `translate(${X0}px,${Math.round(yLT(i))}px)` })
      else {
        const nl = lay.lines[i] + (lay.notes[i].kind === 'under' ? 1 : 0)
        const top = stk(i) ? yLabTop(i) : yRowC(i) - nl * lay.lh / 2
        style(r.label, { width: lay.colW[i] + 'px', fontSize: l + 'px', lineHeight: lay.lh + 'px', transform: `translate(${X0}px,${Math.round(top)}px)` })
      }
      world.html.append(r.label)
    }
    // result geometry: left-aligned under the label (rows) or right-aligned at the row's edge (lines)
    r.rw = glyphW(i, v)
    r.sw = r.rw * (r.goal ? HL : 1)
    r.home = rows ? X0 + (r.goal ? PLATE[0] + 6 : 0) : RA[i].V - (r.goal ? PLATE[0] + 6 : 0) - r.sw
    // the glyph block (the number) sits where the answer will land
    r.bw = blockW(i, m)
    r.bx = rows ? X0 : r.right - r.bw
    // where the plate docks: flush against the block's right end when the row has room, else over its right end
    r.pw = opW(i, m)
    r.dockX = Math.min(r.bx + r.bw + 6 + r.pw / 2, r.right - r.pw / 2)
    if (!rows && r.label && !lay.stack[i]) {          // (a stacked row's block is on its own line, under the label)
      const rg = document.createRange(); rg.selectNodeContents(r.label)
      const textR = Math.max(0, ...[...rg.getClientRects()].map(q => q.right))
      r.duck = Math.min(r.bx, r.dockX - r.pw / 2) < textR + 14     // the block or plate covers the label: it ducks
    }
    r.block = new NumObj(world.html, { cls: 'ds-block', ax: 0.5, ay: 0.5 })
    style(r.block.el, { width: r.bw + 'px', height: BH + 'px', fontSize: m + 'px', lineHeight: (BH - 2 * BP.b) + 'px', opacity: '0' })
    // the operator plate (the tool he throws)
    r.op = new NumObj(world.html, { cls: 'ds-op', ax: 0.5, ay: 0.5 })
    style(r.op.el, { width: r.pw + 'px', height: PH + 'px', fontSize: m + 'px', lineHeight: PH + 'px', opacity: '0' })
    // gold plate (goal)
    if (r.goal) { r.plate = h('div', { class: 'ds-plate', style: { opacity: '0' } }); world.html.append(r.plate) }
    // result
    const [numS, unitS] = splitResult(it.result || '')
    r.hasUnit = !!unitS
    r.val = new NumObj(world.html, { cls: 'ds-val', ax: 0, ay: 0.5, style: { fontSize: v + 'px', opacity: '0' } })
    r.val.el.innerHTML = esc(numS) + (unitS ? `<span class="u" style="font-size:${unitPx(v)}px">${esc(unitS)}</span>` : '')
    // empty socket (dashed), sized for this row's own answer
    const hh = Math.round(1.21 * v) + 6, sw = resW(i, v) + 28
    r.socket = s('rect', { x: rows ? X0 - 14 : RA[i].V - sw + 14, y: yV(i) - hh / 2, width: sw, height: hh, rx: 14, fill: 'none', stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '14 12' })
    g.back.append(r.socket)
    // note
    const nt = lay.notes[i]
    if (it.note && nt.kind !== 'drop' && nt.kind !== 'none') {
      r.note = h('div', { class: 'ds-note', style: { opacity: '0' } })
      if (nt.kind === 'block' || nt.kind === 'below') { r.note.innerHTML = nt.lines.map(x => markup(x)).join('<br>'); style(r.note, { fontSize: nt.n + 'px', lineHeight: nt.lh + 'px' }) }
      else { setHTML(r.note, markup(it.note)); style(r.note, { fontSize: nt.n + 'px', lineHeight: nt.n + 'px' }) }
      world.html.append(r.note)
      const base = (yc, px) => yc + 0.363 * px                       // baseline of a line-height:1 box centred at yc
      if (nt.kind === 'val') { r.noteX = nt.x; r.noteY = base(yV(i), v * (r.goal ? HL : 1)) - 0.86 * nt.n }
      else if (nt.kind === 'label') { r.noteX = nt.x; r.noteY = base(yL(i), l) - 0.86 * nt.n }
      else if (nt.kind === 'block') { r.noteX = nt.x; r.noteY = yV(i) - nt.lh }
      else if (nt.kind === 'below') { r.noteX = nt.x; r.noteY = Math.round(yV(i) + VhI(i) / 2 + 6) }
      else if (nt.kind === 'vleft') { r.noteX = X0; r.noteY = base(yV(i), v * (r.goal ? HL : 1)) - 0.86 * nt.n }
      else { r.noteX = X0; r.noteY = yRowC(i) - (lay.lines[i] + 1) * lay.lh / 2 + lay.lines[i] * lay.lh + (lay.lh - nt.n) / 2 }
      r.noteY = Math.round(r.noteY)
    } else if (it.note && nt.kind === 'drop') console.warn(`dead-simple-list: no room for the note of item ${i + 1} ("${it.note}")`)
    return r
  })
  function styleOf(i) {
    const it = items[i]
    if (lo.hits && lo.hits[i] && HIT[lo.hits[i]]) return HIT[lo.hits[i]]
    if (isGoal(it)) return 'slam'
    const a = (lo.actions || []).find(x => x && x.item === i)
    if (a && VERB[a.verb]) return VERB[a.verb]
    return i % 2 ? 'kick' : 'chop'
  }

  // ============================================================================================ choreography
  const fig = new Figure(g.fig, { scale: k })
  R.forEach((r, i) => {
    const T0 = TI[i]
    const g0 = graphemes(F2[i].num).length, g1 = graphemes(F2[i].op).length
    r.split = g0 / Math.max(1, g0 + g1)                            // share of the typing that goes on the block
    // the plate's flight: up the lane right of every row, edge-on (a row in his corner: straight across the corner),
    // then it whips left along the row's value line and docks against the number. It never crosses the list.
    r.land = [r.dockX, yV(i)]
    r.inCorner = r.right < CR
    r.via = [r.inCorner ? Math.min(r.right + r.pw / 2 + 12, XMAX - r.pw / 2) : LANE, yV(i)]
    const rise = Math.max(0, (L.floorY - 150 * k) - yV(i))
    let flight = clamp(0.3 + rise / 2400 + (r.via[0] - r.land[0]) / 4000, 0.32, 0.6)
    const pre = i === 0 && T0.t0 <= 0.3
    let typeD = clamp(typeDur, 0.12, 2)
    let ts = pre ? -typeD - 0.05 : T0.t0
    // typing ends before the wind-up; when the slot is short, the typing then the flight give way
    const room = T0.res - ts - flight - WIND - 0.06
    if (!pre && typeD > room) typeD = Math.max(0.12, room)
    if (ts + typeD + WIND + flight > T0.res - 0.04) flight = Math.max(0.2, T0.res - 0.04 - ts - typeD - WIND)
    Object.assign(T0, { ts, typeD, flight, tr: T0.res - flight })
    // the goal's heave winds up longest (up to 1 s, a riser under it): the climax is earned
    T0.tw = Math.max(ts + typeD + 0.04, T0.tr - (r.style === 'slam' ? (r.goal ? 1.0 : 0.62) : WIND))
    T0.tHold = ts + typeD * r.split                                 // the plate pops into his hands here
  })

  const keys = [{ t: -10, pose: 'think' }]
  const K = (t, pose, d = M.move, e = 'spring') => keys.push({ t, pose, d, e })
  const hops = []
  const xKeys = [{ t: -10, v: FX }]
  for (let i = 0; i < N; i++) {
    const r = R[i], T0 = TI[i]
    K(T0.tHold - 0.12, P.hold, 0.16, 'spring')
    if (r.style === 'chop') {
      K(T0.tw, P.back, T0.tr - T0.tw - 0.02, 'inOut')
      K(T0.tr - 0.04, P.fling, 0.08, 'out')
      K(T0.tr + 0.12, 'follow', 0.14, 'out')
      xKeys.push({ t: T0.tw, v: FX + 10, d: 0.2 }, { t: T0.tr - 0.06, v: FX - 22, d: 0.12, e: 'out' })
    } else if (r.style === 'kick') {
      K(T0.tw, P.dip, T0.tr - T0.tw - 0.02, 'inOut')
      K(T0.tr - 0.04, P.flick, 0.09, 'out')
      hops.push({ t0: T0.tr - 0.02, dur: 0.26, h: 18 })
      xKeys.push({ t: T0.tr - 0.06, v: FX - 12, d: 0.14, e: 'out' })
    } else {
      K(T0.tw, P.dip, 0.16, 'out')
      K(T0.tw + 0.18, P.deep, Math.max(0.12, T0.tr - T0.tw - 0.26), 'inOut')
      K(T0.tr - 0.05, P.heave, 0.08, 'out')
      hops.push({ t0: T0.tr - 0.04, dur: 0.3, h: 30 })
      xKeys.push({ t: T0.tr - 0.08, v: FX - 26, d: 0.14, e: 'out' })
      ctx.cue(T0.tw, 'riser', { dur: Math.max(0.2, T0.tr - T0.tw), gain: 0.3 })
    }
    xKeys.push({ t: T0.res + 0.3, v: FX, d: 0.4, e: 'inOut' })
    K(T0.res + 0.14, 'idle', 0.34, 'spring')
    const next = TI[i + 1]
    if (!r.goal && next && next.tHold - T0.res > 1.6) K(T0.res + 0.55, i % 2 ? P.proud : 'think', 0.34, 'spring')
  }
  // finale: a jump for joy, then he points at the answer (his hand aims at it)
  const lastR = R[N - 1], lastT = TI[N - 1]
  const tCel = lastT.res + 0.3
  const pointAt = i => (yV(i) > figTop(k) + 70 * k ? 'point' : 'pointUp')
  // lookOpts.acts: his acting after the goal, keyed to the VO lines that follow it (none may start before he lands)
  const acts = (Array.isArray(lo.acts) ? lo.acts : [])
    .filter(a => a && ACTS.includes(a.act) && Number.isFinite(+a.t))
    .map(a => ({ act: a.act, t: Math.max(+a.t, tCel + 0.4), i: a.item != null && R[+a.item] ? +a.item : null }))
    .sort((a, b) => a.t - b.t)
  const tAct0 = acts.length ? acts[0].t : Infinity
  const aims = []                                  // { t0, t1, i }: his pointing hand aims at answer i
  const pulses = []                                // { t, i }: answer i pulses (and, if it is not the goal, turns green)
  K(tCel, 'celebrate', 0.14, 'out')
  hops.push({ t0: tCel + 0.04, dur: 0.36, h: 46 })
  if (tCel + 0.62 < tAct0 - 0.1) K(tCel + 0.62, 'stand', 0.18, 'spring')
  if (tCel + 0.9 < tAct0 - 0.1) { K(tCel + 0.9, pointAt(N - 1), 0.3, 'spring'); aims.push({ t0: tCel + 0.9, t1: tAct0, i: N - 1, fin: true }) }
  const goalI = R.some(r => r.goal) ? R.findIndex(r => r.goal) : N - 1
  acts.forEach((a, j) => {
    const next = j + 1 < acts.length ? acts[j + 1].t : Infinity
    if (a.act === 'point') {
      const i = a.i ?? goalI
      K(a.t, pointAt(i), 0.26, 'spring')
      aims.push({ t0: a.t, t1: next, i })
      pulses.push({ t: a.t + 0.12, i })
    } else if (a.act === 'wag') {                 // "no, no": the forearm up, wagging at the elbow
      K(a.t, P.wagA, 0.16, 'out')
      let tt = a.t + 0.2
      for (let q = 0; q < 6 && tt + 0.14 < next; q++, tt += 0.13) K(tt, q % 2 ? P.wagA : P.wagB, 0.13, 'inOut')
      if (tt + 0.3 < next) K(tt, 'stand', 0.3, 'spring')
    } else if (a.act === 'shrug') {
      K(a.t, 'shrug', 0.2, 'spring')
      hops.push({ t0: a.t + 0.02, dur: 0.22, h: 10 })
      if (a.t + 1.1 < next) K(a.t + 1.1, 'stand', 0.3, 'spring')
    } else if (a.act === 'nod') {
      for (let q = 0; q < 2; q++) { K(a.t + q * 0.36, P.nod, 0.14, 'out'); K(a.t + q * 0.36 + 0.16, 'stand', 0.18, 'inOut') }
    } else if (a.act === 'cheer') {
      K(a.t, 'celebrate', 0.14, 'out')
      hops.push({ t0: a.t + 0.04, dur: 0.36, h: 40 })
      if (a.t + 0.7 < next) K(a.t + 0.62, 'stand', 0.18, 'spring')
    } else if (a.act === 'proud') K(a.t, P.proud, 0.3, 'spring')
  })
  const tEnd = tCel + 0.9
  const tr = poseTrack(keys)
  const figX = (() => {
    const ks = [...xKeys].sort((a, b) => a.t - b.t)
    const starts = [ks[0].v]
    const at = (t, upto) => {
      let i = -1
      for (let j = 0; j <= upto; j++) if (ks[j].t <= t) i = j
      if (i < 0) return ks[0].v
      const kk = ks[i]
      return lerp(starts[i], kk.v, (E[kk.e || 'inOut'] || E.inOut)(prog(t, kk.t, kk.d ?? 0.3)))
    }
    for (let i = 1; i < ks.length; i++) starts[i] = at(ks[i].t, i - 1)
    return t => at(t, ks.length - 1)
  })()
  const lift = t => { let y = 0; for (const hp of hops) y += hop(t, hp.t0, hp.dur, hp.h); return y }
  const landTimes = hops.map(hp => hp.t0 + hp.dur)
  // he never leans his head into the list: when a lunge or a squat would bring it within 10 px of the value
  // column, his whole body shifts right by the difference
  const JKEYS = ['hip', 'nk', 'sh', 'head', 'eF', 'hF', 'eB', 'hB', 'kF', 'fF', 'kB', 'fB']
  const Jat = t => {
    const J = fig.pose(t, tr, { x: figX(t), ground: L.floorY - lift(t), face: -1, noDraw: true })
    const dx = CR + 10 - (J.head[0] - J.R)
    if (dx > 0) for (const key of JKEYS) J[key] = [J[key][0] + dx, J[key][1]]
    return J
  }

  // where the plate sits while he holds it: it hangs from his hands (top edge in his grip), left of the rail,
  // never over his head and never through the floor
  const capY = figTop(k) + 2 * RIG.headR * k + PH / 2 - 2
  function heldAt(J, i) {
    const r = R[i]
    const hx = (J.hF[0] + J.hB[0]) / 2, hy = Math.min(J.hF[1], J.hB[1])
    return [Math.min(hx, XMAX - r.pw / 2), clamp(hy + PH / 2 - 8, capY, L.floorY - 4 - PH / 2)]
  }
  // the flight: snap into the lane edge-on (inside his corner), fly up it, whip left and dock. -> [x, y, rot]
  function flightAt(r, p) {
    const [x0, y0] = r.from, [xv, yv] = r.via, [x1, y1] = r.land
    let x, y, rot
    if (r.inCorner) {
      if (p < 0.55) { const q = E.outQuad(p / 0.55); x = lerp(x0, xv, q); y = lerp(y0, yv, q) - 40 * Math.sin(Math.PI * q); rot = -14 * Math.sin(Math.PI * q) }
      else { const q = E.inQuad((p - 0.55) / 0.45); x = lerp(xv, x1, q); y = y1; rot = 0 }
    } else if (p < 0.14) { const q = E.out(p / 0.14); x = lerp(x0, xv, q); y = y0; rot = -90 * q }
    else if (p < 0.7) { const q = E.outQuad((p - 0.14) / 0.56); x = xv; y = lerp(y0, yv, q); rot = -90 }   // edge-on up the lane
    else { const q = (p - 0.7) / 0.3; x = lerp(xv, x1, E.inQuad(q)); y = y1; rot = -90 + 90 * E.inOut(q) }
    // never past the rail: the rotated plate's half-width keeps it left of x 938
    const a = rot * Math.PI / 180, hw = (r.pw * Math.abs(Math.cos(a)) + PH * Math.abs(Math.sin(a))) / 2
    return [Math.min(x, 938 - hw), y, rot]
  }
  // the frisbee flip while it flies up the lane edge-on (a 3D spin faked with a squash)
  const flipAt = (r, p) => (!r.inCorner && p > 0.14 && p < 0.7 ? 0.35 + 0.65 * Math.abs(Math.cos(Math.PI * 3 * (p - 0.14) / 0.56)) : 1)
  R.forEach((r, i) => { r.from = heldAt(Jat(TI[i].tr), i) })

  // ---- impacts, cues
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  R.forEach((r, i) => {
    const T0 = TI[i]
    ctx.cue(Math.max(0, T0.ts), 'type', { dur: T0.typeD, gain: 0.45 })
    if (T0.tHold > 0.05) ctx.cue(T0.tHold, 'pop', { gain: 0.3 })
    ctx.cue(T0.tr, 'swipe', { gain: 0.45 })
    const cx = (r.bx + r.dockX + r.pw / 2) / 2, rx = (r.dockX + r.pw / 2 - r.bx) / 2
    if (r.goal) fxk.impact(T0.res, { x: cx, y: yV(i), rx: rx + 8, ry: BH / 2 + 12, r: 34, lines: 14, shake: 12, flash: 0.45, punch: 0.03, cue: 'hit', gain: 0.95 })
    else fxk.impact(T0.res, { x: cx, y: yV(i), rx: rx + 6, ry: BH / 2 + 8, r: 30, lines: 10, shake: 5 + Math.min(4, i), cue: 'hit', gain: 0.55 })
    ctx.cue(T0.res + 0.03, 'thud', { gain: 0.35 })
    if (r.goal) ctx.cue(T0.res + 0.06, 'cash', { gain: 0.6 })
  })
  ctx.cue(tCel + 0.4, 'step', { gain: 0.4 })
  // a pointed-at answer pulses with a ring of hit lines (no shake) and a pop
  for (const pu of pulses) {
    const r = R[pu.i], hw = r.sw / 2 + (r.goal ? PLATE[0] + 6 : 0)
    fxk.impact(pu.t, { x: r.home - (r.goal ? PLATE[0] + 6 : 0) + hw, y: yV(pu.i), rx: hw + 14, ry: VhI(pu.i) / 2 + 4, r: 20, lines: 8, shake: 0, punch: r.goal ? 0.015 : 0, cue: 'pop', gain: r.goal ? 0.7 : 0.5 })
  }
  // while he points at an answer that is not the goal, it is the focal number again: green until the next point
  const focusOf = i => pulses.map((pu, j) => (pu.i === i ? { t0: pu.t, t1: (pulses[j + 1] || { t: Infinity }).t } : null)).filter(Boolean)
  R.forEach((r, i) => { r.pulses = pulses.filter(pu => pu.i === i).map(pu => pu.t); r.focus = r.goal || r.it.tone === 'bad' ? [] : focusOf(i) })
  const pulseAt = (r, t) => r.pulses.reduce((z, tp) => z * (1 + 0.1 * bump(t, tp, 0.34)), 1)
  const focusAt = (r, t) => r.focus.reduce((w, f) => Math.max(w, Math.min(prog(t, f.t0, 0.14), 1 - prog(t, f.t1, 0.3))), 0)

  // ---- crunch chips: bits of the block and the plate fly off at each hit (decoration)
  const chips = []
  R.forEach((r, i) => {
    const rnd = rng(31 + i * 17)
    const n = r.goal ? 10 : 6
    for (let c = 0; c < n; c++) {
      const el = s('rect', { width: 10 + rnd() * 8, height: 7 + rnd() * 6, rx: 2, fill: c % 3 ? C.ink : C.white, stroke: C.ink, 'stroke-width': 2.5, opacity: 0 })
      g.front.append(el)
      const side = c % 2 ? 1 : -1
      const p0 = [r.dockX - r.pw / 2 + side * (20 + 40 * rnd()), yV(i) - BH / 2]
      // they spray sideways and barely rise: they fall onto the row's ledge without crossing the label above
      chips.push({ el, t0: TI[i].res, p0, v: [side * (220 + rnd() * 360), -(40 + rnd() * 120)], floor: Sy(i) - 2, spin: (rnd() - 0.5) * 900 })
    }
  })

  // ============================================================================================ seek
  const lastBeat = Math.max(tEnd + 0.6, lastT.res + 1.2)
  const duration = durationOf(spec, lastBeat, d.hold ?? 3)
  const actT = i => TI[i].ts - 0.15
  const goalHit = R.find(r => r.goal)

  function seek(t) {
    const J = Jat(t)
    let held = -1                                                  // the item whose plate is in his hands
    for (let i = 0; i < N; i++) if (t >= TI[i].tHold - 0.12 && t < TI[i].tr) held = i
    // ---------------- rows
    for (let i = 0; i < N; i++) {
      const r = R[i], T0 = TI[i]
      const active = t >= actT(i)
      // (an answer he points at in his acting after the goal gets the ring back while he points)
      const current = (active && (i === N - 1 ? t < Math.min(tEnd + 0.4, tAct0) : t < actT(i + 1))) || aims.some(a => !a.fin && a.i === i && t >= a.t0 && t < a.t1)
      // tab: outlined until reached, ink after; a green ring while it is the current slot
      style(r.tabBg, {
        background: active ? C.ink : C.white,
        border: active ? `0px solid ${C.ink}` : `4px solid ${C.line}`,
        boxShadow: current ? `0 0 0 5px ${C.void}, 0 0 0 10px ${C.hero}` : 'none',
      })
      style(r.tabN, { color: active ? C.white : C.dim })
      if (r.label) {
        let op = 1
        if (r.duck) op = 1 - clamp(prog(t, T0.ts - 0.2, 0.12)) + clamp(prog(t, T0.res, 0.2))
        style(r.label, { color: active ? C.ink : C.dim, opacity: clamp(op).toFixed(3) })
      }
      if (ledges[i]) attr(ledges[i], 'stroke', t >= T0.res ? C.ink : C.line)
      // block: drops in, types the number, waits; the plate lands on it and both crunch away
      const tDrop = T0.ts - 0.11
      if (t < tDrop || t >= T0.res + 0.07) { r.block.set({ opacity: 0 }); setHTML(r.block.el, '') }
      else {
        const fy = t < T0.ts ? 40 * (1 - E.inQuad(prog(t, tDrop, 0.11))) : 0
        let sx = 1, sy = 1, op = clamp((t - tDrop) / 0.05)
        if (t >= T0.res) { const q = prog(t, T0.res, 0.07); sx = 1 + 0.16 * q; sy = 1 - 0.5 * q; op = 1 - q }
        else { const sq = squashAt(t, T0.ts, Math.min(0.1, Math.max(0, 1 - 41 / m))); sx = sq.sx; sy = sq.sy }
        r.block.set({ x: r.bx + r.bw / 2, y: yV(i) - fy, sx, sy, opacity: op })
        if (t >= T0.res) setHTML(r.block.el, '')
        else {
          const p = prog(t, T0.ts, T0.typeD * r.split)
          const caretOn = p < 1
          setHTML(r.block.el, esc(typed(F2[i].num, p)) + (caretOn ? '<span class="ds-caret"></span>' : ''))
        }
      }
      // operator plate: pops into his hands, types, rides his hands through the wind-up, flies, slams down
      if (t < T0.tHold - 0.12 || t >= T0.res + 0.07) { r.op.set({ opacity: 0 }); r.op.overlap(false); setHTML(r.op.el, '') }
      else {
        let x, y, rot = 0, sx = 1, sy = 1, op = 1
        if (t < T0.tr) {
          ;[x, y] = heldAt(J, i)
          const pp = popIn(t, T0.tHold - 0.12, 0.2, 0.84)
          sx = sy = pp.scale; op = pp.opacity
          rot = t >= T0.tw ? -8 * Math.sin(Math.PI * prog(t, T0.tw, T0.tr - T0.tw)) : 0
        } else if (t < T0.res) {
          const p = prog(t, T0.tr, T0.flight)
          ;[x, y, rot] = flightAt(r, p)
          sy = flipAt(r, p)
        } else {
          ;[x, y] = r.land
          const q = prog(t, T0.res, 0.07)
          sx = 1 - 0.3 * q; sy = 1 + 0.1 * q; op = 1 - q            // rammed into the number: squashes sideways
        }
        r.op.set({ x, y, rot, sx, sy, opacity: op })
        r.op.overlap(t >= T0.tw)                                     // in motion over the list: an intended overlap
        const p = prog(t, T0.tHold, T0.typeD * (1 - r.split))
        const typing = t < T0.tr && p < 1 && T0.ts >= 0
        setHTML(r.op.el, t >= T0.res ? '' : esc(typed(F2[i].op, T0.ts < 0 ? 1 : p)) + (typing ? '<span class="ds-caret"></span>' : ''))
      }
      // result: crunches out of the block and plate, squashes into the socket; newest = tone colour, then settles
      if (t < T0.res) {
        r.val.set({ opacity: 0 })
        if (r.plate) style(r.plate, { opacity: '0' })
      } else {
        const pp = popIn(t, T0.res + 0.02, 0.16, 0.86)
        const amt = Math.min(0.18, Math.max(0, 1 - 41 / ((r.hasUnit ? unitPx(v) : v) * (r.goal ? HL : 1))))
        const sq = squashAt(t, T0.res + 0.04, amt)
        const gs = r.goal ? HL : 1
        const next = TI[i + 1]
        const settle = next ? prog(t, next.res, 0.3) : 0
        const fw = focusAt(r, t), pz = pulseAt(r, t)
        const col = r.goal ? C.ink : r.it.tone === 'bad' ? C.red : fw > 0 ? mix(C.ink, C.heroInk, fw) : mix(r.tone.text, C.ink, settle)
        r.val.set({ x: r.home - (pz - 1) * r.sw / 2, y: yV(i), sx: gs * pp.scale * sq.sx * pz, sy: gs * pp.scale * sq.sy * pz, opacity: pp.opacity, color: col })
        if (r.plate) {
          const pw = r.sw + 2 * PLATE[0] + 12, ph = plateH(v)
          const p2 = popIn(t, T0.res, 0.3, 0.5)
          const sq2 = squashAt(t, T0.res + 0.02, 0.12)
          style(r.plate, {
            width: pw.toFixed(0) + 'px', height: ph + 'px',
            // it may overshoot sideways, never upward into the label line
            transform: `translate(${(r.home - PLATE[0] - 6).toFixed(1)}px,${(yV(i) - ph / 2).toFixed(1)}px) scale(${(p2.scale * sq2.sx * pz).toFixed(3)},${(Math.min(1, p2.scale * sq2.sy) * pz).toFixed(3)})`,
            opacity: '1',
          })
        }
      }
      // socket: gives way to the block when it lands
      attr(r.socket, 'opacity', String(+(1 - prog(t, T0.ts - 0.12, 0.1)).toFixed(3)))
      if (r.note) {
        const p = prog(t, T0.res + 0.24, 0.22)
        style(r.note, { opacity: (p <= 0 ? 0 : clamp(p * 1.4)).toFixed(3), transform: `translate(${(r.noteX + 14 * (1 - E.out(p))).toFixed(1)}px,${r.noteY}px)` })
      }
    }
    // ---------------- chips
    for (const c of chips) {
      if (t < c.t0 || t > c.t0 + 0.9) { attr(c.el, 'opacity', '0'); attr(c.el, 'transform', ''); continue }
      const [x, y] = toss(t, c.t0, c.p0, c.v, { g: 3000, floor: c.floor - 4, e: 0.35, friction: 0.5, n: 2 })
      attr(c.el, 'opacity', String(+(1 - prog(t, c.t0 + 0.55, 0.3)).toFixed(3)))
      attr(c.el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(c.spin * Math.min(t - c.t0, 0.4)).toFixed(1)})`)
    }
    // ---------------- the figure: hands on the plate while he holds it
    if (held >= 0) {
      const [cx, cy] = heldAt(J, held)
      const by = cy - PH / 2 + 8, half = R[held].pw / 2
      const w = smooth(TI[held].tHold - 0.12, TI[held].tHold + 0.06, t)
      const J2 = { ...J }
      pinLimb(J2, 'hF', [clamp(J.hF[0], cx - half + 18, cx + half - 18), by], 1)
      pinLimb(J2, 'hB', [clamp(J.hB[0], cx - half + 18, cx + half - 18), by], -1)
      Object.assign(J, blendJ(J, J2, w))
    }
    // ---------------- pointing: his front hand aims at the answer (arm straight out toward it)
    for (const a of aims) {
      const w = smooth(a.t0, a.t0 + 0.22, t) * (1 - smooth(a.t1, a.t1 + 0.18, t))
      if (w <= 0) continue
      const r = R[a.i]
      const tx = r.home + r.sw + (r.goal ? PLATE[0] + 6 : 0), ty = yV(a.i)
      const dx = tx - J.sh[0], dy = ty - J.sh[1], dd = Math.hypot(dx, dy) || 1
      const reach = (RIG.upperArm + RIG.foreArm) * J.k * 0.97
      const J2 = { ...J }
      pinLimb(J2, 'hF', [J.sh[0] + dx / dd * reach, J.sh[1] + dy / dd * reach], 1)
      Object.assign(J, blendJ(J, J2, w))
    }
    let sq = { sx: 1, sy: 1 }
    for (const tl of landTimes) { const s2 = squashAt(t, tl, 0.14); sq = { sx: sq.sx * s2.sx, sy: sq.sy * s2.sy } }
    fig.draw(J, sq)
    // ---------------- camera (the punch zooms about the goal row, left of centre so the tabs stay in the safe zone)
    const fxs = fxk.seek(t), zoom = fxs.zoom
    const shake = fxs.shake.map(Math.round)                       // whole-pixel shake keeps 40 px text at 40 px
    if (goalHit) {
      const cx = 300, cy = yV(goalHit.i)
      cam.set({ fx: cx, fy: cy, x: cx, y: cy, zoom, shake })
    } else cam.set({ zoom, shake })
  }

  return { duration, seek }
}
