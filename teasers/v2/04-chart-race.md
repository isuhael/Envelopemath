# Format 4: same-stake line-chart race (chart-race, hook pattern P4)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 4 of 10, round 2 (revised after the verifier and hook-judge reviews, then two hook passes; 04b's hook was rewritten in hook pass 2. See the Review log at the end)
**Deliverables:**
- Specs (all three pass the studio linter, `node src/cli.mjs check`: 0 errors, 0 warnings; contact sheets rendered in both kits, Scoreboard and Becker rig):
  - [`studio/specs/04a-scoreboard-sp500-vs-gold.json`](../../studio/specs/04a-scoreboard-sp500-vs-gold.json)
  - [`studio/specs/04b-becker-rig-savings-vs-sp500.json`](../../studio/specs/04b-becker-rig-savings-vs-sp500.json)
  - [`studio/specs/04c-scoreboard-usa-vs-europe.json`](../../studio/specs/04c-scoreboard-usa-vs-europe.json) (ported from Live Sheet on 2026-10-08; the retired spec is [`studio/specs/retired/04c-live-sheet-usa-vs-europe.json`](../../studio/specs/retired/04c-live-sheet-usa-vs-europe.json))
- Check: [`teasers/v2/checks/04-chart-race.py`](checks/04-chart-race.py). It recomputes every series from the sourced annual returns and is cut-aware since the condensed cut (2026-10-13): **657 checks, 0 failed** by default (the round-2 cuts that `studio/specs/` holds), and **698 checks, 0 failed** with `--spec` on the three condensed cuts in `studio/specs-wip/` (see the Review log). Before the condensed cut's fixer pass it passed 626 by default and 657 with `--spec`; before the condensed cut, 614 checks since the 04c fixer pass (582 after the 04c port to Scoreboard, 637 before it, 591 before the 04b fixer pass, 566 before the 04b assembly pass, 451 before the QA fixer pass, 445 before the assembly pass, 407 before hook pass 2). New in this revision:
  - a spoken-number sync check: every figure the VO quotes mid-race must be on screen at the moment it is said (on a tip counter, a flag, a beat label, or a working-line step);
  - a 2,916-table sweep over the uncertain savings-rate inputs (04b);
  - a stale-text check on this write-up (since hook pass 2, also a 04b-section check that no text from the old hook is left).
- Mutation test: the check caught **12 of 12** deliberately broken spec copies (listed under Caveats), and **8 of 8** more for the new 04b hook in hook pass 2. It caught **18 of 18** for the condensed cut and **12 of 12** for that cut's fixer pass (see the Review log).

**Evidence base:**
- The benchmark only: [`research/v2/02-hook-bank.md`](../../research/v2/02-hook-bank.md) (P4, R1-R12, section 2.10 "open in the red"), [`research/v2/04-formats.md`](../../research/v2/04-formats.md) (rank 4), and the watch studies [`chartorbit.md`](../../research/v2/watch/chartorbit.md) and [`jake-jacobdoesmoney.md`](../../research/v2/watch/jake-jacobdoesmoney.md).
- Looks: [`03-look-directions.md`](../../research/v2/03-look-directions.md) (Scoreboard; 04c was first built in Live Sheet, a look since retired) and [`watch/alan-becker.md`](../../research/v2/watch/alan-becker.md) sections 3, 4 and 6 (Becker rig).

---

## (a) The format in 5 lines

1. **Mechanic.** The same round stake goes into 2 named rivals on the same date. One continuous line chart races year by year, with a live counter at each line tip, a big year counter, crash flags and 0 cuts, and it ends dead on the verified final values.
2. **Hook.** The title asks ("What If You Invested $5,000 in A and B?"). The frame-1 header says you already did it ("POV: In [year] you invested $[stake] in A VS B"); 04b's header (hook pass 2) is a handicap duel in the same A VS B grammar ("Your $1,000: 16 years of savings VS 1 year of the S&P 500"). The stake is the only accent colour. In ChartOrbit's winners the chart is already moving at 0.0 s, below the stake. 04a and 04b copy that: their race clocks start before 0 s (−0.4 s in round 2; −0.25 s and −0.2 s in the condensed cuts), so 04a's frame 1 shows both tips under the stake and 04b's shows the S&P already ahead ($1,041 vs $1,001). 04c opens on its claim instead: the 2025 duel as two neon columns to scale, Europe's +35.41% lit, in place of the parked race; it rewinds into the race at 4.8 s (round 2) or 1.25 s (condensed cut).
3. **Pace.** About 2-2.7 s per year in the benchmark (61 s). The round-2 cuts ran 1.2-1.7 s per year, 36.5-45.5 s, inside that round's 25-50 s lane. The condensed cuts (2026-10-13, the owner's note: "Too many still moments are a killer for a short. Condense the rest.") run 0.49 (04a, 26 years), 0.75 (04b) and 0.96 s per year (04c) in 15.9-17.4 s bodies, plus the 2.5 s end card, with no still moment of 0.4 s or more before the verdict. The biggest number lands last, then the verdict.
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
  - Scoreboard footer: "$10,000 grew ≈ ×7.53 → ≈ $75,300". 04c's working line: "USA: ≈ ×3.98 ≈ 2 doublings"; a step whose rounded inputs miss the shown figure starts or links with "≈" ("2020: USA $20,305 ≈ $10,000 × 2.03"). Pinned comments: "≈ ×15.0", "≈ ×3.98".
  - VO text uses "≈" too, because captions show it. The owner reads "≈" as "about".
- **A figure the VO quotes mid-race is on screen when it is said.** The race moves 1.2-1.7 s per year, while a spoken figure takes 1-3 s to reach. So each mid-race figure is either pinned (a flag, a beat label, or a working-line step that carries it), or it is a bound that holds on the live tip for the whole line ("still under $17,000", "under $10 so far"). The check computes when each figure is said (the line's start plus its spoken words ÷ 2.6) and tests what is showing then.
- **The verdict lands after the last VO line ends.** The Becker rig chrome hides captions while the verdict shows, and the Scoreboard verdict must not land on a caption that is still running.
- **The first VO line plants the wrong answer (R5); it never reads the header aloud.** (04b: the first line gives the target, ≈ $151, and the second plants the belief, "Savings gets 16 years to match it.")
- **Captions: line 1 on IG and TikTok is a curiosity line, and the verdict goes after the fold.** TikTok shows line 1 over the video from 0 s, so a verdict there gives the twist away.
- **Rule-of-thumb line (the format's "envelope twist" from 04-formats).** Each teaser converts its ending into doublings, or into "% a year", so the result is a number you can carry.
- **Swap-in for R3.** The multiple is printed in the footer (the working line), so viewers can multiply their own amount. The pinned comments say so.
- **No logos, no licensed music.**
  - Names are in text (no country flags or brand marks).
  - ChartOrbit's ABBA track is replaced by kit SFX (licensing for us is unknown).
- **Kits.** The two kept looks carry the format: Scoreboard (04a, and 04c since its port on 2026-10-08) and Becker rig (04b). Each spec carries optional `lookOpts` (documented per teaser below) that the kits read; a kit renders sensibly without them.

---

## (b) The teasers

### 04a · Scoreboard · "POV: In 2000 you put $10,000 in the S&P 500 VS gold"

- **Look:** Scoreboard (black bars, stage `#0E1116`, money green `#2BFF88` for the S&P 500, second-contender yellow `#FFD23F` for gold, Anton header, footer working line).
- **Platform title:** "What If You Invested $10,000 in the S&P 500 and GOLD in 2000?" (A/B: "$10,000 in 2000: Stocks or Gold?")
- **On-screen hook (header, 12 words):** `POV: In 2000 you put **$10,000** in` / `the S&P 500 VS gold` (kept: it is ChartOrbit's 345x grammar).
- **Condensed cut (2026-10-13):** this section describes the condensed cut in [`studio/specs-wip/04a-scoreboard-sp500-vs-gold.json`](../../studio/specs-wip/04a-scoreboard-sp500-vs-gold.json) (17.4 s body + the 2.5 s end card = 19.9 s; the round-2 cut was 45.5 + 2.5 = 48 s; revised by the fixer pass, see the Review log). `studio/specs/` keeps the round-2 cut until the ship step promotes it; its timings are in the Review log ("Condensed cut (2026-10-13)").
- **First caption (complete on frame 1):** "Stocks should crush gold." There is no narration: the captions are on-screen text, paced for reading.
- **Hook rules it satisfies:**
  - **R1:** "$10,000" in the header and the dashed $10,000 stake line at 0.0 s, with both tip counters already under it ($9,535 / $9,724).
  - **R2:** one input, no result.
  - **R4:** a round, familiar stake.
  - **R5:** the first caption names the belief the chart then breaks ("Stocks should crush gold"), without "most people".
  - **R6:** you + $10,000 + 2000.
  - **R7:** both options are named.
  - **R8:** 12 words.
  - **R9:** a fixed 2000-2025 x-axis, so the remaining years are countable.
  - **R10:** frame 1 is already in the red (hook-bank 2.10, ChartOrbit H16/H17), and the race moves from frame 1; the 2000 close lands at 0.24 s; the first payoff lands at the 2002 close, 1.23 s, on a flag ("S&P ≈ −38% · gold ≈ +21%", up 1.23-2.73 s), with its caption up 1.25-3.55 s.
  - **R11:** the title asks, the screen says "you did it", the caption gives the verdict after the fold.
  - **R12:** a lopsided verdict, "≈ 2×".
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US] VS [EU]" (2,808,307 views, 345.09x), which opens inside the crash with both tips under the stake.
  - ChartOrbit H16, "POV: In 2002 You invested $5000 in NETFLIX VS Disney" (15,876,376, 100.45x); its title grammar is the platform title.
  - @investment_timeline's GoPro post H43 (5.1M, 22.6x), the benchmark's proof that a chart which reverses the expected winner still travels.
- **Wrong belief it exploits:** "Over the long run, stocks always beat gold. Gold is a pet rock." From Jan 2000, gold was ahead of the S&P 500 at **all 26 year-ends** (the check asserts this) and ended at about twice the money.

**Beat sheet** (condensed cut, 2026-10-13, as revised by the fixer pass: race x 2000.0 → 2025.99 over t −0.25 → 12.6 s, 0.494 s per year; frame 1 is x ≈ 2000.51, before the corner clock's roll into 2001; gold's held-back 2025 leg over 13.3 → 14.3 s while the hero holds the S&P's final; verdict at 15.8 s; body 17.4 s + the 2.5 s end card = 19.9 s)

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header. The race is already moving: S&P 500 tip $9,535, gold tip $9,724, both under the dashed $10,000 stake line, their labels stacked by value (gold on top); the hero shows the leader, "GOLD $9,724". Corner year clock on a clean "2000" (it rolls into 2001 from 0.05 s). Fixed x-axis 2000-2025. Footer "S&P + dividends · gold · year-ends 2000–2025" | "Stocks should crush gold." (complete on frame 1, up to 1.2) |
| 0.24 | 2000 close (S&P $9,090, gold $9,460). "Dot-com crash" flag | (continues) |
| 1.23 | 2002 close: S&P $6,239 vs gold $12,089. Flag "S&P ≈ −38% · gold ≈ +21%" (white, with −38% in red and +21% in gold yellow), held 1.5 s (`flagHold`, to 2.73). Thud | "By 2002: stocks ≈ −38%. Gold ≈ +21%." (1.25-3.55) |
| 4.08-4.19 | "2008 crash" flag (to 5.58). 2008 close at 4.19: S&P $7,187 vs gold $30,567. Thud | "2008: stocks crash again. Gold keeps climbing." (3.6-5.8) |
| 6.33-6.67 | "Gold ≈ −28%" flag (to 7.83). Gold falls $58,204 → $41,907 at the 2013 close, 6.67 s. Hit | "2013: gold drops ≈ 28% in one year." (5.85-7.35) |
| 7.4-10.0 | The S&P climbs from $16,398 (2013) to $32,413 (2019, 9.63 s) while gold dips and recovers | "Then stocks run for years and close in." (7.4-10.0) |
| 10.62 | 2021 close: S&P $49,395, gold $63,518 | "2021: still behind." (10.05-11.5; it clears 1.0 s after the 2021 close) |
| 10.87 | "2022 bear market" flag (to 12.37): the only text while no caption is up (11.5-12.1, a 0.6 s breath while the race runs) | (continues), then none |
| 12.1 | Gold stops at its 2024 close (`holdBack`): its tip holds "$91,094" while the clock runs on. The hero cuts to the S&P 500, the one still racing (swipe) | "End of 2025: stocks ≈ $75,300." (12.1-13.85): the destination, as the S&P climbs its last year toward it |
| 12.6-13.05 | Race ends. Footer step "$10,000 grew ≈ ×7.53 → ≈ $75,300". The S&P tip rolls its last digits and lands at 13.05 s on "≈ $75,300"; the hero lands "S&P 500 ≈ $75,300" (bump, pop). Every tip label sits right of its own dot (`tipLane`). Roll | (continues) |
| 13.3-14.3 | Gold draws its 2025 leg (+64.57%) under the riser; its tip label rolls up the line ($91,094 → $126,387 at 13.9 s). The hero holds "S&P 500 ≈ $75,300" (no `follow`), so the S&P's final keeps the top bar for 1.25 s. At 13.9 the footer steps to "$10,000 grew ≈ ×15.0 → ≈ $150,000" | "Gold ≈ $150,000." (13.9-15.1) |
| 14.3 | The climax: gold's tip lands "≈ $150,000" and the hero cuts to "GOLD ≈ $150,000" with the 1.13 bump, glow and floor flare. Hit + cash (the kit's cues) | (continues) |
| 15.1 | The y grid gives way to dashed doubling rungs ×2, ×4, ×8, ×16, one every 0.16 s (`rungs`, a tick each): gold ends between ×8 and ×16, the S&P between ×4 and ×8. Footer step "Gold ≈ 3.9 doublings · S&P 500 ≈ 2.9", each name in its line colour | "Gold doubled ≈ 4 times. Stocks, ≈ 3." (15.1-16.3; it wraps "Gold doubled ≈ 4 times. / Stocks, ≈ 3." and runs on under the verdict, which sits above the caption band) |
| 15.8-17.4 | The plot compresses over 15.5-15.8 and the verdict slams in: "Gold ended **≈ 2×** the S&P 500. / That's ≈ one extra doubling.", the emphasis and the rule in gold yellow (`emColor`). Ding. It holds 1.6 s | — |
| 17.4-19.9 | The end card (the brand layer, unchanged) | — |

**Captions** (on-screen text, no narration; the same 9 lines, word for word, as the round-2 VO, retimed for reading: each is up at least max(1.2 s, 0.12 s a word), back to back 0.05 s apart):

| # | Up (s) | Caption |
|---|---|---|
| 0 | 0.0 (from −0.4, so complete on frame 1) – 1.2 | Stocks should crush gold. |
| 1 | 1.25 – 3.55 | By 2002: stocks ≈ −38%. Gold ≈ +21%. |
| 2 | 3.6 – 5.8 | 2008: stocks crash again. Gold keeps climbing. |
| 3 | 5.85 – 7.35 | 2013: gold drops ≈ 28% in one year. |
| 4 | 7.4 – 10.0 | Then stocks run for years and close in. |
| 5 | 10.05 – 11.5 | 2021: still behind. |
| 6 | 12.1 – 13.85 | End of 2025: stocks ≈ $75,300. |
| 7 | 13.9 – 15.1 | Gold ≈ $150,000. |
| 8 | 15.1 – 16.3 | Gold doubled ≈ 4 times. Stocks, ≈ 3. (no-break spaces inside "doubled ≈ 4 times" and "Stocks, ≈ 3", as in round 2, so the line wraps after "times.") |

"≈" reads as "about"; a caption never splits "≈" from its number (the kit glues them).

**The maths** (every number on screen; the check recomputes each one)

- **Recurrence:** V(year) = V(year − 1) × (1 + r(year)), with V(1999) = $10,000 for each series.
  - r = the S&P 500 total return (dividends reinvested), or gold's year-end price change.
  - Gold 2025 = $4,319.37 ÷ $2,624.60 − 1 = **64.57%**.

  | Year-end | t (s) | S&P 500 | Gold |
  |---|---:|---:|---:|
  | start (Dec 31, 1999 close) | −0.25 | $10,000.00 | $10,000.00 |
  | frame 1 (x ≈ 2000.51, interpolated) | 0.00 | $9,535 | $9,724 |
  | 2000 | 0.24 | $9,090.00 | $9,460.00 |
  | 2001 | 0.73 | $8,009.20 | $9,687.04 |
  | 2002 | 1.23 | $6,239.17 | $12,089.43 |
  | 2003 | 1.72 | $8,028.56 | $14,446.86 |
  | 2004 | 2.22 | $8,902.07 | $15,226.99 |
  | 2005 | 2.71 | $9,339.16 | $17,891.72 |
  | 2006 | 3.21 | $10,813.81 | $22,096.27 |
  | 2007 | 3.70 | $11,407.49 | $28,946.12 |
  | 2008 | 4.19 | $7,186.72 | $30,567.10 |
  | 2009 | 4.69 | $9,088.32 | $38,086.61 |
  | 2010 | 5.18 | $10,457.02 | $49,360.24 |
  | 2011 | 5.68 | $10,677.67 | $54,345.63 |
  | 2012 | 6.17 | $12,386.10 | $58,204.17 |
  | 2013 | 6.67 | $16,397.95 | $41,907.00 |
  | 2014 | 7.16 | $18,642.83 | $41,152.67 |
  | 2015 | 7.66 | $18,900.10 | $36,872.80 |
  | 2016 | 8.15 | $21,160.55 | $39,970.11 |
  | 2017 | 8.64 | $25,779.90 | $45,246.16 |
  | 2018 | 9.14 | $24,650.74 | $44,522.23 |
  | 2019 | 9.63 | $32,413.26 | $52,669.79 |
  | 2020 | 10.13 | $38,377.30 | $65,889.91 |
  | 2021 | 10.62 | $49,395.43 | $63,517.87 |
  | 2022 | 11.12 | $40,449.91 | $63,263.80 |
  | 2023 | 11.61 | $51,084.20 | $71,614.62 |
  | 2024 | 12.11 | $63,865.46 | $91,093.80 |
  | 2025 | 12.60 | $75,284.61 | $149,915.35 |

- **"26 year-ends" (caption):** Jan 2000 → Dec 2025 = 26 calendar years (exact). (The VO no longer says "26 years".)
- **Frame 1:** x = 2000 + 0.25 ÷ 0.49442 = 2000.51 (the race clock runs 0.49442 s per year: 12.85 s for 25.99 years). The 2000 segment is 0.99 years long, so the tips are 0.511 of the way down it: S&P $10,000 − $910 × 0.511 = $9,535; gold $10,000 − $540 × 0.511 = $9,724. The corner clock rolls into 2001 over the last 0.4 of a year (the kit's roll: 0.24 s ÷ the s per year, capped at 0.4), from x 2000.6, so frame 1 reads a clean "2000". (The first condensed cut started at −0.4 s: x 2000.80, $9,265 / $9,564, with the clock mid-roll on frame 1. The round-2 cut's frame 1 was x 2000.32: $9,701 / $9,823.)
- **"By 2002: ≈ −38%":** 1 − $6,239.17 ÷ $10,000 = 37.6% down since Jan 2000. **"≈ +21%":** $12,089.43 ÷ $10,000 − 1 = 20.9% up. Both are cumulative, which is why the VO says "By 2002" (the S&P 500's 2002 return alone was −22.10%, gold's +24.8%). The flag carries the same two figures.
- **"≈ 28%":** gold's 2013 change, −28.0% in the table. It is a rounded 1-decimal table value, and other price bases give −27.3% to −28.3%, so the VO and the flag ("Gold ≈ −28%") both carry "≈".
- **Finals:** $75,284.61 → **≈ $75,300**; $149,915.35 → **≈ $150,000** (3 significant figures).
- **Footer steps:**
  - $75,284.61 ÷ $10,000 = 7.5285 → "≈ ×7.53"; $10,000 × 7.53 = $75,300 → "≈ $75,300".
  - $149,915.35 ÷ $10,000 = 14.9915 → "≈ ×15.0"; $10,000 × 15.0 = $150,000 → "≈ $150,000".
  - Doublings: log₂ 7.5285 = 2.91 → "≈ 2.9", spoken "≈ 3"; log₂ 14.9915 = 3.91 → "≈ 3.9", spoken "≈ 4".
- **Verdict "≈ 2×":** 14.9915 ÷ 7.5285 = 1.99. "That's ≈ one extra doubling" = 3.906 − 2.912 = 0.994 (a rounding, so it carries "≈").
- **Gold's held tip:** $91,093.80 (the 2024 close) shows as "$91,094" from 12.11 s until gold's last leg starts at 13.3 s.
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
- `footerSteps`: the working line rewrites at 12.6 (the race end, under "End of 2025: …", up since 12.1), 13.9 and 15.1 s (with their captions), each up at least 1.2 s, as in 06a. The last step names the racers ("Gold ≈ 3.9 doublings · S&P 500 ≈ 2.9"), each in its line colour.
- `finalT: [12.6, 14.3]` (assembly pass; condensed timings): a staggered finish. The hero shows the S&P 500's final at the race end, under "End of 2025: stocks ≈ $75,300.", and holds it until gold's final lands at the end of its held-back leg (the climax: riser, hit + cash, bump, flare). The spec has no cash cue of its own there (the kit cues hit + cash).
- `holdBack: { series: 1, t: [13.3, 14.3] }` (QA fixer pass; condensed timings): gold stops at its 2024 close (12.11 s) while the clock runs on, its label holding $91,094; it draws its last leg over 13.3-14.3 s under the riser, 0.25 s after the S&P's final lands, and its final lands at 14.3 s. No `follow`: the hero holds "S&P 500 ≈ $75,300" while gold's line spikes, and cuts to gold only at its final (the climax), as in round 2, whose leg was 2.0 s (34.4-36.4 s). (The first condensed cut set `follow: true`. The hero then left the S&P's final after 0.25 s and rolled with gold under the caption "End of 2025: stocks ≈ $75,300.". The fixer pass removed it.)
- `tipLane: true` (QA fixer pass): every tip label stacks name over value, and the lines end short of the plot's right edge, so both labels sit beside their own dots at the finish and never on a line (before, "S&P 500 ≈ $75,300" sat on gold's 2025 spike through the verdict).
- `flagHold: 1.5` (condensed; 3.0 in round 2, 5 in the assembly pass): a flag label clears after 1.5 s, three race years at 0.5 s a year (3.0 s would keep "2008 crash" up into 2011), and its dashed rule fades with it. Each flag figure still shows while its caption is up.
- `emColor: "yellow"` (QA fixer pass): the verdict's "≈ 2×" and its accent rule are in gold's colour, the winner's.
- `rungs` (QA fixer pass): at 15.1 s the y grid gives way to dashed rungs at ×2, ×4, ×8, ×16, so "doubled ≈ 4 times / ≈ 3" has a picture.
- `data.raceT[0] = −0.25` (condensed; −0.4 in round 2): the Scoreboard kit opens mid-race when raceT starts below 0 ("already moving at 0.0 s"). At −0.25 frame 1 comes before the corner clock's first roll. −0.2 also gave a clean clock, but it moved the thuds to 1.27, 4.23 and 6.69 s, and the score's fitted tempo fell from 151.0 to 142.7 BPM, with −5.0% after P. At −0.25 the tempo stays at 151.0 → 154.8 BPM (+2.5%).
- The 2002 flag uses `tone: "neutral"` (white text), with `__≈ −38%__` (red) and `**≈ +21%**` (gold yellow, upright) inside it, so gold's gain is not drawn in crash red.

---

### 04b · Becker rig · "Your $1,000: 16 years of savings VS 1 year of the S&P 500"

*Hook pass 2 (2026-10-07) rewrote this teaser's hook: the handicap duel below replaced the round-2 riddle hook (savings vs the S&P 500, "which one lost?"). Scores and reasons are in the Review log.*

- **Look:** Becker rig, light stage. Two faceless stick figures, each climbing its own line: the hero colour on the S&P 500, neutral grey on the savings line (he walks 170 px behind his tip, in front of the green gap between the two lines, so the two never stack). Maths is in neutral ink; each result is a change in the world. After the race, the payoff card (the lens) drops in over the sky and draws the two gains the hook compares (≈ +$151 vs under +$30) to scale, since the final axis cannot show them; it is the biggest thing on screen.
- **Platform title:** "Can 16 Years in a Savings Account Beat 1 Year in the S&P 500?" (A/B: "16 Years of Savings Interest vs 1 Year of the S&P 500")
- **On-screen hook (header, 13 words):** `Your **$1,000**: 16 years of savings` / `VS 1 year of the S&P 500`
- **Condensed cut (2026-10-13):** this section describes the condensed cut in [`studio/specs-wip/04b-becker-rig-savings-vs-sp500.json`](../../studio/specs-wip/04b-becker-rig-savings-vs-sp500.json) (16.3 s body + the 2.5 s end card = 18.8 s, after the fixer pass; the round-2 cut was 36.0 + 2.5 = 38.5 s). `studio/specs/` keeps the round-2 cut until the ship step promotes it; its timings are in the Review log ("Condensed cut (2026-10-13)").
- **First captions:** "Year one in the S&P: ≈ $151." (complete on frame 1, up to 1.2 s), then "Savings gets 16 years to match it." (1.25-3.35 s). There is no narration: the captions are on-screen text, paced for reading.
- **First 1.5 s:**
  - Frame 1 shows the 2-line header with "$1,000" as the only accent, and the first caption complete. The race is already moving (the race clock starts at −0.2 s, so frame 1 is the round-2 frame 1, x 2010.27): S&P tip "$1,041", savings tip "$1,001", year "2010", stake legend "$1,000 each · Jan 2010", and a 1-line footer. Both figures already stand on their own lines.
  - At 0.54 s the 2010 close lands ($1,150.60 vs $1,002.10) and the race **hit-stops** for 0.56 s: the clock, the year and both counters freeze on "2010 · $1,151 · $1,002" while the green figure cheers (a hop, pop) over the note "year 1: ≈ +$151" (0.55-3.15 s). The caption has said "≈ $151" since frame 1, so a viewer who subtracts gets $151 on screen. At 1.1 s the race sprints to catch up (whoosh) and rejoins its linear clock at 2.6 s.
  - At 1.25 s the grey figure strikes a "think" pose. The goal "goal: ≈ +$151" sits under his counter in ink, at up to 44 px, over a dashed rule (the dashed goal track the payoff card shows later), until the race ends (11.79 s), while his own counter crawls from $1,002 to ≈ $1,020 and the year counter runs to 2025. That is the visible open loop: a target against a counter.
- **Hook rules it satisfies:**
  - **R1:** "$1,000" in the header and two live tip counters at 0.0 s, already moving.
  - **R2:** one input, $1,000. The "16" and the "1" are the handicap, not inputs (judge 1 counted them against it: three numbers in the header).
  - **R3, R4:** everyone has a savings account, and $1,000 is an amount most viewers have parked in one.
  - **R5:** the header plants the belief that interest adds up: 16 years of savings ought to catch 1 year of stocks. Viewers on today's 4% high-yield accounts hold it. Savings earned under $30 in 16 years; the S&P 500 made ≈ $151 in its first year alone.
  - **R6:** "Your $1,000" (the stake legend adds Jan 2010).
  - **R7:** both rivals are named in the header.
  - **R8:** 13 words.
  - **R9:** the goal note against the crawling counter, with the year counter running to 2025.
  - **R10:** the first payoff, "≈ $151", is in the caption from frame 1, and "year 1: ≈ +$151" is on screen at 0.55 s, while the hit-stop holds the counter on $1,151.
  - **R11:** the hook line asks; the verdict is on screen and in the caption after the fold.
  - **R12:** a lopsided verdict you can repeat, taking a side: "The S&P 500's 2010 alone beat 16 years of savings." The payoff card shows it to scale first: a grey stub on a dashed track (under +$30) against a full green bar (≈ +$151), about 6 to 1.
- **Modelled on:**
  - HD Guy H07 "Which is cheaper? 1 Missile or 75 Rounds/Second" (11,957,600, 3.81x): a lopsided duel between units of different size.
  - Debt Freedom H49 (382,100, 289.1x): two options of different shape and a one-number verdict.
  - Master Money H84 (3.0M, 140x): the first answer lands before 3 s.
  - ChartOrbit H17 (2,808,307, 345.09x): the race is already moving at frame 1.
  - Becker devices from alan-becker.md §4 and §6: "one number going up is a complete story" (the hero's counter against the crawl), and impact frames on the 2022 drop.
- **Wrong belief it exploits:** "Interest adds up: give a savings account long enough and it earns what stocks make in a year." At the FDIC national average it did not come close: $1,000 earned $23.85 in 16 years, while the S&P 500 made $150.60 in 2010, its first year. The ledger-duel lane owns "2 people" headers and high-yield vs big-bank savings (07c), and 07b runs the "sold in the crash" twist; this teaser is a handicap race. The buying-power twist (savings lost ≈ 32% of its buying power) moved to the pinned comment.

**Beat sheet** (condensed cut, 2026-10-13: race x 2010.0 → 2025.99 over t −0.2 → 11.79 s, 0.75 s per year, with a hit-stop at the 2010 close: frozen 0.54-1.1 s, catching up until 2.6 s; payoff card 12.9-13.96 s; verdict at 14.8 s; body 16.3 s + the 2.5 s end card = 18.8 s; the fixer pass made the card's last row a shot)

| t (s) | On screen (Becker actions from `lookOpts.beats`) | Caption |
|---|---|---|
| 0.0 | Header. Race already moving: S&P tip "$1,041", savings tip "$1,001", year "2010", stake legend "$1,000 each · Jan 2010". Footer "Savings: FDIC avg · S&P w/ dividends" (one line). Both figures on their own lines | "Year one in the S&P: ≈ $151." (complete on frame 1, up to 1.2) |
| 0.54 | The 2010 close lands ($1,150.60 vs $1,002.10). **Hit-stop**: the race freezes on 2010 · $1,151 · $1,002. Hero **cheers** (a hop), note "year 1: ≈ +$151" (0.55-3.15). Pop | (continues) |
| 1.1 | The race sprints to catch up (whoosh): peak 1.86× speed, linear again at 2.6 s. The 2011-2013 closes land at 1.80, 2.21 and 2.79 s | — |
| 1.25 | Grey figure **thinks**, ink goal note "goal: ≈ +$151" over a dashed rule, held to 11.79 s while his counter crawls ($1,002 → ≈ $1,020). Swipe | "Savings gets 16 years to match it." (1.25-3.35) |
| 3.4 | The S&P tip has just passed $2,000 ($2,005; the 2014 close, $2,051.29, lands at 3.54 s): hero **cheers**, his counter pops. Ding | "Stocks have already doubled." (3.4-5.25) |
| 5.3 | Grey figure **peeks** at his counter, which pops; the savings tip reads $1,007.68 → $1,008.91 while the caption shows. Tick | "Savings? Under $10 so far." (5.3-6.62) |
| 6.54 | 2018 stumble ($2,836.60 → $2,712.35) | — (a 0.58 s breath while the race runs) |
| 7.79 | The S&P tip passes $4,000 (x 2020.65): hero **pumps** a fist, his counter pops; the grey figure **gapes** (shocked). Pop | "2020: stocks top $4,000." (7.2-9.3) |
| 9.17-9.54 | "Bear market" chip in the HUD; a crash band frames the fall. The 2022 close ($4,450.76) lands at 9.54 s: hero takes an **impact** (hit, shake, red hit lines), label "2022: ≈ −18%" (9.54-12.14) | "2022: stocks drop ≈ 18%." (9.35-11.75) |
| 11.79 | Race ends. Hero **grows**, tip pinned "≈ $8,280" on the gold plate (he jumps; the plate lands at 12.49 s: hit + cash). Roll. Savings tip "≈ $1,020"; grey figure **shrugs**, label "under +$30" (11.79-14.39), then sits on his ledge. Boing at 11.89 | "2025: savings made under $30 in 16 years." (11.8-13.55) |
| 12.9 | The **payoff card** (lens) drops in over the stake legend; the gold plate steps back. Row 1, "16 years of savings": a grey stub grows on its dashed track and "under +$30" lands at 13.39 s. Row 2, "S&P 500 in 2010", waits dim over its empty dashed track. Pop | (continues) |
| 13.6 | Hero **points back** up at the card. Row 2 turns green and its bar shoots the full width in 0.3 s (`d`; whoosh 13.7, 0.35 s) | "The S&P's first year alone: ≈ $151." (13.6-14.8; its words pop in as the bar shoots, complete by 13.97) |
| 13.96 | "≈ +$151" (72 px) lands with a card punch and a shake (pop). The hero **punches the air** (a fist pump) as it lands. The savings stub is 0.158 of the bar, to scale | (continues) |
| 14.36 | Hero **cheers**: a hop that lands as the verdict lands | (continues) |
| 14.8-16.3 | Verdict: "The S&P 500's **2010 alone** / beat 16 years of savings." Thud. The card stays up beside it. It holds 1.5 s | — |
| 16.3-18.8 | The end card (the brand layer, unchanged) | — |

**Captions** (on-screen text, no narration; the same 8 lines, word for word, as the round-2 VO, retimed for reading: each is up at least max(1.2 s, 0.12 s a word); the Becker Rig hides captions under the verdict, so the last one ends as it lands):

| # | Up (s) | Caption |
|---|---|---|
| 0 | 0.0 (from −0.4, its words popped in before frame 1) – 1.2 | Year one in the S&P: ≈ $151. |
| 1 | 1.25 – 3.35 | Savings gets 16 years to match it. |
| 2 | 3.4 – 5.25 | Stocks have already doubled. |
| 3 | 5.3 – 6.62 | Savings? Under $10 so far. |
| 4 | 7.2 – 9.3 | 2020: stocks top $4,000. |
| 5 | 9.35 – 11.75 | 2022: stocks drop ≈ 18%. |
| 6 | 11.8 – 13.55 | 2025: savings made under $30 in 16 years. |
| 7 | 13.6 – 14.8 | The S&P's first year alone: ≈ $151. |

(The round-2 line "It ended at ≈ $8,280." is still gone: the final sits on the gold plate from 11.79 s and in the description.)

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
  | start (Dec 31, 2009 close) | −0.20 | $1,000.00 | $1,000.00 |
  | frame 1 (x 2010.27) | 0.00 | $1,040.54 | $1,000.57 |
  | 2010 | 0.54 | $1,150.60 | $1,002.10 |
  | 2011 | 1.80 | $1,174.88 | $1,003.70 |
  | 2012 | 2.21 | $1,362.86 | $1,004.81 |
  | 2013 | 2.79 | $1,804.29 | $1,005.66 |
  | 2014 | 3.54 | $2,051.29 | $1,006.26 |
  | 2015 | 4.29 | $2,079.60 | $1,006.87 |
  | 2016 | 5.04 | $2,328.32 | $1,007.47 |
  | 2017 | 5.79 | $2,836.60 | $1,008.08 |
  | 2018 | 6.54 | $2,712.35 | $1,008.68 |
  | 2019 | 7.29 | $3,566.47 | $1,009.44 |
  | 2020 | 8.04 | $4,222.70 | $1,010.35 |
  | 2021 | 8.79 | $5,435.04 | $1,010.95 |
  | 2022 | 9.54 | $4,450.76 | $1,011.56 |
  | 2023 | 10.29 | $5,620.86 | $1,014.90 |
  | 2024 | 11.04 | $7,027.20 | $1,019.67 |
  | 2025 | 11.79 | $8,283.66 | $1,023.85 |

- **Race clock (condensed cut):** 11.99 s for 15.99 years = 0.74984 s per year. Frame 1 is x = 2010 + 0.2 ÷ 0.74984 = 2010.2667, so the tips read $1,040.57 → "$1,041" and $1,000.57 → "$1,001" (the round-2 frame 1: 24.0 s at 1.50094 s per year from −0.4 s gave x 2010.2665). The **hit-stop** (`lookOpts.hitStop`) freezes the clock as it reaches the 2010 close (x 2010.99, at 0.542 s) and holds it to 1.1 s; then a cubic catch-up (speed 0 at 1.1 s, 1 at 2.6 s, peak 1.86×) brings it back to the linear clock at 2.6 s. So the 2011-2013 closes land at 1.80, 2.21 and 2.79 s (table above), and every beat from 2.6 s on keeps the linear clock: the check models the warp and tests that no year-synced caption, flag or beat comes before 2.6 s. (Round 2: frozen 1.086-2.95 s, linear again at 6.6 s.)
- **"Year one in the S&P: ≈ $151":** the S&P 500's 2010 total return was +15.06%, so $1,000 × 0.1506 = **$150.60 → ≈ $151** (the notes read "≈ +$151"). The caption is up from frame 1 to 1.2 s; the 2010 close lands at 0.542 s and the note pops at 0.55 s (it shows to 3.15 s), while the hit-stop holds the counter on $1,151 and the year on 2010 (0.54-1.1 s): $1,151 − $1,000 = $151 on screen.
- **Not a cherry-picked year:** over the 16 years the S&P 500 grew ×8.28366, a CAGR of 8.28366^(1/16) − 1 = **14.13%** a year (arithmetic mean 14.98%). 2010's 15.06% sits next to it. The best year was 2013 (+32.39%).
- **"Savings gets 16 years to match it" / "under $30 in 16 years":** 16 years of interest is $1,023.85 − $1,000 = **$23.85**, under $30, and far short of the ≈ $151 goal. In the input sweep below it runs **$22.62-$24.97**. The January-rate model understates 2022-2023 by about a dollar each, so the worst case is about $26.97: still under $30 in every table. Year 1 ÷ 16 years of interest = 6.3× (5.6× in the worst case); the ratio is not displayed.
- **"Stocks have already doubled":** the 2014 close ($2,051.29) is the first year-end at 2× the stake. The S&P tip passes $2,000 at 3.385 s (x 2014.78), and the caption comes up at 3.4 s (tip $2,004.61); it stays over $2,000 for the whole caption (3.4-5.25 s), as the 2015 close ($2,079.60) and every later one are over it too.
- **"Under $10 so far":** while the caption shows (5.3-6.62 s, plus its 0.15 s fade: the check tests to 6.77 s, x 2019.30), the savings tip reads $1,007.68 → $1,008.91, so interest so far is $7.68-$8.91. Across the sweep the earliest table to reach $10 does so at x 2019.39, after the caption has gone (the base table at x 2020.61). It is a bound the live tip holds, so it carries no label; the goal note stays up, the grey figure peeks at his counter and the counter pops.
- **"2020: stocks top $4,000":** the S&P passes $4,000 between the 2019 close ($3,566.47) and the 2020 close ($4,222.70), at x 2020.65 (7.79 s), and no later year-end is under it. The caption comes up 0.59 s before that (7.2 s, while the tip climbs through 2019's rally), the fist pump lands on the crossing, and the tip stays over $4,000 to the caption's end (9.3 s). It rests only on the S&P data: a savings line here ("savings hits $10") was rejected, because whether interest first passes $10 in 2019, 2020 or 2021 depends on the uncertain FDIC midpoint years.
- **"≈ 18%":** the S&P 500's 2022 return, −18.11%. Its caption (9.35-11.75 s) comes up 0.19 s before the 2022 close and the impact label "2022: ≈ −18%" (9.54-12.14 s).
- **"$30"** is in the caption 11.8-13.55 s, while the shrug label "under +$30" shows (11.79-14.39 s) and, from 13.39 s, the card's row 1. The caption starts as the race ends (2025's segment ends at 11.79 s).
- **"The S&P's first year alone: ≈ $151"** is up 13.6-14.8 s; the payoff card's S&P row shoots from 13.7 s (0.3 s) and lands "≈ +$151" at 13.96 s, inside it, and holds to the end.
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
- **Instagram Reels:** caption line 1 is "Can 16 years of savings beat 1 year of stocks?"; the verdict comes after the fold. Cover = the 14.3 s frame of the condensed cut, after the card's shake and before the last hop (or any frame of the verdict hold, 14.8-16.3 s, where the card stays up; 29.5 s in the round-2 cut) (the payoff card: the grey "under +$30" stub on its dashed track against the full green "≈ +$151" bar, the dimmed gold "≈ $8,280" beside it) as an A/B against frame 1. The benchmark gives no Becker-style precedent (no character breakouts, X3 in the looks file), so this is the test of the look.
- **TikTok:** caption "16 years of savings vs 1 year of the S&P 500. $1,000 each, since 2010. Not advice." (no verdict in line 1).

**lookOpts (Becker rig):**
- `stage: "light"`.
- `figures`: series 0 hero; series 1 neutral, with `lag: 170` (he walks 170 px behind his tip whenever the two tips are closer than about 1.45 figure heights, which is the whole race here) and `outline: 6` (a thin halo, so the green line passes behind him rather than through him).
- `fill: "gap"` (fixer pass): the pale green fills only between the S&P line and the savings line, so the green area is the gap the video is about, not the $0-$1,000 band.
- `hitStop: { x: 2010.99, until: 1.1, rejoin: 2.6 }` (fixer pass; condensed timings, round 2 `until: 2.95, rejoin: 6.6`): see the race clock above. The 0.56 s freeze is covered by the cheer hop, so it is not a still moment.
- `beats`, each on its picture and inside its caption (condensed timings):
  - cheer (0.55 s, the 2010 close, note "year 1: ≈ +$151");
  - think (1.25 s, `d` 10.54, `chip`: the goal note "goal: ≈ +$151" in ink over a dashed rule, held to the race end);
  - cheer (3.4 s, `pulse`: as "Stocks have already doubled." comes up, just after the tip passes $2,000; his counter pops);
  - peek (5.3 s, `d` 1.32, `pulse`: the grey figure peeks at his counter under "Savings? Under $10 so far."; it pops);
  - pump (7.79 s, `d` 1.0, `pulse`: as the tip passes $4,000) and shocked (7.79 s, `d` 1.0: the grey figure gapes);
  - impact (9.54 s, the 2022 close, "2022: ≈ −18%");
  - grow (11.79 s);
  - shrug (11.79 s, "under +$30");
  - pointBack (13.6 s, `d` 0.76): he points back up over his shoulder as the card's S&P row shoots (no note: the row carries "≈ +$151");
  - pump (13.96 s, `d` 0.75; fixer pass): he punches the air as "≈ +$151" lands. The pose blends over the point and stays at full weight until the hop takes over (the kit fades a beat over its last 0.35 s, so `d` = 0.4 + 0.35);
  - cheer (14.36 s): a hop (0.44 s) that lands as the verdict lands (14.8 s). In round 2 the hop started at the verdict.

  A note shows for max(2.6 s, `d`), cut by the next note on the same figure. Each "≈" before a "+$" or "−" figure in a note is followed by a no-break space so the note never splits "≈" from its number.
- `lens`: `t` 12.9 (condensed: once the plate has landed, under "2025: savings made under $30 in 16 years."; round 2: 26.2, as the shrug note ended); rows `{ series: 1, from: 2010, to: 2025.99, label: "16 years of savings", display: "under +$30" }` and `{ t: 13.6, d: 0.3, series: 0, from: 2010, to: 2010.99, label: "S&P 500 in 2010", display: "≈ +$151" }`. `d` is the kit's opt-in row grow time (fixer pass, `looks/becker-rig/formats/chart-race.js`): the payoff row's bar shoots in 0.3 s instead of easing in over 0.85 s. Bar lengths are valueAt(to) − valueAt(from) of the series' own points; the values are the display strings. Since the fixer pass the card is the payoff: it drops in over the stake legend (the legend and the year fade), each row stacks its label (44 px), its value (64 px; 72 for the largest gain) and a 36 px bar on one scale over a dashed track the length of the largest bar (the goal the savings never reached), the gold plate dims while it is up, and the gridlines under it and the crash band fade. A row waits as a dim label over its empty track, then its bar grows (0.35 s + 0.5 s × its share of the longest, or its own `d`) and its value pops 0.04 s before the bar is full; the largest lands with a 2.5% card punch and a shake. The finished chart would pull back (the value axis rescales) if the card did not fit above the lines and flags under it; here it fits as is.
- `events`: one flag, "Bear market" at x 2022.5 (fixer pass: the "COVID" flag marked nothing on annual closes, 2020 closed +18.4%, and the chip no longer repeats the year the impact note carries).
- `gag`: a one-paragraph staging note.
- Not used any more: the round-2 flood beat (the "prices" tide). The buying-power fact sits in the pinned comment. Both judges noted that cutting it drops the strongest twist; it is the first thing to restore if the duel underperforms.

---

### 04c · Scoreboard · "POV: In 2016 you invested $10,000 in USA vs EUROPE"

*Ported to Scoreboard on 2026-10-08 (it was built in Live Sheet, now retired; the old spec is in `studio/specs/retired/`). The hook, the VO, every number and the verdict are unchanged. What changed is how the screen carries them; see "Port to Scoreboard (2026-10-08)" in the Review log.*

- **Look:** Scoreboard, the same chart-race kit as 04a: black bars, stage `#0E1116`, money green `#2BFF88` for the USA (the decade winner), second-contender yellow `#FFD23F` for Europe, Anton header, the hero odometer in the top bar, the footer as the one-line working. The race is two neon lines with live tip counters, a dashed $10,000 stake line, the corner year clock, crash flags in the strip above the plot, and ×2 / ×4 doubling rungs. Before the race, the plot holds a cold open: the 2025 duel as two neon columns to scale.
- **Topic change from the seed:** the seed was "US vs international since 2010, $10,000 each".
  - **Europe instead of "international":** it is the one country pair in the benchmark with a 345.09x multiple and 4× the comment rate (national rivalry). "International" is an unnamed set (R7).
  - **2016 instead of 2010:** MSCI's own factsheet, the primary source for MSCI Europe, covers 2012-2025, so 2010-2011 could not be two-sourced. A 10-year window (Jan 2016 → Dec 2025) also gives Jake's "10 years" grammar.
- **Platform title:** "What If You Invested $10,000 in the USA and EUROPE in 2016?" (A/B: "Europe Won 2025. Who Won the Decade?")
- **On-screen hook (header, 10 words):** `POV: In 2016 you invested **$10,000** in` / `USA vs EUROPE` (kept: it is H17's 345x header almost word for word).
- **Condensed cut (2026-10-13):** this section describes the condensed cut in [`studio/specs-wip/04c-scoreboard-usa-vs-europe.json`](../../studio/specs-wip/04c-scoreboard-usa-vs-europe.json) (15.9 s body + the 2.5 s end card = 18.4 s; the round-2 cut was 36.5 + 2.5 = 39 s). `studio/specs/` keeps the round-2 cut until the ship step promotes it; its timings are in the Review log ("Condensed cut (2026-10-13)").
- **First captions:** "2025: Europe beat the USA ≈ 2 to 1." (complete on frame 1, up to 1.55 s), then "Who won the decade?" (1.6 s, as the race starts). There is no narration: the captions are on-screen text, paced for reading.
- **Hook rules it satisfies:**
  - **R1:** "$10,000" in the header and the hero ("EACH $10,000"), and the claim itself at frame 1: two columns, "+17.88%" (USA) and "+35.41%" (Europe, lit), Europe's bar twice the USA's, beside the corner clock's "2025".
  - **R2.**
  - **R4.**
  - **R5:** the first caption plants the belief the ending breaks ("Europe is beating the US now"), and the ask in the flag strip ("2016 → 2025: who won?") turns it into a loop.
  - **R6.**
  - **R7:** named countries.
  - **R8:** 10 words.
  - **R9:** a fixed 2016-2025 x-axis with even year ticks (2016-2024), so the remaining years are countable.
  - **R10:** the claim is on screen from frame 1 (the cover), and it moves from frame 2: Europe's column bumps (0.02 s, silent), a dashed rule halves its bar and "≈ ×2" slams into the half above it (0.22 s); the rewind starts at 0.55 s, the race at 1.25 s, and its first close lands at 2.2 s.
  - **R11.**
  - **R12:** "Europe won 2025. The USA won the decade."
- **Modelled on:**
  - ChartOrbit H17, "POV: In 2008 You invested $5000 in [US flag] VS [EU flag]" (2,808,307 views, 345.09x, 1,220 comments).
  - ChartOrbit H19, "What If You Invested $5,000 in USA and CHINA?" (1,068,784, 5.18x).
  - Jake's H78/H80, "2 people invest $10,000 / 10 years ago" (322,339 / 276,471).
  - HD Guy's scoreboard grammar for the cold open (a duel of big neon numbers before the race).
  - Contrast cases we avoid: S&P500 and NASDAQ100 48,161 and USA and CANADA 30,478. That is why the labels say USA and EUROPE, with the index names under the hook columns.
- **Wrong belief it exploits:** "Europe is beating the US now." In 2025, Europe +35.41% vs the USA +17.88%, ≈ 2 to 1. Over the decade, the USA ≈ $39,800 vs Europe ≈ $22,700: the USA ≈ doubled twice, Europe once.

**Beat sheet** (condensed cut, 2026-10-13: the cold open 0-1.25 s; race x 2016.0 → 2025.99 over t 1.25 → 10.8 s, 0.96 s per year; the USA is held at its 2024 close from 9.84 s and draws its 2025 leg over 11.1 → 12.1 s; Europe's final at 12.9 s; verdict at 14.4 s; body 15.9 s + the 2.5 s end card = 18.4 s)

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | The cover. Header. Hero "EACH $10,000". Footer "Total return in US$ · no fees or tax". The plot holds the hook: two neon columns to scale, "+17.88%" over a tinted green bar named USA and "+35.41%" over a glowing yellow bar named EUROPE (lit), "S&P 500" / "MSCI Europe" under the floor, the corner clock on "2025", the ask "2016 → 2025: WHO WON?" in the flag strip | "2025: Europe beat the USA ≈ 2 to 1." (complete on frame 1, up to 1.55) |
| 0.02 | Europe's "+35.41%" bumps with a glow flare (from frame 2; silent: `hook.litCue` false, the opening downbeat is its sound) | (continues) |
| 0.22 | A dashed rule wipes from the top of the USA's bar across Europe's, crossing it at half its height (0.505), in stage ink over the lit bar; "≈ ×2" slams in above it. Tick | (continues) |
| 0.55-1.05 | The rewind: the ask, the rule and "≈ ×2" clear, the counters roll down with their bars, the bars drain into the floor, the clock rolls back 2025 → 2016. Roll | (continues) |
| 1.05-1.25 | The race fades in: y axis, the dashed $10,000 stake line, both tips at the stake. At 1.25 it starts. Whoosh | "Who won the decade?" (1.6-3.55) |
| 2.2 | 2016 close: USA $11,196, Europe $9,960. The hero follows the leader, "USA", live | (continues) |
| 4.02-4.11 | The flag "2018: EUROPE ≈ −15%" (white, EUROPE yellow, "≈ −15%" red), held 1.8 s (to 5.27). 2018 close at 4.11: $13,043 / $10,643. The footer cuts to "2018: USA −4.38% · Europe −14.86%". The clock holds "2018" to 4.61. Thud | "2018: Europe drops ≈ 15%." (3.6-5.88) |
| 5.27 | "COVID" flag (to 7.07) | (continues) |
| 5.93-6.02 | The USA tip passes $20,000 (5.93); 2020 close at 6.02 ($20,305): a dashed "×2" rung wipes in at $20,000 over the live grid, only as far as the tips. The footer cuts to "2020: USA $20,305 ≈ $10,000 × 2.03". The clock holds "2020" to 6.52. Ding | "2020: the USA has doubled your money." (5.93-7.4) |
| 7.45 | The footer cuts to "Europe: still under $17,000"; Europe's tip bumps and its halo flares (`tipBeats`, soft pop). "2022 BEAR MARKET" flag (7.46-9.26); 2022 close at 7.93: $21,402 / $13,713 | "Europe? Still under $17,000." (7.45-9.8) |
| 9.84 | 2024 close. The USA stops there (`holdBack`): its tip holds "$33,791". The hero hard-cuts to "EUROPE", live, as Europe draws its 2025 leg alone. The footer cuts to "2025: USA +17.88% · Europe +35.41%". Swipe | "2025: Europe jumps ≈ 35%." (9.85-11.05) |
| 10.43 | The flag "2025: EUROPE ≈ +35%" (to 11.93). Tick | (continues) |
| 10.8 | Europe's line ends on its exact 2025 close: its tip and the hero hold "$22,661" (no "≈", no land: a late `finalT`) | (continues) |
| 11.1-12.1 | The USA draws its 2025 leg (+17.88%) under the kit's riser. The hero cuts to "USA" and rolls with the line, $33,791 → $39,833 (`follow`, swipe). The footer: "USA: $33,791 × (1 + 17.88%)" | "Final: USA ≈ $39,800." (11.1-12.35) |
| 12.1 | The climax: the USA's tip and the hero land "≈ $39,800" with the 1.13 bump, glow, floor flare and the tip flare. Hit + cash | (continues) |
| 12.4-12.9 | The footer: "Europe: $16,735 × (1 + 35.41%)" (= $22,661, the figure on Europe's tip). At 12.9 the rounded final lands: Europe's tip turns to "≈ $22,700" with a bump, and the hero hard-cuts to "EUROPE ≈ $22,700" (bump, glow, pop) | "Europe ≈ $22,700." (12.4-13.6) |
| 13.65 | The y grid gives way to the rungs: "×4" wipes in at $40,000, just over the USA's dot; Europe's sits over ×2. The hero cuts back to "USA ≈ $39,800" (`heroSteps`, swipe). The footer: "USA ≈ ×3.98 · Europe ≈ ×2.27" (one step for both multiples, each name in its colour). Tick | "The USA ≈ doubled twice. Europe, once." (13.65-14.85; it runs on under the verdict, which sits above the caption band) |
| 14.1-14.4 | The plot compresses above the verdict band. At 14.4 the verdict slams in: "Europe won **2025**. / The USA won the **decade**.", "2025" in Europe's yellow, "decade" in the USA's green, a green rule. The hero stays on the USA. Ding. It holds 1.5 s | — |
| 15.9-18.4 | The end card (the brand layer, unchanged) | — |

**Captions** (on-screen text, no narration; the same 9 lines, word for word, as the round-2 VO, retimed for reading: each is up at least max(1.2 s, 0.12 s a word), back to back 0.05 s apart):

| # | Up (s) | Caption |
|---|---|---|
| 0 | 0.0 (from −0.4, so complete on frame 1) – 1.55 | 2025: Europe beat the USA ≈ 2 to 1. |
| 1 | 1.6 – 3.55 | Who won the decade? |
| 2 | 3.6 – 5.88 | 2018: Europe drops ≈ 15%. |
| 3 | 5.93 – 7.4 | 2020: the USA has doubled your money. |
| 4 | 7.45 – 9.8 | Europe? Still under $17,000. |
| 5 | 9.85 – 11.05 | 2025: Europe jumps ≈ 35%. |
| 6 | 11.1 – 12.35 | Final: USA ≈ $39,800. |
| 7 | 12.4 – 13.6 | Europe ≈ $22,700. |
| 8 | 13.65 – 14.85 | The USA ≈ doubled twice. Europe, once. |

**The maths**

- **Recurrence:** V(year) = V(year − 1) × (1 + r(year)), from $10,000 at the Dec 31, 2015 close.
  - USA r = S&P 500 total return.
  - Europe r = MSCI Europe net total return in US dollars.

  | Year-end | t (s) | USA (S&P 500) | Europe (MSCI Europe) | Returns (USA / Europe) |
  |---|---:|---:|---:|---|
  | start (Dec 31, 2015 close) | 1.25 | $10,000.00 | $10,000.00 | — |
  | 2016 | 2.20 | $11,196.00 | $9,960.00 | +11.96% / −0.40% |
  | 2017 | 3.15 | $13,640.09 | $12,500.80 | +21.83% / +25.51% |
  | 2018 | 4.11 | $13,042.65 | $10,643.18 | −4.38% / −14.86% |
  | 2019 | 5.06 | $17,149.78 | $13,173.06 | +31.49% / +23.77% |
  | 2020 | 6.02 | $20,305.34 | $13,881.77 | +18.40% / +5.38% |
  | 2021 | 6.98 | $26,135.01 | $16,144.50 | +28.71% / +16.30% |
  | 2022 | 7.93 | $21,401.96 | $13,713.14 | −18.11% / −15.06% |
  | 2023 | 8.89 | $27,028.53 | $16,440.68 | +26.29% / +19.89% |
  | 2024 | 9.84 | $33,791.07 | $16,734.97 | +25.02% / +1.79% |
  | 2025 | 10.80 (Europe) / 12.10 (USA, held back) | $39,832.91 | $22,660.82 | +17.88% / +35.41% |

  The tip counters show each line's value live, to the dollar, between the closes (an interpolation, as in 04a).
- **The hook columns:** the 2025 returns, +17.88% (S&P 500) and +35.41% (MSCI Europe), each bar to scale. The dashed rule at the USA's top crosses Europe's bar at 17.88 ÷ 35.41 = 0.505 of its height, the picture of "≈ 2 to 1", and the tag above it reads "≈ ×2" (35.41 ÷ 17.88 = 1.98, so it carries "≈").
- **"≈ 2 to 1" (hook) and "≈ 35%":** 35.41% ÷ 17.88% = 1.98; 35.41 → 35. The USA's 17.88% is on screen (the hook column, the 2025 footer step, the finale step) but not spoken.
- **The working line (footer steps):**
  - 2018: "USA −4.38% · Europe −14.86%", on screen from the 2018 close (4.11 s) to 6.02 s, while the caption "2018: Europe drops ≈ 15%." (3.6-5.88 s) and the flag "2018: Europe ≈ −15%" (4.02-5.27 s) show.
  - 2020: $20,305.34 ÷ $10,000 = 2.0305 → "$20,305 ≈ $10,000 × 2.03" ($10,000 × 2.03 = $20,300, so "≈").
  - "Europe: still under $17,000", from 7.45 s (with its caption) to 9.85 s. It ends as Europe's 2025 leg starts: Europe's tip passes $17,000 only at about 9.89 s.
  - 2025: "USA +17.88% · Europe +35.41%", from 9.85 s (with "2025: Europe jumps ≈ 35%.") to 11.1 s, while the flag "2025: Europe ≈ +35%" (10.43-11.93 s) shows.
  - Under the verdict the footer keeps the doublings step. (The round-2 cut returned to the basis line "Total return in US$ · no fees or tax" at the verdict, as the loop's seam; the end card is the seam now, and frame 1 still opens on the basis line.)
  - The finale: $33,791 × 1.1788 = $39,832.83 → ≈ $39,800; $16,735 × 1.3541 = $22,660.86 → ≈ $22,700. Both inputs are the 2024 closes to the dollar, and both products round to the true closes ($39,833, $22,661), so the steps need no "≈".
  - The doublings: "USA ≈ ×3.98 · Europe ≈ ×2.27" (13.65 s, with "The USA ≈ doubled twice. Europe, once." and the ×4 rung). In the condensed cut every working step stays up at least 1.2 s, so the round-2 cut's two doublings steps ("USA: ≈ ×3.98 ≈ 2 doublings", "Europe: ≈ ×2.27 ≈ 1 doubling") are one; the doublings themselves are in the caption and on the ×2 / ×4 rungs.
- **"≈ 15%":** Europe 2018, −14.86% (the flag shows it signed, "≈ −15%"; the 2025 flag "≈ +35%" is +35.41%).
- **"doubled" (2020):** the first USA year-end at or above $20,000 is 2020 ($20,305.34; 2019 was $17,149.78). Europe first passes $20,000 only in 2025. The ×2 rung sits at $20,000 = 2 × the stake. The caption comes up as the USA tip passes $20,000 (5.93 s), so through all of it (5.93-7.4 s) the tip reads at least $20,008.
- **"Still under $17,000":** Europe's highest year-end before 2025 is $16,734.97 (2024). Through the whole caption (7.45-9.8 s) its tip stays under that, and Europe's 2025 leg starts only after the USA is held at 9.84 s. The step that says it shows 7.45-9.85 s, and the tip stays under $17,000 for all of it ($16,772 at 9.85 s).
- **The hold-back:** the USA stops at its 2024 close ($33,791) at 9.84 s, so the hero shows Europe's jump under "2025: Europe jumps ≈ 35%."; the USA's own 2025 leg draws over 11.1-12.1 s, under "Final: USA ≈ $39,800.", and its final lands at 12.1 s.
- **Finals:** $39,832.91 → **≈ $39,800**; $22,660.82 → **≈ $22,700**. Europe's tip and the hero hold the exact close, "$22,661", from the end of its line (10.8 s) until its caption is up (12.9 s, 0.5 s into "Europe ≈ $22,700."); the rounded figure first lands then.
- **Multiples:** 3.9833 → "≈ ×3.98" ($10,000 × 3.98 = $39,800); 2.2661 → "≈ ×2.27" ($22,700).
- **Per year:** 3.9833^(1/10) − 1 = 14.82%, **≈ 14.8%**; 2.2661^(1/10) − 1 = 8.52%, **≈ 8.5%** (caption and pinned comment).
- **Doublings:** log₂ 3.9833 = 1.994, just short of 2 ("≈ doubled twice" and "≈ ×3.98 ≈ 2 doublings", so both carry "≈"; the USA's dot ends just under the ×4 rung); log₂ 2.2661 = 1.18 (one completed doubling: "once", "≈ 1 doubling"; Europe ends just over ×2). Rule of 72 for the pinned comment: 72 ÷ 14.8 ≈ 4.9 years per doubling; 72 ÷ 8.5 ≈ 8.5.

**Assumptions** (footer: "Total return in US$ · no fees or tax"; which index is which is named under the hook columns, "S&P 500" and "MSCI Europe"; the window is in the header and the x-axis):
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
- **Instagram Reels:** caption line 1 is "Europe won 2025. Who won the decade?". Cover = frame 1 (the two 2025 columns with Europe lit, the ask, "$10,000" in the hero). Test it against the climax frame (12.1 s in the condensed cut, 24.8 s in round 2: "USA ≈ $39,800" over both finished lines).
- **TikTok:** caption "Europe won 2025. Who won the decade? $10,000 in the USA vs Europe since 2016. Not advice." The national-rivalry comments are the point; don't add a third country (ChartOrbit's three-way titles fell to a 53,469 median).

**lookOpts (Scoreboard; documented in `looks/scoreboard/formats/chart-race.js`'s header):**
- `data.series[].label` "USA" / "Europe": the short names on the tips, the hero tag, the hook columns and the footer (where the kit sets each in its line colour). The full names ("USA · S&P 500", "Europe · MSCI Europe") stay in the spec.
- `hook: { until: 1.25, values: ["+17.88%", "+35.41%"], year: 2025, series: 1, sub: ["S&P 500", "MSCI Europe"], ask: "2016 → 2025: who won?", litT: 0.02, ratioT: 0.22, ratioTag: "≈ ×2", litCue: false }` (new in the kit for the port; condensed timings): the cold open on the claim, in place of the parked race. Frame 1 is the claim (the cover). Europe's column is lit and bumps from frame 2 (`litT` 0.02), so the cold open moves from frame 1; the halving rule wipes and `ratioTag` slams in at 0.22 s, in stage ink where the rule crosses the lit bar. Over 0.55-1.05 s the rewind (counters down with their bars, the clock back to 2016); over 1.05-1.25 s the race fades in. `litCue: false` (new, opt-in, condensed cut): the bump adds no pop, because a pop 20 ms after the opening downbeat needs 7.4 dB of clearance, over the hook's 6 dB DUCK cap; the downbeat is its sound. The clock reads the claim's year at the race's alpha and keeps 24 px under the ask (fixer pass). In round 2 the hook held to 4.8 s, with `litT` 1.15 and `ratioT` 3.46 on the spoken words, and it measured as a 3.4 s still/near-still opening.
- `stakeTag: "each"` (fixer pass, new in the kit): the hero reads "EACH $10,000" while it shows the stake.
- `stakeLine: 10000`, `tipLane: true`: as in 04a. `flagHold: 1.8` (fixer pass; 3.0 before): about two race years at 0.96 s a year; every flag figure shows while its caption is up.
- `events` (fixer pass): the 2018 flag carries Europe's drop, "2018: Europe __≈ −15%__" (neutral, the figure red), and a fourth flag at x 2025.6, "2025: Europe ≈ +35%" (neutral), carries its jump; COVID and the 2022 bear market are unchanged. `flagNames: true` (new in the kit) sets "Europe" in its line colour in the flags, as the footer does.
- `footerSteps` (7 in the condensed cut, 9 in round 2): the working line at the 2018 and 2020 closes (4.11, 6.02 s), "Europe: still under $17,000" at 7.45 s, the 2025 returns at 9.85 s, the finale's two 2025 steps (11.1, 12.4 s), and one doublings step, "USA ≈ ×3.98 · Europe ≈ ×2.27", at 13.65 s that stays under the verdict. Each is up at least 1.2 s, which is why the two round-2 doublings steps became one and the basis-line step under the verdict went (the end card is the loop's seam now). Each fits one 40 px line, so the grid keeps a one-row footer.
- `tipBeats: [{ t: 7.45, series: 1 }]` (fixer pass, new in the kit): Europe's tip label bumps and its halo flares, with a soft pop, as "Europe? Still under $17,000." comes up.
- `yearHold: [2018, 2020]` (fixer pass, new in the kit): the corner clock holds 2018 and 2020 for 0.5 s past their closes, so it never reads the next year while the caption naming that close is fresh.
- `holdBack: { series: 0, t: [11.1, 12.1], follow: true }`: the USA stops at its 2024 close (9.84 s) while Europe jumps; its 2025 leg draws 0.3 s after Europe's line ends, under "Final: USA ≈ $39,800.", with the hero riding it (`follow`, new in the kit) to the climax at 12.1 s.
- `finalT: [12.1, 12.9]`: the USA's final is the climax at 12.1 s; Europe's takes the hero again at 12.9 s, 0.5 s into "Europe ≈ $22,700." (a hard cut with a pop: new in the kit for a non-winner revealed after the finish). A finalT later than the race end is a late reveal: Europe's tip and the hero hold the exact close "$22,661" from 10.8 s and land "≈ $22,700" (tip bump, hero bump, pop) only at 12.9 s.
- `heroSteps: [{ t: 13.65, series: 0 }]` (new in the kit): the hero cuts back to the decade winner as the doublings caption comes up and holds it through the verdict, so the payoff is the last number up top.
- `rungs: { t: 13.65, items: [[20000, "×2", 6.02], [40000, "×4", 13.65]] }`: a third item is a rung's own time (new in the kit). The ×2 rung lands at the 2020 close over the live grid, and until the race ends it reaches only as far as the tips (fixer pass); the ×4 rung, and the grid giving way, come with the doublings caption.
- `emColor: ["yellow", "green"]` (an array is new in the kit): the verdict's "2025" in Europe's colour, "decade" and the rule in the USA's.
- `sfx`: thud at the 2018 close, ding at the 2020 close (the ×2 rung), ding at the verdict. The Live Sheet's riser at 19.9 s was dropped: the kit's own riser now leads into the USA's climax.

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
| 04a | Scoreboard | "POV: In 2000 you put $10,000 in / the S&P 500 VS gold" (12) | "Stocks should crush gold." | $10,000 each, Jan 2000 → Dec 2025 | ≈ $75,300 vs ≈ $150,000 | Gold ≈ 2× the S&P 500 | 45.5 s (condensed: 17.4 s) |
| 04b | Becker rig | "Your $1,000: 16 years of savings / VS 1 year of the S&P 500" (13) | "Year one in the S&P: ≈ $151." then "Savings gets 16 years to match it." | $1,000 each, Jan 2010 → Dec 2025 | ≈ $8,280 vs ≈ $1,020 | The S&P 500's 2010 alone beat 16 years of savings (≈ +$151 vs under +$30, on the payoff card) | 36.0 s (condensed: 16.3 s) |
| 04c | Scoreboard | "POV: In 2016 you invested $10,000 in / USA vs EUROPE" (10) | "2025: Europe beat the USA ≈ 2 to 1." then "Who won the decade?" | $10,000 each, Jan 2016 → Dec 2025 | ≈ $39,800 vs ≈ $22,700 | Europe won 2025; the USA won the decade | 36.5 s (condensed: 15.9 s) |

## Caveats

- **Start dates decide races.** 04a starts at the dot-com peak; from 2010 the S&P 500 wins (≈ ×8.3 vs ≈ ×3.9), and the pinned comment says so. 04c starts in 2016 for a round 10 years inside the 2012-2025 run that MSCI's factsheet covers; from 2012 the gap is wider (≈ ×7.1 vs ≈ ×3.1).
- **No 2026 data on screen.** The races end at the Dec 31, 2025 close (see the decisions above). A refresh after Dec 31, 2026 needs one more year per series.
- **Search-summary provenance.** Every figure was seen only in search summaries, never on the page itself. The **[click-check]** rows need one human click before posting. The weakest inputs are the FDIC readings for 2010, 2021 and 2024 and the five midpoint years; the 04b sweep shows that none of them can change an on-screen figure.
- **Benchmark caveats carry over.** The format's only benchmark channel (ChartOrbit) has collapsed to a ~1,557 median since leaving its formula. Our round-2 lengths (36.5-45.5 s) sat between its 61 s winners and its 31 s decline, by brief. The condensed cuts (15.9-17.4 s bodies, 18.4-19.9 s with the end card) are shorter than either, on the owner's note; the pace per year is the lever (see section (a)).
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


### Port to Scoreboard (2026-10-08): 04c

The owner kept two looks, Scoreboard and Becker rig, and retired Live Sheet, so 04c moved from Live Sheet to Scoreboard. The new spec is `studio/specs/04c-scoreboard-usa-vs-europe.json`. The old one went to `studio/specs/retired/` (`git mv`). The bar to meet was 04a, the Scoreboard chart race already in the look.

**Kept unchanged:** the header, all 9 VO lines and their timings, the verdict, the race clock (x 2016.0 → 2025.99 over 4.8 → 21.8 s), every chart point, the finals, the three event flags, `hold` and the 36.5 s duration. Every number the Live Sheet showed that still has a place is still on screen: the 2018 and 2025 returns, "$20,305 ≈ $10,000 × 2.03", the finale's "$33,791 × (1 + 17.88%)" and "$16,735 × (1 + 35.41%)", "≈ ×3.98 ≈ 2 doublings", "≈ ×2.27 ≈ 1 doubling", and the ×2 / ×4 rungs. The yearly ledger rows (the other 2016-2024 returns) and the per-year formula steps are not on screen any more. The live tip counters carry the race year by year, and the table under "The maths" keeps every return.

**How the Scoreboard carries each Live Sheet device:**

| Live Sheet | Scoreboard |
|---|---|
| Frame 1: the 2025 hook row, Europe's cell lit, the ask pill over the parked race | A cold open on the stage (`lookOpts.hook`): two neon columns to scale, USA "+17.88%" and EUROPE "+35.41%" (lit, bumps as "Europe" is said), the index names under the floor, the corner clock on "2025", the ask in the flag strip. As "≈ 2" is said, a dashed rule from the USA's top halves Europe's bar. The hero holds the $10,000 stake |
| The rewind at 4.8 s (the year counts back) | Over 4.1-4.6 s the counters roll down, the bars drain into the floor and the clock rolls 2025 → 2016. Over 4.6-4.8 s the race fades in (axis, stake line, both tips at $10,000). The two never share a frame |
| Ledger row + value row stepping at each close | Live tip counters (to the dollar), the hero on the leader, and the footer as the working line at the beats the VO names: 2018, 2020, 2025 |
| Formula bar (15 steps) | 8 footer steps (`footerSteps`). The racers' names are set in their line colours |
| The finale's hero rows, each value rolling as it is named | `holdBack` (+ the new `follow`). The USA stops at its 2024 close at 20.10 s, so the hero shows Europe's +35.41% leg as "≈ 35%" is said. The USA's own 2025 leg draws as "Final: USA" is said, and the hero rides it to the climax at 24.79 s ("≈ $39,800": riser, hit + cash, the 1.13 bump). Europe's final takes the hero again at 27.6 s as it is named (`finalT`) |
| `focus` back to the USA at the verdict | `heroSteps`: the hero cuts back to "USA ≈ $39,800" with the doublings line (29.95 s) and holds it through the verdict, so the payoff is the last number up top |
| ×2 / ×4 rungs | The same rungs. The ×2 rung lands at the 2020 close over the live y grid (its own time, a new third item in `rungs.items`); the grid gives way as ×4 lands |
| Verdict card, yellow highlights | The Scoreboard verdict at the foot of the frame, with the plot compressed above it. `emColor: ["yellow", "green"]` sets "2025" in Europe's colour and "decade" (and the rule) in the USA's |

**Kit changes** (`looks/scoreboard/formats/chart-race.js` only; all opt-in, documented in its header): `hook`, `holdBack.follow`, `heroSteps`, `rungs.items[k][2]` (a rung's own time; a grid label a timed rung's label would touch gives way), `emColor` as an array, a pop for a non-winner revealed after the finish, and a small land when the rival still racing lands in the hero at the finish. The baseline moved into its own SVG group (same z-order), so the hook can hide the grid while the columns keep a floor. 04a and both kit samples (`samples/chart-race.json`, `chart-race-2.json`) render **pixel-identical** to before at 13 + 10 sampled times.

**Spec changes beyond id and look:** `data.series[].label` "USA" / "Europe" (the short names on the tips, the hero tag and the columns; the full names stay). The Live Sheet lookOpts are gone (`valueRow`, `hook` row, `formulaAt0`, `formulaSteps`, `focus`, `ledger`, `preroll`, `finale`, `xEven`). The new lookOpts are `stakeLine`, `hook`, `footerSteps`, `flagHold`, `tipLane`, `holdBack`, `finalT`, `heroSteps`, `rungs` and `emColor`. The sfx drop the old riser at 19.9 s, because the kit's riser now leads into the USA's climax at 24.79 s.

**Check:** the 04c section of `checks/04-chart-race.py` is rewritten for the Scoreboard spec. The ledger, value-row, formula-step and focus claims are gone. New claims cover:
- the hook columns (both 2025 returns, the year, the lit series, the index names, the ask, `litT` / `ratioT` on their spoken words, the halving ratio 0.505, and "≈ 2" said while the columns show, before the rewind);
- the 8 footer steps (text, time, one-line width, the `=` / `≈` rounding rule, and both spoken figures said while their step shows);
- the hold-back (the USA stops as vo[5] starts, the hero shows Europe while "≈ 35%" is said, the leg starts with vo[6] and lands as "≈ $39,800" is said);
- `finalT`, `heroSteps`, the timed rungs, `emColor` against the verdict's two emphases, the series labels and default colours, and that no Live Sheet option is left;
- that the USA leads at every year-end (no lead change);
- a stale-text check on the 04c section.

Result: **582 checks, 0 failed** (637 before the port). Mutation test: **11 of 11** broken copies caught (a hook value, a late 2018 step, a wrong 2025 step, a late Europe reveal, a late USA leg, a late ×2 rung, swapped verdict colours, an early halving rule, the hero resting on Europe, a Live Sheet option left in, a rewind that starts before "≈ 2").

**Verified:**
- `node src/cli.mjs check` gives 0 errors and 0 warnings for 04c (also at `--every 0.1`), 04a and both kit samples.
- I read the contact sheet and stills at 0, 1.3, 3.7, 4.05, 4.3, 4.5, 4.62, 4.7, 4.8, 4.85, 7, 9.95, 12.2, 13.6, 16.5, 19, 20.6, 22.1, 22.6, 23.9, 25, 27.8, 29.98, 30.2, 30.3, 32.8, 34 and 36.47 s. Every tip counter matches the model to the dollar: $10,035 / $9,999 at 4.85 s, $13,192 / $10,735 at 9.95 s, $21,362 / $14,292 at 13.6 s, $29,426 / $16,545 at 19 s, the USA held at $33,791 with Europe at $18,482 at 20.6 s, and the USA rolling at $36,341 at 23.9 s. Then come the finals ≈ $39,800 / ≈ $22,700.
- Purity: stills at 1.3, 4.5, 22.6, 25 and 28 s are pixel-identical whether rendered first or after later frames.
- The MP4 is 36.5 s, 1080 × 1920 at 30 fps with 21 SFX cues (`studio/out/04c-scoreboard-usa-vs-europe.mp4`). Frames I pulled from it at 0, 3.7, 25 and 34 s match the stills, with a mean pixel difference of 0.76-0.87 (compression).

**Open (not changed):**
- ~~Europe's final shows on its tip (and in the hero) from 22.25 s, 5.3 s before "Europe ≈ $22,700" is said.~~ Resolved in the fixer pass below: Europe's tip holds its exact close until 27.6 s.
- `teasers/v2/teasers.json` and `slate.json` still list the old id. They are outside this port's files.

### Fixer pass (QA, 2026-10-08): 04c

QA scored the port 8/10, as strong as 04a, with no must-fix items, five shoulds and five nits. Every item was applied. The hook (header and first VO line), every number, the VO wording and timings, the verdict, the race clock, the chart points and the 36.5 s duration are unchanged.

**Shoulds**
1. **The "≈ 2" beat barely showed** (the white halving rule vanished on the yellow bar, and no number went with "≈ 2"). Where the rule crosses the lit bar it is now set in stage ink (6 px dashes, the gaps in the bar's yellow). `hook.ratioTag: "≈ ×2"` (dark Anton, 72 px) slams into Europe's bar above the rule at 3.46 s, as "≈ 2" is said. It carries "≈" because 35.41 ÷ 17.88 = 1.98. The check covers the tag's text, its "≈" and its time.
2. **Frame 1 was cramped at the top** (the ask touched the bright 160 px "2025"). Under a hook the clock now uses the race's own alpha (0.34, not 0.6), and it sits 25 px under the ask for the whole video, so it never moves. The columns give up 13 px, still to scale, so the lit "+35.41%" sits 27 px under the ask (measured on the frame-1 still). The 2025 → 2016 rewind roll is unchanged.
3. **"≈ 15%" was only in the grey footer.** The 2018 flag is now "2018: Europe __≈ −15%__" (neutral, so the text is white; Europe in its yellow; the figure red), as 04a carries its spoken figures in flags. The footer step stays. `flagHold` went from 3.0 to 1.8 s, so "2022 bear market" clears as the next line starts (17.66 s). Every spoken flag figure is still on screen when it is said.
4. **"Europe? Still under $17,000" had no visual beat.** The 17.65 s footer step is now "Europe: still under $17,000", with Europe in its yellow, and Europe's tip label bumps while its halo flares (`tipBeats`, a soft pop). The 2025 step moved from 21.8 to 20.10 s, as "2025: Europe jumps" starts, so the "under $17,000" step never shows after Europe's tip passes $17,000 (at about 20.18 s). The check tests the tip against the bound for as long as the step shows.
5. **The 2025 beat.** (a) A neutral flag at x 2025.6, "2025: Europe ≈ +35%", shows 21.14-22.64 s, while "≈ 35%" is said (22.02 s). (b) Kit: a series whose `finalT` is later than raceT[1] is now a late reveal. Its tip and the hero hold the exact close ("$22,661": no "≈", no settle roll past the close, no early land), and the rounded "≈ $22,700" lands at 27.6 s, with the tip bump, the hero bump and a pop, as it is named. The TF pop and the hero's small land at 22.25 s are gone for 04c. 04a is unaffected: its S&P finalT equals raceT[1].

**Nits**
- **Verdict hold:** a ninth footer step at 33.5 s brings back the basis line "Total return in US$ · no fees or tax", so the basis is on screen as the video loops into frame 1.
- **Untagged hero:** `stakeTag: "each"` makes the hero read "EACH $10,000" (grey caps) while it shows the stake. The tag hands its slot to "USA" when the race starts.
- **Clock rolling as a close is named:** `yearHold: [2018, 2020]` holds the corner clock 0.5 s past those closes. It reads "2018" at 9.95 s and "2020" at 13.45 s.
- **The timed ×2 rung under the USA label:** until the race ends, a timed rung reaches only as far as the race's current x. At 13.45 s it ends at the USA's dot.
- **The rewind:** each bar and its counter drain on one eased curve (at 4.35 s "+8.94%" sits over a half-height bar). The names fade as their bars get too short. The numbers shrink with the drain and fade over its second half, so near the floor they never touch.

**Kit changes** (`looks/scoreboard/formats/chart-race.js` only, documented in its header). All of them are opt-in, or only apply under `hook`: `hook.ratioTag` and the ink rule; the hook clock's alpha and its offset under the ask (`ASK_GAP`); the synced rewind; late reveals for a finalT later than raceT[1] (the old `tfLand` path is removed, since it could only fire for a late reveal); `flagNames`, the footer's name colouring factored out as `paintNames`; `tipBeats`; `yearHold`; `stakeTag`; and a timed rung that ends at the current x. 04a and both kit samples render **pixel-identical** to before at 12 + 9 + 9 sampled times.

**Check:** 614 checks, 0 failed (582 before). New claims cover:
- both figure flags (text from the computed returns, tones, `flagNames`) and their show windows while each figure is said;
- the 2022 flag clearing as vo[4] starts;
- the "$17,000" step, its timing and the tip bound while it shows;
- the 2025 step at vo[5];
- the late reveal (finalT[1] > raceT[1], and the held "$22,661" equal to the finale step's product);
- `ratioTag`, `stakeTag`, `tipBeats` and `yearHold`;
- the basis line under the verdict;
- footer steps in time order.

Mutation test: **12 of 12** broken copies caught (a wrong 2018 flag figure, flagHold 3.0, Europe revealed at the race end, a late "$17,000" step, a ratio tag without "≈", an early 2025 flag, no stake tag, a missing 2020 hold, no basis line at the verdict, the 2025 step back at 21.8 s, "$16,000", the tip beat on the USA).

**Verified:** `check` gives 0 errors and 0 warnings for 04c, 04a and both kit samples. I read stills at 0, 3.7, 4.2, 4.35, 4.5, 9.95, 13.45, 17.8, 21.2, 22.1, 27.3, 27.8 and 34 s against the beat sheet above. The MP4 is re-rendered to `studio/out/04c-scoreboard-usa-vs-europe.mp4`.

### Condensed cut (2026-10-13)

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The precedent is 06c (Becker Rig, 30.5 → 18.2 s) and 06b (Scoreboard, 33.0 → 20.8 s) in [`06-pov-race.md`](06-pov-race.md): keep the hook, every verified number, the verdict wording, the facts and the end card; change the timing first; frame 1 is the thumbnail, with the hook caption complete and something moving from frame 1; no still run of 0.4 s or more before the verdict hold; captions up at least max(1.2 s, 0.12 s a word); the verdict about 0.8-1.5 s after the last reveal, held about 1.2-1.6 s; then the unchanged end card.

**Files:**
- New: `studio/specs-wip/04a-scoreboard-sp500-vs-gold.json`, `studio/specs-wip/04b-becker-rig-savings-vs-sp500.json`, `studio/specs-wip/04c-scoreboard-usa-vs-europe.json` (retimed copies of the round-2 specs).
- Changed: this write-up (the three sections' beat sheets, captions and timings; section (a), the summary table, the caveats and this entry), `checks/04-chart-race.py` (cut-aware), and one opt-in kit flag, `hook.litCue`, in `studio/looks/scoreboard/formats/chart-race.js` (header and code) and `studio/looks/scoreboard/README.md` (the chart-race lookOpts table).
- Not touched: `studio/specs/*.json`, the sound packs, `studio/src/**`, `studio/sound/**`, `studio/test/**`, `publishing/` and `renders/`. Nothing is committed. Renders are in `/tmp/cond/04/<id>/final/` only.

**Kept, character for character:** the three headers, footers and stake legends; every caption (8 or 9 lines each, byte for byte, no-break spaces included: on-screen text now, no narration; the fixer pass restored 04a's last line, which had lost its no-break spaces, and the check now compares the bytes); every chart point and final; every flag label; every footer step text except 04c's doublings (below); the verdicts; the lens card and its strings (04b); the hook columns, ask and "≈ ×2" (04c); every cue kind and gain (only their times moved; 04c's hook pop is dropped, below; 04b's payoff whoosh is 0.35 s long, not 0.8, to match the 0.3 s shot from the fixer pass); the 2.5 s end card (the brand layer).

**Measured before** (`renders/channel/`, frame difference at 270×480: `tblend` difference → `signalstats` YAVG; a difference is still when YAVG < 0.15, near-still when < 0.25; a run of n still differences is n/30 s):

| Teaser | Round-2 cut | Still runs ≥ 0.4 s before the verdict | Near-still before the verdict |
|---|---|---|---|
| 04a | 45.5 + 2.5 = 48.0 s | 32.50-34.40 (1.93), 37.33-39.23 (1.93), 39.53-41.03 (1.53), 41.10-42.20 (1.13): the finish, 1.23 s a year before it | the same stretches (32.40-42.20) |
| 04b | 36.0 + 2.5 = 38.5 s | 1.60-2.23 (0.67) and 2.40-2.97 (0.60), the hit-stop; 25.33-26.10 (0.80), 26.90-27.90 (1.03), 28.33-28.83 (0.53), 29.40-32.67 (3.30) | also 7.97-8.47 |
| 04c | 36.5 + 2.5 = 39.0 s | 0.03-1.13 (1.13) and 1.37-3.43 (2.10), the cold open; 21.83-22.63, 22.70-23.23, 25.33-27.17, 28.40-29.90, 30.63-31.90, 31.97-32.63, 32.77-33.20 | 0.03-4.07 |

**What changed** (round 2 → condensed):

| | 04a | 04b | 04c |
|---|---|---|---|
| Body / total | 45.5 / 48.0 → **17.4 / 19.9 s** | 36.0 / 38.5 → **16.3 / 18.8 s** (16.8 / 19.3 before the fixer pass) | 36.5 / 39.0 → **15.9 / 18.4 s** |
| `raceT` (s a year) | [−0.4, 31.6] (1.23) → **[−0.25, 12.6] (0.494)**: 26 years; frame 1 x 2000.51, before the corner clock's roll (the fixer pass; −0.4 first) | [−0.4, 23.6] (1.50) → **[−0.2, 11.79] (0.75)**: frame 1 is still x 2010.27 ($1,041 / $1,001) | [4.8, 21.8] (1.70) → **[1.25, 10.8] (0.96)** |
| Hook / opening | race moving from frame 1 (unchanged) | race moving from frame 1; the hit-stop freeze 1.86 s → **0.56 s** (`hitStop` until 1.1, rejoin 2.6), covered by the cheer hop | cold open 4.8 → **1.25 s**: frame 1 the clean claim (the cover), the bump from frame 2 (`litT` 0.02), the rule and "≈ ×2" at 0.22, the rewind from 0.55 |
| Captions | narration-paced, 0.0-42.4 s → reading-paced, vo[0] at −0.4 (complete on frame 1), each ≥ max(1.2 s, 0.12 s a word), 0.05 s apart | the same, one 0.58 s breath while the race runs (6.62-7.2 s, no beat in it) | the same |
| Finish | S&P final 31.6; gold's held leg 34.4-36.4 (2.0 s); rungs 39.3; verdict 42.5 → S&P final **12.6** (lands 13.05); gold's leg **13.3-14.3** (1.0 s; the hero holds the S&P's final through it, no `follow` since the fixer pass); rungs **15.1**; verdict **15.8** | plate 24.3; lens 26.2; row 2 at 27.95, its value 28.86; verdict 32.7 → plate **12.49**; lens **12.9**; row 2 at **13.6**, a 0.3 s shot (`d`, fixer pass), value **13.96** with a fist pump; the cheer hop **14.36** lands with the verdict at **14.8** | Europe's line ends 21.8; the USA's leg 23.25-24.79; Europe's reveal 27.6; doublings 29.95; verdict 33.5 → **10.8**; **11.1-12.1**; **12.9**; **13.65**; **14.4** |
| Verdict after the last reveal / hold | 6.1 / 3.0 s → **1.5 / 1.6 s** (after gold's climax; 0.7 s after the rungs) | 3.84 / 3.3 s → **0.84 / 1.5 s** (after "≈ +$151") | 5.9 / 3.0 s → **1.5 / 1.5 s** (after Europe's final; 0.75 s after the ×4 rung) |
| Other knobs | `flagHold` 3.0 → **1.5** (3 race years: at 3.0 "2008 crash" was still up in 2011); fixer pass: no `holdBack.follow`, "2021: still behind." 10.05-11.5 then a 0.6 s breath, "End of 2025: …" from 12.1 as gold stops | the beats re-anchored on their pictures (the $4,000 crossing, the 2022 close); `lens.t` 12.9 (after the plate lands); fixer pass: `lens.rows[1].d` 0.3 (kit opt-in) and a pump beat on the shot | 9 footer steps → **7**: each is up ≥ 1.2 s, so the two doublings steps are one, "USA ≈ ×3.98 · Europe ≈ ×2.27" (both multiples kept; the doublings are in vo[8] and on the rungs), and the basis-line step under the verdict went (the end card is the loop's seam now); `hook.litCue` false (kit opt-in, below) |

A Scoreboard caption may run on under the verdict (it sits in its slot above the caption band, as 06b's last caption does): 04a's last caption ends 0.5 s and 04c's 0.45 s after the verdict lands, each having been up 0.7-0.75 s before it. On the Becker Rig the verdict hides the captions, so 04b's last caption ends as it lands.

**Iteration.**
- 04a: the first render (verdict at 16.4, two captions after the climax) had a 0.87 s near-still (15.27-16.10) while only the rungs wiped. The verdict now lands as the rungs settle, and the last caption runs on under it. A verdict at 15.8 with a 17.3 s body put the tempo at 151.0 → 160 BPM after P (+5.9%, the jump the 06c critic flagged at +5.5%); a 17.4 s body (hold 1.6) gives 151.0 → 154.8 (+2.5%). The contact sheet then showed "2008 crash" still up in 2011, so `flagHold` went to 1.5.
- 04c: a 2.0 s cold open (`litT` 0.02, `ratioT` 0.75) left a 0.43 s still and a 1.1 s near-still in it: the bump moves for about 0.25 s and the rule's wipe is near-still (YAVG 0.1-0.2). At 1.25 s, with the rule at 0.22, nothing in the opening is still or near-still for 0.4 s. A first finish had a 0.47 s still between Europe's line ending and the USA's leg (11.53-11.97); the leg now starts 0.3 s after the race ends. Its sound then failed DUCK (below).
- 04b: the first finish had a 0.53 s near-still while the card's second bar eased into place (13.87-14.37) and a 0.43 s one before the verdict (14.87-15.27). The caption "The S&P's first year alone: ≈ $151." now pops in over the bar's eased tail (13.95 s; Becker captions pop word by word), and the hero's last cheer starts 0.44 s before the verdict, so the hop lands with it. (The fixer pass, below, replaced the eased bar with a 0.3 s shot.)

**The kit change (opt-in), `hook.litCue`.** With the bump on frame 2 (0.02 s), the kit's 0.4-gain pop lands 20 ms after the pack's opening downbeat (kick, bass and stab at t = 0), and its B3 clearance needs a 7.37 dB broadband duck, over the hook's 6 dB DUCK cap (`verify`: "DUCK over the cap: pop@0.02:7.37>6.0"). A later bump puts the pop outside the hook's window (t ≤ 0.02 s), where its cap is 1.3 dB, and it still needed 5.8 dB at 0.067 s, 4.4 at 0.1 s and 2.7 at 0.25 s; a later bump would also leave frame 1 onward still. `lookOpts.hook.litCue: false` keeps the bump's picture and adds no pop: the downbeat is its sound. The default (absent or true) is unchanged. Proof, before and after the change: the cue records (`node src/cli.mjs cues`) of `specs/04a`, `04b`, `04c` and both Scoreboard samples (`samples/chart-race.json`, `chart-race-2.json`) are byte-identical, and 25 stills (5 times each: 04a 0, 3.3, 16.9, 36.4, 44; 04b 0, 1.5, 16.3, 28.9, 34; 04c 0, 1.2, 3.5, 24.8, 34; the samples 0, 2, 6, 10, end) are byte-identical. The 04c picture with and without the flag is the same (video md5 `66703817…` both times; 25 cues instead of 26).

**Measured after** (the final MP4s, same method):

| Teaser | Still runs ≥ 0.4 s | Before the verdict: longest still run | Near-still ≥ 0.4 s before the verdict |
|---|---|---|---|
| 04a | the verdict hold 15.93-16.43 and the card hold 18.90-19.87 | 0.27 s (15.27-15.50, the rungs; also 14.90-15.07) | none (longest 0.27 s: 14.83-15.07, 15.27-15.50) |
| 04b | the verdict hold 15.23-16.30 and the card hold 17.53-18.77 | 0.23 s (14.50-14.70, the verdict hop's apex; also 0.70-0.90, the end of the hit-stop) | none (longest 0.30 s: 0.70-0.97, 14.50-14.77) |
| 04c | the verdict hold 15.03-15.43 and the card hold 17.40-18.30 | 0.30 s (13.33-13.60; also 10.83-11.07, 12.70-12.87) | none |

These are the final MP4s after the fixer pass; 04c's is unchanged. Something moves from frame 1 in all three (the first frame difference: 04a 1.24, 04b 1.89, 04c 0.42). Nowhere before the verdict does only a counter or a caption change: 04a and 04b race on from frame 1, and 04c's opening has the bump, then the wipe and slam, then the rewind, each within 0.35 s of the last.

**Stills read:** the CLI contact sheets (`sheet --n 16`) of the three WIP specs, frames from each draft render while it was tuned, and frames pulled from the three final MP4s at every beat (after the fixer pass): 04a at 0, 0.25, 1.25, 2.0, 3.65, 4.1, 4.2, 5.7, 5.9, 6.35, 6.7, 8.5, 10.1, 10.65, 10.9, 11.6, 12.1, 12.6, 13.05, 13.3, 13.9, 14.3, 14.6, 15.15, 15.5, 15.85, 16.4 and 19.8 s; 04b at 0, 0.55, 0.9, 1.3, 2.2, 3.45, 5.35, 6.9, 7.85, 9.6, 11.0, 11.85, 12.5, 12.95, 13.4, 13.65, 13.8, 13.97, 14.1, 14.3, 14.5, 14.65, 14.85, 15.3, 16.0, 16.4 and 18.6 s, plus crops of the hero at 13.5-14.75 s; 04c at 0, 0.1, 0.3, 0.6, 0.9, 1.25, 2.2, 4.11, 5.27, 6.05, 7.5, 7.95, 9.9, 10.45, 10.8, 11.4, 12.1, 12.45, 12.95, 13.7, 14.0, 14.45, 15.0 and 15.8 s. Frame 1 is complete in each (header, the hook caption, the race or the claim). Every tip counter, flag, footer step, note and card value matches the maths, for example: 04a's $9,535 / $9,724 on frame 1 under a clean "2000", "S&P ≈ −38% · GOLD ≈ +21%" over $6,378 / $12,272 at 1.25 s, "2008 CRASH" gone by 5.7 s, "2021: still behind." gone by 11.6 s with "2022 BEAR MARKET" alone until "End of 2025: …" at 12.1 s, gold held at $91,094 from 12.1 s, the hero on "S&P 500 ≈ $75,300" from 13.05 s to 14.3 s while gold's tip rolls ($126,387 at 13.9 s), then "GOLD ≈ $150,000", and the last caption wrapped "Gold doubled ≈ 4 times. / Stocks, ≈ 3."; 04b's $1,151 / $1,002 and "year 1: ≈ +$151" through the hold, $2,027 as "Stocks have already doubled." comes up, $4,070 just after the fist pump, no caption in the 6.62-7.2 s breath, and the card's "under +$30" / "≈ +$151", the S&P row shooting in 0.3 s (13.7-14.0) as the hero points back, then punches the air as "≈ +$151" lands (13.97 s), then the hop that lands with the verdict (14.8 s); 04c's +17.88% / +35.41% and "≈ ×2" in the hook, $20,589 at 6.05 s, the USA held at $33,791 while Europe climbs from $17,082 to $22,661, then ≈ $39,800 and ≈ $22,700, with "USA ≈ ×3.98 · Europe ≈ ×2.27" under the verdict. Nothing overlaps or clips. The flags at 0.5 s a year (04a) and the 0.55 s claim before 04c's rewind are the two places that read fast.

**Lint:** `node src/cli.mjs check` on the three WIP specs: 0 errors, 0 warnings each (04a 19.9 s = 17.4 + 2.5 s end card, 04b 18.8 = 16.3 + 2.5, 04c 18.4 = 15.9 + 2.5). `check` on `studio/specs/`: 30/30 clean. Both Scoreboard chart-race samples: 0 errors, 0 warnings.

**Render and sound** (`render specs-wip/<id>.json --out /tmp/cond/04/<id>/r…`, then `sound specs-wip/<id>.json --video <render dir> --out /tmp/cond/04/<id>/final --score`; the video md5 is kept by the mux in each):
- 04a: 597 frames, 19.9 s; P 14.3 s (riser rule), 151.049 / 154.839 BPM (+2.5%), cue onsets within 1.94 ms (the fixer pass kept both; see its entry). `/tmp/cond/04/04a-scoreboard-sp500-vs-gold/final/04a-scoreboard-sp500-vs-gold.mp4`.
- 04b: 564 frames, 18.8 s; P 12.49 s (hit + cash), 115.292 / 110.236 BPM (−4.4%; −3.4% before the fixer pass), cue onsets within 0.17 ms. `/tmp/cond/04/04b-becker-rig-savings-vs-sp500/final/04b-becker-rig-savings-vs-sp500.mp4`.
- 04c: 552 frames, 18.4 s; P 12.1 s, 138.843 / 142.105 BPM (+2.4%). `/tmp/cond/04/04c-scoreboard-usa-vs-europe/final/04c-scoreboard-usa-vs-europe.mp4`.

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/04/<id>/final --detail`; the CUE DRIFT block and "baseline DIFFERS" are expected for a WIP cut):

| Check (limit) | 04a | 04b | 04c |
|---|---|---|---|
| Result | **41/42 (BANDS fails)** | **42/42** (B1w reported, as shipped) | **42/42** |
| A1 delivery (±1 of −14) / master (±0.3) | −14.17 / −14.09 | −14.13 / −14.05 | −14.14 / −14.06 |
| A2 TP (≤ −1.0 dBTP) | −1.50 (0.50) | −1.50 (0.50) | −1.30 (0.30) |
| A3 LRA (SB 4-9, BR 3-8) | 5.27 | 4.27 | 4.95 |
| A4 ST / M max (≤ −8 / −6) | −11.64 / −9.41 | −11.80 / −9.28 | −11.96 / −9.38 |
| A5 PLR (8-13) | 12.67 (0.33) | 12.63 (0.37) | 12.84 (0.16) |
| A7 first 0.4 s (≥ −18) | −11.37 | −12.00 | −10.55 |
| A8 corr mean / min / mono fold | 0.75 / 0.43 / −0.68 LU | 0.88 / 0.47 / −0.40 | 0.80 / 0.54 / −0.56 |
| A10 phone drop (SB ≤ 7, BR ≤ 4.5) | 2.90 | 2.09 | 2.83 |
| A11 limited > 1 dB (≤ 3%) / max (≤ 6) | 0.851% / 2.05 | 0.644% / 2.76 | 0.204% / 1.40 |
| BANDS, tightest octave (window) | **16 kHz −10.7 (−26..−12): 1.3 dB OVER**; 500 Hz 3.4 (−1..4): 0.6; 63 Hz 8.7 (4..10): 1.3 | 250 Hz 0.2 (0..6): 0.2; 500 Hz 0.6 (−1..4): 1.6 | **16 kHz −12.1 (−26..−12): 0.1**; 500 Hz 2.2: 1.8 |
| HARSH (≤ 2) | −1.06 | −0.16 | −1.35 |
| B1 music / sfx | −2.04 / −3.73 | −2.18 / −2.17 (sfx−music 0.01) | −2.05 / −3.62 |
| B2 duck at P (≤ −8) | −10.8 | −9.0 | −10.8 |
| B3 closest cue over the music (≥ 3) | 5.1 dB (8/8) | 4.5 (13/13) | 4.6 (7/7) |
| B4 onsets (≤ 2 ms) | 1.94 ms (0.06) | 0.17 | 0.58 |
| B5 onset at P (±10 ms) | −8.0 ms (2.0) | 0.0 | 1.3 |
| B8 logo (≥ −13 LUFS) / payoff | −12.13 (0.87) / −10.60 | −12.52 (0.48) / −11.68 | −12.21 (0.79) / −10.58 |
| S9 BPM (segment 1 SB 136-152, BR 112-128; later ±8%) | 151.049 (0.95 under 152) / 154.839 (+2.5%) | 115.292 / 110.236 (−4.4%) | 138.843 / 142.105 (+2.4%) |
| S12 pad voice move (≤ 5 st) | 3 | 5 (0, at 6.245 s) | 3 |
| DUCK (SB) | 0.0 dB over the table | n/a | 0.0 dB over the table (failed at 7.37 > 6.0 before `litCue`) |

These are the final builds after the fixer pass (`verify specs-wip/<id>.json --video /tmp/cond/04/<id>/final --detail`); 04c's spec, picture and numbers are unchanged.

All other gated checks pass (A6, A9, A12-A14, B6, B7, B9, B10, S1-S8, S10, S11, S13, S14, TRAIN, MALLET and FLAMS for 04b), and the units pass (Scoreboard U1 14/14, U2 24/24, U3 15/15, U4 15/15, LOGO; Becker Rig U1 18/18, U2 33/33, U3 12/12, U4 5/5).

**04a fails BANDS, and it is reported, not fixed** (the ship step owns sound and refits): 16 kHz measures −10.7 dB re 1 kHz against the −12 ceiling, 1.3 dB over (−10.8 before the fixer pass; the 45.5 s cut: −13.4). The likely cause is the fixed bright events taking a larger share of a 17.4 s body: in the stems the music alone puts 16 kHz at −12.3 dB re the mix's 1 kHz, and 29% of its 16 kHz energy sits in 14.0-14.5 s, the P stack (reverse crash, riser, crash at P) with the opening's crash next (13% in the first second); the spec's own hit at the 2013 close carries a third of the SFX stem's 16 kHz, but a build without it moves the mix only 0.5 dB. No spec timing fixes it, and changing the pack or `acceptance.json` is out of scope. It is a pack-level matter for the ship step (Scoreboard's P stack in a short body; 06b's 16 kHz rose 0.7 dB in its condensed cut too). 04c's 16 kHz passes with 0.1 dB to spare, so it will flip first on the next Scoreboard pack change or refit.

**Check (`checks/04-chart-race.py`):**
- **`--spec [KEY=]PATH`** (repeatable) checks a spec in place of `studio/specs/<id>.json`; `CHART_RACE_SPECS` still swaps the folder.
- **Two cuts per teaser, picked by length:** the round-2 cut (45.5 / 36.0 / 36.5 s; what `studio/specs/` holds, `IN_SPECS`) keeps every round-2 rule; the condensed cut (a 15.5-19 s body) swaps the narration rules (2.6 spoken words a second, "said at" times, VO-synced beats) for caption rules. Any other length fails its lane and is not checked further. The race clocks, hit-stop, flag hold, footer steps and beat lists follow the cut. A spec with another teaser's id fails and stops too.
- **New for the condensed cut:** the hook caption complete on frame 1 (vo[0] ≤ −0.14 s on Scoreboard, ≤ −0.4 s on the Becker Rig); captions up ≥ max(1.2 s, 0.12 s a word); caption gaps < 0.2 s, or a breath ≤ 0.6 s while the race runs with no beat in it; a year caption within 0.6 s of its year's segment; each flag figure up ≥ 0.5 s while its caption is, the caption leading it by ≤ 0.6 s (the same for footer steps and notes); beats inside their captions (the $4,000 crossing, the 2022 close, the climaxes, the card values); the moving pace (04a 0.45-0.55, 04b 0.7-0.8, 04c 0.9-1.0 s a year); the verdict 0.6-1.5 s after the last reveal and held 1.2-1.6 s; the Scoreboard's last caption ending ≤ 0.6 s after the verdict and up ≥ 0.6 s before it, the Becker Rig's ending as it lands; footer steps up ≥ 1.2 s; 04a's 1.0 s held-back leg with `follow`, starting ≤ 0.4 s after the S&P lands, and `flagHold` 1.5; 04b's 0.4-0.7 s hit-stop, the cheer that lands with the verdict, the lens after the plate and vo[7] over the second bar's growth; 04c's bump from frame 2 (`litT` ≤ 0.05) with `litCue` false, the rule ≥ 0.3 s before the rewind and the rewind ≤ 0.35 s after it, the USA's 0.8-1.2 s leg ≤ 0.35 s after the race ends, Europe's reveal 0.6-1.0 s after the climax, and the merged doublings step; the write-up's sections and this entry.
- **Results:** 657 checks, 0 failed by default (626 before the fixer pass, 614 before the condensed cut: 6 more rows say which cut was checked, 1 checks round 2's `follow`, 1 its `litCue`, 4 the write-up; the fixer pass added 29 caption-byte rows and 2 lens rows). With `--spec` on the WIP specs: 674 (04a), 671 (04b) and 667 (04c), 0 failed; 698, 0 failed with all three (640 / 633 / 636 / 657 before the fixer pass). A copy of each round-2 spec passed with `--spec` (outside `studio/specs/`) is checked against round 2.
- **Mutation test** (scratch copies of the WIP specs): **18 of 18** caught, each with exit 1 and a named failure: 04a the hook caption at 0.0 s, the verdict 2.0 s after the climax, a 1.0 s caption, the race at 0.62 s a year, a 2.0 s gold leg, "≈ 27%"; 04b a 1.2 s hit-stop, "Under $10" up to 7.6 s, "top $4,000" 0.9 s early, the verdict 2.0 s after the payoff, the verdict over a running caption, a 1.05 s caption gap; 04c the bump at 0.3 s, the pop back (`litCue` true), a footer step up 0.85 s, "≈ $22,600", a 2.0 s verdict hold, a 21.0 s body.

**To promote** (the ship step): copy the three WIP specs over `studio/specs/` (04b's needs the kit's opt-in `lens.rows[k].d`, already in `looks/becker-rig/formats/chart-race.js`) and set `IN_SPECS` to `"cond"` for each in the check (the default run then checks the condensed cuts; the round-2 set stays for git-history copies). Follow BIBLE §11.1 for the three moved cue records: refit Scoreboard (04a, 04c) and Becker (04b) on the fresh records, store them in `test/fixtures/cues.json`, `tempo-table --write`, `verify --strict-cues`, `npm test`. Resolve 04a's 16 kHz BANDS failure at pack level, and recheck 04c's 16 kHz (0.1 dB), 04b's 250 Hz (0.2 dB) and S12 (0), and 04a's B4 (0.06 ms) after any refit. Ship by §11.5. Then `teasers/v2/teasers.json` (runtimes 19.9 / 18.8 / 18.4 s) and the publishing sheets (their `on_ship` re-pick: 04b's card frame is now 14.3 s, after the card's shake and before the last hop, or any frame of the 14.8-16.3 s verdict hold, where the card stays up; 04a's and 04c's covers stay frame 1, and 04a's now reads a clean "2000" with $9,535 / $9,724).

**Open items:**
- 04a BANDS (above) is the one failing gate.
- 04c's opening is fast: the claim (the cover) shows alone for 0.55 s before the rewind, with the hook caption up to 1.55 s. It is the cost of no still or near-still run in the cold open; the hook's motion (a bump and a thin wipe) cannot carry more than about 0.6 s.
- `teasers/v2/teasers.json` and the publishing sheets still describe the round-2 cuts; they are outside this pass's files.

### Fixer pass (condensed cut, 2026-10-13)

The critic passed format 04 (04a 7.5, 04b 7.5, 04c 8.5), with no must-fix item. This pass applied every should and the cheap nits. The entry above now describes the final state; this table says what changed and why.

| Critic item | Severity | What changed |
|---|---|---|
| 04a vo[8] lost its no-break spaces, so the line wrapped "≈ 4 / times"; the check did not compare caption bytes | should | Restored byte for byte ("Gold doubled\u00a0≈\u00a04\u00a0times. Stocks,\u00a0≈\u00a03."); the final frames wrap "Gold doubled ≈ 4 times. / Stocks, ≈ 3.". The check now holds every caption of all three teasers to its round-2 string, byte for byte, in both cuts (`VO_TEXT`) |
| 04b 13.5-14.5 s near-still: only the card's second bar (0.85 s ease) and the caption moved; the point-back did not read | should | One kit change, opt-in: `lens.rows[k].d` in `looks/becker-rig/formats/chart-race.js` (header and README), a row's own grow time. Row 2 now shoots in 0.3 s (13.7-14.0), and "≈ +$151" lands at 13.96 s (was 14.51). The hero points back as it shoots (`d` 0.76), punches the air as it lands (a new `pump` beat, 13.96, `d` 0.75), then hops onto the verdict. vo[6] now ends 13.55, vo[7] runs 13.6-14.8, and the cheer is at 14.36; the verdict is at 14.8 (0.84 s after the payoff, held 1.5 s), so the body is 16.3 s (was 16.8). The shot's whoosh is 0.35 s (was 0.8). Motion 13.6-14.47: frame differences 0.15-6.1, nothing still. The longest run before the verdict is 0.23 s (14.50-14.70, the hop's apex) |
| 04a: the S&P's final got about 0.25 s as the hero; from 13.3 s the hero rolled with gold under "End of 2025: stocks ≈ $75,300." | should | `holdBack.follow` removed (the critic's preferred fix). The hero holds "S&P 500 ≈ $75,300" 13.05-14.3 s while gold's line draws its leg, and cuts to gold at the climax. The leg is not still: frame differences 0.38-1.19 over 13.3-14.3. The check now requires no `follow` and at least 1.2 s of the S&P on the hero |
| Sound: 04a BANDS 16 kHz fails; 04c 16 kHz 0.1 dB; 04b margins; 04a B4 at 0.06 ms | should (ship step) | Not fixed here: the packs and `acceptance.json` belong to the ship step. Final values are in the verify table above: 04a 16 kHz −10.7 (1.3 over), B4 1.94 ms (0.06); 04b 250 Hz 0.2 (0.3 before), S12 5 (0); 04c unchanged. The fixer pass's own timing moves would have broken two checks. With `follow` removed and `raceT[0]` at −0.2, B4 rose to 3.31 ms. The t = 0 kit whoosh, a soft sin-window swell, crossed −60 dBFS 3.31 ms late, so B4 failed. The fitted tempo also fell to 142.7 → 135.5 BPM (−5.0% after P), because the moved thuds pulled the fit. With `raceT[0]` at −0.25, B4 is back to 1.94 ms and the tempo to 151.0 → 154.8 BPM (+2.5%), as in the first condensed cut. These were checked on audio-only builds of the variants |
| 04a: "2021: still behind." stayed up 1.95 s past the 2021 close, under the 2022-2025 clock and the bear-market flag (also 04b/04c lags of 0.4-0.6 s) | nit | 04a only, using the critic's first suggestion. vo[4] now runs 7.4-10.0 s and vo[5] 10.05-11.5 s, which clears 1.0 s after the 2021 close. A 0.6 s breath follows, where the "2022 bear market" flag is the only text. Then "End of 2025: stocks ≈ $75,300." starts at 12.1 s, as gold stops and the hero cuts to the S&P. It names the destination 0.5 s before the race ends, and the footer step and the hero's final land at the race end, as before. The check's rules for vo[6] changed with it: it must start as gold stops (±0.05 s) and lead the race end by at most 0.6 s, and vo[5] must clear within 1.05 s of the 2021 close. 04b and 04c are unchanged, as the critic allowed |
| 04a frame 1: the corner clock was mid-roll ("200" with a half digit) at x 2000.80 | nit | `raceT[0]` −0.4 → −0.25: frame 1 is x 2000.51, before the kit's roll (from x 2000.6), so it reads a clean "2000" with $9,535 / $9,724 under the stake. The pace is 0.494 s a year (was 0.500), and every close moves later by up to 0.14 s (most at the start, none at the race end): thuds at 1.23 and 4.19, hit at 6.67, flags at 0.24, 1.23, 4.08, 6.33 and 10.87 s. The captions were re-anchored (vo[1]-vo[4] start 1.25, 3.6, 5.85, 7.4). The check asserts the clean clock from the kit's roll rule |
| 04c 0.0-0.55 and 13.13-13.63 s sit closest to the limit | nit | No change (no retime in 04c). Re-audited: 0.27-0.53 near-still 0.30 s, 13.27-13.60 0.37 s, both under 0.4 s |
| Write-up line 11 said 622 checks; "character for character" was false for 04a vo[8] | nit | Line 11 now gives the current counts (657 / 698). The claim is true again, and the check enforces it |

**Kit proof (`lens.rows[k].d`, default unchanged).** Before and after the change: the cue records (`node src/cli.mjs cues`) of `specs/04b-becker-rig-savings-vs-sp500.json` and both Becker Rig chart-race samples (`looks/becker-rig/samples/chart-race.json`, `chart-race-2.json`) are byte-identical. So are 16 stills: 04b at 0, 1.5, 16.3, 28.4, 28.9 and 34 s (28.4 and 28.9 are inside the round-2 card's row-2 growth, the code path the flag touches), and the samples at 0, 2, 6, 10 and the end. That makes 19 of 19 files identical by md5 (`/tmp/cond/04/kitproof-br/`). `specs/04b` is the only committed spec in the format on this look.

**Checks:** lint 0 errors, 0 warnings on all three WIP specs (04a 19.9 s, 04b 18.8 s, 04c 18.4 s). Math check: 657 / 0 failed by default; 674, 671 and 667 with `--spec` on each WIP spec; 698 with all three; a copy of the round-2 specs passed with `--spec` is still checked as round 2 (657, 0 failed). **Mutation test, 12 of 12 caught** (scratch copies, each with exit 1 and named failures, no crash):
- 04a: vo[8] with plain spaces; `follow` back on; `raceT` −0.4 with its cues; vo[5] to 12.55 s and vo[6] at 12.6 s (the old 1.95 s lag); footer step 0 at 12.1 s.
- 04b: row 2 without `d`; row 2 at `d` 0.6; no pump beat (this one crashed the check before the fixer made the beat-`d` compare safe); the pump at 14.2 s; the shot's whoosh at 0.8 s; the verdict hop at 14.5 s.
- 04c: one changed byte in vo[1].

**Renders:** `/tmp/cond/04/<id>/final/<id>.mp4` (04a and 04b rebuilt; 04c unchanged). Motion audit after: `/tmp/cond/04/<id>/motion-after.txt`. Verify output: `/tmp/cond/04/<id>/verify.txt`.
