# Clean Sheet: look kit

Your rough maths, worked out step by step on a crisp off-white sheet. It is typeset, highlighted and occasionally pointed at, never hand-drawn. Source: [`research/v2/03-look-directions.md`](../../../research/v2/03-look-directions.md), Direction 1, and the stills in `research/v2/look-mockups/d1-*.png`.

| Format | File | Status |
|---|---|---|
| `dead-simple-list` | `formats/dead-simple-list.js` | flagship, done (samples: `samples/dead-simple-list*.json`) |
| `find-your-row` | `formats/find-your-row.js` | stub |
| `what-difference` | `formats/what-difference.js` | stub |
| `split-sheet` | `formats/split-sheet.js` | stub |
| `ledger-duel` | `formats/ledger-duel.js` | stub |
| `unit-ladder` | `formats/unit-ladder.js` | stub |

```bash
cd studio
node src/cli.mjs check  looks/clean-sheet/samples/dead-simple-list.json
node src/cli.mjs sheet  looks/clean-sheet/samples/dead-simple-list.json --out /tmp/kit-clean-sheet
node src/cli.mjs stills looks/clean-sheet/samples/dead-simple-list.json --at 0,1.7,end --out /tmp/kit-clean-sheet
```

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
| `C.green` | `#A7F3C1` | result highlighter (`tone: good`, and the default) |
| `C.yellow` | `#FFE066` | input / key-number highlighter (`**x**` in the header, the given input) |
| `C.blue` | `#A5D8FF` | goal / final answer (`tone: goal`, the verdict's `**x**`) |
| `C.coral` | `#FFB3A7` | cost / debt (`tone: bad`, `__x__` in the header) |
| `C.sand` | `#ECE7DA` | neutral highlighter (`tone: neutral`) |
| `C.accent` | `#2F6FEB` | step circles, caret, `≈`, check line, pointer |
| `C.accentDeep` | `#1D4FC4` | `≈` sitting on a highlighter (keeps contrast) |
| `C.costInk` | `#B42318` | `__x__` as text (captions, notes) |

`toneColor(tone)` maps `good → green`, `bad → coral`, `goal → blue`, `neutral → sand`, `input → yellow`, and anything else to green. Text on any highlighter is always ink.

### Type (`theme.js` → `F`, `SIZE`)

Every stack ends in `'Inter Full'`, so `≈ × ÷ − →` always render. Numbers use tabular figures (set on `#stage`).

| Role | Family / weight | Size |
|---|---|---|
| Header (hook) | Archivo Black | 84 px, fitted down to 56 px, 2 lines (3 at most) |
| Footer (assumption) | Inter 500, grey | 40 px (36 px minimum), up to 2 lines, balanced |
| Step / row label | Inter 700, ink | 46 px |
| Formula | IBM Plex Mono 600, grey | 50 px |
| Result | Archivo Black on a highlighter | 66 px; goal/final 82 px |
| Note beside a result | Inter 600, grey (`__x__` in cost red) | 40 px |
| Step number | Archivo Black in a 72 px accent ring | 44 px (never below 40 px) |
| Check line | IBM Plex Mono 500, accent | 40 px |
| Caption | Inter 700 | 48 px, 2 lines max |
| Verdict | Archivo Black, `**x**` on blue | 56 px, 2 lines max |
| Table head / cells | Inter 700 grey / Archivo Black (emph) or Inter Tight 700 | 40 / 52 px |
| Brand tag | Inter 600, grey | 30 px (decoration) |

Floors: 34 px absolute, 40 px for anything the viewer must read, 60-90 px for the focal number. Formats should never set readable text below 40 px.

### Layout grid (`theme.js` → `GRID`)

| y | What |
|---|---|
| 96-1824 | the card (x 36-1044, radius 28, soft shadow), dot grid from the work area down |
| 148-192 | brand mark: line envelope + `BACK OF THE ENVELOPE` (decoration) |
| 252-440 | header, top-aligned at 252, fitted with `fitText` |
| header bottom + 14 | footer (assumption line), when `spec.footer` is set |
| `page.top` → `page.bottom` (1290) | **the work area: formats draw only here** |
| 1304 | caption divider (2 px hairline; shown when captions or a verdict exist) |
| 1324-1476 | caption band: captions, then the verdict replaces them at `verdict.t` |

`page.top` is computed: footer bottom + 44 (or header bottom + 52 with no footer). It is typically 480-600. Without captions and without a verdict, `page.bottom` extends to 1466.

x: titles, footer and captions start at 84. Circled steps sit at x 90-162 and the text column starts at `GRID.textX` = 192. Keep everything in the work area at **x ≤ 940** (`page.right`), because most of it is below y 820. Only the header may run to 996.

The footer always sits under the title, whether or not captions are on. Frame 1 therefore reads as question, then assumption, then sheet, and the caption band is never shared.

### Motion grammar (`theme.js` → `MOTION`)

Only four things move: **typing**, the **highlighter swipe**, the **pop**, and the **pointer glide**. There are no cuts, bounces, shakes or linear slides (only counters run linearly).

| Beat | Spec |
|---|---|
| Activate a step | the circle fills (opacity + scale 0.55 → 1 with `ease.back`), 0.3 s before its formula types; the numeral turns white |
| Type | grapheme by grapheme over the spec's `typeDur` (or 18 chars/s via `typeTime()`), accent caret, which blinks while waiting |
| Swipe | the highlighter wipes left to right over 0.26 s (`ease.out`) |
| Pop | the result text lands 0.16 s after the swipe starts: scale 0.92 → 1 (`ease.back`), fast fade |
| Rest | a finished result that is no longer focal fades its box to 42% (`MOTION.rest`) over 0.35 s. One loud number at a time. |
| Finale | when the list has no `goal`, every box returns to full at the end (the cheat-sheet frame) |
| Verdict | fades up 12 px over 0.3 s, then its `**x**` swipes in on blue |
| Loop | (`lookOpts.loop`, default on) the last 0.7 s clears results back to the frame-1 state |
| Sound | `type` while typing, `pop` per result (`ding` for the goal), `reveal` on the verdict, a soft `swipe` on the loop clear. One cue per real event. |

---

## 2. How the kit is wired

`index.html` loads fonts, `base.css`, `style.css` and `kit.js`. `kit.js`:

1. imports every format module from `./formats/<id>.js`;
2. injects each module's optional `export const css = '...'` once into a `<style>`;
3. awaits `preloadFonts()` (top-level await), so **mount-time measuring sees the real fonts**;
4. wraps each factory so `mountPage(spec, ctx)` runs **before** the format and sets `ctx.page`;
5. `defineKit({ name: 'clean-sheet', formats, chrome })`. The chrome animates captions and the verdict.

**Formats never edit `kit.js`, `lib.js`, `theme.js` or `style.css`.** Everything a format needs is either in `lib.js` or goes in its own module's `css` export.

### Writing a format

```js
// looks/clean-sheet/formats/<id>.js
import { h, css as style, prog, ease } from '../../../runtime/core.js'   // NOTE: rename css; `css` is our export
import { C, SIZE, GRID, MOTION, md, hlBox, landing, fadeUp, durationOf } from '../lib.js'

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
- Measure at mount (`getBoundingClientRect`, `fitText`, `typeLine().measure()`, `hlBox().width()`). Fonts are loaded by then.
- Durations: `durationOf(spec, lastBeat, { hold, tail })`. Use `tail` for an outro such as a loop clear.
- If the format does a loop reset, set `P.clear = { t0, dur }` so the chrome fades the verdict and caption with it.

---

## 3. `lib.js` API

All exports are re-exported tokens (`C, TONE, F, SIZE, GRID, MOTION`) plus the following.

### Text, tone and time

| Signature | Returns / does |
|---|---|
| `md(str)` | spec markup → HTML: `**x**` → `<em>`, `__x__` → `<u class="mark2">`, `\n` → `<br>`, every `≈` → `<span class="cs-approx">` (accent, Inter Full 800) |
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

**`hlBox({ html, tone, color, px = 66, family = F.display, weight = 400, padX = 14, radius = 10, height, cls })`**
A highlighter box: text on a tone-coloured box that wipes in. `el` is `inline-flex`/`position: relative` (inside `P.layer` it becomes absolute).
- `seek(wipe, text, rest = 0)`: `wipe` 0..1 (pass `landing().wipe`), `text` 0..1 (pop with back-ease), `rest` 0..1 fades the box to 42%.
- `setTone(tone, color?)`, `setPx(px, height?)` (default height `px × 1.3`), `setHTML(html)`, `width()`.
- Align its text with a text column at x: `left = x - 14 × √(px/66)`.

**`typeLine({ text, suffix = '', px = 50, color = C.grey, family = F.mono, weight = 600, cls })`**
A typed line with an accent caret. `seek(p, caretOn)`, `setPx(px)`, `measure()` (the full line's width, at mount), `full` (text + suffix). The check line is `typeLine({ text: 'check: …', px: 40, color: C.accent, weight: 500 })`.

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

**`unitIcon(name, { size = 64, stroke = C.ink, sw = 2.6, mono })`** → `<svg>`. Flat monoline icons on a 48-unit grid with palette fills: `cup hotdog burger pizza phone car house coin bill gas ticket bag egg hour`. Unknown names fall back to `token`. `mono: '#hex'` fills every shape one colour (useful for a "spent" or greyed-out state). `ICON_NAMES` lists them.

**`iconDefs(names?)` + `iconUse(name, { size = 40 })`**: for hundreds of units. Append `iconDefs()` once to the layer, then one `iconUse()` per unit (`<use>` of a shared `<symbol>`).

### Page and chrome (used by kit.js)

**`mountPage(spec, ctx)`** builds the desk, card, dot grid, brand mark, header (fitted), footer (fitted, balanced), work layer, caption divider, caption lines and verdict. It sets `ctx.page`:

| Field | Meaning |
|---|---|
| `layer` | full-stage absolute layer above the card. Append your DOM here. |
| `top`, `bottom` | the work area's y range |
| `left` (84), `textX` (192), `right` (940), `rightTop` (996) | x guides |
| `header`, `footer` | the header/footer elements (read-only; for measuring) |
| `captionsOn`, `hasVerdict` | whether the caption band is used |
| `clear` | set `{ t0, dur }` to fade the verdict and caption with a loop reset |

**`chrome(spec, ctx)`** handles captions and the verdict.
- **Captions** (`spec.vo`, unless `captions: false`): the whole line is on screen while it is spoken. Words not yet said are grey, words said are ink, `**x**` words turn accent, `__x__` cost red. A line fades up 8 px as it starts. It is fitted to 2 lines of 48 px (40 px minimum) and balanced. Captions hide from `verdict.t`.
- **Verdict** (`spec.verdict`): Archivo Black 56 px in the caption band at `verdict.t`, `**x**` swiped on blue, with a `reveal` cue.

Header, footer and brand are static from frame 1.

---

## 4. `dead-simple-list` (flagship)

Numbered empty slots are on the page from frame 1, with step 1 already active (filled circle and blinking caret) when it starts within 0.9 s. Each step: the circle fills, the formula types `formula + " ="`, the highlighter swipes and the result pops. The formula **stays**, so the page builds into a worked sheet. Earlier results rest, and the goal (`tone: goal`) gets the blue box at 82 px. An optional check line types in accent under the last step. The finished sheet holds, then clears back to frame 1 for the loop.

**Layout engine** (measured with the real fonts; the first mode that fits with type above the floors wins):

| Mode | Shape | Typical use |
|---|---|---|
| `stack3` | label row / formula row / result row | 3 steps with labels |
| `aside` | formula / result, label beside the result | 3-4 steps with short results |
| `bare` | formula / result, labels left to the voice-over (the mockup) | 4 steps |
| `swap` | one row per step: the highlighter's leading edge erases the formula as it lays the result down | 5-6 steps |

Notes sit beside the result box, or after the formula (`$65,000 ÷ 12 =  not $5,000`) when the result is too wide. Spare height goes into the gaps (top-aligned). Item timing: `t` = typing starts, `resultT` = highlighter starts (default `t + typeDur + 0.3`). With no `t`, steps fall every ~3.2 s after the previous result.

**Spec extensions** (all optional):

| Field | Effect |
|---|---|
| `data.input` | the "given" row: `Label [value on yellow] note`. Shown only if the header does not already contain the value. |
| `data.check`, `data.checkT` | a `check: …` line typed in accent under the last result (`check:` is prefixed if missing). Same as `lookOpts.check/checkT`. |
| `data.hold` | seconds the finished sheet holds (default 2.5) |
| `lookOpts.loop` | `false` disables the end-of-video clear (default `true`) |
| `lookOpts.input` | `'auto'` (default) / `'show'` / `'hide'`: the given row |
| `lookOpts.layout` | force `'stack3' / 'aside' / 'bare' / 'swap'` |

**Content budget** (what fits at full size): about 3 steps with labels and a given row, or 4 steps without visible labels, and results of about 16 characters or fewer (`$41,600 a year`). Formulas of about 20 characters or fewer. A 2-line footer costs about 50 px of work area.

---

## 5. lookOpts across the kit

| Option | Formats | Default |
|---|---|---|
| `loop` | dead-simple-list (others may adopt it: clear back to the frame-1 state in the last 0.7 s) | `true` |
| `input`, `layout`, `check`, `checkT` | dead-simple-list | see above |

Every format must render sensibly without `lookOpts`.
