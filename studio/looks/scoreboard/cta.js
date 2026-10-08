// Scoreboard look: the channel brand (studio/brand/brand.json; contract in studio/README.md, "Brand layer").
//
//   mark  The channel logo takes the line envelope's place in the top-left brand row, at avatar size (64 px visible),
//         next to the wordmark. Called only when a logo file exists: without one the row is exactly today's.
//   cta   The end card, "the final board". The held verdict frame dims to a ghost, then one focal point at a time:
//         the logo pops in and a green ring flares off its edge (pop), a green rule wipes in and the CTA line slams
//         in under it, Anton caps like a label-stack rung (thud), then the kicker rises in the footer's grey, and only
//         once it has landed does the handle panel light and its letters roll in left to right like an odometer
//         (roll, then ding when it lands). Everything is set by t0 + 1.65 s and holds (2.5 s card: 1 s of handle hold).
//
// The logo is drawn by the runtime's brandLogo(). A logo whose corners are transparent (a finished badge with its own
// edge, like the channel's gold-ringed "em" badge) gets no ring and no resting halo; an opaque square (any background
// colour) is cropped to brand.logoShape with a thin money-green ring, so its edge reads on the black bars (probeLogo,
// logoAt below). The card's glow and flare ring take the logo's silhouette (a disc, a rounded square or a square).
import { h, css, prog, ease, clamp, brandLogo, balanceSplit } from '../../runtime/core.js'
import { C } from './theme.js'
import { slam, slamFromFor, rise, inkWidth, envelopeSVG, ax, esc } from './lib.js'

// ---------- sizes and beats (seconds after t0) ----------
export const BRAND = {
  markLogo: 64,     // visible size of the logo in the brand row (the badge itself, without its transparent margin)
  cardLogo: 250,    // visible size of the logo on the end card
  colTop: 240, colBottom: 1400, colX: 140, colW: 800,   // the card column (centred on y 820, clear of the platform UI)
  line: { max: 90, min: 60 },                          // CTA line, Anton caps
  kicker: { max: 48, min: 40 },                        // Inter 700, grey
  handle: { max: 60, min: 40 },                        // JetBrains Mono 700, green, on the lit panel
}
export const BEATS = {
  veil: 0.16,       // the held frame dims to VEIL[0] over this long, then on to VEIL[1] by veilOut
  veilOut: 1.3,
  pop: 0.06,        // the logo pops in (0.5 -> 1 with a back ease, 0.30 s)
  popDur: 0.30,
  ring: 0.22,       // the ring flares off the logo's edge as it lands (0.4 s)
  ringDur: 0.40,
  line: 0.46,       // the rule wipes in and the CTA line slams in (M.slam)
  kicker: 0.74,     // the kicker rises in (rise(): 0.18 s, opaque by 0.85, landed by 0.92)
  hand: 0.94,       // once the kicker has landed: the handle panel lights up (from hand - 0.04), its letters roll in
  rollEach: 0.26,   // one letter's roll
  rollStep: 0.02,   // stagger between letters
  landGlow: 0.2,    // the panel's glow flares as the last letter lands (1.44), and settles (by t0 + 1.64 for a 13-letter handle)
  shockIn: 0.05,    // the flare ring fades in over this long, leaving the logo's edge (scale SHOCK[0] -> SHOCK[1])
}
const SHOCK = [1.06, 1.42]   // the flare ring starts just off the logo's edge, never on top of the badge's own ring
const HALO = 0.22            // the green halo's resting alpha behind the envelope badge and a ringed square (0 for a badge)
// the held frame behind the card: it dims to a 7% ghost in B.veil, then fades on to a 2.5% whisper by the time the
// handle lands (stage text under the veil drops out of the lint: it counts at <= 7% opacity)
const VEIL = [0.93, 0.975]
const GREEN_A = a => `rgba(43, 255, 136, ${a.toFixed(3)})`

// ---------- the logo ----------
const PROBES = new Map()   // logoUrl -> probe: the same pixels always give the same answer
/**
 * How a decoded logo <img> meets its edge: { own: its corners are transparent (a finished badge that brings its own
 * edge: no ring), inset: the transparent margin around the badge, as a fraction of the size (0 when over 10%: then the
 * art is not a full-size badge), corner: the badge's corner radius as a fraction of the badge (0.5 = a disc, like the
 * "em" badge; less for a rounded-square badge), read from how far in along the diagonal the art starts, known }.
 * Read once per logo, from the pixels (same origin, so the canvas is clean).
 */
function probeLogo(url, img) {
  if (PROBES.has(url)) return PROBES.get(url)
  let res = { own: true, inset: 0, corner: 0.5, known: false }
  try {
    if (!img.complete || !img.naturalWidth) throw new Error('not decoded')
    const N = 200, cv = document.createElement('canvas')
    cv.width = cv.height = N
    const g = cv.getContext('2d', { willReadFrequently: true })
    const sq = Math.min(img.naturalWidth, img.naturalHeight)   // the centre square (object-fit: cover)
    g.drawImage(img, (img.naturalWidth - sq) / 2, (img.naturalHeight - sq) / 2, sq, sq, 0, 0, N, N)
    const d = g.getImageData(0, 0, N, N).data
    const a = (x, y) => d[(y * N + x) * 4 + 3] / 255
    const own = [a(2, 2), a(N - 3, 2), a(2, N - 3), a(N - 3, N - 3)].every(v => v < 0.1)
    let inset = 0, corner = 0.5
    if (own) {
      const mid = N >> 1
      const scan = f => { for (let i = 0; i < mid; i++) if (f(i) > 0.5) return i; return mid }
      const side = Math.min(scan(i => a(i, mid)), scan(i => a(N - 1 - i, mid)), scan(i => a(mid, i)), scan(i => a(mid, N - 1 - i))) / N
      const diag = Math.min(scan(i => a(i, i)), scan(i => a(N - 1 - i, i)), scan(i => a(i, N - 1 - i)), scan(i => a(N - 1 - i, N - 1 - i))) / N
      // a corner of radius rho (of the full size) starts rho * (1 - 1/sqrt 2) further in along the diagonal than the side
      const art = Math.max(0.2, 1 - 2 * side)
      corner = clamp((diag - side) / (1 - Math.SQRT1_2) / art, 0, 0.5)
      if (corner > 0.44) corner = 0.5
      inset = side > 0.1 ? 0 : side
    }
    res = { own, inset, corner, known: true }
  } catch (e) {
    console.warn(`scoreboard brand: could not read the logo's edge (${e.message}); it is drawn without a ring`)
  }
  PROBES.set(url, res)
  return res
}

/**
 * The logo at a VISIBLE size: brandLogo(brand, visible) with no ring, then fit() (from the first seek, after the
 * runtime has decoded every image) reads its pixels once and either
 *   - grows a badge with transparent corners, so the badge itself is `visible` px (no ring: it has its own edge), or
 *   - puts a thin money-green ring (theme.ring) on an opaque square, so any background colour has an edge on black.
 * -> { el, box (current element size), r (visible radius), own (a badge with its own edge), radius (the visible
 *    silhouette's border-radius, for a `visible`-px box: the crop for a square, the badge's own corner for a badge),
 *    fit() } | null without a logo.
 */
function logoAt(brand, visible, theme, onFit = null) {
  if (!brand || !brand.logoUrl) return null   // no logo file: the look's own mark (never probe a missing file)
  const el = brandLogo(brand, visible)
  if (!el) return null
  const img = el.querySelector('img')
  let done = false
  const lg = {
    el, box: visible, r: visible / 2, own: false, radius: el.style.borderRadius || '50%',
    fit() {
      if (done) return
      done = true
      const pr = probeLogo(brand.logoUrl, img)
      if (pr.own && !brand.logoBackground) {
        lg.own = true
        // what shows is the badge inside the crop: a circle crop or a round badge reads as a disc, else the rounder
        // of the badge's own corner and the crop's (a rounded-square badge under logoShape 'square' keeps its corner)
        const crop = el.style.borderRadius
        lg.radius = crop === '50%' || pr.corner >= 0.5 ? '50%' : Math.round(Math.max(pr.corner * visible, parseFloat(crop) || 0)) + 'px'
        lg.box = Math.round(visible / (1 - 2 * pr.inset))
        css(el, { width: lg.box + 'px', height: lg.box + 'px' })
      } else {
        // the same ring brandLogo() draws, added to the decoded element (a rebuilt <img> would need decoding again)
        el.append(h('i', { class: 'brand-logo-ring', style: { position: 'absolute', inset: '0px', borderRadius: el.style.borderRadius,
          boxShadow: `inset 0 0 0 ${Math.max(2, Math.round(visible * 0.016))}px ${theme.ring || C.green}` } }))
      }
      if (onFit) onFit(lg.box)
    },
  }
  return lg
}

/** the look's own mark as a badge, for a card without a logo: the line envelope on a panel disc in a green ring */
function envelopeBadge(size) {
  return h('div', { class: 'sbc-badge', 'data-deco': '', style: { width: size + 'px', height: size + 'px', boxShadow: `inset 0 0 0 ${Math.max(3, Math.round(size * 0.02))}px ${C.green}` } },
    envelopeSVG(Math.round(size * 0.46)))
}

// ---------- mark: the logo in the top-left brand row ----------
export function mark(spec, ctx, brand, { theme }) {
  const row = ctx.stage.querySelector('.sb-brand')
  const icon = row && row.querySelector('svg')
  if (!icon) return null
  const cy = parseFloat(row.style.top) + row.offsetHeight / 2   // the row keeps its centre line (y 173)
  const place = box => css(row, { top: (cy - box / 2).toFixed(1) + 'px', height: box + 'px' })
  const lg = logoAt(brand, BRAND.markLogo, theme, place)
  if (!lg) return null
  icon.replaceWith(lg.el)
  row.classList.add('has-logo')
  place(lg.box)
  return { seek() { lg.fit() } }
}

// ---------- cta: the end card ----------
export function cta(spec, ctx, brand, { t0, dur, root, theme }) {
  // a card shorter than 2.5 s plays its beats faster (down to 60%), so it still holds about a second at the end
  const k = clamp((dur - 0.8) / 1.7, 0.6, 1)
  const B = Object.fromEntries(Object.entries(BEATS).map(([n, v]) => [n, +(v * k).toFixed(4)]))
  const text = brand.cta || { line: '', kicker: '' }
  const veil = h('div', { class: 'sbc-veil', 'data-occlude': '' })
  const col = h('div', { class: 'sbc-col', style: { left: BRAND.colX + 'px', top: BRAND.colTop + 'px', width: BRAND.colW + 'px', height: BRAND.colBottom - BRAND.colTop + 'px' } })

  // 1. the logo (or the look's envelope badge), a glow behind it and a ring that flares off its edge. Both are the
  //    logo's VISIBLE box and silhouette: a disc for the envelope badge and a round badge, the crop (brand.logoShape)
  //    for an opaque square, the badge's own corner for a rounded-square badge
  const r = BRAND.cardLogo / 2
  const glow = h('div', { class: 'sbc-glow', 'data-deco': '', style: { width: 2 * r + 'px', height: 2 * r + 'px' } })
  const shock = h('div', { class: 'sbc-shock', 'data-deco': '', style: { width: 2 * r + 'px', height: 2 * r + 'px' } })
  const logo = h('div', { class: 'sbc-logo' })
  // the wrapper is the logo's element size; the glow and the ring are centred on the badge's visible edge
  const size = box => {
    css(logo, { width: box + 'px', height: box + 'px' })
    const radius = lg ? lg.radius : '50%'
    for (const d of [glow, shock]) css(d, { left: (box / 2 - r).toFixed(1) + 'px', top: (box / 2 - r).toFixed(1) + 'px', borderRadius: radius })
  }
  const lg = logoAt(brand, BRAND.cardLogo, theme, box => size(box))
  logo.append(glow, shock, lg ? lg.el : envelopeBadge(BRAND.cardLogo))
  size(lg ? lg.box : BRAND.cardLogo)

  // 2. the rule and the CTA line: Anton caps, white, balanced lines, 90 -> 60 px
  const rule = h('div', { class: 'sbc-rule', 'data-deco': '' })
  const line = h('div', { class: 'sbc-line' })
  // 3. the kicker (Inter 700, grey) and the handle on a lit score panel
  const kick = text.kicker ? h('div', { class: 'sbc-kicker', html: wordsNowrap(text.kicker) }) : null
  const handle = brand.handle ? h('div', { class: 'sbc-handle' }) : null
  const panel = handle ? h('div', { class: 'sbc-panel' }, handle) : null

  col.append(...[logo, rule, line, kick, panel].filter(Boolean))
  root.append(veil, col)

  // set the line: the fewest balanced lines (2, else 3) that fit 790 px at >= 60 px, as big as they fit (<= 90)
  const lineTexts = splitFit(line, text.line, BRAND.colW - 10)
  const lineFrom = slamFromFor(Math.max(...[...line.children].map(inkWidth)), BRAND.colW - 8)
  if (kick) fitKicker(kick)
  else B.hand = B.kicker   // no kicker to wait for: the handle takes its slot
  const cols = handle ? buildHandle(handle, brand.handle) : []
  const rollEnd = B.hand + Math.max(0, cols.length - 1) * B.rollStep + B.rollEach

  // sound: one cue per real event
  ctx.cue(t0 + B.pop, 'pop', { gain: 0.5 })
  if (lineTexts.length) ctx.cue(t0 + B.line, 'thud', { gain: 0.65 })
  if (cols.length) {
    ctx.cue(t0 + B.hand, 'roll', { dur: +(rollEnd - B.hand).toFixed(2), gain: 0.4 })
    ctx.cue(t0 + rollEnd, 'ding', { gain: 0.5 })
  }

  return {
    els: { veil, col, logo, glow, shock, rule, line, kick, panel, handle },
    settle: Math.max(rollEnd + B.landGlow, B.line + 0.04 + 0.35, B.ring + 0.5, B.veilOut),
    seek(t) {
      if (lg) lg.fit()
      const u = t - t0
      // the held frame dims
      const vo = u < B.veil ? VEIL[0] * ease.out(prog(u, 0, B.veil)) : VEIL[0] + (VEIL[1] - VEIL[0]) * ease.inOut(prog(u, B.veil, B.veilOut - B.veil))
      css(veil, { visibility: vo > 0 ? 'visible' : 'hidden', opacity: vo.toFixed(4) })
      // the logo pops in; its glow flares as it lands, then settles: to a soft halo behind the envelope badge or a
      // ringed square, to nothing behind a badge with its own edge (the gold ring sits clean on black)
      const q = prog(u, B.pop, B.popDur)
      const on = u >= B.pop
      css(logo, { visibility: on ? 'visible' : 'hidden', opacity: prog(u, B.pop, 0.08).toFixed(3), transform: `scale(${(0.5 + 0.5 * ease.back(q, 2.2)).toFixed(4)})` })
      const flare = u < B.ring ? prog(u, B.pop, B.ring - B.pop) : 1 - ease.out(prog(u, B.ring, 0.5))
      const rest = lg && lg.own ? 0 : HALO
      css(glow, { boxShadow: `0 0 ${(30 + 40 * flare).toFixed(1)}px ${(6 + 10 * flare).toFixed(1)}px ${GREEN_A(rest + (0.62 - rest) * flare)}` })
      // the flare ring fades in just off the logo's edge and spreads out, fading
      const sp = prog(u, B.ring, B.ringDur)
      css(shock, { visibility: u >= B.ring && sp < 1 ? 'visible' : 'hidden', opacity: (0.9 * prog(u, B.ring, B.shockIn) * (1 - sp)).toFixed(3),
        transform: `scale(${(SHOCK[0] + (SHOCK[1] - SHOCK[0]) * ease.out(sp)).toFixed(4)})` })
      // the rule wipes in, the line slams in (a hard cut, like a label-stack rung)
      css(rule, { transform: `scaleX(${ease.out(prog(u, B.line + 0.04, 0.35)).toFixed(4)})` })
      const sl = slam(u, B.line, { from: lineFrom })
      css(line, { visibility: u >= B.line ? 'visible' : 'hidden', opacity: String(sl.o), transform: `scale(${sl.s.toFixed(4)})` })
      // the kicker rises in; once it has landed, the handle panel lights up and its letters roll in left to right
      if (kick) {
        const ri = rise(u, B.kicker)
        css(kick, { visibility: u >= B.kicker ? 'visible' : 'hidden', opacity: ri.o.toFixed(3), transform: `translateY(${ri.y.toFixed(1)}px)` })
      }
      if (panel) {
        const pi = prog(u, B.hand - 0.04, 0.12)
        const lit = 1 - ease.out(prog(u, rollEnd, B.landGlow))   // a brighter glow as the last letter lands, settling
        css(panel, { visibility: u >= B.hand - 0.04 ? 'visible' : 'hidden', opacity: pi.toFixed(3), transform: `translateY(${(10 * (1 - ease.out(pi))).toFixed(1)}px)`,
          boxShadow: `0 0 ${(26 + 18 * (u >= rollEnd ? lit : 0)).toFixed(1)}px ${GREEN_A(0.38 + 0.25 * (u >= rollEnd ? lit : 0))}` })
        cols.forEach((c, i) => {
          const s0 = B.hand + i * B.rollStep
          const p = ease.out(prog(u, s0, B.rollEach))
          css(c.col, { visibility: u >= s0 ? 'visible' : 'hidden' })
          css(c.strip, { transform: `translateY(${(-p * c.n * c.lh).toFixed(2)}px)` })
        })
      }
    },
  }
}

// ---------- helpers ----------

/** text with one nowrap span per word (lines break only between words) */
function wordsNowrap(text) {
  return String(text).trim().split(/\s+/).map(w => `<span class="nb">${esc(w)}</span>`).join(' ')
}

/** set the CTA line in el: 2 balanced lines (3 if 2 can't fit at 60 px), the largest size <= 90 px that fits maxW */
function splitFit(el, text, maxW) {
  if (!String(text || '').trim()) return []
  for (const n of [2, 3]) {
    const lines = balanceSplit(text, n)
    el.innerHTML = lines.map(l => `<div>${ax(esc(l))}</div>`).join('')
    for (let px = BRAND.line.max; px >= BRAND.line.min; px -= 2) {
      css(el, { fontSize: px + 'px', lineHeight: Math.round(px * 1.06) + 'px' })
      if (Math.max(...[...el.children].map(inkWidth)) <= maxW) return lines
    }
  }
  return balanceSplit(text, 3)   // still too wide at 60 px in 3 lines: the linter will say so
}

/** the kicker on one line at 48 px if it fits (else down to 40, then two lines) */
function fitKicker(el) {
  for (const n of [1, 2]) for (let px = BRAND.kicker.max; px >= BRAND.kicker.min; px -= 2) {
    css(el, { fontSize: px + 'px', lineHeight: Math.round(px * 1.2) + 'px' })
    if (el.scrollWidth <= BRAND.colW + 0.5 && Math.round(el.scrollHeight / Math.round(px * 1.2)) <= n) return px
  }
  return BRAND.kicker.min
}

/**
 * The handle as odometer columns: each letter is a clipped column (data-roll) holding a short strip that rolls up and
 * lands on the real letter. The strip is an ordered run, like a flip board or the look's digit odometer counting up:
 * the 4-5 letters before it in the alphabet ("abcde" lands on e), the digits before a digit, and "6789" before a
 * symbol such as "@". JetBrains Mono, so every column is one advance wide and the landed handle reads as plain text.
 * -> [{ col, strip, n (rows to roll), lh }]
 */
function buildHandle(el, handleText) {
  const chars = [...String(handleText)]
  const px = clamp(Math.floor((BRAND.colW - 120) / (0.6 * chars.length)), BRAND.handle.min, BRAND.handle.max)
  const lh = Math.round(px * 1.18)
  css(el, { fontSize: px + 'px', height: lh + 'px' })
  return chars.map((ch, i) => {
    const rows = 4 + (i % 3 === 1 ? 1 : 0)
    const glyphs = [...rollRun(ch, rows), ch]
    const strip = h('span', { class: 'sbc-strip', style: { lineHeight: lh + 'px' } }, glyphs.join('\n'))
    const col = h('span', { class: 'sbc-ch', 'data-roll': '', style: { height: lh + 'px' } }, strip)
    el.append(col)
    return { col, strip, n: rows, lh }
  })
}

/** the `rows` glyphs a column rolls through before it lands on ch, in order (wrapping round the alphabet) */
function rollRun(ch, rows) {
  const runs = ['abcdefghijklmnopqrstuvwxyz', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789']
  const run = runs.find(r => r.includes(ch))
  if (ch === ' ') return Array(rows).fill(' ')
  if (!run) return Array.from({ length: rows }, (_, j) => String(10 - rows + j))   // a symbol: ...7, 8, 9, then it
  const at = run.indexOf(ch)
  return Array.from({ length: rows }, (_, j) => run[(at - rows + j + run.length * 2) % run.length])
}

export const brand = { mark, cta }
