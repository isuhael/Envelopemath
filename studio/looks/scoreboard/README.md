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
| `formats/<id>.js` | One module per format, all built: `unit-ladder` (the flagship), `find-your-row`, `what-difference`, `chart-race`, `split-sheet`, `pov-race`, `growth-ladder`, `cost-counter`. Each file's header comment is the full reference for its choreography |
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
- One focal number at a time: the hero rolls while the labels sit still. **The payoff lands last in the hero** (unit-ladder's last rung, a race's winner, growth-ladder's last row, split-sheet's verdict figure, what-difference's winning delta).
- Frame 1 never shows an entrance mid-way: `slam`/`rise` with `t0 ≤ 0` return the landed state.
- **One verdict spot.** The verdict always lands at the foot of the frame (`L.verdict`); the header band holds the hook for the whole video.

## Sound grammar (ctx.cue)

Each cue marks a real event, and none repeats per frame.
- `thud` (gain ≈ 0.65): a hard cut lands (a new rung or row).
- `roll` with `dur`: a counter rolls. When only a few objects land (≤ 12), give each one a `pop` (gain ≈ 0.3) instead.
- `ding` (gain ≈ 0.5): a count lands.
- `riser` with `dur`, then `hit` + `cash`: the biggest number.
- `reveal` (gain 0.7) at `verdict.t`: the verdict. The chrome adds it; set `verdictCue: null` to drop it or name another kind.
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
| `header: false` / `footer: false` / `verdict: false` | the format draws that piece itself (no format does any more) |
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
| `footerSteps: [{ t, text }]` | all (the chrome draws it) | The footer rewrites to a working line at each t (`spec.footer` before the first): a hard cut with a 12 px rise. A line too wide for 960 px at 40 px breaks at its " · " into two lines, and the grid makes room for the tallest footer from frame 1 |
| `intro: true / false` | unit-ladder, what-difference, split-sheet | Forces the stake/unit intro on or off (default: on when the first beat starts at ≥ 0.5 s; otherwise frame 1 is already mid-roll on beat 1) |
| `stageBottom: y` | what-difference, split-sheet, chart-race, pov-race | Moves the stage/label split (see `layoutFor`) |

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

**Writing rungs:**
- Pick a cheap, habitual or tribal unit (latte, Big Mac, RTX card), not a luxury or abstract one (research: unit choice swings views 800x).
- Keep the hook to "Cost in units of **X**" with at most one input number.
- Round results with "≈" in `unitsDisplay` exactly as you want them printed. Prefix the `cost` with "≈" when it is an average.

Samples: `unit-ladder.json` (lattes, 5 rungs, captions on, unit intro, verdict, 22 s); `unit-ladder-short.json` (hours of work, 4 rungs, captions off, no intro: frame 1 mid-roll, long two-line labels, 17 s).

## find-your-row

The lookup table (P7) as a dark leaderboard; no hero row. Every row's key is on the board from frame 1 beside LED-off placeholders; rows fill top to bottom (a soft tick each, a thud when complete); picks light their row, glide a pointer to it and slam their label into the bottom strip.

- **Column heads**: Inter caps at 40 px on one line or two (as written with `\n`, or balanced at the best word break). Columns pack from the left, so a long head reaches over the previous column's slack; when two lines can't pack, heads wrap in their own slots in as few balanced lines as fit (letter-spacing 0.01em), and the key column's head may overhang left (to x 64) rather than take a 4th line; they shrink below 40 px only after that. Keep heads short: the footer carries the assumptions ("Rate", "Monthly", "Interest", "Total paid").
- **Strip**: the formula (the one-line working, Inter 40 px) under the pick label when the board leaves room (`stack`), else they share one slot (`swap`: the formula first, each pick label as a hard cut held 2.5 s, then the formula again). A pick label fits one line down to 52 px, else two balanced lines (≥ 42 px), and then the formula gives its row up while the pick holds.
- **Verdict**: the chrome's, in the strip under the board. With a verdict, the strip keeps `min(150, L.verdictNeed) - 8` px from frame 1 (the rows take a smaller pitch, never under 40, so nothing moves later); only a board too long for that even at a 40 px pitch lets the verdict land on the band, which then hides whole rows (`data-band-unit`), never a sliver.
- **Rows**: the row pitch is what the stage leaves between the heads and the strip, 40-80 px (cells 40-64 px, Anton, tabular digits); a board of 6 rows or fewer may go to 96 px with 72 px cells, and room left past that cap goes half above the board, so a short table sits mid-frame instead of hanging under the header. Pitches under 54 px run as zebra stripes without slot outlines.
- **Pick labels** slam within the strip (`slamFit`: x and y).

| lookOpts | Default | Effect |
|---|---|---|
| `prompt` | none | a task line ("Find **your age**") in the pick slot until the first pick (stacked strip only) |
| `strip` | `'auto'` | `'stack'` / `'swap'` forces the strip mode |
| `dim` / `dimRest` | `0.5` / `0.85` | opacity of the other rows while a pick lands, and what they recover to 1.6 s later |
| `pointer` | `true` | the pointer on the left margin (in the emphasised column's colour) |

Samples: `find-your-row.json` (9 rows, 3 columns, captions off, prompt, two picks); `find-your-row-2.json` (14 rows, 4 columns, a two-line footer, captions off, a red emphasised column, a pick on the last row, a two-line verdict under the whole board).

## what-difference

"What difference does X make?" (P5) as a leaderboard: one row per option, all named from frame 1 with "?" in the score slots. Each option is a hard cut (the label stack slams line 1 `detail` / line 2 `name`, the row lights, a pointer jumps to it); its time bar then races at one shared speed (a shorter bar is a sooner payoff) with the bar metric riding the bar's end ("60 MONTHS"), while the hero rolls the money metric on the same clock. The delta slams into the label stack. At verdict.t the winner glows, the others dim, and **the hero rolls to the winner's money delta** ("INTEREST ≈ $1,288 LESS"), so the payoff is the last number up top; a winner without a money delta rolls to its own value the verdict quotes, else keeps its own value.

- **Board**: two-line rows (name + value columns on top, the time bar below) when a row gets ≥ 90 px, else one line. The bar metric has no column head on two-line rows (its value labels the bar); every other value metric gets its own right-aligned, measured column with its head over it. At most two value columns (the hero's metric first): a third value metric is left off the board. Names sit in one inner span (see Type: no `rich()` straight into a flex box).
- **Names, one size per board**, fitted to the space left of the value columns: one line at ≥ 44 px; else the value columns give up a few px (12 at most, never under 46); else every row goes into two-line mode (balanced, a short name stays on one line) at one size ≥ 40 px when the top line has the height; else (two-line rows) **values below**: the name gets the whole top line, the value columns move down into the bar line (right-aligned, heads unchanged) and the bar track ends 24 px short of them, so the bars keep one shared scale. Only cramped one-line rows go to the 40 px floor.
- **Counts**: every running value (the hero, the row cells, the bar labels) shows its "≈" as an unlit ghost until it lands.
- **Layout**: the kit grid (captions on: stage ≈ 595-1130, the label stack and then the verdict in the slot above the caption band; `lookOpts.stageBottom` moves the split). The verdict is the chrome's.
- **data** extras: `options[].resultT` pins when an option's race lands; `options[].deltaT` when its delta slams in.

| lookOpts | Default | Effect |
|---|---|---|
| `counter` | `"interest"`, else the first money metric | the metric key the hero rolls; `"stake"` keeps the stake in the hero (every row cell then rolls with its bar) |
| `bar` | the first all-duration metric, else the first numeric one | the metric key that drives the bars (durations compared in months) |
| `intro` | auto | `true`/`false` forces the stake intro |
| `race` | `2.4` | seconds the longest bar takes; every bar moves at that one speed |
| `footerSteps` | none | kit-wide (see above) |
| `stageBottom` | the kit grid | y where the stage ends |

Samples: `what-difference.json` (car loan, 3 options, captions on); `what-difference-2.json` (credit card, 4 options, captions off, long names, mixed duration units, `resultT`/`deltaT` on option 2). Stress (not in the repo): 4 options named like "Just the required payment every month" with two value columns, captions off, run in the values-below layout.

## chart-race

Same-stake line race (P4), ChartOrbit's mechanic as a live scoreboard: glowing lines and tips with live counters, an auto-rescaling y axis, a dashed stake line, and a big faint year clock in the plot's **top-left** corner (the same spot as pov-race; it dims while a line or a tip label passes through it, and it holds the last year: `x.to` 2025 or 2025.99 both end on "2025"). The hero is the leader's live value with the leader's name as a tag (at most two balanced lines at ≥ 42 px; the number shrinks so tag + number fit the row at the finish's 1.13 bump). A lead change is a hard cut, a bump and a `swipe`. Event flags slam into the strip above the plot (captions on), or into the label stack (captions off), held 2.5 s (or until the next flag) before the stack cuts back to the matchup (stake / NAME VS NAME). The finish lands every tip and the hero exactly on the `final` strings.

- **Tip labels** stay inside the plot (the x ticks under it always read) and at x ≥ 68. A label wider than 60% of the plot stacks its name over its value, the name fitted to min(plot - 60, 560) px at 42 px: one line, else two balanced lines, else (give `series.label` for a better short name) its leading words. The dashed stake line's label gives way while a line runs within 24 px of it.
- **Matchup** (captions off): names never wrap inside: "NAME VS NAME" on one line, or broken only at a VS; names too long for that stack as NAME / VS / NAME, each fitted to 780 px on its own line (≥ 40 px; a name still too wide takes two balanced lines of its own, and the stake line gives its row up).
- **Verdict**: with captions on the verdict lands on the band over the stage foot, so the plot box compresses over the 0.3 s before verdict.t (same y range, squeezed) and both lines, their tips and the x ticks stay above it.

| lookOpts | Default | Effect |
|---|---|---|
| `stakeLine` | the common start value | number: the dashed line's value; `false`: none |
| `flags` | chart with captions, else labels | `'chart'` / `'labels'` |
| `yearSize` / `yearPrefix` | `160` / `"YEAR "` | the corner clock (prefix for a non-calendar x) |
| `footerSteps` | none | kit-wide |
| `stageBottom` | 1300 with captions, 1240 without | the chart's tall stage (with captions the verdict rises on a band over its foot) |

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
| `bonus` | none | `{ t, label, amount, tone }`: a dashed extra row under the sheet (not part of the total) |
| `notes` | `"auto"` | `"sheet"` (= auto) / `"label"` (skip the sheet) / `false` (no notes): where part notes go |
| `maskPct` | none | `[part index]`: those percentages read "?" until their cut |
| `intro`, `footerSteps`, `stageBottom` | | kit-wide |

Samples: `split-sheet.json` (60/25/15 on $5,000, captions on, notes on the sheet, a tagged hero payoff); `split-sheet-2.json` (a $10,000 bonus, 5 rows, deductions, captions off, no intro).

## pov-race

"POV: you invested in X instead of paying $Y for X's product" (P6): a split scoreboard in the top bar (SPENT | IN STOCK, both live), the spend line (white) against the own line (green) with the gap filled green/coral, purchase icons dropping onto the spend line with price tags, and the year clock top-left (as chart-race). When the spend line starts tiny (under 5% of where it ends), the axis opens at 2× what frame 1 shows. Captions off: the label stack rests on the matchup (spend label in coral VS own label in green) and each purchase is a hard cut held 1.7 s. The verdict is the chrome's (its rule coral when owning lost).

| lookOpts | Default | Effect |
|---|---|---|
| `spendTag` / `ownTag` | `spend.label` / "in … stock" from `own.label` | the scoreboard tags (fitted to 440 px at 40-42 px; too long: without the glyph, then without a leading "in ", then without "spent on / paid to …" ("GAMING PCS"), then "SPENT" / "INVESTED") |
| `tags` | `true` | price tags on the chart |
| `gapFill` | `true` | the fill between the lines |
| `yearClock` | `true` | the corner year |
| `footerSteps`, `stageBottom` | | kit-wide (stage default 1300 with captions, 1236 without) |

With captions on the verdict lands on the band over the stage foot, so the plot box compresses over the 0.3 s before verdict.t and both lines (the spend line too), the icons and the x ticks stay above it. Start `raceT` at -0.4 s so frame 1 is already moving (a race that waits 2 s opens on a still plot).

Samples: `pov-race.json` (Netflix bills vs NFLX, captions on, opens mid-race); `pov-race-2.json` (lattes vs SBUX, captions off, opens mid-race).

## growth-ladder

The year-by-year ladder (P2): every row's slot is on the board from frame 1 (LED off); each row is a hard cut, then its Worth cell and the hero count up together on one curve **from what was put in by that row** (never below it; the "≈" stays an unlit ghost until the count lands) while a two-tone meter grows (grey = put in, green = growth, one shared scale). Frame 1 always has row 1's year and put-in on the board with its Worth already counting beside the hero (with `rowsT` ≥ 0.5 the count runs from frame 1 and lands 0.6 s after `rowsT`), so the running number is never tied to nothing. The last row is taller and lands big (riser, hit, cash). Just before the verdict, the rows scroll up under the column labels (the oldest fade out) so the big last row stays in view above the verdict band at the foot of the frame. Boards with more rows than fit scroll through their slots (one row per cut) with ladder pips on the left margin.

| lookOpts | Default | Effect |
|---|---|---|
| `goal` | none | `{ value, display, label }`: a finish line (every meter's scale becomes the goal, a strip names it, both light when a row lands past it; the worth column ends 18 px short of the line) |
| `icon` | none | a unit icon beside the hero counter |
| `input` | auto | `true`/`false` forces the input strip ("$100 A MONTH · 8% A YEAR"); by default it shows only when the header does not already contain `data.input.amount` and the board has room |
| `meters` | `true` | the two-tone meters |

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
| `pips` / `pipLabels` | `true` / none | the milestone ladder; a price beside each ladder icon |
| `ticks` | `true` | a soft tick each real second |
| `heroIcon` | none | a unit icon beside the hero |
| `tone` | green | hero colour (`'bad'` for a cost you lose) |
| `slot` | none | `{ label, empty, t, fill, tone }`: an answer readout in the stage's top-right corner |
| `stream` | `14` | dots a second in the money stream (`false`: off) |
| `icon` | `'coin'` | the stage icon when there are no milestones |

Samples: `cost-counter.json` (Amazon's sales, captions on); `cost-counter-2.json` (new US debt, captions off, six milestones).
