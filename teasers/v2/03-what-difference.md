# 03 · What difference does X make? Three teasers

**Format:** `what-difference` (rank 3 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P5**)
**Date:** 2026-10-07 (revision 2, after the verifier and hook-judge reviews; see "Review log" at the end)
**Specs:**
- [`studio/specs/03a-live-sheet-car-loan-weekly.json`](../../studio/specs/03a-live-sheet-car-loan-weekly.json) (37.2 s)
- [`studio/specs/03b-clean-sheet-card-minimum.json`](../../studio/specs/03b-clean-sheet-card-minimum.json) (30.2 s)
- [`studio/specs/03c-scoreboard-mortgage-extra-100.json`](../../studio/specs/03c-scoreboard-mortgage-extra-100.json) (29.8 s)

**Maths check:** [`checks/03-what-difference.py`](checks/03-what-difference.py). It rebuilds all three loans payment by payment from the sourced inputs, then checks every display string in the three specs against the computed, formatted value, and every number in every VO line too. It also checks:
- each shown delta equals the difference of the shown totals, and "≈"/"about" appear exactly on rounded numbers;
- the contract shape, R1 (a number in the header, and the baseline option's results already on screen at frame 1), R2, R8 and R10;
- the timing: VO at 2.6 spoken words/s, no overlaps, each later option lands within 0.9 s of the word that names it (landing = `resultT` where the kit reads one), every `lookOpts` step (lever, footer steps) sits on a beat, footer steps start after t = 0 and stay within the kit's 45-character limit;
- no spec-level `sfx` (each kit cues its own landings);
- the sensitivity claims in this file.

Result: **387 checks, 0 failures, exit 0**. Mutation test: one interest cell changed (03c "≈ $508,600" → "≈ $508,700"), one "about" removed (03b "About $7 more" → "$7 more") and the 03a lever moved off its beat (18.0 → 18.3 s) gave 4 failures and exit 1, as it should; the restored specs pass again.
**Studio linter:** `node src/cli.mjs check specs/03*.json` gives **3/3 clean, 0 errors, 0 warnings**, against the built what-difference modules of all three kits (committed in be5572c; the clean-sheet module as it stands in the working tree on 2026-10-07). Stills and 12-frame contact sheets of all three were inspected too, because the linter does not catch every render bug (it missed "[object Object]" in round 1).
**Web searches used:** round 1 used 13 of 14; the verifier used 11 more; revision 2 used 1 search and 2 page fetches (both fetches blocked by the egress proxy). The egress proxy blocks every primary page (Edmunds, the Fed, Freddie Mac, Auto Remarketing, Experian), so each figure below rests on search-result text for the named page, cross-checked by the verifier's own searches. Re-open the primary pages before publishing (see "Open items").

---

## (a) The format in 5 lines

1. **What it is.** Hold one real debt fixed and pay it 2-4 ways. Every way gets the same two outputs, a payoff time and the total interest. The question with the options named goes on screen, and the verdict goes in the caption.
2. **Breakouts (all @thedebtfreedomproject, TikTok, median 1.3K-6K views):**
   - "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" / caption "Look what a difference rounding makes!": **1,900,000 views, 902.5x**, the largest multiple in the benchmark. https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
   - "What's the difference between daily payments and one extra lump sum payment each month?" / "Yes, daily payments work!": **382,100, 289.1x**, on a $2.98 answer. https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
   - "How much difference does an extra $100 per month make on a car loan payoff?": **290,700, 127.3x**. https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
3. **Loan maths works under a minute too.** FinCalC TV's "Home Loan Part payment Reduce Tenure NOT EMI" got **578,461** in 59 s (https://www.youtube.com/shorts/7CFEV6D3QNM). The Market Hustle's red-worst-case vs cyan-relief columns, "How Long It Took To Recover After the Worst Crashes:", got **190,187 (4.5x med)** in 73 s (https://www.instagram.com/reel/DduW3hgShyh/).
4. **What kills it.** A topic label instead of a question: the same creator's "Credit Card Debt Payoff Strategies" got **90,600 (52.5x)**, her lowest (https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534). A neutral "X vs Y, which is better?" also fails: FinCalC's bucket has a median of 13,322 (n = 8). The other thing that kills it is length. Her first new number lands 30-45% of the way into 3-6 minutes. Ours: the baseline's full answer is on screen at 0.0 s, the lever the hook asks about lands at 22-34% of the runtime, and each teaser runs 30-37 s.
5. **What we add.** One line of envelope working per option, left visible as proof (her Excel formula bar, made readable). The lever is sized honestly ("biweekly = 13 payments, not 12"; "$150 − $142.59 = $7.41 more"). The headline is rounded with "≈", and the exact payments stay in the working. The verdict stays even when the answer is small ($2.98 broke out).

**Hook grammar we steal (P5).** On screen: "What difference do [A and B] really make on [one debt]?", "[A] vs [B] on [one debt]: what difference does it make?" or "How much difference does [just $X extra a month] make on [one debt]?" In the caption: a verdict that names the winning lever. We avoid topic labels and "which is better?".

---

## (b) The three teasers at a glance

| | 03a | 03b | 03c |
|---|---|---|---|
| Look | Live Sheet | Clean Sheet | Scoreboard |
| Debt | $44,000 car loan, 7%, 72 months | $5,000 card balance, 22% APR | $400,000 mortgage, 7.3%, 30 years |
| Options | Monthly · Biweekly · Weekly · Rounded up to $200 a week | The minimum · a flat $150 · a flat $250 | Just the payment · +$100 a month · +$500 a month |
| On-screen hook (t = 0) | What difference do weekly and / biweekly payments really make / on a **$44,000** car loan? | Minimum vs a flat payment / on a **$5,000** credit card: / what difference does it make? | HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE? |
| Words in hook | 14 | 15 | 14 |
| Numbers on screen at 0.0 s | $44,000 · Monthly column filled: 72 months, ≈ $10,000 | $5,000 · "The minimum" filled in coral: ≈ 15.1 years, ≈ $7,300, working "starts at $142.59, then shrinks" | $100 · hero counter ≈ $587,200 of interest in red · lane 1 "30 YEARS" · footer "$400,000 at 7.3%" |
| The lever lands | 8.0 s (biweekly), 23.0 s (rounded up) | 9.2 s working, 10.2 s results | 6.4 s cut, 8.9 s landing, 9.4 s delta |
| Verdict (screen) | Round up to **$200** a week: **≈ 1 year** sooner, **≈ $1,800** less | Just **≈ $7** more than the first minimum: **≈ 11 years** sooner | +$100 a month: **≈ $78,600** less |
| Runtime | 37.2 s | 30.2 s | 29.8 s |
| Benchmark hook it copies most closely | H48, 1.9M, 902.5x | H48 frame + H49 verdict | H50, 290.7K, 127.3x |

**Winner convention.** `winner` is the option the verdict names, not always the biggest number. In 03b the flat $250 is faster than the flat $150, but the verdict answers the tiny lever ($150 is only $7.41 above the first minimum). The $250 row is the "biggest number last" bonus, toned `good` rather than `goal`.

**Frame-1 convention.** In all three, the baseline option is already worked out at frame 1 (R1 "the full answer", R10 "shock first"), and the later options sit named but empty (R9). Each kit expresses that differently:
- Live Sheet: `option.t ≤ 0` means "pre-filled".
- Clean Sheet: `option.t` is when the working starts typing and `option.resultT` when the results land, so the minimum carries negative times (`t −3.0`, `resultT −2.4`): both results and the highlighter have settled by −1.52 s.
- Scoreboard: `option.resultT 0.0` on the first option makes its race land at frame 1, so the counter shows ≈ $587,200 at 0.0 s instead of rolling through unverified intermediate values.

---

## 03a · Live Sheet · Weekly and biweekly vs monthly on a $44,000 car loan

**Spec:** `studio/specs/03a-live-sheet-car-loan-weekly.json` · 37.2 s · captions on
**Platform title:** What Difference Do Weekly Car Payments Really Make on $44,000?
**On-screen hook (header):** What difference do weekly and / biweekly payments really make / on a **$44,000** car loan?

### Why this hook

**Modelled on:**
1. **H48, The Debt Freedom Project:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" with the caption "Look what a difference rounding makes!". **1,900,000 views, 902.5x.** We keep her grammar and her four scenarios (monthly, biweekly, weekly, weekly rounded up). We swap "paying off a car loan" for the stake, so a number sits in the hook. Weekly is named first because it is the bigger-sounding hack; monthly is the filled baseline column, so it needs no slot in the question.
2. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make" (**3,000,000, 140x**). One word ("ACTUALLY", here "really") implies the viewer's current belief is off (R5).
3. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461.** The verdict names the real lever and denies the expected one.

**Rules satisfied:**
- **R1:** $44,000 is in the header and the stake row, and the Monthly column is filled at 0.0 s (72 months, ≈ $10,000; confirmed in the render).
- **R2:** the hook has one dollar figure, the input, and no result.
- **R3 (partial):** $44,000 ≈ the average new-car loan (Edmunds Q3 2026: $44,664). It is not the viewer's own loan; the pinned comment asks for theirs, which is the sequel engine of her 290.7K reply video.
- **R4:** the input is the size of a loan car buyers have actually signed.
- **R5:** "really" casts doubt on the popular hack, and the first spoken line promises "about a year off" without saying which column earns it.
- **R6:** the stake is the amount plus 72 months; "your" goes in the caption and the pinned comment.
- **R7:** weekly and biweekly are named; the Monthly baseline and the "Rounded up" column are on the sheet from frame 1.
- **R8:** 14 words.
- **R9:** 4 columns, 3 of them empty at 0.0 s.
- **R10:** values on screen at 0.0 s; the first comparison lands at 8.0 s, after a 3.6 s promise line and the baseline read-out.
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "Weekly barely beats biweekly. Rounding up is the real trick!"

**The wrong belief it plays on:** "Weekly payments must beat biweekly by a lot. The schedule is the trick." In fact biweekly and weekly each add up to exactly **13 monthly payments a year** ($9,752.08 = 13 × $750.16), so weekly beats biweekly by only **$35.49**. The date moves when you pay more: rounding $187.54 up to $200 (+$12.46 a week) takes ≈ 1 year off. That is the myth bust Debt Freedom shows at 3:21 but never explains.

### Beat sheet

Live Sheet timing: `option.t` is when that column's first value lands; just before it the selection springs onto the column and the formula bar retypes its working. The second value lands 0.42 s later.

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Yellow banner (the hook). Formula bar mid-typing "= $375.08 × 26 =" (Biweekly's working; it finishes "= $9,752.08 a year" by about 0.5 s). Stake row "New-car loan / **$44,000**", "7% APR / 72 months". Column headers: Monthly $750.16 a month · Biweekly $375.08 every 2 wks · Weekly $187.54 a week · Rounded up $200 a week. **Monthly column filled:** 72 months · ≈ $10,000. Selection on Biweekly's "Paid off in" cell. Footer "ASSUMES daily interest, posted when paid" | "About a year off this loan. Guess which one." |
| 3.8 | (hold) | "Monthly: 72 months, about $10,000 in interest." |
| 8.0 | Biweekly fills: ≈ 65 months, then ≈ $8,900 (8.4) | "Biweekly: about 65 months, about $1,100 less." |
| ≈ 12.5-13.4 | Selection springs to Weekly; bar retypes "= $187.54 × 52 = $9,752.08 a year"; Weekly fills ≈ 65 months (13.0), ≈ $8,900 (13.4): the same cells as Biweekly | "Weekly: about 65 months too. Only about $35 better." (13.0) |
| 18.0 | Lever: the bar retypes "= 13 × $750.16 = $9,752.08: 13 payments, not 12" (the ≈ chip pops) | "Both add up to 13 monthly payments a year, not 12." |
| ≈ 22-23.4 | Selection to "Rounded up"; bar "= $187.54 + $12.46 = $200 a week"; the column fills ≈ 60 months (23.0), **≈ $8,200** (23.4) | "Now round each weekly payment up to $200." (22.6) |
| 26.8 | (hold) | "About 60 months. About $1,800 less." |
| 31.0 | Winner: the selection springs onto the Rounded-up column and it wipes yellow top to bottom. Verdict card in the caption band: "Round up to **$200** a week: / **≈ 1 year** sooner, **≈ $1,800** less". Ding (kit cue) | "About $12 more a week. About a year sooner." |
| 35.0-37.2 | Full table holds (2.2 s); the last 0.5 s clears back to frame 1 for the loop | (none) |

### Guide VO script (66 written words, 84 spoken with numbers read out: ≈ 32 s of speech at 2.6 words/s, spread over 0.0-35.0 s)

> About a year off this loan. Guess which one.
> Monthly: 72 months, about $10,000 in interest.
> Biweekly: about 65 months, about $1,100 less.
> Weekly: about 65 months too. Only about $35 better.
> Both add up to 13 monthly payments a year, not 12.
> Now round each weekly payment up to $200.
> About 60 months. About $1,800 less.
> About $12 more a week. About a year sooner.

### The maths

Model: simple interest charged daily (APR ÷ 365 per day), rounded to the cent each period. Each payment is applied the day it is paid. A month is 365/12 days, so a monthly period charges exactly 7%/12. The schedule runs payment by payment until the balance is $0, and the last payment is whatever is left.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $44,000, 7% APR, 72 months | Inputs (sources below) | |
| $750.16 a month | 44,000 × (0.07/12) ÷ (1 − (1 + 0.07/12)^−72) = 750.156… | $750.16 |
| 72 months, ≈ $10,000 | Monthly schedule: 72 payments; interest $10,011.20. Working shortcut 750.16 × 72 − 44,000 = $10,011.52 | ≈ $10,000 |
| $375.08 every 2 wks | 750.16 ÷ 2 | $375.08 |
| ≈ 65 months, ≈ $8,900; VO "about $1,100 less" | 142 payments × 14 days = 1,988 days ÷ (365/12) = 65.36 months; interest $8,916.74; 10,011.20 − 8,916.74 = $1,094.46 | ≈ 65 · ≈ $8,900 · ≈ $1,100 |
| $187.54 a week | 750.16 ÷ 4 = 187.54 | $187.54 |
| ≈ 65 months, ≈ $8,900 | 282 × 7 = 1,974 days = 64.90 months; interest $8,881.25 (saves $1,129.95) | ≈ 65 · ≈ $8,900 |
| VO "only about $35 better" | 8,916.74 − 8,881.25 = $35.49 | ≈ $35 |
| $9,752.08 a year (×2), 13 × $750.16 (lever) | 375.08 × 26 = 187.54 × 52 = 13 × 750.16 = 9,752.08 | exact |
| $200 a week: $187.54 + $12.46 | 200 − 187.54 = 12.46 (VO "about $12 more a week") | exact |
| ≈ 60 months, ≈ $8,200; VO + verdict "≈ $1,800 less" | 261 × 7 = 1,827 days = 60.07 months; interest $8,184.40; saves $1,826.80 | ≈ 60 · ≈ $8,200 · ≈ $1,800 |
| ≈ 1 year sooner (VO line 1, VO line 8, verdict) | (72 − 60.07) ÷ 12 = 0.99 | ≈ 1 |
| Rounding up in monthly terms (write-up only) | (200 × 52 − 9,752.08) ÷ 12 = 53.99 | ≈ $54 more a month |
| Shown-difference consistency | VO $1,100 = shown 10,000 − 8,900; VO and verdict $1,800 = shown 10,000 − 8,200 | matches |

**Sensitivity (write-up only; the rates are what-ifs, not sourced):**

| Case | Payment | Monthly | Biweekly | Weekly | Rounded up to $200 | Weekly beats biweekly by | Rounding: years sooner |
|---|---|---|---|---|---|---|---|
| $44,000 at 6% | $729.21 | 72 mo, ≈ $8,500 | 65.36 mo, ≈ $7,600 | 65.13 mo, ≈ $7,600 | 58.45 mo, ≈ $6,800 | $29.39 | 1.13 |
| $44,000 at 8% | $771.46 | 73 mo (a small last payment), ≈ $11,500 | 64.90 mo, ≈ $10,200 | 64.90 mo, ≈ $10,200 | 61.91 mo, ≈ $9,700 | $41.89 | 0.92 |
| $44,664 at 7% (Edmunds' exact average) | $761.48 | 72 mo, ≈ $10,200 | 65.36 mo, ≈ $9,100 | 64.90 mo, ≈ $9,000 | 61.22 mo, ≈ $8,500 | $35.91 | 0.90 |

In every case weekly beats biweekly by under $50 and rounding up takes about a year off, so the verdict holds.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| New-car loan size | $44,000: a round loan just under both 2026 quarterly averages. It is **not** their rounding ($44,664 rounds to $45,000), so the screen says "New-car loan", not "Avg", and the caption says "≈ the average" | **Edmunds**, Q3 2026 new-vehicle finance data, reported by Auto Remarketing, "Edmunds spots 6 new records as average amounts financed, payments & terms keep growing in Q3" (Oct 2026): avg amount financed **$44,664**, avg APR **7.0%**, avg payment **$787**, avg term "past 70 months", 84-month-plus loans **25.5%**. https://www.autoremarketing.com/?p=131431 · also Briefglance, https://briefglance.com/companies/edmunds-com-inc/pulses/84146 (confirmed again by the verifier's searches) | **Edmunds**, Q2 2026: **$44,156** at **7.0%** (AP via Santa Maria Times, https://santamariatimes.com/ap/business/nearly-1-in-4-new-vehicle-buyers-in-q2-stretched-loans-to-84-months-or/article_5832a407-bcfa-54a3-9664-dc9063d99ef4.html; confirmed by the verifier) |
| APR | 7% | Edmunds Q3 2026: 7.0% (above) | Edmunds Q2 2026: 7.0% (above) |
| Term | 72 months | Edmunds Q3 2026: average term "past 70 months"; 25.5% of new loans run 84 months or more, so 72 is a standard term just above the average | (none: round 1's Experian figures were dropped, see the Review log) |
| Daily simple interest on car loans; biweekly mechanics | Model assumption | Debt Freedom's own sheet uses `=(0.0424/365)*B10*D10` (watch study, section 3.4) | Printed in the footer as an assumption |

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES daily interest, posted when paid". 7% APR and 72 months are on the stake row; the caption spells the posting assumption out in full.

### Caption / description (verdict first, R11)

> Weekly barely beats biweekly. Rounding up is the real trick!
> Weekly beats biweekly by about $35: both add up to 13 monthly payments a year instead of 12. Rounding the weekly payment up to $200 (about $12 more a week) pays off your car about a year sooner and saves about $1,800 of interest on a $44,000 loan.
> $44,000 at 7% APR over 72 months ≈ the average new-car loan (Edmunds Q3 2026: $44,664 at 7.0%). Simple interest charged daily; assumes each payment is applied the day it lands. Educational math only.
> #carloan #debtpayoff #biweekly #micropayments #mathtok

### Pinned comment

> Does your lender apply a weekly payment the day it lands, or hold it until the due date? That decides whether any of this works. Drop your loan amount, APR and months and we'll run your column next.

The first sentence starts the argument vidIQ predicted for H48's comments. The second sets up a comment-reply sequel (H50's 127.3x was one).

### Per-platform notes

- **TikTok.** Caption line 1 is the verdict, with no numbers. Keep #micropayments: 4 of Debt Freedom's 5 breakouts carried it. Answer the best "now do mine" comment with the native reply sticker, on the same $44,000 running case (her $58,593.13 Jeep loan carried both the 1.9M video and the 290.7K reply).
- **Instagram Reels.** Make the cover the finished table at about 33 s (all four columns filled, the winner washed yellow). Gage's one A/B favoured a finished-table cover. No comment-keyword CTA: in the benchmark it lifts comments, not views.
- **YouTube Shorts.** Use the platform title above. Let the loop run: the columns clear back to the frame-1 state at 37.2 s.

---

## 03b · Clean Sheet · Minimum vs a flat payment on a $5,000 credit card

**Spec:** `studio/specs/03b-clean-sheet-card-minimum.json` · 30.2 s · captions on
**Platform title:** Minimum vs a Flat Payment on a $5,000 Card: What Difference Does It Make?
**On-screen hook (header):** Minimum vs a flat payment / on a **$5,000** credit card: / what difference does it make?

### Why this hook

**Modelled on:**
1. **H48, The Debt Freedom Project:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?", **1,900,000, 902.5x.** The "what difference does it make?" frame, with both options named.
2. **H49, same channel:** "What's the difference between daily payments and one extra lump sum payment each month?" with the caption "Yes, daily payments work!", **382,100, 289.1x.** A small lever, an A-vs-B question and a verdict caption.
3. **H50, same channel:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** One dollar figure in the question; here it is the stake the viewer maps their own balance onto.

**Designed against:** H52, "Credit Card Debt Payoff Strategies", a topic label (**90,600**, her weakest, on the same subject). Our credit-card hook is a question that names the options.

**Rules satisfied:**
- **R1:** $5,000 is in the header and the stake row, and "The minimum" is already worked out at frame 1: ≈ 15.1 years and ≈ $7,300 in coral, under its working "starts at $142.59, then shrinks".
- **R2:** one dollar figure in the hook (the input).
- **R3 (partial):** a card balance and a minimum payment are numbers almost every viewer has; $5,000 is a round balance to map theirs onto. The pinned comment asks for their card's formula.
- **R4:** $5,000 is round; $150 is small and round.
- **R5:** the frame shows $142.59 against "A flat $150", which implies the wrong belief: "a few dollars more can't matter".
- **R6:** $5,000 at 22%, with the horizon as the payoff.
- **R7:** the minimum vs a flat payment is named, and both flat amounts sit on the sheet from frame 1.
- **R8:** 15 words.
- **R9:** 3 numbered steps, 2 of them empty.
- **R10:** biggest number first (≈ 15.1 years at frame 1); the $150 lever lands at 10.2 s.
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "≈ $7 more at first, ≈ 11 years sooner."

**The wrong belief it plays on:** "The minimum payment is the bank's plan to clear my balance, and paying a little more barely changes anything." The minimum is 1% of the balance plus the interest, so it shrinks as the balance shrinks. On $5,000 at 22% it takes **≈ 15 years** and **≈ $7,300** of interest, more than the $5,000 owed. A flat $150 is only **$7.41** above the first minimum ($142.59), and it clears the card in **≈ 4.3 years**.

### Beat sheet

Clean Sheet timing: `option.t` is when the option's circle fills and its working starts typing; `option.resultT` pins when its first result lands (the second lands 0.5 s later, and the delta 0.6 s after that).

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page: title (the hook, 3 lines), with the assumption footer under it (captions are on, so the footer moves up). Stake "Credit card balance **$5,000**" (its terms are hidden because the footer states them). Column heads "Paid off in" / "Interest". **① The minimum, already worked out:** working "starts at $142.59, then shrinks", coral "≈ 15.1 years" and "≈ $7,300". ② A flat $150 and ③ A flat $250 are named over empty dashed slots | "Only the minimum on $5,000? About 15 years." |
| 4.2 | (hold) | "About $7,300 in interest. More than you owed." |
| 9.2 | ② circle fills; working types "$150 − $142.59 = $7.41 more" | "Now a flat $150." |
| 10.2 | ② results: "≈ 4.3 years" (10.2), "≈ $2,800" (10.7); delta "≈ 11 years sooner" (11.3). ① rests (lighter boxes) | (same line, on "flat") |
| 12.2 | (the $7.41 working stays on the sheet) | "About $7 more, at first." |
| 14.8 | (hold) | "About 4.3 years. About $2,800 in interest." |
| 20.2 | ③ working types "$250 − $142.59 = $107.41 more"; results "≈ 2.2 years" (20.8), "≈ $1,300" (21.3); delta "≈ 13 years sooner" (21.9) | "A flat $250: about 2.2 years." |
| 24.8 | Verdict in the caption band: "Just **≈ $7** more than the first minimum: / **≈ 11 years** sooner". At 25.1 ② re-wipes on the blue final-answer highlighter, every other box rests, the pointer lands by ②'s delta; ding (kit cue) | "The minimum shrinks. Your payment doesn't have to." |
| 28.0-30.2 | Finished sheet holds 2.2 s, then the results clear; the loop restarts on frame 1 (① filled) | (none) |

### Guide VO script (46 written words, 67 spoken: ≈ 26 s of speech, spread over 0.0-28.0 s)

> Only the minimum on $5,000? About 15 years.
> About $7,300 in interest. More than you owed.
> Now a flat $150.
> About $7 more, at first.
> About 4.3 years. About $2,800 in interest.
> A flat $250: about 2.2 years.
> The minimum shrinks. Your payment doesn't have to.

### The maths

Model: interest billed monthly at 22%/12 on the balance, rounded to the cent, with no new charges. Minimum (Chase cardmember agreement formula): the larger of $40, or 1% of the new balance plus the interest billed. When the new balance is under $40, the minimum is the whole balance.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $5,000, 22% APR | Inputs (sources below) | |
| starts at $142.59 | interest 5,000 × 0.22/12 = $91.67; new balance $5,091.67; 1% = $50.92; 50.92 + 91.67 | $142.59 |
| ≈ 15.1 years (VO "about 15") | Minimum schedule: 181 payments ÷ 12 | 15.08 |
| ≈ $7,300 (VO "more than you owed") | Sum of interest on the minimum schedule $7,340.79 (> $5,000) | ≈ $7,300 |
| $150 − $142.59 = $7.41 more (VO "about $7") | | $7.41 |
| ≈ 4.3 years, ≈ $2,800 | Flat $150: 52 payments; interest $2,798.09 | 4.33 → ≈ 4.3 · ≈ $2,800 |
| ≈ 11 years sooner | (181 − 52) ÷ 12 = 10.75; shown 15.1 − 4.3 = 10.8 | ≈ 11 |
| $250 − $142.59 = $107.41 more | | $107.41 |
| ≈ 2.2 years, ≈ $1,300 | Flat $250: 26 payments; interest $1,285.71 | 2.17 → ≈ 2.2 · ≈ $1,300 |
| ≈ 13 years sooner | (181 − 26) ÷ 12 = 12.92; shown 15.1 − 2.2 = 12.9 | ≈ 13 |
| Caption "about $4,500 less interest" | 7,340.79 − 2,798.09 = 4,542.70; shown 7,300 − 2,800 = 4,500 | ≈ $4,500 |
| Pinned: hold the first minimum flat | flat $142.59: 57 payments, interest $3,081.74 | 57 months, ≈ $3,100 |

**Sensitivity (write-up only):**
- At the Fed's exact **22.15%**: the minimum takes 15.2 years and ≈ $7,400 (first minimum $143.21); $150 takes 4.4 years and ≈ $2,800; $250 takes 2.2 years and ≈ $1,300.
- At Bankrate's **19.56%** (the average for new-card offers): the minimum takes 14.8 years and ≈ $6,500 (first minimum $132.32); $150 takes 4.1 years and ≈ $2,300; $250 takes 2.1 years and ≈ $1,100.
- The "≥ 10 years sooner" verdict holds at both rates.
- **Formulas vary by issuer.** Capital One-style cards use a $25 floor; some cards use 2-3% of the balance. A 2%-of-balance minimum with no "+ interest" term would take far longer, so the Chase formula is the gentle case. That is why the footer names the formula.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| Card APR | 22% (rounded from 22.15%) | **Federal Reserve, G.19 Consumer Credit**, release of Aug 7, 2026 (Q2 2026): commercial-bank interest rate on credit card plans, **accounts assessed interest 22.15%** (Q1 2026: 21.52%). https://www.federalreserve.gov/releases/g19/20260807/ · series TERMCBCCINTNS on FRED, https://fred.stlouisfed.org/graph/?g=1hhyS · as summarised by Walnut, https://walnutinvest.com/stats/interest-rate-statistics (confirmed by the verifier) | **Bankrate** weekly average credit card rate **19.56%** (Aug 12, 2026), syndicated at https://www.azfamily.com/bankrate-article/2026/08/12/current-credit-card-interest-rates/ (confirmed by the verifier). It measures new-card offers, not balances that pay interest, so it is the low sensitivity case. The Fed's "all accounts" rate, 20.94% (May 2026), sits between the two |
| Minimum-payment formula | the larger of $40, or 1% of the new balance + interest | **Chase cardmember agreement** (COL00040): "(3) the larger of: (a) $40 (or total amount you owe if less than $40); or (b) the sum of: (i) 1% of the new balance … PLUS (ii) any periodic interest charges and late fees". https://www.chase.com/content/feed/public/creditcards/cma/Chase/COL00040.pdf (confirmed by the verifier) | The same agreement filed in the **CFPB** credit card agreement database: https://files.consumerfinance.gov/a/assets/credit-card-agreements/pdf/QCCA4Q2023/JPMORGAN_CHASE_BANK_NATIONAL_ASSOCIATION/COL00040-271320.pdf. **U.S. Bank** explainer (minimums are 1-3% or a flat amount plus interest, and vary by issuer): https://www.usbank.com/credit-cards/credit-card-insider/credit-card-basics/credit-card-minimum-payment.html |
| $5,000 balance | Round example | (not a sourced average; framed as "a $5,000 credit card") | |

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES 22% APR, no new charges · minimum = 1% of balance + interest, $40 floor"

### Caption / description

> Never let your minimum shrink!
> The minimum is 1% of the balance plus interest, so it shrinks as you pay: about 15 years and about $7,300 of interest on $5,000, more than the debt itself. A flat $150, just $7.41 above the first minimum, clears it in about 4.3 years with about $4,500 less interest.
> 22% ≈ the Fed's Q2 2026 average for cards that charge interest (22.15%). Minimum formula from a big-bank cardmember agreement: 1% of the balance + interest, $40 floor. Yours is in your agreement under "Minimum Payment". Educational math only.
> #creditcarddebt #debtpayoff #minimumpayment #mathtok

### Pinned comment

> Wild part: even holding the payment at the FIRST minimum ($142.59) and never letting it shrink clears it in 57 months, not 181. What formula does your card use: 1%, 2% or 3%?

### Per-platform notes

- **TikTok.** Verdict in caption line 1, in the grammar of "Yes, daily payments work!". The likely comment fight is "nobody's minimum is 1%", so the pinned comment invites people to post their formula, which is cheap sequel material: "now do 2%".
- **Instagram Reels.** Cover: the finished sheet at about 26 s, with the blue "≈ 4.3 years" box under the coral "≈ 15.1 years". Save-bait is the worked sheet itself, so no keyword CTA.
- **YouTube Shorts.** Use the title above. The first 9.2 s hold one frame (the worked minimum) while two VO lines play. If retention dips there, cut "More than you owed." (1.6 s) and pull every later beat 1.6 s earlier (spec re-timing plus a re-run of the check).

---

## 03c · Scoreboard · Just $100 extra a month on a 30-year mortgage

**Spec:** `studio/specs/03c-scoreboard-mortgage-extra-100.json` · 29.8 s · captions on
**Platform title:** How Much Difference Does Just $100 Extra a Month Make on a Mortgage?
**On-screen hook (header):** HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE?

### Why this hook

**Modelled on:**
1. **H50, The Debt Freedom Project:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** We take the grammar word for word and swap the debt. "JUST" is the one-word R5 cue that $100 is too small to matter.
2. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461** (59 s). Home-loan prepayment maths travels at Shorts length.
3. **H71, The Market Hustle:** "How Long It Took To Recover After the Worst Crashes:", **190,187 (4.5x med).** Open in the red: his "25 YEARS" in red is on screen at 0.0 s. Our counter reads **≈ $587,200** of interest in red at 0.0 s.

**Rules satisfied:**
- **R1:** $100 is in the header; at 0.0 s the counter reads ≈ $587,200 in red, lane 1 is a full red bar labelled "30 YEARS", and the footer reads "$400,000 at 7.3%".
- **R2:** one dollar figure in the hook; the result is hidden.
- **R3 (partial):** an extra $100 is a sum anyone can test against their own payment; the $400,000 at 7.3% is ours. The pinned comment asks for their numbers.
- **R4:** $100 is small and round.
- **R5:** "JUST $100" voices the belief "$100 is a rounding error on a $400,000 loan".
- **R6:** a 30-year mortgage, with the $400,000 at 7.3% in the footer from 0.0 s.
- **R7:** the lever is named, and the $500 lane is on the board.
- **R8:** 14 words.
- **R9:** 3 lanes, 2 of them showing "?".
- **R10:** a shock number at 0.0 s; the +$100 answer lands at 8.9 s and its delta at 9.4 s; the biggest saving comes last.
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "+$100 a month: ≈ $78,600 less."

**The wrong belief it plays on:** "$100 a month can't matter on a $400,000 loan." It saves **≈ $78,600** of interest and **40 months**. That is $31,900 put in, about $2.46 of interest saved per extra dollar. The baseline shock goes first: the interest alone (**≈ $587,200**) is more than the loan.

### Beat sheet

Scoreboard timing: `option.t` is the hard cut that names the option; its bar starts racing 0.35 s later, at one shared speed (the longest bar takes 2.4 s), and the delta slams in 0.55 s after the race lands. The first option carries `resultT 0.0`, so its race has already landed at frame 1.

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Top bar: header (the hook). Hero counter "INTEREST **≈ $587,200**" in red. Footer "$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)". Board: JUST THE PAYMENT · ≈ $587,200 · full red bar "30 YEARS"; +$100 A MONTH "?"; +$500 A MONTH "?". Label stack "$2,742.29 a month / JUST THE PAYMENT" | "Interest alone: about $587,200." |
| 4.6 | Footer rewrites to "$2,742.29 × 360 − $400,000 ≈ $587,200" | "More than the loan." |
| 6.4 | Hard cut: label "$2,842.29 a month / +$100 A MONTH", lane 2 lights; footer "$2,742.29 + $100 = $2,842.29 a month". 6.75-8.9 the bar races and the hero rolls to **≈ $508,600** in green; lane 2 lands at "≈ 26.7 YEARS" | "Add just $100 a month." |
| 9.4 | The delta slams into the label stack: **≈ $78,600 LESS** | "40 months sooner. About $78,600 less interest." |
| 14.4 | Hard cut: "+$500 A MONTH"; footer "$2,742.29 + $500 = $3,242.29 a month". 14.75-16.3 race to **≈ $342,200**, "≈ 19.1 YEARS"; 16.8 "≈ $245,000 LESS" | "Add $500 a month." |
| 17.0 | (hold on lane 3) | "About 11 years sooner. About $245,000 less." |
| 22.0 | Verdict replaces the label stack: "+$100 A MONTH: **≈ $78,600** LESS". The hero cuts to ≈ $508,600, lane 2 glows neon, the others dim. Footer "≈ $78,600 ÷ ($100 × 319) ≈ $2.46". Cash (kit cue) | "Each dollar of that $100 saves about $2.46." |
| 27.6-29.8 | Hold 2.2 s, then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (39 written words, 66 spoken: ≈ 25 s of speech, spread over 0.0-27.6 s)

> Interest alone: about $587,200.
> More than the loan.
> Add just $100 a month.
> 40 months sooner. About $78,600 less interest.
> Add $500 a month.
> About 11 years sooner. About $245,000 less.
> Each dollar of that $100 saves about $2.46.

### The maths

Model: standard monthly amortisation at 7.3%/12, with interest rounded to the cent. The scheduled payment is rounded up to the cent, so 360 payments clear the loan. Every extra dollar goes to principal the month it is paid. Taxes, insurance and PMI are excluded.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $400,000, 7.3%, 30 years | Inputs (sources below) | |
| $2,742.29 a month | 400,000 × (0.073/12) ÷ (1 − (1 + 0.073/12)^−360) = 2,742.2837, rounded up | $2,742.29 |
| 30 years, ≈ $587,200 (VO "more than the loan") | 360 payments; interest $587,216.16 (> $400,000). Footer working 2,742.29 × 360 − 400,000 = $587,224.40 | ≈ $587,200 |
| $2,842.29 / $3,242.29 a month | 2,742.29 + 100; 2,742.29 + 500 | exact |
| ≈ 26.7 years, ≈ $508,600 | +$100: 320 payments ÷ 12 = 26.67; interest $508,590.78 | ≈ 26.7 · ≈ $508,600 |
| VO "40 months sooner" | 360 − 320 | 40 |
| ≈ $78,600 less | 587,216.16 − 508,590.78 = 78,625.38; shown 587,200 − 508,600 = 78,600 | ≈ $78,600 |
| ≈ 19.1 years, ≈ $342,200 | +$500: 229 payments = 19.08 years; interest $342,178.64 | ≈ 19.1 · ≈ $342,200 |
| ≈ $245,000 less; VO "about 11 years sooner" | 587,216.16 − 342,178.64 = 245,037.52; (360 − 229) ÷ 12 = 10.92 | ≈ $245,000 · ≈ 11 |
| $100 × 319 | The full $100 goes in for 319 months ($31,900); the 320th payment is the smaller remainder | exact |
| ≈ $78,600 ÷ ($100 × 319) ≈ $2.46 (VO "about $2.46") | 78,600 ÷ 31,900 = 2.464; exact 78,625.38 ÷ 31,900 = 2.4647 | ≈ $2.46 |

**Sensitivity (write-up only):** at Freddie Mac's exact **7.28%** the payment is $2,736.85. Interest comes to ≈ $585,300 with no extra, ≈ $507,000 with +$100 (still 320 months, so 40 months sooner; ≈ $78,200 saved) and ≈ $341,300 with +$500 (230 months). The "+$100 saves more than $75,000" verdict holds.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| 30-year fixed rate | 7.3% (shown as "≈ Freddie Mac 7.28%") | **Freddie Mac** Primary Mortgage Market Survey, Oct 1, 2026: 30-yr fixed averaged **7.28%** (7.03% the week before, 6.34% a year earlier; 15-yr 6.60%). Freddie Mac release "Mortgage Rates Increase" (GlobeNewswire via StreetInsider), https://www.streetinsider.com/Globe+Newswire/Mortgage+Rates+Increase/25411462.html · Trading Economics, "US Mortgage Rates Climb Further in October", https://tradingeconomics.com/united-states/30-year-mortgage-rate/news/588887 · FRED series MORTGAGE30US, https://fred.stlouisfed.org/graph/?g=n5kM (confirmed by the verifier) | **Mortgage Bankers Association** Weekly Mortgage Applications Survey, week ending Sep 25, 2026 (released Sep 30): average contract rate, 30-yr fixed conforming, **7.30%** (from 7.12%), "highest since November 2023" (confirmed by the verifier). Reported by JM Financial Services market news, https://www.jmfinancialservices.in/market-news-and-insights/1734750 (the search returned three of its pages, IDs 1729262, 1733675 and 1734750; which one holds this item is not confirmed) |
| Loan size | $400,000 (round example) | **NAR** Existing-Home Sales, August 2026: median existing-home price **$429,100** (+1.6% y/y), so $400,000 is that price with about 7% down. https://www.nar.realtor/newsroom/nar-existing-home-sales-report-shows-2-0-decrease-in-august (confirmed by the verifier) | Mortgage News Daily on the same release: https://www.mortgagenewsdaily.com/news/09112026-existing-home-sales-nar-inventory-prices-appr |

### Assumptions (footer, on screen from 0.0 s to 4.6 s)

"$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)". The Scoreboard footer is one line of about 45 characters, and from 4.6 s it carries the working instead (`lookOpts.footerSteps`). The loan size goes here because, with the counter opening on the interest, the kit shows the stake nowhere else. "Extra goes to principal", the date's year, and "no taxes or insurance" go in the caption.

### Caption / description

> Yes, just $100 a month really makes a difference!
> About $78,600 less interest and 40 months sooner on a $400,000, 30-year loan at 7.3%. $500 a month: about 11 years sooner and about $245,000 less.
> 7.3% ≈ the Freddie Mac average for the week of Oct 1, 2026 (7.28%); MBA had 7.30%. Assumes a fixed rate and that every extra dollar is applied to principal; taxes, insurance and PMI not included. Educational math only.
> #mortgage #homeloan #debtfree #mathtok

### Pinned comment

> Extra payments only shorten the loan if the servicer applies them to principal. Some apply them to next month's payment instead. Drop your balance, rate and extra amount and we'll put your row on the board.

### Per-platform notes

- **TikTok.** The red counter at 0.0 s is the scroll-stop, so keep the first 0.5 s free of any intro. Put the verdict in caption line 1. Run the comment-reply sequel ("now do $50", "now do 6%") on the same $400,000 board.
- **Instagram Reels.** Cover: the verdict frame (+$100 · ≈ $78,600 less) over the three lanes, at about 24 s. Comments will argue about investing the $100 instead. Leave that argument alone (no advice); a later P4 duel can answer it with maths.
- **YouTube Shorts.** Use the title above. HD Guy-style diegetic sound only (the kit's thud, roll, ding, pop and cash; no music bed). Hard-cut loop at 29.8 s back to the red counter.

---

## Open items

1. **Primary pages were not opened.** The egress proxy blocked every page fetch (edmunds.com, federalreserve.gov, autoremarketing.com, experian.com, santamariatimes.com and others). Each figure on screen was cross-checked by the verifier's independent searches:
   - Edmunds Q3 2026 ($44,664, 7.0%) and Q2 2026 ($44,156) for the car loan;
   - the Fed (22.15%) and Bankrate (19.56%) for the card APR, and the Chase formula;
   - Freddie Mac (7.28%) and MBA (7.30%) for the mortgage rate, and NAR ($429,100) for the loan size.

   Before publishing, read these four primary pages: the Fed's G.19 for Aug 7, 2026; Freddie Mac's PMMS for Oct 1, 2026; Edmunds' Q3 2026 release; and the Chase agreement PDF.
2. **The MBA citation's exact page** (one of three JM Financial pages) is unconfirmed. Freddie Mac's 7.28% is the figure on screen.
3. **Kit behaviour the specs work around (for the kit builders, not fixed here):**
   - **Scoreboard:** while a race rolls, the hero odometer and the lane label show intermediate values with the brand's "≈" ("≈ $264,790", "≈ 17.2 YEARS"). Only the landed values are verified figures. 03c avoids this at frame 1 (`resultT 0.0`), but the +$100 and +$500 races still roll with "≈" for about 2 s each.
   - **Live Sheet:** a pre-filled baseline column's working (`lookOpts.formulas[0]`) is never typed into the formula bar, so 03a's "= $750.16 × 72 − $44,000 ≈ $10,000" exists only in the spec and in this file. Frame 1's bar shows Biweekly's working instead.
   - **Clean Sheet:** with the 3-line hook there is no room for a `check` line or a typed `note`. Adding the verifier's note under the minimum pushed the layout into swap mode, which erases every working line, so 03b carries its proof in the option workings instead (see the Review log).
4. **03b depends on the clean-sheet module now in the working tree.** The clean-sheet fixer's uncommitted edits to `looks/clean-sheet/formats/what-difference.js` include hiding stake terms the footer already states and a new layout search. With them, 03b lays out in split mode and every working line stays on the sheet. Linted against the committed module (be5572c) in a clean export, 03b is still 0 errors and 0 warnings, but it falls back to swap mode, so "starts at $142.59, then shrinks" and "$150 − $142.59 = $7.41 more" are erased once each option's results land. Once the fixer's what-difference changes are committed, re-run `node src/cli.mjs check specs/03b-clean-sheet-card-minimum.json` and check stills at 0, 12 and 26 s. 03a and 03c lint clean against both versions.
5. **Renders:** the specs pass the linter and were inspected as stills and 12-frame contact sheets; full MP4s have not been rendered for this revision.

---

## Review log

Revision 2, 2026-10-07. Each review issue, and what was done.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 03a | must | `lookOpts.formulaBar` is not read by the live-sheet module; the 13-payments proof never renders | Replaced with `lookOpts.formulas` (one working per option) and `lookOpts.lever` `{t: 18.0, text: "= 13 × $750.16 = $9,752.08: 13 payments, not 12"}`, as the verifier proposed. The "≈ $648 more" line is dropped; "$187.54 + $12.46 = $200 a week" is the Rounded-up working. The render shows the lever line in the bar at 18.0-22 s. |
| V2 | 03a | must | 63 lint errors: footer past y 1480, captions hidden behind the card, deltas overlapping | Applied the verifier's fix (name "Rounded up"; details "$750.16 a month", "$375.08 every 2 wks", "$187.54 a week", "$200 a week"; the three `delta` fields deleted). I went one step further on the footer: the verifier's two-line footer still had its second line half-covered by the verdict card from 31 s in my render (the linter does not flag it), so it is now one line, "ASSUMES daily interest, posted when paid" (7% and 72 months are on the stake row; the caption spells the assumption out). Lint: 0 errors, 0 warnings; captions visible in every still. |
| V3 | 03a | must | "Avg new-car loan" over $44,000 presents a rounded figure as the average; Experian unverified | `stake.label` is now "New-car loan". The md's R3 says "$44,000 ≈ the average new-car loan (Edmunds Q3 2026: $44,664)", and the sources table says outright that $44,000 is not the average's rounding. I searched for Experian Q2 2026 once: the result text gave different figures ($41,983 and $749) and both Experian pages were blocked, so neither set is usable. Experian is gone from the md and the check; source 2 is now Edmunds Q2 2026 ($44,156, confirmed by the verifier). The Experian 6.35% sensitivity is replaced by what-ifs at 6% and 8% and by Edmunds' exact $44,664; the verdict holds in all three. |
| V4 | 03b | must | `lookOpts.check` object rendered "check: [object Object]"; badge and formulas ignored | `lookOpts` is removed entirely (badge, formulas, check). I tried the verifier's short check line first: with the new 3-line hook, the layout engine keeps the workings and drops the check (it ranks the working above the check), so the $7.41 still never appeared. The proof now lives in the working lines, which stay on the sheet once typed: ② "$150 − $142.59 = $7.41 more" (from 9.2 s) and ③ "$250 − $142.59 = $107.41 more". ①'s working "starts at $142.59, then shrinks" is on screen from frame 1. |
| V5 | 03c | must | `footerSteps[0]` at t 0.0 hides the footer; "Freddie Mac" 7.3% without ≈ | The footer is visible from 0.0 to 4.6 s and reads "$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)" (45 characters). The loan size is added because the scoreboard shows the stake nowhere else once the counter opens on the interest. The first step moves to 4.6 s, on "More than the loan.". The check now asserts that every footer step starts after t = 0. |
| V6 | 03c | must | `footerSteps[3]` was 68 characters, clipped, with type under the floor | Replaced with "≈ $78,600 ÷ ($100 × 319) ≈ $2.46" (32 characters). The check asserts ≤ 45 characters per step and that the shown ratio rounds like the exact one (2.464 and 2.4647). |
| V7 | all | must | Stale "linter 3/3 clean; modules are stubs" claim | `node src/cli.mjs check specs/03*.json` gives 3/3 clean against the built modules. Stills and contact sheets were inspected. The md header and Open items are rewritten, and the maths check was re-run after every string change (387 checks, 0 failures). |
| V8 | 03b | should | `option.t` is typing start, so results landed about 1.45 s late and the spec pops were off the beat | Every 03b option now pins `resultT`: ① lands before frame 1 (t −3.0, resultT −2.4), ② at 10.2 s (the VO word "flat" is at 10.0), ③ at 20.8 s ("flat" at 20.6). The check measures Clean Sheet landings by `resultT` and asserts that the working types first. |
| V9 | 03a, 03b, 03c | should | Spec-level sfx double the kits' own cues | All three `sfx` arrays are deleted; the check asserts there are none. |
| V10 | 03b | should | The "≈ $143" working was erased in swap layout while the VO still referred to it | The VO line "It starts at about $143 and shrinks." is cut. With the working-tree clean-sheet module the layout now stays in split mode, so "starts at $142.59, then shrinks" stays visible all video (the committed module still falls back to swap; see Open item 4). I tested the verifier's alternative, a typed `note` under the minimum: the extra line pushed the layout into swap mode, which erased every working line, including the $7.41, so it was rejected. |
| V11 | 03b, 03c | should | The lever the hook asks about lands late (03b at 50%, 03c at about 40%) | 03b: "More than the $5,000 you owed." becomes "More than you owed." and moves into line 2. The "$143" line is cut. The $150 working types at 9.2 s (30%), with results at 10.2 s, against 18.0 s and about 19.2 s before. Runtime is 38.0 → 30.2 s. 03c: the stake recital is cut; the +$100 cut comes at 6.4 s (22%), it lands at 8.9 s and its delta at 9.4 s, against 11.1 s and 13.8 s before. Runtime is 34.3 → 29.8 s. The rest of the verifier's 03b re-timing text was truncated in the brief; I followed its direction rather than its exact times. |

### Hook judge

| Teaser | Score before | What I did | Score after (my estimate) |
|---|---|---|---|
| 03a | 7 | **Adopted** the header rewrite "What difference do weekly and / biweekly payments really make / on a **$44,000** car loan?" ("really" is the R5 cue; weekly comes first), the opening VO "About a year off this loan. Guess which one." (honest: rounded-up weekly pays off at 60.07 months against 72, 11.9 months sooner), the title "What Difference Do Weekly Car Payments Really Make on $44,000?" and caption line 1 "Weekly barely beats biweekly. Rounding up is the real trick!" (the numbers move to line 2). Every later beat shifted by about 3.8 s; runtime 37.2 s. The frame-1 legibility issue (captions invisible, three-line footer in the UI zone) is fixed by V2. Not changed: R3 stays partial (a national-average loan, not the viewer's own), and the first comparison now lands at 8.0 s. | 8 |
| 03b | 6 | **Adopted** the header "Minimum vs a flat payment / on a **$5,000** credit card: / what difference does it make?" (15 words, one $ figure, the stake the viewer maps their balance onto). Step ① is filled in coral at frame 1, the opening VO is "Only the minimum on $5,000? About 15 years.", the $150 beat moves to 9.2 s, the title is the judge's, and caption line 1 is "Never let your minimum shrink!". The second yellow highlight is gone: $150 is no longer in the title, and the stake terms are hidden because the footer states them. **Adapted:** the judge wanted ②'s working "≈ $7 more than the first minimum" visible at frame 1. The kit cannot type a later option's working before that option starts without resting the baseline's coral boxes. Instead, frame 1 shows "$142.59" (①'s working) against "A flat $150" (②'s name), and ②'s working "$150 − $142.59 = $7.41 more" types at 9.2 s and stays. Runtime 30.2 s (the judge suggested about 30). | 7 |
| 03c | 7 | **Adopted** "HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE?". The counter reads ≈ $587,200 in red at 0.0 s with no roll (`resultT 0.0`) and lane 1 reads "30 YEARS". Title "How Much Difference Does Just $100 Extra a Month Make on a Mortgage?" and caption line 1 "Yes, just $100 a month really makes a difference!" (numbers on line 2). **Adapted:** the judge's single opening line "About $587,200 of interest on this $400,000 loan. More than the loan." runs to 22 spoken words, about 8.5 s at 2.6 words/s, so it became "Interest alone: about $587,200." plus "More than the loan.", with $400,000 in the footer at that moment. The +$100 cut is at 6.4 s (the judge suggested about 4.4 s) and its answer at 9.4 s (suggested about 7 s); runtime 29.8 s (suggested about 28). | 8 |
