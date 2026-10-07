# 02 · Find your row: three teasers

**Format:** `find-your-row` (rank 2 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P7**)
**Date:** 2026-10-07
**Specs:**
- [`studio/specs/02a-live-sheet-3-a-day-by-age.json`](../../studio/specs/02a-live-sheet-3-a-day-by-age.json)
- [`studio/specs/02b-scoreboard-trillion-at-your-wage.json`](../../studio/specs/02b-scoreboard-trillion-at-your-wage.json)
- [`studio/specs/02c-clean-sheet-salary-per-hour.json`](../../studio/specs/02c-clean-sheet-salary-per-hour.json)

**Maths check:** [`checks/02-find-your-row.py`](checks/02-find-your-row.py). It recomputes every on-screen number, rebuilds every display string and VO line from those numbers, then compares them with the three specs. It also checks timing (2.6 words/s), the contract shape and the hook rules. Result: **PASSED: all 159 checks**. A mutation test (one row changed to "≈ 480,000", one VO line shortened) failed 5 checks with exit 1, as it should.

**Web searches used:** 9 of 14.

---

## (a) The format in 5 lines

1. **What it is.** One header plus a table with one row for each kind of viewer (age, wage, salary). The table is denser than anyone can read in one pass, the viewer's job is to find their own row, and it runs 6-16 s and loops.
2. **Breakouts:**
   - Gage Heward, "What $1 costs you by age": **1,150,974 plays (210x his median)**, 14 s, no voice, 48 rows. https://www.instagram.com/reel/Da_dukjxB56/
   - FinCalC TV's 16-row 6 s cards: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate", **428,862 (54.46x)**, https://www.youtube.com/shorts/K2QbxGXa29k, and "Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate", **264,377 (51.68x)**, https://www.youtube.com/shorts/0Gc_IRi9RbU
3. **It is replicated beyond those two.** Yannick's "⚡️ 3 PAYCHECK RULES ⚡️" did 142,827 (7.9x med), https://www.instagram.com/reel/DeDdp-IRg5E/. FinCalC's "Rs. 5000 SIP Returns … 5 Years to 30 Years" did 137,201 (7.26x). Jake's "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN" did 64,190. The Market Hustle's "You've got 93 days left in 2026." did 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. Five benchmark accounts run it, and three of them are faceless.
4. **What kills it.** A voice walking the rows: Gage's talked tables get 1,456-6,616, and Master Money's talked-through "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)" got **11,745** in 58 s (https://www.instagram.com/reel/DeH6RvuJNXi/). Cutting it to 5-6 rows, and goal-first titles, also hurt. All three teasers below keep the VO to 3-4 short lines (20-29 words) and let the table do the work.
5. **What it buys.** Reach, not community. Like rates run 0.11-0.70% (FinCalC 0.15% and 0.11%, Gage 0.70%), and FinCalC's keyword CTAs drew 8 and 4 comments on 428,862 and 264,377 views. So: no keyword CTA, a cover that shows the completed table (Gage's one A/B: 4,348 vs 2,844, n = 1), and a pinned comment that invites an argument about the inputs.

**Hook grammar we are stealing (P7):** "What $[tiny amount] costs you by [age / wage]", or "[payout noun] … at [rate]". A payout or cost noun matters: FinCalC's payout-first titles have a median of 100,740 (n=11), against 12,314 for its goal-first titles.

---

## (b) The three teasers at a glance

| | 02a | 02b | 02c |
|---|---|---|---|
| Look | Live Sheet | Scoreboard | Clean Sheet |
| Platform title | What $3 a Day Costs You by Age | $1 Trillion at Your Hourly Wage | Your Salary Is Really This Per Hour |
| On-screen header (t = 0) | What **$3 a day** / costs you by age | $1 TRILLION / AT YOUR **HOURLY WAGE** | What your salary / really pays **per hour** |
| Words in hook | 8 | 6 | 7 |
| Rows × columns | 10 × 3 (age, spend, cost) | 13 × 2 (wage, years) | 14 × 3 (salary, per hour, per minute) |
| Runtime | 12.5 s | 14.0 s | 14.0 s |
| VO words (spoken) | 24 | 28 | 28 |
| First number on screen | 18 · $51,465 · ≈ $400,000 | $7.25/hr · ≈ 66.3 million | $30,000 · ≈ $14.42 · ≈ $0.24 |
| Verdict | Wait 10 years: **less than half**. | Even **$1,000/hr**: longer than our species has existed. | Shortcut: **halve it, drop the 000s.** |
| Old hook it replaces | #3 "Your habit is $3 a day. For 10 years?" | #2 "$50,000 an Hour Since Year 1, Still No $1 Trillion" | (new; seed from the brief) |

---

## 02a · Live Sheet · "What $3 a day costs you by age"

**Spec:** `studio/specs/02a-live-sheet-3-a-day-by-age.json` · **12.5 s** · captions on

**Platform title:** What $3 a Day Costs You by Age
**On-screen hook (header):** What **$3 a day** / costs you by age

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 plays (210x med), https://www.instagram.com/reel/Da_dukjxB56/. We take the grammar word for word, with one input swapped. Like his, the biggest number comes first ($88.20 for him, ≈ $400,000 here), and the table types itself in.
2. **H45, @investment_timeline, "POV: You invested in Monster instead of paying $3/day for a Monster Energy"**: 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. It shows $3 a day is a habit-sized input the audience already pays.
3. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. This is where the look comes from: a white sheet on black, a mint input header, a peach output header and the rate in view.
- **Contrast we design against: H89, Master Money, "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)"**: 11,745, 58 s, talked on camera. Same idea, killed by length and talking. Ours is 12.5 s with 24 spoken words, and the music-only cut is the A version (see the platform notes).

**Rules satisfied:**
- **R1:** "$3" in the header plus row 1 ("18 · $51,465 · ≈ $400,000") are on screen at 0.0 s.
- **R2:** one input ($3) and no result in the hook.
- **R3:** one row per age, 18-60.
- **R4:** $3 is small, round and habitual.
- **R5:** "costs you" turns spending into a loss. The middle column, "You'd spend", is the answer the viewer already holds ($43,800 at 25), set beside the real cost (≈ $240,000).
- **R6:** you, $3 a day, until 65.
- **R7:** the options are named: each row is an age, so the viewer picks theirs.
- **R8:** 8 words.
- **R9:** 10 countable rows.
- **R10:** the biggest number is first, at 0.0 s.
- **R11:** the caption carries the verdict.
- **R12:** "Wait 10 years: less than half" is a repeatable verdict.

**The wrong beliefs it plays on:**
1. "$3 a day is pocket change. At most it costs me $3 × the days." The spend column shows that number; the cost column is 5.5x it.
2. "Starting 10 years later costs a bit less." It costs **more than half**: true for every whole age from 18 to 55 (checked).

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "What **$3 a day** / costs you by age". Formula bar "= $3 × 365 ÷ 12 = $91.25 a month, at 7%". Columns "Your age" · "You'd spend by 65" · "It costs you by 65" (emphasised). Row 1 "18 · $51,465 · ≈ $400,000". Footer on. | "What **$3 a day** costs you, by age." |
| 0.5-4.5 | Rows 20 → 60 land, one every 0.5 s, biggest first | (VO line 1 continues to 3.6) |
| 4.0 | Pointer to row "25 · $43,800 · ≈ $240,000", label "≈ 5.5× what you'd spend" | "Start at 25: **≈ $240,000**." |
| 7.7 | Pointer to row "35 · $32,850 · ≈ $111,000", label "10 years later" | "Start at 35? **Less than half.**" |
| 8.9 | Verdict "Wait 10 years: **less than half**." + ding | (inside line 3: "less than half") |
| 10.2-12.5 | The full table holds, then the kit resets rows to the frame-1 state for the loop | (none) |

### Guide VO script (24 spoken words, about 9.2 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 3.6 | What **$3 a day** costs you, by age. | "What three dollars a day costs you, by age." |
| 4.0 | 3.5 | Start at 25: **≈ $240,000**. | "Start at twenty-five: about two hundred forty thousand dollars." |
| 7.7 | 2.5 | Start at 35? **Less than half.** | "Start at thirty-five? Less than half." |

### The maths

Inputs: $3 a day; 365 days; 7% a year, compounded monthly (7%/12); deposits at the end of each month; stopping at 65.
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
- **Verdict "Wait 10 years: less than half":** FV(age + 10) ÷ FV(age) is 0.475, 0.465, 0.450, 0.427, 0.391, 0.332 and 0.226 for the 10-year pairs in the table. It is below 0.5 for **every** whole age from 18 to 55 (asserted in the check).
- **Rule of thumb** (pinned comment): 72 ÷ 7 ≈ 10.3 years to double, which is why a decade's delay costs more than half.
- **Pinned comment, at 10% instead:** age 25 → ≈ $577,000; age 18 → ≈ $1,170,000. This matches the hook bank's 10% table.

### Sources

**No real-world inputs.** $3 a day is a hypothetical amount and 7% a year is a stated assumption, not a forecast and not a market figure, and the footer says so. That is deliberate: the hook bank found the comments argue about the rate (Gage: "10% vs 7% vs 8%"), so the rate is printed on screen and the pinned comment invites that argument.

### Assumptions (footer, on screen at t = 0)

> Invested monthly at 7% a year until 65 · no tax, fees or inflation

### Caption / description

> Find your age. That's what $3 a day costs you by 65, if you'd invested it at 7% a year instead of spending it.
> Wait 10 years and it's less than half.
> ($3 × 365 ÷ 12 = $91.25 a month, compounded monthly; no tax, fees or inflation. Maths, not advice.)

### Pinned comment

> Why 7%? It's a round, middle-of-the-road rate, not a prediction. At 10% the 25 row becomes ≈ $577,000 and the 18 row ≈ $1,170,000. Rule of thumb: at 7%, money doubles about every 10 years (72 ÷ 7 ≈ 10.3), which is why waiting a decade costs you more than half. What rate would you plug in?

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

## 02b · Scoreboard · "$1 trillion at your hourly wage"

**Spec:** `studio/specs/02b-scoreboard-trillion-at-your-wage.json` · **14.0 s** · captions on

**Platform title:** $1 Trillion at Your Hourly Wage
**On-screen hook (header):** $1 TRILLION / AT YOUR **HOURLY WAGE**

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw.
   - The title states the rule and never the result.
   - The one constant sits in the footer ("Price of RTX 5090 32GB: ~$4,899"); ours is "2,080 hrs a year (40 × 52)".
   - Scoreboard is HD Guy's look family.
2. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). "by age" becomes "at your hourly wage", with one row for every viewer and the biggest number first (≈ 66.3 million years).
3. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206, the best of his wage reels, https://www.instagram.com/reel/Dd2QzRzRrGT/. The hourly wage works as the filter that pulls the viewer in, never as the goal.
- **Contrasts:**
  - HD Guy's "Wages Visualized In Real Time" got **9,025**. The wage as a running counter flopped, so here the wage is a row, not a counter.
  - The hook bank's rewrite A also had a "$50,000/hr" row. It is dropped here: it is nobody's wage (R4).

**Rules satisfied:**
- **R1:** "$1" in the header plus row 1 "$7.25/hr · ≈ 66.3 million" at 0.0 s.
- **R2:** one input ($1 trillion) and no result.
- **R3:** 13 wage rows from the federal minimum to $1,000/hr.
- **R4:** the rows are wages viewers earn; the trillion is the topical object (see the caption context).
- **R5:** the implied wrong answer is "a big enough wage gets you there".
- **R6:** you, your wage, $1 trillion.
- **R7:** each row is a named wage.
- **R8:** 6 words.
- **R9:** 13 countable rows.
- **R10:** the biggest number is first, at 0.0 s, and the first spoken payoff comes at 0-3.6 s.
- **R11:** the verdict is in the caption.
- **R12:** a single repeatable fact: "even $1,000 an hour takes longer than our species has existed".

**The wrong belief it plays on:** "A trillion is just a lot of millions. A high enough hourly wage would get there." At the federal minimum you'd have had to clock in when the dinosaurs died out, and even $1,000 an hour takes about 1.6 times as long as Homo sapiens has existed.

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "$1 TRILLION / AT YOUR **HOURLY WAGE**". Columns "Your wage" · "Years to earn $1 trillion" (emphasised). Row 1 "$7.25/hr · ≈ 66.3 million". Formula "= $1,000,000,000,000 ÷ (wage × 2,080)". Footer on. | "Federal minimum wage: **≈ 66.3 million years**." |
| 0.35-4.2 | Rows $10/hr → $1,000/hr land, one every 0.35 s | (line 1 continues to 3.6) |
| 3.8 | Pointer to row 1, label "≈ when the dinosaurs died out" | "You'd start when the dinosaurs died out." |
| 7.0 | Pointer to the last row "$1,000/hr · ≈ 481,000", label "Our species: ≈ 300,000 years" | "Even **$1,000 an hour**? Longer than our species has existed." |
| 9.3 | Verdict "Even **$1,000/hr**: longer than our species has existed." + ding | (inside line 3: "Longer than…") |
| 11.8-14.0 | Hold, then a hard cut back to frame 1 for the loop | (none) |

### Guide VO script (28 spoken words, about 10.8 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 3.6 | Federal minimum wage: **≈ 66.3 million years**. | "Federal minimum wage: about sixty-six point three million years." |
| 3.8 | 2.9 | You'd start when the dinosaurs died out. | (as written) |
| 7.0 | 4.8 | Even **$1,000 an hour**? Longer than our species has existed. | "Even a thousand dollars an hour? Longer than our species has existed." |

### The maths

Years = $1,000,000,000,000 ÷ (wage × 2,080 hrs), with 2,080 = 40 hrs × 52 weeks. Every cent is kept, with no raises, no tax and no interest. Results of a million or more are shown to 0.1 million; smaller ones to the nearest 1,000. All of them carry "≈".

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

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **Federal minimum wage $7.25/hr**, in force since 2009-07-24 and still current in 2026 | US Department of Labor, news release "Federal minimum wage increases to $7.25 on July 24", 2009-07-16, https://www.dol.gov/newsroom/releases/esa/esa20090716; DOL Wage and Hour Division, "Minimum Wage", https://www.dol.gov/agencies/whd/minimum-wage | US Bureau of Labor Statistics, CPS annual table 44 (2025 annual averages, published 2026): "The prevailing Federal minimum wage was $7.25 per hour in 2025", https://www.bls.gov/cps/cpsaat44.htm. For 2026: Paycor, "Minimum Wages by State: A Complete Guide for 2026", https://www.paycor.com/resource-center/minimum-wage-by-state |
| **Non-avian dinosaur extinction / Chicxulub impact ≈ 66 million years ago** | Renne et al., "Time Scales of Critical Events Around the Cretaceous-Paleogene Boundary", *Science* 339:684-687, 2013-02-08 (impact 66.038 ± 0.011 Ma; extinction 66.043 Ma). Summarised by the California Academy of Sciences, "Pinpointing date of impact", https://www.calacademy.org/explore-science/pinpointing-date-of-impact; University of Glasgow eprint https://eprints.gla.ac.uk/79877 | American Museum of Natural History, "Did an asteroid kill the dinosaurs?", https://www.amnh.org/explore/videos/dinosaurs-and-fossils/did-asteroid-kill-dinosaurs; Smithsonian Magazine, "The Mass Extinction That Wiped Out the Dinosaurs", https://www.smithsonianmag.com/videos/smg-004-how-did-dinosaurs-die/ |
| **Homo sapiens ≈ 300,000 years old** | Hublin et al., *Nature* 546:289-292, 2017-06-08 (Jebel Irhoud, Morocco, ≈ 315,000 years). Reported by NPR via Michigan Public, "315,000-Year-Old Fossils From Morocco Could Be Earliest Recorded Homo Sapiens", 2017-06-07, https://www.michiganpublic.org/2017-06-07/315-000-year-old-fossils-from-morocco-could-be-earliest-recorded-homo-sapiens | Popular Archaeology (Max Planck Institute release), "Earliest known Homo sapiens just got older" ("at least 300,000 years ago"), https://popular-archaeology.com/article/earliest-known-homo-sapiens-just-got-older |
| *(Caption context only)* **Tesla pay plan for Elon Musk worth up to $1 trillion**, approved by shareholders on 2025-11-06 | Reuters via Business Standard, 2025-11-07, https://www.business-standard.com/world-news/elon-musk-tesla-pay-package-worth-1-trillion-shareholders-approve-125110700092_1.html ("could get as much as $1 trillion in stock over the next decade"; over 75% support) | Anadolu Agency, "Tesla shareholders approve Elon Musk's compensation package", https://www.aa.com.tr/en/economy/tesla-shareholders-approve-elon-musks-compensation-package/3737245; Malay Mail, 2025-11-07, https://malaymail.com/news/money/2025/11/07/worlds-most-expensive-participation-trophy-tesla-investors-hand-musk-a-potential-us1t-to-keep-him-at-the-helm/197433 |

**Verification note:** the egress proxy blocks dol.gov, amnh.org and fred.stlouisfed.org, so those pages could not be opened. Each figure was confirmed from the search-result text of the named page, plus at least one independent publisher. The 66.3 million vs 66 million and 481,000 vs 300,000 comparisons have wide margins (0.5% and 1.6x), so the claims hold even if the dates are refined.

### Assumptions (footer, on screen at t = 0)

> 2,080 hrs a year (40 × 52) · every cent kept · no raises or interest

### Caption / description

> Find your wage. At the federal minimum ($7.25), you'd have had to clock in when the dinosaurs died out. Even $1,000 an hour takes longer than our species has existed.
> (40 hrs × 52 weeks = 2,080 hrs a year; every cent kept; no raises, tax or interest.)
> Why a trillion? In Nov 2025, Tesla shareholders approved a pay plan that could give Elon Musk up to $1 trillion in stock if its targets are hit.

### Pinned comment

> Never sleep, never take a day off: that's 8,766 hours a year. At $7.25 it still takes ≈ 15.7 million years. The maths says hours alone don't get there. Which row is yours?

### Per-platform notes

- **YouTube Shorts.** This is HD Guy's home (Scoreboard look).
  - Title = the hook, with no number in the result slot.
  - Music-only plus the on-screen pointer labels works, the way HD Guy runs on no voice. The VO cut is optional.
  - No end card; hard-cut back to frame 1.
- **TikTok.**
  - The VO cut: "Federal minimum wage…" is a payoff spoken inside 3.6 s.
  - Put the Musk context line in the caption, not on screen: on screen it is the viewer's number (R3/R6), not Elon's.
- **Instagram Reels.**
  - Caption line 1: "Find your wage."
  - Cover: the completed table, with the $7.25 row and the dinosaur pointer visible.

---

## 02c · Clean Sheet · "Your salary is really this per hour"

**Spec:** `studio/specs/02c-clean-sheet-salary-per-hour.json` · **14.0 s** · captions on

**Platform title:** Your Salary Is Really This Per Hour
**On-screen hook (header):** What your salary / really pays **per hour**

### Why this hook

**Modelled on:**
1. **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. "What you **actually** make" becomes "what your salary **really** pays": one word that implies the viewer's number is wrong (R5).
2. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x). A payout noun ("pays"), a dense tier table, and the one constant (÷ 2,080) printed in the column header.
3. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). The "What … by [your attribute]" frame and the self-typing table; the caption gives the task ("Find your salary").

**Rules satisfied:**
- **R1:** row 1 "$30,000 · ≈ $14.42 · ≈ $0.24" at 0.0 s.
- **R2:** no number in the hook; the viewer brings their salary.
- **R3:** 14 salary rows, $30,000-$200,000.
- **R4:** round, familiar salaries.
- **R5:** "really".
- **R6:** your salary, per hour.
- **R7:** each row is a named salary.
- **R8:** 7 words.
- **R9:** 14 countable rows.
- **R10:** first payoff at 0.0 s; the biggest numbers last.
- **R11:** the caption carries the verdict.
- **R12:** a rule you can repeat: "halve it, drop the 000s".

**The wrong beliefs it plays on:**
1. "I know what I make." People know their salary, not their hourly or per-minute rate. Six figures is ≈ $48.08 an hour and ≈ $0.80 a minute.
2. "Salary ÷ 2,000 is my hourly." It is close but 4% high on every row, so the shortcut is printed as "≈" and the exact value sits in the table.
3. *(Pinned comment)* "My hourly is salary ÷ 2,080." Paid time off means you work fewer hours, so your pay per hour actually worked is higher.

### Beat sheet

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "What your salary / really pays **per hour**". Columns "Salary" · "Per hour ÷ 2,080" (emphasised) · "Per minute ÷ 60". Row 1 "$30,000 · ≈ $14.42 · ≈ $0.24". Check line "= salary ÷ 2,080, then ÷ 60". Footer on. | "Your salary, per hour and per minute." |
| 0.3-3.9 | Rows $35,000 → $200,000 land, one every 0.3 s | (line 1 continues to 2.9) |
| 3.2 | Pointer to row "$65,000 · $31.25 · ≈ $0.52", label "≈ US median full-time pay" | "Typical full-timer, **$65,000**: $31.25 an hour." |
| 7.3 | (pointer holds on the same row: the per-minute cell) | "**≈ $0.52** a minute." |
| 9.6 | Verdict "Shortcut: **halve it, drop the 000s.**" + ding | "Shortcut: **halve it, drop the 000s.**" |
| 12.1-14.0 | The finished sheet holds for 2 s or more, then the results clear back to frame 1 for the loop | (none) |

### Guide VO script (28 spoken words, about 10.8 s of speech)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 2.9 | Your salary, per hour and per minute. | (as written) |
| 3.2 | 3.9 | Typical full-timer, **$65,000**: $31.25 an hour. | "Typical full-timer, sixty-five thousand dollars: thirty-one twenty-five an hour." |
| 7.3 | 2.1 | **≈ $0.52** a minute. | "About fifty-two cents a minute." |
| 9.6 | 2.5 | Shortcut: **halve it, drop the 000s.** | "Shortcut: halve it, drop the zeros." |

### The maths

Per hour = salary ÷ 2,080 (40 hrs × 52 weeks). Per minute = per hour ÷ 60. Both are rounded to the cent, with "≈" wherever rounding happened. $65,000 ÷ 2,080 = $31.25 exactly, so it carries no "≈".

| Salary | ÷ 2,080 exact | On screen | ÷ 60 exact | On screen |
|---:|---:|---:|---:|---:|
| $30,000 | 14.4231 | ≈ $14.42 | 0.2404 | ≈ $0.24 |
| $35,000 | 16.8269 | ≈ $16.83 | 0.2804 | ≈ $0.28 |
| $40,000 | 19.2308 | ≈ $19.23 | 0.3205 | ≈ $0.32 |
| $45,000 | 21.6346 | ≈ $21.63 | 0.3606 | ≈ $0.36 |
| $50,000 | 24.0385 | ≈ $24.04 | 0.4006 | ≈ $0.40 |
| $55,000 | 26.4423 | ≈ $26.44 | 0.4407 | ≈ $0.44 |
| $60,000 | 28.8462 | ≈ $28.85 | 0.4808 | ≈ $0.48 |
| $65,000 | 31.2500 | $31.25 | 0.5208 | ≈ $0.52 |
| $70,000 | 33.6538 | ≈ $33.65 | 0.5609 | ≈ $0.56 |
| $80,000 | 38.4615 | ≈ $38.46 | 0.6410 | ≈ $0.64 |
| $90,000 | 43.2692 | ≈ $43.27 | 0.7212 | ≈ $0.72 |
| $100,000 | 48.0769 | ≈ $48.08 | 0.8013 | ≈ $0.80 |
| $150,000 | 72.1154 | ≈ $72.12 | 1.2019 | ≈ $1.20 |
| $200,000 | 96.1538 | ≈ $96.15 | 1.6026 | ≈ $1.60 |

- **"≈ US median full-time pay"** on the $65,000 row: BLS median weekly earnings of $1,251 × 52 = $65,052, which rounds to ≈ $65,000 (0.08% off; asserted to be under 1%). By the week, $1,251 ÷ 40 = $31.275 an hour.
- **Verdict "halve it, drop the 000s"** = salary ÷ 2,000. For example, $65,000 → $32,500 → $32.50, against $31.25 exact. That is 4% high on every row (2,080 ÷ 2,000 = 1.04, asserted for all 14 rows), which is why the shortcut is shown as "≈" and never as the answer in a cell.
- **Pinned comment:** 3 weeks off = 120 hrs, so 1,960 hrs are worked. 2,080 ÷ 1,960 = 1.061, so you earn ≈ 6% more per hour worked. $65,000 ÷ 1,960 ≈ $33.16.

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **Median usual weekly earnings, full-time wage and salary workers, Q2 2026: $1,251** (not seasonally adjusted; 120.9 million workers) | US Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", news release 2026-07-21, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (PDF: https://www.bls.gov/news.release/archives/wkyeng_07212026.pdf) | DWM Magazine, "USBLS announces unemployment and wage rates", 2026-07-24, https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/. Consistency check: BLS TED, "Median weekly earnings were $1,196 in second quarter 2025", https://www.bls.gov/opub/ted/2025/median-weekly-earnings-were-1196-in-second-quarter-2025.htm, and $1,196 × 1.046 (the release's +4.6% a year) = $1,251.0 |

Everything else in 02c is arithmetic on the stated 2,080-hour convention.

### Assumptions (footer, on screen at t = 0)

> 2,080 hrs a year (40 × 52) · before tax · median: BLS, Q2 2026

### Caption / description

> Find your salary. Shortcut: halve it, drop the 000s ($65,000 → ≈ $32.50; exact $31.25). It runs about 4% high because it assumes 2,000 hours, not 2,080.
> The typical US full-time worker earns $1,251 a week (BLS, Q2 2026), about $65,000 a year.
> (Before tax; 40 hrs × 52 weeks.)

### Pinned comment

> Take 3 weeks off and you're still paid for 2,080 hours but only work 1,960. So $65,000 is really ≈ $33.16 per hour actually worked, about 6% more. What's your per-minute?

### Per-platform notes

- **Instagram Reels.**
  - This is Yannick's and Gage's platform. Post the music-only cut first, with captions off.
  - Clean Sheet's white page shows up well in a dark feed.
  - Caption line 1: "Find your salary."
- **TikTok.**
  - The VO cut. The "$65,000: $31.25 an hour" line is the median hook: viewers compare themselves to "typical".
  - Expect comments to argue about 2,080 against the 2,087 hours used for federal pay. That is fine; the footer states 2,080.
- **YouTube Shorts.**
  - Title = the hook.
  - Keep the 2-second hold on the finished sheet: it is the screenshot.

---

## What changed from the seeds, and why

- **02a:**
  - The seed's 7% is kept (the hook bank's rewrite used 10%; 10% is in the pinned comment).
  - A **"You'd spend" column** is added, so the answer the viewer already holds sits beside the real cost (R5).
  - The verdict "less than half" is checked for every whole age, not only the rows shown.
- **02b:**
  - The **federal minimum wage** ($7.25) is the first row: it is the biggest number and a wage some viewers earn.
  - The hook bank's "$50,000/hr" row is dropped (nobody's wage, R4).
  - Two verified anchors turn "millions of years" into something you can feel: the dinosaurs, and our species.
- **02c:**
  - Inside the lane, a **per-minute column** is added, plus a **BLS median pointer** so the viewer can see where they sit.
  - The **halve-it shortcut** is the verdict, with its 4% error stated.

## Open items

- The look kits are still being built. `clean-sheet/formats/find-your-row.js` is a stub, and the clean-sheet kit currently fails to mount (`Identifier 'css' has already been declared`, a kit-side error). So `node src/cli.mjs check` could not lint these specs in the renderer yet. They follow `studio/FORMATS.md` §2 exactly (no extra data fields; the check asserts this). Re-run the studio linter once the kits land.
- For the music-only A versions, render the same spec with `"captions": false` (no other change).
