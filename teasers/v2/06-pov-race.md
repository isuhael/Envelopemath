# Format 6: POV spend-vs-own race (pattern P6)

**Teasers:** 06a Scoreboard (Apple / first iPhone), 06b Scoreboard (Netflix bill / Netflix stock; ported from Live Sheet on 2026-10-08), 06c Becker Rig (latte / Starbucks stock)
**Date:** 2026-10-07; hook pass 2026-10-08 (06b and 06c kept); hook pass 2 2026-10-08 (06b's hook replaced); 06b ported to Scoreboard 2026-10-08; 06c condensed cut 2026-10-12 (promoted and shipped the same day; its opening hold fixed in the kit and re-shipped the same day); 06b condensed cut 2026-10-12 (its QA fix pass, promotion and ship the same day); 06a condensed cut 2026-10-13 (its QA fix pass, its promotion into `studio/specs/` and its ship the same day) · **Writer:** format 6 (revised after review, see the Review log at the end) · **Specs:** `studio/specs/06a-scoreboard-first-iphone-apple.json` (06a's condensed cut since 2026-10-13, promoted from `studio/specs-wip/`; the 26.5 s round-2 cut is in git history, and its render is in git at 471c793), `06b-scoreboard-netflix-bill.json` (06b's condensed cut since 2026-10-12; the 30.5 s Scoreboard cut is in git history, and the Live Sheet spec is in `studio/specs/retired/`), `06c-becker-rig-latte-starbucks.json` (06c's condensed cut since 2026-10-12; the 28.0 s round-2 cut is in git history)
**Check:** `python3 teasers/v2/checks/06-pov-race.py`. It recomputes every on-screen and spoken number, cross-checks the source tables, and asserts the specs match, including VO pacing in spoken words (numbers read out in full) and the motion/payoff timing of the hook. Current result (2026-10-13, after 06a's condensed cut was promoted): 468 checks, 0 failed on `studio/specs/`, and 446, 0 failed with `--spec` on a git-history copy of 06a's 26.5 s cut (`git show 4fb0b00^:studio/specs/06a-scoreboard-first-iphone-apple.json`). Before the promotion: 446 checks, 0 failed on `studio/specs/`, and 468, 0 failed with `--spec studio/specs-wip/06a-scoreboard-first-iphone-apple.json`. 06c, 06b and 06a are each checked against their condensed cut's expectations, which `studio/specs/` must hold (06a's: `A_IN_SPECS`, "a" since the promotion). The retired cuts' sets (06c's 28.0 s, 06b's 30.5 s, 06a's 26.5 s) are kept as references for a git-history copy passed with `--spec` (06b's: 443 checks, 0 failed).

---

## (a) The format in 5 lines

1. **Mechanic.** "POV: you invested in [company] instead of paying $[one small price] for [its own product]". The spend line holds the money that is gone. The own line is the same money in that company's stock, running to a dated final value. The hook carries one input and never the result, and neither does the caption (it overlays the video from frame 1 on TikTok and Reels).
2. **Evidence: @investment_timeline.** All 5 of its known posts are outliers, 9.53M views in total:
   - [GoPro $400](https://www.tiktok.com/@investment_timeline/video/7680106550278556961): 5.1M (22.6x).
   - [Crocs $50](https://www.tiktok.com/@investment_timeline/video/7676037874105519393): 1.9M (117.9x).
   - [Monster $3/day](https://www.tiktok.com/@investment_timeline/video/7671760671867997473): 1.5M (140.6x).
   - [GeForce 256 $599](https://www.tiktok.com/@investment_timeline/video/7671180194241170720): 650.5K (62.5x).
   - Smallest: [NVIDIA vs $3/day coffee](https://www.tiktok.com/@investment_timeline/video/7666855093882375457), 379.9K (29.0x). It is the only post where the product isn't the company's own.
3. **Header grammar: ChartOrbit.** Its biggest shorts use the same second-person header, and open with the chart already moving and already in the red:
   - "POV: In 2002 You invested $5000 in…": [15,876,376 (100.45x)](https://www.youtube.com/shorts/KmtLGAPIutg).
   - "POV: Since 1996 you invested $100/month in … and never sold": [1,391,731 (5.91x)](https://www.youtube.com/shorts/2cF446rExhY). Its grey "Investment" line is the only working ChartOrbit ever shows.
4. **Rules.** Keep the same-brand pairing, the operative verb "instead of paying", one small input and a hidden result; honest losses and "meh" results count too, since GoPro, a decline, is the biggest post. Add three things: the spend line beside the value line, a last-second envelope line (multiple or doublings), and a footer with the dates and the dividend choice. The race is already moving by 0.5 s and the first year-end lands by about 2 s.
5. **Risks.** None of the 5 @investment_timeline videos could be watched (all 7 watch jobs failed), and n = 5, so viability is 6. Their posts are 60 s; ours sit in the 18-35 s lane (26.5 / 30.5 / 28.0 s). 06c's condensed cut (2026-10-12) is shorter: a 15.7 s body plus the 2.5 s end card (18.2 s). So is 06b's (2026-10-12, shipped the same day): an 18.3 s body plus the card (20.8 s). And 06a's (2026-10-13, promoted the same day): a 15.3 s body plus the card (17.8 s), down from 29.0 s.

### Where the teasers depart from the seeds (inside the lane)

| Seed | What we made | Why |
|---|---|---|
| 06a "every new base iPhone since 2007" | **One purchase: the $499 first iPhone, on launch day** | **Pricing.** From 2008 to 2015 Apple quoted US prices as "$199 with a two-year contract". A per-year spend line would need an unsubsidised price for every model, and that ran past the search budget. Using $199 would understate spend.<br>**Evidence.** The one-off-purchase variant (GoPro, Crocs, GeForce 256) carries 3 of @investment_timeline's 5 posts and 7.65M of its 9.53M views. "$499 for the first iPhone" is one famous, primary-sourced number. |
| 06b "Netflix plan since a sourced year" | **Since 2012** (the plan is $7.99 in every source) | **Price.** One source lists the standalone $7.99 streaming plan from July 2011.<br>**Stock data.** NFLX fell about 60% in late 2011, so half a year bought at the 2011 average price would be wrong. 2012 is the first clean full year. |
| 06b hook (hook pass 2) | **The header asks a question in today's bill:** "$19.99 Netflix, free for how many years, if your 2012-25 bills bought its stock?" | The old P6 header ("…instead of paying Netflix, ever since it was $7.99") averaged 6.0 with both judges. Its only $ figure was a 2012 price nobody pays now. The question, in the viewer's own current bill, averaged 7.5. The race, its maths and the same-brand pairing are unchanged; only the unit of the answer is new (P8 re-pricing on top of P6). The P6 verb "instead of paying" is dropped, and the judges docked it for that. |
| 06c "a sourced latte price, since a sourced year" | **A round $4/day since 2014** | Only one dataset for Starbucks latte prices turned up: FinanceBuzz, republished by Visual Capitalist (grande latte $3.65 in 2014, $4.45 in 2024). A second, independent source for a precise price was not found (2 searches). The stake is therefore a round $4 inside that bracket, and the claim on screen is "$4 ≈ a grande latte", not a precise menu price. |

**One end date for all three: the 12/31/2025 close.** The search's 2026 Netflix row was a stale January snapshot, and Apple's 2026 close had no date. Rather than mix dates, every race ends on a historically exact year-end. Each pinned comment states that date and the closing price used, because all three stocks have moved since (today is 2026-10-07). 06a's footer also carries it.

---

## (b) 06a: Scoreboard, "the first iPhone vs Apple stock"

**Look:** Scoreboard: black bars, a dark stage with a grid, neon green `#2BFF88` for the own line, white for the spend line, Anton type. Race mode: tip counters (the stock counter turns coral while it is under the $499), a year counter, and the footer as the working line.
**Platform title (YouTube):** "What If You Invested $499 in Apple Instead of the First iPhone?" The title asks, and the screen says POV (ChartOrbit's split, R11).
**On-screen hook (header):** `POV: IN 2007 YOU INVESTED IN APPLE / INSTEAD OF PAYING **$499** / FOR THE FIRST IPHONE` (15 words, 3 lines; the start year is ChartOrbit's "POV: In 2002 You invested…" stake)
**Footer (assumptions, at t = 0):** `6/29/07 close → 12/31/25 · dividends reinvested`

**Modelled on:**
- H46 "POV: You invested in NVIDIA instead of paying $599 for a GeForce 256": 650.5K (62.5x). This is the exact grammar: an iconic first-generation product and its launch price.
- H43 "POV: You invested in GoPro instead of paying $400 for a GoPro": 5.1M (22.6x).
- H44 "POV: You invested in Crocs instead of paying $50 for a pair of Crocs": 1.9M (117.9x).
- H16/H17 ChartOrbit frame 1: "POV: In 2002 You invested $5000 in", counters already below the stake at 0.0 s (open in the red). Title: H16 "What If You Invested $5,000 in NETFLIX and DISNEY?", 15,876,376 (100.45x).

**Hook rules it satisfies:**
- **R1:** "$499" is in the header, and both tip counters sit at $499 on frame 1.
- **R2:** one input, no result, in the header, the title and the caption.
- **R3:** partly. $499 is a price people paid or remember, not one most viewers paid. The pinned comment asks "what was your first iPhone?" so viewers swap in their own.
- **R4:** small and familiar.
- **R5:** "Launch day 2007" are the first words of the hook caption, complete on frame 1 (see the wrong belief below), and the chart opens in the red: the green tip falls through $499 at 1.14 s in the condensed cut (2.15 s in the 26.5 s cut).
- **R6:** you + $499 + 2007, all in the header, and all in the first caption ("Launch day 2007: you skip the $499 iPhone and buy Apple stock.").
- **R7:** phone vs stock, both named.
- **R8:** 15 words.
- **R9:** the year axis to 2025 is the countable loop.
- **R10:** in the condensed cut the start dot pings from frame 2, the phone falls onto the line from 0.1 s and lands at 0.31 s as the lines leave the start, and the first payoff ($809 at the end of 2007) lands at 0.66 s (0.84 and 1.40 s in the 26.5 s cut); the biggest number is last.
- **R11:** the title asks, the screen says POV, and the caption takes a side without a number.
- **R12:** "≈ 74×" is a single repeatable number.

**Wrong belief it exploits (R5):** "By launch day it was too late. Everyone knew the iPhone, so it was priced in." The buy is at the close on launch day itself, the most hyped day there was, and the first thing the stock does is crash below $499 in 2008. It still comes to ≈ 74×.

### Beat sheet (condensed cut after its fix pass, 2026-10-13: chart clock x 2007 → 2025.99 over t −0.04 → 12.8 s on `lookOpts.clockKnots`: ≈ 0.71 s per year, with the flat 2015 (x 2015.1-2016.5, t 5.70-6.26) at 0.40 s per year and the flat 2018 (x 2018.05-2018.95, t 7.36-7.81) at 0.50; verdict at 13.7 s; body 15.3 s + the 2.5 s end card = 17.8 s)

Spec: `studio/specs/06a-scoreboard-first-iphone-apple.json` (promoted 2026-10-13 from `studio/specs-wip/06a-scoreboard-first-iphone-apple.json`, and shipped the same day). It condenses the 26.5 s round-2 cut (race 0.3 → 21.4 s at ≈ 1.11 s per year, verdict 22.0 s, held 4.5 s; 29.0 s with the card), whose beat sheet and guide VO script are in git history (3db6d30 and earlier). Every string, number, caption and cue role is the 26.5 s cut's; only the clock moved. Two Scoreboard pov-race options are new and opt-in, both set in this spec only: `clockKnots` (the bent clock) and `startPing` (the start dot pings from frame 2). The Review log ("Condensed cut (2026-10-13): 06a" and its fix pass) lists every change.

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Frame 1, the thumbnail. Header. Both counters at **$499**. Both tips parked on the start point of the empty 2007-2025 axis. Year clock "2007". Footer `6/29/07 close → 12/31/25 · dividends reinvested`. The hook caption is already complete (pre-typed from t −0.4; "Launch day 2007:" lit, the rest lighting word by word). The race clock has been running since −0.04 s, but the lines start on launch day (x 2007.49). | "Launch day 2007: you skip the $499 iPhone and buy Apple stock." (−0.4-3.24, complete on frame 1) |
| 0.03-0.30 | The start dot pings: a neon ring swells out of it from frame 2 (r 11 → 48 px) and fades by 0.3 s. Meanwhile the phone icon falls onto the white line (whoosh, 0.07; first visible at 0.1 s, frame 4) and lands just left of the start point at 0.31 (pop; the SPENT counter bumps and flushes coral). The lines leave the start point. No chart tag: the header, both counters and the board's phone glyph already say $499 / iPhone. | |
| 0.66 | End of 2007: green tip **$809**, the first payoff, under the year clock's "2007". | |
| 1.14-1.58 | Open in the red: the green line falls through the white line (1.14, swipe) to **$348** at the end of 2008 (thud, 1.37; the counter turns coral; the clock reads "2008"), then is back above $499 at 1.58 (swipe). | |
| 2.08-3.50 | The climb back: $862 (2009), $1,319 (2010), $1,655 (2011); the axis rescales up. | |
| 3.29 | End of 2012 at 4.20: **$2,196** (tick), 0.91 s after the caption goes up. Then 2013 $2,372 (4.91) and 2014 $3,336 (5.62). | "2012: about $2,200. You just hold." (3.29-6.01) |
| 5.70-6.26 | The flat 2015 runs fast (0.40 s per year): $3,336 → $3,236 (the close at 6.06, where the clock rolls to "2016" as the next caption goes up). The "$499 / SPENT" tag fades in on the white line's right end at about 6.2 s (it rides there to about 8.65). | |
| 6.06 | 2016 close $3,639 (6.61). The stake passes 10× ($4,990) at 7.15; end of 2017 at 7.32: **$5,403** (tick). Then the flat 2018 runs fast (0.50 s per year, 7.36-7.81): the 2018 close $5,112 at 7.84. | "2017: over 10 times. The phone's long gone." (6.06-7.99) |
| 8.04 | 2019 close $9,660 (8.55); the green tip passes **$10,000** at 8.58 (ding; the clock has just rolled to "2020"). 2020 close $17,611 (9.26). | "2020: it passes $10,000." (8.04-9.71) |
| 9.76 | End of 2021 **$23,713** (9.96, the peak) → end of 2022 **$17,451** (10.67; the clock reads "2022"); 2023 close $26,004 (11.38). | "2022 knocks off a quarter." (9.76-11.59) |
| 11.64 | 2024 close $33,989 (12.09); the "$499 / SPENT" tag is back by 12.3 s. Riser from 10.4. Final **≈ $37,000** at 12.8 (hit, cash; the board's IN STOCK side bumps and glows, the tag bumps with it). Footer step: `≈ 136.7 shares × $271.12 (12/31/25 close)`. | "2025: about $37,000." (11.64-13.7: the caption covers the plot's squeeze) |
| 13.7 | **The verdict, 0.9 s after the reveal:** the plot squeezes up (13.4-13.7) and the verdict lands under it, in the band over the stage foot (reveal); the header keeps the hook: **≈ 74×** your $499. / 2× every **≈ 3 yrs**. | "About 74 times. It doubled about every 3 years." (13.7-14.9) |
| 13.7-15.3 | Verdict hold: 1.6 s from the verdict to the card. | |
| 15.3-17.8 | End card (unchanged): "Follow for the math behind your money", "shown, not hand-waved.", @envelopemath. | |

The year clock rolls to the next year one frame after each Dec-31 close (x = y + 0.992), so every close lands under its own year and a beat a few days into the new year (the $10,000 crossing at x 2020.03) is never caught mid-roll.

**Why the clock bends.** At one pace the flat years (2015: −3%; 2018: −5%) left only the green tip creeping about 1.6 px a frame and a counter ticking, near-still for 0.73 s and about 0.45 s with the caption band left out (QA, 2026-10-13). `lookOpts.clockKnots` runs those two stretches fast and every other year at the same ≈ 0.71 s; no fast stretch holds a beat (a cue, a captioned figure or a line crossing). The 2008 dip stays at the plain pace: slowing it by 0.19 s (a QA nit) made its trough a 0.27 s still run (see the fix pass). The time the flat years give back ends the race 0.6 s sooner.

The 2008 dip plays under the hook caption on purpose: it is a picture beat (the mute test), not a captioned one, so no caption has to race it.

**Why the race starts at −0.04 s.** The kit stands a purchase that the race reaches in its first 0.3 s on the line at frame 1, and its lines start only at the launch-day point (x 2007.49). With the race starting at −0.04, it reaches launch day at 0.307 s: frame 1 is the clean cover (both counters at $499, the phone not yet on the line), and the phone's 0.24 s fall starts at 0.067 (first visible at frame 4, 0.1 s). The start dot's ping (`lookOpts.startPing`) moves from frame 2, as 06b's ticket and 06c's heft do, without touching frame 1 or the cover. Because the kit cues its race-start whoosh only when `raceT[0]` is over 0.05 s, the spec carries that whoosh itself, on the phone's fall (same kind, length and gain as the kit's).

### Captions (on-screen text, no narration; 47 words, all shown)

> Launch day 2007: you skip the $499 iPhone and buy Apple stock. · 2012: about $2,200. You just hold. · 2017: over 10 times. The phone's long gone. · 2020: it passes $10,000. · 2022 knocks off a quarter. · 2025: about $37,000. · About 74 times. It doubled about every 3 years.

The wording is the 26.5 s cut's guide VO script, word for word; only the timing changed. Pacing is for reading, not speaking: each caption is up for at least max(1.2 s, 0.12 s per word) from frame 1, and they run back to back (0.05 s gaps). Each caption that names a figure goes up 0.2-1.2 s before the race reaches it (2012 close 0.91 s, the 10× crossing 1.09 s, the $10,000 crossing 0.54 s, the 2021 peak 0.20 s, the final 1.16 s; the 26.5 s cut led "2017: over 10 times" by 2.7 s, the first condensed render by 1.45 s) and comes down at most 1.81 s after it ("2012: about $2,200. You just hold." covers the holding years 2013-2015), and its beat lands inside it. The caption boundaries sit on fixed chart years (x 2011.7, 2016.0, 2019.27, 2021.7, 2024.35); the 2016.0 one falls inside the fast 2015 stretch, as the clock turns "2016". The JSON glues "Apple stock", "about $2,200", "just hold", "over 10", "long gone" and "about $37,000" with no-break spaces (`\u00a0`) so the Scoreboard captions never orphan a word or split "about" from its number. The Scoreboard sets the last line under the verdict (the 26.5 s cut did too).

### The maths (every on-screen number)

| On screen | Formula | Inputs |
|---|---|---|
| $499 (header, both counters, the spend line's "$499 / SPENT" tag, VO) | input | Apple's 4GB price at launch (`spend.final` "$499 spent" gives the tag its word) |
| 2007.49 (purchase x) | 2007 + (day 180 − 1) ÷ 365 | June 29, 2007 |
| Launch-day buy price $3.65 (adjusted) | 5.92 × 122.04 ÷ 198.08 = 3.6474 → $3.65 | StatMuse's adjusted 2007 close ($5.92) × the raw launch-day close ($122.04) ÷ the raw 2007 close ($198.08). Apple paid no dividend and did no split between those two dates, so this ratio carries the launch day onto any adjusted basis. Working back from the 2012 close less that year's two dividends gives $3.6505 (verifier); both round to $3.65. StatMuse's own launch-day figure, $3.66, is 0.3% off its own $5.92 on the raw ratio (more than the 2-decimal rounding of either), so it is used only as a cross-check. |
| Shares ≈ 136.71 (adjusted) | $499 ÷ 3.65 | |
| Year-end values, 2007-2011 | 136.71 × Macrotrends close × (5.92 ÷ 5.97) | The search returned the 2007-2011 rows on an older adjustment basis. StatMuse's 2007 close ($5.92) bridges it. The 2012 % change confirms the bridge: 32.64% computed vs 32.57% listed. |
| Year-end values, 2012-2025 | 136.71 × Macrotrends close | |
| $809 / $348 / $862 / $1,319 / $1,655 | year ends 2007-2011 | closes 5.92, 2.5485, 6.3067, 9.6485, 12.1077 (bridged) |
| $2,196 … $37,065 | year ends 2012-2025 | 16.06, 17.35, 24.40, 23.67, 26.62, 39.52, 37.39, 70.66, 128.82, 173.45, 127.65, 190.21, 248.62, 271.12 |
| Dips below $499 in 2008 | linear crossing between the 2007 ($809.34) and 2008 ($348.41) points at x 2008.66 (t 1.14 in the condensed cut; 2.15 in the 26.5 s cut) | |
| "2012: about $2,200" (VO) | 136.71 × $16.06 = $2,195.60, to 2 significant figures | the 2012 close, at t 4.20 (6.96 in the 26.5 s cut) |
| "2017: over 10 times" (VO) | 136.71 × $39.52 = $5,402.87; ÷ $499 = 10.83 (the check asserts 10-11) | the 2017 close, at t 7.32 (12.51 in the 26.5 s cut); the stake passes 10× ($4,990) at x 2017.76, t 7.15 |
| Passes $10,000 in 2020 | crossing between $9,660 (2019) and $17,611 (2020) at x 2020.03 (t 8.58 in the condensed cut; 14.78 in the 26.5 s cut) | |
| "a quarter" (2022) | 1 − 127.65 ÷ 173.45 = 26.4% | |
| ≈ $37,000 / "about $37,000" | $37,065.45, rounded to the nearest $1,000 (2 significant figures). At 3 significant figures it would read ≈ $37,100; the round thousand is the figure a viewer can say in one breath, and the pinned comment gives $37,062 / $37,065. | Cross-check from StatMuse alone: $499 × 271.36 ÷ 3.66 = $36,997 (0.18% apart) |
| ≈ 74× | $37,065.45 ÷ $499 = 74.28 | |
| `≈ 136.7 shares × $271.12 (12/31/25 close)` (footer step at the finish) | 136.7 × 271.12 = $37,062, which rounds to the counter's ≈ $37,000 (the check asserts it). It shows the working the screen does not show elsewhere; round 1's `$499 × 74.3 ≈ $37,000` repeated the counter and the verdict | 499 ÷ 3.65 = 136.712 shares |
| 2× every ≈ 3 yrs | log₂ 74.28 = 6.21 doublings; 18.51 years (6/29/2007 → 12/31/2025) ÷ 6.21 = 2.98 | |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| $499, 4GB, on sale June 29, 2007 (6 p.m.) | Apple Newsroom, "iPhone Premieres This Friday Night at Apple Retail Stores", 2007-06-28, https://www.apple.com/newsroom/2007/06/28iPhone-Premieres-This-Friday-Night-at-Apple-Retail-Stores/ | Apple Newsroom, "Apple Reinvents the Phone with iPhone", 2007-01-09 (same prices announced), https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/. Context: "Apple Sets iPhone Price at $399 for this Holiday Season", 2007-09-05. This is a primary source for its own price; an extended web search (2026-10-07) returned the same $499 / June 29 facts. |
| AAPL raw closes: 6/29/2007 $122.04, 12/31/2007 $198.08 | ATPM 13.07, "Welcome" (July 2007): "Apple's share price ended June trading at $122.04", https://www.atpm.com/13.07/welcome.shtml | 1stock1, Apple yearly stock prices: 2007 began at $84.84 and ended at $198.08, +133.47% (the check reproduces 133.47%), https://1stock1.com/1stock1_148.htm |
| AAPL adjusted closes: 12/31/2007 $5.92, 12/31/2025 $271.36; launch day $3.66 (cross-check only) | StatMuse Money, accessed 2026-10-07, https://www.statmuse.com/money/ask?q=apple+stock+price+on+june+29,+2007 · https://www.statmuse.com/money/ask/apple-stock-price-in-2007 · https://www.statmuse.com/money/ask/apple-stock-price-on-2025 | Macrotrends: 2007 close 5.97 and 2025 close 271.12 on its own basis. The two final values agree within 0.18%. |
| AAPL year closes and % changes, 2007-2025 (adjusted for splits and dividends) | Macrotrends, "Apple - 45 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/AAPL/apple/stock-price-history | Internal check: every % change reproduces from the closes within rounding (the 2012 seam is noted above). StatMuse for the end points. |

### Assumptions (footer)

- The $499 is invested at the 6/29/2007 close. Note that the phone went on sale at 6 p.m., after the market closed: you buy at the 4 p.m. close instead of standing in the line.
- Dividends are reinvested (adjusted closes). Apple began paying dividends in 2012.
- Splits are adjusted.
- The value is taken at the 12/31/2025 close: $271.12 on Macrotrends' dividend-adjusted basis (StatMuse shows $271.36 for that day), which is why the pinned comment calls it the adjusted close.
- No fees or taxes.

**Caption (IG, TikTok; the YouTube description opens with the same line and carries the maths below it):**
POV: In 2007 you invested in Apple instead of paying $499 for the first iPhone. The phone got old. The shares didn't. #apple #iphone #usa #investment #stocks

**Pinned comment:**
The maths:
- $499 ÷ $3.65 (Apple's 6/29/2007 close, adjusted for splits and dividends) ≈ 136.7 shares. (Some sites show $3.66; on the same basis as the $271.12 below it is $3.65.)
- 136.7 × $271.12 (the adjusted 12/31/2025 close) ≈ $37,062. On screen: ≈ $37,000.
- That's ≈ 74×, about 6.2 doublings in 18.5 years: one every ≈ 3 years.
- Valued at the 12/31/2025 close; Apple has moved since.

What was your first iPhone, and what did you pay?

**Per-platform notes:**
- **YouTube Shorts:** use the question title (R11). The verdict holds 1.6 s, then the 2.5 s end card (the channel's one CTA). On a loop the condensed cut is back in the 2008 dip 1.1 s after the restart, a good replay hook.
- **Instagram Reels:** the cover is frame 1 (header + $499 tips; in the condensed cut the whole hook caption is on it too, "Launch day 2007:" lit). The caption is the POV line plus a verdict with no number: the caption sits over the video, so a result in it would kill the open loop at 0.0 s.
- **TikTok:** caption the way @investment_timeline does (its captions are the POV title plus hashtags, never a result), with our numberless verdict added: the caption above. No licensed music: SFX + VO only.
- **All:** "Apple" and "iPhone" appear as text only. No Apple logo and no product photo; the kit's generic `phone` icon stands in.

---

## (b) 06b: Scoreboard, "your Netflix bill into Netflix stock"

**Look:** Scoreboard (ported from Live Sheet on 2026-10-08; see "Port to Scoreboard" in the Review log): black bars, a dark gridded stage, Anton type, neon green `#2BFF88` for the money that is owned and for the answer.
- **Top bar:** the hook, then the split board **PAID TO NETFLIX** (coral tag, ticket glyph, white live counter) | **IN NETFLIX STOCK** (green, glowing live counter), then the footer, which turns into the working line (`lookOpts.footerSteps`).
- **Stage:** the race. The white spend line gets a ticket dropping onto it at each bill change, with its price tag ("$8.99 HIKE 1 · MAY 2014"): right of the race front early on, then in the top band over the plot, so the x axis always reads. Once the next bill change lands, a ticket shrinks into a small pip on the line (`pips`), so only the latest one stands full size. The green own line has the gap below it filled green, an auto-rescaling axis, and a faint year clock in the corner.
- **Bottom bar: the answer row** (`lookOpts.unit`). Line 1 is the working ("STOCK ÷ ($19.99 × 12)", then each year-end's division). Line 2 is the stake in years of today's bill, 96 px green with a ticket beside it. It counts live from "? YEARS" and lands on the spoken year-ends. **The race pauses on each landing**, so the board, the tips and the year clock show the same year-end as the row.
- **Payoff** (`lookOpts.payoff`, `dur: 0`): at the verdict the board hard-cuts to one hero number under the hook, **≈ 74 YEARS**, landed whole (no roll), with the bump, glow, bloom and hit. Until then the 74 rests in the answer row, unlit and dimmed. The verdict takes the answer row's slot.
- `cover: "clean"`: the board waits LED-off on frame 1 (unlit ghost digits, "$–.––"), so $19.99 is the only price on the cover.
**Platform title (YouTube):** "Your 2012-2025 Netflix Bills in Netflix Stock: How Many Years of Free Netflix?"
**Hook pass 2 (2026-10-08): replaced.** The two judges averaged the old hook ("POV: You invested in Netflix / instead of paying Netflix, / ever since it was $7.99") at 6.0. Rewrite A, below, averaged 7.5 (7.5 and 7.5, both honest), 1.5 above it, so it is adopted under the round-2 rule (at least 1.0 above the current hook). Hook pass 1 had kept the old hook. The race, the data, the hike tags, raceT and the sfx are unchanged. Scores and reasons are in the Review log.
**Assembly fix pass (round 2 QA, 2026-10-08): the header re-set, the sheet carries the rest.** The QA judge scored the hook-pass-2 render 5.5: a 14-word word problem at ~46 px (three lines cap the banner there), broken mid-clause, $7.99 twice as big as the hook's $19.99 on the cover, and a payoff that never became the biggest thing on screen. The header is now the question alone, in two lines by sense at 64 px; the mechanism, the empty answer slot and the conversion are the sheet's own frame-1 cells. **Scoreboard port:** they are now the board's two tags and the answer row; the cover stays clean (board LED-off), and the payoff is the biggest thing on screen (the 140 px hero).

**On-screen hook (header):** `**$19.99** Netflix, free / for how many years?` (7 words, 2 lines, one $ figure, 64 px).
- The viewer's own current bill is the first token, in neon green, and the only price on frame 1. Standard has cost $19.99 since March 2026.
- It is the **unit of the answer**, not the money invested: the board's tags right under it say what is invested ("PAID TO NETFLIX" vs "IN NETFLIX STOCK").
- The answer slot is visibly empty on frame 1: the answer row reads **? YEARS** (96 px, beside a ticket) under its working, `STOCK ÷ ($19.99 × 12)`, on one line.
- The cover carries no other price: the board's two counters wait LED-off (unlit ghost digits "$–.––" at counter size, 16% white), and the stake's ticket and tag "$7.99 JAN 2012" drop in only as the race starts (0.3-2.0 s).

**Footer:** `Standard plan list price · 12/31/25 close` (one line). It dates the value; the ÷ $19.99 conversion is the answer row's frame-1 working, and the horizon is the year clock's 2012 and the 2013-2025 axis. Footer steps rewrite it to the working at 5.45 s (`Each year: bills ÷ avg price`), 15.2 s (`188.8 shares × $93.76 ≈ $17,700`, 0.7 s before the finish) and 16.7 s (`$17,706 ÷ $239.88 ≈ 74 years`, with the payoff). Times here and below are the condensed cut's (2026-10-12); the 30.5 s cut's are in git history (471c793 and earlier: 9.2, 21.2 and 26.0 s).

**Modelled on:**
- H04 HD Guy "Cost in Units of Starbucks Lattes", footer "Tall Latte ☕ = $4.45": 9,858,084 (106.16x). A big sum re-priced in a unit the viewer pays, with that unit's price on frame 1.
- H01 HD Guy "Cost in Units of RTX 5090": 30,617,461 (62.49x).
- H64 Gage Heward "What $1 costs you by age": 1,150,974 (210x median). The viewer's own small number, answered as a span of time.
- Hook bank §4.1 Rewrite B, "$1,000,000,000,000 ÷ 8.2 billion people = $___ each": an empty answer slot as the open loop (here the answer row's "? years" on frame 1; until the assembly fix pass, "= ? years" in the formula bar).
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). The same-brand irony is kept.

**Hook rules it satisfies:**
- **R1:** $19.99 is the header's first token and the only price on frame 1; the answer row's working `STOCK ÷ ($19.99 × 12)` repeats it. The board's counters wait LED-off until 0.3 s.
- **R2:** one $ figure in the header, and no result in the header, title or caption. The answer slot ("? years") is empty.
- **R3:** $19.99 is the bill Standard subscribers pay today, the strongest viewer-owned number in this format.
- **R4:** $19.99, small and familiar.
- **R5:** see the wrong belief below. The first landing opens small: at the end of 2012, a whole year of bills in the stock ($107) covers only ≈ 5 months of today's Netflix.
- **R6:** $19.99 in the header; "you" in the first spoken words and caption ("Your Netflix, free"); the 2012 start on the year clock and the 2013-2025 axis. (The header itself no longer carries "your 2012-25 bills": the price for a 64 px hook.)
- **R7:** bill vs stock, the same brand twice.
- **R8:** 7 words.
- **R9:** one countable answer, counting live in the answer row from "?" through every year, and landing (with a bump and a ding, line 1 naming the year: "2012: $107 ÷ $19.99") on the spoken year-ends: ≈ 5 months (2012), ≈ 38 years (2020), ≈ 22 years (the 2022 halving, in coral on a thud), then ≈ 74 at the payoff. The race pauses briefly for each landing (0.5 s for 2012, 0.6 s for 2020 and 2022), and each held figure stays up to the end of its caption. The hike tags still count "Hike 1" to "Hike 7" as the race passes them.
- **R10:** the first ticket starts to fall on frame 2 (it is hidden on frame 1, so the cover stays clean), the race starts at 0.24 s (the counters slam in, the ticket lands) and the answer row counts from it; the first payoff in the hook's own unit, "≈ 5 MONTHS", lands at 1.2 s and holds to 1.7 s, with the race paused on the 2012 close ($95.88 | $106.98).
- **R11:** the header and the title ask; the caption has no number.
- **R12:** "≈ 74 years of Netflix" is one lopsided, repeatable number.

**Wrong belief it exploits (R5):** "Old streaming bills are just gone." Every 2012-2025 bill, put in Netflix stock, would now pay for ≈ 74 years of today's $19.99 Netflix. The flat-price assumption is stated on screen ("at $19.99 a month") and in the pinned comment.

**What the judges still flag:** it drops P6's "instead of paying" (the column labels say it instead). The 74 years holds the price flat after 8 hikes in 14 years, so expect "prices will rise" comments. (Fixed in the assembly pass: the word-problem header, and the two prices in view at once.)

### Beat sheet (condensed cut, 2026-10-12: chart clock x 2012 → 2025.99 over t 0.24 → 15.9 s, paused briefly on the three answer-row landings: 1.2-1.7 on the 2012 close, 9.7-10.3 on 2020's, 12.3-12.9 on 2022's; 1.00 s per year between them (0.97 to the 2012 close), 1.00 s per year moving; payoff and verdict at 16.7 s; body 18.3 s + the 2.5 s end card = 20.8 s)

Spec: `studio/specs/06b-scoreboard-netflix-bill.json` (promoted 2026-10-12). It replaced the 30.5 s cut (race 0.3 → 23.0 s at ≈ 1.6 s per year with 1.3-1.8 s holds, verdict 26.0 s), whose beat sheet and guide VO script are in git history (471c793 and earlier). The Review log ("Condensed cut (2026-10-12): 06b", "QA fix pass" and "Condensed cut: promoted and shipped (2026-10-12): 06b") lists every change. Every string, number, hike tag and cue role is the 30.5 s cut's; only the clock moved.

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header **$19.99** NETFLIX, FREE / FOR HOW MANY YEARS? (64 px, $19.99 green). Board: PAID TO NETFLIX \| IN NETFLIX STOCK, both counters LED-off (unlit ghost digits "$–.––" at counter size). Footer `Standard plan list price · 12/31/25 close`. Stage: year clock "2012", the empty 2013-2025 axis, both tips parked on the start. Answer row: `STOCK ÷ ($19.99 × 12)` (48 px) over **? YEARS** (96 px, a ticket beside it). The hook caption is already complete on frame 1 (pre-typed from t −0.4). From frame 2 the first ticket falls toward the start of the white line (hidden on frame 1, so the cover stays clean). | "Your Netflix, free. For how long?" (−0.4-1.7, complete on frame 1) |
| 0.24 | The race starts (whoosh): both counters slam in at $7.99 / $7.99 and run; the ticket lands with its tag "$7.99 JAN 2012" (pop, the PAID counter flushes coral; the tag holds to 1.94). The answer row counts from ≈ 1 month (0.36 s), its "≈" an unlit ghost while it runs. | |
| 1.2 | End of 2012: **the race pauses** on the close. Board $95.88 \| $106.98, year clock 2012. The answer row **lands**: line 1 cuts to `2012: $107 ÷ $19.99`, line 2 to **≈ 5 MONTHS** (ding, bump, glow, floor bloom), held to 1.7, when the race resumes. | ("For how long?" is up) |
| 1.7 | Line 1 back to `STOCK ÷ ($19.99 × 12)`; the race runs on. End of 2013 at t 2.7: $191.76 \| $568.35, the answer row ≈ 2.4 years (live). | "Since 2012, every bill buys Netflix stock." (1.75-3.55) |
| 3.04 | A ticket drops on the line with "$8.99 HIKE 1 · MAY 2014", right of the race front (pop; the PAID counter bumps and flushes coral). The Jan 2012 ticket shrinks into a pip. End of 2014 at 3.7: $295.64 \| $615.52. | |
| 4.46 | "$9.99 HIKE 2 · OCT 2015" (pop), right of the front, as the green line jumps (2015 close at 4.7: $406.52 \| $1,581). | "Price hike? Your investment goes up too." (3.6-5.4) |
| 5.45 | Footer → `Each year: bills ÷ avg price` (tick). End of 2016 at 5.7: $526.40 \| $1,856. "$10.99 HIKE 3 · OCT 2017" (t 6.46) and "$12.99 HIKE 4 · JAN 2019" (t 7.71), each in the top band over the plot, so the x axis keeps its year labels; the older tickets are pips. The answer row runs past ≈ 13 (2017 close, 6.7: $649.28 \| $3,022) and ≈ 18 years (2018 close, 7.7: $781.16 \| $4,324). | "Each year's bills buy at that year's average price." (5.45-9.05) |
| 8.7 | End of 2019 at 8.7: $937.04 \| $5,380 (≈ 22 years live). "$13.99 HIKE 5 · OCT 2020" (t 9.46, pop, top band). End of 2020 at t 9.7: **the race pauses**. Board $1,095.92 \| **$9,181**, year clock 2020; the answer row **lands** `2020: $9,181 ÷ $239.88` / **≈ 38 YEARS** (ding), held to 10.3, the end of the caption. | "2020: about 38 years." (9.1-10.3) |
| 10.3 | The race resumes, uncaptioned for 0.6 s while the stake climbs through 2021 (no cue, tag or landing falls in it): end of 2021 $1,263.80 \| $10,410 (t 11.3, ≈ 43 years live, the year clock turns 2022); "$15.49 HIKE 6 · JAN 2022" (t 11.31, top band). Through 2022 the green line falls and the answer row with it; end of 2022 at t 12.3: **the race pauses**, board $1,449.68 \| **$5,289**, year clock 2022, and the answer row **lands in coral** `2022: $5,289 ÷ $239.88` / **≈ 22 YEARS** (thud), held to 12.9, the end of the caption. | "2022: it halves." (10.9-12.9) |
| 12.9 | The race resumes and the answer row climbs: end of 2023 $1,635.56 \| $8,964 (t 13.9, ≈ 37 years), end of 2024 $1,821.44 \| $16,656 (t 14.9, ≈ 69 years). "$17.99 HIKE 7 · JAN 2025" (t 14.91, top band). Riser from 13.5. | "You keep paying. It comes back." (12.95-15.15) |
| 15.2 | Footer → `188.8 shares × $93.76 ≈ $17,700` (tick). The finish at t 15.9 (riser, hit, cash): **$2,037.32** / **≈ $17,700** land on the board (IN NETFLIX STOCK bumps, flares and blooms), the only lit number. The answer row does **not** land: line 1 cuts softly to `≈ $17,700 ÷ $239.88` (the board's own figure), line 2 rests on ≈ 74 YEARS with its "≈" still an unlit ghost, dimmed to half. The spend line ends with one full ticket (Hike 7) and seven pips. | "About $2,037 in bills. About $17,700 in stock." (15.2-16.7) |
| 16.7 | **The payoff, 0.8 s after the reveal:** the split board hard-cuts to one hero number under the hook, ticket + **≈ 74 YEARS** (140 px), landed whole (no roll): the 1.13 bump, glow, stage bloom and hit, all at 16.7. Footer → `$17,706 ÷ $239.88 ≈ 74 years`. The answer row yields and the verdict slams into its slot (reveal): **≈ 74 YEARS** OF NETFLIX / AT $19.99 A MONTH. | "At $19.99 a month: about 74 years of Netflix." (16.7-17.9) |
| 16.7-18.3 | Verdict hold: 1.6 s from the payoff to the card. | |
| 18.3-20.8 | End card (unchanged): "Follow for the math behind your money", "shown, not hand-waved.", @envelopemath. | |

Each year count is captioned while the answer row holds it: "2020: about 38 years." is up 0.6 s before the 2020 landing (as in the 30.5 s cut) and ends with its hold (10.3), and "2022: it halves." ends with the 2022 hold (12.9), so a caption never names a figure the row has left. Nor does a caption run far ahead of its picture: "2022: it halves." goes up at 10.9, 0.4 s before the 2021 peak (11.3, where the year clock turns 2022 and the Hike 6 tag drops), not over a whole second of rising line. Between the two lines, 10.3-10.9, the race runs uncaptioned (QA fix pass, 2026-10-12). **During every hold the race is paused on that year-end**, so the board's counters, both tips, the year clock and the row's working show the same year: a paused frame never sets "2012: $107" beside a board that has moved on into 2013. The pauses are short (0.5-0.6 s): the landing's bump, glow and bloom fill about the first 0.3 s, so no pause sits still for more than 0.3 s. The payoff answers the header directly under it: question on top, **≈ 74 YEARS** right below, the working under that. The 74 is lit once, at 16.7: before that it rests unlit in the answer row while the board's dollars land.

### Captions (on-screen text, no narration; 59 words, all shown)

> Your Netflix, free. For how long? · Since 2012, every bill buys Netflix stock. · Price hike? Your investment goes up too. · Each year's bills buy at that year's average price. · 2020: about 38 years. · 2022: it halves. · You keep paying. It comes back. · About $2,037 in bills. About $17,700 in stock. · At $19.99 a month: about 74 years of Netflix.

The wording is the 30.5 s cut's guide VO script, word for word; only the timing changed. Pacing is for reading, not speaking: each caption is up for at least max(1.2 s, 0.12 s per word) from frame 1, and they run back to back (0.05 s gaps), with one exception: a 0.6 s breath at 10.3-10.9, while the race climbs through 2021 and nothing lands, so "2022: it halves." does not go up over the rising line (the check allows a gap of up to 0.6 s only while the race moves and no beat falls in it). The longest line, "Each year's bills buy at that year's average price." (9 words), is up 3.6 s, over the footer's method step and hikes 3 and 4. The Scoreboard sets the last line under the verdict (the 30.5 s cut did too). The first line drops the spoken "$19.99" so the frame-1 caption carries no price (the header shows it at 64 px). "2020: about 38 years." loses "of Netflix" so "about 38 years" stays in one chunk (a Live Sheet rule; the Scoreboard sets it on one line anyway).

### The maths

Plan price by month: a new price counts from the month it was announced. Each year's bills buy shares at that year's average split-adjusted close. Buying a fixed dollar amount at the *arithmetic* average price slightly understates the shares that monthly buying gets, so the method is conservative. 2012-2014 use Macrotrends' own 4-decimal values; from 2015 the table's 2-decimal values are its full precision.

| Year | Bills | Paid | NFLX avg | Shares bought | Shares held | NFLX close | Paid to date | Worth at year end |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 2012 | 12 × $7.99 | $95.88 | $1.1855 | 80.88 | 80.88 | $1.3227 | $95.88 | $107 |
| 2013 | 12 × $7.99 | $95.88 | $3.5272 | 27.18 | 108.06 | $5.2596 | $191.76 | $568 |
| 2014 | 4 × $7.99 + 8 × $8.99 | $103.88 | $5.7495 | 18.07 | 126.13 | $4.8801 | $295.64 | $616 |
| 2015 | 9 × $8.99 + 3 × $9.99 | $110.88 | $9.19 | 12.07 | 138.19 | $11.44 | $406.52 | $1,581 |
| 2016 | 12 × $9.99 | $119.88 | $10.20 | 11.75 | 149.95 | $12.38 | $526.40 | $1,856 |
| 2017 | 9 × $9.99 + 3 × $10.99 | $122.88 | $16.54 | 7.43 | 157.38 | $19.20 | $649.28 | $3,022 |
| 2018 | 12 × $10.99 | $131.88 | $31.93 | 4.13 | 161.51 | $26.77 | $781.16 | $4,324 |
| 2019 | 12 × $12.99 | $155.88 | $32.89 | 4.74 | 166.25 | $32.36 | $937.04 | $5,380 |
| 2020 | 9 × $12.99 + 3 × $13.99 | $158.88 | $44.68 | 3.56 | 169.80 | $54.07 | $1,095.92 | $9,181 |
| 2021 | 12 × $13.99 | $167.88 | $55.82 | 3.01 | 172.81 | $60.24 | $1,263.80 | $10,410 |
| 2022 | 12 × $15.49 | $185.88 | $28.46 | 6.53 | 179.34 | $29.49 | $1,449.68 | $5,289 |
| 2023 | 12 × $15.49 | $185.88 | $39.02 | 4.76 | 184.10 | $48.69 | $1,635.56 | $8,964 |
| 2024 | 12 × $15.49 | $185.88 | $67.15 | 2.77 | 186.87 | $89.13 | $1,821.44 | $16,656 |
| 2025 | 12 × $17.99 | $215.88 | $109.71 | 1.97 | 188.84 | $93.76 | **$2,037.32** | **$17,705.59** |

| On screen / spoken | Formula |
|---|---|
| $2,037.32 spent / "about $2,037" | sum of the 168 monthly list prices |
| ≈ $17,700 | 188.839 shares × $93.76 = $17,705.59, to 3 significant figures |
| `188.8 shares × $93.76 ≈ $17,700` | 188.8 × 93.76 = 17,701.9 |
| $19.99, `($19.99 × 12)` (header, answer row, VO, verdict) | today's Standard bill (from March 2026). It is the unit of the answer, not a race input: the race's 168 bills run Jan 2012-Dec 2025 and end on the $17.99 bill |
| $239.88 (answer row working, footer) | 12 × $19.99, a year of today's Standard |
| Answer row (live, line 2) | the IN STOCK counter ÷ $239.88 a year; under a year in whole months (÷ $19.99; under 1 month it keeps "? years"); 1-10 years to 1 decimal; then whole years. That is 2 significant figures, so each landing (`lookOpts.unit.holds[].display`) equals the live count at that year-end, the working and the VO (the check replicates the kit's rule) |
| `2012: $107 ÷ $19.99` / ≈ 5 months (answer row, 1.2 s) | $106.98 ÷ 19.99 = 5.35 months (shown $107 ÷ 19.99 = 5.35) |
| (answer row, live) 2013 | $568.35 ÷ 239.88 = 2.37 → ≈ 2.4 years as the race passes 2013 (no longer a bar step) |
| `2020: $9,181 ÷ $239.88` / ≈ 38 years (answer row, 9.7 s, held to 10.3) / "about 38 years" | $9,181.15 ÷ 239.88 = 38.27 (shown $9,181 → 38.27) |
| (not shown) 2021 peak | $10,409.99 ÷ 239.88 = 43.40 years |
| `2022: $5,289 ÷ $239.88` / ≈ 22 years (answer row, 12.3 s, coral) | $5,288.73 ÷ 239.88 = 22.05 (shown $5,289 → 22.05). 43.4 → 22.0 years is the spoken "it halves" (the stake fell 49.2%) |
| `≈ $17,700 ÷ $239.88` / the answer row's ≈ 74 years, unlit (`lookOpts.unit.finalWork`, `final`, 15.9 s) | 17,700 ÷ 239.88 = 73.79 → ≈ 74. Line 1 uses the board's own ≈ $17,700, so no frame shows $17,700 and $17,706 side by side |
| the hero's ≈ 74 YEARS (`lookOpts.payoff`, 16.7 s) / the footer `$17,706 ÷ $239.88 ≈ 74 years` (16.7 s, the board gone) / "about 74 years" / the verdict | $17,705.59 ÷ 239.88 = 73.81 (885.7 months); the working's whole-dollar $17,706 gives 73.81 too. All round to 74, and the live answer row reads ≈ 74 at the finish, so the row's resting number never jumps |
| Year-count rounding | months to the whole month; years to 2 significant figures (2.4, 38, 22, 74). The check asserts that each step rounds the same from the exact stake and from the whole-dollar figure the working shows |
| (pinned only) ≈ 8.7× | 17,705.59 ÷ 2,037.32 = 8.69, the stake against the bills (the old verdict) |
| "Hike 1" … "Hike 7" | the 7 Standard-plan price changes after the $7.99 start, to 2025 (the 8th, to $19.99 in March 2026, is after the race) |
| "halves" (2022) | stake $10,410 → $5,289, −49.2% (the stock fell 51.05%) |
| (not on screen) 2013 | the stock ×3.98 (5.2596 ÷ 1.3227) |
| (not on screen since hook pass 2) 2012 shares, 2015 bills | 95.88 ÷ 1.1855 = 80.88 shares; 2015's bills = 9 × $8.99 + 3 × $9.99 = $110.88 (the table above) |
| Tick x positions | year + (month − 1) ÷ 12: 2014.33, 2015.75, 2017.75, 2019.0, 2020.75, 2022.0, 2025.0 |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| Standard plan price history: $7.99 (from Jul 2011), $8.99 May 2014, $9.99 Oct 2015, $10.99 Oct 2017, $12.99 Jan 2019, $13.99 Oct 2020, $15.49 Jan 2022, $17.99 Jan 2025 | Android Authority, "A 94% increase: A timeline of Netflix price hikes", accessed 2026-10-07, https://www.androidauthority.com/timeline-netflix-price-hikes-3463376/ | Variety, "Netflix Hikes Price of U.S. Streaming Service: Standard Plan Jumps to $13 per Month", 2019-01-15, https://variety.com/2019/digital/news/netflix-us-streaming-price-increases-2019-1203108254 ($10.99 → $12.99) · CNBC, "Netflix to hike prices on standard and ad-supported streaming plans", 2025-01-21, https://www.cnbc.com/2025/01/21/netflix-raises-prices.html ($15.49 → $17.99) · Android Police, https://www.androidpolice.com/netflix-prices-increase-over-last-10-years/ · flixed.io, https://flixed.io/netflix-price-hikes · MovieWeb, https://movieweb.com/netflix-subscription-changes-guide/ |
| Today's bill, the hook's unit (hook pass 2): Standard $19.99 from March 2026. It is after the race window, so it converts the stake into years and is never a race input | CNBC, "Netflix raises prices across all streaming plans", 2026-03-26, https://www.cnbc.com/2026/03/26/netflix-raises-prices-across-all-streaming-plans.html | subkept.com and keepingupwithinflation.com, accessed 2026-10-07 |
| NFLX annual average, year close and % change, 2011-2025 (split-adjusted; Netflix pays no dividend). 2012-2014 at 4 decimals: 1.1855 / 1.3227, 3.5272 / 5.2596, 5.7495 / 4.8801 | Macrotrends, "Netflix - 24 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/NFLX/netflix/stock-price-history (re-searched 2026-10-07 by the writer and, independently, by the verifier) | StatMuse Money, NFLX 12/31/2025 close $93.76 (equal to Macrotrends), https://www.statmuse.com/money/ask/netflix-stock-price-december-2025. Internal check: every % change reproduces from the closes; at 4 decimals 1.3227 → 5.2596 gives the listed +297.64% exactly. |

**Assumptions (footer):**
- The US Standard plan list price applies each month, with each new price counted from the month it was announced to new members.
- Each year's bills buy at that year's average split-adjusted price.
- Netflix pays no dividends.
- The value is taken at the 12/31/2025 close ($93.76).
- No fees or taxes.
- Years of Netflix: the 12/31/2025 value ÷ $19.99 a month, held flat. Future hikes and the stock's moves since 12/31/2025 are ignored.
- Members who were grandfathered in 2014-2016 paid a little under the list price that the spend line uses.

**Caption:** Every Netflix bill from 2012 to 2025, into Netflix stock. Your old bills, paying for your new ones. #netflix #usa #investment #stocks (no number: the caption sits over the video, and a result in it would close the loop at 0.0 s)

**Pinned comment:**
The working:
- Each year's 12 bills at the Standard plan's list price buy shares at that year's average price (split-adjusted).
- 188.84 shares × $93.76 (12/31/2025 close) ≈ $17,706, against $2,037.32 of bills (≈ 8.7×).
- Standard is $19.99 since March 2026: × 12 = $239.88 a year. $17,706 ÷ $239.88 ≈ 73.8 years.
- Ignores taxes, future hikes and the stock's moves since 12/31/2025; members grandfathered in 2014-16 paid a little under list.

Which plan are you on?

**Per-platform notes:**
- **YouTube:** the question title, with no CTA card.
- **Instagram Reels:** the cover is frame 1: the 64 px $19.99 question, the LED-off board and the empty "? YEARS" answer. The final frame is the save-worthy one: the question, **≈ 74 YEARS** right under it, the working, the race (one ticket, seven pips: nothing cut by the green line) and the verdict. It holds 1.6 s after the hero lands (16.7-18.3 s in the condensed cut; 4.5 s in the 30.5 s cut), then the end card. Its first settled frame is about 17.2 s (the verdict hold's still run starts at 17.20). Captions are the Scoreboard's Inter Tight 800, white as each word is spoken. The post caption is the numberless line above.
- **TikTok:** the caption above (no number) and `#netflix #usa #investment #stocks`. The pinned comment asks "Which plan are you on?", so viewers on Premium or the ad tier can redo the division with their own bill.
- **All:** "Netflix" in text only, no N logo. The spend icon is the kit's generic `ticket`.
- **Kit request (Live Sheet, retired with that look):** pre-placed hollow hike rings. In the Scoreboard port a ticket drops onto the spend line at each hike as the race reaches it, and the tags count them ("Hike 1" … "Hike 7").

---

## (b) 06c: Becker Rig, "a $4 latte a day vs Starbucks stock"

**Look:** Becker Rig, from `research/v2/watch/alan-becker.md` sections 3, 4 and 6:
- One rigged stick figure in our own hero colour (not Becker orange) on a white void with a floor gradient, the maths in neutral ink.
- Two piles on one dollar scale: the spent money as a ghost column, the same money in the stock as a tower of gold coins on an "SBUX" plinth.
- Every operation is a verb the figure performs: it pays a coin for the cup, drinks, and flings the cup onto a junk heap; the coins land on the tower and tumble off it when the stock falls.
- Impacts use the kit's flash, shake and SFX.
- Applied here are transfer devices "numbers are objects", "results are transformations" and "one number per short that the viewer watches move". The kit's pov-race module draws this by default; the spec sets `lookOpts` `prop: "cup"`, `jarLabel: "SBUX"` and `endPose: "shrug"`, plus the round-2 beats: `multiple` (the "2×" mark, which pauses the race on the 2021 close), `land` (each year-end's exact figures hold for 0.12 s), `chip` ("+$1,460" on the spent column at the 2015 close; at the 2017 close in the 28.0 s cut), `spentLeft` ("$0 left" in the emptied spent column 0.55 s after the final reveal; at the verdict in the 28.0 s cut), `endMark` ("≈ 1.4×" drawn on the piles at the verdict), `rail: "plain"`, `tagLife: 0.8` and, in the condensed cut, `figureScale: 1.18` (the figure drawn 1.18× in the mostly empty stage).

**Platform title (YouTube):** "What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?" (the format's own grammar, like 06a/06b; it no longer collides with 09c's yes/no "Does $5 a Day Invested Make You a Millionaire?", which reaches the opposite verdict)
**Hook pass (2026-10-08): kept.** The two judges averaged the current hook at 7.0, the highest score in this teaser's set. The best candidate (C, "12 years of $4/day lattes … Watch year 9") averaged 6.5. B was marked dishonest by judge 2, so it is out. The hook, title and body stay as they are. Details are in the Review log.
**On-screen hook (header):** `POV: Since 2014 you invested / in Starbucks instead of paying / **$4/day** for a Starbucks latte` (15 words, 3 lines). The brand's own product is named, as in H45 Monster.
**Footer:** `$4 ≈ a grande latte · with dividends` (one line since the round-2 QA fix pass; "each year at its average price" and "reinvested" are in the pinned comment and the assumptions below)

**Modelled on:**
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). Same grammar: a $X/day habit and a same-brand pairing, with the product named.
- Contrast H47 "POV: You invested in NVIDIA instead of paying $3/day for coffee": 379.9K (29.0x), the smallest post. Its coffee isn't the company's own product; here the latte and the stock are both Starbucks.
- Non-benchmark context only: @davidlbach "The Latte Factor! DRINKING A STARBUCKS COFFEE A DAY VS BUYING THE STOCK INSTEAD (SBUX)", 1.9M (201.5x) (watch/investment-timeline.md §4). It shows demand, and that the idea is taken; our answer is an honest "meh".

**Hook rules it satisfies:**
- **R1:** "$4/day" is in the header, and the figure holds up the $4 coin with both tips at $4 on frame 1. In the condensed cut the hook question "Skip the $4 latte, get rich?" is also complete on frame 1 (pre-typed from t −0.4).
- **R2:** one input, no result, in the header, the title and the caption.
- **R3:** a habit price coffee buyers can swap their own number into (the pinned comment asks).
- **R4:** a round $4.
- **R5:** the first caption raises the latte-factor belief as a question ("Skip the $4 latte, get rich?"), and "Not rich. Not zero." answers it.
- **R6:** you + $4/day + since 2014.
- **R7:** "a Starbucks latte" vs Starbucks stock, the brand named twice.
- **R8:** 15 words.
- **R9:** the year timeline only; the cup heap cannot be counted.
- **R10:** something changes at 0.5 s (the coin buys the cup, the cup is drunk and flung, a coin lands on the tower), and the first payoff ($1,586 vs $1,460 at the end of 2014) lands at 1.53 s in the condensed cut (2.14 s in the 28.0 s cut), held for 0.12 s so the exact figures can be read.
- **R11:** the title asks, the screen says POV, and the caption sets up the test without the answer.
- **R12:** "≈ 1.4×. Not rich. Not zero." is the repeatable verdict, shown word for word. The lopsided frame is drawn on the piles at the verdict: the spent column empties to its dashed outline with a red **"$0 left"** in it, and a green dotted line on the tower top, labelled **"≈ 1.4×"**, sits above the red paid line (1×). "≈ $24,900" on the gold plate is the biggest number on screen (it grows to about 90 px as it lands; "$17,532" steps down to 64 px). The two-line verdict "Cups: $0. Stock: ≈ $24,900." is ready to swap in once the kit's verdict band is fixed (see the Review log).

**Wrong belief it exploits (R5):** "Skip the latte and you'll be rich" (the "latte factor"). Invested in the latte company's own stock, 12 years of lattes come to ≈ 1.4×, with almost no growth after 2021. It is an honest "meh", the same move as GoPro's decline, the biggest post in the benchmark set. The flip side is in the picture and the last word of the verdict: the cups are worth $0, the stock is "not zero".

### Beat sheet (condensed cut after its fix pass, 2026-10-12: chart clock x 2014 → 2021.99 over t 0.5 → 8.83 s, ≈ 1.04 s per year; paused 8.83-9.73 on the 2021 close; x 2021.99 → 2025.99 over t 9.73 → 13.0 s, ≈ 0.82 s per year; ≈ 0.97 s per year moving; body 15.7 s + the 2.5 s end card = 18.2 s)

Spec: `studio/specs/06c-becker-rig-latte-starbucks.json` (promoted 2026-10-12). It replaced the 28.0 s round-2 cut (race 0.5 → 20.4 s at ≈ 1.66 s per year, verdict 23.7 s), whose beat sheet is in git history (80e35e5 and earlier). The Review log ("Condensed cut", "Condensed cut: fix pass" and "Condensed cut: promoted and shipped") lists every change. The race ends at 13.0 s, not 13.3, so that the AAC encode stays clean at the payoff (see the fix pass). The figure is drawn 1.18× (`lookOpts.figureScale`).

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header. One-line footer. The figure holds up the $4 coin. Tips **$4 / $4**. Timeline: "2014", a progress line and "2025" at its end. The hook question is already complete on frame 1 (the caption is pre-typed from t −0.4). From frame 2 to 0.5 he weighs the coin in his hand (two small bounces and a nod, the kit's `heft`), so the hook never holds still. | "Skip the $4 latte, get rich?" (−0.4-1.7, complete on frame 1) |
| 0.5 | Race starts (pop). Tag "Day 1 · $4" (0.44-1.3): the coin buys the cup, the figure drinks and flings it onto the heap, and a coin lands on the SBUX tower. From 2015 to 2021 he buys one cup per year-end (2.61, 3.65, 4.69, 5.73, 6.78, 7.82 s). | |
| 1.53 | End of 2014: spent **$1,460**, owned **$1,586** (first payoff), held for 0.12 s like every year-end. | |
| 2.58 | End of 2015: $2,920 vs $3,997. A red **"+$1,460"** chip pops on top of the spent column and rides it to 3.48. | "That's $1,460 a year." (1.8-3.6) |
| 3.62-5.70 | 2016 $4,384 / $5,199 (3.62), 2017 $5,844 / $6,955 (4.66), 2018 $7,304 / $9,633 (5.70). The tower outgrows the ghost column. | "The stock outruns the cups." (3.7-5.75) |
| 5.70-7.79 | 2019 $8,764 / $14,988 (6.74), 2020 $10,228 / $20,521 (7.79): the two biggest years of the race (+$5,354, +$5,533). | "2019–20: it takes off." (5.8-8.2) |
| 8.83 | End of 2021 (ding on the next 8th, 8.85): owned **$24,343**, spent **$11,688** (2.08×). The race clock pauses 8.83-9.73: the year reads 2021, and both counters and both piles hold those figures. The 2020 cup is flung and lands (9.37) during the pause. On the ding a green dotted line labelled **2×** draws across the piles at 2 × $11,688 = $23,376, just under the tower top. | "By 2021, your money doubled." (8.25-9.7) |
| 9.73 | The race resumes with the 2021 purchase (9.76), and the 2× mark fades. 2022 dip to $22,808 (10.55): coins tumble off the tower while the ghost column keeps growing ($13,148). | "Then it stalls. You keep buying." (9.75-11.5) |
| 11.37-12.18 | 2023 $23,942 vs $14,608 (11.37, the last purchase at 11.40), 2024 $24,865 vs $16,072 (12.18). Riser from 12.0. | "By 2025: $17,532 of lattes." (11.55-12.85) |
| 13.0 | Final (hit + cash): **$17,532 spent**; the stock counter runs onto the exact $24,928, then hard-cuts to **≈ $24,900** on the gold plate. Over 0.4 s the plate grows 1.2× (the number to about 90 px) while "$17,532" steps down to 64 px. The figure shrugs (13.25-13.55). | "Or about $24,900 in stock." (12.9-14.1) |
| 13.55 | The spent column empties to its dashed outline and **"$0 left"** pops inside it (13.63-13.75), on its own pop (13.675): the lattes are gone, the stock is not. | |
| 14.1 | Verdict (ding): **≈ 1.4×**. Not rich. Not zero. Its swoosh draws to 14.78. A green dotted line on the tower top runs from over the spent column to the tower, with **"≈ 1.4×"** under its left end, above the red paid line. | (the verdict replaces the captions) |
| 14.8-15.7 | Verdict hold: 1.6 s from the verdict to the card. | |
| 15.7-18.2 | End card (unchanged): "Follow for the math behind your money", "shown, not hand-waved.", @envelopemath; the figure points at the em badge. | |

The kit skips the 2022 and 2024 purchases because they come less than its 0.95 s minimum gap after the one before. The heap ends with 9 cups (R9: it cannot be counted anyway).

### Captions (on-screen text, no narration; 40 words shown)

> Skip the $4 latte, get rich? · That's $1,460 a year. · The stock outruns the cups. · 2019–20: it takes off. · By 2021, your money doubled. · Then it stalls. You keep buying. · By 2025: $17,532 of lattes. · Or about $24,900 in stock.

Then the verdict, `≈ 1.4×. Not rich. Not zero.` The spec's last `vo` line ("About 1.4 times. Not rich. Not zero.", 14.1-15.3) sits under it and is never shown, because the Becker Rig chrome replaces the captions with the verdict. Pacing is for reading, not speaking: each caption is up for at least max(1.2 s, 0.12 s per word) from frame 1, and there is no gap over 0.1 s between captions. The longest line, "Then it stalls. You keep buying." (6 words), is up 1.75 s.

Changes from the 28.0 s cut's 54-word script:
- "Since 2014, that $4 buys Starbucks stock." is cut, because the header already says it.
- "The stock climbs faster than the cups pile up." is now "The stock outruns the cups." (2017-2018), followed by a new line, "2019–20: it takes off." (the two biggest years).
- "By 2021, you've doubled your money." is now "By 2021, your money doubled."
- "2025: $17,532 of lattes." is now "By 2025: $17,532 of lattes." (framed as the destination, so the racing counter reads as catching up).
- The other lines are unchanged.

### The maths

Each year's $4 × days buys shares at that year's average close (adjusted for splits and dividends, so dividends are reinvested).

| Year | Days | Lattes | SBUX avg | Shares bought | Shares held | SBUX close | Spent to date | Worth at year end |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| 2014 | 365 | $1,460 | $30.40 | 48.03 | 48.03 | $33.02 | $1,460 | $1,586 |
| 2015 | 365 | $1,460 | $43.04 | 33.92 | 81.95 | $48.77 | $2,920 | $3,997 |
| 2016 | 366 | $1,464 | $46.31 | 31.61 | 113.56 | $45.78 | $4,384 | $5,199 |
| 2017 | 365 | $1,460 | $47.65 | 30.64 | 144.20 | $48.23 | $5,844 | $6,955 |
| 2018 | 365 | $1,460 | $48.87 | 29.88 | 174.08 | $55.34 | $7,304 | $9,633 |
| 2019 | 365 | $1,460 | $70.72 | 20.64 | 194.72 | $76.97 | $8,764 | $14,988 |
| 2020 | 366 | $1,464 | $73.36 | 19.96 | 214.68 | $95.59 | $10,228 | $20,521 |
| 2021 | 365 | $1,460 | $100.98 | 14.46 | 229.14 | $106.24 | $11,688 | $24,343 |
| 2022 | 365 | $1,460 | $80.57 | 18.12 | 247.26 | $92.24 | $13,148 | $22,808 |
| 2023 | 365 | $1,460 | $94.72 | 15.41 | 262.67 | $91.15 | $14,608 | $23,942 |
| 2024 | 366 | $1,464 | $85.86 | 17.05 | 279.72 | $88.89 | $16,072 | $24,865 |
| 2025 | 365 | $1,460 | $89.55 | 16.30 | 296.03 | $84.21 | **$17,532** | **$24,928.31** |

| On screen | Formula |
|---|---|
| $4/day, "Day 1 · $4" | input: a round stake inside the sourced latte bracket ($3.65 in 2014, $4.45 in 2024) |
| $1,460 a year | $4 × 365 |
| $17,532 spent | $4 × 4,383 days (1/1/2014-12/31/2025, three leap years) |
| ≈ $24,900 / "about $24,900" | 296.03 shares × $84.21 = $24,928.31, to 3 significant figures |
| ≈ 1.4× / "about 1.4 times" | 24,928.31 ÷ 17,532 = 1.42 |
| "The stock outruns the cups" (on screen over x 2017.07-2019.04 in the condensed cut; the 28.0 s cut's "climbs faster than the cups" ran over 2019-2021) | the stake grew +$1,756 and +$2,679 in 2017 and 2018 (and +$5,354, +$5,533, +$3,822 in 2019-2021), against $1,460 of lattes a year ($1,464 in 2020). 2016 (+$1,202) would not qualify, and the line starts after its close. |
| "2019–20: it takes off" (on screen over x 2019.08-2021.39 in the condensed cut: 0.91 of 2019's growth and all of 2020's) | +$5,354 in 2019 and +$5,533 in 2020: the two biggest yearly gains of 2015-2025 (no other year beats +$3,822), each more than 3.6× that year's lattes. The stake goes from $9,633 to $20,521 (2.1×) while $2,924 of lattes go in. |
| "doubled" by 2021 | $24,343 ÷ $11,688 = 2.08 |
| the **2×** mark (end of 2021) | a line at 2 × $11,688 = $23,376; the tower ($24,343) is above it, so "2×" is the whole multiple reached |
| "stalls" | 2022-2025: $5,844 more in, while the stake rose only $585 ($24,343 → $24,928). The 229 shares held at the end of 2021 fell from $106.24 to $84.21. |
| "+$1,460" chip (2015 close; 2017 in the 28.0 s cut) | $4 × 365: 2015 (and 2017) are not leap years (2016, 2020 and 2024 add $1,464) |
| "Not zero", "$0 left" (in the emptied spent column, between the final reveal and the verdict) | the lattes are drunk: $0 left; the stock is not |
| the **≈ 1.4×** mark (at the verdict) | a line on the tower top ($24,928.31), drawn above the paid line ($17,532): 24,928.31 ÷ 17,532 = 1.42 |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| Grande caffè latte $3.65 (2014) → $4.45 (2024) | Visual Capitalist, "Charted: Starbucks Price Inflation (2014-2024)" (2024; exact date not returned), https://www.visualcapitalist.com/charted-starbucks-price-inflation-2014-2024/. Its data is FinanceBuzz's analysis of 2014, 2019 and 2024 menu prices from archived menus via the Wayback Machine. | Voronoi (Visual Capitalist's app), "How Starbucks Menu Prices Have Changed Since 2014", https://www.voronoiapp.com/economy/How-Starbucks-Menu-Prices-Have-Changed-Since-2014-1381. **This is the same dataset, so it is not independent.** That is why the stake is a round $4 described as "≈ a grande latte", not a precise price. Context: WTKR/CNN, "Get ready to pay more for that latte: Starbucks prices are going up", 2014-06-20, https://www.wtkr.com/2014/06/20/get-ready-to-pay-more-for-that-latte-starbucks-prices-are-going-up (it says the grande latte price did not change in the June 2014 adjustment). |
| SBUX annual average, year close and % change, 2014-2025 (adjusted for splits and dividends) | Macrotrends, "Starbucks - 34 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/SBUX/starbucks/stock-price-history (two searches: the 2014-2021 rows and the 2022-2026 rows) | Internal check: every % change 2015-2025 reproduces from the closes, including across the 2021 → 2022 seam between the two searches. Cross-check: a second search gave $82.71 for the 2025 year-end, probably on a later dividend basis. It would make the final ≈ $24,484 (−1.8%), still "≈ 1.4×". |

**Assumptions (footer: `$4 ≈ a grande latte · with dividends`; the rest is here and in the pinned comment):**
- $4 every day, 1/1/2014-12/31/2025, held flat. Real latte prices started below $4 and ended above it.
- Each year's money buys at that year's average adjusted price (moved off the footer in the round-2 QA fix pass).
- Dividends are reinvested.
- The value is taken at the 12/31/2025 close ($84.21).
- No fees or taxes.

**Publishing metadata (SEO, YouTube and Instagram):** `publishing/06c-becker-rig-latte-starbucks.md` and its JSON twin (2026-10-12). It has the vidIQ-scored titles, description, tags, hashtags, pinned comment, Instagram caption, alt text, cover and posting window, and it replaces the caption below for posting. It names no timestamps. Its cover is "the settled verdict hold": in the shipped condensed cut, export at 14.7 s (frame 441), the first settled frame of the verdict hold.

**Caption (round 2):** POV: Since 2014 you invested in Starbucks instead of paying $4/day for a Starbucks latte. The latte factor, tested on Starbucks itself. #starbucks #latte #lattefactor #usa #investment #stocks

**Pinned comment:**
The maths:
- $4 × 365 = $1,460 a year, bought at each year's average SBUX price (dividends reinvested).
- By 2021: $11,688 in → $24,343.
- 2022-2025: another $5,844 in, but the stake grew just $585.
- End (12/31/2025 close): 296.0 shares × $84.21 ≈ $24,926, vs $17,532 of lattes. ≈ 1.4×.

A grande latte was $3.65 in 2014 and $4.45 in 2024 (FinanceBuzz). What do you pay now?

**Per-platform notes:**
- **YouTube:** the "What if" title asks; the verdict answers it on screen at 14.1 s in the condensed cut (23.7 s in the 28.0 s cut).
- **Instagram Reels:** the figure gag reads with the sound off (the Becker "mute test"): something happens inside the first second. Keep the heap and the tower inside x 60-940 below y 820. The post caption is the POV line + the numberless test line above.
- **TikTok:** the caption above. The "latte factor" argument should draw comments both ways.
- **All:** "Starbucks" and "SBUX" in text only. The cup is the kit's generic `cup`, with no siren logo and no green brand colour on the cup.

---

## Research log

**Web searches: 13 of 14 (first draft) + 6 of 10 (this revision).**

| # | Search | Result |
|---|---|---|
| 1 | AAPL annual history | Macrotrends table |
| 2 | NFLX annual history | Macrotrends table |
| 3 | SBUX annual history | Annual returns only, unused |
| 4 | Starbucks latte price history | Visual Capitalist |
| 5 | SBUX Macrotrends table | 2022-2026 rows |
| 6 | SBUX 2014-2021 rows | |
| 7 | Netflix price timeline | |
| 8 | iPhone $499 + AAPL 2007 closes | StatMuse |
| 9 | 12/31/2025 closes for all three | |
| 10 | Second source for a $3.65 latte | Not found |
| 11 | Latte data source | FinanceBuzz |
| 12 | Apple Newsroom (apple.com only) | |
| 13 | Netflix hikes | CNBC / Variety |
| R1 | AAPL raw close on 6/29/2007 | ATPM 13.07: "ended June trading at $122.04" |
| R2 | NFLX Macrotrends 2012 row, 4 decimals | avg 1.1855, close 1.3227 |
| R3 | NFLX Macrotrends 2013 row | the 2-decimal summary ($3.53 / $5.26 / +297.64%) |
| R4 | AAPL close on 12/31/2007 | Not stated directly (Dec 24 close $198.80 found) |
| R5 | "198.08" AAPL 2007 year end | Not stated directly |
| R6 | AAPL 2007 annual return | 1stock1: $84.84 → $198.08, +133.47% |
| R7 | NFLX Macrotrends 2014 row, 4 decimals | avg 5.7495, close 4.8801, −7.22% |

The search tool returns a summary, not the page, and for R2 and R7 the summary repeats the figures named in the query. They are accepted because (1) the verifier's independent search returned the same 4-decimal values, (2) they round to the 2-decimal values of the first draft's search, and (3) at 4 decimals the closes reproduce the table's own % changes exactly (2013: +297.64%; 2014: −7.22%), which the 2-decimal $1.33 did not.

Direct page fetches and price-data downloads (stockanalysis.com, stooq, Yahoo, Wikipedia, visualcapitalist.com) are blocked by this sandbox's egress policy. Every figure therefore comes from search results.

**Limits and caveats:**
- **Nothing in the format evidence was watched.** None of the @investment_timeline videos could be watched, so the payoff mechanics we add (spend line, envelope line, footer) come from ChartOrbit and the look directions.
- **Annual averages approximate monthly or daily buying.** The arithmetic mean slightly understates the shares bought, so 06b and 06c are conservative.
- **Values end at 12/31/2025, not "today".** Each pinned comment says so, with the closing price.
- **Kits (re-linted 2026-10-07, `node src/cli.mjs check`).** All three looks now render pov-race. Live Sheet renders 06b with 0 errors and 0 warnings. Scoreboard renders 06a with 0 errors and 0 warnings after the footer and verdict fix. Becker Rig's pov-race module landed while this revision was being made (uncommitted, still changing); it renders 06c with 0 errors and 0 warnings on the one-line verdict. Its shared chrome still pushes every 2-line verdict 6 px past the 1480 safe line (y 1486), which is why 06c ships a one-line verdict for now. `lookOpts`: 06a `footerSteps` and 06b `formulaBar` are read by their kits; 06c now uses only the options the Becker Rig module documents (`prop`, `jarLabel`, `endPose`).
- **No financial advice language.** These are historical "what if" maths with stated assumptions.

---

## Review log

Round-2 review: a verifier (maths, facts, contract, timing) and a hook judge (scores 7 / 7 / 6). Every issue, and what was done.

### Verifier

| # | Teaser | Sev. | Issue | What I did |
|---|---|---|---|---|
| 1 | 06a | must | Linter: the 72-character footer ran to x 1080; the 2-line verdict wrapped to 3 lines over the captions. md out of date on the kits. | Footer is now `6/29/07 close → 12/31/25 · dividends reinvested`; verdict `**≈ 74×** your $499.\n2× every **≈ 3 yrs**.` 06a lints 0 errors, 0 warnings (with the new 15-word header too). The md's kit caveat is rewritten. **For the Scoreboard kit owner:** fit the verdict to the slot height, not only its width (a 3-line wrap is not shrunk). |
| 2 | 06a | must | $3.66 launch price contradicts the $5.92 2007 close on the raw ratio; every own point 0.27% low; footer step used 74.1; pinned comment didn't multiply out and called $271.12 the actual close. | Verified the raw closes myself (ATPM: $122.04 on 6/29/2007; 1stock1: $198.08 at the end of 2007, which reproduces +133.47%). Launch price is now the derived **$3.65** (5.92 × 122.04 ÷ 198.08 = 3.6474), 136.712 shares; StatMuse's $3.66 is kept as a cross-check only (the check asserts why). All 19 own points regenerated (809.34 … 37,065.45); they match the verifier's list to the cent except two half-cent roundings (862.21 and 1,655.28 here, 862.20 and 1,655.27 there). Footer step `$499 × 74.3 ≈ $37,000`. The md says the final is rounded to the nearest $1,000 (3 s.f. would be ≈ $37,100). Pinned: "$499 ÷ $3.65 ≈ 136.7 shares … 136.7 × $271.12 (the adjusted 12/31/2025 close) ≈ $37,062". Tables and beat sheet updated ($809, $348, 136.71, 74.28). |
| 3 | 06b | must | NFLX 2012-2014 inputs cut to 2 decimals and the 2012 close mis-copied ($1.33 for $1.3227); "Known quirk" wrong; 80.6 / 188.5 / $17,675 strings wrong. | Inputs now Macrotrends' 4-decimal values (1.1855 / 1.3227, 3.5272 / 5.2596, 5.7495 / 4.8801); the check's quirk exemption is deleted and every % change now reproduces. Own points regenerated (106.98 … 17,705.59). Formula bar: `≈ $95.88 ÷ $1.19 ≈ 81 shares`, `≈ 188.8 shares × $93.76 ≈ $17,700`, and `≈ $17,700 ÷ $2,037.32 ≈ 8.7×`. For the last one I kept ≈ $17,700 rather than the suggested $17,706 so the formula bar and the tip show the same figure (8.69 either way; the check asserts both). Pinned comment: 80.9 shares, ≈ $7,600 (≈ 43%), 188.84 shares × $93.76 ≈ $17,706. Known-quirk paragraph deleted, maths table redone. |
| 4 | 06b | must | VO lines overrun once numbers are counted as spoken words. | Re-timed every line to fit 2.8 spoken words per second; the check now enforces it (numbers read out in full) on all three teasers, plus a 0.4 s tail. The re-time also follows the hook judge's new opener and the race now starting at 0.3 s, so the times differ from the verifier's proposal: e.g. "About $2,037 in bills. About $17,700 in stock." is 21.2-25.9 s (13 spoken words, 4.6 s needed), the verdict line 26.0-29.3 s. "2020: your stake tops $9,000." replaces the $13.99 line (the bill was $12.99 for Jan-Sep 2020; the Hike 5 tag shows $13.99). Verdict.t and the last formula-bar step move with it. |
| 5 | 06c | must | Payoff VO lines overrun by up to 1.4 s. | Re-timed: "2025: $17,532 of lattes." 17.35-20.6 s (9 spoken words), "Or about $24,900 in stock." 20.6-23.5 s, the verdict line 23.7-27.0 s; "That's $1,460 a year." gets 2.9 s. I dropped "End of" from the lattes line so the cash cue (20.4) lands at its end and the own final at the start of the next line. Duration 28.0 unchanged. |
| 6 | 06a | should | Smaller VO overruns; "One doubling every 3 years" lacked "about". | All lines re-timed to the spoken-word rule. Verdict line: "About 74 times. It doubled about every 3 years." (the check now requires "about" before the 3 as well as the 74). |
| 7 | 06c | should | First payoff at 3.89 s, past R10. | Went further than the suggested [1.6, 20.4]: raceT is [0.5, 20.4] (the hook judge asked for motion by 0.5 s), so the end of 2014 lands at 2.14 s, 2021 at 13.76 (ding) and 2022 at 15.42. Pop moved to 0.5, ding to 13.76. The check now asserts race start ≤ 1.0 s and first payoff ≤ 3.0 s on all three. |
| 8 | 06b | should | "Almost half from 2012's $95.88" overstated (42.8%); no end date in the pinned comment. | Clause cut from the VO. Pinned comment: "2012's $95.88 alone is ≈ $7,600 of the final (≈ 43%)" and "Valued at the 12/31/2025 close ($93.76)". |
| 9 | 06c | should | No end date in the pinned comment; "296 shares × $84.21 ≈ $24,928" doesn't multiply out. | Pinned: "End (12/31/2025 close): 296.0 shares × $84.21 ≈ $24,926, vs $17,532 of lattes." The suggested "296.0 × $84.21 ≈ $24,928" still doesn't multiply out (it is $24,926), so I used $24,926; the check asserts the product. |

### Hook judge

| Teaser | Issue / rewrite | What I did |
|---|---|---|
| all | **must, caption spoiler:** all three captions printed the result, and the TikTok note misreported @investment_timeline's captions. | Adopted. Each caption is now the POV line + a verdict with no number + hashtags (06a "The phone got old. The shares didn't."; 06b "Every price hike was a buy order."; 06c "The latte factor, tested on Starbucks itself."). All numbers moved to the pinned comment. The TikTok and Instagram notes are corrected (the benchmark's captions are the title plus hashtags; no result). |
| 06a (7) | Header with the start year; first VO "$499 on launch day. You skip the iPhone line and buy Apple stock."; start the race at about 0.3 s so it opens in the red; numberless caption. | **All adopted.** Header `POV: IN 2007 YOU INVESTED IN APPLE / INSTEAD OF PAYING **$499** / FOR THE FIRST IPHONE` (15 words, lints clean). The judge's opener is split into two lines that fit their slots. raceT [0.3, 21.4]: the tick pops at 0.84 s, $809 at 1.40 s, the line falls through $499 at 2.15 s and hits $348 at 2.51 s (thud). The 2008 VO line is gone: the dip now plays under the premise line as a picture beat. Title kept, as the judge advised. |
| 06b (7) | Header restoring "instead of paying"; first VO "Netflix was $7.99 in 2012. …"; race at 0.3 s; pre-placed "Hike 1-7" markers; numberless caption. | **Adopted**, split into two VO lines. Header `POV: You invested in Netflix / instead of paying Netflix, / ever since it was **$7.99**` (14 words, lints clean). raceT [0.3, 23.0]: first payoff at 1.91 s. The price tags now count the hikes ("Hike 1 · May 2014" … "Hike 7 · Jan 2025", lint clean). Pre-placing the 7 empty markers at frame 1 needs a Live Sheet kit feature, so it is logged as a kit request (06b per-platform notes) rather than invented as an unread `lookOpts` key. The "2013: the stock quadruples" line was cut to make room. Title kept. |
| 06c (6) | Header naming "a Starbucks latte"; first VO raising the latte factor as a question; figure acts by 0.5 s; lopsided verdict; new title (avoids 09c's yes/no); numberless caption. | **All adopted.** Header `POV: Since 2014 you invested / in Starbucks instead of paying / **$4/day** for a Starbucks latte` (15 words; re-broken from the judge's 3 lines because "…invested in Starbucks" wrapped to an orphan). First VO "Skip the $4 latte, get rich?" (the judge's line with the stake spoken), then "Since 2014, it buys Starbucks stock instead." raceT [0.5, 20.4]. Verdict: the judge's `Cups: **$0**. Stock: **≈ $24,900**.\n≈ 1.4×. Not rich. Not zero.` fails the linter only because of the Becker Rig verdict band (below), so the spec ships the one-line `**≈ 1.4×**. Not rich. Not zero.` (lint clean, word for word the VO) and the two-line version is the swap-in once the kit is fixed. Title "What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?". The honest 1.42× payoff is kept; it caps the score. |

### Check script changes (`teasers/v2/checks/06-pov-race.py`)

- New inputs: the raw AAPL closes ($122.04, $198.08) and the derived $3.65; NFLX 2012-2014 at 4 decimals. The known-quirk exemption is removed.
- New assertions: the derived launch price rounds to $3.65; the raw closes reproduce +133.47%; StatMuse's $3.66 differs from the raw ratio by more than rounding; every pinned-comment product multiplies out; "≈ 81 shares" and "≈ 8.7×" hold at both precisions; "tops $9,000" in 2020; 7 hikes; "climbs faster than the cups" over the years its line covers.
- New timing rules: each VO line's d must fit its spoken words at 2.8 per second (numbers read out in full) as well as its written words at 2.6; the last line ends ≥ 0.4 s before the end; the race moves by 1.0 s; the first year-end payoff lands by 3.0 s.
- Result: 352 checks, 0 failed (was 313).

### Studio linter (`node src/cli.mjs check`)

- 06a Scoreboard: 0 errors, 0 warnings.
- 06b Live Sheet: 0 errors, 0 warnings.
- 06c Becker Rig: 0 errors, 0 warnings with the one-line verdict. Any 2-line verdict (the original "≈ 1.4× your latte money. / Not rich. Not $0." and the judge's "Cups: $0. Stock: ≈ $24,900. / ≈ 1.4×. …" both tested) fails one check in the kit's shared verdict band: its second line ends at y 1486 > 1480. **For the Becker Rig kit owner:** the chrome verdict `fitText` caps the block height at 156 px but the second line box still crosses 1480; fit to the line boxes or lower `maxH`. The pov-race module also threw NaN `rotate()` page errors in one lint run mid-edit; they were gone in later runs.

### Hook pass (2026-10-08)

The owner rejected round 1 partly because "hooks are weak". For 06b and 06c, two judges scored the current hook and four rewrites (A-D) out of 10. Each rewrite is a header, the first VO line, the first 1.5 s and a platform title, built on the hook bank's P1-P9 and R1-R12. **Rule:** average the two judges' scores for each option. An option that either judge marks dishonest is out. Adopt the best option only if its average is **≥ 7.5** and **≥ 0.75 above the current hook**. Otherwise keep the current hook; a clearly better title may still be taken. 06a was not in this pass.

| Teaser | Option | Judge 1 | Judge 2 | Average | Decision |
|---|---|---:|---:|---:|---|
| 06b | current: "…instead of paying Netflix, / ever since it was $7.99" | 6.5 | 6.5 | **6.50** | **kept** |
| 06b | A: "…instead of paying it, / from $7.99 through 7 hikes" | 7.5 | 7.5 (dishonest) | (7.50) | out (judge 2: honesty) |
| 06b | B: "POV: In 2012 you invested … $7.99 for one month" | 7 | 6 | 6.50 | |
| 06b | C: "…instead of paying it $2,037.32 / from 2012 to 2025" | 5 | 5.5 | 5.25 | |
| 06b | D: "POV: Netflix is $19.99 now. / You cancelled in 2012…" | 7 | 7 | **7.00** | best eligible: +0.50, under 7.5 |
| 06c | current: "POV: Since 2014 you invested … $4/day for a Starbucks latte" | 7 | 7 | **7.00** | **kept** |
| 06c | A: "…instead of paying $17,532 / for Starbucks lattes, 2014-2025" | 5.5 | 5.5 | 5.50 | |
| 06c | B: "POV: In 2014 you invested … $4 for one Starbucks latte" | 5.5 | 5 (dishonest) | (5.25) | out (judge 2: honesty) |
| 06c | C: "POV: 12 years of $4/day lattes … Watch year 9." | 7 | 6 | **6.50** | best eligible: below current |
| 06c | D: "POV: Since 2014, every $1 / of your daily Starbucks order…" | 5.5 | 6 | 5.75 | |

**Why nothing was adopted:**
- **06b.** A was the only option at 7.5. Judge 2 marked it dishonest for two reasons:
  - Its title ("Netflix Hiked Your Bill 7 Times") and vo0 ("Seven price hikes since $7.99") are open-ended present-tense claims. It is now October 2026, and this file's own CNBC source has an 8th hike, to $19.99 in March 2026. Judge 1 raised the same risk ("a viewer could say 'it's 8'") and suggested "7 hikes to 2025".
  - Continuing subscribers were grandfathered past the May 2014 $8.99 price, so "your bill" was not hiked at all 7 points.

  Of the honest options, D scored best at 7.00. That is under the 7.5 floor and short of the +0.75 margin.
- **06c.** The current hook (7.00) outscored every honest option. C came closest at 6.50. Judge 2 marked B dishonest: its verdict "≈ 2.8 lattes" re-prices the result at the 2014 $4, but this file's FinanceBuzz source has the grande latte at $4.45 by 2024, where $11.08 buys about 2.5 lattes.

**Titles: both kept.** The judges scored whole hooks, not titles on their own, and no candidate title is clearly better for the current body:
- **06b-A.** "Netflix Hiked Your Bill 7 Times…" is the part judge 2 found dishonest.
- **06b-D.** "What If You'd Cancelled Netflix in 2012…" fits D's "cancel" framing. But the current header and caption say "instead of paying", and the red cell still reads "Paid to Netflix" through 2025. Judge 1 flagged that same tension in D.
- **06b-B and 06b-C.** These titles need their own bodies: B a single bill, C the $2,037.32 stake, which both judges failed on R4.
- **06c-A.** Leads with $17,532, which both judges failed on R4.
- **06c-C.** "What Happened in Year 9?" over-promises a −6.3% dip; both judges said so.
- **06c-D.** Needs the $1 rescale.
- **Current titles.** Both already carry the same-brand pairing. 06c's carries the $4 input, and 06b's carries the start year.

**What the judges agreed on, for the next round:**
- **06b, current hook:**
  - The only $ figure is a 2012 price nobody pays now, and it is read last, after the abstract clause "instead of paying Netflix, ever since it was".
  - The header has no start year (R6).
  - vo0 "Netflix was $7.99 in 2012." is trivia: no "you", no stake, no wrong belief.
  - The hike count cannot be seen on frame 1. Judge 1 confirmed that Live Sheet `marks` stay at opacity 0 until the race passes them.
  - The first payoff, +$11 at 1.91 s, is hard to see.
- **06b, levers:** "7 hikes" (A) is the strongest. It is a grievance every subscriber has lived through, and it turns into a countable loop. It needs two things before it can be rescored:
  - Date the claim in the title and in vo0, e.g. "7 hikes to 2025" or "2012-2025".
  - Get the Live Sheet change that draws the rings hollow from frame 1. Judge 2 notes this is not trivial, because the spend line is undrawn at frame 1 and its y-scale rescales live.

  D's "$19.99 now" is the strongest R3 number, but it is not an input to the race, so a viewer may assume $19.99 a month was invested.
- **06c, current hook:**
  - The header is at the 15-word cap, with the number read last and "Starbucks" twice.
  - Nothing on screen can be counted.
  - The first payoff (+8.6% at 2.14 s) is hard to see.
  - Judge 1 treats the overlap of vo0's "get rich?" with 09c as a slate issue, not a flaw in the hook.
- **06c, levers:** C's countable rail is free. Both judges confirmed that the Becker Rig module already draws the purchase dots hollow from frame 1. But C dropped "you" and the P6 verb "instead of paying", and its vo0 carries no number or stake. A future rewrite could keep the current header and add numbered year dots (`data.purchases` "Year N of 12") without the "Watch year 9" tease.

**Open items (not applied, because they were not scored):**
- **06b, the grandfathering point (judge 2).** The spend line models the Standard list price for new members. The footer ("Standard plan list price") and the assumptions disclose this. A continuing subscriber from 2012 paid less in 2014-2016 than the "Hike 1 · May 2014" and "Hike 2 · Oct 2015" tags imply. The pinned comment could say so in one clause.
- **06c, seen in today's stills.** From about 0.7 s, the Becker Rig kit labels the minimum-height ghost slab with `spend.final` ("$17,532"). It stays there until the column outgrows the minimum. At 1.5 s the screen therefore shows "$890 spent" on the counter and "$17,532" on the slab: the spend side's finish is visible from the first second. The judges docked 06c-A for exactly this. **For the Becker Rig kit owner:** consider labelling the minimum slab with the running spend, or nothing. The kit is being edited in parallel, so I did not change it here.

**Files:** no changes to the specs, beats, VO, captions, check script or `teasers.json`. The only change to this write-up is the "Hook pass" lines in the 06b and 06c sections, plus this log.
- Re-run of `python3 teasers/v2/checks/06-pov-race.py`: **352 checks, 0 failed**, ALL PASS.
- `node src/cli.mjs check` on 06b and 06c with today's kits: 0 errors, 0 warnings each.
- `node src/cli.mjs stills` at 0, 1.5 and 3.0 s:
  - **06b.** At 0.0 s: the yellow banner header with "$7.99" highlighted as its last token, the formula bar typing "= $7.99 × 12", the start row $7.99 / $7.99, the tag "Jan 2012 $7.99", the footer, and the caption "NETFLIX WAS $7.99". At 1.5 s: row 2012 reads $74 / $82, and the formula bar is complete (= $95.88). At 3.0 s: row 2013 reads $161 / $418.
  - **06c.** At 0.0 s: the 3-line header with "$4/day" in green, the figure holding the $4 coin, tips $4 spent / $4, and the 2014 timeline. At 1.5 s: "Day 1 · $4", the cup in hand, $890 spent / $967, and the caption "Skip the $4 latte, get rich?". At 3.0 s: 2015, $2,214 spent / $2,830.

### Hook pass 2 (2026-10-08)

The owner rejected round 1 partly because the hooks were weak. Two judges scored 06b's current hook, its hook-pass-1 best (R1, the old option D with its "cancelled" wording fixed) and four new rewrites (A-D), out of 10. **Round-2 rule:** average the two judges' scores for each option; an option that either judge marks dishonest is out; adopt the best option when its average is **at least 1.0 above the current hook**, even below 7.5. 06a and 06c were not in this pass.

| Option | Judge 1 | Judge 2 | Average | Decision |
|---|---:|---:|---:|---|
| current: "POV: You invested in Netflix / instead of paying Netflix, / ever since it was $7.99" | 6 | 6 | **6.00** | replaced |
| R1: "POV: Netflix is $19.99 now. / You cancelled in 2012 and / invested every bill to 2025" | 7 | 6.5 | 6.75 | +0.75, under the 1.0 margin |
| **A: "$19.99 Netflix, free for / how many years, if your / 2012-25 bills bought its stock?"** | 7.5 | 7.5 | **7.50** | **adopted (+1.50)** |
| B: "Missed Netflix in 2002? / POV: your bills, from $7.99 / in 2012, bought it instead" | 5.5 | 6 | 5.75 | |
| C: "POV: From $7.99 in 2012, / Netflix bills buy its stock. / Year 1 alone became…" | 6.5 | 6.5 | 6.50 | |
| D: "$7.99 Netflix in 2012. / Your bills → Netflix stock. / Over or under 10× by 2025?" | 6.5 (dishonest) | 6 (dishonest) | (6.25) | out (both judges: honesty) |

**Why A won (both judges called it the strongest lever in the set):**
- The viewer's own current bill, $19.99, is the first token, and it becomes the **unit of the answer** (P8 re-pricing on top of P6): H04 "Cost in Units of Starbucks Lattes" (9.86M, 106.16x), H64 "What $1 costs you by age" (1.15M, 210x median).
- It cannot be read as the amount invested, which was the judges' objection to $19.99 in hook pass 1.
- The answer slot is empty on frame 1 ("= ? years", the hook bank's §4.1 Rewrite B).
- The first payoff comes in the hook's own unit by about 2.75 s ("≈ 5 months"), and it starts small: a year of 2012 bills covers only 5 months of today's bill.
- The count moves on the beat (5 months, then 2.4, 38, 22 and 74 years), and the verdict is one lopsided, repeatable number (R12).
- Both judges recomputed every step and marked it honest: the flat price, taxes and grandfathering are disclosed, and "at $19.99 a month" qualifies the verdict.

**Why the others lost:**
- **R1:** a real R3 upgrade, but $19.99 is not a race input, so a busy viewer may read it as $19.99 a month invested. Frame 1 has no countable loop, and the first payoff is still the faint +$11 at 1.91 s.
- **B:** 2002 is someone else's regret (ChartOrbit H16's). It puts three figures in the header, and "Your bill didn't." is cryptic.
- **C:** a good open slot ("Year 1 alone became…", filled at 2.6 s with ≈ $7,600). But it has no "you" and no viewer-owned number, and the belief it names ("later bills matter more") is not one viewers hold.
- **D, dishonest:** "Over or under 10× by 2025?" answered "Under" holds only at year-end closes. NFLX's 2025 average was $109.71, and the 186.87 shares held through 2025 need only $109.02 to pass 10× the $2,037.32 of bills. The stake was about 13× at the June 2025 high.

**Applied as written:**
- header, title, footer;
- vo[0] "Your $19.99 Netflix, free. For how long?" (0.0-2.9), vo[1] "Since 2012, every bill buys Netflix stock." (3.0-5.9) and vo[8] "At $19.99 a month: about 74 years of Netflix." (26.0-29.6), with vo[4] at 13.4-16.0;
- the verdict `**≈ 74 years** of Netflix\nat $19.99 a month`;
- the 8 formula-bar steps. Steps 1, 2, 4 and 5 land 0.02 s after their year-ends (1.93, 3.55, 14.91, 18.15). The old "≈ 81 shares" step (2.6 s) and "2015 bills" step (6.0 s) are gone;
- the numberless caption and the pinned comment.

Unchanged: data (points, finals, column labels, purchases and hike tags), raceT [0.3, 23.0], hold 7.5, sfx and the 30.5 s duration.

**Deviations, with reasons:**
1. **vo[4] is "2020: about 38 years of Netflix."**, not "2020: 38 years of Netflix.". 38 is a rounding of 38.27, and the house rule, which the check enforces, puts "about" before every rounded figure in the VO (as in vo[7] and vo[8]). It is 7 spoken words, 2.50 s, so it still fits d 2.6.
2. **The pinned comment keeps two extra lines.** The method line stays ("Each year's 12 bills … buy shares at that year's average price"), and "against $2,037.32 of bills (≈ 8.7×)" is added to the candidate's product line. The 8.7× multiple left the screen with the old verdict, so the pinned comment is now the only place a viewer can check the stake against the bills.

**What the judges still flag (not fixed here):**
- The header reads as a word problem. Its conditional clause, broken mid-line ("free for / how many years, if your / 2012-25 bills…"), and the "2012-25" shorthand are slower to parse than a single clause like H45's.
- It drops P6's "instead of paying", which all 5 @investment_timeline winners carry.
- Two prices are in view at once: $19.99 in the banner and $7.99 in the start row.
- The wrong belief ("old bills are just gone") is implied, not attacked.
- The 74 years holds $19.99 flat after 8 hikes in 14 years. That is disclosed, but expect "prices will rise" comments.

**Today's render.** `node src/cli.mjs check` gives 0 errors and 0 warnings. Stills at 0, 1.5, 2.2, 3.0, 15.6 and 27.5 s:
- **0.0 s.** The 3-line banner fits, with "$19.99" in the dark pill as its first token. The bar is mid-typing "≈ stock ÷ ($19.99 × 12)" with the caret, above the start row Start $7.99 / $7.99, the tag "Jan 2012 $7.99" and the 2-line footer. Caption: "YOUR $19.99 NETFLIX, FREE". The hook reads in frame 1.
- **1.5 s.** The bar is complete: "≈ stock ÷ ($19.99 × 12) = ? years" ("years" wraps to the bar's second line). The live row reads 2012, $74 / $82.
- **2.2 s.** The bar is retyping ("≈ $1…"), the row has rolled to 2013 ($113 / $190), and the caption reads "FOR HOW LONG?".
- **3.0 s.** The bar reads "≈ $107 ÷ $19.99 ≈ 5 months", over row 2013 at $161 / $418.
- **15.6 s.** The bar is typing "≈ $9,181 ÷ $…", the tag "Hike 5 · Oct 2020 $13.99" is up, and the caption reads "38 YEARS OF NETFLIX".
- **27.5 s.** The final row reads 2025, "$2,037.32 spent" / "≈ $17,700", and the bar reads "≈ $17,700 ÷ $239.88 ≈ 74 years". The 2-line verdict card "≈ 74 years of Netflix / at $19.99 a month" fits under the footer.

**Files:**
- `studio/specs/06b-live-sheet-netflix-bill.json`: the header, footer, vo[0], vo[1], vo[4], vo[8], verdict and `lookOpts.formulaBar`. The id and file name are unchanged.
- `checks/06-pov-race.py`:
  - New input `NFLX_STD_NOW = 19.99` (CNBC 2026-03-26), used only as the unit.
  - It computes the stake in months and years of today's bill and asserts that each bar step rounds the same from the exact stake and from the whole-dollar figure shown (5 months; 2.4, 38, 22 and 74 years).
  - It also asserts the pinned 73.8 years and ≈ 8.7×, and that the halving shows in years (43.4 → 22.0).
  - The bar steps on beats are checked against their year-ends (within 0.05 s), the others against their VO lines, and every step must be one or the other.
  - It now requires "about" before the 38.
  - The "tops $9,000", "≈ 81 shares", bar "8.7×" and pinned "43%" checks left with their strings.
  - Result: **365 checks, 0 failed** (was 352). In a scratch copy, a 2.3-year bar step, a vo[4] without "about" and a 2020 bar step moved to 15.5 s each failed.
- This write-up: the 06b header block, hook rules, wrong belief, beat sheet, VO script, maths rows, the $19.99 source row, assumptions, caption, pinned comment and platform notes, plus a row in the "depart from the seeds" table.
- `teasers/v2/teasers.json`: the 06b entry's title, header, key numbers and hook score (7.5, the judges' average).

### Assembly pass (round 2, 2026-10-08): 06a and 06b

No number, label or spoken word changed. Re-run of `python3 teasers/v2/checks/06-pov-race.py`: **365 checks, 0 failed**. `node src/cli.mjs check`: 06a and 06b 0 errors, 0 warnings (also the four Live Sheet pov-race samples and stress specs).

- **06a, captions.** The kit balances caption lines by width, so it broke "You never add a / cent." and "The phone gets old. The / shares keep compounding.". `vo[2]` and `vo[3]` now carry no-break spaces (` ` in the JSON: "a cent.", "The shares", "keep compounding.") so the lines read "You never add / a cent. You just hold." and "The phone gets old. / The shares keep compounding.". The words and the timing are unchanged (the check counts ` ` as a space). Keep the escapes if these lines are edited.
- **06b, price tags (Live Sheet `formats/pov-race.js`).** Every mid-race hike tag used to be clamped left over the green line; "Hike 7" hid the 2022 dip while the VO says "It comes back". Each tag's spot is now scored over its whole time on screen. It attaches to its ring when that spot is clear, or parks in the empty top of the plot with a thin leader to its ring. All mid-race tags are set as label over price ("Hike 5 · Oct 2020" / "$13.99"). The frame-1 tag "Jan 2012 $7.99" is unchanged.
- **06b, live row.** The row number now sits on the values' line, which is lifted to make room for "spent" at the landing.
- **Verified in the stills and the MP4s:** every figure on screen matches the maths tables above. 06a: $499 / $499 at 0.0 s, $809 (1.40 s), the coral dip under $499, $10,137 as it passes $10,000 (14.8 s), ≈ $37,000, `$499 × 74.3 ≈ $37,000`, ≈ 74× / ≈ 3 yrs. 06b: $7.99 / $7.99, ≈ 5 months, 2.4 / 38 / 22 / 74 years, `≈ 188.8 shares × $93.76 ≈ $17,700`, $2,037.32 spent, ≈ $17,700, the 7 hike tags. Live counters between year-ends are interpolated (e.g. $349 at 2.51 s, against $348.41 at the 2008 close).
- **Renders:** `studio/out/06a-scoreboard-first-iphone-apple.mp4` (26.5 s) and `studio/out/06b-live-sheet-netflix-bill.mp4` (30.5 s), 1080×1920, 30 fps, with SFX. Frames pulled from each MP4 at 3 times match the stills.

### Assembly fix pass (round 2 QA, 2026-10-08): 06a and 06b

The QA judge scored 06a 7/10 and 06b 5.5/10 (lint clean, every number right). Every must and should, and the cheap nits, are applied below. Files: the two specs, `studio/looks/scoreboard/formats/pov-race.js`, `studio/looks/live-sheet/formats/pov-race.js`, this write-up and `checks/06-pov-race.py`. No kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched.

**06a (Scoreboard)**

| Sev. | QA issue | What I did |
|---|---|---|
| must | The year clock rolled into y+1 over the last ~0.22 yr of year y, so $809 showed "2008", the $349 crash "2009" and the 2022 bottom "2023"; often caught mid-roll ("201/"). | `yearV` now rolls one frame after each Dec-31 close (x = y + 0.992), in ≤ 0.03 yr (one frame here, never more than 0.1 s), with the 2025 clamp kept. Stills: 1.40 s reads 2007, 2.51 s 2008, 18.07 s 2022, and the $10,000 crossing (14.78 s, x 2020.03) reads 2020. |
| should | Flat spoken hook; 6.0-13.6 s with no number. | vo[0] "Launch day 2007: you skip the $499 iPhone and buy Apple stock." (0.0-5.8, replacing two lines); "2012: about $2,200. You just hold." (6.0-9.6, the 2012 close at 6.96) and "2017: over 10 times. The phone's long gone." (9.8-13.2, the 2017 close at 12.51, 10.83×), each with a tick. The check asserts both numbers. |
| should | The white $499 line is lost in the axis after the rescale; "spent" never on screen; the phone icon overlaps the green line's start. | A "$499 / SPENT" tag (Anton number over a coral word, from `spend.final`) rides the spend line's right end whenever it has clear room: its stints are scored at mount (no own-line stroke within 7 px, no tip, no icon), here 10.6-14.7 s and 20.0 s to the end, bumping with the finish. A purchase where both lines start now stands just left of that point (icon 42 px), so the green line never runs through it; y-axis labels step aside only under its actual ink. |
| should | The "$499 IPHONE 4GB" tag floats detached and competes with the first payoff. | Dropped (`lookOpts.tags: false`): the header, both counters and the board's phone glyph already say $499 / iPhone. |
| should | The top block is cramped (header ~20 px over the counter labels). | The scoreboard row, footer and stage start 24 px lower (the plot gives up 24 px). |
| nit | The footer step `$499 × 74.3 ≈ $37,000` repeats the counter and the verdict. | `≈ 136.7 shares × $271.12 (12/31/25 close)`: the working not shown elsewhere. The check asserts 136.7 × $271.12 rounds to the ≈ $37,000 counter. |
| nit | The plot squeezes 0.3 s before the verdict, leaving an empty band. | vo[5] "2025: about $37,000." runs to 22.0 s, so its caption covers the squeeze. |
| nit | The beat sheet had drifted (header "replaced", "$499 spent" tip). | Beat sheet rewritten from the render (above). |

**06b (Live Sheet)**

| Sev. | QA issue | What I did |
|---|---|---|
| must | "≈ 74 years" arrived as a ~56 px card in the caption band, never the biggest thing on screen. | New `lookOpts.verdict: 'hero'`: at 26.0 s the chart dims to white and **≈ 74 years** slams in over it at about 150 px, a yellow marker wiping under it, "of Netflix at $19.99 a month" beneath (hit). And the larger fix too: a new **answer row** (`lookOpts.unit`) under the race row, "Years of free Netflix", shows "? years" on frame 1 and then counts the stake live in the hook's unit all race long (months under a year, then years), ending on `unit.final` "≈ 74 years" with the selection on it. |
| must | The year counts never landed (grey mono, ≤ 0.8 s complete, typed after the VO said them, quoting dollars the live row had passed). | The answer row **lands** at each spoken year-end (`unit.holds`: 2012, 2020, 2022): it holds that year-end's exact figure for 1.3 s on a yellow cell labelled "End of 2012/2020/2022", with a pop, then catches up. The bar steps now type in ≤ 0.3 s (`typeMax`, `erase` 0.1), name their year (`2020: $9,181 ÷ $239.88 ≈ 38 yrs`) and hold until the next step; "≈ 5 months" holds 1.9-3.2 s in the answer row and until 9.2 s in the bar. vo[4] moved to 14.3 s so "38" is spoken inside the 2020 landing, after the bar has completed it. The check asserts the cell's rounding at each landing equals the bar and the VO, that each hold sits inside its VO line, and that the live value at the finish already reads ≈ 74. |
| should | Frame 1 lacked "= ? years" and the bar wrapped. | `formulaAt0: 1` now really shows the whole first step (the kit's word cut stopped at the last space, so the format treats 1 as "all"); every bar step fits one line at 40 px; the open slot is the answer row's "? years". |
| should | $7.99 / $7.99 bigger than the hook's $19.99; six prices on the cover. | `cover: 'clean'`: the race row (labelled 2012) waits with empty cells and the stake's tag pops only at 0.3 s. vo[0] is "Your Netflix, free. For how long?", so the caption carries no price. The footer no longer repeats $19.99. The cover's only price is $19.99, in the 64 px banner (and the bar's formula). |
| should | 46 px, 14-word header broken mid-clause. | `**$19.99** Netflix, free / for how many years?`: 7 words, two lines by sense, 64 px. The mechanism and horizon are on frame 1 in the sheet (labels, race row, axis). |
| should | Hike tags faded into grey ghosts; leaders crossed the green line. | Tags exit in 0.12 s (was 0.25). Park spots now span the plot's full height, and a parked tag whose leader would cross a line keeps its spot but drops the leader; the tag's ring rings out as it pops (Hikes 5-7 here). |
| should | A caption chunk ended on "2020: ABOUT". | This kit's caption chunker splits at any whitespace (no-break spaces too), so the line is now "2020: about 38 years.", one chunk. It runs to 16.7 s, past the bar's completion. |
| nit | Double "≈" (badge plus a leading ≈ on every step). | No bar step starts with "≈"; the hero has no chip. |
| nit | Loop rewind: the row reset to $7.99 / $7.99 while the chart still showed the spike. | The rewind clears the race row to empty cells and the answer row to "? years" (the clean cover). |

**Checks.** `checks/06-pov-race.py`: **378 checks, 0 failed** (was 365). New: 06a's 2012 ≈ $2,200 and 2017 10-11× claims, the new footer step's product, the new VO numbers and sync beats, two new ticks; 06b's new header, footer, bar steps, `startLabel`, `unit.final`, `unit.per`/`perMonth`/`holds`, the answer row's rounding at each landing and at the finish, and each landing inside its VO line. The 2013 bar step left with its string. `node src/cli.mjs check`: 06a and 06b 0 errors, 0 warnings; the kits' pov-race samples and stress specs (2 Scoreboard, 4 Live Sheet) also 0 errors, 0 warnings.

**Not changed:** the data (every chart point, final, purchase and hike tag), raceT, hold and durations; every new on-screen or spoken figure is derived in the check. `teasers/v2/teasers.json` still carries 06b's hook-pass-2 header and the 365-check count; it is outside this pass's files.

### Assembly pass (round 2, 2026-10-08): 06c

Files: `studio/specs/06c-becker-rig-latte-starbucks.json` (one `lookOpts` entry added), `studio/looks/becker-rig/formats/pov-race.js`, this write-up and `checks/06-pov-race.py`. No data point, final, VO line, header, footer, verdict, raceT, hold or duration changed. No kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched.

| Issue seen in the stills | What I did (Becker Rig `formats/pov-race.js` unless noted) |
|---|---|
| Coins rose into the counters: at 15.5 s a coin tumbling off the 2022 dip tipped up over "$22,862", and at 17.5 s the deposit coin's arc crossed "$24,175". | A tumbling coin's top now stays under the stage top: it tips and flips open only as far as the room above it allows, more as it falls. The deposit coin's arc is clamped under the counters (on a tall tower it skims in and sinks into the top). |
| The "Day 1 · $4" tag sat against his head; at 2.2 s the pencil ran through "$4". | Each tag's right edge is held 18 px left of everything the figure draws (head, pencil, limbs) over the tag's whole life. |
| The running stock counter eased onto 24,900 (the rounded final) in the last 0.5 s, so "$24,900" showed with no "≈" before the swap. | When a final is approximate ("≈ …"), the counter runs to the exact last point and the swap shows the rounding: $24,928 → ≈ $24,900 (both in the maths table). |
| The plate's hit lines shot up through "Starbucks stock"; "≈" touched the plate's left edge. | The end impact keeps its hit, shake and punch, but its burst is one-sided (right and down onto the tower). The plate is sized from the laid-out final string, so the padding is equal on both sides. |
| The payoff was no bigger than the spent counter (both 76 px). | As the plate lands it grows 1.2× about its top-right corner (the number to about 90 px) while the spent digits step down to 64 px (" spent" keeps 44 px); the growth is bounded by the gap beside the spent number and the tower top. |
| "By 2021, you've doubled your money" had only the ding and a one-frame counter reading. | New option `lookOpts.multiple` `{ x: 2021.99, t: 13.76, k: 2, label: "2×", hold: 1.3 }`: on the ding a green dotted line at 2 × the 2021 spend ($23,376) draws from a "2×" label (60 px) across to the tower, whose top sits just above it; it fades from 15.06 as the 2022 dip takes the tower under it ("Then it stalls"). |

**Checks.** `checks/06-pov-race.py`: **385 checks, 0 failed** (was 378). New: the "2×" label string (the whole multiple: $24,343 ÷ $11,688 = 2.08, rounded down to 2), the tower ≥ 2 × the spend at the end of 2021, `multiple.x` = the 2021 year-end, `multiple.k` = 2, its `t` on that beat (13.76) and inside vo[4]. `node src/cli.mjs check`: 06c 0 errors, 0 warnings; the two Becker Rig pov-race samples and the two Live Sheet pov stress specs rendered in the Becker Rig look also 0 errors, 0 warnings.

**Verified in the stills and the MP4:** frame 1 shows the 3-line header with "$4/day", the footer, the $4 coin and $4 spent / $4. Stills on the exact year-ends read $1,460 / $1,586 (2.14 s), $2,920 / $3,997 (3.80), $10,228 / $20,521 (12.10), $11,688 / $24,343 (13.76), $13,148 / $22,808 (15.42) and $17,532 / $24,928 (20.40), as in the maths table; then ≈ $24,900 on the plate, "2×" at 13.8-15.3 s, and the verdict ≈ 1.4× from 23.7 s. Counters between year-ends are interpolated. **Render:** `studio/out/06c-becker-rig-latte-starbucks.mp4` (28.0 s, 1080×1920, 30 fps, with SFX); frames pulled from it at 0, 14.3 and 21.5 s match the stills.

### Assembly fix pass (round 2 QA, 2026-10-08): 06c

The QA judge scored 06c 6.5/10 (lint clean, every number right) with one must and six shoulds. All of them, and the nits, are applied below. Files: `studio/specs/06c-becker-rig-latte-starbucks.json`, `studio/looks/becker-rig/formats/pov-race.js`, this write-up and `checks/06-pov-race.py`. No data point, final, header, verdict, raceT, hold or duration changed. No kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched; the new `lookOpts` are documented in the format file's header comment (the kit README's pov-race table still lists only the older options).

| Sev. | QA issue | What I did (Becker Rig `formats/pov-race.js` unless noted) |
|---|---|---|
| must | The 2× beat read "2022" and $12,250 / $23,752 (1.8-1.95×) under a "2×" label; the 2021 close was on screen for one frame. | `lookOpts.multiple` now **pauses the race clock** at its x for its hold (opt out with `pause: false`): 13.76-15.06 s the year reads 2021, the counters read $11,688 / $24,343, and both piles stand still under the line at 2 × $11,688. The purchase at that x waits for the end of the pause, so the figure watches the tower through the beat. 2022-2025 are re-timed (1.34 s per year) so 2025.99 still lands at 20.4; the 2022 dip moves to 16.39 s, inside vo[5]. The check's race clock (`chart_t`) mirrors the pause. |
| should | "Not zero" had nothing on screen; the spent column read as a pile you still own. | New `lookOpts.spentLeft: "$0 left"`: at the verdict (23.7 s) the spent column empties to its dashed outline (fill, coin lines and slot fade) and a red "$0" (84 px) over "left" (44 px) pops inside it. |
| should | "That's $1,460 a year" had no visual; year-end values were never held. | New `lookOpts.chip`: a red "+$1,460" tag pops on top of the spent column at the 2017 close (7.12 s, a 365-day year) and rides it to 8.52, inside vo[2]. New `lookOpts.land: 0.12`: every year-end holds its exact figures (year label and both counters) for 0.12 s, 3-4 frames; stills at each close read the maths table exactly (2014 $1,460 / $1,586 … 2024 $16,072 / $24,865). |
| should | The payoff plate was wedged 8 px under the 2-line own label and 10 px over the tower. | `own.label` is now one line, "In Starbucks stock". The counters sit 16 px lower under their labels when there is a plate, and the stage starts low enough that the plate at 1.2× clears the tallest tower top by ≥ 24 px, counting half a coin of rounding and the end mark's line (measured at 21.5 s: about 25 px to the label, about 40 px to the tower). |
| should | Crowded top: a 2-line mono footer under the hook. | Footer cut to one line: `$4 ≈ a grande latte · with dividends`. The suggested "$4 ≈ a grande latte · dividends reinvested" wraps at the kit's 40 px mono, leaving "reinvested" alone on a second line. "Each year at its average price" and "reinvested" are in the pinned comment and the assumptions. Net of the extra plate clearance, the 1-line footer and label give the stage about 45 px more height. |
| should | The verdict is caption-sized and the ≈ 1.4× has no device on the piles. | New `lookOpts.endMark: { label: "≈ 1.4×" }`: on the verdict ding a green dotted line draws along the tower's top coin from over the spent column to the tower, with "≈ 1.4×" (60 px) under its left end, above the red paid line (1×). The verdict band's size is set by the shared `lib.js` chrome (`fitText` with `minPx` 44 and a 156 px `maxH`). That is reported to the kit owner; this pass does not change it. |
| should | The cup heap spilled over the ghost plinth's dashed outline and read as a grey scribble. | The heap is now a compact mound (4 across, tipped ≤ 30°, 36 px apart) shifted until its left edge is 24 px clear of the plinth (x ≈ 305; the plinth ends at 276), and the figure stands at x 510 (was 490). On a heap of many items the cracks fade once an item has landed; with one or two items they stay. |
| nit | "Day 1 · $4" stayed up to 2.3 s. | New `lookOpts.tagLife: 0.8`: the tag is up 0.44-1.3 s. |
| nit | Unlabelled rail ticks and an unexplained red start dot. | New `lookOpts.rail: "plain"`: no ticks and no purchase dots, just the progress line, with the final year ("2025") at its right end. |
| nit | "it" had no antecedent in vo[1]. | vo[1] is now "Since 2014, that $4 buys Starbucks stock." (2.6-5.85 s; 8 spoken words by the check's count, 9 if "$4" is read "four dollars", 3.21 s). vo[2] moved to 5.9-8.8 and vo[3] to 8.85-12.35; vo[4] onward did not move. |
| nit | At the swap a grey "$24,928" showed under a half-faded plate, and a burst dash reached x ≈ 1000. | The swap is a hard cut on the hit frame (20.4 s). The number and the plate pop together about the plate's corner, so the number never sticks out of the plate. Burst strokes are cut at x 936 and dropped if they start there. |
| nit | The deposit coin sank edge-on into the tower's top coin (18.6-19.1 s). | The deposit coin now stops spinning, flattens and lands flat on the top coin with a squash. When the tower top is too close to the counters for a coin to come down onto it (2021 onward), the coin rises beside the tower, clear of its edge, and slides flat onto the top. |
| nit | "$17,532" was spoken before the counter landed. | Left as is (QA: acceptable). The spend counter still lands at 20.4 s, inside vo[6] (17.35-20.6 s). |

**Checks.** `checks/06-pov-race.py`: **398 checks, 0 failed** (was 385). New or changed checks:
- The footer, the one-line own label and vo[1]'s numbers (2014, 4).
- `chip.text` = "+$1,460" = $4 × 365 for 2017, not a leap year; the chip's x is the 2017 close, and its time sits inside vo[2].
- `spentLeft` = "$0 left". `endMark.label` = "≈ 1.4×", the verdict's multiple. Both land at the verdict.
- The race clock pauses at the 2021 close for the whole 2× hold (13.76-15.06), and the hold ends within the 0.3 s tolerance of vo[4].
- `chart_t` follows the pause, so the 2022 dip sync is now t 16.39, inside vo[5].

`node src/cli.mjs check`: 06c 0 errors, 0 warnings. These also lint with 0 errors and 0 warnings:
- the two Becker Rig pov-race samples;
- 06a, 06b and the Live Sheet / Scoreboard pov samples, re-skinned in Becker Rig as stress cases.

**Verified in the stills and the MP4:**
- Frame 1: the 3-line header, the 1-line footer, the "2014 ——— 2025" rail, $4 spent / $4, and the $4 coin.
- Every year-end matches the maths table above. Stills on the closes read $1,460 / $1,586 (2.17 s), $2,920 / $3,997 (3.83), $4,384 / $5,199 (5.50), $5,844 / $6,955 (7.13, with "+$1,460"), $10,228 / $20,521 (12.13), $11,688 / $24,343 at both 13.77 and 15.03 (year 2021, "2×"), $13,148 / $22,808 (16.40), $14,608 / $23,942 (17.77), $16,072 / $24,865 (19.10), and $17,532 / ≈ $24,900 (20.40).
- At 24.5 s: "$0 left" in the empty outline, "≈ 1.4×" on the tower top, and the verdict.

**Render:** `studio/out/06c-becker-rig-latte-starbucks.mp4` (28.0 s, 1080×1920, 30 fps, with SFX). Frames pulled from it at 0, 7.2, 14.4, 21.5 and 24.5 s match the stills.

### Port to Scoreboard (2026-10-08): 06b

The owner kept two looks, Scoreboard and Becker Rig, and retired Clean Sheet and Live Sheet. 06b moved from Live Sheet to Scoreboard. The new id is `06b-scoreboard-netflix-bill`. The Live Sheet spec was moved with `git mv` to `studio/specs/retired/06b-live-sheet-netflix-bill.json`. The bar is 06a, the format's Scoreboard teaser.

Files changed:
- `studio/specs/06b-scoreboard-netflix-bill.json` (new) and the retired spec;
- `studio/looks/scoreboard/formats/pov-race.js`;
- this write-up and `checks/06-pov-race.py`.

No kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched, and neither was any other format's file; the new options are documented in the format file's header comment.

**Kept as verified.** None of these changed:
- the hook (header and vo[0]), the footer and all 9 VO lines with their timings;
- the verdict;
- every number: all data points, both finals, the 8 purchases and the hike tags;
- raceT [0.3, 23.0], hold 7.5, the 30.5 s duration, and the sfx times.

Only the sfx kinds changed: the 7 hike ticks are now `pop`, the kit's own purchase sound, so the kit does not double them. The 2022 thud and the 23.0 cash are kept.

**The look.** The Live Sheet-only options were dropped: `cover`, `startLabel`, `formulaAt0`, `typeMax`, `erase`, `verdict: "hero"`, `unit` and `formulaBar`. Every job they did now has a Scoreboard form:

| Live Sheet | Scoreboard (`lookOpts`) |
|---|---|
| Clean cover: an empty race row, the stake's tag at 0.3 s | `cover: "clean"`: the board's two counters wait LED-off ("—", decoration) and slam in at 0.3 s; the first ticket and its tag drop in with the race |
| Answer row "Years of free Netflix · ? years", live, `holds` at 2012/2020/2022 | `unit`: the answer row in the bottom bar. Line 1 is the working; line 2 is the years, 96 px, green, beside a ticket. It shows "? YEARS" on frame 1, counts live from the IN STOCK counter, and lands at the three spoken year-ends (each with a ding, held 1.3 s) and at the finish |
| Formula bar step 0 `= stock ÷ ($19.99 × 12)` | answer row line 1 at rest: `STOCK ÷ ($19.99 × 12)` |
| Bar steps 1, 3, 4 (`2012: $107 ÷ $19.99 ≈ 5 months`, …) | each hold's `work` (line 1) + `display` (line 2): the same string, split at the "≈" |
| Bar steps 2, 5, 6 | `footerSteps` at 9.2, 21.2 and 26.0 s. Step 2 is capitalised as a footer line ("Each year: bills ÷ avg price"); it is the only wording change, and no number changed |
| Hero verdict (≈ 74 years at ~150 px over the dimmed chart) | `payoff`: at 26.0 the board hard-cuts to one hero number, a ticket + ≈ 74 YEARS at 140 px. It rolls from 0 and lands at 27.4. The chrome's verdict takes the answer row's slot |

**What the Scoreboard adds.** The 2022 landing is coral on a thud (`tone: "bad"`): it is the halving. The years are a full hero number at the payoff, not a card, so the hook's question gets its answer directly under it.

**Kit work (Scoreboard `formats/pov-race.js`).**
- **New options:** `unit` (the answer row; the stage ends just above it, so the plot here is 409 px tall against 06a's 577), `cover: "clean"` and `payoff`.
- **Parked tag spots:** a price tag may now park in the plot's top band, detached from its ticket and over the faint year clock, which dims under it.
  - Why: on the shorter plot, every spot at Hike 7's ticket (21.4 s) covered the green line's 2022 dip and recovery.
  - Parked spots cost more, so a tag parks only when its attached spots are clearly worse. Here only Hike 7 parks.
- **Icon placement fix (found in the stills):** the answer row and the payoff hero now become visible before their number is set, because the icon is placed from the number's laid-out width.
- **Other teasers:** 06a and both kit samples (`pov-race.json`, `pov-race-2.json`) still lint with 0 errors and 0 warnings. The sample's contact sheet is unchanged: its taller plot keeps every tag attached, and 06a has tags off.

**Checks (`checks/06-pov-race.py`): 419 checks, 0 failed** (was 398).
- **Updated:** the 06b id and look.
- **New strings:** `unit.formula`, the three holds' `work` and `display`, `unit.final` and `finalWork`, `payoff.display`, and the three `footerSteps`. Each is rebuilt from the same computed working as the old bar steps.
- **New assertions:**
  - `unit.per`, `perMonth` and the hold x's;
  - each hold lands inside its VO line, names its year, and equals the kit's live count at that exact year-end;
  - a hold is coral exactly when the stake fell;
  - the holds clear each other and the finish;
  - the final equals the live count at the finish, and `finalWork` divides out to it;
  - `payoff.t` = `verdict.t`, the payoff equals the verdict's emphasised answer, and the roll ends inside vo[8];
  - the footer steps start with their VO lines.
- **Removed:** the formula-bar checks, which left with their strings.
- **Mutation test** (scratch copies, each made to fail): a hold display of 39 years, a hold at 2021, a 2022 hold not coral, a payoff at 25.0, a footer step at 9.0, and a hold's working naming 2021.

**Lint, stills, render.**
- `node src/cli.mjs check`: 0 errors, 0 warnings.
- **Stills read** at 0, 0.3, 0.45, 1.95, 3.55, 4.2, 6.5, 9.25, 9.75, 11.8, 14.6, 14.95, 16.6, 18.2, 19.5, 21.25, 21.5, 23.05, 26.05, 26.6, 27.5 and 30.47, plus the contact sheet. Every figure on screen matches the maths table:
  - $19.99 and "? YEARS" on the cover;
  - $7.99 / $7.99 at 0.3 s;
  - ≈ 5 months with `2012: $107 ÷ $19.99`;
  - the seven hike tags $8.99 … $17.99;
  - ≈ 38 years with `2020: $9,181 ÷ $239.88`;
  - ≈ 22 years in coral with `2022: $5,289 ÷ $239.88`;
  - `188.8 shares × $93.76 ≈ $17,700`;
  - $2,037.32 / ≈ $17,700 and ≈ 74 years with `$17,706 ÷ $239.88` at 23.05 s;
  - the hero ≈ 74 YEARS with `$17,706 ÷ $239.88 ≈ 74 years`;
  - the verdict.
- Counters between year-ends are interpolated: e.g. $119.39 at 1.95 s, after the $106.98 close. The board's counters keep running during a hold, as the Live Sheet's race row did; line 1 names the year being shown.
- **Render:** `studio/out/06b-scoreboard-netflix-bill.mp4` (30.5 s, 1080×1920, 30 fps, with SFX). Frames pulled from it at 0, 18.2 and 27.5 s match the stills (mean pixel difference under 1, which is compression).

**Open items:**
- The 74 is said three times from 26.0 s: the hero, the footer working and the verdict. The Live Sheet had the bar, the answer row and the hero verdict. The hero is the answer, the verdict its sentence.
- `teasers/v2/teasers.json` still names 06b's Live Sheet id (3 places). It is outside this port's files.

### Port QA fix pass (2026-10-08): 06b Scoreboard

The QA judge scored the port 6.5/10. Lint was clean and every number was right, but the payoff sequence was muddled. Every must and should and every nit is applied below. Files: `studio/specs/06b-scoreboard-netflix-bill.json`, `studio/looks/scoreboard/formats/pov-race.js` (options documented in its header comment), this write-up and `checks/06-pov-race.py`. No kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched, and neither was any other format's file.

**Kept as verified:** the hook (header and vo[0]), all 9 VO lines with their wording and timings, the verdict, every data point, both finals, the 8 purchases and their tags, raceT [0.3, 23.0], hold 7.5 and the 30.5 s duration. One display string changed: the answer row's finish working (below).

| QA | Fix |
|---|---|
| **must** (26.0-27.4): the hero counted up from 0 ("≈ 15 YEARS", "≈ 60 YEARS") under a footer and verdict that already said 74, after the answer row had landed 74 at 23.0 | `payoff.dur: 0`: no roll. At 26.0 the board hard-cuts to the hero, which shows the landed **≈ 74 YEARS** whole. The 1.13 bump, glow, stage bloom and hit all land at 26.0, together with the footer step and the verdict, so no frame shows a part-count. The format reads `dur: 0` as this hard cut (the roll stays for `dur > 0`); the roll cue is dropped and the hit moves to 26.0. |
| **should** (23.0-26.0): two glowing green numbers landed at the finish, and the 74 landed 4.7 s before the VO said it | At the finish the answer row has no landing: no bump, line 1 cuts softly (no slam), line 2 rests on ≈ 74 YEARS with its "≈" an unlit ghost, dimmed to half over 0.3 s. The board's ≈ $17,700 is the only lit number from 23.0 to 26.0, and the 74 is lit once, by the payoff. |
| **should** (holds): the board and the year clock ran on while the answer row held a year-end (IN STOCK $417.95 and 2013 beside "2012: $107") | **The race clock pauses on each hold** (`unit.pause`, on by default when `unit.holds` exist), as 06c's does on its 2021 close. Holds pin their times (`holds[].t`): 2012 at 1.91-3.21, 2020 at 14.9-16.7 and 2022 at 18.5-19.8, each inside its VO line. During a hold the board, both tips, the lines and the year clock show that year-end: $95.88 / $106.98 in 2012, $1,095.92 / $9,181 in 2020, $1,449.68 / $5,289 in 2022. The moving stretches run at 1.63, 1.46, 0.90 and 1.07 s per year, and the race still ends at 23.0. The hike pops and the 2022 thud move with the clock (sfx at 5.17, 7.24, 10.17, 11.99, 14.55, 17.61, 18.5 and 21.94; the cash stays at 23.0). |
| **should** (final frame): tickets in 2014-2015 sat under the green line | `pips: true`: only the latest purchase stands as a full ticket. Once the next bill change lands, a ticket shrinks down into a small white pip on the spend line (0.25 s). The final frame has one ticket (Hike 7, where the lines are far apart) and seven pips. |
| nit (0.0): the LED-off board showed two small dashes | Unlit ghost digits at counter size, 16% white, in the shape of the first value: "$–.––". It reads as a scoreboard waiting and carries no price. |
| nit (16.19-16.7): the row caught up to ≈ 42 while the caption still said 38 | Per-hold `hold`: 2020 holds 1.8 s, to 16.7, the end of its caption (with the clock paused, the row and the board stay on 2020). |
| nit (21.4-23.0): the Hike 7 tag parked top-left, about 550 px from its ticket | Tags gained a **top-band** spot: the stage strip over the plot, the place chart-race uses for event flags, above the lines and tips and over the ticket's x. Hike 7 now sits in the same strip as hikes 3-6 and ends just left of its ticket: a tag directly over the ticket would cover the own line's tip, which is climbing steeply into the top band. |
| nit (23.0-26.0): ≈ $17,700 and $17,706 shared a frame | `unit.finalWork` is now `≈ $17,700 ÷ $239.88` (73.79, still ≈ 74), the board's own figure. $17,706 appears only in the footer step at 26.0, after the board has gone. |
| nit (0.3-21.4): small plot; tags in the x-axis strip | The answer row's line 1 is 48 px (it was 54; at 46 px the ÷ dipped to 39 px during the slam's undershoot, under the 40 px floor), so the plot gains 6 px (409 → 415). A tag now costs extra for every x-tick label it would hide, so mid-race tags take the top band or the empty future right of the race front: hikes 1-2 sit right of the front, hikes 3-7 in the top band, and the year labels read all race long. |

**Checks (`checks/06-pov-race.py`): 436 checks, 0 failed** (was 419).
- **New:** `unit_knots()` rebuilds the kit's paused clock, and `chart_t` uses it for 06b, so every sync and sfx assertion now runs on the paused clock.
- **New assertions:**
  - for each hold: the race pauses at its x for its own hold, `holds[].t` is when the race reaches it, the board holds a real year-end point, and the hold lasts through its VO line (2020 to 16.7);
  - holds clear each other and the finish, each by its own hold time;
  - `finalWork`'s stake is the board's final, and ≈ $17,700 ÷ $239.88 rounds to the final;
  - the payoff equals the answer row's final, lands whole (`dur` 0) with the footer's last step, and lands inside vo[8].
- **Replaced:** "roll ends inside vo[8]" (there is no roll now).
- **Mutation test** (scratch copies, each fails): a payoff roll of 1.4 s, `pause: false`, the 2020 hold back to 1.3 s, `finalWork` with $17,706, the 2022 hold at 19.3 s, and one sfx left on the old clock.

**Lint, stills, render.**
- `node src/cli.mjs check`: 0 errors and 0 warnings for 06b, 06a and both Scoreboard pov-race samples.
- 06a does not use any of the new options. Its fresh stills match its shipped MP4 to within compression (mean pixel difference 0.7-1.5).
- In the `pov-race.json` sample, the mid-race tags now take the top band rather than the axis strip.
- **Stills read:** 0, 0.35, 1.95, 3.0, 5.5, 7.6, 10.4, 12.3, 14.9, 16.5, 17.9, 18.6, 22.2, 23.05, 25.5, 26.0, 26.1, 26.6 and 30.47, plus the contact sheet. Every figure matches the maths table, and each hold shows the same year on the board, the clock and the answer row.
- **Render:** `studio/out/06b-scoreboard-netflix-bill.mp4` (30.5 s, 1080×1920, 30 fps, with audio, 19 sfx). Frames pulled from it at 0, 3.0, 16.5, 18.6, 23.05, 26.1 and the last frame match the stills (mean pixel difference 0.6-1.1, which is compression).

**Open item:** `teasers/v2/teasers.json` still names 06b's Live Sheet id. It is outside this pass's files.

### Condensed cut (2026-10-12): 06c

**Owner's note:** "There are too many still moments, which is a killer for a short. Condense it. The CTA (end card) is good."

**Files:**
- New: `studio/specs-wip/06c-becker-rig-latte-starbucks.json`, a retimed copy of the 28.0 s spec.
- Changed: this write-up and `checks/06-pov-race.py`.
- Not touched: `studio/specs/06c-becker-rig-latte-starbucks.json` (another workflow is snapshotting the specs' cue lists), every kit file (`studio/looks/**`), `studio/src/**` and `renders/`.
- Renders are in `/tmp/06c/` only. Nothing is committed.

**Kept:**
- The hook: header, footer, the first caption and the $4 coin on frame 1.
- Every data point and both finals.
- The verdict `**≈ 1.4×**. Not rich. Not zero.`
- The purchases and `multiple` x / k / label.
- `endMark`, `land` 0.12, `tagLife` 0.8, `rail` plain and `endPose` shrug.
- The 2.5 s end card (the brand layer is untouched).

**Measured before** (28.0 s + 2.5 s card, `renders/channel/06c-becker-rig-latte-starbucks.mp4`). Method: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG); a frame is still when YAVG < 0.15.
- Still runs ≥ 0.4 s: 20.97-23.17 (2.20 s, after the plate landed, under "Or about $24,900 in stock."), 24.10-28.03 (3.93 s, the verdict hold) and 29.23-30.50 (the card hold).
- Near-still: 0.0-0.5 s (only the caption moves) and the 2× pause, 14.0-15.06 (the figure idle, YAVG 0.13-0.25).
- The race ran at 1.66 s per year to 2021 and 1.34 s after. Of the 28 s, 7.6 s came after the reveal at 20.4.

| | 28.0 s cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 28.0 / 30.5 s | **16.0 / 18.5 s** | The owner's note. Brief: a body of about 16-19 s, plus the card |
| `raceT` | [0.5, 20.4] | [0.5, 13.3] | About 1 s per year: 1.07 to 2021, 0.84 after, 0.99 moving average (the 2× pause excluded) |
| `multiple` | t 13.76, hold 1.3 | t 9.03, hold 0.9 | t is the 2021 close on the linear clock: 0.5 + 7.99 / 11.99 × 12.8 = 9.03. The 1.3 s pause had been near-still; 0.9 s still holds the 2× under "By 2021, your money doubled." (8.5-10.25) |
| `chip` | 2017 close, hold 1.4 | 2015 close, hold 0.9 | It lands inside "That's $1,460 a year." (1.8-3.6), at the first year-end after the 2014 payoff |
| `spentLeft` | "$0 left" at the verdict | `{ "text": "$0 left", "t": 13.85 }`: T1 + 0.55, just after the shrug | Something now lands between the reveal and the verdict: "$0 left" under "Or about $24,900 in stock." |
| `verdict.t` | 23.7 (T1 + 3.3) | 14.4 (T1 + 1.1) | Lands within 1.5 s of the reveal and holds 1.6 s before the card |
| `data.hold` | 7.6 | 2.7 | = duration − raceT[1] |
| `sfx` | pop 0.5, ding 13.76, cash 20.4 | pop 0.5, ding 9.03, cash 13.3 | Each on its beat |
| `vo` | 9 lines, 54 words, paced for narration | 8 lines (7 shown), 35 words shown, paced as captions | See "Captions" in the 06c section |

**Iteration.** The first version (raceT [0.5, 12.97], 2× at 8.81, "$0 left" at 13.55, verdict at 14.4 = T1 + 1.43) linted and rendered clean. It still had a 0.57 s still at 13.77-14.33: the "$0 left" pop (a pale fill fading out) barely registers as a frame difference, so the gap from the shrug to the verdict was too long. Fix: the race now ends at 13.3, the verdict lands at T1 + 1.1, and "$0 left" lands right after the shrug.

**Measured after** (16.0 s + 2.5 s card, `/tmp/06c/final/06c-becker-rig-latte-starbucks.mp4`):
- Still runs ≥ 0.4 s: only 14.80-16.03 (the verdict hold, 1.23 s) and 17.23-18.50 (the card hold, as before).
- Runs ≥ 0.25 s before the verdict: 9.63-9.93 (0.30 s, the end of the 2× pause) and 14.07-14.40 (0.33 s, after "$0 left").
- The longest still before the verdict is 0.33 s (was 2.20 s).
- Near-still check: 13.75-14.4 has YAVG 0.08-0.10, but the red 84 px "$0 left" pops in the middle of it. Nowhere else does only a counter move: the figure buys a cup every 1.07 s up to 2021, and coins land on or tumble off the tower every year after.

**Stills read** (`node src/cli.mjs stills`), plus a 16-frame contact sheet:
- Times: 0, 0.5, 1.58, 2.1, 2.65, 3.4, 3.71, 4.78, 5.85, 6.91, 7.98, 8.6, 9.05, 9.5, 9.9, 10.5, 10.79, 11.63, 12.47, 13.0, 13.31, 13.6, 14.1, 14.4, 15.0, 15.95, 17.0 and 18.47.
- Every year-end matches the maths table:

| t (s) | Spent / owned | Also on screen |
|---|---|---|
| 1.58 | $1,460 / $1,586 | |
| 2.65 | $2,920 / $3,997 | "+$1,460" |
| 3.71 | $4,384 / $5,199 | |
| 4.78 | $5,844 / $6,955 | |
| 5.85 | $7,304 / $9,633 | |
| 6.91 | $8,764 / $14,988 | |
| 7.98 | $10,228 / $20,521 | |
| 9.05, 9.5, 9.9 | $11,688 / $24,343 | "2×" |
| 10.79 | $13,148 / $22,808 | |
| 11.63 | $14,608 / $23,942 | |
| 12.47 | $16,072 / $24,865 | |
| 13.31 | $17,532 / ≈ $24,900 | |

- After the race: "$0 left" at 14.1; the verdict, the "≈ 1.4×" mark and "$0 left" at 15.0; the end card at 17.0.

**Lint:** `node src/cli.mjs check specs-wip/06c-becker-rig-latte-starbucks.json`: 0 errors, 0 warnings (18.5 s = 16.0 + 2.5 s end card).

**Render and sound:**
- `render` wrote `/tmp/06c/06c-becker-rig-latte-starbucks.mp4`: 18.5 s, 555 frames, 35 sfx, −14.04 LUFS, TP −1.77 dBTP.
- `sound … --video /tmp/06c --out /tmp/06c/final --score` rebuilt the audio on that picture. The video md5 is identical; P is at 13.3 (riser rule); 126.3 / 133.3 BPM; cue onsets within 0.17 ms.
- `audit`: −14.11 LUFS, TP −1.77 dBTP, LRA 5.65, silence 0%, no gap, L/R correlation 0.88, symbolic score checks 15/15.
- For comparison, the 28.0 s render audits at −14.08 LUFS, TP −1.52 dBTP, silence 0%.

**Check (`checks/06-pov-race.py`):**
- **`--spec [KEY=]PATH`** (repeatable) checks a spec in place of `studio/specs/<id>.json`. The default run is unchanged.
- **Two cuts.** 06c has two expectation sets, picked by the spec's duration: the 28.0 s cut (what `studio/specs/` holds) and the condensed cut. The default run gives 441 checks, 0 failed. With `--spec studio/specs-wip/06c-becker-rig-latte-starbucks.json` it gives 434 checks, 0 failed.
- **New for the condensed cut:**
  - captions paced for reading, d ≥ max(1.2 s, 0.12 s per word), instead of for narration;
  - a 16-19 s lane;
  - the chip on the 2015 close, inside vo[1];
  - "2×" inside vo[3], with its `t` on the linear raceT clock (±0.005 s);
  - "outruns the cups" checked on the years under the caption on the race clock (2017-2021);
  - "$0 left" at least 0.3 s after the reveal and before the verdict, inside vo[6];
  - a moving pace of 0.8-1.0 s per year;
  - the verdict ≤ 1.5 s after the reveal and held 1.2-1.6 s;
  - caption gaps < 0.2 s.
- **Replaced:** the fixed "x 2019.0-2021.1" check is now a window computed from the spec (both cuts).
- **Mutation test** on scratch copies: 9 of 9 caught, each with exit 1 and a named failure. The mutations were: 2× t 9.2; the chip on 2016; "$0 left" at 14.3; the verdict at 15.0; raceT ending at 16.0; a 1.0 s caption; "$17,352" in a caption; "about" dropped; "outruns" moved over 2016.

**To promote** (once spec edits are allowed again): copy the WIP spec over `studio/specs/06c-becker-rig-latte-starbucks.json`. Then either render with `--final` or copy `/tmp/06c/final/06c-becker-rig-latte-starbucks.mp4` into `renders/channel/`. After that, a plain `python3 teasers/v2/checks/06-pov-race.py` checks the condensed cut.

**Open items:**
- These go stale on promotion and are outside this pass's files:
  - `teasers/v2/teasers.json`: 06c's runtime and the check count.
  - `publishing/06c-becker-rig-latte-starbucks.{md,json}`: `current_render`; the cover's `frame_in_current_render_s` (24.5 s now, 15.5 s in the condensed render); "436 checks" (now 441 by default, 434 with `--spec` on the WIP).
- The figure is small, in a mostly empty lower frame. That is the kit's layout, which was off limits here.

### Condensed cut: fix pass (2026-10-12): 06c

The critic scored the condensed cut 7/10: 1 must, 4 shoulds and 4 nits. All of them are applied or answered below.

**Files:**
- Changed: `studio/specs-wip/06c-becker-rig-latte-starbucks.json`, `teasers/v2/checks/06-pov-race.py`, this write-up and the publishing sheet (`publishing/06c-becker-rig-latte-starbucks.{md,json}`: check counts and the pending condensed render, no copy changes).
- Not touched: `studio/specs/06c-becker-rig-latte-starbucks.json`, `studio/looks/**`, `studio/src/**`, `studio/sound/**` and `renders/`. Nothing is committed.
- Renders are in `/tmp/06c/final/` only. The sound workflow was editing `studio/src/sound` in place during this pass (its react-bus migration), so every sound build, `render`, `sound`, `audit` and `verify` here ran on a snapshot of the committed studio (`git archive HEAD studio`, HEAD 9f82341) in `/tmp/06c/snap/`. The spec's kit and picture code are identical there.

| Severity | Critic's item | Resolution |
|---|---|---|
| must | The cut fails the sound acceptance gate: A11 (3.161% of samples over 1 dB of limiting, max 4.99 dB at 13.30, global −2.5 dBTP ceiling) and BANDS (250 Hz −1.9, 500 Hz −1.2 re 1 kHz). | **Now 46/46 (42 gated + 4 reported/info), but BANDS has no margin.** About 30 scratch variants were verified (`/tmp/06c/fix/var/*`, each with `verify.txt`). Findings: (1) at P = 13.3 the AAC encode overshoots the payoff transient at 13.304 s by 1.1-7.9 dB depending on unrelated gains, so A11, A2/A5 and B8 flip from variant to variant; with the race ending at **13.0 s** the overshoot at the payoff falls to 0-0.6 dB in every variant tried. (2) BANDS is a 1 kHz vs 2 kHz tilt problem: in a 15.7-16 s body the spec's 2× ding carries 50-70% of the SFX energy in the 1 kHz octave, while the kit's verdict ding (F#6/A6 on the DROP's D chord, gain 0.7) and its own cash at P + 0.1 together carry 40-60% of all the energy in the 2 kHz octave. Lowering the 2× ding lifts 250 Hz but pushes 2000 Hz over 0. Spec changes: `raceT` [0.5, 13.0]; the 2× ding moved from the 2021 close (8.83) to the next 8th (8.85), which is the A chord's bar line, so both its notes (C#6, E6) sit in the 1 kHz octave, at gain 0.8; the spec's cash at P lowered to 0.3 (the kit's cash at P + 0.1 stays the ka-ching). **Result** (`verify --video /tmp/06c/final/render`): PASS, A11 1.774% / max 2.87 dB with 1 encode retry at −1.5 dBTP; BANDS 31.5 −11.3, 63 1.4, 125 2.8, **250 0.0** (window 0..6, so on its edge), 500 1.0, 2000 −1.6, 4000 −4.3, 8000 −5.9 dB re 1 kHz; HARSH −0.67; B3 10/10 (closest 5.0 dB); B8 logo −12.22 vs payoff −10.15 LUFS; S9 115.4 / 111.1 BPM (−3.7%, was +5.5%). The master is deterministic (sha256 `d87cd9c1…`), but a 0.0 dB edge will not survive a pack change. **Do not promote** until the sound workflow re-verifies on its engine (its pending first-frame AAC / local-dip work changes this encode loop) and either fixes the tilt at pack level or records a waiver, then re-records `test/fixtures/sound-baseline.sha256` and `cues.json` with it (A14 baseline now DIFFERS, as expected). |
| should | 13.70-14.40 near-still (0.63 s), the "$0 left" fade silent. | "$0 left" now has its own cue, `{ t: 13.675, kind: pop, gain: 0.6 }` (`spentLeft.t` + 0.125, its first visible frame), 5 dB over the band (B3). With the race ending at 13.0 the post-reveal sequence is: plate 13.0-13.4, shrug 13.25-13.55, "$0 left" 13.55 (fade 13.63-13.75), verdict 14.1. The longest near-still (YAVG < 0.25) there is 13.77-14.10 (0.33 s). |
| should | Frame 1 has no caption. | `vo[0]` = { t −0.4, d 2.1 }: the kit pre-types it, so "Skip the $4 latte, get rich?" is complete on frame 1 (stills at 0.0 and 0.5 read). The check now asserts `vo[0].t ≤ 0` for the condensed cut and paces captions by the time they are up from frame 1. `raceT[0]` stays 0.5: the kit starts the first purchase at max(0.5, race start) anyway, and any earlier race start retimes the year-end cues so the engine picks 120 BPM, where the 2× ding lands on Bm and BANDS fails (250 −0.6/−0.7, 2000 −0.6/−0.7 at race starts 0.4 and 0.3). |
| should | "Then it stalls. You keep buying." too dense (6 words in 1.5 s). | Up 1.75 s now (9.75-11.5); "By 2021, your money doubled." 8.25-9.7 still covers the 2× hold (8.83-9.73) within tolerance. |
| should | Publishing sheet still names the old render and check counts. | Check counts updated (442 default, 440 on the WIP spec). The condensed render's facts (18.2 s, sha256, cover frame 15.2 s in the 14.8-15.7 s verdict hold) are recorded as pending; the covers cut from it are `/tmp/06c/final/cover-9x16-15.2s.jpg` and `cover-3x4-15.2s.jpg`. They replace the files in `publishing/` on promotion, when `current_render` changes. No copy changes. |
| nit | "2025: $17,532 of lattes." disagrees with the racing counter. | Now "By 2025: $17,532 of lattes." with the same timing role (11.55-12.85). |
| nit | Ding inside the DROP, the +5.5% tempo jump at P. | P is now 13.0: 115.4 BPM to P, 111.1 BPM after (−3.7%). The verdict ding still lands in the DROP (14.1, 1.1 s after P), passing B3. |
| nit | 3.75-8.4: one caption for 4.65 s, no beat of its own. | Split: "The stock outruns the cups." (3.7-5.75, over 2017-2018) and "2019–20: it takes off." (5.8-8.2, over 2019 and 2020, the two biggest yearly gains). The check verifies both windows on the race clock and that 2019 and 2020 are the top two gains. |
| nit | Small figure in a mostly empty frame. | `lookOpts.figureScale: 1.18`. Stills at 0, 2.6, 8.86, 9.3, 10.57, 12.2, 13.35 and 14.6: no new collision. The cup he holds already touched the tower's left edge at 1.0× (8.86, 10.57); at 1.18× it overlaps it by a few px more. The empty band under the caption is the kit's layout (and partly platform UI). |

**Measured** (frame difference at 270×480, YAVG < 0.15 = still; `/tmp/06c/motion.py`):

| | Still runs ≥ 0.4 s | Runs 0.25-0.4 s |
|---|---|---|
| 28.0 s cut (30.5 s, `renders/channel`) | 20.97-23.17 (2.20), 24.10-28.03 (3.93), card 29.23-30.50 | 14.30-14.63, 23.20-23.53 |
| Condensed cut before this pass (18.5 s) | verdict hold 14.80-16.03 (1.23), card 17.23-18.50 | 9.63-9.93, 14.07-14.40 |
| **After this pass (18.2 s)** | **0.03-0.47 (0.43)**, verdict hold 14.50-15.73 (1.23), card 16.93-18.20 | 9.47-9.73, 13.77-14.10 |

The new 0.03-0.47 run is the cost of the frame-1 caption: before, the type-on was the only motion there (YAVG 0.14-0.22, so the opening was near-still at the 0.25 level in both cuts: 0.03-0.50). Now frame 1 holds the complete hook (header, question, $4 coin) until the coin moves at 0.5. **For the Becker Rig kit owner:** `pov-race.js` floors the first purchase at 0.5 s (`c.t = Math.max(0.5, …)`); a lower floor would let the coin move from frame ~6 with no spec change other than `raceT[0]`.

**Stills read** (`stills` at 0, 0.5, 1.56, 2.6, 3.64, 4.68, 5.73, 5.9, 6.77, 7.81, 8.86, 9.3, 9.72, 10.57, 11.39, 12.2, 13.02, 13.35, 13.7, 14.1, 14.6, 15.6, 16.6 and 18.15): every year-end matches the maths table ($1,460 / $1,586; $2,920 / $3,997 with "+$1,460"; $4,384 / $5,199; $5,844 / $6,955; $7,304 / $9,633; $8,764 / $14,988; $10,228 / $20,521; $11,688 / $24,343 with "2×" at 8.86-9.72; $13,148 / $22,808 with coins tumbling; $14,608 / $23,942; $16,072 / $24,865; $17,532 / ≈ $24,900), "2019–20" renders with its en dash, "$0 left" fades in at 13.7, the verdict and "≈ 1.4×" mark hold at 14.6-15.6, the card at 16.6-18.15.

**Lint:** `check specs-wip/06c-becker-rig-latte-starbucks.json`: 0 errors, 0 warnings (18.2 s = 15.7 + 2.5 s end card).

**Check (`checks/06-pov-race.py`):** 440 checks, 0 failed with `--spec` on the WIP spec; 442, 0 failed by default. Changed for the condensed cut: `raceT` [0.5, 13.0]; the lane opens to 15.5-19 s; 9 caption lines (indices shifted); `vo[0]` must start at or before 0 and captions are paced by their time up from frame 1; a cue tied to a `lookOpts` beat (`sfx_at`: the "$0 left" pop at `spentLeft.t` + 0.125); the "takes off" line's window and the top-two-gains fact. Mutation test (scratch copies in `/tmp/06c/mut2/`): the takeoff line moved to 4.9 s, the pop moved to 13.9, `vo[0]` at +0.1 and a 15.3 s body each exit 1 with a named failure.

**Render and sound** (`/tmp/06c/final/`): `render` → `render/06c-becker-rig-latte-starbucks.mp4` (18.2 s, 546 frames, 36 sfx); `sound … --video /tmp/06c/final/render --out /tmp/06c/final --score` → `06c-becker-rig-latte-starbucks.mp4` (video md5 identical; the file is byte-identical to the render's, sha256 `a8e110b3…`); `audit`: −14.11 LUFS, TP −1.2 dBTP, LRA 6.13, PLR 12.91, silence 0%, L/R correlation 0.87, phone drop 1.56 LU, 36/36 onsets within 24.5 ms, symbolic score checks 16/16.

**To promote** (after the sound workflow signs off): copy the WIP spec over `studio/specs/06c-becker-rig-latte-starbucks.json`, rebuild with `--final` on the sound workflow's engine, re-run `verify` (and `npm test`'s baseline/cue guards with that workflow), copy the two covers into `publishing/` and fill in `for_video` from the promoted MP4.

### Condensed cut: promoted and shipped (2026-10-12): 06c

- **Promoted.** The fix pass's spec is now `studio/specs/06c-becker-rig-latte-starbucks.json`, and `studio/specs-wip/` is gone. `checks/06-pov-race.py` checks the condensed cut by default: 441 checks, 0 failed. The 28.0 s set is used only for a `--spec` file of exactly 28.0 s from outside `studio/specs/` (a git-history copy: 443, 0 failed). Any other length fails the lane and stops there. Lint: `node src/cli.mjs check`, 30/30 clean (06c 18.2 s = 15.7 + 2.5 s end card).
- **Picture.** `render specs/06c-becker-rig-latte-starbucks.json --out /tmp/ship/video`: 546 frames, 18.2 s. Against the reviewed render (`/tmp/06c/final`), 343 of 546 frames are bit-identical. The other 203 differ by encoder noise only (PSNR ≥ 52.1 dB), with the same content at 0, 4.0, 8.9, 13.4, 14.6 and 16.8 s.
- **Sound.** In a 15.7 s body, the two dings and two coins owned about half of the 1 kHz octave that BANDS reads every band against, and 250 Hz sat 0.2 dB over its floor. Becker Rig's balance now also reads that crowding (`studio/sound/BIBLE.md` §6.7 item 4), and its `MODEL` was refit. 06c passes 42/42, with every octave at least 0.8 dB inside its window (250 Hz +1.0, 8 kHz −5.8 against −5). B3's closest cue clears the band by 4.0 dB, and B8's logo lands at −11.57 LUFS against the payoff's −10.66. The spec's cue gains were not touched.
- **Shipped** with all 30 by BIBLE §11.5: `renders/channel/06c-becker-rig-latte-starbucks.mp4` is the condensed cut (18.2 s; video md5 `f5debff9a65d…`, the same as its render). Audit: −14.10 LUFS, TP −1.52 dBTP, LRA 5.38, PLR 12.58, silence 0%, symbolic score checks 16/16.
- **Publishing.** `publishing/tools/build_06c_publishing.py` regenerates the sheet with repo-relative paths. `for_video` now points at the shipped MP4, and both covers were re-exported from it at 14.7 s, the first settled frame of the verdict hold. None of the copy changed. The sheet's numbers check passes.

### Opening hold fix and re-ship (2026-10-12): 06c

The release check measured the shipped cut's opening as a still run: 14 identical frames, 0.03-0.43 s by frame difference (about 0.43-0.47 s on screen), against the "no still run of 0.4 s or more before the verdict hold" criterion. It was the cost of the frame-1 caption (fix pass above): the complete hook frame held until the first purchase at 0.5 s.

- **Fix, in the kit, picture only.** Becker Rig `formats/pov-race.js` has a new opening beat, `lookOpts.heft` (on by default, `false` to opt out). When the first purchase (the big coin) comes 0.3 s or more after frame 1, the figure weighs the $4 coin in his hand until it starts: a small bounce about every 0.24 s (two here) and a nod. The coin stays upright and readable. Frame 1 is unchanged, and the beat ends at rest as the purchase starts. No `ctx.cue` call moved, so the cue record, the tempo map and the audio are untouched. The kit README's pov-race table lists the option.
- **Why not a lower first-purchase floor.** The fix pass found that starting the race at 0.4 or 0.3 s retimes the year-end cues, moves the tempo to 120 BPM and fails BANDS. It would also move the cue record, which means a Becker `MODEL` refit and new masters for all 15 Becker teasers. The heft gives motion from frame 2 without moving a cue.
- **Motion audit** (270×480, `tblend` difference, YAVG < 0.15), shipped file: the opening is now moving from 0.033 s. Its longest still run is 2 frame-differences (0.13-0.17 s, YAVG 0.04-0.15), at the top of a bounce. The only other one is a single difference at 0.40 s, just before the purchase. Before the verdict hold, the longest still run is 13.77-14.07 (0.33 s), then 9.47-9.70 (0.27 s), both as before. After that come the verdict hold (14.50-15.70) and the card hold (16.93-18.17), as designed.
- **Picture.** `render specs/06c-becker-rig-latte-starbucks.json`: 546 frames, 18.2 s. Against the previously shipped file, frame 0 has the same content (PSNR 60.7 dB, encoder noise). Frames 1-14 are the heft. Frame 15 onward is the same content (PSNR ≥ 53.4 dB; 213 frames bit-identical). Lint: 30/30 clean, and both Becker pov-race samples lint clean too.
- **Sound: re-shipped by BIBLE §11.5** from a picture folder holding the new 06c render and `renders/channel/` for the other 29. `node --test test/cues.test.mjs` passed, and a fresh cue dump equals `test/fixtures/cues.json`, so §11.1 did not fire (no refit). `tempo-table` (and `--write`) found nothing to regenerate. `verify --from … --strict-cues`: 30/30 at 42/42, units 69/69 and 77/77, all 30 masters equal to the baseline, no cue drift. 06c's BANDS, B3 and B8 are unchanged (250 Hz +1.0, closest cue 4.0 dB, logo −11.57 against −10.66 LUFS). After the copy, `--write-baseline` rewrote `test/fixtures/sound-baseline.sha256` with the same 30 hashes. Only 06c's file changed in `renders/channel/`. Its AAC stream is packet-identical to the previous ship, and its video md5 is now `2879840db8f7…`. Verify: −14.10 LUFS, TP −1.50 dBTP (A2: the worse of JS −1.52 and ffmpeg −1.5), PLR 12.60 (A5). `npm test` 28/28; `checks/06-pov-race.py` 441 checks, 0 failed.
- **Publishing.** The sheet was regenerated (`build_06c_publishing.py --covers`, then `--check`: PASS). `for_video`'s sha256 now follows the new file (`d431ea6b…`), and the covers were re-exported at 14.7 s, the same content. The Trial-Reel note now says where to get the retired 30.5 s cut (`git show 80e35e5:renders/channel/06c-becker-rig-latte-starbucks.mp4`).

### Condensed cut (2026-10-12): 06b

**Owner's note:** "Condense it" (with its publishing data, a separate step). The 06c precedent applies: too many still moments kill a short, and the end card (CTA) is good.

**Files:**
- New: `studio/specs-wip/06b-scoreboard-netflix-bill.json`, a retimed copy of the 30.5 s spec.
- Changed: this write-up (the 06b section's beat sheet, captions and timings, and this entry) and `checks/06-pov-race.py`.
- Not touched: `studio/specs/06b-scoreboard-netflix-bill.json`, every kit file (`studio/looks/**`, so 06a's picture cannot have moved), `studio/src/**`, `studio/sound/**` (calibration included), `test/fixtures/` and `renders/`. Renders are in `/tmp/06b/` only. Nothing is committed.

**Kept, character for character:** the hook (header, the frame-1 caption, the clean cover with "? YEARS"), the footer, every display string, every data point, both finals, the 8 purchases and all 7 hike tags, the three answer-row landings and their working (≈ 5 months, ≈ 38 years, ≈ 22 years in coral), the board's $2,037.32 / ≈ $17,700, the three footer steps (`188.8 shares × $93.76 ≈ $17,700` included), the payoff (`dur` 0), the verdict, the 9 caption lines word for word, every cue's kind and beat, and the 2.5 s end card (the brand layer is untouched). Only the clock moved.

**Measured before** (`renders/channel/06b-scoreboard-netflix-bill.mp4`, 30.5 s + the 2.5 s card). Method as for 06c: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG); a frame is still when YAVG < 0.15.
- The race ran 0.3 → 23.0 s at ≈ 1.6 s per year, with holds of 1.3, 1.8 and 1.3 s, and the verdict came 3.0 s after the reveal and held 4.5 s.
- Still runs ≥ 0.4 s: 2.57-3.00 (the 2012 hold), 15.20-16.70 (the 2020 hold, one moving frame at 16.23), 19.33-19.77 (the 2022 hold), 23.73-25.93 (after the reveal; the audit splits it at 25.27 on isolated equal-valued encoder steps), 26.67-30.47 (the verdict hold, two single-frame breaks) and 31.97-32.90 (the card hold).
- The longest still before the verdict was 2.2 s.

| | 30.5 s cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 30.5 / 33.0 s | **18.3 / 20.8 s** | The brief: a body of about 17-20 s, plus the card |
| `raceT` | [0.3, 23.0] | **[0.24, 15.9]** | The kit drops a purchase icon over 0.24 s, so with the race at 0.24 the first ticket's fall starts at t = 0: hidden on frame 1 (the clean cover keeps $19.99 the only price), falling from frame 2. The clean cover needs a start after 0.1 anyway |
| Pace | ≈ 1.6 s per year | **1.00 s per year on every leg** (0.97 to the 2012 close) | The brief: about 1 s a year |
| Holds (`unit.holds[].t` / `hold`) | 1.91 / 1.3, 14.9 / 1.8, 18.5 / 1.3 | **1.2 / 0.5, 9.7 / 0.6, 12.3 / 0.6** (`unit.hold` 0.6) | Each landing's bump, glow and bloom move about 0.3 s, so a pause of 0.6 s leaves at most 0.3 s still. 2012 keeps a 0.5 s landing: it is the first payoff (R10), "≈ 5 MONTHS" under "For how long?" |
| `verdict.t` = `payoff.t` = last footer step | 26.0 (raceT[1] + 3.0) | **16.7 (+ 0.8)** | The board's landing moves for about 0.4 s. At + 0.9 the gap before the payoff was still for 0.43 s apart from one caption word lighting; at + 0.8 it is 0.37 s without help |
| Verdict hold | 4.5 s | **1.6 s** | The last caption is up 1.2 s and ends 0.4 s before the card |
| Footer steps | 9.2, 21.2, 26.0 | **5.45, 15.2, 16.7** | Each still starts with its caption. `188.8 shares × $93.76 ≈ $17,700` is up 1.5 s (0.7 s before the reveal to the payoff) |
| `vo` (captions) | narration-paced, 0.0-29.6 | **reading-paced, −0.4-17.9** | Each up ≥ max(1.2 s, 0.12 s per word), 0.05 s apart (since the QA fix pass, one 0.6 s breath at 10.3-10.9). vo[0] starts at −0.4 (the Scoreboard caption rises in over 0.14 s), so the hook question is complete on frame 1 |
| `sfx` | pops 5.17-21.94, thud 18.5, cash 23.0 | **pops 3.04, 4.46, 6.46, 7.71, 9.46, 11.31, 14.91; thud 12.3; cash 15.9** | The same 9 cues on the same beats (the 7 hikes, the 2022 landing, the finish), on the new clock. No gain changed |
| `data.hold` | 7.5 | **2.4** | = duration − raceT[1] |

**Iteration.**
- The first version ended the race at 15.4 s (legs 0.97, 0.95, 0.95 and 1.00 s per year, payoff at 16.3 s). Its only fragile spot was the gap between reveal and payoff, still for 0.43 s apart from one caption word lighting.
- With the payoff 0.8 s after the reveal (16.2 s), the gap was fine, but the tempo map jumped +6.9% at P: 140.26 BPM to P, 150 after. The 2.4 s from P to the card fits only 6 beats at 150 BPM. That would have been the biggest jump in the set (06c's critic flagged +5.5% as a nit).
- At 1.00 s per year on every leg, the race ends at 15.9 s and the engine picks 40 beats to P: 150.94 → 150.00 BPM (−0.6%). The motion and the sound gates are as good as in the first version. This is the cut.

**Measured after** (`/tmp/06b/final/06b-scoreboard-netflix-bill.mp4`, 18.3 s + the 2.5 s card):

| | Still runs ≥ 0.4 s | Runs 0.2-0.4 s |
|---|---|---|
| 30.5 s cut | 2.57-3.00, 15.20-16.70, 19.33-19.77, 23.73-25.93, 26.67-30.47 (verdict hold), card 31.97-32.90 | 2.20-2.53, 18.83-19.17, 23.40-23.70 |
| **Condensed cut** | **only the verdict hold, 17.60-18.03**, and the card hold, 19.77-20.77 | 0.00-0.23 (the opening), 10.00-10.27 (2020 hold), 12.57-12.87 (2022 hold), 16.37-16.63 (between reveal and payoff), 17.20-17.57 and 18.07-18.30 (verdict hold) |

- **Before the verdict, the longest still run is 0.30 s** (was 2.2 s).
- Near-still (YAVG < 0.25) before the verdict: 16.13-16.63 only (0.50 s). The board's glow is settling there, and a caption word lights at 16.37 s.
- The opening's 0.23 s is the first ticket falling (YAVG 0.03-0.11, under the threshold) until the counters slam in at 0.24 s.

**Stills read** (`stills` at 0, 0.1, 0.27, 0.6, 1.2, 1.45, 1.68, 2.0, 2.7, 3.05, 3.7, 4.47, 4.7, 5.5, 5.7, 6.47, 6.7, 7.7, 7.72, 8.7, 8.85, 9.47, 9.7, 10.0, 10.28, 10.6, 11.3, 11.32, 11.8, 12.3, 12.6, 12.88, 13.9, 14.9, 14.92, 15.25, 15.9, 16.1, 16.5, 16.65, 16.7, 16.8, 17.5, 18.25, 18.5 and 20.77, plus a 16-frame contact sheet):
- Frame 1: the clean cover (header, LED-off board, "? YEARS", the complete hook caption). At 0.1 s the first ticket is falling.
- Every year-end matches the maths table:

| t (s) | Paid \| in stock | Also on screen |
|---|---|---|
| 1.2, 1.68 | $95.88 \| $106.98 | `2012: $107 ÷ $19.99`, ≈ 5 MONTHS |
| 2.7 | $191.76 \| $568.35 | ≈ 2.4 years |
| 3.7 | $295.64 \| $615.52 | $8.99 HIKE 1 · MAY 2014 |
| 4.7 | $406.52 \| $1,581 | $9.99 HIKE 2 · OCT 2015 |
| 5.7 | $526.40 \| $1,856 | `Each year: bills ÷ avg price` |
| 6.7 | $649.28 \| $3,022 | $10.99 HIKE 3 · OCT 2017 |
| 7.7 | $781.16 \| $4,324 | ≈ 18 years |
| 8.7 | $937.04 \| $5,380 | $12.99 HIKE 4 · JAN 2019 |
| 9.7, 10.28 | $1,095.92 \| $9,181 | `2020: $9,181 ÷ $239.88`, ≈ 38 YEARS, $13.99 HIKE 5 · OCT 2020 |
| 11.3 | $1,263.80 \| $10,410 | ≈ 43 years |
| 12.3, 12.88 | $1,449.68 \| $5,289 | `2022: $5,289 ÷ $239.88`, ≈ 22 YEARS in coral, $15.49 HIKE 6 · JAN 2022 |
| 13.9 | $1,635.56 \| $8,964 | |
| 14.9 | $1,821.44 \| $16,656 | |
| 15.9 | $2,037.32 \| ≈ $17,700 | `188.8 shares × $93.76 ≈ $17,700`, `≈ $17,700 ÷ $239.88` |

- After the race: $17.99 HIKE 7 · JAN 2025 at 15.25 s. At 16.7-18.25 s: the hero ≈ 74 YEARS, `$17,706 ÷ $239.88 ≈ 74 years` and the verdict. The end card shows at 18.5 and 20.77 s.

**Lint:** `node src/cli.mjs check specs-wip/06b-scoreboard-netflix-bill.json`: 0 errors, 0 warnings (20.8 s = 18.3 + 2.5 s end card). `check` on `studio/specs/`: 30/30 clean. Both Scoreboard pov-race samples: 0 errors, 0 warnings.

**Render and sound:**
- `render specs-wip/06b-scoreboard-netflix-bill.json --out /tmp/06b/render`: 624 frames, 20.8 s, 23 sfx.
- `sound … --video /tmp/06b/render --out /tmp/06b/final --score`: video md5 identical (`3965144e6073`). P 15.9 by the riser rule; 150.943 / 150 BPM; cue onsets within 0.75 ms.
- The master is deterministic: sha256 `27d95cfa2c2e…` from `sound`, `verify` and a batch `audio` build alike.
- The §2.3 row it will need on promotion: `| 06b | riser | 15.900 | 40 (r0) | 150.943 | base 18.30: 6 (r2) @ 150.00 | 18.66 |`. `tempo-table --cues` on the fixture with this record substituted shows Appendix B and the engine agree on all 30 rows, and only 06b's row moves.

**Verify** (`verify specs-wip/06b-scoreboard-netflix-bill.json --video /tmp/06b/final`): PASS, 42/42 gated; units 69/69. The CUE DRIFT block (06b only) and "baseline DIFFERS" are expected for a WIP cut. Each gated check against its limit (30.5 s cut in brackets):
- A1 −14.10 LUFS (−14.09). A2 −1.20 dBTP against −1.0 (−1.19). A3 LRA 5.93 (6.07). A4 short-term max −10.99 against −8, momentary max −8.78 against −6. A5 PLR 12.90 against 13 (12.90; the encode loop holds it ≤ 12.95). A6 0% silent. A7 −10.53 against −18. A8 correlation 0.78, minimum 0.54, mono fold −0.65 LU. A9 DC 2.1e-5. A10 phone drop 2.65 LU against 7.
- **A11: 2.832% of samples limited by more than 1 dB, against ≤ 3%** (1.734%), max 3.9 dB against 6. This is the tightest gate, and it comes from the length, not the mix. The limiting is the payoff burst at P (hit, cash, revcrash, clap, kick: 15.9-16.4 s, max 3.9 dB) and one kick at 16.5. It is about 0.59 s in both cuts (1.734% × 33.0 s ≈ 0.57 s; 2.832% × 20.8 s ≈ 0.59 s), so the same event is a larger share of a shorter file. The set's highest was 2.55% (08a).
- A12-A14: AAC LC stereo 48 kHz, 20.800 s against the 20.800 s video; video md5 identical; master unique.
- **BANDS** (dB re 1 kHz, window, margin to the nearer edge; 30.5 s cut in brackets):

| Octave | Value | Window | Margin |
|---|---|---|---|
| 31.5 Hz | −15.9 (−16.3) | −20..3 | 4.1 (3.7) |
| 63 Hz | 6.8 (6.7) | 4..10 | 2.8 (2.7) |
| 125 Hz | 3.2 (4.0) | 2..8 | 1.2 (2.0) |
| 250 Hz | 1.7 (2.4) | 0..6 | 1.7 (2.4) |
| 500 Hz | 1.6 (2.3) | −1..4 | 2.4 (1.7) |
| 2 kHz | −3.7 (−3.7) | −5..0 | 1.3 (1.3) |
| 4 kHz | −6.8 (−7.6) | −9..−2 | 2.2 (1.4) |
| 8 kHz | −8.2 (−9.0) | −14..−5 | 3.2 (4.0) |
| 16 kHz | **−12.7** (−13.4) | −26..−12 | **0.7** (1.4) |

  Every octave is at least 0.7 dB inside its window. The tightest is 16 kHz, 0.7 dB under its ceiling (the shorter body has a larger share of bright transients). The set's tightest after v2.2 are 0.1-0.3 dB (BIBLE §11.2).
- HARSH −1.02 against 2 (−0.90). B1 music −2.29 (−3.5..−1.5), SFX −3.53 (−5..−2.5). B2 duck at P −10.8 dB against −8. B3 15/15 cues clear the music by at least 4.2 dB (4.3) against 3. B4 onsets within 0.75 ms against 2. B5 flux onset −1.3 ms from P against ±10. B6 4.6 LU against 18. B7 drop-build 4.8 / 5.5. B8 logo −12.11 LUFS against −13 (−12.02), payoff −10.21. B9, B10 and S1-S14 pass: S9 is 150.943 / 150 BPM (the 30.5 s cut had 146.09 / 140.00 / 146.67). TRAIN and DUCK pass. INFO AAC0: 1 encode at ceiling −1.5.

**Scoreboard refit (§11.2), dry run** (the cue record moved, so the fitted values were checked; nothing was written):
- Fresh records were dumped for the 15 Scoreboard specs, with the WIP 06b in place of the shipped one (`/tmp/06b/refit/`). Then `audio --stems` and `calibrate.mjs` ran without `--write`.
- Against `calibration.json`: M_FIT 1.68 → 1.67, GM −16.07 → −16.09, GM_PLAN −16.02 → −16.01, LOGO_PRE −16.25 → −16.24, OPEN_FIT 2.00 unchanged. BEDS move only in VERDICT 4 (−18.2 → −18.3) and CADENCE 3 (−18.6 → −18.7).
- That is inside the tolerance §11.2 calls the pack's fixed point (0.03 dB on the scalars, 0.10 dB on BEDS), so the promotion's refit step needs no write. Writing it would change all 15 Scoreboard masters for no gain.
- In that build the other 14 Scoreboard masters equal `test/fixtures/sound-baseline.sha256`, and 06b's equals the `sound`/`verify` master.

**Check (`checks/06-pov-race.py`):**
- 06b now has two expectation sets, picked by length, like 06c had during its WIP stage: the 30.5 s round-2 cut (`EXP["b_30s"]`, what `studio/specs/` holds; `B_IN_SPECS` names it) and the condensed cut (`EXP["b"]`). Their strings, points, purchases, numbers, beats, sfx roles and holds are shared (`_B_STRINGS`, `_B_COMMON`).
- New for the condensed cut:
  - a 17-20 s lane;
  - captions paced for reading, with gaps under 0.2 s (since the QA fix pass, a gap of up to 0.6 s is allowed while the race moves with no beat inside it);
  - vo[0] at or before −0.14 s (complete on frame 1, no rise);
  - the race start at 0.24-0.3 s;
  - each answer-row pause 0.4-0.7 s, 2.0 s in all;
  - a moving pace of 0.85-1.05 s per year;
  - the payoff and verdict ≤ 1.5 s after the reveal, held 1.2-1.6 s;
  - each footer step up ≥ 1.2 s.
- A cut of any other length fails its lane and stops there.
- Results: 443 checks, 0 failed by default (was 441; the two new rows say which 06b cut was checked); 442, 0 failed with `--spec studio/specs-wip/06b-scoreboard-netflix-bill.json`; 443, 0 failed on a git-history copy of the 30.5 s spec.
- Mutation test (scratch copies): 9 of 9 caught, each with exit 1 and a named failure. The mutations were: a 1.0 s 2020 pause; the verdict 1.8 s after the reveal; vo[0] at 0.0; the race at 0.12 s; the 188.8-shares footer step at 15.8; a 2.3 s first year; a 21.0 s body; a 1.0 s caption; and "about 39 years".

**To promote** (done on 2026-10-12: see "Condensed cut: promoted and shipped (2026-10-12): 06b" below)**:**
1. Copy the WIP spec over `studio/specs/06b-scoreboard-netflix-bill.json` and set `B_IN_SPECS = "b"` in the check.
2. Follow BIBLE §11.1 for the moved record. Refit Scoreboard (the dry run above says the values stay inside the fixed-point tolerance, so nothing needs writing). Store the records in `test/fixtures/cues.json` and run `tempo-table --write` (the 06b row above). Then run `verify --strict-cues` and `npm test`, and add the bible status line. It names A11 at 2.83% of 3% next to the tightest-margins list (QA nit), so the next §11.2 Scoreboard refit checks it.
3. Ship by §11.5 from a picture folder that holds this render and `renders/channel/` for the other 29.
4. Then the publishing sheet and `teasers/v2/teasers.json` (runtime 20.8 s).

**Open items:**
- A11 at 2.83% of 3% and 16 kHz at 0.7 dB are the margins to watch on the next Scoreboard pack change.
- The publishing data is a separate step. Its cover is either frame 1 (the clean cover, as the platform notes say) or the first settled frame of the verdict hold, about 17.2 s. (Done at the ship: frame 1, see below.)

### QA fix pass (2026-10-12): 06b condensed cut

The QA judge passed the condensed cut at 8.6 with no musts and no shoulds, only five nits. The cheap one that improves the picture is applied (nit 1). The others need no change or wait for promotion. Files: `studio/specs-wip/06b-scoreboard-netflix-bill.json` (three caption times), `checks/06-pov-race.py` (06b's caption-gap rule) and this write-up. No kit, sound, fixture, `studio/specs/` or `renders/` file was touched, and nothing is committed.

| # | Nit | Done |
|---|---|---|
| 1 | Two captions led their picture. "2020: about 38 years." went up 0.9 s before the row landed on 38. "2022: it halves." showed for about 0.95 s while the 2021 line was still climbing to its high. | **Applied.** vo[3] now ends at 9.05 (d 3.3 → 3.6). vo[4] runs 9.1-10.3 (was 8.8-10.3): 1.2 s up, 0.6 s before the landing as in the 30.5 s cut, and still covering the Hike 5 tag (9.46) and the whole 2020 hold. vo[5] runs 10.9-12.9 (was 10.35-12.9): 2.0 s up, 0.4 s before the 2021 peak, where the year clock turns 2022 and the Hike 6 tag drops (11.3). vo[4] still ends with its hold at 10.3, so it never names 38 after the row has moved on. That leaves a 0.6 s breath at 10.3-10.9 with no caption, while the race climbs through 2021. **Check:** the back-to-back rule (each gap < 0.2 s, "so no beat is unlabelled") now allows one kind of longer gap, up to 0.6 s (`EXP["b"]["cap_breath"]`). It must fall while the race moves (not in an answer-row pause), and no beat may fall inside it: no sfx cue, hike tag, footer step, landing, reveal or payoff. The rule's purpose is unchanged. 06c's rule is untouched. |
| 2 | The payoff lands 0.8 s after the reveal, against the 06c guide of about 1-1.5 s. | No change, as the judge advised. This is the documented trade-off: at +0.9 s the gap was still for 0.43 s. If the owner wants a longer look at $2,037 vs $17,700, the fix is a kit-level settle motion on the board. |
| 3 | The Hike 7 tag is up about 0.9 s and changes alongside the footer step and caption at 15.2. | Left as is, which the judge allowed. Moving footer step 2 also moves its tick cue (15.2), which means a new sound build on a short body whose A11 has 0.17 points of headroom. Moving vo[7] alone would split it from its footer step (the check pairs them), which makes four text changes in 0.45 s instead of three in 0.3 s. |
| 4 | A11 at 2.832% of 3%, now the highest in the set, driven by length. | Added to "To promote" step 2: the bible status line names A11 at 2.83% next to the tightest-margins list. Any future margin must come from a pack-level rule for the P stack, not from `acceptance.json`. |
| 5 | A2 / A5 / A1 master sit under a literal 0.5 dB margin. | None. They are closed-loop encode targets, unchanged from the shipped cut. |

**Results:**
- **Lint:** `check specs-wip/06b-scoreboard-netflix-bill.json` gives 0 errors and 0 warnings.
- **Math check:** 442 checks, 0 failed with `--spec`, and 443, 0 failed by default (counts unchanged). The 06b row reads `caption gaps < 0.2 s, or a breath while the race runs: [0.05, 0.05, 0.05, 0.05, 0.6, 0.05, 0.05, 0.0]`. Negative tests on scratch copies all failed with a named reason: vo[5] at 11.35 ("holds beats [11.31]", the Hike 6 pop) and a 0.9 s gap starting inside the 2020 pause ("in a pause"). A 0.55 s beat-free gap passed.
- **Stills read** at 0, 8.9, 9.15, 9.75, 10.25, 10.6, 10.95, 11.35, 12.35, 12.85 and 15.3, plus 6 frames pulled from the MP4:
  - Frame 1 is unchanged: the clean cover with the full hook caption.
  - At 8.9 the method line is still up while the row counts past 26.
  - At 9.15 "2020: about 38 years." rises over the row counting about 30. At 9.75 and 10.25 it sits under ≈ 38 YEARS.
  - At 10.6 there is no caption: the race is in 2021, the row counts 40 and the Hike 5 tag stays up.
  - At 10.95 "2022: it halves." rises, with the row at 42. At 11.35 it sits under the 2021 peak, with the year clock on 2022 and the Hike 6 tag.
  - At 12.35 and 12.85 the coral ≈ 22 YEARS sits under it.
- **Render:** `render … --out /tmp/06b/final` gives 624 frames, 20.8 s and 23 sfx. Video stream md5 `f88705f3ed5d`. The picture file is kept as `/tmp/06b/render/06b-scoreboard-netflix-bill.mp4`. Decoded frames differ from the previous render only at frames 161-499 (5.37-16.63 s: the caption changes, then the encoder's GOP up to its next keyframe at 500). Frame 1 and every frame from 16.67 s on are identical, so the publishing covers taken from frame 1 stay valid.
- **Sound:** `sound … --video /tmp/06b/render --out /tmp/06b/final --score`. The video md5 is identical, and the **master WAV is byte-identical to the condensed cut's** (sha256 `27d95cfa2c2e…`; the `.m4a` too, md5 `c7c5d1c5…`). Captions are not a sound cue, so every audio measurement above stands, A11's 2.832% included.
- **Verify** (`verify specs-wip/06b… --video /tmp/06b/final`): PASS, 42/42 gated, units 69/69. The values are as listed above: I −14.10, TP −1.20, PLR 12.90, LRA 5.93. The CUE DRIFT block and "baseline differs" are expected for a WIP cut.
- **Motion audit** (`/tmp/06b/final/06b-scoreboard-netflix-bill.mp4`, MD5 `3b963c17…`, same method):
  - Before the verdict, no still run reaches 0.4 s. The runs of 0.2-0.4 s are 0.03-0.23, 10.03-10.27, 12.60-12.87 and 16.40-16.63, and then 17.23-17.57 and 18.10-18.30 inside the verdict hold.
  - Still runs ≥ 0.4 s: only 17.63-18.03 (verdict hold) and the card hold, 19.80-20.77.
  - Near-still (YAVG < 0.25) before the verdict: 16.17-16.63 only.
  - The caption breath at 10.3-10.9 moves throughout (YAVG 0.46-1.14).

### Condensed cut: promoted and shipped (2026-10-12): 06b

- **Promoted.** The QA-fixed spec is now `studio/specs/06b-scoreboard-netflix-bill.json`, and `studio/specs-wip/` is gone. `checks/06-pov-race.py` has `B_IN_SPECS = "b"`, so `studio/specs/` must hold the condensed cut. The 30.5 s set is kept for a git-history copy passed with `--spec` (`git show 471c793:studio/specs/06b-scoreboard-netflix-bill.json`). The default run gives 442 checks, 0 failed, and the git-history copy gives 443, 0 failed. Lint: 30/30 clean (06b 20.8 s = 18.3 + 2.5 s end card).
- **Picture.** `render specs/06b-scoreboard-netflix-bill.json --out /tmp/ship06b/video` gives 624 frames, 20.8 s and 23 sfx. The file is byte-identical to the reviewed render (MD5 `3b963c17…`, video stream `f88705f3ed5d…`), so the QA fix pass's stills, motion audit and master all describe it. The motion audit, re-run on the shipped file, gives the same runs. Before the verdict no still run reaches 0.4 s (the longest is 0.30 s, at 12.57-12.87). The only runs of 0.4 s or more are the verdict hold (17.60-18.03) and the card hold (19.77-20.77).
- **Cue drift and the Scoreboard refit (BIBLE §11.1-11.2).** A fresh dump of the 30 records differed from `test/fixtures/cues.json` in 06b only. On the 15 Scoreboard records, `audio --stems` and `calibrate.mjs` without `--write` gave:
  - M_FIT 1.67 (file 1.68), GM −16.09 (−16.07), GM_PLAN −16.01 (−16.02), LOGO_PRE −16.24 (−16.25) and OPEN_FIT 2.00 (2.00);
  - BEDS moved in two cells only: VERDICT 4 −18.26 before rounding (file −18.2) and CADENCE 3 −18.69 (−18.6).

  That is inside the fixed-point tolerance (0.03 dB on the scalars, 0.10 dB on BEDS), so the values had already stopped moving and nothing was written. In the re-measure's render, the other 14 Scoreboard masters equal the baseline. A write would have changed all 15 masters for no gain, and with them the margin on 02c's 2 kHz octave (0.3 dB).
- **Records and vectors.** The fresh records are stored in `test/fixtures/cues.json`, one record per line as before, so the diff is 06b's line alone. `tempo-table --write` rewrote only 06b's §2.3 row: `| 06b | riser | 15.900 | 40 (r0) | 150.943 | base 18.30: 6 (r2) @ 150.00 | 18.66 |`. The old row was P 23.000, 56 beats at 146.087, V 26.00, base 30.50 and L 30.86. Appendix B and the engine agree on all 30 rows. No Appendix A value or test pin moved: 09c, 09b, 10a, 10b and 02a are unchanged.
  - BIBLE §2.5 used 06b as its example of a 1-bar DROP before a 3-beat BREAK. The condensed cut anchors no V, so the example is now 01a.
  - §2.5 also now states the engine's 1-bar DROP floor, which 02a, 06b and 06c use. 06b's DROP is 1 bar, and its CADENCE is the 2 remainder beats.
  - `npm test`: 28/28.
- **Shipped by BIBLE §11.5,** from a picture folder that holds this render and symlinks to `renders/channel/` for the other 29.
  - `sound specs/*.json --video <folder> --out /tmp/sound/mp4 --score --wav --stems --jobs 4`: 30/30, and every mux kept its source's video md5. An independent `ffmpeg -f md5` pass agrees on all 30.
  - `verify --from /tmp/sound/mp4 --strict-cues --video <folder>`: PASS. All 30 teasers pass 42/42, and the units pass 69/69 and 77/77. All 30 records equal the fixture, and 29 of 30 masters equal the baseline (06b changed).
  - The build was copied into `renders/channel/`, and `--write-baseline` rewrote 06b's line in `test/fixtures/sound-baseline.sha256` (`27d95cfa…`, was `7ae652c1…`).
  - Only 06b's MP4 changed in `renders/channel/` (sha256 `b5854b92…`, MD5 `3b963c17…`). The other 29 are byte-identical to the previous ship.
  - The build went to `/tmp` and was then copied, as §11.5 says. With `--final --out ../renders/channel`, the picture folder's symlinks would point ffmpeg at the files it was writing, and its same-file check cannot see through a symlink.
- **06b's sound, as delivered.** `verify --detail` gives the QA fix pass's values unchanged:
  - I −14.10 LUFS, TP −1.20 dBTP, PLR 12.90, LRA 5.93;
  - A11 2.832% (max 3.9 dB), now the set's highest (08a 2.553% next);
  - every BANDS octave at least 0.7 dB inside its window (16 kHz −12.7 against −12, 125 Hz +1.2, 2 kHz +1.3);
  - B3's closest cue 4.2 dB, B8's logo −12.11 LUFS against the payoff's −10.21, and 150.943 / 150 BPM.

  The set's tightest BANDS margins are unchanged: 02a, 04b and 09a at 0.1 dB, 01c at 0.2, and 02c and 05b at 0.3. The audit of `renders/channel/`, with the build's scores, gives 06b −14.10 LUFS, TP −1.24 dBTP (the JS meter alone), LRA 5.93, PLR 12.86, silence 0% and symbolic score checks 16/16. All 30 teasers pass 16/16.
- **Publishing.** `build_publishing.py 06b-scoreboard-netflix-bill --covers`, then `--check`: PASS.
  - `for_video` follows the shipped file (20.8 s, sha256 `b5854b92…`), and `cut.replaces` names the 33.0 s render (`323dc45e…`, in git at 471c793).
  - The cover is still frame 1, picked by content. Frame 0 is this cut's only clean frame: the first ticket falls from frame 1, and the counters light at frame 8.
  - Both JPGs were re-exported from the shipped file. They show the same picture as before, except that "Your Netflix," is lit in the hook caption (the old frame lit only "Your").
  - The long alt text was re-read against the cut. Every beat it names is still there, so no copy changed.
  - 06c's sheet still passes `--check` and still rebuilds byte for byte.
- **Elsewhere:** `teasers/v2/teasers.json` has 06b's `runtime_s` at 20.8 (was 33.0) and the 2012 landing time in its key numbers. `renders/channel/README.md`, `HANDOFF-finance-channel.md`, `studio/sound/README.md`, BIBLE status v2.3 and the Scoreboard READMEs name the new cut.

### Condensed cut (2026-10-13): 06a

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." Its publishing data is a separate step (the ship step rebuilds `publishing/06a-scoreboard-first-iphone-apple.*`). The 06c and 06b precedents apply.

**Files:**
- New: `studio/specs-wip/06a-scoreboard-first-iphone-apple.json`, a retimed copy of the 26.5 s spec.
- Changed: this write-up (the 06a section's beat sheet, captions, hook-rule timings, maths-table times and platform notes, and this entry) and `checks/06-pov-race.py`.
- Not touched: `studio/specs/06a-scoreboard-first-iphone-apple.json` (the ship step promotes the WIP copy), every kit file (`studio/looks/**`: no kit change was needed), `studio/src/**`, `studio/sound/**`, `test/`, `publishing/` and `renders/`. Renders are in `/tmp/cond/06/06a-scoreboard-first-iphone-apple/` only. Nothing is committed.

**Kept, character for character:** the header, the footer, the 7 caption lines, the verdict, every data point, both finals, the launch-day purchase, the footer step `≈ 136.7 shares × $271.12 (12/31/25 close)`, `tags: false`, every cue's kind and beat, and the 2.5 s end card (the brand layer is untouched). Only the clock moved. The cue record has the same 16 cues in the same order; the one difference in kind of source is the opening whoosh, which the spec now carries because the kit cues its race-start whoosh only when `raceT[0]` is over 0.05 s (same kind, 0.6 s, gain 0.45).

**Measured before** (`renders/channel/06a-scoreboard-first-iphone-apple.mp4`, 26.5 s + the 2.5 s card). Method as for 06c and 06b: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG); a frame is still when YAVG < 0.15, near-still under 0.25.
- Still runs ≥ 0.4 s: 0.03-0.87 (0.83 s, the opening: nothing moved until the phone started to fall at 0.6 s), the verdict hold 22.23-26.53 (4.3 s, split only by two single-frame encoder steps) and the card hold 28.00-29.00.
- Near-still runs ≥ 0.4 s inside the race: 1.70-2.17 and 2.33-2.77 (the 2008 dip in the plot's corner) and 9.97-10.57 (0.60 s, the flat 2015).
- The race ran 1.11 s per year; the verdict came 0.6 s after the reveal and held 4.5 s.

| | 26.5 s cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 26.5 / 29.0 s | **15.9 / 18.4 s** | The owner's note. 06a's race has 18.5 years of line (06c 12, 06b 14), so it lands near 06c's 15.7 s body |
| `raceT` | [0.3, 21.4] | **[−0.04, 13.4]** | 0.71 s per year. The race reaches the launch-day purchase (x 2007.49) at 0.307 s: the kit stands a purchase reached in the first 0.3 s on the line at frame 1, so just after 0.3 s keeps frame 1 clean and drops the phone in from 0.1 s |
| `sfx` | (kit whoosh 0.3) pop 0.84, thud 2.51, tick 6.96, tick 12.51, ding 14.78, cash 21.4 | **whoosh 0.07 (spec), pop 0.31, thud 1.37, tick 4.20, tick 7.74, ding 9.18, cash 13.4** | The same cues on the same beats (launch day, the 2008 close, the 2012 and 2017 closes, the $10,000 crossing, the finish). The whoosh sits on the phone's fall |
| `verdict.t` | 22.0 (raceT[1] + 0.6) | **14.3 (+ 0.9)** | The brief's 0.8-1.5 s; the board's landing (bump, glow, flash) moves until about 13.8 and the plot squeezes 14.0-14.3 |
| Verdict hold | 4.5 s | **1.6 s** | The last caption is up 1.2 s and ends 0.4 s before the card |
| `footerSteps[0].t` | 21.4 | **13.4** | On the reveal, as before; up 2.5 s |
| `vo` (captions) | narration-paced, 0.0-25.6 | **reading-paced, −0.4-15.5** | Each up ≥ max(1.2 s, 0.12 s per word), back to back (0.05 s gaps). vo[0] starts at −0.4, so the hook is complete on frame 1. The boundaries sit on chart years (x 2011.7, 2015.7, 2019.27, 2021.7, 2024.35), so every number caption goes up 0.2-1.5 s before its beat |
| `data.hold` | 5.1 | **2.5** | = duration − raceT[1] |

**Iteration** (every version lints clean):
1. 0.75 s per year (`raceT` [−0.06, 14.2], a 16.7 s body), captions back to back with vo[1] running to 7.05: the flat 2015 was near-still for 0.43 s (6.27-6.70): only the green tip creeps and the counter ticks ($3,336 → $3,236 on a $5K axis, no rescale).
2. 0.70 s per year (`raceT` [−0.04, 13.25]): the 2015 lull did not shrink with the faster clock (5.80-6.47, 0.67 s near-still), because the stretch is flat in x as well as in time.
3. The vo[1] → vo[2] boundary moved into the lull (x 2015.7): two near-still runs of 0.27 s with the caption change between them. Sound: PASS, but B8's logo landed at −12.84 LUFS against −13 (0.16 dB of margin).
4. A sweep of audio-only `verify --no-video` runs on spec variants: the race end at 12.8, 13.0, 13.1, 13.4, 13.5 and 13.6 s put the logo at −12.02 to −12.12 LUFS; only 13.25 put it at −12.84 (the plan's music estimate for that tempo map). The verdict offset barely moves it (−12.81 to −12.90 at +0.8 to +1.2 s on the 13.25 clock). Without the spec's whoosh, DUCK fails (pop at 0.3: 3.55 dB over the 2.7 dB cap). **This is the cut:** the race ends at 13.4 s (0.708 s per year), B8 −12.05, 16 kHz 0.6 dB under its ceiling, A11 1.46%, and the tempo goes from 143.284 to 144 BPM at P (+0.5%; the 26.5 s cut went 145.794 → 141.18, −3.2%).

**Measured after** (`/tmp/cond/06/06a-scoreboard-first-iphone-apple/final/06a-scoreboard-first-iphone-apple.mp4`, 15.9 s + the 2.5 s card):

| | Still runs ≥ 0.4 s | Runs 0.2-0.4 s |
|---|---|---|
| 26.5 s cut | 0.03-0.87 (opening), 22.23-26.53 (verdict hold), card 28.00-29.00 | (the race's near-still runs above) |
| **Condensed cut** | **only the verdict hold, 14.73-15.67**, and the card hold, 17.40-18.40 | 0.03-0.33 (the opening: the phone falling, YAVG 0.003-0.13), 13.80-14.03 (between the reveal's glow and the squeeze), 15.70-15.93 (verdict hold) |

- **Before the verdict, the longest still run is 0.30 s** (was 0.83 s), the opening, where the phone's fall is too small to clear the threshold (as 06b's falling ticket, 0.23 s).
- Near-still runs (YAVG < 0.25) before the verdict are all under 0.4 s: 0.03-0.33, 1.37-1.60, 5.87-6.13, 6.27-6.53 and 13.80-14.03.
- **The one stretch to watch:** 5.87-6.53 (x 2015.3-2016.3), the race's slowest. Only the tip (about 1.6 px a frame), the gap fill and the counter move there (YAVG 0.08-0.24); the vo[2] caption rising at 6.12 (YAVG 1.75) and the "$499 / SPENT" tag fading in at about 6.55 break it. Read strictly ("only a counter or a caption changes"), that is 0.67 s of near-still picture. The data is flat there (2015: −3%), and no spec knob can speed one stretch of this look's linear clock; the next lever would be a kit beat on each year-end close.
- The 2008 dip (1.14-1.58) is a picture beat at 0.71 s per year: the counter is coral for 0.44 s, with the swipe, thud and swipe.

**Stills read** (`stills` at 0, 0.1, 0.2, 0.31, 0.66, 1.14, 1.37, 1.58, 3.29, 4.2, 6.12, 6.4, 7.57, 7.74, 8.64, 9.18, 10.36, 10.57, 11.28, 11.99, 12.24, 13.4, 13.75, 14.05, 14.3, 14.7, 15.5, 15.85, 16.3 and 18.37, in three contact sheets):
- Frame 1: the header, $499 | $499, the parked start dot under "2007", the footer and the complete hook caption ("Launch day 2007:" lit). At 0.1 the phone is falling; at 0.31 it stands on the line and THE IPHONE's $499 is coral.
- Every year-end matches the maths table (counters between closes are interpolated):

| t (s) | IN APPLE STOCK | Also on screen |
|---|---|---|
| 0.66 | $809 | year clock 2007 |
| 1.37 | $350, coral | 2008 (the close, $348.41, lands at 1.368) |
| 4.20 | $2,196 | 2012; "2012: about $2,200. You just hold." |
| 7.57 / 7.74 | $4,984 / $5,402 | 2017; "2017: over 10 times. The phone's long gone."; "$499 / SPENT" |
| 9.18 | $9,957 | 2020; "2020: it passes $10,000." |
| 10.57 / 11.28 / 11.99 | $23,704 / $17,490 / $26,066 | 2021 / 2022 / 2023; "2022 knocks off a quarter." |
| 13.40 | ≈ $37,000 | 2025; `≈ 136.7 shares × $271.12 (12/31/25 close)`; "2025: about $37,000." |

- After the race: the squeeze at 14.05, the verdict `≈ 74× your $499. / 2× every ≈ 3 yrs.` at 14.3-15.85 with its caption to 15.5, the end card at 16.3 and 18.37.

**Lint:** `node src/cli.mjs check specs-wip/06a-scoreboard-first-iphone-apple.json`: 0 errors, 0 warnings (18.4 s = 15.9 + 2.5 s end card).

**Render and sound:**
- `render specs-wip/06a-scoreboard-first-iphone-apple.json --out /tmp/cond/06/06a-scoreboard-first-iphone-apple/render`: 552 frames, 18.4 s, 16 sfx.
- `sound … --video …/render --out …/final --score`: video md5 identical (`c0a8189d754c`); P 13.4 by the riser rule; 143.284 / 144 BPM; cue onsets within 0.75 ms. The MP4 is byte-identical to the render's (sha256 `08927b8e…`); the master's sha256 is `401ae9338972fe38…`.
- The §2.3 row it will need on promotion: `| 06a | riser | 13.400 | 32 (r0) | 143.284 | base 15.90: 6 (r2) @ 144.00 | 16.26 |` (it was P 21.400, 52 beats at 145.794, base 26.50: 12 (r0) @ 141.18, L 26.86). Sections: HOOK 0-1.68, BUILD to 10.89, TENSION to 13.4, DROP to 15.07, CADENCE to 15.9.

**Verify** (`verify specs-wip/06a-scoreboard-first-iphone-apple.json --video …/final`): PASS, 42/42 gated; units 69/69 (U1 14, U2 24, U3 15, U4 15, LOGO 1). The CUE DRIFT block (06a only) and "baseline DIFFERS" are expected for a WIP cut. Each gated check against its limit, with the margin (the shipped 26.5 s cut in brackets):
- A1 −14.09 LUFS delivery (±1 of −14: 0.91), master −14.01 (±0.3: 0.29) (−14.17 / −14.10). A2 −1.20 dBTP against −1.0: 0.20 (−1.30). A3 LRA 5.62 in 4-9: 1.62 (6.67). A4 short-term max −11.41 against −8: 3.41; momentary max −9.08 against −6: 3.08. A5 PLR 12.89 in 8-13: 0.11 (12.87; the encode loop holds it at ≤ 12.95). A6 0% silent. A7 −11.34 against −18: 6.66. A8 correlation 0.74 (≥ 0.3), minimum 0.32 (≥ −0.1), mono fold −0.69 LU (±1.5). A9 DC 1.0e-5 against 1e-4. A10 phone drop 2.66 LU against 7: 4.34.
- **A11: 1.464% of samples limited by more than 1 dB, against ≤ 3%: 1.54 points** (0.91% at 29.0 s), max 3.33 dB against 6. The payoff burst is a larger share of the shorter file, as in 06b (2.83%), but far from the gate.
- A12-A14: AAC LC stereo 48 kHz, 18.400 s against the 18.400 s video; video md5 identical; master unique.
- **BANDS** (dB re 1 kHz; 26.5 s cut in brackets): 31.5 Hz −15.2 in −20..3: 4.8 (−16.4); 63 Hz 7.3 in 4..10: 2.7 (6.9); 125 Hz 3.9 in 2..8: 1.9 (3.3); 250 Hz 2.0 in 0..6: 2.0 (2.4); 500 Hz 2.1 in −1..4: 1.9 (2.0); 2 kHz −2.1 in −5..0: 2.1 (−3.1); 4 kHz −6.8 in −9..−2: 2.2 (−7.5); 8 kHz −8.0 in −14..−5: 3.0 (−9.6); **16 kHz −12.6 in −26..−12: 0.6** (−13.9). The tightest is 16 kHz, as in 06b's condensed cut (0.7): a shorter body has a larger share of bright transients.
- HARSH 0.27 against 2 (0.16). B1 music −2.15 in −3.5..−1.5: 0.65; SFX −3.15 in −5..−2.5: 0.65. B2 duck at P −10.8 dB against −8: 2.8. B3 6/6 cues at least 4.6 dB over the music against 3: 1.6 (4.6). B4 onsets within 0.75 ms against 2. B5 flux onset −5.3 ms from P against ±10. B6 4.9 LU against 18. B7 drop-build 4.4 (edge) and 4.9 (centred) against 2, build halves rising. **B8 logo −12.05 LUFS against −13: 0.95**, under the payoff's −10.30 (−12.02 / −10.39). B9 quietest window −26.0 against −45. B10, S1-S14, TRAIN and DUCK pass: S9 143.284 / 144 BPM (136-152; later +0.5%, within ±8%), S14 12 notes against 12 (as in every teaser). INFO AAC0: 1 encode at ceiling −1.5.

**Check (`checks/06-pov-race.py`):**
- 06a now has two expectation sets, picked by length, like 06b during its WIP stage: the 26.5 s round-2 cut (`EXP["a_26s"]`, what `studio/specs/` holds; `A_IN_SPECS` names it) and the condensed cut (`EXP["a"]`). Strings, points, the purchase, the caption numbers and "about"s, the beat sync and the footer-step beat are shared (`_A_COMMON`).
- New fact (both cuts): the stake first passes 10× ($4,990) in 2017, the beat of "2017: over 10 times".
- New for the condensed cut: a 15-18 s lane; captions paced for reading and back to back (gaps < 0.2 s); vo[0] at or before −0.14 s (complete on frame 1); the race reaches the launch-day phone at 0.3-0.34 s and its fall starts by 0.1 s; the whoosh on that fall (± 0.05 s) and every cue kind in order; the red by 1.5 s; the pace 0.65-0.8 s a year; the verdict 0.8-1.5 s after the reveal and held 1.2-1.6 s; each number caption up at most 1.7 s before its beat (2012 close, 10× crossing, $10,000 crossing, 2021 peak, the final); a caption change inside the 2015 lull (x 2015.3-2016.3); the footer step up ≥ 1.2 s.
- Results: 445 checks, 0 failed by default (was 442: the 10× fact and the two rows that say which 06a cut was checked); 454, 0 failed with `--spec studio/specs-wip/06a-scoreboard-first-iphone-apple.json`; 445, 0 failed on a copy of the 26.5 s spec passed with `--spec` from outside `studio/specs/`.
- Mutation test (scratch copies in `/tmp/cond/06/mut/`): 14 of 14 caught, each with exit 1 and a named failure: vo[2] up at 5.6 (1.97 s before the 10× crossing, and out of the lull); the vo[1]/vo[2] boundary at 6.6 (out of the lull); the verdict 0.5 s after the reveal; a 2.0 s verdict hold; `raceT[0]` −0.07 (the phone would stand on frame 1); vo[0] at 0.0; a 1.0 s caption; "$38,000"; "about" dropped; the whoosh at 0.3; tick and ding swapped; the race ending at 13.0 (every beat off); a 0.35 s caption gap; an 18.4 s body.

**To promote** (superseded by the fix pass below):
1. Copy the WIP spec over `studio/specs/06a-scoreboard-first-iphone-apple.json` and set `A_IN_SPECS = "a"` in the check (the 26.5 s set then serves a git-history copy: `git show 3db6d30:studio/specs/06a-scoreboard-first-iphone-apple.json`).
2. BIBLE §11.1 for the moved record: re-measure Scoreboard (§11.2; no dry run was done here, because the other formats' Scoreboard cuts move their records in the same batch), store the records in `test/fixtures/cues.json`, run `tempo-table --write` (the 06a row above), then `verify --strict-cues` and `npm test`. Re-check B8 on 06a after any refit: its logo level is sensitive to the tempo map (−12.84 LUFS at a 13.25 s race end).
3. Ship by §11.5 from a picture folder that holds this render (or a fresh `render` of the promoted spec) and `renders/channel/` for the others.
4. Publishing: `python3 publishing/tools/build_publishing.py 06a-scoreboard-first-iphone-apple --covers`, then `--check`. The cover rule still picks frame 1 by content (both counters at $499, the race not yet left the start, the phone not yet dropped); its hook caption now shows "Launch day 2007:" lit (the shipped frame lit "Launch"). The sheet's check count (442) becomes 445. `teasers/v2/teasers.json`: runtime 18.4 s (was 29.0).

**Open items:**
- The 2015 lull (above), the one stretch a strict reading would still call near-still.
- Margins to watch on the next Scoreboard pack change or refit: 16 kHz 0.6 dB, B8 0.95 dB (and its tempo-map sensitivity), B1 0.65; A2 and A5 are closed-loop encode targets, as in every teaser.

### Condensed cut: fix pass (2026-10-13): 06a

The QA judge passed the condensed cut at 8.5 with no musts, two shoulds and four nits. Both shoulds and the cheap nits are applied or answered below.

| # | Severity | Item | Done |
|---|---|---|---|
| 1 | should | The flat 2015 (5.87-6.60) was near-still for 0.73 s with the caption band left out. Only the vo[2] caption rising split it on the full-frame metric. No spec knob could speed one stretch of a linear clock. | **Applied, with an opt-in kit option.** Scoreboard `formats/pov-race.js` has a new `lookOpts.clockKnots`: `[[t, x], …]` inner knots of the race clock, with x linear between them. The spec runs the flat 2015 (x 2015.1-2016.5) at 0.40 s a year. The same audit also flagged 2018 ($5,403 → $5,112), which was near-still for about 0.45 s in the reviewed render (two runs split by one 0.256 frame). It now runs at 0.50 s a year (x 2018.05-2018.95). Every other year keeps the reviewed pace, 0.709 s a year. No fast stretch holds a cue, a captioned figure or a line crossing. The 1.0 s the flats give back ends the race 0.6 s sooner. **Result:** the 2015 run is gone on both metrics. 2018 is 0.33 s with the caption band out, and nothing on the full frame. |
| 2 | should | Sound margins: A2 0.20, A5 0.11 and A1 master 0.29 dB, all under 0.5. Next tightest were 16 kHz 0.6 and B8 0.95, which is sensitive to the tempo map. | **Not caused by this cut's timing, so left for the ship step.** A2, A5 and A1 master are closed-loop encode targets. On this cut they read A2 −1.37 dBTP (0.37, was 0.20), A5 12.72 (0.28, was 0.11) and A1 master −14.01 (0.29). 16 kHz is −12.4 against −12, a 0.4 margin (was 0.6), because the shorter body has a larger share of bright transients. B8 is −12.10 LUFS (0.90). The race end was chosen with an audio-only `verify --no-video` sweep. Race ends of 12.8, 12.9 and 13.0 s all pass, with B8 between −12.06 and −12.11. Two variants with the race ending at 12.7 and 12.71 s also pass. The ship step's checks are listed under "To promote". |
| 3 | nit | Frame 1: nothing moves until frame 4 (0.1 s), and then only a small falling icon. | **Applied, with an opt-in kit option.** `lookOpts.startPing`: while the own tip waits on its first point, a neon ring swells out of the start dot from frame 2 (r 11 → 48 px) and fades by 0.3 s. Then the phone drops in. The ring is born at nothing, so frame 1 is byte-identical to the reviewed cut's frame 1 (the cover). No cue is added. Frame-difference YAVG over frames 2-9 is now 0.05-0.09 (was 0.003-0.05). That is visible, but under the 0.15 still threshold, so the metric's opening run stays 0.03-0.33 (0.30 s), like 06b's 0.23 s with its falling ticket. |
| 4 | nit | The 2008 dip flickers by in 0.4 s; give it 0.15-0.2 s more. | **Tried and not applied.** A render with x 2008.55-2009.35 at 0.95 s a year (+0.19 s) turned the trough into a 0.27 s still run on the full frame (1.50-1.77), and a 0.47 s near-still with the caption band out (1.33-1.80). The dip is about 100 px tall in the plot's corner, so slowing it makes it stiller. It stays at the plain pace: coral 1.14-1.58, with the thud and two swipes. The check now requires one plain pace, and a slowed dip fails it. |
| 5 | nit | Captions disagree with the board for about a second. "2017: over 10 times." went up 1.45 s before the 10× crossing, with the clock on 2015. "2012: about $2,200. You just hold." stayed up 1.87 s past its close. | **Applied** with the bent clock. vo[2] now goes up 1.09 s before the 10× crossing, as the clock turns 2016. vo[1] comes down 1.81 s after the 2012 close; its "You just hold." covers the holding years. The check's lead limit is now 1.3 s (was 1.7), and there is a new trail limit of 1.9 s. |
| 6 | nit | A 0.43 s near-still between the reveal's glow and the plot squeeze, with the caption band out. | None, as the judge advised. It is now 13.07-13.50 with the caption band out (0.43 s), and 13.20-13.43 on the full frame (0.23 s). The verdict lands 0.9 s after the reveal. |

**Files:**
- Kit: `studio/looks/scoreboard/formats/pov-race.js` has two opt-in `lookOpts`, `clockKnots` and `startPing`. Both are documented in the format header and in `studio/looks/scoreboard/README.md` (two rows in the pov-race table, and the Ported line). When either is absent, no code path or element changes.
- `studio/specs-wip/06a-scoreboard-first-iphone-apple.json` (the cut), `checks/06-pov-race.py` and this write-up (the 06a section's beat sheet, captions, R10 and the maths-table times).
- Not touched: `studio/specs/`, `src/`, `sound/`, `test/`, `publishing/`, `renders/`, the look's `lib.js`, `theme.js`, `style.css`, `cta.js` and `kit.js`, and every other format. Nothing is committed.

**The default is unchanged (proof).** These were taken with the kit as committed (HEAD) and again with the final kit, for every committed spec using Scoreboard pov-race (`specs/06a` 26.5 s, `specs/06b`) and both look samples (`pov-race.json`, `pov-race-2.json`):
- The cue records (`cues … --out`) are byte-identical: md5 `8ff7ed0d…`, `ec7af4a4…`, `70ad68fc…` and `2d2e29c5…`.
- Stills at 5 times each are byte-identical (20 PNGs). The times are 06a 0, 2.2, 10.3, 21.5, 24.5; 06b 0, 1.5, 9.9, 15.95, 17.5; each sample 0, 2, 5, 9 and the end.
- Lint is unchanged: 4/4 clean, 0 warnings.
- The reviewed WIP spec, which has neither option, gives the same cue record as before.
- One proof run showed 23 px (at most 19 levels) different in sample 1's logo corner. Three fresh renders with the final kit, and one with the HEAD kit, were byte-identical to the baseline. That was a one-off render glitch while other formats were rendering in parallel.
- Guards: `clockKnots` given with 06b's answer-row pauses is ignored (the cue list is identical to 06b's). A list out of order runs the straight clock (the same cue record as no knots). `startPing` changes no cue, and frames at 0, 0.4 and 5 s are identical with and without it.

**The cut** (every string, number, cue kind and the end card unchanged):

| | Reviewed condensed cut | Fix pass |
|---|---|---|
| Body / total | 15.9 / 18.4 s | **15.3 / 17.8 s** |
| `raceT` | [−0.04, 13.4], linear (0.708 s a year) | **[−0.04, 12.8]**, with `clockKnots` [[5.7, 2015.1], [6.26, 2016.5], [7.36, 2018.05], [7.81, 2018.95]]: 0.709 s a year, 2015 at 0.40 and 2018 at 0.50 |
| `startPing` | none | **true** |
| `sfx` | whoosh 0.07, pop 0.31, thud 1.37, tick 4.20, tick 7.74, ding 9.18, cash 13.4 | whoosh 0.07, pop 0.31, thud 1.37, tick 4.20, **tick 7.32, ding 8.58, cash 12.8** (on their beats, ± 0.01) |
| Caption boundaries (x) | 2011.7, 2015.7, 2019.27, 2021.7, 2024.35 | 2011.7, **2016.0**, 2019.27, 2021.7, 2024.35 |
| `verdict.t` / hold | 14.3 (+0.9) / 1.6 s | **13.7** (+0.9) / 1.6 s |
| `footerSteps[0].t`, `data.hold` | 13.4, 2.5 | **12.8**, 2.5 |

**Iteration:**
1. 2015 fast, the dip slowed (+0.19 s), race end 13.4: 2015 fixed, but the dip's trough went still (item 4).
2. 2015 fast only, race end 13.0, `startPing`: 2018 was near-still with the caption band out (7.70-8.07, 0.37 s).
3. Audio-only sweep at race ends 12.8, 12.9 and 13.0 s with 2018 also fast: all pass (item 2). **This cut:** race end 12.8 s, with 2018 at 0.50.
4. A variant with 2018 at 0.40 removed the 2018 run. Its plain pace drifted to 0.714 s a year, though, and threshold-level runs (0.2-0.3 s) came and went elsewhere. Frame for frame, those stretches sit at YAVG 0.1-0.35 in both renders. Variant 3 was kept: it has the reviewed pace and the cleanest full-frame audit.

**Measured** (`/tmp/cond/06/06a-scoreboard-first-iphone-apple/final/06a-scoreboard-first-iphone-apple.mp4`; frame difference at 270×480, still if YAVG < 0.15, near-still if under 0.25; "caption band out" = the top 1100 px, scaled to a full-frame equivalent, the judge's method):

| Before the verdict (13.7) | Reviewed cut (15.9 s body) | Fix pass |
|---|---|---|
| Full frame, still runs ≥ 0.2 s | 0.03-0.33 (0.30), 13.80-14.03 (0.23) | 0.03-0.33 (0.30), 13.20-13.43 (0.23) |
| Full frame, near-still ≥ 0.2 s | + 1.37-1.60, 5.87-6.13, 6.27-6.53 | + 1.37-1.60 (0.23) |
| Caption band out, near-still ≥ 0.2 s | 0.03-0.33, 0.87-1.17, 1.33-1.60, **5.87-6.60 (0.73)**, 8.00-8.23, 13.67-14.10 (0.43) | 0.03-0.33, 1.33-1.60, 1.77-2.00, 7.53-7.87 (0.33), 13.07-13.50 (0.43) |

After that come the verdict hold (14.13-15.07) and the card hold (16.80-17.80), as designed. The shipped 26.5 s cut, measured the same way, had a 0.83 s still opening and full-frame near-still runs of 0.47, 0.43 and 0.60 s in the race.

**Stills read** at 0, 0.03, 0.1, 0.2, 0.31, 0.66, 1.14, 1.37, 1.58, 3.32, 4.2, 5.7, 5.95, 6.06, 6.26, 7.15, 7.32, 7.55, 7.81, 8.04, 8.58, 9.76, 9.97, 10.67, 11.38, 11.64, 12.8, 13.2, 13.45, 13.7, 14.2, 14.9, 15.25, 15.8 and 17.77 (three sheets), plus MP4 crops of the opening and the spend tag:
- Frame 1 is the cover, as reviewed.
- 0.03-0.2: the ping; 0.1-0.31: the phone dropping onto the line.
- $808 at 0.66; $349 coral at 1.37 (the close is $348.41); $2,192 at 4.20.
- 2015 at 5.95 is $3,262 under "2015"; the 2016 roll and vo[2] rise at 6.06.
- $4,987 at 7.15 (10×); $5,402 at 7.32; $5,123 at 7.81; $10,028 at 8.58 with the clock on "2020".
- $23,667 at 9.97; $17,483 at 10.67; $25,975 at 11.38.
- ≈ $37,000 at 12.8 with its glow, and the footer step by 13.2. The verdict and its caption are at 13.7-14.9, the hold to 15.3, then the unchanged card.
- The "$499 / SPENT" tag rides about 6.2-8.65 and is back by 12.3. No collision and no cut-off.

**Lint:** `check specs-wip/06a-scoreboard-first-iphone-apple.json`: 0 errors, 1 warning, `type-floor @13.00s: "spent" 39.5 px < 40`. This is the spend tag's landing bump undershooting 40 px by 0.5 px for about 0.05 s, 0.2 s after the finish. The 26.5 s cut has it too (21.60-21.65 s with `--every 0.05`), and so does the reviewed cut (13.60-13.65). With the finish at 12.8 it now falls on the default 0.25 s grid. It is the kit's default behaviour, left alone, because changing it would change 06a's and 06b's default output.

**Render and sound:**
- `render specs-wip/06a-scoreboard-first-iphone-apple.json --out …/final/render`: 534 frames, 17.8 s, 16 sfx.
- `sound … --video …/final/render --out …/final --score`: video md5 identical (`dba578e813f2`); P 12.8 by the riser rule; 150 / 144 BPM; cue onsets within 0.75 ms. The MP4 is byte-identical to the render's (sha256 `ab1d3c3d…`). The master's sha256 is `ea5c5e524e713c55…`.
- The §2.3 row for promotion: `| 06a | riser | 12.800 | 32 (r0) | 150.000 | base 15.30: 6 (r2) @ 144.00 | 15.66 |`. Sections: HOOK 0-1.6, BUILD to 10.4, TENSION to 12.8, DROP to 14.47, CADENCE to 15.3.

**Verify** (`verify specs-wip/06a-scoreboard-first-iphone-apple.json --video …/final`): PASS, 42/42 gated; units 69/69. The CUE DRIFT block (06a only) and "baseline DIFFERS" are expected for a WIP cut. Each gated check, with its margin:
- A1 −14.09 LUFS delivery (±1: 0.91), master −14.01 (±0.3: 0.29).
- A2 −1.37 dBTP against −1.0: 0.37.
- A3 LRA 5.79 in 4-9: 1.79.
- A4 short-term max −11.42 against −8: 3.42; momentary −9.10 against −6: 3.10.
- A5 PLR 12.72 in 8-13: 0.28.
- A6 0% silent.
- A7 −11.38 against −18: 6.62.
- A8 correlation 0.74 (≥ 0.3), minimum 0.46 (≥ −0.1), mono fold −0.68 LU (±1.5).
- A9 DC 4.9e-6 against 1e-4.
- A10 2.62 LU against 7: 4.38.
- A11 1.277% against 3%: 1.72 points; max 3.48 dB against 6.
- A12-A14: AAC LC stereo 48 kHz, 17.800 s against 17.800 s; video md5 identical; master unique.
- BANDS (window margin): 31.5 Hz −15.2 (4.8); 63 Hz 7.3 (2.7); 125 Hz 3.8 (1.8); 250 Hz 1.8 (1.8); 500 Hz 2.0 (2.0); 2 kHz −2.0 (2.0); 4 kHz −6.7 (2.3); 8 kHz −7.9 (2.9); **16 kHz −12.4 against −12: 0.4**.
- HARSH 0.28 against 2.
- B1 music −2.14 in −3.5..−1.5: 0.64; SFX −3.19 in −5..−2.5: 0.69.
- B2 −10.8 dB against −8: 2.8.
- B3 6/6 cues, the closest 4.5 dB over the music against 3: 1.5.
- B4 0.75 ms against 2.
- B5 −5.3 ms against ±10.
- B6 5.0 LU against 18.
- B7 drop-build 4.4 (edge) and 4.9 (centred) against 2.
- **B8 logo −12.10 LUFS against −13: 0.90**, under the payoff's −10.32.
- B9 −26.0 against −45.
- B10, S1-S14, TRAIN and DUCK pass. S9 is 150 / 144 BPM (136-152; then −4%, within ±8%). S14 is 12 notes against 12, as in every teaser. INFO AAC0: 1 encode at a −1.5 ceiling.

**Check (`checks/06-pov-race.py`):**
- `chart_t` follows `lookOpts.clockKnots` the way the kit does: the same validation, and ignored under answer-row pauses (`clock_knots`).
- A new fact: the stake is back above $499 in 2009.
- The condensed cut's set now expects raceT [−0.04, 12.8] and the knots honoured. Each clock stretch is either plain (0.65-0.8 s a year, all within 0.02 of one another) or fast (0.35-0.55). A fast stretch only crosses flat data (the stake moves ≤ 10%) and holds no beat. Both flat lulls (x 2015.3-2016.3 and 2018.2-2018.9) must run fast. `startPing` must be true. Captions go up ≤ 1.3 s before their figure and come down ≤ 1.9 s after it. The old "caption change inside the 2015 lull" rule is gone, because the clock now does that job.
- Results: 446 checks, 0 failed by default (was 445); 468, 0 failed with `--spec studio/specs-wip/06a-scoreboard-first-iphone-apple.json` (was 454); 446, 0 failed on a copy of the 26.5 s spec from outside `studio/specs/`.
- Mutation test (scratch copies in `/tmp/cond/06/mut2/`, self-consistent variants regenerated where the clock moves): 23 of 23 caught, each with exit 1 and a named failure:
  - no knots, knots out of order, no `startPing`;
  - 2015 at 0.25 s a year; a fast stretch over the 2017 close and 10× crossing; a fast stretch over the 2019 climb; 2018 at the plain pace; only half the 2015 lull fast; the dip slowed (a second plain pace);
  - the vo[1]/vo[2] boundary at x 2016.9 (a 2.29 s trail); vo[2] up 1.35 s early;
  - 12 of the earlier mutations, re-aimed at this cut: verdict +0.5 s, a 2.0 s hold, raceT[0] −0.07, vo[0] at 0.0, a 1.0 s caption, "$38,000", "about" dropped, the whoosh at 0.3, tick and ding swapped, the race ending at 12.5, a 0.35 s caption gap and an 18.4 s body. The old lull mutation is replaced by the clock ones.

**To promote** (replaces the list in the entry above; step 1 was done on 2026-10-13, see "Promoted (2026-10-13): 06a" below):
1. Copy the WIP spec over `studio/specs/06a-scoreboard-first-iphone-apple.json` and set `A_IN_SPECS = "a"` in the check. The 26.5 s set then serves a git-history copy (`git show 3db6d30:studio/specs/06a-scoreboard-first-iphone-apple.json`).
2. Commit the kit change with it (`studio/looks/scoreboard/formats/pov-race.js` and the README rows). The committed specs render as before (proof above).
3. BIBLE §11.1 for the moved record: Scoreboard refit (§11.2), store the records in `test/fixtures/cues.json`, `tempo-table --write` (the §2.3 row above), then `verify --strict-cues` and `npm test`. After the refit, re-check 06a's A2, A5, A1 master, **16 kHz (0.4 dB here)** and B8. If any drops, fix it with a pack-level rule, not by moving this spec's race end.
4. Ship by §11.5 from a picture folder that holds this render (or a fresh render of the promoted spec).
5. Publishing: the untracked `publishing/06a-scoreboard-first-iphone-apple.*` files (built at 04:57 by the publishing step) predate this fix pass and describe the 18.4 s cut. Rebuild them: `python3 publishing/tools/build_publishing.py 06a-scoreboard-first-iphone-apple --covers`, then `--check`. The runtime is 17.8 s and the check count is 446. The cover is unchanged, because frame 1 is byte-identical to the reviewed cut's. `teasers/v2/teasers.json`: runtime 17.8 s.

**Open items:**
- With the caption band out, 2018's end is still 0.33 s near-still and the landing after the reveal 0.43 s (the judge accepted the latter). On the full frame nothing before the verdict reaches 0.3 s, except the opening (0.30 s).
- Margins to watch at the refit: 16 kHz 0.4 dB, A5 0.28, A1 master 0.29, A2 0.37, B1 0.64, B8 0.90.
- Not 06a: with `check --every 0.05`, the shipped 06b shows `ERR safe-zone @3.05s: "Hike 1 · May 2014" in right rail: right 964 > 940`. It is a single 0.05 s sample of a tag slam, the same with the HEAD kit. At the default sampling 06b is clean.

### Promoted (2026-10-13): 06a

The fix pass's spec was copied from `studio/specs-wip/` over `studio/specs/06a-scoreboard-first-iphone-apple.json` (commit 4fb0b00) and `A_IN_SPECS = "a"`: 468 checks, 0 failed by default, and 446, 0 failed on a git-history copy of the 26.5 s cut passed with `--spec` (`git show 4fb0b00^:studio/specs/06a-scoreboard-first-iphone-apple.json`); the sound refit and the ship follow (`renders/channel/` keeps the 26.5 s cut until then).

### Shipped (2026-10-13): 06a

- **Sound (BIBLE v2.4).** The promotion moved the cue records of all 16 condensed cuts (01a-06a), so BIBLE §11.1 ran for the batch:
  - Both looks were refit on the fresh records: Scoreboard's calibration and Becker Rig's `MODEL` (§11.2).
  - Both packs gained the short-body rules (§4.7, §6.7 item 7).
  - The records were stored in `test/fixtures/cues.json` (one line per teaser, so the diff is the batch's 16 lines), `tempo-table --write` rewrote the 16 §2.3 rows, and `npm test` passes 28/28.
  - No spec, cue gain or `acceptance.json` threshold was touched.
  - Every sound failure recorded in the entries above for this teaser is cleared at pack level.
- **Verify.** `verify --from <build> --strict-cues --video <pictures>` passes all 30 at 42/42, with units at 69/69 and 77/77. The pictures were the reviewed renders of the promoted specs for the batch and `renders/channel/` for the other 14. The masters are byte-identical to the sound pass's verified builds, so nothing regressed against its after-tables. Its §2.3 row and measurements:

  | Teaser | §2.3 row (P, BPM, base) | A1 / A2 / A5 | Tightest BANDS octaves (dB inside) | B3 closest cue | B8 logo / payoff (LUFS) |
  |---|---|---|---|---|---|
  | 06a | P 12.8 (riser), 150 → 144, base 15.30 | −14.18 / −1.37 / 12.81 | 16 kHz 1.6, 125 Hz 1.8 | 4.5 dB | −12.17 / −10.70 |

  The fix pass listed six margins to re-check after the refit. All six pass. Three held or widened, and three narrowed:
  - **16 kHz** widened to 1.6 dB inside (it was 0.4).
  - **B1** widened to 0.70 (it was 0.64): music −2.24 in −3.5..−1.5, SFX −3.2 in −5..−2.5.
  - **A2** held at −1.37 dBTP, 0.37 inside.
  - **A5** narrowed: PLR 12.81 is 0.19 under 13 (it was 0.28).
  - **A1 master** narrowed: −14.10 is 0.20 inside ±0.3 (it was 0.29). Delivery reads −14.18.
  - **B8** narrowed: the logo at −12.17 LUFS is 0.83 inside −13 (it was 0.90), and it stays under the payoff's −10.70.

  A2, A5 and A1 master are closed-loop encode and mastering targets, not this cut's timing (see the fix pass above).

  The lint still shows 06a's documented type-floor warning ("spent" at 39.5 px for 0.05 s at 13.00 s).
- **Shipped by §11.5.**
  - The build went to `/tmp`, not into `renders/channel/`. Every mux kept its source's video md5, and the files were then copied into `renders/channel/`.
  - `verify --from <build> --write-baseline` rewrote `test/fixtures/sound-baseline.sha256`.
  - Both packs changed, so all 30 masters differ from the previous baseline. All 30 MP4s in `renders/channel/` changed with them, and the 14 pictures outside the batch are unchanged.
  - The audit of `renders/channel/` used `--out` in `/tmp`, so no sidecar was written into `renders/`. All 30 teasers pass 16/16 symbolic score checks.
  - Its file:

  | Teaser | Shipped (length, sha256) | Replaces (in git at 471c793) | Video md5 (kept) | Audit: I / TP / LRA / PLR, score |
  |---|---|---|---|---|
  | 06a | 17.8 s, `482ab983…` | 29.0 s, `9707256d…` | `dba578e813f2…` | −14.18 / −1.37 / 5.48 / 12.81, 16/16 |

- **Publishing.**
  - `python3 publishing/tools/build_publishing.py <id> --covers`, then `--check`, passes for it (numbers check: PASS).
  - In the data files, the video facts (`CUT` with `shipped` and `replaces`, the Video bullet and the for-video note) now describe the shipped cut.
  - Moments and lengths that only the retired cut had were rewritten or dated, and no claim was added.
  - The checked-maths line records the re-run at the ship: 468 checks, 0 failed.
  - The cover stays at frame 0, re-exported from the shipped file. Frame 1 is byte-identical to the reviewed cut's, so it shows the same picture.
- **Elsewhere.** `teasers/v2/teasers.json`: runtime 17.8 s. Its key-number times now name the condensed cut, with the retired cut's in brackets, and its check note records the re-run at the ship. `renders/channel/README.md` (a length table), `HANDOFF-finance-channel.md` and the BIBLE v2.4 status line name the ship.
