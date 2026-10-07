# envelope-engine

Renders **Back of the Envelope / Envelope Math** teasers: 1080×1920, 30 fps MP4s with synthesised
foley, from a JSON spec. Built from scratch for this channel. Every frame is drawn with
`@napi-rs/canvas` and piped into `ffmpeg`; there's no browser and no audio or image assets.

```bash
cd engine && npm install
node src/cli.js check  specs/*.json                     # lint: safe areas, overlaps, caption band
node src/cli.js sheet  specs/01-a.json -o out/01-a.png   # contact sheet (12 thumbnails) for QA
node src/cli.js still  specs/01-a.json --t 4.2 --safe    # one frame with the safe-zone overlay
node src/cli.js render specs/*.json -o out/              # MP4s (≈1× real time on 4 cores)
npm test
```

## The look

The stage is the **back of a manila catalog envelope** (`paper.style: "kraft"`): flap, gum line,
brass clasp, centre seam. All working is **ballpoint-blue handwriting** with a pen that moves as it
writes. Answers get **red pen** (circle, underline, strike), verdicts are **rubber stamps**, the episode
badge is a **postmark**, and the hook sits on **masking tape**. The signature reveal is the
**sealed envelope** with a red wax "≈". Other styles: `"white"` envelope, `"airmail"` (striped border).

## Coordinates and safe zones

Units are always 1080×1920, with (0,0) top-left. The platform UI covers some areas, so keep anything readable inside:

| zone | y range | notes |
|---|---|---|
| flap / platform top bar | 0–230 | decoration only; the series postmark goes in the flap: `{"type":"postmark","t":0,"x":175,"y":258,"r":100,"persist":true}` |
| hook (masking tape) | 380–620 | `hook` default y = 400 |
| content | 600–1300 | math, props, charts |
| caption band | 1320–1480 | `spec.captions` are drawn here; keep content out while they play |
| platform caption/UI | 1480–1920 | nothing readable |
| right button rail | x > 940 when y > 820 | the linter enforces this |

`check` warns about text that leaves the safe area, boxes that overlap while both are on screen
(a stamp may land on a paper prop; `allowOverlap: true` silences an intended overlap), content in
the caption band during captions, captions over 2 lines or faster than 4 words/s, a frame 0 with no
readable hook, text cleared before it finishes writing, text too small for a phone (handwriting < 56px, typewriter < 40px; `decor: true`
exempts deliberate small print), and runs over 60 s (75 s with `"lane": "long"`).

## Spec

```jsonc
{
  "id": "03-sealed-answer-a",          // file stem, used for output names
  "title": "Is your $4 coffee really a $1M mistake?",
  "paper": { "style": "kraft", "seed": 7 },
  "duration": 30,                       // optional; default = last animation + 0.8s
  "camera": [ { "t": 0, "zoom": 1 }, { "t": 6, "zoom": 1.25, "x": 540, "y": 900 } ], // optional
  "captions": [ { "t": 0.2, "end": 2.8, "text": "$2,500 every 2 weeks", "say": "twenty-five hundred every two weeks" } ],
  "loop": true,                         // optional: crossfade the last 0.35s into frame 0 (seamless replays)
  "lane": "long",                       // optional: allows up to 75s (default max 60s)
  "vo": "full voice-over script (not rendered)",
  "ops": [ { "type": "hook", "t": 0, "text": "..." }, ... ]
}
```

Captions show `text`; `say` (optional) is how the voice-over reads it. Give an op an `id` so
annotations can target it. Ops with negative `t` are already on screen in frame 0 (no sound).

Every op needs `type` and `t` (start, seconds). Ops stay on screen until a `clear`/`flip` after
them, or until their own `until` (seconds), then fade over `fadeOut` (0.25s). `persist: true` keeps an
op through clears (e.g. the postmark badge). `fixed: true` draws an op in screen space, which ignores the
camera (`hook`, `choices`, `pick`, `timer` and `outro` are fixed by default). `z` changes the draw order.

Colours: `ink` (ballpoint blue, the default), `red`, `green`, `pencil`, `black`, `gold`, `white`,
or any CSS colour. Fonts: `hand` (Caveat, the default), `type` (typewriter), `marker`, `sans`.
Wrap a word in `*asterisks*` in a hook to make it red.

### Ops

| type | what it draws | key params (defaults) |
|---|---|---|
| `hook` | marker headline on masking-tape strips, slapped in line by line (a hook at `t: 0` renders finished, so frame 0 is a readable thumbnail) | `text` (string or array of lines; `*em*` = red), `y` 400, `size` 84, `maxWidth` 860, `tape` true, `font` marker (use `sans` or `hand` when the marker face misreads, e.g. "S&P"), `instant` (default: t ≤ 0.05) |
| `quote` | **claim card**: the viral claim in big quotes with an attribution line (for audits) | `text`, `by`, `x` 540, `y` 760 (centre), `w` 840, `size` 66, `font` marker, `instant` (default t ≤ 0.05) |
| `write` | one line of handwriting with a moving pen | `text`, `x`, `y` (baseline), `size` 86, `color`, `align` left/center/right, `cps` 15, `font`, `pen` true / false / `"small"`, `em` (true: `*word*` in red) |
| `lines` | column arithmetic written line by line | `lines` [string or {text,color,size}], `x` (right edge if align right), `y` (first baseline), `size` 86, `align` right, `rule` (index of the total line: draws the sum bar above it), `cps` 15, `gap` 0.3 |
| `ladder` | unit-conversion ladder: rungs of "label ····· value" with the multiplier (×7, ×52) in red in the left gutter; last rung in red | `rows` [{label, value, factor}], `x` 110, `y` (first baseline), `w` 820, `size` 88, `cps` 16 |
| `counter` | a number counting up, then a pop; or a **running total** with `steps` | `to`, `from` 0, `x`, `y`, `size` 130, `dur` 1.4, `prefix`, `suffix`, `decimals` 0, `compact` (1.2M), `color`, `font` hand, `steps` [[t, value], …] (t relative to the op; tweens to each value) |
| `annotate` | hand-drawn mark | `kind` circle/box (x,y,w,h), underline/double/strike (x,y,w), check/cross (x,y,w,h), arrow (`from`[x,y], `to`[x,y], `bend` 0.25); `color` red, `width` 7, `dur` 0.4; **or** `target` {op: "<id>" or index, match: "text", line, nth, pad} to land on text in a write/lines/hook/quote/counter/ladder op (inherits `fixed` from it) |
| `highlight` | yellow marker swipe | `x`, `y`, `w`, `h`, `dur` 0.35, or `target` as above |
| `meter` | gauge draining from `from`% to `to`% with a live "LABEL: N%" readout, then a thump | `to`, `from` 100, `x` 160, `y`, `w` 760, `h` 70, `label` CLAIM SURVIVAL, `color` (auto red < 50%), `dur` 1.4 |
| `stamp` | rubber-stamp verdict that slams in and shakes the frame | `text` ("NOT\nWORTH IT"), `x`, `y` (centre), `size` 76, `rot` -8, `color` red, `shake` 16 |
| `postmark` | circular postmark with wavy lines (the series badge) | `x`, `y`, `r` 112, `top`, `bottom`, `center` ["No.","001"], `rot` -12 |
| `postage` | perforated postage stamp | `x`, `y`, `value` ("$5"), `label`, `labelSize` 18, `art` ("≈"), `w` 210, `h` 250, `color` red |
| `sticky` | yellow sticky note, text written in | `x`, `y` (centre), `text`, `title` (set it, e.g. "ASSUME:"; no default), `w` 400, `size` 60 |
| `envelope` | **sealed answer**: slides in, wiggles, opens at `openAt` and a card slides out; leave `openAt` out for one that stays sealed (answer in the pin / next post) | `openAt` (absolute s), `card` [string or {text, size, color, font, em}], `cardSize` 96 (scales with `w`), `note` (red text before opening), `label`, `x` 540, `y` 980, `w` 780 |
| `receipt` | thermal receipt printing line by line | `x` (centre), `y` (top), `header`, `items` [[label,value]… or {label, value, at, color, highlight, strike}], `total` [label,value] or {label, value, at}, `footer`, `w` 640, `size` 40, `lps` 4, `compact` (header + rule print together), `instant`, `running` {label, prefix, decimals} (live subtotal until the total prints) |
| `stuff` | cash-stuffing envelopes filling with bills, amounts counting | `items` [{label, amount}], `x`, `y`, `w` 840, `cols` ≤3, `stagger` 0.45, `prefix` $, `instant` (default t ≤ 0.05) |
| `emoji` | colour emoji popping in | `char`, `x`, `y`, `size` 160, `bob`, `rot`, `instant` (default t ≤ 0.05) |
| `bars` | hatched hand-drawn bars growing | `items` [{label, value, color, display, at}], `x` (centre), `y` (baseline), `w` 820, `h` 600, `format` {prefix, compact, decimals}, `stagger` 0.45 |
| `curve` | axes + a curve drawn by pen | `x`,`y` (origin, bottom-left), `w` 820, `h` 620, `values` [...] or `fn` {type: compound (principal, rate, years, contrib) or linear (principal, contrib, years)}, `compare` {fn or values}, `marks` [{i, text}], `ticks` [{i, label}] (x-axis), `format`, `xLabel`, `yLabel`, `endLabel` |
| `stack` | a pile of cash bricks growing to a height, with a red dimension line, a height label and an optional reference figure for scale | `x` (centre) 600, `y` (ground), `h` (px), `w` 240, `units` 10, `heightLabel`, `label`, `ref` {char "🧍", h px, label "you"}, `dur` 1.6 |
| `grid` | rows×cols dots (or emoji) filling in | `rows`, `cols`, `filled`, `prefilled`, `x` (centre), `y` (first row), `cell` 70, `emoji`, `label`, `color` |
| `choices` | A/B/C index cards; answer circled at `revealAt` | `options` [...], `answer` (index), `revealAt` (absolute s), `y` 760, `w` 800, `size` 70 |
| `pick` | **"Which envelope?"**: 2–4 sealed envelopes labelled A–D; at `revealAt` the answer gets a stamp and the rest dim | `options` [string or {label, sub}], `answer`, `revealAt`, `stamp` FIRST CLASS, `y` 720, `cols` 2, `ew` 380, `eh` 270, `size` 64 |
| `timer` | "pause & guess" countdown ring | `seconds` 3, `x` 540, `y`, `label` |
| `outro` | brand end card: red ≈ seal, name, tagline | `tagline`, `cta` |
| `clear` | fades out everything before `t` | — |
| `flip` | flips the envelope over (squash transition) and clears | `dur` 0.5 |

### Authoring tips

- One idea per screen. Clear or flip between beats rather than piling things up.
- Handwriting runs at 15 chars/s by default, so a 12-character line takes 0.8s. Leave time to read.
- Put the hook on screen from `t: 0`. The first frame is the thumbnail on most feeds.
- End on a frame that cuts cleanly back to the first one (the loop), or on `outro` for series episodes.
