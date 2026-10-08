# Format 9: year-by-year growth ladder, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews). Hook pass 2026-10-08 (all three hooks kept), then hook pass 2 the same day (**all three hooks replaced**), then the assembly pass and the assembly fix pass (after QA) the same day. What changed and why is in the **Review log** at the end.
**Format:** `growth-ladder`, hook pattern **P2** ("small amount × time =") for the ladders. Since hook pass 2 the hooks on top of them are a payout question (09a), a POV gift (09b) and a P1 "take your number × a constant" (09c).
**Lane:** one small regular amount (or one small lump), year by year
**Files:**
- Specs (the ids and file names are unchanged by hook pass 2, so links, renders and the slate still resolve):
  - [`studio/specs/09a-live-sheet-100-a-month-doubles.json`](../../studio/specs/09a-live-sheet-100-a-month-doubles.json)
  - [`studio/specs/09b-becker-rig-1000-times-1-07.json`](../../studio/specs/09b-becker-rig-1000-times-1-07.json)
  - [`studio/specs/09c-scoreboard-5-a-day-millionaire.json`](../../studio/specs/09c-scoreboard-5-a-day-millionaire.json)
- Check: [`teasers/v2/checks/09-growth-ladder.py`](checks/09-growth-ladder.py). Run `python3 teasers/v2/checks/09-growth-ladder.py`.
  - It reports **492 checks, 0 failures** and exits 0 (after the assembly fix pass; 499 after the assembly pass, 468 after hook pass 2, 518 before that on the old ladders).
  - Break test, in a scratch copy: 09a's year-8 formula line "≈ $89/mo" → "≈ $90/mo", 09b's age-40 rung "≈ $14,974" → "≈ $14,975" and 09c's "about 75,176 times" → "75,177". It exited 1 with 4 failures, catching all three. Moving 09b's rung 1 back to 1.6 s also exits 1 (the $1,070 sync and the "lands by 1.0 s" claim).
  - Assembly-pass break test, in a scratch copy: 09a's year-8 Earns cell "≈ $89" → "≈ $90", 09b's verdict "81×" → "82×" and 09c's second beat "≈ $375,880" → "≈ $375,881". It exited 1 with 4 failures, catching all three.
  - Fix-pass break test, in a scratch copy: 09a's verdict "year 9" → "year 8" and a formula line given back its leading "≈"; 09c's hero beat "× 75,176" → "× 75,177", its tag's "≈" → "=" and its verdict "≈ $13.30" → "≈ $13.31". It exited 1 with 8 failures, catching all five.

**How the facts were checked**
- None of the three teasers puts market data on screen. Every on-screen number comes from one stated assumption (8% or 7% a year), and the footer prints that assumption with "not a forecast". Nothing on screen needs a source.
- **The stated rate matches every row in all three** (the P2 pitfall: FinCalC's 3.77M short is a 10% table under a "12%" label):
  - 09a says "8% a year, compounded monthly" on screen, and every row uses 8% ÷ 12 a month. Its formula bar's "× 8% ÷ 12" is the same monthly rate.
  - 09b says "7% a year, added once a year", and every rung is × 1.07 per year.
  - 09c says "7% a year", and every row grows each dollar by exactly 7% a year: the monthly rate is (1.07)^(1/12) − 1 ≈ 0.565%. The checker asserts this.
- Real-world figures appear only in the captions and pinned comments: the S&P 500's long-run averages, used to explain why we chose 7% and 8%. See "Sources" under 09a for what is confirmed and what is not.
- Web searches: 4 in round 1 and 2 in the revision; none in the hook passes (no new real-world figure). The egress proxy blocked every page fetch (NYU Stern, A Wealth of Common Sense, twice). Figures marked **[click-check]** come from search results and should be opened by someone before posting.

**Studio linter:** `node src/cli.mjs check` on the three specs after hook pass 2, and again after the assembly fix pass: **3/3 clean, 0 errors, 0 warnings.**
- I rendered stills of all three at 0, 1.5 and 3 s and at their key beats and verdicts and read them (times in the review log).
- Every 09a formula-bar line is 32 characters or fewer (the longest is 28), so the bar stays one line; the checker enforces that.
- `lookOpts` in 09a (`inputsAtStart`, `formulaBar`, `marks`) and 09c (`input`) are read by the kits and documented in `looks/live-sheet/README.md` and `looks/scoreboard/README.md`. Newer options are documented only in their format file's header comment (the kit READMEs, which the assembly passes may not edit, do not list them yet): 09a's `verdictStyle: "stack"` and the overlay chip marks in `looks/live-sheet/formats/growth-ladder.js`; 09c's `beats` (assembly pass; since the fix pass a beat may move the hero with `hero` / `tag`), `heroTag` and `verdictStyle: "stack"` in `looks/scoreboard/formats/growth-ladder.js`. 09b carries no `lookOpts`. 09c no longer uses `goal` or `icon`.

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
   - Amount-first titles have a median of 53,954 across the channel (n=15); payout-first titles a median of 100,740 (n=11, hook bank 4.4).
3. **The P2 cousins** ([`02-hook-bank.md`](../../research/v2/02-hook-bank.md)):
   - ChartOrbit, "Does investing 100$ monthly in BMW make you rich?": **1,391,731 (5.91x)**. https://www.youtube.com/shorts/2cF446rExhY
   - ChartOrbit, "…in NVIDIA…": 500,774 (14.1x). https://www.youtube.com/shorts/XEhGBuH2xn4
   - The Market Hustle, "$10 each day = $930 by the end of the year": 46,137 (1.1x med). https://www.instagram.com/reel/Dd5KkdPs20G/
4. **What wins, and what we add:**
   - **What wins:** row 1 on screen at 0.0 s, a small everyday input, about one row every 1.3 s, a milestone a third of the way in (FinCalC: profit passes ₹1 lakh at 0:09, and profit ≈ deposits at 0:15), the biggest number last, and a hold long enough to screenshot.
   - **What we add:** the 04-formats twist. The stated rate matches the table, a marker sits on the row where the milestone happens, and "you put in" and "worth" run side by side so growth visibly overtakes deposits.
   - **The step beyond FinCalC, after hook pass 2:** each hook hands the viewer a number they own and a question the ladder answers. 09a asks when your own $100 a month is out-earned by its own growth (year 9). 09b puts a horizon you own on one $1,000 gift (birth to 65). 09c leaves a blank multiplier for your own daily amount (× 75,176). Each ladder still ends on a verdict (R12), not only on a big number. Round 2's printed wrong answers ("Doubled by year 9?", "$1,000 + 30 × $70 = $3,100?", "A millionaire in 40 years?") are gone: the judges found them too dense for 1.5 s, or a trap only Rule-of-72 readers fall into.
5. **Pitfalls:**
   - FinCalC's own 2026 six-second cards in this formula stalled: 9,017 (https://www.youtube.com/shorts/a4GbewbYbPw) and 10,445 (https://www.youtube.com/shorts/1NugTIGX-d4).
   - Its 3.77M short is a 10% table under a "12%" label (study check).
   - The multiples are modest (14.1x at most where scored), and the two hits are 2022-23 and India-only.
   - Millionaire-goal hooks flopped in the benchmark: H75 "…still Retire a Millionaire" 34,225, H88 "$24,500 COULD BECOME $10.8 MILLION" 15,274. Since hook pass 2 no 09 hook mentions a million; 09c uses it only in its verdict, as a rate (≈ $13.30 a day).
   - So all three teasers are voiced 27.0-31.5 s ladders, not silent cards, and every rate on screen matches every row.

### Decisions shared by all three

- **Each teaser busts a different wrong belief:**
  - 09a: "$100 a month earns pocket change for decades." Frame 1 anchors it (≈ $8 a month by 0.5 s); the ladder answers year 9.
  - 09b: "A $1,000 gift is a token." One word in the header ("just"); the ladder answers over 81 times.
  - 09c: "$5 a day makes you a millionaire." Not printed at frame 1 (the judges' R5 caveat); the verdict (a million ≈ $13.30 a day) answers it, and the caption's $5 example (≈ $375,880) backs it up.
- **Captions hold the answer back.** Line 1 of each caption names the twist, not the number ("Sooner than you'd guess.", "One gift. Never topped up.", "Multiply by your own number."), so the feed preview doesn't give the payoff away (hook judge, round 2).
- **Rounding:**
  - every rounded result shows "≈" on screen; in the VO it is "about", or "over" when the true value is floored;
  - exact values carry none of these;
  - each ladder keeps one precision, now to the dollar in all three. 09c moved from the nearest $100 to the dollar when its ladder became $1 a day; its per-day rate is to the cent (≈ $13.30).

  The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$19,200" = 5 words). Every row the VO names lands within 0.5 s of its word.
- **Lane check:**
  - No product or brand is named. Latte/Starbucks belongs to `pov-race`.
  - No by-age lookup table. "$3 a day by age" belongs to `find-your-row`. 09b's rungs are ages, but they are one person's timeline for one $1,000 gift, not a row per kind of viewer: every rung is the same money at a later age. Judge 2 asked for this lane question to be settled before 09b ships; this is the decision.
  - No two-people duel. That belongs to `ledger-duel`.
  - Each teaser is one amount, climbing year by year.
  - 09a and 09c both use regular deposits, but they ask different questions (the year growth matches the deposit vs a multiplier for any daily amount), use different rates and conventions, and live in different looks.
  - One POV in the format: 09b. Hook pass 2 kept 09a off a second "POV:" opener (see the review log).
- **No advice language.** These are worked examples at an assumed rate, and every caption says so.

---

## 09a: Live Sheet: "You add $100 a month. When does it earn $100 a month?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input / peach output headers) |
| Spec | `studio/specs/09a-live-sheet-100-a-month-doubles.json` (28.5 s) |
| Platform title | **You Add $100 a Month. When Does It Earn $100 a Month?** |
| On-screen hook (header) | **You add $100 a month. / When does it earn $100 a month?** (12 words, 2 lines; "$100 a month" in the black highlight on line 1) |
| Frame 1 | Banner. Formula bar "$1,245 × 8% ÷ 12" behind the bar's yellow ≈ chip (no second "≈"), its result "≈ $8/mo" typing in by about 0.5 s: what the filled Year 1 Worth cell earns the next month. Columns Year / You put in / Worth / Earns a month. Row 1 filled: 1 · $1,200 · ≈ $1,245 · **≈ $8**, right under the question. Rows 5, 8, 9, 15, 20, 25 and 30 show their year and "You put in" (`lookOpts.inputsAtStart`), beside 7 empty Worth and Earns cells. Footer on |
| Footer | ASSUMES 8% a year, compounded monthly / $100 in at each month-end · not a forecast (2 lines, broken at the separator) |

**Topic vs the seed:**
- Kept: $100 a month at 8%, year by year, in FinCalC's put-in vs worth grammar, and round 2's verified Worth cells (years 1, 5, 9, 15, 20 and 30).
- Changed in hook pass 2: the question. Round 2 asked "Doubled by year 9?", a trap that only lands for viewers who know the Rule of 72. Now the banner asks when the pile **earns** what you add: a payout noun, FinCalC's best-performing title type (payout-first median 100,740, hook bank 4.4).
- "Earns" here means the balance's growth over the next month at the assumed rate: balance × 8% ÷ 12. It stays in the balance; it is not a payout. The formula bar shows that sum for every row, and the caption says it in words.
- The ladder ends on a single repeatable answer: **year 9**, and the same year for any monthly amount.

**Wrong belief it exploits:**
- "$100 a month earns pocket change for decades." Frame 1 anchors it: by year 1 the pile earns ≈ $8 a month against the $100 you add, so the natural guess is 20-30 years. It earns more than $100 a month from year 9 (month 106 grows $100.91), at the assumed 8%.
- A second belief busted at the verdict (the VO and the formula bar): "a bigger deposit gets there sooner." It doesn't. The amount cancels, so it is year 9 for $50, $500 or $5,000 a month.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$100 a month" in the banner, the Year 1 row ($1,200 → ≈ $1,245, earning ≈ $8 a month) and the formula bar "$1,245 × 8% ÷ 12" at 0.0 s; the bar's "≈ $8/mo" completes by 0.5 s |
| R2 | One input ($100 a month). The banner asks for a year; no result is printed |
| R3 | Pass: the answer is everyone's, because the amount cancels. The VO and the formula bar ("$50 or $500/mo: still year 9") say so at the verdict |
| R4 | $100 a month: small, round and ChartOrbit's stake |
| R5 | Implied, not printed: ≈ $8 against $100 at 0.5 s makes "decades" the viewer's guess, and year 9 busts it |
| R6 | Partial: "You add" + $100 a month. The banner names no horizon (both judges) |
| R7 | One target to take a side on: your own $100 a month |
| R8 | 12 words, 2 lines |
| R9 | 7 empty Worth and Earns-a-month cells from 0.0 s. Since the assembly pass the monthly figure the question asks about has its own column, "Earns a month", so each row answers in the sheet itself; the bar shows the working (Worth × 8% ÷ 12). This closes both judges' caveat that the monthly figure lived only in the bar |
| R10 | First payoff (≈ $8 a month) at 0.0 s in the Earns cell. Biggest number (year 30, ≈ $149,036 earning ≈ $994 a month) last |
| R11 | The banner asks; the verdict stack answers ("From **year 9** / it earns more than you add.", line 1 at 88 px) while row 9 re-lights. Caption line 1 holds the year back ("Sooner than you'd guess.") |
| R12 | One number to repeat in a comment: **year 9**, for any amount |

**Benchmark hooks it is modelled on**
- H32, FinCalC: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate". 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. Borrowed: a monthly payout noun as the hook.
- H39, FinCalC: "How to Get ₹10K to ₹2 Lakh Monthly Income?". 100,740 (7.44x), https://www.youtube.com/shorts/I79lgAEBBjU. FinCalC's payout-first titles have a median of 100,740 (n=11), against 20,748 for its tax titles (hook bank 4.4).
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: $100 a month as the stake, and a question that waits for an answer.
- H84, Master Money: "4 DEAD SIMPLE NUMBERS…", slot 1 typing "$72,000 × 0.7" into "$50,400" before 3 s. 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: formula, then result, in the same slot: "$1,245 × 8% ÷ 12 ≈ $8/mo" by 0.5 s.
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years". 3,771,667, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: row 1 on screen at 0.0 s and the row unmask.

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "$1,245 × 8% ÷ 12", its result "≈ $8/mo" typed by about 0.5 s. Row **1**: $1,200 / ≈ $1,245 / ≈ $8, selected. The other 7 rows show year and put-in only. Footer | "By year 1 it's earning about $8 a month." (0.0-3.85) |
| 3.2 | Row 5: ≈ $7,348 / ≈ $49. The selection snaps to the newest row's Worth and Earns cells (it never grows over the older rows). Bar "$7,348 × 8% ÷ 12" swaps in whole and types "≈ $49/mo" as the cell lands | |
| 4.6 | Row **8**: ≈ $13,387 / **≈ $89**. Rose tint and a dark chip "under $100" dropping over the gridline under the ≈ $89 by 4.78 s: an overlay on row 9's still-empty cells, so nothing reflows. Bar "… ≈ $89/mo". Buzz. The chip fades out (opacity only) before row 9 lands | "Year 8: about $89. Not yet." (4.4-7.5) |
| 8.0 | Row **9**: ≈ $15,743 / **≈ $105**. The crossing: the ≈ $105 cell lands bigger and turns ink on yellow, the year cell turns yellow (and stays yellow), and the chip "beats your **$100**" drops under it by 8.18 s. Bar "$15,743 × 8% ÷ 12 ≈ $105/mo". Pop | "Year 9: about $105. More than you add." (7.7-11.95) |
| 12.2 | Row 15: ≈ $34,604 / ≈ $231 (the chip has faded out by 12.18 s). Bar "… ≈ $231/mo" | |
| 13.9 | Row **20**: ≈ $58,902 / ≈ $393. Bar "… ≈ $393/mo" | "Year 20: about $393 a month." (13.6-17.45) |
| 17.8 | Row 25: ≈ $95,103 / ≈ $634. Bar "… ≈ $634/mo" | |
| 19.4 | Row **30**: ≈ $149,036 lands and its Earns cell counts up over 0.8 s to **≈ $994** (biggest, last; the summary row wipes yellow and the selection snaps onto its Earns cell, popping outward, never sliding through the Worth digits). Bar "$149,036 × 8% ÷ 12 ≈ $994/mo", its result typed as the count lands. Roll | "Year 30: about $994 a month. On its own." (19.0-24.0) |
| 24.2 | Verdict stack in the caption band: "From **year 9**" (88 px, the marker wiping in) / "it earns more than you add." Row 9 re-lights full width with a bump and takes the selection; the summary row's yellow fades, so year 9 is the one focal point. Bar "$50 or $500/mo: still year 9". Ding | "Any monthly amount: year 9." (24.2-26.15) |
| 26.15-28.5 | Hold on the finished sheet, then clear to frame 1 (loop) | |

**Full guide VO** (57 spoken words)

> By year 1 it's earning about $8 a month. Year 8: about $89. Not yet. Year 9: about $105. More than you add. Year 20: about $393 a month. Year 30: about $994 a month. On its own. Any monthly amount: year 9.

"By year 1 it's earning" is the rate at the end of year 1, not what year 1 earned: the judges' wording fix. Year 1 grows $44.99 in all (≈ $3.75 a month on average); month 12 grows $7.58 and month 13 grows $8.30.

**The maths**

- **Basis:** $100 deposited at each month-end, at r = 8%/12 a month, compounded monthly (as the footer says).
- **Formulas:**
  - Worth after n months: W(n) = 100 × ((1 + r)^n − 1) ÷ r.
  - You put in: $100 × 12 × year.
  - "Earns a month" at a year-end: W × r, the next month's growth. The bar multiplies the shown Worth; the checker asserts it rounds to the same dollar as the exact Worth.
  - The crossing: month k grows W(k − 1) × r, which is at least the $100 deposit exactly when (1 + r)^(k − 1) ≥ 2, i.e. k − 1 ≥ ln 2 ÷ ln(1 + r) = 104.32. So month 106 is the first, and months 97-108 are year 9. The deposit cancels, so the month is the same for any amount.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Year 1 | W(12) / 1,200; × r | 1,244.99 → 8.30 | ≈ $1,245 / ≈ $8/mo |
| Year 5 | W(60) / 6,000; × r | 7,347.69 → 48.98 | ≈ $7,348 / ≈ $49/mo |
| Year 8 | W(96) / 9,600; × r | 13,386.86 → 89.25 | ≈ $13,387 / ≈ $89/mo ("under $100", "Not yet") |
| Year 9 | W(108) / 10,800; × r | 15,742.95 → 104.95 | ≈ $15,743 / ≈ $105/mo ("beats your $100", "More than you add") |
| Year 15 | W(180) / 18,000; × r | 34,603.82 → 230.69 | ≈ $34,604 / ≈ $231/mo |
| Year 20 | W(240) / 24,000; × r | 58,902.04 → 392.68 | ≈ $58,902 / ≈ $393/mo |
| Year 25 | W(300) / 30,000; × r | 95,102.64 → 634.02 | ≈ $95,103 / ≈ $634/mo |
| Year 30 | W(360) / 36,000; × r | 149,035.94 → 993.57 | ≈ $149,036 / ≈ $994/mo |
| "By year 1 it's earning about $8 a month" | month 13's growth, W(12) × r | 8.30 (month 12: 7.58; year-1 average: 3.75) | about $8 |
| Verdict "From year 9 it earns more than you add." | the first month with growth ≥ $100 | month 106: 100.91 (month 105: 99.58) | year 9 |
| "Any monthly amount: year 9" (VO), "$50 or $500/mo: still year 9" (bar) | the amount cancels out of (1 + r)^(k − 1) ≥ 2 | month 106 for $50, $500, $1,000 and $5,000 | year 9 |
| "On its own" (year 30) | 993.57 ÷ 100 | 9.94 | almost 10 times your $100 (caption) |
| Pinned "72 ÷ 8 = 9" | 72 ÷ 8 | 9 | 9 |
| Pinned "(1 + 8%/12)^n = 2" | ln 2 ÷ ln(1 + r) months; ÷ 12 | 104.32 months = 8.69 years | ≈ 8.7 years (a lump sum's doubling time) |
| Pinned "At 7%: year 11. At 10%: year 8." | the same crossing at 7% ÷ 12 and 10% ÷ 12 a month | month 121; month 85 | year 11; year 8 |

- **Cross-checks:**
  - Years 1, 5, 9, 15, 20 and 30 are round 2's verified rows; year 25 (95,102.64) was verified in round 1; year 8 (13,386.86) is new, and the checker recomputes every row.
  - The year 1 and 30 Worth values match the FORMATS.md example rows to the dollar ($1,245; $149,036).

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
> Sooner than you'd guess.
> You add $100 a month at an assumed 8% a year. At the end of year 1 the pile is earning ≈ $8 a month (the balance × 8% ÷ 12). By year 8 it's ≈ $89. Then in year 9 it passes your $100: month 106 grows ≈ $100.91 on its own. By year 30 it earns ≈ $994 a month, almost 10 times what you add. "Earns" here means growth at the assumed rate that stays in the account, not a payout. And the year doesn't depend on the amount: $50 or $500 a month, it's still year 9.
> Maths: deposits at month-end, 8% a year compounded monthly. 8% is an assumption, not a forecast (the S&P 500 has returned ≈ 10% a year since 1928 before inflation, ≈ 7% after). Educational maths, not advice.
> #compoundinterest #investing #moneymath #ruleof72

**Pinned comment**
> Year 9 isn't a coincidence: 72 ÷ 8 = 9. Monthly growth passes your deposit exactly when (1 + 8%/12)^n = 2, the lump-sum doubling time (≈ 8.7 years). At 7% it's year 11. At 10%, year 8.

**Per-platform notes**
- **YouTube Shorts:** the title repeats the banner's question, FinCalC's payout grammar. Keep the 2.35 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** cover on frame 1 (the question, the "≈ $8/mo" bar and the empty cells) or on row 9 turning yellow (8.0 s).
- **TikTok:** the comment fights will be the rate ("8% is too high or too low") and "that's compounding, not earning". The pinned comment takes the first (7% → year 11, 10% → year 8); the caption defines "earns" for the second. Keep "year 9" out of the first 100 characters of the caption (it first appears at about character 180).
- **Not a 6 s card:** FinCalC's 2026 amount-first cards stalled at 9,017-10,445. Keep this voiced.
- **Look note:** the sheet's 4th column, "Earns a month" (assembly pass; a no-break space makes it wrap as "Earns / a month"), prints each row's monthly figure, and the formula bar shows the working behind it ("Worth × 8% ÷ 12 ≈ $X/mo"), the Live Sheet's "formula bar as proof". `inputsAtStart` pre-shows only the put-in column, so Worth and Earns both land with their row. Every line is 32 characters or fewer (the longest is 28), so the bar stays one line at 40-42 px. A line starts on the Worth without its "≈": the bar's yellow chip in front of it is the ≈ sign (it read "≈ ≈ $1,245" before the fix pass), and a line swaps in whole and types only its result as the row lands. `lookOpts.marks` tints row 8 rose ("under $100") and row 9 yellow ("beats your **$100**"); each label is a dark chip laid over the next row's empty cells (no spacer row, nothing reflows), in within 0.2 s of its row and out by opacity before the next row lands. `lookOpts.verdictStyle: "stack"` sets the verdict as a two-line card (line 1 up to 88 px). Captions keep "about" with the number after it ("ABOUT $393 A MONTH").

---

## 09b: Becker Rig: "POV: someone invested just $1,000 for you at birth. What's it worth at 65?"

| | |
|---|---|
| Look | `becker-rig` (a light void, one green stick figure, a ladder whose rungs are the rows, coins thrown up to each rung, per-row composition meters, a gold plate and impact on the last row) |
| Spec | `studio/specs/09b-becker-rig-1000-times-1-07.json` (27.0 s) |
| Platform title | **POV: Someone Invested Just $1,000 for You at Birth. What's It Worth at 65?** |
| On-screen hook (header) | **POV: someone invested just / $1,000 for you at birth. / What's it worth at 65?** (14 words, 3 lines; "$1,000" in the hero green; line 1 breaks after "just", which keeps its right edge in to x ≈ 850) |
| Frame 1 | Header and the 2-line footer. 8 dim rungs labelled by **age**, 1, 10, 18, 25, 30, 40, 50 and 65, each with a dotted empty shelf, under the heads Age / Put in / Worth. The figure (scaled 1.3×, standing clear of the rail, his pencil inside x ≥ 40) in the "think" pose at the foot of the ladder (a nod at 0.35 s). He winds up at about 0.4 s and throws at about 0.75 s, and the first coin lands on rung 1 as **$1,070** at 1.0 s while the VO says it |
| Footer | ASSUMES 7% a year, added once a year / never topped up · not a forecast (2 lines, broken at the separator) |

**Topic vs the seed:**
- Kept: Becker idea 1's maths, $1,000 × 1.07 once a year, with $1,967 at 10 and $7,612 at 30 (verified figures in `watch/alan-becker.md` §6), and its devices: numbers as objects (each coin becomes its row's number), the escalation ladder, and the final scale gag (the last coin is too heavy and has to be heaved).
- Changed in hook pass 2: the stake and the horizon. Round 2 left $1,000 alone for 30 years and printed the simple-interest guess "$1,000 + 30 × $70 = $3,100?" in the header (7 numbers in 14 words, which both judges found too dense). Now the $1,000 is a gift at birth and the ladder runs to 65, a horizon the viewer owns. The rungs are ages on one person's timeline.
- Not kept: the ×1.07 gate prop (the kit does not draw it) and round 2's "$3,100?" guess.

**Wrong belief it exploits:** "$1,000 is a token gift; it won't matter by retirement." One word in the header, "just", carries it. Never topped up, the $1,000 is ≈ $81,273 at 65, over 81 times the gift. If 7% is read as a return after inflation (the S&P 500's ≈ 6.8% a year since 1928), that is roughly today's dollars.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$1,000" (the input) and "65" in the header, "7%" in the footer and 8 age labels at 0.0 s. The first coin lands as $1,070 at 1.0 s |
| R2 | One input ($1,000, once). The header asks; no result is printed |
| R3 | Partial: the rungs are ages, so most viewers can place their own age between two rungs. The amount is fixed at $1,000; the caption gives the scaling rule for other gifts |
| R4 | $1,000: round, familiar, a plausible birth gift |
| R5 | One word: "just" implies the gift is a token |
| R6 | You ("for you") + $1,000 + a horizon (birth to 65). The stake is passive and hypothetical ("someone invested"), which both judges docked |
| R7 | One named target: 65, the top rung |
| R8 | 14 words, 3 lines |
| R9 | 8 dim age rungs with empty shelves from frame 1 |
| R10 | First payoff at 1.0 s ($1,070). Biggest number last (≈ $81,273, heaved onto the gold plate) |
| R11 | The header asks; the verdict answers. Caption line 1 holds the number back ("One gift. Never topped up.") |
| R12 | Lopsided and repeatable: "over 81 times the gift" (VO), printed in the verdict's line 2 since the assembly pass ("Over 81× the gift") |

**Benchmark hooks it is modelled on**
- H16, ChartOrbit: "What If You Invested $5,000 in NETFLIX and DISNEY?", frame 1 "POV: In 2002 You invested $5000 in". 15,876,376 (100.45x), https://www.youtube.com/shorts/KmtLGAPIutg. Borrowed: the POV grammar on a lump sum.
- H18, ChartOrbit: frame 1 "POV: Since 1996 you invested $100/month in BMW and never sold". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: "never sold", here "never topped up".
- H45, @investment_timeline: "POV: You invested in Monster instead of paying $3/day for a Monster Energy". 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. Borrowed: "POV" + you + a small, concrete stake.
- H72, The Market Hustle: "How hitting $100K by age 40 and never investing again would grow". 67,160 (1.6x med), https://www.instagram.com/reel/DdpT7thyGvN/. The benchmark's left-alone lump measured against a life; 09b adds "you" and a small stake.

**Beat sheet** (the rig choreography is the kit's own: a coin thrown to each rung, the last one heaved; this sheet lists only what the kit draws)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header, footer, ladder with 8 dim age rungs, the figure thinking (nods at 0.35 s) | "Age 1: $1,070." (0.0-2.35) |
| 0.4-0.85 | The figure winds up and throws the first coin (release ≈ 0.75 s) | |
| 1.0 | The coin lands on rung **1**: **$1,070**; "$1,000" slides into "Put in"; its meter draws | (…$1,070.) |
| 3.4 | Rung 10: ≈ $1,967 (almost doubled) | |
| 5.4 | Rung **18**: ≈ $3,380 | "At 18: about $3,380." (5.0-8.5) |
| 7.4 | Rung 25: ≈ $5,427 | |
| 9.4 | Rung **30**: ≈ $7,612 | "At 30: about $7,612." (9.0-12.5) |
| 11.4 | Rung 40: ≈ $14,974 | |
| 13.4 | Rung **50**: ≈ $29,457 | "At 50: about $29,457." (13.0-17.25) |
| ≈ 14.2-17.8 | The heave fills the gap after rung 50 (no dead air): the last, heavy coin drops into his arms at ≈ 14.2 s and he buckles (thud); he hitches it up (≈ 14.8) and it sags back (≈ 15.2, step); he presses it overhead at ≈ 15.6 and strains, wobbling harder, under a riser; a last dip at ≈ 17.25 and the heave at ≈ 17.4 (whoosh) | |
| 17.8 | Rung **65**: **≈ $81,273** on the gold plate. Hit, shake, celebrate, then he points up. The impact lines are clipped to the band between the column heads and the row under the plate, and the coins spill down the right margin (x 940-1000), never over a label | "At 65: about $81,273." (17.4-22.05) |
| 22.3 | Verdict: "**≈ $81,273** at 65. / Over 81× the gift, never topped up." Ding (kit) | "Over 81 times the gift." (22.3-24.65) |
| 24.65-27.0 | Hold, then loop | |

**Full guide VO** (53 spoken words)

> Age 1: $1,070. At 18: about $3,380. At 30: about $7,612. At 50: about $29,457. At 65: about $81,273. Over 81 times the gift.

**The maths**

- **Basis:** V(a) = $1,000 × 1.07^a at age a. The 7% is credited once a year (on each birthday), and nothing is added or withdrawn.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Age 1 | 1,000 × 1.07 | 1,070.00 | $1,070 |
| Age 10 | × 1.07¹⁰ | 1,967.15 (1.97×) | ≈ $1,967 |
| Age 18 | × 1.07¹⁸ | 3,379.93 | ≈ $3,380 |
| Age 25 | × 1.07²⁵ | 5,427.43 | ≈ $5,427 |
| Age 30 | × 1.07³⁰ | 7,612.26 | ≈ $7,612 |
| Age 40 | × 1.07⁴⁰ | 14,974.46 | ≈ $14,974 |
| Age 50 | × 1.07⁵⁰ | 29,457.03 | ≈ $29,457 |
| Age 65 | × 1.07⁶⁵ | 81,272.86 | ≈ $81,273 |
| "Over 81 times the gift" | 81,272.86 ÷ 1,000 | 81.27 | over 81 |
| "Put in" | the one deposit | 1,000 | $1,000 on every rung |
| Pinned: the same $1,000 at 25 | 1,000 × 1.07⁴⁰ (40 years to 65) | 14,974.46 | ≈ $14,974 (the age-40 rung's figure) |
| Pinned: birth vs 25 | 81,272.86 ÷ 14,974.46 = 1.07²⁵ | 5.43 | × 5.4 |
| Caption: "roughly doubles every 10 years" | 72 ÷ 7; first age with V ≥ 2,000 | 10.3; age 11 (2,104.85) | ≈ 10 |

- **Cross-checks:**
  - Ages 1, 10, 25 and 30 are round 2's verified rungs ($1,070; $1,967; $5,427; $7,612), and $1,967 and $7,612 match `alan-becker.md` §6, idea 1.
  - Age 40 ($14,974.46) was round 2's pinned-comment figure.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 6.8% a year after inflation since 1928" is the Official Data Foundation figure (6.81%) listed under 09a: confirmed in search results, page fetch blocked, **[click-check]**.

**Assumptions (in the footer):**
- 7% a year, credited once a year;
- one $1,000 at birth, nothing added or withdrawn ("never topped up");
- no fees, taxes or inflation adjustment;
- not a forecast; read as rough today's dollars only if 7% is taken as a return after inflation.

**Caption**
> One gift. Never topped up.
> Someone invests $1,000 for you on the day you're born, and nobody touches it again. At an assumed 7% a year it roughly doubles every 10 years (72 ÷ 7 ≈ 10): ≈ $1,967 at 10, ≈ $7,612 at 30, ≈ $29,457 at 50 and ≈ $81,273 at 65, over 81 times the gift. 7% is close to what the S&P 500 has returned after inflation since 1928 (≈ 6.8% a year), so read these as rough today's dollars. A different gift? Scale every rung: $500 halves them, $5,000 multiplies them by 5.
> Maths: 7% a year, credited once a year, nothing added or taken out. An assumption, not a forecast. Educational maths, not advice.
> #compoundinterest #investing #moneymath #mathtok

**Pinned comment**
> Got the $1,000 at 25 instead of at birth? It's ≈ $14,974 at 65, not ≈ $81,273. Those first 25 years multiply it by 5.4.

**Per-platform notes**
- **YouTube Shorts:** the title repeats the header's POV and question.
- **Instagram Reels:** cover on frame 1 (the POV header over the empty age ladder) or on the heave frame (≈ 17 s).
- **TikTok:** the comment fights will be "where do you get 7%?" and "inflation". The caption answers both with the after-inflation framing; the pinned comment invites "I got mine at 25" replies.
- **Look note:**
  - Becker devices used (`alan-becker.md` §4): numbers as objects (the coin becomes the number), the escalation ladder, and the final scale gag (the heave).
  - Throw mode with 8 rungs and the heave on rung 65. The 3-line header and the 2-line footer fit above the ladder (stills at 0, 0.6, 1.0, 1.5, 3, 19 and 23 s).
  - Rung 1 at 1.0 s leaves the kit room for a real throw (it needs a cycle of at least 0.42 s after the 0.35 s opening; this one is 0.585 s). The intro's 0.75 s "think" key falls 4 ms before the release, which does not show.
  - Fix pass (format file, kit workarounds reported to the kit owner): the header gets 0.1em word spacing (the heavy display face fused "investedjust" at phone size), and the Worth cells set "≈ $7,612" with a visible space, as the verdict and captions do.

---

## 09c: Scoreboard: "Take what you could invest a day. Year 40 = that × ?"

| | |
|---|---|
| Look | `scoreboard` (a black top bar with a neon odometer, a dark stage with a board of year slots and two-tone meters, one green money colour) |
| Spec | `studio/specs/09c-scoreboard-5-a-day-millionaire.json` (31.5 s; the file name still says "5-a-day-millionaire", but the $5 ladder is now an example in the caption) |
| Platform title | **Take What You Could Invest a Day. Year 40 = That × What?** |
| On-screen hook (header) | **TAKE WHAT YOU COULD INVEST A DAY. / YEAR 40 = THAT × ?** (10 words plus "= × ?", 2 lines; "A DAY" is the only green phrase). Since the fix pass "=" and "×" are set at cap height in a heavy weight, and the "?" is a green boxed blank |
| Frame 1 | Header with the blank multiplier. The hero odometer at **≈ $377**, labelled by a two-line tag on its left, "YEAR 1" / "$1 A DAY" (`lookOpts.heroTag`, fix pass), so the big number never reads as an unlabelled answer; the tag swaps with each row. Row 1's count lands just before frame 1 (rowT −0.4 s, assembly pass), so the first frame never shows a count in flight. The footer working "$1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast" under it. The input strip "$1 A DAY · 7% A YEAR" (`lookOpts.input`) over the board: row 1 (1 · $365 · ≈ $377) lit, its landing glow fading, above 5 dark slots |
| Footer | $1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast (the rate is on the input strip; the footer stopped repeating it in the fix pass) |

**Topic vs the seed:**
- Kept: a small daily amount, deposited monthly at an effective 7% a year, year by year, on the Scoreboard's odometer and board. Round 2's verified $5-a-day maths: every $1 row is the $5 row ÷ 5.
- Changed in hook pass 2: the question. Round 2 asked "$5 a day, invested. A millionaire in 40 years?"; "millionaire" is the benchmark's weakest goal word (H75 34,225; H88 15,274). Now the header gives the viewer a job (take your own daily amount) and leaves the multiplier blank.
- The $1 ladder **is** the multiplier: year 40 is ≈ $75,176 for $1 a day, and every row scales with the amount, so year 40 ≈ your daily amount × 75,176. The verdict gives the honest rate for a million, ≈ $13.30 a day, and the caption brings the meme back as an example ($5 a day ≈ $375,880: still not a million).
- The $1,000,000 goal strip is gone; the input strip takes its place.

**Wrong belief it exploits:** "$5 a day makes you a millionaire" (and its cousin, "a dollar a day doesn't add up to anything"). Neither is printed at frame 1: "× ?" is a blank, not a wrong answer (both judges, R5). The ladder answers the second with × 75,176, and the verdict answers the first: a million takes ≈ $13.30 a day, not $5 (the caption adds that $5 a day is ≈ $375,880 at year 40).

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "40" in the header; "$1", "365" and "≈ $30.42" in the footer; the "$1 A DAY · 7% A YEAR" strip, the odometer (tagged "YEAR 1 / $1 A DAY") and row 1 at ≈ $377, all at 0.0 s |
| R2 | One input ($1 a day, as the unit). The multiplier is left blank, not printed |
| R3 | Pass: "what you could invest a day" is the viewer's own number, and the multiplier makes every row theirs. "Could" includes viewers who don't invest yet |
| R4 | $1 a day: the smallest round unit (H64's "$1") |
| R5 | Weak: no wrong answer at frame 1. The meme is busted later, by the verdict (25.6 s: a million takes ≈ $13.30 a day) and the caption's $5 example |
| R6 | You ("you could invest") + an amount (a day) + a horizon (year 40) |
| R7 | One named target: year 40 |
| R8 | 10 words, 2 lines |
| R9 | The boxed "× ?" blank and 6 board slots (5 dark) from frame 1; the hero fills the blank at 20.8 s ("× 75,176") |
| R10 | First payoff ≈ $377 at 0.0 s. Biggest number last (year 40, ≈ $75,176) |
| R11 | The header asks; the verdict answers under the board. Caption line 1 holds the number back ("Multiply by your own number.") |
| R12 | A personal constant to repeat: "× 75,176", and a meme-buster: "a million ≈ $13.30 a day" |

**Benchmark hooks it is modelled on**
- H84, Master Money: "Take your salary and multiply it by 0.7", slot 1 typing at 0.0 s. 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: "take your number" × a constant.
- H55, @real_unick: "Number one: take your monthly income, multiply it by 200". 115,845 (67.1x), https://www.instagram.com/reel/DbMUONdvGcr/. Borrowed: a regular amount times a constant, in the first line.
- H76, Jake: "…take your monthly income and multiply by 0.55". 983,900 (36.3x), https://www.instagram.com/reel/DcWOomPDl9Y/.
- H64, Gage Heward: "What $1 costs you by age". 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. Borrowed: the $1 unit the viewer scales up.
- H45, @investment_timeline: a per-day stake ("$3/day"). 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473.

**Beat sheet** (each rung is a hard cut: a thud, the slot lights, the year and "you put in" slam in, then the row's Worth and the hero count up together while its meter grows)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header with the boxed "× ?". Hero odometer at ≈ $377 (row 1 landed at −0.05 s), tagged "YEAR 1 / $1 A DAY". Footer working. Input strip "$1 A DAY · 7% A YEAR". Row **1** (1 · $365 · ≈ $377) lit. On every later cut the tag swaps to the new row's year | "Year 1: about $377." (0.0-3.1) |
| 3.0 | Cut. Row 5: $1,825 / ≈ $2,166 | |
| 4.6 | Cut. Row **10**: $3,650 / ≈ $5,203 | "Year 10: about $5,203." (4.4-7.9) |
| 8.0 | Cut. Row **20**: $7,300 / ≈ $15,438 | "Year 20: about $15,438." (8.0-11.85) |
| 12.2 | Cut. Row **30**: $10,950 / ≈ $35,571 | "Year 30: about $35,571." (12.0-16.25) |
| 16.6 | Cut. Row **40**: a taller slot; the row and the hero count to **≈ $75,176** / $14,600 | "Year 40: about $75,176." (16.4-20.65) |
| 20.8 | The hero takes the header's blank: a hard cut from ≈ $75,176 to **"× 75,176"** (130 px, bump and glow), its tag now "YEAR 40 ≈ / DAILY AMOUNT". The board stays whole | "Your daily amount, about 75,176 times." (20.8-25.45) |
| 25.6 | The rows scroll up by three whole rows to 20-30-40 (row 20 sits right under the column labels), a black band rises at the foot, and the verdict stack slams in under a green rule: "A MILLION BY YEAR 40:" (white) / **"≈ $13.30 A DAY"** (88 px green). The hero dims to 42%, so the verdict is the one focal point. Reveal + cash | "A million? About $13.30 a day." (25.6-29.45) |
| 29.45-31.5 | Hold, then a hard cut back to frame 1 (loop) | |

Rung gaps are 2.6, 1.6, 3.4, 4.2 and 4.4 s, inside the Scoreboard's one-cut-every-2.5-4 s rhythm except the quick row 5 → 10. After row 40 lands (≈ 19.1 s) the screen changes at 20.8 (the hero's × 75,176) and 25.6 (the verdict): every VO line after the ladder has its number on screen. The fix pass cut the $5 beat and its VO line (5.4 s), which took the video from 37 s to 31.5 s and left the biggest money figure on the hero, not a smaller beat below the board.

**Full guide VO** (71 spoken words)

> Year 1: about $377. Year 10: about $5,203. Year 20: about $15,438. Year 30: about $35,571. Year 40: about $75,176. Your daily amount, about 75,176 times. A million? About $13.30 a day.

**The maths**

- **Basis:** m = $1 × 365 ÷ 12 = $30.4167 deposited at each month-end, at an **effective 7% a year**: the monthly rate is r = (1.07)^(1/12) − 1 = 0.5654%, so every dollar grows exactly × 1.07 a year.
- **Formulas:**
  - Worth after n months: W(n) = m × ((1 + r)^n − 1) ÷ r.
  - You put in: $1 × 365 × years.
  - W is linear in the deposit, so any daily amount d gives d × W.
- **Display:** to the dollar; the per-day rate to the cent.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Footer "≈ $30.42/mo" | 1 × 365 ÷ 12 | 30.4167 | ≈ $30.42 |
| Year 1 | W(12) / 365 | 376.57 | ≈ $377 / $365 |
| Year 5 | W(60) / 1,825 | 2,165.54 | ≈ $2,166 / $1,825 |
| Year 10 | W(120) / 3,650 | 5,202.82 | ≈ $5,203 / $3,650 |
| Year 20 | W(240) / 7,300 | 15,437.56 | ≈ $15,438 / $7,300 |
| Year 30 | W(360) / 10,950 | 35,570.85 | ≈ $35,571 / $10,950 |
| Year 40 | W(480) / 14,600 | 75,176.07 | ≈ $75,176 / $14,600 |
| Hero "× 75,176" (tag "YEAR 40 ≈ DAILY AMOUNT"), "about 75,176 times" | W(480) for $1 a day ÷ $1 | 75,176.07 | ≈ × 75,176 |
| Caption "$5 a day ≈ $375,880" | 5 × 75,176.07 | 375,880.35 (round 2's verified year-40 value) | ≈ $375,880 |
| Verdict "A MILLION BY YEAR 40: ≈ $13.30 A DAY" | 1,000,000 ÷ 75,176.07 | 13.302 ($13.30 a day reaches $999,842; $13.31 reaches $1,000,593) | ≈ $13.30 |
| Pinned "$10 a day? ≈ $751,761" | 10 × 75,176.07 | 751,760.69 | ≈ $751,761 |
| Caption: 7% ÷ 12 a month instead | $30.4167 a month at 7% ÷ 12, 480 months | 79,838.07 (≈ 7.2% a year effective) | ≈ × 79,838 |

- **Cross-checks:**
  - Every row is round 2's verified $5 row ÷ 5: 1,882.84 ÷ 5 = 376.57; 26,014.12 ÷ 5 = 5,202.82; 77,187.82 ÷ 5 = 15,437.56; 177,854.25 ÷ 5 = 35,570.85; 375,880.35 ÷ 5 = 75,176.07. The checker recomputes them all and asserts the $5 line.
  - The multiplier holds for any daily amount (W is linear in m); the checker asserts the $5 and $10 lines from it.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 7% a year after inflation, ≈ 10% before, since 1928" uses the sources under 09a: Official Data Foundation, 10.09% / 6.81% (confirmed); A Wealth of Common Sense from Damodaran, 9.94% nominal for 1928-2024 (confirmed; its real figure is unconfirmed).

**Assumptions (in the footer and the input strip, plus the caption for the compounding detail):**
- $1 × 365 ÷ 12 a month, deposited at month-end;
- 7% a year, effective (each dollar grows 7% a year);
- no fees or taxes;
- not a forecast;
- read as rough today's dollars only if your daily amount rises with prices.

**Caption**
> Multiply by your own number.
> The board is $1 a day (≈ $30.42 a month), put in at each month-end at an assumed 7% a year. Every row scales with the amount, so year 40 ≈ your daily amount × 75,176. $5 a day ≈ $375,880: not the million the meme promises. $10 a day ≈ $751,761. A million in 40 years takes ≈ $13.30 a day.
> Why 7%? The S&P 500 has returned ≈ 7% a year after inflation since 1928 (≈ 10% before), so read these as rough today's dollars if your daily amount rises with prices. "7% a year" here means each dollar grows 7% a year; if your calculator uses 7% ÷ 12 a month (≈ 7.2% a year), the multiplier is ≈ 79,838. Not a forecast. Educational maths, not advice.
> #investing #compoundinterest #moneymath #mathtok

**Pinned comment**
> $10 a day? ≈ $751,761. Reply with yours.

**Per-platform notes**
- **YouTube Shorts:** the title mirrors the header and asks "× What?".
- **Instagram Reels:** cover on frame 1 (the "× ?" header, the tagged odometer and the board) or on the 20.8 s frame ("× 75,176" on the hero under the header's blank).
- **TikTok:** the comments should be viewers' own multiplications; the pinned comment asks for them. Expect "S&P does 10%!": the caption answers with the after-inflation framing and the other compounding convention.
- **Risk:** 31.5 s (37 s until the fix pass cut vo[6], "$5 a day…", and its beat), with ≈ 10 s after the last row lands, carried by the hero's "× 75,176" and the verdict; "× 75,176" is a long number to remember (both judges).
- **Look note:**
  - `lookOpts.input: true` draws the "$1 A DAY · 7% A YEAR" strip; there is no `goal` (no $1,000,000 strip or halfway notch now).
  - `lookOpts.heroTag: true` (fix pass) labels the hero with a two-line tag ("YEAR 1" / "$1 A DAY", swapped on every cut); it replaces the coin icon.
  - `lookOpts.beats`: one beat with `hero` / `tag` (fix pass) moves the hero at 20.8 s ("× 75,176", tag "YEAR 40 ≈ / DAILY AMOUNT") and leaves the board whole. The assembly pass's two label-stack beats (20.8 and 25.6 s) are gone: the second showed ≈ $375,880 at 88 px under a 130 px hero still saying $75,176.
  - `lookOpts.verdictStyle: "stack"` (fix pass) draws the verdict in the beats' style: a green rule, line 1 white, line 2 88 px green, in the kit's verdict slot. At 25.6 s the rows scroll up by whole rows (row 20 right under the labels, no gap) and the hero dims to 42% (stills at 25.35, 25.5, 25.7, 26.2 and 31.47 s).
  - Kit workarounds in the format file (reported to the kit owner): the header is built by the format so that "=" and "×" render at cap height in a heavy weight and "× ?" gets a green boxed blank (the kit set them at about x-height). The year column sits 18 px in from the slot edge, meter stubs under 6 px are not drawn, and lined boards meter with the bright underline only (no translucent fill behind the put-in digits).
  - In race terms this is one counter climbing with no finish line. It is not a crash race, so there are no crash bands (the look's rule for fixed-rate hypotheticals).

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

*Superseded by hook pass 2 below: all three hooks were replaced the same day. This pass is kept as the record of what the earlier hooks scored.*

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

### Hook pass 2 (2026-10-08)

The owner rejected round 1 partly because the hooks were weak. Two judges scored each teaser's current hook, its round-1 best (R1, with renderability and maths fixes) and four new rewrites (A-D), out of 10. The round-2 rule: adopt the best candidate when its average is at least 1.0 above the current hook, even below 7.5; otherwise keep the current hook. A key that either judge marks dishonest is out; both judges marked every key honest. Judge 2's 09c scores and the end of the candidate list were cut off in the brief I was given; I read them from the judges' and the hook doctor's own structured outputs, so every score below is complete.

| Teaser | Current | R1 | A | B | C | D | Decision |
|---|---|---|---|---|---|---|---|
| 09a | 5.5 / 5.5 → **5.50** | 7 / 7 → **7.00** | 7 / 6 → 6.50 | 7.5 / 6.5 → **7.00** | 6.5 / 6.5 → 6.50 | 6 / 5 → 5.50 | **Adopt R1** (+1.50; tied with B) |
| 09b | 5.5 / 5 → **5.25** | 7 / 6.5 → **6.75** | 6 / 5.5 → 5.75 | 6 / 5.5 → 5.75 | 6.5 / 6 → 6.25 | 6.5 / 5.5 → 6.00 | **Adopt R1** (+1.50) |
| 09c | 6 / 5.5 → **5.75** | 6 / 5.5 → 5.75 | 6 / 5 → 5.50 | 6.5 / 6 → 6.25 | 7 / 6.5 → **6.75** | 5.5 / 5.5 → 5.50 | **Adopt C** (+1.00, exactly the margin) |

**Cross-slate:** the doctor flagged three shared levers. 09a-A and 09c-C both use the P1 multiplier: only 09c-C is adopted. 09a-B and 09b-C both use "quit": neither is adopted. 09a-C and 09c-D both use "skip one deposit": neither is adopted.

**09a: adopted R1, "You add $100 a month. When does it earn $100 a month?"**
- **The tie with B (both 7.00).** I chose R1 for three reasons:
  1. Both judges gave R1 a 7; B split 7.5 / 6.5.
  2. 09b adopts a POV opener. B ("POV: 5 years of $100 a month…") would make two of the three 09 hooks "POV:" openers, the grammar the `pov-race` format (06) is built on. R1 keeps three different levers in the format: a payout question, a POV gift and a P1 multiplier.
  3. B's "over 80 times" compares cashing out at year 5 with 25 more years of deposits. Judge 2 noted that stopping the deposits but staying invested still reaches ≈ $53,933 (7,347.69 × 1.00667^300 = 53,933.31), so B needed a caption definition of "quit" to stay honest. R1 needed only "earns = growth, not a payout".

  Against R1: B carries the fuller stake (you + $100 a month + 5 years, R6) and attacks a belief people feel more (judge 1 called it the strongest emotional hook in the set). If the owner prefers that open, B's spec was built and linted by the hook doctor (`hd09/specs/09a-live-sheet-hdB-quit-at-5.json` in the session scratchpad).
- **Why R1 scores:** a payout noun on the viewer's own $100 (H32, 54.46x; payout-first median 100,740), the ≈ $8-vs-$100 gap on screen by 0.5 s (H84's formula-then-result, 140x), a VO that adds information instead of reading the banner, and an answer that is the same for every amount (R3 pass).
- **Applied as written:**
  - header, title and footer;
  - rows for years 1, 5, 8, 9, 15, 20, 25 and 30; rowT [0.0, 3.2, 4.6, 8.0, 12.2, 13.9, 17.8, 19.4]; duration 28.5; hold 9.1;
  - the 9 formula-bar lines (all 30 characters or fewer), the marks (row 8 "under $100", row 9 "earns $100+") and the sfx (buzz 4.6, pop 8.0, roll 19.4);
  - all 6 VO lines at their start times, including the judges' fix to vo[0] ("By year 1 it's earning about $8 a month.");
  - the verdict, caption line 1 ("Sooner than you'd guess.") and the pinned comment's 72 ÷ 8 explanation.
- **Deviations, with reasons:**
  1. VO durations are set to exactly 2.6 spoken words a second by the checker's count: vo[0] 3.85 s (candidate 4.0), vo[2] 4.25 (4.3), vo[3] 3.85 (3.9), vo[5] 1.95 (2.0). No start time moved.
  2. The pinned comment adds "At 7% it's year 11. At 10%, year 8." It keeps round 2's answer to the rate fight; the checker asserts both years.
- **What the judges still flag (not fixed here):** a time-to-goal ("when") shape, a softened P3; the empty cells count Worth while the monthly figure lives in the formula bar; no horizon in the banner.
- **Stills read** at 0, 1.5, 3, 8.6 and 25 s:
  - 0.0 s: the banner, the bar typing "≈ $1,245 × 8% ÷ 12", row 1 at ≈ $1,245, 7 rows with put-in and empty Worth cells, the footer.
  - 1.5 s: the bar reads "≈ $1,245 × 8% ÷ 12 ≈ $8/mo". 3.0 s: unchanged, caption "about $8 a month"; row 5 lands at 3.2 s.
  - 8.6 s: row 9 yellow with its tooltip wiping in. 25 s: the verdict card fits under the footer, with row 30 highlighted.

**09b: adopted R1, "POV: someone invested just $1,000 for you at birth. What's it worth at 65?"**
- **Why it won:** the POV grammar (H16, 15.9M, 100.45x; H18, 1.39M), a small round stake with a horizon the viewer owns (65), "just" as the one-word belief, 8 countable age rungs and a lopsided ending (over 81 times, R12).
- **Applied as written:**
  - header, title, footer, input ("once, at birth") and columns (Age / Put in / Worth);
  - the 8 age rungs and their values; rowT from rung 10 on [3.4 … 17.8]; duration 27.0; hold 9.2;
  - the 6 VO lines at their start times, the verdict and caption line 1 ("One gift. Never topped up.").
- **Deviations, with reasons:**
  1. **Rung 1 lands at 1.0 s, not 1.6 s.** Both judges docked the 1.6 s first payoff. The sync rule (a named row within 0.5 s of its word) puts "$1,070" at 0.78 s. The kit still throws a real coin: wind-up at about 0.4 s, release at about 0.75 s. Stills at 0.6, 1.0 and 1.5 s show the coin in hand, then $1,070 on rung 1.
  2. VO durations at 2.6 words a second by the checker's count: vo[0] and vo[5] 2.35 s (candidate 2.4), vo[3] 4.25 (4.3), vo[4] 4.65 (4.7).
  3. The candidate had no pinned comment. I wrote one from verified figures: the same $1,000 put in at 25 is ≈ $14,974 at 65 (the age-40 rung's number), so the first 25 years multiply it by 5.4.
  4. The caption's scaling line replaces round 2's footer "got $5,000? × 5", which the candidate's footer dropped.
- **Lane decision (judge 2's open item):** 09b stays in `growth-ladder`. The rungs are ages, but they are one person's timeline for one $1,000; it is not a table with a row per kind of viewer. The lane check above records this.
- **What the judges still flag (not fixed here):** a passive, hypothetical stake ("someone invested"), the generic "what's it worth?" question, and 3 lines of 14 words.
- **Stills read** at 0, 0.6, 1.0, 1.5, 3, 19 and 23 s:
  - 0.0 s: the 3-line header, the footer, 8 dim age rungs, the figure thinking.
  - 0.6 s: the coin in his hand, caption "Age 1: $1,070."; 1.0 s: $1,070 on rung 1 with "$1,000" put in; 1.5 s: settled; 3.0 s: winding up for rung 10.
  - 23 s: every rung filled, ≈ $81,273 on the gold plate, the 2-line verdict under the ladder.

**09c: adopted C, "Take what you could invest a day. Year 40 = that × ?"**
- **Why it won:** the P1 grammar (H84, 140x; H55, 67.1x; H76, 36.3x) applied to the viewer's own daily amount. "Could invest" includes non-investors. The first payoff lands at 0.4 s. The takeaway, "a million ≈ $13.30 a day", busts the $5-a-day meme honestly (R12).
- **Applied as written:**
  - header, title and footer; input $1 a day;
  - rows for years 1, 5, 10, 20, 30 and 40, to the dollar; rowT [0.4, 3.0, 4.6, 8.0, 12.2, 16.6];
  - `lookOpts` {icon "coin", input true}, with the goal strip dropped;
  - the 8 VO texts, the verdict text, caption line 1 ("Multiply by your own number.") and the pinned comment.
- **Deviations, with reasons:**
  1. **The tail is re-timed.** As written, the last VO line ended at 35.6 s in a 37.0 s video, under the 2 s end hold the checker requires, and its hold (5.0) did not equal duration − last row. Now vo[5] starts at 20.8 (was 20.9), vo[6] at 25.6 (25.8), and vo[7] and the verdict at 31.1 (31.6). The last line ends at 34.95; the duration stays 37.0 and hold is 20.4 (the kit reads hold only when duration is omitted).
  2. VO durations at 2.6 words a second by the checker's count, e.g. vo[7] 3.85 s (candidate 4.0) and vo[6] 5.4 s (5.5).
- **What the judges still flag (not fixed here):** no wrong belief in the first 1.5 s; × 75,176 is too long to remember the way × 0.7 is; 37 s is long, and the blank is answered on screen at 16.6 s but in words only at 20.8 s.
- **Stills read** at 0, 1.5, 3, 17.6, 31, 32 and 36.5 s:
  - 0.0 s: the header with "× ?", the hero at ≈ $376 with the coin, the footer working, the "$1 A DAY · 7% A YEAR" strip, row 1 lit over 5 dark slots.
  - 1.5 s: ≈ $377 on the hero and row 1. 3.0 s: row 5 slamming in.
  - 17.6 s: all 6 rows, the hero counting through ≈ $65,115 toward ≈ $75,176.
  - 31-36.5 s: the 2-line verdict under the board, which compacts to rows 20-40.

**Files:**
- `studio/specs/09a-…`, `09b-…` and `09c-…json`: the new hooks, with ids and file names unchanged. `node src/cli.mjs check` on all three: 3/3 clean, 0 errors, 0 warnings.
- `checks/09-growth-ladder.py`:
  - rebuilt for the three new ladders: 09a's monthly-earnings lines (`A_EARN`, the shown-vs-exact rounding, the month-106 crossing, amount independence, and the pinned 7% and 10% years); 09b's age rungs (`B_AGES`, "over 81", the 25-start pinned figure, the 1.0 s first payoff); 09c's $1 ladder (`C_MULT`, the $5 and $10 lines, ≈ $13.30, the 7% ÷ 12 caption figure and the "≈" before the verdict's multiplier);
  - the columns check now reads a per-spec list (09b's are Age / Put in / Worth), and 09a's mark labels ("under $100", "earns $100+") are covered;
  - result: **468 checks, 0 failures** (518 before). The break test is in the header notes.
- This write-up: the header notes, the shared decisions (beliefs, captions, rounding, lane check) and all three teaser sections (hook, title, frame 1, topic, belief, rules, benchmarks, beat sheet, VO, maths, sources, assumptions, caption, pinned comment and notes) were rewritten. The search log is unchanged: this pass needed no new real-world figure.
- `teasers/v2/teasers.json`: the three 09 entries' titles, headers, runtimes, key numbers and hook scores (7.0, 6.75 and 6.75, the judges' averages), and the format's check line, were updated. `slate.json` lists formats only, so it needed no change.

### Assembly pass (2026-10-08)

Rendered all three in their kits and read the contact sheets, stills, and frames pulled from the MP4s. Three fixes, one per teaser, plus a type-floor fix in the live-sheet format. Every number on screen is still a verified figure: the checker now reports **499 checks, 0 failures** (468 before). The studio linter gives 3/3 clean (0 errors, 0 warnings), and the kits' growth-ladder samples and stress specs (live-sheet 5, scoreboard 2) are still clean.

- **09a: the monthly figure now sits in the sheet.** Before, the sheet showed Year / You put in / Worth, and the hook's unit ("earn $100 **a month**") appeared only in the formula bar. The bar finished typing "≈ $89/mo" about 0.9 s after the VO said it, and at year 30 the VO said "$994 a month" while the sheet's climax was ≈ $149,036. Both judges had flagged this (R9 caveat).
  - Now: a 4th column, "Earns a month" (`data.columns[3]`, with a no-break space so it wraps "Earns / a month"). Its cells are ≈ $8, $49, $89, $105, $231, $393, $634 and $994, the same strings as each formula line's result; the checker asserts that.
  - Frame 1 shows ≈ $8 right under "When does it earn $100 a month?". Both mark tooltips ("under $100", "earns $100+") open under the Earns cell they describe. The summary row counts up to ≈ $994 as the VO says it.
  - Format fix (`looks/live-sheet/formats/growth-ladder.js`): `inputsAtStart` now pre-shows only the put-in column, as the kit README says, so a 4-column ladder's Worth still lands with its row. Also, the summary row's font fit stepped from 41 to 39 px under the 40 px floor; it is now clamped. No other spec uses the live-sheet growth-ladder; the 5 kit specs are unchanged and clean.
- **09b: R12's line is now on screen.** "Over 81 times the gift" was voiced at 22.3 s, but the verdict card covers the caption band from that moment, so it never showed. The verdict is now "**≈ $81,273** at 65. / Over 81× the gift, never topped up." (81,272.86 ÷ 1,000 = 81.27, floored to "over 81"). "$1,000" is still in the header.
- **09c: the screen was static from 19 s to 31 s, and frame 1 showed a count in flight.**
  - After row 40 landed, nothing changed on screen for 12 s while three VO lines carried the answer to the header's "× ?" and the $5 example. New `lookOpts.beats` in `looks/scoreboard/formats/growth-ladder.js`:
    - from the first beat the rows scroll up (as they did for the verdict) and a black band rises at the foot;
    - each beat slams a two-line stack into the verdict's slot: 20.8 s "YEAR 40 ≈ YOUR DAILY AMOUNT" / "× 75,176" (88 px green), and 25.6 s "$5 A DAY × 75,176" / "≈ $375,880";
    - the verdict replaces beat 2 at 31.1 s, and each beat cues a reveal.
    - The option is documented in the format file's header comment. The kit README, which this pass may not edit, does not list it yet.
  - Frame 1 read "$376" (hero and row 1, the ≈ an unlit ghost) under a caption saying "about $377". Row 1 is now at rowT −0.4 s, so its count lands at −0.05 s and frame 1 shows ≈ $377 everywhere. The checker asserts rowT ≤ −0.35, and the VO sync rule still holds (|−0.4 − 0.0| ≤ 0.5).
- **Checker changes:**
  - the row width is now per spec, so 09a has 4 columns;
  - 09a's Earns cells are expected exactly, equal the formula-bar results, rise row by row, and cross $100 between the marked rows;
  - 09b's verdict tokens now end on "81" (not "$1,000");
  - 09c's two beats are covered (40; 75,176; $5 × 75,176; ≈ $375,880), and there are claims for the beats' ≈, their VO anchors, 5 × 75,176 = 375,880, and the frame-1 landing.
  - Break test: see the header notes (4 failures, all three caught).
- **Read:**
  - 09a: contact sheet; stills at 0, 5.4, 9.0, 21.0 and 25.2 s.
  - 09b: contact sheet; stills at 0, 1.6, 5.9, 9.9, 14.0, 16.2-18.0 (the heave, 6 frames), 19.0, 21.0, 23.5 and 27.0 s.
  - 09c: contact sheet; stills at 0, 1.5, 3.6, 19.5, 20.8, 20.85, 20.9, 21.5, 25.65, 26.5 and 32.0 s.
- **MP4s:** `studio/out/09a-…mp4` (28.5 s), `09b-…mp4` (27.0 s) and `09c-…mp4` (37.0 s), all 1080 × 1920, 30 fps, H.264 + AAC. Frames pulled with ffmpeg at 0 / 9.0 / 21.0 s (09a), 0 / 5.9 / 23.5 s (09b) and 0 / 21.5 / 26.5 s (09c) match the stills (mean absolute difference 0.6-2.0 per channel: compression only).
- **Not changed here:** `teasers/v2/teasers.json`'s format-9 check line still says 468 checks; this pass may not edit that file.

### Assembly fix pass (2026-10-08, after QA)

QA scored the three below the round-2 bar: 09b 7.5, 09a 6.5 and 09c 6.5. It found no maths errors (499 checks, 0 failures). This pass applies every must and should issue and the cheap nits. The edits are in the three specs and the three `growth-ladder.js` format files only: no kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched. Every number on screen is still a verified figure. The checker reports **492 checks, 0 failures**: it has fewer checks than before because the cut $5 VO line and beat take their checks with them, and the new claims below add some back. The studio linter gives 3/3 clean (0 errors, 0 warnings), and the scoreboard kit's two growth-ladder samples are still clean.

- **09a (live-sheet):**
  - **Must, reflow:** each tooltip opened a spacer row, so the lower table and the footer jumped about 65 px four times. Marks are now chips (`markStyle` 'chip', the 'auto' choice when it fits): a dark pill dropped over the gridline under the output cell, laid over the next row's still-empty cells. There is no spacer row and nothing moves. The footer stays at the same y in the stills at 4.8, 4.9, 5.0, 7.7, 7.85, 7.95, 8.2, 8.3, 11.8, 11.9, 12.1 and 12.25 s.
  - **Must, the exit glitch:** the old tooltip exited by a width clip ("arns $100+" at 18.95 s). Chips fade in and out by opacity only, with a 6 px drop and a 104% settle on the way in. Each is gone before the next row lands, so row 30's landing (19.4 s) has the moment to itself.
  - **Should, the selection:** it slid through the Worth digits at 20.2-20.7 s, and it grew over every filled row. Now it sits on the newest row's landing cells only and snaps with a 7 px outward pop, so no edge crosses a value.
  - **Should, the climax:** the crossing is now a moment. At 8.0 s the ≈ $105 cell lands bigger in ink on yellow, the year cell turns yellow, and the chip reads "beats your **$100**". At the verdict, row 9 re-lights full width with a bump and takes the selection, and the summary row's yellow fades. The verdict is a two-line stack (`verdictStyle: "stack"`): "From **year 9**" at 88 px over "it earns more than you add." Year 9 is the one focal point on the last frame.
  - **Nits:**
    - The formula-bar lines drop their leading "≈" (the bar's chip is the ≈). A line swaps in whole and types only its result as the row's cell lands, so the bar never blanks to "≈ |".
    - Each chip shows within 0.2 s of its row landing (4.78 and 8.18 s), so the buzz and pop now belong to it.
    - The captions keep "about" with the number after it ("ABOUT $393 A MONTH").
    - The footer is pre-broken at its separator with "\n" (no orphan "·").
- **09b (becker-rig):**
  - **Should, dead air:** the figure stood idle from 13.4 to 16.3 s. The heave now fills the 4.4 s after rung 50: the heavy coin drops into his arms at about 14.2 s, he hitches it up and it sags, he presses it overhead at about 15.6 s and strains under a riser, and he heaves it at 17.4 s.
  - **Should, the impact:** the hit lines are clipped to the band between the column heads and the row under the plate, and the spill drops down the right margin (x 940-1000). Crops at 17.85 and 17.95 s show nothing crossing "WORTH".
  - **Should, header word spacing:** the format file adds 0.1em word spacing and re-fits the header (a kit workaround, reported to the kit owner). The spec breaks line 1 after "just", which keeps its right edge in to about x 850.
  - **Nits:**
    - The footer is pre-broken at its separator.
    - The Worth cells read "≈ $7,612", with a visible space, as the verdict and captions do.
    - The figure is scaled 1.3× and stands clear of the rail, which sits 68 px further right. His pencil stays inside x ≥ 40.
- **09c (scoreboard):**
  - **Should, the unlabelled hero:** `heroTag` puts a two-line tag left of the hero ("YEAR 1" / "$1 A DAY") and swaps it on every cut.
  - **Should, the operators:** the format builds the header, so "=" and "×" render at cap height in Inter Full Black, and "× ?" ends on a green boxed blank (a kit workaround, reported).
  - **Should, the focal conflict:** beat 2 ("$5 A DAY × 75,176" / "≈ $375,880") is cut. The one remaining beat moves the hero itself: at 20.8 s a hard cut to "× 75,176", tagged "YEAR 40 ≈ / DAILY AMOUNT".
  - **Should, the verdict:** it now leads with the new fact. "A MILLION BY YEAR 40:" sits in white over **"≈ $13.30 A DAY"** in 88 px green, under a green rule (`verdictStyle: "stack"`), and the hero dims to 42%.
  - **Should, the length:** vo[6] ("$5 a day: about $375,880.", 5.4 s) and its beat are cut, and the verdict moves to 25.6 s. The video is now 31.5 s, with a 2.05 s hold after the last VO line. The $5 example lives in the caption.
  - **Nits:**
    - The footer no longer repeats "7% a year": the input strip carries it.
    - The year column sits 18 px in from the slot edge.
    - Meter stubs under 6 px are not drawn.
    - Lined boards meter with the bright underline only, so no translucent fill sits behind the put-in digits.
  - **Found in this pass:** when the rows scrolled up for the verdict, they left a gap of about 60 px under the column labels, where row 10 had faded out. The scroll now moves by whole row pitches, so row 20 sits right under the labels (stills at 25.35, 25.5, 25.7, 26.2 and 31.47 s).
- **Checker changes:**
  - 09a: the verdict expects "9" only. A claim pins the verdict text and its emphasis, and another the two mark labels and tones. The formula-bar lines expect the Worth without "≈", with a claim that no line starts with a second "≈".
  - 09c:
    - The footer drops the 7% token, with a claim that the rate is on the input strip from frame 1.
    - The verdict expects "40" and "≈ $13.30", with a claim that pins its text and `verdictStyle`.
    - The hero beat is covered ("× 75,176", tag "YEAR 40"), with a claim for its "≈", its single beat and its VO anchor.
    - A claim checks the hero tag's inputs.
    - The $5 claims are now caption claims.
  - Break test: see the header notes (8 failures, all five edits caught).
- **Read:**
  - 09a: contact sheet; stills at 0, 4.75, 8.15, 11.95, 14.5, 20.3, 25.0 and 28.47 s, plus the 16-frame grid at 4.8-24.3 s.
  - 09b: contact sheet; stills at 0, 9.6, 13.6, 14.4, 15.2, 16.0, 16.8, 17.4, 17.85, 17.95, 18.1, 18.3, 18.6 and 26.97 s, plus crops of the impact.
  - 09c: contact sheet; stills at 0, 13.0, 19.5, 21.2, 25.3, 25.35, 25.5, 25.7, 26.2 and 31.47 s.
- **MP4s:** `studio/out/09a-…mp4` (28.5 s), `09b-…mp4` (27.0 s) and `09c-…mp4` (31.5 s), all 1080 × 1920, 30 fps, H.264 + AAC. I pulled frames with ffmpeg at 11.95 and 25.0 s (09a), 0 and 17.95 s (09b), and 20.9 s, 26.2 s and the last frame (09c). The ones compared against stills (all but 09c's 20.9 s, which I looked at but had no matching still) match them, with a mean absolute difference of 0.3-1.4%: compression only.
- **Kit-level issues, worked around in the format files or specs and reported to the kit owners:**
  - becker-rig: the header's word spacing.
  - live-sheet and becker-rig chrome: a wrapped footer starts its second line with "·" (worked around with "\n" in the specs).
  - scoreboard: the `ax` operators "=" and "×" render at about x-height.
  - The kit READMEs do not yet list the new options: live-sheet `verdictStyle` and chip marks; scoreboard `heroTag`, `verdictStyle`, and `beats[].hero` / `tag`.
- **Not changed here:** `teasers/v2/teasers.json`'s format-9 check line still says 468 checks; this pass may not edit that file.
