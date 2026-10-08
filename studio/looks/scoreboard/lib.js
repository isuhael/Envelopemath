// Scoreboard look: shared components. Formats build their stage content from these; the chrome (brand mark,
// bars, header, footer, captions, verdict) is built by chrome() below and wired in kit.js.
//
// Rules every component follows:
//   - build DOM once (at mount); seek(t) only mutates through css()/setText()/setHTML()/attr() (cached setters)
//   - seek(t) is a pure function of t (no state carried between calls except value-keyed caches)
//   - numbers shown as text come from spec display strings; running counters interpolate and land on them exactly
import { h, s, css, setText, setHTML, attr, markup, fitText, captionAt, prog, ease, clamp, lerp, rng, fmtNum } from '../../runtime/core.js'
import { C, F, SIZE, M, TONE, W, H, CX, FOOT, layoutFor, footerPlan, measureText } from './theme.js'

export { layoutFor, footerPlan, measureText }

// =====================================================================================================
// text
// =====================================================================================================

/** escape a plain string for innerHTML */
export const esc = (str = '') => String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/**
 * Anton has no ≈ or → glyph, and its × ÷ + − are tiny (about 30% of the cap height), so a one-line working read as
 * "$10,000 · 65.35%" on a phone. Wrap them so they render in Inter Full ExtraBold, lifted to Anton's optical centre:
 * ≈ → as .ax, the operators as .axo. Both never drop under 40 px (or the parent's size, if that is smaller).
 */
export const ax = html => String(html).replace(/[≈→]/g, '<span class="ax">$&</span>').replace(/[×÷+−]/g, '<span class="axo">$&</span>')

/** keep hyphenated words on one line ("SIT-DOWN" never breaks at the hyphen) */
export const keepHyphens = html => String(html).replace(/(^|[\s>])([^\s<>]+-[^\s<>]+)/g, '$1<span class="nb">$2</span>')

/**
 * Line-break hygiene for markup HTML (before ax/keepHyphens):
 *   - "≈ " and "→ " are glued to the token after them with a no-break space, so the honesty mark never ends a line
 *     away from its number ("SAME $5,000. ≈ / $11,800" can't happen)
 *   - a short emphasis run (3 words or fewer, 24 characters or fewer) never breaks inside ("≈ 1.2 / MILLION" can't
 *     happen, and a wrapped <em> box never spans two lines)
 */
export const bindMarks = html => String(html)
  .replace(/([≈→]) (?=\S)/g, '$1 ')
  .replace(/<(em|u class="mark2")>([^<]*)<\/(em|u)>/g, (m, open, body, close) => {
    const words = body.replace(/ /g, ' ').trim().split(/\s+/).filter(Boolean)
    if (words.length > 3 || body.length > 24) return m
    return `<${open === 'em' ? 'em class="nb"' : 'u class="mark2 nb"'}>${body}</${close}>`
  })

/** spec markup (**em**, __mark2__, \n) → HTML for an Anton context */
export const rich = str => keepHyphens(ax(bindMarks(markup(str))))

/** spec markup → HTML for an Inter context (no glyph patch needed) */
export const richUI = str => bindMarks(markup(str))

/**
 * a display string as Anton HTML with every digit in a 0.5em slot (tabular, like the odometer: columns line up and
 * static numbers in a table never jitter against a counter). tight: a narrow space after "≈". ok: the glyph spans
 * carry data-overlap-ok (Inter Full's 1.21em font box can reach into a dense neighbour row; its ink never does).
 */
export function tabHTML(str, { tight = false, ok = false } = {}) {
  let html = ax(esc(str).replace(/\d/g, '<span class="sb-d">$&</span>'))
  if (tight) html = html.replace(/(<span class="ax">≈<\/span>) /g, '$1<span class="sb-sp"></span>')
  return ok ? html.replace(/<span class="(ax|axo)">/g, '<span class="$1" data-overlap-ok>') : html
}

/** rendered width of an element's text (not its box): for slam scales that must stay inside the safe zone */
export function inkWidth(el) {
  const r = document.createRange()
  r.selectNodeContents(el)
  return r.getBoundingClientRect().width
}

/** the largest slam start scale that keeps content of width w inside maxW (never above M.slamFrom) */
export const slamFromFor = (w, maxW, from = M.slamFrom) => clamp(maxW / Math.max(1, w), 1, from)

/**
 * slamFit(w, maxW, box, from) — slamFromFor, also capped vertically: box = { y0, y1, oy, top, bottom } in frame px
 * (the element's box, its transform-origin y, and the band it must stay inside at its biggest frame). A two-line
 * label slamming from 1.16 in the captions-off slot would otherwise poke under y 1480 on its first frame.
 */
export function slamFit(w, maxW, box, from = M.slamFrom) {
  let f = slamFromFor(w, maxW, from)
  if (box) {
    const { y0, y1, oy = (y0 + y1) / 2, top = -Infinity, bottom = Infinity } = box
    if (y1 > oy + 0.5) f = Math.min(f, (bottom - oy) / (y1 - oy))
    if (oy > y0 + 0.5) f = Math.min(f, (oy - top) / (oy - y0))
  }
  return Math.max(1, f)
}

/** tone → colour (good/goal green, bad red, neutral white) */
export const toneColor = tone => TONE[tone] || C.white

// a string with every ** and __ marker removed (for width estimates)
export const bare = str => String(str || '').replace(/\*\*|__/g, '')

// =====================================================================================================
// motion primitives (all pure functions of t)
// =====================================================================================================

/** damped wobble 0 → peak 1 (p ≈ 0.13) → small undershoot → 0 at p = 1 */
export function wobble(p) {
  if (p <= 0 || p >= 1) return 0
  return (Math.exp(-4.5 * p) * Math.sin(2.6 * Math.PI * p)) / 0.486
}

/** landing pulse: scale 1 → 1 + amp → slight undershoot → 1 over dur, starting at t0 */
export const bump = (t, t0, { dur = M.bump, amp = M.bumpAmp } = {}) => 1 + amp * wobble(prog(t, t0, dur))

/**
 * slam-in at t0: { o, s } — opacity ramps in over M.fade while the scale drops from `from` to 1 with a small
 * overshoot below 1 (it lands with weight). Before t0: o = 0. With t0 <= 0 the element is already landed at
 * frame 1 (no entrance on the thumbnail frame).
 */
export function slam(t, t0, { dur = M.slam, from = M.slamFrom } = {}) {
  if (t0 <= 0.001) return { o: 1, s: 1 }
  if (t < t0) return { o: 0, s: from }
  const p = prog(t, t0, dur)
  return { o: 0.6 + 0.4 * prog(t, t0, M.fade), s: from + (1 - from) * ease.back(p, 2.4) }
}

/** rise-in at t0: { o, y } — slides up `dist` px with ease.out (captions, small labels) */
export function rise(t, t0, { dur = 0.18, dist = 22 } = {}) {
  if (t0 <= 0.001) return { o: 1, y: 0 }
  if (t < t0) return { o: 0, y: dist }
  const p = prog(t, t0, dur)
  return { o: prog(t, t0, dur * 0.6), y: dist * (1 - ease.out(p)) }
}

/** inverse of ease.out (cubic): the progress p at which ease.out(p) = u */
export const invEaseOut = u => 1 - Math.cbrt(1 - clamp(u))

// =====================================================================================================
// numbers
// =====================================================================================================

/**
 * Parse a display string into a counter template.
 *   "≈ $185,500" → { prefix: '≈ $', value: 185500, dp: 0, group: true, suffix: '', scale: 1 }
 *   "$4.8M"      → { prefix: '$', value: 4.8, dp: 1, suffix: 'M', scale: 1e6 }
 *   "60 months"  → { prefix: '', value: 60, suffix: ' months' }
 * `value * scale` is the numeric the display stands for. A string without digits gives value NaN.
 */
export function parseDisplay(str = '') {
  str = String(str)
  const m = /(\d[\d,]*)(\.(\d+))?/.exec(str)
  if (!m) return { prefix: str, suffix: '', value: NaN, dp: 0, group: false, scale: 1, text: str }
  const intPart = m[1].replace(/,/g, '')
  const dp = m[3] ? m[3].length : 0
  const suffix = str.slice(m.index + m[0].length)
  const cm = /^([KMBT])(?![a-z])/.exec(suffix)
  return {
    prefix: str.slice(0, m.index), suffix, dp,
    value: parseFloat(intPart + (dp ? '.' + m[3] : '')),
    group: m[1].includes(',') || intPart.length < 4,
    scale: cm ? { K: 1e3, M: 1e6, B: 1e9, T: 1e12 }[cm[1]] : 1,
    text: str,
  }
}

/** the numeric a display string stands for ("≈ $1.2M" → 1200000) */
export const displayValue = str => { const p = parseDisplay(str); return p.value * p.scale }

/** format a running value with a display template (same prefix/suffix/dp/grouping); for text counters */
export function formatLike(v, tpl) {
  const x = Math.max(0, v / tpl.scale)
  let body = x.toFixed(tpl.dp)
  if (tpl.group) { const [i, f] = body.split('.'); body = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? '.' + f : '') }
  return tpl.prefix + body + tpl.suffix
}

/**
 * A running text counter that lands exactly on `final` (a display string) at p = 1.
 * from/to are numerics; tpl defaults to parseDisplay(final).
 */
export function counterText(p, from, final, tpl = parseDisplay(final)) {
  if (p >= 1) return final
  return formatLike(lerp(from, tpl.value * tpl.scale, p), tpl)
}

// =====================================================================================================
// odometer: rolling digit columns in fixed-width slots (Anton digits are proportional; slots stop jitter)
// =====================================================================================================

// prefix/suffix of a counter: Anton glyph patch, and narrower word spaces ("≈ 10,000" stays one unit)
const fixHTML = str => ax(esc(str).replace(/ /g, '\u0001')).replace(/\u0001/g, '<span class="sp"> </span>')

/**
 * odometer(parent, { size, color, maxInt = 10, maxDp = 2, cls })
 *   .set(v, tpl, ghost)  show numeric v with template tpl (from parseDisplay); columns roll mechanically. ghost:
 *                    a "≈" in the prefix is an unlit ghost (a running count is not yet the rounded answer)
 *   .show(display)   land exactly on a display string
 *   .el              the root (inline-flex). Columns carry data-roll (clipped on purpose).
 * At an integer position every column shows exactly one digit, so a landed value reads exactly as the display.
 */
export function odometer(parent, { size = SIZE.hero, color = C.green, maxInt = 10, maxDp = 2, cls = '' } = {}) {
  // ghost: a "≈" in the prefix shows as an unlit ghost (decoration) while the count is still running
  const ghostHTML = html => html.replace('<span class="ax">≈</span>', '<span class="ax sb-ghost" data-deco>≈</span>')
  const root = h('div', { class: 'sb-odo ' + cls, style: { fontSize: size + 'px', color } })
  const pre = h('span', { class: 'sb-odo-fix' })
  const suf = h('span', { class: 'sb-odo-fix' })
  const dot = h('span', { class: 'sb-odo-sep' }, '.')
  const cols = new Map(), seps = new Map()
  root.append(pre)
  for (let k = maxInt - 1; k >= -maxDp; k--) {
    if (k === -1) root.append(dot)
    const strip = h('span', { class: 'sb-odo-strip' }, '0\n1\n2\n3\n4\n5\n6\n7\n8\n9\n0')
    const col = h('span', { class: 'sb-odo-col', 'data-roll': '' }, strip)
    root.append(col)
    cols.set(k, { col, strip })
    if (k > 0 && k % 3 === 0) { const sp = h('span', { class: 'sb-odo-sep' }, ','); root.append(sp); seps.set(k, sp) }
  }
  root.append(suf)
  if (parent) parent.append(root)

  function set(v, tpl, ghost = false) {
    const dp = Math.min(tpl.dp, maxDp)
    const x = Math.max(0, (v || 0) / tpl.scale)
    const V = x * Math.pow(10, dp)
    const n = Math.min(maxInt, Math.max(1, String(Math.floor(x + 1e-9)).length))
    setHTML(pre, ghost ? ghostHTML(fixHTML(tpl.prefix)) : fixHTML(tpl.prefix))
    setHTML(suf, fixHTML(tpl.suffix))
    css(dot, { display: dp > 0 ? 'inline-block' : 'none' })
    for (const [k, sp] of seps) css(sp, { display: tpl.group && n > k ? 'inline-block' : 'none' })
    for (const [k, { col, strip }] of cols) {
      const on = k < n && k >= -dp
      css(col, { display: on ? 'inline-block' : 'none' })
      if (!on) continue
      const j = k + dp
      let pos
      if (j === 0) {
        const f = V - Math.floor(V)
        pos = (Math.floor(V) % 10) + ease.inOut(f)
      } else {
        const unit = Math.pow(10, j)
        const q = Math.floor(V / unit + 1e-9) % 10
        const lower = V - Math.floor(V / unit + 1e-9) * unit
        pos = q + (lower > unit - 1 ? ease.inOut(lower - (unit - 1)) : 0)
      }
      css(strip, { transform: `translateY(${(-Math.round(pos * 1000) / 1000)}em)` })
    }
  }
  function show(display) { const tpl = parseDisplay(display); set(tpl.value * tpl.scale, tpl) }
  return { el: root, set, show }
}

// =====================================================================================================
// unit icons (flat, chunky; light body + one green accent band), 100 x 100 design box
// =====================================================================================================

const rr = (x, y, w, hh, r) => `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + hh - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + hh}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + hh - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`
const circ = (cx, cy, r) => `M${cx - r} ${cy}A${r} ${r} 0 1 0 ${cx + r} ${cy}A${r} ${r} 0 1 0 ${cx - r} ${cy}Z`
const B = C.iconBody, S2 = C.iconShade, D = C.iconDark, G = C.green

/** part: { d, fill } or { d, stroke, w } */
export const ICONS = {
  cup: [
    { d: 'M34 7H66L69 16H31Z', fill: S2 },
    { d: rr(22, 14, 56, 12, 4), fill: S2 },
    { d: 'M26 26H74L67.5 90Q67 95 62 95H38Q33 95 32.5 90Z', fill: B },
    { d: 'M27.8 45H72.2L70.4 66H29.6Z', fill: G },
  ],
  hotdog: [
    { d: rr(13, 30, 74, 26, 13), fill: S2 },
    { d: rr(2, 37, 96, 22, 11), fill: '#7D8796' },
    { d: 'M18 46L25 41L32 46L39 41L46 46L53 41L60 46L67 41L74 46L81 41', stroke: G, w: 5 },
    { d: rr(13, 51, 74, 30, 15), fill: B },
  ],
  burger: [
    { d: 'M12 44Q12 12 50 12Q88 12 88 44Z', fill: B },
    { d: rr(36, 22, 6, 4, 2) + rr(56, 20, 6, 4, 2) + rr(46, 30, 6, 4, 2) + rr(26, 32, 6, 4, 2) + rr(66, 31, 6, 4, 2), fill: S2 },
    { d: 'M8 44H92V50Q87 57 81 50Q75 57 69 50Q63 57 57 50Q51 57 45 50Q39 57 33 50Q27 57 21 50Q15 57 8 50Z', fill: G },
    { d: rr(9, 54, 82, 16, 8), fill: '#5B6573' },
    { d: rr(12, 72, 76, 16, 8), fill: B },
  ],
  pizza: [
    { d: 'M14 25Q50 13 86 25L50 95Z', fill: B },
    { d: 'M8 16Q50 2 92 16L88 28Q50 14 12 28Z', fill: S2 },
    { d: circ(40, 37, 7) + circ(61, 42, 6.5) + circ(49, 62, 6), fill: G },
  ],
  phone: [
    { d: rr(25, 5, 50, 90, 10), fill: B },
    { d: rr(30, 13, 40, 68, 5), fill: D },
    { d: rr(35, 60, 7, 14, 2) + rr(46, 50, 7, 24, 2) + rr(57, 37, 7, 37, 2), fill: G },
    { d: rr(42, 85, 16, 4, 2), fill: S2 },
  ],
  car: [
    { d: 'M5 62Q5 51 16 49L28 47L38 33Q41 29 47 29H66Q72 29 76 34L85 47Q95 49 95 60V68Q95 73 90 73H10Q5 73 5 68Z', fill: B },
    { d: 'M41 36Q43 34 46 34H55V47H33Z', fill: D },
    { d: 'M59 34H65Q69 34 72 38L79 47H59Z', fill: D },
    { d: rr(7, 55, 86, 7, 3), fill: G },
    { d: circ(27, 73, 12) + circ(73, 73, 12), fill: D },
    { d: circ(27, 73, 5) + circ(73, 73, 5), fill: S2 },
  ],
  house: [
    { d: rr(66, 14, 11, 24, 2), fill: S2 },
    { d: 'M6 48L50 10L94 48Z', fill: S2 },
    { d: rr(17, 45, 66, 47, 3), fill: B },
    { d: rr(42, 62, 16, 30, 3), fill: G },
    { d: rr(23, 55, 13, 13, 2) + rr(64, 55, 13, 13, 2), fill: D },
  ],
  coin: [
    { d: circ(50, 50, 44), fill: S2 },
    { d: circ(50, 50, 36), fill: B },
    { d: 'M61 37Q57 31 50 31Q40 31 40 40Q40 48 50 50Q60 52 60 60Q60 69 50 69Q42 69 38 63M50 23V77', stroke: G, w: 7 },
  ],
  bill: [
    { d: rr(4, 22, 92, 56, 7), fill: B },
    { d: rr(11, 29, 78, 42, 4), stroke: S2, w: 3 },
    { d: circ(50, 50, 14), fill: G },
    { d: circ(22, 50, 4) + circ(78, 50, 4), fill: S2 },
  ],
  gas: [
    { d: 'M62 68Q78 68 78 54V34', stroke: S2, w: 6 },
    { d: 'M71 18H85V38H76Z', fill: S2 },
    { d: rr(14, 12, 48, 80, 7), fill: B },
    { d: rr(21, 20, 34, 20, 3), fill: D },
    { d: rr(26, 26, 18, 7, 2), fill: G },
    { d: 'M14 52H62V62H14Z', fill: G },
    { d: rr(8, 86, 60, 9, 3), fill: S2 },
  ],
  ticket: [
    { d: 'M8 30Q8 25 13 25H87Q92 25 92 30V42A8 8 0 0 0 92 58V70Q92 75 87 75H13Q8 75 8 70V58A8 8 0 0 0 8 42Z', fill: B },
    { d: rr(66, 30, 4, 6, 2) + rr(66, 41, 4, 6, 2) + rr(66, 52, 4, 6, 2) + rr(66, 63, 4, 6, 2), fill: S2 },
    { d: rr(18, 39, 38, 9, 3), fill: G },
    { d: rr(18, 53, 26, 7, 3), fill: S2 },
  ],
  bag: [
    { d: 'M36 34V27Q36 12 50 12Q64 12 64 27V34', stroke: S2, w: 6 },
    { d: 'M18 30H82L88 89Q88 95 82 95H18Q12 95 12 89Z', fill: B },
    { d: 'M16 49H84L85.3 62H14.7Z', fill: G },
  ],
  egg: [
    { d: 'M50 6C71 6 85 37 85 59C85 81 69 95 50 95C31 95 15 81 15 59C15 37 29 6 50 6Z', fill: B },
    { d: 'M72 30C80 42 84 52 84 60C84 80 69 93 51 93C67 87 77 74 77 58C77 47 75 38 72 30Z', fill: S2 },
    { d: rr(30, 30, 8, 16, 4), fill: '#FFFFFF' },
  ],
  hour: [
    { d: circ(50, 50, 44), fill: S2 },
    { d: circ(50, 50, 38), fill: B },
    { d: 'M50 50L50 16A34 34 0 0 1 67 20.55Z', fill: G },
    { d: 'M50 50V27M50 50L66 59', stroke: D, w: 6.5 },
    { d: circ(50, 50, 5), fill: D },
  ],
  token: [
    { d: circ(50, 50, 44), fill: B },
    { d: circ(50, 50, 35), fill: D },
    { d: 'M31 43Q40.5 33 50 43Q59.5 53 69 43M31 61Q40.5 51 50 61Q59.5 71 69 61', stroke: G, w: 7 },
  ],
}
export const ICON_NAMES = Object.keys(ICONS)
export const iconName = name => (ICONS[name] ? name : 'token')

/** inline SVG of a unit icon (DOM use: hero row, legends, panels). Decoration (data-deco). */
export function iconSVG(name, size = 100, { cls = '' } = {}) {
  const parts = ICONS[iconName(name)]
  return s('svg', { class: 'sb-icon ' + cls, viewBox: '0 0 100 100', width: size, height: size, 'data-deco': '' },
    ...parts.map(p => p.stroke
      ? s('path', { d: p.d, fill: 'none', stroke: p.stroke, 'stroke-width': p.w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
      : s('path', { d: p.d, fill: p.fill })))
}

const PATHS = new Map()
function drawIcon(g, name, size) {
  const key = iconName(name)
  if (!PATHS.has(key)) PATHS.set(key, ICONS[key].map(p => ({ ...p, path: new Path2D(p.d) })))
  g.save()
  g.scale(size / 100, size / 100)
  for (const p of PATHS.get(key)) {
    if (p.stroke) { g.lineWidth = p.w; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = p.stroke; g.stroke(p.path) }
    else { g.fillStyle = p.fill; g.fill(p.path) }
  }
  g.restore()
}

const SPRITES = new Map()
const MIPS = [256, 128, 64, 32, 16, 8]
/** pre-rendered icon at the mip level just above `size` (fast drawImage for piles) */
export function iconSprite(name, size) {
  let lvl = MIPS[0]
  for (const m of MIPS) if (m >= size) lvl = m
  const key = iconName(name) + '@' + lvl
  if (!SPRITES.has(key)) {
    const cv = document.createElement('canvas')
    cv.width = cv.height = lvl
    const g = cv.getContext('2d')
    drawIcon(g, name, lvl)
    SPRITES.set(key, cv)
  }
  return SPRITES.get(key)
}

// =====================================================================================================
// unit stack: a pile of icons on a canvas that grows from the bottom centre, re-packs denser as the count
// climbs, and fills the box edge to edge at the climax. Icons drop with weight and squash on landing.
// =====================================================================================================

/**
 * unitStack(parent, { box: {x, y, w, h}, icon, maxCell = 150, minCell = 5, gap = 0.12, seed = 11, dot = green })
 *   .plan([{ t, n, roll, delay = M.regrid, occ = 0.62, max }, ...])   targets in time order. n may be fractional
 *        (the last icon fills partly: a ghost with the filled share solid). occ = share of the box the pile covers
 *        (1 = edge to edge, use it for the climax). max = this step's largest cell (e.g. a big hero icon for a lone
 *        unit). Step k: at t the pile re-packs into the new cells (M.regrid, ease.inOut), new icons land from
 *        t + delay to t + delay + roll on an ease.out schedule: the same curve a counter uses, so a counter
 *        driven by ease.out(progressAt(t).p) stays in sync with the pile.
 *   .progressAt(t)   { k, p }: the active step and its raw landing progress 0..1 (apply ease.out for counts)
 *   .seek(t)         draw the frame
 *   .layout(n, occ, max)   the packing a count would get ({ sz, cols, rows, count, cap, pos })
 * Big cells draw the icon (drop from above the box, squash on landing); cells under ~12 px turn into LED dots
 * (`dot` colour) so the climax reads as a lit scoreboard wall. Past capacity (minCell) the pile stays full.
 */
export function unitStack(parent, { box, icon = 'token', maxCell = 150, minCell = 5, gap = 0.12, seed = 11, dot = C.green } = {}) {
  const cv = h('canvas', { class: 'sb-stack', 'data-deco': '', width: box.w, height: box.h,
    style: { left: box.x + 'px', top: box.y + 'px', width: box.w + 'px', height: box.h + 'px' } })
  parent.append(cv)
  const g = cv.getContext('2d')
  g.imageSmoothingEnabled = true
  g.imageSmoothingQuality = 'high'
  let steps = []
  const MICRO_HI = 14, MICRO_LO = 10

  function layout(n, occ = 0.62, max = maxCell) {
    const want = Math.max(1, Math.ceil(n - 1e-9))
    let sz = clamp(Math.sqrt((box.w * box.h * occ) / want), minCell, max)
    let cols = Math.max(1, Math.floor(box.w / sz)), rows = Math.max(1, Math.floor(box.h / sz))
    while (cols * rows < want && sz > minCell) {
      sz = Math.max(minCell, sz * 0.97)
      cols = Math.max(1, Math.floor(box.w / sz)); rows = Math.max(1, Math.floor(box.h / sz))
    }
    const r = rng(seed + cols * 7 + rows)
    const cells = []
    const ox = (box.w - cols * sz) / 2
    for (let row = 0; row < rows; row++) for (let c = 0; c < cols; c++) {
      const cx = ox + (c + 0.5) * sz - box.w / 2, cy = (row + 0.5) * sz
      const nx = cx / (box.w / 2), ny = cy / box.h
      cells.push({ c, row, d: Math.sqrt(nx * nx * 0.8 + ny * ny) + (r() - 0.5) * 0.05 })
    }
    cells.sort((a, b) => a.d - b.d)
    const count = Math.min(cells.length, want)
    const used = cells.slice(0, count)
    // centre each row's used cells horizontally (a lone icon sits dead centre)
    const span = new Map()
    for (const u of used) { const sp = span.get(u.row) || [1e9, -1e9]; sp[0] = Math.min(sp[0], u.c); sp[1] = Math.max(sp[1], u.c); span.set(u.row, sp) }
    const pos = new Float32Array(count * 2)
    used.forEach((u, i) => {
      const sp = span.get(u.row)
      const shift = ((cols - 1) / 2 - (sp[0] + sp[1]) / 2) * sz
      pos[i * 2] = ox + u.c * sz + shift
      pos[i * 2 + 1] = box.h - (u.row + 1) * sz
    })
    return { sz, cols, rows, count, pos, cap: cols * rows }
  }

  function plan(list) {
    steps = []
    let prev = null
    for (const st of list) {
      const lay = layout(st.n, st.occ ?? 0.62, st.max ?? maxCell)
      const frac = Math.ceil(st.n - 1e-9) <= lay.cap ? st.n - Math.floor(st.n + 1e-9) : 0
      const step = { t: st.t, n: st.n, roll: Math.max(0.05, st.roll ?? 1), delay: st.delay ?? (prev ? M.regrid : 0), lay, frac, prev }
      step.prevCount = prev ? prev.lay.count : 0
      const add = lay.count - step.prevCount
      step.land = new Float32Array(Math.max(0, add))
      for (let j = 0; j < add; j++) step.land[j] = step.t + step.delay + step.roll * invEaseOut((j + 1) / add)
      steps.push(step)
      prev = step
    }
    return api
  }

  function active(t) {
    let k = -1
    for (let i = 0; i < steps.length; i++) if (t >= steps[i].t) k = i
    return k
  }

  function progressAt(t) {
    const k = active(t)
    if (k < 0) return { k, p: 0 }
    const st = steps[k]
    return { k, p: prog(t, st.t + st.delay, st.roll) }
  }

  // one unit, bottom-centre anchored at (cx, yb) in a cell of size `cell`
  function unit(cx, yb, cell, sx = 1, sy = 1, alpha = 1, frac = 1) {
    if (alpha <= 0.002) return
    const inner = cell * (1 - gap)
    const m = clamp((MICRO_HI - cell) / (MICRO_HI - MICRO_LO))
    if (m < 1) {
      const img = iconSprite(icon, inner)
      const w = inner * sx, hh = inner * sy, dx = cx - w / 2, dy = yb - hh
      const a = alpha * (1 - m)
      if (frac >= 1) { g.globalAlpha = a; g.drawImage(img, dx, dy, w, hh) }
      else {
        g.globalAlpha = 0.24 * a
        g.drawImage(img, dx, dy, w, hh)
        g.globalAlpha = a
        const cut = hh * frac, sh = img.height * frac
        g.drawImage(img, 0, img.height - sh, img.width, sh, dx, dy + hh - cut, w, cut)
      }
    }
    if (m > 0) {
      const d = Math.max(2, cell * 0.64)
      g.globalAlpha = alpha * m * (frac < 1 ? 0.3 + 0.7 * frac : 1)
      g.fillStyle = dot
      g.fillRect(cx - d / 2, yb - d - cell * 0.06, d, d)
    }
    g.globalAlpha = 1
  }

  function seek(t) {
    g.clearRect(0, 0, box.w, box.h)
    const k = active(t)
    if (k < 0) return
    const st = steps[k], lay = st.lay, prev = st.prev
    const rp = prev ? ease.inOut(prog(t, st.t, M.regrid)) : 1
    const keep = Math.min(st.prevCount, lay.count)
    // carried-over icons re-pack into this step's (smaller) cells: the pile "pulls back"
    if (prev) {
      const cell = lerp(prev.lay.sz, lay.sz, rp)
      for (let j = 0; j < keep; j++) {
        const x = lerp(prev.lay.pos[j * 2] + prev.lay.sz / 2, lay.pos[j * 2] + lay.sz / 2, rp)
        const yb = lerp(prev.lay.pos[j * 2 + 1] + prev.lay.sz, lay.pos[j * 2 + 1] + lay.sz, rp) - (cell * gap) / 2
        const partial = prev.frac > 0 && j === prev.lay.count - 1 ? prev.frac + (1 - prev.frac) * rp : 1
        unit(x, yb, cell, 1, 1, 1, partial)
      }
      // icons that no longer fit (a smaller count) fade out
      for (let j = lay.count; j < prev.lay.count; j++)
        unit(prev.lay.pos[j * 2] + prev.lay.sz / 2, prev.lay.pos[j * 2 + 1] + prev.lay.sz * (1 - gap / 2), prev.lay.sz, 1, 1, 1 - rp)
    }
    // new icons drop in: big ones from above the box with weight, small ones from just above their spot, fading in
    const cell = lay.sz
    const fallH = clamp(cell * 9, 110, box.h + cell)
    const squash = cell >= 18
    for (let j = st.prevCount; j < lay.count; j++) {
      const L = st.land[j - st.prevCount]
      const t0 = L - M.fall
      if (t < t0) continue
      const cx = lay.pos[j * 2] + cell / 2
      const yl = lay.pos[j * 2 + 1] + cell - (cell * gap) / 2
      let y = yl, sx = 1, sy = 1, a = 1
      if (t < L) {
        const p = prog(t, t0, M.fall)
        const top = yl - fallH
        y = lerp(top, yl, ease.in(p))
        if (top > -cell) a = clamp(p / 0.35)
        if (squash) { sy = 1.08; sx = 0.94 }
      } else if (squash && t < L + M.squash) {
        const w = wobble(prog(t, L, M.squash))
        sy = 1 - 0.16 * w; sx = 1 + 0.1 * w
      }
      const partial = st.frac > 0 && j === lay.count - 1 && t >= L ? st.frac : 1
      unit(cx, y, cell, sx, sy, a, partial)
    }
  }

  const api = { el: cv, plan, layout, progressAt, seek, steps: () => steps }
  return api
}

/**
 * stageFlash(parent, L) → { el, set(a) }: a green bloom rising from the stage floor (screen blend), for impacts.
 * Drive it with flashAt(t, t0, dur): 1 at the hit, easing out to 0. Decoration.
 */
export function stageFlash(parent, L) {
  const el = h('div', { class: 'sb-flash', 'data-deco': '', style: { top: L.stage.y + 'px', height: L.stage.h + 'px', mixBlendMode: 'screen' } })
  parent.append(el)
  return { el, set(a) { css(el, { opacity: clamp(a).toFixed(3) }) } }
}
/** impact envelope: 0 before t0, 1 at t0, eases out to 0 over dur */
export const flashAt = (t, t0, dur = 0.7) => (t < t0 ? 0 : 1 - ease.out(prog(t, t0, dur)))

/**
 * ladderPips(parent, { x, bottom, n, gap = 30, w = 30 }) → { el, seek(t, index, t0) }
 * A vertical ladder of n short bars (bottom = first rung) on the stage's left margin: passed rungs dim green, the
 * active one lit with a pop at t0, the rest dark. Makes the open loop countable from frame 1. Decoration.
 */
export function ladderPips(parent, { x = 78, bottom, n, gap = 30, w = 34 } = {}) {
  const el = h('div', { class: 'sb-pips', 'data-deco': '', style: { left: x + 'px', top: bottom - gap * n + 'px', width: w + 'px', height: gap * n + 'px' } })
  const bars = Array.from({ length: n }, (_, i) => {
    const b = h('i', { style: { bottom: i * gap + 'px', width: w + 'px' } })
    el.append(b)
    return b
  })
  parent.append(el)
  return {
    el,
    seek(t, index, t0 = 0) {
      bars.forEach((b, i) => {
        const state = i < index ? 'done' : i === index ? 'on' : 'off'
        attr(b, 'class', state)
        css(b, { transform: state === 'on' ? `scaleX(${bump(t, t0, { amp: 0.35, dur: 0.4 }).toFixed(3)})` : 'none' })
      })
    },
  }
}

// =====================================================================================================
// frame: bars, stage, brand mark
// =====================================================================================================

/** background layer: black top bar, dark gridded stage, black bottom bar (decoration). opts.grid = false hides the grid */
export function scaffold(L, { grid = true } = {}) {
  return h('div', { class: 'sb-bg', 'data-deco': '' },
    h('div', { class: 'sb-bar', style: { top: '0px', height: L.stage.y + 'px' } }),
    h('div', { class: 'sb-stage' + (grid ? '' : ' nogrid'), style: { top: L.stage.y + 'px', height: L.stage.h + 'px' } }),
    h('div', { class: 'sb-bar', style: { top: L.bottomBar.y0 + 'px', height: H - L.bottomBar.y0 + 'px' } }))
}

/** line-icon envelope (brand mark), stroke in money green */
export function envelopeSVG(size = 46, color = C.green) {
  return s('svg', { viewBox: '0 0 48 36', width: size, height: Math.round(size * 0.75), 'data-deco': '' },
    s('rect', { x: 2, y: 2, width: 44, height: 32, rx: 5, fill: 'none', stroke: color, 'stroke-width': 3.2 }),
    s('path', { d: 'M4 5L24 20L44 5', fill: 'none', stroke: color, 'stroke-width': 3.2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
}

/** brand mark: envelope outline + small wordmark, in the decoration zone (y < 230) */
export function brandMark(parent, L) {
  const el = h('div', { class: 'sb-brand', 'data-deco': '', style: { left: L.brand.x + 'px', top: L.brand.y + 'px' } },
    envelopeSVG(L.brand.size), h('span', { class: 'sb-brand-word' }, 'BACK OF THE ENVELOPE'))
  parent.append(el)
  return el
}

// =====================================================================================================
// header, footer, label stack, hero row, captions, verdict
// =====================================================================================================

/**
 * header(parent, spec, L, { text, upper = true }) → { el, inner }
 * Anton, uppercase, centred, bottom-aligned in the header band (so it sits on the hero counter), fitted to it
 * (72 px with captions off, 64 px in the compact captions-on bar; 46 px at worst). Lines break only where the spec
 * has \n. The header band holds the hook for the whole video: the verdict never lands here.
 */
export function header(parent, spec, L, { text = spec.header || '', upper = true } = {}) {
  const box = h('div', { class: 'sb-header', style: { left: L.header.x + 'px', top: L.header.y + 'px', width: L.header.w + 'px', height: L.header.h + 'px' } })
  const inner = h('div', { class: 'sb-header-text' + (upper ? '' : ' asis'), html: rich(text), style: { fontSize: (L.header.px || SIZE.header) + 'px' } })
  box.append(inner)
  parent.append(box)
  fitText(inner, L.header.w, { maxH: L.header.h, minPx: SIZE.headerMin })
  return { el: box, inner }
}

/** a footer text as HTML on its planned lines (footerPlan: one line at 40 px, or two broken at a " · ") */
export function footerHTML(text) {
  const plan = footerPlan(text)
  return { html: plan.lines.map(richUI).join('<br>'), px: plan.px, lines: plan.lines.length }
}

/**
 * footer(parent, spec, L, { text }) — the assumption line, last row of the top bar, visible from t = 0. One line at
 * 40 px, or two lines at 40 px broken at the " · " nearest the middle (layoutFor reserves the second row: L.footer.rows).
 */
export function footer(parent, spec, L, { text = spec.footer } = {}) {
  if (!text) return null
  const f = footerHTML(text)
  const el = h('div', { class: 'sb-footer', html: f.html, style: { top: L.footer.y + 'px', left: (W - L.footer.w) / 2 + 'px', width: L.footer.w + 'px', fontSize: f.px + 'px', lineHeight: FOOT.lh + 'px' } })
  parent.append(el)
  if (el.scrollWidth > L.footer.w + 0.5) fitText(el, L.footer.w, { minPx: 34, step: 1 })
  return el
}

/**
 * footerSteps(parent, spec, L) → { seek(t), els } | null
 * spec.footer plus lookOpts.footerSteps ([{ t, text }]: the footer rewrites to a one-line working at each t, a hard
 * cut with a 12 px rise). Kit-wide: the chrome draws it unless the format returns footer: false.
 */
export function footerSteps(parent, spec, L) {
  const steps = (spec.lookOpts && Array.isArray(spec.lookOpts.footerSteps) ? spec.lookOpts.footerSteps : [])
    .filter(x => x && x.text).map(x => ({ t: +x.t || 0, text: String(x.text) })).sort((a, b) => a.t - b.t)
  const base = spec.footer ? footer(parent, spec, L) : null
  if (!steps.length) return base ? { els: [base], seek() {} } : null
  for (const st of steps) { st.el = footer(parent, spec, L, { text: st.text }); css(st.el, { display: 'none' }) }
  const all = [base, ...steps.map(x => x.el)].filter(Boolean)
  return {
    els: all,
    steps,
    seek(t) {
      let cur = base, at = null
      for (const st of steps) if (t >= st.t) { cur = st.el; at = st }
      for (const el of all) css(el, { display: el === cur ? 'block' : 'none' })
      if (cur && at) { const r = rise(t, at.t, { dur: 0.16, dist: 12 }); css(cur, { opacity: String(r.o), transform: `translateY(${r.y.toFixed(1)}px)` }) }
    },
  }
}

/**
 * heroRow(parent, L, { icon, size, color, iconSize, gap = 12, maxInt, maxDp }) → { el, odo, icon, set(v, tpl, ghost), show(display) }
 * The top-bar scoreboard number: an optional unit icon + an odometer with a neon glow, centred as a group on x 540
 * in L.hero (size / iconSize default to L.hero.size / L.hero.icon: 168 / 116, or 140 / 100 with captions on).
 * Use hero.set / hero.show (not odo.set) so the icon tracks the number's width.
 * Scale `el` for bumps; set --glow (px) and --glowA (0..1) on `glow` for flares.
 * The glow filter lives on a fixed 960 x 168 box, so its raster region never goes stale when digits are added.
 */
export function heroRow(parent, L, { icon = null, size, color = C.green, iconSize, gap = 12, maxInt = 10, maxDp = 2 } = {}) {
  const hero = L.hero || { y: 444, h: 168, w: 960, size: SIZE.hero, icon: SIZE.heroIcon }
  size = size ?? hero.size ?? SIZE.hero
  iconSize = iconSize ?? hero.icon ?? SIZE.heroIcon
  const el = h('div', { class: 'sb-hero', style: { top: hero.y + 'px', height: hero.h + 'px', left: (W - hero.w) / 2 + 'px', width: hero.w + 'px' } })
  const space = icon ? iconSize + gap : 0
  const glow = h('div', { class: 'sb-hero-glow sb-glow', style: { paddingLeft: space + 'px' } })
  el.append(glow)
  const odo = odometer(glow, { size, color, maxInt, maxDp })
  const ic = icon ? iconSVG(icon, iconSize, { cls: 'sb-hero-icon' }) : null
  if (ic) { css(ic, { top: (hero.h - iconSize) / 2 + 'px' }); el.append(ic) }
  parent.append(el)
  const place = () => {
    if (ic) css(ic, { left: (hero.w / 2 - (odo.el.offsetWidth + space) / 2).toFixed(1) + 'px' })
  }
  return {
    el, odo, glow, icon: ic,
    set(v, tpl, ghost) { odo.set(v, tpl, ghost); place() },
    show(display) { odo.show(display); place() },
  }
}

/**
 * labelStack(parent, L, items, { yieldToVerdict = true }) → { el, groups, seek(t, index, t0) }
 * The bottom-bar label stack (HD Guy grammar): line 1 = Anton green (price / rate / working),
 * line 2 = Anton uppercase white (the rung). Sizes from L.type (62 / 96 px, or 54 / 72 px with captions on). One group per item, all built at mount; seek shows only the
 * active one with a hard cut + slam-in at t0. items: [{ l1: html, l2: html, l1Color?, l2Color? }]
 * (pass HTML: use rich() on spec strings). The container carries data-yield, so the verdict replaces it.
 */
export function labelStack(parent, L, items, { yieldToVerdict = true } = {}) {
  const T = L.type || { l1: SIZE.label1, l2: SIZE.label2, l2Min: SIZE.label2Min }
  const el = h('div', { class: 'sb-labels', style: { top: L.label.y + 'px', left: (W - L.label.w) / 2 + 'px', width: L.label.w + 'px', height: L.label.h + 'px' } })
  if (yieldToVerdict) el.setAttribute('data-yield', '')
  parent.append(el)
  const groups = items.map(it => {
    const l1 = h('div', { class: 'sb-l1', html: it.l1 || '', style: { color: it.l1Color || C.green, fontSize: T.l1 + 'px' } })
    const l2 = h('div', { class: 'sb-l2', html: it.l2 || '', style: { color: it.l2Color || C.white, fontSize: T.l2 + 'px' } })
    const grp = h('div', { class: 'sb-label' }, l1, l2)
    el.append(grp)
    fitText(l1, L.label.w, { minPx: Math.min(44, T.l1) })
    const l1h = it.l1 ? l1.offsetHeight + 6 : 0
    fitText(l2, L.label.w, { maxH: L.label.h - l1h, minPx: T.l2Min })
    // the slam stays inside x 140-940 and inside the slot (origin 50% 40%: a two-line rung must not poke past
    // L.limit on its first frame)
    const hh = grp.offsetHeight, y0 = L.label.y
    grp.__from = slamFit(Math.max(inkWidth(l1), inkWidth(l2)), L.label.w - 8, { y0, y1: y0 + hh, oy: y0 + 0.4 * hh, top: y0 - 12, bottom: L.limit })
    css(grp, { display: 'none' })
    return grp
  })
  function seek(t, index, t0 = 0) {
    groups.forEach((gr, i) => {
      if (i !== index) { css(gr, { display: 'none' }); return }
      const k = slam(t, t0, { from: gr.__from })
      css(gr, { display: 'flex', opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
    })
  }
  return { el, groups, seek }
}

function splitWords(text) {
  // parse **em** / __mark2__ across word boundaries into word tokens with flags
  const words = []
  let em = false, m2 = false, cur = '', curEm = false, curM2 = false
  const push = () => { if (cur) words.push({ w: cur, em: curEm, m2: curM2 }); cur = '' }
  for (let i = 0; i < text.length; i++) {
    if (text.startsWith('**', i)) { em = !em; i++; continue }
    if (text.startsWith('__', i)) { m2 = !m2; i++; continue }
    const ch = text[i]
    if (ch === ' ' || ch === '\n') { push(); continue }
    if (!cur) { curEm = em; curM2 = m2 }
    cur += ch
  }
  push()
  return words
}

/**
 * captions(parent, spec, L) → { seek(t) }
 * VO captions in the caption band (y 1320-1480), Inter Tight ExtraBold 50 px, centred in x 140-940, at most 2 lines.
 * A line rises in; words already spoken are white (emphasis green, __mark2__ red), words still to come are grey.
 * A VO line too long for 2 lines is split into pages that follow the spoken progress (never shrinks below 50 px).
 * Off when L.captionsOn is false.
 */
export function captions(parent, spec, L) {
  if (!L.captionsOn) return { seek() {} }
  const box = h('div', { class: 'sb-caps', style: { top: L.caption.y + 'px', left: (W - L.caption.w) / 2 + 'px', width: L.caption.w + 'px', height: L.caption.h + 'px' } })
  parent.append(box)
  const maxH = SIZE.caption * 1.14 * 2 + 4
  const lines = spec.vo.map(v => {
    const words = splitWords(v.text || '')
    const total = words.reduce((a, w) => a + w.w.length + 1, 0) || 1
    let acc = 0
    const pages = []
    let page = null
    const newPage = at => {
      if (page) css(page.el, { display: 'none' })   // measure each page alone at full width
      page = { el: h('div', { class: 'sb-cap' }), spans: [], at }
      box.append(page.el)
      pages.push(page)
    }
    // "≈" and "→" are glued to the word after them (a no-break space): the honesty mark never ends a line or a page
    const glue = w => /^[≈→]$/.test(w)
    words.forEach((w, wi) => {
      const at = acc / total
      acc += w.w.length + 1
      const sp = h('span', { class: 'w' + (w.em ? ' em' : '') + (w.m2 ? ' m2' : '') })
      sp.innerHTML = esc(w.w)
      if (!page) newPage(at)
      const prevGlue = wi > 0 && glue(words[wi - 1].w)
      if (page.spans.length) page.el.append(prevGlue ? ' ' : ' ')
      page.el.append(sp)
      if (page.spans.length && page.el.scrollHeight > maxH) {
        sp.remove(); page.el.lastChild.remove()
        // a glued "≈" moves to the new page with its number
        const carry = prevGlue && page.spans.length > 1 ? page.spans.pop() : null
        if (carry) { carry.sp.remove(); page.el.lastChild.remove() }
        newPage(carry ? carry.at : at)
        if (carry) { page.el.append(carry.sp, ' '); page.spans.push(carry) }
        page.el.append(sp)
      }
      page.spans.push({ sp, at })
    })
    for (const pg of pages) {
      css(pg.el, { display: 'block' })
      fitText(pg.el, L.caption.w, { maxH: L.caption.h, minPx: 40 })
      css(pg.el, { display: 'none' })
    }
    page = null
    return { pages }
  })
  return {
    seek(t) {
      const c = captionAt(spec.vo, t)
      const p = c ? c.p + 0.08 : 0
      lines.forEach((ln, i) => {
        const on = c && c.index === i
        let cur = -1
        if (on) ln.pages.forEach((pg, k) => { if (k === 0 || p >= pg.at) cur = k })
        ln.pages.forEach((pg, k) => {
          if (k !== cur) { css(pg.el, { display: 'none' }); return }
          const t0 = k === 0 ? spec.vo[i].t : -1
          const r = rise(t, t0, { dur: M.capIn })
          css(pg.el, { display: 'block', opacity: String(r.o), transform: `translateY(${r.y.toFixed(1)}px)` })
          for (const w of pg.spans) attr(w.sp, 'data-on', p >= w.at ? '1' : '0')
        })
      })
    },
  }
}

/**
 * verdict(parent, spec, L, { slot = L.verdict, tone = 'good' }) → { t, seek(t), yieldAt(t), box, txt } | null
 * The closing line (spec.verdict = { t, text }). One kit rule: it lands in the bottom slot L.verdict (the label slot
 * above the caption band; the bottom bar with captions off), never in the header band, which keeps the hook. When
 * the stage reaches into that slot (slot.boxed), a black band rises over the stage foot just before t and carries it.
 * A hard cut: every [data-yield] element (the label stack) drops 14 px and is gone by t (yieldAt), then the text
 * slams in at t with a green rule wiping in above it. The text is fitted while the box is measurable, and the slam
 * scale keeps it inside the slot (x and y). Readable text the band covers (a board's last rows, a chart's foot) is
 * hidden while it is covered (data-under), so nothing reads through or collides with the verdict.
 */
export function verdict(parent, spec, L, { slot = L.verdict, tone = 'good' } = {}) {
  const v = spec.verdict
  if (!v || !v.text) return null
  const t0 = Math.max(0, +v.t || 0)
  const sb = L.stage.y + L.stage.h
  const band = slot.boxed && sb > slot.y - 10 ? h('div', { class: 'sb-vband', 'data-deco': '', style: { top: slot.y - 10 + 'px', height: sb - slot.y + 10 + 'px', display: 'none' } }) : null
  if (band) parent.append(band)
  const box = h('div', { class: 'sb-verdict', style: { top: slot.y + 'px', left: (W - slot.w) / 2 + 'px', width: slot.w + 'px', height: slot.h + 'px' } })
  const rule = h('div', { class: 'sb-verdict-rule', 'data-deco': '' })
  if (tone === 'bad') css(rule, { background: C.red, boxShadow: '0 0 18px rgba(255, 77, 94, 0.5)' })
  const txt = h('div', { class: 'sb-verdict-text', html: rich(v.text) })
  box.append(rule, txt)
  parent.append(box)
  const gap = slot.h < 180 ? 12 : 20
  css(box, { display: 'flex', gap: gap + 'px' })
  fitText(txt, slot.w, { maxH: slot.h - 8 - gap - 6, minPx: SIZE.verdictMin })
  const cy = txt.offsetTop + txt.offsetHeight / 2
  const from = Math.min(slamFromFor(inkWidth(txt), slot.w - 8, 1.12), Math.max(1, Math.min(slot.h + 8 - cy, cy + 8) / Math.max(1, txt.offsetHeight / 2)))
  css(box, { display: 'none' })
  // what the band can cover: every element with its own text (a rolling digit column counts as one; decoration text
  // such as axis ticks too, so no glyph is ever sliced in half at the band's edge), outside the verdict and the
  // captions; and every [data-band-unit] group (a board row: outline, fill and text go together, never a sliver)
  let under = null, units = null
  const coverable = () => [...parent.querySelectorAll('*')].filter(el => {
    if (el === box || el === band || box.contains(el) || el.closest('.sb-caps, .sb-bg, .sb-brand')) return false
    if (el.hasAttribute('data-roll')) return true
    if (el.closest('[data-roll]')) return false
    return [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())
  })
  return {
    t: t0, box, txt, band,
    yieldAt: t => (t0 <= 0.001 ? 1 : prog(t, t0 - 0.067, 0.067)),
    seek(t) {
      if (band) {
        const q = t0 <= 0.001 ? 1 : ease.out(prog(t, t0 - 0.2, 0.2)), top = lerp(sb, slot.y - 10, q)
        css(band, { display: q > 0 ? 'block' : 'none', top: top.toFixed(1) + 'px', height: (sb - top).toFixed(1) + 'px' })
        if (q > 0 || under) {
          if (!under) { under = coverable(); units = [...parent.querySelectorAll('[data-band-unit]')] }
          const ref = parent.getBoundingClientRect()
          for (const el of units) {
            let hide = false
            if (q > 0) { const r = el.getBoundingClientRect(); hide = r.height > 0 && r.bottom - ref.top > top + 1 && r.top - ref.top < sb }
            attr(el, 'data-under-all', hide ? '1' : '0')
          }
          for (const el of under) {
            let hide = false
            if (q > 0) { const r = el.getBoundingClientRect(); hide = r.height > 0 && r.bottom - ref.top > top + 2 && r.top - ref.top < sb }
            attr(el, 'data-under', hide ? '1' : '0')
          }
        }
      }
      if (t < t0) { css(box, { display: 'none' }); return }
      const k = slam(t, t0, { from })
      css(box, { display: 'flex' })
      css(txt, { opacity: String(k.o), transform: `scale(${k.s.toFixed(4)})` })
      css(rule, { transform: `scaleX(${(t0 <= 0.001 ? 1 : ease.out(prog(t, t0 + 0.04, 0.35))).toFixed(4)})` })
    },
  }
}

// =====================================================================================================
// scoreboard panel: a big number in a black box (options, totals, duel sides)
// =====================================================================================================

/**
 * scorePanel(parent, { x, y, w, h, label, display, tone, size, sub, yieldToVerdict }) → { el, labelEl, valueEl, subEl, set(display), lit(p) }
 * Black panel with a hairline border; label (Inter 700 caps, grey) above a big Anton value in the tone colour.
 * lit(p) 0..1 turns the border to the tone colour with a glow (winner, active row). Keep x + w <= 940 below y 820.
 */
export function scorePanel(parent, { x, y, w, h: hh, label = '', display = '', tone = 'good', size = SIZE.panelValue, sub = '', yieldToVerdict = false } = {}) {
  const col = toneColor(tone)
  const el = h('div', { class: 'sb-panel', style: { left: x + 'px', top: y + 'px', width: w + 'px', height: hh + 'px' } })
  css(el, { '--tone': col })   // custom properties go through css(): core's h() drops '--' keys (Object.assign on style)
  if (yieldToVerdict) el.setAttribute('data-yield', '')
  const labelEl = h('div', { class: 'sb-panel-label', html: richUI(label) })
  const valueEl = h('div', { class: 'sb-panel-value', html: ax(esc(display)), style: { fontSize: size + 'px', color: col } })
  const subEl = sub ? h('div', { class: 'sb-panel-sub', html: richUI(sub) }) : null
  el.append(...[labelEl, valueEl, subEl].filter(Boolean))
  parent.append(el)
  fitText(valueEl, w - 40, { minPx: 48 })
  if (label) fitText(labelEl, w - 40, { minPx: 34 })
  return {
    el, labelEl, valueEl, subEl,
    set(display) { setHTML(valueEl, ax(esc(display))) },
    lit(p) { css(el, { '--lit': String(clamp(p).toFixed(3)) }) },
  }
}

// =====================================================================================================
// race chart: neon lines with glowing tips and live labels that never collide; dim axis that auto-rescales
// =====================================================================================================

function niceStep(range, target = 4) {
  const raw = range / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)))
  const n = raw / mag
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag
}

/** value of piecewise-linear points [[x, v], ...] at x (clamped to the ends) */
export function valueAt(points, x) {
  if (!points.length) return 0
  if (x <= points[0][0]) return points[0][1]
  for (let i = 1; i < points.length; i++) {
    if (x <= points[i][0]) {
      const [x0, v0] = points[i - 1], [x1, v1] = points[i]
      return x1 === x0 ? v1 : v0 + ((v1 - v0) * (x - x0)) / (x1 - x0)
    }
  }
  return points[points.length - 1][1]
}

/**
 * raceChart(parent, opts) → { el, seek(t), xAt(t), tipAt(i, t) }
 * opts:
 *   box: { x, y, w, h }            plot area in frame px (lines run inside it). Keep x + w <= 900 below y 820.
 *                                   x tick labels sit 14 px below the box; y tick labels sit above their grid line
 *                                   at the box's left edge (all decoration). Tip labels stay inside the box.
 *   series: [{ name, points: [[x, v]...], final, color = green|yellow|white, label?: html, width = 9 }]
 *   x: { from, to, tickEvery, tickLabel?: x => string }     ticks are decoration (data-deco)
 *   y: { prefix = '$', dp = 0, compact = true, log = false, min = 0, max? }   fixed max disables auto-rescale
 *   raceT: [t0, t1]                 x sweeps from x.from to x.to linearly over these seconds
 *   events: [{ x, label, until?, tone = 'bad' }]   flags (and bands with `until`) appear as the race reaches them;
 *                                   the flag label sits centred on x, 50 px ABOVE the box (leave that headroom)
 *   tipLabels = true                 one-line Anton labels "NAME  $12,345" beside each tip (collision-free)
 *   yearLabel = false                a big running year at the top left of the plot (readable)
 * Tip values interpolate (fmtNum with y.prefix/dp/compact) and show `final` exactly once the race ends.
 */
export function raceChart(parent, opts) {
  const { box, series, raceT = [1, 10], events = [], tipLabels = true, yearLabel = false } = opts
  const X = { tickEvery: 1, ...opts.x }
  const Y = { prefix: '$', dp: 0, compact: true, log: false, min: 0, ...opts.y }
  const palette = [C.green, C.yellow, C.white]
  const ser = series.map((sr, i) => ({ ...sr, color: sr.color || palette[i % 3], width: sr.width || 9 }))
  const root = h('div', { class: 'sb-race', style: { left: box.x + 'px', top: box.y + 'px', width: box.w + 'px', height: box.h + 'px' } })
  const svg = s('svg', { class: 'sb-race-svg', width: box.w, height: box.h, viewBox: `0 0 ${box.w} ${box.h}`, 'data-deco': '' })
  const defs = s('defs', {}, s('filter', { id: 'sbGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' }, s('feGaussianBlur', { stdDeviation: 7 })))
  svg.append(defs)
  const gridG = s('g', {}), bandG = s('g', {}), lineG = s('g', {}), tipG = s('g', {})
  svg.append(bandG, gridG, lineG, tipG)
  root.append(svg)
  parent.append(root)

  // y grid pool
  const yTicks = Array.from({ length: 8 }, () => {
    const line = s('line', { x1: 0, x2: box.w, stroke: C.edge, 'stroke-width': 2 })
    gridG.append(line)
    const lab = h('div', { class: 'sb-axis sb-axis-y', 'data-deco': '' })
    root.append(lab)
    return { line, lab }
  })
  // x ticks (static positions)
  const xTicks = []
  for (let xv = Math.ceil(X.from / X.tickEvery) * X.tickEvery; xv <= X.to + 1e-9; xv += X.tickEvery) {
    const lab = h('div', { class: 'sb-axis sb-axis-x', 'data-deco': '' }, X.tickLabel ? X.tickLabel(xv) : String(Math.round(xv)))
    root.append(lab)
    xTicks.push({ xv, lab })
  }
  const px = xv => ((xv - X.from) / (X.to - X.from)) * box.w
  xTicks.forEach(tk => css(tk.lab, { left: px(tk.xv) + 'px', top: box.h + 14 + 'px' }))

  // events
  const evs = events.map(ev => {
    const tone = toneColor(ev.tone || 'bad')
    const band = ev.until != null ? s('rect', { y: 0, height: box.h, fill: tone, opacity: 0 }) : null
    if (band) bandG.append(band)
    const rule = s('line', { y1: 0, y2: box.h, stroke: tone, 'stroke-width': 3, 'stroke-dasharray': '10 10', opacity: 0 })
    bandG.append(rule)
    const lab = h('div', { class: 'sb-race-flag', html: ax(esc(ev.label || '')), style: { color: tone } })
    root.append(lab)
    return { ev, band, rule, lab }
  })

  // series
  const S = ser.map(sr => {
    const glow = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': sr.width * 2.6, opacity: 0.32, filter: 'url(#sbGlow)', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    const path = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': sr.width, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    if (sr.dashed) attr(path, 'stroke-dasharray', '2 18')
    lineG.append(glow, path)
    const halo = s('circle', { r: 26, fill: sr.color, opacity: 0.28, filter: 'url(#sbGlow)' })
    const dot = s('circle', { r: 11, fill: sr.color })
    const core = s('circle', { r: 4.5, fill: '#FFFFFF' })
    tipG.append(halo, dot, core)
    const lab = tipLabels ? h('div', { class: 'sb-tip', style: { color: sr.color } },
      h('span', { class: 'sb-tip-name', html: sr.label || ax(esc(sr.name || '')) }), h('span', { class: 'sb-tip-val' })) : null
    if (lab) root.append(lab)
    const tpl = parseDisplay(sr.final || '')
    return { sr, glow, path, halo, dot, core, lab, val: lab ? lab.lastChild : null, tpl }
  })
  const year = yearLabel ? h('div', { class: 'sb-race-year' }) : null
  if (year) root.append(year)

  const xAt = t => lerp(X.from, X.to, prog(t, raceT[0], raceT[1] - raceT[0]))
  const allMax = Math.max(...ser.flatMap(sr => sr.points.map(p => p[1])))
  const startMax = Math.max(...ser.map(sr => valueAt(sr.points, X.from)))
  function runMax(x) {
    let m = 0
    for (const sr of ser) {
      for (const p of sr.points) { if (p[0] > x) break; m = Math.max(m, p[1]) }
      m = Math.max(m, valueAt(sr.points, x))
    }
    return m
  }
  // smoothed, monotonic y max (pure: sampled from the race clock)
  // floor: never zoom in past the first ~12% of the race (or 5% of the final max), so an opening at $0 still has an axis
  const yFloor = Math.max(startMax * 1.6, runMax(X.from + (X.to - X.from) * 0.12) * 1.25, allMax * 0.05, 1e-6)
  function yMaxAt(t) {
    if (Y.max != null) return Y.max
    let acc = 0
    for (let i = 0; i < 6; i++) acc += runMax(xAt(t - i * 0.07))
    return Math.max(yFloor, (acc / 6) * 1.18, runMax(xAt(t)) * 1.06)   // the smoothing lags a steep climb: never let a line run off the top
  }
  const fmtV = v => fmtNum(v, { prefix: Y.prefix, dp: Y.dp, compact: Y.compact })
  const logMin = Math.max(1e-9, Y.min || Math.min(...ser.flatMap(sr => sr.points.map(p => p[1]))) * 0.8)
  const pyOf = ymax => v => {
    if (Y.log) { const a = Math.log10(logMin), b = Math.log10(Y.max || allMax * 1.2); return box.h - ((Math.log10(Math.max(v, logMin)) - a) / (b - a)) * box.h }
    return box.h - ((v - Y.min) / (ymax - Y.min)) * box.h
  }

  function tipAt(i, t) {
    const x = xAt(t), ymax = yMaxAt(t)
    return { x: px(x), y: pyOf(ymax)(valueAt(ser[i].points, x)) }
  }

  function seek(t) {
    const x = xAt(t)
    const ymax = yMaxAt(t)
    const py = pyOf(ymax)
    const done = t >= raceT[1]
    // grid + y labels
    const step = niceStep(ymax - Y.min, 4)
    yTicks.forEach((tk, i) => {
      const v = Y.min + step * (i + 1)
      const on = !Y.log && v < ymax * 0.98
      css(tk.lab, { display: on ? 'block' : 'none' })
      attr(tk.line, 'opacity', on ? '1' : '0')
      if (!on) return
      const yy = py(v)
      attr(tk.line, 'y1', yy.toFixed(1)); attr(tk.line, 'y2', yy.toFixed(1))
      setText(tk.lab, fmtNum(v, { prefix: Y.prefix, dp: 0, compact: true }))
      css(tk.lab, { top: (yy - 40).toFixed(1) + 'px' })
    })
    xTicks.forEach(tk => css(tk.lab, { opacity: tk.xv <= x + 1e-6 ? '1' : '0.35' }))
    // events
    for (const e of evs) {
      const on = x >= e.ev.x
      const a = on ? prog(x, e.ev.x, (X.to - X.from) * 0.01) : 0
      attr(e.rule, 'x1', px(e.ev.x).toFixed(1)); attr(e.rule, 'x2', px(e.ev.x).toFixed(1))
      attr(e.rule, 'opacity', (0.8 * a).toFixed(3))
      if (e.band) {
        const x1 = Math.min(x, e.ev.until)
        attr(e.band, 'x', px(e.ev.x).toFixed(1))
        attr(e.band, 'width', Math.max(0, px(x1) - px(e.ev.x)).toFixed(1))
        attr(e.band, 'opacity', on ? '0.2' : '0')
      }
      const lw = e.lab.offsetWidth || 0
      css(e.lab, { display: on ? 'block' : 'none', left: clamp(px(e.ev.x) - lw / 2, 0, box.w - lw).toFixed(1) + 'px', opacity: String(a) })
    }
    // lines, tips
    const tips = S.map((o, i) => {
      const pts = o.sr.points.filter(p => p[0] <= x).map(p => [px(p[0]), py(p[1])])
      const vx = valueAt(o.sr.points, x)
      pts.push([px(x), py(vx)])
      const d = pts.map((p, k) => (k ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join('')
      attr(o.path, 'd', d); attr(o.glow, 'd', d)
      const [tx, ty] = pts[pts.length - 1]
      for (const c of [o.halo, o.dot, o.core]) { attr(c, 'cx', tx.toFixed(1)); attr(c, 'cy', ty.toFixed(1)) }
      if (o.val) setHTML(o.val, ax(esc(done && o.sr.final ? o.sr.final : fmtV(vx))))
      return { i, tx, ty }
    })
    // labels: left of the tip, above the line; never collide; stay in the plot
    if (tipLabels) {
      const LH = SIZE.tip * 1.18
      const order = [...tips].sort((a, b) => a.ty - b.ty)
      const rects = []
      const want = order.map(tp => clamp(tp.ty - LH * 0.95, 0, box.h - LH))
      for (let k = 1; k < want.length; k++) if (want[k] - want[k - 1] < LH) want[k] = want[k - 1] + LH
      const over = want.length ? want[want.length - 1] - (box.h - LH) : 0
      if (over > 0) for (let k = 0; k < want.length; k++) want[k] = Math.max(0, want[k] - over)
      for (let k = 1; k < want.length; k++) if (want[k] - want[k - 1] < LH) want[k] = want[k - 1] + LH
      order.forEach((tp, k) => {
        const o = S[tp.i]
        const lw = o.lab.offsetWidth
        // left of the tip when it fits, else right of it (never on top of its own dot)
        const left = tp.tx - 26 - lw >= 0 ? tp.tx - 26 - lw : Math.min(tp.tx + 30, box.w - lw)
        css(o.lab, { left: left.toFixed(1) + 'px', top: want[k].toFixed(1) + 'px' })
        rects.push([left, want[k], left + lw, want[k] + LH])
      })
      // y tick labels give way to tip labels
      yTicks.forEach(tk => {
        if (tk.lab.style.display === 'none') return
        const ty = parseFloat(tk.lab.style.top), tw = tk.lab.offsetWidth
        const hit = rects.some(r => r[0] < tw && r[2] > -6 && r[1] < ty + 34 && r[3] > ty)
        css(tk.lab, { opacity: hit ? '0' : '1' })
      })
    }
    if (year) setText(year, String(Math.floor(x + 1e-6)))
  }
  return { el: root, seek, xAt, tipAt }
}

// =====================================================================================================
// timing
// =====================================================================================================

/**
 * durationOf(spec, lastBeat, hold) — the format's duration: the latest of lastBeat + hold, the last VO line's end
 * + 0.4 s, and verdict.t + 2.5 s (spec.duration, when set, wins in defineKit). Clamped to 5-90 s.
 */
export function durationOf(spec, lastBeat, hold = M.hold) {
  let d = lastBeat + hold
  const vo = spec.vo || []
  vo.forEach((v, i) => { const end = v.d != null ? v.t + v.d : (vo[i + 1] ? vo[i + 1].t : v.t + 2.5); d = Math.max(d, end + 0.4) })
  if (spec.verdict && spec.verdict.t != null) d = Math.max(d, spec.verdict.t + 2.5)
  return +clamp(d, 5, 90).toFixed(2)
}

/** times for beats that may omit t: first at `first`, then every `every` s after the previous one */
export function beatTimes(items = [], { first = 1.0, every = 3.2, key = 't' } = {}) {
  const out = []
  items.forEach((it, i) => { out.push(it[key] != null ? +it[key] : i ? out[i - 1] + every : first) })
  return out
}

// =====================================================================================================
// chrome + stubs
// =====================================================================================================

/**
 * chrome(spec, ctx, body): everything every format shares. Built after the format, so:
 *   - the bars/stage background is prepended (sits under the format's content)
 *   - brand mark, header, footer, captions and verdict are appended on top
 * The format can steer it through fields on the object it returns:
 *   body.layout      the layout it used (default layoutFor(spec))
 *   body.scaffold    { grid: false } to hide the stage grid
 *   body.header      false: the format draws its own header
 *   body.footer      false: the format draws spec.footer (and lookOpts.footerSteps) itself
 *   body.verdict     false: the format draws spec.verdict itself
 *   body.verdictSlot a slot { y, h, w, boxed } for the verdict (default L.verdict: the kit's one verdict spot)
 *   body.verdictTone 'bad': the verdict's rule is coral (a loss), not green
 *   body.verdictCue  sfx kind for the verdict landing (default 'reveal'; null for none)
 */
export function chrome(spec, ctx, body = {}) {
  const L = body.layout || layoutFor(spec)
  const stage = ctx.stage
  stage.prepend(scaffold(L, body.scaffold))
  brandMark(stage, L)
  if (body.header !== false) header(stage, spec, L)
  const foot = body.footer !== false ? footerSteps(stage, spec, L) : null
  const caps = captions(stage, spec, L)
  const verd = body.verdict === false ? null : verdict(stage, spec, L, { slot: body.verdictSlot || L.verdict, tone: body.verdictTone })
  if (verd && body.verdictCue !== null) ctx.cue(verd.t, body.verdictCue || 'reveal', { gain: 0.7 })
  const yields = [...stage.querySelectorAll('[data-yield]')]
  return {
    seek(t) {
      caps.seek(t)
      if (foot) foot.seek(t)
      if (verd) {
        verd.seek(t)
        const y = verd.yieldAt(t)
        for (const e of yields) css(e, { opacity: String(1 - y), transform: `translateY(${(14 * y).toFixed(1)}px)`, visibility: y >= 1 ? 'hidden' : 'visible' })
      }
    },
  }
}

/** placeholder format (header + a centred "TODO <format>") so the kit loads before a format is written */
export function stub(spec, ctx, id) {
  const L = layoutFor(spec)
  const el = h('div', { class: 'sb-todo', style: { top: L.stage.y + L.stage.h / 2 - 60 + 'px' } }, `TODO ${id}`)
  ctx.stage.append(el)
  return { duration: durationOf(spec, 4), layout: L, seek() {} }
}

/** load every font face the kit uses before mount (fitText measures real glyphs) */
export async function loadFonts() {
  if (!document.fonts) return
  const faces = [
    "400 100px 'Anton'", "600 40px 'Inter'", "700 40px 'Inter'", "800 40px 'Inter'", "800 50px 'Inter Tight'", "700 50px 'Inter Tight'",
    "500 40px 'JetBrains Mono'", "700 40px 'JetBrains Mono'",
  ]
  const full = ["400 100px 'Inter Full'", "600 100px 'Inter Full'", "700 100px 'Inter Full'", "800 100px 'Inter Full'"]
  await Promise.all([...faces.map(f => document.fonts.load(f, 'Ag0$')), ...full.map(f => document.fonts.load(f, '≈×÷−→'))]).catch(() => {})
  await document.fonts.ready
}
