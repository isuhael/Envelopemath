# becker-rig: puppet + type + physics

One look kit for the *Back of the Envelope* shorts. A faceless stick figure works the maths with his hands: numbers are objects with mass, operators are tools, and every result lands with a sound, a squash and sometimes a shake. It borrows Alan Becker's grammar (see `research/v2/watch/alan-becker.md` §3, 4, 6 and 7.2) but none of his characters or colours. Everything is a pure function of `t`, built from closed-form motion. There is no physics engine, no timer and no `Math.random`.

```
looks/becker-rig/
  index.html        loads fonts, base.css, style.css, kit.js
  kit.js            defineKit({ name: 'becker-rig', formats, chrome }) — imports every formats/<id>.js
  theme.js          design tokens (C, F, T, L, S, RIG, M, TONE)
  lib.js            the shared rig, props, physics, camera, impact kit, numbers, chrome
  style.css         shared CSS for lib.js classes
  formats/<id>.js   one module per format (growth-ladder is the flagship); each file's header comment is its spec
  samples/<id>.json sample specs ("sample": true)
```

All ten formats are built: `growth-ladder` (§4), `dead-simple-list` (§5), `find-your-row` (§6), `what-difference` (§7), `chart-race` (§8), `split-sheet` (§9), `pov-race` (§10), `ledger-duel` (§11), `unit-ladder` (§12) and `cost-counter` (§13). After the flagship, the sections follow FORMATS.md order. Each format has two samples (`samples/<id>.json` and `samples/<id>-2.json`, or `-15y` for growth-ladder); dead-simple-list has a third (the 6-item stress case) and what-difference a third (a third metric), 22 in all. The first 17 linted with 0 errors and 0 warnings when they were built. Real shorts in this look are `specs/*-becker-rig-*.json`; each format section cites one that uses its newer lookOpts. **To change a format, edit only `formats/<id>.js` and its samples.** Everything shared lives in lib.js, theme.js and style.css. A format file's header comment is its full spec; this README is the summary.

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
| 452 → | Footer / assumption line (mono 40, ≤ 2 lines of about 37 characters, x 62-940), visible from t = 0. See the footer budget in §3.6 |
| `chromeParts().workTop` → 1290 | Working area (`L.workTop` 520 is the typical value) |
| **1300** | **The floor line** (`L.floorY`). The figure stands on it |
| 1320-1480 | Caption band. The verdict replaces the captions here from `verdict.t` |
| > 1480 | Platform UI: nothing readable |

Readable x is 60-1020, and x ≤ 940 below y 820 (the right button rail). Decoration may go anywhere. Right-aligned value columns end at x ≈ 922.

### Strokes (`S`) and the figure (`RIG`)

There is one uniform stroke family with round caps everywhere. The figure's limbs are 13 px (`S.figure`) **at every scale**: a small figure is drawn with the same pen, not a thinner one (`figStroke()`). Props and rails are 10, rungs 8, and the floor and guides 4. A format that zooms the world out can pass a per-frame `stroke` to `fig.draw` to keep the line weight constant on screen (unit-ladder does).

Figure proportions at scale 1: head r 31, torso 88 (arms attach at 80% of it), upper arm 50 / forearm 47, thigh 57 / shin 54. That makes him about 262 px tall, with a head-to-body ratio of about 1 : 4. Default scales per format: growth-ladder 1.3 (throw) / 1.1 (climb); unit-ladder and cost-counter 1.1; pov-race 1; split-sheet 0.92 (bins) / 0.86 (rows; carve fits 0.86 → 0.62); dead-simple-list 0.84; ledger-duel 0.8; chart-race 0.76 (2 series) / 0.56 (3); find-your-row 0.72 (fitted down to 0.5, then 0.42); what-difference whatever the lane allows (0.36-0.8, 0.3 at the least).

**Identifying detail:** a yellow pencil tucked behind the head ("back of the envelope" maths). It is drawn **under** the head: the sharpened end is hidden inside the disc, and only the back ~45% of the yellow body, the grey ferrule and the pink eraser stick out up-and-back, 30° above the backward horizontal (about 1.3 head radii past the head's edge). He has no face. Emotion comes from pose and timing.

**Halo and seams:** the whole figure (limbs and head) is first drawn `outlineWidth` px wider (default 12) in the void colour, as one silhouette under everything, so he stays readable in front of ink props (ladders, gates, rails). The halo stops 2 px above the ground he stands on, so it never chops the floor line (or a ledge) at his feet. Over his own body, the front leg and the front arm get only a thin seam (`seam`, default 4 px), starting 40% out from the hip and the shoulder, so overlaps read as depth, not cuts, and the joints stay one clean shape. Draw order: halo < pencil < back limbs < torso < head < front-leg seam < front leg < front-arm seam < front arm. Pass `outline: null` to turn the halo off, or a small `outlineWidth` (about 5) where figures overlap each other or stand on a line he must not chop (the growth-ladder climber, chart-race).

**In frame:** `fig.extentX(J)` gives the drawn figure's horizontal extent (limbs, head and the pencil's eraser end). Formats that stand him near the left edge shift him in with `shiftJ(J, Math.max(0, M - fig.extentX(J)[0]))`, with a margin M of 24 px or more (growth-ladder throw mode and ledger-duel use 40; find-your-row places his gutter so every pose stays ≥ 26 px in).

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
- **No `will-change: transform` on text.** Chrome keeps a composited layer's raster scale from earlier frames, so a frame under a camera punch rendered after other frames would rasterize its text differently from the same frame rendered directly (`.br-num` has none).

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
| `smooth(a, b, x)` | smoothstep of `x` between `a` and `b` (0..1) |
| `bump(t, t0, d)` | a half-sine 0 → 1 → 0 over `[t0, t0 + d]` (nods, flinches, kicks) |
| `lerp2(a, b, p)` | point lerp |
| `mix(hexA, hexB, p)` | colour lerp, returns `rgb(...)` (settling a green number to ink) |
| `mixOk(hexA, hexB, p)` | colour blend in OKLCH (lightness and chroma move together, the hue comes from the saturated end): an ink → red ramp passes a deep red, never maroon mud (the cost-counter heat snap) |

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
| `POSES` | `stand idle lookUp think thinkUp point pointUp push pull lift carry hold windup release follow crouch catch chopUp chopDown shrug shocked celebrate slump flat fall win sit run1 run2 run3 run4`, plus the aliases `idleBreathe throw shockedJump flattened`. `fall` = arms up riding a drop, `win` = both arms up in a wide V, `sit` = seated on a ledge, hands on his knees |
| `poseOf(nameOrObj)` | a full pose object (missing fields are zero) |
| `poseTrack(keys)` | `track` of poses with keys `[{ t, pose, d, e }]`; the default ease is `spring` (overshoot) |
| `runPose(phase, amt = 1)` | 4-pose run cycle at `phase` (cycles); `amt` ≈ 0.45 gives a walk. Drive `phase` from distance: `x / stride` |
| `blendPose(a, b, p)` | blend two poses |
| `secondary(pose, t, { breathe = 1, prev })` | breathing, plus head/arm follow-through from `prev` (the pose at t − 0.07) |
| `fk(pose, { x, ground = 1300, y, face = 1, scale = 1, plant = 'feet' \| 'all' \| false, stroke = figStroke() })` | joints `J = { hip, nk, sh, head, eF, hF, eB, hB, kF, fF, kB, fB, R, k, sw, face, headRot, sx, sy, ground }` in stage px. `plant` puts the lowest foot (or lowest point) on the ground |
| `ik2(root, target, l1, l2, bend)` | 2-bone IK: `{ mid, end }`. Unreachable targets clamp to full reach |
| `pinLimb(J, 'hF' \| 'hB' \| 'fF' \| 'fB', [x, y], bend = 1)` | pins a hand or foot to a world point with IK (mutates J). Flip `bend` if an elbow or knee folds the wrong way |
| `blendJ(Ja, Jb, p)` | position-wise blend of two joint sets (FK pose → IK solve transitions) |
| `shiftJ(J, dx)` | shifts a joint set horizontally (mutates and returns J) |
| `new Figure(parent, { scale, color = C.hero, detail = 'pencil', outline = C.void, outlineWidth = 12, seam = 4, stroke = figStroke(), opacity })` | the figure in an SVG `<g>` (`data-deco`) |
| `fig.extentX(J)` | `[x0, x1]`, the drawn figure's horizontal extent (limbs with halo, head, pencil) |
| `figStroke()` | the figure's limb width in px (`S.figure`, constant at every scale) |
| `fig.pose(t, track, { x, ground, face, scale, plant, breathe, sx, sy, opacity })` | FK + secondary motion + draw. Returns J |
| `fig.draw(J, { sx, sy, opacity, stroke })` | draws joints you solved yourself (IK, blends). `sx`/`sy` squash about the ground under the hip. `stroke` overrides the limb width for this frame (the knockout and the pencil scale with it) |

Typical uses:
- A hand on an object: `const J = fig.pose(t, tr, { x, noDraw: true }); pinLimb(J, 'hF', anchor); fig.draw(J)`.
- Carrying something: put it at `J.hF`.
- A rival figure (ledger-duel, chart-race): `new Figure(g, { color: C.grey })` ("neutral", slate) or `C.ink`, with a small `outlineWidth` where figures overlap. Green is only for "you" or the winner.

### 3.3 World, camera, impacts

| Signature | Returns / does |
|---|---|
| `makeWorld(ctx, { floor = true, floorY = 1300, clip = null })` | `{ root, svg, g: { back, mid, fig, front, fx, top }, html, flash, viewport }`. Z-order: `back < mid < fig < front < fx` (SVG) `< html` (text) `< top` (SVG over the text). World coordinates are stage coordinates. `clip: [top, bottom]` shows the world only inside that band (a scrolling viewport, `overflow: hidden`, which the linter understands) |
| `floorLine(y)` | the floor line (already added by `makeWorld`) |
| `camera(world, { fx, fy })` → `cam.set({ fx, fy, x, y, zoom, shake })` | puts world point (x, y) at screen (fx, fy). With no arguments it is the identity |
| `makeFx(world, ctx)` → `fx.impact(t, { x, y, shake = 12, flash = 0, burst = true, r = 70, rx, ry, lines = 10, punch = 0, cue = 'hit', gain, color })` | registers an impact at mount: the cue, a per-frame shake, a white flash, radial hit lines outside an ellipse `rx × ry`, and a camera punch. Hit lines are unfilled strokes, and a burst that is not playing parks its lines at the hit point, so an idle burst never sits over text |
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
| `chrome(spec, ctx, body)` | used by kit.js. Draws the brand mark, header, footer, captions (each line's words pop in within ~0.3 s and the line fades out at its end; a hidden line resets its words, so seeking backwards replays them; `**x**` → green, `__x__` → red; 54 px on an integer 60 px line, fitted down to 40, and `text-wrap: balance`, so a 2-line caption never leaves a one-word orphan) and the verdict (see below) |
| `wordTokens(text)` | splits caption/verdict markup into words: `[{ parts: [{ s, cls: '' \| 'em' \| 'mark2' }] } \| { br: true }]`. A word is a whitespace-delimited chunk and can hold several runs, so `**$2,450**.` is one word and punctuation never wraps onto a line alone |
| `durationOf(spec, lastBeat, hold = 3)` | `spec.duration` or the latest of: last beat + hold, last VO end + 0.4, `verdict.t` + 2.5 |
| `toneOf(tone)` | `{ text, fill, soft }` |
| `brandMark()`, `preloadFonts()` | used by kit.js |
| `stubFormat(name)` | a placeholder body (figure + "TODO name") for starting a new format; no format uses it now |

**The verdict.** It pops in at `verdict.t` in the caption band (from 0.82 scale, rising at most as far as the band allows, so its ink never leaves y 1480), hides the captions and cues `ding`. It is fitted at line-height 1.08, down to 44 px. The green swoosh is drawn under the first `**…**`, one stroke per line the emphasis covers, hanging from the measured baseline. When the emphasis ends above the last line, the verdict is refitted at line-height 1.3 (then 1.22) so the swoosh has room above the next line's caps, and the swoosh is flattened and lifted to clear them; if neither fits (a 3-line verdict) it keeps the tight fit and the emphasis is green without a swoosh.

**The footer budget.** The footer (`.br-footer`) is JetBrains Mono 700 at 40 px, letter-spacing −0.02em, line-height 1.25 (50 px), in a box 878 px wide (x 62-940). Its top is `max(L.footerTop, header bottom + 12)`. A mono cell is 0.6 em (600 of 1000 units in the vendored font), so one character is 24 − 0.8 = 23.2 px, and a line holds **37 characters** (38 would need 881.6 px). `chromeParts` fits it with `fitText(footer, 880, { maxH: 110, minPx: 34 })`, so it allows two lines. A footer that wraps to a third line, or has one word wider than 880 px, is shrunk in 2 px steps (38, 36, 34 px). Anything under 39.5 px is a `type-floor` lint warning; the 34 px floor means it never becomes an error. Budget:
- At most about 2 × 37 characters. Word wrap loses a few per line, and characters that fall back to Inter Full (`≈ × ÷ − →`) are not 23.2 px wide.
- Break it yourself with `\n` (markup turns it into `<br>`), each line ≤ 37 characters, as the real specs do: 02a's `"At 7% a year until 65\nno tax, fees, inflation"`; 09a's first line `"ASSUMES 8% a year, compounded monthly"` is exactly 37.
- Move detail into the VO or a working line rather than let the footer shrink.

---

## 4. growth-ladder (flagship)

The table **is** a ladder. Rails sit on the left with one rung per row, and each rung runs out to the right as a dotted shelf the row's numbers stand on. The whole ladder is on screen from frame 1: year labels dim, shelves dotted, ladder light grey. As each row lands, its rung turns ink, the Worth drops onto the shelf and squashes (`thud`), "You put in" slides in, and a **composition meter** draws under the Worth (grey = what you put in, green = growth). The green share widens rung by rung, which is the "growth overtakes deposits" story without a single extra label. The newest Worth is green and the earlier ones settle to ink. The last Worth lands on a **gold plate** with the impact kit (hit, shake, burst, 3% camera punch, `cash`), and coins spill off its right end into the margin.

Modes, chosen automatically:

- **throw** (the ladder fits on one screen, about ≤ 10 rows): the figure stands on clear void left of the rails (root x 96, shifted in further whenever his pencil would come within 40 px of the frame edge), at the foot of the ladder. With a figure the ladder is narrower and set further right (rails x 208-272; x 140-220 without a figure and in climb mode). Frame 1 has him hand on chin, looking up the empty ladder, with a nod in the first second. For each row he takes a coin from nowhere, winds up and throws it in an arc to the row's slot, where it turns into the number. Coins grow with the value and the wind-ups deepen. For the last row he lifts a big coin overhead, wobbles under it (`riser`), dips and heaves it (`whoosh`), then celebrates with a hop and squash and points at the plate. With ≥ 2.2 s before the last row, the heave fills that gap as a struggle: the coin drops into his arms (he buckles), he tries to hitch it up and sags, then presses it overhead under the riser and strains, wobbling, until he heaves it. When rows come too fast for a throw (< ~0.5 s apart), numbers just drop in.
- **climb** (long ladders; 15 yearly rows needs it): the type is sized for legibility and the camera follows. The figure climbs hand over hand, with hands and feet pinned to the rungs by 2-bone IK, and slaps each rung as its row lands (a small burst at the hand); his halo is thin (5 px) so it never chops the rails he holds. The camera keeps the newest rung about 40% down a viewport under fixed column heads, and rows fade out at the viewport edges. The viewport ends at the floor line, which is pinned in screen space: the ground plane never pans away, the ladder rises out of it. On the top rung he lets go with one hand and pumps his fist (the free arm bends away from the rails, and the knees refold so his legs stay between them).
- **few rows** (5 or fewer, in either mode): values grow to up to 84 px (column heads wrap first rather than shrink), the pitch grows to about 2.6 em, and the table is centred in the work area. The ladder keeps filler rungs down to the floor, so the hook frame is never half empty.

Data: FORMATS.md §9 exactly. `rowT[i]` overrides `rowsT + i·rowEvery` (defaults 1.5 and 1.2), `highlightLast` (default true) gives the plate and the impact, and `hold` defaults to 3. Column heads are right-aligned and bottom-aligned, single-line at 40 px when possible (house letter-spacing .07em, then tightened to .04em), and otherwise wrap to two lines. If the hook does not already contain `input.amount`, a mono input line ("**$200** a month · 7% a year") is shown above the table.

Layout: a 1-2 line hook leaves the band above `L.footerTop` empty, so the footer is lifted to 16 px under the hook and the ladder starts under its new bottom (a 3-line hook is unchanged). Throw mode keeps the year head right of the rails; only when that would leave the values under 56 px may it overhang the rails, above the ladder top. The climax keeps clear of the table: its hit lines are clipped to the band between the column heads and the row under the plate and to the right of the plate's left edge − 8, and the coins spill down the right margin (x 940-1000), never over a label. The header gets 0.1em word spacing (the heavy face fuses "invested just" at phone size), and Worth cells set "≈ $X" with 0.14em word spacing.

lookOpts (all optional; it renders fully without them):

| Key | Default | Effect |
|---|---|---|
| `mode` | auto | `'throw'` or `'climb'` |
| `figure` | `true` | `false`: no figure (numbers drop onto their rungs) |
| `figureScale` | `1.3` (throw) / `1.1` (climb) | size of the figure. In throw mode he stands clear of the ladder and his pencil stays ≥ 40 px inside the frame |
| `bars` | `true` | `false`: no composition meters |
| `heave` | `true` | throw mode: `false` throws the last row like the others |
| `establish` | `false` | climb mode: open on a wide shot of the whole ladder towering over him, then push in. Rung labels stay hidden until they are legible, so frame 1 then relies on the header for its number |
| `cols` | `[0, 1, 2]` | which three data columns the ladder prints, as `[year, second, hero]`. A 4-column spec cannot print four numbers a row beside the figure, so it picks three; the hero column is the one that drops, turns green and gets the gold plate. Ignored unless every row has all three. Columns left out are not drawn |
| `second` | grey mono | `'bold'`: the second column in the hero face (Inter Tight 800, ink), for a balance rather than a deposit |
| `target` | none | a display string (`"$100"`): the meters become a target gauge. Under each hero is a 9 px soft track as long as the target, with an upright tick at the column's right edge, filled grey to hero ÷ target (≥ 20 px). On rows that reach it, the fill and tick snap green with a pulse. The gold-plate row has no gauge. Needed whenever `cols` moves the hero off the Worth: without a target, a custom hero gets no meters |
| `working` | none | `[{ t, text }]`: working lines, one mono 40 px line at a time over the column heads, swapped in at `t` (hold, then snap). They are ink, with `**x**` the result in heroInk. A line at `t ≤ 0` is up at frame 1. A long line shrinks, never below 40 px |
| `beats` | none | `[{ t, row, act, d, label, tone, impact, relight }]`, throw mode. `act`: a POSES name or a list of them shared out over `d` (default 1.6 s; `'celebrate'` adds a hop), taken 0.14 s after `t`, cut short by his next throw. `label`: a tag on an ink plate over the empty slot above the row's hero, from `t + 0.08` to `t + d` (`tone` `'good'` green, `'bad'` red; `**x**` coin yellow). It must be gone about 0.6 s before the next coin flies. `impact: true`: the hero swells to 1.15× (anchored right, over 0.5 s) under a burst and a shake, with no sound (cue it in `spec.sfx`). `relight: true`: from `t` the row's year and hero turn green again and stay green, behind a green outlined plate, and the gold plate steps back (grey border, paler fill) |

Example: `specs/09a-becker-rig-100-a-month-doubles.json` uses `cols: [0, 2, 3]` (the 4th column, "Earns a month", becomes the hero), `second: 'bold'`, `target: "$100"`, nine `working` lines, and `beats` with labels, an impact and a closing relight on row 3.

Samples:
- `samples/growth-ladder.json`: $100 a month at 8%, 9 rows (years 1-40), throw mode, 26 s.
- `samples/growth-ladder-15y.json`: $200 a month at 7%, 15 yearly rows, long column labels, a 2-line footer, climb mode, 20 s.

All values are monthly compounding with end-of-month deposits, checked in Python.

---

## 5. dead-simple-list

"N dead simple numbers" (FORMATS.md §1). The list is a stack of numbered slots, all on screen and empty from frame 1. Each slot has an outlined number tab, the label (dim until it is reached) and a dashed socket for the answer. When item 0 starts in the first 0.3 s, its number is already typed at frame 1.

The figure stands on the floor at the far right (hip x ≈ 944 − 52 × scale, about 900), right of the list: his body never comes within 10 px of the value column (a lunge or a deep squat shifts him right instead). He uses the maths as a tool. Every formula is split at its first spaced operator:
- The number (`$100,000`) drops into the slot as a white glyph block and types itself.
- The operator and the rest (`× 0.25`) type onto an ink plate that pops into his hands. He holds it **low**, hanging from his hands below his hips, so the only part of the list it ever shares is the bottom ~100 px.
- He winds up and throws the plate. It snaps edge-on into a lane right of the list, rises, hooks left over the row and slams down flush against the block.
- The impact plays: hit lines, chips, shake and `hit`. The pair crunches (0.07 s) into the answer, which squashes into its socket, and its note follows.

The goal answer is a two-handed heave from a deep squat. It lands on a gold plate with the big impact (white flash, camera punch, `cash`), and he celebrates and points at it (forward when it is beside him, up when it is above him). Throws alternate between an overhand fling (`chop`) and an underhand flick (`kick`), and the goal is always a `slam`.

Layouts are measured with the real fonts at mount, and the first that fits wins:

- **rows**: label line(s), then a value line underneath. The block, the answer and its note are left-aligned under the label, and each label sits directly on its own value line (a 1-line label in a list of 2-line ones does not float). Labels may wrap to 2 lines. A note goes on the value line, the label line or beside the block, else 1-2 lines below.
- **lines** (long lists): one row per item, a label column and **every answer right-aligned on one edge** (x 834; the value column never steps in, so it is never ragged). A row whose label cannot sit beside a long answer in 2 lines is **stacked**: the label runs the full width and the answer sits on its own line under it, still on the value edge. A block wider than the answer ducks the label while it is shown.
- **The corner**: only the bottom ~100 px under his held plate is shared, normally by the bottom row alone, which is the last item: its answer lands after every plate has gone, so it keeps the full edge. Its label and its block step in left of the plates while they are there. All ledges end at one x.
- **Few items** (5 or fewer): the rows spread out (pitch up to about 260 px, values up to 84 px) and the list is centred in the work area.
- **Fallbacks, in order**: notes at 40 px, then the input line is dropped, then the figure shrinks (0.84 → 0.74 → 0.66), then 3-line labels are allowed, then a tight lines pass (8 px row padding, 46 px label leading), then the goal plate steps down from 1.06× to 1×. Only then does it throw. The 13 regression specs (3-6 items, long labels, long unit results such as "≈ $54,000 a year", notes) all render.

lookOpts (all optional):

| Key | Default | Effect |
|---|---|---|
| `hits` | alternate | the throw per item: `'kick'` (underhand flick), `'chop'` (overhand fling) or `'slam'` (two-handed heave). `toss`, `throw` and `heave` are aliases. The goal is always a slam |
| `actions` | none | `[{ item, verb }]` from a spec brief, mapped onto throws (smash/chop/carve/hammer → chop, kick/punch → kick, ...) |
| `figureScale` | `0.84` | figure size (0.6-1.1); the fitter may shrink it |
| `input` | auto | `'show'` or `'hide'` the input line (default: shown only when the header does not already contain `input.value`) |
| `layout` | auto | `'rows'` or `'lines'` |

Samples:
- `dead-simple-list.json`: 4 numbers for $100,000 a year, rows layout, 23 s.
- `dead-simple-list-2.json`: 6 numbers for a first paycheck with 2-line labels, lines layout, 31 s.
- `dead-simple-list-3.json`: 6 numbers for a $250,000 house (6.5%, 30 years, 20% down; checked: $1,264.14 a month, $455,089 in all, $54,171 a year at 28%), long unit results, the goal row stacked, the tight lines pass, 28 s.

## 6. chart-race

The same stake in 2-3 named rivals (FORMATS.md §4). Every rival is a stick figure travelling the tip of his own line: the line is terrain, drawn out under him as the race runs.

The chart is a treadmill. After a short roll-out from the start line, the tips sit at a fixed x, the history compresses to the left, and the value axis rescales upward (the "$K → $M" pull-back). The tip counters live in one fixed column right of the figures, as a name over a live value. A counter is red while it is under the stake.

- **Axes**: an ink base axis at `floorY − 72` with year ticks under it, and dollar ticks on the left (plot from x 104).
- **Gait** comes from the terrain:
  - Feet are planted on the line, so a gentle slope is a walk and a moderate drop is a slide on the seat.
  - On very steep stretches he rides the tip.
  - A crest that falls away faster than gravity launches him, and he lands with a squash and `thud`.
- **Lead changes are overtakes**: a fist pump and `whoosh`, and the counters swap places in a quick timed exchange. Figures whose tips share a height walk one behind the other. Figures never stack: a trailing figure whose body overlaps a better-placed one fades out (his coloured tip dot stays), so the leader of a cluster is the only figure in it.
- **Events**:
  - A red crash band grows over a real drop.
  - The figure that falls is shocked (hop, `hit`, red hit lines) and rides his tip down.
  - A flag drops onto the terrain once he is clear of the spot, and gives way (fades out) while any visible figure comes within 40 px of it, so no pole ever runs through a figure.
  - The label shows in the HUD row (it holds, then snaps out in 0.15 s).
- **Finale**: the tips stop on the spec's final display strings and a summit ledge pops under each one. The winner crouches, jumps and lands as his number hits a gold plate (impact kit), then celebrates. The others slump and `sit` on their ledges.
- **Colours**: the series that finishes highest is the hero (green), and the others are slate, then ink, in series order.
- **Names**: 40 px, 2 lines plus an ellipsis at most, cut at a word boundary ("Vanguard Total World Stock…"), with no break inside parentheses.
- **Plot width**: the tip counters use 56 px values (52 at most-narrow), so the plot reaches as far right as the tag column allows (the column must stay at x ≤ 940; a 58 px gap keeps his forward hand clear of the tags).
- **Frame 1**: every value-axis label is fully in or fully out (no half-faded ghost on the thumbnail).

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: tip dots and counters only |
| `figureScale` | 0.76 (2 series) / 0.56 (3) | figure size |
| `fill` | `true` | `false`: no pale hill under the hero line |
| `figures` | winner = hero | `[{ series, color: 'hero' \| 'neutral' \| 'ink' }]` |
| `beats` | none | `[{ t, act, series, label, to, d }]`: scripted reactions. `act` = `cheer`, `shrug`, `impact`, `grow`, `peek`, `flood` or any POSES name. `label` is a note under that figure's counter (or on the tide, for flood). `flood` is a red "prices" tide rising from the stake to value `to`. An `impact` beat near an event on the same figure replaces that event's automatic hit. Beats add no sound of their own |

Samples:
- `chart-race.json`: $10,000 in the S&P 500 vs gold, 2010-2025, 3 events, 38 s.
- `chart-race-2.json`: $5,000 in the Nasdaq-100 vs the S&P 500 vs gold from 2000, with long names, 54 s.

## 7. split-sheet

"The paycheck carve" (FORMATS.md §5). The total is a gold slab of money hanging over the parts, and the figure works it with a saw. Frame 1 already shows the whole sheet: the slab with the total, and every part's label and percentage.

He saws through at each part's cut mark, left to right:
- The piece drops and squeezes into its bin or tray (`thud`, squash), filling it to its dashed line, and the dollar amount lands.
- The newest amount is green and settles to ink. A goal part lands on a gold plate with the impact kit.
- The slab stands on an ink post with a bracket under its last stretch, so the shrinking remainder is always held up. The last piece tips off the bracket about its right foot into its bin.
- A working line under the slab (mono, one at a time) carries each part's note, the `÷ 10` formula and the gag.
- At the end, copies of the amounts jump out of the bins into the sum check, `$a + $b + $c = $total`.

**The total's label** is fitted to the slab: at most 2 lines, set solid (capitals have no descenders), never broken at a hyphen (`TAKE-HOME` gets a non-breaking hyphen), 40 px whenever any layout allows it (the total gives way first, 96 → 64 → 56 px), 34 px at the least.

Layouts, picked from the content:

- **bins** (up to 5 parts whose labels fit in 2 lines): one bin per part on the floor, with the label white on an ink plinth and the percentage in a dashed outline. The bins end at x 806, leaving the floor corner free for the post. He stands on the slab and hops down onto the floor before the last piece drops.
- **rows** (more parts or long labels): a sheet of rows, with the label and percentage on the left (a long label on 2 lines, balanced) and the amount on the right, plus a thin soft track under each row (no hatching). Every piece drops straight down onto its own track (a waterfall of the total). The post stands right of the sheet, and the figure stands on the floor in the corner and points. It gives way step by step and throws only when 7 one-line rows cannot fit: (1) labels 44 → 40 px, amounts 64 → 44, slab 100 → 88 px; (2) the percentage moves into the value column (`28%  $1,680`) so labels get the full width, tighter 2-line leading, thin tracks right under the text, the slab down to 72 px, and the notes' working line goes; (3) a second label line that still does not fit is cut at a word with an ellipsis; (4) one-line labels with an ellipsis.
- **Percent tags** (bins): every bin's tag sits on one line, the bins' mid-height.
- **The sum check**: in rows mode the copies of the amounts swing out right of the value column (as small void-backed chips) and then up into the check, so they never pass over another row's amount.

Percentages on the slab: every piece at least 60 px wide carries its own, all at one size (40 → 34 px to fit). Narrower pieces carry none, so a piece is never labelled while a wider neighbour is not. Under 40 px they repeat the percentages printed on the sheet, so they are marked as decoration for the linter.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `tenth` | none | `{ t, formula, display, count }`: cut the total into `count` equal bricks first (a `÷ 10` cleaver slams down at `t`, and the slab cracks into bricks showing `display`). Ignored unless every share × count is whole |
| `actions` | none | `[{ t, tool }]`: the first entry without `part` labels the cleaver |
| `envelopes` | part labels | bin names |
| `gag` | none | `{ t, text }`: a closing working line |
| `layout` | auto | `'bins'` or `'rows'` |
| `figure` | `true` | `false`: the pieces just drop on their beats |
| `figureScale` | 0.92 (bins) / 0.86 (rows) | figure size (bins tries 0.92 → 0.86 → 0.8 to fit) |

Samples:
- `split-sheet.json`: 70/20/10 on $3,500, bins, 17 s.
- `split-sheet-2.json`: a 6-bucket $5,000 budget, rows, 17 s.

## 8. pov-race

"POV: you invested in X instead of paying $Y for X's product" (FORMATS.md §6). Two piles share one dollar scale, and the figure stands between them, making the choice over and over.

- **Left (SPENT)**: a ghost column (pale red, dashed outline) as tall as the cumulative spend. Its red counter lands on `spend.final`. Below 60 px the column becomes a 60 px slab labelled with the counter's own running number (the same string, frame for frame; `spend.final` only once the counter lands on it). The label sits inside the slab, or on top of it like a tag when the junk heap would touch it. The dotted red "paid" line keeps the true height.
- **Right (OWN)**: a tower of gold coins as tall as the same money in the stock. Coins drop onto it with a squash. When the stock falls, coins tumble off the top (wobble, red hit lines). Its counter is green, turns red while under the paid line, and lands on `own.final` on a gold plate.
- **Each purchase** (one cycle per rise of the spend line and per `data.purchases` entry, at least 0.95 s apart):
  - A coin squashes into the item, a gold copy arcs onto the tower, and a price tag pops beside his head.
  - He uses the item, it cracks and greys, and he flings it onto a junk heap next to the spent column.
  - A single purchase (one phone) lives long: he holds it, it cracks twice, and he watches the tower. With one or two items, the heap stays big on screen.
- **Reactions**: he hops in shock at crashes and when the tower drops below the paid line. He ends by celebrating (≥ 2.5×), shrugging (1-2.5×) or slumping (a loss).
- **Scale reveal**: when the tower outgrows the stage, the camera pulls back about the floor. The figure shrinks 62% as much, and the header, timeline and counters stay put.
- **Counters**: the running values use the style of the final string, with its trailing words as a small suffix. While a value is under $100, and before the race starts, both counters use the larger decimal count of the two finals, so frame 1 reads `$7.99` vs `$7.99`, not `$7.99` vs `$8`. They end exactly on the spec's strings.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `prop` | `data.spend.item` | the item icon (any lib icon name) |
| `jarLabel` | none | a ticker plate on a plinth under the tower (the spent column gets a ghost plinth) |
| `endPose` | from the ratio | `'celebrate' \| 'shrug' \| 'slump' \| 'point'` |
| `figure` | `true` | `false`: piles and counters only |
| `figureScale` | `1` | figure size at the start of the race |
| `zoom` | `true` | `false`: no pull-back (the piles are fitted to the stage from the start) |

Samples:
- `pov-race.json`: Netflix at $7.99 a month, 8 price steps, 28 s.
- `pov-race-2.json`: Apple instead of the first iPhone at $499 (a single purchase), 27 s.

## 9. ledger-duel

Same stake, two choices side by side (FORMATS.md §7).

**The stacks.** On the left, two coin stacks stand on the floor, each with its owner on top (green = the winner-to-be, slate = the other). Stack height is the money, on one linear scale shared by both.

**The ledger.** On the right is a right-aligned ledger (label | A | B) that builds bottom-up from the floor, like the flagship's ladder:
- Every label is dim from frame 1.
- The stake row is already settled at t = 0, so frame 1 shows a number.
- Each row's two values drop onto their dotted shelf together.

**Row kinds:**
- **gain**: the stack springs up under its owner, and the value lands green.
- **dip** (a small loss): the stack sinks, and the value lands red.
- **crash** (a loss of 12% or more, or any loss on a `bad` row): an impact on the stack. The lost coins burst off and roll to the floor, he is blown up and lands squashed, then slumps, and the other one flinches.

**Other beats:**
- **Lead change**: the new leader pumps a fist.
- **Event text**: pops as a pill above its row until the next row lands.
- **Final**: the winner's last value lands on a gold plate (impact, punch, `cash`). The winner celebrates on the taller stack, and the loser slumps while his column settles grey.
- **"Less is better" duels** (debt): red debt piles, and paying down is green.

**Column heads.** Each head is "● Name" with the plan under it in grey, right-aligned over its column; every name appears once. A's head may reach left over the label column, and the split between the two heads may move left over A's values (up to 3/4 of their width) so B's plan gets room. A name is never dropped: 48 → 40 px, then without its dot (the name keeps its colour), then on two lines. A plan is never cut: it wraps (40 px, down to 34 only if needed).

**Layout fitter.** Everything is measured at mount: values run 64 → 40 px, labels about 0.8 of that, rows 1.15 em apart (12 rows fit at 40 px). When the rows do not fit, the fitter scores these alternatives and keeps the best:
- drop the stake line;
- drop the headroom for a last-row event;
- plans on 3 lines, or at 38 → 34 px;
- a full-width legend instead ("● Name  plan", each wrapping to 2 lines, never cut) with plain column heads (names only, no dots);
- as a last resort, 36-38 px values, which the linter warns about.

The stacks stand at x 42 → 192 and the figures are shifted in whenever a pencil would come within 24 px of the frame edge.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: no figures (the stacks still grow and get knocked down) |
| `figureScale` | `0.8` | figure size |
| `figures` | winner hero, other neutral | `[{ person, color: 'hero' \| 'neutral' \| 'ink' }]` |
| `rowLabelsAtStart` | `true` | `false`: rows appear as they land |
| `stake` | `true` | `false`: no stake line under the footer |
| `keyLabel` | none | a head over the label column (e.g. `'Year'`) |
| `beats` | none | `[{ t, act, person, targets, d }]`: a POSES name (or `cheer`, `peek`) for `person`, held `d` = 1.4 s, or `'impact'` on `targets` (skipped where a crash already hits) |

Samples:
- `ledger-duel.json`: $10,000 in 2000, S&P vs savings, with a 2008 crash, 15 s.
- `ledger-duel-2.json`: $100,000 at 35 with 0.05% vs 1% fees, 11 rows, the legend layout, 13 s.

## 10. unit-ladder

A price ladder in a unit you know (FORMATS.md §8): cost ÷ unit price, repeated from cheap to huge. The division is a verb the figure performs, and every answer is a pile you can see next to the ones before it.

- **Frame 1**:
  - If the first rung starts late, he holds up one unit and the HUD reads `1 hot dog = $1.50` with the counter at 1.
  - Otherwise the first price coin is already standing in front of him.
- **Per rung**:
  1. The HUD swaps to the item and "cost ÷ price =" (the HUD and the counter swap together), and the counter becomes `?`.
  2. A gold coin (the price) drops in front of him. He punches it (a karate chop for small coins), and it bursts into units.
  3. The units arc over to the end of a row of piles and stack into a brick pyramid. The counter rolls with every unit that lands.
  4. The count lands exactly on `unitsDisplay`, and its `=` turns into `≈` when the result is rounded.
- **Camera**: it pulls back until the whole row of piles is in frame. He stays at the far left, never under about 96 px on screen, with his line weight kept constant on screen.
- **Piles**: one path filled with a brick pattern of the unit icon, so a pile of 266,667 is exactly 266,667 icons in one DOM node. Up close every brick is one unit. Further out the pile switches level of detail: level k draws the same brick pattern 2^k times bigger, so every pile always reads as a heap of hot dogs or clocks (each icon ≥ ~19 px on screen, never a flat grey shape); a level cross-fades into the next over a fifth of a level. One level out the pile gets a pale base under its icons and an ink outline, and once its rows are under 9 px on screen its outline is the smooth pyramid, not a stair-step.
- **Finale**: the last count lands on a gold plate with the impact kit, and he jumps, then slumps.
- **Recap table**: once the last pile lands, the camera steps back a little and a recap table pops in under the counter: **one row per rung**, biggest first (a leaderboard), the count right-aligned in its column (ink, 40 px) and the pile's name after it (grey, 40 px). A count never appears without its name and no rung is dropped.
  - A long name wraps to a second line (balanced, never starting with "of"); only when even that does not fit is it cut at a word with an ellipsis.
  - The table takes one column when it fits above the piles (at the margin, or beside the figure at x 200 so it may reach lower), else two (row by row or column by column, whichever keeps the names whole).
  - The step back (1 → 0.4) is the gentlest that clears every pile and the figure.
  - A thin leader runs from a row's end to its pile's apex wherever that line is clean (it crosses no other row, leader, pile or the figure).

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: each coin cracks open by itself |
| `figureScale` | `1.1` | figure size |
| `unitLabel` / `unitLabelOne` | from `unit.name` | the plural / singular label beside the counter |
| `intro` | `true` | `false`: never open on the "1 unit" state |
| `iconSize` | `68` | world size (px) of one unit icon's longer side |
| `plate` | `true` | `false`: no gold plate on the last count (a `goal` rung always gets one) |
| `pileLabels` | auto | `false`: no recap table. An array gives the name per rung (default: the item name shortened, with no article and no ", at ..." qualifier) |

Samples:
- `unit-ladder.json`: Costco hot dogs, 5 rungs from Netflix to a house, 24 s.
- `unit-ladder-2.json`: hours of work at $20, 7 rungs, 27 s.

## 11. cost-counter

A dollar counter ticks at a fixed real rate (FORMATS.md §10). This is the overheating counter, Alan Becker's "Clicks Per Second" idea.

- **The board**: a flat white readout board with a 10 px ink border, held up by one ink post at its left end (he leans on it in calm stretches). It carries:
  - the label, with a live dot that blinks once a real second;
  - the counter in big ink digits, the kit's hero-number face (Inter Tight 900, tabular figures, so it never jitters; `≈` tucked in at 0.8 em);
  - a strip showing the rate.

  The board is as tall as the strip's current state: a 2-line milestone flash grows it, the 1-line rate shrinks it back (a 0.12 s snap), and the NEXT ticker rides under its bottom edge.

  The counter runs linearly over `counterT` from `startValue` and locks on `final`. Milestone values are never computed: only their display strings are shown.
- **NEXT**: a ticker under the board previews the milestone being chased, and that object's dashed ghost waits on the floor, so frame 1 already has a target.
- **A pass**:
  - The board kicks, the rim flashes, and the strip rolls to "✓ label: amount" (the amount in heroInk).
  - The milestone's object (house, car, coin, a wad of bills, ...) drops from under the board onto its ghost with a squash, dust lines and a shake.
  - Objects heap up right to left, each bigger than the last.
  - The figure escalates: flinch and point, a shocked jump, then a duck and a step back.
- **Heat**: hold, then snap. The digits, the live dot and the rim stay ink until the first pass, then snap to red in 0.15 s (blended in OKLCH, so never through maroon mud; a cost is a loss). Each further pass heats the board a notch in 0.15 s: the rim thickens as a solid ring, then vibration and steam. There is no glow and no orange: it stays a flat prop. An object only shows once a third of it has come out from under the board. The lock is the peak (white impact frame, shake, side hit lines, camera punch), and the last landing knocks him onto his butt.
- **Layout**: the readout is sized to the widest string it will show and to the room under the hook and footer. On a crowded top, the figure shrinks (to 0.9) before the counter does.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: no figure (the heap is centred under the board; the post stays) |
| `figureScale` | `1.1` | figure size (less when the top is crowded) |
| `finale` | `'sit'` | his pose once the counter locks: `'sit' \| 'slump' \| 'shrug' \| 'celebrate' \| 'shocked'` |
| `icons` | guessed | object per milestone, by index (else from the label: house, car, phone, pay → bills, hour → clock, else a coin) |
| `objects` | `true` | `false`: no dropping objects (the strip still flashes) |
| `ghosts` | `true` | `false`: no dashed ghost of the next object |
| `preview` | `true` | `false`: no NEXT ticker |
| `heat` | one notch per milestone | `[{ t, state }]`, with state `cool \| warm \| orange \| hot \| white \| burst` or a number 0-1 |
| `heatColor` | `'red'` | `'hero'`: heat to green instead (money earned) |

Samples:
- `cost-counter.json`: US debt interest per second, 4 milestones, 37 s.
- `cost-counter-2.json`: new US debt per second, 7 milestones up to a working life of pay, `finale: 'shrug'`, 40 s.
