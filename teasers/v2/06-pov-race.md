# Format 6: POV spend-vs-own race (pattern P6)

**Teasers:** 06a Scoreboard (Apple / first iPhone), 06b Scoreboard (Netflix bill / Netflix stock; ported from Live Sheet on 2026-10-08), 06c Becker Rig (latte / Starbucks stock)
**Date:** 2026-10-07; hook pass 2026-10-08 (06b and 06c kept); hook pass 2 2026-10-08 (06b's hook replaced); 06b ported to Scoreboard 2026-10-08 · **Writer:** format 6 (revised after review, see the Review log at the end) · **Specs:** `studio/specs/06a-scoreboard-first-iphone-apple.json`, `06b-scoreboard-netflix-bill.json` (the Live Sheet spec is in `studio/specs/retired/`), `06c-becker-rig-latte-starbucks.json`
**Check:** `python3 teasers/v2/checks/06-pov-race.py`. It recomputes every on-screen and spoken number, cross-checks the source tables, and asserts the specs match, including VO pacing in spoken words (numbers read out in full) and the motion/payoff timing of the hook. Current result: 436 checks, 0 failed (after the port QA fix pass on 06b).

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

Every middle line now lands a number on a visible close (2012 at 6.96 s, 2017 at 12.51 s, each with a tick), so there is no 7-second stretch without a beat. The JSON glues "Apple stock", "about $2,200", "just hold", "over 10", "long gone" and "about $37,000" with no-break spaces (`\u00a0`) so the Scoreboard captions never orphan a word or split "about" from its number.

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

**Footer:** `Standard plan list price · 12/31/25 close` (one line). It dates the value; the ÷ $19.99 conversion is the answer row's frame-1 working, and the horizon is the year clock's 2012 and the 2013-2025 axis. Footer steps rewrite it to the working at 9.2 s (`Each year: bills ÷ avg price`), 21.2 s (`188.8 shares × $93.76 ≈ $17,700`) and 26.0 s (`$17,706 ÷ $239.88 ≈ 74 years`).

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
- **R9:** one countable answer, counting live in the answer row from "?" through every year, and landing (with a bump and a ding, line 1 naming the year: "2012: $107 ÷ $19.99") on the spoken year-ends: ≈ 5 months (2012), ≈ 38 years (2020), ≈ 22 years (the 2022 halving, in coral on a thud), then ≈ 74 at the payoff. The race pauses for each landing (1.3 s; 1.8 s for 2020, so the 38 stays up while its caption does). The hike tags still count "Hike 1" to "Hike 7" as the race passes them.
- **R10:** the race moves at 0.3 s (the counters slam in, the first ticket drops) and the answer row counts from it; the first payoff in the hook's own unit, "≈ 5 MONTHS", lands at 1.91 s and holds to 3.21 s, with the race paused on the 2012 close ($95.88 | $106.98).
- **R11:** the header and the title ask; the caption has no number.
- **R12:** "≈ 74 years of Netflix" is one lopsided, repeatable number.

**Wrong belief it exploits (R5):** "Old streaming bills are just gone." Every 2012-2025 bill, put in Netflix stock, would now pay for ≈ 74 years of today's $19.99 Netflix. The flat-price assumption is stated on screen ("at $19.99 a month") and in the pinned comment.

**What the judges still flag:** it drops P6's "instead of paying" (the column labels say it instead). The 74 years holds the price flat after 8 hikes in 14 years, so expect "prices will rise" comments. (Fixed in the assembly pass: the word-problem header, and the two prices in view at once.)

### Beat sheet (chart clock: x 2012 → 2025.99 over t 0.3 → 23.0 s, paused on the three answer-row landings: 1.91-3.21 on the 2012 close, 14.9-16.7 on 2020's, 18.5-19.8 on 2022's; ≈ 1.63, 1.46, 0.90 and 1.07 s per year between them)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header **$19.99** NETFLIX, FREE / FOR HOW MANY YEARS? (64 px, $19.99 green). Board: PAID TO NETFLIX \| IN NETFLIX STOCK, both counters LED-off (unlit ghost digits "$–.––" at counter size). Footer `Standard plan list price · 12/31/25 close`. Stage: year clock "2012", the empty 2013-2025 axis, both tips parked on the start. Answer row: `STOCK ÷ ($19.99 × 12)` (48 px) over **? YEARS** (96 px, a ticket beside it). Caption "Your Netflix, free. For how long?". | "Your Netflix, free. For how long?" (0.0-2.4) |
| 0.3 | The race starts (whoosh): both counters slam in at $7.99 / $7.99 and run; the first ticket drops onto the white line with its tag "$7.99 JAN 2012" (pop, the PAID counter flushes coral; the tag holds to 2.0). The answer row counts from ≈ 1 month (0.52 s), its "≈" an unlit ghost while it runs. | |
| 1.91 | End of 2012: **the race pauses** on the close. Board $95.88 \| $106.98, year clock 2012. The answer row **lands**: line 1 cuts to `2012: $107 ÷ $19.99`, line 2 to **≈ 5 MONTHS** (ding, bump, glow, floor bloom), held to 3.21, when the race resumes. | ("For how long?" is being asked) |
| 3.21 | Line 1 back to `STOCK ÷ ($19.99 × 12)`; the race runs on from the 2012 close. End of 2013 at t 4.67: owned $568, the answer row ≈ 2.4 years (live). | "Since 2012, every bill buys Netflix stock." (3.0-5.9) |
| 5.17 | A ticket drops on the line with "$8.99 HIKE 1 · MAY 2014", right of the race front (pop; the PAID counter bumps and flushes coral). The Jan 2012 ticket shrinks into a pip on the line. | |
| 7.24 | "$9.99 HIKE 2 · OCT 2015" (pop), right of the front, as the green line jumps (2015: $616 → $1,581). | "Price hike? Your investment goes up too." (6.0-8.8) |
| 9.2 | Footer → `Each year: bills ÷ avg price` (tick). "$10.99 HIKE 3 · OCT 2017" (t 10.17) and "$12.99 HIKE 4 · JAN 2019" (t 11.99), each in the top band over the plot, over its ticket, so the x axis keeps its year labels; the older tickets are pips. The answer row runs past ≈ 12, then ≈ 19 years. | "Each year's bills buy at that year's average price." (9.2-12.8) |
| 14.3 | "$13.99 HIKE 5 · OCT 2020" (t 14.55, pop, top band). End of 2020 at t 14.9: **the race pauses**. Board $1,095.92 \| **$9,181**, year clock 2020; the answer row **lands** `2020: $9,181 ÷ $239.88` / **≈ 38 YEARS** (ding), held to 16.7, the end of the caption, as the VO says the 38. | "2020: about 38 years." (14.3-16.7) |
| 16.7 | The race resumes: end of 2021 $10,410 (t 17.6, ≈ 43 years live); "$15.49 HIKE 6 · JAN 2022" (t 17.61, top band). Through 2022 the green line falls and the answer row with it; end of 2022 at t 18.5: **the race pauses**, board $1,449.68 \| **$5,289**, year clock 2022, and the answer row **lands in coral** `2022: $5,289 ÷ $239.88` / **≈ 22 YEARS** (thud), held to 19.8. | "2022: it halves." (17.0-18.6) |
| 19.8 | The race resumes and the answer row climbs: end of 2023 $8,964 (t 20.87, ≈ 37 years), end of 2024 $16,656 (t 21.93, ≈ 69 years). "$17.99 HIKE 7 · JAN 2025" (t 21.94): its tag in the top band, ending just left of its ticket (a tag right over it would sit on the climbing tip). | "You keep paying. It comes back." (18.7-21.1) |
| 21.2 | Footer → `188.8 shares × $93.76 ≈ $17,700` (tick). The finish at t 23.0 (riser, hit, cash): **$2,037.32** / **≈ $17,700** land on the board (IN NETFLIX STOCK bumps, flares and blooms), the only lit number. The answer row does **not** land: line 1 cuts softly to `≈ $17,700 ÷ $239.88` (the board's own figure), line 2 rests on ≈ 74 YEARS with its "≈" still an unlit ghost, dimmed to half. The spend line ends with one full ticket (Hike 7) and seven pips. | "About $2,037 in bills. About $17,700 in stock." (21.2-25.9) |
| 26.0 | **The payoff:** the split board hard-cuts to one hero number under the hook, ticket + **≈ 74 YEARS** (140 px), landed whole (no roll): the 1.13 bump, glow, stage bloom and hit, all at 26.0. Footer → `$17,706 ÷ $239.88 ≈ 74 years`. The answer row yields and the verdict slams into its slot (reveal): **≈ 74 YEARS** OF NETFLIX / AT $19.99 A MONTH. | "At $19.99 a month: about 74 years of Netflix." (26.0-29.6) |
| 29.6-30.5 | Hold on the hero, the finished race and the verdict, then a hard cut to the clean cover (the loop). | |

The VO says each year count while the answer row holds it: "about 38 years" is spoken around 14.9-15.7 s, inside the 2020 landing (14.9-16.7), and the 22 lands as "it halves" ends. **During every hold the race is paused on that year-end**, so the board's counters, both tips, the year clock and the row's working show the same year: a paused frame never sets "2012: $107" beside a board that has moved on into 2013. The payoff answers the header directly under it: question on top, **≈ 74 YEARS** right below, the working under that. The 74 is lit once, at 26.0: before that it rests unlit in the answer row while the board's dollars land.

### Guide VO script (60 words)

> Your Netflix, free. For how long? Since 2012, every bill buys Netflix stock. Price hike? Your investment goes up too. Each year's bills buy at that year's average price. 2020: about 38 years. 2022: it halves. You keep paying. It comes back. About $2,037 in bills. About $17,700 in stock. At $19.99 a month: about 74 years of Netflix.

The first line drops the spoken "$19.99" so the frame-1 caption carries no price (the header shows it at 64 px). "2020: about 38 years." loses "of Netflix" so the Live Sheet caption keeps "about 38 years" in one chunk (this kit splits captions at any space, no-break spaces included, so gluing cannot do it). Both lines are unchanged in the Scoreboard port, whose captions set "2020: about 38 years." on one line.

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
| `2012: $107 ÷ $19.99` / ≈ 5 months (answer row, 1.91 s) | $106.98 ÷ 19.99 = 5.35 months (shown $107 ÷ 19.99 = 5.35) |
| (answer row, live) 2013 | $568.35 ÷ 239.88 = 2.37 → ≈ 2.4 years as the race passes 2013 (no longer a bar step) |
| `2020: $9,181 ÷ $239.88` / ≈ 38 years (answer row, 14.9 s, held to 16.7) / "about 38 years" | $9,181.15 ÷ 239.88 = 38.27 (shown $9,181 → 38.27) |
| (not shown) 2021 peak | $10,409.99 ÷ 239.88 = 43.40 years |
| `2022: $5,289 ÷ $239.88` / ≈ 22 years (answer row, 18.5 s, coral) | $5,288.73 ÷ 239.88 = 22.05 (shown $5,289 → 22.05). 43.4 → 22.0 years is the spoken "it halves" (the stake fell 49.2%) |
| `≈ $17,700 ÷ $239.88` / the answer row's ≈ 74 years, unlit (`lookOpts.unit.finalWork`, `final`, 23.0 s) | 17,700 ÷ 239.88 = 73.79 → ≈ 74. Line 1 uses the board's own ≈ $17,700, so no frame shows $17,700 and $17,706 side by side |
| the hero's ≈ 74 YEARS (`lookOpts.payoff`, 26.0 s) / the footer `$17,706 ÷ $239.88 ≈ 74 years` (26.0 s, the board gone) / "about 74 years" / the verdict | $17,705.59 ÷ 239.88 = 73.81 (885.7 months); the working's whole-dollar $17,706 gives 73.81 too. All round to 74, and the live answer row reads ≈ 74 at the finish, so the row's resting number never jumps |
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
- **Instagram Reels:** the cover is frame 1: the 64 px $19.99 question, the LED-off board and the empty "? YEARS" answer. The final frame is the save-worthy one: the question, **≈ 74 YEARS** right under it, the working, the race (one ticket, seven pips: nothing cut by the green line) and the verdict. It holds 4.5 s after the hero lands. Captions are the Scoreboard's Inter Tight 800, white as each word is spoken. The post caption is the numberless line above.
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
- Applied here are transfer devices "numbers are objects", "results are transformations" and "one number per short that the viewer watches move". The kit's pov-race module draws this by default; the spec sets `lookOpts` `prop: "cup"`, `jarLabel: "SBUX"` and `endPose: "shrug"`, plus the round-2 beats: `multiple` (the "2×" mark, which pauses the race on the 2021 close), `land` (each year-end's exact figures hold for 0.12 s), `chip` ("+$1,460" on the spent column at the 2017 close), `spentLeft` ("$0 left" in the emptied spent column at the verdict), `endMark` ("≈ 1.4×" drawn on the piles at the verdict), `rail: "plain"` and `tagLife: 0.8`.

**Platform title (YouTube):** "What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?" (the format's own grammar, like 06a/06b; it no longer collides with 09c's yes/no "Does $5 a Day Invested Make You a Millionaire?", which reaches the opposite verdict)
**Hook pass (2026-10-08): kept.** The two judges averaged the current hook at 7.0, the highest score in this teaser's set. The best candidate (C, "12 years of $4/day lattes … Watch year 9") averaged 6.5. B was marked dishonest by judge 2, so it is out. The hook, title and body stay as they are. Details are in the Review log.
**On-screen hook (header):** `POV: Since 2014 you invested / in Starbucks instead of paying / **$4/day** for a Starbucks latte` (15 words, 3 lines). The brand's own product is named, as in H45 Monster.
**Footer:** `$4 ≈ a grande latte · with dividends` (one line since the round-2 QA fix pass; "each year at its average price" and "reinvested" are in the pinned comment and the assumptions below)

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
- **R10:** something changes at 0.5 s (the coin buys the cup, the cup is drunk and flung, a coin lands on the tower), and the first payoff ($1,586 vs $1,460 at the end of 2014) lands at 2.1 s, held for 0.12 s so the exact figures can be read.
- **R11:** the title asks, the screen says POV, and the caption sets up the test without the answer.
- **R12:** "≈ 1.4×. Not rich. Not zero." is the repeatable verdict, said and shown word for word. The lopsided frame is drawn on the piles at the verdict: the spent column empties to its dashed outline with a red **"$0 left"** in it, and a green dotted line on the tower top, labelled **"≈ 1.4×"**, sits above the red paid line (1×). "≈ $24,900" on the gold plate is the biggest number on screen (it grows to about 90 px as it lands; "$17,532" steps down to 64 px). The two-line verdict "Cups: $0. Stock: ≈ $24,900." is ready to swap in once the kit's verdict band is fixed (see the Review log).

**Wrong belief it exploits (R5):** "Skip the latte and you'll be rich" (the "latte factor"). Invested in the latte company's own stock, 12 years of lattes come to ≈ 1.4×, with almost no growth after 2021. It is an honest "meh", the same move as GoPro's decline, the biggest post in the benchmark set. The flip side is in the picture and the last word of the verdict: the cups are worth $0, the stock is "not zero".

### Beat sheet (chart clock: x 2014 → 2021.99 over t 0.5 → 13.76 s, ≈ 1.66 s per year; paused 13.76-15.06 on the 2021 close; x 2021.99 → 2025.99 over t 15.06 → 20.4 s, ≈ 1.34 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. One-line footer. The figure holds up the $4 coin. Tips **$4 / $4**. Timeline: "2014", a progress line and "2025" at its end. | "Skip the $4 latte, get rich?" |
| 0.5 | Race starts. Tag "Day 1 · $4" (pop, left of the figure, until 1.3): the coin buys the cup, the figure drinks and flings it onto the heap, and a coin lands on the SBUX tower, all inside the first second. The loop repeats every year. | |
| 2.14 | End of 2014: spent **$1,460**, owned **$1,586** (first payoff), held for 0.12 s like every year-end. | |
| 2.6 | 2015 (t 3.80): $3,997 vs $2,920. | "Since 2014, that $4 buys Starbucks stock." |
| 5.9 | 2016 (t 5.46): $5,199 vs $4,384. 2017 close (t 7.12): $6,955 vs $5,844, and a red **"+$1,460"** chip pops on top of the spent column and rides it to 8.52. | "That's $1,460 a year." |
| 8.85 | 2019-2020 (t 10.44, 12.10): owned $14,988 → $20,521 against spent $8,764 → $10,228. The tower outgrows the ghost column. | "The stock climbs faster than the cups pile up." |
| 12.4 | End of 2021 (t 13.76, ding): owned **$24,343**, spent **$11,688** (2.08×). The race clock pauses 13.76-15.06: the year reads 2021, both counters and both piles hold those figures, and the figure watches the tower. On the ding a green dotted line labelled **2×** draws across the piles at 2 × $11,688 = $23,376, just under the tower top. | "By 2021, you've doubled your money." |
| 15.0 | The race resumes at 15.06 (the 2× mark fades by 15.36). 2022 dip to $22,808 (t 16.39): coins tumble off the tower while the ghost column keeps growing ($13,148). | "Then it stalls. You keep buying." |
| 17.35 | 2023 $23,942 vs $14,608 (t 17.73), 2024 $24,865 vs $16,072 (t 19.07). Final at t 20.4 (cash): **$17,532 spent**; the stock counter runs onto the exact $24,928. | "2025: $17,532 of lattes." |
| 20.6 | Own **≈ $24,900** on the gold plate: a hard cut on the hit frame (20.4), the number and the plate popping together, hit + a one-sided burst onto the tower. Over 0.4 s the plate grows 1.2× (the number to about 90 px) while "$17,532" steps down to 64 px. | "Or about $24,900 in stock." |
| 23.7 | Verdict: **≈ 1.4×**. Not rich. Not zero. The spent column empties to its dashed outline and **"$0 left"** pops inside it; a green dotted line on the tower top runs from over the spent column to the tower, **"≈ 1.4×"** under its left end, above the red paid line. The figure shrugs next to the heap of empty cups. | "About 1.4 times. Not rich. Not zero." |
| 27.0-28.0 | Hold, then loop. | |

### Guide VO script (54 words)

> Skip the $4 latte, get rich? Since 2014, that $4 buys Starbucks stock. That's $1,460 a year. The stock climbs faster than the cups pile up. By 2021, you've doubled your money. Then it stalls. You keep buying. 2025: $17,532 of lattes. Or about $24,900 in stock. About 1.4 times. Not rich. Not zero.

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
| the **2×** mark (end of 2021) | a line at 2 × $11,688 = $23,376; the tower ($24,343) is above it, so "2×" is the whole multiple reached |
| "stalls" | 2022-2025: $5,844 more in, while the stake rose only $585 ($24,343 → $24,928). The 229 shares held at the end of 2021 fell from $106.24 to $84.21. |
| "+$1,460" chip (2017 close) | $4 × 365: 2017 is not a leap year (2016, 2020 and 2024 add $1,464) |
| "Not zero", "$0 left" (in the emptied spent column at the verdict) | the lattes are drunk: $0 left; the stock is not |
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
