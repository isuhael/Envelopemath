// unit-ladder — "Cost in units of X" (P8) on the Clean Sheet.
//
// One division, repeated down a cheap → huge ladder. The unit is defined once at the top of the sheet
// ("[icon] 1 Big Mac = [$6.22]"). Each rung is a worked step:
//   1. its circle fills and the item arrives with its cost already written ("Private college, 1 year / $45,000")
//   2. the operation types after the cost in grey mono ("$45,000 ÷ $6.22 =")
//   3. the highlighter swipes in below and the count runs up on it (a counter that lands exactly on unitsDisplay,
//      by the time the voice-over says it: within 60% of an overlapping VO line, or just before its digits)
//      while a compact grid of tiny monoline unit icons fills in step with it. While they fit, one icon is one
//      unit (a fractional unit is a clipped icon); past that the grid becomes a dense pile that fades out to the
//      right (more than fits) and the number carries the count.
//   4. when the next rung opens, the finished rung files itself into a compact sheet row in place:
//      "label $cost ······ [≈ 667]" (the operation leaves, the cost stays after the label in grey mono, the result
//      glides up into the right-hand column and rests). Where the cost has no room, a ragged wrap or (cw, when the
//      page has the height) one more label line makes it; only then does a row go without it (logged with debug).
//      and the next rung opens directly under it. The ladder builds down the page; the newest rung is the only
//      loud number, and the filed results line up in one right-aligned column, cheap → huge.
// The last rung (the biggest) stays open on the larger final size. An optional check line types under it.
// The finished sheet holds, then (lookOpts.loop, default on) the last 0.7 s clears back to the frame-1 state.
//
// Frame 1: the unit row (a number), rung 1 already open with its cost written and the caret waiting, and every other
// rung's numbered circle waiting empty under it ("7 things, cheap -> huge"); the item names stay hidden until each
// rung opens. The waiting circles glide down as each rung opens (the next one rises into place).
// The last rung's count fills a field of unit icons in the free page under it (a pale tiled texture, decoration),
// so the biggest number arrives with a pile to match. A fractional unit is a full pale outline with only its share
// filled.
//
// Layout engine (measured with the real fonts at mount): tries type scales from 1 down (floors: labels and
// formulas 40 px, results 54 px, the final 62 px), keeping the unit row down to 0.88 and only then dropping it
// (it is droppable only when the unit price already shows in the header or footer), then tighter row gaps, then
// without the check line (the verdict usually says it). The first layout where every state fits the work area wins
// (the waiting circles included); spare height opens the gaps. Only a ladder too long for the page at any legal size
// scrolls (the sheet moves up during the filings, starting at the work area's top, so no gap shows).
//
// Payoff (lookOpts.payoff, optional): one more step after the ladder that divides two of its costs, e.g. "Private vs
// community / $45,000 ÷ $4,150 = [≈ 10.8×]". It opens like a rung (its circle shows "=", it waits under the ladder
// from frame 1), the last rung files into its row as it opens, and its result lands on the biggest box on the sheet
// (payoffScale × the final size): the payoff is the climax, not a check line. It draws no icons.
// Shared icon scale (lookOpts.iconScale = k): every rung's icon strip draws one icon per k units, at one icon size and
// one row count for the whole ladder, so the strips grow rung by rung (7 → 19 → 51 → 72 icons for k = 100); the unit
// row carries the key "[icon] = k". The last rung then draws a strip like the others (no free-page field).
//
// data: { unit: { name, price, icon }, rungs: [{ t, item, cost, units, unitsDisplay, tone?, resultT? }],
//         typeDur?, hold?, check?, checkT? }
// lookOpts: loop (true) · unitRow ('auto' | 'show' | 'hide'; badge: false = 'hide') · grid (true) · field (true: the
//           final icon field) · slots (true: waiting circles) · check / checkT (same as data.check / data.checkT;
//           a string or { t, text }) · countSpeed (1; > 1 = slower counters) · debug ·
//           payoff ({ t, label, cost, by, display, tone = 'goal' }) · payoffScale (1.3) · iconScale (1) · openScale (1) ·
//           filedScale (1: a filed row's result size; smaller leaves its cost room on one line) ·
//           oneLine (false: true = a layout fits only when every label is one line and every filed row keeps its cost) ·
//           maxScale (1: type scales above 1 tried first, down to 1, before the usual ones)
import { h, css as style, prog, ease, clamp, lerp, plain } from '../../../runtime/core.js'
import { C, SIZE, GRID, MOTION, md, hlBox, typeLine, stepCircle, fadeUp, fade, show, blink, durationOf, typeTime, unitIcon, iconDefs, iconUse, ICON_NAMES, readCheck, breakLine } from '../lib.js'

export const css = `
.ul > *, .ul-sheet > *, .ul-rung > * { position: absolute; }
.ul-sheet, .ul-rung { left: 0; top: 0; width: 0; height: 0; }
.ul-unit { display: flex; align-items: center; gap: 18px; white-space: nowrap; }
.ul-unit-icon .cs-icon { display: block; }
.ul-unit-name { font: 700 46px/1.1 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; text-wrap: balance; }
.ul-unit .cs-hl, .ul-unit-eq { flex: none; }
.ul-unit-eq { font: 600 46px/1 'IBM Plex Mono', 'Inter Full', monospace; color: #6B7280; }
.ul-label { font: 700 46px/1.12 'Inter', 'Inter Full', sans-serif; color: #15171C; letter-spacing: -.01em; text-wrap: balance; }
.ul-label em { font-style: normal; }
.ul-nb { white-space: nowrap; }
.ul-label u.mark2 { text-decoration: none; color: #B42318; }
.ul-leader {
  height: 6px;
  background-image: radial-gradient(circle at 3px 3px, #9AA1AC 0, #9AA1AC 2.4px, transparent 2.9px);
  background-size: 16px 6px; background-repeat: repeat-x;
}
.ul-grid > svg { position: absolute; left: 0; top: 0; transform-origin: 50% 50%; }
.ul-grid.ul-pile { -webkit-mask-image: linear-gradient(to right, #000 62%, transparent 100%); mask-image: linear-gradient(to right, #000 62%, transparent 100%); }
.ul-field > svg { position: absolute; left: 0; top: 0; transform-origin: 50% 50%; }
.ul-check { white-space: pre; line-height: 1.2; }
.ul-key { display: flex; align-items: center; gap: 10px; margin-left: 14px; }
.ul-key .cs-icon { display: block; flex: none; }
.ul-cost { white-space: nowrap; font: 600 40px/1 'IBM Plex Mono', 'Inter Full', monospace; color: #6B7280; letter-spacing: -.01em; }
`

const SCALES = [1, 0.96, 0.92, 0.88, 0.85, 0.82]
const FLOOR = { label: 40, formula: 40, result: 54, final: 62, cond: 44 }
const LEAD_GAP = 16      // gap between a label / result and the dotted leader
const LEAD_MIN = 32      // shortest leader worth drawing (the label column leaves room for it)
const LEAD_COST = 16     // a filed row keeps its cost with a leader down to this (every row keeps its working)
const COLLAPSE = 0.42    // a finished rung files into its row over this long
const CLEAR_A = 0.32     // loop: everything fades out...
const CLEAR_B = 0.26     // ...then rung 1 comes back in its frame-1 state
const EDGE = 40          // scroll mode: rows fade out over the last 40 px above the work area
const PEND_GAP = 12      // waiting circles: gap under the open rung
const FIELD_OP = 0.62    // the final icon field's opacity (a lighter pile, so the number stays the focus)
const COST_GAP = 14      // a filed row: gap between its label and its cost

const n3 = v => (Math.round(v * 1000) / 1000).toString()

/** "≈ 1,921" -> { pre: '≈ ', value: 1921, dp: 0, group: true, post: '' } (null when there is no number) */
function parseCount(disp) {
  const m = /^([\s\S]*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/.exec(String(disp))
  if (!m) return null
  const num = m[2]
  return { pre: m[1], post: m[3], raw: num, value: parseFloat(num.replace(/,/g, '')), dp: (num.split('.')[1] || '').length, group: num.includes(',') }
}
function fmtCount(c, v) {
  let s = Math.max(0, v).toFixed(c.dp)
  if (c.group) { const [a, b] = s.split('.'); s = a.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (b ? '.' + b : '') }
  return c.pre + s + c.post
}
/** inverse of ease.out (1 - (1 - p)^3): the progress at which the eased value reaches f */
const invOut = f => 1 - Math.cbrt(1 - clamp(f))

/** keep hyphenated words ("in-state", "out-of-state") whole when a label wraps, and bind a short leading word
 *  ("A", "An", "The", "1") to the word after it, so a wrap never leaves it alone on a line (text outside tags only) */
const keepHyphens = html => html.replace(/(^|>)([^<]+)/g, (m, a, txt) => a + txt
  .replace(/(^|\s)(A|An|The|a|an|the|\d{1,2}) (?=\S)/g, '$1$2\u00a0')
  .replace(/(\S*\w-\w\S*)/g, '<span class="ul-nb">$1</span>'))

const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
function mix(a, b, p) {
  const A = hex(a), B = hex(b)
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], clamp(p)))).join(',')})`
}

export default function unitLadder(spec, ctx) {
  const P = ctx.page
  const d = spec.data || {}
  const LO = spec.lookOpts || {}
  const loop = LO.loop !== false
  const unit = { name: 'unit', price: '', icon: 'token', ...(d.unit || {}) }
  const iconName = ICON_NAMES.includes(unit.icon) ? unit.icon : 'token'
  const PO = LO.payoff && LO.payoff.display != null ? LO.payoff : null
  const rungs0 = (d.rungs || []).slice(0, PO ? 8 : 9) // single-digit step circles; FORMATS asks for 4-7
  const rungs = PO ? [...rungs0, {
    t: PO.t, item: PO.label || '', cost: PO.cost || '', op: PO.by ? ' ÷ ' + PO.by : '', unitsDisplay: String(PO.display),
    units: parseFloat(String(PO.display).replace(/[^\d.]/g, '')) || 0, tone: PO.tone || 'goal', resultT: PO.resultT, payoff: true,
  }] : rungs0
  const N = rungs.length
  const scaleU = LO.iconScale > 1 ? +LO.iconScale : 1
  const right = P.right
  const textX = GRID.textX
  const log = (...a) => { if (LO.debug) console.log('unit-ladder', ...a) }

  // ---------------------------------------------------------------- timing
  const op = unit.price ? ' ÷ ' + unit.price : ''
  const opOf = r => (r.payoff ? r.op : op)
  const T = []
  rungs.forEach((r, i) => {
    const prev = T[i - 1]
    const t0 = r.t != null ? +r.t : prev ? prev.land + 2.4 : 0.6
    const typeDur = d.typeDur != null ? +d.typeDur : clamp((opOf(r) + ' =').length / 16, 0.4, 0.9)
    let res = r.resultT != null ? +r.resultT : t0 + typeDur + 0.25
    if (res < t0 + 0.15) res = t0 + 0.15
    const typeD = Math.max(0.12, Math.min(typeDur, res - t0 - 0.08))
    const act = i === 0 ? -1 : t0 - MOTION.activate
    const units = Math.max(0, +r.units || 0)
    let cnt0 = res + MOTION.popDelay
    let cntD = clamp(0.45 + 0.26 * Math.log10(units + 1), 0.45, 1.7) * (LO.countSpeed > 0 ? +LO.countSpeed : 1)
    // a rung whose highlighter starts by frame 1 is pre-filled: on frame 1 (the thumbnail) it already shows its final
    // count and full icon grid (no counter, no roll, never an empty box), and the loop brings it back that way
    const pre = res <= 0
    if (pre) {
      res = Math.min(res, -(MOTION.wipe + 0.05))
      cnt0 = Math.min(res + MOTION.popDelay, -(MOTION.pop + 0.05))
      cntD = 0
    }
    const typeD2 = pre ? Math.max(0.12, Math.min(typeD, res - t0 - 0.08)) : typeD
    T.push({ t0, res, typeD: typeD2, act, cnt0, cntD, land: cnt0 + cntD, units, pre })
  })
  // the count lands by the time the voice says it: when a VO line overlaps the count, it lands by 60% of that line
  // (or just before the figure's own word, when the line spells it in digits)
  const voLines = (spec.vo || []).map((v, k, all) => {
    const text = plain(String(v.text || ''))
    const dd = v.d != null ? +v.d : all[k + 1] ? +all[k + 1].t - +v.t : Math.max(1.2, text.split(/\s+/).length * 0.36)
    return { t: +v.t, d: dd, text }
  })
  T.forEach((x, i) => {
    if (x.pre || !voLines.length) return
    const cnt = parseCount(rungs[i].unitsDisplay != null ? rungs[i].unitsDisplay : rungs[i].units)
    let by = null
    for (const v of voLines) {
      if (v.t > x.land || v.t + v.d < x.cnt0) continue
      let at = v.t + 0.6 * v.d
      const k = cnt ? v.text.indexOf(cnt.raw) : -1
      if (k >= 0) at = Math.min(at, v.t + (k / Math.max(1, v.text.length)) * v.d * 0.88 - 0.1)
      by = by == null ? at : Math.min(by, at)
    }
    if (by != null && by < x.land) { x.cntD = Math.max(0.35, by - x.cnt0); x.land = x.cnt0 + x.cntD }
  })
  // a finished rung files into its row just before the next rung opens
  T.forEach((x, i) => {
    const nx = T[i + 1]
    if (!nx) { x.col = Infinity; x.colD = COLLAPSE; return }
    x.colD = clamp(nx.act - x.land - 0.1, 0.25, COLLAPSE)
    x.col = nx.act - x.colD
    if (x.land > x.col - 0.1) { x.cntD = Math.max(0.3, x.col - 0.1 - x.cnt0); x.land = x.cnt0 + x.cntD }
  })
  const lastT = T[N - 1] || { land: 1, res: 1 }

  const chk = readCheck(d, LO) // a string or { t, text }, in data or lookOpts
  const checkText = chk ? chk.text : ''
  const checkT = chk && chk.t != null ? chk.t : lastT.land + 1.0
  const checkD = checkText ? typeTime(checkText) : 0

  // ---------------------------------------------------------------- DOM
  const root = h('div', { class: 'ul' })
  style(root, { left: '0px', top: '0px', width: GRID.W + 'px', height: GRID.H + 'px' })
  P.layer.append(root)
  root.append(iconDefs([iconName]))
  const sheet = h('div', { class: 'ul-sheet' }) // everything on the ladder (scrolls only in the overflow fallback)
  root.append(sheet)

  // the unit row: [icon] 1 Big Mac = [$6.22]
  const U = (() => {
    const icon = unitIcon(iconName, { size: 64 })
    const name = h('div', { class: 'ul-unit-name', html: md('1 ' + unit.name) })
    const eq = h('div', { class: 'ul-unit-eq', text: '=' })
    const box = hlBox({ html: md(unit.price), tone: 'input', px: 58 })
    const iconWrap = h('div', { class: 'ul-unit-icon', 'data-deco': '' }, icon)
    // the shared icon scale's key: "[icon] = 100"
    const keyIcon = scaleU > 1 ? unitIcon(iconName, { size: 44 }) : null
    const keyTxt = scaleU > 1 ? h('div', { class: 'ul-unit-eq ul-key-txt', text: '= ' + scaleU.toLocaleString('en-US') }) : null
    const key = scaleU > 1 ? h('div', { class: 'ul-key' }, keyIcon, keyTxt) : null
    const el = h('div', { class: 'ul-unit' }, name, eq, box.el, ...(key ? [key] : []))
    sheet.append(iconWrap, el)
    return { el, iconWrap, icon, name, eq, box, key, keyIcon, keyTxt }
  })()

  const payoffK = LO.payoffScale > 0 ? +LO.payoffScale : 1.3
  const openK = LO.openScale > 0 ? +LO.openScale : 1        // the open (and pre-filled) result box; filed rows keep their size
  const filedK = LO.filedScale > 0 ? +LO.filedScale : 1     // a filed row's result (never under the 44 px floor)
  const R = rungs.map((r, i) => {
    const last = i === N - 1
    const wrap = h('div', { class: 'ul-rung' })
    const circle = stepCircle(r.payoff ? '=' : i + 1)
    const label = h('div', { class: 'ul-label', html: keepHyphens(md(r.item || '')) })
    const cost = String(r.cost || '')
    const formula = typeLine({ text: cost + opOf(r), suffix: ' =' })
    const disp = r.unitsDisplay != null ? String(r.unitsDisplay) : String(r.units ?? '')
    const box = hlBox({ html: md(disp), tone: r.tone, px: r.payoff ? Math.round(SIZE.final * payoffK) : last ? SIZE.final : Math.round(SIZE.result * openK) })
    style(box.el, { position: 'absolute', transformOrigin: '0 0' })
    const leader = h('div', { class: 'ul-leader', 'data-deco': '' })
    const grid = h('div', { class: 'ul-grid', 'data-deco': '' })
    // the filed row keeps its cost, so every rung can still be checked on the finished sheet: "An iPhone 17 $799 ··· ≈ 40"
    const costEl = cost && !last ? h('div', { class: 'ul-cost', html: md(cost) }) : null
    wrap.append(label, formula.el, leader, box.el, grid)
    if (costEl) wrap.append(costEl)
    sheet.append(wrap)
    return {
      i, last, payoff: !!r.payoff, wrap, circle, label, formula, box, leader, grid, costEl, disp, finalHTML: md(disp), count: parseCount(disp),
      costLen: [...cost].length, fullLen: [...formula.full].length, icons: [],
    }
  })

  for (const r of R) sheet.append(r.circle.el) // the circles live on the sheet: they wait, empty, before their rung

  // check line: broken once at mount (never reflows while typing), before its result sign, the continuation hung
  // under the sum like every check on the kit
  let check = null
  if (checkText) {
    const br = breakLine(sheet, checkText, right - textX, { maxLines: 2 })
    check = typeLine({ text: br.text, px: SIZE.check, color: C.accent, weight: 500, cls: 'ul-check' })
    sheet.append(check.el)
  }

  // ---------------------------------------------------------------- layout engine
  const metrics = (sc, tight = false) => ({
    label: Math.max(FLOOR.label, Math.round(SIZE.label * sc)),
    formula: Math.max(FLOOR.formula, Math.round(SIZE.formula * sc)),
    result: Math.round(SIZE.result * sc * openK),
    final: Math.round(SIZE.final * sc),
    payoff: Math.round(SIZE.final * payoffK * sc),
    cond: Math.max(FLOOR.cond, Math.round(52 * sc * filedK)),
    circle: Math.round(SIZE.circle * Math.max(0.88, sc)) - (tight ? 6 : 0), // tight rows: slimmer rings that never touch
    unitPx: Math.max(FLOOR.label, Math.round(46 * sc)), unitBox: Math.round(58 * sc), unitIcon: Math.round(64 * sc),
    gF: Math.round(4 * sc), gR: Math.round(10 * sc), gap: Math.round((tight ? 6 : 16) * sc), unitGap: Math.round((tight ? 18 : 30) * sc),
    gCheck: Math.round((tight ? 12 : 20) * sc), cGap: 6,
  })
  const okFloors = m => m.result >= FLOOR.result && m.final >= FLOOR.final
  const slotsOn = LO.slots !== false && N > 1

  /** an element's text lines: [{ left, right, top, bottom }] */
  function lineRects(el) {
    const rg = document.createRange()
    rg.selectNodeContents(el)
    const lines = []
    for (const r of [...rg.getClientRects()].filter(r => r.width > 0.5)) {
      const ln = lines.find(l => Math.abs(l.top - r.top) < 4)
      if (ln) { ln.left = Math.min(ln.left, r.left); ln.right = Math.max(ln.right, r.right); ln.bottom = Math.max(ln.bottom, r.bottom) }
      else lines.push({ left: r.left, right: r.right, top: r.top, bottom: r.bottom })
    }
    return lines.sort((a, b) => a.top - b.top)
  }
  function checkHeight() {
    const keep = check.span.textContent
    check.span.textContent = check.full
    const hgt = check.el.getBoundingClientRect().height
    check.span.textContent = keep; check.span.__t = keep
    return hgt
  }

  let why = []
  let cPitch = 0
  /** place everything for one candidate c = { sc, u (unit row), tight, ck (check line) } and an extra gap */
  function place(c, extra = 0) {
    const { sc, u: withUnit, tight, ck, cw } = c
    const m = metrics(sc, tight)
    why = []
    const no = reason => { why.push(reason); return false }
    let fits = okFloors(m) || no('floors')
    let y = P.top
    U.y = y
    style(U.el, { display: withUnit ? '' : 'none' })
    style(U.iconWrap, { display: withUnit ? '' : 'none' })
    if (withUnit) {
      U.box.setPx(m.unitBox)
      style(U.name, { fontSize: m.unitPx + 'px', maxWidth: '', width: '' }); style(U.eq, { fontSize: m.unitPx + 'px' })
      if (U.key) {
        style(U.keyTxt, { fontSize: m.unitPx + 'px' })
        U.keyIcon.setAttribute('width', Math.round(m.unitPx * 1.05)); U.keyIcon.setAttribute('height', Math.round(m.unitPx * 1.05))
      }
      U.icon.setAttribute('width', m.unitIcon); U.icon.setAttribute('height', m.unitIcon)
      // the key row sits on the sheet's grid: icon centred in the step-circle column, text on the text column
      style(U.el, { left: textX + 'px', top: y + 'px', height: '', width: (right - textX) + 'px' })
      // a long unit name wraps (balanced, 2 lines at most) instead of running into the rail
      const over = (U.key || U.box.el).getBoundingClientRect().right - right
      if (over > 0) {
        style(U.name, { maxWidth: Math.floor(U.name.getBoundingClientRect().width - over) + 'px' })
        const nl = lineRects(U.name)
        if (nl.length) style(U.name, { width: Math.ceil(Math.max(...nl.map(l => l.right)) - Math.min(...nl.map(l => l.left))) + 1 + 'px' })
      }
      if ((U.key || U.box.el).getBoundingClientRect().right > right + 0.5 || lineRects(U.name).length > 2) fits = no('unit-width')
      const uh = Math.round(Math.max(U.el.getBoundingClientRect().height, m.unitBox * 1.3))
      style(U.iconWrap, { left: Math.round(GRID.stepX + SIZE.circle / 2 - m.unitIcon / 2) + 'px', top: Math.round(y + uh / 2 - m.unitIcon / 2) + 'px' })
      y += uh + m.unitGap + extra
    }
    let maxBottom = y
    const needs = []
    cPitch = m.circle + m.cGap
    R.forEach((r, i) => {
      const px = r.payoff ? m.payoff : r.last ? m.final : m.result
      r.box.setPx(px)
      style(r.box.el, { minWidth: '' })
      r.box.setHTML(r.finalHTML)
      const boxW = Math.ceil(r.box.width())
      const boxH = Math.round(px * 1.3)
      style(r.box.el, { minWidth: boxW + 'px' })
      const k = m.cond / px
      const cW = boxW * k, cH = boxH * k
      // label column: what the filed row leaves beside its result and a leader (the last rung never files). The cost
      // takes room at the end of the label's last line: the column narrows for it when that costs no extra line.
      const labW = r.last ? right - textX : Math.floor(right - textX - cW - LEAD_MIN - 2 * LEAD_GAP)
      style(r.label, { left: textX + 'px', top: y + 'px', width: Math.max(120, labW) + 'px', fontSize: m.label + 'px', textWrap: '' })
      const lineH = m.label * 1.12
      let lines = lineRects(r.label)
      if (r.costEl) style(r.costEl, { display: '' }) // (measured visible: an earlier candidate may have hidden it)
      const costW = r.costEl ? Math.ceil(r.costEl.getBoundingClientRect().width) : 0
      if (costW && !r.last) {
        // where the cost fits after the label's last line (and a leader after it)
        const room = ls => ls[ls.length - 1].right + COST_GAP + costW + LEAD_GAP + LEAD_COST + LEAD_GAP <= right - cW + 0.5
        const n0 = lines.length
        style(r.label, { width: Math.max(120, labW - costW - COST_GAP) + 'px' })
        const l2 = lineRects(r.label)
        if (l2.length === n0 && Math.max(...l2.map(l => l.right)) <= textX + labW - costW - COST_GAP + 1) lines = l2
        else { style(r.label, { width: Math.max(120, labW) + 'px' }); lines = lineRects(r.label) }
        if (lines.length && !room(lines)) {
          // still no room: a ragged (greedy) wrap leaves the last line as short as it can be. Free when it adds no
          // line; with cw (cost wrap) the label may take one more line for it.
          const cwOn = cw === true || (Array.isArray(cw) && cw.includes(i))
          let got = null
          for (let w = labW; w >= 220; w -= 24) {
            style(r.label, { width: w + 'px', textWrap: 'wrap' })
            const l3 = lineRects(r.label)
            if (l3.length > (cwOn ? Math.min(3, n0 + 1) : n0)) break
            if (l3.length > n0 && n0 >= 3) break
            if (room(l3)) { got = l3; break }
          }
          if (got) lines = got
          else { style(r.label, { width: Math.max(120, labW) + 'px', textWrap: '' }); lines = lineRects(r.label) }
        }
      }
      const lh = r.label.getBoundingClientRect().height
      if (lines.length > 3 || labW < 220) fits = no(`label${i}`)
      // lookOpts.oneLine: every label on one line (a set sheet, no ragged stacks)
      if (LO.oneLine && lines.length > 1) fits = no(`lines${i}`)
      const lastLine = lines[lines.length - 1] || { right: textX }
      const lastMid = y + lh - lineH / 2
      // circle on the first line (the circles live on the sheet itself: they wait, empty, before their rung opens)
      r.circle.setSize(m.circle)
      r.cTop = Math.round(y + lineH / 2 - m.circle / 2)
      r.cSize = m.circle
      style(r.circle.el, { left: Math.round(GRID.stepX + (SIZE.circle - m.circle) / 2) + 'px', top: r.cTop + 'px' })
      // formula (a long one shrinks on its own, down to the floor)
      let fpx = m.formula
      r.formula.setPx(fpx)
      let fw = r.formula.measure()
      while (textX + fw > right && fpx > FLOOR.formula) { fpx -= 2; r.formula.setPx(fpx); fw = r.formula.measure() }
      if (textX + fw > right) fits = no(`formula${i}`)
      const fH = Math.round(fpx * 1.2)
      const fTop = Math.round(y + lh + m.gF)
      style(r.formula.el, { left: textX + 'px', top: fTop + 'px' })
      // the open result box
      const pad = 14 * Math.sqrt(px / SIZE.result)
      const bx = Math.round(textX - pad), by = fTop + fH + m.gR
      style(r.box.el, { left: bx + 'px', top: by + 'px' })
      if (bx + boxW > right) fits = no(`box${i}`)
      // the filed state: right-aligned at the rail, centred on the label's last line
      const cx = right - cW, cy = lastMid - cH / 2
      r.geo = { dx: cx - bx, dy: cy - by, k }
      // the cost after the label's last line, when it leaves room for a leader; else the row goes without it
      let costRight = lastLine.right
      r.costOn = false
      if (r.costEl) {
        const cl = Math.round(lastLine.right + COST_GAP)
        r.costOn = cl + costW + LEAD_GAP + LEAD_COST + LEAD_GAP <= cx
        style(r.costEl, { display: r.costOn ? '' : 'none', left: cl + 'px', top: Math.round(lastMid - 20) + 'px' })
        if (r.costOn) costRight = cl + costW
        else if (LO.oneLine) fits = no(`cost${i}`)            // ... and every filed row keeps its cost
        else log(`  rung${i}: no room for the cost on its filed row (cost ${cl}+${costW}, result at ${Math.round(cx)}, label lines ${lines.length})`)
        // after a wrapped label's last line the cost sits inside the label's bounding box (the linter measures a text
        // run as one box); it is placed clear of every line, so that overlap is intended
        if (lines.length > 1) r.costEl.setAttribute('data-overlap-ok', '')
        else r.costEl.removeAttribute('data-overlap-ok')
      }
      const lx0 = Math.round(costRight + LEAD_GAP), lx1 = Math.round(cx - LEAD_GAP)
      r.leaderOn = lx1 - lx0 >= LEAD_COST - 2
      style(r.leader, { left: lx0 + 'px', top: Math.round(lastMid - 3) + 'px', width: Math.max(0, lx1 - lx0) + 'px' })
      // icon grid area: right of the open result box
      const gx = bx + boxW + 26
      r.area = { x: gx, y: by, w: right - gx, h: boxH, bx, boxW }
      // the free page right of the label and the working (the last rung's icon field grows into it)
      r.upper = { x0: Math.round(Math.max(...lines.map(l => l.right), textX + fw) + 28), y0: y, y1: by - m.gR }
      r.y = y
      r.expBottom = by + boxH
      // while this rung is open, the rungs still to come wait under it as empty numbered circles
      const waiting = slotsOn ? N - 1 - i : 0
      const need = r.expBottom + (waiting ? PEND_GAP + (waiting - 1) * cPitch + m.circle : 0)
      needs.push(need)
      maxBottom = Math.max(maxBottom, need)
      log(`  rung${i} y=${y} lines=${lines.length} labW=${labW} filed=${Math.round(Math.max(y + lh, cy + cH) - y)} open=${r.expBottom - y} need=${Math.round(need)} fpx=${fpx}`)
      y = Math.round(Math.max(y + lh, cy + cH) + m.gap + extra)
    })
    if (check) {
      style(check.el, { display: ck ? '' : 'none' })
      check.on = ck
      if (ck) {
        check.setPx(SIZE.check)
        const top = Math.round((R[N - 1] ? R[N - 1].expBottom : y) + m.gCheck + Math.min(extra, 14))
        style(check.el, { left: textX + 'px', top: top + 'px' })
        const ch = checkHeight()
        if (ch > SIZE.check * 1.2 * 2 + 4 || textX + check.measure() > right) fits = no('check')
        check.bottom = top + ch
        maxBottom = Math.max(maxBottom, check.bottom)
      }
    }
    if (maxBottom > P.bottom) fits = no(`height+${Math.round(maxBottom - P.bottom)}`)
    return { fits, height: maxBottom - P.top, needs }
  }

  const uMode = LO.unitRow || (LO.badge === false ? 'hide' : 'auto')
  const priceShown = !!unit.price && plain(`${spec.header || ''} ${spec.footer || ''}`).includes(plain(unit.price))
  const unitChoices = !unit.price || uMode === 'hide' ? [false] : uMode === 'show' ? [true] : priceShown ? [true, false] : [true]
  // candidates in order of preference: the unit row (the given) is worth a little type size, not a lot; every scale
  // with normal row gaps before tight ones; the check line goes before anything scrolls
  // lookOpts.maxScale: bigger type first (in 0.04 steps down to 1), then the usual scales
  const up = []
  for (let sc = Math.min(1.5, +LO.maxScale || 1); sc > 1.001; sc = Math.round((sc - 0.04) * 100) / 100) up.push(sc)
  const SC = [...up, ...SCALES]
  const base = unitChoices.length > 1
    ? [...SC.filter(sc => sc >= 0.88).map(sc => [sc, true]), ...SCALES.map(sc => [sc, false])]
    : SC.map(sc => [sc, unitChoices[0]])
  const cands = []
  // (cw: a label may wrap once more so its filed row keeps its cost: the working outranks type size and the check)
  const hasCost = R.some(r => r.costEl)
  for (const cw of hasCost ? [true, false] : [false]) for (const ck of check ? [true, false] : [false]) for (const tight of [false, true]) for (const [sc, u] of base) cands.push({ sc, u, tight, ck, cw })
  let chosen = null
  for (const c of cands) {
    const r = place(c)
    log(`try ${JSON.stringify(c)} fits=${r.fits} height=${Math.round(r.height)} avail=${P.bottom - P.top} why=${why.join(',')}`)
    if (r.fits) { chosen = { c, c0: c, height: r.height }; break }
  }
  let scroll = null
  if (chosen && !chosen.c.cw && hasCost) {
    // the costs could not all wrap into place: let each row that lost its cost wrap for it while the page still fits,
    // at the chosen size or a smaller one (same check choice) when that keeps more costs (the working outranks size)
    const greedy = c0 => {
      let set = [], res = null
      for (let i = 0; i < N - 1; i++) {
        if (!R[i].costEl) continue
        place({ ...c0, cw: set })
        if (R[i].costOn) continue
        const r = place({ ...c0, cw: [...set, i] })
        if (r.fits && R[i].costOn) { set = [...set, i]; res = r }
      }
      const r = place({ ...c0, cw: set })
      return { c: { ...c0, cw: set }, height: r.height, fits: r.fits, on: R.filter(x => x.costOn).length }
    }
    let best = greedy(chosen.c)
    for (const c of cands.slice(cands.findIndex(x => x === chosen.c0))) {
      if (c.cw || c.ck !== chosen.c.ck) continue
      if (!place(c).fits) continue
      const g = greedy(c)
      if (g.fits && g.on > best.on) best = g
    }
    chosen = { c: best.c, height: best.height }
    log(`cost wraps: ${JSON.stringify(best.c)} costs on ${best.on}`)
  }
  if (chosen) {
    // breathe: spare height opens the gaps (top-aligned like a real sheet), capped so the ladder stays one block
    const gaps = Math.max(1, N - 1 + (chosen.c.u ? 1 : 0))
    const extra = Math.max(0, Math.min(26, Math.floor(((P.bottom - P.top - chosen.height) * 0.6) / gaps)))
    place(chosen.c, extra)
  } else {
    // overflow fallback: the smallest legal type, no check, and the sheet scrolls so the open rung fits. Each scroll
    // step lands on a row boundary, so the first visible row sits right at the top of the work area (no gap).
    const c = { sc: SCALES[SCALES.length - 1], u: unitChoices[unitChoices.length - 1], tight: true, ck: false, cw: false }
    const r = place(c)
    chosen = { c, height: r.height }
    const y0 = R[0].y
    const snap = s0 => { if (s0 <= 0) return 0; const b = R.map(x => x.y - y0).find(v => v >= s0); return b != null ? b : s0 }
    let S = 0
    const steps = R.map((x, i) => { S = Math.max(S, snap(r.needs[i] - P.bottom)); return S })
    const S0 = steps[0]
    // rung i's scroll happens while rung i - 1 files
    const moves = []
    for (let i = 1; i < N; i++) if (steps[i] > steps[i - 1]) moves.push({ t0: T[i - 1].col, dur: T[i - 1].colD, by: steps[i] - steps[i - 1] })
    scroll = { S0, moves }
    log(`scroll mode: S0=${S0} moves=${JSON.stringify(moves)}`)
  }
  const checkOn = !!check && !!check.on && chosen.c.ck
  root.dataset.scale = String(chosen.c.sc)
  root.dataset.unitRow = String(chosen.c.u)
  root.dataset.tight = String(chosen.c.tight)
  root.dataset.check = String(checkOn)
  root.dataset.scroll = String(!!scroll)
  const scrollAt = tt => (scroll ? scroll.S0 + scroll.moves.reduce((a, m) => a + m.by * ease.inOut(prog(tt, m.t0, m.dur)), 0) : 0)
  /** scroll mode: a row fades out over the EDGE px above the work area */
  const edge = (y, S) => (scroll ? clamp((y - S - (P.top - EDGE)) / EDGE) : 1)

  // ---------------------------------------------------------------- duration (the check may have left the sheet)
  const lastBeat = Math.max(lastT.land + 0.6, checkOn ? checkT + checkD : 0)
  const clearLen = CLEAR_A + CLEAR_B + 0.12
  const D = spec.duration || durationOf(spec, lastBeat, { hold: d.hold != null ? +d.hold : MOTION.hold, tail: loop ? clearLen : 0 })
  const clearT0 = loop ? D - clearLen : Infinity
  if (loop) P.clear = { t0: clearT0, dur: CLEAR_A }

  // ---------------------------------------------------------------- icon grids
  const gridOn = LO.grid !== false
  const GAP = 6
  // the icon's drawn extent across its 48-unit box, so a fractional unit clips the artwork, not the empty margin
  const art = (() => {
    const probe = unitIcon(iconName, { size: 48 })
    root.append(probe)
    let x0 = 48, x1 = 0
    for (const c of probe.children) { try { const b = c.getBBox(); x0 = Math.min(x0, b.x); x1 = Math.max(x1, b.x + b.width) } catch (e) { /* not rendered */ } }
    probe.remove()
    return x1 > x0 ? { x0: x0 / 48, x1: x1 / 48 } : { x0: 0.1, x1: 0.9 }
  })()
  // the shared icon scale: one icon size and one row count for every rung, the biggest that holds every strip
  let shared = null
  if (gridOn && scaleU > 1) {
    const ladder = R.filter(r => !r.payoff)
    for (let sz = 46; sz >= 18 && !shared; sz -= 2) {
      for (let rows = 1; rows <= 5 && !shared; rows++) {
        if (ladder.every((r, j) => {
          const A = r.area, need = Math.ceil(T[r.i].units / scaleU - 1e-6)
          const rr = Math.min(rows, need)
          return A.w >= 60 && rr * sz + (rr - 1) * GAP <= A.h && Math.ceil(need / rows) * (sz + GAP) - GAP <= A.w
        })) shared = { s: sz, rows }
      }
    }
    log('shared icon scale', scaleU, JSON.stringify(shared))
  }
  R.forEach((r, i) => {
    const A = r.area
    const units = T[i].units / scaleU                   // in icons (one icon = scaleU units)
    const need = Math.ceil(units - 1e-6)
    let plan = null
    if (r.payoff) { show(r.grid, false); r.plan = null; return }
    if (shared && need > 0) plan = { exact: true, rows: Math.min(shared.rows, need), s: shared.s, n: need, g: GAP }
    else if (gridOn && scaleU === 1 && A.w >= 60 && need > 0) {
      // exact: one icon per unit, the biggest icons that hold them all (fewest rows); a few units get big icons
      for (let rows = 1; rows <= 4 && !plan; rows++) {
        const sz = Math.min(rows === 1 ? A.h : 46, Math.floor((A.h - (rows - 1) * GAP) / rows))
        if (sz < 18) break
        const cols = Math.floor((A.w + GAP) / (sz + GAP))
        if (rows * cols >= need) {
          const used = Math.min(rows, Math.ceil(need / cols))
          plan = { exact: true, rows: used, s: sz, n: need, g: GAP }
        }
      }
      if (!plan) {
        // too many to draw: a dense pile that fades out to the right; the number carries the count
        const g = 4
        const rows = Math.max(2, Math.min(5, Math.floor((A.h + g) / (17 + g))))
        const sz = Math.floor((A.h - (rows - 1) * g) / rows)
        const cols = Math.floor((A.w + g) / (sz + g))
        if (cols >= 2) plan = { exact: false, rows, s: sz, n: rows * cols, g }
      }
    }
    r.plan = plan
    if (!plan) { show(r.grid, false); return }
    const g = plan.g
    const blockH = plan.rows * plan.s + (plan.rows - 1) * g
    style(r.grid, { left: A.x + 'px', top: A.y + Math.round((A.h - blockH) / 2) + 'px', width: A.w + 'px', height: blockH + 'px' })
    if (!plan.exact) r.grid.classList.add('ul-pile')
    const frac = units - Math.floor(units)
    for (let k = 0; k < plan.n; k++) {
      const col = Math.floor(k / plan.rows), row = k % plan.rows
      const pos = { left: col * (plan.s + g) + 'px', top: row * (plan.s + g) + 'px' }
      // exact grids: icon k lands as the counter passes k + 1 (the last, fractional one lands at the end)
      const f = plan.exact ? Math.min(1, (k + 1) / Math.max(units, 1e-6)) : (k + 1) / plan.n
      const at = T[i].cnt0 + T[i].cntD * invOut(f)
      if (plan.exact && k === plan.n - 1 && frac > 0.02 && frac < 0.98) {
        // a fractional unit: the whole icon as a pale outline, only its share drawn in full
        const ghost = iconUse(iconName, { size: plan.s })
        style(ghost, pos)
        r.grid.append(ghost)
        r.icons.push({ el: ghost, at, op: 0.3 })
        const el = iconUse(iconName, { size: plan.s })
        style(el, { ...pos, clipPath: `inset(-10% ${n3((1 - (art.x0 + (art.x1 - art.x0) * frac)) * 100)}% -10% -10%)` })
        r.grid.append(el)
        r.icons.push({ el, at, op: 1 })
        continue
      }
      const el = iconUse(iconName, { size: plan.s })
      style(el, pos)
      r.grid.append(el)
      r.icons.push({ el, at, op: 1 })
    }
    // the last rung's pile is a field: it fills the free page around the final number (right of its label and
    // working, beside the box, and under it when there is room), growing outward from the number as the count runs
    if (r.last && !plan.exact && LO.field !== false && !scroll) {
      const sz = 24, pitch = 30
      const rects = [
        { x0: r.upper.x0, x1: right, y0: r.upper.y0, y1: r.upper.y1 },
        { x0: A.x, x1: right, y0: A.y, y1: A.y + A.h },
        { x0: A.bx, x1: right, y0: Math.round((checkOn ? check.bottom : r.expBottom) + 16), y1: P.bottom - 4 },
      ]
      const cells = []
      // one lattice for all the free rectangles, anchored at the box's top-right corner, so the icons line up
      const ox = right - sz, oy = A.y
      for (let gy = -12; gy <= 16; gy++) for (let gx = 0; gx <= 30; gx++) {
        const x = ox - gx * pitch, y = oy + gy * pitch
        if (rects.some(q => x >= q.x0 && x + sz <= q.x1 && y >= q.y0 && y + sz <= q.y1)) cells.push({ x, y, d: Math.hypot(x - (A.bx + A.boxW), (y - (A.y + A.h / 2)) * 1.6) })
      }
      if (cells.length >= 12) {
        show(r.grid, false)
        r.plan = null
        cells.sort((a, b) => a.d - b.d)
        r.field = h('div', { class: 'ul-field', 'data-deco': '' })
        style(r.field, { left: '0px', top: '0px', width: '0px', height: '0px' })
        r.wrap.append(r.field)
        r.fieldIcons = cells.map((c, k) => {
          const el = iconUse(iconName, { size: sz })
          style(el, { left: c.x + 'px', top: c.y + 'px' })
          r.field.append(el)
          return { el, at: T[i].cnt0 + T[i].cntD * invOut((k + 1) / cells.length) }
        })
      }
    }
  })

  // ---------------------------------------------------------------- sound
  T.forEach((x, i) => {
    if (x.pre) return // already on the sheet at frame 1
    ctx.cue(x.t0, 'type', { dur: x.typeD, gain: 0.45 })
    if (x.cntD >= 0.35) ctx.cue(x.cnt0, 'roll', { dur: x.cntD, gain: 0.3 })
    ctx.cue(x.land, R[i].last ? 'ding' : 'pop', { gain: R[i].last ? 0.6 : 0.5 })
  })
  if (checkOn) ctx.cue(checkT, 'type', { dur: checkD, gain: 0.35 })
  if (loop) ctx.cue(clearT0, 'swipe', { gain: 0.3 })

  // ---------------------------------------------------------------- seek
  /** how far rung j has opened (0..1): its waiting circle rises into place just before the rung appears */
  const activ = (j, tt) => (T[j].act < 0 ? 1 : ease.inOut(prog(tt, T[j].act - 0.32, 0.4)))
  function seekRung(r, x, tt, t, alpha) {
    const vis = x.act < 0 ? 1 : prog(tt, x.act, MOTION.activate)
    style(r.wrap, { display: vis > 0 && alpha > 0 ? '' : 'none', opacity: n3(alpha) })
    if (vis <= 0 || alpha <= 0) return
    // filing: the working (formula, grid) leaves first, then the result glides up into the row's right column
    const filed = isFinite(x.col)
    const out = filed ? prog(tt, x.col, x.colD * 0.32) : 0
    const gp = filed ? prog(tt, x.col + x.colD * 0.22, x.colD * 0.78) : 0
    const cp = ease.inOut(gp)
    // an arc, not a diagonal: the box slides right first, then rises into its slot (never through the label)
    const ax = ease.out(gp), ay = ease.in(gp)
    // label: arrives with the circle; a filed row settles to a softer ink
    fadeUp(r.label, vis)
    style(r.label, { color: mix(C.ink, C.grey, cp * 0.72) })
    // formula: the cost is written when the rung opens, the operation types from t0, then it leaves as the row files
    const tp = prog(tt, x.t0, x.typeD)
    const waiting = tt < x.t0
    const typing = tt >= x.t0 && tt < x.t0 + x.typeD + 0.12
    r.formula.seek((r.costLen + (r.fullLen - r.costLen) * tp) / r.fullLen, typing || (waiting && blink(t)))
    const fo = vis * (1 - out)
    show(r.formula.el, fo > 0)
    if (fo > 0) fadeUp(r.formula.el, fo, vis < 1 ? MOTION.rise : 0)
    // result: highlighter swipe, then the counter runs up on it and lands exactly on the display string
    const wipe = ease.out(prog(tt, x.res, MOTION.wipe))
    const pop = prog(tt, x.cnt0, MOTION.pop)
    if (r.count && tt < x.cnt0 + x.cntD) r.box.setHTML(md(fmtCount(r.count, r.count.value * ease.out(prog(tt, x.cnt0, x.cntD)))))
    else r.box.setHTML(r.finalHTML)
    r.box.seek(wipe, pop, cp)
    const G = r.geo
    style(r.box.el, {
      display: wipe > 0 ? '' : 'none',
      transform: gp <= 0 ? 'none' : `translate(${n3(G.dx * ax)}px, ${n3(G.dy * ay)}px) scale(${n3(1 + (G.k - 1) * cp)})`,
    })
    // the leader draws in behind the filed result
    const lp = filed ? prog(tt, x.col + x.colD * 0.45, x.colD * 0.7) : 0
    style(r.leader, { display: r.leaderOn && lp > 0 ? '' : 'none', clipPath: lp >= 1 ? 'none' : `inset(0 ${n3((1 - lp) * 100)}% 0 0)` })
    // the cost settles beside the label as the working leaves (it fades in once the formula has gone)
    if (r.costEl && r.costOn) {
      const co = filed ? prog(tt, x.col + x.colD * 0.3, x.colD * 0.5) : 0
      style(r.costEl, { display: co > 0 ? '' : 'none', opacity: n3(co) })
    }
    // icon grid fills with the counter, leaves as the row files
    if (r.plan) {
      const go = 1 - out
      const on2 = go > 0 && tt >= x.cnt0
      style(r.grid, { display: on2 ? '' : 'none', opacity: n3(go) })
      if (on2) {
        for (const ic of r.icons) {
          const p = prog(tt, ic.at - 0.02, 0.16)
          style(ic.el, { opacity: n3(clamp(p * 2.5) * ic.op), transform: p >= 1 ? 'none' : `scale(${n3(lerp(0.4, 1, ease.back(p, 2)))})` })
        }
      }
    }
    if (r.field) {
      const on3 = tt >= x.cnt0
      style(r.field, { display: on3 ? '' : 'none', opacity: n3(FIELD_OP) })
      if (on3) for (const ic of r.fieldIcons) {
        const p = prog(tt, ic.at - 0.02, 0.2)
        style(ic.el, { opacity: n3(clamp(p * 2.5)), transform: p >= 1 ? 'none' : `scale(${n3(lerp(0.4, 1, ease.back(p, 2)))})` })
      }
    }
  }
  /** a rung's circle: waiting (empty) under the open rung, rising into place as its rung opens, full while open */
  function seekCircle(r, i, tt, alpha, S) {
    const x = T[i]
    let y = r.cTop
    if (slotsOn && i > 0) {
      // where the waiting circles stack: under the open rung (eased as each rung opens), one slot per waiting rung
      let under = R[0].expBottom, before = 0
      for (let j = 1; j < N; j++) {
        const a = activ(j, tt)
        under += (R[j].expBottom - R[j - 1].expBottom) * a
        if (j < i) before += 1 - a
      }
      const pend = under + PEND_GAP + before * cPitch
      y = lerp(pend, r.cTop, activ(i, tt))
    }
    const shown = slotsOn || x.act < 0 || tt >= x.act
    style(r.circle.el, { display: shown && alpha > 0 ? '' : 'none', opacity: n3(alpha * edge(r.y, S)), transform: Math.abs(y - r.cTop) < 0.05 ? 'none' : `translateY(${n3(y - r.cTop)}px)` })
    // filled while its rung is open, an empty ring before (waiting) and after (filed)
    const on = x.act < 0 ? 1 : prog(tt, x.act, 0.32)
    r.circle.seek(on * (1 - (isFinite(x.col) ? prog(tt, x.col, 0.25) : 0)))
  }

  return {
    duration: D,
    seek(t) {
      // loop: everything fades out, then rung 1 comes back in its frame-1 state (= the state at t 0)
      let tt = t, alpha = 1, cleared = false
      if (loop && t >= clearT0) {
        const a = prog(t, clearT0, CLEAR_A)
        if (a < 1) alpha = 1 - ease.inOut(a)
        else { tt = 0; cleared = true; alpha = ease.out(prog(t, clearT0 + CLEAR_A, CLEAR_B)) }
      }
      const S = scrollAt(tt)
      if (scroll) style(sheet, { transform: S ? `translateY(${n3(-S)}px)` : 'none' })
      if (chosen.c.u) {
        const uo = n3(edge(U.y, S) * (scroll && cleared ? alpha : 1))
        style(U.el, { opacity: uo }); style(U.iconWrap, { opacity: uo })
      }
      // (after the clear, the frame-1 state returns: rung 1 open, a pre-filled rung with its count, the other circles
      // waiting; a rung that is not open at t 0 stays hidden on its own)
      R.forEach((r, i) => seekRung(r, T[i], tt, t, alpha * edge(r.y, S)))
      R.forEach((r, i) => seekCircle(r, i, tt, alpha, S))
      if (check) {
        const on = checkOn && !cleared && tt >= checkT
        show(check.el, on)
        if (on) { check.seek(prog(tt, checkT, checkD), tt < checkT + checkD + 0.15); fade(check.el, alpha) }
      }
    },
  }
}
