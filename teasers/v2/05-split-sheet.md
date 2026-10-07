# 05 · Split sheet: three teasers

**Format:** `split-sheet` (rank 5 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P9**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews; see "Review log" at the end)
**Specs:**
- [`studio/specs/05a-clean-sheet-chipotle-10.json`](../../studio/specs/05a-clean-sheet-chipotle-10.json) (33.6 s)
- [`studio/specs/05b-becker-rig-3000-paycheck.json`](../../studio/specs/05b-becker-rig-3000-paycheck.json) (29.3 s)
- [`studio/specs/05c-scoreboard-costco-100.json`](../../studio/specs/05c-scoreboard-costco-100.json) (26.0 s)

**Maths check:** [`checks/05-split-sheet.py`](checks/05-split-sheet.py). It recomputes every on-screen number from the sourced inputs, then checks every digit-bearing display string in the three specs against the computed, formatted value. A digit-bearing string the script does not know is a failure. It also checks every number in every VO line, including number words such as "five" and "ten", and that numeric fields agree with their display strings (`value`, `share`). Further checks:
- "≈" sits on every rounded amount and on no exact one, **on screen and in the VO text** (captions are on, so the VO is on screen too).
- The shown parts add up to the total with no plug.
- The contract shape, and hook rules R1, R2, R8 and R10.
- Timing: VO at 2.6 words/s ("≈" counts as a spoken word, "about"), no overlapping lines, and every beat, look option and sfx anchored to the word that voices it. A beat may land up to 0.8 s before the spoken number and 0.2 s after it. 05a's wrong guess is checked as a frame-1 element that the first VO line voices.
- The masked goal percentage (`lookOpts.maskPct`) sits only on the goal row.
- Labels that carry a fact: 05a's tax row must say it is net of interest; 05c's verdict must not say "keeps", and "before tax" must be on screen when ≈ $1.94 lands.
- Fact identities and the robustness of each verdict.

Result: **481 checks, 0 failures, exit 0**. In a mutation test, eight broken copies each failed with exit 1: a missing "≈" in a caption, "≈" on an exact $10, "Costco keeps" back in the verdict, the row label back to "Income tax", the wrong guess moved off frame 1, the mask on a non-goal row, the hero landing on ≈ $1.94 early, and "before tax" dropped from footer step 3.
**Studio linter:** `node src/cli.mjs check specs/05*.json` gives **3/3 clean, 0 warnings** (re-run after this revision; the four kit samples for split-sheet in clean-sheet and scoreboard are also clean, and `node --test` passes 6/6). All three kits now implement `split-sheet`; renders of every beat were inspected for this revision.
**Web searches used:** 12 in round 1 + 4 in this revision (see the search log). The egress proxy blocks page fetches (eia.gov in round 1, sec.gov again today), so every figure rests on the search engine's result text for the named primary page. Each figure is cross-checked against a second, independent source or an accounting identity (see each Sources table).

**One topic changed: 05c.** The seed was "Where your $100 of gasoline goes" (EIA price components). It could not be verified:
- EIA's monthly breakdown page cannot be fetched.
- Three searches returned three inconsistent splits: "Nov 2025: crude 47 / refining 16 / distribution 20 / taxes 17", "March 2026: 57 / 21 / 8 / 14" and "May 2026: 51 / 20 / 11 / 18", none of them traced to the EIA page itself.
- 2026 pump prices spiked ($4.354 on Oct 5, 2026, per EIA's weekly series via search), so any older month would mislead today's viewer.

Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 05c became **"How much of your $100 does Costco actually keep?"**. It stays inside lane 5, one round sum split into every share in dollars, and every input sits in Costco's FY2026 Form 10-K (filed Oct 6, 2026) and its Sept 24, 2026 results release. A second pivot, the S&P 500 version of the benchmark's own ETF grid, was tried first and dropped: individual index weights for Sep 30, 2026 were not retrievable (1 search). **Slate overlap to flag:** 08a (lane 8) is also Costco on the Scoreboard look (hot dogs as a unit, with a membership beat). The topics differ, but the owner will see the same brand in the same look twice (Open item 4).

---

## (a) The format in 5 lines

1. **What it is.** Take one round sum the viewer owns ($10, $3,000, $100). The whole sheet is on screen at frame 1, with every label and percentage except the goal row's, which reads "?" until its beat (otherwise it would answer the header at 0.0 s). A pointer (or the figure) walks it and each percentage turns into dollars. A remainder line closes it, and the check line proves it adds up.
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
5. **What we add.** The first dollar lands by 3 s (0.8 s / 2.4 s / 0.5 s, not 25 s). Every rounded amount carries "≈" and its working, on the sheet and in the captions. Each sheet closes on a check line (05a, 05b, 05c) and a remainder line (05c's footer). The verdict busts one wrong belief the viewer already holds:
   - "they keep $7 of my $10" (on screen at frame 1, then struck)
   - "50/30/20 works on any $3,000 take-home" (only if your rent fits in half)
   - "Costco gets rich off your cart"

**Hook grammar we steal (P9):** "What You're [Buying / Paying For] When You [Invest / Spend] $[round sum] [in / at X]:" (H70), with R5's one-word device ("Really", from H84's "What You Actually Make"). For variety, two teasers use a question that keeps the P9 sheet underneath: "Could you live on 50/30/20 with $3,000 a month take-home?" (H18's yes/no grammar, answered by the viewer's own rent) and "How much of your $100 does Costco actually keep?". We avoid duty stickers ("rules every family should follow"), which would be advice language here.

---

## (b) The three teasers at a glance

| | 05a | 05b | 05c |
|---|---|---|---|
| Look | Clean Sheet | Becker Rig | Scoreboard |
| Round sum | $10 at Chipotle | $3,000 a month take-home | $100 at Costco |
| Parts | 7 (food · crew · rent · ads/delivery/fees · HQ/wear/new stores · tax − interest earned · profit) | 3 (needs · wants · savings) | 3 (goods · staff & warehouses · left for Costco) + the membership-fee twist |
| On-screen hook (t = 0) | What You're Really Paying For / When You Spend **$10** / at Chipotle: | Could you live on 50/30/20 / with **$3,000** a month take-home? | HOW MUCH OF YOUR **$100** / DOES COSTCO ACTUALLY KEEP? |
| Words in hook | 11 | 10 | 9 |
| Number at 0.0 s | $10 (header) · $10.00 total · six percentages (profit "?") · the coral wrong guess "$10 − $2.96 = $7.04 profit?" | $3,000 (header, slab) · 50% / 30% / 20% | $100 (header) · hero "$100.00" · 88.91% / 9.15% (row 3 "?") |
| First payoff | ≈ $2.96 at 0.8 s | $300 (one tenth) at 2.4 s | ≈ $88.91 at 0.5 s (hero rolls to ≈ $11.09) |
| Wrong belief busted | "Chipotle keeps the other $7.04" | "50/30/20 fits any $3,000 take-home" | "Costco makes its money on your cart" |
| Verdict (screen) | Chipotle keeps **≈ $1.29** of your $10. / Not $7.04. | Needs get **$1,500**: rent, food, every bill. | Your cart leaves Costco **≈ $1.94**. / Your card brings in **≈ $1.99**. |
| Runtime | 33.6 s | 29.3 s | 26.0 s |
| Closest benchmark hook | H70, 221,830 (+ H84's "Actually", 3M, 140x) | H53, 739,347 (40.7x med) + H18, 1,391,731 (5.91x) | H70 + H84 (3M, 140x) |

**Display convention (all three):**
- **Percentages** are shares of the round sum to the precision the source reports: 0.1 pt for Chipotle (its 10-K's own precision) and exact for 50/30/20. Costco's go to 0.01 pt so that, on a $100 base, the percentage and the dollar amount read the same and add to exactly 100.00. Because that makes the goal row's % its dollar answer, the goal row's % is masked ("?") until its beat in 05a and 05c (`lookOpts.maskPct`; a kit that ignores it shows the full sheet, as the contract asks).
- **Dollar amounts** are the exact share × the sum, rounded to the cent and marked "≈", on the sheet and in the VO captions. The 50/30/20 amounts are exact, so they carry no "≈". Figures that are exact on the shown numbers ($10 − $2.96 = $7.04; the $8.71 of costs; the check lines) carry no "≈" either.
- **Rows add up exactly:** the rounded rows sum to $10.00 and $100.00 with no plug (checked).

---

## 05a · Clean Sheet · What you're really paying for when you spend $10 at Chipotle

**Spec:** `studio/specs/05a-clean-sheet-chipotle-10.json` · 33.6 s · captions on
**Platform title:** Chipotle Keeps How Much of Your $10?
**On-screen hook (header):** What You're Really Paying For / When You Spend **$10** / at Chipotle:

### Why this hook

**Modelled on:**
1. **H70, The Market Hustle:** "What You're Buying / When You Invest / $10,000 in These ETFs", **221,830 plays, 617 comments.** We take its exact grammar: a 3-line headline ending in a colon, a round anchor, the full grid at 0.0 s, and a remainder line. "Buying" becomes "Paying For", the old hook #6 rewrite A from the hook bank.
2. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make", **3,000,000 views, 140x.** One word implies the viewer's number is wrong: "Actually" there, "**Really**" here.
3. **Hook bank §4.6, rewrite B** ("Does Chipotle Really Make $7 on Your $10?"): the wrong answer goes **on screen at frame 1**, "$10 − $2.96 = $7.04 profit?" in coral under the sheet, with the profit row's % masked, so the only profit figure on screen at 0.0 s is the wrong one. The first VO line voices it ("So Chipotle keeps $7.04?") and the second strikes it ("Not even close.").
4. **H53, Yannick:** the finished sheet with every row visible at frame 1, **739,347 plays (40.7x med)**; only the dollars fill.

**Rules satisfied:**
- **R1:** "$10" in the header, "$10.00" as the total, six percentages and the wrong guess on screen at 0.0 s.
- **R2:** one dollar figure in the header (the input), no result.
- **R3:** the viewer's own $10 order; the percentages scale to any order.
- **R4:** a sum they have spent.
- **R5:** "Really" plus the coral "$7.04 profit?" at frame 1: the belief is named before the scroll decision, then beaten.
- **R6:** "you" + $10.
- **R7:** every option is named on the sheet; no label hook.
- **R8:** 11 words.
- **R9:** seven empty amount cells and a "?" where the profit share should be.
- **R10:** first dollar at 0.8 s; the biggest number is first ($2.96) and the payoff is last ($1.29).
- **R11:** the question is on screen (the coral "?"), the verdict is the caption's first line ("Nowhere near $7.").
- **R12:** "Not $7.04. Just ≈ $1.29."

**The wrong belief it plays on:** "A $10 burrito costs them maybe $3 in food, so they pocket about $7." The sheet shows that the food really is ≈ $2.96, and that the five lines between food and profit eat ≈ $5.75 more:
- crew ≈ $2.51
- rent ≈ $0.52
- ads, delivery and card fees ≈ $1.47
- HQ, wear and tear and new stores ≈ $0.91
- tax minus the interest Chipotle earns ≈ $0.34 (the income-tax provision alone is ≈ $0.40; the interest Chipotle earns on its cash gives back ≈ $0.06)

Profit is ≈ $1.29, and the crew gets almost twice that.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page + brand mark. Header (3 lines, **$10** on yellow). Footer: "ASSUMES $10 splits like Chipotle's FY2025 revenue (10-K) · an average, not your order". Total badge **$10.00**. Seven rows with labels and percentages: Food, drinks & packaging 29.6% · Crew pay 25.1% · Rent 5.2% · Ads, delivery & card fees 14.7% · HQ, wear & tear, new stores 9.1% · Tax − interest earned 3.4% · Profit **?**. Amount cells empty. Under the sheet, in coral, already typed: "$10 − $2.96 = **$7.04 profit?**". Pointer on row 1 | "Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?" |
| 0.8 | Row 1 amount swipes in: **≈ $2.96** (first payoff) | |
| 5.3 | The guess is struck through (buzz) and dims; it leaves as the pointer moves on (≈ 7.0) | "Not even close. Crew pay: ≈ $2.51." |
| 7.4 | Row 2: **≈ $2.51** | |
| 8.7 / 9.3 | Row 3: **≈ $0.52** | "Rent: ≈ 52 cents." |
| 10.5 / 13.2 | Pointer to row 4; **≈ $1.47** at 13.2 | "Ads, delivery, card fees and the rest: ≈ $1.47." |
| 14.7 / 17.8 | Row 5: **≈ $0.91** | "Head office, wear and tear, new stores: ≈ 91 cents." |
| 18.9 / 20.9 | Row 6: **≈ $0.34** | "Tax, minus interest earned: ≈ 34 cents." |
| 21.9 / 23.4 | Row 7 activates: its % turns from "?" to **12.9%**, then **≈ $1.29** lands on the blue goal highlighter | "What's left is profit: ≈ $1.29." |
| 24.9 | Check line types under the sheet: "$10.00 − $8.71 of costs = $1.29" (tick) | "Check: $10 minus $8.71 of costs." |
| 28.3 | Verdict: "Chipotle keeps **≈ $1.29** of your $10. / Not __$7.04__." (the kit's reveal cue) | "Not $7.04. Just ≈ $1.29." |
| 31.3-33.6 | The finished sheet holds (2.3 s); the last 0.7 s clears back to frame 1: amounts out, profit % back to "?", the coral guess back under the sheet (loop) | (none) |

### Guide VO script (9 lines, 74 spoken words ≈ 28.5 s at 2.6 words/s; read "≈" as "about")

> Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?
> Not even close. Crew pay: ≈ $2.51.
> Rent: ≈ 52 cents.
> Ads, delivery, card fees and the rest: ≈ $1.47.
> Head office, wear and tear, new stores: ≈ 91 cents.
> Tax, minus interest earned: ≈ 34 cents.
> What's left is profit: ≈ $1.29.
> Check: $10 minus $8.71 of costs.
> Not $7.04. Just ≈ $1.29.

### The maths

Each row's share is the 10-K dollar line ÷ total revenue (FY2025, $ thousands). On screen: the share to 0.1 pt, and $10 × the exact share to the cent.

| On screen | Formula and inputs | Exact | Shown |
|---|---|---|---|
| Food, drinks & packaging | 3,527,043 ÷ 11,925,601 | 29.5754% · $2.9575 | 29.6% · ≈ $2.96 |
| Crew pay | 2,991,680 ÷ 11,925,601 | 25.0862% · $2.5086 | 25.1% · ≈ $2.51 |
| Rent | 624,898 ÷ 11,925,601 | 5.2400% · $0.5240 | 5.2% · ≈ $0.52 |
| Ads, delivery & card fees (other operating costs) | 1,755,824 ÷ 11,925,601 | 14.7231% · $1.4723 | 14.7% · ≈ $1.47 |
| HQ, wear & tear, new stores (G&A + D&A + pre-opening + impairment) | revenue − the four lines above − operating income 1,935,798 = 1,090,358 | 9.1430% · $0.9143 | 9.1% · ≈ $0.91 |
| Tax − interest earned (provision for income taxes minus interest and other income) | 473,758 − 73,721 = 400,037 | 3.3544% · $0.3354 | 3.4% · ≈ $0.34 |
| (not shown) the provision alone | 473,758 ÷ 11,925,601 | 3.9726% · $0.3973 | would be ≈ $0.40, which is why the row is labelled net of interest |
| Profit (net income) | 1,935,798 + 73,721 − 473,758 = 1,535,761 | 12.8778% · $1.2878 | 12.9% · ≈ $1.29 (masked "?" until 23.1 s) |
| Totals | exact shares sum to 1; rounded cents 2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 + 1.29 = 10.00; shares 29.6 + 25.1 + 5.2 + 14.7 + 9.1 + 3.4 + 12.9 = 100.0 | | no plug |
| $10.00 total | the input | | $10.00 |
| "$10 − $2.96" → "$7.04 profit?" (the wrong guess, frame 1) | 10 − 2.96 | | $7.04 (exact on the shown numbers, so no ≈) |
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

> Nowhere near $7.
> Of your $10 at Chipotle, food, drinks and packaging take about $2.96 and the crew about $2.51, almost twice what Chipotle keeps. Rent, ads, delivery and card fees, head office and new stores, and tax (minus the interest Chipotle earns) take most of the rest, leaving about $1.29 of profit.
> Each line is that cost's share of Chipotle's 2025 revenue (FY2025 10-K and Q4 release, Feb 3 2026), applied to $10: a company-wide average, not your order. Educational math, not financial advice.
> #chipotle #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2025 ($ thousands): revenue 11,925,601. Food/bev/packaging 3,527,043 (29.58%) · labor 2,991,680 (25.09%) · occupancy 624,898 (5.24%) · other operating 1,755,824 (14.72%) · G&A + depreciation + pre-opening + impairment 1,090,358 (9.14%) · tax − interest earned 400,037 (3.35%: income tax 473,758 minus interest income 73,721) · net income 1,535,761 (12.88%). Per $10: $2.9575 / $2.5086 / $0.5240 / $1.4723 / $0.9143 / $0.3354 / $1.2878. Which chain's $10 next?

### Per-platform notes

- **YouTube Shorts:** use the 33.6 s master. Title: "Chipotle Keeps How Much of Your $10?" (a question the header does not already answer). No logo and no store footage, only the brand name in text. Frame 0 (the full sheet, the coral "$7.04 profit?", profit "?") is the cover.
- **Instagram Reels:** the master. The cover is the finished-sheet frame at ~30 s: the full dollar column plus the verdict, which works as a save-able cheat sheet, as with Yannick's finished sheet. Put the pinned comment's exact table in the first comment.
- **TikTok:** the master. Caption line 1 stays the verdict ("Nowhere near $7."); the $1.29 sits below the fold. The pinned "Which chain's $10 next?" feeds reply videos (The Debt Freedom Project's reply sticker earned 127.3x, H50).
- **All:** the voice-over starts on the first calculation with no greeting (H55, H76, H84).

---

## 05b · Becker Rig · Could you live on 50/30/20 with $3,000 a month take-home?

**Spec:** `studio/specs/05b-becker-rig-3000-paycheck.json` · 29.3 s · captions on
**Platform title:** Could You Live on 50/30/20 With $3,000 a Month Take-Home?
**On-screen hook (header):** Could you live on 50/30/20 / with **$3,000** a month take-home?

### Why this hook

**Modelled on:**
1. **H53, Yannick:** "Paycheck rules / That every family / Should follow" over the 60/25/15 sheet with "$5,000 → $3,000 / $1,250 / $750", **739,347 plays (40.7x med)**. This is the same object, a paycheck split into labelled piles. We drop the duty sticker (advice language) and bring the dollars forward from 25 s to 2.4 s.
2. **H18, ChartOrbit:** "Does investing 100$ monthly in BMW make you rich?", **1,391,731 views, 5.91x.** Its yes/no question grammar maps to "Could you live on 50/30/20…?": the viewer takes a side in second 1, and the answer depends on a number only they know (their rent).
3. **H84, Master Money:** "Take your salary and multiply it by 0.7…", **3,000,000 views, 140x.** The viewer can run it on their own pay. Here the participation device is the envelope shortcut: find 10%, then count pieces, and hold your rent up against 5 of them.

**Rules satisfied:**
- **R1:** "$3,000" in the header and on the slab at 0.0 s.
- **R2:** one dollar figure, no result. "50/30/20" is the rule's name.
- **R3:** the number the viewer swaps in is their own rent (and their own take-home, via the pinned recipe).
- **R4:** a take-home people earn.
- **R5:** "Could you live on…?" implies the belief that a standard rule fits a standard paycheck; the $1,500 for rent, food and every bill tests it.
- **R6:** "you" + $3,000 a month. "A month take-home" also removes the biweekly misread that "paycheck" invited next to 01a.
- **R7:** needs, wants and savings are named on the sheet.
- **R8:** 10 words.
- **R9:** three empty bins and 10 pieces.
- **R10:** the first dollar result ($300) at 2.4 s; the biggest piece (NEEDS, $1,500, the hook's number) first, at 5.4 s.
- **R11:** question on screen, verdict in the caption's first line ("Only if your rent fits in half.").
- **R12:** "Needs get $1,500: rent, food, every bill." Viewers answer with their own rent.

**The wrong belief it plays on:** "50/30/20 works on any normal paycheck." On $3,000 a month take-home, rent, food and every bill must fit in $1,500. Wants ($900) still beat savings ($600) by $300 a month ($10 a day); the wants pile itself is $900 a month, or $30 a day. A second, quieter belief is that you need a calculator for a percentage split. One cut by 10 does all three: 5 + 3 + 2 pieces of $300.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | White void + floor. Header (2 lines, **$3,000** on the hero highlight). Footer: "ASSUMES $3,000 a month take-home (after tax) · 30-day month". A gold slab "TAKE-HOME, A MONTH · **$3,000**" with the figure standing on it. Three bins on the floor: NEEDS 50% · WANTS 30% · SAVINGS 20%, each with a dashed fill line, amount slots empty | "$3,000. Saw it into ten: $300 each." |
| 1.0 | `saw` action: the figure raises the "÷ 10" cleaver (whoosh) while "$3,000 ÷ 10" types | |
| 2.4 | Slam: the slab cracks into **10 bricks of $300** (hit); working line "$3,000 ÷ 10 = $300" (first payoff) | |
| 4.6 / 5.4 | 5 bricks into NEEDS: **$1,500** lands on the gold plate (goal: impact kit); working line "5 × $300 · rent, food, bills" | "Needs get five: $1,500. Rent, food, every bill." |
| 8.8 / 9.6 | 3 bricks into WANTS: **$900** | "Wants get three: $900." |
| 11.5 / 12.3 | 2 bricks into SAVINGS: **$600** (green) | "Savings get two: $600." |
| 14.2 | Check line assembles where the slab was: "$1,500 + $900 + $600 = $3,000" | "Five, three, two. Ten pieces, $3,000." |
| 17.6 / 19.6 | Gag working line: "$900 ÷ 30 = $30 a day" | "$900 a month is $30 a day of fun." |
| 22.6 | Verdict: "Needs get **$1,500**: rent, food, every bill." (the kit's ding) | "So rent, food and bills must fit in $1,500." |
| 27.0-29.3 | Finished state holds (2.3 s), then loops to the whole slab | (none) |

### Guide VO script (7 lines, 64 spoken words ≈ 24.6 s at 2.6 words/s)

> $3,000. Saw it into ten: $300 each.
> Needs get five: $1,500. Rent, food, every bill.
> Wants get three: $900.
> Savings get two: $600.
> Five, three, two. Ten pieces, $3,000.
> $900 a month is $30 a day of fun.
> So rent, food and bills must fit in $1,500.

### The maths

| On screen | Formula and inputs | Result |
|---|---|---|
| $3,000 | example take-home, a month (input) | $3,000 |
| $300 (one tenth) | 3,000 ÷ 10 | $300 (exact) |
| Needs 50% · $1,500 · "5 × $300" | 0.50 × 10 = 5 pieces; 5 × 300 | $1,500 (exact) = half the take-home |
| Wants 30% · $900 · "3 × $300" | 0.30 × 10 = 3; 3 × 300 | $900 (exact) |
| Savings 20% · $600 · "2 × $300" | 0.20 × 10 = 2; 2 × 300 | $600 (exact) |
| Check "$1,500 + $900 + $600 = $3,000" | sum | exact |
| "$900 ÷ 30 = $30 a day" | 30-day month (footer) | $30 exactly. In an average 30.44-day month it is $29.57, which still rounds to $30 (checked) |
| (md only) wants − savings | 900 − 600 = $300 a month; ÷ 30 = $10 a day | $300 · $10 a day |
| `data.total.note` "10% = $300" | for a re-skin (clean-sheet prints it under the total; becker-rig ignores it and draws the cut) | exact |

No rounding anywhere, so no "≈" in this teaser.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| The 50/30/20 rule: 50% needs, 30% wants, 20% savings (incl. extra debt payments), applied to **after-tax** income | 50/30/20 of take-home | **Elizabeth Warren & Amelia Warren Tyagi**, *All Your Worth: The Ultimate Lifetime Money Plan* (2005), the primary source, as summarised by **Wealthsimple**, "50 30 20 rule". https://www.wealthsimple.com/en-us/learn/50-30-20-rule | **Citizens Bank**, "What is the 50/30/20 budget rule?" https://www.citizensbank.com/learning/monthly-budgeting-calculator.aspx · Musaffa Academy, "Simple 50/30/20 Budgeting Rule". https://academy.musaffa.com/simple-50-30-20-budgeting-rule-for-managing-your-money/ (all via search, Oct 7, 2026) |
| $3,000 take-home | example input, not a statistic | (none needed) | |

The book is the primary source. The page couldn't be opened here, so the definition rests on two independent summaries that agree.

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES $3,000 a month take-home (after tax) · 30-day month"

### Caption / description (verdict first)

> Only if your rent fits in half.
> On $3,000 a month take-home, 50/30/20 gives needs $1,500 (rent, food and every bill), wants $900 and savings $600. Wants beat savings by $300 a month, and $900 of wants is $30 a day.
> Shortcut: 10% of $3,000 is $300, so it's just 5 + 3 + 2 pieces.
> The rule (Elizabeth Warren and Amelia Warren Tyagi, All Your Worth, 2005) splits after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments. Educational math, not financial advice.
> #503020 #budgetmath #backoftheenvelope #moneymath

### Pinned comment

> Do yours in your head: take-home ÷ 10 (move the decimal one place). Needs = 5 of those, wants = 3, savings = 2. $2,400 → $240 → $1,200 / $720 / $480. $4,000 → $400 → $2,000 / $1,200 / $800. What's your rent, and does it fit in your 5 pieces?

(Pinned-comment check: 2,400 ÷ 10 = 240; ×5 = 1,200, ×3 = 720, ×2 = 480 (sum 2,400). 4,000 ÷ 10 = 400; ×5 = 2,000, ×3 = 1,200, ×2 = 800 (sum 4,000).)

### Per-platform notes

- **YouTube Shorts:** use the 29.3 s master. Title: "Could You Live on 50/30/20 With $3,000 a Month Take-Home?". Cover: frame 0 (the slab, the figure, three empty bins).
- **Instagram Reels:** the master. The pinned comment's swap-your-pay recipe plus "What's your rent?" is the comment engine: Yannick's "run the numbers with your own income" CTA drew 79 comments on 50,206 plays. No keyword-DM CTA.
- **TikTok:** the master. Sequel slots are cheap: $2,000 / $4,000 / $5,000 take-home, or Yannick's 60/25/15, in the same rig; rent replies can become reply videos.
- **Kit note (becker-rig split-sheet is built):** the first payoff is the tenth cut in `lookOpts.tenth` (t 2.4); `data.total.note` carries "10% = $300" for any kit that draws the sheet instead. `lookOpts.actions` lists the verbs: saw ÷ 10, then stack 5/3/2. `envelopes` is the one brand nod Becker idea 3 asked for. `gag` holds the $30-a-day line. NEEDS is the goal tone (gold plate), because it is the number the hook asks about.

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
4. **The spoken opener is the first calculation** (2.10's device; H55, H76, H84): "≈ $88.91 of your $100 just buys the stuff." Row 1 slams at 0.5 s and the hero starts counting down inside the scroll window.

**Caveat on the brand:** the benchmark's only Costco data point is a flop (H13, Costco hot dogs as a unit, 80,139, 1.44x), so the brand's pull is unproven here.

**Rules satisfied:**
- **R1:** "$100" in the header and the hero counter at "$100.00" at 0.0 s.
- **R2:** one dollar figure, no result. Row 3's % is masked, so the answer is not printed under the question.
- **R3:** your $100 cart.
- **R4:** a Costco run people actually make.
- **R5:** "ACTUALLY keep" implies the belief that the markup is fat.
- **R6:** "your $100".
- **R7:** the three piles are named on screen.
- **R8:** 9 words.
- **R9:** three "?" amounts, a "?" where row 3's % should be, and the hero counting down to what's left.
- **R10:** ≈ $88.91 at 0.5 s, biggest first.
- **R11:** question on screen; the caption's first line takes a side without spoiling the number ("Less than you'd think. Then look at the membership row.").
- **R12:** a lopsided verdict, "≈ $1.94 of your $100", and the card beats the cart, both on the verdict.

**The wrong belief it plays on:** "Costco makes its money marking up what's in my cart." Of every $100 rung up, ≈ $88.91 pays for the goods and ≈ $9.15 pays the staff and runs the warehouses. That leaves ≈ $1.94, under 2%, before tax. Membership fees bring in ≈ $1.99 per $100 of sales: $5,907M, more than the $5,778M the carts leave and about half (50.6%) of operating income. All in, Costco's operating income is ≈ $3.93 per $100 of sales (cart + cards) and its net income ≈ $3.10, which is why the verdict says what the cart *leaves*, not what Costco *keeps*.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Black bars, dark stage. Header (2 lines, **$100** in green). Footer: "Costco FY2026 · company-wide · before tax". Hero counter **$100.00** with a shopping-bag icon. The full bar, then three rows: The stuff itself 88.91% · ? / Staff & warehouses 9.15% · ? / Left for Costco **?** · ?. Label stack: "YOUR COSTCO RUN" | "≈ $88.91 of your $100 just buys the stuff." |
| 0.5 | Row 1 cut and slam: **≈ $88.91**; the slice splits off the bar; hero rolls down to **≈ $11.09**; footer: "$264,279M ÷ $297,247M × $100 ≈ $88.91" | |
| 4.9 / 5.3 | Row 2: **≈ $9.15**; footer: "$27,190M ÷ $297,247M × $100 ≈ $9.15". The hero holds ≈ $11.09 | "≈ $9.15 pays the staff and runs the warehouses." |
| 9.0 / 10.2 | Row 3: its % unmasks to **1.94%** and **≈ $1.94** lands (goal: hit + cash); hero rolls to **≈ $1.94**; footer: "$100 − $88.91 − $9.15 = $1.94 before tax" | "That leaves Costco ≈ $1.94." |
| 11.6 | Check: the label stack shows "$88.91 + $9.15 + $1.94 = $100.00" over YOUR COSTCO RUN; the slices re-join into one bar (cash) | "Less than 2% of your cart." |
| 14.6 / 16.0 | Bonus row slams in green: "Membership fees, per $100 of sales · **≈ $1.99**"; footer: "$5,907M ÷ $297,247M × $100 ≈ $1.99" (cash) | "Now add membership fees: ≈ $1.99 for every $100 shoppers spend." |
| 20.1 | Verdict: "Your cart leaves Costco **≈ $1.94**. / Your card brings in **≈ $1.99**." (the kit's reveal cue); footer: "fees $5,907M > what the cart leaves, $5,778M" | "Your card brings in more than your cart leaves." |
| 23.7-26.0 | Hold (2.3 s), then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (6 lines, 58 spoken words ≈ 22.3 s at 2.6 words/s; read "≈" as "about")

> ≈ $88.91 of your $100 just buys the stuff.
> ≈ $9.15 pays the staff and runs the warehouses.
> That leaves Costco ≈ $1.94.
> Less than 2% of your cart.
> Now add membership fees: ≈ $1.99 for every $100 shoppers spend.
> Your card brings in more than your cart leaves.

### The maths

Costco FY2026, the 52 weeks ended Aug 30, 2026, in $ millions. Net sales = total revenue − membership fees = 303,154 − 5,907 = **297,247** (reported as "$297.2 billion").

| On screen | Formula and inputs | Exact | Shown |
|---|---|---|---|
| The stuff itself (merchandise costs) | 264,279 ÷ 297,247 × $100 | 88.9089 | 88.91% · ≈ $88.91 |
| Staff & warehouses (SG&A) | 27,190 ÷ 297,247 × $100 | 9.1473 | 9.15% · ≈ $9.15 |
| Left for Costco, before tax | (297,247 − 264,279 − 27,190) = 5,778; ÷ 297,247 × $100 | 1.9438 | 1.94% (masked "?" until 10.2 s) · ≈ $1.94 |
| Rows add up | 88.91 + 9.15 + 1.94 = 100.00 | | no plug |
| Check "$88.91 + $9.15 + $1.94 = $100.00" | sum of the shown rows | | exact on shown numbers |
| Hero remaining | 100 − 88.91 = 11.09 (at 0.5 s); 11.09 − 9.15 = 1.94 (at 10.2 s, with row 3) | 11.0911 · 1.9438 | ≈ $11.09 · ≈ $1.94 |
| Footer step 3 | $100 − $88.91 − $9.15 = $1.94 before tax | | exact on shown numbers |
| "Less than 2%" (VO) | 1.9438% < 2% | | true |
| Membership fees per $100 of sales | 5,907 ÷ 297,247 × $100 | 1.9872 | ≈ $1.99 |
| "fees $5,907M > what the cart leaves, $5,778M" | 5,907 > 5,778 | | true |
| Operating income (consistency) | 303,154 − 264,279 − 27,190 = 11,685 = 5,778 + 5,907 | | reported $11.69B (checked) |
| Operating income per $100 of sales (why the verdict avoids "keeps") | 11,685 ÷ 297,247 × $100 | 3.9311 | ≈ $3.93 (md only) |
| Caption: fees ≈ half of operating income | 5,907 ÷ 11,685 = 50.6% | | |
| Pinned: net income per $100 of sales | 9,226 ÷ 297,247 × $100 = 3.104 | | ≈ $3.10 |
| Robustness: FY2025 shows the same | 269.9B − 239.886B − 24.966B ≈ 5.0-5.1B < membership 5.323B | | the verdict is not a one-year fluke (checked) |

### Sources

| Input | Value used | Source 1 | Source 2 (independent) |
|---|---|---|---|
| Net sales FY2026 | $297.2B (+10.1%); derived $297,247M | **Costco**, "Costco Wholesale Corporation Reports Fourth Quarter and Fiscal Year 2026 Operating Results", Sept 24, 2026 (8-K ex. 99.1). https://investor.costco.com/news/news-details/2026/Costco-Wholesale-Corporation-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Operating-Results/default.aspx · PDF: https://s201.q4cdn.com/287523651/files/doc_news/Costco-Wholesale-Corporation-Reports-Fourth-Quarter-and-Fiscal-Year-2026-Operating-Results-2026.pdf · SEC: https://www.sec.gov/Archives/edgar/data/0000909832/000090983226000084/costex9918-k92426.htm | **The Shelby Report**, "Costco Q4 Comp Sales Up 9.4%; FY26 Net Sales Hit $297.2B" (Oct 4, 2026). https://theshelbyreport.com/2026/10/04/costco-q4-comp-sales-up-9-4-fy26-net-sales-hit-297-2b/ · **Pulse 2.0**, "Costco Reports $93.9 Billion In Q4 Sales And $297.2 Billion In Fiscal 2026 Sales As Net Income Reaches $9.2 Billion". https://pulse2.com/costco-reports-93-9-billion-in-q4-sales-and-297-2-billion-in-fiscal-2026-sales-as-net-income-reaches-9-2-billion/amp/ |
| Total revenue | $303,154M | Release / FY2026 financials (search result text) | **Beancount.io**, "Costco FY2026: $303B Revenue, Membership Fees Half of Profit" (Sept 26, 2026). https://beancount.io/blog/2026/09/26/costco-fy2026-earnings-analysis · StockAnalysis revenue page: https://stockanalysis.com/stocks/cost/revenue/ |
| Membership fees | $5,907M (FY2025: $5,323M) | Release | Beancount.io ("$5.91 billion"); the total revenue − net sales identity |
| Merchandise costs · SG&A | $264,279M · $27,190M (FY2025: $239,886M · $24,966M) | **Costco FY2026 Form 10-K**, consolidated statements of income (filed Oct 6, 2026; accession 0000909832-26-000093). https://www.sec.gov/Archives/edgar/data/0000909832/000090983226000093/cost-20260830.htm (read via search result text; the same lines are in the Sept 24 release) | Identity: 303,154 − 264,279 − 27,190 = 11,685 = the independently reported operating income of **$11.69B** (Beancount.io / StockAnalysis) |
| Net income (pinned only) | $9,226M ($20.76/share) | Release | Pulse 2.0 ("Net Income Reaches $9.2 Billion") |
| What merchandise costs and SG&A include | Merchandise costs: "the purchase price of inventory sold, inbound shipping charges and all costs related to the Company's depot operations, including freight from depots to selling warehouses, … reduced by vendor consideration", plus "salaries, benefits and depreciation on production equipment in certain fresh foods and ancillary departments". SG&A: mainly wages and benefits, plus warehouse operating costs | **Costco Form 10-K** accounting policies (FY2026 10-K above; the same policy wording is in Costco's earlier 10-Ks, e.g. FY2011: https://www.sec.gov/Archives/edgar/data/0000909832/000119312511271844/d203874d10k.htm and FY2025: https://www.sec.gov/Archives/edgar/data/909832/000090983225000101/cost-20250831.htm) | (definition, not a figure). This is why row 1's note reads "what Costco paid + freight + fresh-food prep", and why "Staff & warehouses" is not all the staff |

Note: The Shelby Report also ran "Costco Caps FY26 With $297.3B In Sales, Up 10.2 Percent" (Sept 15, 2026). That is the monthly retail-sales report for the retail fiscal year, not the income statement. We use the income-statement net sales.

The FY2026 10-K was filed on Oct 6, 2026 (search, Oct 7, 2026), so it is cited as source 1 for merchandise costs, SG&A and the cost definitions; the Sept 24 release remains the source for net sales, total revenue, membership fees and net income, which the 10-K repeats.

### Assumptions (footer, on screen from 0.0 s)

"Costco FY2026 · company-wide · before tax". Every line is a company-wide total divided by company-wide net sales and applied to $100, before interest and income tax. It is not one receipt, and not a markup on any item. Once the footer turns into the working (from 0.5 s), "before tax" comes back on footer step 3, the moment ≈ $1.94 lands.

### Caption / description (verdict first)

> Less than you'd think. Then look at the membership row.
> Of every $100 rung up at Costco in fiscal 2026, about $88.91 paid for the goods and about $9.15 paid the staff and ran the warehouses, leaving about $1.94 before tax.
> Membership fees brought in $5.9B, about $1.99 per $100 of sales: more than the carts left over, and about half of Costco's operating income.
> Source: Costco FY2026 Form 10-K (filed Oct 6, 2026) and Q4 / fiscal 2026 results (Sept 24, 2026), 52 weeks ended Aug 30, 2026. Company-wide averages, not your receipt. Educational math, not financial advice.
> #costco #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2026 ($ millions): net sales 297,247 (= total revenue 303,154 − membership fees 5,907). Merchandise costs 264,279 (88.909%) · SG&A 27,190 (9.147%) · left 5,778 (1.944%). Membership fees 5,907 = 1.987% of sales. Operating income 11,685 = 5,778 + 5,907. Net income 9,226, about $3.10 per $100 of sales after interest and tax. Which store's $100 next?

### Per-platform notes

- **YouTube Shorts:** use the 26.0 s master. The title is the question, and the brand name is in text only (no logo, no store footage). Frame 0 (hero $100.00, three "?" rows, row 3's % masked) is the cover.
- **Instagram Reels:** the master. Cover: the verdict frame (≈ $1.94 against ≈ $1.99). Tag nobody, and don't use brand handles in the caption.
- **TikTok:** the master. The membership twist is the comment hook ("so the card is the product?"). Keep the caption's first line as the verdict.
- **Kit note (scoreboard split-sheet is built):**
  - `lookOpts.hero: "remaining"` makes the hero count down what's left, landing on the `remaining[].display` strings, each synced with the part at the same t (0.5 s with row 1, 10.2 s with row 3).
  - `footerSteps` carries the one-line working per beat, as in 03c.
  - `data.check` drives the kit's sum-check beat (sum line in the label stack, slices re-joining, cash cue).
  - `bonus` is the membership row; it is not a part, because it is not in your $100.
  - `maskPct: [2]` keeps row 3's % as "?" until its cut.
  - The bag icon is in every kit's icon list.

---

## Open items

1. **Re-open the primary pages before publishing.** Page fetches were blocked (sec.gov again in this revision), so every figure was read from search-result text for those pages. In particular:
   - Chipotle's labor ($2,991,680K), occupancy ($624,898K) and other operating costs ($1,755,824K) rest on round 1's read of the release. Round 2 re-confirmed their 10-K percentages (25.1 / 5.2 / 14.7) but not the thousands. Within the published 0.1-pt rounding, their cents could each move by ±1¢. The shown rows would then need re-balancing to keep the $10.00 total.
   - Costco's merchandise costs (264,279) and SG&A (27,190) are now attributed to the FY2026 10-K by search, and the operating-income identity ($11.69B, from separate sources) agrees to the million. Re-run the check against the 10-K's own table once it can be opened.
2. **Two kit options were added for this format in this revision** and are documented in the kit READMEs: `lookOpts.maskPct` (clean-sheet and scoreboard `split-sheet`) and a frame-1 `wrongGuess` (`t <= 0`, clean-sheet). A kit rebuild must keep them, or 05a/05c lose their frame-1 hook (the sheet would still render, just with the goal % printed and the guess typed late).
3. **05c replaced the gasoline seed** (reasons at the top). If the owner still wants gasoline, it needs one unblocked read of EIA's "Gasoline and Diesel Fuel Update" components box (crude / refining / distribution & marketing / taxes for the latest month). The same Scoreboard spec structure then works with 4 parts.
4. **Slate overlap, for the owner:** 05c (Costco, what your $100 leaves) and 08a (Costco hot dogs as a unit) share the brand and the Scoreboard look, and both touch membership. Keep both only if a Costco pair is wanted; otherwise 05c can move to another look, or to another retailer whose 10-K splits the same way.

## Search log (16 in total: 12 in round 1, 4 in this revision)

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
| 13 | Costco FY2026 10-K: merchandise costs 264,279, SG&A 27,190 | 05c: the FY2026 10-K (accession 0000909832-26-000093) carries both lines |
| 14 | Costco 10-K "merchandise costs consist of…" | 05c: cost definitions (purchase price, inbound shipping, depot costs, fresh-food and ancillary department wages) |
| 15 | Costco FY2026 10-K: operating income, net income, membership fees | 05c: net income $9.226B, operating income $11.7B, fees $5.9B (+11.0%), net sales $297.2B |
| 16 | Costco 10-K filing date | 05c: filed Oct 6, 2026 |
(The sec.gov page fetch was tried once and refused by the egress proxy; it is not counted as a search.)

---

## Review log (revision of 2026-10-07)

Every issue from the verifier (V) and the hook judge (J), and what was done. After the changes: maths check **481 checks, 0 failures**; studio linter **3/3 clean, 0 warnings** (plus the four clean-sheet and scoreboard split-sheet samples); `node --test` 6/6. Every changed beat was inspected in rendered stills.

### Verifier

| # | Sev. | Teaser | Issue | What I did |
|---|---|---|---|---|
| V1 | must | 05a | Row 6 "Income tax ≈ $0.34" is wrong: the provision is ≈ $0.40 per $10; $0.34 is tax minus interest income, and the explaining note is hidden by the layout | Renamed the row **"Tax − interest earned"** (pct 3.4%, ≈ $0.34 unchanged), and the VO line to "Tax, minus interest earned: ≈ 34 cents." (t 18.9, d 2.8). I did not use "Net tax": on its own it reads as "after tax". The two-line "Tax, minus interest earned" pushed the check line off the sheet in the clean-sheet layout solver (render at 26.5 s), so the label is the one-line form, which keeps the check line (render at 27.0 s). Beat sheet, VO script, maths table (with the provision-alone row, ≈ $0.40), wrong-belief list and pinned comment changed to match. The check script now fails if row 6's label or VO stops mentioning interest, and records that tax alone would be $0.40. |
| V2 | must | 05a | Captions show rounded amounts without "≈" | Every rounded VO amount now carries "≈" (read "about"): $2.96, $2.51, 52 cents, $1.47, 91 cents, 34 cents, $1.29 (twice). $7.04, $10 and $8.71 stay bare: exact on the shown numbers. Durations re-fitted at 2.6 words/s with "≈" counted as a word (Rent d 1.6). New check rule for all three specs: every spoken number carries "≈" if and only if it is a rounded result. |
| V3 | must | 05c | Captions show rounded amounts without "≈" | "≈ $88.91 of your $100 just buys the stuff.", "≈ $9.15 pays the staff and runs the warehouses.", "That leaves Costco ≈ $1.94." (d 2.4), "Now add membership fees: ≈ $1.99 for every $100 shoppers spend." (d 5.4). The guide VO script matches. |
| V4 | must | 05c | Verdict "Costco keeps ≈ $1.94 of your $100" misstates what Costco keeps (≈ $3.93 operating, ≈ $3.10 net per $100) and contradicts the twist | Verdict is now **"Your cart leaves Costco ≈ $1.94. / Your card brings in ≈ $1.99."**, matching the VO at 20.1 and footer step 5. The header keeps "keep", so "before tax" now returns on footer step 3 ("$100 − $88.91 − $9.15 = $1.94 before tax") as ≈ $1.94 lands. The (b) table, beat sheet and wrong-belief paragraph changed to match. Checks: the verdict must not contain "keep"; "before tax" must be on screen at the goal beat; operating income per $100 = $3.93 is recorded. |
| V5 | must | 05b (md) | "$300 … which is $30 a day" is wrong ($300 = $10 a day) | The wrong-belief paragraph now reads "Wants ($900) still beat savings ($600) by $300 a month ($10 a day); the wants pile itself is $900 a month, or $30 a day." The caption was rewritten for the new hook and keeps the two figures apart. The check script records ($30, $10) a day. |
| V6 | should | 05c | Hero lands on ≈ $1.94 at ~6.2 s, about 4 s before the VO says it | `lookOpts.remaining[1].t` is 10.2: the hero lands with row 3, footer step 3 and the goal cue, under "That leaves Costco ≈ $1.94." Between 5.3 and 10.2 the hero holds ≈ $11.09 while row 2 slams ≈ $9.15 (render at 7.0 s). The check anchors `remaining[1]` to the spoken "$1.94". |
| V7 | should | 05b | Linter error (contrast of "÷ 10") and the "50%" / "30%" labels printed over the bricks; md claimed "3/3 clean" | Re-ran the linter: **0 errors, 0 warnings**. The becker-rig kit builder had already rebuilt `formats/split-sheet.js` at 16:57: the cleaver's "÷ 10" is now light-on-dark (legible, no contrast error), and each % sits on a white tag with an ink border, legible over the bricks (renders at 6.5, 11.0 and 24.0 s). I did not edit that kit file, since its owner was still working on the becker-rig kit; the "÷ 10" tag stays in the figure's hand until the bricks are stacked, which reads as his tool rather than as stale working. The md's linter line states the re-run result. |
| V8 | should | 05c | No `data.check`; the remainder lived only in `lookOpts.footerSteps`, so the kit's sum-check beat never fired | Added `"check": "$88.91 + $9.15 + $1.94 = $100.00"` (exact on the shown numbers) at `checkT` 11.6, on "Less than 2% of your cart." The render at 12.5 s shows the sum line in the label stack and the slices re-joined. `footerSteps[2]` keeps the remainder working. |
| V9 | should | 05c | Sources cite the FY2026 10-K as "due" though it was filed Oct 6, 2026 | Cited the FY2026 10-K (accession 0000909832-26-000093, cost-20260830.htm) as source 1 for merchandise costs, SG&A and the cost definitions (searches 13-16; sec.gov itself is blocked, so via search text plus the operating-income identity). Deleted the old Open item 2. Caption source line updated. |
| V10 | nit | 05c | Row 1 note understates merchandise costs | Note is now "what Costco paid + freight + fresh-food prep"; the Sources table quotes the 10-K policy (inbound shipping, depot costs, and wages and benefits in fresh-food and ancillary departments), so "Staff & warehouses" is flagged as not all the staff. |
| V11 | nit | 05a, 05c (+05b) | Buzz before the refutation; spec sfx doubling kit cues | 05a: buzz moved to 5.3 = `strikeT` = "Not even close."; the verdict ding dropped (the clean-sheet chrome cues "reveal"). 05c: dropped roll ×2, the thud at the goal and the verdict ding (all cued by the kit); kept one `cash` at the membership row (16.0, on "$1.99"), an extra cue the kit does not make there. 05b: dropped the verdict ding too (the becker-rig chrome cues a ding at the verdict); kept whoosh and hit, which the kit de-duplicates. |
| V12 | nit | 05a, 05c | Three VO lines tight once numbers are spoken | 05a: the "$7.04?" question is now inside vo[0] (13 words, d 5.1); "Not $7.04. Just ≈ $1.29." d 3.0. 05c: "That leaves Costco ≈ $1.94." d 2.4. |
| V13 | nit | 05c | % = $ on a $100 base, so frame 1 printed "Left for Costco 1.94%"; duplicate Costco/Scoreboard with 08a | Row 3's % is masked ("?") until its cut at 10.2 (`lookOpts.maskPct: [2]`, render at 0.0 s). The 08a overlap is flagged at the top and in Open item 4 for the owner. |
| V14 | nit | 05b | First payoff only in `lookOpts.tenth`; verdict hides captions | Added `data.total.note: "10% = $300"`, which a clean-sheet re-skin prints under the total (becker-rig ignores it and draws the cut). Part 0 stays at 5.4 s: NEEDS is the hook's number and lands right after the $300 cut. The verdict is now on the last VO line, so only that line is uncaptioned, and the verdict says the same thing. |

### Hook judge

| # | Teaser | Judge's score / issue | Decision |
|---|---|---|---|
| J1 | 05a | 7. Rewrite: "Really" in the header; the coral wrong guess on screen at t 0.0; profit % "?" until its beat; VO1 + VO2 merged; title "Chipotle Keeps How Much of Your $10?"; caption line 1 "Nowhere near $7." | **Adopted in full**: it is stronger and honest (the guess is labelled with "?", struck at 5.3 s). It needed two clean-sheet kit additions, both optional and documented: `wrongGuess.t <= 0` (typed and landed at frame 1; the loop reset puts it back so the last frame matches frame 1) and `lookOpts.maskPct`. The merged opener is "Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?" (with "≈" per V2). Runtime grew from 31.0 to 33.6 s. My estimate after the change: **8**. |
| J2 | 05b | 5, **must**: the hook answers itself (WANTS 30% beside $3,000), R5 fails, R12 is just 30 > 20. Rewrite: "Could you live on 50/30/20 / with **$3,000** a month take-home?", rent tension, NEEDS first by ~6 s, verdict "Needs get **$1,500**: rent, food, every bill.", caption "Only if your rent fits in half.", pinned "What's your rent?" | **Adopted**, with one change: I kept "$3,000. Saw it into ten: $300 each." as the first VO line rather than opening on "Half your $3,000 has to cover rent, food and every bill.", because that opener runs 5 s and would push the first dollar payoff ($300, R10) past 3 s. The rent line now ends the second VO line, "Needs get five: $1,500. Rent, food, every bill.", with NEEDS landing at 5.4 s (by ~6 s as asked). Then $900 / $600, the check, "$900 a month is $30 a day of fun.", and the closing line "So rent, food and bills must fit in $1,500." under the verdict. NEEDS is now the goal tone (gold plate), and the footer reads "$3,000 a month take-home (after tax)". Same maths, no new data. Estimate: **7**. |
| J3 | 05c | 7. Rewrite: keep the header; row 3 "?" until 10.2; VO1 opens on "$88.91 of your $100 just buys the stuff." with row 1 at ~1.0 s; verdict "Costco keeps ≈ $1.94 of your $100 / Membership fees: ≈ $1.99"; caption line 1 "Less than you'd think. Then look at the membership row." | **Adopted, except the verdict wording**: the judge's "Costco keeps ≈ $1.94" is the factual error V4 flags, so the two-line verdict carries the same two numbers as "Your cart leaves Costco ≈ $1.94. / Your card brings in ≈ $1.99." Row 1 lands at 0.5 s rather than 1.0 s so it stays within 0.8 s of the spoken "$88.91" (the check's timing rule). Header kept, as the judge advised. Estimate: **7.5**: the frame-1 spoiler and the empty opener are fixed; the brand's pull is unproven (H13) and the 08a overlap remains for the owner. |
| J4 | 05a + 05c | should: frame 1 prints the goal row's %, which answers the header | `lookOpts.maskPct` added to the clean-sheet and scoreboard `split-sheet` modules (a right-aligned "?" over the measured real %, so the layout does not move; it unmasks as the row activates or at the part's cut). 05a masks row 6 (Profit), 05c row 2 (Left for Costco). Kits that ignore the flag still show the full sheet. |
| J5 | 05a | should: the wrong answer arrives after the scroll window | See J1: it is on screen at 0.0 s and voiced inside the first line. |
| J6 | 05c | should: VO1 restates the header; the twist is missing from the verdict | See J3: the opener is the first calculation, and the verdict carries both the cart and the card. |
