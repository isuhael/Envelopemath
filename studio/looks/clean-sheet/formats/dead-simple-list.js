// dead-simple-list — "N dead simple numbers" (P1) on the Clean Sheet.
//
// Numbered empty slots are on the page from frame 1. Each step: its circle fills (you are here), the grey mono
// formula types, the highlighter swipes in under it and the result pops onto it. The formula stays, so the page
// builds into a worked sheet. Finished results settle to a lighter tint so the newest number is the only loud one.
// The finished sheet holds, then (lookOpts.loop, default on) clears back to its frame-1 state so the short loops.
//
// Layout engine (measured with the real fonts at mount). Tries, in order of richness:
//   stack3  label row / formula row / result row (labels as step headings)
//   aside   formula row / result row, label beside the result
//   bare    formula row / result row, labels left to the voice-over (the mockup)
//   swap    one row per step: the result replaces its formula (long lists: 5-6 steps)
// and takes the first that fits the work area with type above the floors. Notes sit beside the result, or after
// the formula ("$65,000 ÷ 12 =  not $5,000") when the result is too wide. lookOpts.layout forces a mode.
import { h, css as style, prog, ease, plain } from '../../../runtime/core.js'
import { C, SIZE, GRID, MOTION, md, hlBox, typeLine, stepCircle, fadeUp, fade, show, blink, landing, durationOf, typeTime } from '../lib.js'

export const css = `
.dsl > * { position: absolute; }
.dsl-label { white-space: nowrap; font: 700 46px/1.15 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; }
.dsl-aside { display: flex; flex-direction: column; justify-content: center; gap: 2px; }
.dsl-aside .dsl-label { white-space: normal; font-weight: 600; color: #6B7280; line-height: 1.12; letter-spacing: 0; text-wrap: balance; }
.dsl-note { white-space: nowrap; font: 600 40px/1.15 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.dsl-note em { font-style: normal; color: #15171C; }
.dsl-note u.mark2 { text-decoration: none; color: #B42318; }
.dsl-given { display: flex; align-items: center; gap: 22px; white-space: nowrap; }
.dsl-given-label { font: 700 46px/1 'Inter', 'Inter Full', sans-serif; color: #15171C; }
.dsl-given-note { font: 500 40px/1 'Inter', 'Inter Full', sans-serif; color: #6B7280; }
.dsl-check { white-space: pre; }
`

const SCALES = [1, 0.96, 0.92, 0.88, 0.85, 0.82]
const MIN_SCALE = { stack3: 0.86, aside: 0.84, bare: 0.82, swap: 0.8 }
const FLOOR = { label: 40, formula: 40, result: 52, final: 60 }

export default function deadSimpleList(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const items = (d.items || []).slice(0, 8)
  const typeDur = d.typeDur != null ? +d.typeDur : 0.6
  const loop = LO.loop !== false

  // ---------------------------------------------------------------- timing
  const T = []
  items.forEach((it, i) => {
    const prev = T[i - 1]
    const t0 = it.t != null ? +it.t : prev ? prev.res + 3.2 : 0.4
    let res = it.resultT != null ? +it.resultT : t0 + typeDur + 0.3
    if (res < t0 + 0.15) res = t0 + 0.15
    const typeD = Math.max(0.12, Math.min(typeDur, res - t0 - 0.1))
    let act = t0 - MOTION.activate
    if (i === 0 && t0 <= 0.9) act = -1 // step 1 is already the active step on frame 1
    T.push({ t0, res, typeD, act })
  })
  T.forEach((x, i) => { x.next = T[i + 1] ? Math.max(T[i + 1].act, x.res + 0.4) : Infinity })
  const last = T[T.length - 1] || { res: 1 }
  const goalIdx = items.findIndex(it => it.tone === 'goal')

  let checkText = d.check != null ? d.check : LO.check
  if (checkText && !/^check\b/i.test(checkText)) checkText = 'check: ' + checkText
  const checkT = d.checkT != null ? +d.checkT : LO.checkT != null ? +LO.checkT : last.res + 1.3
  const checkD = checkText ? typeTime(checkText) : 0
  const fin = (checkText ? checkT + checkD : last.res) + 0.9 // the finished sheet

  const lastBeat = Math.max(last.res + 0.6, checkText ? checkT + checkD : 0)
  const clearLen = MOTION.clear + 0.2
  const computed = durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : MOTION.hold, tail: loop ? clearLen : 0 })
  const D = spec.duration || computed
  const clearT0 = loop ? D - clearLen : Infinity
  const cleared = loop ? D - 0.2 : Infinity
  if (loop) P.clear = { t0: clearT0, dur: MOTION.clear }

  // ---------------------------------------------------------------- DOM
  const root = h('div', { class: 'dsl' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)

  const inp = d.input
  const inputMode = LO.input || 'auto'
  const showGiven = !!(inp && inp.value) && (inputMode === 'show' || (inputMode !== 'hide' && !plain(spec.header || '').includes(plain(inp.value))))
  let given = null
  if (showGiven) {
    const box = hlBox({ html: md(inp.value), tone: 'input', px: 58 })
    const el = h('div', { class: 'dsl-given' },
      inp.label ? h('div', { class: 'dsl-given-label', html: md(inp.label) }) : null,
      box.el,
      inp.note ? h('div', { class: 'dsl-given-note', html: md(inp.note) }) : null)
    root.append(el)
    given = { el, box, h: Math.round(58 * 1.3) }
  }

  const R = items.map((it, i) => {
    const goal = it.tone === 'goal'
    const circle = stepCircle(i + 1)
    const label = it.label ? h('div', { class: 'dsl-label', html: md(it.label) }) : null
    const formula = typeLine({ text: it.formula || '', suffix: ' =' })
    const box = hlBox({ html: md(it.result || ''), tone: it.tone, px: goal ? SIZE.final : SIZE.result })
    const note = it.note ? h('div', { class: 'dsl-note', html: md(it.note) }) : null
    const aside = h('div', { class: 'dsl-aside' })
    for (const e of [circle.el, formula.el, box.el, aside]) root.append(e)
    if (label) root.append(label)
    if (note) root.append(note)
    return { it, goal, circle, label, formula, box, note, aside, labelPlace: 'none', notePlace: 'none' }
  })

  let check = null
  if (checkText) {
    check = typeLine({ text: checkText, px: SIZE.check, color: C.accent, weight: 500, cls: 'dsl-check' })
    root.append(check.el)
  }

  // ---------------------------------------------------------------- layout engine
  const right = P.right
  const textX = GRID.textX
  const avail = P.bottom - P.top
  const hasLabels = R.some(r => r.label)

  function metrics(sc, mode) {
    return {
      label: Math.round(SIZE.label * sc), formula: Math.round(SIZE.formula * sc),
      result: Math.round(SIZE.result * sc), final: Math.round(SIZE.final * sc),
      note: SIZE.note,
      circle: Math.round(SIZE.circle * Math.max(0.9, sc)),
      gLabel: Math.round(4 * sc), gFormula: Math.round(8 * sc),
      gap: Math.round((mode === 'stack3' ? 24 : 30) * sc), gGiven: Math.round(36 * sc),
    }
  }
  const okFloors = (m, mode) => m.formula >= FLOOR.formula && m.result >= FLOOR.result && m.final >= FLOOR.final && (mode !== 'stack3' || m.label >= FLOOR.label)

  // place everything for (mode, scale, extra gap); returns { fits, height }
  function place(mode, sc, extraGap = 0) {
    const m = metrics(sc, mode)
    let y = P.top
    let fits = true
    if (given) {
      style(given.el, { left: GRID.left + 'px', top: y + 'px', height: given.h + 'px' })
      y += given.h + m.gGiven + extraGap
    }
    R.forEach((r, i) => {
      const resPx = r.goal ? m.final : m.result
      r.box.setPx(resPx)
      const boxH = Math.round(resPx * 1.3)
      const pad = 14 * Math.sqrt(resPx / SIZE.result)
      r.formula.setPx(m.formula)
      const fH = Math.round(m.formula * 1.2)
      const lH = Math.round(m.label * 1.15)
      const labelInRow = mode === 'stack3' && !!r.label
      const labelInAside = mode === 'aside' && !!r.label
      r.labelPlace = labelInRow ? 'row' : labelInAside ? 'aside' : 'none'
      if (r.label) {
        if (labelInAside) { r.aside.prepend(r.label); style(r.label, { fontSize: m.note + 'px', left: '', top: '', height: '' }) }
        else { root.append(r.label); style(r.label, { fontSize: m.label + 'px', left: textX + 'px' }) }
        show(r.label, labelInRow || labelInAside)
      }
      // rows
      const top0 = y
      let fTop = y, bTop
      if (labelInRow) { style(r.label, { top: y + 'px', height: lH + 'px' }); fTop = y + lH + m.gLabel }
      if (mode === 'swap') { bTop = y; fTop = Math.round(y + (boxH - fH) / 2) }
      else bTop = fTop + fH + m.gFormula
      style(r.formula.el, { left: textX + 'px', top: fTop + 'px' })
      if (mode === 'swap') r.formula.el.setAttribute('data-overlap-ok', '')
      else r.formula.el.removeAttribute('data-overlap-ok')
      style(r.box.el, { position: 'absolute', left: Math.round(textX - pad) + 'px', top: bTop + 'px' })
      r.boxLeft = Math.round(textX - pad)
      r.circle.setSize(m.circle)
      const rowMid = labelInRow ? top0 + lH / 2 : mode === 'swap' ? bTop + boxH / 2 : fTop + fH / 2
      style(r.circle.el, { left: Math.round(GRID.stepX + (SIZE.circle - m.circle) / 2) + 'px', top: Math.round(rowMid - m.circle / 2) + 'px' })
      // widths
      const fw = r.formula.measure()
      if (textX + fw > right) fits = false
      const bw = r.box.width()
      r.boxW = bw
      const boxRight = textX - pad + bw
      if (boxRight > right) fits = false
      const asideLeft = Math.round(boxRight + 26)
      const asideW = right - asideLeft
      // note: beside the result (unless an aside label owns that slot), else after the formula
      r.notePlace = 'none'
      if (r.note) {
        root.append(r.note)
        style(r.note, { fontSize: m.note + 'px', left: '0px', top: '0px', height: '', lineHeight: '' })
        const nw = r.note.getBoundingClientRect().width
        if (!labelInAside && asideW >= nw + 2) r.notePlace = 'aside'
        else if (mode !== 'swap' && textX + fw + 34 + nw <= right) r.notePlace = 'formula'
        else fits = false
        if (r.notePlace === 'aside') { r.aside.append(r.note); style(r.note, { left: '', top: '' }) }
        else style(r.note, { left: Math.round(textX + fw + 34) + 'px', top: fTop + 'px', height: fH + 'px', lineHeight: fH + 'px' })
      }
      const asideKids = (labelInAside ? 1 : 0) + (r.notePlace === 'aside' ? 1 : 0)
      style(r.aside, { left: asideLeft + 'px', top: bTop + 'px', height: boxH + 'px', width: Math.max(0, asideW) + 'px', display: asideKids ? 'flex' : 'none' })
      if (asideKids) {
        if (asideW < 140) fits = false
        else if (labelInAside && (r.label.scrollWidth > asideW + 1 || r.aside.scrollHeight > boxH + 14)) fits = false
      }
      y = bTop + boxH
      if (i < R.length - 1) y += m.gap + extraGap
    })
    if (check) {
      check.setPx(Math.max(FLOOR.formula, Math.round(SIZE.check * Math.max(sc, 0.9))))
      y += Math.round(22 * sc) + Math.min(extraGap, 12)
      style(check.el, { left: textX + 'px', top: y + 'px' })
      if (textX + check.measure() > right) fits = false
      y += Math.round(SIZE.check * 1.2)
    }
    const height = y - P.top
    if (height > avail) fits = false
    return { fits, height }
  }

  const forced = LO.layout && MIN_SCALE[LO.layout] ? [LO.layout] : null
  const modes = forced || (hasLabels ? ['stack3', 'aside', 'bare', 'swap'] : ['bare', 'swap'])
  let chosen = null
  outer: for (const mode of modes) {
    for (const sc of SCALES) {
      if (sc < MIN_SCALE[mode] - 1e-9) break
      if (!okFloors(metrics(sc, mode), mode)) continue
      const r = place(mode, sc)
      if (r.fits) { chosen = { mode, sc, height: r.height }; break outer }
    }
  }
  if (!chosen) {
    // last resort: the smallest swap layout (the linter reports whatever still does not fit)
    chosen = { mode: 'swap', sc: 0.78, height: place('swap', 0.78).height }
  }
  // breathe: spend spare height on the gaps (top-aligned like a real sheet), capped so blocks stay grouped
  const gaps = R.length - 1 + (given ? 1 : 0)
  const spare = avail - chosen.height
  const extra = gaps > 0 ? Math.max(0, Math.min(chosen.mode === 'swap' ? 40 : 30, Math.floor((spare * 0.55) / gaps))) : 0
  place(chosen.mode, chosen.sc, extra)
  const swap = chosen.mode === 'swap'
  root.dataset.mode = chosen.mode
  root.dataset.scale = String(chosen.sc)

  // ---------------------------------------------------------------- sound
  T.forEach((x, i) => {
    ctx.cue(x.t0, 'type', { dur: x.typeD, gain: 0.5 })
    ctx.cue(x.res + MOTION.popDelay, R[i].goal ? 'ding' : 'pop', { gain: R[i].goal ? 0.6 : 0.5 })
  })
  if (check) ctx.cue(checkT, 'type', { dur: checkD, gain: 0.4 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.3 })

  // ---------------------------------------------------------------- seek
  return {
    duration: D,
    seek(t) {
      const clearP = loop ? ease.inOut(prog(t, clearT0, MOTION.clear)) : 0
      const keep = 1 - clearP
      const restore = goalIdx < 0 ? prog(t, fin, 0.45) : 0 // no goal: the whole cheat sheet comes back to full
      R.forEach((r, i) => {
        const x = T[i]
        // circle: filled while this is the current step (the first step re-fills as the loop resets)
        const on = x.act < 0 ? 1 : prog(t, x.act, 0.32)
        const off = isFinite(x.next) ? prog(t, x.next, 0.25) : 0
        let fill = on * (1 - off) * keep
        if (i === 0 && x.act < 0) fill = Math.max(fill, clearP)
        r.circle.seek(fill)
        // label: a heading arrives with its circle; an aside label arrives with the result
        if (r.labelPlace !== 'none') {
          let p
          if (r.labelPlace === 'row') p = x.act < 0 ? 1 : prog(t, x.act + 0.06, MOTION.fade + 0.05) * keep
          else p = prog(t, x.res + 0.3, MOTION.fade) * keep
          fadeUp(r.label, p)
        }
        // formula: caret waits (blinking) from activation, runs while typing; in swap mode it leaves as the result lands
        const tp = t >= cleared ? 0 : prog(t, x.t0, x.typeD)
        const waiting = t >= Math.max(0, x.act) && t < x.t0
        const typing = t >= x.t0 && t < x.t0 + x.typeD + 0.12
        const idleFirst = i === 0 && (t < x.t0 || t >= cleared)
        r.formula.seek(tp, (typing && t < clearT0) || ((waiting || idleFirst) && blink(t)))
        let fo = t >= cleared ? 1 : t < clearT0 ? 1 : keep
        const L = landing(t, x.res)
        if (swap && t < cleared) {
          // the highlighter's leading edge erases the formula as it lays the result down
          const front = r.boxLeft + L.wipe * r.boxW - textX
          style(r.formula.el, { clipPath: L.wipe > 0 && L.wipe < 1 ? `inset(0 0 0 ${Math.max(0, Math.round(front))}px)` : 'none' })
          fo *= L.wipe >= 1 ? 0.35 * (1 - prog(t, x.res + MOTION.wipe, 0.12)) : 1 - 0.65 * L.wipe
          if (L.wipe >= 1 && t >= x.res + MOTION.wipe + 0.12) fo = 0
        } else style(r.formula.el, { clipPath: 'none' })
        fade(r.formula.el, fo)
        // result lands on its highlighter, then rests when the next step takes focus
        let rest = 0
        if (!r.goal && isFinite(x.next)) rest = prog(t, x.next + 0.05, MOTION.restIn) * (1 - restore)
        r.box.seek(L.wipe * keep, L.text * keep, rest)
        if (r.note) fadeUp(r.note, prog(t, x.res + 0.38, MOTION.fade) * keep)
      })
      if (check) {
        check.seek(prog(t, checkT, checkD), t >= checkT && t < checkT + checkD + 0.15)
        fade(check.el, keep)
      }
    },
  }
}
