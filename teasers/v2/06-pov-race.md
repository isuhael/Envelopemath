# Format 6: POV spend-vs-own race (pattern P6)

**Teasers:** 06a Scoreboard (Apple / first iPhone), 06b Live Sheet (Netflix bill / Netflix stock), 06c Becker Rig (latte / Starbucks stock)
**Date:** 2026-10-07; hook pass 2026-10-08 (06b and 06c kept); hook pass 2 2026-10-08 (06b's hook replaced) · **Writer:** format 6 (revised after review, see the Review log at the end) · **Specs:** `studio/specs/06a-scoreboard-first-iphone-apple.json`, `06b-live-sheet-netflix-bill.json`, `06c-becker-rig-latte-starbucks.json`
**Check:** `python3 teasers/v2/checks/06-pov-race.py`. It recomputes every on-screen and spoken number, cross-checks the source tables, and asserts the specs match, including VO pacing in spoken words (numbers read out in full) and the motion/payoff timing of the hook. Current result: 378 checks, 0 failed (after the round-2 assembly fix pass).

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
5. **Risks.** None of the 5 @investment_timeline videos could be watched (all 7 watch jobs failed), and n = 5, so viability is 6. Their posts are 60 s; ours sit in the 18-35 s lane (26.5 / 30.5 / 28.0 s).

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
- **R5:** "Launch day 2007" are the first spoken words (see the wrong belief below), and the chart opens in the red: the green tip falls through $499 at 2.15 s.
- **R6:** you + $499 + 2007, all in the header, and all in the first spoken line ("Launch day 2007: you skip the $499 iPhone and buy Apple stock.").
- **R7:** phone vs stock, both named.
- **R8:** 15 words.
- **R9:** the year axis to 2025 is the countable loop.
- **R10:** the race moves at 0.3 s and the first payoff ($809 at the end of 2007) lands at 1.4 s; the biggest number is last.
- **R11:** the title asks, the screen says POV, and the caption takes a side without a number.
- **R12:** "≈ 74×" is a single repeatable number.

**Wrong belief it exploits (R5):** "By launch day it was too late. Everyone knew the iPhone, so it was priced in." The buy is at the close on launch day itself, the most hyped day there was, and the first thing the stock does is crash below $499 in 2008. It still comes to ≈ 74×.

### Beat sheet (chart clock: x 2007 → 2025.99 over t 0.3 → 21.4 s, ≈ 1.11 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Both counters at **$499** (24 px more air under the header than round 1). Empty axis 2007-2025. Year clock "2007". Footer. | "Launch day 2007: you skip the $499 iPhone and buy Apple stock." (0.0-5.8) |
| 0.3 | The race starts. | |
| 0.84 | The phone icon drops onto the white line, just left of the start point (pop; the SPENT counter flushes coral). No chart tag: the header, both counters and the board's phone glyph already say $499 / iPhone. | |
| 1.40 | End of 2007: green tip **$809**, the first payoff, under the year clock's "2007". | |
| 2.15-2.84 | Open in the red: the green line falls through the white line (t 2.15) to **$348** at the end of 2008 (thud, t 2.51; the counter turns coral; the clock reads "2008"), then is back above $499 by t 2.84. | |
| 6.0 | End of 2012 at t 6.96: **$2,196** (tick). | "2012: about $2,200. You just hold." (6.0-9.6) |
| 9.8 | The axis has rescaled and the white $499 line lies on the floor: from 10.6 s a "$499 / SPENT" tag rides its right end (until 14.7 s, when the 2016-19 closes squeeze under it). End of 2017 at t 12.51: **$5,403**, over 10× (tick). | "2017: over 10 times. The phone's long gone." (9.8-13.2) |
| 13.7 | The green tip passes **$10,000** (ding, t 14.78; the clock has just rolled to "2020"). | "2020: it passes $10,000." |
| 16.6 | End of 2021 $23,713 → end of 2022 $17,451 (t 16.96 → 18.07; the clock reads "2022" on the bottom). | "2022 knocks off a quarter." |
| 19.6 | 2023-2024: $26,004, $33,989; the "$499 / SPENT" tag is back from 20.0 s. Final **≈ $37,000** at t 21.4 (cash; the tag bumps with it). Footer step: `≈ 136.7 shares × $271.12 (12/31/25 close)`. | "2025: about $37,000." (19.6-22.0: the caption covers the plot's squeeze) |
| 22.0 | The plot squeezes up (21.7-22.0) and the verdict lands under it, in the band over the stage foot; the header keeps the hook: **≈ 74×** your $499. / 2× every **≈ 3 yrs**. | "About 74 times. It doubled about every 3 years." |
| 25.6-26.5 | Hold on the finished race, then a hard cut to frame 1 (loop). | |

The year clock rolls to the next year one frame after each Dec-31 close (x = y + 0.99), so every close lands under its own year and a beat a few days into the new year (the $10,000 crossing at x 2020.03) is never caught mid-roll.

The 2008 dip plays under the hook line on purpose: it is a picture beat (the mute test), not a spoken one, so no VO line has to race it.

### Guide VO script (47 words; every line fits 2.6 written and 2.8 spoken words per second)

> Launch day 2007: you skip the $499 iPhone and buy Apple stock. 2012: about $2,200. You just hold. 2017: over 10 times. The phone's long gone. 2020: it passes $10,000. 2022 knocks off a quarter. 2025: about $37,000. About 74 times. It doubled about every 3 years.

Every middle line now lands a number on a visible close (2012 at 6.96 s, 2017 at 12.51 s, each with a tick), so there is no 7-second stretch without a beat. The JSON glues "about $2,200", "about $37,000", "Apple stock", "just hold" and "long gone" with no-break spaces (`\u00a0`) so the Scoreboard captions never orphan a word or split "about" from its number.

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
| Dips below $499 in 2008 | linear crossing between the 2007 ($809.34) and 2008 ($348.41) points at x 2008.66 (t 2.15) | |
| "2012: about $2,200" (VO) | 136.71 × $16.06 = $2,195.60, to 2 significant figures | the 2012 close, at t 6.96 |
| "2017: over 10 times" (VO) | 136.71 × $39.52 = $5,402.87; ÷ $499 = 10.83 (the check asserts 10-11) | the 2017 close, at t 12.51 |
| Passes $10,000 in 2020 | crossing between $9,660 (2019) and $17,611 (2020) at x 2020.03 (t 14.78) | |
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
- **YouTube Shorts:** use the question title (R11). Put no CTA on screen, end on the verdict, and let it loop. The loop lands on the 2008 dip within 2 s of the restart, a good replay hook.
- **Instagram Reels:** the cover is frame 1 (header + $499 tips). The caption is the POV line plus a verdict with no number: the caption sits over the video, so a result in it would kill the open loop at 0.0 s.
- **TikTok:** caption the way @investment_timeline does (its captions are the POV title plus hashtags, never a result), with our numberless verdict added: the caption above. No licensed music: SFX + VO only.
- **All:** "Apple" and "iPhone" appear as text only. No Apple logo and no product photo; the kit's generic `phone` icon stands in.

---

## (b) 06b: Live Sheet, "your Netflix bill into Netflix stock"

**Look:** Live Sheet: a white sheet on black, the yellow `#FFD60A` banner, and the formula bar showing the working (`lookOpts.formulaBar`). The race is drawn in the sheet area: the own line green `#039855`, the spend line red `#D92D20`, and the price hikes as rings on the spend line with a dark price tag that pops as the race passes each one.
**Platform title (YouTube):** "Your 2012-2025 Netflix Bills in Netflix Stock: How Many Years of Free Netflix?"
**Hook pass 2 (2026-10-08): replaced.** The two judges averaged the old hook ("POV: You invested in Netflix / instead of paying Netflix, / ever since it was $7.99") at 6.0. Rewrite A, below, averaged 7.5 (7.5 and 7.5, both honest), 1.5 above it, so it is adopted under the round-2 rule (at least 1.0 above the current hook). Hook pass 1 had kept the old hook. The race, the data, the hike tags, raceT and the sfx are unchanged. Scores and reasons are in the Review log.
**On-screen hook (header):** `**$19.99** Netflix, free for / how many years, if your / 2012-25 bills bought its stock?` (14 words, 3 lines, one $ figure).
- The viewer's own current bill is the first token, in the banner's dark pill. Standard has cost $19.99 since March 2026.
- It is the **unit of the answer**, not the money invested. The judges' objection to "$19.99" in hook pass 1 (option D) was that a viewer could read it as $19.99 a month invested; here it cannot.
- The answer slot is visibly empty on frame 1: the formula bar types `≈ stock ÷ ($19.99 × 12) = ? years`.
- The start year sits in the header ("2012-25"), and the start row, the tag "Jan 2012 $7.99" and the axis show where the bills begin.

**Footer:** `Standard plan list price, 2012-25 · 12/31/25 value ÷ $19.99 a month`. It dates the race and states the conversion.

**Modelled on:**
- H04 HD Guy "Cost in Units of Starbucks Lattes", footer "Tall Latte ☕ = $4.45": 9,858,084 (106.16x). A big sum re-priced in a unit the viewer pays, with that unit's price on frame 1.
- H01 HD Guy "Cost in Units of RTX 5090": 30,617,461 (62.49x).
- H64 Gage Heward "What $1 costs you by age": 1,150,974 (210x median). The viewer's own small number, answered as a span of time.
- Hook bank §4.1 Rewrite B, "$1,000,000,000,000 ÷ 8.2 billion people = $___ each": an empty answer slot as the open loop (here "= ? years" in the bar).
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). The same-brand irony is kept.

**Hook rules it satisfies:**
- **R1:** $19.99 is the header's first token. The start row ($7.99 / $7.99), the start tag and the bar's `($19.99 × 12)` are on frame 1 too.
- **R2:** one $ figure in the header, and no result in the header, title or caption. The answer slot is empty.
- **R3:** $19.99 is the bill Standard subscribers pay today, the strongest viewer-owned number in this format.
- **R4:** $19.99, small and familiar.
- **R5:** see the wrong belief below. The first bar step opens small: at the end of 2012, a whole year of bills in the stock ($107) covers only ≈ 5 months of today's Netflix.
- **R6:** you ("your 2012-25 bills") + $19.99 + the 2012-25 horizon, all in the header.
- **R7:** bill vs stock, the same brand twice.
- **R8:** 14 words.
- **R9:** one countable answer, counted in the bar at each beat: ≈ 5 months (2012), 2.4 years (2013), 38 (2020), 22 (the 2022 halving), then 74. The hike tags still count "Hike 1" to "Hike 7" as the race passes them.
- **R10:** the race moves at 0.3 s. The 2012 row lands at 1.91 s, and the first payoff in the hook's own unit ("≈ 5 months") is typed by about 2.75 s.
- **R11:** the header and the title ask; the caption has no number.
- **R12:** "≈ 74 years of Netflix" is one lopsided, repeatable number.

**Wrong belief it exploits (R5):** "Old streaming bills are just gone." Every 2012-2025 bill, put in Netflix stock, would now pay for ≈ 74 years of today's $19.99 Netflix. The flat-price assumption is stated on screen ("at $19.99 a month") and in the pinned comment.

**What the judges still flag:** the header reads as a word problem (a conditional clause and the "2012-25" shorthand must be parsed in 1.5 s), it drops P6's "instead of paying", and two prices are in view at once ($19.99 in the banner, $7.99 in the start row). The 74 years holds the price flat after 8 hikes in 14 years, so expect "prices will rise" comments.

### Beat sheet (chart clock: x 2012 → 2025.99 over t 0.3 → 23.0 s, ≈ 1.62 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner header with **$19.99** in the dark pill. The formula bar is mid-typing `≈ stock ÷ ($19.99 × 12)` and finishes `= ? years` by about 0.4 s: the answer slot, empty. Start row **$7.99 / $7.99**, tag "Jan 2012 $7.99", footer. Caption "YOUR $19.99 NETFLIX, FREE". | "Your $19.99 Netflix, free. For how long?" |
| 0.3 | The race starts. At 1.5 s the live row reads ≈ $74 / $82. | |
| 1.91 | End of 2012: paid $95.88, owned **$107**. | |
| 1.93 | The bar erases and types `≈ $107 ÷ $19.99 ≈ 5 months` (done by about 2.75 s, readable until 3.55 s): the first payoff, in the hook's own unit. There are no history rows in this layout and the live row rolls on, so this step is the lasting record of 2012. Caption "FOR HOW LONG?". | |
| 3.0 | End of 2013 at t 3.53: owned **$568** vs $191.76 paid. At 3.55 the bar types `≈ $568 ÷ $239.88 ≈ 2.4 years`. | "Since 2012, every bill buys Netflix stock." |
| 4.08 | Tag "Hike 1 · May 2014 $8.99" (tick). | |
| 6.0 | Tag "Hike 2 · Oct 2015 $9.99" at t 6.38 (tick). | "Price hike? Your investment goes up too." |
| 9.2 | Formula bar `≈ each year's bills ÷ that year's avg price`. "Hike 3 · Oct 2017 $10.99" (t 9.63) and "Hike 4 · Jan 2019 $12.99" (t 11.66). | "Each year's bills buy at that year's average price." |
| 13.4 | "Hike 5 · Oct 2020 $13.99" (t 14.50). End of 2020: **$9,181** (t 14.89). At 14.91 the bar types `≈ $9,181 ÷ $239.88 ≈ 38 years`. | "2020: about 38 years of Netflix." |
| 16.9 | "Hike 6 · Jan 2022 $15.49" (t 16.53). End of 2021 $10,410 (t 16.51, ≈ 43 years, not shown), then **$5,289** (thud, t 18.13). At 18.15 the bar types `≈ $5,289 ÷ $239.88 ≈ 22 years`. | "2022: it halves." |
| 18.7 | End of 2023 $8,964 (t 19.75), end of 2024 $16,656 (t 21.38). "Hike 7 · Jan 2025 $17.99" (t 21.39). | "You keep paying. It comes back." |
| 21.2 | Formula bar `≈ 188.8 shares × $93.76 ≈ $17,700`. Final at t 23.0: owned **≈ $17,700**, paid **$2,037.32 spent** (cash). | "About $2,037 in bills. About $17,700 in stock." |
| 26.0 | Verdict: **≈ 74 years** of Netflix / at $19.99 a month. Formula bar `≈ $17,700 ÷ $239.88 ≈ 74 years`. | "At $19.99 a month: about 74 years of Netflix." |
| 29.6-30.5 | Hold, then clear back to frame 1. | |

The VO says each year-count when its year lands. The bar shows the working just after (2020: the VO's "38" at about 14.6 s, the 2020 row at 14.89, the bar's "≈ 38 years" by about 16.3 s).

### Guide VO script (62 words)

> Your $19.99 Netflix, free. For how long? Since 2012, every bill buys Netflix stock. Price hike? Your investment goes up too. Each year's bills buy at that year's average price. 2020: about 38 years of Netflix. 2022: it halves. You keep paying. It comes back. About $2,037 in bills. About $17,700 in stock. At $19.99 a month: about 74 years of Netflix.

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
| `≈ 188.8 shares × $93.76 ≈ $17,700` | 188.8 × 93.76 = 17,701.9 |
| $19.99, `($19.99 × 12)` (header, bar, footer, VO, verdict) | today's Standard bill (from March 2026). It is the unit of the answer, not a race input: the race's 168 bills run Jan 2012-Dec 2025 and end on the $17.99 bill |
| $239.88 (bar) | 12 × $19.99, a year of today's Standard |
| `≈ $107 ÷ $19.99 ≈ 5 months` (2012) | $106.98 ÷ 19.99 = 5.35 months (shown $107 ÷ 19.99 = 5.35) |
| `≈ $568 ÷ $239.88 ≈ 2.4 years` (2013) | $568.35 ÷ 239.88 = 2.369 (shown $568 → 2.368) |
| `≈ $9,181 ÷ $239.88 ≈ 38 years` / "about 38 years" (2020) | $9,181.15 ÷ 239.88 = 38.27 (shown $9,181 → 38.27) |
| (not shown) 2021 peak | $10,409.99 ÷ 239.88 = 43.40 years |
| `≈ $5,289 ÷ $239.88 ≈ 22 years` (2022) | $5,288.73 ÷ 239.88 = 22.05 (shown $5,289 → 22.05). 43.4 → 22.0 years is the spoken "it halves" (the stake fell 49.2%) |
| `≈ $17,700 ÷ $239.88 ≈ 74 years` / "about 74 years" / verdict | $17,705.59 ÷ 239.88 = 73.81 (885.7 months); the bar's ≈ $17,700 ÷ 239.88 = 73.79. Both round to 74 |
| Year-count rounding | months to the whole month; years to 2 significant figures (2.4, 38, 22, 74). The check asserts that each step rounds the same from the exact stake and from the whole-dollar figure the bar shows |
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
- **Instagram Reels:** the cover is frame 1 (the $19.99 question and the empty "= ? years"). The sheet with the formula bar makes a save-worthy final frame, so hold it for 1+ s before the loop. Captions are Inter ExtraBold uppercase with the keyword in yellow (look spec). The post caption is the numberless line above.
- **TikTok:** the caption above (no number) and `#netflix #usa #investment #stocks`. The pinned comment asks "Which plan are you on?", so viewers on Premium or the ad tier can redo the division with their own bill.
- **All:** "Netflix" in text only, no N logo. The spend icon is the kit's generic `ticket`.
- **Kit request (Live Sheet):** pre-place the 7 hike rings on the timeline as empty markers at frame 1 and fill each as its tag pops, so the count ("Hike 3 of 7") is visible before it happens (R9). The spec works without it.

---

## (b) 06c: Becker Rig, "a $4 latte a day vs Starbucks stock"

**Look:** Becker Rig, from `research/v2/watch/alan-becker.md` sections 3, 4 and 6:
- One rigged stick figure in our own hero colour (not Becker orange) on a white void with a floor gradient, the maths in neutral ink.
- Two piles on one dollar scale: the spent money as a ghost column, the same money in the stock as a tower of gold coins on an "SBUX" plinth.
- Every operation is a verb the figure performs: it pays a coin for the cup, drinks, and flings the cup onto a junk heap; the coins land on the tower and tumble off it when the stock falls.
- Impacts use the kit's flash, shake and SFX.
- Applied here are transfer devices "numbers are objects", "results are transformations" and "one number per short that the viewer watches move". The kit's pov-race module draws this by default; the spec only sets `lookOpts` `prop: "cup"`, `jarLabel: "SBUX"` and `endPose: "shrug"`.

**Platform title (YouTube):** "What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?" (the format's own grammar, like 06a/06b; it no longer collides with 09c's yes/no "Does $5 a Day Invested Make You a Millionaire?", which reaches the opposite verdict)
**Hook pass (2026-10-08): kept.** The two judges averaged the current hook at 7.0, the highest score in this teaser's set. The best candidate (C, "12 years of $4/day lattes … Watch year 9") averaged 6.5. B was marked dishonest by judge 2, so it is out. The hook, title and body stay as they are. Details are in the Review log.
**On-screen hook (header):** `POV: Since 2014 you invested / in Starbucks instead of paying / **$4/day** for a Starbucks latte` (15 words, 3 lines). The brand's own product is named, as in H45 Monster.
**Footer:** `$4 ≈ a grande latte · each year at its avg price · dividends reinvested`

**Modelled on:**
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). Same grammar: a $X/day habit and a same-brand pairing, with the product named.
- Contrast H47 "POV: You invested in NVIDIA instead of paying $3/day for coffee": 379.9K (29.0x), the smallest post. Its coffee isn't the company's own product; here the latte and the stock are both Starbucks.
- Non-benchmark context only: @davidlbach "The Latte Factor! DRINKING A STARBUCKS COFFEE A DAY VS BUYING THE STOCK INSTEAD (SBUX)", 1.9M (201.5x) (watch/investment-timeline.md §4). It shows demand, and that the idea is taken; our answer is an honest "meh".

**Hook rules it satisfies:**
- **R1:** "$4/day" is in the header, and the figure holds up the $4 coin with both tips at $4 on frame 1.
- **R2:** one input, no result, in the header, the title and the caption.
- **R3:** a habit price coffee buyers can swap their own number into (the pinned comment asks).
- **R4:** a round $4.
- **R5:** the first spoken words raise the latte-factor belief as a question ("Skip the $4 latte, get rich?"), and "Not rich. Not zero." answers it.
- **R6:** you + $4/day + since 2014.
- **R7:** "a Starbucks latte" vs Starbucks stock, the brand named twice.
- **R8:** 15 words.
- **R9:** the year timeline only; the cup heap cannot be counted.
- **R10:** something changes at 0.5 s (the coin buys the cup, the cup is drunk and flung, a coin lands on the tower), and the first payoff ($1,586 vs $1,460 at the end of 2014) lands at 2.1 s.
- **R11:** the title asks, the screen says POV, and the caption sets up the test without the answer.
- **R12:** "≈ 1.4×. Not rich. Not zero." is the repeatable verdict, said and shown word for word. The lopsided frame (cups $0, stock ≈ $24,900) is in the picture: the cup heap and ghost column against the gold tower. The two-line verdict "Cups: $0. Stock: ≈ $24,900." is ready to swap in once the kit's verdict band is fixed (see the Review log).

**Wrong belief it exploits (R5):** "Skip the latte and you'll be rich" (the "latte factor"). Invested in the latte company's own stock, 12 years of lattes come to ≈ 1.4×, with almost no growth after 2021. It is an honest "meh", the same move as GoPro's decline, the biggest post in the benchmark set. The flip side is in the picture and the last word of the verdict: the cups are worth $0, the stock is "not zero".

### Beat sheet (chart clock: x 2014 → 2025.99 over t 0.5 → 20.4 s, ≈ 1.66 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. The figure holds up the $4 coin. Tips **$4 / $4**. Timeline 2014-2025. Footer. | "Skip the $4 latte, get rich?" |
| 0.5 | Race starts. Tag "Day 1 · $4" (pop): the coin buys the cup, the figure drinks and flings it onto the heap, and a coin lands on the SBUX tower, all inside the first second. The loop repeats every year. | |
| 2.14 | End of 2014: spent **$1,460**, owned **$1,586** (first payoff). | |
| 2.6 | 2015 (t 3.80): $3,997 vs $2,920. | "Since 2014, it buys Starbucks stock instead." |
| 5.6 | 2016-2017 (t 5.46, 7.12): $5,199 → $6,955 against $4,384 → $5,844. | "That's $1,460 a year." |
| 8.7 | 2019-2020 (t 10.44, 12.10): owned $14,988 → $20,521 against spent $8,764 → $10,228. The tower outgrows the ghost column; the camera pulls back. | "The stock climbs faster than the cups pile up." |
| 12.4 | End of 2021 (t 13.76, ding): owned **$24,343**, spent $11,688 (2.08×). | "By 2021, you've doubled your money." |
| 15.0 | 2022 dip to $22,808 (t 15.42): coins tumble off the tower while the ghost column keeps growing. | "Then it stalls. You keep buying." |
| 17.35 | 2023 $23,942 (t 17.08), 2024 $24,865 (t 18.74). Final at t 20.4 (cash): **$17,532 spent**. | "2025: $17,532 of lattes." |
| 20.6 | Own **≈ $24,900** on the gold plate. | "Or about $24,900 in stock." |
| 23.7 | Verdict: **≈ 1.4×**. Not rich. Not zero. The figure shrugs at the tower, next to the heap of empty cups. | "About 1.4 times. Not rich. Not zero." |
| 27.0-28.0 | Hold, then loop. | |

### Guide VO script (54 words)

> Skip the $4 latte, get rich? Since 2014, it buys Starbucks stock instead. That's $1,460 a year. The stock climbs faster than the cups pile up. By 2021, you've doubled your money. Then it stalls. You keep buying. 2025: $17,532 of lattes. Or about $24,900 in stock. About 1.4 times. Not rich. Not zero.

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

| On screen / spoken | Formula |
|---|---|
| $4/day, "Day 1 · $4" | input: a round stake inside the sourced latte bracket ($3.65 in 2014, $4.45 in 2024) |
| $1,460 a year | $4 × 365 |
| $17,532 spent | $4 × 4,383 days (1/1/2014-12/31/2025, three leap years) |
| ≈ $24,900 / "about $24,900" | 296.03 shares × $84.21 = $24,928.31, to 3 significant figures |
| ≈ 1.4× / "about 1.4 times" | 24,928.31 ÷ 17,532 = 1.42 |
| "climbs faster than the cups" (spoken over 2019-2021) | the stake grew +$5,354, +$5,533 and +$3,822 in those years, against $1,460 of lattes a year |
| "doubled" by 2021 | $24,343 ÷ $11,688 = 2.08 |
| "stalls" | 2022-2025: $5,844 more in, while the stake rose only $585 ($24,343 → $24,928). The 229 shares held at the end of 2021 fell from $106.24 to $84.21. |
| "Not zero" | the lattes are drunk: $0 left; the stock is not |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| Grande caffè latte $3.65 (2014) → $4.45 (2024) | Visual Capitalist, "Charted: Starbucks Price Inflation (2014-2024)" (2024; exact date not returned), https://www.visualcapitalist.com/charted-starbucks-price-inflation-2014-2024/. Its data is FinanceBuzz's analysis of 2014, 2019 and 2024 menu prices from archived menus via the Wayback Machine. | Voronoi (Visual Capitalist's app), "How Starbucks Menu Prices Have Changed Since 2014", https://www.voronoiapp.com/economy/How-Starbucks-Menu-Prices-Have-Changed-Since-2014-1381. **This is the same dataset, so it is not independent.** That is why the stake is a round $4 described as "≈ a grande latte", not a precise price. Context: WTKR/CNN, "Get ready to pay more for that latte: Starbucks prices are going up", 2014-06-20, https://www.wtkr.com/2014/06/20/get-ready-to-pay-more-for-that-latte-starbucks-prices-are-going-up (it says the grande latte price did not change in the June 2014 adjustment). |
| SBUX annual average, year close and % change, 2014-2025 (adjusted for splits and dividends) | Macrotrends, "Starbucks - 34 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/SBUX/starbucks/stock-price-history (two searches: the 2014-2021 rows and the 2022-2026 rows) | Internal check: every % change 2015-2025 reproduces from the closes, including across the 2021 → 2022 seam between the two searches. Cross-check: a second search gave $82.71 for the 2025 year-end, probably on a later dividend basis. It would make the final ≈ $24,484 (−1.8%), still "≈ 1.4×". |

**Assumptions (footer):**
- $4 every day, 1/1/2014-12/31/2025, held flat. Real latte prices started below $4 and ended above it.
- Each year's money buys at that year's average adjusted price.
- Dividends are reinvested.
- The value is taken at the 12/31/2025 close ($84.21).
- No fees or taxes.

**Caption:** POV: Since 2014 you invested in Starbucks instead of paying $4/day for a Starbucks latte. The latte factor, tested on Starbucks itself. #starbucks #latte #lattefactor #usa #investment #stocks

**Pinned comment:**
The maths:
- $4 × 365 = $1,460 a year, bought at each year's average SBUX price (dividends reinvested).
- By 2021: $11,688 in → $24,343.
- 2022-2025: another $5,844 in, but the stake grew just $585.
- End (12/31/2025 close): 296.0 shares × $84.21 ≈ $24,926, vs $17,532 of lattes. ≈ 1.4×.

A grande latte was $3.65 in 2014 and $4.45 in 2024 (FinanceBuzz). What do you pay now?

**Per-platform notes:**
- **YouTube:** the "What if" title asks; the verdict answers it on screen at 23.7 s.
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
