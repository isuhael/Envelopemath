// Browser runtime shared by every look kit.
//
// Contract: a kit page loads this module and calls defineKit(). That installs window.STUDIO:
//   STUDIO.mount(spec) -> { duration, fps, sfx: [{ t, kind, ...opts }] }   builds the DOM once
//   STUDIO.seek(t)                                                          sets every visual for time t (seconds)
// seek(t) must be a pure function of t: the renderer may call it out of order (stills, linting).

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

// ---------- kit definition ----------
/**
 * defineKit({
 *   name: 'clean-sheet',
 *   formats: {
 *     'dead-simple-list': (spec, ctx) => ({ duration, seek(t) {} }),
 *     ...
 *   },
 *   chrome?: (spec, ctx) => ({ seek(t) {} }),   // brand mark, captions, footer shared by every format in the kit
 * })
 * ctx = { stage, spec, cue(t, kind, opts), fmt helpers... }
 */
export function defineKit(kit) {
  let parts = [], state = null
  const STUDIO = {
    kit: kit.name,
    formats: Object.keys(kit.formats),
    mount(spec) {
      const stage = document.getElementById('stage')
      stage.innerHTML = ''
      stage.dataset.look = kit.name
      stage.dataset.format = spec.format
      const sfx = []
      const ctx = {
        stage, spec,
        cue: (t, kind, opts = {}) => { if (t != null && isFinite(t)) sfx.push({ t: +t.toFixed(3), kind, ...opts }) },
      }
      const make = kit.formats[spec.format]
      if (!make) throw new Error(`look "${kit.name}" has no format "${spec.format}" (has: ${Object.keys(kit.formats).join(', ')})`)
      const body = make(spec, ctx)
      const chrome = kit.chrome ? kit.chrome(spec, ctx, body) : null
      parts = [body, chrome].filter(Boolean)
      const duration = spec.duration || body.duration
      if (!(duration > 0)) throw new Error('format did not report a duration')
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
      state = { duration, fps: spec.fps || 30, sfx }
      STUDIO.seek(0)
      return state
    },
    seek(t) {
      for (const p of parts) p.seek && p.seek(t)
    },
    debug(on) { document.getElementById('safe-overlay')?.classList.toggle('on', !!on) },
    info: () => state,
  }
  window.STUDIO = STUDIO
  window.dispatchEvent(new Event('studio-ready'))
  return STUDIO
}
