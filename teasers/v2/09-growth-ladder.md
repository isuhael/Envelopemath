# Format 9: year-by-year growth ladder, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Format:** `growth-ladder`, hook pattern **P2** ("small amount × time =")
**Lane:** one small regular amount (or one small lump), year by year
**Files:**
- Specs:
  - [`studio/specs/09a-live-sheet-100-a-month-doubles.json`](../../studio/specs/09a-live-sheet-100-a-month-doubles.json)
  - [`studio/specs/09b-becker-rig-1000-times-1-07.json`](../../studio/specs/09b-becker-rig-1000-times-1-07.json)
  - [`studio/specs/09c-scoreboard-5-a-day-millionaire.json`](../../studio/specs/09c-scoreboard-5-a-day-millionaire.json)
- Check: [`teasers/v2/checks/09-growth-ladder.py`](checks/09-growth-ladder.py). Run `python3 teasers/v2/checks/09-growth-ladder.py`. It reports **504 checks, 0 failures** and exits 0. As a test I changed one ladder cell (09b) and one VO number (09c), and it exited 1 on both.

**How the facts were checked**
- None of the three teasers puts market data on screen. Every on-screen number comes from one stated assumption (8% or 7% a year), and the footer prints that assumption with "not a forecast". Nothing on screen needs a source.
- Real-world figures appear only in the captions and pinned comments. These are the S&P 500's long-run averages, used to explain why we chose 7% and 8%. Each one has two independent sources (see "Sources" under each teaser).
- I used **4 of the 14 web searches** allowed. The egress proxy blocked both page fetches I tried (NYU Stern and A Wealth of Common Sense), so the two long-run figures come from search results: the publisher's page title, URL and date, plus the search engine's reading of the page. Before posting, someone should open the two pages marked **[click-check]**.

**Studio linter:** `node src/cli.mjs check` passes on all three specs: **3/3 clean, 0 errors**.
- There is one warning. The 09c footer renders at 37.7 px, under the 40 px recommendation but above the 34 px floor. The Scoreboard footer is one line, so the text is already cut to its essentials.
- The Becker kit already implements `growth-ladder`. I rendered 09b stills at 0, 3, 25 and 29 s: the rows, the bars, the gold plate on year 30 and the verdict all draw correctly.
- In Live Sheet and Scoreboard, `formats/growth-ladder.js` is still a "TODO" stub. For 09a and 09c the lint therefore covers the header, footer, captions and verdict, but not the ladder itself. Re-run it once those modules land.
- While linting I fixed two things in 09c: the footer was too long for the Scoreboard's one-line footer, and the two-line verdict overflowed into the caption band.
- Everything in `lookOpts` is a proposal. A kit must render without it.

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
   - **The step beyond FinCalC:** in each teaser **the milestone is the question in the hook**, so the ladder ends on a verdict (R12) and not only on a big number.
5. **Pitfalls:**
   - FinCalC's own 2026 six-second cards in this formula stalled: 9,017 (https://www.youtube.com/shorts/a4GbewbYbPw) and 10,445 (https://www.youtube.com/shorts/1NugTIGX-d4).
   - Its 3.77M short is a 10% table under a "12%" label (study check).
   - The multiples are modest (14.1x at most where scored), and the two hits are 2022-23 and India-only.
   - So all three teasers are voiced 29.5-37.5 s ladders, not silent cards, and every rate on screen matches every row.

### Decisions shared by all three

- **Each teaser busts a different wrong belief:**
  - 09a: "Rule of 72, so 9 years."
  - 09b: "$70 a year, so $3,100."
  - 09c: "$5 a day makes you a millionaire in about 40 years."

  Together the three cover the three ways people misjudge compounding: lump sum vs monthly, simple vs compound, and rate vs horizon.
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
- **No advice language.** These are worked examples at an assumed rate, and every caption says so.

---

## 09a: Live Sheet: "$100 a month at 8%. Which year does it double?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input / peach output headers) |
| Spec | `studio/specs/09a-live-sheet-100-a-month-doubles.json` (29.5 s) |
| Platform title | **$100 a Month at 8%: Which Year Does It Double?** |
| On-screen hook (header) | **$100 a month at 8%. / Which year does it double?** (10 words, 2 lines) |
| Frame 1 | Banner. Formula bar "= $100 × 12 months = $1,200 in". Columns Year / You put in / Worth. Row 1 filled: 1 · $1,200 · ≈ $1,245. Rows 5, 9, 12, 15, 16, 20, 30 show their year and "You put in" (`lookOpts.inputsAtStart`), with empty Worth cells. Footer on |
| Footer | ASSUMES 8% a year, compounded monthly · $100 in at each month-end · not a forecast |

**Topic vs the seed:**
- Kept: $100 a month at 8%, year by year, in FinCalC's put-in vs worth grammar.
- Added: FinCalC's own milestone (profit ≈ deposits) is now the hook's question. "Doubled" means worth ≥ 2 × what you put in, which is the same thing as growth passing deposits. The ladder ends on a single repeatable answer: **year 16**.

**Wrong belief it exploits:**
- "8% doubles my money in 9 years" (the Rule of 72). That is true for a lump sum, which doubles in ≈ 8.7 years at 8% compounded monthly. A monthly plan doubles only in year 16, because every new $100 starts from zero.
- A second belief busted in the verdict: "more money a month doubles faster". It doesn't. At 8% it is year 16 for $50, $100, $500 or $1,000 a month.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$100", "8%" and the Year 1 row ($1,200 → ≈ $1,245) are on screen at 0.0 s |
| R2 | One input ($100 a month) and no result in the hook |
| R3 | Every viewer finds their horizon in the year rows. The verdict says the answer is the same for **any** monthly amount, so it is everyone's row |
| R4 | $100 a month is ChartOrbit's stake and a small, round, familiar amount |
| R5 | "The Rule of 72 says 9 years." The year-9 row shows ≈ 1.46×, not 2× |
| R6 | You + $100 a month + years 1-30 |
| R7 | The candidate answer is named (9 years) and then tested row by row |
| R8 | 10 words, 2 lines |
| R9 | 8 year rows visible from 0.0 s with empty Worth cells: a countable loop |
| R10 | First payoff (Year 1) at 0.0 s. Biggest number (year 30) last |
| R11 | The question is on screen; the caption opens with the verdict ("Year 16, not 9.") |
| R12 | A single number to repeat in a comment: **16** |

**Benchmark hooks it is modelled on**
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years", spoken "How much return can you get on a ₹2000 monthly SIP at 12%?". 3,771,667 views, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: the amount + rate + "year by year" banner, Year 1 at 0.0 s, the row unmask, and the milestone.
- H31, FinCalC: "Home Loan Part payment Reduce Tenure NOT EMI". 578,461, https://www.youtube.com/shorts/7CFEV6D3QNM. Borrowed: the "X, NOT Y" verdict grammar, here "year 16, not 9".
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: $100 a month, and a question that waits for a verdict.

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "= $100 × 12 months = $1,200 in". Row **1**: $1,200 / ≈ $1,245. The other rows show year and put-in only. Footer | "$100 a month at 8%." (0.0-3.2) |
| 3.4 | Formula bar "Rule of 72: 72 ÷ 8 = 9 years?" | "The Rule of 72 says 9 years." (3.4-6.6) |
| 4.6 | Row 5: ≈ $7,348 | |
| 6.8 | Row **9**: ≈ $15,743. Red mark "not double". Formula bar "≈ $15,743 < 2 × $10,800". Buzz | "Year 9? Not even close." (6.8-8.9) |
| 8.0 | Row 12: ≈ $24,051 | |
| 9.1 | Row **15**: ≈ $34,604. Red mark "not yet". Formula bar "≈ $34,604 < 2 × $18,000". Buzz | "Year 15: still short." (9.1-10.8) |
| 11.0 | Row **16**: ≈ $38,721. The row turns yellow with the green mark "doubled". Formula bar "≈ $38,721 > 2 × $19,200". Pop | "Year 16: $19,200 in. Worth more than double." (11.0-15.8) |
| 16.0 | (holds) | "Why 16, not 9? Every new $100 starts from zero." (16.0-20.8) |
| 17.2 | Row 20: ≈ $58,902 | |
| 17.6 | Formula bar "1st $100 ≈ $356 · last $100 = $100" | (…every new $100…) |
| 21.0 | Row **30** counts up over 0.8 s to **≈ $149,036** (biggest, last). Formula bar "≈ $149,036 ÷ $36,000 ≈ 4.1×". Roll | "Year 30: over 4 times what you put in." (21.0-24.6) |
| 24.8 | Verdict "Doubled in **year 16**, not 9. / Same year for any monthly amount." Formula bar "$50 or $500 a month: still year 16". Ding (kit) | "Any monthly amount: still year 16." (24.8-27.3) |
| 27.3-29.5 | Hold on the finished sheet, then clear to frame 1 (loop) | |

**Full guide VO** (64 spoken words)

> $100 a month at 8%. The Rule of 72 says 9 years. Year 9? Not even close. Year 15: still short. Year 16: $19,200 in. Worth more than double. Why 16, not 9? Every new $100 starts from zero. Year 30: over 4 times what you put in. Any monthly amount: still year 16.

**The maths**

- **Basis:** $100 deposited at each month-end, at r = 8%/12 a month, compounded monthly.
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
| "Rule of 72 … 9 years" | 72 ÷ 8 | 9 | 9 |
| "2 × $19,200" | 2 × 19,200 | 38,400 | < ≈ $38,721, so doubled |
| "1st $100 ≈ $356" | 100 × (1 + r)^191 (the month-1 deposit at the end of month 192) | 355.77 | ≈ $356 |
| "≈ 4.1×", "over 4 times" | 149,035.94 ÷ 36,000 | 4.140 | ≈ 4.1× (formula bar), "over 4" (VO) |
| "still year 16" for $50 / $500 | the first year with W ≥ 2 × put in; the amount cancels out of the ratio | 16 / 16 | 16 |

- **Cross-checks:**
  - Year 15 is the last year short of double (1.922×).
  - A lump sum at 8% compounded monthly doubles in ln 2 ÷ (12 ln(1 + r)) = 8.69 years. That is why the Rule of 72's 9 is right for a lump sum.
  - The doubling year at other rates is 19 at 7% and 13 at 10% (pinned comment).
- **Agreement with the format contract:** the year 1, 10 and 30 values match the FORMATS.md example rows to the dollar ($1,245; $18,295; $149,036).

**Sources (real-world inputs).** None on screen. The rate is an assumption, labelled "not a forecast". The caption's context line ("≈ 10% a year since 1928 before inflation, ≈ 7% after") has two sources:

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| S&P 500 since 1928: 10.09% a year nominal, 6.81% inflation-adjusted (dividends reinvested, CPI from BLS) **[click-check]** | Official Data Foundation, "S&P 500: since 1928" (officialdata.org) | page computed through 2026; searched 2026-10-07 | https://www.officialdata.org/us/stocks/s-p-500/1928 |
| 1928-2024: stocks +9.94% a year, real +6.8% (data: Aswath Damodaran, NYU Stern) **[click-check]** | Ben Carlson, A Wealth of Common Sense, "Historical Returns For Stocks, Bonds, Cash, Real Estate and Gold" | January 2025 | https://awealthofcommonsense.com/2025/01/historical-returns-for-stocks-bonds-cash-real-estate-and-gold/ |
| Same series to 2025 (≈ 10% nominal, ≈ 6.9% real per the search summary; not read directly) | A Wealth of Common Sense, "Historical Returns For Stocks, Bonds, Cash, Housing & Gold (2025)" | January 2026 | https://awealthofcommonsense.com/2026/01/historical-returns-for-stocks-bonds-cash-housing-gold-2025/ |
| Primary dataset (fetch blocked by the proxy) | Aswath Damodaran, NYU Stern, "Historical Returns on Stocks, Bonds and Bills" | updated yearly | https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html |

**Assumptions (in the footer):**
- 8% a year, compounded monthly (8%/12 a month);
- $100 in at each month-end;
- no fees, no taxes, no inflation adjustment;
- the rate is not a forecast.

**Caption (IG/TikTok; also the YouTube description)**
> Year 16, not 9. $100 a month at 8%: by year 16 you've put in $19,200 and it's worth ≈ $38,721. The Rule of 72 (72 ÷ 8 = 9) is for money that's all in on day 1. In a monthly plan the newest $100s have barely started. And the year doesn't depend on the amount: $50 or $500 a month, it's still year 16 at 8%.
> Maths: deposits at month-end, 8% a year compounded monthly. 8% is an assumption, not a forecast (the S&P 500 has returned ≈ 10% a year since 1928 before inflation, ≈ 7% after). Educational maths, not advice.
> #compoundinterest #ruleof72 #investing #moneymath

**Pinned comment**
> At 7% a year it takes until year 19. At 10%, year 13. Which rate did you plug in?

**Per-platform notes**
- **YouTube Shorts:** use the title above. It is FinCalC's home platform, and the question in the title matches the banner. Keep the 2.2 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** cover on the finished sheet with row 16 highlighted. Caption line 1 is the verdict.
- **TikTok:** the comment fight will be the rate ("8% is too high or too low") or "the Rule of 72 is for lump sums". The pinned comment takes the first; the VO's "every new $100 starts from zero" takes the second. Put "Year 16, not 9" in the first 100 characters.
- **Not a 6 s card:** FinCalC's 2026 amount-first cards stalled at 9,017-10,445. Keep this voiced.
- **Look note:** the formula bar carries the doubling test (the "≈ $X < 2 × $Y" lines). That is the Live Sheet's "formula bar as proof". `lookOpts.marks` proposes red, red and yellow-green tints for rows 9, 15 and 16.

---

## 09b: Becker Rig: "Leave $1,000 alone at 7% a year. What's it worth in 30 years?"

| | |
|---|---|
| Look | `becker-rig` (a light void, one green stick figure, a ladder whose rungs are the year rows, coins thrown up to each rung, grey/green bars, a gold plate and impact on the last row) |
| Spec | `studio/specs/09b-becker-rig-1000-times-1-07.json` (34.5 s) |
| Platform title | **Leave $1,000 at 7% for 30 Years. Is It Really Just $3,100?** |
| On-screen hook (header) | **Leave $1,000 alone at 7% a year. / What's it worth in 30 years?** (13 words, 2 lines) |
| Frame 1 | Header. The figure in the "think" pose at the foot of the ladder. 8 dim rungs labelled 1, 2, 5, 10, 15, 20, 25, 30, each with a dotted empty shelf. Footer. (Proposal: a gate labelled "×1.07" beside the ladder, `lookOpts.gate`) |
| Footer | ASSUMES 7% a year, added once a year · not a forecast |

**Topic vs the seed:**
- Kept exactly: Becker idea 1, $1,000 pushed through × 1.07 once a year, with $1,967 at year 10 and $7,612 at year 30 (verified figures in `watch/alan-becker.md` §6).
- Added: the simple-interest guess ($70 a year × 30 = **$3,100**) as the open loop, so the ladder has something to beat. Year 20 already passes the 30-year guess.

**Wrong belief it exploits:** "7% of $1,000 is $70 a year, so 30 years is $3,100." That is linear thinking, the most common compounding mistake. The VO plants it in seconds 0-9, and the ladder breaks it: year 2 adds $74.90, not $70; year 20 is already past $3,100; year 30 is about 2.5× the guess.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$1,000", "7%" and "30" are in the header at 0.0 s. Row 1 ($1,070) lands at 2.4 s |
| R2 | One input ($1,000) and no result in the header. The wrong answer is spoken, not printed in the hook |
| R3 | One stake, but the rows are horizons (1-30). $1,000 scales, so any lump size is "× your thousands" (caption) |
| R4 | $1,000 is round and familiar, and it is the Becker idea's own stake |
| R5 | "plus $70 a year … 30 years of that is $3,100. Right?" |
| R6 | You (imperative "Leave") + $1,000 + 30 years |
| R7 | Two named answers compete: the $3,100 guess vs the ladder |
| R8 | 13 words, 2 lines |
| R9 | 8 rungs on screen from frame 1 (dim years, dotted shelves) |
| R10 | First payoff at 2.4 s ($1,070). Biggest number last (≈ $7,612, heaved onto the top rung) |
| R11 | The header asks; the caption opens with the verdict ("≈ $7,612, not $3,100") |
| R12 | Lopsided and repeatable: "2.5 times the guess" |

**Benchmark hooks it is modelled on**
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years", with the spoken "How much return can you get…?". 3,771,667, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: amount + rate + horizon, asked as "what's it worth?".
- H84, Master Money: "4 DEAD SIMPLE NUMBERS…", with its formula-then-result opener "Take your salary and multiply it by 0.7". 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: the first spoken line is the first calculation ("$1,000 at 7%: plus $70 a year"), with no greeting. The hook bank's rewrite 4.5 uses the same move to name and then beat a wrong answer ("Times 24 says $60,000. You're $5,000 off.").
- H72, The Market Hustle: "How hitting $100K by age 40 and never investing again would grow". 67,160 (1.6x med), https://www.instagram.com/reel/DdpT7thyGvN/. This is the benchmark's lump-sum, left-alone P2 variant. It was a single-result calculator, which is why 09b is a ladder with a guess to beat.

**Beat sheet** (the rig choreography is the kit's own: a coin thrown to each rung, and the last one heaved)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header, ladder with dim rungs, the figure thinking, footer. (Proposal: "×1.07" gate) | "$1,000 at 7%: plus $70 a year." (0.0-4.4) |
| 2.4 | The coin lands on rung **1**: **$1,070**; "$1,000" slides into "You put in". Thud | (…plus $70…) |
| 6.6 | (Proposal, `lookOpts.guess`) a dashed "$3,100?" marker drops across the bars, tagged "+$70 a year". Boing | "30 years of that is $3,100. Right?" (4.6-9.0) |
| 9.2 | Rung **2**: ≈ $1,145 | "Year 2 adds about $75, not $70." (9.2-13.2) |
| 12.2 | Rung 5: ≈ $1,403 | |
| 13.4 | Rung **10**: ≈ $1,967. The green bar is now almost as long as the grey | "Year 10: about $1,967. Almost doubled." (13.4-18.2) |
| 16.8 | Rung 15: ≈ $2,759 | |
| 18.4 | Rung **20**: ≈ $3,870. Its bar passes the $3,100 marker | "Year 20: about $3,870. Already past the guess." (18.4-23.6) |
| 21.8 | Rung 25: ≈ $5,427 | |
| 23.8 | The figure lifts the last, biggest coin overhead and heaves it. Rung **30**: **≈ $7,612** on the gold plate. Hit, shake, coin spill, celebrate, then he points up | "Year 30: about $7,612." (23.8-27.4) |
| 27.6 | Verdict "**≈ $7,612**, not $3,100. / Each year's 7% earns 7% too." Ding (kit) | "Not $3,100. About 2.5 times that." (27.6-32.4) |
| 32.4-34.5 | Hold, then loop | |

**Full guide VO** (78 spoken words)

> $1,000 at 7%: plus $70 a year. 30 years of that is $3,100. Right? Year 2 adds about $75, not $70. Year 10: about $1,967. Almost doubled. Year 20: about $3,870. Already past the guess. Year 30: about $7,612. Not $3,100. About 2.5 times that.

**The maths**

- **Basis:** V(y) = $1,000 × 1.07^y. The 7% is credited once a year, and nothing is added or withdrawn.
- **The guess:** S(y) = $1,000 + $70 × y (simple interest).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Year 1 | 1,000 × 1.07 | 1,070.00 | $1,070 |
| Year 2 | × 1.07² | 1,144.90 | ≈ $1,145 (VO: adds about $75; exact add $74.90) |
| Year 5 | × 1.07⁵ | 1,402.55 | ≈ $1,403 |
| Year 10 | × 1.07¹⁰ | 1,967.15 (1.967×) | ≈ $1,967, "almost doubled" |
| Year 15 | × 1.07¹⁵ | 2,759.03 | ≈ $2,759 |
| Year 20 | × 1.07²⁰ | 3,869.68 | ≈ $3,870 (> $3,100) |
| Year 25 | × 1.07²⁵ | 5,427.43 | ≈ $5,427 |
| Year 30 | × 1.07³⁰ | 7,612.26 | ≈ $7,612 |
| "$70 a year" | 1,000 × 7% | 70 | $70 |
| "$3,100" | 1,000 + 70 × 30 | 3,100 | $3,100 |
| "2.5 times" | 7,612.26 ÷ 3,100 | 2.456 | about 2.5 |
| Gate | 1 + 7% | 1.07 | ×1.07 |
| "You put in" | the one deposit | 1,000 | $1,000 on every rung (grey bar; green = growth) |

- **Cross-checks:**
  - It first passes the guess in year 17 ($3,158.82), 13 years early.
  - It doubles in year 11 ($2,104.85). Rule of 72: 72 ÷ 7 ≈ 10.3.
  - Year 30 alone adds ≈ $498 (7,612.26 − 7,114.26).
  - $1,967 and $7,612 match the Python-checked figures in `alan-becker.md` §6, idea 1.

**Sources:** none. There is no real-world input; 7% is a stated assumption.
**Assumptions (in the footer):**
- 7% a year, credited once a year;
- nothing added or withdrawn (the header's "alone");
- no fees, taxes or inflation;
- not a forecast.

**Caption**
> ≈ $7,612, not $3,100. $1,000 left alone at 7% a year for 30 years. Adding $70 a year (simple interest) gets you $3,100. Growing × 1.07 every year gets you ≈ $7,612, about 2.5× more, because every year's 7% lands on a bigger pile: year 2 adds $74.90, year 30 adds ≈ $498. It almost doubles by year 10 (≈ $1,967), the Rule of 72 at work (72 ÷ 7 ≈ 10). Got $5,000? Multiply every row by 5.
> Maths: 7% a year, credited once a year, nothing added or taken out. An assumption, not a forecast. Educational maths, not advice.
> #compoundinterest #investing #moneymath #mathtok

**Pinned comment**
> Keep going: year 40 is ≈ $14,974. The $70-a-year version is $3,800.

**Per-platform notes**
- **YouTube Shorts:** the title carries the guess as a question. The screen never prints it as the answer, so R2 holds for the hook line.
- **Instagram Reels:** cover on the heave frame (≈ 24 s) or on the finished ladder with the gold plate.
- **TikTok:** the comment fight is "where do you get 7%?". Pin the year-40 comment first, and reply with the long-run S&P figures if asked (sources under 09a).
- **Look note:**
  - Becker devices used (`alan-becker.md` §4): numbers as objects (the coin becomes the number), the escalation ladder, and a final scale gag (the coin is too heavy and has to be heaved).
  - `lookOpts.gate` proposes the ×1.07 gate prop already in `lib.js` (`gate()`, default label "×1.07"), for the coin to pass through on each throw.
  - `lookOpts.guess` proposes a dashed $3,100 marker across the bars.
  - The kit renders correctly without either (verified in stills).

---

## 09c: Scoreboard: "$5 a day, invested. Does it make you a millionaire?"

| | |
|---|---|
| Look | `scoreboard` (a black top bar with a neon odometer, a dark stage with coin stacks, a bottom-bar label stack, one green money colour) |
| Spec | `studio/specs/09c-scoreboard-5-a-day-millionaire.json` (37.5 s) |
| Platform title | **Does $5 a Day Invested Make You a Millionaire?** |
| On-screen hook (header) | **$5 A DAY, INVESTED. / DOES IT MAKE YOU A MILLIONAIRE?** (10 words, 2 lines; "$5 A DAY" is the only green word) |
| Frame 1 | Header. The odometer already ticking up from $0. A goal line "$1,000,000 · MILLIONAIRE" across the stage (`lookOpts.goal`). Footer working "$5 × 365 ÷ 12 ≈ $152/mo · 7% a year · not a forecast" |
| Footer | $5 × 365 ÷ 12 ≈ $152/mo · 7% a year · not a forecast |

**Topic vs the seed:**
- Kept: $5 a day ≈ $152 a month at 7%, year by year.
- Added: ChartOrbit's yes/no verdict question ("make you rich?"), made checkable as "a millionaire?". The ladder now runs to the year the answer flips: **year 53**.
- Year 40 stays in as the mid-video reversal.

**Wrong belief it exploits:** "$5 a day makes you a millionaire in about 40 years." At an assumed 7% it is ≈ $399,200 in year 40, **not even halfway**, and it passes $1,000,000 in year 53. The 40-year version needs about 10% before inflation (it passes $1,000,000 in year 41), which is in the pinned comment.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$5", the footer working ("≈ $152/mo", "7%") and the goal line "$1,000,000" are on screen at 0.0 s. The odometer is already moving |
| R2 | One input ($5 a day) in the hook line and no result. "Millionaire" is the question, not an answer |
| R3 | The rows are horizons (1 to 53 years), so each viewer stops at their own. $5 scales (caption: "$10 a day? Double every row") |
| R4 | $5 a day is small and habitual (the benchmark's $3/day Monster at 140.6x; the Market Hustle's "$10 each day") |
| R5 | "Millionaire?" invites the 40-year belief. Year 40 lands "not even halfway" |
| R6 | You + $5 a day. The horizon is the ladder (the year rungs, with the goal line as the finish) |
| R7 | A yes/no with the finish line named on screen ($1,000,000) |
| R8 | 10 words, 2 lines |
| R9 | 7 rungs and a visible goal line: the distance left is countable |
| R10 | First payoff at 2.0 s (Year 1: ≈ $1,900). Biggest number last (≈ $1,027,600) |
| R11 | The question is on screen; the caption and verdict give the answer |
| R12 | A repeatable verdict: "Yes, in year 53" |

**Benchmark hooks it is modelled on**
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?", with frame 1 "POV: Since 1996 you invested $100/month in BMW and never sold". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: the yes/no verdict question in P2.
- H45, @investment_timeline: "POV: You invested in Monster instead of paying $3/day for a Monster Energy". 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. Borrowed: a small per-day amount as the stake. No product is named here, because that grammar belongs to the `pov-race` lane.
- H49, The Debt Freedom Project: the verdict caption "Yes, daily payments work!". 382,100 (289.1x), https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133. Borrowed: a "Yes, …" verdict that takes a side.
- Context: H73, The Market Hustle: "$10 each day = $930 by the end of the year". 46,137 (1.1x med), https://www.instagram.com/reel/Dd5KkdPs20G/. This is the daily-amount ladder at its plainest. We add the compounding and the verdict.

**Beat sheet** (each rung is a hard cut: the odometer rolls to the new Worth, coins rain to the new count, and the label stack shows "YEAR N" over "$X IN")

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. The odometer ticking. The goal line "$1,000,000 · MILLIONAIRE". Footer working | "$5 a day, invested. Year 1: about $1,900." (0.0-5.2) |
| 2.0 | Rung **YEAR 1**: odometer ≈ $1,900; label "$1,825 IN" | (…Year 1…) |
| 5.4 | Cut. **YEAR 10**: ≈ $26,300 / $18,250 in | "Year 10: about $26,300." (5.4-9.0) |
| 9.2 | Cut. **YEAR 20**: ≈ $79,200 / $36,500 in | "Year 20: about $79,200." (9.2-12.8) |
| 13.0 | Cut. **YEAR 30**: ≈ $185,500 / $54,750 in | "Year 30: about $185,500." (13.0-17.4) |
| 17.6 | Cut. **YEAR 40**: ≈ $399,200 / $73,000 in. The stack stops well below the goal line's halfway mark. Buzz | "Year 40: about $399,200. Not even halfway." (17.6-23.1) |
| 23.3 | Cut. **YEAR 50**: ≈ $828,600 / $91,250 in | "Year 50: about $828,600." (23.3-27.7) |
| 27.9 | Cut. **YEAR 53**: the odometer rolls over 2.4 s past the goal line to **≈ $1,027,600** / $96,725 in. Cash | "Year 53: over $1,000,000." (27.9-30.7) |
| 30.9 | Verdict "A millionaire? / **Yes, in year 53.**" Reveal (kit) | "Yes, in year 53. You put in under a tenth." (30.9-35.3) |
| 35.3-37.5 | Hold, then a hard cut back to frame 1 (loop) | |

**Full guide VO** (85 spoken words)

> $5 a day, invested. Year 1: about $1,900. Year 10: about $26,300. Year 20: about $79,200. Year 30: about $185,500. Year 40: about $399,200. Not even halfway. Year 50: about $828,600. Year 53: over $1,000,000. Yes, in year 53. You put in under a tenth.

**The maths**

- **Basis:** m = $5 × 365 ÷ 12 = $152.0833 deposited at each month-end, at r = 7%/12 a month, compounded monthly.
- **Formulas:**
  - Worth after n months: W(n) = m × ((1 + r)^n − 1) ÷ r.
  - You put in: $5 × 365 × years.
- **Display:** nearest $100.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Footer "≈ $152/mo" | 5 × 365 ÷ 12 | 152.08 | ≈ $152 |
| Year 1 | W(12) / 1,825 | 1,884.71 | ≈ $1,900 / $1,825 |
| Year 10 | W(120) / 18,250 | 26,323.31 | ≈ $26,300 / $18,250 |
| Year 20 | W(240) / 36,500 | 79,224.26 | ≈ $79,200 / $36,500 |
| Year 30 | W(360) / 54,750 | 185,537.26 | ≈ $185,500 / $54,750 |
| Year 40 | W(480) / 73,000 | 399,190.37 | ≈ $399,200 / $73,000 ("not even halfway": < $500,000) |
| Year 50 | W(600) / 91,250 | 828,560.79 | ≈ $828,600 / $91,250 |
| Year 53 | W(636) / 96,725 | 1,027,626.50 | ≈ $1,027,600 / $96,725 ("over $1,000,000") |
| "year 53" | the first year-end with W ≥ $1,000,000 (year 52 is $956,589.83; the crossing is in month 632) | 53 | 53 |
| "under a tenth" | 96,725 ÷ 1,027,626.50 | 9.4% | under a tenth |

- **Cross-checks:**
  - Year 30 matches the Scoreboard storyboard's own check (≈ $185,537) in `03-look-directions.md`.
  - Growth at year 53 is ≈ $930,900.
- **Pinned-comment figures:**
  - At 10%, the plan passes $1,000,000 in month 485, which is year 41.
  - At 10%, year 40 is ≈ $961,800, still short.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 7% after inflation, ≈ 10% before, since 1928" uses the two sources in the 09a table: Official Data Foundation, 10.09% / 6.81%; A Wealth of Common Sense from Damodaran, 9.94% / 6.8% for 1928-2024.

**Assumptions (in the footer, plus the caption for the compounding detail):**
- $5 × 365 ÷ 12 a month, deposited at month-end;
- 7% a year, compounded monthly;
- no fees or taxes;
- not a forecast;
- read as rough today's dollars only if the $5 rises with prices.

The Scoreboard footer is one line, so "compounded monthly" lives in the caption. With it, the footer would not fit at 34 px or more.

**Caption**
> Yes, in year 53. $5 a day is ≈ $152 a month ($5 × 365 ÷ 12). At an assumed 7% a year, compounded monthly: year 40 ≈ $399,200 (not even halfway), year 53 ≈ $1,027,600. You put in $96,725, under a tenth of it. $10 a day? Double every row.
> Why 7%? The S&P 500 has returned ≈ 7% a year after inflation since 1928 (≈ 10% before), so read these as rough today's-dollar figures if your $5 rises with prices. Not a forecast. Educational maths, not advice.
> #investing #compoundinterest #millionaire #moneymath

**Pinned comment**
> Heard "$5 a day makes you a millionaire in 40 years"? That works at ≈ 10% a year: at 10%, it passes $1,000,000 in year 41, in future dollars. At ≈ 7% (closer to the long-run return after inflation) it's year 53.

**Per-platform notes**
- **YouTube Shorts:** the title is ChartOrbit's grammar word for word, which is its best P2 title. The roll past the goal line at 27.9 s is the moment to keep.
- **Instagram Reels:** cover on the year-40 frame ("≈ $399,200", far below the goal line): the open question makes a strong cover. Caption line 1 is the verdict.
- **TikTok:** expect "S&P does 10%!" comments. The pinned comment answers with the 10% maths and the inflation point. That is the benchmark's input-argument engine, and it is honest.
- **Risk:** "millionaire?" is close to goal-first framing (P3), which flops in the benchmark. The input leads and the ladder pays off every 3-4 s, which is P2 behaviour. If it underperforms, test the fallback header "$5 A DAY, INVESTED. / WHAT'S IT WORTH, YEAR BY YEAR?" with the same ladder.
- **Look note:**
  - `lookOpts.goal` proposes a $1,000,000 finish line on the stage: the countable open loop.
  - `lookOpts.icon: "coin"` sets the stack unit.
  - In race terms this is one counter climbing toward a fixed line. It is not a crash race, so there are no crash bands (the look's rule for fixed-rate hypotheticals).

---

## Search log (4 of 14)

1. S&P 500 historical average annual return since 1928, nominal and inflation-adjusted (Damodaran 2025). Secondary summaries: ≈ 10.0% nominal, ≈ 6.5-7% real.
2. Damodaran "Historical Returns on Stocks, Bonds and Bills" 1928-2025, geometric average, real. A Wealth of Common Sense results: ≈ 6.9% real and ≈ 10% nominal for 1928-2025 (summary).
3. The same, restricted to awealthofcommonsense.com. The January 2025 article: 1928-2024 stocks +9.94% nominal, +6.8% real.
4. officialdata.org S&P 500 since 1928. 10.09% a year nominal, 6.81% inflation-adjusted.

WebFetch on pages.stern.nyu.edu and awealthofcommonsense.com was blocked by the egress proxy.
