// Scoreboard: find-your-row — the find-your-row lookup table (P7) as a dark leaderboard.
//
// One row per kind of viewer, denser than one pass can read. The viewer's job is to find their own row.
//   Frame 1: the header (the hook), the footer (the assumption) and a leaderboard whose slots already show every
//            row's key (column 1) beside dark "LED-off" placeholders, so each viewer can find their row before the
//            values arrive (the benchmark mechanic: Gage's ages are on screen at 0.0 s). Rows with t <= 0 are filled.
//   Fill:    top to bottom, each row's values slide in (stagger), its bar lights, its key turns white and the
//            emphasised column lands in neon green with a small bump. A soft tick per row; a thud when complete.
//   Pick:    the picked row lights (border, glow and tint in the emphasised column's colour; its bar lifts), the
//            other rows dim for a beat and then recover (the table stays findable), a pointer glides to it on the
//            left margin, and the pick label slams into the bottom strip.
// Layout: no hero row (layoutFor({ hero: false })); the stage starts under the footer (moved down when a long
//   footer wraps at its " · " into two lines) and ends under the last row; the row pitch (40-80 px) is what is
//   left between the column labels and the strip. Cells are Anton with every digit in a 0.5em slot (tabular).
//   Strip:   the bottom bar carries the formula (the one-line working) under the pick label when the table leaves
//            room; otherwise they share one slot (formula first, then each pick label as a hard cut).
//   Verdict: slams into the strip when it fits there at >= 58 px, otherwise into the header band (the hook hands
//            over to the answer), so the verdict never covers rows of the table.
// Dense boards (row pitch under 54 px) drop the slot outlines and bar borders and run as black/slate zebra stripes,
// so 40 px type never crowds a line. Each row's bar wipes in left to right as its values slide in.
//
// data: { columns: [{ label, emph?, tone? }], rows: [[display, ...]], formula, rowsT, rowEvery, rowT?, pick?, hold }
// lookOpts (all optional):
//   prompt:    ''                              a task line ("Find **your age**") in the pick slot until the first pick
//                                              (stacked strip only)
//   strip:     'auto' | 'stack' | 'swap'       formula + pick label stacked or sharing one slot (auto: by room)
//   verdictAt: 'auto' | 'strip' | 'header'     where the verdict lands (auto: strip if it fits there at >= 58 px)
//   dim:       0.5                             opacity of the other rows while a pick lands (1 = no dimming)
//   dimRest:   0.85                            what they recover to 1.6 s later
//   pointer:   true                            the green pointer on the left margin
import { h, s, css as style, setHTML, attr, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import { rich, richUI, esc, ax, bare, keepHyphens, header as drawHeader, slam, wobble, durationOf, inkWidth, slamFromFor, toneColor } from '../lib.js'

export const css = `
.fy-foot { position: absolute; font: 600 40px/1.15 'Inter', 'Inter Full', sans-serif; color: ${C.grey}; text-align: center; white-space: nowrap; }
.fy-foot em { font-style: normal; color: ${C.white}; }
.fy-table { position: absolute; left: 0; top: 0; width: ${W}px; }
.fy-hl { position: absolute; font: 700 40px/42px 'Inter Tight', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; color: ${C.grey}; white-space: nowrap; }
.fy-hl.r { text-align: right; }
.fy-hl.emph { color: ${C.white}; }
.fy-hl em { font-style: normal; color: ${C.white}; }
.fy-hbar { position: absolute; height: 5px; border-radius: 3px; }
.fy-row { position: absolute; --lit: 0; --emph: ${C.green}; }
.fy-slot { position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 10px; box-sizing: border-box; border: 2px solid #1A2029; }
.fy-slot.dense { border: 0; }
.fy-bar {
  position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 10px; box-sizing: border-box; transform-origin: 50% 50%;
  background: color-mix(in srgb, color-mix(in srgb, var(--emph) 22%, #000) calc(var(--lit) * 80%), var(--fill));
  border: 2px solid color-mix(in srgb, var(--emph) calc(var(--lit) * 100%), ${C.panelLine});
  box-shadow: 0 0 calc(var(--lit) * 30px) color-mix(in srgb, var(--emph) calc(var(--lit) * 55%), transparent);
}
.fy-bar.dense { border-radius: 5px; border-color: color-mix(in srgb, var(--emph) calc(var(--lit) * 100%), transparent); }
.fy-flash { position: absolute; left: 0; top: 0; width: 100%; height: 100%; border-radius: 10px; background: #FFFFFF; opacity: 0; }
.fy-skel { position: absolute; border-radius: 99px; background: #151A22; }
.fy-cell { position: absolute; font-family: 'Anton', 'Inter Full', sans-serif; font-weight: 400; line-height: 1; white-space: nowrap; text-transform: uppercase; letter-spacing: 0.01em; }
.fy-cell .ax { font-size: max(0.86em, 40px); }
.fy-d { display: inline-block; width: 0.5em; text-align: center; }
.fy-key { color: ${C.grey}; }
.fy-key.on { color: ${C.white}; }
.fy-val { color: ${C.grey}; }
.fy-val.emph { color: var(--emph); transform-origin: 100% 55%; text-shadow: 0 0 calc(12px + var(--lit) * 14px) color-mix(in srgb, var(--emph) calc(35% + var(--lit) * 30%), transparent); }
.fy-ptr { position: absolute; left: 0; top: 0; filter: drop-shadow(0 0 10px color-mix(in srgb, var(--emph, ${C.green}) 70%, transparent)); }
.fy-strip { position: absolute; }
.fy-line { position: absolute; left: 0; width: 100%; display: flex; justify-content: center; align-items: center; transform-origin: 50% 50%; }
.fy-pick { font: 400 58px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; color: ${C.white}; white-space: nowrap; }
.fy-pick em { font-style: normal; color: ${C.green}; }
.fy-pick u.mark2 { text-decoration: none; color: ${C.red}; }
.fy-formula { font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: ${C.white}; white-space: nowrap; font-variant-numeric: tabular-nums; }
.fy-formula .op { color: ${C.grey}; }
.fy-verdict { position: absolute; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
.fy-verdict-rule { width: 140px; height: 8px; border-radius: 4px; background: ${C.green}; transform-origin: 50% 50%; box-shadow: 0 0 18px rgba(43, 255, 136, 0.5); }
.fy-verdict-text { width: 100%; font: 400 92px/1.02 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; text-align: center; color: ${C.white}; transform-origin: 50% 50%; text-wrap: balance; }
.fy-verdict-text em { font-style: normal; color: ${C.green}; }
.fy-verdict-text u.mark2 { text-decoration: none; color: ${C.red}; }
`

// ---------- local helpers (candidates for lib.js; see the result notes) ----------

/** × in Anton is small and sits low: render it like ≈ (Inter Full ExtraBold, lifted) */
const axTimes = html => String(html).replace(/×/g, '<span class="ax">×</span>')

/**
 * a display string as Anton HTML with every digit in a 0.5em slot (tabular, like the odometer).
 * dense: the ≈/× glyph spans carry data-overlap-ok, because Inter Full's font box (1.21 em) is taller than a dense
 * row's pitch and reaches into the neighbouring row's box; the glyph ink itself never touches it.
 */
const tabHTML = (str, dense = false) => {
  const html = axTimes(ax(esc(str).replace(/\d/g, '<span class="fy-d">$&</span>')))
  return dense ? html.replace(/<span class="ax">/g, '<span class="ax" data-overlap-ok>') : html
}

/** a formula line: operators dimmed, the rest as written (markup stripped: the formula is plain working) */
const OPS = /([=÷×−+≈→()])/
const formulaHTML = str => bare(str).split(OPS).map(p => (p.length === 1 && OPS.test(p) ? `<span class="op">${esc(p)}</span>` : esc(p))).join('')

/** a long assumption line breaks at the " · " separator nearest its middle (never mid-phrase) */
function splitAtDot(str) {
  const parts = String(str).split(' · ')
  if (parts.length < 2) return null
  const total = bare(str).length
  let best = null
  for (let i = 1; i < parts.length; i++) {
    const a = parts.slice(0, i).join(' · '), b = parts.slice(i).join(' · ')
    const score = Math.abs(bare(a).length - total / 2)
    if (!best || score < best.score) best = { score, text: a + '\n' + b }
  }
  return best.text
}

const sum = a => a.reduce((x, y) => x + y, 0)

const T_ROW = 0.28      // a row's values sliding in
const T_LIT = 0.22      // a pick lighting its row
const FOCUS = 1.6       // seconds the other rows stay dimmed after a pick, before they recover
const SLIDE = 44        // px the values travel (from the left, so nothing ever crosses the right rail)

export default function findYourRow(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const L0 = layoutFor(spec, { hero: false })
  const limit = L0.captionsOn ? 1308 : 1472

  // ---------- data ----------
  const colsIn = Array.isArray(d.columns) ? d.columns : []
  const rowsIn = (Array.isArray(d.rows) ? d.rows : []).filter(Array.isArray)
  if (!rowsIn.length) throw new Error('find-your-row: data.rows is empty')
  const nC = clamp(Math.max(colsIn.length, ...rowsIn.map(r => r.length)), 2, 4)
  const cols = Array.from({ length: nC }, (_, j) => ({ label: '', ...(colsIn[j] || {}) }))
  let emph = cols.findIndex(c => c.emph)
  if (emph < 0) emph = nC - 1
  const emphColor = cols[emph].tone && cols[emph].tone !== 'neutral' ? toneColor(cols[emph].tone) : C.green
  const rows = rowsIn.map(r => Array.from({ length: nC }, (_, j) => (r[j] == null ? '' : String(r[j]))))
  const N = rows.length
  const rowsT = d.rowsT ?? 0.4, every = d.rowEvery ?? 0.25
  const rowT = rows.map((_, i) => (Array.isArray(d.rowT) && d.rowT[i] != null ? +d.rowT[i] : rowsT + i * every))
  const fillEnd = Math.max(...rowT)
  const picks = []
  for (const p of Array.isArray(d.pick) ? d.pick : []) {
    if (!p || !(p.row >= 0 && p.row < N)) continue
    const prev = picks.length ? picks[picks.length - 1].t : fillEnd + 1.0 - 3.0
    picks.push({ row: Math.floor(p.row), label: p.label || '', t: p.t != null ? +p.t : prev + 3.0 })
  }
  picks.sort((a, b) => a.t - b.t)
  const vd = spec.verdict && spec.verdict.text ? { t: Math.max(0, +spec.verdict.t || 0), text: spec.verdict.text } : null

  // ---------- header + footer (own footer: a long assumption line wraps at a " · " into two lines) ----------
  const head = drawHeader(stage, spec, L0)
  let footBottom = L0.footer.y - 8
  if (spec.footer) {
    const el = h('div', { class: 'fy-foot', html: richUI(spec.footer), style: { top: L0.footer.y + 'px', left: '60px', width: '960px' } })
    stage.append(el)
    if (el.scrollWidth > 960) fitText(el, 960, { minPx: 38 })
    if (el.scrollWidth > 960) {
      const two = splitAtDot(spec.footer)
      el.style.fontSize = '40px'
      if (two) setHTML(el, richUI(two))
      else { el.style.whiteSpace = 'normal'; el.style.textWrap = 'balance' }
      fitText(el, 960, { maxH: 2 * 46 + 2, minPx: 34 })
    }
    footBottom = L0.footer.y + el.offsetHeight
  }
  const stageTop = Math.max(L0.stage.y, Math.round(footBottom + 10))

  // ---------- table: measure (labels at 40 px, cells at 100 px; widths scale linearly) ----------
  const TX0 = 144, TX1 = 936, TW = TX1 - TX0      // text box (x 144-936), inside the bars (x 120-960)
  const BX0 = 120, BW = 840
  const table = h('div', { class: 'fy-table' })
  stage.append(table)
  const labels = cols.map((c, j) => {
    const el = h('div', { class: 'fy-hl' + (j ? ' r' : '') + (j === emph ? ' emph' : ''), html: keepHyphens(richUI(c.label)) })
    table.append(el)
    return el
  })
  const labelW40 = labels.map(el => el.offsetWidth)                 // widest spec line, at 40 px
  const wordProbe = h('div', { class: 'fy-hl', style: { left: '0px', top: '0px' } })
  table.append(wordProbe)
  const wordW40 = cols.map(c => Math.max(1, ...bare(c.label).split(/\s+/).filter(Boolean).map(w => { wordProbe.textContent = w; return wordProbe.offsetWidth })))
  wordProbe.remove()
  const probe = h('div', { class: 'fy-cell', style: { fontSize: '100px', left: '0px', top: '0px' } })
  table.append(probe)
  const measure = str => { setHTML(probe, tabHTML(str)); return Math.max(probe.scrollWidth, inkWidth(probe)) }
  const cellW100 = rows.map(r => r.map(measure))             // per cell, at 100 px
  const colW100 = cols.map((_, j) => Math.max(1, ...cellW100.map(r => r[j])))
  probe.remove()

  // ---------- plan: the cell size follows the row pitch, the pitch follows the label row's height, and the label
  // row's height follows how much room the cells leave the labels. Two passes settle it. ----------
  const prompt = lo.prompt ? String(lo.prompt) : ''
  const tableTop = stageTop + 10
  const formulaH0 = d.formula ? 48 : 0
  const pickH0 = picks.length || prompt ? 58 : 0
  const stackH = formulaH0 + (formulaH0 && pickH0 ? 12 : 0) + pickH0
  const MIN_GAP = 28

  // horizontal: cells keep their size unless the cells alone do not fit; labels try one line-set at 40 → 36 px,
  // and otherwise wrap inside their column slots (the free width is shared by how much each label needs)
  const hplan = (Fc, maxFl = 40) => {
    Fc = Math.max(36, Math.min(Fc, Math.floor(((TW - (nC - 1) * MIN_GAP) / sum(colW100)) * 100)))
    const cw = colW100.map(w => (w * Fc) / 100)
    for (let Fl = maxFl; Fl >= 36; Fl -= 2) {
      const ew = cw.map((c, j) => Math.max(c, (labelW40[j] * Fl) / 40))
      const gap = (TW - sum(ew)) / (nC - 1)
      if (gap >= MIN_GAP) return { Fc, Fl, ew, gap, wrap: false }
    }
    // wrap: every slot holds at least its label's longest word, then the spare width goes to the labels that
    // are furthest from fitting on their own lines
    let Fl = maxFl, ew
    for (; Fl >= 34; Fl -= 2) {
      ew = cw.map((c, j) => Math.max(c, (wordW40[j] * Fl) / 40))
      if (sum(ew) + (nC - 1) * MIN_GAP <= TW) break
    }
    Fl = Math.max(34, Fl)
    const free = Math.max(0, TW - sum(ew) - (nC - 1) * MIN_GAP)
    const need = labelW40.map((w, j) => Math.max(0, (w * Fl) / 40 - ew[j]))
    ew = ew.map((e, j) => e + (free * need[j]) / Math.max(1, sum(need)))
    return { Fc, Fl, ew, gap: (TW - sum(ew)) / (nC - 1), wrap: true }
  }
  const applyLabels = hp => {
    labels.forEach((el, j) => {
      el.style.fontSize = hp.Fl + 'px'
      el.style.lineHeight = Math.round(hp.Fl * 1.05) + 'px'
      el.style.whiteSpace = hp.wrap ? 'normal' : 'nowrap'
      el.style.width = hp.wrap ? Math.floor(hp.ew[j]) + 'px' : 'auto'
      el.style.textWrap = hp.wrap ? 'balance' : 'nowrap'
      if (hp.wrap && el.scrollWidth > hp.ew[j] + 0.5) {
        fitText(el, hp.ew[j], { minPx: 34 })
        el.style.lineHeight = Math.round(parseFloat(el.style.fontSize) * 1.05) + 'px'   // whole px: no sub-34 rounding
      }
    })
    return Math.round(Math.max(...labels.map(el => el.offsetHeight)) + 16)   // + the emph underline
  }
  const vplan = headH => {
    const rowsTop = tableTop + headH
    const pitchFor = stripH => (limit - stripH - 16 - 10 - rowsTop) / N
    let mode = lo.strip === 'swap' || lo.strip === 'stack' ? lo.strip : 'auto'
    if (mode === 'auto') mode = !(formulaH0 && pickH0) || pitchFor(stackH) >= 52 ? 'stack' : 'swap'
    const stripNeed = mode === 'stack' ? stackH : Math.max(formulaH0, pickH0)
    const P = Math.round(clamp(pitchFor(stripNeed), 40, 80) * 10) / 10
    const dense = P < 54
    const gapR = dense ? 2 : clamp(Math.round(P * 0.1), 3, 8)
    return { rowsTop, mode, stripNeed, P, dense, gapR, barH: P - gapR }
  }
  const fcFor = vp => clamp(Math.round(vp.barH * 0.86), 40, 64)
  // labels as large as possible (40 px) unless the taller label row would squeeze the rows under 44 px
  let hp, headH, vp
  for (const maxFl of [40, 38, 36, 34]) {
    hp = hplan(40, maxFl)
    headH = applyLabels(hp)
    vp = vplan(headH)
    const hp2 = hplan(fcFor(vp), maxFl)
    if (hp2.Fc !== hp.Fc || hp2.wrap !== hp.wrap || hp2.Fl !== hp.Fl) { hp = hp2; headH = applyLabels(hp); vp = vplan(headH) }
    if (vp.P >= 44 || !hp.wrap) break
  }
  const { Fc, ew, gap } = hp
  const { rowsTop, mode, P, dense, gapR, barH } = vp
  const right = ew.map((_, j) => TX0 + sum(ew.slice(0, j + 1)) + j * gap)
  right[nC - 1] = TX1

  const sb = Math.round(rowsTop + N * P + 10)
  const L = layoutFor(spec, { hero: false, stageBottom: sb })
  if (stageTop !== L.stage.y) {
    L.stage = { ...L.stage, y: stageTop, h: L.stage.h + L.stage.y - stageTop }
    L.topBar = { ...L.topBar, y1: stageTop }
  }
  // a board too dense for the strip's full size: the strip lines shrink to what is left (pick >= 44 px, formula
  // >= 34 px); past that the spec is over budget and the linter reports the collision with the caption band
  const stripFull = mode === 'stack' ? stackH : Math.max(formulaH0, pickH0)
  const squeeze = stripFull > 0 ? clamp(L.label.h / stripFull, 0, 1) : 1
  const pickH = pickH0 ? Math.round(Math.max(44, pickH0 * squeeze)) : 0
  const formulaH = formulaH0 ? Math.round(Math.max(41, formulaH0 * squeeze)) : 0

  // ---------- column labels (one size for all), emph underline ----------
  const labelBottom = rowsTop - 15
  labels.forEach((el, j) => {
    style(el, { top: labelBottom - el.offsetHeight + 'px', left: (j === 0 ? TX0 : right[j] - el.offsetWidth) + 'px' })
  })
  const hbar = h('div', { class: 'fy-hbar', 'data-deco': '' })
  table.append(hbar)
  {
    const w = Math.max(60, labels[emph].offsetWidth)
    const x0 = emph === 0 ? TX0 : right[emph] - w
    style(hbar, { left: x0 + 'px', width: w + 'px', top: labelBottom + 5 + 'px', background: emphColor, boxShadow: `0 0 12px ${emphColor}` })
  }

  // ---------- rows ----------
  const cellTop = (barH - Fc) / 2 + 0.045 * Fc               // Anton caps sit at 0.02-0.89 em: optically centred
  const skelH = Math.max(8, Math.round(Fc * 0.26))
  const R = rows.map((r, i) => {
    const el = h('div', { class: 'fy-row', style: { left: BX0 + 'px', width: BW + 'px', top: rowsTop + i * P + 'px', height: barH + 'px' } })
    style(el, { '--emph': emphColor })   // custom properties must go through css(): h() drops them
    const slot = h('div', { class: 'fy-slot' + (dense ? ' dense' : ''), 'data-deco': '' })
    const bar = h('div', { class: 'fy-bar' + (dense ? ' dense' : ''), 'data-deco': '' })
    style(bar, { '--fill': i % 2 ? (dense ? '#1A212B' : '#121820') : '#05070A' })
    const flash = h('div', { class: 'fy-flash', 'data-deco': '' })
    const skel = h('div', { 'data-deco': '', style: { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%' } })
    const key = h('div', { class: 'fy-cell fy-key', html: tabHTML(r[0], dense), style: { left: TX0 - BX0 + 'px', top: cellTop + 'px', fontSize: Fc + 'px' } })
    const vals = h('div', { style: { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%' } })
    let emphCell = null
    for (let j = 1; j < nC; j++) {
      const c = h('div', { class: 'fy-cell fy-val' + (j === emph ? ' emph' : ''), html: tabHTML(r[j], dense), style: { top: cellTop + 'px', fontSize: Fc + 'px' } })
      vals.append(c)
      if (j === emph) emphCell = c
      const w = (cellW100[i][j] * Fc) / 100
      if (r[j]) skel.append(h('div', { class: 'fy-skel', style: { left: right[j] - BX0 - w + 'px', width: w + 'px', top: (barH - skelH) / 2 + 'px', height: skelH + 'px' } }))
    }
    if (emph === 0) style(key, { color: emphColor })
    el.append(slot, skel, bar, flash, key, vals)          // the bar wipes in over the placeholders
    table.append(el)
    ;[...vals.children].forEach((c, k) => style(c, { left: right[k + 1] - BX0 - c.offsetWidth + 'px' }))
    return { el, slot, bar, flash, skel, key, vals, emphCell, y: rowsTop + i * P + barH / 2 }
  })

  // pointer (decoration): a chevron in the emphasised colour on the left margin, gliding between picked rows
  const ptrH = Math.round(clamp(barH * 0.62, 30, 46)), ptrW = Math.round(ptrH * 0.85)
  const ptr = lo.pointer === false || !picks.length ? null
    : s('svg', { class: 'fy-ptr', 'data-deco': '', width: ptrW, height: ptrH, viewBox: '0 0 34 40', preserveAspectRatio: 'none' },
      s('path', { d: 'M4 3L31 20L4 37Z', fill: emphColor, stroke: emphColor, 'stroke-width': 3, 'stroke-linejoin': 'round' }))
  if (ptr) { style(ptr, { '--emph': emphColor }); stage.append(ptr) }
  const ptrX = BX0 - 14 - ptrW

  // ---------- bottom strip: (prompt →) pick labels over the formula ----------
  const strip = h('div', { class: 'fy-strip', style: { left: (W - 800) / 2 + 'px', top: L.label.y + 'px', width: '800px', height: L.label.h + 'px' } })
  stage.append(strip)
  const blockH = mode === 'stack' ? formulaH + (formulaH && pickH ? Math.round(12 * squeeze) : 0) + pickH : Math.max(formulaH, pickH)
  const blockTop = Math.max(0, Math.round((L.label.h - blockH) / 2))
  const formulaTop = mode === 'stack' ? blockTop + blockH - formulaH : blockTop + (blockH - formulaH) / 2
  const pickTop = mode === 'stack' ? blockTop : blockTop + (blockH - pickH) / 2
  let formula = null
  if (d.formula) {
    const inner = h('div', { class: 'fy-formula', html: formulaHTML(d.formula), style: { fontSize: Math.round(formulaH / 1.2) + 'px' } })
    formula = h('div', { class: 'fy-line', style: { top: formulaTop + 'px', height: formulaH + 'px' } }, inner)
    strip.append(formula)
    fitText(inner, 800, { minPx: 34 })
  }
  const pickLine = text => {
    const inner = h('div', { class: 'fy-pick', html: axTimes(rich(text)), style: { fontSize: pickH + 'px' } })
    const line = h('div', { class: 'fy-line', style: { top: pickTop + 'px', height: pickH + 'px' } }, inner)
    strip.append(line)
    fitText(inner, 800, { minPx: Math.min(44, pickH) })
    line.__from = slamFromFor(inkWidth(inner), 792)
    style(line, { display: 'none' })
    return line
  }
  const pickEls = picks.map(p => pickLine(p.label))
  const promptEl = prompt && mode === 'stack' ? pickLine(prompt) : null

  // ---------- verdict: in the strip when it fits at a primary size, else in the header band ----------
  // (built here, not with lib's verdict(): that one fits its text while hidden, so it never shrinks)
  let verd = null
  if (vd) {
    const box = h('div', { class: 'fy-verdict' })
    const rule = h('div', { class: 'fy-verdict-rule', 'data-deco': '' })
    const txt = h('div', { class: 'fy-verdict-text', html: axTimes(rich(vd.text)) })
    box.append(rule, txt)
    stage.append(box)
    const place = slot => {
      style(box, { display: 'flex', top: slot.y + 'px', left: (W - slot.w) / 2 + 'px', width: slot.w + 'px', height: slot.h + 'px' })
      txt.style.fontSize = SIZE.verdict + 'px'
      return fitText(txt, slot.w, { maxH: slot.h - 26, minPx: SIZE.verdictMin })
    }
    const inStrip = { y: L.label.y, h: L.label.h, w: 800 }
    const inHeader = { y: L.header.y, h: L.header.h, w: L.header.w }
    let at = lo.verdictAt === 'strip' || lo.verdictAt === 'header' ? lo.verdictAt : 'auto'
    if (at !== 'header') {
      const px = place(inStrip)
      if (at === 'auto') at = L.label.h >= 110 && px >= 58 ? 'strip' : 'header'
    }
    if (at === 'header') place(inHeader)
    const from = slamFromFor(inkWidth(txt), (at === 'header' ? inHeader.w : inStrip.w) - 8, 1.12)
    style(box, { display: 'none' })
    verd = { at, box, rule, txt, from }
  }

  // ---------- sound: a soft tick per row, a thud when the board is complete, swipe + ding per pick ----------
  rowT.forEach(t => {
    if (t <= 0.05) return
    if (t === fillEnd && N > 1) ctx.cue(t, 'thud', { gain: 0.5 })
    else ctx.cue(t, 'tick', { gain: 0.38 })
  })
  picks.forEach(p => {
    if (p.t <= 0.05) return
    ctx.cue(p.t - 0.04, 'swipe', { gain: 0.42 })
    ctx.cue(p.t + 0.16, 'ding', { gain: 0.42 })
  })
  if (verd) ctx.cue(vd.t + 0.06, 'reveal', { gain: 0.7 })

  const lastBeat = Math.max(fillEnd + T_ROW, ...picks.map(p => p.t + T_LIT))
  const duration = durationOf(spec, lastBeat, d.hold ?? 4.0)
  const dimTo = clamp(lo.dim ?? 0.5, 0.3, 1)
  const dimRest = clamp(lo.dimRest ?? 0.85, dimTo, 1)

  // opacity of the unpicked rows under pick j at time t (dims as the pick lands, recovers after FOCUS)
  const levelUnder = (j, t) => {
    const pj = picks[j]
    const start = j === 0 ? 1 : levelUnder(j - 1, pj.t)
    const a = pj.t <= 0.001 ? 1 : ease.out(prog(t, pj.t, T_LIT))
    const lv = lerp(start, dimTo, a)
    return t <= pj.t + FOCUS ? lv : lerp(dimTo, dimRest, ease.inOut(prog(t, pj.t + FOCUS, 0.8)))
  }

  return {
    duration,
    layout: L,
    header: false,
    footer: false,
    verdict: false,
    seek(t) {
      // active pick, how lit each row is, how dim the others are
      let k = -1
      for (let j = 0; j < picks.length; j++) if (t >= picks[j].t) k = j
      const litOf = new Map()
      if (k >= 0) {
        const pk = picks[k]
        const p = pk.t <= 0.001 ? 1 : ease.out(prog(t, pk.t, T_LIT))
        const same = k > 0 && picks[k - 1].row === pk.row
        if (k > 0 && !same) litOf.set(picks[k - 1].row, 1 - p)
        litOf.set(pk.row, same ? 1 : p)
      }
      const others = k < 0 ? 1 : levelUnder(k, t)

      // rows
      R.forEach((r, i) => {
        const t0 = rowT[i]
        const pre = t0 <= 0.001
        const landed = pre || t >= t0
        const p = pre ? 1 : prog(t, t0, T_ROW)
        const wipe = pre ? 1 : landed ? ease.out(prog(t, t0, 0.2)) : 0
        style(r.slot, { display: wipe >= 1 ? 'none' : 'block' })
        const clip = wipe >= 1 ? 'none' : `inset(0 ${(100 * (1 - wipe)).toFixed(2)}% 0 0 round 6px)`
        style(r.bar, { display: landed ? 'block' : 'none', clipPath: clip })
        style(r.flash, { clipPath: clip })
        attr(r.key, 'class', 'fy-cell fy-key' + (landed ? ' on' : ''))
        style(r.skel, { display: wipe >= 1 ? 'none' : 'block' })
        style(r.vals, {
          visibility: landed ? 'visible' : 'hidden',
          opacity: landed ? (pre ? '1' : prog(t, t0, 0.1).toFixed(3)) : '0',
          transform: `translateX(${(-SLIDE * (1 - ease.out(p))).toFixed(1)}px)`,
        })
        style(r.flash, { opacity: (pre || !landed ? 0 : 0.16 * (1 - ease.out(prog(t, t0, 0.4)))).toFixed(3) })
        if (r.emphCell) style(r.emphCell, { transform: `scale(${(pre ? 1 : 1 + 0.1 * Math.max(0, wobble(prog(t, t0 + 0.12, M.bump)))).toFixed(4)})` })
        const lit = litOf.get(i) || 0
        let lift = lit
        for (const pk of picks) if (pk.row === i && pk.t > 0.001) lift += 1.2 * Math.max(0, wobble(prog(t, pk.t + 0.1, 0.4)))
        style(r.bar, { transform: `scale(${(1 + 0.022 * lift).toFixed(4)}, ${(1 + 0.1 * lift).toFixed(4)})` })
        style(r.el, { '--lit': lit.toFixed(3), opacity: lerp(others, 1, lit).toFixed(3), zIndex: lit > 0 ? '2' : '1' })
      })

      // pointer: enters with the first pick, glides between picks
      if (ptr) {
        if (k < 0) style(ptr, { opacity: '0' })
        else {
          const pk = picks[k]
          const y1 = R[pk.row].y
          const y0 = k > 0 ? R[picks[k - 1].row].y : y1
          const g = k > 0 ? ease.inOut(prog(t, pk.t - 0.04, 0.3)) : 1
          const enter = k === 0 && pk.t > 0.001 ? ease.back(prog(t, pk.t - 0.04, 0.3), 2) : 1
          style(ptr, { opacity: clamp(enter * 1.5).toFixed(3), transform: `translate(${(ptrX - 46 * (1 - enter)).toFixed(1)}px, ${(lerp(y0, y1, g) - ptrH / 2).toFixed(1)}px)` })
        }
      }

      // strip: prompt until the first pick, then each pick label slams in; the formula stays (stack) or gives way (swap)
      if (formula) style(formula, { display: mode === 'swap' && k >= 0 ? 'none' : 'flex' })
      if (promptEl) style(promptEl, { display: k < 0 ? 'flex' : 'none', opacity: '1', transform: 'none' })
      pickEls.forEach((line, j) => {
        if (j !== k) { style(line, { display: 'none' }); return }
        const sl = slam(t, picks[j].t, { from: line.__from })
        style(line, { display: 'flex', opacity: String(sl.o), transform: `scale(${sl.s.toFixed(4)})` })
      })

      // verdict: replaces the strip (or the header): the table always stays whole
      if (verd) {
        const v0 = vd.t <= 0.001                       // a verdict at 0 s is already landed on frame 1
        const y = v0 ? 1 : t < vd.t - 0.04 ? 0 : prog(t, vd.t - 0.04, 0.14)
        const yieldEl = verd.at === 'header' ? head.el : strip
        style(yieldEl, { opacity: String(1 - y), transform: `translateY(${(14 * y).toFixed(1)}px)`, visibility: y >= 1 ? 'hidden' : 'visible' })
        if (t < vd.t) style(verd.box, { display: 'none' })
        else {
          const sl = slam(t, v0 ? 0 : vd.t + 0.06, { from: verd.from })
          style(verd.box, { display: 'flex' })
          style(verd.txt, { opacity: String(sl.o), transform: `scale(${sl.s.toFixed(4)})` })
          style(verd.rule, { transform: `scaleX(${v0 ? '1' : ease.out(prog(t, vd.t + 0.1, 0.35)).toFixed(4)})` })
        }
      }
    },
  }
}
