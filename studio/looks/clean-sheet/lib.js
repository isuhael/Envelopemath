// Clean Sheet shared components. Every format in this kit builds from these so the look stays one system.
// API reference: looks/clean-sheet/README.md. All components build their DOM once and expose seek-style setters
// that only mutate through the caching setters (css / setText / setHTML / attr), so seek(t) stays cheap and pure.
import {
  h, s, css, setText, setHTML, attr, markup, plain, typed, prog, ease, clamp, lerp, fitText, captionAt,
} from '../../runtime/core.js'
import { C, TONE, F, SIZE, GRID, MOTION } from './theme.js'

export { C, TONE, F, SIZE, GRID, MOTION }

// ------------------------------------------------------------------ text + tone

/** "≈ 12" -> "≈<nbsp>12": the honesty sign never ends a line without its number */
export const bindApprox = (str = '') => String(str).replace(/≈[ \t]+/g, '≈ ')

/**
 * Spec markup -> HTML for this look: **x** = highlighter (<em>), __x__ = cost highlighter, "≈" in the accent,
 * bound to the figure after it with a no-break space.
 */
export function md(str = '') {
  return markup(bindApprox(str)).replace(/≈/g, '<span class="cs-approx">≈</span>')
}

/**
 * The optional "check:" line, read the same way in every format. Accepts a string or { t, text } in data.check or
 * lookOpts.check; its time comes from data.checkT, then lookOpts.checkT, then check.t, else null (the format's
 * default). "check: " is prefixed when missing (prefix: false keeps the text as written). null when there is none.
 */
export function readCheck(d = {}, LO = {}, { prefix = true } = {}) {
  const c = d && d.check != null && d.check !== '' ? d.check : LO && LO.check != null ? LO.check : null
  if (c == null || c === false) return null
  const obj = typeof c === 'object'
  let text = obj ? (c.text != null ? String(c.text) : '') : String(c)
  text = text.trim()
  if (!text) return null
  if (prefix && !/^check\b/i.test(text)) text = 'check: ' + text
  if (!prefix) text = text.replace(/^check:\s*/i, '')
  const tRaw = d && d.checkT != null ? d.checkT : LO && LO.checkT != null ? LO.checkT : obj && c.t != null ? c.t : null
  const t = tRaw == null ? null : +tRaw
  return { text, t: t != null && isFinite(t) ? t : null }
}

/** tone -> highlighter colour (good green, bad coral, goal blue, neutral sand, input yellow; default green) */
export const toneColor = tone => TONE[tone] || TONE.default

/** fixed-precision number -> string, so css() caching hits instead of thrashing on float noise */
const n3 = v => (Math.round(v * 1000) / 1000).toString()
const px = v => Math.round(v * 10) / 10 + 'px'

/** caret blink: on for the first 55% of each period (pure function of t) */
export const blink = (t, period = 1.0) => ((t % period) + period) % period < period * 0.55

/** opacity + rise for an element at progress p (0 hidden, 1 settled). dy: px it rises from. */
export function fadeUp(el, p, dy = MOTION.rise) {
  const q = clamp(p)
  css(el, { opacity: n3(q), transform: q >= 1 ? 'none' : `translateY(${Math.round((1 - ease.out(q)) * dy)}px)` })
}

/** a plain fade (no movement) */
export function fade(el, p) { css(el, { opacity: n3(clamp(p)) }) }

/** show/hide an element (display none keeps it out of the linter and the layout) */
export function show(el, on) { css(el, { display: on ? '' : 'none' }) }

// ------------------------------------------------------------------ fonts

/**
 * Load every face this look uses before defineKit() runs, so mount-time measuring (fitText, layout engines)
 * sees the real fonts. kit.js awaits this at top level.
 */
export async function preloadFonts() {
  const sample = 'AaZz09$,.%/:≈×÷−→+'
  const faces = [
    "400 84px 'Archivo Black'",
    "500 40px 'IBM Plex Mono'", "600 40px 'IBM Plex Mono'", "700 40px 'IBM Plex Mono'",
    ...[400, 500, 600, 700, 800, 900].map(w => `${w} 40px 'Inter'`),
    ...[500, 600, 700, 800, 900].map(w => `${w} 40px 'Inter Tight'`),
    ...[400, 500, 600, 700, 800, 900].map(w => `${w} 40px 'Inter Full'`),
  ]
  await Promise.all(faces.map(f => document.fonts.load(f, sample).catch(() => null)))
  await document.fonts.ready
}

// ------------------------------------------------------------------ timing

/**
 * Duration of a format: the later of (lastBeat + hold), (last VO line end + 0.4 s) and (verdict.t + 2.5 s),
 * plus `tail` (e.g. the loop clear). spec.duration always wins (defineKit applies it).
 */
export function durationOf(spec, lastBeat, { hold = MOTION.hold, tail = 0 } = {}) {
  let d = (lastBeat || 0) + hold
  for (const v of spec.vo || []) {
    const words = String(v.text || '').split(/\s+/).filter(Boolean).length
    const end = v.t + (v.d != null ? v.d : Math.max(1.2, words * 0.36))
    d = Math.max(d, end + 0.4)
  }
  if (spec.verdict && spec.verdict.t != null) d = Math.max(d, spec.verdict.t + 2.5)
  return Math.round((d + tail) * 100) / 100
}

/** standard result landing at t0: eased highlighter wipe + text pop progress */
export function landing(t, t0) {
  return { wipe: ease.out(prog(t, t0, MOTION.wipe)), text: prog(t, t0 + MOTION.popDelay, MOTION.pop) }
}

/**
 * Pointer path: stops [{ t, x, y }]; the pointer ARRIVES at each stop at stop.t (glides during the `glide`
 * seconds before it). Returns { x, y, moving } or null when there are no stops.
 */
export function pathAt(stops, t, glide = MOTION.glide) {
  if (!stops || !stops.length) return null
  let x = stops[0].x, y = stops[0].y, moving = false
  for (let i = 1; i < stops.length; i++) {
    const a = stops[i - 1], b = stops[i]
    const g = Math.min(glide, Math.max(0.05, b.t - a.t))
    const p = prog(t, b.t - g, g)
    if (p <= 0) break
    if (p < 1) moving = true
    const e = ease.inOut(p)
    x = lerp(a.x, b.x, e); y = lerp(a.y, b.y, e)
  }
  return { x, y, moving }
}

// ------------------------------------------------------------------ components

/**
 * Highlighter box: a result / key number set in `family` on a tone-coloured box that wipes in left to right.
 *   const hb = hlBox({ html: md('$65,000'), tone: 'good', px: 66 })
 *   parent.append(hb.el)                    // inline-flex, position: relative (position it yourself)
 *   hb.seek(wipe, text, rest)               // wipe 0..1 (eased), text 0..1 (linear; eased inside), rest 0..1
 * rest fades the box to MOTION.rest opacity: a finished result that is no longer the focal number.
 */
export function hlBox({ html = '', tone, color, px: size = SIZE.result, family = F.display, weight = 400, padX = 14, radius = 10, height, cls = '', popFrom = MOTION.popFrom, retone = null } = {}) {
  const bg = h('div', { class: 'cs-hl-bg' })
  // optional second tone that wipes over the first (a result re-marked as the winner / the goal)
  const re = retone ? h('div', { class: 'cs-hl-bg cs-hl-re' }) : null
  const txt = h('span', { class: 'cs-hl-txt', html })
  const el = h('div', { class: ('cs-hl ' + cls).trim() }, bg, re, txt)
  let from = popFrom
  const api = {
    el, bg, re, txt,
    setTone(t2, c2) { css(bg, { background: c2 || toneColor(t2) }) },
    /** the second layer's tone (hlBox({ retone }) creates it) */
    setRetone(t2, c2) { if (re) css(re, { background: c2 || toneColor(t2) }) },
    setPx(p2, h2) {
      css(el, { fontSize: px(p2), height: px(h2 || Math.round(p2 * 1.3)), fontFamily: family, fontWeight: String(weight) })
      css(txt, { padding: `0 ${px(padX * (p2 / SIZE.result) ** 0.5)}` })
      css(bg, { borderRadius: px(radius) })
      if (re) css(re, { borderRadius: px(radius) })
      // the pop never shrinks text under the 40 px floor (small boxes land at a larger start scale, or none)
      from = Math.min(1, Math.max(popFrom, SIZE.floor / p2))
    },
    setHTML(v) { setHTML(txt, v) },
    width() { return el.getBoundingClientRect().width },
    seek(wipe = 1, text = 1, rest = 0) {
      const w = clamp(wipe)
      css(bg, {
        clipPath: w >= 1 ? 'none' : `inset(0 ${n3((1 - w) * 100)}% 0 0 round ${radius}px)`,
        opacity: n3(w <= 0 ? 0 : lerp(1, MOTION.rest, clamp(rest))),
      })
      const p = clamp(text)
      const sc = p >= 1 || from >= 1 ? 1 : lerp(from, 1, ease.back(p, 2.2))
      css(txt, { opacity: n3(clamp(p * 4)), transform: sc === 1 ? 'none' : `scale(${n3(sc)})` })
    },
    /** wipe the second tone over the box, left to right (0..1), resting with `rest` like the box itself */
    seekRetone(wipe = 0, rest = 0) {
      if (!re) return
      const w = clamp(wipe)
      css(re, {
        clipPath: w >= 1 ? 'none' : `inset(0 ${n3((1 - w) * 100)}% 0 0 round ${radius}px)`,
        opacity: n3(w <= 0 ? 0 : lerp(1, MOTION.rest, clamp(rest))),
      })
    },
  }
  api.setTone(tone, color)
  if (re) { api.setRetone(retone); api.seekRetone(0) }
  api.setPx(size, height)
  api.seek(1, 1, 0)
  return api
}

/**
 * Typed line (formulas, check lines): text types grapheme by grapheme with a caret.
 *   const tl = typeLine({ text: '$2,500 × 26', suffix: ' =' })
 *   tl.seek(p, caretOn)                     // p 0..1 typed fraction; caretOn shows the accent caret
 * Defaults: IBM Plex Mono 600, SIZE.formula, grey. tl.full is the complete string (text + suffix).
 */
export function typeLine({ text = '', suffix = '', px: size = SIZE.formula, color = C.grey, family = F.mono, weight = 600, cls = '' } = {}) {
  const full = String(text) + suffix
  const span = h('span', { class: 'cs-type-txt' })
  const caret = h('span', { class: 'cs-caret' })
  const el = h('div', { class: ('cs-type ' + cls).trim() }, span, caret)
  css(el, { fontSize: px(size), color, fontFamily: family, fontWeight: String(weight) })
  return {
    el, full, span, caret,
    setPx(p2) { css(el, { fontSize: px(p2) }) },
    /** natural width of the complete line (measure at mount) */
    measure() { const keep = span.textContent; span.textContent = full; const w = span.getBoundingClientRect().width; span.textContent = keep; span.__t = keep; return w },
    seek(p, caretOn = false) {
      setText(span, typed(full, p))
      css(caret, { opacity: caretOn ? '1' : '0' })
    },
  }
}

/**
 * Break a typed line (a check, a formula) so it fits maxW at its size: one line if it fits, else two lines (three
 * for a very long sum) broken before "=" / "≈" or an operator where possible, else at the most balanced space.
 * Measured once at mount with a probe in `parent` (it must be in the stage, so the fonts and letter-spacing match).
 * Returns { text (with "\n"), lines, width }.
 */
export function breakLine(parent, text, maxW, { px: size = SIZE.check, family = F.mono, weight = 500, maxLines = 3 } = {}) {
  const probe = typeLine({ text: '', px: size, family, weight })
  parent.append(probe.el)
  const memo = new Map()
  const wOf = s0 => { if (!memo.has(s0)) { setText(probe.span, s0); memo.set(s0, probe.span.getBoundingClientRect().width + 8) } return memo.get(s0) }
  const full = String(text)
  const words = full.split(' ')
  const join = (a, b) => words.slice(a, b).join(' ')
  // a break before word i: preferred before "=" / "≈", then before an operator, else anywhere
  const pref = i => (/^[=≈]/.test(words[i]) ? 0.9 : /^[+−×÷]/.test(words[i]) ? 0.95 : 1)
  let out = { text: full, lines: 1, width: wOf(full) }
  if (out.width > maxW && words.length > 1) {
    let best = null
    const n = words.length
    for (let a = 1; a < n; a++) {
      const l1 = wOf(join(0, a)), l2 = wOf(join(a, n))
      if (l1 <= maxW && l2 <= maxW) {
        const sc = Math.max(l1, l2) * pref(a)
        if (!best || best.lines > 2 || sc < best.sc) best = { cuts: [a], lines: 2, sc, width: Math.max(l1, l2) }
      }
      if (maxLines >= 3 && (!best || best.lines === 3)) for (let b = a + 1; b < n; b++) {
        const w3 = [wOf(join(0, a)), wOf(join(a, b)), wOf(join(b, n))]
        if (Math.max(...w3) > maxW) continue
        const sc = Math.max(...w3) * pref(a) * pref(b)
        if (!best || (best.lines === 3 && sc < best.sc)) best = { cuts: [a, b], lines: 3, sc, width: Math.max(...w3) }
      }
    }
    if (best) {
      const cuts = [0, ...best.cuts, n]
      out = { text: cuts.slice(0, -1).map((c, k) => join(c, cuts[k + 1])).join('\n'), lines: best.lines, width: best.width }
    }
  }
  probe.el.remove()
  return out
}

/** seconds to type a string at MOTION.typeCps (clamped 0.35-2.2 s) */
export const typeTime = str => clamp(String(str).length / MOTION.typeCps, 0.35, 2.2)

/**
 * Circled step number: accent ring; fills solid (white numeral) while it is the active step.
 *   const st = stepCircle(1, { size: 72 }); st.seek(active)   // active 0..1 (eased inside, with overshoot)
 */
export function stepCircle(n, { size = SIZE.circle } = {}) {
  const fill = h('div', { class: 'cs-step-fill' })
  const num = h('span', { class: 'cs-step-n', text: String(n) })
  const el = h('div', { class: 'cs-step' }, fill, num)
  const api = {
    el, size,
    setSize(sz) {
      api.size = sz
      css(el, { width: px(sz), height: px(sz), borderWidth: px(Math.max(3, sz / 18)) })
      css(num, { fontSize: px(Math.max(SIZE.floor, sz * 0.61)) })
    },
    seek(active) {
      // the fill grows from 55% with a small overshoot while it fades in; the numeral turns white exactly when
      // the fill passes half opacity, so it never sits accent-on-accent (or white-on-page) for a frame
      const a = clamp(active)
      const op = clamp(a * 2)
      const sc = a >= 1 ? 1 : lerp(0.55, 1, ease.back(a, 2.4))
      css(fill, { opacity: n3(op), transform: sc === 1 ? 'none' : `scale(${n3(sc)})` })
      css(num, { color: op > 0.5 ? C.white : C.accent })
    },
  }
  api.setSize(size)
  api.seek(0)
  return api
}

/**
 * Pointer: a flat accent arrowhead with a white keyline. dir 'left' (tip at the left, for walking rows from
 * the right) or 'up' (tip at the top). The tip sits exactly at (x, y). Keep it inside x 60-1020 and off numbers.
 *   const pt = pointer({ dir: 'left' }); layer.append(pt.el); pt.seek({ x, y, o, press })
 */
export function pointer({ dir = 'left', size = 56 } = {}) {
  const svg = s('svg', { width: size, height: size, viewBox: '0 0 56 56', class: 'cs-pointer', 'data-deco': '' },
    s('path', { d: 'M4 28 L46 6 L37 28 L46 50 Z', fill: C.accent, stroke: C.white, 'stroke-width': 4, 'stroke-linejoin': 'round' }))
  const el = h('div', { class: 'cs-pointer-wrap', 'data-deco': '' }, svg)
  const rot = dir === 'up' ? 90 : 0
  return {
    el,
    seek({ x = 0, y = 0, o = 1, press = 0 } = {}) {
      // tip of the dart is at (4, 28) in the 56 box
      const sc = 1 - 0.12 * clamp(press)
      css(el, {
        opacity: n3(clamp(o)),
        transform: `translate(${n3(x - 4)}px, ${n3(y - 28)}px) rotate(${rot}deg) scale(${n3(sc)})`,
      })
    },
  }
}

/**
 * Typeset table (booktabs: heavy top and bottom rules, a hairline under the head, hairlines between rows).
 *   const tb = table({ top: 560, columns: [{ label: 'Start at age' }, { label: 'Worth at 65', emph: true }],
 *                      rows: [['20', '≈ $345,000'], ...] })
 *   layer.append(tb.el)
 *   tb.seekHead(p); tb.seekRow(i, p); tb.seekBand(i, wipe, tone); tb.seekCell(i, j, wipe, tone, rest)
 *   tb.rowY(i) -> absolute y of row i's top; tb.rowMid(i); tb.height; tb.cell(i, j) -> { el, hl }
 * columns[j]: { label, emph?, align? ('left' | 'right'; default left for col 0, right otherwise), w? (weight) }
 * Cells are display strings (markup allowed). Emph columns set in Archivo Black, others in Inter Tight 700.
 */
export function table({ left = GRID.left, top = 560, width = GRID.rail - GRID.left, columns = [], rows = [], rowH = 84, cellPx = SIZE.cell, headPx = SIZE.head, headH } = {}) {
  const hh = headH || Math.round(headPx * 1.25 + 28)
  const weights = columns.map(c => c.w || 1)
  const tw = weights.reduce((a, b) => a + b, 0)
  const pad = 16
  let x = 0
  const cols = columns.map((c, j) => {
    const w = (width * weights[j]) / tw
    const col = { x, w, align: c.align || (j === 0 ? 'left' : 'right'), emph: !!c.emph }
    x += w
    return col
  })
  const el = h('div', { class: 'cs-table' })
  css(el, { left: px(left), top: px(top), width: px(width), height: px(hh + rows.length * rowH + 6) })
  const ruleTop = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  const ruleMid = h('div', { class: 'cs-rule-thin', 'data-deco': '' })
  const ruleBot = h('div', { class: 'cs-rule-heavy', 'data-deco': '' })
  css(ruleTop, { top: '0px' }); css(ruleMid, { top: px(hh - 2) }); css(ruleBot, { top: px(hh + rows.length * rowH + 2) })
  const head = h('div', { class: 'cs-thead' })
  css(head, { height: px(hh), fontSize: px(headPx) })
  columns.forEach((c, j) => {
    const cell = h('div', { class: 'cs-th' + (cols[j].emph ? ' emph' : ''), html: md(c.label || '') })
    css(cell, { left: px(cols[j].x + pad), width: px(cols[j].w - 2 * pad), textAlign: cols[j].align })
    head.append(cell)
  })
  el.append(ruleTop, head, ruleMid)
  const R = rows.map((r, i) => {
    const row = h('div', { class: 'cs-tr' })
    css(row, { top: px(hh + i * rowH), height: px(rowH) })
    const band = h('div', { class: 'cs-tr-band' })
    const line = h('div', { class: 'cs-tr-line', 'data-deco': '' })
    row.append(band)
    const cells = r.map((v, j) => {
      const col = cols[j] || cols[cols.length - 1]
      const hb = hlBox({ html: md(String(v)), tone: 'input', px: cellPx, family: col.emph ? F.display : F.tight, weight: col.emph ? 400 : 700, padX: 12, height: Math.round(cellPx * 1.34) })
      hb.seek(0, 1, 0)
      const wrap = h('div', { class: 'cs-td' + (col.emph ? ' emph' : '') }, hb.el)
      css(wrap, { left: px(col.x + pad - 12), width: px(col.w - 2 * pad + 24), justifyContent: col.align === 'right' ? 'flex-end' : 'flex-start' })
      row.append(wrap)
      return { el: wrap, hl: hb }
    })
    if (i < rows.length - 1) row.append(line)
    el.append(row)
    return { el: row, band, cells }
  })
  el.append(ruleBot)
  const api = {
    el, head, rows: R, cols, height: hh + rows.length * rowH + 6, headH: hh, rowH,
    rowY: i => top + hh + i * rowH,
    rowMid: i => top + hh + i * rowH + rowH / 2,
    cell: (i, j) => R[i] && R[i].cells[j],
    seekHead(p) { fadeUp(head, p, 6); fade(ruleTop, p); fade(ruleMid, p) },
    seekBottom(p) { fade(ruleBot, p) },
    seekRow(i, p) { if (R[i]) fadeUp(R[i].el, p, 14) },
    /** full-row highlighter band (a pick / the winning row) */
    seekBand(i, wipe, tone = 'input') {
      const b = R[i] && R[i].band
      if (!b) return
      const w = clamp(wipe)
      css(b, { background: toneColor(tone), opacity: w > 0 ? '1' : '0', clipPath: w >= 1 ? 'none' : `inset(0 ${n3((1 - w) * 100)}% 0 0 round 10px)` })
    },
    /** one cell's own highlighter box */
    seekCell(i, j, wipe, tone = 'input', rest = 0) {
      const c = api.cell(i, j)
      if (!c) return
      c.hl.setTone(tone)
      c.hl.seek(wipe, 1, rest)
    },
  }
  return api
}

/**
 * Sheet row: "Label ........ $amount" with an optional percentage column and a note under the label.
 *   const r = sheetRow({ label: 'Needs', pct: '50%', amount: '$2,000', note: 'rent, food, bills', tone: 'neutral' })
 *   layer.append(r.el); css(r.el, { top: '640px' })
 *   r.seek({ leader, amount, rest, active })   // leader draw 0..1, amount: { wipe, text } or number, active 0..1
 * Width defaults to the work column (x 84 -> 940). The amount is a hlBox (r.amount); r.height is its height.
 */
export function sheetRow({ label = '', note = '', pct = '', amount = '', tone, left = GRID.left, width = GRID.rail - GRID.left, px: size = SIZE.label, amountPx = 60, pctW = 0, labelW = 0 } = {}) {
  const lab = h('div', { class: 'cs-sr-label', html: md(label) })
  const nt = note ? h('div', { class: 'cs-sr-note', html: md(note) }) : null
  const labCol = h('div', { class: 'cs-sr-labcol' }, lab, nt)
  const pc = pct ? h('div', { class: 'cs-sr-pct', html: md(pct) }) : null
  const leader = h('div', { class: 'cs-sr-leader', 'data-deco': '' })
  const amt = hlBox({ html: md(amount), tone, px: amountPx })
  const el = h('div', { class: 'cs-sr' }, labCol, pc, leader, amt.el)
  css(el, { left: px(left), width: px(width) })
  css(lab, { fontSize: px(size) })
  if (labelW) css(labCol, { width: px(labelW) })
  if (pc) css(pc, { fontSize: px(Math.max(40, size * 0.95)), minWidth: pctW ? px(pctW) : '' })
  return {
    el, label: lab, note: nt, pct: pc, leader, amount: amt, labCol,
    get height() { return el.getBoundingClientRect().height },
    seek({ leader: pl = 1, amount: pa = 1, rest = 0, active = 0 } = {}) {
      const w = clamp(pl)
      css(leader, { clipPath: w >= 1 ? 'none' : `inset(0 ${n3((1 - w) * 100)}% 0 0)` })
      const a = typeof pa === 'number' ? { wipe: pa, text: pa } : pa
      amt.seek(a.wipe, a.text, rest)
      css(el, { '--active': n3(clamp(active)) })
    },
  }
}

/**
 * Give every row's label column (and % column) the widest one's width, so the % column and the leaders line up.
 * Call once at mount, after the rows are in the DOM. Returns the label column width.
 */
export function alignSheetRows(rows) {
  const lw = Math.ceil(Math.max(0, ...rows.map(r => { css(r.labCol, { width: '' }); return r.labCol.getBoundingClientRect().width })))
  const pw = Math.ceil(Math.max(0, ...rows.map(r => (r.pct ? r.pct.getBoundingClientRect().width : 0))))
  for (const r of rows) { css(r.labCol, { width: px(lw) }); if (r.pct) css(r.pct, { minWidth: px(pw) }) }
  return lw
}

// ------------------------------------------------------------------ line fitting (header, verdict, footer, labels)

/** words of one explicit line, each with its emphasis ('' | 'em' | 'mark2') and whether a space precedes it */
function tokensOf(line) {
  const toks = []
  let space = false
  for (const seg of segmentsOf(bindApprox(line))) {
    for (const part of seg.text.split(/( +)/)) {
      if (!part) continue
      if (/^ +$/.test(part)) { space = true; continue }
      toks.push({ text: part, cls: seg.cls, space: space && toks.length > 0 })
      space = false
    }
  }
  return toks
}
const escHTML = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/≈/g, '<span class="cs-approx">≈</span>')
const TAG = { em: ['<em>', '</em>'], mark2: ['<u class="mark2">', '</u>'], '': ['', ''] }
/** one set line: consecutive words of one emphasis share one <em> (a highlight never spans two lines) */
function lineHTML(toks) {
  let out = '', open = null
  toks.forEach((tk, i) => {
    if (tk.cls !== open) {
      if (open != null) out += TAG[open][1]
      if (tk.space && i) out += ' '
      out += TAG[tk.cls][0]
      open = tk.cls
    } else if (tk.space && i) out += ' '
    out += escHTML(tk.text)
  })
  if (open != null) out += TAG[open][1]
  return out
}

/**
 * Set spec markup into `el` as explicit, unbreakable lines, as large as fits:
 *   every "\n" segment on one line first; a segment splits (at its most balanced word break, never between "≈"
 *   and its figure, preferably not inside a highlight) only when that buys at least `linePenalty` px of type.
 * opts: { maxW, maxH, maxPx, minPx, lh (line-height factor of el), maxSplit = 3 (lines per segment),
 *         linePenalty = 8, maxLines = Infinity }
 * Returns { px, lines, fits }. If nothing fits at minPx, the text is set at minPx and wraps naturally (fits: false; the
 * linter reports it).
 */
export function fitMarkup(el, str, { maxW, maxH = Infinity, maxPx, minPx, lh = 1.2, maxSplit = 3, linePenalty = 8, maxLines = Infinity } = {}) {
  const segs = String(str || '').split('\n').map(tokensOf)
  const REFPX = 100
  css(el, { whiteSpace: 'nowrap', fontSize: REFPX + 'px', textWrap: 'nowrap' })
  const probe = h('span', { style: { display: 'inline-block', whiteSpace: 'nowrap' } })
  el.innerHTML = ''
  el.append(probe)
  const memo = new Map()
  const widthOf = (si, a, b) => {
    const k = si + ':' + a + ':' + b
    if (!memo.has(k)) { probe.innerHTML = lineHTML(segs[si].slice(a, b)); memo.set(k, probe.getBoundingClientRect().width) }
    return memo.get(k)
  }
  // per segment: candidate splits into 1..maxSplit lines -> { k, w (widest line at REFPX), cuts, bp (break cost, px) }
  const FUNC = /^(a|an|the|of|to|in|on|at|for|and|or|by|with|your|my|is|if)$/i
  const opts = segs.map((toks, si) => {
    const n = toks.length
    const breaks = [] // a line may start at token i
    for (let i = 1; i < n; i++) if (toks[i].space) breaks.push(i)
    // what a break before token i costs, in px of type: inside a highlight or after a little word is worse; after
    // a pause (?, :, ·, comma) is better
    const bpAt = i => {
      let c = 0
      if (toks[i - 1].cls && toks[i - 1].cls === toks[i].cls) c += 8
      if (FUNC.test(toks[i - 1].text)) c += 6
      if (/[?!.:;]$/.test(toks[i - 1].text)) c -= 4
      else if (/[·,]$/.test(toks[i - 1].text) || toks[i - 1].text === '·') c -= 2
      return c
    }
    const keep = (list, m) => {
      const byW = list.slice().sort((x, y) => x.w - y.w).slice(0, m)
      const byB = list.slice().sort((x, y) => x.bp - y.bp || x.w - y.w).slice(0, 2)
      return [...new Set([...byW, ...byB])]
    }
    // a split costs its breaks plus its raggedness (a lopsided split never wins on a nice break alone)
    const split = (cuts, ws) => {
      const r = Math.min(...ws) / Math.max(...ws)
      const bps = cuts.map(bpAt)
      const bp = bps.reduce((a, c) => a + (c < 0 && r < 0.6 ? 0 : c), 0) + Math.round(10 * (1 - r))
      return { k: ws.length, w: Math.max(...ws), cuts, bp }
    }
    const out = [{ k: 1, w: n ? widthOf(si, 0, n) : 0, cuts: [], bp: 0 }]
    if (maxSplit >= 2 && breaks.length) {
      out.push(...keep(breaks.map(b => split([b], [widthOf(si, 0, b), widthOf(si, b, n)])), 4))
    }
    if (maxSplit >= 3 && breaks.length >= 2) {
      const l3 = []
      for (let x = 0; x < breaks.length; x++) for (let y = x + 1; y < breaks.length; y++) {
        const b1 = breaks[x], b2 = breaks[y]
        l3.push(split([b1, b2], [widthOf(si, 0, b1), widthOf(si, b1, b2), widthOf(si, b2, n)]))
      }
      out.push(...keep(l3, 3))
    }
    return out
  })
  probe.remove()
  // every combination of per-segment splits; the largest type wins, each extra line costs linePenalty px
  const n0 = segs.length
  let best = null, biggest = null
  const walk = (i, pick) => {
    if (i === n0) {
      const L = pick.reduce((a, o) => a + o.k, 0)
      if (L > maxLines) return
      const wmax = Math.max(1, ...pick.map(o => o.w))
      const px = Math.floor(Math.min(maxPx, (REFPX * maxW) / wmax, maxH / (L * lh)))
      // (a nicer break never buys type under the 40 px must-read floor)
      const under = px < SIZE.floor ? 20 + (SIZE.floor - px) * 4 : 0
      const cand = { pick: pick.slice(), px, L, score: px - linePenalty * (L - n0) - pick.reduce((a, o) => a + o.bp, 0) - under }
      if (!biggest || px > biggest.px) biggest = cand
      if (px >= minPx && (!best || cand.score > best.score + 1e-9 || (Math.abs(cand.score - best.score) < 1e-9 && L < best.L))) best = cand
      return
    }
    for (const o of opts[i]) { pick.push(o); walk(i + 1, pick); pick.pop() }
  }
  walk(0, [])
  const ch = best || biggest
  const lines = []
  ch.pick.forEach((o, si) => {
    const toks = segs[si]
    const cuts = [0, ...o.cuts, toks.length]
    for (let c = 0; c + 1 < cuts.length; c++) lines.push(lineHTML(toks.slice(cuts[c], cuts[c + 1])))
  })
  el.innerHTML = lines.join('<br>')
  let size = Math.max(minPx, Math.min(maxPx, ch.px))
  css(el, { fontSize: size + 'px' })
  // rounding and kerning: settle on the exact width
  while (size > minPx && el.scrollWidth > maxW + 0.5) { size -= 1; css(el, { fontSize: size + 'px' }) }
  const fits = el.scrollWidth <= maxW + 0.5 && lines.length * size * lh <= maxH + 0.5
  if (el.scrollWidth > maxW + 0.5) css(el, { whiteSpace: 'normal', textWrap: 'balance' }) // last resort
  return { px: size, lines: lines.length, fits }
}

// ------------------------------------------------------------------ unit icons (flat monoline, 48 x 48)

// Each icon: ink outline (stroke 2.6, round joins) over flat palette fills. Names follow FORMATS.md.
const ICONS = {
  cup: [
    ['path', { d: 'M13 15 H35 L32 41 A3 3 0 0 1 29 43.5 H19 A3 3 0 0 1 16 41 Z', fill: 'sand' }],
    ['path', { d: 'M14.6 25 H33.4 L32.3 34 H15.7 Z', fill: 'green' }],
    ['rect', { x: 10.5, y: 9.5, width: 27, height: 5.5, rx: 2, fill: 'white' }],
  ],
  hotdog: [
    ['path', { d: 'M7 27 C7 20 12 19 17 19 H31 C36 19 41 20 41 27 C41 34 36 35 31 35 H17 C12 35 7 34 7 27 Z', fill: 'yellow' }],
    ['path', { d: 'M5 24.5 C5 21 7.5 20.5 10 20.5 H38 C40.5 20.5 43 21 43 24.5 C43 28 40.5 28.5 38 28.5 H10 C7.5 28.5 5 28 5 24.5 Z', fill: 'coral' }],
    ['path', { d: 'M11 24.5 C13.5 22.5 15.5 26.5 18 24.5 S22.5 22.5 25 24.5 S29.5 26.5 32 24.5 S35 22.5 37 24.5', fill: 'none' }],
  ],
  burger: [
    ['path', { d: 'M9 21 C9 13 16 9 24 9 C32 9 39 13 39 21 Z', fill: 'yellow' }],
    ['rect', { x: 8, y: 24, width: 32, height: 6, rx: 3, fill: 'coral' }],
    ['path', { d: 'M9 33 H39 V36 C39 38.5 37 40 34.5 40 H13.5 C11 40 9 38.5 9 36 Z', fill: 'yellow' }],
    ['path', { d: 'M8 21 H40', fill: 'none' }],
  ],
  pizza: [
    ['path', { d: 'M24 43 L8.5 12.5 C18 7.5 30 7.5 39.5 12.5 Z', fill: 'yellow' }],
    ['path', { d: 'M8.5 12.5 C18 7.5 30 7.5 39.5 12.5 L37.6 16.2 C28.8 11.8 19.2 11.8 10.4 16.2 Z', fill: 'sand' }],
    ['circle', { cx: 20, cy: 21, r: 3, fill: 'coral' }],
    ['circle', { cx: 28.5, cy: 24, r: 3, fill: 'coral' }],
    ['circle', { cx: 23.5, cy: 32, r: 2.6, fill: 'coral' }],
  ],
  phone: [
    ['rect', { x: 13, y: 5, width: 22, height: 38, rx: 4.5, fill: 'white' }],
    ['rect', { x: 16.5, y: 10, width: 15, height: 25, rx: 1.5, fill: 'blue' }],
    ['path', { d: 'M21 39 H27', fill: 'none' }],
  ],
  car: [
    ['path', { d: 'M5 31 V25.5 C5 23.5 6.5 22.5 8.5 22 L13 21 L17.5 14.5 C18.3 13.4 19.4 13 20.6 13 H30 C31.3 13 32.4 13.6 33.1 14.6 L37.5 21 L41 22 C42.5 22.5 43 23.5 43 25 V31 Z', fill: 'blue' }],
    ['path', { d: 'M18.5 21 L21.5 16.5 H24 V21 Z M27 21 V16.5 H30 L33 21 Z', fill: 'white' }],
    ['circle', { cx: 14, cy: 32.5, r: 4.5, fill: 'white' }],
    ['circle', { cx: 34, cy: 32.5, r: 4.5, fill: 'white' }],
  ],
  house: [
    ['path', { d: 'M8 22 L24 9 L40 22 V41 H8 Z', fill: 'sand' }],
    ['path', { d: 'M5 24.5 L24 9 L43 24.5', fill: 'none' }],
    ['rect', { x: 20, y: 29, width: 8, height: 12, rx: 1, fill: 'blue' }],
  ],
  coin: [
    ['circle', { cx: 24, cy: 24, r: 17.5, fill: 'yellow' }],
    ['circle', { cx: 24, cy: 24, r: 12.5, fill: 'none' }],
    ['path', { d: 'M28 19.5 C27.2 18 25.8 17.5 24 17.5 C21.6 17.5 20 18.8 20 20.6 C20 25 28.3 22.6 28.3 27.4 C28.3 29.3 26.5 30.6 24 30.6 C22 30.6 20.5 29.8 19.7 28.3 M24 15 V17.5 M24 30.6 V33', fill: 'none' }],
  ],
  bill: [
    ['rect', { x: 4.5, y: 13, width: 39, height: 22, rx: 2.5, fill: 'green' }],
    ['circle', { cx: 24, cy: 24, r: 5.5, fill: 'white' }],
    ['path', { d: 'M9.5 18 V18.1 M38.5 30 V30.1', fill: 'none' }],
  ],
  gas: [
    ['path', { d: 'M9 42 V10 C9 7.5 10.5 6 13 6 H25 C27.5 6 29 7.5 29 10 V42 Z', fill: 'coral' }],
    ['rect', { x: 13, y: 11, width: 12, height: 9, rx: 1.5, fill: 'white' }],
    ['path', { d: 'M29 17 H33 C35 17 36 18 36 20 V33 C36 35 37 36 38.5 36 C40 36 41 35 41 33 V16 L37 12', fill: 'none' }],
    ['path', { d: 'M6 42 H32', fill: 'none' }],
  ],
  ticket: [
    ['path', { d: 'M5 14 H43 V20.5 A3.5 3.5 0 0 0 43 27.5 V34 H5 V27.5 A3.5 3.5 0 0 0 5 20.5 Z', fill: 'yellow' }],
    ['path', { d: 'M17 16.5 V19 M17 22.8 V25.2 M17 29 V31.5', fill: 'none' }],
  ],
  bag: [
    ['path', { d: 'M9 17 H39 L36.5 42 H11.5 Z', fill: 'coral' }],
    ['path', { d: 'M17.5 21 V13.5 C17.5 9.5 20.4 7 24 7 C27.6 7 30.5 9.5 30.5 13.5 V21', fill: 'none' }],
  ],
  egg: [
    ['path', { d: 'M24 6 C31.5 6 37.5 17.5 37.5 27.5 C37.5 36 31.5 42 24 42 C16.5 42 10.5 36 10.5 27.5 C10.5 17.5 16.5 6 24 6 Z', fill: 'sand' }],
    ['path', { d: 'M17 27 C17 23 18.5 19.5 20.5 17', fill: 'none', 'stroke-opacity': 0.55 }],
  ],
  hour: [
    ['circle', { cx: 24, cy: 24, r: 17.5, fill: 'blue' }],
    ['path', { d: 'M24 13.5 V24 L31 28.5', fill: 'none' }],
    ['path', { d: 'M24 8.6 V9 M39.4 24 H39 M24 39.4 V39 M8.6 24 H9', fill: 'none' }],
  ],
  token: [
    ['rect', { x: 8, y: 8, width: 32, height: 32, rx: 9, fill: 'sand' }],
    ['circle', { cx: 24, cy: 24, r: 6, fill: 'blue' }],
  ],
}
export const ICON_NAMES = Object.keys(ICONS)
const FILL = { sand: C.sand, green: C.green, yellow: C.yellow, coral: C.coral, blue: C.blue, white: C.white }

function iconShapes(name, { stroke = C.ink, sw = 2.6, mono = null } = {}) {
  const parts = ICONS[name] || ICONS.token
  return parts.map(([tag, a]) => {
    const fill = a.fill === 'none' ? 'none' : mono || FILL[a.fill] || a.fill
    return s(tag, { ...a, fill, stroke, 'stroke-width': sw, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' })
  })
}

/**
 * One unit icon as an <svg> (size px square). Unknown names fall back to 'token'.
 *   opts: { size = 64, stroke = C.ink, sw = 2.6 (in 48-unit space), mono: '#hex' fills every shape one colour }
 */
export function unitIcon(name, { size = 64, ...o } = {}) {
  return s('svg', { width: size, height: size, viewBox: '0 0 48 48', class: 'cs-icon', 'data-deco': '' }, ...iconShapes(name, o))
}

/**
 * Icon sheets with hundreds of units: put iconDefs() once in the layer, then iconUse(name) per unit
 * (a <use> of a shared <symbol>; far cheaper than full SVGs).
 */
export function iconDefs(names = ICON_NAMES, o = {}) {
  return s('svg', { width: 0, height: 0, style: 'position:absolute', 'aria-hidden': 'true', 'data-deco': '' },
    s('defs', {}, ...names.map(n => s('symbol', { id: 'cs-icon-' + n, viewBox: '0 0 48 48' }, ...iconShapes(n, o)))))
}
export function iconUse(name, { size = 40 } = {}) {
  const id = ICONS[name] ? name : 'token'
  return s('svg', { width: size, height: size, viewBox: '0 0 48 48', class: 'cs-icon', 'data-deco': '' }, s('use', { href: '#cs-icon-' + id }))
}

// ------------------------------------------------------------------ brand mark

/** small line-icon envelope + "BACK OF THE ENVELOPE" (decoration zone, y 150-190) */
export function brandMark() {
  const icon = s('svg', { width: 56, height: 40, viewBox: '0 0 56 40', 'data-deco': '' },
    s('rect', { x: 2.5, y: 2.5, width: 51, height: 35, rx: 5, fill: 'none', stroke: C.accent, 'stroke-width': 3.6 }),
    s('path', { d: 'M5 6 L28 23 L51 6', fill: 'none', stroke: C.accent, 'stroke-width': 3.6, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }))
  return h('div', { class: 'cs-brand', 'data-deco': '' }, icon, h('span', { text: 'BACK OF THE ENVELOPE' }))
}

// ------------------------------------------------------------------ page + chrome

/**
 * Builds the shared page for every format (called by kit.js BEFORE the format factory):
 * desk, card, dot grid, brand mark, header, footer, work layer, caption + verdict boxes.
 * Sets and returns ctx.page:
 *   { layer, top, bottom, left, textX, right, header, footer, captionsOn, hasVerdict, clear }
 * A format appends its DOM to ctx.page.layer (a full-stage absolute layer above the card) and keeps
 * its content inside y [top, bottom], x [left, right]. Set ctx.page.clear = { t0, dur } to have the chrome
 * fade the verdict out with the format's loop reset.
 */
export function mountPage(spec, ctx) {
  const stage = ctx.stage
  const desk = h('div', { class: 'cs-desk', 'data-deco': '' })
  const card = h('div', { class: 'cs-card', 'data-deco': '' })
  const dots = h('div', { class: 'cs-dots', 'data-deco': '' })
  card.append(dots)
  const brand = brandMark()
  const header = h('div', { class: 'cs-header', html: md(spec.header || '') })
  const footer = spec.footer ? h('div', { class: 'cs-footer', html: md(spec.footer) }) : null
  const layer = h('div', { class: 'cs-work' })
  const captionsOn = spec.captions !== false && Array.isArray(spec.vo) && spec.vo.length > 0
  const hasVerdict = !!(spec.verdict && spec.verdict.text)
  const rule = h('div', { class: 'cs-caprule', 'data-deco': '' })
  const capBox = h('div', { class: 'cs-captions' })
  const verdict = hasVerdict ? h('div', { class: 'cs-verdict', html: md(spec.verdict.text) }) : null
  stage.append(desk, card, brand, header, ...(footer ? [footer] : []), layer, rule, capBox, ...(verdict ? [verdict] : []))

  // header: every explicit line on one line, as large as the band allows (84 -> 56 px); a line splits (balanced,
  // never orphaning a highlight or a "≈") only when that buys real size
  fitMarkup(header, spec.header || '', { maxW: GRID.headerW, maxH: GRID.headerBottom - GRID.headerTop, maxPx: SIZE.title, minPx: SIZE.titleMin, lh: 1.08 })
  const hb = header.getBoundingClientRect().bottom
  let top = hb + 52
  if (footer) {
    css(footer, { top: Math.round(hb + 14) + 'px' })
    // the assumption line: 40 px (36 at least), balanced over 2 lines at most
    fitMarkup(footer, spec.footer, { maxW: GRID.headerW, maxH: Math.round(SIZE.footer * 1.25 * 2) + 2, maxPx: SIZE.footer, minPx: SIZE.footerMin, lh: 1.25, maxLines: 2, maxSplit: 2, linePenalty: 2 })
    top = footer.getBoundingClientRect().bottom + GRID.workGap
  }
  top = Math.round(top)
  const usesBand = captionsOn || hasVerdict
  css(rule, { display: usesBand ? '' : 'none' })
  css(dots, { '--dots-from': Math.round(top - GRID.card.y - 30) + 'px', '--dots-full': Math.round(top - GRID.card.y + 90) + 'px' })

  // captions: one block per VO line, words wrapped for the word-by-word reveal
  const lines = captionsOn ? spec.vo.map(v => buildCaption(v)) : []
  for (const l of lines) capBox.append(l.el)
  for (const l of lines) {
    css(l.el, { fontSize: SIZE.caption + 'px', display: '' })
    fitText(l.el, GRID.capW, { maxH: Math.round(SIZE.caption * 1.22 * 2) + 2, minPx: 40 })
    css(l.el, { display: 'none' })
  }
  if (verdict) {
    // the closing line: 56 px, 2 lines (3 only when a long line would otherwise drop under 42 px)
    fitMarkup(verdict, spec.verdict.text, { maxW: GRID.capW, maxH: GRID.capBottom - GRID.capTop, maxPx: SIZE.verdict, minPx: 42, lh: 1.14, linePenalty: 6 })
  }

  const page = {
    layer, top, bottom: usesBand ? GRID.workBottom : GRID.capBottom - 10,
    left: GRID.left, textX: GRID.textX, right: GRID.rail, rightTop: GRID.right,
    header, footer, captionsOn, hasVerdict, clear: null,
    _: { lines, capBox, verdict, rule },
  }
  ctx.page = page
  return page
}

function segmentsOf(str) {
  const out = []
  const re = /\*\*(.+?)\*\*|__(.+?)__/g
  let last = 0, m
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ text: str.slice(last, m.index), cls: '' })
    out.push({ text: m[1] != null ? m[1] : m[2], cls: m[1] != null ? 'em' : 'mark2' })
    last = re.lastIndex
  }
  if (last < str.length) out.push({ text: str.slice(last), cls: '' })
  return out
}

function buildCaption(v) {
  const el = h('div', { class: 'cs-cap' })
  const words = []
  let chars = 0
  let glue = null // "≈ " waits here for its figure: both go in one unbreakable group
  // "≈ 12" stays together (a no-break space), so the sign never ends a line without its figure
  for (const seg of segmentsOf(bindApprox(String(v.text || '')))) {
    const parts = seg.text.split(/([ \t\n]+)/)
    for (const p of parts) {
      if (!p) continue
      if (/^[ \t\n]+$/.test(p)) {
        glue = null
        if (p.includes('\n')) el.append(h('br'))
        else el.append(document.createTextNode(' '))
        continue
      }
      const html = p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/≈/g, '<span class="cs-approx">≈</span>')
      const cls = 'w' + (seg.cls ? ' ' + seg.cls : '')
      const w = h('span', { class: cls, html })
      words.push({ el: w, cls, at: chars, len: p.length })
      chars += p.length + 1
      if (glue) glue.append(w)
      else if (/\u00a0$/.test(p)) { glue = h('span', { class: 'cs-cap-nb' }, w); el.append(glue) }
      else el.append(w)
      if (glue && !/\u00a0$/.test(p)) glue = null
    }
  }
  return { el, words, chars: Math.max(1, chars), v }
}

/**
 * The kit's chrome: captions (word-by-word), verdict (closing line in the caption band, its **emphasis**
 * swiping in on the goal highlighter). Header, footer and brand are static from frame 1.
 */
export function chrome(spec, ctx) {
  const P = ctx.page
  const { lines, verdict } = P._
  const vt = P.hasVerdict ? spec.verdict.t : Infinity
  if (P.hasVerdict && isFinite(vt)) ctx.cue(vt + 0.05, 'reveal', { gain: 0.5 })
  return {
    seek(t) {
      const clearP = P.clear ? prog(t, P.clear.t0, P.clear.dur) : 0
      // captions
      const c = lines.length ? captionAt(spec.vo, t) : null
      const cur = c && t < vt ? lines[c.index] : null
      for (const l of lines) if (l !== cur) css(l.el, { display: 'none' })
      if (cur) {
        css(cur.el, { display: '' })
        const v = cur.v
        // the whole line is on screen while it is spoken (legible, screenshot-safe); words already said turn ink
        const span = Math.max(0.3, (v.d != null ? v.d : (spec.vo[c.index + 1] ? spec.vo[c.index + 1].t - v.t : cur.words.length * 0.36)) * 0.88)
        for (const w of cur.words) {
          const wt = v.t + (w.at / cur.chars) * span
          attr(w.el, 'class', w.cls + (t >= wt ? ' said' : ''))
        }
        const pin = v.t <= 0.001 ? 1 : prog(t, v.t, 0.12)
        css(cur.el, { opacity: n3(pin * (1 - clearP)), transform: pin >= 1 ? 'none' : `translateY(${n3((1 - ease.out(pin)) * 8)}px)` })
      }
      // verdict
      if (verdict) {
        const p = prog(t, vt, 0.3)
        fadeUp(verdict, p * (1 - clearP), 12)
        css(verdict, { '--hw': n3(ease.out(prog(t, vt + 0.28, 0.38)) * 100) + '%' })
        show(verdict, t >= vt)
      }
    },
  }
}
