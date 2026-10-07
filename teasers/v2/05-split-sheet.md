# 05 · Split sheet: three teasers

**Format:** `split-sheet` (rank 5 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P9**)
**Date:** 2026-10-07
**Specs:**
- [`studio/specs/05a-clean-sheet-chipotle-10.json`](../../studio/specs/05a-clean-sheet-chipotle-10.json) (31.0 s)
- [`studio/specs/05b-becker-rig-3000-paycheck.json`](../../studio/specs/05b-becker-rig-3000-paycheck.json) (27.0 s)
- [`studio/specs/05c-scoreboard-costco-100.json`](../../studio/specs/05c-scoreboard-costco-100.json) (26.0 s)

**Maths check:** [`checks/05-split-sheet.py`](checks/05-split-sheet.py). It recomputes every on-screen number from the sourced inputs, then checks every digit-bearing display string in the three specs against the computed, formatted value. A digit-bearing string the script does not know is a failure. It also checks every number in every VO line, including number words such as "five" and "ten", and that numeric fields agree with their display strings (`value`, `share`). Further checks:
- "≈" sits on every rounded amount and on no exact one.
- The shown parts add up to the total with no plug.
- The contract shape, and hook rules R1, R2, R8 and R10.
- Timing: VO at 2.6 words/s, no overlapping lines, and every beat, look option and sfx anchored to the word that voices it. A beat may land up to 0.8 s before the spoken number and 0.2 s after it.
- Fact identities and the robustness of each verdict.

Result: **450 checks, 0 failures, exit 0**. In a mutation test, five broken copies (wrong cents, a wrong VO number, a beat 1.6 s early, a missing "≈", a VO line too short for its words) failed 9 checks with exit 1, as they should.
**Studio linter:** `node src/cli.mjs check specs/05*.json` gives **3/3 clean, 0 warnings**. That covers header, footer, captions and verdict chrome; the `split-sheet` module is still a stub in all three kits.
**Web searches used:** 12 of 14. The egress proxy blocks page fetches (eia.gov was tried and refused), so every figure rests on the search engine's result text for the named primary page. Each figure is cross-checked against a second, independent source or an accounting identity (see each Sources table). Re-open the primary pages before publishing (see "Open items").

**One topic changed: 05c.** The seed was "Where your $100 of gasoline goes" (EIA price components). It could not be verified:
- EIA's monthly breakdown page cannot be fetched.
- Three searches returned three inconsistent splits: "Nov 2025: crude 47 / refining 16 / distribution 20 / taxes 17", "March 2026: 57 / 21 / 8 / 14" and "May 2026: 51 / 20 / 11 / 18", none of them traced to the EIA page itself.
- 2026 pump prices spiked ($4.354 on Oct 5, 2026, per EIA's weekly series via search), so any older month would mislead today's viewer.

Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 05c became **"How much of your $100 does Costco actually keep?"**. It stays inside lane 5, one round sum split into every share in dollars, and every input sits in Costco's audited FY2026 results, out 2 weeks ago. A second pivot, the S&P 500 version of the benchmark's own ETF grid, was tried first and dropped: individual index weights for Sep 30, 2026 were not retrievable (1 search). Costco appears in lane 8 only as a unit (hot dogs), and this split is a different topic.

---

## (a) The format in 5 lines

1. **What it is.** Take one round sum the viewer owns ($10, $3,000, $100). The whole sheet is on screen at frame 1, with every label and percentage. A pointer walks it and each percentage turns into dollars. A remainder line closes it, and the check line proves it adds up.
2. **Breakouts:**
   - **Yannick @real_unick**, "The Paycheck Rule That Changed My Finances": **739,347 plays, 40.7x his median**, 38 s, with the finished sheet and the $5,000 → $3,000 / $1,250 / $750 strip at frame 1. https://www.instagram.com/reel/DaOpjKURdbk/
   - **The Market Hustle**, "What You're Buying When You Invest $10,000 in These ETFs": **221,830 plays, 617 comments** (pinned), 111 s, with the full dollar grid at 0.0 s and the remainder line "The remaining $7,770 is split between 496 other companies". https://www.instagram.com/reel/DMwLzi8PhdK/
3. **Smaller wins:**
   - Yannick's static "3 PAYCHECK RULES": **142,827 (7.9x med)**, a 6 s loop. https://www.instagram.com/reel/DeDdp-IRg5E/
   - Yannick's couple's split: **65,844 (3.6x med)**. https://www.instagram.com/reel/DeIUN-mxxt6/
4. **What kills it.**
   - Hiding the sheet, or a payoff that comes late: Yannick's dollars arrive at 25 s of 38.
   - Splits with no anchor sum: Master Money's "DO THIS THE NEXT TIME YOU GET A BONUS" jars got **7,459**. https://www.instagram.com/reel/Dd84F1dRToE/
   - Sequels of the same sheet: Yannick's debt version got **14,059** (1 day old).
5. **What we add.** The first dollar lands by 3 s (1.6 s / 2.4 s / 2.6 s, not 25 s). Every amount carries "≈" and its working. Each sheet closes on a check line or a remainder line. The verdict busts one wrong belief the viewer already holds:
   - "they keep $7"
   - "a budget leaves no fun money"
   - "Costco gets rich off your cart"

**Hook grammar we steal (P9):** "What You're [Buying / Paying For] When You [Invest / Spend] $[round sum] [in / at X]:" (H70). For variety, two teasers use a question that keeps the P9 sheet underneath: "How much fun money does…?" and "How much of your $100 does … actually keep?". We avoid duty stickers ("rules every family should follow"), which would be advice language here.

---

## (b) The three teasers at a glance

| | 05a | 05b | 05c |
|---|---|---|---|
| Look | Clean Sheet | Becker Rig | Scoreboard |
| Round sum | $10 at Chipotle | $3,000 take-home paycheck | $100 at Costco |
| Parts | 7 (food · crew · rent · ads/delivery/fees · HQ/wear/new stores · tax · profit) | 3 (needs · wants · savings) | 3 (goods · staff & warehouses · left for Costco) + the membership-fee twist |
| On-screen hook (t = 0) | What You're Paying For / When You Spend **$10** / at Chipotle: | How much fun money does 50/30/20 / leave on a **$3,000** paycheck? | HOW MUCH OF YOUR **$100** / DOES COSTCO ACTUALLY KEEP? |
| Words in hook | 10 | 11 | 9 |
| Number at 0.0 s | $10 (header) · $10.00 total · all 7 percentages | $3,000 (header, block) · 50% / 30% / 20% | $100 (header) · hero "$100.00" |
| First payoff | ≈ $2.96 at 1.6 s | $300 (one tenth) at 2.4 s | ≈ $88.91 at 2.6 s |
| Wrong belief busted | "Chipotle keeps the other $7.04" | "A budget rule leaves little fun money" | "Costco makes its money on your cart" |
| Verdict (screen) | Chipotle keeps **≈ $1.29** of your $10. Not $7.04. | Wants get **$900**: $300 more than savings | Costco keeps **≈ $1.94** of your $100 |
| Runtime | 31.0 s | 27.0 s | 26.0 s |
| Closest benchmark hook | H70, 221,830 | H53, 739,347 (40.7x med) | H70 + H84 (3M, 140x) |

**Display convention (all three):**
- **Percentages** are shares of the round sum to the precision the source reports: 0.1 pt for Chipotle (its 10-K's own precision) and exact for 50/30/20. Costco's go to 0.01 pt so that, on a $100 base, the percentage and the dollar amount read the same and add to exactly 100.00.
- **Dollar amounts** are the exact share × the sum, rounded to the cent and marked "≈". The 50/30/20 amounts are exact, so they carry no "≈".
- **Rows add up exactly:** the rounded rows sum to $10.00 and $100.00 with no plug (checked).

---

## 05a · Clean Sheet · What you're paying for when you spend $10 at Chipotle

**Spec:** `studio/specs/05a-clean-sheet-chipotle-10.json` · 31.0 s · captions on
**Platform title:** What You're Paying For When You Spend $10 at Chipotle
**On-screen hook (header):** What You're Paying For / When You Spend **$10** / at Chipotle:

### Why this hook

**Modelled on:**
1. **H70, The Market Hustle:** "What You're Buying / When You Invest / $10,000 in These ETFs", **221,830 plays, 617 comments.** We take its exact grammar: a 3-line headline ending in a colon, a round anchor, the full grid at 0.0 s, and a remainder line. "Buying" becomes "Paying For", the old hook #6 rewrite A from the hook bank.
2. **H53, Yannick:** the finished sheet with the dollar strip visible at frame 1, **739,347 plays (40.7x med)**. The whole sheet is on screen at 0.0 s, and only the dollars fill.
3. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make", **3,000,000 views, 140x.** One word implies the viewer's number is wrong: "actually" there, "paying for" here, meaning not just the food. The wrong answer is then voiced at 3.0 s, Rewrite B of old hook #6: "So Chipotle keeps the other $7.04?"

**Rules satisfied:**
- **R1:** "$10" in the header, "$10.00" as the total, and all seven percentages on screen at 0.0 s.
- **R2:** one dollar figure (the input), no result.
- **R3:** the viewer's own $10 order.
- **R4:** a sum they have spent.
- **R5:** "Paying For" implies you think it's the food, and the VO names the wrong answer, $7.04.
- **R6:** "you" + $10.
- **R7:** every option is named on the sheet; no label hook.
- **R8:** 10 words.
- **R9:** seven empty amount cells.
- **R10:** first dollar at 1.6 s; the biggest number is first ($2.96) and the payoff is last ($1.29).
- **R11:** the verdict is in the caption.
- **R12:** "Not $7.04. Just $1.29."

**The wrong belief it plays on:** "A $10 burrito costs them maybe $3 in food, so they pocket about $7." The sheet shows that the food really is ≈ $2.96, and that the five lines between food and profit eat ≈ $5.75 more:
- crew ≈ $2.51
- rent ≈ $0.52
- ads, delivery and card fees ≈ $1.47
- HQ, wear and tear and new stores ≈ $0.91
- tax ≈ $0.34

Profit is ≈ $1.29, and the crew gets almost twice that.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page + brand mark. Header (3 lines, **$10** on yellow). Footer: "ASSUMES $10 splits like Chipotle's FY2025 revenue (10-K) · an average, not your order". Total badge **$10.00**. Seven rows with labels and percentages: Food, drinks & packaging 29.6% · Crew pay 25.1% · Rent 5.2% · Ads, delivery & card fees 14.7% · HQ, wear & tear, new stores 9.1% · Income tax 3.4% · Profit 12.9%. Amount cells empty. Pointer on row 1 | "Food, drinks and the bag: $2.96." |
| 1.6 | Row 1 amount swipes in: **≈ $2.96** (first payoff) | |
| 3.0 / 4.6 | Under row 1, in coral: "$10 − $2.96" → "**$7.04 profit?**" (buzz at 4.6) | "So Chipotle keeps the other $7.04?" |
| 6.0 / 7.6 | The guess is struck through. Pointer to row 2; **≈ $2.51** at 7.6 | "Not even close. Crew pay: $2.51." |
| 9.0 / 9.1 | Row 3: **≈ $0.52** | "Rent: 52 cents." |
| 10.6 / 13.0 | Pointer to row 4; **≈ $1.47** at 13.0 | "Ads, delivery, card fees and the rest: $1.47." |
| 14.4 / 16.8 | Row 5: **≈ $0.91** | "Head office, wear and tear, new stores: 91 cents." |
| 18.2 / 18.7 | Row 6: **≈ $0.34** | "Income tax: 34 cents." |
| 20.1 / 21.3 | Row 7 on the blue goal highlighter: **≈ $1.29** | "What's left is profit: $1.29." |
| 22.8 | Check line types under the sheet: "$10.00 − $8.71 of costs = $1.29" (tick) | "Check: $10 minus $8.71 of costs." |
| 26.2 | Verdict: "Chipotle keeps **≈ $1.29** of your $10. / Not __$7.04__." (ding) | "Not $7.04. Just $1.29." |
| 28.7-31.0 | The finished sheet holds (2.3 s); the last 0.7 s clears the amounts back to frame 1 (loop) | (none) |

### Guide VO script (10 lines, ≈ 66 spoken words ≈ 25.4 s at 2.6 words/s)

> Food, drinks and the bag: $2.96.
> So Chipotle keeps the other $7.04?
> Not even close. Crew pay: $2.51.
> Rent: 52 cents.
> Ads, delivery, card fees and the rest: $1.47.
> Head office, wear and tear, new stores: 91 cents.
> Income tax: 34 cents.
> What's left is profit: $1.29.
> Check: $10 minus $8.71 of costs.
> Not $7.04. Just $1.29.

### The maths

Each row's share is the 10-K dollar line ÷ total revenue (FY2025, $ thousands). On screen: the share to 0.1 pt, and $10 × the exact share to the cent.

| On screen | Formula and inputs | Exact | Shown |
|---|---|---|---|
| Food, drinks & packaging | 3,527,043 ÷ 11,925,601 | 29.5754% · $2.9575 | 29.6% · ≈ $2.96 |
| Crew pay | 2,991,680 ÷ 11,925,601 | 25.0862% · $2.5086 | 25.1% · ≈ $2.51 |
| Rent | 624,898 ÷ 11,925,601 | 5.2400% · $0.5240 | 5.2% · ≈ $0.52 |
| Ads, delivery & card fees (other operating costs) | 1,755,824 ÷ 11,925,601 | 14.7231% · $1.4723 | 14.7% · ≈ $1.47 |
| HQ, wear & tear, new stores (G&A + D&A + pre-opening + impairment) | revenue − the four lines above − operating income 1,935,798 = 1,090,358 | 9.1430% · $0.9143 | 9.1% · ≈ $0.91 |
| Income tax (minus interest earned) | 473,758 − 73,721 = 400,037 | 3.3544% · $0.3354 | 3.4% · ≈ $0.34 |
| Profit (net income) | 1,935,798 + 73,721 − 473,758 = 1,535,761 | 12.8778% · $1.2878 | 12.9% · ≈ $1.29 |
| Totals | exact shares sum to 1; rounded cents 2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 + 1.29 = 10.00; shares 29.6 + 25.1 + 5.2 + 14.7 + 9.1 + 3.4 + 12.9 = 100.0 | | no plug |
| $10.00 total | the input | | $10.00 |
| "$10 − $2.96" → "$7.04 profit?" (the wrong guess) | 10 − 2.96 | | $7.04 |
| Check: "$10.00 − $8.71 of costs = $1.29" | 2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 = 8.71; 10.00 − 8.71 = 1.29 (= the profit row) | | exact on shown numbers |
| Caption: "crew gets almost twice the profit" | 2,991,680 ÷ 1,535,761 = 1.95 | | |

### Sources

| Input | Value used | Source 1 | Source 2 (independent) |
|---|---|---|---|
| Total revenue FY2025 | $11,925,601K (+5.4%) | **Chipotle**, "Chipotle Announces Fourth Quarter and Full Year 2025 Results", Feb 3, 2026: "Total revenue increased 5.4% to $11.9 billion". https://ir.chipotle.com/2026-02-03-CHIPOTLE-ANNOUNCES-FOURTH-QUARTER-AND-FULL-YEAR-2025-RESULTS · same release as SEC 8-K ex. 99.1: https://www.sec.gov/Archives/edgar/data/1058090/000105809026000007/cmg-20260203xex991.htm | **FoodIngredientsFirst**, "Chipotle posts full-year revenue increase as beef and chicken inflation pressures margins" (Feb 2026). https://www.foodingredientsfirst.com/news/chipotle-full-year-2025-results.html · PR Newswire copy of the release: https://www.prnewswire.com/news-releases/chipotle-announces-fourth-quarter-and-full-year-2025-results-302678079.html |
| Food, beverage & packaging | $3,527,043K = 29.6% | Release (above): "$3,527.0 million" | **Chipotle FY2025 Form 10-K**: "29.6% of total revenue". https://www.sec.gov/Archives/edgar/data/1058090/000105809026000009/cmg-20251231.htm |
| Labor · occupancy · other operating costs | $2,991,680K · $624,898K · $1,755,824K | Release income statement (dollar lines, read in round 1; the round-2 search confirmed the percentages, not the thousands) | 10-K: 25.1% · 5.2% · 14.7% of total revenue. The dollar lines reproduce all three (checked) |
| Income from operations | $1,935,798K = 16.2% | Release: "Operating margin was 16.2%" | Identity: net income = 1,935,798 + 73,721 − 473,758 = 1,535,761 = the reported $1.54B (checked) |
| Restaurant-level margin | 25.4% | Release | The four lines give 25.375% → 25.4% (checked) |
| Provision for income taxes · interest and other income · D&A | $473,758K (4.0%) · $73,721K (0.6%) · $361,382K | Release / 10-K (search result text, Oct 7, 2026) | 10-K: effective tax rate 23.6% = 473,758 ÷ (1,935,798 + 73,721) = 23.58% (checked) |
| Net income | $1,535,761K ($1.54B, $1.14/share) | Release | FoodIngredientsFirst; Yahoo Finance, "A Look At Chipotle Mexican Grill's (CMG) Valuation As 2025 Results Meet Flat 2026 Sales Outlook". https://finance.yahoo.com/news/look-chipotle-mexican-grill-cmg-021013885.html |
| What "other operating costs" covers | marketing, delivery service fees, credit card fees, utilities, maintenance, restaurant technology | FY2025 10-K cost definitions (above) | (definition, not a figure) |

FY2025 is the latest 10-K as of Oct 7, 2026: Chipotle's fiscal year is the calendar year, so the FY2026 10-K arrives in Feb 2027.

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES $10 splits like Chipotle's FY2025 revenue (10-K) · an average, not your order"

### Caption / description (verdict first, R11)

> Not $7. About $1.29. Of your $10 at Chipotle, food, drinks and packaging take about $2.96, and the crew takes about $2.51, almost twice the profit. Rent, ads, delivery and card fees, head office and taxes eat the rest.
> Each line is that cost's share of Chipotle's 2025 revenue (FY2025 10-K and Q4 release, Feb 3 2026), applied to $10: a company-wide average, not your order. Educational math, not financial advice.
> #chipotle #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2025 ($ thousands): revenue 11,925,601. Food/bev/packaging 3,527,043 (29.58%) · labor 2,991,680 (25.09%) · occupancy 624,898 (5.24%) · other operating 1,755,824 (14.72%) · G&A + depreciation + pre-opening + impairment 1,090,358 (9.14%) · income tax 473,758 minus interest income 73,721 (3.35%) · net income 1,535,761 (12.88%). Per $10: $2.9575 / $2.5086 / $0.5240 / $1.4723 / $0.9143 / $0.3354 / $1.2878. Which chain's $10 next?

### Per-platform notes

- **YouTube Shorts:** use the 31.0 s master. The title is the hook line, for search ("$10 at Chipotle"). No logo and no store footage, only the brand name in text. Frame 0 (the full sheet, empty amounts) is the cover.
- **Instagram Reels:** the master. The cover is the finished-sheet frame at ~28 s: the full dollar column plus the verdict, which works as a save-able cheat sheet, as with Yannick's finished sheet. Put the pinned comment's exact table in the first comment.
- **TikTok:** the master. Add the on-screen question to the caption's first line ("Does Chipotle really keep $7 of your $10?") for the reply-video engine. The Debt Freedom Project's reply sticker earned 127.3x (H50).
- **All:** the voice-over starts on the first calculation with no greeting (H55, H76, H84).

---

## 05b · Becker Rig · How much fun money does 50/30/20 leave on a $3,000 paycheck?

**Spec:** `studio/specs/05b-becker-rig-3000-paycheck.json` · 27.0 s · captions on
**Platform title:** 50/30/20 on a $3,000 Paycheck: How Much Is Fun Money?
**On-screen hook (header):** How much fun money does 50/30/20 / leave on a **$3,000** paycheck?

### Why this hook

**Modelled on:**
1. **H53, Yannick:** "Paycheck rules / That every family / Should follow" over the 60/25/15 sheet with "$5,000 → $3,000 / $1,250 / $750", **739,347 plays (40.7x med)**. This is the same object, a paycheck split into labelled piles. We drop the duty sticker (advice language) and bring the dollars forward from 25 s to 2.4 s.
2. **H18, ChartOrbit:** "Does investing 100$ monthly in BMW make you rich?", **1,391,731 views, 5.91x.** Its yes/no question grammar maps to "How much fun money does 50/30/20 leave…?": one open number, and a side to take.
3. **H84, Master Money:** "Take your salary and multiply it by 0.7…", **3,000,000 views, 140x.** The viewer can run it on their own pay. Here the participation device is the envelope shortcut: find 10%, then count pieces.

**Rules satisfied:**
- **R1:** "$3,000" in the header and on the block at 0.0 s.
- **R2:** one dollar figure, no result. "50/30/20" is the rule's name.
- **R3:** the viewer swaps in their own take-home; the pinned comment shows how.
- **R4:** a paycheck size people earn.
- **R5:** "fun money" implies the belief that a budget rule leaves little for wants.
- **R6:** "a $3,000 paycheck" + monthly.
- **R7:** needs, wants and savings are named on the sheet.
- **R8:** 11 words.
- **R9:** three empty envelopes and 10 pieces.
- **R10:** the first dollar result ($300) at 2.4 s; the biggest piece first.
- **R11:** question on screen, verdict in the caption.
- **R12:** "Wants get $900: $300 more than savings."

**The wrong belief it plays on:** "A budget rule is all saving and no fun." On 50/30/20 the wants pile ($900) is bigger than the savings pile ($600) by $300, which is $30 a day. A second, quieter belief is that you need a calculator for a percentage split. One cut by 10 does all three: 5 + 3 + 2 pieces of $300.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | White void + floor. Header (2 lines, **$3,000** on the hero highlight). Footer: "ASSUMES $3,000 take-home (after tax), paid monthly · 30-day month". A **$3,000** number block stands on the floor; the figure stands beside it holding a saw. Three empty envelopes on the right: NEEDS 50% · WANTS 30% · SAVINGS 20%, amount slots empty | "$3,000. Saw it into ten: $300 each." |
| 1.0 | `saw` action: the "÷ 10" tool cuts the block (whoosh) | |
| 2.4 | The block splits into **10 blocks of $300** with an impact (hit); a working line "$3,000 ÷ 10 = $300" (first payoff) | |
| 4.6 / 5.4 | The figure stacks 5 blocks into NEEDS; the slot reads **$1,500** (note "5 × $300 · rent, food, bills") | "Needs get five: $1,500." |
| 7.3 / 8.1 | 3 blocks into WANTS: **$900** (note "3 × $300 · fun money") | "Wants get three: $900." |
| 10.0 / 10.8 | 2 blocks into SAVINGS: **$600** (note "2 × $300 · saving, extra debt") | "Savings get two: $600." |
| 12.7 | Check line: "$1,500 + $900 + $600 = $3,000"; all 10 blocks counted | "Five, three, two. Ten pieces, $3,000." |
| 16.1 | Verdict: "Wants get **$900**: $300 more than savings" (ding); the WANTS envelope towers over SAVINGS | "So fun money beats savings by $300." |
| 19.9 / 21.9 | Gag: the figure pulls one coin a day out of WANTS: "$900 ÷ 30 = $30 a day" | "$900 a month is $30 a day of wants." |
| 24.7-27.0 | Finished state holds (2.3 s), then loops to the whole block | (none) |

### Guide VO script (7 lines, ≈ 58 spoken words ≈ 22.3 s at 2.6 words/s)

> $3,000. Saw it into ten: $300 each.
> Needs get five: $1,500.
> Wants get three: $900.
> Savings get two: $600.
> Five, three, two. Ten pieces, $3,000.
> So fun money beats savings by $300.
> $900 a month is $30 a day of wants.

### The maths

| On screen | Formula and inputs | Result |
|---|---|---|
| $3,000 | example take-home paycheck, paid monthly (input) | $3,000 |
| $300 (one tenth) | 3,000 ÷ 10 | $300 (exact) |
| Needs 50% · $1,500 · "5 × $300" | 0.50 × 10 = 5 pieces; 5 × 300 | $1,500 (exact) |
| Wants 30% · $900 · "3 × $300" | 0.30 × 10 = 3; 3 × 300 | $900 (exact) |
| Savings 20% · $600 · "2 × $300" | 0.20 × 10 = 2; 2 × 300 | $600 (exact) |
| Check "$1,500 + $900 + $600 = $3,000" | sum | exact |
| "$300 more than savings" | 900 − 600 | $300 |
| "$900 ÷ 30 = $30 a day" | 30-day month (footer) | $30 exactly. In an average 30.44-day month it is $29.57, which still rounds to $30 (checked) |

No rounding anywhere, so no "≈" in this teaser.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| The 50/30/20 rule: 50% needs, 30% wants, 20% savings (incl. extra debt payments), applied to **after-tax** income | 50/30/20 of take-home | **Elizabeth Warren & Amelia Warren Tyagi**, *All Your Worth: The Ultimate Lifetime Money Plan* (2005), the primary source, as summarised by **Wealthsimple**, "50 30 20 rule". https://www.wealthsimple.com/en-us/learn/50-30-20-rule | **Citizens Bank**, "What is the 50/30/20 budget rule?" https://www.citizensbank.com/learning/monthly-budgeting-calculator.aspx · Musaffa Academy, "Simple 50/30/20 Budgeting Rule". https://academy.musaffa.com/simple-50-30-20-budgeting-rule-for-managing-your-money/ (all via search, Oct 7, 2026) |
| $3,000 take-home | example input, not a statistic | (none needed) | |

The book is the primary source. The page couldn't be opened here, so the definition rests on two independent summaries that agree.

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES $3,000 take-home (after tax), paid monthly · 30-day month"

### Caption / description (verdict first)

> Fun money wins. On a $3,000 take-home paycheck the 50/30/20 rule puts $900 in wants and $600 in savings: $300 more for fun, or $30 a day.
> Shortcut: 10% of $3,000 is $300, so it's just 5 + 3 + 2 pieces.
> The rule (Elizabeth Warren and Amelia Warren Tyagi, All Your Worth, 2005) splits after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments. Educational math, not financial advice.
> #503020 #budgetmath #backoftheenvelope #moneymath

### Pinned comment

> Do yours in your head: take-home ÷ 10 (move the decimal one place). Needs = 5 of those, wants = 3, savings = 2. $2,400 → $240 → $1,200 / $720 / $480. $4,000 → $400 → $2,000 / $1,200 / $800. What's your 10%?

(Pinned-comment check: 2,400 ÷ 10 = 240; ×5 = 1,200, ×3 = 720, ×2 = 480 (sum 2,400). 4,000 ÷ 10 = 400; ×5 = 2,000, ×3 = 1,200, ×2 = 800 (sum 4,000).)

### Per-platform notes

- **YouTube Shorts:** use the 27.0 s master. Title: "50/30/20 on a $3,000 Paycheck: How Much Is Fun Money?". Cover: frame 0 (the block, the saw, three empty envelopes).
- **Instagram Reels:** the master. The pinned comment's swap-your-pay recipe is the comment engine: Yannick's "run the numbers with your own income" CTA drew 79 comments on 50,206 plays. No keyword-DM CTA.
- **TikTok:** the master. Sequel slots are cheap: $2,000 / $4,000 / $5,000 paychecks, or Yannick's 60/25/15, in the same rig.
- **Kit note (becker-rig split-sheet is a stub):** the first payoff lives in `lookOpts.tenth` (t 2.4). A kit that ignores it would land the first dollar at 5.4 s, so the implementer must render the tenth-split beat. `lookOpts.actions` lists the verbs: saw ÷ 10, then stack 5/3/2. `envelopes` is the one brand nod Becker idea 3 asked for. `gag` holds the $30-a-day closer.

---

## 05c · Scoreboard · How much of your $100 does Costco actually keep?

**Spec:** `studio/specs/05c-scoreboard-costco-100.json` · 26.0 s · captions on
**Platform title:** How Much of Your $100 Does Costco Actually Keep?
**On-screen hook (header):** HOW MUCH OF YOUR **$100** / DOES COSTCO ACTUALLY KEEP?

### Why this hook

**Modelled on:**
1. **H70, The Market Hustle:** "What You're Buying When You Invest $10,000 in These ETFs", **221,830 plays, 617 comments.** We keep the dollarize-to-a-round-sum mechanic and the remainder line ("The remaining $7,770…"). The hero counter here runs the remainder live: $100.00 → ≈ $11.09 → ≈ $1.94.
2. **H84, Master Money:** "…What You Actually Make", **3,000,000 views, 140x.** "ACTUALLY" says the number you believe is wrong.
3. **H04, HD Guy:** "Cost in Units of Starbucks Lattes", **9,858,084 views, 106.16x**, the Scoreboard's source grammar: a counter already set at frame 1 and the working in a one-line footer ("Tall Latte ☕ = $4.45"). We also use **H71, The Market Hustle**, scary number then relief, **190,187 (4.5x med)**, for the twist. The cart leaves only ≈ $1.94, then the membership fees (≈ $1.99 per $100) turn out to be the bigger earner.

**Rules satisfied:**
- **R1:** "$100" in the header and the hero counter at "$100.00" at 0.0 s.
- **R2:** one dollar figure, no result.
- **R3:** your $100 cart.
- **R4:** a Costco run people actually make.
- **R5:** "ACTUALLY keep" implies the belief that the markup is fat.
- **R6:** "your $100".
- **R7:** the three piles are named on screen.
- **R8:** 9 words.
- **R9:** three empty rows, and the hero counts down to what's left.
- **R10:** ≈ $88.91 at 2.6 s, biggest first.
- **R11:** question on screen, verdict in the caption.
- **R12:** a lopsided verdict: "≈ $1.94 of your $100", and the card beats the cart.

**The wrong belief it plays on:** "Costco makes its money marking up what's in my cart." Of every $100 rung up, ≈ $88.91 pays for the goods and ≈ $9.15 pays the staff and runs the warehouses. That leaves ≈ $1.94, under 2%. Membership fees bring in ≈ $1.99 per $100 of sales: $5,907M, more than the $5,778M the carts leave and about half (50.6%) of operating income.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Black bars, dark stage. Header (2 lines, **$100** in green). Footer: "Costco FY2026 · company-wide · before tax". Hero counter **$100.00**. Three rows with empty green bar tracks: The stuff itself 88.91% · Staff & warehouses 9.15% · Left for Costco 1.94%. A shopping-bag icon on stage | "Spend $100 at Costco." |
| 2.6 | Row 1 slams **≈ $88.91** (bar fills); hero rolls down to **≈ $11.09**; footer working: "$264,279M ÷ $297,247M × $100 ≈ $88.91" (roll) | "$88.91 pays for the stuff itself." |
| 5.6 | Row 2 **≈ $9.15**; hero rolls to **≈ $1.94**; footer: "$27,190M ÷ $297,247M × $100 ≈ $9.15" (roll) | "$9.15 pays the staff and runs the warehouses." |
| 9.4 / 10.2 | Row 3 lands **≈ $1.94** (goal); footer: "$100 − $88.91 − $9.15 = $1.94" (thud) | "That leaves Costco $1.94." |
| 11.7 | Row 3's sliver of a bar against the full track | "Less than 2% of your cart." |
| 14.7 / 15.9 | Bonus row slams in green: "Membership fees, per $100 of sales · **≈ $1.99**"; footer: "$5,907M ÷ $297,247M × $100 ≈ $1.99" (cash) | "Now add membership fees: $1.99 for every $100 shoppers spend." |
| 20.1 | Verdict: "Costco keeps **≈ $1.94** of your $100" (ding); footer: "fees $5,907M > what the cart leaves, $5,778M" | "Your card brings in more than your cart leaves." |
| 23.7-26.0 | Hold (2.3 s), then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (7 lines, ≈ 56 spoken words ≈ 21.5 s at 2.6 words/s)

> Spend $100 at Costco.
> $88.91 pays for the stuff itself.
> $9.15 pays the staff and runs the warehouses.
> That leaves Costco $1.94.
> Less than 2% of your cart.
> Now add membership fees: $1.99 for every $100 shoppers spend.
> Your card brings in more than your cart leaves.

### The maths

Costco FY2026, the 52 weeks ended Aug 30, 2026, in $ millions. Net sales = total revenue − membership fees = 303,154 − 5,907 = **297,247** (reported as "$297.2 billion").

| On screen | Formula and inputs | Exact | Shown |
|---|---|---|---|
| The stuff itself (merchandise costs) | 264,279 ÷ 297,247 × $100 | 88.9089 | 88.91% · ≈ $88.91 |
| Staff & warehouses (SG&A) | 27,190 ÷ 297,247 × $100 | 9.1473 | 9.15% · ≈ $9.15 |
| Left for Costco, before tax | (297,247 − 264,279 − 27,190) = 5,778; ÷ 297,247 × $100 | 1.9438 | 1.94% · ≈ $1.94 |
| Rows add up | 88.91 + 9.15 + 1.94 = 100.00 | | no plug |
| Hero remaining | 100 − 88.91 = 11.09; 11.09 − 9.15 = 1.94 | 11.0911 · 1.9438 | ≈ $11.09 · ≈ $1.94 |
| Footer step 3 | $100 − $88.91 − $9.15 = $1.94 | | exact on shown numbers |
| "Less than 2%" (VO) | 1.9438% < 2% | | true |
| Membership fees per $100 of sales | 5,907 ÷ 297,247 × $100 | 1.9872 | ≈ $1.99 |
| "fees $5,907M > what the cart leaves, $5,778M" | 5,907 > 5,778 | | true |
| Operating income (consistency) | 303,154 − 264,279 − 27,190 = 11,685 = 5,778 + 5,907 | | reported $11.69B (checked) |
| Caption: fees ≈ half of operating income | 5,907 ÷ 11,685 = 50.6% | | |
| Pinned: net income per $100 of sales | 9,226 ÷ 297,247 × $100 = 3.104 | | ≈ $3.10 |
| Robustness: FY2025 shows the same | 269.9B − 239.886B − 24.966B ≈ 5.0-5.1B < membership 5.323B | | the verdict is not a one-year fluke (checked) |

### Sources

| Input | Value used | Source 1 | Source 2 (independent) |
|---|---|---|---|
| Net sales FY2026 | $297.2B (+10.1%); derived $297,247M | **Costco**, "Costco Wholesale Corporation Reports Fourth Quarter and Fiscal Year 2026 Operating Results", Sept 24, 2026 (8-K ex. 99.1). https://investor.costco.com/news/news-details/2026/Costco-Wholesale-Corporation-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Operating-Results/default.aspx · PDF: https://s201.q4cdn.com/287523651/files/doc_news/Costco-Wholesale-Corporation-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Operating-Results-2026.pdf · SEC: https://www.sec.gov/Archives/edgar/data/0000909832/000090983226000084/costex9918-k92426.htm | **The Shelby Report**, "Costco Q4 Comp Sales Up 9.4%; FY26 Net Sales Hit $297.2B" (Oct 4, 2026). https://theshelbyreport.com/2026/10/04/costco-q4-comp-sales-up-9-4-fy26-net-sales-hit-297-2b/ · **Pulse 2.0**, "Costco Reports $93.9 Billion In Q4 Sales And $297.2 Billion In Fiscal 2026 Sales As Net Income Reaches $9.2 Billion". https://pulse2.com/costco-reports-93-9-billion-in-q4-sales-and-297-2-billion-in-fiscal-2026-sales-as-net-income-reaches-9-2-billion/amp/ |
| Total revenue | $303,154M | Release / FY2026 financials (search result text) | **Beancount.io**, "Costco FY2026: $303B Revenue, Membership Fees Half of Profit" (Sept 26, 2026). https://beancount.io/blog/2026/09/26/costco-fy2026-earnings-analysis · StockAnalysis revenue page: https://stockanalysis.com/stocks/cost/revenue/ |
| Membership fees | $5,907M (FY2025: $5,323M) | Release | Beancount.io ("$5.91 billion"); the total revenue − net sales identity |
| Merchandise costs · SG&A | $264,279M · $27,190M (FY2025: $239,886M · $24,966M) | Release income statement (search result text) | Identity: 303,154 − 264,279 − 27,190 = 11,685 = the independently reported operating income of **$11.69B** (Beancount.io / StockAnalysis) |
| Net income (pinned only) | $9,226M ($20.76/share) | Release | Pulse 2.0 ("Net Income Reaches $9.2 Billion") |
| What merchandise costs and SG&A include | Merchandise costs include inbound shipping and depot costs; SG&A is mainly wages and benefits, plus warehouse operating costs | Costco Form 10-K cost definitions (FY2025 10-K; the FY2026 10-K is due ~2nd week of Oct 2026) | (definition, not a figure) |

Note: The Shelby Report also ran "Costco Caps FY26 With $297.3B In Sales, Up 10.2 Percent" (Sept 15, 2026). That is the monthly retail-sales report for the retail fiscal year, not the income statement. We use the income-statement net sales.

### Assumptions (footer, on screen from 0.0 s)

"Costco FY2026 · company-wide · before tax". Every line is a company-wide total divided by company-wide net sales and applied to $100, before interest and income tax. It is not one receipt, and not a markup on any item.

### Caption / description (verdict first)

> About $1.94. Of every $100 rung up at Costco in fiscal 2026, about $88.91 paid for the goods and about $9.15 paid the staff and ran the warehouses, leaving about $1.94 before tax.
> Membership fees brought in $5.9B, about $1.99 per $100 of sales: more than the carts left over, and about half of Costco's operating income.
> Source: Costco Q4 and fiscal 2026 results (Sept 24, 2026), 52 weeks ended Aug 30, 2026. Company-wide averages, not your receipt. Educational math, not financial advice.
> #costco #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2026 ($ millions): net sales 297,247 (= total revenue 303,154 − membership fees 5,907). Merchandise costs 264,279 (88.909%) · SG&A 27,190 (9.147%) · left 5,778 (1.944%). Membership fees 5,907 = 1.987% of sales. Operating income 11,685 = 5,778 + 5,907. Net income 9,226, about $3.10 per $100 of sales after interest and tax. Which store's $100 next?

### Per-platform notes

- **YouTube Shorts:** use the 26.0 s master. The title is the question, and the brand name is in text only (no logo, no store footage). Frame 0 (hero $100.00, three empty bars) is the cover.
- **Instagram Reels:** the master. Cover: the verdict frame (≈ $1.94 against the full $100 bar). Tag nobody, and don't use brand handles in the caption.
- **TikTok:** the master. The membership twist is the comment hook ("so the card is the product?"). Keep the caption's first line as the verdict.
- **Kit note (scoreboard split-sheet is a stub):**
  - `lookOpts.hero: "remaining"` asks the hero counter to count down what's left, landing on the `remaining[].display` strings.
  - `footerSteps` carries the one-line working per beat, as in 03c.
  - `bonus` is the membership row; it is not a part, because it is not in your $100.
  - The bag icon is in every kit's icon list.

---

## Open items

1. **Re-open the primary pages before publishing.** Page fetches were blocked, so every figure was read from search-result text for those pages. In particular:
   - Chipotle's labor ($2,991,680K), occupancy ($624,898K) and other operating costs ($1,755,824K) rest on round 1's read of the release. Round 2 re-confirmed their 10-K percentages (25.1 / 5.2 / 14.7) but not the thousands. Within the published 0.1-pt rounding, their cents could each move by ±1¢. The shown rows would then need re-balancing to keep the $10.00 total.
   - Costco's merchandise costs and SG&A come from the release via one search. The operating-income identity ($11.69B, from separate sources) agrees to the million.
2. **Costco's FY2026 10-K** should be filed around the second week of October 2026. Re-run the check against it; the release numbers are normally identical.
3. **The three split-sheet modules are stubs** in clean-sheet, becker-rig and scoreboard. The specs lint clean on the chrome only. Each kit needs the frame-1 sheet (labels + percentages visible, amounts empty), the pointer or actor walk, and the look options above.
4. **05c replaced the gasoline seed** (reasons at the top). If the owner still wants gasoline, it needs one unblocked read of EIA's "Gasoline and Diesel Fuel Update" components box (crude / refining / distribution & marketing / taxes for the latest month). The same Scoreboard spec structure then works with 4 parts.

## Search log (12 of 14)

| # | Query (short) | Used for |
|---:|---|---|
| 1 | Chipotle FY2025 results: revenue, margins | 05a revenue, op. margin, restaurant-level margin, net income |
| 2 | Chipotle 10-K FY2025 line percentages | 05a 29.6 / 25.1 / 5.2 / 14.7 |
| 3 | EIA "What we pay for in a gallon" 2026 | 05c seed: inconsistent splits |
| 4 | EIA components Aug/Sep 2026 | 05c seed: Sept 2026 retail $4.35; no dated split |
| 5 | EIA Gasoline and Diesel Fuel Update components | 05c seed: weekly $4.354 (Oct 5, 2026); no split; dropped |
| 6 | Gasoline breakdown 2026 (any source) | 05c seed: "March 2026" 57/21/14/8 vs others; confirmed the drop |
| 7 | S&P 500 top-10 weights, Sep 30, 2026 | 05c pivot attempt 1: no constituent weights; dropped |
| 8 | Costco FY2026 results line items | 05c inputs |
| 9 | Costco FY2026 total revenue, operating income | 05c second source + identity |
| 10 | Chipotle tax, interest, D&A, net income | 05a lower lines + effective tax rate |
| 11 | Chipotle exact cost lines ($K) | 05a food $3,527.0M confirmed; others by percentage |
| 12 | 50/30/20 origin, after-tax definition | 05b rule definition |
