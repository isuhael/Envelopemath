# Back of the Envelope

Research, formats, teasers and a renderer for **Back of the Envelope**, a faceless finance-maths short-form channel (YouTube Shorts, Instagram Reels, TikTok).

## Round 2 (current)

Round 1's kraft-envelope look and its hooks were rejected, and its research sampled the wrong channels. Round 2 starts from channels whose shorts are finance maths at the core.

The teasers were first built in four looks. Two were kept, **Scoreboard** and **Becker Rig**, and the 14 teasers made in Clean Sheet or Live Sheet were rebuilt in them, so every format now has both looks (15 teasers each).

| Path | What it is |
|---|---|
| [`renders/v3/`](renders/v3) | **The 30 finished teasers as MP4s, in Scoreboard and Becker Rig** (1080×1920, 13-46 s). Open a file on GitHub and use *Download raw file*. Audio is the sound-effect track only; captions show the guide voice-over. [`renders/v2/`](renders/v2) keeps the earlier four-look set |
| [`research/v2/`](research/v2) | Channel-first research: the finance-maths-core channel list (`01`), the hook bank with rules R1-R12 and patterns P1-P9 (`02`), the look directions (`03`), the ten formats ranked by benchmark evidence (`04`), and scene-by-scene watch notes per benchmark channel plus Alan Becker |
| [`teasers/v2/`](teasers/v2) | One write-up per format: three teasers each, with hook, beat sheet, guide VO, every number's maths, sources, captions and the review logs (verification, blind hook judging, assembly QA). `checks/` holds a Python math check per format that recomputes every on-screen number and compares it with the specs. `teasers.json` is the index |
| [`studio/`](studio) | The round-2 renderer: HTML/CSS look kits driven by JSON specs (Scoreboard and Becker Rig in use, each with all ten formats; Clean Sheet and Live Sheet kept but retired, their old specs in `specs/retired/`), seeked frame by frame in Chromium and encoded with ffmpeg, plus a linter for safe zones, type size, overlaps, contrast and the frame-1 number rule. See [`studio/README.md`](studio/README.md) and the spec contract [`studio/FORMATS.md`](studio/FORMATS.md) |
| [`playbook/v2/`](playbook/v2) | Builds the review page (every teaser, filterable by look and format): `python3 playbook/v2/build.py` |

The ten formats, three teasers each, every format in both looks: N dead simple numbers · find-your-row table · "what difference does X make?" · same-stake chart race · split sheet · POV spend-vs-own race · "2 people invest" ledger duel · cost in units of X · year-by-year growth ladder · real-time cost counter.

```bash
cd studio && npm install && npm test
node src/cli.mjs check specs/*.json                 # lint every teaser
node src/cli.mjs render specs/01a-*.json            # one MP4 → studio/out/ (or --all)
for f in ../teasers/v2/checks/*.py; do python3 $f; done   # every math check
```

Real-world figures are sourced and dated (October 2026) in each write-up. Re-run a format's math check with fresh inputs before posting. Educational maths, not financial advice.

---

## Round 1 (archived)

Research, formats, teasers and a renderer for **Back of the Envelope**, a faceless finance
short-form channel (YouTube Shorts, Instagram Reels, TikTok). Its format brand is **Envelope Math**:
rough-but-right money math in at most three handwritten lines on the back of a manila envelope,
then a sealed answer and a stamped verdict. *Rough math. Real money.*

## What's here

| Path | What it is |
|---|---|
| [`research/01-viral-finance-shorts-research.md`](research/01-viral-finance-shorts-research.md) | Research report covering what makes finance and finance-math shorts go viral. It includes the method, the top examples, cross-cutting principles, platform mechanics and policy, trends, and the gap we can own |
| [`research/02-top-10-approaches.md`](research/02-top-10-approaches.md) | Ranked shortlist of the 10 formats to replicate, with evidence, beat-by-beat anatomy, hook formulas and pitfalls ([`top-10.json`](research/top-10.json) is the machine-readable version) |
| [`research/raw/`](research/raw), [`research/watch/`](research/watch) | Raw sweeps: vidIQ outliers (YouTube Shorts, IG Reels, TikTok), creator catalogues, web research, and 22 scene-by-scene breakdowns of viral originals |
| [`brand/envelope-math-format-bible.md`](brand/envelope-math-format-bible.md) | The rules every video follows: non-negotiables, envelope devices, stamp lexicon, sound, length lanes, layout |
| [`teasers/NN-*.md`](teasers) | One write-up per format. Each covers why it goes viral, how the originals do it, the Envelope Math upgrade, and **3 production-ready teasers**. Every teaser has a hook, beat sheet, voice-over, envelope math, sources, pinned comment, description and platform notes, plus a python math check, a final fact-check table and review logs |
| [`teasers/teasers.json`](teasers/teasers.json) | Slate index of every teaser, with its title, hook, runtime, key numbers and review status |
| `engine/out/final/` (not in git) | The rendered MP4s. Rebuild them with `cd engine && npm run render` |
| [`engine/`](engine) | `envelope-engine`, a renderer built for this channel. JSON specs become 1080×1920 MP4s with synthesised foley. See [`engine/README.md`](engine/README.md) |
| [`engine/specs/`](engine/specs) | One spec per teaser (`NN-format-a/b/c.json`) plus the channel trailer (`00-channel-trailer.json`) |
| [`playbook/`](playbook) | Builds the shareable playbook page (research, formats and every teaser video on one page) |

## The ten formats

| # | Format | Series | Teasers |
|---|---|---|---|
| 1 | Cost in Envelopes (unit swap) | Cost in Envelopes | Elon's $1T in Costco hot dogs · the $40T debt stacked in $10K envelopes · $1M in pennies vs the Statue of Liberty (a photo finish) |
| 2 | The Rate Clock | Clocked | $50K an hour since year 1, still no $1T · Apple makes your $65K salary in how many seconds · spend $1B in 24 hours, per heartbeat |
| 3 | The Read-It Ladder | Day to Decade | a $3-a-day habit, for 10 years · a $1/hr raise is "only" $8 a day · the average $787/mo new-car payment, for 10 years |
| 4 | Two Envelopes (pick one → crossover) | Two Envelopes | $1M now or $1,000 a week for life · $200/mo at 25 or $400/mo at 35 · $5,000 to sign or $2 more an hour |
| 5 | The Envelope Split | Envelope My Paycheck | the median paycheck's emergency envelope · $7.25/hr vs the iPhone 18 Pro · a nurse vs the median home |
| 6 | Same Pile, Different Place | Same Pile | $1,000 of pay in 6 countries · $1,000 cash across 6 decades · $1M across 6 jobs |
| 7 | The Sealed-Envelope Estimate | Sealed Answer | Fry's 93¢ after 1,000 years · the 100 Envelope Challenge · the Eras Tour gross |
| 8 | The Trap Card | Envelope Puzzle | $2,500 every 2 weeks ≠ $60K · −57% ≠ +57% back · 32→28 oz ≠ +12.5% |
| 9 | The Itemized Tally | Itemized | 6 groceries for $11.39 in 2006 · your $10 at Chipotle: how much is profit · what a $2 Powerball ticket is worth |
| 10 | The Envelope Audit | Envelope Audit | "write off your $100-a-night chef" · "pay the minimum on $5,000 for 20 years" · "a 1% fee eats a third of your retirement" |

## Render everything

```bash
cd engine
npm install
npm test               # engine tests
npm run check          # lint every teaser spec (safe zones, legibility, overlaps, captions)
npm run render         # MP4s → engine/out/ (the playbook reads engine/out/final/)
python3 ../playbook/build.py   # playbook page → playbook/dist/
```

Real-world figures are sourced and dated (October 2026) in each teaser's write-up. Re-run that
teaser's math check with fresh inputs before posting. Educational math, not financial advice.
