# Scoreboard kit

**Money as a live score.** A black top bar carries the rule and a neon odometer, the dark stage in the middle fills with everyday objects (or a neon line race), and the black bottom bar carries the label stack with the one-line working. HD Guy and ChartOrbit energy, without footage. The spectacle comes from strong objects: chunky counters that land with weight, piles that build and re-pack, and the climax lighting the stage up like an LED wall.

Sources: `research/v2/03-look-directions.md` (Direction 3, and §3.0 for the shared foundation), `research/v2/watch/hd-guy.md`, `research/v2/watch/chartorbit.md`, and the mockups `research/v2/look-mockups/d3-*.png`.

| File | What it is |
|---|---|
| `index.html` | Page: fonts, `runtime/base.css`, `style.css`, `kit.js` |
| `theme.js` | Design tokens: `C` palette, `TONE`, `F` font stacks, `SIZE`, `layoutFor()` grid, `M` motion timings |
| `lib.js` | Shared components: odometer, unit icons and pile, bars, header, footer, label stack, captions, verdict, score panel, race chart, ladder pips, timing helpers, `chrome()`, `stub()` |
| `style.css` | Classes used by `lib.js`, plus Anton re-declared with tight vertical metrics (see Type) |
| `kit.js` | `defineKit({ name: 'scoreboard', formats, chrome })`. It imports every `formats/<id>.js` one at a time, so a broken format only breaks itself |
| `formats/<id>.js` | One module per format: `unit-ladder` (flagship, done); `find-your-row`, `what-difference`, `chart-race`, `split-sheet`, `pov-race`, `growth-ladder`, `cost-counter` (stubs to replace) |
| `samples/*.json` | Sample specs (`"sample": true`) |

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

**Tone → colour** (`toneColor(tone)` / `TONE`): `good` → green, `goal` → green, `bad` → red, `neutral` → white.
**Markup** (`**x**`, `__x__`): `<em>` is neon green and `<u class="mark2">` is red. This holds in the header, labels, verdict, tip labels and captions (in captions the colour arrives as the word is spoken). In the grey footer, `<em>` is white.
**One green.** Green means money. Use it for the number that matters, never for decoration, except the brand mark and the one accent band on the icons.

## Type (`F`, `SIZE` in theme.js)

| Use | Family | Size (px) |
|---|---|---|
| Header (the hook) | Anton, uppercase | 72, fitted down to 46 to the header band |
| Hero counter (top bar) | Anton, odometer slots | 168 (unit-ladder shrinks it to fit the widest display) |
| Label stack line 1 (price, rate, working) | Anton, green | 62 |
| Label stack line 2 (the rung) | Anton, uppercase, white | 96, fitted down to 52, max 2 balanced lines |
| Footer (assumption line) | Inter 600, grey | 40 |
| Captions | Inter Tight 800 | 50 |
| Race tip labels | Anton, uppercase | 48 |
| Verdict | Anton, uppercase | 92, fitted down to 50 |
| Panel label / value | Inter 700 caps, 40 / Anton 120 | |
| Axis ticks (decoration only) | Inter 600, `C.dim` | 30 |

- Every stack ends with `'Inter Full'` (the symbol fallback). Anton has × ÷ − but **no ≈ or →**: wrap Anton text with `ax()` (or `rich()` for spec markup) so those glyphs render in Inter Full ExtraBold, lifted to Anton's optical centre.
- **Anton metrics.** `style.css` re-declares `'Anton'` from the same vendored woff2 files with `ascent-override: 92%; descent-override: 14%`. Anton's own metrics make every text box 1.5em tall, so stacked Anton lines trip the linter's overlap rule and line-height is hard to control. With the override, caps sit at 0.02-0.89em of a 1em line box. Use `line-height: 1` for Anton.
- **Digits.** Anton digits are proportional (tabular-nums does nothing), so counters use the odometer, which lays each digit in a 0.5em slot. Static Anton numbers (labels) are fine proportional.
- Hyphenated words never break (`keepHyphens`, inside `rich()`), and multi-line labels and captions use `text-wrap: balance`.

## Layout grid (`layoutFor(spec, opts)` in theme.js)

Always take positions from `const L = layoutFor(spec, opts)`, and return `layout: L` from your format so the chrome draws the same grid.

| Band | Captions on (default) | Captions off |
|---|---|---|
| Brand mark (decoration) | x 60, y 150-196 | same |
| Header band, text bottom-aligned | `L.header` y 244-434, x 60-1020 | same |
| Hero counter row | `L.hero` y 444-612, centred on x 540 | same |
| Footer (assumption line) | `L.footer` y 616-666 | same |
| Top bar | 0-680 | 0-680 |
| Stage (gridded) | `L.stage` y 680-1096 | 680-1236 |
| Inner box (piles, charts, panels) | `L.inner` x 140-940, y 700-1080 | x 140-940, y 700-1220 |
| Label stack (`data-yield`) | `L.label` y 1112-1308, x 140-940 | y 1252-1472 |
| Verdict slot | `L.verdict` y 1112-1308 | y 1276-1472 |
| Captions | `L.caption` y 1322-1478, x 140-940 | none |

- `layoutFor(spec, { hero: false })`: no hero row. The footer moves up to y 446 and the stage starts at 510 (tables, sheets).
- `layoutFor(spec, { stageBottom: y })`: moves the stage/label split. The label stack keeps what is left above the caption band (check `L.label.h`). If the stage reaches into the verdict slot, `L.verdict.boxed` is true and the verdict gets a black backing.
- **x rule.** Everything is centred on x 540. Below y 820, readable text must end by x 940, so centred text there is at most 800 wide (x 140-940). The stage background is full-bleed; piles and plot areas stay inside x 140-940 (plot x + w ≤ 900 so tip dots clear the rail).
- Captions are on when `spec.captions !== false` and `spec.vo` has lines. Captions off gives the HD Guy layout, where the label stack is the caption.

## Motion grammar (`M` in theme.js)

| Move | How | Where |
|---|---|---|
| **Hard cut** per beat (rung, row, option) | The old label vanishes and the new one **slams** in: scale 1.16 → 1 with an `ease.back` undershoot over 0.22 s, opacity 0.6 → 1 in 0.08 s. The scale is capped per label so its widest frame stays inside x 140-940 | `slam()`, `labelStack` |
| **Roll** | Odometer digits roll mechanically (carry only when the lower column wraps) on `ease.out`, 0.8-1.9 s by jump size, 2.4 s for the biggest number | `odometer`, unit-ladder |
| **Land** | The counter bumps 1 → 1.08 (1.13 for the climax) with a damped undershoot, its glow flares, and a green bloom rises off the stage floor | `bump()`, `wobble()`, `stageFlash` + `flashAt` |
| **Drop** | Icons fall with `ease.in` (gravity), squash 16% on landing and settle (`wobble`). Small icons drop a short way and fade in, so they don't read as static | `unitStack` |
| **Re-pack** | When a count grows, the existing pile shrinks into the new, denser cells (`ease.inOut`, 0.42 s): the camera "pulls back" without a camera move | `unitStack` |
| **Climax** | Cells under ~12 px become LED dots in green, so the biggest rung lights the stage edge to edge like a scoreboard wall | `unitStack` (`occ: 1`) |
| **Anticipation** | The hero dips 3% on each cut before it rolls | unit-ladder |
| **Verdict** | Label-stack content (`[data-yield]`) fades and drops 14 px, a green rule wipes in, and the verdict slams in | `chrome` / `verdict` |
| **Captions** | A line rises 22 px in 0.14 s. Words already spoken are white, words to come grey. Long lines page by spoken progress | `captions` |

Rules:
- Nothing slides linearly except counters and race clocks. Nothing idles or loops.
- No camera moves.
- One focal number at a time: the hero rolls while the labels sit still.
- Frame 1 never shows an entrance mid-way: `slam`/`rise` with `t0 ≤ 0` return the landed state.

## Sound grammar (ctx.cue)

Each cue marks a real event, and none repeats per frame.
- `thud` (gain ≈ 0.65): a hard cut lands (a new rung or row).
- `roll` with `dur`: a counter rolls. When only a few objects land (≤ 12), give each one a `pop` (gain ≈ 0.3) instead.
- `ding` (gain ≈ 0.5): a count lands.
- `riser` with `dur`, then `hit` + `cash`: the biggest number.
- `reveal` (gain 0.7): the verdict. The chrome adds it; set `verdictCue: null` to drop it or name another kind.
- In races, use `whoosh` for the start and `tick` for event flags.

There is no music bed. The look runs on diegetic UI sound, as HD Guy does.

---

## lib.js API

All `parent` arguments are DOM elements (usually `ctx.stage`). Every builder appends itself. `seek` functions only use the cached setters.

**Text**
- `esc(str)`: escape for innerHTML.
- `ax(html)`: wrap ≈ and → for Anton.
- `keepHyphens(html)`
- `rich(str)`: spec markup → HTML for Anton (markup + `ax` + `keepHyphens`).
- `richUI(str)`: spec markup → HTML for Inter.
- `bare(str)`: strip `**`/`__`.
- `toneColor(tone)`
- `inkWidth(el)`: rendered text width.
- `slamFromFor(w, maxW, from?)`: the largest safe slam scale.

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
- `odometer(parent, { size, color, maxInt = 10, maxDp = 2, cls }) → { el, set(v, tpl), show(display) }`
  - Digit columns carry `data-roll`. At an integer value every column shows exactly one digit, so a landed counter reads exactly as its display string.
  - Hold the previous exact display until a roll starts, and call `set(tpl.value * tpl.scale, tpl)` (or `show(display)`) once landed.
- `heroRow(parent, L, { icon, size, color, iconSize, gap = 12, maxInt, maxDp }) → { el, odo, glow, icon, set(v, tpl), show(display) }`: the top-bar hero (optional unit icon + odometer with a neon glow), centred as a group in `L.hero`.
  - Call `hero.set` / `hero.show` rather than `odo.set`, so the icon tracks the number's width.
  - Scale `el` for bumps. Set `--glow` (px) and `--glowA` on `glow` for flares.
  - The glow filter sits on a fixed 960 × 168 box, so its raster region never goes stale when digits are added. Don't put the glow filter on an element whose width changes.

**Icons**
- `ICONS`, `ICON_NAMES`, `iconName(name)` (unknown names fall back to `token`).
- `iconSVG(name, size, { cls })`: inline SVG, decoration.
- `iconSprite(name, size)`: a cached canvas mip for drawing.
- Names: `cup hotdog burger pizza phone car house coin bill gas ticket bag egg hour token`. Each has a light body, a grey second surface and one green accent; the egg has none.

**Unit pile**
- `unitStack(parent, { box, icon, maxCell = 150, minCell = 5, gap = 0.12, seed, dot = C.green })` returns:
  - `.plan(steps)`: steps are `[{ t, n, roll, delay = M.regrid, occ = 0.62, max }]`, and `n` may be fractional (the last icon shows its share solid over a ghost).
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
- `header(parent, spec, L, { text, upper })`
- `footer(parent, spec, L, { text })`
- `labelStack(parent, L, items, { yieldToVerdict = true }) → { el, groups, seek(t, index, t0) }`
  - items are `[{ l1: html, l2: html, l1Color?, l2Color? }]`; pass `rich()`-processed HTML.
  - One group per beat is built at mount and fitted. `seek` shows only `index`, slamming at `t0`.
  - Inside `l1`, wrap a dim operator part in `<span class="op">`, e.g. `$799<span class="op"> ÷ $5</span>`.
- `captions(parent, spec, L) → { seek }`
- `verdict(parent, spec, L) → { t, seek, yieldAt }`
- `stageFlash(parent, L) → { set(a) }`
- `ladderPips(parent, { x, bottom, n, gap, w }) → { seek(t, index, t0) }`: a vertical progress ladder on the stage's left margin, decoration.

**Score panel**
- `scorePanel(parent, { x, y, w, h, label, display, tone, size, sub, yieldToVerdict }) → { el, labelEl, valueEl, subEl, set(display), lit(p) }`
- A black box with a hairline border, a caps label and a big Anton value in the tone colour.
- `lit(0..1)` turns the border to the tone colour with a glow (the winner or the active option).
- Keep `x + w ≤ 940` below y 820.

**Race chart**
- `raceChart(parent, { box, series, x, y, raceT, events, tipLabels = true, yearLabel = false }) → { el, seek(t), xAt(t), tipAt(i, t) }`
  - `series`: `[{ name, points: [[x, v]...], final, color?, label?, width?, dashed? }]`. Colours default to green, yellow, white.
  - `x`: `{ from, to, tickEvery, tickLabel? }`
  - `y`: `{ prefix, dp, compact = true, log, min, max? }`. Setting `max` disables auto-rescale.
- Lines draw left to right, linear in x over `raceT`, with a neon glow and a glowing tip.
- The y axis auto-rescales: it is monotonic, smoothed, and never zooms past the first 12% of the race. Its labels hide where a tip label passes.
- Tip labels ("NAME $12,345", Anton 48) sit left of the tip (right of it near the start), never collide, stay inside the box, and show `final` exactly once the race ends.
- `events`: `[{ x, label, until?, tone }]` draw a dashed flag (plus a band at 20% opacity with `until`). The flag label sits **50 px above the box**, so leave that headroom.
- Use bands for real crashes only; a fixed-rate hypothetical has none.

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
- It appends the brand mark, the header (fitted to the header band), the footer (`spec.footer`, visible from t = 0), the captions and the verdict.
- At `verdict.t`, everything marked `data-yield` fades out. `labelStack` sets `data-yield` by default; `scorePanel` does with `yieldToVerdict: true`.

The format steers the chrome through fields on the object it returns:

| Field | Effect |
|---|---|
| `layout: L` | the grid the chrome draws; **always return it** |
| `scaffold: { grid: false }` | stage without the grid |
| `header: false` / `footer: false` / `verdict: false` | the format draws that piece itself |
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
- Readable text stays in y 240-1480 and x 60-1020, and x ≤ 940 below y 820. Primary text is 60-90 px, must-read text ≥ 40 px, nothing < 34 px.
- Mark decoration `data-deco`, deliberate overlaps `data-overlap-ok`, and clipped rolling digits `data-roll`.
- Every printed number is a spec display string. Running counters and race tips interpolate and land exactly on `final` / `display`.
- No `Math.random` (use `rng(seed)` from core), no timers, no CSS animation, no state carried between `seek` calls except value-keyed caches.
- One focal number at a time. Green is for money.
- Work loop, from `studio/`:
  - `node src/cli.mjs check <spec>` must reach 0 errors and 0 warnings.
  - `node src/cli.mjs sheet <spec> --out /tmp/kit-scoreboard`
  - `node src/cli.mjs stills <spec> --at 0,<beats>,end --out /tmp/kit-scoreboard`
- Edit only your `formats/<id>.js` and `samples/<id>*.json`. If a shared component needs a change, ask for it and don't fork it.

Suggested component use per format:
- **find-your-row**: `layoutFor(spec, { hero: false, stageBottom: 1300 })` gives a tall stage for the table. `slam` each row in, use `C.green` for the emphasised column, and give the pick pointer `bump` on landing.
- **what-difference**: put the stake in the hero and a `scorePanel` per option (`lit()` the winner at `verdict.t`). Each option is a hard cut.
- **chart-race / pov-race**: `raceChart` on `L.inner` with 50 px headroom, plus a hero odometer on the leader's value. For pov-race, a small `unitStack` of `phone` icons can count the purchases.
- **split-sheet**: put the total in the hero. Each part gets a row with a green bar track and amounts slammed in.
- **growth-ladder**: put the last column's value in the hero as it rolls. Rows unmask one by one (`ladderPips` for progress), and the last row is the biggest number.
- **cost-counter**: put the real-time counter in the hero (linear, it's a counter). Milestones slam into the label stack, and a `unitStack` can fill as each milestone passes.

---

## unit-ladder (flagship)

"Cost in units of X" (P8). One division (cost ÷ unit price) repeated on a cheap → huge ladder.

**data:**
- `unit: { name, price, icon }`
- `rungs: [{ t?, item, cost, units, unitsDisplay, tone? }]`: 4-7 rungs, cheap → huge. `units` drives the pile and may be fractional; `unitsDisplay` is what the hero lands on.
- `hold`

**On screen:**
- **Frame 1:** the header (the rule), the unit itself and the footer. The unit shows as hero "1", one big icon on the stage, and label "$5 / LATTE". A ladder of dark pips counts the rungs ahead.
- If the first rung's `t` is under 0.5 s, there is no unit intro: frame 1 is already 0.45 s into rung 1's roll, with icons landing and the counter moving.
- **Each rung** is a hard cut:
  1. `thud`: the label slams in. Line 1 is `cost` in green + `÷ price` in grey, which is the working. Line 2 is the `item` in big white caps.
  2. The pile re-packs denser.
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

Samples:
- `samples/unit-ladder.json`: lattes, 5 rungs, captions on, unit intro, verdict, 22 s.
- `samples/unit-ladder-short.json`: hours of work, 4 rungs, captions off (label stack in the caption band), no intro (frame 1 mid-roll), long two-line labels, 17 s.

## Kit-wide lookOpts

None so far. Formats document their own keys here when they add them.
