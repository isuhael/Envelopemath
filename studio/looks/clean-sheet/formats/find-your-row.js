// find-your-row — the find-your-row lookup table (P7) on the Clean Sheet.
//
// A typeset booktabs table on the page. Column labels in grey caps (a formula sub-label such as "÷ 2,080" in grey
// mono under its label; the emphasised column's label in ink). Row keys and the emphasised values in Archivo Black,
// the working columns in a lighter Inter Tight, the emphasised column on the green highlighter.
//
// Frame 1 already shows the head and EVERY row key, so the viewer can find their row at once (Gage's 1.15M table
// opens the same way); the value cells are empty (rows with t <= 0 are pre-filled). The values then type into
// the rows top to bottom: each cell types in place, grapheme by grapheme, and the emphasised cell's highlighter
// swipes under it. The newest emphasised value is the loud one; earlier ones rest to a pale tint, so one bright
// cell runs down the column. A pick swipes the yellow highlighter across its row (the emphasised cell turns full
// green where the two highlighters cross) and writes its label on the legend line under the table:
// [row key on yellow] label. The rough formula is a grey mono footnote under the table. With no picks the whole
// column comes back to full at the end (the cheat-sheet frame). The finished table holds, then
// (lookOpts.loop, default on) the values clear back to the frame-1 state so the short loops.
//
// Layout engine (measured with the real fonts at mount): the table fills the work area at the largest row pitch
// that fits. It tries, in order: formula and legend each on its own line; formula sub-labels dropped from the
// head (the footnote carries them); one shared line (the formula, which the pick label replaces from the first
// pick); a dense 40 px pitch; and only then drops content (the formula first). Cells never go below 40 px.
//
// lookOpts: loop (true) · legend (true; false hides pick labels) · formula (true; false hides the footnote)
import { h, css as style, prog, ease, clamp, lerp, plain, graphemes } from '../../../runtime/core.js'
import { F, SIZE, GRID, MOTION, md, hlBox, toneColor, fadeUp, fade, landing, durationOf } from '../lib.js'

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
.fyr-ghost, .fyr-ghost * { color: transparent !important; }
.fyr-formula { white-space: nowrap; font-family: 'IBM Plex Mono', 'Inter Full', monospace; font-weight: 500;
  color: #6B7280; line-height: 1.2; letter-spacing: -.015em; }
.fyr-formula.two { white-space: normal; text-wrap: balance; }
.fyr-legend { display: flex; align-items: center; gap: 18px; white-space: nowrap; }
.fyr-legend-txt { font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 700; color: #15171C; line-height: 1.1;
  letter-spacing: -.005em; }
.fyr-legend-txt em { font-style: normal; color: #1D4FC4; }
.fyr-legend-txt u.mark2 { text-decoration: none; color: #B42318; }
`

const PAD = 12                // cell inset from the column edge: columns sit >= 24 px apart
const HEAD = { px: 40, sub: 40, min: 34 }
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
  const TH = columns.map((c, j) => {
    const lines = String(c.label || '').split('\n')
    const l2 = lines.slice(1).join(' ').trim()
    const sub = l2 ? (OP.test(l2) ? 'formula' : NUM.test(l2) ? 'figure' : 'cont') : null
    const l1 = (lines[0] || '').trim()
    const a = h('span', { class: 'fyr-th1', html: md(l1) })
    const b = sub ? h('span', { class: 'fyr-th2' + (sub === 'cont' ? ' cont' : ''), html: md(l2) }) : null
    const el = h('div', { class: 'cs-th' + (j === E ? ' emph' : '') }, a, b)
    head.append(el)
    return { el, a, b, sub, l1, words: l1.split(/\s+/).filter(Boolean), html1: md(l1), wrapHTML: null, wrapW: Infinity }
  })
  tableEl.append(ruleTop, head, ruleMid)

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
      cells.push({ el: wrap, hl: hb, kind, full: md(v), g: graphemes(plain(v)), memo: [], tw: 0, pad: 0 })
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
  const hasFormulaSubs = TH.some(th => th.sub === 'formula')
  const hasLegend = legends.length > 0
  const subOn = (th, headMode) => !!th.b && (th.sub !== 'formula' || headMode === 'full')

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
  // formula variants, best first: one line at 40 px; one line shrunk to >= 37; two balanced lines; one line >= 34
  const FV = []
  if (formula) {
    const fitW = tableW - PAD
    if (formulaW <= fitW) FV.push({ px: 40, lines: 1, h: 48 })
    else {
      const shrink = Math.floor((REF * fitW) / formulaW)
      if (shrink >= 37) FV.push({ px: shrink, lines: 1, h: Math.round(shrink * 1.2) })
      FV.push({ px: 40, lines: 2, h: 96 })
      if (shrink >= HEAD.min && shrink < 37) FV.push({ px: shrink, lines: 1, h: Math.round(shrink * 1.2) })
    }
  }
  // legend size: maxPx, fitted down to 40; the key box is dropped if the label alone needs the room
  function legendFit(maxPx) {
    const fitW = tableW - PAD
    const wAt = (q, k) => Math.max(0, ...legendW.map(w => (k ? (w.key * q) / REF + 18 : 0) + (w.txt * q) / REF))
    let px = maxPx, keyOn = true
    while (px > 40 && wAt(px, true) > fitW) px -= 2
    if (wAt(px, true) > fitW) { keyOn = false; px = maxPx; while (px > 40 && wAt(px, false) > fitW) px -= 2 }
    return { px, keyOn, h: Math.round(px * 1.3) }
  }

  // ---------------------------------------------------------------- layout engine
  const avail = P.bottom - P.top
  const maxPitch = 92
  function tryLayout(minPitch, mode, fv, raise, hp) {
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
    return { mode, fv, raise, headMode, showFormula, showLegend, lg, hp, sp, hh, pitch, cellPx, cols: c.cols, wrap: c.wrap }
  }
  // preference: keep everything at a comfortable pitch; then share the line under the table; then go dense;
  // only then drop content (the formula first, when the head's sub-labels already carry it). Within a group the
  // head size comes first (40 px labels with a 12 px raise beat 36 px labels without one).
  const comfy = [[48, 0], [44, 0], [44, 12]]
  const dense = [[40, 12]]
  const plan = []
  const add = (modes, steps) => {
    for (const hp of [HEAD.px, 38, 36]) for (const mode of modes) for (const [mp, raise] of steps) plan.push([mode, mp, raise, hp])
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
  for (const [mode, mp, raise, hp] of plan) {
    const fvs = mode === 'legend' || mode === 'none' ? [null] : FV
    for (const fv of fvs) { L = tryLayout(mp, mode, fv, raise, hp); if (L) break }
    if (L) break
  }
  if (!L) {
    // last resort (more columns or longer labels than the measure holds): columns sized by their cells, labels
    // wrapping freely inside them at 36 px, pure-working sub-labels dropped. The linter reports the rest.
    const hp = 36, sp = 36
    const need = [...Array(NC).keys()].map(j => (cellTW[j] * CELL.min) / REF + 2 * padOf(CELL.min) - 2 * (PAD - 4) + 2 * PAD)
    const extra = (tableW - need.reduce((a, b) => a + b, 0)) / NC
    let x = 0
    const cols = need.map(w => { const c = { x, w: Math.max(2 * PAD + 40, w + extra) }; x += c.w; return c })
    let tall = 0
    TH.forEach((th, j) => {
      style(th.el, { width: cols[j].w - 2 * PAD + 'px', whiteSpace: 'normal', fontSize: hp + 'px' })
      style(th.a, { fontSize: hp + 'px', textWrap: 'balance' })
      if (th.b) style(th.b, { fontSize: sp + 'px', display: th.sub === 'formula' ? 'none' : '' })
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
    row.cells.forEach((c, j) => {
      const col = L.cols[j]
      c.hl.setPx(cellPx, boxH)
      c.pad = padOf(cellPx)
      // the text inside the box lines up with the column label (x + PAD)
      style(c.el, { left: Math.round(col.x + PAD - c.pad) + 'px', width: Math.round(col.w - 2 * PAD + 2 * c.pad) + 'px' })
    })
  })
  const textLeft = GRID.left + PAD // the key column's text edge: lines under the table hang from it
  let y = top + tableH
  if (L.showFormula) {
    formula.classList.toggle('two', L.fv.lines === 2)
    style(formula, { left: textLeft + 'px', top: Math.round(y + GAP_T) + 'px', fontSize: L.fv.px + 'px', width: L.fv.lines === 2 ? tableW - PAD + 'px' : '' })
    if (L.mode !== 'shared') y += GAP_T + L.fv.h
  } else if (formula) style(formula, { display: 'none' })
  if (L.showLegend) {
    const ly = L.mode === 'shared' ? y + GAP_T : y + (L.showFormula ? GAP_L : GAP_T)
    for (const g of legends) {
      g.key.setPx(L.lg.px)
      style(g.key.el, { display: L.lg.keyOn ? '' : 'none' })
      style(g.txt, { fontSize: L.lg.px + 'px' })
      style(g.el, { left: Math.round(textLeft - (L.lg.keyOn ? padOf(L.lg.px) : 0)) + 'px', top: Math.round(ly) + 'px', height: L.lg.h + 'px' })
    }
  } else for (const g of legends) style(g.el, { display: 'none' })
  let figBottom = top + tableH
  if (L.showFormula) figBottom = Math.max(figBottom, top + tableH + GAP_T + L.fv.h)
  if (L.showLegend) figBottom = Math.max(figBottom, legends[0].el.offsetTop + L.lg.h)
  style(mask, { left: GRID.left - 18 + 'px', width: tableW + 36 + 'px', top: top - 16 + 'px', height: Math.round(figBottom - top + 26) + 'px' })
  Object.assign(root.dataset, { mode: L.mode, pitch: String(pitch), cell: String(cellPx), head: L.headMode, wrap: [...L.wrap].join(',') })

  // ---------------------------------------------------------------- sound
  // a quick fill reads as one stretch of typing; rows that land far apart get a soft tick each
  const live = rowT.filter(x => x > 0.001).sort((a, b) => a - b)
  if (live.length) {
    const maxGap = Math.max(0, ...live.slice(1).map((x, k) => x - live[k]))
    if (maxGap <= 0.6) ctx.cue(live[0], 'type', { dur: Math.max(0.2, lastLand - live[0]), gain: 0.38 })
    else for (const x of live) ctx.cue(x, 'tick', { gain: 0.45 })
  }
  for (const p of picks) ctx.cue(p.t, 'swipe', { gain: 0.35 })
  if (L.showLegend) for (const g of legends) ctx.cue(g.p.t + 0.2 + MOTION.popDelay, 'pop', { gain: 0.45 })
  if (!picks.length && N) ctx.cue(lastLand + 0.6, 'pop', { gain: 0.35 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.25 })

  // ---------------------------------------------------------------- seek helpers
  // typed-in-place: the first k graphemes in ink, the rest laid out but transparent, so the final alignment
  // (right-aligned numbers) never shifts while a cell types
  const typedHTML = (c, k) => {
    if (k >= c.g.length) return c.full
    if (c.memo[k] == null) c.memo[k] = md(c.g.slice(0, k).join('')) + '<span class="fyr-ghost">' + md(c.g.slice(k).join('')) + '</span>'
    return c.memo[k]
  }
  const graphemesAt = (c, p) => (p <= 0 ? 0 : Math.min(c.g.length, Math.ceil(p * c.g.length - 1e-6)))
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
        let band = 0, bandRest = 0, focus = 0
        for (const p of picks) {
          if (p.row !== i || t < p.t) continue
          band = Math.max(band, ease.out(prog(t, p.t, 0.3)))
          bandRest = prog(t, p.next, 0.3)
          focus = Math.max(focus, prog(t, p.t + 0.12, 0.25) * (1 - bandRest))
        }
        style(row.band, {
          background: toneColor(pickTone),
          opacity: n3(band > 0 ? lerp(1, MOTION.rest, bandRest) * keep : 0),
          clipPath: band >= 1 ? 'none' : `inset(0 ${n3((1 - band) * 100)}% 0 0 round 10px)`,
        })
        const k = pre[i] ? 1 : keep // values that landed before frame 1 belong to the frame-1 state
        row.cells.forEach((c, j) => {
          if (c.kind === 'key') return
          const t0 = landAt(i, j)
          const p = pre[i] ? 1 : prog(t, t0 + (c.kind === 'emph' ? 0.03 : 0), typeD)
          const n = graphemesAt(c, p)
          c.hl.setHTML(typedHTML(c, n))
          style(c.el, { opacity: n3(n > 0 ? k : 0) })
          if (c.kind !== 'emph') return
          // the highlighter swipes under the typing; the newest value is the loud one, earlier ones rest
          const wipe = pre[i] ? 1 : ease.out(prog(t, t0, MOTION.wipe))
          let rest = i < N - 1 ? prog(t, landAt(i + 1, j) + 0.1, MOTION.restIn) : picks.length ? prog(t, lastLand + 0.5, MOTION.restIn) : 0
          rest *= (1 - fin) * (1 - focus)
          if (pre[i]) rest *= keep // the loop returns a pre-filled row to its frame-1 look (full)
          c.hl.seek(wipe, 1, rest)
        })
      })
      // formula footnote: static from frame 1; on a shared line the pick label takes its place, and it comes back
      // with the loop reset
      if (formula && L.showFormula) {
        const o = L.mode === 'shared' ? Math.max(1 - prog(t, firstLegendT - 0.05, 0.18), clearP) : 1
        fade(formula, o)
      }
      // legend: the current pick's label (its row key swipes in on yellow, then the words)
      if (L.showLegend) for (const g of legends) {
        const p = g.p
        const t0 = p.t + 0.2
        const out = isFinite(p.lnext) ? prog(t, p.lnext - 0.02, 0.16) : 0
        const Lk = landing(t, t0)
        // the pop starts at 0.92 scale: below 44 px it would dip under the 40 px floor, so it lands without shrinking
        g.key.seek(Lk.wipe, L.lg.px >= 44 || Lk.text <= 0 ? Lk.text : 0.35 + 0.65 * Lk.text, 0)
        fadeUp(g.txt, prog(t, t0 + 0.12, MOTION.fade + 0.06))
        fade(g.el, t >= t0 ? (1 - out) * keep : 0)
      }
    },
  }
}
