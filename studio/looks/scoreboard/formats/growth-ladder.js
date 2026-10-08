// Scoreboard: growth-ladder — the year-by-year growth ladder (P2) as a live scoreboard.
//
// One small regular amount; one row per year (or per 5 years) unmasks; the biggest number is the last row.
//   Top bar   the hook, the hero odometer (the Worth column, rolling) and the footer (the assumption line).
//   Stage     a board of year lines. Every row's slot is on the board from frame 1, dark (LED off), so the viewer
//             can count the rungs ahead without seeing a year or a value (no spoiler for a "which year?" hook).
//             The column labels carry a two-tone legend as underlines (grey = what you put in, green = worth).
//             Optional strip above them: the goal (lookOpts.goal, with a dashed finish line at the meters' end and
//             a halfway notch on every meter) or the input (data.input, when the header doesn't already say it).
//   Each row  is a hard cut: a thud, the slot lights, the year and "you put in" slam in (the worth stays LED off for
//             the 0.12 s anticipation dip), then the row's Worth cell
//             and the hero count up together on one curve while the row's meter grows (grey = put in, green =
//             growth; every meter shares one scale, so the finished board draws the compounding curve), and they
//             land exactly on the row's display string: bump, glow flare, ding. The previous row settles (no glow,
//             no tip): one focal number at a time. A count starts from what was put in by that row (or the last
//             landing, if higher), never below it, and its "≈" stays an unlit ghost until it lands: a running count
//             never claims the money is worth less than what went in.
//   Last row  (data.highlightLast, default true) a taller slot; its count rolls >= 2.4 s over a riser and lands big
//             and neon: hit + cash, a stage bloom, the slot stays lit green.
//   Verdict   the chrome's: the kit's one verdict slot at the foot of the frame, on the black band that rises over
//             the foot of the board. Just before it, the rows scroll up under the column labels (the oldest drop
//             off), so the big last row stays in view above the band. The header keeps the hook.
// Frame 1: row 1 is on the board (its year and what went in) and the hero and its Worth cell are already counting
//   (FinCalC: row 1 on screen at 0.0 s; HD Guy: the counter is running at 0.0 s). Row 1 at t < 0.5 s: 0.45 s into
//   its count; otherwise the count runs from what row 1 puts in and lands 0.6 s after rowsT.
// Layout: the stage runs to y 1300 (captions on) or 1460 (captions off: the board is the caption); no label stack,
//   the board is the label. The board is centred in the stage; the row pitch is what the stage leaves (capped at
//   96 px); the last row takes 1.55 pitches (1.3 on dense boards). Cells are Anton with every digit in a 0.5em slot,
//   42-62 px (42 keeps the slam/bump undershoot above the 40 px floor). Rows with >= 60 px pitch get a bright meter
//   line under the text; denser boards meter with the slot's own fill (and a bright edge) to keep the type size.
//   Column labels are Inter 700 caps 40 px; when they don't fit beside the cells they wrap onto two lines first and
//   only then shrink (to 34 px at worst). Columns pack from the left (labels may reach over the previous column's
//   cells) and the slack sits before the worth, which gives the big last row's worth its room.
//   More rows than fit at a 50 px pitch (e.g. FinCalC's "1-15 years" with captions on): the board shows as many
//   slots as fit; the normal rows scroll through them (one row up per cut, 0.2 s, the oldest drops off the top),
//   the big last row keeps its slot at the bottom (masked until its turn), and ladder pips on the left margin keep
//   the whole ladder countable.
//
// data (FORMATS.md §9): { input: { amount, per, rate }, columns: [key, put in, ..., worth], rows: [[display...]],
//   rowsT, rowEvery | rowT: [..], highlightLast = true, hold }
//   Column 0 is the key (year, age), column 1 the money put in (3+ columns: grey), the last column the worth (rolls,
//   green). A 4th column in between (e.g. growth) is green without glow.
//   Rows without times start at rowsT (default 1.0) and come every rowEvery s (default 2.4).
// lookOpts (all optional):
//   goal:   { value, display, label }   a finish line: every meter's scale becomes the goal, the strip names it
//                                       ("MILLIONAIRE $1,000,000"), and both light up when a row lands past it (the
//                                       worth column then ends 18 px short of it, so the line never touches a digit)
//   icon:   'coin' | ...                a unit icon beside the hero counter (the kit's icon set)
//   input:  true | false                the input strip ("$100 A MONTH · 8% A YEAR"); default: only when the header
//                                       does not already contain data.input.amount and the board has room
//   meters: true | false                the two-tone meters (default true)
//   beats:  [{ t, l1, l2 }]             the working after the ladder has landed (e.g. "$5 A DAY × 75,176" /
//                                       "≈ $375,880"): from the first beat the rows scroll up out of the verdict
//                                       slot (as they do for the verdict), a black band rises over the stage foot,
//                                       and each beat slams into the slot as a two-line label stack (line 1 white,
//                                       line 2 green; spec markup allowed) and holds until the next beat. The
//                                       verdict replaces the last one (the stack yields to it). Beats at or after
//                                       verdict.t are ignored. Without beats a long hold after the last row is a
//                                       static board with only the captions moving. A beat may also carry
//                                       hero ("× 75,176") and tag ("YEAR 40 =\nDAILY AMOUNT"): the hero follows it,
//                                       a hard cut to that display (with heroTag on, the tag swaps too).
//   heroTag: true                       a two-line tag left of the hero ("YEAR 1" / "$1 A DAY": column 0's label +
//                                       the row's key, then data.input's amount + per), swapped with each row, so
//                                       the big number never reads as an unlabelled answer. It replaces the icon.
//   verdictStyle: 'stack'               the verdict drawn in the beats' style instead of the chrome's one-size
//                                       text: a green rule, line 1 white, line 2 big green (the verdict's text split
//                                       at its "\n"), in the same slot; the hero dims to 42% so the verdict is the
//                                       one focal point on the last frame.
// Also: the rows that make room for the beats / verdict scroll up by whole row pitches (the first row left sits
// right under the column labels, no gap); the key column sits 18 px in from the slot's edge; a meter segment under
// 6 px is not drawn (no stub); lined
// boards (>= 60 px pitch) meter with the bright underline only (no translucent fill behind the put-in digits).
// Kit workaround kept here (reported to the kit owner): the header is built by this format (chrome header: false)
// so its operators can be fixed: "=" and "×" render in Inter Full Black at cap height (the kit's .axo sets them at
// about x-height), and a trailing "?" after "×" is set as a green boxed blank.
import { h, css as style, setHTML, attr, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  esc, ax, bare, tabHTML as tabLib, heroRow, odometer, stageFlash, flashAt, parseDisplay, displayValue,
  formatLike, slam, bump, durationOf, ladderPips, rich, labelStack, header as headerEl,
} from '../lib.js'

const PANEL = '#07090C'
const TRACK = '#161B23'
const PUT = '#AEB8C6'          // "you put in": meter segment and legend swatch
const PUT_TEXT = '#C9D1DC'
// the slot's own fill (the meter's shadow on lined boards, the meter itself on dense ones)
const FILL = { lined: ['rgba(174, 184, 198, 0.10)', 'rgba(43, 255, 136, 0.13)'], dense: ['rgba(174, 184, 198, 0.13)', 'rgba(43, 255, 136, 0.20)'] }

export const css = `
.gl-table { position: absolute; left: 0; top: 0; width: ${W}px; height: 0; }
.gl-row { position: absolute; left: 0; width: ${W}px; }
.gl-slot {
  position: absolute; box-sizing: border-box; border-radius: 12px; --lit: 0; --tone: ${C.white};
  border: 2px solid color-mix(in srgb, var(--tone) calc(var(--lit) * 100%), #1E2530);
  box-shadow: 0 0 calc(var(--lit) * 30px) color-mix(in srgb, var(--tone) calc(var(--lit) * 48%), transparent);
}
.gl-track { position: absolute; left: 12px; right: 12px; border-radius: 3px; background: ${TRACK}; }
.gl-tip { position: absolute; width: 6px; margin-left: -3px; border-radius: 3px; background: ${C.green}; box-shadow: 0 0 14px rgba(43, 255, 136, 0.9); }
.gl-notch { position: absolute; width: 3px; margin-left: -1.5px; border-radius: 2px; background: #3A4452; }
.gl-skel { position: absolute; border-radius: 99px; background: #131820; }
.gl-cell { position: absolute; top: 0; font-family: 'Anton', 'Inter Full', sans-serif; font-weight: 400; line-height: 1; white-space: nowrap; letter-spacing: 0.01em; text-transform: uppercase; }
.gl-cell .ax, .gl-cell .axo { font-size: max(0.86em, min(1em, 42px)); }   /* the slam/bump undershoot keeps it >= 40 px */
.gl-k { color: ${C.white}; transform-origin: 0 55%; }
.gl-p { color: ${PUT_TEXT}; transform-origin: 100% 55%; }
.gl-g { color: ${C.green}; transform-origin: 100% 55%; }
.gl-w { color: ${C.green}; transform-origin: 100% 55%; --glow: 0;
  text-shadow: 0 0 calc(4px + var(--glow) * 22px) rgba(43, 255, 136, calc(0.18 + var(--glow) * 0.55)); }
.gl-hl { position: absolute; font: 700 40px/44px 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.grey}; white-space: nowrap; }
.gl-hl.r { text-align: right; }
.gl-hl.w { color: ${C.white}; }
.gl-ul { position: absolute; border-radius: 3px; }
.gl-strip { position: absolute; display: flex; align-items: center; gap: 18px; white-space: nowrap; font-size: 40px; }
.gl-strip.mid { justify-content: center; }
.gl-strip.end { justify-content: flex-end; }
.gl-strip-lab { font: 700 1em/1.1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; color: ${C.grey}; }
.gl-strip-val { font: 400 1.35em/1 'Anton', 'Inter Full', sans-serif; color: ${C.white}; letter-spacing: 0.01em; --glow: 0;
  text-shadow: 0 0 calc(var(--glow) * 26px) rgba(43, 255, 136, calc(var(--glow) * 0.8)); }
.gl-strip-in { display: block; font: 400 54px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; color: ${C.white}; white-space: nowrap; }
.gl-strip-in em { font-style: normal; color: ${C.green}; }
.gl-strip-in .op { color: ${C.grey}; }
.gl-finish { position: absolute; width: 0; border-left: 3px dashed rgba(43, 255, 136, 0.42); }
.gl-finish.on { border-left: 4px solid ${C.green}; box-shadow: 0 0 18px rgba(43, 255, 136, 0.8); }
.gl-htag { position: absolute; display: flex; flex-direction: column; justify-content: center; gap: 2px; font: 800 44px/1.06 'Inter', 'Inter Full', sans-serif;
  text-transform: uppercase; letter-spacing: 0.02em; white-space: nowrap; color: ${C.white}; text-align: right; }
.gl-htag b { font-weight: 800; color: ${C.green}; }
.gl-hero-x .axo { font-size: 0.62em; font-weight: 900; top: -0.06em; }
.sb-header-text .gl-op { font-family: 'Inter Full', sans-serif; font-weight: 900; font-size: 1.08em; position: relative; top: -0.04em; }
.sb-header-text .gl-blank { display: inline-block; color: ${C.green}; border: 0.06em solid ${C.green}; border-radius: 0.12em;
  padding: 0 0.1em; line-height: 0.92; margin-left: 0.04em; box-shadow: 0 0 14px rgba(43, 255, 136, 0.45); }
.gl-vrule { width: 140px; height: 8px; border-radius: 4px; background: ${C.green}; box-shadow: 0 0 18px rgba(43, 255, 136, 0.5); transform-origin: 50% 50%; margin-bottom: 8px; }
`

// ---------- local helpers ----------

/** a display string as Anton HTML with every digit in a 0.5em slot (lib tabHTML; tight "≈ "). ok: the glyph spans
 *  carry data-overlap-ok (Inter Full's 1.21em font box reaches into a dense neighbour row). ghost: an unlit "≈" */
const tabHTML = (str, ok = false, ghost = false) => {
  const html = tabLib(str, { tight: true, ok })
  return ghost ? html.replace(/<span class="ax"( data-overlap-ok)?>≈<\/span>/, '<span class="ax sb-ghost" data-deco$1>≈</span>') : html
}

const sum = a => a.reduce((x, y) => x + y, 0)
const quadOut = p => 1 - (1 - p) * (1 - p)
/** width of an element's rendered text (widest line), not its box */
const inkW = el => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect().width }

const SX = 140, SW = 800             // slot boxes: x 140-940 (decoration may reach the rail; text ends at 918)
const PADX = 22
const TX0 = SX + PADX, TX1 = SX + SW - PADX, TW = TX1 - TX0
const INSET = 14                     // meter inset inside a slot (2 px border + 12 px)
const TRACK_W = SW - 2 * INSET
const MIN_GAP = 28                   // between columns
const CELL_MIN = 42                  // cell type floor (slam/bump undershoot stays >= 40 px)
const UL = 5                         // legend underline under a column label (grey = put in, green = worth)
const STRIP_H = 56
const MH = 5, MB = 6                 // meter line: height, offset from the slot's bottom edge
const LEAD = 0.45                    // frame 1 is this far into the first count
const DIP = 0.12                     // a cut lands (slam, hero dip) before the count starts
const AFTER = 0.6                    // intro: the first count lands this long after row 1 unmasks
const WIPE = 0.26                    // a new row's meter wipes in to where the last count stopped
const PMIN = 50                      // the densest row pitch (42 px cells); more rows than fit scroll through
const SHIFT = 0.2                    // a scrolling board moves up one row on a cut
const MAKE_ROOM = 0.3                // s before the verdict: the rows scroll up out of the verdict band's way
const KPAD = 18                      // the key column (year) sits this far in from the slot's left edge
const TXK = TX0 + KPAD
const MSTUB = 6                      // a meter segment narrower than this is not drawn (it read as a stray stub)

export default function growthLadder(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const capsOn = layoutFor(spec).captionsOn
  const L = layoutFor(spec, { stageBottom: capsOn ? 1300 : 1460 })

  // ---------- data ----------
  const colsIn = (Array.isArray(d.columns) ? d.columns : []).map(c => (c && typeof c === 'object' ? c.label : c) ?? '')
  const rowsIn = (Array.isArray(d.rows) ? d.rows : []).filter(Array.isArray)
  if (!rowsIn.length) throw new Error('growth-ladder: data.rows is empty')
  const nC = clamp(Math.max(colsIn.length, ...rowsIn.map(r => r.length)), 2, 4)
  const cols = Array.from({ length: nC }, (_, j) => String(colsIn[j] ?? ''))
  const rows = rowsIn.map(r => Array.from({ length: nC }, (_, j) => (r[j] == null ? '' : String(r[j]))))
  const N = rows.length
  const WC = nC - 1                   // worth column (rolls)
  const PC = nC >= 3 ? 1 : -1         // money put in (grey)
  const big = d.highlightLast !== false && N > 1
  const meters = lo.meters !== false

  // ---------- times ----------
  const rowsT = d.rowsT ?? 1.0, every = d.rowEvery ?? 2.4
  const cutT = []
  rows.forEach((_, i) => {
    let t = Array.isArray(d.rowT) && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every
    if (i) t = Math.max(t, cutT[i - 1] + 0.3)
    cutT.push(t)
  })
  const intro = cutT[0] >= 0.5

  // ---------- values (numerics drive motion; every printed number is a display string) ----------
  const tpls = rows.map(r => parseDisplay(r[WC]))
  const numeric = tpls.map(tp => isFinite(tp.value))
  const worthV = []
  tpls.forEach((tp, i) => worthV.push(numeric[i] ? tp.value * tp.scale : i ? worthV[i - 1] : 0))
  const lastTpl = i => { for (let j = i; j >= 0; j--) if (numeric[j]) return tpls[j]; return parseDisplay('0') }
  const putV = rows.map(r => (PC >= 0 ? displayValue(r[PC]) : NaN))
  const goal = lo.goal && +lo.goal.value > 0
    ? { value: +lo.goal.value, display: lo.goal.display != null ? String(lo.goal.display) : '', label: lo.goal.label != null ? String(lo.goal.label) : '' }
    : null
  const gmax = goal ? goal.value : Math.max(1e-9, ...worthV, ...putV.filter(v => isFinite(v)))
  const goalRow = goal ? worthV.findIndex(v => v >= goal.value - 1e-9) : -1

  // ---------- counts: one per row; the hero and the row's Worth cell share it ----------
  const rollFor = (from, to) => (from > 0 ? clamp(0.75 + 0.45 * Math.log2(Math.max(1, to / from)), M.rollMin, M.rollMax) : 1.3)
  // a count starts from what was put in by its row (or the last landing, if that is higher), so a running value is
  // never below the money that went in
  const steps = rows.map((_, i) => {
    const prev = i ? worthV[i - 1] : 0, put = isFinite(putV[i]) ? putV[i] : -Infinity
    const from = numeric[i] ? Math.min(worthV[i], Math.max(prev, put)) : prev
    const to = worthV[i], last = i === N - 1
    let cut, start, roll, curve = ease.out
    // intro: row 1's year and put-in are on the board from frame 1 (the running count has its context: no number
    // tied to nothing on the thumbnail); its Worth counts with the hero and lands AFTER s past rowsT
    if (i === 0 && intro) { cut = 0; start = -LEAD; roll = cutT[0] + AFTER + LEAD; curve = quadOut }
    else if (i === 0) { cut = Math.min(cutT[0], 0); start = cut - LEAD; roll = rollFor(from, to) }
    else { cut = cutT[i]; start = cut + DIP; roll = rollFor(from, to) }
    if (last && big) roll = Math.max(roll, M.rollFinal)
    if (i + 1 < N) roll = Math.min(roll, Math.max(0.45, cutT[i + 1] - start - 0.25))
    if (!numeric[i]) roll = Math.min(roll, 0.3)
    return { cut, start, roll, land: start + roll, from, to, curve, last }
  })
  /** the shared count at t: { k, v, p } (k = the count that owns t; before its start, the previous landing) */
  function countAt(t) {
    let k = -1
    for (let j = 0; j < N; j++) if (t >= steps[j].start) k = j
    if (k < 0) return { k, v: 0, p: 0 }
    const st = steps[k], p = prog(t, st.start, st.roll)
    return { k, p, v: p >= 1 ? st.to : lerp(st.from, st.to, st.curve(p)) }
  }


  // ---------- the hero's tag (lookOpts.heroTag) and the beats that move the hero ----------
  const inp0 = d.input || {}
  const heroTag = !!lo.heroTag
  const vStack = lo.verdictStyle === 'stack' && !!(spec.verdict && spec.verdict.text)
  const heroBeats = (Array.isArray(lo.beats) ? lo.beats : []).filter(b => b && b.hero && Number.isFinite(+b.t))
    .map(b => ({ t: +b.t, hero: String(b.hero), tag: b.tag != null ? String(b.tag) : '' })).sort((a, b) => a.t - b.t)
  const tagOf = (a, b2) => `${esc(bare(a))}${b2 ? '<b>' + esc(bare(b2)) + '</b>' : ''}`
  const tagHTML = s0 => { const [a, ...rest] = String(s0).split('\n'); return `<span>${esc(bare(a))}</span>` + (rest.length ? `<b>${esc(bare(rest.join(' ')))}</b>` : '') }
  const rowTag = i => `<span>${esc(bare(cols[0]))} ${esc(bare(rows[i][0]))}</span>` + (inp0.amount ? `<b>${esc(bare([inp0.amount, inp0.per].filter(Boolean).join(' ')))}</b>` : '')
  const tagStates = heroTag ? [...rows.map((_, i) => rowTag(i)), ...heroBeats.map(b => tagHTML(b.tag))] : []
  const tagProbe = heroTag ? h('div', { class: 'gl-htag', style: { left: '-4000px', top: '0px' } }) : null
  if (tagProbe) stage.append(tagProbe)
  const tagW = tagStates.map(x => { setHTML(tagProbe, x); return Math.ceil(tagProbe.getBoundingClientRect().width) })
  if (tagProbe) tagProbe.remove()
  const TAG_GAP = 22
  const tagMax = tagW.length ? Math.max(...tagW) : 0

  // ---------- hero size: the widest worth display, measured on a probe odometer ----------
  const icon = heroTag ? null : lo.icon || null
  const HS = L.hero.size, HI = L.hero.icon
  const iconSpace = icon ? HI + 12 : heroTag ? tagMax + TAG_GAP : 0
  const odoProbe = odometer(stage, { size: 100, cls: 'gl-hero-x' })
  let odoW100 = 1
  for (const x of [...rows.map(r => r[WC]), ...heroBeats.map(b => b.hero)]) { odoProbe.show(x); odoW100 = Math.max(odoW100, odoProbe.el.getBoundingClientRect().width) }
  odoProbe.el.remove()
  const heroSize = Math.floor(Math.min(HS, ((920 - iconSpace) / odoW100) * 100))
  const heroIconSize = Math.round(HI * Math.min(1, heroSize / HS + 0.1))
  // landing bumps scale the whole hero group about x 540: cap them so it never leaves x 62-1018
  const safeAmp = Math.max(0.03, 956 / ((odoW100 * heroSize) / 100 + (icon ? heroIconSize + 12 : heroTag ? tagMax + TAG_GAP : 0)) - 1)
  const flash = stageFlash(stage, L)

  // ---------- the board: measure ----------
  const table = h('div', { class: 'gl-table' })
  stage.append(table)
  const probe = h('div', { class: 'gl-cell', style: { fontSize: '100px', left: '0px' } })
  table.append(probe)
  const measure = str => { setHTML(probe, tabHTML(str)); return probe.getBoundingClientRect().width }
  const cellW100 = rows.map(r => r.map(measure))
  probe.remove()
  const colW100 = Array.from({ length: nC }, (_, j) => Math.max(1, ...cellW100.map(r => r[j])))
  const legend = j => meters && PC >= 0 && (j === PC || j === WC)
  // the worth column's right edge: 18 px short of a goal's finish line, so the line never runs through a digit
  const TXW = goal && meters ? TX1 - 18 : TX1
  const labels = cols.map((c, j) => {
    const el = h('div', { class: 'gl-hl' + (j ? ' r' : '') + (j === WC ? ' w' : ''), html: esc(bare(c)) })
    table.append(el)
    return el
  })
  const labelW40 = labels.map(inkW)
  const wordProbe = h('div', { class: 'gl-hl', style: { left: '0px', top: '0px' } })

  // strip: the goal, or the input when the header does not already carry it
  const inp = d.input && (d.input.amount || d.input.rate) ? d.input : null
  const headerSays = s => !!s && bare(spec.header || '').toLowerCase().includes(String(s).toLowerCase())
  let strip = goal ? 'goal' : null
  if (!strip && inp && lo.input !== false && (lo.input === true || !headerSays(inp.amount))) strip = 'input'

  // ---------- the board: plan ----------
  // All rows share one column layout, except the big last row's worth, which is sized on its own (bigger).
  const nIdx = rows.map((_, i) => i).filter(i => !(big && i === N - 1))
  const colW100n = Array.from({ length: nC }, (_, j) => Math.max(1, ...(j === WC ? nIdx : rows.map((_, i) => i)).map(i => cellW100[i][j])))
  const LGAP = 24
  // right edges packed from the left: a column ends where both its cells (28 px after the previous column's cells)
  // and its label (24 px after the previous label, swatch included) fit. Labels may reach over the previous
  // column's cells (they sit on their own line). slack = what is left before the worth column's right edge.
  const pack = (Fr, lw) => {
    const cw = colW100n.map(w => (w * Fr) / 100)
    let cellEnd = TXK + cw[0], labEnd = TXK + lw[0]
    const R = [cellEnd]
    for (let j = 1; j < nC; j++) {
      const r = Math.max(cellEnd + MIN_GAP + cw[j], labEnd + LGAP + lw[j])
      R.push(r); cellEnd = r; labEnd = r
    }
    return { R, slack: TXW - R[WC] }
  }
  // labels: one line at 40 px when they pack beside the smallest cells; else two lines split at the word break
  // that makes them narrowest; then smaller (34 px at worst)
  const labW = str => { wordProbe.textContent = str; return inkW(wordProbe) }
  table.append(wordProbe)
  const split2 = cols.map(c => {
    const words = bare(c).split(/\s+/).filter(Boolean)
    let best = { w: labW(words.join(' ')), k: 0 }
    for (let k = 1; k < words.length; k++) {
      const w = Math.max(labW(words.slice(0, k).join(' ')), labW(words.slice(k).join(' ')))
      if (w < best.w) best = { w, k }
    }
    return { w: best.w + 2, html: best.k ? esc(words.slice(0, best.k).join(' ')) + '<br>' + esc(words.slice(best.k).join(' ')) : esc(words.join(' ')) }
  })
  wordProbe.remove()
  const lw2at = Fl => split2.map(x => (x.w * Fl) / 40)
  const labelLines = pack(CELL_MIN, labelW40).slack >= 0 ? 1 : 2
  let Fl = 40
  if (labelLines === 2) while (Fl > 34 && pack(CELL_MIN, lw2at(Fl)).slack < 0) Fl -= 2
  const lw = labelLines === 1 ? labelW40.map(w => w + 1) : lw2at(Fl)
  const lineH = Math.round(Fl * 1.1)
  const hlH = labelLines * lineH + 4 + UL + 4

  // vertical: the pitch is what the stage leaves; the last row takes bigK pitches
  const top = L.stage.y + 14, bottom = L.stage.y + L.stage.h - 12
  const headOf = withStrip => (withStrip ? STRIP_H + 10 : 0) + hlH + 10
  const pitch = (withStrip, k, n = N) => (bottom - top - headOf(withStrip)) / (big ? n - 1 + k : n)
  let bigK = 1.55
  if (strip === 'input' && lo.input !== true && pitch(true, bigK) < 66) strip = null
  if (pitch(!!strip, bigK) < 58) bigK = 1.3
  // more rows than fit at PMIN: the board shows K slots; the normal rows scroll through the top ones (one row up
  // per cut, the oldest drops off) and the big last row keeps its slot at the bottom, masked until its turn
  let K = N
  if (pitch(!!strip, bigK) < PMIN) K = Math.max(big ? 3 : 2, Math.floor((bottom - top - headOf(!!strip)) / PMIN - (big ? bigK - 1 : 0)))
  const scroll = K < N
  const WIN = big ? K - 1 : K                           // normal slots on the board
  const Nn = big ? N - 1 : N                            // normal rows
  const P = Math.min(96, pitch(!!strip, bigK, K))
  const lined = meters && P >= 60
  const gapR = P >= 60 ? 7 : 5
  const textArea = (hs, mh) => hs - (lined ? mh + MB + 3 : 0) - 8
  const FrV = clamp(Math.floor(textArea(P - gapR, MH) / 0.88), CELL_MIN, 62)

  // the big last row: its worth as large as its slot and the room right of the last middle column allow
  const lastW = cellW100[N - 1]
  const bigMh = MH + 2
  const bigArea = textArea(bigK * P - gapR, bigMh)
  const edgesFor = pk => {
    // the slack goes after the put-in column: all of it before the worth (3 columns), split evenly (4 columns)
    const R = pk.R.slice()
    for (let j = 2; j < WC; j++) R[j] += (Math.max(0, pk.slack) * (j - 1)) / (WC - 1)
    R[WC] = TXW
    return R
  }
  const bigFor = (Fr, R) => {
    if (!big) return { Fb: Fr, Fk: Fr }
    // the big worth lands with a 12% bump (origin right) and the key and put-in slam 12% toward each other:
    // their room is measured at those peak sizes
    const keyEnd = fk => TXK + (lastW[0] * fk * 1.12) / 100
    const roomW = fk => TXW - (nC >= 3 ? R[WC - 1] : keyEnd(fk)) - MIN_GAP
    let Fb = Math.floor(Math.min(bigArea / 0.88, (roomW(Fr) / (lastW[WC] * 1.12)) * 100, 112))
    const roomK = ((nC >= 3 ? R[1] - (lastW[1] * Fr * 1.12) / 100 : TXW - (lastW[WC] * Fb * 1.12) / 100) - MIN_GAP - TXK) / 1.12
    const Fk = Math.floor(Math.max(Fr, Math.min(Fb, bigArea / 0.88, (roomK / lastW[0]) * 100, 96)))
    if (nC < 3) Fb = Math.floor(Math.min(Fb, (roomW(Fk) / (lastW[WC] * 1.12)) * 100))
    return { Fb, Fk }
  }
  // horizontal: the largest cell font (<= FrV) that packs, then smaller until the last worth reads as the big one
  // (>= 1.22x, not below 46 px). Under 42 px (only when nothing else packs) cells fade in without the slam scale.
  let Fr = FrV, pk = pack(Fr, lw)
  while (pk.slack < 0 && Fr > 36) { Fr--; pk = pack(Fr, lw) }
  while (big && Fr > 46 && bigFor(Fr, edgesFor(pk)).Fb < 1.22 * Fr) { Fr--; pk = pack(Fr, lw) }
  const right = edgesFor(pk)
  const { Fb, Fk } = bigFor(Fr, right)

  // positions (the board is centred in the stage when it has room to spare)
  const rowH = rows.map((_, i) => (big && i === N - 1 ? bigK * P : P))
  const boardH = headOf(!!strip) + WIN * P + (big ? bigK * P : 0)
  const y0 = Math.round(top + Math.max(0, (bottom - top - boardH) / 2))
  const yStrip = y0, yLab = y0 + (strip ? STRIP_H + 10 : 0), yRows = yLab + hlH + 10
  const rowY = rows.map((_, i) => Math.round(yRows + (i < Nn ? i : WIN) * P))    // a row's slot before any scrolling
  // motion that scales text keeps it >= 40 px: the slam's and the bump's undershoot shrink with the type size
  const slamFrom = F => (F >= 42 ? 1.12 : 1)
  const bumpAmp = (F, want) => clamp((1 - 40 / F) / 0.16, 0, want)

  // ---------- the board: build ----------
  const okAx = P < 64
  let stripVal = null
  if (strip === 'goal') {
    const el = h('div', { class: 'gl-strip end', style: { left: SX + 'px', width: SW - INSET - 12 + 'px', top: yStrip + 'px', height: STRIP_H + 'px' } })
    if (goal.label) el.append(h('span', { class: 'gl-strip-lab', html: esc(bare(goal.label)) }))
    if (goal.display) { stripVal = h('span', { class: 'gl-strip-val', html: tabHTML(goal.display) }); el.append(stripVal) }
    table.append(el)
    fitText(el, SW - INSET - 12, { minPx: 40 })
  } else if (strip === 'input') {
    const a = [inp.amount, inp.per].filter(Boolean).join(' ')
    const html = (a ? `<em>${ax(esc(a))}</em>` : '') + (a && inp.rate ? '<span class="op"> · </span>' : '') + (inp.rate ? ax(esc(inp.rate)) : '')
    const inner = h('span', { class: 'gl-strip-in', html })
    table.append(h('div', { class: 'gl-strip mid', style: { left: SX + 'px', width: SW + 'px', top: yStrip + 'px', height: STRIP_H + 'px' } }, inner))
    fitText(inner, SW - 20, { minPx: 40 })
  }

  // column labels, bottom-aligned on the board, with a legend underline (grey = put in, green = worth)
  labels.forEach((el, j) => {
    style(el, { fontSize: Fl + 'px', lineHeight: lineH + 'px' })
    if (labelLines === 2) setHTML(el, split2[j].html)
    const bw = el.getBoundingClientRect().width
    const lb = yLab + hlH - 2 - UL - 6                     // the labels' bottom line
    style(el, { left: (j ? right[j] - bw : TXK) + 'px', top: lb - el.offsetHeight + 'px' })
    if (legend(j)) {
      const iw = inkW(el)
      table.append(h('div', { class: 'gl-ul', 'data-deco': '', style: {
        left: (j ? right[j] - iw : TXK) + 'px', width: iw + 'px', top: lb + 5 + 'px', height: UL + 'px',
        background: j === WC ? C.green : PUT, boxShadow: j === WC ? '0 0 10px rgba(43, 255, 136, 0.6)' : 'none' } }))
    }
  })

  // the finish line (goal): through every meter's end, from under the strip to the last slot
  const finishX = SX + INSET + TRACK_W
  const finish = goal && meters ? h('div', { class: 'gl-finish', 'data-deco': '', style: {
    left: finishX - 1.5 + 'px', top: yStrip + STRIP_H + 2 + 'px', height: yRows + WIN * P + (big ? bigK * P : 0) - gapR - (yStrip + STRIP_H + 2) + 'px' } }) : null

  const R = rows.map((r, i) => {
    const isBig = big && i === N - 1
    const y = rowY[i], hs = Math.round(rowH[i] - gapR), mh = isBig ? bigMh : MH
    const F = isBig ? Fb : Fr, FK = isBig ? Fk : Fr
    const row = h('div', { class: 'gl-row', style: { top: y + 'px', height: rowH[i] + 'px' } })
    table.append(row)
    const slot = h('div', { class: 'gl-slot', 'data-deco': '', style: { left: SX + 'px', top: '0px', width: SW + 'px', height: hs + 'px', background: PANEL } })
    row.append(slot)
    const textBot = y + hs - (lined ? mh + MB + 3 : 0) - 4
    const midY = (y + 4 + textBot) / 2
    let track = null
    const tips = []
    if (meters && lined) {
      track = h('div', { class: 'gl-track', style: { bottom: MB - 2 + 'px', height: mh + 'px' } })
      slot.append(track)
      tips.push(h('div', { class: 'gl-tip', style: { top: '-4px', bottom: '-4px' } }))
      track.append(tips[0])
      if (goal) track.append(h('div', { class: 'gl-notch', style: { left: '50%', top: '-5px', bottom: '-5px' } }))
    } else if (meters) {
      // dense: the slot's fill is the meter; its end is marked by two ticks on the slot's edges (never under text)
      tips.push(h('div', { class: 'gl-tip', style: { top: '2px', height: '7px', width: '5px', marginLeft: '-2.5px' } }),
        h('div', { class: 'gl-tip', style: { bottom: '2px', height: '7px', width: '5px', marginLeft: '-2.5px' } }))
      slot.append(...tips)
      if (goal) slot.append(h('div', { class: 'gl-notch', style: { left: 12 + TRACK_W / 2 + 'px', top: '2px', height: '7px' } }),
        h('div', { class: 'gl-notch', style: { left: 12 + TRACK_W / 2 + 'px', bottom: '2px', height: '7px' } }))
    }
    // LED-off placeholders where the cells will land (no year, no value: nothing to spoil)
    const skel = r.map((_, j) => {
      const fs = j === WC ? F : j === 0 ? FK : Fr
      const w = Math.max(fs * 0.9, ((cellW100[i][j] * fs) / 100) * 0.82)
      const x = j === 0 ? TXK - SX - 2 : (j === WC ? TXW : right[j]) - SX - 2 - w
      const hh = Math.max(10, Math.round(fs * 0.3))
      const el = h('div', { class: 'gl-skel', style: { left: x + 'px', width: w + 'px', top: midY - y - 2 - hh / 2 + 'px', height: hh + 'px' } })
      slot.append(el)
      return el
    })
    const cells = r.map((txt, j) => {
      const fs = j === WC ? F : j === 0 ? FK : Fr
      const cls = j === 0 ? 'gl-k' : j === WC ? 'gl-w' : j === PC ? 'gl-p' : 'gl-g'
      const el = h('div', { class: 'gl-cell ' + cls, html: tabHTML(txt, okAx), style: { fontSize: fs + 'px', top: Math.round(midY - y - 0.455 * fs) + 'px' } })
      if (j === 0) style(el, { left: TXK + 'px' })
      else style(el, { right: W - (j === WC ? TXW : right[j]) + 'px' })
      row.append(el)
      return el
    })
    return { row, slot, track, tips, skel, cells, isBig, F, FK }
  })
  if (finish) table.append(finish)

  // a scrolling board keeps the whole ladder countable on the left margin (decoration)
  const pips = scroll ? ladderPips(stage, { x: 76, bottom: L.stage.y + L.stage.h - 22, n: N, gap: Math.min(30, (L.stage.h - 60) / N) }) : null

  // ---------- hero ----------
  const hero = heroRow(stage, L, { icon, size: heroSize, iconSize: heroIconSize })
  hero.odo.el.classList.add('gl-hero-x')
  const tag = heroTag ? h('div', { class: 'gl-htag', style: { top: '0px', height: L.hero.h + 'px' } }) : null
  if (tag) hero.el.append(tag)
  // the tag sits left of the number as one centred group (like the kit's icon)
  const placeTag = k => {
    if (!tag) return
    setHTML(tag, tagStates[k])
    const space = tagW[k] + TAG_GAP
    style(hero.glow, { paddingLeft: space + 'px' })
    style(tag, { left: (L.hero.w / 2 - (hero.odo.el.offsetWidth + space) / 2).toFixed(1) + 'px' })
  }

  // ---------- header: built here so its operators read at cap height (kit workaround) ----------
  const hd = headerEl(stage, spec, L)
  {
    let html = hd.inner.innerHTML
    html = html.replace(/(^|[\s>])=(?=[\s<])/g, '$1<span class="gl-op">=</span>')
    html = html.replace(/<span class="axo">([×÷])<\/span>/g, '<span class="axo gl-op">$1</span>')
    // the hook's blank: "× ?" sets the "?" as a green boxed blank
    html = html.replace(/(<span class="axo gl-op">×<\/span>)(\s|&nbsp;|\u00a0)*\?/g, '$1 <span class="gl-blank">?</span>')
    setHTML(hd.inner, html)
    style(hd.inner, { fontSize: (L.header.px || SIZE.header) + 'px' })
    fitText(hd.inner, L.header.w, { maxH: L.header.h, minPx: SIZE.headerMin })
  }

  // ---------- verdict (the chrome's, in the kit's slot at the foot of the frame): the rows make room first ----------
  // just before verdict.t the rows scroll up under the column labels (the oldest fade out), so the board's foot, with
  // the big last row, ends above the black band the verdict rises on
  const vT = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null
  // beats (lookOpts.beats): the working after the ladder, in the verdict's slot, before the verdict
  const lastLand = steps[N - 1].land
  const beats = (Array.isArray(lo.beats) ? lo.beats : [])
    .filter(b => b && (b.l1 || b.l2) && Number.isFinite(+b.t))   // (a beat with only hero/tag moves the hero alone)
    .map(b => ({ t: Math.max(+b.t, lastLand + 0.3), l1: String(b.l1 || ''), l2: String(b.l2 || '') }))
    .filter(b => vT == null || b.t < vT - 0.4)
    .sort((a, b) => a.t - b.t)
  const roomT = beats.length ? beats[0].t : vT        // when the rows must be out of the slot's way
  const bandT = beats.length ? beats[0].t : vStack ? vT : null
  const boardBottom = yRows + WIN * P + (big ? bigK * P : 0) - gapR
  // (in whole row pitches: the first row left on the board then sits right under the column labels, with no gap
  // where a faded row used to be)
  const room0 = roomT != null && L.verdict.boxed ? Math.max(0, boardBottom - (L.verdict.y - 18)) : 0
  const room = room0 > 0 ? Math.ceil(room0 / P - 1e-3) * P : 0
  const makeRoom = t => (room > 0 ? room * ease.inOut(prog(t, roomT - MAKE_ROOM - 0.05, MAKE_ROOM)) : 0)
  // the beats' band: the same black band the verdict rises on (the verdict's own band then rises over it unseen)
  const sbY = L.stage.y + L.stage.h, bandTop = L.verdict.y - 10
  const beatBand = bandT != null && L.verdict.boxed && sbY > bandTop
    ? h('div', { class: 'sb-vband', 'data-deco': '', style: { top: bandTop + 'px', height: sbY - bandTop + 'px', display: 'none' } }) : null
  if (beatBand) stage.append(beatBand)
  // verdictStyle 'stack': the verdict is the stack's last group (line 1 white, line 2 big green, a rule above)
  const vParts = vStack ? String(spec.verdict.text).split('\n') : null
  const stackItems = [...beats.map(b => ({ l1: rich(b.l1), l2: rich(b.l2), l1Color: C.white, l2Color: C.green })),
    ...(vStack ? [{ l1: vParts.length > 1 ? rich(vParts[0]) : '', l2: rich(vParts.length > 1 ? vParts.slice(1).join(' ') : vParts[0]), l1Color: C.white, l2Color: C.green }] : [])]
  const beatStack = stackItems.length
    // line 2 (the answer) a size up from the captions-on stack (72 → 88 px): the slot is the verdict's 196 px
    ? labelStack(stage, { ...L, label: { y: L.verdict.y, h: L.verdict.h, w: L.verdict.w }, type: { ...L.type, l2: Math.max(L.type.l2, 88) } },
      stackItems, { yieldToVerdict: !vStack })
    : null
  const vRule = vStack && beatStack ? h('div', { class: 'gl-vrule', 'data-deco': '' }) : null
  if (vRule) beatStack.groups[beatStack.groups.length - 1].prepend(vRule)
  if (vStack) { ctx.cue(vT, 'reveal', { gain: 0.7 }); ctx.cue(vT + 0.08, 'cash', { gain: 0.45 }) }
  if (beatStack) {
    style(beatStack.el, { zIndex: 21 })
    // centred in the slot like the verdict (labelStack top-aligns; a 2-line beat is ~130 px of a 196 px slot). The
    // slam (<= 1.16 about 40% of the group) still ends above L.limit: the shift is at most half the spare height.
    beatStack.groups.forEach(g => {
      style(g, { display: 'flex' })
      const dy = Math.max(0, Math.floor((L.verdict.h - g.offsetHeight) / 2))
      style(g, { top: dy + 'px', display: 'none' })
    })
  }
  beats.forEach(b => ctx.cue(b.t, 'reveal', { gain: 0.6 }))

  // ---------- sound: a thud per cut, a roll per count, a ding per landing; the last: riser, hit, cash ----------
  steps.forEach((st, i) => {
    const last = i === N - 1
    if (st.cut > 0.05) ctx.cue(st.cut, 'thud', { gain: 0.6 })
    // a fast ladder (rows < 2 s apart) keeps a thud-ding rhythm: back-to-back rolls would blur into one hiss
    const fast = i + 1 < N && cutT[i + 1] - st.start < 2
    const r0 = Math.max(0, st.start)
    if (st.land - r0 > 0.25 && (!fast || last)) ctx.cue(r0, 'roll', { dur: Math.max(0.3, st.land - r0 - 0.05), gain: last ? 0.8 : 0.6 })
    if (last && big && st.cut > 0.05) ctx.cue(st.cut, 'riser', { dur: Math.max(0.5, st.land - st.cut), gain: 0.5 })
    ctx.cue(st.land, last ? 'hit' : 'ding', { gain: last ? 0.9 : 0.5 })
    if (last) ctx.cue(st.land + 0.06, 'cash', { gain: 0.65 })
    else if (i === goalRow) ctx.cue(st.land + 0.06, 'cash', { gain: 0.5 })
  })

  const duration = durationOf(spec, Math.max(steps[N - 1].land, ...beats.map(b => b.t + 1.5)), d.hold ?? M.hold)
  const px = v => clamp(v / gmax) * TRACK_W
  const fill = FILL[lined ? 'lined' : 'dense']
  const slotBg = (a, b, base) => (b > 0.5
    ? `linear-gradient(90deg, ${fill[0]} 0 ${12 + a}px, ${fill[1]} ${12 + a}px ${12 + b}px, transparent ${12 + b}px), ${base}`
    : base)

  return {
    duration,
    layout: L,
    header: false,                                          // built above (operators at cap height)
    ...(vStack ? { verdict: false } : {}),                  // drawn as the stack's last group
    seek(t) {
      const c = countAt(t)
      let a = -1                                           // the active row: the latest cut at or before t
      for (let j = 0; j < N; j++) if (t >= steps[j].cut || steps[j].cut <= 0) a = j

      let off = 0                                         // rows scrolled off the top (eased on each cut)
      if (scroll) for (let i = WIN; i < Nn; i++) off += ease.out(prog(t, steps[i].cut, SHIFT))
      if (pips) pips.seek(t, a, a >= 0 ? Math.max(0, steps[a].cut) : 0)

      R.forEach((o, i) => {
        const st = steps[i]
        const shown = st.cut <= 0 || t >= st.cut
        const landed = t >= st.land
        const active = i === a
        const mr = makeRoom(t)                              // px the rows have scrolled up for the verdict
        if (scroll && !o.isBig) {
          const pos = i - off - mr / P                      // slot index on the board right now
          const op = pos < 0 ? clamp(1 + 4 * pos) : 1
          const on = op > 0 && (pos < WIN - 1e-6 || (shown && pos <= WIN + 1e-6))
          const dy = off * P + mr
          style(o.row, { display: on ? 'block' : 'none', opacity: op.toFixed(3), transform: dy > 0 ? `translateY(${Math.round(-dy)}px)` : 'none' })
          if (!on) return
        } else {
          // rows scrolled up under the column labels fade out there (the oldest first)
          const pos = (rowY[i] - mr - yRows) / P
          const op = pos < 0 ? clamp(1 + 4 * pos) : 1
          style(o.row, { display: op > 0 ? 'block' : 'none', opacity: op.toFixed(3), transform: mr > 0 ? `translateY(${Math.round(-mr)}px)` : 'none' })
          if (op <= 0) return
        }
        const v = landed ? st.to : c.k === i ? c.v : st.from     // the row's count
        // slot light: white while counting, green once landed; a done row goes dark (one focal number)
        let lit = 0, tone = C.white
        if (shown && active) {
          if (!landed) lit = 0.4 + 0.5 * flashAt(t, st.cut, 0.32)
          else { tone = C.green; lit = o.isBig ? 0.85 + 0.15 * flashAt(t, st.land, 0.6) : 0.5 + 0.5 * flashAt(t, st.land, 0.6) }
        }
        style(o.slot, { '--lit': lit.toFixed(3), '--tone': tone })
        // the worth waits (LED off) for its count: a new row never shows the last row's number
        const counting = landed || t >= st.start
        o.skel.forEach((sk, j) => style(sk, { display: !shown || (j === WC && !counting) ? 'block' : 'none' }))

        // cells: key + put-in slam in at the cut; the worth counts with the hero and lands on its display
        const k = slam(t, st.cut, { from: slamFrom(Math.min(o.FK, Fr)) })
        o.cells.forEach((el, j) => {
          if (!shown || (j === WC && !counting)) { style(el, { display: 'none' }); return }
          if (j === WC) {
            const done = landed || !numeric[i]
            setHTML(el, tabHTML(done ? rows[i][WC] : formatLike(v, tpls[i]), okAx, !done))
            const sc = landed ? bump(t, st.land, { amp: bumpAmp(o.F, o.isBig ? 0.12 : 0.1), dur: o.isBig ? 0.5 : M.bump }) : 1
            const glow = !landed ? (active ? 0.25 : 0) : o.isBig ? 0.75 + 0.25 * flashAt(t, st.land, 1.0) : active ? 0.3 + 0.7 * flashAt(t, st.land, 0.7) : 0
            style(el, { display: 'block', opacity: String(k.o), transform: sc === 1 ? 'none' : `scale(${sc.toFixed(4)})`, '--glow': glow.toFixed(3) })
          } else {
            style(el, { display: 'block', opacity: String(k.o), transform: k.s === 1 ? 'none' : `scale(${k.s.toFixed(4)})` })
          }
        })

        // meter: one shared scale; grey up to what was put in, green beyond; only the active row's tip glows
        const base = o.isBig && landed ? `color-mix(in srgb, ${C.greenDeep} ${(55 + 45 * flashAt(t, st.land, 0.9)).toFixed(1)}%, ${PANEL})` : PANEL
        if (meters) {
          const wipe = st.cut <= 0 ? 1 : ease.out(prog(t, st.cut, WIPE))
          const vg = shown ? v * wipe : 0
          // gradient stops on whole pixels: sub-pixel hard stops rasterize differently from paint to paint
          let b = Math.round(px(vg)), a2 = PC >= 0 && isFinite(putV[i]) ? Math.min(Math.round(px(putV[i] * wipe)), b) : 0
          if (b < MSTUB) b = 0
          if (a2 < MSTUB) a2 = 0
          if (o.track) style(o.track, { background: `linear-gradient(90deg, ${PUT} 0 ${a2}px, ${C.green} ${a2}px ${b}px, ${TRACK} ${b}px)` })
          // (a meter only a few px long has no tip: it would sit on the year)
          for (const tp of o.tips) style(tp, { display: shown && active && b > 16 ? 'block' : 'none', left: ((o.track ? 0 : 12) + b).toFixed(1) + 'px' })
          style(o.slot, { background: shown && !lined ? slotBg(a2, b, base) : shown ? base : PANEL })
        } else style(o.slot, { background: base })
      })

      // goal: the finish line and the strip light once a row lands past it
      if (goal) {
        const hit = goalRow >= 0 && t >= steps[goalRow].land
        if (finish) attr(finish, 'class', 'gl-finish' + (hit ? ' on' : ''))
        if (stripVal) style(stripVal, { color: hit ? C.green : C.white, '--glow': hit ? (0.6 + 0.4 * flashAt(t, steps[goalRow].land, 0.9)).toFixed(3) : '0' })
      }

      // hero: holds the last landing until a count starts, then rolls with it, landing exactly on the display; a
      // beat with a hero display takes it over (a hard cut), and the tag names whatever the hero shows
      let hb = -1
      heroBeats.forEach((b, j) => { if (t >= b.t) hb = j })
      if (hb >= 0) hero.show(heroBeats[hb].hero)
      else if (c.k < 0) hero.set(steps[0].from, tpls[0], true)
      else if (c.p >= 1 || !numeric[c.k]) hero.set(worthV[c.k], lastTpl(c.k))
      else hero.set(c.v, tpls[c.k], true)                // running: the "≈" is an unlit ghost until it lands
      placeTag(hb >= 0 ? N + hb : Math.max(0, c.k))

      // anticipation dip on each cut, a bump + glow flare on each landing (bigger for the last), a floor bloom
      let sc = 1, glow = 0, fl = 0
      steps.forEach((st, j) => {
        const last = j === N - 1 && big
        if (st.cut > 0.05) sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, st.cut, 0.28))
        sc *= bump(t, st.land, { amp: Math.min(last ? 0.13 : 0.08, safeAmp), dur: last ? 0.5 : M.bump })
        if (t >= st.land) glow = Math.max(glow, (last ? 1 : 0.6) * (1 - ease.out(prog(t, st.land, last ? 1.1 : 0.6))))
        fl = Math.max(fl, (last ? 0.75 : 0.16) * flashAt(t, st.land, last ? 0.9 : 0.45))
      })
      heroBeats.forEach(b => {
        sc *= bump(t, b.t, { amp: Math.min(0.08, safeAmp), dur: M.bump })
        if (t >= b.t) glow = Math.max(glow, 0.8 * (1 - ease.out(prog(t, b.t, 0.8))))
      })
      // a stacked verdict is the one focal point on the last frame: the hero steps back
      const dim = vStack ? ease.inOut(prog(t, vT, 0.25)) : 0
      style(hero.el, { transform: `scale(${sc.toFixed(4)})`, opacity: (1 - 0.58 * dim).toFixed(3) })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': ((0.38 + 0.45 * glow) * (1 - 0.8 * dim)).toFixed(3) })
      flash.set(fl)

      // beats: the band rises (0.2 s) just before the first; each beat slams into the slot and holds until the next
      if (beatBand) {
        const q = ease.out(prog(t, bandT - 0.2, 0.2)), bt = lerp(sbY, bandTop, q)
        style(beatBand, { display: q > 0 ? 'block' : 'none', top: bt.toFixed(1) + 'px', height: (sbY - bt).toFixed(1) + 'px' })
      }
      if (beatStack) {
        let bi = -1
        beats.forEach((b, j) => { if (t >= b.t) bi = j })
        if (vStack && t >= vT) bi = beats.length
        beatStack.seek(t, bi, bi >= 0 ? (bi < beats.length ? beats[bi].t : vT) : 0)
        if (vRule) style(vRule, { transform: `scaleX(${ease.out(prog(t, vT + 0.04, 0.35)).toFixed(4)})` })
      }

      // verdict: the answer takes the hook's place
      // (the verdict is the chrome's)
    },
  }
}
