# Format 4: same-stake line-chart race (chart-race, hook pattern P4)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 4 of 10, round 2 (revised after the verifier and hook-judge reviews, then two hook passes; 04b's hook was rewritten in hook pass 2. See the Review log at the end)
**Deliverables:**
- Specs (all three pass the studio linter, `node src/cli.mjs check`: 0 errors, 0 warnings; contact sheets rendered in all three kits):
  - [`studio/specs/04a-scoreboard-sp500-vs-gold.json`](../../studio/specs/04a-scoreboard-sp500-vs-gold.json)
  - [`studio/specs/04b-becker-rig-savings-vs-sp500.json`](../../studio/specs/04b-becker-rig-savings-vs-sp500.json)
  - [`studio/specs/04c-live-sheet-usa-vs-europe.json`](../../studio/specs/04c-live-sheet-usa-vs-europe.json)
- Check: [`teasers/v2/checks/04-chart-race.py`](checks/04-chart-race.py). It recomputes every series from the sourced annual returns and passes **637 checks with 0 failures** (591 before the 04b fixer pass, 566 before the 04b assembly pass, 451 before the QA fixer pass, 445 before the assembly pass, 407 before hook pass 2). New in this revision:
  - a spoken-number sync check: every figure the VO quotes mid-race must be on screen at the moment it is said (on a tip counter, a flag, a beat label, the ledger row or 04c's value row);
  - a 2,916-table sweep over the uncertain savings-rate inputs (04b);
  - a stale-text check on this write-up (since hook pass 2, also a 04b-section check that no text from the old hook is left).
- Mutation test: the check caught **12 of 12** deliberately broken spec copies (listed under Caveats), and **8 of 8** more for the new 04b hook in hook pass 2.

**Evidence base:**
- The benchmark only: [`research/v2/02-hook-bank.md`](../../research/v2/02-hook-bank.md) (P4, R1-R12, section 2.10 "open in the red"), [`research/v2/04-formats.md`](../../research/v2/04-formats.md) (rank 4), and the watch studies [`chartorbit.md`](../../research/v2/watch/chartorbit.md) and [`jake-jacobdoesmoney.md`](../../research/v2/watch/jake-jacobdoesmoney.md).
- Looks: [`03-look-directions.md`](../../research/v2/03-look-directions.md) (Scoreboard, Live Sheet) and [`watch/alan-becker.md`](../../research/v2/watch/alan-becker.md) sections 3, 4 and 6 (Becker rig).

---

## (a) The format in 5 lines

1. **Mechanic.** The same round stake goes into 2 named rivals on the same date. One continuous line chart races year by year, with a live counter at each line tip, a big year counter, crash flags and 0 cuts, and it ends dead on the verified final values.
2. **Hook.** The title asks ("What If You Invested $5,000 in A and B?"). The frame-1 header says you already did it ("POV: In [year] you invested $[stake] in A VS B"); 04b's header (hook pass 2) is a handicap duel in the same A VS B grammar ("Your $1,000: 16 years of savings VS 1 year of the S&P 500"). The stake is the only accent colour. In ChartOrbit's winners the chart is already moving at 0.0 s, below the stake. 04a and 04b copy that: their race clocks start at −0.4 s, so 04a's frame 1 shows both tips under the stake and 04b's shows the S&P already ahead ($1,041 vs $1,001). 04c opens on its claim instead: the 2025 ledger row, large, with Europe's +35.41% lit, over the parked race; at 4.8 s it rewinds into the race.
3. **Pace.** About 2-2.7 s per year in the benchmark (61 s). Ours run 1.2-1.7 s per year, 36.5-45.5 s, to stay inside this round's 25-50 s lane. The biggest number lands last, then the verdict.
4. **Evidence.**

   | Account | Video | Views | Multiple | URL |
   |---|---|---:|---|---|
   | ChartOrbit | "💴What If You Invested $5,000 in NETFLIX and DISNEY?" | 15,876,376 | 100.45x | https://www.youtube.com/shorts/KmtLGAPIutg |
   | ChartOrbit | "💴What If You Invested $5,000 in USA and EUROPE?" | 2,808,307 | 345.09x | https://www.youtube.com/shorts/VwfZNjxu6fU |
   | ChartOrbit | "Does investing 100$ monthly in BMW make you rich?" | 1,391,731 | 5.91x | https://www.youtube.com/shorts/2cF446rExhY |
   | ChartOrbit | "What If You Invested $5,000 in USA and CHINA?" | 1,068,784 | 5.18x | https://www.youtube.com/shorts/q0qVAKymIh4 |
   | Jake | "2 people invest $10,000 / 10 years ago" (QQQ vs TQQQ) | 322,339 | 6.6x med | https://www.instagram.com/reel/DdUZ5K1gGlc/ |
   | Jake | same template, QQQ vs SPY | 276,471 | 5.66x med | https://www.instagram.com/reel/DdFHnhtCeLw/ |

   - The $5,000-in-A-and-B series has a median of 154,642 (18 of ChartOrbit's top 50).
   - Losers inside the same series: S&P500 and NASDAQ100 48,161; CATERPILLAR and JOHN DEERE 36,846; USA and CANADA 30,478. Pairs on gold did moderately: BITCOIN and GOLD 222,753 (2.09x), GOLD and SILVER 93,450.
5. **What wins inside the pattern:** household names or countries, a lopsided ending, and "you + $amount + start year" kept on screen. ChartOrbit's slide to 31 s, three contenders and no stake coincided with a collapse to a ~1,557 median.

## Decisions that apply to all three

- **The race ends at the Dec 31, 2025 close (the last full calendar year), not at today.** Two-source verification of 2026 year-to-date figures was not possible inside the search budget:
  - One source gives a gold close of $4,175.81 on Sep 30, 2026 (pricegold.net).
  - No search returned a sourced S&P 500 total return year to date.

  The footers and stakes name the window. All three races start at the Dec 31 close of the year before ("Jan 2000", "Jan 2010", "Jan 2016").
- **Real yearly data points only.** Each series is the stake × (1 + that year's sourced return), compounded. A Dec-31 close sits at x = year + 0.99 (the same convention as 06a/06c), so a year counter that floors x reads the right year. Between two closes, the kits draw a straight line, so a tip counter between closes is an interpolation (this includes 04a's frame 1).
- **Every rounded figure carries "≈", and so does every rounded multiple.**
  - Finals are given to 3 significant figures, the savings balance included. (Round 1 showed it to the nearest dollar; the 04b sweep showed that the dollar digit rests on unsourced midpoint years, so it is no longer shown.)
  - Scoreboard footer: "$10,000 grew ≈ ×7.53 → ≈ $75,300". Live Sheet formula bar: "≈ ×3.98 ≈ 2 doublings"; a year's step whose dollar-rounded inputs miss the shown close by $1 starts with "≈" instead of "=" ("≈ $16,145 × (1 − 15.06%)"). Pinned comments: "≈ ×15.0", "≈ ×3.98".
  - VO text uses "≈" too, because captions show it. The owner reads "≈" as "about".
- **A figure the VO quotes mid-race is on screen when it is said.** The race moves 1.2-1.7 s per year, while a spoken figure takes 1-3 s to reach. So each mid-race figure is either pinned (a flag, a beat label, or the ledger or value row that carries it), or it is a bound that holds on the live tip (and 04c's value row) for the whole line ("still under $17,000", "under $10 so far"). The check computes when each figure is said (the line's start plus its spoken words ÷ 2.6) and tests what is showing then.
- **The verdict lands after the last VO line ends.** The Becker rig and Live Sheet chrome hide captions while the verdict shows.
- **The first VO line plants the wrong answer (R5); it never reads the header aloud.** (04b: the first line gives the target, ≈ $151, and the second plants the belief, "Savings gets 16 years to match it.")
- **Captions: line 1 on IG and TikTok is a curiosity line, and the verdict goes after the fold.** TikTok shows line 1 over the video from 0 s, so a verdict there gives the twist away.
- **Rule-of-thumb line (the format's "envelope twist" from 04-formats).** Each teaser converts its ending into doublings, or into "% a year", so the result is a number you can carry.
- **Swap-in for R3.** The multiple is printed in the footer or formula bar, so viewers can multiply their own amount. The pinned comments say so.
- **No logos, no licensed music.**
  - Names are in text; the Live Sheet race can show flags (not brand marks).
  - ChartOrbit's ABBA track is replaced by kit SFX (licensing for us is unknown).
- **Kits.** All three looks now implement chart-race. Each spec carries optional `lookOpts` (documented per teaser below) that the kits read; a kit renders sensibly without them.

---

## (b) The teasers

### 04a · Scoreboard · "POV: In 2000 you put $10,000 in the S&P 500 VS gold"

- **Look:** Scoreboard (black bars, stage `#0E1116`, money green `#2BFF88` for the S&P 500, second-contender yellow `#FFD23F` for gold, Anton header, footer working line).
- **Platform title:** "What If You Invested $10,000 in the S&P 500 and GOLD in 2000?" (A/B: "$10,000 in 2000: Stocks or Gold?")
- **On-screen hook (header, 12 words):** `POV: In 2000 you put **$10,000** in` / `the S&P 500 VS gold` (kept: it is ChartOrbit's 345x grammar).
- **First VO line (0.0 s):** "Stocks should crush gold." (QA fixer pass: "26 years." was cut so the 2002 beat lands with the race)
- **Hook rules it satisfies:**
  - **R1:** "$10,000" in the header and the dashed $10,000 stake line at 0.0 s, with both tip counters already under it ($9,701 / $9,823).
  - **R2:** one input, no result.
  - **R4:** a round, familiar stake.
  - **R5:** the first spoken line names the belief the chart then breaks ("Stocks should crush gold"), without "most people".
  - **R6:** you + $10,000 + 2000.
  - **R7:** both options are named.
  - **R8:** 12 words.
  - **R9:** a fixed 2000-2025 x-axis, so the remaining years are countable.
  - **R10:** frame 1 is already in the red (hook-bank 2.10, ChartOrbit H16/H17); the 2000 close lands at 0.82 s; the first spoken payoff starts at 1.76 s, and its figures are on a flag from 3.28 s ("≈ −38%" is said at 3.68 s, "≈ +21%" at 5.61 s, both while the flag shows).
  - **R11:** the title asks, the screen says "you did it", the caption gives the verdict after the fold.
  - **R12:** a lopsided verdict, "≈ 2×".
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US] VS [EU]" (2,808,307 views, 345.09x), which opens inside the crash with both tips under the stake.
  - ChartOrbit H16, "POV: In 2002 You invested $5000 in NETFLIX VS Disney" (15,876,376, 100.45x); its title grammar is the platform title.
  - @investment_timeline's GoPro post H43 (5.1M, 22.6x), the benchmark's proof that a chart which reverses the expected winner still travels.
- **Wrong belief it exploits:** "Over the long run, stocks always beat gold. Gold is a pet rock." From Jan 2000, gold was ahead of the S&P 500 at **all 26 year-ends** (the check asserts this) and ended at about twice the money.

**Beat sheet** (race: x 2000.0 → 2025.99 over t −0.4 → 31.6 s, 1.23 s per year; frame 1 is x ≈ 2000.32)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. The race is already moving: S&P 500 tip $9,701, gold tip $9,823, both under the dashed $10,000 stake line, their labels stacked by value (gold on top); the top counter shows the leader, "GOLD $9,823". Corner year clock "2000" (34% white). Fixed x-axis 2000-2025. Footer "S&P + dividends · gold · year-ends 2000–2025" | "Stocks should crush gold." (0.0-1.6) |
| 0.82-0.83 | 2000 close lands (S&P $9,090, gold $9,460). "Dot-com crash" flag | — |
| 1.76 | Both lines run down and apart | "By 2002: stocks ≈ −38%. Gold ≈ +21%." (1.76-7.16; the two figures are said at 3.68 s and 5.61 s) |
| 3.28 | 2002 close: S&P $6,239 vs gold $12,089. Flag "S&P ≈ −38% · gold ≈ +21%" (white, with −38% in red and +21% in gold yellow, upright) holds 3 s (`flagHold`), to 6.28 s; its dashed rule fades with it. Thud | (continues) |
| 10.37-10.67 | "2008 crash" flag. 2008 close: S&P $7,187 vs gold $30,567. Thud | "2008: stocks crash again. Gold keeps climbing." (10.4) |
| 15.98-16.83 | "Gold ≈ −28%" flag (holds 3 s, to 18.98 s). Gold falls $58,204 → $41,907 at 16.83 s. Hit | "2013: gold drops ≈ 28% in one year." (16.5, 0.3 s before the 2013 close; "≈ 28%" said at 18.42 s) |
| 16.5-26.3 | The S&P climbs from $16,398 (2013) to $49,395 (2021); gold reaches $63,518 | "Then stocks run for years and close in." (21.2) · "2021: still behind." (26.3) |
| 27.30 | "2022 bear market" flag (clears at 30.3 s, before the 2025 leg) | — |
| 30.37 | Gold stops at its 2024 close (`holdBack`): its tip label holds "$91,094" while the clock runs on. The hero cuts to the S&P 500, the one still racing | — |
| 31.6-32.05 | Race ends. The S&P tip rolls its last digits and lands at 32.05 s on "≈ $75,300"; the hero lands "S&P 500 ≈ $75,300" (bump, pop). Every tip label sits right of its own dot, in the lane past the data (`tipLane`). Roll. Footer step "$10,000 grew ≈ ×7.53 → ≈ $75,300" | "End of 2025: stocks ≈ $75,300." (31.6; said at 33.91 s) |
| 34.4-36.4 | Gold draws its 2025 leg (+64.57%) under the riser: the spike, the climax | (continues) |
| 36.4 | The climax (`finalT[1]`): gold's tip lands "≈ $150,000" and the hero hard-cuts to "GOLD ≈ $150,000" with the 1.13 bump, glow and floor flare. Hit + cash (the kit's cues). Footer step "$10,000 grew ≈ ×15.0 → ≈ $150,000" | "Gold ≈ $150,000." (36.4; said at 36.78 s) |
| 39.3 | The y grid gives way to dashed doubling rungs ×2, ×4, ×8, ×16 (`rungs`): gold ends between ×8 and ×16, the S&P between ×4 and ×8. Footer step "Gold ≈ 3.9 doublings · S&P 500 ≈ 2.9", each name in its line colour | "Gold doubled ≈ 4 times. Stocks, ≈ 3." (caption kept whole as "≈ 4 times") |
| 42.5-45.5 | Verdict slams into the caption band: "Gold ended **≈ 2×** the S&P 500. / That's ≈ one extra doubling." The emphasis and the accent rule are gold yellow (`emColor`). Ding. Hold, then hard cut to frame 1 (loop) | — |

**Guide VO script (as read, 9 lines):**
> Stocks should crush gold.
> By 2002: stocks, about minus thirty-eight percent. Gold, about plus twenty-one percent.
> 2008: stocks crash again. Gold keeps climbing.
> 2013: gold drops about twenty-eight percent in one year.
> Then stocks run for years and close in.
> 2021: still behind.
> End of 2025: stocks, about seventy-five thousand three hundred.
> Gold, about a hundred and fifty thousand.
> Gold doubled about four times. Stocks, about three.

**The maths** (every number on screen; the check recomputes each one)

- **Recurrence:** V(year) = V(year − 1) × (1 + r(year)), with V(1999) = $10,000 for each series.
  - r = the S&P 500 total return (dividends reinvested), or gold's year-end price change.
  - Gold 2025 = $4,319.37 ÷ $2,624.60 − 1 = **64.57%**.

  | Year-end | t (s) | S&P 500 | Gold |
  |---|---:|---:|---:|
  | start (Dec 31, 1999 close) | −0.40 | $10,000.00 | $10,000.00 |
  | frame 1 (x ≈ 2000.32, interpolated) | 0.00 | $9,701 | $9,823 |
  | 2000 | 0.82 | $9,090.00 | $9,460.00 |
  | 2001 | 2.05 | $8,009.20 | $9,687.04 |
  | 2002 | 3.28 | $6,239.17 | $12,089.43 |
  | 2003 | 4.51 | $8,028.56 | $14,446.86 |
  | 2004 | 5.74 | $8,902.07 | $15,226.99 |
  | 2005 | 6.98 | $9,339.16 | $17,891.72 |
  | 2006 | 8.21 | $10,813.81 | $22,096.27 |
  | 2007 | 9.44 | $11,407.49 | $28,946.12 |
  | 2008 | 10.67 | $7,186.72 | $30,567.10 |
  | 2009 | 11.90 | $9,088.32 | $38,086.61 |
  | 2010 | 13.13 | $10,457.02 | $49,360.24 |
  | 2011 | 14.36 | $10,677.67 | $54,345.63 |
  | 2012 | 15.59 | $12,386.10 | $58,204.17 |
  | 2013 | 16.83 | $16,397.95 | $41,907.00 |
  | 2014 | 18.06 | $18,642.83 | $41,152.67 |
  | 2015 | 19.29 | $18,900.10 | $36,872.80 |
  | 2016 | 20.52 | $21,160.55 | $39,970.11 |
  | 2017 | 21.75 | $25,779.90 | $45,246.16 |
  | 2018 | 22.98 | $24,650.74 | $44,522.23 |
  | 2019 | 24.21 | $32,413.26 | $52,669.79 |
  | 2020 | 25.44 | $38,377.30 | $65,889.91 |
  | 2021 | 26.68 | $49,395.43 | $63,517.87 |
  | 2022 | 27.91 | $40,449.91 | $63,263.80 |
  | 2023 | 29.14 | $51,084.20 | $71,614.62 |
  | 2024 | 30.37 | $63,865.46 | $91,093.80 |
  | 2025 | 31.60 | $75,284.61 | $149,915.35 |

- **"26 year-ends" (caption):** Jan 2000 → Dec 2025 = 26 calendar years (exact). (The VO no longer says "26 years".)
- **Frame 1:** x = 2000 + 0.4 ÷ 1.2312 = 2000.32. S&P $10,000 − $910 × 0.328 = $9,701; gold $10,000 − $540 × 0.328 = $9,823.
- **"By 2002: ≈ −38%":** 1 − $6,239.17 ÷ $10,000 = 37.6% down since Jan 2000. **"≈ +21%":** $12,089.43 ÷ $10,000 − 1 = 20.9% up. Both are cumulative, which is why the VO says "By 2002" (the S&P 500's 2002 return alone was −22.10%, gold's +24.8%). The flag carries the same two figures.
- **"≈ 28%":** gold's 2013 change, −28.0% in the table. It is a rounded 1-decimal table value, and other price bases give −27.3% to −28.3%, so the VO and the flag ("Gold ≈ −28%") both carry "≈".
- **Finals:** $75,284.61 → **≈ $75,300**; $149,915.35 → **≈ $150,000** (3 significant figures).
- **Footer steps:**
  - $75,284.61 ÷ $10,000 = 7.5285 → "≈ ×7.53"; $10,000 × 7.53 = $75,300 → "≈ $75,300".
  - $149,915.35 ÷ $10,000 = 14.9915 → "≈ ×15.0"; $10,000 × 15.0 = $150,000 → "≈ $150,000".
  - Doublings: log₂ 7.5285 = 2.91 → "≈ 2.9", spoken "≈ 3"; log₂ 14.9915 = 3.91 → "≈ 3.9", spoken "≈ 4".
- **Verdict "≈ 2×":** 14.9915 ÷ 7.5285 = 1.99. "That's ≈ one extra doubling" = 3.906 − 2.912 = 0.994 (a rounding, so it carries "≈").
- **Gold's held tip:** $91,093.80 (the 2024 close) shows as "$91,094" from 30.37 s until gold's last leg starts at 34.4 s.
- **Rungs:** $20,000, $40,000, $80,000, $160,000 = the stake × 2, 4, 8, 16. Gold ×14.99 sits between ×8 and ×16; the S&P ×7.53 between ×4 and ×8.
- **Claims in words, checked against the data:**
  - Gold is ahead at every year-end 2000-2025.
  - 2008: S&P −37.00%, gold +5.6% ("keeps climbing").
  - The S&P/gold ratio rises from 0.39 (2013) to 0.78 (2021), so stocks "close in" but are "still behind".
- **Caption and pinned numbers:**
  - Per year: 7.5285^(1/26) − 1 = 8.07%, so **≈ 8.1% a year**; gold 14.9915^(1/26) − 1 = 10.97%, so **≈ 11.0% a year**.
  - Start in 2010 instead: S&P $75,284.61 ÷ $9,088.32 = 8.28, **≈ ×8.3**; gold $149,915.35 ÷ $38,086.61 = 3.94, **≈ ×3.9**.
- **Robustness:**
  - With the second gold table's values (a different price basis), gold ends at **≈ $154,000**, ×2.05 the S&P, so the verdict still rounds to "≈ 2×". On that basis gold is up 22.9% by 2002 (the flag uses the primary table's ≈ +21%); still up while stocks are down.
  - The implied 1999 gold close, $2,624.60 ÷ 9.109 = $288.12, matches the ~$290 year-end level.

**Assumptions** (footer: "S&P + dividends · gold · year-ends 2000–2025"):
- Bought at the Dec 31, 1999 close and valued at the Dec 31, 2025 close.
- S&P 500 total return, dividends reinvested.
- Gold at its year-end closing price.
- No fees, tax, or gold storage or dealer spread. The one-line Scoreboard footer can't hold this line, so it goes in the description and the pinned comment.

**Caption / description (line 1 is the curiosity line; the verdict follows, R11):**
> The start year picks the winner.
>
> Gold: ≈ $150,000. S&P 500: ≈ $75,300. Same $10,000, Jan 2000 → Dec 2025, and gold was ahead at all 26 year-ends. That's ≈ 11.0% a year vs ≈ 8.1% a year. S&P 500 with dividends reinvested, gold at its year-end price, no fees, tax or storage costs. Educational maths, not advice. #linechart #investing #gold #sp500

**Pinned comment:**
> From Jan 2010 to Dec 2025 the S&P 500 grew ≈ ×8.3 and gold ≈ ×3.9, so start in 2010 and stocks win. Swap in your own amount: since 2000 it's ≈ ×15.0 for gold, ≈ ×7.53 for the S&P 500. Which start year should we race next?

**Per-platform notes:**
- **YouTube Shorts:** the title carries the question (ChartOrbit grammar). Add the hashtag tail "#linechart #datavisualization", the constant of ChartOrbit's winning era. No end card; the hard cut back to frame 1 is the loop.
- **Instagram Reels:**
  - Caption line 1 is "The start year picks the winner."; the finals come after the fold.
  - Cover = frame 1 (header, both tips already under the $10,000 line).
  - Expect argument comments ("start date cherry-picked"); the pinned comment answers it with numbers.
- **TikTok:**
  - Caption, about 100 characters: "The start year picks the winner. Same $10,000 in 2000: S&P 500 or gold? Not advice. #sp500 #gold"
  - Keep the header clear of the top 240 px.

**lookOpts (Scoreboard):**
- `stage: "race"`.
- `stakeLine: 10000`: a dashed line at the stake, so "below the stake" reads at a glance.
- `footerSteps`: the working line rewrites at 31.6, 36.4 and 39.3 s, as in 06a. The last step names the racers ("Gold ≈ 3.9 doublings · S&P 500 ≈ 2.9"), each in its line colour.
- `finalT: [31.6, 36.4]` (assembly pass): a staggered finish that follows the VO. The hero shows the S&P 500's final as "End of 2025: stocks ≈ $75,300" is said, and cuts to gold's (the climax: riser, hit + cash, bump, flare) on "Gold ≈ $150,000". The spec's own cash cue at 36.4 s was dropped (the kit cues hit + cash there).
- `holdBack: { series: 1, t: [34.4, 36.4] }` (QA fixer pass): gold stops at its 2024 close while the clock runs on, its label holding $91,094; it draws its last leg over 34.4-36.4 s under the riser, and its final lands at 36.4 s with the hero slam and the spoken line. Before this, the hero counted GOLD up to $145,138 in the VO silence and the gold tip landed "≈ $150,000" 4.4 s before it was said.
- `tipLane: true` (QA fixer pass): every tip label stacks name over value, and the lines end short of the plot's right edge, so both labels sit beside their own dots at the finish and never on a line (before, "S&P 500 ≈ $75,300" sat on gold's 2025 spike through the verdict).
- `flagHold: 3.0`: a flag label clears after 3 s (5 s in the assembly pass, which left "2022 bear market" over the 2025 leg), and its dashed rule fades with it. Each spoken figure is still said while its flag shows.
- `emColor: "yellow"` (QA fixer pass): the verdict's "≈ 2×" and its accent rule are in gold's colour, the winner's.
- `rungs` (QA fixer pass): at 39.3 s the y grid gives way to dashed rungs at ×2, ×4, ×8, ×16, so "doubled ≈ 4 times / ≈ 3" has a picture.
- `data.raceT[0] = −0.4`: the Scoreboard kit opens mid-race when raceT starts below 0 ("already moving at 0.0 s").
- The 2002 flag uses `tone: "neutral"` (white text), with `__≈ −38%__` (red) and `**≈ +21%**` (gold yellow, upright) inside it, so gold's gain is not drawn in crash red.

---

### 04b · Becker rig · "Your $1,000: 16 years of savings VS 1 year of the S&P 500"

*Hook pass 2 (2026-10-07) rewrote this teaser's hook: the handicap duel below replaced the round-2 riddle hook (savings vs the S&P 500, "which one lost?"). Scores and reasons are in the Review log.*

- **Look:** Becker rig, light stage. Two faceless stick figures, each climbing its own line: the hero colour on the S&P 500, neutral grey on the savings line (he walks 170 px behind his tip, in front of the green gap between the two lines, so the two never stack). Maths is in neutral ink; each result is a change in the world. After the race, the payoff card (the lens) drops in over the sky and draws the two gains the hook compares (≈ +$151 vs under +$30) to scale, since the final axis cannot show them; it is the biggest thing on screen.
- **Platform title:** "Can 16 Years in a Savings Account Beat 1 Year in the S&P 500?" (A/B: "16 Years of Savings Interest vs 1 Year of the S&P 500")
- **On-screen hook (header, 13 words):** `Your **$1,000**: 16 years of savings` / `VS 1 year of the S&P 500`
- **First VO lines:** "Year one in the S&P: ≈ $151." (0.0-4.7 s), then "Savings gets 16 years to match it." (4.8-7.5 s)
- **First 1.5 s:**
  - Frame 1 shows the 2-line header with "$1,000" as the only accent. The race is already moving (the race clock starts at −0.4 s): S&P tip "$1,041", savings tip "$1,001", year "2010", stake legend "$1,000 each · Jan 2010", and a 1-line footer. Both figures already stand on their own lines (the roll-out is fast enough that the grey figure, 170 px behind, is past the start line).
  - At 1.09 s the 2010 close lands ($1,150.60 vs $1,002.10) and the race **hit-stops**: the clock, the year and both counters freeze on "2010 · $1,151 · $1,002" while the green figure cheers (pop) over the note "year 1: ≈ +$151" (1.09-3.69 s). "≈ $151" is spoken at 2.69 s, so a viewer who subtracts gets $151 on screen. At 2.95 s the race sprints to catch up (whoosh) and rejoins its linear clock at 6.6 s.
  - At 4.8 s the grey figure strikes a "think" pose. The goal "goal: ≈ +$151" sits under his counter in ink, at up to 44 px, over a dashed rule (the dashed goal track the payoff card shows later), until the race ends (23.6 s), while his own counter crawls from $1,004 to ≈ $1,020 and the year counter runs to 2025. That is the visible open loop: a target against a counter.
- **Hook rules it satisfies:**
  - **R1:** "$1,000" in the header and two live tip counters at 0.0 s, already moving.
  - **R2:** one input, $1,000. The "16" and the "1" are the handicap, not inputs (judge 1 counted them against it: three numbers in the header).
  - **R3, R4:** everyone has a savings account, and $1,000 is an amount most viewers have parked in one.
  - **R5:** the header plants the belief that interest adds up: 16 years of savings ought to catch 1 year of stocks. Viewers on today's 4% high-yield accounts hold it. Savings earned under $30 in 16 years; the S&P 500 made ≈ $151 in its first year alone.
  - **R6:** "Your $1,000" (the stake legend adds Jan 2010).
  - **R7:** both rivals are named in the header.
  - **R8:** 13 words.
  - **R9:** the goal note against the crawling counter, with the year counter running to 2025.
  - **R10:** the first payoff, "year 1: ≈ +$151", is on screen at 1.09 s and spoken at 2.69 s, while the hit-stop holds the counter on $1,151.
  - **R11:** the hook line asks; the verdict is on screen and in the caption after the fold.
  - **R12:** a lopsided verdict you can repeat, taking a side: "The S&P 500's 2010 alone beat 16 years of savings." The payoff card shows it to scale first: a grey stub on a dashed track (under +$30) against a full green bar (≈ +$151), about 6 to 1.
- **Modelled on:**
  - HD Guy H07 "Which is cheaper? 1 Missile or 75 Rounds/Second" (11,957,600, 3.81x): a lopsided duel between units of different size.
  - Debt Freedom H49 (382,100, 289.1x): two options of different shape and a one-number verdict.
  - Master Money H84 (3.0M, 140x): the first answer lands before 3 s.
  - ChartOrbit H17 (2,808,307, 345.09x): the race is already moving at frame 1.
  - Becker devices from alan-becker.md §4 and §6: "one number going up is a complete story" (the hero's counter against the crawl), and impact frames on the 2022 drop.
- **Wrong belief it exploits:** "Interest adds up: give a savings account long enough and it earns what stocks make in a year." At the FDIC national average it did not come close: $1,000 earned $23.85 in 16 years, while the S&P 500 made $150.60 in 2010, its first year. The ledger-duel lane owns "2 people" headers and high-yield vs big-bank savings (07c), and 07b runs the "sold in the crash" twist; this teaser is a handicap race. The buying-power twist (savings lost ≈ 32% of its buying power) moved to the pinned comment.

**Beat sheet** (race: x 2010.0 → 2025.99 over t −0.4 → 23.6 s, 1.50 s per year, with a hit-stop at the 2010 close: frozen 1.09-2.95 s, catching up until 6.6 s)

| t (s) | On screen (Becker actions from `lookOpts.beats`) | VO |
|---|---|---|
| 0.0 | Header. Race already moving: S&P tip "$1,041", savings tip "$1,001", year "2010", stake legend "$1,000 each · Jan 2010". Footer "Savings: FDIC avg · S&P w/ dividends" (one line). Both figures on their own lines | "Year one in the S&P: ≈ $151." (0.0-4.7; "≈ $151" said at 2.69 s) |
| 1.09 | The 2010 close lands ($1,150.60 vs $1,002.10). **Hit-stop**: the race freezes on 2010 · $1,151 · $1,002. Hero **cheers**, note "year 1: ≈ +$151" (1.09-3.69). Pop | — |
| 2.95 | The race sprints to catch up (whoosh): peak 2.06× speed, linear again at 6.6 s. The 2011-2013 closes land at 4.36, 5.12 and 5.89 s | — |
| 4.8 | Grey figure **thinks**, ink goal note "goal: ≈ +$151" over a dashed rule, held to 23.6 s while his counter crawls ($1,004 → ≈ $1,020). Swipe | "Savings gets 16 years to match it." (4.8-7.5) |
| 7.09 | The 2014 close ($2,051.29): the first year-end at 2× the stake | "Stocks have already doubled." (7.5-9.2) |
| 8.65 | As "doubled" is said: hero **cheers**, his counter pops ($2,089). Ding | — |
| 10.8 | Grey figure **peeks** at his counter, which pops; savings tip $1,007.76 → $1,008.84 while the line shows. Tick | "Savings? Under $10 so far." (10.8-13.3) |
| 11.59-13.09 | 2018 stumble ($2,836.60 → $2,712.35) | — |
| 15.59 | The S&P tip passes $4,000 (x 2020.65) | "2020: stocks top $4,000." (14.35-17.45) |
| 16.27 | As "$4,000" is said (tip $4,364): hero **pumps** a fist, his counter pops; the grey figure **gapes** (shocked). Pop | — |
| 18.36-19.1 | "Bear market" chip in the HUD; a crash band frames the fall (clipped to the line's high, gone as the chip snaps out at 21.56 s). The 2022 close ($4,450.76) lands at 19.10 s: hero takes an **impact** (hit, shake, red hit lines), label "2022: ≈ −18%" (19.1-21.7; it names the year because the counter has moved on to 2024 by 21 s) | "2022: stocks drop ≈ 18%." (19.1-22.2; "≈ 18%" said at 21.02 s) |
| 23.6 | Race ends. Hero **grows**, tip pinned "≈ $8,280" on the gold plate. Roll. Savings tip "≈ $1,020"; grey figure **shrugs**, label "under +$30" (23.6-26.2), then sits on his ledge. Boing at 23.7 | "2025: savings made under $30 in 16 years." (23.6-27.9; "$30" said at 25.91 s) |
| 26.2 | The **payoff card** (lens) drops in over the stake legend (the legend and the year fade); the gold plate steps back (ink on soft, 0.88). Row 1, "16 years of savings": a grey stub grows on its dashed track and "under +$30" (64 px) lands at 26.69 s. Row 2, "S&P 500 in 2010", waits dim over its empty dashed track. Pop | — |
| 27.95 | Hero **points back** up at the card. Row 2 turns green and its bar shoots the full width (whoosh 28.05); "≈ +$151" (72 px) lands at 28.86 s with a card punch and a shake (pop). The savings stub is 0.158 of it, to scale | "The S&P's first year alone: ≈ $151." (27.95-32.65; "≈ $151" said at 30.64 s) |
| 32.7-36.0 | Verdict: "The S&P 500's **2010 alone** / beat 16 years of savings." Thud; the hero **cheers** (a hop). The card stays up beside it. Hold; loop back to frame 1 | — |

**Guide VO script (as read, 8 lines):**
> Year one in the S&P: about a hundred fifty-one dollars.
> Savings gets sixteen years to match it.
> Stocks have already doubled.
> Savings? Under ten dollars so far.
> 2020: stocks top four thousand dollars.
> 2022: stocks drop about eighteen percent.
> 2025: savings made under thirty dollars in sixteen years.
> The S&P's first year alone: about a hundred fifty-one dollars.

(The round-2 line "It ended at ≈ $8,280." is gone: the final sits on the gold plate from 23.6 s and in the description.)

**The maths**

- **S&P 500:** V(year) = V(year − 1) × (1 + total return), from $1,000 at the Dec 31, 2009 close.
- **Savings:** V(year) = V(year − 1) × (1 + APY), where the APY is the FDIC national average savings rate: the January reading, or the first reading of the year where January could not be found (2021):

  | Year | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
  |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
  | APY % | 0.21 | 0.16* | 0.11 | 0.085* | 0.06 | 0.06* | 0.06 | 0.06* | 0.06 | 0.075* | 0.09 | 0.06† | 0.06 | 0.33 | 0.47 | 0.41 |

  \* = not found by search; set to the midpoint of the two neighbouring Januaries (assumption).
  † = April 2021, the first reading of FDIC's revised national-rate series (FRED SNDR starts 2021-04-01 at 0.0610% and stays at 0.06% through December 2021); no January 2021 reading was found.

  | Year-end | t (s) | S&P 500 | Savings |
  |---|---:|---:|---:|
  | start (Dec 31, 2009 close) | −0.40 | $1,000.00 | $1,000.00 |
  | frame 1 (x 2010.27) | 0.00 | $1,040.54 | $1,000.57 |
  | 2010 | 1.09 | $1,150.60 | $1,002.10 |
  | 2011 | 4.36 | $1,174.88 | $1,003.70 |
  | 2012 | 5.12 | $1,362.86 | $1,004.81 |
  | 2013 | 5.89 | $1,804.29 | $1,005.66 |
  | 2014 | 7.09 | $2,051.29 | $1,006.26 |
  | 2015 | 8.59 | $2,079.60 | $1,006.87 |
  | 2016 | 10.09 | $2,328.32 | $1,007.47 |
  | 2017 | 11.59 | $2,836.60 | $1,008.08 |
  | 2018 | 13.09 | $2,712.35 | $1,008.68 |
  | 2019 | 14.59 | $3,566.47 | $1,009.44 |
  | 2020 | 16.10 | $4,222.70 | $1,010.35 |
  | 2021 | 17.60 | $5,435.04 | $1,010.95 |
  | 2022 | 19.10 | $4,450.76 | $1,011.56 |
  | 2023 | 20.60 | $5,620.86 | $1,014.90 |
  | 2024 | 22.10 | $7,027.20 | $1,019.67 |
  | 2025 | 23.60 | $8,283.66 | $1,023.85 |

- **Race clock:** 24.0 s for 15.99 years = 1.50094 s per year. Frame 1 is x = 2010 + 0.4 ÷ 1.50094 = 2010.2665, so the tips read $1,040.54 → "$1,041" and $1,000.57 → "$1,001". The **hit-stop** (`lookOpts.hitStop`) freezes the clock as it reaches the 2010 close (x 2010.99, at 1.086 s) and holds it to 2.95 s; then a cubic catch-up (speed 0 at 2.95 s, 1 at 6.6 s, peak 2.06×) brings it back to the linear clock at 6.6 s. So the 2011-2013 closes land at 4.36, 5.12 and 5.89 s (table above), and every beat from 6.6 s on keeps the linear clock: the check models the warp and tests that no year-synced VO line, flag or beat comes before 6.6 s.
- **"Year one in the S&P: ≈ $151":** the S&P 500's 2010 total return was +15.06%, so $1,000 × 0.1506 = **$150.60 → ≈ $151** (the notes read "≈ +$151"). The 2010 close lands at 1.086 s, and the note pops at 1.09 s. "≈ $151" is said at 7 spoken words ÷ 2.6 = 2.69 s, while the note shows (1.09-3.69 s) and the hit-stop holds the counter on $1,151 and the year on 2010 (1.09-2.95 s): $1,151 − $1,000 = $151 on screen.
- **Not a cherry-picked year:** over the 16 years the S&P 500 grew ×8.28366, a CAGR of 8.28366^(1/16) − 1 = **14.13%** a year (arithmetic mean 14.98%). 2010's 15.06% sits next to it. The best year was 2013 (+32.39%).
- **"Savings gets 16 years to match it" / "under $30 in 16 years":** 16 years of interest is $1,023.85 − $1,000 = **$23.85**, under $30, and far short of the ≈ $151 goal. In the input sweep below it runs **$22.62-$24.97**. The January-rate model understates 2022-2023 by about a dollar each, so the worst case is about $26.97: still under $30 in every table. Year 1 ÷ 16 years of interest = 6.3× (5.6× in the worst case); the ratio is not displayed.
- **"Stocks have already doubled":** the 2014 close ($2,051.29) is the first year-end at 2× the stake; while the line is read (7.5-9.2 s) the S&P tip reads $2,059.03 or more ("doubled" is said at 8.65 s, tip $2,089).
- **"Under $10 so far":** while the line shows (10.8-13.3 s; the check tests to 13.4 s), the savings tip reads $1,007.76 → $1,008.84, so interest so far is $7.76-$8.84. In the worst case of the sweep it reaches $9.82, still under $10. It is a bound the live tip holds, so it carries no label; the goal note stays up, the grey figure peeks at his counter and the counter pops.
- **"2020: stocks top $4,000":** the S&P passes $4,000 between the 2019 close ($3,566.47) and the 2020 close ($4,222.70), at x 2020.65 (15.59 s), and no later year-end is under it. "$4,000" is said at 14.35 + 5 ÷ 2.6 = 16.27 s, when the tip reads $4,363.80, and the tip stays over $4,000 to the line's end. The line starts at 14.35 s, inside 2020's year-sync window (14.29-16.70 s). It rests only on the S&P data: a savings line here ("savings hits $10") was rejected, because whether interest first passes $10 in 2019, 2020 or 2021 depends on the uncertain FDIC midpoint years.
- **"≈ 18%":** the S&P 500's 2022 return, −18.11%. It is said at 21.02 s while the impact label shows (19.1-21.7 s).
- **"$30"** is said at 23.6 + 6 ÷ 2.6 = 25.91 s while the shrug label "under +$30" shows (23.6-26.2 s). The 2025 line starts at 23.6 s, inside 2025's year-sync window (21.80-24.20 s).
- **"The S&P's first year alone: ≈ $151"** is said at 27.95 + 7 ÷ 2.6 = 30.64 s while the payoff card's S&P row shows "≈ +$151" (from 28.86 s to the end).
- **The lens bars** are drawn from the series' own points (the kit computes no displayed figure): the savings row is $1,023.85 − $1,000 = $23.85 (Jan 2010 → Dec 2025), shown as "under +$30"; the S&P row is $1,150.60 − $1,000 = $150.60 (2010), shown as "≈ +$151". The savings bar is 23.85 ÷ 150.60 = 0.158 of the S&P bar (not displayed). Over the FDIC sweep the stub moves by about ±5% of its length, and its label holds in every table.
- **Finals:** $8,283.66 → **≈ $8,280**; $1,023.85 → **≈ $1,020** (3 significant figures each).
- **Verdict:** "The S&P 500's **2010 alone** / beat 16 years of savings." It takes a side (R12) instead of restating the card's two numbers, which sit right above it. "Beat" compares gains, as the hook does: $150.60 in 2010 against $23.85 of interest in 16 years (at most $26.97 in the worst table with the understatement). It names 2010 because "1 year of the S&P 500" on its own would read as any year, and some years earned less (see the pinned comment). The emphasis (green, with the swoosh) is on "2010 alone": green is the S&P's colour for the whole video. On-screen gains always carry their sign ("≈ +$151", "under +$30" on the notes and the card); the captions transcribe the spoken lines, which say them without it.
- **Prices and buying power (pinned comment):**
  - CPI-U Dec 2025 ÷ Dec 2009 = 324.054 ÷ 215.949 = 1.50060 → "≈ 50%". $1,000 × 1.50060 = $1,500.60 → **≈ $1,501**.
  - $1,023.85 ÷ 1.50060 = $682.29 → **≈ $680**. Lost: 1 − 682.29 ÷ 1,000 = 31.77% → **≈ 32%**.
  - Total interest over 16 years: $1,023.85 ÷ $1,000 − 1 = 2.385%, **≈ 2.4%**, while prices rose 50.06%.
- **Years that earned less (pinned comment):** on $1,000, the S&P 500 made $21.10 in 2011 (+2.11%) → ≈ $21 and $13.80 in 2015 (+1.38%) → ≈ $14, and lost money in 2018 (−4.38%) and 2022 (−18.11%). All four are below the sweep's lowest 16-year interest ($22.62).
- **Robustness (the check's sweep):**
  - Inputs varied: Jan 2010 at 0.21 or 0.22 (the verifier found 0.22 for early 2010); 2021 at 0.04, 0.05 or 0.06; Jan 2024 at 0.46 or 0.47; and each of the five midpoint years at its left neighbour, the midpoint or its right neighbour. That is 2,916 input tables.
  - Across all of them the savings final runs $1,022.62-$1,024.97, the real value $681.47-$683.04, and the loss 31.70-31.85%. So **≈ $1,020, ≈ $680, ≈ 32%, "under $10 so far" and "under $30" hold in every table**, and the dollar digit does not (which is why it is not shown).
  - Even at the highest January rate in the table, 0.47%, every year: $1,000 × 1.0047¹⁶ = $1,077.91 → **≈ $1,078**. That is still below prices ($1,500.60), and the S&P 500 is still more than 7× it. At 0.06% every year: $1,009.64.

**Assumptions** (footer: "Savings: FDIC avg · S&P w/ dividends"; the description carries the "under 0.5%" bound and the 2010-2025 window):
- Interest is compounded once a year at that year's January national average (the footer gives the bound; "set each January" is said here). The real rate moved during the year: 2022-2023 rose mid-year, so this understates those two years by about a dollar each (covered by the "under $30" margin above).
- Five Januaries are midpoints, and 2021 uses its April reading; the sweep shows none of this moves an on-screen figure.
- FDIC changed the national-rate method in April 2021 (deposit-weighted, credit unions included); readings before and after are each FDIC's published national rate at the time.
- S&P 500 total return; no fees or tax.
- Prices are measured by CPI-U, Dec 2009 → Dec 2025.

**Caption / description (line 1 is the curiosity line; the verdict follows):**
> Can 16 years of savings beat 1 year of stocks?
>
> $1,000 in a savings account at the FDIC national average (under 0.5% a year throughout) earned under $30 of interest in 16 years (Jan 2010 → Dec 2025): ≈ $1,020 in total. The same $1,000 in the S&P 500 (dividends reinvested) made ≈ $151 in 2010 alone and ≈ $8,280 by the end. No fees or tax. Educational maths, not advice.

**Pinned comment:**
> 2010 wasn't a lucky pick: the S&P 500 averaged ≈ 14.1% a year over these 16 years, and 2010 was +15.06%. But not every year wins: on $1,000, 2011 made ≈ $21, 2015 ≈ $14, and 2018 and 2022 lost money. And prices rose ≈ 50% (CPI-U), so the savings account's ≈ $1,020 buys what ≈ $680 did in 2010. Even at the highest January rate since 2010 in our table (0.47%) every single year, $1,000 would be ≈ $1,078. What does your savings account pay? (Swap in your own amount: ≈ ×8.28 for the S&P 500, ≈ ×1.02 for average savings.)

**Per-platform notes:**
- **YouTube Shorts:** the title asks the handicap question; the A/B title states the duel. The goal note against the crawling counter is the reason to stay; the verdict waits until the last line has been read.
- **Instagram Reels:** caption line 1 is "Can 16 years of savings beat 1 year of stocks?"; the verdict comes after the fold. Cover = the 29.5 s frame (the payoff card: the grey "under +$30" stub on its dashed track against the full green "≈ +$151" bar, the dimmed gold "≈ $8,280" beside it) as an A/B against frame 1. The benchmark gives no Becker-style precedent (no character breakouts, X3 in the looks file), so this is the test of the look.
- **TikTok:** caption "16 years of savings vs 1 year of the S&P 500. $1,000 each, since 2010. Not advice." (no verdict in line 1).

**lookOpts (Becker rig):**
- `stage: "light"`.
- `figures`: series 0 hero; series 1 neutral, with `lag: 170` (he walks 170 px behind his tip whenever the two tips are closer than about 1.45 figure heights, which is the whole race here) and `outline: 6` (a thin halo, so the green line passes behind him rather than through him).
- `fill: "gap"` (fixer pass): the pale green fills only between the S&P line and the savings line, so the green area is the gap the video is about, not the $0-$1,000 band.
- `hitStop: { x: 2010.99, until: 2.95, rejoin: 6.6 }` (fixer pass): see the race clock above.
- `beats`, each on its VO line or close:
  - cheer (1.09 s, the 2010 close, note "year 1: ≈ +$151");
  - think (4.8 s, `d` 18.8, `chip`: the goal note "goal: ≈ +$151" in ink over a dashed rule, held to the race end);
  - cheer (8.65 s, `pulse`: as "doubled" is said; his counter pops);
  - peek (10.8 s, `d` 2.5, `pulse`: the grey figure peeks at his counter as "Under $10 so far" is read; it pops);
  - pump (16.27 s, `d` 1.0, `pulse`: as "$4,000" is said) and shocked (16.27 s, `d` 1.0: the grey figure gapes);
  - impact (19.1 s, "2022: ≈ −18%");
  - grow (23.6 s);
  - shrug (23.6 s, "under +$30");
  - pointBack (27.95 s, `d` 4.7): he points back up over his shoulder at the payoff card (no note: the card's S&P row carries "≈ +$151");
  - cheer (32.7 s): a hop as the verdict lands.

  A note shows for max(2.6 s, `d`), cut by the next note on the same figure. Each "≈" before a "+$" or "−" figure in a note is followed by a no-break space so the note never splits "≈" from its number.
- `lens`: `t` 26.2 (as the shrug note ends); rows `{ series: 1, from: 2010, to: 2025.99, label: "16 years of savings", display: "under +$30" }` and `{ t: 27.95, series: 0, from: 2010, to: 2010.99, label: "S&P 500 in 2010", display: "≈ +$151" }`. Bar lengths are valueAt(to) − valueAt(from) of the series' own points; the values are the display strings. Since the fixer pass the card is the payoff: it drops in over the stake legend (the legend and the year fade), each row stacks its label (44 px), its value (64 px; 72 for the largest gain) and a 36 px bar on one scale over a dashed track the length of the largest bar (the goal the savings never reached), the gold plate dims while it is up, and the gridlines under it and the crash band fade. A row waits as a dim label over its empty track, then its bar grows (0.35 s + 0.5 s × its share of the longest) and its value pops 0.04 s before the bar is full; the largest lands with a 2.5% card punch and a shake. The finished chart would pull back (the value axis rescales) if the card did not fit above the lines and flags under it; here it fits as is.
- `events`: one flag, "Bear market" at x 2022.5 (fixer pass: the "COVID" flag marked nothing on annual closes, 2020 closed +18.4%, and the chip no longer repeats the year the impact note carries).
- `gag`: a one-paragraph staging note.
- Not used any more: the round-2 flood beat (the "prices" tide). The buying-power fact sits in the pinned comment. Both judges noted that cutting it drops the strongest twist; it is the first thing to restore if the duel underperforms.

---

### 04c · Live Sheet · "POV: In 2016 you invested $10,000 in USA vs EUROPE"

- **Look:** Live Sheet, in its sheet-race mode (QA fixer pass). A white sheet on black, a yellow title banner and a "≈" formula-bar chip. The sheet is a header row (Year | USA | Europe), a ledger row (the latest closed year and each rival's return that year) and a value row (each rival's money at that close, in its line colour). The values live in the sheet, so the chart under it takes the card's full width (a plot of about 766 × 394 px, up from about 480 × 320). Green for good, red for drops; yellow only for the point.
- **Topic change from the seed:** the seed was "US vs international since 2010, $10,000 each".
  - **Europe instead of "international":** it is the one country pair in the benchmark with a 345.09x multiple and 4× the comment rate (national rivalry). "International" is an unnamed set (R7).
  - **2016 instead of 2010:** MSCI's own factsheet, the primary source for MSCI Europe, covers 2012-2025, so 2010-2011 could not be two-sourced. A 10-year window (Jan 2016 → Dec 2025) also gives Jake's "10 years" grammar.
- **Platform title:** "What If You Invested $10,000 in the USA and EUROPE in 2016?" (A/B: "Europe Won 2025. Who Won the Decade?")
- **On-screen hook (banner, 10 words):** `POV: In 2016 you invested **$10,000** in` / `USA vs EUROPE` (kept: it is H17's 345x header almost word for word).
- **First VO lines:** "2025: Europe beat the USA ≈ 2 to 1." (0.0 s, read "about two to one"), then "Who won the decade?" (5.05 s, as the sheet rewinds).
- **Hook rules it satisfies:**
  - **R1:** "$10,000" in the banner, and the claim itself at frame 1: the hook row "2025 | +17.88% | +35.41%" at 72 px, Europe's cell yellow under the selection.
  - **R2.**
  - **R4.**
  - **R5:** the first line plants the belief the ending breaks ("Europe is beating the US now"), and the question pill ("2016 → 2025: who won?") turns it into a loop.
  - **R6.**
  - **R7:** named countries.
  - **R8:** 10 words.
  - **R9:** even year ticks (2016, 2018, 2020, 2022, 2024) on a fixed axis, so the remaining years are countable.
  - **R10:** the claim is on screen from 0.0 s; the race starts at 4.8 s and its first close lands at 6.48 s.
  - **R11.**
  - **R12:** "Europe won 2025. The USA won the decade."
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US flag] VS [EU flag]" (2,808,307 views, 345.09x, 1,220 comments).
  - ChartOrbit H19, "What If You Invested $5,000 in USA and CHINA?" (1,068,784, 5.18x).
  - Jake's H78/H80, "2 people invest $10,000 / 10 years ago" (322,339 / 276,471).
  - Live Sheet's formula bar comes from Debt Freedom's spreadsheet-as-proof (H48, 1.9M, 902.5x).
  - Contrast cases we avoid: S&P500 and NASDAQ100 48,161 and USA and CANADA 30,478. That is why the labels say USA and EUROPE first and the index names second.
- **Wrong belief it exploits:** "Europe is beating the US now." In 2025, Europe +35.41% vs the USA +17.88%, ≈ 2 to 1. Over the decade, the USA ≈ $39,800 vs Europe ≈ $22,700: the USA ≈ doubled twice, Europe once.

**Beat sheet** (race: x 2016.0 → 2025.99 over t 4.8 → 21.8 s, 1.70 s per year, with `lookOpts.preroll: 0` so the kit sweeps exactly this range; the ledger and value rows change on `lookOpts.ledger.rowT`, the closes)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "= last year × (1 + return)", fully typed (one line: the rule). Header row Year · USA (S&P 500) · Europe (MSCI Europe). The hook row, tall, values at 72 px: "2025 · +17.88% · **+35.41%**", Europe's cell yellow under the selection. The chart is parked at the start: both dots on the dashed $10,000 "money in" line, named "USA" / "Europe", and a dark pill "2016 → 2025: who won?". Footer (one line) "Total return in US$ · no fees or tax" | "2025: Europe beat the USA ≈ 2 to 1." (0.0-5.0; "≈ 2" said at 3.46 s) |
| 4.8-5.3 | The rewind: the hook row's year counts back 2025 → 2016 and its values lift out; it shrinks to the ledger row ("2016", cells empty) and the value row snaps in, "Value · $10,000 · $10,000", the selection on Europe's cell. The pill and the start tags clear and the race starts. Whoosh | "Who won the decade?" (5.05-6.65) |
| 6.48 | 2016 close: "+11.96% / −0.40%"; the values roll to $11,196 / $9,960; the bar types Europe's step "= $10,000 × (1 − 0.40%)". Tick | — |
| 8.19 | 2017: "+21.83% / +25.51%"; $13,640 / $12,501; "= $9,960 × (1 + 25.51%)" | "2018: Europe drops ≈ 15%." (7.97; "≈ 15%" said at 9.89 s) |
| 9.73-9.89 | "2018 sell-off" pill slams into the strip at the top of the plot (its dashed rule fades with it, and the year labels stay clear). 2018 close at 9.89: "−4.38% / −14.86%" (red); $13,043 / $10,643; "= $12,501 × (1 − 14.86%)". Thud | (continues) |
| 11.59-11.95 | 2019: "+31.49% / +23.77%"; $17,150 / $13,173. The selection springs to the USA's cell: "= $13,043 × (1 + 31.49%)". "COVID" pill at 11.95 | — |
| 13.29 | 2020: "+18.40% / +5.38%". The USA cell reads $20,305 and flashes yellow; a dashed "×2" rung wipes across the chart at $20,000; the bar types "≈ $10,000 × 2.03". Ding | "2020: the USA has doubled your money." (13.3-17.6; the USA value stays at or above $20,305) |
| 14.99 | 2021: "+28.71% / +16.30%"; $26,135 / $16,145; "= $20,305 × (1 + 28.71%)" | (continues) |
| 15.86-16.69 | "2022 bear market" pill. 2022 at 16.69: "−18.11% / −15.06%"; $21,402 / $13,713. The selection goes back to Europe: "≈ $16,145 × (1 − 15.06%)" | (continues) |
| 17.65-20.10 | 2023 at 18.40: "+26.29% / +19.89%"; $27,029 / $16,441; "= $13,713 × (1 + 19.89%)". The flag strip empties and the lines take its headroom back. 2024 at 20.10: "+25.02% / +1.79%"; $33,791 / $16,735. Riser from 19.9 | "Europe? Still under $17,000." (17.65-20.05) · "2025: Europe jumps ≈ 35%." (20.1; "≈ 35%" said at 22.02 s) |
| 21.8 | Race ends. Row 2025: "+17.88% / +35.41%". The value row holds the 2024 closes in grey (not computed yet); the bar types "= $16,735 × (1 + 35.41%)" | (continues) |
| 23.25-23.7 | The finale: the header and both rows clear, and two hero rows wipe in: "USA · 2025: +17.88% · $33,791" and "Europe · 2025: +35.41% · $16,735", values at 94 px. Swipe | "Final: USA ≈ $39,800." (23.25; "≈ $39,800" said at 24.79 s) |
| 23.79-24.79 | The selection springs to the USA's value; the bar types "= $33,791 × (1 + 17.88%)"; the value rolls like an odometer and lands "≈ $39,800" at 24.79 s (flash, pop) | (continues) |
| 26.6-27.6 | The selection springs to Europe's value; "= $16,735 × (1 + 35.41%)"; it rolls and lands "≈ $22,700" at 27.6 s. Pop | "Europe ≈ $22,700." (27.2; said at 27.58 s) |
| 29.95 | A "×4" rung wipes in at $40,000: the USA line ends just under it, Europe's just over ×2. The selection on the USA, the bar "≈ ×3.98 ≈ 2 doublings". Pop | "The USA ≈ doubled twice. Europe, once." (29.95-33.45) |
| 32.64 | The selection on Europe, the bar "≈ ×2.27 ≈ 1 doubling" | ("Europe, once") |
| 33.5-36.5 | The verdict card spans the sheet (x 60-960) in the caption band: "Europe won **2025**. / The USA won the **decade**." The USA's value turns yellow (the decade) and Europe's "2025: +35.41%" gets a yellow marker (the year). Ding. The last 0.5 s rewind to frame 1 (loop) | — |

**Guide VO script (as read, 9 lines):**
> 2025: Europe beat the USA about two to one.
> Who won the decade?
> 2018: Europe drops about fifteen percent.
> 2020: the USA has doubled your money.
> Europe? Still under seventeen thousand.
> 2025: Europe jumps about thirty-five percent.
> Final: USA, about thirty-nine thousand eight hundred.
> Europe, about twenty-two thousand seven hundred.
> The USA about doubled twice. Europe, once.

**The maths**

- **Recurrence:** V(year) = V(year − 1) × (1 + r(year)), from $10,000 at the Dec 31, 2015 close.
  - USA r = S&P 500 total return.
  - Europe r = MSCI Europe net total return in US dollars.

  | Year-end | t (s) | USA (S&P 500) | Europe (MSCI Europe) | Ledger row (USA / Europe) |
  |---|---:|---:|---:|---|
  | start (Dec 31, 2015 close) | 4.80 | $10,000.00 | $10,000.00 | — |
  | 2016 | 6.48 | $11,196.00 | $9,960.00 | +11.96% / −0.40% |
  | 2017 | 8.19 | $13,640.09 | $12,500.80 | +21.83% / +25.51% |
  | 2018 | 9.89 | $13,042.65 | $10,643.18 | −4.38% / −14.86% |
  | 2019 | 11.59 | $17,149.78 | $13,173.06 | +31.49% / +23.77% |
  | 2020 | 13.29 | $20,305.34 | $13,881.77 | +18.40% / +5.38% |
  | 2021 | 14.99 | $26,135.01 | $16,144.50 | +28.71% / +16.30% |
  | 2022 | 16.69 | $21,401.96 | $13,713.14 | −18.11% / −15.06% |
  | 2023 | 18.40 | $27,028.53 | $16,440.68 | +26.29% / +19.89% |
  | 2024 | 20.10 | $33,791.07 | $16,734.97 | +25.02% / +1.79% |
  | 2025 | 21.80 | $39,832.91 | $22,660.82 | +17.88% / +35.41% |

  The value row shows each close to the dollar ($13,043, $10,643 …) and steps with the ledger row, so both always name the same year.
- **"≈ 2 to 1" (hook) and "≈ 35%":** 35.41% ÷ 17.88% = 1.98; 35.41 → 35. The USA's 17.88% is on screen (hook row, 2025 row, hero note) but no longer spoken.
- **Formula bar (the selected cell's step, retyped at each close):** the last close shown, to the dollar, × (1 ± that year's return). Each product rounds to the value shown in the cell, except two, which carry "≈":
  - 2020 (USA): $17,150 × 1.1840 = $20,305.60 → $20,306, $1 over the shown $20,305 (the true close is $20,305.34). That step shows the doubling instead: $20,305.34 ÷ $10,000 = 2.0305 → "≈ $10,000 × 2.03".
  - 2022 (Europe): $16,145 × 0.8494 = $13,713.56 → $13,714 vs the shown $13,713, so "≈ $16,145 × (1 − 15.06%)".
  - The finale's steps: $33,791 × 1.1788 = $39,832.83 → ≈ $39,800; $16,735 × 1.3541 = $22,660.86 → ≈ $22,700.
- **"≈ 15%":** Europe 2018, −14.86%.
- **"doubled" (2020):** the first USA year-end at or above $20,000 is 2020 ($20,305.34; 2019 was $17,149.78). Europe first passes $20,000 only in 2025. The ×2 rung sits at $20,000 = 2 × the stake.
- **"Still under $17,000":** Europe's highest year-end before 2025 is $16,734.97 (2024). Its value cell shows $13,713 then $16,441 during the line, and its tip crosses $17,000 only at x ≈ 2025.04, after the line ends.
- **Finals:** $39,832.91 → **≈ $39,800**; $22,660.82 → **≈ $22,700**.
- **Multiples:** 3.9833 → "≈ ×3.98" ($10,000 × 3.98 = $39,800); 2.2661 → "≈ ×2.27" ($22,700).
- **Per year:** 3.9833^(1/10) − 1 = 14.82%, **≈ 14.8%**; 2.2661^(1/10) − 1 = 8.52%, **≈ 8.5%** (caption and pinned comment).
- **Doublings:** log₂ 3.9833 = 1.994, just short of 2 ("≈ doubled twice" and "≈ ×3.98 ≈ 2 doublings", so both carry "≈"; the USA line ends just under the ×4 rung); log₂ 2.2661 = 1.18 (one completed doubling: "once", "≈ 1 doubling"; Europe ends just over ×2). Rule of 72 for the pinned comment: 72 ÷ 14.8 ≈ 4.9 years per doubling; 72 ÷ 8.5 ≈ 8.5.

**Assumptions** (footer: "Total return in US$ · no fees or tax"; which index is which is named in the sheet's header cells, "USA / S&P 500" and "Europe / MSCI Europe"; the window is in the banner and the ledger's years):
- Both are total-return indexes in US dollars, so Europe's line includes the euro/pound moves against the dollar.
- MSCI Europe is "net" (after dividend withholding tax), while the S&P 500 series is gross. This tilts roughly 0.3-0.5 points a year toward the USA, far smaller than the 6.3-point gap. The one-line footer can't hold this, so the description says "MSCI Europe net".
- No fund fees or personal tax. Bought at the Dec 31, 2015 close and valued at the Dec 31, 2025 close.

**Caption / description (line 1 is the curiosity line; the verdict follows):**
> Europe won 2025. Who won the decade?
>
> 2025: Europe +35.41% vs the USA +17.88%. The decade: USA ≈ $39,800 vs Europe ≈ $22,700 from the same $10,000 (Jan 2016 → Dec 2025, total return in US dollars; USA = S&P 500, Europe = MSCI Europe net). That's ≈ 14.8% a year vs ≈ 8.5%. Educational maths, not advice. #linechart #investing #europe #sp500

**Pinned comment:**
> One great year ≠ a great decade. Per year: USA ≈ 14.8%, Europe ≈ 8.5%. Rule of 72: one doubling every ≈ 4.9 years vs ≈ 8.5. Swap in your own amount: ≈ ×3.98 vs ≈ ×2.27. Next race: USA vs Japan, or USA vs China?

**Per-platform notes:**
- **YouTube Shorts:** ChartOrbit's exact title grammar, plus #linechart; A/B it against "Europe Won 2025. Who Won the Decade?". Country pairs drew about 4× the comments per view, so reply to the "what about currency / dividends?" comments with the footer basis.
- **Instagram Reels:** caption line 1 is "Europe won 2025. Who won the decade?". Cover = frame 1 (the 2025 hook row with Europe lit, and the "2016 → 2025: who won?" pill). Test it against the finished sheet (both hero rows and the verdict).
- **TikTok:** caption "Europe won 2025. Who won the decade? $10,000 in the USA vs Europe since 2016. Not advice." The national-rivalry comments are the point; don't add a third country (ChartOrbit's three-way titles fell to a 53,469 median).

**lookOpts (Live Sheet, sheet-race mode; documented in the format file's header):**
- `valueRow: { label: "Value" }`: the values move into a sheet row under the ledger row and step with it (a 0.35 s roll at each close), so the chart takes the card's full width. This replaces the value cells that rode beside the plot in a 270 px lane.
- `hook: { row: 9, until: 4.8, series: 1, ask: "2016 → 2025: who won?" }`: frame 1 shows the 2025 ledger row as a tall row with large values, Europe's cell yellow under the selection, and the question pill over the parked race; at 4.8 s it rewinds into the race.
- `formulaAt0: 1` and `formulaSteps` (15 steps): the rule, fully typed at frame 1, then the selected cell's step at each close, each finale roll and each half of the doublings line. All fit one line, so the bar stays 76 px.
- `focus`: the selection's cell over time (Europe from the rewind, the USA from the 2019 close, Europe from the 2022 close, then each final as it is named, and the USA, the decade winner, at the verdict). The formula bar always shows the selected cell's working.
- `ledger`: columns, 10 rows of exact yearly returns, and `rowT`, the moment each year's close lands on the chart.
- `rungs`: ×2 at $20,000 with the 2020 close (the "doubled" line), ×4 at $40,000 with the doublings line.
- `finale: { t: 23.25, roll: [1.0, 1.0] }` and `finalT: [24.79, 27.6]`: the hero rows wipe in as "Final:" starts; each value rolls from its 2024 close and lands as the VO says its final.
- `flagHold: 3.0`: the event pills sit in a strip at the top of the plot (never over the year labels); each holds 3 s and its dashed rule fades with it.
- `xEven: true`: even year ticks, 2016-2024 (the 2025 label is no longer forced in beside 2024).
- `preroll: 0` (assembly pass): the race sweeps x 2016.0 → 2025.99 over 4.8 → 21.8 s, as the check's clock assumes.

---

## Sources (every real-world input)

All were verified by web search: round 1 on 2026-10-07 (14 searches), plus 7 more in this revision. Bash and WebFetch egress to the source sites (FDIC, BLS, FRED) was blocked in both sessions, so every figure comes from search results. Rows marked **[click-check]** came from a search summary whose exact page could not be opened. A human should open the URL once before publishing.

| Input | Value(s) used | Source 1 | Source 2 (independent) |
|---|---|---|---|
| S&P 500 total return, 2000-2006 | −9.10, −11.89, −22.10, 28.68, 10.88, 4.91, 15.79 % | S&P DJI data via Slickcharts, "S&P 500 Total Returns by Year" (https://www.slickcharts.com/sp500/returns), as used by 07b | UMD Smith School, David Kass, "S&P 500 Total Return Up in 80% of Past 78 Years" (2020-01-06, https://blog.umd.edu/davidkass/2020/01/06/sp-500-total-return-up-in-80-of-past-78-years-1942-2019); Motley Fool, "S&P 500 annual returns" (https://www.fool.com/investing/stock-market/indexes/sp-500/annual-returns) **[click-check]** |
| S&P 500 total return, 2007-2025 | the 07b table (e.g. 2008 −37.00, 2022 −18.11, 2025 17.88 %) | Slickcharts (above) | YCharts, US500.com, History of Market (2017-2025) and NYU Stern/Damodaran (several years), per [`checks/07-ledger-duel.py`](checks/07-ledger-duel.py) |
| Gold, annual % change of the year-end price, 2000-2024 | table in the check (e.g. 2013 −28.0, 2024 27.2 %) | Visual Capitalist, "Charted: Gold's Annual Returns (2000-2025)" (Jul 2025, https://www.visualcapitalist.com/charted-golds-annual-returns-2000-2025/) | thegoldprice.net, "Gold Price by Year — Annual Returns from 2000 to 2026" (https://thegoldprice.net/guides/gold-annual-returns) and chartrow (https://chartrow.com/gold/returns). These use a different price basis: same within 0.5 points in most years, 1.9 points in 2000. The check runs the race on these values too |
| Gold 2024 close | $2,624.60 (+27.23%) | Macrotrends, "Gold Prices - 100 Year Historical Chart" (https://www.macrotrends.net/1333/historical-gold-prices-100-year-chart) **[click-check]** | consistent with Visual Capitalist's 27.2% |
| Gold Dec 31, 2025 close | $4,319.37, "up 64.58%" | search summary citing metalcharts.org (https://metalcharts.org/gold-price-history/2025) / pricegold.net (https://pricegold.net/2025/december/) **[click-check]** | thegoldprice.net 2025 = 64.6%; VanEck gold commentary Dec 2025 (https://www.vaneck.com/us/en/blogs/gold-investing/ima-casanova-a-golden-year-with-more-leverage-ahead/gold-monthly-commentary-december-2025.pdf): 64.4% in USD; other closes $4,323 and $4,325.45. LBMA, "Precious Metals Market Report: Q4 and Full Year 2025" (https://www.lbma.org.uk/articles/lbma-precious-metals-market-report-q4-and-full-year-2025): above $4,000 from 7 Nov to year end |
| FDIC national savings rate, Januaries 2010-2020 (even years) | 2010 0.21, 2012 0.11, 2014 0.06, 2016 0.06, 2018 0.06, 2020 0.09 % | Forbes Advisor, "History of Savings Account Interest Rates" (https://www.forbes.com/advisor/banking/savings/history-of-savings-account-interest-rates/) **[click-check]** | wealthvieu, "Savings Account Interest Rate History: 1980–2026" (https://wealthvieu.com/banking/interest-rates/savings-rate-history/) **[click-check]**. The verifier found 0.22 for early 2010; the sweep covers it |
| FDIC national savings rate, Jan 2022-2025 | 0.06, 0.33, 0.47, 0.41 % | FRED, "National Rate: Savings" (SNDR), FDIC data, table observations 2022-01-01, 2023-01-01, 2024-01-01, 2025-01-01 (https://fred.stlouisfed.org/data/SNDR) **[click-check]** | FDIC, National Rates and Rate Caps, 2022-01-18 (https://fdic.gov/resources/bankers/national-rates/2022-01-18.html) for 2022; round 1's search summary of FDIC monthly values (SmartAsset, banksparency) for 2023-2025. The verifier found 0.46 "as of January 31, 2024" (the next monthly reading); the sweep covers it |
| FDIC national savings rate, 2021 | 0.06 % (April 2021, first reading of the revised series; January not found) | FRED SNDR (above): 2021-04-01 0.0610 %, then 0.06 % through 2021-12 **[click-check]**. FRED's older weekly series SAVNRNJ runs to 2021-03-29 but its values could not be read | none. The sweep covers 0.04 and 0.05 |
| CPI-U, Dec 2009 | 215.949 | BLS CPI news release, 2010-01-15 (https://www.bls.gov/news.release/archives/cpi_01152010.htm) | BLS historical CPI-U table (https://www.bls.gov/regions/southwest/data/consumerpriceindexhistorical_us1982-84_table.pdf) **[click-check]** |
| CPI-U, Dec 2025 | 324.054 (+2.7% y/y) | BLS CPI news release, 2026-01-13 (https://www.bls.gov/news.release/archives/cpi_01132026.htm) | Idaho Dept. of Labor, "2025 CPI" (https://lmi.idaho.gov/wp-content/uploads/2025/12/2025-CPI.pdf) **[click-check]** |
| MSCI Europe (USD, net), 2016-2025 | −0.40, 25.51, −14.86, 23.77, 5.38, 16.30, −15.06, 19.89, 1.79, 35.41 % | MSCI, "Index Factsheet MSCI Europe Index (USD)" (https://www.msci.com/documents/10199/255599/msci-europe-index-net.pdf) | YCharts, "MSCI Europe Net Total Return" (https://ycharts.com/indices/%5EMSEURNTR): identical for 2019-2025. DWS, Xtrackers MSCI Europe UCITS ETF 1C (https://etf.dws.com/en-gb/LU0274209237-msci-europe-ucits-etf-1c/): fund returns within 1.0 point every year, 2016-2025 |

**Search log, round 1 (14 of 14 used):**
1. S&P 500 total return 2000-2006.
2. Gold annual data (Macrotrends; it returned a stale mid-2025 snapshot).
3. Gold LBMA year-ends (returned the LBMA 2025 report, not the old year-ends).
4. Gold Dec 31, 2025 close.
5. Gold annual returns table.
6. Gold Sep 30, 2026 and 2026 year to date (single source, so not used on screen).
7. FDIC rate table (the summary mixed in policy rates, so rejected).
8. FDIC Januaries, domain-filtered. Counted twice: one attempt errored on a blocked domain.
9. MSCI Europe factsheet.
10. CPI Dec 2025.
11. CPI Dec 2009.
12. Gold second source.
13. MSCI Europe second source.

**Search log, this revision (7 of 10 used):**
1. FDIC savings national rate, January 2021: no value; found FDIC's April 2021 method change.
2. FRED SNDR table from 2021: series starts 2021-04-01 at 0.0610 %, 0.06 % through 2021-12.
3. FRED SAVNRNJ (the pre-2021 weekly series): exists (2009-05-18 to 2021-03-29), values not returned.
4. "0.05%" January 2021 national average: no sourced value.
5. FRED SNDR, January 2022-2025: 0.06, 0.33, 0.47, 0.41 %.
6. FDIC rate caps, January 2024 (0.46 vs 0.47): inconclusive.
7. FRED SNDRRCA (national rate + 75 bp), January 2024: value not returned.

## Summary table

| Spec | Look | Header (words) | First VO line | Stake / window | Finals | Verdict | Length |
|---|---|---|---|---|---|---|---|
| 04a | Scoreboard | "POV: In 2000 you put $10,000 in / the S&P 500 VS gold" (12) | "Stocks should crush gold." | $10,000 each, Jan 2000 → Dec 2025 | ≈ $75,300 vs ≈ $150,000 | Gold ≈ 2× the S&P 500 | 45.5 s |
| 04b | Becker rig | "Your $1,000: 16 years of savings / VS 1 year of the S&P 500" (13) | "Year one in the S&P: ≈ $151." then "Savings gets 16 years to match it." | $1,000 each, Jan 2010 → Dec 2025 | ≈ $8,280 vs ≈ $1,020 | The S&P 500's 2010 alone beat 16 years of savings (≈ +$151 vs under +$30, on the payoff card) | 36.0 s |
| 04c | Live Sheet | "POV: In 2016 you invested $10,000 in / USA vs EUROPE" (10) | "2025: Europe beat the USA ≈ 2 to 1." then "Who won the decade?" | $10,000 each, Jan 2016 → Dec 2025 | ≈ $39,800 vs ≈ $22,700 | Europe won 2025; the USA won the decade | 36.5 s |

## Caveats

- **Start dates decide races.** 04a starts at the dot-com peak; from 2010 the S&P 500 wins (≈ ×8.3 vs ≈ ×3.9), and the pinned comment says so. 04c starts in 2016 for a round 10 years inside the 2012-2025 run that MSCI's factsheet covers; from 2012 the gap is wider (≈ ×7.1 vs ≈ ×3.1).
- **No 2026 data on screen.** The races end at the Dec 31, 2025 close (see the decisions above). A refresh after Dec 31, 2026 needs one more year per series.
- **Search-summary provenance.** Every figure was seen only in search summaries, never on the page itself. The **[click-check]** rows need one human click before posting. The weakest inputs are the FDIC readings for 2010, 2021 and 2024 and the five midpoint years; the 04b sweep shows that none of them can change an on-screen figure.
- **Benchmark caveats carry over.** The format's only benchmark channel (ChartOrbit) has collapsed to a ~1,557 median since leaving its formula. Our lengths (36.5-45.5 s) sit between its 61 s winners and its 31 s decline, by brief.
- **Kit nit, since fixed in the kits:** the Live Sheet caption chunker (and the Scoreboard caption wrap) used to split "≈" from its number ("BEAT THE USA ≈" / "2 TO 1"). In the assembly-pass stills "≈ 2 TO 1", "JUMPS ≈ 35%", "USA, ≈ 18%" and "Gold doubled ≈ 4" all keep "≈" with its number.
- **Mutation test (12 of 12 caught):** a wrong final; a missing "≈" in the VO; an off-beat VO line; VO read too fast; a wrong ledger cell; an unchecked string containing a digit; a wrong chart point; a header over 15 words; a verdict that lands while the last VO line is still running; the 04c "2018" line moved 0.4 s later (its "≈ 15%" is then said after the ledger row has moved on); the 04a 2002 flag deleted (the spoken figures lose their anchor); the 04b savings final shown to the dollar. Hook pass 2 added 8 for the new 04b, all caught as failed claims, not crashes:
  - a verdict without "2010";
  - the year-1 cheer before the 2010 close;
  - the goal note cut short;
  - the "S&P's" line read too fast;
  - "under $20";
  - the point label late;
  - a static frame 1;
  - "≈ $152".

---

## Review log

Round-2 reviews: a verifier (9 must, 1 should, 3 nits) and a hook judge (scores 7 / 5 / 7). Each item, and what was done.

**Verifier**

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 04c | must | The old vo[4] voiced the 2020 Europe value ("≈ $13,900") at 15.4 s, when the tip read ≈ $14,266 and the ledger showed 2022 | Replaced the line with "Europe? Still under $17,000." (15.4-17.8 s), a bound the Europe tip satisfies for the whole line ($14,266 → $16,559) and that sets up the 2025 jump (it crosses $17,000 at 19.09 s, as the riser starts). I did not use the suggested "2022: Europe's back to ≈ $13,700": its figure would be said at ≈ 17.3 s, 2.3 s after the 2022 close, when the tip reads ≈ $16,500 and the ledger shows 2023. The suggested d 3.6 for vo[3] also fails the check's 2.6 words/s (11 spoken words with "U-S-A" = 4.23 s), so vo[3] keeps d 4.3. Beat sheet, guide VO and maths updated |
| V2 | 04b | must | Interest "≈ $6" (the 2014 figure) said and labelled at 12.5 s, when the tip read $1,008 | Moved the 2014 line to 8.2 s (the tip crosses $2,000 at 8.18 s) and the savings line to 12.2 s, worded as a bound: "Savings? Under $10 of interest.", label "under +$10". The tip reads $1,007.76-$1,008.83 while the line and label show, and the sweep's worst case is $9.82. I did not use the suggested "≈ $8 by 2017" line: its figure would be said at ≈ 15.2 s, when the tip reads $1,009, and the sweep showed the mid-race interest itself is only known to ±$1 (it rests on the midpoint years) |
| V3 | 04a | must | "2002: stocks ≈ −38%" is cumulative, but read as 2002's own return (−22.10%) | VO is now "By 2002: stocks ≈ −38%. Gold ≈ +21%." Also new: a flag at the 2002 close carries the same two figures and stays up until the 2008 flag, because the figures are said at 4.4 s and 6.4 s while the tips have moved on to 2003-2004. The check asserts the flag is up when each figure is said |
| V4 | 04a | must | Gold's 2013 fall shown without "≈" | VO "2013: gold drops ≈ 28% in one year." (d 4.3: 11 spoken words = 4.23 s; the suggested 3.9 would fail the read-speed rule), flag "Gold ≈ −28%", maths bullet rewritten |
| V5 | 04a (+ all pinned) | must | Rounded multiples printed bare | Footer steps "$10,000 grew ≈ ×7.53 → ≈ $75,300", "$10,000 grew ≈ ×15.0 → ≈ $150,000", "≈ ×15.0 → ≈ 3.9 doublings · ≈ ×7.53 → ≈ 2.9". Pinned comments: 04a "≈ ×15.0 / ≈ ×7.53" and "≈ ×8.3 / ≈ ×3.9", 04b "≈ ×8.28 / ≈ ×1.02", 04c "≈ ×3.98 vs ≈ ×2.27". The convention is written into the decisions; the check asserts the multiples are roundings |
| V6 | 04c | must | The old "doubled twice" line at ×3.98 (log₂ 1.994) had no "≈" | "The USA ≈ doubled twice. Europe, once." (d 3.5). The old "Twice …" phrase in the 2025 line is gone: that line now gives both numbers ("Europe jumps ≈ 35%. USA, ≈ 18%."), and the hook carries "≈ 2 to 1" |
| V7 | 04b | must | FDIC inputs: Jan 2024 (0.46 vs 0.47), 2021 (a "2021 low", not a January reading), Jan 2010 (0.21 vs 0.22) | 2024: FRED's SNDR table (FDIC data) gives 0.47 for the 2024-01-01 observation, and the verifier's 0.46 is "as of January 31", the next reading, so I kept 0.47 as the January reading. 2021: no January reading exists in what I could reach; SNDR starts 2021-04-01 at 0.06, so 2021 now uses 0.06 and the method reads "the January reading, or the first reading of the year". 2010: unresolved. Then, instead of betting on any one value: the footer range (0.04%–0.47% before) is replaced by the bound "under 0.5%"; the check sweeps 2,916 input tables (all three disputes plus each midpoint year at either neighbour); and the savings displays are now the ones that hold in every table: ≈ $1,020, ≈ $680, ≈ 32%, "under $10". Pinned comment: "the highest January rate since 2010 in our table (0.47%)" |
| V8 | 04b | must | "now" pointed at Dec 2025 CPI in an Oct 2026 video | Peek label "≈ $1,501 in 2025 = $1,000 in 2010"; vo[7] "That ≈ $1,020 buys what ≈ $680 did in 2010." (18 spoken words, d 7.0) |
| V9 | 04b | must | The verdict at 34.4 s hid the caption carrying the buying-power figure | Verdict at 41.5 s, after vo[7] ends (41.4); duration 44.5, hold 19.5. Buzz stays on the peek at 34.4, and a thud lands with the verdict. The check now asserts "verdict after the last VO line" for all three teasers |
| V10 | 04b | must | 1.0047¹⁶ miscomputed in the md (6 cents) | $1,000 × 1.0047¹⁶ = $1,077.91 → ≈ $1,078 (0.47% kept, see V7) |
| V11 | 04c | should | The verdict at 31.4 s hid the last caption | Verdict 35.0 s (vo[7] ends 34.9), duration 38.0, hold 17.0, ding moved to 35.0. formulaSteps[3] stays at 31.4 (it is tied to vo[7] in the check) |
| V12 | 04a | nit | "One extra doubling" (no ≈) | Verdict line 2 is "≈ one extra doubling." (log₂ gap 0.994) |
| V13 | 04a | nit | Static frame 1, md line 23 inaccurate; footer type-floor warning | raceT now starts at −0.4 s (the Scoreboard kit's documented mid-race open), so frame 1 shows both tips under the stake; line 2 of section (a) now says exactly what each teaser does. Footer shortened to "S&P + dividends · gold · year-ends 2000–2025": 0 warnings |
| V14 | 04b | nit | "earned 2.4%" without ≈ | "earned ≈ 2.4% in total" (2.385%) |

**Hook judge**

| # | Teaser | Issue | What I did |
|---|---|---|---|
| H1 | 04b (must, score 5) | Obvious winner; "safe" stated straight; no reason to stay in 0-1.5 s; flat title | Adopted the rewrite in full: header `POV: In 2010 you put **$1,000** in` / `"safe" savings VS the S&P 500` (13 words); first VO at 0.0 "One of these never had a down year. Guess which one lost." (true: the savings balance rises every year; the S&P fell in 2018 and 2022; savings ends at $682.29 of buying power); verdict keeps "of its buying power"; title "$1,000 in Savings vs the S&P 500 Since 2010: Which One Lost Value?". Not adopted: the optional CPI line from frame 1 (needs 14 more sourced CPI values and a reference-line feature the Becker chart-race module lacks; reason under lookOpts) |
| H2 | 04b (should) | "2 people" is lane 7's header grammar | Gone: POV grammar, and the twist is now dollars vs buying power ("never had a down year"), which 07b does not use |
| H3 | 04a (should) | Static frame 1; first VO reads the header; the belief lands at 2.75 s | First VO "26 years. Stocks should crush gold." at 0.0; the header-restating line is cut. The race clock starts at −0.4 s (one step past the suggested 0.0, which would still freeze both tips at exactly $10,000 on frame 1), so frame 1 shows S&P $9,701 and gold $9,823 under the stake line: ChartOrbit's "open in the red". All later beats re-timed (the race is 1.0 s earlier); the check re-run. Caption line 1 is now "The start year picks the winner.", with the finals after the fold |
| H4 | 04c (should) | No wrong answer in the first 3 s; the first VO reads the banner; generic "USA or Europe?" | First VO "2025: Europe beat the USA ≈ 2 to 1. Who won the decade?" (judge's line without "In": 17 spoken words fit before the 2018 line at 6.8 s); "USA or Europe?" folded in; "Europe Won 2025. Who Won the Decade?" is IG/TikTok caption line 1 and the YouTube A/B title. The 2025 line is now the payoff of the setup ("Europe jumps ≈ 35%. USA, ≈ 18%.") |
| H5 | 04a (note) | Caption line 1 gave the reversal away on TikTok | Applied to all three: line 1 is a curiosity line, the verdict follows after the fold |

**Found while revising**

| # | Teaser | Issue | What I did |
|---|---|---|---|
| R1 | 04c | The md claimed ten empty ledger rows visible from frame 1 (R9). The Live Sheet kit renders one ledger row that is replaced each year (contact sheet confirmed) | Corrected the look description, R9 (the fixed axis and the year cell carry the countable loop) and the lookOpts note |
| R2 | all | Mid-race VO figures could drift from the screen; no check caught it | New spoken-number sync check (see the decisions); it caught the 04a 2002 drift (fixed with the flag) and confirms the 04c "≈ 15%" lands at 8.7 s while the 2018 row is up (until 8.99 s) |
| R3 | 04b | The nearest-dollar savings final rested on the unsourced midpoint years (sweep range $1,022.62-$1,024.97) | Savings final shown to 3 significant figures like every other final; real value to 2 (≈ $680) |
| R4 | 04b | The old header wrapped "S&P / 500" onto a third line in the Becker kit | The new 13-word header sets on two lines (contact sheet) |
| R5 | 04a, 04c | Caption chunking can strand "≈" at a chunk end | Kit-level; reported under Caveats and queued as a separate task, not patched in the specs |

**Scores after the revision (my estimate):** 04a 8 (the judge's rewrite plus a frame 1 in the red), 04b 7 (the full rewrite, without the optional CPI line), 04c 8 (the judge's rewrite; the stranded "≈" in its captions is the open risk).

**Hook pass (2026-10-07): 04b**

Two judges scored four rewrites of the 04b hook against the current one, using the hook bank (/research/v2/02-hook-bank.md). Rule: a candidate either judge marks dishonest is out. A candidate is adopted only if its average is at least 7.5 and at least 0.75 above the current hook's.

| Key | Lever | Judge 1 | Judge 2 | Average | Result |
|---|---|---|---|---|---|
| current | "never had a down year, guess which one lost" riddle | 6 | 5 | 5.5 | kept |
| A | open underwater: race moving from frame 1, a red 2025-prices tide over both figures, "Can 'safe' savings get above water?" | 6 | 6.5 | 6.25 | below 7.5 |
| B | "Guess the interest by 2025", year 1 ≈ +$2 at 1.09 s | 5 | 4.5 (not honest) | out | "Under $25 in 16 years" is 3 cents above the sweep max, and the January-rate model understates 2022-2023 |
| C | verdict first: "Still lost ≈ 32%" at 2.7 s | 4 | 6 | 5.0 | gives the result away (R2) |
| D | "you lent your bank $1,000" | 6.5 | 5.5 (not honest) | out | "under $1 a year for nine years" includes 2022, which the January-rate model understates by about a dollar |

**Adopted: nothing.** Header, VO, beats, title, caption and timings are unchanged. A, the best candidate, averaged 6.25 and missed the 7.5 bar. I kept the title too: neither judge preferred another title, and the current one carries the open loop ("Which One Lost Value?") without giving away the verdict.

Notes for any later pass on this teaser:

- **Agreed weakness of the current hook.** Frame 1 is static for 1.0 s, there is no spoken figure until 8.2 s (R10), and the quotes around "safe" half-answer the riddle.
- **A's frame-1 device was the judges' favourite part.** That is raceT −0.4 (the race already moving) plus the tide from frame 1. Its yes/no question is answered by the frame itself, though, and "above water" in 2013 is measured against 2025 prices. It would need "covers 2025 prices" wording.
- **Open data caveat.** The same January-rate caveat lowers the base savings final to about $1,025.85 if 2022-2023 are corrected. That is still under 0.5% a year and still ≈ 32% lost. But "≈ $1,020" sits close to the 3-significant-figure boundary. Re-check it if the mid-year rates are sourced.

**Hook pass 2 (2026-10-07): 04b**

Two judges scored five new rewrites of the 04b hook against the current one (the round-2 riddle header `POV: In 2010 you put **$1,000** in` / `"safe" savings VS the S&P 500`), using the hook bank (/research/v2/02-hook-bank.md). Round-2 rule: average the two judges per candidate; a candidate either judge marks dishonest is out; adopt the best candidate if its average is at least 1.0 above the current hook's (no 7.5 floor this round).

| Key | Lever | Judge 1 | Judge 2 | Average | Δ vs current | Result |
|---|---|---|---|---|---|---|
| current | "which one lost?" riddle; frame 1 static for 1.0 s | 5 | 5 | 5.0 | — | replaced |
| R1 | open underwater: race moving from frame 1, a red 2025-prices tide over both figures, "Can 'safe' savings get above water?" | 6.5 | 6.5 | 6.5 | +1.5 | runner-up |
| A | "Grandma put $1,000 in savings for you", year 1 ≈ +$2 at 1.09 s | 6 | 6 | 6.0 | +1.0 | — |
| B | savings vs a mattress (dotted stake line), "≈ 33% vs ≈ 32%" verdict | 5 | 5.5 | 5.25 | +0.25 | — |
| C | "count the doublings": 3 vs 0, savings doubles after the year 2300 | 5 | 5 | 5.0 | 0 | — |
| **D** | **handicap duel: "Your $1,000: 16 years of savings VS 1 year of the S&P 500"** | **6.5** | **7** | **6.75** | **+1.75** | **adopted** |

All six were marked honest by both judges. Both recomputed D's maths and found it holds: $1,000 × 15.06% = $150.60 → ≈ $151; 16 years of interest $23.85 (sweep $22.62-$24.97, about $27 with the 2022-2023 understatement) → under $30; "under $10 so far" $7.76-$8.79 (sweep max $9.76 over the line). 2010 is not cherry-picked: it sits next to the 16-year CAGR (14.13%), and 2013 (+32.39%) was the best year.

**Why D.**
- It has the clearest R5 attack in the set: the header itself is the wrong belief ("interest adds up over time") and the open loop. It uses HD Guy H07's lopsided duel of mismatched units (11.96M).
- "Your $1,000" is on screen at 0.0 s and the race is already moving.
- The first payoff ("year 1: ≈ +$151") is on screen at 1.09 s and spoken at 2.69 s (R10).
- The goal note against the crawling counter is a gap you can see (R9).
- The verdict is lopsided and repeatable (R12).

Judge 2: viewers on today's 4% high-yield accounts really hold the belief, which should also drive comments.

**Adopted (spec, write-up, check):**
1. Header `Your **$1,000**: 16 years of savings` / `VS 1 year of the S&P 500` (13 words, 2 lines in the kit). The title is now "Can 16 Years in a Savings Account Beat 1 Year in the S&P 500?", with the A/B title "16 Years of Savings Interest vs 1 Year of the S&P 500".
2. The race clock is [−0.4, 23.6] (was [1.0, 25.0]), so frame 1 shows S&P $1,041 vs savings $1,001 already moving.
3. VO, 7 lines:
   - "Year one in the S&P: ≈ $151." (0.0, d 4.7)
   - "Savings gets 16 years to match it." (4.8, d 2.9)
   - "Savings? Under $10 so far." (10.8, d 2.5)
   - "2022: stocks drop ≈ 18%." (19.1)
   - "2025: savings made under $30 in 16 years." (23.6, d 4.4)
   - "The S&P's first year alone: ≈ $151." (28.1, d 4.8)
   - "It ended at ≈ $8,280." (33.0, d 4.0)
   
   Every line fits 2.6 spoken words/s. Lines do not overlap. The verdict at 37.1 s comes after the last line ends (37.0). Duration 40.1 s (was 44.5), hold 16.5.
4. Beats:
   - cheer 1.09 s (the 2010 close, note "year 1: ≈ +$151");
   - think 4.8 s, d 18.8 (note "goal: ≈ +$151" held to the race end);
   - impact 19.1;
   - grow 23.6;
   - shrug 23.6 ("under +$30");
   - point 28.1, d 4.8 ("year 1: ≈ +$151").
   
   The sfx are pop 1.09, swipe 4.8, hit 19.1, roll 23.6, boing 23.7 and thud 37.1. The flood/peek tide beats, whoosh, buzz and the two prices lines are gone. The buying-power fact (≈ $680, ≈ 32% lost) moved to the pinned comment.
5. **Honesty fix from judge 2 (applied on top of D).** D's verdict line "1 year of the S&P 500: ≈ $151" reads as any year, and in 4 of the 16 years (2011 $21.10, 2015 $13.80, 2018 and 2022 negative) one S&P year made less than 16 years of savings. The verdict now names the year: "16 years of savings: under **$30**. / The S&P 500 in 2010 alone: ≈ $151." The pinned comment names the four weaker years, and the check asserts them against the sweep's lowest 16-year interest ($22.62).
6. The gag note is rewritten (no tide).
7. Caption line 1 is "Can 16 years of savings beat 1 year of stocks?".
8. Check changes:
   - `spoken()` counts "S&P's" as 3 words (it counted 1);
   - new claims: frame-1 tips, year-1 note timing and sync, goal-note window, the "$30" and second "≈ $151" sync, "16 years to match it" fails in every table, "under $30" holds with the +$2 understatement, 2010 within 1 point of the CAGR and not the best year, the four weaker years, and the verdict naming 2010;
   - a 04b-section stale-text check.
   
   Result: 445 checks, 0 failed.

**Verified:**
- `node src/cli.mjs check specs/04b-becker-rig-savings-vs-sp500.json` gives 0 errors and 0 warnings.
- Stills at 0, 1.5 and 3 s: frame 1 shows the 2-line header, "$1,000" in accent, tips $1,041 / $1,001, year 2010 and the stake legend. At 1.5 s: "year 1: ≈ +$151" under the green counter, with the caption "Year one in the S&P: ≈ $151.". At 3 s: S&P $1,227 vs savings $1,004.
- Later stills: 5.5 s (goal note under the grey counter), 12 s ("Under $10 so far", savings $1,008), 24.8 s (shrug and "under +$30" beside the gold "≈ $8,280") and 38.5 s (the verdict names 2010) all read cleanly.

**Not fixed (the judges' notes):**
- The header carries three numbers ($1,000, 16, 1), where R2 asks for one input.
- The first figure is the rival's gain, not the viewer's balance.
- The race still draws 15 more S&P years that the "1 year" frame does not use.
- The crawl gives the answer away by about 10 s.
- The buying-power twist is off screen.

R1's frame-1 tide (6.5) is the fallback if the duel underperforms.

### Assembly pass (round 2, 04a and 04c)

Both specs linted clean before this pass. The stills showed three problems the linter can't see.

**Fixed:**
1. **04c: the chart ran ahead of the ledger.** The Live Sheet kit's default `preroll` opened the race 0.6 years in and swept 2016.6 → 2025.99 over raceT, so every close landed early. At 3.1 s the ledger's 2016 row (Europe −0.40%) sat beside a Europe tip of $11,473, and frame 1 showed $10,724 / $9,976 instead of the stake. The spec now sets `lookOpts.preroll: 0` (documented in the kit's format header). The race sweeps 2016.0 → 2025.99 over 1.0 → 21.0 s, the clock the check has always used: at 3.1 s the tips read $11,340 / $10,110 beside the 2016 row.
2. **04a: gold's final took the hero 4.4 s early.** The Scoreboard hero showed "GOLD ≈ $150,000" from 32.05 s, so the giant number contradicted the VO line "End of 2025: stocks ≈ $75,300", and the payoff line at 36.4 s had no visual beat. The kit's chart-race format now reads an optional `lookOpts.finalT`: the hero lands "S&P 500 ≈ $75,300" at the race end and hard-cuts to "GOLD ≈ $150,000" at 36.4 s, with the climax (riser, hit + cash, bump, flares). The spec's own cash cue at 36.4 s was dropped.
3. **04a: stale flags.** "Gold ≈ −28%" held 11 s (over "2021: still behind"), and "2022 bear market" held to the end of the video. With the new `flagHold: 5.0`, each flag clears after 5 s, and every flag clears as the finals land.
4. **04c: the payoff lines had no beat.** The finals swap in at 21.0 s, and nothing changed when the VO named them at 24.6 and 28.6 s. With `lookOpts.finalT` (new in the Live Sheet format), each final cell lands again as it is named: re-pop, flash and pop.
5. **04c polish.** The formula bar's first step has an author line break ("= $10,000" / "× (1 + each year's return)"), so the kit no longer breaks it as "(1" / "+ each…". The footer drops the index names, which the header cells already show, and goes from three lines to two: "Total return in US$ (MSCI Europe net)" / "Jan 2016 → Dec 2025 · no fees or tax". The chart gains about 50 px.

**Check:** `flag_window` honours `flagHold`. There are new claims for 04a's `finalT` (race end, then vo[7]; the winner revealed last) and `flagHold`, and for 04c's `preroll: 0` and `finalT` (vo[5], vo[6]). The 04a sfx list drops the cash cue, and formula step 0 carries its line break. Result: 451 checks, 0 failed.

**Verified:**
- `node src/cli.mjs check` gives 0 errors and 0 warnings for both specs, and for the chart-race samples of both kits.
- I read the stills against the VO times: 04a at 0, 3.4, 8.5, 10.8, 17, 22.5, 27, 31.7, 32.2, 34, 36.45, 36.6, 39.5, 43 and the end; 04c at 0, 1.6, 3.1, 7.1, 11.1, 15.5, 19.5, 21.6, 24.75, 28.75, 32, 35.6 and the end.
- I rendered both MP4s (04a 45.5 s, 04c 38.0 s). Frames I pulled from the MP4s at 0 / 36.6 / 43 s (04a) and 0 / 3.1 / 35.6 s (04c) match the stills, with a mean pixel difference of 0.8-1.6 (compression).

### Fixer pass (QA round 2, 04a and 04c)

QA scored 04a 6/10 and 04c 4.5/10. The numbers were right; the problems were design, sync and climax. Every must and should item is addressed below.

**04a (Scoreboard), in the spec and `looks/scoreboard/formats/chart-race.js`:**
1. **Tip labels sat on the lines** (must). `tipLane: true`: the labels stack name over value, and the lines end short of the plot's right edge, so both labels sit beside their own dots at the finish. Gold's 2025 spike is no longer hidden through the verdict.
2. **The payoff came before the climax** (must). `holdBack`: gold stops at its 2024 close ($91,094 on its label) while the S&P finishes and takes the hero. Gold draws its +64.57% leg over 34.4-36.4 s under the riser, and its final, the hero slam and "Gold ≈ $150,000" land together at 36.4 s.
3. **Stale red flag over 2025** (should). `flagHold: 3.0`, and each dashed rule fades with its flag: "2022 bear market" clears at 30.3 s, before gold's leg.
4. **The 2002 beat ran behind the race** (should). VO line 1 is now "Stocks should crush gold." (1.6 s), and line 2 starts at 1.76 s: "≈ −38%" is said at 3.68 s, 0.4 s after the 2002 close, while its flag shows.
5. **The verdict's "≈ 2×" was in S&P green** (should). `emColor: "yellow"` colours the emphasis and the accent rule gold. The second line now reads "That's ≈ one extra doubling."
6. **The doublings beat had no focal point** (should). The footer step names the racers in their colours ("Gold ≈ 3.9 doublings · S&P 500 ≈ 2.9"), and `rungs` puts ×2 / ×4 / ×8 / ×16 on the plot at 39.3 s.
7. **The caption broke "≈ 4 / times"** (should). "≈ 4 times" is bound with no-break spaces.
8. **Nits.** The year clock is at 34% white. The year lines start about 0.3 s before their closes (2013 at 16.5 s, 2021 at 26.3 s). The flag emphasis is upright, not italic. Frame 1 stacks the labels by value (gold on top). Hidden grid lines now park (a purity fix).

**04c (Live Sheet), in the spec and `looks/live-sheet/formats/chart-race.js`:** a new sheet-race mode (`lookOpts.valueRow`). It is opt-in, so the kit's samples and stress specs render as before.
1. **The chart was a thumbnail** (must). The values moved out of the 270 px lane beside the plot into a value row in the sheet. The chart takes the card's full width, and the formula bar and footer are one line each. The plot grew from about 480 × 320 px to about 766 × 394 px. It is still short of QA's 560 px height target: the formula bar, header, ledger and value rows (about 330 px) stay.
2. **Frame 1 had no claim** (must). It opens on the hook row: "2025 · +17.88% · +35.41%" at 72 px, Europe's cell yellow under the selection, and the pill "2016 → 2025: who won?" over the parked race. The rule "= last year × (1 + return)" is fully typed. At 4.8 s the row's year counts back to 2016 and the race starts, as the VO asks "Who won the decade?". The lines are parked, not moving, for those 4.8 s: the hook row is the frame's focus.
3. **The payoff was not the climax** (must). At "Final:" (23.25 s) the header and rows give way to one hero row per rival (name, its 2025 return, and its value at 94 px). Each value rolls like an odometer from its 2024 close and lands as the VO says it (24.79 s, 27.6 s), with the selection on the cell being named.
4. **A static back half** (should). Every post-race beat now changes the sheet: the 2025 row, the hero rows, two odometer landings, the ×4 rung with the doublings working, and the verdict. The video is 36.5 s, down from 38.0 s.
5. **A stale formula bar** (should). The bar shows the selected cell's working, retyped at each close ("= $12,501 × (1 − 14.86%)"). The two steps whose dollar-rounded inputs miss the shown value by $1 start with "≈".
6. **Pills covered the year labels** (should). They sit in a strip at the top of the plot, and their rules fade with them.
7. **The doublings VO and the screen disagreed** (should). The bar types "≈ ×3.98 ≈ 2 doublings", then "≈ ×2.27 ≈ 1 doubling", and ×2 / ×4 rungs sit on the chart.
8. **The 2018 beat lagged** (should). "≈ 15%" is said at 9.89 s, the 2018 close, and that row stays up until 11.59 s.
9. **The values ran ahead of the ledger** (should). The value row steps with the ledger row (both name the same year). At the 2020 close the USA's $20,305 flashes yellow as the ×2 rung wipes in.
10. **Nits.** The verdict card spans the sheet (x 60-960). Even year ticks: 2016 to 2024.

**Check:** the 04c section is rewritten for the new spec. New claims cover the hook row, the value row's step model (both bound-sync lines), the 15 formula steps (text, time, the selected cell, and the $1 rounding rule), the rungs, the finale times against the spoken finals, and the one-line footer. Result: 566 checks, 0 failed.

**Verified:**
- `check` gives 0 errors and 0 warnings for both specs, and for the chart-race samples and stress specs of both kits.
- A purity probe (seek t, seek elsewhere, seek t again) is clean for 04c. 04a still differs in two invisible attributes set by the Scoreboard's shared lib.js (`data-under` on the hero odometer, `data-on` on a hidden caption page); I did not change them, and I reported them.
- I read the stills and contact sheets against the VO times.
- The MP4s are 45.5 s (04a) and 36.5 s (04c). Frames pulled from them match the stills, with a mean pixel difference of 0.7-1.5.

### Assembly pass (round 2, 04b)

04b linted clean before this pass, and its numbers were right. The stills showed six problems the linter can't see. The format fixes are in `looks/becker-rig/formats/chart-race.js` (new lookOpts are opt-in, and the kit's two chart-race samples still lint with 0 errors and 0 warnings).

**Fixed:**
1. **The hero stood on the savings figure's head for most of the race.** The two tips are less than a figure's height apart until about 2017, so from about 6 s to 23 s the green figure's feet sat on the grey figure's head, and the grey figure faded out entirely around 6.5-7.5 s (the kit's "never stack" fallback). He even ghosted during the 1.5-2.0 s cheer, the first payoff. The trailing rule now treats tips closer than about 1.45 figure heights as "sharing a height" (it was 0.95, too tight to clear a body). A new `lookOpts.figures[].lag` sets how far a figure trails (170 px here; the default stays 130). A new `outline` gives him a thin halo, so the green line passes behind him rather than through his head. He walks the flat savings line a step behind the hero the whole race and steps onto his ledge at the finish.
2. **The hero's arm crossed the tag column** (into "S&P 500" and its counter at about 13, 15, 17, 22 and 23 s) on steep climbs. A hand now stops 12 px short of the column, and IK re-bends the elbow.
3. **The payoff had no picture, and the last 14 s were static.** At the final axis ($5K steps), $150.60 and $23.85 are a few pixels each, so the hook's answer was only text, and from 26 s to 40 s almost nothing moved but the captions (one point at 28.1 s). A new `lookOpts.lens` draws a card into the empty top-left of the finished plot with both gains to scale, built from the series' own points: "16 years of savings" (a grey stub, "under +$30", 26.2 s, as the shrug note ends) and "S&P 500 in 2010" (a full-width green bar, "≈ +$151", 28.1 s; whoosh, then a pop as the value lands at 29.01 s). The hero points back at the card (`pointBack`, a new act), then at his gold plate as "It ended at ≈ $8,280" is read (33.0 s), and hops as the verdict lands (37.1 s). The old 28.1 s "year 1" note under his counter is gone, because the card carries the figure. The savings stub sits on a light track the length of the S&P bar, so it reads as the ≈ +$151 goal he carried all race, about 1/6 filled.
4. **The verdict coloured the savings figure's number green.** Green is the S&P's colour all video, so "under **$30**" read as the S&P's number. The emphasis and swoosh moved to "**≈ $151**". The wording is unchanged.
5. **"≈ −18%" sat under a 2024 counter.** When "≈ 18%" is said (21.02 s), the counter has moved on to 2024 at $6,016. The label is now "2022: ≈ −18%".
6. **Polish.** At frame 1 the pale hill under the hero line was an 80 px green box at the start line; it now fades in as the line gains width. During the axis family switch at the race end (23.6-24 s), "$4K" and "$5K" were drawn on top of each other; the old family now fades out before the new one comes in.

**Check:** the beat list has the new label, `pointBack`, `point` and `cheer`, and every unlabelled beat is checked to carry no label. The `figures` entry is checked as well. The lens has 14 claims: its time (the shrug note's end), each row's series and range, labels and display strings, both bar gains against the model ($23.85 under $30; $150.60 → ≈ $151), the to-scale ratio (0.158), and the sync of "≈ $151" (said at 30.79 s while the lens' S&P row shows, from 29.01 s). The verdict, the sfx list and the Instagram cover note (now the 29.5 s lens frame) are updated too. Result: 591 checks, 0 failed.

**Verified:**
- `check` gives 0 errors and 0 warnings for 04b, and for `looks/becker-rig/samples/chart-race.json` and `chart-race-2.json`. I read both samples' contact sheets: no regression.
- A purity probe (29.5 s and 12.3 s rendered directly, and again after seeking 39, 5, 26.4 and 1.2 s) is pixel-identical.
- I read stills at 0, 1.2, 3, 4.9, 7.1, 11, 13.4, 14.9, 19.3, 21.02, 23.7, 24.5, 25.91, 26.7, 28.6, 29.1, 30.79, 33.5, 37.3 and 40.07 s against the VO times. Every tip counter matches the race clock: $1,041 / $1,001 at 0 s, $1,152 / $1,002 at 1.2 s, $1,227 / $1,004 at 3 s, $1,602 / $1,005 at 4.9 s, $2,051 / $1,006 at 7.1 s, $2,636 / $1,008 at 11 s, $2,887 / $1,009 at 13.4 s, $3,700 / $1,010 at 14.9 s, $4,609 / $1,012 at 19.3 s and $6,016 / $1,016 at 21.02 s, then the finals ≈ $8,280 / ≈ $1,020.
- The MP4 is 40.1 s, 1080 × 1920 at 30 fps with 15 SFX cues. Frames pulled from it at 0, 19.3, 29.1 and 40 s match the stills, with a mean pixel difference of 1.1-1.3 (compression).

**Not changed:** the VO leaves two quiet stretches mid-race (7.7-10.8 s and 13.3-19.1 s). The race moves through both (counters, the 2014 doubling, the COVID flag, the axis pull-back), so neither is dead air on screen. A recorded VO may still want a line near 15 s.

### Fixer pass (QA round 2, 04b)

QA scored 04b 6/10: the numbers were right, but the hook's answer was not the climax, the end stalled for 11 s, the race had a 5.8 s VO gap, the year-1 figure could not be checked on screen, and the crash band read as a glitch. Every must and should item and the nits are addressed below. The format changes are in `looks/becker-rig/formats/chart-race.js`; the new lookOpts are opt-in, and the kit's two chart-race samples still lint with 0 errors and 0 warnings (no regression on their contact sheet).

**Fixed:**
1. **The payoff was not the climax** (must). The lens card is now the biggest thing on screen. It drops in over the stake legend (the legend and the year fade), each row stacks its label (44 px), its value (64 px; "≈ +$151" at 72) and a thin 36 px bar, and every bar runs over a dashed track the length of the S&P bar: the grey stub (63 px) now reads as a bar against the goal it never reached, and "under +$30" sits above its stub, never inside a full-length grey track. The gold plate steps back to ink on soft at 0.88 while the card is up, and "≈ +$151" lands with a card punch and a shake. The hero points back *up* at the card.
2. **The ending stalled** (should). The "It ended at ≈ $8,280." line is gone (the final stays on the plate and in the description). The verdict lands at 32.7 s, 3.84 s after the payoff, and takes a side instead of restating the card: "The S&P 500's **2010 alone** / beat 16 years of savings." The video is 36.0 s (was 40.1).
3. **The mid-race VO gaps** (should). "Stocks have already doubled." (7.5 s; the hero cheers and his counter pops as "doubled" is said) and "2020: stocks top $4,000." (14.35 s; he pumps a fist, his counter pops, the grey figure gapes as "$4,000" is said at 16.27 s, tip $4,364). The longest gap is now 1.65 s (17.45-19.1 s). A savings line ("2020: savings hits $10") was tried and rejected: whether interest first passes $10 in 2019, 2020 or 2021 depends on the uncertain FDIC midpoint years.
4. **The year-1 figure could not be checked** (should). A hit-stop (`lookOpts.hitStop`) freezes the race on the 2010 close from 1.09 to 2.95 s: the counter reads $1,151 and the year 2010 while "≈ $151" is said (2.69 s). The race then sprints to catch up (peak 2.06×) and rejoins the linear clock at 6.6 s, before any year-synced line or flag.
5. **The crash band** (should). It frames the fall itself: at least 40 px wide, from the line's local high + 20 px to just under its low, and it fades as its HUD chip snaps out (21.56 s) and with the lens.
6. **No focal point at 10.8 s** (should). The grey figure peeks at his counter and the counter pops (tick). No extra note: the goal note stays up.
7. **The cramped plot** (should). The footer is one line, "Savings: FDIC avg · S&P w/ dividends"; the "under 0.5%" bound and the 2010-2025 window moved to the description. The HUD row and the plot's top move up by the freed line.
8. **Nits.** The COVID flag is gone, and the bear-market chip reads "Bear market" (the impact note carries "2022: ≈ −18%"). The green fill covers only the gap between the two lines (`fill: "gap"`). Gridlines under the card fade with their labels. At frame 1 both figures stand on their own lines (a race that opens mid-way rolls out fast enough), every axis label is fully in or out, and a hand stays 24 px clear of the tag column. On-screen gains always carry their sign. The goal note is ink at up to 44 px over a dashed rule (an outlined chip did not fit the 232 px tag column even at 40 px).

**Check:** the 04b section models the hit-stop (the warp, its hold values, C1 and monotone catch-up, linear again before any synced beat), the two new VO lines (bounds held on the S&P tip for the whole line, the doubling year, the $4,000 crossing year), the one-line footer, the new beats with their `pulse`/`chip` flags, `fill`, the side-taking verdict, the 4 s payoff-to-verdict bound, that no VO line restates the final, and the new sfx list. Result: 637 checks, 0 failed.

**Verified:**
- `check` gives 0 errors and 0 warnings for 04b and for both kit samples.
- I read the contact sheet and stills at 0, 0.3, 2.69, 4.0, 8.7, 8.8, 9.5, 10.95, 16.35, 16.45, 18.7, 19.3, 20.5, 23.9, 26.0, 26.35, 26.75, 28.5, 29.45, 32.9 and 35.97 s against the VO times.
- Purity: 12.3 s and 29.5 s are pixel-identical whatever was rendered before. A 2.0 s frame rendered after a frame where the grey figure sits (24.65 s on) differs by sub-pixel seam shading on that figure only; the DOM is set the same way, so this looks like Chrome's clip-path caching for the figure's halo in lib.js (reported, not changed). Forward renders (the MP4, contact sheets, the linter) are unaffected.
- The MP4 is 36.0 s, 1080 × 1920 at 30 fps with 18 SFX cues. Frames pulled from it at 0, 2.0, 16.3, 28.9 and 35.9 s match the stills, with a mean pixel difference of 1.07-1.22 (compression).

