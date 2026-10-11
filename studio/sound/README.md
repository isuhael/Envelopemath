# Sound engine and pack contract

The soundtrack for the 30 teasers: music and sound effects only, no narration. The design rules are in [`BIBLE.md`](BIBLE.md). This file covers the shared engine in `src/sound/`, how a look's sound pack plugs into it, and the commands that render, mux and audit the audio.

Everything is synthesised in JS from seeded noise and oscillators. ffmpeg only encodes, muxes and measures; it never processes the master. The same spec always gives a byte-identical master WAV.

## Quick start

```bash
cd studio
# a cue record dump (what the engine reads from each kit), handy for fast iterations without Chromium
node src/cli.mjs cues specs/*.json --out /tmp/sound/cues.json

# audio only: master WAV (float32), verified AAC .m4a, <id>.score.json, <id>.report.json, stems
node src/cli.mjs audio specs/09c-*.json --out /tmp/sound/audio --stems --cues /tmp/sound/cues.json

# new audio on the finished MP4s; the picture is copied bit for bit (video-stream md5 checked)
node src/cli.mjs sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4 --score --jobs 4

# measurements, spectrogram PNGs and the symbolic-score checks
node src/cli.mjs audit /tmp/sound/mp4 --reports /tmp/sound/mp4/sound --out /tmp/sound/audit
```

## Commands

| Command | What it does |
|---|---|
| `audio <specs> --out <dir>` | Renders the audio for each spec: `<id>.wav` (float32 master), `<id>.m4a` (AAC-LC 192k, true peak verified after decoding), `<id>.score.json`, `<id>.report.json`. `--stems [dir]` writes `music.dry`, `music`, `sfx`, `returns` and `mix` WAVs. `--no-encode` skips the AAC stage, and `--no-check` skips the ffmpeg cross-measurements |
| `sound <specs> --video <dir\|mp4> --out <dir>` | The same audio, muxed onto the finished MP4 with `-map 0:v:0 -map 1:a:0 -c:v copy`. Writes `<out>/<id>.mp4`, plus `<out>/sound/<id>.report.json`. `--score` keeps the score, `--wav` the master WAV, and `--stems [dir]` the stems. Each mux is verified: the video-stream md5 must equal the source's, the audio must be AAC stereo 48 kHz, and the audio duration must match the video within 1/fps |
| `remux <spec> --video <mp4> --out <mp4>` | The bible's single-spec form of `sound` (§10.5) |
| `audit <files or dirs>` | For each MP4/M4A/WAV: integrated loudness, true peak, LRA, PLR, crest factor, silence (50 ms RMS below −45 dBFS for at least 1 s) and the longest quiet run, L/R correlation (mean and minimum over 400 ms windows), the mono-fold delta, the phone proxy (HP 250 Hz, 4th order), octave bands relative to 1 kHz, the 2-5 kHz harshness margin, cue-onset alignment and a spectrogram PNG. With the engine's score next to the file (or `--reports <dir>`), it also runs the symbolic checks S1-S14, B2 and B10. `--json` prints everything |
| `cues <specs> --out cues.json` | The cue records (see below) as JSON |
| `score <specs> --out <dir>` | The timeline, harmony and notes only, with no audio (`<id>.plan.json`). Fast, for composing |
| `render <specs>` | As before, but the soundtrack now comes from this engine. `--legacy-audio` keeps the old mono SFX track (`src/audio.mjs`) |

Shared options:
- `--cues <file>` reads cue records from a dump instead of mounting the kits in Chromium.
- `--pack <file.mjs>` forces a pack.
- `--jobs N` sets the worker threads (default 4).
- `--no-brand` and `--brand` work as in the rest of the CLI.
- **Nothing is written into `renders/channel/` unless `--final` is passed.**

## Pipeline

```
openSpec ─▶ cue record ─▶ timeline (§2) ─▶ pack.harmony ─▶ pack.compose ─▶ pack.logo
                                              │                │             │
cues ─▶ pack.sfx[kind] (merge rule §8.4) ─────┼────────────────┴─────────────┘
                                              ▼
 instrument voices ─▶ instrument buses (levels, automation, kick sidechain, body gate at base)
   ├─ MUSIC body: HP 30 Hz, glue 2:1, event duck            ├─ LOGO: not gated, not ducked
 SFX bus: HP 35 Hz, compressor 3:1
 returns: music sends (PLATE/HALL/ROOM/ping-pong delay; ducked by half the music duck, −6 dB under the logo)
          + SFX/logo sends (not ducked)
 MASTER = music + SFX + returns ─▶ HP 25 Hz ─▶ low mono < 120 Hz ─▶ gain to −14 LUFS ─▶ 4x true-peak limiter (−1.5 dBTP)
        ─▶ re-measure (≤ 2 corrections) ─▶ 1 ms ramp in, 0.40 s cosine fade out, last sample 0 ─▶ WAV
        ─▶ AAC 192k ─▶ decode ─▶ true peak ≤ −1.0 dBTP? else lower the ceiling locally around each spot that went
           over (≤ 3 times), then globally by 0.5 dB (≤ 2 times), and redo
```

## Files

| File | What it holds |
|---|---|
| `src/sound/cues.mjs` | `mountCues(browser, spec)` and `cueRecord(spec, info)`: the engine's only input |
| `src/sound/timeline.mjs` | §2: cue prep, trains, clusters, the payoff P, the tempo map, the card anchor L, sections, energy, the density map, queries, and `logoMotif` |
| `src/sound/dsp.mjs` | Primitives: seeded rng, PolyBLEP/BLAMP oscillators (optional 2x oversampling), unison, noise colours, the TPT state-variable filter (per-sample cutoff, 12/24 dB), 1-pole filters, the DC blocker, RBJ biquads, ADSR and exponential envelopes, glides, FM with the Carson clamp, modal partials, Karplus-Strong, tanh, pan, buffer helpers |
| `src/sound/theory.mjs` | MIDI and Hz, note names, keys, chord symbols, tones in a register, nearest/above/below tone, voice-led voicings |
| `src/sound/kit.mjs` | The instrument toolkit: kick, snare, clap, hats, crash and its reverse swell, tom, shaker, tambourine, woodblock, impact, timpani, the 808, pluck, mallet, glock, FM bell, pad voice, brass, tremolo strings, lead, clicks, pings, noise sweeps, `layer`, `norm` |
| `src/sound/fx.mjs` | The three FDN reverbs (§8.5 tables), ping-pong delay, compressor, `duckCurve`, `sidechainCurve`, `lowMono`, `limitTruePeak` |
| `src/sound/loudness.mjs` | BS.1770-4 integrated, momentary and short-term loudness, EBU 3342 LRA, and the 4x true-peak meter |
| `src/sound/engine.mjs` | `loadPack`, `renderMix`, `masterMix`, `renderSound`, `scoreOnly` |
| `src/sound/scorecheck.mjs` | The symbolic checks (§9.4 S1-S14, B2, B10) on a score JSON |
| `src/sound/audit.mjs` | The audit command's measurements and table |
| `src/sound/batch.mjs`, `worker.mjs` | Record gathering, worker-thread pool, verified mux |
| `src/sound/ffmpeg.mjs` | Encode, decode, mux, ebur128, the loudnorm measurement, video md5, spectrogram |
| `src/sound/wav.mjs` | Float32 WAV writer and a WAV reader |
| `src/sound/packs/default.mjs` | The default pack: a stereo, chord-aware port of the legacy SFX plus a minimal neutral bed. Copy it to start a pack |
| `src/audio.mjs` | Legacy mono `mix()`, `KINDS`, `RATE` (kept for `--legacy-audio` and its test) |

## The cue record (engine input)

```js
{ id, look, format, fps, duration, base,            // duration includes the card; base = where the card starts
  brand: { logo, card: 'kit' | 'generic', t0, dur } | null,
  sfx: [{ t, kind, gain?, dur?, ... }],              // info.sfx from openSpec, unchanged
  vo: [{ t, d, text }], verdict: { t, text } | null, beats: [...] }   // from the spec (beats = lookOpts.beats)
```

`test/fixtures/cues.json` holds the records of all 30 specs as mounted on 2026-10-11.

## Pack contract

A pack is an ES module. The engine looks for it in this order:
1. `studio/sound/packs/<look>.mjs`
2. `studio/looks/<look>/sound.mjs`
3. the default pack

`--pack file.mjs` overrides the search.

```js
export const name = 'scoreboard'
export const look = 'scoreboard'
export const key = ['D', 'minor']                     // optional; else the look default (§1)
export const tempo = { lo, hi, target, syncGrid, absLo, absHi }   // optional; else §2.3 (syncGrid 4 = 16ths, 2 = 8ths)
export const tensionBeats = 8                         // optional; TENSION length when P is not from a riser (§2.5)

export function harmony(tl, rng, lib) { return [{ beat | t, sym, bass? }, ...] }
export function compose(tl, rng, lib) { return { notes, drums, automation } }
export function logo(tl, ctx) { return { notes, drums } }        // ctx = { motif, rng, D, T }
export const instruments = { [inst]: (ev, ctx) => buffer }       // renders ONE note or drum event
export const mix = { levels, sends, sfxSends, duck, duckBig, sidechain, delay, glue, sfxComp, music, sfxBus, returns, logo }
export const sfx = { tick, type, pop, ding, reveal, thud, whoosh, riser, roll, cash, buzz, boing, step, hit, swipe }  // (cue, ctx) => buffer
```

`lib` is `{ D: dsp.mjs, T: theory.mjs }`. Packs may also import `src/sound/index.mjs`, which re-exports `dsp`, `theory`, `kit`, `fx`, `meter` and the timeline.

**Buffers.**
- A buffer is a mono `Float32Array` or a stereo `{ L, R }` at 48 kHz.
- `buf.offset` is the number of pre-roll samples: sample `offset` lands on the event time. Use it for a reverse swell that ends at its time, or the `reveal` pre-roll.
- `buf.meta` is optional: `{ pitches: [midi], pan, duck: { depth, hold, release } | [d, h, r], sends: { plate|hall|room: dB }, body: false }`.

**Harmony.**
- Spans start at a global beat (`beat`) or a time (`t`). Each span runs until the next one, and the last one runs to `base`.
- `bass` is an optional pitch class for a pedal or slash bass. Symbols are parsed by `theory.chord`: `Dm`, `Dm(add9)`, `Bbmaj7`, `Gm9`, `A7sus4`, `Bb/D`, `D/F#`, `G#°7` and so on.
- The engine calls `tl.setHarmony(plan)`. From then on, `tl.chordAt(t)` returns `{ sym, root, tones, bass, t0, t1, ... }` and every bar carries `chord`.
- From `base` on, `chordAt` returns the logo chord, D(add9).

**Events** (`compose` and `logo`):
- note `{ t, dur, midi, vel, inst, role, chromatic?, pan?, ...anything the instrument reads }`
- drum `{ t, inst, vel, pan?, ... }`
- `role` is one of the §9.4 roles (bass, pad, arp, lead, stab, brass, mallet, glock, pizz, strings, logo). Logo events go to the LOGO bus.
- Times are seconds, placed at `Math.round(t·48000)`.
- The instrument applies `vel`; the engine applies `mix.levels[inst]` (dB) and the pan (constant power).
- Voices are summed in the order (t, bus, inst, midi, index).

**Instrument ctx:** `{ tl, ev, rng, bpm, beatLen, chordAt, keyAt, k, D, T }`. `rng` is the seeded stream `noise:<inst>:<k>`, where `k` is the instrument's event index.

**Automation** (all optional):
- `gain: { [inst]: [{ t, db }] }` (piecewise linear in dB)
- `musicDb: [{ t, db }]` (the music body bus)
- `duck: [{ t, depth, hold, release, attack?, until? }]` (extra duck events, for example the 4 dB `buzz` duck)

**SFX ctx** (`sfx[kind](cue, ctx)`):

| Field | Meaning |
|---|---|
| `cue` | `{ t, tCue, kind, gain, dur, i, n, inCard, train?, cluster? }`. `t` is clamped to ≥ 0 (§2.1), and `n` is the per-kind index |
| `rng` | Seeded stream `sfx:<i>` |
| `chord`, `chordAt`, `keyAt`, `beatAt`, `bpm`, `beatLen` | Harmony and tempo at the cue |
| `train` | `{ id, index, period, k }` when the cue is in a clock train |
| `cluster` | `{ id, rank, size, members }` when cues fall within 15 ms of each other (rank 0 = highest body priority) |
| `isAnchor`, `atP`, `atV`, `atL`, `P`, `V`, `L` | Anchor tests (±15 ms) and anchor times |
| `inCard` | The cue is at or after `base` |
| `dropBody` | Lower-priority cluster member, or a card cue within 0.15 s of L. Leave out the body (< 300 Hz) and set `meta.body = false`; otherwise the engine high-passes the whole sound at 300 Hz |
| `dropTransient` | A music kick, snare or clap is within 15 ms (§4.6.1 merge). Leave out the transient layer |
| `claim(midi)` | §8.4.2. Returns a free pitch in the cluster: the next chord tone up if the pitch is taken |

- Render each SFX at cue gain 1 and at the bible's peak level for its kind. The engine multiplies by `cue.gain`.
- The duck comes from `meta.duck`, then `mix.duckBig[kind]` (at P), then `mix.duck[kind]`, then the engine's `DEFAULT_DUCK`. The engine scales its depth by `clamp(gain / 0.7, 0.3, 1.2)`. `roll` and `type` hold the duck over their `dur`.
- Every pack must implement all 15 kinds. A missing kind falls back to the default pack and is reported as a warning.

**mix:**
- `levels` (dB per instrument)
- `sends: { [inst]: { plate, hall, room, delay } }` and `sfxSends: { [kind]: {...} }` (dB)
- `sidechain: { triggers: ['kick'], targets: [...], depth, attack, hold, release }`
- `delay: { beats: 0.75, feedback: 0.3, lp: 3500, hp: 300, returnDb: -14 }`
- `glue: { ratio, attack, release, knee, targetGr }`: the threshold is set so the DROP's 75th-percentile level shows `targetGr` dB of gain reduction
- `sfxComp: { ratio, attack, release, knee, maxGr }`: the threshold is set so the loudest `hit` peak gets `maxGr` dB
- `payoffDuck: { depth: 9, hold: 0.15, release: 0.45 }`: an engine duck at P (see the engine decisions); `null` turns it off
- `music`, `sfxBus`, `returns`, `logo`: bus trims in dB

**Determinism rules for packs:**
- Never use `Math.random` or the clock.
- Draw randomness only from the streams the engine passes, or from `tl.stream(name)`. Use `'hum'` for humanising, and create each stream once.
- Never draw a data-dependent number of values from a stream another layer uses. The `rng` helpers (`range`, `int`, `pick`, `bi`, `gauss`, `chance`) each draw a fixed number of values.

## The timeline (`tl`)

**Fields:**
- `id`, `look`, `fps`, `duration`, `base`, `vo`, `verdict`, `beatsSpec`
- `card: { t0, dur, k, L, how }` (or `null` without an end card)
- `cues` (prepared, sorted), `trains`, `clusters`
- `anchors: { P: { t, rule, beat, gap }, V: { t, beat } | null, base: { t, beat }, L }`. `gap` is P minus one eighth note: the start of the silent gap.
- `tempo: [{ a, b, n, bpm, beat0, beat1, to, pickup, remainder, free? }]`
- `bars: [{ i, t, t1, beat, beats, bpm, seg, pickup?, brk?, section, split?, energy, dense, sparse, load, cues, cueBar, rolls, phrase?, phraseBar?, chord }]`
- `beats: [{ i, t, t1, load, rollActive, dense, sparse }]`, covering [0, base)
- `sections: [{ name, b0, b1, t0, t1 }]`. Names: HOOK, BUILD, TENSION, DROP, HOLD, BREAK, VERDICT, HOLD2, CADENCE, CARD.
- `phrases`, `stepBar` (the E3 → E4 bar), `quiet` (cue-free stretches ≥ 1.5 s), `accents` (cues ranked by gain·weight), `key`, `payoff` (all candidates), `tempoSettings`

**Queries:**
- `beatAt(t)`, `timeAt(beat)`, `barAt(t)`, `bpmAt(t)`, `beatLen(t)`, `sectionAt(t)`, `section(name)`
- `step(bar, s, swing)`: the time of 16th step `s`, 1-based, with swing (0.58 = the Becker Rig feel)
- `chordAt(t)`, `keyAt(t)`, `harmony`
- `cuesIn(t0, t1, kinds?)`, `rollAt(t)`, `trainAt(t)`, `isAnchor(t, tol)`
- `drumYield(t)`: §4.6.1. Returns `{ action: 'keep' | 'drop' | 'merge', cue }`; anchors never yield
- `stream(name)`, `logoMotif()`

The tempo map reproduces the bible's §2.3 table for all 30 specs exactly. Those rows are test vectors in `test/sound.test.mjs`, and the Appendix A sections and energy for 09c and 09b are tested too.

**`logoMotif()`** returns `{ L, t0, notes: [{ t, midi, vel, pan, gate, n }], echoes, swell, chord: { sym, voicing }, ding: [90, 93], tail }`:
- `notes` are n1-n4: A4, D5, E5, A5 at L − 0.3, L − 0.2, L − 0.1 and L, using the short-card rule when it applies.
- `voicing` is D2 D3 A3 E4 F#4.

Every pack orchestrates these same notes.

## Outputs

**`<id>.score.json`** (§9.4) holds:
- `key`, `anchors`, `tempo`, `sections`, `harmony`, `trains`, `clusters` and `logo`
- `bars [{ i, t, beats, bpm, section, energy, chord: { sym, root, tones, bass }, dense, sparse, cueBar }]`
- `notes [{ t, dur, midi, vel, inst, role, chromatic?, pan? }]` and `drums [{ t, inst, vel }]`
- `sfx [{ i, t, kind, gain (after the cluster cap), cueGain, pitches, pan, duck, cluster?, train?, dropBody?, dropTransient? }]`
- `duck: { rate: 100, db: [...] }`

**`<id>.report.json`** holds:
- P and its rule, V, L, the BPMs, the tempo segments and the sections
- `loudness`:
  - the pre-master level and the integrated level, LRA, momentary and short-term maxima, and the true peak
  - `postEncode`: the decoded AAC's integrated level and true peak, plus ffmpeg ebur128
  - `ffmpegLoudnorm`: an independent pass-1 measurement of the master WAV
- `master`: gain, ceiling, iterations and `encodeTrials` (each ceiling tried, with the true peak after AAC)
- `limiter`: maximum gain reduction, the percentage of samples above 1 dB, and `hotspots`, the 12 deepest gain-reduction runs with the cues and drums at each one. This is the first place to look when A11 fails
- `glue` and `sfxComp` thresholds and gain reduction
- `stems`: LUFS of each stem and its offset from the mix (for B1)
- `instruments`: event counts and peaks
- `cueStart`: per cue, the first sample above −60 dBFS in the master's level, and its error in ms (B4)
- `warnings`, `node` and `wavSha256`

## Measured facts (engine, 2026-10-11)

**Oscillators** (spectral peaks off the harmonic series, relative to the fundamental):

| Oscillator | Plain (1x) | Behind a 24 dB LP at 6 kHz (1x) | 2x oversampled (`os: 2`) |
|---|---|---|---|
| PolyBLEP saw, D6 | −45.6 dB | −69.4 dB | −61.0 dB |
| PolyBLEP saw, A6 | −29.9 dB at 23.4 kHz | −63.6 dB | −55.8 dB |
| PolyBLAMP triangle, A6 | −56.2 dB | | |

Use `os: 2` for a bright, unfiltered saw or square above about MIDI 80.

**Meters:**
- Integrated loudness and LRA match ffmpeg's ebur128 to 0.1 LU.
- The true-peak meter reads a 12 kHz sine sampled at ±45° as +0.09 dBTP, where the ideal is 0 dBTP (it errs high, which is the safe direction). On noise it reads about 0.3 dB above ffmpeg.

**AAC:** at 192k, the AAC stage adds 0.3 to 1.9 dB of true peak over the master.
- The worst case is the hard full-level hook at t = 0, where the codec's first frame overshoots: 01c and 05c with the default pack, about 11.6 ms in.
- There, the bible's global retry (−0.5 dB per step) does not help: 01c still read −0.62 dBTP after AAC with the ceiling at −2.5.
- So the engine first lowers the ceiling locally (by the excess + 0.3 dB, ±25 ms around each spot that went over in the decoded audio), then globally. The time alignment of decoded AAC to the WAV was checked: lag 0 samples.
- With the default pack, all 30 specs end at ≤ −1.0 dBTP after AAC (ebur128 agrees). By retries needed: 14 none, 8 one, 6 two, 05b three local, and 07c three local plus one global step to −2.0.
- `encodeTrials` records each step and its spots.

**Determinism:** for 09c, 04a, 09b and 05a, the master WAVs are byte-identical across runs, across 1 or 4 worker threads, and between live mounting and the cue dump.

**Default-pack baseline (all 30 specs, `sound` + `audit`, 2026-10-11)** — the floor the look packs start from:
- 30/30 muxed with the video md5 identical. AAC-LC stereo 48 kHz at 196-204 kb/s, with audio duration equal to the video's.
- Integrated −14.01 to −14.16 LUFS, true peak ≤ −1.0 dBTP, no silence (0% under −45 dBFS for ≥ 1 s).
- L/R correlation 0.85-0.89, mono-fold delta −0.3 to −0.7 LU, phone-proxy drop 2.3-4.1 LU.
- Every cue starts within 1.2 ms of its time (`cueStart`), and S1-S14, B2 and B10 pass 15/15 on all 30.
- Below target on the dynamics and spectrum side (the packs' job):
  - LRA 2.8-5.8 LU (§9.1 A3 wants 4-9 for Scoreboard).
  - The limiter does > 1 dB of gain reduction on more than 3% of samples in 15 specs (A11). `hotspots` shows that the hits and kicks at P and t = 0 are what drives it.
  - The 63 Hz band is +6 to +12 dB re 1 kHz, above the §9.2 Becker Rig range.
- About 26 s of CPU per spec; 210 s for all 30 with 4 workers.

## Engine decisions where the bible is silent or contradicts itself

1. **DROP minimum.**
   - The DROP is at least 1 bar when the segment after P allows it, and the CADENCE takes what is left. The CADENCE never starts before the end of the DROP (without V) or of the VERDICT bar (with V).
   - Affected: 02a has only 5 beats from P to base (DROP 1 bar, CADENCE 1 beat). 04a and 04c have 7 beats from V to base (VERDICT 1 bar, CADENCE = the 3-beat break).
2. **Payoff fallback.** With no candidate at all, P is the heaviest cue (weight·gain) in [1, base − 1), or 60% of base. No channel spec needs this; the test kit spec does.
3. **The logo is not ducked** by the card's SFX. Its sends go to unducked returns.
4. **Separate returns.** Music returns duck by half the music duck (§8.3) and by −6 dB under the logo (§3.3). SFX returns are not ducked, so a hit does not duck its own tail.
5. **Merge rule.** Every lower-ranked cluster member gets `dropBody` (§8.4.1). A pack that ignores the flag gets an automatic 300 Hz high-pass on that sound.
6. **B10 exempts anchors.** Music hits at 0, P, V and base are exempt from the flam check, because "anchors never yield" (§4.6.1). Without this, 09c's mandatory kick at P (19.12) would flam with its `cash` at 19.18.
7. **Local AAC retries.** Before falling back to §8.6 step 9's global −0.5 dB steps, the engine lowers the ceiling only where the decoded AAC went over. See "Measured facts"; the global step alone failed on 01c and 05c.
8. **Mux copies the verified AAC.** It uses `-c:a copy` on the `.m4a` whose true peak was measured, instead of re-encoding the WAV inside the mux.
9. **Loudness.**
   - The master is normalised in JS: a static gain, the same operation as loudnorm in linear mode, then the JS limiter. ffmpeg loudnorm runs only as a pass-1 measurement, reported in `ffmpegLoudnorm`.
   - loudnorm's `input_i` reads about 0.3 LU hotter than BS.1770/ebur128 on these mixes. ebur128 is the A1 reference.
10. **Envelope times.**
   - ADSR decay reaches 99% of the way to the sustain at `d`. Release reaches exactly 0 at `r`, with no click.
   - FDN outputs are normalised to unit impulse-response energy per channel, so a send at −12 dB returns about −12 dB for sustained input.
11. **The payoff duck.**
    - B2 requires the music to sit at least 8 dB down over [P, P + 0.15]. The §5/§7 tables only reach that when a `hit` marks P.
    - When P comes from the verdict rule (02b, 02c, 03b, 03c, 08b), its cue is a `reveal` (6 dB) or a `ding` (3 dB), or there is no cue at all.
    - So the engine adds its own duck at P: 9 dB, held 150 ms, released over 450 ms, unscaled by gain. As always, the deepest duck wins.
    - A pack can change it, or turn it off with `mix.payoffDuck = null`.
12. **Missing file.** `studio/sound/overrides.json` (`{ "<id>": { "payoff": t, "verdictAnchor": false } }`) is read when it exists. The engine does not create it.

## Tests

`npm test` (`test/sound.test.mjs`) covers:
- the 30 tempo-map vectors, the Appendix A sections and energy, trains and overrides
- the logo note times
- DSP units: aliasing (U1-style), ADSR clicks, the SVF −3 dB point and Karplus-Strong tuning
- BS.1770 at −20 LUFS, true peak, limiter ceiling, duck shape and reverb decay
- a synthetic teaser that masters to −14 ± 0.3 LUFS: stereo, bounded, last sample 0, cue onsets within 2 ms, byte-identical across two runs and different for a different id
- all 15 default-pack kinds: within their level, varying between occurrences (U4)
- a remux whose video md5 is unchanged, with AAC stereo 48 kHz at 172-212 kb/s and durations within one frame

`test/studio.test.mjs` keeps:
- the legacy `mix()` test
- the render test, which now checks for stereo 48 kHz audio at −14 LUFS
