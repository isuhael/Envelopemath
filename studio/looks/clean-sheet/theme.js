// Clean Sheet design tokens. Every format in this kit reads its colours, type and grid from here,
// so the look stays one system. Values come from research/v2/03-look-directions.md (Direction 1).

/** Palette (hex). Highlighters carry meaning; ink is the only text colour on them. */
export const C = {
  desk: '#17181B',       // surround
  page: '#FAF8F3',       // the sheet
  dot: '#D5DCE4',        // dot grid (decoration)
  rule: '#E3DFD4',       // hairlines, table rules, caption divider (decoration)
  ruleStrong: '#15171C', // booktabs top/bottom rule
  ink: '#15171C',        // titles, labels, results
  grey: '#6B7280',       // formulas, footer, secondary labels (4.6:1 on page)
  green: '#A7F3C1',      // result highlighter
  yellow: '#FFE066',     // input / key-number highlighter
  blue: '#A5D8FF',       // goal / final-answer highlighter
  coral: '#FFB3A7',      // cost / debt highlighter
  sand: '#ECE7DA',       // neutral highlighter (a number that is neither good nor bad)
  accent: '#2F6FEB',     // step circles, caret, "≈", check line, pointer
  accentDeep: '#1D4FC4', // "≈" and accent text sitting ON a highlighter (keeps >= 4.5:1)
  costInk: '#B42318',    // __second emphasis__ as text colour (captions) (5.6:1 on page)
  white: '#FFFFFF',
  badge: '#111111',
}

/** tone -> highlighter colour. Unknown / missing tone = the default result green. */
export const TONE = {
  good: C.green,
  bad: C.coral,
  goal: C.blue,
  neutral: C.sand,
  input: C.yellow,
  default: C.green,
}

/** Font stacks. 'Inter Full' is always the fallback so ≈ × ÷ − → render. */
export const F = {
  display: "'Archivo Black', 'Inter Full', sans-serif",       // titles, results (400 only)
  mono: "'IBM Plex Mono', 'Inter Full', monospace",          // formulas (600), check line (500)
  sans: "'Inter', 'Inter Full', sans-serif",                 // labels, footer, captions
  tight: "'Inter Tight', 'Inter Full', sans-serif",          // dense tables (600-800)
  symbol: "'Inter Full', sans-serif",                        // the ≈ glyph (weight 800)
}

/** Type scale (px at 1080x1920). Floors: 34 absolute, 40 for anything the viewer must read. */
export const SIZE = {
  title: 84, titleMin: 56,     // header (Archivo Black), 2 lines max, fitted to the header band
  footer: 40, footerMin: 36,   // assumption line (Inter 500)
  label: 46,                   // step label / row label (Inter 700)
  formula: 50,                 // typed formula (IBM Plex Mono 600)
  result: 66,                  // result on a highlighter (Archivo Black)
  final: 82,                   // goal / final answer (Archivo Black, blue)
  note: 40,                    // aside next to a result (Inter 600)
  step: 44, circle: 72,        // circled step number (Archivo Black in a 72 px ring)
  check: 40,                   // "check:" line (IBM Plex Mono 500, accent)
  caption: 48,                 // captions (Inter 700)
  verdict: 56,                 // closing line (Archivo Black)
  cell: 52, head: 40,          // tables
  brand: 30,                   // decoration
  floor: 40, min: 34,
}

/** Layout grid (px). The card bleeds under the platform UI but carries nothing readable there. */
export const GRID = {
  W: 1080, H: 1920,
  card: { x: 36, y: 96, w: 1008, h: 1728, r: 28 },
  dot: 40,                     // dot-grid pitch
  left: 84,                    // title / footer / caption left edge
  right: 996,                  // readable right edge above y 820
  rail: 940,                   // readable right edge below y 820 (use for everything in the work area)
  stepX: 90,                   // circle left edge (circle centre x = stepX + circle/2)
  textX: 192,                  // text column right of the circles
  brandY: 150,                 // brand mark top (decoration zone)
  headerTop: 252,              // header block top; header fills down to <= 440
  headerBottom: 440,
  headerW: 912,                // 84 -> 996
  workGap: 44,                 // gap between the header block (title + footer) and the work area
  workBottom: 1290,            // last y a format may use
  ruleY: 1304,                 // caption divider (decoration)
  capTop: 1324, capBottom: 1476, capW: 856, // caption band text box: x 84 -> 940
}

/** Motion grammar (seconds). Only typing, highlighter wipes, pops and the pointer glide move. */
export const MOTION = {
  typeCps: 18,       // default typing speed when a format has no duration for a line
  wipe: 0.26,        // highlighter swipe, left to right
  popDelay: 0.16,    // result text lands this long after the wipe starts (the box is ~95% drawn)
  pop: 0.22,         // result pop (scale 0.92 -> 1, ease.back)
  popFrom: 0.92,
  fade: 0.22,        // generic fade / rise
  rise: 10,          // px a fading element rises
  activate: 0.3,     // step circle fills this long before its formula types
  rest: 0.42,        // highlighter opacity of a finished, no-longer-focal result
  restIn: 0.35,      // time to settle into rest
  glide: 0.45,       // pointer glide
  hold: 2.5,         // default hold after the last beat
  clear: 0.5,        // loop: results clear back to the frame-1 state in this long
}
