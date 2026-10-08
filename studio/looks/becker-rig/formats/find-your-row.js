// becker-rig · find-your-row (FORMATS.md §2): one row per kind of viewer, denser than one pass can read. The
// viewer's job is to find their own row, so they pause, replay or save.
//
// The table is a set of shelves. Every row has its own ledge (a dotted guide, as in the flagship), and the
// emphasised column stands on solid ink planks, one width for every row. The shelving's left side is a post with a
// peg at every ledge (filler pegs carry on down to the floor), and the figure lives on those pegs, in a gutter left
// of the keys. Under the last row sits the note shelf (when the layout gives it room): the formula as a footnote, and
// the pick labels, one at a time, so a label never covers a row.
//   Frame 1  every row's key (column 1) is already on its ledge, dim, and the empty planks show as grey slots, so
//            each viewer can find their row before the values arrive (the benchmark mechanic: the ages are on screen
//            at 0.0 s). Rows with t <= 0 (and lookOpts.prefill rows) are already stocked. The formula is up (on the
//            note shelf, under the footer, or in the caption band until the first caption). A pick at t < 0.15 is
//            already lit, labelled and pointed at. Otherwise the figure stands on the floor, hand on chin, looking up
//            the shelves (a nod in the first second); his head follows the rows as they land.
//   Fill     top to bottom, each row's values land on their ledge. Rows fill downwards, so a cell may only fall
//            "the last few px" (never through the row above): the light cells fall that far; the emphasised cell is
//            the heavy one: it pops in (never under 41 px), lands with a squash, and its plank bows under it and
//            springs back. The newest emphasised value is green and settles to ink when the next row lands (the
//            last one after 0.8 s; when a pick lights in that frame it snaps to ink with the pick's glow, in 0.1 s);
//            the key turns from dim to ink. While a pick is lit, rows land straight in ink (the picked row stays the
//            only green thing on screen). Sound: a soft `thud` per row (0.15 under a lit pick); a fast fill (rows
//            < 0.3 s apart) is one `roll` over the run plus a `thud` on its last row.
//   Pick     the figure crouches and leaps up (or hops down) the pegs to the picked row (`swipe` on a big take-off,
//            `step` on landing) and points at it, his hand pinned to the row's left end by IK. The row lifts off its
//            ledge (as far as the pitch allows, often 0 in a dense table) and lights in the emphasised column's tone
//            (good: green, bad: red, goal/neutral: ink): a pale band, its ledge and plank take the tone, its
//            emphasised value grows 6% (3% in the dense passes). The label pops (`pop`) as a pill with a rim in that
//            tone: on the note shelf, else in the table under the row (over the last row: above it), caret on the
//            value, right of the key column. An in-table pill hides only the cells its own box crosses (never a
//            key), holds at most lookOpts.pillHold s and closes as the verdict lands; a shelf label (or an in-table
//            one that covers nothing) holds until the next pick, the last one through the verdict. When he leaves
//            for the next pick the row drops back onto its ledge.
//   Compare  a pick named in lookOpts.compare is measured: he gets to row `from`'s peg (a jump, or an early first
//            compare starts him there), takes the pencil from behind his head (`tick`), sets it on row `from` and
//            steps down (or up) the pegs to the picked row, one leg per peg, drawing a bracket beside the keys as he
//            goes (`swipe`; drawn at the look's prop stroke, 10 px; its ticks stop >= 13 px short of the keys). Its
//            label is an ink-rimmed pill (on the shelf; in the table: between the two rows when the gap holds it,
//            else under the lower one). Row `from` is the reference while the bracket is up: a soft grey band
//            behind it (red text keeps 3.5:1 on it) and its ledge in solid ink, so the row reads as underlined.
//   Payoff   the last pick is the climax (the last labelled pick, or the lookOpts.verdictRow pick when that comes
//            later): as it lands, its emphasised value turns ink on a gold plate (coin fill, whatever the column's
//            tone; an ink rim when the pitch allows) with the impact kit (hit lines fanning right of the plate, a shake,
//            a 2% punch, `hit`, then `cash` unless the column is a cost or the verdict lands on it). It is the only
//            impact in the short. On the note shelf its label is 48 px when that fits (one line), popping with the
//            plate. Its label, the glow and the plate hold through the verdict. The plate stays 3 px clear of the
//            row above's plank (at a tight pitch its "$" may reach a few px past the plate's top edge).
//   Verdict  the chrome's verdict in the caption band (its `ding` is skipped when the spec cues one at verdict.t).
//            He nods and keeps pointing at the last pick (lookOpts.endPose).
//   Loop     (lookOpts.loop, default on) the finished table holds (the cover frame), then in the last 0.7 s it
//            clears back to frame 1: the plate and the labels go, the values tip off their planks and fall (pre-stocked
//            rows stay), the keys dim, the verdict fades, and he hops back down to the floor (`swipe`, `step`). The
//            last frame is frame 1. Without spec.duration the clear is added after the hold. With the channel's
//            end card (ctx.brand.cta) there is no clear: the table and the verdict hold to the end, under the card.
//
// Layout (measured at mount; the best score wins). Keys are left-aligned at the table's left edge; value columns
// are right-aligned, the last at x 922; the slack goes evenly into the gaps, or more of it into one gap when that
// saves a head line. Values run 76 (5-6 rows) / 68 (7-9) / 60 px down to 40 (the emphasised column at that size,
// the others ~0.86 / 0.92 of it, never under 40); neighbouring rows may share up to 5 px of empty line box (never
// ink), so 14 rows fit at 40 px under a 2-line hook and a 2-line footer. Column heads are 40 px on a 44 px line,
// bottom-aligned, >= 40 px apart: house caps (.07em, then .04em) on at most two lines, else sentence case on up to
// three (`__x__` red, `**x**` green, `\n` forces a break; a column's tone colours its head). The notes are scored
// against the type: the formula (a mono 40 px line or two, numbers in ink) is worth 8 px of value type, on the note
// shelf ("foot", shared with the labels: it shows whenever no label is up; right-aligned, it may reach 40 px left of
// the keys, short of the pegs, to stay on one line) or under the footer ("top"); labels that
// cover no row (on the shelf, or in a table roomy enough to tuck them between rows) are worth 8 px more. When the
// table cannot spare the formula a line, it shows in the caption band while no caption is up (a gap >= 1.4 s
// before the verdict), else it is dropped with a console warning. The figure is 0.72 when the width allows (0.62,
// 0.56, 0.5 otherwise). The shelving post stands at x 22; in the poses he holds on screen (hand on chin, the
// shrug, pointing) his pencil and limbs stay >= 12 px right of its centre line, >= 26 px inside the frame in any. When nothing fits at 40 px: a pick grows 3%, the figure goes to 0.42, then no figure (the
// table takes the full width), and only then 36 / 34 px values (the linter warns). A short table sits mid-frame
// with a taller pitch. Real limits: 3 columns x 14 rows, or 4 columns of values up to ~8 characters.
//
// data: FORMATS.md §2 exactly: columns [{ label, emph?, tone? }] (plain strings work too), rows [[display, ...]],
// formula, rowsT (0.4), rowEvery (0.25) or rowT [..], pick [{ t, row, label }], hold (4). A picked row lands by its
// pick at the latest. Column tone: `bad` = red values and head, `good` = green values; the emphasised column's tone
// sets its fresh / picked colour (default good: green; bad: red; goal or neutral: ink). Every number shown is a spec
// display string; nothing is computed or re-formatted.
//
// lookOpts (all optional; it renders fully without them). compare and verdictRow mean the same as in the live-sheet
// and clean-sheet kits, so a port keeps them:
//   compare: [{ pick, from }]   pick number `pick` (its index in data.pick) is measured from row `from` (any row)
//                               start (optional, s): a timed compare. He sets off for row `from` at `start` (the
//                               VO word that starts the comparison), row `from` takes its grey frame as he lands
//                               on it, he takes the pencil at once and the bracket fills the time up to the pick,
//                               so the plate lands on the word the pick is timed to (default: he arrives just in
//                               time for the pick, a quick draw)
//   beats: [{ t, act, d }]      scripted acts: a POSES name (or a local pose: think, crouch, grab, ...) played over
//                               his track from t for d s (default 1.2), easing in 0.2 s and out 0.25 s; the pinned
//                               pointing hand wins while a pick holds. A beat that starts while a pick holds also
//                               taps its value (the picked emphasised cell pulses 5%, its plank dips 3 px), so the
//                               act lands on the number being said. No sound of their own
//   verdictRow: 2               at verdict.t, row 2 is picked too (he goes there; no label, no extra sound)
//   prefill: 3                  the first 3 rows are already stocked at frame 1, whatever rowsT says
//   pillHold: 2                 the longest an in-table label stays up (s); on a shelf shared with the formula, a
//                               label gives the shelf back after 3.2 s (or this) when the formula then gets >= 1.2 s
//   labels: 'auto'              'shelf' (always on the note shelf) | 'table' (always in the table)
//   formula: 'auto'             true: always show data.formula (the rows give way) | false: never |
//                               'top' (under the footer) | 'foot' (on the note shelf)
//   plate: true                 false: no gold plate (and no impact) on the payoff
//   loop: true                  false: no clear at the end (the last frame is the full table)
//   heads: 'auto'               'upper' (house caps) | 'sentence' (as written)
//   figure: true                false: no figure (the table takes the full width; picks still lift and glow, and
//                               the bracket draws itself)
//   figureScale: 0.72           size of the figure (0.4-0.9; the gutter widens with it)
//   endPose: 'point'            his pose from verdict.t: 'point' (keeps pointing, with a nod) | 'celebrate' |
//                               'shrug' | 'slump' | 'think' (default 'celebrate' when there are no picks)
import {
  h, s, style, attr, prog, clamp, lerp, plain, markup, toneOf,
  C, F, L, E, S as STROKE, RIG, POSES, poseOf, poseTrack, blendPose, fk, secondary, Figure, makeWorld, makeFx, camera, NumObj, pinLimb,
  chromeParts, durationOf, measure, squashAt, fall, popIn, springStep, arc, bump, wordTokens,
} from '../lib.js'

export const css = `
.fy-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.fy-head { position: absolute; font-family: ${F.head}; font-weight: 800; font-size: 40px; line-height: 44px; color: ${C.grey}; white-space: nowrap; }
.fy-head.up { text-transform: uppercase; }
.fy-head.emph { color: ${C.ink}; }
.fy-head.bad { color: ${C.red}; }
.fy-head.good { color: ${C.heroInk}; }
.fy-formula { position: absolute; left: 62px; top: 0; width: 878px; font: 700 40px/54px ${F.mono}; letter-spacing: -0.02em; color: ${C.grey}; text-wrap: balance; }
.fy-formula b { color: ${C.ink}; font-weight: 800; }
.fy-formula.cap { text-align: center; }
.fy-formula.foot { text-align: right; }
.fy-key { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.02em; }
.fy-val { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.03em; word-spacing: 0.14em; }
.fy-val.em { font-weight: 900; }
.fy-pill { position: absolute; left: 0; top: 0; box-sizing: border-box; padding: 0 18px; border-radius: 14px; border: 4px solid; background: ${C.white};
  font-family: ${F.head}; font-weight: 800; font-size: 42px; line-height: 46px; letter-spacing: -0.01em; color: ${C.ink}; white-space: nowrap; }
.fy-pill.two { white-space: normal; text-wrap: balance; }
.fy-pill em { color: ${C.heroInk}; }
.fy-plate { position: absolute; left: 0; top: 0; box-sizing: border-box; background: ${C.coin}; border: 0 solid ${C.ink}; border-radius: 12px; transform-origin: 100% 50%; }
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
const PILL_LH = 46, PILL_BW = 4, PILL_PAD = 18
const HEAVY_DROP = 40, LIGHT_DROP = 22    // the most a cell falls (less when the row above is close)
const PILL_HOLD = 2.0      // an in-table label's longest stay (it hides the cells under it while it is up)
const SHELF_HOLD = 3.2     // a shelf label gives the shelf back to the formula after this, when that is worth it
const SHELF_PAD = [8, 6]   // the note shelf: px under the last row's plank, and over the floor line
const SHELF_IN = 12        // the shelf's pills may start this far left of the keys
const W_FORM = 8, W_NOTES = 8   // the formula / labels that cover no row are worth this many px of value type
const LOOP = 0.7           // the loop clear (s)
const POST_X = 22          // the shelving post (x of its centre line; 8 px wide)
const POST_CLEAR = 12      // in the poses he holds on screen, his pencil and limbs stay this far right of the post's centre
const FORM_IN = 40         // the formula on the note shelf may reach this far left of the keys (the pegs stop short of it)
const PILL_BIG = 48        // the payoff's shelf label (it pops with the plate): 48 px on one line when it fits
const BRK_W = STROKE.prop  // the compare bracket: the look's prop stroke, so it reads beside the figure
const BRK_TICK = 10        // its end ticks (they stop >= 13 px short of the keys: a tick that close reads as a minus)
const REF_BAND = '#F1F3F6'    // a compare's reference row: a soft grey band (red text keeps 3.5:1 on it) and an ink ledge while the bracket is up

const esc = x => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const rgbOf = c => (c[0] === '#' ? [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16)) : c.match(/[\d.]+/g).slice(0, 3).map(Number))
const mixc = (a, b, p) => { const x = rgbOf(a), y = rgbOf(b), q = clamp(p); return q <= 0 ? a : q >= 1 ? b : `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * q)).join(',')})` }
const TONE_TXT = { bad: C.red, good: C.heroInk, goal: C.ink, neutral: C.ink }

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
  const FPS = spec.fps || 30
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
  // the pick highlight takes the emphasised column's tone: good = green, bad = red, goal / neutral = ink
  const hiTone = emTone === 'bad' || emTone === 'good' ? emTone : 'neutral'
  const tn = toneOf(hiTone)
  const HI = { text: tn.text, fill: hiTone === 'neutral' ? C.ink : tn.fill, band: mixc(tn.soft, C.white, hiTone === 'bad' ? 0.62 : 0.42) }

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
    if (pk && Number.isInteger(c.from) && c.from >= 0 && c.from < N && c.from !== pk.row) {
      pk.from = c.from
      // a timed compare: he sets off for row `from` at `start` (on the VO word) and the bracket fills the time to
      // the pick, so the measuring plays under the line that names it
      if (c.start != null && Number.isFinite(+c.start) && +c.start < pk.t - 0.8) pk.cstart = +c.start
    }
  }
  if (Number.isInteger(lo.verdictRow) && lo.verdictRow >= 0 && lo.verdictRow < N && vt != null) picks.push({ t: vt, row: lo.verdictRow, label: '', idx: -1, from: null, quiet: true })
  picks.sort((a, b) => a.t - b.t)
  // a pick at t < 0.15 is already up at frame 1 (glow, label and the cells it hides: no half state on the cover)
  for (const pk of picks) { pk.pre = pk.t < 0.15; pk.tg = pk.pre ? -1 : pk.t }
  // a picked (or compared) row has landed before it is picked
  for (const p of picks) for (const r of [p.row, p.from]) if (r != null) times[r] = Math.min(times[r], p.t - 0.2)
  const landT = times.map(x => (x <= 0 ? -0.6 : x))
  const labelled = picks.filter(p => p.label)
  // the payoff: the last pick (the gold plate and the short's one impact)
  const climax = picks.length ? picks[picks.length - 1] : null
  const plateOn = !!climax && climax.t >= 0.5 && lo.plate !== false

  // ---- duration and the loop clear (the last LOOP s return the frame to frame 1)
  let lastBeat = Math.max(...landT, 0)
  for (const pk of picks) lastBeat = Math.max(lastBeat, pk.t + 0.6)
  const hold = d.hold ?? 4
  let loopOn = lo.loop !== false
  const D = spec.duration ? spec.duration : Math.round((durationOf(spec, lastBeat, hold) + (loopOn ? LOOP : 0)) * FPS) / FPS
  const loopT0 = D - LOOP
  // with the channel's end card after the teaser (ctx.brand.cta) the short no longer loops into frame 1: the card
  // holds the last teaser frame under it. So the clear is skipped (D stays the same: the finished table and the verdict
  // hold to the end, as with loop: false). The one deliberate difference from --no-brand (see README, "Brand")
  if (ctx.brand && ctx.brand.cta) loopOn = false
  if (loopOn && (loopT0 < lastBeat + 0.3 || (vt != null && loopT0 < vt + 1.2))) {
    console.warn('find-your-row: the duration leaves no room for the loop clear; lookOpts.loop ignored')
    loopOn = false
  }
  const END_T = loopOn ? loopT0 : D + 1                       // when the finished table stops holding

  // ================================================================== layout
  const parts = chromeParts(spec, ctx)
  const top0 = parts.footerBottom + 14
  const fixed = h('div', { class: 'fy-fixed' })
  ctx.stage.append(fixed)

  // the formula (mono, numbers in ink), measured at each width it may get
  let formEl = null
  const fText = d.formula ? String(d.formula) : ''
  const fOpt = lo.formula
  if (fText && fOpt !== false && fOpt !== 'hide') {
    formEl = h('div', { class: 'fy-formula' })
    formEl.innerHTML = /\*\*|__/.test(fText) ? markup(fText)
      : esc(fText).replace(/(≈\s*)?[−-]?\$?\d[\d,]*(\.\d+)?(%|[KMBT]\b)?/g, m => `<b>${m}</b>`)
    fixed.append(formEl)
  }
  const flc = new Map()
  const formLinesAt = w => {
    if (!formEl) return 0
    w = Math.round(w)
    if (!flc.has(w)) { formEl.style.width = w + 'px'; flc.set(w, Math.round(formEl.offsetHeight / FORM_LH)) }
    return flc.get(w)
  }
  const fTopLines = formLinesAt(878)

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

  // pill sizing at a max width: 42 px on one line, else 40 px, else two balanced lines at 40 px (DOM-measured). The
  // payoff's shelf label (big) is 48 px on one line when that fits, else sized as any other
  const pc = new Map()
  function sizePill(html, maxW, big = false) {
    maxW = Math.floor(maxW)
    const key = maxW + '|' + (big ? 'B|' : '') + html
    let r = pc.get(key)
    if (r) return r
    const el = h('div', { class: 'fy-pill' })
    el.innerHTML = html
    fixed.append(el)
    if (big) {
      style(el, { fontSize: PILL_BIG + 'px', lineHeight: (PILL_BIG + 4) + 'px' })
      if (el.offsetWidth <= maxW) {
        r = { px: PILL_BIG, lh: PILL_BIG + 4, two: false, w: el.offsetWidth, h: el.offsetHeight, width: '', lines: 1 }
        el.remove()
        pc.set(key, r)
        return r
      }
      el.remove()
      r = sizePill(html, maxW, false)
      pc.set(key, r)
      return r
    }
    let px = 42
    if (el.offsetWidth > maxW) { px = 40; el.style.fontSize = '40px' }
    if (el.offsetWidth > maxW) {
      el.classList.add('two')
      el.style.width = maxW + 'px'
      // shrink-wrap the balanced lines (a line's rects are split at every <em>: measure each line end to end)
      const rg = document.createRange(); rg.selectNodeContents(el)
      const ln = new Map(), top = el.getBoundingClientRect().top + PILL_BW
      for (const q of rg.getClientRects()) {
        if (q.width < 0.5) continue
        const k = Math.floor((q.top + q.height / 2 - top) / PILL_LH), l = ln.get(k)
        ln.set(k, l ? [Math.min(l[0], q.left), Math.max(l[1], q.right)] : [q.left, q.right])
      }
      const tw = Math.max(...[...ln.values()].map(([a, b]) => b - a))
      el.style.width = Math.min(maxW, Math.ceil(tw + 2 * PILL_PAD + 2 * PILL_BW + 2)) + 'px'
    }
    r = { px, two: el.classList.contains('two'), w: el.offsetWidth, h: el.offsetHeight, width: el.style.width }
    r.lines = Math.round((r.h - 2 * PILL_BW) / PILL_LH)
    el.remove()
    pc.set(key, r)
    return r
  }
  const pillHTML = pk => markup(pk.label)

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

  // the figure's gutter for a scale k: he stands on the pegs with his pencil >= 26 px inside the frame (in every
  // pose), clear of the shelving post in the poses he holds on screen (hand on chin, looking up or along the
  // shelves; the shrug; pointing), and his pointing hand reaches the keys' left edge
  const probe = s('g')
  function zoneFor(k) {
    const f = new Figure(probe, { scale: k })
    const ext = p => f.extentX(fk(poseOf(p), { x: 0, ground: 1000, scale: k }))[0]
    let minX = Infinity, minHold = Infinity
    for (const p of [PZ.think, PZ.point, PZ.crouch, PZ.airUp, PZ.airDown, PZ.land, PZ.grab, 'celebrate', 'shrug']) minX = Math.min(minX, ext(p))
    for (const p of [PZ.think, { ...PZ.think, tilt: -26 }, { ...PZ.think, tilt: 6 }, PZ.point, 'shrug']) minHold = Math.min(minHold, ext(p))
    const FX = Math.ceil(Math.max(26 - minX, POST_X + POST_CLEAR - minHold))
    const Jp = fk(poseOf(PZ.point), { x: FX, ground: 1000, scale: k })
    const X0 = Math.ceil(Jp.sh[0] + 0.84 * (RIG.upperArm + RIG.foreArm) * k + 18)
    return { k, FX, X0 }
  }

  // the note shelf under the last row: the tallest label (at the shelf's width) and / or the formula (a right-aligned
  // footnote: it may reach a little further left, short of the pegs, to stay on one line)
  const shelfPillMax = z => XR + PILL_BW - (z.X0 - SHELF_IN)
  const shelfFormMax = z => XR + PILL_BW - (z.X0 - FORM_IN)
  const bigPill = pk => pk === climax && plateOn
  function shelfContentH(z, fm, ls) {
    let hh = 0
    if (ls) for (const pk of labelled) { const r = sizePill(pillHTML(pk), shelfPillMax(z), bigPill(pk)); if (r.lines > 2) return -1; hh = Math.max(hh, r.h) }
    if (fm === 'foot') { const n = formLinesAt(shelfFormMax(z)); if (n > 2) return -1; hh = Math.max(hh, n * FORM_LH) }
    return hh
  }

  const pickedRows = new Set(picks.map(p => p.row))
  let PSC = PSC_TRY[0]                                        // (the dense fallback passes grow a pick less)
  // columns: cell widths, right edges and heads for a value size (cached: they don't depend on the notes)
  const colCache = new Map()
  function columnsFor(ep, z, hm) {
    const key = `${z.k}|${ep}|${hm}|${PSC}`
    if (colCache.has(key)) return colCache.get(key)
    const op = Math.min(ep, Math.max(40, Math.round(ep * 0.86)))
    const kp = Math.min(ep, Math.max(40, Math.round(ep * 0.92)))
    const pxOf = j => (j === 0 ? kp : j === EM ? ep : op)
    const cw = []
    for (let j = 0; j < NC; j++) {
      cw.push(Math.max(...rows.map((r, i) => (j === 0 ? wKey(r[0], kp) : wVal(r[j], pxOf(j), j === EM ? 900 : 800) * (j === EM && pickedRows.has(i) ? PSC : 1)))))
    }
    const X0 = z.X0
    const slack = XR - X0 - cw.reduce((a, b) => a + b, 0) - (NC - 1) * GMIN
    let res = null
    if (slack >= 0) {
      // the slack goes evenly into the gaps, unless a long head needs one gap wider (fewest head lines wins)
      const G = NC - 1, splits = [Array(G).fill(1 / G)]
      if (G > 1) for (let q = 0; q < G; q++) for (const f of [0.62, 0.75]) splits.push(Array.from({ length: G }, (_, r) => (r === q ? f : (1 - f) / (G - 1))))
      const anyHead = cols.some(c => plain(c.label || '').trim())
      for (const sp of splits) {
        const gaps = sp.map(f => GMIN + slack * f)
        const right = [X0 + cw[0]]
        for (let j = 1; j < NC; j++) right.push(right[j - 1] + gaps[j - 1] + cw[j])
        const heads = anyHead ? fitHeads(right, cw, gaps[0], X0, hm) : cols.map(() => ({ lines: [], w: 0 }))
        if (!heads) continue
        const nl = Math.max(...heads.map(x => x.lines.length)), tot = heads.reduce((a, x) => a + x.lines.length, 0)
        const cost = 100 * nl + tot + (sp === splits[0] ? 0 : 0.5)
        if (!res || cost < res.cost) res = { cost, right, heads, nl, gap: gaps[0], op, kp, pxOf, cw }
      }
    }
    colCache.set(key, res)
    return res
  }

  function tryLayout(ep, { z, fm, ls, hm }) {
    const c = columnsFor(ep, z, hm)
    if (!c) return null
    const sc = fm === 'foot' || ls ? shelfContentH(z, fm, ls) : 0
    if (sc < 0) return null
    const shelfH = sc ? sc + SHELF_PAD[0] + SHELF_PAD[1] : 0
    if (fm === 'top' && fTopLines > 2) return null
    const headH = c.nl * HEAD_LH
    const fH = fm === 'top' ? fTopLines * FORM_LH + 12 : 0
    const yTop = top0 + fH
    const bottom = L.floorY - 6 - shelfH
    const avail = bottom - (yTop + headH + (c.nl ? 10 : 0))
    // every text run is ~1.21 em tall: neighbouring rows may share up to 5 px of empty line box (never ink; the
    // linter allows 6), counting a picked value grown by PSC - 1 about its bottom edge
    const need = Math.ceil(Math.max(1.21 * ep + 1.1 * (PSC - 1) * ep, 1.21 * c.op, 1.21 * c.kp) - 5)
    if (avail / N < need) return null
    const pMax = N <= 6 ? Math.max(need + 30, 2.1 * ep) : Math.max(need + 10, 1.5 * ep)
    const pitch = Math.min(avail / N, pMax)
    const off = Math.round((avail - N * pitch) * (N <= 6 ? 0.5 : 0.35))   // a short table sits mid-frame
    const yHeads = yTop + off
    // would the labels fit between the rows in the table (cover nothing)?
    let freeTab = true
    const tmax = XR + PILL_BW - (z.X0 + c.cw[0] + GMIN)
    for (const pk of labelled) { const r = sizePill(pillHTML(pk), tmax); if (r.lines > 2 || pitch < 0.97 * ep * PSC + r.h + CARET + 10) { freeTab = false; break } }
    return { ep, ...c, X0: z.X0, z, fm, ls, hm, sc, shelfH, headH, yHeads, rowsTop: yHeads + headH + (c.nl ? 10 : 0), pitch, psc: PSC, freeTab }
  }

  const KS = lo.figure === false ? [0] : lo.figureScale ? [clamp(+lo.figureScale, 0.4, 0.9)] : [0.72, 0.62, 0.56, 0.5]
  const zoneOf = k => (k ? zoneFor(k) : { k: 0, FX: 0, X0: 62 })
  const zones = KS.map(zoneOf)
  // dense fallbacks: a smaller figure (0.42), then none (the table takes the full width)
  const denseZones = lo.figure === false ? zones : [...zones, ...(lo.figureScale ? [] : [zoneOf(0.42)]), zoneOf(0)]
  const fModes = !formEl ? [false]
    : fOpt === 'top' ? ['top'] : fOpt === 'foot' ? ['foot']
    : fOpt === true || fOpt === 'show' ? ['foot', 'top'] : ['foot', 'top', false]
  const lModes = !labelled.length ? [false] : lo.labels === 'shelf' ? [true] : lo.labels === 'table' ? [false] : [true, false]
  const hModes = lo.heads === 'upper' ? ['upper', 'upper4'] : lo.heads === 'sentence' ? ['sentence'] : ['upper', 'upper4', 'sentence']
  const EPMAX = N <= 6 ? 76 : N <= 9 ? 68 : 60
  let lay = null
  // passes: the normal one and the dense one (a pick grows 3%, the smaller figure, then no figure) compete (the
  // dense one is worth 1.5 px less: it buys room for the notes); then 36 and 34 px values as the last resort (the
  // linter warns under 40)
  const passes = [[40, zones, PSC_TRY[0], 0], [40, denseZones, PSC_TRY[1], -1.5], [36, denseZones, PSC_TRY[1], 0], [34, denseZones, 1, 0]]
  for (let pi = 0; pi < passes.length; pi++) {
    const [floorPx, zs, psc, pen] = passes[pi]
    PSC = psc
    for (const z of zs) for (const fm of fModes) for (const ls of lModes) for (const hm of hModes) {
      for (let ep = EPMAX; ep >= floorPx; ep -= 2) {
        const l = tryLayout(ep, { z, fm, ls, hm })
        if (!l) continue
        // the notes are worth some type (a label in the table near its row beats the shelf when both cover
        // nothing; the formula as a footnote beats the bar a little); a bigger figure a little, house caps a
        // little; no figure is a last resort
        const notesFree = labelled.length && (ls || l.freeTab)
        l.score = ep + (fm ? W_FORM : 0) + (notesFree ? W_NOTES : 0) - (ls && l.freeTab ? 1 : 0) + (fm === 'foot' ? 0.2 : 0)
          + 12 * z.k + (hm === 'upper' ? 1.5 : hm === 'upper4' ? 1 : 0) - (z.k || lo.figure === false ? 0 : 12) + pen
        if (!lay || l.score > lay.score) lay = l
        break
      }
    }
    if (lay && pi >= 1) break
  }
  if (!lay) throw new Error('find-your-row: the table does not fit (too many rows, or cells/heads too wide)')
  PSC = lay.psc
  const { ep, kp, right, X0, pitch, rowsTop, pxOf, cw } = lay
  const FIGK = lay.z.k, FX = lay.z.FX
  const FM = lay.fm, SHELF = lay.ls

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
  const shelfTop = ledgeY(N - 1) + PLANK / 2 + SHELF_PAD[0]

  // the formula: under the footer, on the note shelf, or (no room in the table) in the caption band while no
  // caption is up
  let capWins = []
  if (formEl) {
    if (FM === 'top') style(formEl, { top: top0 + 'px', width: '878px' })
    else if (FM === 'foot') {
      // (right-aligned under the values, like the labels that take turns with it)
      const fw = shelfFormMax(lay.z), fh = formLinesAt(fw) * FORM_LH
      formEl.classList.add('foot')
      style(formEl, { left: (XR + PILL_BW - fw) + 'px', width: fw + 'px', top: (shelfTop + (lay.sc - fh) / 2).toFixed(0) + 'px' })
    } else {
      const capEnd = vt != null ? vt : END_T
      const busy = spec.captions !== false && Array.isArray(spec.vo)
        ? spec.vo.map((v, i) => [v.t, (v.d != null ? v.t + v.d : spec.vo[i + 1] ? spec.vo[i + 1].t : Infinity) + 0.15]).sort((a, b) => a[0] - b[0]) : []
      let cur = 0
      for (const [a, b] of [...busy, [capEnd, Infinity]]) {
        const e = Math.min(a, capEnd)
        if (e - cur >= 1.4) capWins.push([cur <= 0 ? -1 : cur + 0.1, e - 0.1])
        cur = Math.max(cur, b)
        if (cur >= capEnd) break
      }
      if (!capWins.length) {
        console.warn('find-your-row: no room for data.formula (the table needs every px, and no caption gap holds it); dropped')
        formEl.remove(); formEl = null
      } else {
        formEl.classList.add('cap')
        style(formEl, { left: (L.capCX - L.capW / 2) + 'px', width: L.capW + 'px' })
        style(formEl, { top: (L.capTop + (L.capBottom - L.capTop - formEl.offsetHeight) / 2).toFixed(0) + 'px' })
      }
    }
  }

  // ================================================================== build
  const world = makeWorld(ctx)
  ctx.stage.append(fixed)                                   // heads and formula above the world
  const g = world.g
  const fxk = makeFx(world, ctx)
  const cam = camera(world)

  // column heads (bottom-aligned; left over the keys, right over the values)
  lay.heads.forEach((hd, j) => {
    if (!hd.lines.length) return
    const el = h('div', { class: 'fy-head' + (lay.hm === 'sentence' ? '' : ' up') + (j === EM ? ' emph' : '') + (cols[j].tone === 'bad' ? ' bad' : cols[j].tone === 'good' ? ' good' : '') })
    el.innerHTML = hd.lines.map(ln => ln.map(tk => tk.parts.map(p => (p.cls === 'em' ? `<em>${esc(p.s)}</em>` : p.cls === 'mark2' ? `<u class="mark2">${esc(p.s)}</u>` : esc(p.s))).join('')).join(' ')).join('<br>')
    style(el, { letterSpacing: HS[lay.hm].ls, top: (lay.yHeads + (lay.nl - hd.lines.length) * HEAD_LH) + 'px', width: Math.ceil(hd.w + 2) + 'px', textAlign: j === 0 ? 'left' : 'right' })
    fixed.append(el)
    style(el, { left: (j === 0 ? X0 : right[j] - el.offsetWidth).toFixed(1) + 'px' })
  })

  // the lit band behind a picked row, and the pale tint behind a compare's reference row
  const bandX0 = X0 - 20, bandX1 = XR + 14
  const bandTop = i => base(i) - 0.97 * ep * PSC - LIFT - 4
  const bands = rows.map((_, i) => {
    const el = s('rect', { x: bandX0, width: bandX1 - bandX0, y: bandTop(i).toFixed(1), height: (ledgeY(i) + 4 - bandTop(i)).toFixed(1), rx: 14, fill: HI.band, opacity: 0 })
    g.back.append(el)
    return el
  })
  const tints = rows.map((_, i) => {
    // (its top edge runs halfway between the ledge above and the caps, never along the row above's plank)
    const y0 = i ? (ledgeY(i - 1) + base(i) - 0.75 * ep) / 2 : base(0) - 0.97 * ep - 2, y1 = ledgeY(i) + 5
    const el = s('rect', { x: bandX0, width: bandX1 - bandX0, y: y0.toFixed(1), height: (y1 - y0).toFixed(1), rx: 13, fill: REF_BAND, opacity: 0, 'data-deco': '' })
    g.back.append(el)
    return el
  })

  // shelving: the post and its pegs (the figure's gutter), the dotted ledges, the planks under the heavy cells
  const showFig = FIGK > 0
  const pegY = []
  for (let i = 0; i < N; i++) pegY.push(ledgeY(i))
  for (let y = ledgeY(N - 1) + pitch; y < L.floorY - 0.6 * pitch; y += pitch) pegY.push(y)
  // the compare bracket's x: its ticks end 14 px short of the keys (a tick that close reads as a minus sign); the
  // pegs stop short of it
  const XB = X0 - 28
  if (showFig) {
    const pegX1 = X0 - 40
    g.back.append(s('line', { x1: POST_X, x2: POST_X, y1: (pegY[0] - 26).toFixed(1), y2: L.floorY, stroke: C.ink, 'stroke-width': 8, 'stroke-linecap': 'round' }))
    for (const y of pegY) g.back.append(s('line', { x1: POST_X, x2: pegX1, y1: y.toFixed(1), y2: y.toFixed(1), stroke: C.ink, 'stroke-width': 6, 'stroke-linecap': 'round' }))
  }
  const wEmMax = Math.max(...wEm)
  const plankX = () => [right[EM] - wEmMax - 8, right[EM] + 6]          // one width for every row: a shelf, not an underline
  const ledges = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 6, x2: (plankX(i)[0] - 14).toFixed(1), y1: ledgeY(i).toFixed(1), y2: ledgeY(i).toFixed(1), fill: 'none', stroke: C.line, 'stroke-width': 5, 'stroke-linecap': 'round', 'stroke-dasharray': '0.1 15' })
    g.back.append(el)
    return el
  })
  const litLedges = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 10, x2: (plankX(i)[0] - 12).toFixed(1), y1: ledgeY(i).toFixed(1), y2: ledgeY(i).toFixed(1), fill: 'none', stroke: HI.fill, 'stroke-width': PLANK, 'stroke-linecap': 'round', opacity: 0 })
    g.back.append(el)
    return el
  })
  // (a compare's reference row: its ledge in solid ink while the bracket is up)
  const refLedges = rows.map((_, i) => {
    const el = s('line', { x1: X0 - 10, x2: (plankX(i)[0] - 12).toFixed(1), y1: ledgeY(i).toFixed(1), y2: ledgeY(i).toFixed(1), fill: 'none', stroke: C.ink, 'stroke-width': PLANK, 'stroke-linecap': 'round', opacity: 0, 'data-deco': '' })
    g.back.append(el)
    return el
  })
  const planks = rows.map(() => { const el = s('path', { fill: 'none', stroke: C.ink, 'stroke-width': PLANK, 'stroke-linecap': 'round' }); g.mid.append(el); return el })

  // the payoff's gold plate (under the value: built before the cells). It fills the free band between the
  // neighbouring rows' ink (3 px clear of it), with an ink rim when the pitch leaves room for one
  let plate = null, pb = null
  if (plateOn) {
    const i = climax.row, sc = PSC
    const anchor = boxB(i, ep) - liftMax(i)                    // the value's bottom edge (its scale anchor), lifted
    const top = anchor - (0.14 + 0.8) * ep * sc, bot = anchor + 0.03 * ep * sc   // its "$" top and comma bottom
    // (3 px clear of the row above's ink and of its plank: at a tight pitch the plate's top runs just under the plank
    // and the "$" may reach a few px past it, rather than the plate fusing with the plank)
    const yA = i > 0 ? Math.max(base(i - 1) + 0.17 * ep + 3, ledgeY(i - 1) + PLANK / 2 + 3) : lay.yHeads + lay.headH + 3
    const yB = i < N - 1 ? base(i + 1) - 0.8 * ep - 3 : Math.min(L.floorY - 6, shelfTop - 3)
    const dT = top - yA
    const padT = dT >= 2 ? Math.min(14, dT) : Math.max(dT, -6), padB = clamp(yB - bot, 2, 14)
    const bw = Math.min(padT, padB) >= 9 ? 4 : Math.min(padT, padB) >= 6 ? 3 : 0
    const x1 = right[EM] + 14, x0 = Math.min(right[EM] - wEm[i] * sc - 14, right[EM] - wEmMax - 8)
    pb = { i, x0, y0: top - padT, w: x1 - x0, h: bot + padB - (top - padT), bw, yA, yB }
    pb.cx = pb.x0 + pb.w / 2; pb.cy = pb.y0 + pb.h / 2
    plate = h('div', { class: 'fy-plate', 'data-deco': '' })
    style(plate, { width: pb.w.toFixed(0) + 'px', height: pb.h.toFixed(0) + 'px', borderWidth: bw + 'px', opacity: '0' })
    world.html.append(plate)
  }

  // the cells
  const valColor = j => TONE_TXT[cols[j].tone] || C.ink
  const R = rows.map(r => ({
    key: new NumObj(world.html, { cls: 'fy-key', text: r[0], ax: 0, ay: 1, style: { fontSize: kp + 'px' } }),
    vals: r.slice(1, NC).map((v, jj) => new NumObj(world.html, { cls: 'fy-val' + (jj + 1 === EM ? ' em' : ''), text: v, ax: 1, ay: 1, style: { fontSize: pxOf(jj + 1) + 'px' } })),
  }))
  // a cell's text box (what the linter measures): [x0, y0, x1, y1]
  const cellBox = (i, j) => {
    const px = pxOf(j), w = j === EM ? wEm[i] * (pickedRows.has(i) ? PSC : 1) : wVal(rows[i][j], px, 800)
    return [right[j] - w, base(i) - 0.97 * px, right[j], base(i) + 0.24 * px]
  }

  // ================================================================== the figure: stations and moves
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
          if (pk.cstart != null && pk.cstart >= curT + 0.1 && pk.cstart + jc + jf + 0.25 + 0.6 <= tArr) {
            // (timed: the hop to row `from` takes off at `start`)
            const c0 = pk.cstart, land = c0 + jc + jf
            pk.pre2 = { kind: 'jump', c0, up: c0 + jc, land, y0: curY, y1: yF, dy: yF - curY, pk: null }
            moves.push(pk.pre2)
            curY = yF; curT = land
          } else if (n === 0 && tArr - drawDur(y1 - yF) - jf - jc - 0.25 < 0.4) { startY = curY = yF; curT = 0 }
          else if (tArr - curT - 0.25 >= drawDur(y1 - yF) + jf + jc + 0.15) {
            const land = tArr - drawDur(y1 - yF) - 0.1
            pk.pre2 = { kind: 'jump', c0: land - jf - jc, up: land - jf, land, y0: curY, y1: yF, dy: yF - curY, pk: null }
            moves.push(pk.pre2)
            curY = yF; curT = land
          }
        }
        const dyd = y1 - curY
        let fl = clamp(0.32 + 0.0012 * Math.abs(dyd), 0.36, 0.8), gr = 0.42
        const room = tArr - curT - 0.25
        if (room < fl + gr) { const q = Math.max(0.4, room / (fl + gr)); fl *= q; gr *= q }
        // (timed: he takes the pencil as soon as he stands on row `from`, and draws until the pick lands)
        else if (pk.cstart != null) fl = Math.max(fl, tArr - Math.max(curT + 0.25, pk.cstart) - gr)
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
    // the loop: he hops back to where he stood at frame 1
    if (loopOn && showFig && Math.abs(startY - curY) > 1) {
      const c0 = loopT0 + 0.02, up = c0 + 0.12, land = up + clamp(0.2 + 0.0003 * Math.abs(startY - curY), 0.24, 0.36)
      moves.push({ kind: 'jump', loop: true, c0, up, land, y0: curY, y1: startY, dy: startY - curY, pk: null })
    }
  }
  const loopMove = moves.find(m => m.loop) || null
  // a pick's window: from its time until he leaves for the next pick (the row drops back then); the last one
  // holds through the verdict until the loop clear
  const departOf = m => (m.kind === 'draw' ? m.g0 : m.kind === 'start' ? -1 : m.c0)
  const departPk = pk => (pk.pre2 ? pk.pre2.c0 : departOf(pk.move))
  picks.forEach((pk, n) => {
    const nx = picks[n + 1]
    pk.end = nx ? (showFig ? departPk(nx) : nx.t - 0.05) : END_T
    if (pk.end < pk.t + 0.25) pk.end = pk.t + 0.25
  })

  // ================================================================== labels: pills, the cells they hide
  const pills = []
  function makePill(pk, { border, caret, maxW, big = false }) {
    const r = sizePill(pillHTML(pk), maxW, big)
    const el = h('div', { class: 'fy-pill' + (r.two ? ' two' : '') })
    el.innerHTML = pillHTML(pk)
    style(el, { borderColor: border, fontSize: r.px + 'px', ...(r.lh ? { lineHeight: r.lh + 'px' } : {}), ...(r.two ? { width: r.width } : {}) })
    world.html.append(el)
    const w = el.offsetWidth, hh = el.offsetHeight
    // the pop never takes its text under 41 px (the type floor), so 40 px text only fades and slides in
    const from = Math.min(1, Math.max(0.86, 41 / r.px)), sq = clamp(1 - 41.5 / r.px, 0, 0.04)
    let sv = null
    if (caret) {
      const vb = caret === 'left' ? '0 0 22 30' : '0 0 30 22'
      sv = s('svg', { class: 'fy-caret', viewBox: vb, width: caret === 'left' ? 22 : 30, height: caret === 'left' ? 30 : 22, 'data-deco': '' })
      const paths = {
        up: ['M0,22 L15,3 L30,22 Z', 'M3,16 L15,4 L27,16'],
        down: ['M0,0 L15,19 L30,0 Z', 'M3,6 L15,18 L27,6'],
        left: ['M22,0 L3,15 L22,30 Z', 'M16,3 L4,15 L16,27'],
      }[caret]
      sv.append(s('path', { d: paths[0], fill: C.white }), s('path', { d: paths[1], fill: 'none', stroke: border, 'stroke-width': 4, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
      el.append(sv)
    }
    return { el, w, h: hh, caret: sv, kind: caret || 'shelf', from, sq, pk, pre: pk.pre, cells: [] }
  }
  const aimCaret = (pl, x, y) => {
    // caret position inside the pill's box (the svg sits on the rim, its fill covering it)
    if (pl.kind === 'left') style(pl.caret, { left: (-CARET - 4 - 4).toFixed(1) + 'px', top: (clamp(y - pl.y0, 18, pl.h - 18) - 15 - 4).toFixed(1) + 'px' })
    else style(pl.caret, { left: (clamp(x - pl.x0, 26, pl.w - 26) - 15 - 4).toFixed(1) + 'px', top: (pl.kind === 'up' ? -CARET - 4 - 4 : pl.h - 4 - 4 + 0).toFixed(1) + 'px' })
  }
  // the ink band of a row's text (its "$" top to its comma bottom)
  const inkTop = i => base(i) - 0.8 * ep, inkBot = i => base(i) + 0.2 * ep
  const boxTop = i => base(i) - 0.97 * ep
  // the value cells (never a key) a pill's box crosses by more than 4 px both ways
  const cellsUnder = (x0, y0, w, hh, skip) => {
    const out = []
    for (let i = 0; i < N; i++) {
      if (skip.includes(i)) continue
      for (let j = 1; j < NC; j++) {
        const [a, b, c, e] = cellBox(i, j)
        if (Math.min(c, x0 + w - 2) - Math.max(a, x0 + 2) > 4 && Math.min(e, y0 + hh - 2) - Math.max(b, y0 + 2) > 4) out.push([i, j])
      }
    }
    return out
  }
  const tabX0 = X0 + cw[0] + GMIN                              // an in-table pill stays right of the key column
  const tabMax = XR + PILL_BW - tabX0
  const pillHold = Number.isFinite(+lo.pillHold) && +lo.pillHold > 0.5 ? +lo.pillHold : null
  picks.forEach((pk, n) => {
    if (!pk.label) return
    const i = pk.row
    const nx = picks[n + 1]
    const t0 = pk.pre ? -1 : pk.t + 0.04
    let t1 = nx ? nx.t - 0.25 : END_T
    let pl
    if (SHELF) {
      // the note shelf: right-aligned under the values, centred in the shelf; it covers no row
      // (the payoff's label is 48 px when it fits: it pops with the plate and the impact)
      pl = makePill(pk, { border: pk.from != null ? C.ink : HI.fill, caret: null, maxW: shelfPillMax(lay.z), big: bigPill(pk) })
      pl.x0 = XR + PILL_BW - pl.w
      pl.y0 = shelfTop + (lay.sc - pl.h) / 2
      // (sharing the shelf with the formula: give it back after a while, when the formula then gets >= 1.2 s)
      if (FM === 'foot' && nx) { const hd = pillHold ?? SHELF_HOLD; if (t1 - (t0 + hd) >= 1.2) t1 = t0 + hd }
    } else if (pk.from != null) {
      // compare: between the two rows (caret on the bracket) when the gap holds it, else under the lower one
      // (over the upper one at the foot of the table); it never crosses either row's ink
      const a = Math.min(i, pk.from), b = Math.max(i, pk.from)
      let kind = 'left'
      pl = makePill(pk, { border: C.ink, caret: 'left', maxW: tabMax })
      const lo2 = inkBot(a) + 2, hi2 = inkTop(b) - (b === i ? LIFT : 0) - 2
      if (b - a < 2 || pl.h > hi2 - lo2) {
        pl.el.remove()
        kind = b < N - 1 ? 'up' : 'down'
        pl = makePill(pk, { border: C.ink, caret: kind, maxW: tabMax })
      }
      pl.x0 = tabX0
      if (kind === 'left') pl.y0 = (lo2 + hi2) / 2 - pl.h / 2
      else if (kind === 'up') pl.y0 = Math.max(ledgeY(b) + CARET - 4, inkBot(b) + CARET + 2)
      else pl.y0 = Math.min(inkTop(a) - LIFT - CARET - 6 - pl.h, boxTop(a) - LIFT - CARET - 2 - pl.h)
      pl.cells = cellsUnder(pl.x0, pl.y0, pl.w, pl.h, [i, pk.from])
      aimCaret(pl, kind === 'left' ? XB + 14 : right[EM] - wEm[b] / 2, (rowMid(a) + rowMid(b)) / 2)
    } else {
      // under the row (over the last row: above it), caret at the value; in a roomy table it tucks into the gap
      // above the next row, so that row is left alone
      const below = i < N - 1
      pl = makePill(pk, { border: HI.fill, caret: below ? 'up' : 'down', maxW: tabMax })
      const cx = right[EM] - wEm[i] * PSC / 2
      pl.x0 = clamp(cx - pl.w / 2, tabX0, XR + PILL_BW - pl.w)
      let y0 = below ? ledgeY(i) + CARET - 4 : base(i) - 0.97 * ep * PSC - LIFT - CARET - 2 - pl.h
      if (below) { const fit = boxTop(i + 1) - pl.h - 2; if (fit >= base(i) + CARET + 8) y0 = Math.min(y0, fit) }
      pl.y0 = y0
      pl.cells = cellsUnder(pl.x0, pl.y0, pl.w, pl.h, [i])
      aimCaret(pl, cx, 0)
    }
    // an in-table label that hides cells stays up only so long, and closes as the verdict lands
    if (!SHELF && pl.cells.length) {
      t1 = Math.min(t1, t0 + (pillHold ?? PILL_HOLD))
      if (vt != null && vt > t0 + 0.6) t1 = Math.min(t1, vt - 0.02)
    }
    pl.t0 = t0
    pl.t1 = clamp(t1, t0 + 0.5, END_T)
    pills.push(pl)
  })
  // two labels never share a spot: when the next one would land on this one's box while it is still up, this one
  // goes first (picks closer than 0.75 s)
  const boxHit = (a, b) => Math.min(a.x0 + a.w, b.x0 + b.w) - Math.max(a.x0, b.x0) > 0 && Math.min(a.y0 + a.h, b.y0 + b.h) - Math.max(a.y0, b.y0) > 0
  for (let k = 0; k < pills.length; k++) for (let q = k + 1; q < pills.length; q++) {
    const a = pills[k], b = pills[q]
    if (b.t0 < a.t1 + 0.13 && boxHit(a, b)) a.t1 = Math.max(a.t0 + 0.2, b.t0 - 0.13)
  }
  // hide windows per cell: from just before a pill pops until it has gone; two windows that nearly touch merge, so
  // a cell never blinks between two pills
  const hideWins = new Map()
  for (const pl of pills) for (const [i, j] of pl.cells) {
    const k = i * 8 + j
    if (!hideWins.has(k)) hideWins.set(k, [])
    hideWins.get(k).push([pl.pre ? -1 : pl.t0 - 0.09, pl.t1 + 0.24])
  }
  for (const [k, ws] of hideWins) {
    ws.sort((a, b) => a[0] - b[0])
    const m = [ws[0].slice()]
    for (const w of ws.slice(1)) { const last = m[m.length - 1]; if (w[0] - last[1] < 0.35) last[1] = Math.max(last[1], w[1]); else m.push(w.slice()) }
    hideWins.set(k, m)
  }
  const hideOf = (i, j, t) => {
    const ws = hideWins.get(i * 8 + j)
    if (!ws) return 0
    let v = 0
    for (const [a, b] of ws) v = Math.max(v, (a < 0 ? 1 : clamp((t - a) / 0.07)) * (1 - clamp((t - (b - 0.1)) / 0.1)))
    return v
  }
  // the formula on the shelf gives way to the labels: gone before one pops, back once it has closed, but only for a
  // real stay (a gap under 1.2 s between two labels leaves the shelf empty for that beat, not a flash of formula)
  const shelfOff = []
  for (const pl of pills.filter(q => q.kind === 'shelf')) {
    const a = pl.pre ? -1 : pl.t0 - 0.1, b = pl.t1 + 0.14
    const last = shelfOff[shelfOff.length - 1]
    if (last && a - last[1] < 1.2) last[1] = Math.max(last[1], b); else shelfOff.push([a, b])
  }
  const formOf = t => {
    if (!formEl) return 0
    if (FM === 'top') return 1
    if (FM === 'foot') {
      let v = 1
      for (const [a, b] of shelfOff) v = Math.min(v, 1 - (a < 0 ? 1 : clamp((t - a) / 0.08)) * (1 - clamp((t - b) / 0.15)))
      return v
    }
    let v = 0
    for (const [a, b] of capWins) v = Math.max(v, (a < 0 ? 1 : clamp((t - a) / 0.15)) * (1 - clamp((t - (b - 0.15)) / 0.15)))
    // (up at frame 1: it comes back in the loop clear, once the verdict has gone)
    if (loopOn && capWins[0][0] < 0) v = Math.max(v, prog(t, loopT0 + 0.27, 0.2))
    return v
  }

  // the compare bracket (pencil): drawn as he steps from row `from` to the picked row; up while the pick is
  const brackets = picks.filter(pk => pk.from != null).map(pk => {
    const el = s('path', { fill: 'none', stroke: C.ink, 'stroke-width': BRK_W, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', opacity: 0, 'data-deco': '' })
    g.mid.append(el)
    const m = pk.move
    const d0 = showFig ? m.up : pk.t - 0.4, d1 = showFig ? m.land : pk.t - 0.04
    // (a timed compare marks row `from` as soon as he stands on it)
    const tint0 = pk.cstart != null && showFig ? (pk.pre2 ? pk.pre2.land : m.g0) : d0
    return { el, pk, d0, d1, tint0 }
  })
  const pencil = showFig && brackets.length ? pencilProp(FIGK) : null
  if (pencil) g.front.append(pencil)

  // ---- the figure's pose track and ground
  const pose0 = startRow == null ? PZ.think : PZ.point
  const keys = [{ t: 0, pose: pose0 }]
  if (startRow == null) keys.push({ t: 0.35, pose: { ...PZ.think, tilt: PZ.think.tilt + 8, aF: [22, 150] }, d: 0.3, e: 'inOut' }, { t: 0.75, pose: PZ.think, d: 0.35, e: 'spring' })
  const squashes = []
  const lastPick = picks.length ? picks[picks.length - 1] : null
  const endKey = Object.prototype.hasOwnProperty.call(END, lo.endPose) ? lo.endPose : lastPick ? 'point' : 'celebrate'
  const tEnd = vt != null && (!lastPick || vt > lastPick.t + 0.3) && vt < END_T - 0.3 ? vt : null
  if (tEnd != null && END[endKey]) keys.push({ t: tEnd + 0.05, pose: END[endKey], d: 0.24, e: 'spring' })
  for (const m of moves) {
    if (m.kind === 'start') continue
    if (m.kind === 'jump') {
      const big = Math.abs(m.dy) > 160
      keys.push({ t: m.c0, pose: big ? PZ.crouch : PZ.dip, d: Math.max(0.08, (m.up - m.c0) * 0.8), e: 'out' })
      keys.push({ t: m.up, pose: m.dy < 0 ? PZ.airUp : PZ.airDown, d: 0.1, e: 'out' })
      keys.push({ t: m.land - 0.04, pose: PZ.land, d: 0.06, e: 'out' })
      // (the loop hop settles into his frame-1 pose with no overshoot, so the last frame is frame 1)
      keys.push(m.loop ? { t: m.land + 0.04, pose: pose0, d: 0.16, e: 'out' } : { t: m.land + 0.08, pose: PZ.point, d: 0.22, e: 'spring' })
      squashes.push({ t: m.land, amt: m.loop ? 0.1 : big ? 0.2 : 0.14 })
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
  // (no hop needed: he eases back into his frame-1 pose where he stands)
  if (loopOn && !loopMove) keys.push({ t: loopT0 + 0.1, pose: pose0, d: 0.3, e: 'inOut' })
  keys.sort((a, b) => a.t - b.t)
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
  const pickOn = (i, t) => { let c = null; for (const pk of picks) if (pk.row === i && pk.tg <= t) c = pk; return c }
  function liftOf(i, t) {
    const pk = pickOn(i, t)
    const Lm = liftMax(i)
    if (!pk || !Lm) return 0
    // (an underdamped spring: it overshoots a little, so the line boxes get 2 px of slack above)
    if (t < pk.end) return Math.min(Lm, springStep(t, pk.tg, 0, Lm, { freq: 3, damp: 0.42 }))
    return Math.min(Lm, springStep(t, pk.end, Math.min(Lm, springStep(pk.end, pk.tg, 0, Lm, { freq: 3, damp: 0.42 })), 0, { freq: 3.4, damp: 0.38 }))
  }
  const glowOf = (i, t) => { const pk = pickOn(i, t); return pk ? (pk.pre ? 1 : clamp((t - pk.tg) / 0.1)) * (1 - clamp((t - pk.end) / 0.16)) : 0 }
  const tintOf = (i, t) => {
    let v = 0
    for (const b of brackets) if (b.pk.from === i) v = Math.max(v, clamp((t - b.tint0) / 0.15) * (1 - clamp((t - b.pk.end) / 0.16)))
    return v
  }
  // a heavy cell's plank sags on impact and springs back
  const sagOf = (i, t) => { const dt = t - landT[i]; return dt < 0 || landT[i] < 0 ? 0 : 7 * Math.exp(-6.5 * dt) * Math.cos(2 * Math.PI * 3.2 * dt) }
  const dd = D2 => Math.sqrt((2 * D2) / 5200)
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
  const plateSq = clamp(1 - 41.5 / ep, 0, 0.1)        // (the plate lands before the pick has grown the value)
  // one focal point: the newest heavy value is green until the next row lands (the last one: 0.8 s) or a pick
  // lights; a row that lands while a pick is lit is born in ink
  // (a value that settles because a pick lights snaps to ink in the frames the pick's glow comes up: two greens never
  // share the screen)
  const litAt = x => picks.some(p => x >= p.tg && x < p.end + 0.16)
  const settleT = rows.map((_, i) => {
    if (landT[i] > 0 && litAt(landT[i])) return -Infinity
    let n = Infinity
    for (let j = 0; j < N; j++) if (landT[j] > landT[i] + 1e-6) n = Math.min(n, landT[j])
    if (n === Infinity) n = landT[i] + 0.8
    for (const p of picks) if (p.tg > landT[i]) n = Math.min(n, p.tg)
    return n
  })
  const settleD = settleT.map(x => (picks.some(p => p.tg > 0 && Math.abs(p.tg - x) < 1e-6) ? 0.1 : 0.25))
  // the heavy cell's colour: fresh (green) until it settles, the pick's tone while lit, ink on the gold plate
  const freshC = emTone === 'bad' ? C.red : emTone === 'goal' || emTone === 'neutral' ? C.ink : C.heroInk
  const settledC = emTone === 'bad' ? C.red : C.ink
  const emColor = (i, t, glow) => {
    let c = mixc(freshC, settledC, settleT[i] === -Infinity ? 1 : prog(t, settleT[i], settleD[i]))
    c = mixc(c, HI.text, glow)
    if (pb && i === pb.i) c = mixc(c, C.ink, prog(t, climax.t, 0.1) * glow)
    return c
  }
  // the loop clear: rows tip off their planks bottom-up within 0.15 s (rows stocked at frame 1 stay)
  const tipT = rows.map((_, i) => (loopOn && landT[i] > 0 ? loopT0 + 0.06 + 0.15 * (N - 1 - i) / Math.max(1, N - 1) : Infinity))

  // ================================================================== cues
  // rows: a soft thud each (quieter under a lit pick); a fast run (< 0.3 s apart) is one roll plus a thud on its
  // last row
  {
    const order = rows.map((_, i) => i).filter(i => landT[i] > 0.02).sort((a, b) => landT[a] - landT[b])
    const lastT = Math.max(...landT)
    const thud = i => ctx.cue(landT[i], 'thud', { gain: litAt(landT[i]) ? 0.15 : landT[i] >= lastT - 1e-6 ? 0.42 : 0.28 })
    let k = 0
    while (k < order.length) {
      let e = k
      while (e + 1 < order.length && landT[order[e + 1]] - landT[order[e]] < 0.3) e++
      if (e - k >= 2) {
        ctx.cue(landT[order[k]], 'roll', { gain: 0.22, dur: Math.max(0.2, landT[order[e]] - landT[order[k]]) })
        thud(order[e])
      } else for (let q = k; q <= e; q++) thud(order[q])
      k = e + 1
    }
  }
  for (const m of moves) {
    if (m.kind === 'jump') {
      if (!m.loop && Math.abs(m.dy) > 160) ctx.cue(m.up, 'swipe', { gain: 0.3, dur: 0.18 })
      ctx.cue(m.land, 'step', { gain: m.loop ? 0.3 : 0.45 })
    } else if (m.kind === 'draw') {
      ctx.cue(m.g0 + 0.16, 'tick', { gain: 0.35 })
      ctx.cue(m.up, 'swipe', { gain: 0.35, dur: Math.max(0.15, m.land - m.up) })
    }
  }
  if (!showFig) for (const b of brackets) ctx.cue(b.d0, 'swipe', { gain: 0.35, dur: b.d1 - b.d0 })
  // a label pops (not one already up at frame 1; the payoff's hit carries its own); a quiet pick at the verdict
  // leaves the sound to the verdict's ding
  for (const pk of picks) {
    if (pk.pre || (pk === climax && plate)) continue
    if (pk.label) ctx.cue(pk.t + 0.05, 'pop', { gain: 0.5 })
    else if (Math.abs(pk.t - (vt ?? -9)) > 0.1) ctx.cue(pk.t, 'tick', { gain: 0.4 })
  }
  // the payoff: the short's one impact, at the gold plate. Its hit lines burst from the plate's right end and only
  // the fan into the empty margin right of the values shows (x > 932), so they never cross a value
  if (plate) {
    const tc = climax.t
    const bx = pb.x0 + pb.w - 12, br = pb.h / 2 + 8
    fxk.impact(tc, { x: bx, y: pb.cy, rx: br, ry: br, r: 34, lines: 14, shake: 9, punch: 0.02, cue: 'hit', gain: 0.85 })
    const burst = g.fx.lastElementChild
    if (burst) {
      const id = `fy-burst-${Math.round(bx)}-${Math.round(pb.cy)}`
      const xr = XR + 10
      g.fx.append(s('clipPath', { id, clipPathUnits: 'userSpaceOnUse' },
        s('rect', { x: xr.toFixed(1), y: (pb.cy - 200).toFixed(1), width: (1080 - xr).toFixed(1), height: 400 })))
      burst.setAttribute('clip-path', `url(#${id})`)
    }
    if (emTone !== 'bad' && !(vt != null && Math.abs(vt - tc) < 0.2)) ctx.cue(tc + 0.12, 'cash', { gain: 0.5 })
  }
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.3, dur: 0.3 })

  // ================================================================== seek
  const newestRow = t => { let r = -1, best = -Infinity; for (let i = 0; i < N; i++) if (landT[i] <= t && landT[i] >= best) { best = landT[i]; r = i } return r }
  const firstDepart = moves.length ? Math.min(...moves.map(m => (m.kind === 'start' ? Infinity : departOf(m)))) : Infinity
  // his head follows the rows as they land (and looks back up the empty shelves after the loop hop)
  const lookTilt = t => {
    const r = newestRow(t)
    const ty = r >= 0 ? rowMid(r) : rowMid(0)
    const hx = FX, hy = startY - 0.86 * 262 * FIGK
    return clamp(-Math.atan2(hy - ty, Math.max(60, X0 + 180 - hx)) * 180 / Math.PI * 0.55, -26, 6)
  }
  const look0 = showFig ? lookTilt(0) : 0
  const loopSettle = loopMove ? loopMove.land + 0.04 : loopT0 + 0.1

  // scripted acts (lookOpts.beats): a pose played over the track for d s, easing in over 0.2 s and out over 0.25 s
  // (the pinned pointing hand still wins while a pick holds)
  const beats = (Array.isArray(lo.beats) ? lo.beats : [])
    .filter(b => b && Number.isFinite(+b.t) && (POSES[b.act] || PZ[b.act]))
    .map(b => ({ t: +b.t, d: Math.max(0.5, Number.isFinite(+b.d) ? +b.d : 1.2), pose: PZ[b.act] || b.act }))
  // a beat that starts while a pick holds also taps its value: the picked row's emphasised cell pulses (5%) and its
  // plank dips (3 px), silently, so the act lands on the number being said
  const pulses = beats.map(b => { const pk = picks.find(p => p.tg <= b.t && b.t < p.end); return pk ? { row: pk.row, t0: b.t + 0.06, d: 0.4 } : null }).filter(Boolean)
  const pulseOf = (i, t) => { let v = 0; for (const q of pulses) if (q.row === i) v = Math.max(v, bump(t, q.t0, q.d)); return v }
  const withBeats = (P, t) => {
    for (const b of beats) {
      const w = E.out(prog(t, b.t, 0.2)) * (1 - E.inOut(prog(t, b.t + b.d - 0.25, 0.25)))
      if (w > 0) P = blendPose(P, b.pose, w)
    }
    return P
  }

  function drawFigure(t) {
    let P = withBeats(tr.at(t), t)
    const prev = withBeats(tr.at(t - 0.07), t - 0.07)
    // before he first sets off: his head follows the rows as they land (he reads the shelves)
    if (startRow == null && t < firstDepart + 0.1) P = { ...P, tilt: lerp(P.tilt, lookTilt(t), 0.8 * (1 - prog(t, firstDepart - 0.1, 0.2))) }
    if (startRow == null && loopOn && t > loopSettle) P = { ...P, tilt: lerp(P.tilt, look0, 0.8 * prog(t, loopSettle, 0.16)) }
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

  let vEl = null
  function seek(tIn) {
    // the loop: the last frame is frame 1 (the clear before it has already brought everything back)
    const t = loopOn && tIn > D - 1.5 / FPS ? 0 : tIn
    for (const pl of pills) {
      const on = t >= pl.t0 && t < pl.t1 + 0.12
      if (!on) { style(pl.el, { display: 'none', transformOrigin: '50% 50%', transform: 'none', opacity: '0' }); continue }     // (one canonical hidden state)
      const pp = pl.pre ? { scale: 1, opacity: 1 } : popIn(t, pl.t0, 0.24, pl.from)
      const out = 1 - prog(t, pl.t1, 0.12)
      const sq = pl.pre ? { sx: 1, sy: 1 } : squashAt(t, pl.t0 + 0.12, pl.sq)
      const oy = pl.kind === 'down' ? -liftOf(pl.pk.row, t) : 0
      style(pl.el, {
        display: '',
        transformOrigin: pl.kind === 'left' ? '0% 50%' : pl.kind === 'down' ? '50% 100%' : pl.kind === 'shelf' ? '100% 50%' : '50% 0%',
        transform: `translate(${pl.x0.toFixed(1)}px,${(pl.y0 + oy + (pl.kind === 'down' || pl.kind === 'shelf' ? 1 : -1) * 10 * (1 - out)).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
        opacity: (pp.opacity * out).toFixed(3),
      })
    }
    if (formEl) {
      const fo = formOf(t)
      style(formEl, { opacity: fo.toFixed(3), visibility: fo > 0 ? 'visible' : 'hidden' })
    }
    const tc = plate ? climax.t : Infinity
    for (let i = 0; i < N; i++) {
      const Ti = landT[i], pre = Ti < 0
      const lift = liftOf(i, t), glow = glowOf(i, t)
      const row = R[i]
      // the loop clear: the key dims back, the values tip off their planks and fall
      const back0 = loopOn ? prog(t, loopT0 + 0.12, 0.25) : 0
      const back = pre ? 0 : back0
      const reach = prog(t, Ti - 0.2, 0.2) * (1 - back)
      row.key.set({ x: X0, y: boxB(i, kp) - lift, color: mixc(C.dim, C.ink, reach), opacity: 1 })
      const tip = t - tipT[i]
      let emHide = 0
      for (let j = 1; j < NC; j++) {
        const heavy = j === EM, px = pxOf(j)
        const hv = hideOf(i, j, t)
        if (heavy) emHide = hv
        const D2 = dropOf(i, j)
        const t0 = Ti - dd(D2)
        const f = Ti < 0 ? { y: 0 } : fall(t, t0, D2, { e: heavy ? 0.2 : 0.3, n: heavy ? 1 : 2 })
        let sq = heavy && Ti >= 0 ? squashAt(t, Ti, squashAmt) : { sx: 1, sy: 1 }
        if (heavy && pb && i === pb.i && t >= tc) { const z = squashAt(t, tc, plateSq); sq = { sx: sq.sx * z.sx, sy: sq.sy * z.sy } }
        // a heavy cell also pops in (from >= 41 px) as it lands, so it lands with weight even with no room to fall
        const pop = heavy && Ti >= 0 ? popIn(t, Ti - 0.09, 0.24, Math.min(1, Math.max(0.86, 41 / px))) : { scale: 1, opacity: 1 }
        const pu = heavy ? pulseOf(i, t) : 0
        const sc = (heavy ? 1 + (PSC - 1) * glow : 1) * pop.scale * (1 + 0.05 * pu)
        let color = valColor(j)
        if (heavy) {
          color = emColor(i, t, glow)
          // (a row stocked at frame 1 takes its frame-1 colour back in the clear)
          if (pre && back0 > 0) color = mixc(color, emColor(i, 0, glowOf(i, 0)), back0)
        }
        // tipping off (the loop): it turns over its right foot and drops, fading as it goes
        const tp = tip >= 0 ? tip : -1
        const tdrop = tp >= 0 ? 2600 * tp * tp : 0, trot = tp >= 0 ? -7 * E.out(prog(tp, 0, 0.18)) : 0
        const tfade = tp >= 0 ? 1 - prog(tp, 0.02, 0.1) : 1
        // in flight (and while a heavy cell rides its plank's rebound, or tips off), its line box may reach into a
        // neighbour's (the ink never does while it is readable)
        row.vals[j - 1].overlap((Ti >= 0 && t >= Math.min(t0, Ti - 0.09) && t < Ti + (heavy ? 0.5 : 0)) || tp >= 0 || pu > 0)
        row.vals[j - 1].set({
          x: right[j], y: boxB(i, px) - f.y + (heavy ? sagOf(i, t) + 3 * pu : 0) - lift + tdrop, rot: trot,
          sx: sc * sq.sx, sy: sc * sq.sy,
          opacity: (1 - hv) * tfade * (Ti < 0 ? 1 : heavy ? (t >= Math.min(t0, Ti - 0.09) ? pop.opacity : 0) : t >= t0 ? clamp((t - t0) / 0.03) : 0),
          color,
        })
      }
      // the plank under the heavy cell (it arrives with its value, sags under it, greys out again in the clear)
      const [px0, px1] = plankX(i)
      const sag = sagOf(i, t) + 3 * pulseOf(i, t), ly = ledgeY(i) - lift * 0.5
      attr(planks[i], 'd', `M${px0.toFixed(1)},${ly.toFixed(1)} Q${((px0 + px1) / 2).toFixed(1)},${(ly + 2 * sag).toFixed(1)} ${px1.toFixed(1)},${ly.toFixed(1)}`)
      attr(planks[i], 'stroke', mixc(C.ink, HI.fill, glow))
      const stocked = (Ti < 0 ? 1 : 0.18 + 0.82 * prog(t, Ti - 0.02, 0.06)) * (1 - (tip >= 0 ? prog(tip, 0, 0.2) : 0))
      attr(planks[i], 'opacity', String(+lerp(Math.max(0.18, stocked), 0.18, emHide).toFixed(3)))
      attr(ledges[i], 'opacity', String(+(1 - 0.35 * prog(t, Ti, 0.3) * (1 - back)).toFixed(3)))
      attr(litLedges[i], 'opacity', String(+glow.toFixed(3)))
      attr(bands[i], 'opacity', String(+glow.toFixed(3)))
      attr(bands[i], 'transform', `translate(0,${(-lift * 0.5).toFixed(1)})`)
      const ref = tintOf(i, t) * (1 - glow)
      attr(tints[i], 'opacity', String(+ref.toFixed(3)))
      attr(refLedges[i], 'opacity', String(+ref.toFixed(3)))
    }
    if (plate) {
      const on = t >= tc - 0.01 && t < END_T + 0.16
      if (!on) style(plate, { opacity: '0', transform: `translate(${pb.x0.toFixed(1)}px,${pb.y0.toFixed(1)}px) scale(0.55)` })
      else {
        const pp = popIn(t, tc - 0.01, 0.3, 0.55), sq = squashAt(t, tc, 0.12)
        const dy = liftMax(pb.i) - liftOf(pb.i, t)
        style(plate, {
          transform: `translate(${pb.x0.toFixed(1)}px,${(pb.y0 + dy).toFixed(1)}px) scale(${(pp.scale * sq.sx).toFixed(3)},${(pp.scale * sq.sy).toFixed(3)})`,
          opacity: (pp.opacity * (1 - prog(t, END_T, 0.15))).toFixed(3),
        })
      }
    }
    for (const b of brackets) {
      const on = t >= b.d0 && t < b.pk.end + 0.16
      if (!on) { attr(b.el, 'opacity', '0'); attr(b.el, 'd', 'M0,0'); continue }     // (one canonical hidden state)
      const yF = rowMid(b.pk.from) - liftOf(b.pk.from, t), yE = t >= b.d1 ? rowMid(b.pk.row) - liftOf(b.pk.row, t) : bracketEnd(b, t)
      const done = prog(t, b.d1 - 0.02, 0.08)
      let dpath = `M${XB + BRK_TICK},${yF.toFixed(1)} L${XB},${yF.toFixed(1)} L${XB},${yE.toFixed(1)}`
      if (done > 0) dpath += ` L${(XB + BRK_TICK * done).toFixed(1)},${yE.toFixed(1)}`
      attr(b.el, 'd', dpath)
      attr(b.el, 'opacity', String(+(1 - clamp((t - b.pk.end) / 0.16)).toFixed(3)))
    }
    if (showFig) drawFigure(t)
    const { shake, zoom } = fxk.seek(t)
    if (plate) cam.set({ fx: pb.cx, fy: pb.cy, x: pb.cx, y: pb.cy, shake: [clamp(shake[0], -3, 3), shake[1]], zoom })
    else cam.set({ shake: [clamp(shake[0], -3, 3), shake[1]], zoom })
    // the loop clear fades the chrome's verdict too (it is the last thing between the full table and frame 1)
    if (loopOn && vt != null) {
      vEl = vEl || ctx.stage.querySelector('.br-verdict')
      if (vEl) {
        const vo = 1 - prog(tIn, loopT0, 0.25)
        style(vEl, { filter: vo < 1 ? `opacity(${vo.toFixed(3)})` : 'none', visibility: vo <= 0 ? 'hidden' : 'visible' })
      }
    }
  }

  const verdictCue = vt != null && (spec.sfx || []).some(x => x && x.kind === 'ding' && Math.abs(x.t - vt) < 0.15) ? null : 'ding'
  return { duration: D, seek, chrome: { verdictCue } }
}
