# Format 1: "N dead simple numbers" (dead-simple-list, hook pattern P1)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 1 of 10, round 2 (revised after the verifier and the hook judge; see the **Review log** at the end)
**Deliverables:**
- Specs:
  - [`studio/specs/01a-clean-sheet-paid-biweekly.json`](../../studio/specs/01a-clean-sheet-paid-biweekly.json)
  - [`studio/specs/01b-live-sheet-20-an-hour.json`](../../studio/specs/01b-live-sheet-20-an-hour.json)
  - [`studio/specs/01c-becker-rig-60k-a-year.json`](../../studio/specs/01c-becker-rig-60k-a-year.json) (file name kept; the topic is now a 3% raise on $60,000)
- Check: [`teasers/v2/checks/01-dead-simple-list.py`](checks/01-dead-simple-list.py). It passes 240 checks with 0 failures.
- Mutation test: the check caught 10 of 10 deliberately broken spec copies: a $50-rounded result (`≈ $2,950`), a "≈" on an exact result, a wrong VO number, an off-beat `resultT`, a VO line read too fast, an unsupported `lookOpts.gag`, a VO line after the verdict card, a wrong label digit, a missing "≈", and a verdict that no longer matches the maths.
- Studio linter (`node src/cli.mjs check`): 3/3 clean, 0 errors, 0 warnings (safe zones, type floor, overlap, contrast, fonts, R1), re-run after every fix.
- Stills checked by eye at frames 0, 2.7-3.2 s, each payoff, the verdict and the last frame.

**Evidence base:**
- The benchmark only: [`research/v2/02-hook-bank.md`](../../research/v2/02-hook-bank.md), [`research/v2/04-formats.md`](../../research/v2/04-formats.md) (rank 1), and the watch studies of Master Money, Yannick and Jake.
- The looks come from [`research/v2/03-look-directions.md`](../../research/v2/03-look-directions.md) (Clean Sheet, Live Sheet) and [`research/v2/watch/alan-becker.md`](../../research/v2/watch/alan-becker.md) sections 3, 4 and 6 (Becker rig). Beat sheets describe what each kit's `formats/dead-simple-list.js` actually renders.

---

## (a) The format in 5 lines

1. **Mechanic.**
   - One example income sits in slot 1 of an empty numbered list.
   - Each slot types `input × constant`, then resolves to an answer with a unit.
   - The finished screen is a cheat sheet built on one person's numbers.
2. **Hook.**
   - The header is "[N] DEAD SIMPLE NUMBERS / [the stake + one word that implies a wrong answer]", with the empty slots visible at 0.0 s. The model is H84's "That Tell You What / You Actually Make".
   - The first spoken line is the first calculation ("Take your salary and multiply it by 0.7…"), with no greeting.
3. **Pace.** The first answer lands by 3 s, then one payoff every 4-7 s. Lengths run 26-44 s. There are 0 cuts.
4. **Evidence.** The format broke out on 4 benchmark accounts:

   | Account | Video | Views | Multiple | URL |
   |---|---|---:|---|---|
   | Master Money | "Four dead simple ways to figure out what you actually make!" | 3,000,000 | 140x | https://www.tiktok.com/@mastermoneyco/video/7680913784143105310 |
   | Master Money | IG mirror of the same reel | 1,700,000 | 27.8x | https://www.instagram.com/reel/DcyPOmNxMYP/ |
   | Jake | "How to be financially free (in 5 steps)" | 983,900 | 36.3x | https://www.instagram.com/reel/DcWOomPDl9Y/ |
   | Master Money | "Four dead simple numbers for buying a car" | 554,900 | 35.6x | https://www.tiktok.com/@mastermoneyco/video/7678730090670296350 |
   | Yannick | "Do all 5 and watch your finance change" | 115,845 | 67.1x | https://www.instagram.com/reel/DbMUONdvGcr/ |
   | Yannick | "Do all 4 if you make $20/hr…" | 50,206 | 2.8x med | https://www.instagram.com/reel/Dd2QzRzRrGT/ |

5. **Pitfalls the benchmark shows.**
   - **The template is saturated.** 20 of 57 other outliers in Master Money's search used the generic "financially free (in N steps)". Jake's remake did 14,232 (0.29x med).
   - **A filter header alone is weak.** Yannick's "Do all 4 if you make $20/hr" did 50,206 (2.8x med) and its $25/hr twin 10,159 (0.6x med); the payoff-noun header "What You Actually Make" did 3,000,000 (140x).
   - **Constants drift.** Master Money mixes 50- and 52-week years.
   - **Every watched winner has a presenter.** So the typed list must carry the frame on its own.
   - **Our response:**
     - one concrete topic and one insight per episode;
     - a header that names the stake and implies the wrong number (R5);
     - one calendar for the whole series (52 weeks, 12 months, 365 days, 40 × 52 = 2,080 work hours), printed where it is used;
     - one footer line for each rough constant;
     - "≈" on every rounded result, and one rounding rule: every result is the visible formula rounded to $1 (or 1¢ when cents are shown).

---

## Decisions that apply to all three

- **Lane discipline (lane 1: paychecks and wages turned into rough numbers).**
  - **01c moved off "salary → real hourly".** Lane 2 (find-your-row) owns that topic by name, and `02c-clean-sheet-salary-per-hour.json` already shows the $60,000 row as ≈ $28.85 an hour and ≈ $0.48 a minute. 01c is now **what a 3% raise on $60,000 is per month, week and day**. No other format touches raises.
  - **One insight per teaser.** 01a owns "a year is 52 weeks, not 48" (26 paychecks, not 24). 01b dropped its "a month is 4 weeks, $3,200" trap, which was the same 8.3% insight, and is now purely gross → take-home. 01c is the raise.
  - **No pricing in hours of work** (lane 8) and no salary → hourly conversion (lane 2). 01c divides by calendar units only (12, 52, 365), never by 2,080 hours.
- **Series header grammar (the same in all three).**
  - Line 1 is the series phrase with the slot count: "3/4 DEAD SIMPLE NUMBERS".
  - The rest names the stake and carries one R5 word, in H84's "That Tell You What / You Actually Make" grammar: "THE PAY YOUR BUDGET **FORGETS**", "WHAT $20/HR **ACTUALLY** LANDS", "WHAT A 3% RAISE ON $60,000 **ACTUALLY** PAYS YOU".
  - Round 1's "IF YOU …" filter line (Yannick's H57 grammar, 50,206 at 2.8x med) is gone: it was the weaker half of the pattern.
- **One calendar.** 52 weeks, 12 months, 365 days; work hours = 40 × 52 = 2,080, printed in 01b's footer and slot note. 01a counts paydays (364 ÷ 14 = 26). No slot mixes 50 and 52 weeks.
- **The "≈" and rounding policy.** A result gets "≈" exactly when it is rounded or rests on the rough ×0.85 tax rule. Every result equals its visible formula rounded to $1 (or 1¢ when cents are shown), so anyone who redoes a formula on screen gets the number on screen. The check script re-evaluates every typed formula to enforce this. 01c also prints the exact value beside its two rounded results ("exact $34.62", "exact $4.93").
- **Non-breaking spaces** (` ` in the JSON) keep a highlight or a rule on one rendered line: "13 months" (01a verdict), "× 0.85" (01b footer), "≈ $5 a day" and "pay before tax" (01c). The check script expects them.
- **Kit contract.** Each spec uses only `lookOpts` keys its kit reads (clean-sheet: none; live-sheet: `labels`; becker-rig: `hits`), and the last VO line is the verdict line, because every kit's chrome replaces the captions with the verdict card from `verdict.t`. The check script enforces both.
- **Risk: the series name.** "DEAD SIMPLE NUMBERS" is Master Money's own branded phrase, and `04-formats.md` says to use "a series name of our own".
  - I kept it because it is the seed the owner approved and the format's id.
  - If the owner wants it swapped, "ROUGH-BUT-RIGHT NUMBERS" fits the brand and the header widths. It is a one-line edit in each spec and in `EXPECT` in the check script.

---

## (b) The teasers

### 01a · Clean Sheet · "3 DEAD SIMPLE NUMBERS / PAID EVERY 2 WEEKS? THE PAY YOUR BUDGET FORGETS"

- **Spec:** `studio/specs/01a-clean-sheet-paid-biweekly.json`, 26.0 s
- **Look:** Clean Sheet. Off-white card, typeset formulas in grey mono, results on highlighter boxes, circled step numbers. The formula stays above its result, so the sheet builds into worked maths. At this spec's size the kit's layout engine sets each step as a formula row (the note after the formula: `$2,500 × 26 =  not × 24`) over a result row, with the step label beside the result, arriving just after it (checked in stills).
- **Platform title:** "Paid every 2 weeks? The pay your budget forgets" (9 words, no result)
- **On-screen hook (header):** `3 DEAD SIMPLE NUMBERS` / `PAID **EVERY 2 WEEKS**? THE PAY YOUR BUDGET FORGETS` (13 words). The kit renders it on 3 lines: "3 DEAD SIMPLE NUMBERS / PAID EVERY 2 WEEKS? THE / PAY YOUR BUDGET FORGETS", inside the y 252-440 band.
- **Input row at 0.0 s:** `Your paycheck` **`$2,500`** (yellow) `every 2 weeks`

**The wrong belief it exploits:** "Every 2 weeks" = twice a month = 24 paychecks = **$60,000**, and a monthly budget built on 2 checks. In fact there are 26 paydays (364 ÷ 14). Ten months bring 2 checks and two months bring 3, so the 2 extra checks add up to a whole 13th month of pay that a 2-checks-a-month budget never counts. The header names it ("the pay your budget forgets"); the wrong multiplier shows as "not × 24" at about 3.1 s and is voiced at 4.5 s; slot ③'s label resolves it ("The 2 checks your budget forgets").

**Modelled on (grammar stolen):**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x; IG mirror 1,700,000, 27.8x. We copy the series line over a payoff-noun line, slot 1 typing at frame 1, and the spoken opener "Take your salary and multiply it by 0.7…", which becomes "Your paycheck, times 26".
- **H48, Debt Freedom:** a frame-1 question that names the situation, with a verdict caption. 1,900,000, 902.5x. We copy the question mark on "PAID EVERY 2 WEEKS?" and the side-taking caption.
- **H76, Jake:** "How to be financially free (in 5 steps)". 983,900 views, 36.3x. We copy the empty numbered list plus a first formula inside the first second.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 $ number at 0.0 s | yes | Input "$2,500" on the yellow highlighter; slot ① is the active step, its formula typing from 0.0 s |
| R2 one input, never the result | yes | The header has no $ figure; the only input is $2,500; $65,000 is withheld until 2.7 s |
| R3 viewer's own number | yes | "Your paycheck, times 26" works on any biweekly check. Biweekly is the most common US pay period (43.0% of private establishments, BLS CES) |
| R4 small, round, familiar | yes | $2,500 every 2 weeks ≈ the median full-time US paycheck (BLS Q2 2026 median $1,251 a week × 2 = $2,502) |
| R5 implies a wrong answer | yes | "THE PAY YOUR BUDGET FORGETS" in the header; "not × 24" after ①'s formula from ≈3.1 s; voiced at 4.5 s |
| R6 stake | yes | You, $2,500, a year |
| R7 named, not a label | yes | "Paid every 2 weeks?" names the viewer's situation |
| R8 ≤ 15 words | yes | 13 words, 3 rendered lines |
| R9 countable loop | yes | ① ② ③ visible and empty at 0.0 s |
| R10 first payoff ≤ 3 s; biggest number first or last | yes | $65,000 at 2.7 s, and it is the biggest number on screen |
| R11 question on screen, verdict in caption | yes | "PAID EVERY 2 WEEKS?" on screen; the caption takes a side ("your monthly budget is wrong, in your favor") |
| R12 a verdict | yes | "13 months of pay a year" can be repeated in a comment |

**Beat sheet** (VO timed at 2.6 words/s; times match the spec and the clean-sheet kit)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** header (3 lines, "EVERY 2 WEEKS" on yellow); footer "ASSUMES 26 paydays a year (some years have 27) · pay before tax"; input row "Your paycheck **$2,500** every 2 weeks"; ① filled (active) with the caret; ② ③ empty circles; caption band under the hairline | "Your paycheck, times 26. On $2,500: $65,000 a year." |
| 0.0-0.8 | ① types `$2,500 × 26 =` | (same line) |
| 2.7 | ① **$65,000** wipes in on the green highlighter with a pop | (same line, on "$65,000") |
| ≈3.0-3.1 | Label "Your real yearly pay" beside $65,000; note "not × 24" after the formula | (same line) |
| 4.5 | The sheet holds | "Not times 24: that's only $60,000." |
| ≈7.1 / 7.4 | ② fills, then types `$2,500 × 2 =` | "A normal month: 2 checks, $5,000." |
| 9.3 | ② **$5,000** on the sand (neutral) highlighter; ① rests to 42%; label "A normal month (2 checks)" beside it and note "10 months a year" after the formula at ≈9.6-9.7 | (same line, on "$5,000") |
| 10.4 | ③ types `$65,000 − $60,000 =` | "12 normal months: $60,000." |
| 12.6 | The formula waits, caret blinking | "From $65,000, that leaves $5,000." |
| 14.5 | ③ **$5,000** on the blue goal highlighter, larger, with a ding; label "The 2 checks your budget forgets" beside it at ≈14.8 | (same line, on "$5,000") |
| 15.6 | The finished sheet holds | "It's your 2 extra checks, from the 2 months with 3 paydays." |
| 20.5 | Verdict replaces the captions: "Every 2 weeks = / **13 months** of pay a year" ("13 months" on blue); ding | "That's a 13th month of pay. Every year." |
| 23.7-25.3 | Hold on the finished sheet | none |
| 25.3-26.0 | Results clear back to the frame-1 state (the kit's loop) | none |

Payoffs land at 2.7, 9.3 and 14.5 s, and the verdict at 20.5 s: gaps of 6.6, 5.2 and 6.0 s.

**Full guide VO script (01a, 26 s)**
> Your paycheck, times 26. On $2,500: $65,000 a year. Not times 24: that's only $60,000. A normal month: 2 checks, $5,000. 12 normal months: $60,000. From $65,000, that leaves $5,000. It's your 2 extra checks, from the 2 months with 3 paydays. That's a 13th month of pay. Every year.

Read the numbers as: "twenty-five hundred", "sixty-five thousand", "sixty thousand", "five thousand", "thirteenth".

**The maths** (every on-screen number)

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $2,500 (input) | input | example paycheck, gross | 2,500 |
| 26 | 364 days ÷ 14 | biweekly calendar | 26 |
| **$65,000** (①) | $2,500 × 26 | | 65,000 (exact) |
| not × 24 (note) | 2 checks × 12 months | the twice-a-month guess | 24 |
| **$5,000** (②) | $2,500 × 2 | 2 paydays in a normal month | 5,000 (exact) |
| 10 months a year (note) | 12 − (26 − 24) | months with 2 paydays | 10 |
| $60,000 (③ formula, VO) | $5,000 × 12 = $2,500 × 24 | 12 normal months = the × 24 figure | 60,000 |
| **$5,000** (③) | $65,000 − $60,000 | | 5,000 (exact) |
| "The 2 checks…" (③ label) | 26 − 24 = 2 extra checks; 2 × $2,500 | | 5,000 |
| 13 months (verdict) | $65,000 ÷ $5,000 | | 13 (exact) |
| 27 (footer) | 26 + 1 | some years fit 27 paydays | 27 |

Calendar check, simulated in the check script over 2000-2099 for both alternate-Friday cycles:
- Every 26-payday year has exactly 2 months with 3 paydays.
- Every 27-payday year has exactly 3 such months.
- 27-payday years come about 1 year in 11 (11.8 in the sample; 11.3 in theory, since 14 ÷ 1.2425 days of drift a year = 11.3).

**Sources:** none of the on-screen numbers needs an outside figure; they are calendar arithmetic on an example paycheck. Two context facts are used in this write-up only, not on screen and not in the caption:
- BLS, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", released 2026-07-21: median full-time earnings $1,251 a week (not seasonally adjusted). https://www.bls.gov/news.release/archives/wkyeng_07212026.htm
- BLS Current Employment Statistics, "Length of pay periods in the CES survey": biweekly is the most common pay period, 43.0% of private establishments (Feb 2023), against weekly at 27.0%. https://www.bls.gov/ces/publications/length-pay-period.htm

**Assumptions (footer, on screen from 0.0 s):** `ASSUMES 26 paydays a year (some years have 27) · pay before tax`

**Caption / description (verdict in the caption, R11):**
> Paid every 2 weeks? Your monthly budget is wrong, in your favor: 26 paychecks is 13 months of pay. $2,500 a check is $65,000 a year, not $60,000. Run yours: paycheck × 26, minus 12 months of 2 checks. (Gross, before tax.)
> #paycheck #biweekly #moneymath #budgeting

**Pinned comment:**
> About 1 year in 11, the calendar fits 27 paydays instead of 26. On $2,500 checks that year is $67,500. Has your payroll had one yet?

**Per-platform notes**
- **YouTube Shorts:**
  - Use the platform title above. Frame 1 is a complete question (header plus input row) and serves as the thumbnail.
  - Captions are burned in from the VO.
  - The clear-to-blank ending lets the Short loop.
- **Instagram Reels:**
  - Set the cover to frame 1, with the empty slots showing. Yannick's reels show that a blank-looking page cover can still work if the header carries the hook.
  - Caption line 1 is the verdict.
  - No keyword CTA: in the benchmark, CTAs lift comments, not views, and none of the 1M+ hooks had one.
- **TikTok:**
  - Keep the header inside the band from y 240 to 440 (it renders at y ≈ 255-430).
  - The search terms "paid every 2 weeks" and "biweekly paycheck" belong in the caption's first line.
  - The 27-payday pinned comment is the reply bait (comments argue about inputs).

---

### 01b · Live Sheet · "3 DEAD SIMPLE NUMBERS / WHAT $20/HR ACTUALLY LANDS"

- **Spec:** `studio/specs/01b-live-sheet-20-an-hour.json`, 27.0 s
- **Look:** Live Sheet. Designed spreadsheet on black, a yellow title banner, a "≈" formula bar showing the working, rows that fill one cell at a time, and green (earned) against red (the gross figure in the verdict). The sheet's row numbers do the job of the empty "1. 2. 3.". `lookOpts.labels: "always"` labels every row from frame 1 (the kit's open-loop variant).
- **Platform title:** "What $20 an hour actually lands each month"
- **On-screen hook (header):** `3 DEAD SIMPLE NUMBERS` / `WHAT **$20/HR** ACTUALLY LANDS` (9 words)
- **Input row at 0.0 s:** mint header row `Your pay · 40 hrs a week | $20/hr`

**The wrong belief it exploits:** "$20 an hour is $41,600 a year, so about $3,467 a month." That is the pay on paper. After 2026 federal income tax and Social Security + Medicare (single filer, before state tax), about 85 cents of each dollar lands: **≈ $2,947 a month**, or about $17 of every $20 hour. The correction runs one way only, from the gross figure down to the take-home figure.

**Modelled on:**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x. We copy the payoff-noun header with "actually", the "Take your … times …" opener, and the shrink-to-the-truth path (the biggest number first, then a smaller true figure). His step 1 is the same idea (`$72,000 * 0.7` for tax).
- **H57, Yannick:** "Do all 4 if you make $20/hr and watch your finance change". 50,206 views, 2.8x med; the best of his wage reels. We copy the wage, as the stake inside the header rather than as a filter line.
- **H87, Master Money:** "5 Dead Simple Numbers That Tell You / WHAT YOU CAN ACTUALLY SPEND", 35,520 (3.3x med). The caution: "actually" alone does not carry a hook, so our header puts the viewer's wage in it and the first VO line ends on "On paper."
- **Live Sheet's formula bar as proof** (Debt Freedom, H48, 902.5x): every result is typed as a formula first.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "$20/HR" in the header and the input row; the formula bar is typing `= $20 × 2,080 hrs` at 0.0 s |
| R2 | yes | One $ figure in the header, and it is the input |
| R3 | yes | "Take your hourly pay, times 2,080" applies to any wage; the caption gives the whole rule |
| R4 | yes | $20/hr is Yannick's best-performing wage input |
| R5 | yes | "ACTUALLY LANDS" in the header; the first VO line ends "On paper." at ≈5.4 s |
| R6 | yes | You, $20 an hour, a month and a year |
| R7 | yes | The wage names the viewer |
| R8 | yes | 9 words |
| R9 | yes | 3 labelled empty rows at 0.0 s: "A year, on paper / A month, on paper / A month, kept" |
| R10 | yes | $41,600 at 2.7 s, and it is the biggest number, first |
| R11 | partly | A promise header; the verdict is in the caption |
| R12 | yes | "≈ $2,947 a month lands of the $3,467 you earn"; "every $20 hour lands as about $17" |

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** yellow banner header (2 lines; "$20/HR" in a black chip); formula bar `≈ │ = $20 ×` mid-typing; mint input row "Your pay / 40 hrs a week │ $20/hr" (dashed outline: the formula is using it); rows 1-3 labelled, results empty; selection on row 1's result cell; footer "ASSUMES 40 hrs × 52 wks · × 0.85 ≈ left after 2026 federal tax + FICA, single, before state tax" under the card; captions pop word by word | "Take your hourly pay, times 2,080: $41,600 a year. On paper." |
| 2.7 | Row 1 snaps to **$41,600** (green) with a flash and a tick; the formula drops into the row as the grey working line `$20 × 2,080 hrs`; tooltip "2,080 hrs = 40 × 52" | (same line, on "$41,600") |
| 6.0 | Tooltip open | "A month is a year divided by 12. About $3,467." |
| 7.9 | Selection slides to row 2; the bar types `= $41,600 ÷ 12` | (on "divided by 12") |
| 9.5 | Row 2 → **≈ $3,467**; tooltip "before any tax" | (on "About $3,467") |
| 10.5 | | "Now tax: you keep about 85 cents a dollar." |
| 12.4 | Selection to row 3; the bar types `= $3,467 × 0.85` | (on "85 cents") |
| 14.2 | | "That's about $2,947 a month, before state tax." |
| 15.0 | Row 3 **counts up** to **≈ $2,947** over ≈0.8 s and the row wipes yellow; tooltip "after federal tax + FICA" | (on "$2,947") |
| 17.9 | The finished sheet holds | "Every $20 hour lands as about $17." |
| 20.9 | Verdict card in the caption band: "**≈ $2,947** a month lands / of the __$3,467__ you earn" ($3,467 in red); the result column flashes top to bottom; ding | "Of the $3,467 you earn, about $2,947 lands." |
| 24.8-26.5 | Hold (the table is the screenshot) | none |
| 26.5-27.0 | Cells clear back to frame 1 (loop) | none |

Payoffs land at 2.7, 9.5 and 15.0 s, and the verdict at 20.9 s: gaps of 6.8, 5.5 and 5.9 s.

**Full guide VO script (01b, 27 s)**
> Take your hourly pay, times 2,080: $41,600 a year. On paper. A month is a year divided by 12. About $3,467. Now tax: you keep about 85 cents a dollar. That's about $2,947 a month, before state tax. Every $20 hour lands as about $17. Of the $3,467 you earn, about $2,947 lands.

Read the numbers as: "twenty eighty", "forty-one thousand six hundred" (or "forty-one six"), "thirty-four sixty-seven", "eighty-five cents", "twenty-nine forty-seven", "twenty", "seventeen". The timings assume these short readings; "three thousand four hundred sixty-seven" in full would need about 0.6 s more per line.

**The maths**

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $20/hr | input | example wage | 20 |
| 2,080 hrs | 40 × 52 | full-time hours a year (series constant) | 2,080 |
| **$41,600** | $20 × 2,080 | | 41,600 (exact) |
| **≈ $3,467** | $41,600 ÷ 12 | | 3,466.67 → $3,467 |
| × 0.85 | rough keep rate | see the tax check below | 0.85 |
| **≈ $2,947** | $3,467 × 0.85 | | 2,946.95 → $2,947 (on the unrounded month: 2,946.67 → $2,947) |
| about $17 (VO) | $20 × 0.85 | | 17 (exact keep: $17.12) |

**Tax check behind ×0.85** (2026, single filer, standard deduction, wages only)
- Taxable income = $41,600 − $16,100 = $25,500.
- Federal income tax = 10% × $12,400 + 12% × ($25,500 − $12,400) = $1,240 + $1,572 = **$2,812.00**.
- FICA = 7.65% × $41,600 = **$3,182.40** (6.2% Social Security, below the $184,500 wage base, plus 1.45% Medicare).
- Net = $35,605.60 a year, a keep rate of **85.6%**.
  - So "about 85 cents a dollar" is within 1 cent, and the ×0.85 rule is within 0.6 points of the exact rate.
  - The exact net is **$2,967.13** a month. The on-screen rule gives ≈ $2,947, 0.68% low; the "≈" covers it, and the check script holds it to ±1%.

**Sources** (two independent sources for each tax parameter, because these figures could be wrong)
- **2026 standard deduction, single, $16,100.**
  - IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill", 2025-10-09. https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
  - CPA Practice Advisor, "IRS Adjusts Tax Brackets, Standard Deduction for 2026", 2025-10-09. https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/
- **2026 single brackets:** 10% to $12,400; 12% from $12,400 to $50,400 ("$1,240 plus 12% of the excess over $12,400").
  - IRS, Rev. Proc. 2025-32 (2025-10-09). https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
  - Tax Foundation, "2026 Tax Brackets and Federal Income Tax Rates" (publication date not captured). https://taxfoundation.org/data/all/federal/2026-tax-brackets/
- **FICA:** 6.2% Social Security on earnings up to $184,500, and 1.45% Medicare on all earnings, for 2026.
  - SSA, "2026 Social Security Changes" fact sheet (released with the 2026 COLA, October 2025). https://www.ssa.gov/cola/factsheets/2026.html
  - Kiplinger, "Six Changes to Social Security in 2026": the $184,500 wage base (date not captured). https://www.kiplinger.com/retirement/social-security/changes-coming-to-social-security-in-2026
  - The 7.65% employee rate is statutory and unchanged.

**Assumptions (footer):** `ASSUMES 40 hrs × 52 wks · × 0.85 ≈ left after 2026 federal tax + FICA, single, before state tax`. The maths ignores state tax, benefit premiums and 401(k) deferrals; the VO says "before state tax" and the pinned comment invites the rest.

**Caption / description:**
> $20 an hour is $41,600 a year on paper, about $3,467 a month. After 2026 federal tax + Social Security & Medicare (single, before state tax), about $2,947 a month lands: roughly $17 of every $20 hour. Run yours: hourly × 2,080 ÷ 12 × 0.85.
> #hourlywage #paycheck #moneymath #takehomepay

**Pinned comment:**
> The 0.85 is federal income tax + FICA for a single filer at $41,600 in 2026 (exactly 85.6%, so $2,967 a month). Your state takes its own slice, or none. What does your state do to the $2,947?

**Per-platform notes**
- **YouTube Shorts:** use the title above. Thanks to the formula bar and the grey working lines, the finished sheet works as a screenshot: it holds for 2 s before the clear.
- **Instagram Reels:**
  - The cover is frame 1, with the 3 labelled empty rows showing ("A month, kept" is the tease).
  - The wage reels in our benchmark live on IG (Yannick).
  - The caption leads with the verdict.
- **TikTok:**
  - "$20 an hour" is a heavily searched phrase, so put it in the first caption line.
  - If the owner wants a series, the same spec re-runs at $15, $25 and $30 (re-check the keep rate per wage: it moves with the bracket).

---

### 01c · Becker rig · "4 DEAD SIMPLE NUMBERS / WHAT A 3% RAISE ON $60,000 ACTUALLY PAYS YOU"

- **Spec:** `studio/specs/01c-becker-rig-60k-a-year.json`, 26.5 s
- **Look:** Becker rig. A light void with a floor gradient; our own one-colour (green) stick figure, the only saturated colour; maths in neutral ink. The list is a stack of numbered ledges, each with a label (dim until reached) and a dashed empty socket. For each slot a white glyph block drops in beside the figure and types its formula in mono; he winds up and hits it (`lookOpts.hits`: kick, chop, kick, then a two-fisted slam for the goal); the block snaps into the result with hit lines, chips, a shake and a thud, and the result is knocked into its socket. He stomps the trapdoor in his ledge and drops to the next slot. The goal lands on a gold plate with the big impact (white flash, camera punch, cash), a "yes!" fist pump, and he points back at it.
- **Platform title:** "What a 3% raise on $60K actually pays you"
- **On-screen hook (header):** `4 DEAD SIMPLE NUMBERS` / `WHAT A 3% RAISE ON **$60,000**` / `ACTUALLY PAYS YOU` (13 words; "$60,000" in green)
- **No separate input line:** the header already carries $60,000 (the kit's default), and slot 1's block is typing `$60,000 × 3%` at 0.0 s.

**The wrong belief it exploits:** "$1,800 is a real raise." It is: $1,800 a year. Re-expressed in the units people spend in, it is $150 a month, about $35 a week and **about $5 a day**, before tax. Nothing is hidden or wrong in the $1,800; the surprise is how small it is per day, which is what "actually pays you" promises. After federal tax and FICA it is about $4 a day (pinned comment).

**Modelled on:**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x. We copy the "actually" header and the opener "Take your salary and multiply it by 0.7…", which becomes "Take your salary, times 3%".
- **H86, Master Money:** "4 DEAD SIMPLE NUMBERS / FOR BUYING A CAR". 554,900 views, 35.6x. We copy the biggest number as the input at 0.0 s, with every later number smaller.
- **H55, Yannick:** "Do all 5 and watch your finance change". 115,845 views, 67.1x. We copy the countable empty slots and the first formula inside 2 s.
- **H73, The Market Hustle:** "$10 each day = $930 by the end of the year", 46,137 (1.1x med): the per-day re-expression, here run downward.
- **Becker devices** (look reference, not benchmark; `alan-becker.md` sections 4 and 6): numbers as objects, operators as hits the figure performs, results as transformations, and one escalation (kick → chop → kick → slam) toward the smallest number.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "$60,000" in the header at 0.0 s; slot 1's block typing `$60,000 × 3%` |
| R2 | yes | One $ figure in the header (the input); 3% is a rate, not a result |
| R3 | yes | "Take your salary, times 3%" works on any salary and any raise; the caption gives the rule |
| R4 | yes | $60,000 is a round salary a little under median full-time pay ($1,251 a week × 52 = $65,052, BLS Q2 2026); 3% sits just under 2026 raise budgets (3.4-3.5%) |
| R5 | yes | "ACTUALLY PAYS YOU" implies the headline $1,800 overstates it; beaten at 16.9 s by ≈ $5 a day |
| R6 | yes | You, $60,000, a raise, a year down to a day |
| R7 | yes | Names the viewer's situation (a raise on a salary), not a label |
| R8 | yes | 13 words, 3 lines |
| R9 | yes | 4 numbered, labelled ledges with empty sockets at 0.0 s |
| R10 | yes | $1,800 at 2.7 s; the biggest number ($60,000) is first and the smallest (≈ $5) is last |
| R11 | partly | A promise header; the verdict is in the caption |
| R12 | yes | "≈ $5 a day" against "$1,800" is lopsided and repeatable |

**Beat sheet** (the becker-rig kit's grammar)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** light void; header (3 lines, "$60,000" in green); mono footer "ASSUMES a 3% raise (example) · pay before tax"; 4 numbered ledges "Your raise, a year / A month / A week / A day" with dashed empty sockets; slot 1's white block already typing `$60,0…` beside the figure, who stands at the right end of ledge 1 | "Take your salary, times 3%: a $1,800 raise." |
| ≈2.3-2.7 | Wind-up, then a **kick**: the block snaps to **$1,800** (hit lines, chips, shake, thud) and is knocked into socket 1 | (same line, on "$1,800") |
| ≈4-6 | He stomps the trapdoor and drops to ledge 2 | "Now watch it shrink." |
| 6.6 | Block `$1,800 ÷ 12` drops in and types | "A month: divide by 12. $150." |
| 8.5 | **Chop** → **$150** into socket 2 | (on "$150") |
| ≈9-10 | Drop to ledge 3 | |
| 10.2 | Block `$1,800 ÷ 52` | "A week: divide by 52. About $35." |
| 12.5 | **Kick** → **≈ $35** into socket 3; note "exact $34.62" | (on "$35") |
| ≈13-14 | Drop to ledge 4 (the floor) | |
| 14.2 | Block `$1,800 ÷ 365` | "A day: divide by 365. About $5." |
| 16.9 | Crouched two-fisted **slam** → **≈ $5** on the gold plate: white flash, camera punch, cash; note "exact $4.93"; "yes!" fist pump, then he points back at it | (on "$5") |
| 18.4 | Verdict replaces the captions: "A 3% raise on $60,000 / ≈ **$5 a day**, before tax" with a green swoosh under "$5 a day"; ding (chrome) | "$1,800 sounded big. It's about $5 a day, before tax." |
| 22.7-26.5 | Hold on the finished sheet, the figure pointing at the gold plate (this kit holds rather than clearing) | none |

Payoffs land at 2.7, 8.5, 12.5 and 16.9 s, and the verdict at 18.4 s: gaps of 5.8, 4.0, 4.4 and 1.5 s.

**Full guide VO script (01c, 26.5 s)**
> Take your salary, times 3%: a $1,800 raise. Now watch it shrink. A month: divide by 12. $150. A week: divide by 52. About $35. A day: divide by 365. About $5. $1,800 sounded big. It's about $5 a day, before tax.

Read the numbers as: "three percent", "eighteen hundred", "a hundred fifty", "fifty-two", "thirty-five", "three sixty-five", "five".

**The maths**

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $60,000 | input | example salary | 60,000 |
| 3% | input | example raise (footer) | 0.03 |
| **$1,800** | $60,000 × 3% | | 1,800 (exact) |
| **$150** | $1,800 ÷ 12 | | 150 (exact) |
| **≈ $35** | $1,800 ÷ 52 | | 34.615 → $35; note "exact $34.62" |
| **≈ $5** | $1,800 ÷ 365 | | 4.932 → $5; note "exact $4.93" (÷ 366 in a leap year: 4.918 → $5) |
| about $4 a day (pinned comment only) | $1,800 × (1 − 0.12 − 0.0765) ÷ 365 | 12% federal bracket + 7.65% FICA, single, 2026 | 3.96 → $4 |

**Marginal-rate check behind the pinned comment** (2026, single filer, standard deduction)
- Taxable income before the raise = $60,000 − $16,100 = $43,900; after it, $45,700. Both sit inside the 12% bracket ($12,400-$50,400), so every raise dollar is taxed at 12% federal.
- FICA on the raise = 7.65% × $1,800 = $137.70 ($61,800 is far below the $184,500 wage base). Federal = 12% × $1,800 = $216.00. The check script recomputes both by differencing the full tax on $61,800 and $60,000: $353.70.
- Kept: $1,446.30 a year = **$3.96 a day**. "About $4" holds even with a state tax of up to 8% on top ($3.57 a day).

**Sources**
- No on-screen number needs an outside figure: the raise is labelled "(example)" in the footer, and the rest is division.
- **Context for R4 (write-up only): 3% is a slightly-below-average 2026 raise.**
  - The Conference Board, 40th annual Salary Budget Survey (released 2025-09-03; 460 US compensation leaders, surveyed 2025-05-19 to 06-20): 3.4% average salary increase budgets for 2026, the same as actually paid in 2025. Via WorldatWork Workspan Daily, "Conference Board Projects 3.4% U.S. Pay Increase Budgets for 2026". https://worldatwork.org/publications/workspan-daily/conference-board-projects-3-4-u-s-pay-increase-budgets-for-2026 (search extract; also lists Payscale 3.5%, WorldatWork 3.6% and WTW 3.5% for 2026). Publisher page: https://www.conference-board.org/publications/US-salary-increase-budgets-2025-2026
  - Mercer, "2026 actual increase budgets (US)": mean merit increase actually paid in 2026 of 3.1% (756 employers, March 2026 survey), against 3.2% projected in October 2025. https://www.imercer.com/articleinsights/2026-actual-increase-budgets-us (read from a search extract; a direct fetch was blocked by this session's proxy).
- **Tax parameters for the pinned comment:** the same 2026 standard deduction, 12% bracket and FICA sources as 01b.
- **$60,000 against the median:** BLS Q2 2026 median full-time pay of $1,251 a week; source as in 01a.

**Assumptions (footer):** `ASSUMES a 3% raise (example) · pay before tax`. "A day" is a calendar day (÷ 365), consistent with ÷ 12 months and ÷ 52 weeks; no slot divides by work hours.

**Caption / description:**
> A 3% raise on $60,000 is $1,800 a year: $150 a month, about $35 a week, about $5 a day. Before tax. Run yours: salary × 0.03 ÷ 365.
> #raise #salary #moneymath #payraise

**Pinned comment:**
> After 2026 federal tax (12% bracket, single) and Social Security + Medicare (7.65%), about $4 of that $5 a day lands, before state tax. What raise did you get this year?

**Per-platform notes**
- **YouTube Shorts:**
  - The Becker look is the most "watchable without sound" of the three (Becker's mute test): each number is physically hit smaller.
  - Frame 1 reads as a complete premise: header, 4 empty ledges, the figure and the typing block.
- **Instagram Reels:**
  - The cover is frame 1.
  - Becker's Shorts show high like rates and few comments, so the "what raise did you get" question in the pinned comment carries the comments.
- **TikTok:**
  - Put "3% raise" and "$60,000 salary" in the first caption line for search.
  - The share line is the verdict, "$1,800 sounded big. It's about $5 a day."
- **Production:** the kit draws everything (poses: stand, wind-up, kick, chop, slam, fall/land, fist pump, point). No extra props are needed.

---

## Summary table

| ID | Look | Header (t = 0) | Runtime | Key numbers | Verdict | Hook score /10 |
|---|---|---|---:|---|---|---:|
| 01a | clean-sheet | 3 DEAD SIMPLE NUMBERS / PAID **EVERY 2 WEEKS**? THE PAY YOUR BUDGET FORGETS | 26.0 s | $2,500 · $65,000 · not × 24 · $5,000 · $65,000 − $60,000 = $5,000 · 13 months | Every 2 weeks = 13 months of pay a year | 8 |
| 01b | live-sheet | 3 DEAD SIMPLE NUMBERS / WHAT **$20/HR** ACTUALLY LANDS | 27.0 s | $41,600 · ≈ $3,467 · × 0.85 · ≈ $2,947 · $17 of $20 | ≈ $2,947 a month lands of the $3,467 you earn | 7 |
| 01c | becker-rig | 4 DEAD SIMPLE NUMBERS / WHAT A 3% RAISE ON **$60,000** ACTUALLY PAYS YOU | 26.5 s | $1,800 · $150 · ≈ $35 · ≈ $5 | A 3% raise on $60,000 ≈ $5 a day, before tax | 7 |

**How the hook scores were set.** The judge scored the round-1 versions 7, 6 and 6. These are my estimates for the revised versions, which adopt the judge's rewrites:
- **01a (8):** the header now carries R5 ("the pay your budget forgets") and a question (R11) on top of the most common US pay period, and the verdict is novel. It is not higher because the payoff is the 52-vs-48 fact, which some viewers already know, and the format is untested faceless.
- **01b (7):** the header moves from H57's filter grammar to H84's payoff grammar, and the shrink runs one way. Take-home pay is familiar ground and the gap (15%) is not lopsided, so it stays below 01a.
- **01c (7):** in lane now, timely (raise season), viewer-owned and lopsided ($1,800 → $5). The per-day re-framing is a known device, and the verdict is "before tax".

## Caveats

- **Fact-checking method.**
  - Round 1 used 10 web searches; this revision used 2 more (2026 raise budgets).
  - Direct fetches of irs.gov, bls.gov, census.gov, energy.gov, taxfoundation.org, imercer.com and hrdive.com were blocked by this session's network proxy, so those pages were read from search extracts only.
  - Every on-screen tax figure has two independent publishers, every displayed result is robust to the plausible spread of its inputs, and no on-screen number in 01a or 01c rests on an outside figure.
- **Untested.** No teaser has been posted. Stills were rendered and checked; full MP4s were not rendered in this pass.
- **Kit dependence.** The clean-sheet chrome (header and verdict fitting) is being reworked by the clean-sheet fixer. The 01a header is written as 2 explicit lines because the current fitter cannot set "THE PAY YOUR BUDGET FORGETS" on a line of its own at ≥ 56 px; it renders as "…EVERY 2 WEEKS? THE / PAY YOUR BUDGET FORGETS". Re-check the break after the fixer lands. The fixer also changed the clean-sheet layout engine during this pass (labels now sit beside the results); the 01a beat sheet describes the final re-render.
- **Untested faceless.** Every benchmark winner of this format had a presenter on screen (`04-formats.md`). These are the faceless test.

---

## Review log

Round-2 review: the verifier (2 must, 6 should, 5 nit) and the hook judge (01a 7/10, 01b 6/10, 01c 6/10, with rewrites; 3 must issues and 1 should were received, and the rest of the judge's issue list was cut off in transit). Each item and what I did:

### Verifier

| # | Teaser | Sev. | Issue | What I did |
|---|---|---|---|---|
| V1 | 01c | must | Verdict showed a bare rounded "$28.85"; vo[5] "Same $231." and vo[6] "Not $28.85." also dropped the "≈"/"about" | The whole commute topic was replaced (judge must J1). The new verdict, "A 3% raise on $60,000 ≈ $5 a day, before tax", has "≈" on its only rounded figure, and every VO line says "about" before a rounded number. The check script now re-evaluates every typed formula and fails any result whose "≈" does not match its rounding. |
| V2 | 01b | must | "$3,467 × 0.85" shown as "≈ $2,950" ($50 rounding; the formula gives $2,947) | Rounded to $1 like every other result: item 3, the verdict and the VO all say ≈ $2,947. In the check script, `B_KEPT_D = rnd(B_KEPT_RULE)`, and the "nearest $50" sensitivity line became a ±1% check against the exact 2026 take-home ($2,967.13, 0.68% off). The beat sheet, VO script, maths table, caption and pinned comment were updated. |
| V3 | 01a | should | `lookOpts.wrongGuess` is not implemented by the clean-sheet kit; the note showed $60,000 ≈3.3 s before the VO | Took option (b): deleted `lookOpts.wrongGuess`, shortened item 1's note to "not × 24" (no $ figure), trimmed vo[0] to "Your paycheck, times 26. On $2,500: $65,000 a year." (d 4.3) and moved vo[1] to 4.5 s. On screen, $60,000 now first appears in item 3's formula at 10.4 s, as the VO says it. R5 is carried by the new header instead of a strike. I did not port the strike into `clean-sheet/formats/dead-simple-list.js`: kit files are outside this reviser's files, and the clean-sheet chrome and formats are being changed by the clean-sheet fixer (tasks #14-15), which is the right place for it. |
| V4 | 01c | should | Item 4's formula typed ≈5.9 s before the VO; result gaps 3.3/4.1/12.3 s | Topic replaced. Every block now types at the start of the VO line that reads it (6.6, 10.2, 14.2 s), and the payoff gaps are 5.8, 4.0, 4.4 and 1.5 s. The check script now fails any payoff gap over 7.5 s. |
| V5 | 01c | should | `gag`, `stage`, `inputProp`, `actions[].tool/becomes` are ignored by the kit; vo[7] after the verdict had no on-screen text; the beat sheet described props that do not render | Removed all unsupported keys and the post-verdict line. `lookOpts` is now `{"hits": ["kick", "chop", "kick", "slam"]}`. The last VO line is the verdict line. The 01c beat sheet and production notes are rewritten to the kit's real grammar (typed block, kick/chop, goal slam on a gold plate, fist pump, point), checked against stills. The check script now fails any `lookOpts` key the target kit does not read, and any VO line after `verdict.t`. |
| V6 | 01b | should | `wrongGuess` had no `resultT`, so the red $3,200 landed ≈1.2 s early | Moot: the "4 weeks = $3,200" wrong guess was removed with the judge's distinctness fix (J4). |
| V7 | 01b | should | Frame 1 showed only row 1 labelled (kit default `labels: 'reveal'`), unlike the md | Added `"labels": "always"`. The frame-1 still shows all 3 rows labelled; the R9 row and beat sheet match. |
| V8 | 01a | should | Pace slower than the format (gaps 9.2/7.7/7.1 s); vo[2] and vo[4] repeated the screen; the "13th month" note spoiled the verdict | Cut both repeated lines and retimed: results at 2.7, 9.3 and 14.5 s, verdict at 20.5 s (gaps 6.6, 5.2, 6.0 s); duration 31.0 → 26.0 s. Item 3's note "a 13th month of pay" is gone, so "13th month" is first said at the verdict. I tried the suggested "= 2 × $2,500", but the clean-sheet layout has no room for a note after the long `$65,000 − $60,000 =` formula and drops it, so the 2 checks are named by item 3's label instead ("The 2 checks your budget forgets", landing with the result at ≈14.8 s). ANCHORS, the beat sheet and the VO script were updated. |
| V9 | 01b, 01c | nit | Lines fit only if numbers are read in shorthand | Each guide VO script now has a "Read the numbers as" line ("thirty-four sixty-seven", "twenty-nine forty-seven", "eighteen hundred", …). Every line's `d` fits at 2.6 words/s with those readings, as the check script counts them. |
| V10 | 01b | nit | Net-vs-gross verdict read as a contradiction; "in your account" overstated | Verdict is now "≈ $2,947 a month lands of the $3,467 you earn": one direction, net against gross. "In your account" was removed from the VO and the title, and vo[3] says "before state tax". |
| V11 | 01a | nit | vo[0] stated $65,000 as if true for any paycheck | Adopted: "Your paycheck, times 26. On $2,500: $65,000 a year." |
| V12 | 01c | nit | Commute source line (ACS 2024: 27.2 min) | Moot: no commute figure remains on screen or in the write-up. |
| V13 | all | nit | "Linter not run" caveat out of date | Replaced with the linter result: 3/3 clean, 0 errors, 0 warnings, re-run after the fixes. |

### Hook judge

| # | Teaser | Issue / rewrite | What I did |
|---|---|---|---|
| J1 | 01c | must, lane overlap: "salary → real hourly" is lane 2's topic, and 02c already shows the $60,000 row | Adopted the judge's topic: a 3% raise on $60,000 ($1,800 → $150 a month → ≈ $35 a week → ≈ $5 a day). Dropped ÷ 2,080, ÷ 60 and the commute. |
| J2 | 01c | must, hook 6/10; rewrite header "4 DEAD SIMPLE NUMBERS / WHAT A 3% RAISE ON $60,000 / ACTUALLY PAYS YOU", opener "Take your salary, times 0.03: a $1,800 raise." | Adopted the header verbatim and the opener with "3%" for "0.03": the formula reads `$60,000 × 3%`, which a general viewer parses faster; the check script evaluates "3%" as 0.03. Slots and verdict as rewritten, with "exact" notes on the two rounded slots. Not adopted: the optional "kept ×0.80" slot, which would put a second tax rule in the series beside 01b's ×0.85 (it went to the pinned comment, with the marginal-rate working checked); the cleaver/shrink-to-a-coin staging and the "tries to pay with it" gag, because the kit has no gag or prop support (V5). |
| J3 | 01b | must, hook 6/10; rewrite header "3 DEAD SIMPLE NUMBERS / WHAT $20/HR ACTUALLY LANDS", opener "…$41,600 a year. On paper." | Adopted the header and opener verbatim, cut the $800 week and the struck $3,200. Changed the shrink path from year → year kept (≈ $35,500) → month kept (≈ $2,950) to year → month (≈ $3,467) → month kept (≈ $2,947): the rewrite's $500 and $50 roundings break the series' $1 rule (V2), and two monthly numbers give a same-unit verdict. Added "Every $20 hour lands as about $17" as the repeatable line. Title and caption follow the rewrite, without "in your account" (V10). |
| J4 | 01b | should, distinctness: the 4-week trap is 01a's 52-vs-48 insight (both 8.3%) | Removed from 01b; 01a keeps it. |
| J5 | 01a | rewrite (score 7): header "3 DEAD SIMPLE NUMBERS / PAID EVERY 2 WEEKS? / THE PAY YOUR BUDGET FORGETS"; first VO "…Not 24. $65,000 a year."; slot ③ "$65,000 − $60,000", note "the 2 checks your budget forgets"; title and caption | Adopted the header words (written as 2 explicit lines so the current kit renders 3 clean lines; see Caveats), slot ③'s formula, the title and the caption. The first VO merges the rewrite with V11 ("Your paycheck, times 26. On $2,500: $65,000 a year." then "Not times 24: that's only $60,000."), keeping $65,000 by 2.7 s. The judge's note text became ③'s label, "The 2 checks your budget forgets", because the kit renders labels beside the result but has no room for a note after ③'s formula. |
| J6 | all | Remainder of the judge's issue list (cut off after "Two of the format's three teasers…") | Not received. The visible part (01b/01a share one insight) is handled in J4. |

### Re-verification after the changes
- `python3 teasers/v2/checks/01-dead-simple-list.py`: 240 checks, 0 failed. New checks: every typed formula re-evaluated against its displayed result ($1/1¢ rule), "≈" iff rounded or rule-based, payoff gaps ≤ 7.5 s, no VO line after the verdict card, `lookOpts` limited to keys the kit reads, Becker hits valid, 01b's ±1% against the exact 2026 take-home, 01c's raise maths, leap-year robustness and the marginal-rate pinned comment.
- Mutation test: 10 of 10 broken copies caught (listed at the top).
- `node src/cli.mjs check` on the three specs: 3/3 clean.
- Stills rendered for every beat named in the beat sheets; the frame-1, payoff and verdict descriptions above match them.
