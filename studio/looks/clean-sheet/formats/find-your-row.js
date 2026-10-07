// find-your-row — the find-your-row lookup table (P7) on the Clean Sheet.
//
// A typeset booktabs table on the page. Column labels in grey caps (a formula sub-label such as "÷ 2,080" in grey
// mono under its label; the emphasised column's label in ink). Row keys and the emphasised values in Archivo Black,
// the working columns in a lighter Inter Tight, the emphasised column on the green highlighter.
//
// Frame 1 already shows the head and EVERY row key, so the viewer can find their row at once (Gage's 1.15M table
// opens the same way); the value cells are empty (rows with t <= 0 are pre-filled). The values then land in the
// rows top to bottom, each whole value popping into place (never a half-typed figure), a beat apart per column.
// The emphasised column fills one highlighter band that grows down as its rows land: the newest cell is the loud
// one (its own full-tint box), the band behind the earlier ones stays pale, so one bright cell runs down an even
// column. A pick swipes the yellow highlighter across its row (the emphasised cell turns full where the two
// highlighters cross) and writes its label on the legend line under the table: [row key on yellow] label (fitted:
// 46 -> 40 px, two balanced lines, and without the key chip only when the label still does not fit). Several
// picks each keep their own legend line when the page has room (stack); on one shared line an earlier pick's band
// leaves with its label, so no tint is ever unexplained. In right-aligned columns every "≈" sits in one vertical
// line (lib alignApprox). The rough
// formula is a grey mono footnote under the table. With no picks the whole column comes back to full at the end
// (the cheat-sheet frame). The finished table holds, then (lookOpts.loop, default on) the values clear back to
// the frame-1 state so the short loops.
//
// Layout engine (measured with the real fonts at mount): the table fills the work area at the largest row pitch
// that fits. It tries, in order: formula and legend each on its own line; formula sub-labels dropped from the
// head (only those the footnote or the footer already carries: "÷ 2,080"; any other is the column's only working
// and stays, the head taking a third line); one shared line (the formula, which the pick label replaces from the first
// pick); a dense 40 px pitch; and only then drops content (the formula first). Head labels, cells, the footnote
// and the legend never go below 40 px (labels wrap to two lines instead; the footnote takes two lines).
//
// lookOpts: loop (true) · legend (true; false hides pick labels) · formula (true; false hides the footnote).
// columns[j].tone sets the emphasised column's highlighter (good green by default, bad coral, goal blue, neutral sand).
import { h, css as style, prog, ease, clamp, lerp, plain } from '../../../runtime/core.js'
import { F, SIZE, GRID, MOTION, md, hlBox, toneColor, fadeUp, fade, landing, durationOf, fitMarkup, alignApprox } from '../lib.js'

export const css = `
.fyr > * { position: absolute; }
.fyr-mask { background: #FAF8F3; border-radius: 6px; }
.fyr-table > * { position: absolute; }
.fyr .cs-th { top: 12px; bottom: auto; white-space: nowrap; line-height: 1; }
.fyr-th1 { display: block; font-family: 'Inter Tight', 'Inter Full', sans-serif; font-weight: 700; line-height: 1.1;
  text-transform: uppercase; letter-spacing: .02em; }
.fyr-th2 { display: block; font-family: 'IBM Plex Mono', 'Inter Full', monospace; font-weight: 500; line-height: 1.15;
  letter-spacing: -.02em; color: #6B7280; margin-top: 2px; }
.fyr-th2.cont { font-family: 'Inter Tight', 'Inter Full', sans-serif; font-weight: 700; text-transform: uppercase;
  letter-spacing: .02em; margin-top: 0; line-height: 1.1; color: inherit; }
.fyr .cs-th em { font-style: normal; color: #15171C; }
.fyr .cs-tr-band { top: var(--inset, 6px); bottom: var(--inset, 6px); left: -14px; right: -14px; }
.fyr .cs-td .cs-hl { color: #15171C; }
.fyr .cs-td.plain .cs-hl { color: #3B404C; }
.fyr .cs-td .cs-hl-txt { padding-top: .04em; }
.fyr-colband { position: absolute; border-radius: 10px; opacity: 0; }
.fyr-formula { white-space: nowrap; font-family: 'IBM Plex Mono', 'Inter Full', monospace; font-weight: 500;
  color: #6B7280; line-height: 1.2; letter-spacing: -.015em; }
.fyr-formula.two { white-space: normal; text-wrap: balance; }
.fyr-legend { display: flex; align-items: center; gap: 18px; white-space: nowrap; }
.fyr-legend-txt { font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 700; color: #15171C; line-height: 1.1;
  letter-spacing: -.005em; white-space: nowrap; }
.fyr-legend-txt em { font-style: normal; color: #1D4FC4; }
.fyr-legend-txt u.mark2 { text-decoration: none; color: #B42318; }
`

const PAD = 12                // cell inset from the column edge: columns sit >= 24 px apart
const HEAD = { px: 40, sub: 40, min: 40 }
const CELL = { max: 56, min: 40 }
// head sub-labels: "÷ 2,080" is pure working (grey mono; may be dropped when the footnote formula carries it),
// "$1 trillion" / "30% of gross" is a figure (grey mono, always kept), anything else continues the label (caps)
const OP = /^[÷×*\/+−\-=≈]/
const NUM = /^[$%\d]/
const GAP_T = 20              // table -> first line under it
const GAP_L = 12              // between the lines under the table
const n3 = v => (Math.round(v * 1000) / 1000).toString()

export default function findYourRow(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const columns = (d.columns || []).slice(0, 4).map(c => (typeof c === 'string' ? { label: c } : c || {}))
  const NC = Math.max(1, columns.length)
  const rows = (d.rows || []).map(r => (Array.isArray(r) ? r : [r]).map(v => String(v == null ? '' : v)))
  const N = rows.length
  let E = columns.findIndex(c => c.emph)
  if (E < 0) E = NC - 1
  const KEY = 0
  // the emphasised column's highlighter (columns[E].tone: good green by default, bad coral, goal blue, neutral sand);
  // a pick is drawn in yellow, or in blue when the column itself is on yellow
  const emphTone = columns[E] && columns[E].tone ? columns[E].tone : 'good'
  const pickTone = emphTone === 'input' ? 'goal' : 'input'
  const align = j => (columns[j] && columns[j].align) || (j === KEY ? 'left' : 'right')

  // ---------------------------------------------------------------- timing
  const rowsT = d.rowsT != null ? +d.rowsT : 0.4
  const every = d.rowEvery != null ? +d.rowEvery : 0.25
  const rowT = rows.map((_, i) => (Array.isArray(d.rowT) && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every))
  const pre = rowT.map(x => x <= 0.001) // landed before frame 1: shown complete at t = 0 and kept through the loop
  const typeD = clamp(every * 0.8, 0.14, 0.3)
  const valueCols = [...Array(NC).keys()].filter(j => j !== KEY)
  const colDelay = j => Math.max(0, valueCols.indexOf(j)) * 0.05
  const landAt = (i, j) => rowT[i] + colDelay(j)
  const lastRow = N ? Math.max(...rowT) : 0
  const lastLand = lastRow + colDelay(valueCols[valueCols.length - 1]) + Math.max(typeD, MOTION.wipe)
  const picks = (d.pick || [])
    .filter(p => p && p.row != null && +p.row >= 0 && +p.row < N)
    .map(p => ({ t: p.t != null ? +p.t : lastLand + 0.8, row: +p.row, label: p.label || '' }))
    .sort((a, b) => a.t - b.t)
  picks.forEach((p, k) => { p.next = picks[k + 1] ? picks[k + 1].t : Infinity })
  const labelled = LO.legend === false ? [] : picks.filter(p => p.label)
  labelled.forEach((p, k) => { p.lnext = labelled[k + 1] ? labelled[k + 1].t : Infinity })
  const formulaText = LO.formula === false ? '' : d.formula || ''

  const lastPick = picks.length ? picks[picks.length - 1].t : 0
  const lastBeat = Math.max(lastLand + 0.4, picks.length ? lastPick + 0.9 : 0)
  const clearLen = MOTION.clear + 0.2
  const computed = durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : 3.0, tail: loop ? clearLen : 0 })
  const D = spec.duration || computed
  const clearT0 = loop ? D - clearLen : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }

  // ---------------------------------------------------------------- DOM (built once)
  const root = h('div', { class: 'fyr' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)

  // a page-coloured block behind the figure (table + the lines under it) keeps the dot grid out of the numbers
  const mask = h('div', { class: 'fyr-mask', 'data-deco': '' })
  root.append(mask)
  const tableEl = h('div', { class: 'cs-table fyr-table' })
  const ruleTop = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  const ruleMid = h('div', { class: 'cs-rule-thin', 'data-deco': '' })
  const ruleBot = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  const head = h('div', { class: 'cs-thead' })
  // a formula sub-label ("÷ 2,080") may leave the head only when the footnote or the footer already carries it
  const squash = s0 => plain(String(s0 || '')).toLowerCase().replace(/\s+/g, '')
  const said = squash(formulaText) + '|' + squash(spec.footer)
  const TH = columns.map((c, j) => {
    const lines = String(c.label || '').split('\n')
    const l2 = lines.slice(1).join(' ').trim()
    const sub = l2 ? (OP.test(l2) ? 'formula' : NUM.test(l2) ? 'figure' : 'cont') : null
    const subDrop = sub === 'formula' && said.includes(squash(l2))
    const l1 = (lines[0] || '').trim()
    const a = h('span', { class: 'fyr-th1', html: md(l1) })
    const b = sub ? h('span', { class: 'fyr-th2' + (sub === 'cont' ? ' cont' : ''), html: md(l2) }) : null
    const el = h('div', { class: 'cs-th' + (j === E ? ' emph' : '') }, a, b)
    head.append(el)
    return { el, a, b, sub, subDrop, l1, words: l1.split(/\s+/).filter(Boolean), html1: md(l1), wrapHTML: null, wrapW: Infinity }
  })
  // the emphasised column's band: one even highlighter that grows down as its rows land (decoration)
  const colBand = h('div', { class: 'fyr-colband', 'data-deco': '' })
  style(colBand, { background: toneColor(emphTone) })
  tableEl.append(ruleTop, colBand, head, ruleMid)

  const R = rows.map((r, i) => {
    const el = h('div', { class: 'cs-tr' })
    const band = h('div', { class: 'cs-tr-band' })
    const line = h('div', { class: 'cs-tr-line', 'data-deco': '' })
    el.append(band)
    const cells = []
    for (let j = 0; j < NC; j++) {
      const v = r[j] != null ? r[j] : ''
      const kind = j === E ? 'emph' : j === KEY ? 'key' : 'plain'
      const hb = hlBox({ html: md(v), tone: emphTone, px: CELL.max, family: kind === 'plain' ? F.tight : F.display, weight: kind === 'plain' ? 600 : 400, padX: 12 })
      hb.seek(0, 1, 0)
      const wrap = h('div', { class: 'cs-td ' + kind }, hb.el)
      style(wrap, { justifyContent: align(j) === 'right' ? 'flex-end' : 'flex-start' })
      el.append(wrap)
      cells.push({ el: wrap, hl: hb, kind, full: md(v), tw: 0, pad: 0 })
    }
    if (i < N - 1) el.append(line)
    tableEl.append(el)
    return { el, band, cells }
  })
  tableEl.append(ruleBot)
  root.append(tableEl)

  const formula = formulaText ? h('div', { class: 'fyr-formula', html: md(formulaText) }) : null
  if (formula) root.append(formula)

  const legends = labelled.map(p => {
    const key = hlBox({ html: md(rows[p.row][KEY] || ''), tone: pickTone, px: 46 })
    const txt = h('div', { class: 'fyr-legend-txt', html: md(p.label) })
    const el = h('div', { class: 'fyr-legend' }, key.el, txt)
    root.append(el)
    return { p, el, key, txt }
  })

  // ---------------------------------------------------------------- measuring (real fonts, at a reference size)
  const REF = 40
  const tableW = P.right - GRID.left // 856: x 84 -> 940
  const padOf = px => 12 * Math.sqrt(px / SIZE.result) // hlBox's horizontal padding at px
  const range = document.createRange()
  const textW = el => { range.selectNodeContents(el); return range.getBoundingClientRect().width } // ink width, not box
  // right-aligned columns with some "≈ " values: every "≈" in one vertical line (a slot left of the widest figure)
  for (let j = 0; j < NC; j++) {
    if (align(j) !== 'right') continue
    const html = alignApprox(R.map(r => r.cells[j].hl), rows.map(r => (r[j] != null ? r[j] : '')), REF)
    R.forEach((r, i) => { r.cells[j].full = html[i] })
  }
  for (const row of R) for (const c of row.cells) { c.hl.setPx(REF); c.tw = c.hl.txt.getBoundingClientRect().width - 2 * padOf(REF) }
  const cellTW = [...Array(NC).keys()].map(j => Math.max(0, ...R.map(r => r.cells[j].tw)))
  for (const th of TH) { style(th.a, { fontSize: REF + 'px' }); if (th.b) style(th.b, { fontSize: REF + 'px' }) }
  const headTW = TH.map(th => ({ a: textW(th.a), b: th.b ? textW(th.b) : 0 }))
  // a long label may wrap onto two lines (at the most balanced word break) when the columns are short of room
  for (const th of TH) {
    const w = th.words
    for (let k = 1; k < w.length; k++) {
      const left = md(w.slice(0, k).join(' ')), right = md(w.slice(k).join(' '))
      th.a.innerHTML = left; const wl = textW(th.a)
      th.a.innerHTML = right; const wr = textW(th.a)
      if (Math.max(wl, wr) < th.wrapW) { th.wrapW = Math.max(wl, wr); th.wrapHTML = left + '<br>' + right }
    }
    th.a.innerHTML = th.html1
  }
  const formulaW = formula ? (style(formula, { fontSize: REF + 'px' }), textW(formula)) : 0
  const legendW = legends.map(g => { g.key.setPx(REF); style(g.txt, { fontSize: REF + 'px' }); return { key: g.key.width(), txt: textW(g.txt) } })
  const hasFormulaSubs = TH.some(th => th.subDrop)
  const hasLegend = legends.length > 0
  // (a formula sub-label the footnote does not carry is the column's only working: it stays, the head takes a line)
  const subOn = (th, headMode) => !!th.b && (!th.subDrop || headMode === 'full')

  // column widths for (cellPx, head px, sub px, headMode): { cols, wrap } or null when they cannot fit the 856 px
  // measure. Labels wrap (widest saving first) only when the columns would not fit on one line each.
  function colsFor(cellPx, hp, sp, headMode) {
    const wrap = new Set()
    const needOf = j => {
      const cw = (cellTW[j] * cellPx) / REF + 2 * padOf(cellPx) - 2 * (PAD - 4) // the box may use 4 px of the gutter
      const sw = subOn(TH[j], headMode) ? (headTW[j].b * (TH[j].sub === 'cont' ? hp : sp)) / REF : 0
      const aw = ((wrap.has(j) ? TH[j].wrapW : headTW[j].a) * hp) / REF
      return Math.max(cw, aw, sw) + 2 * PAD
    }
    let need = [...Array(NC).keys()].map(needOf)
    let sum = need.reduce((a, b) => a + b, 0)
    while (sum > tableW + 0.5) {
      // wrap the label that saves the most width, preferring one that does not make the head taller
      const hNow = headH(hp, sp, headMode, wrap)
      let best = -1, score = 0
      for (let j = 0; j < NC; j++) {
        if (wrap.has(j) || !isFinite(TH[j].wrapW)) continue
        wrap.add(j); const g = need[j] - needOf(j); const taller = headH(hp, sp, headMode, wrap) > hNow; wrap.delete(j)
        const sc = g > 0 ? g + (taller ? 0 : 10000) : 0
        if (sc > score) { score = sc; best = j }
      }
      if (best < 0) return null
      wrap.add(best); need[best] = needOf(best); sum = need.reduce((a, b) => a + b, 0)
    }
    const extra = (tableW - sum) / NC // booktabs: even spacing, no vertical rules
    let x = 0
    return { cols: need.map(w => { const col = { x, w: w + extra }; x += w + extra; return col }), wrap }
  }
  function headH(hp, sp, headMode, wrap = new Set()) {
    const colH = TH.map((th, j) => (wrap.has(j) ? 2 : 1) * hp * 1.1 + (subOn(th, headMode) ? (th.sub === 'cont' ? hp * 1.1 : sp * 1.15 + 2) : 0))
    return Math.round(12 + Math.max(hp * 1.1, ...colH) + 14)
  }
  // formula variants: one line at 40 px, else two balanced lines at 40 px (it is read, so never smaller)
  const FV = []
  if (formula) {
    const fitW = tableW - PAD
    if (formulaW <= fitW) FV.push({ px: 40, lines: 1, h: 48 })
    else FV.push({ px: 40, lines: 2, h: 96 })
  }
  // legend: one line at maxPx -> 40 px with its key chip; then two balanced lines beside the chip; then without
  // the chip (one line, then two). Every label ends by x 940.
  const legendMemo = new Map()
  function legendFit(maxPx) {
    if (legendMemo.has(maxPx)) return legendMemo.get(maxPx)
    const fitW = tableW - PAD
    const room = (k, q, keyOn) => fitW - (keyOn ? (legendW[k].key * q) / REF + 18 : 0)
    const oneLine = (q, keyOn) => legendW.every((w, k) => (w.txt * q) / REF <= room(k, q, keyOn))
    const twoLines = (q, keyOn) => legends.every((g, k) => {
      const r = fitMarkup(g.txt, g.p.label, { maxW: room(k, q, keyOn), maxPx: q, minPx: q, lh: 1.1, maxLines: 2, maxSplit: 2, linePenalty: 0 })
      const ok = r.fits && r.lines <= 2
      g.txt.innerHTML = md(g.p.label); style(g.txt, { whiteSpace: 'nowrap', fontSize: REF + 'px' })
      return ok
    })
    let out = null
    for (const [keyOn, lines] of [[true, 1], [true, 2], [false, 1], [false, 2]]) {
      for (let q = maxPx; q >= 40 && !out; q -= 2) if (lines === 1 ? oneLine(q, keyOn) : twoLines(q, keyOn)) out = { px: q, keyOn, lines }
      if (out) break
    }
    if (!out) out = { px: 40, keyOn: false, lines: 2, over: true }
    out.h = Math.max(out.keyOn ? Math.round(out.px * 1.3) : 0, Math.round(out.px * 1.1 * out.lines))
    legendMemo.set(maxPx, out)
    return out
  }

  // ---------------------------------------------------------------- layout engine
  const avail = P.bottom - P.top
  const maxPitch = 92
  // stack: every pick label keeps its own line under the table (so every pick band stays explained); otherwise one
  // line shows the latest label, and an earlier pick's band leaves with its label
  function tryLayout(minPitch, mode, fv, raise, hp, stack = false) {
    const headMode = mode === 'compact' ? 'compact' : 'full'
    const showFormula = !!fv
    const showLegend = hasLegend && mode !== 'formula' && mode !== 'none'
    const lg = showLegend ? legendFit(minPitch >= 46 ? 46 : 42) : null
    let under = 0
    if (mode === 'shared') under = GAP_T + Math.max(fv.h, lg.h)
    else {
      if (showFormula) under += GAP_T + fv.h
      if (showLegend) under += (showFormula ? GAP_L : GAP_T) + lg.h
    }
    if (showLegend && stack) under += (legends.length - 1) * (GAP_L + lg.h)
    const sp = Math.min(HEAD.sub, hp)
    // the fewest label wraps the columns need (at the smallest cells) set the head height, hence the pitch
    const least = colsFor(CELL.min, hp, sp, headMode)
    if (!least) return null
    const hh = headH(hp, sp, headMode, least.wrap)
    const pitch = Math.min(maxPitch, Math.floor((avail + raise - hh - 6 - under) / Math.max(1, N)))
    if (pitch < minPitch) return null
    // cells: about 0.68 of the pitch (40-56 px), as long as the columns still fit without extra wraps
    let cellPx = clamp(Math.round(pitch * 0.68), CELL.min, CELL.max)
    let c = null
    while (cellPx > CELL.min && !((c = colsFor(cellPx, hp, sp, headMode)) && c.wrap.size <= least.wrap.size)) cellPx -= 2
    if (cellPx <= CELL.min) { cellPx = CELL.min; c = least }
    return { mode, fv, raise, headMode, showFormula, showLegend, lg, hp, sp, hh, pitch, cellPx, cols: c.cols, wrap: c.wrap, stack: showLegend && stack }
  }
  // preference: keep everything at a comfortable pitch; then share the line under the table; then go dense;
  // only then drop content (the formula first, when the head's sub-labels already carry it). Within a group the
  // head size comes first (40 px labels with a 12 px raise beat 36 px labels without one).
  const comfy = [[48, 0], [44, 0], [44, 12]]
  const dense = [[40, 12]]
  const plan = []
  const add = (modes, steps) => {
    for (const hp of [HEAD.px]) for (const mode of modes) for (const [mp, raise] of steps) plan.push([mode, mp, raise, hp])
  }
  if (FV.length && hasLegend) {
    add(hasFormulaSubs ? ['both', 'compact'] : ['both'], comfy)
    add(['shared'], comfy)
    if (hasFormulaSubs) add(['legend'], comfy)
    add(hasFormulaSubs ? ['both', 'compact', 'shared'] : ['both', 'shared'], dense)
    add(['legend'], hasFormulaSubs ? dense : [...comfy, ...dense])
  } else if (FV.length) add(['formula'], [...comfy, ...dense])
  else if (hasLegend) add(['legend'], [...comfy, ...dense])
  add(['none'], [...comfy, ...dense])
  let L = null
  const stacks = legends.length > 1 ? [true, false] : [false]
  search: for (const [mode, mp, raise, hp] of plan) {
    const fvs = mode === 'legend' || mode === 'none' ? [null] : FV
    for (const stack of stacks) for (const fv of fvs) { L = tryLayout(mp, mode, fv, raise, hp, stack); if (L) break search }
  }
  if (!L) {
    // last resort (more columns or longer labels than the measure holds): columns sized by their cells, labels
    // wrapping freely inside them at 40 px, pure-working sub-labels dropped. The linter reports the rest.
    const hp = HEAD.min, sp = HEAD.min
    const need = [...Array(NC).keys()].map(j => (cellTW[j] * CELL.min) / REF + 2 * padOf(CELL.min) - 2 * (PAD - 4) + 2 * PAD)
    const extra = (tableW - need.reduce((a, b) => a + b, 0)) / NC
    let x = 0
    const cols = need.map(w => { const c = { x, w: Math.max(2 * PAD + 40, w + extra) }; x += c.w; return c })
    let tall = 0
    TH.forEach((th, j) => {
      style(th.el, { width: cols[j].w - 2 * PAD + 'px', whiteSpace: 'normal', fontSize: hp + 'px' })
      style(th.a, { fontSize: hp + 'px', textWrap: 'balance' })
      if (th.b) style(th.b, { fontSize: sp + 'px', display: th.subDrop ? 'none' : '' })
      tall = Math.max(tall, th.el.getBoundingClientRect().height)
    })
    const hh = Math.round(12 + tall + 14)
    const pitch = Math.max(30, Math.min(maxPitch, Math.floor((avail + 12 - hh - 6) / Math.max(1, N))))
    L = { mode: 'none', fv: null, raise: 12, headMode: 'compact', showFormula: false, showLegend: false, lg: null,
      hp, sp, hh, pitch, cellPx: CELL.min, cols, wrap: new Set(), fallback: true }
  }

  // ---------------------------------------------------------------- place
  const top = Math.round(P.top - L.raise)
  const { pitch, cellPx, hh } = L
  const boxH = Math.min(Math.round(cellPx * 1.28), pitch - (pitch >= 56 ? 10 : 4))
  const tableH = hh + N * pitch + 6
  style(tableEl, { left: GRID.left + 'px', top: top + 'px', width: tableW + 'px', height: tableH + 'px' })
  style(ruleTop, { top: '0px' })
  style(ruleMid, { top: hh - 2 + 'px' })
  style(ruleBot, { top: hh + N * pitch + 2 + 'px' })
  style(head, { height: hh + 'px' })
  TH.forEach((th, j) => {
    const col = L.cols[j]
    style(th.el, { left: col.x + PAD + 'px', width: col.w - 2 * PAD + 'px', textAlign: align(j), fontSize: L.hp + 'px' })
    style(th.a, { fontSize: L.hp + 'px' })
    th.a.innerHTML = L.wrap.has(j) && th.wrapHTML ? th.wrapHTML : th.html1
    if (th.b) style(th.b, { display: subOn(th, L.headMode) ? '' : 'none', fontSize: (th.sub === 'cont' ? L.hp : L.sp) + 'px' })
  })
  // text runs of neighbouring rows share a few px of line box when the grid is this tight (the glyphs do not touch)
  const tight = pitch < Math.ceil(cellPx * 1.22)
  const inset = Math.max(0, Math.round((pitch - Math.min(pitch, boxH + 10)) / 2))
  R.forEach((row, i) => {
    style(row.el, { top: hh + i * pitch + 'px', height: pitch + 'px', '--inset': inset + 'px' })
    if (tight) row.el.setAttribute('data-overlap-ok', '')
    // a tight grid: the hairline drops 2 px so the figures' descenders ($, comma) clear it
    const hair = row.el.querySelector('.cs-tr-line')
    if (hair) style(hair, { bottom: pitch < 48 ? '-2px' : '0px' })
    row.cells.forEach((c, j) => {
      const col = L.cols[j]
      c.hl.setPx(cellPx, boxH)
      c.hl.setHTML(c.full)
      c.pad = padOf(cellPx)
      // the text inside the box lines up with the column label (x + PAD)
      style(c.el, { left: Math.round(col.x + PAD - c.pad) + 'px', width: Math.round(col.w - 2 * PAD + 2 * c.pad) + 'px' })
    })
  })
  // the emphasised column's band: as wide as its widest value box, on the column's alignment edge, between the
  // first and last rows (inset like the row bands)
  const bandIn = Math.max(2, inset)
  {
    const col = L.cols[E]
    const wl = Math.round(col.x + PAD - padOf(cellPx)), ww = Math.round(col.w - 2 * PAD + 2 * padOf(cellPx))
    const bw = Math.ceil(Math.max(0, ...R.map(row => row.cells[E].hl.width())))
    style(colBand, { left: (align(E) === 'right' ? wl + ww - bw : wl) + 'px', width: bw + 'px', top: hh + bandIn + 'px', height: '0px' })
  }
  const textLeft = GRID.left + PAD // the key column's text edge: lines under the table hang from it
  let y = top + tableH
  if (L.showFormula) {
    formula.classList.toggle('two', L.fv.lines === 2)
    style(formula, { left: textLeft + 'px', top: Math.round(y + GAP_T) + 'px', fontSize: L.fv.px + 'px', width: L.fv.lines === 2 ? tableW - PAD + 'px' : '' })
    if (L.mode !== 'shared') y += GAP_T + L.fv.h
  } else if (formula) style(formula, { display: 'none' })
  if (L.showLegend) {
    const ly = L.mode === 'shared' ? y + GAP_T : y + (L.showFormula ? GAP_L : GAP_T)
    for (const [k, g] of legends.entries()) {
      g.key.setPx(L.lg.px)
      style(g.key.el, { display: L.lg.keyOn ? '' : 'none' })
      const room = tableW - PAD - (L.lg.keyOn ? (legendW[k].key * L.lg.px) / REF + 18 : 0)
      // explicit, balanced lines (one or two) at the fitted size, so nothing reflows or runs past x 940
      fitMarkup(g.txt, g.p.label, { maxW: room, maxPx: L.lg.px, minPx: L.lg.px, lh: 1.1, maxLines: L.lg.lines, maxSplit: L.lg.lines, linePenalty: 0 })
      const lt = ly + (L.stack ? k * (L.lg.h + GAP_L) : 0)
      style(g.el, { left: Math.round(textLeft - (L.lg.keyOn ? padOf(L.lg.px) : 0)) + 'px', top: Math.round(lt) + 'px', height: L.lg.h + 'px' })
    }
  } else for (const g of legends) style(g.el, { display: 'none' })
  let figBottom = top + tableH
  if (L.showFormula) figBottom = Math.max(figBottom, top + tableH + GAP_T + L.fv.h)
  if (L.showLegend) figBottom = Math.max(figBottom, legends[legends.length - 1].el.offsetTop + L.lg.h)
  // when does a pick's band leave (its label replaced on a one-label line); Infinity = it stays (stacked, unlabelled)
  for (const p of picks) p.gone = L.showLegend && !L.stack && p.label && labelled.includes(p) ? p.lnext : Infinity
  style(mask, { left: GRID.left - 18 + 'px', width: tableW + 36 + 'px', top: top - 16 + 'px', height: Math.round(figBottom - top + 26) + 'px' })
  Object.assign(root.dataset, { mode: L.mode, pitch: String(pitch), cell: String(cellPx), head: L.headMode, wrap: [...L.wrap].join(','), stack: String(!!L.stack) })

  // ---------------------------------------------------------------- sound
  // each row's values pop in with a soft tick (a quick fill reads as one ripple)
  const live = rowT.filter(x => x > 0.001).sort((a, b) => a - b)
  if (live.length) {
    const maxGap = Math.max(0, ...live.slice(1).map((x, k) => x - live[k]))
    for (const x of live) ctx.cue(x, 'tick', { gain: maxGap <= 0.6 ? 0.28 : 0.42 })
  }
  for (const p of picks) ctx.cue(p.t, 'swipe', { gain: 0.35 })
  if (L.showLegend) for (const g of legends) ctx.cue(g.p.t + 0.2 + MOTION.popDelay, 'pop', { gain: 0.45 })
  if (!picks.length && N) ctx.cue(lastLand + 0.6, 'pop', { gain: 0.35 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.25 })

  // ---------------------------------------------------------------- seek helpers
  const half = MOTION.clear / 2
  const finale = t => (picks.length ? 0 : prog(t, lastLand + 0.6, 0.45)) // no picks: the column comes back to full
  const firstLegendT = legends.length ? legends[0].p.t : Infinity

  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      const fin = finale(t)
      R.forEach((row, i) => {
        // picks on this row: the band swipes in, and settles to a tint when a later pick takes over
        let band = 0, bandRest = 0, focus = 0, gone = 0
        for (const p of picks) {
          if (p.row !== i || t < p.t) continue
          band = Math.max(band, ease.out(prog(t, p.t, 0.3)))
          bandRest = prog(t, p.next, 0.3)
          gone = prog(t, p.gone, 0.3) // its label left the one-label line: the band goes with it (never unexplained)
          focus = Math.max(focus, prog(t, p.t + 0.12, 0.25) * (1 - bandRest))
        }
        style(row.band, {
          background: toneColor(pickTone),
          opacity: n3(band > 0 ? lerp(1, MOTION.rest, bandRest) * (1 - gone) * keep : 0),
          clipPath: band >= 1 ? 'none' : `inset(0 ${n3((1 - band) * 100)}% 0 0 round 10px)`,
        })
        const k = pre[i] ? 1 : keep // values that landed before frame 1 belong to the frame-1 state
        row.cells.forEach((c, j) => {
          if (c.kind === 'key') return
          const t0 = landAt(i, j)
          // each whole value pops into place (a half-typed figure is never on screen)
          const p = pre[i] ? 1 : c.kind === 'emph' ? landing(t, t0).text : prog(t, t0, MOTION.pop)
          style(c.el, { opacity: n3(p > 0 ? k : 0) })
          if (c.kind !== 'emph') { c.hl.seek(0, p, 0); return }
          // its own box swipes in at full tint; once the next row lands it steps back to the column band's pale tint
          const wipe = pre[i] ? 1 : ease.out(prog(t, t0, MOTION.wipe))
          let rest = i < N - 1 ? prog(t, landAt(i + 1, j) + 0.1, MOTION.restIn) : picks.length ? prog(t, lastLand + 0.5, MOTION.restIn) : 0
          rest *= (1 - fin) * (1 - focus)
          if (pre[i]) rest *= keep // the loop returns a pre-filled row to its frame-1 look (full)
          c.hl.seek(wipe, p, 0)
          style(c.hl.bg, { opacity: n3(wipe > 0 ? 1 - rest : 0) })
        })
      })
      // the column band grows down with the landed rows (pale; full again for the no-pick finale), and runs back up
      // to the frame-1 state with the loop clear
      let hAll = 0, hPre = 0
      for (let i = 0; i < N; i++) {
        const w = pre[i] ? 1 : ease.out(prog(t, landAt(i, E), MOTION.wipe))
        if (w > 0) hAll = Math.max(hAll, i * pitch + w * pitch)
        if (pre[i]) hPre = Math.max(hPre, (i + 1) * pitch)
      }
      const bh = Math.max(0, Math.round(lerp(hAll, hPre, clearP)) - 2 * bandIn)
      style(colBand, { height: bh + 'px', opacity: n3(bh > 0 ? lerp(MOTION.rest, 1, fin) : 0) })
      // formula footnote: static from frame 1; on a shared line the pick label takes its place, and it comes back
      // with the loop reset
      // (shared line: one after the other, never both: the formula leaves before the first label lands, and with
      // the loop clear the label leaves in the first half, the formula returns in the second)
      if (formula && L.showFormula) {
        const o = L.mode === 'shared' ? Math.max(1 - prog(t, firstLegendT - 0.05, 0.18), prog(t, clearT0 + half, half)) : 1
        fade(formula, o)
      }
      // legend: the current pick's label (its row key swipes in on yellow, then the words)
      if (L.showLegend) for (const g of legends) {
        const p = g.p
        const t0 = p.t + 0.2
        const out = !L.stack && isFinite(p.lnext) ? prog(t, p.lnext - 0.02, 0.16) : 0
        const Lk = landing(t, t0)
        g.key.seek(Lk.wipe, Lk.text, 0) // (hlBox never pops text under the 40 px floor)
        fadeUp(g.txt, prog(t, t0 + 0.12, MOTION.fade + 0.06))
        fade(g.el, t >= t0 ? (1 - out) * (L.mode === 'shared' ? 1 - prog(t, clearT0, half) : keep) : 0)
      }
    },
  }
}
