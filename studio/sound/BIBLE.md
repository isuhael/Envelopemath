# Sound bible: Back of the Envelope (@envelopemath)

The sound brief for the 30 teasers. They are posted **with no narration**, so music and sound effects carry the whole video. The on-screen notation does the talking. The sound puts weight under each number and gives the viewer the satisfaction of a result landing. The owner wants a **full sound design pass**.

Who uses this document:
- **The engine author** builds the shared parts: timeline analysis, the tempo map, DSP, the mixer, the master and the outputs (§2, §8, §10).
- **Two sound designers** each build one look pack: Scoreboard (§3, §4, §5) and Becker Rig (§3, §6, §7).
- **The critics** judge the result against §9 only. Every rule there can be measured, and `npm run sound:verify` measures it.
- **The maintainer** changes a kit, a spec, a pack or the engine without breaking the 30 delivered teasers (§11).

Nobody in this pipeline can hear. Quality has to be designed in by rules, then shown by measurements, spectrogram PNGs and the symbolic score. When a rule here conflicts with taste, follow the rule and file a note. When a number here proves wrong under measurement, change this file **and `sound/acceptance.json`** in the same pass and say why (§9.0).

Status: v2.2, 2026-10-12.
- v1 (2026-10-11) was the brief. The cue data, tempo table and card times below were measured on the kits then (`specs/*.json` with the real brand, a 2.5 s card); `test/fixtures/cues.json` held those records unchanged until v2.2 replaced 06c's. §0's counts are still v1's.
- v2 makes this file match what was built and what passes. §9 now equals `sound/acceptance.json`, threshold for threshold. The seven values that passed but differed from v1 are now this text, and one owner decision is pending (A8's correlation target for Becker Rig, §9.1). Each look's deliberate deviations from v1 are in the text where they are now the design, and the rest are in the "As built" lists (§4.7, §6.7). Two engine features are new: the react bus (§8.3.1) and the AAC first-frame handling (§8.6). §11 says how to change things safely.
- On 2026-10-12 all 30 teasers passed every gated check (42/42 each), and both looks' unit checks passed (Scoreboard 69/69, Becker Rig 77/77).
- v2.1 (2026-10-12, maintenance; no rule or threshold changed). §11 says what to do when the cue records move, in order, including the tempo-map vectors. The §2.3 rows are now the only copy of those vectors: `test/sound.test.mjs` reads them from this file. Appendix B also computes L (§2.4) and prints the rows exactly, and `sound/tools/tempo-table.mjs` regenerates them from it. `verify`, `render`, `audio` and `sound` report cue drift. §8.6 step 9 separates the built audio from what `renders/channel/` delivers. Becker's stale `MODEL` is an owner decision before the next ship (§11.2).
- v2.2 (2026-10-12, shipped). 06c's condensed cut (18.2 s: a 15.7 s body and the card; it was 30.5 s) was promoted into `specs/`, so its cue record moved (36 cues, was 41) and so did its §2.3 row: P 13.000 by the riser rule, N₁ 25 (a 1-beat pickup) at 115.385 BPM, base 15.70 after 5 beats at 111.11, L 16.20 (it was P 20.400, 40 beats at 117.647, base 28.00, L 28.50). No other row and no Appendix A value moved. Becker's `MODEL` was refit on the new records (§11.2: C −23.37, a 0.061, b 1.165, tiltUp 0.63, iBias −0.42), which settles that owner decision. Becker's music trim gained one rule, the reference-octave crowding (§6.7 item 4): 06c's two dings and two coins owned about half of its 1 kHz octave, and its 250 Hz octave sat 0.2 dB over its BANDS floor. The rule moves 06c, 07c and 09b, and 06c's octaves now sit at least 0.8 dB inside every window (250 Hz: +1.0). No threshold changed, and Scoreboard's calibration still sits at its fixed point (§11.2). All 30 teasers pass 42/42 with `--strict-cues`, and the units pass 69/69 and 77/77. The build went into `renders/channel/` by §11.5 and the baseline was rewritten (§11.4). A8's Becker Rig target is still the owner's call (§9.1). §8.1, §8.6 and §9 quote this build's measurements. Later that day 06c's picture was re-rendered for its opening: Becker Rig's pov-race now has the figure weigh the coin before the first purchase (`heft`), so its first 0.43 s no longer hold still. No cue moved, so there was no refit and no §2.3 change. It shipped by §11.5: every master equals the baseline, and only 06c's video stream changed. §11.2 now lists the tightest BANDS margins.

---

## 0. What we are replacing, and the hard constraints

**Today:** `src/audio.mjs` synthesises 15 mono SFX kinds from sine blips and filtered noise. The kits cue them through `ctx.cue(t, kind, opts)`, which reaches Node as `info.sfx`. The track is mixed for a voice-over that will never come:
- integrated loudness −21.7 to −26.9 LUFS, true peak about −4 dBTP
- mono, with no music
- 40-80% of most teasers below −45 dB; 04b is silent for 83% of its length, and 04a has a 10.2 s gap

**What the kits emit** (all 30 specs, counted from `info.sfx`):

| Look | Cues | By kind |
|---|---|---|
| Scoreboard (15 specs) | 385 | tick 93, thud 69, ding 63, roll 43, pop 37, cash 16, hit 14, reveal 13, swipe 12, riser 10, whoosh 4, buzz 1 |
| Becker Rig (15 specs) | 409 | thud 81, tick 72, swipe 64, pop 64, hit 54, ding 32, whoosh 31, cash 16, step 16, roll 13, type 7, riser 6, buzz 4, boing 3 |

- Cue gains run 0.14-1.0.
- Durations: `roll` 0.45-2.35 s, `riser` 0.58-2.82 s, `swipe` 0.12-1.09 s, `whoosh` 0.18-0.80 s, `type` 0.33-0.70 s.
- The densest 1 s window holds 7 cues (05a, 02c). The longest cue-free stretch is 10.47 s (04a, 16.83-27.30 s).
- One cue starts before t = 0 (09c: `ding` at −0.05).

**Card cues** (2.5 s card, t0 = `info.base`):
- **Scoreboard** (`looks/scoreboard/cta.js`): `pop` at t0 + 0.06 (the badge pops in and lands by t0 + 0.36), `thud` at t0 + 0.46 (the CTA line slams in), `roll` from t0 + 0.94 for 0.50 s (the handle's letters), `ding` at t0 + 1.44.
- **Becker Rig** (`looks/becker-rig/cta.js`): `whoosh` at t0 (the figure dashes in), `hit` at t0 + 0.50 (the badge slams onto the floor, snapped to a frame), `pop` at t0 + 0.58 (the main line), `ding` at t0 + 0.92 (the handle).

**Hard constraints:**
1. **Everything is synthesised in code.** No samples, no downloaded audio, no third-party melodies.
2. **Same spec in, bit-identical master WAV out.** Use seeded RNG only: no `Math.random`, no clock, no unordered parallel sums.
3. **The picture is final.** Never touch a kit, a spec, a caption or a cue time. Every SFX starts at its cue time; the only exception is the pre-roll layers named in §5/§7.
4. **The new MP4s keep the video stream bit-identical.** Audio is re-muxed with `-c:v copy` (§8.6). Do not write into `renders/channel/` until the final stage says so. Work in `/tmp/sound/...` or the scratch dirs. The CLI enforces this: every sound command refuses an output inside `renders/channel/` unless `--final` is passed, and `verify` never writes there.
5. **Keep the checks green.** `node src/cli.mjs check` stays at 30/30 clean and `npm test` stays green. Keep the legacy `mix()`/`KINDS` exports in `src/audio.mjs`, because the test imports them. The new engine lives beside it.
6. **Node ≥ 20 ESM.** ffmpeg is used only for encoding, muxing and measuring, never as an effect in the master chain. Every effect is coded in JS, so the result does not depend on the ffmpeg build. The encoder's silent pre-roll (§8.6 step 9) is part of the encode: it adds silence in front of the finished master and drops those frames afterwards, so the master is never processed.

---

## 1. Conventions (everyone)

| Thing | Rule |
|---|---|
| Sample rate | 48 000 Hz. Render internally in Float64 math into Float32 buffers |
| Channels | Stereo. Pan law: constant power, `L = cos(θ)`, `R = sin(θ)`, θ = (pan + 1)·π/4, pan in [−1, +1] (−100%..+100%) |
| Time | Seconds as float. The sample index is `Math.round(t * 48000)`. Every event is placed sample-exactly |
| Pitch | 12-TET, A4 = 440 Hz, MIDI numbers, `f = 440 · 2^((m − 69)/12)` |
| Level | dBFS peak unless the text says RMS or LUFS. "Gain" on a cue is a linear amplitude factor on top of the recipe's level (as today) |
| Seeds | `seed(specId, stream) = FNV-1a-32("<specId>|<stream>")`, fed to the existing mulberry32 `rng()`. Streams: `arr` (arrangement choices), `hum` (humanising), `sfx:<cueIndex>` (one per cue), `noise:<instrument>:<noteIndex>`, `verb:<bus>`. Never share a stream between layers. Never draw a data-dependent number of values from a stream that another layer also uses |
| Order | Sum voices in a fixed order: events sorted by (t, bus, instrument, midi, index). With workers, sum the partial buffers in index order |
| Phase | Every oscillator starts at phase 0, except where a recipe says otherwise. Pitch glides accumulate phase sample by sample: `ph += 2π·f(t)/48000`. Never use `sin(2π·f(t)·t)` |
| Anti-click | Every voice has an attack ≥ 1 ms (drum transients ≥ 0.2 ms) and a release ≥ 5 ms, unless it ends in silence by its own decay to < −90 dB |
| Denormals | Flush filter states with `|x| < 1e-25` to 0 |

Note names used below, with Hz: D1 36.71 · A1 55.00 · Bb1 58.27 · C2 65.41 · D2 73.42 · F2 87.31 · G2 98.00 · A2 110.00 · D3 146.83 · A3 220.00 · D4 293.66 · F#4 369.99 · A4 440.00 · D5 587.33 · E5 659.26 · A5 880.00 · D6 1174.66 · F6 1396.91 · F#6 1479.98 · A6 1760.00 · D7 2349.32.

**Key centre (channel rule):** every teaser of both looks is centred on **D**, and nothing is transposed per teaser.
- Scoreboard is in **D minor** (Aeolian; A major/A7 as the dominant).
- Becker Rig is in **D major** (Ionian; C natural allowed as Mixolydian ♭VII).
- The sonic logo always lands on **D major add9**.
- Every teaser's music ends its body on the dominant (A), so the logo is the resolution. For Scoreboard this is a minor-to-major (Picardy) arrival on purpose: *the math resolves*.

Variety between teasers comes from tempo, progression choice, arrangement and seeds, not from key. A shared key across the channel is part of the brand.

---

## 2. The timeline (engine): what the music hangs on

The engine turns the mounted spec into a **timeline** before any pack runs. Inputs come from `openSpec`:
- `info.sfx`, `info.base`, `info.duration`, `info.fps`, `info.brand.{t0, dur}`
- the spec's `id`, `look`, `vo` and `verdict`

No kit changes are needed. An optional `studio/sound/overrides.json` (`{ "<spec id>": { "payoff": t, "verdictAnchor": false } }`) can force an anchor without touching a spec. It starts empty.

### 2.1 Cue preparation

- **Negative times:** cues with −0.10 ≤ t < 0 play whole at t = 0. Cues with t < −0.10 are dropped.
- **Occurrence index:** each cue gets `n`, its index among cues of the same kind (round-robin variation), and `i`, its global index (the RNG stream).
- **Clock trains:** ≥ 6 cues of the same kind with constant spacing (±6 ms) form a **train** `{ period, k }`. Found today: ticks every 1.000 s in 10a and 10c, every 0.832 s in 10b, every 0.35 s in 02b and every 0.20 s in 02c; thuds every 0.5 s in 02a; swipe+thud throws every 2.0 s in 09b.
- **Coincident cues:** cues within 15 ms of each other form a **cluster**. A cluster renders by the merge rule in §8.4.

### 2.2 The payoff P (the main downbeat)

Look only at cues with 1.0 ≤ t < base − 1.0; risers and hits must both lie in that window. `spec.verdict.t`, when present, is always a candidate. Every candidate gets a score:

| Candidate | Score |
|---|---|
| `overrides.json` payoff | 7 |
| **Riser climax**: the first `hit`/`cash`/`reveal` in [riser.t + riser.dur − 0.25, riser.t + riser.dur + 0.80] (both looks cue "riser, then hit + cash" for the biggest number) | 6 |
| **Verdict with a hit**: `spec.verdict.t` when a `hit` lies within ±0.05 s of it | 5 |
| **Hit + cash**: a `hit` followed by a `cash` within 0.15 s | 4 |
| **Verdict alone**: `spec.verdict.t` | 3 |

P is the candidate with the highest score. A tie goes to the later one. Log the result as `P = t (rule)`.

### 2.3 The tempo map

All tempo maths runs in float64. Each segment is constant tempo, and every anchor lands exactly on a bar line.

| Look | Segment 1 range | Target | Sync grid | Absolute limits (later segments) |
|---|---|---|---|---|
| Scoreboard | 136-152 BPM | 144 | 16ths | 128-160 |
| Becker Rig | 112-128 BPM | 120 | 8ths | 104-136 |

**Segment 1 [0, P].** Pick an integer number of beats N₁ with BPM₁ = 60·N₁/P inside the look's range. For each candidate:

```
sync   = Σ over cues c with 0 ≤ c.t < P − 0.01 and c.kind in W:
           W[c.kind] · max(0, 1 − δ_c / 0.035)          // δ_c: distance (s) from c.t to the nearest sync-grid point
           W = { hit 3, reveal 3, thud 2, ding 1.5, cash 1, step 1, pop 1, tick 0.5, swipe 0.5 }
score  = sync − 0.5·|BPM₁ − target| − (N₁ % 4 == 0 ? 0 : N₁ % 4 == 2 ? 4 : 8)
```

- The highest score wins. A tie goes to the smaller N₁.
- The grid's beat 0 is t = 0.
- With r₁ = N₁ % 4 ≠ 0, **bar 0 is a pickup bar of r₁ beats**. Every later bar has 4 beats, so P is a downbeat.

**Later segments: pick(a, b).** For a segment [a, b], search integer N with BPM = 60·N/(b − a) inside both ±8% of BPM₁ and the look's absolute limits. Pick the lowest

```
cost = |BPM − BPM₁| / BPM₁ · 100 + (N % 4 == 0 ? 0 : N % 4 == 2 ? 2.5 : 4)
```

A tie goes to the smaller N. The remainder r = N % 4 becomes a **break** of r beats directly before the segment's end (§4.5, §6.5).

**Verdict anchor V = `spec.verdict.t`.** Anchor it only if all three hold:
- V − P ≥ 4 beats at BPM₁
- `pick(P, V)` and `pick(V, base)` both return a solution
- **both chosen** tempos are within ±5% of BPM₁

Otherwise use a single segment from `pick(P, base)`. Choose first, then test against ±5%; do not search a ±5% window. If even `pick(P, base)` has no solution, base is left free: the music holds the cadence chord until base. That never happens with today's specs.

**Reference result** for the cue records in `test/fixtures/cues.json`. These rows are the test vectors: `test/sound.test.mjs` reads them from this table, and the engine must reproduce them with P and the anchors exact, the BPMs within 0.01 and L within 0.006. Appendix B prints them. When the records change, regenerate the rows with `node sound/tools/tempo-table.mjs --write` (§11.1); never edit them by hand.

| Spec | P rule | P (s) | N₁ (pickup) | BPM₁ | Later segments: beats (remainder) @ BPM | Logo land L |
|---|---|---|---|---|---|---|
| 01a | riser | 14.500 | 36 (r0) | 148.966 | V 20.50: 15 (r3) @ 150.00 · base 24.50: 10 (r2) @ 150.00 | 24.86 |
| 01b | riser | 12.450 | 24 (r0) | 115.663 | V 19.30: 13 (r1) @ 113.87 · base 24.00: 9 (r1) @ 114.89 | 24.50 |
| 01c | riser | 15.900 | 32 (r0) | 120.755 | V 20.40: 9 (r1) @ 120.00 · base 25.30: 10 (r2) @ 122.45 | 25.80 |
| 02a | verdict+hit | 10.700 | 20 (r0) | 112.150 | base 13.40: 5 (r1) @ 111.11 | 13.90 |
| 02b | verdict | 10.700 | 26 (r2) | 145.794 | base 14.00: 8 (r0) @ 145.45 | 14.36 |
| 02c | verdict | 10.000 | 24 (r0) | 144.000 | base 13.00: 7 (r3) @ 140.00 | 13.36 |
| 03a | verdict+hit | 31.000 | 62 (r2) | 120.000 | base 37.20: 12 (r0) @ 116.13 | 37.70 |
| 03b | verdict | 25.800 | 62 (r2) | 144.186 | base 30.60: 12 (r0) @ 150.00 | 30.96 |
| 03c | verdict | 22.000 | 52 (r0) | 141.818 | base 29.80: 18 (r2) @ 138.46 | 30.16 |
| 04a | riser | 36.400 | 86 (r2) | 141.758 | V 42.50: 14 (r2) @ 137.70 · base 45.50: 7 (r3) @ 140.00 | 45.86 |
| 04b | hit+cash | 24.300 | 48 (r0) | 118.519 | base 36.00: 24 (r0) @ 123.08 | 36.50 |
| 04c | riser | 24.790 | 60 (r0) | 145.220 | V 33.50: 21 (r1) @ 144.66 · base 36.50: 7 (r3) @ 140.00 | 36.86 |
| 05a | verdict+hit | 21.200 | 40 (r0) | 113.208 | base 24.70: 7 (r3) @ 120.00 | 25.20 |
| 05b | hit+cash | 18.200 | 36 (r0) | 118.681 | base 22.10: 8 (r0) @ 123.08 | 22.60 |
| 05c | hit+cash | 9.130 | 22 (r2) | 144.578 | V 17.00: 19 (r3) @ 144.85 · base 22.80: 14 (r2) @ 144.83 | 23.16 |
| 06a | riser | 21.400 | 52 (r0) | 145.794 | base 26.50: 12 (r0) @ 141.18 | 26.86 |
| 06b | riser | 15.900 | 40 (r0) | 150.943 | base 18.30: 6 (r2) @ 150.00 | 18.66 |
| 06c | riser | 13.000 | 25 (r1) | 115.385 | base 15.70: 5 (r1) @ 111.11 | 16.20 |
| 07a | riser | 12.000 | 30 (r2) | 150.000 | V 18.10: 16 (r0) @ 157.38 · base 22.80: 12 (r0) @ 153.19 | 23.16 |
| 07b | hit+cash | 16.900 | 34 (r2) | 120.710 | base 27.40: 21 (r1) @ 120.00 | 27.90 |
| 07c | hit+cash | 12.900 | 26 (r2) | 120.930 | base 19.10: 12 (r0) @ 116.13 | 19.60 |
| 08a | riser | 14.770 | 36 (r0) | 146.242 | V 18.40: 9 (r1) @ 148.76 · base 22.00: 9 (r1) @ 150.00 | 22.36 |
| 08b | verdict | 21.800 | 44 (r0) | 121.101 | base 27.00: 10 (r2) @ 115.38 | 27.50 |
| 08c | verdict+hit | 17.350 | 36 (r0) | 124.496 | base 22.00: 10 (r2) @ 129.03 | 22.50 |
| 09a | riser | 19.400 | 40 (r0) | 123.711 | V 24.20: 10 (r2) @ 125.00 · base 28.50: 9 (r1) @ 125.58 | 29.00 |
| 09b | riser | 17.800 | 36 (r0) | 121.348 | base 27.00: 18 (r2) @ 117.39 | 27.50 |
| 09c | riser | 19.120 | 46 (r2) | 144.351 | V 25.60: 16 (r0) @ 148.15 · base 31.50: 14 (r2) @ 142.37 | 31.86 |
| 10a | riser | 32.511 | 80 (r0) | 147.642 | base 36.50: 10 (r2) @ 150.41 | 36.86 |
| 10b | riser | 33.300 | 68 (r0) | 122.523 | base 36.60: 7 (r3) @ 127.27 | 37.10 |
| 10c | riser | 26.403 | 66 (r2) | 149.983 | base 31.00: 12 (r0) @ 156.62 | 31.36 |

Tempo only ever changes at P or V, each under a hit and a section change, so it never reads as drift. Base lands exactly on a beat, and the card's hard cut follows.

### 2.4 The card anchor L (the logo land)

- **Scoreboard:** L = (first `pop` in [t0, t0 + 0.25]).t + 0.30·k, with k = clamp((cta.dur − 0.8)/1.7, 0.6, 1) (the card's own time scale). For a 2.5 s card, L = t0 + 0.36.
- **Becker Rig:** L = (first `hit` in [t0, t0 + cta.dur]).t. For a 2.5 s card, L = t0 + 0.50, already snapped to a frame.
- **Generic runtime card** (no kit card): L = t0 + 0.30.

### 2.5 Sections (default sectioning; packs fill them, never move them)

1. **HOOK:** bar 0, plus bar 1 when bar 0 is a pickup bar.
2. **TENSION** (the pre-payoff riser):
   - If P came from the riser rule, it starts on the beat nearest to riser.t (a tie goes to the earlier beat).
   - Otherwise it covers the last 8 beats before P (Scoreboard) or the last 4 beats (Becker Rig).
   - It is at least 2 beats long.
   - Its start is never before the HOOK end.
3. **BUILD:** HOOK end to TENSION start.
   - Split it into 4-bar phrases from the HOOK end; the last phrase may be short.
   - Energy steps E3 → E4 at the bar line nearest the BUILD's time midpoint (a tie goes to the earlier bar line).
4. **DROP:** P to min(P + 2 bars, the start of the BREAK before V (or V itself) if V is anchored, base − 1 bar). If that leaves less than 1 bar, the DROP is min(P + 1 bar, that BREAK or V, base) instead. With 01a, for example, the DROP is 2 bars, then a 1-bar HOLD, a 3-beat BREAK and V. 02a, 06b and 06c have 5-6 beats from P to base, so each has a 1-bar DROP and a short CADENCE.
5. **HOLD:** DROP end to the next anchor (V or CADENCE). With V anchored:
   - BREAK: the r beats before V, if r > 0
   - VERDICT: 1 bar from V
   - HOLD 2: on to CADENCE
6. **CADENCE:** the last full bar before base plus any remainder beats. It starts later if the DROP (or, with V anchored, the VERDICT bar) ends later, so it can be only the remainder beats (06b: 2 beats).
7. **CARD:** base to duration.

A HOLD longer than 4 bars with no cue of weight ≥ 1 becomes a **mini-build**: energy +1 every 4 bars, capped at E4.

**Progression alignment (both packs).** A section shorter than its progression handles it in one of three ways:
- **Start-aligned** (first n bars): BUILD phrases, DROP, and a HOLD that is followed by the CADENCE.
- **End-aligned** (last n bars, so it ends on the dominant): a HOLD or BREAK that ends at V.
- **HOLD 2** (after the VERDICT bar) starts on the HOLD progression's 2nd chord, because the VERDICT bar already took the tonic.
- **Longer sections** cycle the progression from its start.

### 2.6 Density map

Per beat, the **SFX load** is Σ gain·w over cues inside the beat:
- w: tick 0.5, type 0.5, pop 0.5, swipe 0.5, whoosh 0.5, step 0.5, thud 1, ding 1, buzz 1, boing 1, cash 1.5, hit 2, reveal 2
- `roll` adds 2 per 0.25 s it is active

Each beat is then tagged:
- **dense:** load ≥ 1.5, or a roll is active
- **sparse:** load = 0 for this beat and the previous one
- **cueBar:** the bar holds a cue of weight ≥ 1

### 2.7 What the engine exposes to packs

`tl` exposes:
- `{ id, look, fps, duration, base, card: { t0, dur, k, L }, cues, trains, clusters, vo, verdict }`
- `anchors: { P: { t, rule }, V | null, base }`
- `tempo` (segments), `bars: [{ i, t, beats, bpm, section, energy, dense, sparse }]`
- `beatAt(t)`, `timeAt(beat)`, `barAt(t)`
- `chordAt(t)` and `keyAt(t)`, which read the pack's harmony plan

---

## 3. Channel sonic identity: the "em sting"

### 3.1 The motif (identical in both looks)

| Note | Pitch | Onset | Gate | Velocity | Pan |
|---|---|---|---|---|---|
| n1 | **A4** (69, 440.00 Hz) | L − 0.300 s | 85 ms | 0.70 | −20% |
| n2 | **D5** (74, 587.33 Hz) | L − 0.200 s | 85 ms | 0.78 | 0 |
| n3 | **E5** (76, 659.26 Hz) | L − 0.100 s | 85 ms | 0.86 | +20% |
| n4 | **A5** (81, 880.00 Hz) | **L** | rings 1.30 s | 1.00 | 0 |

- **The shape:** a fourth up, a step up, a fourth up (scale degrees 5-1-2-5). Three quick pickups land on a long note, "da-da-da-DAAA", about 1.6 s from first pickup to the end of the ring.
- **The melody has no third, so it sits over either look's dominant.** The **D major add9** chord under n4 supplies the bright third: D2 sub, D3, A3, E4, F#4.
- **The echo:** n4 repeats at L + 0.375 s (−10 dB) and L + 0.750 s (−18 dB), low-passed at 3 kHz.
- **The reverse swell:** a reversed crash of 0.60 s, ending exactly at L, peaks at −12 dB re n4. It is part of the logo layer, so it may start before base.
- **The handle ding completes the smile.** The card's `ding` is pitched **F#6 + A6** (the major 3rd and 5th): Scoreboard at about L + 1.08, Becker at about L + 0.42.
- **Shorter cards:** if L − 0.30 < t0, the pickups start at t0 and are spaced (L − t0)/3.

### 3.2 Orchestration per look

| Layer | Scoreboard "LED fanfare" | Becker Rig "toy fanfare" |
|---|---|---|
| n1-n3 | SB-Laser lead (§4.3), plus the SB-Arp pluck an octave down at −9 dB | BR-Mallet marimba (§6.3), plus BR-Pizz an octave down at −8 dB |
| n4 | **Neon brass:** 3 PolyBLEP saws (±9 cents); 24 dB LP whose envelope runs 1.2 kHz → 5 kHz over 15 ms, then → 2.2 kHz over 600 ms; amp A 3 ms then exponential decay to −40 dB at 1.3 s. Octave A4 under it at −6 dB | **BR-Glock A5** (τ 1.4 s), plus a BR-Honk brass stab voiced D4 F#4 A4 D5 (amp A 12 ms, D 400 ms, S 0.35, R 600 ms) |
| Chord | SB-Glass pad, D add9 (D3 A3 E4 F#4), A 10 ms, held to the card end | BR-Warm pad, same voicing, A 10 ms, held to the card end |
| Low end at L | SB-808 on D2, diving from D3 over 40 ms, τ 0.9 s | Timpani D2 (§6.3), τ 1.2 s |
| Space | Hall send −8 dB; ping-pong echo as above | Hall send −10 dB; echo on the glock only |
| Crash | Crash at L, −6 dB re n4 | Crash at L, −6 dB re n4 |

**The card's low end belongs to the logo.** Card SFX that land within 0.15 s of L (Becker `hit`; Scoreboard `thud` at L + 0.10) drop their body layer and keep only transient, slap and air.

**Card SFX** are all pitched to the logo chord:
- Scoreboard `pop` at L − 0.30: transient and air only, no pitch, −6 dB, so n1 carries the pitch.
- Scoreboard `roll`: blips walk D6 → E6 → F#6 → A6 and repeat, ending on A6.
- Becker `pop`: a D6 bloop.
- Both `ding`s: F#6 then A6 (+70 ms).

**The logo's level is set per teaser** (B8 wants momentary loudness at L + 0.2 s ≥ −13 LUFS and not over the payoff's). The master gain differs by teaser (6.3-9.0 dB across the Becker teasers), so a fixed sting level would land anywhere. Each pack predicts its teaser's master gain and scales the sting against it:
- Scoreboard aims at −12.1 LUFS momentary (`LOGO_AT`, the middle of B8's window), from `GM_PLAN` and `LOGO_PRE` (§11.2). n4 leads its pickups: over the first 85 ms its RMS is 4.5 dB over the loudest pickup's (the LOGO unit check wants ≥ 2 dB). The sting's sustained layers dip 9 dB under the handle `ding`, and the card's own cues use constant seeds, so the card sounds the same in every teaser.
- Becker Rig trims the whole card (its SFX and the logo) by `clamp(gRef − predicted gain, −1.5, +1.0)` dB from `MODEL` (§11.2). n1-n3 are dead-stroke marimba.
- Measured on 2026-10-12: Scoreboard −11.65 to −12.57 LUFS, Becker Rig −10.44 to −12.56; every logo stays under its payoff.

### 3.3 The cadence into the card and the final tail

1. **The body's last bar is the dominant.** Scoreboard: Gm9 → A7sus4 → A7. Becker: Em7 → A7sus4 → A7 (§4.2, §6.2). Any break remainder is also dominant. A drum fill plays on the last beat.
2. **At base the body stops dead:** a 10 ms fade on every body voice. The visual is a hard cut too: the Scoreboard veil, the Becker dash.
3. **Body reverb and delay tails keep ringing, ducked −6 dB** from L − 0.30 for 0.5 s.
4. **The logo plays.** In Scoreboard the 60 ms gap between base and n1 is a breath, not silence: the tails ring through it.
5. **The final tail:** the logo pad holds at −22 dBFS RMS (pre-master), then fades out over the **last 0.40 s** with a cosine curve. The file's last sample is exactly 0.
6. **Silence:** nothing in [base, duration − 0.40] falls below −45 dBFS.
7. **Looping:** Shorts loop, and the next frame is the t = 0 hook, so the tail must end clean, not fade slowly.

---

## 4. Scoreboard music: "neon scoreboard trap"

**Lineage:**
- HD Guy: no voice, raw bass-heavy impacts, a hard cut every 3-4 s, frame 1 already moving.
- ChartOrbit: one continuous upbeat electronic track under a chart race, the biggest number in the last 5-8 s, then the video stops dead.

**Our version:** a dark minor **electro-trap** bed with half-time drums, an 808, and a 16th-note pluck "ticker" arpeggio (the data terminal). It adds arena stabs and crashes on the slams and the payoff (the sports scoreboard). It is a stadium scoreboard, not a lo-fi beat.

### 4.1 Grid, feel, key

- **Meter:** 4/4 per §2.3, with breaks. Drums are half-time: the clap is on beat 3.
- **Tempo:** per §2.3, 136-152 BPM, about 144 BPM. At 144 a beat is 0.417 s, a bar 1.667 s and a 16th 104 ms.
- **Key:** D minor. A and A7 appear only in TENSION, before an anchor and in the CADENCE.
- **Swing:** none (straight 16ths, machine-tight).

### 4.2 Harmony

**Chord vocabulary:** Dm, Dm(add9), Bb, Bbmaj7, F, C, Gm, Gm7, Gm9, A, A7, Asus4, A7sus4. Slash chords over a D pedal: Bb/D, C/D, F/D.

| Use | Progression (1 chord per bar) | Notes |
|---|---|---|
| BUILD, phrase 1 | **SB1** \| Dm \| Bb \| F \| C \| | i–VI–III–VII |
| BUILD, later phrases | seeded (`arr`) pick of SB1 or **SB2** \| Dm \| C \| Bb \| Bb \| or **SB3** \| Dm \| F \| C \| Bb \| | never the same progression 3 phrases in a row |
| DENSE bars (a roll ≥ 1.5 s or ≥ 6 cues in the bar) | keep the bar's chord, but the bass holds a **D pedal**, written Bb/D, Cadd9/D, F6/D | a steady floor under rolling counters. The pad takes the pedal's D into the chord, so the D is a tone of the sounding chord (S2 counts chord tones, not a slash bass) |
| TENSION, T beats | **Bb** for T − 2·⌈T/4⌉ beats → **C** ⌈T/4⌉ → **A** ⌈T/4⌉ (A = Asus4 for the first half, then A) | ♭VI–♭VII–V into i |
| DROP | \| Dm \| Bb \|, extended \| Gm \| A \| if 4 bars | lands on i at P |
| HOLD | \| Dm(add9) \| Bbmaj7 \| Gm9 \| A7sus4 · A7 \| | end-aligned before V, so it arrives on A7; start-aligned before the CADENCE (§2.5) |
| VERDICT bar | Dm(add9) | |
| CADENCE (last bar + break) | last 2 beats A7, the 2 before A7sus4, everything earlier Gm9 | into the logo's D major |
| Pickup bar 0 | Dm | |

**Voicings** (SB-Glass pad, 4 voices in A3-E5, MIDI 57-76, voice-led with each voice moving ≤ 5 semitones). The pack computes them with a Viterbi pass over the chord plan: every voice moves ≤ 5 st, no two adjacent voices sit a minor 2nd apart, and colour tones are kept. The list below gives the starting shapes. Some of them fall outside 57-76 or would move a voice 7 st, and the S12 check rules. Gm9 may be voiced rootless with the 808 holding G, because four voices in 57-76 cannot lead out of a Dm(add9) topped by E5 within 5 st otherwise.
- Dm: A3 D4 F4 A4
- Dm(add9): A3 D4 F4 E5 (never the E4-F4 semitone cluster in a supersaw)
- Bb: Bb3 D4 F4 Bb4
- Bbmaj7: Bb3 D4 F4 A4
- F: A3 C4 F4 A4
- C: G3 C4 E4 G4
- Gm(9): G3 Bb3 D4 A4
- A: A3 C#4 E4 A4
- A7: G3 C#4 E4 A4
- Asus4 / A7sus4: A3 D4 E4 A4 / G3 D4 E4 A4

### 4.3 Instruments (buildable)

| Name | Recipe | Register |
|---|---|---|
| **SB-808** | Sine with a pitch dive: start +7 semitones, exponential to the target, τ 35 ms (+12 st and τ 50 ms on P, t = 0 and L). **Plus a phase-locked octave partial at 0.58 before the drive**: a symmetric `tanh` makes only odd harmonics, so without it the 116-220 Hz octave that carries the 808 on phones would be missing. Amp: A 2 ms, sustain held to the note end, R 40 ms; on P the tail decays τ 0.9 s. Drive: `tanh(2.5·x)/tanh(2.5)`, then a DC blocker (1-pole HP 20 Hz), then a 12 dB LP at 1.2 kHz. Legato glide of 60 ms when the next note is ≤ 7 st away and tied: the run's first note renders the whole run as one voice (no new dive, no phase reset), and the score keeps every note. Sub layer on P and L only: sine an octave down (D1), −10 dB, τ 0.4 s, HP 28 Hz | Chord root (or the D pedal) in **MIDI 34-45** (Bb1-A2, 58-110 Hz), so its 2nd and 3rd harmonics (116-330 Hz) carry on phones |
| **SB-Kick** | Sine, pitch 160 → 48 Hz exponential, τ 30 ms. Amp A 0.3 ms, τ 160 ms, gated at 280 ms. Click: 2 ms white noise, HP 3 kHz, −12 dB. **Plus a punch sine 180 → 90 Hz at −4.5 dB** (the 90-180 Hz thump phones reproduce) **and a 3 kHz knock at −14 dB**. The tail stays at 48 Hz: it is not tuned down to D1 to fill the 31.5 Hz octave (§9.2) | |
| **SB-Clap** | 3 noise bursts at 0, 9 and 18 ms (each 6 ms, τ 3 ms), then a tail at 24 ms with τ 110 ms. All through BP 1.2 kHz (Q 0.9) plus HP 600 Hz | |
| **SB-Snare (rolls only)** | Noise BP 2 kHz (Q 0.8), τ 70 ms, plus a sine body at 185 Hz, τ 45 ms, −6 dB. During a TENSION roll the body pitch rises 0 → +7 st | |
| **SB-Hat** | Six square oscillators at 205.3, 304.4, 369.6, 522.7, 540.0 and 800.0 Hz (metal ratios), summed, BP 10 kHz (Q 1), then HP 7 kHz. Closed τ 22 ms; open τ 180 ms, choked by the next closed hat | |
| **SB-Crash** | Two independently seeded noises (L and R) through HP 3.5 kHz; plus the same six-square metal at ×2.3 frequency, −10 dB. τ 0.9 s (1.3 s on P). Reverse crash = the same envelope reversed, 0.6 s, ending at its target | |
| **SB-Arp** ("ticker") | 2 PolyBLEP saws (±6 cents) plus a square an octave down at −10 dB in E3 (−16 dB in E4, none in E5, so the low octave thins as the energy rises). 24 dB LP whose envelope runs from base cutoff × 3 down to the base cutoff with τ 120 ms, Q 1.2. Amp: a cubic 4 ms onset (a saw wraps within any 1 ms above 1 kHz, so a linear 1 ms ramp steps over U2's limit), then an exponential decay with τ 70 ms, −22 dB at 180 ms (the engine's ADSR reaches 99% at `d` and would make a 39 ms blip of "D 180 ms, S 0"); R 60 ms. Base cutoff by energy: E2 1.4 kHz · E3 2.2 kHz · E4 3.5 kHz · E5 6 kHz. Pan alternates −25% / +25% per 16th. The arp root is the chord root in MIDI 57-68, so the pattern spans **MIDI 57-86**. In E5 and TENSION it adds an octave-up copy (≤ MIDI 98) at −4 dB | **MIDI 57-86** (98 with the octave copy) |
| **SB-Glass** (pad) | 5-voice supersaw: detunes −14, −7, 0, +7, +14 cents, panned −60, −30, 0, +30, +60%, each voice with a seeded start phase. 12 dB LP at 2.2 kHz (+1.5 kHz on E5), HP 200 Hz. Amp A 30 ms in the HOOK and DROP, 200 ms elsewhere; S 1; R 300 ms | MIDI 57-76 |
| **SB-Laser** (lead) | PolyBLEP square (pulse width 30%) plus a saw at −4 dB, 2 voices ±5 cents, 12 dB LP at 3.2 kHz. Portamento 40 ms on tied notes. Vibrato 5.5 Hz ±15 cents, fading in from 250 ms after note-on | **MIDI 69-86** (A4-D6) |
| **SB-Stab** ("stadium") | 7 saws (±0, ±6, ±12, ±18 cents) voiced D3 A3 D4 F4 A4 D5 (the current chord's equivalent elsewhere); plus noise HP 2 kHz, τ 40 ms, −12 dB. Amp A 1 ms, τ 350 ms. HP 250 Hz (the 808 and the kick own the low end at the anchors). Hall send −6 dB. At P and V it plays on the react bus (§8.3.1) | |
| **SB-Riser (music)** | Only when **no** SFX riser covers the TENSION: noise BP sweeping 300 Hz → 6 kHz (exponential), amp +18 dB linear-in-dB, plus a reverse crash into P | |

### 4.4 Patterns (16 steps per 4/4 bar; step 1 = beat 1; velocity in parentheses)

| Part | Pattern |
|---|---|
| Kick K-A | 1 (1.0), 11 (0.75) |
| Kick K-B | 1 (1.0), 7 (0.7), 11 (0.8) |
| Kick K-C (4th bar of a phrase) | 1 (1.0), 4 (0.6), 11 (0.8), 15 (0.65) |
| Clap | 9 (1.0). In E5, plus 16 (0.4) every 2nd bar |
| Hats E2/E3 | 8ths, velocities 0.8 / 0.55 alternating |
| Hats E4/E5 | 16ths, accents 1.0, 0.45, 0.7, 0.45, repeating. Every 2nd bar, beat 4 is a **trap roll**: 6 hits (16th triplets) or 8 (32nds), alternating by seed, velocities 0.4 → 0.85, pitch rising +2 st per hit |
| Open hat (E5) | steps 7 and 15 (0.6) |
| 808 rhythm A (E3) | step 1, held 6 steps; step 11, held 4 |
| 808 rhythm B (E4/E5) | follows K-B; step 15 jumps an octave (2 steps); glide into the next root |
| Arp | **up**: [R, 5, 8, 10] cycled over 16ths. **up-down**: [R, 5, 8, 10, 12, 10, 8, 5]. **pedal**: [8, R, 10, R, 12, R, 10, R]. Degrees count from the chord root in the arp register. Velocity 1.0 on each beat, 0.6-0.75 off the beat. E2: the same patterns in 8ths |
| Fill (last beat of every 4th bar, unless a cue of weight ≥ 1 sits in that beat) | hat roll of 32nds, or 4 snare 16ths (0.5 → 0.8) |

### 4.5 Arrangement on the timeline

| Section | What plays (energy) |
|---|---|
| **HOOK** (t = 0) | **The board lights up**, all at exactly t = 0: SB-Stab on Dm, SB-808 D2 with the +12 st dive, kick (1.0), crash (−3 dB), and the arp from step 1. Energy E4 for the HOOK's first bar, then E3. No fade-in: the first event reaches full level within 1 ms. A pickup bar adds a 4-hit snare fill on its last beat |
| **BUILD** | Starts at E3: K-A, clap, 8th hats, arp **up**, 808 rhythm A. From the midpoint, E4: K-B (K-C on phrase ends), 16th hats with rolls, arp **up-down**, 808 rhythm B, and the lead in sparse bars (§4.6). The progression restarts at each phrase |
| **TENSION** | Kick and clap out. Hats out (the riser owns the noise band). The 808 holds the bar's root as a pedal. The pad's LP sweeps 900 Hz → 8 kHz exponentially. The arp doubles up an octave with its cutoff rising alongside. The snare roll runs 8ths → 16ths → 16th triplets → 32nds, a quarter of the section each, velocity 0.35 → 1.0, body pitch +7 st. **The gap:** from P − 1 eighth to P every music voice is released (10 ms), and only the SFX riser and the music's reverse crash sound. A 12 dB event duck over the gap takes the reverb tails down 6 dB, so the gap is a hard cut; it lets go 40 ms before P, because a near-silent hole right before a full-band drop is where the AAC encoder overshoots (02c measured +4.6 dB over the ceiling with the duck held to P). The reverse crash rides the react bus (§8.3.1), so that duck does not touch it |
| **P (the drop)** | On the downbeat, sample-exact: SB-Stab (Dm, full), 808 dive D3 → D2 plus the D1 sub, kick, clap, the pad swelling +6 dB over 1 bar. DROP runs at E5. **The crash:** when a `hit` owns P, the music's crash stays out, because the hit brings its own and three crashes in one wash blur the impact; a payoff without a hit keeps a crash with τ 1.0 s (not 1.3 s). **The stab** plays on the react bus (§8.3.1), budgeted against the anchor's cues as the SFX fader leaves them: its 50 ms power sits 7.5 dB under theirs and its peak 9 dB under, so the limiter does not eat the payoff |
| **HOLD** | Half-time E3: kick on step 1 only, clap on 9, 8th hats at −3 dB. Arp **pedal** in 8ths with its LP at 2.0 kHz. 808 whole notes. No lead during the first 2 bars after V (the verdict is being read) |
| **BREAK** (r beats before V) | Drums out. The dominant chord is held. A reverse crash ends exactly at V |
| **VERDICT** (V) | SB-Stab on Dm(add9) at −3 dB re P (react bus, budgeted like P's), crash −6 dB, kick. One bar at E4, then HOLD 2 at E3. **No music kick** when the verdict cue brings its own body (`reveal`, `hit`, `thud`): §8.4.1's "only one low body" wins over a second low transient, and the music answers with the stab, the crash and the 808 |
| **CADENCE** | E3 with the dominant progression (§4.2). On the last beat: a 16th snare fill (0.5 → 0.9). Stop at base (§3.3) |
| **CARD** | The logo (§3) |

### 4.6 How the music reacts to the cues

1. **Drums yield.**
   - A kick or clap within ±70 ms of a `thud`/`hit`/`cash`/`reveal` with gain ≥ 0.5 is removed. The SFX owns that beat, and two transients 15-70 ms apart would flam.
   - Within ±15 ms they merge: the music hit stays and the SFX drops its transient layer.
   - Anchors never yield.
2. **Rolls are the hats.** While a `roll` is active, music hats are muted and the arp drops to 8ths at −4 dB.
3. **Dense beats** (§2.6): no lead, arp at −3 dB, no fills.
4. **Sparse beats:** at E ≥ 3 the lead plays **em-motif phrases**:
   - 2-bar call and answer: the call is motif M (degrees 5-1-2-5, rhythm 16-16-8-quarter, or 8-8-8-quarter);
   - the answer descends by step to a chord tone on the next bar's beat 1;
   - transpositions start on a chord tone.
   - At most 2 uses of the same 2-bar phrase per teaser.
5. **Long holds** (no cue of weight ≥ 1 for ≥ 2 bars; 04a has 10.5 s) must evolve.
   - Every 2 bars, change at least one of: the lead phrase, the arp pattern, the arp octave, the drum variant (K-A ↔ K-B), or the arp cutoff (±20%).
   - At 4 bars, energy +1, capped at E4.
6. **Clock trains** (10a and 10c ticks every 1.000 s):
   - The ticks render as a tick-tock (chord 5th, then root, octave 6) at −3 dB re a normal tick.
   - Music hats stay at E ≤ 3 density while the train runs.
   - **A train whose ticks sit off the 16th grid by more than 12 ms** (02b's 0.35 s, 02c's 0.2 s) must never flam: no music kick, clap, snare, hat, arp, lead or stab onset lands 12-60 ms from a tick, anchors excepted (the TRAIN check, §9.6).
   - **A fast train** (period under 1.5 beats) is the hats while it runs: the music hats rest, the ticker plays quarter notes, and no lead phrase starts in a bar with an off-grid tick.
   - 10c's 1.000 s train is exactly 10 16ths at 150 BPM, so nothing changes there.
7. **`buzz`:** the arp mutes for 1 beat from the buzz, and the music ducks 4 dB (§8.3).
8. **The ticker makes room.** It rests on the last beat of a phrase (the fill's beat) and in the beat before a heavy cue (weight ≥ 1, gain ≥ 0.5), unless another heavy cue came within 2 beats: the count lands in the space. Kicks, claps and snares also yield to `ding` and `pop`, not only to the §4.6.1 kinds.

### 4.7 As built (Scoreboard): what the pack adds to the rules above

These are the pack's own design decisions (`looks/scoreboard/sound/`, documented in `looks/scoreboard/README.md`, "Sound"). Each one is here with its reason. Change one only together with a refit (§11.2) and a passing `verify`.

1. **The bus level follows the energy** (`energy.mjs`, `automation.musicDb`), so the sections read as tiers (A3, B7):
   - E2 −7 dB · E3 −6 · E4 −3 · E5 0, and the HOOK's first bar −2.5.
   - The BUILD starts at its tier's nominal level and crescendos +2 dB. It does not dip after the hook, because the first seconds decide whether a viewer stays.
   - TENSION ramps −7 → +1 dB into the gap. The DROP sits at +2 dB (+3 dB for a 1-bar DROP).
   - The half-time HOLD settles from −5 to −8 dB over its first bar (a release, not a cliff). BREAK −4, VERDICT bar −3, HOLD 2 back to −8 over 2 beats, CADENCE at E3.
   - A point every beat, with 30 ms crossfades at bar lines.
2. **The BUILD's range comes from the arrangement.** In E3 the ticker is gated 3+3+2 (16ths 1, 4 and 7 of each half bar). E4 opens to straight 16ths with 16th hats and the lead. In E5 the hats get a −2 dB shelf above 10 kHz.
3. **Opening lift.** If a teaser's first 3 s would measure under −14.5 LUFS short-term (a sparse hook, or a clock train that is the hats), its music lifts from 0.3 s to 3 s, by at most 2.5 dB. The prediction comes from the actual events and cues plus `OPEN_FIT` (§11.2). A hot opening is left alone. Every opening sits at −12.6 to −14.9 LUFS short-term.
4. **The B3 clearance** (`clearance.mjs`). It renders the bed by instrument at every cue window, with the engine's own voices, levels, sidechain and route (`routeOf`), and keeps the results as cross matrices so that correlated layers sum correctly. Then it uses, in order and only as far as needed:
   1. the §5 broadband duck;
   2. a selective dip (≤ 15 dB) of the layers that mask the cue (pad, arp, lead, hats, clap, snare, music riser);
   3. an 808 and kick-tail dip (≤ 8 dB; an anchor kick never dips);
   4. the cue's own lift: +6 dB for the hook's frame-1 count, the verdict and soft cues (gain ≤ 0.5), +3 dB otherwise, never past gain 1;
   5. a broadband duck up to 1.5× its table depth (6 dB at the hook and at V);
   6. the lift up to +6 dB.
   Dips that a later lever made unnecessary are given back. The broadband duck never goes past its cap (the DUCK check, §9.6). Why: a band-selective dip clears a cue without pumping the whole bed. The previous pass ducked the frame-1 counts 11.4-13.5 dB, where 2.6-3.5 dB now does.
5. **The SFX fader** (`balance.mjs`) sets each teaser's cue level against a modelled music stem (`BEDS`, `M_FIT`, §11.2):
   - A busy teaser cuts its cues until S − M = −1.35 LU. The soft cues and the payoff are spared.
   - A sparse one lifts its event cues and payoff (never the ticks or dings) by up to 4 dB, until S − M = −2.1 LU. If that is still short, the arp, pad, hats, clap, snare, lead, stab and crashes give way by up to 3.5 dB.
6. **Levels and sends** (`mix.mjs`), tuned against B1, §9.2 and A11:
   - The stab is at −11 dB (§8.1 starts it at −8); it sits on the anchors and is budgeted there. The arp is at −13.5 dB (§8.1: −16), because it carries the look.
   - The music bus is at −2 dB and the returns bus at **+2.5 dB** (B1, §8.1).
   - The ticker has no ping-pong delay (no delay under 16ths), and the pad's hall is at −14 dB. The wetness is the stab's arena hall, the clap plate and the lead's dotted-8th delay (send −4 dB).
   - The payoff duck releases over 0.3 s, where the engine's default is 0.45 s: the DROP blooms back sooner.
7. **Note gates end 1.5 ms early.** The score rounds `t` and `dur` separately (1 ms). A note that ends exactly at its successor's onset would otherwise count as two notes sounding at once (S14).
8. **Measured.** On 2026-10-12, B3's closest cue sat 3.9 dB over the music across the 15 teasers. The lever counts are from 2026-10-11; the arrangement has not changed since, only the encode loop. Across the 164 B3 cues, 84 use the selective dip and 70 the 808 or kick-tail dip, 10 lift, and none goes past its duck cap. Anchor stabs play at velocity 0.17-0.53 at P and 0.12-0.42 at V.

---

## 5. Scoreboard SFX palette

The character is crisp, synthetic and heavy: LED segments, a scoreboard, an arena.
- **Levels** are peak dBFS at cue gain 1.0, pre-master. Cue gain scales them linearly.
- **"Chord tone"** means `chordAt(t)` (from t ≥ base: D major add9).
- Every recipe also lists its **music duck** (§8.3).
- **Variation:** two consecutive cues of the same kind differ in at least two of: pitch, filter cutoff (±8%), noise seed, pan.

| Kind | Layers (transient / body / tail) | Pitch | Length | Peak | Stereo | Reverb | Variation | Duck: depth / hold / release τ |
|---|---|---|---|---|---|---|---|---|
| **tick** | White-noise click, 1.2 ms → BP 6.5 kHz (Q 1.5) / sine ping, A 0.5 ms, τ 9 ms / none | Chord tone in MIDI 86-93 (D6-A6), rotating up through the chord by `n`. Trains: tick-tock 5th/root | 40 ms | −14 | ±12%, alternating by `n` | plate −24 dB | ±5 cents; seed per cue | 1 dB / 40 ms / 80 ms |
| **thud** (hard cut, a rung slams) | 3 ms noise click, HP 2 kHz, −10 dB / sine diving from root +12 st to root (MIDI 38-45) over 45 ms, A 1 ms, τ 120 ms, `tanh` drive 1.8, DC block / "slap": noise BP 1.2 kHz (Q 0.8), τ 25 ms, −8 dB, L/R seeds decorrelated | Chord root | 450 ms | −6 | body centred; slap ±30% | plate −16 dB | body ±0 st, slap cutoff ±8%, seed | 4 dB / 60 ms / 160 ms |
| **ding** (a count lands) | FM bell: carrier f, modulator 3.5 f, index I → 0.3 over 180 ms, A 1 ms, τ 280 ms. Note 2 at +70 ms. Clamp I ≤ (18 000 − f)/(3.5 f) − 1 (≈ 1.6 at A6) | The two highest distinct chord tones in MIDI 84-93, ascending. 1 in 3 (seeded) uses the octave as note 2 | 800 ms | −10 | note 1 −15%, note 2 +15% | hall −12 dB | ±4 cents, index ±10% | 3 dB / 80 ms / 220 ms |
| **roll** (odometer) | Click train like today (the rate accelerates, then settles; peak 22/s), clicks HP 3 kHz / each click carries a tri blip, τ 6 ms, at −4 dB re the click / the last click +4 dB | Blips walk up the chord tones from the root in octave 5 to the root in octave 6, arriving on the last click | dur + 50 ms | −16 | pan sweeps −35% → +35% over dur (direction alternates by `n`) | plate −22 dB | the click jitter is seeded; the timings of first and last click are fixed | 2.5 dB over [t, t + dur], attack 20 ms, release τ 150 ms. Music hats muted |
| **pop** (a few objects land, ≤ 12) | 1 ms click / sine glide from a chord tone in octave 5 up one octave in 60 ms (exponential), A 1 ms, τ 25 ms | Chord tones rotating by `n` | 120 ms | −12 | seeded ±25% | plate −20 dB | ±6 cents | 1.5 dB / 30 ms / 80 ms |
| **cash** (the money total lands) | A bright FM bell strike on the root (MIDI 94-105) at +0 ms that carries the first 50 ms, where B3 listens; 5 mechanical clicks 22 ms apart with a metal ring, HP 4 kHz, gains 1 → 0.5 / two FM bells (root and 5th in octave 6) at +100 and +130 ms, τ 350 ms / coin shimmer: 12 sine pings, τ 30 ms, chord tones in MIDI 98-105, seeded onsets over 0.10-0.50 s | Chord | 1.0 s | −9 | clicks centred; pings ±60% | hall −10 dB | ping onsets and pitches seeded | 4 dB / 100 ms / 300 ms |
| **hit** (stadium impact, the biggest number) | Noise burst 4 ms, full band, −6 dB / body sine diving from root +12 st to D2 (or the chord root) over 60 ms, τ 350 ms, drive 2.5, DC block; sub D1 −8 dB, τ 250 ms, HP 30 Hz / crash: decorrelated noise HP 3.5 kHz, τ 900 ms, −6 dB | Root | 1.6 s | −3 | body mono; crash ±70% | hall −8 dB | crash seed, ±5% τ | **9 dB / 150 ms / 450 ms** |
| **reveal** (the verdict) | **Pre-roll:** reversed noise 180 ms, ending at t, −14 dB / thud body at −3 dB plus the root, 3rd and 5th of the chord as FM bells in octaves 5-6, arpeggiated at 0, 40 and 80 ms, τ 600 ms / "light-up" shimmer: noise BP 9 kHz, rising in 30 ms, τ 300 ms | Chord | 1.4 s | −6 | bells −20 / 0 / +20%; shimmer ±60% | hall −9 dB | bell index ±10% | 6 dB / 120 ms / 400 ms |
| **riser** | Noise BP sweeping 300 Hz → 9 kHz (exponential in t), Q 1.2, amp +20 dB linear-in-dB / three saws at A2, A3 and A4 gliding +12 st Shepard-style (each layer's amplitude is a raised-cosine bell over its log-frequency position, so the ear hears an endless rise), LP 4 kHz / no tail: 5 ms fade at t + dur | Ends on the dominant A, which resolves to D at P | dur | −8 at the end | width 10% → 80% (decorrelated noise) | none | seed | none. The music is in TENSION |
| **swipe** (lead change, pointer) | Noise BP sweeping 2 → 7 kHz over dur (default 0.22 s), sin window | none | dur | −16 | pan sweeps −40% → +40%, alternating by `n` | plate −20 dB | seed, cutoff ±8% | 1.5 dB / 30 ms / 100 ms |
| **whoosh** | Noise BP up and down: 500 Hz → 4 kHz (peak at 60% of dur) → 800 Hz; plus air (LP 300 Hz noise, −10 dB) | none | dur | −14 | pan sweeps −50% → +50% | plate −18 dB | seed | 2 dB / 50 ms / 150 ms |
| **buzz** (struck out, lost) | Two PolyBLEP squares at D3 (146.83 Hz) and Eb3 (155.56 Hz); the minor second beats at 8.7 Hz. LP 1.8 kHz. A 5 ms, τ 120 ms | Fixed (an intentional clash) | 380 ms | −12 | centre | plate −20 dB | none | 4 dB / 100 ms / 250 ms; arp muted 1 beat |
| *step / boing / type* (not emitted by this look) | step: thud body at −12 dB; boing: pop with 11 Hz vibrato; type: tick train at 14/s | | | step −12, boing −12, type −16 (as built; U3) | | | | as tick |

The B3 clearance (§4.7.4) may lift a cue above its kit gain by up to +6 dB, never past gain 1. The palette's peaks still bound every kind at gain 1 (U3).

---

## 6. Becker Rig music: "toy-box funk"

**Lineage:**
- Alan Becker's *Animation vs. Math*: an orchestral and synth hybrid score (Scott Buckley), crisp UI clicks, heavy mechanical thuds when an equation evaluates, and bass drops on dimension changes.
- *Animator vs. Animation* and the Becker Shorts: every impact has a sound, a shake and a flash, all in the same frame.

**Our version:** bouncy **cartoon funk with a toy orchestra**. A rubbery synth bass, a marimba hook, pizzicato, glockenspiel, brass stabs and tremolo strings, over dry punchy drums with swung 16ths. Tension is a chromatic climb with tremolo strings. The payoff is a brass fanfare with timpani. The playful light stage asks for warmth, not darkness.

### 6.1 Grid, feel, key

- **Meter:** 4/4 per §2.3, with breaks. Drums are full-time: the snare backbeat is on 2 and 4.
- **Tempo:** per §2.3, 112-128 BPM, about 120. At 120 a beat is 0.5 s and a bar 2.0 s.
- **Swing:** 16ths at **58%**. The 2nd and 4th 16th of each beat are delayed 0.16 × one 16th (20 ms at 120 BPM). Swing applies to shaker, marimba, bass 16ths and pizz; never to kick or snare on beats.
- **Key:** D major. C natural as ♭VII.

### 6.2 Harmony

**Chord vocabulary:** D, Dsus2, D/F#, Em7, G, G/B, A, A7, Asus4, A7sus4, Bm, Bm7, F#m, C (♭VII). Borrowed: Gm (iv). Applied: G#°7 (vii°7/V), E7 (V/V).

| Use | Progression | Notes |
|---|---|---|
| BUILD, phrase 1 | **BR1** \| D \| G \| Bm \| A \| | I–IV–vi–V |
| BUILD, later phrases | seeded (`arr`) pick of BR1 or **BR2** \| D \| Bm \| G \| A \| | |
| Sparse or "sneaking" phrases (BUILD at E ≤ 3 with ≥ 3 sparse beats per bar) | **BR3** \| D \| C \| G \| D \| | I–♭VII–IV–I, Mixolydian wink |
| TENSION, the **climb** (T beats) | **D/F# → G → G#°7 → A7**, then D at P. T = 2: G#°7, A7. T = 3: G, G#°7, A7. T = 4: one chord per beat. T = 5-7: D/F# takes the extra beats. T = 8: 2 beats per chord. T > 8: D/F# takes the excess | Bass F#2 G2 G#2 A2 → D2. Tremolo voicing: A3 D4 F#4 · B3 D4 G4 · B3 D4 F4 · C#4 E4 G4 → D4 F#4 A4 |
| DROP ("fanfare") | \| D \| G · A \| (2 bars), or \| D \| G · A \| D \| Bm · A \| (4 bars) | brass on beat 1 and the "and of 2" |
| HOLD ("victory lap") | \| G \| F#m \| Bm \| A \| (IV–iii–vi–V), cycled | end-aligned before V, so it arrives on A; start-aligned before the CADENCE (§2.5) |
| VERDICT bar | D | |
| CADENCE | last 2 beats A7, the 2 before A7sus4, everything earlier Em7 | into the logo |
| Bar with a **`buzz`** | From the buzz to the bar end the chord is **Gm** (borrowed iv). The bass slides down 3 st over 250 ms (flagged `strain`). Drums stop for 1 beat after the buzz: the "deflate" | |

**Voicings:**
- BR-Warm pad and pizz chords: 3-4 voices in MIDI 55-74.
- BR-Honk brass: closed triads in MIDI 53-74, doubled an octave up in E5 and on P.
- Each voice moves ≤ 5 st.

### 6.3 Instruments (buildable)

| Name | Recipe | Register |
|---|---|---|
| **BR-Bounce** (synth bass) | PolyBLEP square and saw, 50/50, through a light drive (`tanh` 1.8, after a 4 kHz pre-filter so no pitch aliases) **in front of** the 24 dB LP whose envelope runs 2.4 kHz → 350 Hz, τ 90 ms, Q 2.0 (the rubbery "bwop"); then a gentle `tanh` 1.3 that rounds the onset spike and a 12 dB LP at 1.2 kHz. With the drive after the filter the bass owned 0.5-3 kHz. A sine at the fundamental (−9 dB) gives a round floor; there is no sub-octave (37-58 Hz cost headroom and no phone plays it), and a 40 Hz HP clears the rest. Amp A 2 ms, D 160 ms, S 0.55, R 50 ms. Slides of 50 ms between tied notes | **MIDI 38-50** (D2-D3); octave pops ≤ 61 |
| **BR-Mallet** (marimba) | Additive partials: 1.0·f (amp 1.0, τ 0.35 s·√(440/f)), 3.9·f (0.35, τ/3), 9.2·f (0.10, τ/8); drop any partial above 16 kHz. Plus a 2 ms noise click, LP 3 kHz, −14 dB | **MIDI 62-86** |
| **BR-Glock** | Free-bar partials 1, 2.76, 5.40, 8.93 at amps 1, 0.35, 0.15, 0.06 and τ 1.2, 0.5, 0.25, 0.12 s (×1.15 for the logo); drop partials above 16 kHz. A 0.5 ms | **MIDI 74-93** |
| **BR-Pizz** | Karplus-Strong string: delay line of length 48000/f, a 2-tap averaging loop filter, loss 0.996, excited by 1 period of seeded noise LP'd at 3 kHz. Amp release 80 ms at the gate | MIDI 50-74 |
| **BR-Honk** (brass stab) | 3 saws (±8 cents) with a lip scoop of −25 cents settling in about 12 ms. 12 dB LP envelope: 600 Hz → 3.2 kHz over the 30 ms attack (the brass "blat"), then → 1.2 kHz over 200 ms. Amp A 12 ms, D 150 ms, S 0.6, R 80 ms. Voices: `honk` (stabs), `honkF` (the fanfare and the t = 0 hook), and the react voices `honkR` / `honkFR` (§6.6, §8.3.1) | MIDI 53-74 (×2 in the fanfare, ≤ 86) |
| **BR-Strain** (tremolo strings) | 4 saws per note (±10 cents), LP 2.8 kHz, HP 180 Hz. Tremolo: amplitude modulated at 16th-triplet rate (6 × BPM/60 Hz), depth 70% | MIDI 55-79 |
| **BR-Warm** (pad) | Triangle and saw (−6 dB), 12 dB LP at 1.2 kHz, **HP 250 Hz** (the logo's D add9 keeps HP 150). A 150 ms (10 ms on L and P), S 1, R 400 ms. A halo, not a wall: in the BUILD it plays only two guide tones (3rd + 7th, or 3rd + 5th), voice-led, so the toys own the mids | MIDI 55-74 |
| **BR-Kick** | Sine 130 → **46 Hz**, τ 25 ms. Amp τ 115 ms, gated at 230 ms. Click: 2 ms noise, −10 dB. With no sub-octave in the bass, the kick's tail carries the 31.5 Hz octave (§9.2) | |
| **BR-Snare** | Tone: sines at 185 Hz and 330 Hz, τ 50 ms, −4 dB. Noise BP 2.5 kHz (Q 0.7), τ 110 ms. Crack: noise HP 5 kHz, 3 ms. Kick, snare and clap are each soft-clipped at their own peak (`tanh` 1.5), which keeps their transients off the limiter (A11) | |
| **BR-Clap / Shaker / Tamb** | Clap as SB-Clap but brighter (BP 1.6 kHz). Shaker: noise HP 6 kHz, A 4 ms, τ 28 ms. Tambourine: noise BP 9 kHz, τ 60 ms, plus 3 sine jingles (seeded, 5-8 kHz), τ 40 ms | |
| **BR-Block** (woodblock) | Sines at f and 2.71·f, τ 35 ms, plus a 0.8 ms click. "Tick" A5, "tock" D5 | |
| **BR-Timp** (timpani) | Partials 1, 1.5, 1.99, 2.44 · f at amps 1, 0.5, 0.35, 0.2. Pitch starts +1 st and falls to f in 60 ms. τ 1.2 s; plus a mallet thump (noise LP 600 Hz, 8 ms) | D2 or A1 |
| **BR-Crash** | As SB-Crash, τ 1.1 s, with a brighter metal (×2.6) | |
| **BR-Riser (music)** | Only when no SFX riser covers TENSION: a slide-whistle sine A4 → A5 (exponential) with vibrato 6 Hz growing 0 → ±20 cents | |

### 6.4 Patterns (16 steps per bar, swung)

| Part | E1 | E2 | E3 | E4 | E5 |
|---|---|---|---|---|---|
| Kick | | | 1, 11 | 1, 4 (0.6), 7 (0.7), 11 | 1, 5, 9, 13 (four on the floor) plus 16 (0.4) |
| Snare | | | 5, 13 | 5, 13; ghosts 8 and 15 (0.25) | 5, 13 plus clap |
| Shaker | | 8ths | 16ths (0.6 on 8ths, 0.35 off) | 16ths | 16ths plus tambourine 8ths |
| Woodblock | 5, 13 (tick-tock) | 5, 13 | | | |
| Bass | pizz roots on 1 | pizz walking quarters (R, 3, 5, approach) | BR-Bounce **bounce**: 1 R (8th), 4 R+8va (16th), 7 R (16th), 9 5th (8th), 12 R+8va, 15 approach tone (flagged `passing`) | bounce plus slides into each bar | bounce plus octave pops on 4 and 12 |
| Harmony | pad | pad | pad | pad plus pizz chops on 3, 7, 11, 15 | pad plus brass stabs on 1 and 7 |
| Hook | | marimba on beats 1 and 3 | **marimba ostinato** (two seeded patterns; this is the first): 1 R (1.0), 4 5 (0.6), 7 R (0.8), 9 3 (0.9), 11 5 (0.6), 13 R (0.8), 15 3 (0.6). R = chord root in **MIDI 67-78**; 5 = the chord 5th directly below R; 3 = the chord 3rd directly above R (D: D5 A4 F#5; Bm: B4 F#4 D5), so the ostinato sits in D4-F#5 (MIDI 62-78; turnarounds and octave lifts reach 86). That is a warm mid marimba under the glock's octave: the two toys stop masking each other, and the marimba can be the loudest voice in the band's mids (MALLET, §9.6) without piling the long-term spectrum into the 1 kHz octave (§9.2). Strokes pan by pitch (±30%) | ostinato plus glock answers in sparse bars | the ostinato stays in its home octave (the octave above belongs to the glock line and the fanfare's top voices), plus a glock melody. An evolving long hold lifts it an octave only when the whole bar fits under MIDI 86 |
| Phrase turnaround (4th bar, steps 13-16) | | | marimba plays **the em motif** A4 D5 E5 A5 as swung 16ths over A | same | same |
| Fill (last beat of every 4th bar, unless a cue of weight ≥ 1 sits in it) | | | snare 16ths (0.4 → 0.8) | snare and synth tom (sine 140 → 100 Hz, τ 120 ms) | same |

### 6.5 Arrangement on the timeline

| Section | What plays |
|---|---|
| **HOOK** (t = 0) | **"Ta-da!"**, all at t = 0: BR-Honk D major (D4 F#4 A4 D5) as an 8th note, timpani D2, crash −3 dB, kick, bass D2. The marimba ostinato starts on step 1. Energy E4 for the first bar, then E3. As built, one of three seeded variants, all with brass D major, kick and bass at t = 0 (S10): "ta-da" (the 8th with timpani and crash), "ba-DA" (a 16th, then F#4 A4 D5 F#5 on the and-of-1 with timpani and crash), "ta-da-ling" (the 8th plus a glock run D5 F#5 A5 D6). The t = 0 brass is the fanfare's own voice (`honkF`) at the fanfare's level: the engine's encoder pre-roll (§8.6) made the old workaround (a separate voice 2 dB down) unnecessary |
| **BUILD** | E3 (bounce, ostinato, shaker 16ths), rising to E4 at the midpoint. Glock answers (the em motif and its transpositions) play in sparse bars only |
| **TENSION** | "Strain": kick on every beat at 0.7 (a heartbeat), no snare backbeat. The snare roll runs 16ths → 32nds, 0.3 → 1.0. BR-Strain tremolo plays the **climb** (§6.2) with the bass on F#-G-G#-A. The marimba drops out. **The gap:** the last 8th before P is silent music (§4.5) |
| **P** | **Fanfare, "ka-TA":** on the downbeat a short brass "ka" (a 16th) with kick, snare, clap, timpani D2 and crash (τ 1.4 s), glock A5, inside the payoff duck. Then the sustained **"TA"**, BR-Honk D major doubled at the octave (D4 F#4 A4 D5 + D5 F#5 A5 D6), on the react bus (`honkFR`, §8.3.1), from the first swung 16th that leaves the payoff's other cues their first 50 ms (B3) until the and-of-2. A payoff marked by a `ding` or a `pop` keeps its first 50 ms, so the "ka" is left out there. Why: the hit owns the impact and the band answers it, instead of both fighting for the same 50 ms. DROP at E5 (a one-bar DROP stands 0.5 dB higher, for B7) |
| **HOLD** | "Victory lap" at E3: bounce, pizz chops, ostinato, changing something every 2 bars. Glock melody only in sparse bars, never in the 2 bars after V |
| **BREAK** | All drums out. Dominant pad, a pizz tremolo on A3, and a reverse crash into V |
| **VERDICT** | **"ding! ba-DAM":** the verdict `ding` owns V's downbeat. The band answers one swung 16th later with kick, bass, the brass "button" (D major, 8th, −3 dB re P; `honkR` + `crashR` on the react bus) and a crash at −6 dB. 1 bar at E4, then HOLD 2 |
| **CADENCE** | Em7 → A7sus4 → A7. A snare and tom fill on the last beat. Stop at base |
| **CARD** | The logo (§3) |

### 6.6 How the music reacts (physical comedy)

1. **Drums yield**, as §4.6.1 (kick or snare within ±70 ms of a strong cue is removed), and further:
   - They yield to every body cue (`thud`, `hit`, `cash`, `reveal`, `step`) at gain ≥ **0.35**, not only ≥ 0.5, and every nearby cue is checked, not only the nearest (the FLAMS check, §9.6).
   - A cue that B3 listens to (gain ≥ 0.4) owns its first 50 ms: no kick merges with it or lands up to 80 ms before it, and a backbeat drops rather than snapping onto it.
   - A backbeat may snap onto a lighter cue within 35 ms if nothing else is then 15-70 ms off. Such a merge is exempt from S8's "on the grid" (02a: a snare snapped onto a `step`, 35 ms off the swung grid).
2. **Catch the hit.**
   - Applies to a `hit` with gain ≥ 0.85 that is not at an anchor: the brass plays a short stab of the current chord **at the cue time**, even off the grid. That is the cartoon "catch".
   - The stab is an 8th note at −4 dB re the fanfare, on the react bus (`honkR`, §8.3.1), so the hit it answers does not duck it away.
   - At most one per 2 bars; extra hits get no stab.
3. **Clock trains:** 10b's ticks every 0.832 s, and 02a's thuds every 0.5 s.
   - Ticks render as woodblock tick-tock (A5 / D5).
   - The music's own woodblock and shaker mute while the train runs, so two clocks never argue.
   - No kick, snare, clap or tom lands 15-70 ms off a train's tick (FLAMS), no ghost snare or pizz chop within 70 ms of one, and no marimba stroke within 50 ms of one.
4. **Throws** (`swipe`, then `thud` 0.2-0.5 s later, as in 09b and 01b): nothing extra. The SFX carry the throw, and the energy step follows the rungs.
5. **`buzz`:** the deflate (§6.2). Drums and marimba stop for a beat. When less than a beat of the bar is left, the Gm carries through the next downbeat and the chord comes back one beat into that bar, so a buzz just before a bar line is a deflate rather than a 125 ms flicker. If a bloop or a landing follows within 300 ms, the bend completes before it.
6. **Dense, sparse, long holds:** as §4.6.3-5, with the glock in the lead role. The glock weaves between the cues: no coins, hits, rolls or buzz in its two bars, and no bell-like cue (`pop`, `ding`, `tick`, `boing`, `cash`) within 120 ms of a glock onset. Throws and steps may pass under the tune.
7. **The bass makes room.** It is choked 5 ms before a bloop, ding, landing or step with gain ≥ 0.4. A note starting within 60 ms of a bloop or ding is left out. A note starting with a landing or a step answers it 70 ms later.
8. **Band-selective dips** (a dynamic EQ on the band's 400 Hz-4 kHz voices: marimba, glock, pizz, brass, strings, pad, snare family, whistle) clear each cue instead of deeper broadband ducks: `pop` 6 dB, `ding` 6, `cash` 6, `thud` 4, `step` 4, `roll` 5 (held over the roll), `tick` 3, `whoosh` 2.5, at full depth down to gain 0.4. Bass, kick, shaker and the react bus keep the groove. The fanfare's "TA" dips 8 dB under the payoff's own coins, dings and landings that follow the hit. Why: the critic measured 6-30 dips deeper than 6 dB per minute with broadband ducks; with the dips it is 1.6-8.2.

### 6.7 As built (Becker Rig): what the pack adds to the rules above

These are the pack's own design decisions (`looks/becker-rig/sound/`, documented in `looks/becker-rig/README.md`, "Sound"). Each one is here with its reason. Change one only together with a refit (§11.2) and a passing `verify`.

1. **Section levels** (`automation.musicDb`): E5 +1.1 dB (+1.6 for a one-bar DROP) · E4 0 · E3 −1.7 · HOLD −5.5 · BREAK −2 · TENSION ramps −1 → +1, all plus the music trim (item 4). Swing is 58% everywhere except the TENSION, fills included.
2. **Levels** (`mix.mjs`, dB applied to instrument buffers that peak at about `vel`; not the §8.1 peak levels): marimba −19.4 · pizz −20.4 · glock −24.4 · bass −10.8 · pad −23.1 · kick −17.6 · snare −13.9 · shaker −23.9 · tom −19.9. The music bus fader stays at 0. The toys carry the look: the levels were chosen with the level optimiser (`opt.py`, §11.2) so that every teaser's §9.2 bands sit inside the Becker windows while the marimba stays the loudest voice in 500-1200 Hz (MALLET).
3. **Sends** are the §8.5 values less 1.5 dB (music and SFX alike), plus a pad hall at −15.5 dB; there is no extra payoff send. The returns stem reads 9.6-12.2 LU under the mix; the first pass had it 3.9-5.2 LU under, as loud as the dry band. Becker Rig's B1 caps it at −8 LU (§8.1).
4. **The balance** (`balance.mjs`, run by `compose()`):
   - **The leveller** renders the body cues as the engine will (cluster cap, SFX-bus compressor) and pins the gated SFX stem to −22.9 LUFS pre-master. It rides down only pile-ups of big cues: at most 6 dB, 3 dB for a cue B3 listens to, and payoff cues only by how far they tower over the card. The small foley (`tick`, `step`, `roll`, `type`, `pop`, `swipe`, `whoosh`) is never trimmed.
   - **The tilt** compares the SFX stem's 2 kHz octave with its 1 kHz octave and leans the band to frame the cues' octave (§9.2). Dull cues (bloops, dings, taps crowd 1 kHz): presence +1.6 dB per tilt unit, bass and pad +1, glock −1, and harder marimba mallets (overtones above 1.5 kHz up by as much as 1.2). Bright cues: presence −1 per unit, the toys +1. The marimba and pizz never move down.
   - **The music trim** sets the music stem against the SFX stem's gated loudness: M = I − 1 LU (up to 2 dB nearer for a strongly tilted SFX spectrum, or for cues that crowd the 1 kHz octave), clamped to ±3 dB. That puts a hit the same 1 LU over the band whether the teaser has three hits or forty taps, which is what B1's "SFX minus music in −2..+2 LU" asks (§8.1).
   - **The reference-octave crowding** (`CROWD`, added 2026-10-12). §9.2 reads every octave against the mix's 1 kHz octave. Bells (dings and coins) ring for up to a second in 1-2 kHz with a hall tail, so in a short body a few of them can own that octave, and every other band then reads low against it. The tilt cannot see this when the bells sit in both octaves. In 06c's condensed cut (a 15.7 s body, two dings and two coins) the tilt read level (0.54), the cues held about half of the 1 kHz octave, and the 250 Hz octave sat 0.2 dB over its floor. `crowd` is the cues' long-term 1 kHz-octave power over the body (the plan's SFX render, after the leveller), relative to their gated loudness. On the 15 teasers it reads 43.9 (08c) to 58.1 (09b). Above 54.5, the music comes 1 dB nearer per dB. The music trim takes the larger of this term and the tilt's, under the same 2 dB cap. It moves 06c (from 0.43 to 2.0 dB nearer), 07c and 09b (from 1.5 to 2.0). For 06c, 250 Hz now sits 1.0 dB over its floor and 8 kHz 0.8 dB under its ceiling. The rule is designed, not fitted (`looks/becker-rig/sound/tools/README.md`).
   - **The master gain is predicted** from `MODEL` (`mix power = (1 + a)·M + b·U`, fitted on the 15 teasers; §11.2), and the card is trimmed against it (§3.2).
5. **Payoff duck:** 9 dB, held 150 ms, released over 0.3 s (the engine's default is 0.45 s), so the "TA" and the DROP bloom back within about half a second (B2 still holds over [P, P + 0.15]).
6. **Measured on 2026-10-12** (15 teasers): the marimba in the BUILD sits −5.4 to −9.4 LU re the band (it was −16 to −21) and is the loudest voice in 500-1200 Hz on all 15. 0.8-5.0% of the body is ducked ≥ 6 dB (0-3.7% outside the payoff; it was 3-13%). The `ding` at V ducks 4 dB (it was 15-18 dB). No flams against body cues ≥ 0.35 or clock ticks.

---

## 7. Becker Rig SFX palette

The character is cartoon foley, synthesised: rubbery, woody, bouncy, physical. *Every hit sounded.* The columns and conventions are as in §5.

| Kind | Layers (transient / body / tail) | Pitch | Length | Peak | Stereo | Reverb | Variation | Duck: depth / hold / release τ |
|---|---|---|---|---|---|---|---|---|
| **thud** (an object lands) | 2 ms noise LP 4 kHz / sine diving from 2.2·f to f over 40 ms, τ 70 ms; f = chord root in MIDI 43-50; "wood": noise BP 600 Hz (Q 2), τ 30 ms, −10 dB / room | Root, or the 5th on odd `n` | 300 ms | −8 | seeded ±20% | room −14 dB | ±1.5 dB, wood cutoff ±8% | 3 dB / 50 ms / 140 ms |
| **tick** (pencil tap) | 0.8 ms click / woodblock sines f and 2.71·f, τ 25 ms | Chord tone in MIDI 74-81; trains tick-tock A5 / D5 | 80 ms | −16 | ±15% alternating | room −20 dB | ±4 cents | 1 dB / 30 ms / 80 ms |
| **swipe** (a throw, a swish) | Noise BP sweeping 1.2 → 5 kHz with a sin² gain bell over dur. If dur ≥ 0.18 s, add a slide-whistle sine rising a perfect 5th from a chord tone in octave 5, −14 dB re the noise | Whistle: chord tone | dur | −14 | pan sweeps ±30% (direction seeded) | room −16 dB | seed, cutoff ±8% | 1.5 dB / 30 ms / 100 ms |
| **pop** (a bloop: a value pops in) | 1 ms click, HP 3 kHz / sine glide from a chord tone in octave 5 up +7 st over 40 ms, τ 30 ms | Chord tones rotating by `n` | 110 ms | −12 | seeded ±20% | room −18 dB | ±6 cents | 1.5 dB / 30 ms / 80 ms |
| **hit** (an impact: shake and burst) | 3 ms noise plus 1 ms click, full band, −4 dB / "punch": sine diving from 4·f to f over 30 ms, f = chord root in MIDI 38-45, τ 160 ms, drive 2.0; "smack": noise BP 1.8 kHz (Q 1), τ 40 ms, −6 dB / room plus hall. **Big variant** (at P, V or L, or gain ≥ 0.9 with a `cash` within 0.15 s): add timpani D2 (or the chord root) and a crash (τ 1.1 s, ±70%) | Root | 0.6 s (big 1.6 s) | −4 (big −3) | body mono; smack ±25% | room −10 dB, hall −16 dB | smack seed, ±5% τ | 6 dB / 100 ms / 300 ms (big: **10 dB / 150 ms / 500 ms**) |
| **ding** (the verdict, a result) | BR-Glock note: the chord's 3rd in MIDI 86-93, then the 5th at +60 ms | Chord | 1.0 s | −10 | −15% / +15% | hall −10 dB | ±3 cents | 3 dB / 80 ms / 220 ms |
| **whoosh** (a dash, a swing, a heave) | Noise BP up and down: 700 Hz → 3.5 kHz → 900 Hz; amplitude modulated at 28 Hz, depth 20% (cloth flutter) | none | dur | −14 | pan sweeps ±50% | room −16 dB | seed | 2 dB / 50 ms / 150 ms |
| **cash** (coins) | 8-14 coin clinks (seeded count): each is 3 sines at f, 2.3·f and 3.9·f, τ 40-90 ms, f = chord tones in MIDI 86-100; onsets spread exponentially over 0-0.45 s / "ka-ching": glock root in octave 6, then octave 7 at +40 ms, τ 500 ms | Chord | 1.0 s | −9 | clinks ±50% | hall −12 dB | everything seeded | 4 dB / 100 ms / 300 ms |
| **step** (a footstep) | 1 ms click / noise LP 900 Hz, plus a sine at 95 Hz, τ 25 ms | none | 90 ms | −16 | ±10%, alternating feet | room −18 dB | ±2 dB, LP ±15% | 1 dB / 30 ms / 60 ms |
| **roll** (a ratchet or flip counter) | Click train like the Scoreboard roll, with clicks BP 2.2 kHz / woodblock blips walking up the chord tones / last click +4 dB | Chord walk | dur + 50 ms | −16 | pan sweeps ±30% | room −18 dB | seed | 2 dB over the roll |
| **type** (pencil scribble) | Burst train of 14/s noise clicks (BP 3 kHz, Q 2), seeded timing jitter ±15 ms *inside* [t, t + dur], gains 0.6-1.0 / scratch: noise BP 4.5 kHz, amplitude modulated at 9 Hz, −8 dB | none | dur + 60 ms | −18 | ±10% | room −20 dB | everything seeded | 1 dB over dur |
| **riser** (strain, a heave) | Slide-whistle sine A4 → A5 (exponential over dur), vibrato 6 Hz growing 0 → ±20 cents / noise swell BP 500 Hz → 3 kHz / width 20% → 60% | Ends on A | dur | −10 at the end | as stated | none | seed | none (the music is in TENSION) |
| **buzz** (a wrong honk) | Two PolyBLEP saws at D3 and Eb3, LP 1.2 kHz; pitch bends −3 st over 300 ms (the deflate) | Fixed | 450 ms | −12 | centre | room −16 dB | none | 4 dB / 100 ms / 250 ms |
| **boing** (a spring) | Triangle wave with f(t) = f₀·2^(t/0.25) for 0.25 s, then held, plus vibrato 11 Hz at ±(1 st × e^(−t/0.15)); f₀ = chord root in octave 4 | Root | 400 ms | −12 | seeded ±20% | room −16 dB | ±5 cents | 2 dB / 50 ms / 120 ms |
| *reveal* (not emitted by this look) | ding plus thud | | | −8 (as built; U3) | | | | 6 dB / 120 ms / 400 ms |

**As built** (`looks/becker-rig/sound/sfx.mjs`). Every buffer ends in a 6 ms fade, and every peak stays within its §7 peak + 1 dB (U3). The ducks above are the broadband ones; the clearance a cue needs over the band's mids comes from the band-selective dips (§6.6.8). The differences from the table:
- **`hit`** peaks at −7.5 dB (−8 at P), well under the table's −4. The burst is LP'd at 6 kHz at −9 dB, a `tanh` 1.5 runs over the impact, and the big variant's crash is LP'd at 7.5 kHz. Its broadband duck is at most 6 dB, 10 dB for the big variant, and 9 dB (150 ms, then 0.3 s) at P: the payoff duck rules there.
- **`thud`** never repeats the previous thud's pitch, and peaks at −8 to −9.5. It ducks 4.5 dB at gain ≥ 0.4 (the table's 3 dB, gain-scaled, below that).
- **`pop`** bloops on a chord tone in MIDI 72-83 and peaks at −11.1 (−11.5 on the card). It ducks 4.5 dB (30 ms hold, 80 ms release) at gain ≥ 0.4, so B3's pops clear the band.
- **`ding`** ducks 4 dB at V and 10 dB at P. At V the ding owns the downbeat and the band only answers a swung 16th later (§6.5), so a deep duck there is not needed; the critic measured 15-18 dB at V before.
- **`step`** adds a 200 Hz heel scuff and a 3 ms tap at 2.5 kHz (+5 dB), so a footstep reads on a phone; it peaks at −15.6 ± 0.5 and ducks 2.5 dB at gain ≥ 0.4.
- **`tick`** adds a presence partial at 1.8 kHz on a chord tone and a knock; it peaks at −15.2.
- **`roll`** blips have τ 20 ms, and the last click is +1.5 dB (not +4).
- No duck gets extra depth for a cue that the leveller trimmed or that merged with a music hit.

---

## 8. Mix and master (engine)

### 8.1 Buses and static levels

The signal flow:

```
voices ─▶ MUSIC body (bus 'music': drums, bass, harmony, top, music FX) ───────┐
          REACT voices (bus 'react': answers to a cue, never ducked; §8.3.1) ──┤
          LOGO (bus 'logo': the em sting only) ────────────────────────────────┤
cues   ─▶ SFX bus ───────────────────────────────────────────────────────────────┼─▶ MASTER ─▶ WAV (float32) ─▶ AAC 192k
sends  ─▶ music returns (PLATE / HALL / ROOM / delay; half the duck) ───────────┤
          SFX and logo returns (never ducked) ──────────────────────────────────┘
```

- **MUSIC body bus:**
  - instrument gain automation, the kick sidechain (§8.2), the body gate at base (§3.3)
  - the section level `automation.musicDb` and the bus trim `mix.music`
  - HP 30 Hz (2nd order)
  - glue compressor: ratio 2:1, attack 10 ms, release 120 ms, threshold set so the DROP's 75th-percentile level shows the pack's `targetGr` (Scoreboard 1.5 dB, Becker Rig 2 dB; the window is 1.5-2.5 dB)
  - **event-driven duck** (§8.3)
- **LOGO bus:** gain automation and `mix.logo`, HP 30 Hz. No `musicDb`, glue, duck, sidechain or gate (§3.3). Its sends go to the un-ducked returns.
- **SFX bus:**
  - HP 35 Hz
  - compressor: ratio 3:1, attack 2 ms, release 80 ms, threshold set so the loudest `hit` peak gets the pack's `maxGr` (Scoreboard 2.5 dB, Becker Rig 3 dB; ≤ 3 dB)
- **Returns:** the music sends feed returns that duck by half the music duck and sit −6 dB under the logo (§3.3). The SFX and logo sends feed separate returns that never duck, so a hit does not duck its own tail.
- **Starting element levels** (peak dBFS at velocity 1, pre-bus). Designers tune them to meet §9 B1; the as-built values are in §4.7.6 and §6.7.2.

| Look | Starting levels |
|---|---|
| Scoreboard | kick −6 · 808 −6 (RMS while held −14) · clap −9 · hats −20 · open hat −18 · snare roll −14 → −8 · crash −14 · stab −8 · pad −18 RMS · arp −16 · lead −14 · logo n4 −8 |
| Becker Rig | kick −7 · snare −9 · shaker −24 · woodblock −20 · bass −8 · marimba −14 · glock −14 · pizz −16 · brass −10 (fanfare −7) · strings −16 RMS · pad −20 RMS · timpani −8 · crash −14 · logo n4 −10 |

**Balance targets = B1** (§9.3). Each stem's gated BS.1770 loudness is measured after the master's loudness gain, before the limiter (`report.stems`), relative to the mix's:

| Look | Music stem re mix | SFX stem | Returns stem re mix | Comment |
|---|---|---|---|---|
| Scoreboard | −1.5 to −3.5 LU (about −16.5 LUFS) | −2.5 to −5 LU re the mix (about −18) | about −6 LU (reported, not gated) | music-led bed, SFX on top |
| Becker Rig | −0.5 to −4.5 LU | the gated SFX stem minus the gated music stem within −2 to +2 LU | ≤ −8 LU | SFX-led: every hit sounded, within 2 LU of the band while it sounds, and no reverb fill |

**Why the two looks differ from v1's table, which gave both looks only a music and an SFX window.** The SFX stem is intermittent, and its gated loudness counts only its active blocks. With the music and SFX stems alone, the mix sits barely 1.5 LU over the music, so no fader can put both stems inside v1's windows. Some of the gated mix has to be in neither stem, and each look decides how much:
- **Scoreboard keeps v1's windows** and states the returns' share they assume: about a quarter of the gated mix, the returns stem at about −6 LU re the mix. The pack trims the returns bus +2.5 dB for it (§4.7.6). With the returns at 0 dB, the music stem measured −1.2 to −1.8 LU re the mix, outside its window.
- **Becker Rig's cues are sparse.** The gated SFX stem minus the ungated one is 3-7 LU. v1's bands (music −2.5 to −4.5, SFX −2 to −4) only hold together when about a third of the mix is reverb. The first pass did that, with returns 4-5 LU under the mix, as loud as the dry band. With the §8.5 sends, v1's bands fail on all 15 teasers (music −1.0 to −2.0, SFX −0.3 to −2.8). So B1 states the balance directly: the band level, the cues against the band while they sound, and a cap on the reverb. v1's bands are still reported as B1w, not gated.

Measured on 2026-10-12:
- **Scoreboard:** music −1.68 to −2.62 LU, SFX −2.99 to −3.90, returns −5.43 to −6.42.
- **Becker Rig:** music −1.00 to −2.06 LU, SFX minus music −1.40 to +0.92, returns −9.58 to −12.15. The SFX's own contribution (the mix minus the mix without SFX) is +0.8 to +1.5 LU.

### 8.2 Kick sidechain (the groove pump)

- **Scoreboard:** pad, arp and lead duck 3 dB on every music kick (attack 2 ms, hold 20 ms, release τ 120 ms). The 808 does not duck. The kick's tail is short, so the 808 owns the sustain.
- **Becker Rig:** pad and strings duck 1.5 dB on each kick, with the same times.

### 8.3 Event-driven ducking (music under SFX)

The engine computes the music gain from the cue list, not from a detector. This is deterministic, exact and readable in the score. For each cue c:
- depth `D = Dkind · clamp(c.gain / 0.7, 0.3, 1.2)`, in dB
- the gain is 0 dB until t − 5 ms (lookahead), then ramps linearly in dB to −D at t
- it holds −D until t + hold, then recovers as `−D · e^(−(τ − t − hold)/release)`, where τ is the running time

**Combined duck = the minimum gain over all active cue curves** (the deepest wins; they do not stack).

- **Duck depths:** the per-kind tables in §5 and §7. Order of precedence: the cue buffer's own `meta.duck`, then the pack's `mix.duckBig[kind]` (at P), then `mix.duck[kind]`, then the engine's defaults (§5's column). `roll` and `type` hold their duck over their `dur`.
- **Payoff:** at P, cues use their big depths (Scoreboard `hit` 9 dB, Becker big `hit` 10 dB). **The engine adds its own payoff duck** at P, because the §5/§7 tables reach B2's −8 dB only when a `hit` marks P, and five payoffs come from the verdict rule (02b, 02c, 03b, 03c, 08b, with a `reveal`, a `ding` or no cue at all). It is 9 dB, held 150 ms, unscaled by gain; as always the deepest duck wins. The packs set its release to 0.3 s (the engine's default is 0.45 s), so the music's own drop blooms back within about half a second. Intended: impact first, then the music. `mix.payoffDuck = null` turns it off.
- **Extra ducks:** a pack can add duck events itself (`automation.duck`), for example the 4 dB `buzz` duck (§4.6.7).
- **Tails:** the music returns duck by half the music duck. The SFX and logo returns never duck.
- **Score export:** the duck curve is written to the score at 100 Hz. B2 reads it.

Both packs also clear cues band-selectively, under the broadband duck: Scoreboard with its B3 clearance (§4.7.4), Becker Rig with band-selective dips (§6.6.8). Both are gain automation on named instruments, so they appear in the stems but not in the duck curve.

#### 8.3.1 Duck-exempt voices: the react bus

Some music voices answer a cue: Scoreboard's stab at P and V, Becker Rig's "catch the hit" stab, its verdict button and its fanfare "TA". Ducking them under the cue they answer would undo them. An event with **`bus: 'react'`** is left out of every event duck: the cue ducks, `automation.duck` and the payoff duck. What else such a voice gets is the pack's choice, in `mix.react` (`src/sound/routing.mjs`; contract in `sound/README.md`, "The react bus"):

| `mix.react` | Default | What the voice gets |
|---|---|---|
| `via: 'music'` | yes | the music body's processing minus the duck: gain automation, the kick sidechain, the body gate, HP 30 Hz, and (each switchable) `musicDb` + `mix.music`, the glue (one detector over body and react voices), sends to the music returns (`sends: 'music'`) or the un-ducked ones (`'free'`) |
| `via: 'logo'` | | exactly what the sting gets: summed into the logo bus, so no `musicDb`, glue, sidechain or gate, `mix.logo` as the fader, and sends to the un-ducked returns |
| `inst: { … }` | | per-instrument overrides of the keys above |

Rules:
- **Only the sting uses `bus: 'logo'`.** Packs used to put non-logo events there just to escape the duck. The engine now warns when they do.
- **Both packs use `via: 'logo'`.** Their react levels were set on that path, and the migration from `bus: 'logo'` to `bus: 'react'` with `via: 'logo'` left all 30 masters bit-identical (`verify --expect-identical`).
- **The react voices:** Scoreboard: the stab at P and V and the reverse crash into P. Becker Rig: `honkR` (the catch stabs and the V button), `crashR` (the V button) and `honkFR` (the fanfare "TA"). The score marks their notes and drums `bus: 'react'`.
- **Side effects of `via: 'logo'`.** These voices do not follow the section level or the glue, and their sends ring un-ducked. Budget their level against the cues they answer: Scoreboard's `clearance.mjs` models every event on its `routeOf` route. They are part of the `music` and `music.dry` stems, so B3, B5, B6 and B7 count them. B2 reads the duck curve, not the audio, so a react voice at P is outside the payoff duck.
- **Why not `via: 'music'`.** It was tried at the same levels on 2026-10-12. 21 of the 30 teasers were built before a full disk stopped the run. No check improved. 03a failed A11 (3.50% of samples limited by more than 1 dB, limit 3%). The limiter worked harder on 01c (0.71% → 2.71%) and 04c (1.01% → 1.84%). B3's closest cue moved −0.3 to +0.3 dB, B1 by ≤ 0.16 LU, and the B5 onset at P moved 1.3-2.7 ms earlier on 02b, 05c and 06b. A pack that moves to `via: 'music'` has to re-level its react voices against `musicDb` and the glue, then refit (§11.2).

### 8.4 The coincident cue merge rule (cues within 15 ms)

1. **Only one low body.** Priority: hit > reveal > thud > cash > boing > buzz > others. Lower-priority cues drop their body layer (anything below 300 Hz).
2. **Pitched layers form a chord, never a unison.** If two notes land on the same MIDI, the lower-priority one moves to the next chord tone up.
3. **Cap the cluster peak** at the loudest member + 1.5 dB.
4. **Duck:** use the deepest member's duck.

### 8.5 Space

Reverbs: FDN, 8 delay lines, a Householder feedback matrix, a 1-pole damping LP in each line that sets the high-frequency RT60, and 4 input-diffusion allpasses. Outputs: L = lines 0, 2, 4, 6 with signs + − + −; R = lines 1, 3, 5, 7 with signs + − + −.

| Reverb | Line delays (samples at 48 kHz) | RT60 low / high | Pre-delay | Diffusers (g; samples) | Send HP / return LP |
|---|---|---|---|---|---|
| **PLATE** | 709 863 1013 1151 1279 1433 1601 1777 | 1.2 s / 0.7 s (above 5 kHz) | 12 ms | 0.65; 113 337 509 761 | 200 Hz / 10 kHz |
| **HALL** | 1433 1601 1867 2053 2251 2399 2617 2797 | 2.6 s / 1.4 s (above 4 kHz) | 28 ms | 0.70; 223 397 641 883 | 250 Hz / 8 kHz |
| **ROOM** | 337 419 509 593 677 787 863 947 | 0.45 s / 0.30 s | 4 ms | 0.60; 89 157 229 311 | 150 Hz / 7 kHz |

**Music sends** (dB; "—" = none):
- **Scoreboard:** clap plate −12 · snare roll plate −14 · hats — · arp plate −20, plus a ping-pong delay · lead plate −16, plus the delay · pad hall −14 · stab hall −6 · crash hall −12 · 808 and kick —
- **Scoreboard delay:** dotted 8th (0.75 beat from the tempo map), ping-pong, feedback 30%, LP 3.5 kHz and HP 300 Hz in the loop, return −14 dB
- **Becker Rig:** snare room −10 · clap room −12 · marimba room −16 · glock hall −12 · pizz room −14 · brass hall −14 · strings hall −12 · timpani hall −10 · crash hall −12 · kick and bass —
- **As built:** Scoreboard's arp has no ping-pong delay (its plate −20 stays; no delay under 16ths), the lead feeds the delay at −4 dB, and the returns bus is trimmed +2.5 dB (§8.1). Becker Rig's music and SFX sends are all the values above less 1.5 dB, plus a pad hall at −15.5 dB, so its returns stem reads 9.4-12.3 LU under the mix (§6.7.3).

**Stereo:**
- **Below 120 Hz everything is mono:** HP the Side channel at 120 Hz (M/S, 2nd order) on the master.
- No Haas widening: never the same source delayed between channels.
- Width comes only from detuned unison spread (≤ ±60%), decorrelated noise for crashes and shimmers, and the reverbs.
- Kick, 808, bass, clap and snare stay centred.

### 8.6 Master chain, loudness and delivery

1. **Sum** music, SFX and returns.
2. **HP** 25 Hz, 2nd-order Butterworth.
3. **M/S low mono** at 120 Hz.
4. **Loudness gain:** measure integrated loudness with ITU-R BS.1770-4.
   - K-weighting biquads at 48 kHz: stage 1 b = [1.53512485958697, −2.69169618940638, 1.19839281085285], a = [1, −1.69065929318241, 0.73248077421585]; stage 2 b = [1, −2, 1], a = [1, −1.99004745483398, 0.99007225036621].
   - Gating: 400 ms blocks with 75% overlap, an absolute gate at −70 LUFS and a relative gate at −10 LU.
   - Apply a static gain to **−14.0 LUFS**.
5. **True-peak limiter:** ceiling **−1.5 dBTP**, lookahead 5 ms, attack 5 ms, release 80 ms. Peaks are detected 4× oversampled (polyphase FIR, ≥ 48 taps per phase).
6. **Re-measure:** if the loudness is off target by more than 0.1 LU, correct the gain and run the limiter once more. Iterate at most twice. (A1 allows the master ±0.3 LU; the engine holds 0.1.)
7. **Edges:** a 1 ms ramp at t = 0 (anti-click only; the hook stays full level), the final 0.40 s cosine fade, and the last sample exactly 0.
8. **Write** a 32-bit float WAV, 48 kHz, stereo. Write stems with the same master gain, before the limiter: `music.dry` (before the duck), `music`, `sfx`, `returns`.
9. **Encode, decode, verify, retry** (`src/sound/engine.mjs`, `src/sound/ffmpeg.mjs` `encodeAac`):
   - **Encode** AAC-LC (`-c:a aac -b:a 192k -ar 48000 -ac 2`) **behind a silent pre-roll** of 3072 samples (64 ms, 3 AAC frames; `AAC_PREROLL`), then drop the pre-roll's frames by stream copy (see "The first frame" below).
   - **Decode and measure** the true peak (the worse of the JS 4× meter and ffmpeg ebur128) and the decoded integrated loudness.
   - **Pass** when the decoded true peak is ≤ −1.0 dBTP (`DELIVERY_TP`, A2) **and** the decoded PLR is ≤ 12.95 dB, that is `PLR_MAX` = 13.0 (A5) less a 0.05 dB margin. The engine enforces A5: AAC lands 0.05-0.2 LU under the master's −14.0, so a peak that is fine on the master can still break PLR 13 after the encode. Before this, 01c, 03a, 04c, 07a and 08b decoded at PLR 13.02-13.12.
   - **Retry locally first**, at most 3 times. Find the spots where the decoded audio went over the limit (−0.1 dB). Around each spot (±25 ms), lower the limiter's ceiling to the master's **own** true peak there, less the excess and 0.3 dB, then redo steps 5-9. Measure the dip from the master's peak, not from the ceiling: a dip measured from the ceiling did nothing where the master already sat under it (04b at 36.5 s). Lowering the whole ceiling for one transient costs every other transient.
   - **Then globally:** lower the whole ceiling by 0.5 dB and redo steps 5-9, at most 2 times.
   - **The report** records each trial (`master.encodeTrials`: the ceiling, the decoded true peak, and each spot with its excess, the master's peak there and the dip), plus `master.aacPreroll` (3072, or 0 with a warning when the plain encode had to be used).
   - **On 2026-10-12** all 30 teasers ended at ceiling −1.5 dBTP with no global step (04b used to fall back to −2.0). The shipped build (v2.2, now in `renders/channel/`) took 49 encodes: 15 teasers needed one, 12 two, 06c and 08b three, and 07b four. Delivered, as `verify` measures it on the shipped MP4s (A2, the worse of the JS and ffmpeg meters, and A5): true peak −1.19 to −1.50 dBTP, PLR 12.60 to 12.93. Quote these values; `audit` reads the JS meter alone, which gives 06c −1.52 dBTP and PLR 12.58. The build before it, which `renders/channel/` held until then, reached true peak −1.16 dBTP and PLR 12.92.
10. **Mux** onto the finished picture without re-encoding either stream: the verified `.m4a` is copied (`-c:a copy`), so the delivered audio is exactly the stream that was measured.
    - `ffmpeg -i <renders/channel/id>.mp4 -i <id>.m4a -map 0:v:0 -map 1:a:0 -c:v copy -c:a copy -t <info.duration> -movflags +faststart <out>.mp4`
    - The mux is verified: the video-stream md5 equals the source's (A13), the audio is AAC stereo 48 kHz, and it lasts info.duration ±1 frame (A12).

**The first frame.** A pack may put its hardest hit on t = 0 (§4.5, §6.5); the engine takes care of the codec.
- **The problem.** ffmpeg's AAC encoder starts every file with an empty bit reservoir, so the first frame of a hard hit got a fraction of the bits the same hit gets later. 05b's t = 0 hook got 392 bytes in its first frame, where the same audio after silence gets 1039. Its first 50 ms decoded at 12.9 dB SNR and up to about +3 dB over the master's peak, about 12 ms in.
- **Why the retry loop could not fix it.** Lowering the ceiling there did not lower the overshoot monotonically, so the loop fell through to global steps for the whole teaser (−2.5 dBTP in past runs). Becker Rig worked around it in the pack, with its t = 0 brass on a separate voice 2 dB down.
- **The fix.** The encoder meets frame 1 after 64 ms of digital silence (`adelay`). The silence fills the reservoir, so frame 1 is coded like any later frame. AAC frames do not borrow each other's bits, so dropping the silent packets loses nothing.
- **What is kept.** The last silent packet stays as the codec's priming packet. The result has the plain encode's shape: the same packet count, the priming packet at pts −1024 under the usual 1024-sample edit list, the same duration, and a decode at lag 0. `encodeAac` checks this, and falls back to the plain encode with a warning if another ffmpeg build behaves differently.
- **Why 3072 samples.** It is a whole number of frames, so only silence is dropped. It is also a whole number of milliseconds: with 1024 or 2048 samples, ffmpeg sized the last packet 16-32 samples short.
- **Measured.** 05b's first 50 ms decode at 30.5 dB SNR (12.9 plain). Over the first 30 ms, the worst teaser decodes +0.12 dB over its master (04a); it was +1.30 (05b), with 06a at +0.54 and 10c at +0.51. Becker Rig is now at ≤ 0.00 dB, with its hook brass back at the fanfare's level. The INFO row's AAC0 reports this per teaser (§9.7). `test/aac.test.mjs` encodes a full-level hit at t = 0 both ways.

---

## 9. Acceptance checks (what the critics run)

Every check can be measured, and the harness measures it. Thresholds apply to every one of the 30 teasers unless the check names a look. The engine writes `<id>.score.json`, `<id>.report.json` and the stems, so most checks are plain reads; the rest measure the decoded AAC.

### 9.0 The source of truth: `sound/acceptance.json`

- **`sound/acceptance.json` is the machine-readable form of this section.** Every check has one entry there, keyed by the IDs below. An entry's top-level values apply to every look, `looks.<look>` overrides them, and `looks['*']` covers a look that is not listed. `gate: false` means the check is reported but never fails a run. `manual: true` means it is not automated.
- **The harness reads it, and nothing else holds a threshold.** The harness is `sound/checks/`, run by `node src/cli.mjs verify` (`npm run sound:verify`). The audit's symbolic checks (`src/sound/scorecheck.mjs`) read the same file. `test/acceptance.test.mjs` fails in three cases: a threshold no check reads; A1, A2 or A5 differing from the engine's `TARGET_LUFS`, `DELIVERY_TP` or `PLR_MAX`; S9 differing from the engine's `LOOK_DEFAULTS` or a pack's `tempo`. It does not count the `pending` markers (it tests the resolver on a synthetic file), so removing the last one needs no test change.
- **Change both together.** A threshold change goes into `acceptance.json` and this section in the same pass, with the reason here. If this text has to lag, mark the JSON value `pending: { bibleSays, passesNow, reason, sync }`. `verify` lists the pending values after every run, and `npm run sound:pending` prints them. The v2 sync (2026-10-12) resolved v1's seven and left one, an owner decision: A8's correlation target for Becker Rig (§9.1). `SOUND_ACCEPTANCE=/tmp/try.json node src/cli.mjs verify --from <dir>` tries other values without touching the file.
- **What is measured where:**
  - *delivery* is the decoded AAC (the `.m4a` the mux copies, or the muxed MP4's audio);
  - *master* is the float WAV and its report;
  - *stems* are `music.dry`, `music`, `sfx` and `returns`;
  - *score* is `<id>.score.json`.
- **The meters are the engine's own JS**: BS.1770-4, EBU 3342 LRA and a 4× true-peak meter in `src/sound/loudness.mjs`, and the band balance in `src/sound/audit.mjs`. They match ffmpeg's ebur128 to 0.1 LU. The ffmpeg commands below reproduce the §9.1 measurements independently on any MP4.
- **What a run prints:** a row per teaser with I, TP, PLR, LRA and one mark per check (✓ pass, ✗ fail, w waived, i info). Then the pass count per check and look, the unit checks per look, the failures with their measurements, the pending list, and how many master WAVs equal the baseline. It exits 1 on any gated failure. On 2026-10-12, every one of the 30 teasers passed 42/42, Scoreboard's units 69/69 and Becker Rig's 77/77.

### 9.1 Loudness, dynamics, silence (on the final MP4)

```bash
ffmpeg -nostats -i out.mp4 -map 0:a -af ebur128=peak=true -f null - 2>&1 | tail -14     # I, LRA, true peak
ffmpeg -i out.mp4 -map 0:a -af silencedetect=noise=-45dB:d=1 -f null - 2>&1 | grep silence_
ffmpeg -i out.mp4 -map 0:a -af astats=metadata=0 -f null - 2>&1 | grep -E "DC offset|Peak level|Crest"
ffmpeg -i out.mp4 -map 0:a -af "highpass=f=250:poles=2,highpass=f=250:poles=2,ebur128" -f null - 2>&1 | tail -12   # phone proxy
ffmpeg -i out.mp4 -map 0:a -af "pan=mono|c0=0.5*c0+0.5*c1,ebur128" -f null - 2>&1 | tail -12                          # mono fold
ffmpeg -i out.mp4 -map 0:a -lavfi showspectrumpic=s=1920x1080:legend=1:fscale=log:scale=log:color=intensity spec.png
```

| ID | Check | Pass |
|---|---|---|
| A1 | Integrated loudness | delivery −14.0 ± 1.0 LUFS; the master's own report (`loudness.integrated`) −14.0 ± 0.3 |
| A2 | True peak (decoded AAC) | ≤ −1.0 dBTP: the worse of the JS 4× meter and ffmpeg ebur128 (when the build ran the ffmpeg cross-check) |
| A3 | LRA | Scoreboard 4-9 LU · Becker Rig 3-8 LU |
| A4 | Short-term max / momentary max | ≤ −8 LUFS / ≤ −6 LUFS |
| A5 | PLR (A2's true peak − A1's integrated) | 8-13 dB. The engine enforces the upper bound itself: its encode loop retries until the decoded PLR is ≤ 12.95 (§8.6 step 9, `PLR_MAX` = 13.0) |
| A6 | Silence: 50 ms RMS windows below −45 dBFS forming a run ≥ 1.0 s in [0, duration − 0.40] | **none**. The only intentional music dropout is the pre-payoff gap (1 eighth, ≤ 0.27 s), and the SFX riser plays under it |
| A7 | Hook: momentary loudness of the window 0-0.4 s | ≥ −18 LUFS (the music event at t = 0 is S10) |
| A8 | Mono compatibility | Pearson L/R correlation per 400 ms window, silent windows skipped: mean ≥ 0.30 (target 0.45-0.85, not gated; **pending for Becker Rig**, see below), no window < −0.10; the mono fold 0.5·(L + R) has integrated loudness within ±1.5 LU of the stereo's |
| A9 | DC offset | \|mean\| ≤ 1e-4 per channel |
| A10 | Phone proxy (HP 250 Hz, 4th order: two 2nd-order Butterworths) | integrated loudness falls ≤ 7.0 LU (Scoreboard) / ≤ 4.5 LU (Becker Rig). This guards against a mix that is all sub |
| A11 | Limiter (`report.limiter`) | gain reduction > 1 dB on ≤ 3% of samples; max ≤ 6 dB |
| A12 | Delivery (ffprobe of the muxed MP4, or of the `.m4a` when no picture was muxed) | AAC, profile LC, 2 ch, 48 000 Hz, 192 kb/s (±10%); audio duration = video duration ± 1 frame (1/fps) |
| A13 | Picture untouched | the video-stream md5 of the muxed MP4 (`ffmpeg -i x.mp4 -map 0:v -c copy -f md5 -`) equals the source's in `renders/channel/` |
| A14 | Determinism | each master WAV's sha256 equals the `wavSha256` its report holds and differs from every other spec's; with `verify --twice`, it also equals a second render's |

Measured on the 30 teasers (2026-10-12, the shipped v2.2 build):
- **Loudness:** I −14.07 to −14.17 LUFS, true peak −1.19 to −1.50 dBTP (A2), PLR 12.60 to 12.93 (A5), as `verify` reports them. LRA Scoreboard 4.65-6.70, Becker Rig 4.31-5.64. Silence 0%.
- **Hook (A7):** Scoreboard −7.5 to −12.2 LUFS, Becker Rig −10.6 to −12.5.
- **Stereo (A8):** correlation mean Scoreboard 0.73-0.79, Becker Rig 0.87-0.92. The lowest window is 0.32. The mono fold is −0.3 to −0.7 LU.
  - **Pending, the owner's call:** Becker Rig sits over A8's 0.45-0.85 target on all 15 teasers. The gate holds, and nothing is lost in mono (−0.28 to −0.45 LU). Its returns sit 9.4-12.3 LU under the mix (§6.7.3), and its band is centred or panned narrow, so little decorrelated energy reaches the mix. Either the target becomes 0.45-0.92 for Becker Rig (the dry toy box is the design), or the pack widens towards 0.85 and refits (§11.2). `acceptance.json` A8 carries the marker until then.
- **Phone proxy (A10):** Scoreboard 2.6-3.2 LU, Becker Rig 1.7-2.7.
- **Limiter (A11):** at most 2.55% of samples (08a), max 4.29 dB (04b).

### 9.2 Spectral balance (long-term average on the decoded mix)

**BANDS:** octave-band power in dB relative to the 1 kHz octave band, measured with a Hann-window FFT of 8192 points and 50% overlap, averaged over [0, base] (`src/sound/audit.mjs` `bandBalance`), must sit inside the look's window:

| Band (Hz) | 31.5 | 63 | 125 | 250 | 500 | 1k | 2k | 4k | 8k | 16k |
|---|---|---|---|---|---|---|---|---|---|---|
| Scoreboard | **−20..+3** | +4..+10 | +2..+8 | 0..+6 | −1..+4 | 0 | −5..0 | −9..−2 | −14..−5 | −26..−12 |
| Becker Rig | −16..−4 | −2..+7 | +1..+7 | 0..+6 | −1..+4 | 0 | −5..0 | −8..−2 | −13..−5 | −25..−12 |

- **Scoreboard's 31.5 Hz window is −20..+3 (v1: −8..+3).** SB-Kick's tail is 48 Hz and the 808 plays on 58-110 Hz (§4.3), so that octave measures −15.1 to −18.8 dB. v1's −8 could be reached only by tuning the kick's tail to D1 (36.7 Hz) for the meter's sake, as the first pass did. On the critic's instruction, the window moved instead of the kick. The upper bound still stops a sub that swamps the mix.
- **Becker Rig's 31.5 Hz octave** (−8.6 to −12.0 dB) is carried by the kick's 46 Hz tail (§6.3), since the bass has no sub-octave.
- **HARSH (harshness):** the 2-5 kHz band sits ≤ +2 dB above the regression line fitted through the 500 Hz-8 kHz bands. Measured: Scoreboard −1.0 to +0.6, Becker Rig −1.7 to +0.5.
- **Spectrogram (manual, not gated):** a vertical broadband stripe exactly at P and at L; horizontal partials at note frequencies; no mirror lines falling while a riser rises (that is aliasing); no energy wall above 16 kHz. `node src/cli.mjs audit <dir> --out <dir>` writes the PNGs.

### 9.3 Mix relations and timing (stems, score, report)

| ID | Check | Pass |
|---|---|---|
| B1 | Stem balance (§8.1; gated LUFS re the mix, after the master gain, before the limiter) | **Scoreboard:** music −1.5..−3.5 LU, SFX −2.5..−5 LU; the returns stem is reported (about −6 LU). **Becker Rig:** music −0.5..−4.5 LU; the gated SFX stem minus the gated music stem in −2..+2 LU; returns ≤ −8 LU |
| B2 | Payoff duck | the score's duck curve (100 Hz) is ≤ −8 dB everywhere in [P, P + 0.15 s] |
| B3 | Cue audibility | for every cue with kit gain ≥ 0.4 of kind thud, hit, ding, cash, reveal or pop: SFX-stem RMS over [t, t + 50 ms] ≥ music-stem RMS over the same window + 3 dB. **Scoreboard's card cues (t ≥ base) are reported, not gated**: the sting holds over the card by design (§3.2), and its handle cues are texture under it (the card's `pop` and `thud` sit 13.7-15.8 dB under the held sting). Becker Rig's card cues clear B3 and are gated |
| B4 | Onsets | each SFX's first sample above −60 dBFS (a solo render at the master's level, `report.cueStart`) is at the cue time ±2 ms. Allowed pre-roll: `reveal` 180 ms. No cue may be silent |
| B5 | Payoff in audio | the music stem has an onset at P within ±10 ms, searched within ±60 ms of P. **Scoreboard:** the spectral-flux peak (1024-point frames, hop 64). **Becker Rig:** the steepest rise of the energy in 2 ms frames, after a 100 Hz HP |
| B6 | Continuity | music.dry short-term loudness (3 s windows ending in [3 s, base], every 100 ms) never more than 18 LU below music.dry's own integrated loudness. The TENSION gap needs no exemption: a 3 s window never falls 18 LU for a ≤ 0.27 s gap |
| B7 | Energy curve | music.dry short-term loudness, sampled every 100 ms both on windows ending at t (edge) and on windows centred on t (clipped at base); both must pass: mean over [P, P + 2 bars] ≥ BUILD mean + 2 LU; HOLD mean ≤ DROP mean − 1.5 LU; the BUILD's second half ≥ its first half |
| B8 | Logo | delivery momentary loudness of the window ending at L + 0.2 s ≥ −13 LUFS and ≤ the window ending at P + 0.2 s |
| B9 | Card tail | master WAV: no 50 ms window (RMS of the louder channel) below −45 dBFS in [base, duration − 0.40]; the last sample is 0 on both channels. The 0.40 s cosine fade is the engine's (§8.6 step 7), not measured |
| B10 | Flams | no music kick, snare or clap onset 15-70 ms from a cue onset (hit, thud, cash, reveal) with gain ≥ 0.5. Music hits at the anchors (0, P, V, base) are exempt, because anchors never yield (§4.6.1): 09c's mandatory kick at P = 19.12 s would otherwise flam with its `cash` at 19.18 |

- **B5 per look.** In Becker Rig, the reverse crash that ends exactly at P and the brass "ka" scoop both put energy into the flux frame that straddles P. So the flux centre leads the downbeat by a frame and a half: −8.0 ms on all 15, inside 10 ms but with 2 ms to spare. The energy rise resolves the downbeat itself, at 0.0 ms on all 15. Scoreboard's flux peak reads −8.0 to +1.3 ms; the energy rise reads 0.0 on all 30.
- **Measured on 2026-10-12:**
  - B3: the closest cue sits 3.9 dB over the music in both looks.
  - B6: the deepest dip is 5.3 LU.
  - B7: the DROP sits 2.6-5.9 LU over the BUILD.
  - B8: the logo lands at −11.65 to −12.57 LUFS (Scoreboard) and −10.46 to −12.48 (Becker Rig).

### 9.4 Symbolic score (`<id>.score.json`)

The score holds `key`, `anchors`, `tempo` segments, `bars [{ i, t, beats, bpm, section, energy, chord: { sym, root, tones, bass } }]`, `notes [{ t, dur, midi, vel, inst, role, chromatic?, bus? }]`, `drums [{ t, inst, vel, bus? }]`, `sfx [{ t, kind, gain, cueGain, pitches, pan, duck }]` and `duck` (100 Hz). Times are stored to 1 ms. Roles: bass, pad, arp, lead, stab, brass, mallet, glock, pizz, strings, logo. The checks read body notes (t < base, role not `logo`) unless they say otherwise.

| ID | Check | Pass |
|---|---|---|
| S1 | In key | ≥ 97% of pitched body notes have pitch classes in the look's set or in the sounding chord, or are flagged `chromatic`. Scoreboard {D E F G A Bb C}, plus C# under A or A7; Becker Rig {D E F# G A B C#}, plus C, plus the tones of any written borrowed or applied chord (Gm, G#°7, E7). The logo set {A, D, E, F#} is always allowed in the card. *Not automated:* that each flagged note moves by ≤ 2 st within 1 beat to a chord tone (read the score) |
| S2 | Chord tones on strong beats | notes starting within ±15 ms of beat 1 or beat 3 of a body bar are tones of the sounding chord (flagged chromatic notes excepted). Bass and pad: 100%; every other role: ≥ 95% |
| S3 | Registers (MIDI, inclusive, by role) | **Scoreboard:** bass (the 808) 26-57 (roots 34-45, octave pops ≤ 57, the P/L sub at 26) · arp 57-98 (57-86, octave copy ≤ 98) · lead 69-86 · pad 57-76. **Becker Rig:** bass 38-61 (roots 38-50, octave pops ≤ 61) · mallet 62-86 · glock 74-93 · pizz 50-74 · brass 53-86 (53-74, fanfare doubling ≤ 86) · strings 55-79 · timpani 33-38 · pad 55-74. **Both:** SFX pitched layers ≤ 105 |
| S4 | Bass on the downbeat | the bass note within ±15 ms of each bar line is the chord's written bass (root, slash bass or D pedal); bars marked BREAK or CARD are exempt |
| S5 | Repetition | ≤ 2 consecutive identical bar fingerprints (all body events: instrument, 1/32-bar position, MIDI, velocity rounded to 0.1); ≥ 3 distinct fingerprints in any 8-bar window. *Not automated:* no 2-bar lead or glock phrase more than twice |
| S6 | Anchors | a bar line at P (\|Δ\| ≤ 1 ms); kick, bass and crash/stab/brass events at P (\|Δ\| ≤ 1 ms); no music note-on in [P − 1 eighth, P) except the reverse crash. V and base fall on bar or break boundaries as in the §2.3 table (the tempo-map vectors in `npm test`) |
| S7 | Logo | role `logo` notes MIDI 69, 74, 76, 81 at L − 0.300, L − 0.200, L − 0.100 and L (±1.1 ms: the 1 ms of v1 plus the score's rounding) in **both** looks; D, F#, A and E sounding at L |
| S8 | Humanising | **Timing:** the offsets of the hats (Scoreboard, on the straight 16th / 32nd / triplet grid) and of the shaker (Becker Rig, on the 58% swung grid) from their grid have a standard deviation of 1.5-5 ms. The 58% swing is the grid the shaker is judged against, not a separate measurement. **On the grid:** body kick, snare and clap within 0.2 ms of the grid; a drum merged onto a cue onset (\|Δ\| ≤ 1 ms, §4.6.1, §6.6.1) is exempt. **Velocity:** per-instrument standard deviation 0.03-0.15. Becker Rig: gated over instruments with ≥ 8 body events, except its accent-only voices (revcrash, timp, crash, whistle, honkF, strings). Scoreboard: reported, not gated (≥ 4 events) |
| S9 | Tempo | segment 1 inside the look's range (Scoreboard 136-152, Becker Rig 112-128 BPM; any other look, as Becker Rig); later segments inside the absolute limits (128-160, 104-136) and within ±8% of BPM₁ (±5% when V is anchored); a free segment (§2.3: base left free) is exempt |
| S10 | Frame 1 | a kick, an 808/bass and a stab/brass event within ±1 ms of t = 0, each with velocity ≥ 0.9 |
| S11 | Energy plan | HOOK's first bar E4, the rest E3; BUILD non-decreasing; DROP E5; HOLD and HOLD 2 ≤ E4. *Not automated:* TENSION has no kick or clap backbeat (Scoreboard) / a heartbeat kick (Becker Rig) |
| S12 | Voice leading | pad voices move ≤ 5 st between consecutive body chords of the same size (not across P; the card's chord at L is not a body chord) |
| S13 | Melody | roles lead, glock and melody, split into phrases at gaps > 0.6 s: leaps ≤ 12 st; after a leap ≥ 6 st, the next interval is opposite and ≤ 4 st in ≥ 75% of cases; phrase range ≤ 19 st |
| S14 | Polyphony | ≤ 12 pitched body notes sounding at once, each counted for its whole written duration. That is stricter than v1, which excluded tails below −30 dB. All 30 teasers measure exactly 12 |

- **S8, velocity.** The score keeps the final velocity: the written accent × the humanising jitter. The bible means the jitter.
  - Becker Rig gates the raw SD of its voices with ≥ 8 body events and leaves out the accent-only ones; all 10-12 such voices per teaser pass.
  - Scoreboard's accented parts are arp, stab, hat and snare. Their raw SD is 0.16-0.42, from the written accents alone, so it is reported, not gated.
  - Gating Scoreboard's velocity humanising would need the score to export the written velocity next to the final one.
- **S8, timing.** Measured hat timing SD is 2.7-3.1 ms (Scoreboard) and shaker timing SD 2.2-2.6 ms (Becker Rig). Kick, snare and clap sit at most 0.1 ms off the grid.

### 9.5 DSP unit checks (pack test harness)

`npm run sound:units` runs them without building audio (about 30 s).

| ID | Check | Pass |
|---|---|---|
| U1 | Aliasing | each pitched instrument plays D6 (MIDI 86) and A6 (MIDI 93) for 1 s. Spectral peaks not at multiples of f₀ (±1%) stay ≤ −50 dB re the fundamental (the inharmonic BR-Mallet, BR-Glock, BR-Timp and cash partials are judged against their own partial list) |
| U2 | Clicks | every voice's and SFX buffer's first and last 1 ms have \|Δsample\| ≤ 0.02 (transient-led starts exempt: < 0.5 ms attack by design) |
| U3 | Bounds | no NaN or Inf; every SFX at gain 1 peaks within its palette peak + 1 dB (§5, §7; as built, Scoreboard `type` −16 and Becker Rig `reveal` −8; Becker's `hit` is held to −4 + 1 for every hit, so the big variant's −3 is the limit). Scoreboard renders each kind solo on a synthetic timeline; Becker Rig renders every cue of its 15 teasers |
| U4 | Variation | two consecutive same-kind cues rendered solo have a normalised cross-correlation < 0.98. Scoreboard's `buzz` is exempt (§5 gives it no variation; it plays once per teaser). Scoreboard compares two solo renders at lag 0 on the left channel; Becker Rig compares consecutive cues of each of its teasers (mono, best of lags 0, ±1, ±2 ms) |

On 2026-10-12: Scoreboard U1 14/14, U2 24/24, U3 15/15, U4 15/15 (plus LOGO, §9.6); Becker Rig U1 18/18, U2 33/33, U3 15/15, U4 11/11.

### 9.6 Pack rules (gated, one look each)

Each look's pack adds checks for its own design (§4.6, §4.7, §6.6, §6.7). They live in `sound/checks/looks/<look>.mjs`, with their thresholds in `acceptance.json`:

| ID | Look | Pass |
|---|---|---|
| TRAIN | Scoreboard | clock trains never flam: no music kick, clap, snare or hat, and no arp, lead or stab note, starts 12-60 ms from a clock-train tick (anchors excepted; §4.6.6) |
| DUCK | Scoreboard | the B3 clearance stays band-selective: each cue's broadband duck (`score.sfx[].duck`) is ≤ 1.5× its §5 table depth, scaled by clamp(gain / 0.7, 0.3, 1.2), or ≤ 6 dB at the hook and at V where that is more (tolerance 0.05 dB; §4.7.4) |
| LOGO | Scoreboard (unit) | the sting's long note leads: n4's RMS over its first 85 ms is ≥ 2 dB over each pickup's, solo at the mix levels (§3.2) |
| MALLET | Becker Rig | the marimba carries the BUILD. Each instrument is re-rendered over the BUILD, before glue and duck, with `musicDb` and the voice automation. The marimba's K-weighted loudness is ≥ −10 LU re the band, and it is the loudest voice in 500-1200 Hz (§6.4) |
| FLAMS | Becker Rig | no music kick, snare, clap or tom onset 15-70 ms off a body cue (thud, hit, cash, reveal, step) with gain ≥ 0.35, or off a clock-train tick or thud (anchors excepted; §6.6) |

### 9.7 Reported, never gated

- **B1w** (Becker Rig): v1's B1 bands (music −2.5..−4.5 LU, SFX −2..−4 LU re the mix). They fail on all 15 teasers by design (§8.1), and stay in the report so a drift back towards v1's balance shows.
- **INFO**, for every look:
  - AAC0: the decoded true peak over the first 30 ms against the master's, the number of encodes and the final ceiling (§8.6). A teaser on the global fallback shows here first.
  - Becker Rig only, the critic's measurements:
    - B1u: the SFX stem's ungated share of the mix, and the SFX's own contribution (the mix minus the mix without SFX);
    - REACT: the react voices and the duck curve under them, the duck under the `ding` at V, and the P duck's bloom;
    - DUCKSTATS: the share of the body ducked ≥ 6 dB, dips over 6 dB per minute, and the duck depths per kind (a dip ends when the duck recovers above −3 dB);
    - FOLEY: the in-band audibility of tick (500-3000 Hz), step (80-1200 Hz), roll (1800-2600 Hz) and whoosh (700-3500 Hz);
    - DEFLATE: the Gm span and the bass bends.
- **SPECTROGRAM** (manual, §9.2), and the *not automated* parts of S1, S5 and S11: read the PNGs and the score.

---

## 10. What the engine must provide

1. **Timeline analysis** (§2):
   - cue prep (negative t, trains, clusters, indices)
   - the payoff scorer, the overrides file and the tempo map
   - anchors, bars, sections and the density map
   - `beatAt`, `timeAt`, `barAt` and `chordAt`, and the card anchor L
2. **DSP primitives:**
   - oscillators: PolyBLEP saw and square (with pulse width), sine, triangle (integrated PolyBLEP square), seeded white noise
   - filters: TPT/ZDF state-variable filter (LP, BP, HP, 12 dB; cascaded for 24 dB) with per-sample cutoff modulation; 1-pole filters; DC blocker
   - envelopes: ADSR (linear attack, exponential decay and release), exponential τ, exponential pitch glides with phase accumulation
   - sources: Karplus-Strong; FM operator with an index clamp
   - effects: `tanh` saturation; FDN reverb (§8.5); tempo-synced ping-pong delay; reverse buffers
   - dynamics: compressor; the event-duck generator; kick sidechain; true-peak limiter (4× oversampled)
   - meters: BS.1770-4 loudness (integrated, short-term, momentary, LRA)
   - utilities: M/S, constant-power pan
3. **Rendering:**
   - note, drum and SFX events into stereo voices
   - sample-exact placement and deterministic summing (voices in the order t, bus, instrument, midi, index, with the buses ranked logo, react, music)
   - buses, sends and returns, including the react bus (§8.3.1) and an event's `bus` (`'music'`, `'react'`, `'logo'`; anything else is an error)
   - the coincident-cue merge (§8.4)
   - the master chain (§8.6), with the encode loop and the AAC pre-roll
4. **Outputs:**
   - master WAV (float32, 48 kHz, stereo) and the verified `.m4a`
   - stems: `music.dry`, `music`, `sfx`, `returns`
   - `<id>.score.json` (§9.4)
   - `<id>.report.json`: P, BPMs, anchors, loudness, true peak before and after AAC, LRA, limiter gain-reduction statistics and hotspots, `stems` (B1), `cueStart` per cue, `master` (gain, ceiling, `encodeTrials`, `aacPreroll`), warnings, the Node version and the WAV sha256
5. **CLI** (`node src/cli.mjs …`; full reference in `sound/README.md`):
   - `audio <specs…> --out /tmp/sound [--stems]`: mounts each spec for its cues only, with no frames
   - `sound <specs…> --video ../renders/channel --out <dir> [--score --wav --stems]`: the same audio muxed onto the finished MP4s, picture copied bit for bit (§11.5)
   - `remux <spec> --video <mp4> --out <mp4>`: the §8.6 mux for one spec
   - `verify [specs…]`: the acceptance harness (§9.0), which also compares the cue records with the fixture (§11.1); `cues`: the cue records; `score`: the plan without audio; `audit`: measurements and spectrogram PNGs
   - `render` uses the new audio by default; `--legacy-audio` keeps the old mono SFX
   - nothing is written into `renders/channel/` without `--final`
6. **Pack API:**
   - the engine looks for `studio/sound/packs/<look>.mjs`, then `studio/looks/<look>/sound.mjs` (where both packs live), then the default pack; `--pack file.mjs` overrides
   - each pack exports `{ look, key, tempo: { lo, hi, target, syncGrid, absLo, absHi }, harmony(tl, rng), compose(tl, rng) → { notes, drums, automation }, instruments, sfx: { [kind]: (cue, ctx) → stereo buffer }, logo(tl, ctx), mix }`; `mix.react` sets the react bus (§8.3.1) and `mix.payoffDuck` the payoff duck (§8.3)
   - the SFX `ctx` gives `chordAt`, `keyAt`, `beatAt`, `rng`, `n` (the occurrence index), `train`, `cluster`, `isAnchor`, `inCard`, `dropBody`, `dropTransient` and `claim`
   - **every pack implements all 15 kinds**
7. **Tests** (`npm test` stays green):
   - determinism: the same spec gives the same sha256
   - the tempo-map vectors: the §2.3 rows, read from this file, and Appendix B printing exactly them (when python3 is present); Appendix A's sections and energy
   - the logo note times
   - no NaN, and bounds
   - the -14 LUFS target on a test spec
   - the audio duration equals the video's
   - the legacy `mix()` test is kept
   - `acceptance.json` agrees with the engine and the packs (§9.0)
   - the cue-drift guard (§11.1)
   - the react bus routing (§8.3.1) and the AAC pre-roll's shape and first frame (§8.6)

---

## 11. Changing things safely

The 30 teasers pass because of rules here, values fitted to today's cue lists, and an engine that measures what it delivers. These are the guard rails for whoever changes something next. Run everything from `studio/`.

### 11.1 The cue-drift guard, and what to do when it fires

Both packs carry values fitted on the 30 cue lists in `test/fixtures/cues.json` (the records `openSpec` gave on 2026-10-11):
- **Scoreboard:** `looks/scoreboard/sound/calibration.json` (`BEDS`, `M_FIT`, `GM`, `GM_PLAN`, `LOGO_PRE`, `OPEN_FIT`).
- **Becker Rig:** `looks/becker-rig/sound/balance.mjs` `MODEL` (`C`, `a`, `b`, `tiltUp`, `iBias`).

The same records are the input of the test vectors: the §2.3 table (P, V, base, L and the tempos), Appendix A's 09c and 09b, and a few values `test/sound.test.mjs` pins.

A kit, spec or brand change that moves a cue leaves the fitted values describing a teaser that no longer exists. Nothing in the audio fails loudly: the SFX fader, the sting level and the card trim just drift, and every `verify` check can still pass. So the comparison runs wherever records are mounted:
- **`npm test`** gates on it. `test/cues.test.mjs` (about 10 s) mounts all 30 specs in Chromium and compares each record with the fixture. When one moves, it fails with `cue list changed for <id>: refit the sound pack, see <the look's tools/README.md>` and the first differing fields, for example `sfx[3].t: 2.7 -> 2.75`. It also fails when a spec has no record or a record has no spec. Run it alone after editing a spec or a kit: `node --test test/cues.test.mjs`. `SOUND_SKIP_CUE_DRIFT=1` skips the mount for a quick local run, never for a release.
- **`verify`** prints a `CUE DRIFT` block under its results when the records it mounted differ from the fixture. `--strict-cues` makes that a failure; the ship flow uses it (§11.5).
- **`render`, `audio`, `sound` and `cues`** print the same lines (`! cue list changed for …`) when they mount a spec whose record differs.

All of them use `src/sound/cues.mjs` `cueDrift`. The commands skip the comparison under a non-default brand (`--no-brand`, `--brand`, `--logo`), which changes every record by design.

**When it fires**, in this order:
1. **Refit** the look whose teasers moved, on a fresh dump of the records (§11.2). The fixture still holds the old records, so pass the fresh dump to the calibration tools with `--cues`. Becker's tools fall back to the fixture without it (and say so); Scoreboard's `calibrate.mjs` requires it.
2. **Verify** (§11.3). The `CUE DRIFT` block is expected here: the fixture is updated next.
3. **Store** the new records: `node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`.
4. **Regenerate the tempo-map vectors:** `node sound/tools/tempo-table.mjs`, then again with `--write`. The tool runs Appendix B (python3, no packages) on the stored records and checks that the engine agrees with it on every row. It then lists the §2.3 rows that moved (P, V, base or L), and `--write` rewrites them in this file. `test/sound.test.mjs` reads its vectors from that table, so there is no second copy to edit. A brand change that moves the card (its `cta.dur`, or the card's `pop` or `hit`) moves L on every row. If the engine and Appendix B disagree, the tool stops: fix the engine or the rule (§2.2-2.4 and Appendix B together), never the table.
5. **Update the values kept by hand.** These are Appendix A's tables for 09c and 09b, and the values `test/sound.test.mjs` pins in "timeline: Appendix A …": the 09c sections, the energy strings, the first cue, and the 10a, 10b, 02a and 09b clock-train periods. If one of those teasers moved, the tool prints the new values; update the test and Appendix A in the same change. Each failing assertion names its value and points here.
6. **`npm test`**, all green.
7. **Record it as a bible change.** Add a line to the status block at the top: which specs' rows moved, and why. Then ship (§11.5); its last step rewrites the sound baseline.

### 11.2 Refitting a pack

Refit after any change to the arrangement, the levels, the sends, the duck table, the SFX renderers or a cue list. The derivation of every value, which values are fitted and which are designed, and the state on 2026-10-12 are in each look's `sound/tools/README.md`. Always fit on a fresh dump of the records (the first command of each block): the fixture still holds the old ones until step 3 of §11.1. Every tool takes `--cues <file>` or `--cues=<file>` and stops on an unknown flag.

**Scoreboard** (`looks/scoreboard/sound/tools/README.md`):

```bash
node src/cli.mjs cues specs/*-scoreboard-*.json --out /tmp/snd-sb/cues.json
node src/cli.mjs audio specs/*-scoreboard-*.json --cues /tmp/snd-sb/cues.json --out /tmp/snd-sb/run --stems --no-check
node looks/scoreboard/sound/tools/calibrate.mjs /tmp/snd-sb/run --cues /tmp/snd-sb/cues.json            # prints the values
node looks/scoreboard/sound/tools/calibrate.mjs /tmp/snd-sb/run --cues /tmp/snd-sb/cues.json --write    # stores them in calibration.json
```

Each calibration moves the next render a little, because the fader, the opening lift and the sting all read the table. Render and calibrate again until the printed values stop moving; two rounds are usually enough. On 2026-10-12 the pack sat at its fixed point: a re-measure matched `calibration.json` within 0.03 dB on the scalars and 0.10 dB on `BEDS`. `BEDC` is retired, because the B3 clearance renders the bed at every cue window. The designed constants (`S_MINUS_M` −1.35, `S_FLOOR` −2.1, `LIFT_MAX` 4, `LOGO_AT` −12.1) are not fitted; change them deliberately.

**Becker Rig** (`looks/becker-rig/sound/tools/README.md`):

```bash
node src/cli.mjs cues specs/*-becker-rig-*.json --out /tmp/snd-br/cues.json                     # today's records (without --cues the tools read the fixture, and say so)
node looks/becker-rig/sound/tools/fit.mjs --cues /tmp/snd-br/cues.json > /tmp/fit.jsonl         # every Becker teaser at trim 0 (about 5 min)
python3 looks/becker-rig/sound/tools/fitsolve.py /tmp/fit.jsonl                                  # needs numpy: prints a, b, C, tiltUp, iBias and the residuals
node looks/becker-rig/sound/tools/trims.mjs --cues /tmp/snd-br/cues.json                        # each plan's predicted master gain, to compare with report.master.gainDb
```

Copy the printed values into `MODEL` in `balance.mjs`; this changes every Becker master. For level changes, `dump.mjs` and `opt.py` propose voice levels and tilt slopes against the §9.2 windows and MALLET, which they read from `acceptance.json`. `bandparts.mjs <id>` shows where each octave's energy comes from when BANDS fails.

**State on 2026-10-12: refit and shipped.** `MODEL` had been fitted before the pack's last fixes, and 06c's condensed cut then moved its cue record, so it was refit on the fresh records. The fit took two rounds, because the card trim reads the predicted gain and so moves the fitted mix. Round 1 gave C −23.37, a 0.065, b 1.159, tiltUp 0.63, iBias −0.41; round 2 gave a 0.061, b 1.165, iBias −0.42. A third round moved the predicted gains by under 0.01 dB. The values replaced were −23.46, 0.007, 1.288, 0.88, −0.35. The refit changed all 15 Becker masters, and it shipped with the condensed 06c and the reference-octave crowding (§6.7 item 4). The predicted master gain is still off by −0.66 to +0.37 dB (mean −0.20) against the delivered reports, about as before. The error comes from the music-stem model, C + duck cost + tiltUp·tilt, whose residual on the 15 teasers is −0.59 to +0.61 dB, and no refit can remove that. Every teaser passes B8.

**Tightest BANDS margins after v2.2** (the delivered build, re-measured by `verify` after 06c's re-ship): 02a 2 kHz 0.1 dB under its ceiling, 04b 250 Hz 0.1 over its floor, 09a 2 kHz 0.1 under its ceiling and 01c 500 Hz 0.2 under its ceiling, all Becker Rig. The next tier is 02c (Scoreboard) 2 kHz and 05b 8 kHz at 0.3 dB. The previous build's MP4s had the same margins, so v2.2 did not cause them, but these octaves will flip first on the next pack change or refit. Check them in `verify --detail` before shipping one, and widen them with `opt.py` if there is room.

### 11.3 Running the harness

```bash
npm run sound:verify                                  # all 30: build audio + AAC + stems into a temp dir, mux onto ../renders/channel (read only), run every check
node src/cli.mjs verify specs/09c-*.json --detail     # some specs, with every measurement
node src/cli.mjs verify --from <dir> [--cues cues.json]   # outputs you built (audio --stems, or sound --score --wav --stems)
npm run sound:units                                   # the unit checks only (about 30 s)
npm test                                              # includes the acceptance-file, tempo-table and cue-drift tests
node --test test/cues.test.mjs                        # the cue-drift guard alone (about 10 s): run it after editing a spec or a kit
node sound/tools/tempo-table.mjs                      # the §2.3 rows: Appendix B against the engine and this file (§11.1)
node src/cli.mjs check                                # the picture lint (30/30 clean)
```

A full `verify` takes about 5-6 minutes with 4 workers and about 2.1 GB of temporary space, so check the free disk first (`df -h /tmp`): a full disk stopped one run on 2026-10-12. Under the results it prints how many masters equal the baseline and whether the records match the cue fixture (`CUE DRIFT`, §11.1; `--strict-cues` makes drift a failure). The run never writes into `renders/`; a failing run keeps its outputs and prints where they are. Read the failures' measurements first. A11 failures name the limiter's hotspots in `report.limiter.hotspots`, and BANDS failures have `bandparts.mjs`.

### 11.4 Determinism and the baseline

- **The same spec gives a byte-identical master WAV**: across runs, across 1 or 4 worker threads, and between a live Chromium mount and the cue fixture. A14 checks every run. `verify --twice` renders everything a second time and compares.
- **`test/fixtures/sound-baseline.sha256`** holds the masters' sha256 (`sha256sum` format). Every `verify` prints how many masters equal it.
  - `verify --expect-identical` turns any difference into a failure. Use it for a change that must not touch the audio (a refactor, a routing migration).
  - After an intended change, `npm run sound:baseline` re-verifies all 30 (a full build, about 2.1 GB of temp space) and rewrites the file only if everything passes. `verify --from <dir> --write-baseline test/fixtures/sound-baseline.sha256` does the same on a build you already have. Say in the commit which masters changed and why.
- **State on 2026-10-12 (shipped).** The baseline and `renders/channel/` hold the v2.2 build: the AAC pre-roll, the `honkF` hook, the Becker refit and its crowding rule, and 06c's condensed cut. Against the previous baseline, 24 of the 30 masters changed:
  - all 15 Becker Rig teasers: the t = 0 brass is 2 dB louder, `MODEL` was refit, and 06c, 07c and 09b sit nearer their bells (§6.7 item 4); 06c is the new cut;
  - nine Scoreboard teasers (03b 04a 04c 05c 06b 07a 08a 10a 10c), because the encode loop's local dips land elsewhere or are no longer needed.
  - 01a 02b 02c 03c 06a 09c are identical. Every AAC stream changed, so all 30 MP4s in `renders/channel/` changed, each with its video stream bit for bit as before (06c's is the condensed cut's new render).
  - Later the same day 06c's picture was re-rendered once more, for its opening (§11.5). Its master and its AAC stream did not change, so the baseline rewrite kept the same 30 hashes. Only 06c's video stream is new.
- **No float shortcuts.** Seeded streams only, a fixed summing order (§1) and no clock. A change that makes two runs differ is a bug, even if every other check passes.

### 11.5 Rebuilding the audio onto the finished videos

The pictures in `renders/channel/` are final. New audio goes onto them by stream copy, so a sound change never needs a re-render. Before shipping, settle the open owner decisions (`npm run sound:pending`). On 2026-10-12, Becker's `MODEL` was settled by a refit (§11.2). A8's Becker Rig target (§9.1) was still open at that ship. No gate reads it, and the ship carried it as it stood.

```bash
df -h /tmp                                                       # about 2.3 GB free: the build below takes 2.1 GB, verify adds about 0.1 GB
node src/cli.mjs sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4 --score --wav --stems --jobs 4
node src/cli.mjs verify --from /tmp/sound/mp4 --strict-cues     # every check on exactly these files; A13 compares each picture with renders/channel
cp /tmp/sound/mp4/*.mp4 ../renders/channel/                      # the owner's step, once verify passes
node src/cli.mjs verify --from /tmp/sound/mp4 --write-baseline test/fixtures/sound-baseline.sha256   # record the delivered masters
rm -rf /tmp/sound/mp4
```

- **Disk.** The last step reuses the build. `npm run sound:baseline` would build all 30 again, about 2.1 GB more while `/tmp/sound/mp4` still exists: about 4.2 GB at the peak, more than this container had free on 2026-10-12.
- **`--strict-cues`** fails the run if a record differs from `test/fixtures/cues.json`. Fitted values on stale records still pass every other check (§11.1).
- `sound` refuses to write into `renders/channel/` unless `--final` is passed. Even with `--final`, `--out` cannot be the `--video` directory: ffmpeg refuses to write a file it is reading ("Output … same as Input #0 - exiting"). Build elsewhere, verify, then copy.
- Each mux is checked as it is written: the video-stream md5 must equal the source's, the audio must be AAC stereo 48 kHz, and its duration must match the video's within 1/fps. The muxed audio is the verified `.m4a`, copied (§8.6 step 10).
- For one teaser: `node src/cli.mjs remux specs/<id>.json --video ../renders/channel/<id>.mp4 --out /tmp/sound/<id>.mp4`.
- **A teaser whose picture was re-rendered** (06c's condensed cut on 2026-10-12, then its opening heft the same day) ships the same way, from a picture folder that holds its new render and `renders/channel/`'s file for every other teaser (symlinks work). Pass that folder as `--video` to `sound` and to the `verify --from` before the copy, because A13 compares each MP4 with its source. After the copy, the `--write-baseline` run can compare against `renders/channel/` again.
- Re-rendering a picture (`node src/cli.mjs render`) also renders its audio with this engine, so a re-rendered teaser needs no separate audio step. `render` prints a cue-drift warning when the kit or spec moved a cue. Whenever a kit or a spec changed, run `node --test test/cues.test.mjs`, then `verify --strict-cues`. If a record moved, follow §11.1 before shipping.

---

## Appendix A. Worked examples (the critics' sanity references)

These follow the rules above. If an implementation disagrees with these tables, one of the two is wrong: fix it or fix this file.

### A.1 09c (Scoreboard, growth-ladder, 34.0 s, base 31.5)

Tempo: 46 beats @ 144.351 BPM to P = 19.120 (riser rule), bar 0 a 2-beat pickup; then 16 beats @ 148.15 to V = 25.600; then 14 beats @ 142.37 to base = 31.500, ending in a 2-beat break.

| Bars | Time (s) | Section | E | Chords | What happens on screen and in the cues |
|---|---|---|---|---|---|
| 0 (2 beats) | 0.000-0.831 | HOOK | 4 | Dm | Stab, 808 dive, kick, crash at 0.000; the `ding` cued at −0.05 plays whole at 0 (merge rule: only one low body, pitched to Dm) |
| 1 | 0.831-2.494 | HOOK | 3 | Dm | Row 1 on screen |
| 2-5 | 2.494-9.144 | BUILD phrase 1 | 3 | Dm Bb F C | `thud` 3.0, `roll` 4.72 (hats muted 4.72-5.65), `ding` 5.70, `thud` 8.0, `roll` 8.12 |
| 6-9 | 9.144-15.795 | BUILD phrase 2 | 4 | seeded SB1/SB2 | `ding` 9.36, `thud` 12.2, `roll` 12.32, `ding` 13.61. Sparse beats around 10.2-12.1 carry a lead call and answer |
| 10 (beats 1-2) | 15.795-16.626 | BUILD (end) | 4 | (phrase 3, first chord) | |
| 10 (beats 3-4) to 11 | 16.626-19.120 | TENSION (6 beats; riser 16.60-19.12) | → | Bb (2) · C (2) · Asus4/A (2) | `thud` 16.6, `roll` 16.72-19.07 (hats muted anyway). Snare roll. **Gap 18.912-19.120** |
| 12-13 | 19.120-22.360 | DROP | 5 | Dm · Bb | **P 19.120:** `hit` and `cash` 19.18 over the music drop; duck 9 dB |
| 14-15 | 22.360-25.600 | HOLD (end-aligned, ends at V) | 3 | Gm9 · A7sus4/A7 | The verdict band appears; no lead |
| 16 | 25.600-27.286 | VERDICT | 4 | Dm(add9) | `reveal` 25.60, `cash` 25.68, stab −3 dB |
| 17 | 27.286-28.971 | HOLD 2 | 3 | Bbmaj7 | |
| 18-19 (4 + 2 beats) | 28.971-31.500 | CADENCE | 3 | Gm9 (2) · A7sus4 (2) · A7 (2, the break) | Fill on the last beat; stop at 31.500 |
| card | 31.500-34.000 | CARD | | D add9 at L | Logo A4 31.56 (with the card `pop`), D5 31.66, E5 31.76, **A5 at L = 31.86**; card `thud` 31.96 (body muted); `roll` 32.44-32.94 on D6-E6-F#6-A6; `ding` 32.94 = F#6 + A6; fade 33.60-34.00 |

### A.2 09b (Becker Rig, growth-ladder, 29.5 s, base 27.0)

Tempo: 36 beats @ 121.348 BPM to P = 17.800 (riser rule); then 18 beats @ 117.39 to base = 27.000, ending in a 2-beat break. V = 22.3 is not anchored: `pick(V, base)` would need +5.2%.

| Bars | Time (s) | Section | E | Chords | Cues |
|---|---|---|---|---|---|
| 0 | 0.000-1.978 | HOOK | 4 | D | "Ta-da" at 0; first throw: `swipe` 0.754, `thud` 1.000 |
| 1-3 | 1.978-7.911 | BUILD phrase 1 | 3 | D G Bm | Throws every 2.0 s (`swipe` x.0, `thud` x.4) |
| 4 | 7.911-9.889 | BUILD phrase 1 (last bar) | 4 | A (turnaround: the marimba plays the em motif on steps 13-16) | E4 starts here (the midpoint tie goes to the earlier bar line) |
| 5-7 | 9.889-15.822 | BUILD phrase 2 | 4 | seeded BR1/BR2 | Throws to 13.4, `thud` 14.2, `step` 15.237 |
| 8 | 15.822-17.800 | TENSION (4 beats; riser 15.69-17.38, `whoosh` 17.38) | → | D/F# · G · G#°7 · A7 (one per beat) | Heartbeat kick and tremolo climb; **gap 17.553-17.800** |
| 9-10 | 17.800-21.889 | DROP | 5 | D · G/A | **P 17.800:** `hit` (big) and `cash` 17.92; fanfare; `step` 18.44 |
| 11 | 21.889-23.933 | HOLD | 3 | G | Verdict `ding` 22.30 (off the grid, duck 3 dB); no glock until 23.933 + 2 bars |
| 12-13 (4 + 2 beats) | 23.933-27.000 | CADENCE | 3 | Em7 (2) · A7sus4 (2) · A7 (2) | Fill; stop at 27.000 |
| card | 27.000-29.500 | CARD | | D add9 at L | `whoosh` 27.00; marimba A4 27.20, D5 27.30, E5 27.40, **A5 (glock), brass and timpani at L = 27.50** with the card `hit` (body muted); `pop` 27.58 = D6; `ding` 27.92 = F#6 + A6; fade 29.10-29.50 |

---

## Appendix B. Reference implementation of §2.2-2.4 (Python, for the test vectors)

`cues.json` maps each spec id to its cue record (`{ look, base, brand, sfx, verdict, … }`), as `node src/cli.mjs cues` dumps it from `openSpec`; `test/fixtures/cues.json` is one. Saved as `ref.py`, `python3 ref.py cues.json` prints the rows of the §2.3 table, character for character. You do not need to copy it out: `node sound/tools/tempo-table.mjs` runs this block straight from this file, checks the engine against it and rewrites the §2.3 rows (§11.1). It is independent of the engine on purpose. Change it only together with the rule it implements (§2.2-2.4), never to make the engine's output fit.

```python
import json, math, sys
d = json.load(open(sys.argv[1]))
LOOK = {'scoreboard': dict(lo=136, hi=152, target=144, grid=4, alo=128, ahi=160),
        'becker-rig': dict(lo=112, hi=128, target=120, grid=2, alo=104, ahi=136)}
SW = {'hit': 3, 'reveal': 3, 'thud': 2, 'ding': 1.5, 'cash': 1, 'step': 1, 'pop': 1, 'tick': 0.5, 'swipe': 0.5}

def payoff(v):
    body = [c for c in sorted(v['sfx'], key=lambda c: c['t']) if 1.0 <= c['t'] < v['base'] - 1.0]
    cands = []
    for r in [c for c in body if c['kind'] == 'riser']:
        end = r['t'] + r.get('dur', 2)
        h = [c for c in body if c['kind'] in ('hit', 'cash', 'reveal') and end - 0.25 <= c['t'] <= end + 0.8]
        if h: cands.append((6, h[0]['t'], 'riser'))
    for c in body:
        if c['kind'] == 'hit' and any(x['kind'] == 'cash' and 0 <= x['t'] - c['t'] <= 0.15 for x in body):
            cands.append((4, c['t'], 'hit+cash'))
    if v.get('verdict'):
        V = v['verdict']['t']
        vh = any(c['kind'] == 'hit' and abs(c['t'] - V) <= 0.05 for c in body)
        cands.append((5 if vh else 3, V, 'verdict+hit' if vh else 'verdict'))
    return sorted(cands, key=lambda x: (x[0], x[1]))[-1]

def seg1(v, P, L):
    best = None
    for N in range(math.ceil(P * L['lo'] / 60), math.floor(P * L['hi'] / 60) + 1):
        bpm = 60 * N / P; g = 60 / bpm / L['grid']
        s = sum(SW[c['kind']] * max(0, 1 - abs(c['t'] / g - round(c['t'] / g)) * g / 0.035)
                for c in v['sfx'] if 0 <= c['t'] < P - 0.01 and c['kind'] in SW)
        score = s - 0.5 * abs(bpm - L['target']) - (0 if N % 4 == 0 else 4 if N % 4 == 2 else 8)
        if best is None or score > best[0] + 1e-9: best = (score, N, bpm)
    return best

def pick(a, b, ref, L):
    best = None
    lo, hi = max(ref * 0.92, L['alo']), min(ref * 1.08, L['ahi'])
    for N in range(math.ceil((b - a) * lo / 60), math.floor((b - a) * hi / 60) + 1):
        bpm = 60 * N / (b - a)
        cost = abs(bpm - ref) / ref * 100 + (0 if N % 4 == 0 else 2.5 if N % 4 == 2 else 4)
        if best is None or cost < best[0] - 1e-9: best = (cost, N, bpm)
    return best

def land(v):  # §2.4: the card anchor L, or None without an end card
    b = v.get('brand') or {}
    if b.get('t0') is None: return None
    t0, dur = b['t0'], b['dur']
    k = min(1, max(0.6, (dur - 0.8) / 1.7))
    card = v['look'] if b.get('card') == 'kit' else 'generic'
    at = lambda kind, t1: sorted(c['t'] for c in v['sfx'] if c['kind'] == kind and t0 - 1e-9 <= c['t'] <= t1 + 1e-9)
    if card == 'scoreboard' and at('pop', t0 + 0.25): return at('pop', t0 + 0.25)[0] + 0.30 * k
    if card == 'becker-rig' and at('hit', t0 + dur): return at('hit', t0 + dur)[0]
    return t0 + 0.30

def num(x, d):  # d decimals, or every digit x needs (P and the anchors are compared exactly)
    s = f'{x:.{d}f}'
    return s if float(s) == x else repr(x)

for k, v in sorted(d.items()):
    L = LOOK[v['look']]; base = v['base']
    _, P, how = payoff(v); _, N1, bpm1 = seg1(v, P, L)
    V = v['verdict']['t'] if v.get('verdict') else None; plan = None
    if V and V - P >= 4 * 60 / bpm1:
        a, b = pick(P, V, bpm1, L), pick(V, base, bpm1, L)
        if a and b and abs(a[2] - bpm1) / bpm1 <= 0.05 and abs(b[2] - bpm1) / bpm1 <= 0.05:
            plan = [('V', V, a), ('base', base, b)]
    if plan is None: plan = [('base', base, pick(P, base, bpm1, L))]
    later = ' · '.join(f'{n} {num(t, 2)}: ' + (f'{s[1]} (r{s[1] % 4}) @ {s[2]:.2f}' if s else 'free') for n, t, s in plan)
    Lt = land(v)
    print(f"| {k.split('-')[0]} | {how} | {num(P, 3)} | {N1} (r{N1 % 4}) | {bpm1:.3f} | {later} | {'—' if Lt is None else f'{Lt:.2f}'} |")
```
