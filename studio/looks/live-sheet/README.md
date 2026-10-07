# Live Sheet: the look kit

**Pitch.** A designed spreadsheet on near-black. The formula bar shows the back-of-the-envelope working, the rows
fill one by one, and one yellow accent points at the answer. It is our own UI, not Excel chrome: no ribbon, no
Microsoft styling, and the "fx" chip becomes "≈".

Source of truth: `research/v2/03-look-directions.md` (Direction 2: Live Sheet, and §3.0 shared foundation), plus the
mockups `research/v2/look-mockups/d2-frame1.png` and `d2-payoff.png`. Spec contract: `studio/FORMATS.md`.

| File | What it holds |
|---|---|
| `index.html` | Page skeleton: fonts, `runtime/base.css`, `style.css`, `kit.js` |
| `kit.js` | `defineKit({ name: 'live-sheet', formats, chrome })`. Imports every format, injects each format's `css` export once, and preloads every font face before any text is measured |
| `theme.js` | Design tokens: `C` colour, `F` font stacks, `S` sizes, `G` layout grid, `M` motion, plus `toneColor`, `toneFill`, `cellSizes` |
| `lib.js` | Shared components (sheet, formula bar, tooltip strip, chart, big cell, banner, footer, captions, verdict, chrome) and helpers. **Re-exports the whole runtime (`core.js`) and `theme.js`**, so a format imports everything from `'../lib.js'` |
| `style.css` | The classes `lib.js` uses (`ls-*`). Formats add their own CSS through their `css` export |
| `formats/<id>.js` | One module per format |
| `samples/<id>*.json` | Sample specs (`"sample": true`) |

All eight formats are **built**: `find-your-row`, `dead-simple-list`, `what-difference`, `chart-race`, `pov-race`,
`ledger-duel`, `growth-ladder` and `cost-counter` (§7). `split-sheet` and `unit-ladder` are not part of this kit.

---

## 1. Palette (`C` in theme.js)

The surround is near-black. Content sits on white sheet cards. There is **one loud accent, yellow**, and it always
means "this is the point": the question card, the ≈ chip, the highlighted row, the marker behind a key word, a
caption keyword. Green and red mean good and bad and nothing else. Blue is only the selection.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#0D0E11` | Surround (the stage background) |
| `sheet` | `#FFFFFF` | Sheet card, chart card, verdict card |
| `grid` | `#E4E7EC` | Gridlines (2 px) |
| `head` / `headText` | `#F2F4F7` / `#7B8496` | Row numbers and column letters (decoration) |
| `headSel` / `headSelText` | `#E3EDFC` / `#1570EF` | Headers of the selected rows and columns |
| `fbar` / `fbarText` | `#F4F5F7` / `#344054` | Formula bar |
| `inputHead` | `#D1FADF` | Mint: the input (key) column header |
| `outputHead` | `#FFE4C2` | Peach: the output (result) column header |
| `midHead` | `#F2F4F7` | Any other column header |
| `active` | `#2E90FA` | Selection outline, fill handle, caret. **The selection has no tint** (`activeTint` is `transparent`): a blue wash turned every yellow answer under it khaki, so the brand yellow (`#FFD60A`) and `rowHi` (`#FFF3A3`) always render exactly |
| `rowHi` | `#FFF3A3` | Highlighted row (pick, winner), landing flash |
| `ink` / `slate` / `mute` | `#101828` / `#344054` / `#667085` | Cell text: key and result columns / middle columns / sub-labels |
| `good` / `bad` | `#058A4F` / `#D92D20` | Result text on the sheet (green is a shade darker than the mockup's `#039855` so it stays ≥ 3.9:1 on `rowHi`) |
| `accent` / `accentInk` | `#FFD60A` / `#0D0E11` | The yellow, and text on it |
| `accentBad` | `#B42318` | `__x__` inside the yellow banner |
| `text` / `textMute` / `textDim` | `#FFFFFF` / `#98A2B3` / `#7A8394` | Text straight on the surround: captions / footer, brand / axis on dark |
| `goodDark` / `badDark` | `#32D583` / `#FF6B5B` | Good (green) and bad (coral) on the surround and in dark tooltips |
| `panel` / `panelLine` | `#16181D` / `#2A2E37` | A raised dark panel, if a format needs one |
| `series` | `#1570EF`, `#101828`, `#E04F16`, `#7A5AF8` | Chart lines without a colour: blue, ink, orange, purple (three rivals never share a hue family) |
| `amber` | `#B54708` | A gold-like series (a yellow line would read as the accent). chart-race: `lookOpts.colors: { "Gold": "#B54708" }` |

`toneColor(tone, surface)` maps `good | bad | goal | neutral` to a colour, with `surface` = `'sheet'` (default) or
`'dark'`. On the sheet, `goal` is ink text on a yellow cell: `toneFill('goal')` = `accent`, and every other tone has
no fill. Markup emphasis is the same everywhere: `**x**` is yellow (a marker behind ink text on white, yellow text
on dark, a dark pill with yellow text inside the yellow banner), and `__x__` is red (coral on dark).

## 2. Type (`F`, `S`)

Font stacks always end in `'Inter Full'` so `≈ × ÷ − →` render: `F.ui` (Inter), `F.mono` (JetBrains Mono),
`F.tight` (Inter Tight).

**Tabular figures only on numbers.** `base.css` turns them on for the whole stage; `style.css` turns them off again
and back on for `.ls-cell`, `.ls-fline`, `.ls-bigv`, `.ls-axis` and `.ls-num`. A cell whose text is not a number gets
`.words` (sheet's `setCell` does it per frame) and proportional figures: Inter's `tnum` also spaces out hyphens
("full - time"). A hyphenated word never breaks at its hyphen (`.ls-nb`, added by `mk()`), and `≈ × ÷` are glued
to the number after them, so no line ends on a lone "≈".

| Use | Face | Size (px) |
|---|---|---|
| Question card (header) | Inter 900, `-0.018em`, line-height 1.16 | 64, fitted down to 44; author line breaks kept. `**x**` is an inline-block dark pill sized to the glyph band (it clears the descenders of the line above by ≥ 4 px) |
| Formula bar (the working) | JetBrains Mono 700 | 42; down to 40; else 2 lines at 40 |
| Formula bar (a verdict typed into it) | Inter 800, ink | 52 → 40 on one line; else 2 lines (48 → 40) broken at a seam, and the bar grows to hold them from the verdict on (`fitBarVerdict`) |
| Column label / sub-label (`"Label\nsub"`) | Inter 800 / Inter 600 mute | 42 → 40 / 40, then wrap (balanced) |
| Cells at a 102 px row: input / middle / result | Inter 800 / 700 / 800 | 56 / 52 / 60, scaled with row height by `cellSizes(rowH)`, never below 40 |
| A value's trailing words ("55 **months**") | Inter 700 | 40 (`unitHTML`, sheet `units`), so the number keeps the size |
| Captions | Inter 800 uppercase | 68 (48 minimum for one long word) |
| Verdict card | Inter 800 | 56, fitted down to 42; the card hugs its (balanced) lines and centres on the column |
| Footer (assumption line) | Inter 600 | 40 (wraps balanced rather than shrinking; `footerHeight` measures the real height, 3 lines included) |
| Tooltip strip | Inter 800 | 42 → 40 on one line, else two lines at a seam (`fitTips`) |
| Big counter cell | Inter 900, `-0.02em` | 150 (190 for a lone counter), shrunk to fit its widest value |
| Row numbers, column letters, chart axes | Inter 600, `data-deco` | 30 / 32 |

**Rule:** nothing a viewer reads is under 40 px. The linter computes size from `rect.height / offsetHeight`, so
any scale below 1 on text, or a sub-pixel translate on 40 px text, shows up as a warning. Animate text with scale
≥ 1 (see `snapIn`) and whole-pixel translates (`dropIn`, `rowShift` already round).

## 3. Layout grid (`G`)

The composition axis is the card column, x 60-960 (`G.left`, `G.right`, width 900, centre `G.cx` = 510). The right
80 px stays empty for the platform's button rail. Below y 820, right-aligned values end at x 938 (`G.textRight`);
in a sheet's last column they end at x 920 (`HANDLE_PAD`, 18 px), clear of the fill handle.

| y | What |
|---|---|
| 150-190 | Brand mark: line-icon envelope + "back of the envelope" (`data-deco`) |
| 240-416 | Yellow question card (`G.bannerTop`, `G.bannerH`), radius 26 |
| 444- | Sheet / chart card top (`G.cardTop`) |
| 444-520 | Formula bar (`G.fbarH` 76): ≈ chip at x 76-142, text from x 162 |
| +40 | Column letters A B C (`G.lettersH`) |
| +76 or more | Label row (1-4 lines, measured) |
| ... | Data rows, 102 px max (`maxRowH`), 52 px min (`minRowH`; 48-50 in dense silent cards); gutter of row numbers 64 px (`G.gutter`); cell padding 22 px (12 px in a card too dense for 22) |
| card bottom + 14 | Footer (assumption line) |
| ≤ 1300 | Bottom of the working area when the caption band is in use (`G.workBottom`) |
| 1320-1480 | Caption band: captions, or the verdict card (`G.bandTop`, `G.bandBottom`) |
| ≤ 1476 | Bottom of everything when the band is free (dense tables) |

**Where the verdict goes (every format).** When `spec.verdict` exists, the card is planned to stop above the caption
band (G.workBottom minus the footer) and the verdict lands there as a card. Only when that would push the rows under
about 50 px (a 14-row table, a duel of 12 years) does the card run down to y 1476 and the verdict get retyped into
the formula bar instead, in Inter 800 (§2). Charts use the same rule with a 420 px chart; a lone counter with 150 px.

**Tooltip slots.** A pick, mark, note or event opens a slot under its row: the rows below move down and **the card
grows by the slot** while it is open (sheet `grow` + `setGrow`), pushing the assumption line with it (chrome
`footerShift`). The slot is planned into the layout but never drawn as empty sheet at frame 1. Under the last row
the card keeps a small un-numbered tail (16-30 px: the gutter strip, no gridlines), so a selection never sits on
the rounded corner.

**The fill handle** sits on the selection's bottom-right corner, straddling the bottom gridline (below the values'
baseline, so it never reads as a full stop after a number). At the card's right edge it tucks inside horizontally
(the last column's `HANDLE_PAD` keeps it clear of the value). A single-cell selection that moves cell by cell
(what-difference, cost-counter's kept row) shows no handle.

## 4. Motion grammar (`M`)

The camera never moves and there are no cuts. Only cells, the selection, the formula bar, highlight fills and the
tooltip strips move (and a card's bottom edge while a slot is open).

| Beat | How | Token |
|---|---|---|
| Formula types | 24 characters a second, blue caret solid while typing, blinking (1.1 s) when idle. Frame 1 is already mid-formula (a word boundary near 70%) | `M.cps`, `M.blink` |
| A value lands | **Snap**: it appears at 116% and settles to 100% (ease out, 0.24 s), with a 0.35 s `rowHi` flash on its cell. Within a row, cells land 0.08 s apart, left to right | `snapIn`, `M.drop`, `M.flash` |
| Rows fill | The selection is a range with a fill handle that drags down as each row lands, and its row numbers and column letters turn blue | `sheet.select`, `headSel` |
| The biggest result | Counts up over 0.8 s (ease out), lands exactly on its display string, then settles from 110%. A caption that names that number waits for the count to land (chrome `captionHolds`) | `countText`, `M.count` |
| A pick / mark / note / event | The selection springs onto one cell (ease back, 0.36 s). The row's yellow wipes in from the left; the slot opens under the row (0.3 s); then the dark pill **wipes out of its notch** (its width grows both ways, 0.24 s) with its label already in place at full size and full opacity. It closes the same way back into the notch, then the slot closes | `M.pick`, `tipWindow`, `tipStrip` |
| Payoff | A verdict card lands in the caption band with its marker wiping in, or the formula bar erases and retypes the verdict (Inter 800, ink) as the ≈ chip pops. Meanwhile the result column flashes top to bottom | `verdictCard`, `fitBarVerdict` |
| Loop | The last 0.5 s clear back to the frame-1 state (bottom rows first), so the last frame matches the first | `M.loopOut` |

**Captions** (`chunkWords`): each vo line is cut into 1-4 word chunks that read as phrases. A chunk never runs on
past a full stop, "?", "!" or ":" (a break there is forced); a break after a comma is cheap; a chunk never ends on a
function word ("the", "your", "that's") or splits a number from its unit ("$5 a day"); fewer, fuller chunks win.
A chunk's closing full stop is dropped. Hidden captions park empty.

**Sound** (`ctx.cue`, one cue per real event): `type` while the formula types (with `dur`), `tick` (gain ~0.6) per
row landing, `roll` (with `dur`) under a count-up and `pop` when it lands, `pop` + `reveal` on a pick, `ding` on the
verdict (the chrome cues it for band verdicts), `swipe` (gain 0.5) on the loop clear.

**Durations.** `durationOf(spec, { beats, hold, verdictEnd, loop })`: the last beat + hold, at least the last vo
line's end + 0.4 s, and at least 2.5 s of a complete verdict (a card at verdict.t + 0.4, a bar verdict when its
typing ends) plus the 0.5 s loop clear.

## 5. Writing a format module

```js
// formats/<id>.js
import { layer, sheet, durationOf, hasCaptions, opt, setStyle, prog, ease, mk, G, M, C } from '../lib.js'

export const css = `/* optional: format-only CSS, injected once. Prefix classes with the format id. */`

export default function (spec, ctx) {
  const d = spec.data || {}
  const L = layer(ctx, 'my-format')            // a full-stage layer under the chrome
  // 1. build all DOM once (sheet(), lineChart(), bigCell(), your own h() elements)
  // 2. cue sounds once: ctx.cue(t, 'tick')
  const duration = durationOf(spec, { beats: [/* last beat times */], hold: d.hold ?? 3 })
  return {
    duration,
    chrome: { /* optional hints, see below */ },
    seek(t) { /* set EVERY visual for time t with setStyle / setText / setHTML / attr, and the components' setters */ },
  }
}
```

- **`css` name clash.** A module exports `css` (a string), so it cannot also import the runtime's `css()` setter.
  Use **`setStyle(el, styles)`** (the same cached setter, re-exported by lib.js).
- `seek(t)` is a pure function of t: no timers, no `Math.random` (use `rng(seed)`), no state between calls apart
  from the setters' value caches. Set every property you ever change on every call, **hidden elements included**: a
  hidden element parks at one fixed state (empty text, zero box), so the DOM at t never depends on the frames seeked
  before it. (Checked for every sample and spec by a purity probe: seek forward vs seek from elsewhere, DOM equal.)
- Displayed numbers come from spec display strings. A counter interpolates (`countText(display, p)` keeps the
  string's prefix, suffix, decimals and grouping) and returns the exact display string at p = 1.
- Frame 1 (t = 0) shows the header and at least one number. Content with `t <= 0` should be in place at frame 1.
- **The chrome is automatic.** `kit.js` builds it after the format: brand mark, question card, footer, captions and
  verdict. Steer it with the `chrome` object your format returns:

| Hint | Meaning | Default |
|---|---|---|
| `footer: { top \| bottom, x, w }` or `false` | Where the assumption line goes (stage px), or `false` to draw it yourself (`footer()`) | `{ bottom: 1300 }` |
| `footerShift(t)` | Px the assumption line moves down this frame (a card growing while a slot is open) | none |
| `captions: false` | No captions (use it when your content needs the caption band) | on when `spec.vo` exists and `spec.captions !== false` |
| `captionBox: { top, bottom, x, w }` | Move the caption band | 1320-1480 |
| `captionHolds: [{ text, t }]` | A caption chunk naming `text` (a count-up's display string) waits until t | none |
| `verdict: 'band' \| 'self'` | Verdict card in the caption band, or you draw it (e.g. in the formula bar) | `'band'` |
| `verdictBox: { top, bottom, x, w }` | Move the verdict card | the caption band |
| `captionHidden(t)` | Extra condition that hides captions | none |
| `loop: { t0, dur }` | The loop-out window: the verdict card fades out in it | none |

  Captions hide automatically while the band verdict shows. Plan your layout with `hasCaptions(spec)`,
  `footerHeight(spec.footer)` and the band rule (§3).

## 6. lib.js API

Everything below is a named export of `lib.js` (alongside everything from `core.js` and `theme.js`). Coordinates
are stage px unless noted.

### Text and numbers
- `mk(str)`: markup to HTML (`**x**` becomes `<em><span>`, `__x__` becomes `<u class="mark2"><span>`, `\n` becomes
  `<br>`; hyphenated words are kept whole, `≈ × ÷` glued to their number). Use it instead of `core.markup` whenever
  emphasis paints a background: the inner span keeps the linter's contrast check honest. Do not put its output
  straight into a flex container (flex items drop the space after an inline element): wrap it in a span.
- `parseMarkup(str)` returns `[{ text, k }]` (k 0 plain, 1 primary, 2 second). `markupWords(str)` returns styled words.
- `mkLen(str)`, `typedMk(str, n)` (first n graphemes as HTML, emphasis kept), `typedCount(t, t0, str, { cps, from })`,
  `typeDur(str, { cps, from })`, `wordCut(str, f)` (a word boundary near fraction f), `caretOn(t, typing)`.
- `textW(html, font, { letterSpacing, transform })` gives the rendered width; `font(weight, px, family = F.ui)` builds the shorthand.
- `isNumeric(str)`: should this cell right-align? `hasUnits(str)`: does a value carry words after its number?
- `unitHTML(str, brAt)`: a value's HTML with its trailing words at 40 px (`.ls-u`).
- `twoLines(str, wOf, avail)`: break a string onto two lines at its best seam (author break, " · ", ": ", " vs ",
  " = ", " → ", ", ", then any space; never splitting markup or leaving an operator at a line end).
- `parseDisplay(str)` returns `{ pre, n, dp, post, grouped }`; `countText(display, p, { from })`; `displayValue(str)` (for
  comparisons only).

### Motion helpers
- `snapIn(p, from = 1.16)` / `dropIn(p, dist)` / `liftOut(q)` return `{ opacity, transform }` for a value entering or leaving.
- `popScale(p, from)` (ease back; can undershoot, so do not use it on text that has to stay ≥ 40 px), `flashAlpha(t, t0, dur)`,
  `step(t, t0, dur, e)`, `lerpRect(a, b, p)`, `rgba(hex, a)`.

### Spec helpers
- `durationOf(spec, { beats, hold, min = 5, max = 90, verdictEnd, loop = true })` (§4).
- `hasCaptions(spec)`, `voEnd(spec, i)`, `opt(spec, key, default)` (reads `spec.lookOpts`), `layer(ctx, cls)`.

### Chrome pieces (used by `chrome()`; call them yourself only when you opt out of the chrome's copy)
- `brandMark(parent)`, `banner(parent, header)` (returns `{ el, txt, px }`), `footerHeight(text, w)` (measured),
  `footer(parent, text, { x, w, top | bottom })` (returns `{ el, top, bottom }`).
- `captions(parent, spec, box, holds)` returns `{ seek(t, { hidden }) → showing }` (§4).
- `verdictCard(parent, verdict, box)` returns `{ seek(t, { out }) → showing }`.
- `chrome(spec, ctx, body)`: the kit's chrome (see §5).

### `formulaBar(parent, { x, y, w, ht, px, lines, standalone, verdict })`
Returns `{ el, chip, txt, caret, line, vfit, set(html, { caret }), type(t, t0, str, { cps, from, caret }),
verdictStyle(on, grow) }`. Size it with `fitFormula(strings, w)`, which returns `{ px, lines, ht }` (leave the verdict
out of `strings`). Pass `verdict` when the verdict is retyped into this bar: `vfit` (= `fitBarVerdict(verdict, w)`,
`{ text, px, lines, ht }`) says how to type it (type `vfit.text`, which carries the seam's "\n"), and
`verdictStyle(on, grow)` switches the bar between the working (mono 700, slate) and the verdict (Inter 800, ink;
`grow` 0..1 opens a two-line verdict's extra height over the rows below). `sheet()` and `bigCell()` build their own.

### `sheet(parent, opts)`, the spreadsheet card
Options: `x, y, w`; `columns: [{ label, kind: 'input'|'mid'|'output', tone, align, emph, w, minW, px, units, group }]`
(kind defaults: column 0 input, `emph` output, others mid; a label's first `\n` starts the grey sub-label and each
further `\n` is a line of it; `w` fixes a width, `minW` sets a floor, `px` sets the column's cell size, `units` sets
trailing words at 40 px, `group` gives columns with the same key the same width); `values` (rows × cols display
strings, used to size columns and choose alignment); `rows`; `bottom` (the card's lowest edge; rows get what fits,
clamped to `minRowH`-`maxRowH`, 52-102) or `rowH`; `reserve` (px of slot room under the data); `grow` (the reserve is
not drawn: the card grows into it with `setGrow`); `spare` (extra room in rows, drawn as tail); `tail` (px of tail);
`formula: false | { strings, verdict }`; `letters: true | false | 'auto'`; `startRow` (2).

**Column widths**: every column gets at least its widest value and its label balanced over two lines at 40 px (never
less than its longest word); when that does not fit, every cell size shrinks together (never under 40 px) before any
one column gives way, then labels may take three lines, then the padding tightens to 12 px; the spare width first
puts as many labels as it can back on one line (cheapest first), then goes to the columns in proportion to their
values. The last column keeps `HANDLE_PAD`.

Returns:
- Geometry: `x, y, w, h, bottom, maxBottom` (bottom once grown), `rowH, fs { input, mid, result }, nR, tail, gutter,
  bodyTop, headTop, labelH`; `cols[j] = { x, w, kind, align, pad, padR }`. Elements: `el, body, over, sel, fbar,
  labelEls, letterEls, rowEls, numEls, cells`.
- `cell(r, c)` returns `{ el, v }`; `cellRect(r, c, dy)`; `rangeRect(r0, r1, c0, c1, dyFn)` (r1 exclusive, fractional
  allowed: the fill-handle drag); `rowTop(r, dy)`.
- Per-frame setters:
  - `setCell(r, c, { text | html, p, out, flash, color, fill, scale, enter })` sets the content, entrance progress
    `p` (0 hidden, 1 settled; `enter` is `'snap'` by default, or `'drop'`), loop-clear `out`, flash alpha, colour and
    fill overrides, and a settle `scale` (≥ 1). A non-numeric text gets `.words`.
  - `rowShift(r, dy)` moves a row (whole px). `setGrow(px)` makes the card px taller (grow mode).
  - `hiRow(r, alpha, wipe, color)` highlights a row; `wipe` sweeps the yellow (or `color`) in from the left.
  - `select(rect | null, { handle, alpha })` places the selection (whole px, never inside out).
  - `headSel(r0, r1, c0, c1)` tints the headers (pass `null`s for none).

Not in `sheet()` (a format builds them from the `ls-*` classes): a merged full-width row (what-difference's stake
and metric-label rows), a column wash (its winner), and two-line cells with a grey working line (dead-simple-list).

### Tooltips: `fitTips(labels, maxW)`, `tipWindow(openAt, closeAt)`, `tipStrip(sheet, { px, html, wrap })`
`fitTips` gives one type size for a set of labels (raw markup): one line from 42 down to 40 px, else two lines at a
seam; it returns `{ px, lines, slotH, labels, html, w }` (pill widths). `tipWindow` returns `{ open(t), reveal(t) }`,
the shared choreography (§4). `tipStrip` writes its label once; per frame call
`set({ x0, x1, y, ht, open, reveal, notchX })`: `open` opens the slot (shift the rows below by `ht × open` and grow
the card yourself), `reveal` wipes the pill out of its notch. Keep `x1` ≤ 948 so the text stays left of x 940.

### `lineChart(parent, opts)`, a spreadsheet chart (for chart-race and pov-race)
Options: `x, y, w, ht`; `surface: 'sheet' | 'dark'`; `pad { l, r, t, b }`; `xr`, `xEvery`, `xFmt`; `yr`, `yTicks`,
`yFmt`, `log`; `series [{ points, color | tone, width, area, dash }]` (area fill on the first series only, unless
set); `events [{ x }]`. Returns `{ el, svg, plot, box, X(v), Y(v), valueAt(i, x), events, paths, yRange,
draw(xNow, { yMax, yMin }) → tips [{ x, y, v, color }] }`. `draw` reveals every series up to `xNow` (interpolating
the last segment) and can rescale y for every frame. Axis labels are decoration (32 px, `data-deco`) and sit on the
left in both chart formats. The readable numbers are the format's own value cells (≥ 40 px, inside x 60-940).

### `bigCell(parent, opts)`, one enormous cell
Options: `x, y, w, valueH (230), spareH (44), label, formula, final` (the widest string it will show; sets the font
size), `tone, col, row`. Returns `{ el, h, bottom, value, fbar, px, cell, sel, label, cellRect(), set(text, { flash, scale, color }) }`.
(cost-counter builds its own card with a milestone table under the cell.)

## 7. The formats

Every format: frame 1 shows the question card, the formula bar mid-typing and at least one money number; the verdict
follows §3; the last 0.5 s clear back to frame 1 (`loop`, default true). Common lookOpts, wherever they apply:
`loop` (true), `countUp` (true), `letters` ('auto' | true | false: the decorative A B C row, dropped first when rows
get tight), `verdict` ('auto' | 'band' | 'formula'), `formulaAt0` (0.7: how much of the first formula is typed at
frame 1).

### find-your-row (`samples/find-your-row*.json`)
Every row's key (column A) is in place at frame 1 so each viewer finds their row; the first row is already filled
(`prefill`), the rest fill as the fill handle drags down; the biggest result counts up; each pick springs the
selection onto its result, wipes the row yellow and opens a tooltip under it.
- Column 0 is the key; `emph` marks the result column (default: the last), green by default (`columns[i].tone` or
  `lookOpts.emphTone` overrides; `goal` = ink with the yellow on its biggest cell only).
- Labels may carry a `\n` sub-label (the operation, e.g. `"Per year\n× 2,080 hrs"`). Values with words ("11 yrs 5 mo")
  keep their numbers big.

| lookOpts | Default | Effect |
|---|---|---|
| `prefill` | `1` | Rows already filled at frame 1, whatever `rowsT` says (the look's "row 2 is filled" rule) |
| `emphTone` | `'good'` | Tone of the result column |
| `loop`, `countUp`, `letters`, `verdict`, `formulaAt0` | | as above |

Limits: captions plus more than about 8 rows will not fit at 40 px: dense tables (9-14 rows) run with
`"captions": false` (the format's own lane), and their verdict is retyped into the formula bar. A pick label over
about 40 characters takes two lines (a taller slot).

### dead-simple-list (`samples/dead-simple-list*.json`)
The example number (`data.input`) sits in the mint header row; every item is a numbered row. Each item: the selection
slides to the row's result cell and its label drops in; the bar types the formula (each cell it references gets a
dashed outline as its number is typed); the result snaps in; the working stays on the sheet (a grey line under the
label, or a grey suffix on a one-line label) and the note opens as a tooltip. The goal item (or the last) counts up
and wipes yellow. Optional: a wrong guess struck out first, a check line typed into the bar.

**Layout tiers**, measured with the real fonts, richest first (the first that fits wins): `formula + tips` (label,
the formula as a grey line, notes as tooltips) · `formula` · `note` (the note as the grey line) · `bare + tips` ·
`bare`; each at a few sizes (label 48 → 40, result 72 → 52), the A B row dropped first, then tighter rows, then dense
rows (2-line labels at line-height 1.0). Short lists (≤ 4 items) may set a long label on three lines. **No field is
dropped**: a note no tier shows is typed into the formula bar right after its result lands ("= $2,500 × 26 =
$65,000 · not $60,000", or the note alone); the working shows as a grey line or suffix wherever a row has room.

| lookOpts | Default | Effect |
|---|---|---|
| `labels` | `'reveal'` | `'always'`: every label from frame 1 (the open-loop variant) |
| `sub` | auto | Force the grey line: `'formula'`, `'note'` or `'none'` |
| `notes` | `'auto'` | `'tip'`, `'sub'` or `'off'` (off: notes only in the formula bar) |
| `columns` | `['What', 'Answer']` | Header labels when there is no `data.input` |
| `startRow` | `1` | Number on the first item row |
| `wrongGuess` | none | `{ item, t, formula, result, strike, strikeT, resultT }` (or a list): a wrong answer lands first and is struck out in red |
| `check`, `checkT` | none | Same as `data.check` / `data.checkT`: a check line typed into the bar with a ✓ |
| `loop`, `countUp`, `verdict`, `formulaAt0` | | as above |

### what-difference (`samples/what-difference*.json`)
A comparison card, **one column per option**: row 1 is the stake as a merged mint row ("Car loan / $30,000" and its
terms); row 2 one peach header per option (its name over its behaviour); then per metric a merged grey label row
over a value row, and a last "vs <baseline>" group for the deltas. Frame 1 is the whole question (every option named,
the baseline filled); each option's working is retyped into the bar as the selection steps down its column; the
biggest delta counts up. At `verdict.t` the selection springs onto the winner's column, its header goes yellow and
its value cells wash `rowHi` top to bottom (the grey label rows stay grey). Option names and behaviours fit their
column down to 40 px (then 12 px padding) and only then wrap, a behaviour after its amount ("$293.50" / "every 2
wks"). A sparse table (1-2 metrics) sets its values up to 80 px.

| lookOpts | Default | Effect |
|---|---|---|
| `formulas` | `"= <detail>"` | The bar's working per option |
| `lever` | none | A string or `{ t, text }` retyped into the bar to say why |
| `deltaLabel` | `"vs <baseline name>"` | The delta group's label |
| `loop`, `countUp`, `letters`, `verdict`, `formulaAt0` | | as above |

Limits: 4 options give ~209 px columns: keep names short ("$150/mo") and behaviours to 2-3 words; a value wider
than its column at 40 px ("≈ $10,000") wraps after its first space.

### chart-race (`samples/chart-race*.json`)
A sheet card with an embedded chart: the year counter (mint) and one peach header per rival with its line swatch; an
optional ledger row; the chart (left value axis, dashed "money in" line, event flags on the x axis; year labels
every `data.x.tickEvery`, thinned to a coarser step when neighbours would sit closer than 24 px, never fewer than
two). On the right,
one value cell per rival rides at its tip's height: **its short name in its colour over the live value**, so a cell
never depends on a colour sliver. The cells keep the ranking (debounced) and slide past each other at a real
crossing; the leader's cell is yellow (its name turns ink) and holds the selection. Running values follow the final's
format (compact finals run at 3 significant digits) and land on the `final` strings.

| lookOpts | Default | Effect |
|---|---|---|
| `colors` | palette | A list by series, or `{ "Gold": "#B54708" }` by name (also `series[].color`) |
| `tipNames` | name before " · " | Short names for the value cells (also `series[].short`) |
| `formulaSteps` | `"= <stake>"` | `[{ t, text }]`: the bar's working over time |
| `ledger` | none | `{ columns, rows: [[label, v1, v2…]], rowT }`: a row of yearly returns under the header |
| `stakeLine` | `true` | The dashed "money in" line |
| `leadMargin`, `leadHold` | `0.004`, `0.45` | When a lead counts (share; seconds held, dated back to the crossing) |
| `loop`, `letters`, `verdict`, `formulaAt0` | | as above (auto verdict: the band unless the chart falls under 420 px) |

### pov-race (`samples/pov-race*.json`)
Year · Spent (red key line) · Owned (green key line) columns over a chart of the spend line against the owned line
(the gap tinted green or red). The live row races with the chart and lands on the final display strings; up to 3
landed years scroll up under a frozen start row; purchase rings and a price tag mark each purchase. `spend.item`
(an icon name) is not drawn in this look.

| lookOpts | Default | Effect |
|---|---|---|
| `formulaBar` | `"= <start> → ?"`, then the finals | `[{ t, text }]`: the bar's working |
| `verdict` | `'band'` | `'formula'`: retyped into the bar (keeps the chart tall in a silent short) |
| `startLabel`, `yearLabel` | `'Start'` / `'Year'` | Labels |
| `frozen`, `history` | `'auto'` | The frozen start row; how many landed years show (0-4) |
| `gap` | `true` | Tint the gap between the lines |
| `loop`, `letters`, `formulaAt0` | | as above |

### ledger-duel (`samples/ledger-duel*.json`)
Column A holds the row keys, then one peach column per person (name, and the plan as a grey sub-label broken at its
" · "). The people's columns always have the same width. Both columns fill row by row; a value that fell is red; in
each row the leader is ink and the trailer grey. An event row flashes (coral on a crash), and its event opens as a
tooltip under the row and closes before the next row lands; an event with no time for that (the last row, a summary
right after it) or no room for the slot is typed into the formula bar. The final row counts up. At the verdict the
winner's column washes yellow and its final cell takes the solid yellow.

| lookOpts | Default | Effect |
|---|---|---|
| `summary` | none | `{ label, values, t, tone }`: a totals row under the ledger |
| `formulaBar` | `data.stake` | `[{ t, text }]`: the bar's working |
| `keyLabel` | `'Year'` / none / `'When'` | Column A's label (none when every key already names it: "Age 35") |
| `eventStyle` | `'auto'` | `'tip'` or `'bar'` |
| `eventPause` | `1.4` | Extra seconds after an event row when rows have no `t` |
| `leader` | `'high'` | Who is ink in each row: `'high'`, `'low'` (a cost duel) or `false` |
| `rowLabelsAtStart` | `true` | Every key visible at frame 1 |
| `loop`, `countUp`, `letters`, `verdict`, `formulaAt0` | | as above |

Limits: 12 rows plus a three-line plan run silent with a formula-bar verdict.

### growth-ladder (`samples/growth-ladder*.json`)
The spec's columns (Year · You put in · Worth by default); rows unmask at `rowT`; the last row is taller, counts up
and wipes yellow (`highlightLast`); a caption naming the total waits for the count. Marks tint their row and open a
tooltip (or are typed into the bar when the slot does not fit).

| lookOpts | Default | Effect |
|---|---|---|
| `formulaBar` | `data.formula`, else "= amount per at rate" | `[{ t, text }]`: the working, retyped at each `t` |
| `marks` | none | `[{ t, row, tone, label }]`: yellow (good/goal) or rose (bad) row tint plus a tooltip; a good mark leaves its year cell yellow |
| `markStyle` | `'auto'` | `'tip'` or `'bar'` |
| `inputsAtStart` | `false` | The put-in column shown from frame 1 |
| `unmask` | `'values'` | `'rows'` hides the years too |
| `bars` | `false` | `true` / `'auto'`: two-tone data bars behind the Worth cells (3-column ladders) |
| `subLabels` | `false` | Column sub-labels from `data.input` |
| `loop`, `countUp`, `letters`, `verdict`, `emphTone`, `formulaAt0` | | as above |

### cost-counter (`samples/cost-counter*.json`)
Row 1 is the counter's label with the rate in ink under it (the hook's number); row 2 one giant live cell; under it a
milestone table (key, amount, "passed at"). **Frame 1 is never "$0"**: the counter starts `preroll` seconds in and
still lands exactly on `final` at `counterT[1]`; the bar's live formula ("≈ $30,800 × 1.0 s") reads the same clock.
Passing a milestone flashes and pulses the cell and wipes its row yellow. A lone counter (no milestones) gets a
taller cell and sits centred in the working area.

| lookOpts | Default | Effect |
|---|---|---|
| `preroll` | `1` | Seconds already counted at frame 1 (at most a fifth of the run) |
| `formulaSteps` | the live formula | `[{ t, text }]`: working typed into the bar at t |
| `columns`, `rows` | Milestone / Amount / Passed at | Table labels; per-milestone `{ label, amount, at }` display strings |
| `kept` | none | `{ t, label, final, startValue, tone }`: a second live row on the same clock |
| `reveal` | `false` | Rows appear only as they are passed |
| `bars` | `true` | Progress line under the next milestone |
| `tone` | `'neutral'` | Counter colour |
| `roll` | `true` | A soft meter tick under the running counter |
| `loop`, `letters`, `verdict`, `formulaAt0` | | as above (auto verdict: the band unless the counter falls under 150 px) |

## 8. Checklist before you hand a format back

```bash
cd studio
node src/cli.mjs check looks/live-sheet/samples/<id>.json            # 0 errors, 0 warnings
node src/cli.mjs sheet looks/live-sheet/samples/<id>.json --out /tmp/x
node src/cli.mjs stills looks/live-sheet/samples/<id>.json --at 0,<beats>,end --out /tmp/x
```

- Check frame 1 alone: the question card plus a number, and does it say what is being worked out?
- One focal number at a time.
- Nothing readable under 40 px, nothing right of x 940 below y 820.
- Text never scales below 100%.
- A dark element never passes over sheet text while that text is visible: the contrast rule fails it.
- Hidden elements park: seek t, seek elsewhere, seek t again, and the DOM is the same.
