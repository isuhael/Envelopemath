# Format 9: year-by-year growth ladder, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews), hook pass 2026-10-08 (all three hooks kept). What changed and why is in the **Review log** at the end.
**Format:** `growth-ladder`, hook pattern **P2** ("small amount × time =")
**Lane:** one small regular amount (or one small lump), year by year
**Files:**
- Specs:
  - [`studio/specs/09a-live-sheet-100-a-month-doubles.json`](../../studio/specs/09a-live-sheet-100-a-month-doubles.json)
  - [`studio/specs/09b-becker-rig-1000-times-1-07.json`](../../studio/specs/09b-becker-rig-1000-times-1-07.json)
  - [`studio/specs/09c-scoreboard-5-a-day-millionaire.json`](../../studio/specs/09c-scoreboard-5-a-day-millionaire.json)
- Check: [`teasers/v2/checks/09-growth-ladder.py`](checks/09-growth-ladder.py). Run `python3 teasers/v2/checks/09-growth-ladder.py`. It reports **518 checks, 0 failures** and exits 0. As a test I changed one ladder cell (09b) and one VO number (09c); it exited 1 on both.

**How the facts were checked**
- None of the three teasers puts market data on screen. Every on-screen number comes from one stated assumption (8% or 7% a year), and the footer prints that assumption with "not a forecast". Nothing on screen needs a source.
- **The stated rate matches every row in all three** (the P2 pitfall: FinCalC's 3.77M short is a 10% table under a "12%" label):
  - 09a says "8% a year, compounded monthly" on screen, and every row uses 8% ÷ 12 a month.
  - 09b says "7% a year, added once a year", and every row is × 1.07 per year.
  - 09c says "7% a year", and every row grows each dollar by exactly 7% a year: the monthly rate is (1.07)^(1/12) − 1 ≈ 0.565%. The checker asserts this.
- Real-world figures appear only in the captions and pinned comments: the S&P 500's long-run averages, used to explain why we chose 7% and 8%. See "Sources" under 09a for what is confirmed and what is not.
- Web searches: 4 in round 1 and 2 in this revision. The egress proxy blocked every page fetch (NYU Stern, A Wealth of Common Sense, twice). Figures marked **[click-check]** come from search results and should be opened by someone before posting.

**Studio linter:** `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 1 warning.**
- All three kit modules are now built. Live Sheet's and Scoreboard's `formats/growth-ladder.js` landed in the working tree during this revision, so this lint covers the 09a and 09c ladders, formula bar, marks, goal strip and board for the first time.
- The one warning: the 09c footer renders at 37.7 px, under the 40 px recommendation but above the 34 px floor. The Scoreboard footer is a single line under the hero; it already holds only the working, the rate and "not a forecast".
- I rendered stills of all three at their beats and read them (times in the review log). Two formula-bar lines in 09a wrapped onto two lines at 33-34 characters; I shortened every 09a formula-bar line to 32 characters or fewer, and the checker now enforces that.
- `lookOpts` in 09a (`inputsAtStart`, `formulaBar`, `marks`) and 09c (`goal`, `icon`) are all read by the kits and are now documented in `looks/live-sheet/README.md` and `looks/scoreboard/README.md`. 09b no longer carries any `lookOpts`: the Becker kit ignored the two it had.

---

## (a) The format in 5 lines

1. **Mechanic** ([`04-formats.md`](../../research/v2/04-formats.md), rank 9, viability 5):
   - one small monthly amount at one rate;
   - a sheet unmasks one row per year;
   - a milestone lands about a third of the way in;
   - the biggest number sits on the last row;
   - the finished table holds.
2. **Evidence** (FinCalC TV, all watched or catalogued in [`watch/fincalc-tv.md`](../../research/v2/watch/fincalc-tv.md)):
   - "₹2000 SIP Returns for 1-15 Years": **3,771,667** views, 30 s. https://www.youtube.com/shorts/Y57tm58Y6zI
   - "Rs. 1000 in Sukanya Samriddhi Yojana Scheme": **2,139,784**, 41 s. https://www.youtube.com/shorts/pUlH-hZ6KcM
   - "Rs. 5000 SIP Returns Calculation in Sensex for Last 25 Years": 963,086. https://www.youtube.com/shorts/8of2v9B5exk
   - Amount-first titles have a median of 53,954 across the channel (n=15).
3. **The P2 cousins** ([`02-hook-bank.md`](../../research/v2/02-hook-bank.md)):
   - ChartOrbit, "Does investing 100$ monthly in BMW make you rich?": **1,391,731 (5.91x)**. https://www.youtube.com/shorts/2cF446rExhY
   - ChartOrbit, "…in NVIDIA…": 500,774 (14.1x). https://www.youtube.com/shorts/XEhGBuH2xn4
   - The Market Hustle, "$10 each day = $930 by the end of the year": 46,137 (1.1x med). https://www.instagram.com/reel/Dd5KkdPs20G/
4. **What wins, and what we add:**
   - **What wins:** row 1 on screen at 0.0 s, a small everyday input, about one row every 1.3 s, a milestone a third of the way in (FinCalC: profit passes ₹1 lakh at 0:09, and profit ≈ deposits at 0:15), the biggest number last, and a hold long enough to screenshot.
   - **What we add:** the 04-formats twist. The stated rate matches the table, a doubling marker sits on the row where it happens, and "you put in" and "worth" run side by side so growth visibly overtakes deposits.
   - **The step beyond FinCalC, sharpened in this revision:** each header now prints **a wrong answer the viewer already holds** (R5, R7) and the ladder tests it: "Doubled by year 9?", "$1,000 + 30 × $70 = $3,100?", "A millionaire in 40 years?". The ladder ends on a verdict (R12), not only on a big number.
5. **Pitfalls:**
   - FinCalC's own 2026 six-second cards in this formula stalled: 9,017 (https://www.youtube.com/shorts/a4GbewbYbPw) and 10,445 (https://www.youtube.com/shorts/1NugTIGX-d4).
   - Its 3.77M short is a 10% table under a "12%" label (study check).
   - The multiples are modest (14.1x at most where scored), and the two hits are 2022-23 and India-only.
   - Millionaire-goal hooks flopped in the benchmark: H75 "…still Retire a Millionaire" 34,225, H88 "$24,500 COULD BECOME $10.8 MILLION" 15,274. That is why 09c names a horizon and asks a yes/no about it, rather than "how long to $1M?" (P3).
   - So all three teasers are voiced 29.5-35.2 s ladders, not silent cards, and every rate on screen matches every row.

### Decisions shared by all three

- **Each teaser busts a different wrong belief, and prints it at frame 1:**
  - 09a: "Rule of 72, so doubled by year 9." (lump sum vs monthly)
  - 09b: "$70 a year, so $3,100." (simple vs compound)
  - 09c: "$5 a day makes you a millionaire in 40 years." (rate vs horizon)
- **Captions hold the answer back.** Line 1 of each caption names the bust, not the number ("Not even close.", "Not even halfway."), so the feed preview doesn't give the payoff away (hook judge, round 2).
- **Rounding:**
  - every rounded result shows "≈" on screen; in the VO it is "about", or "over" when the true value is floored;
  - exact values carry none of these;
  - each ladder keeps one precision: 09a and 09b to the dollar, 09c to the nearest $100 (Scoreboard counters, as in the look's own storyboard).

  The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$19,200" = 5 words). Every row the VO names lands within 0.5 s of its word.
- **Lane check:**
  - No product or brand is named. Latte/Starbucks belongs to `pov-race`.
  - No by-age table. "$3 a day by age" belongs to `find-your-row`.
  - No two-people duel. That belongs to `ledger-duel`.
  - Each teaser is one amount, climbing year by year.
  - 09a and 09c both use monthly deposits, but they ask different questions (which year it doubles vs whether a horizon reaches a goal), use different rates and conventions, and live in different looks.
- **No advice language.** These are worked examples at an assumed rate, and every caption says so.

---

## 09a: Live Sheet: "$100 a month at 8%. Doubled by year 9?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input / peach output headers) |
| Spec | `studio/specs/09a-live-sheet-100-a-month-doubles.json` (29.5 s) |
| Platform title | **$100 a Month at 8%: Doubled by Year 9?** |
| On-screen hook (header) | **$100 a month at 8%. / Doubled by year 9?** (9 words, 2 lines) |
| Frame 1 | Banner. Formula bar typing "Year 9: 2 × $10,800 = $21,600?" (70% typed at frame 1, complete by about 0.5 s): the target "doubled by year 9" would need, beside row 9's visible "$10,800". Columns Year / You put in / Worth. Row 1 filled: 1 · $1,200 · ≈ $1,245. Rows 5, 9, 12, 15, 16, 20, 30 show their year and "You put in" (`lookOpts.inputsAtStart`), with empty Worth cells. Footer on |
| Footer | ASSUMES 8% a year, compounded monthly · $100 in at each month-end · not a forecast |

**Topic vs the seed:**
- Kept: $100 a month at 8%, year by year, in FinCalC's put-in vs worth grammar.
- Added: FinCalC's own milestone (profit ≈ deposits) is the hook's question, and the hook now states the wrong answer. "Doubled" means worth ≥ 2 × what you put in, which is the same thing as growth passing deposits; the frame-1 formula bar defines it. The ladder ends on a single repeatable answer: **year 16**.

**Wrong belief it exploits:**
- "8% doubles my money in 9 years" (the Rule of 72). That is true for a lump sum, which doubles in ≈ 8.7 years at 8% compounded monthly. A monthly plan doubles only in year 16, because every new $100 starts from zero. The formula bar says so in words at 16.0 s: "Rule of 72 = one lump sum".
- A second belief busted in the verdict: "more money a month doubles faster". It doesn't. At 8% it is year 16 for $50, $100, $500 or $1,000 a month.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$100", "8%", "year 9" in the banner, "$10,800" in the formula bar and the Year 1 row ($1,200 → ≈ $1,245) are on screen at 0.0 s |
| R2 | One input ($100 a month). "Year 9?" is the candidate wrong answer, asked, not a result |
| R3 | Weak pass. The rows are horizons, and the verdict plus the formula bar ("$50 or $500/mo: still year 16") make the answer everyone's, but only from 24.8 s |
| R4 | $100 a month is ChartOrbit's stake and a small, round, familiar amount |
| R5 | "Doubled by year 9?" is on screen at frame 1. It is the Rule-of-72 answer, and the VO names the rule at 3.4 s |
| R6 | Partial: amount + horizon ($100 a month, year 9). The "you" lives in the column "You put in" and the VO, not the banner |
| R7 | One named answer (year 9) to take a side on, checkable against a visible empty cell |
| R8 | 9 words, 2 lines |
| R9 | 7 empty Worth cells from 0.0 s: a countable loop |
| R10 | First payoff (Year 1) at 0.0 s. Biggest number (year 30) last |
| R11 | The question is on screen; the verdict card answers it. Caption line 1 holds the number back ("Rule of 72 says year 9. Not even close.") |
| R12 | A single number to repeat in a comment: **16** |

**Benchmark hooks it is modelled on**
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years", spoken "How much return can you get on a ₹2000 monthly SIP at 12%?". 3,771,667 views, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: the amount + rate banner, Year 1 at 0.0 s, the row unmask, and the milestone.
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: $100 a month, and a yes/no question that waits for a verdict.
- Hook bank 4.6, rewrite B: "$10 − $2.96 of food = $7.04 profit?", the wrong answer printed as a question at frame 1. Borrowed for the frame-1 formula bar "Year 9: 2 × $10,800 = $21,600?".
- H31, FinCalC: "Home Loan Part payment Reduce Tenure NOT EMI". 578,461, https://www.youtube.com/shorts/7CFEV6D3QNM. Borrowed: the "X, NOT Y" verdict grammar, here "year 16, not 9".

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "Year 9: 2 × $10,800 = $21,600?" typing. Row **1**: $1,200 / ≈ $1,245. The other rows show year and put-in only. Footer | "$100 a month at 8%." (0.0-3.2) |
| 3.4 | Formula bar "Rule of 72: 72 ÷ 8 = 9 years?" | "Rule of 72: doubled by year 9." (3.4-6.6) |
| 4.6 | Row 5: ≈ $7,348 | |
| 6.8 | Row **9**: ≈ $15,743. Rose tint and tooltip "not double". Formula bar "≈ $15,743 < $21,600" (the frame-1 target). Buzz | "Year 9? Not even close." (6.8-8.9) |
| 8.0 | Row 12: ≈ $24,051 | |
| 9.1 | Row **15**: ≈ $34,604. Tooltip "not yet". Formula bar "≈ $34,604 < 2 × $18,000". Buzz | "Year 15: still short." (9.1-10.8) |
| 11.0 | Row **16**: ≈ $38,721. The row turns yellow with the tooltip "doubled". Formula bar "≈ $38,721 > 2 × $19,200". Pop | "Year 16: $19,200 in. Worth more than double." (11.0-15.8) |
| 16.0 | Formula bar "Rule of 72 = one lump sum" | "Why 16, not 9? Every new $100 starts from zero." (16.0-20.8) |
| 17.6 | Formula bar "Yr 16: 1st $100 ≈ $356". Row 16 is still the newest row | (…every new $100…) |
| 19.6 | Formula bar "Newest $100: still $100" | (…starts from zero.) |
| 19.8 | Row 20: ≈ $58,902 | |
| 21.0 | Row **30** counts up over 0.8 s to **≈ $149,036** (biggest, last). Formula bar "≈ $149,036 ÷ $36,000 ≈ 4.1×". Roll | "Year 30: over 4 times what you put in." (21.0-24.6) |
| 24.8 | Verdict card "Doubled in **year 16**, not 9. / Same year for any monthly amount." Formula bar "$50 or $500/mo: still year 16". Ding (kit) | "Any monthly amount: still year 16." (24.8-27.3) |
| 27.3-29.5 | Hold on the finished sheet, then clear to frame 1 (loop) | |

**Full guide VO** (64 spoken words)

> $100 a month at 8%. Rule of 72: doubled by year 9. Year 9? Not even close. Year 15: still short. Year 16: $19,200 in. Worth more than double. Why 16, not 9? Every new $100 starts from zero. Year 30: over 4 times what you put in. Any monthly amount: still year 16.

**The maths**

- **Basis:** $100 deposited at each month-end, at r = 8%/12 a month, compounded monthly (as the footer says).
- **Formulas:**
  - Worth after n months: W(n) = 100 × ((1 + r)^n − 1) ÷ r.
  - You put in: $100 × 12 × year.
  - "Doubled": W ≥ 2 × put in.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Year 1 | W(12) / 100 × 12 | 1,244.99 / 1,200 | ≈ $1,245 / $1,200 |
| Year 5 | W(60) / 6,000 | 7,347.69 | ≈ $7,348 / $6,000 |
| Year 9 | W(108) / 10,800 | 15,742.95 (1.458×) | ≈ $15,743 / $10,800 |
| Year 12 | W(144) / 14,400 | 24,050.84 (1.670×) | ≈ $24,051 / $14,400 |
| Year 15 | W(180) / 18,000 | 34,603.82 (1.922×) | ≈ $34,604 / $18,000 |
| Year 16 | W(192) / 19,200 | 38,720.91 (2.017×) | ≈ $38,721 / $19,200 |
| Year 20 | W(240) / 24,000 | 58,902.04 | ≈ $58,902 / $24,000 |
| Year 30 | W(360) / 36,000 | 149,035.94 (4.140×) | ≈ $149,036 / $36,000 |
| "Doubled by year 9?" / "Rule of 72 … 9" | 72 ÷ 8 | 9 | 9 |
| "Year 9: 2 × $10,800 = $21,600?" | 2 × 10,800 | 21,600 | $21,600 (> ≈ $15,743, so not doubled) |
| "2 × $19,200" | 2 × 19,200 | 38,400 | < ≈ $38,721, so doubled |
| "Rule of 72 = one lump sum" | a lump sum at 8% compounded monthly doubles in ln 2 ÷ (12 ln(1 + r)) | 8.69 years | (words) |
| "Yr 16: 1st $100 ≈ $356" | 100 × (1 + r)^191 (the month-1 deposit at the end of month 192) | 355.77 | ≈ $356 |
| "Newest $100: still $100" | the month-end deposit has earned nothing yet | 100 | $100 |
| "≈ 4.1×", "over 4 times" | 149,035.94 ÷ 36,000 | 4.140 | ≈ 4.1× (formula bar), "over 4" (VO) |
| "still year 16" for $50 / $500 | the first year with W ≥ 2 × put in; the amount cancels out of the ratio | 16 / 16 | 16 |

- **Cross-checks:**
  - Year 15 is the last year short of double (1.922×).
  - The doubling year at other rates (compounded monthly) is 19 at 7% and 13 at 10% (pinned comment).
- **Agreement with the format contract:** the year 1, 10 and 30 values match the FORMATS.md example rows to the dollar ($1,245; $18,295; $149,036).

**Sources (real-world inputs).** None on screen. The rate is an assumption, labelled "not a forecast". The caption's context line ("≈ 10% a year since 1928 before inflation, ≈ 7% after") rests on these:

| Figure | Publisher, page | Date | URL | Status |
|---|---|---|---|---|
| S&P 500 since 1928: **10.09%** a year nominal, **6.81%** inflation-adjusted (dividends reinvested, CPI from BLS) | Official Data Foundation, "S&P 500: since 1928" (officialdata.org) | a live figure computed through the current year (1928 to 2026 year-to-date), read 2026-10-07; it will drift | https://www.officialdata.org/us/stocks/s-p-500/1928 | Both figures confirmed in search results (round 1 and the verifier). Page fetch blocked: **[click-check]** |
| 1928-2024: stocks **+9.94%** a year, nominal (data: Aswath Damodaran, NYU Stern) | Ben Carlson, A Wealth of Common Sense, "Historical Returns For Stocks, Bonds, Cash, Real Estate and Gold" | January 2025 | https://awealthofcommonsense.com/2025/01/historical-returns-for-stocks-bonds-cash-real-estate-and-gold/ | Nominal figure confirmed in search results (twice). Its **real** figure is **not confirmed**: search summaries only derive "roughly 6-7%". Dropped from the checker. **[click-check]** |
| 1928-2025: ≈ 10% nominal, ≈ 6.9% real | Search-engine summaries of Damodaran's series (not read directly) | searched 2026-10-07 | https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html | Unconfirmed corroboration only |

So the "≈ 10% before inflation" has two confirmed sources (10.09% and 9.94%), and the "≈ 7% after inflation" has one confirmed source (6.81%) plus unconfirmed corroboration. The caption wording ("≈") covers both.

**Assumptions (in the footer):**
- 8% a year, compounded monthly (8%/12 a month);
- $100 in at each month-end;
- no fees, no taxes, no inflation adjustment;
- the rate is not a forecast.

**Caption (IG/TikTok; also the YouTube description)**
> Rule of 72 says year 9. Not even close.
> $100 a month at 8%: by year 9 you've put in $10,800, and "doubled" would mean $21,600. It's worth ≈ $15,743. The Rule of 72 (72 ÷ 8 = 9) is for money that's all in on day 1; in a monthly plan the newest $100s have barely started. It first doubles in year 16: $19,200 in, ≈ $38,721. And the year doesn't depend on the amount: $50 or $500 a month, it's still year 16 at 8%.
> Maths: deposits at month-end, 8% a year compounded monthly. 8% is an assumption, not a forecast (the S&P 500 has returned ≈ 10% a year since 1928 before inflation, ≈ 7% after). Educational maths, not advice.
> #compoundinterest #ruleof72 #investing #moneymath

**Pinned comment**
> At 7% a year (compounded monthly) it takes until year 19. At 10%, year 13. Which rate did you plug in?

**Per-platform notes**
- **YouTube Shorts:** the title repeats the banner's question, which is FinCalC's home-platform grammar. Keep the 2.2 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** cover on frame 1 (the question, the empty cells and the $21,600 target) or on the finished sheet with row 16 highlighted. Caption line 1 holds the answer back.
- **TikTok:** the comment fight will be the rate ("8% is too high or too low") or "the Rule of 72 is for lump sums". The pinned comment takes the first; the formula bar ("Rule of 72 = one lump sum") and the VO take the second. Keep "year 16" out of the first 100 characters of the caption.
- **Not a 6 s card:** FinCalC's 2026 amount-first cards stalled at 9,017-10,445. Keep this voiced.
- **Look note:** the formula bar carries the doubling test (the "≈ $X < $Y" lines). That is the Live Sheet's "formula bar as proof". Every formula-bar line is 32 characters or fewer, so the bar stays one line at 40-42 px. `lookOpts.marks` tints rows 9 and 15 rose ("not double", "not yet") and row 16 yellow ("doubled").

---

## 09b: Becker Rig: "Leave $1,000 at 7% for 30 years. $1,000 + 30 × $70 = $3,100?"

| | |
|---|---|
| Look | `becker-rig` (a light void, one green stick figure, a ladder whose rungs are the year rows, coins thrown up to each rung, per-row composition meters, a gold plate and impact on the last row) |
| Spec | `studio/specs/09b-becker-rig-1000-times-1-07.json` (32.5 s) |
| Platform title | **Leave $1,000 at 7% for 30 Years. Is It Really Just $3,100?** |
| On-screen hook (header) | **Leave $1,000 at 7% for 30 years. / $1,000 + 30 × $70 = $3,100?** (14 words, 2 lines; "$1,000" in the hero green, "$3,100?" in the red second emphasis) |
| Frame 1 | Header. The figure in the "think" pose at the foot of the ladder (a nod at 0.35-0.75 s). 8 dim rungs labelled 1, 2, 5, 10, 15, 20, 25, 30, each with a dotted empty shelf. Footer |
| Footer | ASSUMES 7% a year, added once a year · not a forecast · got $5,000? × 5 |

**Topic vs the seed:**
- Kept: Becker idea 1's maths, $1,000 × 1.07 once a year, with $1,967 at year 10 and $7,612 at year 30 (verified figures in `watch/alan-becker.md` §6), and its devices: numbers as objects (each coin becomes its row's number), the escalation ladder, and the final scale gag (the last coin is too heavy and has to be heaved).
- Not kept: the ×1.07 gate prop. The kit does not draw it (`lookOpts.gate` was ignored), so the spec no longer asks for it and the beat sheet does not mention it.
- Added: the simple-interest guess ($70 a year × 30 + $1,000 = **$3,100**) is now **printed in the header at frame 1**, so the ladder has a visible number to beat for the whole video. Year 20 already passes it.

**Wrong belief it exploits:** "7% of $1,000 is $70 a year, so in 30 years I have $3,100." That is linear thinking, the most common compounding mistake. The header prints it as a question, and the ladder breaks it: year 2 adds $74.90, not $70; year 20 is already past $3,100; year 30 is about 2.5 times the guess.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$1,000", "7%", "30" and the sum "$1,000 + 30 × $70 = $3,100?" are on screen at 0.0 s. The first coin is airborne by 1.2 s and lands as **$1,070** at 1.6 s |
| R2 | One input ($1,000). The second header line is the viewer's wrong answer, asked with a red "?", not the result (hook bank 4.6B) |
| R3 | The footer's "got $5,000? × 5" lets any lump size swap in: every row scales |
| R4 | $1,000 is round and familiar, and it is the Becker idea's own stake |
| R5 | The wrong answer is printed at frame 1 and spoken at 2.2 s ("So year 30: $3,100. Right?") |
| R6 | You (imperative "Leave") + $1,000 + 30 years |
| R7 | Two answers compete from frame 1: the header's $3,100? and the ladder |
| R8 | 14 words, 2 lines |
| R9 | 8 rungs on screen from frame 1 (dim years, dotted shelves) |
| R10 | First payoff at 1.6 s ($1,070). Biggest number last (≈ $7,612, heaved onto the top rung) |
| R11 | The header asks; the verdict answers. Caption line 1 holds the number back ("Not $3,100. Not even close.") |
| R12 | Lopsided and repeatable: "≈ $7,612, not $3,100", about 2.5 times the guess |

**Benchmark hooks it is modelled on**
- Hook bank 4.6, rewrite B: "$10 − $2.96 of food = $7.04 profit?", with the formula visible and the "?" in red. Borrowed: the wrong answer as an on-screen sum with a red question mark.
- H84, Master Money: "4 DEAD SIMPLE NUMBERS…", with its formula-then-result opener "Take your salary and multiply it by 0.7". 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: the first spoken line is the first calculation ("Year 1 adds $70."), with no greeting.
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years", with the spoken "How much return can you get…?". 3,771,667, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: amount + rate + horizon, and the row-by-row ladder.
- H72, The Market Hustle: "How hitting $100K by age 40 and never investing again would grow". 67,160 (1.6x med), https://www.instagram.com/reel/DdpT7thyGvN/. The benchmark's lump-sum, left-alone P2. It was a single-result calculator; 09b adds the guess to beat.

**Beat sheet** (the rig choreography is the kit's own: a coin thrown to each rung, the last one heaved; this sheet lists only what the kit draws)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header with "$3,100?" in red, ladder with dim rungs, the figure thinking (nods at 0.35 s), footer | "Year 1 adds $70." (0.0-2.0) |
| 0.65-1.2 | The figure winds up and throws the first coin | |
| 1.6 | The coin lands on rung **1**: **$1,070**; "$1,000" slides into "You put in"; its meter draws | |
| 2.2 | (the header's sum is the same claim) | "So year 30: $3,100. Right?" (2.2-5.8) |
| 6.0 | Rung **2**: ≈ $1,145 | "Year 2 adds about $75, not $70." (6.0-10.0) |
| 8.2 | Rung 5: ≈ $1,403 | |
| 10.2 | Rung **10**: ≈ $1,967. Its meter is almost half green | "Year 10: about $1,967. Almost doubled." (10.2-15.0) |
| 12.8 | Rung 15: ≈ $2,759 | |
| 15.2 | Rung **20**: ≈ $3,870, under the header's "$3,100?" | "Year 20: about $3,870. Already past $3,100." (15.2-21.6) |
| 18.6 | Rung 25: ≈ $5,427 | |
| 20.3-21.8 | The figure lifts the last, biggest coin overhead, wobbles and heaves it (riser, whoosh) | |
| 21.8 | Rung **30**: **≈ $7,612** on the gold plate. Hit, shake, coin spill, celebrate, then he points up | "Year 30: about $7,612." (21.8-25.4) |
| 25.6 | Verdict in the caption band: "**≈ $7,612**, not $3,100. / Each year's 7% earns 7% too." Ding (kit) | "Not $3,100. About 2.5 times that." (25.6-30.4) |
| 30.4-32.5 | Hold, then loop | |

The longest stretch with no landing is 1.6-6.0 s (4.4 s, down from 6.8 s). It carries the guess: the VO says it while the same sum sits in the header, and the figure is back in idle between throws.

**Full guide VO** (73 spoken words)

> Year 1 adds $70. So year 30: $3,100. Right? Year 2 adds about $75, not $70. Year 10: about $1,967. Almost doubled. Year 20: about $3,870. Already past $3,100. Year 30: about $7,612. Not $3,100. About 2.5 times that.

"So year 30: $3,100" names a balance, like every later rung line ("Year 10: about $1,967"), and the header shows how it is built ($1,000 + 30 × $70). It can no longer be heard as 30 × $70 alone.

**The maths**

- **Basis:** V(y) = $1,000 × 1.07^y. The 7% is credited once a year, and nothing is added or withdrawn.
- **The guess:** S(y) = $1,000 + $70 × y (simple interest).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| "Year 1 adds $70" | 1,000 × 7% | 70 | $70 |
| Year 1 | 1,000 × 1.07 | 1,070.00 | $1,070 |
| Year 2 | × 1.07² | 1,144.90 | ≈ $1,145 (VO: adds about $75; exact add $74.90) |
| Year 5 | × 1.07⁵ | 1,402.55 | ≈ $1,403 |
| Year 10 | × 1.07¹⁰ | 1,967.15 (1.967×) | ≈ $1,967, "almost doubled" |
| Year 15 | × 1.07¹⁵ | 2,759.03 | ≈ $2,759 |
| Year 20 | × 1.07²⁰ | 3,869.68 | ≈ $3,870 (> $3,100) |
| Year 25 | × 1.07²⁵ | 5,427.43 | ≈ $5,427 |
| Year 30 | × 1.07³⁰ | 7,612.26 | ≈ $7,612 |
| Header "$1,000 + 30 × $70 = $3,100?" | 1,000 + 70 × 30 | 3,100 | $3,100? |
| "2.5 times" | 7,612.26 ÷ 3,100 | 2.456 | about 2.5 |
| Footer "got $5,000? × 5" | 5,000 ÷ 1,000 | 5 | × 5 (year 30 ≈ $38,061) |
| "You put in" | the one deposit | 1,000 | $1,000 on every rung |

- **Cross-checks:**
  - It first passes the guess in year 17 ($3,158.82), 13 years early.
  - It doubles in year 11 ($2,104.85). Rule of 72: 72 ÷ 7 ≈ 10.3.
  - Year 30 alone adds ≈ $498 (7,612.26 − 7,114.26).
  - $1,967 and $7,612 match the Python-checked figures in `alan-becker.md` §6, idea 1.

**Sources:** none. There is no real-world input; 7% is a stated assumption.
**Assumptions (in the footer):**
- 7% a year, credited once a year;
- nothing added or withdrawn (the header's "Leave");
- no fees, taxes or inflation;
- not a forecast.

**Caption**
> Not $3,100. Not even close.
> $1,000 left alone at 7% a year for 30 years. Adding $70 a year (simple interest) gets you $3,100. Growing × 1.07 every year gets you ≈ $7,612, about 2.5 times as much, because every year's 7% lands on a bigger pile: year 2 adds $74.90, year 30 adds ≈ $498. It almost doubles by year 10 (≈ $1,967), the Rule of 72 at work (72 ÷ 7 ≈ 10). Got $5,000? Multiply every row by 5.
> Maths: 7% a year, credited once a year, nothing added or taken out. An assumption, not a forecast. Educational maths, not advice.
> #compoundinterest #investing #moneymath #mathtok

**Pinned comment**
> Keep going: year 40 is ≈ $14,974. The $70-a-year version is $3,800.

**Per-platform notes**
- **YouTube Shorts:** the title and the header carry the same guess as a question. The screen never prints $3,100 as the answer.
- **Instagram Reels:** cover on frame 1 (the red "$3,100?" over the empty ladder) or on the heave frame (≈ 21 s).
- **TikTok:** the comment fight is "where do you get 7%?". Pin the year-40 comment first, and reply with the long-run S&P figures if asked (sources under 09a).
- **Look note:**
  - Becker devices used (`alan-becker.md` §4): numbers as objects (the coin becomes the number), the escalation ladder, and the final scale gag (the heave).
  - The kit ignores `lookOpts.guess` and `lookOpts.gate`, so the spec no longer carries them; the guess lives in the header, which the chrome draws for the whole video (checked in stills at 0, 1.4, 2.4, 7.0, 16.5, 23.5 and 28 s).
  - If the kit later adds a ghost "$3,100?" tag on the year-30 shelf or the ×1.07 gate, they would strengthen R9 and Becker idea 1; neither is needed for the teaser to work.

---

## 09c: Scoreboard: "$5 a day, invested. A millionaire in 40 years?"

| | |
|---|---|
| Look | `scoreboard` (a black top bar with a neon odometer, a dark stage with a board of year slots and two-tone meters, one green money colour) |
| Spec | `studio/specs/09c-scoreboard-5-a-day-millionaire.json` (35.2 s) |
| Platform title | **Does $5 a Day Make You a Millionaire in 40 Years?** |
| On-screen hook (header) | **$5 A DAY, INVESTED. / A MILLIONAIRE IN 40 YEARS?** (9 words, 2 lines; "$5 A DAY" is the only green word) |
| Frame 1 | Header. The hero odometer (with a coin icon, `lookOpts.icon`) already counting up from $0 toward year 1. Footer working "$5 × 365 ÷ 12 ≈ $152/mo · 7% a year · not a forecast" under it. The goal strip "MILLIONAIRE $1,000,000" over the board (`lookOpts.goal`), and 7 dark year slots |
| Footer | $5 × 365 ÷ 12 ≈ $152/mo · 7% a year · not a forecast |

**Topic vs the seed:**
- Kept: $5 a day ≈ $152 a month at 7%, year by year.
- Added: ChartOrbit's yes/no verdict question ("make you rich?"), made checkable: "a millionaire **in 40 years**?". The horizon is the popular claim's own, so the question has a wrong answer to bust, and the ladder runs on to the year the answer flips: **year 54**.
- Changed in this revision: the rate is now an effective 7% a year (every row's dollars grow exactly 7% a year), so the footer's "7% a year" is literally what the rows do. The round-1 table used 7% ÷ 12 a month, which is ≈ 7.23% a year and put the million in year 53.

**Wrong belief it exploits:** "$5 a day makes you a millionaire in 40 years." At an assumed 7% a year it is ≈ $375,900 in year 40, **not even halfway**, and it passes $1,000,000 only in year 54. Even at 10% a year, year 40 is ≈ $844,100. Reaching $1,000,000 in 40 years takes about 10.6% a year, every year (pinned comment).

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$5" and "40" in the header, "≈ $152/mo" and "7%" in the footer, the $1,000,000 goal strip, and a moving odometer, all at 0.0 s |
| R2 | One input ($5 a day). "A millionaire in 40 years?" is the claim to test, not a result |
| R3 | Partial: one fixed $5. The caption says "$10 a day? Double every row"; the one-line Scoreboard footer has no room for it |
| R4 | $5 a day is small and habitual (the benchmark's $3/day Monster at 140.6x; The Market Hustle's "$10 each day") |
| R5 | The popular claim's horizon is printed. Year 40 lands "not even halfway" |
| R6 | $5 a day + 40 years, invested (the "you" is the VO's and the title's) |
| R7 | A yes/no with the finish line ($1,000,000) and the horizon (40 years) both on screen |
| R8 | 9 words, 2 lines |
| R9 | 7 dark slots and the goal strip from frame 1; each meter's halfway notch shows the distance left |
| R10 | First payoff at 2.0 s (Year 1: ≈ $1,900). Biggest number last (≈ $1,011,700) |
| R11 | The question is in the header, and the verdict replaces it in the same band. Caption line 1: "Not even halfway." |
| R12 | A repeatable verdict: "Not in 40. In 54." |

**Benchmark hooks it is modelled on**
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?", with frame 1 "POV: Since 1996 you invested $100/month in BMW and never sold". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: the yes/no verdict question in P2.
- H45, @investment_timeline: "POV: You invested in Monster instead of paying $3/day for a Monster Energy". 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. Borrowed: a small per-day amount as the stake. No product is named here, because that grammar belongs to the `pov-race` lane.
- H49, The Debt Freedom Project: the verdict caption "Yes, daily payments work!". 382,100 (289.1x), https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133. Borrowed: a verdict that takes a side, here a "no" with a date.
- Contrast: H75, The Market Hustle, "How to start Investing with $550 per month and still Retire a Millionaire", 34,225 (below median), https://www.instagram.com/reel/Ddmy4fQhwSY/. A millionaire goal with no horizon to argue with; 09c names one.

**Beat sheet** (each rung is a hard cut: a thud, the slot lights, the year and "you put in" slam in, then the row's Worth and the hero count up together while its meter grows)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Hero odometer counting from $0. Goal strip "MILLIONAIRE $1,000,000". 7 dark slots. Footer working | "$5 a day for 40 years. Millionaire?" (0.0-3.2) |
| 2.0 | **YEAR 1** lights: $1,825 / ≈ $1,900 | |
| 3.4 | Cut. **YEAR 10**: $18,250 / ≈ $26,000 | "Year 10: about $26,000." (3.4-6.2) |
| 6.4 | Cut. **YEAR 20**: $36,500 / ≈ $77,200 | "Year 20: about $77,200." (6.4-10.0) |
| 10.2 | Cut. **YEAR 30**: $54,750 / ≈ $177,900 | "Year 30: about $177,900." (10.2-14.6) |
| 14.8 | Cut. **YEAR 40**: $73,000 / ≈ $375,900. Its meter stops well short of the halfway notch | "Year 40: about $375,900." (14.8-19.2) |
| 19.4 | Caption "Not even halfway." Buzz | "Not even halfway." (19.4-20.6) |
| 20.8 | Cut. **YEAR 50**: $91,250 / ≈ $765,400 | "Year 50: about $765,400." (20.8-25.2) |
| 25.4 | Cut. **YEAR 54**: a taller slot; the count rolls at least 2.4 s past the goal to **≈ $1,011,700** / $98,550. Hit + cash (kit); the goal strip and the slot light green | "Year 54: over $1,000,000." (25.4-28.2) |
| 28.4 | The verdict replaces the header: "NOT IN 40. / **IN 54 YEARS.**" | "Not in 40. In 54. You put in under a tenth." (28.4-33.2) |
| 33.2-35.2 | Hold, then a hard cut back to frame 1 (loop) | |

Rung gaps are 1.4, 3.0, 3.8, 4.6, 6.0 and 4.6 s. The Scoreboard ladder rule is one cut every 2.5-4 s; the 6.0 s year-40 → year-50 gap is the reversal, and it is now split by the caption change and buzz at 19.4 s. Accepted (verifier nit).

**Full guide VO** (79 spoken words)

> $5 a day for 40 years. Millionaire? Year 10: about $26,000. Year 20: about $77,200. Year 30: about $177,900. Year 40: about $375,900. Not even halfway. Year 50: about $765,400. Year 54: over $1,000,000. Not in 40. In 54. You put in under a tenth.

**The maths**

- **Basis:** m = $5 × 365 ÷ 12 = $152.0833 deposited at each month-end, at an **effective 7% a year**: the monthly rate is r = (1.07)^(1/12) − 1 = 0.5654%, so every dollar grows exactly × 1.07 a year.
- **Formulas:**
  - Worth after n months: W(n) = m × ((1 + r)^n − 1) ÷ r.
  - You put in: $5 × 365 × years.
- **Display:** nearest $100.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Footer "≈ $152/mo" | 5 × 365 ÷ 12 | 152.08 | ≈ $152 |
| Year 1 | W(12) / 1,825 | 1,882.84 | ≈ $1,900 / $1,825 |
| Year 10 | W(120) / 18,250 | 26,014.12 | ≈ $26,000 / $18,250 |
| Year 20 | W(240) / 36,500 | 77,187.82 | ≈ $77,200 / $36,500 |
| Year 30 | W(360) / 54,750 | 177,854.25 | ≈ $177,900 / $54,750 |
| Year 40 | W(480) / 73,000 | 375,880.35 | ≈ $375,900 / $73,000 ("not even halfway": < $500,000) |
| Year 50 | W(600) / 91,250 | 765,427.65 | ≈ $765,400 / $91,250 |
| Year 54 | W(648) / 98,550 | 1,011,679.20 | ≈ $1,011,700 / $98,550 ("over $1,000,000") |
| "In 54" | the first year-end with W ≥ $1,000,000 (year 53 is $943,734.92; the crossing is in month 646) | 54 | 54 |
| "under a tenth" | 98,550 ÷ 1,011,679.20 | 9.7% | under a tenth |

- **Cross-checks:**
  - With yearly compounding and year-end deposits of $1,825, the million comes in year 55; with 7% ÷ 12 a month (≈ 7.23% a year effective), in year 53 (round 1's table). The verdict "not in 40" holds under all three conventions.
  - Growth at year 54 is ≈ $913,100.
  - The Scoreboard storyboard in `03-look-directions.md` used 7% ÷ 12 a month (≈ $185,537 at year 30). 09c deliberately differs: ≈ $177,900 at an effective 7%.
- **Pinned-comment and caption figures:**
  - At 10% a year (effective), year 40 is ≈ $844,100 (844,115.45), and the million comes in month 501, year 42.
  - At 10% ÷ 12 a month, year 40 is ≈ $961,800 (961,787.10): still short.
  - The rate that reaches $1,000,000 in exactly 40 years is ≈ 10.6% a year.
  - At 7% ÷ 12 a month: year 40 ≈ $399,200 (399,190.37), million in year 53.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 7% after inflation, ≈ 10% before, since 1928" uses the sources under 09a: Official Data Foundation, 10.09% / 6.81% (confirmed); A Wealth of Common Sense from Damodaran, 9.94% nominal for 1928-2024 (confirmed; its real figure is unconfirmed).

**Assumptions (in the footer, plus the caption for the compounding detail):**
- $5 × 365 ÷ 12 a month, deposited at month-end;
- 7% a year, effective (each dollar grows 7% a year);
- no fees or taxes;
- not a forecast;
- read as rough today's dollars only if the $5 rises with prices.

**Caption**
> Not even halfway.
> $5 a day is ≈ $152 a month ($5 × 365 ÷ 12). At an assumed 7% a year, year 40 is ≈ $375,900: not even halfway to $1,000,000. It gets there in year 54 (≈ $1,011,700). You put in $98,550, under a tenth of it. $10 a day? Double every row.
> Why 7%? The S&P 500 has returned ≈ 7% a year after inflation since 1928 (≈ 10% before), so read these as rough today's-dollar figures if your $5 rises with prices. "7% a year" here means each dollar grows 7% a year. If your calculator uses 7% ÷ 12 a month (≈ 7.2% a year), year 40 is ≈ $399,200 and the million comes in year 53: still not 40. Not a forecast. Educational maths, not advice.
> #investing #compoundinterest #millionaire #moneymath

**Pinned comment**
> Heard "$5 a day makes you a millionaire in 40 years"? Even at 10% a year, year 40 is ≈ $844,100 (≈ $961,800 if you compound 10% ÷ 12 monthly). Still short. It takes about 10.6% a year, every year for 40 years, in future dollars.

**Per-platform notes**
- **YouTube Shorts:** the title is ChartOrbit's grammar plus the horizon. The roll past the goal at 25.4 s is the moment to keep.
- **Instagram Reels:** cover on the year-40 frame ("≈ $375,900", the meter short of the halfway notch): the open question makes a strong cover. Caption line 1 holds the number back.
- **TikTok:** expect "S&P does 10%!" comments. The pinned comment answers with the 10% maths under both compounding conventions. That is the benchmark's input-argument engine, and it is honest.
- **Risk:** "millionaire" hooks flopped in the benchmark (H75, H88) when they had no horizon to argue with. 09c names the meme's 40 years, leads with the $5 input and pays off every 3-5 s, which is P2 behaviour. If it still underperforms, test the fallback header "$5 A DAY, INVESTED. / WHAT'S IT WORTH, YEAR BY YEAR?" with the same ladder.
- **Look note:**
  - `lookOpts.goal` draws the $1,000,000 strip, scales every meter to it and adds the halfway notch: the countable open loop.
  - `lookOpts.icon: "coin"` sits beside the hero counter.
  - The kit puts the footer in the top bar under the hero, and the verdict replaces the header there, clear of the caption band (stills at 0, 2.8, 16.5, 19.8, 28.2 and 30.5 s).
  - In race terms this is one counter climbing toward a fixed line. It is not a crash race, so there are no crash bands (the look's rule for fixed-rate hypotheticals).

---

## Search log (6 searches over two rounds)

1. (Round 1) S&P 500 historical average annual return since 1928, nominal and inflation-adjusted (Damodaran 2025). Secondary summaries: ≈ 10.0% nominal, ≈ 6.5-7% real.
2. (Round 1) Damodaran "Historical Returns on Stocks, Bonds and Bills" 1928-2025, geometric average, real. A Wealth of Common Sense results: ≈ 6.9% real and ≈ 10% nominal for 1928-2025 (summary).
3. (Round 1) The same, restricted to awealthofcommonsense.com. The January 2025 article: 1928-2024 stocks +9.94% nominal. (Round 1 also recorded "+6.8% real" here; the verifier could not confirm it, and neither could search 5.)
4. (Round 1) officialdata.org S&P 500 since 1928. 10.09% a year nominal, 6.81% inflation-adjusted.
5. (Revision) "A Wealth of Common Sense historical returns 1928-2024 stocks 9.9% inflation-adjusted real return". Confirms +9.94% nominal for 1928-2024 and about 3% inflation; the real return appears only as a derived "roughly 6-7%". Not a confirmation of 6.8%.
6. (Revision) "Damodaran historical returns S&P 500 1928-2025 geometric average real return". Summaries give ≈ 10.0% nominal and ≈ 6.9% real for 1928-2025; not read from the primary page.

WebFetch on pages.stern.nyu.edu and awealthofcommonsense.com was blocked by the egress proxy (round 1), and on awealthofcommonsense.com again in this revision.

---

## Review log (round-2 verifier and hook judge)

The checker went from 504 to **518 checks, 0 failures**. The studio linter: 3/3 clean, 0 errors, 1 warning (09c footer, 37.7 px). Stills read: 09a at 0, 2.5, 5.5, 7.6, 10.0, 11.8, 16.8, 18.6, 18.8, 19.5, 20.4, 22.5, 26.5, 27 and 28 s; 09b at 0, 1.4, 2.4, 7.0, 16.5, 23.5 and 28 s; 09c at 0, 2.8, 16.5, 19.8, 28.2 and 30.5 s.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 09c | must | "7% a year" on screen, but every row used 7% ÷ 12 a month (≈ 7.23% a year), so "year 53" depended on a hidden convention | **Option B.** Every row is now recomputed at an effective 7% a year (monthly rate (1.07)^(1/12) − 1), so the footer's plain "7% a year" is what the rows do and matches the caption's long-run (annualized) justification. New rows: ≈ $1,900, $26,000, $77,200, $177,900, $375,900, $765,400 and **≈ $1,011,700 at year 54** (crossing in month 646). VO, verdict, caption and pinned comment say 54. "Not even halfway" (37.6%) and "under a tenth" (9.7%) still hold. The pinned comment's 10% figure is now ≈ $844,100 at year 40 and year 42 for the million, with the 10% ÷ 12 variant (≈ $961,800) beside it. The caption names the other convention (7% ÷ 12 → year 53). I chose B over A because "7%/12 a month" on a one-line footer is jargon, and B needs no extra label. The checker now asserts that (1 + r)^12 = 1.07 |
| V2 | 09b | should | The Becker kit ignores `lookOpts.guess` and `lookOpts.gate`: no "$3,100?" marker, a boing over an empty frame, "Already past the guess" pointing at nothing, 6.8 s with nothing landing | **Removed the dependence.** Both `lookOpts` keys and the 6.6 s boing are gone. The guess is now printed in the header ("$1,000 + 30 × $70 = $3,100?"), which the chrome draws for the whole video (checked in stills). The VO names the number ("Already past $3,100."). The opening was re-cut: row 1 lands at 1.6 s and row 2 at 6.0 s, so the empty stretch is 4.4 s and carries the guess. The beat sheet describes only what the kit draws. I did not edit the kit: its module belongs to the kit builders and is not needed now |
| V3 | 09a | should | The "1st $100 ≈ $356" line had no horizon and appeared just after row 20 landed | **Both fixes.** The line names its year ("Yr 16: 1st $100 ≈ $356"), and row 20 moved from 17.2 to 19.8 s, so row 16 is the newest row while it shows (the checker asserts both). The "last $100" half became its own line, "Newest $100: still $100", at 19.6 s ("starts from zero"), because the combined 33-character line wrapped onto two lines in the stills |
| V4 | 09a | should | The Live Sheet module was a stub, so the ladder, formula bar and marks were never linted; lookOpts not documented | The module has landed. Re-linted: 0 errors, 0 warnings. Stills checked: 8 rows plus the mark slot fit, with the sheet ending at about y 1180 and the footer above y 1300. Two formula-bar lines (33 and 34 characters) wrapped onto two lines; I shortened them, and the checker now enforces 32 characters or fewer. Documented `formulaBar`, `marks`, `markStyle`, `inputsAtStart`, `unmask`, `bars` and `subLabels` in `looks/live-sheet/README.md` §8 |
| V5 | 09c | should | The Scoreboard module was a stub; footer placement, odometer, board and goal never linted; `goal`/`icon` not documented | The module has landed. Re-linted: 0 errors, 1 warning (the footer at 37.7 px, above the 34 px floor). This kit puts the footer in the top bar under the hero by design (the board fills the stage to y 1300 with captions on), not in the bottom bar. Stills show the board, the goal strip, the meters and the verdict replacing the header, clear of the caption band. Documented `goal`, `icon`, `input` and `meters` in `looks/scoreboard/README.md` |
| V6 | 09a | nit | Nothing on screen says the Rule of 72 is for a lump sum | Added the formula-bar line "Rule of 72 = one lump sum" at 16.0 s ("Why 16, not 9?") |
| V7 | 09a | nit | Pinned comment's 7% and 10% years hold only for monthly compounding | Now "At 7% a year (compounded monthly) it takes until year 19. At 10%, year 13." |
| V8 | 09b | nit | "about 2.5× more" is wrong (it is 1.46× more); "30 years of that is $3,100" can be heard as 30 × $70 | Caption: "about 2.5 times as much". VO line 2 is now "So year 30: $3,100. Right?", a balance like every later rung line, with "$1,000 + 30 × $70" in the header. The checker asserts 2.4 ≤ 7,612.26 ÷ 3,100 < 2.6 |
| V9 | 09c | nit | Rung gaps up to 5.7 s against the look's 2.5-4 s rule | Accepted. The year-40 line is now split from "Not even halfway.", so the 6.0 s 40 → 50 gap gets a caption change and a buzz at 19.4 s. Noted under the beat sheet |
| V10 | 09a | nit | The AWOCS "+6.8% real" was never confirmed; officialdata is a live year-to-date figure | The real figure is now attributed to Official Data Foundation (6.81%, read 2026-10-07, live figure). The AWOCS real figure is marked unconfirmed and dropped from the checker (`SP_REAL = (6.81,)`). Two more searches (5, 6) still did not confirm it, and the page fetch is blocked. **[click-check]** kept. Caption wording unchanged |

### Hook judge

| Teaser | Score before | Issue | What I did | My estimate after |
|---|---|---|---|---|
| 09a | 6 | must: no wrong answer at frame 1 (R5, R7 fail); the first VO repeats the banner | **Adopted the rewrite.** Header "$100 a month at 8%. / Doubled by year 9?"; formula bar at 0.0 s "Year 9: 2 × $10,800 = $21,600?" (exact); title "$100 a Month at 8%: Doubled by Year 9?". The judge's first VO line (18 spoken words in 6.6 s) breaks the 2.6 words-a-second budget, so it is split and trimmed: "$100 a month at 8%." + "Rule of 72: doubled by year 9." The year-9 bar now compares with the frame-1 target ("≈ $15,743 < $21,600"). Caption line 1 is "Rule of 72 says year 9. Not even close." rather than "The Rule of 72 is wrong here": the rule is right for a lump sum, so calling it wrong would be dishonest | 7 |
| 09b | 5 | must: the generic "what's it worth?" question; the $3,100 twist off screen until 4.6 s and absent on IG/TikTok; R3, R5, R7 fail | **Adopted the rewrite.** Header "Leave $1,000 at 7% for 30 years. / $1,000 + 30 × $70 = $3,100?" with "$3,100?" in the red second emphasis. The judge's first VO (25 spoken words in 9 s) does not fit 2.6 words a second, so the opener is "Year 1 adds $70. So year 30: $3,100. Right?" (0.0-5.8 s). It puts the first coin in the air by 1.2 s and on rung 1 at 1.6 s, which also answers the judge's Becker "something arrives within 1 s" point as far as the kit allows. Added the judge's optional "got $5,000? × 5" to the footer for R3 (linted, no warning). Caption line 1: "Not $3,100. Not even close." I kept the $3,100 guess rather than the judge's alternative ("What does year 30 earn?", ≈ $498): the guess is the more common belief, and it is now on screen | 7 |
| 09c | 6 | must: "millionaire?" with no horizon is trivially "yes, eventually" (P3 risk); R6 fails; the verdict is an anticlimax | **Adopted the rewrite**, with the V1 numbers. Header "$5 A DAY, INVESTED. / A MILLIONAIRE IN 40 YEARS?"; first VO "$5 a day for 40 years. Millionaire?"; year 40 turns on "Not even halfway." (now its own line); verdict "Not in 40. / In 54 years." ("years" added so the verdict reads on its own as a cover); title "Does $5 a Day Make You a Millionaire in 40 Years?"; caption line 1 "Not even halfway."; pinned comment "Even at 10% a year, year 40 is ≈ $844,100 … Still short." (≈ $961,800 under 10% ÷ 12, also short). One change from the rewrite: row 1 lands silently at 2.0 s under the question rather than at 3.2 s with its own VO line, which keeps the first payoff inside 3 s (R10) | 7.5 |
| all | — | should: caption line 1 gives the payoff away in the feed | Line 1 of every caption now names the bust without the number; the answer comes after the first 100 characters | — |

The hook judge's output reached me truncated after the caption-giveaway issue, so any later items in it were not visible to me and are not addressed here.

### Hook pass (2026-10-08)

Two judges scored each teaser's current hook and four candidate rewrites (A-D) out of 10. The rule: adopt the best candidate only if its average is at least 7.5 and at least 0.75 above the current hook. A key that either judge marks dishonest is out; both judges marked every visible key honest. Two things were cut off in transit: judge 2's 09c scores for C and D, and the 09c candidate text after A's change list.

| Teaser | Current | A | B | C | D | Decision |
|---|---|---|---|---|---|---|
| 09a | 5.5 / 5 → **5.25** | 7 / 7 → **7.00** | 7 / 6.5 → 6.75 | 6 / 5 → 5.50 | 6 / 6 → 6.00 | **Keep current** |
| 09b | 6 / 5 → **5.50** | 7 / 6 → 6.50 | 7.5 / 7 → **7.25** | 6.5 / 6 → 6.25 | 5.5 / 4.5 → 5.00 | **Keep current** |
| 09c | 6 / 5.5 → **5.75** | 5.5 / 6 → 5.75 | 6.5 / 5.5 → **6.00** | 5 / cut off | 5.5 / cut off | **Keep current** |

**Why nothing was adopted:**
- No candidate reached 7.5. The best were 09b-B (POV, "$1,000 for you at birth", 7.25) and 09a-A ("When does it earn $100 a month?", 7.00). Both clear the +0.75 margin but miss the floor.
- On 09c, judge 2's missing scores cannot change the result. For C to reach 7.5, judge 2 would need a 10; for D, a 9.5. Judge 2's highest score in this format was 7. B-D's specs were also cut off, so none of them could have been applied as written.

**Titles:** all three are kept. The judges scored whole hooks, not titles alone, and no candidate title is clearly better for the current body:
- **09a.** A's and B's titles ask questions the current video does not answer: when growth passes $100 a month (year 9, not on screen), and halfway (year 23, which has no row). C's "The Rule of 72 Says 9 Years. Not for $100 a Month." fits the current numbers. But both judges docked C for giving the verdict away, and a title that does so in the feed has the same flaw. C averaged 5.50, against 5.25 for the current hook. D's title needs the share-of-balance framing.
- **09b.** Both judges flagged that the current title's "Is It Really Just" gives away the direction of the answer. No candidate title fixes that for the current body. A's needs each year's earnings (≈ $498 is not on any rung). B's needs the age ladder. D's needs the "Really cost" column. C's "Double? Triple? More?" fits (≈ 7.6× is "more"), but both judges found that "More?" gives the answer away in the same way.
- **09c.** A's "$5 a Day Won't Make You a Millionaire in 40 Years. So When Does It?" fits the body (year 54). But it is A's verdict-first hook moved into the title, and both judges docked exactly that (R2/R11) and the P3 "so when?" loop. A averaged 5.75, level with the current hook. B-D's titles were cut off.

**What the judges agreed on, for the next round:**
- **09a.**
  - The current wrong answer (year 9) only lands for viewers who already know the Rule of 72, and the rule is not named until 3.4 s. vo[0] repeats the banner word for word. Nothing new moves from 0.5 to 3.4 s. There is no "you".
  - A was the strongest lever (7 / 7): a payout noun, and the ≈ $8-vs-$100 gap on screen by 0.5 s. It was held back by its P3 time-to-goal shape, and because the empty cells count Worth, not the monthly earnings the question asks about. It also has no horizon.
  - If A is revisited, both judges ask for the same wording fix. "Year 1 earns about $8 a month" is the year-end rate: month 12 grows $7.58, month 13 grows $8.30, and the year-1 average is $3.75. Say "By year 1 it's earning about $8 a month."
  - B (6.75) attacks a belief everyone holds. But "halfway there" is measured against a total not seen until 12 s, and "half the money" is literally true of the put-in ($18,000 of $36,000).
- **09b.**
  - The current header carries 7 numbers and a sum in 14 words, and nothing lands until $1,070 at 1.6 s.
  - B came closest. It was held back by a passive, hypothetical stake ("someone invested for you"), by the generic "what's it worth at 65?" question, and by its 3 lines. Its age rungs also drift toward 02's find-your-row lane: judge 2 asks for that lane question to be settled before it ships.
  - A (6.50) asks about each year's earnings, but the rungs show balances. Its ≈ $498 answer cannot be read off the ladder.
- **09c.**
  - The current vo[0] spends 3.2 s repeating the header. There is no "you" on screen. "Millionaire" is the benchmark's weak spot (H75 34,225; H88 15,274).
  - A answers the yes/no on frame 1. B's "your age + 54" is cosmetic, because every viewer's row is the same 54 years.
- **Open items (not applied, because they were not scored):**
  - 09a and 09c: give vo[0] new information instead of the banner. Both judges named the banner echo on each.
  - 09b: a title that mirrors the header without "Is It Really Just", e.g. "Leave $1,000 at 7% for 30 Years: $3,100?".

**Files:** no changes to the specs, beats, VO, captions, check script or `teasers.json`.
- Re-run of `checks/09-growth-ladder.py`: **518 checks, 0 failures**, exit 0.
- `node src/cli.mjs check` on all three specs: 0 errors, 0 warnings. With today's Scoreboard kit, the round-2 warning on the 09c footer (37.7 px) no longer fires.
- Stills at 0, 1.5 and 3 s for all three, with today's kits:
  - **09a.** At 0.0 s: the banner, the formula bar typing "Year 9: 2 × $10,800", row 1 at ≈ $1,245, and seven put-in rows with empty Worth cells. The bar reads "= $21,600?" by 1.5 s. Nothing else changes by 3.0 s, as both judges said.
  - **09b.** At 0.0 s: the 2-line header with "$3,100?" in red, the footer, and 8 dim rungs. The figure stands at the left edge, with its pencil just past the frame. The coin is in the air at 1.5 s, and $1,070 sits on rung 1 at 3.0 s.
  - **09c.** At 0.0 s: the header, the odometer already rolling (≈ $1,84x), the footer working, and the goal strip over 7 dark slots. YEAR 1 is lit (≈ $1,900) by 3.0 s.
