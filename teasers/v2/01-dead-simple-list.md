# Format 1: "N dead simple numbers" (dead-simple-list, hook pattern P1)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 1 of 10, round 2 (revised after the verifier and the hook judge; then in the round-2 **hook pass**, which replaced 01c's hook and kept 01b's; then in **hook pass 2**, which replaced 01b's hook and topic; then in the **assembly pass** (2026-10-08), which fixed what the stills and the MP4s showed; then in the **QA fix pass** (2026-10-08), which applied the round-2 QA's must and should issues for 01a and 01b; then in the **01c assembly pass** (2026-10-08), which applied the same caption, footer and climax fixes to 01c and gave its Becker figure acting beats; then in the **01c QA fix pass** (2026-10-08), which applied the round-2 QA's must and should issues for 01c; see the **Review log** at the end)
**Deliverables:**
- Specs:
  - [`studio/specs/01a-clean-sheet-paid-biweekly.json`](../../studio/specs/01a-clean-sheet-paid-biweekly.json)
  - [`studio/specs/01b-live-sheet-20-an-hour.json`](../../studio/specs/01b-live-sheet-20-an-hour.json) (file name kept; since hook pass 2 the topic is the Social Security wage cap: you pay 6.2%, what does a $1M salary pay?)
  - [`studio/specs/01c-becker-rig-60k-a-year.json`](../../studio/specs/01c-becker-rig-60k-a-year.json) (file name kept; since the hook pass the topic is the bracket myth: will a 3% raise push $65,000 into a higher bracket?)
- Check: [`teasers/v2/checks/01-dead-simple-list.py`](checks/01-dead-simple-list.py). It passes 342 checks with 0 failures (after the 01c QA fix pass).
- Mutation test: in the 01c QA fix pass the updated checks caught 8 of 8 broken copies of the 01c spec (the verdict back on one line, the old "taxed at 22%" note, the old "Your new pay" label, a wrong $1,905 raise note, the closing pose back at 24.8 s, a 24.9 s duration, and the 10-points caption with no break or a break after "pay"); in the 01c assembly pass the updated checks caught 8 of 8 broken copies of the new 01c spec (a spoken $45 changed to $54, an unknown act, an act off its VO line, an act pointing at a missing item, the closing pose during the VO, a `resultT` off its VO line, the old footer, and a wrong $450); in the QA fix pass the updated checks caught 7 of 7 broken copies (a wrong "not × 24" total, a wrong check-line total, a late `checkT`, a wrong spoken $65,000, the old "salary's" label, a wrong spoken $11,439, and a wrong guess off its VO line); in the assembly pass the new note and check-line checks caught 6 of 6 broken copies; in hook pass 2 the check caught 7 of 7 broken copies of the new 01b spec, and in the hook pass 4 of 4 broken copies of the new 01c spec (see the Review log). In round 2 it caught 10 of 10 deliberately broken spec copies: a $50-rounded result (`≈ $2,950`), a "≈" on an exact result, a wrong VO number, an off-beat `resultT`, a VO line read too fast, an unsupported `lookOpts.gag`, a VO line after the verdict card, a wrong label digit, a missing "≈", and a verdict that no longer matches the maths.
- Studio linter (`node src/cli.mjs check`): 3/3 clean, 0 errors, 0 warnings (safe zones, type floor, overlap, contrast, fonts, R1), re-run after every fix, after both hook passes, after the QA fix pass and after the 01c assembly pass (with the 3 becker-rig `dead-simple-list*` kit samples, which share the edited module: 4/4 clean).
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
  - **01c moved off "salary → real hourly"** in round 2 (lane 2, find-your-row, owns that topic by name), and in the hook pass off "a 3% raise per day" to **the bracket myth on a 3% raise**: will $65,000 + 3% cross into the 22% bracket, and what does that cost? No other format touches raises. Lane 2's hook pass considered and rejected "your bracket is not your tax rate" for 02c, so no other teaser covers brackets.
  - **01b moved off gross → take-home** in hook pass 2 (the judges called it familiar ground) to **the Social Security wage cap**: the 6.2% on every paycheck stops at $184,500, so a $1M salary pays ≈ 1.1%. It is still a paycheck deduction turned into rough numbers, and no other teaser in the slate covers the cap.
  - **One insight per teaser.** 01a owns "a year is 52 weeks, not 48" (26 paychecks, not 24). 01b owns "the 6.2% is not flat: it stops at $184,500". 01c is the marginal bracket line, worked exactly. Since hook pass 2 the series has no rough keep rule (the old ×0.85 is gone).
  - **No pricing in hours of work** (lane 8) and no salary → hourly conversion (lane 2). 01b goes from an hourly wage to a year only ($20 × 2,080), never back. 01c uses no time units at all: one raise, one bracket line.
- **Series header grammar (the same in all three).**
  - Line 1 is the series phrase with the slot count: "3/4 DEAD SIMPLE NUMBERS".
  - The rest names the stake and carries one R5 word or mark. 01a uses H84's "That Tell You What / You Actually Make" grammar: "WHAT YOUR BUDGET **MISSES**" (it was "THE PAY YOUR BUDGET FORGETS" until the QA fix pass: at 27 characters it could not sit on one line). Since the hook passes, the other two ask a question (R11, H48's grammar):
    - 01c's R5 word is the feared outcome: "WILL A 3% RAISE PUSH $65,000 INTO A **HIGHER BRACKET**?"
    - 01b plants the viewer's own rate and leaves the rival's open: "YOU PAY **6.2%** TO SOCIAL SECURITY. A $1M SALARY PAYS…?" The "…?" invites the flat-rate guess ($62,000), which the sheet types and strikes out.
  - Round 1's "IF YOU …" filter line (Yannick's H57 grammar, 50,206 at 2.8x med) is gone: it was the weaker half of the pattern.
- **One calendar.** 52 weeks, 12 months, 365 days; work hours = 40 × 52 = 2,080, printed in 01b's footer ("40 hrs × 52 wks") and row 1's formula. 01a counts paydays (364 ÷ 14 = 26). No slot mixes 50 and 52 weeks.
- **The "≈" and rounding policy.** A result gets "≈" exactly when it is rounded. Every result equals its visible formula rounded to $1 (1¢ when cents are shown, 0.1 point for a percent), so anyone who redoes a formula on screen gets the number on screen. The check script re-evaluates every typed formula to enforce this. Every 01c result is exact, so 01c shows no "≈".
- **Non-breaking spaces** (` ` in the JSON) keep a highlight or a rule on one rendered line: "13 months" (01a verdict), "≈ 1.1%" (01b verdict), "$45 a year" (01c verdict). The check script expects them.
- **Captions never run ahead of the sheet** (since the QA fix pass). In 01a and 01b each result starts its own VO line in the spec (`"On $2,500:"` then `"$65,000 a year."`), timed to its `resultT`, so a caption never shows a result before the sheet lands it. The clean-sheet captions show a whole line at once (unspoken words in grey), so this matters most there. The words of the guide VO scripts are unchanged except 01b's first line; only the caption lines are split.
- **Kit contract.** Each spec uses only `lookOpts` keys its kit reads (clean-sheet: none; live-sheet: `labels` and `wrongGuess`; becker-rig: `hits`), and the last VO line is the verdict line, because every kit's chrome replaces the captions with the verdict card from `verdict.t`. The check script enforces both.
- **Risk: the series name.** "DEAD SIMPLE NUMBERS" is Master Money's own branded phrase, and `04-formats.md` says to use "a series name of our own".
  - I kept it because it is the seed the owner approved and the format's id.
  - If the owner wants it swapped, "ROUGH-BUT-RIGHT NUMBERS" fits the brand and the header widths. It is a one-line edit in each spec and in `EXPECT` in the check script.

---

## (b) The teasers

### 01a · Clean Sheet · "3 DEAD SIMPLE NUMBERS / PAID EVERY 2 WEEKS? / WHAT YOUR BUDGET MISSES"

- **Spec:** `studio/specs/01a-clean-sheet-paid-biweekly.json`, 26.0 s
- **Look:** Clean Sheet. Off-white card, typeset formulas in grey mono, results on highlighter boxes, circled step numbers. The formula stays above its result, so the sheet builds into worked maths. At this spec's size the kit's layout engine sets each step as a formula row over a result row, with the step label beside the result (ink) and the step's note stacked under the label (grey): `$65,000 │ Your real yearly pay / not × 24 = $60,000`. Since the QA fix pass every label starts on one column (x ≈ 529, right of the widest box, ③'s), so the finished sheet reads as two clean columns. No note ever sits after a formula's "=", where it would read as the answer. With the one-line footer the sheet sets at full size, check line included (results 66 px, the goal 82 px; checked in stills).
- **Platform title:** "Paid every 2 weeks? What your budget misses" (8 words, no result)
- **On-screen hook (header):** `3 DEAD SIMPLE NUMBERS` / `PAID **EVERY 2 WEEKS**?` / `WHAT YOUR BUDGET MISSES` (12 words), written as 3 explicit lines. The kit sets them as written, each on one line at 56 px, at y 252-433. The last line has 23 characters: the round-2 "THE PAY YOUR BUDGET FORGETS" (27) split again at every legal size, which stranded "THE" after the question mark.
- **Input row at 0.0 s:** `Your paycheck` **`$2,500`** (yellow) `every 2 weeks`

**The wrong belief it exploits:** "Every 2 weeks" = twice a month = 24 paychecks = **$60,000**, and a monthly budget built on 2 checks. In fact there are 26 paydays (364 ÷ 14). Ten months bring 2 checks and two months bring 3, so the 2 extra checks add up to a whole 13th month of pay that a 2-checks-a-month budget never counts. The header names it ("what your budget misses"); the wrong multiplier and its total show as "not × 24 = $60,000" under ①'s label at 4.5 s, as the VO says "only $60,000"; ②'s note "× 12 = $60,000" shows where ③'s $60,000 comes from; slot ③'s label resolves it ("The 2 checks your budget forgets"), and the check line `10×2 + 2×3 = 26 paydays` puts the calendar on screen as the VO says "from the 2 months with 3 paydays": 10 normal months of 2 checks plus 2 months of 3 make the 26.

**Modelled on (grammar stolen):**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x; IG mirror 1,700,000, 27.8x. We copy the series line over a payoff-noun line, slot 1 typing at frame 1, and the spoken opener "Take your salary and multiply it by 0.7…", which becomes "Your paycheck, times 26".
- **H48, Debt Freedom:** a frame-1 question that names the situation, with a verdict caption. 1,900,000, 902.5x. We copy the question mark on "PAID EVERY 2 WEEKS?" and the side-taking caption.
- **H76, Jake:** "How to be financially free (in 5 steps)". 983,900 views, 36.3x. We copy the empty numbered list plus a first formula inside the first second.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 $ number at 0.0 s | yes | Input "$2,500" on the yellow highlighter; slot ① is the active step, its formula typing from 0.0 s |
| R2 one input, never the result | yes | The header has no $ figure; the only input is $2,500; $65,000 is withheld until 2.7 s, on screen and in the caption (frame 1's caption is "Your paycheck, times 26. On $2,500:") |
| R3 viewer's own number | yes | "Your paycheck, times 26" works on any biweekly check. Biweekly is the most common US pay period (43.0% of private establishments, BLS CES) |
| R4 small, round, familiar | yes | $2,500 every 2 weeks ≈ the median full-time US paycheck (BLS Q2 2026 median $1,251 a week × 2 = $2,502) |
| R5 implies a wrong answer | yes | "WHAT YOUR BUDGET MISSES" in the header; "not × 24 = $60,000" under ①'s label at 4.5 s, as the VO says it |
| R6 stake | yes | You, $2,500, a year |
| R7 named, not a label | yes | "Paid every 2 weeks?" names the viewer's situation |
| R8 ≤ 15 words | yes | 12 words, 3 lines, each set whole |
| R9 countable loop | yes | ① ② ③ visible and empty at 0.0 s |
| R10 first payoff ≤ 3 s; biggest number first or last | yes | $65,000 at 2.7 s, and it is the biggest number on screen |
| R11 question on screen, verdict in caption | yes | "PAID EVERY 2 WEEKS?" on screen; the caption takes a side ("your monthly budget is wrong, in your favor") |
| R12 a verdict | yes | "13 months of pay a year" can be repeated in a comment |

**Beat sheet** (VO timed at 2.6 words/s; times match the spec and the clean-sheet kit)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** header (3 lines, "EVERY 2 WEEKS" on yellow); footer "ASSUMES 26 paydays a year · pay before tax" (one line); input row "Your paycheck **$2,500** every 2 weeks"; ① filled (active) with the caret; ② ③ empty circles; the caption "Your paycheck, times 26. On $2,500:" under the hairline (no result in it) | "Your paycheck, times 26. On $2,500:" |
| 0.0-0.8 | ① types `$2,500 × 26 =` | (same line) |
| 2.7 | ① **$65,000** wipes in on the green highlighter with a pop; the caption turns to "$65,000 a year." | "$65,000 a year." |
| ≈3.0 | Label "Your real yearly pay" beside $65,000 | (same line) |
| 4.5 | Note "not × 24 = $60,000" fades up under the label | "Not times 24: that's only $60,000." |
| ≈7.1 / 7.4 | ② fills, then types `$2,500 × 2 =` | "A normal month: 2 checks," |
| 9.3 | ② **$5,000** on the green highlighter (a `neutral` result lands on green in this kit); ① rests to 42%; label "A normal month" beside it at ≈9.6 | "$5,000." |
| 10.4 | Note "× 12 = $60,000" fades up under ②'s label | "12 normal months: $60,000." |
| ≈12.3 / 12.6 | ③ fills, then types `$65,000 − $60,000 =`; the caret waits | "From $65,000, that leaves" |
| 14.5 | ③ **$5,000** on the blue goal highlighter, larger, with a ding; label "The 2 checks your budget forgets" beside it at ≈14.8 | "$5,000." |
| 15.6 | The sheet holds on ③ | "It's your 2 extra checks," |
| 17.5-19.2 | The check line types under ③ in accent mono: `check: 10×2 + 2×3 = 26 paydays` | "from the 2 months with 3 paydays." |
| 20.5 | Verdict replaces the captions at 64 px: "Every 2 weeks = / **13 months** of pay a year" ("13 months" on blue). At 20.8, with the verdict's blue swipe, ②'s **$5,000** (a normal month) re-wipes from its rested green to the goal blue beside ③'s **$5,000**, and both boxes pulse once: the 2 forgotten checks are one more month, 13 in all; the reveal sting and a ding | "That's a 13th month of pay. Every year." |
| 23.7-25.3 | Hold on the finished sheet (① rested green; ② and ③ blue) | none |
| 25.3-26.0 | Results, notes and the check line clear back to the frame-1 state (the kit's loop) | none |

Payoffs land at 2.7, 9.3 and 14.5 s, and the verdict at 20.5 s: gaps of 6.6, 5.2 and 6.0 s. The longest still stretch under the VO is now about 2.4 s (≈15.1-17.5 s, after ③'s label lands), down from 3.5 s.

**Full guide VO script (01a, 26 s)** (the spec splits it into 11 caption lines, each result starting its own line; the words are the same)
> Your paycheck, times 26. On $2,500: $65,000 a year. Not times 24: that's only $60,000. A normal month: 2 checks, $5,000. 12 normal months: $60,000. From $65,000, that leaves $5,000. It's your 2 extra checks, from the 2 months with 3 paydays. That's a 13th month of pay. Every year.

Read the numbers as: "twenty-five hundred", "sixty-five thousand", "sixty thousand", "five thousand", "thirteenth".

**The maths** (every on-screen number)

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $2,500 (input) | input | example paycheck, gross | 2,500 |
| 26 | 364 days ÷ 14 | biweekly calendar | 26 |
| **$65,000** (①) | $2,500 × 26 | | 65,000 (exact) |
| not × 24 = $60,000 (① note) | $2,500 × 24 (24 = 2 checks × 12 months) | the twice-a-month guess | 60,000 (exact) |
| **$5,000** (②) | $2,500 × 2 | 2 paydays in a normal month | 5,000 (exact) |
| × 12 = $60,000 (② note) | $5,000 × 12 | the budget's 12 normal months (= $2,500 × 24) | 60,000 (exact) |
| $60,000 (③ formula, VO) | $5,000 × 12 = $2,500 × 24 | 12 normal months = the × 24 figure | 60,000 |
| **$5,000** (③) | $65,000 − $60,000 | | 5,000 (exact) |
| "The 2 checks…" (③ label) | 26 − 24 = 2 extra checks; 2 × $2,500 | | 5,000 |
| check: 10×2 + 2×3 = 26 paydays (check line) | 10 two-payday months × 2 + 2 three-payday months × 3 | the calendar behind ①'s × 26; the 2 three-payday months give ③'s 2 extra checks (26 − 24 = 2) | 26 (exact) |
| 13 months (verdict) | $65,000 ÷ $5,000 | ②'s and ③'s $5,000 are both a month of pay (blue at the verdict) | 13 (exact) |

Calendar check, simulated in the check script over 2000-2099 for both alternate-Friday cycles:
- Every 26-payday year has exactly 2 months with 3 paydays and 10 with 2 (12 − 2; printed again since the QA fix pass, in the check line `10×2 + 2×3 = 26`).
- Every 27-payday year has exactly 3 such months.
- 27-payday years come about 1 year in 11 (11.8 in the sample; 11.3 in theory, since 14 ÷ 1.2425 days of drift a year = 11.3).

**Sources:** none of the on-screen numbers needs an outside figure; they are calendar arithmetic on an example paycheck. Two context facts are used in this write-up only, not on screen and not in the caption:
- BLS, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", released 2026-07-21: median full-time earnings $1,251 a week (not seasonally adjusted). https://www.bls.gov/news.release/archives/wkyeng_07212026.htm
- BLS Current Employment Statistics, "Length of pay periods in the CES survey": biweekly is the most common pay period, 43.0% of private establishments (Feb 2023), against weekly at 27.0%. https://www.bls.gov/ces/publications/length-pay-period.htm

**Assumptions (footer, on screen from 0.0 s):** `ASSUMES 26 paydays a year · pay before tax` (one line since the QA fix pass; the 27-payday caveat moved to the pinned comment, which already carried it)

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

### 01b · Live Sheet · "3 DEAD SIMPLE NUMBERS / YOU PAY 6.2% TO SOCIAL SECURITY. A $1M SALARY PAYS…?"

- **Spec:** `studio/specs/01b-live-sheet-20-an-hour.json`, 26.0 s. The file name and id are kept from round 2 so links in `teasers.json` and the render paths still work; the id is never shown to viewers. The topic changed in hook pass 2 (see the Review log).
- **Look:** Live Sheet. A designed spreadsheet on black, a yellow title banner, a "≈" formula bar showing the working, rows that fill one cell at a time. The sheet's row numbers do the job of the empty "1. 2. 3.".
  - `lookOpts.labels: "always"` labels every row from frame 1 (the kit's open-loop variant).
  - `lookOpts.wrongGuess` is the kit's built-in wrong-guess beat (live-sheet README, `wrongGuess`): the viewer's likely guess types into row 2, lands with a tick, and is struck out in red with a buzz before the real formula types.
  - Notes open as dark tooltips under their row, and the table never moves for them (since the QA fix pass). A note's pill floats over the next row's result cell, which is still empty while the note shows; the notch sits on the row's bottom gridline, and the pill takes two balanced lines when one line would cover the next row's label ("6.2% of / every dollar", "taxed only up / to $184,500"). Row 3's note opens in a slot reserved under the table from frame 1, so the card and the assumption line never change height. A pill wipes out of its notch to open and leaves whole (a 0.14 s fade and slight shrink), never by a clip.
  - A tooltip stays open while the next formula types and leaves just before the next value lands, so each note reads for about 1.7-2 s; row 3's note uses the item field `noteT` (15.1 s) to open on the VO line that says it.
- **Platform title:** "You pay 6.2% Social Security. What does a $1M salary pay?" (11 words, no result)
- **Hook pass 2: adopted** (option A, average 7.25 against 4.25 for the old "WHAT $20/HR ACTUALLY LANDS"; scores and reasons in the Review log).
- **On-screen hook (header):** `3 DEAD SIMPLE NUMBERS` / `YOU PAY **6.2%** TO SOCIAL SECURITY.` / `A $1M SALARY PAYS…?` (14 words, 3 lines, ≈ 44 px; "6.2%" in the black chip)
- **Input row at 0.0 s:** mint header row `Your pay · 40 hrs a week | $20/hr`, with the dashed "in use" outline

**The wrong belief it exploits:** "Social Security is a flat 6.2% for everyone", so a $1M salary must pay $62,000 (or "richer people pay a higher rate").
- In 2026 the 6.2% applies only to the first **$184,500** of wages (the wage base). A $1M salary pays $184,500 × 6.2% = **$11,439**, about **1.1%** of its pay.
- A $20/hr worker earns $41,600, all of it under the cap, and pays 6.2% on every dollar: more than five times the rate.
- The header's "…?" invites the flat-rate guess. The sheet types it (`$1,000,000 × 6.2%`), lands **$62,000** at 5.2 s and strikes it out in red at 6.1 s, on the VO's "No."

**Modelled on:**
- **H48, Debt Freedom:** a frame-1 question whose options are named on screen, 1,900,000 (902.5x). R7: her named-option questions drew 290.7K-1.9M, against 90.6K for the label hook H52.
- **H71, The Market Hustle:** the wrong number shown in red at the start ("25 YEARS"), 190,187 (4.5x med). Here it is the struck red $62,000.
- **P4, a named rival with a lopsided end:** H17 ChartOrbit "USA and EUROPE", 2,808,307 (345.09x, about 4x the comment rate of the NETFLIX/DISNEY sibling), and H16, 15,876,376 (100.45x). Here 6.2% against ≈ 1.1% is 5.4x.
- **R5 by one number:** H64 "What $1 COSTS you", 1,150,974 (210x med). "YOU PAY 6.2%" plants the rate the viewer assumes the rival pays too.
- **The list body:** H84 Master Money, 3,000,000 (140x): formula, then result, in each slot; first answer under 3 s.
- **Comments:** Jake's twist duels (H78/H79, 322,339 and 301,112 views) drew 136 and 44 comments, against 23 for the plain H80.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "6.2%" in the header chip and "$20/hr" in the input row at 0.0 s; the formula bar is typing `= $20 × 2,080` |
| R2 | mostly | One $ figure in the header ($1M), no result in the header or the title. The header carries two figures, the viewer's 6.2% and the rival's $1M (judge 2 counted that against R2) |
| R3 | yes | 6.2% is the rate on every W-2 paycheck under the cap. Row 1's $20/hr is the example; the 6.2% applies to any wage up to $184,500 |
| R4 | yes | 6.2%, $20/hr, $1M: small, round, familiar |
| R5 | yes | "…?" invites the flat-rate guess; $62,000 lands at 5.2 s and is struck in red at 6.1 s |
| R6 | partly | You, 6.2%, ≈ $2,579 a year. The stake is fairness (a rate), not money the viewer keeps |
| R7 | yes | A named rival: a $1M salary |
| R8 | yes | 14 words, 3 lines |
| R9 | yes | 3 labelled empty rows at 0.0 s ("Yours, a year / A $1M salary pays / Their rate"); "Their rate" promises one number |
| R10 | yes | The viewer's own ≈ $2,579 at 2.6 s ("you pay about $2,579 a year"); the header's question gets its wrong answer at 5.2-6.1 s and its real one at 9.6 s |
| R11 | yes | A question on screen; the verdict card answers it |
| R12 | yes | "You pay 6.2%. A $1M salary pays ≈ 1.1%." (5.4x, lopsided and repeatable) |

**Beat sheet** (times match the spec; checked in stills at 0, 2.75, 3.5, 4.95, 5.4, 6.4, 8.8, 10.8, 12.25, 12.3, 12.6, 15.8, 21 s, the contact sheet and frames pulled from the MP4)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** yellow banner header (3 lines, "6.2%" in the black chip); formula bar `≈ │ = $20 × 2,080` mid-typing; mint input row "Your pay / 40 hrs a week │ $20/hr" (dashed outline: the formula is using it); rows 1-3 labelled "Yours, a year / A $1M salary pays / Their rate", results empty; selection on row 1's result cell; the footer on 2 lines under the card "ASSUMES 40 hrs × 52 wks · 2026 rates / employee share, no Medicare" (y 1198-1298, clear of the caption band); captions pop a phrase at a time ("AT $20 AN HOUR,") | "At $20 an hour, you pay about" |
| ≈0.4-0.6 | The bar finishes `= $20 × 2,080 × 6.2%` | (same line) |
| 2.6 | Row 1 snaps to **≈ $2,579** in red (a cost) with a tick; the formula drops into the row as the grey working line `$20 × 2,080 × 6.2%`; the caption turns to "$2,579 A YEAR" | "$2,579 a year." |
| 2.9-5.0 | The tooltip "6.2% of / every dollar" wipes out of its notch over row 2's empty result cell (readable ≈3.2-4.9 s), with a soft pop; the table does not move | (same line) |
| 4.0 / 4.2 | Selection slides to row 2 (under the floating pill); the bar types `= $1,000,000 × 6.2%`; the pill fades out whole at ≈4.9-5.0 | "A million-dollar salary: $62,000?" |
| 5.2 | **$62,000** lands in row 2, pencilled in grey (the guess), with a tick | (on "$62,000") |
| 6.1 | A red strike runs through $62,000 (it turns red); buzz | "No. It stops at $184,500:" |
| 6.9 | The bar types `= $184,500 × 6.2%` | (on "stops") |
| 9.6 | The struck guess lifts out; row 2 → **$11,439** (neutral) with a tick; working line `$184,500 × 6.2%`; the caption "$11,439" pops with it | "$11,439." |
| 9.9-12.3 | The tooltip "taxed only up / to $184,500" floats over row 3's empty result cell (readable ≈10.2-12.2 s) | (same line) |
| 11.3 | The sheet holds on row 2's tooltip | "That's about 1.1% of their pay." |
| 11.5 / 11.7 | Selection to row 3 (under the pill); the bar types `= $11,439 ÷ $1,000,000`; the pill fades out whole at ≈12.2-12.3, and row 3 never moves | (same line) |
| 12.5 | Row 3 → **≈ 1.1%** and the row wipes yellow, with a pop and the reveal sting: the loudest cue of the beat (no count-up: the kit counts only numbers ≥ 10) | (on "1.1%") |
| 15.1 | The tooltip "yours: 6.2%" opens under ≈ 1.1%, in the slot reserved under the table (`noteT`); it fades out at ≈19.1-19.3 | "Yours: 6.2%, on every dollar, all year." |
| 19.3 | Verdict card in the caption band: "You pay **6.2%**. A $1M / salary pays **≈ 1.1%**." (6.2% in red, ≈ 1.1% on yellow); the result column flashes top to bottom; ding | "You pay more than five times their rate." |
| 22.4-25.5 | Hold (the table is the screenshot) | none |
| 25.5-26.0 | Cells clear back to frame 1 (loop) | none |

Payoffs land at 2.6, 9.6 and 12.5 s, and the verdict at 19.3 s: gaps of 7.0, 2.9 and 6.8 s. The struck $62,000 (5.2-6.1 s) fills the first gap and the "yours: 6.2%" tooltip (15.1 s) the last.

Sound: each value lands with a tick and the goal with a pop plus the reveal sting (peak ≈ 13k, against ≈ 5.5-6k for the ticks); a tooltip opens with a soft pop (≈ 2.5k), so the notes never outrank the results.

**Full guide VO script (01b, 26 s)** (the spec splits it into 8 caption lines, each result starting its own line; the words are these)
> At $20 an hour, you pay about $2,579 a year. A million-dollar salary: $62,000? No. It stops at $184,500: $11,439. That's about 1.1% of their pay. Yours: 6.2%, on every dollar, all year. You pay more than five times their rate.

Read the numbers as: "twenty", "twenty-five seventy-nine", "sixty-two thousand", "one eighty-four thousand five hundred", "eleven thousand four thirty-nine", "one point one percent", "six point two percent". Every line's `d` fits at 2.6 words/s with these readings, as the check script counts them.

**The maths** (every on-screen number)

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $20/hr | input | example wage | 20 |
| 2,080 | 40 × 52 | full-time hours a year (series constant) | 2,080 |
| 6.2% | Social Security tax, employee share | 2026 (SSA) | 0.062 |
| **≈ $2,579** (row 1) | $20 × 2,080 × 6.2% | $41,600 a year, all under the cap | 2,579.20 → $2,579 |
| $62,000 (struck guess) | $1,000,000 × 6.2% | what a flat 6.2% would charge | 62,000 (exact) |
| $184,500 | 2026 Social Security wage base | SSA, Kiplinger | 184,500 |
| **$11,439** (row 2) | $184,500 × 6.2% | the most anyone's wages pay in 2026 | 11,439 (exact) |
| **≈ 1.1%** (row 3, verdict) | $11,439 ÷ $1,000,000 | | 1.1439% → 1.1% |
| "more than five times" (VO) | 6.2 ÷ 1.1439 | | 5.42 (5.64 on the shown 1.1%) |

Checks behind the words:
- "On every dollar, all year": $41,600 < $184,500, so all of a $20/hr full-timer's pay is taxed at 6.2%.
- "Their rate" is Social Security tax over total pay. The footer says it is the employee share only (employers pay a matching 6.2% to the same cap) and that Medicare (1.45%, no cap) is not counted.
- Pinned-comment figures: the $1M salary is 24x the $20/hr pay ($1,000,000 ÷ $41,600 = 24.04) but pays only 4.4x the Social Security in dollars ($11,439 ÷ $2,579.20 = 4.44).

**Sources**
- **The 6.2% employee rate and the 2026 wage base of $184,500:**
  - SSA, "2026 Social Security Changes" fact sheet (released with the 2026 COLA, October 2025). https://www.ssa.gov/cola/factsheets/2026.html
  - Kiplinger, "Six Changes to Social Security in 2026": the $184,500 wage base (date not captured). https://www.kiplinger.com/retirement/social-security/changes-coming-to-social-security-in-2026
  - The 6.2% employee rate (and 1.45% Medicare) is statutory and unchanged.
- The cap also limits benefits: SSA's own name for the wage base is the "contribution and benefit base", because earnings above it are neither taxed nor counted when benefits are computed. That is used in the pinned comment only, with no number.

**Assumptions (footer, on screen from 0.0 s):** `ASSUMES 40 hrs × 52 wks · 2026 rates` / `employee share, no Medicare` (2 explicit lines since the QA fix pass; the banner already names Social Security). The footer leaves out $184,500 on purpose: printed at frame 1 it would give away row 2. Not modelled: self-employment tax (12.4% to the same cap), the employer's matching share, Medicare and its 0.9% surtax on high wages, and anyone with two jobs (each employer withholds to the cap and the excess is refunded at tax time).

**Caption / description (verdict in the caption, R11):**
> Social Security takes 6.2% of every dollar you earn, up to $184,500. A $1M salary pays $11,439: ≈ 1.1%. At $20 an hour ($41,600 a year) you pay 6.2% on all of it, all year: more than five times their rate. 2026 figures, employee share; Medicare not counted.
> #socialsecurity #paycheck #moneymath #taxes

**Pinned comment:**
> Medicare (1.45%) has no cap; this is Social Security only. In dollars the $1M salary still pays 4.4x your $2,579, on 24x the pay. And the cap works both ways: pay above $184,500 doesn't count toward their Social Security benefit either.

**Per-platform notes**
- **YouTube Shorts:** use the title above. Frame 1 is a complete question (header, the 6.2% chip, 3 labelled empty rows) and serves as the thumbnail. The finished sheet works as a screenshot and holds 3 s before the clear.
- **Instagram Reels:**
  - The cover is frame 1, with "A $1M SALARY PAYS…?" and the 3 empty rows showing.
  - Caption line 1 is the verdict.
  - Expect fairness comments ("scrap the cap"): the pinned comment gives both sides in numbers, and the series takes no side.
- **TikTok:**
  - Put "Social Security" and "$1 million salary" in the first caption line for search.
  - The share line is the verdict: "You pay 6.2%. A $1M salary pays ≈ 1.1%."
  - If the owner wants a series, the same spec re-runs at any wage under $184,500: only row 1 changes ($15/hr ≈ $1,934; $30/hr ≈ $3,869), and rows 2-3 and the verdict stay as they are.

---

### 01c · Becker rig · "4 DEAD SIMPLE NUMBERS / WILL A 3% RAISE PUSH $65,000 INTO A HIGHER BRACKET?"

- **Spec:** `studio/specs/01c-becker-rig-60k-a-year.json`, 25.3 s (file name and id kept from round 2; the topic changed in the hook pass, see the Review log)
- **Look:** Becker rig. A light void with a floor gradient; our own one-colour (green) stick figure, the only saturated colour; maths in neutral ink. The list is a stack of 4 numbered ledges. At this spec's size the kit sets each label on one line with its dashed empty socket under it (the kit's "rows" layout, checked in stills): labels at 44 px, answers at 64 px, and the goal **$45 at 1.45× (≈ 93 px) on its gold plate**, the biggest number on screen, so the payoff is the climax by size as well as colour (since the 01c assembly pass; before it every answer, the goal included, was about 60-64 px). Since the 01c QA fix pass the gold plate has clear space around it: about 29 px of empty void between it and its label above and 28 px between it and the floor below (at least 26 px even at the peak of its pulse); the rows above sit 16 px apart to make that room. For each slot the number drops in as a white glyph block and types itself, while the operator and the rest of the formula type onto an ink plate that pops into his hands. He holds each plate at his waist, so his arms and legs show (it used to hang at his knees). He winds up and throws the plate (`lookOpts.hits`: kick, chop, kick, then a two-handed slam for the goal, whose heave winds up for a full second over a riser); it slams onto the block with hit lines, chips, a shake and a thud, and the pair crunches into the answer, with its note beside it. The goal lands on a gold plate with the big impact (white flash, camera punch, cash) and a "yes!" jump. After that he acts out the last three VO lines (`lookOpts.acts`): he points at ③'s $450, which pulses and turns green again; wags "no, no"; shrugs at "Yes."; points at the $45, which pulses as the verdict says it; and ends with his hands on his hips, elbows out (a pose distinct from the shrug, whose hands come up to his shoulders).
- **Platform title:** "Will a 3% raise push you into a higher tax bracket?" (11 words, no result)
- **On-screen hook (header):** `4 DEAD SIMPLE NUMBERS` / `WILL A 3% RAISE PUSH **$65,000**` / `INTO A HIGHER BRACKET?` (14 words, 3 lines; "$65,000" in green)
- **No separate input line:** the header already carries $65,000 (the kit hides the input line when the hook shows `input.value`). At 0.0 s slot ①'s block reads `$65,000` and he already holds the `× 1.03` plate; from 0.1 s he flips it up and catches it, so the opening moves from the first half-second.

**The wrong belief it exploits:** "If a raise pushes me into a higher bracket, my whole pay (or my whole raise) gets taxed at the higher rate." US brackets are marginal: only the dollars above the line pay the higher rate. For a single filer on the 2026 standard deduction, 22% starts at **$66,500 of pay** ($50,400 of taxed pay + the $16,100 deduction). A 3% raise takes $65,000 to $66,950, $450 over the line. Those $450 pay 22% instead of 12%: **$45 a year**. The other $1,500 of the raise and all of the old pay are taxed exactly as before. The honest answer to the header is "Yes", and the cost is tiny next to the myth (all taxed pay 10 points more: $5,085, 113 times as much).

**Modelled on:**
- **H31:** "Home Loan Part payment Reduce Tenure NOT EMI", 578,461 views. One fact makes the belief the viewer holds wrong (R5).
- **H64:** "What $1 COSTS you", 1,150,974 views (210x med). R5 again: one word ("costs") makes the held number wrong; here "Yes. It costs you $45."
- **H49, Debt Freedom:** "Yes, daily payments work!", a $2.98 difference, 382,100 views (289.1x). A tiny, honest verdict travels (R12).
- **H48, Debt Freedom:** a frame-1 question with the verdict in the caption, 1,900,000 views (902.5x) (R11).
- **H86, Master Money:** "4 DEAD SIMPLE NUMBERS / FOR BUYING A CAR", 554,900 views (35.6x), and **H84** (3,000,000, 140x): the biggest number first, every later number smaller. Here $66,950 → $66,500 → $450 → $45.
- **Becker devices** (look reference, not benchmark; `alan-becker.md` sections 4 and 6): numbers as objects, operators as tools he throws, results as transformations, and one escalation (kick → chop → kick → slam) toward the smallest number.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "$65,000" in the header at 0.0 s; slot ①'s block reads `$65,000` and the `× 1.03` plate is in his hands; the first caption, "$65,000, plus 3%:", holds no result |
| R2 | mostly | One $ figure in the header (the input), no result in the header or the title. The header also carries "3%", the raise the question is about (both judges flagged it as a second input) |
| R3 | partly | The myth is everyone's, and the caption gives the rule for anyone whose raise crosses the line: (new pay − $66,500) × 10%. But a 3% raise crosses the line only for salaries from $64,564 to $66,499, so for a $50K viewer the honest answer is "no" (judge 2) |
| R4 | yes | $65,000 ≈ median full-time pay ($1,251 a week × 52 = $65,052, BLS Q2 2026); 3% sits just under 2026 raise budgets (3.1-3.5%) |
| R5 | yes | "HIGHER BRACKET?" names the outcome the viewer fears; "Yes. It costs you $45 a year" shows the belief behind the fear is wrong |
| R6 | partly | $65,000, a raise, a year. "You" is in the title and the last ledge label ("What the bracket costs you"), not in the header |
| R7 | yes | Names the viewer's situation (a raise near a bracket line), not a label |
| R8 | yes | 14 words, 3 lines |
| R9 | yes | 4 numbered, labelled ledges with empty sockets at 0.0 s; the last label, "What the bracket costs you", promises one number |
| R10 | yes | $66,950 at 2.3 s, the biggest number, first; every later number is smaller, down to $45 |
| R11 | yes | A yes/no question on screen; the verdict answers it ("Higher bracket? Yes.") |
| R12 | yes | "It costs you $45 a year", against the $5,085 the myth implies (113x) |

**Beat sheet** (the becker-rig kit's grammar; times match the spec and the stills; since the 01c QA fix pass, rechecked at 0, 0.1-1.6 in 0.1 s steps, 2.3, 2.6, 10.7, 13.3, 13.8, 16.9, 18.5, 18.65, 20.8, 22.85-23.05, 23.9-25.2 in 0.1 s steps and 25.27 s). Each result starts its own VO line, so its caption pops with the number, never before it.

| t (s) | On screen | VO (caption line) |
|---|---|---|
| 0.0 | **Frame 1:** light void; header (3 lines, "$65,000" in green); mono footer on 2 explicit lines "ASSUMES single, standard deduction / 2026 federal income tax only"; 4 numbered ledges labelled "Pay after 3% / Where 22% starts / Pay over the line / What the bracket costs you" (② to ④ dim, with dashed empty sockets); ① active (green ring), its white block `$65,000` already typed; the figure in the bottom-right corner holds the ink plate `× 1.03` at his waist (its bottom about 60 px off the floor) | "$65,000, plus 3%:" |
| 0.1-1.0 | He dips, flips the `× 1.03` plate up (it turns like a card, a swipe), catches it with a knee bend (a tick) and settles | (same line) |
| ≈1.4-2.3 | Wind-up, then a **kick**: the plate slams onto the block and **$66,950** lands in green at 2.3 s (hit lines, chips, shake, thud); note "+$1,950 raise" beside it | "$66,950." (2.3 s) |
| 4.6 | ② block `$50,400` types; the plate `+ $16,100` pops into his hands | "22% starts at" |
| 6.2 | **Chop** → **$66,500**; note "line + deduction" beside it; ① settles to ink | "$66,500 of pay." (6.2 s) |
| 8.8 | ③ block `$66,950`, plate `− $66,500` | "You crossed it by" |
| 10.4 | **Kick** → **$450**; note "22%, not 12%" (on screen from ≈10.6 s, before the VO says "10 points more") | "$450." (10.4 s) |
| 12.0 | ④ block `$450`, plate `× 10%` | "Only those $450 pay 22%. / 10 points more:" (one caption, broken after "22%.") |
| ≈14.5-15.5 | The goal's heave: he sinks into a deep squat for a full second over a rising riser, then heaves | (same line) |
| 15.9 | Two-handed **slam** → **$45** at 1.45× on the gold plate, with clear space above and below it: white flash, camera punch, cash; note "22% − 12%"; a "yes!" jump | "$45." (15.9 s) |
| 16.6 | He lands pointing at ③: **$450** pulses (a ring of hit lines, a pop) and turns green again; ③'s tab gets the green ring. ①'s note "+$1,950 raise" is on screen, so "$450 of $1,950" can be read off the sheet | "Not your whole raise." |
| 18.3 | He wags "no, no" (forearm up, six swings, the other hand on his hip); $450 stays green | "Not your whole pay." |
| 20.4 | Verdict replaces the captions, on 2 lines: "Higher bracket? Yes." / "It costs you **$45 a year**", with a green swoosh under "$45 a year"; ding (chrome); he shrugs | "Higher bracket? Yes. It costs you $45 a year." |
| 22.7 | On the spoken "$45" he points at the gold plate: **$45** pulses 1.05× about its left edge, with sparks at both ends of the plate, a small camera punch and a pop, all inside the plate's clear space; ④'s tab rings; $450 settles back to ink | (same line) |
| 24.1-25.3 | Right after the last VO line he puts his hands on his hips, elbows out; the finished sheet and the verdict hold for 1.2 s and the video loops (this kit holds rather than clearing) | none |

Payoffs land at 2.3, 6.2, 10.4 and 15.9 s, and the verdict at 20.4 s: gaps of 3.9, 4.2, 5.5 and 4.5 s. The longest still stretch is ≈1.8 s (12.7-14.5 s, while he holds the `× 10%` plate under the VO). The opening moves from 0.1 s (the flip), and after his closing pose settles (≈24.5 s) only ≈0.8 s of breathing remains before the loop.

**Full guide VO script (01c, 25.3 s)**
> $65,000, plus 3%: $66,950. 22% starts at $66,500 of pay. You crossed it by $450. Only those $450 pay 22%. 10 points more: $45. Not your whole raise. Not your whole pay. Higher bracket? Yes. It costs you $45 a year.

The words are unchanged since the hook pass; in the spec they are 11 caption lines (since the 01c assembly pass), each result opening its own line: "$65,000, plus 3%:" / "$66,950." / "22% starts at" / "$66,500 of pay." / "You crossed it by" / "$450." / "Only those $450 pay 22%. 10 points more:" / "$45." / "Not your whole raise." / "Not your whole pay." / the verdict line. Since the 01c QA fix pass the "Only those $450…" caption carries a line break after "22%." (`\n` in the spec; the kit's caption splitter treats a no-break space as a space, so only `\n` holds a phrase together), so it never splits "pay / 22%".

Read the numbers as: "sixty-five thousand", "three percent", "sixty-six thousand nine fifty", "twenty-two percent", "sixty-six thousand five hundred", "four fifty", "ten points", "forty-five". Every line's `d` fits at 2.6 words/s with these readings, as the check script counts them.

**The maths** (every on-screen number; all exact, so no "≈" anywhere in 01c)

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $65,000 | input | example salary, ≈ the median full-time pay | 65,000 |
| 3% / × 1.03 | input | example raise | 1.03 |
| **$66,950** (①) | $65,000 × 1.03 | a $1,950 raise | 66,950 (exact) |
| +$1,950 raise (① note) | $66,950 − $65,000 | 3% of $65,000 | 1,950 (exact) |
| $50,400 | top of the 12% bracket, in taxed pay | 2026, single (Rev. Proc. 2025-32) | 50,400 |
| $16,100 | standard deduction | 2026, single | 16,100 |
| **$66,500** (②) | $50,400 + $16,100 | the 22% line, in pay | 66,500 (exact) |
| **$450** (③) | $66,950 − $66,500 | pay over the line | 450 (exact) |
| 22%, not 12% (③ note) | the rate on those $450, and the rate they would have paid below the line | 2026 single brackets | 22% and 12% |
| 22% − 12% (④ note) | 22 − 12 | the extra rate on those dollars | 10 points |
| **$45** (④, verdict) | $450 × 10% | | 45 (exact) |

**Cross-check against the full 2026 federal tax** (single filer, standard deduction, wages only; the check script recomputes each line)
- Before: taxable $65,000 − $16,100 = $48,900; tax = $1,240 + 12% × ($48,900 − $12,400) = $1,240 + $4,380 = **$5,620.00**.
- After: taxable $66,950 − $16,100 = $50,850; tax = $1,240 + 12% × $38,000 + 22% × $450 = $1,240 + $4,560 + $99 = **$5,899.00**.
- Tax on the raise = **$279.00** = 12% × $1,500 ($180) + 22% × $450 ($99). The same raise taxed all at 12% would be $234.00. The difference, **$45.00**, is exactly the number on screen.
- The rule on screen, (new pay − $66,500) × 10%, matches the full calculation to the cent for every salary a 3% raise carries across the line: $64,564 to $66,499 (the check runs it in $25 steps). Below $64,564 a 3% raise does not reach the line; above $66,499 the viewer was already in 22%.
- Only $450 of the $1,950 raise (23%) pays 22%: "Not your whole raise."
- Pinned-comment figures: FICA on the raise 7.65% × $1,950 = $149.18 (6.2% Social Security, $66,950 being far below the $184,500 wage base, plus 1.45% Medicare); kept after federal tax and FICA: $1,950 − $279 − $149.18 ≈ **$1,522**. The myth (all taxed pay 10 points more): 10% × $50,850 = **$5,085**, 113 times the real $45.

**Sources**
Two independent publishers for each tax parameter, because these figures could be wrong. (Until hook pass 2 these citations sat in 01b's section; they moved here when 01b changed topic.)
- **2026 standard deduction, single, $16,100.**
  - IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill", 2025-10-09. https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill
  - CPA Practice Advisor, "IRS Adjusts Tax Brackets, Standard Deduction for 2026", 2025-10-09 ("22% for incomes over $50,400"). https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/
- **2026 single brackets:** 10% to $12,400; 12% from $12,400 to $50,400 ("$1,240 plus 12% of the excess over $12,400"); 22% above it, to $105,700.
  - IRS, Rev. Proc. 2025-32 (2025-10-09). https://www.irs.gov/pub/irs-drop/rp-25-32.pdf
  - Tax Foundation, "2026 Tax Brackets and Federal Income Tax Rates" (publication date not captured). https://taxfoundation.org/data/all/federal/2026-tax-brackets/
- **FICA** (pinned comment only): 6.2% Social Security up to $184,500 plus 1.45% Medicare; SSA 2026 fact sheet and Kiplinger, as in 01b.
- **$65,000 against the median** (R4, write-up only): BLS Q2 2026 median full-time pay of $1,251 a week (source as in 01a).
- **3% against 2026 raise budgets** (R4, write-up only): The Conference Board, 40th annual Salary Budget Survey (released 2025-09-03): 3.4% average salary increase budgets for 2026, via WorldatWork Workspan Daily, https://worldatwork.org/publications/workspan-daily/conference-board-projects-3-4-u-s-pay-increase-budgets-for-2026 (search extract; it also lists Payscale 3.5%, WorldatWork 3.6% and WTW 3.5%). Publisher page: https://www.conference-board.org/publications/US-salary-increase-budgets-2025-2026. Mercer, "2026 actual increase budgets (US)": mean merit increase actually paid in 2026 of 3.1% (756 employers, March 2026 survey), https://www.imercer.com/articleinsights/2026-actual-increase-budgets-us (search extract; a direct fetch was blocked by this session's proxy).

**Assumptions (footer, on screen from 0.0 s):** `ASSUMES single, standard deduction` / `2026 federal income tax only` (2 explicit lines since the 01c assembly pass; the old single line wrapped mid-phrase, "standard / deduction"). Not modelled: state income tax; FICA (it is flat, so a bracket never changes it; in the pinned comment); pre-tax 401(k) or HSA deferrals, which move the line up by the amount deferred; credits; other filing statuses, which have their own lines.

**Caption / description (verdict in the caption, R11):**
> Higher bracket? Yes. It costs $45, not your raise. At $65,000, a 3% raise ($1,950) takes you to $66,950: $450 past $66,500, where 2026's 22% bracket starts for a single filer on the standard deduction ($50,400 of taxed pay + $16,100). Only those $450 pay 22% instead of 12%: $45 a year. Every other dollar is taxed exactly as before. Crossed the line too? (new pay − $66,500) × 10% is all the bracket costs you. Federal income tax only.
> #taxbracket #raise #moneymath #taxes

**Pinned comment:**
> If the myth were true (all pay taxed 10 points more): 10% × $50,850 = $5,085. Real extra: $45. Full federal tax on the $1,950 raise: $279; FICA $149.18; you keep ≈ $1,522.

**Per-platform notes**
- **YouTube Shorts:**
  - Use the title above. Frame 1 is a complete question (header, 4 labelled ledges, the typed block and the plate in his hands) and serves as the thumbnail.
  - The Becker look is the most "watchable without sound" of the three (Becker's mute test): each number is physically hit smaller.
- **Instagram Reels:**
  - The cover is frame 1.
  - Becker's Shorts show high like rates and few comments. The comment this teaser will draw is "what about my salary?": answer it with the caption's rule and the $64,564-$66,499 window above.
- **TikTok:**
  - Put "tax bracket" and "3% raise" in the first caption line for search.
  - The share line is the verdict: "Higher bracket? Yes. It costs you $45 a year."
- **Production:** the kit draws everything (poses: stand, flip-and-catch, wind-up, kick, chop, slam, jump, point, wag, shrug, hands on hips). No extra props are needed.

---

## Summary table

| ID | Look | Header (t = 0) | Runtime | Key numbers | Verdict | Hook score /10 (see below) |
|---|---|---|---:|---|---|---:|
| 01a | clean-sheet | 3 DEAD SIMPLE NUMBERS / PAID **EVERY 2 WEEKS**? / WHAT YOUR BUDGET MISSES | 26.0 s | $2,500 · $65,000 · not × 24 = $60,000 · $5,000 · × 12 = $60,000 · $65,000 − $60,000 = $5,000 · 10×2 + 2×3 = 26 · 13 months | Every 2 weeks = 13 months of pay a year | 8 |
| 01b | live-sheet | 3 DEAD SIMPLE NUMBERS / YOU PAY **6.2%** TO SOCIAL SECURITY. / A $1M SALARY PAYS…? | 26.0 s | $20/hr · ≈ $2,579 · ~~$62,000~~ (struck guess) · $184,500 × 6.2% = $11,439 · ≈ 1.1% | You pay 6.2%. A $1M salary pays ≈ 1.1% | 7.25 (hook pass 2; adopted, was 4.25) |
| 01c | becker-rig | 4 DEAD SIMPLE NUMBERS / WILL A 3% RAISE PUSH **$65,000** INTO A HIGHER BRACKET? | 25.3 s | $66,950 · $50,400 + $16,100 = $66,500 · $450 · $450 × 10% = $45 | Higher bracket? Yes. It costs you $45 a year | 7.5 (hook pass; adopted, was 3.5) |

**How the hook scores were set.** 01c carries the two judges' average from the round-2 hook pass and 01b from hook pass 2 (details in the Review log); 01a was in neither and keeps my estimate. Before the hook pass, the judge scored the round-1 versions 7, 6 and 6, and these were my estimates for the round-2 revisions:
- **01a (8):** the header now carries R5 ("the pay your budget forgets") and a question (R11) on top of the most common US pay period, and the verdict is novel. It is not higher because the payoff is the 52-vs-48 fact, which some viewers already know, and the format is untested faceless.
- **01b (estimated 7 for the take-home version; hook pass 4.5 and hook pass 2 4.25 for it; 7.25 for the adopted Social Security cap hook):** the judges scored the take-home version lower than my estimate: the $20/HR header is a filter (H57), "actually lands" is H87's soft verb, the first payoff ($41,600 at 2.7 s) is the number the viewer already holds, and take-home pay is familiar ground. The adopted hook plants the viewer's own rate (6.2%), lets the viewer's flat-rate guess ($62,000) be typed and struck, and ends lopsided (6.2% against ≈ 1.1%). It is not higher because the rival's $1M is not the viewer's number, the cap is known to some viewers, and the stake is fairness, not money the viewer keeps.
- **01c (estimated 7 for the per-day raise; hook pass 3.5 for that hook, 7.5 for the adopted bracket hook):** the old hook asked the viewer to hold two inputs and promised a wrong answer ("actually pays you") the video never showed. The bracket hook attacks a belief most viewers hold, with a yes/no question and a tiny, exact verdict.

## Caveats

- **Fact-checking method.**
  - Round 1 used 10 web searches; this revision used 2 more (2026 raise budgets).
  - Direct fetches of irs.gov, bls.gov, census.gov, energy.gov, taxfoundation.org, imercer.com and hrdive.com were blocked by this session's network proxy, so those pages were read from search extracts only.
  - Every on-screen tax figure has two independent publishers, and every displayed result is robust to the plausible spread of its inputs. No on-screen number in 01a rests on an outside figure. Since the hook passes, 01b's rest only on the 2026 Social Security rate (6.2%) and wage base ($184,500), and 01c's only on the 2026 single bracket line ($50,400) and standard deduction ($16,100).
  - Neither hook pass used new web searches: every new number is arithmetic on figures already sourced here (hook pass 2: SSA and Kiplinger for 6.2% and $184,500).
- **Untested.** No teaser has been posted. The 01a and 01b MP4s were re-rendered in the QA fix pass (`studio/out/01a-clean-sheet-paid-biweekly.mp4`, `studio/out/01b-live-sheet-20-an-hour.mp4`) and frames pulled from them match the stills.
- **Kit dependence.**
  - The 01a header is written as 3 explicit lines that each fit whole at 56 px (the last has 23 characters). A longer third line would split again in the clean-sheet fitter.
  - The clean-sheet captions show a whole VO line at once, unspoken words in grey. 01a therefore starts every result on its own VO line in the spec. If the kit later hides unspoken words, or chunks them 2-4 words at a time like the live-sheet kit, the split lines still read correctly.
  - The 01a climax (②'s $5,000 re-marked blue beside ③'s at the verdict) and the 64 px verdict live in `clean-sheet/formats/dead-simple-list.js`. The format re-fits the chrome's verdict element at mount, because the chrome has no option for a larger verdict.
  - The 01b tooltips float in `live-sheet/formats/dead-simple-list.js`, a format-local version of the kit's tooltip. Other live-sheet formats still open the kit's slot, which pushes the rows below.
- **`noteT` is a kit extension, not yet in the contract.** Since the assembly pass, 01a (items ① and ②) and 01b (item 3) set an optional item field `noteT`, the moment a note appears, read by the clean-sheet and live-sheet `dead-simple-list` modules. `studio/FORMATS.md` does not list it yet, so a kit without it shows the note just after its result, about 1.5-3 s before the VO says it. The check script requires it wherever `ANCHORS` names a note.
- **01b depends on the live-sheet wrong-guess beat** (`lookOpts.wrongGuess`): if a later kit change drops it, the struck $62,000 (the hook's R5) disappears silently. Re-check the 5.4 and 6.4 s stills after any live-sheet change.
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

### Hook pass (2026-10-07)

The owner rejected round 1 partly because "hooks are weak". For 01b and 01c, four rewritten hooks (A-D, each a header + first VO line + the first 1.5 s + a platform title, built on the hook bank's P1-P9 and R1-R12) were scored against the current hook by two judges. **Rule:** average the two judges' scores per option (an option either judge marks dishonest is out; both judges marked every option honest); adopt the best option only if its average is **≥ 7.5** and **≥ 0.75 above the current hook**, otherwise keep the current hook (a clearly better title may still be taken).

| Teaser | Option | Judge 1 | Judge 2 | Average | Decision |
|---|---|---:|---:|---:|---|
| 01b | current: "WHAT $20/HR ACTUALLY LANDS" | 5 | 4 | 4.5 | **kept** |
| 01b | A: "YOU DON'T ACTUALLY MAKE $20 AN HOUR" | 7 | 5.5 | 6.25 | |
| 01b | B: "AT $20/HR, WHO TAKES MORE: INCOME TAX OR FICA?" | 6.5 | 7 | 6.75 | best option, under 7.5 |
| 01b | C: "POV: YOUR FIRST $20/HR PAYCHECK" | 6 | 5 | 5.5 | |
| 01b | D: "PAID HOURLY? × 147 IS YOUR REAL MONTH" | 5.5 | 6 | 5.75 | |
| 01c | current: "WHAT A 3% RAISE ON $60,000 ACTUALLY PAYS YOU" | 4 | 3 | 3.5 | |
| 01c | A: "GOT 3% ON $60,000? WHY YOUR PAYCHECK BARELY MOVED" | 6.5 | 6 | 6.25 | |
| 01c | **B: "WILL A 3% RAISE PUSH $65,000 INTO A HIGHER BRACKET?"** | 7.5 | 7.5 | **7.5** | **adopted** (+4.0) |
| 01c | C: "$5 A DAY OR A 3% RAISE: WHICH PAYS MORE?" | 6 | 4 | 5.0 | |
| 01c | D: "OFFERED 3% ON $60,000? WHAT ASKING FOR 4% IS WORTH" | 5 | 5 | 5.0 | |

**The judges' diagnosis of the old hooks.**
- **01b:** "$20/HR" in the header filters to $20/hr earners, as Yannick's H57 did (50,206, 2.8x med), instead of H84's universal "your salary" (3,000,000, 140x). "ACTUALLY LANDS" is the soft-verb grammar of H87 (35,520, 3.3x med). The 2.7 s payoff ($41,600) is the number the viewer already holds, and what the header promises is paid only at 15.0 s. Gross against take-home is familiar ground.
- **01c:** two inputs at once ($60,000 and 3%); "ACTUALLY PAYS YOU" promised a wrong answer the video never showed (every slot was the same $1,800 re-expressed, before tax); after ÷ 12 the ÷ 52 and ÷ 365 slots were predictable; the per-day reframe is a known weak device (H73, 1.1x med).

**What I applied:**

| # | Teaser | Change | Notes |
|---|---|---|---|
| HP1 | 01c | **Option B as proposed:** header "4 DEAD SIMPLE NUMBERS / WILL A 3% RAISE PUSH **$65,000** / INTO A HIGHER BRACKET?" (14 words); title "Will a 3% raise push you into a higher tax bracket?"; input $65,000; the six VO lines and their timings; the four items (labels, formulas, results, tones, `t` and `resultT`); verdict "Higher bracket? Yes. It costs you **$45 a year**" at 20.4 s; `typeDur` 0.7; hits kick, chop, kick, slam; duration 26.5 s; caption line 1 and pinned comment. File name and id kept (`01c-becker-rig-60k-a-year`), so links in `teasers.json` and the render paths still work; the id is never shown to viewers. | Both judges re-ran every number ($66,950; $66,500; $450; $45; full tax $5,620 → $5,899; FICA $149.18), and the check script now asserts them. The write-up's 01c section, the shared Decisions, the summary table and the caveats are rewritten for the new topic. |
| HP2 | 01c | **Footer shortened** to "ASSUMES single filer, 2026 · standard deduction · federal income tax only" | The proposed footer ("ASSUMES single, 2026 · 22% starts at $50,400 of taxed pay · $16,100 standard deduction · federal income tax only", 113 characters) cannot fit the kit's 2-line footer even at the 34 px floor; a first trim rendered at 36 px (a type-floor warning). The new line sets at 40 px on 2 lines. $50,400 and $16,100 are still on screen, in ②'s formula, as the VO reaches the line. |
| HP3 | 01c | **Notes shortened:** ② "line + deduction", ③ "taxed at 22%", ④ "22% − 12%" | With the proposed notes ("taxed-pay line + standard deduction", "only this is taxed 22%", "22% − 12% = 10 points") the kit fell back to its "lines" layout, which dropped all three notes and wrapped two labels; mid-length notes kept them only at 36 px (3 warnings). The short notes all show at 40 px beside their values, every label sits on one line, 0 warnings (variants rendered and compared in stills). "10 points" is still spoken in vo[3]. (Since the 01c QA fix pass ③'s note is "22%, not 12%", the same 12 characters, and ① has the note "+$1,950 raise".) |
| HP4 | 01c | Verdict highlight bound with NBSPs (`$45 a year`) | Series rule: a highlight never breaks across lines; the check script expects it. (Since the 01c QA fix pass the verdict also breaks after "Yes." with `\n`, "Higher bracket? Yes." / "It costs you **$45 a year**": the NBSPs kept the highlight whole but the line still broke inside "It costs / you".) |
| HP5 | 01c | Judge 2's honesty point written up | $65,000 was chosen to straddle the line: a 3% raise crosses it only for salaries from $64,564 to $66,499, so a $50K viewer's honest answer is "no". This is now in the maths section, the R3 row and the per-platform notes, and the caption's rule ((new pay − $66,500) × 10%) covers anyone whose raise does cross. The check script verifies that rule to the cent across the whole window. |
| HP6 | 01b | **Kept** (hook, title and body unchanged) | The best option, B, averaged 6.75, under the 7.5 bar. No candidate title was clearly better for the current body: A's "You don't actually make $20 an hour" is the wording both judges rated the strongest R5 line, but in the current video its answer (about $17 an hour) is only said at 17.9 s, after two monthly figures, so that title would promise a payoff the body buries. |

**Open items from the judges (not applied, recorded for the next pass):**
- **01c:** "PUSH $65,000 INTO" parses awkwardly in 1.5 s (judge 1); the 14-word header carries both 3% and $65,000, and the 2.3 s payoff ($66,950) is plain arithmetic that does not yet touch the question (judge 2); bracket explainers are a familiar genre outside the benchmark. An unscored variant that fixes the parse and adds "you" within 15 words: "4 DEAD SIMPLE NUMBERS / WILL 3% ON **$65,000** PUSH YOU / INTO A HIGHER BRACKET?" (14 words). It was not applied because it was not scored.
- **01b, if B is revisited:** judge 2's honesty fix (say "FEDERAL TAX", not "INCOME TAX": federal plus a typical 4% state tax, about $4,276, beats FICA) and judge 1's limit (FICA out-takes federal income tax only up to about $50,000 a year for a single filer on the standard deduction; my check gives $50,115), so the "AT $20/HR" qualifier must stay.

**Checks after the hook pass:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **250 checks, 0 failed**. For 01c the script now derives every number from the 2026 bracket table (the line = $50,400 + $16,100) and rewrites `EXPECT`, `VO_NUMBERS` and `ANCHORS` (item i ↔ VO line i; the $45 sits in vo[3]); `APPROX_RESULTS` is all False. New sensitivity checks: $65,000 in the 12% bracket and $66,950 in 22%; the full federal tax $5,620.00 → $5,899.00; the raise's tax $279 = $180 + $99; minus the same raise all at 12% = the $45 on screen; the on-screen rule against the full calculation for every salary from $64,564 to $66,499 ($25 steps, largest error $0.00); FICA $149.18, kept ≈ $1,522 and the myth's $5,085 (113x) from the pinned comment; $65,000 against the BLS median ($65,052, 0.08% off); 23% of the raise taxed at 22%. The per-month, per-week and per-day raise checks and the old marginal-rate pin check were removed with the topic.
- Mutation test on scratch copies of the specs: (1) ④'s result "$45" → "$46"; (2) vo[3]'s "$45" → "$54"; (3) ②'s `resultT` 6.1 → 7.2; (4) the header's "$65,000" → "$64,000". Each copy fails (2, 2, 1 and 1 failed checks, exit 1): 4 of 4 caught.
- `node src/cli.mjs check` on 01a, 01b and 01c → 3/3 clean, 0 errors, 0 warnings.
- `node src/cli.mjs stills` for 01c at 0, 1.5, 2.4, 3.0, 6.3, 10.5, 16.3, 21.5 and 26.4 s: frame 1 shows the 3-line header with "$65,000" in green, the 2-line footer, 4 labelled ledges, ①'s block `$65,000` typed and the `× 1.03` plate in his hands; at 2.4 s **$66,950** has just landed with the hit burst; at 3.0 s it sits in slot ① under the caption "$65,000, plus 3%: $66,950."; the notes appear beside $66,500, $450 and $45; the verdict card reads "Higher bracket? Yes. It costs / you $45 a year". 01b's spec is unchanged, so its round-2 stills stand.

### Hook pass 2 (2026-10-07)

The owner's "hooks are weak" note was re-run for 01b. The current hook and five rewrites were scored by two judges: R1, the round-1 best option B with the honesty fixes from the open items above, and four new options, A-D. **Round-2 rule:** average the two judges' scores per option (an option either judge marks dishonest is out; both judges marked every option honest). Adopt the best option if its average is **at least 1.0 above the current hook**, even below 7.5; otherwise keep the current hook (a clearly better title may still be taken).

| Option | Hook (header / title) | Judge 1 | Judge 2 | Average | Decision |
|---|---|---:|---:|---:|---|
| current | "WHAT **$20/HR** ACTUALLY LANDS" / "What $20 an hour actually lands each month" | 4.5 | 4 | 4.25 | replaced |
| R1 | "4 DEAD SIMPLE NUMBERS / AT **$20/HR**, WHO TAKES MORE: FEDERAL INCOME TAX OR FICA?" | 6.5 | 6.5 | 6.5 | |
| **A** | **"3 DEAD SIMPLE NUMBERS / YOU PAY 6.2% TO SOCIAL SECURITY. / A $1M SALARY PAYS…?"** / "You pay 6.2% Social Security. What does a $1M salary pay?" | 7.5 | 7 | **7.25** | **adopted** (+3.0) |
| B | "POV: YOU MAKE **$1M** A YEAR. / SOCIAL SECURITY STOPS ON…?" (a date reveal, ≈ Mar 9) | 5 | 5 | 5.0 | |
| C | "DOES **$20/HR** TAKE HOME / 3 GRAND A MONTH?" (yes on paper, no kept) | 6 | 5 | 5.5 | |
| D | "**$20/HR**: TOP OR BOTTOM HALF / OF US FULL-TIME PAY?" (BLS median) | 5 | 5 | 5.0 | |

**Why A won (the judges' reasons, both re-ran every number).**
- 6.2% is a number nearly every W-2 viewer owns, not a wage filter (R3), and it is small and familiar (R4).
- The "…?" plants a wrong answer the viewer works out in their head ($62,000). The sheet then types it and strikes it in red: H71's red wrong number (190,187, 4.5x med), done with numbers rather than a lecture (R5).
- The named rival ends lopsided and repeatable: 6.2% against ≈ 1.1%, the P4/R12 shape of H17 "USA and EUROPE" (2.8M, 345.09x, about 4x the comment rate). The fairness grievance should drive comments, as Jake's twist duels did (136 and 44 comments, against 23).
- The viewer's own figure lands at 2.3 s (R10). There are 3 countable rows and 14 words.

**Why it is not an 8 (open items, recorded for the next pass).**
- The header carries two figures, 6.2% and $1M (judge 2: R2 asks for one input).
- The rival's $1M is not the viewer's number. The stake is fairness, not money the viewer keeps.
- The Social Security cap is semi-known (a recurring "millionaires stop paying" item and "scrap the cap"), so some viewers already hold the right answer, and the "…?" telegraphs "less".
- In dollars the $1M earner still pays 4.4x more, so expect pedant comments. The pinned comment now answers that in numbers (see HP2-4).

**The other options, in brief.** R1 fixed its honesty hole ("FEDERAL income tax", since any state income tax over $370.40 would flip it) but stays a $370 near-tie behind the jargon "FICA", with the known $41,600 as its first payoff. B breaks R3/R4 at frame 1 (the only $ figure is a $1M the viewer has never earned), and "SOCIAL SECURITY STOPS" can be misread as benefits stopping. C's fake-out "yes" is a real R5 move, but it is still gross against take-home and its "no" depends on the single-filer footer. D gives its answer away at 2.7 s ($65,052) to anyone who knows $20/hr ≈ $41k.

**What I applied:**

| # | Change | Notes |
|---|---|---|
| HP2-1 | **Option A as proposed:** header, footer, the six VO lines and their timings, the three items (labels, formulas, results, tones, notes, `t`, `resultT`), `lookOpts.wrongGuess` ($1,000,000 × 6.2% = $62,000 typed at 4.0 s, landing at 5.2 s, struck at 6.1 s), verdict "You pay __6.2%__. A $1M salary pays **≈ 1.1%**." at 19.3 s with the ding, duration 26.0 s, `typeDur` 0.6. The input row ($20/hr, 40 hrs a week) is unchanged. File name and id kept (`01b-live-sheet-20-an-hour`). | The 01b section of this write-up is rewritten for the new topic: wrong belief, modelled-on, hook rules, beat sheet (checked against stills), VO script, maths, sources, footer, caption, pinned comment and platform notes. The shared Decisions, the summary table, the scores note and the caveats follow. |
| HP2-2 | Verdict highlight bound with an NBSP (`≈ 1.1%`) | Series rule: a highlight never breaks across lines. The proposal had a plain space; the check script now expects the NBSP. The 21 s still shows "≈ 1.1%" whole on the card's second line. |
| HP2-3 | **Title in the series' sentence case:** "You pay 6.2% Social Security. What does a $1M salary pay?" | Option A's words, unchanged; only the capitals follow 01a and 01c. |
| HP2-4 | **Pinned comment extended** past the proposal's Medicare line with two true counterweights: "In dollars the $1M salary still pays 4.4x your $2,579, on 24x the pay. And the cap works both ways: pay above $184,500 doesn't count toward their Social Security benefit either." | It answers the judges' pedant nit (4.4x in dollars) and keeps the fairness framing honest. SSA's own name for the wage base, "contribution and benefit base", states the second fact; it carries no number. The check script verifies 24x and 4.4x. |
| HP2-5 | **Tax citations moved** (standard deduction and brackets) from 01b's old section to 01c's Sources | 01c relies on them; 01b now cites only SSA and Kiplinger (6.2%, $184,500). |
| HP2-6 | **Dropped from the series:** the ×0.85 keep rule, the "≈ for a rough rule" exception, and the $3,467 / $2,947 / $17 figures | They belonged to the old 01b body. No other teaser used them. |

**Checks after hook pass 2:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **266 checks, 0 failed**. For 01b the script now derives every number from the 2026 Social Security rate and wage base and rewrites `EXPECT` (including `lookOpts.wrongGuess.formula/result`), `VO_NUMBERS` and `ANCHORS` (item i ↔ VO line i; item 2 types on vo[2]'s "stops"). `APPROX_RESULTS` = [True, False, True].
  - `display_value` now reads a percent result ("≈ 1.1%" = the typed ratio × 100, rounded to 0.1 point).
  - New wrong-guess checks: it types on vo[1], lands on "$62,000", and is struck on vo[2]'s "No."; it types before row 2's real formula and is struck before the real result lands; its typed formula gives its shown result exactly.
  - New sensitivity checks: $41,600 × 6.2% = $2,579.20; $41,600 < $184,500 ("on every dollar, all year"); the cap binds at $1M; $62,000 and $11,439 exact; 1.1439% → 1.1; "more than five times" holds on both 1.1439% (5.42x) and the shown 1.1% (5.64x); the pinned comment's 24x and 4.4x.
  - The ×0.85, take-home and FICA-vs-tax checks for 01b were removed with the topic. `fed_tax` and `fica` stay for 01c.
- Mutation test on scratch copies of the new 01b spec: (1) ③ "≈ 1.1%" → "≈ 1.2%"; (2) the guess "$62,000" → "$62,500"; (3) vo[2]'s "$11,439" → "$11,349"; (4) `strikeT` 6.1 → 7.0; (5) the header's "6.2%" → "6.5%"; (6) ① "≈ $2,579" → "≈ $2,580"; (7) a "≈" added to the exact "$11,439". Each copy fails (2, 2, 2, 1, 1, 2 and 3 failed checks, exit 1): 7 of 7 caught.
- `node src/cli.mjs check studio/specs/01b-live-sheet-20-an-hour.json` → 0 errors, 0 warnings.
- `node src/cli.mjs stills` for 01b at 0, 1.5, 3, 5.4, 6.4, 10, 10.6, 13.5, 17 and 21 s:
  - Frame 1 shows the 3-line yellow banner with "6.2%" in the black chip, the bar typing `= $20 × 2,080`, the dashed $20/hr cell, 3 labelled empty rows, the 3-line footer, and the caption "AT $20 AN HOUR,".
  - At 1.5 s the bar reads `= $20 × 2,080 × 6.2%`. At 3 s **≈ $2,579** sits in red in row 1 with its working line and the tooltip "6.2% of every dollar".
  - At 5.4 s $62,000 sits in row 2; at 6.4 s it is struck in red under the caption "NO".
  - At 10.6 s $11,439 shows with the tooltip "taxed only up to $184,500". At 13.5 s ≈ 1.1% is on the yellow row with "yours: 6.2%".
  - At 21 s the verdict card reads "You pay 6.2%. A $1M / salary pays ≈ 1.1%.".

### Assembly pass (2026-10-08)

Both teasers were rendered and read beat by beat: contact sheets, stills at 0 s, each beat and the last frame, and frames pulled from the MP4s. The owner rejected round 1 for its look and weak hooks, so the bar was that every frame reads as designed and true. Lint was clean before and after (0 errors, 0 warnings). The hooks, VO and verdicts are unchanged. Every change is in what the sheet shows and when.

| # | Teaser | What the stills showed | What I did |
|---|---|---|---|
| A1 | 01a | When a note did not fit beside its result, the layout put it after the formula's "=", so the sheet read `$2,500 × 2 = 10 months a year` (a false equation) and `$2,500 × 26 = not × 24`. | `clean-sheet/formats/dead-simple-list.js`: in the `aside` layout a note now stacks under its label when the pair stays about the box's height. Aside labels are set in ink and notes in grey. The after-the-"=" placement is now only a fallback; no spec or kit sample uses it with an aside label. ②'s label dropped its redundant "(2 checks)" (the formula already shows × 2), so label and note fit on two lines. |
| A2 | 01a | ③'s formula used $60,000, and nothing on the sheet said where it came from (only the VO did). | ②'s note is now "× 12 = $60,000" (it was "10 months a year"): the budget's 12 normal months, the same $60,000 as the × 24 guess. The check script evaluates "$5,000 × 12" against it. "10 months a year" stays as a sensitivity check but is no longer printed. |
| A3 | 01a | The sheet held still for 4.0 s (3.1-7.1 s) and 5.7 s (14.8-20.5 s) while the VO talked. ③'s caret blinked for 3.3 s before its result. | A new optional item field, `noteT`, is read by both kits. "not × 24" lands at 4.5 s on "Not times 24"; "× 12 = $60,000" lands at 10.4 s on "12 normal months: $60,000". ③ now types at 12.6 s on "From $65,000, that leaves $5,000" (it was 10.4 s). A check line, `check: 26 − 24 = 2 checks`, types at 15.6-17.0 s on "It's your 2 extra checks". The longest still stretch under the VO is now 3.5 s (17.0-20.5 s). The check line costs 8% of the type size: the sheet sets at 92% (results 61 px, the goal 75 px). |
| A4 | 01a | The beat sheet said ② lands on the sand highlighter. | Corrected: in this kit a `neutral` result lands on green, as the stills show. |
| A5 | 01b | The two notes that carry the insight, "6.2% of every dollar" and "taxed only up to $184,500", were fully readable for about 0.5 s each, because each tooltip closed as soon as the formula bar moved on. | `live-sheet/formats/dead-simple-list.js`: a tooltip now stays open while the next formula types and closes 0.15 s before the next value lands (a later result, a wrong guess or a check line), so the rows below settle before anything lands. The notes now read at ≈3.1-4.6 s and ≈10.4-11.9 s. Row 3 moved from 11.3/12.1 s to 11.7/12.5 s, still inside its VO anchors (11.30 ± 0.5 and 12.07 ± 0.5), to give row 2's note its 1.5 s. |
| A6 | 01b | "yours: 6.2%" opened at 12.4 s, 2.7 s before the VO says "Yours: 6.2%", and the sheet then held for 6.9 s. | Set `noteT: 15.1` on row 3: the tooltip opens on the VO line that says it, which splits the hold into 2.6 s and 3.9 s. |

**Checks after the assembly pass:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **280 checks, 0 failed**. New checks:
  - every `noteT` sits at its VO line (± 0.5 s) and after its result;
  - a note that continues its result ("$5,000 × 12 = $60,000") is true;
  - the check line is true, starts typing at its VO line, and finishes after the last result and before the verdict;
  - ② × 12 equals ③'s $60,000, which equals the × 24 guess;
  - 26 − 24 equals the 2 in ③'s label.
  `EXPECT` and `ANCHORS` follow the new spec: ③ types on vo[4], and notes and the check line have their own anchors.
- Mutation test on scratch copies: a wrong note total ($65,000), a wrong check line (3 checks), `noteT` off its VO line, `noteT` before its result, a late `checkT`, and 01b without `noteT`. 6 of 6 caught.
- `node src/cli.mjs check`: 01a and 01b are clean (0 errors, 0 warnings). The kit samples that share the two edited modules (4 clean-sheet, 2 live-sheet and 3 live-sheet stress specs) are also clean, 9/9. No clean-sheet sample changes where its notes sit (they use the stack3, dense and bare layouts).
- Stills checked: 01a at 0, 3.2, 5.0, 9.8, 11.0, 13.6, 15.0, 17.2, 21.2 s and the last frame. 01b at 0, 2.8, 3.2, 4.4, 5.0, 6.5, 10.6, 11.4, 11.9, 12.3, 12.8, 15.8, 17, 19, 21.5 s and the last frame. Both contact sheets were checked too.
- MP4s: `studio/out/01a-clean-sheet-paid-biweekly.mp4` and `studio/out/01b-live-sheet-20-an-hour.mp4`, each 1080 × 1920, 30 fps, 26.0 s, with audio. I pulled frames with ffmpeg at 0, 17.2 and 21.2 s (01a) and at 0, 10.6 and 21.5 s (01b). Each matches its still (mean pixel difference about 1.5/255, codec noise), and every number in them matches this write-up.

**Not changed (kit grammar, recorded):**
- In 01b each tooltip opens a slot that pushes the rows below, and the assumption line, down while it is open. Every live-sheet format shares this. (Fixed for dead-simple-list in the QA fix pass: the pills float and the table never moves.)
- A frame that falls inside a tooltip's 0.22 s close wipe shows a clipped pill. The 12-frame contact sheet catches two such frames (4.73 s and 18.91 s). Neither is held on screen in the video. (Fixed for dead-simple-list in the QA fix pass: a pill now leaves whole, by a 0.14 s fade.)
- In 01a, a frame inside the 0.16 s between a highlighter's swipe and its figure's pop shows an empty box (9.45 s on the contact sheet). This is the clean-sheet motion grammar.

### QA fix pass (2026-10-08)

The round-2 QA scored 01a 6/10 and 01b 6.5/10. It judged from 16-frame contact sheets, full-size stills, frames pulled from the MP4s and a scan of the SFX timing. Every must and should issue is applied below, plus the cheap nits. 01c was not part of this pass.

| # | Teaser | Sev. | QA issue | What I did |
|---|---|---|---|---|
| Q1 | 01a | must | The header wrapped as "PAID EVERY 2 WEEKS? THE / PAY YOUR BUDGET FORGETS", stranding "THE" after the question mark | 3 explicit lines: "3 DEAD SIMPLE NUMBERS / PAID **EVERY 2 WEEKS**? / WHAT YOUR BUDGET MISSES" (12 words). The last line has 23 characters; "WHAT YOUR BUDGET FORGETS" (24) still split, as the stills showed. Each line sets whole at 56 px, at y 252-433. The platform title is now "Paid every 2 weeks? What your budget misses". `EXPECT` was updated. |
| Q2 | 01a | must | The clean-sheet caption shows the whole VO line, so frame 1 already showed "$65,000 a year", and every later result was readable about 2 s early | Each result now starts its own VO line at its `resultT`: "Your paycheck, times 26. On $2,500:" / "$65,000 a year." (2.7 s); "A normal month: 2 checks," / "$5,000." (9.3 s); "From $65,000, that leaves" / "$5,000." (14.5 s). Frame 1's caption has no result. The words are unchanged, and every line's `d` fits at 2.6 words/s. `VO_NUMBERS` and `ANCHORS` were rewritten (11 lines). |
| Q3 | 01a | should | The key insight ("the 2 months with 3 paydays") was voice-only, with nothing moving from 17.0 to 20.5 s | The check line is now `check: 10×2 + 2×3 = 26 paydays`, typed at 17.5-19.2 s as the VO says "from the 2 months with 3 paydays" (its own caption line since Q2). It shows the calendar behind ①'s × 26. The check script verifies it against the calendar simulation: 10 two-payday months and 2 three-payday months in every 26-payday year. |
| Q4 | 01a | should | The payoff did not read as the climax: ③'s blue $5,000 repeated ②'s green $5,000, and the verdict sat at about caption size with nothing reacting | `clean-sheet/formats/dead-simple-list.js`, at the verdict (20.8 s, with the verdict's own blue swipe): any earlier result that shows the goal's figure (②'s $5,000) re-wipes from its rested green to the goal blue (`hlBox` retone), and both boxes pulse once (4.5%). The eye reads "a normal month = the forgotten checks = one more month", 13 in all. The verdict is set up to 64 px (it was 56), so its two lines fill the caption band. |
| Q5 | 01a | should | "Not times 24: that's only $60,000" was spoken, but only "not × 24" showed | ①'s note is "not × 24 = $60,000" at 4.5 s. The check script now evaluates a "not × N = $X" note on the step's input ($2,500 × 24 = $60,000). |
| Q6 | 01a | should | The 2-line footer crowded the hook and wrapped inside its parenthesis | "ASSUMES 26 paydays a year · pay before tax" (one line). The 27-payday caveat stays in the pinned comment. With the space this freed, the sheet sets at full size, check line included (results 66 px, the goal 82 px). |
| Q7 | 01a | should | Step labels started at x ≈ 493 / 453 / 505 | In the `aside` layout every label (and its note) starts on one column, right of the widest result box plus 26 px: x ≈ 529 for all three. |
| Q8 | 01b | must | VO line 1 never said what the $2,579 was ("…that's about $2,579 a year" sounded like a wrong pay claim) | "At $20 an hour, you pay about $2,579 a year." ("you pay" ties it to the banner's "YOU PAY 6.2% TO SOCIAL SECURITY"). It counts 11 words at the series' 2.6 words/s, so the line runs 4.2 s. vo[1] and the wrong guess moved from 4.0 to 4.2 s, still landing at 5.2 s on "$62,000" and struck at 6.1 s on "No.". Row 1 now lands at 2.6 s, on its own caption line "$2,579 a year." Naming "Social Security" as well would have needed 12 words and pushed every later beat. |
| Q9 | 01b | should | Opening a tooltip inserted a ~70 px slot, so rows and the footer jumped 3 times, and at 15.8 s the footer reached the caption band | `live-sheet/formats/dead-simple-list.js`: a note's pill floats over the next row's still-empty result cell (two balanced lines when one line would cover that row's label), above the selection. The last row's note opens in a slot reserved under the table from frame 1. The card (y 444-1184), the rows (144 px) and the footer (y 1198-1298) never move. The kit's slot remains only as the fallback for a note that cannot float (none in 01b). |
| Q10 | 01b | should | The tooltip close clipped from the centre, leaving a lone "y" (≈4.75 s) and a cut "$184" (≈12.0 s) | Pills still wipe out of their notch to open, but leave whole: the pill and notch fade and shrink 6% together over 0.14 s, as one composited group, so the notch never shows through a fading pill. Checked at 4.95 and 12.25 s. |
| Q11 | 01b | should | The caption "AT $184,500: $11,439" ran about 1 s ahead of the cell | Two fixes. The format now gives the chrome a caption hold for every result and the wrong guess, keyed on the number as typed ("$2,579" for "≈ $2,579"), not only the count-up. The spec also starts each result on its own VO line ("No. It stops at $184,500:" / "$11,439."), so the caption pops with the cell at 9.6 s. |
| Q12 | 01b | should | The 1.1% climax landed with a soft tick, while the tooltip pops were about 3.5× louder | The goal lands with a pop (0.9) plus the reveal sting (0.45) when it cannot count up. Other values tick at 0.8 and tooltip pops drop to 0.18. Measured peaks in the new MP4: goal ≈ 13.3k, ticks ≈ 5.1-6.0k, tooltip pops ≈ 2.5k. |
| Q13 | 01b | should | The 3-line footer broke mid-phrase ("employee / share") | "ASSUMES 40 hrs × 52 wks · 2026 rates" / "employee share, no Medicare" (2 explicit lines). |
| Q14 | 01b | should | The label "A $1M salary's" read as cut off | "A $1M salary pays" (one line at 48 px; checked in stills). `EXPECT` was updated. |
| Q15 | 01b | nit | The $62,000 guess rendered in dark slate, while the write-up said grey | The format now pencils a wrong guess in the sheet's grey (#667085, 4.9:1 on white), then turns it red as the strike runs through. |
| Q16 | 01b | nit | Frame 1's focal point is split between $20/hr and the $1M question | Not changed: QA called it acceptable as the open loop. |
| Q17 | 01b | nit | "More than five times" has no number on screen | Not changed: QA called it optional. The verdict card already shows both rates (6.2% against ≈ 1.1%), and adding "5×" would cost the verdict a third line. |
| Q18 | 01a | nit | The verdict's blue box on "13 months" starts at x ≈ 82, left of the 86 px margin; header line 1 has no hierarchy | Not fixable in a format file (clean-sheet CSS and chrome). Reported to the kit owner (see below). |

**Reported to kit owners (shared files, not edited):**
- **Clean Sheet captions** show the whole VO line with the unspoken words in grey, so any result in a line is readable before it lands. They should hide unspoken words, or chunk them 2-4 words at a time as Master Money and the live-sheet kit do. 01a works around this by splitting its VO lines.
- **Clean Sheet verdict:** the chrome has no option for a larger verdict, so the dead-simple-list format re-fits `ctx.page._.verdict`, a private field, at mount (64 px). An option for this would be cleaner. Also, the inline highlight's padding puts the box left of the 86 px text margin at a line start.
- **Clean Sheet header:** there is no option to set line 1 (the series line) smaller or in the accent colour, so the 3-line hook block has no hierarchy.
- **Live Sheet tooltips:** every other live-sheet format still uses the kit's slot (rows below jump) and the clip close (stray glyphs mid-close). The floating pill and fade close in `live-sheet/formats/dead-simple-list.js` (`pillFit`, `makePill`, `setPill`) could move into `lib.js`.
- **Brand mark casing:** it is uppercase in Clean Sheet and lowercase in Live Sheet.

**Checks after the QA fix pass:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **302 checks, 0 failed**. The new and updated checks:
  - the "not × 24 = $60,000" note against the step's input;
  - the check line `10×2 + 2×3 = 26 paydays`, against ①'s 26 and against the calendar simulation (every 26-payday year has 10 two-payday months and 2 three-payday months);
  - ③'s label ties to that check line, ① note = ③'s $60,000, and ② and ③ both equal one month of pay (13 × $5,000 = $65,000);
  - `VO_NUMBERS` and `ANCHORS` for the split VO lines;
  - the new header, footers, note, check line and 01b label in `EXPECT`.
- Mutation test on scratch copies: 7 of 7 caught (listed at the top).
- `node src/cli.mjs check`: 01a and 01b are clean (0 errors, 0 warnings). So are the kit samples that share the two edited modules: 4 clean-sheet `dead-simple-list*` samples, and 2 live-sheet samples plus 3 stress specs.
- Stills checked:
  - 01a at 0, 5, 15, 19.5, 20.75, 21.05, 21.5 s and the contact sheet.
  - 01b at 0, 2.75, 3.5, 4.95, 5.4, 6.4, 8.8, 10.8, 12.25, 12.3, 12.6, 15.8, 21 s and the contact sheet.
- MP4s re-rendered: `studio/out/01a-clean-sheet-paid-biweekly.mp4` and `studio/out/01b-live-sheet-20-an-hour.mp4`, each 1080 × 1920, 30 fps, 26.0 s, with audio. Frames pulled at 0 and 21.5 s (01a) and at 10.8 and 15.8 s (01b) match the stills (mean pixel difference 0.6-2.5 of 255, codec noise).

### 01c assembly pass (2026-10-08)

01c was not part of the QA fix pass, so this pass judged it against the same bar from a 12-frame contact sheet, full-size stills at every beat and frames pulled from the MP4. Every number on screen was re-checked against the maths table above and the check script; none changed.

| # | Issue found | What I did |
|---|---|---|
| C1 | **Captions spoiled every result.** The becker-rig chrome pops a whole VO line in about 0.3 s, so "$66,950" showed at 0.3 s (it lands at 2.3 s), "$66,500" 1.5 s early, "$450" 1.5 s early, and the climax "$45" at 12.3 s, 3.5 s before the slam (01a's Q2 in this kit). | Each result now starts its own VO line at its `resultT`, as in 01a and 01b: "$65,000, plus 3%:" / "$66,950." (2.3 s); "22% starts at" / "$66,500 of pay." (6.2 s); "You crossed it by" / "$450." (10.4 s); "Only those $450 pay 22%. 10 points more:" / "$45." (15.9 s). The words are unchanged; three results moved by 0.1 s (6.1 → 6.2, 10.3 → 10.4, 15.8 → 15.9) so the line before each still fits at 2.6 words/s. "Not your whole raise." and "Not your whole pay." are now 2 lines too, one per gesture (C4). |
| C2 | **The footer broke mid-phrase:** "… 2026 · standard / deduction · federal income tax only" (01b's Q13 in this kit). | `ASSUMES single, standard deduction` / `2026 federal income tax only`: 2 explicit lines, each a whole phrase, at 40 px. Every assumption is still there ("single" is the filing status; the caption and pinned comment keep "single filer"). |
| C3 | **The payoff was not the visual climax.** Every answer, the goal included, set at about 60-64 px; the $45's gold plate was only 1.06× (01a's Q4). | `becker-rig/formats/dead-simple-list.js`: in the rows layout only the goal row is as tall as its gold plate (the other value lines no longer reserve the plate's height), and a new first fitting pass sets the goal at 1.45× (else 1.3×, 1.15×) as long as every other answer keeps 64 px or more. 01c now sets answers at 68 px and the **$45 at ≈ 99 px**, the biggest number on screen. The goal's heave now winds up for up to 1 s over the riser (it was 0.62 s), so the slam is earned. |
| C4 | **The sheet held still for 3.1 s (17.3-20.4 s) and then 5.4 s (21.1-26.5 s)** while the VO said "Not your whole raise. Not your whole pay." and the verdict (01a's A3). | A new optional `lookOpts.acts` (read by this kit's format file only): the figure's acting after the goal, keyed to the VO. 01c: at 16.6 s he points at ③ and **$450** pulses green ("Not your whole raise."); at 18.3 s he wags "no, no" ("Not your whole pay."); at 20.4 s he shrugs as the verdict pops ("Higher bracket? Yes."); at 22.7 s, on the spoken "$45", he points at the gold plate and **$45** pulses with a ring of hit lines and a small camera punch; at 24.8 s he stands with his hands on his hips. Pointing is now aimed (the arm's IK targets the answer), and the pointed-at row's tab gets the green ring. The longest still stretch is now ≈1.8 s, under the VO; the silent closing hold after his last move is ≈1.4 s. |

**Checks after the 01c assembly pass:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **336 checks, 0 failed**. Updated for 01c: the new footer in `EXPECT`; `VO_NUMBERS` and `ANCHORS` for the 11 VO lines (each `resultT` on its own line's start); `acts` added to the becker-rig `lookOpts` keys. New checks: every act is a move the kit has, a pointed item exists, each act sits on the VO words it plays (± 0.5 s; the closing pose after the last VO line and ≥ 1.2 s before the end), none starts before the figure lands from the goal's jump, and the acts are in time order.
- Mutation test on scratch copies of the 01c spec: 8 of 8 caught (listed at the top).
- `node src/cli.mjs check`: 01c is clean (0 errors, 0 warnings), and so are the 3 becker-rig `dead-simple-list*` kit samples that share the edited module (4/4). The first sample's goal ("$37.50 an hour") now also sets big on its plate; the 6-item samples keep the lines layout.
- Stills checked: 0, 2.4, 3.0, 6.3, 10.5, 12.5, 14.2, 14.9, 15.4, 15.95, 16.3, 16.75, 16.8, 17.0, 18.45, 18.6, 20.7, 21.0, 22.85, 25.0 and 26.47 s, plus the contact sheet. Every caption shows its number only as the sheet lands it; no text overlaps outside the 0.26 s hit bursts; the footer and the 4 labels are whole at frame 1.
- MP4 re-rendered: `studio/out/01c-becker-rig-60k-a-year.mp4`, 1080 × 1920, 30 fps, 26.5 s, with audio (25 SFX cues). Frames pulled at 0, 6.3 and 22.85 s match the stills (mean pixel difference 0.7-1.9 of 255, codec noise), and every number in them matches this write-up.

**Reported to the kit owner (shared files, not edited):**
- `looks/becker-rig/README.md` §5 does not yet document `lookOpts.acts` or the big-goal pass (both are documented in the format file's header comment).
- **Becker-rig captions** pop a whole VO line in about 0.3 s, so any result inside a line is readable before it lands. The kit could hold a line's numbers until a beat time (as the live-sheet kit does). 01c works around it by splitting its VO lines.
- `teasers/v2/teasers.json` (format 1's `check` field) still describes the check as 266 checks; it is not part of this pass.

### 01c QA fix pass (2026-10-08)

The round-2 QA scored 01c 7/10: the maths exact (it re-derived every number by hand, and the check passed 336 of 336), the structure right, but short of the bar on the first second and the ending. Every must and should issue is applied below, plus the cheap nits. No number changed; every new on-screen figure is derived in the check script.

| # | Sev. | QA issue | What I did |
|---|---|---|---|
| Q19 | must | The verdict wrapped mid-phrase, "Higher bracket? Yes. It costs / you $45 a year", on the frame held longest (the share line) | `verdict.text` is "Higher bracket? Yes.\nIt costs you **$45 a year**" (the NBSPs inside the highlight stay). Line 2 sets whole at the verdict size, the green swoosh is still under "$45 a year" (still at 20.7, 22.85 and 25.27 s). `EXPECT` and a new "verdict breaks after 'Yes.'" check. |
| Q20 | should | Frame 1 complete, but nothing moved from 0.3 to 1.4 s (0 px measured), while the benchmarks move at 0.0 s | `becker-rig/formats/dead-simple-list.js`: a plate that is pre-typed at frame 1 (an item at t ≤ 0.3) now gets an idle. From 0.1 s he dips, flips the `× 1.03` plate up (it turns like a card, its apex under his head), catches it with a knee bend and settles; then the kick's wind-up at ≈1.4 s. A swipe goes on the release, and a tick plus a soft thud on the catch. The old typing sound at 0.0 s, for a block that was already typed, is gone. `resultT` stays 2.3 s. Measured over 0.1 s steps (caption band excluded), every interval from 0.1 to 1.0 s changes 4,600-18,500 px; 1.0-1.4 s is the settle (≈1,200-1,600 px); the wind-up starts at 1.4 s. Frame 0 is still the clean hold (the cover). |
| Q21 | should | The cover read "1 Your new pay $65,000": the old pay under a "new pay" label | Item 1's label is "Pay after 3%" (one line). `EXPECT` now checks it (it carries a digit). |
| Q22 | should | "10 points more" was spoken before 12% appeared anywhere | ③'s note is "22%, not 12%" (the same 12 characters, the same layout). It shows from ≈10.6 s; "10" is spoken at ≈14.7 s. A new check asserts this order. |
| Q23 | should | The $45 plate was squeezed: 6 px above the floor and 13 px below its label, and it touched both during the 22.7 s pulse | Format file, rows layout: the goal row reserves clear space, 16 px under its label box and 22 px over the floor (`GOAL_CLR`). A second fitting pass lets the rows above close up to 16 px apart (and tries 1.35× before 1.3×) before the goal gives up any size. 01c keeps the goal at 1.45×; the answers go from 68 to 64 px. The pulse is now 1.05× about the plate's left edge, not 1.1× about its centre. Its burst is sparks at both ends of the plate, inside the plate's own height, instead of a ring that reached into the label and the floor. Measured ink gaps (x 125-480): at rest, 29 px above the plate and 28 px below; at every frame of the pulse (22.85-23.05 s), at least 26 px above and 26 px below. |
| Q24 | should | 2.5 s of silent tail after the VO, with zero motion from 25.1 to 26.5 s | The "proud" act moves to 24.1 s, right after the last VO line, and the duration is 25.3 s. The pose settles by ≈24.5 s, then ≈0.8 s of breathing, then the loop. The check script now holds 01c to a 25-44 s lane with a ≥ 1.2 s hold after the VO (01a and 01b keep 26-44 s and ≥ 1.5 s). The closing pose still has to sit after the last VO line and ≥ 1.2 s before the end. |
| Q25 | should | The caption broke as "Only those $450 pay / 22%. 10 points more:" | vo[6] is "Only those $450 pay 22%.\n10 points more:" (the kit's caption splitter treats a no-break space as a space, so only `\n` works). The still at 13.3 s shows the 2 phrases on 2 lines. The words, numbers and word count are unchanged (`split()` treats `\n` as a space), and a new check asserts the break. |
| Q26 | nit | The acting barely read: the closing hands-on-hips looked like the shrug, the wag like a wave, and his right side sat under the button rail | The format file's `proud` pose is now hands on hips with the elbows out front and back (a diamond either side), clearly unlike the shrug's hands at the shoulders. The wag keeps the other hand on his hip, so it reads as a scolding "no, no". The figure stands 28 px further left (at 0.84×, hip at ≈872-883 px), so his back arm and pencil stay left of x 940. |
| Q27 | nit | "Not your whole raise." had only one side on screen ($450) | Item 1's note is "+$1,950 raise" (beside $66,950 at 40 px from 2.5 s), so "$450 of $1,950" can be read off the sheet at 16.6 s. `EXPECT` and a new check tie it to ③'s $450. |
| Q28 | nit | The `× 1.03` plate at knee height made frame 1 read as a head behind a sign on the floor | The format's hold pose carries each plate at his waist (its bottom ≈ 60 px off the floor at frame 1), so his arms and legs show. The corner the plates share grows from ≈90 to ≈130 px above the floor; only row ④'s value line is in it, as before. |
| Q29 | nit | "line + deduction" is jargon | Not changed. A note beside $66,500 has room for about 17 characters at 40 px. "bracket + deduction" (19) and "12% ends + deduction" (20) would drop to a 2-line note under the value, which needs ≈52 px that this layout no longer has after Q23, or to 36 px notes. The row's label ("Where 22% starts") and the VO ("22% starts at $66,500 of pay") carry the meaning. |
| Q30 | nit | Header line 1 has no series/topic hierarchy; tight tracking; the footer reads as part of the hook block | Kit chrome (theme/lib), not editable from a format file: reported below. |

**Checks after the 01c QA fix pass:**
- `python3 teasers/v2/checks/01-dead-simple-list.py` → **342 checks, 0 failed**. Updated for 01c: `EXPECT` (the 2-line verdict, the label "Pay after 3%", the notes "+$1,950 raise" and "22%, not 12%"), the 25-44 s lane and ≥ 1.2 s hold for 01c (with the reason in the script), and a float tolerance on the closing-pose window. New checks: ③'s 12% is on screen before "10 points" is spoken, ①'s raise note matches $66,950 − $65,000 and contains ③'s $450, the vo[6] caption breaks after "22%.", and the verdict breaks after "Yes.".
- Mutation test on scratch copies of the 01c spec: 8 of 8 caught (listed at the top); the unmodified copy passes.
- `node src/cli.mjs check`: 01c is clean (0 errors, 0 warnings), and so are the 3 becker-rig `dead-simple-list*` kit samples that share the edited module (4/4; their contact sheets were checked too). A 0.05 s sampling pass flags one contrast error per spec, for a frame or two, when an ink impact chip flies behind a freshly landed number (01c at 10.60 s). The default 0.25 s sampling is clean.
- Stills checked: 0, 0.1-1.6 (0.1 s steps), 2.3, 2.6, 10.7, 13.3, 13.8, 16.9, 18.5, 18.65, 20.8, 22.85, 22.9, 22.95, 23.0, 23.05, 23.9-25.2 (0.1 s steps) and 25.27 s, plus the 12-frame contact sheet.
- MP4 re-rendered: `studio/out/01c-becker-rig-60k-a-year.mp4`, 1080 × 1920, 30 fps, 25.3 s, with audio (27 SFX cues). Frames pulled at 0, 0.3, 2.6, 10.7, 13.3, 16.9, 22.85, 24.6 and 25.2 s match fresh stills (mean pixel difference 1.1-1.5 of 255, codec noise).

**Reported to the kit owner (shared files, not edited):**
- **Becker-rig header:** line 1 ("4 DEAD SIMPLE NUMBERS") has the same size, weight and ink as the question, so the hook block has no series/topic hierarchy (Master Money sets line 1 in the accent colour, with a bigger topic line). Tracking is very tight ("INTO A HIGHER BRACKET?"), and the 2-line footer sits right under it and reads as part of the hook. QA suggests a smaller or muted line 1 and a little more word spacing.
- **Becker-rig captions:** `wordTokens` splits on `\s`, which matches U+00A0, so a no-break space never holds a caption phrase together. Only `\n` works, and the becker-rig README should say so.
- `looks/becker-rig/README.md` §5 does not yet document this pass's format behaviours: the frame-1 flip of a pre-typed plate, the waist-height hold, the goal's clear space (`GOAL_CLR`) and second fitting pass, the goal's 1.05× left-anchored pulse with end sparks, the new `proud` pose and the 28 px figure shift. All of them are described in the format file's header comment.
