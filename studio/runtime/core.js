// Browser runtime shared by every look kit.
//
// Contract: a kit page loads this module and calls defineKit(). That installs window.STUDIO:
//   STUDIO.mount(spec) -> Promise<{ duration, base, fps, sfx: [{ t, kind, ...opts }], brand }>   builds the DOM once
//   STUDIO.seek(t)                                                          sets every visual for time t (seconds)
// seek(t) must be a pure function of t: the renderer may call it out of order (stills, linting).
// With spec.brand set (the channel brand, attached by src/page.mjs), mount also builds the brand layer: the logo in
// the look's mark and the CTA end card after the teaser (duration = base + cta.dur). See "brand layer" below.

export const W = 1080, H = 1920

// Safe zones for 9:16 shorts (YouTube Shorts, Reels, TikTok). The linter enforces the same numbers.
export const SAFE = {
  top: 240,        // y < 240: platform top bar, decoration only
  bottom: 1480,    // y > 1480: platform caption + UI, nothing readable
  left: 60,        // readable x >= 60
  right: 1020,     // readable x <= 1020 above railY
  railY: 820,      // below this y the right button rail starts
  railX: 940,      // readable x <= 940 below railY
  captionTop: 1320 // caption band: 1320-1480
}

// ---------- maths of time ----------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const lerp = (a, b, p) => a + (b - a) * p
/** progress 0..1 of t through [t0, t0 + dur] */
export const prog = (t, t0, dur) => (dur <= 0 ? (t >= t0 ? 1 : 0) : clamp((t - t0) / dur))

export const ease = {
  linear: p => p,
  in: p => p * p * p,
  out: p => 1 - Math.pow(1 - p, 3),
  inOut: p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2),
  outExpo: p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  inOutSine: p => -(Math.cos(Math.PI * p) - 1) / 2,
  back: (p, s = 1.70158) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2),
  // critically-damped-ish spring with a small overshoot; settles at p = 1
  spring: p => (p >= 1 ? 1 : 1 - Math.exp(-6 * p) * Math.cos(9 * p)),
}

/** value tweened from `from` to `to` over [t0, t0 + dur] */
export const tween = (t, t0, dur, from, to, e = ease.out) => lerp(from, to, e(prog(t, t0, dur)))

/** 0 before t0, ramps to 1, holds, ramps back to 0 at t1 (fade window). */
export function window01(t, t0, t1, fadeIn = 0.2, fadeOut = 0.2) {
  if (t < t0 || t > t1) return 0
  return Math.min(prog(t, t0, fadeIn), 1 - prog(t, t1 - fadeOut, fadeOut))
}

/** deterministic PRNG (mulberry32) for jitter that must not change between frames */
export function rng(seed = 1) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}

// ---------- numbers ----------
const group = (s) => s.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
/**
 * Format a number for the screen.
 * opts: { prefix: '$', suffix: '', dp: 0, approx: false, sign: false, compact: false }
 * compact: 1,234,567 -> 1.23M (dp applies to the compact mantissa)
 */
export function fmtNum(n, opts = {}) {
  const { prefix = '', suffix = '', dp = 0, approx = false, sign = false, compact = false } = opts
  const neg = n < 0
  let v = Math.abs(n)
  let unit = ''
  if (compact) {
    for (const [d, u] of [[1e12, 'T'], [1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) {
      if (v >= d) { v /= d; unit = u; break }
    }
  }
  let body = v.toFixed(dp)
  const [i, f] = body.split('.')
  body = group(i) + (f ? '.' + f : '')
  const s = (neg ? '−' : sign ? '+' : '') + prefix + body + unit + suffix
  return (approx ? '≈ ' : '') + s
}
export const money = (n, opts = {}) => fmtNum(n, { prefix: '$', ...opts })

// ---------- text ----------
const seg = typeof Intl !== 'undefined' && Intl.Segmenter ? new Intl.Segmenter('en', { granularity: 'grapheme' }) : null
export const graphemes = s => (seg ? [...seg.segment(s)].map(x => x.segment) : [...s])
/** the first round(p * length) graphemes of s (typing effect) */
export function typed(s, p) {
  const g = graphemes(s)
  return g.slice(0, Math.round(clamp(p) * g.length)).join('')
}

/**
 * Light inline markup used in every spec string:
 *   **text**  -> <em> (the kit decides the look: highlighter, accent colour, neon)
 *   __text__  -> <u class="mark2"> (a second emphasis, e.g. a cost/debt colour)
 *   \n        -> line break
 * Everything else is escaped.
 */
export function markup(s = '') {
  const esc = String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return esc
    .replace(/\*\*(.+?)\*\*/g, '<em>$1</em>')
    .replace(/__(.+?)__/g, '<u class="mark2">$1</u>')
    .replace(/\n/g, '<br>')
}
export const plain = (s = '') => String(s).replace(/\*\*|__/g, '')

// ---------- DOM ----------
const SVGNS = 'http://www.w3.org/2000/svg'
function build(el, props, kids) {
  for (const [k, v] of Object.entries(props || {})) {
    if (v == null || v === false) continue
    if (k === 'style' && typeof v === 'object') Object.assign(el.style, v)
    else if (k === 'html') el.innerHTML = v
    else if (k === 'text') el.textContent = v
    else if (k === 'class') el.setAttribute('class', v)
    else el.setAttribute(k, v === true ? '' : v)
  }
  for (const c of kids.flat()) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)))
  return el
}
/** h('div', { class: 'row', style: { left: '60px' } }, child, 'text') */
export const h = (tag, props, ...kids) => build(document.createElement(tag), props, kids)
/** s('rect', { x: 0, y: 0, width: 10, height: 10 }) — SVG element */
export const s = (tag, props, ...kids) => build(document.createElementNS(SVGNS, tag), props, kids)

/** assign style props only when they change (keeps seek() cheap) */
export function css(el, styles) {
  const cache = el.__css || (el.__css = {})
  for (const [k, v] of Object.entries(styles)) {
    if (cache[k] === v) continue
    cache[k] = v
    if (k.startsWith('--')) el.style.setProperty(k, v)
    else el.style[k] = v
  }
}
/** set textContent / innerHTML only when it changes */
export function setText(el, v) { if (el.__t !== v) { el.__t = v; el.textContent = v } }
export function setHTML(el, v) { if (el.__h !== v) { el.__h = v; el.innerHTML = v } }
export function attr(el, k, v) { const c = el.__a || (el.__a = {}); if (c[k] !== v) { c[k] = v; el.setAttribute(k, v) } }

/**
 * Shrink an element's font-size until it fits maxW (and optionally maxH). Call at mount time, after fonts load.
 * Returns the final px size. Never goes below minPx (the linter will flag anything that still overflows).
 */
export function fitText(el, maxW, { maxH = Infinity, minPx = 34, step = 2 } = {}) {
  let px = parseFloat(getComputedStyle(el).fontSize)
  el.style.whiteSpace = el.style.whiteSpace || ''
  while (px > minPx && (el.scrollWidth > maxW + 0.5 || el.scrollHeight > maxH + 0.5)) {
    px -= step
    el.style.fontSize = px + 'px'
  }
  return px
}

/** current caption line for time t from spec.vo [{ t, d?, text }] (d defaults to the gap to the next line) */
export function captionAt(vo = [], t, endPad = 0.15) {
  for (let i = vo.length - 1; i >= 0; i--) {
    const v = vo[i]
    const end = v.d != null ? v.t + v.d : (vo[i + 1] ? vo[i + 1].t : Infinity)
    if (t >= v.t && t < end + endPad) return { line: v, index: i, p: prog(t, v.t, Math.max(0.01, (isFinite(end) ? end : v.t + 3) - v.t)) }
  }
  return null
}

/** the time of a named beat: spec.beats = { name: seconds } with a fallback */
export const beat = (spec, name, fallback) => (spec.beats && spec.beats[name] != null ? spec.beats[name] : fallback)

// ---------- brand layer ----------
//
// spec.brand (src/page.mjs reads it from studio/brand/brand.json; null with --no-brand or "brand": false):
//   { name, handle, cta: { line, kicker, dur } | null, logoUrl: string | null, logoShape: 'circle' | 'rounded' | 'square',
//     logoBackground: css colour | null }
// logoUrl is null when the logo file does not exist: the look keeps its own mark, and every frame of the teaser is
// exactly what it was without the brand. Only the end card is added.
//
// A kit can take over any part through defineKit({ ..., brand: { theme, mark, cta } }) (all optional):
//   theme: {...} or (auto, stage) => ({...})   colours and fonts for the generic card and brandLogo's ring (brandTheme)
//   mark(spec, ctx, brand, { theme })          put the logo into the look's own mark. Called only when brand.logoUrl is set.
//                                              May return { seek(t) } (seeked like the chrome, held during the card).
//                                              Without it, every [data-brand-icon] element in the stage is swapped for
//                                              brandLogo() at the same height; with none, the mark stays as it is.
//   cta(spec, ctx, brand, { t0, dur, hold, root, theme }) -> { seek(t) }
//                                              the end card, from t0 (the teaser's own duration) to t0 + dur. Build it
//                                              into `root` (#brand-layer, above the stage), never into ctx.stage (the
//                                              chrome scans the stage). Mark an opaque cover with data-occlude: the linter
//                                              then treats stage text under it as hidden. Return null for the generic card.
// During the card the format and the chrome are seeked at most to `hold` (base - 1/fps): the verdict frame holds
// underneath. If the kit's card cues no sound at its entry, a whoosh is cued at t0.

const BRAND_INK = { r: 17, g: 20, b: 24 }, BRAND_WHITE = { r: 255, g: 255, b: 255 }
export const BRAND_SHAPES = ['circle', 'rounded', 'square']
/** 'rgb(1, 2, 3)' / 'rgba(…)' / '#rrggbb' -> { r, g, b, a } | null */
export function parseColor(c) {
  if (c && typeof c === 'object') return c
  const str = String(c || '').trim()
  let m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(str)
  if (m) {
    const x = m[1].length === 3 ? m[1].replace(/./g, '$&$&') : m[1]
    return { r: parseInt(x.slice(0, 2), 16), g: parseInt(x.slice(2, 4), 16), b: parseInt(x.slice(4, 6), 16), a: 1 }
  }
  m = /rgba?\(([^)]+)\)/.exec(str)
  if (!m) return null
  const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number)
  return { r, g, b, a }
}
const rgbStr = c => `rgb(${Math.round(c.r)}, ${Math.round(c.g)}, ${Math.round(c.b)})`
const relLum = ({ r, g, b }) => {
  const f = v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4) }
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)
}
/** WCAG contrast ratio of two colours (same formula as the linter) */
export function contrast(a, b) {
  const x = relLum(parseColor(a)), y = relLum(parseColor(b))
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

/**
 * The colours and fonts the brand layer uses on this look. Read from the stage: its background, its text colour, and
 * the colour the look gives **emphasis** (<em>) when that reads on the stage (else a default green). A kit can
 * override any field with defineKit({ brand: { theme } }).
 * -> { dark, bg, fg, kicker, accent, ring, display, displayWeight, displayCase, body, kickerWeight, handleWeight }
 */
export function brandTheme(stage, over = null) {
  const cs = getComputedStyle(stage)
  let bg = parseColor(cs.backgroundColor)
  if (!bg || bg.a < 0.5) bg = parseColor(getComputedStyle(document.body).backgroundColor)
  if (!bg || bg.a < 0.5) bg = { r: 0, g: 0, b: 0, a: 1 }
  const dark = relLum(bg) < 0.18
  let fg = parseColor(cs.color) || (dark ? BRAND_WHITE : BRAND_INK)
  if (contrast(fg, bg) < 7) fg = dark ? BRAND_WHITE : BRAND_INK
  const probe = h('em', { style: { position: 'absolute', left: '0px', top: '0px', visibility: 'hidden' } }, 'x')
  stage.append(probe)
  const em = parseColor(getComputedStyle(probe).color)
  probe.remove()
  const accent = em && rgbStr(em) !== rgbStr(fg) && contrast(em, bg) >= 3.6 ? em : parseColor(dark ? '#2BFF88' : '#0A9254')
  const mixC = (a, b, p) => ({ r: lerp(a.r, b.r, p), g: lerp(a.g, b.g, p), b: lerp(a.b, b.b, p) })
  const auto = {
    dark, bg: rgbStr(bg), fg: rgbStr(fg), kicker: rgbStr(mixC(fg, bg, 0.3)), accent: rgbStr(accent), ring: rgbStr(accent),
    display: cs.fontFamily, displayWeight: 900, displayCase: 'none', body: cs.fontFamily, kickerWeight: 700, handleWeight: 800,
  }
  const o = typeof over === 'function' ? over(auto, stage) : over
  return { ...auto, ...(o || {}) }
}

/**
 * The channel logo as an element of size x size px, cropped to brand.logoShape (or opts.shape) with a thin ring in
 * the look's colour drawn over its edge, so any logo background sits on a dark or a light stage. null when there is
 * no logo (brand.logoUrl null): use the look's own mark then.
 * opts: { shape, ring (css colour; null = no ring), ringWidth (default 3% of size, >= 2 px), background (behind a
 * transparent logo; default brand.logoBackground) }. The element is decoration (data-deco) and sized in px.
 */
export function brandLogo(brand, size, { shape, ring = null, ringWidth, background } = {}) {
  if (!brand || !brand.logoUrl) return null
  shape = BRAND_SHAPES.includes(shape) ? shape : brand.logoShape || 'circle'
  const radius = shape === 'circle' ? '50%' : shape === 'rounded' ? Math.round(size * 0.22) + 'px' : '0px'
  const rw = ringWidth ?? Math.max(2, Math.round(size * 0.03))
  const bg = background ?? brand.logoBackground ?? null
  return h('div', { class: 'brand-logo', 'data-shape': shape, 'data-deco': '',
    style: { position: 'relative', width: size + 'px', height: size + 'px', flex: 'none', borderRadius: radius, overflow: 'hidden', background: bg || 'transparent' } },
    h('img', { src: brand.logoUrl, alt: '', decoding: 'sync', draggable: 'false',
      style: { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%', objectFit: 'cover', display: 'block' } }),
    ring ? h('i', { class: 'brand-logo-ring', style: { position: 'absolute', inset: '0px', borderRadius: radius, boxShadow: `inset 0 0 0 ${rw}px ${ring}` } }) : null)
}

/** generic stand-in mark when there is no logo: a ring in the accent with "≈" (decoration) */
export function brandMarkFallback(size, theme) {
  const rw = Math.max(3, Math.round(size * 0.035))
  return h('div', { class: 'brand-mark-fallback', 'data-deco': '',
    style: { position: 'relative', width: size + 'px', height: size + 'px', flex: 'none', borderRadius: '50%', boxShadow: `inset 0 0 0 ${rw}px ${theme.ring}`,
      display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.accent, font: `800 ${Math.round(size * 0.58)}px/1 'Inter Full', sans-serif` } },
    h('span', { style: { position: 'relative', top: '-0.05em' } }, '≈'))
}

/** brandLogo(), or opts.fallback(size) when there is no logo (the look's own mark) */
export function brandIcon(brand, size, { fallback = null, ...opts } = {}) {
  return brandLogo(brand, size, opts) || (fallback ? fallback(size) : null)
}

/** text as HTML whose lines can break only between words (never inside "hand-waved."): one nowrap span per word */
export function wordsHTML(text) {
  const esc = v => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return String(text || '').trim().split(/\s+/).filter(Boolean).map(w => `<span class="bw" style="white-space:nowrap">${esc(w)}</span>`).join(' ')
}

/** the words of `text` in n lines, balanced by length, split only at spaces (for kits that set lines themselves) */
export function balanceSplit(text, n = 2) {
  const words = String(text || '').trim().split(/\s+/).filter(Boolean)
  if (n <= 1 || words.length <= 1) return [words.join(' ')]
  n = Math.min(n, words.length)
  let best = null
  const rec = (start, k, acc) => {
    if (k === 1) {
      const lines = [...acc, words.slice(start).join(' ')]
      const worst = Math.max(...lines.map(l => l.length))
      if (!best || worst < best.worst) best = { worst, lines }
      return
    }
    for (let i = start + 1; i <= words.length - k + 1; i++) rec(i, k - 1, [...acc, words.slice(start, i).join(' ')])
  }
  rec(0, n, [])
  return best.lines
}

/**
 * Largest font size (maxPx down to minPx, in `step`s) at which el fits maxW in at most maxLines lines (then one more
 * line, then minPx). Sets an integer line-height of lh x size. el must be in the DOM (visibility: hidden is fine).
 */
export function fitLines(el, maxW, { maxLines = 2, maxPx = 88, minPx = 60, step = 2, lh = 1.1 } = {}) {
  const set = px => { el.style.fontSize = px + 'px'; el.style.lineHeight = Math.round(px * lh) + 'px' }
  for (const n of [maxLines, maxLines + 1]) {
    for (let px = maxPx; px >= minPx; px -= step) {
      set(px)
      const lines = Math.round(el.scrollHeight / Math.round(px * lh))
      if (el.scrollWidth <= maxW + 0.5 && lines <= n) return px
    }
  }
  set(minPx)
  return minPx
}

/**
 * The generic end card (used when the kit has no brand.cta, or calls it itself with its own theme/opts):
 * an opaque panel in the stage colour slides up over the held verdict frame (whoosh), then the logo (or a "≈" ring)
 * pops in, the CTA line rises, then the kicker and the handle. Text sits in x 140-940, centred in y 240-1480.
 * opts: { t0, dur, root, theme, logoSize = 230, colX = 140, colW = 800 } -> { seek(t), panel, els }
 */
export function brandCard(spec, ctx, brand, { t0, dur, root, theme, logoSize = 230, colX = 140, colW = 800 } = {}) {
  const cta = brand.cta || { line: '', kicker: '' }
  const panel = h('div', { class: 'bc-panel', 'data-occlude': '', style: { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: H + 'px', background: theme.bg, visibility: 'hidden' } })
  const rule = h('div', { class: 'bc-rule', 'data-deco': '', style: { position: 'absolute', left: '0px', top: '0px', width: W + 'px', height: '8px', background: theme.accent } })
  const col = h('div', { class: 'bc-col', style: { position: 'absolute', left: colX + 'px', top: SAFE.top + 'px', width: colW + 'px', height: SAFE.bottom - SAFE.top + 'px',
    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' } })
  const icon = h('div', { class: 'bc-icon', style: { marginBottom: '56px', transformOrigin: '50% 50%' } },
    brandIcon(brand, logoSize, { ring: theme.ring, fallback: sz => brandMarkFallback(sz, theme) }))
  const line = h('div', { class: 'bc-line', html: wordsHTML(cta.line),
    style: { width: colW + 'px', color: theme.fg, fontFamily: theme.display, fontWeight: String(theme.displayWeight), textTransform: theme.displayCase, letterSpacing: '-0.01em', textWrap: 'balance' } })
  const kicker = cta.kicker ? h('div', { class: 'bc-kicker', html: wordsHTML(cta.kicker),
    style: { width: colW + 'px', marginTop: '22px', color: theme.kicker, fontFamily: theme.body, fontWeight: String(theme.kickerWeight), textWrap: 'balance' } }) : null
  const handle = brand.handle ? h('div', { class: 'bc-handle',
    style: { marginTop: '52px', padding: '8px 36px 12px', border: `4px solid ${theme.accent}`, borderRadius: '999px', color: theme.accent, fontFamily: theme.body, fontWeight: String(theme.handleWeight), whiteSpace: 'nowrap' } }, brand.handle) : null
  col.append(...[icon, line, kicker, handle].filter(Boolean))
  panel.append(rule, col)
  root.append(panel)
  fitLines(line, colW, { maxLines: 2, maxPx: 88, minPx: 60, lh: 1.1 })
  if (kicker) fitLines(kicker, colW, { maxLines: 2, maxPx: 50, minPx: 40, lh: 1.2 })
  if (handle) fitLines(handle, colW - 80, { maxLines: 1, maxPx: 58, minPx: 40, lh: 1.15 })
  ctx.cue(t0, 'whoosh', { dur: 0.32, gain: 0.55 })
  ctx.cue(t0 + 0.3, 'pop', { gain: 0.45 })
  const steps = [[icon, 0.22, 'pop'], [line, 0.34, 'rise'], [kicker, 0.5, 'rise'], [handle, 0.64, 'rise']].filter(x => x[0])
  return {
    panel, els: { icon, line, kicker, handle, rule, col },
    seek(t) {
      const u = t - t0
      if (u < 0 || u > dur + 1e-6) { css(panel, { visibility: 'hidden' }); return }
      const p = ease.out(prog(u, 0, 0.3))
      css(panel, { visibility: 'visible', transform: `translateY(${((1 - p) * H).toFixed(1)}px)` })
      for (const [el, d, kind] of steps) {
        const q = prog(u, d, 0.34)
        css(el, { opacity: ease.out(q).toFixed(3),
          transform: kind === 'pop' ? `scale(${(0.72 + 0.28 * ease.back(q)).toFixed(4)})` : `translateY(${((1 - ease.out(q)) * 26).toFixed(1)}px)` })
      }
    },
  }
}

/** no kit mark hook: swap every [data-brand-icon] in the stage for the logo at the same height */
function swapBrandIcons(stage, brand, theme) {
  for (const el of stage.querySelectorAll('[data-brand-icon]')) {
    const r = el.getBoundingClientRect()
    const logo = brandLogo(brand, Math.round(Math.max(r.width, r.height)), { ring: theme.ring })
    if (logo) el.replaceWith(logo)
  }
  return null
}

const LOGOS = new Map()   // decoded logo images stay referenced, so every <img> of the same url paints from memory
async function decodeLogo(brand) {
  try {
    let img = LOGOS.get(brand.logoUrl)
    if (!img) { img = new Image(); img.decoding = 'sync'; img.src = brand.logoUrl; await img.decode(); LOGOS.set(brand.logoUrl, img) }
    if (img.naturalWidth !== img.naturalHeight) console.warn(`brand: logo is ${img.naturalWidth}x${img.naturalHeight}, not square: it is centre-cropped`)
    return true
  } catch (e) {
    console.error(`brand: logo ${brand.logo || brand.logoUrl} could not be loaded or decoded; the look keeps its own mark`)
    return false
  }
}

// ---------- kit definition ----------
/**
 * defineKit({
 *   name: 'clean-sheet',
 *   formats: {
 *     'dead-simple-list': (spec, ctx) => ({ duration, seek(t) {} }),
 *     ...
 *   },
 *   chrome?: (spec, ctx) => ({ seek(t) {} }),   // brand mark, captions, footer shared by every format in the kit
 *   brand?: { theme, mark, cta },               // the brand layer (see "brand layer" above)
 * })
 * ctx = { stage, spec, brand, cue(t, kind, opts), fmt helpers... }   ctx.brand: spec.brand when enabled, else null
 */
export function defineKit(kit) {
  let parts = [], card = null, layer = null, t0Card = Infinity, hold = Infinity, state = null
  const STUDIO = {
    kit: kit.name,
    formats: Object.keys(kit.formats),
    async mount(spec) {
      const stage = document.getElementById('stage')
      stage.innerHTML = ''
      document.getElementById('brand-layer')?.remove()
      card = null; layer = null; t0Card = hold = Infinity
      stage.dataset.look = kit.name
      stage.dataset.format = spec.format
      const brand = spec.brand && spec.brand.enabled !== false ? { ...spec.brand } : null
      if (brand && brand.logoUrl && !(await decodeLogo(brand))) brand.logoUrl = null
      const sfx = []
      const ctx = {
        stage, spec, brand,
        cue: (t, kind, opts = {}) => { if (t != null && isFinite(t)) sfx.push({ t: +t.toFixed(3), kind, ...opts }) },
      }
      const make = kit.formats[spec.format]
      if (!make) throw new Error(`look "${kit.name}" has no format "${spec.format}" (has: ${Object.keys(kit.formats).join(', ')})`)
      const body = make(spec, ctx)
      const chrome = kit.chrome ? kit.chrome(spec, ctx, body) : null
      parts = [body, chrome].filter(Boolean)
      const base = spec.duration || body.duration
      if (!(base > 0)) throw new Error('format did not report a duration')
      const fps = spec.fps || 30
      let duration = base, brandInfo = null
      if (brand) {
        const kb = kit.brand || {}
        const theme = brandTheme(stage, kb.theme)
        if (brand.logoUrl) {
          const m = kb.mark ? kb.mark(spec, ctx, brand, { theme }) : swapBrandIcons(stage, brand, theme)
          if (m && m.seek) parts.push(m)
        }
        brandInfo = { logo: !!brand.logoUrl, card: null }
        if (brand.cta) {
          const dur = Math.max(1, Math.round(brand.cta.dur * fps)) / fps
          hold = base - 1 / fps
          const root = h('div', { id: 'brand-layer', 'data-look': kit.name, 'data-format': spec.format })
          document.body.append(root)
          // the generic card's faces (a kit card uses faces its kit already loaded)
          await Promise.all([`${theme.displayWeight} 80px ${theme.display}`, `${theme.kickerWeight} 46px ${theme.body}`, `${theme.handleWeight} 56px ${theme.body}`, "800 100px 'Inter Full'"]
            .map(f => document.fonts.load(f, 'Aa@≈').catch(() => null)))
          const n0 = sfx.length
          const opts = { t0: base, dur, hold, root, theme }
          let made = kb.cta ? kb.cta(spec, ctx, brand, opts) : null
          const generic = !made
          if (generic) made = brandCard(spec, ctx, brand, opts)
          if (!sfx.slice(n0).some(c => c.t >= base - 0.1 && c.t <= base + 0.6)) ctx.cue(base, 'whoosh', { dur: 0.32, gain: 0.55 })
          card = made
          layer = root
          t0Card = base
          duration = base + dur
          brandInfo = { logo: !!brand.logoUrl, card: generic ? 'generic' : 'kit', t0: base, dur }
        }
      }
      for (const x of spec.sfx || []) sfx.push(x)
      sfx.sort((a, b) => a.t - b.t)
      // safe-zone overlay for debugging
      const ov = h('div', { id: 'safe-overlay' },
        h('i', { style: { left: 0, top: 0, width: '1080px', height: SAFE.top + 'px', background: 'rgba(255,45,85,.28)' } }),
        h('i', { style: { left: 0, top: SAFE.bottom + 'px', width: '1080px', height: H - SAFE.bottom + 'px', background: 'rgba(255,45,85,.28)' } }),
        h('i', { style: { left: SAFE.railX + 'px', top: SAFE.railY + 'px', width: W - SAFE.railX + 'px', height: SAFE.bottom - SAFE.railY + 'px', background: 'rgba(255,45,85,.28)' } }),
        h('i', { style: { left: 0, top: SAFE.captionTop + 'px', width: SAFE.railX + 'px', height: SAFE.bottom - SAFE.captionTop + 'px', background: 'rgba(255,214,10,.18)' } }),
      )
      stage.append(ov)
      // every image (the logo in the mark and on the card) is decoded before the first frame
      await Promise.all([...document.images].map(i => i.decode().catch(() => null)))
      state = { duration, base, fps, sfx, brand: brandInfo }
      STUDIO.seek(0)
      return state
    },
    seek(t) {
      // during the end card, the teaser holds its last frame underneath
      const tk = card && t > hold ? hold : t
      for (const p of parts) p.seek && p.seek(tk)
      if (card) {
        // before the card the whole layer is out of the render tree: those frames are the teaser's own, pixel for pixel
        const on = t >= t0Card - 1e-6
        css(layer, { display: on ? 'block' : 'none' })
        card.seek(t)
      }
    },
    debug(on) { document.getElementById('safe-overlay')?.classList.toggle('on', !!on) },
    info: () => state,
  }
  window.STUDIO = STUDIO
  window.dispatchEvent(new Event('studio-ready'))
  return STUDIO
}
