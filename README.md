# Back of the Envelope: Envelope Math

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
| [`engine/`](engine) | `envelope-engine`, a renderer built for this channel. JSON specs become 1080×1920 MP4s with synthesised foley. See [`engine/README.md`](engine/README.md) |
| [`engine/specs/`](engine/specs) | One spec per teaser (`NN-format-a/b/c.json`) plus the channel trailer (`00-channel-trailer.json`) |
| [`playbook/`](playbook) | Builds the shareable playbook page (research, formats and every teaser video on one page) |

## The ten formats

| # | Format | Series | Teasers |
|---|---|---|---|
| 1 | Cost in Envelopes (unit swap) | Cost in Envelopes | Elon's $1T in Costco hot dogs · the $40T debt stacked in $10K envelopes · $1M in pennies vs the Statue of Liberty |
| 2 | The Rate Clock | Clocked | $50K an hour since year 1 · Apple earns your salary in how many seconds · $1B in 24 hours, per heartbeat |
| 3 | The Read-It Ladder | Day to Decade | a $3-a-day habit · a $1/hr raise · a car payment, per day |
| 4 | Two Envelopes (pick one → crossover) | Two Envelopes | $1M now or $1,000 a week for life · $200/mo at 25 or $400/mo at 35 · $5,000 to sign or $2 more an hour |
| 5 | The Envelope Split | Envelope My Paycheck | the median paycheck's emergency envelope · $7.25/hr vs the iPhone 18 Pro · a nurse vs the median home |
| 6 | Same Pile, Different Place | Same Pile | $1,000 of pay in 6 countries · $1,000 cash across 6 decades · $1M across 6 jobs |
| 7 | The Sealed-Envelope Estimate | Sealed Answer | Fry's 93¢ after 1,000 years · the 100 Envelope Challenge · the Eras Tour gross |
| 8 | The Trap Card | Envelope Puzzle | $2,500 every 2 weeks ≠ $60K · −57% ≠ +57% back · 32→28 oz ≠ +12.5% |
| 9 | The Itemized Tally | Itemized | a 2006 grocery receipt · your $10 at Chipotle · a $2 Powerball ticket |
| 10 | The Envelope Audit | Envelope Audit | the "write off your chef" claim · the minimum-payment claim · "a 1% fee eats a third" |

## Render everything

```bash
cd engine
npm install
npm test               # engine tests
npm run check          # lint every teaser spec (safe zones, legibility, overlaps, captions)
npm run render         # MP4s → engine/out/
python3 ../playbook/build.py   # playbook page → playbook/dist/
```

Real-world figures are sourced and dated (October 2026) in each teaser's write-up. Re-run that
teaser's math check with fresh inputs before posting. Educational math, not financial advice.
