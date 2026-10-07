// Live Sheet design tokens. Every format reads colours, type, layout and motion from here,
// so the whole kit stays on one palette and one grid. See README.md for the rationale.

// ---------- colour ----------
export const C = {
  // surround (the phone screen)
  bg: '#0D0E11',
  // the sheet card
  sheet: '#FFFFFF',
  grid: '#E4E7EC',          // gridlines
  head: '#F2F4F7',          // row/column header fill (A B C, 1 2 3)
  headText: '#7B8496',      // row/column header text (decoration)
  headSel: '#E3EDFC',       // header fill of the selected rows/columns
  headSelText: '#1570EF',
  fbar: '#F4F5F7',          // formula bar fill
  fbarText: '#344054',      // formula bar text
  inputHead: '#D1FADF',     // mint: input column header
  outputHead: '#FFE4C2',    // peach: output column header
  midHead: '#F2F4F7',       // any other column header
  active: '#2E90FA',        // active-cell / selection outline
  activeTint: 'transparent', // the selection has no tint: a blue wash would turn the yellow answer khaki
  rowHi: '#FFF3A3',         // highlighted row (the worked example, the pick, the winner)
  ink: '#101828',           // cell text
  slate: '#344054',         // middle-column text
  mute: '#667085',          // secondary text on the sheet
  good: '#058A4F',          // result, good (≥ 3.9:1 on white and on rowHi)
  bad: '#D92D20',           // result, cost / bad
  // the one loud accent
  accent: '#FFD60A',
  accentInk: '#0D0E11',     // text on the accent
  accentBad: '#B42318',     // __x__ inside the yellow banner
  // text straight on the surround
  text: '#FFFFFF',
  textMute: '#98A2B3',
  textDim: '#7A8394',
  goodDark: '#32D583',      // good on the surround (green)
  badDark: '#FF6B5B',       // bad on the surround (coral)
  panel: '#16181D',         // raised dark panel
  panelLine: '#2A2E37',
  // chart series (on the white chart card): blue, ink, orange, purple, so three rivals never share a hue family
  // (series[].color / lookOpts.colors / a tone override these; yellow is reserved for the accent)
  series: ['#1570EF', '#101828', '#E04F16', '#7A5AF8'],
  amber: '#B54708',         // a dark amber for gold-like series (a yellow line would read as the accent)
}

/** tone → colour. surface: 'sheet' (white card) or 'dark' (the surround). */
export function toneColor(tone, surface = 'sheet') {
  const dark = surface === 'dark'
  switch (tone) {
    case 'good': return dark ? C.goodDark : C.good
    case 'bad': return dark ? C.badDark : C.bad
    case 'goal': return dark ? C.accent : C.ink   // goal on the sheet = ink on a yellow cell (see goalFill)
    default: return dark ? C.text : C.ink
  }
}
/** background fill a tone puts behind a sheet cell (only `goal` has one). */
export const toneFill = tone => (tone === 'goal' ? C.accent : 'transparent')

// ---------- type ----------
// Every stack ends in 'Inter Full' so ≈ × ÷ − → always render.
export const F = {
  ui: "'Inter', 'Inter Full', sans-serif",
  tight: "'Inter Tight', 'Inter Full', sans-serif",
  mono: "'JetBrains Mono', 'Inter Full', monospace",
}

/** sizes in px at 1080×1920 */
export const S = {
  banner: 64, bannerMin: 44,      // yellow question card, Inter 900
  formula: 42, formulaMin: 40,    // formula bar, JetBrains Mono 700 (two lines at 40 px when one won't fit)
  label: 42, labelMin: 40,        // column labels, Inter 800
  sub: 40,                        // column sub-label (the operation), Inter 600, mute
  input: 56, mid: 52, result: 60, // cells at full row height (102 px); cellSizes() scales them
  cellMin: 40,
  caption: 68, captionMin: 48,    // captions, Inter 800 uppercase
  verdict: 56, verdictMin: 42,    // verdict card, Inter 800
  footer: 40, footerMin: 36,      // assumption line, Inter 600
  tip: 42,                        // pick tooltip, Inter 800
  deco: 30,                       // row numbers, column letters (decoration)
  brand: 32,                      // brand mark text (decoration)
  big: 150,                       // the big single-cell counter
}

/** cell font sizes for a row height (102 px = the look spec's full size) */
export function cellSizes(rowH) {
  const k = rowH / 102
  const cap = Math.max(S.cellMin, Math.floor(rowH - 12))
  const f = v => Math.min(cap, Math.max(S.cellMin, Math.round(v * k)))
  return { input: f(S.input), mid: f(S.mid), result: Math.max(f(S.input), f(S.result)) }
}

// ---------- layout grid ----------
export const G = {
  W: 1080, H: 1920,
  left: 60, right: 960, width: 900, cx: 510,   // the card column; cx = its centre (the composition axis)
  brandY: 150,                                  // brand mark, y 150-190 (decoration zone)
  bannerTop: 240, bannerH: 176,                 // yellow question card, y 240-416
  cardTop: 444,                                 // sheet card top
  workBottom: 1300,                             // bottom of the working area when the caption band is used
  bandTop: 1320, bandBottom: 1480,              // caption / verdict band
  safeBottom: 1480,
  railY: 820, railX: 940,                       // right button rail: readable x ≤ 940 below y 820
  textRight: 938,                               // right edge for right-aligned values (inside the rail)
  radius: 26, cellRadius: 0,
  gap: 14,                                      // gap between stacked blocks (card → footer)
  fbarH: 76, lettersH: 40, gutter: 64,          // formula bar, column-letter row, row-number gutter
  padX: 22,                                     // cell padding
  stroke: 2,                                    // gridline width
  selW: 4,                                      // selection outline width
}

// ---------- motion ----------
export const M = {
  cps: 24,          // formula typing speed (characters a second)
  drop: 0.24,       // a value drops into its cell
  flash: 0.35,      // highlight flash after a value lands
  move: 0.2,        // the selection moves
  pick: 0.36,       // a pick lands (spring)
  count: 0.8,       // the final / biggest cell counts up
  rowFade: 0.22,    // a row highlight fades in
  hold: 2.5,        // default hold on the finished sheet
  loopOut: 0.5,     // clear back to frame 1 so the short loops
  blink: 1.1,       // caret blink period (s)
}
