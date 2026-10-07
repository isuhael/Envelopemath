// Design tokens for the "becker-rig" look. Every format imports these; nothing hard-codes a colour or a size.
// Rule of the look: ONE saturated hero colour (green) on a neutral light void. Maths, props and tools are ink.
// Coin yellow is reserved for money objects (coins, the final "gold" number). Red only for losses / costs.

export const C = {
  void: '#F7F8FA',      // stage background (the "void")
  floor: '#DFE3E9',     // floor gradient (radial, from the bottom)
  ink: '#111418',       // maths, props, tools, primary text
  hero: '#12B76A',      // the figure, growth fills, brand disc. Shapes only: too light for text on the void (2.5:1)
  heroInk: '#0A9254',   // hero colour for TEXT (3.8:1 on the void): **emphasis**, good numbers
  heroSoft: '#D5F2E3',  // pale hero tint (fills behind green text, trails)
  coin: '#FFD34D',      // coins, the final "gold" number, money objects
  coinDeep: '#E2AE1C',  // coin rim / inner ring
  red: '#E5484D',       // losses, costs, debt (__second emphasis__); OK as text (3.7:1)
  redSoft: '#FBE1E2',
  grey: '#5B6470',      // secondary text (working lines, column heads, footers) 5.6:1
  dim: '#6B7480',       // not-yet-reached labels (4.5:1)
  caption: '#3A414B',   // captions
  line: '#C9CED6',      // guides, empty slots, dashed rungs (decoration only, never text)
  lineSoft: '#E3E7EC',
  white: '#FFFFFF',
}

// Font stacks. 'Inter Full' is the symbol fallback in every stack so ≈ × ÷ − → always render.
export const F = {
  head: "'Inter Tight', 'Inter Full', sans-serif",     // headers, numbers as objects, labels (800-900)
  mono: "'JetBrains Mono', 'Inter Full', monospace",   // working lines, formulas, footers (700-800)
  body: "'Inter', 'Inter Full', sans-serif",
}

// Type scale (px). Primary text 60-90, must-read >= 40, nothing readable < 34.
export const T = {
  header: 84,       // hook, fitted down to headerMin
  headerMin: 56,
  hero: 96,         // one focal number on its own
  primary: 64,      // table values, results
  big: 72,
  label: 44,        // labels next to numbers
  small: 40,        // must-read floor: column heads, footers, notes
  floor: 34,        // absolute floor (repeating labels only)
  caption: 54,
  verdict: 64,
}

// Layout grid (1080 x 1920). Mirrors runtime SAFE.
export const L = {
  W: 1080, H: 1920,
  left: 60, right: 1020, railX: 940, railY: 820,   // readable x range; x <= 940 below y 820
  brandY: 120,                                      // brand mark (decoration, y < 230)
  headerTop: 248, headerBottom: 440,                 // hook band
  footerTop: 452,                                    // assumption line (just under the hook)
  workTop: 520, workBottom: 1290,                    // working area
  floorY: 1300,                                      // the ground line the figure stands on
  capTop: 1320, capBottom: 1480,                     // caption / verdict band
  capCX: 500, capW: 860,                             // caption block is centred on x 500, 860 wide (x 70-930)
  gutter: 24,
}

// Stroke system: one uniform weight family, round caps everywhere.
export const S = {
  figure: 13,     // limbs + torso of the figure at scale 1
  prop: 10,       // posts, rails, gate frames
  rung: 8,
  thin: 4,        // floor line, guides
  dash: '10 10',
}

// The figure's proportions at scale 1 (px). Head : body ~ 1 : 4. Standing height ~ 262 px.
export const RIG = {
  headR: 31, neck: 6, torso: 88, shoulder: 0.8,   // shoulder: arms attach at 80% of the torso (below the neck)
  upperArm: 50, foreArm: 47,
  thigh: 57, shin: 54,
}

// Motion timing (seconds). Hold, then snap: transitions are short, holds are long.
export const M = {
  snap: 0.12,        // 3-4 frames: a pose snap
  move: 0.28,        // a normal pose-to-pose move
  antic: 0.18,       // anticipation before an action
  land: 0.32,        // squash-and-settle after an impact
  shake: 0.28,       // screen-shake decay
  breathe: 2.8,      // idle breathing period
}

// tone -> colours. text: safe as text on the void; fill: for shapes/bars; soft: pale background.
export const TONE = {
  good:    { text: C.heroInk, fill: C.hero, soft: C.heroSoft },
  bad:     { text: C.red, fill: C.red, soft: C.redSoft },
  goal:    { text: C.ink, fill: C.coin, soft: '#FFF3C4' },
  neutral: { text: C.ink, fill: C.line, soft: C.lineSoft },
}
export const tone = (t) => TONE[t] || TONE.neutral
