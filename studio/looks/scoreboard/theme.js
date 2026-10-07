// Scoreboard look: design tokens. Every format imports these; never hard-code a colour, font or slot position.
// Source: research/v2/03-look-directions.md, Direction 3 (palette, type, layout grid), adapted to the studio safe zones.

// ---------- palette ----------
export const C = {
  bar: '#000000',          // top and bottom letterbox bars
  stage: '#0E1116',        // the middle band
  grid: '#171C24',         // stage grid lines (60 px)
  edge: '#1E2530',         // hairline where a bar meets the stage
  green: '#2BFF88',        // money / invested / positive / the hero number
  greenDeep: '#0B3D24',    // green at low intensity (panel fills, bar tracks)
  yellow: '#FFD23F',       // second contender (races, duels)
  red: '#FF4D5E',          // loss, cost, debt, crash bands (bands at 18-22% opacity)
  white: '#FFFFFF',        // labels
  grey: '#9AA4B2',         // footer, axis text, secondary
  dim: '#6B7584',          // tertiary (never for must-read text on the stage)
  panel: '#07090C',        // scoreboard panel fill
  panelLine: '#232B36',    // scoreboard panel border
  iconBody: '#E9EDF2',     // unit icons: body
  iconShade: '#AEB8C6',    // unit icons: second surface
  iconDark: '#1A2029',     // unit icons: screens, windows, wheels
}

/** tone (spec "tone") -> colour */
export const TONE = { good: C.green, bad: C.red, goal: C.green, neutral: C.white }

// ---------- type ----------
// 'Inter Full' is the symbol fallback in every stack so ≈ × ÷ − → always render.
export const F = {
  display: "'Anton', 'Inter Full', sans-serif",       // header, hero numbers, label stack, tip labels, verdict
  ui: "'Inter', 'Inter Full', sans-serif",            // footer, axis, small labels
  tight: "'Inter Tight', 'Inter Full', sans-serif",   // captions
  mono: "'JetBrains Mono', 'Inter Full', monospace",  // optional working lines
}

/** px sizes at 1080x1920 */
export const SIZE = {
  header: 72, headerMin: 46,     // Anton, uppercase, fitted to the header band
  hero: 168,                     // Anton hero counter (top bar; 140 with captions on: use L.hero.size)
  heroIcon: 116,                 // unit icon beside the hero counter (100 with captions on: L.hero.icon)
  unitCounter: 56,               // Anton "× 1 cup" style small counter
  label1: 62,                    // Anton, green: rate / price / working (label stack line 1; 54 with captions on)
  label2: 96, label2Min: 52,     // Anton, uppercase, white: the rung (label stack line 2; 72 / 48 with captions on)
  footer: 40,                    // Inter 600, grey: the assumption line
  caption: 50,                   // Inter Tight 800: VO captions
  tip: 48,                       // Anton: line-tip labels in races
  axis: 30,                      // Inter 600: axis ticks (decoration only)
  verdict: 92, verdictMin: 50,   // Anton: the closing line
  panelLabel: 40,                // Inter 700 uppercase: scoreboard panel label
  panelValue: 120,               // Anton: scoreboard panel value
  year: 120,                     // Anton: big year counter in race mode
}

// ---------- layout grid ----------
// The frame is three bands: a black top bar (brand, header, hero counter, footer), the stage (dark, 60 px grid),
// and a black bottom bar (label stack, then captions). x is centred on 540; below y 820 readable text stays in
// x 140-940 (centred, 800 wide) so it never reaches the right button rail.
export const W = 1080, H = 1920, CX = 540

// ---------- text measuring (canvas: fonts are loaded before mount, so this is exact enough for planning) ----------
let measureCtx = null
const measureCache = new Map()
/** width in px of a plain string in a CSS font ("600 40px 'Inter', 'Inter Full', sans-serif") */
export function measureText(text, font) {
  const key = font + '|' + text
  if (measureCache.has(key)) return measureCache.get(key)
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d')
  measureCtx.font = font
  const w = measureCtx.measureText(String(text)).width
  measureCache.set(key, w)
  return w
}
const plainOf = str => String(str || '').replace(/\*\*|__/g, '')

// ---------- the footer (assumption line / working line) ----------
export const FOOT = { px: 40, lh: 48, w: 960 }
const footFont = px => `600 ${px}px 'Inter', 'Inter Full', sans-serif`
/**
 * How one footer text is set: one line at 40 px when it fits 960 px; otherwise two lines at 40 px, broken at the
 * " · " nearest the middle (else after a comma, else at the space nearest the middle); a side still too wide shrinks
 * both (34 px floor).
 * Returns { lines: [markup strings], px }.
 */
export function footerPlan(text, w = FOOT.w) {
  const str = String(text || '')
  if (!str) return { lines: [], px: FOOT.px }
  const wid = (s, px) => measureText(plainOf(s), footFont(px))
  if (str.includes('\n')) {
    const lines = str.split('\n').slice(0, 2)
    let px = FOOT.px
    while (px > 34 && Math.max(...lines.map(l => wid(l, px))) > w - 4) px -= 1
    return { lines, px }
  }
  if (wid(str, FOOT.px) <= w - 4) return { lines: [str], px: FOOT.px }
  // candidate breaks: at each " · " (preferred) and at each space; markup never spans the break
  const half = wid(str, FOOT.px) / 2
  const open = x => ((x.match(/\*\*/g) || []).length % 2) + ((x.match(/__/g) || []).length % 2)
  const cands = []
  for (const [sep, cost, keep] of [[' · ', 0, ''], [', ', 120, ','], [' ', 240, '']]) {
    const parts = str.split(sep)
    for (let i = 1; i < parts.length; i++) {
      const a = parts.slice(0, i).join(sep) + keep, b = parts.slice(i).join(sep)
      if (open(a)) continue
      const widest = Math.max(wid(a, FOOT.px), wid(b, FOOT.px))
      cands.push({ lines: [a, b], widest, score: Math.abs(wid(a, FOOT.px) - half) + cost })
    }
  }
  if (!cands.length) cands.push({ lines: [str], widest: wid(str, FOOT.px), score: 0 })
  const fit = cands.filter(c => c.widest <= w - 4)
  const best = fit.length ? fit.reduce((a, b) => (b.score < a.score ? b : a)) : cands.reduce((a, b) => (b.widest < a.widest ? b : a))
  let px = FOOT.px
  while (px > 34 && Math.max(...best.lines.map(l => wid(l, px))) > w - 4) px -= 1
  return { lines: best.lines, px }
}
/** every footer text a spec shows (spec.footer + lookOpts.footerSteps) */
export const footerTexts = spec => [spec.footer, ...((spec.lookOpts && Array.isArray(spec.lookOpts.footerSteps)) ? spec.lookOpts.footerSteps.map(x => x && x.text) : [])].filter(Boolean)
/** rows the footer needs: 0 (no footer), 1 or 2 */
export const footerRows = spec => Math.max(0, ...footerTexts(spec).map(t => footerPlan(t).lines.length))

/**
 * The layout for a spec. Every format must take its positions from here.
 *
 *   captions off (spec.captions === false or no vo): the HD Guy layout
 *     header 244-434 · hero 444-612 (168 px) · footer 616-666 (two-line footer: 616-712) · stage 680 (726)-1236
 *     label stack 1252-1472 (the label stack is the caption)
 *   captions on: a compact top bar, so the stage (the spectacle band) stays tall
 *     header from 244, as tall as its lines need at 64 px (a hook breaks only at \n) · hero 140 px under it ·
 *     footer under the hero · stage from ≈ 595 (2-line header) to 1130 · label stack 1146-1308 (l1 54 px, l2 72 px)
 *     · captions 1322-1478
 *
 * opts.hero = false      no hero counter row: the footer sits under the header and the stage starts under it
 * opts.stageBottom = y   move the stage/label split (e.g. 1300 for a tall table); the label stack takes what is
 *                        left above the caption band (L.label.h can get small; check it)
 * L.verdict is the kit's one verdict slot, at the foot of the frame: the label slot when it has room (>= 150 px),
 * else the bottom 196 px above the caption band, over the foot of the stage (L.verdict.boxed: a black band rises
 * there to carry it). The header band only ever holds the hook.
 * L.hero.size / L.hero.icon: the hero counter and icon sizes; L.type: the label stack sizes for this layout.
 */
export function layoutFor(spec = {}, opts = {}) {
  const { hero = true, stageBottom } = opts
  const captions = spec.captions !== false && Array.isArray(spec.vo) && spec.vo.length > 0
  const hLines = Math.max(1, String(spec.header || '').split('\n').length)
  const fRows = footerRows(spec)
  const footH = fRows >= 2 ? 2 * FOOT.lh + 2 : 50
  let header, heroBox = null, footer, top
  if (captions) {
    const hh = Math.min(190, Math.round(hLines * 64 * 1.04) + 4)
    header = { x: 60, y: 244, w: 960, h: hh, px: 64 }
    let y = 244 + hh
    if (hero) { heroBox = { y: y + 10, h: 140, w: 960, size: 140, icon: 100 }; y = heroBox.y + heroBox.h + 4 } else y += 6
    footer = { y, h: footH, w: 960, rows: fRows }
    top = Math.round(y + (fRows ? footH : 0) + 12)
  } else {
    header = { x: 60, y: 244, w: 960, h: 190, px: 72 }
    if (hero) heroBox = { y: 444, h: 168, w: 960, size: 168, icon: 116 }
    footer = { y: hero ? 616 : 446, h: footH, w: 960, rows: fRows }
    top = (hero ? 680 : 510) + (fRows >= 2 ? footH - 50 : 0)
  }
  const limit = captions ? 1308 : 1472                       // lowest y for the label stack / verdict
  const sb = Math.round(Math.min(limit, Math.max(top + 200, stageBottom ?? (captions ? 1130 : 1236))))
  const L = {
    captionsOn: captions,
    brand: { x: 60, y: 150, size: 46 },                       // decoration (data-deco), y < 230
    header,                                                   // header band 240-440; text bottom-aligned in it
    hero: heroBox,                                            // hero counter row (top bar)
    footer,                                                   // assumption line, last row of the top bar
    topBar: { y0: 0, y1: top },
    stage: { x: 0, y: top, w: W, h: sb - top },
    label: { y: sb + 16, h: Math.max(0, limit - sb - 16), w: 800 },
    caption: captions ? { y: 1322, h: 156, w: 800 } : null,  // caption band 1320-1480, x 140-940
    bottomBar: { y0: sb, y1: H },
    limit,
    type: captions ? { l1: 54, l2: 72, l2Min: 48 } : { l1: 62, l2: 96, l2Min: 52 },
  }
  // inner box where piles, charts and panels live (kept inside x 140-940 so nothing hides under the rail)
  L.inner = { x: 140, y: L.stage.y + 20, w: 800, h: L.stage.h - 36 }
  const vh = Math.min(196, limit - sb - 8)
  L.verdict = vh >= 150 ? { y: limit - vh, h: vh, w: 800, boxed: false } : { y: limit - 196, h: 196, w: 800, boxed: true }
  return L
}

// ---------- motion grammar (seconds) ----------
export const M = {
  slam: 0.22,       // label / verdict slam-in (scale 1.16 → 1 with a small overshoot)
  slamFrom: 1.16,
  fade: 0.08,       // opacity ramp that rides with a slam
  rollMin: 0.8,     // counter roll, small jumps
  rollMax: 1.9,     // counter roll, big jumps
  rollFinal: 2.4,   // the biggest number (last rung)
  fall: 0.30,       // one icon's drop
  squash: 0.24,     // landing squash and settle
  regrid: 0.42,     // a pile re-packing into smaller cells
  bump: 0.36,       // landing pulse on a counter (scale 1 → 1.09 → 1)
  bumpAmp: 0.09,
  capIn: 0.14,      // caption line rise-in
  hold: 3.0,        // default hold after the last beat
}
