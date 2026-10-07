# Format 1: "N dead simple numbers" (dead-simple-list, hook pattern P1)

**Prepared for:** *Back of the Envelope* (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Writer:** format 1 of 10, round 2
**Deliverables:**
- Specs:
  - [`studio/specs/01a-clean-sheet-paid-biweekly.json`](../../studio/specs/01a-clean-sheet-paid-biweekly.json)
  - [`studio/specs/01b-live-sheet-20-an-hour.json`](../../studio/specs/01b-live-sheet-20-an-hour.json)
  - [`studio/specs/01c-becker-rig-60k-a-year.json`](../../studio/specs/01c-becker-rig-60k-a-year.json)
- Check: [`teasers/v2/checks/01-dead-simple-list.py`](checks/01-dead-simple-list.py). It passes 245 checks with 0 failures.
- Mutation test: the check also caught all 7 deliberately broken spec copies (a wrong result, a missing "≈", a wrong VO number, an off-beat `resultT`, VO read too fast, a wrong label digit, and an unknown string containing a digit).

**Evidence base:**
- The benchmark only: [`research/v2/02-hook-bank.md`](../../research/v2/02-hook-bank.md), [`research/v2/04-formats.md`](../../research/v2/04-formats.md) (rank 1), and the watch studies of Master Money, Yannick and Jake.
- The looks come from [`research/v2/03-look-directions.md`](../../research/v2/03-look-directions.md) (Clean Sheet, Live Sheet) and [`research/v2/watch/alan-becker.md`](../../research/v2/watch/alan-becker.md) sections 3, 4 and 6 (Becker rig).

---

## (a) The format in 5 lines

1. **Mechanic.**
   - One example income sits in slot 1 of an empty numbered list.
   - Each slot types `input × constant`, then resolves to an answer with a unit.
   - The finished screen is a cheat sheet built on one person's numbers.
2. **Hook.**
   - The header is "[N] DEAD SIMPLE NUMBERS / [topic]", with the empty slots visible at 0.0 s.
   - The first spoken line is the first calculation ("Take your salary and multiply it by 0.7…"), with no greeting.
3. **Pace.** The first answer lands by 3 s, then one slot every 4-7 s. Lengths run 27-44 s. There are 0 cuts.
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
   - **Constants drift.** Master Money mixes 50- and 52-week years.
   - **Every watched winner has a presenter.** So the typed list must carry the frame on its own.
   - **Our response:**
     - one concrete topic per episode;
     - one hours constant for the whole series (40 × 52 = 2,080, printed on screen);
     - one footer line for each rough constant;
     - "≈" on every rounded result.

---

## Decisions that apply to all three

- **Lane discipline.** The task seeds for 01b and 01c each had a slot that prices a purchase in minutes of work: "what one hour of your work costs a purchase" and "what your commute/coffee costs in minutes of work". Pricing things in hours of work belongs to format 8 (unit-ladder), so I replaced both slots with wage numbers that stay in our lane.
  - **01b:** the "a month is 4 weeks" trap, then take-home pay.
  - **01c:** the commute-adjusted real hourly. This is Master Money's own step 4 ("40 + 10 = 50" hours) from the 3M reel, redone with a sourced commute and consistent constants.
- **01a follows the task seed, not hook-bank Rewrite A.** The seed asks for real yearly pay, the 2 "bonus" checks and the monthly number. Rewrite A's slots were $65,000 / $5,417 / $31.25. Following the seed produced a verdict the rewrite lacked: **paid every 2 weeks = 13 months of pay a year.**
- **One hours constant: 2,080 = 40 hrs × 52 weeks.**
  - `04-formats.md` suggested 2,000 hours (50 weeks).
  - The task seeds use 2,080 (the "$28.85 an hour" for $60,000 is ÷ 2,080).
  - We use 2,080 everywhere and print it in the footer or a slot note. No slot mixes 50 and 52 weeks.
- **The "≈" policy.** A result gets "≈" when it is rounded or rests on the rough ×0.85 tax rule. Exact products ($65,000, $5,000, $41,600, $800) do not. The check script enforces this for each slot.
- **Series header grammar (the same in all three).**
  - Line 1 is the series phrase.
  - Line 2 is "IF YOU …" with the stake highlighted. This merges Master Money's two-line header with Yannick's wage filter ("Do all 4 if you make $20/hr").
- **Risk: the series name.** "DEAD SIMPLE NUMBERS" is Master Money's own branded phrase, and `04-formats.md` says to use "a series name of our own".
  - I kept it because it is the seed the owner approved and the format's id.
  - If the owner wants it swapped, "ROUGH-BUT-RIGHT NUMBERS" fits the brand and the header width. It is a one-line edit in each spec and in `EXPECT` in the check script.
- **Not run: the studio linter.** It needs the look kits (`studio/looks/` holds only `_test`, task #11 is pending). The check script covers the maths, the VO and the timing contract. Safe zones, the type floor and overlaps wait for the kits.

---

## (b) The teasers

### 01a · Clean Sheet · "3 DEAD SIMPLE NUMBERS / IF YOU'RE PAID EVERY 2 WEEKS"

- **Spec:** `studio/specs/01a-clean-sheet-paid-biweekly.json`, 31.0 s
- **Look:** Clean Sheet. Off-white page, typeset formulas in grey mono, results on highlighter boxes, circled step numbers, a pointer that never writes. The formula stays above its result, so the sheet builds into worked maths.
- **Platform title:** "3 dead simple numbers if you're paid every 2 weeks" (10 words, no result)
- **On-screen hook (header):** `3 DEAD SIMPLE NUMBERS` / `IF YOU'RE PAID **EVERY 2 WEEKS**` (10 words)
- **Input badge at 0.0 s:** `Your paycheck $2,500 every 2 weeks`

**The wrong belief it exploits:** "Every 2 weeks" = twice a month = 24 paychecks = **$60,000**. In fact there are 26 paydays (364 ÷ 14). Ten months bring 2 checks and two months bring 3, so the "extra" two checks add up to a whole 13th month of pay that a twice-a-month budget never counts.

**Modelled on (grammar stolen):**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x; IG mirror 1,700,000, 27.8x. We copy the two-line series header, slot 1 typing at frame 1, and the spoken opener "Take your salary and multiply it by 0.7…", which becomes "Take your paycheck, times 26".
- **H57, Yannick:** "Do all 4 if you make $20/hr and watch your finance change". 50,206 views, 2.8x med. We copy the "if you [are]…" filter on line 2.
- **H76, Jake:** "How to be financially free (in 5 steps)". 983,900 views, 36.3x. We copy the empty numbered list plus a first formula inside the first second.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 $ number at 0.0 s | yes | Badge "$2,500"; slot ① already typing "$2,500 × 26" |
| R2 one input, never the result | yes | Header has no $ figure; the only input is $2,500; $65,000 is withheld until 1.9 s |
| R3 viewer's own number | yes | "Take your paycheck, times 26" works on any biweekly check. Biweekly is the most common US pay period (43.0% of private establishments, BLS CES) |
| R4 small, round, familiar | yes | $2,500 every 2 weeks ≈ the median full-time US paycheck (BLS Q2 2026 median $1,251 a week × 2 = $2,502) |
| R5 implies a wrong answer | yes | "× 24 = $60,000" is shown, struck, and voiced at 3.8 s |
| R6 stake | yes | You, $2,500, a year |
| R7 named, not a label | yes | "If you're paid every 2 weeks" names the viewer's situation |
| R8 ≤ 15 words | yes | 10 words |
| R9 countable loop | yes | ① ② ③ visible and empty at 0.0 s |
| R10 first payoff ≤ 3 s; biggest number first or last | yes | $65,000 at 1.9 s, and it is the biggest number on screen |
| R11 question on screen, verdict in caption | partly | Like the benchmark P1 headers, the header is a promise rather than a question. The caption carries the verdict |
| R12 a verdict | yes | "13 months of pay a year" can be repeated in a comment |

**Beat sheet** (VO read at about 2.6 words/s; times match the spec)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** header; badge "$2,500 every 2 weeks"; ① "Your real yearly pay" typing `$2,500 × 26`; ② ③ empty circles; footer "ASSUMES 26 paydays a year (some years have 27) · pay before tax"; pointer at ① | "Take your paycheck, times 26: $65,000 a year." |
| 1.9 | ① result **$65,000** pops on the green highlighter; note "not × 24 = $60,000" | (same line) |
| 3.8 | `lookOpts.wrongGuess`: `$2,500 × 24 = $60,000` types in grey beside ①, then a coral strike | "Not times 24. That's only $60,000." |
| 6.6 | Pointer taps the "26" | "Every 2 weeks means 26 paydays." |
| 9.2 | ② "A normal month (2 checks)" types `$2,500 × 2` | "A normal month: 2 checks, $5,000." |
| 11.1 | ② **$5,000** (neutral); note "10 months a year" | (same line) |
| 12.2 | Pointer on the note | "10 months a year look just like that." |
| 15.5 | ③ "Your 2 'bonus' checks" types `$65,000 − $5,000 × 12` | "Now take the year, minus 12 normal months." |
| 18.8 | ③ **$5,000** on the blue goal highlighter at 84 px; note "a 13th month of pay" | "$5,000 left over." |
| 20.6 | Pointer glides from ③ back to ① | "Those are your 2 'bonus' checks, in the 2 months with 3 paydays." |
| 25.9 | Verdict "Every 2 weeks = **13 months** of pay a year"; ding; 3% push-in | "That's a 13th month of pay. Every year." |
| 29.0-31.0 | The finished sheet holds, then the results clear back to the frame-1 state (loop) | none |

**Full guide VO script (01a, 31 s)**
> Take your paycheck, times 26: $65,000 a year. Not times 24. That's only $60,000. Every 2 weeks means 26 paydays. A normal month: 2 checks, $5,000. 10 months a year look just like that. Now take the year, minus 12 normal months. $5,000 left over. Those are your 2 'bonus' checks, in the 2 months with 3 paydays. That's a 13th month of pay. Every year.

**The maths** (every on-screen number)

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $2,500 (badge, ①) | input | example paycheck, gross | 2,500 |
| 26 | 364 days ÷ 14 | biweekly calendar | 26 |
| **$65,000** | $2,500 × 26 | | 65,000 (exact) |
| × 24 = $60,000 (struck) | $2,500 × (2 × 12) | the twice-a-month guess | 60,000 |
| **$5,000** (②) | $2,500 × 2 | 2 paydays in a normal month | 5,000 (exact) |
| 10 months a year | 12 − (26 − 24) | months with 2 paydays | 10 |
| **$5,000** (③) | $65,000 − $5,000 × 12 | | 5,000 (= 2 extra checks × $2,500) |
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
> Paid every 2 weeks? That's 26 paychecks, not 24. $2,500 a check is $65,000 a year, and 2 months a year bring a third check: a 13th month of pay. Run yours: paycheck × 26. (Gross pay, before tax.)
> #paycheck #biweekly #moneymath #budgeting

**Pinned comment:**
> About 1 year in 11, the calendar fits 27 paydays instead of 26. On $2,500 checks that year is $67,500. Has your payroll had one yet?

**Per-platform notes**
- **YouTube Shorts:**
  - Use the platform title above. Frame 1 is a complete sentence (header plus badge) and serves as the thumbnail.
  - Captions are burned in from the VO.
  - The clear-to-blank ending lets the Short loop.
- **Instagram Reels:**
  - Set the cover to frame 1, with the empty slots showing. IG picks covers, and Yannick's reels show that a blank-looking page cover can still work if the header carries the hook.
  - Caption line 1 is the verdict.
  - No keyword CTA: in the benchmark, CTAs lift comments, not views, and none of the 1M+ hooks had one.
- **TikTok:**
  - Keep the header inside the band from y 240 to 440.
  - The search terms "paid every 2 weeks" and "biweekly paycheck" belong in the caption's first line.
  - The 27-payday pinned comment is the reply bait (comments argue about inputs).

---

### 01b · Live Sheet · "4 DEAD SIMPLE NUMBERS / IF YOU MAKE $20/HR"

- **Spec:** `studio/specs/01b-live-sheet-20-an-hour.json`, 29.0 s
- **Look:** Live Sheet. Designed spreadsheet on black, a yellow title banner, a "≈" formula bar showing the working, rows that fill one cell at a time, and red (wrong) against green (right). The sheet's row numbers do the job of the empty "1. 2. 3. 4.".
- **Platform title:** "4 dead simple numbers if you make $20 an hour"
- **On-screen hook (header):** `4 DEAD SIMPLE NUMBERS` / `IF YOU MAKE **$20/HR**` (8 words)
- **Input chip at 0.0 s:** `Your pay $20/hr · 40 hrs a week`

**The wrong belief it exploits:** "A month is 4 weeks", so $800 × 4 = **$3,200** a month. Two corrections pull in opposite directions:
- A month is a year ÷ 12, about $3,467 gross, so the guess is too low.
- Tax takes about 15%, so about $2,950 actually lands, which is less than even the $3,200 guess.

**Modelled on:**
- **H57, Yannick:** "Do all 4 if you make $20/hr and watch your finance change" + badge "$20/HR → $10K SAVED". 50,206 views, 2.8x med; the best of his wage reels, and the lowest-wage, smallest-goal one. We copy the exact wage as the viewer filter, and the same wage.
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x. We copy the series header, the "Take your … times …" opener, and the shrink-to-the-truth path (the biggest number first, then a smaller true figure).
- **H71, The Market Hustle:** "25 YEARS" in red beside the cyan DCA figure. 190,187 views, 4.5x med. We copy the wrong number in red beside the right one, here the struck $3,200.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "$20/HR" in the header plus the input chip; slot 1 typing at 0.0 s |
| R2 | yes | One $ figure in the header, and it is the input |
| R3 | yes | "Take your hourly pay, times 2,080" applies to any wage, and $20/hr filters in the viewer |
| R4 | yes | $20/hr is Yannick's best-performing wage input |
| R5 | partly | The "4 weeks = $3,200" wrong answer is voiced and struck at 7.9 s, not in the header |
| R6 | yes | You, $20 an hour, a month and a year |
| R7 | yes | The wage names the viewer |
| R8 | yes | 8 words |
| R9 | yes | 4 labelled empty rows: A year / A week / A month / A month, kept |
| R10 | yes | $41,600 at 2.7 s, and it is the biggest number, first |
| R11 | partly | A promise header; the verdict is in the caption |
| R12 | yes | "≈ $2,950 a month, not $3,200" |

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Frame 1:** yellow banner header; input chip; column labels; row labels A year / A week / A month / A month, kept, all with empty results; the formula bar typing `≈ │ $20 × 2,080 hrs`; footer "ASSUMES 40 hrs × 52 wks · × 0.85 ≈ left after 2026 federal tax + FICA, single, before state tax" | "Take your hourly pay, times 2,080: $41,600 a year." |
| 2.7 | Row "A year" snaps to **$41,600** (green) with a click; note "2,080 hrs = 40 × 52" | (same line) |
| 5.3 | Selection moves to "A week"; formula bar `$20 × 40 hrs` | "A week: 40 hours, $800." |
| 6.8 | **$800** | (same line) |
| 7.9 | `lookOpts.wrongGuess`: formula bar `$800 × 4` → **$3,200** in red in the "A month" cell | "So a month is 4 weeks, $3,200?" |
| 11.7 | Red cell struck; formula bar rewrites to `$41,600 ÷ 12` | "No. A year divided by 12." |
| 14.3 | "A month" → **≈ $3,467** (green); note "not $800 × 4 = $3,200" | "About $3,467 a month." |
| 16.1 | Selection moves to "A month, kept" | "Now tax. You keep about 85 cents of each dollar." |
| 18.0 | Formula bar `$3,467 × 0.85` | (same line) |
| 21.0 | Final cell **counts up** over 0.8 s to **≈ $2,950**; the row tints `#FFF3A3` | "That's about $2,950 a month in your account." |
| 23.9 | Verdict "**≈ $2,950** a month lands. Not __$3,200__"; ding; at most a 1.1x zoom on the final cell | "Less than the $3,200 you'd have guessed." |
| 27.0-29.0 | Hold, then the cells clear back to frame 1 (loop) | none |

**Full guide VO script (01b, 29 s)**
> Take your hourly pay, times 2,080: $41,600 a year. A week: 40 hours, $800. So a month is 4 weeks, $3,200? No. A year divided by 12. About $3,467 a month. Now tax. You keep about 85 cents of each dollar. That's about $2,950 a month in your account. Less than the $3,200 you'd have guessed.

**The maths**

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $20/hr | input | example wage | 20 |
| 2,080 hrs | 40 × 52 | full-time hours a year (series constant) | 2,080 |
| **$41,600** | $20 × 2,080 | | 41,600 (exact) |
| **$800** | $20 × 40 | | 800 (exact) |
| $3,200 (struck, red) | $800 × 4 | the "4-week month" guess | 3,200 |
| **≈ $3,467** | $41,600 ÷ 12 | | 3,466.67 → $3,467 |
| × 0.85 | rough keep rate | see the tax check below | 0.85 |
| **≈ $2,950** | $3,467 × 0.85 | | 2,946.95 → nearest $50 = $2,950 |

**Tax check behind ×0.85** (2026, single filer, standard deduction, wages only)
- Taxable income = $41,600 − $16,100 = $25,500.
- Federal income tax = 10% × $12,400 + 12% × ($25,500 − $12,400) = $1,240 + $1,572 = **$2,812.00**.
- FICA = 7.65% × $41,600 = **$3,182.40** (6.2% Social Security, below the $184,500 wage base, plus 1.45% Medicare).
- Net = $35,605.60 a year, a keep rate of **85.6%**.
  - So "about 85 cents of each dollar" is within 1 cent, and the ×0.85 rule is within 0.6 points of the exact rate.
  - The exact net is **$2,967** a month. Both the rule ($2,947) and the exact figure round to **≈ $2,950** at the nearest $50.

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

**Assumptions (footer):** `ASSUMES 40 hrs × 52 wks · × 0.85 ≈ left after 2026 federal tax + FICA, single, before state tax`. The maths ignores state tax, benefit premiums and 401(k) deferrals. The pinned comment invites those.

**Caption / description:**
> $20 an hour is $41,600 a year. A month isn't 4 weeks: it's about $3,467 before tax. After 2026 federal tax + Social Security & Medicare (single, before state tax), about $2,950 lands. Less than the $3,200 "4 weeks" guess.
> #hourlywage #paycheck #moneymath #takehomepay

**Pinned comment:**
> The 0.85 is federal income tax + FICA for a single filer at $41,600 in 2026. Your state takes its own slice, or none. What does your state do to the $2,950?

**Per-platform notes**
- **YouTube Shorts:** use the title above. Thanks to the formula bar, the finished sheet works as a screenshot: hold for 2 s before the clear.
- **Instagram Reels:**
  - The cover is frame 1, with the empty result cells showing.
  - The wage reels in our benchmark live on IG (Yannick).
  - The caption leads with the verdict.
- **TikTok:**
  - "$20 an hour" is a heavily searched phrase, so put it in the first caption line.
  - If the owner wants a series, the same spec can be re-run at $15, $25 and $30. Yannick's evidence: the lowest wage did best, though that is confounded by recency.

---

### 01c · Becker rig · "4 DEAD SIMPLE NUMBERS / IF YOU MAKE $60,000 A YEAR"

- **Spec:** `studio/specs/01c-becker-rig-60k-a-year.json`, 31.0 s
- **Look:** Becker rig. A white void with a floor gradient; our own one-colour stick figure; numbers as physical glyph-objects; operators as tools the figure uses ("÷ 2,080" hammer, "× 8" stacker, "÷ 60" cleaver, "+ 54 min" weight); every hit has a thud, a shake and an impact frame. Maths in neutral ink; the figure is the only saturated colour.
- **Platform title:** "4 dead simple numbers if you make $60,000 a year"
- **On-screen hook (header):** `4 DEAD SIMPLE NUMBERS` / `IF YOU MAKE **$60,000** A YEAR` (10 words)
- **Input prop at 0.0 s:** a heavy `$60,000` block beside the figure

**The wrong belief it exploits:** "$60,000 a year is $28.85 an hour." That figure is true for the hours you are paid. Count the hours the job actually takes (the US-average 27-minute commute each way) and the real hour is **≈ $26**. Master Money's 3M reel landed its "you make 20% less than you think" beat on exactly this step, using a 10-hour commute week. Ours uses the Census average and stays consistent.

**Modelled on:**
- **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make". 3,000,000 views, 140x. We copy the header grammar, the "divide your salary" opener, and the step-4 commute reframe ($27.70 an hour after "40 + 10 = 50").
- **H86, Master Money:** "4 DEAD SIMPLE NUMBERS / FOR BUYING A CAR". 554,900 views, 35.6x. We copy the biggest number as the input at 0.0 s, with every later number smaller.
- **H55, Yannick:** "Do all 5 and watch your finance change". 115,845 views, 67.1x. We copy the countable empty slots and the first formula inside 2 s.
- **Becker devices** (look reference, not benchmark): numbers as objects, operators as tools, results as transformations, and a closing gag that loops. These come from `alan-becker.md` sections 4 and 6: transfer idea 9 uses the same $28.85/h on $60,000.

**Hook rules**

| Rule | Met? | How |
|---|---|---|
| R1 | yes | "$60,000" in the header and as the block at 0.0 s |
| R2 | yes | One $ figure in the header (the input) |
| R3 | yes | "Your salary, divided by 2,080" works on any salary |
| R4 | yes | $60,000 is a round, common salary, a little under the median full-time pay ($1,251 a week × 52 = $65,052, BLS Q2 2026) |
| R5 | partly | The wrong answer ($28.85 as your "real" hour) is beaten in slot 4, not in the header |
| R6 | yes | You, $60,000, a year, an hour |
| R7 | yes | The salary names the viewer |
| R8 | yes | 10 words |
| R9 | yes | 4 numbered empty sockets for the 4 results |
| R10 | yes | ≈ $28.85 at 2.7 s; the input is the biggest number, at 0.0 s |
| R11 | partly | A promise header; the verdict is in the caption |
| R12 | yes | "≈ $26 an hour, not $28.85" |

**Beat sheet**

| t (s) | On screen (Becker actions from `lookOpts.actions`) | VO |
|---|---|---|
| 0.0 | **Frame 1:** white void; header; a `$60,000` block, centre-left; the figure holds a `÷ 2,080` hammer; 4 numbered empty sockets (kept left of x 940 below y 820); footer "ASSUMES 40 hrs × 52 wks · commute ≈ 27 min each way (US avg)"; slot 1 typing `$60,000 ÷ 2,080` | "Your salary, divided by 2,080: about $28.85 an hour." |
| about 1.6 | Wind-up, then a smash: thud, 8 px shake and a white impact frame. The block bursts into a pile of 2,080 coins | (same line) |
| 2.7 | One coin flies into socket 1: **≈ $28.85**; note "2,080 work hrs a year" | (same line) |
| 4.5 | The figure grabs `× 8` and stacks 8 coins (formula `$28.85 × 8`) | "Times 8 hours: about $231 a day." |
| 6.0 | The stack fuses: **≈ $231** into socket 2; note "8-hr day" | (same line) |
| 7.8 | The figure chops one coin with the `÷ 60` cleaver (formula `$28.85 ÷ 60`) | "Divide the hour by 60: about 48 cents a minute." |
| 10.1 | A crumb, **≈ $0.48**, into socket 3 | (same line) |
| 11.9 | A `+ 54 min` weight slides in; the figure strains and drags it onto the day stack (formula `$231 ÷ 8.9 hrs` begins) | "Now add the commute: about 27 minutes each way." |
| 15.6 | The day bar stretches from "8 hrs" to "8.9 hrs" | "Your day just went from 8 hours to 8.9." |
| 20.1 | The $231 stack re-splits across 8.9 hours; each coin visibly smaller | "Same $231. Real hour: about $26." |
| 22.4 | Socket 4: **≈ $26**, a smaller coin than socket 1's; note "8 hrs + 54 min commute" | (same line) |
| 23.1 | Verdict "Count the commute: **≈ $26** an hour, not __$28.85__"; ding; the figure shrugs | "Not $28.85." |
| 25.0 | Gag (`lookOpts.gag`): the figure flicks a tiny "30 sec ≈ 24¢" coin at the camera | "And these 30 seconds, at work? About 24 cents." |
| 28.6-31.0 | Hold; the figure picks the hammer back up (loops to frame 1) | none |

**Full guide VO script (01c, 31 s)**
> Your salary, divided by 2,080: about $28.85 an hour. Times 8 hours: about $231 a day. Divide the hour by 60: about 48 cents a minute. Now add the commute: about 27 minutes each way. Your day just went from 8 hours to 8.9. Same $231. Real hour: about $26. Not $28.85. And these 30 seconds, at work? About 24 cents.

**The maths**

| On screen | Formula | Inputs | Value |
|---|---|---|---|
| $60,000 | input | example salary | 60,000 |
| 2,080 | 40 × 52 | series constant | 2,080 |
| **≈ $28.85** | $60,000 ÷ 2,080 | | 28.846 → $28.85 |
| **≈ $231** | $28.85 × 8 | 8-hour day | 230.80 → $231 (exact $60,000 ÷ 260 = $230.77 → $231) |
| **≈ $0.48** | $28.85 ÷ 60 | | 0.4808 → $0.48 (exact 0.4808) |
| 27 min, 54 min | 27 × 2 | US-average one-way commute, rounded | 54 min a day |
| 8.9 hrs | 8 + 54 ÷ 60 | | 8.9 |
| **≈ $26** | $231 ÷ 8.9 | | 25.96 → $26 (exact $230.77 ÷ 8.9 = $25.93) |
| 30 sec ≈ 24¢ | $0.48 ÷ 2 | half a minute | 0.24 (exact $28.846 ÷ 3,600 × 30 = $0.2404) |

**Robustness:** the commute figure is the one uncertain input, so the display precision was chosen to survive it. The check script asserts that **≈ $26** holds for any commute from 25 to 29 minutes each way (it gives $26.12 at 25 min and $25.74 at 29 min). At 27 minutes, the commute adds up to **234 hours a year** (54 min × 5 × 52), which is spare material for the caption.

**Sources** (the commute could be wrong, so it has two independent publishers)
- **About 27 minutes each way, US average.**
  - US Census Bureau, "Travel Time to Work in the United States: 2019" (ACS-47, 2021): 27.6 minutes in 2019, the record high. https://www.census.gov/library/publications/2021/acs/acs-47.html
  - US DOE Vehicle Technologies Office, Fact of the Week #1338 (2024-04-15): "The United States as a whole averaged about 27 minutes" (ACS 2022 5-year estimates). https://www.energy.gov/cmei/vehicles/articles/fotw-1338-april-15-2024-workers-new-york-state-had-longest-commute-times
  - US DOE VTO, Fact of the Week #1284 (2023-04-03): "Average Travel Time to Work Was About 27 Minutes in 2021". https://www.energy.gov/cmei/vehicles/articles/fotw-1284-april-3-2023-average-travel-time-work-was-about-27-minutes-2021
  - **Not used:** a secondary site gave 27.2 minutes for 2024, and I could not confirm it against the Census table (`data.census.gov` and `api.census.gov` were not reachable from this session). The footer therefore says "≈ 27 min", and the result is robust to ±2 minutes.
- **$60,000 against the median:** used as context only, not on screen. BLS Q2 2026 median full-time pay of $1,251 a week; source as in 01a.

**Assumptions (footer):** `ASSUMES 40 hrs × 52 wks · commute ≈ 27 min each way (US avg)`. The maths assumes:
- a paid 8-hour day with no unpaid lunch;
- a commute 5 days a week (hybrid workers commute less);
- pay before tax.

The "real hour" is a framing: the commute counted as time the job costs you. Master Money's reel uses the same framing.

**Caption / description:**
> $60,000 a year is about $28.85 an hour, $231 a day and 48¢ a minute. Add the US-average commute (about 27 minutes each way) and your real hour is about $26. Your commute? Swap it in: daily pay ÷ (8 + commute hours).
> #salary #moneymath #commute #hourlyrate

**Pinned comment:**
> At 27 minutes each way, the commute is about 234 hours a year. What's your one-way commute? We'll work out your real hour.

**Per-platform notes**
- **YouTube Shorts:**
  - The Becker look is the most "watchable without sound" of the three (Becker's mute test).
  - Frame 1 must read as a complete premise: block, hammer, header and empty sockets.
  - The gag ending invites a rewatch.
- **Instagram Reels:**
  - The cover is frame 1.
  - Becker's Shorts show high like rates and few comments, so the commute question in the pinned comment carries the comments.
- **TikTok:**
  - The gag line ("these 30 seconds at work = 24 cents") is the share trigger.
  - Put "$60,000 salary to hourly" in the caption for search.
- **Production (from `alan-becker.md` §7):**
  - It needs about 7 poses: stand, wind-up, smash, stack, chop, drag/strain, shrug.
  - It needs 4 tool props and one block that bursts into coins.
  - Every operator is a verb the figure performs, and every result is a change in the world.

---

## Summary table

| ID | Look | Header (t = 0) | Runtime | Key numbers | Verdict | Hook score /10 |
|---|---|---|---:|---|---|---:|
| 01a | clean-sheet | 3 DEAD SIMPLE NUMBERS / IF YOU'RE PAID **EVERY 2 WEEKS** | 31.0 s | $2,500 · $65,000 · ×24 = $60,000 · $5,000 · $5,000 · 13 months | 13 months of pay a year | 9.0 |
| 01b | live-sheet | 4 DEAD SIMPLE NUMBERS / IF YOU MAKE **$20/HR** | 29.0 s | $41,600 · $800 · $3,200 (struck) · ≈ $3,467 · ≈ $2,950 | ≈ $2,950 lands, not $3,200 | 7.5 |
| 01c | becker-rig | 4 DEAD SIMPLE NUMBERS / IF YOU MAKE **$60,000** A YEAR | 31.0 s | ≈ $28.85 · ≈ $231 · ≈ $0.48 · ≈ $26 · 24¢ | ≈ $26 an hour with the commute | 8.0 |

**How the hook scores were set.** Each score starts from the R1-R12 tally (01a meets 11 rules and half of R11; 01b and 01c meet 10, with R5 and R11 met only partly). It is then weighted by how surprising and repeatable the verdict is.
- **01a** has the most common US pay period, a wrong answer named on screen, and a novel verdict ("a 13th month").
- **01c** inherits the 3M reel's commute reframe, but the header does not imply the wrong answer.
- **01b's** wrong answer (the 4-week month) appears only in the VO and is a milder surprise.

If the owner wants to raise 01b and 01c, the A/B to test is an R5 header line taken from H84's "What You Actually Make":
- 01b: "IF YOU MAKE $20/HR: WHAT ACTUALLY LANDS"
- 01c: "WHAT $60,000 A YEAR ACTUALLY PAYS AN HOUR"

## Caveats

- **Fact-checking method.**
  - The 10 web searches (of the 14 allowed) were each answered from extracts of the pages listed above.
  - Direct fetches of irs.gov, bls.gov, census.gov, energy.gov and taxfoundation.org were blocked by this session's network proxy, so no page was read in full.
  - Every on-screen tax and commute figure has two independent publishers, and every displayed result is robust to the plausible spread of its inputs.
- **Untested.** No teaser has been rendered or posted. The look kits are not built yet, so the safe-zone, type-floor and overlap lint is still to run.
- **Untested faceless.** Every benchmark winner of this format had a presenter on screen (`04-formats.md`). These are the faceless test.
