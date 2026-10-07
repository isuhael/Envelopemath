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
//            left margin, and the pick label slams into the bottom strip (fitted: one line down to 52 px, else two
//            balanced lines).
// Layout: no hero row (layoutFor({ hero: false })); the stage starts under the footer (the kit footer: a long
//   assumption line breaks at its " · " into two lines and the grid makes room) and ends under the last row; the row
//   pitch (40-80 px) is what is left between the column labels and the strip. Cells are Anton with every digit in a
//   0.5em slot (tabular). Column heads are Inter caps at 40 px, on one line or two (as written, or balanced at a word
//   break); a head may reach left over the previous column's slack; only a board that can't pack them shrinks them.
//   Strip:   the bottom bar carries the formula (the one-line working) under the pick label when the table leaves
//            room; otherwise they share one slot (formula first, then each pick label as a hard cut, then the formula
//            again once the pick has held for HOLD s). A two-line pick label also gives the formula's row up while it
//            holds.
//   Verdict: the kit's one verdict slot at the foot of the frame (the chrome's): in the strip, or on a black band
//            rising over the foot of the board when the strip is short. The header keeps the hook.
// Dense boards (row pitch under 54 px) drop the slot outlines and bar borders and run as black/slate zebra stripes,
// so 40 px type never crowds a line. Each row's bar wipes in left to right as its values slide in.
//
// data: { columns: [{ label, emph?, tone? }], rows: [[display, ...]], formula, rowsT, rowEvery, rowT?, pick?, hold }
// lookOpts (all optional):
//   prompt:    ''                              a task line ("Find **your age**") in the pick slot until the first pick
//                                              (stacked strip only)
//   strip:     'auto' | 'stack' | 'swap'       formula + pick label stacked or sharing one slot (auto: by room)
//   dim:       0.5                             opacity of the other rows while a pick lands (1 = no dimming)
//   dimRest:   0.85                            what they recover to 1.6 s later
//   pointer:   true                            the green pointer on the left margin
import { h, s, css as style, setHTML, attr, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, M, W, layoutFor } from '../theme.js'
import { rich, richUI, esc, bare, keepHyphens, tabHTML as tabLib, slam, wobble, durationOf, inkWidth, slamFromFor, toneColor } from '../lib.js'

export const css = `
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
.fy-key { color: ${C.grey}; }
.fy-key.on { color: ${C.white}; }
.fy-val { color: ${C.grey}; }
.fy-val.emph { color: var(--emph); transform-origin: 100% 55%; text-shadow: 0 0 calc(12px + var(--lit) * 14px) color-mix(in srgb, var(--emph) calc(35% + var(--lit) * 30%), transparent); }
.fy-ptr { position: absolute; left: 0; top: 0; filter: drop-shadow(0 0 10px color-mix(in srgb, var(--emph, ${C.green}) 70%, transparent)); }
.fy-strip { position: absolute; }
.fy-line { position: absolute; left: 0; width: 100%; display: flex; justify-content: center; align-items: center; transform-origin: 50% 50%; }
.fy-pick { font: 400 58px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; color: ${C.white}; white-space: nowrap; text-align: center; }
.fy-pick.two { white-space: normal; text-wrap: balance; line-height: 1.04; }
.fy-pick em { font-style: normal; color: ${C.green}; }
.fy-pick u.mark2 { text-decoration: none; color: ${C.red}; }
.fy-formula { font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: ${C.white}; white-space: nowrap; font-variant-numeric: tabular-nums; }
.fy-formula .op { color: ${C.grey}; }
`

// ---------- local helpers ----------

/** a display string as Anton HTML, every digit in a 0.5em slot (lib tabHTML); dense: glyph spans may overlap rows */
const tabHTML = (str, dense = false) => tabLib(str, { ok: dense })

/** a formula line: operators dimmed, the rest as written (markup stripped: the formula is plain working) */
const OPS = /([=÷×−+≈→()])/
const formulaHTML = str => bare(str).split(OPS).map(p => (p.length === 1 && OPS.test(p) ? `<span class="op">${esc(p)}</span>` : esc(p))).join('')

const sum = a => a.reduce((x, y) => x + y, 0)

const T_ROW = 0.28      // a row's values sliding in
const T_LIT = 0.22      // a pick lighting its row
const FOCUS = 1.6       // seconds the other rows stay dimmed after a pick, before they recover
const SLIDE = 44        // px the values travel (from the left, so nothing ever crosses the right rail)
const HOLD = 2.5        // s a pick label holds before the formula comes back (swap strip, or a two-line pick)

export default function findYourRow(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage
  const L0 = layoutFor(spec, { hero: false })
  const limit = L0.limit

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

  // the header and the footer are the chrome's (a long footer breaks at its " · " and the grid makes room)
  const stageTop = L0.stage.y

  // ---------- table: measure (labels at 40 px, cells at 100 px; widths scale linearly) ----------
  const TX0 = 144, TX1 = 936, TW = TX1 - TX0      // text box (x 144-936), inside the bars (x 120-960)
  const BX0 = 120, BW = 840
  const table = h('div', { class: 'fy-table' })
  stage.append(table)
  const labels = cols.map((c, j) => {
    const el = h('div', { class: 'fy-hl' + (j ? ' r' : '') + (j === emph ? ' emph' : '') })
    table.append(el)
    return el
  })
  // each head's forms at 40 px: as written (its \n lines), and two balanced lines at the word break that makes it
  // narrowest (markup kept when both halves stay balanced)
  const probeL = h('div', { class: 'fy-hl', style: { left: '0px', top: '0px', fontSize: '40px' } })
  table.append(probeL)
  const lineW = str => { probeL.innerHTML = keepHyphens(richUI(str)); return probeL.offsetWidth }
  const balanced = str => (str.match(/\*\*/g) || []).length % 2 === 0 && (str.match(/__/g) || []).length % 2 === 0
  const forms = cols.map(c => {
    const raw = String(c.label || '')
    const asIs = raw.split('\n')
    const out = [{ lines: asIs, w: Math.max(1, ...asIs.map(lineW)) }]
    const words = raw.replace(/\n/g, ' ').split(/ +/).filter(Boolean)
    let best = null
    for (let k = 1; k < words.length; k++) {
      let a = words.slice(0, k).join(' '), b = words.slice(k).join(' ')
      if (!balanced(a)) { a = bare(a); b = bare(b) }
      const w = Math.max(lineW(a), lineW(b))
      if (!best || w < best.w) best = { lines: [a, b], w }
    }
    if (best && (asIs.length > 2 || best.w < out[0].w - 1)) out.push(best)
    return out
  })
  const wordW40 = cols.map(c => Math.max(1, ...bare(c.label).split(/\s+/).filter(Boolean).map(w => lineW(w))))
  probeL.remove()
  const probe = h('div', { class: 'fy-cell', style: { fontSize: '100px', left: '0px', top: '0px' } })
  table.append(probe)
  const measure = str => { setHTML(probe, tabHTML(str)); return Math.max(probe.scrollWidth, inkWidth(probe)) }
  const cellW100 = rows.map(r => r.map(measure))             // per cell, at 100 px
  const colW100 = cols.map((_, j) => Math.max(1, ...cellW100.map(r => r[j])))
  probe.remove()

  // ---------- plan: the cell size follows the row pitch, the pitch follows the head row's height, and the head
  // row's height follows how many lines the heads need beside the cells. Two passes settle it. ----------
  const prompt = lo.prompt ? String(lo.prompt) : ''
  const tableTop = stageTop + 10
  const formulaH0 = d.formula ? 48 : 0
  const pickH0 = picks.length || prompt ? 58 : 0
  const stackH = formulaH0 + (formulaH0 && pickH0 ? 12 : 0) + pickH0
  const MIN_GAP = 28, LGAP = 24

  // horizontal: columns pack from the left. A column's right edge sits where both its cells (28 px after the
  // previous column's cells) and its head (24 px after the previous head) fit, so a long head reaches left over the
  // previous column's slack; the slack left at the end is shared out between the columns.
  const pack = (Fc, Fl, pick) => {
    const cw = colW100.map(w => (w * Fc) / 100)
    const lw = pick.map((k, j) => (forms[j][k].w * Fl) / 40)
    let cellEnd = TX0 + cw[0], labEnd = TX0 + lw[0]
    const R = [Math.max(cellEnd, labEnd)]
    for (let j = 1; j < nC; j++) {
      const r = Math.max(cellEnd + MIN_GAP + cw[j], labEnd + LGAP + lw[j])
      R.push(r); cellEnd = r; labEnd = r
    }
    return { R, slack: TX1 - R[nC - 1] }
  }
  const hplan = (Fc0, Fl) => {
    let Fc = Math.max(36, Math.min(Fc0, Math.floor(((TW - (nC - 1) * MIN_GAP) / sum(colW100)) * 100)))
    const pick = forms.map(f => (f[0].lines.length > 2 && f[1] ? 1 : 0))
    let pk = pack(Fc, Fl, pick)
    // too wide: the head that gains most goes onto two lines, one at a time (a head is never more than 2 lines)
    while (pk.slack < 0) {
      let jb = -1, gain = 0
      forms.forEach((f, j) => { if (pick[j] === 0 && f[1] && f[0].w - f[1].w > gain) { gain = f[0].w - f[1].w; jb = j } })
      if (jb < 0) break
      pick[jb] = 1
      pk = pack(Fc, Fl, pick)
    }
    // still too wide: the cells give up a few px (never under 40)
    for (let k = 0; k < 2 && pk.slack < 0 && Fc > 40; k++) { Fc = Math.max(40, Fc - 2); pk = pack(Fc, Fl, pick) }
    return { Fc, Fl, pick, ...pk, wrap: false }
  }
  // the fallback for heads too long for two lines each: every head wraps inside its own column's slot (any number of
  // lines, balanced); each slot holds at least its head's longest word and the spare width goes where it is needed
  const fullW40 = forms.map(f => f[0].w)
  const hwrap = (Fc0, Fl) => {
    const Fc = Math.max(40, Math.min(Fc0, Math.floor(((TW - (nC - 1) * MIN_GAP) / sum(colW100)) * 100)))
    const cw = colW100.map(w => (w * Fc) / 100)
    let ew = cw.map((c, j) => Math.max(c, (wordW40[j] * Fl) / 40))
    const free = Math.max(0, TW - sum(ew) - (nC - 1) * MIN_GAP)
    const need = fullW40.map((w, j) => Math.max(0, (w * Fl) / 40 - ew[j]))
    ew = ew.map((e, j) => e + (free * need[j]) / Math.max(1, sum(need)))
    const R = ew.map((_, j) => TX0 + sum(ew.slice(0, j + 1)) + (j * (TW - sum(ew))) / Math.max(1, nC - 1))
    return { Fc, Fl, ew, R, slack: TW - sum(ew) - (nC - 1) * MIN_GAP, wrap: true, pick: forms.map(() => 0) }
  }
  const applyLabels = hp => {
    labels.forEach((el, j) => {
      el.style.fontSize = hp.Fl + 'px'
      el.style.lineHeight = Math.round(hp.Fl * 1.05) + 'px'
      if (hp.wrap) {
        setHTML(el, keepHyphens(richUI(String(cols[j].label || '').replace(/\n/g, ' '))))
        Object.assign(el.style, { whiteSpace: 'normal', textWrap: 'balance', width: Math.floor(hp.ew[j]) + 'px' })
      } else {
        setHTML(el, forms[j][hp.pick[j]].lines.map(l => keepHyphens(richUI(l))).join('<br>'))
        Object.assign(el.style, { whiteSpace: 'nowrap', textWrap: 'nowrap', width: 'auto' })
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
  // heads at 40 px on at most two lines when they pack beside the cells; else wrapped in their slots at 40 px; only
  // then smaller (38 → 34), as long as the head row leaves the rows a pitch of 44 px
  let hp, headH, vp
  const tries = [[hplan, 40], [hwrap, 40], [hplan, 38], [hplan, 36], [hwrap, 38], [hwrap, 36], [hplan, 34], [hwrap, 34]]
  for (const [plan, Fl] of tries) {
    hp = plan(64, Fl)
    headH = applyLabels(hp)
    vp = vplan(headH)
    const hp2 = plan(fcFor(vp), Fl)
    if (hp2.Fc !== hp.Fc || hp2.pick.join() !== hp.pick.join()) { hp = hp2; headH = applyLabels(hp); vp = vplan(headH) }
    if (hp.slack >= 0 && vp.P >= 44) break
  }
  const { Fc } = hp
  const { rowsTop, mode, P, dense, gapR, barH } = vp
  const right = hp.wrap ? hp.R.slice() : hp.R.map((r, j) => (j ? r + (Math.max(0, hp.slack) * j) / (nC - 1) : r))
  right[nC - 1] = TX1

  const sb = Math.round(rowsTop + N * P + 10)
  const L = layoutFor(spec, { hero: false, stageBottom: sb })
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
  const strip = h('div', { class: 'fy-strip', 'data-yield': '', style: { left: (W - 800) / 2 + 'px', top: L.label.y + 'px', width: '800px', height: L.label.h + 'px' } })
  stage.append(strip)
  const blockH = mode === 'stack' ? formulaH + (formulaH && pickH ? Math.round(12 * squeeze) : 0) + pickH : Math.max(formulaH, pickH)
  const blockTop = Math.max(0, Math.round((L.label.h - blockH) / 2))
  const formulaTop = mode === 'stack' ? blockTop + blockH - formulaH : blockTop + (blockH - formulaH) / 2
  const pickTop = mode === 'stack' ? blockTop : blockTop + (blockH - pickH) / 2
  let formula = null
  if (d.formula) {
    const inner = h('div', { class: 'fy-formula', html: formulaHTML(d.formula), style: { fontSize: (formulaH >= 44 ? 40 : Math.round(formulaH / 1.2)) + 'px' } })
    formula = h('div', { class: 'fy-line', style: { top: formulaTop + 'px', height: formulaH + 'px' } }, inner)
    strip.append(formula)
    // the working stays at 40 px: wider than the strip's 800 px, it may use x 60-940 (left of the rail), centred there
    const fs = parseFloat(inner.style.fontSize)
    if (fs >= 40 && inner.scrollWidth > 800.5) style(formula, { left: '-80px', width: '880px' })
    fitText(inner, inner.scrollWidth > 800.5 ? 880 : 800, { minPx: 34 })
  }
  // a pick label: one line, fitted to the strip's 800 px down to 52 px; longer: two balanced lines (>= 40 px) centred on
  // the strip, and the formula gives its row up while it holds
  const pickLine = text => {
    const inner = h('div', { class: 'fy-pick', html: rich(text), style: { fontSize: pickH + 'px' } })
    const line = h('div', { class: 'fy-line', style: { top: pickTop + 'px', height: pickH + 'px' } }, inner)
    strip.append(line)
    fitText(inner, 800, { minPx: Math.min(52, pickH), step: 1 })
    line.__two = false
    if (inner.scrollWidth > 800.5) {
      inner.classList.add('two')
      style(inner, { width: '800px', fontSize: pickH + 'px' })
      fitText(inner, 800, { maxH: Math.max(pickH, L.label.h - 6), minPx: 42, step: 1 })   // 42: the slam's undershoot stays >= 40
      const hh = inner.offsetHeight
      style(line, { top: Math.max(0, Math.round((L.label.h - hh) / 2)) + 'px', height: hh + 'px' })
      line.__two = true
    }
    line.__from = slamFromFor(inkWidth(inner), 792)
    style(line, { display: 'none' })
    return line
  }
  const pickEls = picks.map(p => pickLine(p.label))
  const promptEl = prompt && mode === 'stack' ? pickLine(prompt) : null
  // until when pick j's label shows: the next pick; in a shared slot (swap) or as two lines, HOLD s at most, then the
  // formula comes back (the row stays lit and the pointer stays on it)
  const pickEnd = picks.map((p, j) => {
    const next = j + 1 < picks.length ? picks[j + 1].t : Infinity
    return formula && (mode === 'swap' || pickEls[j].__two) ? Math.min(next, p.t + HOLD) : next
  })

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

      // strip: prompt until the first pick, then each pick label slams in; the formula stays (stack, one-line pick) or
      // gives way while a pick label holds (swap, or a two-line pick) and comes back after it
      const showing = k >= 0 && t < pickEnd[k] ? k : -1
      if (formula) style(formula, { display: showing >= 0 && (mode === 'swap' || pickEls[showing].__two) ? 'none' : 'flex' })
      if (promptEl) style(promptEl, { display: k < 0 ? 'flex' : 'none', opacity: '1', transform: 'none' })
      pickEls.forEach((line, j) => {
        if (j !== showing) { style(line, { display: 'none' }); return }
        const sl = slam(t, picks[j].t, { from: line.__from })
        style(line, { display: 'flex', opacity: String(sl.o), transform: `scale(${sl.s.toFixed(4)})` })
      })
      // (the verdict and the strip's yield are the chrome's: the kit's one verdict slot)
    },
  }
}
