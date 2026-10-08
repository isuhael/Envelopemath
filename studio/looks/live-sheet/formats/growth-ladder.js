// live-sheet · growth-ladder (P2): one small regular amount, one row per year (or per 5 years), the biggest
// number last. FinCalC's ladder, as a designed sheet: put-in beside worth, so the growth visibly overtakes
// what went in.
//
// The sheet, top to bottom:
//   formula bar   the working (lookOpts.formulaBar [{ t, text }], else data.formula, else
//                 "= <amount> <per> at <rate>"), already mid-typing at frame 1, retyped at each entry
//   A B C         column letters (decoration; dropped when rows would get under 64 px)
//   row 1         labels: Year (mint input) · You put in (grey) · Worth (peach output); "\n" starts the grey
//                 sub-label (lookOpts.subLabels builds them from data.input)
//   rows          one per year. Frame 1 shows every year in column A (each viewer finds their horizon) with
//                 empty cells beside them, and rows with t <= 0 already filled (a dollar answer at 0.0 s).
//                 unmask 'rows' hides the years too (FinCalC's literal unmask); inputsAtStart shows the
//                 put-in column from frame 1 as well.
//   last row      a taller summary row: its worth counts up and lands exactly on its display string, the row
//                 wipes yellow (highlightLast) and the selection springs onto the final cell.
// Optional (lookOpts.bars: true): every worth cell carries a pale two-tone data bar behind its number, all on one
// scale (grey = what you put in, green = the growth). Off by default: the numbers carry the ladder.
// Rows land on rowT: the selection is a range whose fill handle drags down as each row lands; values snap in
// (116% → 100%) with a yellow flash and a tick, left to right 0.08 s apart. A mark (lookOpts.marks
// [{ t, row, tone, label }]) tints its row (yellow for good/goal, rose for bad), opens a slot under it and pops a
// dark tooltip wipes out of its notch (the card grows by the slot while it is open); when the sheet has no room
// for that slot, the label is typed into the formula bar instead. A good mark leaves its year cell yellow once it
// closes, so the milestone stays findable. The verdict is a card in the caption band (the sheet stops above it
// unless rows would fall under 50 px) or is retyped into the formula bar (Inter 800) while the worth column flashes
// top to bottom. A caption that names the counted total waits for the count to land. The last 0.5 s clear back to
// frame 1 so the short loops.
// Layout is automatic: the A B C row goes first when rows get under 64 px, then the summary row's extra height;
// dense silent cards may go down to 48 px rows (text stays at 40 px). The sheet is built and measured: when it does
// not end above its budget it tries 12 px padding, then 46 px rows, then marks in the bar, and last runs silent
// (captions off, the verdict in the bar) down to y 1476.
//
// lookOpts: loop (true) · countUp (true) · letters ('auto' | true | false) · verdict ('auto' | 'band' | 'formula')
//           · emphTone ('good') · formulaAt0 (0.7) · formulaBar ([{ t, text }]) · marks ([{ t, row, tone, label }])
//           · unmask ('values' | 'rows') · inputsAtStart (false) · bars (false; true or 'auto': 3-column ladders) · subLabels (false)
//           · markStyle ('auto' | 'tip' | 'bar')
import {
  h, setStyle, clamp, prog, ease, C, G, M, S,
  sheet, tipStrip, fitTips, tipWindow, mk, mkLen, typedMk, typedCount, wordCut, caretOn, countText, displayValue,
  popScale, flashAlpha, lerpRect, rgba, durationOf, hasCaptions, opt, layer, footerHeight, fitFormula, textW, font,
  toneColor, toneFill, cellSizes, isNumeric, hasUnits, fitBarVerdict, springRect, fitWarn,
} from '../lib.js'

export const css = `
.gl-out .ls-v { position: relative; z-index: 1; }
.gl-bar { position: absolute; top: 9px; bottom: 9px; pointer-events: none; }
.gl-bar i { position: absolute; top: 0; bottom: 0; left: 0; width: 0; mix-blend-mode: multiply; }
.gl-bar i.put { background: #E7EAF0; border-radius: 6px 0 0 6px; }
.gl-bar i.grow { background: #CDF3DF; border-radius: 0 6px 6px 0; }
.gl-last .ls-cell { border-top: 3px solid #D0D5DD; }
`

const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
// keep an operator glued to the token after it, so a wrapped line never ends on a dangling "≈" or "×"
const glueOps = str => String(str).replace(/(^|\s)([=≈×÷→+−<>-]) /g, '$1$2 ')
const BAD_TINT = '#FEE4E2' // a rose row tint for a "bad" mark (green and ink text stay ≥ 3.8:1 on it)
const tipTone = { good: C.goodDark, bad: C.badDark }

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
  const preCol = c => !unmaskRows && (c === 0 || (inputsAtStart && c !== outC))
  const landCols = cols0.map((_, c) => c).filter(c => !preCol(c))
  const sc0 = Math.min(...landCols), sc1 = Math.max(...landCols)
  const order = c => landCols.indexOf(c) // left-to-right landing order

  // ---------- timing ----------
  const rowsT = d.rowsT ?? 0, every = d.rowEvery ?? 1.2
  const rowT = rows.map((_, i) => (d.rowT && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every))
  const pre = rowT.map(t => t <= 0)
  const verdict = spec.verdict && spec.verdict.text ? spec.verdict : null
  const last = N - 1
  const countOn = opt(spec, 'countUp', true) && N > 0 && !pre[last] && isFinite(displayValue(rows[last][outC]))
  const outT0 = r => rowT[r] + order(outC) * 0.08 // when the worth cell of row r lands
  const landEnd = r => outT0(r) + (r === last && countOn ? M.count : M.drop)

  const marks = (d.marks || opt(spec, 'marks', []) || [])
    .filter(m => m && Number.isFinite(+m.row) && m.row >= 0 && m.row < N && m.label)
    .map(m => ({ ...m, row: +m.row, t: Number.isFinite(+m.t) ? +m.t : rowT[m.row] }))
    .sort((a, b) => a.t - b.t)

  // ---------- formula bar entries ----------
  const rateTxt = String(input.rate || '').replace(/^at\s+/i, '')
  const autoFormula = input.amount ? `= ${input.amount}${input.per ? ' ' + input.per : ''}${rateTxt ? ' at ' + rateTxt : ''}` : '= year by year'
  let fe = opt(spec, 'formulaBar', null)
  if (!Array.isArray(fe) || !fe.length) fe = [{ t: 0, text: d.formula || autoFormula }]
  fe = fe.map(e => (typeof e === 'string' ? { t: 0, text: e } : { t: +e.t || 0, text: String(e.text || '') })).filter(e => e.text)
  if (!fe.length) fe = [{ t: 0, text: autoFormula }]

  // ---------- layout ----------
  const fH = footerHeight(spec.footer)
  const tipW = G.width - G.gutter - 24
  const tipFit = fitTips(marks.map(m => m.label), tipW)
  const tipPx = tipFit.px
  const slotFull = marks.length ? tipFit.slotH : 0
  const labelLines = Math.max(1, ...cols0.map(c => String(c.label || '').split('\n').length))
  const labelGuess = labelLines > 1 ? 116 : 76
  const bandBottom = G.workBottom - (fH ? fH + G.gap : 0)
  const fullBottom = G.safeBottom - 4 - (fH ? fH + G.gap : 0)
  const fbOf = strs => fitFormula(strs.filter(Boolean).map(glueOps), G.width).ht
  const estRow = (bottom, letters, frac, fbH, slot) => (bottom - G.cardTop - fbH - (letters ? G.lettersH : 0) - labelGuess - slot) / (N + frac)
  // a mark is a tooltip in a slot under its row when that slot fits; otherwise its label is typed into the
  // formula bar (the row still lights up)
  const markOpt = opt(spec, 'markStyle', 'auto')
  const markAt = m => Math.max(m.t, pre[m.row] ? 0 : landEnd(m.row)) + 0.08
  const fe0 = fe
  const lOpt = opt(spec, 'letters', 'auto')
  const vOpt = opt(spec, 'verdict', 'auto')
  const capsWanted = caps
  const ls = { letterSpacing: '-0.01em' }
  const align = cols0.map((c, j) => c.align || (rows.every(r => !r[j] || isNumeric(r[j])) ? 'right' : 'left'))
  const L = layer(ctx, 'gl')
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
    const longWord = j => String(cols0[j].label || '').split('\n')[0].split(/\s+/).reduce((a, w) => (w.length > a.length ? w : a), '') + (j === 0 || j === outC ? '' : '  ')
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
    return { sh, fe, slotH, frac, vMode, markMode, band, caps: band && capsWanted, fits: sh.maxBottom <= bottom + 1, bottom }
  }
  const markModes = !marks.length ? ['none'] : markOpt === 'bar' || markOpt === 'tip' ? [markOpt]
    : estRow(caps || (verdict && vOpt !== 'formula') ? bandBottom : fullBottom, false, 0, fbOf(fe0.map(e => e.text)), slotFull) >= 56 ? ['tip', 'bar'] : ['bar']
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
  fitWarn('growth-ladder', B.sh.maxBottom + (fH ? G.gap + fH : 0), B.band ? G.workBottom : G.safeBottom - 4)
  if (capsWanted && !B.caps) console.warn('live-sheet growth-ladder: too many rows for captions; running silent')
  const { sh, slotH, frac, vMode, markMode } = B
  fe = B.fe
  caps = B.caps
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
    while (px > S.cellMin && textW(esc(str), font(weight, px), { letterSpacing: '-0.01em' }) > room) px -= 2
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

  // ---------- marks: when each tooltip opens / closes ----------
  const markWin = marks.map((m, i) => {
    const land = pre[m.row] ? 0 : landEnd(m.row)
    const openAt = markAt(m)
    const next = marks[i + 1] ? marks[i + 1].t : Infinity
    // the summary row's moment is its own: a mark above it closes as it lands
    const lastIn = m.row < last && !pre[last] && rowT[last] > openAt ? rowT[last] - 0.3 : Infinity
    const closeAt = Math.min(next, lastIn, verdict ? verdict.t : Infinity, loopT0)
    return { openAt, closeAt, wipeAt: Math.max(m.t, land - 0.1) }
  })
  const wins = markWin.map(w => tipWindow(w.openAt, w.closeAt))
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

  // ---------- selection keyframes ----------
  const landStep = (t, i) => (pre[i] ? 1 : ease.out(prog(t, rowT[i] - 0.07, 0.16)))
  const fillRows = t => { let b = 0; for (let i = 0; i < N; i++) b += landStep(t, i); return Math.max(1, b) }
  const rangeRect = (r0, r1, c0, c1, t) => ({
    x0: colX0(c0), x1: colX1(c1),
    y0: yAt(r0) + shiftAt(Math.floor(r0), t),
    y1: yAt(r1) + shiftAt(Math.max(Math.floor(r0), Math.ceil(r1) - 1), t),
  })
  const K = [{ t: -Infinity, rect: t => rangeRect(0, fillRows(t), sc0, sc1, t), head: t => [0, Math.max(0, Math.ceil(fillRows(t) - 0.02) - 1), sc0, sc1] }]
  const finalT = N && !pre[last] ? landEnd(last) + 0.1 : null
  if (finalT != null && hiLast) K.push({ t: finalT, dur: M.pick, spring: 1.6, rect: t => rangeRect(last, last + 1, outC, outC, t), head: () => [last, last, outC, outC] })
  if (verdict) K.push({ t: verdict.t, dur: 0.4, e: ease.inOut, rect: t => rangeRect(0, N, outC, outC, t), head: () => [0, N - 1, outC, outC] })
  if (loopOn) K.push({ t: loopT0, dur: 0.34, e: ease.inOut, rect: t => rangeRect(0, Math.max(1, pre.filter(Boolean).length), sc0, sc1, t), head: () => [0, Math.max(0, pre.filter(Boolean).length - 1), sc0, sc1] })
  const rectAt = (k, t) => {
    if (k === 0) return K[0].rect(t)
    const a = rectAt(k - 1, t), b = K[k].rect(t), p = prog(t, K[k].t, K[k].dur)
    // a spring collapsing the range onto the final cell eases in without overshoot (no edge strikes the total)
    return K[k].spring ? springRect(a, b, p, K[k].spring) : lerpRect(a, b, K[k].e(p))
  }

  // ---------- formula bar ----------
  const cut = fe[0].t <= 0 ? wordCut(fe[0].text, opt(spec, 'formulaAt0', 0.7)) : 0
  const fx = fe.map((e, i) => {
    const erase = i > 0 ? 0.16 : 0
    const start = e.t + erase
    const len = mkLen(e.text)
    const from = i === 0 ? cut : 0
    const next = fe[i + 1] ? fe[i + 1].t : Infinity
    const room = next - start - 0.8
    const cps = isFinite(room) && room > 0.3 ? Math.max(M.cps, (len - from) / room) : M.cps
    return { ...e, erase, start, len, from, cps: e.verdict ? Math.max(26, cps) : cps, end: start + Math.max(0, len - from) / cps }
  })
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
    if (i > 0 && t < e.start) {
      const pe = fx[i - 1]
      const n0 = typedCount(e.t, pe.start, pe.text, { cps: pe.cps, from: pe.from })
      const n = Math.round(n0 * (1 - prog(t, e.t, e.erase)))
      return { html: typedMk(pe.text, n), caret: true, str: pe.text, n }
    }
    const n = typedCount(t, e.start, e.text, { cps: e.cps, from: e.from })
    return { html: typedMk(e.text, n), caret: caretOn(t, n < e.len), str: e.text, n, verdict: !!e.verdict }
  }
  const vf = fx.find(e => e.verdict)

  // ---------- sound ----------
  fx.forEach((e, i) => { if (e.len > e.from) ctx.cue(i === 0 ? Math.max(0, e.start) : e.start, 'type', { dur: Math.max(0.15, (e.len - e.from) / e.cps) }) })
  rows.forEach((_, i) => {
    if (pre[i]) return
    if (i === last && countOn) { ctx.cue(outT0(i), 'roll', { dur: M.count }); ctx.cue(outT0(i) + M.count, 'pop') }
    else ctx.cue(rowT[i], 'tick', { gain: 0.6 })
  })
  if (markMode === 'tip') marks.forEach((m, i) => { if (markWin[i].closeAt > markWin[i].openAt) ctx.cue(markWin[i].openAt + 0.12, 'reveal', { gain: 0.5 }) })
  if (vf) ctx.cue(vf.end + 0.05, 'ding')
  if (loopOn) ctx.cue(loopT0, 'swipe', { gain: 0.5 })

  // ---------- frame ----------
  const sweepAt = i => (verdict ? verdict.t + 0.18 + i * Math.min(0.06, 0.7 / Math.max(1, N)) : Infinity)
  const outAt = (r, t) => (!pre[r] && loopOn ? prog(t, loopT0 + 0.02 + ((N - 1 - r) / Math.max(1, N - 1)) * 0.14, 0.2) : 0)
  const hiAt = t => (hiLast && finalT != null ? ease.inOut(prog(t, landEnd(last) - 0.12, 0.36)) * (1 - ease.out(prog(t, loopT0, 0.2))) : 0)
  return {
    duration: D0,
    chrome: {
      footer: { top: sh.bottom + G.gap },
      footerShift: t => shiftAt(N, t),
      captions: caps,
      captionHolds: countOn ? [{ text: rows[last][outC], t: outT0(last) + M.count }] : [],
      verdict: vMode === 'band' ? 'band' : 'self',
      loop: loopOn ? { t0: loopT0, dur: 0.3 } : null,
    },
    seek(t) {
      // formula bar: the verdict takes it over in ink, heavier, as the ≈ chip pops
      const fs = formulaState(t)
      sh.fbar.set(fs.html, { caret: fs.caret })
      sh.fbar.verdictStyle(!!fs.verdict, vf ? prog(t, vf.t, 0.2) : 0)
      const chipP = vf ? prog(t, vf.start - 0.1, 0.34) : 0
      setStyle(sh.fbar.chip, { transform: `translateY(-50%) scale(${chipP > 0 && chipP < 1 && t < loopT0 ? popScale(chipP, 1.3).toFixed(4) : 1})` })

      // rows: shift (mark slots), the summary row's extra height pushes the spare rows down
      for (let r = 0; r < nRows; r++) sh.rowShift(r, shiftAt(r, t) + (r > last ? extra : 0))
      sh.setGrow(shiftAt(N, t))
      const lastHi = hiAt(t)
      for (let r = 0; r < N; r++) {
        // row fill: the summary row's yellow, or an open mark's tint (wiping in from the left)
        let fillC = C.rowHi, a = 0, wipe = 0
        if (r === last && lastHi > 0) { a = lastHi; wipe = 1 }
        marks.forEach((m, i) => {
          if (m.row !== r) return
          const w = markWin[i]
          const on = 1 - ease.out(prog(t, Math.min(w.closeAt, loopT0), 0.2))
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
        // a good mark leaves its year cell yellow once its tooltip has closed (the milestone stays findable)
        let keyFill = 0
        marks.forEach((m, i) => {
          if (m.row !== r || (m.tone !== 'good' && m.tone !== 'goal')) return
          keyFill = Math.max(keyFill, ease.inOut(prog(t, markWin[i].closeAt, 0.3)) * (1 - ease.out(prog(t, loopT0, 0.2))))
        })
        for (let c = 0; c < nC; c++) {
          const val = rows[r][c]
          const isOut = c === outC
          const fillKey = c === 0 && keyFill > 0.001 ? rgba(C.accent, keyFill) : undefined
          if (preCol(c)) { sh.setCell(r, c, { text: val, fill: fillKey }); continue }
          const t0 = rowT[r] + order(c) * 0.08
          let text = val, p = pre[r] ? 1 : prog(t, t0, M.drop), scale = 1, q = p
          if (isOut && r === last && countOn) {
            const k = prog(t, t0, M.count)
            text = countText(val, ease.out(k))
            p = prog(t, t0, 0.16)
            q = ease.out(k)
            const pp = prog(t, t0 + M.count - 0.02, 0.24)
            scale = pp > 0 && pp < 1 ? 1 + 0.1 * (1 - ease.out(pp)) : 1 // settles from 110%, never under 100%
          } else if (isOut) q = pre[r] ? 1 : ease.out(prog(t, t0, 0.45))
          const flash = pre[r] ? 0 : Math.max(flashAlpha(t, t0 + 0.06), isOut ? flashAlpha(t, sweepAt(r), 0.32) : 0)
          sh.setCell(r, c, {
            text, p, out, flash: lit ? 0 : flash, scale,
            color: isOut ? emphColor : undefined,
            fill: fillKey || (isOut && r === last && emphFill !== 'transparent' && p >= 1 && out < 1 ? emphFill : undefined),
          })
          // the bar gives way to a row highlight (it would muddy the yellow)
          if (isOut) setBar(r, p > 0 ? q : 0, Math.min(clamp(p * 4), 1 - out) * (1 - a * wipe))
        }
      }

      // mark tooltips
      if (markMode === 'tip') marks.forEach((m, i) => {
        tips[i].set({ ...tipBox[i], y: yAt(m.row + 1) + shiftAt(m.row, t), ht: slotH, open: wins[i].open(t), reveal: wins[i].reveal(t) })
      })

      // selection
      let k = 0
      for (let i = 1; i < K.length; i++) if (t >= K[i].t) k = i
      sh.select(rectAt(k, t), { handle: k === 0 || K[k].t === loopT0 })
      const hd = K[k].head(t)
      sh.headSel(hd[0], hd[1], hd[2], hd[3])
    },
  }
}
