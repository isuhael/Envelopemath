# Clean Sheet: look kit

Your rough maths, worked out step by step on a crisp off-white sheet. It is typeset, highlighted and occasionally pointed at, never hand-drawn. Source: [`research/v2/03-look-directions.md`](../../../research/v2/03-look-directions.md), Direction 1, and the stills in `research/v2/look-mockups/d1-*.png`.

| Format | File | Status (samples) |
|---|---|---|
| `dead-simple-list` | `formats/dead-simple-list.js` | flagship, done (`samples/dead-simple-list*.json`; `-pre`: a step pre-filled at frame 1) |
| `find-your-row` | `formats/find-your-row.js` | done (`samples/find-your-row*.json`) |
| `what-difference` | `formats/what-difference.js` | done (`samples/what-difference*.json`; `-3`: 4 options × 3 metrics, option 1 pre-filled) |
| `split-sheet` | `formats/split-sheet.js` | done (`samples/split-sheet*.json`; `-3`: short labels, Live / Invest / Enjoy) |
| `ledger-duel` | `formats/ledger-duel.js` | done (`samples/ledger-duel*.json`) |
| `unit-ladder` | `formats/unit-ladder.js` | done (`samples/unit-ladder*.json`; `-pre`: rung 1 pre-filled at frame 1) |

```bash
cd studio
node src/cli.mjs check  looks/clean-sheet/samples/*.json
node src/cli.mjs sheet  looks/clean-sheet/samples/dead-simple-list.json --out /tmp/kit-clean-sheet
node src/cli.mjs stills looks/clean-sheet/samples/dead-simple-list.json --at 0,1.7,end --out /tmp/kit-clean-sheet
```

Every format is one system: the same card, dot grid and brand mark, the same header / footer stack, the same type scale (Archivo Black for the numbers, IBM Plex Mono grey for the working, Inter for labels) and the same highlighter grammar (yellow input, green result, blue goal or winner, coral cost). Each format types its working, swipes and pops its results, rests earlier numbers so one number is loud at a time, and clears back to its frame-1 state for the loop. **The working stays on the sheet**: every layout engine drops notes, gaps, type size, the check line and optional extras before it lets the working go, and only an over-budget sheet falls back to typing the working into the result's place (what-difference keeps it even then wherever it fits on the name line; unit-ladder's filed rows keep their cost).

Shared rules every format follows:
- **Pre-filled beats.** A beat that lands by t ≤ 0 is part of frame 1 (the thumbnail shows it complete) and survives the loop clear, so the last frame equals frame 1. Never an empty highlighter at frame 1.
- **No unexplained colour.** A tinted row (a ledger event, a find-your-row pick) keeps its tint only while a legend line explains it; when one shared legend line moves on, the earlier tint leaves with its label.
- **One check line.** Always `check: …` in accent mono; when too long it breaks before `=` / `≈` (or an operator) and the continuation hangs under the sum.
- **≈ columns.** In a right-aligned number column every `≈` sits in one vertical line (`alignApprox`).
- **Layout engines never fall back to a fixed shape.** When nothing fits, they use the candidate that misses by the least and `console.warn` why (the linter then reports the overflow).

`lookOpts.badge` (in some production specs) is **ignored on purpose**: the mockup revision dropped the black input → output badge because it repeated the title.

---

## 1. Design system

### Palette (`theme.js` → `C`, `TONE`)

| Token | Hex | Use |
|---|---|---|
| `C.desk` | `#17181B` | surround behind the card |
| `C.page` | `#FAF8F3` | the sheet |
| `C.dot` | `#D5DCE4` | dot grid (40 px pitch, decoration) |
| `C.rule` | `#E3DFD4` | hairlines, caption divider, table row lines |
| `C.ink` | `#15171C` | titles, labels, results. The only text colour on a highlighter. |
| `C.grey` | `#6B7280` | formulas, footer, secondary labels (4.6:1 on the page) |
| `C.green` | `#A7F3C1` | **the result highlighter** (`tone: good`, the default, and `neutral` results) |
| `C.yellow` | `#FFE066` | input / key-number highlighter (`**x**` in the header, the given input, picks) |
| `C.blue` | `#A5D8FF` | goal / final answer / winner (`tone: goal`, the verdict's `**x**`) |
| `C.coral` | `#FFB3A7` | cost / debt (`tone: bad`, `__x__` in the header and verdict) |
| `C.sand` | `#ECE7DA` | neutral tint: the ledger's row cursor, a `neutral` table column. Never a landing result. |
| `C.accent` | `#2F6FEB` | step circles, caret, `≈`, check line, pointer |
| `C.accentDeep` | `#1D4FC4` | `≈` sitting on a highlighter (keeps contrast) |
| `C.costInk` | `#B42318` | `__x__` as text (captions, notes) |

`toneColor(tone)` maps `good → green`, `bad → coral`, `goal → blue`, `neutral → sand`, `input → yellow`, and anything else to green. Text on any highlighter is always ink. **Results land on green whatever their tone except `bad` (coral) and `goal` (blue)**: dead-simple-list and split-sheet map `neutral` results to green, and what-difference metrics default to green. A finished result rests at 42% of its tone, which is the only place a pale tint appears.

### Type (`theme.js` → `F`, `SIZE`)

Every stack ends in `'Inter Full'`, so `≈ × ÷ − →` always render. Numbers use tabular figures (set on `#stage`).

| Role | Family / weight | Size |
|---|---|---|
| Header (hook) | Archivo Black | 84 px, fitted down to 56 px; each `\n` line stays whole (see §3, `fitMarkup`) |
| Footer (assumption) | Inter 500, grey | 40 px (36 px minimum), 2 balanced lines at most |
| Step / row label | Inter 700, ink | 46 px |
| Formula | IBM Plex Mono 600, grey | 50 px (40 px in dense layouts) |
| Result | Archivo Black on a highlighter | 66 px; goal/final 82 px |
| Note beside a result | Inter 600, grey (`__x__` in cost red) | 40 px |
| Step number | Archivo Black in a 72 px accent ring | 44 px (never below 40 px) |
| Check line | IBM Plex Mono 500, accent | 40 px, always `check: …`; broken before `=` (else an operator) onto 2-3 lines when long, the continuation hung under the sum |
| Caption | Inter 700 | 48 px (40 px minimum), 2 lines max |
| Verdict | Archivo Black, `**x**` on blue | 56 px → 42 px; 2 lines, 3 only when a long line would otherwise drop under 42 px |
| Table head / cells | Inter Tight 700 grey caps / Archivo Black (emph, keys) or Inter Tight | 40 / 40-56 px |
| Brand tag | Inter 600, grey | 30 px (decoration) |

Floors: 34 px absolute, 40 px for anything the viewer must read, 60-90 px for the focal number. No format sets readable text below 40 px; layouts wrap, drop optional content or overflow (the linter reports it) rather than shrink further.

### Layout grid (`theme.js` → `GRID`)

| y | What |
|---|---|
| 96-1824 | the card (x 36-1044, radius 28, soft shadow), dot grid from the work area down |
| 148-192 | brand mark: line envelope + `BACK OF THE ENVELOPE` (decoration) |
| 252-440 | header, top-aligned at 252, fitted with `fitMarkup` |
| header bottom + 14 | footer (assumption line), when `spec.footer` is set |
| `page.top` → `page.bottom` (1290) | **the work area: formats draw only here** (dense layouts may start up to 14 px higher) |
| 1304 | caption divider (2 px hairline; shown when captions or a verdict exist) |
| 1324-1476 | caption band: captions, then the verdict replaces them at `verdict.t` |

`page.top` is computed: footer bottom + 44 (or header bottom + 52 with no footer). It is typically 480-600. Without captions and without a verdict, `page.bottom` extends to 1466.

x: titles, footer and captions start at 84. Circled steps sit at x 90-162 and the text column starts at `GRID.textX` = 192. Keep everything in the work area at **x ≤ 940** (`page.right`), because most of it is below y 820. Only the header may run to 996.

The footer always sits under the title, whether or not captions are on. Frame 1 therefore reads as question, then assumption, then sheet, and the caption band is never shared.

### Motion grammar (`theme.js` → `MOTION`)

Only four things move: **typing** (formulas and check lines only), the **highlighter swipe**, the **pop**, and the **pointer glide**. Results and table values never type: a whole value pops into place, so a paused frame never shows a wrong number. There are no cuts, bounces, shakes or linear slides (only counters run linearly).

| Beat | Spec |
|---|---|
| Activate a step | the circle fills (opacity + scale 0.55 → 1 with `ease.back`), 0.3 s before its formula types; the numeral turns white |
| Type | grapheme by grapheme over the spec's `typeDur` (or 18 chars/s via `typeTime()`), accent caret, which blinks while waiting |
| Swipe | the highlighter wipes left to right over 0.26 s (`ease.out`) |
| Pop | the result text lands 0.16 s after the swipe starts: scale 0.92 → 1 (`ease.back`), fast fade. A box under 44 px starts at 40/px (never under the floor) |
| Rest | a finished result that is no longer focal fades its box to 42% (`MOTION.rest`) over 0.35 s. One loud number at a time. |
| Finale | when nothing is the goal/winner, every box returns to full at the end (the cheat-sheet frame) |
| Verdict | fades up 12 px over 0.3 s, then its `**x**` swipes in on blue |
| Loop | (`lookOpts.loop`, default on) the last 0.7 s clears back to the frame-1 state: boxes retract and their figures fade with them (`hlBox.seek(…, ink)` = keep²), the working fades; pre-filled beats (t ≤ 0) stay |
| Sound | `type` while working types, `pop` per result (`tick` per table row), `ding` for the goal / winner only, `reveal` on the verdict, a soft `swipe` on the loop clear. One cue per real event. |

---

## 2. How the kit is wired

`index.html` loads fonts, `base.css`, `style.css` and `kit.js`. `kit.js`:

1. imports every format module from `./formats/<id>.js`;
2. injects each module's optional `export const css = '...'` once into a `<style>`;
3. awaits `preloadFonts()` (top-level await), so **mount-time measuring sees the real fonts**;
4. wraps each factory so `mountPage(spec, ctx)` runs **before** the format and sets `ctx.page`;
5. `defineKit({ name: 'clean-sheet', formats, chrome })`. The chrome animates captions and the verdict.

Formats should not need to edit `kit.js`, `lib.js`, `theme.js` or `style.css`: everything shared is in `lib.js`, and a format's own styles go in its module's `css` export.

### Writing a format

```js
// looks/clean-sheet/formats/<id>.js
import { h, css as style, prog, ease } from '../../../runtime/core.js'   // NOTE: rename css; `css` is our export
import { C, SIZE, GRID, MOTION, md, hlBox, landing, fadeUp, durationOf, readCheck } from '../lib.js'

export const css = `
.xx-row > * { position: absolute; }          /* prefix every class with a short format tag */
`

export default function (spec, ctx) {
  const P = ctx.page                          // { layer, top, bottom, left, textX, right, ... }
  const d = spec.data
  const root = h('div', { class: 'xx-row' })
  P.layer.append(root)                        // children of P.layer are position:absolute
  const box = hlBox({ html: md(d.total.display), tone: 'input' })
  root.append(box.el)
  style(box.el, { left: GRID.textX - 14 + 'px', top: P.top + 'px' })
  ctx.cue(2.0, 'pop')                         // cues are collected at mount: schedule them here, not in seek
  return {
    duration: durationOf(spec, 9.0, { hold: d.hold }),
    seek(t) {                                 // pure function of t: only cached setters, no state
      const L = landing(t, 2.0)
      box.seek(L.wipe, L.text)
    },
  }
}
```

Rules:
- **Build the DOM once in the factory; `seek()` only mutates** through `style()` (`css`), `setText`, `setHTML` and `attr`, or through component `seek` methods, which already use them.
- **Display strings are never re-formatted.** Pass spec strings through `md()` (which handles markup and the accent `≈`). Running counters interpolate numerically and must land exactly on the spec's display string.
- Stay inside `P.top`-`P.bottom` and x 60-940. Mark decoration (rules, icons, pointer) with `data-deco`, and an intended overlap with `data-overlap-ok`.
- Frame 1 must already show at least one number in the work area, or the header must carry it.
- Measure at mount (`getBoundingClientRect`, `fitMarkup`, `typeLine().measure()`, `hlBox().width()`, `breakLine()`). Fonts are loaded by then.
- Read the check line with `readCheck(d, LO)` (a string or `{ t, text }`, in `data` or `lookOpts`): never print a spec object directly.
- Durations: `durationOf(spec, lastBeat, { hold, tail })`. Use `tail` for an outro such as a loop clear.
- If the format does a loop reset, set `P.clear = { t0, dur }` so the chrome fades the verdict and caption with it.

---

## 3. `lib.js` API

All exports are re-exported tokens (`C, TONE, F, SIZE, GRID, MOTION`) plus the following.

### Text, tone and time

| Signature | Returns / does |
|---|---|
| `md(str)` | spec markup → HTML: `**x**` → `<em>`, `__x__` → `<u class="mark2">`, `\n` → `<br>`, every `≈` → `<span class="cs-approx">` (accent, Inter Full 800), **bound to the figure after it with a no-break space** |
| `bindApprox(str)` | `"≈ 12"` → `"≈ 12"` (what `md()` and the captions use) |
| `readCheck(d, LO)` | `{ text, t }` or `null`: the check line from `data.check` or `lookOpts.check` (a string or `{ t, text }`); `t` from `data.checkT`, `lookOpts.checkT`, then `check.t`, else `null` (the format's default). One rule kit-wide: `check: ` is prefixed when missing |
| `fitMarkup(el, str, { maxW, maxH, maxPx, minPx, lh, maxSplit = 3, maxLines, linePenalty = 8 })` | sets spec markup into `el` as explicit, unbreakable lines, as large as fits: every `\n` line stays on one line first; a line splits at its best break (balanced; never between `≈` and its figure; a highlight never spans two lines; breaks after `?` `:` `·` `,` preferred, inside a highlight or after a bare number avoided, after an article or preposition (`a an the of to in on for at by with`) nearly never) only when that buys at least `linePenalty` px. A break at ` · ` drops the dot (the line break is the separator). When only an orphaned article fits, it `console.warn`s so the spec author shortens the text. Returns `{ px, lines, fits }`. Used for the header, footer, verdict, pick labels, ledger plans and labels |
| `breakLine(parent, text, maxW, { px = 40, family, weight, maxLines = 3, hang })` | `{ text (with "\n"), lines, width }`: a typed line (check, formula) broken before `=` / `≈` (strongly preferred), else an operator, onto 2-3 lines when it is too wide; a mono `check: ` line hangs its continuation under the sum (`hang` overrides the indent); measured with a probe in `parent` |
| `alignApprox(boxes, values, refPx = 40)` | a right-aligned number column: every `≈` in one vertical line, in a slot left of the widest figure (plain values leave it empty). Sets each `hlBox`'s HTML and returns it (keep it for later `setHTML`) |
| `toneColor(tone)` | highlighter hex for `good / bad / goal / neutral / input` (default green) |
| `blink(t, period = 1)` | `true` for the first 55% of each period (caret) |
| `fadeUp(el, p, dy = 10)` | opacity `p`, rising from `dy` px below (`ease.out`), whole-pixel steps |
| `fade(el, p)` / `show(el, on)` | opacity only / `display` toggle |
| `landing(t, t0)` | `{ wipe, text }` for the standard result landing at `t0` (wipe eased; text 0..1 linear, feed it to `hlBox.seek`) |
| `pathAt(stops, t, glide = 0.45)` | pointer path: `stops = [{ t, x, y }]`, arrives at each stop at `stop.t`; returns `{ x, y, moving }` or `null` |
| `typeTime(str)` | seconds to type `str` at 18 chars/s, clamped 0.35-2.2 |
| `durationOf(spec, lastBeat, { hold = 2.5, tail = 0 })` | the latest of `lastBeat + hold`, last VO end + 0.4 and `verdict.t + 2.5`, plus `tail` |
| `preloadFonts()` | async; kit.js calls it. Formats do not need to. |

### Components

Each component builds its DOM once, returns `{ el, ... }`, and exposes setters that are safe to call every frame.

**`hlBox({ html, tone, color, px = 66, family = F.display, weight = 400, padX = 14, radius = 10, height, cls, popFrom = 0.92, retone })`**
A highlighter box: text on a tone-coloured box that wipes in. `el` is `inline-flex`/`position: relative` (inside `P.layer` it becomes absolute).
- `seek(wipe, text, rest = 0, ink = 1)`: `wipe` 0..1 (pass `landing().wipe`), `text` 0..1 (pop with back-ease), `rest` 0..1 fades the box to 42%, `ink` multiplies the figure's opacity (the loop clear passes keep², so a figure never sits on the page without its box). The pop never scales text under the 40 px floor: its start scale is `max(popFrom, 40 / px)` (a 40 px cell just fades in).
- `retone: 'goal'` adds a second background layer; `seekRetone(wipe, rest = 0)` wipes that tone over the box (a result re-marked as the winner), `setRetone(tone, color?)` changes it.
- `setTone(tone, color?)`, `setPx(px, height?)` (default height `px × 1.3`), `setHTML(html)`, `width()`; `bg`, `re`, `txt` are its layers.
- Align its text with a text column at x: `left = x - 14 × √(px/66)`.

**`typeLine({ text, suffix = '', px = 50, color = C.grey, family = F.mono, weight = 600, cls })`**
A typed line with an accent caret (`white-space: pre`, so a `"\n"` from `breakLine` is a line break). `seek(p, caretOn)`, `setPx(px)`, `measure()` (the full text's widest line, at mount), `full` (text + suffix). The check line is `typeLine({ text: 'check: …', px: 40, color: C.accent, weight: 500 })`.

**`stepCircle(n, { size = 72 })`**
A circled step number. `seek(active)` 0..1: fills accent with overshoot, numeral white (switches exactly at half opacity, so contrast is never broken). `setSize(px)`.

**`pointer({ dir = 'left' | 'up', size = 56 })`**
A flat accent dart with a white keyline and a soft shadow (decoration). `seek({ x, y, o = 1, press = 0 })` puts the **tip** at (x, y). `press` 0..1 shrinks it 12% (a tap). Use it sparingly to walk a sheet: keep the whole dart inside the card (tip x ≤ 990 for `left`) and never over a number. Drive it with `pathAt()`.

**`table({ left = 84, top, width = 856, columns, rows, rowH = 84, cellPx = 52, headPx = 40, headH })`**
A booktabs table: heavy top and bottom rules, a thin rule under the head, hairlines between rows. `columns[j] = { label, emph?, align? ('left' for column 0, 'right' otherwise), w? (relative width) }`. `rows` are display strings (markup ok). Emph columns use Archivo Black, the others Inter Tight 700. Every cell is an `hlBox`, so any cell can be marked.
- `seekHead(p)`, `seekRow(i, p)` (fade + 14 px rise), `seekBottom(p)` (bottom rule)
- `seekBand(i, wipe, tone = 'input')`: a full-row highlighter (a pick or the winner)
- `seekCell(i, j, wipe, tone = 'input', rest = 0)`: one cell's highlighter
- `rowY(i)`, `rowMid(i)` (absolute y), `cell(i, j) → { el, hl }` (`hl.setHTML()` for a live counter cell), `height`, `headH`, `rowH`, `cols` (x and w of each column)

**`sheetRow({ label, note, pct, amount, tone, left = 84, width = 856, px = 46, amountPx = 60, pctW, labelW })`**
`Label ··········· [$amount]`, with an optional `%` column and a grey note under the label. It is a flex row, so the dotted leader fills whatever space is left.
- `seek({ leader = 1, amount = 1 | { wipe, text }, rest = 0, active = 0 })`: the leader draws left to right; the amount is an `hlBox` (`row.amount`).
- `row.height` (measured), `row.label`, `row.note`, `row.pct`, `row.leader`, `row.labCol`.

**`alignSheetRows(rows)`**: once at mount, gives every row the widest label column and % column, so the % column and the leaders line up. Returns the label width.

**`unitIcon(name, { size = 64, stroke = C.ink, sw = 2.6, mono })`** → `<svg>`. Flat monoline icons on a 48-unit grid with palette fills: `cup hotdog burger pizza phone car house coin bill gas ticket bag egg hour`. Unknown names fall back to `token`. `mono: '#hex'` fills every shape one colour. `ICON_NAMES` lists them.

**`iconDefs(names?)` + `iconUse(name, { size = 40 })`**: for hundreds of units. Append `iconDefs()` once to the layer, then one `iconUse()` per unit (`<use>` of a shared `<symbol>`).

### Page and chrome (used by kit.js)

**`mountPage(spec, ctx)`** builds the desk, card, dot grid, brand mark, header, footer, work layer, caption divider, caption lines and verdict. It sets `ctx.page`:

| Field | Meaning |
|---|---|
| `layer` | full-stage absolute layer above the card. Append your DOM here. |
| `top`, `bottom` | the work area's y range |
| `left` (84), `textX` (192), `right` (940), `rightTop` (996) | x guides |
| `header`, `footer` | the header/footer elements (read-only; for measuring) |
| `captionsOn`, `hasVerdict` | whether the caption band is used |
| `clear` | set `{ t0, dur }` to fade the verdict and caption with a loop reset |

Fitting (all with `fitMarkup`, so the rules are the same everywhere):
- **Header**: every `\n` line stays on one line, shrinking 84 → 56 px before any line splits; a line splits only when that buys size (at its best break), so a highlighted phrase is never broken, a number keeps its unit, and no article or preposition ends a line (when nothing else fits above 56 px, the fitter does it and `console.warn`s: shorten the header, e.g. 01a's "3 DEAD SIMPLE NUMBERS / PAID **EVERY 2 WEEKS**? THE / PAY YOUR BUDGET FORGETS"). Three explicit lines sit at about 58 px.
- **Footer**: 40 px (36 at least), two balanced lines at most; a break at ` · ` drops the dot.
- **Verdict**: 56 px; two lines, three only when a long line would otherwise drop under 42 px; `≈` never leaves its figure; each line's highlight is its own box.
- **Captions** (`spec.vo`, unless `captions: false`): the whole line is on screen while it is spoken. Words not yet said are grey, words said are ink, `**x**` words turn accent, `__x__` cost red. A line fades up 8 px as it starts. It is fitted to 2 lines of 48 px (40 px minimum) and balanced; `≈` and its figure are one unbreakable word. Captions hide from `verdict.t`.

Header, footer and brand are static from frame 1.

---

## 4. `dead-simple-list` (flagship)

Numbered empty slots are on the page from frame 1, with step 1 already active (filled circle and blinking caret) when it starts within 0.9 s. Each step: the circle fills, the formula types `formula + " ="`, the highlighter swipes and the result pops. The formula **stays**, so the page builds into a worked sheet. Earlier results rest, and the goal (`tone: goal`) gets the blue box at 82 px. Results land on green (a `neutral` result too). An optional check line types in accent under the last step. The finished sheet holds, then clears back to frame 1 for the loop: the boxes retract and their figures fade with them. A step whose result lands by t ≤ 0 is pre-filled: frame 1 shows it worked, and the clear leaves it on the sheet (`samples/dead-simple-list-pre.json`).

**Layout engine** (measured with the real fonts; the first mode that fits with type above the floors wins):

| Mode | Shape | Typical use |
|---|---|---|
| `stack3` | label row / formula row / result row | 3 steps with labels |
| `aside` | formula / result, label beside the result | 3-4 steps with short results |
| `bare` | formula / result, labels left to the voice-over (the mockup) | 4 steps |
| `dense` | `bare`, packed: 40 px formulas set solid above 1.2× slimmer result boxes, tight gaps, 14 px raise. The working stays. A note that does not fit beside its result is dropped first. | 5-6 steps |
| `swap` | one row per step: the highlighter's leading edge erases the formula as it lays the result down | last resort (6+ steps under a 3-line header) |

Notes sit beside the result box, or after the formula (`$65,000 ÷ 12 =  not $5,000`) when the result is too wide. Spare height goes into the gaps (top-aligned). Item timing: `t` = typing starts, `resultT` = highlighter starts (default `t + typeDur + 0.3`). With no `t`, steps fall every ~3.2 s after the previous result.

**Spec extensions** (all optional):

| Field | Effect |
|---|---|
| `data.input` | the "given" row: `Label [value on yellow] note`. Shown only if the header does not already contain the value. |
| `data.check`, `data.checkT` | a `check: …` line typed in accent under the last result (a string or `{ t, text }`; `check:` is prefixed if missing; 2-3 lines when long). Same as `lookOpts.check/checkT`. |
| `data.hold` | seconds the finished sheet holds (default 2.5) |

**lookOpts**: `loop` (`true`) · `input` (`'auto'` / `'show'` / `'hide'`) · `layout` (force `'stack3' / 'aside' / 'bare' / 'dense' / 'swap'`) · `check`, `checkT`.

**Content budget**: 3 steps with labels and a given row, or 4 steps without visible labels, at full size; 5-6 steps keep their formulas in `dense`. Results of about 16 characters or fewer (`$41,600 a year`), formulas of about 20. A 2-line footer costs about 50 px of work area.

---

## 5. `find-your-row`

A booktabs table. Frame 1 already shows the head and **every row key**, so the viewer can find their row at once (rows with `t ≤ 0` are pre-filled). The values land top to bottom, each whole value popping into place a beat apart per column (never a half-typed figure). The emphasised column fills **one even highlighter band** that grows down as its rows land: the newest cell sits on its own full-tint box, the band behind earlier ones stays pale, so one bright cell runs down a straight column. A pick swipes the yellow highlighter across its row (the emphasised cell turns full where the two cross) and writes its label on the legend line under the table: `[row key on yellow] label`. Several picks each keep their own legend line when the page has room; on one shared line, an earlier pick's band leaves with its label (no tint is left unexplained). In right-aligned columns every `≈` sits in one vertical line. The rough formula is a grey mono footnote. With no picks the column comes back to full at the end. The table holds, then clears back to frame 1.

**Layout engine**: the largest row pitch (40-92 px) that fits, cells at about 0.68 of the pitch (40-56 px). In order (each with the pick labels stacked first, then on one line): formula and legend each on their own line; formula sub-labels dropped from the head, but only those the footnote or the footer already carries (`÷ 2,080` under `= … ÷ 2,080`); any other formula sub-label (`÷ $20/hr`) is the column's only working and stays, the head taking a third line; one shared line (the formula, which the first pick label replaces: the formula leaves before the label lands, and at the loop clear the label leaves before the formula returns); a dense 40 px pitch; then content goes (the formula first, then the legend). Head labels wrap to two lines rather than shrink; heads, cells, the footnote (two balanced lines if needed) and the legend stay at 40 px or more. Pick labels: one line with the key chip (46 → 40 px), else two balanced lines beside the chip, else without the chip; every label ends by x 940. Under a 48 px pitch the row hairlines drop 2 px so descenders clear them.

**Spec extensions**: `columns[j].tone` (the emphasised column's highlighter: `good` green by default, `bad` coral, `goal` blue, `neutral` sand; a pick is yellow, or blue when the column is yellow); `columns[j].align`; `data.rowT` (per-row times); a column label's second line (`"Per hour\n÷ 2,080"`) is a grey mono sub-label (droppable only when it is working the footnote or footer repeats; kept when it is a figure or the column's only working).

**lookOpts**: `loop` (`true`) · `legend` (`true`; `false` hides pick labels) · `formula` (`true`; `false` hides the footnote).

**Content budget**: 5-14 rows × 2-4 columns. Silent tables (`captions: false`, the benchmark set-up) use the caption band and keep everything. With captions on: 12 rows × 3 columns under a one-line footer keep the footnote and the pick labels on their own lines (02c, one label at a time); 14 rows × 4 columns with three-line heads share one line between the footnote and the labels (`find-your-row-2`). Two picks stack their labels only with about 60 px to spare.

---

## 6. `what-difference`

One fixed stake worked out 2-4 ways. Frame 1 is the whole question: the header, the stake on a yellow given row, the metric heads and every option named in its numbered block with empty dashed slots where its results will land. Each option: its circle fills, its working (`option.detail`) types in grey mono, each metric lands on the green result highlighter (coral for a `bad` option) in its own aligned column, then the delta lands at the right of the name line. Finished options rest. At the winner beat every box except the winner's rests (coral and the other deltas too), the winner's values re-wipe blue (`hlBox` retone) and a pointer lands beside its delta. The sheet holds, then clears for the loop.

**Layout engine** (measured): the first metric column is left-aligned on the text column; the others are right-aligned and packed leftwards from the rail (x 940) at a 28 px gap, each as wide as its widest box; deltas share the rail. Block shapes:

| Mode | Shape | The working |
|---|---|---|
| `split` | name line (+ delta) / working line / results line. The delta centres on name + working when the working clears it; otherwise it sits on the name line and the working starts under it. A long name beside a delta wraps to two balanced lines. | stays |
| `mixed` | per option: the working on the name line when it fits, else on its own line | stays |
| `swap` | name line (+ delta) / results line; the working stays on the name line wherever it fits there; only elsewhere does it type on the results line (its slots step aside) for the first highlighter to erase | erased only where it cannot fit |

Every shape has a **compact tier**: names and working set solid at 40 px, results on slimmer boxes at 54 → 44 px (under 50 px only with every metric on one line, like a table's cells), deltas at 0.84 of the results, 56 px circles, small gaps: about 150 px per option.

Candidates by cost, cheapest first: smaller type (1 per %, at most 22), tight gaps (23), each metric stacked on its own labelled line (46: `Total paid ····· [$35,220]`), no check line (100), the compact tier (200 + 1 per px under 54), swap (400). So the working outranks the check and the check outranks the compact tier; one results line at a smaller size beats a stack of two. No candidate whose boxes intersect is accepted. Nothing fits: the candidate that overflows least (never a fixed shape), with a console warning; a mount-time assert warns when anything readable ends below the work area. `stake.terms` is dropped when the footer (or header) already states every `·` piece of it. An option whose beats all land by t ≤ 0 (03b's "The minimum") is pre-filled: frame 1 shows it, the clear keeps it, and it eases back to its frame-1 rest.

**Spec extensions**: `option.resultT` (first metric lands, default `t + typing + 0.35`), `option.valueEvery` (gap between metrics, 0.5 s), `option.deltaT`, `option.note` / `option.noteT` (an accent line typed under the option's results); `data.typeDur`; `data.winnerT` (default `verdict.t + 0.28`); `data.check` / `data.checkT` (or `lookOpts.check`, a string or `{ t, text }`: an accent check line under the sheet, broken onto two lines when long); `metrics[j].tone` (that column's highlighter).

**lookOpts**: `loop` (`true`) · `layout` (`'split'` / `'mixed'` / `'swap'`; `'inline'` = `'mixed'`) · `pointer` (`true`) · `slots` (`true`) · `terms` (`'auto'` / `'show'` / `'hide'`) · `debug` (logs every candidate and why it failed).

**Content budget**: name + delta ≤ about 720 px at the floors. Three options keep their working (`split`) even under a 3-line header and a 2-line footer when the working lines are ≤ about 30 mono characters; the check line goes first (03b). Four options with 2 metrics and 21-character working lines keep everything in compact `split` (`what-difference-2`, results 46 px). Three metrics fit for up to three options at full size (the third stacks with its label); four options × three metrics fit compact on one results line at 44 px, with the working and the check (`what-difference-3`). Deltas pop; the ding is the winner's alone.

---

## 7. `split-sheet`

The whole sheet is on the page at frame 1: the total on yellow (`Take-home pay ······ $4,000`, an optional grey `total.note` under it), a share bar (one empty segment per part, sized by `share`), then one row per part: label (a grey note under it), percentage in grey mono, a dotted leader and an empty dashed slot. The pointer starts on row 1 (the active row on frame 1) and walks down the right edge, never over a number. Each part: the pointer lands, its percentage turns accent, the leader traces toward the slot, the working (`part.formula`, `5 × $400`) types in grey mono ending in `=`, the highlighter swipes and the amount pops. **The working stays.** Amounts land on green (`neutral` too), the goal on blue, a `bad` part on coral; the previous amount rests. The bar segment fills in the colour its amount lands on and rests with it (the 6 px gaps keep neighbours apart), so the bar and the amounts speak one colour grammar. Then the sum rule and the accent check line; every amount comes back to full (a goal part stays the only loud one), the total lights up again, the pointer leaves, the sheet holds and clears for the loop.

**Layout engine**: labels share one column so the % column and the leaders line up; short labels (`Live / Invest / Enjoy`) keep their natural width, and only a label too long for a squeezed column wraps to two balanced lines (1.08 line-height at least). Candidates by cost (the cheapest that fits wins): type a little larger on a short sheet (1.16 / 1.08: they only break ties), smaller type (4 per 4%), no notes (6), no bar (2), dense spacing (3, a 14 px raise), the wrong guess off its row (4), **the working hung under its amount** (20: `= 5.5 × $350` right-aligned under `$1,925`, ending at the rail; it stays), no check line (30), the working typed in the slot and erased by the highlighter (60), no working (80). So notes go before the working moves, the check goes before the working is erased, and the working outranks type size. Nothing fits: the candidate that misses by the least (the check and the bar survive whenever they can). The check is `check: ` + the sum on one line, else broken before `=` with the rest hung under the sum (`check: $3,000 + $1,250 + $750` / `= $5,000`).

**Spec extensions**: `total.note`; `part.formula`; a part without a tone is `neutral` (its amount lands on green); `data.check` / `checkT` or `lookOpts.check` (string or `{ t, text }`).

**lookOpts**: `loop` (`true`) · `pointer` (`true`) · `bar` (auto; `false` hides it, `true` insists) · `notes` (auto; `false` hides them) · `formulas` (auto, or `'line'` / `'under'` / `'slot'` / `false`) · `debug` · `wrongGuess { part, t, formula, result, strike = true, strikeT, until }`: a wrong answer typed under row `part` (or on the check line when there is no room) that lands on coral at `t`, is struck through at `strikeT` and is gone by `until` (default: as the next part starts). `t <= 0` puts the guess on the sheet already typed and landed at frame 1 (the wrong answer as the hook; the loop reset puts it back). `maskPct: [i, …]`: those rows' percentages read "?" until the row activates, so the goal row's % does not answer the header at frame 1 (the layout still measures the real %).

**Content budget**: 3-4 parts keep notes and the working on the line (`split-sheet-3`: three short labels, the bar and the check at 0.92); 6 parts with two two-line labels hang the working under their amounts and drop notes, the bar and the check (`split-sheet-2`); 7 parts with two-line labels type the working in the slot. The check goes before the working is erased.

---

## 8. `ledger-duel`

A booktabs ledger with two money columns, one per person: the name in Archivo Black and the plan in grey under it, right-aligned over the numbers; the year column on the left. A stake caption sits above the table (its money on yellow when the header does not show it). Frame 1 is the empty ledger: names, plans and every year label (grey) are on the page, so the viewer sees the bet and the time span. Each row lands in both columns at once: its year turns ink, a sand cursor band swipes across it and both whole values pop into place (the right one a beat later). An event row (crash, recovery) swipes its tone instead and opens a note line under its year. The goal row is the total line (a rule above it, larger figures). At the winner beat the winner's final value takes the blue box and the winner's name the blue highlighter. The ledger holds, then clears for the loop.

**Layout engine** (measured): value columns are as wide as their widest figure (`≈` included) and their name at 40 px, equal for symmetry; the year column takes the rest, and when that is narrower than a label, the label wraps to two balanced lines and its row grows. Names fit their column (60 → 40 px). Plans are set as explicit lines: one line, else whole `·` pieces grouped onto the fewest lines, else balanced word breaks (3 lines at most, 2 in the denser levels). Levels: figures 60-48 px dropping the footnote, then the stake caption when the header shows its money; figures 46-40 px; events move to a legend under the table, **one line per event** (`[year on its tone] event`, up to 3, kept on the finished sheet), rows tightening before the next step; then one shared legend line (the latest event; an earlier event row's tint fades back as its line is replaced, so no colour is left unexplained). Over budget the drop order keeps plans > event legend > stake caption: the stake goes, then the legend (event rows then behave as plain rows: no tint), then the plans clamp to one line, then they go (the shared legend comes back if that frees room for it). Money columns put every `≈` in one vertical line. Readable text never goes below `P.bottom` unless even 34 px rows cannot fit (the linter reports that).

**lookOpts**: `loop` (`true`) · `stake` (`'auto'` / `'show'` / `'hide'`) · `labels` (`'ahead'` / `'with-row'`) · `formulas` (`[colA, colB]`: a grey mono footnote `Name: formula`) · `winnerT` (seconds) · `badge` (ignored).

**Content budget**: 6-12 rows; short names; plans of up to three `·` pieces. Events keep their own legend lines up to about 10 rows; twelve rows with two events share one legend line (`ledger-duel-2`); twelve rows with three events and plans needing three lines drop the plans and keep the shared legend line.

---

## 9. `unit-ladder`

One division, repeated down a cheap → huge ladder. The unit is defined at the top (`[icon] 1 Big Mac = [$6.22]`, droppable when the price is already in the header or footer). Each rung: its circle fills, the item arrives with its cost written, the operation types (`$45,000 ÷ $6.22 =`), the highlighter swipes and the count runs up on it (landing exactly on `unitsDisplay`) while unit icons fill beside it (one icon per unit while they fit; a fractional unit is a pale whole icon with only its share filled; past that a pile). When the next rung opens, the finished rung files into a compact row that **keeps its cost** (`An iPhone 17  $799 ······ [≈ 40]`, the cost in grey mono 40 px after the label's last line), so the ladder builds down the page with every rung kept and checkable. Where the cost has no room, the label takes a ragged wrap that leaves its last line short (free when it adds no line), or one more line when the page has the height; only then does a row go without its cost (logged with `debug`). The count lands by the time the voice says it (within 60% of an overlapping VO line, or just before its digits). A rung whose highlighter starts by t ≤ 0 is pre-filled: frame 1 shows its final count and icons (no counter, no roll), and the loop brings it back that way (`unit-ladder-pre`). **Frame 1** shows the unit row, rung 1 open with its caret waiting, and every other rung's numbered circle waiting empty under it ("7 things, cheap → huge"); the item names stay hidden, and the waiting circles glide down as each rung opens. The last rung stays open at the final size; its pile becomes a **field** of unit icons filling the free page around it (right of its label and working, beside the box, and under it when there is room), growing outward from the number as the count runs. An optional check line types under it. The sheet holds, then clears for the loop.

**Layout engine**: scales 1 → 0.82 (labels and formulas ≥ 40 px, results ≥ 54, the final ≥ 62), the unit row kept down to 0.88; every scale with normal row gaps, then with tight gaps (slimmer circles); first with every filed cost wrapped into place, then without the check line (the verdict usually says it), then with as many costs as the page holds (at the chosen or a smaller size). Every state must fit, the waiting circles included. Only a ladder too long at every legal size scrolls (during the filings; each step lands on a row boundary, so no gap shows under the footer). Labels wrap balanced and keep hyphenated words and a leading `A` / `An` / `The` / small number with the next word.

**Spec extensions**: `rung.tone`, `rung.resultT`; `data.typeDur`, `data.hold`, `data.check` / `checkT` (or `lookOpts.check`, string or `{ t, text }`).

**lookOpts**: `loop` (`true`) · `unitRow` (`'auto'` / `'show'` / `'hide'`; `badge: false` = `'hide'`) · `grid` (`true`) · `field` (`true`: the final icon field) · `slots` (`true`: the waiting circles) · `check`, `checkT` · `countSpeed` (`1`; > 1 = slower counters) · `debug`.

**Content budget**: 4-7 rungs. Five rungs keep a unit row, every cost and a check (`unit-ladder`); five rungs with long labels (08c) keep every cost and drop the check; seven rungs with two-line labels keep every rung at tight gaps, half their costs and no check.

---

## 10. lookOpts across the kit

| Option | Formats | Default |
|---|---|---|
| `loop` | all | `true` (clear back to the frame-1 state at the end) |
| `check`, `checkT` | dead-simple-list, what-difference, split-sheet, unit-ladder | none (string or `{ t, text }`; same as `data.check/checkT`) |
| `layout` | dead-simple-list (`stack3/aside/bare/dense/swap`), what-difference (`split/mixed/swap`) | auto |
| `input` | dead-simple-list | `'auto'` |
| `legend`, `formula` | find-your-row | `true`, `true` |
| `pointer` | what-difference, split-sheet | `true` |
| `slots` | what-difference (dashed result slots), unit-ladder (waiting circles) | `true` |
| `terms` | what-difference | `'auto'` |
| `bar`, `notes`, `formulas`, `wrongGuess`, `maskPct` | split-sheet | auto, auto, auto, none, none |
| `stake`, `labels`, `formulas`, `winnerT` | ledger-duel | `'auto'`, `'ahead'`, none, verdict / last row |
| `unitRow`, `grid`, `field`, `countSpeed` | unit-ladder | `'auto'`, `true`, `true`, `1` |
| `debug` | what-difference, split-sheet, ledger-duel, unit-ladder | `false` (logs layout candidates) |
| `badge` | (all) | ignored: the mockup revision dropped the badge |

Every format renders sensibly without `lookOpts`.
