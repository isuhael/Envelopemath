# Scoreboard sound pack: calibration

The pack's SFX fader, its opening lift, its band guard and the sting's level are models fitted on the 15 Scoreboard teasers. When a kit or a spec moves a cue, the fitted values describe teasers that no longer exist. `test/cues.test.mjs` then fails with `cue list changed for <id>: refit the sound pack, see looks/scoreboard/sound/tools/README.md`, which points here.

## The values

`calibration.json` (next to the pack's modules) holds the fitted values. `cal.mjs` reads it once at load time; when the file is missing, `cal.mjs` uses defaults measured on 2026-10-11. `tools/calibrate.mjs` measures the values from a full render with stems.

| Value | Used by | What it is |
|---|---|---|
| `BEDS` | `balance.mjs` (the fader's music model), `compose.mjs` (the opening lift), `sfx.mjs` `bedSec` | The music's power over whole sections, by section name and energy tier, pre-master, at the bus's 0 dB. It is measured on `music.dry` (before the event duck) with the energy curve (`energy.mjs`) taken out. A teaser whose bed gave way (a fader offset) is left out |
| `M_FIT` | `balance.mjs`, `compose.mjs` | The music-stem model's residual: the measured music stem minus (BEDS + energy curve under the ducks + OFF_EFF × offset), averaged over the teasers |
| `GM` | `compose.mjs` (opening lift) | The master gain plus the measured music stem (pre-master). The master gain then follows as `GM - M` |
| `GM_PLAN` | `logo.mjs` | The master gain plus the plan's own music estimate. It sets the sting's scale so the sting lands at `LOGO_AT` (-12.1 LUFS momentary) after mastering (B8) |
| `LOGO_PRE` | `logo.mjs` | The sting's momentary loudness at L + 0.2 s, pre-master, at scale 1 (on the delivered AAC) |
| `OPEN_FIT` | `compose.mjs` | The delivered short-term loudness at 3 s minus the opening lift's prediction (which leaves out the returns, the ducks and the glue). Each `--write` adds the new mean residual to the current value |
| `GM_SFX` | `logo.mjs` (`gainEst`) | The cues' weight in the master gain model: G = `GM_PLAN` − 10 log10(10^(M/10) + `GM_SFX` · 10^(Su/10)), M the plan's music estimate (plus the band guard's loudness change), Su the cues' K-weighted power over the body at their final level (`sfx.mjs` `sfxBodyPower`). Fitted with `GM_PLAN` (least spread). With the music alone a short, busy body mastered 0.4-0.9 dB under the estimate |
| `LOGO_SLOPE` | `logo.mjs` | The sting's rise at L + 0.2 s (dB/s, about 15). B8 reads the meter's 100 ms grid, so its window ends up to 50 ms from L + 0.2; `LOGO_PRE` is normalised to L + 0.2 exactly and the sting levelled for the frame B8 reads (`b8Frame`) |
| `BAND_REF` | `bands.mjs` (`predict`) | `{ w }`: the cues' (and their returns') weight against the music in the band model, for the SFX bus compressor and HP (about 1) |
| `BAND_FIT` | `bands.mjs` | The band model's residual per octave (delivered minus predicted, dB re 1 kHz, mean over the teasers): the glue, the master's filters and limiter, the AAC |
| `BAND_SD` | `bands.mjs` (`bandAim`) | The residual's spread per octave (0.2-0.4 dB). The band guard aims each watched octave 0.5 + 3 × `BAND_SD` dB inside its window |
| `PAY_LOSS`, `PAY_HIT` | `logo.mjs` (`payoffEst`) | The payoff's delivered momentary loudness in B8's frame against the band model's payoff frame plus the master gain: what every payoff loses (about 1.4 dB: the returns, the glue), and how much more when a hit marks P (about 1.6 dB: the SFX bus compressor's 2.5 dB on the loudest hit, the limiter at P). Spread 0.33 dB. The sting aims at the middle of [-13 LUFS, the payoff] when that is under `LOGO_AT` |
| `OFF_EFF` | `balance.mjs` | How far the music stem moves per dB of bed offset (0.65). It was measured by hand on 02c at offsets of -1.3 and -2.5 dB (0.63-0.70). `calibrate.mjs` passes it through unchanged |
| `stats` | (information) | The spread of each fit over the teasers, the teaser count and the render it came from |

**BEDC** (the music's 50 ms RMS at the cue times) is retired: `clearance.mjs` renders the bed at every cue window instead, so no BEDC value exists or needs fitting.

**Designed constants** are not fitted; change them deliberately. In `balance.mjs`:
- `S_MINUS_M` -1.35: a busy teaser cuts its cues until the SFX stem sits 1.35 LU under the music stem.
- `S_FLOOR` -2.1: a sparse teaser lifts its cues only until the SFX stem is 2.1 LU under the music stem.
- `LIFT_MAX` 4: the largest cue lift, in dB.
- `S_CAL` -0.3: what the SFX bus takes off the solo renders.

In `logo.mjs`, `LOGO_AT` -12.1 is the middle of B8's window. The B1 windows the fader aims at are in `sound/acceptance.json`.

## Refit (after any change to the arrangement, the levels, the sends, the duck table or a cue list)

The same commands as BIBLE.md §11.2. Dump fresh records first: after a kit or spec change, `test/fixtures/cues.json` still holds the old cue lists.

```bash
cd studio
node src/cli.mjs cues specs/*-scoreboard-*.json --out /tmp/snd-sb/cues.json
node src/cli.mjs audio specs/*-scoreboard-*.json --cues /tmp/snd-sb/cues.json --out /tmp/snd-sb/run --stems --no-check
node looks/scoreboard/sound/tools/calibrate.mjs /tmp/snd-sb/run --cues /tmp/snd-sb/cues.json            # prints the values
node looks/scoreboard/sound/tools/calibrate.mjs /tmp/snd-sb/run --cues /tmp/snd-sb/cues.json --write    # stores them
```

`calibrate.mjs` needs `--cues` (the records the render was made from; `--cues=<file>` works too), takes `--skip <id prefixes>`, `--per` (each teaser's residuals on stderr) and `--write`, and stops on any other flag. The render takes about 1 GB in `/tmp`.

Calibrate a render with the calibration that made it still loaded: `calibrate.mjs` composes every teaser again to read its plan, its band model and its levers, and the band guard's levers depend on the calibration. A code change between the render and the calibration (or a `--write` in between) gives residuals for levers the render did not use.

Each calibration moves the next render a little: the fader, the lift and the sting read the tables. So render again and calibrate again, until the printed values stop moving (two rounds are usually enough). Run without `--write` to check the state. Then:
1. Run `npm run sound:verify`. It prints a `CUE DRIFT` block until the fixture is updated; that is expected here.
2. When it passes, finish with BIBLE.md §11.1 steps 3-7: store the records (`node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`), regenerate the tempo table (`node sound/tools/tempo-table.mjs --write`), update Appendix A's pins if 09c or 10a moved, `npm test`, record the change, then ship (§11.5, which rewrites the baseline).
3. Say in the commit which masters changed.

**Refit for the condensed cuts (2026-10-13).** The batch of condensed cuts (01a 02b 02c 03b 03c 04a 04c 05c 06a) moved nine records, and the pack gained rules that move levels (the band guard, the short-BUILD fall, the early payoff, the returns at +3.0 dB, the payoff's hall budget). The models changed with them: the fader caps clusters after its trims; the master gain model counts the cues (`GM_SFX`) and the band guard's loudness change; `LOGO_PRE` is normalised to the meter frame (`LOGO_SLOPE`); the band model (`BAND_REF`, `BAND_FIT`, `BAND_SD`) and the payoff estimate (`PAY_LOSS`, `PAY_HIT`) are new. Refitted from a fresh dump by the loop above (render, calibrate, write, render) to the fixed point: the last round (a render with the written values, calibrated again) moved the scalars by 0.05 dB at most (M_FIT +0.03, GM_PLAN +0.03, OPEN_FIT +0.05, LOGO_PRE −0.01, PAY_HIT +0.03), BEDS by 0.1 dB in one cell (DROP 5), `BAND_FIT` by 0.02 and `BAND_SD` by 0.03, so it was not written. The written values (from the render before the last) have these spreads over the 15: GM_PLAN 0.15 dB, LOGO_PRE 0.04, the payoff 0.33, the bands 0.21-0.40 on the watched octaves (63, 125, 250 Hz, 16 kHz). The last change after them, the band guard's loudness budget (0.25 → 0.4 dB), moves only 02b's and 02c's levers.

**State on 2026-10-12.** Re-measured from the baseline render of today's cue lists, the values match `calibration.json` to 0.03 dB on the scalars (M_FIT 1.65 vs 1.68, GM -16.06 vs -16.07, GM_PLAN -16.00 vs -16.02, LOGO_PRE -16.25, OPEN_FIT 2.03 vs 2.00) and to 0.10 dB on BEDS. The pack sits at its fixed point.

**Refit for 06b's condensed cut (BIBLE v2.3, 2026-10-12).** 06b's record moved (20.8 s, was 33.0 s), so the pack was re-measured on a fresh dump of the 15 records (the commands above, without `--write`). The scalars came out within 0.02 dB of `calibration.json`: M_FIT 1.67 (file 1.68), GM −16.09 (−16.07), GM_PLAN −16.01 (−16.02), LOGO_PRE −16.24 (−16.25) and OPEN_FIT 2.00 (2.00). BEDS moved only in two cells, both under 0.10 dB before rounding: VERDICT 4 −18.26 (file −18.2) and CADENCE 3 −18.69 (−18.6). That is inside the fixed-point tolerance, so the values did not move and nothing was written. A write would have changed all 15 Scoreboard masters for no gain. The re-measure's render gave the other 14 Scoreboard masters equal to the baseline, and 06b's equal to its reviewed build.
