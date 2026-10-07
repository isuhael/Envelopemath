// Live Sheet shared components. Formats import everything from here (this module re-exports the runtime).
// Rules every component follows: build DOM once, then seek-time setters only (css/setText/setHTML/attr),
// every visual is a pure function of the arguments it is given.
import {
  h, s, css, setText, setHTML, attr, plain, graphemes, fitText, clamp, lerp, prog, ease, SAFE,
} from '../../runtime/core.js'
import { C, F, S, G, M, toneColor, toneFill, cellSizes } from './theme.js'

export * from '../../runtime/core.js'
export * from './theme.js'
/** alias of the runtime's cached css() setter: format modules export a `css` string, so they import this name */
export const setStyle = css

// =====================================================================================================
// text: markup, typing, measuring
// =====================================================================================================
const esc = str => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** split spec markup into segments: k 0 plain, 1 **primary**, 2 __second__ */
export function parseMarkup(str = '') {
  const out = []
  const re = /\*\*([\s\S]+?)\*\*|__([\s\S]+?)__/g
  let last = 0, m
  str = String(str)
  while ((m = re.exec(str))) {
    if (m.index > last) out.push({ text: str.slice(last, m.index), k: 0 })
    out.push(m[1] != null ? { text: m[1], k: 1 } : { text: m[2], k: 2 })
    last = re.lastIndex
  }
  if (last < str.length) out.push({ text: str.slice(last), k: 0 })
  return out
}
function segHTML(text, k) {
  const body = esc(text).replace(/\n/g, '<br>')
  // the inner <span> matters: the linter reads the colour behind a text node from its parent's ancestors,
  // so emphasis that paints its own background must wrap the text one level deeper.
  if (k === 1) return `<em><span>${body}</span></em>`
  if (k === 2) return `<u class="mark2"><span>${body}</span></u>`
  return body
}
/** markup → HTML (like core.markup, plus the inner spans emphasis styles rely on) */
export const mk = str => parseMarkup(str).map(x => segHTML(x.text, x.k)).join('')
/** number of graphemes a typed markup string has */
export const mkLen = str => graphemes(plain(str)).length
/** the first n graphemes of a markup string, as HTML (emphasis kept while typing) */
export function typedMk(str, n) {
  let left = Math.max(0, Math.round(n)), html = ''
  for (const seg of parseMarkup(str)) {
    if (left <= 0) break
    const g = graphemes(seg.text)
    html += segHTML(g.slice(0, left).join(''), seg.k)
    left -= g.length
  }
  return html
}
/** graphemes typed at time t when typing `str` from t0 at cps, starting with `from` already shown */
export function typedCount(t, t0, str, { cps = M.cps, from = 0 } = {}) {
  const n = mkLen(str)
  if (t < t0) return Math.min(from, n)
  return Math.min(n, from + Math.floor((t - t0) * cps + 1e-6))
}
/** seconds it takes to type str (minus the `from` head start) */
export const typeDur = (str, { cps = M.cps, from = 0 } = {}) => Math.max(0, mkLen(str) - from) / cps
/** a word boundary near fraction f of the string (for "already mid-typing at frame 1") */
export function wordCut(str, f = 0.45) {
  const p = plain(str), target = Math.round(p.length * f)
  let best = 0
  for (let i = 0; i < p.length; i++) if (p[i] === ' ' && i <= target) best = i
  return graphemes(p.slice(0, best)).length
}
/** caret visible? solid while typing, blinking when idle */
export const caretOn = (t, typing) => typing || ((t % M.blink) + M.blink) % M.blink < M.blink * 0.58

let meas = null
function meter() {
  if (!meas || !meas.isConnected) {
    meas = h('div', { 'aria-hidden': 'true', style: { position: 'absolute', left: '-6000px', top: '0px', whiteSpace: 'nowrap', visibility: 'hidden', fontVariantNumeric: 'tabular-nums' } })
    ;(document.getElementById('stage') || document.body).append(meas)
  }
  return meas
}
/** rendered width (px) of html in a CSS font shorthand, e.g. textW('$1,040', '800 56px Inter') */
export function textW(html, font, { letterSpacing = 'normal', transform = 'none' } = {}) {
  const m = meter()
  m.style.font = font
  m.style.letterSpacing = letterSpacing
  m.style.textTransform = transform
  m.innerHTML = html
  const w = m.getBoundingClientRect().width
  m.innerHTML = ''
  return w
}
export const font = (weight, px, fam = F.ui) => `${weight} ${px}px ${fam}`

/** does a display string read as a number (right-align it)? */
export const isNumeric = v => /\d/.test(String(v)) && !/[A-Za-z]{2,}/.test(String(v))

// =====================================================================================================
// numbers that move: count-ups that land exactly on the spec's display string
// =====================================================================================================
/** '≈ $1,126,000' → { pre: '≈ $', n: 1126000, dp: 0, post: '', grouped: true } (null if no number) */
export function parseDisplay(str) {
  const m = /^(.*?)(\d[\d,]*(?:\.\d+)?)(.*)$/s.exec(String(str))
  if (!m) return null
  const num = m[2].replace(/,/g, '')
  return { pre: m[1], n: parseFloat(num), dp: (num.split('.')[1] || '').length, post: m[3], grouped: m[2].includes(',') }
}
const group3 = str => str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
/** the display string counted up to fraction p (0..1) of its value; p >= 1 returns `display` exactly */
export function countText(display, p, { from = 0 } = {}) {
  if (p >= 1) return display
  const d = parseDisplay(display)
  if (!d) return display
  const v = lerp(from, d.n, clamp(p))
  const [i, f] = v.toFixed(d.dp).split('.')
  return d.pre + (d.grouped ? group3(i) : i) + (f ? '.' + f : '') + d.post
}
/** numeric value of a display string (for comparisons only, never for display) */
export const displayValue = str => { const d = parseDisplay(str); return d ? d.n * (/[−-]/.test(d.pre) ? -1 : 1) * ({ K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[d.post.trim()[0]] || 1) : NaN }

// =====================================================================================================
// motion grammar
// =====================================================================================================
/** a value drops into its cell: from above, settles with a small overshoot. p = progress 0..1 */
export function dropIn(p, dist = 22) {
  if (p <= 0) return { opacity: '0', transform: `translateY(${-dist}px)` }
  if (p >= 1) return { opacity: '1', transform: 'none' }
  const e = ease.back(p, 2.2)
  // whole pixels: the linter (and the eye) read sub-pixel shifts as a size change
  return { opacity: String(clamp(p * 3)).slice(0, 5), transform: `translateY(${Math.round((1 - e) * -dist)}px)` }
}
/**
 * a value snaps into its cell: it lands a touch large and settles (never below 100%, so nothing ever reads
 * smaller than its type size and nothing leaves its cell). p = progress 0..1. The default cell entrance.
 */
export function snapIn(p, from = 1.16) {
  if (p <= 0) return { opacity: '0', transform: `scale(${from})` }
  if (p >= 1) return { opacity: '1', transform: 'none' }
  return { opacity: String(clamp(p * 4)).slice(0, 5), transform: `scale(${(from - (from - 1) * ease.out(p)).toFixed(4)})` }
}
/** the reverse, for the loop clear: a quick fade, in place. q = 0..1 */
export function liftOut(q) {
  if (q <= 0) return null
  return { opacity: String(Math.max(0, 1 - ease.out(q))).slice(0, 5), transform: 'none' }
}
/** a number pops: scale with overshoot. p = 0..1 */
export const popScale = (p, from = 0.86) => (p <= 0 ? from : p >= 1 ? 1 : from + (1 - from) * ease.back(p, 2.4))
/** highlight flash after landing at t0: alpha 1 → 0 */
export const flashAlpha = (t, t0, dur = M.flash) => (t < t0 ? 0 : 1 - ease.out(prog(t, t0, dur)))
/** rgba() of a hex colour */
export function rgba(hex, a) {
  const n = parseInt(hex.slice(1), 16)
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${Math.round(clamp(a) * 1000) / 1000})`
}
/** progress of a step that starts at t0 (0 before, 1 after dur), eased */
export const step = (t, t0, dur, e = ease.out) => e(prog(t, t0, dur))
/** interpolate two rects {x0,y0,x1,y1} */
export const lerpRect = (a, b, p) => ({ x0: lerp(a.x0, b.x0, p), y0: lerp(a.y0, b.y0, p), x1: lerp(a.x1, b.x1, p), y1: lerp(a.y1, b.y1, p) })

// =====================================================================================================
// spec helpers
// =====================================================================================================
export const hasCaptions = spec => spec.captions !== false && Array.isArray(spec.vo) && spec.vo.length > 0
/** end time of a vo line (d, or the gap to the next line, or 2.5 s) */
export function voEnd(spec, i) {
  const v = spec.vo[i], n = spec.vo[i + 1]
  return v.d != null ? v.t + v.d : n ? n.t : v.t + 2.5
}
/**
 * The format's duration: last beat + hold, but never before the last vo line ends (+0.4 s)
 * or 2.5 s after the verdict lands. spec.duration (if set) wins in defineKit.
 */
export function durationOf(spec, { beats = [], hold = M.hold, min = 5, max = 90 } = {}) {
  const b = beats.filter(Number.isFinite)
  let d = (b.length ? Math.max(...b) : 0) + hold
  for (let i = 0; i < (spec.vo || []).length; i++) d = Math.max(d, voEnd(spec, i) + 0.4)
  if (spec.verdict && Number.isFinite(spec.verdict.t)) d = Math.max(d, spec.verdict.t + 2.5)
  return Math.min(max, Math.max(min, Math.round(d * 30) / 30))
}
/** lookOpts value with a default */
export const opt = (spec, key, dflt) => (spec.lookOpts && spec.lookOpts[key] != null ? spec.lookOpts[key] : dflt)

/** a full-stage layer for a format's own elements */
export function layer(ctx, cls = '') {
  const el = h('div', { class: 'ls-layer ' + cls })
  ctx.stage.append(el)
  return el
}

// =====================================================================================================
// chrome pieces: brand mark, banner (header), footer, captions, verdict
// =====================================================================================================
const ENVELOPE = (w = 52, ht = 36, color = C.accent) =>
  s('svg', { width: w, height: ht, viewBox: '0 0 52 36', fill: 'none' },
    s('rect', { x: 2, y: 2, width: 48, height: 32, rx: 6, stroke: color, 'stroke-width': 3.5 }),
    s('path', { d: 'M4 5 L26 21 L48 5', stroke: color, 'stroke-width': 3.5, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))

/** small line-icon envelope + "back of the envelope", decoration zone (y 150-190) */
export function brandMark(parent) {
  const el = h('div', { class: 'ls-brand', 'data-deco': '' }, ENVELOPE(), h('span', { text: 'back of the envelope' }))
  parent.append(el)
  return el
}

/** the yellow question card in the header band (y 240-416). Author line breaks are kept; it shrinks to fit. */
export function banner(parent, header = '') {
  const el = h('div', { class: 'ls-banner' })
  const txt = h('div', { class: 'ls-btext', html: mk(header) })
  el.append(txt)
  parent.append(el)
  const maxW = G.width - 64, maxH = G.bannerH - 26
  css(txt, { width: maxW + 'px', fontSize: S.banner + 'px' })
  let px = fitText(txt, maxW, { maxH, minPx: S.bannerMin })
  if (txt.scrollWidth > maxW + 0.5 || txt.scrollHeight > maxH + 0.5) {
    // a long line with no author break: let it wrap and fit again
    css(txt, { whiteSpace: 'normal', fontSize: S.banner + 'px' })
    px = fitText(txt, maxW, { maxH, minPx: S.bannerMin })
  }
  return { el, txt, px, seek() {} }
}

/** height (px) the footer will take at width w (0 if no text) */
export function footerHeight(text, w = G.railX - G.left) {
  if (!text) return 0
  const one = textW(mk(text), font(600, S.footer)) <= w
  return one ? Math.round(S.footer * 1.25) : Math.round(S.footer * 1.25 * 2)
}
/** the assumption line. pos: { x, w, top } or { x, w, bottom } (stage px). Visible from t = 0. */
export function footer(parent, text, pos = {}) {
  const x = pos.x ?? G.left, w = pos.w ?? (G.railX - G.left)
  const el = h('div', { class: 'ls-footer', html: mk(text), style: { left: x + 'px', width: w + 'px', fontSize: S.footer + 'px' } })
  parent.append(el)
  if (textW(mk(text), font(600, S.footer)) > w) css(el, { whiteSpace: 'normal' })
  const ht = el.offsetHeight
  const top = pos.top != null ? pos.top : (pos.bottom ?? G.workBottom) - ht
  css(el, { top: top + 'px' })
  return { el, top, bottom: top + ht, seek() {} }
}

/**
 * Words of a markup string, each a list of styled parts, so emphasis that stops mid-word stays one word:
 * "your **wage**." → [your] [wage + "."] (no stray space before the full stop).
 */
export function markupWords(str) {
  const words = []
  let cur = null
  for (const seg of parseMarkup(str)) {
    for (const piece of seg.text.split(/(\s+)/)) {
      if (!piece) continue
      if (/^\s+$/.test(piece)) { cur = null; continue }
      if (!cur) { cur = { parts: [], len: 0 }; words.push(cur) }
      cur.parts.push({ text: piece, k: seg.k })
      cur.len += piece.length
    }
  }
  return words
}

/**
 * Split words into the fewest chunks (≤ maxWords each, each ≤ maxW wide), as evenly as possible:
 * "Find your hourly wage." → [Find your] [hourly wage.], not [Find your hourly] [wage.].
 */
export function chunkWords(words, widthOf, maxW, maxWords = 4) {
  const n = words.length
  if (!n) return []
  const memo = new Map()
  const wd = (i, j) => { const k = i + ',' + j; if (!memo.has(k)) memo.set(k, widthOf(words.slice(i, j))); return memo.get(k) }
  for (let k = Math.ceil(n / maxWords); k <= n; k++) {
    // best[i][c] = smallest possible widest chunk covering words[i..] in c chunks
    const best = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(Infinity)), cut = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(-1))
    best[n][0] = 0
    for (let c = 1; c <= k; c++) for (let i = n - 1; i >= 0; i--) for (let j = i + 1; j <= Math.min(n, i + maxWords); j++) {
      const w = wd(i, j)
      if (w > maxW && j - i > 1) break
      const v = Math.max(w, best[j][c - 1])
      if (v < best[i][c]) { best[i][c] = v; cut[i][c] = j }
    }
    if (best[0][k] <= maxW || k === n) {
      const out = []
      for (let i = 0, c = k; i < n; c--) { const j = cut[i][c] > 0 ? cut[i][c] : n; out.push(words.slice(i, j)); i = j }
      return out
    }
  }
  return [words]
}

/**
 * Captions for spec.vo in the caption band: each line is cut into 1-4 word chunks that fit one line,
 * timed by length across the line, each chunk pops in. **x** = yellow keyword, __x__ = coral.
 * seek(t, { hidden }) → true when a caption is showing.
 */
export function captions(parent, spec, { top = G.bandTop, bottom = G.bandBottom, x = G.left, w = G.railX - G.left } = {}) {
  const box = h('div', { class: 'ls-cap', style: { left: x + 'px', top: top + 'px', width: w + 'px', height: bottom - top + 'px' } })
  const line = h('div', { class: 'ls-capline' })
  box.append(line)
  parent.append(box)
  const capFont = px => font(800, px)
  const wordsHTML = ws => ws.map(x => x.parts.map(pt => segHTML(pt.text, pt.k)).join('')).join(' ')
  const maxW = w - 24
  const chunks = []
  ;(spec.vo || []).forEach((v, i) => {
    const end = voEnd(spec, i)
    const words = markupWords(v.text)
    // short-form captions drop a trailing full stop (a "?" or "!" stays)
    const last = words[words.length - 1]
    if (last && /[A-Za-z)]\.$/.test(last.parts.map(x => x.text).join(''))) {
      const pt = last.parts[last.parts.length - 1]
      pt.text = pt.text.slice(0, -1)
      if (!pt.text) last.parts.pop()
      last.len--
    }
    const groups = chunkWords(words, ws => textW(wordsHTML(ws), capFont(S.caption), { transform: 'uppercase' }), maxW, 4)
    const weights = groups.map(g => g.reduce((a, x) => a + x.len + 1, 3))
    const tot = weights.reduce((a, b) => a + b, 0)
    let acc = v.t
    groups.forEach((g, gi) => {
      const d = ((end - v.t) * weights[gi]) / tot
      const html = wordsHTML(g)
      const wpx = textW(html, capFont(S.caption), { transform: 'uppercase' })
      const px = wpx > maxW ? Math.max(S.captionMin, Math.floor((S.caption * maxW) / wpx)) : S.caption
      chunks.push({ t0: acc, t1: gi === groups.length - 1 ? end + 0.15 : acc + d, html, px })
      acc += d
    })
  })
  return {
    el: box, chunks,
    seek(t, { hidden = false } = {}) {
      const c = hidden ? null : chunks.find(x => t >= x.t0 && t < x.t1)
      if (!c) { css(box, { opacity: '0' }); return false }
      setHTML(line, c.html)
      const p = c.t0 <= 0 ? 1 : prog(t, c.t0, 0.18)
      css(line, { fontSize: c.px + 'px', transform: `scale(${popScale(p, 0.92).toFixed(4)})` })
      css(box, { opacity: '1' })
      return true
    },
  }
}

/**
 * The verdict card: a white "answer cell" with the ≈ chip, centred in [top, bottom] (default: the caption band).
 * **x** gets a yellow marker that wipes in. seek(t, { out }) → true while showing. out = 0..1 fades it away.
 */
export function verdictCard(parent, verdict, { top = G.bandTop, bottom = G.bandBottom, x = G.left, w = G.railX - G.left } = {}) {
  const chip = h('div', { class: 'ls-chip ls-vchip', 'data-deco': '', text: '≈' })
  const txt = h('div', { class: 'ls-vtext', html: mk(verdict.text) })
  const el = h('div', { class: 'ls-verdict', style: { left: x + 'px', width: w + 'px' } }, chip, txt)
  parent.append(el)
  const maxW = w - 104 - 26, maxH = bottom - top - 28
  css(txt, { width: maxW + 'px', fontSize: S.verdict + 'px' })
  fitText(txt, maxW, { maxH, minPx: S.verdictMin })
  const ht = el.offsetHeight
  css(el, { top: Math.round(top + (bottom - top - ht) / 2) + 'px' })
  return {
    el,
    seek(t, { out = 0 } = {}) {
      if (t < verdict.t || out >= 1) { css(el, { opacity: '0', transform: 'scale(0.94)' }); return false }
      const p = prog(t, verdict.t, 0.34)
      css(el, { opacity: String(clamp(p * 3) * (1 - out)), transform: `scale(${popScale(p, 0.92).toFixed(4)})` })
      css(txt, { '--hl': (ease.inOut(prog(t, verdict.t + 0.14, 0.32)) * 100).toFixed(1) + '%' })
      return true
    },
  }
}

/**
 * Shared chrome for every Live Sheet format: brand mark, header banner, footer, captions, verdict.
 * The format steers it through the object it returns, under `chrome`:
 *   footer:   { top | bottom, x, w } or false (the format draws its own)       default { bottom: 1300 }
 *   captions: false to switch captions off                                       default on when spec.vo
 *   verdict:  'band' (verdict card in the caption band) | 'self' (format draws it)   default 'band'
 *   verdictBox: { top, bottom } to move the verdict card
 *   captionHidden(t): extra condition hiding captions
 *   loop: { t0, dur } the loop-out window (the verdict card fades away in it)
 */
export function chrome(spec, ctx, body) {
  const hint = (body && body.chrome) || {}
  const top = layer(ctx, 'ls-chrome')
  brandMark(top)
  banner(top, spec.header || '')
  if (spec.footer && hint.footer !== false) footer(top, spec.footer, hint.footer || {})
  const caps = hint.captions !== false && hasCaptions(spec) ? captions(top, spec, hint.captionBox || {}) : null
  const v = spec.verdict && spec.verdict.text && hint.verdict !== 'self' ? verdictCard(top, spec.verdict, hint.verdictBox || {}) : null
  if (v) ctx.cue(spec.verdict.t, 'ding')
  const loop = hint.loop
  return {
    seek(t) {
      const out = loop ? ease.inOut(prog(t, loop.t0, loop.dur)) : 0
      const vOn = v ? v.seek(t, { out }) : false
      if (caps) caps.seek(t, { hidden: vOn || (hint.captionHidden ? hint.captionHidden(t) : false) })
    },
  }
}

// =====================================================================================================
// the formula bar (≈ chip + typed working)
// =====================================================================================================
/**
 * Formula bar. sheet() and bigCell() build one as their card's top strip; standalone, pass
 * { x, y, w, ht, standalone: true } (px relative to `parent`) and it draws its own rounded card.
 * Size it with fitFormula(strings, w) → { px, lines, ht } so every string it will show fits.
 * set(html, { caret }) shows a state; type(t, t0, str, { cps, from }) types a markup string at time t.
 */
export function formulaBar(parent, { x = 0, y = 0, w = G.width, ht = G.fbarH, standalone = false, px = S.formula, lines = 1 } = {}) {
  const chip = h('div', { class: 'ls-chip', 'data-deco': '', text: '≈' })
  const txt = h('span', { class: 'ls-ftxt' })
  const caret = h('i', { class: 'ls-caret' })
  const line = h('div', { class: 'ls-fline' }, txt, caret)
  const el = h('div', { class: 'ls-fbar' + (standalone ? ' standalone' : ''), style: { left: x + 'px', top: y + 'px', width: w + 'px', height: ht + 'px' } }, chip, line)
  parent.append(el)
  const textW0 = w - 102 - 22
  css(line, { fontSize: px + 'px', width: textW0 + 'px', whiteSpace: lines > 1 ? 'normal' : 'nowrap' })
  css(chip, { height: Math.min(66, ht - 20) + 'px' })
  return {
    el, chip, txt, caret, px,
    set(html, { caret: on = false } = {}) {
      setHTML(txt, html)
      css(caret, { opacity: on ? '1' : '0' })
    },
    /** state for typing `str` at time t from t0 (returns the html set) */
    type(t, t0, str, { cps = M.cps, from = 0, caret: showCaret = true } = {}) {
      const n = typedCount(t, t0, str, { cps, from })
      const typing = t >= t0 && n < mkLen(str)
      this.set(typedMk(str, n), { caret: showCaret && caretOn(t, typing) })
      return n
    },
  }
}
/** font size (and line count) for a formula bar of width w so every string fits */
export function fitFormula(strings, w = G.width) {
  const avail = w - 102 - 22
  const widest = px => Math.max(0, ...strings.filter(Boolean).map(x => textW(mk(x), font(700, px, F.mono))))
  for (let px = S.formula; px >= S.formulaMin; px -= 2) if (widest(px) <= avail) return { px, lines: 1, ht: G.fbarH }
  return { px: S.formulaMin, lines: 2, ht: 128 }
}

// =====================================================================================================
// the sheet
// =====================================================================================================
const LETTERS = 'ABCDEFGHIJ'
/**
 * A designed spreadsheet card on the surround.
 * opts:
 *   x, y, w                 card position (stage px), default 60 / 444 / 900
 *   columns: [{ label, kind: 'input'|'mid'|'output', tone, align }]   label may hold '\n': line 2+ is the grey sub-label
 *   values: rows × cols display strings (used to size the columns; nothing is shown until you set it)
 *   rows                    number of data rows (default values.length)
 *   reserve                 px of empty sheet under the data (room for a tooltip strip); drawn as spare rows
 *   spare                   extra empty rows under the data (sheet texture)
 *   rowH | bottom           row height, or the card's bottom edge (then rowH = what fits, in [minRowH, maxRowH])
 *   minRowH, maxRowH        default 52 / 102
 *   formula: false | { strings: [...] }   the formula bar and the strings it will show (sized to fit)
 *   letters                 column-letter row: true (default) | false | 'auto' (dropped when rows get under 58 px)
 *   startRow                number on the first data row (default 2: row 1 is the label row)
 * Returns the API documented in README.md (cell(), setCell(), select(), hiRow(), rowShift(), …).
 */
export function sheet(parent, o) {
  const cols = o.columns
  const nC = cols.length
  const values = o.values || []
  const nR = o.rows ?? values.length
  const reserve = o.reserve ?? 0 // px of empty sheet under the data (room for a tooltip strip)
  const X = o.x ?? G.left, Y = o.y ?? G.cardTop, W = o.w ?? G.width
  const gutter = o.gutter ?? G.gutter
  const fFit = o.formula === false ? null : fitFormula((o.formula && o.formula.strings) || [], W)
  const fbarH = fFit ? fFit.ht : 0
  let lettersH = o.letters === false ? 0 : G.lettersH
  const kindOf = j => cols[j].kind || (j === 0 ? 'input' : cols[j].emph ? 'output' : 'mid')
  const alignOf = j => cols[j].align || (values.length && values.every(r => r[j] == null || r[j] === '' || isNumeric(r[j])) ? 'right' : 'left')

  // ---- type sizes and column widths -------------------------------------------------------------
  const labelParts = cols.map(c => String(c.label || '').split('\n'))
  const avail = W - gutter
  const fsFor = rowH => cellSizes(rowH)
  const cellPx = (j, fs) => (kindOf(j) === 'input' ? fs.input : kindOf(j) === 'output' ? fs.result : fs.mid)
  const cellWeight = j => (kindOf(j) === 'mid' ? 700 : 800)
  const needFor = fs => cols.map((c, j) => Math.max(40, ...values.map(r => (r[j] ? textW(esc(r[j]), font(cellWeight(j), cellPx(j, fs)), { letterSpacing: '-0.01em' }) : 0))) + 2 * G.padX + 4)
  const labelNeed = cols.map((c, j) => Math.max(...labelParts[j].map((l, i) => textW(mk(l), font(i ? 600 : 800, i ? S.sub : S.label)))) + 2 * G.padX)

  // row height first guess (label row assumed 1 or 2 lines), refined after the label row is laid out
  const labelLines0 = Math.max(...labelParts.map(p => p.length))
  const labelH0 = labelLines0 > 1 ? 104 : 76
  const minRowH = o.minRowH ?? 52, maxRowH = o.maxRowH ?? 102
  const rowHFor = labelH => (o.rowH ? o.rowH : Math.floor(clamp(((o.bottom ?? G.workBottom) - Y - fbarH - lettersH - labelH - reserve) / (nR + (o.spare ?? 0)), minRowH, maxRowH)))
  let rowH = rowHFor(labelH0)
  // 'auto' letters: the A B C row is decoration, so it goes first when rows get cramped
  if (o.letters === 'auto' && rowH < 58) { lettersH = 0; rowH = rowHFor(labelH0) }
  let fs = fsFor(rowH)
  let need = needFor(fs)
  for (let k = 0; k < 6 && need.reduce((a, b) => a + b, 0) > avail; k++) {
    const f = avail / need.reduce((a, b) => a + b, 0)
    fs = { input: Math.max(S.cellMin, Math.floor(fs.input * f)), mid: Math.max(S.cellMin, Math.floor(fs.mid * f)), result: Math.max(S.cellMin, Math.floor(fs.result * f)) }
    need = needFor(fs)
  }
  const widths = (() => {
    const sum = need.reduce((a, b) => a + b, 0)
    let left = Math.max(0, avail - sum)
    const extra = need.map((n, j) => Math.max(0, labelNeed[j] - n))
    const E = extra.reduce((a, b) => a + b, 0)
    if (E >= left) return need.map((n, j) => n + (E ? (extra[j] * left) / E : 0))
    left -= E
    return need.map((n, j) => n + extra[j] + (left * n) / sum)
  })()
  // integer columns that add up exactly
  const colX = [gutter]
  for (let j = 0; j < nC; j++) colX.push(j === nC - 1 ? W : Math.round(colX[j] + widths[j]))
  const colW = cols.map((c, j) => colX[j + 1] - colX[j])

  // ---- DOM ------------------------------------------------------------------------------------------
  const card = h('div', { class: 'ls-card', style: { left: X + 'px', top: Y + 'px', width: W + 'px' } })
  parent.append(card)
  const fbar = fFit ? formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines }) : null

  let letterEls = []
  if (lettersH) {
    const row = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fbarH + 'px', height: lettersH + 'px' } },
      h('i', { class: 'ls-corner', style: { width: gutter + 'px' } }))
    letterEls = cols.map((c, j) => h('b', { text: LETTERS[j], style: { left: colX[j] + 'px', width: colW[j] + 'px' } }))
    row.append(...letterEls)
    card.append(row)
  }
  const headY = fbarH + lettersH
  const heads = h('div', { class: 'ls-heads', style: { top: headY + 'px' } })
  const headNum = h('div', { class: 'ls-rn', 'data-deco': '', text: String((o.startRow ?? 2) - 1), style: { width: gutter + 'px' } })
  heads.append(headNum)
  const labelEls = cols.map((c, j) => {
    const parts = labelParts[j]
    const el = h('div', { class: `ls-hcell ${kindOf(j)}`, style: { left: colX[j] + 'px', width: colW[j] + 'px' } },
      h('div', { class: 'ls-hl', html: mk(parts[0]) }),
      parts.length > 1 ? h('div', { class: 'ls-hsub', html: mk(parts.slice(1).join(' ')) }) : null)
    heads.append(el)
    return el
  })
  card.append(heads)
  // fit labels: shrink to labelMin, then wrap
  let labelH = 0
  for (const [j, el] of labelEls.entries()) {
    const inner = colW[j] - 2 * G.padX
    for (const part of el.children) {
      if (part.scrollWidth > inner + 0.5) fitText(part, inner, { minPx: part.classList.contains('ls-hsub') ? S.sub : S.labelMin })
      if (part.scrollWidth > inner + 0.5) css(part, { whiteSpace: 'normal' })
    }
    labelH = Math.max(labelH, el.scrollHeight)
  }
  labelH = Math.max(76, Math.ceil(labelH + 24))
  css(heads, { height: labelH + 'px' })
  for (const el of labelEls) css(el, { height: labelH + 'px' })
  css(headNum, { height: labelH + 'px' })
  if (!o.rowH) {
    // the label row came out taller or shorter than guessed: re-fit the rows (text only ever shrinks here,
    // so the column widths measured above still hold)
    const r2 = rowHFor(labelH)
    if (r2 < rowH) { const f2 = fsFor(r2); fs = { input: Math.min(fs.input, f2.input), mid: Math.min(fs.mid, f2.mid), result: Math.min(fs.result, f2.result) } }
    rowH = r2
  }

  const bodyY = headY + labelH
  const spare = Math.ceil(reserve / rowH) + (o.spare ?? 0)
  const bodyH = nR * rowH + reserve + (o.spare ?? 0) * rowH
  const body = h('div', { class: 'ls-body', style: { top: bodyY + 'px', height: bodyH + 'px' } })
  card.append(body)
  css(card, { height: bodyY + bodyH + 'px' })

  const rowEls = [], numEls = [], cells = []
  for (let r = 0; r < nR + spare; r++) {
    const isSpare = r >= nR
    const partial = (r + 1) * rowH > bodyH + 0.5 // a spare row cut by the card edge keeps its gridlines, not its number
    const num = h('div', { class: 'ls-rn', 'data-deco': '', ...(isSpare ? { 'data-roll': '' } : {}), text: partial ? '' : String((o.startRow ?? 2) + r), style: { width: gutter + 'px', height: rowH + 'px' } })
    const row = h('div', { class: 'ls-row' + (isSpare ? ' spare' : ''), style: { top: r * rowH + 'px', height: rowH + 'px' } }, num)
    const rc = []
    for (let j = 0; j < nC; j++) {
      const v = h('span', { class: 'ls-v' })
      const cell = h('div', { class: `ls-cell ${kindOf(j)} ${alignOf(j)}`, style: { left: colX[j] + 'px', width: colW[j] + 'px', height: rowH + 'px', fontSize: cellPx(j, fs) + 'px' } }, v)
      if (cols[j].tone) css(v, { color: toneColor(cols[j].tone) })
      row.append(cell)
      rc.push({ el: cell, v })
    }
    body.append(row)
    rowEls.push(row); numEls.push(num); cells.push(rc)
  }
  // selection (a range outline with a fill handle) and a layer for overlays (tooltips) above the rows
  const sel = h('div', { class: 'ls-sel' }, h('i', { class: 'ls-handle' }))
  const over = h('div', { class: 'ls-over' })
  body.append(over, sel)

  const stageY = Y + bodyY // stage y of the first data row's top
  const api = {
    el: card, body, over, x: X, y: Y, w: W, h: bodyY + bodyH, bottom: Y + bodyY + bodyH,
    rowH, fs, nR, spare, cols: colX.slice(0, nC).map((cx, j) => ({ x: X + cx, w: colW[j], kind: kindOf(j), align: alignOf(j) })),
    gutter, bodyTop: stageY, headTop: Y + headY, labelH,
    fbar, labelEls, letterEls, rowEls, numEls, cells,
    cell: (r, c) => cells[r][c],
    /** stage-px box of cell (r, c); dy = the row's current shift */
    cellRect(r, c, dy = 0) {
      const x0 = X + colX[c], y0 = stageY + r * rowH + dy
      return { x0, y0, x1: x0 + colW[c], y1: y0 + rowH }
    },
    /** stage-px box of a range; r may be fractional; dy(r) gives each row's shift */
    rangeRect(r0, r1, c0, c1, dy = () => 0) {
      const a = Math.floor(r0), b = Math.ceil(r1) - 1
      return { x0: X + colX[c0], x1: X + colX[c1 + 1], y0: stageY + r0 * rowH + dy(a), y1: stageY + (r1) * rowH + dy(Math.max(a, b)) }
    },
    rowTop: (r, dy = 0) => stageY + r * rowH + dy,
    /**
     * set a cell for this frame. text/html = content; p = entrance progress (0 hidden … 1 settled; enter 'snap' | 'drop');
     * out = loop-clear progress (0 … 1 gone); flash = highlight flash alpha; color, fill, scale optional.
     */
    setCell(r, c, { text, html, p = 1, out = 0, flash = 0, color, fill, scale = 1, enter = 'snap' } = {}) {
      const { el, v } = cells[r][c]
      if (html != null) setHTML(v, html)
      else setText(v, text == null ? '' : String(text))
      let st = enter === 'drop' ? dropIn(p) : snapIn(p)
      const lo = liftOut(out)
      if (lo) st = { opacity: String(Math.min(+st.opacity, +lo.opacity)), transform: lo.transform }
      if (scale !== 1 && st.transform === 'none') st.transform = `scale(${scale.toFixed(4)})`
      css(v, { ...st, ...(color ? { color } : {}) })
      const bg = fill && fill !== 'transparent' ? fill : flash > 0.001 ? rgba(C.rowHi, flash) : 'transparent'
      css(el, { backgroundColor: bg })
    },
    /** vertical shift of a row (px), for inserted strips */
    rowShift(r, dy) { const v = Math.round(dy); css(rowEls[r], { transform: v ? `translateY(${v}px)` : 'none' }) },
    /** highlight a whole row (alpha 0..1); wipe 0..1 sweeps the highlight in from the left */
    hiRow(r, a, wipe = 1) {
      if (a <= 0.001 || wipe <= 0.001) { css(rowEls[r], { backgroundColor: C.sheet, backgroundImage: 'none' }); return }
      if (wipe >= 1) { css(rowEls[r], { backgroundColor: rgba(C.rowHi, a), backgroundImage: 'none' }); return }
      const x = (wipe * 100).toFixed(2)
      css(rowEls[r], { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(C.rowHi, a)} ${x}%, ${C.sheet} ${x}%)` })
    },
    /** the selection outline: rect in stage px, or null to hide. handle: show the fill handle */
    select(rect, { handle = true, alpha = 1 } = {}) {
      if (!rect || alpha <= 0.001) { css(sel, { opacity: '0' }); return }
      css(sel, {
        opacity: String(alpha), left: (rect.x0 - X).toFixed(2) + 'px', top: (rect.y0 - stageY).toFixed(2) + 'px',
        width: (rect.x1 - rect.x0).toFixed(2) + 'px', height: (rect.y1 - rect.y0).toFixed(2) + 'px',
      })
      const edge = rect.x1 > X + W - 10
      css(sel.firstChild, { opacity: handle ? '1' : '0', right: edge ? '3px' : '-9px', bottom: edge ? '3px' : '-9px' })
    },
    /** tint the row numbers r0..r1 and column letters c0..c1 of the selection (null = none) */
    headSel(r0, r1, c0, c1) {
      numEls.forEach((el, r) => { const on = r0 != null && r >= r0 && r <= r1; css(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
      letterEls.forEach((el, j) => { const on = c0 != null && j >= c0 && j <= c1; css(el, { backgroundColor: on ? C.headSel : C.head, color: on ? C.headSelText : C.headText }) })
    },
  }
  return api
}

/**
 * Tooltip strip: a dark pill with yellow text and a notch pointing up at a cell. Lives in a sheet's overlay
 * layer (or any parent). set({ x0, x1, y, ht, open, notchX, html, textAlpha }) in stage px; open 0..1 grows it.
 */
export function tipStrip(sh, { px = S.tip } = {}) {
  const txt = h('div', { class: 'ls-tiptxt', style: { fontSize: px + 'px' } })
  const notch = h('i', { class: 'ls-notch' })
  const el = h('div', { class: 'ls-tip' }, notch, h('div', { class: 'ls-tipclip' }, txt))
  // the slot the strip opens: an un-numbered sheet row (gutter kept, no cell lines)
  const slot = h('div', { class: 'ls-slot', style: { width: sh.w + 'px', backgroundImage: `linear-gradient(90deg, ${C.head} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter}px, ${C.sheet} ${sh.gutter}px)` } })
  sh.over.append(slot, el)
  const ox = sh.x, oy = sh.bodyTop
  return {
    el, txt,
    fit(htmls, width) {
      // one font size that fits every label on one line
      let p = px
      while (p > 36 && Math.max(...htmls.map(x => textW(x, font(800, p)))) > width - 56) p -= 2
      css(txt, { fontSize: p + 'px' })
      return p
    },
    /**
     * open: how far the slot has opened (rows below make room); scale: the pill's pop (it grows out of its
     * notch; default = open). Keep textAlpha at 0 until the pill is at full size.
     */
    set({ x0, x1, y, ht, open = 1, scale, notchX, html, textAlpha = 1 }) {
      const pad = 8
      // the pill never outgrows the open slot (it would cover the row below)
      const k = Math.min(scale == null ? open : scale, Math.max(0, (ht * open - pad) / (ht - 2 * pad)))
      if (open <= 0.001 || k <= 0.001) { css(el, { opacity: '0' }); css(slot, { opacity: open > 0.001 ? '1' : '0', top: (y - oy).toFixed(1) + 'px', height: Math.max(0, ht * open).toFixed(1) + 'px' }); return }
      if (html != null) setHTML(txt, html)
      css(slot, { opacity: '1', top: (y - oy).toFixed(1) + 'px', height: Math.max(0, ht * open).toFixed(1) + 'px' })
      css(el, {
        opacity: String(clamp(k * 3)), left: (x0 - ox).toFixed(1) + 'px', top: (y - oy + pad).toFixed(1) + 'px',
        width: (x1 - x0).toFixed(1) + 'px', height: Math.max(0, ht - 2 * pad).toFixed(1) + 'px',
        transformOrigin: `${(notchX - x0).toFixed(1)}px -10px`, transform: Math.abs(k - 1) < 1e-4 ? 'none' : `scale(${Math.max(0, k).toFixed(4)})`,
      })
      css(notch, { left: (notchX - x0 - 11).toFixed(1) + 'px' })
      css(txt, { opacity: String(clamp(textAlpha)) })
    },
  }
}

// =====================================================================================================
// spreadsheet chart (line / area), for chart-race and pov-race
// =====================================================================================================
function niceStep(raw) {
  const p = Math.pow(10, Math.floor(Math.log10(raw)))
  const m = raw / p
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 2.5 ? 2.5 : m <= 5 ? 5 : 10) * p
}
/**
 * A chart in the sheet's style: white card (surface 'sheet', default) or straight on the surround ('dark').
 * opts: x, y, w, ht (card box, stage px); pad { l, r, t, b }; xr [from, to]; xEvery (tick step); xFmt(v);
 *   yr [min, max] (default 0 … max of all points × 1.1); yTicks (≈ count, default 4); yFmt(v); log (y log scale);
 *   series [{ points: [[x, v]…], color, tone, width, area (default: first series only), dash }]; events [{ x }] (dashed markers)
 * draw(xNow, { yMax, yMin }) reveals every series up to xNow (and rescales y if asked); returns the tips
 * [{ x, y, v }] in stage px. X(v), Y(v) map data → stage px for the current scale; valueAt(i, x) interpolates.
 * Axis labels are decoration (data-deco, 32 px): the readable numbers belong in the format's own tip labels.
 */
export function lineChart(parent, o) {
  const surface = o.surface || 'sheet'
  const pad = { l: 128, r: 40, t: 40, b: 70, ...(o.pad || {}) }
  const box = { x: o.x ?? G.left, y: o.y ?? G.cardTop, w: o.w ?? G.width, h: o.ht ?? 760 }
  const plot = { x: box.x + pad.l, y: box.y + pad.t, w: box.w - pad.l - pad.r, h: box.h - pad.t - pad.b }
  const el = h('div', { class: `ls-chart ${surface}`, style: { left: box.x + 'px', top: box.y + 'px', width: box.w + 'px', height: box.h + 'px' } })
  const svg = s('svg', { width: box.w, height: box.h, viewBox: `0 0 ${box.w} ${box.h}`, class: 'ls-chartsvg' })
  el.append(svg)
  parent.append(el)
  const series = o.series || []
  const xr = o.xr || [Math.min(...series.flatMap(sr => sr.points.map(p => p[0]))), Math.max(...series.flatMap(sr => sr.points.map(p => p[0])))]
  const log = !!o.log
  const allV = series.flatMap(sr => sr.points.map(p => p[1]))
  let yMin = o.yr ? o.yr[0] : log ? Math.min(...allV) * 0.8 : 0
  let yMax = o.yr ? o.yr[1] : Math.max(...allV) * 1.1
  const gridC = surface === 'dark' ? C.panelLine : C.grid
  const lx = x => x - box.x, ly = y => y - box.y
  const X = v => plot.x + ((v - xr[0]) / (xr[1] - xr[0])) * plot.w
  const Y = v => (log ? plot.y + plot.h - ((Math.log(Math.max(v, 1e-9)) - Math.log(yMin)) / (Math.log(yMax) - Math.log(yMin))) * plot.h : plot.y + plot.h - ((v - yMin) / (yMax - yMin)) * plot.h)

  // grid + ticks (pre-built pools, repositioned per frame)
  const gGrid = s('g', {}), gEv = s('g', {}), gSeries = s('g', {}), gTips = s('g', {})
  svg.append(gGrid, gEv, gSeries, gTips)
  const NT = 9
  const yLines = Array.from({ length: NT }, () => { const l = s('line', { stroke: gridC, 'stroke-width': 2 }); gGrid.append(l); return l })
  const yLabels = Array.from({ length: NT }, () => { const d = h('div', { class: 'ls-axis y', 'data-deco': '' }); el.append(d); return d })
  const base = s('line', { x1: lx(plot.x), x2: lx(plot.x + plot.w), y1: ly(plot.y + plot.h), y2: ly(plot.y + plot.h), stroke: surface === 'dark' ? '#3A3F4B' : '#D0D5DD', 'stroke-width': 3 })
  gGrid.append(base)
  const xEvery = o.xEvery || niceStep((xr[1] - xr[0]) / 5)
  const xFmt = o.xFmt || (v => String(Math.round(v)))
  for (let v = Math.ceil(xr[0] / xEvery) * xEvery; v <= xr[1] + 1e-9; v += xEvery) {
    const d = h('div', { class: 'ls-axis x', 'data-deco': '', text: xFmt(v), style: { left: lx(X(v)) + 'px', top: ly(plot.y + plot.h) + 12 + 'px' } })
    el.append(d)
  }
  const yFmt = o.yFmt || (v => String(v))
  const evs = (o.events || []).map(ev => {
    const l = s('line', { x1: lx(X(ev.x)), x2: lx(X(ev.x)), y1: ly(plot.y), y2: ly(plot.y + plot.h), stroke: surface === 'dark' ? '#5B6170' : '#98A2B3', 'stroke-width': 3, 'stroke-dasharray': '10 10' })
    gEv.append(l)
    return { ...ev, el: l, px: X(ev.x) }
  })
  const paths = series.map((sr, i) => {
    const color = sr.color || (sr.tone ? toneColor(sr.tone, surface) : C.series[i % C.series.length])
    const area = s('path', { fill: color, opacity: (sr.area ?? i === 0) ? 0.1 : 0 }) // one area fill (the first series) unless told
    const line = s('path', { fill: 'none', stroke: color, 'stroke-width': sr.width || 8, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', ...(sr.dash ? { 'stroke-dasharray': sr.dash } : {}) })
    const dot = s('circle', { r: 12, fill: color, stroke: surface === 'dark' ? C.bg : C.sheet, 'stroke-width': 5 })
    gSeries.append(area, line)
    gTips.append(dot)
    return { area, line, dot, color }
  })

  function valueAt(i, xv) {
    const pts = series[i].points
    if (xv <= pts[0][0]) return pts[0][1]
    for (let k = 1; k < pts.length; k++) {
      if (xv <= pts[k][0]) {
        const [x0, v0] = pts[k - 1], [x1, v1] = pts[k]
        const f = (xv - x0) / (x1 - x0 || 1)
        return log && v0 > 0 && v1 > 0 ? Math.exp(lerp(Math.log(v0), Math.log(v1), f)) : lerp(v0, v1, f)
      }
    }
    return pts[pts.length - 1][1]
  }
  function ticks() {
    if (log) {
      const out = []
      for (let e = Math.floor(Math.log10(yMin)); e <= Math.ceil(Math.log10(yMax)); e++) for (const m of [1, 2, 5]) { const v = m * 10 ** e; if (v >= yMin && v <= yMax) out.push(v) }
      return out.slice(-NT)
    }
    const st = niceStep((yMax - yMin) / (o.yTicks || 4))
    const out = []
    for (let v = Math.ceil(yMin / st) * st; v <= yMax + 1e-9 && out.length < NT; v += st) out.push(v)
    return out
  }
  return {
    el, svg, plot, box, X, Y, valueAt, events: evs, paths,
    get yRange() { return [yMin, yMax] },
    draw(xNow, { yMax: ym, yMin: yn } = {}) {
      if (ym != null) yMax = ym
      if (yn != null) yMin = yn
      const tk = ticks()
      yLines.forEach((l, k) => {
        const v = tk[k]
        if (v == null || v === yMin) { attr(l, 'opacity', 0); css(yLabels[k], { opacity: '0' }); return }
        const yy = ly(Y(v)).toFixed(1)
        attr(l, 'opacity', 1); attr(l, 'x1', lx(plot.x)); attr(l, 'x2', lx(plot.x + plot.w)); attr(l, 'y1', yy); attr(l, 'y2', yy)
        setText(yLabels[k], yFmt(v))
        css(yLabels[k], { opacity: '1', top: yy + 'px', width: pad.l - 22 + 'px' })
      })
      const xEnd = clamp(xNow, xr[0], xr[1])
      const tips = series.map((sr, i) => {
        const pts = sr.points.filter(p => p[0] < xEnd)
        const vEnd = valueAt(i, xEnd)
        const all = [...pts, [xEnd, vEnd]]
        const d = all.map((p, k) => `${k ? 'L' : 'M'}${lx(X(p[0])).toFixed(1)} ${ly(Y(p[1])).toFixed(1)}`).join(' ')
        const P = paths[i]
        attr(P.line, 'd', d)
        attr(P.area, 'd', `${d} L${lx(X(xEnd)).toFixed(1)} ${ly(plot.y + plot.h)} L${lx(X(all[0][0])).toFixed(1)} ${ly(plot.y + plot.h)} Z`)
        attr(P.dot, 'cx', lx(X(xEnd)).toFixed(1)); attr(P.dot, 'cy', ly(Y(vEnd)).toFixed(1))
        return { x: X(xEnd), y: Y(vEnd), v: vEnd, color: P.color }
      })
      for (const ev of evs) attr(ev.el, 'opacity', xNow >= ev.x ? 1 : 0)
      return tips
    },
  }
}

// =====================================================================================================
// the big single cell (cost-counter)
// =====================================================================================================
/**
 * One enormous cell on a sheet card: formula bar (optional), column letter, a label row and the value cell
 * with the active outline, and one empty row under it. opts: x, y, w, valueH (default 230), spareH (44), label, formula (shown in the bar),
 * final (the widest string the value will show, to size the font), tone, col ('A'), row (2).
 * set(text, { flash, scale }) per frame. Returns { el, h, bottom, value, fbar, set, cellRect }.
 */
export function bigCell(parent, o) {
  const X = o.x ?? G.left, Y = o.y ?? G.cardTop, W = o.w ?? G.width, valueH = o.valueH ?? 230
  const gutter = G.gutter
  const fFit = o.formula ? fitFormula([o.formula], W) : null
  const fbarH = fFit ? fFit.ht : 0
  const card = h('div', { class: 'ls-card ls-bigcard', style: { left: X + 'px', top: Y + 'px', width: W + 'px' } })
  parent.append(card)
  const fbar = fFit ? formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines }) : null
  if (fbar) fbar.set(mk(o.formula))
  const letters = h('div', { class: 'ls-letters', 'data-deco': '', style: { top: fbarH + 'px', height: G.lettersH + 'px' } },
    h('i', { class: 'ls-corner', style: { width: gutter + 'px' } }), h('b', { text: o.col || 'A', style: { left: gutter + 'px', width: W - gutter + 'px' } }))
  card.append(letters)
  const headY = fbarH + G.lettersH
  const label = h('div', { class: 'ls-hcell output', style: { left: gutter + 'px', width: W - gutter + 'px' } }, h('div', { class: 'ls-hl', html: mk(o.label || '') }))
  const heads = h('div', { class: 'ls-heads', style: { top: headY + 'px' } }, h('div', { class: 'ls-rn', 'data-deco': '', text: String((o.row ?? 2) - 1), style: { width: gutter + 'px' } }), label)
  card.append(heads)
  const hl = label.firstChild
  if (hl.scrollWidth > W - gutter - 2 * G.padX) { fitText(hl, W - gutter - 2 * G.padX, { minPx: S.labelMin }); css(hl, { whiteSpace: 'normal' }) }
  const labelH = Math.max(76, hl.scrollHeight + 24)
  css(heads, { height: labelH + 'px' }); css(label, { height: labelH + 'px' }); css(heads.firstChild, { height: labelH + 'px' })
  const bodyY = headY + labelH
  const value = h('span', { class: 'ls-bigv' })
  const cell = h('div', { class: 'ls-cell output right ls-bigcell', style: { left: gutter + 'px', width: W - gutter + 'px', height: valueH + 'px' } }, value)
  const row = h('div', { class: 'ls-row', style: { top: '0px', height: valueH + 'px' } }, h('div', { class: 'ls-rn', 'data-deco': '', text: String(o.row ?? 2), style: { width: gutter + 'px', height: valueH + 'px' } }), cell)
  const sel = h('div', { class: 'ls-sel', style: { left: gutter + 'px', top: '0px', width: W - gutter + 'px', height: valueH + 'px', opacity: '1' } }, h('i', { class: 'ls-handle' }))
  // an empty row under the value keeps the outline (and its fill handle) off the card's rounded corner
  const spareH = o.spareH ?? 44
  const spareRow = h('div', { class: 'ls-row spare', style: { top: valueH + 'px', height: spareH + 'px' } },
    h('div', { class: 'ls-rn', 'data-deco': '', text: String((o.row ?? 2) + 1), style: { width: gutter + 'px', height: spareH + 'px', fontSize: '26px' } }),
    h('div', { class: 'ls-cell', style: { left: gutter + 'px', width: W - gutter + 'px', height: spareH + 'px' } }))
  const body = h('div', { class: 'ls-body', style: { top: bodyY + 'px', height: valueH + spareH + 'px' } }, row, spareRow, sel)
  card.append(body)
  css(card, { height: bodyY + valueH + spareH + 'px' })
  // one font size so the widest value fits
  const maxW = W - gutter - 2 * 36
  let px = S.big
  if (o.final) while (px > 60 && textW(esc(o.final), font(900, px), { letterSpacing: '-0.02em' }) > maxW) px -= 4
  css(value, { fontSize: px + 'px', color: o.tone ? toneColor(o.tone) : C.ink })
  return {
    el: card, h: bodyY + valueH + spareH, bottom: Y + bodyY + valueH + spareH, value, fbar, px, cell, sel, label: hl,
    cellRect: () => ({ x0: X + gutter, y0: Y + bodyY, x1: X + W, y1: Y + bodyY + valueH }),
    set(text, { flash = 0, scale = 1, color } = {}) {
      setText(value, text)
      css(value, { transform: scale !== 1 ? `scale(${scale.toFixed(4)})` : 'none', ...(color ? { color } : {}) })
      css(cell, { backgroundColor: flash > 0.001 ? rgba(C.rowHi, flash) : 'transparent' })
    },
  }
}

// =====================================================================================================
// placeholder for formats that are not built yet
// =====================================================================================================
export function stub(spec, ctx, id) {
  const L = layer(ctx)
  const card = h('div', { class: 'ls-card', style: { left: G.left + 'px', top: G.cardTop + 'px', width: G.width + 'px', height: '640px' } },
    h('div', { class: 'ls-stub', html: `TODO ${esc(id)}<br><small>live-sheet · 1 2 3</small>` }))
  L.append(card)
  return { duration: durationOf(spec, { beats: [3], hold: 3 }), seek() {} }
}
