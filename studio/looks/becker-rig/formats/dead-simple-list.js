// becker-rig · dead-simple-list (FORMATS.md §1): "N dead simple numbers" (P1).
//
// The list is a stack of ledges on the void, one numbered slot per item, all on screen and empty from frame 1:
// an outlined number tab, the label (dim until reached) and a dashed socket where the answer will go.
// The figure works the list from the top. He stands on the active slot's ledge at its right end. The formula
// drops in beside him as a white glyph block and types itself (mono, with the rule's operator in green). He
// winds up and hits it: a kick, a chop, or, for the goal, a crouching two-fisted slam. The block snaps into the
// result glyph with the impact kit (hit lines, chips, shake, sound), and the hit knocks the result home into its
// socket, where it lands with a thud and its note follows. Then he stomps the trapdoor in his ledge and drops to
// the next slot. A goal answer lands on a gold plate with the big impact (white flash, camera punch, cash), he
// pumps a fist and points back at it.
//
// Layout (measured with the real fonts at mount; the first that fits wins):
//   rows   two-line rows: label line + value line. The block types at the right, next to the figure; the result
//          slides (kick) or pops (chop, slam) home under its label. Notes sit after the result, after the label,
//          or as a 2-line margin note, whichever fits left of the figure's lane.
//   lines  long lists (5-6 items): one-line rows, a label column (wraps to 2 lines, note underneath when there is
//          room) and a right-aligned value column. The block types over the value column; the result snaps in place.
// If nothing fits, the input line is dropped (the hook should carry the number) and the layouts are tried again.
//
// The figure lives in a lane at the right (x ≈ 840-930) under the ledge above: every hop and raised hand is
// capped so he never pokes through the ledge over his head.
//
// lookOpts (all optional):
//   hits: ['kick' | 'chop' | 'slam', ...]   the hit per item (default: kick and chop alternate; the goal slams)
//   actions: [{ item, verb }]                verbs from a spec brief map onto hits (smash/chop -> chop, ...)
//   figureScale: number                      override the figure size picked from the ledge pitch
//   input: 'show' | 'hide'                   the input line (default: shown only if the header lacks input.value)
//   layout: 'rows' | 'lines'                 force a layout
import {
  h, s, style, attr, setHTML, fitText, prog, clamp, lerp, plain, markup, typed,
  C, F, L, M, E, poseTrack, fk, Figure, makeWorld, makeFx, camera, NumObj, pinLimb, blendJ,
  chromeParts, durationOf, measure, squashAt, popIn, hop, toss, springStep, rng, toneOf,
} from '../lib.js'

const TAB_X = 60, TAB = 58, X0 = TAB_X + TAB + 22   // number tab, then the text column
const FX = 884                                       // the figure's lane (his hip x); readable text stays left of it
const CR = FX - 50                                   // right edge for labels, results and notes
const HATCH = 46                                     // half-width of the trapdoor in each ledge
const BP = { x: 20, y: 8, b: 6 }                     // glyph block padding + border
const HL = 1.06                                      // the goal result is a little bigger, on a gold plate
const PLATE = [18, 8]
const LEDGE_X0 = 60

export const css = `
.ds-tabbg { position: absolute; left: 0; top: 0; box-sizing: border-box; border-radius: 14px; }
.ds-tabn { position: absolute; left: 0; top: 0; text-align: center; font: 900 40px/40px ${F.head}; letter-spacing: -0.02em; }
.ds-label { position: absolute; left: 0; top: 0; white-space: nowrap; font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; }
.ds-label.wrap { white-space: normal; text-wrap: balance; }
.ds-val { font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; }
.ds-val .u { font-weight: 800; letter-spacing: -0.01em; }
.ds-block { box-sizing: border-box; background: ${C.white}; border: ${BP.b}px solid ${C.ink}; border-radius: 14px; padding: 0 ${BP.x}px;
  font-family: ${F.mono}; font-weight: 800; letter-spacing: -0.02em; color: ${C.ink}; white-space: pre; }
.ds-block i { font-style: normal; color: ${C.heroInk}; }
.ds-caret { display: inline-block; width: 0.14em; height: 0.9em; margin-left: 0.05em; background: ${C.ink}; vertical-align: -0.1em; }
.ds-note { position: absolute; left: 0; top: 0; font-family: ${F.mono}; font-weight: 700; letter-spacing: -0.02em; color: ${C.grey}; white-space: nowrap; }
.ds-note em { color: ${C.ink}; }
.ds-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 16px; transform-origin: 50% 50%; }
.ds-input { position: absolute; left: 62px; top: 0; font: 700 44px/44px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; white-space: nowrap; }
.ds-input b { color: ${C.ink}; font-weight: 800; }
`

// ---------------------------------------------------------------------------------------------- poses (facing-relative)
const P = {
  dip: { lean: 10, tilt: 6, aF: [20, 40], aB: [-24, 30], lF: [30, -60], lB: [16, -56] },
  kick0: { lean: -8, tilt: 2, aF: [38, 76], aB: [-56, 40], lF: [64, -118], lB: [-6, -10] },          // chamber
  kick: { lean: -20, tilt: 4, aF: [-36, 34], aB: [66, 50], lF: [82, -4], lB: [-10, -6] },           // side kick
  chop0: { lean: -8, tilt: -4, aF: [132, 58], aB: [-34, 30], lF: [16, -12], lB: [-14, -8] },        // hand cocked by the ear
  chop: { lean: 30, tilt: 10, aF: [78, 6], aB: [70, 10], lF: [30, -44], lB: [-26, -12] },
  slam0: { lean: -16, tilt: -8, aF: [-128, 36], aB: [-116, 46], lF: [44, -84], lB: [-18, -56] },     // back-swing, crouched
  slam: { lean: 36, tilt: 14, aF: [70, 4], aB: [62, 8], lF: [46, -86], lB: [-6, -64] },
  fall: { lean: -4, tilt: -16, aF: [152, 26], aB: [-150, -24], lF: [22, -46], lB: [-18, -34] },
  land: { lean: 16, tilt: 8, aF: [34, 30], aB: [-34, 24], lF: [46, -86], lB: [28, -80] },
  proud: { lean: -4, tilt: -6, aF: [26, 118], aB: [-26, -118], lF: [12, -4], lB: [-12, -2] },     // hands on hips
  pump: { lean: -6, tilt: -12, aF: [84, 104], aB: [-26, 34], lF: [14, -6], lB: [-14, -4] },       // fist pump
}
const VERB = { smash: 'chop', chop: 'chop', carve: 'chop', hammer: 'chop', kick: 'kick', punch: 'kick', push: 'kick',
  stack: 'kick', drag: 'kick', slam: 'slam', crush: 'slam' }

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const smooth = p => p * p * (3 - 2 * p)
// "$1,300 a month" -> ["$1,300", " a month"]: trailing unit words are set smaller (same string, same order).
// Only words without digits split off, so "$10K in ≈ 2.4 yrs" stays whole.
const splitResult = str => { const m = /^((?:≈\s*)?[−+-]?[$€£]?\d[\d,]*(?:\.\d+)?[KMBkmb%]?)(\s+[^\d]+)$/.exec(String(str)); return m ? [m[1], m[2]] : [String(str), ''] }
const unitPx = v => Math.max(46, Math.round(0.6 * v))

export default function deadSimpleList(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const items = (d.items || []).slice(0, 8)
  const N = items.length
  if (!N) throw new Error('dead-simple-list: data.items is empty')
  const typeDur = d.typeDur != null ? Math.max(0.1, +d.typeDur) : 0.6
  const isGoal = it => it.tone === 'goal'

  // ============================================================================================ timing
  // ts: the block lands and starts typing; res: the hit (the result appears). Slot 1 is already typing at frame 1.
  const TI = []
  items.forEach((it, i) => {
    const prev = TI[i - 1]
    const t0 = it.t != null ? +it.t : prev ? prev.res + 2.6 : 0.4
    const res = Math.max(it.resultT != null ? +it.resultT : t0 + typeDur + 0.3, t0 + 0.25)
    const typeD = clamp(typeDur, 0.12, Math.max(0.12, res - t0 - 0.14))
    const ts = i === 0 && t0 <= 0.3 ? -0.45 * typeD : t0
    TI.push({ t0, res, typeD, ts })
  })
  const styleOf = i => {
    const it = items[i]
    if (lo.hits && lo.hits[i]) return lo.hits[i]
    if (isGoal(it)) return 'slam'
    const a = (lo.actions || []).find(x => x && x.item === i)
    if (a && VERB[a.verb]) return VERB[a.verb]
    return i % 2 ? 'chop' : 'kick'
  }

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
  const blockW = (i, m) => Math.ceil(wM(items[i].formula || '', m) + 0.2 * m + 2 * (BP.x + BP.b))
  const blockH = m => Math.round(1.2 * m) + 2 * BP.y + 2 * BP.b
  const plateH = v => Math.round(v * HL) + 2 * PLATE[1] + 12
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
    return lines
  }
  // the figure's kick reach decides where the block's right edge sits
  const footTip = k => { const J = fk(P.kick, { x: FX, ground: 1000, face: -1, scale: k }); return J.fF[0] - J.sw }

  // ---- input line (the viewer-owned number), only if the hook does not already show it
  const inp = d.input
  let showInput = !!(inp && inp.value) && lo.input !== 'hide' &&
    (lo.input === 'show' || !plain(spec.header || '').includes(plain(inp.value)))
  const YB = L.floorY                         // the last slot stands on the floor
  let Y0 = parts.workTop

  // ---- layout candidates
  function tryRows(v, slack) {
    const l = v >= 64 ? 44 : v >= 58 ? 42 : 40
    const Lh = Math.round(1.21 * l)
    const room = footTip(0.74) + 2 - X0
    let m = Math.min(56, Math.round(v * 0.74))
    while (m > 40 && items.some((_, i) => blockW(i, m) > room)) m -= 2     // formulas stay at 40 px or more
    if (items.some((_, i) => blockW(i, m) > room)) return null
    if (items.some((it, i) => X0 + resW(i, v) > CR || (it.label && X0 + wL(it.label, l) > CR))) return null
    const goal = items.some(isGoal)
    // the gold plate may overhang the value line a little (it is decoration)
    const Vh = Math.max(Math.round(1.21 * v), blockH(m) + 2, goal ? plateH(v) - 8 : 0)
    const rowH = Lh + 6 + Vh + 8
    const pMax = N > 1 ? (YB - Y0 - rowH) / (N - 1) : Infinity
    if (pMax < rowH + slack || pMax < 136) return null
    // notes: one size for every row; each note goes after the result, after the label, or as a 2-line margin note.
    // Of the two preference orders, keep the one that puts the most notes in the same place (a calmer sheet).
    let notes = null
    for (const n of [40, 38, 36]) {
      const lh = Math.round(1.25 * n)
      const place = order => items.map((it, i) => {
        if (!it.note) return { kind: 'none' }
        const nw = wN(it.note, n), rw = resW(i, v), lw = it.label ? wL(it.label, l) : 0
        for (const kind of order) {
          if (kind === 'val' && X0 + rw + 26 + nw <= CR) return { kind, n, x: X0 + rw + 26 }
          if (kind === 'label' && it.label && X0 + lw + 26 + nw <= CR) return { kind, n, x: X0 + lw + 26 }
        }
        const x = X0 + Math.max(rw, lw) + 28
        const lines = wrapN(it.note, n, CR - x)
        if (lines && lines.length === 2 && 2 * lh <= Lh + 6 + Vh) return { kind: 'block', n, x, lines, lh }
        return null
      })
      const calm = out => { const c = {}; for (const o of out) if (o.kind !== 'none') c[o.kind] = (c[o.kind] || 0) + 1; return Math.max(0, ...Object.values(c)) }
      const opts = [place(['val', 'label']), place(['label', 'val'])].filter(o => o.every(Boolean))
      if (opts.length) { notes = opts.reduce((a, b) => (calm(b) > calm(a) ? b : a)); break }
    }
    if (!notes) return null
    const pitch = N > 1 ? Math.min(pMax, rowH + 92) : rowH
    return { mode: 'rows', v, l, m, Lh, Vh, rowH, pitch, notes }
  }

  function tryLines(v, allowDrop) {
    const l = 40, lh = 48
    const vR = footTip(0.45) + 2
    let m = Math.min(48, Math.max(40, Math.round(v * 0.76)))     // formulas never below the 40 px must-read floor
    while (m > 40 && items.some((_, i) => blockW(i, m) > vR - X0 - 240)) m -= 2
    if (items.some((_, i) => blockW(i, m) > vR - X0)) return null
    // each row's label column ends where its own result begins, and where its block begins when that leaves room
    // (the label then stays readable while the formula types; otherwise it ducks under the block)
    const probe = h('div', { class: 'ds-label wrap', style: { fontSize: l + 'px', lineHeight: lh + 'px', visibility: 'hidden' } })
    ctx.stage.append(probe)
    const nLines = (i, w) => { if (!items[i].label) return 0; probe.style.width = w + 'px'; probe.innerHTML = markup(items[i].label); return Math.round(probe.offsetHeight / lh) }
    const colW = items.map((_, i) => {
      const rc = Math.floor(vR - resW(i, v) - 30 - X0), bc = Math.floor(vR - blockW(i, m) - 22 - X0)
      return bc >= 220 && bc < rc && nLines(i, bc) <= 2 ? bc : rc
    })
    const lines = items.map((_, i) => nLines(i, colW[i]))
    probe.remove()
    if (colW.some(w => w < 200)) return null
    if (lines.some(n => n > 2)) return null
    let notes = null, last = null
    for (const n of [40, 38, 36]) {
      last = items.map((it, i) => {
        if (!it.note) return { kind: 'none' }
        if (lines[i] <= 1 && wN(it.note, n) <= colW[i]) return { kind: 'under', n }
        return { kind: 'drop', n }
      })
      if (last.every(o => o.kind !== 'drop')) { notes = last; break }
    }
    if (!notes) { if (!allowDrop) return null; notes = last }
    const goal = items.some(isGoal)
    const Vh = Math.max(Math.round(1.21 * v), blockH(m) + 2, goal ? plateH(v) - 8 : 0)
    const textH = Math.max(...items.map((it, i) => (lines[i] + (notes[i].kind === 'under' ? 1 : 0)) * lh))
    const rowH = Math.max(textH, Vh) + 12
    const pMax = N > 1 ? (YB - Y0 - rowH) / (N - 1) : Infinity
    if (pMax < rowH + 6 || pMax < 104) return null
    const pitch = N > 1 ? Math.min(pMax, rowH + 60) : rowH
    return { mode: 'lines', v, l, lh, m, Vh, rowH, pitch, notes, lines, colW }
  }

  function pickLayout() {
    if (lo.layout !== 'lines') {
      for (const slack of [36, 12]) for (let v = 84; v >= 56; v -= 4) { const x = tryRows(v, slack); if (x) return x }
    }
    // keep every note if that works at a decent value size; otherwise drop the notes that have no room
    if (lo.layout !== 'rows') for (const [drop, vMin] of [[false, 56], [true, 48]]) for (let v = 68; v >= vMin; v -= 4) { const x = tryLines(v, drop); if (x) return x }
    for (let v = 60; v >= 52; v -= 4) { const x = tryRows(v, 0); if (x) return x }
    return null
  }
  let lay = null
  if (showInput) { Y0 = parts.workTop + 58 + 18; lay = pickLayout() }
  if (!lay) {
    if (showInput) console.warn('dead-simple-list: no room for the input line; the hook has to carry the number')
    showInput = false; Y0 = parts.workTop
    lay = pickLayout()
  }
  if (!lay) throw new Error('dead-simple-list: the items do not fit the work area (shorten labels or formulas, or use fewer items)')
  const rows = lay.mode === 'rows'
  const { v, l, m, Vh, rowH, pitch } = lay

  // ---- the figure's size follows the ledge pitch; his head stays under the ledge above (and under the footer)
  const k = lo.figureScale ?? clamp(Math.min((pitch - 18) / 262, (rowH + 22) / 262), 0.38, 0.74)
  const hitX = Math.round(footTip(k) + 2)
  const Sy = i => YB - (N - 1 - i) * pitch                        // ledge (shelf) y of row i
  const yV = i => Sy(i) - 8 - Vh / 2                               // value line centre
  const yL = i => yV(i) - Vh / 2 - 6 - lay.Lh / 2                   // label line centre (rows)
  const vR = rows ? null : hitX                                     // value column right edge (lines)
  const yRowC = i => Sy(i) - 6 - (rowH - 12) / 2                    // row centre (lines)
  const yTab = i => (rows ? yL(i) : yRowC(i))
  const BH = blockH(m)
  const J0 = fk('stand', { x: FX, ground: 1000, face: -1, scale: k })
  const figH = 1000 - (J0.head[1] - J0.R)
  const ceil = i => (i > 0 ? Sy(i - 1) + 3 : Y0 - 16)              // what is over his head on row i
  const hopCap = i => Math.max(0, Sy(i) - ceil(i) - figH - 8)

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

  // ledges with a trapdoor at the figure's lane (the last row stands on the floor)
  const ledges = items.map((_, i) => {
    if (i === N - 1 && Sy(i) >= L.floorY - 1) return null
    const st = { stroke: C.line, 'stroke-width': 6, 'stroke-linecap': 'round' }
    const left = s('line', { x1: LEDGE_X0, x2: FX - HATCH - 4, y1: Sy(i), y2: Sy(i), ...st })
    const flap = s('line', { x1: FX - HATCH, x2: FX + HATCH, y1: Sy(i), y2: Sy(i), ...st })
    const hinge = s('circle', { cx: FX - HATCH, cy: Sy(i), r: 5, fill: C.line })
    g.back.append(left, flap, hinge)
    return { left, flap, hinge }
  })
  // empty sockets (dashed): where each answer will land
  const sockW = Math.max(...items.map((_, i) => resW(i, v))) + 28
  const sockets = items.map((_, i) => {
    const hh = Math.round(1.21 * v) + 6
    const x = rows ? X0 - 14 : vR - sockW + 14
    const el = s('rect', { x, y: yV(i) - hh / 2, width: sockW, height: hh, rx: 14, fill: 'none', stroke: C.line, 'stroke-width': 4, 'stroke-dasharray': '14 12' })
    g.back.append(el)
    return el
  })

  const R = items.map((it, i) => {
    const r = { it, i, goal: isGoal(it), tone: toneOf(it.tone), style: styleOf(i) }
    // number tab: a box behind the digit (the linter reads the digit against what is painted behind it)
    r.tabBg = h('div', { class: 'ds-tabbg' })
    r.tabN = h('div', { class: 'ds-tabn' }, String(i + 1))
    style(r.tabBg, { width: TAB + 'px', height: TAB + 'px', transform: `translate(${TAB_X}px,${(yTab(i) - TAB / 2).toFixed(1)}px)` })
    style(r.tabN, { width: TAB + 'px', transform: `translate(${TAB_X}px,${(yTab(i) - 20).toFixed(1)}px)` })
    world.html.append(r.tabBg, r.tabN)
    // label
    if (it.label) {
      r.label = h('div', { class: 'ds-label' + (rows ? '' : ' wrap') })
      setHTML(r.label, markup(it.label))
      if (rows) style(r.label, { fontSize: l + 'px', lineHeight: l + 'px', transform: `translate(${X0}px,${Math.round(yL(i) - l / 2)}px)` })
      else {
        const nl = lay.lines[i] + (lay.notes[i].kind === 'under' ? 1 : 0)
        style(r.label, { width: lay.colW[i] + 'px', fontSize: l + 'px', lineHeight: lay.lh + 'px', transform: `translate(${X0}px,${Math.round(yRowC(i) - nl * lay.lh / 2)}px)` })
      }
      world.html.append(r.label)
      if (!rows) {
        // the block will cover the label's text? then the label ducks while the formula types
        const rg = document.createRange(); rg.selectNodeContents(r.label)
        const textR = Math.max(0, ...[...rg.getClientRects()].map(q => q.right))
        r.duck = hitX - blockW(i, m) < textR + 14
      }
    }
    // the glyph block (formula), right edge at the figure's kick reach
    r.bw = blockW(i, m)
    r.bx = hitX - r.bw
    r.block = new NumObj(world.html, { cls: 'ds-block', ax: 0.5, ay: 0.5 })
    style(r.block.el, { width: r.bw + 'px', height: BH + 'px', fontSize: m + 'px', lineHeight: (BH - 2 * BP.b) + 'px', opacity: '0' })
    const f = String(it.formula || '')
    const mt = /\s[×÷−+=*/x]\s/.exec(f)
    r.formula = f; r.opAt = mt ? mt.index + 1 : -1                  // the operator and its constant type in green
    // plate (goal)
    if (r.goal) { r.plate = h('div', { class: 'ds-plate', style: { opacity: '0' } }); world.html.append(r.plate) }
    // result
    r.rw = glyphW(i, v)
    const [numS, unitS] = splitResult(it.result || '')
    r.hasUnit = !!unitS
    r.val = new NumObj(world.html, { cls: 'ds-val', ax: 0, ay: 0.5, style: { fontSize: v + 'px', opacity: '0' } })
    r.val.el.innerHTML = esc(numS) + (unitS ? `<span class="u" style="font-size:${unitPx(v)}px">${esc(unitS)}</span>` : '')
    // left edge of the (scaled) glyph at home, and where it snaps out of the block
    r.sw = r.rw * (r.goal ? HL : 1)
    r.home = rows ? X0 + (r.goal ? PLATE[0] + 6 : 0) : vR - (r.goal ? PLATE[0] + 6 : 0) - r.sw
    r.snapX = rows ? clamp(r.bx + r.bw / 2 - r.sw / 2, X0, hitX - r.sw) : r.home
    // note
    const nt = lay.notes[i]
    if (it.note && nt.kind !== 'drop' && nt.kind !== 'none') {
      r.note = h('div', { class: 'ds-note', style: { opacity: '0' } })
      if (nt.kind === 'block') { r.note.innerHTML = nt.lines.map(x => markup(x)).join('<br>'); style(r.note, { fontSize: nt.n + 'px', lineHeight: nt.lh + 'px' }) }
      else { setHTML(r.note, markup(it.note)); style(r.note, { fontSize: nt.n + 'px', lineHeight: nt.n + 'px' }) }
      world.html.append(r.note)
      const base = (yc, px) => yc + 0.363 * px                       // baseline of a line-height:1 box centred at yc
      if (nt.kind === 'val') { r.noteX = nt.x; r.noteY = base(yV(i), v * (r.goal ? HL : 1)) - 0.86 * nt.n }
      else if (nt.kind === 'label') { r.noteX = nt.x; r.noteY = base(yL(i), l) - 0.86 * nt.n }
      else if (nt.kind === 'block') { r.noteX = nt.x; r.noteY = (yL(i) - lay.Lh / 2 + yV(i) + Vh / 2) / 2 - nt.lh }
      else { r.noteX = X0; r.noteY = yRowC(i) - (lay.lines[i] + 1) * lay.lh / 2 + lay.lines[i] * lay.lh + (lay.lh - nt.n) / 2 }
      r.noteY = Math.round(r.noteY)
    } else if (it.note && nt.kind === 'drop') console.warn(`dead-simple-list: no room for the note of item ${i + 1} ("${it.note}")`)
    return r
  })

  // ============================================================================================ choreography
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const G = 3600, V0 = 330
  const fallDur = Math.max(0.12, (-V0 + Math.sqrt(V0 * V0 + 2 * G * pitch)) / G)
  // travel of each result from the block to its socket
  R.forEach((r, i) => {
    const dist = Math.abs(r.snapX - r.home)
    r.t0 = TI[i].res + 0.07
    r.dur = dist < 4 ? 0 : r.style === 'slam' ? clamp(0.24 + dist / 2400, 0.24, 0.4) : clamp(0.16 + dist / 2400, 0.16, 0.34)
    r.arrive = r.t0 + r.dur
  })
  // moves between rows: stomp, the trapdoor opens, he drops to the next ledge
  const MV = []
  for (let i = 0; i < N - 1; i++) {
    const earliest = R[i].arrive + 0.3
    const want = TI[i + 1].ts - 0.5 - fallDur
    const latest = TI[i + 1].res - 0.62 - fallDur
    const tm = Math.max(earliest, Math.min(want, latest))
    MV.push({ from: i, to: i + 1, tm, tl: tm + fallDur })
  }
  const arriveRow = i => (i ? MV[i - 1].tl : -10)
  const rowAt = t => { let r = 0; for (const mv of MV) if (t >= mv.tm) r = mv.to; return r }
  const falling = t => MV.some(mv => t >= mv.tm && t < mv.tl)
  const hops = []
  const keys = [{ t: -10, pose: 'think' }]
  const K = (t, pose, d = M.move, e = 'spring') => keys.push({ t, pose, d, e })
  for (let i = 0; i < N; i++) {
    const r = R[i], res = TI[i].res
    if (i) {
      const mv = MV[i - 1]
      K(mv.tm - 0.3, P.dip, 0.1, 'out')
      K(mv.tm - 0.19, 'stand', 0.08, 'out')
      hops.push({ t0: mv.tm - 0.17, dur: 0.17, h: Math.min(14, hopCap(i - 1)), soft: true })
      K(mv.tm, P.fall, 0.1, 'out')
      K(mv.tl, P.land, 0.06, 'out')
      K(mv.tl + 0.12, 'idle', 0.3, 'spring')
    }
    const wind = res - (r.style === 'slam' ? 0.7 : 0.4)
    const tThink = Math.max(TI[i].ts + 0.05, arriveRow(i) + 0.45)
    if (tThink < wind - 0.3) {
      K(tThink, 'think', 0.3)
      let alt = 0
      for (let tt = tThink + 2.6; tt < wind - 1.0; tt += 2.6) K(tt, alt++ % 2 ? 'think' : 'idle', 0.45, 'inOut')
    }
    if (r.style === 'kick') {
      K(res - 0.36, P.kick0, 0.22, 'inOut')
      K(res - 0.08, P.kick, 0.08, 'out')
      K(res + 0.2, 'idle', 0.34, 'spring')
    } else if (r.style === 'chop') {
      K(res - 0.4, P.chop0, 0.24, 'inOut')
      K(res - 0.08, P.chop, 0.08, 'in')
      K(res + 0.22, 'idle', 0.34, 'spring')
    } else {
      K(res - 0.7, P.dip, 0.16, 'out')
      K(res - 0.46, P.slam0, 0.2, 'inOut')
      hops.push({ t0: res - 0.24, dur: 0.24, h: Math.min(40, hopCap(i)) })
      K(res - 0.1, P.slam, 0.1, 'in')
      K(res + 0.32, 'stand', 0.26, 'spring')
      ctx.cue(res - 0.5, 'riser', { dur: 0.4, gain: 0.3 })
    }
    if (i < N - 1 && MV[i].tm - (res + 0.6) > 0.9) K(res + 0.62, P.proud, 0.3, 'spring')
  }
  // finale: a fist pump with a little hop, then he points back at the answer
  const last = R[N - 1]
  const tCel = last.arrive + 0.3
  K(tCel, P.pump, 0.18, 'spring')
  hops.push({ t0: tCel, dur: 0.34, h: Math.min(26, hopCap(N - 1)) })
  K(tCel + 1.0, 'point', 0.3, 'spring')
  const tEnd = tCel + 1.0
  const tr = poseTrack(keys)
  const fig = new Figure(g.fig, { scale: k })

  // ground under his feet (ledge, falling through a trapdoor, or a hop)
  function groundAt(t) {
    let y = Sy(0)
    for (const mv of MV) {
      if (t < mv.tm) break
      if (t < mv.tl) { const dt = t - mv.tm; return Math.min(Sy(mv.to), Sy(mv.from) + V0 * dt + 0.5 * G * dt * dt) }
      y = Sy(mv.to)
    }
    for (const hp of hops) y -= hop(t, hp.t0, hp.dur, hp.h)
    return y
  }
  const landTimes = [...MV.map(mv => mv.tl), ...hops.filter(hp => !hp.soft && hp.h > 4).map(hp => hp.t0 + hp.dur)]

  // ---- impacts, cues
  R.forEach((r, i) => {
    const T0 = TI[i]
    ctx.cue(Math.max(0, T0.ts), 'type', { dur: T0.typeD, gain: 0.45 })
    if (r.goal) fxk.impact(T0.res, { x: r.bx + r.bw / 2, y: yV(i), rx: r.bw / 2 + 10, ry: BH / 2 + 8, r: 34, lines: 14, shake: 12, flash: 0.45, punch: 0.03, cue: 'hit', gain: 0.95 })
    else if (r.style === 'kick') fxk.impact(T0.res, { x: hitX, y: yV(i), rx: 16, ry: BH / 2 - 6, r: 34, lines: 9, shake: 5 + Math.min(4, i), cue: 'hit', gain: 0.5 })
    else fxk.impact(T0.res, { x: hitX - 30, y: yV(i) - BH / 2, rx: 30, ry: 12, r: 32, lines: 9, shake: 5 + Math.min(4, i), cue: 'hit', gain: 0.5 })
    if (r.dur > 0) ctx.cue(r.arrive, 'thud', { gain: 0.4 })
    if (r.goal) ctx.cue(r.arrive + 0.02, 'cash', { gain: 0.6 })
  })
  MV.forEach(mv => { ctx.cue(mv.tm, 'tick', { gain: 0.3 }); ctx.cue(mv.tl, 'step', { gain: 0.5 }) })
  ctx.cue(tCel + 0.34, 'step', { gain: 0.4 })

  // ---- carving chips: a few bits of the block fly off at each hit (decoration)
  const chips = []
  R.forEach((r, i) => {
    const rnd = rng(31 + i * 17)
    const n = r.goal ? 9 : 5
    for (let c = 0; c < n; c++) {
      const el = s('rect', { width: 10 + rnd() * 8, height: 7 + rnd() * 6, rx: 2, fill: c % 3 ? C.ink : C.white, stroke: C.ink, 'stroke-width': 2.5, opacity: 0 })
      g.front.append(el)
      const side = r.style === 'kick' ? -1 : (c % 2 ? 1 : -1)
      const p0 = r.style === 'kick' ? [hitX - 10, yV(i) + (rnd() - 0.5) * BH * 0.6] : [r.bx + r.bw * (0.35 + 0.5 * rnd()), yV(i) - BH / 2]
      const up = r.style === 'kick' ? 260 + rnd() * 300 : 240 + rnd() * 300
      chips.push({ el, t0: TI[i].res, p0, v: [side * (200 + rnd() * 360), -up], floor: Sy(i), spin: (rnd() - 0.5) * 900 })
    }
  })

  // ============================================================================================ seek
  const lastBeat = Math.max(tEnd + 0.6, last.arrive + 0.8)
  const duration = durationOf(spec, lastBeat, d.hold ?? 3)
  const actT = i => Math.min(TI[i].ts, i ? MV[i - 1].tl : -10) - 0.15
  const goalHit = R.find(r => r.goal)

  function seek(t) {
    // ---------------- rows
    for (let i = 0; i < N; i++) {
      const r = R[i], T0 = TI[i]
      const active = t >= actT(i)
      const current = active && (i === N - 1 ? t < tEnd + 0.4 : t < actT(i + 1))
      // tab: outlined until reached, ink after; a green ring while it is the current slot
      style(r.tabBg, {
        background: active ? C.ink : C.white,
        border: active ? `0px solid ${C.ink}` : `4px solid ${C.line}`,
        boxShadow: current ? `0 0 0 5px ${C.void}, 0 0 0 10px ${C.hero}` : 'none',
      })
      style(r.tabN, { color: active ? C.white : C.dim })
      // label: dim until reached; in the lines layout it ducks while a wide block covers it
      if (r.label) {
        let op = 1
        if (r.duck) op = 1 - clamp(prog(t, T0.ts - 0.2, 0.12)) + clamp(prog(t, T0.res, 0.2))
        style(r.label, { color: active ? C.ink : C.dim, opacity: clamp(op).toFixed(3) })
      }
      // ledge colour: light until he has stood on it; the trapdoor swings down under him, springs back after
      if (ledges[i]) {
        const col = t >= arriveRow(i) ? C.ink : C.line
        attr(ledges[i].left, 'stroke', col); attr(ledges[i].flap, 'stroke', col); attr(ledges[i].hinge, 'fill', col)
        let a = 0
        const mv = MV[i]
        if (mv && t >= mv.tm - 0.01) {
          if (t < mv.tl + 0.14) a = 84 * E.in(prog(t, mv.tm - 0.01, 0.09))
          else a = Math.max(-10, springStep(t, mv.tl + 0.14, 84, 0, { freq: 2.2, damp: 0.42 }))
        }
        const hx = FX - HATCH, ca = Math.cos(a * Math.PI / 180), sa = Math.sin(a * Math.PI / 180)
        attr(ledges[i].flap, 'x2', (hx + 2 * HATCH * ca).toFixed(1)); attr(ledges[i].flap, 'y2', (Sy(i) + 2 * HATCH * sa).toFixed(1))
      }
      // block: drops in, types, blinks, gets hit (its text clears on the hit; the empty box squashes away)
      const tDrop = T0.ts - 0.11
      if (t < tDrop || t >= T0.res + 0.1) r.block.set({ opacity: 0 })
      else {
        const fy = t < T0.ts ? 40 * (1 - E.inQuad(prog(t, tDrop, 0.11))) : 0
        let sx = 1, sy = 1, op = clamp((t - tDrop) / 0.05)
        if (t >= T0.res) { const q = prog(t, T0.res, 0.1); sx = 1 + 0.18 * q; sy = 1 - 0.55 * q; op = 1 - q }
        else { const sq = squashAt(t, T0.ts, Math.min(0.1, Math.max(0, 1 - 41 / m))); sx = sq.sx; sy = sq.sy }
        r.block.set({ x: r.bx + r.bw / 2, y: yV(i) - fy, sx, sy, opacity: op })
        if (t >= T0.res) setHTML(r.block.el, '')
        else {
          const p = prog(t, T0.ts, T0.typeD)
          const tx = typed(r.formula, p)
          const a1 = r.opAt < 0 ? tx : tx.slice(0, r.opAt), a2 = r.opAt < 0 ? '' : tx.slice(r.opAt)
          const caretOn = p < 1 || Math.floor((t - T0.ts - T0.typeD) * 2.6) % 2 === 0
          setHTML(r.block.el, esc(a1) + (a2 ? `<i>${esc(a2)}</i>` : '') + (caretOn ? '<span class="ds-caret"></span>' : ''))
        }
      }
      // result: pops out of the block, is knocked home, squashes on arrival; newest = tone colour, then settles
      if (t < T0.res) {
        r.val.set({ opacity: 0 }); r.val.overlap(false)
        if (r.plate) style(r.plate, { opacity: '0' })
      } else {
        const pp = popIn(t, T0.res, 0.14, 0.9)
        let x = r.home, y = yV(i), sx = 1, sy = 1
        const flying = r.dur > 0 && t < r.arrive
        if (r.dur > 0 && t < r.t0) x = r.snapX
        else if (flying) x = lerp(r.snapX, r.home, (r.style === 'slam' ? E.inOutQuad : E.outQuad)(prog(t, r.t0, r.dur)))
        if (!flying && t >= r.arrive && r.dur > 0) {
          const amt = Math.min(0.18, Math.max(0, 1 - 41 / ((r.hasUnit ? unitPx(v) : v) * (r.goal ? HL : 1))))
          const sq = squashAt(t, r.arrive, amt)
          sx = sq.sy; sy = sq.sx                                     // it hits the socket's end: squash sideways
        }
        const gs = r.goal ? HL : 1
        const next = R[i + 1]
        const settle = next ? prog(t, next.arrive, 0.3) : 0
        const col = r.goal ? C.ink : r.it.tone === 'bad' ? C.red : mix(r.tone.text, C.ink, settle)
        r.val.set({ x, y, sx: gs * pp.scale * sx, sy: gs * pp.scale * sy, opacity: pp.opacity, color: col })
        r.val.overlap(false)
        if (r.plate) {
          const pw = r.sw + 2 * PLATE[0] + 12, ph = plateH(v)
          const p2 = popIn(t, r.arrive - 0.02, 0.3, 0.5)
          const sq = squashAt(t, r.arrive, 0.12)
          style(r.plate, {
            width: pw.toFixed(0) + 'px', height: ph + 'px',
            transform: `translate(${(r.home - PLATE[0] - 6).toFixed(1)}px,${(yV(i) - ph / 2).toFixed(1)}px) scale(${(p2.scale * sq.sx).toFixed(3)},${(p2.scale * sq.sy).toFixed(3)})`,
            opacity: t >= r.arrive - 0.02 ? '1' : '0',
          })
        }
      }
      // socket: gives way to the block when it lands
      attr(sockets[i], 'opacity', String(+(1 - prog(t, T0.ts - 0.12, 0.1)).toFixed(3)))
      // note: after the answer has landed
      if (r.note) {
        const p = prog(t, r.arrive + 0.14, 0.22)
        style(r.note, { opacity: (p <= 0 ? 0 : clamp(p * 1.4)).toFixed(3), transform: `translate(${(r.noteX + 14 * (1 - E.out(p))).toFixed(1)}px,${r.noteY}px)` })
      }
    }
    // ---------------- chips
    for (const c of chips) {
      if (t < c.t0 || t > c.t0 + 0.9) { attr(c.el, 'opacity', '0'); continue }
      const [x, y] = toss(t, c.t0, c.p0, c.v, { g: 3000, floor: c.floor - 4, e: 0.35, friction: 0.5, n: 2 })
      attr(c.el, 'opacity', String(+(1 - prog(t, c.t0 + 0.55, 0.3)).toFixed(3)))
      attr(c.el, 'transform', `translate(${x.toFixed(1)},${y.toFixed(1)}) rotate(${(c.spin * Math.min(t - c.t0, 0.4)).toFixed(1)})`)
    }
    // ---------------- the figure
    const J = fig.pose(t, tr, { x: FX, ground: groundAt(t), face: -1, noDraw: true })
    // contact: the striking foot or fists are pinned to the block for the instant of the hit
    for (let i = 0; i < N; i++) {
      const res = TI[i].res
      if (t < res - 0.1 || t > res + 0.2) continue
      const r = R[i]
      const w = smooth(prog(t, res - 0.09, 0.07)) * (1 - smooth(prog(t, res + 0.06, 0.12)))
      if (w <= 0) continue
      const J2 = { ...J }
      if (r.style === 'kick') pinLimb(J2, 'fF', [hitX + J.sw * 0.6, yV(i)], 1)
      else {
        const hx = r.style === 'slam' ? Math.max(r.bx + 30, hitX - 50) : hitX - 26
        pinLimb(J2, 'hF', [hx, yV(i) - BH / 2 - J.sw * 0.6], 1)
        pinLimb(J2, 'hB', [hx + 16, yV(i) - BH / 2 - J.sw * 0.6], 1)
      }
      Object.assign(J, blendJ(J, J2, w))
    }
    // the ledge over his head: hands that would poke through it press against it instead
    if (!falling(t)) {
      const top = ceil(rowAt(t)) + J.sw + 3
      for (const [hand, bend] of [['hF', 1], ['hB', -1]]) if (J[hand][1] < top) pinLimb(J, hand, [J[hand][0], top], bend)
    }
    let sq = { sx: 1, sy: 1 }
    for (const tl of landTimes) { const s2 = squashAt(t, tl, 0.16); sq = { sx: sq.sx * s2.sx, sy: sq.sy * s2.sy } }
    fig.draw(J, sq)
    // ---------------- camera (the punch zooms about the goal row, left of centre so the tabs stay in the safe zone)
    const fxs = fxk.seek(t), zoom = fxs.zoom
    const shake = fxs.shake.map(Math.round)                       // whole-pixel shake keeps 40 px text at 40 px
    // spent bursts keep their last line coordinates under a transparent <g>: take them out of the render tree so
    // nothing (hit tests, the linter's background probe) sees them, whatever order frames are sought in
    for (const b of world.g.fx.children) style(b, { display: b.getAttribute('opacity') === '0' ? 'none' : '' })
    if (goalHit) {
      const cx = 300, cy = yV(goalHit.i)
      cam.set({ fx: cx, fy: cy, x: cx, y: cy, zoom, shake })
    } else cam.set({ zoom, shake })
  }

  return { duration, seek }
}
