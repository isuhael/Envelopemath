// what-difference — "What difference does X make?" (P5) on the Clean Sheet.
//
// One fixed stake (a debt or a pot of money) worked out 2-4 ways. Frame 1 is the whole question: the header,
// the stake on a yellow "given" row, the metric column heads ("Paid off in", "Interest") and every option already
// named in its numbered block, with empty dashed slots where its results will land, so the viewer can guess
// before the maths arrives. Each option then runs the sheet grammar: its circle fills, its working types in grey
// mono, each metric lands on the green result highlighter in its own aligned column, and the difference (delta)
// lands at the right of the option's name line. An optional accent note under an option types the "why". Finished
// options rest (lighter boxes) so the newest number is the loud one. At the winner beat the winner's results
// re-wipe on the blue final-answer highlighter, its circle fills, every other box rests (coral and deltas too), and
// a pointer lands beside its delta. The finished sheet holds, then clears back to its frame-1 state for the loop.
//
// Layout engine (measured with the real fonts at mount). Columns are measured: the first metric is left-aligned on
// the text column, the others right-aligned and packed leftwards from the rail (x 940) with a 24 px+ gap. Block
// shapes:
//   split   name line (+ delta) / working line / results line                                working stays
//   mixed   per option: the working on the name line when it fits there, else on its own line     working stays
//   swap    name line (+ delta) / results line; the working stays on the name line where it fits there, and only
//           where it does not it types on the results line (its slots step aside) and the first highlighter
//           erases it. The last resort.
// Each shape also has a compact tier: names and working set solid at 40 px, slimmer boxes, results 54 -> 44 px
// (under 50 only with every metric on one line), small gaps (about 150 px per option).
// Candidates by cost, cheapest first: smaller type (1 per %, <= 22), tight gaps (23), each metric stacked on its own
// labelled line (46: "Total paid ······ [$35,220]"), no check line (100), the compact tier (200+), swap (400). So the
// working outranks the check, the check outranks the compact tier. Nothing fits: the candidate that misses by the
// least (never a fixed shape), with a console warning; a mount-time assert warns when anything readable ends below
// the work area. stake.terms is dropped when the footer already states it (lookOpts.terms).
// An option whose beats all land by t <= 0 is pre-filled: part of frame 1, kept through the loop clear.
//
// Spec extensions (all optional): option.resultT (first metric lands, default t + typing + 0.35), option.valueEvery
// (gap between metrics, 0.5 s), option.deltaT, option.note / option.noteT (an accent line typed under the option's
// results); data.typeDur; data.winnerT (default verdict.t + 0.28); data.check / data.checkT or lookOpts.check
// (a string or { t, text }: an accent "check:" line under the sheet, hung under its sum when long); metrics[j].tone (that
// column's highlighter; default the green result, a "bad" option uses coral).
// lookOpts: loop (true) · layout ('split' | 'mixed' | 'swap'; 'inline' = 'mixed') · pointer (true) · slots (true) ·
// terms ('auto' | 'show' | 'hide') · debug (logs every layout candidate and why it failed) · badge (ignored).
import { h, css as style, prog, ease, lerp, clamp, plain } from '../../../runtime/core.js'
import { C, SIZE, GRID, MOTION, md, hlBox, typeLine, stepCircle, pointer, fade, blink, landing, durationOf, typeTime, readCheck, breakLine } from '../lib.js'

export const css = `
.wd > * { position: absolute; }
.wd-name { white-space: nowrap; font: 700 46px/1.15 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.wd-name em { font-style: normal; color: #2F6FEB; }
.wd-name u.mark2 { text-decoration: none; color: #B42318; }
.wd-stake { display: flex; align-items: center; gap: 22px; white-space: nowrap; }
.wd-stake-label { font: 700 46px/1 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.wd-terms { white-space: nowrap; font: 500 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.wd-terms em { font-style: normal; color: #15171C; font-weight: 600; }
.wd-head, .wd-mlabel { white-space: nowrap; font: 700 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.wd-mlabel { font-weight: 600; }
.wd-rule { height: 2px; background: #E3DFD4; border-radius: 1px; }
.wd-slot { box-sizing: border-box; border: 3px dashed #C9D1DB; border-radius: 10px; }
.wd-note, .wd-check { white-space: pre; }
`

const SCALES = [1, 0.96, 0.93, 0.9, 0.87, 0.84, 0.81, 0.78]
const MIN_SCALE = { split: 0.78, mixed: 0.78, swap: 0.78 }
const FLOOR = { name: 40, detail: 40, result: 50, delta: 46 }
// compact tier (the last resort before the working is erased): 40 px names and working set solid, slimmer boxes, the
// results at these sizes (under 50 px only with every metric on one line, like a table's cells)
const COMPACT = [54, 50, 46, 44]
const DELTA = 0.86 // delta box size relative to the results
const COL_GAP = 28 // between result columns (never under 24)
const RAISE = 14   // tight layouts start this much closer to the footer

export default function whatDifference(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const useSlots = LO.slots !== false
  const options = (d.options || []).slice(0, 4)
  const metrics = (d.metrics && d.metrics.length ? d.metrics : [{ key: 'value', label: '' }]).slice(0, 4)
  const M = metrics.length
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < options.length ? d.winner : -1
  const typeDur = d.typeDur != null ? +d.typeDur : null
  const debug = !!LO.debug

  // ---------------------------------------------------------------- timing
  const T = []
  options.forEach((o, i) => {
    const prev = T[i - 1]
    const t0 = o.t != null ? +o.t : prev ? prev.end + 2.2 : 1.0
    const typeD0 = typeDur != null ? typeDur : Math.min(1.1, typeTime(o.detail || ''))
    let res = o.resultT != null ? +o.resultT : t0 + (o.detail ? typeD0 : 0) + 0.35
    if (res < t0 + 0.15) res = t0 + 0.15
    const typeD = Math.max(0.12, Math.min(typeD0, res - t0 - 0.1))
    const every = o.valueEvery != null ? +o.valueEvery : 0.5
    const valT = metrics.map((m, j) => res + j * every)
    const lastVal = valT[valT.length - 1]
    const deltaT = o.delta ? (o.deltaT != null ? +o.deltaT : lastVal + 0.6) : null
    const land = deltaT != null ? Math.max(deltaT, lastVal) : lastVal
    const noteT = o.note ? (o.noteT != null ? +o.noteT : land + 0.6) : null
    const noteD = o.note ? typeTime(o.note) : 0
    let act = t0 - MOTION.activate
    if (i === 0 && t0 <= 0.9) act = -1 // option 1 is already the active one on frame 1
    T.push({ t0, typeD, valT, deltaT, noteT, noteD, act, end: o.note ? Math.max(land, noteT + noteD) : land })
  })
  T.forEach((x, i) => { x.next = T[i + 1] ? Math.max(T[i + 1].act, x.end + 0.4) : Infinity })
  const lastEnd = T.length ? Math.max(...T.map(x => x.end)) : 1
  const hasVerdict = !!(spec.verdict && spec.verdict.text && spec.verdict.t != null)
  const wT = winner < 0 ? Infinity : d.winnerT != null ? +d.winnerT : hasVerdict ? +spec.verdict.t + 0.28 : lastEnd + 1.2

  const chk = readCheck(d, LO)
  const checkT = chk ? (chk.t != null ? chk.t : lastEnd + 1.0) : Infinity

  // ---------------------------------------------------------------- DOM
  const root = h('div', { class: 'wd' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)

  // the stake: "Car loan [$30,000]  6.5% APR · 60 months" (terms drop to a second line when they do not fit, and
  // leave altogether when the footer already states them)
  const st = d.stake || {}
  let stake = null
  if (st.value || st.label) {
    const box = st.value ? hlBox({ html: md(st.value), tone: 'input', px: 58 }) : null
    const label = st.label ? h('div', { class: 'wd-stake-label', html: md(st.label) }) : null
    const el = h('div', { class: 'wd-stake' }, label, box && box.el)
    const terms = st.terms ? h('div', { class: 'wd-terms', html: md(st.terms) }) : null
    root.append(el)
    if (terms) root.append(terms)
    stake = { el, box, label, terms }
  }
  const termsMode = LO.terms || 'auto'
  const norm = s0 => plain(String(s0 || '')).toLowerCase().replace(/\s+/g, ' ').trim()
  const footerTxt = norm(spec.footer) + ' ' + norm(spec.header)
  const termsSaid = !!st.terms && norm(st.terms).split(/\s*[·;]\s*/).filter(Boolean).every(p => footerTxt.includes(p))
  const termsOn = !!(stake && stake.terms) && (termsMode === 'show' || (termsMode !== 'hide' && !termsSaid))
  if (stake && stake.terms && !termsOn) style(stake.terms, { display: 'none' })

  // metric column heads + hairline
  const showHeads = metrics.some(m => m.label)
  const heads = metrics.map(m => {
    const el = h('div', { class: 'wd-head', html: md(m.label || '') })
    root.append(el)
    return el
  })
  const headRule = h('div', { class: 'wd-rule', 'data-deco': '' })
  root.append(headRule)

  const R = options.map((o, i) => {
    const circle = stepCircle(i + 1)
    const name = h('div', { class: 'wd-name', html: md(o.name || '') })
    const detail = o.detail ? typeLine({ text: o.detail, px: SIZE.formula }) : null
    const vals = metrics.map(m => {
      const v = o.values ? o.values[m.key] : null
      if (v == null || v === '') return null
      const box = hlBox({ html: md(String(v)), tone: m.tone || (o.tone === 'bad' ? 'bad' : 'good'), px: SIZE.result, retone: 'goal' })
      return { box }
    })
    const slots = metrics.map(() => {
      const el = h('div', { class: 'wd-slot', 'data-deco': '' })
      root.append(el)
      return el
    })
    // a stacked metric's inline label ("Total paid") on its own results line
    const mlabels = metrics.map(m => {
      const el = h('div', { class: 'wd-mlabel', html: md(m.label || '') })
      root.append(el)
      return el
    })
    const delta = o.delta ? hlBox({ html: md(o.delta), tone: o.tone === 'bad' ? 'bad' : 'good', px: SIZE.result }) : null
    const note = o.note ? typeLine({ text: o.note, px: SIZE.check, color: C.accent, weight: 500, cls: 'wd-note' }) : null
    root.append(circle.el, name)
    if (detail) root.append(detail.el)
    for (const v of vals) if (v) root.append(v.box.el)
    if (delta) root.append(delta.el)
    if (note) root.append(note.el)
    return { o, circle, name, detail, vals, slots, mlabels, delta, note, place: 'split' }
  })
  const hasDelta = R.some(r => r.delta)

  // the check line: two lines (broken before "=" / an operator) when it is too long for the column
  let check = null
  if (chk) {
    const br = breakLine(root, chk.text, P.right - GRID.textX)
    check = typeLine({ text: br.text, px: SIZE.check, color: C.accent, weight: 500, cls: 'wd-check' })
    check.lines = br.lines
    root.append(check.el)
  }
  const checkD = check ? typeTime(chk.text) : 0

  const pt = LO.pointer !== false && winner >= 0 ? pointer({ dir: 'left', size: 56 }) : null
  if (pt) root.append(pt.el)

  // ---------------------------------------------------------------- layout engine
  const right = P.right
  const textX = GRID.textX
  const W = el => el.getBoundingClientRect().width
  const padOf = px => 14 * Math.sqrt(px / SIZE.result)

  function metricsAt(sc, tight = false, cr = 0) {
    if (cr) {
      // compact: every line set solid at the floors, boxes that hug their figures, small gaps (~150 px per block)
      return {
        // (line boxes tight, but the glyph boxes of the name and the mono working never overlap: Inter's content area
        // is 1.21 em, Plex Mono's 1.3 em)
        name: FLOOR.name, nameLH: 1.1, detail: FLOOR.detail, detLH: 1.12,
        result: cr, boxK: 1.16, delta: Math.max(40, Math.round(cr * 0.84)),
        circle: 56, stake: 52, stakeK: 1.25, headH: 46, stakePx: 42, checkGap: 16,
        gDetail: 1, gRes: 4, gap: 10, gNote: 4, gStake: 12, gHead: 6, gStack: 6,
      }
    }
    const result = Math.max(FLOOR.result, Math.round(SIZE.result * sc))
    const g = tight ? 0.6 : 1 // tight: the last resort before overflowing, gaps shrink before type does
    return {
      name: Math.max(FLOOR.name, Math.round(SIZE.label * sc)), nameLH: 1.15,
      detail: Math.max(FLOOR.detail, Math.round(48 * sc)), detLH: 1.2,
      result, boxK: 1.3, delta: Math.max(FLOOR.delta, Math.round(result * DELTA)),
      circle: Math.round(SIZE.circle * Math.max(0.86, sc)),
      stake: Math.round(58 * Math.max(0.9, sc)), stakeK: 1.3, headH: 52,
      stakePx: Math.max(40, Math.round(46 * Math.max(0.9, sc))), checkGap: Math.round(26 * sc),
      gDetail: Math.round(4 * sc), gRes: Math.round(12 * sc * (tight ? 0.7 : 1)), gap: Math.round(30 * sc * g), gNote: Math.round(8 * sc),
      gStake: Math.round(30 * sc * g), gHead: Math.round(14 * sc * g), gStack: Math.round(10 * sc * g),
    }
  }

  // place everything for one candidate c = { mode, sc, cr (compact result px), slot ('head' | 'tail'), tight, k1
  // (metrics on the first results line), check }; returns { fits, fitsW, height, why }
  function place(c, extra = 0) {
    const m = metricsAt(c.sc, c.tight, c.cr)
    let fitsW = true
    const why = []
    const fail = k => { fitsW = false; why.push(k) }
    const top0 = P.top - (c.tight ? RAISE : 0) // a dense sheet starts a little closer to the footer
    let y = top0
    // stake row
    if (stake) {
      const sh = Math.round(m.stake * m.stakeK)
      if (stake.box) stake.box.setPx(m.stake, sh)
      if (stake.label) style(stake.label, { fontSize: m.stakePx + 'px' })
      style(stake.el, { left: GRID.left + 'px', top: y + 'px', height: sh + 'px' })
      const rowW = W(stake.el)
      if (GRID.left + rowW > right) fail('stake')
      let bottom = y + sh
      if (termsOn) {
        const tw = W(stake.terms)
        if (GRID.left + rowW + 28 + tw <= right) {
          style(stake.terms, { left: Math.round(GRID.left + rowW + 28) + 'px', top: Math.round(y + (sh - 46) / 2 + 2) + 'px' })
        } else {
          style(stake.terms, { left: GRID.left + 'px', top: Math.round(y + sh + 4) + 'px' })
          if (GRID.left + tw > right) fail('terms')
          bottom = y + sh + 4 + 46
        }
      }
      y = bottom + m.gStake + extra
    }
    // columns: every box measured at this size; a column is as wide as its widest box
    const pad = padOf(m.result)
    const boxH = Math.round(m.result * m.boxK)
    const dH = Math.round(m.delta * m.boxK)
    const colW = metrics.map(() => 0)
    let deltaW = 0
    for (const r of R) {
      r.vals.forEach((v, j) => { if (v) { v.box.setPx(m.result, boxH); v.w = Math.ceil(W(v.box.el)); colW[j] = Math.max(colW[j], v.w) } })
      if (r.delta) { r.delta.setPx(m.delta, dH); r.deltaW = Math.ceil(W(r.delta.el)); deltaW = Math.max(deltaW, r.deltaW) }
    }
    const k1 = Math.min(c.k1, M)
    const L = [], Rt = []
    L[0] = Math.round(textX - pad)
    Rt[0] = L[0] + colW[0]
    let tailL = null
    if (c.slot === 'tail') {
      // left-packed columns, the delta after them
      for (let j = 1; j < k1; j++) { L[j] = Rt[j - 1] + COL_GAP; Rt[j] = L[j] + colW[j] }
      tailL = Rt[k1 - 1] + COL_GAP
      if (Rt[k1 - 1] > right) fail('cols')
      if (tailL + deltaW > right) fail('tail')
    } else if (k1 > 1) {
      // the first column on the text column; the others right-aligned, packed leftwards from the rail
      Rt[k1 - 1] = right
      for (let j = k1 - 1; j >= 1; j--) { L[j] = Rt[j] - colW[j]; if (j > 1) Rt[j - 1] = L[j] - COL_GAP }
      if (Rt[0] + COL_GAP > L[1]) fail('cols')
    }
    if (Rt[0] > right) fail('col0')
    for (let j = k1; j < M; j++) { Rt[j] = right; L[j] = right - colW[j] } // stacked metrics: on the rail
    const alignR = j => j > 0 && (j >= k1 || c.slot !== 'tail')
    const boxLeft = (j, w) => (alignR(j) ? Math.round(Rt[j] - w) : L[j])
    // heads (line-1 metrics only), aligned with the text inside each column's boxes, + hairline
    for (let j = 0; j < M; j++) style(heads[j], { display: showHeads && j < k1 ? '' : 'none' })
    if (showHeads) {
      const hx = heads.slice(0, k1).map((el, j) => {
        const hw = W(el)
        return { hw, hl: alignR(j) ? Rt[j] - pad - hw : L[j] + pad }
      })
      hx.forEach((x, j) => {
        style(heads[j], { left: Math.round(x.hl) + 'px', top: y + 'px' })
        const lim = j < k1 - 1 ? hx[j + 1].hl - 24 : right
        if (x.hl + x.hw > lim) fail('head' + j)
      })
      style(headRule, { left: GRID.left + 'px', top: (y + m.headH - 2) + 'px', width: (right - GRID.left) + 'px', display: '' })
      y += m.headH + m.gHead + Math.round(extra * 0.5)
    } else style(headRule, { display: 'none' })
    // option blocks
    R.forEach((r, i) => {
      style(r.name, { fontSize: m.name + 'px', lineHeight: m.nameLH, width: '', height: '', whiteSpace: '', textWrap: '' })
      let nameH = Math.round(m.name * m.nameLH)
      let nameW = W(r.name)
      // a long name that would run into its delta wraps onto two balanced lines beside it
      if (r.delta && c.slot === 'head' && c.mode !== 'mixed' && textX + nameW + 28 > right - r.deltaW) {
        const nw = Math.floor(right - r.deltaW - 28 - textX)
        style(r.name, { width: nw + 'px', whiteSpace: 'normal', textWrap: 'balance' })
        const lines = Math.round(r.name.getBoundingClientRect().height / nameH)
        if (lines > 2 || r.name.scrollWidth > nw + 1) fail('name' + i)
        nameH *= lines
        nameW = nw
      }
      if (r.detail) { r.detail.setPx(m.detail); style(r.detail.el, { lineHeight: m.detLH }) }
      const detW = r.detail ? Math.ceil(r.detail.measure()) : 0
      const detH = Math.round(m.detail * m.detLH)
      const deltaOnHead = r.delta && c.slot === 'head'
      // where the working goes: its own line (split), on the name line (mixed, when it fits), the results line (swap,
      // only where it does not fit on the name line: there it stays, so a swap sheet keeps every working it can)
      const inlineW = textX + nameW + Math.round(30 * c.sc) + detW
      const inlineFits = r.detail && inlineW + (deltaOnHead ? 28 + r.deltaW : 0) <= right
      r.place = !r.detail ? 'none' : (c.mode === 'mixed' || c.mode === 'swap') && inlineFits ? 'inline' : c.mode === 'swap' ? 'swap' : 'split'
      const split = r.place === 'split'
      // split: the delta centres on the name + working block when the working clears it, else it sits on the name
      // line and the working starts under the delta's box
      const besideDelta = !deltaOnHead || textX + detW + 28 <= right - r.deltaW
      let pairH = split ? nameH + m.gDetail + detH : nameH
      let detTop = 0
      let headH, cy, nameTop
      if (split) {
        // the circle may overhang the gap above a little (never into the head rule)
        const ovh = i === 0 && showHeads ? Math.max(0, Math.min(6, m.gHead - 6)) : 6
        nameTop = y + Math.max(0, Math.round((m.circle - nameH) / 2) - ovh)
        cy = nameTop + nameH / 2
        detTop = besideDelta ? nameTop + nameH + m.gDetail : Math.max(nameTop + nameH + m.gDetail, Math.round(cy + dH / 2 + 2))
        pairH = detTop + detH - nameTop
        const pairMid = nameTop + pairH / 2
        headH = Math.max(nameTop + pairH, cy + m.circle / 2 - 4, deltaOnHead ? (besideDelta ? pairMid : cy) + dH / 2 : 0) - y
      } else {
        headH = Math.max(m.circle, nameH, deltaOnHead ? dH : 0, r.place === 'inline' ? detH : 0)
        cy = y + headH / 2
        nameTop = Math.round(cy - nameH / 2)
      }
      const deltaMid = split && besideDelta ? nameTop + pairH / 2 : cy
      r.circle.setSize(m.circle)
      style(r.circle.el, { left: Math.round(GRID.stepX + (SIZE.circle - m.circle) / 2) + 'px', top: Math.round(cy - m.circle / 2) + 'px' })
      style(r.name, { left: textX + 'px', top: Math.round(nameTop) + 'px', height: nameH + 'px' })
      let lineRight = textX + nameW
      if (r.place === 'inline') {
        const dl = Math.round(lineRight + 30 * c.sc)
        style(r.detail.el, { left: dl + 'px', top: Math.round(cy - detH / 2) + 'px' })
        lineRight = dl + detW
      }
      if (split) {
        style(r.detail.el, { left: textX + 'px', top: Math.round(detTop) + 'px' })
        if (besideDelta) lineRight = Math.max(lineRight, textX + detW)
        if (textX + detW > right) fail('detail' + i)
      }
      if (deltaOnHead) {
        style(r.delta.el, { position: 'absolute', left: Math.round(right - r.deltaW) + 'px', top: Math.round(deltaMid - dH / 2) + 'px' })
        if (lineRight + 28 > right - r.deltaW) fail('delta' + i)
      } else if (lineRight > right) fail('line' + i)
      let rowTop = Math.round(y + headH + m.gRes)
      if (r.place === 'swap') {
        style(r.detail.el, { left: textX + 'px', top: Math.round(rowTop + (boxH - detH) / 2) + 'px' })
        if (textX + detW > right) fail('swap' + i)
        r.detail.el.setAttribute('data-overlap-ok', '')
      } else if (r.detail) r.detail.el.removeAttribute('data-overlap-ok')
      r.rowTops = []
      r.vals.forEach((v, j) => {
        let top = rowTop
        if (j >= k1) top = rowTop + (j - k1 + 1) * (boxH + m.gStack) // a stacked metric's own line
        r.rowTops[j] = top
        if (v) { v.left = boxLeft(j, v.w); style(v.box.el, { position: 'absolute', left: v.left + 'px', top: top + 'px' }) }
        const sl = alignR(j) ? Rt[j] - colW[j] : L[j]
        style(r.slots[j], { left: Math.round(sl) + 'px', top: top + 4 + 'px', width: colW[j] + 'px', height: boxH - 8 + 'px', display: v ? '' : 'none' })
        // stacked: the metric's label sits on the text column of its line
        const ml = r.mlabels[j]
        if (j >= k1 && v && metrics[j].label) {
          style(ml, { display: '', left: textX + 'px', top: Math.round(top + (boxH - 46) / 2) + 'px' })
          if (textX + W(ml) + 24 > Math.round(Rt[j] - colW[j])) fail('mlabel' + j)
        } else style(ml, { display: 'none' })
      })
      const lines = Math.max(1, M - k1 + 1)
      if (r.delta && c.slot === 'tail') style(r.delta.el, { position: 'absolute', left: Math.round(tailL) + 'px', top: Math.round(rowTop + (boxH - dH) / 2) + 'px' })
      if (r.delta) r.deltaBox = { x: parseFloat(r.delta.el.style.left), y: parseFloat(r.delta.el.style.top), w: r.deltaW, h: dH }
      r.rowTop = rowTop
      r.boxH = boxH
      y = rowTop + lines * boxH + (lines - 1) * m.gStack
      if (r.note) {
        r.note.setPx(SIZE.check)
        y += m.gNote
        style(r.note.el, { left: textX + 'px', top: y + 'px' })
        if (textX + r.note.measure() > right) fail('note' + i)
        y += Math.round(SIZE.check * 1.2)
      }
      if (i < R.length - 1) y += m.gap + extra
    })
    if (check) {
      style(check.el, { display: c.check ? '' : 'none' })
      if (c.check) {
        check.setPx(SIZE.check)
        y += m.checkGap + Math.min(extra, 14)
        style(check.el, { left: textX + 'px', top: y + 'px' })
        if (textX + check.measure() > right + 1) fail('check')
        y += Math.round(SIZE.check * 1.2) * check.lines
      }
    }
    const height = y - top0
    const room = P.bottom - top0
    if (height > room) why.push(`h ${Math.round(height)} > ${room}`)
    if (debug) console.log(`[wd] ${JSON.stringify(c)} ${why.join(',') || 'FITS'}`)
    return { fits: fitsW && height <= room, fitsW, height, room, why }
  }

  const slots = hasDelta ? ['head', 'tail'] : ['head']
  const forced = LO.layout ? (LO.layout === 'inline' ? 'mixed' : LO.layout) : null
  const modes = forced ? [forced] : ['split', 'mixed', 'swap']
  const checks = check ? [true, false] : [false]
  // Candidates by cost, cheapest first. Smaller type (1 per %, at most 22), tight gaps (23), each metric stacked on
  // its own labelled line (46), no check line (100), the compact tier (200 + 1 per px under 54), the working erased
  // where it does not fit on the name line (swap, 400). So: the working outranks the check, the check outranks the
  // compact tier, and one results line at a smaller size beats a stack of two.
  const cands = []
  for (const ck of checks) for (const mode of modes) for (let k1 = M; k1 >= 1; k1--) for (const slot of slots) {
    const base = (check && !ck ? 100 : 0) + (mode === 'swap' ? 400 : mode === 'mixed' ? 0.2 : 0) + (M - k1) * 46 + (slot === 'tail' ? 0.1 : 0)
    for (const tight of [false, true]) for (const s0 of SCALES) {
      if (s0 < MIN_SCALE[mode] - 1e-9) continue
      cands.push({ c: { mode, sc: s0, slot, tight, k1, check: ck }, cost: base + Math.round((1 - s0) * 100) + (tight ? 23 : 0) })
    }
    for (const cr of COMPACT) {
      if (cr < FLOOR.result && k1 < M) continue
      cands.push({ c: { mode, sc: cr / SIZE.result, cr, slot, tight: true, k1, check: ck }, cost: base + 200 + (54 - cr) })
    }
  }
  cands.forEach((x, k) => { x.k = k })
  cands.sort((a, b) => a.cost - b.cost || a.k - b.k)
  let chosen = null, best = null
  for (const { c } of cands) {
    const r = place(c)
    if (r.fits) { chosen = { c, height: r.height }; break }
    // the fallback: width-valid first, then the least overflow
    const over = Math.max(0, r.height - r.room) + (r.fitsW ? 0 : 10000)
    if (!best || over < best.over) best = { c, height: r.height, over, why: r.why }
  }
  // nothing fits: the candidate that misses by the least (never a fixed shape); the linter reports the overflow
  if (!chosen) {
    chosen = best
    console.warn('what-difference: no layout fits; using', JSON.stringify(best.c), '(' + best.why.join(', ') + ')')
  }
  // breathe: spend spare height on the gaps (top-aligned like a real sheet), capped so blocks stay grouped
  const gaps = Math.max(1, R.length - 1 + (stake ? 1 : 0) + (showHeads ? 0.5 : 0))
  const spare = P.bottom - P.top + (chosen.c.tight ? RAISE : 0) - chosen.height
  const extra = Math.max(0, Math.min(chosen.c.mode === 'split' ? 24 : 36, Math.floor((spare * 0.6) / gaps)))
  place(chosen.c, extra)
  const LC = chosen.c
  const checkOn = !!check && LC.check
  Object.assign(root.dataset, { mode: LC.mode, scale: String(Math.round(LC.sc * 1000) / 1000), slot: LC.slot, k1: String(LC.k1), check: String(checkOn), terms: String(termsOn) })
  if (LC.tight) root.dataset.tight = ''
  if (LC.cr) root.dataset.compact = String(LC.cr)
  // assert: nothing readable ends below the work area (it would run into the captions)
  {
    let low = 0, what = ''
    for (const e of root.querySelectorAll('.wd-name, .wd-head, .wd-mlabel, .cs-type, .cs-hl')) {
      if (e.style.display === 'none' || !e.textContent.trim()) continue
      const b = e.getBoundingClientRect().bottom
      if (b > low) { low = b; what = e.textContent.slice(0, 30) }
    }
    if (low > P.bottom + 1) console.warn(`what-difference: "${what}" ends at y ${Math.round(low)}, below the work area (${P.bottom})`)
  }

  // pointer: lands just right of the winner's delta (or of its last result), never over a number, inside the card
  let ptStop = null
  if (pt) {
    const w = R[winner]
    let lj = -1
    w.vals.forEach((v, j) => { if (v && (lj < 0 || w.rowTops[j] >= w.rowTops[lj])) lj = j })
    if (w.deltaBox) ptStop = { x: w.deltaBox.x + w.deltaBox.w + 14, y: w.deltaBox.y + w.deltaBox.h / 2 }
    else if (lj >= 0) ptStop = { x: w.vals[lj].left + w.vals[lj].w + 14, y: w.rowTops[lj] + w.boxH / 2 }
    if (ptStop) ptStop.x = Math.min(ptStop.x, GRID.card.x + GRID.card.w - 64)
  }

  // ---------------------------------------------------------------- timing that depends on the layout
  const lastBeat = Math.max(lastEnd + 0.6, isFinite(wT) ? wT + 0.8 : 0, checkOn ? checkT + checkD : 0)
  const clearLen = MOTION.clear + 0.2
  const computed = durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : MOTION.hold, tail: loop ? clearLen : 0 })
  const D = spec.duration || computed
  const clearT0 = loop ? D - clearLen : Infinity
  const cleared = loop ? D - 0.2 : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }

  // ---------------------------------------------------------------- sound: one cue per real event
  const specCue = (x, kinds) => (spec.sfx || []).some(c => Math.abs(+c.t - x) < 0.35 && (!kinds || kinds.includes(c.kind)))
  T.forEach((x, i) => {
    const r = R[i]
    if (r.detail) ctx.cue(x.t0, 'type', { dur: x.typeD, gain: 0.45 })
    r.vals.forEach((v, j) => { if (v) ctx.cue(x.valT[j] + MOTION.popDelay, 'pop', { gain: j === 0 ? 0.45 : 0.4 }) })
    if (x.deltaT != null) ctx.cue(x.deltaT + MOTION.popDelay, 'pop', { gain: 0.5 })
    if (r.note) ctx.cue(x.noteT, 'type', { dur: x.noteD, gain: 0.35 })
  })
  // the ding marks the winner only (unless the spec already rings one there)
  if (isFinite(wT) && !specCue(wT, ['ding'])) ctx.cue(wT + 0.1, 'ding', { gain: 0.55 })
  if (checkOn) ctx.cue(checkT, 'type', { dur: checkD, gain: 0.4 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.3 })

  // ---------------------------------------------------------------- seek
  // A beat at t <= 0 is part of frame 1 (an option pre-filled as the hook): it is kept through the loop clear, so the
  // last frame equals frame 1. At the reset everything is evaluated at t = 0 (the frame-1 state).
  const pre = T.map(x => x.end <= 0)
  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      const reset = t >= cleared
      const tt = reset ? 0 : t // the time each element is evaluated at (the reset shows the frame-1 state)
      const keepAt = ev => (ev <= 0 ? 1 : keep) // a beat already on frame 1 survives the clear
      const wP = isFinite(wT) ? prog(t, wT, MOTION.restIn) : 0 // winner moment: everyone else rests
      const restAt = (x, i, tq) => {
        const isWin = i === winner
        const wq = isFinite(wT) ? prog(tq, wT, MOTION.restIn) : 0
        const rq = winner < 0 ? prog(tq, lastEnd + 0.9, 0.45) : 0
        let rest = isFinite(x.next) ? prog(tq, x.next + 0.05, MOTION.restIn) * (1 - rq) : 0
        if (winner >= 0) rest = isWin ? rest * (1 - wq) : Math.max(rest, wq)
        return rest
      }
      R.forEach((r, i) => {
        const x = T[i]
        const isWin = i === winner
        // circle: filled while this option is being worked; the winner's fills again at the verdict
        const on = x.act < 0 ? 1 : prog(t, x.act, 0.32)
        const off = isFinite(x.next) ? prog(t, x.next, 0.25) : isFinite(wT) ? prog(t, wT - 0.05, 0.25) : 0
        let fill = on * (1 - off)
        if (isWin) fill = Math.max(fill, prog(t, wT, 0.32))
        fill *= keep
        if (i === 0 && x.act < 0) fill = Math.max(fill, clearP)
        r.circle.seek(fill)
        // working line: the caret waits (blinking) from activation, runs while typing
        const v0i = r.vals.findIndex(Boolean)
        const L0 = v0i >= 0 ? landing(tt, x.valT[v0i]) : { wipe: 0 }
        const swapped = r.place === 'swap'
        if (r.detail) {
          const tp = prog(tt, x.t0, x.typeD)
          const waiting = t >= Math.max(0, x.act) && t < x.t0
          const typing = t >= x.t0 && t < x.t0 + x.typeD + 0.12
          const idleFirst = i === 0 && x.act < 0 && x.t0 > 0 && (t < x.t0 || reset)
          r.detail.seek(tp, (typing && t < clearT0) || ((waiting || idleFirst) && blink(t)))
          let fo = reset || t < clearT0 ? 1 : keepAt(x.t0)
          if (swapped && v0i >= 0) {
            // the first highlighter's leading edge erases the working as it lays the result down
            const v0 = r.vals[v0i]
            const front = v0.left + L0.wipe * v0.w - textX
            style(r.detail.el, { clipPath: L0.wipe > 0 && L0.wipe < 1 ? `inset(0 0 0 ${Math.max(0, Math.round(front))}px)` : 'none' })
            fo *= L0.wipe >= 1 ? 0.35 * (1 - prog(tt, x.valT[v0i] + MOTION.wipe, 0.12)) : 1 - 0.65 * L0.wipe
          } else style(r.detail.el, { clipPath: 'none' })
          fade(r.detail.el, fo)
        }
        // results land in their columns, rest when the next option takes focus; at the winner beat every other box
        // rests (coral and deltas too) and the winner's re-wipe blue. A pre-filled option eases back to its frame-1
        // rest during the clear.
        let rest = restAt(x, i, t)
        if (pre[i]) rest = lerp(rest, restAt(x, i, 0), reset ? 1 : clearP)
        // empty slots: on the sheet from frame 1; where the working types on the results line they step aside
        const slotOff = swapped ? (x.act < 0 ? 1 : prog(t, x.act, 0.2) * (1 - clearP)) : 0
        r.vals.forEach((v, j) => {
          const L = v ? landing(tt, x.valT[j]) : { wipe: 0, text: 0 }
          const kv = v ? keepAt(x.valT[j]) : keep
          if (v) {
            v.box.seek(L.wipe * kv, L.text * kv, rest, kv * kv) // the figure fades out with its box at the clear
            v.box.seekRetone(isWin ? ease.out(prog(tt, wT + j * 0.1, MOTION.wipe)) * kv : 0, 0)
          }
          // (a stacked metric's label is part of the empty sheet, like the heads: static from frame 1)
          fade(r.slots[j], useSlots ? Math.min(1 - L.wipe * kv, j < LC.k1 ? 1 - slotOff : 1) : 0)
        })
        if (r.delta) {
          const L = landing(tt, x.deltaT)
          const kd = keepAt(x.deltaT)
          r.delta.seek(L.wipe * kd, L.text * kd, isWin ? rest : Math.max(rest, pre[i] ? lerp(wP, 0, reset ? 1 : clearP) : wP), kd * kd)
        }
        if (r.note) {
          r.note.seek(prog(tt, x.noteT, x.noteD), t >= x.noteT && t < x.noteT + x.noteD + 0.15 && t < clearT0)
          fade(r.note.el, reset ? 1 : keepAt(x.noteT))
        }
      })
      if (checkOn) {
        check.seek(t >= cleared ? 0 : prog(t, checkT, checkD), t >= checkT && t < checkT + checkD + 0.15 && t < clearT0)
        fade(check.el, t >= cleared ? 1 : keep)
      }
      if (pt) {
        if (!ptStop) { pt.seek({ o: 0 }); return }
        const p = prog(t, wT + 0.1, MOTION.glide)
        const press = prog(t, wT + 0.1 + MOTION.glide, 0.08) * (1 - prog(t, wT + 0.18 + MOTION.glide, 0.16))
        pt.seek({ x: lerp(ptStop.x + 46, ptStop.x, ease.out(p)), y: ptStop.y, o: clamp(p * 2.5) * keep, press })
      }
    },
  }
}
