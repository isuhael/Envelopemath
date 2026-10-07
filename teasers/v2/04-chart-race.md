# Format 4: same-stake line-chart race (chart-race, hook pattern P4)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 4 of 10, round 2
**Deliverables:**
- Specs (all three pass the studio linter, `node src/cli.mjs check`: 0 errors; the only warning is 04a's one-line footer at 36.2 px, under the 40 px "should" line but above the 34 px floor):
  - [`studio/specs/04a-scoreboard-sp500-vs-gold.json`](../../studio/specs/04a-scoreboard-sp500-vs-gold.json)
  - [`studio/specs/04b-becker-rig-savings-vs-sp500.json`](../../studio/specs/04b-becker-rig-savings-vs-sp500.json)
  - [`studio/specs/04c-live-sheet-usa-vs-europe.json`](../../studio/specs/04c-live-sheet-usa-vs-europe.json)
- Check: [`teasers/v2/checks/04-chart-race.py`](checks/04-chart-race.py). It recomputes every series from the sourced annual returns and passes **353 checks with 0 failures**.
- Mutation test: the check caught **8 of 8** deliberately broken spec copies: a wrong final, a missing "≈" in the VO, an off-beat VO line, VO read too fast, a wrong ledger cell, an unchecked string containing a digit, a wrong chart point, and a header over 15 words.

**Evidence base:**
- The benchmark only: [`research/v2/02-hook-bank.md`](../../research/v2/02-hook-bank.md) (P4, R1-R12), [`research/v2/04-formats.md`](../../research/v2/04-formats.md) (rank 4), and the watch studies [`chartorbit.md`](../../research/v2/watch/chartorbit.md) and [`jake-jacobdoesmoney.md`](../../research/v2/watch/jake-jacobdoesmoney.md).
- Looks: [`03-look-directions.md`](../../research/v2/03-look-directions.md) (Scoreboard, Live Sheet) and [`watch/alan-becker.md`](../../research/v2/watch/alan-becker.md) sections 3, 4 and 6 (Becker rig).

---

## (a) The format in 5 lines

1. **Mechanic.** The same round stake goes into 2 named rivals on the same date. One continuous line chart races year by year, with a live counter at each line tip, a big year counter, crash flags and 0 cuts, and it ends dead on the verified final values.
2. **Hook.** The title asks ("What If You Invested $5,000 in A and B?"). The frame-1 header says you already did it ("POV: In [year] you invested $[stake] in A VS B"). The stake is the only accent colour, and the chart is already moving at 0.0 s, often below the stake.
3. **Pace.** About 2-2.7 s per year in the benchmark (61 s). Ours run 1.2-2.0 s per year, 36.5-46.5 s, to stay inside this round's 25-50 s lane. The biggest number lands last, then the verdict.
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

- **The race ends at the Dec 31, 2025 close (the last full calendar year), not at today.** Two-source verification of 2026 year-to-date figures was not possible inside the 14-search budget:
  - One source gives a gold close of $4,175.81 on Sep 30, 2026 (pricegold.net).
  - No search returned a sourced S&P 500 total return year to date.

  The footers and stakes name the window. All three races start at the Dec 31 close of the year before ("Jan 2000", "Jan 2010", "Jan 2016").
- **Real yearly data points only.** Each series is the stake × (1 + that year's sourced return), compounded. A Dec-31 close sits at x = year + 0.99 (the same convention as 06a/06c), so a year counter that floors x reads the right year.
- **Every rounded figure carries "≈":**
  - Finals are given to 3 significant figures, except the savings balance (nearest dollar, so the interest stays visible).
  - VO text uses "≈" too, because captions show it. The owner reads "≈" as "about".
- **Rule-of-thumb line (the format's "envelope twist" from 04-formats).** Each teaser converts its ending into doublings, or into "% a year", so the result is a number you can carry.
- **Swap-in for R3.** The multiple (×15.0, ×7.53, ×8.28, ×3.98, ×2.27) is printed in the footer or formula bar, so viewers can multiply their own amount. The pinned comments say so.
- **No logos, no licensed music.**
  - Names are in text; the Live Sheet race can show flags (not brand marks).
  - ChartOrbit's ABBA track is replaced by kit SFX (licensing for us is unknown).
- **Kits.** The chart-race module is still a stub in all three looks. Each spec carries optional `lookOpts` (documented per teaser below), so the kit builder knows the intended staging. A kit must render sensibly without them.

---

## (b) The teasers

### 04a · Scoreboard · "POV: In 2000 you put $10,000 in the S&P 500 VS gold"

- **Look:** Scoreboard (black bars, stage `#0E1116`, money green `#2BFF88` for the S&P 500, second-contender yellow `#FFD23F` for gold, Anton header, footer working line).
- **Platform title:** "What If You Invested $10,000 in the S&P 500 and GOLD in 2000?" (A/B: "$10,000 in 2000: Stocks or Gold?")
- **On-screen hook (header, 12 words):** `POV: In 2000 you put **$10,000** in` / `the S&P 500 VS gold`
- **Hook rules it satisfies:**
  - **R1:** "$10,000" and two tip counters at $10,000 are on screen at 0.0 s.
  - **R2:** one input, no result.
  - **R4:** a round, familiar stake.
  - **R5:** the chart reverses the expected win. The VO's second line, "Stocks should win this.", names the belief without "most people".
  - **R6:** you + $10,000 + 2000.
  - **R7:** both options are named.
  - **R8:** 12 words.
  - **R9:** a fixed 2000-2025 x-axis, so the remaining years are countable.
  - **R10:** both counters fall below the stake by 1.8 s ($9,090 / $9,460), and the first spoken payoff comes at 4.4 s.
  - **R11:** the title asks, the screen says "you did it", the caption gives the verdict.
  - **R12:** a lopsided verdict, "≈ 2×".
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US] VS [EU]" (2,808,307 views, 345.09x).
  - ChartOrbit H16, "POV: In 2002 You invested $5000 in NETFLIX VS Disney" (15,876,376, 100.45x); its title grammar, "What If You Invested $5,000 in NETFLIX and DISNEY?", is the platform title.
  - @investment_timeline's GoPro post H43 (5.1M, 22.6x), the benchmark's proof that a chart which reverses the expected winner still travels.
- **Wrong belief it exploits:** "Over the long run, stocks always beat gold. Gold is a pet rock." From Jan 2000, gold was ahead of the S&P 500 at **all 26 year-ends** (the check asserts this) and ended at about twice the money.

**Beat sheet** (race: x 2000.0 → 2025.99 over t 0.6 → 32.6 s, 1.23 s per year)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Both tip counters "$10,000". Big year "2000". Fixed x-axis 2000-2025. Dashed stake line at $10,000. Footer "S&P 500 with dividends · gold at year-end · 2000–2025" | "Same $10,000. January 2000." |
| 0.6-3.1 | The race starts. The 2000 close lands at 1.82 s: S&P $9,090, gold $9,460, both under the stake. "Dot-com crash" flag at 1.83 s | "Stocks should win this." (2.75) |
| 4.28 | 2002 close: S&P $6,239 vs gold $12,089. Thud | "2002: stocks ≈ −38%. Gold ≈ +21%." (4.4) |
| 11.37-11.67 | "2008 crash" flag. 2008 close: S&P $7,187 vs gold $30,567. Thud | "2008: stocks crash again. Gold keeps climbing." (11.6) |
| 16.97-17.83 | "Gold −28%" flag. Gold falls $58,204 → $41,907. Hit | "2013: gold drops 28% in one year." (17.8) |
| 17.8-27.7 | The S&P climbs from $16,398 (2013) to $49,395 (2021); gold reaches $63,518 | "Then stocks run for years and close in." (22.0) · "2021: still behind." (27.7) |
| 28.30 | "2022 bear market" flag | — |
| 32.6 | Race ends. S&P tip pinned to "≈ $75,300". Roll. Footer step "$10,000 × 7.53 ≈ $75,300" | "End of 2025: stocks ≈ $75,300." |
| 37.4 | Gold tip pinned to "≈ $150,000". Cash. Footer step "$10,000 × 15.0 ≈ $150,000" | "Gold ≈ $150,000." |
| 40.3 | Footer step "×15.0 ≈ 3.9 doublings · ×7.53 ≈ 2.9" | "Gold doubled ≈ 4 times. Stocks, ≈ 3." |
| 43.5-46.5 | Verdict slams into the label stack: "Gold ended **≈ 2×** the S&P 500. / One extra doubling." Ding. Hold, then hard cut to frame 1 (loop) | — |

The verdict lands after the last caption clears; the Scoreboard chrome would otherwise overlap the two (a linter error the 06a/02b specs still show).

**Guide VO script (as read, 10 lines):**
> Same ten thousand dollars. January 2000.
> Stocks should win this.
> 2002: stocks, about minus thirty-eight percent. Gold, about plus twenty-one percent.
> 2008: stocks crash again. Gold keeps climbing.
> 2013: gold drops twenty-eight percent in one year.
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
  | start (Dec 31, 1999 close) | 0.60 | $10,000.00 | $10,000.00 |
  | 2000 | 1.82 | $9,090.00 | $9,460.00 |
  | 2001 | 3.05 | $8,009.20 | $9,687.04 |
  | 2002 | 4.28 | $6,239.17 | $12,089.43 |
  | 2003 | 5.51 | $8,028.56 | $14,446.86 |
  | 2004 | 6.74 | $8,902.07 | $15,226.99 |
  | 2005 | 7.98 | $9,339.16 | $17,891.72 |
  | 2006 | 9.21 | $10,813.81 | $22,096.27 |
  | 2007 | 10.44 | $11,407.49 | $28,946.12 |
  | 2008 | 11.67 | $7,186.72 | $30,567.10 |
  | 2009 | 12.90 | $9,088.32 | $38,086.61 |
  | 2010 | 14.13 | $10,457.02 | $49,360.24 |
  | 2011 | 15.36 | $10,677.67 | $54,345.63 |
  | 2012 | 16.59 | $12,386.10 | $58,204.17 |
  | 2013 | 17.83 | $16,397.95 | $41,907.00 |
  | 2014 | 19.06 | $18,642.83 | $41,152.67 |
  | 2015 | 20.29 | $18,900.10 | $36,872.80 |
  | 2016 | 21.52 | $21,160.55 | $39,970.11 |
  | 2017 | 22.75 | $25,779.90 | $45,246.16 |
  | 2018 | 23.98 | $24,650.74 | $44,522.23 |
  | 2019 | 25.21 | $32,413.26 | $52,669.79 |
  | 2020 | 26.44 | $38,377.30 | $65,889.91 |
  | 2021 | 27.68 | $49,395.43 | $63,517.87 |
  | 2022 | 28.91 | $40,449.91 | $63,263.80 |
  | 2023 | 30.14 | $51,084.20 | $71,614.62 |
  | 2024 | 31.37 | $63,865.46 | $91,093.80 |
  | 2025 | 32.60 | $75,284.61 | $149,915.35 |

- **"≈ −38%":** 1 − $6,239.17 ÷ $10,000 = 37.6%. **"≈ +21%":** $12,089.43 ÷ $10,000 − 1 = 20.9%. **"28%":** gold's 2013 change, −28.0% (exact, no ≈). The flag reads "Gold −28%".
- **Finals:** $75,284.61 → **≈ $75,300**; $149,915.35 → **≈ $150,000** (3 significant figures).
- **Footer steps:**
  - ×7.528 → "×7.53": $10,000 × 7.53 = $75,300.
  - ×14.99 → "×15.0": $10,000 × 15.0 = $150,000.
  - Doublings: log₂ 7.528 = 2.91 → "≈ 2.9", spoken "≈ 3"; log₂ 14.99 = 3.91 → "≈ 3.9", spoken "≈ 4".
- **Verdict "≈ 2×":** 14.99 ÷ 7.528 = 1.99. "One extra doubling" = 3.91 − 2.91 ≈ 1.
- **Claims in words, checked against the data:**
  - Gold is ahead at every year-end 2000-2025.
  - 2008: S&P −37.00%, gold +5.6% ("keeps climbing").
  - The S&P/gold ratio rises from 0.39 (2013) to 0.78 (2021), so stocks "close in" but are "still behind".
- **Caption and pinned numbers:**
  - Per year: 7.528^(1/26) − 1 = 8.07%, so **≈ 8.1% a year**; gold 14.99^(1/26) − 1 = 10.97%, so **≈ 11.0% a year**.
  - Start in 2010 instead: S&P $75,284.61 ÷ $9,088.32 = **×8.3**; gold $149,915.35 ÷ $38,086.61 = **×3.9**.
- **Robustness:**
  - With the second gold table's values (a different price basis), gold ends at **≈ $154,000**, ×2.05 the S&P, so the verdict still rounds to "≈ 2×".
  - The implied 1999 gold close, $2,624.60 ÷ 9.109 = $288.12, matches the ~$290 year-end level.

**Assumptions** (footer: "S&P 500 with dividends · gold at year-end · 2000–2025"):
- Bought at the Dec 31, 1999 close and valued at the Dec 31, 2025 close.
- S&P 500 total return, dividends reinvested.
- Gold at its year-end closing price.
- No fees, tax, or gold storage or dealer spread. The one-line Scoreboard footer can't hold this line, so it goes in the description and the pinned comment.

**Caption / description (verdict here, R11):**
> Gold won. Not close: ≈ $150,000 vs ≈ $75,300 from the same $10,000 (Jan 2000 → Dec 2025). Gold was ahead at all 26 year-ends. That's ≈ 11.0% a year vs ≈ 8.1% a year. S&P 500 with dividends reinvested, gold at its year-end price, no fees, tax or storage costs. Educational maths, not advice. #linechart #investing #gold #sp500

**Pinned comment:**
> The start year picks the winner. From Jan 2010 to Dec 2025 the S&P 500 grew ×8.3 and gold ×3.9. Swap in your own amount: since 2000 it's × 15.0 for gold, × 7.53 for the S&P 500. Which start year should we race next?

**Per-platform notes:**
- **YouTube Shorts:** the title carries the question (ChartOrbit grammar). Add the hashtag tail "#linechart #datavisualization", the constant of ChartOrbit's winning era. No end card; the hard cut back to frame 1 is the loop.
- **Instagram Reels:**
  - The caption's first line carries the verdict ("Gold won. Not close.").
  - Cover = frame 1 (header and two $10,000 counters).
  - Expect argument comments ("start date cherry-picked"); the pinned comment answers it with numbers.
- **TikTok:**
  - Same caption, shortened to about 150 characters: "Gold won: ≈ $150,000 vs ≈ $75,300 from $10,000 since 2000. Start in 2010 and stocks win. Not advice."
  - Keep the header clear of the top 240 px.

**lookOpts (Scoreboard):**
- `stage: "race"`.
- `stakeLine: 10000`: a dashed line at the stake, so "below the stake" reads at a glance.
- `footerSteps`: the working line rewrites at 32.6, 37.4 and 40.3 s, as in 06a.

---

### 04b · Becker rig · "2 people put $1,000 away in 2010: a safe savings account vs the S&P 500"

- **Look:** Becker rig, light stage. Two faceless stick figures, each climbing its own line: the hero colour on the S&P 500, neutral grey on the savings line. Maths is in neutral ink; each result is a change in the world.
- **Platform title:** "2 People Put $1,000 Away in 2010: Savings Account vs S&P 500"
- **On-screen hook (header, 15 words):** `2 people put **$1,000** away in 2010` / `A safe savings account vs the S&P 500`
- **Hook rules it satisfies:**
  - **R1:** "$1,000" plus two $1,000 tip counters at 0.0 s.
  - **R2:** one input.
  - **R4:** $1,000 is an amount most viewers have actually parked in savings.
  - **R5:** one word, "safe", states the belief the ending breaks.
  - **R6:** two people (the viewer is one of them) + $1,000 + 2010.
  - **R7:** both options are named.
  - **R8:** 15 words.
  - **R9:** a fixed 2010-2025 axis.
  - **R10:** at 2.49 s the 2010 close lands, $1,150.60 vs $1,002.10.
  - **R11:** the question is spoken ("…or the S&P 500?"), the verdict is in the caption.
  - **R12:** the verdict is a single number, "lost ≈ 32%".
- **Modelled on:**
  - Jake's H78-H80, "2 people invest $10,000 / 10 years ago" (322,339; 301,112; 276,471 plays, 5.7-6.6x his median): two people, same money, two choices, both values moving at once.
  - ChartOrbit H17 (2,808,307, 345.09x) for the "A vs B" race and "you + amount + year".
  - Becker devices from alan-becker.md §4 and §6:
    - "results are transformations": the prices tide rises over the savings figure;
    - "one number going up is a complete story";
    - impact frames on the 2022 drop.
- **Wrong belief it exploits:** "A savings account is the safe place for money." In dollars, it never lost a cent: $1,000 → ≈ $1,024. In buying power it lost ≈ 32%, because prices rose ≈ 50% while it earned 2.4%. The ledger-duel lane (07c) owns high-yield vs big-bank savings; this teaser races savings against an index over 16 years.

**Beat sheet** (race: x 2010.0 → 2025.99 over t 1.0 → 25.0 s, 1.50 s per year)

| t (s) | On screen (Becker actions from `lookOpts.beats`) | VO |
|---|---|---|
| 0.0 | Header. Two figures at the foot of their lines; tip counters "$1,000" / "$1,000". Year "2010". Footer "Savings: FDIC avg rate (0.04%–0.47%) · S&P 500 with dividends · 2010–2025" | "$1,000 each. 2010." |
| 1.0-6.99 | Race starts. The hero scrambles up (2010 $1,150.60; 2012 $1,362.86; 2013 $1,804.29); the grey figure strolls a flat ledge ($1,002.10 … $1,005.66) | "The safe savings account, or the S&P 500?" (2.8) |
| 8.49-8.5 | 2014 close: S&P $2,051.29. Hero **cheers**, label "doubled". Pop | "2014: the S&P has doubled it." (8.5) |
| 12.5 | Grey figure **shrugs**, label "≈ +$6" ($1,006.26 at the 2014 close). Boing | "Savings has earned ≈ $6." |
| 14.49 / 16.31 | 2018 stumble ($2,712.35). "COVID" flag | — |
| 19.76-20.5 | "2022 bear market" flag. 2022 close $4,450.76: hero takes an **impact** (hit, shake, white frame), label "≈ −18%" | "2022: stocks drop ≈ 18%." (20.5) |
| 25.0 | Race ends. Hero **grows**, tip pinned "≈ $8,280". Savings tip "≈ $1,024". Roll | "2025: stocks ≈ $8,280." |
| 29.4 | Camera holds on the grey figure's ledge | "Savings: ≈ $1,024." |
| 31.9 | **Flood:** a "prices" tide rises from $1,000 to $1,500.60, past the savings ledge to his chin; label "prices ≈ +50%". Whoosh | "But prices rose ≈ 50%." |
| 34.4 | Grey figure **peeks** over the tide; label "≈ $1,501 now = $1,000 in 2010". Verdict: "The "safe" choice lost **≈ 32%** / of its buying power." Buzz | "That ≈ $1,024 now buys what ≈ $682 did." |
| 40.2-42.0 | Hold; loop back to frame 1 | — |

**Guide VO script (as read, 9 lines):**
> A thousand dollars each. 2010.
> The safe savings account, or the S&P 500?
> 2014: the S&P has doubled it.
> Savings has earned about six dollars.
> 2022: stocks drop about eighteen percent.
> 2025: stocks, about eight thousand two hundred eighty.
> Savings: about one thousand twenty-four.
> But prices rose about fifty percent.
> That thousand and twenty-four now buys what about six hundred eighty-two did.

**The maths**

- **S&P 500:** V(year) = V(year − 1) × (1 + total return), from $1,000 at the Dec 31, 2009 close.
- **Savings:** V(year) = V(year − 1) × (1 + APY), where the APY is the FDIC national average savings rate read each January:

  | Year | 2010 | 2011 | 2012 | 2013 | 2014 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
  |---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
  | APY % | 0.21 | 0.16* | 0.11 | 0.085* | 0.06 | 0.06* | 0.06 | 0.06* | 0.06 | 0.075* | 0.09 | 0.04 | 0.06 | 0.33 | 0.47 | 0.41 |

  \* = not found by search; set to the midpoint of the two neighbouring Januaries (assumption).

  | Year-end | t (s) | S&P 500 | Savings |
  |---|---:|---:|---:|
  | start (Dec 31, 2009 close) | 1.00 | $1,000.00 | $1,000.00 |
  | 2010 | 2.49 | $1,150.60 | $1,002.10 |
  | 2011 | 3.99 | $1,174.88 | $1,003.70 |
  | 2012 | 5.49 | $1,362.86 | $1,004.81 |
  | 2013 | 6.99 | $1,804.29 | $1,005.66 |
  | 2014 | 8.49 | $2,051.29 | $1,006.26 |
  | 2015 | 9.99 | $2,079.60 | $1,006.87 |
  | 2016 | 11.49 | $2,328.32 | $1,007.47 |
  | 2017 | 12.99 | $2,836.60 | $1,008.08 |
  | 2018 | 14.49 | $2,712.35 | $1,008.68 |
  | 2019 | 15.99 | $3,566.47 | $1,009.44 |
  | 2020 | 17.50 | $4,222.70 | $1,010.35 |
  | 2021 | 19.00 | $5,435.04 | $1,010.75 |
  | 2022 | 20.50 | $4,450.76 | $1,011.36 |
  | 2023 | 22.00 | $5,620.86 | $1,014.70 |
  | 2024 | 23.50 | $7,027.20 | $1,019.46 |
  | 2025 | 25.00 | $8,283.66 | $1,023.64 |

- **"doubled" (2014):** the first year-end at or above $2,000 is 2014 ($2,051.29; 2013 was $1,804.29).
- **"≈ $6":** $1,006.26 − $1,000 = $6.26.
- **"≈ 18%":** the S&P 500's 2022 return, −18.11%.
- **Finals:** $8,283.66 → **≈ $8,280** (3 significant figures); $1,023.64 → **≈ $1,024** (nearest dollar).
- **Prices:**
  - CPI-U Dec 2025 ÷ Dec 2009 = 324.054 ÷ 215.949 = 1.50060 → "≈ 50%".
  - $1,000 × 1.50060 = $1,500.60 → **≈ $1,501** (the tide's target, `to: 1500.6`).
- **Buying power:**
  - $1,023.64 ÷ 1.50060 = $682.15 → **≈ $682**.
  - Lost: 1 − 682.15 ÷ 1,000 = 31.8% → **≈ 32%** (verdict).
- **Robustness:**
  - Even at the best rate in the table, 0.47%, every year: $1,000 × 1.0047¹⁶ = $1,077.97 → **≈ $1,078**. That is still below prices ($1,500.60), and the S&P 500 is still more than 7× it.
  - At 0.04% every year: $1,006.42.
  - So the midpoint guesses cannot move the verdict.

**Assumptions** (footer: "Savings: FDIC avg rate (0.04%–0.47%) · S&P 500 with dividends · 2010–2025"):
- Interest is compounded once a year at the January national average (the footer gives the range; "set each January" is said here). The real rate moved during the year: 2022-2023 rose mid-year, so this understates those two years by about a dollar each.
- Five Januaries are midpoints.
- S&P 500 total return; no fees or tax.
- Prices are measured by CPI-U, Dec 2009 → Dec 2025.

**Caption / description:**
> The "safe" one lost. $1,000 in a savings account at the FDIC national average: ≈ $1,024 after 16 years. Prices rose ≈ 50% (CPI-U), so it buys what ≈ $682 did in 2010, ≈ 32% less. The same $1,000 in the S&P 500 (dividends reinvested): ≈ $8,280. Jan 2010 → Dec 2025, no fees or tax. Educational maths, not advice.

**Pinned comment:**
> Even at the best national average since 2010 (0.47%) every single year, $1,000 would be ≈ $1,078 now, still under the ≈ $1,501 it takes to keep up with prices. What does your savings account pay? (Swap in your own amount: × 8.28 for the S&P 500, × 1.024 for average savings.)

**Per-platform notes:**
- **YouTube Shorts:** the title is the Jake grammar. The figure gag (the flat-ledge stroll, the tide) is the share moment, so keep the verdict caption off the figure's head.
- **Instagram Reels:** the caption's first line is the verdict. Cover = the 34.4 s frame (the tide at his chin) as an A/B against frame 1. The benchmark gives no Becker-style precedent (no character breakouts, X3 in the looks file), so this is the test of the look.
- **TikTok:** caption "The safe one lost ≈ 32% of its buying power. $1,000 in savings vs the S&P 500 since 2010. Not advice."

**lookOpts (Becker rig):**
- `stage: "light"`.
- `figures`: series 0 hero, series 1 neutral.
- `beats`: cheer, shrug, impact, grow, flood (`to: 1500.6`) and peek, each on its VO line.
- `gag`: a one-paragraph staging note.

---

### 04c · Live Sheet · "POV: In 2016 you invested $10,000 in USA vs EUROPE"

- **Look:** Live Sheet. A white sheet on black, a yellow title banner, a "≈" formula-bar chip, and a 3-column ledger (Year | USA | Europe) that fills row by row as the chart above it races. Green for the leader, red for drops.
- **Topic change from the seed:** the seed was "US vs international since 2010, $10,000 each".
  - **Europe instead of "international":** it is the one country pair in the benchmark with a 345.09x multiple and 4× the comment rate (national rivalry). "International" is an unnamed set (R7).
  - **2016 instead of 2010:** MSCI's own factsheet, the primary source for MSCI Europe, covers 2012-2025, so 2010-2011 could not be two-sourced. A 10-year window (Jan 2016 → Dec 2025) also gives Jake's "10 years" grammar.
- **Platform title:** "What If You Invested $10,000 in the USA and EUROPE in 2016?" (A/B: "Europe Won 2025. Who Won the Decade?")
- **On-screen hook (banner, 10 words):** `POV: In 2016 you invested **$10,000** in` / `USA vs EUROPE`
- **Hook rules it satisfies:**
  - **R1:** "$10,000", plus the formula bar "= $10,000 × (1 + each year's return)" and two $10,000 counters at 0.0 s.
  - **R2.**
  - **R4.**
  - **R5:** the 2025 headline belief (Europe beat the US by 2 to 1 last year), set up by the race and broken in the final 15 s.
  - **R6.**
  - **R7:** named countries.
  - **R8:** 10 words.
  - **R9:** the 10 ledger rows 2016-2025 are visible from frame 1 with empty values, which is the countable loop.
  - **R10:** at 2.98 s the 2016 row fills: USA $11,196, Europe $9,960 (Europe in the red).
  - **R11.**
  - **R12:** "Europe won 2025. The USA won the decade."
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US flag] VS [EU flag]" (2,808,307 views, 345.09x, 1,220 comments).
  - ChartOrbit H19, "What If You Invested $5,000 in USA and CHINA?" (1,068,784, 5.18x).
  - Jake's H78/H80, "2 people invest $10,000 / 10 years ago" (322,339 / 276,471).
  - Live Sheet's formula bar comes from Debt Freedom's spreadsheet-as-proof (H48, 1.9M, 902.5x).
  - Contrast cases we avoid: S&P500 and NASDAQ100 48,161 and USA and CANADA 30,478. That is why the labels say USA and EUROPE first and the index names second.
- **Wrong belief it exploits:** "Europe is beating the US now." In 2025, Europe +35.41% vs the USA +17.88%, twice the year. Over the decade, the USA ≈ $39,800 vs Europe ≈ $22,700: the USA doubled twice, Europe once.

**Beat sheet** (race: x 2016.0 → 2025.99 over t 1.0 → 21.0 s, 2.0 s per year, ChartOrbit pace; ledger rows land on `lookOpts.ledger.rowT`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "≈ │ = $10,000 × (1 + each year's return)". Counters "$10,000" / "$10,000". Ledger: rows 2016-2025 with empty USA and Europe cells. Footer "USA = S&P 500, Europe = MSCI Europe (net) · total return in US$ · Jan 2016 → Dec 2025 · no fees or tax" | "$10,000 in 2016." |
| 2.98 | Row 2016 fills "+11.96%" / "−0.40%". Formula bar "= $10,000 × 1.1196 · = $10,000 × 0.9960". Tips $11,196 / $9,960 | "USA or Europe?" (2.8) |
| 4.98 | Row 2017: +21.83% / +25.51% | — |
| 6.81-6.99 | "2018 sell-off" flag. Row 2018: −4.38% / −14.86% (red). Europe tip $10,643. Thud | "2018: Europe drops ≈ 15%." (7.0) |
| 9.41 | "COVID" flag | — |
| 10.99 | Row 2020: +18.40% / +5.38%. USA tip $20,305 (passes $20,000). Ding | "2020: the USA has doubled your money." (11.0) |
| 15.4 | Europe tip highlighted at $13,882 (2020 row) | "Europe? ≈ $13,900." |
| 14.01-19.0 | "2022 bear market" flag at 14.01. Rows 2022-2024 | — |
| 19.0-21.0 | Row 2025: +17.88% / **+35.41%**. The Europe line jumps $16,735 → $22,661. Riser | "2025: Europe jumps ≈ 35%. Twice the USA's year." (19.1) |
| 21.0 | Race ends. Tips pinned "≈ $39,800" / "≈ $22,700". Formula bar "≈ $10,000 × 3.98 · ≈ $10,000 × 2.27". Final cells count up. Roll | — |
| 24.6 | USA row flashes | "Final: USA ≈ $39,800." |
| 28.6 | Europe row flashes | "Europe ≈ $22,700." |
| 31.4 | Formula bar "≈ 14.8% a year vs ≈ 8.5% a year". Verdict "Europe won **2025**. / The USA won the **decade**." Ding | "The USA doubled twice. Europe, once." |
| 34.5-36.5 | Hold, then the rows clear back to frame 1 (loop) | — |

**Guide VO script (as read, 9 lines):**
> Ten thousand dollars in 2016.
> USA or Europe?
> 2018: Europe drops about fifteen percent.
> 2020: the USA has doubled your money.
> Europe? About thirteen thousand nine hundred.
> 2025: Europe jumps about thirty-five percent. Twice the USA's year.
> Final: USA, about thirty-nine thousand eight hundred.
> Europe, about twenty-two thousand seven hundred.
> The USA doubled twice. Europe, once.

**The maths**

- **Recurrence:** V(year) = V(year − 1) × (1 + r(year)), from $10,000 at the Dec 31, 2015 close.
  - USA r = S&P 500 total return.
  - Europe r = MSCI Europe net total return in US dollars.

  | Year-end | t (s) | USA (S&P 500) | Europe (MSCI Europe) | Ledger row (USA / Europe) |
  |---|---:|---:|---:|---|
  | start (Dec 31, 2015 close) | 1.00 | $10,000.00 | $10,000.00 | — |
  | 2016 | 2.98 | $11,196.00 | $9,960.00 | +11.96% / −0.40% |
  | 2017 | 4.98 | $13,640.09 | $12,500.80 | +21.83% / +25.51% |
  | 2018 | 6.99 | $13,042.65 | $10,643.18 | −4.38% / −14.86% |
  | 2019 | 8.99 | $17,149.78 | $13,173.06 | +31.49% / +23.77% |
  | 2020 | 10.99 | $20,305.34 | $13,881.77 | +18.40% / +5.38% |
  | 2021 | 12.99 | $26,135.01 | $16,144.50 | +28.71% / +16.30% |
  | 2022 | 14.99 | $21,401.96 | $13,713.14 | −18.11% / −15.06% |
  | 2023 | 17.00 | $27,028.53 | $16,440.68 | +26.29% / +19.89% |
  | 2024 | 19.00 | $33,791.07 | $16,734.97 | +25.02% / +1.79% |
  | 2025 | 21.00 | $39,832.91 | $22,660.82 | +17.88% / +35.41% |

- **Formula bar at 2.98 s:** 1 + 11.96% = 1.1196; 1 − 0.40% = 0.9960.
- **"≈ 15%":** Europe 2018, −14.86%.
- **"doubled" (2020):** the first USA year-end at or above $20,000 is 2020 ($20,305.34; 2019 was $17,149.78). Europe first passes $20,000 only in 2025.
- **"≈ $13,900":** $13,881.77.
- **"≈ 35%" and "twice":** 35.41% ÷ 17.88% = 1.98.
- **Finals:** $39,832.91 → **≈ $39,800**; $22,660.82 → **≈ $22,700**.
- **Multiples:** ×3.983 → "3.98" ($10,000 × 3.98 = $39,800); ×2.266 → "2.27" ($22,700).
- **Per year:** 3.983^(1/10) − 1 = 14.82%, **≈ 14.8%**; 2.266^(1/10) − 1 = 8.52%, **≈ 8.5%**.
- **Doublings:** log₂ 3.983 = 1.99 ("twice"); log₂ 2.266 = 1.18 ("once"). Rule of 72 for the pinned comment: 72 ÷ 14.8 ≈ 4.9 years per doubling; 72 ÷ 8.5 ≈ 8.5.

**Assumptions** (footer, above):
- Both are total-return indexes in US dollars, so Europe's line includes the euro/pound moves against the dollar.
- MSCI Europe is "net" (after dividend withholding tax), while the S&P 500 series is gross. This tilts roughly 0.3-0.5 points a year toward the USA, far smaller than the 6.3-point gap.
- No fund fees or personal tax. Bought at the Dec 31, 2015 close and valued at the Dec 31, 2025 close.

**Caption / description:**
> Europe won 2025: +35.41% vs +17.88%. The USA won the decade: ≈ $39,800 vs ≈ $22,700 from the same $10,000 (Jan 2016 → Dec 2025, total return in US dollars; USA = S&P 500, Europe = MSCI Europe net). That's ≈ 14.8% a year vs ≈ 8.5%. Educational maths, not advice. #linechart #investing #europe #sp500

**Pinned comment:**
> One great year ≠ a great decade. Per year: USA ≈ 14.8%, Europe ≈ 8.5%. Rule of 72: one doubling every ≈ 5 years vs ≈ 8.5. Swap in your own amount: × 3.98 vs × 2.27. Next race: USA vs Japan, or USA vs China?

**Per-platform notes:**
- **YouTube Shorts:** ChartOrbit's exact title grammar, plus #linechart. Country pairs drew about 4× the comments per view, so reply to the "what about currency / dividends?" comments with the footer basis.
- **Instagram Reels:** cover = the finished ledger (the sheet is the screenshot people save; FinCalC held its table 9 s). Test this against frame 1.
- **TikTok:** caption "Europe won 2025. The USA won the decade: ≈ $39,800 vs ≈ $22,700 from $10,000 since 2016. Not advice." The national-rivalry comments are the point; don't add a third country (ChartOrbit's three-way titles fell to a 53,469 median).

**lookOpts (Live Sheet):**
- `formulaSteps`: the formula bar text at 0.0, 2.98, 21.0 and 31.4 s.
- `ledger`: columns, 10 rows of exact yearly returns, and `rowT`, the moment each year's close lands on the chart.

---

## Sources (every real-world input)

All were verified by web search on 2026-10-07. Bash and WebFetch egress were blocked in this session, so every figure comes from search results. Rows marked **[click-check]** came from a search summary whose exact page could not be opened. A human should open the URL once before publishing.

| Input | Value(s) used | Source 1 | Source 2 (independent) |
|---|---|---|---|
| S&P 500 total return, 2000-2006 | −9.10, −11.89, −22.10, 28.68, 10.88, 4.91, 15.79 % | S&P DJI data via Slickcharts, "S&P 500 Total Returns by Year" (https://www.slickcharts.com/sp500/returns), as used by 07b | UMD Smith School, David Kass, "S&P 500 Total Return Up in 80% of Past 78 Years" (2020-01-06, https://blog.umd.edu/davidkass/2020/01/06/sp-500-total-return-up-in-80-of-past-78-years-1942-2019); Motley Fool, "S&P 500 annual returns" (https://www.fool.com/investing/stock-market/indexes/sp-500/annual-returns) **[click-check]** |
| S&P 500 total return, 2007-2025 | the 07b table (e.g. 2008 −37.00, 2022 −18.11, 2025 17.88 %) | Slickcharts (above) | YCharts, US500.com, History of Market (2017-2025) and NYU Stern/Damodaran (several years), per [`checks/07-ledger-duel.py`](checks/07-ledger-duel.py) |
| Gold, annual % change of the year-end price, 2000-2024 | table in the check (e.g. 2013 −28.0, 2024 27.2 %) | Visual Capitalist, "Charted: Gold's Annual Returns (2000-2025)" (Jul 2025, https://www.visualcapitalist.com/charted-golds-annual-returns-2000-2025/) | thegoldprice.net, "Gold Price by Year — Annual Returns from 2000 to 2026" (https://thegoldprice.net/guides/gold-annual-returns) and chartrow (https://chartrow.com/gold/returns). These use a different price basis: same within 0.5 points in most years, 1.9 points in 2000. The check runs the race on these values too |
| Gold 2024 close | $2,624.60 (+27.23%) | Macrotrends, "Gold Prices - 100 Year Historical Chart" (https://www.macrotrends.net/1333/historical-gold-prices-100-year-chart) **[click-check]** | consistent with Visual Capitalist's 27.2% |
| Gold Dec 31, 2025 close | $4,319.37, "up 64.58%" | search summary citing metalcharts.org (https://metalcharts.org/gold-price-history/2025) / pricegold.net (https://pricegold.net/2025/december/) **[click-check]** | thegoldprice.net 2025 = 64.6%; VanEck gold commentary Dec 2025 (https://www.vaneck.com/us/en/blogs/gold-investing/ima-casanova-a-golden-year-with-more-leverage-ahead/gold-monthly-commentary-december-2025.pdf): 64.4% in USD; other closes $4,323 and $4,325.45. LBMA, "Precious Metals Market Report: Q4 and Full Year 2025" (https://www.lbma.org.uk/articles/lbma-precious-metals-market-report-q4-and-full-year-2025): above $4,000 from 7 Nov to year end |
| FDIC national savings rate, Januaries | 2010 0.21, 2012 0.11, 2014 0.06, 2016 0.06, 2018 0.06, 2020 0.09 % | Forbes Advisor, "History of Savings Account Interest Rates" (https://www.forbes.com/advisor/banking/savings/history-of-savings-account-interest-rates/) **[click-check]** | wealthvieu, "Savings Account Interest Rate History: 1980–2026" (https://wealthvieu.com/banking/interest-rates/savings-rate-history/) **[click-check]** |
| FDIC national savings rate, Jan 2022 | 0.06% | FDIC, National Rates and Rate Caps, 2022-01-18 (https://fdic.gov/resources/bankers/national-rates/2022-01-18.html) | Forbes Advisor (above): "a measly 0.06%" at the start of 2022 |
| FDIC national savings rate, 2021 low and Jan 2023-2025 | 0.04 (2021), 0.33, 0.47, 0.41 % | search summary of FDIC monthly values, citing SmartAsset (https://smartasset.com/checking-account/average-savings-account-interest) and banksparency (https://banksparency.com/high-yield-savings-accounts/resources/fdic-rates) **[click-check]** | none found in budget. Single-source, so the check shows the verdict holds even at 0.47% every year |
| CPI-U, Dec 2009 | 215.949 | BLS CPI news release, 2010-01-15 (https://www.bls.gov/news.release/archives/cpi_01152010.htm) | BLS historical CPI-U table (https://www.bls.gov/regions/southwest/data/consumerpriceindexhistorical_us1982-84_table.pdf) **[click-check]** |
| CPI-U, Dec 2025 | 324.054 (+2.7% y/y) | BLS CPI news release, 2026-01-13 (https://www.bls.gov/news.release/archives/cpi_01132026.htm) | Idaho Dept. of Labor, "2025 CPI" (https://lmi.idaho.gov/wp-content/uploads/2025/12/2025-CPI.pdf) **[click-check]** |
| MSCI Europe (USD, net), 2016-2025 | −0.40, 25.51, −14.86, 23.77, 5.38, 16.30, −15.06, 19.89, 1.79, 35.41 % | MSCI, "Index Factsheet MSCI Europe Index (USD)" (https://www.msci.com/documents/10199/255599/msci-europe-index-net.pdf) | YCharts, "MSCI Europe Net Total Return" (https://ycharts.com/indices/%5EMSEURNTR): identical for 2019-2025. DWS, Xtrackers MSCI Europe UCITS ETF 1C (https://etf.dws.com/en-gb/LU0274209237-msci-europe-ucits-etf-1c/): fund returns within 1.0 point every year, 2016-2025 |

**Search log (14 of 14 used):**
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

## Summary table

| Spec | Look | Header (words) | Stake / window | Finals | Verdict | Length |
|---|---|---|---|---|---|---|
| 04a | Scoreboard | "POV: In 2000 you put $10,000 in / the S&P 500 VS gold" (12) | $10,000 each, Jan 2000 → Dec 2025 | ≈ $75,300 vs ≈ $150,000 | Gold ≈ 2× the S&P 500 | 46.5 s |
| 04b | Becker rig | "2 people put $1,000 away in 2010 / A safe savings account vs the S&P 500" (15) | $1,000 each, Jan 2010 → Dec 2025 | ≈ $8,280 vs ≈ $1,024 | the "safe" choice lost ≈ 32% of its buying power | 42.0 s |
| 04c | Live Sheet | "POV: In 2016 you invested $10,000 in / USA vs EUROPE" (10) | $10,000 each, Jan 2016 → Dec 2025 | ≈ $39,800 vs ≈ $22,700 | Europe won 2025; the USA won the decade | 36.5 s |

## Caveats

- **Start dates decide races.** 04a starts at the dot-com peak; from 2010 the S&P 500 wins (×8.3 vs ×3.9), and the pinned comment says so. 04c starts in 2016 for a round 10 years inside the 2012-2025 run that MSCI's factsheet covers; from 2012 the gap is wider (≈ ×7.1 vs ≈ ×3.1).
- **No 2026 data on screen.** The races end at the Dec 31, 2025 close (see the decisions above). A refresh after Dec 31, 2026 needs one more year per series.
- **Search-summary provenance.** Every figure was seen only in search summaries, never on the page itself. The **[click-check]** rows need one human click before posting. The FDIC Januaries for 2021 and 2023-2025, and the five midpoint years, are the weakest inputs; they move the savings line by a few dollars at most and cannot change the verdict.
- **Benchmark caveats carry over.** The format's only benchmark channel (ChartOrbit) has collapsed to a ~1,557 median since leaving its formula. Our lengths (36.5-46.5 s) sit between its 61 s winners and its 31 s decline, by brief.
- **Mutation test:** 8 of 8 broken spec copies were caught (listed under Deliverables). The kits' chart-race modules are still stubs, so no frame of the race itself has been rendered yet. Only the linter's chrome checks (header, footer, captions, verdict) have run: 3/3 clean.
