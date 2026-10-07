# 03 · What difference does X make? Three teasers

**Format:** `what-difference` (rank 3 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P5**)
**Date:** 2026-10-07
**Specs:**
- [`studio/specs/03a-live-sheet-car-loan-weekly.json`](../../studio/specs/03a-live-sheet-car-loan-weekly.json) (33.4 s)
- [`studio/specs/03b-clean-sheet-card-minimum.json`](../../studio/specs/03b-clean-sheet-card-minimum.json) (38.0 s)
- [`studio/specs/03c-scoreboard-mortgage-extra-100.json`](../../studio/specs/03c-scoreboard-mortgage-extra-100.json) (34.3 s)

**Maths check:** [`checks/03-what-difference.py`](checks/03-what-difference.py). It rebuilds all three loans payment by payment from the sourced inputs, then checks every display string in the three specs against the computed, formatted value, and every number in every VO line too. It also checks that each shown delta equals the difference of the shown totals, that "≈"/"about" appear exactly on rounded numbers, the contract shape, R1/R2/R8/R10, and the timing (2.6 words/s, no overlaps, each option lands within 0.9 s of the word that names it, every formula-bar step and sfx sits on a beat). Result: **413 checks, 0 failures, exit 0**. A mutation test (one interest cell changed to "≈ $2,900", one "about" removed) failed 2 checks with exit 1, as it should.
**Studio linter:** `node src/cli.mjs check specs/03*.json` gives **3/3 clean** (header, footer, captions and verdict chrome; the three what-difference format modules are still stubs in every kit).
**Web searches used:** 13 of 14. The egress proxy blocked every page fetch (Edmunds, the Fed, Freddie Mac, Auto Remarketing and others), so each figure below rests on the search engine's result text for the named page, not on a full read of the page. Re-open the primary pages before publishing (see "Open items").

---

## (a) The format in 5 lines

1. **What it is.** Hold one real debt fixed and pay it 2-4 ways. Every way gets the same two outputs, a payoff time and the total interest. The question with the options named goes on screen, and the verdict goes in the caption.
2. **Breakouts (all @thedebtfreedomproject, TikTok, median 1.3K-6K views):**
   - "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" / caption "Look what a difference rounding makes!": **1,900,000 views, 902.5x**, the largest multiple in the benchmark. https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
   - "What's the difference between daily payments and one extra lump sum payment each month?" / "Yes, daily payments work!": **382,100, 289.1x**, on a $2.98 answer. https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
   - "How much difference does an extra $100 per month make on a car loan payoff?": **290,700, 127.3x**. https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
3. **Loan maths works under a minute too.** FinCalC TV's "Home Loan Part payment Reduce Tenure NOT EMI" got **578,461** in 59 s (https://www.youtube.com/shorts/7CFEV6D3QNM). The Market Hustle's red-worst-case vs cyan-relief columns, "How Long It Took To Recover After the Worst Crashes:", got **190,187 (4.5x med)** in 73 s (https://www.instagram.com/reel/DduW3hgShyh/).
4. **What kills it.** A topic label instead of a question: the same creator's "Credit Card Debt Payoff Strategies" got **90,600 (52.5x)**, her lowest (https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534). A neutral "X vs Y, which is better?" also fails: FinCalC's bucket has a median of 13,322 (n = 8). The other thing that kills it is length. Her first new number lands 30-45% of the way into 3-6 minutes, so ours lands at 0.0 s and the whole teaser runs 33-38 s.
5. **What we add.** One line of envelope working per option, left visible as proof (her Excel formula bar, made readable). The lever is sized honestly ("biweekly = 13 payments, not 12"). The headline is rounded with "≈", and the exact payments stay in the working. The verdict stays even when the answer is small ($2.98 broke out).

**Hook grammar we steal (P5).** On screen: "What difference does [A, B and C] make on [one debt]?" or "How much difference does [an extra $X a month] make on [one debt]?" In the caption: a verdict that names the winning lever. We avoid topic labels and "which is better?".

---

## (b) The three teasers at a glance

| | 03a | 03b | 03c |
|---|---|---|---|
| Look | Live Sheet | Clean Sheet | Scoreboard |
| Debt | $44,000 car loan, 7%, 72 months | $5,000 card balance, 22% APR | $400,000 mortgage, 7.3%, 30 years |
| Options | Monthly · Biweekly · Weekly · Weekly rounded up to $200 | The minimum · a flat $150 · a flat $250 | Just the payment · +$100 a month · +$500 a month |
| On-screen hook (t = 0) | What difference do monthly, / biweekly and weekly payments / make on a **$44,000** car loan? | What difference does paying / **$150** instead of the minimum / make on a credit card? | HOW MUCH DIFFERENCE DOES / AN EXTRA **$100** A MONTH MAKE / ON A 30-YEAR MORTGAGE? |
| Words in hook | 14 | 14 | 14 |
| Number on screen at 0.0 s | $44,000 · Monthly row filled: 72 months, ≈ $10,000 | $150 · $5,000 · "The minimum" row lands at 0.8 s: ≈ 15.1 years, ≈ $7,300 | $100 · counter ≈ $587,200 of interest (red) |
| Verdict (screen) | Round up to **$200** a week: **≈ 1 year** sooner, **≈ $1,800** less | Just **≈ $7** more than the first minimum: **≈ 11 years** sooner | +$100 a month: **≈ $78,600** less |
| Runtime | 33.4 s | 38.0 s | 34.3 s |
| Benchmark hook it copies most closely | H48, 1.9M, 902.5x | H50, 290.7K, 127.3x | H50, 290.7K, 127.3x |

**Winner convention.** `winner` is the option the verdict names, not always the biggest number. In 03b the flat $250 is faster than the flat $150, but the hook asks about $150 and the verdict answers it. The $250 row is the "biggest number last" bonus, toned `good` rather than `goal`.

---

## 03a · Live Sheet · Monthly vs biweekly vs weekly on a $44,000 car loan

**Spec:** `studio/specs/03a-live-sheet-car-loan-weekly.json` · 33.4 s · captions on
**Platform title:** Monthly vs Biweekly vs Weekly Payments on a $44,000 Car Loan
**On-screen hook (header):** What difference do monthly, / biweekly and weekly payments / make on a **$44,000** car loan?

### Why this hook

**Modelled on:**
1. **H48, The Debt Freedom Project:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" with the caption "Look what a difference rounding makes!". **1,900,000 views, 902.5x.** We keep her grammar and her four scenarios (monthly, biweekly, weekly, weekly rounded up). We swap "paying off a car loan" for the stake, so a number sits in the hook.
2. **H50, same channel:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** It shows a concrete dollar figure in the question.
3. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461.** The verdict names the real lever and denies the expected one.

**Rules satisfied:**
- **R1:** $44,000 is in the header, and the Monthly row is filled at 0.0 s (72 months, ≈ $10,000).
- **R2:** the hook has one dollar figure, the input, and no result.
- **R3:** $44,000 is the average new-car loan. The pinned comment asks viewers for their own loan, which is the sequel engine of her 290.7K reply video.
- **R4:** the input is the size of a loan car buyers have actually signed.
- **R5:** the options imply that paying more often is the trick.
- **R6:** the stake is the amount plus 72 months, and "your" goes in the caption.
- **R7:** three options are named, and a fourth row appears.
- **R8:** 14 words.
- **R9:** 4 rows, 3 of them empty at 0.0 s.
- **R10:** the first values are on screen at 0.0 s and the first comparison lands at 4.2 s.
- **R11:** the question is on screen and the verdict is in the caption.
- **R12:** "Weekly barely beats biweekly. Rounding up wins."

**The wrong belief it plays on:** "Weekly payments must beat biweekly by a lot. The schedule is the trick." In fact biweekly and weekly each add up to exactly **13 monthly payments a year** ($9,752.08 = 13 × $750.16), so weekly beats biweekly by only **$35.49**. The date moves when you pay more: rounding $187.54 up to $200 (+$12.46 a week) takes ≈ 1 year off. That is the myth bust Debt Freedom shows at 3:21 but never explains.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Yellow banner (the hook). Stake chip: "Avg new-car loan · $44,000 · 7% APR · 72 months". Footer on. Column labels "Paid off in" / "Interest". **Row 2 filled:** Monthly · $750.16 a month · 72 months · ≈ $10,000 (red). Rows 3-5 named (Biweekly, Weekly, Weekly rounded up) with empty cells. Formula bar: "= $750.16 × 72 − $44,000 ≈ $10,000 interest" | "Monthly: 72 months, about $10,000 in interest." |
| 4.2 | Biweekly row fills: $375.08 every 2 weeks · ≈ 65 months · ≈ $8,900 · **≈ $1,100 less** (green). Formula bar: "= $375.08 × 26 = $9,752.08 a year". Pop | "Biweekly: about 65 months, about $1,100 less." |
| 9.2 | Weekly row fills: $187.54 every week · ≈ 65 months · ≈ $8,900 · ≈ $1,100 less. The cells match the row above. Formula bar: "= $187.54 × 52 = $9,752.08 a year". Pop | "Weekly: about 65 months too. Only about $35 better." |
| 14.2 | Formula bar: "= 13 × $750.16: 13 payments, not 12". The two $9,752.08 results flash | "Both add up to 13 monthly payments a year, not 12." |
| 19.2 | Selection drops to the last row. It fills: $200 every week · ≈ 60 months · **≈ $8,200** (counts up 0.8 s) · **≈ $1,800 less**. Formula bar: "= $200 × 52 = $10,400 a year: ≈ $648 more". Roll | "Now round each weekly payment up to $200." (starts 18.8) |
| 23.0 | Last row tinted as the winner | "About 60 months. About $1,800 less." |
| 27.2 | Verdict: "Round up to **$200** a week: / **≈ 1 year** sooner, **≈ $1,800** less". Formula bar: "= $200 − $187.54 = $12.46 more a week". Ding | "About $12 more a week. About a year sooner." |
| 31.2-33.4 | Full table holds (2.2 s), then rows 3-5 clear back to frame 1 for the loop | (none) |

### Guide VO script (57 written words, ≈ 75 spoken with numbers read out: ≈ 29 s of speech at 2.6 words/s, spread over 0.0-31.2 s)

> Monthly: 72 months, about $10,000 in interest.
> Biweekly: about 65 months, about $1,100 less.
> Weekly: about 65 months too. Only about $35 better.
> Both add up to 13 monthly payments a year, not 12.
> Now round each weekly payment up to $200.
> About 60 months. About $1,800 less.
> About $12 more a week. About a year sooner.

### The maths

Model: simple interest charged daily (APR ÷ 365 per day), rounded to the cent each period. Each payment is applied the day it is paid. A month is 365/12 days, so a monthly period charges exactly 7%/12. The schedule runs payment by payment until the balance is $0, and the last payment is whatever is left.

| On screen | Formula and inputs | Result |
|---|---|---|
| $44,000, 7% APR, 72 months | Inputs (sources below) | |
| $750.16 a month | 44,000 × (0.07/12) ÷ (1 − (1 + 0.07/12)^−72) = 750.156… | $750.16 |
| 72 months, ≈ $10,000 | Monthly schedule: 72 payments; interest $10,011.20. Formula-bar shortcut 750.16 × 72 − 44,000 = $10,011.52 | ≈ $10,000 |
| $375.08 every 2 weeks | 750.16 ÷ 2 | $375.08 |
| ≈ 65 months, ≈ $8,900, ≈ $1,100 less | 142 payments × 14 days = 1,988 days ÷ (365/12) = 65.36 months; interest $8,916.74; 10,011.20 − 8,916.74 = $1,094.46 | ≈ 65 · ≈ $8,900 · ≈ $1,100 |
| $187.54 every week | 750.16 ÷ 4 = 187.54 | $187.54 |
| ≈ 65 months, ≈ $8,900, ≈ $1,100 less | 282 × 7 = 1,974 days = 64.90 months; interest $8,881.25; saves $1,129.95 | ≈ 65 · ≈ $8,900 · ≈ $1,100 |
| "about $35 better" (VO) | 8,916.74 − 8,881.25 = $35.49 | ≈ $35 |
| $9,752.08 a year (×2), 13 × $750.16 | 375.08 × 26 = 187.54 × 52 = 13 × 750.16 = 9,752.08 | exact |
| $200 every week, ≈ 60 months, ≈ $8,200, ≈ $1,800 less | 261 × 7 = 1,827 days = 60.07 months; interest $8,184.40; saves $1,826.80 | ≈ 60 · ≈ $8,200 · ≈ $1,800 |
| $10,400 a year, ≈ $648 more | 200 × 52 = 10,400; 10,400 − 9,752.08 = 647.92 | ≈ $648 |
| $12.46 more a week (VO "about $12") | 200 − 187.54 | $12.46 |
| ≈ 1 year sooner | (72 − 60.07) ÷ 12 = 0.99 | ≈ 1 |
| Delta consistency | shown 10,000 − 8,900 = 1,100; 10,000 − 8,200 = 1,800 | matches the shown deltas |

**Sensitivity (write-up only):** at Experian's 6.35% the payment is $736.50. Monthly costs ≈ $9,000, biweekly 65.4 months ≈ $8,100, weekly 65.1 months ≈ $8,000, and rounded-up 59.1 months ≈ $7,200. Weekly still barely beats biweekly, and rounding still takes ≈ 1 year off.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| Average new-car loan | $44,000 (between the two) | **Edmunds**, Q3 2026 new-vehicle finance data, reported by Auto Remarketing, "Edmunds spots 6 new records as average amounts financed, payments & terms keep growing in Q3" (Oct 2026): avg amount financed **$44,664**, avg APR **7.0%**, avg payment **$787**, avg term "past 70 months", 84-month-plus loans **25.5%**. https://www.autoremarketing.com/?p=131431 · also Briefglance, https://briefglance.com/companies/edmunds-com-inc/pulses/84146. Q2 2026: $44,156 at 7.0% (AP via Santa Maria Times, https://santamariatimes.com/ap/business/nearly-1-in-4-new-vehicle-buyers-in-q2-stretched-loans-to-84-months-or/article_5832a407-bcfa-54a3-9664-dc9063d99ef4.html) | **Experian**, State of the Automotive Finance Market Q2 2026, reported by Auto Remarketing, "Experian sees refinancing continue to ripen in Q2" (2026): avg new-vehicle loan **$43,610**, avg rate **6.35%**, avg payment **$765**. https://autoremarketing.com/subprime/experian-sees-refinancing-continue-to-ripen-in-q2/ |
| APR | 7% | Edmunds Q3 2026: 7.0% (above) | Experian Q2 2026: 6.35%. It differs, so the sensitivity above is computed at 6.35% |
| Term | 72 months | Edmunds Q3 2026: average term "past 70 months" | Experian Q1 2026: about 69.5 months for new vehicles (Experian press release, 2026, https://experianplc.com/newsroom/press-releases/2026/new-experian-automotive-report-shows-nearly-one-third-of-automot) |
| Daily simple interest on car loans; biweekly mechanics | Model assumption | Debt Freedom's own sheet uses `=(0.0424/365)*B10*D10` (watch study, section 3.4) | Printed in the footer as an assumption |

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES 7% APR, 72 months, interest charged daily, each payment applied the day it's paid"

### Caption / description (verdict first, R11)

> Weekly barely beats biweekly: about $35. Both add up to 13 monthly payments a year instead of 12, and that is the whole trick. What actually moves the date: rounding the weekly payment up to $200, about a year sooner and about $1,800 less interest on your $44,000 loan.
> $44,000 at 7% APR over 72 months ≈ the average new-car loan (Edmunds Q3 2026: $44,664 at 7.0%). Simple interest charged daily; assumes each payment is applied the day it lands. Educational math only.
> #carloan #debtpayoff #biweekly #micropayments #mathtok

### Pinned comment

> Does your lender apply a weekly payment the day it lands, or hold it until the due date? That decides whether any of this works. Drop your loan amount, APR and months and we'll run your row next.

The first sentence starts the argument vidIQ predicted for H48's comments. The second sets up a comment-reply sequel (H50's 127.3x was one).

### Per-platform notes

- **TikTok.** Post the verdict as caption line 1. Keep #micropayments: 4 of Debt Freedom's 5 breakouts carried it. Answer the best "now do mine" comment with the native reply sticker, on the same $44,000 running case (her $58,593.13 Jeep loan carried both the 1.9M video and the 290.7K reply).
- **Instagram Reels.** Make the cover the finished table at 31 s (all four rows filled). Gage's one A/B favoured a finished-table cover. No comment-keyword CTA: in the benchmark it lifts comments, not views.
- **YouTube Shorts.** Use the platform title above, which asks the question while the screen shows the working. Let the loop run: the rows clear back to the frame-1 state at 33.4 s.

---

## 03b · Clean Sheet · $150 instead of the minimum on a credit card

**Spec:** `studio/specs/03b-clean-sheet-card-minimum.json` · 38.0 s · captions on
**Platform title:** Paying $150 Instead of the Minimum on a $5,000 Credit Card
**On-screen hook (header):** What difference does paying / **$150** instead of the minimum / make on a credit card?

### Why this hook

**Modelled on:**
1. **H50, The Debt Freedom Project:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** The lever is the only number in the question.
2. **H48, same channel:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?", **1,900,000, 902.5x.** This is the "What difference does … make on …?" frame.
3. **H49, same channel:** "What's the difference between daily payments and one extra lump sum payment each month?" with the caption "Yes, daily payments work!", **382,100, 289.1x.** A small lever with a verdict caption.

**Designed against:** H52, "Credit Card Debt Payoff Strategies", a topic label (**90,600**, her weakest, on the same subject). Our credit-card hook is a question that names the options.

**Rules satisfied:**
- **R1:** $150 is in the header and the $5,000 stake is visible at 0.0 s. The minimum row's result (≈ 15.1 years, ≈ $7,300) lands at 0.8 s.
- **R2:** one dollar figure in the hook.
- **R3:** a card balance and a minimum payment are numbers almost every viewer has. The pinned comment asks for their card's formula.
- **R4:** $150 is small and round, and $5,000 is round.
- **R5:** "the minimum" is the payoff plan the statement suggests.
- **R6:** $5,000 at 22%, with the horizon as the payoff.
- **R7:** the minimum vs $150 is named, and the $250 row appears.
- **R8:** 14 words.
- **R9:** 3 numbered steps.
- **R10:** biggest number first: ≈ 15.1 years at 0.8 s.
- **R11:** the question is on screen and the verdict is in the caption.
- **R12:** "≈ $7 more a month at first, ≈ 11 years sooner."

**The wrong belief it plays on:** "The minimum payment is the bank's plan to clear my balance, and paying a little more barely changes anything." The minimum is 1% of the balance plus the interest, so it shrinks as the balance shrinks. On $5,000 at 22% it takes **≈ 15 years** and **≈ $7,300** of interest, more than the $5,000 owed. A flat $150 is only **$7.41** above the first minimum ($142.59), and it clears the card in **≈ 4.3 years**.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page: title (the hook). Black badge "$5,000 → $0?". Stake "Credit card balance · $5,000 · 22% APR · no new charges". Footer on. Step ① "The minimum" types its formula "1% of balance + interest, $40 floor"; ② "A flat $150" and ③ "A flat $250" are empty circles | "Pay the minimum on $5,000 at 22%." |
| 0.8 | ① result pops in coral: "≈ 15.1 years · ≈ $7,300"; detail "starts at ≈ $143, then shrinks". Pop | (same line, on "minimum") |
| 4.6 | Pointer on "starts at ≈ $143" | "It starts at about $143 and shrinks." |
| 9.2 | Pointer on ≈ 15.1 years, then ≈ $7,300 | "About 15 years. About $7,300 in interest." |
| 13.8 | Pointer from ≈ $7,300 to the $5,000 stake | "More than the $5,000 you owed." |
| 17.2 | Check line types in blue: "$150 − $142.59 = $7.41 more in month 1" | "Now a flat $150. About $7 more, at first." |
| 18.0 | ② "$150 every month until $0" → green "≈ 4.3 years · ≈ $2,800", delta "≈ 11 years sooner". Pop | (same line, on "flat") |
| 22.6 | Pointer on ② results | "About 4.3 years. About $2,800 in interest." |
| 28.4 | ③ "$250 every month until $0" → "≈ 2.2 years · ≈ $1,300", "≈ 13 years sooner". Pop | "A flat $250: about 2.2 years." (starts 28.0) |
| 32.6 | Verdict: "Just **≈ $7** more than the first minimum: / **≈ 11 years** sooner". ② gets the blue goal highlighter, with at most a 3% push-in. Ding | "The minimum shrinks. Your payment doesn't have to." |
| 35.8-38.0 | Finished sheet holds 2.2 s, then the results clear to frame 1 | (none) |

### Guide VO script (57 written words, ≈ 86 spoken: ≈ 33 s of speech, spread over 0.0-35.8 s)

> Pay the minimum on $5,000 at 22%.
> It starts at about $143 and shrinks.
> About 15 years. About $7,300 in interest.
> More than the $5,000 you owed.
> Now a flat $150. About $7 more, at first.
> About 4.3 years. About $2,800 in interest.
> A flat $250: about 2.2 years.
> The minimum shrinks. Your payment doesn't have to.

### The maths

Model: interest billed monthly at 22%/12 on the balance, rounded to the cent, with no new charges. Minimum (Chase cardmember agreement formula): the larger of $40, or 1% of the new balance plus the interest billed. When the new balance is under $40, the minimum is the whole balance.

| On screen | Formula and inputs | Result |
|---|---|---|
| $5,000, 22% APR | Inputs (sources below) | |
| starts at ≈ $143 | interest 5,000 × 0.22/12 = $91.67; new balance $5,091.67; 1% = $50.92; 50.92 + 91.67 | $142.59 → ≈ $143 |
| ≈ 15.1 years (VO "about 15") | Minimum schedule: 181 payments ÷ 12 | 15.08 |
| ≈ $7,300 | Sum of interest on the minimum schedule $7,340.79 (> $5,000) | ≈ $7,300 |
| $150 − $142.59 = $7.41 (VO "about $7") | | $7.41 |
| ≈ 4.3 years, ≈ $2,800 | Flat $150: 52 payments; interest $2,798.09 | 4.33 → ≈ 4.3 · ≈ $2,800 |
| ≈ 11 years sooner | (181 − 52) ÷ 12 = 10.75; shown 15.1 − 4.3 = 10.8 | ≈ 11 |
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
| Card APR | 22% (rounded from 22.15%) | **Federal Reserve, G.19 Consumer Credit**, release of Aug 7, 2026 (Q2 2026): commercial-bank interest rate on credit card plans, **accounts assessed interest 22.15%** (Q1 2026: 21.52%). https://www.federalreserve.gov/releases/g19/20260807/ · series TERMCBCCINTNS on FRED, https://fred.stlouisfed.org/graph/?g=1hhyS · as summarised by Walnut, https://walnutinvest.com/stats/interest-rate-statistics | **Bankrate** weekly average credit card rate **19.56%** (Aug 12, 2026), syndicated at https://www.azfamily.com/bankrate-article/2026/08/12/current-credit-card-interest-rates/. It measures new-card offers, not balances that pay interest, so it is the low sensitivity case. The Fed's "all accounts" rate, 20.94% (May 2026), sits between the two |
| Minimum-payment formula | the larger of $40, or 1% of the new balance + interest | **Chase cardmember agreement** (COL00040): "(3) the larger of: (a) $40 (or total amount you owe if less than $40); or (b) the sum of: (i) 1% of the new balance … PLUS (ii) any periodic interest charges and late fees". https://www.chase.com/content/feed/public/creditcards/cma/Chase/COL00040.pdf | The same agreement filed in the **CFPB** credit card agreement database: https://files.consumerfinance.gov/a/assets/credit-card-agreements/pdf/QCCA4Q2023/JPMORGAN_CHASE_BANK_NATIONAL_ASSOCIATION/COL00040-271320.pdf. **U.S. Bank** explainer (minimums are 1-3% or a flat amount plus interest, and vary by issuer): https://www.usbank.com/credit-cards/credit-card-insider/credit-card-basics/credit-card-minimum-payment.html |
| $5,000 balance | Round example | (not a sourced average; framed as "a $5,000 balance") | |

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES 22% APR, no new charges · minimum = 1% of balance + interest, $40 floor"

### Caption / description

> The minimum shrinks as the balance shrinks, so it barely finishes: about 15 years and about $7,300 of interest on $5,000, more than the debt itself. A flat $150, just $7.41 above the first minimum, clears it in about 4.3 years and about $4,500 less interest.
> 22% ≈ the Fed's Q2 2026 average for cards that charge interest (22.15%). Minimum formula from a big-bank cardmember agreement: 1% of the balance + interest, $40 floor. Yours is in your agreement under "Minimum Payment". Educational math only.
> #creditcarddebt #debtpayoff #minimumpayment #mathtok

### Pinned comment

> Wild part: even holding the payment at the FIRST minimum ($142.59) and never letting it shrink clears it in 57 months, not 181. What formula does your card use: 1%, 2% or 3%?

### Per-platform notes

- **TikTok.** Verdict in caption line 1, in the grammar of "Yes, daily payments work!". The likely comment fight is "nobody's minimum is 1%", so the pinned comment invites people to post their formula, which is cheap sequel material: "now do 2%".
- **Instagram Reels.** Cover: the finished sheet with the blue "≈ 4.3 years" box and the coral "≈ 15.1 years". Save-bait is the worked sheet itself, so no keyword CTA.
- **YouTube Shorts.** Use the title above. This is the longest of the three (38.0 s). If retention dips at the "More than the $5,000 you owed" line, the 3.2 s line can be cut without touching the maths (the spec would need re-timing and a re-check).

---

## 03c · Scoreboard · An extra $100 a month on a 30-year mortgage

**Spec:** `studio/specs/03c-scoreboard-mortgage-extra-100.json` · 34.3 s · captions on
**Platform title:** How Much Difference Does an Extra $100 a Month Make on a Mortgage?
**On-screen hook (header):** HOW MUCH DIFFERENCE DOES / AN EXTRA **$100** A MONTH MAKE / ON A 30-YEAR MORTGAGE?

### Why this hook

**Modelled on:**
1. **H50, The Debt Freedom Project:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** We take the grammar word for word and swap the debt.
2. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461** (59 s). Home-loan prepayment maths travels at Shorts length.
3. **H71, The Market Hustle:** "How Long It Took To Recover After the Worst Crashes:", **190,187 (4.5x med).** Open in the red: his "25 YEARS" in red is on screen at 0.0 s. Our counter opens on **≈ $587,200** of interest in red.

**Rules satisfied:**
- **R1:** $100 is in the header, and the counter reads ≈ $587,200 at 0.0 s.
- **R2:** one dollar figure in the hook; the result is hidden.
- **R3:** an extra $100 is a sum anyone can test against their own payment. The pinned comment asks for their rate.
- **R4:** $100 is small and round.
- **R5:** "$100 is a rounding error on a $400,000 loan."
- **R6:** a 30-year mortgage, with the stake $400,000 at 7.3% on screen.
- **R7:** the lever is named, and the $500 row appears.
- **R8:** 14 words.
- **R9:** 3 lanes, 2 of them empty.
- **R10:** a shock number at 0.0 s and the biggest saving last.
- **R11:** the question is on screen and the verdict is in the caption.
- **R12:** "+$100 a month: ≈ $78,600 less."

**The wrong belief it plays on:** "$100 a month can't matter on a $400,000 loan." It saves **≈ $78,600** of interest and **40 months**. That is $31,900 put in, about $2.46 of interest saved per extra dollar. The baseline shock goes first: the interest alone (**≈ $587,200**) is more than the loan.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Top bar: header (the hook). Hero counter **≈ $587,200** in red (interest). Footer "7.3% fixed (Freddie Mac, Oct 1) · extra → principal". Stage: three lanes "Just the payment / +$100 a month / +$500 a month"; lane 1 filled: 30 years · ≈ $587,200. Label stack "$2,742.29 a month / JUST THE PAYMENT". Footer step "$2,742.29 × 360 − $400,000 ≈ $587,200" | "$400,000 at 7.3% over 30 years." |
| 5.0 | The counter pulses once | "Interest: about $587,200. More than the loan itself." |
| 11.1 | Hard cut. Label "+$100 A MONTH". Counter rolls down to **≈ $508,600** in green. Lane 2: ≈ 26.7 years. Footer step "$2,742.29 + $100 = $2,842.29 a month". Roll | "Add $100 a month." |
| 13.8 | Delta slams in: **≈ $78,600 less** | "40 months sooner. About $78,600 less interest." |
| 18.8 | Hard cut. Label "+$500 A MONTH". Counter rolls to **≈ $342,200**. Lane 3: ≈ 19.1 years · ≈ $245,000 less. Footer step "$2,742.29 + $500 = $3,242.29 a month". Roll | "Add $500 a month." |
| 21.5 | (hold on lane 3) | "About 11 years sooner. About $245,000 less." |
| 26.5 | Verdict replaces the label stack: "+$100 a month: **≈ $78,600** less". Lane 2 gets the winner glow. Footer step "$100 × 319 = $31,900 extra → ≈ $78,600 less interest: ≈ $2.46 each". Cash | "Each dollar of that $100 saves about $2.46." |
| 32.1-34.3 | Hold 2.2 s, then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (44 written words, ≈ 77 spoken: ≈ 30 s of speech, spread over 0.0-32.1 s)

> $400,000 at 7.3% over 30 years.
> Interest: about $587,200. More than the loan itself.
> Add $100 a month.
> 40 months sooner. About $78,600 less interest.
> Add $500 a month.
> About 11 years sooner. About $245,000 less.
> Each dollar of that $100 saves about $2.46.

### The maths

Model: standard monthly amortisation at 7.3%/12, with interest rounded to the cent. The scheduled payment is rounded up to the cent, so 360 payments clear the loan. Every extra dollar goes to principal the month it is paid. Taxes, insurance and PMI are excluded.

| On screen | Formula and inputs | Result |
|---|---|---|
| $400,000, 7.3%, 30 years | Inputs (sources below) | |
| $2,742.29 a month | 400,000 × (0.073/12) ÷ (1 − (1 + 0.073/12)^−360) = 2,742.2837, rounded up | $2,742.29 |
| 30 years, ≈ $587,200 | 360 payments; interest $587,216.16. Footer shortcut 2,742.29 × 360 − 400,000 = $587,224.40 | ≈ $587,200 (> $400,000) |
| $2,842.29 / $3,242.29 a month | 2,742.29 + 100; 2,742.29 + 500 | exact |
| ≈ 26.7 years, ≈ $508,600 | +$100: 320 payments ÷ 12 = 26.67; interest $508,590.78 | ≈ 26.7 · ≈ $508,600 |
| 40 months sooner (VO) | 360 − 320 | 40 |
| ≈ $78,600 less | 587,216.16 − 508,590.78 = 78,625.38; shown 587,200 − 508,600 = 78,600 | ≈ $78,600 |
| ≈ 19.1 years, ≈ $342,200 | +$500: 229 payments = 19.08 years; interest $342,178.64 | ≈ 19.1 · ≈ $342,200 |
| ≈ $245,000 less; "about 11 years sooner" | 587,216.16 − 342,178.64 = 245,037.52; (360 − 229) ÷ 12 = 10.92 | ≈ $245,000 · ≈ 11 |
| $100 × 319 = $31,900 | The full $100 goes in for 319 months; the 320th payment is the smaller remainder | exact |
| ≈ $2.46 each | 78,625.38 ÷ 31,900 = 2.4647 | ≈ $2.46 |

**Sensitivity (write-up only):** at Freddie Mac's exact **7.28%** the payment is $2,736.85. Interest comes to ≈ $585,300 with no extra, ≈ $507,000 with +$100 (still 320 months, so 40 months sooner) and ≈ $341,300 with +$500 (230 months). The "+$100 saves more than $75,000" verdict holds.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| 30-year fixed rate | 7.3% | **Freddie Mac** Primary Mortgage Market Survey, Oct 1, 2026: 30-yr fixed averaged **7.28%** (7.03% the week before, 6.34% a year earlier; 15-yr 6.60%). Freddie Mac release "Mortgage Rates Increase" (GlobeNewswire via StreetInsider), https://www.streetinsider.com/Globe+Newswire/Mortgage+Rates+Increase/25411462.html · Trading Economics, "US Mortgage Rates Climb Further in October", https://tradingeconomics.com/united-states/30-year-mortgage-rate/news/588887 · FRED series MORTGAGE30US, https://fred.stlouisfed.org/graph/?g=n5kM | **Mortgage Bankers Association** Weekly Mortgage Applications Survey, week ending Sep 25, 2026 (released Sep 30): average contract rate, 30-yr fixed conforming, **7.30%** (from 7.12%), "highest since November 2023". Reported by JM Financial Services market news, https://www.jmfinancialservices.in/market-news-and-insights/1734750 (the search returned three of its pages, IDs 1729262, 1733675 and 1734750; which one holds this item is not confirmed) |
| Loan size | $400,000 (round example) | **NAR** Existing-Home Sales, August 2026: median existing-home price **$429,100** (+1.6% y/y), so $400,000 is that price with about 7% down. https://www.nar.realtor/newsroom/nar-existing-home-sales-report-shows-2-0-decrease-in-august | Mortgage News Daily on the same release: https://www.mortgagenewsdaily.com/news/09112026-existing-home-sales-nar-inventory-prices-appr |

### Assumptions (footer, on screen from 0.0 s)

"7.3% fixed (Freddie Mac, Oct 1) · extra → principal". The scoreboard footer row fits about 50 characters, so the "ASSUMES" prefix is dropped there. The year and the "no taxes or insurance" note go in the caption.

### Caption / description

> Yes, $100 a month matters: about $78,600 less interest and 40 months sooner on a $400,000, 30-year loan at 7.3%. $500 a month: about 11 years sooner and about $245,000 less.
> 7.3% ≈ the Freddie Mac average for the week of Oct 1, 2026 (7.28%); MBA had 7.30%. Assumes a fixed rate and that every extra dollar is applied to principal; taxes, insurance and PMI not included. Educational math only.
> #mortgage #homeloan #debtfree #mathtok

### Pinned comment

> Extra payments only shorten the loan if the servicer applies them to principal. Some apply them to next month's payment instead. Drop your balance, rate and extra amount and we'll put your row on the board.

### Per-platform notes

- **TikTok.** The counter opening in the red is the scroll-stop, so keep the first 0.5 s free of any intro. Put the verdict in caption line 1. Run the comment-reply sequel ("now do $50", "now do 6%") on the same $400,000 board.
- **Instagram Reels.** Cover: the verdict frame (+$100 · ≈ $78,600 less) over the three lanes. Comments will argue about investing the $100 instead. Leave that argument alone (no advice); a later P4 duel can answer it with maths.
- **YouTube Shorts.** Use the title above. HD Guy-style diegetic sound only (ticks and rolls, no music bed). Hard-cut loop at 34.3 s back to the red counter.

---

## Open items

1. **Primary pages were not opened.** The egress proxy blocked every page fetch (edmunds.com, federalreserve.gov, autoremarketing.com, gmauthority.com, santamariatimes.com). Each figure was cross-checked against a second, independent publisher's search result:
   - Edmunds vs Experian for the car loan;
   - the Fed vs Bankrate for the card APR;
   - Freddie Mac vs MBA for the mortgage rate.

   Before publishing, read these four primary pages: the Fed's G.19 for Aug 7, 2026; Freddie Mac's PMMS for Oct 1, 2026; Edmunds' Q3 2026 release; and the Chase agreement PDF.
2. **The MBA citation's exact page** (one of three JM Financial pages) is unconfirmed. Freddie Mac's 7.28% is the figure on screen.
3. **The three what-difference kit modules are stubs** in Live Sheet, Clean Sheet and Scoreboard. The specs pass the linter on chrome only. Once the modules exist:
   - re-run `node src/cli.mjs check specs/03*.json`;
   - re-run this file's check;
   - keep `lookOpts` (`formulaBar` for Live Sheet; `badge`, `formulas` and `check` for Clean Sheet; `counter` and `footerSteps` for Scoreboard). A kit must render sensibly without them.
