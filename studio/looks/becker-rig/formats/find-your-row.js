// becker-rig · find-your-row (FORMATS.md §2): one row per kind of viewer, denser than one pass can read. The
// viewer's job is to find their own row, so they pause, replay or save.
//
// The table is a set of shelves. Every row has its own ledge (a dotted guide, as in the flagship), and the
// emphasised column stands on solid ink planks, one width for every row. The shelving's left side is a post with a
// peg at every ledge (filler pegs carry on down to the floor), and the figure lives on those pegs, in a gutter left
// of the keys.
//   Frame 1  every row's key (column 1) is already on its ledge, dim, and the empty planks show as grey slots, so
//            each viewer can find their row before the values arrive (the benchmark mechanic: the ages are on screen
//            at 0.0 s). Rows with t <= 0 (and lookOpts.prefill rows) are already stocked. The figure stands on the
//            floor, hand on chin, looking up the shelves (a nod in the first second); his head follows the rows as
//            they land.
//   Fill     top to bottom, each row's values land on their ledge. Rows fill downwards, so a cell may only fall
//            "the last few px" (never through the row above): the light cells fall that far; the emphasised cell is
//            the heavy one: it pops in (never under 41 px), lands with a squash, and its plank bows under it and
//            springs back (one soft `thud` per row). The newest emphasised value is green and settles to ink when
//            the next row lands (the last one after 0.8 s); the key turns from dim to ink.
//   Pick     the figure crouches and leaps up (or hops down) the pegs to the picked row (`swipe` on a big take-off),
//            lands with a squash (`step`; the first big leap also gets hit lines and a 3 px shake) and points at it,
//            his hand pinned to the row's left end by IK. The row lifts off its ledge (as far as the pitch allows,
//            often 0 in a dense table) and glows: a pale green band, its ledge and plank turn green, its emphasised
//            value grows 6% (3% in the dense passes) in green. The label pops as a pill (`pop`) right under the row,
//            green rim, caret up at the value (over the last row it goes above, caret down). The rows it covers
//            clear just before it pops and come back after it has gone. It holds until the next pick, at most
//            lookOpts.pillHold s, and closes as the verdict lands, so the end frames show the whole table. When he
//            leaves for the next pick the row drops back onto its ledge.
//   Compare  a pick named in lookOpts.compare is measured: he gets to row `from`'s peg (a jump, or an early first
//            compare starts him there), takes the pencil from behind his head (`tick`), sets it on row `from` and
//            steps down (or up) the pegs to the picked row, one leg per peg, drawing a bracket beside the keys as he
//            goes (`swipe`). Its label pops in an ink-rimmed pill between the two rows, caret on the bracket (two
//            neighbouring rows: under the lower one, or above them at the bottom of the table); row `from` keeps a
//            soft grey frame while the bracket is up.
//   Verdict  the chrome's verdict in the caption band (its `ding` is skipped when the spec cues one at verdict.t).
//            He nods and keeps pointing at the last pick (lookOpts.endPose).
//
// Layout (measured at mount; the layout with the biggest values wins). Keys are left-aligned at the table's left
// edge; value columns are right-aligned, the last at x 922; the slack goes evenly into the gaps, or more of it into
// one gap when that saves a head line. Values run 76 (5-6 rows) / 68 (7-9) / 60 px down to 40 (the emphasised column
// at that size, the others ~0.86 / 0.92 of it, never under 40); neighbouring rows may share up to 5 px of empty line
// box (never ink), so 14 rows fit at 40 px under a 2-line hook and a 2-line footer. Column heads are 40 px on a 44 px
// line, bottom-aligned, >= 40 px apart: house caps (.07em, then .04em) on at most two lines, else sentence case on up
// to three (`__x__` red, `**x**` green, `\n` forces a break; a column's tone colours its head). The formula is a mono
// line (or two) under the footer, numbers in ink, dropped when it would cost the rows more than ~4 px of type. The
// figure is 0.72 when the width allows (0.62, 0.56, 0.5 otherwise). When nothing fits at 40 px: a pick grows 3%, the
// figure goes to 0.42, then no figure (the table takes the full width), and only then 36 / 34 px values (the linter
// warns). A short table sits mid-frame with a taller pitch. Real limits: 3 columns x 14 rows, or 4 columns of
// values up to ~8 characters (four columns of "$6,000,000" only fit at 36 px without the figure).
//
// data: FORMATS.md §2 exactly: columns [{ label, emph?, tone? }] (plain strings work too), rows [[display, ...]],
// formula, rowsT (0.4), rowEvery (0.25) or rowT [..], pick [{ t, row, label }], hold (4). A picked row lands by its
// pick at the latest. Column tone: `bad` = red values and head, `good` = green values; the emphasised column's tone
// sets its fresh / picked colour (default good: green; bad: red; goal or neutral: ink). Every number shown is a spec
// display string; nothing is computed or re-formatted.
//
// lookOpts (all optional; it renders fully without them):
//   compare: [{ pick, from }]   pick number `pick` (its index in data.pick) is measured from row `from` (above)
//   verdictRow: 2               at verdict.t, row 2 is picked too (he goes there; no label, no extra sound)
//   prefill: 3                  the first 3 rows are already stocked at frame 1, whatever rowsT says
//   pillHold: 3.2               the longest a pick label stays up (s)
//   formula: 'auto'             true: always show data.formula (the rows give way); false: never
//   heads: 'auto'               'upper' (house caps) | 'sentence' (as written)
//   figure: true                false: no figure (the table takes the full width; picks still lift and glow, and
//                               the bracket draws itself)
//   figureScale: 0.72           size of the figure (0.4-0.9; the gutter widens with it)
//   endPose: 'point'            his pose from verdict.t: 'point' (keeps pointing, with a nod) | 'celebrate' |
//                               'shrug' | 'slump' | 'think' (default 'celebrate' when there are no picks)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup,
  C, F, L, E, RIG, POSES, poseOf, poseTrack, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj, pinLimb,
  chromeParts, durationOf, measure, squashAt, fall, popIn, springStep, arc, bump, wordTokens,
} from '../lib.js'

export const css = `
.fy-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.fy-head { position: absolute; font-family: ${F.head}; font-weight: 800; font-size: 40px; line-height: 44px; color: ${C.grey}; white-space: nowrap; }
.fy-head.up { text-transform: uppercase; }
.fy-head.emph { color: ${C.ink}; }
.fy-head.bad { color: ${C.red}; }
.fy-head.good { color: ${C.heroInk}; }
.fy-formula { position: absolute; left: 62px; width: 878px; font: 700 40px/54px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; text-wrap: balance; }
.fy-formula b { color: ${C.ink}; font-weight: 800; }
.fy-key { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; }
.fy-val { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.03em; word-spacing: 0.14em; }
.fy-val.em { font-weight: 900; }
.fy-pill { position: absolute; left: 0; top: 0; box-sizing: border-box; padding: 0 18px; border-radius: 14px; border: 4px solid; background: ${C.white};
  font-family: ${F.head}; font-weight: 800; font-size: 42px; line-height: 48px; letter-spacing: -0.01em; color: ${C.ink}; white-space: nowrap; }
.fy-pill.two { white-space: normal; text-wrap: balance; }
.fy-pill em { color: ${C.heroInk}; }
.fy-caret { position: absolute; overflow: visible; }
`

// ---------------------------------------------------------------------------------------------- constants
const XR = 922             // right edge of the last column (x <= 940 below y 820, with a few px for a shake)
const GMIN = 34            // the least gap between two columns' cells
const PSC_TRY = [1.06, 1.03]   // a picked row's emphasised value grows this much (about its bottom-right corner)
const HEAD_GAP = 40        // the least space between two column heads (closer, two heads read as one phrase)
const HEAD_LH = 44         // column heads: 40 px on an integer 44 px line (two lines' runs never overlap > 6 px)
const FORM_LH = 54         // the formula: mono 40 px on an integer 54 px line (mono runs are ~1.32 em tall)
const CARET = 14           // how far a pill's caret sticks out of its rim
const HEAVY_DROP = 40, LIGHT_DROP = 22    // the most a cell falls (less when the row above is close)
const PILL_HOLD = 3.2

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const rgbOf = c => (c[0] === '#' ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : c.match(/[\d.]+/g).slice(0, 3).map(Number))
const mixc = (a, b, p) => { const x = rgbOf(a), y = rgbOf(b), q = clamp(p); return q <= 0 ? a : q >= 1 ? b : `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * q)).join(',')})` }
const TONE_TXT = { bad: C.red, good: C.heroInk, goal: C.ink, neutral: C.ink }
const BAND = mixc(C.heroSoft, C.white, 0.42)      // the lit row (heroInk text on it stays >= 3.5:1)

// local poses (lib.js §2 conventions)
const PZ = {
  think: { ...POSES.thinkUp, aF: [26, 146] },                                                        // hand on chin, tucked in
  crouch: { lean: 24, tilt: 6, aF: [-40, 40], aB: [-56, 34], lF: [70, -122], lB: [50, -112] },
  dip: { lean: 14, tilt: 4, aF: [-10, 40], aB: [-30, 30], lF: [40, -74], lB: [22, -66] },
  airUp: { lean: 6, tilt: -16, aF: [150, 14], aB: [128, 24], lF: [64, -112], lB: [36, -104] },      // tucked, reaching up
  airDown: { lean: -8, tilt: -10, aF: [140, 30], aB: [-140, -30], lF: [22, -40], lB: [-14, -30] },  // arms up, riding the drop
  land: { lean: 18, tilt: 8, aF: [50, 40], aB: [-50, 30], lF: [54, -100], lB: [30, -90] },
  point: { ...POSES.point, lean: 4, tilt: 0 },
  stepDown: { lean: 8, tilt: 6, aF: [96, 6], aB: [-20, 20], lF: [30, -40], lB: [-6, -30] },
  grab: { lean: -4, tilt: 10, aF: [150, 116], aB: [-16, 20], lF: [8, -4], lB: [-10, -2] },          // hand to the back of his head
}
const END = { point: null, celebrate: 'celebrate', shrug: 'shrug', slump: 'slump', think: PZ.think }

// a pencil in his hand: tip at the origin, the body along -x (lib's pencil, drawn whole)
function pencilProp(k) {
  const g = s('g', { 'data-deco': '' })
  const u = 1.15 * k / 0.62, w = 11 * u, sw = 3
  const x = v => (-v * u).toFixed(1)
  g.append(
    s('path', { d: `M${x(16)},${-w / 2}L${x(56)},${-w / 2}L${x(56)},${w / 2}L${x(16)},${w / 2}Z`, fill: C.coin, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('rect', { x: x(63), y: -w / 2, width: (7 * u).toFixed(1), height: w, fill: C.line, stroke: C.ink, 'stroke-width': sw }),
    s('path', { d: `M${x(63)},${-w / 2}Q${x(72)},${-w / 2} ${x(72)},0Q${x(72)},${w / 2} ${x(63)},${w / 2}Z`, fill: '#F29497', stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('path', { d: `M${x(16)},${-w / 2}L0,0L${x(16)},${w / 2}Z`, fill: C.white, stroke: C.ink, 'stroke-width': sw, 'stroke-linejoin': 'round' }),
    s('path', { d: `M${x(5)},${-w * 0.18}L0,0L${x(5)},${w * 0.18}Z`, fill: C.ink, stroke: C.ink, 'stroke-width': 2, 'stroke-linejoin': 'round' }),
  )
  return g
}

export default function findYourRow(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const rows = (d.rows || []).filter(r => Array.isArray(r) && r.length >= 2).map(r => r.map(x => String(x ?? '')))
  const N = rows.length
  if (!N) throw new Error('find-your-row: data.rows is empty')
  const NC = clamp(Math.min(...rows.map(r => r.length)), 2, 4)
  const cols = Array.from({ length: NC }, (_, j) => {
    const c = (d.columns || [])[j]
    return typeof c === 'string' ? { label: c } : { label: '', ...(c || {}) }
  })
  let EM = cols.findIndex((c, j) => j > 0 && c.emph)
  if (EM < 0) EM = NC - 1
  const emTone = cols[EM].tone || 'good'
  const vt = spec.verdict && spec.verdict.t != null ? +spec.verdict.t : null

  // ---- timing: rowT[i] wins, else rowsT + i * rowEvery; prefill rows are stocked at frame 1
  const rowsT = d.rowsT ?? 0.4, every = d.rowEvery ?? 0.25
  const prefill = Math.max(0, Math.floor(+lo.prefill || 0))
  const times = rows.map((_, i) => (i < prefill ? 0 : d.rowT && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every))
  // picks (data.pick, plus lookOpts.verdictRow at the verdict); a compare pick remembers its reference row
  const picks = (d.pick || []).map((p, idx) => ({ ...p, idx }))
    .filter(p => p && Number.isInteger(p.row) && p.row >= 0 && p.row < N && p.t != null)
    .map(p => ({ t: +p.t, row: p.row, label: p.label != null && String(p.label).trim() ? String(p.label) : '', idx: p.idx, from: null }))
  for (const c of Array.isArray(lo.compare) ? lo.compare : []) {
    const pk = picks.find(p => c && p.idx === c.pick)
    if (pk && Number.isInteger(c.from) && c.from >= 0 && c.from < N && c.from !== pk.row) pk.from = c.from
  }
  if (Number.isInteger(lo.verdictRow) && lo.verdictRow >= 0 && lo.verdictRow < N && vt != null) picks.push({ t: vt, row: lo.verdictRow, label: '', idx: -1, from: null, quiet: true })
  picks.sort((a, b) => a.t - b.t)
  // a picked (or compared) row has landed before it is picked
  for (const p of picks) for (const r of [p.row, p.from]) if (r != null) times[r] = Math.min(times[r], p.t - 0.2)
  const landT = times.map(x => (x <= 0 ? -0.6 : x))
  // the newest heavy value is green until the next row lands (the last one to land: 0.8 s, or until a pick)
  const nextLand = i => {
    let n = Infinity
    for (let j = 0; j < N; j++) if (landT[j] > landT[i] + 1e-6) n = Math.min(n, landT[j])
    if (n === Infinity) { n = landT[i] + 0.8; for (const p of picks) if (p.t > landT[i]) n = Math.min(n, p.t) }
    return n
  }
  const pickedRows = new Set(picks.map(p => p.row))
  let PSC = PSC_TRY[0]                                        // (the dense fallback passes grow a pick less)

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  const top0 = parts.footerBottom + 14
  const fixed = h('div', { class: 'fy-fixed' })
  ctx.stage.append(fixed)

  // the formula line (mono, numbers in ink), measured once
  let formEl = null, formLines = 0
  const fText = d.formula ? String(d.formula) : ''
  if (fText && lo.formula !== false && lo.formula !== 'hide') {
    formEl = h('div', { class: 'fy-formula', style: { top: top0 + 'px' } })
    formEl.innerHTML = /\*\*|__/.test(fText) ? markup(fText)
      : esc(fText).replace(/(≈\s*)?[−-]?\$?\d[\d,]*(\.\d+)?(%|[KMBT]\b)?/g, m => `<b>${m}</b>`)
    fixed.append(formEl)
    formLines = Math.round(formEl.offsetHeight / FORM_LH)
    if (formLines > 2) { formEl.remove(); formEl = null; formLines = 0 }
  }

  // measuring (cached: the fitter asks for the same strings many times)
  const mc = new Map()
  const mw = (str, font, o = {}) => {
    const key = font + '|' + (o.letterSpacing || '') + '|' + (o.upper ? 1 : 0) + '|' + str
    let w = mc.get(key)
    if (w == null) { w = measure(str, font, o); mc.set(key, w) }
    return w
  }
  const fnt = (w, px) => `${w} ${px}px ${F.head}`
  const wKey = (str, px) => mw(str, fnt(800, px), { letterSpacing: '-0.02em' })
  const wVal = (str, px, wt) => mw(str, fnt(wt, px), { letterSpacing: '-0.03em' }) + (str.trim().split(/\s+/).length - 1) * 0.14 * px

  // column heads: word tokens (markup kept per word), split at forced breaks
  const HS = { upper: { ls: '.07em', upper: true }, upper4: { ls: '.04em', upper: true }, sentence: { ls: '-0.01em', upper: false } }
  const headSegs = cols.map(c => {
    const segs = [[]]
    for (const tk of wordTokens(String(c.label || ''))) { if (tk.br) segs.push([]); else segs[segs.length - 1].push(tk) }
    return segs.filter(sg => sg.length)
  })
  const tokText = toks => toks.map(tk => tk.parts.map(p => p.s).join('')).join(' ')
  // the fewest lines (then the narrowest) that fit A px; null if a word alone is wider
  function wrapHead(segs, A, st, maxLines) {
    const font = fnt(800, 40), o = { letterSpacing: st.ls, upper: st.upper }
    const W = toks => mw(tokText(toks), font, o)
    const lines = []
    for (const sg of segs) {
      let best = null
      const n = sg.length
      for (let k = 1; k <= Math.min(n, maxLines) && !best; k++) {
        // every way to cut n words into k lines
        const cut = (from, left, acc) => {
          if (left === 1) {
            const ls = [...acc, sg.slice(from)], ws = ls.map(W)
            if (ws.every(x => x <= A + 0.5)) { const m = Math.max(...ws); if (!best || m < best.w - 0.5) best = { lines: ls, w: m } }
            return
          }
          for (let e = from + 1; e <= n - left + 1; e++) cut(e, left - 1, [...acc, sg.slice(from, e)])
        }
        cut(0, k, [])
      }
      if (!best) return null
      lines.push(...best.lines)
    }
    if (lines.length > maxLines) return null
    return { lines, w: Math.max(0, ...lines.map(W)) }
  }
  function fitHeads(right, cw, gap, X0, hm) {
    const st = HS[hm], maxL = hm === 'sentence' ? 3 : 2
    const out = []
    for (let j = 2; j < NC; j++) {
      const r = wrapHead(headSegs[j], right[j] - (right[j - 1] + HEAD_GAP), st, maxL)
      if (!r) return null
      out[j] = r
    }
    // the key head (left-aligned) and the first value head (right-aligned) share the gap between their columns
    let best = null
    const mid = right[0] + gap / 2
    for (let sx = X0 + 30; sx <= right[1] - 30; sx += 2) {
      const a = wrapHead(headSegs[0], sx - HEAD_GAP / 2 - X0, st, maxL), b = wrapHead(headSegs[1], right[1] - (sx + HEAD_GAP / 2), st, maxL)
      if (!a || !b) continue
      const cost = 100 * Math.max(a.lines.length, b.lines.length) + 10 * (a.lines.length + b.lines.length) + 0.02 * Math.abs(sx - mid)
      if (!best || cost < best.cost) best = { cost, a, b }
    }
    if (!best) return null
    out[0] = best.a; out[1] = best.b
    return out
  }

  // the figure's gutter for a scale k: he stands on the pegs with his pencil >= 26 px inside the frame, and his
  // pointing hand reaches the keys' left edge
  const probe = s('g')
  function zoneFor(k) {
    const f = new Figure(probe, { scale: k })
    let minX = Infinity
    for (const p of [PZ.think, PZ.point, PZ.crouch, PZ.airUp, PZ.airDown, PZ.land, PZ.grab, 'celebrate', 'shrug']) {
      minX = Math.min(minX, f.extentX(fk(poseOf(p), { x: 0, ground: 1000, scale: k }))[0])
    }
    const FX = Math.ceil(26 - minX)
    const Jp = fk(poseOf(PZ.point), { x: FX, ground: 1000, scale: k })
    const X0 = Math.ceil(Jp.sh[0] + 0.84 * (RIG.upperArm + RIG.foreArm) * k + 18)
    return { k, FX, X0 }
  }

  function tryLayout(ep, { z, fm, hm }) {
    const op = Math.min(ep, Math.max(40, Math.round(ep * 0.86)))
    const kp = Math.min(ep, Math.max(40, Math.round(ep * 0.92)))
    const pxOf = j => (j === 0 ? kp : j === EM ? ep : op)
    const cw = []
    for (let j = 0; j < NC; j++) {
      cw.push(Math.max(...rows.map((r, i) => (j === 0 ? wKey(r[0], kp) : wVal(r[j], pxOf(j), j === EM ? 900 : 800) * (j === EM && pickedRows.has(i) ? PSC : 1)))))
    }
    const X0 = z.X0
    const slack = XR - X0 - cw.reduce((a, b) => a + b, 0) - (NC - 1) * GMIN
    if (slack < 0) return null
    // the slack goes evenly into the gaps, unless a long head needs one gap wider (fewest head lines wins)
    const G = NC - 1, splits = [Array(G).fill(1 / G)]
    if (G > 1) for (let q = 0; q < G; q++) for (const f of [0.62, 0.75]) splits.push(Array.from({ length: G }, (_, r) => (r === q ? f : (1 - f) / (G - 1))))
    const anyHead = cols.some(c => plain(c.label || '').trim())
    let pick = null
    for (const sp of splits) {
      const gaps = sp.map(f => GMIN + slack * f)
      const right = [X0 + cw[0]]
      for (let j = 1; j < NC; j++) right.push(right[j - 1] + gaps[j - 1] + cw[j])
      const heads = anyHead ? fitHeads(right, cw, gaps[0], X0, hm) : cols.map(() => ({ lines: [], w: 0 }))
      if (!heads) continue
      const nl = Math.max(...heads.map(x => x.lines.length)), tot = heads.reduce((a, x) => a + x.lines.length, 0)
      const cost = 100 * nl + tot + (sp === splits[0] ? 0 : 0.5)
      if (!pick || cost < pick.cost) pick = { cost, right, heads, nl, gap: gaps[0] }
    }
    if (!pick) return null
    const { right, heads, nl, gap } = pick
    const headH = nl * HEAD_LH
    const fH = fm ? formLines * FORM_LH + 12 : 0
    const yTop = top0 + fH
    const bottom = L.floorY - 6
    const avail = bottom - (yTop + headH + (nl ? 10 : 0))
    // every text run is ~1.21 em tall: neighbouring rows may share up to 5 px of empty line box (never ink; the
    // linter allows 6), counting a picked value grown by PSC - 1 about its bottom edge
    const need = Math.ceil(Math.max(1.21 * ep + 1.1 * (PSC - 1) * ep, 1.21 * op, 1.21 * kp) - 5)
    if (avail / N < need) return null
    const pMax = N <= 6 ? Math.max(need + 30, 2.1 * ep) : Math.max(need + 10, 1.5 * ep)
    const pitch = Math.min(avail / N, pMax)
    const off = Math.round((avail - N * pitch) * (N <= 6 ? 0.5 : 0.35))   // a short table sits mid-frame
    const yHeads = yTop + off
    return { ep, op, kp, cw, right, gap, X0, z, fm, hm, heads, nl, headH, yHeads, rowsTop: yHeads + headH + (nl ? 10 : 0), pitch, pxOf, psc: PSC }
  }

  const KS = lo.figure === false ? [0] : lo.figureScale ? [clamp(+lo.figureScale, 0.4, 0.9)] : [0.72, 0.62, 0.56, 0.5]
  const zoneOf = k => (k ? zoneFor(k) : { k: 0, FX: 0, X0: 62 })
  const zones = KS.map(zoneOf)
  // dense fallbacks: a smaller figure (0.42), then none (the table takes the full width)
  const denseZones = lo.figure === false ? zones : [...zones, ...(lo.figureScale ? [] : [zoneOf(0.42)]), zoneOf(0)]
  const fModes = !formEl ? [false] : lo.formula === true || lo.formula === 'show' ? [true] : [true, false]
  const hModes = lo.heads === 'upper' ? ['upper', 'upper4'] : lo.heads === 'sentence' ? ['sentence'] : ['upper', 'upper4', 'sentence']
  const EPMAX = N <= 6 ? 76 : N <= 9 ? 68 : 60
  let lay = null
  // passes: the normal one; dense (a pick grows 3%, the smaller figure, then no figure); then 36 and 34 px values
  // as the last resort (the linter warns under 40)
  for (const [floorPx, zs, psc] of [[40, zones, PSC_TRY[0]], [40, denseZones, PSC_TRY[1]], [36, denseZones, PSC_TRY[1]], [34, denseZones, 1]]) {
    PSC = psc
    for (const z of zs) for (const fm of fModes) for (const hm of hModes) {
      for (let ep = EPMAX; ep >= floorPx; ep -= 2) {
        const l = tryLayout(ep, { z, fm, hm })
        if (!l) continue
        // a formula is worth ~3 px of type, a bigger figure a little, house caps a little; no figure is a last resort
        l.score = ep + (fm ? 4.5 : 0) + 12 * z.k + (hm === 'upper' ? 1.5 : hm === 'upper4' ? 1 : 0) - (z.k || lo.figure === false ? 0 : 12)
        if (!lay || l.score > lay.score) lay = l
        break
      }
    }
    if (lay) break
  }
  if (!lay) throw new Error('find-your-row: the table does not fit (too many rows, or cells/heads too wide)')
  PSC = lay.psc
  if (formEl && !lay.fm) { formEl.remove(); formEl = null }
  const { ep, kp, right, X0, pitch, rowsTop, pxOf } = lay
  const FIGK = lay.z.k, FX = lay.z.FX

  // vertical geometry: row i's baseline, its ledge, the middle of its caps
  const base = i => rowsTop + Math.round(0.97 * ep) + i * pitch
  // the ledge runs mid-way through the free band between this row's commas (~0.17 em under the baseline) and the
  // next row's "$" (~0.8 em over its baseline); the planks are as thick as that band allows (6 px down to 3)
  const GAPD = clamp(Math.round((0.17 * ep + pitch - 0.8 * ep) / 2), 5, 16)
  const PLANK = clamp(Math.floor(pitch - 0.97 * ep - 2), 3, 6)
  const ledgeY = i => base(i) + GAPD
  const rowMid = i => base(i) - 0.36 * ep
  const boxB = (i, px) => base(i) + 0.14 * px
  const LIFT = clamp(Math.floor(pitch - 1.21 * ep * PSC - 1), 0, 10)
  // (the top row lifts only as far as the gap under the column heads allows)
  const liftMax = i => (i === 0 ? clamp(Math.floor(rowsTop - (lay.yHeads + lay.headH) - 3 - 1.1 * (PSC - 1) * ep), 0, LIFT) : LIFT)
  const wEm = rows.map(r => wVal(r[EM], ep, 900))

  // ================================================================== build
  const world = makeWorld(ctx)
  ctx.stage.append(fixed)                                   // heads and formula above the world
  const g = world.g

  // column heads (bottom-aligned; left over the keys, right over the values)
  const headEls = []
  lay.heads.forEach((hd, j) => {
    if (!hd.lines.length) return
    const el = h('div', { class: 'fy-head' + (lay.hm === 'sentence' ? '' : ' up') + (j === EM ? ' emph' : '') + (cols[j].tone === 'bad' ? ' bad' : cols[j].tone === 'good' ? ' good' : '') })
    el.innerHTML = hd.lines.map(ln => ln.map(tk => tk.parts.map(p => (p.cls === 'em' ? `<em>${esc(p.s)}</em>` : p.cls === 'mark2' ? `<u class="mark2">${esc(p.s)}</u>` : esc(p.s))).join('')).join(' ')).join('<br>')
    style(el, { letterSpacing: HS[lay.hm].ls, top: (lay.yHeads + (lay.nl - hd.lines.length) * HEAD_LH) + 'px', width: Math.ceil(hd.w + 2) + 'px', textAlign: j === 0 ? 'left' : 'right' })
    fixed.append(el)
    style(el, { left: (j === 0 ? X0 : right[j] - el.offsetWidth).toFixed(1) + 'px' })
    headEls.push(el)
  })

  // the lit band behind a picked row, and the pale tint behind a compare's reference row
  const bandX0 = X0 - 20, bandX1 = XR + 14
  const bandTop = i => base(i) - 0.97 * ep * PSC - LIFT - 4
  const bands = rows.map((_, i) => {
    const el = s('rect', { x: bandX0, width: bandX1 - bandX0, y: bandTop(i).toFixed(1), height: (ledgeY(i) + 4 - bandTop(i)).toFixed(1), rx: 14, fill: BAND, opacity: 0 })
    g.back.append(el)
    return el
  })
  const tints = rows.map((_, i) => {
    // (its top edge runs halfway between the ledge above and the caps, never along the row above's plank)
    const y0 = i ? (ledgeY(i - 1) + base(i) - 0.75 * ep) / 2 : base(0) - 0.97 * ep - 2, y1 = ledgeY(i) + 5
    const el = s('rect', { x: bandX0 + 2, width: bandX1 - bandX0 - 4, y: y0.toFixed(1), height: (y1 - y0).toFixed(1), rx: 13, fill: 'none', stroke: C.line, 'stroke-width': 4, opacity: 0, 'data-deco': '' })
    g.back.append(el)
    return el
  })

  // shelving: the post and its pegs (the figure's gutter), the dotted ledges, the planks under the heavy cells
  const showFig = FIGK > 0
  const pegY = []
  for (let i = 0; i < N; i++) pegY.push(ledgeY(i))
  for (let y = ledgeY(N - 1) + pitch; y < L.floorY - 0.6 * pitch; y += pitch) pegY.push(y)
  const POST_X = 34
  if (showFig) {
    const pegX1 = X0 - 30
    g.back.append(s('line', { x1: POST_X, x2: POST_X, y1: (pegY[0] - 26).toFixed(1), y2: L.floorY, stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }))
    for (const y of pegY) g.back.append(s('line', { x1: POST_X, x2: pegX1, y1: y.toFixed(1), y2: y.toFixed(1), stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }))
  }
  const wEmMax = Math.max(...wEm)
  const plankX = () => [right[EM] - wEmMax - 8, right[EM] + 6]          // one width for every row: a shelf, not an underline
  const ledges = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 6, x2: (plankX(i)[0] - 14).toFixed(1), y1: ledgeY(i).toFixed(1), y2: ledgeY(i).toFixed(1), stroke: C.line, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15' })
    g.back.append(el)
    return el
  })
  const litLedges = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 10, x2: (plankX(i)[0] - 12).toFixed(1), y1: ledgeY(i).toFixed(1), y2: ledgeY(i).toFixed(1), stroke: C.hero, 'stroke-width': PLANK, 'stroke-linecap': 'round', opacity: 0 })
    g.back.append(el)
    return el
  })
  const planks = rows.map(() => { const el = s('path', { fill: 'none', stroke: C.ink, 'stroke-width': PLANK, 'stroke-linecap': 'round' }); g.mid.append(el); return el })

  // the cells
  const valColor = j => TONE_TXT[cols[j].tone] || C.ink
  const R = rows.map(r => ({
    key: new NumObj(world.html, { cls: 'fy-key', text: r[0], ax: 0, ay: 1, style: { fontSize: kp + 'px' } }),
    vals: r.slice(1, NC).map((v, jj) => new NumObj(world.html, { cls: 'fy-val' + (jj + 1 === EM ? ' em' : ''), text: v, ax: 1, ay: 1, style: { fontSize: pxOf(jj + 1) + 'px' } })),
  }))

  // ================================================================== picks: windows, pills, the bracket
  // (a pick's window runs from its time until he leaves for the next one; filled in once the moves are known)
  const XB = X0 - 18                                         // the compare bracket's x
  const pills = []
  function makePill(html, { border, caret, maxW }) {
    const el = h('div', { class: 'fy-pill' })
    el.innerHTML = html
    world.html.append(el)
    style(el, { borderColor: border })
    if (el.offsetWidth > maxW) style(el, { fontSize: '40px' })
    if (el.offsetWidth > maxW) {
      el.classList.add('two')
      style(el, { width: maxW + 'px' })
      // shrink-wrap the balanced lines
      const rg = document.createRange(); rg.selectNodeContents(el)
      const tw = Math.max(...[...rg.getClientRects()].map(r => r.width))
      style(el, { width: Math.ceil(tw + 2 * 18 + 8 + 2) + 'px' })
    }
    const w = el.offsetWidth, hh = el.offsetHeight
    // the pop never takes its text under 41 px (the type floor), so 40 px text only fades and slides in
    const px = parseFloat(getComputedStyle(el).fontSize)
    const from = Math.min(1, Math.max(0.86, 41 / px)), sq = clamp(1 - 41.5 / px, 0, 0.04)
    const vb = caret === 'left' ? '0 0 22 30' : '0 0 30 22'
    const sv = s('svg', { class: 'fy-caret', viewBox: vb, width: caret === 'left' ? 22 : 30, height: caret === 'left' ? 30 : 22, 'data-deco': '' })
    const paths = {
      up: ['M0,22 L15,3 L30,22 Z', 'M3,16 L15,4 L27,16'],
      down: ['M0,0 L15,19 L30,0 Z', 'M3,6 L15,18 L27,6'],
      left: ['M22,0 L3,15 L22,30 Z', 'M16,3 L4,15 L16,27'],
    }[caret]
    sv.append(s('path', { d: paths[0], fill: C.white }), s('path', { d: paths[1], fill: 'none', stroke: border, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
    el.append(sv)
    return { el, w, h: hh, caret: sv, kind: caret, from, sq }
  }
  const aimCaret = (pl, x, y) => {
    // caret position inside the pill's box (the svg sits on the rim, its fill covering it)
    if (pl.kind === 'left') style(pl.caret, { left: (-CARET - 4 - 4).toFixed(1) + 'px', top: (clamp(y - pl.y0, 18, pl.h - 18) - 15 - 4).toFixed(1) + 'px' })
    else style(pl.caret, { left: (clamp(x - pl.x0, 26, pl.w - 26) - 15 - 4).toFixed(1) + 'px', top: (pl.kind === 'up' ? -CARET - 4 - 4 : pl.h - 4 - 4 + 0).toFixed(1) + 'px' })
  }
  // the ink band of a row's text (cap top to baseline), its text box (what the linter measures), and the rows a
  // pill covers: any whose text box its text box (the rim inset by ~2 px) overlaps by more than 4 px of empty line
  // box (they clear while it is up)
  const inkTop = i => base(i) - 0.75 * ep, inkBot = i => base(i) + 2
  const boxTop = i => base(i) - 0.97 * ep, boxBot = i => base(i) + 0.24 * ep
  const covered = (y0, y1, skip) => { const out = []; for (let i = 0; i < N; i++) if (!skip.includes(i) && Math.min(boxBot(i), y1 - 2) - Math.max(boxTop(i), y0 + 2) > 4) out.push(i); return out }

  // ================================================================== the figure: stations and moves
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  const fig = showFig ? new Figure(g.fig, { scale: FIGK }) : null
  const SH = showFig ? -fk(poseOf(PZ.point), { x: 0, ground: 0, scale: FIGK }).sh[1] : 0
  const stations = [...pegY, L.floorY]
  const stationFor = r => { const want = rowMid(r) + SH; let b = L.floorY; for (const y of stations) if (Math.abs(y - want) < Math.abs(b - want) - 0.5) b = y; return b }
  const moves = []
  let startY = L.floorY, startRow = null
  {
    let curY = L.floorY, curT = 0
    picks.forEach((pk, n) => {
      const y1 = showFig ? stationFor(pk.row) : L.floorY
      const tArr = pk.t - 0.12
      if (n === 0 && pk.from == null && tArr < 0.6) { startY = curY = y1; startRow = pk.row; curT = tArr; pk.move = { kind: 'start', land: -1, y1 }; moves.push(pk.move); return }
      const dy = y1 - curY
      let m
      if (pk.from != null) {
        // compare: grab the pencil, set it on row `from`, step down (or up) the pegs drawing the bracket. He first
        // gets to row `from`'s peg: a jump when there is time, or (an early first compare) he starts there
        const yF = showFig ? stationFor(pk.from) : curY
        const drawDur = dyv => clamp(0.32 + 0.0012 * Math.abs(dyv), 0.36, 0.8) + 0.42
        if (Math.abs(yF - curY) > 1) {
          const jf = clamp(0.22 + 0.0005 * Math.abs(yF - curY), 0.24, 0.5), jc = Math.abs(yF - curY) > 160 ? 0.2 : 0.14
          if (n === 0 && tArr - drawDur(y1 - yF) - jf - jc - 0.25 < 0.4) { startY = curY = yF; curT = 0 }
          else if (tArr - curT - 0.25 >= drawDur(y1 - yF) + jf + jc + 0.15) {
            const land = tArr - drawDur(y1 - yF) - 0.1
            pk.pre = { kind: 'jump', c0: land - jf - jc, up: land - jf, land, y0: curY, y1: yF, dy: yF - curY, pk: null }
            moves.push(pk.pre)
            curY = yF; curT = land
          }
        }
        const dyd = y1 - curY
        let fl = clamp(0.32 + 0.0012 * Math.abs(dyd), 0.36, 0.8), gr = 0.42
        const room = tArr - curT - 0.25
        if (room < fl + gr) { const q = Math.max(0.4, room / (fl + gr)); fl *= q; gr *= q }
        m = { kind: 'draw', g0: tArr - fl - gr, c0: tArr - fl, up: tArr - fl, land: tArr, y0: curY, y1, dy: dyd, pk }
      } else if (Math.abs(dy) < 1) {
        m = { kind: 'stay', c0: tArr - 0.2, up: tArr - 0.08, land: tArr, y0: curY, y1, dy: 0, pk }
      } else {
        let fl = clamp(0.22 + 0.0005 * Math.abs(dy), 0.24, 0.5), cr = Math.abs(dy) > 160 ? 0.2 : 0.14
        const room = tArr - curT - 0.2
        if (room < fl + cr) { const q = Math.max(0.45, room / (fl + cr)); fl *= q; cr *= q }
        m = { kind: 'jump', c0: tArr - fl - cr, up: tArr - fl, land: tArr, y0: curY, y1, dy, pk }
      }
      pk.move = m
      moves.push(m)
      curY = y1; curT = tArr
    })
  }
  // a pick's window: from its time until he leaves for the next pick (the row drops back then)
  const departOf = m => (m.kind === 'draw' ? m.g0 : m.kind === 'start' ? -1 : m.c0)
  const departPk = pk => (pk.pre ? pk.pre.c0 : departOf(pk.move))
  picks.forEach((pk, n) => {
    const nx = picks[n + 1]
    pk.end = nx ? (showFig ? departPk(nx) : nx.t - 0.05) : Infinity
    if (pk.end < pk.t + 0.25) pk.end = pk.t + 0.25
  })

  // pills: one per labelled pick
  const pillHold = Number.isFinite(+lo.pillHold) && +lo.pillHold > 0.5 ? +lo.pillHold : PILL_HOLD
  picks.forEach((pk, n) => {
    if (!pk.label) return
    const i = pk.row
    const nx = picks[n + 1]
    const t0 = pk.t + 0.04
    let t1 = Math.min(nx ? nx.t - 0.25 : Infinity, t0 + pillHold)
    if (vt != null && vt > t0 + 0.6) t1 = Math.min(t1, vt - 0.02)
    t1 = Math.max(t0 + 0.5, t1)
    if (pk.from != null) {
      // between the two rows (caret on the bracket), or under the lower one when they are neighbours
      const a = Math.min(i, pk.from), b = Math.max(i, pk.from)
      const kind = b - a >= 2 ? 'left' : b < N - 1 ? 'up' : 'down'
      const pl = makePill(markup(pk.label), { border: C.ink, caret: kind, maxW: XR - X0 - 12 })
      const x0 = X0 + 14
      let y0
      if (kind === 'left') {
        const yTopGap = inkBot(a) + 4, yBotGap = inkTop(b) - 0.06 * ep - LIFT - 4
        y0 = (yTopGap + yBotGap) / 2 - pl.h / 2
      } else if (kind === 'up') y0 = ledgeY(b) + CARET + 2
      else y0 = inkTop(a) - LIFT - 0.06 * ep - CARET - 6 - pl.h
      Object.assign(pl, { x0, y0, t0, t1, pk, rows: [] })
      pl.rows = covered(y0, y0 + pl.h, [i, pk.from])
      aimCaret(pl, XB + 14, (rowMid(a) + rowMid(b)) / 2)
      pills.push(pl)
      return
    }
    const below = i < N - 1
    const pl = makePill(markup(pk.label), { border: C.hero, caret: below ? 'up' : 'down', maxW: XR - X0 - 12 })
    const cx = right[EM] - wEm[i] * PSC / 2
    const x0 = clamp(cx - pl.w / 2, X0, XR - pl.w)
    // (under the row: in a roomy table it tucks into the gap above the next row, so that row stays up)
    let y0 = below ? ledgeY(i) + CARET - 4 : base(i) - 0.97 * ep * PSC - LIFT - CARET - 2 - pl.h
    if (below) { const fit = boxTop(i + 1) - pl.h - 2; if (fit >= base(i) + CARET + 8) y0 = Math.min(y0, fit) }
    Object.assign(pl, { x0, y0, t0, t1, pk })
    pl.rows = covered(y0, y0 + pl.h, [i])
    aimCaret(pl, cx, 0)
    pills.push(pl)
  })

  // the compare bracket (pencil): drawn as he steps from row `from` to the picked row; up while the pick is
  const brackets = picks.filter(pk => pk.from != null).map(pk => {
    const el = s('path', { fill: 'none', stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0, 'data-deco': '' })
    g.mid.append(el)
    const m = pk.move
    const d0 = showFig ? m.up : pk.t - 0.4, d1 = showFig ? m.land : pk.t - 0.04
    return { el, pk, d0, d1 }
  })
  const pencil = showFig && brackets.length ? pencilProp(FIGK) : null
  if (pencil) g.front.append(pencil)

  // ---- the figure's pose track and ground
  const keys = [{ t: 0, pose: startRow == null ? PZ.think : PZ.point }]
  if (startRow == null) keys.push({ t: 0.35, pose: { ...PZ.think, tilt: PZ.think.tilt + 8, aF: [22, 150] }, d: 0.3, e: 'inOut' }, { t: 0.75, pose: PZ.think, d: 0.35, e: 'spring' })
  const squashes = []
  for (const m of moves) {
    if (m.kind === 'start') continue
    if (m.kind === 'jump') {
      const big = Math.abs(m.dy) > 160
      keys.push({ t: m.c0, pose: big ? PZ.crouch : PZ.dip, d: Math.max(0.08, (m.up - m.c0) * 0.8), e: 'out' })
      keys.push({ t: m.up, pose: m.dy < 0 ? PZ.airUp : PZ.airDown, d: 0.1, e: 'out' })
      keys.push({ t: m.land - 0.04, pose: PZ.land, d: 0.06, e: 'out' })
      keys.push({ t: m.land + 0.08, pose: PZ.point, d: 0.22, e: 'spring' })
      squashes.push({ t: m.land, amt: big ? 0.2 : 0.14 })
    } else if (m.kind === 'stay') {
      keys.push({ t: m.c0, pose: PZ.dip, d: 0.1, e: 'out' })
      keys.push({ t: m.land - 0.02, pose: PZ.point, d: 0.16, e: 'spring' })
    } else {
      keys.push({ t: m.g0, pose: PZ.grab, d: 0.16, e: 'out' })
      keys.push({ t: m.g0 + 0.2, pose: PZ.point, d: 0.16, e: 'out' })
      keys.push({ t: m.up, pose: PZ.stepDown, d: 0.14, e: 'inOut' })
      keys.push({ t: m.land, pose: PZ.point, d: 0.2, e: 'spring' })
      squashes.push({ t: m.land, amt: 0.1 })
    }
  }
  const lastPick = picks.length ? picks[picks.length - 1] : null
  const endKey = Object.prototype.hasOwnProperty.call(END, lo.endPose) ? lo.endPose : lastPick ? 'point' : 'celebrate'
  const tEnd = vt != null && (!lastPick || vt > lastPick.t + 0.3) ? vt : null
  if (tEnd != null && END[endKey]) keys.push({ t: tEnd + 0.05, pose: END[endKey], d: 0.24, e: 'spring' })
  const tr = poseTrack(keys)
  const groundAt = t => {
    let y = startY
    for (const m of moves) {
      if (m.kind === 'start' || m.kind === 'stay') continue
      if (t < m.up) return y
      if (t < m.land) {
        const p = prog(t, m.up, m.land - m.up)
        if (m.kind === 'draw') return lerp(m.y0, m.y1, E.inOut(p))
        return arc(p, [0, m.y0], [0, m.y1], m.dy < 0 ? 24 + 0.06 * -m.dy : 16)[1]
      }
      y = m.y1
    }
    return y
  }
  // where his front hand is pinned (null = free): the row he points at, or the bracket's growing end
  const bracketEnd = (b, t) => lerp(rowMid(b.pk.from), rowMid(b.pk.row), E.inOut(prog(t, b.d0, b.d1 - b.d0)))
  const pinAt = t => {
    let cur = null
    for (const pk of picks) {
      const m = pk.move
      if (!m) continue
      const on = m.kind === 'draw' ? m.g0 + 0.2 : m.land - 0.02
      if (t < on) break
      cur = { pk, m, on }
    }
    if (!cur) return null
    const { pk, m, on } = cur
    if (endKey !== 'point' && tEnd != null && t >= tEnd) return null
    const off = pk.end
    const w = E.out(prog(t, on, 0.14)) * (1 - E.in(prog(t, off - 0.02, 0.1)))
    if (w <= 0) return null
    let y
    if (m.kind === 'draw') {
      const b = brackets.find(x => x.pk === pk)
      y = t < m.land ? bracketEnd(b, t) : rowMid(pk.row) - liftOf(pk.row, t)
    } else y = rowMid(pk.row) - liftOf(pk.row, t)
    return { w, x: m.kind === 'draw' ? XB - 4 : X0 - 16, y, draw: m.kind === 'draw' && t < off }
  }

  // ================================================================== motion helpers (pure in t)
  // the latest pick on row i that has started, its lift and glow
  const pickOn = (i, t) => { let c = null; for (const pk of picks) if (pk.row === i && pk.t <= t) c = pk; return c }
  function liftOf(i, t) {
    const pk = pickOn(i, t)
    const Lm = liftMax(i)
    if (!pk || !Lm) return 0
    // (an underdamped spring: it overshoots a little, so the line boxes get 2 px of slack above)
    if (t < pk.end) return Math.min(Lm, springStep(t, pk.t, 0, Lm, { freq: 3, damp: 0.42 }))
    return Math.min(Lm, springStep(t, pk.end, Math.min(Lm, springStep(pk.end, pk.t, 0, Lm, { freq: 3, damp: 0.42 })), 0, { freq: 3.4, damp: 0.38 }))
  }
  const glowOf = (i, t) => { const pk = pickOn(i, t); return pk ? clamp((t - pk.t) / 0.1) * (1 - clamp((t - pk.end) / 0.16)) : 0 }
  const tintOf = (i, t) => {
    let v = 0
    for (const b of brackets) if (b.pk.from === i) v = Math.max(v, clamp((t - b.d0) / 0.15) * (1 - clamp((t - b.pk.end) / 0.16)))
    return v
  }
  // a heavy cell's plank sags on impact and springs back
  const sagOf = (i, t) => { const dt = t - landT[i]; return dt < 0 || landT[i] < 0 ? 0 : 7 * Math.exp(-6.5 * dt) * Math.cos(2 * Math.PI * 3.2 * dt) }
  const dd = D => Math.sqrt((2 * D) / 5200)
  // how far a cell may fall: its ink never comes down through the row above (rows fill top to bottom), only
  // "the last few px"; a heavy cell falls further when there is room
  const headsBottom = lay.yHeads + lay.headH
  const dropOf = (i, j) => {
    const px = pxOf(j), heavy = j === EM
    // (the "$" rises ~0.8 em; the plank above is 6 px thick)
    const room = i === 0 ? base(0) - 0.8 * px - headsBottom - 6 : pitch - 0.8 * px - GAPD - 3 - 4
    return clamp(Math.round(room), 0, heavy ? HEAVY_DROP : LIGHT_DROP)
  }
  const squashAmt = clamp(1 - 41 / ep, 0, 0.18)

  // ================================================================== cues
  rows.forEach((_, i) => {
    if (landT[i] <= 0.02) return
    const lastRow = landT[i] >= Math.max(...landT) - 1e-6
    ctx.cue(landT[i], 'thud', { gain: lastRow ? 0.42 : 0.28 })
  })
  for (const m of moves) {
    if (m.kind === 'jump') {
      if (Math.abs(m.dy) > 160) ctx.cue(m.up, 'swipe', { gain: 0.3, dur: 0.18 })
      if (Math.abs(m.dy) > 300) fxk.impact(m.land, { x: FX, y: m.y1 - 4, r: 26, rx: 46, ry: 14, lines: 8, shake: 3, cue: 'step', gain: 0.55 })
      else ctx.cue(m.land, 'step', { gain: 0.45 })
    } else if (m.kind === 'draw') {
      ctx.cue(m.g0 + 0.16, 'tick', { gain: 0.35 })
      ctx.cue(m.up, 'swipe', { gain: 0.35, dur: Math.max(0.15, m.land - m.up) })
    }
  }
  if (!showFig) for (const b of brackets) ctx.cue(b.d0, 'swipe', { gain: 0.35, dur: b.d1 - b.d0 })
  // a label pops; a quiet pick at the verdict leaves the sound to the verdict's ding
  for (const pk of picks) if (pk.label || Math.abs(pk.t - (vt ?? -9)) > 0.1) ctx.cue(pk.t + (pk.label ? 0.05 : 0), pk.label ? 'pop' : 'tick', { gain: pk.label ? 0.5 : 0.4 })

  // ================================================================== seek
  let lastBeat = Math.max(...landT, 0)
  for (const pk of picks) lastBeat = Math.max(lastBeat, pk.t + 0.6)
  const duration = durationOf(spec, lastBeat, d.hold ?? 4)
  const newestRow = t => { let r = -1, best = -Infinity; for (let i = 0; i < N; i++) if (landT[i] <= t && landT[i] >= best) { best = landT[i]; r = i } return r }
  const firstDepart = moves.length ? Math.min(...moves.map(m => (m.kind === 'start' ? Infinity : departOf(m)))) : Infinity

  function drawFigure(t) {
    let P = tr.at(t)
    const prev = tr.at(t - 0.07)
    // before he first sets off: his head follows the rows as they land (he reads the shelves)
    if (startRow == null && t < firstDepart + 0.1) {
      const r = newestRow(t)
      const ty = r >= 0 ? rowMid(r) : rowMid(0)
      const hx = FX, hy = startY - 0.86 * 262 * FIGK
      const look = clamp(-Math.atan2(hy - ty, Math.max(60, X0 + 180 - hx)) * 180 / Math.PI * 0.55, -26, 6)
      P = { ...P, tilt: lerp(P.tilt, look, 0.8 * (1 - prog(t, firstDepart - 0.1, 0.2))) }
    }
    // stepping down (or up) the pegs while he draws the bracket: the legs alternate, one step per peg
    for (const m of moves) if (m.kind === 'draw' && t > m.up && t < m.land + 0.05) {
      const steps = Math.abs(groundAt(t) - m.y0) / pitch, sw = Math.sin(Math.PI * steps)
      const k2 = bump(t, m.up - 0.02, m.land - m.up + 0.09)
      P = { ...P, lF: [P.lF[0] + 26 * sw * k2, P.lF[1] - 30 * Math.max(0, sw) * k2], lB: [P.lB[0] - 22 * sw * k2, P.lB[1] - 30 * Math.max(0, -sw) * k2] }
    }
    // a nod as the verdict lands
    if (tEnd != null && endKey === 'point') P = { ...P, tilt: P.tilt + 12 * bump(t, tEnd, 0.5) }
    P = secondary(P, t, { prev })
    const J = fk(P, { x: FX, ground: groundAt(t), scale: FIGK })
    const pin = pinAt(t)
    let tip = null
    if (pin) {
      const free = { hF: J.hF, eF: J.eF }
      const tgt = pin.draw ? [pin.x - 24, pin.y + 8] : [pin.x, pin.y]
      pinLimb(J, 'hF', tgt, 1)
      J.hF = [lerp(free.hF[0], J.hF[0], pin.w), lerp(free.hF[1], J.hF[1], pin.w)]
      J.eF = [lerp(free.eF[0], J.eF[0], pin.w), lerp(free.eF[1], J.eF[1], pin.w)]
      if (pin.draw) tip = [pin.x, pin.y]
    }
    let sq = { sx: 1, sy: 1 }
    for (const q of squashes) { const z = squashAt(t, q.t, q.amt); sq = { sx: sq.sx * z.sx, sy: sq.sy * z.sy } }
    fig.draw(J, sq)
    // the pencil: in his hand from the grab until he leaves the compare, behind his head otherwise
    if (pencil) {
      let held = null
      for (const b of brackets) { const m = b.pk.move; if (t >= m.g0 + 0.16 && t < b.pk.end) held = b }
      attr(fig.pencil, 'display', held ? 'none' : 'inline')
      if (held) {
        const hx = J.hF[0], hy = J.hF[1]
        const tx = tip ? tip[0] : hx + 30, ty = tip ? tip[1] : hy - 8
        const a = Math.atan2(ty - hy, tx - hx) * 180 / Math.PI
        const lenTo = Math.hypot(tx - hx, ty - hy)
        attr(pencil, 'transform', `translate(${(hx + (tx - hx) * Math.min(1, 26 / Math.max(1, lenTo))).toFixed(1)},${(hy + (ty - hy) * Math.min(1, 26 / Math.max(1, lenTo))).toFixed(1)}) rotate(${a.toFixed(1)})`)
        attr(pencil, 'display', 'inline')
      } else { attr(pencil, 'display', 'none'); attr(pencil, 'transform', '') }
    }
  }

  function seek(t) {
    // pills first: they hide the rows they sit on
    const hide = new Array(N).fill(0)
    for (const pl of pills) {
      const on = t >= pl.t0 && t < pl.t1 + 0.12
      if (!on) { style(pl.el, { display: 'none' }); continue }
      const pp = popIn(t, pl.t0, 0.24, pl.from)
      const out = 1 - prog(t, pl.t1, 0.12)
      const sq = squashAt(t, pl.t0 + 0.12, pl.sq)
      const lift = liftOf(pl.pk.row, t)
      const oy = pl.kind === 'down' ? -lift : 0
      style(pl.el, {
        display: '',
        transformOrigin: pl.kind === 'left' ? '0% 50%' : pl.kind === 'down' ? '50% 100%' : '50% 0%',
        transform: `translate(${pl.x0.toFixed(1)}px,${(pl.y0 + oy + (pl.kind === 'down' ? 1 : -1) * 10 * (1 - out)).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
        opacity: (pp.opacity * out).toFixed(3),
      })
    }
    for (const pl of pills) {
      // the rows a pill sits on clear just before it pops and come back once it has gone (never a ghost overlap)
      const hv = clamp((t - (pl.t0 - 0.09)) / 0.07) * (1 - clamp((t - (pl.t1 + 0.14)) / 0.1))
      if (hv > 0) for (const i of pl.rows) hide[i] = Math.max(hide[i], hv)
    }
    for (let i = 0; i < N; i++) {
      const Ti = landT[i]
      const fade = 1 - hide[i]
      const reach = prog(t, Ti - 0.2, 0.2)
      const lift = liftOf(i, t), glow = glowOf(i, t)
      const row = R[i]
      row.key.set({ x: X0, y: boxB(i, kp) - lift, color: mixc(C.dim, C.ink, reach), opacity: fade })
      for (let j = 1; j < NC; j++) {
        const heavy = j === EM, px = pxOf(j)
        const D = dropOf(i, j)
        const t0 = Ti - dd(D)
        const f = Ti < 0 ? { y: 0 } : fall(t, t0, D, { e: heavy ? 0.2 : 0.3, n: heavy ? 1 : 2 })
        const sq = heavy && Ti >= 0 ? squashAt(t, Ti, squashAmt) : { sx: 1, sy: 1 }
        // a heavy cell also pops in (from >= 41 px) as it lands, so it lands with weight even with no room to fall
        const pop = heavy && Ti >= 0 ? popIn(t, Ti - 0.09, 0.24, Math.min(1, Math.max(0.86, 41 / px))) : { scale: 1, opacity: 1 }
        const sc = (heavy ? 1 + (PSC - 1) * glow : 1) * pop.scale
        let color = valColor(j)
        if (heavy) {
          const fresh = emTone === 'bad' ? C.red : emTone === 'goal' || emTone === 'neutral' ? C.ink : C.heroInk
          const settled = emTone === 'bad' ? C.red : C.ink
          color = mixc(fresh, settled, Ti < 0 && nextLand(i) <= 0 ? 1 : prog(t, nextLand(i), 0.25))
          color = mixc(color, emTone === 'bad' ? C.red : C.heroInk, glow)
        }
        // in flight, and while a heavy cell rides its plank's rebound, its line box may reach into the row above's
        // (the ink never does)
        row.vals[j - 1].overlap(Ti >= 0 && t >= Math.min(t0, Ti - 0.09) && t < Ti + (heavy ? 0.5 : 0))
        row.vals[j - 1].set({
          x: right[j], y: boxB(i, px) - f.y + (heavy ? sagOf(i, t) : 0) - lift,
          sx: sc * sq.sx, sy: sc * sq.sy,
          opacity: fade * (Ti < 0 ? 1 : heavy ? (t >= Math.min(t0, Ti - 0.09) ? pop.opacity : 0) : t >= t0 ? clamp((t - t0) / 0.03) : 0),
          color,
        })
      }
      // the plank under the heavy cell (it arrives with its value, sags under it)
      const [px0, px1] = plankX(i)
      const sag = sagOf(i, t), ly = ledgeY(i) - lift * 0.5
      attr(planks[i], 'd', `M${px0.toFixed(1)},${ly.toFixed(1)} Q${((px0 + px1) / 2).toFixed(1)},${(ly + 2 * sag).toFixed(1)} ${px1.toFixed(1)},${ly.toFixed(1)}`)
      attr(planks[i], 'stroke', mixc(C.ink, C.hero, glow))
      attr(planks[i], 'opacity', String(+lerp(Ti < 0 ? 1 : 0.18 + 0.82 * prog(t, Ti - 0.02, 0.06), 0.18, hide[i]).toFixed(3)))
      attr(ledges[i], 'opacity', String(+(1 - 0.35 * prog(t, Ti, 0.3)).toFixed(3)))
      attr(litLedges[i], 'opacity', String(+glow.toFixed(3)))
      attr(bands[i], 'opacity', String(+glow.toFixed(3)))
      attr(bands[i], 'transform', `translate(0,${(-lift * 0.5).toFixed(1)})`)
      attr(tints[i], 'opacity', String(+(tintOf(i, t) * (1 - glow)).toFixed(3)))
    }
    for (const b of brackets) {
      const on = t >= b.d0 && t < b.pk.end + 0.16
      if (!on) { attr(b.el, 'opacity', '0'); attr(b.el, 'd', 'M0,0'); continue }     // (one canonical hidden state)
      const yF = rowMid(b.pk.from) - liftOf(b.pk.from, t), yE = t >= b.d1 ? rowMid(b.pk.row) - liftOf(b.pk.row, t) : bracketEnd(b, t)
      const done = prog(t, b.d1 - 0.02, 0.08)
      let dpath = `M${XB + 12},${yF.toFixed(1)} L${XB},${yF.toFixed(1)} L${XB},${yE.toFixed(1)}`
      if (done > 0) dpath += ` L${(XB + 12 * done).toFixed(1)},${yE.toFixed(1)}`
      attr(b.el, 'd', dpath)
      attr(b.el, 'opacity', String(+(1 - clamp((t - b.pk.end) / 0.16)).toFixed(3)))
    }
    if (showFig) drawFigure(t)
    const { shake, zoom } = fxk.seek(t)
    cam.set({ shake: [clamp(shake[0], -3, 3), shake[1]], zoom })
  }

  const verdictCue = vt != null && (spec.sfx || []).some(x => x && x.kind === 'ding' && Math.abs(x.t - vt) < 0.15) ? null : 'ding'
  return { duration, seek, chrome: { verdictCue } }
}
