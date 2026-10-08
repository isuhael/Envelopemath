# Scoreboard kit

**Money as a live score.** A black top bar carries the rule and a neon odometer, the dark stage in the middle fills with everyday objects (or a neon line race), and the black bottom bar carries the label stack with the one-line working. HD Guy and ChartOrbit energy, without footage. The spectacle comes from strong objects: chunky counters that land with weight, piles that build and re-pack, and the climax lighting the stage up like an LED wall.

Sources: `research/v2/03-look-directions.md` (Direction 3, and §3.0 for the shared foundation), `research/v2/watch/hd-guy.md`, `research/v2/watch/chartorbit.md`, and the mockups `research/v2/look-mockups/d3-*.png`.

| File | What it is |
|---|---|
| `index.html` | Page: fonts, `runtime/base.css`, `style.css`, `kit.js` |
| `theme.js` | Design tokens: `C` palette, `TONE`, `F` font stacks, `SIZE`, `layoutFor()` grid, `footerPlan()`, `measureText()`, `M` motion timings |
| `lib.js` | Shared components: odometer, unit icons and pile, header, footer and footer steps, label stack, captions, verdict, score panel, race chart, ladder pips, `tabHTML`, timing helpers, `chrome()`, `stub()` |
| `style.css` | Classes used by `lib.js`, plus Anton re-declared with tight vertical metrics (see Type) |
| `kit.js` | `defineKit({ name: 'scoreboard', formats, chrome })`. It imports every `formats/<id>.js` one at a time, so a broken format only breaks itself |
| `formats/<id>.js` | One module per format, all built: `unit-ladder` (the flagship), `dead-simple-list`, `find-your-row`, `what-difference`, `chart-race`, `split-sheet`, `pov-race`, `ledger-duel`, `growth-ladder`, `cost-counter`. Each file's header comment is the full reference for its choreography |
| `samples/*.json` | Sample specs (`"sample": true`), two per format |

---

## Palette (`C` in theme.js)

| Role | Token | Hex |
|---|---|---|
| Bars (top, bottom) | `C.bar` | `#000000` |
| Stage | `C.stage` | `#0E1116` |
| Stage grid (60 px), hairlines | `C.grid`, `C.edge` | `#171C24`, `#1E2530` |
| Money / invested / positive / hero numbers | `C.green` | `#2BFF88` |
| Second contender (races, duels) | `C.yellow` | `#FFD23F` |
| Loss, cost, debt, crash bands (bands at 18-22% opacity) | `C.red` | `#FF4D5E` |
| Labels | `C.white` | `#FFFFFF` |
| Footer, axis, secondary | `C.grey` | `#9AA4B2` |
| Tertiary (never must-read text on the stage) | `C.dim` | `#6B7584` |
| Score panel fill, border | `C.panel`, `C.panelLine` | `#07090C`, `#232B36` |
| Unit icons: body, second surface, dark details | `C.iconBody`, `C.iconShade`, `C.iconDark` | `#E9EDF2`, `#AEB8C6`, `#1A2029` |

**Tone → colour** (`toneColor(tone)` / `TONE`): `good` → green, `goal` → green, `bad` → red, `neutral` → white. Board pointers take the active row's tone (white while walking a neutral row, green on the winner or goal).
**Markup** (`**x**`, `__x__`): `<em>` is neon green and `<u class="mark2">` is red. This holds in the header, labels, verdict, tip labels and captions (in captions the colour arrives as the word is spoken). In the grey footer, `<em>` is white.
**One green.** Green means money. Use it for the number that matters, never for decoration, except the brand mark and the one accent band on the icons.

## Type (`F`, `SIZE` in theme.js)

| Use | Family | Size (px) |
|---|---|---|
| Header (the hook) | Anton, uppercase | 72 (64 with captions on), fitted down to 46 to the header band; lines break only at `\n` |
| Hero counter (top bar) | Anton, odometer slots | `L.hero.size`: 168, or 140 with captions on (formats shrink it to fit the widest display) |
| Label stack line 1 (price, rate, working) | Anton, green | 62 (54 with captions on) |
| Label stack line 2 (the rung) | Anton, uppercase, white | 96, fitted down to 52 (72 → 48 with captions on), max 2 balanced lines |
| Footer (assumption line) | Inter 600, grey | 40: one line, or two lines broken at the " · " nearest the middle (else after a comma, else at a space). Never under 40 unless a half is still too wide (34 floor) |
| Captions | Inter Tight 800 | 50 |
| Race tip labels | Anton, uppercase | 48 |
| Verdict | Anton, uppercase | 92, fitted to the slot down to 50 in balanced lines (two, or three for a long line in the 196 px slot) |
| Panel label / value, hero tags | Inter 700 caps, 40-42 / Anton 120 | |
| Axis ticks, year clocks (decoration only) | Inter 600 30 / Anton 160 at 14% white | |

- Every stack ends with `'Inter Full'` (the symbol fallback). Anton has × ÷ − but **no ≈ or →**, and its × ÷ + − are tiny (about 30% of the cap height): wrap Anton text with `ax()` (or `rich()` for spec markup) so ≈ → render in Inter Full ExtraBold (`.ax`) and × ÷ + − too (`.axo`), lifted to Anton's optical centre. Both never drop under 40 px, or under the parent's own size when that is smaller (`font-size: max(0.86em, min(1em, 40px))`), so a 40-44 px cell keeps a legible ≈. A container with class `ax1` sets ≈ at a full 1em.
- **Anton metrics.** `style.css` re-declares `'Anton'` from the same vendored woff2 files with `ascent-override: 92%; descent-override: 14%`. Anton's own metrics make every text box 1.5em tall, so stacked Anton lines trip the linter's overlap rule and line-height is hard to control. With the override, caps sit at 0.02-0.89em of a 1em line box. Use `line-height: 1` for Anton.
- **Digits.** Anton digits are proportional (tabular-nums does nothing), so counters use the odometer and static table numbers use `tabHTML()`, both of which lay each digit in a 0.5em slot.
- Hyphenated words never break (`keepHyphens`, inside `rich()`), and multi-line labels and captions use `text-wrap: balance`.
- **"≈" never ends a line.** `rich()` / `richUI()` glue "≈ " and "→ " to the token after them with a no-break space (`bindMarks`), and a short emphasis run (3 words or fewer, 24 characters or fewer: "**≈ 1.2 million**", "**$15,000**") never breaks inside. Captions glue "≈" to the next word (a page break carries it along), and `footerPlan` never breaks a footer after "≈" or "→". **Never put `rich()` HTML straight into a flex container**: a hyphenated word's nowrap span and the text after it become separate flex items and the space between them collapses ("30-YEARAT 6%"). Wrap it in one inner `<span>`.

## Layout grid (`layoutFor(spec, opts)` in theme.js)

Always take positions from `const L = layoutFor(spec, opts)`, and return `layout: L` from your format so the chrome draws the same grid.

| Band | Captions on (default) | Captions off |
|---|---|---|
| Brand mark (decoration) | x 60, y 150-196 | same |
| Header band, text bottom-aligned | `L.header` from y 244, as tall as its lines need at 64 px (1 line 71, 2 lines 137, 3 lines 190) | y 244-434 |
| Hero counter row | `L.hero` 140 px, 10 px under the header (2-line header: 391-531) | y 444-612 (168 px) |
| Footer (assumption line) | `L.footer` under the hero, 50 px (2 rows: 98 px) | y 616-666 (2 rows: 616-714) |
| Stage (gridded) | `L.stage` from the footer + 12 (2-line header, 1-row footer: 595) to 1130 | 680 (2-row footer: 726) to 1236 |
| Inner box (piles, charts, panels) | `L.inner` x 140-940, stage + 20 to stage bottom − 16 | same |
| Label stack (`data-yield`) | `L.label` 1146-1308, x 140-940 | 1252-1472 |
| Verdict slot | `L.verdict`: the label slot (1138-1308) | the label slot (1276-1472) |
| Captions | `L.caption` y 1322-1478, x 140-940 | none |

- The captions-on top bar is compact (a 64 px header, a 140 px hero, the footer tight under it), so the stage, which is the spectacle, stays about 535 px tall, against 416 in the old 680-1096 grid. `L.type` gives the label stack sizes for the mode (`{ l1, l2, l2Min }`), `L.hero.size` / `L.hero.icon` the hero sizes, `L.limit` the lowest y for the label stack (1308 or 1472).
- **The footer is planned in the grid.** `layoutFor` measures `spec.footer` and every `lookOpts.footerSteps` text (canvas `measureText`, fonts are loaded before mount) with `footerPlan()`; if any needs two lines, `L.footer.rows` is 2 and the stage starts a row lower.
- `layoutFor(spec, { hero: false })`: no hero row. The footer sits under the header and the stage starts under it (tables, sheets).
- `layoutFor(spec, { stageBottom: y })`: moves the stage/label split. The label stack keeps what is left above the caption band (check `L.label.h`). When that leaves the verdict less than `min(150, L.verdictNeed)` px, `L.verdict` becomes the bottom 196 px above the caption band, over the stage foot, and `L.verdict.boxed` is true.
- `L.verdictNeed` (`verdictNeed(spec)` in theme.js): the smallest slot that carries this spec's verdict without the band, from its measured lines at 56 px: about 85 px for a one-line verdict, 142 for two. A board or sheet that keeps that much under it never needs the band.
- **The verdict never covers the content.** Formats budget for it: find-your-row and split-sheet keep `min(150, L.verdictNeed) - 8` px of strip under the board from frame 1 (only a board that can't, even at its densest pitch, falls back to the band); chart-race and pov-race compress the plot box above the band over the 0.3 s before verdict.t; growth-ladder scrolls its rows up. Where a band remains, it hides every text it reaches whole (decoration text too: no half-sliced tick label), and a `[data-band-unit]` group (a board row: outline, fill and text) goes as one.
- **x rule.** Everything is centred on x 540. Below y 820, readable text must end by x 940, so centred text there is at most 800 wide (x 140-940). The stage background is full-bleed; piles and plot areas stay inside x 120-940 (plot x + w ≤ 900 so tip dots clear the rail). A formula line too wide for 800 px at 40 px may use x 60-940.
- Captions are on when `spec.captions !== false` and `spec.vo` has lines. Captions off gives the HD Guy layout, where the label stack is the caption.

## Motion grammar (`M` in theme.js)

| Move | How | Where |
|---|---|---|
| **Hard cut** per beat (rung, row, option) | The old label vanishes and the new one **slams** in: scale 1.16 → 1 with an `ease.back` undershoot over 0.22 s, opacity 0.6 → 1 in 0.08 s. The scale is capped per label (`slamFit`) so its biggest frame stays inside x 140-940 and inside the slot (a two-line rung never pokes past y 1472) | `slam()`, `slamFit()`, `labelStack` |
| **Roll** | Odometer digits roll mechanically (carry only when the lower column wraps) on `ease.out`, 0.8-1.9 s by jump size, 2.4 s for the biggest number. A running count shows its "≈" as an unlit ghost (`set(v, tpl, true)`): it is not the rounded answer until it lands. Every format does this (heroes, row cells, bar labels) | `odometer`, every counter |
| **Land** | The counter bumps 1 → 1.08 (1.13 for the climax) with a damped undershoot, its glow flares, and a green bloom rises off the stage floor | `bump()`, `wobble()`, `stageFlash` + `flashAt` |
| **Drop** | Icons fall with `ease.in` (gravity), squash 16% on landing and settle (`wobble`). Small icons drop a short way and fade in, so they don't read as static | `unitStack` |
| **Re-pack** | When a count grows, the existing pile shrinks into the new, denser cells (`ease.inOut`, 0.42 s): the camera "pulls back" without a camera move | `unitStack` |
| **Climax** | Cells under ~12 px become LED dots in green, so the biggest rung lights the stage edge to edge like a scoreboard wall | `unitStack` (`occ: 1`) |
| **Anticipation** | The hero dips 3% on each cut before it rolls | every hero |
| **Verdict** | A hard cut: the label stack (`[data-yield]`) drops 14 px and is gone by `verdict.t`; then the verdict slams in and a green rule (coral for a loss) wipes in above it. Formats keep its slot clear (see the layout grid); where the stage still reaches the slot, a black band rises over the stage foot in the 0.2 s before, and every text it reaches (and every `[data-band-unit]` group) is hidden whole while it is up | `verdict()` in the chrome |
| **Captions** | A line rises 22 px in 0.14 s. Words already spoken are white, words to come grey. Long lines page by spoken progress | `captions` |

Rules:
- Nothing slides linearly except counters and race clocks. Nothing idles or loops.
- No camera moves.
- One focal number at a time: the hero rolls while the labels sit still. **The payoff lands last in the hero** (unit-ladder's last rung or its `payoff`, a race's winner, growth-ladder's last row, split-sheet's verdict figure, what-difference's winning delta, dead-simple-list's goal via `heroFinal`). ledger-duel has no hero row: its payoff is the winner panel's flood.
- Frame 1 never shows an entrance mid-way: `slam`/`rise` with `t0 ≤ 0` return the landed state.
- **One verdict spot.** The verdict always lands at the foot of the frame (`L.verdict`); the header band holds the hook for the whole video.

## Sound grammar (ctx.cue)

Each cue marks a real event, and none repeats per frame.
- `thud` (gain ≈ 0.65): a hard cut lands (a new rung or row).
- `roll` with `dur`: a counter rolls. When only a few objects land (≤ 12), give each one a `pop` (gain ≈ 0.3) instead.
- `ding` (gain ≈ 0.5): a count lands.
- `riser` with `dur`, then `hit` + `cash`: the biggest number.
- `reveal` (gain 0.7) at `verdict.t`: the verdict. The chrome adds it; set `verdictCue: null` to drop it or name another kind.
- `buzz` (gain 0.3-0.5): something struck out or lost (dead-simple-list's struck wrong guess, a ledger-duel crash row, a cost-counter `slot` in tone `bad`).
- `tick` (gain ≈ 0.45-0.55): a soft beat on a number already on screen (what-difference `reads`, ledger-duel `marks`, chart-race `rungs`).
- In races: `whoosh` for the start (a soft one at 0 s when the race opens mid-way), `tick` for event flags, `swipe` (0.5) on a lead change.

There is no music bed. The look runs on diegetic UI sound, as HD Guy does.

---

## lib.js API

All `parent` arguments are DOM elements (usually `ctx.stage`). Every builder appends itself. `seek` functions only use the cached setters.

**Custom properties.** Core's `h()` applies style objects with `Object.assign(el.style, …)`, which silently drops `--x` keys. Set custom properties with `css(el, { '--x': v })` after building (lib's own components do).

**Text**
- `esc(str)`: escape for innerHTML.
- `ax(html)`: wrap ≈ → (`.ax`) and × ÷ + − (`.axo`) for Anton.
- `keepHyphens(html)`
- `bindMarks(html)`: glue "≈ " / "→ " to the next token (no-break space) and keep short emphasis runs on one line (see Type).
- `rich(str)`: spec markup → HTML for Anton (markup + `bindMarks` + `ax` + `keepHyphens`).
- `richUI(str)`: spec markup → HTML for Inter (markup + `bindMarks`).
- `bare(str)`: strip `**`/`__`.
- `tabHTML(str, { tight, ok })`: a display string as Anton HTML with every digit in a 0.5em slot (`.sb-d`). `tight`: a narrow space after ≈; `ok`: glyph spans carry `data-overlap-ok` (dense rows).
- `toneColor(tone)`
- `inkWidth(el)`: rendered text width.
- `slamFromFor(w, maxW, from?)`: the largest safe slam scale (horizontal).
- `slamFit(w, maxW, { y0, y1, oy, top, bottom }, from?)`: the same, also capped vertically (the element's box, its transform-origin y and the band its biggest frame must stay in). Use it for every format-local label box.
- `footerPlan(text)` (theme.js, re-exported): `{ lines, px }`, how a footer text is set. `footerHTML(text)`: `{ html, px, lines }`.
- `measureText(text, font)` (theme.js, re-exported): canvas width of a plain string.
- `verdictNeed(spec)` (theme.js): the verdict's minimal unboxed slot height (also on `L.verdictNeed`).

**Motion (pure functions of t)**
- `slam(t, t0, { dur, from }) → { o, s }`
- `rise(t, t0, { dur, dist }) → { o, y }`
- `bump(t, t0, { dur, amp }) → scale`
- `wobble(p)`: damped 0 → 1 → small undershoot → 0.
- `flashAt(t, t0, dur) → 0..1`
- `invEaseOut(u)`

**Numbers**
- `parseDisplay(str) → { prefix, value, dp, group, suffix, scale, text }`. Examples: `"≈ $185,500"` → prefix `≈ $`, value 185500. `"$4.8M"` → value 4.8, suffix `M`, scale 1e6. `"60 months"` → suffix ` months`.
- `displayValue(str)`: the numeric a display stands for.
- `formatLike(v, tpl)`: format a running value like a display (same prefix, suffix, dp and grouping).
- `counterText(p, from, final, tpl?)`: a running text counter that returns `final` exactly at p ≥ 1.

**Odometer**
- `odometer(parent, { size, color, maxInt = 10, maxDp = 2, cls }) → { el, set(v, tpl, ghost), show(display) }`
  - Digit columns carry `data-roll`. Only the columns the value needs are shown (no leading zeros). At an integer value every column shows exactly one digit, so a landed counter reads exactly as its display string.
  - `ghost`: a "≈" in the prefix is an unlit ghost (decoration) while the count runs.
  - Hold the previous exact display until a roll starts, and call `set(tpl.value * tpl.scale, tpl)` (or `show(display)`) once landed.
- `heroRow(parent, L, { icon, size, color, iconSize, gap = 12, maxInt, maxDp }) → { el, odo, glow, icon, set(v, tpl, ghost), show(display) }`: the top-bar hero (optional unit icon + odometer with a neon glow), centred as a group in `L.hero`. `size` / `iconSize` default to `L.hero.size` / `L.hero.icon`. A prefix or suffix in the hero is set in caps ("≈ $1,288 LESS").
  - Call `hero.set` / `hero.show` rather than `odo.set`, so the icon tracks the number's width.
  - Scale `el` for bumps. Set `--glow` (px) and `--glowA` on `glow` for flares.
  - The glow filter sits on a fixed 960-wide box, so its raster region never goes stale when digits are added. Don't put the glow filter on an element whose width changes.

**Icons**
- `ICONS`, `ICON_NAMES`, `iconName(name)` (unknown names fall back to `token`).
- `iconSVG(name, size, { cls })`: inline SVG, decoration.
- `iconSprite(name, size)`: a cached canvas mip for drawing.
- Names: `cup hotdog burger pizza phone car house coin bill gas ticket bag egg hour token`. Each has a light body, a grey second surface and one green accent; the egg has none.

**Unit pile**
- `unitStack(parent, { box, icon, maxCell = 150, minCell = 5, gap = 0.12, seed, dot = C.green })` returns:
  - `.plan(steps)`: steps are `[{ t, n, roll, delay = M.regrid, occ = 0.62, max, fall = M.fall, drop }]`, and `n` may be fractional (the last icon shows its share solid over a ghost). `fall` / `drop`: that step's drop time (s) and height (px), e.g. unit-ladder's lone unit dropping in across frame 1.
  - `.progressAt(t) → { k, p }`: apply `ease.out(p)` to drive a counter in sync with the landings.
  - `.seek(t)`
  - `.layout(n, occ, max)`
  - `.steps()`: each step has `.land[]`, the landing times of its new icons, which are useful for SFX.
- Behaviour:
  - The pile grows from the bottom centre as a mound and re-packs denser as `n` climbs.
  - `occ: 1` fills the box edge to edge, for the climax.
  - Past capacity at `minCell` the pile stays full; it does not grow forever.
  - `max` gives a lone unit a bigger cell (unit-ladder uses 230 for its intro icon).

**Frame and chrome pieces**
- `scaffold(L, { grid })`
- `brandMark(parent, L)`
- `envelopeSVG(size, color)`
- `header(parent, spec, L, { text, upper })`: fitted from `L.header.px` (72 / 64).
- `footer(parent, spec, L, { text })`: one line at 40 px, or two (`footerPlan`).
- `footerSteps(parent, spec, L) → { seek(t), els } | null`: `spec.footer`, then each `lookOpts.footerSteps` line as a hard cut with a 12 px rise. The chrome draws it.
- `labelStack(parent, L, items, { yieldToVerdict = true }) → { el, groups, seek(t, index, t0) }`
  - items are `[{ l1: html, l2: html, l1Color?, l2Color? }]`; pass `rich()`-processed HTML. Sizes come from `L.type`.
  - One group per beat is built at mount and fitted. `seek` shows only `index`, slamming at `t0` (from at most 1.16, capped by `slamFit` to the slot: x 140-940, y up to `L.limit`).
  - Inside `l1`, wrap a dim operator part in `<span class="op">`, e.g. `$799<span class="op"> ÷ $5</span>`.
- `captions(parent, spec, L) → { seek }`
- `verdict(parent, spec, L, { slot = L.verdict, tone = 'good' }) → { t, seek, yieldAt, box, txt, band }`: fitted while measurable (balanced lines that fill the slot, ≥ 50 px), slam scale kept inside the slot; `slot.boxed` raises the black band and hides every text it reaches, decoration included (`data-under`), and every `[data-band-unit]` group it reaches, whole (`data-under-all`: opacity 0). `tone: 'bad'` makes the rule coral.
- `stageFlash(parent, L) → { set(a) }`
- `ladderPips(parent, { x, bottom, n, gap, w }) → { seek(t, index, t0) }`: a vertical progress ladder on the stage's left margin, decoration.

**Score panel**
- `scorePanel(parent, { x, y, w, h, label, display, tone, size, sub, yieldToVerdict }) → { el, labelEl, valueEl, subEl, set(display), lit(p) }`
- A black box with a hairline border, a caps label and a big Anton value in the tone colour.
- `lit(0..1)` turns the border to the tone colour with a glow (the winner or the active option).
- Keep `x + w ≤ 940` below y 820.

**Race chart**
- `raceChart(parent, { box, series, x, y, raceT, events, tipLabels = true, yearLabel = false }) → { el, seek(t), xAt(t), tipAt(i, t) }` (a generic version; chart-race and pov-race carry their own, richer ones)
  - `series`: `[{ name, points: [[x, v]...], final, color?, label?, width?, dashed? }]`. Colours default to green, yellow, white.
  - `x`: `{ from, to, tickEvery, tickLabel? }`
  - `y`: `{ prefix, dp, compact = true, log, min, max? }`. Setting `max` disables auto-rescale.
- Lines draw left to right, linear in x over `raceT`, with a neon glow and a glowing tip; the y axis auto-rescales (smoothed, and never below 1.06× the current running max, so a steep climb never runs off the top of the plot); tip labels never collide; `events` draw dashed flags (bands with `until`), labels 50 px above the box.

**Timing**
- `durationOf(spec, lastBeat, hold = 3)`: the latest of lastBeat + hold, the last VO end + 0.4 s, and verdict.t + 2.5 s, clamped to 5-90 s. `spec.duration` still wins in defineKit.
- `beatTimes(items, { first = 1.0, every = 3.2 })`: per-item `t`, with default pacing for items that have none.

**Kit plumbing**
- `chrome(spec, ctx, body)` (wired in kit.js)
- `stub(spec, ctx, id)`
- `loadFonts()`

## The chrome (what every format gets for free)

`kit.js` passes `chrome` to `defineKit`, and it runs after the format factory:
- It prepends the bars and gridded stage, behind the format.
- It appends the brand mark, the header (fitted to the header band), the footer and its steps (`spec.footer` from t = 0, then `lookOpts.footerSteps`), the captions and the verdict.
- At `verdict.t`, everything marked `data-yield` is gone (a hard cut). `labelStack` sets `data-yield` by default; `scorePanel` does with `yieldToVerdict: true`; mark any other label container a format draws in the bottom bar.

The format steers the chrome through fields on the object it returns:

| Field | Effect |
|---|---|
| `layout: L` | the grid the chrome draws; **always return it** |
| `scaffold: { grid: false }` | stage without the grid |
| `header: false` / `footer: false` / `verdict: false` | the format draws that piece itself (growth-ladder draws its header, and its verdict with `verdictStyle: 'stack'`; chart-race draws its footer and steps) |
| `verdictSlot: { y, h, w, boxed }` | another verdict slot (default `L.verdict`; keep it at the foot of the frame) |
| `verdictTone: 'bad'` | a coral verdict rule (a loss) |
| `verdictCue: 'pop'` / `null` | the verdict SFX (default `reveal`) |

## Writing a format module

`formats/<id>.js` default-exports a factory. Build the DOM once, and only mutate it in `seek`. The core `css()` helper must be imported under another name if you also export a `css` string:

```js
// formats/what-difference.js
import { css as style, prog, ease } from '../../../runtime/core.js'
import { C, SIZE, M, layoutFor } from '../theme.js'
import { rich, labelStack, scorePanel, durationOf, beatTimes } from '../lib.js'

export const css = `.wd-note { font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; }`   // optional, injected once

export default function whatDifference(spec, ctx) {
  const d = spec.data, L = layoutFor(spec)
  const times = beatTimes(d.options, { first: 1.5, every: 4 })
  // ... build with lib components, append to ctx.stage ...
  times.forEach(t => ctx.cue(t, 'thud', { gain: 0.65 }))
  return {
    duration: durationOf(spec, times[times.length - 1] + 1.2, d.hold ?? M.hold),
    layout: L,
    seek(t) { /* pure function of t: style(el, {...}), setText(...), component.seek(t) */ },
  }
}
```

Checklist:
- Frame 1 (t = 0) shows the header and at least one number. Anything visible at t = 0 is already landed.
- Readable text stays in y 240-1480 and x 60-1020, and x ≤ 940 below y 820. Primary text is 60-90 px, must-read text ≥ 40 px, nothing < 34 px. Text that scales (slams, bumps) is sized so its undershoot stays ≥ 40 px (cells and tags at ≥ 42).
- Mark decoration `data-deco`, deliberate overlaps `data-overlap-ok`, and clipped rolling digits `data-roll`. Mark a board row `data-band-unit` so a verdict band (if one is ever needed) hides it whole.
- Keep the verdict's slot clear: budget the board to leave `min(150, L.verdictNeed) - 8` px under it, or move content out of the way before verdict.t (see the layout grid).
- Every printed number is a spec display string. Running counters and race tips interpolate and land exactly on `final` / `display`.
- No `Math.random` (use `rng(seed)` from core), no timers, no CSS animation, no state carried between `seek` calls except value-keyed caches.
- One focal number at a time. Green is for money. The payoff lands last in the hero; the verdict lands at the foot of the frame.
- Work loop, from `studio/`:
  - `node src/cli.mjs check <spec>` must reach 0 errors and 0 warnings.
  - `node src/cli.mjs sheet <spec> --out /tmp/kit-scoreboard`
  - `node src/cli.mjs stills <spec> --at 0,<beats>,end --out /tmp/kit-scoreboard`

---

## Kit-wide lookOpts

| Key | Formats | Effect |
|---|---|---|
| `footerSteps: [{ t, text }]` | all (the chrome draws it; chart-race draws its own, with each racer's name set in its line colour) | The footer rewrites to a working line at each t (`spec.footer` before the first): a hard cut with a 12 px rise. A line too wide for 960 px at 40 px breaks at its " · " into two lines, and the grid makes room for the tallest footer from frame 1 |
| `intro: true / false` | unit-ladder, what-difference, split-sheet | Forces the stake/unit intro on or off (default: on when the first beat starts at ≥ 0.5 s; otherwise frame 1 is already mid-roll on beat 1). dead-simple-list and cost-counter take `intro: { l1, l2 }` instead (the label stack's resting state) |
| `stageBottom: y` | what-difference, split-sheet, chart-race, pov-race, dead-simple-list, ledger-duel | Moves the stage/label split (see `layoutFor`) |

---

## unit-ladder (flagship)

"Cost in units of X" (P8). One division (cost ÷ unit price) repeated on a cheap → huge ladder.

**data:**
- `unit: { name, price, icon }`
- `rungs: [{ t?, item, cost, units, unitsDisplay, tone? }]`: 4-7 rungs, cheap → huge. `units` drives the pile and may be fractional; `unitsDisplay` is what the hero lands on.
- `hold`

**On screen:**
- **Frame 1:** the header (the rule), the unit itself and the footer. The unit shows as hero "1", one big icon dropping onto the stage (mid-fall at 0.0 s, it lands at 0.2 s with its squash and a soft pop: the thumbnail is already in motion), and label "$5 / LATTE". A ladder of dark pips counts the rungs ahead.
- If the first rung's `t` is under 0.5 s, there is no unit intro: frame 1 is already 0.45 s into rung 1's roll, with icons landing and the counter moving.
- **Each rung** is a hard cut:
  1. `thud`: the label slams in. Line 1 is `cost` in green + `÷ price` in grey, which is the working. Line 2 is the `item` in big white caps.
  2. The pile re-packs denser (the pile may use x 120-940).
  3. Icons rain in while the hero odometer rolls on the same `ease.out` curve.
  4. The hero lands exactly on `unitsDisplay`: bump, glow flare, a floor bloom and a `ding`.
- **The last rung** fills the stage edge to edge (LED-dot wall), rolls for 2.4 s over a `riser`, and lands with `hit` + `cash`.
- **Overflow rungs**: a non-final rung too big for the pile at its density (cells under 5 px) would fill the stage like the climax, so two huge rungs would look the same. From the first such rung on, every LED dot stands for the same number of units as in the climax wall: an overflow rung fills the stage with bigger dots, and the next rung re-packs it into exactly units_prev / units_next of the stage before its own dots rain in.
- **Payoff** (`lookOpts.payoff`): after the ladder the hero cuts to `from` and rolls up to `display`, landing with the climax impact (`roll`, then `hit` + `cash`), so "what the unit would cost" lands last in the hero. With `label` the label stack cuts to it (line 2, "ROSE LIKE A HOUSE?"; line 1 `working`), so the question sits under the rolling hero and the verdict answers it. Without a split the wall dims behind the payoff.
- **Split** (`lookOpts.split`): once the last rung cuts, the previous rung's dots (re-packed into the last wall) turn a second tint, so the earlier share stays readable inside the climax wall; `tags` pills name the two parts. The wall stays lit behind the payoff. It applies only where both walls are LED dots (cells under 10 px).
- **Captions** hide from verdict.t (the verdict carries that line), or from the payoff cut when the payoff has a label.
- **The verdict** (optional) replaces the label stack.
- **Timing:** rungs without `t` start at 1.0 s and then come every 3.4 s. Duration is the last landing + `hold` (default 3 s), or the VO / verdict end if later.

**lookOpts** (all optional):

| Key | Default | Effect |
|---|---|---|
| `heroIcon` | `true` | the unit icon beside the hero counter |
| `density` | `0.62` | share of the stage a non-final pile covers |
| `climaxFill` | `1` | share of the stage the last rung covers |
| `intro` | `'auto'` | `true`/`false` forces the unit intro on or off (auto: on when rung 1 starts at ≥ 0.5 s) |
| `pips` | `true` | the vertical ladder progress pips |
| `introHero` | `'count'` | `'price'`: the unit intro shows the unit price in the hero (frame 1 reads "$1.50", not a bare "1"); the intro label then drops its price line |
| `payoff` | none | `{ t, from, display, roll, label, working }`: `t` defaults to verdict.t, else 1.5 s after the last landing (never before landing + 0.3 s); `from` to the unit price; `roll` to 1.4 s. `display` is printed exactly |
| `split` | none | `true` or `{ tags: [prevTag, lastTag], tint }` (tint default `#E4E9EF`): the previous rung's share of the last wall in a second tint |

Ported: `studio/specs/08a-scoreboard-costco-hot-dogs.json` (`introHero: 'price'`, a `payoff` from $1.50 to ≈ $7.01 with a label, a tagged `split`).

**Writing rungs:**
- Pick a cheap, habitual or tribal unit (latte, Big Mac, RTX card), not a luxury or abstract one (research: unit choice swings views 800x).
- Keep the hook to "Cost in units of **X**" with at most one input number.
- Round results with "≈" in `unitsDisplay` exactly as you want them printed. Prefix the `cost` with "≈" when it is an average.

Samples: `unit-ladder.json` (lattes, 5 rungs, captions on, unit intro, verdict, 22 s); `unit-ladder-short.json` (hours of work, 4 rungs, captions off, no intro: frame 1 mid-roll, long two-line labels, 17 s).

## dead-simple-list

"N dead simple numbers" (P1), Master Money's numbered list as a live scoreboard. The viewer's own number (`data.input`) is the hero from frame 1, tagged with what it is ("YOUR PAYCHECK / EVERY 2 WEEKS"), so the biggest number on the thumbnail is theirs. The stage holds one numbered slot per item, all on the board from frame 1 and empty (a dark number cell, a skeleton for the label and one for the answer), so the viewer counts the numbers ahead. The finished board is a cheat sheet of N answers with their working notes.

**data:**
- `input: { label, value, note }`: the hero. Without it (or with a value that is not a number) there is no hero row.
- `typeDur` (0.6): how long the working holds in the slot before its roll.
- `items: [{ t, label, formula, result, tone, note, resultT, noteT }]`: 3-6 items. `t` defaults to 0 for item 1, then 1.6 s after the previous landing. `resultT` defaults to t + typeDur + the roll (0.8-1.9 s by jump size, the goal 2.4 s; a word answer 0.3 s). `noteT` defaults to 0.35 s after the landing, never before it.
- `check`, `checkT` (default 1.2 s after the last landing): the check line ("10 × 2 + 2 × 3 = 26 PAYDAYS"). `wrongGuess` (see lookOpts) and `hold`.

**Each item** is a hard cut:
1. **Cut** (`thud`): the slot lights in the item's tone (border glow, its number cell a solid lit block, the pointer jumps to it). The label slams into the slot and the working ("$2,500 × 26": the first operand in the tone colour, the rest grey, ≥ 44 px; a working too wide shows its first operand alone) into the slot's answer area. The label stack slams the working (line 1) over the label (line 2). When the working uses the input, the stepped-back hero re-lights green for 0.4 s with a bump and a flare.
2. **Roll** (`roll`): the working hard-cuts to the slot's odometer, which rolls from the working's first operand when that reads like the answer would ($2,500 → $65,000, or $65,000 down to $5,000), else from 0, and ends exactly at `resultT`. The working holds `typeDur`, shortened (down to 0.4 s) so the roll keeps ≥ 0.8 s. A count within one unit of its answer shows the answer (no "$0,000" mid-carry).
3. **Land** (`ding`): exactly on `result`: bump, glow flare, floor bloom. A word answer ("Never") slams in at `resultT` in the working's place. The label stack cuts to the working over "= answer" in the answer's colour.
4. **Note** (a soft `thud`): at `noteT` the note rises into the slot's sub-line and stays. The label stack cuts to "working = answer" over the note in big type: a note "not … = X" sets X coral and strikes it (`buzz`) as the VO line running at noteT says X; another note "… = X" pulses X as the VO says it.

- **Goal** (the first item with tone `goal`, else the last; `lookOpts.goal`): a taller slot, its answer about 1.3× (up to 118 px), a `riser` from its cut, a roll of ≥ 2.4 s when the timing allows, `hit` + `cash`, a big floor bloom, a neon wash and a glow that stays lit. The previous slots settle, and a green answer before it settles to white (an echo slot excepted).
- **One focal number.** The input hero steps back (white, 75%, no glow, over 0.3 s) as soon as the first answer starts to count (never on frame 1), and stays back from the goal's landing.
- **Payoff in the hero** (`heroFinal`, on by default): at verdict.t (no verdict: after the last beat; never before the goal's landing + 0.5 s) the hero hard-cuts to the goal's label as its tag (Inter 700 caps 42 px, one line or two or three balanced lines, ≤ 620 px, the number keeping ≥ 80% of its size) and rolls (1.0-1.4 s) to the goal's result, from the input when it reads like the answer, else from 0. It lands green with a bump, a glow flare and a `ding`, and holds ≥ 1.8 s. The label stack cuts to the tag. `heroFinal.icon` × `count` unit icons sit fanned between tag and number and drop in one by one across the roll (a `pop` each; the last lands with the count), each one unit of the payoff (01a: 2 bills = "your 2 extra checks").
- **Wrong guess** (`wrongGuess`): before its item the slot lights white, the naive working slams into the slot and the label stack, swaps to the odometer and rolls to the wrong answer (`pop`). At `strikeT` a coral line strikes it in the slot and in the label stack, and it dims to coral (`buzz`). At the item's own cut the struck number moves into the sub-line as a small coral struck tag (when the board has sub-lines), and the real working and answer run as usual. The item's note replaces the tag.
- **Check** (`check` at `checkT`): a dashed check slot under the list (a ✓ cell, empty until then) slams the check line in, the part after its last "=" green when it is money, else white (a count is not money); the ✓ lights green (`ding`). The label stack cuts to it too. With no room for the slot, the label stack alone carries it: the sum on line 1 (down to 40 px, else two lines broken at the " + " nearest the middle), "= 26 PAYDAYS" on line 2 in green.
- **Verdict**: the chrome's, in the label slot (the stack yields). At verdict.t the pointer returns to the goal slot, which flares again unless the hero's payoff lands at that moment.
- **Frame 1**: the header, the hero (the input), the footer, the numbered slots. Item 1 at t ≤ 0.3 is already cut at frame 1 (its slot lit, its working in the slot and the label stack) and swaps to its roll by 0.35 s; with `typeDur: 0` frame 1 is 0.35 s into its roll.
- **Layout** (measured with the real fonts; the richest arrangement that fits wins): slots span x 140-940; a number cell, the label (Anton caps, one size per board, 56 → 40 px, one line or two balanced lines), the answer right-aligned at x 918 (Anton odometer, 92 → 48 px). Three row shapes: `side` (the answer centred on the row, label and sub-line stacked on its left), `under` (the answer on the label's line, the sub-line under both, for long notes) and, per row, `stack` (a wide answer would leave its label a column under 300 px: the label takes the full width, the answer its own line under it). A word or unit after the answer's number ("2 a year", "$36/hr") is set small (≥ 42 px) on its baseline. Notes (Inter 600 40 px, grey) go in the sub-line when the board has room, else only in the label stack. A list too long for the frame first gets a compact hero (0.65×, the tag on one line), then gives up the hero row (unless `lookOpts.hero` is set), and only then its slot labels. Spare room grows the padding and gaps, then centres the board.

| lookOpts | Default | Effect |
|---|---|---|
| `hero` | `'input'` with a numeric `data.input`, else none | `false` / `'none'`: no hero row (the stage starts under the footer). `'result'` is retired: it warns and means the default |
| `heroTag` | `true` | the input's label and note beside the hero |
| `heroFinal` | `true` | `false`: the input stays up to the last frame (it still steps back at the goal's landing). `{ t, display, tag, icon, count }`: when (default verdict.t), what (default the goal's result), its tag (default the goal's label; `''` for none, and the label stack clears), and `count` (1-4, default 1) `icon`s (lib `ICONS`, default none) |
| `slotFormula` | `true` | `false` (or `typeDur: 0`): no working in the slot; the roll starts at the cut and the working shows only in the label stack |
| `labels` | `'reveal'` | `'always'`: labels grey from frame 1, lit at their cut (the open-loop variant); `'none'`: number and answer only, the label stack names each item |
| `notes` | `'auto'` | `'slot'` / `'label'` / `false`: where notes go (auto: the slot when the board fits it) |
| `checkRow` | `'auto'` | `'board'` / `'label'`: where the check goes (auto: the board when it fits) |
| `check`, `checkT` | none | the same as `data.check` / `data.checkT` (data wins); `check` may be `{ t, text }` |
| `wrongGuess` | none | `{ item, t, formula, result, resultT, strike = true, strikeT, label }` or a list of them (also read from `data.wrongGuess`). `resultT` defaults to t + typeDur + its roll; `strikeT` to 0.5 s after it lands or 0.45 s before the item's cut, whichever is later. `strike: false` only replaces it; `label`: a line over its working in the label stack |
| `goal` | the first tone `goal`, else the last item | item index, or `false` (no climax, no payoff, no echo) |
| `echo` | none | `[item, …]` or `{ t, items }`: earlier slots that light with the goal at t (default verdict.t, else after the last beat; never before the goal lands): a hard cut to the goal's lit state (a softer wash, the answer in the goal's colour) with a bump and a glow flare, then half-lit like the goal. For an earlier answer that is the payoff in another guise (01a: "a normal month" $5,000 = "the 2 checks your budget forgets" $5,000) |
| `intro` | empty | `{ l1, l2 }`: the label stack before the first cut |
| `layout` | auto | `'side'` / `'under'` forces a row shape (`stack` still applies per row) |
| `pointer` | `true` | the pointer in the left margin |
| `startNum` | `1` | the number on the first slot |
| `footerSteps`, `stageBottom` | | kit-wide |

**SFX:** `thud` (0.65) on each cut after frame 1, `roll` while a slot counts, `ding` (0.5) on each landing; the goal adds a `riser` from its cut and lands on `hit` + `cash`. A note: a soft `thud` (0.45), and a `buzz` (0.35) as a "not … = X" total is struck. A wrong guess: `thud`, `roll`, `pop` on its landing, `buzz` at strikeT. The check: `ding` (0.45). The payoff: `roll` + `ding`, and a `pop` (0.3) per payoff icon. An echo: `pop` (0.4), unless it lands at verdict.t (the chrome's `reveal` covers it).

**Limits:**
- A wrong guess must start ≥ 0.3 s after the previous item's cut and ≥ 0.3 s before its own, else it is skipped (console warning).
- A word answer does not roll, and a word goal has no payoff roll; `heroFinal` also does nothing when its display equals the input.
- A goal label too long for a hero tag drops the payoff (console warning: give `heroFinal.tag`).
- A check sum too long even for two label-stack lines becomes "Σ = …" (console warning).
- No hero row and item 1 after 0.3 s: frame 1 shows no figure (console warning). A board that gives up its hero row or still does not fit warns too.
- Duration: `durationOf` as usual, and at least 1.8 s past the payoff's landing.

Example: `studio/specs/01a-scoreboard-paid-biweekly.json` (paid every 2 weeks: input $2,500, `typeDur` 0.8, 3 items with item 1 already cut at frame 1, a struck "not × 24 = $60,000" note, a check at 17.5 s, `heroFinal` at 15.6 s tagged "Your 2 extra checks" with 2 `bill` icons, and `echo` lighting item index 1 ("A normal month", $5,000) with the goal at verdict.t). Samples: `dead-simple-list.json` ($72,000 salary, 4 items, notes, a check, the default payoff at verdict.t); `dead-simple-list-2.json` ($25/hr, 6 items, `labels: 'always'`, a struck wrong guess before item index 4).

## find-your-row

The lookup table (P7) as a dark leaderboard; no hero row. Every row's key is on the board from frame 1 beside LED-off placeholders; rows fill top to bottom (a soft tick each, a thud when complete); picks light their row, glide a pointer to it and slam their label into the bottom strip.

- **Column heads**: Inter caps at 40 px on one line or two (as written with `\n`, or balanced at the best word break). Columns pack from the left, so a long head reaches over the previous column's slack; when two lines can't pack, heads wrap in their own slots in as few balanced lines as fit (letter-spacing 0.01em), and the key column's head may overhang left (to x 64) rather than take a 4th line; they shrink below 40 px only after that. Keep heads short: the footer carries the assumptions ("Rate", "Monthly", "Interest", "Total paid").
- **data**: `columns: [{ label, emph?, tone? }]` (2-4; the `emph` column, default the last, lands in green, or in its `tone`'s colour), `rows: [[display, …]]`, `formula`, `rowsT` (0.4) and `rowEvery` (0.25), or `rowT: [..]` (rows at t ≤ 0 are filled on frame 1), `pick: [{ row, label, t }]` (t defaults to 1 s after the board fills, then every 3 s), `hold` (4).
- **Strip**: the formula (the one-line working, Inter 40 px) under the pick label when the board leaves room (`stack`), else they share one slot (`swap`: the formula first, each pick label as a hard cut held 2.5 s, then the formula again, but only when it can stand 1.5 s before the next pick or the verdict; else the label holds until then). A pick label fits one line down to 52 px, else two balanced lines (≥ 42 px), and then the formula gives its row up while the pick holds.
- **Verdict**: the chrome's, in the strip under the board. With a verdict, the strip keeps `min(150, L.verdictNeed) - 8` px from frame 1 (the rows take a smaller pitch, never under 40, so nothing moves later); only a board too long for that even at a 40 px pitch lets the verdict land on the band, which then hides whole rows (`data-band-unit`), never a sliver. A **late verdict** (captions on, landing ≥ 0.15 s after the last VO line ends) needs no strip room of its own: it takes the strip and the caption band together (a `verdictSlot` down to y 1468, 10 px above the caption band's foot), set larger than any pick label, and the rows keep the room.
- **Rows**: the row pitch is what the stage leaves between the heads and the strip, 40-80 px (cells 40-64 px, Anton, tabular digits); a board of 6 rows or fewer may go to 96 px with 72 px cells, and room left past that cap goes half above the board, so a short table sits mid-frame instead of hanging under the header. Pitches under 54 px run as zebra stripes without slot outlines.
- **Pick labels** slam within the strip (`slamFit`: x and y).

| lookOpts | Default | Effect |
|---|---|---|
| `prompt` | none | a task line ("Find **your age**") in the pick slot until the first pick (stacked strip only) |
| `strip` | `'auto'` | `'stack'` / `'swap'` forces the strip mode |
| `dim` / `dimRest` | `0.5` / `0.85` | opacity of the other rows while a pick lands, and what they recover to 1.6 s later |
| `pointer` | `true` | the pointer on the left margin (in the emphasised column's colour) |
| `verdictRow` | none | row index: at verdict.t that row is picked too (the same meaning as in the other kits, so a port keeps it). The pointer glides to it, the row lights, the others dim, and its emphasised cell lands the climax bump (1.13, glow flare). It leads the verdict by up to 0.25 s (never before the last VO line ends, and ≥ 0.6 s after the pick before it), so the row is lit as the verdict slams in; the label before it holds the strip until the verdict lands. No label (the verdict takes the strip) and no sound of its own |

Ported: `studio/specs/02c-scoreboard-salary-per-hour.json` (`verdictRow: 0`).

Samples: `find-your-row.json` (9 rows, 3 columns, captions off, prompt, two picks); `find-your-row-2.json` (14 rows, 4 columns, a two-line footer, captions off, a red emphasised column, a pick on the last row, a two-line verdict under the whole board).

## what-difference

"What difference does X make?" (P5) as a leaderboard: one row per option, all named from frame 1 with "?" in the score slots. Each option is a hard cut (the label stack slams line 1 `detail` / line 2 `name`, the row lights, a pointer jumps to it); its time bar then races at one shared speed (a shorter bar is a sooner payoff) with the bar metric riding the bar's end ("60 MONTHS"), while the hero rolls the money metric on the same clock, from the previous option's landed score (≈ $587,200 rolls down to ≈ $508,600: the gap is the motion; up from zero for the first race). The delta slams into the label stack. At verdict.t the winner glows, the others dim, and **the hero rolls to the winner's delta** when it is the same kind as the hero's metric (a money delta on a money hero, "INTEREST ≈ $1,288 LESS"; a duration delta on a duration hero, "≈ 10 years sooner"), so the payoff is the last number up top; a winner without such a delta rolls to its own value the verdict quotes, else keeps its own value.

- **Board**: two-line rows (name + value columns on top, the time bar below) when a row gets ≥ 90 px, else one line. The bar metric has no column head on two-line rows (its value labels the bar: inside the bar's end when its landed label fits there, waiting at the track's start with the passing edge dimmed until the end reaches it, else just past the end; the side is fixed from the landed bar, never switched mid-race); every other value metric gets its own right-aligned, measured column with its head over it. At most two value columns (the hero's metric first): a third value metric is left off the board. Names sit in one inner span (see Type: no `rich()` straight into a flex box).
- **Names, one size per board**, fitted to the space left of the value columns: one line at ≥ 44 px; else the value columns give up a few px (12 at most, never under 46); else every row goes into two-line mode (balanced, a short name stays on one line) at one size ≥ 40 px when the top line has the height; else (two-line rows) **values below**: the name gets the whole top line, the value columns move down into the bar line (right-aligned, heads unchanged) and the bar track ends 24 px short of them, so the bars keep one shared scale. Only cramped one-line rows go to the 40 px floor.
- **Counts**: every running value (the hero, the row cells, the bar labels) shows its "≈" as an unlit ghost until it lands.
- **Layout**: the kit grid (captions on: stage ≈ 595-1130, the label stack and then the verdict in the slot above the caption band; `lookOpts.stageBottom` moves the split). The verdict is the chrome's.
- **data** extras: `options[].resultT` pins when an option's race lands; `options[].deltaT` when its delta slams in; `data.winnerT` when the winner's payoff **lands** in the hero (its 1.0 s roll and the board's winner beat start 1.04 s before, not before verdict.t; with no payoff to roll it is the winner beat itself). Default: the winner beat at verdict.t (no verdict: 0.9 s after the last beat), the payoff 1.04 s later.
- **Sound**: `thud` on each cut, `roll` while a bar races, `ding` on its landing, `pop` for each delta and label step, `tick` for each read, `cash` 0.3 s into the winner beat, and a soft `roll` under the payoff.

| lookOpts | Default | Effect |
|---|---|---|
| `counter` | `"interest"`, else the first money metric | the metric key the hero rolls; `"stake"` keeps the stake in the hero (every row cell then rolls with its bar) |
| `bar` | the first all-duration metric, else the first numeric one | the metric key that drives the bars (durations compared in months) |
| `intro` | auto | `true`/`false` forces the stake intro |
| `race` | `2.4` | seconds the longest bar takes; every bar moves at that one speed |
| `keepSpeed` | off | `true`: an `options[].resultT` later than its race needs keeps the shared bar speed (the bar waits, lit but empty, and starts so it lands on resultT) instead of crawling from the cut to resultT |
| `heroRoll` | `'from'` | `'zero'`: the hero rolls each race up from zero instead of from the previous option's landed value |
| `heroEnd` | the delta | `'value'`: the winner beat rolls the hero from the **first** option's value of its metric (in that option's colour) to the winner's own (turning to its colour as it rolls), tagged with the metric's label; the delta is left to the verdict, so hero and verdict never say the same words (03b: ≈ 15.1 → ≈ 4.8 years under "≈ 10 years sooner"). Needs a winner other than option 0 |
| `endTag` | the hero metric's label | the hero's tag for the winner's payoff (a string), or `false` for none |
| `reads` | none | `[t, …]` or `[{ t }, …]`: the VO speaks the number the hero holds: the hero bumps 6% and its glow flares (`tick`). `{ t, option, metric? }`: the VO speaks a number already posted in that option's row: that cell (`metric` default the hero's metric, else the first value column; the bar metric means the bar's label) swells (up 0.08 s, held 0.3 s, down 0.25 s; 16%, less where the cell has less room) and glows in its own colour (`tick`), while the label stack steps back to 55%. Reads at t ≤ 0.05 are ignored |
| `labelSteps` | none | `[{ t, option, text, small? }]`: the label stack slams a line 2 of its own while that option is active ("40 months sooner" as the VO says it, before the delta), `pop`; line 1 stays the option's detail. `small: true` sets it one size down (× 0.88, ≥ 54 px) so the hero stays the focal number |
| `firstName` | `true` | `false`: the first option, landed at frame 1 (no intro), shows only its line 1 (the payment), so the frame-1 stack doesn't repeat lane 1's name under the hero |
| `heads` | `true` | `false`: no column heads over the board (the hero's tag already names its metric); the rows take the room |
| `footerSteps` | none | kit-wide (see above) |
| `stageBottom` | the kit grid | y where the stage ends |

Ported: `studio/specs/03b-scoreboard-card-minimum.json` (`keepSpeed`, `heroEnd: 'value'`, hero and cell `reads`, `labelSteps` with `small`, `data.winnerT`); `studio/specs/03c-scoreboard-mortgage-extra-100.json` (`firstName: false`, `heads: false`, `footerSteps`, `labelSteps`).

Samples: `what-difference.json` (car loan, 3 options, captions on); `what-difference-2.json` (credit card, 4 options, captions off, long names, mixed duration units, `resultT`/`deltaT` on option 2). Stress (not in the repo): 4 options named like "Just the required payment every month" with two value columns, captions off, run in the values-below layout.

## chart-race

Same-stake line race (P4), ChartOrbit's mechanic as a live scoreboard: glowing lines and tips with live counters, an auto-rescaling y axis, a dashed stake line, and a big faint year clock in the plot's **top-left** corner (the same spot as pov-race; it dims while a line or a tip label passes through it, and it holds the last year: `x.to` 2025 or 2025.99 both end on "2025"). The hero is the leader's live value with the leader's name as a tag (at most two balanced lines at ≥ 42 px; the number shrinks so tag + number fit the row at the finish's 1.13 bump). A lead change is a hard cut, a bump and a `swipe`. Event flags slam into the strip above the plot (captions on: each holds until a newer label needs its spot, or `flagHold` s, and the strip clears as the finals land), or into the label stack (captions off), held 2.5 s (or until the next flag) before the stack cuts back to the matchup (stake / NAME VS NAME). The finish lands every tip and the hero exactly on the `final` strings.

- **Tip labels** stay inside the plot (the x ticks under it always read) and at x ≥ 68. A label wider than 60% of the plot stacks its name over its value, the name fitted to min(plot - 60, 560) px at 42 px: one line, else two balanced lines, else (give `series.label` for a better short name) its leading words. The dashed stake line's label gives way while a line runs within 24 px of it.
- **Matchup** (captions off): names never wrap inside: "NAME VS NAME" on one line, or broken only at a VS; names too long for that stack as NAME / VS / NAME, each fitted to 780 px on its own line (≥ 40 px; a name still too wide takes two balanced lines of its own, and the stake line gives its row up).
- **Verdict**: with captions on the verdict lands on the band over the stage foot, so the plot box compresses over the 0.3 s before verdict.t (same y range, squeezed) and both lines, their tips and the x ticks stay above it.
- **Hook** (`lookOpts.hook`, a cold open on the claim): until `until` (= raceT[0], > 0.7 s) the plot holds a duel of neon columns instead of the parked race: one column per racer (its `values` display over a bar to scale, the name inside the bar, `sub` under the floor), the `series` column lit, the clock on `year` (default the last year), the `ask` in the flag strip; the clock and the tallest number keep ≥ 24 px under the ask. At `ratioT` a dashed rule wipes from the shorter column's top across the taller one and `ratioTag` ("≈ ×2") slams in above it (`tick`); at `litT` the lit column's number bumps (`pop`). From `until` − 0.7 s the rewind: the counters roll down with the bars, the bars drain into the floor and the clock rolls back to x.from (`roll`); the race then fades in over 0.2 s and starts. The hero holds the stake meanwhile.

| lookOpts | Default | Effect |
|---|---|---|
| `stakeLine` | the common start value | number: the dashed line's value; `false`: none |
| `stakeTag` | none | a grey caps tag beside the hero while it shows the stake ("EACH"); only when every racer starts on the stake that `data.stake` names |
| `flags` | chart with captions, else labels | `'chart'` / `'labels'` |
| `flagHold` | until a newer label needs its spot | s a chart-strip flag label holds; an event's dashed rule fades out with its label |
| `flagNames` | off | `true`: a racer's name in a chart-strip flag label is set in its line colour ("2018: EUROPE ≈ −15%") |
| `emColor` | the kit's green | colour of `**` emphasis in the chart flags and the verdict (and its rule): a theme key, a hex, or `'winner'`. An array colours the verdict's `**` runs in order; its last colour is the rule's and the flags' |
| `finalT` | none: the winner takes the hero at the finish | `[t per series]`, in `data.series` order: a staggered finish that follows the VO. The tips still land together; the hero shows the latest series whose finalT has passed (at or before raceT[1]: it lands with the tips; later: a hard cut with a `pop`). The winner's reveal is the climax (riser → hit + cash, the 1.13 bump, its tip flare); an earlier reveal lands with a smaller bump. A series (not held back) whose finalT is after raceT[1] stops on its exact close: its tip and the hero hold the running-format value ("$22,661", no "≈", no settle roll), and the rounded `final` lands at finalT with a bump and a `pop` |
| `holdBack` | none | `{ series, t: [t0, t1], follow? }`: a delayed reveal. That series stops at its second-to-last point while the clock runs on (its tip label holds that value), draws its last segment over t0 → t1 (the riser under it) and lands its final at t1 (set its finalT to t1 too). From the moment it stops the hero follows the rivals still racing (a hard cut, `swipe`). `follow: true`: the hero cuts to the held series at t0 (`swipe`), rolls up with its last leg and lands on its final at t1 (the climax) |
| `heroSteps` | none | `[{ t, series }]`: after the finish the hero cuts back to that racer's final at t (once it has been revealed): a bump and a `swipe`. The latest reveal or step wins |
| `tipLane` | off | `true`: ChartOrbit's direct labels. Every tip label stacks name over value, and the lines end short of the plot's right edge so the widest label always fits right of its tip in the empty "future" lane (axis, grid and stake line end where the data ends) |
| `tipBeats` | none | `[{ t, series }]`: that racer's tip label bumps and its halo flares at t, with a soft `pop` (a spoken bound on a live tip) |
| `rungs` | none | `{ t, items: [[value, display, t?], …] }`: the doublings ladder. At t the y grid gives way to dashed rungs at each value (stake × 2, × 4 …), labelled with their displays in the axis margin, wiping in bottom-up one every 0.16 s with a `tick`. A rung with its own t before rungs.t wipes in early over the live grid (a grid label it would touch gives way) and ends at the race's current x until rungs.t |
| `yearSize` / `yearPrefix` | `160` / `"YEAR "` | the corner clock (prefix for a non-calendar x) |
| `yearAlpha` | `0.34` | the corner clock's white alpha (0.08-0.6; it dims to 40% of that under ink) |
| `yearHold` | none | `[year, …]`: closes the VO names mid-race; the clock holds that year 0.5 s past its close before it rolls on |
| `hook` | none | `{ until, values: [display per series], year?, series?, ask?, sub?: [line per series], ratioT?, ratioTag?, litT? }`: see Hook above |
| `footerSteps` | none | kit-wide, but drawn by the format: a racer's name in a step's text is set in its line colour |
| `stageBottom` | 1300 with captions, 1240 without | the chart's tall stage (with captions the verdict rises on a band over its foot) |

Ported: `studio/specs/04a-scoreboard-sp500-vs-gold.json` (`finalT`, `flagHold`, `tipLane`, `holdBack`, `emColor`, `rungs`); `studio/specs/04c-scoreboard-usa-vs-europe.json` (`hook`, `holdBack` with `follow`, `tipBeats`, `flagNames`, `heroSteps`, `yearHold`, `stakeTag`, an `emColor` array).

`series[].label` (shorter tip/tag name), `series[].color` (a theme key or hex), `series[].basis` (a grey dashed money-in line, never the leader). Samples: `chart-race.json` (S&P vs gold from 2008, captions on, opens mid-race); `chart-race-2.json` (three rivals, captions off).

## split-sheet

One round sum, every percentage in dollars (P9). The whole sheet is on screen at frame 1; a pointer (in the row's tone) walks it, each part a hard cut: the bar splits, the slice drains into its colour while the row's counter rolls, and it lands on the part's `amount`. The check re-joins the slices. **Hero**: the total; with deductions (a part with tone `bad`) and a goal part it counts down to the goal's amount as the goal row lands ($10,000 → $6,535); and at verdict.t it rolls to the verdict's first emphasised money figure when that differs, **tagged** with the verdict's words after the figure ("**$15,000** a year invested" → "A YEAR INVESTED $15,000", Inter 700 caps 42 px, left of the number: the number's meaning changed). No tag to be had (the figure ends its line): the hero keeps the total. Dense sheets (6-7 parts with captions on) are budgeted down to compact rows and a one-line label stack before any label goes under 40 px.

- **Notes always show** (they are the napkin working). On the sheet first: under the part's label, running under the % (which then rides on the label's line) up to the amounts, on two balanced lines if needed. Else in the label stack's third line, when the slot holds three lines. Else the note takes the part name's place in the label stack (the lit row names the part). The kit warns in the console if a note still has no room.
- **Verdict room**: with a verdict the solver keeps `min(150, L.verdictNeed) - 8` px under the sheet, so the verdict lands under it; only a sheet that can't have that (e.g. 7 parts, captions on, a two-line verdict) lets the band rise, and it hides the rows it reaches whole.

| lookOpts | Default | Effect |
|---|---|---|
| `hero` | `"remaining"` with deductions + a goal, else `"total"` | `"remaining"` counts down what is left; that row's amount slams in instead of rolling |
| `remaining` | the goal's amount | `[{ t, display }]`: the hero's landings in remaining mode |
| `heroFinal` | the verdict's emphasised money figure, at verdict.t, tagged | `{ t, display, tag }`, or `false` |
| `icon` | none | a unit icon beside the hero |
| `heroTag` | none | a tag ("LEFT") the hero carries in remaining mode, in the payoff tag's slot left of the number (in place of the icon), from its first roll until heroFinal, so the big number is never unlabelled |
| `bonus` | none | `{ t, label, amount, tone = 'good', focusT }`: a dashed extra row under the sheet (not part of the total) that slams in at t (default 1.2 s after the last landing or the check) and rolls its amount; the sheet sits centred without it and moves up as it lands. `focusT`: when the VO names the row (a frame-1 bonus has no beat of its own), the pointer and the label stack return to it (`thud`, the amount bumps), and from verdict.t it stays lit beside the goal row |
| `rolls` | `1.0` s (`1.35` for the goal / last part), shorter if the next cut is near | `[seconds or null, …]` per part: that part's roll (cut + 0.18 s + roll = its landing), so a number lands on the word that says it |
| `labelWorking` | `true` | `false`: the label stack drops its working line ("$100.00 × 88.91%") for parts and the bonus, so a beat's working shows once (the footer's); the check keeps its sum |
| `introTag` | off | `true`: the intro's total label sits in the label stack at tag size (Inter 42 grey), not as a second headline |
| `solidBar` | off | `true`: until the first cut the bar is one solid green bar with the total on it (no split notches at frame 1); after it, the pool is the dim remainder without notches |
| `notes` | `"auto"` | `"sheet"` (= auto) / `"label"` (skip the sheet) / `false` (no notes): where part notes go |
| `maskPct` | none | `[part index]`: those percentages read "?" until their cut |
| `intro`, `footerSteps`, `stageBottom` | | kit-wide |

Ported: `studio/specs/05c-scoreboard-costco-100.json` (remaining mode with `heroTag`, `rolls`, `labelWorking: false`, `introTag`, `solidBar`, a frame-1 `bonus` with `focusT`, `maskPct`).

Samples: `split-sheet.json` (60/25/15 on $5,000, captions on, notes on the sheet, a tagged hero payoff); `split-sheet-2.json` (a $10,000 bonus, 5 rows, deductions, captions off, no intro).

## pov-race

"POV: you invested in X instead of paying $Y for X's product" (P6): a split scoreboard in the top bar (SPENT | IN STOCK, both live), the spend line (white) against the own line (green) with the gap filled green/coral, purchase icons dropping onto the spend line with price tags, and the year clock top-left (as chart-race). When the spend line starts tiny (under 5% of where it ends), the axis opens at 2× what frame 1 shows. Captions off: the label stack rests on the matchup (spend label in coral VS own label in green) and each purchase is a hard cut held 1.7 s. The verdict is the chrome's (its rule coral when owning lost).

| lookOpts | Default | Effect |
|---|---|---|
| `spendTag` / `ownTag` | `spend.label` / "in … stock" from `own.label` | the scoreboard tags (fitted to 440 px at 40-42 px; too long: without the glyph, then without a leading "in ", then without "spent on / paid to …" ("GAMING PCS"), then "SPENT" / "INVESTED") |
| `tags` | `true` | price tags on the chart. Each tag takes the best-scored spot at mount (on the lines, tips and icons it would cover and the x-tick labels it would hide): around its icon, out in the empty future right of the tips, or the top band over the plot (as chart-race's flags), straight over its ticket. Mid-race tags usually land in the top band; when every spot crosses something, a tag parks there detached, over the corner year (which dims under it) |
| `pips` | off | `true`: only the latest purchase stands on the line as a full icon; at the next purchase a ticket shrinks into a small pip on the spend line (0.25 s), so lines that run together never cut a full icon |
| `spendTip` | `true` | the "$499 / SPENT" tag riding the spend line's right end, shown only where it is clear of the own line, its tip and the icons |
| `gapFill` | `true` | the fill between the lines |
| `yearClock` | `true` | the corner year |
| `unit` | none | the answer row (below) |
| `cover` | none | `'clean'` (with raceT[0] > 0.1): frame 1 carries only the hook's own price: the board's counters wait LED-off as unlit ghost digits in the shape of their first value ("$–.––", 16% white), and a purchase at the clock's start drops in with the race at raceT[0] (no receipt on the cover) |
| `payoff` | none | `{ t, display, icon, dur = 1.4 }`: the payoff lands last in the hero. At t (default verdict.t, else 2 s after the finish) the split board hard-cuts to one hero number (the icon, default the unit's or the spend item's, + an odometer at the hero size). `dur > 0`: it rolls from 0 onto `display`, then a 1.13 bump, glow, a stage bloom and a `hit`. `dur: 0`: the answer the row already holds is cut up whole, and bump, glow, bloom and `hit` all land at t. The board does not come back |
| `footerSteps`, `stageBottom` | | kit-wide (stage default 1300 with captions, 1236 without; with `unit`, just above the answer row). Each footer step gets a soft `tick` (not at the finish or the verdict) |

With captions on the verdict lands on the band over the stage foot, so the plot box compresses over the 0.3 s before verdict.t and both lines (the spend line too), the icons and the x ticks stay above it. Start `raceT` at -0.4 s so frame 1 is already moving (a race that waits 2 s opens on a still plot). The scoreboard row, the footer and the stage sit 24 px lower than the grid (air under the hook). The year clock rolls to y + 1 one frame after year y's Dec-31 close, so each close shows under its own year. A purchase at the point where both lines start stands just left of it, so the own line never runs through it. A cue the spec already places in `spec.sfx` (same kind within 0.25 s) is not doubled.

**Answer row** (`lookOpts.unit`): the stake re-priced in the hook's own unit ("$19.99 Netflix, free for how many years?"), in the bottom bar where the label stack sits: line 1 the working, line 2 the answer, big and green, with the spend item's icon. It yields to the verdict. `{ per, perMonth = per / 12, formula, empty = "? years", holds: [{ x, t?, hold?, work, display, tone? }], final, finalWork, hold = 1.3, pause = true, icon = spend.item }`:
- frame 1: line 1 `formula` ("stock ÷ ($19.99 × 12)"), line 2 `empty` ("? YEARS"). From raceT[0] line 2 counts the IN STOCK counter ÷ `per` live ("≈" a ghost): under a year in whole months (÷ `perMonth`), 1-10 years to 1 dp, then whole years.
- each hold (a spoken year-end x): line 1 cuts to its `work` ("2020: $9,181 ÷ $239.88"), line 2 lands on `display` ("≈ 38 years") with a bump, a glow flare, a floor bloom and a `ding` (tone `bad`: coral, on a `thud`), held its own `hold` s (else `unit.hold`).
- the race **pauses** on each hold (unless `pause: false`): the clock stops at the hold's x, so the counters, tips, lines and year clock all show the year-end the row holds. A hold's `t` pins when the race reaches it; holds without one share their gap's moving time in proportion to x, and the race still ends at raceT[1]. With `pause: false` the race runs on and the row catches up over 0.35 s after each hold.
- the finish: no landing in the row (the board's dollars own it). Line 1 cuts softly to `finalWork` (use the board's own rounded figure), and line 2 rests on `final` with its "≈" still a ghost, dimmed to half. The payoff lights it.

Ported: `studio/specs/06b-scoreboard-netflix-bill.json` (`cover: 'clean'`, `pips`, an answer row with holds, a `dur: 0` payoff); `studio/specs/06a-scoreboard-first-iphone-apple.json` (`tags: false`, `footerSteps`).

Samples: `pov-race.json` (Netflix bills vs NFLX, captions on, opens mid-race); `pov-race-2.json` (lattes vs SBUX, captions off, opens mid-race).

## ledger-duel

The "2 people invest" ledger duel (P4) as a two-team scoreboard: the same stake, two choices side by side, a year-by-year ledger that fills both sides at once (often with a crash row mid-way), then the full table holds and the winner lights up. No hero row (`layoutFor(spec, { hero: false })`): the two panels are the heroes. The top bar is the chrome's (header, footer, `footerSteps`).

**data:** `people: [{ name, plan }]` (two), `stake` (the label stack's resting working), `rows: [{ t?, label, values: [a, b], event?, tone? }]` (6-12 rows, display strings), `rowsT` (1.0), `rowEvery` (0.6), `winner` (the panel that floods: 0 or 1; left out: the better last row; `null` or `-1`: no flood), `hold`.

**Stage**, from the top:
- **Ticker** (top-left, x 140; Anton 120 px, 108 with captions on, giving up size down to 80 before the strip goes under 2 slots): the current row's key ("2008", "AGE 45"). A word part ("AGE") is small and grey before the number; when only the number moves it rolls on an odometer (0.32 s) and bumps, any other change ("Start") slams. Coral on a bad row. White on its cut, it settles to light grey 0.5 s later (`tickerRest`), and steps back (grey, 60%) once the climax row cuts.
- **Pips**, right-aligned on the ticker's baseline: one LED bar per row (passed dim green, current lit, ahead dark, bad rows coral), decoration.
- **Strip** (the mini ledger, 2-6 slots as the stage allows): when a row cuts, the row it replaces ships out of the panels into the bottom slot (0.2 s), the older lines move up and the oldest fades off. Key on the left, each value right-aligned over its panel (Anton 40-44 px, tabular, the person's colour; a value that went the wrong way coral). A bad row keeps a coral slot edge and key; another event row an edge in its tone's colour. A key too wide moves column A right, then the type goes to 40 px, then a key ending in a number shows only that number ("Dot-com bust 2002" → "2002"), then it is cut with "…". Empty slots are LED-off skeletons from frame 1.
- **Panels** (x 140-530 | 550-940, the kit's `sb-panel` box): a colour stripe, the name (Anton caps in the person's colour; too long for 44 px: two balanced lines), the plan (Inter 40 grey; a " · " piece that names money or a rate is white; one line, else one line per piece), a hairline, then the odometer, one size for both panels (the widest value either side ever shows fits at its biggest frame). The leading panel's border is lit in its colour (`leader`).

**Beats:**
- **Rows**: each row is a hard cut (`thud`): ticker, pips and strip move; 0.08 s later both odometers roll from the previous values on one `ease.out` curve ("≈" a ghost) and land exactly on the row's display strings with a bump and a glow flare (`ding`). A row that switches to a scaled display ("≈ $1.4M" after "≈ $80,000") counts in the previous units until a tenth of the new one (never "$0.0M"). A value that went the wrong way (fell; rose in a `'low'` duel) rolls coral and stays coral until the next row. A cell that is not a number ("—") is a hard cut. A lead change bumps the new leader (`swipe`).
- **Events**: a `tone: 'bad'` row (a crash) flashes coral on its cut: a coral wash wipes over the panels, their borders flare coral, the ticker turns coral (`thud` + `buzz`). Any other event (good/goal green, neutral white) flashes when its row lands, so the label never claims what the board does not show yet. An event that names exactly one person flashes only that panel. Label stack line 2 cuts to the event text, in its tone's colour, as the flash fires, held `eventHold` s or until the next event.
- **Climax** (the last row, unless it is a crash): it rolls `finalRoll` s over a `riser` and lands with `hit` + `cash`, a bump, a full glow on the better value and a green floor bloom; both values then hold at 1.07×. If the better side went the wrong way (a portfolio that fell) it lands on `thud` + a soft `buzz` (no cash, no bloom). An event on the last row waits for that landing.
- **Table** ("the full table holds"): at `tableT` the ticker and pips yield and the strip re-packs, as a hard cut (`thud`), into the whole room above the panels: every row (the last one lit), then the totals line. The pitch is what the room leaves, down to 44 px at 40 px type (under 54 px: zebra stripes without outlines, as find-your-row). A duel too long for that drops plain rows first (those closest to their neighbours' trend, evenly spread), never the first, the last, the totals or an event or crash row.
- **Summary** (`summary`, e.g. the final multiples): one line under each panel's number ("GREW ≈ 7.5×": label grey caps 42 px, value in the person's or the tone's colour), its slot LED-off from frame 1, landing at its t (`pop`). When label + value don't fit one line at 42 px it becomes the table's TOTALS line (with no room for a table it ships into the strip after the last row; with no strip, the label sits over the value in the panel).
- **Label stack**: line 1 the working (`data.stake`, then the `working` steps; a line starting "Ava: …" sets the name in her colour), line 2 the matchup "NAME VS NAME" in the panels' colours, or the current event. Every change is a hard cut, centred in the slot.
- **Winner beat** (`winnerT`): the winner panel floods neon as a hard cut (the fill jumps to 70% of its colour and its type turns black on that frame, then the fill eases to full and the border glows); the other panel steps back to 60%.
- **Verdict**: the chrome's, in the label slot (the stack yields). If a `stageBottom` forces the verdict onto the band over the stage foot, the ticker/strip/panel block ends above it. Below y 820 every text ends by x 918.
- **Frame 1**: the header, both panels named with their plans, the ticker on row 1's key, both odometers showing a number. Row 1 at t ≤ 0.05 is landed on frame 1 (the whole bet, "$10,000 | $10,000"); a later row 1 has both odometers already counting up from 0 on frame 1, landing 0.6 s after its t.
- **Timing**: rows without t start at `rowsT` and come every `rowEvery` s, plus `eventPause` after an event row (the becker rig's defaults, so a spec keeps its timing in either look). A roll lasts 0.8-1.9 s by the jump, capped to land 0.12 s before the next cut. Spare stage room grows the strip's pitch, then the ticker, and the rest centres the block.

| lookOpts | Default | Effect |
|---|---|---|
| `leader` | `'low'` when `data.winner` ends lower than the other side, else `'high'` | which way is better: `'high'` (more money) or `'low'` (a cost or debt duel). It sets the leader's lit border, which values roll coral, and the auto winner. `false`: no leader border (the direction is still inferred for the colours) |
| `colors` | green, yellow | `[a, b]`: theme keys (`'green'`, `'yellow'`, `'white'`, `'red'`) or hex |
| `strip` | `'auto'` | `'auto'`: 2-6 slots as the stage allows, else none; `true`: 1 slot allowed too; `n`: at most n slots (≤ 8); `false`: no strip and no final table |
| `table` | `true` | the final full table |
| `tableRows` | the kit's drop rule | `[i, …]`: the rows the final table keeps (the first and the last always stay); if they still don't fit, the drop rule thins them further |
| `tableT` | 0.5 s after the climax lands | when the full table forms, kept between 0.1 s after the landing and the winner beat. Until then ticker, pips and strip hold, so the climax value owns the stage while the VO names it |
| `pips` | `true` | the row pips |
| `working` | none | `[{ t, text }]`: label stack line 1 over time (`data.stake` before the first). `formulaBar` is read as an alias; a leading "= " is dropped |
| `matchup` | `true` | line 2 rests on "NAME VS NAME" |
| `eventHold` | `2.5` | s an event holds line 2 |
| `eventPause` | `1.2` | extra s after an event row, for rows without t |
| `marks` | none | `[{ t, row, person }]`: the picture follows a VO that names one finished value. At t (once the row has landed) that value takes the focus until the next mark or the winner beat: on a panel its border lights in the person's colour, the value bumps and flares, the other value steps back to 70%; in the strip or table a ring in the person's colour around the cell (`tick`) |
| `summary` | none | `{ t, label, values: [a, b], tone }`: see Summary; t defaults to 0.5 s after the last landing |
| `finalRoll` | `2.4` | s the last row rolls, shortened to land 1.3 s before the verdict with a summary (0.6 s without), 0.4 s before `summary.t` and 0.15 s before a mark on the last row, never under its own roll (≥ 1.0 s) |
| `winnerT` | verdict.t | the winner beat (no verdict: 1.2 s after the last landing, or 1.6 s after the last mark). Away from verdict.t it cues its own `reveal` |
| `planFocus` | none | `[{ t, d = 2.0 }]`: the picture for a VO line about the stakes ("Ben invests 3 times as much"): the money piece of each plan (the white " · " piece) lights in its person's colour with a glow and a bump, the rest of the plan dims, and both odometers step back to 70%, for d s. A row cut inside [t − 0.3, t + d] lands quietly (its thud, no ding) |
| `tickerRest` | `true` | the ticker number rests in light grey between cuts (`false`: white) |
| `footerSteps`, `stageBottom` | | kit-wide |

**SFX:** `thud` (0.6) on each row cut after row 1, plus `buzz` (0.35) on a crash row; `roll` while the odometers count (none for rows under 1.6 s apart, except the climax: a thud-ding rhythm); `ding` (0.45) on each landing (a `pop` when a row's cells change without a roll); the climax: `riser`, then `hit` + `cash` (a sad climax: `thud` + `buzz`); `swipe` on a lead change; `tick` per mark; `thud` (0.5) as the table forms; `pop` for the summary; `reveal` for a winner beat away from verdict.t (at verdict.t the chrome's covers it).

**Limits:**
- Exactly two people; at least one row (else an error). The ticker rolls only a key that ends in a number of at most 4 digits, without grouping; other keys slam.
- The final table needs ≥ 2 rows and room for ≥ 3 lines at 44 px, else it is skipped; `strip: false` also drops it.
- Without `marks` the stage holds still between the final landing and the verdict, so a VO that names each final value wants its marks.
- **Porting**: `marks`, `formulaBar` / `working`, `winnerT`, `eventPause` and `leader` carry over from the other looks as written (keep them: they lock the picture to the VO); the other looks' own keys are ignored (the live sheet's `rowLabelsAtStart`, `eventStyle`, `total` and summary placement; the clean sheet's `stake`, `formulas`, `badge`; the becker rig's `figures` and `beats`).

Example: `studio/specs/07a-scoreboard-start-at-25.json` (Ava invests 10 years, Ben 30, at $200 a month: 8 age rows with a neutral "Ava stops · Ben starts" event, `leader: false`, `working` steps that name each person, `planFocus` on the "3 × $24,000" beat, `tableRows: [1, 3, 5]` with `tableT` 14.45, and two `marks` on the last row before the verdict at 18.1). Samples: `ledger-duel.json` (Alex vs Sam, $10,000 from 2000, captions on, a crash row, a good "Alex pulls ahead" event, a "GREW" summary); `ledger-duel-2.json` (index fund vs advisor fees, 11 rows, captions off, a mark, a "FEES TOOK" summary in tone `bad`, a working step).

## growth-ladder

The year-by-year ladder (P2): every row's slot is on the board from frame 1 (LED off); each row is a hard cut, then its Worth cell and the hero count up together on one curve **from what was put in by that row** (never below it; the "≈" stays an unlit ghost until the count lands) while a two-tone meter grows (grey = put in, green = growth, one shared scale). Frame 1 always has row 1's year and put-in on the board with its Worth already counting beside the hero (with `rowsT` ≥ 0.5 the count runs from frame 1 and lands 0.6 s after `rowsT`), so the running number is never tied to nothing. The last row is taller and lands big (riser, hit, cash). Just before the verdict, the rows scroll up under the column labels (the oldest fade out) so the big last row stays in view above the verdict band at the foot of the frame. Boards with more rows than fit scroll through their slots (one row per cut) with ladder pips on the left margin.

| lookOpts | Default | Effect |
|---|---|---|
| `goal` | none | `{ value, display, label }`: a finish line (every meter's scale becomes the goal, a strip names it, both light when a row lands past it; the worth column ends 18 px short of the line) |
| `icon` | none | a unit icon beside the hero counter |
| `input` | auto | `true`/`false` forces the input strip ("$100 A MONTH · 8% A YEAR"); by default it shows only when the header does not already contain `data.input.amount` and the board has room |
| `meters` | `true` | the two-tone meters |
| `beats` | none | `[{ t, l1, l2, hero?, tag? }]`: the working after the ladder has landed ("$5 A DAY × 75,176" / "≈ $375,880"). From the first beat the rows scroll up out of the verdict slot, a black band rises over the stage foot, and each beat slams into the slot as a two-line label stack (line 1 white, line 2 green set from 88 px; spec markup allowed) with a `reveal` (0.6), held until the next beat; the verdict replaces the last one. A beat's t is never before the last landing + 0.3 s; beats within 0.4 s of verdict.t or after it are ignored. `hero` ("× 75,176") / `tag`: the hero hard-cuts to that display (with `heroTag` on, the tag swaps too); a beat with only `hero` moves the hero alone |
| `heroTag` | off | `true`: a two-line tag left of the hero ("YEAR 1" / "$1 A DAY": column 0's label + the row's key, then `data.input`'s amount + per), swapped with each row, so the big number never reads as an unlabelled answer. It replaces the icon |
| `verdictStyle` | the chrome's | `'stack'`: the verdict drawn in the beats' style (a green rule, line 1 white, line 2 big green, split at its "\n") in the same slot, with `reveal` + `cash`; the hero dims to 42% so the verdict is the one focal point on the last frame |

Without `beats`, a long hold after the last row is a static board with only the captions moving. Rows that make room for the beats or the verdict scroll up by whole row pitches (the first row left sits right under the column labels). A meter segment under 6 px is not drawn, and lined boards (≥ 60 px pitch) meter with the bright underline only. The header is built by this format (chrome `header: false`) so "=" and "×" render in Inter Full Black at cap height, and a trailing "?" after "×" is set as a green boxed blank.

Ported: `studio/specs/09c-scoreboard-5-a-day-millionaire.json` (`input: true`, `heroTag`, `verdictStyle: 'stack'`, a hero-only beat with a tag).

Samples: `growth-ladder.json` ($100 a month for 40 years, captions on); `growth-ladder-2.json` (a millionaire goal, captions off, coin icon).

## cost-counter

A real-time cost counter (HD Guy's "X cost in real time"): one continuous stretch, linear in real time, already running at frame 1 (start `counterT` at -0.4 s; the kit warns in the console when it starts at 0). The hero shows only the digits the count has reached (no leading zeros, the "$" hugs the leading digit) and lands exactly on `final` (its "≈" a ghost until then). The stage fills the next milestone's icon from the bottom as the count climbs; a pass pops it (bump, glow, thud + ding), slams the milestone into the label stack and flies the icon into the milestone ladder on the left margin. The label stack rests on the rate and what is counted: line 1 `rateDisplay` (its words grey), line 2 `data.label`. The running count uses `data.dp` (or the dp of `final`), up to 4 places, so a sub-cent rate (`"final": "$0.007"`) counts in the same format it lands on.

| lookOpts | Default | Effect |
|---|---|---|
| `intro` | rate + `data.label` | `{ l1, l2 }`: the label stack's resting state |
| `labels` | the milestone label split at ": " | `[{ l1, l2 }]` per milestone (e.g. "$1,251 × 52 = $65,052") |
| `rateSteps` | none | `[{ t, l1, l2, d? }]`: extra rate beats (held d s, default 4 s or the next beat) |
| `icons` | a keyword guess | per-milestone icon names. An icon that repeats gets a multiplier badge from the number its name leads with ("10 years of median pay" → "×10", Anton 40 px on the ladder, 92 px on the stage icon once it stands), else a stacked twin on the ladder |
| `flash` | `3.0` | seconds a milestone holds the label stack |
| `pips` / `pipLabels` | `true` / none | the milestone ladder; a price beside each ladder icon (grey ahead, white next, green passed). With `pipLabels` the big icon sits right of that column, a flying icon ducks the labels it crosses, and the big icon carries its own label as a tag |
| `tags` | `true` | with `pipLabels`: the big icon's target ("$250K") under its art, white while it fills, green on the pass, gone when it flies (`false`: off) |
| `pipPassed` | none | with `pipLabels`: what each ladder label turns into once its milestone is passed (as its icon lands in the slot, with the slot's bump), e.g. "≈ 2 weeks": the target ahead, the answer behind (`null` keeps that row's pipLabel). A leading "≈ " in either list hangs in a fixed gutter at the column's left edge, so the digits of every row align |
| `badges` | `true` | `false`: a repeated icon never takes a "×N" badge from its name (names that lead with a time, "5 seconds", are not counts); it gets the stacked twin |
| `climaxScale` | `false` | the last milestone's icon grows on its pass: `true` to the art width of the widest icon before it, a number by that factor; capped by the stage room at the pop's peak. Its tag yields as it grows |
| `tallVerdict` | `false` | `true`: the verdict takes the kit's 196 px boxed slot over the stage foot (a black band rises there), so a two-line verdict sets at about 78 px instead of about 70 in the 170 px label slot |
| `ticks` | `true` | a soft tick each real second |
| `heroIcon` | none | a unit icon beside the hero |
| `tone` | green | hero colour (`'bad'` for a cost you lose) |
| `slot` | none | `{ label, empty, t, fill, tone }`: an answer readout in the stage's top-right corner |
| `stream` | `14` | dots a second in the money stream (`false`: off) |
| `icon` | `'coin'` | the stage icon when there are no milestones |

The hero is set about 8% under its full fit (air under the header and above the footer). The big icons keep clear of the ladder column at their biggest frame (the pass bump's peak plus the glow): the art shifts right of the region's centre (up to a resting right edge of x 960) or, past that, shrinks.

Ported: `studio/specs/10c-scoreboard-amazon-makes.json` (`pipLabels` with `pipPassed`, `badges: false`, `climaxScale`, `tallVerdict`); `studio/specs/10a-scoreboard-debt-interest-live.json` (`intro`, `labels`, `rateSteps`, `pipLabels`, `icons`, `heroIcon`).

Samples: `cost-counter.json` (Amazon's sales, captions on); `cost-counter-2.json` (new US debt, captions off, six milestones).
