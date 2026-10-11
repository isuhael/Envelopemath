# Sound bible: Back of the Envelope (@envelopemath)

The sound brief for the 30 teasers. They are posted **with no narration**, so music and sound effects carry the whole video. The on-screen notation does the talking. The sound puts weight under each number and gives the viewer the satisfaction of a result landing. The owner wants a **full sound design pass**.

Who uses this document:
- **The engine author** builds the shared parts: timeline analysis, the tempo map, DSP, the mixer, the master and the outputs (§2, §8, §10).
- **Two sound designers** each build one look pack: Scoreboard (§3, §4, §5) and Becker Rig (§3, §6, §7).
- **The critics** judge the result against §9 only. Every rule there can be measured.

Nobody in this pipeline can hear. Quality has to be designed in by rules, then shown by measurements, spectrogram PNGs and the symbolic score. When a rule here conflicts with taste, follow the rule and file a note. When a number here proves wrong under measurement, change this file in the same pass and say why.

Status: v1, 2026-10-11. The cue data, tempo table and card times below were measured on the current kits (`specs/*.json` with the real brand, a 2.5 s card).

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
4. **The new MP4s keep the video stream bit-identical.** Audio is re-muxed with `-c:v copy` (§8.6). Do not write into `renders/channel/` until the final stage says so. Work in `/tmp/sound/...` or the scratch dirs.
5. **Keep the checks green.** `node src/cli.mjs check` stays at 30/30 clean and `npm test` stays green. Keep the legacy `mix()`/`KINDS` exports in `src/audio.mjs`, because the test imports them. The new engine lives beside it.
6. **Node ≥ 20 ESM.** ffmpeg is used only for encoding, muxing and measuring, never as an effect in the master chain. Every effect is coded in JS, so the result does not depend on the ffmpeg build.

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

**Reference result** (these are test vectors; the engine must reproduce them with BPM within 0.01 and P exact):

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
| 06b | riser | 23.000 | 56 (r0) | 146.087 | V 26.00: 7 (r3) @ 140.00 · base 30.50: 11 (r3) @ 146.67 | 30.86 |
| 06c | riser | 20.400 | 40 (r0) | 117.647 | base 28.00: 15 (r3) @ 118.42 | 28.50 |
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
4. **DROP:** P to min(P + 2 bars, the start of the BREAK before V (or V itself) if V is anchored, base − 1 bar). With 06b, for example, the DROP is 1 bar, then a 3-beat BREAK, then V.
5. **HOLD:** DROP end to the next anchor (V or CADENCE). With V anchored:
   - BREAK: the r beats before V, if r > 0
   - VERDICT: 1 bar from V
   - HOLD 2: on to CADENCE
6. **CADENCE:** the last full bar before base plus any remainder beats.
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
| DENSE bars (a roll ≥ 1.5 s or ≥ 6 cues in the bar) | keep the bar's chord, but the bass holds a **D pedal** (Bb/D, C/D, F/D) | a steady floor under rolling counters |
| TENSION, T beats | **Bb** for T − 2·⌈T/4⌉ beats → **C** ⌈T/4⌉ → **A** ⌈T/4⌉ (A = Asus4 for the first half, then A) | ♭VI–♭VII–V into i |
| DROP | \| Dm \| Bb \|, extended \| Gm \| A \| if 4 bars | lands on i at P |
| HOLD | \| Dm(add9) \| Bbmaj7 \| Gm9 \| A7sus4 · A7 \| | end-aligned before V, so it arrives on A7; start-aligned before the CADENCE (§2.5) |
| VERDICT bar | Dm(add9) | |
| CADENCE (last bar + break) | last 2 beats A7, the 2 before A7sus4, everything earlier Gm9 | into the logo's D major |
| Pickup bar 0 | Dm | |

**Voicings** (SB-Glass pad, 4 voices in A3-E5, MIDI 57-76, voice-led with each voice moving ≤ 5 semitones):
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
| **SB-808** | Sine with a pitch dive: start +7 semitones, exponential to the target, τ 35 ms (+12 st and τ 50 ms on P, t = 0 and L). Amp: A 2 ms, sustain held to the note end, R 40 ms; on P the tail decays τ 0.9 s. Drive: `tanh(2.5·x)/tanh(2.5)`, then a DC blocker (1-pole HP 20 Hz), then a 12 dB LP at 1.2 kHz. Legato glide of 60 ms when the next note is ≤ 7 st away and tied. Sub layer on P and L only: sine an octave down (D1), −10 dB, τ 0.4 s, HP 28 Hz | Chord root (or the D pedal) in **MIDI 34-45** (Bb1-A2, 58-110 Hz), so its 2nd and 3rd harmonics (116-330 Hz) carry on phones |
| **SB-Kick** | Sine, pitch 160 → 48 Hz exponential, τ 30 ms. Amp A 0.3 ms, τ 160 ms, gated at 280 ms. Click: 2 ms white noise, HP 3 kHz, −12 dB | |
| **SB-Clap** | 3 noise bursts at 0, 9 and 18 ms (each 6 ms, τ 3 ms), then a tail at 24 ms with τ 110 ms. All through BP 1.2 kHz (Q 0.9) plus HP 600 Hz | |
| **SB-Snare (rolls only)** | Noise BP 2 kHz (Q 0.8), τ 70 ms, plus a sine body at 185 Hz, τ 45 ms, −6 dB. During a TENSION roll the body pitch rises 0 → +7 st | |
| **SB-Hat** | Six square oscillators at 205.3, 304.4, 369.6, 522.7, 540.0 and 800.0 Hz (metal ratios), summed, BP 10 kHz (Q 1), then HP 7 kHz. Closed τ 22 ms; open τ 180 ms, choked by the next closed hat | |
| **SB-Crash** | Two independently seeded noises (L and R) through HP 3.5 kHz; plus the same six-square metal at ×2.3 frequency, −10 dB. τ 0.9 s (1.3 s on P). Reverse crash = the same envelope reversed, 0.6 s, ending at its target | |
| **SB-Arp** ("ticker") | 2 PolyBLEP saws (±6 cents) plus a square an octave down at −10 dB. 24 dB LP whose envelope runs from base cutoff × 3 down to the base cutoff with τ 120 ms, Q 1.2. Amp A 1 ms, D 180 ms, S 0, R 60 ms. Base cutoff by energy: E2 1.4 kHz · E3 2.2 kHz · E4 3.5 kHz · E5 6 kHz. Pan alternates −25% / +25% per 16th. The arp root is the chord root in MIDI 57-68, so the pattern spans **MIDI 57-86**. In E5 and TENSION it adds an octave-up copy (≤ MIDI 98) at −4 dB | **MIDI 57-86** (98 with the octave copy) |
| **SB-Glass** (pad) | 5-voice supersaw: detunes −14, −7, 0, +7, +14 cents, panned −60, −30, 0, +30, +60%, each voice with a seeded start phase. 12 dB LP at 2.2 kHz (+1.5 kHz on E5), HP 200 Hz. Amp A 30 ms in the HOOK and DROP, 200 ms elsewhere; S 1; R 300 ms | MIDI 57-76 |
| **SB-Laser** (lead) | PolyBLEP square (pulse width 30%) plus a saw at −4 dB, 2 voices ±5 cents, 12 dB LP at 3.2 kHz. Portamento 40 ms on tied notes. Vibrato 5.5 Hz ±15 cents, fading in from 250 ms after note-on | **MIDI 69-86** (A4-D6) |
| **SB-Stab** ("stadium") | 7 saws (±0, ±6, ±12, ±18 cents) voiced D3 A3 D4 F4 A4 D5 (the current chord's equivalent elsewhere); plus noise HP 2 kHz, τ 40 ms, −12 dB. Amp A 1 ms, τ 350 ms. Hall send −6 dB | |
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
| **TENSION** | Kick and clap out. Hats out (the riser owns the noise band). The 808 holds the bar's root as a pedal. The pad's LP sweeps 900 Hz → 8 kHz exponentially. The arp doubles up an octave with its cutoff rising alongside. The snare roll runs 8ths → 16ths → 16th triplets → 32nds, a quarter of the section each, velocity 0.35 → 1.0, body pitch +7 st. **The gap:** from P − 1 eighth to P every music voice is released (10 ms), and only the SFX riser and the music's reverse crash sound |
| **P (the drop)** | On the downbeat, sample-exact: SB-Stab (Dm, full), 808 dive D3 → D2 plus the D1 sub, kick, clap, crash (τ 1.3 s), the pad swelling +6 dB over 1 bar. DROP runs at E5 |
| **HOLD** | Half-time E3: kick on step 1 only, clap on 9, 8th hats at −3 dB. Arp **pedal** in 8ths with its LP at 2.0 kHz. 808 whole notes. No lead during the first 2 bars after V (the verdict is being read) |
| **BREAK** (r beats before V) | Drums out. The dominant chord is held. A reverse crash ends exactly at V |
| **VERDICT** (V) | SB-Stab on Dm(add9) at −3 dB re P, crash −6 dB, kick. One bar at E4, then HOLD 2 at E3 |
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
7. **`buzz`:** the arp mutes for 1 beat from the buzz, and the music ducks 4 dB (§8.3).

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
| **cash** (the money total lands) | 5 mechanical clicks 22 ms apart, HP 4 kHz, gains 1 → 0.5 / two FM bells (root and 5th in octave 6) at +100 and +130 ms, τ 350 ms / coin shimmer: 12 sine pings, τ 30 ms, chord tones in MIDI 98-105, seeded onsets over 0.10-0.50 s | Chord | 1.0 s | −9 | clicks centred; pings ±60% | hall −10 dB | ping onsets and pitches seeded | 4 dB / 100 ms / 300 ms |
| **hit** (stadium impact, the biggest number) | Noise burst 4 ms, full band, −6 dB / body sine diving from root +12 st to D2 (or the chord root) over 60 ms, τ 350 ms, drive 2.5, DC block; sub D1 −8 dB, τ 250 ms, HP 30 Hz / crash: decorrelated noise HP 3.5 kHz, τ 900 ms, −6 dB | Root | 1.6 s | −3 | body mono; crash ±70% | hall −8 dB | crash seed, ±5% τ | **9 dB / 150 ms / 450 ms** |
| **reveal** (the verdict) | **Pre-roll:** reversed noise 180 ms, ending at t, −14 dB / thud body at −3 dB plus the root, 3rd and 5th of the chord as FM bells in octaves 5-6, arpeggiated at 0, 40 and 80 ms, τ 600 ms / "light-up" shimmer: noise BP 9 kHz, rising in 30 ms, τ 300 ms | Chord | 1.4 s | −6 | bells −20 / 0 / +20%; shimmer ±60% | hall −9 dB | bell index ±10% | 6 dB / 120 ms / 400 ms |
| **riser** | Noise BP sweeping 300 Hz → 9 kHz (exponential in t), Q 1.2, amp +20 dB linear-in-dB / three saws at A2, A3 and A4 gliding +12 st Shepard-style (each layer's amplitude is a raised-cosine bell over its log-frequency position, so the ear hears an endless rise), LP 4 kHz / no tail: 5 ms fade at t + dur | Ends on the dominant A, which resolves to D at P | dur | −8 at the end | width 10% → 80% (decorrelated noise) | none | seed | none. The music is in TENSION |
| **swipe** (lead change, pointer) | Noise BP sweeping 2 → 7 kHz over dur (default 0.22 s), sin window | none | dur | −16 | pan sweeps −40% → +40%, alternating by `n` | plate −20 dB | seed, cutoff ±8% | 1.5 dB / 30 ms / 100 ms |
| **whoosh** | Noise BP up and down: 500 Hz → 4 kHz (peak at 60% of dur) → 800 Hz; plus air (LP 300 Hz noise, −10 dB) | none | dur | −14 | pan sweeps −50% → +50% | plate −18 dB | seed | 2 dB / 50 ms / 150 ms |
| **buzz** (struck out, lost) | Two PolyBLEP squares at D3 (146.83 Hz) and Eb3 (155.56 Hz); the minor second beats at 8.7 Hz. LP 1.8 kHz. A 5 ms, τ 120 ms | Fixed (an intentional clash) | 380 ms | −12 | centre | plate −20 dB | none | 4 dB / 100 ms / 250 ms; arp muted 1 beat |
| *step / boing / type* (not emitted by this look) | step: thud body at −12 dB; boing: pop with 11 Hz vibrato; type: tick train at 14/s | | | | | | | as tick |

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
| **BR-Bounce** (synth bass) | PolyBLEP square and saw, 50/50. 24 dB LP whose envelope runs 2.4 kHz → 350 Hz, τ 90 ms, Q 2.0 (the rubbery "bwop"). Amp A 2 ms, D 160 ms, S 0.55, R 50 ms. Slides of 50 ms between tied notes | **MIDI 38-50** (D2-D3) |
| **BR-Mallet** (marimba) | Additive partials: 1.0·f (amp 1.0, τ 0.35 s·√(440/f)), 3.9·f (0.35, τ/3), 9.2·f (0.10, τ/8); drop any partial above 16 kHz. Plus a 2 ms noise click, LP 3 kHz, −14 dB | **MIDI 62-86** |
| **BR-Glock** | Free-bar partials 1, 2.76, 5.40, 8.93 at amps 1, 0.35, 0.15, 0.06 and τ 1.2, 0.5, 0.25, 0.12 s (×1.15 for the logo); drop partials above 16 kHz. A 0.5 ms | **MIDI 74-93** |
| **BR-Pizz** | Karplus-Strong string: delay line of length 48000/f, a 2-tap averaging loop filter, loss 0.996, excited by 1 period of seeded noise LP'd at 3 kHz. Amp release 80 ms at the gate | MIDI 50-74 |
| **BR-Honk** (brass stab) | 3 saws (±8 cents). 12 dB LP envelope: 600 Hz → 3.2 kHz over the 30 ms attack (the brass "blat"), then → 1.2 kHz over 200 ms. Amp A 12 ms, D 150 ms, S 0.6, R 80 ms | MIDI 53-74 (×2 in the fanfare) |
| **BR-Strain** (tremolo strings) | 4 saws per note (±10 cents), LP 2.8 kHz, HP 180 Hz. Tremolo: amplitude modulated at 16th-triplet rate (6 × BPM/60 Hz), depth 70% | MIDI 55-79 |
| **BR-Warm** (pad) | Triangle and saw (−6 dB), 12 dB LP at 1.2 kHz, HP 150 Hz. A 150 ms (10 ms on L and P), S 1, R 400 ms | MIDI 55-74 |
| **BR-Kick** | Sine 130 → 55 Hz, τ 25 ms. Amp τ 110 ms, gated at 220 ms. Click: 2 ms noise, −10 dB | |
| **BR-Snare** | Tone: sines at 185 Hz and 330 Hz, τ 50 ms, −4 dB. Noise BP 2.5 kHz (Q 0.7), τ 110 ms. Crack: noise HP 5 kHz, 3 ms | |
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
| Hook | | marimba on beats 1 and 3 | **marimba ostinato**: 1 R (1.0), 4 5 (0.6), 7 R (0.8), 9 3 (0.9), 11 5 (0.6), 13 R (0.8), 15 3 (0.6). R = chord root in MIDI 74-85; 5 = the chord 5th directly below R; 3 = the chord 3rd directly above R (D: D5 A4 F#5; Bm: B5 F#5 D6) | ostinato plus glock answers in sparse bars | ostinato up an octave, capped at MIDI 86 (fold any note above back an octave), plus a glock melody |
| Phrase turnaround (4th bar, steps 13-16) | | | marimba plays **the em motif** A4 D5 E5 A5 as swung 16ths over A | same | same |
| Fill (last beat of every 4th bar, unless a cue of weight ≥ 1 sits in it) | | | snare 16ths (0.4 → 0.8) | snare and synth tom (sine 140 → 100 Hz, τ 120 ms) | same |

### 6.5 Arrangement on the timeline

| Section | What plays |
|---|---|
| **HOOK** (t = 0) | **"Ta-da!"**, all at t = 0: BR-Honk D major (D4 F#4 A4 D5) as an 8th note, timpani D2, crash −3 dB, kick, bass D2. The marimba ostinato starts on step 1. Energy E4 for the first bar, then E3 |
| **BUILD** | E3 (bounce, ostinato, shaker 16ths), rising to E4 at the midpoint. Glock answers (the em motif and its transpositions) play in sparse bars only |
| **TENSION** | "Strain": kick on every beat at 0.7 (a heartbeat), no snare backbeat. The snare roll runs 16ths → 32nds, 0.3 → 1.0. BR-Strain tremolo plays the **climb** (§6.2) with the bass on F#-G-G#-A. The marimba drops out. **The gap:** the last 8th before P is silent music (§4.5) |
| **P** | **Fanfare:** BR-Honk D major doubled at the octave (D4 F#4 A4 D5 + D5 F#5 A5 D6), timpani D2, crash (τ 1.4 s), glock A5, kick, snare and clap together. DROP at E5 |
| **HOLD** | "Victory lap" at E3: bounce, pizz chops, ostinato. Glock melody only in sparse bars, never in the 2 bars after V |
| **BREAK** | All drums out. Dominant pad, a pizz tremolo on A3, and a reverse crash into V |
| **VERDICT** | A brass "button" (D major, 8th, −3 dB re P), crash −6 dB, kick. 1 bar at E4, then HOLD 2 |
| **CADENCE** | Em7 → A7sus4 → A7. A snare and tom fill on the last beat. Stop at base |
| **CARD** | The logo (§3) |

### 6.6 How the music reacts (physical comedy)

1. **Drums yield**, as §4.6.1 (kick or snare within ±70 ms of a strong cue is removed).
2. **Catch the hit.**
   - Applies to a `hit` with gain ≥ 0.85 that is not at an anchor: the brass plays a short stab of the current chord **at the cue time**, even off the grid. That is the cartoon "catch".
   - The stab is an 8th note at −4 dB re the fanfare.
   - At most one per 2 bars; extra hits get no stab.
3. **Clock trains:** 10b's ticks every 0.832 s, and 02a's thuds every 0.5 s.
   - Ticks render as woodblock tick-tock (A5 / D5).
   - The music's own woodblock and shaker mute while the train runs, so two clocks never argue.
4. **Throws** (`swipe`, then `thud` 0.2-0.5 s later, as in 09b and 01b): nothing extra. The SFX carry the throw, and the energy step follows the rungs.
5. **`buzz`:** the deflate (§6.2).
6. **Dense, sparse, long holds:** as §4.6.3-5, with the glock in the lead role.

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
| *reveal* (not emitted by this look) | ding plus thud | | | | | | | 6 dB / 120 ms / 400 ms |

---

## 8. Mix and master (engine)

### 8.1 Buses and static levels

The signal flow:

```
voices ─▶ MUSIC bus (drums, bass, harmony, top, music FX) ─┐
cues   ─▶ SFX bus ─────────────────────────────────────────┼─▶ MASTER ─▶ WAV (float32) ─▶ AAC 192k
sends  ─▶ PLATE / HALL / ROOM returns ──────────────────────┘
```

- **MUSIC bus:**
  - HP 30 Hz (2nd order)
  - glue compressor: ratio 2:1, attack 10 ms, release 120 ms, threshold set so the DROP shows 1.5-2.5 dB gain reduction
  - **event-driven duck** (§8.3)
- **SFX bus:**
  - HP 35 Hz
  - compressor: ratio 3:1, attack 2 ms, release 80 ms, ≤ 3 dB gain reduction on `hit`
- **Starting element levels** (peak dBFS at velocity 1, pre-bus). Designers tune them to meet §9 B1.

| Look | Starting levels |
|---|---|
| Scoreboard | kick −6 · 808 −6 (RMS while held −14) · clap −9 · hats −20 · open hat −18 · snare roll −14 → −8 · crash −14 · stab −8 · pad −18 RMS · arp −16 · lead −14 · logo n4 −8 |
| Becker Rig | kick −7 · snare −9 · shaker −24 · woodblock −20 · bass −8 · marimba −14 · glock −14 · pizz −16 · brass −10 (fanfare −7) · strings −16 RMS · pad −20 RMS · timpani −8 · crash −14 · logo n4 −10 |

**Balance targets** (both stems measured after the master's loudness gain, before the limiter):

| Look | Music stem | SFX stem | Comment |
|---|---|---|---|
| Scoreboard | full mix −1.5 to −3.5 LU (about −16.5 LUFS) | full mix −2.5 to −5 LU (about −18) | music-led bed, SFX on top |
| Becker Rig | full mix −2.5 to −4.5 LU (about −17.5) | full mix −2 to −4 LU (about −17) | SFX-led: every hit sounded |

### 8.2 Kick sidechain (the groove pump)

- **Scoreboard:** pad, arp and lead duck 3 dB on every music kick (attack 2 ms, hold 20 ms, release τ 120 ms). The 808 does not duck. The kick's tail is short, so the 808 owns the sustain.
- **Becker Rig:** pad and strings duck 1.5 dB on each kick, with the same times.

### 8.3 Event-driven ducking (music under SFX)

The engine computes the music gain from the cue list, not from a detector. This is deterministic, exact and readable in the score. For each cue c:
- depth `D = Dkind · clamp(c.gain / 0.7, 0.3, 1.2)`, in dB
- the gain is 0 dB until t − 5 ms (lookahead), then ramps linearly in dB to −D at t
- it holds −D until t + hold, then recovers as `−D · e^(−(τ − t − hold)/release)`, where τ is the running time

**Combined duck = the minimum gain over all active cue curves** (the deepest wins; they do not stack).

- **Duck depths:** the per-kind tables in §5 and §7.
- **Payoff:** at P, cues use their big depths (Scoreboard `hit` 9 dB, Becker big `hit` 10 dB). The music's own drop then blooms back over 450-500 ms. Intended: impact first, then the music.
- **Tails:** reverb returns duck by half the music duck.
- **Score export:** the duck curve is written to the score at 100 Hz.

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
6. **Re-measure:** if the loudness is off target by more than 0.3 LU, correct the gain and run the limiter once more. Iterate at most twice.
7. **Edges:** a 1 ms ramp at t = 0 (anti-click only; the hook stays full level), the final 0.40 s cosine fade, and the last sample exactly 0.
8. **Write** a 32-bit float WAV, 48 kHz, stereo. Write stems with the same master gain, before the limiter: `music.dry` (before the duck), `music`, `sfx`, `returns`.
9. **Encode:** `-c:a aac -b:a 192k -ar 48000 -ac 2` (AAC-LC).
   - Decode and measure the true peak. If it is above −1.0 dBTP, lower the limiter ceiling by 0.5 dB and redo steps 5-9 (at most 2 times).
10. **Mux** onto the finished picture without re-encoding it:
    - `ffmpeg -i <renders/channel/id>.mp4 -i <id>.wav -map 0:v:0 -map 1:a:0 -c:v copy -c:a aac -b:a 192k -ar 48000 -ac 2 -t <info.duration> -movflags +faststart <out>.mp4`
    - The audio stream lasts info.duration ±1 frame.

---

## 9. Acceptance checks (what the critics run)

Every check is measurable. Thresholds apply to every one of the 30 teasers unless the check names a look. The engine writes `<id>.score.json`, `<id>.report.json` and the stems, so most checks are plain reads. The rest use the ffmpeg commands below on the final MP4 (decoded AAC).

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
| A1 | Integrated loudness | −14.0 ± 1.0 LUFS (the engine's own report shows ±0.3 before encoding) |
| A2 | True peak (decoded AAC) | ≤ −1.0 dBTP |
| A3 | LRA | Scoreboard 4-9 LU · Becker Rig 3-8 LU |
| A4 | Short-term max / momentary max | ≤ −8 LUFS / ≤ −6 LUFS |
| A5 | PLR (true peak − integrated) | 8-13 dB |
| A6 | Silence: any 50 ms RMS run below −45 dBFS lasting ≥ 1.0 s in [0, duration − 0.40] | **none**. The only intentional music dropout is the pre-payoff gap (1 eighth, ≤ 0.27 s), and the SFX riser plays under it |
| A7 | Hook: momentary loudness at 0.4 s (window 0-0.4 s) | ≥ −18 LUFS; a music event at t = 0 (S10) |
| A8 | Mono compatibility | mean L/R Pearson correlation over 400 ms windows ≥ 0.30 (target 0.45-0.85); no window < −0.10; mono-fold integrated loudness within 1.5 LU of stereo |
| A9 | DC offset | ≤ 1e-4 per channel |
| A10 | Phone proxy (HP 250 Hz, 4th order) | integrated loudness falls ≤ 7.0 LU (Scoreboard) / ≤ 4.5 LU (Becker Rig). This guards against a mix that is all sub: with the §9.2 bands near their middles, expect about 6 LU and about 3 LU |
| A11 | Limiter (report) | gain reduction > 1 dB for ≤ 3% of samples; max ≤ 6 dB |
| A12 | Delivery (ffprobe) | AAC-LC, 2 ch, 48 000 Hz, 192 kb/s (±10%); audio duration = video duration ± 1/fps |
| A13 | Picture untouched | `ffmpeg -i src.mp4 -map 0:v -c copy -f md5 -` equals the same on the new MP4 |
| A14 | Determinism | two renders of the same spec give byte-identical master WAVs (sha256); two different specs differ |

### 9.2 Spectral balance (long-term average, numpy, on the decoded mix)

Octave-band power in dB relative to the 1 kHz octave band, measured with a Hann-window FFT of 8192 points and 50% overlap, averaged over [0, base]:

| Band (Hz) | 31.5 | 63 | 125 | 250 | 500 | 1k | 2k | 4k | 8k | 16k |
|---|---|---|---|---|---|---|---|---|---|---|
| Scoreboard | −8..+3 | +4..+10 | +2..+8 | 0..+6 | −1..+4 | 0 | −5..0 | −9..−2 | −14..−5 | −26..−12 |
| Becker Rig | −16..−4 | −2..+7 | +1..+7 | 0..+6 | −1..+4 | 0 | −5..0 | −8..−2 | −13..−5 | −25..−12 |

- **Harshness:** the 2-5 kHz band sits ≤ +2 dB above the regression line fitted through the 500 Hz-8 kHz bands.
- **Spectrogram:** a vertical broadband stripe exactly at P and at L; horizontal partials at note frequencies; no mirror lines falling while a riser rises (that is aliasing); no energy wall above 16 kHz.

### 9.3 Mix relations and timing (stems, score, report)

| ID | Check | Pass |
|---|---|---|
| B1 | Stem balance | the §8.1 balance-target bands |
| B2 | Payoff duck | music gain ≤ −8 dB over [P, P + 0.15 s] in the score's duck curve |
| B3 | Cue audibility | for every cue with gain ≥ 0.4 of kind thud, hit, ding, cash, reveal or pop: SFX-stem RMS over [t, t + 50 ms] ≥ music-stem RMS over the same window + 3 dB |
| B4 | Onsets | each SFX's first sample above −60 dBFS (solo render, or `report.json` `cueStart`) is at the cue time ±2 ms. Allowed pre-roll: `reveal` 180 ms |
| B5 | Payoff in audio | the music stem has an onset at P within ±10 ms (spectral flux peak) |
| B6 | Continuity | music.dry short-term loudness (3 s) never more than 18 LU below its own integrated loudness in [0, base], except the TENSION gap |
| B7 | Energy curve | music.dry short-term loudness: mean over [P, P + 2 bars] ≥ BUILD mean + 2 LU; HOLD mean ≤ DROP mean − 1.5 LU; the BUILD's second half ≥ its first half |
| B8 | Logo | momentary loudness at L + 0.2 s ≥ −13 LUFS and ≤ momentary loudness at P + 0.2 s |
| B9 | Card tail | nothing below −45 dBFS in [base, duration − 0.40]; a cosine fade over the last 0.40 s; the last sample is 0 |
| B10 | Flams | no music kick, snare or clap onset 15-70 ms from a cue onset (hit, thud, cash, reveal) with gain ≥ 0.5 |

### 9.4 Symbolic score (`<id>.score.json`)

The score holds `key`, `anchors`, `tempo` segments, `bars [{ i, t, beats, bpm, section, energy, chord: { sym, root, tones, bass } }]`, `notes [{ t, dur, midi, vel, inst, role, chromatic? }]`, `drums [{ t, inst, vel }]`, `sfx [{ t, kind, gain, pitches, pan, duck }]` and `duck` (100 Hz). Roles: bass, pad, arp, lead, stab, brass, mallet, glock, pizz, strings, logo.

| ID | Check | Pass |
|---|---|---|
| S1 | In key | ≥ 97% of pitched notes have pitch classes in the look's set: Scoreboard {D E F G A Bb C}, plus C# only under A or A7; Becker Rig {D E F# G A B C#}, plus C, plus the tones of any written borrowed or applied chord (Gm, G#°7, E7). Every other note is flagged `chromatic` (passing, neighbor or strain) and moves by ≤ 2 st within 1 beat to a chord tone. The logo set {A, D, E, F#} is always allowed in the card |
| S2 | Chord tones on strong beats | notes starting within ±15 ms of beat 1 or beat 3 are tones of the sounding chord. Bass and pad: 100%; every other role: ≥ 95% |
| S3 | Registers (MIDI) | 808 34-45 (octave pops ≤ 57; the P/L sub layer at 26) · Scoreboard arp 57-86 (octave copy ≤ 98) · lead 69-86 · pad 57-76 · BR bass roots 38-49 (octave pops ≤ 61) · marimba 62-86 · glock 74-93 · pizz 50-74 · brass 53-74 (fanfare doubling ≤ 86) · strings 55-79 · timpani 33-38 · SFX pitched layers ≤ 105 |
| S4 | Bass on the downbeat | every bar's beat-1 bass note = the chord's written bass (root, slash bass or D pedal), except bars marked BREAK |
| S5 | Repetition | ≤ 2 consecutive identical bar fingerprints (all events: instrument, 1/32-bar position, MIDI, velocity rounded to 0.1); ≥ 3 distinct fingerprints in any 8-bar window; no 2-bar lead or glock phrase more than twice |
| S6 | Anchors | a bar line at P (\|Δ\| ≤ 1 ms); kick, bass and crash/stab notes at P (\|Δ\| ≤ 1 ms); no music note-on in [P − 1 eighth, P) (reverse crash excepted). V and base fall on bar or break boundaries as in the §2.3 table |
| S7 | Logo | role `logo` notes MIDI 69, 74, 76, 81 at L − 0.300, L − 0.200, L − 0.100 and L (±1 ms) in **both** looks; D, F#, A and E sounding at L |
| S8 | Humanising | per-instrument velocity standard deviation 0.03-0.15. Timing offsets of hats and shaker from the grid: standard deviation 1.5-5 ms. Becker off-beat 16ths sit at 58% ± 1% swing. Kick, snare and clap on the grid are exact |
| S9 | Tempo | segment 1 inside the look's range; later segments inside the absolute limits and within ±8% of BPM₁ (±5% when V is anchored) |
| S10 | Frame 1 | a kick, 808/bass and stab/brass event at t = 0 with velocity ≥ 0.9 |
| S11 | Energy plan | HOOK E4 → E3; BUILD non-decreasing; TENSION has no kick or clap backbeat (Scoreboard) / a heartbeat kick (Becker); DROP E5; HOLD ≤ E4 |
| S12 | Voice leading | pad voices move ≤ 5 st between consecutive chords (except the first chord after the TENSION gap and at L) |
| S13 | Melody | leaps ≤ 12 st; after a leap ≥ 6 st, the next interval is opposite and ≤ 4 st in ≥ 75% of cases; phrase range ≤ 19 st |
| S14 | Polyphony | ≤ 12 pitched notes sounding at once (tails below −30 dB excluded) |

### 9.5 DSP unit checks (pack test harness)

| ID | Check | Pass |
|---|---|---|
| U1 | Aliasing | each pitched instrument plays D6 (MIDI 86) and A6 (MIDI 93) for 1 s. Spectral peaks not at multiples of f₀ (±1%) stay ≤ −50 dB re the fundamental (the inharmonic BR-Mallet, BR-Glock, BR-Timp and cash partials are judged against their own partial list) |
| U2 | Clicks | every voice's first and last 1 ms have \|Δsample\| ≤ 0.02 (transients exempt: < 0.5 ms attack by design) |
| U3 | Bounds | no NaN or Inf; every SFX renders within its peak level + 1 dB at gain 1 |
| U4 | Variation | two consecutive same-kind cues rendered solo have a normalised cross-correlation < 0.98 |

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
   - sample-exact placement and deterministic summing
   - buses, sends and returns
   - the coincident-cue merge (§8.4)
   - the master chain (§8.6)
4. **Outputs:**
   - master WAV (float32, 48 kHz, stereo)
   - stems: `music.dry`, `music`, `sfx`, `returns`
   - `<id>.score.json` (§9.4)
   - `<id>.report.json`: P, BPMs, anchors, loudness, true peak before and after AAC, LRA, limiter gain-reduction statistics, `cueStart` per cue, the Node version and the WAV sha256
5. **CLI:**
   - `node src/cli.mjs audio <specs…> --out /tmp/sound [--stems]`: mounts each spec for its cues only, with no frames
   - `node src/cli.mjs remux <spec> --video <mp4> --out <mp4>`: the §8.6 mux with a video stream copy
   - `node src/cli.mjs render` uses the new audio by default; `--legacy-audio` keeps the old mono SFX
6. **Pack API:**
   - each pack is `studio/sound/packs/<look>.mjs` and exports `{ look, key, tempo: { lo, hi, target, syncGrid, absLo, absHi }, harmony(tl, rng), compose(tl, rng) → { notes, drums, automation }, instruments, sfx: { [kind]: (cue, ctx) → stereo buffer }, logo(tl, ctx), mix }`
   - the SFX `ctx` gives `chordAt`, `keyAt`, `beatAt`, `rng`, `n` (the occurrence index), `train`, `cluster`, `isAnchor` and `inCard`
   - **every pack implements all 15 kinds**
7. **Tests** (`npm test` stays green):
   - determinism: the same spec gives the same sha256
   - the tempo-map vectors in §2.3
   - the logo note times
   - no NaN, and bounds
   - the -14 LUFS target on a test spec
   - the audio duration equals the video's
   - the legacy `mix()` test is kept


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

## Appendix B. Reference implementation of §2.2-2.3 (Python, for the test vectors)

`cues.json` maps each spec id to `{ look, base, sfx, verdict }`, as dumped from `openSpec`. Run it with `python3 ref.py cues.json`; it prints the §2.3 table.

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

for k, v in sorted(d.items()):
    L = LOOK[v['look']]; base = v['base']
    _, P, how = payoff(v); _, N1, bpm1 = seg1(v, P, L)
    V = v['verdict']['t'] if v.get('verdict') else None; plan = None
    if V and V - P >= 4 * 60 / bpm1:
        a, b = pick(P, V, bpm1, L), pick(V, base, bpm1, L)
        if a and b and abs(a[2] - bpm1) / bpm1 <= 0.05 and abs(b[2] - bpm1) / bpm1 <= 0.05:
            plan = [('V', V, a), ('base', base, b)]
    if plan is None: plan = [('base', base, pick(P, base, bpm1, L))]
    print(k, how, P, N1, round(bpm1, 3), [(n, t, s and (s[1], round(s[2], 2))) for n, t, s in plan])
```
