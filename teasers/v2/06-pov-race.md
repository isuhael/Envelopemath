# Format 6: POV spend-vs-own race (pattern P6)

**Teasers:** 06a Scoreboard (Apple / first iPhone), 06b Live Sheet (Netflix bill / Netflix stock), 06c Becker Rig (latte / Starbucks stock)
**Date:** 2026-10-07 · **Writer:** format 6 · **Specs:** `studio/specs/06a-scoreboard-first-iphone-apple.json`, `06b-live-sheet-netflix-bill.json`, `06c-becker-rig-latte-starbucks.json`
**Check:** `python3 teasers/v2/checks/06-pov-race.py`. It recomputes every on-screen and spoken number, cross-checks the source tables, and asserts the specs match. Current result: 313 checks, 0 failed.

---

## (a) The format in 5 lines

1. **Mechanic.** "POV: you invested in [company] instead of paying $[one small price] for [its own product]". The spend line holds the money that is gone. The own line is the same money in that company's stock, running to a dated final value. The hook carries one input and never the result.
2. **Evidence: @investment_timeline.** All 5 of its known posts are outliers, 9.53M views in total:
   - [GoPro $400](https://www.tiktok.com/@investment_timeline/video/7680106550278556961): 5.1M (22.6x).
   - [Crocs $50](https://www.tiktok.com/@investment_timeline/video/7676037874105519393): 1.9M (117.9x).
   - [Monster $3/day](https://www.tiktok.com/@investment_timeline/video/7671760671867997473): 1.5M (140.6x).
   - [GeForce 256 $599](https://www.tiktok.com/@investment_timeline/video/7671180194241170720): 650.5K (62.5x).
   - Smallest: [NVIDIA vs $3/day coffee](https://www.tiktok.com/@investment_timeline/video/7666855093882375457), 379.9K (29.0x). It is the only post where the product isn't the company's own.
3. **Header grammar: ChartOrbit.** Its biggest shorts use the same second-person header:
   - "POV: In 2002 You invested $5000 in…": [15,876,376 (100.45x)](https://www.youtube.com/shorts/KmtLGAPIutg).
   - "POV: Since 1996 you invested $100/month in … and never sold": [1,391,731 (5.91x)](https://www.youtube.com/shorts/2cF446rExhY). Its grey "Investment" line is the only working ChartOrbit ever shows.
4. **Rules.** Keep the same-brand pairing, one small input and a hidden result; honest losses and "meh" results count too, since GoPro, a decline, is the biggest post. Add three things: the spend line beside the value line, a last-second envelope line (multiple or doublings), and a footer with the dates and the dividend choice.
5. **Risks.** None of the 5 @investment_timeline videos could be watched (all 7 watch jobs failed), and n = 5, so viability is 6. Their posts are 60 s; ours sit in the 18-35 s lane (26.5 / 30.5 / 28.0 s).

### Where the teasers depart from the seeds (inside the lane)

| Seed | What we made | Why |
|---|---|---|
| 06a "every new base iPhone since 2007" | **One purchase: the $499 first iPhone, on launch day** | **Pricing.** From 2008 to 2015 Apple quoted US prices as "$199 with a two-year contract". A per-year spend line would need an unsubsidised price for every model, and that ran past the search budget. Using $199 would understate spend.<br>**Evidence.** The one-off-purchase variant (GoPro, Crocs, GeForce 256) carries 3 of @investment_timeline's 5 posts and 7.65M of its 9.53M views. "$499 for the first iPhone" is one famous, primary-sourced number. |
| 06b "Netflix plan since a sourced year" | **Since 2012** (the plan is $7.99 in every source) | **Price.** One source lists the standalone $7.99 streaming plan from July 2011.<br>**Stock data.** NFLX fell about 60% in late 2011, so half a year bought at the 2011 average price would be wrong. 2012 is the first clean full year. |
| 06c "a sourced latte price, since a sourced year" | **A round $4/day since 2014** | Only one dataset for Starbucks latte prices turned up: FinanceBuzz, republished by Visual Capitalist (grande latte $3.65 in 2014, $4.45 in 2024). A second, independent source for a precise price was not found (2 searches). The stake is therefore a round $4 inside that bracket, and the claim on screen is "$4 ≈ a grande latte", not a precise menu price. |

**One end date for all three: the 12/31/2025 close.** The search's 2026 Netflix row was a stale January snapshot, and Apple's 2026 close had no date. Rather than mix dates, every race ends on a historically exact year-end. The pinned comments say so.

---

## (b) 06a: Scoreboard, "the first iPhone vs Apple stock"

**Look:** Scoreboard: black bars, a dark stage with a grid, neon green `#2BFF88` for the own line, white for the spend line, Anton type. Race mode: tip counters, a year counter, and the footer as the working line.
**Platform title (YouTube):** "What If You Invested $499 in Apple Instead of the First iPhone?" The title asks, and the screen says POV (ChartOrbit's split, R11).
**On-screen hook (header):** `POV: YOU INVESTED IN APPLE / INSTEAD OF PAYING **$499** / FOR THE FIRST IPHONE` (13 words, 3 lines)
**Footer (assumptions, at t = 0):** `Bought at the 6/29/2007 close · dividends reinvested · valued 12/31/2025`

**Modelled on:**
- H46 "POV: You invested in NVIDIA instead of paying $599 for a GeForce 256": 650.5K (62.5x). This is the exact grammar: an iconic first-generation product and its launch price.
- H43 "POV: You invested in GoPro instead of paying $400 for a GoPro": 5.1M (22.6x).
- H44 "POV: You invested in Crocs instead of paying $50 for a pair of Crocs": 1.9M (117.9x).
- Title: H16 "What If You Invested $5,000 in NETFLIX and DISNEY?", 15,876,376 (100.45x).

**Hook rules it satisfies:**
- **R1:** "$499" is in the header, and both tip counters sit at $499 on frame 1.
- **R2:** one input, no result.
- **R3:** a price people paid or remember. The pinned comment asks "what was your first iPhone?" so viewers swap in their own.
- **R4:** small and familiar.
- **R5:** see the wrong belief below.
- **R6:** you + $499 + 2007.
- **R7:** phone vs stock.
- **R8:** 13 words.
- **R9:** the year axis to 2025 is the countable loop.
- **R10:** first payoff at 3.4 s ($807 at the end of 2007); biggest number last.
- **R11:** the title asks, the screen says POV, the caption gives the verdict.
- **R12:** "≈ 74×" is a single repeatable number.

**Wrong belief it exploits (R5):** "By launch day it was too late. Everyone knew the iPhone, so it was priced in." The buy is at the close on launch day itself, the most hyped day there was, and it still comes to ≈ 74×.

### Beat sheet (chart clock: x 2007 → 2025.99 over t 2.4 → 21.4 s, ≈ 1.0 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Both tips at **$499**. Empty axis 2007-2025. Year counter "2007". Footer. | "First iPhone, 2007: $499." |
| 1.8 | (same) | "You buy Apple stock instead." |
| 2.4 | The race starts. | |
| 2.89 | Purchase tick "iPhone 4GB · $499" lands on both lines (pop). The white spend line runs flat at $499. | |
| 3.39 | End of 2007: green tip **$807**, the first payoff. | |
| 3.8 | The green line falls through the white line (t 4.06) to **$347** (thud, t 4.39), then is back above $499 by t 4.69. | "2008 drops it below $499." |
| 6.0 | 2010-2012: $1,315 → $2,190. | "You never add a cent. You just hold." |
| 9.6 | 2013-2016: $2,365 → $3,629. The axis rescales. | "The phone gets old. The shares keep compounding." |
| 14.6 | The green tip passes **$10,000** (ding, t 15.44). | "2020: it passes $10,000." |
| 17.2 | End of 2021 $23,648 → end of 2022 $17,404 (t 17.40 → 18.40). | "2022 knocks off a quarter." |
| 19.6 | 2023-2025: $25,933, $33,897, then the final **≈ $37,000** at t 21.4 (cash). Spend tip "$499 spent". Footer step: `$499 × 74.1 ≈ $37,000`. | "End of 2025: about $37,000." |
| 21.9 | Verdict: **≈ 74×** your $499. / One doubling every **≈ 3 years**. | "About 74 times. One doubling every 3 years." |
| 25.1-26.5 | Hold on the finished race, then a hard cut to frame 1 (loop). | |

### Guide VO script (52 words, read at about 2.6 words per second)

> First iPhone, 2007: $499. You buy Apple stock instead. 2008 drops it below $499. You never add a cent. You just hold. The phone gets old. The shares keep compounding. 2020: it passes $10,000. 2022 knocks off a quarter. End of 2025: about $37,000. About 74 times. One doubling every 3 years.

### The maths (every on-screen number)

| On screen | Formula | Inputs |
|---|---|---|
| $499 (header, purchase tick, spend line, "$499 spent") | input | Apple's 4GB price at launch |
| 2007.49 (purchase x) | 2007 + (day 180 − 1) ÷ 365 | June 29, 2007 |
| Launch-day buy price 3.66 (adjusted) | StatMuse 6/29/2007 close | split- and dividend-adjusted |
| Shares ≈ 136.34 (adjusted) | $499 ÷ 3.66 | |
| Year-end values, 2007-2011 | 136.34 × Macrotrends close × (5.92 ÷ 5.97) | The search returned the 2007-2011 rows on an older adjustment basis. StatMuse's 2007 close ($5.92) bridges it. The 2012 % change confirms the bridge: 32.64% computed vs 32.57% listed. |
| Year-end values, 2012-2025 | 136.34 × Macrotrends close | |
| $807 / $347 / $860 / $1,315 / $1,651 | year ends 2007-2011 | closes 5.92, 2.5485, 6.3067, 9.6485, 12.1077 (bridged) |
| $2,190 … $36,964 | year ends 2012-2025 | 16.06, 17.35, 24.40, 23.67, 26.62, 39.52, 37.39, 70.66, 128.82, 173.45, 127.65, 190.21, 248.62, 271.12 |
| Dips below $499 in 2008 | linear crossing between the 2007 ($807.13) and 2008 ($347.46) points at x 2008.66 | |
| Passes $10,000 in 2020 | crossing between $9,634 (2019) and $17,563 (2020) at x 2020.04 | |
| "a quarter" (2022) | 1 − 127.65 ÷ 173.45 = 26.4% | |
| ≈ $37,000 | $36,964.17 to 3 significant figures | Cross-check from StatMuse alone: $499 × 271.36 ÷ 3.66 = $36,997 (0.09% apart) |
| ≈ 74× | $36,964.17 ÷ $499 = 74.08 | |
| $499 × 74.1 ≈ $37,000 (footer step) | 499 × 74.1 = 36,976 | |
| ≈ 3 years per doubling | log₂ 74.08 = 6.21 doublings; 18.51 years (6/29/2007 → 12/31/2025) ÷ 6.21 = 2.98 | |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| $499, 4GB, on sale June 29, 2007 (6 p.m.) | Apple Newsroom, "iPhone Premieres This Friday Night at Apple Retail Stores", 2007-06-28, https://www.apple.com/newsroom/2007/06/28iPhone-Premieres-This-Friday-Night-at-Apple-Retail-Stores/ | Apple Newsroom, "Apple Reinvents the Phone with iPhone", 2007-01-09 (same prices announced), https://www.apple.com/newsroom/2007/01/09Apple-Reinvents-the-Phone-with-iPhone/. Context: "Apple Sets iPhone Price at $399 for this Holiday Season", 2007-09-05. This is a primary source for its own price; an extended web search (2026-10-07) returned the same $499 / June 29 facts. |
| AAPL adjusted closes: 6/29/2007 $3.66, 12/31/2007 $5.92, 12/31/2025 $271.36 | StatMuse Money, accessed 2026-10-07, https://www.statmuse.com/money/ask?q=apple+stock+price+on+june+29,+2007 · https://www.statmuse.com/money/ask/apple-stock-price-in-2007 · https://www.statmuse.com/money/ask/apple-stock-price-on-2025 | Macrotrends: 2007 close 5.97 and 2025 close 271.12 on its own basis. The two final values agree within 0.09%. |
| AAPL year closes and % changes, 2007-2025 (adjusted for splits and dividends) | Macrotrends, "Apple - 45 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/AAPL/apple/stock-price-history | Internal check: every % change reproduces from the closes within rounding (the 2012 seam is noted above). StatMuse for the end points. |

### Assumptions (footer)

- The $499 is invested at the 6/29/2007 close. Note that the phone went on sale at 6 p.m., after the market closed.
- Dividends are reinvested (adjusted closes). Apple began paying dividends in 2012.
- Splits are adjusted.
- The value is taken at the 12/31/2025 close.
- No fees or taxes.

**Caption / description (IG, TikTok; the YouTube description opens the same way):**
POV: You invested in Apple instead of paying $499 for the first iPhone. ≈ $37,000 by the end of 2025, about 74× (dividends reinvested). Maths in the pinned comment. #apple #iphone #investing #stocks #compoundinterest

**Pinned comment:**
The maths:
- $499 ÷ $3.66 (Apple's 6/29/2007 close, adjusted for splits and dividends) ≈ 136.3 shares.
- 136.3 × $271.12 (12/31/2025 close) ≈ $36,964. StatMuse's numbers alone give $36,997.
- That's ≈ 74×, about 6.2 doublings in 18.5 years: one every ≈ 3 years.

What was your first iPhone, and what did you pay?

**Per-platform notes:**
- **YouTube Shorts:** use the question title (R11). Put no CTA on screen, end on the final value, and let it loop. The race restarts on the 2008 dip, a good replay hook.
- **Instagram Reels:** the cover is frame 1 (header + $499 tips). Keep the verdict as the first caption line, because IG truncates the rest.
- **TikTok:** caption it the way @investment_timeline does: the POV line + the verdict + `#apple #iphone #usa #investment #stocks`. No licensed music: SFX + VO only.
- **All:** "Apple" and "iPhone" appear as text only. No Apple logo and no product photo; the kit's generic `phone` icon stands in.

---

## (b) 06b: Live Sheet, "your Netflix bill into Netflix stock"

**Look:** Live Sheet: a white sheet on black, the yellow `#FFD60A` banner, and the formula bar showing the working (`lookOpts.formulaBar`). The race is drawn in the sheet area: the own line green `#039855`, the spend line red `#D92D20`, and the price-hike ticks as cells on the spend line.
**Platform title (YouTube):** "What If Your Netflix Bill Bought Netflix Stock Since 2012?"
**On-screen hook (header):** `POV: Since 2012 you put / your **$7.99** Netflix bill / into Netflix stock` (12 words, 3 lines)
**Footer:** `Standard plan list price · each year at its avg price · split-adjusted`

**Modelled on:**
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). The recurring-habit variant, with a same-brand pairing.
- H18 ChartOrbit frame 1, "POV: Since 1996 you / invested $100/month in / and never sold": 1,391,731 (5.91x). This is the "Since [year] you … $/month" grammar, with a money-in line beside the value.
- H16 "POV: In 2002 You invested $5000 in" NETFLIX VS Disney: 15,876,376 (100.45x). Netflix as a household name in a POV race.

**Hook rules it satisfies:**
- **R1:** $7.99 is in the header; tips at $7.99 and the formula bar `= $7.99 × 12 = $95.88` are on frame 1.
- **R2:** one dollar input.
- **R3:** a bill most viewers pay. The pinned comment asks about their plan.
- **R4:** $7.99.
- **R5:** see the wrong belief below.
- **R6:** you + $7.99 + since 2012.
- **R7:** bill vs stock.
- **R8:** 12 words.
- **R9:** 8 price ticks and the year axis.
- **R10:** first payoff at 3.5 s ($107 vs $95.88 at the end of 2012).
- **R11:** the title asks, the caption gives the verdict.
- **R12:** "≈ 8.7×".

**Wrong belief it exploits (R5):** "A streaming bill is too small to matter, and every price hike is pure loss." On the sheet each hike simply buys more, and $2,037 of bills becomes ≈ $17,700.

### Beat sheet (chart clock: x 2012 → 2025.99 over t 2.0 → 23.0 s, ≈ 1.5 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner header. Tips **$7.99 / $7.99**. Tick "Jan 2012 · $7.99". Formula bar `= $7.99 × 12 = $95.88`. Footer. | "Netflix, 2012: $7.99 a month." |
| 2.0 | The race starts. | |
| 2.1 | Formula bar `≈ $95.88 ÷ $1.19 ≈ 80.6 shares`. | "Every bill, you buy Netflix stock instead." |
| 3.49 | End of 2012: spend $95.88, own **$107** (first payoff). | |
| 4.95 | End of 2013 (t 4.99): own **$567** vs $191.76. | "2013: the stock quadruples." |
| 5.50 | Tick "May 2014 · $8.99" (tick sfx). | |
| 6.8 | Formula bar `= 9 × $8.99 + 3 × $9.99 = $110.88`. Tick "Oct 2015 · $9.99" at t 7.63. | "Price hike? Your investment goes up too." |
| 9.8 | Formula bar `≈ each year's bills ÷ that year's avg price`. Ticks "Oct 2017 · $10.99" (t 10.63) and "Jan 2019 · $12.99" (t 12.51). | "Each year's bills buy at that year's average price." |
| 13.8 | Tick "Oct 2020 · $13.99" (t 15.13). End of 2020: own **$9,163** (t 15.49). | "2020: the bill's $13.99. Your stake: over $9,000." |
| 17.2 | Tick "Jan 2022 · $15.49" (t 17.01). Own $10,390 → **$5,279** (thud, t 18.49). | "2022: it halves." |
| 18.8 | End of 2023 $8,948 (t 20.0), end of 2024 $16,627 (t 21.5). Tick "Jan 2025 · $17.99" (t 21.51). | "You keep paying. It comes back." |
| 21.4 | Formula bar `≈ 188.5 shares × $93.76 ≈ $17,700`. Final at t 23.0: own **≈ $17,700**, spend **$2,037.32 spent** (cash). | "About $2,037 in bills. About $17,700 in stock." |
| 24.6 | Verdict: **≈ 8.7×** what Netflix / charged you. Formula bar `≈ $17,675 ÷ $2,037.32 ≈ 8.7×`. | "About 8.7 times what Netflix charged you. Almost half from 2012's $95.88." |
| 29.3-30.5 | Hold, then clear back to frame 1. | |

### Guide VO script (69 words)

> Netflix, 2012: $7.99 a month. Every bill, you buy Netflix stock instead. 2013: the stock quadruples. Price hike? Your investment goes up too. Each year's bills buy at that year's average price. 2020: the bill's $13.99. Your stake: over $9,000. 2022: it halves. You keep paying. It comes back. About $2,037 in bills. About $17,700 in stock. About 8.7 times what Netflix charged you. Almost half from 2012's $95.88.

### The maths

Plan price by month: a new price counts from the month it was announced. Each year's bills buy shares at that year's average split-adjusted close. Buying a fixed dollar amount at the *arithmetic* average price slightly understates the shares that monthly buying gets, so the method is conservative.

| Year | Bills | Paid | NFLX avg | Shares bought | Shares held | NFLX close | Paid to date | Worth at year end |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| 2012 | 12 × $7.99 | $95.88 | $1.19 | 80.57 | 80.57 | $1.33 | $95.88 | $107 |
| 2013 | 12 × $7.99 | $95.88 | $3.53 | 27.16 | 107.73 | $5.26 | $191.76 | $567 |
| 2014 | 4 × $7.99 + 8 × $8.99 | $103.88 | $5.75 | 18.07 | 125.80 | $4.88 | $295.64 | $614 |
| 2015 | 9 × $8.99 + 3 × $9.99 | $110.88 | $9.19 | 12.07 | 137.86 | $11.44 | $406.52 | $1,577 |
| 2016 | 12 × $9.99 | $119.88 | $10.20 | 11.75 | 149.62 | $12.38 | $526.40 | $1,852 |
| 2017 | 9 × $9.99 + 3 × $10.99 | $122.88 | $16.54 | 7.43 | 157.05 | $19.20 | $649.28 | $3,015 |
| 2018 | 12 × $10.99 | $131.88 | $31.93 | 4.13 | 161.18 | $26.77 | $781.16 | $4,315 |
| 2019 | 12 × $12.99 | $155.88 | $32.89 | 4.74 | 165.92 | $32.36 | $937.04 | $5,369 |
| 2020 | 9 × $12.99 + 3 × $13.99 | $158.88 | $44.68 | 3.56 | 169.47 | $54.07 | $1,095.92 | $9,163 |
| 2021 | 12 × $13.99 | $167.88 | $55.82 | 3.01 | 172.48 | $60.24 | $1,263.80 | $10,390 |
| 2022 | 12 × $15.49 | $185.88 | $28.46 | 6.53 | 179.01 | $29.49 | $1,449.68 | $5,279 |
| 2023 | 12 × $15.49 | $185.88 | $39.02 | 4.76 | 183.77 | $48.69 | $1,635.56 | $8,948 |
| 2024 | 12 × $15.49 | $185.88 | $67.15 | 2.77 | 186.54 | $89.13 | $1,821.44 | $16,627 |
| 2025 | 12 × $17.99 | $215.88 | $109.71 | 1.97 | 188.51 | $93.76 | **$2,037.32** | **$17,674.75** |

| On screen / spoken | Formula |
|---|---|
| $2,037.32 spent / "about $2,037" | sum of the 168 monthly list prices |
| ≈ $17,700 | 188.511 shares × $93.76 = $17,674.75, to 3 significant figures |
| `≈ $95.88 ÷ $1.19 ≈ 80.6 shares` | 2012 bills ÷ 2012 average |
| `= 9 × $8.99 + 3 × $9.99 = $110.88` | 2015's bills (the Oct 2015 hike) |
| `≈ 188.5 shares × $93.76 ≈ $17,700` | 188.5 × 93.76 = 17,673.8 |
| `≈ $17,675 ÷ $2,037.32 ≈ 8.7×` / "about 8.7 times" | 17,674.75 ÷ 2,037.32 = 8.68 |
| "quadruples" (2013) | NFLX close 5.26 ÷ 1.33 = 3.96 |
| "over $9,000" (2020) | $9,163 |
| "halves" (2022) | stake $10,390 → $5,279, −49.2% (the stock fell 51.05%) |
| "almost half from 2012's $95.88" | 80.57 shares × $93.76 = $7,554, which is 42.7% of $17,675 |
| Tick x positions | year + (month − 1) ÷ 12: 2014.33, 2015.75, 2017.75, 2019.0, 2020.75, 2022.0, 2025.0 |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| Standard plan price history: $7.99 (from Jul 2011), $8.99 May 2014, $9.99 Oct 2015, $10.99 Oct 2017, $12.99 Jan 2019, $13.99 Oct 2020, $15.49 Jan 2022, $17.99 Jan 2025 | Android Authority, "A 94% increase: A timeline of Netflix price hikes", accessed 2026-10-07, https://www.androidauthority.com/timeline-netflix-price-hikes-3463376/ | Variety, "Netflix Hikes Price of U.S. Streaming Service: Standard Plan Jumps to $13 per Month", 2019-01-15, https://variety.com/2019/digital/news/netflix-us-streaming-price-increases-2019-1203108254 ($10.99 → $12.99) · CNBC, "Netflix to hike prices on standard and ad-supported streaming plans", 2025-01-21, https://www.cnbc.com/2025/01/21/netflix-raises-prices.html ($15.49 → $17.99) · Android Police, https://www.androidpolice.com/netflix-prices-increase-over-last-10-years/ · flixed.io, https://flixed.io/netflix-price-hikes · MovieWeb, https://movieweb.com/netflix-subscription-changes-guide/ |
| After our window: Standard $19.99 from March 2026 (used in the pinned comment only) | CNBC, "Netflix raises prices across all streaming plans", 2026-03-26, https://www.cnbc.com/2026/03/26/netflix-raises-prices-across-all-streaming-plans.html | subkept.com and keepingupwithinflation.com, accessed 2026-10-07 |
| NFLX annual average, year close and % change, 2011-2025 (split-adjusted; Netflix pays no dividend) | Macrotrends, "Netflix - 24 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/NFLX/netflix/stock-price-history | StatMuse Money, NFLX 12/31/2025 close $93.76 (equal to Macrotrends), https://www.statmuse.com/money/ask/netflix-stock-price-december-2025. Internal check: the % changes reproduce from the closes (one known rounding quirk, below). |

**Known quirk:** Macrotrends' 2013 change (+297.64%) implies a 2012 close of about $1.323, but the search returned $1.33. Only the 2012 year-end chart point uses that figure (it moves by about $0.55); no display string or final number does. The check script records this as a named note rather than widening every tolerance.

**Assumptions (footer):**
- The US Standard plan list price applies each month, with each new price counted from the month it was announced to new members.
- Each year's bills buy at that year's average split-adjusted price.
- Netflix pays no dividends.
- The value is taken at the 12/31/2025 close.
- No fees or taxes.

**Caption:** POV: Since 2012 your Netflix bill bought Netflix stock instead. About $2,037 of bills ≈ $17,700 of stock by the end of 2025, about 8.7× what Netflix charged. #netflix #investing #stocks #subscriptions #compoundinterest

**Pinned comment:**
The working:
- Each year's 12 bills at the Standard plan's list price buy shares at that year's average price (split-adjusted).
- 2012: $95.88 ÷ $1.19 ≈ 80.6 shares. Those alone are worth ≈ $7,554 at the end of 2025.
- Total: 188.5 shares × $93.76 ≈ $17,675, against $2,037.32 paid.
- Standard went to $19.99 in March 2026.

Which plan are you on?

**Per-platform notes:**
- **YouTube:** the question title, with no CTA card.
- **Instagram Reels:** the sheet with the formula bar makes a save-worthy final frame, so hold it for 1+ s before the loop. Captions are Inter ExtraBold uppercase with the keyword in yellow (look spec).
- **TikTok:** caption with the POV line + verdict + `#netflix #usa #investment #stocks`.
- **All:** "Netflix" in text only, no N logo. The spend icon is the kit's generic `ticket`.

---

## (b) 06c: Becker Rig, "a $4 latte a day vs Starbucks stock"

**Look:** Becker Rig, from `research/v2/watch/alan-becker.md` sections 3, 4 and 6:
- One rigged stick figure in our own hero colour (not Becker orange) on a white void with a floor gradient, the maths in neutral ink.
- The race lines are the stage the figure stands on.
- Every operation is a verb the figure performs: it **drinks** a latte and tosses the cup onto a growing pile (the spend line), and **drops** the same $4 coin into a jar labelled "SBUX" that rides the green line.
- Impacts use the kit's flash, shake and SFX.
- Applied here are transfer devices "numbers are objects", "results are transformations" and "one number per short that the viewer watches move". `lookOpts` carries the prop choice and the gag.

**Platform title (YouTube):** "Does Skipping a $4 Latte Make You Rich? (Starbucks Stock)"
**On-screen hook (header):** `POV: Since 2014 you invested / in Starbucks instead of paying / **$4/day** for lattes` (13 words, 3 lines)
**Footer:** `$4 ≈ a grande latte · each year at its avg price · dividends reinvested`

**Modelled on:**
- H45 "POV: You invested in Monster instead of paying $3/day for a Monster Energy": 1.5M (140.6x). Same grammar: a $X/day habit and a same-brand pairing.
- H18 "Does investing 100$ monthly in BMW make you rich?": 1,391,731 (5.91x). This yes/no grammar is the title, and the verdict answers it.
- Contrast H47 "POV: You invested in NVIDIA instead of paying $3/day for coffee": 379.9K (29.0x), the smallest post. Its coffee isn't the company's own product; here the lattes and the stock are the same brand.

**Hook rules it satisfies:**
- **R1:** "$4/day" is in the header, and both tips are at $4 on frame 1.
- **R2:** one input.
- **R3:** a daily habit price. The pinned comment asks what they pay now.
- **R4:** a round $4.
- **R5:** see the wrong belief below.
- **R6:** you + $4/day + since 2014.
- **R7:** lattes vs stock.
- **R8:** 13 words.
- **R9:** the year axis and the cup pile.
- **R10:** first payoff at 3.9 s ($1,586 vs $1,460).
- **R11:** the title asks yes/no, the verdict answers.
- **R12:** "≈ 1.4×. Not rich. Not $0."

**Wrong belief it exploits (R5):** "Skip the latte and you'll be rich" (the "latte factor"). Invested in the latte company's own stock, 12 years of lattes come to ≈ 1.4×, with almost no growth after 2021. It is an honest "meh", the same move as GoPro's decline, the biggest post in the benchmark set. The flip side is in the verdict: the cups are worth $0.

### Beat sheet (chart clock: x 2014 → 2025.99 over t 2.4 → 20.4 s, ≈ 1.5 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. The figure holds a cup and a $4 coin. Tips **$4 / $4**. Empty axis 2014-2025. Footer. | "$4 lattes, daily, since 2014." |
| 2.05 | (same) | "You buy Starbucks stock instead." |
| 2.4 | Race starts. Tick "Day 1 · $4" (pop): the figure drinks, tosses the cup, and drops a coin in the SBUX jar. | |
| 3.89 | End of 2014: spend **$1,460**, own **$1,586** (first payoff). | |
| 4.05 | The figure loops the drink/drop action and the cup pile grows. | "That's $1,460 a year into the stock." |
| 7.2 | 2016-2019: own $5,199 → $14,988 against spend $4,384 → $8,764. The jar rises faster than the pile. | "The stock climbs faster than the cups pile up." |
| 12.2 | End of 2021 (t 14.39, ding): own **$24,343**, spend $11,688 (2.08×). | "By 2021, you've doubled your money." |
| 14.8 | 2022 dip to $22,808 (t 15.90). The jar stops rising while the cup pile keeps growing. | "Then it stalls. You keep buying." |
| 18.1 | Final at t 20.4 (cash): spend **$17,532 spent**. | "End of 2025: $17,532 of lattes." |
| 20.6 | Own **≈ $24,900**. | "Or about $24,900 in stock." |
| 22.8 | Verdict: **≈ 1.4×** your latte money. / Not rich. Not **$0**. The figure shrugs at the jar. | "About 1.4 times your latte money. Not rich. Not zero." |
| 26.7-28.0 | Hold, then loop. | |

### Guide VO script (59 words)

> $4 lattes, daily, since 2014. You buy Starbucks stock instead. That's $1,460 a year into the stock. The stock climbs faster than the cups pile up. By 2021, you've doubled your money. Then it stalls. You keep buying. End of 2025: $17,532 of lattes. Or about $24,900 in stock. About 1.4 times your latte money. Not rich. Not zero.

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
| "doubled" by 2021 | $24,343 ÷ $11,688 = 2.08 |
| "stalls" | 2022-2025: $5,844 more in, while the stake rose only $585 ($24,343 → $24,928). The 229 shares held at the end of 2021 fell from $106.24 to $84.21. |
| Not $0 | the lattes are drunk: $0 left |

### Sources

| Input | Source 1 | Source 2 |
|---|---|---|
| Grande caffè latte $3.65 (2014) → $4.45 (2024) | Visual Capitalist, "Charted: Starbucks Price Inflation (2014-2024)" (2024; exact date not returned), https://www.visualcapitalist.com/charted-starbucks-price-inflation-2014-2024/. Its data is FinanceBuzz's analysis of 2014, 2019 and 2024 menu prices from archived menus via the Wayback Machine. | Voronoi (Visual Capitalist's app), "How Starbucks Menu Prices Have Changed Since 2014", https://www.voronoiapp.com/economy/How-Starbucks-Menu-Prices-Have-Changed-Since-2014-1381. **This is the same dataset, so it is not independent.** That is why the stake is a round $4 described as "≈ a grande latte", not a precise price. Context: WTKR/CNN, "Get ready to pay more for that latte: Starbucks prices are going up", 2014-06-20, https://www.wtkr.com/2014/06/20/get-ready-to-pay-more-for-that-latte-starbucks-prices-are-going-up (it says the grande latte price did not change in the June 2014 adjustment). |
| SBUX annual average, year close and % change, 2014-2025 (adjusted for splits and dividends) | Macrotrends, "Starbucks - 34 Year Stock Price History", accessed 2026-10-07, https://www.macrotrends.net/stocks/charts/SBUX/starbucks/stock-price-history (two searches: the 2014-2021 rows and the 2022-2026 rows) | Internal check: every % change 2015-2025 reproduces from the closes, including across the 2021 → 2022 seam between the two searches. Cross-check: a second search gave $82.71 for the 2025 year-end, probably on a later dividend basis. It would make the final ≈ $24,484 (−1.8%), still "≈ 1.4×". |

**Assumptions (footer):**
- $4 every day, 1/1/2014-12/31/2025, held flat. Real latte prices started below $4 and ended above it.
- Each year's money buys at that year's average adjusted price.
- Dividends are reinvested.
- No fees or taxes.

**Caption:** Does skipping a $4 latte make you rich? In Starbucks stock since 2014: $17,532 of lattes ≈ $24,900 of stock, about 1.4×. Not rich. Not zero. #starbucks #latte #investing #stocks #lattefactor

**Pinned comment:**
The maths:
- $4 × 365 = $1,460 a year, bought at each year's average SBUX price (dividends reinvested).
- By 2021: $11,688 in → $24,343.
- 2022-2025: another $5,844 in, but the stake grew just $585.
- End: 296 shares × $84.21 ≈ $24,928 vs $17,532 of lattes.

A grande latte was $3.65 in 2014 and $4.45 in 2024 (FinanceBuzz). What do you pay now?

**Per-platform notes:**
- **YouTube:** the yes/no title is the hook (H18's grammar). The verdict answers it on screen at 22.8 s.
- **Instagram Reels:** the figure gag reads with the sound off (the Becker "mute test"). Keep the cup pile and the jar inside x 60-940 below y 820.
- **TikTok:** caption with `#starbucks #latte #usa #investment #stocks`. The "latte factor" argument should draw comments both ways.
- **All:** "Starbucks" and "SBUX" in text only. The cup is the kit's generic `cup`, with no siren logo and no green brand colour on the cup.

---

## Research log

**Web searches: 13 of 14.**

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

Direct page fetches and price-data downloads (stockanalysis.com, stooq, Yahoo, Wikipedia, visualcapitalist.com) are blocked by this sandbox's egress policy. Every figure therefore comes from search results.

**Limits and caveats:**
- **Nothing in the format evidence was watched.** None of the @investment_timeline videos could be watched, so the payoff mechanics we add (spend line, envelope line, footer) come from ChartOrbit and the look directions.
- **Annual averages approximate monthly or daily buying.** The arithmetic mean slightly understates the shares bought, so 06b and 06c are conservative.
- **Values end at 12/31/2025, not "today".** The pinned comments say so.
- **Specs only.** No look kit renders pov-race yet: Live Sheet has a placeholder, and Scoreboard and Becker Rig have no `index.html` yet. 06b passes `node src/cli.mjs check` on the placeholder. `lookOpts` (`footerSteps`, `formulaBar`, `prop`/`ownProp`/`jarLabel`/`gag`) are proposals; per FORMATS.md, the kits must render sensibly without them.
- **No financial advice language.** These are historical "what if" maths with stated assumptions.
