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
  hero: 168,                     // Anton hero counter (top bar)
  heroIcon: 116,                 // unit icon beside the hero counter
  unitCounter: 56,               // Anton "× 1 cup" style small counter
  label1: 62,                    // Anton, green: rate / price / working (label stack line 1)
  label2: 96, label2Min: 52,     // Anton, uppercase, white: the rung (label stack line 2)
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

/**
 * The layout for a spec. Every format must take its positions from here.
 *
 *   captions on (default)          captions off (spec.captions === false or no vo)
 *   top bar     0-680              0-680
 *   stage       680-1096           680-1236
 *   label stack 1112-1308          1252-1472  (HD Guy grammar: the label stack is the caption)
 *   captions    1322-1478          -
 *
 * opts.hero = false      no hero counter row: the footer moves up to y 446 and the stage starts at 510
 * opts.stageBottom = y   move the stage/label split (e.g. 1300 for a tall table); the label stack takes what is
 *                        left above the caption band (L.label.h can get small; check it)
 * The verdict slot is the bottom 196 px above the caption band (1112-1308, or 1276-1472); when the stage reaches
 * into it, the verdict gets a black backing (L.verdict.boxed).
 */
export function layoutFor(spec = {}, opts = {}) {
  const { hero = true, stageBottom } = opts
  const captions = spec.captions !== false && Array.isArray(spec.vo) && spec.vo.length > 0
  const top = hero ? 680 : 510
  const limit = captions ? 1308 : 1472                       // lowest y for the label stack / verdict
  const sb = Math.round(Math.min(limit, Math.max(top + 200, stageBottom ?? (captions ? 1096 : 1236))))
  const L = {
    captionsOn: captions,
    brand: { x: 60, y: 150, size: 46 },                       // decoration (data-deco), y < 230
    header: { x: 60, y: 244, w: 960, h: 190 },                // header band 240-440; text bottom-aligned in it
    hero: hero ? { y: 444, h: 168, w: 960 } : null,           // hero counter row (top bar)
    footer: { y: hero ? 616 : 446, h: 50, w: 960 },           // assumption line, last row of the top bar
    topBar: { y0: 0, y1: top },
    stage: { x: 0, y: top, w: W, h: sb - top },
    label: { y: sb + 16, h: Math.max(0, limit - sb - 16), w: 800 },
    caption: captions ? { y: 1322, h: 156, w: 800 } : null,  // caption band 1320-1480, x 140-940
    bottomBar: { y0: sb, y1: H },
  }
  // inner box where piles, charts and panels live (kept inside x 140-940 so nothing hides under the rail)
  L.inner = { x: 140, y: L.stage.y + 20, w: 800, h: L.stage.h - 36 }
  L.verdict = { y: limit - 196, h: 196, w: 800, boxed: limit - 196 < sb }
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
