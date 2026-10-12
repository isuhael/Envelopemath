# envelope studio

The renderer for the v2 **Back of the Envelope** shorts. Each look is a small HTML/CSS/SVG kit. A teaser is a JSON spec. The studio loads the kit in headless Chromium, seeks it frame by frame, and pipes the frames to ffmpeg with a synthesised soundtrack: music plus sound effects, mastered to −14 LUFS (see [Sound](#sound)). The shorts are posted with no narration, and the spec's `vo` lines are shown as captions.

```bash
cd studio
npm install
npm test                                  # runtime, audio, linter and render tests
node src/cli.mjs check specs/*.json       # lint: safe zones, type floor, overlaps, contrast, fonts, R1 hook number
node src/cli.mjs sheet specs/01a-*.json   # contact sheet (12 frames) → out/sheets/
node src/cli.mjs stills specs/01a-*.json --at 0,3.5,end
node src/cli.mjs render specs/*.json --jobs 2 --sheet   # MP4s → out/
node src/cli.mjs render specs/01a-*.json --no-brand     # without the brand layer (no end card, the look's own mark)
node src/cli.mjs stills specs/01a-*.json --at end --logo /tmp/test-logo.png   # try a logo without copying it in
node src/cli.mjs sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4   # new audio on finished MP4s (picture copied)
node src/cli.mjs audit /tmp/sound/mp4 --reports /tmp/sound/mp4/sound   # loudness, peaks, stereo, bands, spectrograms
npm run sound:verify                                     # the sound acceptance harness: every check of sound/acceptance.json on all 30
```

## Layout

| Path | What it is |
|---|---|
| `runtime/core.js` | Browser runtime shared by every kit: `defineKit`, time helpers (`prog`, `tween`, `ease`), number formatting (`money`, `fmtNum`), typing, `markup`, DOM builders (`h`, `s`), cached setters (`css`, `setText`), `fitText`, `captionAt`, `SAFE`, and the brand layer (`brandLogo`, `brandCard`, see below) |
| `runtime/base.css` | 1080×1920 stage, all CSS transitions and animations disabled (every frame is set by `seek(t)`) |
| `fonts/` | Vendored Google Fonts (OFL): Archivo Black, IBM Plex Mono, Inter, Inter Tight, JetBrains Mono and Anton, plus a full-glyph Inter for `≈ → × ÷ −` |
| `looks/<look>/` | One kit per look: `index.html`, `kit.js`, `formats/<format>.js`, `README.md`, `samples/` |
| `src/` | Node side: `page.mjs` (Chromium + routed origin), `render.mjs` (MP4, stills, contact sheets), `check.mjs` (linter), `sound/` (the sound engine), `audio.mjs` (the legacy mono SFX synth), `cli.mjs` |
| `sound/` | The sound bible (`BIBLE.md`), the engine and pack contract (`README.md`), the acceptance thresholds (`acceptance.json`) and the harness that runs them (`checks/`). Look packs live in `looks/<look>/sound.mjs` (or `sound/packs/<look>.mjs`) |
| `specs/` | One teaser per file (contract: [`FORMATS.md`](FORMATS.md)) |
| `brand/` | The channel brand: `brand.json` (handle, CTA, logo crop) and `logo.png` (dropped in by the owner). See [`brand/README.md`](brand/README.md) |
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

## Brand layer

The channel brand comes from `brand/brand.json`, never from a spec. It adds two things to every teaser: the logo in the look's mark, and a CTA end card after the teaser. How to drop in the logo and edit the wording is in [`brand/README.md`](brand/README.md).

**Plumbing.** `readSpec(file, { brand })` in `src/page.mjs` attaches `spec.brand`, which looks like `{ name, handle, cta: { line, kicker, dur }, logoUrl, logoShape, logoBackground }`. It is `null` with `--no-brand`, with `"brand": false` in the spec, or with `"enabled": false` in `brand.json`. `logoUrl` is `null` when the logo file does not exist, so a kit never has to probe for a missing file. The routed origin serves `brand/`. A logo outside the studio folder (`--logo`, or an absolute `brand.logo`) is served under `/__brand/<hash>/`. `STUDIO.mount` decodes the logo before it builds anything, and `openSpec` waits until every `<img>` is decoded before frame 0, the same way it waits for fonts. If the logo fails to decode, the mount logs a page error (so `check` fails) and falls back to the look's mark.

**Timeline.** With a CTA, `STUDIO.mount` returns `{ duration: base + cta.dur, base, fps, sfx, brand: { logo, card: 'kit' | 'generic', t0, dur } }`. During the card (`t >= base`), the format, the chrome and the mark are seeked at most to `hold = base - 1/fps`, so the verdict frame holds underneath. The card's own `seek(t)` gets the real `t`. Before `base`, the whole brand layer is `display: none`. Without a logo, every teaser frame is therefore pixel-identical to the `--no-brand` render. If a kit's card cues no sound between `base - 0.1` and `base + 0.6`, the runtime cues a `whoosh` at `base`.

**Kit hooks.** `defineKit({ name, formats, chrome, brand: { theme, mark, cta } })`. All three hooks are optional:

| Hook | Called | Does |
|---|---|---|
| `theme` | at mount | An object, or `(auto, stage) => ({...})`, overriding the auto theme. The auto theme is read from the stage: `bg` is the stage background, `fg` its text colour, `accent` and `ring` are its `<em>` colour (else green), and `display`/`body` its font. The other fields are `kicker`, `displayWeight`, `displayCase`, `kickerWeight` and `handleWeight` |
| `mark(spec, ctx, brand, { theme })` | after the chrome, **only when `brand.logoUrl` is set** | Puts the logo into the look's own mark, usually `brandLogo(brand, size, { ring: theme.ring })` in place of the "≈"/envelope icon. May return `{ seek(t) }`, which is held during the card like the chrome. Without this hook, every `[data-brand-icon]` element in the stage is replaced by the logo at the same height. With neither, the mark stays as it is |
| `cta(spec, ctx, brand, { t0, dur, hold, root, theme })` | when `brand.cta` is set | Builds the end card into `root` (`#brand-layer`, a 1080×1920 layer above `#stage`) and returns `{ seek(t) }`, a pure function of `t` (the card shows `t0`..`t0 + dur`). Return `null` to get the generic card |

Rules for a kit's card:
- Build it in `root`, never in `ctx.stage`. The chrome scans the stage, for example the Scoreboard verdict band's `coverable()`.
- Cue its sounds with `ctx.cue`.
- Mark an opaque cover with `data-occlude`, and mark decoration with `data-deco` as usual.
- Use `ctx.brand` or the `brand` argument, not `spec.brand` (the runtime sets `logoUrl` to `null` if the file fails to decode).
- `ctx.brand` is also available to the chrome. When `brand.logoUrl` is `null`, the look must render exactly as it does without a brand.

**Helpers** (`runtime/core.js`):
- `brandLogo(brand, size, { shape, ring, ringWidth, background })` returns the logo as a `size`×`size` element. It is cropped to `circle`, `rounded` or `square`, with an inset ring (3% of `size`, at least 2 px) in the `ring` colour, and marked `data-deco`. It returns `null` without a logo.
- `brandIcon(brand, size, { fallback })` returns the logo, or `fallback(size)` (the look's own mark).
- `brandMarkFallback(size, theme)` draws the generic "≈" ring.
- `brandTheme(stage, over)` computes the auto theme.
- `brandCard(spec, ctx, brand, opts)` builds the generic card. A kit can call it with its own `theme` or `colX`/`colW`/`logoSize`.
- `wordsHTML(text)` returns one nowrap span per word, so lines break only between words.
- `balanceSplit(text, n)` splits text into `n` balanced lines at spaces.
- `fitLines(el, maxW, { maxLines, maxPx, minPx, lh })` returns the largest size that fits `maxW` in `maxLines` lines.
- `parseColor` and `contrast` are colour utilities.

**The generic card.** An opaque panel in the stage colour, with a thin accent rule on its leading edge, slides up over the held frame in 0.3 s (whoosh). The logo, or the "≈" ring, pops in at 230 px (pop). The CTA line rises in at 60-88 px in the look's font, at most 2 lines. The kicker follows at 40-50 px, then the handle in an accent pill. Everything is set by about `t0 + 1` and holds to the end. Text sits in x 140-940, centred in y 240-1480.

**Linter.** `check` audits `#brand-layer` together with the stage: safe zone, type floor, overlap, contrast and fonts. Stage text whose box is at least half under a visible `[data-occlude]` cover counts at `(1 - cover opacity)` of its opacity, so the held frame under an opaque card drops out of the audit. Stage text under a translucent card is still linted. The duration rule (5-90 s) uses the total. The report shows `(27.0 s = 24.5 + 2.5 s end card)`.

## Sound

The teasers carry no narration, so the music and sound effects carry the video. The design rules are in [`sound/BIBLE.md`](sound/BIBLE.md); the engine and the pack contract are in [`sound/README.md`](sound/README.md).

**How the soundtrack is made.**
- `src/sound/` turns a mounted spec's cue list (`info.sfx`, plus the spec's verdict and the brand card's timing) into a timeline. The timeline holds the payoff P, a tempo map that puts P, the verdict and the card on bar lines, sections and energy.
- A look's **sound pack** composes music on that timeline and renders every SFX kind. The engine looks for it at `sound/packs/<look>.mjs`, then `looks/<look>/sound.mjs` (where the Scoreboard and Becker Rig packs live), then falls back to the default pack in `src/sound/packs/default.mjs`.
- The engine mixes music, SFX and reverbs, ducks the music under the cues, and masters to −14 LUFS with a −1.5 dBTP true-peak limiter.
- It encodes AAC-LC 192k stereo and checks the decoded true peak (≤ −1.0 dBTP).
- Everything is synthesised and seeded: the same spec always gives the same master WAV.

**Commands.**
- `render` uses the engine by default; `--legacy-audio` keeps the old mono SFX-only track.
- `sound` puts new audio on finished MP4s without re-encoding the picture (the video-stream md5 is checked).
- `audio` renders the audio, score and report only.
- `audit` measures any MP4.
- `verify` is the acceptance harness: it builds the audio and stems into a temp dir (or reads `--from <dir>`), muxes them onto the finished MP4s for the picture checks, runs every check in `sound/acceptance.json`, prints a pass table and the failures, and exits non-zero on any failure (`npm run sound:verify`; see [`sound/README.md`](sound/README.md#acceptance-harness-verify)).
- `cues` and `score` dump the engine's input and plan.
- Nothing is written into `renders/channel/` unless `--final` is passed.
- **Before changing a kit, a spec, a pack or the engine**, read [`sound/BIBLE.md`](sound/BIBLE.md) §11. Both packs carry values fitted on today's cue lists (`test/fixtures/cues.json`). After an edit, `node --test test/cues.test.mjs` (about 10 s) tells you whether a cue moved; `render`, `audio`, `sound` and `verify` warn about it too. If one did, §11.1 lists the steps: refit, verify, store the records, regenerate the tempo table, `npm test`.

```bash
node src/cli.mjs audio specs/09c-*.json --out /tmp/sound/audio --stems
node src/cli.mjs sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4 --score --jobs 4
node src/cli.mjs audit /tmp/sound/mp4 --reports /tmp/sound/mp4/sound --out /tmp/sound/audit
```
