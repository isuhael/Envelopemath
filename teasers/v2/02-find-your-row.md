# 02 · Find your row: three teasers

**Format:** `find-your-row` (rank 2 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P7**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews, then again in the round-2 **hook pass**, which replaced all three hooks; see the [Review log](#review-log))
**Specs:**
- [`studio/specs/02a-live-sheet-3-a-day-by-age.json`](../../studio/specs/02a-live-sheet-3-a-day-by-age.json)
- [`studio/specs/02b-scoreboard-trillion-at-your-wage.json`](../../studio/specs/02b-scoreboard-trillion-at-your-wage.json)
- [`studio/specs/02c-clean-sheet-salary-per-hour.json`](../../studio/specs/02c-clean-sheet-salary-per-hour.json)

(The spec ids and file names are kept from the earlier rounds so the slate index and renders stay linked; the titles and hooks below are the hook-pass versions.)

**Maths check:** [`checks/02-find-your-row.py`](checks/02-find-your-row.py). It recomputes every on-screen number from its inputs (including the 2026 federal tax and FICA behind 02c), rebuilds every display string and VO line from those numbers, then compares them with the three specs. It also checks:
- timing: every VO line must fit **both** 2.6 words/s (hyphenated numbers as one word) **and** 2.8 words/s (hyphenated numbers split, so "twenty-five" is two words); no overlaps; each pointer lands when its VO line starts and after its row has landed; the verdict and its ding land when the VO says it;
- the contract shape and the hook rules;
- that this write-up quotes every VO line, verdict, footer, formula and platform title exactly as the specs carry them.

Result: **PASSED: all 170 checks** (after the hook pass). A mutation test (one row changed, one VO line shortened) fails with exit 1 (see the Review log).

**Studio linter:** `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 0 warnings** (after the hook pass). Stills were rendered at 0.0, 1.5 and 3.0 s and at the verdict of each teaser and inspected: each header and its first number read in frame 1.

**Web searches used:** 9 in the first draft; 2 more in the first revision (2026 tax brackets; 2026 Social Security wage base); none in the hook pass (every new number is arithmetic on figures already sourced here).

---

## (a) The format in 5 lines

1. **What it is.** One header plus a table with one row for each kind of viewer (age, wage, salary). The table is denser than anyone can read in one pass, the viewer's job is to find their own row, and it runs 6-16 s and loops.
2. **Breakouts:**
   - Gage Heward, "What $1 costs you by age": **1,150,974 plays (210x his median)**, 14 s, no voice, 48 rows. https://www.instagram.com/reel/Da_dukjxB56/
   - FinCalC TV's 16-row 6 s cards: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate", **428,862 (54.46x)**, https://www.youtube.com/shorts/K2QbxGXa29k, and "Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate", **264,377 (51.68x)**, https://www.youtube.com/shorts/0Gc_IRi9RbU
3. **It is replicated beyond those two.** Yannick's "⚡️ 3 PAYCHECK RULES ⚡️" did 142,827 (7.9x med), https://www.instagram.com/reel/DeDdp-IRg5E/. FinCalC's "Rs. 5000 SIP Returns … 5 Years to 30 Years" did 137,201 (7.26x). Jake's "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN" did 64,190. The Market Hustle's "You've got 93 days left in 2026." did 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. Five benchmark accounts run it, and three of them are faceless.
4. **What kills it.** A voice walking the rows: Gage's talked tables get 1,456-6,616, and Master Money's talked-through "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)" got **11,745** in 58 s (https://www.instagram.com/reel/DeH6RvuJNXi/). Cutting it to 5-6 rows, and goal-first titles, also hurt. All three teasers below keep the VO to 3 short lines (23-29 words) and let the table do the work.
5. **What it buys.** Reach, not community. Like rates run 0.11-0.70% (FinCalC 0.15% and 0.11%, Gage 0.70%), and FinCalC's keyword CTAs drew 8 and 4 comments on 428,862 and 264,377 views. So: no keyword CTA, a cover that shows the completed table (Gage's one A/B: 4,348 vs 2,844, n = 1), and a pinned comment that invites an argument about the inputs.

**Hook grammar we are stealing (P7):** "What $[tiny amount] costs you by [age / wage]", or "[payout noun] … at [rate]". A payout or cost noun matters: FinCalC's payout-first titles have a median of 100,740 (n=11), against 12,314 for its goal-first titles. The hook pass adds two levers on top of it: **the wrong answer the viewer already holds, shown beside the right one** (The Market Hustle's red-beside-cyan, hook bank §4.5 rewrite B), and **re-pricing in a unit the viewer owns** (HD Guy's P8: here a whole career's pay, and the clock on a workday).

---

## (b) The three teasers at a glance

| | 02a | 02b | 02c |
|---|---|---|---|
| Look | Live Sheet | Scoreboard | Clean Sheet |
| Platform title | "It's Just $3 a Day": What It Costs You by 65, by Age | How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay | What Time Your 9-to-5 Starts Paying You, by Salary |
| On-screen header (t = 0) | "It's just **$3 a day**." / What it costs you by 65: | ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN… | What time your 9-to-5 / starts paying **you**, by salary |
| Words in hook | 11 | 11 | 9 |
| Rows × columns | 10 × 3 (age, what you think it costs (red), what it really costs) | 13 × 3 (wage, 40 years of your pay, his plan earns it in) | 12 × 3 (salary, tax + FICA min a day, paying you from) |
| Runtime | 13.4 s | 14.0 s | 13.0 s |
| VO words (as the check counts them) | 29 | 29 | 23 |
| First number on screen | 18 · $51,465 (red) · ≈ $400,000 | $7.25/hr · $603,200 · ≈ 3.2 min | $200,000 · ≈ 123 min · ≈ 11:03 am |
| First spoken payoff | "≈ $400,000" at about 2.7 s | "≈ 3 minutes" at about 1.9 s | "≈ 10:18" at about 3.1 s |
| Verdict | 10 years younger: it costs **more than double**. | Even **$100/hr** for 40 years: ≈ 44 minutes of his. | $100,000: you work for tax till **≈ 10:40**, every workday. |
| Hook score (two judges' average, hook pass: old hook → adopted) | 6.75 → 7.5 | 5.25 → 7.75 | 5.5 → 7.5 |

---

## 02a · Live Sheet · "It's just $3 a day": what it costs you by 65

**Spec:** `studio/specs/02a-live-sheet-3-a-day-by-age.json` · **13.4 s** · captions on

**Platform title:** "It's Just $3 a Day": What It Costs You by 65, by Age
**On-screen hook (header):** "It's just **$3 a day**." / What it costs you by 65:

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 plays (210x med), https://www.instagram.com/reel/Da_dukjxB56/. The table grammar: one row per age, the biggest number first ($88.20 for him, ≈ $400,000 here), and the table types itself in.
2. **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. One word ("ACTUALLY") tells the viewer the number they hold is wrong. Here the header quotes that number as the viewer's own excuse ("It's just $3 a day."), and the table answers it.
3. **H71, The Market Hustle, "How Long It Took To / Recover After the / Worst Crashes:"**: 190,187 (4.5x med), https://www.instagram.com/reel/DduW3hgShyh/. The wrong number in red ("25 YEARS") beside the right one ("~6.7 YEARS") at 0.0 s. This is the hook bank's §4.5 rewrite B (the wrong answer in red, the right one beside it) applied to the by-age table: the spend column is relabelled "What you think it costs" and its numbers are red.
4. **H55, Yannick, "Do all 5 and watch your finance change" + "They Should've Taught This in School"**: 115,845 (67.1x), https://www.instagram.com/reel/DbMUONdvGcr/. An identity or grievance line as the hook; ours is the excuse the viewer already says.
5. **H45, @investment_timeline, "POV: You invested in Monster instead of paying $3/day for a Monster Energy"**: 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. $3 a day is a habit-sized amount the audience already pays.
- **Contrast we design against: H89, Master Money, "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)"**: 11,745, 58 s, talked on camera. Same idea, killed by length and talking. Ours is 13.4 s with 29 spoken words, and the music-only cut is the A version (see the platform notes).
- **Rejected in the hook pass** (scores in the Review log): a "$1 you spend" version (a near-copy of H64's title, and template remakes underperform: H83, Jake's own remake, 14,232, 0.29x med); a POV header (P6's power is the same-brand irony, and a generic $3 has no brand); a $3 / $5 / $10 grid (three inputs in the hook line break R2).

**Rules satisfied:**
- **R1:** "$3" in the header plus row 1 ("18 · $51,465 · ≈ $400,000", the $51,465 in red) are on screen at 0.0 s.
- **R2:** one input ($3 a day). The header ends on a colon, not a result.
- **R3:** one row per age, 18-60. The $3 is fixed, so the pinned comment gives the scaling rule (double it for $6, and so on: every cell is linear in the daily amount).
- **R4:** $3 is small, round and habitual.
- **R5, now visible in frame 1:** the header quotes the belief ("It's just $3 a day."); the middle column is labelled "What you think it costs" and its numbers are red; the green, emphasised column beside it is "What it really costs you". In the first 1.5 s the four rows that land show the real cost at 7.8×, 7.0×, 5.5× and 4.3× the red number (ages 18, 20, 25, 30; checked).
- **R6:** you + $3 a day + by 65, now all in the header (before the hook pass the horizon was only in the column labels).
- **R7:** each row is a named age, so the viewer picks theirs.
- **R8:** 11 words.
- **R9:** 10 countable rows.
- **R10:** the biggest number is first on screen at 0.0 s and spoken first: "Just $3 a day? At 18: ≈ $400,000." reaches "≈ $400,000" at about 2.7 s.
- **R11:** the caption carries the verdict.
- **R12:** "10 years younger: it costs more than double" is one direction, one number, and true for every whole age from 18 to 54 (asserted in the check).

**The wrong beliefs it plays on:**
1. "It's just $3 a day. At most it costs me $3 × the days." That is the red column; the green one beside it is 5.5× it at 25 and 7.8× it at 18.
2. "Ten years of age doesn't change much." Every 10 years younger, the same $3 a day costs you **more than double**: true for every whole age 18-54 (FV(age) ÷ FV(age + 10) runs from 2.09 at 18 to 15.98 at 54; checked).

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header '"It's just **$3 a day**." / What it costs you by 65:'. Formula bar typing "= $3 × 365 ÷ 12 = $91.25 a month" (one line). Columns "Your age" · "What you think it costs" (numbers in red) · "What it really costs you" (emphasised, green). All 10 age keys in place; row 1 "18 · $51,465 · ≈ $400,000" filled. Footer "At 7% a year until 65 · no tax, fees, inflation" (one line, clear of the caption band). | "Just $3 a day? At 18: **≈ $400,000**." |
| 0.5-4.5 | Rows 20 → 60 land, one every 0.5 s, biggest first: each a red number beside a bigger green one (20, 25 and 30 by 1.5 s) | (line 1 continues to 4.7; "≈ $400,000" at about 2.7 s) |
| 4.9 | Pointer to row "25 · $43,800 · ≈ $240,000", tooltip "≈ 5.5× what you think" | "At 25: **≈ $240,000**." |
| 8.4 | Pointer to row "35 · $32,850 · ≈ $111,000", tooltip "At 25: ≈ 2.2× this" | "10 years younger? It costs you **more than double**." |
| 10.7 | Verdict card "10 years younger: it costs **more than double**." in the caption band + ding; the result column flashes top to bottom | (inside line 3: "more than double") |
| 10.7-13.4 | The full table holds; the last 0.5 s clears the rows back to the frame-1 state for the loop | (none) |

### Guide VO script (29 spoken words, about 11.2 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.7 | Just $3 a day? At 18: **≈ $400,000**. | "Just three dollars a day? At eighteen: about four hundred thousand dollars." |
| 4.9 | 3.3 | At 25: **≈ $240,000**. | "At twenty-five: about two hundred forty thousand dollars." |
| 8.4 | 3.5 | 10 years younger? It costs you **more than double**. | "Ten years younger? It costs you more than double." |

Each `d` covers the read at 2.6 words/s with hyphenated numbers as one word, and at 2.8 words/s with them split (4.62 / 4.29 s; 3.08 / 3.21 s; 3.46 / 3.21 s).

### The maths

Inputs: $3 a day; 365 days; 7% a year, compounded monthly (7% ÷ 12 each month, an effective 7.23% a year); deposits at the end of each month; stopping at 65.
- $3 × 365 = **$1,095** a year; ÷ 12 = **$91.25** a month (formula bar).
- **What you think it costs** (red) = $1,095 × (65 − age): the $3 a day handed over until 65. This is exact, so it carries no "≈".
- **What it really costs you** = FV = $91.25 × ((1 + 0.07/12)^n − 1) ÷ (0.07/12), with n = (65 − age) × 12 months: what the same $3 a day would have grown to. It is rounded to the nearest $1,000, or to the nearest $100 below $10,000.

| Age | Red: $1,095 × yrs | Months | FV exact | On screen | Real ÷ red |
|---:|---:|---:|---:|---:|---:|
| 18 | $51,465 (47 yrs) | 564 | $400,261.67 | ≈ $400,000 | 7.78 |
| 20 | $49,275 (45) | 540 | $346,074.26 | ≈ $346,000 | 7.02 |
| 25 | $43,800 (40) | 480 | $239,514.22 | ≈ $240,000 | 5.47 |
| 30 | $38,325 (35) | 420 | $164,346.23 | ≈ $164,000 | 4.29 |
| 35 | $32,850 (30) | 360 | $111,322.35 | ≈ $111,000 | 3.39 |
| 40 | $27,375 (25) | 300 | $73,919.04 | ≈ $74,000 | 2.70 |
| 45 | $21,900 (20) | 240 | $47,534.56 | ≈ $48,000 | 2.17 |
| 50 | $16,425 (15) | 180 | $28,922.81 | ≈ $29,000 | 1.76 |
| 55 | $10,950 (10) | 120 | $15,793.99 | ≈ $16,000 | 1.44 |
| 60 | $5,475 (5) | 60 | $6,532.85 | ≈ $6,500 | 1.19 |

- **Pointer "≈ 5.5× what you think":** $239,514.22 ÷ $43,800 = 5.468, shown as ≈ 5.5.
- **Pointer "At 25: ≈ 2.2× this"** (on the 35 row): $239,514.22 ÷ $111,322.35 = 2.152, shown as ≈ 2.2.
- **Verdict "10 years younger: it costs more than double":** FV(age) ÷ FV(age + 10) is above 2 for **every** whole age from 18 to 54 (minimum 2.092 at 18, maximum 15.98 at 54; asserted in the check). In the table's own 10-year pairs: 20 → 30 = 2.11, 25 → 35 = 2.15, 30 → 40 = 2.22, 35 → 45 = 2.34, 40 → 50 = 2.56, 45 → 55 = 3.01, 50 → 60 = 4.43.
- **Why it is more than double** (pinned comment): at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years; a lump sum at 7% ÷ 12 grows ×2.01 in 120 months), and starting 10 years younger also adds 10 years of $3 deposits. The two together push the ratio above 2.
- **Pinned comment, at 10% instead:** age 25 → ≈ $577,000; age 18 → ≈ $1,170,000. This matches the hook bank's 10% table.

### Sources

**No real-world inputs.** $3 a day is a hypothetical amount and 7% a year is a stated assumption, not a forecast and not a market figure, and the footer says so. That is deliberate: the hook bank found the comments argue about the rate (Gage: "10% vs 7% vs 8%"), so the rate is printed on screen and the pinned comment invites that argument.

### Assumptions (footer, on screen at t = 0)

> At 7% a year until 65 · no tax, fees, inflation

### Caption / description

> "It's just $3 a day." Find your age. Red is what you'd hand over by 65; green is what that $3 a day really costs you, if you'd invested it at 7% a year instead of spending it. Every 10 years younger, it costs you more than double.
> ($3 × 365 ÷ 12 = $91.25 a month, at 7% ÷ 12 each month; no tax, fees or inflation. Maths, not advice.)

### Pinned comment

> Why 7%? It's a round, middle-of-the-road rate, not a prediction (7% ÷ 12 each month, about 7.23% a year effective). At 10% the 25 row becomes ≈ $577,000 and the 18 row ≈ $1,170,000. Rule of thumb: at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and starting 10 years younger also adds 10 years of deposits, so each decade younger costs you more than double. Spend $6 a day? Double your row. What rate would you plug in?

### Per-platform notes

- **Instagram Reels (A version: music only).**
  - Gage's 1.15M version had no voice and a pop track. Post this cut first with in-app trending audio, captions off, and the header and table carrying everything (the red column makes the "you think / it really costs" contrast without a voice).
  - Caption line 1: '"It's just $3 a day." Find your age.'
  - Cover: the completed table.
- **TikTok.**
  - The VO cut (B version) with captions on, which keeps the guide VO. "Just $3 a day?" is the viewer's own excuse read back to them.
  - Caption line 1 states the verdict.
  - No "Comment X" CTA. FinCalC's drew 8 comments on 428,862 views.
- **YouTube Shorts.**
  - Title = the hook. The VO cut works here: FinCalC's 3.77M short had a spoken first line.
  - Make sure the loop resets to the frame-1 state.
  - Expect a like rate around 0.2%: this is a reach format.

---

## 02b · Scoreboard · "How fast Elon's $1 trillion pay plan earns your whole career's pay"

**Spec:** `studio/specs/02b-scoreboard-trillion-at-your-wage.json` · **14.0 s** · captions on

**Platform title:** How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay
**On-screen hook (header):** ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw. A huge sum re-priced in a unit the viewer knows; here the unit is the viewer's own 40-year career pay.
   - The title states the rule and never the result.
   - The assumptions sit in the footer ("Price of RTX 5090 32GB: ~$4,899"); ours is "Plan's max, if every target is hit, ÷ 10 years, 24/7 · you: 40 years × 2,080 hrs".
   - Scoreboard is HD Guy's look family.
2. **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**: 28,289,823 (110.85x), https://www.youtube.com/shorts/2DtXV2uxM_E. A per-second rate as the spectacle: the plan's ≈ $3,169 a second is the working in the strip.
3. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). A row for every viewer: 13 wage rows, each with its own career pay and its own answer.
4. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206, the best of his wage reels, https://www.instagram.com/reel/Dd2QzRzRrGT/. The hourly wage works as the filter that pulls the viewer in, never as the goal.
- **Contrasts:**
  - HD Guy's "Wages Visualized In Real Time" got **9,025**. The wage as a running counter flopped, so here the wage stays a row and the plan is the clock.
  - The round-2 version ("Start ≈ 66.3 million years ago") re-priced the trillion in years nobody can feel, and most viewers already guess "never" (both judges: 5 and 5.5). The output is now minutes, and the stake is the viewer's own career.
  - 04-formats §4.1 dropped the "Rate Clock" (a mega-sum ÷ a human rate = a time). This is still a ratio of a mega-sum and a wage, but turned round: the viewer's career is the amount, the plan is the clock, and the answer is a few minutes.
- **Rejected in the hook pass** (scores in the Review log): "1 second of the plan at your wage" (7.25, a close second: the output is your work weeks, but the sum is still someone else's); "split with every US full-time worker" (the share is the same on every row, so the find-your-row loop closes at once); a question header over the old table (the topic and the years output stay).

**Rules satisfied:**
- **R1:** "$1 TRILLION" in the header plus row 1 "$7.25/hr · $603,200 · ≈ 3.2 min" at 0.0 s, with the strip "= wage × 2,080 × 40 ÷ ≈ $3,169 a second".
- **R2:** one input in the hook ($1 trillion). The header ends on an open "IN…": no result.
- **R3:** 13 wage rows from the federal minimum to $1,000/hr.
- **R4:** the career pay is the viewer's own number (exact: $603,200 at the federal minimum); the trillion is a named, argued-about object (Elon's pay plan), which the footer qualifies as the plan's maximum.
- **R5:** the belief "a whole working life is a lot of money". At the federal minimum, the plan's average earns it in ≈ 3 minutes; even $100/hr for 40 years, in ≈ 44 minutes.
- **R6:** you + your whole career's pay (an amount on every row) + 40 years.
- **R7:** each row is a named wage.
- **R8:** 11 words.
- **R9:** 13 countable rows under a header that ends on "IN…".
- **R10:** row 1 is on screen at 0.0 s and the first spoken payoff ("≈ 3 minutes") lands at about 1.9 s.
- **R11:** the caption carries the verdict.
- **R12:** a single repeatable line: "$100/hr for 40 years: ≈ 44 minutes of his".

**The wrong belief it plays on:** "40 years of work adds up to a fortune." At $20 an hour it is $1,664,000, and the plan's average earns that in under 9 minutes; even $1,000 an hour for 40 years ($83,200,000) takes it ≈ 7.3 hours.

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…". Footer on 2 lines: "Plan's max, if every target is hit, ÷ 10 years, 24/7 / you: 40 years × 2,080 hrs". Columns "Your wage" · "40 years of your pay" · "His plan earns it in" (emphasised). All 13 wage keys in place; row 1 "$7.25/hr · $603,200 · ≈ 3.2 min" lit. Strip: "= wage × 2,080 × 40 ÷ ≈ $3,169 a second". | "40 years at minimum wage? **≈ 3 minutes** of his." |
| 0.35-4.2 | Rows $10/hr → $1,000/hr land, one every 0.35 s ($20/hr · $1,664,000 · ≈ 8.8 min at 1.05 s) | (line 1 continues to 3.9; "≈ 3 minutes" at about 1.9 s) |
| 4.2 | Pointer to row "$20/hr · $1,664,000 · ≈ 8.8 min"; strip label "$1,664,000 in under 9 min" | "$20 an hour? Under 9 minutes." |
| 7.2 | Pointer to row "$100/hr · $8,320,000 · ≈ 43.8 min"; label "$8,320,000 in ≈ 44 min" | "Even **$100 an hour**, for 40 years? ≈ 44 minutes." |
| 10.7 | Verdict "Even **$100/hr** for 40 years: ≈ 44 minutes of his." slams into the strip + ding | (inside line 3: "≈ 44 minutes") |
| 10.7-14.0 | Hold, then a hard cut back to frame 1 for the loop | (none) |

### Guide VO script (29 spoken words, about 11.2 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 3.9 | 40 years at minimum wage? **≈ 3 minutes** of his. | "Forty years at minimum wage? About three minutes of his." |
| 4.2 | 2.7 | $20 an hour? Under 9 minutes. | "Twenty dollars an hour? Under nine minutes." |
| 7.2 | 4.7 | Even **$100 an hour**, for 40 years? ≈ 44 minutes. | "Even a hundred dollars an hour, for forty years? About forty-four minutes." |

Fit at 2.6 / 2.8 words/s: 3.85 / 3.57 s; 2.69 / 2.50 s; 4.62 / 4.64 s.

### The maths

- **The plan's clock:** 10 years × 365.25 days × 24 hrs × 3,600 s = **315,576,000 s**. $1,000,000,000,000 ÷ 315,576,000 = **$3,168.81 a second**, shown as "≈ $3,169 a second" (about $11.4 million an hour). This is the plan's maximum, if every target is hit, spread evenly over the decade, day and night.
- **40 years of your pay** = wage × 2,080 hrs × 40 years = wage × 83,200. Whole dollars, so exact (no "≈"). Both sides are before tax.
- **His plan earns it in** = your career pay ÷ $3,168.81 a second. Shown in minutes to 0.1 under an hour, otherwise in hours to 0.1, always with "≈".

| Wage | 40 years of your pay | Seconds | Exact | On screen |
|---:|---:|---:|---:|---:|
| $7.25 | $603,200 | 190.4 | 3.173 min | ≈ 3.2 min |
| $10 | $832,000 | 262.6 | 4.376 min | ≈ 4.4 min |
| $15 | $1,248,000 | 393.8 | 6.564 min | ≈ 6.6 min |
| $20 | $1,664,000 | 525.1 | 8.752 min | ≈ 8.8 min |
| $25 | $2,080,000 | 656.4 | 10.940 min | ≈ 10.9 min |
| $30 | $2,496,000 | 787.7 | 13.128 min | ≈ 13.1 min |
| $40 | $3,328,000 | 1,050.2 | 17.504 min | ≈ 17.5 min |
| $50 | $4,160,000 | 1,312.8 | 21.880 min | ≈ 21.9 min |
| $75 | $6,240,000 | 1,969.2 | 32.820 min | ≈ 32.8 min |
| $100 | $8,320,000 | 2,625.6 | 43.760 min | ≈ 43.8 min |
| $250 | $20,800,000 | 6,564.0 | 1.823 hrs | ≈ 1.8 hrs |
| $500 | $41,600,000 | 13,128.0 | 3.647 hrs | ≈ 3.6 hrs |
| $1,000 | $83,200,000 | 26,255.9 | 7.293 hrs | ≈ 7.3 hrs |

- **VO "≈ 3 minutes":** 3.173 min. **"Under 9 minutes":** 8.752 min. **"≈ 44 minutes"** (VO, pointer and verdict): 43.760 min.
- **Pointers:** "$1,664,000 in under 9 min" ($20/hr row) and "$8,320,000 in ≈ 44 min" ($100/hr row) repeat the row's own exact career pay.

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **Federal minimum wage $7.25/hr**, in force since 2009-07-24 and still current in 2026 | US Department of Labor, news release "Federal minimum wage increases to $7.25 on July 24", 2009-07-16, https://www.dol.gov/newsroom/releases/esa/esa20090716; DOL Wage and Hour Division, "Minimum Wage", https://www.dol.gov/agencies/whd/minimum-wage | US Bureau of Labor Statistics, CPS annual table 44 (2025 annual averages, published 2026): "The prevailing Federal minimum wage was $7.25 per hour in 2025", https://www.bls.gov/cps/cpsaat44.htm. For 2026: Paycor, "Minimum Wages by State: A Complete Guide for 2026", https://www.paycor.com/resource-center/minimum-wage-by-state |
| **Header and footer: Tesla pay plan for Elon Musk worth up to $1 trillion if every target is hit, "over the next decade"** (the footer's "÷ 10 years"), approved by shareholders on 2025-11-06 with over 75% support | Reuters via Business Standard, 2025-11-07, https://www.business-standard.com/world-news/elon-musk-tesla-pay-package-worth-1-trillion-shareholders-approve-125110700092_1.html ("could get as much as $1 trillion in stock over the next decade") | Anadolu Agency, "Tesla shareholders approve Elon Musk's compensation package", https://www.aa.com.tr/en/economy/tesla-shareholders-approve-elon-musks-compensation-package/3737245; Malay Mail, 2025-11-07, https://malaymail.com/news/money/2025/11/07/worlds-most-expensive-participation-trophy-tesla-investors-hand-musk-a-potential-us1t-to-keep-him-at-the-helm/197433 |

**Verification note:** the egress proxy blocks dol.gov, so that page could not be opened; the figure was confirmed from the search-result text of the named page plus independent publishers. The $1 trillion is the plan's reported maximum in stock, not a cash payment, and it pays out only as targets are hit; "≈ $3,169 a second" is that maximum averaged evenly over 10 years. The footer and the pinned comment both say so. The dinosaur and *Homo sapiens* anchors of the round-2 version (and their sources) are gone with the old output.

### Assumptions (footer, on screen at t = 0)

> Plan's max, if every target is hit, ÷ 10 years, 24/7 · you: 40 years × 2,080 hrs

### Caption / description

> Find your wage: that's how long Elon's pay plan takes to earn your whole 40-year career's pay (its $1 trillion max, spread evenly over 10 years, day and night: ≈ $3,169 a second).
> (Your career: wage × 2,080 hrs a year × 40 years, before tax.)
> Why a trillion? In Nov 2025, Tesla shareholders approved a pay plan that could give Elon Musk up to $1 trillion in Tesla stock over the next decade, if every target is hit.

### Pinned comment

> It's Tesla stock, paid in tranches only if targets are hit, so ≈ $3,169 a second is the plan's $1 trillion maximum averaged over 10 years (315,576,000 seconds): about $11.4 million an hour. Your 40-year career is 83,200 hours. Which row is yours?

### Per-platform notes

- **YouTube Shorts.** This is HD Guy's home (Scoreboard look).
  - Title = the hook, with no number in the result slot (the header ends on "IN…").
  - Music-only plus the on-screen pointer labels works, the way HD Guy runs on no voice. The VO cut is optional.
  - No end card; hard-cut back to frame 1.
- **TikTok.**
  - The VO cut: "40 years at minimum wage? ≈ 3 minutes of his." is a payoff spoken inside 2 s.
  - The Musk context line stays in the caption; on screen, the plan is named in the header and qualified in the footer.
- **Instagram Reels.**
  - Caption line 1: "Find your wage."
  - Cover: the completed table, with the $100/hr row lit.

---

## 02c · Clean Sheet · "What time your 9-to-5 starts paying you, by salary"

**Spec:** `studio/specs/02c-clean-sheet-salary-per-hour.json` · **13.0 s** · captions on

**Platform title:** What Time Your 9-to-5 Starts Paying You, by Salary
**On-screen hook (header):** What time your 9-to-5 / starts paying **you**, by salary

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 (62.49x). P8's move, re-pricing verified maths in a unit everyone owns. The unit here is the clock on your own workday: the tax share of your pay becomes the time each morning when your 9-to-5 starts paying you.
2. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). The "What … by [your attribute]" frame, every key on screen at frame 1, the self-typing table, and the caption task ("Find your salary").
3. **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. The payout frame: the header names what reaches **you**, not what you pay. The hook bank found tax-first titles are FinCalC's weakest (median 20,748 against 100,740 for payout-first, §4.4).
4. **H73, The Market Hustle, "You've got 93 days left in 2026."**: 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. Time as the stake.
5. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x). A dense tier table with the working under the table.
- **The logic is Tax Freedom Day's** (the Tax Foundation's yearly date by which the nation has earned enough to pay its taxes), applied to one person and one workday: your tax share of the year, read as the same share of each 8-hour day.
- **Contrast inside our own slate:** 01c already does $60,000 ÷ 2,080 = $28.85 an hour and a commute-adjusted "real hour"; 01b and 08b use the same 2026 tax + FICA model (asserted in the check). None of them turns tax into clock time.
- **Rejected in the hook pass** (scores in the Review log): "never reaches you" per hour (a payoff by 1.2 s, but ≈ $5 of every hour is a small first number); "Six figures ≈ $48 an hour?" (two numbers in the hook line, and it speaks to six-figure earners only); "your bracket is not your tax rate" (percents, and a well-worn explainer).

**Rules satisfied:**
- **R1:** row 1 "$200,000 · ≈ 123 min · ≈ 11:03 am" at 0.0 s, with every salary key on screen and "9-to-5" in the header.
- **R2:** no input amount in the hook; the viewer brings their salary.
- **R3:** 12 salary rows, $30,000-$200,000.
- **R4:** round, familiar salaries, and a workday every viewer owns.
- **R5:** the belief "my workday pays me from 9 am". Every row's clock is later: from ≈ 9:59 am at $30,000 to ≈ 11:03 am at $200,000.
- **R6:** the stake is every workday, all year: ≈ 78 minutes a day at $65,000, ≈ 1 hr 40 min at $100,000.
- **R7:** each row is a named salary; the spoken opener is the first calculation.
- **R8:** 9 words.
- **R9:** 12 countable rows.
- **R10:** the biggest bite is first ($200,000: ≈ 11:03 am at 0.0 s); the first spoken payoff ("≈ 10:18") lands at about 3.1 s (the round-2 version spoke its payoff at about 5.7 s).
- **R11:** the caption carries the verdict.
- **R12:** "$100,000: you work for tax till ≈ 10:40, every workday." The comment line it invites: "I work for tax till 10:18."

**The wrong beliefs it plays on:**
1. "My day pays me from 9 am." On average, 2026 federal tax + FICA take 16.3% of a $65,000 salary, which is ≈ 78 minutes of every 8-hour day: your day starts paying you at ≈ 10:18.
2. "Tax takes the same share whatever you earn." The tax share rises row by row, from 12.4% at $30,000 to 25.5% at $200,000 (checked for every row), so the clock moves later as pay rises.

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "What time your 9-to-5 / starts paying **you**, by salary". Footer "Single · 2026 federal tax + FICA · no state tax". Columns "Salary" · "Tax + FICA, min a day" · "Paying you from" (emphasised, green highlighter). All 12 salary keys in place; row 1 "$200,000 · ≈ 123 min · ≈ 11:03 am" filled. Footnote under the table "= 9:00 am + 480 min × (tax + FICA) ÷ salary" (two lines). | "$65,000? You work for tax till **≈ 10:18**." |
| 0.2-2.2 | Rows $150,000 → $30,000 type in, one every 0.2 s ($65,000 · ≈ 78 min · ≈ 10:18 am at 1.2 s) | (line 1 continues to 4.3; "≈ 10:18" at about 3.1 s) |
| 4.5 | Yellow highlighter on "$65,000 · ≈ 78 min · ≈ 10:18 am"; legend "[$65,000] ≈ US median full-time pay" | "That's ≈ 78 minutes, every workday." |
| 7.4 | Highlighter moves to "$100,000 · ≈ 100 min · ≈ 10:40 am"; legend "[$100,000] ≈ 1 hr 40 min, every workday" | "Six figures? Until **≈ 10:40**." |
| 8.6 | Verdict "$100,000: you work for tax till **≈ 10:40**, every workday." + ding | (inside line 3: "≈ 10:40") |
| 8.6-13.0 | The finished sheet holds (over 4 s: the screenshot), then the values clear back to frame 1 for the loop | (none) |

### Guide VO script (23 spoken words as the check counts them, about 8.8 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | $65,000? You work for tax till **≈ 10:18**. | "Sixty-five thousand? You work for tax till about ten eighteen." |
| 4.5 | 2.6 | That's ≈ 78 minutes, every workday. | "That's about seventy-eight minutes, every workday." |
| 7.4 | 2.4 | Six figures? Until **≈ 10:40**. | "Six figures? Until about ten forty." |

Fit at 2.6 / 2.8 words/s (the check also counts a spoken "dollars" after every $ figure and reads a clock time as two numbers, so it is stricter than the read): 4.23 / 4.29 s; 2.31 / 2.50 s; 2.31 / 2.14 s.

### The maths

For each salary S (2026, single filer, standard deduction, wages only, no state or local tax):
- **Federal income tax** on S − $16,100: 10% to $12,400; 12% to $50,400; 22% to $105,700; 24% to $201,775.
- **FICA** = 6.2% Social Security on wages up to $184,500 + 1.45% Medicare on all wages (the extra 0.9% Medicare starts above $200,000, so no row reaches it).
- **Tax + FICA, min a day** = 480 min × (tax + FICA) ÷ S. A 9-to-5 is 8 hours = 480 minutes, and 8 hours × 260 workdays = the 2,080 hours a year the rest of the slate uses. Rounded to the minute, with "≈".
- **Paying you from** = 9:00 am + those minutes (from the exact minutes, to the minute, with "≈").
- **It is an average.** Tax is withheld from every paycheck, not taken in the first hour of each morning; the clock is your tax share of the year read as the same share of each workday (the Tax Freedom Day idea). The pinned comment says so.

| Salary | Federal tax | FICA | Tax + FICA (share) | × 480 min, exact | Min a day | Paying you from |
|---:|---:|---:|---:|---:|---:|---:|
| $200,000 | $36,734.00 | $14,339.00 | $51,073.00 (25.54%) | 122.58 | ≈ 123 min | ≈ 11:03 am |
| $150,000 | $24,734.00 | $11,475.00 | $36,209.00 (24.14%) | 115.87 | ≈ 116 min | ≈ 10:56 am |
| $100,000 | $13,170.00 | $7,650.00 | $20,820.00 (20.82%) | 99.94 | ≈ 100 min | ≈ 10:40 am |
| $90,000 | $10,970.00 | $6,885.00 | $17,855.00 (19.84%) | 95.23 | ≈ 95 min | ≈ 10:35 am |
| $80,000 | $8,770.00 | $6,120.00 | $14,890.00 (18.61%) | 89.34 | ≈ 89 min | ≈ 10:29 am |
| $70,000 | $6,570.00 | $5,355.00 | $11,925.00 (17.04%) | 81.77 | ≈ 82 min | ≈ 10:22 am |
| $65,000 | $5,620.00 | $4,972.50 | $10,592.50 (16.30%) | 78.22 | ≈ 78 min | ≈ 10:18 am |
| $60,000 | $5,020.00 | $4,590.00 | $9,610.00 (16.02%) | 76.88 | ≈ 77 min | ≈ 10:17 am |
| $50,000 | $3,820.00 | $3,825.00 | $7,645.00 (15.29%) | 73.39 | ≈ 73 min | ≈ 10:13 am |
| $40,000 | $2,620.00 | $3,060.00 | $5,680.00 (14.20%) | 68.16 | ≈ 68 min | ≈ 10:08 am |
| $35,000 | $2,020.00 | $2,677.50 | $4,697.50 (13.42%) | 64.42 | ≈ 64 min | ≈ 10:04 am |
| $30,000 | $1,420.00 | $2,295.00 | $3,715.00 (12.38%) | 59.44 | ≈ 59 min | ≈ 9:59 am |

Worked example, $65,000: taxable $48,900; tax = $1,240 + 12% × $36,500 ($4,380) = $5,620; FICA = 7.65% × $65,000 = $4,972.50; together $10,592.50 = 16.30% of pay; × 480 min = 78.22 min; 9:00 am + 78 min = **10:18 am**.

- **VO "You work for tax till ≈ 10:18"** and **"That's ≈ 78 minutes, every workday"**: the $65,000 row (78.22 min).
- **VO "Six figures? Until ≈ 10:40"** and the verdict: the $100,000 row (99.94 min → 100 min → 10:40 am).
- **Pointer "≈ US median full-time pay"** on the $65,000 row: BLS median weekly earnings of $1,251 × 52 = $65,052, which rounds to ≈ $65,000 (0.08% off; asserted to be under 1%).
- **Pointer "≈ 1 hr 40 min, every workday"** on the $100,000 row: 99.94 min → 100 min = 1 hr 40 min.
- **Spread:** 64 minutes from the $30,000 row to the $200,000 row. The rows sit close; the stake is that the same bite repeats every workday.
- **Cross-check with the rest of the slate** (same tax model, asserted in the check): $41,600 keeps 85.6%, which is 01b's "× 0.85"; $15/hr keeps $13.10 an hour, which is 08b's figure. The round-2 numbers still hold on this model: $65,000 ÷ 2,080 = $31.25 an hour, of which ≈ $26 is kept.

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **2026 standard deduction, single: $16,100**; 2026 single brackets: 10% to $12,400, 12% to $50,400, 22% to $105,700, 24% to $201,775 (32% above) | IRS, Rev. Proc. 2025-32, 2025-10-09, https://www.irs.gov/pub/irs-drop/rp-25-32.pdf; IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill", 2025-10-09, https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | CPA Practice Advisor, "IRS Adjusts Tax Brackets, Standard Deduction for 2026", 2025-10-09, https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/ ("22% for incomes over $50,400 … 24% for incomes over $105,700 … 32% for incomes over $201,775"; standard deduction $16,100) |
| **2026 FICA:** 6.2% Social Security on wages up to **$184,500**; 1.45% Medicare on all wages | SSA, "2026 Social Security Changes" fact sheet (October 2025), https://www.ssa.gov/cola/factsheets/2026.html | Journal of Accountancy, "Social Security wage base and COLA announced for 2026" (October 2025), https://www.journalofaccountancy.com/news/2025/oct/social-security-wage-base-and-cola-announced-for-2026/ ("up to $184,500 … 6.2% OASDI tax"; Medicare 1.45% "has no wage limit") |
| **Median usual weekly earnings, full-time wage and salary workers, Q2 2026: $1,251** (not seasonally adjusted; 120.9 million workers) | US Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", news release 2026-07-21, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm | DWM Magazine, "USBLS announces unemployment and wage rates", 2026-07-24, https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/. Consistency check: BLS TED, "Median weekly earnings were $1,196 in second quarter 2025", and $1,196 × 1.046 (the release's +4.6% a year) = $1,251.0 |

**Verification note:** irs.gov and bls.gov could not be opened through this session's proxy. The bracket thresholds, the standard deduction and the wage base were confirmed from search-result text of the named pages and independent publishers in the first revision (2 searches), and they match the figures 01b and 08b already use. The 0.9% Additional Medicare Tax (wages over $200,000, single) is statutory and not indexed; no row reaches it. The 9-to-5 (480 minutes) is a convention, not a sourced figure.

### Assumptions (footer, on screen at t = 0)

> Single · 2026 federal tax + FICA · no state tax

The 8-hour day is in the header ("9-to-5") and the footnote "= 9:00 am + 480 min × (tax + FICA) ÷ salary".

### Caption / description

> Find your salary. That's what time your 9-to-5 starts paying you: 2026 federal income tax + FICA take that share of your pay, which is that share of every 8-hour workday (single filer, standard deduction, no state tax). At $100,000, you work for tax till ≈ 10:40.
> The typical US full-time worker earns $1,251 a week (BLS, Q2 2026), about $65,000 a year: ≈ 10:18 am.

### Pinned comment

> It's an average, the same idea as Tax Freedom Day: tax comes out of every paycheck, not the first hour of each morning. FICA (Social Security + Medicare) is a payroll tax, so it's in. State income tax, 401(k) and health premiums would push your time later. What time does your day start paying you?

### Per-platform notes

- **Instagram Reels.**
  - This is Yannick's and Gage's platform. Post the music-only cut first, with captions off: the header and the clock column carry it.
  - Clean Sheet's white page shows up well in a dark feed.
  - Caption line 1: "Find your salary."
- **TikTok.**
  - The VO cut. "You work for tax till ≈ 10:18" on the median row is the line viewers will repeat about themselves.
  - Expect "FICA isn't income tax", state tax and married-filing comments. That is the argument we want; the footer states the basis and the pinned comment answers it.
- **YouTube Shorts.**
  - Title = the hook.
  - Keep the 4-second hold on the finished sheet: it is the screenshot.

---

## What changed from the seeds, and why

- **02a:**
  - The seed's 7% is kept (the hook bank's rewrite used 10%; 10% is in the pinned comment).
  - A **"You'd spend" column** sat beside the cost, so the answer the viewer already holds was on screen (R5). The hook pass relabels it "What you think it costs" and turns it red.
  - The verdict is cost-framed ("10 years younger: it costs more than double") and checked for every whole age 18-54.
- **02b:**
  - The **federal minimum wage** ($7.25) is the first row: a wage some viewers earn.
  - The hook bank's "$50,000/hr" row is dropped (nobody's wage, R4).
  - The trillion is named as **Elon's pay plan** (R4). Round 2 turned the result into a start date with dinosaur and species anchors; the hook pass replaces that output with the time the plan takes to earn **your whole career's pay** (minutes, not millions of years).
- **02c:**
  - Rebuilt in round 2 from "salary ÷ 2,080" (which 01c already does) into gross vs kept per hour, on the 2026 federal tax + FICA basis the rest of the slate uses.
  - The hook pass keeps that verified tax model and re-prices it as **the clock time your 9-to-5 starts paying you**.

## Open items

- **Linter:** all three kits mount and `node src/cli.mjs check` passes 02a, 02b and 02c with 0 errors and 0 warnings (2026-10-07, after the hook pass).
- **Slate overlap to decide (owner):** 02b now uses the same device as **10b** ("40 years of your pay vs 1 minute of new US debt", verdict "40 years of median pay: ≈ 33 seconds"): a whole working life set against a mega-rate clock. Both judges also flagged an echo of **10c** (Amazon's sales per second). 02b is a per-wage lookup table with a named person's plan; 10b is one median career against a national-debt counter. If only one should carry the device, 02b's runner-up ("1 second of the plan at your wage", 7.25) is ready in the Review log.
- **Kit-side note for the Live Sheet owner** (from the verifier, not fixed here because it is kit code): in `looks/live-sheet/formats/find-your-row.js`, once rows hit the minimum height with captions or the verdict band on, the sheet can overflow `bandBottom`. It should shrink rows or reserve the footer height above `G.workBottom`. 02a avoids it with a one-line formula and a one-line footer.
- **Kit behaviour that shaped 02a (hook pass):** the Live Sheet kit does not colour second emphasis (`__…__`) inside a column label (`.ls-hl u.mark2` has no colour rule), so the label "What you think it costs" reads in ink; the red comes from the column's documented `tone: "bad"`, which colours its numbers. The spec keeps the `__…__` markup, so a kit that colours it will show a red label too.
- **Kit behaviour that shaped 02b:** in the Scoreboard kit, a pick at 0.0 s replaces the formula strip for the whole short (tested in round 2), so 02b's first pointer lands at 4.2 s and the formula is on screen from 0.0 to 4.2 s. The 3-column × 13-row board is now tested (stills at 0.0, 1.5, 3.0 and 11.2 s): the labels take two lines, the 2-line footer breaks at its " · ", and nothing overlaps.
- **Kit behaviour that shaped 02c:** with captions on, the Clean Sheet kit drops the formula footnote and the pick legend at 14 rows (tested); at 12 rows with a one-line footer it shows both (the footnote takes two lines; stills at 0.0, 3.0 and 9.5 s).
- For the music-only A versions, render the same spec with `"captions": false` (no other change).

---

## Review log

Round-2 review of this format: one verifier pass (10 issues) and one hook-judge pass (3 scores, plus issues). The judge's issue list reached me cut off after its third item (02b); every issue that arrived is handled below.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 02a | must | Linter failed: the formula and footer wrapped to 2 lines and overprinted the caption band (10 overlap errors, 1 contrast warning); the 7% line was unreadable. | Applied the validated fix exactly: formula "= $3 × 365 ÷ 12 = $91.25 a month", footer "At 7% a year until 65 · no tax, fees, inflation". Linter: 0 errors, 0 warnings. Stills at 0.0, 5.2, 9.0 and 10.8 s show the footer on one line, clear of the captions and the verdict card. The kit-side root cause is passed on in Open items. |
| V2 | 02c | must | "Typical full-timer, $65,000: $31.25 an hour" stated the BLS median ($65,052; $31.275/hr) without "≈". | 02c was rebuilt (see J3). The VO now says only "**$65,000**? $31.25 an hour.", which is exact for the row. "Typical" appears only in the pointer label "≈ US median full-time pay", which carries the "≈". |
| V3 | 02a | should | "It costs you" column vs "Start at 35? Less than half." pointed opposite ways from the md and pinned comment. | Took the judge's cost-framed version instead of the verifier's invest-framed one, because it keeps the column, header and verdict on one frame: VO "10 years younger? It costs you **more than double**.", verdict "10 years younger: it costs **more than double**.", pointer on the 35 row "At 25: ≈ 2.2× this". No "less than half" remains anywhere. The check asserts FV(age) > 2 × FV(age + 10) for every whole age 18-54. |
| V4 | 02a | should | Pinned rule-of-72 reasoning did not follow (a 10.3-year doubling alone keeps 51%). | Rewrote it in the cost frame: "at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and starting 10 years younger also adds 10 years of deposits, so each decade younger costs you more than double." Same change in §The maths. The check prints the lump-sum factor (×2.010 in 120 months) to show why the deposits are needed. |
| V5 | 02c | should | Shortcut verdict "halve it, drop the 000s" had no "≈" and was 4% off every row. | The shortcut is gone with the rebuild. The new verdict "$100,000: **≈ $10** of every hour never reaches you." carries the "≈" (10.0096 → 10). |
| V6 | 02c | should | vo[1] needed 4.64 s at 2.8 words/s with hyphenated numbers split, but had 3.9 s. | The check now enforces both reads (2.6 w/s unsplit and 2.8 w/s split) on every line of all three specs, and counts a spoken "dollars" after every $ figure. All 8 lines pass; the tightest is 02a vo[0] (4.23 s needed, 4.3 s given). |
| V7 | 02a | nit | vo[1] d 3.5 < 3.57 s split. | Superseded by the new lines; each `d` is sized to both reads (see the guide VO table). |
| V8 | 02a | nit | "7% a year" is nominal 7%/12 (effective 7.23%), not disclosed on screen. | Footer kept short (a 2-line footer re-breaks the layout). Added "7% ÷ 12 each month, about 7.23% a year effective" to the pinned comment and "at 7% ÷ 12 each month" to caption line 2. |
| V9 | 02c | nit | Spoken opener was a topic label; the md claimed a per-minute pointer beat the spec lacked. | The opener is now the first calculation ("$65,000? $31.25 an hour."). The per-minute column and its beat are gone; every beat in the sheet exists in the spec. |
| V10 | 02c | nit | Word count 28 vs 27; stale Open items. | Recounted all three (28 / 29 / 22, hyphenated numbers as one word). Open items now records the current linter result (3/3 clean). |

### Hook judge

| # | Teaser | Issue / score | What I did |
|---|---|---|---|
| J1 | 02a | Score 7. R10 voice FAIL (the opener re-read the header; first spoken number at 4.0 s); R12 FAIL (ambiguous "less than half"; echo of lane 7's 25-vs-35 duel). | **Adopted the rewrite.** Header kept. Opener "$3 a day at 18: **≈ $400,000**." (shock spoken by about 3 s), then "At 25: **≈ $240,000**.", then "10 years younger? It costs you **more than double**." The second pointer compares the 35 row with the 25 row inside the table ("At 25: ≈ 2.2× this"), not two people, so it stays a by-age lookup rather than a ledger duel. Runtime 12.5 → 13.0 s so the stricter VO timing fits. My estimate after: 7.5. |
| J2 | 02b | Score 5; **must**: the dropped Rate Clock, goal-first, R4 and R5 fail, output in years; caption spoils both reveals. | **Applied the rewrite, with one change.** Header "ELON'S **$1 TRILLION** PAY PLAN / AT YOUR HOURLY WAGE"; footer "Plan's max, if every target is hit · 2,080 hrs a year · every cent kept"; column 2 relabelled "Start this many years ago" (R6 start date); caption rewritten so neither the dinosaurs nor our species is given away. **Kept** a number-first opener ("Minimum wage? Start **≈ 66.3 million years** ago.") instead of the judge's "Minimum wage? You'd have clocked in with the dinosaurs." at 0.0 s, because the dinosaur pointer would then land at 0.0 s, and in the Scoreboard kit that replaces the formula strip for the whole short (rendered and checked), so the working would never be on screen. The judge's line now plays at 4.2 s with the pointer. **Kept the topic**: it is the lane's assigned example. The judge's own ceiling for it is about 6.5, and that is my estimate. |
| J3 | 02c | Score 4; **must**: duplicates 01c (÷ 2,080, per-minute) and never pays off "really"; **must**: no stake, label opener, misleading title. | **Rebuilt on the judge's first option, after-tax per hour.** Header "What you **actually** make / per hour, by salary"; title "What You Actually Make Per Hour, by Salary"; columns Salary · "Per hour ÷ 2,080" · "You keep per hour"; per-minute dropped; BLS median pointer kept; verdict "$100,000: **≈ $10** of every hour never reaches you."; footer "Single · 2026 federal tax + FICA · no state tax". The judge's single opener ("$65,000 is $31.25 an hour. You keep ≈ $26.") needs about 5-6 s at the stricter read, so it is split over two lines (0.0 and 4.2 s). Rows run biggest bite first ($200,000) for R10, and 12 rows instead of 14 so the formula footnote and pointer legend stay on screen (the kit drops both at 14). **Why not the paid-time-off option:** it turns the "real" hourly *up* (≈ $33.85), which is a weaker stake, and US paid leave varies too much for one footer. **Overlap with 01b and 08b,** which also use 2026 tax + FICA: 01b is one wage per month and 08b is a unit price; neither tabulates kept pay by salary. All three use the same tax model, and the check asserts it (01b's ×0.85 and 08b's $13.10). My estimate after: 6.5. |

### Checks after the revision

- `python3 teasers/v2/checks/02-find-your-row.py` → **PASSED: all 170 checks**.
- Mutation test on scratch copies: (1) one row of 02c changed ("≈ $38.07" → "≈ $38.70"); (2) one VO line of 02a shortened (d 4.3 → 3.9). Result: **FAILED: 5 of 171 checks, exit 1**: the changed row, its stray number token (38.70 is not a computed value), the `vo[0]` field, the `vo[0]` fit test (4.23 s needed) and the VO-fit summary.
- `node src/cli.mjs check` on the three specs → 3/3 clean, 0 errors, 0 warnings.

### Hook pass (2026-10-07)

The owner rejected round 1 partly because "hooks are weak". For each teaser, four rewritten hooks (A-D, each a header + first VO line + the first 1.5 s + a platform title, built on the hook bank's P1-P9 and R1-R12) were scored against the current hook by two judges. **Rule:** average the two judges' scores per option (an option either judge marks dishonest is out; none was); adopt the best option only if its average is **≥ 7.5** and **≥ 0.75 above the current hook**, otherwise keep the current hook.

| Teaser | Option | Judge 1 | Judge 2 | Average | Decision |
|---|---|---:|---:|---:|---|
| 02a | current | 7 | 6.5 | 6.75 | |
| 02a | **A: "It's just $3 a day." + red "what you think" column** | 7.5 | 7.5 | **7.5** | **adopted** (+0.75, exactly the bar) |
| 02a | B: "What $1 you spend today costs you by 65" | 6 | 6 | 6.0 | |
| 02a | C: "POV: you spend $3 a day until 65 instead of investing it" | 7 | 7 | 7.0 | |
| 02a | D: "$3, $5 or $10 a day", 4 columns | 6 | 6 | 6.0 | |
| 02b | current (start ≈ 66.3 million years ago) | 5 | 5.5 | 5.25 | |
| 02b | A: 1 second of the plan at your wage | 7.5 | 7 | 7.25 | runner-up (below 7.5) |
| 02b | B: split with every US full-time worker | 5.5 | 6 | 5.75 | |
| 02b | **C: the plan earns your whole career's pay in…** | 8 | 7.5 | **7.75** | **adopted** (+2.5) |
| 02b | D: "When do you clock in?" over the old table | 6 | 6 | 6.0 | |
| 02c | current (what you actually make per hour) | 5.5 | 5.5 | 5.5 | |
| 02c | **A: what time your 9-to-5 starts paying you** | 7.5 | 7.5 | **7.5** | **adopted** (+2.0) |
| 02c | B: what never reaches you, per hour | 6 | 6 | 6.0 | |
| 02c | C: "Six figures ≈ $48 an hour?" | 6.5 | (not received) | n/a | |
| 02c | D: your bracket is not your tax rate | 7 | (not received) | n/a | |

**02c, judge 2's C and D:** the relayed scores were cut off after judge 2's 02c B. A is adopted because neither can overtake it unless judge 2 scored D above 8.0 (judge 1: 7.0) or C above 8.5 (judge 1: 6.5); the part of judge 2's text that arrived scores current 5.5, A 7.5 and B 6. If those scores arrive and change the order, this is the one decision to revisit.

**What I applied:**

| # | Teaser | Change | Notes |
|---|---|---|---|
| HP1 | 02a | **Option A as proposed.** Header '"It's just **$3 a day**." / What it costs you by 65:' (11 words); title '"It's Just $3 a Day": What It Costs You by 65, by Age'; middle column relabelled `__What you think__\n__it costs__` with `tone: "bad"` (red numbers); result column "What it really / costs you"; VO line 1 "Just $3 a day? At 18: **≈ $400,000**." (d 4.7); lines 2-3 and the pointers moved to 4.9 and 8.4 s; pointer 1 "≈ 5.5× what you think"; verdict and ding at 10.7 s; duration 13.0 → 13.4 s, hold 5.0. Rows, formula and footer unchanged. | Both judges' correction to the pitch: the rows that land in the first 1.5 s are 7.8×, 7.0×, 5.5× and **4.3×** their red number (not "5-8×"); the md now gives every row's ratio. Judge 2's caveat, a mild strawman (viewers think "$3", not $51,465), is answered by the label: the red number is the $3 a day added up, which is what "just $3 a day" claims it costs. The `tone` is the Live Sheet kit's documented column option; the kit does not colour `__…__` in a label (Open items). |
| HP2 | 02b | **Option C as proposed.** Header "ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…" (11 words); title "How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay"; 3 columns (wage · 40 years of your pay · his plan earns it in); 13 new rows; strip "= wage × 2,080 × 40 ÷ ≈ $3,169 a second"; footer "Plan's max, if every target is hit, ÷ 10 years, 24/7 · you: 40 years × 2,080 hrs"; new VO, pointers ($20/hr and $100/hr rows) and verdict "Even **$100/hr** for 40 years: ≈ 44 minutes of his." at 10.7 s; duration 14.0, hold 6.8. | Every row recomputed (both judges had already re-checked $7.25 → 3.17 min, $20 → 8.75, $100 → 43.76, $1,000 → 7.29 h). The plan's 10-year span is now load-bearing (÷ 10 years), and it is in the Reuters source already cited. The dinosaur and species anchors and their sources are removed from the md and the check. The 3 × 13 Scoreboard board was untested: now linted clean and checked in stills. New risk flagged in Open items: the device overlaps 10b's "40 years of your pay vs 1 minute of new US debt". |
| HP3 | 02c | **Option A.** Header "What time your 9-to-5 / starts paying **you**, by salary" (9 words); title "What Time Your 9-to-5 Starts Paying You, by Salary"; columns Salary · "Tax + FICA, min a day" · "Paying you from" (emphasised); 12 rows recomputed on the same 2026 tax + FICA model; footnote "= 9:00 am + 480 min × (tax + FICA) ÷ salary"; VO "$65,000? You work for tax till **≈ 10:18**." / "That's ≈ 78 minutes, every workday." / "Six figures? Until **≈ 10:40**."; pointer 1 "≈ US median full-time pay" at 4.5 s. | The option's text reached me cut off after its first pointer, so I completed the rest within its frame: pointer 2 "≈ 1 hr 40 min, every workday" on the $100,000 row at 7.4 s (99.94 min); verdict "$100,000: you work for tax till **≈ 10:40**, every workday." at 8.6 s, when the VO says "≈ 10:40"; duration 13.0 s and hold 5.6 s kept. Judge 1's notes are handled in the md: the clock is an average (pinned comment, Tax Freedom Day logic), FICA is named as a payroll tax, and the 64-minute spread between rows is stated (the stake is the daily repeat). |

**Checks after the hook pass:**
- `python3 teasers/v2/checks/02-find-your-row.py` → **PASSED: all 170 checks**. The builders for all three teasers were rewritten: 02b recomputes the plan's clock (10 × 365.25 × 24 × 3,600 = 315,576,000 s) and every career-pay row; 02c recomputes each row's tax minutes and clock time from the same tax functions, and asserts that the tax share (so the clock) rises with every row; 02a asserts the new header, labels and timings.
- Mutation test on scratch copies: (1) one 02c row changed ("≈ 10:40 am" → "≈ 10:41 am"); (2) 02b `vo[2]` shortened (d 4.7 → 4.4). Result: **FAILED: 5 of 171 checks, exit 1**: the changed row, its stray number token (41 is not a computed minute), the `vo[2]` field, the `vo[2]` fit test (4.64 s needed) and the VO-fit summary.
- `node src/cli.mjs check` on the three specs → 3/3 clean, 0 errors, 0 warnings.
- `node src/cli.mjs stills … --at 0,1.5,3` (plus one still at each verdict): in frame 1, 02a shows the quoted header over "18 · $51,465 (red) · ≈ $400,000"; 02b shows the header ending "IN…" over "$7.25/HR · $603,200 · ≈ 3.2 MIN" and the strip; 02c shows the header over "$200,000 · ≈ 123 min · ≈ 11:03 am". At 3.0 s each caption carries the first payoff ("At 18: ≈ $400,000"; "≈ 3 minutes of his"; "≈ 10:18").
