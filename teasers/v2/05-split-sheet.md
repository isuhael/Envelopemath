# 05 · Split sheet: three teasers

**Format:** `split-sheet` (rank 5 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P9**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews), hook pass 1 on 2026-10-08 (05b and 05c kept), **hook pass 2 on 2026-10-08 (05b and 05c rewritten: rewrite A adopted for both)**, then the assembly pass on 2026-10-08 (the three teasers fitted, rendered and fixed frame by frame; no figure changed), then the **QA fix pass on 2026-10-08** (05a retimed to 24.7 s with a big verdict lockup; 05b's header answer slot, needs bracket and retime; 05c's landings put on the spoken numbers, the hero tagged and rolled to ≈ $3.93 at the verdict), then the **port to Becker Rig on 2026-10-08** (the owner kept Scoreboard and Becker Rig and retired Clean Sheet, so 05a moved to Becker Rig: same hook, numbers, VO lines and verdict, restaged with the figure carving the $10 slab; its Clean Sheet spec is in `studio/specs/retired/`), then the **QA fix pass on the Becker Rig port on 2026-10-08** (05a: the climax is one beat, a "PROFIT ≈ $1.29" payoff slab bookends the "YOUR ORDER $10.00" slab, the slab's remainder carries the "$7.04?" guess, the lanes end as a bar chart of the $10, and the footer is one line; no number, VO line or verdict changed). 05a was in neither hook pass. What changed and why is in the "Review log" at the end.
**Specs:**
- [`studio/specs/05a-becker-rig-chipotle-10.json`](../../studio/specs/05a-becker-rig-chipotle-10.json) (24.7 s; Becker Rig since the port, was [`05a-clean-sheet-chipotle-10.json`](../../studio/specs/retired/05a-clean-sheet-chipotle-10.json))
- [`studio/specs/05b-becker-rig-3000-paycheck.json`](../../studio/specs/05b-becker-rig-3000-paycheck.json) (22.1 s; the file stem keeps "3000-paycheck", the $3,000 take-home on the slab, so links stay valid)
- [`studio/specs/05c-scoreboard-costco-100.json`](../../studio/specs/05c-scoreboard-costco-100.json) (22.8 s)

**Maths check:** [`checks/05-split-sheet.py`](checks/05-split-sheet.py). It recomputes every on-screen number from the sourced inputs, then checks every digit-bearing display string in the three specs against the computed, formatted value. A digit-bearing string the script does not know is a failure. It also checks every number in every VO line, including number words such as "five" and "ten", and that numeric fields agree with their display strings (`value`, `share`). Further checks:
- "≈" sits on every rounded amount and on no exact one, **on screen and in the VO text** (captions are on, so the VO is on screen too).
- The shown parts add up to the total with no plug.
- The contract shape, and hook rules R1, R2, R8 and R10.
- Timing: VO at 2.6 words/s ("≈" counts as a spoken word, "about"), no overlapping lines, and every beat, look option and sfx anchored to the word that voices it. A beat may land up to 0.8 s before the spoken number and 0.2 s after it. 05a's wrong guess is checked as a frame-1 element that the first VO line voices (since the Becker Rig port, the ghost in the header's answer slot); 05a's check line is a silent beat between the profit landing and the verdict.
- **Landing, not just the cut (fix pass, 05c):** the scoreboard kit rolls a number in after its cut, so the script recomputes each row's landing the way the kit does (cut + 0.18 s + roll, `lookOpts.rolls`) and the verdict hero's (t + 0.04 + 1.1 s), and holds each landing to the spoken number (from 0.15 s before it starts to 0.15 s after it ends). Each footer working must land with its row, and the hero's LEFT counter must roll with the row it subtracts. 05b's check line may lead its VO line by up to 0.6 s.
- The masked percentage (`lookOpts.maskPct`) sits only on the goal row (05a), or on every row (05c since hook pass 2, so no cart dollar is printed at frame 1); the goal row is always masked.
- The header's one dollar figure is the input the viewer holds up against their own: the total, or 05b's rent (whose row repeats it and is exempt from "no result in the header"). 05b's bricks must be whole (share × 10), or the kit drops them.
- Labels that carry a fact: 05a's tax row must say it is net of interest; 05c's header and verdict must not say "keep", "before tax" must be on screen when ≈ $1.94 lands, and the membership row must be on the sheet at frame 1.
- Assembly pass: 05a's two hook nudges must land on the spoken "$10" and "$7.04", each row must activate as its VO line names it (and before its amount lands), and the struck guess must stay up until the right answer replaces it (since the port: in the header slot, struck on "Not even close" by his stomp, replaced on the verdict's "Not $7.04"; every scripted figure beat sits on the word it acts out; since the Becker Rig QA pass, the slab's "$7.04?" label must be the slot's guess and appear once food has dropped, the PROFIT payoff slab must be the profit row's label and amount and stamp with it, and the silent check must be fully in 0.1 s before the verdict, by the kit's carve timing); 05b's closing payoff slab must read the header's answer in its unit ("$10 a day") and land on the spoken "$10"; 05c's return to the membership row must sit on the start of the line that names it.
- Fact identities and the robustness of each verdict.

Result: **554 checks, 0 failures, exit 0** (after the Becker Rig QA fix pass of 05a; 544 after the port, 531 after the QA fix pass, 512 after the assembly pass, 494 after hook pass 2, 481 before). The Becker Rig QA pass's in-memory mutation test caught **11 of 11**, and the port's caught **12 of 12** (both listed in their Review log entries). The fix pass's in-memory mutation test caught **12 of 12**: the pre-fix 05c spec, 05c with the kit's default rolls (rows land late), footer step 3 back at the cut, a $3.94 hero, the LEFT counter rolling with row 3, a bare "$3.93" caption, 05b's slot filling late, "= 4 bricks", a "$11" slot, 05a's check after the verdict, 05a's row 1 lit at frame 1, and "$7.40" in 05a's verdict. In the round-2 mutation test, eight broken copies each failed with exit 1: a missing "≈" in a caption, "≈" on an exact $10, "Costco keeps" back in the verdict, the row label back to "Income tax", the wrong guess moved off frame 1, the mask on a non-goal row, the hero landing on ≈ $1.94 early, and "before tax" dropped from footer step 3. Hook pass 2's in-memory mutation test of the new 05b and 05c specs caught **10 of 10** (food row $310, "$11 a day" in a VO line, the rent landing off "four", $3,000 back in the 05b header, 8 bricks, 05c masking only the goal row, the membership row moved off frame 1, "Costco keeps" in the verdict, $11,686M in footer step 5, a bare "$1.94" in a caption).
**Studio linter:** `node src/cli.mjs check specs/05*.json` gives **3/3 clean, 0 errors, 0 warnings** after the fix pass, and again after the Becker Rig port and its QA fix pass (05a also clean at a 0.05 s step) (the assembly pass removed hook pass 2's one warning, 05b's "=" at 38.7 px mid-pop at 14.5 s: the check tokens now pop from at least 41 px). (Round-2 note: the four kit samples for split-sheet in clean-sheet and scoreboard are also clean, and `node --test` passes 6/6). All three kits now implement `split-sheet`; renders of every beat were inspected for this revision.
**Web searches used:** 12 in round 1 + 4 in this revision (see the search log). The egress proxy blocks page fetches (eia.gov in round 1, sec.gov again today), so every figure rests on the search engine's result text for the named primary page. Each figure is cross-checked against a second, independent source or an accounting identity (see each Sources table).

**One topic changed: 05c.** The seed was "Where your $100 of gasoline goes" (EIA price components). It could not be verified:
- EIA's monthly breakdown page cannot be fetched.
- Three searches returned three inconsistent splits: "Nov 2025: crude 47 / refining 16 / distribution 20 / taxes 17", "March 2026: 57 / 21 / 8 / 14" and "May 2026: 51 / 20 / 11 / 18", none of them traced to the EIA page itself.
- 2026 pump prices spiked ($4.354 on Oct 5, 2026, per EIA's weekly series via search), so any older month would mislead today's viewer.

Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 05c became **"How much of your $100 does Costco actually keep?"** (since hook pass 2: "Is Costco's profit all membership fees? Follow your $100 cart", same sheet and same figures). It stays inside lane 5, one round sum split into every share in dollars, and every input sits in Costco's FY2026 Form 10-K (filed Oct 6, 2026) and its Sept 24, 2026 results release. A second pivot, the S&P 500 version of the benchmark's own ETF grid, was tried first and dropped: individual index weights for Sep 30, 2026 were not retrievable (1 search). **Slate overlap to flag:** 08a (lane 8) is also Costco on the Scoreboard look (hot dogs as a unit, with a membership beat). The topics differ, but the owner will see the same brand in the same look twice (Open item 4).

---

## (a) The format in 5 lines

1. **What it is.** Take one round sum the viewer owns ($10, $3,000, $100). The whole sheet is on screen at frame 1, with every label and percentage except the goal row's, which reads "?" until its beat (otherwise it would answer the header at 0.0 s). 05c masks every row, because on a $100 base each percentage is its dollar amount. A pointer (or the figure) walks it and each percentage turns into dollars. A remainder line closes it, and the check line proves it adds up.
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
5. **What we add.** The first dollar lands by 3 s (0.8 s / 1.2 s / ≈ 0.9 s, not 25 s). Every rounded amount carries "≈" and its working, on the sheet and in the captions. Each sheet closes on a check line (05a, 05b, 05c) and a remainder line (05c's footer). The verdict busts one wrong belief the viewer already holds:
   - "they keep $7 of my $10" (on screen at frame 1, then struck)
   - "my rent is under half my take-home, so 50/30/20 works" ($1,200 of $3,000 leaves food and every bill $10 a day)
   - "Costco's profit is all membership fees" (the fees row is on screen at frame 1; the cart turns out to make almost as much)

**Hook grammar we steal (P9):** "What You're [Buying / Paying For] When You [Invest / Spend] $[round sum] [in / at X]:" (H70), with R5's one-word device ("Really", from H84's "What You Actually Make"). For variety, the other two teasers open on a yes/no question (H18) that keeps the P9 sheet underneath. 05b asks "Rent **$1,200** on 50/30/20? Food and every bill get this much a day:", where the viewer's own rent is the input and the answer is a per-day unit (P8). 05c asks "Is Costco's profit all membership fees? Follow your **$100** cart:", busting a factoid in H31's "NOT EMI" style. We avoid duty stickers ("rules every family should follow"), which would be advice language here.

---

## (b) The three teasers at a glance

| | 05a | 05b | 05c |
|---|---|---|---|
| Look | Becker Rig (ported from Clean Sheet, 2026-10-08) | Becker Rig | Scoreboard |
| Round sum | $10 at Chipotle | $3,000 a month after tax, with $1,200 rent | $100 at Costco |
| Parts | 7 (food · crew · rent · ads/delivery/fees · HQ/wear/new stores · tax − interest earned · profit) | 4 bins in $300 bricks (rent 4 · food + every bill 1 · wants 3 · savings 2) | 3 (goods · staff & warehouses · left from your cart) + the membership-fee row |
| On-screen hook (t = 0) | What You're Really Paying For / When You Spend **$10** / at Chipotle: | Rent **$1,200** on 50/30/20? / Food and every bill get / this much a day: | IS COSTCO'S PROFIT / ALL MEMBERSHIP FEES? / FOLLOW YOUR **$100** CART: |
| Words in hook | 11 | 13 | 10 |
| Number at 0.0 s | $10 (header) · the wrong guess "$7.04 profit?" in red in the header's answer slot · $10.00 (slab) · six percentages (profit "?"; labels dim, row 1 lights at 0.4 s, so the guess and the slab are frame 1's only loud figures) | $1,200 (header) · the header's dashed answer slot "$?" · $3,000 (slab) · RENT 40% / FOOD + BILLS 10% / WANTS 30% / SAVINGS 20% | $100 (header) · hero "$100.00" · one solid "$100.00" bar · membership fees ≈ $1.99 per $100 of sales (landed) · three cart rows all "?" |
| First payoff | ≈ $2.96 at 0.8 s | $3,000 ÷ 10 = $300, 10 bricks, at 1.2 s | ≈ $88.91 lands at 0.93 s, on the spoken number (cut at 0.25 s; the hero rolls to LEFT ≈ $11.09 with it) |
| Wrong belief busted | "Chipotle keeps the other $7.04" | "rent under half my take-home is fine under 50/30/20" | "Costco's profit is all membership fees" |
| Verdict (screen) | Chipotle keeps / **≈ $1.29**, not $7.04. (64 px, green swoosh under ≈ $1.29, $7.04 in red); on the same word the header slot's struck guess is stamped over: "at Chipotle: **≈ $1.29 profit**" | $1,200 rent leaves food and / every bill **$10 a day**. | Not all fees: your cart leaves **≈ $1.94**. / Membership fees: **≈ $1.99**. (the hero rolls to PROFIT PER $100 ≈ $3.93 above it) |
| Runtime | 24.7 s | 22.1 s | 22.8 s |
| Closest benchmark hook | H70, 221,830 (+ H84's "Actually", 3M, 140x) | H84, 3M, 140x (run it on your own number) + H04, 9.9M, 106.16x (a unit on screen) + H49, 382,100, 289.1x (small daily verdict) | H31, 578,461 ("NOT EMI" myth-bust) + H18, 1,391,731, 5.91x (yes/no) + H70 |

**Display convention (all three):**
- **Percentages** are shares of the round sum to the precision the source reports: 0.1 pt for Chipotle (its 10-K's own precision) and exact for 50/30/20. Costco's go to 0.01 pt so that, on a $100 base, the percentage and the dollar amount read the same and add to exactly 100.00. Because that makes the goal row's % its dollar answer, the goal row's % is masked ("?") until its beat in 05a, and in 05c every row's % is masked until its cut (`lookOpts.maskPct`; a kit that ignores it shows the full sheet, as the contract asks).
- **Dollar amounts** are the exact share × the sum, rounded to the cent and marked "≈", on the sheet and in the VO captions. The 50/30/20 amounts and 05b's $10 a day (in the footer's 30-day month) are exact, so they carry no "≈". Figures that are exact on the shown numbers ($10 − $2.96 = $7.04; the $8.71 of costs; the check lines) carry no "≈" either.
- **Rows add up exactly:** the rounded rows sum to $10.00 and $100.00 with no plug (checked).

---

## 05a · Becker Rig · What you're really paying for when you spend $10 at Chipotle

**Spec:** `studio/specs/05a-becker-rig-chipotle-10.json` · 24.7 s · captions on · **ported from Clean Sheet on 2026-10-08** (hook, numbers, VO and verdict unchanged; the Clean Sheet spec is in `studio/specs/retired/`), then fixed after QA the same day (see "QA fix pass on the Becker Rig port")
**Platform title:** Chipotle Keeps How Much of Your $10?
**On-screen hook (header):** What You're Really Paying For / When You Spend **$10** / at Chipotle:

### Why this hook

**Modelled on:**
1. **H70, The Market Hustle:** "What You're Buying / When You Invest / $10,000 in These ETFs", **221,830 plays, 617 comments.** We take its exact grammar: a 3-line headline ending in a colon, a round anchor, the full grid at 0.0 s, and a remainder line. "Buying" becomes "Paying For", the old hook #6 rewrite A from the hook bank.
2. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make", **3,000,000 views, 140x.** One word implies the viewer's number is wrong: "Actually" there, "**Really**" here.
3. **Hook bank §4.6, rewrite B** ("Does Chipotle Really Make $7 on Your $10?"): the wrong answer goes **on screen at frame 1**, with the profit row's % masked, so the only profit figure on screen at 0.0 s is the wrong one. Since the Becker Rig port it hangs off the header's colon as its answer, "at Chipotle: ···· **$7.04 profit?**" in red in a red dashed box (on Clean Sheet it was "$10 − $2.96 = $7.04 profit?" in coral under the sheet). The first VO line voices it with its working ("Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?"). Once the food piece has dropped (0.9 s), the rest of the slab he is standing on carries the same red "$7.04?", so the guess is the object under his feet. The second line strikes it ("Not even close."): the figure stomps on the slab and a red line slams through the guess in both places. Labels are dim until their row is named, so frame 1's loud figures are just the $10.00 slab and the red guess.
4. **H53, Yannick:** the finished sheet with every row visible at frame 1, **739,347 plays (40.7x med)**; only the dollars fill.

**Rules satisfied:**
- **R1:** "$10" in the header, the wrong guess in the header's answer slot, "$10.00" on the slab and six percentages on screen at 0.0 s.
- **R2:** one dollar figure in the header (the input), no result.
- **R3:** the viewer's own $10 order; the percentages scale to any order.
- **R4:** a sum they have spent.
- **R5:** "Really" plus the red "$7.04 profit?" as the header's answer at frame 1: the belief is named before the scroll decision, then struck (5.2 s) and replaced by the real answer (21.2 s).
- **R6:** "you" + $10.
- **R7:** every option is named on the sheet; no label hook.
- **R8:** 11 words.
- **R9:** seven empty amount slots and empty lanes under the rows, the slab scored at its six cut marks, and a "?" where the profit share should be.
- **R10:** first dollar at 0.8 s; the payoff is last and loudest. As the profit row lands (20.3 s), a gold "PROFIT ≈ $1.29" slab stamps in at the size of the frame-1 "YOUR ORDER $10.00" slab (68 px figure, the largest number in the working area; hit, burst, shake, camera punch, cash). The silent check is complete by 21.1 s, and at 21.2 s the answer stamps into the header's answer slot ("≈ $1.29 profit", over the struck guess) as the verdict sets it at 64 px with the green swoosh.
- **R11:** the question is on screen (the red "?"), the verdict is the caption's first line ("Nowhere near $7.").
- **R12:** "What's left: ≈ $1.29. Not $7.04."

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
| 0.0 | White void + floor + brand mark. Header (3 lines, **$10** in green), and after its colon a dotted leader to the header's answer slot holding the wrong guess in red, in a red dashed box: **$7.04 profit?**. Footer (one line): "FY2025 10-K average · not your order". The gold slab "YOUR ORDER · **$10.00**" on its post at the right, notched at its six cut marks (the notches under "YOUR ORDER" and "$10.00" are shallow and on the bottom edge only, so none bites into the text), with the figure standing on it, saw in hand (think pose). Under it the sheet, seven one-line rows, labels dim and percentages in a right-aligned column: Food, drinks & packaging 29.6% · Crew pay 25.1% · Rent 5.2% · Ads, delivery & card fees 14.7% · HQ, wear & tear, new stores 9.1% · Tax − interest earned 3.4% · Profit **?**; under each row an empty pale $10 lane (hairline edge, full width), empty amount slots on the right. Frame 1's loud figures: the $10.00 slab and the red guess | "Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?" |
| 0.1-0.5 | He saws through the food cut (swipes); "YOUR ORDER" fades as the saw starts (0.12-0.22), so the kerf never splits it; at 0.4 row 1 activates (label ink, 29.6% green, bump) | |
| 0.5 / 0.8 | The food piece drops straight down into row 1's lane (thud, squash) and **≈ $2.96** lands in green (first payoff). The slab's $10.00 fades; he looks down at the row | |
| 0.9 | What is left of the slab, the piece he stands on, gets a label in the header guess's style: **$7.04?** in red in a red dashed box (no per-piece % on the slab) | |
| 2.0 / 2.15 | He looks up at the header; its **$10** swells on "your $10" (tick) | |
| 3.9 / 4.05 | Palms-up shrug on "keeps $7.04?" while the red guess swells in both places, the header slot and the slab under his feet (tick). He is standing on what the guess means, and the slab says so | |
| 5.2 | "Not even close": he stomps on the slab (crouch, knee up, slam: hit lines at his feet, shake, thud) and a red line slams through the guess in the slot and on the slab (swipe, buzz); both grey out. The slot's stays struck; the slab's fades by 6.1, leaving the slab plain | "Not even close. Crew pay: ≈ $2.51." |
| 5.5-7.4 | He walks to the crew cut; row 2 activates on "Crew" (6.3) and he saws from there; the piece drops at 7.1 and **≈ $2.51** lands at 7.4. Each piece fills its lane and, once landed, slides to the lane's left end, so the lanes build into a left-aligned bar chart of the $10 (crew visibly about twice profit) | |
| 8.4 / 9.1 | Rent: row 3 activates on "Rent", a short saw, **≈ $0.52** at 9.1 | "Rent: ≈ 52 cents." |
| 10.1 / 11.9 | Ads, delivery & card fees: he saws through the whole line (1.5 s), **≈ $1.47** at 11.9 | "Ads, delivery, card fees: ≈ $1.47." |
| 12.9 / 15.5 | HQ, wear & tear, new stores: a 2.3 s saw, **≈ $0.91** at 15.5 | "HQ, wear and tear, new stores: ≈ 91 cents." |
| 16.5 / 18.3 | Tax − interest earned: **≈ $0.34** at 18.3. He is now standing on the last piece of the slab, which is what is left | "Tax, minus interest earned: ≈ 34 cents." |
| 19.3 | Row 7 activates on "What's left": its % turns from "?" to **12.9%** (green) | "What's left: ≈ $1.29. Not $7.04." |
| 20.0 / 20.3 | The last piece drops straight out from under his feet into the profit lane: he rides it down arms-up and lands on the bare bracket (squash), and **≈ $1.29** lands on its row's gold plate (thud). On the same beat, in the air the slab and he have left, a gold **PROFIT ≈ $1.29** slab stamps in at the size of the frame-1 "YOUR ORDER $10.00" slab (68 px figure; hit, burst, shake, camera punch, cash). He steps along the bracket to the post | |
| 20.45-21.1 | Right under it, where the slab was, the check assembles fast and silently in a green ghost slab: "$10 − $8.71 of costs = $1.29", complete by 21.1; he points at it (20.85) | |
| 21.2 | Verdict in the caption band: "Chipotle keeps / **≈ $1.29**, not $7.04." (64 px, green swoosh under ≈ $1.29, $7.04 in red; ding). On the same words, "Not $7.04", the struck guess in the header slot is stamped over with **≈ $1.29 profit** on a gold plate (hit, cash, gold ring, the world shakes), so the header now reads "…at Chipotle: ≈ $1.29 profit". He shrugs and holds it | (same line) |
| 22.4-24.7 | The finished sheet holds (2.3 s): the header's answer, the PROFIT slab, the check, the bar chart of the $10 with every dollar, and the verdict | (none) |

### Guide VO script (7 lines, 56 spoken words ≈ 21.5 s at 2.6 words/s; read "≈" as "about")

> Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?
> Not even close. Crew pay: ≈ $2.51.
> Rent: ≈ 52 cents.
> Ads, delivery, card fees: ≈ $1.47.
> HQ, wear and tear, new stores: ≈ 91 cents.
> Tax, minus interest earned: ≈ 34 cents.
> What's left: ≈ $1.29. Not $7.04.

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
| Profit (net income) | 1,935,798 + 73,721 − 473,758 = 1,535,761 | 12.8778% · $1.2878 | 12.9% · ≈ $1.29 (masked "?" until the row activates at 19.3 s) |
| Totals | exact shares sum to 1; rounded cents 2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 + 1.29 = 10.00; shares 29.6 + 25.1 + 5.2 + 14.7 + 9.1 + 3.4 + 12.9 = 100.0 | | no plug |
| $10.00 total | the input | | $10.00 |
| "$7.04 profit?" (the wrong guess, frame 1: the header slot's red ghost since the Becker Rig port; the VO gives its working, "≈ $2.96 of your $10") | 10 − 2.96 | | $7.04 (exact on the shown numbers, so no ≈) |
| "$7.04?" (the slab's remainder label, 0.9-6.1 s, since the Becker Rig QA pass) | 10 − 2.96, the same guess as the header slot | | $7.04 (exact on the shown numbers, so no ≈) |
| "≈ $1.29 profit" (the header slot's answer, stamped over the struck guess at 21.2 s) | the profit row | | ≈ $1.29 (rounded, so ≈) |
| "PROFIT ≈ $1.29" (the payoff slab, stamped at 20.3 s, since the Becker Rig QA pass) | the profit row's label and amount | | ≈ $1.29 (rounded, so ≈) |
| Check: "$10 − $8.71 of costs = $1.29" | 2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 = 8.71; 10.00 − 8.71 = 1.29 (= the profit row) | | exact on shown numbers |
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

"FY2025 10-K average · not your order" (since the Becker Rig QA pass). It was "Chipotle FY2025 10-K average · not your order", one line on Clean Sheet since the fix pass (the two-line "ASSUMES $10 splits like Chipotle's FY2025 revenue (10-K) · an average, not your order" had sat at ~40 px between the hook and the sheet). Becker Rig sets footers in 40 px mono, where those words wrapped as "…· not / your order", leaving "not" cut off from "your order" for the whole video and on the cover. "Chipotle" is already in the header, so dropping it gives one 36-character line. The caption and the pinned comment carry the full method.

### Caption / description (verdict first, R11)

> Nowhere near $7.
> Of your $10 at Chipotle, food, drinks and packaging take about $2.96 and the crew about $2.51, almost twice what Chipotle keeps. Rent, ads, delivery and card fees, HQ, wear and tear and new stores, and tax (minus the interest Chipotle earns) take most of the rest, leaving about $1.29 of profit.
> Each line is that cost's share of Chipotle's 2025 revenue (FY2025 10-K and Q4 release, Feb 3 2026), applied to $10: a company-wide average, not your order. Educational math, not financial advice.
> #chipotle #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2025 ($ thousands): revenue 11,925,601. Food/bev/packaging 3,527,043 (29.58%) · labor 2,991,680 (25.09%) · occupancy 624,898 (5.24%) · other operating 1,755,824 (14.72%) · G&A + depreciation + pre-opening + impairment 1,090,358 (9.14%) · tax − interest earned 400,037 (3.35%: income tax 473,758 minus interest income 73,721) · net income 1,535,761 (12.88%). Per $10: $2.9575 / $2.5086 / $0.5240 / $1.4723 / $0.9143 / $0.3354 / $1.2878. Which chain's $10 next?

### Per-platform notes

- **YouTube Shorts:** use the 24.7 s master. Title: "Chipotle Keeps How Much of Your $10?" (a question the header does not already answer). No logo and no store footage, only the brand name in text. Frame 0 (the red "$7.04 profit?" in the header slot, the $10.00 slab with the figure on it, the full sheet with profit "?") is the cover.
- **Instagram Reels:** the master. The cover is the finished-sheet frame at ~23 s: the header reading "at Chipotle: ≈ $1.29 profit", the gold "PROFIT ≈ $1.29" slab, the check line, the bar chart of the $10 with the full dollar column, and the verdict, which works as a save-able cheat sheet, as with Yannick's finished sheet. Put the pinned comment's exact table in the first comment.
- **TikTok:** the master. Caption line 1 stays the verdict ("Nowhere near $7."); the $1.29 sits below the fold. The pinned "Which chain's $10 next?" feeds reply videos (The Debt Freedom Project's reply sticker earned 127.3x, H50).
- **All:** the voice-over starts on the first calculation with no greeting (H55, H76, H84).

### Look notes (Becker Rig, since the port)

- **Why a new layout.** The kit's split-sheet had two layouts: **bins** (up to 5 parts; 05b) and **rows** (more parts or long labels), where the figure only stood in the floor corner and pointed while the pieces fell. Seven parts with long labels forced rows, and a plain rows port (tried first) read as a table with a bystander: profit's 12.9% printed at frame 1, no wrong guess, 40 px amounts and pieces landing as thin underlines. So the port adds an opt-in **carve** layout (`lookOpts.layout: "carve"`, in `looks/becker-rig/formats/split-sheet.js` only): the rows run the full width (amounts end at x 920, the post stands right of them) and the figure works **on** the slab, as in bins. He saws through each cut while the VO names the part, the piece drops straight down into its own row's lane (a gold bar: the sheet becomes a waterfall of the $10), and the slab shrinks under his feet until he stands on the last piece, the profit. That piece drops out from under him; he falls onto the bare bracket and ends there, beside the check.
- **Sizes (measured, fitted at mount):** figure scale 0.7, slab 80 px with "$10.00" at 68 px, row labels 40 px on one line each, % 40 px mono, amounts 44 px (the goal on a gold plate), lanes 14 px, check line 56 px, header slot 52 px. The slab hangs as high as his head allows: his head rises into the footer's band only right of its short second line.
- **lookOpts used:** `layout: "carve"`; `notes: false` (the part notes do not fit a working line once the sheet has seven rows; the labels carry the facts, and the caption and pinned comment carry the method); `maskPct: [6]`; `activate` (unchanged times, now also the start of each saw); `bumps` (`total` now swells the header's **$10**, because the slab's total has given way to its pieces by 2.15 s; `guess` swells the slot); `payoff.slot` with `ghost: "$7.04 profit?"`, `ghostTone: "bad"`, `strikeT: 5.2` and `t: 21.2`, `text: "≈ $1.29 profit"`; `beats` (look up 2.0, low palms-up shrug 3.9, stomp 5.2, point at the check 20.85, shrug held from 21.2). New in the format file for this port (header comment): `layout: 'carve'`, `activate`, `maskPct` and `bumps` for rows/carve, `beats` (POSES names, the format's own `recoil` / `shrugLow`, and `stomp`), `notes: false`, and `payoff.slot.ghostTone` / `strikeT`. Every other spec of the format renders pixel-identical (05b and both kit samples, compared frame by frame against the committed file).
- **Dropped from the Clean Sheet spec:** `pointer`, `loop`, `goalScale`, `bigVerdict` and `wrongGuess` (the Becker kit does not read them; the slot, the gold plate and the kit's verdict swoosh do their jobs).
- **Retimed:** nothing in `data`, `vo` or `verdict`. The guess's `until` (20.3) is gone: the struck guess now stays in the header slot until the answer replaces it at 21.2 s, on the verdict's "Not $7.04".
- **Not changed, on purpose:** a lane's gold bar can sit under a percentage (the ads row's under 14.7%): pieces fall straight down from where they were cut, which is the waterfall. Falling pieces cross the rows above their lane for 0.3 s, as in the kit's rows mode.

---

## 05b · Becker Rig · Rent $1,200 on 50/30/20? Food and every bill get this much a day

**Spec:** `studio/specs/05b-becker-rig-3000-paycheck.json` · 22.1 s · captions on
**Platform title:** Pay $1,200 Rent? 50/30/20 Leaves Food and Bills How Much a Day?
**On-screen hook (header):** Rent **$1,200** on 50/30/20? / Food and every bill get / this much a day:
**Hook pass 2 (2026-10-08): rewrite A adopted.** The two judges scored it 7 and 7.5 (average **7.25**), against 5.00 for the old hook "Could you live on 50/30/20 with $3,000 a month take-home?". That is +2.25. Header, title, VO, sheet (now four bins) and timings all changed; the maths is still pure 50/30/20 arithmetic. Scores and reasons are in the Review log.

### Why this hook

**Modelled on:**
1. **H84, Master Money:** "Take your salary and multiply it by 0.7…", **3,000,000 views, 140x.** The viewer runs the sum on their own number. Here that number is their rent, counted in $300 bricks (each brick is one tenth of the $3,000 take-home).
2. **HD Guy's P8 grammar, "Cost in Units of…":** H04 lattes, **9,858,084 views, 106.16x**, and H01 RTX 5090, **30,617,461, 62.49x**. The rent is re-priced in a unit that is on screen (bricks), and what is left is re-priced in a unit people feel (a day).
3. **H49, The Debt Freedom Project:** "Yes, daily payments work!", **382,100, 289.1x.** A tiny, honest, repeatable verdict: "$10 a day".
4. **H71, The Market Hustle:** the red "25 YEARS", **190,187 (4.5x med).** The shock sits on screen at frame 1: the FOOD + BILLS bin is visibly the tiny one (10%).
5. **H53, Yannick:** the paycheck sheet, **739,347 (40.7x med)**, is the object. **H18, ChartOrbit** (**1,391,731, 5.91x**) gives the yes/no opener "Rent $1,200 on 50/30/20?".

**Rules satisfied:**
- **R1:** $1,200 in the header, $3,000 on the slab and RENT 40% / FOOD + BILLS 10% / WANTS 30% / SAVINGS 20% on the bins at 0.0 s. The header's colon points at a dashed answer slot, "$?", hung after "this much a day:" with a dotted leader (fix pass).
- **R2:** one dollar figure in the header, the rent input. No result: neither $300 nor $10 a day is in it.
- **R3:** rent is the number viewers know to the dollar. They hold their own against $1,200, and can count it in $300 bricks.
- **R4:** $1,200 is round and familiar.
- **R5:** the belief "my rent is under half my take-home, so 50/30/20 works". The tiny 10% bin at frame 1 and "$10 a day" beat it.
- **R6:** the header has no "you" (both judges docked this). The title's "Pay $1,200 Rent?" speaks to the viewer.
- **R7:** the four bins are named on the sheet.
- **R8:** 13 words.
- **R9:** 10 countable bricks and four empty bins.
- **R10:** the cleaver comes out at 0.15 s; the slab slams into 10 bricks stamped "$300" and "$3,000 ÷ 10 = $300" at 1.2 s (first payoff); RENT $1,200 at 3.2 s; the header's answer stamps into its slot, **$10**, at 7.1 s and stays up to the end.
- **R11:** question on screen; the caption's first line is the verdict.
- **R12:** "$1,200 rent leaves food and every bill $10 a day": small, lopsided against the rent, repeatable.

**The wrong belief it plays on:** "My rent is under half my take-home, so 50/30/20 works." On $3,000 a month after tax, needs get half: $1,500, five $300 bricks. A $1,200 rent eats four of them. That leaves one brick, $300 a month or $10 a day, for food and every other bill. Rent is 40% of pay, under the 50% line, and food and bills still get only 10%.

### Beat sheet

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | White void + floor. Header (3 lines, **$1,200** in green; word spacing opened up so "this much a day:" reads as four words), and after its colon a dotted leader to a dashed gold answer slot holding a grey **$?**. Footer (2 lines): "ASSUMES $3,000 a month after tax · $1,200 rent · 30-day month". Gold slab "TAKE-HOME, A MONTH · **$3,000**" on its post, scored at its 9 brick seams, with the figure standing on it (think pose). Four bins on the floor: RENT 40% · FOOD + BILLS 10% · WANTS 30% · SAVINGS 20%, each with a solid fill line over a pale tint (FOOD + BILLS visibly the lowest) | "Ten bricks of $300. Rent eats four." |
| 0.15 | `saw` action: the "÷ 10" cleaver comes out (whoosh) and "$3,000 ÷ 10" types under the slab | |
| 1.2 | Slam (hit, shake, flash): the slab cracks into **10 gold bricks, each stamped $300**; working line "$3,000 ÷ 10 = **$300**" (first payoff) | |
| 2.3-3.2 | The cleaver now reads **4 × $300** (relabelled as he raises it); he taps, 4 bricks tumble into RENT; **$1,200** lands at 3.2; "4 × $300" sits in the air the bricks left, over RENT | |
| 3.7 | On "Needs": a bracket draws over the RENT and FOOD + BILLS amounts, labelled **NEEDS 50% = 5 bricks**; it stays to the end | "Needs get five. Food and every bill get one: $10 a day." |
| 4.7 / 6.8 | He walks on, raises the cleaver (now **1 × $300**) over the lone brick and holds it, straining; at 6.5 he slams it and at 6.8 the brick lands in FOOD + BILLS: **$300** on the gold plate (goal: impact + cash). The cleaver relabels **÷ 30** (6.6-7.6); "$300 ÷ 30 = **$10**" appears over the two left bins | |
| 7.1 | **$10** stamps into the header's answer slot (gold plate, ink rim, gold ring, the world shakes; hit + cash): "this much a day: **$10**". It stays up to the end | |
| 8.7 / 9.9 | Cleaver up again from 7.6 (**3 × $300**), slammed at 9.4; 3 bricks into WANTS: **$900**; "3 × $300 · fun money" | "Wants get three: $900. Savings, two: $600." |
| 11.3 / 11.8 | He hops off the slab; the last 2 bricks drop into SAVINGS: **$600** (green); "2 × $300 · savings" over the right bins | |
| 12.6 | Check line assembles where the slab was: "$1,200 + $300 + $900 + $600 = $3,000" (it leads its VO line by 0.5 s, so the air above the bins is not left empty after the hop) | "Check: $3,000." (13.1) |
| 14.8 | Verdict: "$1,200 rent leaves food and / every bill **$10 a day**." (the kit's ding); the figure points up at the sheet | "$1,200 rent leaves food and every bill $10 a day." |
| 18.2 | The payoff slab re-slams into the air above the check (impact, hit + cash; the figure celebrates): a gold slab "FOOD + EVERY BILL · **$10 a day**", the bookend of frame 1's "TAKE-HOME, A MONTH · $3,000", on the spoken "$10"; the header's **$10** bumps with it | |
| 19.8-22.1 | Finished state holds (2.3 s) | (none) |

### Guide VO script (5 lines, 50 spoken words ≈ 19.2 s at 2.6 words/s)

> Ten bricks of $300. Rent eats four.
> Needs get five. Food and every bill get one: $10 a day.
> Wants get three: $900. Savings, two: $600.
> Check: $3,000.
> $1,200 rent leaves food and every bill $10 a day.

### The maths

| On screen | Formula and inputs | Result |
|---|---|---|
| $3,000 (slab) | example take-home, a month, after tax (input; footer) | $3,000 |
| $1,200 (header) | example rent (input; footer) | $1,200 |
| $300 a brick | 3,000 ÷ 10 | $300 (exact) |
| Rent 40% · $1,200 · "4 × $300" (note and cleaver) | 1,200 ÷ 3,000 = 0.40; 1,200 ÷ 300 = 4 bricks | exact |
| Bracket "NEEDS 50% = 5 bricks" over RENT + FOOD + BILLS (VO "Needs get five") | 0.50 × 3,000 = $1,500 = 5 bricks = 4 (rent) + 1 (food + bills) | exact |
| Food + every bill 10% · $300 · 1 brick | 1,500 − 1,200 = 300; 300 ÷ 3,000 = 0.10 | exact |
| "$300 ÷ 30 = $10" (working) · cleaver "÷ 30" · header slot "this much a day: **$10**" | 30-day month (footer) | $10 exactly. In an average 30.44-day month it is $9.86, which still rounds to $10 (checked) |
| Wants 30% · $900 · "3 × $300" | 0.30 × 3,000 | exact |
| Savings 20% · $600 · "2 × $300" | 0.20 × 3,000 | exact |
| Check "$1,200 + $300 + $900 + $600 = $3,000" | sum; shown % 40 + 10 + 30 + 20 = 100; bricks 4 + 1 + 3 + 2 = 10 | exact |

No rounding anywhere, so no "≈" in this teaser. The kit draws bricks only when every share × 10 is a whole number (4 / 1 / 3 / 2); the check script asserts it.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| The 50/30/20 rule: 50% needs, 30% wants, 20% savings (incl. extra debt payments), applied to **after-tax** income | 50/30/20 of take-home | **Elizabeth Warren & Amelia Warren Tyagi**, *All Your Worth: The Ultimate Lifetime Money Plan* (2005), the primary source, as summarised by **Wealthsimple**, "50 30 20 rule". https://www.wealthsimple.com/en-us/learn/50-30-20-rule | **Citizens Bank**, "What is the 50/30/20 budget rule?" https://www.citizensbank.com/learning/monthly-budgeting-calculator.aspx · Musaffa Academy, "Simple 50/30/20 Budgeting Rule". https://academy.musaffa.com/simple-50-30-20-budgeting-rule-for-managing-your-money/ (all via search, Oct 7, 2026) |
| $3,000 take-home · $1,200 rent | example inputs, not statistics (both in the footer) | (none needed) | |

The book is the primary source. The page couldn't be opened here, so the definition rests on two independent summaries that agree. Rent is a need under the rule, so whatever rent leaves of the needs half is what food and every other bill must share.

### Assumptions (footer, on screen from 0.0 s)

"ASSUMES $3,000 a month after tax · $1,200 rent · 30-day month"

### Caption / description (verdict first)

> $10 a day for food and every bill.
> On $3,000 a month after tax, 50/30/20 gives needs $1,500: five bricks of $300. A $1,200 rent eats four, so food and every other bill share the last $300, which is $10 a day. Wants still get $900 and savings $600.
> Rent at 40% of take-home is under the 50% line, and it still leaves food and bills 10%.
> The rule (Elizabeth Warren and Amelia Warren Tyagi, All Your Worth, 2005) splits after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments. Educational math, not financial advice.
> #503020 #budgetmath #backoftheenvelope #moneymath

### Pinned comment

> Count your rent in bricks: take-home ÷ 10 = one brick, and needs get 5. Whatever rent doesn't take is food and every bill. On $3,000: $1,000 rent leaves $500 = $16.67 a day. $1,400 leaves $100 = $3.33 a day. $1,500 leaves $0. On $4,000 with $1,200 rent: $800 = $26.67 a day. What's your rent, in bricks?

(Pinned-comment check, in the script: 1,500 − 1,000 = 500, ÷ 30 = 16.67; 1,500 − 1,400 = 100, ÷ 30 = 3.33; 1,500 − 1,500 = 0; 4,000 ÷ 2 − 1,200 = 800, ÷ 30 = 26.67.)

### Per-platform notes

- **YouTube Shorts:** use the 22.1 s master. Title: "Pay $1,200 Rent? 50/30/20 Leaves Food and Bills How Much a Day?". Cover: frame 0 (header with its "$?" slot, slab, the tiny 10% bin).
- **Instagram Reels:** the master. The pinned brick count plus "What's your rent?" is the comment engine: Yannick's "run the numbers with your own income" CTA drew 79 comments on 50,206 plays. No keyword-DM CTA.
- **TikTok:** the master. Sequel slots are cheap: $1,000 / $1,400 / $1,500 rent, or other take-homes, in the same rig; rent replies can become reply videos.
- **Kit note (becker-rig split-sheet):** `lookOpts.tenth` (t 1.2, count 10) cuts the slab into bricks; each part then takes share × 10 bricks (4 / 1 / 3 / 2). `actions[0]` at 0.15 brings out the cleaver ("÷ 10"); since the fix pass each later action's `tool` relabels the cleaver as he raises it for that cut ("4 × $300", "1 × $300", "3 × $300"; the last part has no cut, he hops off first), and `actions[2].after` ("÷ 30") shows after the food brick lands, so the cleaver never carries a stale "÷ 10". `envelopes` are the bin names (RENT / FOOD + BILLS / WANTS / SAVINGS); "FOOD + BILLS" fits a 2-line plinth, so the kit keeps its bin layout. FOOD + BILLS is the goal tone (gold plate), because it is the header's number. There is no `gag`. `lookOpts.payoff` (`{ t: 18.2, label: "Food + every bill", text: "$10 a day" }`) is the closing gold slab, now the re-slam; `payoff.slot` (`{ t: 7.1, text: "$10", ghost: "$?" }`, fix pass) is the header's answer slot, hung after "this much a day:" with a dotted leader, dashed from frame 1 and stamped at 7.1. `lookOpts.needs` (`{ t: 3.7, parts: [0, 1], text: "NEEDS 50% = 5 bricks" }`, fix pass) draws the bracket over the RENT and FOOD + BILLS amounts on the working-line row; the part notes then go up into the air the slab has freed, over their own bins where they fit. Other fix-pass changes in the format, for every spec: the header gets 0.2em word spacing and −0.01em tracking (the kit's −0.025em ran words together), amounts stay within 88% of a bin with ≥ 32 px between neighbours (50 → 44 px here: $1,200 is 87% of its bin, the $300 plate 80%, 39 px apart), the bin fill targets are a solid line over a pale tint, tenth bricks carry their value, and the slab is scored at every brick seam with notches that stay in its rim. There are no spec sfx: the kit cues the whoosh, hit, impact, pop and ding itself.

---

## 05c · Scoreboard · Is Costco's profit all membership fees? Follow your $100 cart

**Spec:** `studio/specs/05c-scoreboard-costco-100.json` · 22.8 s · captions on
**Platform title:** Is Costco's Profit All Membership Fees? Follow Your $100 Cart
**On-screen hook (header):** IS COSTCO'S PROFIT / ALL MEMBERSHIP FEES? / FOLLOW YOUR **$100** CART:
**Hook pass 2 (2026-10-08): rewrite A adopted.** Both judges scored it 7 (average **7.00**), against 5.75 for the old hook "HOW MUCH OF YOUR $100 DOES COSTCO ACTUALLY KEEP?". That is +1.25. Header, title, VO, row 3's label, the masks, the membership row (now on the sheet at frame 1) and the timings changed; every figure is the same FY2026 number as before. Scores and reasons are in the Review log.

### Why this hook

**Modelled on:**
1. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461 views**, and **H18, ChartOrbit:** "Does investing 100$ monthly in BMW make you rich?", **1,391,731, 5.91x.** Name a belief people actually repeat and ask it as a yes/no question. Here the belief is the factoid "Costco's profit is all membership fees".
2. **H70, The Market Hustle:** "What You're Buying When You Invest $10,000 in These ETFs", **221,830 plays, 617 comments.** "FOLLOW YOUR $100 CART" keeps the viewer's round sum as the stake, dollarized row by row, with a remainder line.
3. **H04, HD Guy:** "Cost in Units of Starbucks Lattes", **9,858,084 views, 106.16x**, the Scoreboard's source grammar: a counter already set at frame 1 and the working in a one-line footer. The hero counts down what is left of the $100 live.
4. **H43, @investment_timeline:** the GoPro reversal, **5.1M, 22.6x** (judge 2's comparison): the expected answer turns out wrong.

**Caveat on the brand:** the benchmark's only Costco data point is a flop (H13, Costco hot dogs as a unit, 80,139, 1.44x), so the brand's pull is unproven here. The hook bites hardest for viewers who already know the factoid.

**Rules satisfied:**
- **R1:** "$100" in the header, the hero counter at "$100.00", one solid green bar with "$100.00" on it, and the membership row "≈ $1.99" landed, all at 0.0 s.
- **R2:** one dollar figure in the header (the input). No result: no cart row and not the fees figure.
- **R3:** your $100 cart.
- **R4:** a Costco run people actually make.
- **R5:** the belief is named in the header ("all membership fees?"), and its number is on screen at frame 1. Every cart row is masked, so frame 1 does not give away the answer: does the cart's row reach $0?
- **R6:** "your $100".
- **R7:** the three cart piles and the fees row are named on screen.
- **R8:** 10 words.
- **R9:** three rows with "?" for both % and $, and the hero (tagged LEFT) counting down to what's left.
- **R10:** the cut at 0.25 s; the hero rolls from 0.43 s and ≈ $88.91 slams in with the hero on LEFT ≈ $11.09 at 0.93 s, while the VO is saying "$88.91" (fix pass: it used to land at ≈ 1.8 s, after the words).
- **R11:** question on screen; the caption's first line answers it ("Not all fees.").
- **R12:** "Not all fees" is honest but not lopsided: the cart and the fees are about half each (both judges docked this).

**The wrong belief it plays on:** "Costco makes all its profit on membership fees; the cart makes nothing." Of every $100 rung up, ≈ $88.91 pays for the goods and ≈ $9.15 pays the staff and runs the warehouses. That leaves ≈ $1.94 before tax: not zero. Membership fees bring in ≈ $1.99 per $100 of sales. Operating income is $11,685M = $5,778M from the carts (49.4%) + $5,907M from fees (50.6%): about half each, and the cart makes 97.8% as much as the fees. "Profit" in the header is this operating profit, which the footer tags "before tax". After interest and tax, the fees ($5,907M) are 64% of net income ($9,226M), still not all of it.

### Beat sheet

Every row lands on its spoken number (fix pass): the kit's landing is the cut + 0.18 s + the row's roll (`lookOpts.rolls` 0.5 / 0.6 / 1.15 s), and the check script tests the landing, not the cut.

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Black bars, dark stage. Header (3 Anton lines, **$100** in green). Hero counter **$100.00** with a shopping-bag icon. Footer: "Costco FY2026 · company-wide · before tax". One solid neon bar with "$100.00" on it (the whole cart, not yet split), then three rows with % and $ both "?": The stuff itself / Staff & warehouses / Left from your cart. Under them, the dashed green bonus row "MEMBERSHIP FEES, PER $100 OF SALES · **≈ $1.99**", already landed, with the pointer on it. Label stack: "Your Costco run" at tag size (Inter 42 grey); the first caption is up | "≈ $88.91 of your $100 buys the stuff." |
| 0.25 | Cut: the pointer jumps to row 1 and its % unmasks (88.91%); the bar splits; the label stack shows row 1's note ("what Costco paid + freight + fresh-food prep"), no formula | |
| 0.93 | Row 1's **≈ $88.91** slams in and the hero lands on **LEFT ≈ $11.09** (the LEFT tag takes the bag's place from the roll); footer: "$264,279M ÷ $297,247M × $100 ≈ $88.91" | |
| 4.5 / 5.28 | Row 2: 9.15% unmasks at the cut; **≈ $9.15** slams in at 5.28 as the hero rolls down to **LEFT ≈ $1.94** (100 − 88.91 − 9.15: never a stale ≈ $11.09 beside two landed rows); footer: "$27,190M ÷ $297,247M × $100 ≈ $9.15" | "≈ $9.15 runs the staff and warehouses." |
| 7.8 / 9.13 | Row 3: 1.94% unmasks at the cut; the row rolls and **≈ $1.94** lands at 9.13 on the spoken number (goal: hit + cash, floor bloom, the hero bumps); footer: "$100 − $88.91 − $9.15 = $1.94 before tax" | "That leaves ≈ $1.94. Not zero." |
| 10.7 | Check: the label stack shows "$88.91 + $9.15 + $1.94 = $100.00" over YOUR COSTCO RUN; the slices re-join into one bar (cash); the footer goes back to "Costco FY2026 · company-wide · before tax" (one working on screen) | "Check: $100." |
| 12.5 / 13.65 | The pointer returns to the membership row as the VO names it (thud; its ≈ $1.99 bumps; the label stack shows its label at tag size, no figure); footer at 13.65: "$5,907M ÷ $297,247M × $100 ≈ $1.99" | "Membership fees: ≈ $1.99 per $100 rung up." |
| 17.0 / 18.14 | Verdict: "Not all fees: your cart leaves **≈ $1.94**. / Membership fees: **≈ $1.99**." (the kit's reveal cue). The hero's tag cuts to **PROFIT PER $100** and it rolls ≈ $1.94 → **≈ $3.93**, landing at 18.14 on the spoken "$3.93", with both lit rows under it (≈ $1.94 cart, ≈ $1.99 fees): the half-and-half picture; footer: "cart $5,778M + fees $5,907M = $11,685M" | "Profit: ≈ $3.93. Your cart makes almost half." |
| 20.5-22.8 | Hold (2.3 s), then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (6 lines, 50 spoken words ≈ 19.2 s at 2.6 words/s; read "≈" as "about")

> ≈ $88.91 of your $100 buys the stuff.
> ≈ $9.15 runs the staff and warehouses.
> That leaves ≈ $1.94. Not zero.
> Check: $100.
> Membership fees: ≈ $1.99 per $100 rung up.
> Profit: ≈ $3.93. Your cart makes almost half.

### The maths

Costco FY2026, the 52 weeks ended Aug 30, 2026, in $ millions. Net sales = total revenue − membership fees = 303,154 − 5,907 = **297,247** (reported as "$297.2 billion").

| On screen | Formula and inputs | Exact | Shown |
|---|---|---|---|
| The stuff itself (merchandise costs) | 264,279 ÷ 297,247 × $100 | 88.9089 | 88.91% (masked "?" until 0.25 s) · ≈ $88.91 |
| Staff & warehouses (SG&A) | 27,190 ÷ 297,247 × $100 | 9.1473 | 9.15% (masked until 4.5 s) · ≈ $9.15 |
| Left from your cart, before tax | (297,247 − 264,279 − 27,190) = 5,778; ÷ 297,247 × $100 | 1.9438 | 1.94% (masked until 7.8 s) · ≈ $1.94 |
| Rows add up | 88.91 + 9.15 + 1.94 = 100.00 | | no plug |
| Check "$88.91 + $9.15 + $1.94 = $100.00" | sum of the shown rows | | exact on shown numbers |
| Hero LEFT | 100 − 88.91 = 11.09 (lands 0.93 s, with row 1); 11.09 − 9.15 = 1.94 (lands 5.28 s, with row 2) | 11.0911 · 1.9438 | LEFT ≈ $11.09 · LEFT ≈ $1.94 |
| Footer step 3 | $100 − $88.91 − $9.15 = $1.94 before tax | | exact on shown numbers |
| "Not zero" (VO) | 5,778 > 0; ≈ $1.94 > 0 | | true: the header's answer is no |
| Membership fees per $100 of sales (bonus row, frame 1) | 5,907 ÷ 297,247 × $100 | 1.9872 | ≈ $1.99 |
| "Your cart makes almost as much" (caption) | 5,778 ÷ 5,907 = 97.8%; shown 1.94 ÷ 1.99 = 97.5% | | true (checked: 95-100%) |
| Hero at the verdict, PROFIT PER $100 (VO "Profit: ≈ $3.93") | 11,685 ÷ 297,247 × $100; shown rows 1.94 + 1.99 = 3.93 | 3.9311 | ≈ $3.93 (operating profit, before tax, as the footer says) |
| "Your cart makes almost half" (VO) | 5,778 ÷ 11,685 = 49.4%; shown 1.94 ÷ 3.93 = 49.4% | | true (checked: 45-50%) |
| Footer step 5 "cart $5,778M + fees $5,907M = $11,685M" | 303,154 − 264,279 − 27,190 = 11,685 = 5,778 + 5,907 | | reported operating income $11.69B (checked) |
| "About half each" (caption) | 5,778 ÷ 11,685 = 49.4%; 5,907 ÷ 11,685 = 50.6% | | true (checked: both 45-55%) |
| Net income (md and pinned only) | 9,226 ÷ 297,247 × $100 = 3.104; fees 5,907 ÷ 9,226 = 64.0% | | ≈ $3.10 per $100; fees still not all of it |
| Robustness: FY2025 shows the same | 269.9B − 239.886B − 24.966B ≈ 5.0-5.1B < membership 5.323B | | fees ahead, cart about as large (checked) |

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

"Costco FY2026 · company-wide · before tax". Every line is a company-wide total divided by company-wide net sales and applied to $100, before interest and income tax. It is not one receipt, and not a markup on any item. Once the footer turns into the working (from 0.93 s), "before tax" comes back on footer step 3, the moment ≈ $1.94 lands (9.13 s), and the whole assumption line returns at the check (10.7 s).

### Caption / description (verdict first)

> Not all fees. Your cart makes almost as much.
> Of every $100 rung up at Costco in fiscal 2026, about $88.91 paid for the goods and about $9.15 paid the staff and ran the warehouses, leaving about $1.94 before tax.
> Membership fees brought in $5.9B, about $1.99 per $100 of sales. Operating profit was $11.69B: $5.78B left over from the carts and $5.91B from fees, about half each.
> Source: Costco FY2026 Form 10-K (filed Oct 6, 2026) and Q4 / fiscal 2026 results (Sept 24, 2026), 52 weeks ended Aug 30, 2026. Company-wide averages, not your receipt. Educational math, not financial advice.
> #costco #businessmath #backoftheenvelope #moneymath

### Pinned comment

> Exact, FY2026 ($ millions): net sales 297,247 (= total revenue 303,154 − membership fees 5,907). Merchandise costs 264,279 (88.909%) · SG&A 27,190 (9.147%) · left 5,778 (1.944%). Membership fees 5,907 = 1.987% of sales. Operating income 11,685 = 5,778 (49.4%) + 5,907 (50.6%). Net income 9,226, about $3.10 per $100 of sales after interest and tax; the fees are 64% of it, so not all of it either. Which store's $100 next?

### Per-platform notes

- **YouTube Shorts:** use the 22.8 s master. Title: "Is Costco's Profit All Membership Fees? Follow Your $100 Cart". The brand name is in text only (no logo, no store footage). Frame 0 (hero $100.00, three all-"?" rows, the fees row ≈ $1.99 under them) is the cover.
- **Instagram Reels:** the master. Cover: the verdict frame (≈ $1.94 against ≈ $1.99). Tag nobody, and don't use brand handles in the caption.
- **TikTok:** the master. The factoid is the comment hook ("I thought it was all fees"). Keep the caption's first line as the verdict.
- **Kit note (scoreboard split-sheet is built):**
  - `lookOpts.hero: "remaining"` makes the hero count down what's left, landing on the `remaining[].display` strings, each synced with the part at the same t (since the fix pass: rows 1 and 2, landing at 0.93 s and 5.28 s, so the hero always reads $100 minus the rows on the sheet). `lookOpts.heroTag: "LEFT"` (fix pass) labels it from its first roll, in the icon's place.
  - `lookOpts.heroFinal` (`{ t: 17.0, display: "≈ $3.93", tag: "PROFIT PER $100" }`, fix pass) is the verdict's climax: the hero rolls ≈ $1.94 → ≈ $3.93 over the two lit rows (≈ $1.94 + ≈ $1.99), landing on the spoken "$3.93".
  - `lookOpts.intro: true` keeps the intro (frame 1 = $100.00) with the first cut at 0.25 s, and `lookOpts.rolls` (0.5 / 0.6 / 1.15 s, fix pass) sets each row's roll so it lands on its spoken number.
  - `lookOpts.labelWorking: false` (fix pass) drops the label stack's formula ("$100.00 × 88.91%"), so each beat shows one working (the footer's); `lookOpts.introTag: true` sets "Your Costco run" at tag size at frame 1 (it was a second ~75 px headline); `lookOpts.solidBar: true` draws the bar as one solid "$100.00" bar until the first cut (it was an empty outlined strip with two stray split ticks).
  - `footerSteps` carries the one-line working per beat, as in 03c; each now lands with its row (0.93 / 5.28 / 9.13 s), returns to the assumption line at the check, then the fees working (13.65 s) and the cart + fees sum (17.0 s).
  - `data.check` drives the kit's sum-check beat (sum line in the label stack, slices re-joining, cash cue).
  - `bonus` is the membership row; it is not a part, because it is not in your $100. Its `t` is −1.2: any t ≤ 0 makes the kit draw it landed at frame 1 with the sheet already shifted up (t 0 clipped the row and was still rolling at frame 1).
  - `maskPct: [0, 1, 2]` keeps every row's % as "?" until its cut, so no cart dollar is printed at frame 1.
  - `bonus.focusT` 12.5 (added to the kit's split-sheet in the assembly pass): a frame-1 bonus has no beat of its own, so without it nothing on the board answered the VO's "Membership fees: ≈ $1.99" except the footer, and the row sat unlit through the verdict that weighs it. At focusT the pointer and the label stack return to the row; from verdict.t it stays lit beside the goal row.
  - No spec sfx: the kit cues the cuts, the goal, the check and the verdict.
  - The bag icon is in every kit's icon list.

---

## Open items

1. **Re-open the primary pages before publishing.** Page fetches were blocked (sec.gov again in this revision), so every figure was read from search-result text for those pages. In particular:
   - Chipotle's labor ($2,991,680K), occupancy ($624,898K) and other operating costs ($1,755,824K) rest on round 1's read of the release. Round 2 re-confirmed their 10-K percentages (25.1 / 5.2 / 14.7) but not the thousands. Within the published 0.1-pt rounding, their cents could each move by ±1¢. The shown rows would then need re-balancing to keep the $10.00 total.
   - Costco's merchandise costs (264,279) and SG&A (27,190) are now attributed to the FY2026 10-K by search, and the operating-income identity ($11.69B, from separate sources) agrees to the million. Re-run the check against the 10-K's own table once it can be opened.
2. **Two kit options were added for this format in this revision** and are documented in the kit READMEs: `lookOpts.maskPct` (clean-sheet and scoreboard `split-sheet`) and a frame-1 `wrongGuess` (`t <= 0`, clean-sheet). A kit rebuild must keep them, or 05a/05c lose their frame-1 hook (the sheet would still render, just with the goal % printed and the guess typed late). Since hook pass 2, 05c also relies on two existing scoreboard behaviours: `maskPct` listing every row, and a `bonus` with t ≤ 0 drawn landed at frame 1. 05b relies on becker-rig's `tenth` bricks working with 4 parts (every share × 10 whole) and on a 2-line bin label ("FOOD + BILLS").
   **Assembly pass (2026-10-08):** five more options were added, each in its kit's `formats/split-sheet.js` only (header comment). The kit READMEs could not be edited in this pass (other agents own them), so they still need a line each:
   - clean-sheet: `lookOpts.activate` (per-part activation times), `lookOpts.bumps` (`{ t, at: 'total' | 'guess' | part }`), and a layout change: a tight sheet that misses by ≤ 10 px starts up to 10 px higher instead of dropping a feature (05a's check line). 05a uses all three.
   - becker-rig: `lookOpts.payoff` (`{ t, label, text }`, the closing gold slab; 05b), and a behaviour change: a cut with more than 2.2 s of wait raises and holds the cleaver early, and the check tokens pop from at least 41 px.
   - scoreboard: `lookOpts.bonus.focusT` (05c).
   A kit rebuild without them still renders the three specs, but 05a loses its check line (back to the struck guess leaving a hole under row 1), 05b its closing slab, and 05c its membership beat.
   **QA fix pass (2026-10-08):** more options, again each in its kit's `formats/split-sheet.js` only (header comment), and still owed a README line each:
   - clean-sheet: `lookOpts.activate[0]` > 0 (row 1 lights after frame 1), `goalScale` (the goal amount lands 1.3x and stays), `bigVerdict` (the verdict as a 64 px / ~90 px lockup with the guess struck), plus tabular Inter for the % column (local CSS; see Kit owners below).
   - becker-rig: `payoff.slot` (the header's answer slot), `needs` (the bracket), `actions[i].after` and per-cut cleaver labels, `headerSpacing` (default on), and the amount-width cap, solid fill lines, "$300" on the bricks and brick-seam scoring.
   - scoreboard: `rolls`, `heroTag`, `labelWorking`, `introTag`, `solidBar` (05c uses all five, plus `intro: true` and `heroFinal`).
   A rebuild without them still renders, but 05a's payoff shrinks back to row size and a 44 px verdict, 05b's colon points at nothing again, and 05c's rows land 1-1.5 s after they are said.
   **Becker Rig port of 05a (2026-10-08):** 05a no longer uses any clean-sheet option. It relies on becker-rig's split-sheet `layout: 'carve'`, `activate`, `maskPct`, `bumps`, `beats`, `notes: false` and `payoff.slot` with `ghostTone` / `strikeT`, all added to `looks/becker-rig/formats/split-sheet.js` in the port (documented in its header comment) and all opt-in: 05b and both kit samples render pixel-identical. The QA fix pass added `remainder` (the slab's "$7.04?" label) and made `payoff` (the closing gold slab) work in carve; both are opt-in too, and carve's lanes, plate, check timing and fitter changed only in carve. The becker-rig README's split-sheet section still needs a line for them (not editable in this pass). A rebuild without them still renders 05a, but in the plain rows layout: the figure back in the corner, profit's 12.9% printed at frame 1 and no wrong guess.
   **Kit owners (not editable here):** becker-rig's theme sets the header at −0.025em with no extra word space ("thismuch a day"); 05b's format overrides its own header (0.2em word spacing, −0.01em tracking), but the kit default should change for every format. Clean-sheet's mono % column gave the decimal point a full cell ("3 . 4%"); the split-sheet format now sets its % column in Inter with tabular figures, and the kit's other formats may want the same.
3. **05c replaced the gasoline seed** (reasons at the top). If the owner still wants gasoline, it needs one unblocked read of EIA's "Gasoline and Diesel Fuel Update" components box (crude / refining / distribution & marketing / taxes for the latest month). The same Scoreboard spec structure then works with 4 parts.
4. **Slate overlap, for the owner:** 05c (Costco, is its profit all membership fees?) and 08a (Costco hot dogs as a unit) share the brand and the Scoreboard look, and both touch membership; since hook pass 2, 05c's header leads with it. Keep both only if a Costco pair is wanted; otherwise 05c can move to another look, or to another retailer whose 10-K splits the same way.

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

### Hook pass (2026-10-08)

The owner rejected round 1 partly because "hooks are weak". For 05b and 05c, two judges scored the current hook and four rewrites (A-D) out of 10. A hook here is the header at t = 0, the first VO line, what happens in the first 1.5 s, and the platform title. The rule: average the two judges' scores per option; an option either judge marks dishonest is out; adopt the best option only if its average is at least 7.5 and at least 0.75 above the current hook. Otherwise keep the current hook (a clearly better title may still be taken). 05a was not in this pass. 05c-D's text was cut off in transit after its first VO line, but both judges' scores for it arrived.

| Teaser | Current | A | B | C | D | Decision |
|---|---|---|---|---|---|---|
| 05b | 5 / 5 → **5.00** | 6 / 6 → **6.00** | 4.5 / 4.5 → 4.50 | 5.5 / 4.5 → 5.00 | 5.5 / 5.5 → 5.50 | **Keep current** |
| 05c | 6.5 / 6 → **6.25** | 7 / 6.5 → **6.75** | 5.5 / 5.5, **out** (judge 1: dishonest) | 6 / 7, **out** (judge 1: dishonest) | 4.5 / 4.5 → 4.50 | **Keep current** |

The options:
- **05b.** A: "Rent is half your **$3,000**? / Then 50/30/20 leaves food and bills:" (verdict: food and bills get $0). B: "**$100** a day take-home. / 50/30/20 gives rent, / food and every bill:". C: "POV: you take home **$3,000** / and try 50/30/20 for a month" ($1,500 spoken and landed at 0.5 s). D: "Just 20% of **$3,000** a month. / After 5 years, that's:" ($36,000 = a full year of take-home).
- **05c.** A: "WHAT YOUR **$100** AT COSTCO / REALLY PAYS FOR:" (the hero's ≈ $11.09 voiced as the guess "So Costco pockets $11.09?", then struck). B: "YOUR **$100** CART / OR YOUR MEMBERSHIP: / WHICH MAKES COSTCO MORE?". C: "52 RUNS OF **$100** AT COSTCO. / HOW MANY ARE LEFT FOR COSTCO?" (≈ $101 a year, about one run). D: "POV: YOU'RE COSTCO. / A **$100** CART JUST RANG UP."

**Why nothing was adopted:**
- No eligible option reached 7.5. 05b-A cleared the +0.75 margin (+1.00) but not the floor. 05c-A missed both (+0.50).
- 05c's B and C are out on honesty. Even if they had been counted, neither would pass: C would average 6.50 and B 5.50.
- Both judges re-ran the maths of every option and found it correct. The two honesty failures are about framing, not arithmetic.

**Judge 1's honesty findings on 05c (recorded for any future per-member framing):**
- **B.** The header sets one $100 cart against one membership. A membership ($65 Gold Star or $130 Executive a year) brings in about 33-67x the ≈ $1.94 one cart leaves, so "The card. By a hair." holds only per $100 of company-wide sales (1.987 against 1.944, a $129M gap). That is not the question on screen. Judge 1's fix: "EVERY $100 COSTCO RINGS UP: CARTS OR MEMBERSHIP FEES?". Judge 2 marked B honest under the "company-wide" footer and the per-$100 row, but expected "that's wrong" replies.
- **C.** After telling the viewer their 52 runs leave Costco ≈ $101, the verdict "Your card brings in more" is false for that viewer. A $65 card brings in less than $101, and a $130 Executive card nets $26 after its 2% reward on $5,200. At $65, the break-even spend is about $3,344 a year ($65 ÷ 1.944%). Judge 1's fix: drop the line from this cut, or say "All members' fees bring in more than all carts leave".
- **The current verdict**, "Your card brings in **≈ $1.99**", uses the same "your card" wording. Judge 1 found it acceptable in the current cut, because the bonus row says "per $100 of sales" and the footer says "company-wide". It stays. But any recut that makes the stake one member's year has to change it.

**Titles:** both kept. No candidate title is clearly better for the current body.
- **05b.** A's title ("Rent Is Half Your $3,000? What 50/30/20 Leaves for Food and Bills") asks a question only A's $0 body answers; the current video never sets rent at half. B's title needs the $100-a-day body, and D's the 5-year body. C's ("POV: You Take Home $3,000 and Try 50/30/20 for a Month") fits the current split, but both judges said "for a month" promises a month-long story the video never tells.
- **05c.** A's "Does Costco Really Make $11.09 on Your $100?" names a number the current hero does show (≈ $11.09, settled by about 2.0 s). But the current VO never voices it as a guess or strikes it, so the title would ask a question the body does not frame. Judge 2 also called $11.09 a strawman (Costco is known for thin markups) and docked a title with cents (R4). B's title carries the framing judge 1 ruled dishonest, C's needs the 52-run body, and D's (4.50) takes the $100 away from the viewer.

**What the judges agreed on, for the next round:**
- **05b.**
  - The current hook is solved at frame 1: NEEDS 50% beside $3,000 gives $1,500 before the VO says it. The wrong belief (the viewer's own rent) is never on screen. Nothing lands in the first 1.5 s (the cleaver is only raised). The first payoff is the $300 method step at 2.4 s, NEEDS $1,500 lands at 5.4 s, and vo[0] is a method step.
  - Every option that splits a stated sum by 50/30/20 shares that flaw: the result can be worked out from the two frame-1 numbers. Both judges contrasted it with Chipotle's $7.04 (05a) and H16's unknown result.
  - A (6 / 6) named the strongest belief ("rent at half is fine") and had the most repeatable verdict ($0, R12). But "Rent is half" in the header plus the bin "RENT + FOOD + BILLS 50%" gives $0 by definition at frame 1, so the next 20 s confirm a tautology. Rent at half is also an assumption, not the viewer's own number.
  - D (5.5 / 5.5) was the only payoff that is not half the input. But a linear, no-interest P2 is the benchmark's weak end (H73, 46,137; H72, 67,160), the header has no "you", and the needs and wants bins become filler.
  - C fixed the dead first 1.5 s, but its $1,500 is still the product of the frame-1 numbers. B's "$100 a day take-home" is not how anyone is paid.
- **05c.**
  - The current hook has no wrong number on screen; the belief lives in one word, "ACTUALLY". On a $100 base, 88.91% and 9.15% print rows 1-2's dollars at frame 1. The header asks what Costco "keeps", while the verdict says what the cart "leaves", before tax. The brand's pull is unproven (H13, 80,139, 1.44x). Judge 2 adds that the membership twist is a well-known factoid.
  - A (7 / 6.5) puts 05a's device on the hero. It was held back because the guess gets its "?" only at 3.4 s (frame 1 is unchanged), rows 1-2 still print their dollars, and it repeats 05a's header grammar (two siblings in one slate). Judge 2 also found the guess to be one nobody holds.
  - C had the best open loop: a countable "how many of 52?", the viewer's own run as the unit, and "about one" as a verdict viewers can repeat. Judge 2's 7 for C ties judge 1's 7 for A as the highest single score in this pass. If C is revisited, it needs judge 1's honesty fix first, a shorter header than 12 words, and a shorter cut (31.5 s, with the header's payoff at 17.1 s).
  - D breaks R3/R6: every benchmark POV makes the viewer the buyer or investor, not the business.
- **Open items (not applied, because they were not scored):**
  - 05c: a header and title without "keep", so the question matches the verdict. Both judges named the mismatch.
  - 05b: a first number the viewer cannot work out from the frame-1 numbers. No option managed it inside the 50/30/20 topic, so this may need a different question about the same sheet.

**Files:** no changes to the specs, beats, VO, captions, check script or `teasers.json`. Only this write-up changed: this section, the date line, and one "Hook pass: kept" line under each of 05b and 05c. `teasers.json` still carries round 2's writer estimates (05b 7, 05c 7.5). The judges' averages for the kept hooks are 5.00 and 6.25.
- Re-run of `checks/05-split-sheet.py`: **481 checks, 0 failures**, exit 0.
- `node src/cli.mjs check` on 05a, 05b and 05c: 3/3 clean, 0 errors, 0 warnings.
- Stills at 0, 1.5 and 3 s for 05b and 05c, with today's kits (05c also at 0.5, 1.0, 2.0 and 2.5 s):
  - **05b.** At 0.0 s: the 2-line header with $3,000 in green, the 2-line footer, the gold slab "TAKE-HOME, A MONTH $3,000" with the figure on it, and three bins with 50% / 30% / 20% tags and empty slots. At 1.5 s the figure holds up the "÷ 10" cleaver, "$3,0" is typing under the slab, and the caption reads "$3,000. Saw it into ten: $300 each." At 3.0 s the slab is 10 gold bricks over "$3,000 ÷ 10 = $300". No dollar result appears before 2.4 s, as both judges said.
  - **05c.** At 0.0 s: the 2-line header with $100 in green, the hero $100.00 with the bag icon, the footer, the full bar, and three rows (88.91% · ? / 9.15% · ? / ? · ?), with "YOUR COSTCO RUN" and the first caption already up. The pointer is on row 1 at 0.5 s. The hero counts down through ≈ $39.05 (1.0 s) and ≈ $11.61 (1.5 s) under the footer working "$264,279M ÷ $297,247M × $100 ≈ $88.91". Row 1's ≈ $88.91 slams in and the hero settles on ≈ $11.09 at about 2.0 s: the kit's 0.18 s cut plus a 1.35 s roll after the 0.5 s beat. That is inside the ~3 s target, but about 1.6 s after the VO says "$88.91". The beat sheet's "0.5" is the start of the cut.

### Hook pass 2 (2026-10-08)

The owner's round-1 note was "hooks are weak". In this pass, two judges scored each teaser's current hook, round-1's rewrite A resubmitted with render fixes (R1), and four new rewrites (A-D) out of 10. A hook is the header at t = 0, the first VO line, what happens in the first 1.5 s, and the platform title. The round-2 rule: average the two judges' scores per option; an option either judge marks dishonest is out; adopt the best option if its average is at least 1.0 above the current hook (a clear gain is adopted even below 7.5). Otherwise keep the current hook. 05a was not in this pass.

| Teaser | Current | R1 | A | B | C | D | Decision |
|---|---|---|---|---|---|---|---|
| 05b | 5 / 5 → **5.00** | 5.5 / 5.5 → 5.50 | 7 / 7.5 → **7.25** | 5.5 / 6 → 5.75 | 4.5 / 4, **out** (both judges: dishonest) | 5 / 4.5 → 4.75 | **Adopt A** (+2.25) |
| 05c | 5.5 / 6 → **5.75** | 6 / 6.5 → 6.25 | 7 / 7 → **7.00** | 6.5 / 7 → 6.75 | 6 / 5.5 → 5.75 | 5.5 / 6 → 5.75 | **Adopt A** (+1.25) |

**The options:**
- **05b.**
  - R1: round 1's A, "Rent is half your **$3,000**? / Then 50/30/20 leaves / food and bills:" ($0 verdict).
  - A (adopted): "Rent **$1,200** on 50/30/20? / Food and every bill get / this much a day:".
  - B: "On **$3,000** a month, 50/30/20 / lets you spend this much / a day on fun:" ($30 a day).
  - C: "50/30/20 on **$3,000** a month: / you work for rent and bills / until which day?" (10 half-days).
  - D: "Do 50/30/20 in your head. / **$3,000** take-home? / Move the decimal:".
- **05c.**
  - R1: round 1's A, "WHAT YOUR **$100** AT COSTCO / REALLY PAYS FOR:", with "So Costco pockets $11.09?" voiced and struck.
  - A (adopted): "IS COSTCO'S PROFIT / ALL MEMBERSHIP FEES? / FOLLOW YOUR **$100** CART:".
  - B: Costco against Chipotle on one $100.
  - C: "how many cents of your $1".
  - D: the hero melting down from $100.00.

**Why A, for 05b (7 / 7.5):**
- Rent is the number viewers know to the dollar, and $1,200 is the only dollar figure in the header (R2-R4).
- The tiny FOOD + BILLS 10% bin puts the shock on screen at 0.0 s (H71's red "25 YEARS", 190,187, 4.5x med).
- Ten countable $300 bricks slam in at 1.2 s (R9/R10).
- "$10 a day" is a small, repeatable verdict in a per-day unit (H49, 289.1x; H45, 140.6x), within HD Guy's P8 grammar (H04, 9.9M, 106x).
- It attacks a belief people actually hold: rent under half the take-home is fine under 50/30/20.
- Both judges re-did the maths: 0.5 × 3,000 − 1,200 = 300; 300 ÷ 30 = $10 ($9.86 over 30.44 days); bricks 4 + 1 + 3 + 2 = 10.

**What the judges still docked on 05b-A (not fixed here, because these are the scored words):**
- The header has no "you".
- "Rent $1,200 on 50/30/20?" reads clunky.
- The $3,000 that the answer depends on is only on the slab and the footer, not in the header or title.
- A savvy viewer can still compute 10% × 3,000 ÷ 30 from frame 1.
- The header's answer lands at 6.9 s.
- A later pass could try a header with "your" (for example "Your rent is $1,200?") and the $3,000 in the title. Either change would need a new score.

**Why A, for 05c (7 / 7):**
- It names a factoid viewers actually repeat and reverses it, in the yes/no and "NOT EMI" grammar (H18, 1.39M, 5.91x; H31, 578,461).
- It keeps "your $100 cart" as the stake.
- Every cart row is masked, so frame 1 no longer computes the answer, which was both judges' main complaint about the current hook.
- The contender's number (≈ $1.99) is on screen at 0.0 s, and the hero is moving by 0.68 s.
- The header no longer says "keep", which fixes the header-verdict mismatch named in hook pass 1.
- Judges' recomputation: 5,778 + 5,907 = 11,685 (49.4% / 50.6%); 1.9438 ÷ 1.9872 = 97.8%. Everything is before tax, and the footer says so.

**What they still docked on 05c-A:**
- It only bites for viewers who know the factoid.
- The loop is not countable.
- "About half each" is honest but not lopsided (R12).
- "All" softens the usual "most".
- The header runs to 3 lines.
- I added one honesty line to the md, the caption and the pinned comment: after tax, too, the fees are 64% of net income, not all of it.

**Out or not chosen:**
- 05b-C is out: both judges marked it dishonest. "Ten half-days a week. Each pays $300 of your $3,000" is false as spoken; one half-day pays ≈ $69 on $3,000 a month.
- 05c-B (6.75) came closest: two household names on one $100 (H16, 15.9M, 100.45x). But Chipotle's number arrives at about 12 s, and many viewers already guess Chipotle.
- No title-only swap was needed, since both teasers adopted a full hook.

**Applied (spec / md / check):**
- **05b spec:**
  - Header, footer ("ASSUMES $3,000 a month after tax · $1,200 rent · 30-day month"), 5 VO lines and verdict as in A.
  - `data.total` without the note.
  - 4 parts: Rent 40% $1,200 t 3.2; Food + every bill 10% $300 t 6.9 (goal, note "$300 ÷ 30 = **$10 a day**"); Wants 30% $900 t 10.0; Savings 20% $600 t 11.9.
  - Check "$1,200 + $300 + $900 + $600 = $3,000" at 13.4, hold 2.3, duration 29.3 → 22.5 s.
  - `tenth` t 2.4 → 1.2; the cleaver action t 1.0 → 0.15; stack actions 4 / 1 / 3 / 2; envelopes RENT / FOOD + BILLS / WANTS / SAVINGS.
  - Gag and spec sfx removed (the kit cues whoosh and hit).
  - Same as the candidate's linted scratch spec.
- **05c spec:**
  - Header, 6 VO lines and verdict as in A.
  - Row 3 label "Left for Costco" → "Left from your cart"; part times 0.5 / 4.8 / 8.9; checkT 10.7; hold 2.3; duration 26.0 → 22.8 s.
  - `remaining` at 0.5 / 8.9; `maskPct` [2] → [0, 1, 2]; `bonus.t` 16.0 → −1.2 (drawn landed at frame 1).
  - `footerSteps` at 0.5 / 4.8 / 8.9 / 13.6 / 17.0, the last now "cart $5,778M + fees $5,907M = $11,685M".
  - The `cash` sfx removed.
- **Write-up:**
  - The date line and spec runtimes.
  - The format summary, hook grammar and the at-a-glance table.
  - The full 05b and 05c sections: title, header, why this hook, rules, belief, beat sheet, VO script, maths, sources/assumptions, caption, pinned comment, platform and kit notes.
  - Open items 2 and 4, and this section.
- **Check script:**
  - 05b now derives the rent bin (B_RENT 1,200 → 4 bricks), food + every bill (1,500 − 1,200 = 300 → 1 brick → $10 a day) and the 4-bin %, amounts, notes, check and tools.
  - R2 now takes the header's input per teaser (05b: the rent, whose row is exempt from "no result in the header"; the fees figure counts as a result for 05c).
  - `maskPct` may mask every row as long as the goal row is masked.
  - `bonus.t` is anchored to frame 1.
  - "zero" counts as a spoken number ("Not zero.").
  - New facts: whole bricks, 30.44-day robustness ($9.86 → $10), the pinned-comment sums, cart > 0, "about half each" (49.4% / 50.6%), "almost as much" (97.8% exact, 97.5% shown), fees < net income (64.0%).
  - Removed: 05b's old $30-a-day and gap facts.

**Verification:**
- `python3 teasers/v2/checks/05-split-sheet.py`: **494 checks, 0 failed, exit 0**.
- In-memory mutation test of the two new specs: **10 of 10** caught (listed at the top of this file).
- `node src/cli.mjs check specs/05*.json`: 3/3 clean, 0 errors. One warning, on 05b: the "=" of the 4-amount check line is 38.7 px for a moment at 14.5 s while it assembles; it is full size when assembled, as in the 14.8 s still.
- **05b stills** at 0, 1.5, 3, 3.4, 7.2, 10.3, 12.3, 14.8 and 20.5 s:
  - **0.0 s:** the 3-line header with $1,200 in green, the 2-line footer, the slab TAKE-HOME, A MONTH $3,000 with the figure on it, and four bins (40% / 10% / 30% / 20%, the 10% slot visibly the lowest). The hook reads in frame 1.
  - **1.5 s:** 10 gold bricks over "$3,000 ÷ 10 = $300", the cleaver up, and the caption "Ten bricks of $300. Rent eats four."
  - **3.0 s:** bricks tumbling into RENT. At 3.4 s, $1,200 is on RENT, with "4 × $300 · needs get 5".
  - **7.2 s:** the lone brick in FOOD + BILLS, $300 on the gold plate, and "$300 ÷ 30 = $10 a day".
  - **20.5 s:** the check line and the verdict "$1,200 rent leaves food and every bill $10 a day."
- **05c stills** at 0, 0.5, 1.0, 1.5, 1.8, 2.0, 2.2, 3, 9.5-11.3, 14 and 17.6 s:
  - **0.0 s:** the 3-line header with $100 in green, the hero $100.00, the footer, three rows with "?" for both % and $, and the dashed fees row ≈ $1.99 with the pointer on it. The hook reads in frame 1, and no cart dollar is printed.
  - **0.5 s:** the pointer on row 1 and 88.91% unmasked.
  - **1.0 s:** the hero at ≈ $39.05.
  - **1.8 s:** ≈ $88.91 in the row and the hero on ≈ $11.09.
  - **10.6 s:** ≈ $1.94 lands, about 1.6 s after the VO says it, because of the kit's roll (as for row 1).
  - **17.6 s:** the verdict "Not all fees: your cart leaves ≈ $1.94. / Membership fees: ≈ $1.99." over the footer "cart $5,778M + fees $5,907M = $11,685M".
- `teasers.json`: format 5's titles, headers, runtimes, key numbers and hook scores are updated (05b 7.25, 05c 7.0: the judges' averages).

### Assembly pass (2026-10-08)

The owner rejected round 1 for its look and weak hooks, so this pass rendered all three teasers, read every beat's still and fixed what did not look finished. **No figure, VO line, header, footer or verdict changed.** Two display strings changed form (05a's check line; 05b's new payoff slab) and are pinned in the check script.

**What was wrong, and the fix:**
- **05a: the check beat was missing, and a hole sat under row 1 for 26 s.** Seven rows plus the guess under row 1 did not leave room for the 2-line check "check: $10.00 − $8.71 of costs = $1.29", so the layout engine dropped it: "Check: $10 minus $8.71 of costs" was voiced over a sheet with no check on it. And when the struck guess left at ≈ 7 s, its line stayed empty between rows 1 and 2.
  - The guess now sits on the bottom line under the sum rule (right under "Profit ?", the naive bottom line), stays there struck and dimmed while the real costs fill in (`until` 24.5), and the check types on the same line at 24.9: the right bottom line replaces the wrong one.
  - The check reads "$10 − $8.71 of costs = $1.29", which fits one 40 px mono line (35 characters) and matches the VO word for word. It still missed by 7 px, so the clean-sheet kit now lets a tight sheet start up to 10 px higher before it drops a feature.
- **05a: 4.5 s without motion in the hook window, and rows lit only 0.3 s before their amount.** The VO names each row 1-3 s before it says the number. The pointer now moves to each row as the VO names it (`activate`: "Crew" at 6.3, "Rent" 8.7, "Ads" 10.5, "Head office" 14.7, "Tax" 18.9, "What's left" 21.9; the profit % unmasks there), and the frame-1 hook figures nudge as they are said (`bumps`: the $10.00 total at 2.15, the coral $7.04 profit? at 4.05). The amounts still land on the spoken numbers.
- **05b: the payoff was not the climax.** The header asks for "this much a day", but "$10 a day" left the stage with its working line at 8.9 s and came back only as verdict text; the loudest thing in the last 7 s was the check line. A gold slab "FOOD + EVERY BILL · $10 a day" (`lookOpts.payoff`, new in the kit) now stamps into the empty air above the check at 18.4, on the spoken "$10" (impact, hit + cash, the figure celebrates). It mirrors frame 1's "TAKE-HOME, A MONTH · $3,000" slab and fills the band that sat empty from 12 s.
- **05b: 3 s of standing still before each cut** (3.5-6.3 and 7.1-9.4) while the VO talked the part in. A cut with more than 2.2 s of wait now raises the cleaver early and holds it over the cut, straining, then slams on the beat. The kit also stopped popping check tokens below 41 px, which cleared 05b's one lint warning.
- **05c: the membership beat had nothing on the board.** "Membership fees: ≈ $1.99 per $100 rung up" (12.5) only rewrote the footer; the row the header names sat unlit from 0.5 s to the end. With `bonus.focusT` 12.5 the pointer and the label stack return to it as the VO names it, and from the verdict it stays lit beside the cart row, so both figures the verdict weighs (≈ $1.94, ≈ $1.99) are marked.

**Not changed, on purpose:** 05c's ≈ 3 s reads after rows 1 and 2 land (the VO is speaking and the footer carries the working; moving the cuts earlier would put them before their spoken numbers); 05b's figure overlapping the post in the final pose (the halo keeps him readable); the clean-sheet profit box sitting 20 px left of the others (its 55 px goal figure is wider).

**Verification:**
- `python3 teasers/v2/checks/05-split-sheet.py`: **512 checks, 0 failed** (new: the check-line form, the payoff text and its anchor on "$10", the bonus return on vo[4]'s start, the hook nudges on "$10" and "$7.04", every row's activation on the word that names it, the guess held until the check).
- `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 0 warnings**. The kit samples for split-sheet (becker-rig ×2, clean-sheet ×3) are still clean.
- Stills read at every beat: 05a at 0, 1.4, 2.36, 4.26, 5.6, 6.6, 7.8, 13.6, 15.5, 23.8, 24.7, 26.5, 29.5, 33.0 and the last frame (= frame 1: the loop restores the guess and the "?"); 05b at 0, 0.6, 1.6, 3.5, 4.4, 5.4, 6.3, 6.62, 7.3, 8.4, 12.3, 13.9, 15.6, 18.3, 19.5 and the end; 05c at 0, 1.9, 5.2, 10.7, 11.5, 12.8, 14.5, 17.6 and the end. Every number on them matches the computed table above.
- MP4s rendered to `studio/out/` (33.6 s, 22.5 s, 22.8 s); three frames pulled from each with ffmpeg match the stills (PSNR 38-41 dB, x264 noise only).

### QA fix pass (2026-10-08)

QA scored the three at 5.5 (05a), 6.5 (05b) and 6 (05c). Every must, should and nit, and what was done. Figures did not change; three new display strings are pinned in the check (05b's slot "$10" and bracket "NEEDS 50% = 5 bricks", 05c's hero "≈ $3.93" with "PROFIT PER $100"), and one VO line changed (05c's last).

| Teaser | Sev. | Issue | What I did |
|---|---|---|---|
| 05a | must | The payoff was not the climax: ≈ $1.29 in a row-size cell, the verdict at ~44 px | `goalScale` 1.3: ≈ $1.29 lands 1.3x the other amounts and stays that size. `bigVerdict`: the verdict is a lockup in the caption band, "Chipotle keeps" at 64 px, **≈ $1.29** on its blue highlighter at ~90 px, ", not $7.04." in cost red, struck through at 22.1 s; the $10.00 total rests, so ≈ $1.29 is the biggest and only loud figure at the end (verdict text now "Chipotle keeps\n**≈ $1.29**, not __$7.04__.") |
| 05a | should | 33.6 s, seven identical beats, profit at 23.4 s | Rows 3-6 VO shortened ("Rent: ≈ 52 cents." / "Ads, delivery, card fees: ≈ $1.47." / "HQ, wear and tear, new stores: ≈ 91 cents." / "Tax, minus interest earned: ≈ 34 cents."), the spoken check line cut (the check types silently at 20.8), and the last two lines merged ("What's left: ≈ $1.29. Not $7.04."): **24.7 s, profit at 20.3 s**. Not reached: profit by ~17 s. QA's own suggested lines save ≈ 0.4 s once the spoken "≈" stays (the brand's honesty sign is in the captions, and "≈" is read "about"); getting to 17 s would mean dropping the spoken "≈" or the judged hook words "of your $10" / "Not even close" |
| 05a | should | Four accents at frame 1; a 2-line ~40 px footer between the hook and the sheet | `activate[0]` 0.4: row 1 (blue %, pointer) lights at 0.4 s, so frame 1's loud figures are the $10.00 and the coral guess. Footer: one line, "Chipotle FY2025 10-K average · not your order" |
| 05a | nit | The goal's empty slot was wider than the others | It is drawn at the common slot width until ≈ $1.29 lands |
| 05a | nit | Mono % decimal points read as gaps ("3 . 4%") | The split-sheet % column is set in Inter with tabular figures (local CSS); reported to the clean-sheet owner for the kit |
| 05a | nit | VO "Head office" vs row "HQ" | VO "HQ, wear and tear, new stores"; the caption says the same |
| 05a | nit | md: profit % masked "until 23.1 s" | Now "until the row activates at 19.3 s" (the spec's activate[6]) |
| 05b | should | The header's "this much a day:" pointed at nothing at frame 1 | `payoff.slot`: a dashed gold answer slot "$?" hung after the header's last line with a dotted leader from the colon, on screen from frame 1. The payoff slab's own spot is where the figure stands at frame 1, so the ghost lives beside the header instead; the 18.2 s slab stays as the re-slam, and the slot bumps with it |
| 05b | should | The first "$10 a day" was a grey 40 px working line that left at 8.9 s | **$10** stamps into the header slot at 7.1 s on the spoken "$10" (gold plate, gold ring, world shake, hit + cash) and stays to the end, at ~88 px: "this much a day: $10" |
| 05b | should | The 50% needs half was never drawn | `needs`: at 3.7 s, on "Needs", a bracket draws over the RENT and FOOD + BILLS amounts labelled "NEEDS 50% = 5 bricks", kept to the end. The part notes moved up into the air the slab frees, over their own bins |
| 05b | should | The cleaver kept "÷ 10" through later beats | It is relabelled at each raise with that cut's action ("4 × $300", "1 × $300", "3 × $300"), and shows "÷ 30" after the food brick lands (`actions[2].after`); the blade widens to fit |
| 05b | should | Header words ran together ("thismuch a day:") | The format sets its header at 0.2em word spacing, −0.01em tracking (refitted; same 60 px); reported to the becker-rig owner for the kit default |
| 05b | nit | Blank bricks | Each brick carries "$300" (30 px, fitted to the brick) until it drops |
| 05b | nit | Cramped amount row; "saving, extra debt" ran into the post | Amounts capped at 88% of a bin with ≥ 32 px air between neighbours (50 → 44 px; $1,200 and the $300 plate are 39 px apart); the note is "2 × $300 · savings" |
| 05b | nit | 3 score marks (one cutting into $3,000); faint dashed fill lines; empty stage 12.0-13.4 s | The slab is scored at all 9 brick seams with notches that stay in its rim; the fill targets are a solid line over a pale tint; the VO is retimed (the later lines 0.1-0.4 s earlier) and the check line leads its VO line by 0.5 s, so it starts at 12.6 s (the air above the bins is empty ≈ 1.1 s after the last brick, down from ≈ 1.8 s; runtime 22.5 → 22.1 s). The check script allows a check to lead its line by up to 0.6 s |
| 05c | must | The payoff landed ≈ 1.4 s after it was spoken; rows 1 and 2 lagged too; the footer printed $1.94 first; the check tested the cut | `lookOpts.rolls` 0.5 / 0.6 / 1.15 s with cuts at 0.25 / 4.5 / 7.8 s: the rows land at 0.93 / 5.28 / 9.13 s, each while its number is spoken ("$88.91" 0.38-1.15 s, "$9.15" 4.88-5.65 s, "$1.94" 8.95-9.72 s). `intro: true` keeps frame 1 on $100.00. Footer steps move to the landings. The check script now models the kit's landing (cut + 0.18 s + roll; the hero's t + 0.04 + 1.1 s) and tests it against the spoken word |
| 05c | should | The hero had no label, was never spoken, and read a stale ≈ $11.09 | `heroTag` "LEFT" from the first roll; the hero rolls to LEFT ≈ $1.94 as ≈ $9.15 lands (synced with row 2), so it always reads $100 minus the rows on the sheet; ≈ $1.94 is then spoken with row 3, and the hero's last figure is spoken too |
| 05c | should | Nothing big changed at the verdict | `heroFinal` { 17.0, "≈ $3.93", "PROFIT PER $100" }: the hero rolls ≈ $1.94 → ≈ $3.93 over the two lit rows (≈ $1.94 + ≈ $1.99), landing on the spoken "$3.93"; the last VO line is now "Profit: ≈ $3.93. Your cart makes almost half." (49.4%, checked) |
| 05c | should | The same number up to four times per frame | `labelWorking: false`: the label stack drops its formula and shows the note (or the bonus label at tag size); the footer returns to the assumption line at the check, so one working is on screen per beat |
| 05c | nit | "YOUR COSTCO RUN" at ~75 px at frame 1 | `introTag`: at tag size (Inter 42 grey) |
| 05c | nit | The frame-1 bar was an empty outlined strip with two stray ticks | `solidBar`: one solid green bar with "$100.00" on it until the first cut; no split ticks after it either |

**Verification:**
- `python3 teasers/v2/checks/05-split-sheet.py`: **531 checks, 0 failed**. Mutation test: 12 of 12 caught (listed at the top).
- `node src/cli.mjs check` on the three specs: **3/3 clean, 0 errors, 0 warnings**.
- Stills read: 05a at 0, 3, 12, 20.5, 22, 23.6 and the end; 05b at 0, 0.9, 4.2, 7.05, 7.1, 12.0, 13.6 and 19.5; 05c at 0, 0.95, 5.35, 9.2, 13.8 and 18.3; contact sheets of all three. Every number on them matches the computed tables.
- MP4s re-rendered to `studio/out/` (24.7 s, 22.1 s, 22.8 s). Frame strips pulled from the 05c MP4 at 5 fps show ≈ $88.91 in its row at 1.0 s and ≈ $1.94 at 9.0 s, each while the VO is saying it (QA measured 1.8 s and 10.4 s).
- Not changed: `teasers.json` (outside this pass's files) still lists the old runtimes (33.6 / 22.5 s) and check count for format 5.

### Port to Becker Rig (2026-10-08)

The owner watched the 30 teasers in four looks and kept two, Scoreboard and Becker Rig; Clean Sheet and Live Sheet are retired. 05a moved from Clean Sheet to Becker Rig, and the goal was to make it as strong there as 05b, the look's best split-sheet. **The hook, every number, every VO line, the footer and the verdict are unchanged.** `data` and `vo` are byte-identical to the Clean Sheet spec. Only `id`, `look` and `lookOpts` changed, plus the wrong guess's staging (its words "$7.04 profit?" are the same).

**Files:**
- `studio/specs/05a-becker-rig-chipotle-10.json` is new.
- The Clean Sheet spec was moved with `git mv` to `studio/specs/retired/05a-clean-sheet-chipotle-10.json`.
- `looks/becker-rig/formats/split-sheet.js` gained the opt-in carve layout and options (see "Look notes" under 05a).
- This write-up and `checks/05-split-sheet.py` were updated to match.

**What a straight port looked like, and the fix:**

| Problem (plain port, default lookOpts) | Fix |
|---|---|
| Seven parts with long labels forced the kit's rows layout. The figure stood in the floor corner and pointed: a bystander next to a table, not a figure working the maths | New `layout: "carve"`. Full-width one-line rows, with the figure on the slab sawing each cut as the VO names it. The pieces drop into their own row's lane (a waterfall of the $10), and the slab shrinks under his feet. He ends standing on the last piece, the profit, which drops out from under him |
| Profit's 12.9% printed at frame 1, which answers the header | `maskPct: [6]` in rows/carve: "?" until the row activates at 19.3 s, and the profit piece never carries its % on the slab |
| No wrong guess on screen at frame 1, so the hook lost its R5 device | `payoff.slot` with `ghost: "$7.04 profit?"`, `ghostTone: "bad"`: the guess hangs off the header's colon in red from frame 1. `strikeT: 5.2`: on "Not even close" he stomps on the slab and a red line slams through it. `t: 21.2`, `text: "≈ $1.29 profit"`: the answer stamps over it on the verdict's "Not $7.04" |
| No motion tied to the hook's words | `bumps`: the header's $10 swells on "your $10", the guess on "keeps $7.04?". `beats`: he looks up at 2.0, gives a palms-up shrug at 3.9, stomps at 5.2, points at the check at 20.85 and shrugs from 21.2 to the end |
| 40 px amounts, and pieces landing as thin underlines | The carve fitter: amounts 44 px, lanes 14 px with the gold piece filling its lane, figure 0.7 |
| Clean Sheet-only options did nothing | Dropped: `pointer`, `loop`, `goalScale`, `bigVerdict`, `wrongGuess`. The gold plate with impact, the stamped header slot and the kit's verdict swoosh carry the payoff |

**Found and fixed while reading the stills:**
- The default shrug raised the saw into the footer text, so the on-slab shrug is a low, palms-up variant (`shrugLow`).
- The first hop-off path crossed the amounts column. It was replaced by the drop onto the bracket.
- The check's fly-up crossed the amounts. The carve layout has no fly-ups.
- The stamp's gold ring overlapped the header's $10. The ring is smaller for a slot that has a strike.
- A beat's return to standing overrode the next beat. A beat now hands off to the next one, and a held beat beats the automatic closing poses.
- The goal amount dipped to 38 px mid-pop (lint warning at a 0.05 s step). Carve amounts never squash under 41 px.

**Check script:**
- It now points at the new spec and look.
- The guess and answer strings are pinned ("$7.04 profit?" = $10 − $2.96, and "≈ $1.29 profit" = the profit row).
- Timing anchors: the strike on vo[1]'s start, the answer on "Not", and every beat on its word (the check-line point is a silent beat).
- Becker-specific checks: the carve layout, the red ghost, the goal row plus the slot as the payoff, the struck guess staying up until profit has landed and the answer replaces it, and a stomp at strikeT.
- The Clean Sheet-only checks (goalScale/bigVerdict, the guess's `until`) are gone.

**Verification:**
- `python3 teasers/v2/checks/05-split-sheet.py`: **544 checks, 0 failed**. The in-memory mutation test caught **12 of 12**: a $7.40 guess, a ≈ $1.92 answer, an answer without "≈", the strike late, the answer before profit lands, the stomp off the strike, the rows layout, the shrug off its word, a guess that is not red, the profit % unmasked, row 3 lit at frame 1, and an unanchored beat.
- `node src/cli.mjs check`: 05a has **0 errors, 0 warnings** at the default step and at 0.05 s. 05b and both becker-rig split-sheet samples are still clean.
- Regression: 05b and both kit samples render **pixel-identical, with identical SFX**, against the committed `split-sheet.js` (14 frames each).
- Contact sheet and stills read at 0, 0.4, 0.8, 2.3, 4.2, 5.3, 6.3, 7.4, 8.4, 9.1, 10.1, 11.9, 12.9, 15.5, 16.5, 18.3, 19.3, 20.1, 20.35, 20.8, 21.25, 22.4 and the end. Every number on them matches the computed table: $10, $7.04 profit?, $10.00, 29.6/25.1/5.2/14.7/9.1/3.4/12.9%, ≈ $2.96 / $2.51 / $0.52 / $1.47 / $0.91 / $0.34 / $1.29, "$10 − $8.71 of costs = $1.29" and "≈ $1.29 profit".
- MP4: `studio/out/05a-becker-rig-chipotle-10.mp4` (24.7 s, 741 frames, 40 SFX cues). Frames pulled at 5.3, 12.9 and 24.5 s match the stills (PSNR 41.0 / 41.3 / 39.2 dB, x264 noise only).
- Not changed: `teasers.json` and the becker-rig README (outside this pass's files); both still need a line for the port.

### QA fix pass on the Becker Rig port (2026-10-08)

QA scored the ported 05a at **6.5**: correct and clean, with a strong hook, but short of 05b (the look's best split-sheet) and of 01c / 06c's 70-90 px gold hero plates. Every must, should and nit was fixed. **The hook, every number, every VO line and the verdict are unchanged.** Spec changes:
- `footer` is now "FY2025 10-K average · not your order".
- `data.checkT` moves from 20.8 to 20.45.
- `lookOpts.remainder` is new: `{ t: 0.9, text: "$7.04?" }`.
- `lookOpts.payoff` gains `t: 20.3`, `label: "Profit"` and `text: "≈ $1.29"`.

The new display strings are pinned in the check.

| QA item | Fix |
|---|---|
| **must** · The climax was split: the silent check was still typing until ~22.0, after the verdict and the header stamp (21.2), so four things competed for the eye | `checkT` 20.45. In carve the check assembles fast (token m at checkT + 0.1 + 0.06·m, each popping in 0.16 s), so "$10 − $8.71 of costs = $1.29" is complete by 21.07 and its box turns solid at 21.03. The verdict and the header stamp at 21.2 are now the last new event. The check script models this timing and fails if the line is not complete 0.1 s before the verdict. |
| should · The payoff did not read as the climax: ≈ $1.29 was a 44 px plate, the same size as every amount, and the 56 px check was the biggest thing in the working area | `payoff` now works in carve as a bookend of the frame-1 slab: a gold "PROFIT ≈ $1.29" slab at the same height (80 px) and figure size (68 px) as "YOUR ORDER $10.00". It stamps in at 20.3 with the profit row, in the air the slab and the figure have left, right over the check's box and as wide as it. It carries the goal's impact (burst, shake, 1.6% camera punch about it, hit, cash), and the row's plate just lands (thud), so there is one burst and one hit + cash. The check is now 50 px, so the 68 px payoff is the largest number in the working area. |
| should · After the food piece dropped, the slab became an anonymous bar showing only "25.1%" and "14.7%", so his "standing on $7.04" beat was invisible | `remainder`: from 0.9 s the rest of the slab reads **$7.04?** in the header guess's style (red, red dashed box). It swells with the guess bump at 4.05, is struck with the slot by his stomp at 5.2 (red line, greys), and fades by 6.1, leaving the slab plain. Carve draws no per-piece % on the slab. The check pins "$7.04?" to $10 − $2.96 and to the slot's ghost. |
| should · The footer wrapped as "…· not / your order" | "FY2025 10-K average · not your order", one line ("Chipotle" is in the header). The md's Assumptions note and the check's footer pin were updated. |
| should · The profit plate rose into the tax row's lane (≈ $0.34's piece sat on it like a nub, for the whole hold and the cover), and sat 20 px from "12.9%" | Carve's plate is trimmed (padding 12 × 4, was 14 × 7) and seated 2 px over the text line. The goal row is tall enough that the plate clears the lane above by at least 10 px (measured: tax lane ends at y 1210, plate starts at 1220). The % column sits 28 px left of the widest amount (plate 732, % ends 704). Pieces now slide to the left end of their lanes, so none sits next to the plate. |
| should · The waterfall pieces were 14 px bars just under the text, reading as underlines and scuffs, under "14.7%" and the ≈ signs | Each lane is a pale $10 track with a hairline edge. A piece fills its lane (18 px, was 14 px; the fitter now weighs lane thickness most) and, once landed, slides to the lane's left end. The lanes build into a left-aligned bar chart of the $10: crew about twice profit, and no bar under a % or an amount. Labels keep 6 px over their lane, so no descender touches a bar. To make room, the figure is 0.62 (was 0.66), labels sit on a 44 px line and the lane gaps are tighter; the slab stays 80 px and the amounts 44 px. |
| nit · Falling pieces crossed the amounts: at 20.05 the tipping profit piece covered "≈ $2.96"; at 20.35 the goal burst cut "≈ $0.34" and went below the floor | Pieces are already under the text layer. The last piece now drops straight down, with no tip about its foot, which had swung it over row 1's amount. He rides it down arms-up ('fall', not 'recoil', whose out-flung arms crossed the stamping slab) and drifts 20 px back onto the bracket. The goal row has no burst; the payoff slab's burst circumscribes the slab, so no line starts inside a corner, and stops above the footer. |
| nit · At frame 1 the cut notches bit into "$10.00"; at 0.4-0.6 the saw split "YOUR ORD\|ER" | Notches under the total's or the label's text box are bottom-only and shallow (6 px). The label fades as the first saw stroke starts (0.12-0.22 s), before the kerf reaches it. |

**Found and fixed while reading the stills:**
- The header slot re-bumped with a gold ring when the payoff stamped at 20.3, while it still showed the struck guess (a bins-mode re-slam meant for a payoff after the slot). The re-bump now fires only for a payoff after the slot's own stamp; 05b is unchanged.
- The payoff's 1.16× stamp pushed "PROFIT" to x 42 mid-stamp (lint at a 0.05 s step). Carve's stamp overshoots only as far as keeps the label at x ≥ 60 (about 1.08×).
- Landing, his head grazed the stamping slab's corner. The check's box and the payoff slab now stop short of where he lands.

**Verification:**
- `python3 teasers/v2/checks/05-split-sheet.py`: **554 checks, 0 failed**.
- The in-memory mutation test caught **11 of 11**: the old two-line footer wording, "$7.40?" on the slab, the slab label before food lands, the slab label after the strike, a ≈ $1.28 payoff, a payoff without "≈", a late payoff (20.8), a payoff labelled "Profits", `checkT` back at 20.8 (the check would finish after the verdict), no slab label, and no payoff slab.
- `node src/cli.mjs check`: 05a, 05b and both becker-rig split-sheet samples have **0 errors, 0 warnings**; 05a is also clean at a 0.05 s step.
- Regression: 05b and both kit samples render **pixel-identical, with identical SFX**, against the committed `split-sheet.js` (41 frames each).
- Contact sheet and stills read at 0, 0.1, 0.2, 0.3, 0.5, 0.95, 1.0, 4.1, 4.15, 5.25, 5.4, 5.85, 6.0, 7.55, 12.5, 18.1, 20.05, 20.1, 20.15, 20.16, 20.22, 20.28, 20.3, 20.34, 20.35, 20.38, 20.45, 20.6, 20.7, 21.0, 21.3 and the end. Every number on them matches the computed table: $10, $7.04 profit?, $7.04?, $10.00, 29.6/25.1/5.2/14.7/9.1/3.4/12.9%, ≈ $2.96 / $2.51 / $0.52 / $1.47 / $0.91 / $0.34 / $1.29, PROFIT ≈ $1.29, "$10 − $8.71 of costs = $1.29" and "≈ $1.29 profit".
- MP4: `studio/out/05a-becker-rig-chipotle-10.mp4` (24.7 s, 741 frames, 42 SFX cues). Frames pulled at 4.2, 20.4 and 24.5 s match the stills (PSNR 40.5 / 38.9 / 39.4 dB, x264 noise only).
- Not changed: `teasers.json` and the becker-rig README (outside this pass's files). The README's split-sheet section still needs a line for carve, `remainder` and carve's `payoff`.
