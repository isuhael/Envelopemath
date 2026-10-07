# envelope studio

The renderer for the v2 **Back of the Envelope** shorts. Each look is a small HTML/CSS/SVG kit. A teaser is a JSON spec. The studio loads the kit in headless Chromium, seeks it frame by frame, and pipes the frames to ffmpeg with a synthesised SFX track. The voice-over is recorded separately, and the spec's `vo` lines are shown as captions in the meantime.

```bash
cd studio
npm install
npm test                                  # runtime, audio, linter and render tests
node src/cli.mjs check specs/*.json       # lint: safe zones, type floor, overlaps, contrast, fonts, R1 hook number
node src/cli.mjs sheet specs/01a-*.json   # contact sheet (12 frames) → out/sheets/
node src/cli.mjs stills specs/01a-*.json --at 0,3.5,end
node src/cli.mjs render specs/*.json --jobs 2 --sheet   # MP4s → out/
```

## Layout

| Path | What it is |
|---|---|
| `runtime/core.js` | Browser runtime shared by every kit: `defineKit`, time helpers (`prog`, `tween`, `ease`), number formatting (`money`, `fmtNum`), typing, `markup`, DOM builders (`h`, `s`), cached setters (`css`, `setText`), `fitText`, `captionAt`, `SAFE` |
| `runtime/base.css` | 1080×1920 stage, all CSS transitions and animations disabled (every frame is set by `seek(t)`) |
| `fonts/` | Vendored Google Fonts (OFL): Archivo Black, IBM Plex Mono, Inter, Inter Tight, JetBrains Mono and Anton, plus a full-glyph Inter for `≈ → × ÷ −` |
| `looks/<look>/` | One kit per look: `index.html`, `kit.js`, `formats/<format>.js`, `README.md`, `samples/` |
| `src/` | Node side: `page.mjs` (Chromium + routed origin), `render.mjs` (MP4, stills, contact sheets), `check.mjs` (linter), `audio.mjs` (SFX synth), `cli.mjs` |
| `specs/` | One teaser per file (contract: [`FORMATS.md`](FORMATS.md)) |
| `out/` | Renders (not in git) |

## Kit contract

A kit page loads `runtime/core.js` and calls `defineKit({ name, formats, chrome })`:

- `formats[id](spec, ctx)` builds the DOM for one format and returns `{ duration, seek(t) }`. `ctx.stage` is the root element, and `ctx.cue(t, kind, opts)` schedules a sound effect.
- `chrome(spec, ctx, body)` builds what every format shares (brand mark, header, footer, captions, verdict) and returns `{ seek(t) }`.
- `seek(t)` must be a **pure function of t**. Frames are rendered in order, but stills and the linter jump around.
- Readable text must sit inside the safe zones. Decoration is marked with `data-deco`, intended overlaps with `data-overlap-ok`, and rolling digits clipped on purpose with `data-roll`.

SFX kinds: `tick`, `type` (`dur`), `pop`, `ding`, `reveal`, `thud`, `whoosh` (`dur`), `riser` (`dur`), `roll` (`dur`), `cash`, `buzz`, `boing`, `step`, `hit`, `swipe`. Every cue also takes an optional `gain`.

## Safe zones (1080×1920)

| Zone | Rule |
|---|---|
| y < 240 | Platform top bar. Decoration only. |
| y 240-440 | Header band (the hook) |
| y 440-1300 | Working area |
| y 1320-1480 | Caption band |
| y > 1480 | Platform caption and UI. Nothing readable. |
| x | Readable text at x ≥ 60 and x ≤ 1020, and x ≤ 940 below y 820 (right button rail) |

Type floor: 34 px is the minimum (the linter fails below it), 40 px or more for anything the viewer must read, and 60-90 px for primary text.
