# 02 · Find your row: three teasers

**Format:** `find-your-row` (rank 2 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P7**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews; see the [Review log](#review-log))
**Specs:**
- [`studio/specs/02a-live-sheet-3-a-day-by-age.json`](../../studio/specs/02a-live-sheet-3-a-day-by-age.json)
- [`studio/specs/02b-scoreboard-trillion-at-your-wage.json`](../../studio/specs/02b-scoreboard-trillion-at-your-wage.json)
- [`studio/specs/02c-clean-sheet-salary-per-hour.json`](../../studio/specs/02c-clean-sheet-salary-per-hour.json)

**Maths check:** [`checks/02-find-your-row.py`](checks/02-find-your-row.py). It recomputes every on-screen number from its inputs (including the 2026 federal tax and FICA behind 02c), rebuilds every display string and VO line from those numbers, then compares them with the three specs. It also checks:
- timing: every VO line must fit **both** 2.6 words/s (hyphenated numbers as one word) **and** 2.8 words/s (hyphenated numbers split, so "twenty-five" is two words); no overlaps; each pointer lands when its VO line starts and after its row has landed; the verdict and its ding land when the VO says it;
- the contract shape and the hook rules;
- that this write-up quotes every VO line, verdict, footer, formula and platform title exactly as the specs carry them.

Result: **PASSED: all 170 checks**. A mutation test (one row changed, one VO line shortened) fails with exit 1 (see the Review log).

**Studio linter:** `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 0 warnings.** Stills were rendered at the key beats of each teaser and inspected.

**Web searches used:** 9 in the first draft; 2 more in this revision (2026 tax brackets; 2026 Social Security wage base).

---

## (a) The format in 5 lines

1. **What it is.** One header plus a table with one row for each kind of viewer (age, wage, salary). The table is denser than anyone can read in one pass, the viewer's job is to find their own row, and it runs 6-16 s and loops.
2. **Breakouts:**
   - Gage Heward, "What $1 costs you by age": **1,150,974 plays (210x his median)**, 14 s, no voice, 48 rows. https://www.instagram.com/reel/Da_dukjxB56/
   - FinCalC TV's 16-row 6 s cards: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate", **428,862 (54.46x)**, https://www.youtube.com/shorts/K2QbxGXa29k, and "Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate", **264,377 (51.68x)**, https://www.youtube.com/shorts/0Gc_IRi9RbU
3. **It is replicated beyond those two.** Yannick's "⚡️ 3 PAYCHECK RULES ⚡️" did 142,827 (7.9x med), https://www.instagram.com/reel/DeDdp-IRg5E/. FinCalC's "Rs. 5000 SIP Returns … 5 Years to 30 Years" did 137,201 (7.26x). Jake's "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN" did 64,190. The Market Hustle's "You've got 93 days left in 2026." did 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. Five benchmark accounts run it, and three of them are faceless.
4. **What kills it.** A voice walking the rows: Gage's talked tables get 1,456-6,616, and Master Money's talked-through "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)" got **11,745** in 58 s (https://www.instagram.com/reel/DeH6RvuJNXi/). Cutting it to 5-6 rows, and goal-first titles, also hurt. All three teasers below keep the VO to 3 short lines (22-29 words) and let the table do the work.
5. **What it buys.** Reach, not community. Like rates run 0.11-0.70% (FinCalC 0.15% and 0.11%, Gage 0.70%), and FinCalC's keyword CTAs drew 8 and 4 comments on 428,862 and 264,377 views. So: no keyword CTA, a cover that shows the completed table (Gage's one A/B: 4,348 vs 2,844, n = 1), and a pinned comment that invites an argument about the inputs.

**Hook grammar we are stealing (P7):** "What $[tiny amount] costs you by [age / wage]", or "[payout noun] … at [rate]". A payout or cost noun matters: FinCalC's payout-first titles have a median of 100,740 (n=11), against 12,314 for its goal-first titles.

---

## (b) The three teasers at a glance

| | 02a | 02b | 02c |
|---|---|---|---|
| Look | Live Sheet | Scoreboard | Clean Sheet |
| Platform title | What $3 a Day Costs You by Age | Elon's $1 Trillion Pay Plan at Your Hourly Wage | What You Actually Make Per Hour, by Salary |
| On-screen header (t = 0) | What **$3 a day** / costs you by age | ELON'S **$1 TRILLION** PAY PLAN / AT YOUR HOURLY WAGE | What you **actually** make / per hour, by salary |
| Words in hook | 8 | 8 | 8 |
| Rows × columns | 10 × 3 (age, spend, cost) | 13 × 2 (wage, start date) | 12 × 3 (salary, per hour, kept per hour) |
| Runtime | 13.0 s | 14.0 s | 13.0 s |
| VO words (spoken, hyphenated numbers as one) | 28 | 29 | 22 |
| First number on screen | 18 · $51,465 · ≈ $400,000 | $7.25/hr · ≈ 66.3 million | $200,000 · ≈ $96.15 · ≈ $71.60 |
| Verdict | 10 years younger: it costs **more than double**. | Even **$1,000/hr**: longer than our species has existed. | $100,000: **≈ $10** of every hour never reaches you. |
| Hook score (judge → after revision, my estimate) | 7 → 7.5 | 5 → 6.5 | 4 → 6.5 |

---

## 02a · Live Sheet · "What $3 a day costs you by age"

**Spec:** `studio/specs/02a-live-sheet-3-a-day-by-age.json` · **13.0 s** · captions on

**Platform title:** What $3 a Day Costs You by Age
**On-screen hook (header):** What **$3 a day** / costs you by age

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 plays (210x med), https://www.instagram.com/reel/Da_dukjxB56/. We take the grammar word for word, with one input swapped. Like his, the biggest number comes first ($88.20 for him, ≈ $400,000 here), and the table types itself in.
2. **H45, @investment_timeline, "POV: You invested in Monster instead of paying $3/day for a Monster Energy"**: 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. It shows $3 a day is a habit-sized input the audience already pays.
3. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. This is where the look comes from: a white sheet on black, a mint input header, a peach output header and the rate in view.
- **Contrast we design against: H89, Master Money, "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)"**: 11,745, 58 s, talked on camera. Same idea, killed by length and talking. Ours is 13 s with 28 spoken words, and the music-only cut is the A version (see the platform notes).

**Rules satisfied:**
- **R1:** "$3" in the header plus row 1 ("18 · $51,465 · ≈ $400,000") are on screen at 0.0 s.
- **R2:** one input ($3) and no result in the hook.
- **R3:** one row per age, 18-60. The $3 is fixed, so the pinned comment gives the scaling rule (double it for $6, and so on: every cell is linear in the daily amount).
- **R4:** $3 is small, round and habitual.
- **R5:** "costs you" turns spending into a loss. The middle column, "You'd spend", is the answer the viewer already holds ($43,800 at 25), set beside the real cost (≈ $240,000).
- **R6:** you, $3 a day, until 65.
- **R7:** each row is a named age, so the viewer picks theirs.
- **R8:** 8 words.
- **R9:** 10 countable rows.
- **R10:** the biggest number is first on screen at 0.0 s, **and now spoken first**: the opener "$3 a day at 18: ≈ $400,000." lands the shock by about 3 s (the first draft's opener only re-read the header).
- **R11:** the caption carries the verdict.
- **R12:** "10 years younger: it costs more than double" is one direction, one number, and true for every whole age from 18 to 54 (asserted in the check).

**The wrong beliefs it plays on:**
1. "$3 a day is pocket change. At most it costs me $3 × the days." The spend column shows that number; the cost column is 5.5× it at 25 and 7.8× it at 18.
2. "Ten years of age doesn't change much." Every 10 years younger, the same $3 a day costs you **more than double**: true for every whole age 18-54 (FV(age) ÷ FV(age + 10) runs from 2.09 at 18 to 15.98 at 54; checked).

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "What **$3 a day** / costs you by age". Formula bar typing "= $3 × 365 ÷ 12 = $91.25 a month" (one line). Columns "Your age" · "You'd spend by 65" · "It costs you by 65" (emphasised). All 10 age keys in place; row 1 "18 · $51,465 · ≈ $400,000" filled. Footer "At 7% a year until 65 · no tax, fees, inflation" (one line, clear of the caption band). | "$3 a day at 18: **≈ $400,000**." |
| 0.5-4.5 | Rows 20 → 60 land, one every 0.5 s, biggest first | (line 1 continues to 4.3) |
| 4.5 | Pointer to row "25 · $43,800 · ≈ $240,000", tooltip "≈ 5.5× what you'd spend" | "At 25: **≈ $240,000**." |
| 8.0 | Pointer to row "35 · $32,850 · ≈ $111,000", tooltip "At 25: ≈ 2.2× this" | "10 years younger? It costs you **more than double**." |
| 10.3 | Verdict card "10 years younger: it costs **more than double**." in the caption band + ding; the result column flashes top to bottom | (inside line 3: "more than double") |
| 10.3-13.0 | The full table holds; the last 0.5 s clears the rows back to the frame-1 state for the loop | (none) |

### Guide VO script (28 spoken words, about 10.8 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | $3 a day at 18: **≈ $400,000**. | "Three dollars a day at eighteen: about four hundred thousand dollars." |
| 4.5 | 3.3 | At 25: **≈ $240,000**. | "At twenty-five: about two hundred forty thousand dollars." |
| 8.0 | 3.5 | 10 years younger? It costs you **more than double**. | "Ten years younger? It costs you more than double." |

Each `d` covers the read at 2.6 words/s with hyphenated numbers as one word, and at 2.8 words/s with them split (4.23 / 3.93 s; 3.08 / 3.21 s; 3.46 / 3.21 s).

### The maths

Inputs: $3 a day; 365 days; 7% a year, compounded monthly (7% ÷ 12 each month, an effective 7.23% a year); deposits at the end of each month; stopping at 65.
- $3 × 365 = **$1,095** a year; ÷ 12 = **$91.25** a month (formula bar).
- **You'd spend by 65** = $1,095 × (65 − age). This is exact, so it carries no "≈".
- **It costs you by 65** = FV = $91.25 × ((1 + 0.07/12)^n − 1) ÷ (0.07/12), with n = (65 − age) × 12 months. It is rounded to the nearest $1,000, or to the nearest $100 below $10,000.

| Age | Spend = $1,095 × yrs | Months | FV exact | On screen |
|---:|---:|---:|---:|---:|
| 18 | $51,465 (47 yrs) | 564 | $400,261.67 | ≈ $400,000 |
| 20 | $49,275 (45) | 540 | $346,074.26 | ≈ $346,000 |
| 25 | $43,800 (40) | 480 | $239,514.22 | ≈ $240,000 |
| 30 | $38,325 (35) | 420 | $164,346.23 | ≈ $164,000 |
| 35 | $32,850 (30) | 360 | $111,322.35 | ≈ $111,000 |
| 40 | $27,375 (25) | 300 | $73,919.04 | ≈ $74,000 |
| 45 | $21,900 (20) | 240 | $47,534.56 | ≈ $48,000 |
| 50 | $16,425 (15) | 180 | $28,922.81 | ≈ $29,000 |
| 55 | $10,950 (10) | 120 | $15,793.99 | ≈ $16,000 |
| 60 | $5,475 (5) | 60 | $6,532.85 | ≈ $6,500 |

- **Pointer "≈ 5.5× what you'd spend":** $239,514.22 ÷ $43,800 = 5.468, shown as ≈ 5.5.
- **Pointer "At 25: ≈ 2.2× this"** (on the 35 row): $239,514.22 ÷ $111,322.35 = 2.152, shown as ≈ 2.2.
- **Verdict "10 years younger: it costs more than double":** FV(age) ÷ FV(age + 10) is above 2 for **every** whole age from 18 to 54 (minimum 2.092 at 18, maximum 15.98 at 54; asserted in the check). In the table's own 10-year pairs: 20 → 30 = 2.11, 25 → 35 = 2.15, 30 → 40 = 2.22, 35 → 45 = 2.34, 40 → 50 = 2.56, 45 → 55 = 3.01, 50 → 60 = 4.43.
- **Why it is more than double** (pinned comment): at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years; a lump sum at 7% ÷ 12 grows ×2.01 in 120 months), and starting 10 years younger also adds 10 years of $3 deposits. The two together push the ratio above 2.
- **Pinned comment, at 10% instead:** age 25 → ≈ $577,000; age 18 → ≈ $1,170,000. This matches the hook bank's 10% table.

### Sources

**No real-world inputs.** $3 a day is a hypothetical amount and 7% a year is a stated assumption, not a forecast and not a market figure, and the footer says so. That is deliberate: the hook bank found the comments argue about the rate (Gage: "10% vs 7% vs 8%"), so the rate is printed on screen and the pinned comment invites that argument.

### Assumptions (footer, on screen at t = 0)

> At 7% a year until 65 · no tax, fees, inflation

### Caption / description

> Find your age. That's what $3 a day costs you by 65, if you'd invested it at 7% a year instead of spending it. Every 10 years younger, it costs you more than double.
> ($3 × 365 ÷ 12 = $91.25 a month, at 7% ÷ 12 each month; no tax, fees or inflation. Maths, not advice.)

### Pinned comment

> Why 7%? It's a round, middle-of-the-road rate, not a prediction (7% ÷ 12 each month, about 7.23% a year effective). At 10% the 25 row becomes ≈ $577,000 and the 18 row ≈ $1,170,000. Rule of thumb: at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and starting 10 years younger also adds 10 years of deposits, so each decade younger costs you more than double. Spend $6 a day? Double your row. What rate would you plug in?

### Per-platform notes

- **Instagram Reels (A version: music only).**
  - Gage's 1.15M version had no voice and a pop track. Post this cut first with in-app trending audio, captions off, and the header and table carrying everything.
  - Caption line 1: "Find your age."
  - Cover: the completed table.
- **TikTok.**
  - The VO cut (B version) with captions on, which keeps the guide VO.
  - Caption line 1 states the verdict.
  - No "Comment X" CTA. FinCalC's drew 8 comments on 428,862 views.
- **YouTube Shorts.**
  - Title = the hook. The VO cut works here: FinCalC's 3.77M short had a spoken first line.
  - Make sure the loop resets to the frame-1 state.
  - Expect a like rate around 0.2%: this is a reach format.

---

## 02b · Scoreboard · "Elon's $1 trillion pay plan at your hourly wage"

**Spec:** `studio/specs/02b-scoreboard-trillion-at-your-wage.json` · **14.0 s** · captions on

**Platform title:** Elon's $1 Trillion Pay Plan at Your Hourly Wage
**On-screen hook (header):** ELON'S **$1 TRILLION** PAY PLAN / AT YOUR HOURLY WAGE

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw.
   - The title states the rule and never the result.
   - The assumptions sit in the footer ("Price of RTX 5090 32GB: ~$4,899"); ours is "Plan's max, if every target is hit · 2,080 hrs a year · every cent kept".
   - Scoreboard is HD Guy's look family.
2. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). "by age" becomes "at your hourly wage", with one row for every viewer and the biggest number first (≈ 66.3 million years).
3. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206, the best of his wage reels, https://www.instagram.com/reel/Dd2QzRzRrGT/. The hourly wage works as the filter that pulls the viewer in, never as the goal.
4. **The hook bank's own rewrite of the hot-dog hook (§4.1 B), "Elon's $1 Trillion, …"**: a spectacular sum passes R4 only when it is a tribe's object, so the trillion is named for what it is, a pay plan people argued about in November 2025.
- **Contrasts:**
  - HD Guy's "Wages Visualized In Real Time" got **9,025**. The wage as a running counter flopped, so here the wage is a row, not a counter.
  - 04-formats §4.1 dropped the "Rate Clock" (a mega-sum ÷ a human rate = a time). This teaser is still that maths underneath; it survives only because the lane assigns the topic, and the rewrite turns the time into a **start date** (R6) and names the sum's owner (R4). The judge's own ceiling for the topic is about 6.5.
  - The hook bank's rewrite A also had a "$50,000/hr" row. It is dropped here: it is nobody's wage (R4).

**Rules satisfied:**
- **R1:** "$1 TRILLION" in the header plus row 1 "$7.25/hr · ≈ 66.3 million" at 0.0 s, with the formula "= $1,000,000,000,000 ÷ (wage × 2,080)" in the strip.
- **R2:** one input ($1 trillion) and no result.
- **R3:** 13 wage rows from the federal minimum to $1,000/hr.
- **R4:** the rows are wages viewers earn; the trillion is a named, argued-about object (Elon's pay plan), which the footer qualifies as the plan's maximum.
- **R5:** partial. The implied wrong answer is "a big enough wage gets you there"; the honest limit is that most viewers already guess "never".
- **R6:** you, your wage, and now a start date: the column reads "Start this many years ago".
- **R7:** each row is a named wage.
- **R8:** 8 words.
- **R9:** 13 countable rows.
- **R10:** the biggest number is first, at 0.0 s, and the first spoken payoff ("Start ≈ 66.3 million years ago") lands by about 3.5 s.
- **R11:** the verdict is in the caption; the caption no longer gives the dinosaur and species reveals away.
- **R12:** a single repeatable fact: "even $1,000 an hour takes longer than our species has existed".

**The wrong belief it plays on:** "A trillion is just a lot of millions. A high enough hourly wage would get there." At the federal minimum you'd have had to clock in when the dinosaurs died out, and even $1,000 an hour takes about 1.6 times as long as Homo sapiens has existed.

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "ELON'S **$1 TRILLION** PAY PLAN / AT YOUR HOURLY WAGE". Footer on 2 lines: "Plan's max, if every target is hit / 2,080 hrs a year · every cent kept". Columns "Your wage" · "Start this many years ago" (emphasised). All 13 wage keys in place; row 1 "$7.25/hr · ≈ 66.3 million" lit. Strip: "= $1,000,000,000,000 ÷ (wage × 2,080)". | "Minimum wage? Start **≈ 66.3 million years** ago." |
| 0.35-4.2 | Rows $10/hr → $1,000/hr land, one every 0.35 s | (line 1 continues to 4.0) |
| 4.2 | Pointer to row 1; the strip label "≈ when the dinosaurs died out" slams in over the formula | "You'd have clocked in with the dinosaurs." |
| 7.2 | Pointer to the last row "$1,000/hr · ≈ 481,000", label "Our species: ≈ 300,000 years" | "Even **$1,000 an hour**? Longer than our species has existed." |
| 9.5 | Verdict "Even **$1,000/hr**: longer than our species has existed." slams into the header band + ding | (inside line 3: "Longer than…") |
| 9.5-14.0 | Hold, then a hard cut back to frame 1 for the loop | (none) |

### Guide VO script (29 spoken words, about 11.2 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.0 | Minimum wage? Start **≈ 66.3 million years** ago. | "Minimum wage? Start about sixty-six point three million years ago." |
| 4.2 | 2.8 | You'd have clocked in with the dinosaurs. | (as written) |
| 7.2 | 4.8 | Even **$1,000 an hour**? Longer than our species has existed. | "Even a thousand dollars an hour? Longer than our species has existed." |

Fit at 2.6 / 2.8 words/s: 3.85 / 3.93 s; 2.69 / 2.50 s; 4.62 / 4.29 s.

### The maths

Years = $1,000,000,000,000 ÷ (wage × 2,080 hrs), with 2,080 = 40 hrs × 52 weeks. Every cent is kept, with no raises, no tax and no interest. "Start this many years ago" is the same number read as a start date: work that long, every week, and you reach $1 trillion today. Results of a million or more are shown to 0.1 million; smaller ones to the nearest 1,000. All of them carry "≈".

| Wage | Exact years | On screen |
|---:|---:|---:|
| $7.25 | 66,312,997 | ≈ 66.3 million |
| $10 | 48,076,923 | ≈ 48.1 million |
| $15 | 32,051,282 | ≈ 32.1 million |
| $20 | 24,038,462 | ≈ 24.0 million |
| $25 | 19,230,769 | ≈ 19.2 million |
| $30 | 16,025,641 | ≈ 16.0 million |
| $40 | 12,019,231 | ≈ 12.0 million |
| $50 | 9,615,385 | ≈ 9.6 million |
| $75 | 6,410,256 | ≈ 6.4 million |
| $100 | 4,807,692 | ≈ 4.8 million |
| $250 | 1,923,077 | ≈ 1.9 million |
| $500 | 961,538 | ≈ 962,000 |
| $1,000 | 480,769 | ≈ 481,000 |

- **"≈ when the dinosaurs died out":** 66.31 million years against a 66.0 million-year-old impact (66.04 Ma in Renne et al. 2013). They are 0.5% apart (asserted to be under 1%).
- **"Our species: ≈ 300,000 years" / verdict:** 480,769 > 300,000, about 1.6x (asserted).
- **Pinned comment, working 24/7:** 365.25 × 24 = 8,766 hrs a year, and $1T ÷ ($7.25 × 8,766) ≈ 15.7 million years.
- **Pinned comment, the plan's decade:** $1T ÷ (10 years × 2,080 hrs) = $48,076,923 an hour, ≈ $48 million.

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **Federal minimum wage $7.25/hr**, in force since 2009-07-24 and still current in 2026 | US Department of Labor, news release "Federal minimum wage increases to $7.25 on July 24", 2009-07-16, https://www.dol.gov/newsroom/releases/esa/esa20090716; DOL Wage and Hour Division, "Minimum Wage", https://www.dol.gov/agencies/whd/minimum-wage | US Bureau of Labor Statistics, CPS annual table 44 (2025 annual averages, published 2026): "The prevailing Federal minimum wage was $7.25 per hour in 2025", https://www.bls.gov/cps/cpsaat44.htm. For 2026: Paycor, "Minimum Wages by State: A Complete Guide for 2026", https://www.paycor.com/resource-center/minimum-wage-by-state |
| **Non-avian dinosaur extinction / Chicxulub impact ≈ 66 million years ago** | Renne et al., "Time Scales of Critical Events Around the Cretaceous-Paleogene Boundary", *Science* 339:684-687, 2013-02-08 (impact 66.038 ± 0.011 Ma; extinction 66.043 Ma). Summarised by the California Academy of Sciences, "Pinpointing date of impact", https://www.calacademy.org/explore-science/pinpointing-date-of-impact; University of Glasgow eprint https://eprints.gla.ac.uk/79877 | American Museum of Natural History, "Did an asteroid kill the dinosaurs?", https://www.amnh.org/explore/videos/dinosaurs-and-fossils/did-asteroid-kill-dinosaurs; Smithsonian Magazine, "The Mass Extinction That Wiped Out the Dinosaurs", https://www.smithsonianmag.com/videos/smg-004-how-did-dinosaurs-die/ |
| **Homo sapiens ≈ 300,000 years old** | Hublin et al., *Nature* 546:289-292, 2017-06-08 (Jebel Irhoud, Morocco, ≈ 315,000 years). Reported by NPR via Michigan Public, "315,000-Year-Old Fossils From Morocco Could Be Earliest Recorded Homo Sapiens", 2017-06-07, https://www.michiganpublic.org/2017-06-07/315-000-year-old-fossils-from-morocco-could-be-earliest-recorded-homo-sapiens | Popular Archaeology (Max Planck Institute release), "Earliest known Homo sapiens just got older" ("at least 300,000 years ago"), https://popular-archaeology.com/article/earliest-known-homo-sapiens-just-got-older |
| **Header and footer: Tesla pay plan for Elon Musk worth up to $1 trillion if every target is hit**, approved by shareholders on 2025-11-06 with over 75% support; "over the next decade" (pinned comment) | Reuters via Business Standard, 2025-11-07, https://www.business-standard.com/world-news/elon-musk-tesla-pay-package-worth-1-trillion-shareholders-approve-125110700092_1.html ("could get as much as $1 trillion in stock over the next decade") | Anadolu Agency, "Tesla shareholders approve Elon Musk's compensation package", https://www.aa.com.tr/en/economy/tesla-shareholders-approve-elon-musks-compensation-package/3737245; Malay Mail, 2025-11-07, https://malaymail.com/news/money/2025/11/07/worlds-most-expensive-participation-trophy-tesla-investors-hand-musk-a-potential-us1t-to-keep-him-at-the-helm/197433 |

**Verification note:** the egress proxy blocks dol.gov, amnh.org and fred.stlouisfed.org, so those pages could not be opened. Each figure was confirmed from the search-result text of the named page, plus at least one independent publisher. The 66.3 million vs 66 million and 481,000 vs 300,000 comparisons have wide margins (0.5% and 1.6x), so the claims hold even if the dates are refined. The $1 trillion is the plan's reported maximum, not a cash payment, which is why the footer says "Plan's max, if every target is hit".

### Assumptions (footer, on screen at t = 0)

> Plan's max, if every target is hit · 2,080 hrs a year · every cent kept

### Caption / description

> Find your wage: that's how many years ago you'd have had to start working, 40 hours a week, to have $1 trillion today.
> (40 hrs × 52 weeks = 2,080 hrs a year; every cent kept; no raises, tax or interest.)
> Why a trillion? In Nov 2025, Tesla shareholders approved a pay plan that could give Elon Musk up to $1 trillion in Tesla stock if every target is hit.

### Pinned comment

> Never sleep, never take a day off: that's 8,766 hours a year. At $7.25 it still takes ≈ 15.7 million years. The plan could pay out over about a decade; to match that on a wage you'd need ≈ $48 million an hour. Which row is yours?

### Per-platform notes

- **YouTube Shorts.** This is HD Guy's home (Scoreboard look).
  - Title = the hook, with no number in the result slot.
  - Music-only plus the on-screen pointer labels works, the way HD Guy runs on no voice. The VO cut is optional.
  - No end card; hard-cut back to frame 1.
- **TikTok.**
  - The VO cut: "Minimum wage? Start ≈ 66.3 million years ago." is a payoff spoken inside 4 s.
  - The Musk context line stays in the caption; on screen, the plan is named only in the header and qualified in the footer.
- **Instagram Reels.**
  - Caption line 1: "Find your wage."
  - Cover: the completed table, with the $7.25 row and the dinosaur pointer visible.

---

## 02c · Clean Sheet · "What you actually make per hour, by salary"

**Spec:** `studio/specs/02c-clean-sheet-salary-per-hour.json` · **13.0 s** · captions on

**Platform title:** What You Actually Make Per Hour, by Salary
**On-screen hook (header):** What you **actually** make / per hour, by salary

### Why this hook

**Modelled on:**
1. **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. We take its R5 word, "actually", and, unlike the first draft, we deliver what it promises: his video's correction is ×0.7 after tax, ours is the exact 2026 federal tax + FICA for each row.
2. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). The "What … by [your attribute]" frame, every key on screen at frame 1, the self-typing table, and the caption task ("Find your salary").
3. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x). A dense tier table with the one constant (÷ 2,080) printed in the column header and the working under the table.
- **Contrast inside our own slate:** 01c already does $60,000 ÷ 2,080 = $28.85 an hour, 48¢ a minute and a commute-adjusted "real hour". 02c therefore drops the per-minute column and the ÷ 2,000 shortcut, and its "real" hourly is the after-tax one, which no other teaser tabulates by salary.

**Rules satisfied:**
- **R1:** row 1 "$200,000 · ≈ $96.15 · ≈ $71.60" at 0.0 s, with every salary key on screen.
- **R2:** no number in the hook; the viewer brings their salary.
- **R3:** 12 salary rows, $30,000-$200,000.
- **R4:** round, familiar salaries.
- **R5:** "actually", and now the table pays it off: the "Per hour ÷ 2,080" column is the number the viewer already holds; "You keep per hour" beside it is lower on every row.
- **R6:** a stake with a size: at $100,000, ≈ $10 of every hour never reaches you.
- **R7:** each row is a named salary; the spoken opener is the first calculation, not a topic label.
- **R8:** 8 words.
- **R9:** 12 countable rows.
- **R10:** the biggest bite is first ($200,000: $96.15 → $71.60, ≈ $24.55 an hour gone); the first spoken payoff ($31.25) lands by about 3 s.
- **R11:** the caption carries the verdict.
- **R12:** "$100,000: ≈ $10 of every hour never reaches you" is one number you can repeat.

**The wrong beliefs it plays on:**
1. "My hourly is my salary ÷ 2,080." That is what you're paid, not what you keep: $65,000 is $31.25 an hour, and ≈ $26.16 of it reaches you.
2. "Tax takes the same share whatever you earn." The kept share falls row by row, from 87.6% at $30,000 to 74.5% at $200,000 (checked for every row).

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "What you **actually** make / per hour, by salary". Footer "Single · 2026 federal tax + FICA · no state tax". Columns "Salary" · "Per hour ÷ 2,080" · "You keep per hour" (emphasised, green highlighter). All 12 salary keys in place; row 1 "$200,000 · ≈ $96.15 · ≈ $71.60" filled. Footnote under the table "= (salary − tax − FICA) ÷ 2,080". | "**$65,000**? $31.25 an hour." |
| 0.2-2.2 | Rows $150,000 → $30,000 type in, one every 0.2 s | (line 1 continues to 4.0) |
| 4.2 | Yellow highlighter on "$65,000 · $31.25 · ≈ $26.16"; legend "[$65,000] ≈ US median full-time pay" | "After tax, you keep **≈ $26**." |
| 7.4 | Highlighter moves to "$100,000 · ≈ $48.08 · ≈ $38.07"; legend "[$100,000] ≈ $10 an hour goes to tax" | "Six figures? **≈ $10** an hour never reaches you." |
| 8.2 | Verdict "$100,000: **≈ $10** of every hour never reaches you." + ding | (inside line 3: "≈ $10") |
| 8.2-13.0 | The finished sheet holds (over 4 s: the screenshot), then the values clear back to frame 1 for the loop | (none) |

### Guide VO script (22 spoken words, about 8.5 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.0 | **$65,000**? $31.25 an hour. | "Sixty-five thousand? Thirty-one twenty-five an hour." |
| 4.2 | 2.9 | After tax, you keep **≈ $26**. | "After tax, you keep about twenty-six." |
| 7.4 | 3.9 | Six figures? **≈ $10** an hour never reaches you. | "Six figures? About ten dollars an hour never reaches you." |

Fit at 2.6 / 2.8 words/s (the check also counts a spoken "dollars" after every $ figure, so it is stricter than the read): 2.69 / 3.57 s; 2.69 / 2.86 s; 3.85 / 3.57 s.

### The maths

For each salary S (2026, single filer, standard deduction, wages only, no state or local tax):
- **Per hour** = S ÷ 2,080 (40 hrs × 52 weeks).
- **Federal income tax** on S − $16,100: 10% to $12,400; 12% to $50,400; 22% to $105,700; 24% to $201,775.
- **FICA** = 6.2% Social Security on wages up to $184,500 + 1.45% Medicare on all wages (the extra 0.9% Medicare starts above $200,000, so no row reaches it).
- **You keep per hour** = (S − federal tax − FICA) ÷ 2,080.
- Both columns are rounded to the cent, with "≈" wherever rounding happened. $65,000 ÷ 2,080 = $31.25 and $34,320 ÷ 2,080 = $16.50 are exact, so they carry no "≈".

| Salary | ÷ 2,080 exact | On screen | Federal tax | FICA | Kept a year (share) | Kept ÷ 2,080 exact | On screen |
|---:|---:|---:|---:|---:|---:|---:|---:|
| $200,000 | 96.1538 | ≈ $96.15 | $36,734.00 | $14,339.00 | $148,927.00 (74.5%) | 71.5995 | ≈ $71.60 |
| $150,000 | 72.1154 | ≈ $72.12 | $24,734.00 | $11,475.00 | $113,791.00 (75.9%) | 54.7072 | ≈ $54.71 |
| $100,000 | 48.0769 | ≈ $48.08 | $13,170.00 | $7,650.00 | $79,180.00 (79.2%) | 38.0673 | ≈ $38.07 |
| $90,000 | 43.2692 | ≈ $43.27 | $10,970.00 | $6,885.00 | $72,145.00 (80.2%) | 34.6851 | ≈ $34.69 |
| $80,000 | 38.4615 | ≈ $38.46 | $8,770.00 | $6,120.00 | $65,110.00 (81.4%) | 31.3029 | ≈ $31.30 |
| $70,000 | 33.6538 | ≈ $33.65 | $6,570.00 | $5,355.00 | $58,075.00 (83.0%) | 27.9207 | ≈ $27.92 |
| $65,000 | 31.2500 | $31.25 | $5,620.00 | $4,972.50 | $54,407.50 (83.7%) | 26.1575 | ≈ $26.16 |
| $60,000 | 28.8462 | ≈ $28.85 | $5,020.00 | $4,590.00 | $50,390.00 (84.0%) | 24.2260 | ≈ $24.23 |
| $50,000 | 24.0385 | ≈ $24.04 | $3,820.00 | $3,825.00 | $42,355.00 (84.7%) | 20.3630 | ≈ $20.36 |
| $40,000 | 19.2308 | ≈ $19.23 | $2,620.00 | $3,060.00 | $34,320.00 (85.8%) | 16.5000 | $16.50 |
| $35,000 | 16.8269 | ≈ $16.83 | $2,020.00 | $2,677.50 | $30,302.50 (86.6%) | 14.5685 | ≈ $14.57 |
| $30,000 | 14.4231 | ≈ $14.42 | $1,420.00 | $2,295.00 | $26,285.00 (87.6%) | 12.6370 | ≈ $12.64 |

Worked example, $100,000: taxable $83,900; tax = $1,240 + $4,560 + 22% × $33,500 ($7,370) = $13,170; FICA = 7.65% × $100,000 = $7,650; kept $79,180 ÷ 2,080 = $38.07.

- **VO "$65,000? $31.25 an hour."** Exact: 65,000 ÷ 2,080 = 31.25, so no "≈". The VO no longer calls $65,000 "typical"; that claim lives only in the pointer label, which carries "≈".
- **VO "After tax, you keep ≈ $26."** 26.1575 rounds to 26.
- **Pointer "≈ US median full-time pay"** on the $65,000 row: BLS median weekly earnings of $1,251 × 52 = $65,052, which rounds to ≈ $65,000 (0.08% off; asserted to be under 1%).
- **Verdict "$100,000: ≈ $10 of every hour never reaches you"** and pointer "≈ $10 an hour goes to tax": 48.0769 − 38.0673 = 10.0096 → ≈ $10.
- **Cross-check with the rest of the slate** (same tax model, asserted in the check): $41,600 keeps 85.6%, which is 01b's "× 0.85"; $15/hr keeps $13.10 an hour, which is 08b's figure.

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **2026 standard deduction, single: $16,100**; 2026 single brackets: 10% to $12,400, 12% to $50,400, 22% to $105,700, 24% to $201,775 (32% above) | IRS, Rev. Proc. 2025-32, 2025-10-09, https://www.irs.gov/pub/irs-drop/rp-25-32.pdf; IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill", 2025-10-09, https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | CPA Practice Advisor, "IRS Adjusts Tax Brackets, Standard Deduction for 2026", 2025-10-09, https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/ ("22% for incomes over $50,400 … 24% for incomes over $105,700 … 32% for incomes over $201,775"; standard deduction $16,100) |
| **2026 FICA:** 6.2% Social Security on wages up to **$184,500**; 1.45% Medicare on all wages | SSA, "2026 Social Security Changes" fact sheet (October 2025), https://www.ssa.gov/cola/factsheets/2026.html | Journal of Accountancy, "Social Security wage base and COLA announced for 2026" (October 2025), https://www.journalofaccountancy.com/news/2025/oct/social-security-wage-base-and-cola-announced-for-2026/ ("up to $184,500 … 6.2% OASDI tax"; Medicare 1.45% "has no wage limit") |
| **Median usual weekly earnings, full-time wage and salary workers, Q2 2026: $1,251** (not seasonally adjusted; 120.9 million workers) | US Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", news release 2026-07-21, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm | DWM Magazine, "USBLS announces unemployment and wage rates", 2026-07-24, https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/. Consistency check: BLS TED, "Median weekly earnings were $1,196 in second quarter 2025", and $1,196 × 1.046 (the release's +4.6% a year) = $1,251.0 |

**Verification note:** irs.gov and bls.gov could not be opened through this session's proxy. The bracket thresholds, the standard deduction and the wage base were confirmed from search-result text of the named pages and independent publishers in this revision (2 searches), and they match the figures 01b and 08b already use. The 0.9% Additional Medicare Tax (wages over $200,000, single) is statutory and not indexed; no row reaches it.

### Assumptions (footer, on screen at t = 0)

> Single · 2026 federal tax + FICA · no state tax

The 2,080 hours are in the column header ("÷ 2,080") and the footnote "= (salary − tax − FICA) ÷ 2,080".

### Caption / description

> Find your salary. Left: your pay ÷ 2,080 hours. Right: what's left of each hour after 2026 federal income tax and FICA (single filer, standard deduction, no state tax). At $100,000, ≈ $10 of every hour never reaches you.
> The typical US full-time worker earns $1,251 a week (BLS, Q2 2026), about $65,000 a year.

### Pinned comment

> This is federal income tax + FICA only. State income tax, 401(k) and health premiums come out too, so your real row is probably lower. What does your state take?

### Per-platform notes

- **Instagram Reels.**
  - This is Yannick's and Gage's platform. Post the music-only cut first, with captions off.
  - Clean Sheet's white page shows up well in a dark feed.
  - Caption line 1: "Find your salary."
- **TikTok.**
  - The VO cut. "After tax, you keep ≈ $26" on the median row is the line viewers compare themselves to.
  - Expect comments about state tax, 401(k)s and married filing. That is the argument we want; the footer states the basis.
- **YouTube Shorts.**
  - Title = the hook.
  - Keep the 4-second hold on the finished sheet: it is the screenshot.

---

## What changed from the seeds, and why

- **02a:**
  - The seed's 7% is kept (the hook bank's rewrite used 10%; 10% is in the pinned comment).
  - A **"You'd spend" column** sits beside the cost, so the answer the viewer already holds is on screen (R5).
  - The verdict is cost-framed ("10 years younger: it costs more than double") and checked for every whole age 18-54.
- **02b:**
  - The **federal minimum wage** ($7.25) is the first row: it is the biggest number and a wage some viewers earn.
  - The hook bank's "$50,000/hr" row is dropped (nobody's wage, R4).
  - The trillion is named as **Elon's pay plan** (R4), and the result column is a **start date** (R6).
  - Two verified anchors turn "millions of years" into something you can feel: the dinosaurs, and our species.
- **02c:**
  - Rebuilt from "salary ÷ 2,080" (which 01c already does) into **gross vs kept per hour, by salary**, on the 2026 federal tax + FICA basis the rest of the slate uses.
  - The per-minute column and the "halve it, drop the 000s" shortcut are gone.

## Open items

- **Linter:** all three kits mount and `node src/cli.mjs check` passes 02a, 02b and 02c with 0 errors and 0 warnings (2026-10-07, after this revision).
- **Kit-side note for the Live Sheet owner** (from the verifier, not fixed here because it is kit code): in `looks/live-sheet/formats/find-your-row.js`, once rows hit the minimum height with captions or the verdict band on, the sheet can overflow `bandBottom`. It should shrink rows or reserve the footer height above `G.workBottom`. 02a now avoids it with a one-line formula and a one-line footer.
- **Kit behaviour that shaped 02b:** in the Scoreboard kit, a pick at 0.0 s replaces the formula strip for the whole short (tested in stills), so 02b's first pointer lands at 4.2 s and the formula is on screen from 0.0 to 4.2 s.
- **Kit behaviour that shaped 02c:** with captions on, the Clean Sheet kit drops the formula footnote and the pick legend at 14 rows (tested); at 12 rows with a one-line footer it shows both.
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
