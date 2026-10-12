# Scoreboard sound pack: calibration

The pack's SFX fader, its opening lift and the sting's level are models fitted on the 15 Scoreboard teasers. When a kit or a spec moves a cue, the fitted values describe teasers that no longer exist. `test/cues.test.mjs` then fails with `cue list changed for <id>: refit the sound pack, see looks/scoreboard/sound/tools/README.md`, which points here.

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

`calibrate.mjs` needs `--cues` (the records the render was made from; `--cues=<file>` works too), takes `--skip <id prefixes>` and `--write`, and stops on any other flag. The render takes about 1 GB in `/tmp`.

Each calibration moves the next render a little: the fader, the lift and the sting read the tables. So render again and calibrate again, until the printed values stop moving (two rounds are usually enough). Run without `--write` to check the state. Then:
1. Run `npm run sound:verify`. It prints a `CUE DRIFT` block until the fixture is updated; that is expected here.
2. When it passes, finish with BIBLE.md §11.1 steps 3-7: store the records (`node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`), regenerate the tempo table (`node sound/tools/tempo-table.mjs --write`), update Appendix A's pins if 09c or 10a moved, `npm test`, record the change, then ship (§11.5, which rewrites the baseline).
3. Say in the commit which masters changed.

**State on 2026-10-12.** Re-measured from the baseline render of today's cue lists, the values match `calibration.json` to 0.03 dB on the scalars (M_FIT 1.65 vs 1.68, GM -16.06 vs -16.07, GM_PLAN -16.00 vs -16.02, LOGO_PRE -16.25, OPEN_FIT 2.03 vs 2.00) and to 0.10 dB on BEDS. The pack sits at its fixed point.

**Refit for 06b's condensed cut (BIBLE v2.3, 2026-10-12).** 06b's record moved (20.8 s, was 33.0 s), so the pack was re-measured on a fresh dump of the 15 records (the commands above, without `--write`). The scalars came out within 0.02 dB of `calibration.json`: M_FIT 1.67 (file 1.68), GM −16.09 (−16.07), GM_PLAN −16.01 (−16.02), LOGO_PRE −16.24 (−16.25) and OPEN_FIT 2.00 (2.00). BEDS moved only in two cells, both under 0.10 dB before rounding: VERDICT 4 −18.26 (file −18.2) and CADENCE 3 −18.69 (−18.6). That is inside the fixed-point tolerance, so the values did not move and nothing was written. A write would have changed all 15 Scoreboard masters for no gain. The re-measure's render gave the other 14 Scoreboard masters equal to the baseline, and 06b's equal to its reviewed build.
