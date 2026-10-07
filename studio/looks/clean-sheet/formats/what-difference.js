// what-difference — "What difference does X make?" (P5) on the Clean Sheet.
//
// One fixed stake (a debt or a pot of money) worked out 2-4 ways. Frame 1 is the whole question: the header,
// the stake on a yellow "given" row, the metric column heads ("Paid off in", "Interest") and every option already
// named in its numbered block, with empty dashed slots where its results will land, so the viewer can guess
// before the maths arrives. Each option then runs the sheet grammar: its circle fills, its working types in grey
// mono, each metric lands on a highlighter in its own aligned column, and the difference (delta) lands on green
// at the right of the option's name line. An optional accent note under an option types the "why" (the envelope
// line). Finished options rest (lighter boxes) so the newest number is the loud one. At the verdict the winner's
// results re-wipe on the blue final-answer highlighter, its circle fills, the others rest, and a pointer lands
// beside its delta. The finished sheet holds, then clears back to its frame-1 state so the short loops.
//
// Layout engine (measured with the real fonts at mount). Block shapes:
//   split   label block (name over working; circle and delta centred on it) / results line   working stays
//   inline  name + working on one line (+ delta) / results line                                  working stays
//   swap    name line (+ delta) / results line; the working types on the results line and the first highlighter
//           erases it (only when nothing else fits: long working lines, 4 options)
// split and inline are tried at each scale from the largest down (type floors respected), then swap. The delta
// sits at the right of the label block, else after the results (one slot for every option).
//
// Spec extensions (all optional): option.resultT (first metric lands, default t + typing + 0.35), option.valueEvery
// (gap between metrics, 0.5 s), option.deltaT, option.note / option.noteT (an accent line typed under the option's
// results); data.typeDur; data.winnerT (default verdict.t + 0.28); data.check / data.checkT (an accent "check:"
// line under the sheet); metrics[j].tone (that column's highlighter, default neutral sand; a "bad" option uses coral).
// lookOpts: loop (default true), layout ('split' | 'inline' | 'swap'), pointer (default true), slots (default true),
// debug (logs every layout candidate and why it failed to the console).
import { h, css as style, prog, ease, lerp, clamp } from '../../../runtime/core.js'
import { C, SIZE, GRID, MOTION, md, hlBox, typeLine, stepCircle, pointer, fade, blink, landing, durationOf, typeTime } from '../lib.js'

export const css = `
.wd > * { position: absolute; }
.wd-name { white-space: nowrap; font: 700 46px/1.15 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.wd-name em { font-style: normal; color: #2F6FEB; }
.wd-name u.mark2 { text-decoration: none; color: #B42318; }
.wd-stake { display: flex; align-items: center; gap: 22px; white-space: nowrap; }
.wd-stake-label { font: 700 46px/1 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.wd-terms { white-space: nowrap; font: 500 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.wd-terms em { font-style: normal; color: #15171C; font-weight: 600; }
.wd-head { white-space: nowrap; font: 700 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.wd-rule { height: 2px; background: #E3DFD4; border-radius: 1px; }
.wd-slot { box-sizing: border-box; border: 3px dashed #C9D1DB; border-radius: 10px; }
.wd-win { position: absolute; inset: 0; border-radius: 10px; background: #A5D8FF; opacity: 0; }
.wd-note, .wd-check { white-space: pre; }
`

const SCALES = [1, 0.96, 0.93, 0.9, 0.87, 0.84, 0.81, 0.78]
const MIN_SCALE = { split: 0.84, inline: 0.84, swap: 0.78 }
const FLOOR = { name: 40, detail: 40, result: 50, delta: 46 }
const DELTA = 0.86 // delta box size relative to the results

export default function whatDifference(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const useSlots = LO.slots !== false
  const options = (d.options || []).slice(0, 4)
  const metrics = (d.metrics && d.metrics.length ? d.metrics : [{ key: 'value', label: '' }]).slice(0, 3)
  const winner = Number.isInteger(d.winner) && d.winner >= 0 && d.winner < options.length ? d.winner : -1
  const typeDur = d.typeDur != null ? +d.typeDur : null

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

  let checkText = d.check != null ? d.check : LO.check
  if (checkText && !/^check\b/i.test(checkText)) checkText = 'check: ' + checkText
  const checkT = d.checkT != null ? +d.checkT : LO.checkT != null ? +LO.checkT : lastEnd + 1.0
  const checkD = checkText ? typeTime(checkText) : 0

  const lastBeat = Math.max(lastEnd + 0.6, isFinite(wT) ? wT + 0.8 : 0, checkText ? checkT + checkD : 0)
  const clearLen = MOTION.clear + 0.2
  const computed = durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : MOTION.hold, tail: loop ? clearLen : 0 })
  const D = spec.duration || computed
  const clearT0 = loop ? D - clearLen : Infinity
  const cleared = loop ? D - 0.2 : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }

  // ---------------------------------------------------------------- DOM
  const root = h('div', { class: 'wd' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)

  // the stake: "Car loan [$30,000]  6.5% APR · 60 months" (terms drop to a second line when they do not fit)
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
      const box = hlBox({ html: md(String(v)), tone: m.tone || (o.tone === 'bad' ? 'bad' : 'neutral'), px: SIZE.result })
      const win = h('div', { class: 'wd-win' })
      box.el.insertBefore(win, box.txt)
      return { box, win }
    })
    const slots = metrics.map(() => {
      const el = h('div', { class: 'wd-slot', 'data-deco': '' })
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
    return { o, circle, name, detail, vals, slots, delta, note }
  })
  const hasDelta = R.some(r => r.delta)

  let check = null
  if (checkText) {
    check = typeLine({ text: checkText, px: SIZE.check, color: C.accent, weight: 500, cls: 'wd-check' })
    root.append(check.el)
  }

  const pt = LO.pointer !== false && winner >= 0 ? pointer({ dir: 'left', size: 56 }) : null
  if (pt) root.append(pt.el)

  // ---------------------------------------------------------------- layout engine
  const right = P.right
  const textX = GRID.textX
  const avail = P.bottom - P.top
  const W = el => el.getBoundingClientRect().width
  const padOf = px => 14 * Math.sqrt(px / SIZE.result)

  function metricsAt(sc, tight = false) {
    const result = Math.round(SIZE.result * sc)
    const g = tight ? 0.6 : 1 // tight: the last resort before overflowing, gaps shrink before type does
    return {
      name: Math.max(FLOOR.name, Math.round(SIZE.label * sc)),
      detail: Math.max(FLOOR.detail, Math.round(48 * sc)),
      result, delta: Math.max(FLOOR.delta, Math.round(result * DELTA)),
      circle: Math.round(SIZE.circle * Math.max(0.86, sc)),
      stake: Math.round(58 * Math.max(0.9, sc)),
      gDetail: Math.round(4 * sc), gRes: Math.round(12 * sc * (tight ? 0.7 : 1)), gap: Math.round(30 * sc * g), gNote: Math.round(8 * sc),
      gStake: Math.round(30 * sc * g), gHead: Math.round(14 * sc * g), colGap: Math.round(28 * sc),
    }
  }

  // place everything for (mode, scale, delta slot, extra gap, tight gaps); returns { fits, fitsW, height }
  function place(mode, sc, slot, extra = 0, tight = false) {
    const m = metricsAt(sc, tight)
    let fits = true
    const why = []
    const fail = k => { fits = false; if (LO.debug) why.push(k) }
    let y = P.top
    // stake row
    if (stake) {
      const sh = Math.round(m.stake * 1.3)
      if (stake.box) stake.box.setPx(m.stake)
      if (stake.label) style(stake.label, { fontSize: Math.max(40, Math.round(46 * Math.max(0.9, sc))) + 'px' })
      style(stake.el, { left: GRID.left + 'px', top: y + 'px', height: sh + 'px' })
      const rowW = W(stake.el)
      if (GRID.left + rowW > right) fail(1)
      let bottom = y + sh
      if (stake.terms) {
        const tw = W(stake.terms)
        if (GRID.left + rowW + 28 + tw <= right) {
          style(stake.terms, { left: Math.round(GRID.left + rowW + 28) + 'px', top: Math.round(y + (sh - 46) / 2 + 2) + 'px' })
        } else {
          style(stake.terms, { left: GRID.left + 'px', top: Math.round(y + sh + 4) + 'px' })
          if (GRID.left + tw > right) fail(2)
          bottom = y + sh + 4 + 46
        }
      }
      y = bottom + m.gStake + extra
    }
    // columns: every box measured at this size; a column is as wide as its widest box
    const pad = padOf(m.result)
    const boxH = Math.round(m.result * 1.3)
    const dH = Math.round(m.delta * 1.3)
    const colW = metrics.map(() => 0)
    let deltaW = 0
    for (const r of R) {
      r.vals.forEach((v, j) => { if (v) { v.box.setPx(m.result); v.w = W(v.box.el); colW[j] = Math.max(colW[j], v.w) } })
      if (r.delta) { r.delta.setPx(m.delta); r.deltaW = W(r.delta.el); deltaW = Math.max(deltaW, r.deltaW) }
    }
    const colL = []
    let cx = Math.round(textX - pad)
    metrics.forEach((mm, j) => { colL.push(cx); cx += Math.ceil(colW[j]) + m.colGap })
    const resRight = cx - m.colGap
    if (resRight > right) fail(3)
    const tailL = resRight + m.colGap
    if (slot === 'tail' && tailL + deltaW > right) fail(4)
    // the last of 2-3 columns is a numeric column: right-aligned on the rail, so it shares one right edge with the
    // deltas (booktabs style). The first column stays left-aligned with the text column.
    const last = metrics.length - 1
    const alignR = last > 0 && slot !== 'tail'
    if (alignR) colL[last] = right - Math.ceil(colW[last])
    const boxLeft = (j, w) => (alignR && j === last ? Math.round(right - w) : colL[j])
    // heads (aligned with the text inside each column's boxes) + hairline
    if (showHeads) {
      const hx = heads.map((el, j) => {
        const hw = W(el)
        return { hw, hl: alignR && j === last ? right - pad - hw : colL[j] + pad }
      })
      heads.forEach((el, j) => {
        style(el, { left: Math.round(hx[j].hl) + 'px', top: y + 'px' })
        const lim = j < last ? hx[j + 1].hl - 24 : right
        if (hx[j].hl + hx[j].hw > lim) fail(5)
      })
      style(headRule, { left: GRID.left + 'px', top: (y + 50) + 'px', width: (right - GRID.left) + 'px', display: '' })
      y += 52 + m.gHead + Math.round(extra * 0.5)
    } else style(headRule, { display: 'none' })
    // option blocks
    R.forEach((r, i) => {
      style(r.name, { fontSize: m.name + 'px' })
      const nameH = Math.round(m.name * 1.15)
      const nameW = W(r.name)
      if (r.detail) r.detail.setPx(m.detail)
      const detW = r.detail ? r.detail.measure() : 0
      const detH = Math.round(m.detail * 1.2)
      const deltaOnHead = r.delta && slot === 'head'
      // split: name over working form one label block; the circle sits on the name row, the delta centres on the block
      const split = mode === 'split' && !!r.detail
      const pairH = split ? nameH + m.gDetail + detH : nameH
      let headH, cy, nameTop
      if (split) {
        nameTop = y + Math.max(0, Math.round((m.circle - nameH) / 2) - 6) // the circle may overhang the gap above a little
        cy = nameTop + nameH / 2
        const pairMid = nameTop + pairH / 2
        headH = Math.max(nameTop + pairH, cy + m.circle / 2 - 4, deltaOnHead ? pairMid + dH / 2 : 0) - y
      } else {
        headH = Math.max(m.circle, nameH, deltaOnHead ? dH : 0, mode === 'inline' && r.detail ? detH : 0)
        cy = y + headH / 2
        nameTop = Math.round(cy - nameH / 2)
      }
      const deltaMid = split ? nameTop + pairH / 2 : cy
      r.circle.setSize(m.circle)
      style(r.circle.el, { left: Math.round(GRID.stepX + (SIZE.circle - m.circle) / 2) + 'px', top: Math.round(cy - m.circle / 2) + 'px' })
      style(r.name, { left: textX + 'px', top: Math.round(nameTop) + 'px', height: nameH + 'px' })
      let lineRight = textX + nameW
      if (r.detail && mode === 'inline') {
        const dl = Math.round(lineRight + 30 * sc)
        style(r.detail.el, { left: dl + 'px', top: Math.round(cy - detH / 2) + 'px' })
        lineRight = dl + detW
      }
      if (split) {
        style(r.detail.el, { left: textX + 'px', top: Math.round(nameTop + nameH + m.gDetail) + 'px' })
        lineRight = Math.max(lineRight, textX + detW)
      }
      if (deltaOnHead) {
        style(r.delta.el, { position: 'absolute', left: Math.round(right - r.deltaW) + 'px', top: Math.round(deltaMid - dH / 2) + 'px' })
        if (lineRight + 28 > right - r.deltaW) fail(6)
      } else if (lineRight > right) fail(7)
      const rowTop = Math.round(y + headH + m.gRes)
      if (mode === 'swap' && r.detail) {
        style(r.detail.el, { left: textX + 'px', top: Math.round(rowTop + (boxH - detH) / 2) + 'px' })
        if (textX + detW > right) fail(8)
        r.detail.el.setAttribute('data-overlap-ok', '')
      } else if (r.detail) r.detail.el.removeAttribute('data-overlap-ok')
      r.vals.forEach((v, j) => {
        if (v) { v.left = boxLeft(j, v.w); style(v.box.el, { position: 'absolute', left: v.left + 'px', top: rowTop + 'px' }) }
        style(r.slots[j], { left: colL[j] + 'px', top: rowTop + 'px', width: Math.ceil(colW[j]) + 'px', height: boxH + 'px', display: v ? '' : 'none' })
      })
      if (r.delta && slot === 'tail') style(r.delta.el, { position: 'absolute', left: tailL + 'px', top: Math.round(rowTop + (boxH - dH) / 2) + 'px' })
      if (r.delta) r.deltaBox = { x: parseFloat(r.delta.el.style.left), y: parseFloat(r.delta.el.style.top), w: r.deltaW, h: dH }
      r.rowTop = rowTop
      r.boxH = boxH
      y = rowTop + boxH
      if (r.note) {
        r.note.setPx(SIZE.check)
        y += m.gNote
        style(r.note.el, { left: textX + 'px', top: y + 'px' })
        if (textX + r.note.measure() > right) fail(9)
        y += Math.round(SIZE.check * 1.2)
      }
      if (i < R.length - 1) y += m.gap + extra
    })
    if (check) {
      check.setPx(SIZE.check)
      y += Math.round(26 * sc) + Math.min(extra, 14)
      style(check.el, { left: textX + 'px', top: y + 'px' })
      if (textX + check.measure() > right) fail(10)
      y += Math.round(SIZE.check * 1.2)
    }
    const height = y - P.top
    if (LO.debug) console.log(`[wd] ${mode} ${sc} ${slot}${tight ? ' tight' : ''} fitsW=${fits} why=${why.join(',')} h=${Math.round(height)} avail=${avail}`)
    return { fits: fits && height <= avail, fitsW: fits, height }
  }

  const slotsFor = () => (hasDelta ? ['head', 'tail'] : ['head'])
  let best = null // fallback: the width-valid candidate that overflows least
  function tryMode(mode, sc, tight = false) {
    if (sc < MIN_SCALE[mode] - 1e-9) return null
    if (metricsAt(sc).result < FLOOR.result) return null
    for (const slot of slotsFor(mode)) {
      const r = place(mode, sc, slot, 0, tight)
      const c = { mode, sc, slot, tight, height: r.height }
      if (r.fits) return c
      if (r.fitsW && (!best || r.height < best.height)) best = c
    }
    return null
  }
  let chosen = null
  if (LO.layout && MIN_SCALE[LO.layout]) {
    for (const tight of [false, true]) for (const sc of SCALES) if (!chosen) chosen = tryMode(LO.layout, sc, tight)
  } else {
    // the working stays on the sheet (split / inline) at the largest scale that fits; swap only as a last resort;
    // then the same again with tight gaps
    for (const tight of [false, true]) {
      outer: for (const sc of SCALES) for (const mode of ['split', 'inline']) if ((chosen = tryMode(mode, sc, tight))) break outer
      if (!chosen) for (const sc of SCALES) if ((chosen = tryMode('swap', sc, tight))) break
      if (chosen) break
    }
  }
  // nothing fits: the least-overflowing width-valid layout (the linter reports the overflow), else the smallest swap
  if (!chosen) chosen = best || { mode: 'swap', sc: MIN_SCALE.swap, slot: 'head', tight: true, height: place('swap', MIN_SCALE.swap, 'head', 0, true).height }
  // breathe: spend spare height on the gaps (top-aligned like a real sheet), capped so blocks stay grouped
  const gaps = Math.max(1, R.length - 1 + (stake ? 1 : 0) + (showHeads ? 0.5 : 0))
  const spare = avail - chosen.height
  const extra = Math.max(0, Math.min(chosen.mode === 'split' ? 24 : 36, Math.floor((spare * 0.6) / gaps)))
  place(chosen.mode, chosen.sc, chosen.slot, extra, chosen.tight)
  const swap = chosen.mode === 'swap'
  root.dataset.mode = chosen.mode
  root.dataset.scale = String(chosen.sc)
  root.dataset.slot = chosen.slot
  if (chosen.tight) root.dataset.tight = ''

  // pointer: lands just right of the winner's delta (or of its last result), never over a number, inside the card
  let ptStop = null
  if (pt) {
    const w = R[winner]
    const lv = [...w.vals].reverse().find(Boolean)
    if (w.deltaBox) ptStop = { x: w.deltaBox.x + w.deltaBox.w + 14, y: w.deltaBox.y + w.deltaBox.h / 2 }
    else if (lv) ptStop = { x: lv.left + lv.w + 14, y: w.rowTop + w.boxH / 2 }
    if (ptStop) ptStop.x = Math.min(ptStop.x, GRID.card.x + GRID.card.w - 64)
  }

  // ---------------------------------------------------------------- sound
  T.forEach((x, i) => {
    const r = R[i]
    if (r.detail) ctx.cue(x.t0, 'type', { dur: x.typeD, gain: 0.45 })
    r.vals.forEach((v, j) => { if (v) ctx.cue(x.valT[j] + MOTION.popDelay, 'pop', { gain: j === 0 ? 0.45 : 0.4 }) })
    if (x.deltaT != null) ctx.cue(x.deltaT + MOTION.popDelay, 'ding', { gain: 0.42 })
    if (r.note) ctx.cue(x.noteT, 'type', { dur: x.noteD, gain: 0.35 })
  })
  if (isFinite(wT) && !hasVerdict) ctx.cue(wT, 'ding', { gain: 0.55 }) // with a verdict, the chrome's reveal carries it
  if (check) ctx.cue(checkT, 'type', { dur: checkD, gain: 0.4 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.3 })

  // ---------------------------------------------------------------- seek
  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      const wP = isFinite(wT) ? prog(t, wT, MOTION.restIn) : 0 // winner moment: everyone else rests
      const restore = winner < 0 ? prog(t, lastEnd + 0.9, 0.45) : 0 // no winner: the whole comparison comes back to full
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
        const L0 = v0i >= 0 ? landing(t, x.valT[v0i]) : { wipe: 0 }
        if (r.detail) {
          const tp = t >= cleared ? 0 : prog(t, x.t0, x.typeD)
          const waiting = t >= Math.max(0, x.act) && t < x.t0
          const typing = t >= x.t0 && t < x.t0 + x.typeD + 0.12
          const idleFirst = i === 0 && x.act < 0 && (t < x.t0 || t >= cleared)
          r.detail.seek(tp, (typing && t < clearT0) || ((waiting || idleFirst) && blink(t)))
          let fo = t >= cleared || t < clearT0 ? 1 : keep
          if (swap && t < cleared && v0i >= 0) {
            // the first highlighter's leading edge erases the working as it lays the result down
            const v0 = r.vals[v0i]
            const front = v0.left + L0.wipe * v0.w - textX
            style(r.detail.el, { clipPath: L0.wipe > 0 && L0.wipe < 1 ? `inset(0 0 0 ${Math.max(0, Math.round(front))}px)` : 'none' })
            fo *= L0.wipe >= 1 ? 0.35 * (1 - prog(t, x.valT[v0i] + MOTION.wipe, 0.12)) : 1 - 0.65 * L0.wipe
          } else style(r.detail.el, { clipPath: 'none' })
          fade(r.detail.el, fo)
        }
        // results land in their columns, rest when the next option takes focus; the winner's re-wipe blue
        let rest = isFinite(x.next) ? prog(t, x.next + 0.05, MOTION.restIn) * (1 - restore) : 0
        if (winner >= 0) rest = isWin ? rest * (1 - wP) : Math.max(rest, wP)
        // empty slots: on the sheet from frame 1; in swap mode they clear while the working types over them
        const slotOff = swap && r.detail && x.act >= 0 ? prog(t, x.act, 0.2) * (1 - clearP) : 0
        r.vals.forEach((v, j) => {
          const L = v ? landing(t, x.valT[j]) : { wipe: 0, text: 0 }
          if (v) {
            v.box.seek(L.wipe * keep, L.text * keep, rest)
            winWipe(v.win, isWin ? ease.out(prog(t, wT + j * 0.1, MOTION.wipe)) * keep : 0)
          }
          fade(r.slots[j], useSlots ? Math.min(1 - L.wipe * keep, 1 - slotOff) : 0)
        })
        if (r.delta) {
          const L = landing(t, x.deltaT)
          r.delta.seek(L.wipe * keep, L.text * keep, isWin ? rest : Math.max(rest, wP))
        }
        if (r.note) {
          r.note.seek(t >= cleared ? 0 : prog(t, x.noteT, x.noteD), t >= x.noteT && t < x.noteT + x.noteD + 0.15 && t < clearT0)
          fade(r.note.el, t >= cleared ? 1 : keep)
        }
      })
      if (check) {
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

/** the winner's blue layer wipes left to right over its result box (same grammar as the highlighter) */
function winWipe(el, w) {
  const q = clamp(w)
  style(el, {
    opacity: q > 0 ? '1' : '0',
    clipPath: q >= 1 ? 'none' : `inset(0 ${Math.round((1 - q) * 1000) / 10}% 0 0 round 10px)`,
  })
}
