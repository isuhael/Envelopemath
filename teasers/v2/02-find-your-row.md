# 02 · Find your row: three teasers

**Format:** `find-your-row` (rank 2 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P7**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews, then again in the round-2 **hook pass**, which replaced all three hooks; then the round-2 **assembly pass** and the round-2 **fix pass** on 2026-10-08; then the **port** of 2026-10-08, when the owner kept two looks: 02a moved from Live Sheet to **Becker Rig** and 02c from Clean Sheet to **Scoreboard**; then the **fix pass on the ports** the same day; then the **condensed cut** of 2026-10-13 (the owner: too many still moments; condense; the end card stays), in `studio/specs-wip/` until the ship step promotes it, and its fix pass the same day; see the [Review log](#review-log))
**Specs:**
- [`studio/specs/02a-becker-rig-3-a-day-by-age.json`](../../studio/specs/02a-becker-rig-3-a-day-by-age.json)
- [`studio/specs/02b-scoreboard-trillion-at-your-wage.json`](../../studio/specs/02b-scoreboard-trillion-at-your-wage.json)
- [`studio/specs/02c-scoreboard-salary-per-hour.json`](../../studio/specs/02c-scoreboard-salary-per-hour.json)
- The condensed cuts (2026-10-13, not yet promoted; the beat sheets and captions below describe them): [`studio/specs-wip/02a-becker-rig-3-a-day-by-age.json`](../../studio/specs-wip/02a-becker-rig-3-a-day-by-age.json), [`studio/specs-wip/02b-scoreboard-trillion-at-your-wage.json`](../../studio/specs-wip/02b-scoreboard-trillion-at-your-wage.json) and [`studio/specs-wip/02c-scoreboard-salary-per-hour.json`](../../studio/specs-wip/02c-scoreboard-salary-per-hour.json). `studio/specs/` and `renders/channel/` hold the round-2 cuts (13.4 / 14.0 / 13.0 s bodies) until then; their beat sheets are in git history (HEAD 3db6d30).

(The slugs are kept from the earlier rounds so the slate index stays linked; the titles and hooks below are the hook-pass versions. The retired Live Sheet and Clean Sheet specs are in `studio/specs/retired/` as `02a-live-sheet-3-a-day-by-age.json` and `02c-clean-sheet-salary-per-hour.json`.)

**Maths check:** [`checks/02-find-your-row.py`](checks/02-find-your-row.py). It recomputes every on-screen number from its inputs (including the 2026 federal tax and FICA behind 02c), rebuilds every display string and VO line from those numbers, then compares them with the three specs. It also checks:
- timing: every VO line must fit **both** 2.6 words/s (hyphenated numbers as one word) **and** 2.8 words/s (hyphenated numbers split, so "twenty-five" is two words); no overlaps; each pointer lands when its VO line starts and after its row has landed (02a's measured pick, a timed compare in Becker Rig, sets off when line 4 starts and lands with the verdict on "more than double"); the verdict and its ding land when the VO says it (02a) or 0.2 s after the last VO line ends, so the verdict is alone on screen (02b, 02c);
- the contract shape and the hook rules;
- that this write-up quotes every VO line, verdict, footer, formula and platform title exactly as the specs carry them (a `\n` line break is quoted here as " / ");
- the look options the specs carry (`lookOpts`: 02a's timed bracket from the 35 row up to the 25 row, its shrug beat inside line 1, its hop on "≈ $240,000" inside line 3 while the 25 row is pointed at, and its figure scale; 02c's verdict row).

Result: **PASSED: all 183 checks** on `studio/specs/` (the round-2 cuts) and **all 225** with `--spec` on the three condensed cuts in `studio/specs-wip/` (216 before the condensed cut's fix pass added a label-time rule per pick). The check is cut-aware since 2026-10-13: a spec of the round-2 length is held to the rules above, any other to the condensed cut's (captions paced for reading, back to back, the hook complete on frame 1, frame 1 clean and moving from frame 2, picks inside their captions, no gap of 0.4 s or more in the scheduled motion before the verdict, the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s). The strings and numbers are the same for both. Mutation tests fail with exit 1 and a named failure (see the Review log).

**Studio linter:** `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 0 warnings** (after the fix pass on the ports, also at a 0.05 s sampling step). Contact sheets and stills at every beat were rendered and inspected, and the final MP4s were rendered and spot-checked frame by frame (see [Assembly pass](#assembly-pass-2026-10-08)): each header and its first number read in frame 1.

**Web searches used:** 9 in the first draft; 2 more in the first revision (2026 tax brackets; 2026 Social Security wage base); none in the hook pass (every new number is arithmetic on figures already sourced here).

---

## (a) The format in 5 lines

1. **What it is.** One header plus a table with one row for each kind of viewer (age, wage, salary). The table is denser than anyone can read in one pass, the viewer's job is to find their own row, and it runs 6-16 s and loops.
2. **Breakouts:**
   - Gage Heward, "What $1 costs you by age": **1,150,974 plays (210x his median)**, 14 s, no voice, 48 rows. https://www.instagram.com/reel/Da_dukjxB56/
   - FinCalC TV's 16-row 6 s cards: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate", **428,862 (54.46x)**, https://www.youtube.com/shorts/K2QbxGXa29k, and "Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate", **264,377 (51.68x)**, https://www.youtube.com/shorts/0Gc_IRi9RbU
3. **It is replicated beyond those two.** Yannick's "⚡️ 3 PAYCHECK RULES ⚡️" did 142,827 (7.9x med), https://www.instagram.com/reel/DeDdp-IRg5E/. FinCalC's "Rs. 5000 SIP Returns … 5 Years to 30 Years" did 137,201 (7.26x). Jake's "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN" did 64,190. The Market Hustle's "You've got 93 days left in 2026." did 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. Five benchmark accounts run it, and three of them are faceless.
4. **What kills it.** A voice walking the rows: Gage's talked tables get 1,456-6,616, and Master Money's talked-through "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)" got **11,745** in 58 s (https://www.instagram.com/reel/DeH6RvuJNXi/). Cutting it to 5-6 rows, and goal-first titles, also hurt. All three teasers below keep the VO to 4 short lines (23-29 words) and let the table do the work.
5. **What it buys.** Reach, not community. Like rates run 0.11-0.70% (FinCalC 0.15% and 0.11%, Gage 0.70%), and FinCalC's keyword CTAs drew 8 and 4 comments on 428,862 and 264,377 views. So: no keyword CTA, a cover that shows the completed table (Gage's one A/B: 4,348 vs 2,844, n = 1), and a pinned comment that invites an argument about the inputs.

**Hook grammar we are stealing (P7):** "What $[tiny amount] costs you by [age / wage]", or "[payout noun] … at [rate]". A payout or cost noun matters: FinCalC's payout-first titles have a median of 100,740 (n=11), against 12,314 for its goal-first titles. The hook pass adds two levers on top of it: **the wrong answer the viewer already holds, shown beside the right one** (The Market Hustle's red-beside-cyan, hook bank §4.5 rewrite B), and **re-pricing in a unit the viewer owns** (HD Guy's P8: here a whole career's pay, and the clock on a workday).

---

## (b) The three teasers at a glance

| | 02a | 02b | 02c |
|---|---|---|---|
| Look | Becker Rig (from Live Sheet, 2026-10-08) | Scoreboard | Scoreboard (from Clean Sheet, 2026-10-08) |
| Platform title | "It's Just $3 a Day": What It Costs You by 65, by Age | How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay | What Time Your 9-to-5 Starts Paying You, by Salary |
| On-screen header (t = 0) | “It’s just **$3 a day**.” / What it costs you by 65: | ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN… | What time your **9-to-5** / starts paying you, by salary |
| Words in hook | 11 | 11 | 9 |
| Rows × columns | 10 × 3 (age, what you think it costs (red), what it really costs) | 11 × 3 (wage, 40 years of your pay, his plan earns it in) | 12 × 3 (salary, tax + FICA minutes a day, paying you from) |
| Runtime (body + the 2.5 s end card) | 7.8 + 2.5 = 10.3 s (condensed; was 13.4 + 2.5) | 7.6 + 2.5 = 10.1 s (condensed; was 14.0 + 2.5) | 7.6 + 2.5 = 10.1 s (condensed; was 13.0 + 2.5) |
| Caption words (on-screen, no narration; the round-2 check counted 29 / 26 / 23 spoken) | 15 | 23 | 19 |
| First number on screen | 18 · $51,465 (red) · ≈ $400,000 | $7.25/hr · $603,200 · ≈ 3.2 min | $200,000 · ≈ 123 min · ≈ 11:03 am |
| First payoff (condensed cut) | "At 18: ≈ $400,000." from 1.45 s, the figure landed on row 18 and pointing | "≈ 3 minutes of his." from 1.3 s, the $7.25 row lit and its working in the strip | "You work for tax till ≈ 10:18." from 1.3 s, the $65,000 row lit |
| Verdict | 10 years younger? / It costs **more than double**. | Even **$1,000/hr** / for 40 years: / ≈ 7.3 hours of his. | $200,000: you work for tax till **≈ 11:03**, every workday. |
| Hook score (two judges' average, hook pass: old hook → adopted) | 6.75 → 7.5 | 5.25 → 7.75 | 5.5 → 7.5 |

---

## 02a · Becker Rig · "It's just $3 a day": what it costs you by 65

**Spec:** `studio/specs/02a-becker-rig-3-a-day-by-age.json` · **13.4 s** · captions on · condensed cut (2026-10-13, not yet promoted): `studio/specs-wip/02a-becker-rig-3-a-day-by-age.json` · **7.8 s** + the 2.5 s end card

*Ported from Live Sheet to Becker Rig on 2026-10-08 (the old spec is `studio/specs/retired/02a-live-sheet-3-a-day-by-age.json`). The hook, every number, every VO line and the verdict are unchanged. What changed: the footer breaks between its clauses instead of at "· no tax, fees," (same words), and the measured pick now runs from the 35 row up to the 25 row, landing on "more than double" with the label "≈ 2.2× the cost at 35" (same 2.152 ratio). See "Port to Becker Rig (2026-10-08)" in the Review log. The fix pass on the port (same day) kept every word and number: the figure is bigger (0.82) and stands clear of the shelving post, the 35 row is marked as the reference while the bracket (now the look's prop stroke) is up, the payoff label is 48 px, a silent hop lands on "≈ $240,000", and the line-4 caption breaks after "10 years younger?". See "Fix pass on the ports (2026-10-08)".*

**Platform title:** "It's Just $3 a Day": What It Costs You by 65, by Age
**On-screen hook (header):** “It’s just **$3 a day**.” / What it costs you by 65:

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 plays (210x med), https://www.instagram.com/reel/Da_dukjxB56/. The table grammar: one row per age, the biggest number first ($88.20 for him, ≈ $400,000 here), and the table types itself in.
2. **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. One word ("ACTUALLY") tells the viewer the number they hold is wrong. Here the header quotes that number as the viewer's own excuse ("It's just $3 a day."), and the table answers it.
3. **H71, The Market Hustle, "How Long It Took To / Recover After the / Worst Crashes:"**: 190,187 (4.5x med), https://www.instagram.com/reel/DduW3hgShyh/. The wrong number in red ("25 YEARS") beside the right one ("~6.7 YEARS") at 0.0 s. This is the hook bank's §4.5 rewrite B (the wrong answer in red, the right one beside it) applied to the by-age table: the spend column is relabelled "What you think it costs" and its numbers are red.
4. **H55, Yannick, "Do all 5 and watch your finance change" + "They Should've Taught This in School"**: 115,845 (67.1x), https://www.instagram.com/reel/DbMUONdvGcr/. An identity or grievance line as the hook; ours is the excuse the viewer already says.
5. **H45, @investment_timeline, "POV: You invested in Monster instead of paying $3/day for a Monster Energy"**: 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. $3 a day is a habit-sized amount the audience already pays.
- **Contrast we design against: H89, Master Money, "WHAT YOUR $15 LUNCH is really costing you (BY AGE!)"**: 11,745, 58 s, talked on camera. Same idea, killed by length and talking. Ours is a 7.8 s body since the condensed cut (13.4 s before) with 15 words of captions and no voice, and the music-only cut is the A version (see the platform notes).
- **Rejected in the hook pass** (scores in the Review log): a "$1 you spend" version (a near-copy of H64's title, and template remakes underperform: H83, Jake's own remake, 14,232, 0.29x med); a POV header (P6's power is the same-brand irony, and a generic $3 has no brand); a $3 / $5 / $10 grid (three inputs in the hook line break R2).

**Rules satisfied:**
- **R1:** "$3" in the header plus row 1 ("18 · $51,465 · ≈ $400,000", the $51,465 in red) are on screen at 0.0 s.
- **R2:** one input ($3 a day). The header ends on a colon, not a result.
- **R3:** one row per age, 18-60. The $3 is fixed, so the pinned comment gives the scaling rule (double it for $6, and so on: every cell is linear in the daily amount).
- **R4:** $3 is small, round and habitual.
- **R5, now visible in frame 1:** the header quotes the belief ("It's just $3 a day."); the middle column is labelled "What you think it costs" and its numbers are red; the green, emphasised column beside it is "What it really costs you". In the first 1.5 s the rows on the shelves show the real cost at 7.8×, 7.0×, 5.5× and 4.3× the red number (ages 18, 20, 25, 30; checked), and in the condensed cut the 35 row (3.4×) lands by 1.15 s too.
- **R6:** you + $3 a day + by 65, now all in the header (before the hook pass the horizon was only in the column labels).
- **R7:** each row is a named age, so the viewer picks theirs.
- **R8:** 11 words.
- **R9:** 10 countable rows.
- **R10:** the biggest number is first on screen at 0.0 s and named first: "Just $3 a day?" (complete on frame 1), then "At 18: ≈ $400,000." from 1.45 s (condensed cut; 2.0 s in the round-2 cut), with the figure landed on the 18 row's peg and pointing at it ("≈ 7.8× what you think") from the same frame.
- **R11:** the caption carries the verdict.
- **R12:** "10 years younger? / It costs more than double." is one direction, one number, and true for every whole age from 18 to 54 (asserted in the check).

**The wrong beliefs it plays on:**
1. "It's just $3 a day. At most it costs me $3 × the days." That is the red column; the green one beside it is 5.5× it at 25 and 7.8× it at 18.
2. "Ten years of age doesn't change much." Every 10 years younger, the same $3 a day costs you **more than double**: true for every whole age 18-54 (FV(age) ÷ FV(age + 10) runs from 2.09 at 18 to 15.98 at 54; checked).

### Beat sheet (condensed cut, 2026-10-13: 7.8 s body + the 2.5 s end card = 10.3 s; was 13.4 + 2.5)

`studio/specs-wip/02a-becker-rig-3-a-day-by-age.json`. Every number, label and the verdict are the round-2 cut's; the clock and two acts moved, and since the fix pass the last caption is the question alone ("10 years younger?"), so "more than double" first appears with the verdict, the gold plate and the "≈ 2.2×" pill. Captions are on-screen text (no narration), back to back, each up at least max(1.2 s, 0.12 s a word).

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 (frame 1, the thumbnail) | Header '“It’s just **$3 a day**.” / What it costs you by 65:'. Footer on two lines, "At 7% a year until 65" / "no tax, fees, inflation" (mono 40 px). The shelves: column heads "Your age" · "What you think it costs" (red) · "What it really costs you", all 10 age keys on their ledges, row 1 "18 · $51,465 · ≈ $400,000" stocked (the $51,465 red, the ≈ $400,000 green on its ink plank). The formula "= $3 × 365 ÷ 12 = $91.25 a month" on the note shelf. The figure (0.82) on the floor in the gutter, hand on chin. No row is moving yet (the next row's key starts to brighten 0.2 s before it lands, at 0.02 s) | "Just $3 a day?", complete on frame 1 (the line starts at −0.4 s, so the kit has popped every word in by −0.1 s) |
| 0.0-0.6 | He shrugs, palms up (`lookOpts.beats`: the viewer's excuse, acted, from frame 1, so the picture moves from frame 2) | |
| 0.22-1.15 | Rows 20, 25, 30 and 35 land (0.22, 0.55, 0.85, 1.15): each red number drops onto its ledge and the green result lands on its plank with a squash (a thud, then a roll); his head follows them | |
| 0.63-1.33 | He crouches and leaps up the pegs to the 18 row (`swipe`, `step` at 1.33) | |
| 1.45 | He points at row "18 · $51,465 · ≈ $400,000": it lifts and lights green, and the pill "≈ 7.8× what you think" pops on the note shelf in the formula's place (`pop`) | "At 18: **≈ $400,000**." (1.45-3.0) |
| 1.85, 2.3 | Rows 40 and 45 land, in ink under the lit pick | |
| 2.5-2.93 | He hops down to the 25 row (`step` at 2.93) | |
| 3.05 | He points: "25 · $43,800 · ≈ $240,000" lights, pill "≈ 5.5× what you think" | "At 25: **≈ $240,000**." (3.05-4.65) |
| 3.45-4.05 | The "whoa" hop with his free arm up (`lookOpts.beats`, silent), still pointing; ≈ $240,000 pulses (5%) as its plank dips | |
| 3.5, 3.95, 4.4 | Rows 50, 55 and 60 land: the shelves are full | |
| 4.7 | As the last caption goes up he hops down to the 35 row (lands 5.12, `step`): row "35 · $32,850 · ≈ $111,000" becomes the reference, a soft grey band behind it and its ledge in solid ink | "10 years younger?" (4.7-6.3: the question alone; the answer is the verdict's) |
| 5.37-6.18 | He takes the pencil from behind his head (`tick` 5.53) and steps up the pegs from 35 to 25, drawing the ink bracket beside the keys (`swipe` 5.76-6.18) | |
| 6.3 | The payoff: ≈ $240,000 turns ink on a **gold plate** with the short's one impact (hit lines, a shake, a 2% punch, `hit`); the pill "**≈ 2.2×** the cost at 35" pops at 48 px; the verdict "10 years younger?" / "It costs **more than double**." replaces the caption, so the question stays and the answer lands under it (the green swoosh under "more than double") + ding | (the verdict) |
| 6.3-7.8 | The verdict holds 1.5 s: the finished table, the bracket, the plate and the pill; he keeps pointing at the plate (a nod). The impact settles by about 6.9 s, the cover frame | |
| 7.8-10.3 | The channel's end card (unchanged) | |

### Captions (condensed cut: on-screen text, no narration; 15 words)

| t | d | Up (from frame 1) | Caption text (spec) |
|---|---|---|---|
| −0.4 | 1.8 | 0.0-1.4 s | Just $3 a day? |
| 1.45 | 1.55 | 1.45-3.0 s | At 18: **≈ $400,000**. |
| 3.05 | 1.6 | 3.05-4.65 s | At 25: **≈ $240,000**. |
| 4.7 | 1.6 | 4.7-6.3 s (the verdict replaces it) | 10 years younger? |

Each line is up at least max(1.2 s, 0.12 s a word), 0.05 s apart. The round-2 cut read four lines as a guide VO script (2.6 and 2.8 words a second, the timings in its review-log entries); with no narration they are paced for reading. Line 4 was "10 years younger? / It costs you **more than double**." in the round-2 cut and in the condensed cut until its fix pass: on screen from 4.7 s, it gave the verdict away 1.6 s early and then repeated it. It is now the verdict's question alone, and the verdict ("10 years younger? / It costs **more than double**.") answers it as the plate lands.

### The maths

Inputs: $3 a day; 365 days; 7% a year, compounded monthly (7% ÷ 12 each month, an effective 7.23% a year); deposits at the end of each month; stopping at 65.
- $3 × 365 = **$1,095** a year; ÷ 12 = **$91.25** a month (the formula on the note shelf).
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

- **Pointer "≈ 7.8× what you think"** (18 row): $400,261.67 ÷ $51,465 = 7.777, shown as ≈ 7.8.
- **Pointer "≈ 5.5× what you think"** (25 row): $239,514.22 ÷ $43,800 = 5.468, shown as ≈ 5.5.
- **Bracket and pill "≈ 2.2× the cost at 35"** (drawn from the 35 row up to the 25 row; the plate lands on 25's ≈ $240,000): $239,514.22 ÷ $111,322.35 = 2.152, shown as ≈ 2.2 (the other way round, the 35 row is 0.465 of the 25 row: under half).
- **Verdict "10 years younger? / It costs more than double":** FV(age) ÷ FV(age + 10) is above 2 for **every** whole age from 18 to 54 (minimum 2.092 at 18, maximum 15.98 at 54; asserted in the check). In the table's own 10-year pairs: 20 → 30 = 2.11, 25 → 35 = 2.15, 30 → 40 = 2.22, 35 → 45 = 2.34, 40 → 50 = 2.56, 45 → 55 = 3.01, 50 → 60 = 4.43.
- **Why it is more than double** (pinned comment): at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years; a lump sum at 7% ÷ 12 grows ×2.01 in 120 months), and starting 10 years younger also adds 10 years of $3 deposits. The two together push the ratio above 2.
- **Pinned comment, at 10% instead:** age 25 → ≈ $577,000; age 18 → ≈ $1,170,000. This matches the hook bank's 10% table.

### Sources

**No real-world inputs.** $3 a day is a hypothetical amount and 7% a year is a stated assumption, not a forecast and not a market figure, and the footer says so. That is deliberate: the hook bank found the comments argue about the rate (Gage: "10% vs 7% vs 8%"), so the rate is printed on screen and the pinned comment invites that argument.

### Assumptions (footer, on screen at t = 0)

> At 7% a year until 65 / no tax, fees, inflation

(Two lines in Becker Rig's mono footer, broken between the clauses; in the retired Live Sheet cut it was one line, "At 7% a year until 65 · no tax, fees, inflation".)

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

**Spec:** `studio/specs/02b-scoreboard-trillion-at-your-wage.json` · **14.0 s** · captions on · condensed cut (2026-10-13, not yet promoted): `studio/specs-wip/02b-scoreboard-trillion-at-your-wage.json` · **7.6 s** + the 2.5 s end card

**Platform title:** How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay
**On-screen hook (header):** ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw. A huge sum re-priced in a unit the viewer knows; here the unit is the viewer's own 40-year career pay.
   - The title states the rule and never the result.
   - The assumptions sit in the footer ("Price of RTX 5090 32GB: ~$4,899"); ours is "Plan max ÷ 10 yrs, 24/7 · you: 40 yrs × 2,080 hrs".
   - Scoreboard is HD Guy's look family.
2. **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**: 28,289,823 (110.85x), https://www.youtube.com/shorts/2DtXV2uxM_E. A per-second rate as the spectacle: the plan's ≈ $3,169 a second is the working in the strip ("÷ $3,169/s").
3. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med). A row for every viewer: 11 wage rows, each with its own career pay and its own answer.
4. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206, the best of his wage reels, https://www.instagram.com/reel/Dd2QzRzRrGT/. The hourly wage works as the filter that pulls the viewer in, never as the goal.
- **Contrasts:**
  - HD Guy's "Wages Visualized In Real Time" got **9,025**. The wage as a running counter flopped, so here the wage stays a row and the plan is the clock.
  - The round-2 version ("Start ≈ 66.3 million years ago") re-priced the trillion in years nobody can feel, and most viewers already guess "never" (both judges: 5 and 5.5). The output is now minutes, and the stake is the viewer's own career.
  - 04-formats §4.1 dropped the "Rate Clock" (a mega-sum ÷ a human rate = a time). This is still a ratio of a mega-sum and a wage, but turned round: the viewer's career is the amount, the plan is the clock, and the answer is a few minutes.
- **Rejected in the hook pass** (scores in the Review log): "1 second of the plan at your wage" (7.25, a close second: the output is your work weeks, but the sum is still someone else's); "split with every US full-time worker" (the share is the same on every row, so the find-your-row loop closes at once); a question header over the old table (the topic and the years output stay).

**Rules satisfied:**
- **R1:** "$1 TRILLION" in the header plus row 1 "$7.25/hr · $603,200 · ≈ 3.2 min" at 0.0 s, with the strip "= wage × 2,080 × 40 ÷ $3,169/s".
- **R2:** one input in the hook ($1 trillion). The header ends on an open "IN…": no result.
- **R3:** 11 wage rows from the federal minimum to $1,000/hr.
- **R4:** the career pay is the viewer's own number (exact: $603,200 at the federal minimum); the trillion is a named, argued-about object (Elon's pay plan), which the footer qualifies as the plan's maximum.
- **R5:** the belief "a whole working life is a lot of money". At the federal minimum, the plan's average earns it in ≈ 3 minutes; even $1,000/hr for 40 years, in ≈ 7.3 hours.
- **R6:** you + your whole career's pay (an amount on every row) + 40 years.
- **R7:** each row is a named wage.
- **R8:** 11 words.
- **R9:** 11 countable rows under a header that ends on "IN…".
- **R10:** row 1 is on screen at 0.0 s; the first payoff caption ("≈ 3 minutes of his.") goes up at 1.3 s (condensed cut; 2.0 s in the round-2 cut), the moment the pointer lands on the $7.25 row.
- **R11:** the verdict lands alone, after the last caption, as the biggest type on the screen.
- **R12:** a single repeatable line, on the board's last row: "$1,000/hr for 40 years: ≈ 7.3 hours of his".

**The wrong belief it plays on:** "40 years of work adds up to a fortune." At $20 an hour it is $1,664,000, and the plan's average earns that in under 9 minutes; even $1,000 an hour for 40 years ($83,200,000) takes it ≈ 7.3 hours.

### Beat sheet (condensed cut, 2026-10-13: 7.6 s body + the 2.5 s end card = 10.1 s; was 14.0 + 2.5)

`studio/specs-wip/02b-scoreboard-trillion-at-your-wage.json`. Every word, number and label and the verdict are the round-2 cut's; only the clock moved, plus one look option (`focus` 0.25, since the fix pass; 0.3 before it).

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 (frame 1, the thumbnail) | Header "ELON'S **$1 TRILLION** PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…". Footer on one line: "Plan max ÷ 10 yrs, 24/7 · you: 40 yrs × 2,080 hrs". Columns "Your wage" · "40 years / of your pay" · "His plan / earns it in" (emphasised). All 11 wage keys on the board; row 1 "$7.25/hr · $603,200 · ≈ 3.2 min" lit. Strip: "= wage × 2,080 × 40 ÷ $3,169/s" | "40 years at minimum wage?", complete on frame 1 (it starts at −0.4 s, so its 0.14 s rise is over; its words light in as it plays) |
| 0.03-0.9 | Rows $15/hr, $20/hr and $25/hr slide in (0.03, 0.45, 0.9: the first moves from frame 2) | |
| 1.3 | The pointer enters to "$7.25/hr · $603,200 · ≈ 3.2 min": the row lights, the others dim, and "$7.25/HR × 83,200 HRS = $603,200" slams into the strip over the formula + swipe, ding. With `lookOpts.focus` 0.25 the others ease back from 1.55 s (a brief spotlight) | "**≈ 3 minutes** of his." (1.3-2.9) |
| 1.7, 2.2, 2.6 | Rows $30/hr, $40/hr and $50/hr slide in (a tick each) | |
| 2.95 | The pointer glides to "$20/hr · $1,664,000 · ≈ 8.8 min", which lights; "$20/HR × 83,200 HRS = $1,664,000" slams in + swipe, ding; the others dim and ease back from 3.2 s | "$20 an hour? Under 9 minutes." (2.95-4.55) |
| 3.4-4.6 | Rows $75/hr, $100/hr, $500/hr and $1,000/hr slide in (3.4, 3.85, 4.25, 4.6; a thud as the board completes) | |
| 4.6 | The last caption goes up: the question first | "Even **$1,000 an hour**? ≈ 7 hours." (4.6-5.9) |
| 4.85 | The pointer glides down to "$1,000/hr · $83,200,000 · ≈ 7.3 hrs", which lights (0.25 s into the caption); "$1,000/HR × 83,200 HRS = $83,200,000" slams in + swipe, ding; the others dim and ease back from 5.1 s | |
| 6.05 | The caption has ended (5.9 s): the verdict "Even **$1,000/hr** / for 40 years: / ≈ 7.3 hours of his." slams over the strip and the caption band at about 84 px, alone, 1.2 s after the final pick, whose label was up for those 1.2 s (reveal, ding) | (none) |
| 6.05-7.6 | The verdict holds 1.55 s on the finished board with the $1,000/hr row lit (settled from about 6.35 s, the cover frame) | (none) |
| 7.6-10.1 | The channel's end card (unchanged) | |

### Captions (condensed cut: on-screen text, no narration; 23 words)

| t | d | Up (from frame 1) | Caption text (spec) |
|---|---|---|---|
| −0.4 | 1.65 | 0.0-1.25 s | 40 years at minimum wage? |
| 1.3 | 1.6 | 1.3-2.9 s | **≈ 3 minutes** of his. |
| 2.95 | 1.6 | 2.95-4.55 s | $20 an hour? Under 9 minutes. |
| 4.6 | 1.3 | 4.6-5.9 s | Even **$1,000 an hour**? ≈ 7 hours. |

Each line is up at least max(1.2 s, 0.12 s a word), 0.05 s apart. The last one goes up 0.25 s before its pick, so the question reads first and the row lights on its answer; that lets the verdict land alone 0.15 s after it, 1.2 s after the final pick (so the pick's label is up 1.2 s). The captions round to the whole minute or hour ("≈ 3 minutes", "≈ 7 hours"); everything else on screen carries one rounding, the row's ("≈ 3.2 min", "≈ 7.3 hrs").

### The maths

- **The plan's clock:** 10 years × 365.25 days × 24 hrs × 3,600 s = **315,576,000 s**. $1,000,000,000,000 ÷ 315,576,000 = **$3,168.81 a second**, shown as "≈ $3,169 a second" (about $11.4 million an hour). This is the plan's maximum, if every target is hit, spread evenly over the decade, day and night.
- **40 years of your pay** = wage × 2,080 hrs × 40 years = wage × 83,200. Whole dollars, so exact (no "≈"). Both sides are before tax.
- **His plan earns it in** = your career pay ÷ $3,168.81 a second. Shown in minutes to 0.1 under an hour, otherwise in hours to 0.1, always with "≈".

| Wage | 40 years of your pay | Seconds | Exact | On screen |
|---:|---:|---:|---:|---:|
| $7.25 | $603,200 | 190.4 | 3.173 min | ≈ 3.2 min |
| $15 | $1,248,000 | 393.8 | 6.564 min | ≈ 6.6 min |
| $20 | $1,664,000 | 525.1 | 8.752 min | ≈ 8.8 min |
| $25 | $2,080,000 | 656.4 | 10.940 min | ≈ 10.9 min |
| $30 | $2,496,000 | 787.7 | 13.128 min | ≈ 13.1 min |
| $40 | $3,328,000 | 1,050.2 | 17.504 min | ≈ 17.5 min |
| $50 | $4,160,000 | 1,312.8 | 21.880 min | ≈ 21.9 min |
| $75 | $6,240,000 | 1,969.2 | 32.820 min | ≈ 32.8 min |
| $100 | $8,320,000 | 2,625.6 | 43.760 min | ≈ 43.8 min |
| $500 | $41,600,000 | 13,128.0 | 3.647 hrs | ≈ 3.6 hrs |
| $1,000 | $83,200,000 | 26,255.9 | 7.293 hrs | ≈ 7.3 hrs |

(The fix pass dropped the $10/hr and $250/hr rows so the board runs at a ~54 px pitch: $10/hr → $832,000 → ≈ 4.4 min and $250/hr → $20,800,000 → ≈ 1.8 hrs are still true, just not on screen.)
- **VO "≈ 3 minutes":** 3.173 min. **"Under 9 minutes":** 8.752 min. **VO "≈ 7 hours"**, row and verdict "≈ 7.3 hours": 7.293 hrs.
- **Pointer labels** (the working the captions don't say, exact): "$7.25/hr × 83,200 hrs = $603,200", "$20/hr × 83,200 hrs = $1,664,000", "$1,000/hr × 83,200 hrs = $83,200,000" (83,200 = 2,080 hrs × 40 years).

### Sources

| Figure | Source 1 | Source 2 (independent) |
|---|---|---|
| **Federal minimum wage $7.25/hr**, in force since 2009-07-24 and still current in 2026 | US Department of Labor, news release "Federal minimum wage increases to $7.25 on July 24", 2009-07-16, https://www.dol.gov/newsroom/releases/esa/esa20090716; DOL Wage and Hour Division, "Minimum Wage", https://www.dol.gov/agencies/whd/minimum-wage | US Bureau of Labor Statistics, CPS annual table 44 (2025 annual averages, published 2026): "The prevailing Federal minimum wage was $7.25 per hour in 2025", https://www.bls.gov/cps/cpsaat44.htm. For 2026: Paycor, "Minimum Wages by State: A Complete Guide for 2026", https://www.paycor.com/resource-center/minimum-wage-by-state |
| **Header and footer: Tesla pay plan for Elon Musk worth up to $1 trillion if every target is hit, "over the next decade"** (the footer's "÷ 10 years"), approved by shareholders on 2025-11-06 with over 75% support | Reuters via Business Standard, 2025-11-07, https://www.business-standard.com/world-news/elon-musk-tesla-pay-package-worth-1-trillion-shareholders-approve-125110700092_1.html ("could get as much as $1 trillion in stock over the next decade") | Anadolu Agency, "Tesla shareholders approve Elon Musk's compensation package", https://www.aa.com.tr/en/economy/tesla-shareholders-approve-elon-musks-compensation-package/3737245; Malay Mail, 2025-11-07, https://malaymail.com/news/money/2025/11/07/worlds-most-expensive-participation-trophy-tesla-investors-hand-musk-a-potential-us1t-to-keep-him-at-the-helm/197433 |

**Verification note:** the egress proxy blocks dol.gov, so that page could not be opened; the figure was confirmed from the search-result text of the named page plus independent publishers. The $1 trillion is the plan's reported maximum in stock, not a cash payment, and it pays out only as targets are hit; "≈ $3,169 a second" is that maximum averaged evenly over 10 years. The footer and the pinned comment both say so. The dinosaur and *Homo sapiens* anchors of the round-2 version (and their sources) are gone with the old output.

### Assumptions (footer, on screen at t = 0)

> Plan max ÷ 10 yrs, 24/7 · you: 40 yrs × 2,080 hrs

"Max" carries the plan's "if every target is hit"; the caption and the pinned comment say it in full, and give the rate as ≈ $3,169 a second (the strip shows "÷ $3,169/s", rounded to the dollar).

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
  - The VO cut: "40 years at minimum wage? ≈ 3 minutes of his." puts the payoff at 1.3 s in the condensed cut (2.0 s before), with the pointer on its row.
  - The Musk context line stays in the caption; on screen, the plan is named in the header and qualified in the footer.
- **Instagram Reels.**
  - Caption line 1: "Find your wage."
  - Cover: the completed table, with the $1,000/hr row lit.

---

## 02c · Scoreboard · "What time your 9-to-5 starts paying you, by salary"

**Spec:** `studio/specs/02c-scoreboard-salary-per-hour.json` · **13.0 s** · captions on · condensed cut (2026-10-13, not yet promoted): `studio/specs-wip/02c-scoreboard-salary-per-hour.json` · **7.6 s** + the 2.5 s end card

*Ported from Clean Sheet to Scoreboard on 2026-10-08 (the old spec is `studio/specs/retired/02c-clean-sheet-salary-per-hour.json`). The hook, every number, every VO line, the footer and the verdict are unchanged, and so is `data`; only `id` and `look` changed. `lookOpts.verdictRow: 0` is kept, and the Scoreboard's find-your-row format now reads it, so the verdict lights the $200,000 row as in the Clean Sheet cut. See "Port to Scoreboard (2026-10-08)" in the Review log. The fix pass on the port (same day) added one pick label, "≈ 78 min of tax a day" on line 3 (78 is the row's own cell), and the $200,000 row now lights from the end of the VO, just before the verdict lands. See "Fix pass on the ports (2026-10-08)".*

**Platform title:** What Time Your 9-to-5 Starts Paying You, by Salary
**On-screen hook (header):** What time your **9-to-5** / starts paying you, by salary

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
- **R10:** the biggest bite is first ($200,000: ≈ 11:03 am at 0.0 s); "$65,000?" is on screen at 0.0 s and the $65,000 row is lit (pointer, glow, the label in the strip) from 1.3 s (condensed cut; 1.5 s in the round-2 cut), as "You work for tax till ≈ 10:18." goes up.
- **R11:** the verdict lands alone, after the last caption, and lights its own row.
- **R12:** "$200,000: you work for tax till ≈ 11:03, every workday." (the board's top row, so the ending escalates). The comment line it invites: "I work for tax till 10:18."

**The wrong beliefs it plays on:**
1. "My day pays me from 9 am." On average, 2026 federal tax + FICA take 16.3% of a $65,000 salary, which is ≈ 78 minutes of every 8-hour day: your day starts paying you at ≈ 10:18.
2. "Tax takes the same share whatever you earn." The tax share rises row by row, from 12.4% at $30,000 to 25.5% at $200,000 (checked for every row), so the clock moves later as pay rises.

### Beat sheet (condensed cut, 2026-10-13: 7.6 s body + the 2.5 s end card = 10.1 s; was 13.0 + 2.5)

`studio/specs-wip/02c-scoreboard-salary-per-hour.json`. Every word, number and label and the verdict are the round-2 cut's; only the clock moved, plus one look option (`focus` 0.3).

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 (frame 1, the thumbnail) | Header "WHAT TIME YOUR **9-TO-5** / STARTS PAYING YOU, BY SALARY" ("9-TO-5" neon green). Footer: "Single · 2026 federal tax + FICA · no state tax". The leaderboard: column heads "SALARY" · "TAX + FICA, / MINUTES A DAY" · "PAYING YOU / FROM", all 12 salary keys beside LED-off placeholders, row 1 "$200,000 · ≈ 123 MIN · ≈ 11:03 AM" filled, its clock in neon green. Strip: "= 9:00 am + 480 min × (tax + FICA) ÷ salary" | "$65,000?", complete on frame 1 (it starts at −0.4 s) |
| 0.03-0.88 | Rows $150,000 → $65,000 fill top to bottom, one every 0.17 s (the first moves from frame 2; a tick each) | |
| 1.3 | The pointer enters to "$65,000 · ≈ 78 MIN · ≈ 10:18 AM": the row lights and the others dim; "≈ US MEDIAN FULL-TIME PAY" slams into the strip in the formula's place + swipe, ding. With `lookOpts.focus` 0.3 the others ease back from 1.6 s | "You work for tax till **≈ 10:18**." (1.3-2.75) |
| 1.75, 2.3 | Rows $60,000 and $50,000 fill | |
| 2.8 | The $65,000 row is picked again: it stays lit, its bar lifts, the others dim again and ease back from 3.1 s; "≈ 78 MIN OF TAX A DAY" replaces the median label + swipe, ding | "That's ≈ 78 minutes a day." (2.8-4.55) |
| 3.3, 3.9, 4.45 | Rows $40,000, $35,000 and $30,000 fill (a thud as the board completes) | |
| 4.6 | The last caption goes up: the question first | "Six figures? Until **≈ 10:40**." (4.6-5.9) |
| 4.85 | The pointer glides up to "$100,000 · ≈ 100 MIN · ≈ 10:40 AM", which lights (0.25 s into the caption); "≈ 1 HR 40 MIN OF TAX A DAY" slams in + swipe, ding; the others ease back from 5.15 s | |
| 5.9-6.05 | As the caption ends the pointer glides up to the top row and "$200,000 · ≈ 123 MIN · ≈ 11:03 AM" lights (`lookOpts.verdictRow: 0`, leading the verdict by 0.15 s), the others dim, and its clock's climax bump peaks as the verdict lands | (none) |
| 6.05 | The verdict "$200,000: YOU WORK FOR TAX TILL **≈ 11:03**, EVERY WORKDAY." slams into the strip and the caption band (72 px), alone, 1.2 s after the final pick, whose label held the strip until then (reveal, ding) | (none) |
| 6.05-7.6 | The verdict holds 1.55 s on the finished board with the $200,000 row lit; the others ease back from 6.2 s (settled from about 6.8 s, the cover frame) | (none) |
| 7.6-10.1 | The channel's end card (unchanged) | |

### Captions (condensed cut: on-screen text, no narration; 19 words)

| t | d | Up (from frame 1) | Caption text (spec) |
|---|---|---|---|
| −0.4 | 1.65 | 0.0-1.25 s | $65,000? |
| 1.3 | 1.45 | 1.3-2.75 s | You work for tax till **≈ 10:18**. |
| 2.8 | 1.75 | 2.8-4.55 s | That's ≈ 78 minutes a day. |
| 4.6 | 1.3 | 4.6-5.9 s | Six figures? Until **≈ 10:40**. |

Each line is up at least max(1.2 s, 0.12 s a word), 0.05 s apart; the last goes up 0.25 s before its pick, as in 02b. Line 2 is up 1.45 s and line 3 1.75 s (1.6 and 1.6 before the fix pass): the second pick comes 0.15 s earlier, so the rows between the picks land at an even spacing and the board never holds near-still for 0.4 s. "Every workday" is said once, by the verdict.

### The maths

For each salary S (2026, single filer, standard deduction, wages only, no state or local tax):
- **Federal income tax** on S − $16,100: 10% to $12,400; 12% to $50,400; 22% to $105,700; 24% to $201,775.
- **FICA** = 6.2% Social Security on wages up to $184,500 + 1.45% Medicare on all wages (the extra 0.9% Medicare starts above $200,000, so no row reaches it).
- **Tax + FICA, minutes a day** = 480 min × (tax + FICA) ÷ S. A 9-to-5 is 8 hours = 480 minutes, and 8 hours × 260 workdays = the 2,080 hours a year the rest of the slate uses. Rounded to the minute, with "≈".
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

- **VO "You work for tax till ≈ 10:18"** and **"That's ≈ 78 minutes a day"**: the $65,000 row (78.22 min).
- **VO "Six figures? Until ≈ 10:40"**: the $100,000 row (99.94 min → 100 min → 10:40 am).
- **Verdict "$200,000: you work for tax till ≈ 11:03, every workday."**: the top row (122.58 min → 123 min → 11:03 am; worked: $36,734 tax + $14,339 FICA = $51,073 = 25.54% of pay).
- **Pointer "≈ US median full-time pay"** on the $65,000 row: BLS median weekly earnings of $1,251 × 52 = $65,052, which rounds to ≈ $65,000 (0.08% off; asserted to be under 1%).
- **Pointer "≈ 1 hr 40 min of tax a day"** on the $100,000 row: 99.94 min → 100 min = 1 hr 40 min.
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
  - Scoreboard's dark board and neon clock column read as a leaderboard in the feed; the cover is the finished board with the $200,000 row lit.
  - Caption line 1: "Find your salary."
- **TikTok.**
  - The VO cut. "You work for tax till ≈ 10:18" on the median row is the line viewers will repeat about themselves.
  - Expect "FICA isn't income tax", state tax and married-filing comments. That is the argument we want; the footer states the basis and the pinned comment answers it.
- **YouTube Shorts.**
  - Title = the hook.
  - Keep the hold on the finished sheet after the verdict (1.55 s before the end card in the condensed cut): it is the screenshot.

---

## What changed from the seeds, and why

- **02a:**
  - The seed's 7% is kept (the hook bank's rewrite used 10%; 10% is in the pinned comment).
  - A **"You'd spend" column** sat beside the cost, so the answer the viewer already holds was on screen (R5). The hook pass relabels it "What you think it costs" and turns it red.
  - The verdict is cost-framed ("10 years younger? / It costs more than double.", since the fix pass) and checked for every whole age 18-54.
- **02b:**
  - The **federal minimum wage** ($7.25) is the first row: a wage some viewers earn.
  - The hook bank's "$50,000/hr" row is dropped (nobody's wage, R4).
  - The trillion is named as **Elon's pay plan** (R4). Round 2 turned the result into a start date with dinosaur and species anchors; the hook pass replaces that output with the time the plan takes to earn **your whole career's pay** (minutes, not millions of years).
- **02c:**
  - Rebuilt in round 2 from "salary ÷ 2,080" (which 01c already does) into gross vs kept per hour, on the 2026 federal tax + FICA basis the rest of the slate uses.
  - The hook pass keeps that verified tax model and re-prices it as **the clock time your 9-to-5 starts paying you**.

## Open items

- **Owner decision: a ~10 s "find your row".** The condensed cuts run 10.3 / 10.1 / 10.1 s with the card (bodies 7.8 / 7.6 / 7.6 s), about half the 06b/06c bodies (15.7-18.3 s). Nothing was dropped to get there: the removed time was the still runs and the narration-paced captions, and every beat, number and line is kept. A ~10 s looping lookup is a good retention shape, but it is a new length for the slate, so the owner should approve it knowingly before promotion. If longer is wanted, the levers are a 1.6 s verdict hold (+0.05-0.1 s) or a fourth pick (about +1.6 s each), not a still board.
- **The condensed cuts (2026-10-13) are not promoted.** They sit in `studio/specs-wip/` with their renders in `/tmp/cond/02/<id>/`; `studio/specs/` and `renders/channel/` still hold the round-2 cuts. The ship step owns promotion and sound (the steps and the three sound failures to settle are in the review-log entries "Condensed cut (2026-10-13)" and "Condensed cut: fix pass (2026-10-13)"). On promotion these go stale and are outside this pass's files: `teasers/v2/teasers.json` (runtimes 10.3 / 10.1 / 10.1 s), `publishing/02{a,b,c}-*.{md,json}` (`for_video`, the cover frames, "177 checks"; the sheets re-pick their covers by content with `build_publishing.py <id> --covers`) and the files under `renders/`.
- **Linter:** both kept kits mount and `node src/cli.mjs check` passes 02a (Becker Rig), 02b and 02c (Scoreboard) with 0 errors and 0 warnings (2026-10-08, after the fix pass on the ports; also at a 0.05 s sampling step). The Scoreboard's find-your-row samples and 02b render pixel-identical before and after the port's and the fix pass's format-file changes. The Becker Rig samples change with the fix pass (post, bracket, reference row, shelf formula) and stay lint-clean.
- **Not changed by the port** (outside its files): `teasers.json`, `slate.json` and `renders/v2/` still list the retired ids and MP4s for 02a and 02c; the new MP4s are in `studio/out/`. The Becker Rig and Scoreboard READMEs do not yet document the new find-your-row options (`compare[].start`, `beats` and its value tap; `verdictRow` and its lead); each format file's header comment does.
- **Slate overlap to decide (owner):** 02b now uses the same device as **10b** ("40 years of your pay vs 1 minute of new US debt", verdict "40 years of median pay: ≈ 33 seconds"): a whole working life set against a mega-rate clock. Both judges also flagged an echo of **10c** (Amazon's sales per second). 02b is a per-wage lookup table with a named person's plan; 10b is one median career against a national-debt counter. If only one should carry the device, 02b's runner-up ("1 second of the plan at your wage", 7.25) is ready in the Review log.
- **Kit behaviour that shaped 02a (Becker Rig, since the port):**
  - The last pick is the payoff: its emphasised value turns ink on a gold plate with the short's one impact. So the measured pick runs from the 35 row up to the 25 row and lands on 25's ≈ $240,000 (the Live Sheet cut selected the 35 row with an arrowhead on 25, and a straight port would have put the gold plate on ≈ $111,000).
  - A compare normally arrives just in time for its pick (a quick draw). `lookOpts.compare[].start`, added to `formats/find-your-row.js` in the port, times it: he sets off for the 35 row on line 4's first word and the bracket fills the time to the pick, so the plate lands on "more than double".
  - The pick labels go to the note shelf under the table (they cover no row) and take turns with the formula; the shelf is right-aligned and away from the bracket, so the compare's label names what it compares.
  - The mono footer wraps at 878 px, so a one-line footer longer than ~36 characters breaks where the width runs out; 02a's breaks between its clauses (`\n`), like the other Becker Rig specs.
  - `__…__` in a column label is red in this kit, and a `\n` in a label is a forced break, so 02a's labels are unchanged from the Live Sheet cut.
- **Retired kits** (Live Sheet for 02a, Clean Sheet for 02c, until 2026-10-08): their notes are in the Review log (assembly and fix passes); the old specs are in `studio/specs/retired/`.
- **Kit behaviour that shaped 02b:** in the Scoreboard kit, a pick at 0.0 s replaces the formula strip for the whole short (tested in round 2), so 02b's first pointer lands at 2.0 s (1.3 s in the condensed cut). With 11 rows and a one-line footer the strip runs stacked: each pointer label sits over the formula, so the working "= wage × 2,080 × 40 ÷ $3,169/s" stays on screen until the verdict. A verdict that lands after the last VO line takes the strip and the caption band together (`formats/find-your-row.js`, via the chrome's `verdictSlot`), so it is set at about 84 px against the labels' 58 px.
- **Kit behaviour that shaped 02c (Scoreboard, since the port):** with 12 rows, two-line column heads and a one-line footer, the board runs at a ~55 px pitch (outlined slots), and the strip is shared (`swap`): the formula first, each pick label as a hard cut in its place (held 2.5 s, after which the formula comes back only when it can stand 1.5 s before the next event; with the line-3 pick added in the fix pass it never can, so the labels run back to back from 1.5 s to the verdict). The verdict lands after the last VO line, so it takes the strip and the caption band together (72 px). Before the port the Scoreboard's find-your-row ignored `verdictRow`; it now reads it (a quiet pick that leads verdict.t by up to 0.25 s, from the end of the VO: the pointer glides to the row, it lights, the others dim and its emphasised cell lands a 1.13 climax bump as the verdict slams in; no label and no sound of its own), so 02c's ending still escalates through its top row.
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

### Assembly pass (2026-10-08)

Round-2 assembly of the three teasers in their kits (lint, contact sheets, stills at every beat, every on-screen number re-checked, final MP4s).

| # | Teaser | What I saw | What I changed |
|---|---|---|---|
| A1 | 02a | The middle column label read "What / you think / it costs" on three lines, in ink with a grey last line, beside red numbers: the "what you think (red) vs what it really costs (green)" contrast was only half on screen, and the result label's "costs you" was grey too. | Labels are now one phrase each, `__What you think it costs__` (red) and `What it really costs you` (the Live Sheet treats a `\n` as a grey sub-label, so the `\n`s are gone and the kit balances each over two lines). The kit's `formats/find-your-row.js` now colours `__…__` in a column label red. The header row is a line shorter, so the rows get more height. Wording, numbers and timings unchanged; the check's expected columns updated to match. |
| A2 | 02b | The strip went pointer label → formula (0.5 s, 6.7-7.2 s) → pointer label → formula (1.0 s, 9.7-10.7 s) → verdict: two flickers right before the payoff. | `looks/scoreboard/formats/find-your-row.js`: the formula only comes back when it can stand 1.5 s before the next pointer or the verdict; otherwise the label holds. 02b now runs formula (0-4.2 s) → "$1,664,000 in under 9 min" (4.2-7.2 s) → "$8,320,000 in ≈ 44 min" (7.2-10.7 s) → verdict. |
| A3 | 02c | The two-line footnote broke as "= 9:00 am + 480 min ×" / "(tax + FICA) ÷ salary": an operator left hanging at a line end. | `looks/clean-sheet/formats/find-your-row.js`: a two-line footnote breaks at an operator seam (the second line starts with its operator, no bracket split): "= 9:00 am + 480 min" / "× (tax + FICA) ÷ salary". |

Checks after the assembly pass: `python3 teasers/v2/checks/02-find-your-row.py` → **PASSED: all 170 checks**; `node src/cli.mjs check` on the three specs → 3/3 clean, 0 errors, 0 warnings. Every number in the stills was also recomputed by a separate script (FV at 7% ÷ 12, the plan's $3,168.81 a second, 2026 tax + FICA): no mismatches. VO beats land with their pointers (02a 4.9 / 8.4 s, 02b 4.2 / 7.2 s, 02c 4.5 / 7.4 s) and each verdict lands when its VO line says it (10.7 / 10.7 / 8.6 s).

### Fix pass (2026-10-08)

QA of the assembled round 2 scored 02a 6.5, 02b 6.5 and 02c 6.0 (lint and the 170 maths checks were already clean). Every must and should, and the cheap nits, are handled below. Edited: the three specs, this write-up, the check, and the three kits' `formats/find-your-row.js` (no shared kit file).

| # | Teaser | Severity | QA issue | What I did |
|---|---|---|---|---|
| F1 | 02a | must | Verdict wrapped "10 years younger: it / costs more than double."; card narrower than the table. | Verdict "10 years younger?\nIt costs **more than double**." (a break between the clauses). The Live Sheet format now draws the card itself (`verdict: 'self'`), x 60-960 like the sheet. |
| F2 | 02a | should | Pick 2 pointed at 35 but said "At 25: ≈ 2.2× this" with row 25 unlit. | `lookOpts.compare`: the 35-row pick is a bracket drawn beside the keys from 35 up to 25 (arrowhead on 25), labelled "≈ 2.2×"; the 25 row stays tinted. The pick label is now "≈ 2.2×" (2.152). |
| F3 | 02a | should | The selection slid across the sheet; the tooltip's spacer row opened empty and the table jumped ~78 px twice per pick. | Selections cross-fade (the old one fades where it is, the new one lands on its cell). Tooltips float over the row under the pick: that row fades out in the same frames the pill wipes in; no row moves, no empty strip. Checked frame by frame at 4.90-5.17 and 8.40-8.70 s, and linted at a 0.05 s step. |
| F4 | 02a | should | The first payoff (spoken at 2.7 s) had no visual. | VO split: "Just $3 a day?" (0.0) / "At 18: **≈ $400,000**." (2.0, d 2.7). A pick on row 18 at 2.0 s: "≈ 7.8× what you think" (400,261.67 ÷ 51,465 = 7.777). Later lines unchanged (4.9, 8.4). QA suggested 1.6 s; the check's 2.6 words/s read of "Just three dollars a day?" needs 1.92 s. |
| F5 | 02a | should | The verdict was no bigger than the captions. | The punch line's emphasis is set at about 90 px ("more than double", 84 px minimum on this card) against the 68 px captions, on the yellow marker, as the result column flashes; the kicker "10 years younger?" at 48 px with the ≈ chip. |
| F6 | 02a | should | ~42 px cells on a 50 px pitch; dead band under the footer. | No tooltip slot to plan for, the A B C row dropped, and the cells sized to the row: 59 px pitch with 49 / 45 / 52 px figures; the sheet now ends at y 1235 and the footer at about 1300. |
| F7 | 02a | nit | Straight quotes in the header. | “It’s just **$3 a day**.” |
| F8 | 02b | should | Column head "HIS PLAN EARNS / IT IN". | "His plan\nearns it in". |
| F9 | 02b | should | Two-line footer under the hook; 13 cramped rows (~42 px pitch). | Footer "Plan max ÷ 10 yrs, 24/7 · you: 40 yrs × 2,080 hrs" (one line); the $10/hr and $250/hr rows dropped: 11 rows at a ~54 px pitch. |
| F10 | 02b | should | Pick labels repeated the captions; verdict on top of the caption saying the same thing. | Labels show the career-pay working: "$7.25/hr × 83,200 hrs = $603,200", "$20/hr × 83,200 hrs = $1,664,000", "$1,000/hr × 83,200 hrs = $83,200,000". VO line 4 ends at 10.5 s and the verdict lands at 10.7 s, alone. |
| F11 | 02b | should | The payoff reused the $100/hr pick and was weaker than the opener; the $1,000/hr row was never featured. | The last pick is the last row ($1,000/hr, 7.0 s): VO "Even **$1,000 an hour**? ≈ 7 hours." and verdict "Even **$1,000/hr** / for 40 years: / ≈ 7.3 hours of his." (7.293 hrs), set in the strip and caption band at about 84 px against the labels' 58 px. |
| F12 | 02b | should | "≈ 3 minutes" spoken at 1.9 s with no pointer; caption broke "minimum / wage". | VO split: "40 years at minimum wage?" (0.0) / "**≈ 3 minutes** of his." (2.0); a pick on the $7.25 row at 2.0 s. Each caption is one line. |
| F13 | 02b | nit | Strip "÷ ≈ $3,169 a second" (two operators). | "= wage × 2,080 × 40 ÷ $3,169/s"; the ≈ and the exact $3,168.81 stay in the caption and the pinned comment. |
| F14 | 02b | nit | "≈ 43.8 MIN" in the row vs "≈ 44 MIN" in the label and verdict. | Moot: the $100/hr pick is gone. On screen each figure has the row's rounding (≈ 7.3); the VO alone rounds ("≈ 7 hours"). |
| F15 | 02b | nit | Caption "Even $100 an hour, for / 40 years?". | Line 4 is now "Even **$1,000 an hour**? ≈ 7 hours." (one line). |
| F16 | 02c | must | The hook beat had no visual: "≈ 10:18" spoken at 3.1 s, the $65,000 row unmarked until 4.5 s. | VO split: "$65,000?" (0.0, d 1.45) / "You work for tax till **≈ 10:18**." (1.5); pick 1 moved to 1.5 s on the $65,000 row (it lands at 1.2 s). Line 3 "That's ≈ 78 minutes a day." plays over the lit row (4.7 s). |
| F17 | 02c | should | First caption wrapped at half width. | Fixed by the split (each caption on one line). |
| F18 | 02c | should | The verdict repeated pick 2 ($100,000) and the strongest row was never pointed at. | Verdict "$200,000: you work for tax till **≈ 11:03**, every workday." at 10.0 s, after the VO; the yellow highlighter swipes the $200,000 row with it (`lookOpts.verdictRow: 0`, a Clean Sheet format option added in this pass), and the $100,000 band rests to a tint. |
| F19 | 02c | should | Salary keys in heavy Archivo Black as large as the results: inverted hierarchy. | Keys in Inter Tight 700, ink-grey (#3B404C); the result column stays Archivo Black and is set 5 px larger than the other cells (`EMPH_UP`), so "≈ 11:03 am" is the loudest cell on frame 1. |
| F20 | 02c | should | Legend "[$100,000] ≈ 1 hr 40 min, every workday" read as money ≈ time and repeated the verdict. | "≈ 1 hr 40 min of tax a day"; "every workday" is said once, in the verdict (VO line 3 is now "…a day."). |
| F21 | 02c | nit | "MIN A DAY" could read as "minimum". | "Tax + FICA,\nminutes a day" (it fits on two lines). |
| F22 | 02c | nit | A ~4 s static hold after the verdict. | The verdict moved to 10.0 s, with its row swipe: about 2.5 s of hold before the loop clear (duration 13.0 s kept). |
| F23 | 02c | nit | No number in the header. | "What time your **9-to-5** / starts paying you, by salary": the clock is the highlighted phrase. |

**Format-file changes** (each kit's `formats/find-your-row.js` only):
- **Live Sheet:** floating tooltips (no slot, no reflow; a label too long for the rows beside it falls back to the formula bar); cross-faded selections; cells sized to their row (a search for the largest size that keeps every label on as few lines and every value inside its column, cell padding 22 or 12 px; a smaller landing snap for those cells); `lookOpts.compare` brackets; a sheet-wide verdict card with a large punch line (falls back to the kit's card when a verdict is too long for it).
- **Scoreboard:** a verdict that lands after the VO takes the strip and the caption band (`verdictSlot`), and the strip then reserves no verdict room.
- **Clean Sheet:** key column in Inter Tight 700 ink-grey; the emphasised column `EMPH_UP` (5 px) larger; `lookOpts.verdictRow`.

**Check changes:** 02a, 02b and 02c builders rebuilt for the new VO lines, pointers, verdicts, rows (02b: 11), footer, formula, column labels and `lookOpts`; new recomputed lines (18-row ratio 7.777, the bracket's 2.152 and 0.465, $1,000/hr 7.293 hrs, the $200,000 row 122.58 min); the verdict-timing rule is "when the VO says it" for 02a and "0.2 s after the last VO line" for 02b and 02c; `lookOpts` is compared with the expected value; a `\n` is quoted in this write-up as " / ".

**Checks after the fix pass:** `python3 teasers/v2/checks/02-find-your-row.py` → **PASSED: all 177 checks**. Mutation test on scratch copies (02c's top row "≈ 11:03 am" → "≈ 11:04 am"; 02b `vo[3]` d 3.5 → 3.2): **FAILED: 4 of 178 checks, exit 1** (the row, the `vo[3]` field, its fit test, the VO-fit summary). `node src/cli.mjs check` → 3/3 clean, 0 errors, 0 warnings (also at `--every 0.05`), and the kits' find-your-row samples plus the Live Sheet stress specs are clean. Contact sheets and stills at every beat (and frame by frame across each 02a pick) were inspected; final MP4s re-rendered to `studio/out/`.

### Port to Becker Rig (2026-10-08): 02a

The owner watched the 30 teasers in four looks and kept two, Scoreboard and Becker Rig; Clean Sheet and Live Sheet are retired. 02a moved from Live Sheet to Becker Rig. There is no other Becker Rig find-your-row teaser to match, so the bar was the look's finished teasers (a figure that works the maths, beats on the VO's words, one gold-plate payoff). **The hook, every number, every VO line and the verdict are unchanged**, and so are `columns`, `rows`, `formula`, the first two picks and the timings of rows, VO and verdict.

**Files:**
- `studio/specs/02a-becker-rig-3-a-day-by-age.json` is new; the Live Sheet spec was moved with `git mv` to `studio/specs/retired/02a-live-sheet-3-a-day-by-age.json`.
- `studio/looks/becker-rig/formats/find-your-row.js` gained two opt-in options (documented in its header comment): `compare[].start` and `beats`.
- This write-up and `checks/02-find-your-row.py` were updated to match.

**What a straight port looked like, and the fix:**

| Problem (same spec, `look` changed, Live Sheet `lookOpts`) | Fix |
|---|---|
| In Becker Rig the last pick is the payoff: its value goes onto the gold plate with the short's one impact. The Live Sheet pick (row 35, measured from 25) put the plate on **≈ $111,000**, the cheaper row, while the verdict is about 25 costing more than double 35 | The measured pick is turned round: row 25, measured from row 35 (`compare: [{ pick: 2, from: 4 }]`). He goes to the 35 row and steps **up** the pegs to 25 drawing the bracket ("10 years younger"), and the plate lands on 25's **≈ $240,000**. Same ratio, 2.152 |
| The kit's compare arrives just in time for its pick, so with the turned-round pick at 8.4 s he would leave the 25 row and draw the bracket at about 7-8.3 s, under "At 25: ≈ $240,000" (the kit sample's timing), and the impact landed on "10 years younger?", 2.3 s before "more than double" | New `compare[].start`. `start: 8.4` makes him set off for the 35 row as line 4 starts (lands 8.82; the row takes its grey frame then). He takes the pencil at 9.07 and draws the bracket 9.49-10.58, under "It costs you". The pick moves to **10.7 s**, so the plate, the hit and the label land on "more than double", with the verdict and its ding |
| The label "≈ 2.2×" made sense on the Live Sheet bracket, but here labels go to the note shelf under the table, away from the bracket | Label "**≈ 2.2×** the cost at 35" (number tokens 2.2 and 35, both already on screen; FV(25) ÷ FV(35) = 2.152) |
| Becker Rig's mono footer wrapped "At 7% a year until 65 · no tax, fees, / inflation", one word alone on line 2 | Footer "At 7% a year until 65\nno tax, fees, inflation": the same words, broken between the clauses as the other Becker Rig footers are (09a, 09b, 10b) |
| Nothing acted the hook's excuse: frame 1 to 1.2 s was the figure with a hand on his chin | `beats: [{ t: 0.25, act: "shrug", d: 0.9 }]`. A palms-up shrug on "Just $3 a day?" (new option, no sound), over before he crouches for the leap to row 18 (1.18 s) |
| `hold` 5.0 no longer matched the last beat | `hold` 2.7 (13.4 − 10.7); `duration` stays 13.4 s, and the loop clear (12.7-13.4 s) brings the last frame back to frame 1 |

**Kit changes** (`looks/becker-rig/formats/find-your-row.js` only; no shared file):
- `compare[].start`: a timed compare. The hop to row `from` takes off at `start` when it fits (else the default timing), the draw stretches to the pick, and row `from` takes its grey frame when he lands on it.
- `beats: [{ t, act, d }]`: a POSES (or local) pose blended over his track for d s, easing in 0.2 s and out 0.25 s. The pinned pointing hand still wins.
- Regression: both kit samples and 02b render **pixel-identical** (89 stills at 18 times) with **identical SFX cue lists**, before and after.

**Check script:** the id, look, footer, pick 3 (row 25, t = the verdict's 10.7, the new label), `lookOpts` (`compare` from row 4 with `start` = line 4's start; the shrug beat) and `hold` are pinned. The pick-timing rule now reads "lands as its VO line starts, or (a timed compare) sets off as it starts and lands with the verdict". New asserts: the shrug sits inside line 1 and ends before the 1.18 s take-off, and the compare starts on line 4 and lands on the verdict. Mutation test on scratch copies: `start` 8.0, the label "≈ 2.3×", pick 3 back at 8.4 and the one-line footer each **FAIL** (2, 2, 3 and 1 checks).

**Verification:**
- `python3 teasers/v2/checks/02-find-your-row.py`: **PASSED: all 177 checks**.
- `node src/cli.mjs check`: 0 errors, 0 warnings (also at `--every 0.05`).
- Contact sheet and stills read at 0, 0.6, 1.0, 1.4, 2.0, 2.9, 4.9, 5.6, 7.0, 8.3, 8.5, 8.9, 9.3, 9.8, 10.3, 10.75, 11.3, 12.5, 12.9, 13.1 and the end. Every cell, pill and the formula on screen were also read from the DOM and compared with the check's recomputed strings: 30 of 30 cells, 3 of 3 labels, the formula, all equal. The last frame equals frame 1.
- MP4: `studio/out/02a-becker-rig-3-a-day-by-age.mp4` (13.4 s, 402 frames, 21 SFX cues). Frames pulled at 2.0 and 9.8 s and frame 323 (10.77 s, under the impact's shake) match the stills: PSNR 40.4 / 39.3 / 38.0 dB, x264 noise only.

### Port to Scoreboard (2026-10-08): 02c

02c moved from Clean Sheet to Scoreboard. The bar was 02b, the look's finished find-your-row. **The hook, every number, every VO line, the footer, the verdict and the whole `data` block are unchanged.** Only `id` and `look` changed in the spec; `lookOpts.verdictRow: 0` is kept.

**Files:**
- `studio/specs/02c-scoreboard-salary-per-hour.json` is new; the Clean Sheet spec was moved with `git mv` to `studio/specs/retired/02c-clean-sheet-salary-per-hour.json`.
- `studio/looks/scoreboard/formats/find-your-row.js` now reads `verdictRow`.
- This write-up and the check (id, look) were updated.

**What a straight port looked like, and the fix:**

| Problem (plain port) | Fix |
|---|---|
| The Scoreboard's find-your-row ignored `verdictRow`, so through the verdict "$200,000: you work for tax till ≈ 11:03, every workday." the pointer and the glow stayed on the **$100,000** row: the verdict named one row while the board lit another | `verdictRow` is the same option the other kits read: a quiet pick at verdict.t. The pointer glides up to the $200,000 row, the row lights and the others dim, and its clock "≈ 11:03 AM" lands the motion grammar's climax bump (1.13, glow flare). It has no label (the verdict takes the strip) and no sound of its own (the verdict's reveal and the spec's ding). The cover frame is the finished board with that row lit |
| Everything else held up against 02b as it was: frame 1 with the header, the footer and the top row's ≈ 11:03 AM; 12 rows at a ~55 px pitch, each in an outlined slot, with 42 px Anton cells; the pick labels slamming into the strip at 58 px; the late verdict over the strip and the caption band at 72 px | No change. A `prompt` ("Find your salary") was considered and left out: at frame 1 it would compete with the "$65,000?" caption, and 02b runs without one |

**Kit change** (`looks/scoreboard/formats/find-your-row.js` only; no shared file, no README): `verdictRow` as above, documented in the header comment. Regression: both kit samples and 02b render **pixel-identical** with **identical SFX cue lists**, before and after.

**Verification:**
- The check passes (see above); the mutation "look clean-sheet" **FAILS** (1 check).
- `node src/cli.mjs check`: 0 errors, 0 warnings (also at `--every 0.05`).
- Contact sheet and stills read at 0, 0.6, 1.2, 1.55, 1.75, 3.4, 4.7, 4.8, 7.45, 7.6, 7.7, 9.85, 9.9, 10.0, 10.1, 10.25, 10.3, 10.5, 11.0, 12.0 and the end. Every cell and label on screen, read from the DOM, equals the check's strings (36 of 36 cells, 2 of 2 labels, the formula).
- MP4: `studio/out/02c-scoreboard-salary-per-hour.mp4` (13.0 s, 390 frames, 17 SFX cues). Frames pulled at 1.75, 7.7 and 10.25 s match the stills: PSNR 39.2 / 40.7 / 40.1 dB.

### Fix pass on the ports (2026-10-08)

QA judged the two ports against the finished teasers in their looks: 02a 7.5, 02c 7.0, no must-fixes. Every should and nit is handled below. **The hooks, every number, the VO wording and both verdicts are unchanged.** 02a's line-4 caption gained a line break (same words), 02a's `lookOpts` gained a beat and `figureScale`, and 02c gained one pick label built from a number already on its board.

**02a (Becker Rig):**

| QA item | Fix |
|---|---|
| should: the figure (0.72) was boxed into the gutter, small beside the finished Becker Rig teasers (0.84-1.1), and the pencil eraser poked left past the post (x ≈ 28) | `lookOpts.figureScale: 0.82`, the largest scale that keeps the values at 48 px. At 0.84 the narrower table needs a third line for the column heads, and the values drop to 46 px. In the format, the post moves to x 22, and in the poses he holds on screen (hand on chin, looking up or along the shelves, the shrug, pointing) his pencil and limbs stay at least 12 px right of the post's centre. On the cover frame the eraser now clears the post by about 14 px. The formula on the note shelf may reach 40 px left of the keys (it is right-aligned and stops short of the pegs), so it stays on one line beside the wider gutter |
| should: the 35 → 25 comparison was hard to see at the payoff (thin bracket, faint grey frame on row 35, the "≈ 2.2×" pill small and far below) | While the bracket is up, row `from` is the reference: a soft grey band (#F1F3F6, the lightest that still reads; the red cells keep 3.5:1 on it) and its whole ledge in solid ink, so the 35 row reads as underlined. Its values are ink. The bracket is drawn at the look's prop stroke (10 px, was 6), and its ticks stop at least 13 px short of the keys. The payoff's shelf label is 48 px (was 42) when it fits on one line, popping with the plate and the impact. An ink rim was considered and dropped: at the 56 px pitch it would touch the planks above and below |
| nit: the line-4 caption wrapped mid-phrase ("It costs / you") | `vo[3].text` is "10 years younger?\nIt costs you **more than double**.": the same words, breaking at the clause (the kit's captions honour `\n`, as 01c's do). The check and this write-up quote it with the break |
| nit: about 3 s of stillness (5.2-8.1 s) | `beats: [..., { t: 6.2, act: "shocked", d: 0.7 }]`: once the VO reaches "≈ $240,000" (5.67 s) he does a "whoa" hop with his free arm up, still pointing at the row. New in the format: a beat that starts while a pick holds also taps its value, so ≈ $240,000 pulses 5% and its plank dips 3 px. No sound |
| nit: two greens on screen for about 0.3 s at 2.0 s | A fresh value that settles because a pick lights now snaps to ink in 0.1 s, the same frames as the pick's glow (it was 0.25 s from the same start) |
| nit: the gold plate's top edge touched the 20 row's plank | The plate's top stays 3 px under the plank of the row above. At this pitch the "$" of ≈ $240,000 reaches a few px past the plate's top edge |
| nit: the beat sheet put the figure "left of the shelving post" | "In the gutter between the shelving post and the keys" |

**02c (Scoreboard):**

| QA item | Fix |
|---|---|
| should: VO line 3, "That's ≈ 78 minutes a day.", had no visual (the strip fell back to the formula and the board sat still for about 3.4 s) | A second pick on the $65,000 row at 4.7 s with the label "≈ 78 min of tax a day". It mirrors the $100,000 label, and 78 is the row's own cell. The row stays lit and the others dim again, with a swipe and a ding. The strip now runs formula → "≈ US median full-time pay" → "≈ 78 min of tax a day" → "≈ 1 hr 40 min of tax a day" → verdict, one label for every VO line, as in 02b |
| nit: the climax landed out of order (the verdict slammed in while the pointer was still gliding and the $200,000 row was half lit; the 1.13 bump was masked) | In `scoreboard/formats/find-your-row.js` the `verdictRow` pick now leads the verdict by up to 0.25 s, starting no earlier than the end of the VO and at least 0.6 s after the previous pick. Here it starts at 9.8 s. The pointer glides and the row lights from 9.8 s, the clock's bump peaks at about 9.95 s, and the verdict slams in at 10.0 s. Until the verdict lands, the strip keeps the label that was up |
| nit: the write-up described the dense board (a ~50 px pitch, zebra stripes, no outlines) | The beat sheet, the port table and the open items now give the measured board: a ~55 px pitch (49 px bars), a rounded 2 px slot outline on every row, and Anton 42 px cells |

**Files:** the two specs, `studio/looks/becker-rig/formats/find-your-row.js`, `studio/looks/scoreboard/formats/find-your-row.js` (the header comments document the changes), this write-up and `checks/02-find-your-row.py`. No shared kit file was touched.

**Check script:** 02a's `vo[3]` (with its `\n`) and `lookOpts` (the hop, `figureScale`) are pinned, with new asserts: the hop sits inside line 3, after the VO reaches "≈ $240,000", while pick 2 holds and before the compare sets off. 02c's pick list now has three entries, and a new assert checks that the line-3 label is built from the row's own "≈ 78 min" cell and matches the VO.

**Verification:**
- `python3 teasers/v2/checks/02-find-your-row.py`: **PASSED: all 177 checks**. A mutation test on scratch copies fails 3 checks with exit 1. It used three changes: 02a's caption without its break, the hop moved to 5.0 s, and 02c without the 4.7 s pick.
- `node src/cli.mjs check` on both specs: 0 errors and 0 warnings, also at `--every 0.05`. The Becker Rig find-your-row samples lint clean too.
- Scoreboard regression: 02b and both Scoreboard find-your-row samples render **pixel-identical** before and after (42 stills).
- 02a timings are unchanged: take-off 1.43, landings 1.88, 4.78 and 8.82, the `tick` at 9.23, the draw from 9.49 to 10.58, and the `hit` and `ding` at 10.70. There are 21 SFX cues. The last frame equals frame 1.
- Stills were read at 0, 2.0-2.2 (frame by frame), 6.2-6.9, 8.9, 9.8, 10.2, 10.75, 11.2, 12.9 and the end for 02a, and at 0, 1.7, 4.75, 4.9, 7.5, 9.75, 9.85, 9.95, 9.97, 10.05, 10.1, 11 and the end for 02c.
- MP4s: `studio/out/02a-becker-rig-3-a-day-by-age.mp4` (13.4 s, 402 frames, 21 SFX cues) and `studio/out/02c-scoreboard-salary-per-hour.mp4` (13.0 s, 390 frames, 19 SFX cues: the new pick adds a swipe and a ding). Frames pulled from the MP4s match the stills (02a at 6.45 and 11.2 s: 38.4 / 38.1 dB; 02c frame 180: 40.7 dB).


### Condensed cut (2026-10-13): 02a, 02b, 02c

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The 06c and 06b condensed cuts of 2026-10-12 are the precedent (`06-pov-race.md`, "Condensed cut" and "Opening hold fix and re-ship"), and their rules were applied here: keep the hook, every number, the verdict wording and the end card; frame 1 is the thumbnail, with the hook caption complete and something moving from frame 2; no still run of 0.4 s or more before the verdict hold; captions up at least max(1.2 s, 0.12 s a word); the verdict 0.8-1.5 s after the final reveal, held 1.2-1.6 s.

**Files:**
- New: `studio/specs-wip/02a-becker-rig-3-a-day-by-age.json`, `studio/specs-wip/02b-scoreboard-trillion-at-your-wage.json` and `studio/specs-wip/02c-scoreboard-salary-per-hour.json`, retimed copies of the round-2 specs.
- Changed: this write-up (the three beat sheets and caption tables, the timings quoted elsewhere, Open items and this entry); `checks/02-find-your-row.py` (cut-aware, `--spec`); one opt-in kit option, `lookOpts.focus` in `studio/looks/scoreboard/formats/find-your-row.js`, documented in that file's header and in the find-your-row table of `studio/looks/scoreboard/README.md`.
- Not touched: `studio/specs/*.json`, every other kit file (no `lib.js`, `theme.js`, `style.css`, `cta.js`, `kit.js`, no other format, nothing in Becker Rig), `studio/src/`, `studio/sound/` and the packs, `studio/test/`, `publishing/` and `renders/`. Renders are in `/tmp/cond/02/<id>/` only. Nothing is committed.

**Kept, character for character:** the headers, footers and column labels, all 33 rows, the formulas, every pick label, the four caption lines of each teaser, the verdicts and their dings, 02a's measured pick (35 → 25, the gold plate on ≈ $240,000), its figure scale and the shrug and hop acts, 02c's verdict row, and the 2.5 s end card (the brand layer is untouched). Only the clock moved, plus 02a's acts and the Scoreboard boards' `focus`.

**Measured before** (`renders/channel/`, the round-2 cuts plus the card). Method as for 06b/06c: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG); a frame is still when YAVG < 0.15, near-still under 0.25.

| | Still runs ≥ 0.4 s before the verdict | Verdict hold | Opening |
|---|---|---|---|
| 02a (15.9 s) | 5.17-6.23 (1.07 s: after the 25 pick, before the hop), 6.87-8.17 (1.30 s: after the hop, before the compare); near-still 9.33-9.93 and 10.13-10.70 in the bracket draw | 11.27-13.43 (2.17 s still; the verdict holds 2.7 s) | near-still 0.03-0.50 (only the nod), the hook caption typing in from 0.0 |
| 02b (16.5 s) | 4.47-5.90 (1.43), 6.40-7.00 (0.60), 7.27-8.87 (1.60), 9.20-10.67 (1.47) | 10.97-14.03 (3.07 s; 3.3 s hold) | still 0.03-0.37 (0.33) until the first row lands |
| 02c (15.5 s) | 2.33-3.37 (1.03), 3.70-4.70 (1.00), 4.97-5.67 (0.70), 5.70-6.57 (0.87), 6.90-7.40 (0.50), 7.67-8.33 (0.67), 8.37-9.27 (0.90) | 10.13-11.67 and 12.00-13.03 (3.0 s hold) | still 0.03-0.23 |

The longest still before the verdict was 1.30 s (02a), 1.60 s (02b) and 1.03 s (02c). Each was a table that had finished filling while a narration-paced caption (2.0-3.5 s) played out over it, and each verdict held 2.7-3.3 s.

| | Round-2 cut (02a / 02b / 02c) | 02a condensed | 02b condensed | 02c condensed | Why |
|---|---|---|---|---|---|
| Body / total | 13.4 / 15.9, 14.0 / 16.5, 13.0 / 15.5 s | **7.8 / 10.3 s** | **7.6 / 10.1 s** | **7.6 / 10.1 s** | The stills were the slack. At reading pace, with something landing every few tenths of a second, this is as short as the four captions and three picks allow |
| Captions | narration-paced (2.0-3.5 s), 0.0-11.9 | **−0.4 / 1.45 / 3.05 / 4.7**, each 1.4-1.6 s up, 0.05 s apart; the verdict replaces the last at 6.3 | **−0.4 / 1.3 / 2.95 / 4.6**, up 1.25 / 1.6 / 1.6 / 1.3 s | same as 02b | The brief: up ≥ max(1.2 s, 0.12 s a word), back to back. vo[0] starts at −0.4 s, so the hook is complete on frame 1 (Becker Rig pre-types it; a Scoreboard line has finished its 0.14 s rise) |
| Rows | `rowsT` 0, `rowEvery` 0.5 / 0.35 / 0.2: the table full by 4.5 / 3.5 / 2.2 s, then held | `rowT` [0, 0.22, 0.55, 0.85, 1.15, 1.85, 2.3, 3.5, 3.95, 4.4] | `rowT` [0, 0.03, 0.45, 0.9, 1.7, 2.2, 2.6, 3.4, 3.85, 4.25, 4.6] | `rowT` [0, 0.03, 0.2, 0.37, 0.54, 0.71, 0.88, 1.75, 2.45, 3.4, 4.05, 4.5] | Every row still lands top to bottom, and the board is complete before the final reveal, but the rows below the picks now land between them, so the fill is the motion between the picks. The first row after frame 1 lands at 0.03 s on the Scoreboard boards (moving from frame 2); in Becker Rig a row's key starts to brighten 0.2 s before it lands, so 02a's lands at 0.22 s and frame 1 stays clean |
| Picks | 2.0, 4.9, 10.7 / 2.0, 4.2, 7.0 / 1.5, 4.7, 7.4 | **1.45, 3.05, 6.3** (the compare sets off at 4.7) | **1.3, 2.95, 4.9** | **1.3, 2.95, 4.9** | Each pick lands as its caption goes up; the last Scoreboard pick 0.3 s into its caption (the question reads first, the row lights on the answer) |
| Verdict | 10.7 (with the plate) / 10.7 / 10.0 | **6.3**, with the plate, 1.2 s after the 35 row becomes the reference; held 1.5 s | **6.05**, alone 0.15 s after the last caption, 1.15 s after the final pick; held 1.55 s | same as 02b (the $200,000 row lights from 5.9) | The brief: 0.8-1.5 s after the final reveal, held 1.2-1.6 s |
| `lookOpts` | 02a: shrug 0.25 (d 0.9), hop 6.2 (d 0.7), compare start 8.4, `figureScale` 0.82; 02b: none; 02c: `verdictRow: 0` | shrug **0.0** (d 0.6), hop **3.45** (d 0.6), compare start **4.7**; `figureScale` 0.82 | **`focus: 0.3`** (new) | `verdictRow: 0`, **`focus: 0.3`** | 02a: the shrug from frame 1 moves the frame from frame 2 and ends before the leap to row 18 (0.63 s); the hop fills the 25 row's hold. 02b/02c: see below |
| `sfx` | ding at the verdict | ding at 6.3 | ding at 6.05 | ding at 6.05 | Same cue on the same beat. No gain changed |

**Why a kit option, and only for Scoreboard.** In 02a the figure is the motion: it leaps, hops, acts the beats and draws the bracket, and spec knobs (`beats`, `compare.start`, `rowT`) were enough. A Scoreboard board has no figure. A pick moves for only about 0.3 s (the pointer glide, the row lighting, the label slam), a row landing for about 0.28 s, and under a lit pick the other rows sit dimmed at 0.5 for a fixed 1.6 s, so even with the rows interleaved the gap from the final pick to a late verdict was a still 0.47 s (02b draft: 5.07-5.53). The only spec-only fix was a verdict 0.7 s after the final pick, which would have left the $1,000/hr working on screen for 0.7 s. `lookOpts.focus` sets how long the other rows stay dimmed after a pick before they ease back (default 1.6 s, the old constant `FOCUS`). At 0.3 each pick is a brief spotlight: the board dims as the row lights and eases back over the next 0.8 s, which bridges the pick to the next row, the next pick or the verdict. No cue moves. **Default unchanged:** before and after the edit, the cue records (`node src/cli.mjs cues`) of `specs/02b-*.json`, `specs/02c-*.json` and both Scoreboard find-your-row samples are byte-identical, and so are their stills at 0, 2.0, 3.4, 4.75, 6.1, 6.5, 7.45, 9.9 s and the end (36 PNGs). One sample still at 3.4 s first came out differing in a single 1 px column; two re-renders of it with the new code both matched the old file byte for byte, so that was a one-off rendering glitch.

**Iteration.**
- 02c spec-only, default dim: the dimmed row landings (YAVG peaks 0.2) left near-still stretches of up to 1.27 s and a 0.70 s still between the last pick and the verdict row.
- `dim` 0.7 and the last caption 0.3 s ahead of its pick: still runs ≤ 0.30 s in 02c, but 02b still had its 0.47 s gap after the final pick (above).
- `focus` 0.3 (dim back at its default 0.5): no still run reaches 0.31 s before either verdict. `focus` 0.25 with an earlier row made 02c worse (a 0.40 s still at 2.57-2.97).
- 02a: with its second row at 0.05 s, frame 1 showed the 20 row's values half fallen (the thumbnail); moved to 0.22 s.
- A 1.3 s verdict hold on 02b/02c would land the end card on a beat (see the sound notes below), but it measured worse (02c: B8 −13.05 against −13; 125 Hz 0.3 against a floor of 2), so the hold stays 1.55 s.

**Measured after** (`/tmp/cond/02/<id>/render/<id>.mp4`, same method):

| | Before the verdict: still runs ≥ 0.2 s (none reaches 0.4) | Near-still (< 0.25) before the verdict, longest | Verdict hold, card | Frame 1 |
|---|---|---|---|---|
| 02a (verdict 6.3) | 2.00-2.23 (0.23), 4.10-4.37 (0.27) | 5.27-5.60 (0.33) | 6.87-7.83 still (the impact settles), card 9.03-10.30 | moving from 0.033 s (the shrug; YAVG 0.24) |
| 02b (verdict 6.05) | 0.73-0.93, 3.23-3.43, 5.17-5.47 (0.30), 5.80-6.00 | 5.17-5.53 (0.37) | 6.30-7.63, card 9.10-10.10 | moving from 0.033 s (the $15 row; 0.17) |
| 02c (verdict 6.05) | 2.20-2.47 (0.27), 2.73-2.97, 3.23-3.43, 3.83-4.07, 4.33-4.53, 5.17-5.47 (0.30) | 2.10-2.53 and 5.13-5.57 (0.43 each: a recovery's slow tail into a row landing, and the final pick's settle into its recovery) | 6.17-6.47 and 6.80-7.63 (the verdict row's dim eases back at 6.47-6.80), card 9.10-10.10 | moving from 0.033 s (the $150,000 row; 0.21) |

The longest still before the verdict is now **0.27 s (02a), 0.30 s (02b) and 0.30 s (02c)** (was 1.30, 1.60 and 1.03 s). Nowhere does only a counter or a caption change: every near-still stretch is a row landing, a recovery easing or the figure settling.

**Stills read** (`node src/cli.mjs stills`, 21-24 per teaser, every beat, plus 4 fps contact sheets): 02a at 0, 0.033, 0.3, 0.9, 1.45, 1.6, 2.0, 2.5, 3.05, 3.6, 4.4, 4.7, 5.1, 5.5, 6.0, 6.3, 6.6, 7.0, 7.79, 8.5 s and the end; 02b at 0, 0.033, 0.5, 1.0, 1.3, 1.45, 2.0, 2.95, 3.1, 3.6, 4.3, 4.6, 4.9, 5.05, 5.5, 5.9, 6.05, 6.3, 7.0, 7.59, 8.5 s and the end; 02c at 0, 0.033, 0.5, 0.9, 1.3, 1.45, 1.8, 2.45, 2.95, 3.1, 3.4, 4.05, 4.5, 4.6, 4.9, 5.05, 5.5, 5.9, 6.05, 6.3, 7.0, 7.59, 8.5 s and the end.
- Frame 1 of each: the header, the footer, the first row with its number, the formula and the complete hook caption ("Just $3 a day?" with the figure's hand on his chin; "40 years at minimum wage?" over the lit $7.25 row; "$65,000?" over the $200,000 row and its ≈ 11:03 AM). Nothing is in mid-flight.
- Every cell, pick label and verdict on screen matches the maths tables above. The held frames were read at full size (7.0 s): 02a's plate on ≈ $240,000 with the bracket from 35 and "≈ 2.2× the cost at 35"; 02b's $1,000/hr row and "EVEN $1,000/HR FOR 40 YEARS: ≈ 7.3 HOURS OF HIS."; 02c's $200,000 row and "$200,000: YOU WORK FOR TAX TILL ≈ 11:03, EVERY WORKDAY."
- The labels in each strip land with their captions (02b: "$7.25/HR × 83,200 HRS = $603,200" at 1.3, "$20/HR …" at 2.95, "$1,000/HR …" at 4.9; 02c: "≈ US MEDIAN FULL-TIME PAY", "≈ 78 MIN OF TAX A DAY", "≈ 1 HR 40 MIN OF TAX A DAY"), and the end card is unchanged.
- At a caption change a Becker Rig line pops its words in over about 0.2 s, and a Scoreboard line rises over 0.14 s, so a frame at exactly 1.45 / 1.3 s shows the band empty for a frame or two, as in the round-2 cuts.

**Lint:** `node src/cli.mjs check` on the three WIP specs gives 0 errors and 0 warnings, also at `--every 0.05` (02a 10.3 s = 7.8 + 2.5 s end card; 02b and 02c 10.1 s = 7.6 + 2.5). `specs/02b`, `specs/02c` and both Scoreboard find-your-row samples are clean too after the kit change.

**Render and sound:**
- `render specs-wip/<id>.json --out /tmp/cond/02/<id>/render`: 02a 309 frames, 22 sfx; 02b and 02c 303 frames, 21 and 22 sfx.
- `sound … --video /tmp/cond/02/<id>/render --out /tmp/cond/02/<id>/final --score`: each video md5 is identical (02a `8630880875de`, 02b `630769541c00`, 02c `2a71e3fa347f`). 02a: P 6.3 (verdict + hit), 12 beats at 114.286 BPM, then 3 beats at 120 (a 3-beat remainder) to base 7.8; sections HOOK, a 1-bar BUILD, TENSION and a 1-bar DROP, with no HOLD or CADENCE. 02b and 02c: P 6.05 (verdict), 14 beats at 138.843 BPM (a 2-beat pickup); HOOK 0-2.59 and TENSION 2.59-6.05, so there is **no BUILD**, then DROP 6.05-7.6. `pick(P, base)` finds no tempo for the 1.55 s from P to base (3 beats would be 116 BPM, 4 would be 155: both outside ±8%), so **base is left free**. The music holds the cadence chord until base, and the card does not land on a beat. BIBLE §2.3 says that "never happens with today's specs". 
- `audit`: 02a −14.15 LUFS, TP −1.30, LRA 4.68, PLR 12.85; 02b −14.10, −1.36, 5.17, 12.73; 02c −14.17, −1.30, 5.60, 12.87; silence 0% in all three.

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/02/<id>/final --detail`): **02a 39/42, 02b 41/42, 02c 41/42.** The units pass (Becker Rig and Scoreboard). The CUE DRIFT block (each record moved: duration, base, card t0 and the sfx list) and "baseline DIFFERS" are expected for a WIP cut. The failures:
- **02a BANDS**: 250 Hz −2.5 dB re 1 kHz against a floor of 0 (2.5 under), and 2 kHz +0.6 against a ceiling of 0 (0.6 over). Likely cause, from `bandparts.mjs 02a` on fresh records against the fixture's: the music stem's 250 Hz octave fell from −0.3 to −3.2 (the bass's 250 Hz share went from −2.2 to −5.9), and the SFX stem's 2 kHz octave rose from −2.3 to −1.3. That is 22 cues in a 7.8 s body instead of 23 in 13.4 s, with the steps, pops, swipe, hit and ding crowding the reference band. This is the kind of reference-octave crowding BIBLE §6.7 item 4 handles for 06c, and the round-2 cut already sat on these octaves' edges (250 Hz +0.3, 2 kHz −0.1).
- **02a B7**: the BUILD's second half is quieter than its first (edge −16.2 against −15.2 LUFS; centred −16.5 against −16.5). Likely cause: the BUILD is a single bar (2.1-4.2), so its E3 → E4 step (§2.5) has no second bar to land on.
- **02a S8**: snare velocity SD 0.162 against a maximum of 0.15 (gated for Becker Rig). The shaker timing SD (2.32 ms) and the grid (0.051 ms) pass. Likely cause: with 12 beats to P there are few snare hits, so the written accents (the TENSION and DROP fills) weigh more in the SD.
- **02b BANDS**: 125 Hz 1.7 against a floor of 2 (0.3 under) and 250 Hz −0.9 against 0 (0.9 under). **02c BANDS**: 125 Hz 1.0 (1.0 under) and 250 Hz −1.9 (1.9 under). Likely cause, from the same per-stem split on the Scoreboard pack (a scratch copy of `bandparts.mjs`'s method; no Scoreboard tool exists): the SFX stem now owns more of the 1 kHz reference (02b −2.2 against −3.4 for the round-2 cut; 02c −2.7 against −3.6), because the three swipe + ding pairs and the row ticks come about twice as densely. Meanwhile the music stem's low mids fell (02b 125 Hz 1.1 against 3.6 and 250 Hz −1.9 against 0.0; 02c 125 Hz 0.3 against 3.1 and 250 Hz −2.9 against −0.2). With no BUILD and a free base, the low pads and bass play for less of [0, base]. Scoreboard has no reference-octave rule, and its calibration was fitted on bodies of 13-46 s.
- Every gated check, with its value and margin, is listed per teaser in the editor's report. The tightest passes: A5 PLR 12.85 / 12.73 / 12.87 against 13; B8 logo −12.71 / −12.81 / −12.77 LUFS against −13; A2 −1.30 / −1.36 / −1.30 dBTP against −1; S14 12 notes at once against 12, in all three. Nothing was changed in the packs, the calibration or `acceptance.json`; the ship step owns sound.

**Check (`checks/02-find-your-row.py`):**
- `--spec [KEY=]PATH` (repeatable) checks a spec in place of `studio/specs/<id>.json`. The default run is unchanged.
- **Two cuts**, picked by length: the round-2 cut (13.4 / 14.0 / 13.0 s; what `studio/specs/` holds, `IN_SPECS`) and the condensed cut (`COND_A`, `COND_B`, `COND_C`, built from the round-2 strings by `cond_02a` and `cond_scoreboard`). Any other length is held to the condensed rules and fails the 6.5-9 s lane.
- **New for the condensed cut** (`check_cond`): the lane; each caption up ≥ max(1.2 s, 0.12 s a word) from frame 1; captions back to back (gaps 0-0.2 s); the hook complete on frame 1 (Becker Rig: the last word settled by t = 0; Scoreboard: t ≤ −0.14); frame 1 clean and moving from frame 2; rows top to bottom and complete before the final reveal; each pick inside its caption (≤ 0.35 s in) and after its row, and the timed compare set off on its caption; the late verdict 0.15 s after the last caption (Scoreboard) or replacing it (02a); the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s; 02a's shrug (from frame 1, over before the leap) and hop (inside line 3, before the compare); `focus` 0.25-0.5 and the verdict row's lead; and a proxy for the motion audit, built from the kits' motion windows (rows, picks, recoveries, the figure's moves and acts), which allows no gap of 0.4 s or more before the verdict (02a 0.21 s, 02b 0.25 s, 02c 0.25 s).
- **Results:** **183 checks, 0 failed by default** (was 177: the new rows say which cut `studio/specs/` holds and compare the data fields); **216, 0 failed with `--spec` on the three WIP specs**. A scratch tree with the WIP specs in place of `studio/specs/` fails exactly the three "studio/specs/ holds the expected cut" rows until `IN_SPECS` is flipped to `"cond"` (then 216, 0 failed), and the round-2 specs pass through `--spec` from outside `studio/specs/` (183, 0 failed).
- **Mutation test** (scratch copies in `/tmp/cond/02/mut/`): 14 of 14 caught, each with exit 1 and a named failure. Every one except the dropped verdict row (caught by the exact `lookOpts`) is also caught by a timing rule. The mutations: vo[0] at 0.0 (a type-on at frame 1); the hop moved into the compare; row 20 at 0.1 s (frame 1 not clean); a 3.0 s verdict hold; the shrug into the leap; a verdict 2.1 s after the final pick; no `focus`; a 1.0 s caption; the $1,000 row landing after its pick; 02c's bottom rows filled by 1.8 s (the old fast fill: the motion proxy fails); "≈ 10:19" in a caption; the last pick 0.7 s into its caption; `verdictRow` dropped; a 0.35 s caption gap.

**To promote** (the ship step):
1. Copy the three WIP specs over `studio/specs/` and set `IN_SPECS` to `"cond"` for each in the check (183 → 225 checks by default since the fix pass, checked on a scratch tree).
2. Follow BIBLE §11.1 for the three moved records: refit Becker Rig's `MODEL` (§11.2) and re-measure the Scoreboard calibration; settle the three failures above (02a BANDS, B7 and S8; the 02b and 02c BANDS) at pack level; decide whether a free base is acceptable or the Scoreboard hold should become 1.3 s (3 beats). Then store the records, run `tempo-table --write`, `verify --strict-cues` and `npm test`, and add the bible status line.
3. Ship by §11.5 from a picture folder that holds these renders (since the fix pass: `/tmp/cond/02/<id>/final/render/`; the round-1 renders named in this entry were replaced and deleted) and `renders/channel/` for the other 27.
4. Then the publishing sheets (`build_publishing.py <id> --covers`; by content, the covers are the settled payoff frames: about 6.9-7.8 s in 02a, 6.35-7.6 s in 02b and 6.8-7.6 s in 02c) and `teasers/v2/teasers.json` (runtimes 10.3 / 10.1 / 10.1 s).

**Open items:**
- The three sound failures and the free base above are the ship step's.
- 02c's verdict row dims the board again at 5.9 s, and the board eases back during the verdict hold (6.2-7.0 s). That is motion in the hold, not before it, and the board is settled from about 6.8 s (the cover frame).
- The 06b/06c precedent kept bodies of 15.7-18.3 s; these bodies are 7.6-7.8 s because a lookup table has no race to run: four captions at reading pace, three picks and a 1.5 s verdict hold is the whole story. If the owner wants the full board on screen longer for finding one's row, the lever is the verdict hold (up to 1.6 s) or a fourth pick, not a still board.

### Condensed cut: fix pass (2026-10-13): 02a, 02b, 02c

The critic passed format 02 (02a 8, 02b 8, 02c 7) with no musts. It raised 7 shoulds: six sound items and 02b/02c's free base. It also raised 7 nits. Every picture item and every cheap nit is applied below. The sound items stay with the ship step, with this pass's measurements. The free base was the one sound item caused by the cut's timing, so it was tried and measured.

**Files:**
- Changed: the three WIP specs; `checks/02-find-your-row.py`; this write-up (the three beat sheets and caption tables, the (b) table, Open items and this entry); one line of the find-your-row table in `studio/looks/scoreboard/README.md` and the `focus` lines of the header comment in `studio/looks/scoreboard/formats/find-your-row.js`. Both now name the values the cuts use (02b 0.25, 02c 0.3). No code changed: the format file's diff against HEAD is still the round-1 `focus` option, and the committed 02b/02c cue records still equal `test/fixtures/cues.json`.
- Not touched: `studio/specs/*.json`, `studio/src/`, `studio/sound/`, the packs, `acceptance.json`, `studio/test/`, `publishing/`, `renders/` and every other format and kit file. Renders are in `/tmp/cond/02/<id>/final/` only. Nothing is committed.

| Severity | Critic's item | Resolution |
|---|---|---|
| should | 02a BANDS (250 Hz −2.5 against 0; 2 kHz +0.6 against 0) | **Ship step** (refit Becker's `MODEL`, §11.2, and the reference-octave rule, as for 06c). Unchanged by this pass: captions are not a sound cue, so 02a's master WAV is byte-identical to the condensed cut's (sha256 `08729f59e5dff70c…`). |
| should | 02a B7 (one-bar BUILD: edge −16.2 against −15.2) | **Ship step**, unchanged. Moving P a beat later is not a picture option here: the verdict would land about 1.7 s after the reference row, outside the 0.8-1.5 s rule. |
| should | 02a S8 (snare velocity SD 0.162 against 0.15) | **Ship step**, unchanged (shaker timing SD 2.32 ms and grid 0.051 ms pass). |
| should | 02b BANDS | **Ship step.** After this pass's retime: 125 Hz 1.9 against a floor of 2 (0.1 under; was 1.7) and 250 Hz −0.8 against 0 (0.8 under; was −0.9). |
| should | 02c BANDS | **Ship step.** 125 Hz 0.8 (1.2 under; was 1.0) and 250 Hz −2.0 (2.0 under; was −1.9). |
| should | 02b/02c free base (no tempo fits the 1.55 s from P to base) | **Measured; base left free for the ship step to decide.** The cause is the cut's timing, so holds that fit 3 beats within ±8% of 138.843 BPM were built on the final pictures (render, `sound --score` and `verify` each; `/tmp/cond/02/var/`, since deleted). The base lands on a beat in each, but the gates get worse. At **1.35 s** (133.3 BPM, −4.0%): 02b BANDS 125 Hz 1.2 / 250 Hz −1.3, A2 −1.20 dBTP (0.20), A5 12.90 (0.10), B8 −12.87 (0.13); 02c BANDS 125 Hz 0.3 / 250 Hz −1.9, B8 −12.93 (0.07). At **1.4 s** (128.6 BPM, −7.4%), B8 **fails** in both (−13.62 and −13.58 against −13). Round 1's 1.3 s gave B8 −13.05 on 02c. A 1.6 s hold would be 4 beats at 150 BPM, +8.04%, just outside the window. So the hold stays 1.55 s. The choice between documenting a free base in the bible (§2.3 says it never happens) and changing the tempo picker stays with the ship step. |
| should | Thin margins (A5, B8, A2, A1, S14) | Re-measured on the final builds (below). They are the ship step's to re-check after the refits. |
| nit | 02a: line 4 states the verdict 1.6 s early | **Applied.** `vo[3]` is now "10 years younger?" (4.7-6.3), so "more than double" first appears with the verdict, the gold plate and the "≈ 2.2×" pill. The verdict wording is unchanged and keeps the question on its first line, so on screen the answer lands under the question. Caption words: 21 → 15. The check builds the condensed line from the round-2 line's first clause, and the write-up's caption table is updated. |
| nit | 02a tempo jump +5.0% at P | **Ship step**, unchanged (114.286 → 120 BPM; the master is unchanged). |
| nit | 02b/02c: the final pick's label up 1.15 s | **Applied.** The last pick is at **4.85** in both (0.25 s into its caption, question first), so its label is up 1.2 s and the verdict lands 1.2 s after it (in 0.8-1.5). New rule in the check, for every pick of every cut: its label is up at least max(1.2 s, 0.12 s a word) before the next pick or the verdict takes its place. `PICK_IN` (0.35 s) already admits 0.25. In 02b the earlier pick stretched the final pick's settle into a 0.43 s near-still (5.10-5.53, draft), so **02b's `focus` is now 0.25** (was 0.3). That brings it to 0.37 s and shortens the earlier recoveries' near-stills to 0.27 s. |
| nit | 02c: two 0.43 s near-stills | **Applied, differently from the suggestion.** Landing the $50,000 row at 2.3 s on its own opened a 0.40 s still at 2.57-2.97 (drafts at 2.35 and 2.4 left a 0.43 s near-still at 2.53-2.97). Between picks 1 and 2 there are only two short row landings (each above YAVG 0.25 for about 0.1-0.25 s), so the near-still time just moves from one gap to the other. `focus` 0.4 made the final pick's settle a 0.40 s still. **What shipped:** pick 2 and its caption come at **2.8** (line 2 is up 1.45 s, line 3 1.75 s), the $50,000 row at **2.3**, and the bottom three rows at **3.3, 3.9, 4.45** (were 3.4, 4.05, 4.5). The longest near-still before the verdict is now 0.37 s (was 0.43, twice) and the longest still 0.30 s. |
| nit | 02c: pick 2 repeats its caption | Not changed (the critic: not needed for this cut). If a later pass wants it, merging line 3 into pick 2's label is the lever. |
| nit | ~10 s runtime | **Applied:** Open items now lists it as an owner decision, with the levers. |
| nit | `--spec` KEY | **Applied.** KEY may be a/b/c, 02a/02b/02c or the full id. An unknown KEY, or a path whose stem is not an id, now names every valid KEY in the error. Tested: `--spec 02b-scoreboard-trillion-at-your-wage=PATH`, `02b=PATH` and `b=PATH` pass (196 checks); `x=PATH` and a renamed file exit 1 with the list. |

**Results:**
- **Lint:** `check` on the three WIP specs gives 0 errors and 0 warnings, also at `--every 0.05` (10.3 / 10.1 / 10.1 s = 7.8 / 7.6 / 7.6 + the 2.5 s card).
- **Math check:** **183 checks, 0 failed** by default (unchanged) and **225, 0 failed** with `--spec` on the three WIP specs. The 9 new rows are the pick-label rule. On a scratch tree with the WIP specs as `studio/specs/`, exactly the three "holds the expected cut" rows fail until `IN_SPECS` is flipped; then 225, 0 failed. **Mutation test** (`/tmp/cond/02/mut/mut.py`): **18 of 18 caught**, each with exit 1 and a named failure. That is the round-1 14 plus four new ones: the old line 4 back on 02a (`vo[3]`); 02b's last pick back at 4.9 (its label up 1.15 s); 02c's verdict 0.05 s earlier (label up 1.15 s); `focus` 0.2.
- **Stills read** (`stills`, plus frames pulled from the final MP4s):
  - 02a at 0, 0.033, 4.6, 4.75, 4.9, 5.3, 5.8, 6.1, 6.25, 6.3, 6.45, 6.6, 7.0 and 7.79. "10 years younger?" alone over the walk to 35 and the bracket. The verdict's second line "It costs more than double." arrives with the gold plate on ≈ $240,000 and "≈ 2.2× the cost at 35" (complete by 6.45).
  - 02b at 0, 0.033, 0.5, 1.3, 1.45, 1.6, 2.0, 2.95, 3.2, 3.6, 4.3, 4.6, 4.85, 5.0, 5.3, 5.9, 6.05, 6.3 and 7.0. "$1,000/HR × 83,200 HRS = $83,200,000" slams in at 4.85 and holds the strip until the verdict at 6.05.
  - 02c at 0, 0.033, 0.5, 1.3, 1.45, 1.9, 2.3, 2.75, 2.8, 2.95, 3.3, 3.9, 4.45, 4.6, 4.85, 5.0, 5.5, 5.95, 6.05, 6.3 and 7.0. "$50,000 · ≈ 73 MIN · ≈ 10:13 AM" is landed by 2.75 under "You work for tax till ≈ 10:18.". "≈ 78 MIN OF TAX A DAY" takes the strip at 2.8. The bottom rows (≈ 10:08, ≈ 10:04, ≈ 9:59) are in by 4.6. "≈ 1 HR 40 MIN OF TAX A DAY" holds from 4.85 to the verdict. The $200,000 row lights at 5.95.
  - Frame 1 of each final MP4 is unchanged: the header, the first row, the formula and the complete hook caption. Every cell and label matches the maths tables.
- **Motion audit** of the final renders (`/tmp/cond/02/<id>/final/render/<id>.mp4`, the same video stream as the final MP4s; 270×480 `tblend` difference, YAVG < 0.15 still, < 0.25 near-still):

| | Still runs ≥ 0.2 s before the verdict (none reaches 0.4) | Longest near-still before the verdict | Verdict hold, card | Frame 1 → 2 |
|---|---|---|---|---|
| 02a (verdict 6.3) | 2.00-2.23 (0.23), 4.10-4.37 (0.27) | 5.27-5.60 (0.33) | 6.87-7.83 still (the impact settles), card 9.03-10.30 | YAVG 0.24 (the shrug) |
| 02b (verdict 6.05) | 0.73-0.93, 3.23-3.43, 5.13-5.37 (0.23), 5.70-6.00 (0.30) | 5.10-5.47 and 5.63-6.00 (0.37 each). Round 1, with the pick at 4.9, had 5.17-5.53 (0.37) and 5.73-6.00 (0.27), and the 4.85 draft at `focus` 0.3 had 5.10-5.53 (0.43). The gap before the verdict is the cost of the label's 1.2 s: 0.10 s longer, and still under 0.4 | 6.30-7.63, card 9.10-10.10 | 0.17 (the $15 row) |
| 02c (verdict 6.05) | 2.57-2.80, 3.07-3.33 (0.27), 3.70-3.93, 4.17-4.47 (0.30), 5.13-5.43 (0.30) | 0.37: 2.43-2.80, 2.97-3.33, 3.60-3.97, 4.13-4.50 (were 0.43 at 2.10-2.53 and 5.13-5.57) | 6.17-6.57 near-still (0.40, the verdict row's dim easing back, inside the hold), 6.80-7.63 still, card 9.10-10.10 | 0.21 (the $150,000 row) |

- **Render, sound and verify** (`render specs-wip/<id>.json --out …/final/render`; `sound … --video …/final/render --out …/final --score`, run twice: the MP4s are byte-identical; `verify … --video …/final --detail`). The units pass (Becker Rig 65/65, Scoreboard 68/68 + LOGO). The CUE DRIFT block (duration, base, card t0, the sfx count) and "baseline DIFFERS" are expected for a WIP cut.
  - **02a: 39/42**, failing BANDS, B7 and S8 with the values above. Video md5 `3e22d951fbfd`, master sha256 `08729f59e5dff70c`. P 6.3 (verdict + hit), 114.286 then 120 BPM. Tightest passes: A5 PLR 12.85 (0.15 under 13), A1 master −14.07 (0.23), B8 −12.71 LUFS (0.29), A2 −1.30 dBTP (0.30), S14 12 of 12 notes (0). Every BANDS octave other than 250 and 2000 Hz is at least 1.4 dB inside (500 Hz +2.6 against 4).
  - **02b: 41/42**, failing BANDS only. Video `49ed38be0862`, master `1180af167f2e5ed7`. P 6.05 (verdict), 138.843 BPM, base free. Tightest passes: B8 −12.82 (0.18), A5 12.73 (0.27), A1 master −14.01 (0.29), A2 −1.36 (0.36), S14 (0). BANDS 31.5 Hz −18.8 and 16 kHz −13.2 are 1.2 dB inside.
  - **02c: 41/42**, failing BANDS only. Video `36a3cbb84663`, master `509d924ab8dbf82a`. P 6.05, 138.843 BPM, base free. Tightest passes: B8 −12.83 (0.17), A5 12.82 (0.18), A1 master −14.09 (0.21), A2 −1.36 (0.36), S14 (0), BANDS 31.5 Hz −19.4 (0.6 above its −20 floor).
  - Every other gated check passes with at least 0.68 of margin in its own unit (02a A3 LRA 4.68 against 3-8 is the next tightest). The full lists are in each `final/verify.txt`.

**To promote:** as in the round-1 entry, with 225 checks by default after the flip. The picture folder for §11.5 is `/tmp/cond/02/<id>/final/render/`. Covers, by content, are the settled payoff frames: about 6.9-7.8 s in 02a, 6.3-7.6 s in 02b and 6.8-7.6 s in 02c.
