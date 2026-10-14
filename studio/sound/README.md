# Sound engine and pack contract

The soundtrack for the 30 teasers: music and sound effects only, no narration. The design rules are in [`BIBLE.md`](BIBLE.md): its §9 is the acceptance checks, threshold for threshold the same as [`acceptance.json`](acceptance.json), and its §11 says how to change a kit, a spec, a pack or the engine safely. This file covers the shared engine in `src/sound/`, how a look's sound pack plugs into it, and the commands that render, mux and audit the audio.

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

# the acceptance harness: every check of sound/acceptance.json on every spec (builds into a temp dir), exit 1 on a failure
npm run sound:verify
```

## Commands

| Command | What it does |
|---|---|
| `audio <specs> --out <dir>` | Renders the audio for each spec: `<id>.wav` (float32 master), `<id>.m4a` (AAC-LC 192k, true peak verified after decoding), `<id>.score.json`, `<id>.report.json`. `--stems [dir]` writes `music.dry`, `music`, `sfx`, `returns` and `mix` WAVs. `--no-encode` skips the AAC stage, and `--no-check` skips the ffmpeg cross-measurements |
| `sound <specs> --video <dir\|mp4> --out <dir>` | The same audio, muxed onto the finished MP4 with `-map 0:v:0 -map 1:a:0 -c:v copy`. Writes `<out>/<id>.mp4`, plus `<out>/sound/<id>.report.json`. `--score` keeps the score, `--wav` the master WAV, and `--stems [dir]` the stems. Each mux is verified: the video-stream md5 must equal the source's, the audio must be AAC stereo 48 kHz, and the audio duration must match the video within 1/fps |
| `remux <spec> --video <mp4> --out <mp4>` | The bible's single-spec form of `sound` (§10.5) |
| `verify <specs>` | The acceptance harness (see [Acceptance harness](#acceptance-harness-verify)): every check of `acceptance.json` on every spec, a pass table, the failures, exit 1 on any failure. It also compares the cue records with `test/fixtures/cues.json` (`--strict-cues` makes drift a failure) |
| `audit <files or dirs>` | For each MP4/M4A/WAV: integrated loudness, true peak, LRA, PLR, crest factor, silence (50 ms RMS below −45 dBFS for at least 1 s) and the longest quiet run, L/R correlation (mean and minimum over 400 ms windows), the mono-fold delta, the phone proxy (HP 250 Hz, 4th order), octave bands relative to 1 kHz, the 2-5 kHz harshness margin, cue-onset alignment and a spectrogram PNG. With the engine's score next to the file (or `--reports <dir>`), it also runs the symbolic checks S1-S14, B2 and B10 (the same code and thresholds as `verify`). `--json` prints everything |
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
   ├─ MUSIC body (bus 'music'): musicDb, HP 30 Hz, glue 2:1, event duck
   ├─ REACT (bus 'react'): as the body but never ducked (mix.react: via the music path, or via the logo path)
   ├─ LOGO (bus 'logo'): not gated, not ducked, not glued
 SFX bus: HP 35 Hz, compressor 3:1
 returns: music sends (PLATE/HALL/ROOM/ping-pong delay; ducked by half the music duck, −6 dB under the logo)
          + SFX/logo sends (not ducked)
 MASTER = music + SFX + returns ─▶ HP 25 Hz ─▶ low mono < 120 Hz ─▶ gain to −14 LUFS ─▶ 4x true-peak limiter (−1.5 dBTP)
        ─▶ re-measure (≤ 2 corrections) ─▶ 1 ms ramp in, 0.40 s cosine fade out, last sample 0 ─▶ WAV
        ─▶ AAC 192k behind a 64 ms silent pre-roll, trimmed by stream copy ─▶ decode ─▶ true peak ≤ −1.0 dBTP and
           PLR ≤ 13? else lower the ceiling locally around each spot that went over, from the master's own peak there
           (≤ 3 times), then globally by 0.5 dB (≤ 2 times), and redo
```

## Files

| File | What it holds |
|---|---|
| `src/sound/cues.mjs` | `mountCues(browser, spec)` and `cueRecord(spec, info)`: the engine's only input. `cueDrift(recs)`: the records that differ from `test/fixtures/cues.json` (the cue-drift guard, `verify`, `render`, `audio`, `sound`) |
| `src/sound/timeline.mjs` | §2: cue prep, trains, clusters, the payoff P, the tempo map, the card anchor L, sections, energy, the density map, queries, and `logoMotif` |
| `src/sound/dsp.mjs` | Primitives: seeded rng, PolyBLEP/BLAMP oscillators (optional 2x oversampling), unison, noise colours, the TPT state-variable filter (per-sample cutoff, 12/24 dB), 1-pole filters, the DC blocker, RBJ biquads, ADSR and exponential envelopes, glides, FM with the Carson clamp, modal partials, Karplus-Strong, tanh, pan, buffer helpers |
| `src/sound/theory.mjs` | MIDI and Hz, note names, keys, chord symbols, tones in a register, nearest/above/below tone, voice-led voicings |
| `src/sound/kit.mjs` | The instrument toolkit: kick, snare, clap, hats, crash and its reverse swell, tom, shaker, tambourine, woodblock, impact, timpani, the 808, pluck, mallet, glock, FM bell, pad voice, brass, tremolo strings, lead, clicks, pings, noise sweeps, `layer`, `norm` |
| `src/sound/fx.mjs` | The three FDN reverbs (§8.5 tables), ping-pong delay, compressor, `duckCurve`, `sidechainCurve`, `lowMono`, `limitTruePeak` |
| `src/sound/loudness.mjs` | BS.1770-4 integrated, momentary and short-term loudness, EBU 3342 LRA, and the 4x true-peak meter |
| `src/sound/engine.mjs` | `loadPack`, `renderMix`, `masterMix`, `renderSound`, `scoreOnly` |
| `src/sound/routing.mjs` | The buses an event can name (`music`, `react`, `logo`), their order, and `routeOf(bus, inst, mix)`: what the engine does to a voice on each. Packs that model the mix import it (Scoreboard's `clearance.mjs`) |
| `src/sound/scorecheck.mjs` | Re-exports `checkScore` from `sound/checks/score.mjs` (the symbolic checks §9.4 S1-S14, B2, B10), for the audit, `index.mjs` and the tests |
| `src/sound/audit.mjs` | The audit command's measurements and table |
| `src/sound/batch.mjs`, `worker.mjs` | Record gathering, worker-thread pool, verified mux |
| `src/sound/ffmpeg.mjs` | Encode (with the trimmed silent pre-roll, `AAC_PREROLL`), decode, mux, ebur128, the loudnorm measurement, video md5, spectrogram |
| `src/sound/wav.mjs` | Float32 WAV writer and a WAV reader |
| `src/sound/packs/default.mjs` | The default pack: a stereo, chord-aware port of the legacy SFX plus a minimal neutral bed. Copy it to start a pack |
| `src/audio.mjs` | Legacy mono `mix()`, `KINDS`, `RATE` (kept for `--legacy-audio` and its test) |
| `sound/acceptance.json` | Every acceptance threshold, keyed by bible check ID, global and per look. The bible's §9 mirrors it. A value that passes today but differs from the bible's text is marked `pending`; since bible v2 that is only A8's correlation target for Becker Rig, an open owner decision |
| `sound/checks/` | The acceptance harness behind `verify` (see below) |
| `sound/tools/tempo-table.mjs` | The §2.3 tempo-map vectors: runs the bible's Appendix B (python3) on a cue file, checks the engine against it, lists the rows that moved and rewrites them with `--write` (BIBLE.md §11.1). `test/sound.test.mjs` imports its table parser |

## The cue record (engine input)

```js
{ id, look, format, fps, duration, base,            // duration includes the card; base = where the card starts
  brand: { logo, card: 'kit' | 'generic', t0, dur } | null,
  sfx: [{ t, kind, gain?, dur?, ... }],              // info.sfx from openSpec, unchanged
  vo: [{ t, d, text }], verdict: { t, text } | null, beats: [...] }   // from the spec (beats = lookOpts.beats)
```

`test/fixtures/cues.json` holds the records of all 30 specs as mounted on 2026-10-11. Both look packs carry values fitted on these cue lists, and the tempo-map test vectors (BIBLE.md §2.3) are computed from them. So `test/cues.test.mjs` mounts every spec and fails with `cue list changed for <id>: refit the sound pack, see <the look's tools/README.md>` when one moves (see [Fitted values and cue drift](#fitted-values-and-cue-drift)).

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
- `bus` (optional) is `'music'` (the default), `'react'` or `'logo'` (the default for role `logo`). Any other value is an error. See [The react bus](#the-react-bus-bus-react).
- Times are seconds, placed at `Math.round(t·48000)`.
- The instrument applies `vel`; the engine applies `mix.levels[inst]` (dB) and the pan (constant power).
- Voices are summed in the order (t, bus, inst, midi, index), with the buses in the order logo, react, music (`routing.mjs` `BUS_RANK`). The instrument index `k` (its noise stream) counts in the same order.

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
- `react: { via, musicDb, glue, sends, inst }`: what the react bus does besides skipping the duck (below)
- `music`, `sfxBus`, `returns`, `logo`: bus trims in dB

### The react bus (`bus: 'react'`)

The design rule, with the measurements behind both packs' choice of `via: 'logo'`, is BIBLE.md §8.3.1.

A music voice that answers a cue — a "catch the hit" stab, a payoff stab, a verdict button — should not be ducked by the cue it answers. Give its events `bus: 'react'`. The engine then leaves it out of every event duck: the cue ducks, `automation.duck` and the payoff duck. Everything else is the pack's choice, in `mix.react`:

| Key | Default | Meaning |
|---|---|---|
| `via` | `'music'` | `'music'`: the voice is processed as a music voice — its gain automation, the kick sidechain (if it is a `sidechain.targets` instrument), the body gate at `base`, HP 30 Hz, and the keys below. `'logo'`: the voice joins the logo bus and gets exactly what the sting gets: no `musicDb`, glue, sidechain or gate, sends to the un-ducked returns, `mix.logo` |
| `musicDb` | `true` | (`via: 'music'`) follows `automation.musicDb` and `mix.music`, like the body |
| `glue` | `true` | (`via: 'music'`) shares the glue compressor with the body: one detector over both, the same gain reduction on both (the DROP level that sets its threshold includes the react voices) |
| `sends` | `'music'` | (`via: 'music'`) `'music'`: its sends feed the music returns (half the duck, −6 dB under the logo). `'free'`: the un-ducked returns, like the SFX and the logo |
| `inst` | — | per-instrument overrides of the keys above, e.g. `inst: { revcrash: { via: 'logo' } }` |

- `routing.mjs` `routeOf(bus, inst, mix)` returns what the engine does to a voice (`{ sum, duck, musicDb, glue, sidechain, gate, sends, fader }`). A pack that models the mix (Scoreboard's `clearance.mjs`) should read it rather than test bus names.
- React voices are part of the `music` and `music.dry` stems, so B3, B5, B6 and B7 count them. B2 reads the duck curve, not the audio: a react voice at P is outside the payoff duck, so budget its level against the cues it answers.
- The score marks them `bus: 'react'` (notes and drums).
- `via: 'logo'` sums the voice into the logo bus itself, so it is bit-identical to the old way of escaping the duck (`bus: 'logo'` on a non-logo event). Don't put non-logo events on `bus: 'logo'` any more; that bus is the sting's.
- Both packs use `via: 'logo'` today (their react levels were set on that path, see their READMEs).

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

The tempo map reproduces the bible's §2.3 table for all 30 specs exactly. Those rows are the test vectors: `test/sound.test.mjs` reads them from BIBLE.md, and checks that the bible's Python reference (Appendix B) prints exactly them when python3 is present. The Appendix A sections and energy for 09c and 09b are pinned in the test too. When the cue records change, `node sound/tools/tempo-table.mjs --write` regenerates the rows (BIBLE.md §11.1).

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
- `master`: gain, ceiling, iterations, `aacPreroll` (samples) and `encodeTrials` (each ceiling tried, with the true peak after AAC, and each spot's local dip)
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

**AAC:** at 192k, the AAC stage adds up to about 2 dB of true peak over the master at a transient, wherever the codec cannot follow it (once about 3.7 dB: 01c's em-sting hit at L, 25.80 s, which the new local dip cleared).
- **The first frame was the worst case**, because ffmpeg's encoder starts a file with an empty bit reservoir. 05b's t = 0 hook got 392 bytes in its first frame where the same audio gets 1039 after silence: the first 50 ms decoded at 12.9 dB SNR (30.5 dB with the pre-roll) and up to +3 dB over the master's peak, about 12 ms in. Lowering the ceiling did not reliably help there; the old loop fell back to global steps (−2.5 dBTP in past runs). See [The AAC first frame](#the-aac-first-frame).
- So every encode now runs behind a 64 ms silent pre-roll that is trimmed by stream copy (`ffmpeg.mjs` `encodeAac`). Over the first 30 ms the 30 delivered teasers decoded up to 1.30 dB over their master (05b, after a local dip); with the pre-roll the worst is +0.12 dB, with Becker's hook brass 2 dB louder than before.
- A failing encode then lowers the ceiling locally (±25 ms around each spot that went over in the decoded audio) to the master's own true peak there, less the excess + 0.3 dB, then globally. The time alignment of decoded AAC to the WAV is lag 0 samples, with and without the pre-roll.
- On the 30 teasers (2026-10-12): every one ends at ceiling −1.5 dBTP, with no global step (04b used to fall back to −2.0). By encodes: 13 one, 11 two, 5 three, 09a four (54 encodes, 59 before). On the v2.4 build (2026-10-13): still every one at −1.5 dBTP with no global step; 19 one, 7 two, 01b, 05c and 07b three, 08b four (46 encodes). On the v2.5 build (2026-10-13, the evening): every one at −1.5 dBTP with no global step; 23 one, 7 two (01a, 02c, 03a, 03b, 08c, 09a, 10c: 37 encodes).
- `encodeTrials` records each step and its spots: `t`, `overDb`, and for a local dip the master's own peak there (`masterTp`) and the dip (`dipDb`). `master.aacPreroll` is the pre-roll used (3072 samples; 0 if the trim check failed and the plain encode was used, with a warning).

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

This is the engine's record of its own decisions. Since bible v2 (2026-10-12), the bible itself states 3, 4, 6, 7, 8, 11, 13 and 14 (§8.1, §8.3, §8.3.1, §8.6, §9.3), and the A5 enforcement in the encode loop (§8.6 step 9). The rest are engine detail.

1. **DROP minimum.**
   - The DROP is at least 1 bar when the segment after P allows it, and the CADENCE takes what is left. The CADENCE never starts before the end of the DROP (without V) or of the VERDICT bar (with V).
   - Affected (the records of v2.3): 02a had only 5 beats from P to base (DROP 1 bar, CADENCE 1 beat), and 04a and 04c 7 beats from V to base (VERDICT 1 bar, CADENCE = the 3-beat break). Since the condensed cuts (v2.4) 06a, 06b and 06c have 5-6 beats from P to base (a 1-bar DROP, a short CADENCE), and where P is 4 beats or less from base (02a, 02b, 02c, 03a, 03b, 03c, 05a, 05b; since v2.5 also 08b and 08c) the DROP runs to base and there is no CADENCE (BIBLE §2.5). Since v2.5 05c has the only 2-bar DROP of the 30; the other 19 have P 5-10 beats from base (a 1-bar DROP, a CADENCE of 1-6 beats; 06c and 09b: 1 beat).
2. **Payoff fallback.** With no candidate at all, P is the heaviest cue (weight·gain) in [1, base − 1), or 60% of base. No channel spec needs this; the test kit spec does.
3. **The logo is not ducked** by the card's SFX. Its sends go to unducked returns.
4. **Separate returns.** Music returns duck by half the music duck (§8.3) and by −6 dB under the logo (§3.3). SFX returns are not ducked, so a hit does not duck its own tail.
5. **Merge rule.** Every lower-ranked cluster member gets `dropBody` (§8.4.1). A pack that ignores the flag gets an automatic 300 Hz high-pass on that sound.
6. **B10 exempts anchors.** Music hits at 0, P, V and base are exempt from the flam check, because "anchors never yield" (§4.6.1). Without this, 09c's mandatory kick at P (19.12) would flam with its `cash` at 19.18.
7. **Local AAC retries.** Before falling back to §8.6 step 9's global −0.5 dB steps, the engine lowers the ceiling only where the decoded AAC went over, measured from the master's own peak at that spot (a dip measured from the ceiling does nothing where the master already sits under it: 04b at 36.5 s). See "Measured facts"; the global step alone failed on 01c and 05c.
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
13. **AAC pre-roll.** §8.6 encodes the master as is. The engine encodes it behind 64 ms of silence and drops those frames by stream copy, so the codec meets frame 1 like any later frame (see [The AAC first frame](#the-aac-first-frame)). The delivered stream has the plain encode's shape: the same packet count, the same 1024-sample priming edit list and duration, and it decodes sample-aligned.
14. **The react bus.** The bible has the duck (§8.3) and the logo bus (§3.3) but no way for a music voice to answer a cue without being ducked by it. `bus: 'react'` is that way (see [The react bus](#the-react-bus-bus-react)).

## Acceptance harness (`verify`)

`sound/acceptance.json` is the single source of truth for every threshold of the bible's §9 (A1-A14, the §9.2 bands and harshness, B1-B10, S1-S14, U1-U4) and of the packs' own rules (TRAIN, DUCK, LOGO for Scoreboard; MALLET, FLAMS for Becker Rig). An entry's top-level values apply to every look; `looks.<look>` overrides them. `gate: false` reports without failing (B1w, INFO). Nothing in `sound/checks/` or `src/sound/scorecheck.mjs` hardcodes a threshold, and `test/acceptance.test.mjs` checks that every threshold is read by a check and that A1/A2/A5 and S9 agree with the engine's constants and the packs' tempo.

```bash
npm run sound:verify                                    # all 30: build (audio + AAC + stems) into a temp dir, mux, check
node src/cli.mjs verify specs/09c-*.json                # some specs
node src/cli.mjs verify --from /tmp/sound/audio         # check prebuilt outputs (audio --stems, or sound --score --wav --stems)
node src/cli.mjs verify --json > verify.json            # everything as JSON (logs on stderr)
node src/cli.mjs verify --detail                        # every check's measurement, per spec
npm run sound:units                                     # the packs' §9.5 unit checks only (no audio build, about 30 s)
npm run sound:pending                                   # the values that pass today but differ from the bible's text, and why
npm run sound:tempo-table                               # the BIBLE.md §2.3 rows: Appendix B (python3) vs the engine vs the bible (--write after a cue change)
node src/cli.mjs verify --strict-cues                   # cue drift (records != test/fixtures/cues.json) is a failure, not just a report
SOUND_ACCEPTANCE=/tmp/try.json node src/cli.mjs verify --from <dir>   # try other thresholds without touching acceptance.json
```

**What it does.**
1. Gathers the cue records: `--cues <file>`, or `<from>/cues.json`, or mounted in Chromium.
2. Without `--from`, renders every spec as `audio --stems` does (encode loop and ffmpeg cross-checks included) into a fresh temp dir (`--out <dir>` to choose it, `--keep` to keep it). It never writes into `renders/`. A failing run keeps its outputs and prints where.
3. Muxes each verified AAC onto the finished MP4 (`--video <dir>`, default `../renders/channel`, read only; `--no-video` skips) into the temp dir, for A12 and A13.
4. Runs the checks over a worker pool (`--jobs`, default 4): the global ones (`delivery.mjs` §9.1-9.2, `stems.mjs` §9.3, `score.mjs` §9.4) and the look's (`looks/<look>.mjs`). Each look's unit checks run once alongside. Becker Rig's U3/U4 render every Becker teaser's own cues.
5. Prints:
   - a table: one row per spec with I, TP, PLR, LRA and one character per check (✓ pass, ✗ fail, w waived, i info);
   - each check's pass count per look, and the units per look;
   - the failures with their measurements;
   - the pending-bible-sync list;
   - the comparison with the baseline;
   - the comparison of the cue records with `test/fixtures/cues.json`: a `CUE DRIFT` block naming each record that moved and its look's refit doc. Every check above can pass on stale fitted values, so read it. It is skipped under a non-default brand (`--no-brand`, `--brand`, `--logo`), and says so when the records were read from the fixture itself.
6. Exits 1 if any gated check fails, or with `--strict-cues` on cue drift, or with `--expect-identical` on a baseline difference.

**Determinism and the baseline.**
- A14 checks that each master WAV hashes to the `wavSha256` the engine wrote and differs from every other spec's. `--twice` renders everything a second time and compares.
- `test/fixtures/sound-baseline.sha256` (`sha256sum` format) holds the 30 master WAVs that `renders/channel` delivers: the build shipped on the evening of 2026-10-13 (BIBLE.md status v2.5: the condensed cuts of 07a-10c, 10a and 10c recut to the earlier verdict, with both packs' payoff rules for short bodies and refits). Its AAC streams are the ones muxed into those MP4s. Every run prints how many masters are identical to it.
- **What the v2.2 ship changed** (2026-10-12) against the earlier baseline: 24 of the 30 masters.
  - All 15 Becker teasers changed: the t = 0 brass is 2 dB louder (back on `honkF` behind the AAC pre-roll), `MODEL` was refit, the reference-octave crowding rule moved 06c, 07c and 09b, and 06c is the condensed cut.
  - Nine Scoreboard teasers changed (03b 04a 04c 05c 06b 07a 08a 10a 10c), because the encode loop's local dips now land elsewhere or not at all. 01a 02b 02c 03c 06a 09c are identical: they needed no dip before or after.
  - Every AAC stream changed, so all 30 delivered MP4s changed; each video stream is bit-identical to its source.
- **What v2.3 changed** (06b's condensed cut, the same day): only 06b's master (`27d95cfa…`, was `7ae652c1…`) and its MP4, which is the new 20.8 s cut. The other 29 masters equal the v2.2 baseline, and their MP4s are byte-identical. Scoreboard's calibration was re-measured on the new records and stayed at its fixed point, so nothing was refit.
- **What v2.4 changed** (2026-10-13): all 30 masters. The 16 condensed cuts of 01a-06a moved their cue records, and both packs gained short-body rules and were refit (BIBLE §4.7, §6.7 item 7, §11.2), which moves every master of both looks. Every AAC stream changed, so all 30 MP4s changed; each video stream is bit-identical to its source (the 16 condensed renders and, for the other 14, the previous files).
- **What v2.5 changed** (2026-10-13, the evening): all 30 masters again. The 12 condensed cuts and recuts of 07a-10c moved their cue records, and both packs gained rules for the payoff of short bodies (Scoreboard: the DROP's range lift, the hit at P's level, the band guard's 2 kHz floor and step, `B8_K`; Becker Rig: the payoff stack, the P ding with the hit, the landing, the card's minimum; BIBLE §4.7, §6.7 items 7-8) and were refit (§11.2), which moves every master of both looks. Every AAC stream changed, so all 30 MP4s changed; each video stream is bit-identical to its source (the 12 reviewed renders of 07a-10c and, for the other 18, the previous files). The shipped masters are byte-identical to the sound designers' final builds.
- **To ship a later change** (BIBLE.md §11.5): build into /tmp with `sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4 --score --wav --stems`, run `verify --from /tmp/sound/mp4 --strict-cues`, copy the MP4s into `renders/channel/`, then record the masters with `verify --from /tmp/sound/mp4 --write-baseline test/fixtures/sound-baseline.sha256`. That reuses the build (2.1 GB before the condensed cuts; 1.2 GB for v2.5's, most of it stems); `npm run sound:baseline` would build everything again (about 4.2 GB of temp space at the peak). `--out` cannot be the `--video` directory, even with `--final`: ffmpeg refuses to write a file it is reading ("same as Input #0"). A teaser with a re-rendered picture goes in through a `--video` folder that holds its new render (§11.5).
- `--expect-identical` makes a difference a failure: use it when a change must not touch the audio.
- After an intended change, `npm run sound:baseline` re-verifies (a full build) and rewrites the file; `verify --from <dir> --write-baseline <file>` does it on a build you have. Either writes only if everything passes.

**Pending bible sync.** Where today's passing practice differs from the bible's text, the entry carries `pending: { bibleSays, passesNow, reason, sync, see }`. The bible owner syncs §9 (or changes a pack), then removes the marker.
- **Synced in bible v2 (2026-10-12).** Seven values passed under bible v1 but differed from its text. They are now the bible's text, their markers are gone, and each entry keeps a `note` with the reason:
  - A5: the engine's encode loop enforces PLR ≤ 13 (§8.6 step 9).
  - The Scoreboard 31.5 Hz band at −20..+3 (§9.2).
  - Scoreboard B1: the returns stem at about −6 LU is part of the target (§8.1).
  - Becker B1: the three-part B1 (§8.1); v1's bands are reported as B1w (§9.7).
  - Scoreboard B3: card cues are exempt under the sting (§9.3).
  - Becker B5: the 2 ms energy-rise onset (§9.3).
  - S8: velocity SD gated for Becker only, merges exempt from "on the grid" (§9.4).
- **Still pending: A8**, found during the sync. Becker Rig's mean L/R correlation (0.87-0.92) is over the bible's 0.45-0.85 target. The target is not gated; the gate (≥ 0.30) holds. Whether to widen the pack or the target is the owner's decision, so the marker stays until then. `test/acceptance.test.mjs` tests `pending()` on a synthetic file, so removing the last marker needs no test change; `verify` then prints `pending bible sync: none`.

**Runtime** (4 workers, this container): the build takes about 245 s for all 30. The checks take about 80 s more: Becker's MALLET and per-teaser U3/U4 re-render instruments and cues. `--from` skips the build.

**Adding or changing a check.**
1. Put its thresholds under its ID in `acceptance.json`, with `bible`, `name` and `on`.
2. Implement it as `(ctx, lim) => ({ pass, detail, value? })` in the module for its scope:
   - `delivery.mjs`, `stems.mjs` or `score.mjs` for every look;
   - `looks/<look>.mjs` `checks` for one look;
   - `units()` for a pack unit check.
3. `ctx` (`context.mjs`) loads the report, score, master WAV, decoded delivery, stems, cue record and pack lazily. Shared measurements are in `measure.mjs`.
4. `test/acceptance.test.mjs` fails if a threshold has no check.

| File | What it holds |
|---|---|
| `checks/acceptance.mjs` | `limits(id, look)`, `gated`, `pending`: the resolver over `acceptance.json` |
| `checks/delivery.mjs` | A1-A14, BANDS, HARSH (the decoded AAC or muxed MP4, the report) |
| `checks/stems.mjs` | B1, B1w, B3-B9 (stems, report, delivery) |
| `checks/score.mjs` | S1-S14, B2, B10 on the score (also what the audit runs) |
| `checks/looks/scoreboard.mjs` | TRAIN, DUCK; units U1-U4, LOGO (folded in from the pack's old `verify.mjs` and `units.mjs`) |
| `checks/looks/becker-rig.mjs` | MALLET, FLAMS, INFO (the critic's reported measurements); units U1-U4 (folded in from the fixer's `check.mjs`, `fixcheck.mjs`, `ucheck.mjs`); `instrumentBuses`, shared with the pack's calibration tools |
| `checks/measure.mjs` | Shared measurements: windowed power, series lookups, ungated loudness, band-pass, FFT, the two onset measures, the score grids |
| `checks/context.mjs`, `run.mjs`, `worker.mjs`, `baseline.mjs` | The per-spec context and the two output layouts, the run and its report, the worker pool, the sha256 file |

### Fitted values and cue drift

BIBLE.md §11 is the maintainer's procedure: the cue-drift guard and what to do when it fires, the refits, `verify`, determinism, and rebuilding the audio onto the finished videos. In short:

Both packs carry values fitted on the 30 cue lists of `test/fixtures/cues.json`:
- Scoreboard: `calibration.json` (BEDS, M_FIT, GM, GM_PLAN, LOGO_PRE, OPEN_FIT).
- Becker Rig: `balance.mjs` `MODEL`.

The bible's §2.3 tempo table (the tempo-map test vectors), Appendix A and a few values pinned in `test/sound.test.mjs` are computed from the same records.

A kit, spec or brand change that moves a cue leaves the fitted values describing a teaser that no longer exists. Nothing in the audio fails loudly: the fader, the sting level and the card trim just drift.
- `test/cues.test.mjs` mounts all 30 specs (about 10 s; `node --test test/cues.test.mjs` runs it alone, `SOUND_SKIP_CUE_DRIFT=1` skips it locally). It names each spec whose record changed, with the look's refit doc, and fails when a spec has no record.
- `verify` prints the same lines in a `CUE DRIFT` block (`--strict-cues` makes them a failure), and `render`, `audio`, `sound` and `cues` print them as `!` warnings.

When it fires (BIBLE.md §11.1):
1. Refit the look on a fresh dump of the records. The procedures are in `looks/scoreboard/sound/tools/README.md` and `looks/becker-rig/sound/tools/README.md`, with each value's derivation, the commands and the state measured on 2026-10-12.
2. Run `verify`.
3. Store the new records: `node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json`.
4. Regenerate the tempo-map vectors: `node sound/tools/tempo-table.mjs --write`. It runs Appendix B (python3) on the stored records, stops if the engine disagrees with it, and rewrites the §2.3 rows that moved. The test reads them from the bible, so there is no other copy.
5. If 09c, 09b, 10a, 10b or 02a moved, update Appendix A and the values the test pins by hand (the tool prints them).
6. Run `npm test`, record the change in the bible's status block, then ship (§11.5).

### Pack conventions the checks see

**The react bus (`bus: 'react'`).** The packs put the music's answers to the cues there, so the cue does not duck them away (see [The react bus](#the-react-bus-bus-react) for the contract):
- Scoreboard: the stab at P and V, and the reverse crash into P. The stab is budgeted against the anchor's cues (`clearance.mjs`, which models every event on its `routeOf` route).
- Becker Rig: the `honkR` catch stabs, the `honkR` + `crashR` verdict button, and the fanfare's sustained `honkFR` "TA".

Both set `mix.react = { via: 'logo' }`: besides the duck, these voices skip `musicDb`, the glue, the kick sidechain and the body gate, take `mix.logo`, and send to the un-ducked returns. That is the path the packs were levelled on; until 2026-10-12 they got it by putting the events on `bus: 'logo'`, and the migration kept all 30 masters bit-identical (`verify --expect-identical`).
- The default route (`via: 'music'`) was tried at the same levels (21 of the 30 teasers built, 2026-10-12): no check improved, 03a failed A11 (3.5% of samples limited by more than 1 dB, limit 3%), and the limiter worked harder on 01c (0.7% → 2.7%) and 04c (1.0% → 1.8%). Moving a pack to it means re-levelling its react voices against `musicDb` and the glue, then refitting (each look's `sound/tools/README.md`).
- A react voice is in the `music` and `music.dry` stems, so B3, B5, B6 and B7 count it. It is outside the payoff duck (B2 reads the duck curve, not the audio): budget its level against the cues it answers.
- Becker's `instrumentBuses` (`checks/looks/becker-rig.mjs`, MALLET and the calibration tools) recognises the react voices by their `…R` names and leaves `musicDb` off them, which matches `via: 'logo'`.

#### The AAC first frame

BIBLE.md §8.6 states the encode loop and the first-frame handling as design rules; this section has the implementation details.

A pack can put its hardest hit on t = 0; the engine takes care of the codec. ffmpeg's AAC encoder starts every file with an empty bit reservoir, so the first frame of a hard hit was coded with a fraction of the bits the same hit gets later. It decoded with 12.9 dB SNR over its first 50 ms (05b) and up to about 3 dB over its master peak near 12 ms. Lowering the ceiling there was not monotonic, and the loop fell back to global ceiling steps for the whole teaser. Becker Rig worked around it by playing its t = 0 brass on a separate voice 2 dB under the fanfare (`honkH`).

`ffmpeg.mjs` `encodeAac` now encodes every master behind `AAC_PREROLL` = 3072 samples (64 ms) of digital silence (`adelay`), then drops those frames by stream copy (`-ss`, `-copyts`, `-output_ts_offset`), keeping the last silent packet as the codec's priming packet:
- The silence fills the reservoir, so frame 1 is coded like any later frame. AAC frames do not borrow each other's bits, so dropping packets loses nothing.
- The result has the plain encode's shape: the same packet count, the priming packet at pts −1024 under the usual 1024-sample edit list, and the same duration. `encodeAac` checks that (the kept packets are the pre-roll encode's own, and the durations agree). If the check fails, for example with another ffmpeg whose seek or muxer behaves differently, it uses the plain encode and the report says so (`warnings`, `master.aacPreroll: 0`).
- The pre-roll is 3 frames and 64 ms: a whole number of frames, so only silence is dropped, and a whole number of milliseconds, because with 1024 or 2048 samples ffmpeg sized the last packet 16-32 samples short.
- Measured: 05b's first 50 ms decode at 30.5 dB SNR (12.9 plain). Over the first 30 ms, the 30 teasers decode at most +0.12 dB over their master (+1.30 before). Mux and the decoded MP4 are unchanged (`-c:a copy`, packets md5-identical to the `.m4a`).
- `test/aac.test.mjs` encodes a synthetic full-level hit at t = 0 both ways and checks the shape, the alignment (lag 0) and the first frame's fidelity.

Becker Rig's workaround is gone: its t = 0 brass is `honkF` again, at the fanfare's level. A2 gates the result. The INFO row's `AAC0` reports, per teaser, the decoded true peak over the first 30 ms against the master's, the number of encodes and the final ceiling. A teaser on the global fallback shows there first.

## Tests

`npm test` (`test/sound.test.mjs`) covers:
- the 30 tempo-map vectors (the BIBLE.md §2.3 rows, read from the bible; with python3, Appendix B must print exactly them), the Appendix A sections and energy, trains and overrides. Each failure names the row or value that moved and points to BIBLE.md §11.1
- the logo note times
- DSP units: aliasing (U1-style), ADSR clicks, the SVF −3 dB point and Karplus-Strong tuning
- BS.1770 at −20 LUFS, true peak, limiter ceiling, duck shape and reverb decay
- a synthetic teaser that masters to −14 ± 0.3 LUFS: stereo, bounded, last sample 0, cue onsets within 2 ms, byte-identical across two runs and different for a different id
- all 15 default-pack kinds: within their level, varying between occurrences (U4)
- a remux whose video md5 is unchanged, with AAC stereo 48 kHz at 172-212 kb/s and durations within one frame

`test/acceptance.test.mjs` checks that:
- `acceptance.json` is well formed and resolves per look;
- every threshold is read by a check;
- `pending()` finds markers at the top level and per look (on a synthetic file, so it needs no live marker);
- A1/A2/A5 equal the engine's `TARGET_LUFS`/`DELIVERY_TP`/`PLR_MAX`, and S9 equals `LOOK_DEFAULTS` and each pack's `tempo`;
- the baseline lists every spec.

`test/cues.test.mjs` is the cue-drift guard (above). It shares `cueDrift` with `verify` and the CLI.

`test/routing.test.mjs` checks `routeOf` / `reactSettings` / `busOf`, and renders a one-voice pack through a hit: on `bus: 'music'` the voice ducks more than 8 dB, on `bus: 'react'` it moves less than 0.1 dB; `via: 'logo'` gives stems byte-identical to `bus: 'logo'`; `musicDb` and `sends` follow `mix.react`; a music event on `bus: 'logo'` is warned about.

`test/aac.test.mjs` encodes a full-level hit at t = 0 with and without the pre-roll: same packet count, edit list and duration, decoded at lag 0, and a first frame at least as faithful (see [The AAC first frame](#the-aac-first-frame)).

`test/studio.test.mjs` keeps:
- the legacy `mix()` test
- the render test, which now checks for stereo 48 kHz audio at −14 LUFS
