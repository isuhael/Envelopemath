# Becker Rig sound pack: calibration tools

The pack levels its cues and sets its music against values fitted on the 15 Becker teasers' cue lists. When a kit or a spec moves a cue, those values describe a teaser that no longer exists. `test/cues.test.mjs` then fails with `cue list changed for <id>: refit the sound pack, see looks/becker-rig/sound/tools/README.md`, which points here.

Run everything from `studio/`. The tools read the cue records from `--cues <file>` (or `--cues=<file>`; written by `node src/cli.mjs cues specs/*.json --out <file>`). Without `--cues` they read `test/fixtures/cues.json`, the records `MODEL` was fitted on, and say so on stderr. After a kit or spec change that fixture still holds the old cue lists until step 3 of BIBLE.md §11.1, so a refit must pass a fresh dump. An unknown flag stops the tool. Id prefixes on the command line (`09b 10b`) limit a run to those teasers.

## What is fitted, and what is designed

| Value | Where | How it is set |
|---|---|---|
| `MODEL.C`, `MODEL.tiltUp` | `balance.mjs` | Fitted by `fit.mjs` + `fitsolve.py`: the music stem before the trim, `M = C + duck cost + tiltUp·max(0, tilt)` |
| `MODEL.a`, `MODEL.b` | `balance.mjs` | Fitted the same way: the master-gain prediction, `mix power = (1 + a)·M + b·U` (powers; U = the SFX stem's ungated level). The card (its SFX and the logo) is trimmed against the predicted gain (B8) |
| `MODEL.iBias` | `balance.mjs` | Fitted by `fitsolve.py`: the mean of the engine's gated SFX stem minus the plan's own render of it (merges drop transients and low bodies) |
| `MODEL.dIS`, `dISTilt`, `dISTiltMax`, `trimLo`, `trimHi` | `balance.mjs` | Designed: the music sits `dIS` LU under the gated SFX, up to `dISTiltMax` dB nearer for a strongly tilted SFX spectrum or a crowded 1 kHz octave (`CROWD`); the trim is clamped to ±3 dB |
| `CROWD.ref`, `CROWD.k` | `balance.mjs` | Designed (2026-10-12): the reference-octave crowding. `crowd` is the cues' long-term 1 kHz-octave power over the body re their gated loudness (the plan's SFX render; `trims.mjs` prints it). Above `ref` (54.5 dB) the music comes `k` (1.0) dB nearer per dB, taking the larger of this and the tilt term, under the same 2 dB cap. Set on the 15 teasers' values (43.9 for 08c to 58.1 for 09b) so that it bites only where bells own the octave every §9.2 band is measured against: 06c (56.5), 07c (57.4) and 09b (58.1). 05b (54.4) and 04b (54.3) sit just under `ref` and would need 0.7-0.8 dB more before the term outgrew their tilt term. Not touched by a refit: `fit.mjs` renders at a fixed trim |
| `MODEL.gRef` | `balance.mjs` | Designed: the reference master gain of the card trim, `card = clamp(gRef - predicted gain, -1.5, +1.0)`. With gains of 6.3-9.0 dB the card trim sits at its -1.5 dB floor on 11 of the 15 teasers. Changing it moves every card: check B8 in `verify` |
| `SFX_TARGET`, `RANGE`, `MAX_TRIM`, `MAX_TRIM_AUDIBLE` | `balance.mjs` | Designed: the SFX leveller (the gated SFX stem pinned to -22.9 LUFS pre-master, riding only the top 14 dB of moments, at most 6 dB, 3 dB for a cue B3 listens to) |
| `TILT_REF` and the tilt slopes | `balance.mjs`, `compose.mjs` | Chosen with the level optimiser (`opt.py`) |
| Voice levels | `mix.mjs` | Chosen with the level optimiser, then by ear |

## Refit `MODEL` (after any change to levels, sends, ducks, the arrangement, the SFX renderers, or a cue list)

The same commands as BIBLE.md §11.2:

```bash
node src/cli.mjs cues specs/*-becker-rig-*.json --out /tmp/snd-br/cues.json                 # today's records: the fixture may hold the old ones
node looks/becker-rig/sound/tools/fit.mjs --cues /tmp/snd-br/cues.json > /tmp/fit.jsonl     # every Becker teaser at trim 0 (about 5 min; split by id prefixes to run in parallel)
python3 looks/becker-rig/sound/tools/fitsolve.py /tmp/fit.jsonl                              # needs numpy: prints a, b, C, tiltUp, iBias and the residuals
```

1. Copy the printed `a`, `b`, `C`, `tiltUp` (and `iBias`) into `MODEL` in `balance.mjs`. This changes the audio of every Becker teaser.
2. Check the prediction: `node looks/becker-rig/sound/tools/trims.mjs --cues /tmp/snd-br/cues.json` prints each plan's predicted master gain (`gain`); compare it with `master.gainDb` in the build's `<id>.report.json`.
3. Run `npm run sound:verify`. It prints a `CUE DRIFT` block until the fixture is updated; that is expected here.
4. When everything passes, finish with BIBLE.md §11.1 steps 3-7: store the records (`node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`), regenerate the tempo table (`node sound/tools/tempo-table.mjs --write`), update Appendix A's pins if 09b, 02a or 10b moved, `npm test`, record the change, then ship (§11.5, which rewrites the baseline). Say in the commit which masters changed.

**State on 2026-10-12, refit and shipped.** 06c's condensed cut moved its cue record, so `MODEL` was refit on a fresh dump of the 15 records, as above: two rounds, because the card trim, and so the fitted mix, reads the predicted gain. Round 1 from the stored values gave C -23.37, a 0.065, b 1.159, tiltUp 0.63, iBias -0.41; round 2 gave a 0.061, b 1.165, iBias -0.42 (C and tiltUp unchanged), which `MODEL` now holds; a third round moved a by -0.002, b by +0.003 and tiltUp by +0.01, under 0.01 dB of predicted gain, so this is the fixed point. The fit's master-gain error is -0.19 to +0.09 dB at trim 0, but its music-stem residual (`resid`) stays -0.59 to +0.61 dB, which is what `C + cost + tiltUp·tilt` cannot model. So against the shipped build's reports, `trims.mjs`'s predicted gain is still off by -0.66 (06c) to +0.37 dB (02a), mean -0.20, about what the stale values gave (-0.54 to +0.43, mean -0.18). The refit puts the coefficients on today's pack and records, but it cannot remove the music model's residual. Every teaser passes B8. The values it replaced (-23.46, 0.007, 1.288, 0.88, -0.35) were fitted before the last pack fixes. The same change added the reference-octave crowding (`CROWD`, above) for 06c's 250 Hz octave. Both went out with the ship of 2026-10-12 (BIBLE.md §11.5), together with the engine's AAC pre-roll. The tightest BANDS margins after that ship (`verify`, re-measured after 06c's picture-only re-ship the same day) are 02a 2 kHz 0.1 dB, 04b 250 Hz 0.1, 09a 2 kHz 0.1 and 01c 500 Hz 0.2; next come 05b 8 kHz 0.3 and 01b 8 kHz, 05a 500 Hz and 08c 250 Hz at 0.5. The previous build's MP4s had the same margins. They will flip first on the next pack change or refit, so check them with `verify --detail` (and `bandparts.mjs <id>`) first, and widen them with `opt.py` when there is room.

## Levels: the optimiser

```bash
node looks/becker-rig/sound/tools/dump.mjs > /tmp/dump.jsonl        # per instrument: octave bands, BUILD loudness and 500-1200 Hz power (about 5 min)
python3 looks/becker-rig/sound/tools/opt.py /tmp/dump.jsonl         # needs numpy: a random search, then a local refine
```

`opt.py` searches per-voice level offsets and the tilt slopes. It keeps every teaser's §9.2 bands inside the Becker windows with the most margin, while the marimba stays 0.4 LU above the MALLET floor and the loudest voice in 500-1200 Hz. It reads the windows and the floor from `sound/acceptance.json`. The result is a proposal: copy it into `mix.mjs` / `compose.mjs` by hand, then refit `MODEL` (above).

## Diagnostics

| Tool | What it prints |
|---|---|
| `trims.mjs [ids]` | The balance plan per teaser, without rendering audio: the leveller (I0, I, threshold, rides per kind), U, the tilt, the music plan (cost, M, trim, predicted gain, card trim) |
| `bandparts.mjs <id>` | Where each §9.2 octave's energy comes from: the mix, the stems and every instrument, in dB re the mix's 1 kHz octave. Run it first when BANDS fails |

`common.mjs` holds the shared plumbing. The per-instrument re-render (`instrumentBuses`) is shared with the MALLET check in `sound/checks/looks/becker-rig.mjs`.

## History

These tools were the fixer's scratchpad scripts (2026-10-11), kept raw in `sound/tools/_preserved/` and folded in here with repo-relative paths. The acceptance scripts (`check.mjs`, `fixcheck.mjs`, `ucheck.mjs`) became `sound/checks/`. These one-off investigations were dropped:
- `kb.mjs`: the kick + bass true-peak study.
- `devsum.py`: a summary of a lost script's output.
- `evalp.py`: a variant evaluator that exec'd `opt.py`.
- `retparts.mjs`: the returns breakdown, now covered by B1's returns bound and INFO's DUCKSTATS.
- `sfxbands.mjs`: SFX bands per kind (the `sfx` row of `bandparts.mjs` covers the stem).
