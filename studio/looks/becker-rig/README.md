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
| `beats` | none | `[{ t, row, act, d, label, tone, impact, relight }]`, throw mode. `act`: a POSES name or a list of them shared out over `d` (default 1.6 s; `'celebrate'` adds a hop), taken 0.14 s after `t`, cut short by his next throw. `label`: a tag on an ink plate over the empty slot above the row's hero, from `t + 0.08` (`t + 0.24` on an impact beat) to `t + d`; green, or red with `tone: 'bad'`; `**x**` coin yellow. It must be gone about 0.6 s before the next coin flies. `impact: true`: the hero swells to 1.15× (anchored right, over 0.5 s) under a burst and a shake, with no sound (cue it in `spec.sfx`). `relight: true`: from `t` the row's year and hero turn green again and stay green, behind a green outlined plate, and the gold plate steps back (grey border, paler fill) |

Example: `specs/09a-becker-rig-100-a-month-doubles.json` uses `cols: [0, 2, 3]` (the 4th column, "Earns a month", becomes the hero), `second: 'bold'`, `target: "$100"`, nine `working` lines, and `beats` with labels, an impact and a closing relight on row 3.

Samples:
- `samples/growth-ladder.json`: $100 a month at 8%, 9 rows (years 1-40), throw mode, 26 s.
- `samples/growth-ladder-15y.json`: $200 a month at 7%, 15 yearly rows, long column labels, a 2-line footer, climb mode, 20 s.

All values are monthly compounding with end-of-month deposits, checked in Python.

---

## 5. dead-simple-list

"N dead simple numbers" (FORMATS.md §1). The list is a stack of numbered slots, all on screen and empty from frame 1. Each slot has an outlined number tab, the label (dim until it is reached) and a dashed socket for the answer. An item at `t ≤ 0.3` is pre-typed at frame 1 (the cover): its block is typed and its plate is in his hands. From 0.1 s he flips that plate up and catches it (it turns like a card; `swipe`, `tick`, a soft `thud`) until his wind-up, so the opening never freezes.

The figure stands on the floor at the far right (hip x ≈ 944 − 52 × scale, about 900), right of the list: his body never comes within 10 px of the value column (a lunge or a deep squat shifts him right instead). He uses the maths as a tool. Every formula is split at its first spaced operator:
- The number (`$100,000`) drops into the slot as a white glyph block and types itself.
- The operator and the rest (`× 0.25`) type onto an ink plate that pops into his hands. He holds it in front of him at his waist, hanging from his hands with its bottom ~60 px off the floor, so his arms and legs show and the only part of the list it ever shares is the bottom ~130 px. While a held plate shares a socket's band (from its pop-in to his wind-up), that socket stops 16 px short of the plate's left edge (it keeps ≥ 120 px).
- He winds up and throws the plate. It snaps edge-on into a lane right of the list, rises, hooks left over the row and slams down flush against the block.
- The impact plays: hit lines, chips, shake and `hit`. The pair crunches (0.07 s) into the answer, which squashes into its socket, and its note follows. A crunch's hit lines are clipped 6 px under the label over its value line; the goal's burst is not clipped.

The goal answer is a two-handed heave from a deep squat, with the longest wind-up (up to 1 s over a `riser`). It lands on a gold plate with the big impact (white flash, 3% camera punch, `cash`), and he jumps for joy (or a shocked jump: `finale`), then points at it (forward when it is beside him, up when it is above him; his hand aims at it). Its note sits beside the gold plate when it fits (one line, else two at the plate's mid-line), and only otherwise on the label's line. In the rows layout the goal is also the climax by size: its answer is set 1.45× (else 1.35×, 1.3×, 1.15×) as long as every other answer still gets 64 px or more, and only the goal row is as tall as its plate plus clear space (16 px above, 22 below). Throws alternate between an overhand fling (`chop`) and an underhand flick (`kick`), and the goal is always a `slam`.

Layouts are measured with the real fonts at mount, and the first that fits wins:

- **rows**: label line(s), then a value line underneath. The block, the answer and its note are left-aligned under the label, and each label sits directly on its own value line (a 1-line label in a list of 2-line ones does not float). Labels may wrap to 2 lines. A note goes on the value line, the label line or beside the block, else 1-2 lines below.
- **lines** (long lists): one row per item, a label column and **every answer right-aligned on one edge** (x 834; the value column never steps in, so it is never ragged). A row whose label cannot sit beside a long answer in 2 lines is **stacked**: the label runs the full width and the answer sits on its own line under it, still on the value edge. A block wider than the answer ducks the label while it is shown.
- **The corner**: only the bottom ~130 px beside his held plate is shared, normally by the bottom row alone, which is the last item: its answer lands after every plate has gone, so it keeps the full edge. Its label and its block step in left of the plates while they are there. All ledges end at one x.
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
| `finale` | `'cheer'` | his jump when the goal lands: a "yes!" or `'shocked'` (arms flung up: a payoff that is an outrage, not a win) |
| `acts` | none | `[{ t, act, item }]`: his acting after the goal, keyed to the VO lines that follow it. An act before he lands from his jump waits for it, and the next act cuts the previous one short. `act`: `'point'` (at `item`'s answer, default the goal: it pulses with a `pop`; a non-goal answer turns green again and its tab gets a ring of hit lines until the next point; the goal pulses ≤ 1.05× about its plate's left edge and sparks at both plate ends), `'wag'` ("no, no", the forearm wagging at the elbow), `'shrug'`, `'nod'` (two nods), `'cheer'` (a jump) or `'proud'` (hands on hips, elbows out, held) |
| `wrongGuess` | none | `{ item, t, formula, result, resultT, strikeT, hit, react }` (or `data.wrongGuess`; one guess). The naive working, played like an item in `item`'s slot before its own turn: the block drops and types, the plate pops into his hands, he throws it (`hit`, default `'kick'`), and the wrong answer crunches out at `resultT` in pencil grey. At `strikeT` (default 0.5 s after it lands) a red bar strikes through it, it turns red, and a red burst goes off (`buzz`). He wags "no, no" (`react: false` skips it) until the item's turn, when the real block lands on the struck guess and crushes it (chips, `thud`). It must start ≥ 0.35 s and after the previous item lands, and land ≥ 0.35 s before its item's `t`; otherwise it is skipped with a console warning |

Data: `items[]` (at most 8) with `t` (default: the previous result + 2.6 s, the first at 0.4), `resultT` (default `t + typeDur + 0.3`), and `noteT`, when the note shows (default 0.24 s after its answer, never earlier: a note the VO says later waits for it). `data.typeDur` (default 0.6 s) is the typing time.

Sound: `type` while a block and plate type, `pop` as the plate reaches his hands, `swipe` on each throw, `hit` + `thud` per crunch, `riser` under a slam's wind-up, `cash` on the goal, `step` as he lands from the celebration, and `pop` for each pointed-at answer. A wrong guess adds `buzz` at the strike and `thud` at the crush.

Example: `specs/01b-becker-rig-20-an-hour.json` uses `wrongGuess` (item 1, `$1,000,000 × 6.2%` crunching to `$62,000`, struck at 6.1 s), `finale: 'shocked'` for the ≈ 1.1% payoff, an item `noteT` held back to the VO line, and `acts` (point at item 0, shrug, point at item 2, proud). `specs/01c-becker-rig-60k-a-year.json` adds a `wag`.

Samples:
- `dead-simple-list.json`: 4 numbers for $100,000 a year, rows layout, 23 s.
- `dead-simple-list-2.json`: 6 numbers for a first paycheck with 2-line labels, lines layout, 31 s.
- `dead-simple-list-3.json`: 6 numbers for a $250,000 house (6.5%, 30 years, 20% down; checked: $1,264.14 a month, $455,089 in all, $54,171 a year at 28%), long unit results, the goal row stacked, the tight lines pass, 28 s.

## 6. find-your-row

One row per kind of viewer, denser than one pass can read (FORMATS.md §2). The viewer's job is to find their own row, so they pause, replay or save.

The table is a set of shelves. Every row has its own ledge (a dotted guide, as in the flagship), and the emphasised column stands on solid ink planks, one width for every row. The shelving's left side is a post (x 22) with a peg at every ledge, plus filler pegs down to the floor. The figure lives on those pegs, in a gutter left of the keys. Under the last row sits the note shelf, when the layout gives it room: the formula as a right-aligned footnote, and the pick labels one at a time, so a label never covers a row.

- **Frame 1**: every row's key (column 1) is already on its ledge, dim, and the empty planks show as grey slots, so each viewer can find their row before the values arrive. Rows with `t ≤ 0` (and `prefill` rows) are already stocked. The formula is up (on the note shelf, under the footer, or in the caption band until the first caption). A pick at `t < 0.15` is already lit, labelled and pointed at. Otherwise the figure stands on the floor, hand on chin, looking up the shelves, with a nod in the first second; his head follows the rows as they land.
- **Fill**: top to bottom, each row's values land on their ledge. A cell only falls "the last few px", never through the row above. The emphasised cell is the heavy one: it pops in (never under 41 px), lands with a squash, and its plank bows under it and springs back. The newest emphasised value is green and settles to ink when the next row lands (the last one after 0.8 s, or in 0.1 s when a pick lights in that frame). The key turns from dim to ink. While a pick is lit, rows land straight in ink, so the picked row stays the only green thing on screen.
- **Pick**: he crouches and leaps up (or hops down) the pegs to the picked row, and points at it with his hand pinned to the row's left end by IK. The row lifts off its ledge (as far as the pitch allows, often 0 in a dense table) and lights in the emphasised column's tone (good green, bad red, goal or neutral ink): a pale band, its ledge and plank in the tone, and its emphasised value 6% bigger (3% in the dense passes). The label pops as a pill with a rim in that tone: on the note shelf, else in the table under the row (above it for the last row), its caret on the value. An in-table pill hides only the value cells its box crosses (never a key), holds at most `pillHold` and closes as the verdict lands. A shelf label holds until the next pick. When he leaves for the next pick the row drops back onto its ledge.
- **Compare** (`lookOpts.compare`): he gets to row `from`'s peg, takes the pencil from behind his head, sets it on row `from` and steps down (or up) the pegs to the picked row, one leg per peg, drawing a bracket beside the keys at the prop stroke (10 px). Row `from` is the reference while the bracket is up: a soft grey band behind it and its ledge in solid ink, so it reads as underlined. The compare's label is an ink-rimmed pill, between the two rows when the gap holds it.
- **Payoff**: the last pick (the last labelled one, or the `verdictRow` pick when that comes later) is the climax. Its emphasised value turns ink on a gold plate, whatever the column's tone (with an ink rim when the pitch allows), with the impact kit: hit lines fanning only into the margin right of the values, a shake, a 2% punch. It is the only impact in the short. On the note shelf its label is 48 px when that fits on one line. The label, the glow and the plate hold through the verdict.
- **Verdict**: the chrome's verdict in the caption band. He nods and keeps pointing at the last pick (`endPose`).
- **Loop** (`loop`, default on): the finished table holds (the cover frame), then in the last 0.7 s it clears back to frame 1. The plate and labels go, the values tip off their planks and fall (pre-stocked rows stay), the keys dim, the verdict fades, and he hops back down to the floor. The last frame is frame 1. Without `spec.duration` the clear is added after the hold; when the duration leaves no room for it, the loop is dropped with a console warning.

Layout (measured at mount; the best score wins):
- Keys are left-aligned; value columns are right-aligned, the last at x 922. Slack goes evenly into the gaps, or more into one gap when that saves a head line.
- Values run 76 px (5-6 rows), 68 (7-9) or 60 down to 40. The other columns are about 0.86 (values) and 0.92 (keys) of the emphasised size, never under 40. Neighbouring rows may share up to 5 px of empty line box, never ink, so 14 rows fit at 40 px under a 2-line hook and a 2-line footer. A short table sits mid-frame with a taller pitch.
- Column heads are 40 px on a 44 px line, bottom-aligned, ≥ 40 px apart: house caps (.07em, then .04em) on at most two lines, else sentence case on up to three. `__x__` is red, `**x**` green, `\n` forces a break, and a column's tone colours its head.
- The notes are scored against the type. The formula (mono 40 px, numbers in ink) is worth 8 px of value type, on the note shelf (`'foot'`, where it shows whenever no label is up) or under the footer (`'top'`). Labels that cover no row are worth 8 px more. When the table cannot spare the formula a line, it shows in the caption band while no caption is up (a gap ≥ 1.4 s before the verdict); otherwise it is dropped with a console warning.
- The figure is 0.72 when the width allows (else 0.62, 0.56, 0.5). In the poses he holds on screen his pencil and limbs stay ≥ 12 px right of the post, and ≥ 26 px inside the frame in any pose.
- When nothing fits at 40 px: a pick grows only 3%, the figure goes to 0.42, then no figure (the table takes the full width), and only then 36 / 34 px values, which the linter warns about.

Data: FORMATS.md §2 exactly. `columns` `[{ label, emph, tone }]` (plain strings work too; 2-4 columns, emphasis defaults to the last); `rows` `[[display, ...]]`; `formula`; `rowsT` (0.4), `rowEvery` (0.25) or `rowT[i]`; `pick` `[{ t, row, label }]`; `hold` (4). A picked (or compared) row lands by 0.2 s before its pick at the latest. Column tone: `bad` = red values and head, `good` = green values. The emphasised column's tone sets its fresh and picked colour. Every number shown is a spec display string.

lookOpts (all optional; `compare` and `verdictRow` mean the same as in the live-sheet and clean-sheet kits, so a port keeps them):

| Key | Default | Effect |
|---|---|---|
| `compare` | none | `[{ pick, from, start }]`: pick number `pick` (its index in `data.pick`) is measured from row `from`. `start` (s) makes it a timed compare: he sets off for row `from` at `start` (the VO word that starts the comparison), row `from` takes its grey frame as he lands, and the bracket fills the time up to the pick, so the plate lands on the pick's word. It must be > 0.8 s before the pick. Without `start` he arrives just in time for a quick draw |
| `beats` | none | `[{ t, act, d }]`: a POSES name or a local pose (`think`, `crouch`, `dip`, `airUp`, `airDown`, `land`, `point`, `stepDown`, `grab`) played over his track from `t` for `d` s (default 1.2, at least 0.5), easing in over 0.2 s and out over 0.25 s. The pinned pointing hand wins while a pick holds. A beat that starts while a pick holds also taps its value (the picked cell pulses 5%, its plank dips 3 px). Beats make no sound |
| `verdictRow` | none | row index: at `verdict.t` that row is picked too (he goes there; no label, no extra sound) |
| `prefill` | `0` | the first N rows are already stocked at frame 1, whatever `rowsT` says |
| `pillHold` | `2` | the longest an in-table label stays up (s, > 0.5). On a shelf shared with the formula, a label gives the shelf back after 3.2 s (or this) when the formula then gets ≥ 1.2 s |
| `labels` | `'auto'` | `'shelf'` (always on the note shelf) or `'table'` (always in the table) |
| `formula` | `'auto'` | `true` (or `'show'`): always shown, on the shelf or under the footer, and the rows give way. `false` (or `'hide'`): never. `'top'` (under the footer) or `'foot'` (on the note shelf) pins it. Only `'auto'` may fall back to the caption band or drop it |
| `plate` | `true` | `false`: no gold plate and no impact on the payoff. A payoff at `t < 0.5` never gets one |
| `loop` | `true` | `false`: no clear at the end (the last frame is the full table) |
| `heads` | `'auto'` | `'upper'` (house caps) or `'sentence'` (as written) |
| `figure` | `true` | `false`: no figure. The table takes the full width; picks still lift and glow, and the bracket draws itself |
| `figureScale` | `0.72` | size of the figure (clamped to 0.4-0.9; the gutter widens with it). Setting it turns off the 0.42 fallback |
| `endPose` | `'point'` | his pose from `verdict.t`: `'point'` (keeps pointing, with a nod), `'celebrate'`, `'shrug'`, `'slump'` or `'think'`. Default `'celebrate'` when there are no picks |

Sound:
- A soft `thud` per row (quieter under a lit pick). A fast fill (rows < 0.3 s apart) is one `roll` over the run plus a `thud` on its last row.
- `swipe` on a big take-off (> 160 px of pegs) and `step` on every landing.
- Compare: `tick` as he takes the pencil and a `swipe` while he draws.
- `pop` per label (the payoff's label comes with its `hit`). An unlabelled pick gets a `tick`, unless it lands on the verdict.
- The payoff: `hit`, then `cash`. There is no `cash` when the emphasised column is a cost (`tone: 'bad'`) or the verdict lands on the payoff.
- The loop: a `swipe`, and a quiet `step` when he hops back down. The verdict's `ding` is skipped when `spec.sfx` already has one at `verdict.t`.

Limits: 3 columns × 14 rows, or 4 columns of values up to about 8 characters. Throws when the table does not fit, or when `data.rows` is empty.

Example: `specs/02a-becker-rig-3-a-day-by-age.json` has 10 age rows (`rowsT: 0`, `rowEvery: 0.5`), a red `bad` "what you think" column against the emphasised real cost, and three picks. It uses a timed `compare` (`{ pick: 2, from: 4, start: 8.4 }`: from the VO's "10 years younger?" at 8.4 s the bracket draws from age 35 to age 25, landing the payoff at 10.7 s), `beats` (a `shrug` at 0.25 s, `shocked` at 6.2 s), `figureScale: 0.82`, and a `ding` in `spec.sfx` at the verdict, so the chrome skips its own.

Samples:
- `find-your-row.json`: the same $3-a-day table, 10 rows, an untimed compare, 13.4 s.
- `find-your-row-2.json`: how much you need invested to never work again, 14 rows at 0.15 s apart (the dense case: one `roll`), a 2-line emphasised head (`\n`), 14.2 s.

## 7. what-difference

One fixed debt handled 2-4 ways (FORMATS.md §3, hook P5): "Guess which one." The debt is a crate, and the crate is the clock.

Every option gets a lane: a floor line, a figure behind the same crate on the start line, the option's name and behaviour (dim until its turn), and its money result on the right under a column head. The lane is a **time axis** shared by every lane, from 0 months at the start line. The crate travels as far as the option takes to pay off, so the longest payoff reaches the far side (a dashed guide in every lane), the winning lane's flag is the nearest (it got to "paid off" first), and the floor from each flag to the far side turns green (the time it saved).

- **Frame 1**: the question. Every lane is named, every crate is on its start line showing "?", the money slots are empty (dashed sockets), and the stake is in the working slot under the footer. Only an option whose `t` (or `resultT`) is given and ≤ 0 is already run: crate at its flag with its payoff on it, money in, coin pile full. The waiting figures stand with a hand on the chin and the other resting on their crate, with a nod in the first second (and, with `pat`, a pat on the crate).
- **A run**:
  1. At the option's `t` the lane wakes: its name turns ink (`step`), and his figure turns green (his turn). He steps back and leans in, both hands on the crate. On a long lead-in (more than 1.3 s from wake to push-off) he strains against it and it trembles but holds, until it gives.
  2. He drives it along the lane, bent low, feet stepping on the floor, hands pinned to the crate by IK (`swipe` on the push-off, a `roll` under the run). Every run moves at one shared speed (`race`), so run time is payoff time too.
  3. The crate's face counts the months up as it goes (grey digits, without the "≈"; a compound payoff such as "11 yrs 5 mo" counts whole years). Every few strides an interest coin flies off its front face, low, onto the lane's pile under the money column. Pile height is that money value, on one honest scale from zero for every lane.
  4. A flag drops in where the debt is gone. The crate slams into its pole (`thud`, a squash, the pole wobbles), turns from red (debt) to green (paid), and its face lands on the payoff's display string.
  5. The money value drops onto its row (`pop`), a third metric's line pops in under it (`tick`), and the delta pops in (`pop`). He recoils and catches his breath, hands on knees, then reacts by tone: bad slumps, neutral shrugs or nods, good and goal give a fist. 1.6 s later he turns back to slate.
- **Colour**: a money value lands green (heroInk) for good and goal, red for bad, ink with a bump for neutral. A green one settles to ink when the next lane lands; a red one stays red. Crate faces are always ink. Figures are slate while they wait or rest, and green only on their own turn, a scan hop, a lever beat, a read of their lane, and for the winner: one figure in focus at a time.
- **Winner** (at `data.winnerT`, default `verdict.t`, else 1.2 s after the last landing):
  - A gold plate opens behind the winner's money value (which turns ink) and hugs its glyphs. The value grows to 1.15× when the plate then keeps ≥ 14 px clear of the lane line above and of the crate and pennant below, else to 1.08×, else not at all.
  - Impact: a mostly vertical shake, a light flash, a 1.8% punch about x 60, `hit` + `cash`, and short rays from the plate's two ends only (the left fan only where the row is clear of the titles). His crate and pennant turn gold. When the verdict claims time (an emphasis with a time unit, "**14 months**"), his time-saved strip thickens and pulses with the plate.
  - He crouches, jumps and lands celebrating (arms up in a wide V when that fits under whatever is above him, else the "yes!" pump, or a punch from the crouch), and keeps a small wave going through the hold. The others slump, and their values, deltas and crate faces settle grey.
  - The chrome's verdict lands in the caption band. Its `ding` is skipped when the verdict is within 0.35 s of the winner's hit.

**Timing: `t` is the wake, `resultT` is the landing.** `option.t` is when the lane WAKES, not when its result lands. Without `resultT` the payoff lands after the 0.42 s lead-in plus the run: at least 0.6 s, up to `race` (1.8 s) for the longest payoff, so up to about 2.2 s after `t`. To land a result on a VO word, give `option.resultT`:
- `resultT` is always honoured. The run keeps the shared speed when the lead-in allows; otherwise it shortens (to 0.35 s at the least), and when even that does not fit he wakes before `t`.
- With `resultT` and no `t`, the lane wakes just in time to land on it at the shared speed.
- `resultT ≤ 0.05` (or `t ≤ 0` with no later `resultT`) means already run at frame 1.
- Then, from the landing: the money value follows after `valueEvery` (option or data, default 0.45 s), the third metric 0.4 s after the value, and the delta at `deltaT` (default 0.55 s after the value, 0.8 s with a third metric).
- Without `resultT`, a run ends 0.8 s before the next lane wakes (0.6 s at the least), so two lanes never push at once.
- Options with neither `t` nor `resultT` are paced by the kit: the first at 1.6 s, each next one 2.2 s after the previous lane's last landing (5.4 s apart when no option has a time), squeezed (gaps down to 0.7 s) so the last lands 0.6 s before the winner beat.

So set `t` on the word that names the option ("Biweekly:") and `resultT` on the word that says its result ("about 65 months").

Layout (measured at mount, every candidate scored; `layout` pins one). Top down: the working slot (1-2 mono lines) under the footer; the heads row (a little red crate + the crate metric's label at the left, the money metric's label right-aligned over its column; caps, else sentence case, else two lines; a third metric's label in grey mono under the money head); then the lanes, bottom-up from the floor line at y 1300, at most 300 px each.
- **row**: the title (name 44/40 px + behaviour mono 40 px, on one line or two) sits over the track, starting over the crate. The money value (72 → 44 px) ends the row at x 922. He passes under the title bent over, so his size comes from the band under it. Long runs.
- **col**: the titles stand in a column at the left (150-330 px wide, wrapping balanced; no word and no delta may break). The track starts right of it and he has the lane's full height, but the run is shorter.
- **Deltas**, in the fitter's order of preference: `own` (in the title, in place of the behaviour), `under` (a 40 px line right-aligned under the money value), `beside` (col only: on the money row, 24 px left of its own value), and as the last resort `pop` (each pops over its title for 2.4 s, and again for a `reads` of it). All but `pop` stay to the last frame.
- The crate is as tall as the lane allows. Its face is one line ("72", "≈ 65", "11 yrs 5 mo"), or the number over its unit when every payoff is one number and a unit word and the crate is tall enough, at 41-56 px.
- The score puts the money value first (60 px and up), then figure size (0.36 and up, 0.3 at the least), run length (180 px and up, 120 at the least), the crate face, and the winner's growth on its plate. It pays for every give-way: behaviours dropped (the working lines carry them), two-line titles, 40 px names, deltas without a place of their own, the third metric left out, no coin pile.

Data: FORMATS.md §3 exactly. `stake { label, value, terms }`; `metrics [{ key, label }]` (the first time-like one is the crate's, the first money one the money column's and the coin pile's, a third one the grey line under the money value; a fourth is left out with a warning); `options [{ t, name, detail, values, delta, tone }]` (2-4); `winner`; `winnerT`; `hold` (3). Also read: `option.resultT`, `option.valueEvery` / `data.valueEvery`, `option.deltaT`, and `option.note` / `option.noteT` (a working line shown at `noteT`, default when the money value lands). Nothing on screen is computed. Months are read out of the payoff strings only to place the crates ("≈ 4.8 years" = 57.6; "11 yrs 5 mo" = 137; a bare "72" takes its unit from the metric label, else months). The parser is local, because lib's `num("60 months")` reads the "m" of "months" as millions.

lookOpts (all optional; the live-sheet teaser's keys carry over as they are):

| Key | Default | Effect |
|---|---|---|
| `formulas` | none | `[string \| { t, text }]`: a working line per option (by index), shown in the slot from that option's wake (a pre-run option's from its first `reads` time, else 2 s). `\n` breaks; numbers print in ink, `**x**` green, "−" in Inter. One slot line at a time, each held until the next; a line too long for two lines steps down to 38, then 36 px |
| `steps` | none | `[{ t, text }]`: extra working lines (the difference the VO speaks) |
| `lever` | none | `{ t, text, options: [i, j], beats: [t] }`: the line that explains WHY, shown in the slot at `t`. The listed lanes' money values get a pale green band and bump, their crates pulse, and their figures turn green and nod (`swipe`), until the next slot line (3.6 s at most, or 0.9 s past the last beat). `beats`: later words that drive it home; the lanes bump and nod again (`swipe`) |
| `reads` | none | `[{ t, option, metric }]`: the VO reads a result already on screen. That value bumps 12% and flashes in its own colour, and the lane's figure turns green for a moment (`tick`). `metric` is the money metric's key, the crate's (also the default), the third metric's, or `'delta'`. `option` may be a list (`[1, 2]`: together) |
| `scan` | none | `{ t, every = 0.4, options }`: "guess which one". From `t` the waiting lanes' figures hop in turn (green for the hop), their "?" popping (`tick`) |
| `pat` | none | `{ t, every = 0.08, options }`: "this loan". The waiting figures pat their crates in turn (the resting hand lifts and drops back, the crate swells a little, a soft `tick`), never over a scan hop |
| `gapLabel` | none | `string \| { t, text }`: the winner's time saved, a display string ("≈ 12 mo"). At `t` (default 0.45 s after the winner beat; `pop`) his pennant unfurls into a banner that carries it, over his time-saved strip. Left out with a console warning when there is no room between his flag and the coin pile, under his plate |
| `countCell` | none | `{ option, metric, from: 'base' \| number }` (or a list): that lane's money value counts from the first option's value (`'base'`) or `from` up to its display over 0.8 s as it lands, then settles from 110%. The crate's metric always counts |
| `stakeLine` | auto | `false` (none) or a string: the slot's frame-1 line. The default is "label · value · terms", leaving out whatever the hook or footer already says. When it would wrap while every other slot line fits on one, it drops the label, then keeps only the value |
| `heads` | caps, else sentence case | `'upper'`, `'sentence'`, or `false` (no heads row, which also leaves out a third metric). By default sentence case is used when caps collide |
| `layout` | best score | `'row'` or `'col'` |
| `pile` | `true` | `false`: no coin piles and no flying coins |
| `race` | `1.8` | seconds the longest run takes (> 0.4). Every run moves at that one speed; each run ≥ 0.6 s |
| `figure` | `true` | `false`: no figures (the crates slide by themselves) |
| `figureScale` | lane | caps the figure's size (it is already capped by the lane) |
| `endPose` | biggest that fits | the winner's pose after his jump: `'celebrate'` (the V), `'pump'` or `'point'` |

Sound, per lane: `step` on the wake, `swipe` on the push-off, `roll` under the run, `thud` at the pole, `pop` for the money value, `tick` for a third metric, and `pop` for the delta. Then `tick` per read, scan hop and pat, `swipe` per lever beat, `pop` for the gap label, and `hit` + `cash` for the winner. A pre-run lane is silent.

Limits: 2-4 options (a 5th and later are dropped) and at most 3 metrics. A third metric is left out (console warning) when the lanes have no room for it, for example 4 lanes with long payoff strings. When no candidate layout fits, it falls back to the smallest row layout and the linter says why.

Example: `specs/03a-becker-rig-car-loan-weekly.json` (monthly vs biweekly vs weekly vs rounding up to $200, on a $44,000 car loan). Monthly has `t: 0` and no `resultT`, so it is already run at frame 1. Biweekly wakes at `t: 8.0` on "Biweekly:" and lands at `resultT: 9.0` on "about 65 months"; weekly is the same at 13.0 / 14.0. "Round up" wakes at `t: 23.0` but lands at `resultT: 27.2` on "About 60 months": the long lead-in becomes the strain. It also uses `pat` (1.4 s) and `scan` (2.4 s) for the hook, a `formulas` line per option, `steps`, a `lever` on lanes 1 and 2 with a second beat at 19.6 s, five `reads`, `countCell` on the winner's interest from the base, and `gapLabel: "≈ 12 mo"`. The winner is crowned at `verdict.t` (31.0 s).

Samples:
- `what-difference.json`: rounding up a $28,000 car loan, 3 lanes, all with `t` and `resultT`, `race: 1.5`, a `scan` at 0.25 s, about 19 s.
- `what-difference-2.json`: flat payments vs the minimum on a $6,000 card, 4 lanes with deltas, a `lever` and a `countCell`, about 19 s.
- `what-difference-3.json`: $50 more a month on a card, 3 lanes (the first already run at frame 1, the other two with no times, paced by the kit), compound payoffs ("11 yrs 5 mo") and a third metric (total paid), about 13 s.

## 8. chart-race

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
- **Finale**: the tips stop on the spec's final display strings and a summit ledge pops under each one, and the axis pulls back a little. The winner crouches, jumps (`swipe`) and lands as his number hits a gold plate (impact kit, `cash`), then celebrates arms up. The others slump and `sit` on their ledges (close finishers step back: a podium).
- **Opening mid-way** (`raceT[0] < 0`): the roll-out is fast enough that at frame 1 every trailing figure already stands on his own line, never left of its start.
- **Colours**: the series that finishes highest is the hero (green), and the others are slate, then ink, in series order.
- **Names**: 40 px, 2 lines plus an ellipsis at most, cut at a word boundary ("Vanguard Total World Stock…"), with no break inside parentheses.
- **Plot width**: the tip counters use 56 px values (52 at most-narrow), so the plot reaches as far right as the tag column allows (the column must stay at x ≤ 940; a 58 px gap keeps his forward hand clear of the tags).
- **Frame 1**: every value-axis label is fully in or fully out (no half-faded ghost on the thumbnail).

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: tip dots and counters only |
| `figureScale` | 0.76 (2 series) / 0.56 (3) | figure size |
| `fill` | `true` | `false`: no pale hill under the hero line. `'gap'`: fill only between the hero line and the lowest other line (the green area is the gap, not money nobody gained) |
| `figures` | winner = hero | `[{ series, color: 'hero' \| 'neutral' \| 'ink', lag, outline }]`. `lag`: px he walks behind his tip when he has to step back (0-260; default about 130 with 2 series). `outline`: px of a thin halo (2-12; off by default), for a walker on a flat line who trails in front of another line |
| `beats` | none | `[{ t, act, series, label, to, d, pulse, chip }]`: scripted reactions. `act` = `cheer`, `shrug`, `impact`, `grow`, `peek`, `pump` (a fist pump), `flood`, `pointBack` (points back up over his shoulder, at the lens) or any POSES name. `label` is a note under that figure's counter (or on the tide, for flood); `chip: true` sets it as an outlined ink chip, up to 44 px (a goal that must read at phone size). `pulse: true`: that figure's counter pops (a scale bump, ink) as the beat lands. `flood` is a red "prices" tide rising from the stake to value `to`. An `impact` beat near an event on the same figure replaces that event's automatic hit. Beats add no sound of their own (cue them in `spec.sfx`) |
| `hitStop` | none | `{ x, until, rejoin }`: the race clock freezes when the race reaches data `x`, holds to real `t` `until` (counters, year and treadmill stand still), then runs faster and rejoins the linear clock at `rejoin` (C1, no jump in speed). Every beat after `rejoin` keeps the spec's linear `raceT` clock. Ignored unless the freeze comes before `until` and `until` before `rejoin` |
| `lens` | none | `{ t, rows: [{ t, series, from, to, label, display }] }` (up to 3 rows): the payoff card, after the race (default `t`: 1.5 s after it ends). Gains too small for the final axis (a year of interest) are drawn to scale in a card over the top-left of the finished plot: the bar is `valueAt(to) − valueAt(from)` of that series (default: the race's x range), and the value is the display string. Labels 44 px, values 64 px (72 for the largest gain), 36 px bars on one scale over dashed tracks the length of the largest bar. Rows wait dim until their `t`, then the bar grows and the value pops; the largest lands with a punch and a shake, without a cue. While the card is up the stake legend and year fade, the winner's plate dims, and gridlines and crash bands fade. When the card does not fit left of the winner's reach and above every line, the finished chart pulls back until it does |

Example: `specs/04b-becker-rig-savings-vs-sp500.json` uses `fill: 'gap'`, a `hitStop` (`{ x: 2010.99, until: 2.95, rejoin: 6.6 }`: the race freezes as year 1 closes, while he cheers over "year 1: ≈ +$151"), `figures` (the savings walker with `lag: 170` and `outline: 6`), `beats` with `pulse`, `chip`, `pump` and `pointBack`, and a two-row `lens` that draws year-1 S&P gains against 16 years of savings gains. (Its `stage` and `gag` keys belong to other kits; becker-rig ignores them.)

Samples:
- `chart-race.json`: $10,000 in the S&P 500 vs gold, 2010-2025, 3 events, 38 s.
- `chart-race-2.json`: $5,000 in the Nasdaq-100 vs the S&P 500 vs gold from 2000, with long names, 54 s.

## 9. split-sheet

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
- **carve** (`layout: 'carve'`, opt-in, never picked automatically; built for 6-7 parts with long labels): the rows sheet on the full width (amounts end at x 920, the post right of them), with the figure working **on** the slab as in bins.
  - He saws through at each cut, and the piece drops straight down onto its own row's lane, a pale track with a hairline edge. Once landed it slides to the lane's left end, so the lanes end as a left-aligned bar chart of the total. The remainder shrinks under his feet.
  - The last piece is the one he stands on: it drops out from under him, he rides it down arms up, lands on the bare bracket (squash) and steps along it to the post. The sum check then assembles silently in ~0.6 s, stopping short of him (no fly-ups).
  - The slab hangs as high as his head allows; his head may rise into the footer's band wherever the footer has no text over the stretch he walks.
  - The fitter scores lane thickness most (14 → 22 px: thin bars read as underlines), then amount size (56 → 40), figure size (0.86 → 0.62), the slab's height and one-line labels. It falls back to rows (console warning) when nothing fits.
- **Bins details**: amounts are capped at 85% of a bin's width, the fill targets are a solid line over a pale tint, tenth bricks carry their value ("$300"), and the slab is scored at every brick seam.
- **Percent tags** (bins): every bin's tag sits on one line, the bins' mid-height.
- **The sum check**: in rows mode the copies of the amounts swing out right of the value column (as small void-backed chips) and then up into the check, so they never pass over another row's amount.

Percentages on the slab: every piece at least 60 px wide carries its own, all at one size (40 → 34 px to fit). Narrower pieces carry none, so a piece is never labelled while a wider neighbour is not. Under 40 px they repeat the percentages printed on the sheet, so they are marked as decoration for the linter.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `tenth` | none | `{ t, formula, display, count }`: cut the total into `count` equal bricks first (a `÷ 10` cleaver slams down at `t`, and the slab cracks into bricks showing `display`). Ignored unless every share × count is whole |
| `actions` | none | `[{ t, tool }]`: the first entry without `part` labels the cleaver. A part's entry `{ part, tool, after }` relabels the cleaver for that part's cut (`'4 × $300'`; it no longer keeps `÷ 10` after the chop), and `after` is a label shown after that part lands, until the next raise (`'÷ 30'`) |
| `envelopes` | part labels | bin names |
| `gag` | none | `{ t, text }`: a closing working line (default `t`: 3 s after the sum check, or after the last piece when there is no check) |
| `layout` | auto | `'bins'`, `'rows'` or `'carve'` (opt-in only; see above) |
| `payoff` | none | `{ t, text, label }`. Bins: the header's answer as a closing gold slab (label in caps on its left, the display string at hero size on its right), stamped into the air above the sum check at `t` (`whoosh`, then impact, `hit` + `cash`) while he celebrates; skipped (console warning) when that air is too short. Carve: the bookend of the frame-1 slab at its height and type size ("PROFIT ≈ $1.29" for "YOUR ORDER $10.00"), stamped over the check's box; with `t` on the goal part's landing it carries that impact and the goal row's plate just lands (`thud`) |
| `payoff.slot` | none | `{ t, text, ghost = '$?', ghostTone, strikeT }`: the header's answer slot, a dashed gold box hung after the header's last line (a dotted leader from its colon), on screen from frame 1 with the ghost text. At `t` the text stamps in on a gold plate (`whoosh`, `hit` + `cash`) and stays; it bumps again when the payoff slab re-slams. `ghostTone: 'bad'`: the ghost is a wrong guess (red text, red dashed box). `strikeT`: a red line slams through the ghost (`swipe`) and it greys out until `t`; the slot may then sit lower and go down to 48 px. Works in carve too |
| `needs` | none | `{ t, parts: [i, j], text }`: a bracket over those bins' amounts, its label on the working-line row ("NEEDS 50% = 5 bricks"), drawn at `t` (`pop`) and kept. The part notes then move into the air above the bins |
| `activate` | none | `[t, ...]` (rows / carve): when the VO names each part. Its label turns from dim to ink and its % green (until the next part activates) with a bump; in carve his saw starts there. Without it, labels are ink from frame 1 |
| `maskPct` | none | `[i, ...]` (rows / carve): those parts' % read "?" until they activate (else until they drop), and their pieces never carry a % on the slab |
| `bumps` | none | `[{ t, at }]`: a 0.3 s swell with a `tick` as the VO says a figure. `at`: `'total'` (the slab's total while it is on the slab, else the header's emphasised figure), `'guess'` (the answer slot) or a part index |
| `remainder` | none | `{ t, text }` (carve): from `t` (after the first piece) what is left of the slab carries a label in the slot's ghost style (the wrong guess, "$7.04?"). It swells with the `'guess'` bump, is struck with the slot at `payoff.slot.strikeT`, and greys and fades 0.6 s later |
| `beats` | none | `[{ t, act, d = 1.2, hold }]`: a POSES name or a local pose (`lookDown`, `pointDown`, `recoil`, `shrugLow`, ...) held `d` s, then back to standing (`hold: true` keeps it to the end); or `'stomp'` (crouch, knee up, a foot slammed down: a small impact at his feet, `thud`). Automatic reactions inside the window give way; saw, hop and drop keys stay. On the slab under the footer use acts that keep his hands low |
| `notes` | `true` | `false`: no part notes on the working line (its height goes to the sheet) |
| `headerSpacing` | `true` | `false`: keep the kit's header tracking (by default the header gets 0.2em word spacing and −0.01em letter spacing) |
| `headroom` | `14` | carve: px kept between his head and the header or footer text above the slab |
| `figure` | `true` | `false`: the pieces just drop on their beats |
| `figureScale` | 0.92 (bins) / 0.86 (rows) | figure size (bins tries 0.92 → 0.86 → 0.8, carve 0.86 → 0.62, to fit) |

Kit cues that `spec.sfx` already places (same kind within 0.15 s) are not doubled.

Examples: `specs/05a-becker-rig-chipotle-10.json` is the carve case (7 parts of a $10 order). It uses `layout: 'carve'`, `activate` per part, `maskPct: [6]`, `bumps`, the `remainder` ghost "$7.04?", and a `payoff` with a `slot` (`ghostTone: 'bad'`, `strikeT: 5.2`), plus a `stomp` beat. `specs/05b-becker-rig-3000-paycheck.json` is bins with `tenth` ($3,000 ÷ 10), per-part `actions` with `tool` and `after`, `envelopes`, `needs`, and a `payoff.slot`. (Their `stage` and `inputProp` keys belong to other kits.)

Samples:
- `split-sheet.json`: 70/20/10 on $3,500, bins, 17 s.
- `split-sheet-2.json`: a 6-bucket $5,000 budget, rows, 17 s.

## 10. pov-race

"POV: you invested in X instead of paying $Y for X's product" (FORMATS.md §6). Two piles share one dollar scale, and the figure stands between them, making the choice over and over.

- **Left (SPENT)**: a ghost column (pale red, dashed outline) as tall as the cumulative spend. Its red counter lands on `spend.final`. Below 60 px the column becomes a 60 px slab labelled with the counter's own running number (the same string, frame for frame; `spend.final` only once the counter lands on it). The label sits inside the slab, or on top of it like a tag when the junk heap would touch it. The dotted red "paid" line keeps the true height.
- **Right (OWN)**: a tower of gold coins as tall as the same money in the stock. Coins drop onto it with a squash. When the stock falls, coins tumble off the top (wobble, red hit lines). Its counter is green, turns red while under the paid line, and lands on `own.final` on a gold plate.
- **Each purchase** (one cycle per rise of the spend line and per `data.purchases` entry, at least 0.95 s apart; the first gets 1.9 s):
  - A coin squashes into the item, a gold copy arcs onto the tower, and a purchase entry pops a price tag beside his head and fills its dot on the timeline. The first coin is a big one with the price on it, held out at frame 1; on that first purchase a red ghost copy also drifts onto the spent column, and both piles appear then.
  - He uses the item, it cracks and greys, and he flings it onto a junk heap next to the spent column.
  - A single purchase (one phone) lives long: he holds it, it cracks twice, and he watches the tower. With one or two items, the heap stays big on screen.
- **Reactions**: he hops in shock at crashes (a run of falling points is one crash) and when the tower drops below the paid line. He ends by celebrating and pointing up at the tower (≥ 2.5×), shrugging (1-2.5×) or slumping (a loss).
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
| `multiple` | none | `{ x, t, k, label, hold = 1.4, pause }`: a "k × what you spent" mark. When the race reaches `x` (or at `t`), a green dotted line at `k` times the spent column's height runs across to the tower, its label ("2×") at its left end, for `hold` s. The race clock pauses at `x` for `hold` (`pause: false` keeps it running): the year, both counters and both piles hold the exact figures at `x`, and the rest of the race is re-timed so `x.to` still lands at `raceT[1]`. A purchase at `x` waits for the end of the pause |
| `land` | `0` | s: each point of the spend line holds its exact year-end figures (year label and both counters) this long after the race reaches it, so table values can be read (the piles keep moving) |
| `chip` | none | `{ x, t, text, hold = 1.4 }`: a tag (display string, "+$1,460") pops on top of the spent column when the race reaches `x` (or at `t`) and rides its top |
| `spentLeft` | none | `'$0 left'` or `{ text, t }`: at the verdict (or `t`) the spent column empties to its dashed outline and this string (number big, trailing words small) pops inside it in red |
| `endMark` | none | `{ label, t }`: at the verdict (or `t`) a green dotted line at the tower's final top runs from over the spent column across to the tower, its label ("≈ 1.4×") under its left end |
| `rail` | ticks and dots | `'plain'`: the timeline is only a progress line, with the final year at its right end |
| `tagLife` | `1.8` | s a purchase tag stays up (0.5-1.8; it also closes before the next purchase) |

Example: `specs/06c-becker-rig-latte-starbucks.json` uses `prop: 'cup'`, `jarLabel: 'SBUX'`, `endPose: 'shrug'`, a `multiple` at 2021.99 (`k: 2`, "2×"), `land: 0.12`, a `chip` ("+$1,460"), `spentLeft`, `endMark` ("≈ 1.4×"), `rail: 'plain'` and `tagLife: 0.8`.

Samples:
- `pov-race.json`: Netflix at $7.99 a month, 8 price steps, 28 s.
- `pov-race-2.json`: Apple instead of the first iPhone at $499 (a single purchase), 27 s.

## 11. ledger-duel

Same stake, two choices side by side (FORMATS.md §7).

**The stacks.** On the left, two coin stacks stand on the floor, each with its owner on top (green = the winner-to-be, slate = the other). Stack height is the money, on one linear scale shared by both, and a stack is always whole coins (one thinner than a coin is one thin coin). The stacks are 76 px wide with centres 130 px apart (x 84 and 214), so the figures never tangle. The left figure stays ≥ 40 px inside the frame, and the ledger starts 24 px right of the right-hand stack (x 280). When no column head hangs over the rig, the tallest stack may rise to just under the footer. The figures carry no pencil here (`pencil: true` brings it back): nothing in this format draws with it, and at phone size it reads as an arrow through the head.

**The ledger.** On the right is a right-aligned ledger (label | A | B) that builds bottom-up from the floor, like the flagship's ladder:
- Every label is dim from frame 1.
- The stake row is already settled at t = 0, so frame 1 shows a number.
- Each row's two values drop onto their dotted shelf together (`thud`, unless the row crashes).

**Row kinds:**
- **gain**: the stack springs up under its owner (he rides it, arms up), and the value lands green and goes straight to ink when the next row lands. With `minGain`, a gain too small to move the stack is quiet: it lands in ink and he does not ride it.
- **dip** (a small loss): the stack sinks, he bends with it, and the value lands red.
- **crash** (a loss of 12% or more, or any loss on a `bad` row): an impact on the stack (red hit lines, a mostly vertical shake, `hit`). The lost coins burst off the top and come to rest beside his own stack, inside the frame (`tick` as the first one lands); they lie there ~1.25 s and go. He is blown up off the stack and lands squashed on what is left, then slumps; the other one flinches and turns to look. When both crash in the same row, each leans away from the other, inner arm down and outer arm flailing up. Row 0 is the start, never a crash.

**Other beats:**
- **Lead change**: the new leader pumps a fist (`pop`).
- **Event text**: pops as a pill (`pop`) in the slot above its row, its caret pointing down at the cell(s) that moved. While it is up, the label of the slot it sits in fades out completely. It holds at most `pillHold` (1.6 s) and is gone before the next row. A loss row's label keeps its red; a good row's label is green while its pill is up, then ink.
- **Final**: the winner's last value lands at 1.3× on a gold plate that opens from its centre (impact, camera punch, a short fan of rays above the plate, `hit` + `cash`). The winner hops (up to 52 px, keeping his raised hands ≥ 24 px under the text line above the rig; with under 12 px of room, no hop; `step` on landing), celebrates on the taller stack, then points at the ledger. The loser slumps (the right-hand one turns his back on the ledger) and his column settles grey. Half a second later the rows in between settle to 55%; the first row, the last row and any row a pencil mark rings stay full. The plate, the ringed cells and the verdict carry the end frame.
- **"Less is better" duels** (debt: the winner ends lower): red debt piles, and paying down is green; nothing crashes.

**Column heads.** Each head is "● Name" with the plan under it in grey, right-aligned over its column; every name appears once. A's head may reach left over the label column, and the split between the two heads may move left over A's values (up to 3/4 of their width) so B's plan gets room. A name is never dropped: 48 → 40 px, then without its dot (the name keeps its colour), then on two lines. A plan is never cut: it wraps (40 px, down to 34 only if needed), and `\n` in a plan forces a break. Heads stay over the ledger unless reaching left over the rig saves a line.

**Layout fitter.** Everything is measured at mount: values run 64 → 40 px, labels about 0.8 of that, rows 1.15 em apart (12 rows fit at 40 px). The ledger's right edge is x 934, so it stays clear of the button rail even under the climax's camera punch. When the rows do not fit, the fitter scores these alternatives and keeps the best:
- a smaller climax (1.2×, 1.12×, 1.06×);
- a tighter rig (stack centres 112, then 96 px apart), before any value drops under 40 px;
- drop the stake line;
- drop the headroom for a last-row event (its pill then covers the column heads, which dim, for 2.4 s);
- plans on 3 lines, or at 38 → 34 px;
- a full-width legend instead ("● Name  plan", each wrapping to 2 lines, never cut) with plain column heads (names only, no dots);
- as a last resort, 36-38 px values, which the linter warns about.

A figure is shifted in whenever his drawn extent would come within 40 px of the frame edge, and never reaches over the ledger's labels.

lookOpts:

| Key | Default | Effect |
|---|---|---|
| `figure` | `true` | `false`: no figures (the stacks still grow and get knocked down) |
| `figureScale` | `0.8` | figure size |
| `figures` | winner hero, other neutral | `[{ person, color: 'hero' \| 'neutral' \| 'ink' }]` |
| `rowLabelsAtStart` | `true` | `false`: rows appear as they land |
| `stake` | `true` | `false`: no stake line under the footer |
| `keyLabel` | none | a head over the label column (e.g. `'Year'`) |
| `pencil` | `false` | `true`: the pencil behind each figure's head |
| `pillHold` | `1.6` | the longest an event or cash-out pill stays up (s, > 0.3) |
| `beats` | none | `[{ t, act, person, targets, d }]`: a POSES name (or `cheer`, `peek`) for `person`, held `d` = 1.4 s, or `'impact'` on `targets` (skipped where a crash already hits), or `'sell'` (below). A scripted beat within −0.6 / +1.6 s of the verdict replaces that person's default verdict acting. A `'point'` beat while one of the pointer's own cells is ringed aims his arm at that cell. A beat whose hold runs into the same person's sell skips its return pose |
| `beats`: `sell` | none | `{ t, act: 'sell', person, label }`: he cashes out with a chop on his stack (`thud`), which turns into a cash brick (84 px wide, as tall as the money, a "$" on its band; it no longer grows) and sweeps his lost coins off the floor. `label` pops (`pop`) as a pill right-aligned over his column in the slot above the latest row, caret on his cell |
| `marks` | none | `[{ t, row, person, tone }]`: a pencil ring is drawn round one landed cell at `t` (`swipe`; the cell pops about its centre, never into its ring). It holds until the next row, sell or later mark, or for good on the last row. The ring is red round a loss, else ink; `tone: 'bad' \| 'good'` makes it red or green and tints its cell the same while it is up (the VO's "bad number"). The loop starts upper-left, or at the top when that would come within 9 px of the ink on its left. Each side keeps ≥ 8 px from the cell's own ink (with room for a 2% pop) and as much from the neighbour's as the room allows |
| `winnerT` | last row | s: crown the winner later than the last row, on the VO line that names his value. The last row then lands like any other (the winner's value at 1×, green, `thud`); at `winnerT` the plate opens (0.07 s before) and his value grows onto it (impact, punch, rays, `cash`). The end acting, the loser's greying and the 55% settle all follow the crown, and a ring on the winner's last cell closes as the plate grows. He rides his last row plain: his celebration waits for the crown. Ignored unless it is after the last row |
| `ponder` | the hero figure | `0` or `1`: who ponders the ledger on frame 1, hand on chin (e.g. the viewer's stand-in when the winner is the hero); the other stands ready |
| `minGain` | `0` | coins: a gain that adds less than this much of a coin to its stack (on the shared scale) is quiet. Its value lands in ink, not green, and its owner does not ride it. E.g. 0.5 for cents against hundreds of dollars |

Porting from another look: `marks` (with `tone`), `winnerT` and `rowLabelsAtStart` carry over as written. A beat at `t ≤ 0` is not needed for the hook frame, since the ponder figure is already thinking at frame 1.

Example: `specs/07c-becker-rig-savings-rate.json` ("You" at a big bank's 0.01% vs "Leo" at 4.00% high-yield, $100 a month each; the plans break with `\n`). Leo is the hero and the winner, and `ponder: 0` puts You, the viewer's stand-in, on frame 1's chin. `minGain: 0.5` keeps his cent-sized gains quiet, and `winnerT: 12.9` crowns the winner after the last row. It has four `marks` with `tone` (`'bad'` on his cells, `'good'` on the winner's) and `beats` (shrug, a `point` that aims at the ringed cell, `lookUp`, slump, `peek`). `specs/07b-becker-rig-panic-sell-2008.json` shows `sell` ("sold → cash at 0%") and untoned `marks` on both cells of a row.

Samples:
- `ledger-duel.json`: $10,000 in 2000, S&P vs savings, with a 2008 crash, 15 s.
- `ledger-duel-2.json`: $100,000 at 35 with 0.05% vs 1% fees, 11 rows, the legend layout, 13 s.

## 12. unit-ladder

A price ladder in a unit you know (FORMATS.md §8): cost ÷ unit price, repeated from cheap to huge. The division is a verb the figure performs, and every answer is a pile you can see next to the ones before it.

- **Frame 1**:
  - If the first rung starts late, he holds up one unit and the HUD reads `1 hot dog = $1.50` with the counter at 1.
  - Otherwise the first price coin is already standing in front of him.
  - A first rung cut before frame 1 (`t < 0`) is pre-filled: punched, piled and counted before t = 0, so frame 1 shows its pile, its count and the "≈" working, with him pointing at it (no sound or shake from it). The camera frames him and the pile as one group, then pans back to his usual spot as the next cut pushes in.
- **Per rung**:
  1. The HUD swaps to the item and "cost ÷ price =" (the HUD and the counter swap together), and the counter becomes `?`.
  2. A gold coin (the price) drops in front of him. He punches it (a karate chop for small coins), and it bursts into units.
  3. The units arc over to the end of a row of piles and stack into a brick pyramid. The counter rolls with every unit that lands.
  4. The count lands exactly on `unitsDisplay`, and its `=` turns into `≈` when the result is rounded.
- **Camera**: it pulls back until the whole row of piles is in frame. He stays at the far left, never under about 96 px on screen, with his line weight kept constant on screen.
- **Piles**: one path filled with a brick pattern of the unit icon, so a pile of 266,667 is exactly 266,667 icons in one DOM node. Up close every brick is one unit. Further out the pile switches level of detail: level k draws the same brick pattern 2^k times bigger, so every pile always reads as a heap of hot dogs or clocks (each icon ≥ ~19 px on screen, never a flat grey shape); a level cross-fades into the next over a fifth of a level. One level out the pile gets a pale base under its icons and an ink outline, and once its rows are under 9 px on screen its outline is the smooth pyramid, not a stair-step.
- **Finale**: the last count lands on a gold plate with the impact kit, and he jumps, then slumps.
- **Cuts**: when the camera pushes back in for a new rung, each earlier pile fades out as it leaves the frame and back in as the pull-back brings it home, so no pile is ever drawn cut flat. A fractional last unit is drawn cut to size. While a count rolls, its digits are right-aligned in the final number's slot, so nothing slides when it lands.
- **Recap table**: once the last pile lands, the camera steps back a little and a recap table pops in under the counter: **one row per rung**, biggest first (a leaderboard), the "≈" in its own left-aligned slot (glued to its count only when its slot would cost a name its line), the count right-aligned in its column (ink, 40 px) and the pile's name after it (grey, 40 px). A count never appears without its name and no rung is dropped.
  - A long name wraps to a second line (balanced, never starting with "of"); only when even that does not fit is it cut at a word with an ellipsis.
  - The table takes one column when it fits above the piles (at the margin, or beside the figure at x 200 so it may reach lower), else two (row by row or column by column, whichever keeps the names whole).
  - The step back (1 → 0.4) is the gentlest that clears every pile and the figure.
  - Thin leaders run from the rows' ends to their piles' apexes only when every row gets a clean one (crossing no other row, leader, pile or the figure): a lone leader reads as a stray stroke.

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
| `blank` | none | `{ t, d = 1.6, text, calendar }`: fills the hook's blank. The header's `___` ticks up through the ordinals (1st, 2nd, ... in grey, on a rule sized for the answer, `roll`) from `t` and lands at `t + d` on `text`, a display string printed exactly, in hero green (`ding`), while the figure points up at it. Ignored when the header has no `___`. `calendar: N` (days) draws a month grid beside the counter whose days fill in step with the ordinals and stays while that rung's pile is on |
| `morph` | none | `{ t, working, display, label, approx = true }`: at `t` (usually `verdict.t`) the HUD's last answer turns into the takeaway (`pop`). The working line becomes `working` + "≈", the gold plate shrinks round `display`, and the label beside it becomes `label` (wrapping to two balanced lines when it will not sit beside the plate) |
| `morph.ask` | none | s: the takeaway is asked first, like a rung's cut (`whoosh`). At `ask` the item line becomes `morph.item` (if given), the working reads "`working` =", the counter shows "?", and he thinks. At `t` the answer pops in on the hit (impact, flash, punch) at up to 1.2× the counts' size on a fresh plate (the biggest number in the video), and the "=" turns into "≈". `morph.compare: [i, j]`: from the ask the other rungs' piles and recap rows dim, and (unless `beside: false`) the smaller compared pile hops over the piles between them to stand beside the bigger one (squash, thud), the others shuffling along |
| `hop` | on with `morph.ask`, else off | a jump is a real hop: a crouch, take-off on the beat, an arc (56 px on the last count, 70 on the asked takeaway), a squash on touchdown, then "whoa" until the slump. `false`: the `'shocked'` pose held in mid-air |
| `landAfter` | kit pacing | s: every rung's count lands this long after its cut (≥ 0.9; coin drop, punch and fill keep their proportions). The kit's pacing is about 2.2 s on a 4 s gap |
| `beats` | none | `[{ t, act, d }]`: a POSES name (`'cheer'` = celebrate) at `t`, back to idle after `d` s (default 1.2; `d: null` holds it) |

Examples: `specs/08b-becker-rig-hours-at-15.json` uses `blank` (the hook's `___` lands on "≈ 20th" with a 30-day `calendar`), `pileLabels: false` and a plain `morph` into "14 years of full-time work". `specs/08c-becker-rig-college-in-big-macs.json` uses `landAfter: 1.7` and an asked `morph` (`ask: 15.85`, `item`, `compare: [0, 3]`), so `hop` is on.

Samples:
- `unit-ladder.json`: Costco hot dogs, 5 rungs from Netflix to a house, 24 s.
- `unit-ladder-2.json`: hours of work at $20, 7 rungs, 27 s.

## 13. cost-counter

A dollar counter ticks at a fixed real rate (FORMATS.md §10). This is the overheating counter, Alan Becker's "Clicks Per Second" idea.

- **The board**: a flat white readout board with a 10 px ink border, held up by one ink post at its left end (he leans on it in calm stretches). It carries:
  - the label, with a live dot that blinks once a real second;
  - the counter in big ink digits, the kit's hero-number face (Inter Tight 900, tabular figures, so it never jitters; `≈` tucked in at 0.8 em);
  - a strip showing the rate.

  The board is as tall as the strip's current state: a 2-line milestone flash grows it, the 1-line rate shrinks it back (a 0.12 s snap), and the NEXT ticker rides under its bottom edge.

  The counter runs linearly over `counterT` from `startValue` and locks on `final`. Milestone values are never computed: only their display strings are shown.
- **NEXT**: a ticker under the board previews the milestone being chased (just the amount when the label will not fit one line), and that object's dashed ghost waits on the floor, so frame 1 already has a target. The ticker ducks out while an object drops past it.
- **A pass**:
  - The board kicks, the rim flashes, and the strip rolls to "✓ label: amount" (the amount in heroInk).
  - The milestone's object (house, car, coin, a wad of bills, ...) drops from under the board onto its ghost with a squash, dust lines and a shake.
  - Objects heap up right to left, each bigger than the last.
  - The figure escalates: flinch and point, a shocked jump, then a duck and a step back.
- **Heat**: hold, then snap. The digits, the live dot and the rim stay ink until the first pass, then snap to red in 0.15 s (blended in OKLCH, so never through maroon mud; a cost is a loss). Each further pass heats the board a notch in 0.15 s: the rim thickens as a solid ring, then vibration and steam. There is no glow and no orange: it stays a flat prop. An object only shows once a third of it has come out from under the board. The lock is the peak (white impact frame, shake, side hit lines, camera punch, `cash`; the board cracks), and the last landing (or the lock itself) knocks him onto his butt, staring up at it. Explicit `heat` keys snap the colour at the key that heats it, not at the next pass.
- **Layout**: the readout is sized to the widest string it will show and to the room under the hook and footer. On a crowded top, the figure shrinks (to 0.9) before the counter does. He never stands in the post: his head stays 40 px clear of it, his torso to its right.
- **Footer and captions**: a footer line that a VO line works through (two or more numbers in common) turns ink while that line plays. Words a VO line joins with a no-break space (U+00A0) wrap as one unit in the captions.
- **Sound**: a `tick` as the counter starts and a `roll` under it, a `riser` into the lock on runs over 4 s, `pop` per pass, a `thud` per landing (`hit` for the heavier half), `hit` + `cash` at the lock, and a `thud` as he lands on his butt. Kit cues that `spec.sfx` already gives (the start `tick`, `riser`, `hit`) are not doubled.

**Stack mode** (a duel: the counter against a pile of the viewer's money), switched on by `opener` with `prop: 'block-stack'`. It replaces the dropping objects, their ghosts and the NEXT ticker; the stack is the target, and the last milestone's ✓ holds to the end.
- `opener: { prop: 'block-stack', blocks, unit, text, sub, countdown }`: a stack of `blocks` cash bricks on an ink plinth that carries `text` / `sub`, and the figure hugs it. A slot in the board's bottom edge slurps brick n into the board at `counterT[0] + n × unit ÷ perSecond` (the moment the counter passes n units), top row first, with a `tick` per brick. `countdown` replaces `sub` from frame 1: `{n}` is the bricks still on the stack, and the number pops each time one goes ("40 years left" ... "0 years left").
- `timer: { t0, label, total, endLabel: { t, text } }`: a stopwatch on the floor right of the stack. The label is above it, elapsed m:ss in the face (it stops when the counter locks), and an arc fills in the board's heat colour; `endLabel` pops under the label at its `t`.
- `gag: { t, text }`: a rubber stamp slammed over the emptied stack just after the lock (`thud`), 40 px clear of the end label. It takes the verdict's colour for the same words (`**…**` green, `__…__` red; red when the verdict does not carry them).
- `actions: [{ milestone, verb }]`: his reaction at each pass: `swallow` (hugs tighter), `push` (braces against the stack), `shocked` (jumps back, lets go), `flattened` (knocked flat, at the lock), or any other verb as a flinch. Once he has let go, he acts on the VO line starts between reactions: he points at the plinth, looks down at what is left of the stack, and looks up at the board.

`gag`, `timer` and `actions` are read only in stack mode.

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
| `opener`, `timer`, `gag`, `actions` | none | stack mode (above) |

Example: `specs/10b-becker-rig-debt-vs-your-pay.json` is stack mode: a 40-brick `opener` (40 years of median pay at $65,052, with a `countdown`), a 1-minute `timer` with an `endLabel` ("≈ $4.7 million"), explicit `heat` keys up to `'burst'`, `actions` from `swallow` to `flattened`, and a `gag` stamp ("≈ 33 seconds"). (Its `stage`, `surface`, `surfaceLabel` and `stamp` keys belong to other kits.)

Samples:
- `cost-counter.json`: US debt interest per second, 4 milestones, 37 s.
- `cost-counter-2.json`: new US debt per second, 7 milestones up to a working life of pay, `finale: 'shrug'`, 40 s.
