// live-sheet · growth-ladder (P2): one small regular amount, one row per year (or per 5 years), the biggest
// number last. FinCalC's ladder, as a designed sheet: put-in beside worth, so the growth visibly overtakes
// what went in.
//
// The sheet, top to bottom:
//   formula bar   the working (lookOpts.formulaBar [{ t, text }], else data.formula, else
//                 "= <amount> <per> at <rate>"). A line with a result ("$7,348 × 8% ÷ 12 ≈ $49/mo") swaps in whole
//                 at its t (the previous line stays until then: no blank bar) and types only its result as the
//                 row's cells land, so the proof finishes with the answer; a line without one types in ~0.7 s.
//                 Frame 1 shows the first line's working with its result typing.
//   A B C         column letters (decoration; dropped when rows would get under 64 px)
//   row 1         labels: Year (mint input) · You put in (grey) · Worth (peach output); "\n" starts the grey
//                 sub-label (lookOpts.subLabels builds them from data.input)
//   rows          one per year. Frame 1 shows every year in column A (each viewer finds their horizon) with
//                 empty cells beside them, and rows with t <= 0 already filled (a dollar answer at 0.0 s).
//                 unmask 'rows' hides the years too (FinCalC's literal unmask); inputsAtStart shows the
//                 put-in column from frame 1 as well.
//   last row      a taller summary row: its worth counts up and lands exactly on its display string, the row
//                 wipes yellow (highlightLast) and the selection snaps onto the final cell.
// Optional (lookOpts.bars: true): every worth cell carries a pale two-tone data bar behind its number, all on one
// scale (grey = what you put in, green = the growth). Off by default: the numbers carry the ladder.
// Rows land on rowT: the selection sits on the NEWEST row's landing cells only (one focal row at a time) and snaps
// down as each row lands, popping outward and settling (no edge ever slides through a value); values snap in
// (116% → 100%) with a yellow flash and a tick, left to right 0.08 s apart.
// Marks (lookOpts.marks [{ t, row, tone, label }]) tint their row (yellow for good/goal, rose for bad) and show a
// dark chip within 0.2 s of the row landing. markStyle 'chip' (the 'auto' choice when it fits): the chip is an
// overlay that drops over the gridline under the output cell, onto the next row's still-empty cells, so nothing
// reflows; it fades in and out (opacity only) and is gone before the next row lands. 'tip': the kit's slot
// tooltip (the rows below make room; it now fades out instead of wiping back into its notch). 'bar': the label is
// typed into the formula bar. A good mark is the crossing: its output cell lands bigger (135%) and its year cell
// turns yellow as the chip appears, and stays yellow.
// The verdict: a card in the caption band (the sheet stops above it unless rows would fall under 50 px) or
// retyped into the formula bar (Inter 800). lookOpts.verdictStyle 'stack' sets the card's first line big (Inter
// 900, up to 88 px, its **marker** wiping in) over a smaller second line. When the verdict's emphasis names a row's
// key ("**year 9**"; or lookOpts.verdictRow), that row is the answer: at the verdict the selection snaps onto it,
// it re-lights full width with a bump and the summary row's yellow fades, so the answer is the one focal point on
// the last frame. Otherwise the worth column flashes top to bottom. Captions are drawn here (the kit's captions,
// with "about" / "over" / "nearly" kept with the number after it). A caption that names the counted total waits for
// the count to land. The last 0.5 s clear back to frame 1 so the short loops.
// Layout is automatic: the A B C row goes first when rows get under 64 px, then the summary row's extra height;
// dense silent cards may go down to 48 px rows (text stays at 40 px). The sheet is built and measured: when it does
// not end above its budget it tries 12 px padding, then 46 px rows, then marks in the bar, and last runs silent
// (captions off, the verdict in the bar) down to y 1476.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//           · emphTone ('good') · formulaAt0 (0.7: frame 1's cut when the first line has no result) · formulaBar
//           ([{ t, text }]) · marks ([{ t, row, tone, label }]) · markStyle ('auto' | 'chip' | 'tip' | 'bar')
//           · unmask ('values' | 'rows') · inputsAtStart (false) · bars (false; true or 'auto': 3-column ladders)
//           · subLabels (false) · verdictStyle ('card' | 'stack') · verdictRow (the answer row's index; default:
//           the row whose key the verdict's emphasis names)
import {
  h, setStyle, setHTML, clamp, prog, ease, plain, graphemes, C, G, M, S,
  sheet, tipStrip, fitTips, tipWindow, mk, mkLen, typedMk, typedCount, wordCut, caretOn, countText, displayValue,
  popScale, flashAlpha, rgba, durationOf, hasCaptions, opt, layer, footerHeight, fitFormula, textW, font,
  toneColor, toneFill, cellSizes, isNumeric, hasUnits, fitBarVerdict, fitWarn, captions, parseMarkup,
} from '../lib.js'

export const css = `
.gl-out .ls-v { position: relative; z-index: 1; }
.gl-bar { position: absolute; top: 9px; bottom: 9px; pointer-events: none; }
.gl-bar i { position: absolute; top: 0; bottom: 0; left: 0; width: 0; mix-blend-mode: multiply; }
.gl-bar i.put { background: #E7EAF0; border-radius: 6px 0 0 6px; }
.gl-bar i.grow { background: #CDF3DF; border-radius: 0 6px 6px 0; }
.gl-last .ls-cell { border-top: 3px solid #D0D5DD; }
.gl-chip { position: absolute; left: 0; top: 0; background: #101828; border-radius: 14px; display: flex; align-items: center;
  justify-content: center; box-sizing: border-box; padding: 0 24px; opacity: 0; transform-origin: 50% 0;
  box-shadow: 0 6px 18px rgba(16, 24, 40, 0.28); }
.gl-chiptxt { font: 800 42px/1.1 'Inter', 'Inter Full', sans-serif; color: #FFFFFF; white-space: nowrap; letter-spacing: -0.01em; }
.gl-chiptxt em { font-style: normal; color: #FFD60A; }
.gl-chipnotch { position: absolute; width: 18px; height: 18px; background: #101828; transform: rotate(45deg); border-radius: 3px; opacity: 0; }
.gl-v { position: absolute; background: #FFFFFF; border-radius: 24px; padding: 18px 34px 20px 116px; box-sizing: border-box;
  opacity: 0; transform-origin: 50% 50%; }
.gl-v .ls-chip { left: 26px; width: 70px; height: 64px; font-size: 48px; }
.gl-v1 { font: 900 88px/1.04 'Inter', 'Inter Full', sans-serif; color: #101828; letter-spacing: -0.025em; white-space: nowrap; width: max-content; }
.gl-v1 em { font-style: normal; background-image: linear-gradient(#FFD60A, #FFD60A); background-repeat: no-repeat;
  background-size: var(--hl, 100%) 1.0em; background-position: 0 58%; border-radius: 10px; padding: 0 0.08em; }
.gl-v2 { font: 700 44px/1.2 'Inter', 'Inter Full', sans-serif; color: #344054; letter-spacing: -0.01em; white-space: nowrap; margin-top: 6px; width: max-content; }
.gl-v2 em { font-style: normal; color: #101828; font-weight: 800; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// keep an operator glued to the token after it, so a wrapped line never ends on a dangling "≈" or "×"
const glueOps = str => String(str).replace(/(^|\s)([=≈×÷→+−<>-]) /g, '$1$2 ')
const BAD_TINT = '#FEE4E2' // a rose row tint for a "bad" mark (green and ink text stay ≥ 3.8:1 on it)
const tipTone = { good: C.goodDark, bad: C.badDark }
const RES = ' ≈ ' // a formula line's result starts at its last " ≈ "
// a selection that snaps to a new range pops this many px outward and settles (no edge crosses a value)
const POP = 7, POP_DUR = 0.24

export default function growthLadder(spec, ctx) {
  const d = spec.data || {}
  const input = d.input || {}
  const rows = (d.rows || []).map(r => r.map(v => (v == null ? '' : String(v))))
  const N = rows.length
  const cols0 = (d.columns && d.columns.length ? d.columns : ['Year', 'You put in', 'Worth'])
    .map(c => (typeof c === 'string' ? { label: c } : { ...c }))
  const nC = cols0.length
  let outC = cols0.findIndex(c => c.emph)
  if (outC < 0) outC = nC - 1
  const putC = nC >= 3 && outC !== 1 ? 1 : -1 // the deposits column ("You put in")

  // ---------- options ----------
  const loopOn = opt(spec, 'loop', true)
  let caps = hasCaptions(spec)
  const unmaskRows = opt(spec, 'unmask', 'values') === 'rows'
  const inputsAtStart = !unmaskRows && !!opt(spec, 'inputsAtStart', false)
  const hiLast = d.highlightLast !== false
  const emphTone = cols0[outC].tone || opt(spec, 'emphTone', 'good')
  const emphColor = toneColor(emphTone)
  const emphFill = toneFill(emphTone)
  // optional sub-labels from data.input: "You put in\n$100 a month", "Worth\nat 8% a year"
  if (opt(spec, 'subLabels', false)) {
    const rate = String(input.rate || '').replace(/^at\s+/i, '')
    if (putC >= 0 && input.amount && !String(cols0[putC].label).includes('\n')) cols0[putC].label += `\n${input.amount} ${input.per || ''}`.trimEnd()
    if (rate && !String(cols0[outC].label).includes('\n')) cols0[outC].label += `\nat ${rate}`
  }

  // which columns are on screen from frame 1, which land on the row's time
  // inputsAtStart pre-shows the put-in column only (a 4-column ladder's Worth beside an "earns" output still lands
  // with its row; on a 3-column ladder this is the same as every non-output column)
  const preCol = c => !unmaskRows && (c === 0 || (inputsAtStart && (putC >= 0 ? c === putC : c !== outC)))
  const landCols = cols0.map((_, c) => c).filter(c => !preCol(c))
  const sc0 = Math.min(...landCols), sc1 = Math.max(...landCols)
  const order = c => landCols.indexOf(c) // left-to-right landing order

  // ---------- timing ----------
  const rowsT = d.rowsT ?? 0, every = d.rowEvery ?? 1.2
  const rowT = rows.map((_, i) => (d.rowT && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every))
  const pre = rowT.map(t => t <= 0)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const vT = verdict ? +verdict.t || 0 : Infinity
  const last = N - 1
  const countOn = opt(spec, 'countUp', true) && N > 0 && !pre[last] && isFinite(displayValue(rows[last][outC]))
  const outT0 = r => rowT[r] + order(outC) * 0.08 // when the worth cell of row r lands
  const landEnd = r => outT0(r) + (r === last && countOn ? M.count : M.drop)

  const marks = (d.marks || opt(spec, 'marks', []) || [])
    .filter(m => m && Number.isFinite(+m.row) && m.row >= 0 && m.row < N && m.label)
    .map(m => ({ ...m, row: +m.row, t: Number.isFinite(+m.t) ? +m.t : rowT[m.row] }))
    .sort((a, b) => a.t - b.t)
  const goodTone = tn => tn === 'good' || tn === 'goal'

  // the answer row: lookOpts.verdictRow, else the row whose key the verdict's emphasis names ("**year 9**" → "9")
  let ansRow = -1
  if (verdict) {
    const vr = opt(spec, 'verdictRow', null)
    if (Number.isFinite(+vr) && vr !== null && +vr >= 0 && +vr < N) ansRow = +vr
    else {
      const keys = rows.map(r => r[0])
      for (const seg of parseMarkup(verdict.text)) {
        if (seg.k !== 1 || ansRow >= 0) continue
        for (const tok of seg.text.match(/\d[\d,.]*/g) || []) {
          const k = keys.indexOf(tok.replace(/[.,]$/, ''))
          if (k >= 0) { ansRow = k; break }
        }
      }
    }
  }

  // ---------- formula bar entries ----------
  const rateTxt = String(input.rate || '').replace(/^at\s+/i, '')
  const autoFormula = input.amount ? `= ${input.amount}${input.per ? ' ' + input.per : ''}${rateTxt ? ' at ' + rateTxt : ''}` : '= year by year'
  let fe = opt(spec, 'formulaBar', null)
  if (!Array.isArray(fe) || !fe.length) fe = [{ t: 0, text: d.formula || autoFormula }]
  fe = fe.map(e => (typeof e === 'string' ? { t: 0, text: e } : { t: +e.t || 0, text: String(e.text || '') })).filter(e => e.text)
  if (!fe.length) fe = [{ t: 0, text: autoFormula }]

  // ---------- the verdict stack (lookOpts.verdictStyle 'stack'): measured first, the sheet's budget stops above it ----------
  const LV = layer(ctx, 'gl-top')
  let vStack = null
  if (verdict && opt(spec, 'verdictStyle', 'card') === 'stack') {
    const parts = String(verdict.text).split('\n')
    const l1 = h('div', { class: 'gl-v1', html: mk(parts[0]) })
    const l2 = parts.length > 1 ? h('div', { class: 'gl-v2', html: mk(parts.slice(1).join(' ')) }) : null
    const chip = h('div', { class: 'ls-chip', 'data-deco': '', text: '≈' })
    const el = h('div', { class: 'gl-v' }, chip, l1, l2)
    LV.append(el)
    const maxW = (G.railX - G.left) - 116 - 34
    let p1 = 88
    setStyle(l1, { fontSize: p1 + 'px' })
    while (p1 > 56 && l1.scrollWidth > maxW + 0.5) { p1 -= 2; setStyle(l1, { fontSize: p1 + 'px' }) }
    let p2 = 44
    if (l2) {
      setStyle(l2, { fontSize: p2 + 'px' })
      while (p2 > 40 && l2.scrollWidth > maxW + 0.5) { p2 -= 2; setStyle(l2, { fontSize: p2 + 'px' }) }
      if (l2.scrollWidth > maxW + 0.5) setStyle(l2, { whiteSpace: 'normal', textWrapStyle: 'balance', width: maxW + 'px' })
    }
    if (l1.scrollWidth > maxW + 0.5) el.remove() // line 1 does not fit at 56 px: the kit's card instead
    else {
      const used = Math.ceil(Math.max(l1.scrollWidth, l2 ? l2.scrollWidth : 0))
      const cw = used + 116 + 34
      const ht = el.offsetHeight
      const x = Math.round(G.left + ((G.railX - G.left) - cw) / 2)
      const top = ht <= G.bandBottom - G.bandTop ? Math.round(G.bandTop + (G.bandBottom - G.bandTop - ht) / 2) : G.bandBottom - 2 - ht
      setStyle(el, { left: x + 'px', top: top + 'px', width: cw + 'px' })
      vStack = { el, l1, ht, top }
    }
  }

  // ---------- layout ----------
  const fH = footerHeight(spec.footer)
  const tipW = G.width - G.gutter - 24
  const tipFit = fitTips(marks.map(m => m.label), tipW)
  const tipPx = tipFit.px
  const slotFull = marks.length ? tipFit.slotH : 0
  const labelLines = Math.max(1, ...cols0.map(c => String(c.label || '').split('\n').length))
  const labelGuess = labelLines > 1 ? 116 : 76
  const bandBottom = Math.min(G.workBottom, vStack ? vStack.top - 16 : Infinity) - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const fbOf = strs => fitFormula(strs.filter(Boolean).map(glueOps), G.width).ht
  const estRow = (bottom, letters, frac, fbH, slot) => (bottom - G.cardTop - fbH - (letters ? G.lettersH : 0) - labelGuess - slot) / (N + frac)
  // a mark is a chip over the next row's empty cells, or a tooltip in a slot under its row when that slot fits;
  // otherwise its label is typed into the formula bar (the row still lights up)
  const markOpt = opt(spec, 'markStyle', 'auto')
  const markAt = m => Math.max(m.t, pre[m.row] ? 0 : landEnd(m.row)) + 0.08
  const chipAt = m => Math.max(m.t, pre[m.row] ? 0 : outT0(m.row)) + 0.1 // the chip: within 0.2 s of the landing
  const fe0 = fe
  const lOpt = opt(spec, 'letters', 'auto')
  const vOpt = opt(spec, 'verdict', 'auto')
  const capsWanted = caps
  const ls = { letterSpacing: '-0.01em' }
  const align = cols0.map((c, j) => c.align || (rows.every(r => !r[j] || isNumeric(r[j])) ? 'right' : 'left'))
  const L = layer(ctx, 'gl')
  ctx.stage.append(LV) // the verdict and captions sit above the sheet's layer
  // chip geometry and windows for a built sheet (null when a chip would cover anything on screen)
  const CHIP_PAD = 24
  const chipPlan = sh => {
    const rh = sh.rowH
    const ht = Math.max(Math.round(tipPx * 1.1 + 6), rh - 12)
    const out = []
    for (let i = 0; i < marks.length; i++) {
      const m = marks[i]
      if (tipFit.lines !== 1 || m.row >= N - 1) return null
      const w = Math.ceil(textW(mk(m.label), font(800, tipPx), { letterSpacing: '-0.01em' })) + 2 * CHIP_PAD + 2
      const x1 = Math.min(sh.cols[outC].x + sh.cols[outC].w - 12, 948)
      const x0 = x1 - w
      if (x0 < sh.cols[sc0].x + 6) return null // it would cover a column that is on screen from frame 1
      const yTop = sh.bodyTop + (m.row + 1) * rh + 7
      const yBot = yTop + ht
      // every row the chip covers must still be empty (unlanded) while it shows
      const covered = []
      for (let r = m.row + 1; r < N; r++) {
        const y0 = sh.bodyTop + r * rh, y1 = y0 + (r === last && hiLast ? rh * 1.5 : rh)
        if (y0 < yBot - 1 && y1 > yTop + 1) covered.push(r)
      }
      if (covered.some(r => pre[r])) return null
      const openAt = chipAt(m)
      const nextOpen = marks[i + 1] ? chipAt(marks[i + 1]) - 0.05 : Infinity
      const closeEnd = Math.min(...covered.map(r => rowT[r] - 0.02), nextOpen, vT, rowT[last] - 0.3 > openAt ? rowT[last] - 0.3 : Infinity)
      if (closeEnd - openAt < 0.9) return null
      const xc0 = sh.cols[outC].x, xc1 = xc0 + sh.cols[outC].w
      out.push({ x0, x1, w, yTop, ht, openAt, closeEnd, notchX: clamp((xc0 + xc1) / 2, x0 + 26, x1 - 26) })
    }
    return out
  }
  // Layout: build the sheet, measure it, and give way until it ends above its budget. With the band (captions or a
  // band verdict): the A B C row and 22 px padding go first, then rows go down to 46 px (the text is already at the
  // 40 px floor) and the summary row gives back its extra height, then marks are typed into the bar instead of
  // opening slots. Last, the band itself: captions off, the verdict retyped into the bar, the sheet down to y 1476.
  const build = (band, markMode, tier) => {
    const vMode = !verdict ? 'none' : band ? (vOpt === 'formula' ? 'formula' : 'band') : 'formula'
    const bottom = band ? bandBottom : fullBottom
    const minRowH = tier.minRowH ?? (band ? 52 : 48)
    let fe = fe0.slice()
    if (markMode === 'bar') marks.forEach(m => fe.push({ t: markAt(m), text: m.label, mark: true }))
    fe = fe.map(e => ({ ...e, text: glueOps(e.text) }))
    // a verdict typed into the bar has its own fit (Inter 800) and never sizes the bar
    if (vMode === 'formula') fe.push({ t: verdict.t, text: fitBarVerdict(verdict.text, G.width).text, verdict: true })
    fe.sort((a, b) => a.t - b.t || !!a.verdict - !!b.verdict)
    const slotH = markMode === 'tip' ? slotFull : 0
    const fbH = fitFormula(fe.filter(e => !e.verdict).map(e => e.text), G.width).ht
    // the A B C row is decoration: it goes first when rows get cramped; then the summary row gives back its extra
    let frac = hiLast && !tier.flat ? 0.5 : 0
    const letters = tier.letters === 'auto' ? estRow(bottom, true, frac, fbH, slotH) >= 64 : !!tier.letters
    while (frac > 0.001 && estRow(bottom, letters, frac, fbH, slotH) < 58) frac = Math.max(0, +(frac - 0.1).toFixed(2))
    // Column widths: sheet() sizes columns from `values`. A one-word label ("Year") cannot wrap, so when the width
    // allows it, a sizing-only row carries each label's longest word and no column comes out narrower than its
    // label. (Alignment is pinned from the real rows, so the sizing row cannot flip it.)
    const estFs = cellSizes(clamp(Math.floor(estRow(bottom, letters, frac, fbH, slotH)), minRowH, 102))
    const cellFont = j => (j === 0 ? font(800, estFs.input) : j === outC ? font(800, estFs.result) : font(700, estFs.mid))
    const longWord = j => String(cols0[j].label || '').split('\n')[0].split(/\s+/).reduce((a, w) => (w.length > a.length ? w : a), '') + (j === 0 || j === outC ? '' : '  ')
    const needEst = j => Math.max(40, ...rows.map(r => textW(esc(r[j]), cellFont(j), ls)), textW(esc(longWord(j)), cellFont(j), ls)) + 2 * (tier.pad ?? G.padX) + 4
    const sizeRow = cols0.reduce((a, _, j) => a + needEst(j), 0) <= G.width - G.gutter ? [cols0.map((_, j) => longWord(j))] : []
    L.replaceChildren()
    const sh = sheet(L, {
      columns: cols0.map((c, j) => ({
        label: c.label, kind: j === 0 ? 'input' : j === outC ? 'output' : 'mid',
        tone: j === outC ? emphTone : c.tone, align: align[j], units: rows.some(r => hasUnits(r[j])),
      })),
      // the mark slot is planned for but not drawn: the card grows while a tooltip is open
      values: [...rows, ...sizeRow], rows: N, reserve: slotH, grow: true, spare: frac, minRowH, tail: frac ? 0 : 16,
      bottom, pad: tier.pad, formula: { strings: fe.filter(e => !e.verdict).map(e => e.text), verdict: vMode === 'formula' ? verdict.text : null }, letters,
    })
    const chips = markMode === 'chip' ? chipPlan(sh) : null
    return { sh, fe, slotH, frac, vMode, markMode, band, chips, caps: band && capsWanted, fits: sh.maxBottom <= bottom + 1 && (markMode !== 'chip' || !!chips), bottom }
  }
  const tipOK = estRow(caps || (verdict && vOpt !== 'formula') ? bandBottom : fullBottom, false, 0, fbOf(fe0.map(e => e.text)), slotFull) >= 56
  const markModes = !marks.length ? ['none'] : ['bar', 'tip', 'chip'].includes(markOpt) ? [markOpt]
    : tipOK ? ['chip', 'tip', 'bar'] : ['chip', 'bar']
  const tiers = [
    { letters: lOpt },
    { letters: lOpt === true, pad: 12 },
    { letters: lOpt === true, pad: 12, minRowH: 46, flat: true },
  ]
  const plans = []
  // a silent ladder with an 'auto' verdict takes the band only while rows keep 50 px there (else the bar)
  const bandOK = caps || (verdict && (vOpt === 'band' || (vOpt === 'auto' && estRow(bandBottom, false, hiLast ? 0.3 : 0, fbOf(fe0.map(e => e.text)), 0) >= 50)))
  if (bandOK) for (const mm of markModes) for (const tier of tiers) plans.push([true, mm, tier])
  for (const mm of markModes) for (const tier of tiers) plans.push([false, mm, tier])
  let B = null
  for (const pl of plans) { B = build(...pl); if (B.fits) break }
  fitWarn('growth-ladder', B.sh.maxBottom + (fH ? G.gap + fH : 0), B.band ? (vStack && B.vMode === 'band' ? vStack.top - 16 : G.workBottom) : G.safeBottom - 4)
  if (capsWanted && !B.caps) console.warn('live-sheet growth-ladder: too many rows for captions; running silent')
  const { sh, slotH, frac, vMode, markMode } = B
  const chips = B.chips || []
  fe = B.fe
  caps = B.caps
  if (vStack && vMode !== 'band') { vStack.el.remove(); vStack = null }
  // a one-word label that still cannot fit its column (a dense 4-column card): trade the label cell's padding
  // for the word, rather than letting it clip
  sh.labelEls.forEach((el, j) => {
    const over = Math.max(0, ...[...el.children].map(p => p.scrollWidth - p.clientWidth))
    if (over > 0.5) setStyle(el, { paddingLeft: Math.max(4, Math.floor((sh.cols[j].w - Math.max(...[...el.children].map(p => p.scrollWidth))) / 2)) + 'px', paddingRight: '4px' })
  })
  const rowH = sh.rowH
  const extra = Math.round(frac * rowH)
  const lastH = rowH + extra
  const nRows = sh.rowEls.length // data rows + spare rows (slot + summary-row room)

  // the summary row: taller, bigger type that still fits its columns
  const fitPx = (str, want, j, weight) => {
    let px = Math.max(S.cellMin, want)
    const room = sh.cols[j].w - 2 * G.padX - 6
    // (2 px steps from an odd size must not step under the floor: 41 → 39 tripped the 40 px type floor)
    while (px > S.cellMin && textW(esc(str), font(weight, px), { letterSpacing: '-0.01em' }) > room) px = Math.max(S.cellMin, px - 2)
    return px
  }
  const lastPx = cols0.map((_, j) => {
    if (!extra) return null
    const base = j === 0 ? sh.fs.input : j === outC ? sh.fs.result : sh.fs.mid
    const want = Math.min(lastH - 16, Math.round(base * (j === outC ? 1.5 : 1.22)), j === outC ? 84 : 64)
    return fitPx(rows[last][j], want, j, j !== 0 && j !== outC ? 700 : 800)
  })
  if (extra && N) {
    sh.rowEls[last].classList.add('gl-last')
    setStyle(sh.rowEls[last], { height: lastH + 'px' })
    setStyle(sh.numEls[last], { height: lastH + 'px' })
    sh.cells[last].forEach((cl, j) => setStyle(cl.el, { height: lastH + 'px', fontSize: lastPx[j] + 'px' }))
  }

  // geometry (stage px), aware of the taller last row and of the slots the marks open
  const yAt = rf => sh.bodyTop + (rf <= last ? rf * rowH : last * rowH + (rf - last) * lastH)
  const colX0 = c => sh.cols[c].x, colX1 = c => sh.cols[c].x + sh.cols[c].w

  // ---------- data bars: put-in (grey) + growth (green), one scale for the whole column ----------
  // 'auto': only on the classic 3-column ladder (with a growth column of its own, the bars would repeat it)
  const barOpt = opt(spec, 'bars', false)
  const barOn = (barOpt === true || (barOpt === 'auto' && nC === 3)) && putC >= 0 && rows.every(r => isFinite(displayValue(r[outC])) && isFinite(displayValue(r[putC])))
  const vMax = barOn ? Math.max(...rows.map(r => displayValue(r[outC]))) : 0
  const bars = barOn && vMax > 0 ? rows.map((r, i) => {
    const put = h('i', { class: 'put' }), grow = h('i', { class: 'grow' })
    const inner = sh.cols[outC].w - 16
    const el = h('div', { class: 'gl-bar', style: { left: '8px', width: inner + 'px' } }, put, grow)
    sh.cells[i][outC].el.classList.add('gl-out')
    sh.cells[i][outC].el.prepend(el)
    const vw = displayValue(r[outC]), vp = displayValue(r[putC])
    const total = (inner * Math.max(0, vw)) / vMax
    const putW = Math.min(total, (inner * Math.max(0, vp)) / vMax)
    return { el, put, grow, total, putW }
  }) : null
  const setBar = (i, q, alpha) => {
    if (!bars) return
    const b = bars[i]
    if (q <= 0.001 || alpha <= 0.001 || b.total < 5) { // a sliver under 5 px reads as a stray gridline
      setStyle(b.el, { opacity: '0' }); setStyle(b.put, { width: '0px' }); setStyle(b.grow, { width: '0px', opacity: '0' })
      return
    }
    const w = b.total * clamp(q)
    setStyle(b.el, { opacity: String(+alpha.toFixed(3)) })
    setStyle(b.put, { width: Math.min(w, b.putW).toFixed(1) + 'px' })
    const gw = Math.max(0, w - b.putW)
    setStyle(b.put, { borderRadius: gw > 0.5 ? '6px 0 0 6px' : '6px' })
    setStyle(b.grow, { left: b.putW.toFixed(1) + 'px', width: gw.toFixed(1) + 'px', opacity: gw > 0.5 ? '1' : '0' })
  }

  // ---------- durations ----------
  const vfe = fe.find(e => e.verdict)
  const D0 = durationOf(spec, { beats: [...rows.map((_, i) => landEnd(i)), ...marks.map(m => m.t + 1.2), ...fe.filter(e => !e.verdict).map(e => e.t + 1.5)], hold: d.hold ?? 3, loop: loopOn, verdictEnd: vfe ? vfe.t + 0.16 + mkLen(vfe.text) / 26 : null })
  const D = spec.duration || D0
  const loopT0 = loopOn ? D - M.loopOut : Infinity

  // ---------- marks: when each tooltip / chip opens and closes ----------
  const markWin = marks.map((m, i) => {
    const land = pre[m.row] ? 0 : landEnd(m.row)
    if (markMode === 'chip') {
      const c = chips[i]
      return { openAt: c.openAt, closeAt: Math.min(c.closeEnd, loopT0), wipeAt: c.openAt - 0.1 } // tint and chip arrive together
    }
    const openAt = markAt(m)
    const next = marks[i + 1] ? marks[i + 1].t : Infinity
    // the summary row's moment is its own: a mark above it closes as it lands
    const lastIn = m.row < last && !pre[last] && rowT[last] > openAt ? rowT[last] - 0.3 : Infinity
    const closeAt = Math.min(next, lastIn, verdict ? verdict.t : Infinity, loopT0)
    return { openAt, closeAt, wipeAt: Math.max(m.t, land - 0.1) }
  })
  const wins = markWin.map(w => tipWindow(w.openAt, w.closeAt))
  // a chip: fades in (0.16 s, dropping 6 px, from 104%) and out (0.2 s, opacity only), ending at closeAt
  const chipOn = (i, t) => {
    const w = markWin[i]
    if (w.closeAt - w.openAt < 0.4) return { o: 0, q: 0 }
    const q = ease.out(prog(t, w.openAt, 0.16))
    return { o: q * (1 - ease.inOut(prog(t, w.closeAt - 0.2, 0.2))), q }
  }
  const openOf = (i, t) => wins[i].open(t)
  const shiftAt = (r, t) => {
    let dy = 0
    if (slotH) marks.forEach((m, i) => { if (r > m.row) dy += slotH * openOf(i, t) })
    return dy
  }
  const tipHTML = marks.map((m, i) => `<span style="color:${tipTone[m.tone] || C.text}">${tipFit.html[i]}</span>`)
  const tips = markMode === 'tip' ? marks.map((m, i) => tipStrip(sh, { px: tipPx, html: tipHTML[i], wrap: tipFit.wrap })) : []
  const tipBox = marks.map((m, i) => {
    const x0c = colX0(outC), x1c = colX1(outC)
    const wpx = tipFit.w[i]
    const x1 = Math.min(sh.x + sh.w - 12, Math.max(x1c - 10, sh.x + sh.gutter + 12 + wpx))
    const x0 = Math.max(sh.x + sh.gutter + 12, x1 - wpx)
    return { x0, x1, notchX: clamp((x0c + x1c) / 2, x0 + 34, x1 - 34) }
  })
  // chips: an overlay in the sheet's overlay layer (under the selection), never a slot
  const chipEls = markMode === 'chip' ? marks.map((m, i) => {
    const c = chips[i]
    const txt = h('div', { class: 'gl-chiptxt', html: `<span style="color:${tipTone[m.tone] || C.text}">${mk(m.label)}</span>`, style: { fontSize: tipPx + 'px' } })
    const el = h('div', { class: 'gl-chip', style: { left: c.x0 - sh.x + 'px', top: c.yTop - sh.bodyTop + 'px', width: c.w + 'px', height: c.ht + 'px' } }, txt)
    const notch = h('i', { class: 'gl-chipnotch', 'data-deco': '', style: { left: Math.round(c.notchX - 9 - sh.x) + 'px', top: Math.round(c.yTop - sh.bodyTop - 8) + 'px' } })
    sh.over.append(notch, el)
    return { el, notch }
  }) : []

  // ---------- selection: the newest row's landing cells, snapping (with an outward pop) ----------
  const newest = t => { let n = 0; for (let i = 0; i < N; i++) if (pre[i] || t >= rowT[i]) n = i; return n }
  const rangeRect = (r0, r1, c0, c1, t) => ({
    x0: colX0(c0), x1: colX1(c1),
    y0: yAt(r0) + shiftAt(Math.floor(r0), t),
    y1: yAt(r1) + shiftAt(Math.max(Math.floor(r0), Math.ceil(r1) - 1), t),
  })
  const preN = Math.max(1, pre.filter(Boolean).length)
  const K = [{ t: -Infinity, at: t => { const r = newest(t); return { rect: rangeRect(r, r + 1, sc0, sc1, t), since: pre[r] ? -Infinity : rowT[r], head: [r, r, sc0, sc1] } } }]
  const finalT = N && !pre[last] ? landEnd(last) + 0.1 : null
  if (finalT != null && hiLast) K.push({ t: finalT, at: t => ({ rect: rangeRect(last, last + 1, outC, outC, t), head: [last, last, outC, outC] }) })
  if (verdict && ansRow >= 0) K.push({ t: vT, at: t => ({ rect: rangeRect(ansRow, ansRow + 1, 0, nC - 1, t), head: [ansRow, ansRow, 0, nC - 1] }) })
  else if (verdict) K.push({ t: vT, at: t => ({ rect: rangeRect(0, N, outC, outC, t), head: [0, N - 1, outC, outC] }) })
  if (loopOn) K.push({ t: loopT0, at: t => ({ rect: rangeRect(preN - 1, preN, sc0, sc1, t), head: [preN - 1, preN - 1, sc0, sc1] }) })
  const selAt = t => {
    let k = 0
    for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
    const s = K[k].at(t)
    const since = k === 0 ? s.since : K[k].t
    const pop = Number.isFinite(since) && t >= since ? POP * (1 - ease.out(prog(t, since, POP_DUR))) : 0
    const r = s.rect
    return { rect: { x0: r.x0 - pop, y0: r.y0 - pop, x1: r.x1 + pop, y1: r.y1 + pop }, head: s.head, k }
  }

  // ---------- formula bar ----------
  // a line with a result swaps in whole at its t and types only the result as the row's output cell lands; a line
  // without one types in ~0.7 s; nothing ever erases to a bare caret first. A bar verdict erases and retypes.
  const fx = fe.map((e, i) => {
    const len = mkLen(e.text)
    const p = plain(e.text)
    const k = e.verdict || e.mark ? -1 : p.lastIndexOf(RES)
    const next = fe[i + 1] ? fe[i + 1].t : Infinity
    if (e.verdict) {
      const erase = i > 0 ? 0.16 : 0, start = e.t + erase
      const room = next - start - 0.8
      const cps = Math.max(26, isFinite(room) && room > 0.3 ? Math.max(M.cps, len / room) : M.cps)
      return { ...e, erase, start, len, from: 0, cps, end: start + len / cps }
    }
    const first = i === 0 && e.t <= 0
    const from = k > 0 ? graphemes(p.slice(0, k)).length : first ? wordCut(e.text, opt(spec, 'formulaAt0', 0.7)) : 0
    // a result types as its row's output cell lands (a counted last row: as the count lands, never ahead of it)
    const rowOf = rowT.findIndex(x => Math.abs(x - e.t) < 1e-6)
    const counted = k > 0 && rowOf === last && countOn
    const start = first ? e.t : counted ? outT0(last) + M.count - 0.22 : e.t + (k > 0 ? 0.1 : 0)
    const want = k > 0 ? (counted ? 0.24 : 0.3) : 0.7
    const room = next - start - 0.3
    const cps = Math.max(M.cps, (len - from) / want, isFinite(room) && room > 0.1 ? (len - from) / room : 0)
    return { ...e, erase: 0, start, len, from, cps, end: start + Math.max(0, len - from) / cps }
  })
  const cut = fx[0].t <= 0 ? fx[0].from : 0
  function formulaState(t) {
    if (t >= loopT0) {
      const cur = formulaState(loopT0 - 1e-4)
      const e1 = 0.22
      if (t < loopT0 + e1) {
        const n = Math.round(cur.n * (1 - prog(t, loopT0, e1)))
        return { html: typedMk(cur.str, cur.str === fe[0].text ? Math.max(cut, n) : n), caret: true }
      }
      if (cur.str === fe[0].text) return { html: typedMk(fe[0].text, cut), caret: true }
      return { html: typedMk(fe[0].text, Math.round(cut * prog(t, loopT0 + e1, 0.2))), caret: true }
    }
    let i = -1
    for (let k = 0; k < fx.length; k++) if (t >= fx[k].t || (k === 0 && fx[0].t <= 0)) i = k
    if (i < 0) return { html: '', caret: caretOn(t, false), str: '', n: 0 }
    const e = fx[i]
    if (i > 0 && e.erase && t < e.start) {
      const pe = fx[i - 1]
      const n0 = typedCount(e.t, pe.start, pe.text, { cps: pe.cps, from: pe.from })
      const n = Math.round(n0 * (1 - prog(t, e.t, e.erase)))
      return { html: typedMk(pe.text, n), caret: true, str: pe.text, n }
    }
    const n = typedCount(t, e.start, e.text, { cps: e.cps, from: e.from })
    return { html: typedMk(e.text, n), caret: caretOn(t, n < e.len), str: e.text, n, verdict: !!e.verdict }
  }
  const vf = fx.find(e => e.verdict)

  // ---------- captions: the kit's, drawn here so "about" stays with its number ----------
  let cap = null
  if (caps) {
    const holds = countOn ? [rows[last][outC], rows[last][outC].replace(/^≈\s*/, '')].map(text => ({ text, t: outT0(last) + M.count })) : []
    cap = captions(LV, spec, {}, holds)
    const capW = G.railX - G.left - 24
    const pxOf = html => { const w = textW(html, font(800, S.caption), { transform: 'uppercase' }); return w > capW ? Math.max(S.captionMin, Math.floor((S.caption * capW) / w)) : S.caption }
    const BIND = /^(.*\S)\s+(about|over|nearly|almost|roughly)$/i
    const ch = cap.chunks
    for (let k = 0; k + 1 < ch.length; k++) {
      const a = ch[k], b = ch[k + 1]
      if (Math.abs(a.t1 - b.t0) > 1e-6 || !/^[$≈\d]/.test(b.plain)) continue // same vo line, a number next
      const m = BIND.exec(a.html)
      const mp = BIND.exec(a.plain)
      if (!m || !mp || /[<>]/.test(m[2])) continue
      const bHTML = m[2] + ' ' + b.html
      const bPx = pxOf(bHTML)
      if (bPx < 58) continue // the number's chunk would have to shrink too far: leave it
      const share = (mp[2].length + 1) / (a.plain.length + 3)
      const cutT = a.t1 - (a.t1 - a.t0) * share
      a.html = m[1]; a.plain = mp[1]; a.px = pxOf(a.html); a.t1 = cutT
      b.html = bHTML; b.plain = mp[2].toUpperCase() + ' ' + b.plain; b.px = bPx
      b.t0 = Math.min(b.t0, cutT)
    }
    // a chunk naming the count still waits for it (re-applied after the move)
    for (const hd of holds) {
      const key = plain(hd.text).toUpperCase()
      ch.forEach((c, k) => {
        if (!key || !c.plain.includes(key) || c.t0 >= hd.t) return
        const t0 = Math.min(hd.t, c.t1 - 0.6)
        if (t0 <= c.t0) return
        if (ch[k - 1] && Math.abs(ch[k - 1].t1 - c.t0) < 1e-6) ch[k - 1].t1 = t0
        c.t0 = t0
      })
    }
  }

  // ---------- sound ----------
  fx.forEach((e, i) => { if (e.len > e.from) ctx.cue(i === 0 ? Math.max(0, e.start) : e.start, 'type', { dur: Math.max(0.15, (e.len - e.from) / e.cps) }) })
  rows.forEach((_, i) => {
    if (pre[i]) return
    if (i === last && countOn) { ctx.cue(outT0(i), 'roll', { dur: M.count }); ctx.cue(outT0(i) + M.count, 'pop') }
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  if (markMode === 'tip' || markMode === 'chip') marks.forEach((m, i) => { if (markWin[i].closeAt > markWin[i].openAt) ctx.cue(markWin[i].openAt + (markMode === 'tip' ? 0.12 : 0), 'reveal', { gain: markMode === 'chip' ? 0.35 : 0.5 }) })
  if (vf) ctx.cue(vf.end + 0.05, 'ding')
  if (vStack) ctx.cue(vT, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const sweepAt = i => (verdict && ansRow < 0 ? verdict.t + 0.18 + i * Math.min(0.06, 0.7 / Math.max(1, N)) : Infinity)
  const outAt = (r, t) => (!pre[r] && loopOn ? prog(t, loopT0 + 0.02 + ((N - 1 - r) / Math.max(1, N - 1)) * 0.14, 0.2) : 0)
  const loopFade = t => 1 - ease.out(prog(t, loopT0, 0.2))
  // the summary row's yellow; at the verdict it gives way to the answer row (one focal point)
  const hiAt = t => (hiLast && finalT != null
    ? ease.inOut(prog(t, landEnd(last) - 0.12, 0.36)) * loopFade(t) * (ansRow >= 0 && ansRow !== last ? 1 - ease.inOut(prog(t, vT, 0.3)) : 1)
    : 0)
  const ansAt = t => (ansRow >= 0 ? ease.inOut(prog(t, vT + 0.04, 0.3)) * loopFade(t) : 0)
  const ansBump = t => (ansRow >= 0 && t >= vT + 0.08 ? 1 + 0.09 * Math.sin(Math.PI * prog(t, vT + 0.08, 0.42)) : 1)
  const vOn = t => !!vStack && t >= vT && t < loopT0 + 0.3
  const crossAt = (r, t) => {
    if (markMode !== 'chip') return 0
    let a = 0
    marks.forEach((m, i) => { if (m.row === r && goodTone(m.tone) && !pre[r]) a = Math.max(a, chipOn(i, t).o) })
    return a
  }
  return {
    duration: D0,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      footerShift: t => shiftAt(N, t),
      captions: false,
      verdict: vMode === 'band' && !vStack ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar: the verdict takes it over in ink, heavier, as the ≈ chip pops
      const fs = formulaState(t)
      sh.fbar.set(fs.html, { caret: fs.caret })
      sh.fbar.verdictStyle(!!fs.verdict, vf ? prog(t, vf.t, 0.2) : 0)
      const chipP = vf ? prog(t, vf.start - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 && t < loopT0 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // rows: shift (tooltip slots), the summary row's extra height pushes the spare rows down
      for (let r = 0; r < nRows; r++) sh.rowShift(r, shiftAt(r, t) + (r > last ? extra : 0))
      sh.setGrow(shiftAt(N, t))
      const lastHi = hiAt(t)
      const ansHi = ansAt(t)
      const bump = ansBump(t)
      for (let r = 0; r < N; r++) {
        // row fill: the summary row's yellow, the answer row's yellow, or an open mark's tint (wiping in from the left)
        let fillC = C.rowHi, a = 0, wipe = 0
        if (r === last && lastHi > 0) { a = lastHi; wipe = 1 }
        if (r === ansRow && ansHi > 0) { a = Math.max(a, ansHi); wipe = Math.max(wipe, ease.inOut(prog(t, vT + 0.04, 0.3))) }
        marks.forEach((m, i) => {
          if (m.row !== r) return
          const w = markWin[i]
          const on = markMode === 'chip' ? 1 - ease.inOut(prog(t, Math.min(w.closeAt, loopT0) - 0.2, 0.2)) : 1 - ease.out(prog(t, Math.min(w.closeAt, loopT0), 0.2))
          const wp = ease.inOut(prog(t, w.wipeAt + 0.04, 0.3))
          if (on * wp > a * wipe) { a = on; wipe = wp; fillC = m.tone === 'bad' ? BAD_TINT : C.rowHi }
        })
        if (a <= 0.001 || wipe <= 0.001) setStyle(sh.rowEls[r], { backgroundColor: C.sheet, backgroundImage: 'none' })
        else if (wipe >= 1) setStyle(sh.rowEls[r], { backgroundColor: rgba(fillC, a), backgroundImage: 'none' })
        else {
          const x = (wipe * 100).toFixed(2)
          setStyle(sh.rowEls[r], { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(fillC, a)} ${x}%, ${C.sheet} ${x}%)` })
        }
        const lit = a * wipe > 0.5

        const out = outAt(r, t)
        // a good mark turns its year cell yellow as its chip appears (the crossing) and leaves it yellow (the
        // milestone stays findable); a slot tooltip does it once it has closed. The answer row's too, at the verdict.
        let keyFill = 0
        marks.forEach((m, i) => {
          if (m.row !== r || !goodTone(m.tone)) return
          const k0 = markMode === 'chip' ? markWin[i].openAt : markWin[i].closeAt
          keyFill = Math.max(keyFill, ease.inOut(prog(t, k0, markMode === 'chip' ? 0.16 : 0.3)) * loopFade(t))
        })
        if (r === ansRow) keyFill = Math.max(keyFill, ansHi)
        const rowBump = r === ansRow ? bump : 1
        for (let c = 0; c < nC; c++) {
          const val = rows[r][c]
          const isOut = c === outC
          const fillKey = c === 0 && keyFill > 0.001 ? rgba(C.accent, keyFill) : undefined
          if (preCol(c)) { sh.setCell(r, c, { text: val, fill: fillKey, scale: rowBump }); continue }
          const t0 = rowT[r] + order(c) * 0.08
          let text = val, p = pre[r] ? 1 : prog(t, t0, M.drop), scale = rowBump, q = p
          if (isOut && r === last && countOn) {
            const k = prog(t, t0, M.count)
            text = countText(val, ease.out(k))
            p = prog(t, t0, 0.16)
            q = ease.out(k)
            const pp = prog(t, t0 + M.count - 0.02, 0.24)
            scale = pp > 0 && pp < 1 ? 1 + 0.1 * (1 - ease.out(pp)) : rowBump // settles from 110%, never under 100%
          } else if (isOut) q = pre[r] ? 1 : ease.out(prog(t, t0, 0.45))
          // the crossing: a good mark's output cell turns into the kit's goal cell (ink on yellow) while its chip shows
          const cross = isOut ? crossAt(r, t) : 0
          const flash = pre[r] ? 0 : Math.max(flashAlpha(t, t0 + 0.06), isOut ? flashAlpha(t, sweepAt(r), 0.32) : 0)
          sh.setCell(r, c, {
            text, p, out, flash: lit || cross > 0.001 ? 0 : flash, scale,
            color: isOut ? (cross > 0.001 ? C.ink : emphColor) : undefined,
            fill: fillKey || (cross > 0.001 ? rgba(C.accent, cross) : undefined) || (isOut && r === last && emphFill !== 'transparent' && p >= 1 && out < 1 ? emphFill : undefined),
          })
          // the bar gives way to a row highlight (it would muddy the yellow)
          if (isOut) setBar(r, p > 0 ? q : 0, Math.min(clamp(p * 4), 1 - out) * (1 - a * wipe))
        }
      }

      // mark tooltips (slot mode): the pill opens out of its notch, and fades out (no width clip on the way out)
      if (markMode === 'tip') marks.forEach((m, i) => {
        const w = markWin[i]
        const fadeOut = 1 - ease.inOut(prog(t, w.closeAt - 0.22, 0.2))
        const rv = t < w.closeAt - 0.22 ? wins[i].reveal(t) : wins[i].reveal(w.closeAt - 0.2201)
        tips[i].set({ ...tipBox[i], y: yAt(m.row + 1) + shiftAt(m.row, t), ht: slotH, open: wins[i].open(t), reveal: rv })
        if (fadeOut < 1) { setStyle(tips[i].el, { opacity: fadeOut.toFixed(3) }); setStyle(tips[i].notch, { opacity: fadeOut.toFixed(3) }) }
      })
      // mark chips (overlay mode): opacity in and out, a 6 px drop and a 104% settle on the way in
      let chipShowing = false
      chipEls.forEach((ce, i) => {
        const { o, q } = chipOn(i, t)
        if (o <= 0.001) { setStyle(ce.el, { opacity: '0', transform: 'none' }); setStyle(ce.notch, { opacity: '0' }); return }
        chipShowing = true
        const dy = Math.round(-6 * (1 - q)), sc = 1 + 0.04 * (1 - q)
        setStyle(ce.el, { opacity: o.toFixed(3), transform: dy || sc > 1.0005 ? `translateY(${dy}px) scale(${sc.toFixed(4)})` : 'none' })
        setStyle(ce.notch, { opacity: o.toFixed(3) })
      })

      // selection: the newest row (snaps with a pop); the fill handle steps aside while a chip hangs under it
      const sl = selAt(t)
      sh.select(sl.rect, { handle: (sl.k === 0 || K[sl.k].t === loopT0) && !chipShowing })
      sh.headSel(sl.head[0], sl.head[1], sl.head[2], sl.head[3])

      // the verdict stack: pops in from 104% with its marker wiping in; fades in the loop clear
      if (vStack) {
        if (!vOn(t)) { setStyle(vStack.el, { opacity: '0', transform: 'none' }); setStyle(vStack.l1, { '--hl': '0.0%' }) }
        else {
          const p = prog(t, vT, 0.3)
          const out = loopOn ? ease.inOut(prog(t, loopT0, 0.3)) : 0
          setStyle(vStack.el, { opacity: (clamp(p * 3) * (1 - out)).toFixed(3), transform: p < 1 ? `scale(${(1 + 0.04 * (1 - ease.out(p))).toFixed(4)})` : 'none' })
          setStyle(vStack.l1, { '--hl': (ease.inOut(prog(t, vT + 0.14, 0.32)) * 100).toFixed(1) + '%' })
        }
      }
      if (cap) cap.seek(t, { hidden: vOn(t) || (vMode === 'band' && !vStack && verdict && t >= vT && t < loopT0 + 0.3) })
    },
  }
}
