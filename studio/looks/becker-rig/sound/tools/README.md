# Becker Rig sound pack: calibration tools

The pack levels its cues and sets its music against values fitted on the 15 Becker teasers' cue lists. When a kit or a spec moves a cue, those values describe a teaser that no longer exists. `test/cues.test.mjs` then fails with `cue list changed for <id>: refit the sound pack, see looks/becker-rig/sound/tools/README.md`, which points here.

Run everything from `studio/`. The tools read the cue records from `--cues <file>` (or `--cues=<file>`; written by `node src/cli.mjs cues specs/*.json --out <file>`). Without `--cues` they read `test/fixtures/cues.json`, the records `MODEL` was fitted on, and say so on stderr. After a kit or spec change that fixture still holds the old cue lists until step 3 of BIBLE.md §11.1, so a refit must pass a fresh dump. An unknown flag stops the tool. Id prefixes on the command line (`09b 10b`) limit a run to those teasers.

## What is fitted, and what is designed

| Value | Where | How it is set |
|---|---|---|
| `MODEL.C`, `MODEL.tiltUp`, `MODEL.tiltDn` | `balance.mjs` | Fitted by `fit.mjs` + `fitsolve.py`: the music stem before the trim, `M = C + duck cost + tiltUp·max(0, tilt) + tiltDn·max(0, -tilt)`. `tiltDn` (2026-10-13) is the loudness the bright side of the tilt adds (the toys up by \|tilt\| dB); without it 02a's and 08c's music came out 0.7-0.8 dB over the prediction and the residual's spread was 0.42 dB, with it 0.27 |
| `MODEL.a`, `MODEL.b` | `balance.mjs` | Fitted the same way: the master-gain prediction, `mix power = (1 + a)·M + b·U`. Since 2026-10-13 `b` is fitted against the plan's own U (`Upred`, the value `musicTrim` feeds it), not the engine's: the plan's render reads 0.4-1.3 dB over the engine's stem (merges, and the payoff splash it leaves out), and fitting on the engine's U biased every predicted gain 0.3 dB low (05b, 06c, 03a 0.7-0.9 dB), so the cards came out too loud (B8). The card (its SFX and the logo) is trimmed against the predicted gain |
| `MODEL.iBias` | `balance.mjs` | Fitted by `fitsolve.py`: the mean of the engine's gated SFX stem minus the plan's own render of it (merges drop transients and low bodies). Since 2026-10-13 `fit.mjs` also renders each teaser without the payoff splash (`In`) and `fitsolve.py` takes the mean of `In - Ipred`: the splash (0-0.9 LU off the SFX stem) is a designed hand-off of the hit's crash to the band's, not a measurement bias, and the plan leaves it out on purpose |
| `MODEL.dIS`, `dISTilt`, `dISTiltMax`, `trimLo`, `trimHi` | `balance.mjs` | Designed: the music sits `dIS` LU under the gated SFX, up to `dISTiltMax` dB nearer for a strongly tilted SFX spectrum or a crowded 1 kHz octave (`CROWD`); the trim is clamped to ±3 dB |
| `CROWD.ref`, `CROWD.k` | `balance.mjs` | Designed (2026-10-12): the reference-octave crowding. `crowd` is the cues' long-term 1 kHz-octave power over the body re their gated loudness (the plan's SFX render; `trims.mjs` prints it). Above `ref` the music comes `k` (1.0) dB nearer per dB, taking the larger of this and the tilt term, under the same 2 dB cap. `ref` was 54.5, so that it bit only where bells owned the octave every §9.2 band is measured against (06c 56.5, 07c 57.4, 09b 58.1). Since 2026-10-13 it is 53: the condensed cuts put more bells per second into that octave, and 01b (53.6), 01c (54.0), 03a (53.7) and 04b (55.5) sat with their 250 Hz octave 0.0-0.2 dB over its floor. 08b (51.3), 09a (52.4) and every bright-tilted teaser keep their tilt term. Not touched by a refit: `fit.mjs` renders at a fixed trim |
| `MODEL.gRef`, `MODEL.cardMax` | `balance.mjs` | Designed: the card trim, `card = clamp(gRef - predicted gain, -1.5, cardMax)`. With the card in its linear range the logo lands at about `gRef - 17.9` LUFS momentary (B8's M(L+0.2)), -12.2 at 5.7. Until 2026-10-13 the card went up to +1.0 for a low predicted gain; a dense body (low gain) then put the sting over a payoff that the same low gain had lowered (05b's logo 0.3-0.9 dB over its payoff). `cardMax` is -0.75: at 0, 05b's logo still sat only 0.25 dB under its payoff in the master, and the encoder's dips at the payoff's transient took 0.65 dB more off the payoff in the delivery. -0.75 is the middle of B8's window on the look's two edge cases, 05b's payoff (the quietest) and 04b's logo (nearest the -13 floor); it moves only the teasers with a predicted gain under gRef + 0.75 (04b, 05b). Changing either moves cards: check B8 in `verify` |
| `PAYOFF_LIFT` | `balance.mjs` | Designed (2026-10-13): when the leveller cannot bring the SFX stem down to `SFX_TARGET` (its caps protect the cues B3 listens to), the payoff's own cues (P - 0.3 .. P + 0.35 s) stand up by the excess, at most 1 dB, so the payoff keeps its height over a dense body (05b: 0.9 dB) |
| `OWN`, `PAYOFF_OWN` | `balance.mjs` (used by `compose.mjs`) | Designed (2026-10-13): the 50 ms a cue B3 listens to owns (bible §9.3 B3), and the 1.2 s after P in which such a cue is the payoff's own (the band keeps the payoff duck under its first 50 ms) |
| `SPLASH`, `RING` | `sfx.mjs` | Designed (2026-10-13): the payoff hit's crash, and a ding stacked on it, are choked 0.3 s after P (τ 80 ms), left out of the plan; body dings and the crash of a big hit away from P ring τ × clamp(base / 20, 0.5, 1), visible to the plan. See the look README, "Short and dense bodies" |
| `CLIMB`, `LOW`, `SPREAD`, the TENSION octaves | `compose.mjs` | Designed (2026-10-13): the hook settle and the BUILD crescendo (B7), the bass's dull lift yielding to the cues' landings (§9.2 125 Hz), the velocity-spread guard (S8), the TENSION walk's octave pump (§9.2 250 Hz). See the look README |
| `SFX_TARGET`, `RANGE`, `MAX_TRIM`, `MAX_TRIM_AUDIBLE` | `balance.mjs` | Designed: the SFX leveller (the gated SFX stem pinned to -22.9 LUFS pre-master, riding only the top 14 dB of moments, at most 6 dB, 3 dB for a cue B3 listens to) |
| `TILT_REF` and the tilt slopes | `balance.mjs`, `compose.mjs` | Chosen with the level optimiser (`opt.py`) |
| Voice levels | `mix.mjs` | Chosen with the level optimiser, then by ear |

## Refit `MODEL` (after any change to levels, sends, ducks, the arrangement, the SFX renderers, or a cue list)

The same commands as BIBLE.md §11.2:

```bash
node src/cli.mjs cues specs/*-becker-rig-*.json --out /tmp/snd-br/cues.json                 # today's records: the fixture may hold the old ones
node looks/becker-rig/sound/tools/fit.mjs --cues /tmp/snd-br/cues.json > /tmp/fit.jsonl     # every Becker teaser at trim 0, twice (with and without the payoff splash; about 10 min; split by id prefixes to run in parallel)
python3 looks/becker-rig/sound/tools/fitsolve.py /tmp/fit.jsonl                              # needs numpy: prints a, b, C, tiltUp, tiltDn, iBias and the residuals
```

1. Copy the printed `a`, `b`, `C`, `tiltUp`, `tiltDn` (and `iBias`) into `MODEL` in `balance.mjs`. This changes the audio of every Becker teaser.
2. Check the prediction: `node looks/becker-rig/sound/tools/trims.mjs --cues /tmp/snd-br/cues.json` prints each plan's predicted master gain (`gain`); compare it with `master.gainDb` in the build's `<id>.report.json`.
3. Run `npm run sound:verify`. It prints a `CUE DRIFT` block until the fixture is updated; that is expected here.
4. When everything passes, finish with BIBLE.md §11.1 steps 3-7: store the records (`node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`), regenerate the tempo table (`node sound/tools/tempo-table.mjs --write`), update Appendix A's pins if 09b, 02a or 10b moved, `npm test`, record the change, then ship (§11.5, which rewrites the baseline). Say in the commit which masters changed.

**State on 2026-10-13, refit, not shipped.** Seven condensed cuts (01b, 01c, 02a, 03a, 04b, 05a, 05b) moved their cue records, and the pack gained the short- and dense-body rules (look README, "Short and dense bodies"), so `MODEL` was refit on a fresh dump of the 15 records. The fit itself changed in three ways, all in `fit.mjs` / `fitsolve.py`: the music model has a `tiltDn` term (the toys' bright lift), `b` is fitted against the plan's own U, and `iBias` is measured on the SFX stem rendered without the payoff splash. Round 1 (after the TENSION octaves, the payoff bell and the model terms) gave C -23.80, tiltUp 0.98, tiltDn 0.41, a 0.067, b 0.918, iBias -0.44, which `MODEL` now holds (iBias stays -0.42: within its spread, sd 0.10-0.12). The rules added after it (the crash ring, `cardMax`, the crash and timpani dips, `RING.ref` 25) were checked with a third round: C -23.80, tiltUp 0.97, tiltDn 0.40, a 0.081, b 0.875, iBias -0.47, which moves the predicted music level by -0.01 dB on average (at most 0.02) and the predicted pre-master mix by -0.035 dB (at most 0.09), under the 0.05 dB tolerance, so this is the fixed point. The clap rule at P came last; it changes one clap under the payoff duck and was not refit. The music-stem residual's spread fell from 0.42 to 0.27 dB with `tiltDn`, and the master-gain fit error is -0.28 to +0.11 dB at trim 0. `verify --detail` on the fresh dump (`/tmp/snd-short-becker-rig/after.txt` in the sound pass): 14 of 15 Becker teasers pass every gated check; 02a fails B7's halves by construction (look README). The tightest BANDS margins are 09a 2 kHz 0.2 dB (0.1 before), 03a 125 Hz 0.4, then 01b 2 and 8 kHz at 0.5 and 02a 2 kHz and 250 Hz and 09b 2 kHz at 0.6. Then: §11.1 steps 3-7 (store the records, regenerate the tempo table, `npm test`, record, ship).

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
