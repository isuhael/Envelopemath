# Channel brand

Everything in this folder is the channel's identity. It comes from here, not from the specs, so all 30 teasers pick it up at once:

- **the logo**, shown in the look's brand mark and on the end card
- **the CTA end card**, added after every teaser: "Follow for the math behind your money", then "shown, not hand-waved.", then "@envelopemath"

| File | What it is |
|---|---|
| `brand.json` | Name, handle, CTA wording, card length, logo file and crop |
| `logo.png` | The channel logo. **Not in the repo yet**: drop it in (see below) |

## Dropping in the logo

1. Save the channel's YouTube avatar as `studio/brand/logo.png`.
   - **Square.** A non-square image is centre-cropped, and the render prints a warning.
   - **At least 512 × 512 px**, ideally 1024 × 1024. The end card shows it at about 230 px.
   - **PNG** is the usual choice. JPG or WebP work too: set `"logo": "logo.jpg"`.
   - **Any background colour** is fine. By default the logo is cropped to a circle, the way YouTube shows an avatar, so keep what matters inside the centre circle. A thin ring in the look's colour (green) separates it from both the black Scoreboard stage and the light Becker Rig stage.
   - **Transparent PNG:** the stage shows through the transparent parts. If the mark gets lost on one stage (a dark mark on Scoreboard's black, for example), set `"logoBackground"` to the colour it was designed on, such as `"#ffffff"`.
2. Run `node src/cli.mjs check` (it should stay at 0 errors, 0 warnings), then `node src/cli.mjs stills specs/01a-*.json --at 1,end` and look at the stills.

**No logo file means no change.** Without `logo.png` (or with `"logo": null`), each look keeps its own mark: Scoreboard's envelope and Becker Rig's green "≈" disc. Every teaser frame is then identical to a render without the brand. The only addition is the end card.

To try a logo without copying it in, add `--logo /path/to/logo.png` to any command. Never commit a test logo into this folder.

## Editing the CTA

Edit `cta` in `brand.json`:

```json
"handle": "@envelopemath",
"cta": {
  "line":   "Follow for the math behind your money",
  "kicker": "shown, not hand-waved.",
  "dur":    2.5
}
```

- `line` is the main line, set in the look's display type at 60-90 px.
- `kicker` is the smaller line under it.
- `handle` is shown in the accent colour.
- Lines break only between words (never inside "hand-waved."). Keep the wording identical to the Shorts' descriptions.
- `dur` is how long the end card lasts, 1.5-5 s. Every teaser becomes its own length plus `dur`. The teaser's last frame (the verdict) holds underneath while the card comes in.

## Rendering with and without the brand

| You want | Do this |
|---|---|
| The brand (default) | `node src/cli.mjs render specs/01a-*.json` |
| No brand: exactly the old output (no end card, the look's own mark) | add `--no-brand` |
| One teaser without the brand, permanently | `"brand": false` in that spec |
| The brand off everywhere | `"enabled": false` in `brand.json` |
| Another logo for one run | `--logo /path/to/logo.png` |
| Another brand config for one run | `--brand /path/to/brand.json` |

Every command (`render`, `check`, `stills`, `sheet`) prints one line to stderr saying what the brand layer will do, for example `brand: end card 2.5 s, logo none (logo.png not found: the look keeps its own mark)`.

## `brand.json` fields

| Field | Default | What it does |
|---|---|---|
| `enabled` | `true` | `false` turns the brand off everywhere |
| `name` | `""` | Channel name ("The Back of the Envelope"), for kits that show it |
| `handle` | `""` | "@envelopemath" on the end card |
| `logo` | `"logo.png"` | Logo file, relative to this folder (an absolute path works too). If the file is missing, the look keeps its own mark |
| `logoShape` | `"circle"` | `circle`, `rounded` (22% corner radius) or `square` |
| `logoBackground` | `null` | Colour painted behind a transparent logo |
| `cta.line` | (required) | The end card's main line |
| `cta.kicker` | `""` | The smaller line under it |
| `cta.dur` | `2.5` | End card length in seconds (1.5-5) |
| `cta` | | Set to `null` for no end card (logo only) |

How the looks use all this is described in `studio/README.md`, under "Brand layer".
