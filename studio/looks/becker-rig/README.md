# becker-rig: puppet + type + physics

One look kit for the *Back of the Envelope* shorts. A faceless stick figure works the maths with his hands: numbers are objects with mass, operators are tools, and every result lands with a sound, a squash and sometimes a shake. It borrows Alan Becker's grammar (see `research/v2/watch/alan-becker.md` §3, 4, 6 and 7.2) but none of his characters or colours. Everything is a pure function of `t`, built from closed-form motion. There is no physics engine, no timer and no `Math.random`.

```
looks/becker-rig/
  index.html        loads fonts, base.css, style.css, kit.js
  kit.js            defineKit({ name: 'becker-rig', formats, chrome }) — imports every formats/<id>.js
  theme.js          design tokens (C, F, T, L, S, RIG, M, TONE)
  lib.js            the shared rig, props, physics, camera, impact kit, numbers, chrome
  style.css         shared CSS for lib.js classes
  formats/<id>.js   one module per format (growth-ladder is the flagship; the others start as stubs)
  samples/<id>.json sample specs ("sample": true)
```

Formats in this kit: `growth-ladder` (built), plus stubs for `dead-simple-list`, `chart-race`, `split-sheet`, `pov-race`, `ledger-duel`, `unit-ladder` and `cost-counter`. **To build a format, edit only `formats/<id>.js` and `samples/<id>.json`.** Everything shared lives in lib.js, theme.js and style.css.

```bash
cd studio
node src/cli.mjs check  looks/becker-rig/samples/growth-ladder.json
node src/cli.mjs sheet  looks/becker-rig/samples/growth-ladder.json --out /tmp/kit-becker-rig
node src/cli.mjs stills looks/becker-rig/samples/growth-ladder.json --at 0,1.6,end --out /tmp/kit-becker-rig
node src/cli.mjs render looks/becker-rig/samples/growth-ladder.json --out /tmp/kit-becker-rig --preset ultrafast
```

---

## 1. Design system

### Palette (`theme.js` → `C`)

**One saturated hero colour on a neutral void.** Maths, props and tools are ink. Coin yellow is only for money objects. Red is only for losses.

| Token | Hex | Use |
|---|---|---|
| `C.void` | `#F7F8FA` | stage background (the stage also has a radial floor gradient from the bottom) |
| `C.floor` | `#DFE3E9` | floor gradient |
| `C.ink` | `#111418` | maths, props, primary text, the floor line |
| `C.hero` | `#12B76A` | the figure, growth fills, meters, the brand disc. **Shapes only**: on the void it is 2.5:1, which fails the linter as text |
| `C.heroInk` | `#0A9254` | hero colour **for text** (3.8:1): `**emphasis**`, the newest/good number |
| `C.heroSoft` | `#D5F2E3` | pale hero tint |
| `C.coin` / `C.coinDeep` | `#FFD34D` / `#E2AE1C` | coins, the final "gold plate" number; ink text on it |
| `C.red` / `C.redSoft` | `#E5484D` / `#FBE1E2` | losses, costs (`__second emphasis__`); OK as text (3.7:1) |
| `C.grey` | `#5B6470` | secondary text: working lines, column heads, footers |
| `C.dim` | `#6B7480` | not-yet-reached labels (4.5:1). Never go lighter for text |
| `C.caption` | `#3A414B` | captions |
| `C.line` / `C.lineSoft` | `#C9CED6` / `#E3E7EC` | guides, empty slots, "not yet" structure. **Decoration only, never text** |

Tones (`TONE`, `toneOf(t)` → `{ text, fill, soft }`): `good` = heroInk / hero, `bad` = red, `goal` = ink on coin, `neutral` = ink / line.

Markup colours (style.css): `<em>` (`**x**`) is `heroInk`, and `u.mark2` (`__x__`) is `red` with no underline.

### Type (`F`, `T`)

Fonts are only the vendored families, always with `'Inter Full'` in the stack so `≈ × ÷ − →` render: `F.head` = Inter Tight, `F.mono` = JetBrains Mono, `F.body` = Inter. Every number uses tabular figures (the stage sets `font-variant-numeric: tabular-nums`).

| Role | Font | Size |
|---|---|---|
| Header (hook) | Inter Tight 900, letter-spacing −0.025em, line-height 1.02 | 84 px, fitted down to 56 (`T.header`, `T.headerMin`) |
| Hero number (one focal number) | Inter Tight 900, −0.03em | 96 (`T.hero`) |
| Primary values (table cells, results) | Inter Tight 900 | 60-76 (`T.primary` 64, `T.big` 72) |
| Labels | Inter Tight 800 | 44 (`T.label`) |
| Column heads | Inter Tight 800 uppercase, +0.07em | 40 (`T.small`) |
| Working lines, formulas, footer | JetBrains Mono 700-800 | 40-44 |
| Captions | Inter Tight 800, `C.caption` | 54 (`T.caption`) |
| Verdict | Inter Tight 900, ink, em = heroInk + green swoosh | 64 (`T.verdict`) |

Floors: primary text is 60-90 px. Anything the viewer must read is at least 40. Nothing readable goes below 34 (`T.floor`).

### Layout grid (`L`, 1080 × 1920)

| y | Zone |
|---|---|
| 0-230 | Brand mark at y 120 (decoration: green disc with ≈ + BACK OF THE ENVELOPE) |
| 248-440 | Header (hook), x 60-1020, fitted to the band |
| 452 → | Footer / assumption line (mono 40, ≤ 2 lines, x 62-940), visible from t = 0 |
| `chromeParts().workTop` → 1290 | Working area (`L.workTop` 520 is the typical value) |
| **1300** | **The floor line** (`L.floorY`). The figure stands on it |
| 1320-1480 | Caption band. The verdict replaces the captions here from `verdict.t` |
| > 1480 | Platform UI: nothing readable |

Readable x is 60-1020, and x ≤ 940 below y 820 (the right button rail). Decoration may go anywhere. Right-aligned value columns end at x ≈ 922.

### Strokes (`S`) and the figure (`RIG`)

There is one uniform stroke family with round caps everywhere. The figure's limbs are 13 px at scale 1, props/rails 10, rungs 8, and the floor and guides 4.

Figure proportions at scale 1: head r 31, torso 88 (arms attach at 80% of it), upper arm 50 / forearm 47, thigh 57 / shin 54. That makes him about 262 px tall, with a head-to-body ratio of about 1 : 4. Growth-ladder uses scale 1.1.

**Identifying detail:** a yellow pencil tucked behind the head ("back of the envelope" maths). He has no face. Emotion comes from pose and timing.

**Knockout outline:** every limb is drawn twice, first 12 px wider in the void colour. The figure stays readable in front of ink props (ladders, gates, rails). Pass `outline: null` to turn it off.

### Motion grammar (`M`)

- **Hold, then snap.** Holds are long. Transitions are 0.07-0.3 s (`M.snap` 0.12, `M.move` 0.28).
- **Anticipation → action → overshoot → settle.** Pose keys default to the `spring` ease (about 12% overshoot). Add a counter-pose 0.15-0.25 s before every action (wind-up before a throw, crouch before a jump).
- **Numbers have mass.** They fall the last few px under gravity (`fall`), squash on contact (`squashAt`), and pop in from 0.82 scale with an opacity ramp (`popIn`) so nothing readable is ever tiny.
- **Impact = sound + shake + burst (+ flash).** Use `fx.impact()` for the big beats: one per short or one per section, never per row.
- **One focal number at a time.** The newest value is `heroInk` green and everything already read settles to ink (growth-ladder fades the previous row to ink over 0.3 s when the next one lands).
- **Escalate.** Effort grows with the numbers (deeper wind-ups, bigger coins, a heave for the last one).
- **Camera.** Use small punches (≤ 3%) and follow-pans. Never zoom text past the safe zones.
- **SFX are sparse:** one cue per real event. Growth-ladder uses `swipe` per throw, `thud` per landing, `riser` → `whoosh` → `hit` + `cash` for the finale, and `ding` (from the chrome) on the verdict.

---

## 2. Writing a format

```js
// formats/<id>.js
import { h, s, style, attr, setText, prog, clamp, lerp, C, F, T, L, E,
         makeWorld, makeFx, camera, Figure, poseTrack, NumObj, chromeParts, durationOf } from '../lib.js'

export const css = `.xx-thing { font: 900 64px/1 ${F.head}; }`   // optional; kit.js injects it once

export default function myFormat(spec, ctx) {
  const d = spec.data, lo = spec.lookOpts || {}
  const parts = chromeParts(spec, ctx)          // header + footer built and measured; parts.workTop = first free y
  const world = makeWorld(ctx)                  // camera-able layers + the floor line at y 1300
  const fx = makeFx(world, ctx), cam = camera(world)
  const fig = new Figure(world.g.fig, { scale: 1.1 })
  const tr = poseTrack([{ t: 0, pose: 'think' }, { t: 1.2, pose: 'crouch', d: 0.18 }, { t: 1.4, pose: 'push', d: 0.12 }])
  const n = new NumObj(world.html, { cls: 'xx-thing', text: d.result, ax: 0.5, ay: 1 })
  fx.impact(2.0, { x: 600, y: 1100, shake: 10 })          // schedules the cue now, animates in seek
  ctx.cue(1.4, 'step')
  return {
    duration: durationOf(spec, 2.0, d.hold ?? 3),
    seek(t) {                                              // pure in t; only caching setters
      fig.pose(t, tr, { x: 300 })
      n.set({ x: 600, y: 1100, opacity: prog(t, 1.9, 0.1) })
      const { shake, zoom } = fx.seek(t)
      cam.set({ shake, zoom })
    },
  }
}
```

**Rules that bite** (all enforced or caught by the linter, and all met by lib.js helpers):

- **Pure `seek(t)`.** Build the DOM once in the factory and only mutate in `seek`, with `style()` (core's `css()`; renamed because the module exports `css`), `setText`, `setHTML`, `attr` and `NumObj.set`. No timers, no `Math.random` (use `rng(seed)`), and no state carried between calls.
- **Display strings only.** Never format a value you show. A running counter may interpolate (`rollTo(p, fromNumber, display)`), but it returns the display string exactly at `p >= 1`. Use `num(display)` only to drive geometry (bar lengths, coin sizes).
- **Frame 1** must show the header and a number. The chrome draws the header and footer at t = 0 for you. Keep the structure visible before it fills (empty slots, dim labels).
- **Text that flies over other text** gets `numObj.overlap(true)` while it is in flight (the `data-overlap-ok` attribute).
- **SVG opacity.** The linter reads the opacity of the painted shape itself, not of its `<g>`. Fade shapes that sit behind text on the shapes themselves (`coin()` does this).
- **Squash and type floor.** The linter measures text size after transforms. Keep `sy × font-size ≥ 41` (for example `squashAt(t, tHit, Math.min(0.2, 1 - 41 / px))`), and start pops at ≥ 0.82 scale with an opacity ramp (`popIn`).
- **Integer line-heights** for text whose size matters: the linter derives px from the rendered height divided by `offsetHeight`, so 41.6 px boxes read as 39.6 px.
- **Row pitch.** A text run is about 1.21 em tall in Inter Tight and about 1.32 em in JetBrains Mono. Rows packed tighter than that fail the overlap rule.
- **Measuring.** `measure(text, font, { letterSpacing, upper })` uses the stage's tabular figures. Pass `upper: true` when CSS uppercases the text. Fonts are preloaded before any format mounts, so measuring in the factory is safe.
- **Mono overhang.** Mono glyphs overhang a 1.2 line box, so `fitText(..., { maxH })` needs about 8 px of slack.

The chrome (brand, header, footer, captions, verdict) is added by `kit.js` for every format. A format can steer it by returning `chrome` options with its body:

```js
return { duration, seek, chrome: { captions: true, verdict: true, verdictCue: 'ding' /* or null */, captionTop: 1320, verdictTop: 1320 } }
```

To move the footer (for example to the bottom of the working area), call `chromeParts(spec, ctx, { footerTop: 1200 })` **before** anything else. `workTop` then starts under the header.

---

## 3. lib.js API

Every core helper is re-exported, so a format imports only from `'../lib.js'`: `h`, `s`, `style` (= core `css`), `setText`, `setHTML`, `attr`, `markup`, `plain`, `fitText`, `captionAt`, `prog`, `clamp`, `lerp`, `rng`, `tween`, `typed`, `window01`, `money`, `fmtNum`, `beat`, `SAFE`. Theme tokens are re-exported too: `C`, `F`, `T`, `L`, `S`, `RIG`, `M`, `TONE`.

### 3.1 Motion maths (pure)

| Signature | Returns / does |
|---|---|
| `E` | eases: core's `linear in out inOut outExpo inOutSine back spring`, plus `inOutQuad outQuad inQuad snap backSoft late` |
| `track(keys, { d = 0.28, e = 'inOut' })` | keyframe track: `keys = [{ t, v, d, e }]`. A key starts moving to `v` at `t` and arrives at `t + d`. Values can be numbers, arrays, objects or pose names. Overlapping moves chain seamlessly. `.at(t)` |
| `arc(p, [x0,y0], [x1,y1], height)` | parabola point at progress p, bulging `height` px above the chord |
| `hop(t, t0, dur, height)` | height above rest for a jump (parabola) |
| `wobble(t, t0, amp, freq = 3, decay = 4)` | damped sine (strain, ringing) |
| `springStep(t, t0, from, to, { freq, damp })` | damped spring step response |
| `squashAt(t, tHit, amt = 0.22)` | `{ sx, sy }` squash-and-stretch after an impact |
| `fall(t, t0, height, { g = 5200, e = 0.34, n = 3 })` | drop with damped bounces: `{ y (px above rest), hits: [times], landed, lastHit }` |
| `toss(t, t0, [x,y], [vx,vy], { g, floor, r, e, friction, n })` | projectile that bounces on the floor: `[x, y, spin]` |
| `tossHit(t0, p0, v0, opts)` | time of the first floor contact (for a cue) |
| `popIn(t, t0, dur = 0.22, from = 0.82)` | `{ scale, opacity }`, an overshoot pop that is never tiny and readable |
| `swapAt(t, t0, dur = 0.26)` | `{ phase, sx, sy, opacity }`: the old value squashes out and the new one pops in (show `from` while `phase` is 0, `to` when it is 1) |
| `stackSlots(n, { x0, y0, cols, w, h, stagger })` | bottom-up grid of `[x, y]` centres for unit stacks and coin piles |

### 3.2 The rig

Angles are in degrees. Absolute directions are measured from straight **down**, with **+ = the way he faces** (90 = straight ahead, 180 = up).

Pose fields:
- `lean`: torso lean, + = forward.
- `tilt`: head nod, + = chin down.
- `aF` / `aB`: front and back arm as `[shoulder angle relative to the torso's down direction, elbow bend]`.
- `lF` / `lB`: front and back leg as `[hip angle (absolute), knee bend (− = a normal knee)]`.
- `lift`: px off the ground.
- `rot`: whole-body rotation about the hip.
- `tl`: torso length factor.
- `sx` / `sy`: squash about the feet.

| Signature | Returns / does |
|---|---|
| `POSES` | `stand idle lookUp think thinkUp point pointUp push pull lift carry hold windup release follow crouch catch chopUp chopDown shrug shocked celebrate slump flat run1 run2 run3 run4`, plus the aliases `idleBreathe throw shockedJump flattened` |
| `poseOf(nameOrObj)` | a full pose object (missing fields are zero) |
| `poseTrack(keys)` | `track` of poses with keys `[{ t, pose, d, e }]`; the default ease is `spring` (overshoot) |
| `runPose(phase, amt = 1)` | 4-pose run cycle at `phase` (cycles); `amt` ≈ 0.45 gives a walk. Drive `phase` from distance: `x / stride` |
| `blendPose(a, b, p)` | blend two poses |
| `secondary(pose, t, { breathe = 1, prev })` | breathing, plus head/arm follow-through from `prev` (the pose at t − 0.07) |
| `fk(pose, { x, ground = 1300, y, face = 1, scale = 1, plant = 'feet' \| 'all' \| false })` | joints `J = { hip, nk, sh, head, eF, hF, eB, hB, kF, fF, kB, fB, R, k, sw, face, headRot, sx, sy, ground }` in stage px. `plant` puts the lowest foot (or lowest point) on the ground |
| `ik2(root, target, l1, l2, bend)` | 2-bone IK: `{ mid, end }`. Unreachable targets clamp to full reach |
| `pinLimb(J, 'hF' \| 'hB' \| 'fF' \| 'fB', [x, y], bend = 1)` | pins a hand or foot to a world point with IK (mutates J). Flip `bend` if an elbow or knee folds the wrong way |
| `blendJ(Ja, Jb, p)` | position-wise blend of two joint sets (FK pose → IK solve transitions) |
| `new Figure(parent, { scale, color = C.hero, detail = 'pencil', outline = C.void, opacity })` | the figure in an SVG `<g>` (`data-deco`) |
| `fig.pose(t, track, { x, ground, face, scale, plant, breathe, sx, sy, opacity })` | FK + secondary motion + draw. Returns J |
| `fig.draw(J, { sx, sy, opacity })` | draws joints you solved yourself (IK, blends). `sx`/`sy` squash about the ground under the hip |

Typical uses:
- A hand on an object: `const J = fig.pose(t, tr, { x, noDraw: true }); pinLimb(J, 'hF', anchor); fig.draw(J)`.
- Carrying something: put it at `J.hF`.
- A second, rival figure (ledger-duel): `new Figure(g, { color: C.ink })` or `C.grey`. Keep green for "you".

### 3.3 World, camera, impacts

| Signature | Returns / does |
|---|---|
| `makeWorld(ctx, { floor = true, floorY = 1300, clip = null })` | `{ root, svg, g: { back, mid, fig, front, fx, top }, html, flash, viewport }`. Z-order: `back < mid < fig < front < fx` (SVG) `< html` (text) `< top` (SVG over the text). World coordinates are stage coordinates. `clip: [top, bottom]` shows the world only inside that band (a scrolling viewport, `overflow: hidden`, which the linter understands) |
| `floorLine(y)` | the floor line (already added by `makeWorld`) |
| `camera(world, { fx, fy })` → `cam.set({ fx, fy, x, y, zoom, shake })` | puts world point (x, y) at screen (fx, fy). With no arguments it is the identity |
| `makeFx(world, ctx)` → `fx.impact(t, { x, y, shake = 12, flash = 0, burst = true, r = 70, rx, ry, lines = 10, punch = 0, cue = 'hit', gain, color })` | registers an impact at mount: the cue, a per-frame shake, a white flash, radial hit lines outside an ellipse `rx × ry`, and a camera punch |
| `fx.seek(t)` | animates the bursts and flash and returns `{ shake: [dx, dy], zoom }`, which you pass to `cam.set` |

### 3.4 Props (SVG, ink, round caps; each returns `{ g, set(...) }`)

| Signature | Notes |
|---|---|
| `coin(parent, { r, text, sub, fill })` → `.set({ x, y, r, rot, sx, sy, text, sub, opacity, spin })` | yellow disc, ink rim and inner ring, mono value text fitted to the disc. `spin` 0..1 turns it edge-on. Its text scales with `r`: keep `r ≥ 60` when the value must be read |
| `block(parent, { w, h, text, fill, color, size, font, weight, rx })` → `.set({ x, y (bottom centre), sx, sy, rot, text, opacity, fill })` | a number crate |
| `gate(parent, { x, floorY, w, h, label: '×1.07', post, plateH, size })` → `.set({ x, glow, label, opacity })` | an operator gate (green mono label on an ink plate); `.inner` = post inner x |
| `ladder(parent, { x0, x1, yBottom, yTop, rungs: [y], rail, rung, color })` | returns `{ g, rails, rungs }` |
| `ramp(parent, { x0, y0, x1, y1, floorY, fill })` | returns `{ g, slope, yAt(x), angle }` |
| `balance(parent, { x, floorY, postH, beam, hang, panW })` → `.set({ tilt })` | returns the pan anchors `{ left, right }` |
| `bar(parent, { fill, stroke, sw, rx })` → `.set({ x, y (bottom), w, h, fill, opacity })` | vertical bar that grows up |
| `hbar(parent, { color, width })` → `.set({ x0, x1, y, opacity })` | horizontal rounded segment (meters, shelves) |
| `icon(parent, name, { x, y, size })` | line icons (`ICONS`): `coin bill cup hotdog burger pizza phone car house gas ticket bag egg hour token`. Unknown names fall back to `token` |

### 3.5 Numbers

| Signature | Notes |
|---|---|
| `num(display)` | `"$1,245"` → 1245, `"≈ $1.2M"` → 1200000, `"−$480"` → −480. Use it for geometry only |
| `numLike(display)`, `fmtLike(n, like)` | print an interpolated number in a display string's style (prefix, suffix, decimals, commas) |
| `rollTo(p, fromNumber, display)` | running-counter text that is exactly `display` at `p >= 1` |
| `new NumObj(parent, { cls, text, ax = 0.5, ay = 1, style, html })` | an HTML number with mass. `.set({ x, y, sx, sy, rot, opacity, text, color, z })` places anchor (ax, ay) at (x, y); squash and rotation happen about the anchor. `.overlap(on)` toggles `data-overlap-ok`. `.w` / `.hgt` read its size |
| `measure(text, font, { letterSpacing, upper, html })` | rendered width with the stage's tabular figures |

### 3.6 Chrome and plumbing

| Signature | Notes |
|---|---|
| `chromeParts(spec, ctx, { footerTop })` | builds and fits the header and footer once per spec and returns `{ header, footer, headerBottom, footerBottom, workTop }` |
| `chrome(spec, ctx, body)` | used by kit.js. Draws the brand mark, header, footer, captions (each line's words pop in within ~0.3 s and the line fades out at its end; `**x**` → green, `__x__` → red) and the verdict (pops in at `verdict.t` in the caption band, hides the captions, draws a green swoosh under the first `**…**`, cues `ding`) |
| `durationOf(spec, lastBeat, hold = 3)` | `spec.duration` or the latest of: last beat + hold, last VO end + 0.4, `verdict.t` + 2.5 |
| `toneOf(tone)` | `{ text, fill, soft }` |
| `brandMark()`, `preloadFonts()`, `stubFormat(name)` | used by kit.js and the stubs |

---

## 4. growth-ladder (flagship)

The table **is** a ladder. Rails sit on the left with one rung per row, and each rung runs out to the right as a dotted shelf the row's numbers stand on. The whole ladder is on screen from frame 1: year labels dim, shelves dotted, ladder light grey. As each row lands, its rung turns ink, the Worth drops onto the shelf and squashes (`thud`), "You put in" slides in, and a **composition meter** draws under the Worth (grey = what you put in, green = growth). The green share widens rung by rung, which is the "growth overtakes deposits" story without a single extra label. The newest Worth is green and the earlier ones settle to ink. The last Worth lands on a **gold plate** with the impact kit (hit, shake, burst, 3% camera punch, `cash`), and coins spill off it into the margins.

Modes, chosen automatically:

- **throw** (the ladder fits on one screen, about ≤ 10 rows): the figure stands at the foot of the ladder. Frame 1 has him hand on chin, looking up the empty ladder, with a nod in the first second. For each row he takes a coin from nowhere, winds up and throws it in an arc to the row's slot, where it turns into the number. Coins grow with the value and the wind-ups deepen. For the last row he lifts a big coin overhead, wobbles under it (`riser`), dips and heaves it (`whoosh`), then celebrates with a hop and squash and points at the plate. When rows come too fast for a throw (< ~0.5 s apart), numbers just drop in.
- **climb** (long ladders; 15 yearly rows needs it): the type is sized for legibility and the camera follows. The figure climbs hand over hand, with hands and feet pinned to the rungs by 2-bone IK, and slaps each rung as its row lands (a small burst at the hand). The camera keeps the newest rung about 40% down a viewport under fixed column heads, and rows fade out at the viewport edges. On the top rung he lets go with one hand and pumps his fist.

Data: FORMATS.md §9 exactly. `rowT[i]` overrides `rowsT + i·rowEvery`, `highlightLast` (default true) gives the plate and the impact, and `hold` defaults to 3. Column heads are right-aligned, single-line at 40 px when possible, and otherwise wrap to two lines. If the hook does not already contain `input.amount`, a mono input line ("**$200** a month · 7% a year") is shown above the table.

lookOpts (all optional; it renders fully without them):

| Key | Default | Effect |
|---|---|---|
| `mode` | auto | `'throw'` or `'climb'` |
| `figure` | `true` | `false`: no figure (numbers drop onto their rungs) |
| `figureScale` | `1.1` | size of the figure |
| `bars` | `true` | `false`: no composition meters |
| `heave` | `true` | throw mode: `false` throws the last row like the others |
| `establish` | `false` | climb mode: open on a wide shot of the whole ladder towering over him, then push in. Rung labels stay hidden until they are legible, so frame 1 then relies on the header for its number |

Samples:
- `samples/growth-ladder.json`: $100 a month at 8%, 9 rows (years 1-40), throw mode, 26 s.
- `samples/growth-ladder-15y.json`: $200 a month at 7%, 15 yearly rows, long column labels, a 2-line footer, climb mode, 20 s.

All values are monthly compounding with end-of-month deposits, checked in Python.

---

## 5. Suggested treatments for the other formats (non-binding, keep the grammar)

- **dead-simple-list**: numbered ledges or crates down the screen, empty at frame 1. The figure points at each slot. The formula types in mono, then the result drops onto the ledge as a block or `NumObj` with `thud`. `goal` results get the gold plate.
- **chart-race**: ink axes, the leader's line in hero green and the rival in ink or grey. The figure runs on the leading tip (`runPose(x / stride)` plus `pinLimb` feet on the line). Tip counters use `rollTo`. Use `fx.impact` on the event flags (crash = red).
- **split-sheet**: the total is a big block. The figure chops it (`chopUp` → `chopDown`, `hit`) and the parts slide into their labelled slots while the pointer walks the sheet.
- **pov-race**: the spend line in red, with purchase ticks as small `icon()`s dropping onto it; the own line in green. The figure is shocked (`shocked`) when the lines cross.
- **ledger-duel**: two figures (green = the winner-to-be, ink = the other), each at the foot of its own column. Crash rows shake (`fx.impact`, `shake: 8`, no burst).
- **unit-ladder**: unit icons stack with `stackSlots()` and `fall()` per icon (cap the visible count and show `unitsDisplay` as the counter). The figure carries or lifts the stack and the camera pulls back for the big rungs.
- **cost-counter**: the counter on a large coin or plate (`rollTo`, landing on `final`). Milestones pop as `swapAt` labels. The figure's pose escalates from `idle` to `shocked` to `slump` as the money piles up.
