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
// a hyphenated word ("full-time", "Debt-free") is kept on one line: never broken at its hyphen
const nbHyphens = html => html.replace(/[\p{L}\p{N}$%]+(?:-[\p{L}\p{N}$%]+)+/gu, m => `<span class="ls-nb">${m}</span>`)
function segHTML(text, k, whole = text) {
  // "≈ $230,000" never breaks after its "≈" (or "×", "÷"): the operator is glued to its number
  const body = nbHyphens(esc(text)).replace(/([≈×÷]) (?=[\d$−-])/g, '$1\u00A0').replace(/\n/g, '<br>')
  // the inner <span> matters: the linter reads the colour behind a text node from its parent's ancestors,
  // so emphasis that paints its own background must wrap the text one level deeper.
  // a lone operator in emphasis ("growth **>** put in") is set bold in ink where a marker box would look like a glitch
  if (k === 1) return `<em${/^\s*[^\p{L}\p{N}\s]\s*$/u.test(whole) ? ' class="op"' : ''}><span>${body}</span></em>`
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
    html += segHTML(g.slice(0, left).join(''), seg.k, seg.text)
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
export function textW(html, font, { letterSpacing = 'normal', transform = 'none', wordSpacing = 'normal' } = {}) {
  const m = meter()
  m.style.font = font
  m.style.letterSpacing = letterSpacing
  m.style.wordSpacing = wordSpacing
  m.style.textTransform = transform
  m.innerHTML = html
  const w = m.getBoundingClientRect().width
  m.innerHTML = ''
  return w
}
export const font = (weight, px, fam = F.ui) => `${weight} ${px}px ${fam}`

/**
 * The fewest lines (at most k, word breaks only, the most balanced split) that set str with every line at most maxW
 * wide in font fnt. Returns the lines, or null when even k lines will not fit (a word wider than maxW).
 */
export function wrapLines(str, maxW, fnt, letterSpacing = 'normal', k = 2) {
  const words = String(str || '').replace(/\n/g, ' ').split(/\s+/).filter(Boolean)
  if (!words.length) return ['']
  const n = words.length
  const memo = new Map()
  const W = (a, b) => { const key = a + ',' + b; if (!memo.has(key)) memo.set(key, textW(mk(words.slice(a, b).join(' ')), fnt, { letterSpacing })); return memo.get(key) }
  const join = cuts => { const b = [0, ...cuts, n]; return b.slice(0, -1).map((a, i) => words.slice(a, b[i + 1]).join(' ')) }
  if (W(0, n) <= maxW) return [words.join(' ')]
  let best = null, bw = Infinity
  if (k >= 2) for (let i = 1; i < n; i++) { const w = Math.max(W(0, i), W(i, n)); if (w < bw) { bw = w; best = [i] } }
  if (best && bw <= maxW) return join(best)
  best = null; bw = Infinity
  if (k >= 3) for (let i = 1; i < n; i++) for (let j = i + 1; j < n; j++) { const w = Math.max(W(0, i), W(i, j), W(j, n)); if (w < bw) { bw = w; best = [i, j] } }
  if (best && bw <= maxW) return join(best)
  return null
}
/** does a display string read as a number (right-align it)? */
export const isNumeric = v => /\d/.test(String(v)) && !/[A-Za-z]{2,}/.test(String(v))
/**
 * A value cell's HTML: in a value with digits, every word that starts after a space ("months", "yrs") is set at the
 * 40 px floor (.ls-u) so the number carries the size ("55" big, "months" small). The text itself is unchanged.
 * brAt: index of a space to break the line at (two-line values), or null.
 */
export function unitHTML(str, brAt = null) {
  const hasDigit = /\d/.test(str)
  let out = '', i = 0
  // (a no-break space is part of its token: "≈\u00A0$4,680" stays one piece)
  for (const tok of String(str).split(/([ \t\n]+)/)) {
    if (!tok) continue
    if (/^[ \t\n]+$/.test(tok)) out += i === brAt ? '<br>' : esc(tok)
    else out += hasDigit && /^[A-Za-z]/.test(tok) ? `<span class="ls-u">${esc(tok)}</span>` : esc(tok)
    i += tok.length
  }
  return out
}
/** does a value carry words after its number ("55 months", "11 yrs 5 mo")? */
export const hasUnits = str => /\d/.test(String(str)) && /\s[A-Za-z]/.test(String(str))

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
/**
 * The selection springing from rect a to rect b (p = linear progress 0..1). A same-size hop (cell to cell) keeps the
 * spring's overshoot (ease.back, s); a selection collapsing onto a cell inside it eases out with no overshoot (an
 * overshooting edge would strike through the value it lands on); anything else overshoots outward only: no edge
 * ever crosses into the target cell.
 */
export function springRect(a, b, p, s = 1.6) {
  const sameSize = Math.abs((a.x1 - a.x0) - (b.x1 - b.x0)) < 1 && Math.abs((a.y1 - a.y0) - (b.y1 - b.y0)) < 1
  if (sameSize) return lerpRect(a, b, ease.back(clamp(p), s))
  const inside = b.x0 >= a.x0 - 0.5 && b.x1 <= a.x1 + 0.5 && b.y0 >= a.y0 - 0.5 && b.y1 <= a.y1 + 0.5
  if (inside) return lerpRect(a, b, ease.out(clamp(p)))
  const r = lerpRect(a, b, ease.back(clamp(p), s))
  if (a.x0 <= b.x0) r.x0 = Math.min(r.x0, b.x0)
  if (a.y0 <= b.y0) r.y0 = Math.min(r.y0, b.y0)
  if (a.x1 >= b.x1) r.x1 = Math.max(r.x1, b.x1)
  if (a.y1 >= b.y1) r.y1 = Math.max(r.y1, b.y1)
  return r
}

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
export function durationOf(spec, { beats = [], hold = M.hold, min = 5, max = 90, verdictEnd = null, loop = true } = {}) {
  const b = beats.filter(Number.isFinite)
  let d = (b.length ? Math.max(...b) : 0) + hold
  for (let i = 0; i < (spec.vo || []).length; i++) d = Math.max(d, voEnd(spec, i) + 0.4)
  if (spec.verdict && Number.isFinite(spec.verdict.t)) {
    // the verdict stays readable 2.5 s once it is complete (a card lands in ~0.4 s; a bar verdict when its typing
    // ends), before the loop clear starts
    const done = Math.max(spec.verdict.t + 0.4, Number.isFinite(verdictEnd) ? verdictEnd : 0)
    d = Math.max(d, done + 2.5 + (loop ? M.loopOut : 0))
  }
  return Math.min(max, Math.max(min, Math.round(d * 30) / 30))
}
/**
 * The formula-like part of a verdict, for the bar's shortcut rewrite: from its "≈" or "=" to the end of the clause,
 * when that holds an operator ("Max rent ≈ **your hourly wage × 52**" → "≈ your hourly wage × 52"). Null otherwise.
 */
export function shortcutOf(text) {
  const p = plain(String(text || '')).replace(/\s*\n\s*/g, ' ')
  const i = p.search(/[≈=]/)
  if (i < 0) return null
  const rest = p.slice(i)
  const end = rest.search(/[;!?]|[.,](?=\s|$)/)
  const part = (end < 0 ? rest : rest.slice(0, end)).trim()
  return /[×÷+−*/]/.test(part.slice(1)) && part.length > 3 ? part : null
}
/** say once (console.warn) that a layout could not fit its budget; the linter will show where */
export function fitWarn(name, bottom, limit) {
  if (bottom > limit + 1) console.warn(`live-sheet ${name}: content ends at y ${Math.round(bottom)}, over its ${limit} budget`)
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

/** the assumption line's element (wraps, balanced, only when one line will not fit) */
function footerEl(text, x, w) {
  const el = h('div', { class: 'ls-footer', html: mk(text), style: { left: x + 'px', width: w + 'px', fontSize: S.footer + 'px' } })
  if (textW(mk(text), font(600, S.footer)) > w) css(el, { whiteSpace: 'normal' })
  return el
}
/** height (px) the footer will take at width w (0 if no text): measured, so a 3-line footer is 3 lines */
export function footerHeight(text, w = G.railX - G.left) {
  if (!text) return 0
  const el = footerEl(text, -6000, w)
  css(el, { visibility: 'hidden', top: '0px' })
  ;(document.getElementById('stage') || document.body).append(el)
  const ht = el.offsetHeight
  el.remove()
  return ht
}
/** the assumption line. pos: { x, w, top } or { x, w, bottom } (stage px). Visible from t = 0. */
export function footer(parent, text, pos = {}) {
  const x = pos.x ?? G.left, w = pos.w ?? (G.railX - G.left)
  const el = footerEl(text, x, w)
  parent.append(el)
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

// words a caption chunk should not end on (the phrase continues), and the units a number keeps with it
const FUNC_WORDS = new Set(('a an the of to that\'s thats you you\'re your in on for and or is at by with from it it\'s its '
  + 'my our their this that if as than but be are was what how per every each into just so we i do does can than then '
  + 'not no will would has have had').split(' '))
const UNIT_WORDS = new Set(('a an per every each day days week weeks month months year years yr yrs mo hour hours hr hrs '
  + 'minute minutes second seconds sec percent % times k thousand million billion trillion dollars bucks cents shares '
  + 'paychecks checks payments people more less').split(' '))
const wordText = w => (w && w.parts ? w.parts.map(p => p.text).join('') : String(w))
/** a word that ends a sentence: "$21,000." "weeks?" (a decimal like "2.5" is not; a colon is a clause seam, below) */
const endsHard = str => /[A-Za-z0-9)%"'’][.?!;]["'’)\]]*$/.test(str) && !/^(?:[A-Z]\.){1,3}$/.test(str)
const endsColon = str => /[A-Za-z0-9)%"'’]:["'’)\]]*$/.test(str)
const endsSoft = str => /[,—–]["'’)]*$/.test(str)
// spelled-out numbers keep their unit like digits do ("two | weeks" is as bad a break as "2 | weeks")
const NUM_WORDS = new Set(('one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen '
  + 'sixteen seventeen eighteen nineteen twenty thirty forty fifty sixty seventy eighty ninety hundred thousand million '
  + 'billion trillion grand half quarter dozen').split(' '))
/** a caption chunk may be set down to this size (from S.caption) to keep a short phrase whole rather than orphan a word */
const CAP_SQUEEZE = 58

/**
 * Split caption words into chunks (≤ maxWords each, each ≤ maxW wide) that read as phrases. Lowest total cost:
 * every chunk costs 1 (fewer is better); a break after a full stop, "?" or "!" is free and one is forced there
 * (a chunk never runs on past a sentence end); a break after a comma or a colon is cheap (a chunk that is only
 * "Year 15:" costs extra, so the colon's phrase keeps a word of what follows); any other break costs more, and a lot
 * more after a function word ("the", "your", "that's") or between a number (digits or words: "two") and its unit
 * ("$5" | "a day", "two" | "weeks"). A one-word chunk costs a lot (2 + 2 beats 3 + 1), an underfilled chunk a
 * little. A phrase up to 68/58 of maxW wide may stay whole (the caller sets it smaller, down to 58 px) at a small
 * cost, when that saves an orphaned word.
 */
export function chunkWords(words, widthOf, maxW, maxWords = 4, squeeze = S.caption / CAP_SQUEEZE) {
  const n = words.length
  if (!n) return []
  const txt = words.map(wordText)
  const bare = txt.map(x => x.toLowerCase().replace(/^[^\p{L}\p{N}$%≈×÷−+=]+|[^\p{L}\p{N}%]+$/gu, ''))
  const isNum = i => /\d/.test(txt[i]) || NUM_WORDS.has(bare[i])
  const memo = new Map()
  const wd = (i, j) => { const k = i + ',' + j; if (!memo.has(k)) memo.set(k, widthOf(words.slice(i, j))); return memo.get(k) }
  const breakCost = i => { // a break after word i (more words follow)
    if (endsHard(txt[i])) return 0
    if (endsSoft(txt[i]) || endsColon(txt[i]) || /^[—–]$/.test(txt[i + 1] || '')) return 0.25
    let c = 0.7
    if (FUNC_WORDS.has(bare[i])) c += 2
    if (isNum(i) && UNIT_WORDS.has(bare[i + 1])) c += 1.5
    if (/^[×÷=≈+−→-]$/.test(txt[i])) c += 2 // never end a chunk on an operator
    return c
  }
  const best = new Array(n + 1).fill(Infinity), cut = new Array(n + 1).fill(n)
  best[n] = 0
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j <= Math.min(n, i + maxWords); j++) {
      if (j - 2 >= i && endsHard(txt[j - 2])) break // a sentence end inside the chunk
      const w = wd(i, j)
      if (w > maxW * squeeze && j - i > 1) break
      const fill = Math.min(1, w / maxW)
      let c = 1 + (j < n ? breakCost(j - 1) : 0) + (j - i === 1 && n > 1 ? 1.2 : 0) + 0.3 * (1 - fill) * (1 - fill)
      if (w > maxW && j - i > 1) c += 0.5 + 2 * (w / maxW - 1) // set smaller to stay whole
      if (j < n && j - i <= 2 && endsColon(txt[j - 1])) c += 1.5 // a lone "Year 15:" or "Check:"
      if (c + best[j] < best[i] - 1e-9) { best[i] = c + best[j]; cut[i] = j }
    }
    if (!Number.isFinite(best[i])) { best[i] = 1 + best[i + 1]; cut[i] = i + 1 } // a word wider than maxW alone
  }
  const out = []
  for (let i = 0; i < n; i = cut[i]) out.push(words.slice(i, cut[i]))
  return out
}

/**
 * Captions for spec.vo in the caption band: each line is cut into 1-4 word chunks that read as phrases and fit one
 * line (chunkWords), timed by length across the line; each chunk pops in. A full stop at a chunk's end is dropped
 * (a "?" or "!" stays). **x** = yellow keyword, __x__ = coral.
 * holds [{ text, t }]: a chunk that contains `text` (e.g. the number a cell is counting up to) waits until t, so the
 * caption never gives the count away. seek(t, { hidden }) → true when a caption is showing.
 */
export function captions(parent, spec, { top = G.bandTop, bottom = G.bandBottom, x = G.left, w = G.railX - G.left } = {}, holds = []) {
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
    const groups = chunkWords(words, ws => textW(wordsHTML(ws), capFont(S.caption), { transform: 'uppercase' }), maxW, 4)
    // short-form captions drop a chunk's closing full stop (a "?" or "!" stays)
    for (const g of groups) {
      const last = g[g.length - 1]
      const pt = last && last.parts[last.parts.length - 1]
      if (pt && /[A-Za-z0-9)%]\.$/.test(wordText(last)) && !/^(?:[A-Z]\.){1,3}$/.test(wordText(last))) {
        g[g.length - 1] = { ...last, parts: [...last.parts.slice(0, -1), { ...pt, text: pt.text.slice(0, -1) }].filter(x => x.text), len: last.len - 1 }
      }
    }
    const weights = groups.map(g => g.reduce((a, x) => a + x.len + 1, 3))
    const tot = weights.reduce((a, b) => a + b, 0)
    let acc = v.t
    groups.forEach((g, gi) => {
      const d = ((end - v.t) * weights[gi]) / tot
      const html = wordsHTML(g)
      const wpx = textW(html, capFont(S.caption), { transform: 'uppercase' })
      const px = wpx > maxW ? Math.max(S.captionMin, Math.floor((S.caption * maxW) / wpx)) : S.caption
      chunks.push({ t0: acc, t1: gi === groups.length - 1 ? end + 0.15 : acc + d, html, px, plain: g.map(wordText).join(' ').toUpperCase() })
      acc += d
    })
  })
  // a chunk that names a number still counting waits for the count to land (the chunk before it holds on)
  for (const hd of holds || []) {
    const key = plain(String(hd.text || '')).toUpperCase()
    if (!key || !Number.isFinite(hd.t)) continue
    chunks.forEach((c, k) => {
      if (!c.plain.includes(key) || c.t0 >= hd.t) return
      const t0 = Math.min(hd.t, c.t1 - 0.6)
      if (t0 <= c.t0) return
      const prev = chunks[k - 1]
      if (prev && Math.abs(prev.t1 - c.t0) < 1e-6) prev.t1 = t0
      c.t0 = t0
    })
  }
  return {
    el: box, chunks,
    seek(t, { hidden = false } = {}) {
      const c = hidden ? null : chunks.find(x => t >= x.t0 && t < x.t1)
      if (!c) {
        // parked: empty and untransformed, so a hidden caption never depends on the frame before
        css(box, { opacity: '0' }); setHTML(line, ''); css(line, { fontSize: S.caption + 'px', transform: 'none' })
        return false
      }
      setHTML(line, c.html)
      const p = c.t0 <= 0 ? 1 : prog(t, c.t0, 0.18)
      css(line, { fontSize: c.px + 'px', transform: p >= 1 ? 'none' : `scale(${popScale(p, 0.92).toFixed(4)})` })
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
  // the card hugs its (balanced) lines and centres on the column, rather than leaving half of it empty
  const rg = document.createRange()
  rg.selectNodeContents(txt)
  const lines = [...rg.getClientRects()]
  const tx0 = txt.getBoundingClientRect().left
  const used = lines.length ? Math.ceil(Math.max(...lines.map(r => r.right - tx0))) + 2 : maxW
  if (used < maxW - 24) {
    const cw = used + 104 + 26
    css(txt, { width: used + 'px' })
    css(el, { width: cw + 'px', left: Math.round(x + (w - cw) / 2) + 'px' })
  }
  const ht = el.offsetHeight
  css(el, { top: Math.round(top + (bottom - top - ht) / 2) + 'px' })
  return {
    el,
    seek(t, { out = 0 } = {}) {
      if (t < verdict.t || out >= 1) { css(el, { opacity: '0', transform: 'scale(0.94)' }); css(txt, { '--hl': '0.0%' }); return false }
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
 *   captionHolds: [{ text, t }] a caption chunk naming `text` (a count-up's display string) waits until t
 *   footerShift(t): px the assumption line moves down this frame (a card growing while a tooltip slot is open)
 *   loop: { t0, dur } the loop-out window (the verdict card fades away in it)
 */
export function chrome(spec, ctx, body) {
  const hint = (body && body.chrome) || {}
  const top = layer(ctx, 'ls-chrome')
  brandMark(top)
  banner(top, spec.header || '')
  const foot = spec.footer && hint.footer !== false ? footer(top, spec.footer, hint.footer || {}) : null
  const caps = hint.captions !== false && hasCaptions(spec) ? captions(top, spec, hint.captionBox || {}, hint.captionHolds || []) : null
  const v = spec.verdict && spec.verdict.text && hint.verdict !== 'self' ? verdictCard(top, spec.verdict, hint.verdictBox || {}) : null
  if (v) ctx.cue(spec.verdict.t, 'ding')
  const loop = hint.loop
  return {
    seek(t) {
      // a card that grows (a slot opening) pushes the assumption line down with it
      if (foot && hint.footerShift) { const dy = Math.round(hint.footerShift(t) || 0); css(foot.el, { transform: dy ? `translateY(${dy}px)` : 'none' }) }
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
 * Break a string onto two lines at its best seam. Seam kinds in order of preference: the author's line break,
 * " · " (dropped), ": " (ends line 1), " vs ", " = ", " → " (each starts line 2), ", " (ends line 1), then any space.
 * Among the seams of the first kind where both lines fit `avail`, the most balanced wins. A seam never splits
 * **x** / __x__ markup and never leaves "≈" (or another operator) without its number. Returns "line 1\nline 2", or null.
 */
export function twoLines(raw, wOf, avail) {
  const nb = str => str.trim()
  const balanced = str => (str.split('**').length - 1) % 2 === 0 && (str.split('__').length - 1) % 2 === 0
  const str = String(raw)
  const kinds = []
  const nl = str.indexOf('\n')
  if (nl > 0) kinds.push([[str.slice(0, nl), str.slice(nl + 1).replace(/\s*\n\s*/g, ' ')]])
  const flat = nb(str.replace(/\s*\n\s*/g, ' '))
  for (const [sep, keep] of [[' · ', ''], [': ', 'a'], [' vs ', 'b'], [' = ', 'b'], [' → ', 'b'], [', ', 'a'], [' ', '']]) {
    const opts = []
    for (let i = flat.indexOf(sep); i > 0; i = flat.indexOf(sep, i + 1)) {
      opts.push([flat.slice(0, i) + (keep === 'a' ? sep.trim() : ''), (keep === 'b' ? sep.trim() + ' ' : '') + flat.slice(i + sep.length)])
    }
    if (opts.length) kinds.push(opts)
  }
  for (const opts of kinds) {
    let best = null, bw = Infinity
    for (const [a0, b0] of opts) {
      const a = nb(a0), b = nb(b0)
      if (!a || !b || !balanced(a) || /(^|\s)[≈=×÷+−→-]$/.test(a)) continue
      const w = Math.max(wOf(a), wOf(b))
      if (w <= avail && w < bw) { best = a + '\n' + b; bw = w }
    }
    if (best) return best
  }
  return null
}

/**
 * How a verdict typed into the formula bar is set: Inter 800 (not the working's mono), one line from 52 px down to
 * 40 px; else two lines broken at a seam (48 → 40 px), and the bar grows to hold them from the verdict on.
 * Returns { text (with "\n" at the seam), px, lines, ht (bar height while it shows) }.
 */
export function fitBarVerdict(text, w = G.width) {
  const avail = w - 102 - 22 - 8
  const one = String(text || '').replace(/\s*\n\s*/g, ' ')
  const f = px => font(800, px)
  const wOf = (str, px) => textW(mk(str), f(px), { letterSpacing: '-0.012em' })
  for (let px = 52; px >= 40; px -= 2) if (wOf(one, px) <= avail) return { text: one, px, lines: 1, ht: G.fbarH }
  for (let px = 48; px >= 40; px -= 2) {
    const two = twoLines(text, x => wOf(x, px), avail)
    if (two) return { text: two, px, lines: 2, ht: Math.max(G.fbarH, Math.ceil(2 * px * 1.08 + 20)) }
  }
  return { text: one, px: 40, lines: 2, ht: Math.ceil(2 * 40 * 1.08 + 20), wrap: true }
}

/**
 * Formula bar. sheet() and bigCell() build one as their card's top strip; standalone, pass
 * { x, y, w, ht, standalone: true } (px relative to `parent`) and it draws its own rounded card.
 * Size it with fitFormula(strings, w) → { px, lines, ht } so every string it will show fits.
 * set(html, { caret }) shows a state; type(t, t0, str, { cps, from }) types a markup string at time t.
 * verdict: the verdict text when it is retyped into this bar; `vfit` (fitBarVerdict) then says how to type it
 * (type vfit.text), and verdictStyle(on, grow) switches the bar between the working (mono 700, slate) and the
 * verdict (Inter 800, ink, vfit.px; grow 0..1 opens a two-line verdict's extra height over the rows below).
 */
export function formulaBar(parent, { x = 0, y = 0, w = G.width, ht = G.fbarH, standalone = false, px = S.formula, lines = 1, verdict = null } = {}) {
  const chip = h('div', { class: 'ls-chip', 'data-deco': '', text: '≈' })
  const txt = h('span', { class: 'ls-ftxt' })
  const caret = h('i', { class: 'ls-caret' })
  const line = h('div', { class: 'ls-fline' }, txt, caret)
  const el = h('div', { class: 'ls-fbar' + (standalone ? ' standalone' : ''), style: { left: x + 'px', top: y + 'px', width: w + 'px', height: ht + 'px' } }, chip, line)
  parent.append(el)
  const textW0 = w - 102 - 22
  css(line, { fontSize: px + 'px', width: textW0 + 'px', whiteSpace: lines > 1 ? 'normal' : 'nowrap' })
  css(chip, { height: Math.min(66, ht - 20) + 'px' })
  const vfit = verdict ? fitBarVerdict(verdict, w) : null
  const working = { fontFamily: F.mono, fontWeight: '700', fontSize: px + 'px', lineHeight: '1.2', letterSpacing: '-0.01em', color: C.fbarText, whiteSpace: lines > 1 ? 'normal' : 'nowrap' }
  return {
    el, chip, txt, caret, line, px, vfit,
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
    /** the working (mono) or the verdict (Inter 800, ink); grow opens a two-line verdict's height */
    verdictStyle(on, grow = 1) {
      const vs = on && vfit
      css(line, vs ? { fontFamily: F.ui, fontWeight: '800', fontSize: vfit.px + 'px', lineHeight: '1.08', letterSpacing: '-0.012em', color: C.ink, whiteSpace: vfit.wrap ? 'normal' : 'nowrap' } : working)
      css(txt, { color: '', fontWeight: '' })
      const g = vs && vfit.ht > ht ? clamp(grow) : 0
      const hNow = Math.round(ht + (vfit ? vfit.ht - ht : 0) * g)
      css(el, { height: hNow + 'px', zIndex: g > 0 ? '8' : 'auto', boxShadow: g > 0 ? '0 3px 0 #D0D5DD' : 'none' })
      css(chip, { height: Math.min(66, hNow - 20) + 'px' })
    },
  }
}
/**
 * A formula bar's script over time. entries: [{ t, text, verdict?, cps? }] (markup strings, typed in time order).
 * The first entry (t <= 0) is already mid-typing at frame 1 with `cut` graphemes shown. Every later entry erases what
 * shows (`erase` s) and types at a speed that finishes 0.8 s before the next entry is due (never under M.cps; a
 * verdict never under 26 cps). minHold: an entry never starts until the one before has been readable that long
 * after its typing ended (later entries are pushed back; the caller uses the returned times). From loopT0 the bar
 * erases what shows and retypes frame 1's prefix, so the short loops.
 * Returns { fx (the timed entries: t, start, end, len, from, cps, erase …), at(t) → { str, n, caret, verdict, entry },
 * html(state), end (last typing end), cue(ctx) (a 'type' cue per entry) }.
 */
export function barScript(entries, { cut = 0, loopT0 = Infinity, minHold = 0, erase = 0.16, vCps = 26 } = {}) {
  const es = entries.filter(e => e && e.text != null && String(e.text) !== '')
    .map(e => ({ ...e, t: Number.isFinite(+e.t) ? +e.t : 0, text: String(e.text) }))
    .sort((a, b) => a.t - b.t || !!a.verdict - !!b.verdict)
  const fx = []
  let prevEnd = -Infinity
  es.forEach((e, i) => {
    const er = i > 0 ? erase : 0
    const t0 = i > 0 ? Math.max(e.t, prevEnd + minHold) : e.t
    const start = t0 + er
    const len = mkLen(e.text), from = i === 0 ? Math.min(cut, len) : 0
    const nextT = es[i + 1] ? Math.max(es[i + 1].t, start + 0.3) : Infinity
    const room = nextT - start - 0.8
    let cps = e.cps ?? (Number.isFinite(room) && room > 0.3 ? Math.max(M.cps, (len - from) / room) : M.cps)
    if (e.verdict) cps = Math.max(vCps, cps)
    const end = start + Math.max(0, len - from) / cps
    fx.push({ ...e, t: t0, erase: er, start, len, from, cps, end })
    prevEnd = end
  })
  const first = fx[0] || { text: '', t: 0, start: 0, len: 0, from: 0, cps: M.cps, end: 0 }
  function play(t) {
    let i = -1
    for (let k = 0; k < fx.length; k++) if (t >= fx[k].t || (k === 0 && fx[0].t <= 0)) i = k
    if (i < 0) return { str: '', n: 0, caret: caretOn(t, false) }
    const e = fx[i]
    if (i > 0 && t < e.start) {
      const pe = fx[i - 1]
      const n0 = typedCount(e.t, pe.start, pe.text, { cps: pe.cps, from: pe.from })
      return { str: pe.text, n: Math.round(n0 * (1 - prog(t, e.t, e.erase))), caret: true, verdict: !!pe.verdict, entry: pe }
    }
    const n = typedCount(t, e.start, e.text, { cps: e.cps, from: e.from })
    return { str: e.text, n, caret: caretOn(t, t >= e.start && n < e.len), verdict: !!e.verdict, entry: e }
  }
  function at(t) {
    if (t < loopT0) return play(t)
    // the loop: erase whatever shows, then retype frame 1's prefix
    const cur = play(loopT0 - 1e-4), e1 = 0.22
    if (t < loopT0 + e1) {
      const n = Math.round(cur.n * (1 - prog(t, loopT0, e1)))
      return { str: cur.str, n: cur.str === first.text ? Math.max(Math.min(cut, first.len), n) : n, caret: true, verdict: cur.verdict && n > 0 }
    }
    if (cur.str === first.text) return { str: first.text, n: Math.min(cut, first.len), caret: true }
    return { str: first.text, n: Math.round(Math.min(cut, first.len) * prog(t, loopT0 + e1, 0.2)), caret: true }
  }
  return {
    fx, at, first,
    html: st => typedMk(st.str, st.n),
    end: fx.length ? Math.max(...fx.map(e => e.end)) : 0,
    cue(ctx) {
      fx.forEach((e, i) => {
        if (e.len <= e.from || e.start >= loopT0) return
        ctx.cue(i === 0 ? Math.max(0, e.start) : e.start, 'type', { dur: Math.max(0.15, (e.len - e.from) / e.cps) })
      })
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
/** extra right padding in the card's last column: right-aligned values end at x 920, clear of the fill handle */
export const HANDLE_PAD = 18
const sum = a => a.reduce((x, y) => x + y, 0)
/** the narrowest a label line can be over at most k lines (word breaks only; a hyphenated word stays whole) */
function narrowest(str, f, k, letterSpacing) {
  const words = plain(str).split(/\s+/).filter(Boolean)
  if (!words.length) return 0
  const memo = new Map()
  const W = (a, b) => { const key = a + ',' + b; if (!memo.has(key)) memo.set(key, textW(esc(words.slice(a, b).join(' ')), f, { letterSpacing })); return memo.get(key) }
  const n = words.length
  let best = W(0, n)
  if (k >= 2) for (let i = 1; i < n; i++) best = Math.min(best, Math.max(W(0, i), W(i, n)))
  if (k >= 3) for (let i = 1; i < n; i++) for (let j = i + 1; j < n; j++) best = Math.min(best, Math.max(W(0, i), W(i, j), W(j, n)))
  return best
}
/**
 * A designed spreadsheet card on the surround.
 * opts:
 *   x, y, w                 card position (stage px), default 60 / 444 / 900
 *   columns: [{ label, kind: 'input'|'mid'|'output', tone, align, w, minW, px, units, group }]
 *                           label may hold '\n': line 2+ is the grey sub-label (each further '\n' a line of it). w: a fixed width; minW: a floor;
 *                           px: this column's cell type size; units: words after a number set at 40 px (unitHTML);
 *                           group: columns with the same key get the same width (a duel's people)
 *   values: rows × cols display strings (used to size the columns; nothing is shown until you set it)
 *   rows                    number of data rows (default values.length)
 *   reserve                 px of empty sheet under the data (room for a tooltip slot), drawn as the un-numbered tail
 *   spare                   extra room under the data, in rows (fractional allowed), also drawn as the tail
 *   tail                    px of tail to add anyway (air between the last row and the rounded corner)
 *   rowH | bottom           row height, or the card's bottom edge (then rowH = what fits, in [minRowH, maxRowH])
 *   minRowH, maxRowH        default 52 / 102
 *   formula: false | { strings: [...], verdict }   the formula bar, the strings it will show (sized to fit), and the
 *                           verdict when it is retyped there (fitBarVerdict; it does not size the bar)
 *   letters                 column-letter row: true (default) | false | 'auto' (dropped when rows get under 58 px)
 *   startRow                number on the first data row (default 2: row 1 is the label row)
 *   pad                     cell padding (default: 22 px, 12 px when the columns do not fit at 22)
 *   columns[j].px           a fixed cell size, or fs => px (a size derived from the sheet's cell sizes)
 *   columns[j].maxW / fit   a cap on the column's width (its values must fit under it: every cell size shrinks
 *                           together until they do) / the column takes no spare width (it keeps its floor)
 * Column widths: every column gets at least its widest value and its label balanced over two lines at 40 px; when
 * that does not fit, every cell size shrinks together (never under 40 px) before any one column gives way; the
 * spare width goes first to labels that want one line, then in proportion to the values. The card's last column
 * keeps HANDLE_PAD more right padding (values end at x 920, clear of the fill handle).
 * Returns the API documented in README.md (cell(), setCell(), select(), hiRow(), rowShift(), …).
 */
export function sheet(parent, o) {
  const cols = o.columns
  const nC = cols.length
  const values = o.values || []
  const nR = o.rows ?? values.length
  const reserve = o.reserve ?? 0 // px of empty sheet under the data (room for a tooltip strip)
  const spareRows = o.spare ?? 0
  const tailPx = o.tail ?? 0
  const X = o.x ?? G.left, Y = o.y ?? G.cardTop, W = o.w ?? G.width
  const gutter = o.gutter ?? G.gutter
  const fFit = o.formula === false ? null : fitFormula((o.formula && o.formula.strings) || [], W)
  const fbarH = fFit ? fFit.ht : 0
  let lettersH = o.letters === false ? 0 : G.lettersH
  const kindOf = j => cols[j].kind || (j === 0 ? 'input' : cols[j].emph ? 'output' : 'mid')
  const alignOf = j => cols[j].align || (values.length && values.every(r => r[j] == null || r[j] === '' || isNumeric(r[j])) ? 'right' : 'left')
  // cell padding: 22 px, or 12 px when a dense card cannot fit its values and label words otherwise
  let pad = G.padX
  const padR = j => pad + (j === nC - 1 && alignOf(j) === 'right' ? HANDLE_PAD : 0)

  // ---- type sizes and column widths -------------------------------------------------------------
  const labelParts = cols.map(c => String(c.label || '').split('\n'))
  const labStrs = j => labelParts[j].filter((x, i) => i === 0 || x) // the label, then each sub-label line
  const avail = W - gutter
  const fsFor = rowH => cellSizes(rowH)
  const cellPx = (j, fs) => (typeof cols[j].px === 'function' ? cols[j].px(fs) : cols[j].px) ?? (kindOf(j) === 'input' ? fs.input : kindOf(j) === 'output' ? fs.result : fs.mid)
  const cellWeight = j => (kindOf(j) === 'mid' ? 700 : 800)
  const cellHTML = (j, v) => (cols[j].units && hasUnits(v) ? unitHTML(v) : esc(v))
  const valW = fs => cols.map((c, j) => Math.max(40, ...values.map(r => (r[j] ? textW(cellHTML(j, String(r[j])), font(cellWeight(j), cellPx(j, fs)), { letterSpacing: '-0.01em' }) : 0))))
  // maxW caps a column (its values must fit under it: the cell sizes shrink together until they do)
  const capOf = j => cols[j].maxW ?? Infinity
  const rawNeed = fs => valW(fs).map((w, j) => w + pad + padR(j) + 4)
  const needFor = fs => rawNeed(fs).map((x, j) => Math.min(x, capOf(j)))
  const overCap = fs => rawNeed(fs).some((x, j) => x > capOf(j) + 0.5)
  // a label wants one line at full size; it can go down to two (then three) balanced lines at 40 px, and never
  // below its longest word at 40 px (a word is never clipped)
  const lab1 = cols.map((c, j) => Math.max(...labStrs(j).map((l, i) => textW(mk(l), font(i ? 600 : 800, i ? S.sub : S.label)))))
  // (a sub-label the author already broke into lines keeps each line one line shorter: 1 at the two-line floor)
  const labKw = k => cols.map((c, j) => { const L = labStrs(j); return Math.max(...L.map((l, i) => narrowest(l, font(i ? 600 : 800, i ? S.sub : S.labelMin), i && L.length > 2 ? k - 1 : k, i ? '-0.01em' : '-0.012em'))) })
  const lab2w = labKw(2), lab3w = labKw(3)
  const wordsOnly = cols.map((c, j) => Math.max(...labStrs(j).map((l, i) => Math.max(0, ...plain(l).split(/\s+/).filter(Boolean).map(wd => textW(esc(wd), font(i ? 600 : 800, i ? S.sub : S.labelMin), { letterSpacing: '-0.012em' }))))))
  // lines a label takes (its main part and every sub-label line, at the 40 px floor, wrapped) in a column w wide
  const wordWs = cols.map((c, j) => labStrs(j).map((l, i) => plain(l).split(/\s+/).filter(Boolean).map(wd => textW(esc(wd), font(i ? 600 : 800, i ? S.sub : S.labelMin), { letterSpacing: i ? '-0.01em' : '-0.012em' }))))
  const spaceW = textW('a&nbsp;a', font(800, S.labelMin)) - textW('aa', font(800, S.labelMin))
  const labelLinesAt = (j, w, pd) => {
    const room = w - 2 * pd - 2
    let n = 0
    for (const ws of wordWs[j]) {
      if (!ws.length) continue
      let line = -spaceW, k = 1
      for (const x of ws) { if (line + spaceW + x > room && line > 0) { k++; line = x } else line += spaceW + x }
      n += k
    }
    return n
  }
  // columns sharing a `group` key (a duel's people) get one width: the widest floor of the group, then equal shares
  const grouped = arr => arr.map((x, j) => (cols[j].group == null ? x : Math.max(...arr.filter((_, k) => cols[k].group === cols[j].group))))
  const floorOf = (need, labw) => grouped(cols.map((c, j) => c.w ?? Math.max(need[j], labw[j] + 2 * pad + 8, c.minW ?? 0)))

  // row height first guess (label row assumed 1 or 2 lines), refined after the label row is laid out
  const labelLines0 = Math.max(...labelParts.map(p => p.length))
  const labelH0 = labelLines0 > 1 ? 104 : 76
  const minRowH = o.minRowH ?? 52, maxRowH = o.maxRowH ?? 102
  const rowHFor = labelH => (o.rowH ? o.rowH : Math.floor(clamp(((o.bottom ?? G.workBottom) - Y - fbarH - lettersH - labelH - reserve - tailPx) / (nR + spareRows), minRowH, maxRowH)))
  let rowH = rowHFor(labelH0)
  // 'auto' letters: the A B C row is decoration, so it goes first when rows get cramped
  if (o.letters === 'auto' && rowH < 58) { lettersH = 0; rowH = rowHFor(labelH0) }
  const fs0 = fsFor(rowH)
  let fs = fs0, need, widths = null
  const pads = o.pad != null ? [o.pad] : [G.padX, 12]
  const allocate = fsStart => {
  for (const p of pads) {
    pad = p
    fs = fsStart
    need = needFor(fs)
    let floor = floorOf(need, lab2w)
    // too wide: every cell size shrinks together (never under 40 px) before any one column gives way
    for (let k = 0; k < 12 && (sum(floor) > avail + 0.5 || overCap(fs)); k++) {
      if (fs.input <= S.cellMin && fs.mid <= S.cellMin && fs.result <= S.cellMin) break
      const f = Math.max(0.85, Math.min(0.98, avail / sum(floor)))
      fs = { input: Math.max(S.cellMin, Math.floor(fs.input * f)), mid: Math.max(S.cellMin, Math.floor(fs.mid * f)), result: Math.max(S.cellMin, Math.floor(fs.result * f)) }
      need = needFor(fs)
      floor = floorOf(need, lab2w)
    }
    if (sum(floor) > avail + 0.5) floor = floorOf(need, lab3w) // labels may take three lines
    if (sum(floor) > avail + 0.5) {
      // values first: every column keeps its widest value and its label's longest word. The spare width then goes
      // to the tallest label, a line at a time (the label row is as tall as its tallest label), until every label
      // is down to two lines or the width runs out; what is left goes by values. When a label would still take
      // more than three lines, the tighter padding is tried first.
      const base = cols.map((c, j) => c.w ?? Math.max(need[j], wordsOnly[j] + 2 * pad + 4, c.minW ?? 0))
      if (sum(base) > avail + 0.5) { if (p !== pads[pads.length - 1]) continue; widths = base.map(x => (x * avail) / sum(base)); break } // last resort: all give
      widths = base.slice()
      let left = avail - sum(base)
      const members = j => (cols[j].group == null ? [j] : cols.map((c, k) => k).filter(k => cols[k].group === cols[j].group))
      const free = cols.map((c, j) => j).filter(j => cols[j].w == null)
      for (let it = 0; it < 80 && left > 0.5 && free.length; it++) {
        const lnow = free.map(j => labelLinesAt(j, widths[j], pad))
        const top = Math.max(...lnow)
        if (top <= 2) break
        // every label at the top line count must lose a line, or the row does not get shorter
        let cost = 0
        const grow = []
        for (const j of free.filter((j, k) => lnow[k] === top)) {
          let w = widths[j]
          while (w < widths[j] + left && labelLinesAt(j, w, pad) >= top) w += 4
          if (labelLinesAt(j, w, pad) >= top) { cost = Infinity; break }
          grow.push([j, w]); cost += (w - widths[j]) * members(j).length
        }
        if (!(cost <= left)) break
        for (const [j, w] of grow) for (const k of members(j)) { left -= Math.max(0, w - widths[k]); widths[k] = Math.max(widths[k], w) }
      }
      if (p !== pads[pads.length - 1] && Math.max(0, ...free.map(j => labelLinesAt(j, widths[j], pad))) > 3) continue
      const flex = grouped(cols.map((c, j) => (c.w != null || c.fit ? 0 : need[j])))
      const Fx = sum(flex)
      widths = widths.map((x, j) => x + (Fx ? (left * flex[j]) / Fx : 0))
      break
    }
    let left = avail - sum(floor)
    // as many labels as possible go back to one line: the cheapest first, each gets all it needs or nothing
    const want = cols.map((c, j) => (c.w != null ? 0 : Math.max(0, lab1[j] + 2 * pad + 2 - floor[j])))
    widths = floor.slice()
    for (const j of want.map((x, j) => j).filter(j => want[j] > 0).sort((a, b) => want[a] - want[b])) {
      if (want[j] > left) break
      widths[j] += want[j]; left -= want[j]
    }
    const flex = grouped(cols.map((c, j) => (c.w != null || c.fit ? 0 : need[j])))
    const Fx = sum(flex)
    widths = widths.map((x, j) => x + (Fx ? (left * flex[j]) / Fx : 0))
    break
  }
  // a group shares its total equally
  for (const gk of new Set(cols.map(c => c.group).filter(g => g != null))) {
    const js = cols.map((c, j) => j).filter(j => cols[j].group === gk)
    const avg = sum(js.map(j => widths[j])) / js.length
    js.forEach(j => { widths[j] = avg })
  }
  }
  allocate(fs0)
  // The cell sizes above came from a guessed label row. Estimate the real one from these widths: when it is taller,
  // the rows (and their type) get smaller, so the columns are shared out again for the smaller values (the label
  // that needed the room gets it back).
  if (!o.rowH) {
    const labHt = Math.max(76, Math.ceil(Math.max(...cols.map((c, j) => labelLinesAt(j, widths[j], pad) * S.labelMin * 1.1)) + 24))
    const f2 = fsFor(rowHFor(labHt))
    if (f2.input < fs.input || f2.mid < fs.mid || f2.result < fs.result) {
      const fsMin = { input: Math.min(fs.input, f2.input), mid: Math.min(fs.mid, f2.mid), result: Math.min(fs.result, f2.result) }
      allocate(fsMin)
    }
  }
  // integer columns that add up exactly
  const colX = [gutter]
  for (let j = 0; j < nC; j++) colX.push(j === nC - 1 ? W : Math.round(colX[j] + widths[j]))
  const colW = cols.map((c, j) => colX[j + 1] - colX[j])

  // ---- DOM ------------------------------------------------------------------------------------------
  const card = h('div', { class: 'ls-card', style: { left: X + 'px', top: Y + 'px', width: W + 'px' } })
  parent.append(card)
  const fbar = fFit ? formulaBar(card, { x: 0, y: 0, w: W, ht: fbarH, px: fFit.px, lines: fFit.lines, verdict: (o.formula && o.formula.verdict) || null }) : null

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
    const el = h('div', { class: `ls-hcell ${kindOf(j)}`, style: { left: colX[j] + 'px', width: colW[j] + 'px', ...(pad !== G.padX ? { padding: `0 ${pad}px` } : {}) } },
      h('div', { class: 'ls-hl', html: mk(parts[0]) }),
      parts.length > 1 ? h('div', { class: 'ls-hsub', html: parts.slice(1).map(mk).join('<br>') }) : null)
    heads.append(el)
    return el
  })
  card.append(heads)
  // fit labels: shrink to 40 px, then wrap (balanced)
  let labelH = 0
  for (const [j, el] of labelEls.entries()) {
    const inner = colW[j] - 2 * pad
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
  // grow: the reserve is not drawn at frame 1; the card grows into it while a slot is open (setGrow)
  const tailH = Math.round((o.grow ? 0 : reserve) + spareRows * rowH + tailPx)
  const bodyH = nR * rowH + tailH
  const body = h('div', { class: 'ls-body', style: { top: bodyY + 'px', height: bodyH + 'px' } })
  card.append(body)
  css(card, { height: bodyY + bodyH + 'px' })
  // the tail: un-numbered sheet (the gutter strip, no gridlines) that a tooltip slot opens into
  const tailEl = tailH > 0 || o.grow ? h('div', { class: 'ls-tail', style: { top: nR * rowH + 'px', height: tailH + 'px', backgroundImage: `linear-gradient(90deg, ${C.head} ${gutter - 2}px, ${C.grid} ${gutter - 2}px, ${C.grid} ${gutter}px, ${C.sheet} ${gutter}px)` } }) : null
  if (tailEl) body.append(tailEl)

  const rowEls = [], numEls = [], cells = []
  for (let r = 0; r < nR; r++) {
    const num = h('div', { class: 'ls-rn', 'data-deco': '', text: String((o.startRow ?? 2) + r), style: { width: gutter + 'px', height: rowH + 'px' } })
    const row = h('div', { class: 'ls-row', style: { top: r * rowH + 'px', height: rowH + 'px' } }, num)
    const rc = []
    for (let j = 0; j < nC; j++) {
      const v = h('span', { class: 'ls-v' })
      const cell = h('div', { class: `ls-cell ${kindOf(j)} ${alignOf(j)}`, style: { left: colX[j] + 'px', width: colW[j] + 'px', height: rowH + 'px', fontSize: cellPx(j, fs) + 'px', ...(pad !== G.padX || padR(j) !== pad ? { padding: `0 ${padR(j)}px 0 ${pad}px` } : {}) } }, v)
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
    el: card, body, over, sel, x: X, y: Y, w: W, h: bodyY + bodyH, bottom: Y + bodyY + bodyH,
    /** the card's lowest edge once fully grown (bottom + reserve when grow is on) */
    maxBottom: Y + bodyY + bodyH + (o.grow ? Math.round(reserve) : 0),
    /** grow mode: the card is px taller this frame (a slot is open); returns px (move what sits under the card) */
    setGrow(px) {
      const g = Math.max(0, Math.round(px))
      css(card, { height: bodyY + bodyH + g + 'px' }); css(body, { height: bodyH + g + 'px' })
      if (tailEl) css(tailEl, { height: tailH + g + 'px' })
      return g
    },
    rowH, fs, nR, spare: 0, tail: tailH, cols: colX.slice(0, nC).map((cx, j) => ({ x: X + cx, w: colW[j], kind: kindOf(j), align: alignOf(j), pad, padR: padR(j) })),
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
      const str = text == null ? '' : String(text)
      // one content path per call; the other setter's cache is cleared so switching paths never goes stale
      if (html != null) { v.__t = undefined; setHTML(v, html) }
      else if (cols[c].units) { v.__t = undefined; setHTML(v, cellHTML(c, str)) }
      else { v.__h = undefined; setText(v, str) }
      // tabular figures for numbers only (Inter's tnum also spaces out a word's hyphens)
      el.classList.toggle('words', html == null && !!str && !isNumeric(str))
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
    hiRow(r, a, wipe = 1, color = C.rowHi) {
      if (a <= 0.001 || wipe <= 0.001) { css(rowEls[r], { backgroundColor: C.sheet, backgroundImage: 'none' }); return }
      if (wipe >= 1) { css(rowEls[r], { backgroundColor: rgba(color, a), backgroundImage: 'none' }); return }
      const x = (wipe * 100).toFixed(2)
      css(rowEls[r], { backgroundColor: C.sheet, backgroundImage: `linear-gradient(90deg, ${rgba(color, a)} ${x}%, ${C.sheet} ${x}%)` })
    },
    /** the selection outline: rect in stage px, or null to hide. handle: show the fill handle */
    select(rect, { handle = true, alpha = 1 } = {}) {
      if (!rect || alpha <= 0.001) { css(sel, { opacity: '0' }); return }
      // whole pixels: the outline's anti-aliased corners rasterise the same however the frame was reached
      // (a spring that overshoots past a small target never turns the box inside out: at least 8 px each way)
      const x0 = Math.round(rect.x0 - X), y0 = Math.round(rect.y0 - stageY)
      css(sel, {
        opacity: String(alpha), left: x0 + 'px', top: y0 + 'px',
        width: Math.max(8, Math.round(rect.x1 - X) - x0) + 'px', height: Math.max(8, Math.round(rect.y1 - stageY) - y0) + 'px',
      })
      // the fill handle sits on the outline's bottom-right corner, straddling the bottom gridline (below the
      // values' baseline, so it never reads as a full stop); at the card's right edge it tucks inside horizontally,
      // and at the body's bottom edge vertically
      const edge = rect.x1 > X + W - 10
      const floor = rect.y1 > stageY + parseFloat(body.style.height) - 10
      css(sel.firstChild, { opacity: handle ? '1' : '0', right: edge ? '3px' : '-9px', bottom: floor ? '3px' : '-9px' })
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
 * One type size for a set of tooltip labels (raw markup strings): one line from S.tip down to 40 px; else two
 * lines broken at the best seam (twoLines), at the largest size where every label fits. maxW: the widest a pill may
 * be (stage px). Returns { px, lines, slotH, labels: [markup with "\n"], html: [...], w: [pill width per label] }.
 */
export function fitTips(labels, maxW) {
  const PAD = 2 * 26 + 6
  const inner = maxW - PAD
  const wOf = (str, px) => textW(mk(str), font(800, px), { letterSpacing: '-0.01em' })
  const strs = labels.map(x => String(x || ''))
  const out = (px, lines, ls, wrap = false) => ({
    px, lines, wrap, labels: ls, html: ls.map(mk),
    slotH: Math.round(lines * px * 1.12 + 30),
    w: ls.map(x => Math.min(maxW, Math.ceil(Math.max(...x.split('\n').map(l => wOf(l, px)))) + PAD)),
  })
  if (!strs.length) return out(S.tip, 1, [])
  for (let px = S.tip; px >= S.cellMin; px -= 2) if (strs.every(x => wOf(x, px) <= inner)) return out(px, 1, strs)
  for (let px = S.tip; px >= S.cellMin; px -= 2) {
    const two = strs.map(x => (wOf(x, px) <= inner ? x : twoLines(x, y => wOf(y, px), inner)))
    if (two.every(Boolean)) return out(px, 2, two)
  }
  // no seam gives two lines: the label wraps (balanced) at the pill's inner width, and the slot is sized to the
  // real line count, so no line is ever cut by the pill (a label over ~70 characters is too long for a tooltip)
  const px = S.cellMin
  const linesOf = str => {
    const el = h('div', { class: 'ls-tiptxt', html: mk(str), style: { position: 'absolute', left: '-6000px', top: '0px', width: inner + 'px', fontSize: px + 'px', whiteSpace: 'normal', textWrapStyle: 'balance', visibility: 'hidden' } })
    ;(document.getElementById('stage') || document.body).append(el)
    const n = Math.max(1, Math.round(el.offsetHeight / (px * 1.12)))
    el.remove()
    return n
  }
  const lines = Math.max(2, ...strs.map(linesOf))
  const long = strs.filter(x => plain(x).length > 70)
  if (long.length) console.warn(`live-sheet: tooltip label over 70 characters (${lines} lines at 40 px): "${plain(long[0]).slice(0, 60)}…"`)
  return { ...out(px, lines, strs, true), w: strs.map(() => maxW) } // wraps wherever it must, never past the pill
}

/** a tooltip's choreography: the slot opens (rows below make room), then the pill wipes out of its notch; reversed to close */
export function tipWindow(openAt, closeAt) {
  const ok = closeAt - openAt > 0.45
  return {
    ok, openAt, closeAt,
    open: t => (ok ? ease.inOut(prog(t, openAt, 0.3)) * (1 - ease.inOut(prog(t, closeAt + 0.06, 0.24))) : 0),
    reveal: t => (ok ? ease.out(prog(t, openAt + 0.26, 0.24)) * (1 - ease.inOut(prog(t, closeAt - 0.22, 0.22))) : 0),
  }
}

/**
 * Tooltip strip: a dark pill with a notch pointing up at a cell, in a sheet's overlay layer, with a slot (an
 * un-numbered sheet row) that opens under the row. The label is written once (html), at full size and full
 * opacity: the pill reveals it by wiping out of its notch (its width grows both ways), so it never flashes empty.
 * set({ x0, x1, y, ht, open, reveal, notchX }) in stage px: open 0..1 opens the slot (shift the rows below by
 * ht × open yourself), reveal 0..1 wipes the pill. Hidden, everything parks at one fixed state.
 */
export function tipStrip(sh, { px = S.tip, html = '', wrap = false } = {}) {
  const txt = h('div', { class: 'ls-tiptxt', html, style: { fontSize: px + 'px', ...(wrap ? { whiteSpace: 'normal', textWrapStyle: 'balance' } : {}) } })
  const inner = h('div', { class: 'ls-tipin' }, txt)
  const el = h('div', { class: 'ls-tip', 'data-roll': '' }, inner)
  const notch = h('i', { class: 'ls-notch' })
  // the slot the strip opens: an un-numbered sheet row (gutter kept, no cell lines)
  const slot = h('div', { class: 'ls-slot', style: { width: sh.w + 'px', backgroundImage: `linear-gradient(90deg, ${C.head} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter - 2}px, ${C.grid} ${sh.gutter}px, ${C.sheet} ${sh.gutter}px)` } })
  sh.over.append(slot, notch, el)
  const ox = sh.x, oy = sh.bodyTop
  const PARK = { opacity: '0', left: '0px', top: '0px', width: '0px', height: '0px' }
  return {
    el, txt, notch, slot,
    set({ x0, x1, y, ht, open = 1, reveal = 1, notchX, html: hh }) {
      if (hh != null) setHTML(txt, hh)
      const pad = 8
      const so = open > 0.001
      css(slot, so ? { opacity: '1', top: (y - oy).toFixed(1) + 'px', height: Math.max(0, ht * open).toFixed(1) + 'px' } : { opacity: '0', top: '0px', height: '0px' })
      const fullH = Math.round(ht - 2 * pad)
      const room = ht * open - 2 * pad // the pill never outgrows the open slot
      const r = clamp(reveal)
      if (!so || r <= 0.001 || room < 8) {
        css(el, PARK); css(inner, { left: '0px', width: '0px', height: '0px' }); css(notch, { opacity: '0', left: '0px', top: '0px' })
        return
      }
      const nx = clamp(notchX, x0 + 30, x1 - 30)
      const l = Math.round(Math.max(x0, nx - 20 - (nx - 20 - x0) * r)), rr = Math.round(Math.min(x1, nx + 20 + (x1 - nx - 20) * r))
      css(el, { opacity: '1', left: l - ox + 'px', top: Math.round(y - oy + pad) + 'px', width: rr - l + 'px', height: Math.round(Math.min(fullH, room)) + 'px' })
      css(inner, { left: Math.round(x0) - l + 'px', width: Math.round(x1 - x0) + 'px', height: fullH + 'px' })
      css(notch, { opacity: '1', left: Math.round(nx - 11 - ox) + 'px', top: Math.round(y - oy + pad - 9) + 'px' })
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
 * opts: x, y, w, ht (card box, stage px); pad { l, r, t, b }; xr [from, to]; xEvery (tick step) or xTicks ([x…]); xFmt(v);
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
  const xTicks = o.xTicks || (() => { const v = []; for (let x = Math.ceil(xr[0] / xEvery) * xEvery; x <= xr[1] + 1e-9; x += xEvery) v.push(x); return v })()
  for (const v of xTicks) {
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
        // an unused grid line parks at one fixed state (a hidden frame never depends on the frame before)
        if (v == null || v === yMin) { attr(l, 'opacity', 0); for (const a of ['x1', 'x2', 'y1', 'y2']) attr(l, a, 0); setText(yLabels[k], ''); css(yLabels[k], { opacity: '0', top: '0px', width: '0px' }); return }
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
