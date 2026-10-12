# Becker Rig sound pack: calibration tools

The pack levels its cues and sets its music against values fitted on the 15 Becker teasers' cue lists. When a kit or a spec moves a cue, those values describe a teaser that no longer exists. `test/cues.test.mjs` then fails with `cue list changed for <id>: refit the sound pack, see looks/becker-rig/sound/tools/README.md`, which points here.

Run everything from `studio/`. The tools read the cue records from `test/fixtures/cues.json`, or from `--cues <file>` (written by `node src/cli.mjs cues specs/*.json --out <file>`). Id prefixes on the command line (`09b 10b`) limit a run to those teasers.

## What is fitted, and what is designed

| Value | Where | How it is set |
|---|---|---|
| `MODEL.C`, `MODEL.tiltUp` | `balance.mjs` | Fitted by `fit.mjs` + `fitsolve.py`: the music stem before the trim, `M = C + duck cost + tiltUp·max(0, tilt)` |
| `MODEL.a`, `MODEL.b` | `balance.mjs` | Fitted the same way: the master-gain prediction, `mix power = (1 + a)·M + b·U` (powers; U = the SFX stem's ungated level). The card (its SFX and the logo) is trimmed against the predicted gain (B8) |
| `MODEL.iBias` | `balance.mjs` | Fitted by `fitsolve.py`: the mean of the engine's gated SFX stem minus the plan's own render of it (merges drop transients and low bodies) |
| `MODEL.dIS`, `dISTilt`, `dISTiltMax`, `trimLo`, `trimHi` | `balance.mjs` | Designed: the music sits `dIS` LU under the gated SFX, up to `dISTiltMax` dB nearer for a strongly tilted SFX spectrum; the trim is clamped to ±3 dB |
| `MODEL.gRef` | `balance.mjs` | Designed: the reference master gain of the card trim, `card = clamp(gRef - predicted gain, -1.5, +1.0)`. With gains of 6.3-9.0 dB the card trim sits at its -1.5 dB floor on 11 of the 15 teasers. Changing it moves every card: check B8 in `verify` |
| `SFX_TARGET`, `RANGE`, `MAX_TRIM`, `MAX_TRIM_AUDIBLE` | `balance.mjs` | Designed: the SFX leveller (the gated SFX stem pinned to -22.9 LUFS pre-master, riding only the top 14 dB of moments, at most 6 dB, 3 dB for a cue B3 listens to) |
| `TILT_REF` and the tilt slopes | `balance.mjs`, `compose.mjs` | Chosen with the level optimiser (`opt.py`) |
| Voice levels | `mix.mjs` | Chosen with the level optimiser, then by ear |

## Refit `MODEL` (after any change to levels, sends, ducks, the arrangement, the SFX renderers, or a cue list)

```bash
node looks/becker-rig/sound/tools/fit.mjs > /tmp/fit.jsonl          # every Becker teaser at trim 0 (about 5 min; split by prefixes to run in parallel)
python3 looks/becker-rig/sound/tools/fitsolve.py /tmp/fit.jsonl     # needs numpy: prints a, b, C, tiltUp, iBias and the residuals
```

1. Copy the printed `a`, `b`, `C`, `tiltUp` (and `iBias`) into `MODEL` in `balance.mjs`. This changes the audio of every Becker teaser.
2. Check the prediction: `node looks/becker-rig/sound/tools/trims.mjs` prints each plan's predicted master gain (`gain`); compare it with `master.gainDb` in the build's `<id>.report.json`.
3. Run `npm run sound:verify`. When everything passes, rewrite the baseline with `npm run sound:baseline`, and the cue fixture if a cue list moved (`node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`). Say in the commit which masters changed.

**State on 2026-10-12** (today's 15 cue lists, current pack). The refit gives C -23.33, a 0.042, b 1.215, tiltUp 0.63, iBias -0.37. `MODEL` holds -23.46, 0.007, 1.288, 0.88, -0.35: it was fitted before the last pack fixes. With it, the predicted master gain is off by -0.54 to +0.43 dB (mean -0.19), and every teaser passes B8. The refit was not applied, because it would change the delivered audio.

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
