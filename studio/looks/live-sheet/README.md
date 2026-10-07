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

Formats: `find-your-row` is **built** (the flagship). `dead-simple-list`, `what-difference`, `chart-race`, `pov-race`,
`ledger-duel`, `growth-ladder` and `cost-counter` are **stubs** (they draw the chrome plus "TODO <id>"). Each one is
replaced by editing only `formats/<id>.js` and adding `samples/<id>.json`; nothing shared needs to change.

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
| `active` | `#2E90FA` | Selection outline, fill handle, caret |
| `rowHi` | `#FFF3A3` | Highlighted row (pick, winner), landing flash |
| `ink` / `slate` / `mute` | `#101828` / `#344054` / `#667085` | Cell text: key and result columns / middle columns / sub-labels |
| `good` / `bad` | `#058A4F` / `#D92D20` | Result text on the sheet (green is a shade darker than the mockup's `#039855` so it stays ≥ 3.9:1 on `rowHi`) |
| `accent` / `accentInk` | `#FFD60A` / `#0D0E11` | The yellow, and text on it |
| `accentBad` | `#B42318` | `__x__` inside the yellow banner |
| `text` / `textMute` / `textDim` | `#FFFFFF` / `#98A2B3` / `#7A8394` | Text straight on the surround: captions / footer, brand / axis on dark |
| `goodDark` / `badDark` | `#32D583` / `#FF6B5B` | Good (green) and bad (coral) on the surround |
| `panel` / `panelLine` | `#16181D` / `#2A2E37` | A raised dark panel, if a format needs one |
| `series` | `#1570EF`, `#101828`, `#7A5AF8`, `#E04F16` | Chart lines without a tone |

`toneColor(tone, surface)` maps `good | bad | goal | neutral` to a colour, with `surface` = `'sheet'` (default) or
`'dark'`. On the sheet, `goal` is ink text on a yellow cell: `toneFill('goal')` = `accent`, and every other tone has
no fill. Markup emphasis is the same everywhere: `**x**` is yellow (a marker behind ink text on white, yellow text
on dark, a dark pill with yellow text inside the yellow banner), and `__x__` is red (coral on dark).

## 2. Type (`F`, `S`)

Font stacks always end in `'Inter Full'` so `≈ × ÷ − →` render: `F.ui` (Inter), `F.mono` (JetBrains Mono),
`F.tight` (Inter Tight). Every number uses tabular figures (`#stage` sets `tnum`).

| Use | Face | Size (px) |
|---|---|---|
| Question card (header) | Inter 900, `-0.018em` | 64, fitted down to 44; author line breaks kept |
| Formula bar | JetBrains Mono 700 (800 when it shows a verdict) | 42; down to 40; else 2 lines at 40 |
| Column label / sub-label (`"Label\nsub"`) | Inter 800 / Inter 600 mute | 42 / 40 |
| Cells at a 102 px row: input / middle / result | Inter 800 / 700 / 800 | 56 / 52 / 60, scaled with row height by `cellSizes(rowH)`, never below 40 |
| Captions | Inter 800 uppercase | 68 (48 minimum for one long word) |
| Verdict card | Inter 800 | 56, fitted down to 42 |
| Footer (assumption line) | Inter 600 | 40 (wraps to 2 balanced lines rather than shrinking) |
| Tooltip strip | Inter 800 | 42, down to 40 |
| Big counter cell | Inter 900, `-0.02em` | 150, shrunk to fit its widest value |
| Row numbers, column letters, chart axes | Inter 600, `data-deco` | 30 / 32 |

**Rule:** nothing a viewer reads is under 40 px. The linter computes size from `rect.height / offsetHeight`, so
any scale below 1 on text, or a sub-pixel translate on 40 px text, shows up as a warning. Animate text with scale
≥ 1 (see `snapIn`) and whole-pixel translates (`dropIn`, `rowShift` already round).

## 3. Layout grid (`G`)

The composition axis is the card column, x 60-960 (`G.left`, `G.right`, width 900, centre `G.cx` = 510). The right
80 px stays empty for the platform's button rail. Below y 820, right-aligned values end at x 938 (`G.textRight`).

| y | What |
|---|---|
| 150-190 | Brand mark: line-icon envelope + "back of the envelope" (`data-deco`) |
| 240-416 | Yellow question card (`G.bannerTop`, `G.bannerH`), radius 26 |
| 444- | Sheet / chart card top (`G.cardTop`) |
| 444-520 | Formula bar (`G.fbarH` 76): ≈ chip at x 76-142, text from x 162 |
| +40 | Column letters A B C (`G.lettersH`) |
| +76 or +116 | Label row (1 or 2 lines) |
| ... | Data rows, 102 px max (`maxRowH`), 52 px min (`minRowH`); gutter of row numbers 64 px (`G.gutter`); cell padding 22 px |
| card bottom + 14 | Footer (assumption line) |
| ≤ 1300 | Bottom of the working area when the caption band is in use (`G.workBottom`) |
| 1320-1480 | Caption band: captions, or the verdict card (`G.bandTop`, `G.bandBottom`) |
| ≤ 1476 | Bottom of everything when the band is free (dense tables) |

## 4. Motion grammar (`M`)

The camera never moves and there are no cuts. Only cells, the selection, the formula bar, highlight fills and the
tooltip strips move. Nothing slides linearly except counters and typing.

| Beat | How | Token |
|---|---|---|
| Formula types | 24 characters a second, blue caret solid while typing, blinking (1.1 s) when idle. Frame 1 is already mid-formula (a word boundary near 70%) | `M.cps`, `M.blink` |
| A value lands | **Snap**: it appears at 116% and settles to 100% (ease out, 0.24 s), with a 0.35 s `rowHi` flash on its cell. Within a row, cells land 0.08 s apart, left to right | `snapIn`, `M.drop`, `M.flash` |
| Rows fill | The selection is a range with a fill handle that drags down as each row lands, and its row numbers and column letters turn blue | `sheet.select`, `headSel` |
| The biggest result | Counts up over 0.8 s (ease out), lands exactly on its display string, then settles from 110% | `countText`, `M.count` |
| A pick | The selection springs onto one cell (ease back, 0.36 s). The row's yellow wipes in from the left, then a slot opens under the row (the rows below make room) and a dark tooltip pops out of its notch; its text arrives once it is full size | `M.pick`, `tipStrip` |
| Payoff | The formula bar erases and retypes the verdict (ink, 800) as the ≈ chip pops, or a verdict card lands in the caption band with its marker wiping in. Meanwhile the result column flashes top to bottom | `verdictCard` |
| Loop | The last 0.5 s clear back to the frame-1 state (bottom rows first), so the last frame matches the first | `M.loopOut` |

**Sound** (`ctx.cue`, one cue per real event): `type` while the formula types (with `dur`), `tick` (gain ~0.6) per
row landing, `roll` (with `dur`) under a count-up and `pop` when it lands, `pop` + `reveal` on a pick, `ding` on the
verdict (the chrome cues it for band verdicts), `swipe` (gain 0.5) on the loop clear.

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
  from the setters' value caches. Set every property you ever change on every call (a value set at t = 5 must be
  unset when the linter jumps back to t = 1).
- Displayed numbers come from spec display strings. A counter interpolates (`countText(display, p)` keeps the
  string's prefix, suffix, decimals and grouping) and returns the exact display string at p = 1.
- Frame 1 (t = 0) shows the header and at least one number. Content with `t <= 0` should be in place at frame 1.
- **The chrome is automatic.** `kit.js` builds it after the format: brand mark, question card, footer, captions and
  verdict. Steer it with the `chrome` object your format returns:

| Hint | Meaning | Default |
|---|---|---|
| `footer: { top \| bottom, x, w }` or `false` | Where the assumption line goes (stage px), or `false` to draw it yourself (`footer()`) | `{ bottom: 1300 }` |
| `captions: false` | No captions (use it when your content needs the caption band) | on when `spec.vo` exists and `spec.captions !== false` |
| `captionBox: { top, bottom, x, w }` | Move the caption band | 1320-1480 |
| `verdict: 'band' \| 'self'` | Verdict card in the caption band, or you draw it (e.g. in the formula bar) | `'band'` |
| `verdictBox: { top, bottom, x, w }` | Move the verdict card | the caption band |
| `captionHidden(t)` | Extra condition that hides captions | none |
| `loop: { t0, dur }` | The loop-out window: the verdict card fades out in it | none |

  Captions hide automatically while the band verdict shows. Plan your layout with `hasCaptions(spec)`,
  `footerHeight(spec.footer)` and the band rules: when the band is in use, keep content above `G.workBottom` minus
  the footer.

## 6. lib.js API

Everything below is a named export of `lib.js` (alongside everything from `core.js` and `theme.js`). Coordinates
are stage px unless noted.

### Text and numbers
- `mk(str)`: markup to HTML (`**x**` becomes `<em><span>`, `__x__` becomes `<u class="mark2"><span>`, `\n` becomes `<br>`). Use it instead of
  `core.markup` whenever emphasis paints a background: the inner span keeps the linter's contrast check honest.
- `parseMarkup(str)` returns `[{ text, k }]` (k 0 plain, 1 primary, 2 second). `markupWords(str)` returns styled words.
- `mkLen(str)`, `typedMk(str, n)` (first n graphemes as HTML, emphasis kept), `typedCount(t, t0, str, { cps, from })`,
  `typeDur(str, { cps, from })`, `wordCut(str, f)` (a word boundary near fraction f), `caretOn(t, typing)`.
- `textW(html, font, { letterSpacing, transform })` gives the rendered width; `font(weight, px, family = F.ui)` builds the shorthand.
- `isNumeric(str)`: should this cell right-align?
- `parseDisplay(str)` returns `{ pre, n, dp, post, grouped }`; `countText(display, p, { from })`; `displayValue(str)` (for
  comparisons only).

### Motion helpers
- `snapIn(p, from = 1.16)` / `dropIn(p, dist)` / `liftOut(q)` return `{ opacity, transform }` for a value entering or leaving.
- `popScale(p, from)` (ease back; can undershoot, so do not use it on text that has to stay ≥ 40 px), `flashAlpha(t, t0, dur)`,
  `step(t, t0, dur, e)`, `lerpRect(a, b, p)`, `rgba(hex, a)`.

### Spec helpers
- `durationOf(spec, { beats, hold, min = 5, max = 90 })`: last beat + hold, at least the last vo line end + 0.4 s and
  verdict.t + 2.5 s.
- `hasCaptions(spec)`, `voEnd(spec, i)`, `opt(spec, key, default)` (reads `spec.lookOpts`), `layer(ctx, cls)`.

### Chrome pieces (used by `chrome()`; call them yourself only when you opt out of the chrome's copy)
- `brandMark(parent)`, `banner(parent, header)` (returns `{ el, txt, px }`), `footerHeight(text, w)`,
  `footer(parent, text, { x, w, top | bottom })` (returns `{ el, top, bottom }`).
- `captions(parent, spec, box)` returns `{ seek(t, { hidden }) → showing }`. Each vo line splits into the fewest balanced
  chunks of ≤ 4 words that fit one line (`chunkWords`), timed by length; a trailing full stop is dropped.
- `verdictCard(parent, verdict, box)` returns `{ seek(t, { out }) → showing }`.
- `chrome(spec, ctx, body)`: the kit's chrome (see §5).

### `formulaBar(parent, { x, y, w, ht, px, lines, standalone })`
Returns `{ el, chip, txt, caret, set(html, { caret }), type(t, t0, str, { cps, from, caret }) }`. Size it with
`fitFormula(strings, w)`, which returns `{ px, lines, ht }`. `sheet()` and `bigCell()` build their own.

### `sheet(parent, opts)`, the spreadsheet card
Options: `x, y, w`; `columns: [{ label, kind: 'input'|'mid'|'output', tone, align, emph }]` (kind defaults: column 0
input, `emph` output, others mid; a label's `\n` starts the grey sub-label); `values` (rows × cols display strings,
used to size columns and choose alignment); `rows`; `bottom` (the card's lowest edge; rows get what fits, clamped
to `minRowH`-`maxRowH`, 52-102) or `rowH`; `reserve` (px of empty sheet under the data, e.g. a tooltip slot);
`spare` (extra empty rows); `formula: false | { strings }`; `letters: true | false | 'auto'`; `startRow` (2).

Returns:
- Geometry: `x, y, w, h, bottom, rowH, fs { input, mid, result }, nR, spare, gutter, bodyTop, headTop, labelH`;
  `cols[j] = { x, w, kind, align }`. Elements: `el, body, over, fbar, labelEls, letterEls, rowEls, numEls, cells`.
- `cell(r, c)` returns `{ el, v }`; `cellRect(r, c, dy)`; `rangeRect(r0, r1, c0, c1, dyFn)` (r1 exclusive, fractional
  allowed: the fill-handle drag); `rowTop(r, dy)`.
- Per-frame setters:
  - `setCell(r, c, { text | html, p, out, flash, color, fill, scale, enter })` sets the content, entrance progress
    `p` (0 hidden, 1 settled; `enter` is `'snap'` by default, or `'drop'`), loop-clear `out`, flash alpha, colour and
    fill overrides, and a settle `scale` (≥ 1).
  - `rowShift(r, dy)` moves a row (whole px).
  - `hiRow(r, alpha, wipe)` highlights a row; `wipe` sweeps the yellow in from the left.
  - `select(rect | null, { handle, alpha })` places the selection.
  - `headSel(r0, r1, c0, c1)` tints the headers (pass `null`s for none).

### `tipStrip(sheet, { px })`, the pick tooltip
`set({ x0, x1, y, ht, open, scale, notchX, html, textAlpha })`: `open` opens the slot (shift the rows below by
`ht × open` yourself), `scale` pops the pill out of its notch, and `textAlpha` should stay 0 until the pill is full size.

### `lineChart(parent, opts)`, a spreadsheet chart (for chart-race and pov-race)
Options: `x, y, w, ht`; `surface: 'sheet' | 'dark'`; `pad { l, r, t, b }`; `xr`, `xEvery`, `xFmt`; `yr`, `yTicks`,
`yFmt`, `log`; `series [{ points, color | tone, width, area, dash }]` (area fill on the first series only, unless
set); `events [{ x }]`. Returns `{ el, svg, plot, box, X(v), Y(v), valueAt(i, x), events, paths, yRange,
draw(xNow, { yMax, yMin }) → tips [{ x, y, v, color }] }`. `draw` reveals every series up to `xNow` (interpolating
the last segment) and can rescale y for every frame. Axis labels are decoration (32 px, `data-deco`). The readable
numbers are the format's own tip labels (≥ 40 px, inside x 60-940, kept apart from each other).

### `bigCell(parent, opts)`, one enormous cell (for cost-counter)
Options: `x, y, w, valueH (230), spareH (44), label, formula, final` (the widest string it will show; sets the font
size), `tone, col, row`. Returns `{ el, h, bottom, value, fbar, px, cell, sel, label, cellRect(), set(text, { flash, scale, color }) }`.

### `stub(spec, ctx, id)`
The placeholder the unbuilt formats use.

## 7. find-your-row (built)

The flow:
- Frame 1 shows the question card, the formula bar mid-typing, and every row's key (column A) in place, so each viewer finds their row (R3, R9). The output cells are empty, except rows whose time is ≤ 0, which are pre-filled so a money answer shows at 0.0 s (R1).
- The fill handle drags down the output columns; each row snaps in with a flash and a tick.
- The biggest result counts up if it lands after frame 1.
- Each pick springs the selection onto that row's result, wipes the row yellow, and opens a tooltip strip under it.
- The verdict is retyped into the formula bar or shown as a card in the caption band, while the result column flashes top to bottom.
- The final 0.5 s clear back to frame 1.

Layout is automatic:
- Rows take what fits between the formula bar and either the caption band (when captions or a band verdict need it) or y 1476.
- When rows would fall under 58 px, the decorative A B C row is dropped.
- A tooltip slot is reserved when there are picks.
- `verdict: 'auto'` puts the verdict in the band if rows stay ≥ 62 px with the band reserved; otherwise it goes into the formula bar.

Data contract: FORMATS.md §2.
- Column 0 is the key.
- `emph` marks the result column (default: the last). It is green by default; `columns[i].tone` (`bad`, `goal`, …) or `lookOpts.emphTone` overrides that.
- Labels may carry a `\n` sub-label (the operation, e.g. `"Per year\n× 2,080 hrs"`).

| lookOpts | Default | Effect |
|---|---|---|
| `loop` | `true` | Clear back to frame 1 over the last 0.5 s |
| `countUp` | `true` | The biggest result counts up (when it lands after t = 0) |
| `letters` | `'auto'` | Column letters: `true`, `false` or `'auto'` |
| `verdict` | `'auto'` | `'band'` (card in the caption band) or `'formula'` (retyped in the formula bar) |
| `emphTone` | `'good'` | Tone of the result column (`columns[i].tone` wins). `goal` is ink text with the yellow fill on the biggest cell only |
| `formulaAt0` | `0.7` | How much of the formula is already typed at frame 1 |

Captions plus more than about 8 rows will not fit at 40 px. Dense tables (9-14 rows) should run with
`"captions": false`, which is the format's own guidance (silent or near-silent).

Samples:
- `samples/find-your-row.json`: 14 rows, silent, 2 picks, formula-bar verdict.
- `samples/find-your-row-rent.json`: 6 rows, 2-line labels, captions, a count-up, 1 pick, band verdict (the mockup's table).
- `samples/find-your-row-card.json`: 8 rows, text values, a red result column, no picks, a band verdict without captions, `__x__` in the banner.

## 8. How the other formats should use the kit

These are suggestions, so the kit reads as one system:
- **dead-simple-list**: a `sheet` whose rows are the items (row numbers carry the "1. 2. 3." slots, empty at frame 1). Columns: label (input), formula (mid, typed with `typedMk`), result (output, tone). The formula bar shows the item being worked; the input badge can go in the formula bar or in the label row.
- **what-difference**: a `sheet` with one row per option and one column per metric. The stake goes in the formula bar. `delta` lands as a tooltip strip, and the winner row gets `hiRow` with a wipe at `verdict.t`.
- **chart-race / pov-race**: `lineChart` on a white card (y 444 to about 1200), with tip counters as the format's own labels next to `tips[i]`. Show the leader's tip in a yellow-marker label and the laggard in ink. The stake goes in the formula bar (a standalone `formulaBar`) or a label row. Rescale y with `draw(x, { yMax })` for a growing axis.
- **ledger-duel**: a `sheet` with year, then person A, then person B. Both output columns land together (same `t0`); a crash row gets `hiRow` with a `bad` tint or a tooltip strip, and the winner column is selected at the verdict.
- **growth-ladder**: a `sheet` with the spec's columns. Rows unmask at `rowT`, and the last row counts up (`countText`) with `hiRow` when `highlightLast` is set.
- **cost-counter**: a `bigCell` with the label, `rateDisplay` in its formula bar, and the counter. Milestones flash the cell and appear as tooltip-like rows or a small sheet under it.

## 9. Checklist before you hand a format back

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
