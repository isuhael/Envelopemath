# 08 · Unit ladder ("Cost in units of X"): three teasers

**Format:** `unit-ladder` (rank 8 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P8**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews). All three hooks were rewritten on 2026-10-08 in hook pass 2, and the round-2 QA fix pass (2026-10-08) rebuilt the reveals and payoffs. On 2026-10-08 08c was **ported from Clean Sheet (retired) to Becker Rig**; see the [Review log](#review-log).
**Specs:** the file names are kept from the first draft (08c's carries its new look).
- [`studio/specs/08a-scoreboard-costco-hot-dogs.json`](../../studio/specs/08a-scoreboard-costco-hot-dogs.json). The hook is now "What your $1.50 hot dog would cost if it rose like a house".
- [`studio/specs/08b-becker-rig-hours-at-15.json`](../../studio/specs/08b-becker-rig-hours-at-15.json). The hook is now "At $15/hr, you work for rent from the 1st to the ___".
- [`studio/specs/08c-becker-rig-college-in-big-macs.json`](../../studio/specs/08c-becker-rig-college-in-big-macs.json). The hook is now "Community? In-state? Out-of-state? Private? Your year in Big Macs". The Clean Sheet version is kept for reference in [`studio/specs/retired/08c-clean-sheet-college-in-big-macs.json`](../../studio/specs/retired/08c-clean-sheet-college-in-big-macs.json).

**Maths check:** [`checks/08-unit-ladder.py`](checks/08-unit-ladder.py).
- It recomputes every on-screen number from the sourced inputs, in exact fractions, and rebuilds every display string and VO line from those numbers. Then it compares them with the three specs, leaf by leaf.
- 08b divides by the **defined unit $13.10** (the kept hourly rounded to the cent), the same operand the screen shows in "÷ $13.10".
- Timing:
  - every VO line fits 2.6 words/s;
  - no VO lines overlap;
  - each rung's **question line** names it in its first words and starts on its cut. In 08b it starts up to 1.4 s after the cut. 08c's rung 1 is pre-filled before frame 1 and read at 0.0. 08a's rung 1 cuts under the opener line and is asked after it;
  - since the fix pass, each rung's **number has its own caption line**, which starts as the built kit lands the count (never before it, at most 0.6 s after). No caption prints an answer, grey or whole, before the screen shows it (QA's 08b must and the 08a/08c karaoke nits);
  - the first count lands within 3 s (R10);
  - the header is at most 15 words (R8).
- It replays all three built kits' own timing rules from `looks/<look>/formats/unit-ladder.js` (the times below are the round-2 cut's; the condensed cut's are in its beat sheets):
  - **Scoreboard (08a):** the counter roll, including the unit intro.
  - **Becker Rig (08b, 08c):** coin drop, punch and fill; for 08c also the pre-fill of a rung cut before frame 1 and `lookOpts.landAfter` (each count lands 1.7 s after its cut).
  - In all three, the voice never says a number more than 0.5 s before its counter lands.
  - **08a's payoff** (`lookOpts.payoff`): its question line ("Rose like a house?") and the footer's working start on the payoff cut (16.80 s); the hero rolls from the unit price to the verdict's number; the **verdict lands with the hero** (18.40 s), and the voice says "≈ $7.01" after it (18.78 s).
  - **08b's blank** (`lookOpts.blank`): it starts ticking during its question line ("Every hour you work, to…"), prints the same day the voice says, lands (6.40 s) as its answer line starts (6.40 s), sits between rung 0's landing and rung 1's cut, and its month grid holds the day. **08b's morph** (`lookOpts.morph`): on the verdict's beat its working is the last count ÷ 2,080 a year, and its number is the verdict's ≈ 14.
  - **08c's asked takeaway** (`lookOpts.morph` with `ask`): it is asked after the last count lands, on its question line ("Versus community?", 15.85 s); its working divides the costs of the two piles it compares ($45,000 ÷ $4,150, both rungs on screen); its number is that ratio to 0.1 (10.8, after the working's "≈"); it lands on the verdict's beat (17.35 s), and the voice says "≈ 10.8" after it (18.50 s). The verdict carries the same number and label.
- It also checks:
  - the contract shape;
  - "≈" on every rounded result;
  - the calendar claim behind 08b's "≈ the 20th", on a 30-day month, on the average month and on a Monday-Friday calendar for all 7 weekdays the 1st can fall on;
  - every pinned-comment and caption number in this file.
- **Result: PASSED, all 677 checks** (503 before the assembly pass, 524 after it, 680 after the fix pass; the Becker Rig port of 08c replaced the Clean Sheet replay (674); its QA fix pass added 3; see the [Review log](#review-log)).
- **Cut-aware since the condensed cut (2026-10-13).** Each teaser has two expectation sets, picked by the spec's length: the round-2 cut (22.0 / 27.0 / 22.0 s, what `studio/specs/` holds; `IN_SPECS` names it) and the condensed cut (`studio/specs-wip/`, checked with `--spec [KEY=]PATH`). The condensed set swaps the narration rules for caption pacing (≥ max(1.2 s, 0.12 s a word) on screen, back to back), frame-1 and no-still rules, and the payoff windows; see the [Condensed cut](#condensed-cut-2026-10-13-08a-08b-08c) entry. **PASSED: 680 checks by default** (677 + one "which cut" row per teaser) **and 701 with `--spec` on the three condensed specs.** 23 mutations of the condensed specs are all caught.
- **Mutation test:** on scratch copies of the three specs, six mutations: in 08a the verdict ≈ $7.01 → ≈ $7.00 and the rung-1 cut back to 2.0 s; in 08b "≈ the 20th" → "≈ the 18th" and vo[2] back on its cut at 8.4 s; in 08c one count ≈ 5,125 → ≈ 5,126 and row 1 moved to t = 0.0, so it is no longer pre-filled. 16 of 503 checks fail, and the script exits with code 1. Every mutation is caught by an independent rule as well as by the leaf-by-leaf comparison: R10 (first count at 3.48 s), the voice 0.69 s ahead of the counter, row 1 not pre-filled, or a number that is not computed.
- **Assembly-pass mutations:** 08b's blank "≈ 20th" → "≈ 18th", 08b's blank start 4.7 → 6.0 s, and 08a's payoff start 20.2 → 21.5 s. Each fails 3 checks (the leaf comparison plus two independent rules: a number that is not computed or a day the voice does not say; the blank landing after the voice; the payoff landing 0.98 s after the voice), and the script exits with code 1.
- **Port mutations** (08c in Becker Rig, scratch copies, 2026-10-08): `landAfter` 1.7 → 2.2 s; the morph's number 10.8 → 10.9; its working's divisor $4,150 → $11,950; the ask 15.85 → 13.0 s (before the last count lands); rung 1 cut at 0.0 instead of −1.0 (no longer pre-filled); verdict and morph 17.35 → 16.9 s. Each fails 3-6 checks, always including an independent rule (an answer line before its count lands; a number that is not the working's ratio; a working that does not divide the compared piles; an ask before the last landing; a rung not landed by frame 1; the voice off the verdict's beat), and the script exits with code 1.
- **Fix-pass mutations** (scratch copies, 2026-10-08): 08a's verdict 18.4 → 16.8 s (before the hero lands); 08a's "≈ 43" cue 3.2 → 2.5 s (before its count); 08b's "≈ 117 hours" cue 2.4 → 1.0 s; 08b's morph working 30,053 → 30,000; 08c's payoff "≈ 10.8×" → "≈ 10.9×"; 08c's verdict 17.35 → 16.5 s. Each fails 3-4 checks, always including an independent rule (the verdict landing before its hero or box; a number cue outside its count's window; a morph that is not the last count ÷ 2,080; a payoff that is not the costs' ratio), and the script exits with code 1.

**Studio linter** (`node src/cli.mjs check`): **3/3 clean, 0 errors, 0 warnings.** That covers safe zones, the type floor, overlap, contrast and the R1 hook number. The kits' `unit-ladder` samples (Scoreboard 2, Becker Rig 2) still lint clean after the port's and the 08c QA fix pass's format changes, and 08b renders pixel-identical to before them (109 stills every 0.25 s, compared in the same run). The fix pass changes the Becker Rig samples' recap only (no lone leader in `unit-ladder.json`, its "≈" in its own column). I rendered all three in the built kits and checked these stills by eye:
- 08a at 0.0, 1.5, 2.9, 3.0, 4.9, 9.5, 17.95, 18.05, 18.2, 21.6 and 25.9 s; in the assembly pass at 0, 3, 9.5, 13.5, 15.9, 18.2, 20.9, 22.5 and 25.97 s; in the fix pass at 0, 12.6, 16.0, 18.0 and 19.0 s plus a 12-frame contact sheet;
- 08b at 0.0, 1.5, 3.0, 6.5, 10.55, 10.68, 10.8, 19.6, 19.72, 19.8, 23.5 and 26.9 s; in the assembly pass at 0, 4.6, 5.5, 6.45, 6.8, 8.0, 15, 19.8, 22.5 and 26.97 s; in the fix pass at 0, 5.6, 8.8, 9.3, 9.5, 9.7, 9.8, 9.9, 13.6, 14.3, 18.0, 18.6, 18.7, 19.0, 22.3, 23 and 26.97 s plus a contact sheet;
- 08c (Clean Sheet, retired) at 0.0, 1.5, 3.0, 5.4, 13.5, 15.8, 17.6 and 21.4 s; in the assembly pass at 0, 2, 5.5, 9.5, 13.5, 15.8, 18, 20.7 and 21.47 s; in the fix pass at 0, 14.2 and 19.5 s plus a contact sheet;
- 08c (Becker Rig port) at 0, 0.4, 3.0, 3.5, 3.85, 4.1, 4.6, 5.06, 5.1, 5.14, 5.3, 7.6, 8.2, 9.16, 9.2, 9.24, 9.4, 11.7, 12.0, 12.19, 13.31, 13.35, 13.39, 13.5, 14.5, 15.85, 16.0, 16.4, 17.3, 17.35, 17.4, 17.45, 17.5, 17.6, 18.0 and 21.97 s, plus a 12-frame contact sheet; in its QA fix pass at 0, 0.5, 1.5, 2.5, 3.2-4.2 (8 stills), 5.1, 9.2, 12.2, 13.1-14.6 (every 0.1 s), 15.0, 15.9-16.8 (10 stills), 17.1-18.6 (every 0.1 s, and every frame 17.30-17.47), 19.5 and 21.97 s, plus a 12-frame contact sheet and frames pulled from the MP4 at 0, 16.6 and 21.9 s.

The counters read as the check predicts on both sides of each tested landing, for example 1,391 → 1,402 across 10.63 s and 29,971 → 30,053 across 19.67 s (assembly-pass timing), and in the 08c port 1,914 → 1,921 across 5.10 s, 5,107 → 5,125 across 9.20 s and 7,216 → 7,235 across 13.35 s.

**Web searches used:** 14 in the first draft (log at the end), 1 in the first revision (the Costco frank and soda change, for the "same hot dog" fix) and 2 in the fix pass (a 2005 median new-house price; not used, see the search log). Hook pass 2 and the fix pass added no new facts: 08a's new rent rung reuses 08b's sourced Census rent, and every other new number is arithmetic on the sourced inputs.
- The egress proxy blocks census.gov, fred.stlouisfed.org, huduser.gov, eia.gov, collegeboard.org and most news sites. Those figures were confirmed from search-result text that quotes the source, plus a second source.
- The Big Mac price was read directly from The Economist's own dataset on GitHub.
- The verifier independently re-checked every input with 12 searches and a direct download of the Big Mac CSV, and all of them match.

---

## (a) The format in 5 lines

1. **What it is.** One division, cost ÷ unit price, repeated on a ladder from cheap to huge. A counter and a growing stack of unit icons show each answer, and the biggest lands last. The unit price sits in a small footer or unit row. It runs 26-40 s with no CTA and loops back to rung 1.
2. **The breakouts are all HD Guy:**
   - "Cost in Units of RTX 5090", **30,617,461 views (62.49x)**, 26 s. https://www.youtube.com/shorts/E2oVrAwHDOw
   - "Rifle to Nuclear Weapon Cost (Navy)", **16,229,536 (183.76x)**, 33 s. https://www.youtube.com/shorts/M2c2F712ywo
   - "Cost in Units of Starbucks Lattes", **9,858,084 (106.16x)**, 40 s. https://www.youtube.com/shorts/NHbMe2F_JXY
   - Plus Monster Energy, 4,336,760 (28.92x), https://www.youtube.com/shorts/jlKUWdrrqEI, and Big Macs, 1,748,759 (56.76x), https://www.youtube.com/shorts/Hv6aZR4hUEI.
   - The series is 24 shorts since 2026-07-26, with a median of about 126K and about 50.0M views in total.
3. **The unit decides it.** Cheap, habitual or tribal units broke out. Luxury and abstract units flopped:
   - Lamborghini Supercars, 44,417.
   - MacBook Pros, 38,676.
   - University Degrees, 64,954.
   - Single Family Homes, 75,738.
   - **Costco Hotdog Combos, 80,139 (1.44x)**.
   - Costco Rotisserie Chicken, 105,690 (1.42x).
   - HD Guy's one civilian pay topic, "Wages Visualized In Real Time", got **9,025**.
4. **What does not transfer.**
   - HD Guy's spectacle is military footage we will not have, and it shows no method at all.
   - Only one channel runs the format, which is why it rates viability 5.
   - The untested part is a personal-finance subject. So every teaser below re-prices **the viewer's own big purchases** (rent, a phone, a house, a degree) in a unit the viewer has paid. It also adds the one thing HD Guy never shows: the working (the "÷" line and the rounded answer).
5. **What we keep from HD Guy:**
   - frame 1 has the rule already running;
   - the input is in the footer;
   - one division per rung;
   - the biggest number last;
   - no CTA;
   - a hard loop.

   **What we add:**
   - "≈" on every rounded count;
   - a verdict line (R12);
   - a VO the owner records;
   - a **header that names the subject and the stake**, not just the unit. HD Guy never needs this, because his footage is the subject. We have no footage, and his own hot-dog title is the benchmark's flop (H13).
   - HD Guy has no voice at all, so an SFX-only cut is worth an A/B test (see the platform notes).

**Hook grammar (P8), adapted:** HD Guy's "Cost in Units of [a cheap, familiar item]" (6 words, no number) works when the footage carries the subject. Without footage, the judges marked the literal copy weak (08a scored 4/10: its header was H13 word for word). So each header now **names what is being priced, gives one input and leaves one question open**. These are the hook pass 2 headers:
- 08a: "WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE" (a counterfactual price for the viewer's own purchase)
- 08b: "At **$15/hr**, you work for rent / from the 1st to the ___" (a blank on the viewer's own calendar)
- 08c: "Community? In-state? / Out-of-state? Private? / Your year in **Big Macs**" (a row for every kind of student)

All three keep HD Guy's footer device: "Tall Latte ☕ = $4.45" (H04) and "Price of RTX 5090 32GB: ~$4,899" (H01).

---

## (b) The three teasers at a glance

| | 08a | 08b | 08c |
|---|---|---|---|
| Look | Scoreboard | Becker Rig | Becker Rig (ported from Clean Sheet, 2026-10-08) |
| Platform title | What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House | At $15/hr, You Work for Rent From the 1st Until… | Community? In-State? Private? Your Year of College in Big Macs |
| On-screen header (t = 0) | WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE | At **$15/hr**, you work for rent / from the 1st to the ___ | Community? In-state? / Out-of-state? Private? / Your year in **Big Macs** |
| Words in hook | 13 | 11 | 9 |
| Unit (footer or unit row) | $1.50 hot dog + soda, the same price since 1985 | $13.10, the ≈ $13.10 you keep per $15 hour | $6.22 Big Mac (The Economist, Jul 2026), in the footer and in every "÷ $6.22" working |
| Frame 1 | Hero "$1.50" and one hot dog landing at 0.2 s, label "YOUR HOT DOG + SODA" | The figure beside the $1,531 rent coin, HUD "$1,531 ÷ $13.10 = / ? hours of work" | Rung 1 pre-filled: HUD "Community / $4,150 ÷ $6.22 ≈ / 667 Big Macs", its pile of Big Macs standing, the figure pointing at it |
| Rungs | 4: membership → a month of rent → house 1985 → house Aug 2026 | 4: rent month → rent year → new car → new house | 4: Community → In-state → Out-of-state → Private (1 year of tuition & fees each), then the asked takeaway |
| First count lands (condensed cut; round-2 cut in brackets) | 1.98 s (2.98 s) (≈ 43) | 2.20 s (2.10 s) (≈ 117) | pre-filled at 0.0 (≈ 667) |
| Twist | The hot dog never rose. Had it risen like a new house: **≈ $7.01** | Rent takes every hour you work from the 1st to **≈ the 20th** | One private year is **≈ 10.8×** a community-college year |
| Payoff lands (condensed; round-2) | 12.33 s (18.40 s) (hero ≈ $7.01 + verdict) | 11.25 s (21.80 s) (the plate morphs to "14 · years of full-time work" + verdict) | 10.50 s (17.35 s) (the plate lands "10.8 · community-college years" + verdict) |
| Runtime (body + the 2.5 s end card) | condensed 13.93 + 2.5 = 16.43 s (round-2 22.0 + 2.5) | condensed 12.85 + 2.5 = 15.35 s (27.0 + 2.5) | condensed 12.1 + 2.5 = 14.6 s (22.0 + 2.5) |
| Captions (no narration; condensed cut) | 9 lines, 7 shown, 26 words shown (round 2: 11 VO cues, about 52 words) | 8 lines, 7 shown, 28 words (11 cues, about 57) | 8 lines, 7 shown, 13 words (9 cues, about 40) |
| Verdict | Rose like a house? / A **≈ $7.01** hot dog. | **≈ 14 years** of full-time work. / Every cent you keep. | One private year = / **≈ 10.8** community-college years. |
| Hook score (two blind judges, hook pass 2: current → adopted) | 4.5 → **6.0** | 5.75 → **7.0** | 5.25 → **6.5** |

**Topic choices, and why**
- **08a keeps the hot dog and turns its frozen price into the stake.**
  - HD Guy's hot-dog short flopped (80,139, 1.44x) when the hot dog was just another cheap unit over military footage.
  - Ours starts from the fact that makes the Costco hot dog famous: **$1.50 in 1985, still $1.50**. The header asks what the viewer's own $1.50 hot dog would cost had it risen like a new house, and the ladder answers it.
  - The verdict is one repeatable price: $1.50 × ($393,700 ÷ $84,300) = **≈ $7.01**.
  - The new-car rung was dropped in the first revision because 08b uses the same car. In the fix pass the iPhone 18 Pro rung was replaced by **a month of median rent** (≈ 1,021 hot dogs), so every rung after the Costco card builds the housing comparison (QA: the membership and iPhone were 9 s of filler).
- **08b turns the wage into the ruler for the three biggest bills** (rent, a car, a house).
  - The hook puts rent on the viewer's own calendar. Rent takes ≈ 117 of a month's ≈ 173 work hours, so you work for rent from the 1st to **≈ the 20th**.
  - Take-home pay is lane 1's subject, so it lives only in the footer and the "÷ $13.10" working, never in a spoken beat.
- **08c uses the Big Mac, not the brief's $6 latte.** Three reasons:
  1. No primary source publishes a US latte price. Format 6's writer searched and found only one dataset (FinanceBuzz: grande latte $4.45 in 2024), with no second source, so "$6" could not be verified.
  2. The Big Mac has a primary, dated price: **$6.22**, The Economist's Big Mac index, July 2026.
  3. It is a proven HD Guy unit (1,748,759 views, 56.76x). Lattes and the latte factor also already belong to 06c (Starbucks).
  - In hook pass 2 the ladder became four like-for-like rows (one year of published tuition & fees each), all named in the header. The full-budget "4 years with housing & food" row moved to the pinned comment.
- **Shared rungs:** the median new house appears in 08a (in hot dogs, 1985 vs 2026) and in 08b (in hours of work), and since the fix pass the Census median rent does too (08a: one month ≈ 1,021 hot dogs, the housing bill today next to a whole 1985 house; 08b: the rent month and year in hours). They make different points in each.

---

## 08a · Scoreboard · "What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House"

**Spec:** the condensed cut (2026-10-13) is `studio/specs-wip/08a-scoreboard-costco-hot-dogs.json` · **13.93 s** + the 2.5 s end card · captions on · lints clean · rendered in the Scoreboard kit. `studio/specs/08a-scoreboard-costco-hot-dogs.json` holds the 22.0 s round-2 cut until the ship step promotes the condensed one (see the [Review log](#condensed-cut-2026-10-13-08a-08b-08c)).

**Platform title:** What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House
**On-screen hook (header):** WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE
**Footer (t = 0):** Hot dog + soda: $1.50 in 1985. Still $1.50.
**Unit intro (t = 0):** hero "$1.50" beside the hot-dog icon; label "YOUR HOT DOG + SODA"

### Why this hook

**Modelled on:**
1. **H45 and H44, @investment_timeline.** "POV: You invested in Monster instead of paying $3/day for a Monster Energy", **1.5M (140.6x)**, https://www.tiktok.com/@investment_timeline/video/7671760671867997473. "…instead of paying $50 for a pair of Crocs", **1.9M (117.9x)**, https://www.tiktok.com/@investment_timeline/video/7676037874105519393. The viewer's own small, repeat purchase is the stake, and the answer is a counterfactual price.
2. **H48 and H49, The Debt Freedom Project.** A question on screen, answered by a verdict caption: "What difference does…", **1,900,000 (902.5x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637. "Yes, daily payments work!", **382,100 (289.1x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133. A tiny, honest verdict travels (R12). Ours: "Rose like a house? A ≈ $7.01 hot dog."
3. **H01 and H04, HD Guy.** "Cost in Units of RTX 5090", 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw, and "Cost in Units of Starbucks Lattes", 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. The unit-price footer ("Tall Latte ☕ = $4.45") becomes ours: "Hot dog + soda: $1.50 in 1985. Still $1.50."
- **Contrast we design against: H13, HD Guy, "Costco Hotdog Combos", 80,139 (1.44x).** The same unit with no reason for it. Ours makes the frozen price the stake and asks a question only the ladder can answer.

**Frame 1 is one subject.** Until the first cut at 0.5 s (1.5 s in the round-2 cut; the condensed cut cuts as the hot dog settles, so nothing stands still) the header, the hero "$1.50" with its hot-dog icon, the big hot dog dropping in (it lands with a squash and a pop at 0.2 s), the label "YOUR HOT DOG + SODA" and the caption ("Your $1.50 hot dog.", whole on frame 1 and up to 1.95 s) are all about the same $1.50 purchase. The kit draws this as its built unit intro, because rung 1 starts at 0.5 s or later; since the fix pass the hero shows the price (`lookOpts.introHero: "price"`), not a bare "1", and the label drops its own "$1.50" line. The hero opens on "$1.50" and the payoff rolls up from "$1.50", so the video starts and ends on the same number. Round 1's frame 1 was split three ways: house in the header, membership on the counter and frozen price in the voice.

**Rules:**
- **R1 (pass):** "$1.50" is in the header, the hero and the footer at 0.0 s.
- **R2 (pass):** one $ figure in the hook line, the input. The result (≈ $7.01) appears only at the payoff: the hero rolls up to it and lands at 12.33 s (18.40 s in the round-2 cut), and the verdict states it on the same beat (never before it).
- **R3 (pass):** the $1.50 is a price most viewers have paid, labelled "YOUR HOT DOG + SODA". Rung 1 (the $65 membership) fits members only.
- **R4 (pass):** $1.50 is small, round and familiar. The unit is still the benchmark's flop (H13), and the judges docked it.
- **R6 (pass):** you, the $1.50, and 1985 → 2026.
- **R8 (pass):** 13 words on 2 lines.
- **R10 (pass):** the unit lands at 0.2 s and the first count (≈ 43) at 1.98 s. The biggest count is the last rung (≈ 262,467 at 10.18 s), and the answer (≈ $7.01) is the last number the hero lands on (12.33 s). Round-2 cut: 2.98, 14.77 and 18.40 s.
- **R11 (pass):** the header is a question, and the verdict answers it.
- **R12 (pass):** "a ≈ $7.01 hot dog" is one repeatable number.
- **R5 (partial):** the header implies that prices "just rose together". The ladder shows the house rising ≈ 4.7× in the one ruler that never moved. Both judges called this belief weak.
- **R9 (partial):** one open question, answered at 12.33 s (18.4 s in the round-2 cut, 20.2 s before its fix pass), and 4 unlabelled rung pips. It is not a countable loop.

**The wrong belief it plays on:** "Everything went up together."
- Costco never raised the hot dog. A median new house went from **56,200 hot dogs in 1985** to **≈ 262,467 in August 2026**: **≈ 4.7×** the hot dogs.
- Had the hot dog risen like the house, it would cost **≈ $7.01** today ($1.50 × 4.6702 = $7.0053). Equivalently, the 2026 house divided over 1985's 56,200 hot dogs is $393,700 ÷ 56,200 = $7.0053 each.
- These are sticker prices, not inflation-adjusted, and the caption and pinned comment say so.
- **On screen** (fix pass): the 1985 wall re-packs into a white mound inside the green Aug 2026 wall, tagged "1985" and "AUG 2026" (`lookOpts.split`), and stays lit through the payoff. The ≈ 4.7× is the visible ratio of green to white (21.4% white), and the footer prints the payoff's working, "$393,700 (Aug 2026) ÷ 56,200 hot dogs (1985)", under the rolling hero.

### Beat sheet (condensed cut, 2026-10-13: rungs cut at 0.5 / 2.48 / 4.92 / 7.36 s, the payoff at 10.73 s, the verdict at 12.33 s; body 13.93 s + the 2.5 s end card = 16.43 s)

Counter landing times are the Scoreboard kit's own (replayed by the check). Line 1 of each label is "cost ÷ $1.50", and line 2 is the item. Each rung cuts 0.5 s after the previous count lands (the kit's floor: a rung's roll always ends at least 0.5 s before the next cut), so the counter is never left standing. Each question goes up 0.72 s after its cut, once the previous answer's caption has had its 1.2 s; each number has its own caption from its landing. The round-2 cut's beat sheet (22.0 s, paced for a recorded voice) is in git history (`git show d71fd5c:teasers/v2/08-unit-ladder.md`).

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header "WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE"; footer; hero "$1.50" beside the hot-dog icon; one big hot dog mid-fall; label "YOUR HOT DOG + SODA"; 4 rung pips | "Your **$1.50** hot dog." (up from −0.4 s, so it is whole on frame 1) |
| 0.2 | The hot dog lands (squash + pop) | |
| 0.5 | Cut (thud). Label "$65 ÷ $1.50 / YOUR COSTCO MEMBERSHIP" slams in; the pile re-packs and the counter rolls from 1 (0.92) | (same line) |
| 1.98 | Counter lands **≈ 43** (ding); 43 dogs stacked | "Costco card? **≈ 43** hot dogs." |
| 2.48 | Cut. "$1,531 ÷ $1.50 / A MONTH OF MEDIAN RENT, 2026"; the pile re-packs and the counter rolls | (same line) |
| 3.2 | | "A month of rent?" |
| 4.42 | Counter lands **≈ 1,021** | "**≈ 1,000**." |
| 4.92 | Cut. "$84,300 ÷ $1.50 / A MEDIAN NEW HOUSE, 1985"; the pile turns into an LED-dot wall | (same line) |
| 5.64 | | "A new house in 1985?" |
| 6.86 | Counter lands **56,200**; the dot wall fills the stage (one dot ≈ 12 hot dogs) | "**56,200**." |
| 7.36 | Cut + riser. "$393,700 ÷ $1.50 / A MEDIAN NEW HOUSE, AUG 2026". The 1985 wall pulls back into a mound of ≈ 21% of the stage and turns white; the "1985" tag pops onto it (7.83); the new green dots rain in around it at the same scale | (same line) |
| 8.08 | | "And a new house in 2026?" (up to the payoff cut) |
| 10.18 | Counter lands **≈ 262,467** (hit + cash); the green wall fills the stage around the white 1985 mound; the "AUG 2026" tag pops on | (same line) |
| 10.73 | Payoff cut. Label "ROSE LIKE A HOUSE?"; the footer becomes the working "$393,700 (Aug 2026) ÷ 56,200 hot dogs (1985)"; the hero cuts to "$1.50" and rolls up from 10.93 (its "≈" an unlit ghost). The split wall stays lit. Captions hide from here: the label carries the line | ("Rose like a house?", under the label) |
| 12.33 | The hero lands **≈ $7.01** (hit + cash, glow, floor bloom) and the verdict slams in on the same beat: "Rose like a house? / A **≈ $7.01** hot dog." (reveal + ding) | ("A ≈ $7.01 hot dog.", under the verdict) |
| 12.33-13.93 | Verdict hold (1.6 s) | (none) |
| 13.93-16.43 | The end card (unchanged) | |

**Why rung 1 cuts at 0.5 s.** Frame 1 is the hook (header, hero "$1.50", the falling hot dog, the label and the whole caption). The hot dog lands at 0.2 s and settles by 0.33 s; the kit keeps its unit intro only while rung 1 starts at 0.5 s or later, so 0.5 s is the earliest cut that keeps frame 1 and leaves no still. The first count lands at 1.98 s (R10, was 2.98 s).

**Why the last count has no caption of its own.** The payoff cut 0.55 s after the count hides the caption band (the label stack carries the payoff's question), so "≈ 262,000." could not be up for 1.2 s without 0.6 s of standing picture before the payoff. The hero prints ≈ 262,467 and the "AUG 2026" tag lands with it; "And a new house in 2026?" stays up through the landing.

### Captions (on-screen text, no narration; 9 lines, 7 shown, 26 words shown)

| t | d | Caption text (spec) | On screen |
|---|---|---|---|
| −0.4 | 2.35 | Your **$1.50** hot dog. | 0.0-1.95 (1.95 s) |
| 1.98 | 1.2 | Costco card? **≈ 43** hot dogs. | 1.2 s (merged: round 2 had "Costco card?" and "≈ 43 hot dogs." as two lines) |
| 3.2 | 1.2 | A month of rent? | 1.2 s |
| 4.42 | 1.2 | **≈ 1,000**. | 1.2 s |
| 5.64 | 1.2 | A new house in 1985? | 1.2 s |
| 6.86 | 1.2 | **56,200**. | 1.2 s |
| 8.08 | 2.65 | And a new house in 2026? | 2.65 s, through the landing at 10.18 |
| 10.73 | 1.6 | Rose like a house? | hidden: the label stack shows it |
| 12.33 | 1.2 | A **≈ $7.01** hot dog. | hidden: the verdict shows it |

Each shown line is up for at least max(1.2 s, 0.12 s a word), back to back (gaps 0.02-0.03 s). The two hidden lines keep the narration text for an A/B VO cut. Dropped: "≈ 262,000." (see above).

### The maths

**Rule:** count = cost ÷ $1.50, shown to the nearest whole hot dog, with "≈" unless the division is exact. The VO rounds for speech: exact if whole; below 1,000 to the unit; 1,000-9,999 to the 100; 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Your Costco membership | $65 ÷ $1.50 | 43.3333 | ≈ 43 | ≈ 43 |
| A month of median rent, 2026 | $1,531 ÷ $1.50 | 1,020.6667 | ≈ 1,021 | ≈ 1,000 |
| A median new house, 1985 | $84,300 ÷ $1.50 | 56,200 (exact) | 56,200 | 56,200 |
| A median new house, Aug 2026 | $393,700 ÷ $1.50 | 262,466.6667 | ≈ 262,467 | ≈ 262,000 |
| House ratio (not shown; drives the verdict) | $393,700 ÷ $84,300 | 4.670225 | ≈ 4.7× | (not spoken) |
| **Verdict: the hot dog risen like a house** | $1.50 × 4.670225 | 7.005338 | **≈ $7.01** | ≈ $7.01 |
| The footer's working at the payoff | $393,700 ÷ 56,200 | 7.005338 | (hero ≈ $7.01) | (not spoken) |
| The white 1985 share of the Aug 2026 wall | 56,200 ÷ 262,466.67 | 0.2141 | 21.4% (≈ 21% of the cells) | (not spoken) |

- The ratio is the same in hot dogs and in dollars (262,466.67 ÷ 56,200 = 4.6702), because the unit price never moved. The check asserts this.
- The verdict also equals $393,700 ÷ 56,200 = $7.005338: what each of 1985's 56,200 hot dogs would have to cost to buy the August 2026 house. The check asserts both forms.
- **Captions are rounded on purpose.** The caption shows the spoken figure (≈ 262,000) while the hero counter shows the exact count (≈ 262,467). The screen is the working and the voice is the takeaway, as the format research recommends: "$143K ÷ ~$4.50 ≈ 32,000 lattes. The screen shows 32,168" (04-formats, rank 8). The same rule holds in 08b. Since the fix pass 08c's captions print the box's figure instead, because there the caption sits in the same column as the box. In 08a each figure now has its own cue, which starts as the hero lands it.
- The 1985 house fills the stage with dots of ≈ 12 hot dogs each; at the 2026 cut it re-packs into ≈ 21% of the same wall at the same dot scale and turns white, so the ≈ 4.7× is the visible ratio of the whole wall to its white core (assembly pass + fix pass). The hero carries the counts and then the ≈ $7.01; the footer carries its working.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| Costco hot dog + soda, same price since 1985 | $1.50 | 13 ABC (WTVG/Gray), "Costco's iconic $1.50 hot dog combo debuts new change for the first time in decades", **2026-04-29**. The combo now offers a 20 oz soda or bottled water, still $1.50. https://www.13abc.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/ | NPR via HPPR, "Costco hot dogs have cost $1.50 since the 1980s. Here's why prices aren't changing", **2024-06-04**. https://www.hppr.org/2024-06-04/costco-hot-dogs-have-cost-1-50-since-the-1980s-heres-why-prices-arent-changing. Also Scripps News (CEO Ron Vachris: "will not change as long as I'm around"; date not captured): https://www.scrippsnews.com/business/company-news/costcos-1-50-hot-dog-combo-faces-inflation-the-ceos-answer |
| What changed while the price did not (wording only; not on screen) | Hebrew National → Kirkland Signature franks in 2009; 12 oz can → 20 oz fountain drink | Food Republic, "Why Costco's Food Court Stopped Selling Hebrew National Hot Dogs". https://www.foodrepublic.com/2135138/costco-food-court-hebrew-national-hot-dogs | The verifier's own check (same facts). This is why nothing on screen says "same hot dog". |
| Costco Gold Star membership, from 2024-09-01 | $65 a year | Axios, "Costco membership fees increase Sunday: What to know", **2024-08-31**. https://www.axios.com/2024/08/31/costco-membership-cost-increase-2024-renewal-price | Disney Food Blog, **2024-07-11** (on Costco's 2024-07-10 announcement; first increase since 2017). https://disneyfoodblog.com/2024/07/11/costco-is-raising-membership-prices-how-much-more-will-you-be-paying. 2026 coverage (search 1) still describes the 2024 rise to $65 as the latest. |
| Median asking rent, vacant for-rent units, Q2 2026 (fix pass; replaces the iPhone 18 Pro rung) | $1,531/month | as 08b (U.S. Census Bureau HVS, Q2 2026, **2026-07-28**) | as 08b |
| *(dropped in the fix pass)* iPhone 18 Pro, US starting price | $1,199 | MacRumors, **2026-09-09**. https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/ | Appleosophy, **2026-09-12**. No longer on screen. |
| Median sales price of new houses sold, August 2026 (preliminary, not seasonally adjusted) | $393,700 | U.S. Census Bureau / HUD, New Residential Sales, August 2026, **released 2026-09-24**. https://www.census.gov/construction/nrs/pdf/newressales_202608.pdf | First Trust, "New single-family home sales increased 6.4% in August", **2026-09-24**. https://www.ftportfolios.com/Commentary/EconomicResearch/2026/9/24/new-single-family-home-sales-increased-6.4percent-in-august |
| Median sales price of new houses sold, 1985 (annual) | $84,300 | FRED (St. Louis Fed), series MSPNHSUSA (Census data), 1985 value. https://fred.stlouisfed.org/data/MSPNHSUSA | HUD, U.S. Housing Market Conditions, historical table 8. https://www.huduser.gov/periodicals/ushmc/summer03/histdat08.htm. Also GOBankingRates, "How Much House Could $500K Buy in the 80s vs. Today" (date not captured). https://www.gobankingrates.com/?p=1938847 |

**Notes on the inputs**
- NAR's existing-home median (round 1 used $429,100) is a different measure. 08a uses the Census new-house series for both years, so the two houses compare like for like.
- The 2026 figure is one month (August, the latest release as of 2026-10-07). The on-screen label says "Aug 2026", and the 1985 rung is the annual median.

### Assumptions (footer, on screen at t = 0)

> Hot dog + soda: $1.50 in 1985. Still $1.50.

Each rung's label gives its basis (median new house, 1985 annual or August 2026).
- **Not shown on screen:** the house prices are sticker prices, not inflation-adjusted, so the ≈ $7.01 is a sticker-to-sticker counterfactual. That is the point of the frozen ruler, and the caption and pinned comment say so.
- Only the price is the same. The frank (Kirkland since 2009) and the drink (20 oz) changed, so nothing on screen says "same hot dog".

### Caption / description

> Costco never raised the $1.50. If it had risen like a new house: ≈ $7.01.
> Costco's hot dog + soda: $1.50 in 1985, still $1.50. A median new house: 56,200 hot dogs in 1985, ≈ 262,467 in Aug 2026: ≈ 4.7× the hot dogs. $1.50 × 4.67 ≈ $7.01.
> (Costco $65 Gold Star; Census median asking rent $1,531, Q2 2026; Census median new house $84,300 in 1985 and $393,700 in Aug 2026. Sticker prices, not inflation-adjusted. Maths, not advice.)
> #costco #hotdog #housingmarket #moneymath

### Pinned comment

> Yes, these are sticker prices, not inflation-adjusted. That's the point of the hot dog: Costco never raised the $1.50 (the frank became Kirkland in 2009 and the soda grew to 20 oz, but the price didn't move). In dollars the house went $84,300 → $393,700 (Aug 2026), ≈ 4.7×. Spread over 1985's 56,200 hot dogs, the 2026 house is $393,700 ÷ 56,200 ≈ $7.01 a hot dog. Any price ÷ 1.5 = your hot dogs. What should we price next?

### Per-platform notes

- **YouTube Shorts (home of every P8 breakout):**
  - Title exactly "What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House". Like the round-1 title, it does not compete in search with HD Guy's flopped "Costco Hotdog Combos" upload.
  - No CTA, a hard loop.
  - A/B test an SFX-only cut (a thud on each cut, roll ticks, hit + cash on the finale; no VO, captions off so the label stack does the talking) against the VO cut. HD Guy's 30.6M short has no voice at all.
- **Instagram Reels:**
  - VO cut with captions on.
  - Cover: the final frame: hero "≈ $7.01" over its working, the white 1985 mound inside the green Aug 2026 wall, and the verdict "Rose like a house? A ≈ $7.01 hot dog."
  - Caption line 1: "Costco never raised the $1.50. If it had risen like a new house: ≈ $7.01."
- **TikTok:**
  - VO cut.
  - Caption line 1 is the same, and it asks "what next?" at the end.
  - The tribe is Costco fans: #costco #costcofinds.

---

## 08b · Becker Rig · "At $15/hr, You Work for Rent From the 1st Until…"

**Spec:** the condensed cut (2026-10-13) is `studio/specs-wip/08b-becker-rig-hours-at-15.json` · **12.85 s** + the 2.5 s end card · captions on · lints clean · rendered in the built Becker Rig `unit-ladder`. `studio/specs/08b-becker-rig-hours-at-15.json` holds the 27.0 s round-2 cut until the ship step promotes the condensed one.

**Platform title:** At $15/hr, You Work for Rent From the 1st Until…
**On-screen hook (header):** At **$15/hr**, you work for rent / from the 1st to the ___
**Footer (t = 0):** ≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax

### Why this hook

**Modelled on:**
1. **H48 and H50, The Debt Freedom Project: answers that travel as a date.** H48, **1,900,000 (902.5x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637. H50, **290,700 (127.3x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318. Ours: "≈ the 20th".
2. **H73, The Market Hustle, "You've got 93 days left in 2026."**: 46,137, https://www.instagram.com/reel/Dd5KkdPs20G/. A stake stated on the viewer's own calendar.
3. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206 (2.8x med), https://www.instagram.com/reel/Dd2QzRzRrGT/. The wage in the hook filters the viewer in. His best wage reel was also his lowest wage and smallest goal ("$20/HR → $10K SAVED"), which is why we use $15.
4. **H01 / H04, HD Guy, "Cost in Units of RTX 5090" (30,617,461, 62.49x) and "Cost in Units of Starbucks Lattes" (9,858,084, 106.16x).** The rule is running at frame 1, and the unit is an hour of your own work.
- **Contrast we design against: H15, HD Guy, "Wages Visualized In Real Time", 9,025.** A wage alone as spectacle flopped. Ours turns the wage into the ruler for the bills the viewer pays.

**Becker devices, as the kit builds them** (`looks/becker-rig/formats/unit-ladder.js`):
- **"Operators are tools":** the figure punches the price coin (a karate chop for small coins), and it bursts into units.
- **"Results are transformations":** hour icons arc over and stack into a brick pyramid while the counter rolls. The "=" in the working turns into "≈" when the rounded count lands.
- **"Scale is shown by the camera":** each new pile pushes the camera back until the whole row, cheap to huge, is in frame. Since the fix pass, the piles already standing fade out as the push-in takes them past the top of the stage or the right edge and fade back in as the pull-back brings them home, so no pile is ever sliced flat by the frame (QA: half-clocks cut at y ≈ 885 on every cut).
- **The finale:** the last count lands on a gold plate with the impact kit; he jumps, then slumps (drawn at least ≈ 150 px tall, about half his full size). At the verdict the HUD **morphs** into the takeaway (`lookOpts.morph`): the working line becomes "30,053 hours ÷ 2,080 a year ≈", the gold plate shrinks round **14** at hero size, and the label becomes "years of full-time work". The recap table is gone (`pileLabels: false`): the four piles already compare, and the end screen goes to the one focal number.
- **The month, drawn** (`lookOpts.blank.calendar`): a 30-day month grid beside the "117 hours of work" counter fills its days in step with the header's ordinals, 1st to 20th, and stays while the rent pile is on (condensed cut: it fades in from 0.03 s and fills while the hours pile up, to rung 2's cut at 2.95 s; round-2 cut: 4.6-8.4 s).

**Rules:**
- **R1 (pass):** "$15/hr" is in the header and "≈ $13.10" in the footer at 0.0 s. The HUD reads "Median rent, 1 month / $1,531 ÷ $13.10 = / ? hours of work", beside the gold $1,531 coin. Since the fix pass his pencil is tucked behind his ear (it counter-rotates against part of his head tilt), not sticking out of his head like an arrow.
- **R2 (pass):** one $ figure in the hook line, the input.
- **R4 (pass):** $15 an hour is small and round, and many viewers earn it.
- **R5 (pass):** the blank invites the guess "rent is about a week of work". The answer is ≈ the 20th: ≈ 2 of every 3 hours you work.
- **R6 (pass):** you, $15 an hour, your rent and this month, starting on the 1st.
- **R8 (pass):** 11 words on 2 lines.
- **R9 (pass):** exactly one visible blank to fill ("___").
- **R10 (pass):** ≈ 117 lands at 2.20 s and the header's blank on ≈ 20th at 2.55 s, as the line that carries both ("≈ 117 hours. Every hour you work, to ≈ the 20th.") starts. The biggest number is last. Round-2 cut: 2.10 s (its line at 2.40 s) and 6.40 s.
- **R11 (pass):** one question, the blank.
- **R12 (pass):** "≈ the 20th" and "≈ 14 years of full-time work".
- **R3 (partial):** one wage, and the rent is the Census median, not yours. The pinned comment gives the rule for your own rent and wage.
- **The blank is answered on screen:** from 0.15 s (condensed cut; 4.7 s in the round-2 cut) the header's "___" ticks up through the days (1st, 2nd, … in grey) while the month grid beside the counter fills day by day and the hours pile up, and at 2.55 s (6.40 s) it lands on **≈ 20th** in green with a green rule and a ding, while the figure points up at it (`lookOpts.blank`; in the condensed cut the point is scripted with `lookOpts.beats`). The header then reads "from the 1st to the ≈ 20th" for the rest of the video. Frame 1 shows both the "___" and the "? hours".
- **No caption spoils a reveal** (fix pass, QA's must): Becker captions pop a whole line at once, so each answer has its own line that starts as its count or the blank lands. Before the fix "≈ 117 hours" was printed at 0.25 s under "? hours", and "the 20th" at 5.4 s while the blank still read "9th".

**The wrong beliefs it plays on:**
1. "Rent is about a week of work." At the median asking rent it is ≈ 117 hours, which is 67.4% of a full-time month's 173.33 hours (≈ 2 of every 3). Laid on the calendar from rent day, that is the 1st to **≈ the 20th**.
2. "At $15 an hour, a thing costs price ÷ 15 hours." You keep ≈ $13.10, so every count is ≈ 14.5% bigger than the gross-wage guess (15 ÷ 13.10 = 1.145). The footer and the "÷ $13.10" working show this; it is not spoken.

### Beat sheet (condensed cut, 2026-10-13: every count lands 2.2 s after its cut (`lookOpts.landAfter`), rungs cut at 0 / 2.95 / 5.55 / 8.15 s, the verdict at 11.25 s; body 12.85 s + the 2.5 s end card = 15.35 s)

Times are the built Becker Rig kit's own (replayed by the check). Each rung: a gold coin drops in (thud), he winds up and punches it, the units fill and the count lands. Each later rung cuts 0.4 s after the previous count (or, for rung 2, the blank) lands, while the landing still moves; each question goes up 0.82 s after its cut, once the previous answer's caption has had its 1.2 s. The round-2 cut's beat sheet (27.0 s) is in git history.

| t (s) | On screen (Becker Rig) | Caption |
|---|---|---|
| 0.0 | Header with the blank "___"; footer; HUD "Median rent, 1 month / $1,531 ÷ $13.10 = / ? hours of work"; the figure beside the gold $1,531 coin | "$15 an hour? Median rent:" (up from −0.4 s, whole on frame 1) |
| 0.03-0.23 | The 30-day month grid fades in beside the counter | |
| 0.15 | The header's blank hands over to a rule sized for the answer and the days tick up on it (1st, 2nd, … in grey), the grid filling day by day | |
| 0.47-0.72 | He winds up and punches the coin (hit + shake); hour icons arc into a pyramid and the counter rolls, while the days keep ticking | |
| 2.20 | Counter lands **117**; "=" turns to "≈" (the header is on the 18th) | |
| 2.41 | He points up at the header (`lookOpts.beats`) | |
| 2.55 | The blank lands on **≈ 20th** (green, pop, ding); the rule turns green; 20 of the grid's 30 days are green | "**≈ 117 hours**. Every hour you work, to **≈ the 20th**." |
| 2.95 | Cut: HUD "Median rent, 1 year / $18,372 ÷ $13.10 = / ?"; the month grid clears; the camera pushes in; a new coin drops; punch at 3.86 | (same line) |
| 3.77 | | "A year of rent?" |
| 5.15 | Counter lands **1,402**; the camera pulls back to show both piles | "**≈ 1,400**." |
| 5.55 | Cut: "An average new car / $50,089 ÷ $13.10 ="; punch at 6.46 | (same line) |
| 6.37 | | "An average new car?" |
| 7.75 | Counter lands **3,824** | "**≈ 3,800**." |
| 8.15 | Cut: "A median new house / $393,700 ÷ $13.10 ="; punch at 8.93 | (same line) |
| 8.97 | | "A median new house?" (up to the verdict) |
| 10.35 | Counter lands **30,053** on the gold plate (hit, shake, flash); he jumps, then slumps (11.15) | (same line) |
| 11.25 | Verdict: "**≈ 14 years** of full-time work. / Every cent you keep." The HUD morphs: "30,053 hours ÷ 2,080 a year ≈ / [**14**] years of full-time work" (the plate shrinks round the 14, hit lines, pop) | ("That's ≈ 14 years …", under the verdict) |
| 11.25-12.85 | Verdict hold (1.6 s) | (none) |
| 12.85-15.35 | The end card (unchanged) | |

**The blank, condensed.** The round-2 cut filled the header's blank on a beat of its own (4.7-6.4 s, its own question line), and that beat measured near-still: only the small grey ordinals and the 26 px grid cells change. Now the days tick while the hours pile up (0.15-2.55 s), so the punch, the flying icons and the rolling counter carry the frame, and the count and the day land 0.35 s apart. Frame 1 still shows "___" and "? hours" (the tick starts at 0.15 s; the grid fades in from 0.03 s). One caption then carries both answers and the question between them. The kit points him up at the blank only when the next cut is 0.9 s or more away, so the spec scripts the point (`beats: [{ t: 2.41, act: "pointUp", d: 0.5 }]`).

**Why the last count has no caption of its own.** The verdict lands 0.9 s after the count (the brief's 0.8-1.5 s) and hides the caption band, so "≈ 30,000 hours." could not be up for 1.2 s. The plate prints ≈ 30,053, and the morph keeps "30,053 hours" in its working line to the end.

### Captions (on-screen text, no narration; 8 lines, 7 shown, 28 words shown)

| t | d | Caption text (spec) | On screen |
|---|---|---|---|
| −0.4 | 2.93 | $15 an hour? Median rent: | 0.0-2.53 (2.53 s) |
| 2.55 | 1.2 | **≈ 117 hours**. Every hour you work, to **≈ the 20th**. | 1.2 s (merged: round 2 had three lines, "≈ 117 hours.", "Every hour you work, to…" and "≈ the 20th.") |
| 3.77 | 1.36 | A year of rent? | 1.36 s |
| 5.15 | 1.2 | **≈ 1,400**. | 1.2 s |
| 6.37 | 1.36 | An average new car? | 1.36 s |
| 7.75 | 1.2 | **≈ 3,800**. | 1.2 s |
| 8.97 | 2.28 | A median new house? | 2.28 s, through the landing at 10.35 |
| 11.25 | 1.2 | That's **≈ 14 years** of full-time work. Every cent you keep. | hidden: the verdict shows it |

Dropped: "≈ 30,000 hours." (see above).

### The maths

**Take-home per hour** (2026, single filer, standard deduction, wages only, no state income tax):

| Step | Formula | Value |
|---|---|---:|
| Gross a year | $15 × 2,080 hrs (40 × 52) | $31,200 |
| Taxable | $31,200 − $16,100 standard deduction | $15,100 |
| Federal income tax | 10% × $12,400 + 12% × ($15,100 − $12,400) | $1,564.00 |
| FICA | 7.65% × $31,200 (below the $184,500 wage base) | $2,386.80 |
| Kept a year | $31,200 − $1,564.00 − $2,386.80 | $27,249.20 |
| Kept per hour | $27,249.20 ÷ 2,080 | 13.10058 → **≈ $13.10** |
| **The unit (defined)** | kept per hour, rounded to the cent | **$13.10** |
| Tax + FICA per hour | $15 − 13.10058 | 1.8994 → ≈ $1.90 |

**Rule:** hours = cost ÷ $13.10. We define the unit as the rounded $13.10, so the operand on screen ("÷ $13.10") reproduces every count on a calculator. The footer keeps the "≈" on what you actually keep. Counts are shown to the nearest hour with "≈", and spoken to the 100, or to the 1,000 at 10,000 and up.

| On screen | Formula | Exact | Shown | VO / conversion |
|---|---|---:|---:|---|
| Median rent, 1 month | $1,531 ÷ $13.10 | 116.870 | ≈ 117 | ≈ 117 hours; ÷ (2,080 ÷ 12 = 173.33) = 0.6743 → 67.4% |
| (the blank) | 0.6743 of the month, from the 1st | | | **≈ the 20th** (see below) |
| Median rent, 1 year | ($1,531 × 12 = $18,372) ÷ $13.10 | 1,402.443 | ≈ 1,402 | ≈ 1,400 hours |
| An average new car | $50,089 ÷ $13.10 | 3,823.588 | ≈ 3,824 | ≈ 3,800 hours |
| A median new house | $393,700 ÷ $13.10 | 30,053.435 | ≈ 30,053 | ≈ 30,000 hours; ÷ 2,080 = 14.449 → "≈ 14 years" |
| The morph (HUD at the verdict) | 30,053 hours ÷ 2,080 a year | 14.448 | 14 (on the plate, after "≈") | ≈ 14 years |

**"From the 1st to ≈ the 20th"** (all asserted by the check):
- Proportionally, rent's share of the month's work hours, 0.6743, is 20.23 days of a 30-day month and 20.51 days of the average month (365 ÷ 12 = 30.42 days). Both round to the 20th within 0.6 of a day.
- On a real calendar, with 8-hour workdays Monday to Friday from the 1st, 116.870 ÷ 8 = 14.6 workdays, so rent's last hour is worked on the 15th workday of the 21.67 in a month. Depending on the weekday the 1st falls on, that is the 19th, 20th or 21st (the 1st on a Monday → the 19th; on a Saturday → the 21st).
- In short: 117 of 173 work hours, or 67.4% of the month.

Other notes:
- "Every cent you keep" is the assumption made explicit: 14 years only if all take-home pay goes to the house, with no interest.
- The caption's "not a week of work" check: 116.870 ÷ 40 = 2.92 work-weeks.
- Using the unrounded 13.10058 instead would change no rounded count by more than 1 (≈ 3,823 and ≈ 30,052), and no VO figure at all.
- **Pinned-comment numbers** (also checked):
  - At $20/hr you keep ≈ $17.12 (85.6%).
  - At $25/hr you keep ≈ $21.14 (84.5%).
  - At $15/hr you keep 87.3%.
  - Same formula: gross × 2,080, minus 2026 federal tax and FICA.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| Median asking rent, vacant for-rent units, Q2 2026 | $1,531/month | U.S. Census Bureau, "Quarterly Residential Vacancies and Homeownership, Second Quarter 2026", **2026-07-28**. https://www.census.gov/housing/hvs/files/qtr226/Q226press.pdf | Same series, Q4 2025: $1,464 (Census, Q425 release), a consistent level. https://www.census.gov/housing/hvs/files/qtr425/Q425press.pdf. This is a primary statistic with a single publisher; the verifier confirmed the Q2 2026 figure independently. |
| Kelley Blue Book average new-vehicle transaction price, August 2026 | $50,089 | Cox Automotive, "August 2026 ATP report" (data tables PDF alongside), **2026-09-10**. https://www.coxautoinc.com/insights/august-2026-atp-report/ | KBB press release via Cision (WBOY), "Average New-Vehicle Transaction Price Moves Back Above $50,000 in August", **2026-09-10**. https://digital-release.wboy.com/business/press-releases/cision/20260910LA45270/kelley-blue-book-report-average-new-vehicle-transaction-price-moves-back-above-50000-in-august |
| Median sales price of new houses sold, Aug 2026 | $393,700 | as 08a | as 08a |
| 2026 standard deduction, single | $16,100 | IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026…", **2025-10-09**. https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | CPA Practice Advisor, **2025-10-09**. https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/ |
| 2026 single brackets: 10% to $12,400; 12% to $50,400 | | IRS Rev. Proc. 2025-32 (**2025-10-09**). https://www.irs.gov/pub/irs-drop/rp-25-32.pdf | Tax Foundation, "2026 Tax Brackets". https://taxfoundation.org/data/all/federal/2026-tax-brackets/ |
| FICA 7.65% (6.2% Social Security to $184,500, plus 1.45% Medicare) | | SSA, "2026 Social Security Changes" fact sheet (Oct 2025). https://www.ssa.gov/cola/factsheets/2026.html | Kiplinger, "Six Changes to Social Security in 2026". https://www.kiplinger.com/retirement/social-security/changes-coming-to-social-security-in-2026 |

**Notes on the inputs**
- The $48,397 "September" figure that also turned up in the KBB search matches KBB's **September 2024** release. KBB normally publishes September data in mid-October, so August 2026 is the latest month as of 2026-10-07.
- The tax parameters were verified with two sources each by the format 1 writer, in [`01-dead-simple-list.md`](01-dead-simple-list.md) (tax check), and again by this format's verifier. They are reused here unchanged.
- At $31,200 a single filer with no children is past the EITC phase-out, so no credit applies.

### Assumptions (footer, on screen at t = 0)

> ≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax

Also assumed:
- a 40-hour week and 52 weeks (2,080 hours, 173.33 a month);
- for "≈ the 20th", the month's work hours run from rent day, the 1st;
- no benefit premiums or 401(k) deferrals;
- median asking rent (Census), as the rung label says;
- a car and a house at sticker price, with no loan interest.

### Caption / description

> At $15/hr, rent takes every hour you work from the 1st to ≈ the 20th.
> After 2026 federal tax + FICA (single, no state tax), $15 an hour keeps ≈ $13.10, so every price here is ÷ $13.10. Median rent ($1,531) ≈ 117 hours a month: 67.4% of a full-time month, ≈ 2 of every 3 hours you work. A median new house ($393,700) ≈ 30,053 hours: ≈ 14 years of full-time work, every cent you keep.
> (Rent: Census median asking rent, Q2 2026. Car: KBB average, Aug 2026. House: Census median new, Aug 2026. Maths, not advice.)
> #hourlywage #rent #housing #moneymath

### Pinned comment

> Rent at $15/hr: 117 of 173 work hours (67.4% of the month), so you work for rent from the 1st to ≈ the 20th. Your wage? Divide the price by what you KEEP per hour, not by your wage. At $15 you keep 87.3% (≈ $13.10). At $20/hr it's ≈ $17.12 (85.6%), at $25/hr ≈ $21.14 (84.5%), before state tax. Your rent ÷ that = your hours. What should we price in your hours next?

### Per-platform notes

- **TikTok (lead platform):**
  - Wage reels live here.
  - VO cut, captions on.
  - Caption line 1: "At $15/hr, rent takes every hour you work from the 1st to ≈ the 20th."
  - Expect "not every state…" comments. The footer pre-empts them, and the pinned comment answers.
- **Instagram Reels:**
  - Same cut.
  - Cover: the 117-hour pile with the header's "≈ 20th" above it and the month grid filled to the 20th.
  - Caption line 1 is the same.
- **YouTube Shorts:**
  - Title "At $15/hr, You Work for Rent From the 1st Until…". It holds the answer back for the video.
  - No CTA; the video loops.

---

## 08c · Becker Rig · "Community? In-State? Private? Your Year of College in Big Macs"

**Spec:** the condensed cut (2026-10-13) is `studio/specs-wip/08c-becker-rig-college-in-big-macs.json` · **12.1 s** + the 2.5 s end card · captions on · lints clean (0 errors, 0 warnings) · rendered in the built Becker Rig `unit-ladder`. `studio/specs/08c-becker-rig-college-in-big-macs.json` holds the 22.0 s round-2 cut until the ship step promotes the condensed one. Ported from Clean Sheet on 2026-10-08 (the old spec is in `studio/specs/retired/`); the hook, every number, the VO and the verdict are unchanged. The QA fix pass after the port (2026-10-08) changed only the format's staging, not the spec (see the [Review log](#review-log)).

**Platform title:** Community? In-State? Private? Your Year of College in Big Macs
**On-screen hook (header):** Community? In-state? / Out-of-state? Private? / Your year in **Big Macs**
**Footer (t = 0):** $6.22 Big Mac (Jul 2026) · 1 year of / College Board 2025-26 tuition & fees

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. A row for every viewer, with the first row landing at 0 s. Ours names every row in the header: the Becker Rig HUD shows one rung at a time, and the recap table lists all four from 14.4 s.
2. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme…"**: 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. The answer is already on screen at 0.0. Ours pre-fills rung 1: its pile and its count are standing at frame 1.
3. **H11, HD Guy, "Cost in Units of Big Macs"**: 1,748,759 views (56.76x), https://www.youtube.com/shorts/Hv6aZR4hUEI. The same unit, already proven.
- **Contrast:** HD Guy's "University Degrees" *as the unit* got 64,954. We use college as the subject and a cheap, familiar unit as the ruler.

**Frame 1** (checked in the 0.0 s still), all drawn by the built kit:
- the 3-line header names all four options;
- the HUD is already answered: "Community / $4,150 ÷ $6.22 ≈ / **667** Big Macs" (the count at 136 px in hero green, its "=" already turned into "≈"). That is the kit's pre-fill for a first rung cut before frame 1 (t = −1.0);
- the community-college pile stands on the floor (a brick pyramid of 667 Big Mac icons), and the figure points at it, his pencil behind his ear. The camera frames him and the pile as one group, centred; in the condensed cut it pans back to his usual spot from frame 1 to 1.55 s (`lookOpts.prefillPan`, added for it), so the answered frame moves from frame 2 (the round-2 cut panned with the 3.4 s push-in). He holds the point while the caption is up, then idles.

**Becker devices, as the kit builds them** (`looks/becker-rig/formats/unit-ladder.js`):
- **"Operators are tools":** each later rung drops a gold coin with its price ($11,950, $31,880, $45,000) in front of him with a thud; he winds up and punches it, and it bursts into Big Macs. The coins grow rung by rung.
- **"Results are transformations":** the Big Macs arc over and stack into a brick pyramid at the end of the row while the counter rolls in its slot, and the working's "=" turns into "≈" as the rounded count lands.
- **"Scale is shown by the camera":** each cut pushes in on him (the piles already standing fade as they leave the frame), and each new pile pulls the camera back until the whole row, community to private, is in frame.
- **The finale:** the private count lands on a gold plate with the impact kit, and the landing knocks him into a hop (a crouch, take-off on the count, an arc, a squash on touchdown, arms up with his feet down), then he slumps. A recap table pops in under the counter, biggest first: "≈ 7,235 Private / ≈ 5,125 Out-of-state / ≈ 1,921 In-state / ≈ 667 Community", the find-your-row list the header promised, with the four "≈" signs in one column and no leader lines.
- **The payoff, asked like a rung** (`lookOpts.morph` with `ask`, added in the port): on "Versus community?" the HUD cuts to "Private vs community / $45,000 ÷ $4,150 = / ? community-college years" (the "?" flush left, as on every rung's cut), the plate pops out, and the in-state and out-of-state piles (and their recap counts) dim; he thinks. **The two divided piles are put side by side:** the community pile hops over the dimmed piles to stand at the private mountain's foot (a squash and a thud), the dimmed piles shuffle along into the room it left, and the camera steps back a little (×0.91) so the moved piles clear the recap table. On the verdict's beat the answer lands: **10.8** pops in on the hit at 162 px, 1.19× the counts' 136 px, on a fresh, taller gold plate (154 px against 135; the biggest number in the video; hit lines, hit, shake, flash, camera punch), "community-college years" moves beside it, the "=" turns into "≈" once the number is fully in, and he hops (higher than at 7,235), then slumps.

**Rules:**
- **R1 (pass):** at 0.0 s the HUD shows "$4,150 ÷ $6.22 ≈ 667 Big Macs" beside its pile. "$6.22" is also in the footer.
- **R2 (pass):** no $ figure in the header.
- **R3 (pass):** community college, in-state, out-of-state and private each get a rung and a recap row, named in the header.
- **R7 (pass):** all four options are named before any maths.
- **R8 (pass):** 9 words on 3 lines.
- **R10 (pass):** the first answer is on screen at 0.0. The biggest count is the last rung (≈ 7,235 at 8.65 s), and the payoff (10.8) lands last, on the biggest plate (10.50 s). Round-2 cut: 13.35 and 17.35 s.
- **R12 (pass):** "One private year = ≈ 10.8 community-college years".
- **R4 (partial):** the Big Mac is a proven, familiar unit, but most viewers are not paying for a year of college right now ("your year").
- **R5 (miss):** nothing is attacked. Community < in-state < out-of-state < private is the order viewers expect, and only the size of the gap (≈ 10.8×) surprises. Both judges docked it.
- **R9 (partial since the port):** Clean Sheet drew empty circles ②③④ counting the rows to go; Becker Rig has no row countdown. The header's four questions are the list, and each new pile stands beside the ones before.
- **R11 (partial):** four questions stacked in a 3-line header are slower to read than H64's 6 words.

**What it plays on:** the size of the gap, not the order. Viewers know private costs more than community college. Few would guess that one private year of tuition and fees buys ≈ 10.8 community-college years, and the payoff shot shows it: a pile of 667 Big Macs standing at the foot of a mountain of 7,235.

### Beat sheet (condensed cut, 2026-10-13: every count lands 2.2 s after its cut (`lookOpts.landAfter`), rungs cut at −1.0 (pre-filled) / 1.25 / 3.85 / 6.45 s, the ask at 9.25 s, the answer and verdict at 10.5 s; body 12.1 s + the 2.5 s end card = 14.6 s)

Times are the built Becker Rig kit's own (replayed by the check). Each later rung cuts 0.4 s after the previous count lands; each question goes up on its cut (rung 2) or 0.82 s after it, once the previous answer's caption has had its 1.2 s. The round-2 cut's beat sheet (22.0 s) is in git history.

| t (s) | On screen (Becker Rig) | Caption |
|---|---|---|
| 0.0 | Header; footer; HUD "Community / $4,150 ÷ $6.22 ≈ / **667** Big Macs" (pre-filled); the 667 pile; the figure pointing at it; the camera centred on him and his pile | "Community college? **≈ 667 Big Macs**." (up from −0.4 s, whole on frame 1) |
| 0.03-1.55 | The camera pans from the centred group back to his usual spot (`lookOpts.prefillPan: 1.55`, ease-out), so the answered frame moves from frame 2 | (same line) |
| 1.25 | Cut: HUD "In-state / $11,950 ÷ $6.22 = / ? Big Macs"; the camera pushes in (the 667 pile fades as it leaves the frame) | "In-state?" |
| 1.83-2.16 | The $11,950 coin thuds down; he winds up and punches it (hit + shake); Big Macs arc into a second pile, the count rolls | |
| 3.45 | Counter lands **1,921**; "=" turns to "≈"; the camera pulls back to both piles; he points | "**≈ 1,921**." |
| 3.85 | Cut: "Out-of-state / $31,880 ÷ $6.22 = / ?"; the coin drops (4.43), punch (4.76) | (same line) |
| 4.67 | | "Out-of-state?" |
| 6.05 | Counter lands **5,125**; three piles in frame; he shrugs | "**≈ 5,125**." |
| 6.45 | Cut: "Private / $45,000 ÷ $6.22 = / ?"; the $45,000 coin (taller than him) drops (6.90), punch (7.15) | (same line) |
| 7.27 | | "Private?" |
| 8.45-8.65 | He crouches while the count rolls | |
| 8.65 | Counter lands **7,235** on the gold plate (hit, shake, flash, camera punch); he hops off it (touchdown 9.07), arms up | "**≈ 7,235**. Versus community?" |
| 9.25 | The ask: HUD "Private vs community / $45,000 ÷ $4,150 = / ? community-college years"; the plate pops out; the in-state and out-of-state piles dim; he thinks | (same line) |
| 9.45-10.00 | The community pile hops over the dimmed piles and lands (squash, thud) at the private mountain's foot; the camera steps back a little | |
| 9.65-9.89 | The recap table pops in row by row (the in-state and out-of-state rows dimmed): ≈ 7,235 Private / ≈ 5,125 Out-of-state / ≈ 1,921 In-state / ≈ 667 Community | |
| 10.30-10.50 | He crouches; the "?" squashes out (10.40) | |
| 10.5 | The answer lands: **10.8** pops in on the hit at 1.19× the counts' size on a fresh, taller gold plate, "community-college years" beside it (hit lines, hit, shake, flash, punch); "=" → "≈" at 10.55; he hops (touchdown 10.96), then slumps (11.5). Verdict: "One private year = / **≈ 10.8** community-college years." (ding) | ("One private year: …", under the verdict) |
| 10.5-12.1 | Verdict hold (1.6 s) | (none) |
| 12.1-14.6 | The end card (unchanged) | |

**Why the ask comes 0.6 s after the last count.** At 1.5 s the stretch between his hop's touchdown (9.07) and the recap table (9.65) measured 0.43 s of still picture. Asked as his hop lands, the HUD swap, the dimming, the community pile's hop and the recap table follow one another without a gap; the last count's line carries the question from the landing (merged), so it is up 1.83 s.

**Why rung 1 cuts at 1.25 s.** The pre-filled answer (HUD 667, the pile, the caption) needs its 1.2 s on screen; the pan keeps that frame moving until the cut.

### Captions (on-screen text, no narration; 8 lines, 7 shown, 13 words shown)

| t | d | Caption text (spec) | On screen |
|---|---|---|---|
| −0.4 | 1.63 | Community college? **≈ 667 Big Macs**. | 0.0-1.23 (1.23 s) |
| 1.25 | 2.18 | In-state? | 2.18 s |
| 3.45 | 1.2 | **≈ 1,921**. | 1.2 s |
| 4.67 | 1.36 | Out-of-state? | 1.36 s |
| 6.05 | 1.2 | **≈ 5,125**. | 1.2 s |
| 7.27 | 1.36 | Private? | 1.36 s |
| 8.65 | 1.83 | **≈ 7,235**. Versus community? | 1.83 s (merged: round 2 had "≈ 7,235." and "Versus community?" as two lines) |
| 10.5 | 1.2 | One private year: **≈ 10.8** community-college years. | hidden: the verdict shows it |

### The maths

**Rule:** Big Macs = cost ÷ $6.22, to the nearest whole Big Mac, with "≈" (on screen the "≈" sits at the end of the working line, "$4,150 ÷ $6.22 ≈", and the counter shows the digits). The captions print the counter's figure; the voice may still round for speech (below 1,000 to the unit, 1,000-9,999 to the 100).

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Community (1 year) | $4,150 ÷ $6.22 | 667.203 | ≈ 667 (a pile of 667 icons) | ≈ 667 |
| In-state (1 year) | $11,950 ÷ $6.22 | 1,921.222 | ≈ 1,921 | ≈ 1,921 (read ≈ 1,900) |
| Out-of-state (1 year) | $31,880 ÷ $6.22 | 5,125.402 | ≈ 5,125 | ≈ 5,125 (read ≈ 5,100) |
| Private (1 year) | $45,000 ÷ $6.22 | 7,234.727 | ≈ 7,235 | ≈ 7,235 (read ≈ 7,200) |
| The asked takeaway / verdict | $45,000 ÷ $4,150 | 10.8434 | "$45,000 ÷ $4,150 ≈ [10.8] community-college years" | ≈ 10.8 community-college years |

- The ratio is the same in Big Macs (7,234.727 ÷ 667.203 = 10.8434), because both rungs divide by the same $6.22. The check asserts this, and the payoff shot shows it with the two piles side by side: the private pile is 10.8 times the community pile, icon for icon.
- Each pile is a brick pyramid of exactly its count of Big Mac icons (667, 1,921, 5,125, 7,235); far out the kit draws the same pattern with bigger icons (level of detail), so a pile never turns into a flat shape.
- **Pinned-comment numbers** (checked):
  - College Board's full private budget (tuition, fees, housing, food, books, transport, other) is **$65,470** a year. 4 years is 4 × $65,470 = **$261,880** ÷ $6.22 = 42,102.894, so **≈ 42,103** Big Macs. ÷ 365 = 115.35, so a Big Mac a day for **≈ 115 years**.
  - 4 years in-state, full budget: 4 × $30,990 = **$123,960**, which is **≈ 19,929** Big Macs.
  - Write-up only: four years of private tuition and fees alone come to 4 × $45,000 ÷ $6.22 = 28,938.9, so **≈ 28,939** Big Macs.
- Captions print the counter's figure (QA nit in the Clean Sheet round: "≈ 1,900" under a box showing "≈ 1,921" read like a discrepancy). 08a and 08b keep the rounded spoken figure.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| US Big Mac price, July 2026 | $6.22 | **The Economist, Big Mac index dataset** (GitHub `TheEconomist/big-mac-data`, `output-data/big-mac-raw-index.csv`, row `2026-07-01, USA, 6.22`; downloaded 2026-10-07). https://github.com/TheEconomist/big-mac-data. The same file has $6.12 for Jan 2026 and $6.01 for Jul 2025. | Econlife, "Big Mac index", **July 2026**. https://econlife.com/2026/07/big-mac-index-3/. Also TrendForce DataTrack, "The Big Mac index: United States". https://datatrack.trendforce.com/Chart/content/4204/the-big-mac-index-united-states |
| 2025-26 average published tuition & fees: public two-year in-district $4,150; public four-year in-state $11,950; out-of-state $31,880; private nonprofit four-year $45,000 | | College Board, *Trends in College Pricing and Student Aid 2025* (2025-26 prices; exact release date not captured). https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf and its newsroom release https://newsroom.collegeboard.org/trends-college-pricing-and-student-aid-report-published-tuition-prices-public-institutions-and | Achievable, "2025 Trends in College Costs and Aid" (an independent summary of the same report). https://achievable.me/exams/sat/resources/2025-trends-in-college-costs-and-aid/ |
| 2025-26 average total budget, private nonprofit four-year (tuition, fees, housing, food, books, transport, other) | $65,470; public in-state $30,990 (both in the pinned comment only) | as above | as above |

- **Verification note:** collegeboard.org is blocked by the egress proxy, so the College Board figures come from search-result text that quotes the report, plus one independent summary. The verifier confirmed all six figures independently.
- The "budget" figures are College Board's estimated full-time undergraduate budgets. Since hook pass 2 they appear only in the pinned comment, which names the basis ("with housing, food and books"); every on-screen row is published tuition & fees.

### Assumptions (footer, on screen at t = 0)

> $6.22 Big Mac (Jul 2026) · 1 year of
> College Board 2025-26 tuition & fees

- The Becker Rig footer is at most two mono lines at 40 px, so the port rewords the Clean Sheet footer ("1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: 1 year of published tuition & fees", 3 lines at 40 px, 34 px and a type-floor warning in two). Every number and source stays; "published" moves to this section and the description.
- Every row is one year of College Board's 2025-26 average published tuition and fees, so the rows compare like for like.
- These are sticker (published) prices, before grants, scholarships or aid.
- The full-budget figures (housing, food, books) appear only in the pinned comment, labelled as such.

### Caption / description

> Community, in-state, out-of-state or private: which row is yours?
> One year of college in Big Macs. Community college ≈ 667. In-state ≈ 1,921. Out-of-state ≈ 5,125. Private ≈ 7,235: ≈ 10.8× community college.
> (US Big Mac $6.22, The Economist's Big Mac index, Jul 2026. College Board 2025-26 average published tuition & fees, 1 year. Sticker prices, before aid. Maths, not advice.)
> #college #tuition #bigmac #moneymath

### Pinned comment

> These are sticker tuition & fees for 1 year, before grants or scholarships. With housing, food and books (College Board's full budget), private runs $65,470 a year: 4 years = $261,880 ≈ 42,103 Big Macs, a Big Mac a day for ≈ 115 years. 4 years in-state, all-in ($123,960): ≈ 19,929 Big Macs. Which row was yours?

### Per-platform notes

- **YouTube Shorts:**
  - Title "Community? In-State? Private? Your Year of College in Big Macs".
  - No CTA; a hard loop back to frame 1 (the pre-filled community pile).
- **Instagram Reels:**
  - Cover: the end state: "Private vs community / $45,000 ÷ $4,150 ≈ [10.8] community-college years" on the big gold plate, the four-row recap (the screenshot people save), the lit community pile standing beside the lit private mountain, and the verdict.
  - Caption line 1: "Community, in-state, out-of-state or private: which row is yours?"
  - Tag the back-to-school and #studentloans crowd.
- **TikTok:**
  - VO cut, captions on.
  - Caption line 1 is the same.
  - Comments will argue about net price against sticker price, and the pinned comment invites exactly that.

---

## Kit notes (for the look builders)

As of hook pass 2, all three kits' `unit-ladder` formats are built, and every spec uses only keys its kit reads. Since the 2026-10-08 port, 08c runs in Becker Rig; the Clean Sheet notes below are kept as history (Clean Sheet is retired). The fix pass (round-2 QA) added the options below, each in that kit's `formats/unit-ladder.js` only (no shared `lib.js`, `theme.js`, `kit.js`, CSS or README was touched); every kit's `unit-ladder` samples still lint clean and render as before unless they set the new keys.

- **Scoreboard (08a), fix pass:** `introHero: "price"` (the unit intro's hero shows the unit price; the intro label then drops its price line); `payoff.label` (the label stack cuts to the payoff's question while the hero rolls; `payoff.working` would add a line 1); `split: { tags }` (once the last rung cuts, the previous rung's dots turn white inside the climax wall, tagged "1985" / "AUG 2026", and the wall stays lit behind the payoff instead of dimming). Captions now hide from `verdict.t`, or from the payoff cut when the payoff has a label (a CSS rule keyed to a stage attribute: the chrome's caption code is unchanged). The spec times the verdict on the hero's landing (`payoff.t` + 0.2 + 1.4 = 18.4) and sets the footer's working with the kit-wide `footerSteps`.
- **Becker Rig (08b), fix pass:** `blank.calendar` (a 30-day month grid beside the first count, filling in step with the ordinals); `morph` (the HUD's last answer turns into the takeaway on the verdict's beat). Without options: earlier piles fade when the camera's push-in takes them out of frame (no flat slice under the HUD or at the right edge), the pull-back follows a growing pile more tightly (0.3-0.6 s), a rolling count is right-aligned in its final slot with its label parked where it lands, the "?" sits in the same slot, the figure never draws under ≈ 150 px, and the pencil counter-rotates against 60% of the head's tilt (tucked behind the ear in every pose). `pileLabels: false` drops the recap table.
- **Clean Sheet (08c, retired), fix pass:** `payoff` (one more step after the ladder, dividing two of its costs, on the biggest box: `payoffScale`); `iconScale` (one strip icon = k units, one icon size and row count for the whole ladder, with a key in the unit row); `openScale` / `filedScale` (the open box bigger, the filed results smaller); `oneLine` (a layout fits only when every label is one line and every filed row keeps its cost); `maxScale` (type scales above 1 are tried first; on this page the end state, with the payoff step, caps it at 1.02). A filed row keeps its cost with a leader down to 16 px.

- **Scoreboard (08a), built.**
  - The spec uses `data.unit.label` ("Your hot dog + soda") for the built unit intro, `lookOpts.climaxFill` and `lookOpts.payoff` (added in the assembly pass at {t 20.2, from "$1.50", display "≈ $7.01"}; since the fix pass {t 16.8, …, label "Rose like a house?"} with the verdict on the landing, 18.4 s).
  - Round 1's two requests are dropped. `lookOpts.bigUnit` (1 block = 1,000 hot dogs) and `lookOpts.slots` ("1985: ?" / "2026: ?") were never read by the kit.
  - Overflow rungs (assembly pass, in the format): a rung too big for the pile at its density used to fill the stage just like the climax, so the 1985 and 2026 houses looked the same. Now, from the first such rung on, every LED dot stands for the same number of units as in the climax wall (≈ 12.2 hot dogs a dot here). The 1985 wall fills the stage with 9.6 px dots, and the 2026 rung re-packs it into 21.3% of the stage (4,590 of 21,528 cells; the real ratio is 21.4%) before its own dots rain in. The pile now shows the ≈ 4.7× gap.
  - The 2-line verdict fits clear of the stage (21.6 s still).
- **Becker Rig (08b), built.** The format is no longer a stub.
  - It reads `figure`, `figureScale`, `unitLabel` / `unitLabelOne`, `intro`, `iconSize`, `plate`, `pileLabels`, `blank` and (fix pass) `morph`. The spec uses `pileLabels: false` (since the fix pass; before, it named the piles so the two rent piles read apart), `blank` {t 4.7, d 1.7, text "≈ 20th", calendar 30} (added in the assembly pass; the calendar in the fix pass), which writes the hook's answer into the header's "___", and `morph` {t 21.8, working "30,053 hours ÷ 2,080 a year", display "14", label "years of full-time work"}.
  - The first draft's staging keys (`opener` TAX snip, `facedown`, `actions`, `gag`, `stage`, `inputProp`) were never read and are removed. So are the pop and thud SFX cued for them. The kit cues its own hit, pop and roll.
  - The check replays the kit's per-rung schedule: lead = 0.22 × gap (0.45-0.92 s), punch, then a fill of 0.3 × gap (0.5-1.6 s), or 1.9 s on the last rung.
- **Becker Rig (08c), port (2026-10-08).** Four options and one rule, all in `looks/becker-rig/formats/unit-ladder.js` only (no `lib.js`, `theme.js`, `kit.js`, `style.css` or README touched), documented in its header comment. 08b and both kit samples render pixel-identical to before (dense stills compared every 0.5 s) and lint clean.
  - **Pre-fill (a rule, no option):** a first rung cut before frame 1 (t < 0) is punched, piled and counted before t = 0, with no sound or shake from it; frame 1 shows its pile, its count and the "≈" working, with him pointing at the pile until ≈ 2.2 s. Before, a negative t was clamped to 0 and the count landed at ≈ 1.8 s, under a caption that already said "≈ 667".
  - **`landAfter`** (1.7 here): every rung's count lands that long after its cut; the coin drop, punch and fill keep their proportions, the lead never under 0.4 s. The kit's default pacing (≈ 2.2 s on a 4 s gap, 2.8 s on the last rung) would land each count 0.45-1.1 s after the voice's answer line, so the voice would have to move; with it the VO keeps its Clean Sheet times and every count lands 0.0-0.1 s before its line.
  - **`morph.ask` / `morph.item` / `morph.compare`:** the takeaway is asked like a rung's cut (item, working "… =", "?" in the answer's slot with its label already in place, the plate pops out; he thinks), the piles and recap counts of the other rungs dim, and the answer lands on a fresh plate at `morph.t` with hit lines and the impact kit (hit, shake 10, flash 0.3, 2.5% punch); he jumps, then slumps. Without `ask` the morph is the one-swap version 08b uses, unchanged.
  - **Two-line takeaway label:** a morph label too long to sit beside its plate on one line ("community-college years") wraps to two balanced lines there, instead of pushing every counter label below its digits (which cost the piles ≈ 75 px of height in the first render).
  - **`beats`** ([{ t, act, d }], scripted poses) is available; 08c does not need it: the pre-fill point, the punches, the reactions and the asked payoff's think → jump → slump are the kit's own.
  - The spec reads `landAfter` and `morph` {t 17.35, ask 15.85, item "Private vs community", working "$45,000 ÷ $4,150", display "10.8", label "community-college years", compare [0, 3]}. Clean Sheet's `unitRow`, `countSpeed`, `iconScale`, `openScale`, `filedScale`, `oneLine`, `maxScale`, `payoffScale` and `payoff` are dropped (Becker Rig does not read them), and so is the spec's `ding` cue: the Becker chrome cues its own on the verdict.
- **Becker Rig (08c), condensed cut (2026-10-13).** One opt-in option in `looks/becker-rig/formats/unit-ladder.js` only, documented in its header comment and in the look README (§12): **`prefillPan: s`**. With a pre-filled first rung, the camera's pan from the centred frame-1 group back to his usual spot runs from frame 1 over `s` seconds (ease-out) instead of with the next cut's push-in, so the answered frame-1 picture moves from frame 2. It adds no cue and leaves frame 1 as it was; it is ignored without a pre-filled first rung, and absent it the kit behaves exactly as before (proof in the review log: the cue records and 20 stills of `specs/08b`, `specs/08c` and both Becker samples are byte-identical before and after). The condensed 08c uses `prefillPan: 1.55`; the condensed 08b uses the existing `landAfter` and `beats` (a scripted `pointUp` on the blank).
- **Becker Rig (08c), QA fix pass after the port (2026-10-08).** All in `looks/becker-rig/formats/unit-ladder.js` only, documented in its header comment; the 08c spec is unchanged (every new behaviour is a default of the asked takeaway, or a format-wide recap rule). 08b renders pixel-identical (109 stills, 0.25 s apart, against the old code in the same run) and lints clean; the Becker Rig samples lint clean.
  - **`hop`** (default: on when `morph.ask` is set): a jump is a real hop (crouch 0.2 s before, take-off on the beat, lib's `hop()` arc of 56 world px on the last count and 70 on the asked takeaway, a squash on touchdown, then arms up with his feet down until the slump 1 s after take-off). Before, the 'shocked' pose (lift 46) hung in mid-air for 0.8 s. 08b keeps the old jump (no `ask`); `hop: true` would give it the hop.
  - **`morph.beside`** (default on with `ask` + `compare`): the smaller compared pile hops over the piles between the two to stand at the bigger one's foot (0.55 s from ask + 0.2 s, squash and thud), the piles between shuffle along into its old place (every gap kept), and when the moved piles would crowd the recap table the camera also steps back a little about the bigger pile's right foot (here ×0.91). If even ×0.85 cannot clear the table the piles stay put.
  - **The asked takeaway's landing:** its "?" sits flush left with the label after it (as on every rung's cut, not right-aligned in the answer's slot); the "?" squashes out 0.096 s before `morph.t`, the number pops in on the hit at up to 1.2× the counts' size on a fresh plate (here 162 px against 136, the plate 154 px tall against 135: the biggest number in the video, clear of the working line, the recap table and x 938), the label moves beside it, and the working's "=" turns into "≈" only once the number is fully in (+0.048 s), so the screen never reads "≈ ?".
  - **Recap table:** leaders are drawn all or none (a row whose line is not clean used to leave a lone stray leader; here the out-of-state row's ran to its pile through the climax and the end card), a dimmed row's leader goes at the ask instead of dimming, and the "≈" signs get their own left-aligned slot before the right-aligned counts (glued back only when the slot would cost a name its line, as in `unit-ladder-2.json`).
  - **Frame 1 of a pre-filled first rung:** the camera centres the figure-and-pile group (same zoom, +160 px here) and pans back to the usual spot during the next cut's push-in.
  - **Not changed (shared with 08b, so left alone):** an earlier pile still ghosts out at a cut as the push-in starts, and the new price coin still starts mid-air beside his head and falls through the HUD mask. Changing either changes 08b.
- **Clean Sheet (08c, retired), built.**
  - It reads `unitRow`, `countSpeed`, `check` and `checkT`, and (fix pass) `payoff`, `payoffScale`, `iconScale`, `openScale`, `filedScale`, `oneLine` and `maxScale`. The spec no longer uses `check` / `checkT`: the payoff step replaces the check line.
  - It draws every waiting rung's numbered circle from frame 1, with the labels hidden. The request `preview: "labels"` is dropped (never read), and the header names the rows instead.
  - A rung whose result would start by frame 1 (here t = −1.0) is pre-filled: on frame 1 it already shows its count and icon grid.
  - A count that overlaps a VO line lands by 60% of that line. The check replays all three rules.

## Search log (14 in the first draft + 1 in revision + 2 in the fix pass)

| # | Query (short) | Used for |
|---:|---|---|
| 1 | Costco hot dog $1.50 since 1985 + $65 membership | Hot dog price (Scripps, NPR/HPPR, Newsweek) |
| 2 | Costco membership increase Sept 2024 | $65 Gold Star (Axios, Disney Food Blog) |
| 3 | Apple Sept 2026 lineup | Found the iPhone 18 Pro cycle (BGR). Conflicting snippets, so search 4 settled it |
| 4 | "iPhone 18 Pro" "$1,199" | $1,199 (MacRumors, Appleosophy) |
| 5 | Census new residential sales Aug 2026 | $393,700 (Census, First Trust) |
| 6 | Census median new home 1985 | $84,300 (HUD USHMC) |
| 7 | KBB ATP Aug/Sep 2026 | $50,089 (Cox Automotive, Cision) |
| 8 | EIA gasoline Oct 2026 | Not usable (only a 2026-09-14 snippet). The gas rung was dropped |
| 9 | Census HVS Q2 2026 rent | Release found; Q4 2025 $1,464 |
| 10 | "median asking rent" "second quarter 2026" | $1,531 (Census, 2026-07-28) |
| 11 | College Board Trends 2025 | Tuition, fees and budgets |
| 12 | Big Mac index Jul 2026 US | Second source for $6.22 (Econlife, TrendForce) |
| 13 | "84,300" median new home 1985 | Second source (FRED MSPNHSUSA, GOBankingRates) |
| 14 | Costco hot dog 2026 | 2026-dated confirmation (13 ABC, 2026-04-29) |
| R1 | Costco Hebrew National → Kirkland 2009, soda 20 oz | Food Republic: why nothing on screen says "same hot dog" |
| F1 | Census median new-house price, 2005 annual ($240,900?) | Fix pass, for a 1985 → 2005 → 2026 house ladder. **Not used:** FRED's annual table (as quoted by search) gives $240,900, but contemporaneous reports give the preliminary $237,300, and census.gov / FRED are blocked to direct fetches. The rung went to the already-sourced Census rent instead |
| F2 | "240,900" median new home price 2005 | Same; no second source with the revised figure |

**Direct data download (not a search):** The Economist's `big-mac-data` repository on GitHub, for the $6.22 row. Every other host was blocked to direct fetches.

## Caveats

- **P8 has one benchmark channel (HD Guy), and its spectacle is military footage.** Nothing in the benchmark shows that a personal-finance subject works in this format, so all three teasers test that hypothesis. The strongest hedges are 08b's calendar blank (a date answer, R12) and 08c's row-per-viewer frame (R3, from the P7 winners).
- **08a's unit is the benchmark's own flop (H13).** The bet is that the frozen price makes it a ruler rather than a novelty. If 08a underperforms the other two, the unit is the first suspect.
- **08a's twist is about sticker prices.** The ≈ $7.01 is a sticker-to-sticker counterfactual (the house rose ≈ 4.7× in nominal dollars). It is honest as stated, and the caption and pinned comment say so. Expect "inflation!" comments; those are engagement, not an error.
- **08a's open loop is one question, answered at 12.33 s in the condensed cut** (18.4 s in the round-2 cut, 20.2 s before its fix pass). The first count (the membership, ≈ 43 at 1.98 s) is a ladder step, not the answer, and the rent rung (≈ 1,021) is housing today rather than a 1985/2026 pair: the only sourced 1985/2026 pair is the house itself, and the contract asks for at least 4 rungs.
- **08b's blank is filled with the median, not the viewer's rent.** Since the assembly pass the header's "___" fills in on screen (≈ 20th at 2.55 s in the condensed cut, 6.40 s in the round-2 cut), but the rent is the Census median, not the viewer's.
- **08c attacks no wrong belief.** The order of the rows is what viewers expect; only the ≈ 10.8× gap surprises.
- **Single-publisher figures:**
  - The rent ($1,531) is a Census figure, cross-checked only against the same series' previous quarter (and by the verifier).
  - The College Board figures could not be opened at the source. They were read from search text plus one independent summary, then confirmed by the verifier.
- **The VO word counts are estimates** (2.6 words/s; years read as two words, money with cents as three). They are conservative: the fix pass's short cues ("Costco card?", "In-state?") read faster than budgeted. The tightest lines are 08b's verdict line (4.23 s for 4.25 s), 08a's "And a new house in 2026?" (2.69 s for 2.7 s) and 08c's verdict line (3.46 s for 3.5 s).
- **08c's lower page is empty below the caption band by design** (y > 1480 is platform UI: nothing readable there).
- **08c in Becker Rig has no row countdown** (Clean Sheet's empty circles ②③④), so R9 is partial since the port; the header carries the four rows, and the recap table lists them from 14.4 s.

---

## Review log

Round-2 review: the verifier (2 must, 3 should, 4 nits) and the hook judge (08a 4/10, 08b 6/10, 08c 5/10, each with a rewrite). Only the first hook-judge issue (08a, must) arrived intact; the rest of the judge's issue list was cut off in transit. I acted on the judge's three score write-ups and rewrites instead. The verifier's last nit was also cut off mid-sentence, after its two timing findings; both are handled below (V8).

### Verifier

| # | Teaser | Sev. | Issue | What I did |
|---|---|---|---|---|
| V1 | 08b | must | The tools showed "÷ $13.10", but the counts used 13.10058: ≈ 3,823 and ≈ 30,052 instead of ≈ 3,824 and ≈ 30,053; the rounded $13.10 had no "≈" | Made $13.10 the **defined unit**. Every count is now cost ÷ $13.10: ≈ 117, ≈ 1,402, **≈ 3,824**, **≈ 30,053**, and `unit.price` is "$13.10", so any kit prints "÷ $13.10". The footer keeps "≈ $13.10 kept", the honest rounding of what you keep (13.10058). The Rule line, the maths table (116.870 / 1,402.443 / 3,823.588 / 30,053.435), the beat sheet and the caption (≈ 30,053 hours) are updated. In the check script, `U = rhu(k, 1/100)` is the divisor, and it asserts U = 13.10. The VO is unchanged (≈ 3,800; ≈ 30,000; 30,053.435 ÷ 2,080 = 14.45 → ≈ 14 years). |
| V2 | 08c | must | The footer said "tuition & fees", but the finale (4 × $65,470) is College Board's total budget | Did both of the verifier's fixes. The footer now reads "1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: tuition & fees; row 5 = full budget" (2 lines; the linter is clean). Row 5's label is now "Private, 4 years, with housing & food", and its VO is "4 years private, with housing and food? ≈ 42,000." (10 words estimated, d 3.9). The caption, Assumptions and pinned comment state the $65,470 budget and what it includes. For contrast, the maths section adds tuition alone (≈ 28,939). |
| V3 | 08a | should | "Same hot dog" is wrong: Costco switched Hebrew National to Kirkland in 2009, and the 12 oz can became a 20 oz fountain drink | Nothing on screen or in the VO says "same hot dog" any more. The verdict is "Hot dog: still $1.50. / The house: ≈ 4.7× the hot dogs.", the VO says "Same $1.50. ≈ 4.7× the hot dogs.", and the footer says "Hot dog + soda: $1.50 in 1985. Still $1.50." The pinned comment names the frank and soda changes. Source: Food Republic (search R1). I kept "still $1.50" and dropped the verifier's "Same $1.50 hot dog", which can still be read as "same hot dog". |
| V4 | 08c | should | The write-up described a frame 1 the built kit doesn't draw: no badge (`lookOpts.badge` is ignored), no empty circles ②-⑤, and the check at 19.8 s, not 18.5 s; "stub" sentences were out of date | Removed `badge`. Added `unitRow: "show"`, which the kit reads and which draws "🍔 1 Big Mac = $6.22" at frame 1 (verified in the 0.0 s still). Set `checkT: 18.6` explicitly. Rewrote the beat sheet from the kit's own timing, which the check script now replays (`clean_sheet_landings`). Deleted the "still a stub" sentences. R9 is now marked **Partial**, and the empty rows are requested from the kit as `lookOpts.preview` (kit notes). |
| V5 | 08b | should | The first ladder count landed only at about 6 s; 0-5 s was just the $15 → ≈ $13.10 snip | Adopted the judge's restructure, which goes further than the verifier's retime. Rung 1 (rent) starts at 0.0, so the count lands at about 2.4 s and VO line 1 says "≈ 117 hours" at about 2.3 s. The snip runs under it: `opener.land` and the pop SFX are at 1.0 s. All later rungs moved earlier (8.4, 12.6, 16.8; verdict 20.3), and the duration went from 30.0 to 27.0 s. The check now fails any teaser whose first count lands after 3 s. |
| V6 | 08a | nit | "A median new house in 2026" is a single month (August, preliminary) | Relabelled the rung "A median new house, Aug 2026" (and "A median new house, 1985" for symmetry). The pinned comment and the caption say "Aug 2026". |
| V7 | all | nit | Captions show the spoken rounding next to the exact on-screen count | Kept the rounded VO and captions, and added a line to 08a's maths ("Captions are rounded on purpose") citing the format research's "$143K ÷ ~$4.50 ≈ 32,000 lattes. The screen shows 32,168". 08b and 08c point to it. |
| V8 | 08c | nit | The voice ran up to about 1 s ahead of the counters; the verdict (20.0 s) landed while the check line was still typing | Set `countSpeed: 0.5` and reworded two VO lines so each number comes later in its line ("The same school, out-of-state?", "A private college, 1 year?"). By the kit's timing, the voice now says each number at most 0.20 s before its counter lands, or after it (the check asserts ≤ 0.5 s). The check line types 18.6-20.71 s, and the verdict and its ding moved to 21.0 s. The 20.8 s still shows the check finishing with no verdict yet, and the 22.0 s still shows both. |
| V9 | 08b | info | The Becker Rig unit-ladder is a stub, so the opener timing can't be checked in a render | Still true at the time. *Superseded in hook pass 2:* the kit is built, the staging keys are removed, and the check replays its real timing (`becker_landings`). |

### Hook judge

| # | Teaser | Score, issue and rewrite | What I did |
|---|---|---|---|
| J1 | 08a | **4/10, must.** The header and title were H13 ("Costco Hotdog Combos", 80,139, 1.44x) almost word for word. The twist (the $1.50 unchanged since 1985; a house in 1985 vs 2026) sat in the footer and at 14-21 s, and the first 1.5 s was trivia. Rewrite: header "A NEW HOUSE, 1985 VS 2026, / IN $1.50 COSTCO HOT DOGS"; footer "Hot dog + soda: $1.50 in 1985. Still $1.50."; first VO the frozen price; labelled "1985: ?" and "2026: ?" slots; drop the car; title "A New House in Costco Hot Dogs: 1985 vs 2026"; caption line 1 about the hot dog that never moved; A/B header "YOUR PARENTS' HOUSE VS YOURS" | **Adopted.** It is stronger and honest: the hook now carries the one fact that makes this unit different from H13, plus a named pair and a horizon. Details: <br>- Header, footer and title are verbatim. <br>- First VO: "Costco hot dog, 1985: $1.50. Today: $1.50." (12 words estimated). It is shorter than the judge's 15-word line, which keeps the membership line's start under 5 s. <br>- The membership count still rolls from frame 1 (≈ 43 at 0.61 s, R1/R10), and its own line follows at 4.9 s, after it lands. <br>- The car was dropped, which leaves 4 rungs, the contract minimum. <br>- Labelled slots are requested as `lookOpts.slots`, so R9 stays Partial until the kit draws them. <br>- Caption line 1 says "The $1.50 never moved. The house did." I changed "the hot dog never moved" so it fits V3. <br>- The A/B header is in the platform notes. <br>- My estimate after revision is about 6/10: R3 and R4 stay partial, because the unit is still the benchmark's flop and the membership only fits members. |
| J2 | 08b | **6/10.** No item named in the header (R7) or in the first 5 s; no countable loop (R9); the first 5 s is a lane-1 take-home calculation; the strongest fact (rent ≈ 117 of ≈ 173 monthly work hours) was buried. Rewrite: header "Your rent, a car, a house: / hours of work at $15/hr"; frame 1 opens on rent with the snip and the counter rolling; car and house tags face-down; VO "Fifteen an hour. Your rent? About 117 hours of work." then "That's 2 of every 3 hours you work."; title "Your Rent, a Car, a House: In Hours of Work at $15/hr"; caption line 1 "At $15 an hour, rent isn't a week of work. Not close." | **Adopted**, with one honesty change. The VO says "Median rent", not "Your rent", because $1,531 is the Census median, not the viewer's rent. The header keeps "Your rent" as the framing, and the pinned comment gives the swap rule ("Your rent ÷ that = your hours"). <br>- The second line carries "≈" ("That's ≈ 2 of every 3 hours you work.") because 116.870 ÷ 173.33 = 0.6743. The check asserts it is within 1 point of 2/3, and 67.4% appears in the caption. <br>- The rent rungs are relabelled "Median rent, 1 month / 1 year". <br>- The "≈ 8 months" and "≈ 3 weeks" asides were cut: they repeated the 2-of-3 fact. <br>- The take-home is now only the snip and the footer (no spoken beat), which clears lane 1. <br>- My estimate after revision is about 7/10. R3 is partial (one wage), and R9 depends on the stub kit. |
| J3 | 08c | **5/10.** No "you" or horizon (R6), and the video opened on the cheapest rung with no wrong belief (R5). The footer's "tuition & fees" mismatched the finale. Rewrite: header "Your degree, in Big Macs: / find your school"; all five row labels printed from frame 1; first VO "Find your school. Community college: about 667 Big Macs a year."; footer "… College Board 2025-26 sticker · row 5 = full budget"; title "What Your Degree Costs in Big Macs"; TikTok line 1 "Find your school. The last row is not a typo." | **Adopted:** <br>- The header, title, TikTok line and footer idea are adopted. The footer wording follows the verifier's fix (V2), "tuition & fees; row 5 = full budget". <br>- The first VO is "Find your school. Community college? ≈ 667 Big Macs." I dropped "a year" because the row label says "1 year" and the line has to fit 4.3 s. <br>- **Not achievable in this round:** printing all five labels at frame 1. The built kit opens rungs one at a time and has no option for it. I requested `lookOpts.preview` and marked R9 Partial instead of claiming it. <br>- The judge credited R9 to the old write-up's "5 empty circles", but the render never showed them (V4). <br>- My estimate after revision is about 6.5/10. |
| J4 | 08a/08b | Lane distinctness: 2 of 08a's 5 rungs (the new car and the new house) duplicated 08b | The car is now only in 08b. The median new house remains in both, used for different points: 1985 vs 2026 in a frozen unit in 08a, and years of work in 08b. |

### Check-script changes

- 08b divides by the defined unit U = $13.10. Its builder adds the rent share (0.6743, "≈ 2 of every 3") and the opener-before-first-count assertion.
- `clean_sheet_landings()` replays the built Clean Sheet kit's timing (type, wipe, count, filing). 08c now has the same counter-vs-voice check as 08a, plus a check that the check line finishes typing before the verdict.
- New generic checks:
  - the first count lands within 3 s (R10);
  - a rung pre-rolled under an opener line (08a) must start at 0.0, and its VO line must start after it lands;
  - an opener line may name rung 1 a few words in (08b: 4 words, 08c: 3).
- New write-up numbers checked: 67.4%, ≈ 28,939 and $65,470.
- **Result: PASSED, all 599 checks.** The mutation test is in the header of this file.

### Hook pass (2026-10-08)

Two judges scored each teaser's current hook and four candidate rewrites (A-D) out of 10. The rule: adopt the best candidate only if its average is at least 7.5 and at least 0.75 above the current hook. Both judges marked every scored key honest. Judge 2's 08c scores for B, C and D were cut off in transit, after its A score.

| Teaser | Current | A | B | C | D | Decision |
|---|---|---|---|---|---|---|
| 08a | 5 / 4.5 → **4.75** | 6 / 5.5 → 5.75 | 5 / 5 → 5.00 | 6.5 / 6 → **6.25** | 4.5 / 4.5 → 4.50 | **Keep current** |
| 08b | 6 / 5.5 → **5.75** | 7 / 6.5 → **6.75** | 6.5 / 6 → 6.25 | 6 / 6 → 6.00 | 7 / 6.5 → **6.75** | **Keep current** |
| 08c | 5.5 / 5 → **5.25** | 6 / 6 → **6.00** | 4.5 / cut off | 5 / cut off | 4.5 / cut off | **Keep current** |

**Why nothing was adopted:**
- No candidate reached 7.5. The best were 08b-A and 08b-D at 6.75; both clear the +0.75 margin but miss the floor.
- On 08c, judge 2's missing scores cannot change the result. For B or D to reach 7.5, judge 2 would need more than 10. For C, judge 2 would need a perfect 10, against a 5 from judge 1.

**Titles:** all three are kept. Each candidate title depends on its own header or ladder change:
- 08a-A's "Your Parents' House vs Yours" brings an affordability framing that both judges say needs a CPI caveat.
- 08a-C's title needs the Big Mac rung.
- 08b-A's "Rent Isn't a Week of Work" is already caption line 1, so it is not lost.
- 08b-D's title needs the split bar.
- 08c-A's title needs the tuition / real-bill ladder.
Because the judges scored whole hooks, not titles alone, none of these titles is clearly better on its own.

**What the judges agreed on, for the next round:**
- **08a:** frame 1 is a three-way split. The header says house, the counter shows the membership (≈ 43), and the voice says the frozen price. 08a-C is the only candidate that lines up eye, ear and number in the first 1.5 s, but it borrows 08c's Big Mac.
- **08b:** the two strongest levers are the one-word denial of a belief (08b-A, "isn't") and the you-vs-landlord split (08b-D, ≈ 117 vs ≈ 56 hours). Both lose points because their visible loop (the split bar, or a countable list) is a kit request, not something the kit draws today.
- **08c:** the "find your school" rows are not drawn at frame 1 (`lookOpts.preview` is not built). That is still the main cap on this hook.

**Files:** no changes to the specs, beats, VO or check script.
- Re-run of `checks/08-unit-ladder.py`: PASSED, all 599 checks.
- `node src/cli.mjs check` on all three specs: 0 errors, 0 warnings.

### Hook pass 2 (2026-10-08)

**Round 2's rule:** two new blind judges scored each teaser's current hook, round 1's best rewrite (R1, fixed so the built kit renders it) and four new candidates (A-D), out of 10. A candidate is adopted when its average is at least 1.0 above the current hook, even below 7.5. Both judges marked every key honest.
- Judge 1 was harsh on hooks with no number the viewer owns.
- Judge 2 was harsh on unpayable clickbait and on restating a known fact.
- Judge 2's 08c scores for B, C and D were cut off in the hand-off to this pass. I took them from the judge's own returned output (B 6, C 5.5, D 5).

| Teaser | Current | R1 | A | B | C | D | Decision |
|---|---|---|---|---|---|---|---|
| 08a | 4.5 / 4.5 → **4.50** | 5.5 / 4.5 → 5.00 | 6 / 6 → **6.00** | 5 / 4.5 → 4.75 | 6.5 / 5.5 → **6.00** | 5 / 5 → 5.00 | **Adopt A** (+1.50) |
| 08b | 6 / 5.5 → **5.75** | 6.5 / 6.5 → 6.50 | 6 / 6 → 6.00 | 5 / 5.5 → 5.25 | 6 / 6 → 6.00 | 7 / 7 → **7.00** | **Adopt D** (+1.25) |
| 08c | 5.5 / 5 → **5.25** | 5.5 / 5 → 5.25 | 6.5 / 6.5 → **6.50** | 6 / 6 → 6.00 | 6.5 / 5.5 → 6.00 | 5.5 / 5 → 5.25 | **Adopt A** (+1.25) |

**08a: adopted A, "WHAT YOUR $1.50 HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE".**
- **Why:** it is the only candidate both judges scored 6. They agreed that its frame 1 is one subject: the header, the hero "1", the dropping hot dog, the label "$1.50 / YOUR HOT DOG + SODA" and the voice are all the viewer's own $1.50 purchase. They also agreed that the ≈ $7.01 verdict is a fresh, repeatable number (H45 / H44 grammar; H49's verdict caption).
- **The tie with C (6.0):** C ("THE HOT DOG STAYED $1.50 SINCE 1985. / YOUR HOUSE DIDN'T.", with a built two-slot footer scoreboard) has the same average but a split verdict (6.5 / 5.5). Judge 2 marked it down for restating two known facts. I broke the tie on agreement: A's lower score is higher.
- **Kept from the candidate:**
  - header and title;
  - `data.unit.label` "Your hot dog + soda";
  - all six VO lines and the verdict, verbatim;
  - rung times 7.4 / 11.0 / 15.2;
  - duration 26.0 and hold 7.98;
  - `lookOpts` {climaxFill: 1}, with the unbuilt `bigUnit` and `slots` dropped;
  - the ding at 20.2;
  - caption line 1 and the pinned-comment addition.
- **One timing change:** rung 1 (the membership) cuts at **1.5 s instead of 2.0 s**.
  - The candidate's first count landed at 3.48 s, which both judges flagged and the check's R10 rule (≤ 3 s) fails. At 1.5 s it lands at 2.98 s.
  - The first 1.5 s is unchanged, so the judged hook frame is the same. The membership's own line still starts after its count lands (3.7 s).
- **Not fixed (judges' notes, kept as risks):** the loop is one question answered at 20.2 s, R5 is weak, and the unit is H13's flop. Judge 1 suggested "≈ $7" over "≈ $7.01". I kept the cents, which judge 2 credited as the repeatable figure, in the style of H49's exact $2.98.

**08b: adopted D, "At $15/hr, you work for rent / from the 1st to the ___".**
- **Why:** it is the top score in the format, 7 from both judges. The blank sits on a date every renter owns (rent day). It implies the "about a week" belief without a lecture, leaves exactly one blank, and pays off in a date that travels (H48, H50).
- **Kept from the candidate:**
  - header and title;
  - vo[1] "Every hour you work, to **≈ the 20th**." (4.6 s, 3.7 s);
  - caption line 1;
  - the pinned comment's "117 of 173 work hours (67.4% of the month)".
- **R1's two fixes, which D includes:**
  1. Every `lookOpts` key the built kit ignores is removed: `opener`, `facedown`, `actions`, `gag`, `stage` and `inputProp`. So are the pop at 1.0 s and the thud at 20.3 s, cued for the unbuilt snip and topple.
  2. The VO retime to the built kit's landings: vo[2] 8.4 → 9.1, vo[3] 12.6 → 13.3, vo[4] 16.8 → 18.2, and vo[5] and the verdict 20.3 → 21.5. The counts land at 10.63 / 14.83 / 19.67 s and are said at 10.64 / 14.84 / 19.74 s. Before the retime they were said 0.69-1.33 s early.
- **Two additions of mine:**
  - **`hold` 7.8 → 7.33:** duration minus the built kit's last landing (19.67 s). It does not move any landing.
  - **`lookOpts.pileLabels`** (a built option): "Median rent, 1 month", "Median rent, 1 year", "Average new car", "Median new house". The 23.5 s still showed the default recap table printing "Median rent" for both rent piles.
- **Honesty of "≈ the 20th":** 0.6743 of the month is 20.23 days of a 30-day month and 20.51 of the average month. On a Monday-Friday calendar of 8-hour days from the 1st, rent's last hour falls on the 19th, 20th or 21st, depending on the weekday of the 1st. The check asserts all three.

**08c: adopted A, "Community? In-state? / Out-of-state? Private? / Your year in Big Macs".**
- **Why:** it is the top score, 6.5 from both judges; judge 2 called it "the most rule-complete 08c frame". The header names a row for every kind of student, and row ① is pre-filled at 0.0 by the built kit. The built empty circles ②③④ count the three rows to go. Round 1's `preview` request is no longer needed.
- **Kept from the candidate:**
  - header, title and footer ("published tuition & fees");
  - the four 1-year rows at t −1.0 / 3.6 / 7.6 / 11.6, with tone "goal" on private;
  - the five VO lines and the verdict "Private vs community college: / ≈ 10.8× the Big Macs.";
  - `lookOpts` {unitRow, countSpeed 0.5, check "check: $45,000 ÷ $4,150 ≈ 10.8", checkT 14.0}, with `preview` dropped;
  - duration 21.5 and the ding at 16.2.
- **One correction of mine:** `hold` is 8.14 (21.5 − the 13.36 s last landing), not the 8.74 left over in the candidate's scratch spec.
- **What it gives up:** the private full-budget row (≈ 42,103) and the "a Big Mac a day for ≈ 115 years" verdict. Both move to the pinned comment.
- **Judges' remaining notes:** no wrong belief, a heavy 3-line header, and "your year" fits few adult viewers.

**Titles:** all three come with their adopted hooks:
- 08a: "What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House";
- 08b: "At $15/hr, You Work for Rent From the 1st Until…";
- 08c: "Community? In-State? Private? Your Year of College in Big Macs".

**Check-script changes** (`checks/08-unit-ladder.py`):
- The builders are rewritten for the adopted hooks. New asserted numbers:
  - 08a: the ≈ $7.01 verdict, as both $1.50 × 393,700/84,300 and $393,700 ÷ 56,200.
  - 08b: the calendar day "≈ the 20th", on 30 days, the average month and a weekday simulation.
  - 08c: the ≈ 10.8× ratio, the same in dollars and in Big Macs; the pinned 42,103 / 115 years / 19,929 / 28,939.
- **Kit replays:**
  - `becker_landings()` replays the built Becker Rig kit and replaces the stub's assumed `FINAL_COUNT = 2.4`. 08b now has the same voice-vs-counter check as 08a and 08c.
  - `clean_sheet_landings()` adds the kit's pre-fill and VO-fit rules, and asserts that only row ① is pre-filled.
- **Timing rules:**
  - A rung's VO line may start up to `lag` s after its cut (08b: 1.4 s; 0 elsewhere).
  - A pre-filled rung must be landed by frame 1 and read at 0.0.
  - A pre-rolled rung must cut during the opener line and be spoken after it lands.
  - The frame-1 number test accepts a rung that starts before 0.
  - New check: the header is at most 15 words (R8).
- **Result: PASSED, all 503 checks.** Mutation test: six mutations on scratch copies (listed at the top of this file) fail 16 of 503 checks, and the script exits with code 1. The first run showed that the timing rules replayed the *expected* rungs, so a moved cut was caught only by the leaf comparison. Each kit is now replayed on the spec as written, and the three new "landings differ" checks bring the total from 500 to 503.

**Files changed:**
- the three specs;
- this write-up: hooks, titles, beat sheets, VO, maths, captions, pinned comments, kit notes and caveats;
- `checks/08-unit-ladder.py`;
- format 08's entries in `teasers/v2/teasers.json`: title, header, runtime, key numbers, hook score and check note.

**Verification:** `node src/cli.mjs check` gives 3/3 clean, 0 errors and 0 warnings. I checked stills at 0, 1.5 and 3 s by eye. The hook reads in frame 1 for all three:
- 08a: header, hero "1", hot dog and "$1.50 / YOUR HOT DOG + SODA";
- 08b: the blank, the HUD "? hours of work" and the $1,531 coin;
- 08c: four named options, row ① answered, ②③④ waiting.

### Assembly pass (2026-10-08)

Round 1 was rejected for its look and weak hooks, so each teaser was linted, read frame by frame (contact sheet + stills at every beat), rendered and re-checked against the MP4. No number, VO line, header or footer changed. Two payoff problems were fixed in the built kits' `unit-ladder` format files, each through a new `lookOpts` key.

- **08a, the climax and the payoff did not read on screen.**
  - The 1985 house (56,200) and the 2026 house (≈ 262,467) both overflowed the pile and drew the same full LED wall, so the ≈ 4.7× jump was invisible. The answer ≈ $7.01 lived only in the 2-line verdict, while the hero still showed ≈ 262,467.
  - **Format fix (`looks/scoreboard/formats/unit-ladder.js`):** overflow rungs share the climax wall's dot scale. The 1985 wall fills the stage at 9.6 px dots, and at the 2026 cut it pulls back into 21.3% of the stage (the real ratio is 21.4%) before the new dots rain in. One dot is ≈ 12.2 hot dogs in both walls. The kit's samples have no overflow rung and render as before.
  - **New option `lookOpts.payoff`** {t 20.2, from "$1.50", display "≈ $7.01"}: at the verdict the hero cuts to the unit price and rolls up to the answer (lands 21.80 s, hit + cash, glow, floor bloom) while the wall dims. The voice says "≈ $7.01" at 22.12 s. This is the Scoreboard README's rule "the payoff lands last in the hero".
- **08b, the hook's blank was never filled on screen** (the write-up listed this as a risk), and 2.1-8.4 s held a static pile.
  - **New option `lookOpts.blank`** {t 4.7, d 1.7, text "≈ 20th"} (`looks/becker-rig/formats/unit-ladder.js`): the header's "___" hands over to a rule sized for the answer, the days tick up on it (1st, 2nd, … in grey) while the voice says "Every hour you work", and at 6.40 s it lands on **≈ 20th** in green with a ding, the rule turns green, and the figure points up at it. The voice says "≈ the 20th" at 6.52 s. The header then reads "from the 1st to the ≈ 20th" for the rest of the video.
- **08c: no change.** It lints clean and reads well at every beat. The last 0.7 s clears back to the frame-1 state by design (the kit's loop), so the end still is frame 1.
- **Check script:** the expected 08a and 08b specs carry the new keys, and two kit replays check them: 08a's payoff starts on the verdict, rolls from the unit price to the verdict's number and lands before the voice says it; 08b's blank prints the day the voice says, starts inside vo[1], lands at most 0.5 s before the voice and sits between rung 0's landing and rung 1's cut. **Result: PASSED, all 524 checks.** Three new mutations (listed at the top) each fail 3 checks and exit 1.
- **Verification:** `node src/cli.mjs check` 3/3 clean (0 errors, 0 warnings), plus the kits' four `unit-ladder` samples, still clean. MP4s rendered to `studio/out/` (26.0 / 27.0 / 21.5 s, 1080×1920, 30 fps), and frames pulled from each MP4 (08a at 0, 15.9 and 22.5 s; 08b at 0, 6.8 and 22.5 s; 08c at 0, 9.5 and 18 s) match the stills.
- **Not changed (outside this format's files):** `teasers/v2/teasers.json` still quotes "PASSED: all 503 checks" in format 08's check note.

### Fix pass (round-2 QA, 2026-10-08)

QA scored 08a 6.5, 08b 6.0 and 08c 5.5. It found every number right (524/524 then) and the reveals and payoffs wrong. Every must and should issue, and the cheap nits, are handled below. The edits are in the three specs, the three kits' `formats/unit-ladder.js` (only), this write-up and the check script.

| # | Teaser | Sev. | QA issue | What I did |
|---|---|---|---|---|
| Q1 | 08a | must | The verdict printed "≈ $7.01" at 20.2 s while the hero was still rolling ($3.54 at 20.6 s): two numbers that disagree, the payoff spoiled | The payoff cut (16.8 s) puts only the question up: the label stack cuts to "ROSE LIKE A HOUSE?" (`payoff.label`) and the voice asks it. The hero rolls $1.50 → ≈ $7.01 and lands at 18.40 s, and the verdict, its reveal and the ding land on the same beat (verdict.t = 18.4), with "A ≈ $7.01 hot dog." spoken from 18.4 s. The check asserts verdict = hero landing |
| Q2 | 08a | should | The caption repeated the verdict word for word under it | Captions hide from the payoff cut (the label carries the question, then the verdict carries the answer); format-local CSS keyed to a stage attribute, no chrome change |
| Q3 | 08a | should | Rungs 1-2 (membership, iPhone) were 9 s of filler; the answer came at 20.2 s | The iPhone rung is cut and replaced by a month of median rent (≈ 1,021 hot dogs, the housing bill today, from 08b's sourced Census figure); the ladder is Costco card → rent → 1985 house → 2026 house, re-spaced. The payoff lands at 18.4 s instead of 21.8 s and the video runs 22.0 s instead of 26.0. Not done: cutting to 3 rungs (the contract floor is 4), and a 2005 house midpoint (its Census figure could not be confirmed: search log F1-F2) |
| Q4 | 08a | should | The voice said "≈ 43" 1.9 s after it landed; the label read "membership" while the voice said 1985 | The opener is "Your $1.50 hot dog." only; "Costco card?" follows at 2.4 s and "≈ 43 hot dogs." at 3.2 s, 0.22 s after the count lands |
| Q5 | 08a | should | The 1985 share vanished in the held 2026 wall, and the whole stage dimmed behind the payoff | `lookOpts.split`: at the 2026 cut the 1985 dots turn white as they re-pack into their 21% mound, the new dots rain in green around them, "1985" and "AUG 2026" tags pop on, and the split stays lit to the end (no dimming) |
| Q6 | 08a | should | The ≈ $7.01 was never derived on screen | At the payoff cut the footer becomes "$393,700 (Aug 2026) ÷ 56,200 hot dogs (1985)" (`footerSteps`), directly under the rolling hero, and stays to the end |
| Q7 | 08a | nit | Frame 1's hero "1" was unexplained; the icon reads as a pill | The intro hero shows "$1.50" (`introHero: "price"`) and the label drops its own price line. The icon's colours are the kit's shared palette (lib.js), not changed here |
| Q8 | 08a | nit | Grey karaoke showed the answer before the count landed; a mid-phrase wrap | Each number is its own caption cue from its landing; the questions are separate short lines |
| Q9 | 08b | must | Becker captions pop a whole line: "≈ 117 hours" showed at 0.25 s under "? hours", and "the 20th" at 5.4 s while the blank read "9th" | Every answer is its own line from its landing: "$15 an hour? Median rent:" (0.0) / "≈ 117 hours." (2.4, count 2.10); "Every hour you work, to…" (4.4) / "≈ the 20th." (6.4, blank 6.40); the same for the year of rent, the car and the house. Rungs 2-4 moved to 8.4 / 12.85 / 17.3 s and the verdict to 21.8 s; the runtime stays 27.0 s. The check's lag, VO-start and blank rules now test the answer lines |
| Q10 | 08b | should | Earlier piles were cut flat at y ≈ 885 and at the right edge for about 1 s on every cut | In the format: an earlier pile fades out as the push-in takes it past the stage top or the right edge, and back in as the pull-back brings it home; the pull-back also tracks a growing pile more tightly. Checked at 8.8, 9.3, 9.8, 13.6, 18.0 and 18.6 s: no sliced pile. The current pile can still enter from the right edge for about 0.4 s while the camera pulls back |
| Q11 | 08b | should | The end screen was cluttered (a 2×2 recap, wrapped labels, out of order, the apex in its gap) | Recap dropped (`pileLabels: false`): the four piles compare by themselves, and the end screen is header, HUD and verdict around one focal number |
| Q12 | 08b | should | "≈ 14 years" was the smallest key number, under a 120 px "30,053" plate | `lookOpts.morph`: at the verdict the HUD swaps to "30,053 hours ÷ 2,080 a year ≈ / [14] years of full-time work", the gold plate shrinking round the 14 at hero size (with hit lines and a pop). 30,053 stays on screen as the working |
| Q13 | 08b | should | The "≈ 20th" answer had no visual of its own; 2.1-8.4 s was static | `blank.calendar`: a 30-day month grid beside the "117 hours of work" counter fills its days in step with the header's ordinals (1st → 20th, 4.7-6.4 s) and stays until rung 2's cut |
| Q14 | 08b | nit | Mid-phrase caption wraps | The split lines are short and wrap at their punctuation or not at all |
| Q15 | 08b | nit | The label "hours of work" floated during the roll; the number shifted when the plate arrived | A rolling count is right-aligned in its final slot and its label sits where it lands; the "?" uses the same slot |
| Q16 | 08b | nit | The pencil stuck out like an arrow on frame 1; the end slump was a squiggle | The pencil counter-rotates against 60% of the head's tilt (tucked behind the ear: about 43° in frame 1's look-up pose, 54° upright); the figure never draws under ≈ 150 px (about half his full size) |
| Q17 | 08c | must | Row labels wrapped into ragged 2-3 line stacks | Rows are the header's own words: "Community", "In-state", "Out-of-state", "Private"; "1 year" moved to the footer. `oneLine` makes a layout fit only when every label is one line and every filed row keeps its cost (`filedScale` 0.9 and a 16 px minimum leader make the room) |
| Q18 | 08c | should | Every row's icon grid was the same strip, so nothing grew | `iconScale: 200`: one icon = 200 Big Macs on every row, one icon size (22 px) and row count (3), so the strips grow 4 → 10 → 26 → 37 icons; the key "🍔 = 200" sits in the unit row. QA's example (1 icon = 100: 7 → 72) does not fit beside the box at ≥ 18 px |
| Q19 | 08c | should | The payoff was a small check line repeated by a 50 px verdict; the lower page empty | The check line became the payoff step (`lookOpts.payoff`): "= Private vs community / $45,000 ÷ $4,150 = [≈ 10.8×]" on a blue box of about 113 px, the biggest on the sheet; the verdict "One private year = ≈ 10.8 community-college years." lands with it (QA's wording). Below y 1480 is platform UI, so nothing readable goes there |
| Q20 | 08c | should | Frame 1 was all mid-size type | The open (pre-filled) box is 1.25× (about 84 px against about 55), the strip and the unit-row key add weight, and type scales above 1 are tried first; the end state caps the scale at 1.02, so the header (chrome) and labels stay their size |
| Q21 | 08c | nit | Captions showed rounded figures under exact boxes; the grey caption showed the answer while the row typed | Captions print the box's figure, in their own line from the landing; the questions are the header's words |
| Q22 | 08c | nit | Row 4's icon field broke into two blocks | The free-page field is gone; row 4 draws a strip like the others, one block beside its box |
| Q23 | all | info | `teasers/v2/teasers.json` still says "PASSED: all 503 checks" | Not changed: that file is outside this pass's files. It should read 680 (and quote the new runtimes, 22.0 / 27.0 / 22.0 s) |

**Check-script changes:** `build_08a`, `build_08b` and `build_08c` follow the new specs. New generic rule: a rung whose number has its own line must have it start as the count lands (−0.05 to +0.6 s) and after its question. New kit replays: 08a's payoff (question and footer on the cut, verdict on the landing), 08b's blank (ticks during its question, lands as its answer line starts, month grid) and morph (last count ÷ 2,080 = the verdict's years), 08c's payoff step (opens after the last rung, prints the ratio of two costs on the sheet, lands with the verdict); `clean_sheet_landings()` takes a per-step operand. **Result: PASSED, all 680 checks.** The six fix-pass mutations at the top of this file each fail 3-4 checks and exit 1.

**Verification:** `node src/cli.mjs check` 3/3 clean (0 errors, 0 warnings), plus the kits' seven `unit-ladder` samples. Contact sheets and the stills listed at the top read as described in the beat sheets. MP4s re-rendered to `studio/out/` (22.0 / 27.0 / 22.0 s).

### Port to Becker Rig (2026-10-08)

The owner kept two looks, Scoreboard and Becker Rig, and retired Clean Sheet and Live Sheet. 08a (Scoreboard) and 08b (Becker Rig) stay as they are; **08c moved from Clean Sheet to Becker Rig**, with 08b as the bar.

- **Spec:** `studio/specs/08c-becker-rig-college-in-big-macs.json` (new id `08c-becker-rig-college-in-big-macs`, look `becker-rig`). The old spec was moved with `git mv` to `studio/specs/retired/08c-clean-sheet-college-in-big-macs.json`.
- **Kept exactly:** the header (the hook), all nine VO lines with their times, the verdict, every number, the rungs and their cut times (−1.0 / 3.4 / 7.5 / 11.65 s, each on the VO word that names it), the 22.0 s runtime and the pinned comment.
- **Changed because the look needs it:**
  - **Footer:** the Becker Rig footer is at most two mono lines at 40 px, and the Clean Sheet footer only fit at 34 px (a type-floor warning). It now reads "$6.22 Big Mac (Jul 2026) · 1 year of / College Board 2025-26 tuition & fees": every number, the source and the year basis stay, "published" moves to the Assumptions and the description.
  - **`lookOpts`:** Clean Sheet's keys are dropped (Becker Rig does not read them). New: `landAfter: 1.7` and `morph` with `ask` {t 17.35, ask 15.85, item "Private vs community", working "$45,000 ÷ $4,150", display "10.8", label "community-college years", compare [0, 3]}. The payoff that was Clean Sheet's "payoff step" (≈ 10.8× in a blue box) is now Becker Rig's asked takeaway: the same working and number, "10.8 · community-college years" on the gold plate, matching the verdict's wording.
  - **`data.hold`:** 4.69 → 8.65 (22.0 − the Becker Rig kit's last landing, 13.35 s).
  - **`sfx`:** the spec's ding at 17.35 is dropped; the Becker chrome cues its own on the verdict.
- **Format changes** (`looks/becker-rig/formats/unit-ladder.js` only; see the kit notes): the pre-fill of a first rung cut before frame 1, `landAfter`, `morph.ask` / `item` / `compare` (with the recap counts of the other rungs dimming too), a two-line takeaway label, and `beats` (unused here). 08b and both kit samples render pixel-identical to before and lint clean.
- **Why the pacing option and not a VO retime:** at the kit's default pacing the counts land at 5.58 / 9.71 / 14.52 s, after the answer lines at 5.1 / 9.25 / 13.45 s, and Becker captions pop a whole line, so each caption would print a number 0.5-1.1 s before the counter. Moving the answer lines would push every later line and the verdict back; `landAfter: 1.7` keeps the recorded VO and lands every count 0.0-0.1 s before its line (5.10 / 9.20 / 13.35 s).
- **Check script** (`checks/08-unit-ladder.py`): `build_08c` builds the Becker Rig spec; `becker_landings()` replays the pre-fill and `landAfter` (08b's replay is unchanged), and `becker_asked_payoff()` replaces the Clean Sheet payoff checks: asked after the last landing on its question line, the working divides the two compared piles' costs, the number is ≈ that ratio to 0.1, it lands on the verdict's beat and the voice says it after. The Clean Sheet replay (`clean_sheet_landings()` and its payoff rung) is removed. **Result: PASSED, all 674 checks.** Six mutations on scratch copies (listed at the top of this file) each fail 3-6 checks and exit 1.
- **Verification:** `node src/cli.mjs check` clean (0 errors, 0 warnings) for 08a, 08b, 08c and both Becker Rig samples. A 12-frame contact sheet and stills at frame 1, every beat (each coin drop, punch and landing, ±0.04 s around each landing), the ask, the answer and the end, all read by eye; every number on screen (667, 1,921, 5,125, 7,235, the four costs, $6.22, the recap rows, $45,000 ÷ $4,150 ≈ 10.8, the verdict) matches the check. MP4 rendered to `studio/out/08c-becker-rig-college-in-big-macs.mp4` (22.0 s, 1080×1920, 30 fps); frames pulled from it at 0, 9.5 and 18 s match the stills.
- **Not changed (outside this pass's files):** `teasers/v2/teasers.json` still lists 08c under Clean Sheet with "PASSED: all 503 checks".

### QA fix pass after the port (2026-10-08)

QA scored the port 7.5 (on par with 08b, no musts) with three shoulds and five nits. Every change is in `looks/becker-rig/formats/unit-ladder.js` (see the kit notes); the spec, the hook, every number, the VO and the verdict are unchanged.

| QA item | Fix |
|---|---|
| should: a lone leader (out-of-state row to its pile) stays through the ask, the climax and the end card | Leaders are all or none (here none), and a dimmed row's leader goes at the ask instead of dimming. |
| should: both jumps are a 0.8 s mid-air hover in the 'shocked' pose | `hop` (on with `morph.ask`): crouch, take-off on the count, a 56 px (13.35 s) and a 70 px (17.35 s) arc, a squash on touchdown (13.77 / 17.81 s), arms up with his feet down, slump 1 s after take-off (14.35 / 18.35 s). 08b keeps its jump. |
| should: the 10.8 payoff is no bigger than the 7,235 beat, and the two compared piles stand at opposite ends | The community pile hops beside the private mountain at the ask (16.05-16.60 s; the dimmed piles shuffle along, the camera steps back ×0.91 to keep them clear of the recap table), and 10.8 lands at 162 px, 1.19× the counts' 136 px, on a taller plate (154 px against 135): the biggest number in the video. |
| nit: the ask's "?" floats right-aligned mid-row | Flush left at x 62 with the label after it, as on the rung cuts; the label moves beside the plate when it lands. |
| nit: "≈ ?" for 3-4 frames at 17.35 | The "?" squashes out before 17.35, 10.8 pops in on the hit, and the "=" turns into "≈" at 17.40, once 10.8 is fully in. |
| nit: frame 1 is left-heavy | The figure-and-pile group is centred on frame 1 (+160 px pan, same zoom), panning back during the 3.4 s push-in. |
| nit: ragged "≈" in the recap | The "≈" gets its own left-aligned column. |
| nit: piles ghost out at cut time; the price coin pops in mid-air | Not changed: shared format behaviour, and fixing it changes 08b. |

- **Check script:** `becker_asked_payoff()` gains three checks from the kit's timing: compare names the smaller pile first and it hops beside the bigger one; the two stand side by side (16.60 s) at least 0.5 s before the answer lands; the answer and its "≈" are fully in within 0.1 s of the verdict's beat (17.40 s) and before the voice says it (18.50 s). **Result: PASSED, all 677 checks.** Mutations on scratch copies: compare [3, 0] fails 5 checks, `beside: false` fails 2, and the ask at 16.95 s fails 4; each exits 1.
- **Verification:** lint clean (0 errors, 0 warnings) for 08b, 08c and both Becker Rig samples; 08b pixel-identical; stills and a contact sheet read by eye (listed at the top); MP4 re-rendered to `studio/out/08c-becker-rig-college-in-big-macs.mp4` (22.0 s, 1080×1920, 30 fps, with audio), and frames pulled from it at 0, 16.6 and 21.9 s match the stills.

### Condensed cut (2026-10-13): 08a, 08b, 08c

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The 06c and 06b precedents (shipped) apply: keep the hook, every verified number, the verdict wording, the facts and the end card; change the clock first; captions are on-screen text (no narration), each up ≥ max(1.2 s, 0.12 s a word); frame 1 is the thumbnail (hook caption whole, something moving from frame 2); no still run of 0.4 s or more before the verdict hold, near-still stretches included; the verdict about 0.8-1.5 s after the final reveal, held 1.2-1.6 s, then the unchanged card.

**Files:**
- New: `studio/specs-wip/08a-scoreboard-costco-hot-dogs.json`, `studio/specs-wip/08b-becker-rig-hours-at-15.json`, `studio/specs-wip/08c-becker-rig-college-in-big-macs.json`, retimed copies of the round-2 cuts.
- Kit, opt-in only: `studio/looks/becker-rig/formats/unit-ladder.js` gains `lookOpts.prefillPan` (header comment and `studio/looks/becker-rig/README.md` §12 document it). The default is unchanged (proof below).
- Changed: this write-up (the three beat sheets and caption tables, the spec lines, the R2 / R9 / R10 times, the frame-1 and blank notes, the at-a-glance table, the check summary, the kit notes, the caveats and this entry) and `checks/08-unit-ladder.py` (cut-aware).
- Not touched: `studio/specs/*.json` (the ship step promotes), Scoreboard's kit (08a needed no kit change), Becker Rig's `lib.js`, `theme.js`, `style.css`, `cta.js` and `kit.js`, every other format, `src/`, `sound/` (packs, bible, acceptance), `test/`, `publishing/` and `renders/`. Renders are in `/tmp/cond/08/<id>/` only. Nothing is committed.

**Kept, character for character:** every header, footer, unit, rung (item, cost, units, `unitsDisplay`), the verdicts, 08a's `introHero` / `climaxFill` / `payoff` / `split` / `footerSteps` (its working), 08b's `pileLabels` / `blank` text and calendar / `morph`, 08c's `morph` (ask, item, working, display, label, compare), the hidden narration lines under the payoff label and the verdicts, 08a's verdict ding, and the 2.5 s end card (the brand layer is untouched).

**Captions changed** (no number changed; every number on screen is still a computed value, checked):
- Merged: 08a "Costco card?" + "≈ 43 hot dogs." → "Costco card? **≈ 43** hot dogs." (the 0.5 s intro leaves no 1.2 s for the question alone); 08b "≈ 117 hours." + "Every hour you work, to…" + "≈ the 20th." → one line, from the blank's landing; 08c "≈ 7,235." + "Versus community?" → one line, from the last landing through the ask.
- Dropped (each a spoken rounding of a count the screen prints exactly, and each followed by the payoff or verdict too soon for a 1.2 s caption): 08a "≈ 262,000." (the hero prints ≈ 262,467; the payoff cut 0.55 s later hides the caption band) and 08b "≈ 30,000 hours." (the plate prints ≈ 30,053 and the morph keeps it in its working; the verdict lands 0.9 s later).
- Paced for reading: every shown line is up ≥ max(1.2 s, 0.12 s a word), back to back (gaps 0.02-0.03 s); each hook line starts at −0.4 s, so it is whole on frame 1.

**Measured before** (`renders/channel/<id>.mp4`, the shipped round-2 cuts; frame difference at 270×480, `tblend` difference → `signalstats` YAVG; still if YAVG < 0.15, near-still under 0.25; `/tmp/cond/08/tools/motion.py`):

| | 08a (22.0 + 2.5 s) | 08b (27.0 + 2.5 s) | 08c (22.0 + 2.5 s) |
|---|---|---|---|
| Still runs ≥ 0.4 s before the verdict | 0.33-1.50 (1.17, the intro), 3.33-4.80 (1.47), 7.03-8.00 (0.97), 10.60-11.97 (1.37), 15.33-16.80 (1.47): after every count | 2.57-4.40 (1.83), 5.67-6.07 (0.40), 6.63-8.43 (1.80), 10.93-12.90 (1.97), 15.40-17.33 (1.93), 21.07-21.80 (0.73) | 0.33-3.33 (3.00, the pre-filled frame), 5.30-7.50 (2.20), 9.43-11.67 (2.23), 13.93-14.37 (0.43), 14.67-15.87 (1.20), 16.83-17.23 (0.40) |
| Near-still beats | | the blank's tick, 4.83-5.47 and 5.67-6.30 (only the small grey ordinals and the 26 px grid cells change) | |
| Verdict hold | 18.90-22.03 (3.13) | 22.23-27.03 (4.80) | 18.47-22.03 (3.57) |

The kits only move between a cut and its landing (and for 0.2-0.35 s after it); the round-2 cuts left 1-2 s after every count for a recorded voice.

**The cuts** (round-2 → condensed):

| | 08a | 08b | 08c |
|---|---|---|---|
| Body / total | 22.0 / 24.5 → **13.93 / 16.43 s** | 27.0 / 29.5 → **12.85 / 15.35 s** | 22.0 / 24.5 → **12.1 / 14.6 s** |
| Rung cuts | 1.5, 4.8, 8.0, 11.95 → **0.5, 2.48, 4.92, 7.36** | 0, 8.4, 12.85, 17.3 → **0, 2.95, 5.55, 8.15** | −1.0, 3.4, 7.5, 11.65 → **−1.0, 1.25, 3.85, 6.45** |
| Counts land | 2.98, 6.74, 10.32, 14.77 → **1.98, 4.42, 6.86, 10.18** | 2.10, 10.71, 15.16, 20.17 → **2.20, 5.15, 7.75, 10.35** | −0.4, 5.10, 9.20, 13.35 → **−0.4, 3.45, 6.05, 8.65** |
| Pace knob | none: each rung cuts 0.5 s after the previous count, the floor the kit keeps (a roll always ends ≥ 0.5 s before the next cut; it shortens rung 3's roll to 1.52 s) | `landAfter: 2.2` (was the kit's pacing); each later cut 0.4 s after the previous landing | `landAfter` 1.7 → **2.2**; each later cut 0.4 s after the previous landing |
| Frame 1 → motion | the hot dog falls from frame 1 (lands 0.2 s) and rung 1 cuts at 0.5 s, the earliest that keeps the unit intro | the header's blank starts ticking at 0.15 s (the grid fades in from 0.03 s); the wind-up at 0.47 s | **`prefillPan: 1.55`** (new, opt-in): the pre-filled frame pans back from frame 2 |
| The blank (08b) | | `{ t 4.7, d 1.7 }` → **`{ t 0.15, d 2.4 }`**: ticks while the hours pile up, lands 0.35 s after the count (2.55 s); `beats: [{ t 2.41, act: "pointUp", d 0.5 }]` (the kit's own point needs 0.9 s before the next cut) | |
| Payoff | cut 16.8 → **10.73** (0.55 s after the last count); the hero's 1.4 s roll unchanged | | ask 15.85 → **9.25** (0.6 s after the last count, as his hop lands) |
| Verdict / hold | 18.4 / 3.6 s → **12.33 / 1.6 s** (lands with the hero, as before) | 21.8 / 5.2 s → **11.25 / 1.6 s** (0.9 s after the last count; the morph with it) | 17.35 / 4.65 s → **10.5 / 1.6 s** (the answer 1.25 s after the ask; the compared piles side by side 0.5 s before it) |
| `sfx` | the verdict ding 18.4 → 12.33 | none | none |
| `data.hold` | 7.23 → 3.75 | 6.83 → 2.5 | 8.65 → 3.45 |

**Iteration** (every version lints clean):
1. **08a.** v1 (cuts 0.5 / 2.56 / 5.05 / 7.5, 2.5 s between landings): still runs 0.30, 0.30 and 0.20 s after the first three counts, and 0.40 s near-still after "≈ 43". v2 cuts each rung at the kit's 0.5 s floor (landings 2.44 s apart, the least two 1.2 s captions need): 0.27, 0.23 and nothing over 0.2 s. **This is the cut.**
2. **08b.** v1 (`landAfter` 2.2, cuts 0.5 s after each landing, "≈ 30,000 hours." kept and the verdict 1.22 s after the last count): still runs 0.33 s after each landing, near-still 0.40 s, and 0.73 s of near-still picture between the last landing and the verdict (only his slump moves; the figure is small that far out). v2 cuts 0.4 s after each landing, drops the last count's spoken rounding and lands the verdict 0.9 s after the count: 0.23, 0.23 and 0.30 s. **This is the cut.**
3. **08c.** v1 (ask 1.45 s after the last count, "≈ 7,235." and "Versus community?" separate): still run 0.43 s between his hop's touchdown (9.07) and the recap table (9.65). v2 asks 0.6 s after the count, with the merged line, answer 1.35 s after the ask: 0.43 s near-still between the side-by-side landing and his crouch. v3 answers 1.25 s after the ask: 0.33 s. **This is the cut.** The answer sits at x.5 s so the kit's own 2-frame pop overlap (below) stays off the linter's 0.25 s grid, as in the round-2 cut (17.35 s).

**Measured after** (the final renders, `/tmp/cond/08/<id>/render/<id>.mp4`, same method):

| | Still runs ≥ 0.4 s | Longest still before the verdict | Near-still (YAVG < 0.25) ≥ 0.2 s before the verdict |
|---|---|---|---|
| 08a | only the verdict hold, 12.83-13.93 (1.10), and the card hold, 15.43-16.43 | **0.27 s** (2.23-2.50, after "≈ 43"; was 1.47 s) | 2.17-2.50 (0.33), 4.63-4.93 (0.30), 7.07-7.37 (0.30) |
| 08b | only the verdict hold, 11.70-12.87 (1.17), and the card hold, 14.07-15.37 | **0.30 s** (10.87-11.17, his slump before the verdict; was 1.97 s) | 0.33-0.53 (0.20), 5.30-5.60 (0.30), 7.93-8.20 (0.27), 10.87-11.20 (0.33) |
| 08c | only the verdict hold, 11.13-11.53 and 11.60-12.13 (his slump splits it), and the card hold, 13.33-14.60 | **0.23 s** (3.67-3.90 and 6.27-6.50; was 3.00 s) | 3.60-3.90 (0.30), 6.23-6.50 (0.27), 10.17-10.50 (0.33) |

- Openings: 08a moves from frame 2 (the falling hot dog, YAVG 0.74-1.67) to 0.30 s, then 0.33-0.47 s at YAVG 0.001-0.09 (0.13 s) until the cut; 08b's month grid fades in from frame 2 and the ordinals tick from 0.15 s (0.33-0.53 s is the one near-still stretch, 0.20 s, before the wind-up); 08c's pan runs at YAVG 0.61-1.54 from frame 2 to the cut.
- Every near-still stretch before a verdict is ≤ 0.33 s. None is a counter alone: the 08b blank's tick now runs under the flying icons and the rolling count.

**Stills read** (`stills` at every beat, tiled; the 16-frame `sheet`; frames pulled from the renders):
- 08a at 0, 0.2, 0.5, 1.98, 2.48, 3.2, 4.42, 4.92, 5.64, 6.86, 7.36, 7.83, 8.08, 10.18, 10.73, 11.5, 12.33, 13.9 and 16.4: frame 1 is the hook (header, hero "$1.50", the hot dog mid-fall, "YOUR HOT DOG + SODA", "Your $1.50 hot dog." whole); ≈ 43, ≈ 1,021, 56,200 and ≈ 262,467 land as the beat sheet says; the white 1985 mound and its tag at 7.83, "AUG 2026" at 10.18; "ROSE LIKE A HOUSE?" with the working at 10.73; the hero at $5.86 at 11.5 and ≈ $7.01 with the verdict at 12.33; the card.
- 08b at 0, 0.15, 0.6, 1.2, 2.2, 2.41, 2.6, 2.95, 3.5, 3.9, 5.2, 5.6, 6.5, 7.8, 8.2, 9.0, 10.4, 10.8, 11.3, 11.6, 12.8 and 15.3: frame 1 keeps "___" and "? hours"; "1st" and the empty grid at 0.15, "9th" over 30 hours at 1.2, "18th" over 117 at 2.2, the point at 2.41, "≈ 20th" green with 20 days filled at 2.6; 1,402, 3,824 and 30,053 (on the plate) land; the morph "30,053 hours ÷ 2,080 a year ≈ / 14 years of full-time work" and the verdict at 11.3-12.8; the card.
- 08c at 0, 0.3, 0.8, 1.25, 1.5, 1.9, 2.2, 3.45, 3.9, 4.5, 6.05, 6.5, 7.0, 8.6, 8.9, 9.3, 9.6, 9.9, 10.2, 10.45, 10.6, 11.0, 12.0 and 14.5: frame 1 is the round-2 frame 1 (pre-filled 667, the pile, the point, the whole caption), panning left by 0.8; 1,921, 5,125 and 7,235 land; the ask, the dimming and the community pile's hop at 9.3-9.9; the recap table complete by 9.9; 10.8 on its plate with the verdict at 10.6-12.0; the card.
- Nothing collides, nothing is cut off, every number matches the maths tables. Known kit behaviour, unchanged and as in the round-2 cuts: in Becker Rig a new price coin starts mid-air beside his head; 08c's 10.8 pop overlaps the working line for two frames (lint below).

**Lint** (`node src/cli.mjs check`): the three WIP specs give 0 errors, 0 warnings (16.4 s = 13.9 + 2.5; 15.3 s = 12.8 + 2.5; 14.6 s = 12.1 + 2.5). With `--every 0.05`, 08c shows `overlap @10.55-10.60s: "$45,000" / "÷ $4,150" overlaps "10.8"`: the asked answer's pop-in overshoot touching the working line for two frames. The shipped round-2 cut has the same two frames (`@17.40-17.45s`); it is the kit's default morph behaviour, left alone here.

**Kit change and proof** (`looks/becker-rig/formats/unit-ladder.js`, opt-in `lookOpts.prefillPan`):
- What it does: with a pre-filled first rung, the existing pan from the centred frame-1 group back to his usual spot (`pan0`, 160 px here) runs from frame 1 over `prefillPan` s with an ease-out, instead of with rung 2's push-in. No `ctx.cue` call, no new element; frame 1 is the same picture. Without a pre-filled first rung it is ignored.
- Default unchanged: for every committed spec and sample using Becker Rig unit-ladder (`specs/08b`, `specs/08c`, `samples/unit-ladder.json`, `samples/unit-ladder-2.json`), the cue records (`cues --out`) and stills at 5 times each (20 PNGs) are byte-identical before (the kit as committed at 4fb0b00, captured before the edit) and after: 24 of 24 md5s equal (`/tmp/cond/08/kitproof/{before,after}.md5`). Lint: 08a, 08b, 08c and both samples 0 errors, 0 warnings.
- Guards: the WIP 08c's cue record is byte-identical with and without `prefillPan` (md5 `2e706fb2…`), and so is its frame 1; `specs/08b` with `prefillPan: 1.5` added gives the committed 08b's cue record and 5 stills exactly (no pre-filled rung, so it is ignored).
- One renderer note: a `stills` run that visits 1.0 s (mid-pan) before 3.0 s gives a 3.0 s frame that differs from a direct render of 3.0 s in 10 px by at most 2 levels (Chromium's pattern-tile raster cache; repeat runs reproduce both). Renders go frame by frame in order, and the default path is untouched.

**Render and sound:**
- `render specs-wip/<id>.json --out /tmp/cond/08/<id>/render`: 08a 493 frames, 16.43 s, 24 sfx; 08b 461 frames, 15.35 s, 26 sfx; 08c 438 frames, 14.6 s, 24 sfx (1080×1920, 30 fps). The kit's 08b output is the same content as the review render made before the kit change (253 of 461 frames bit-identical, the rest encoder-level noise, PSNR ≥ 48.98 dB); 08a's final render is byte-identical to its review render.
- `sound specs-wip/<id>.json --video …/render --out …/final --score`: 08a −14.04 LUFS, TP −1.5 (AAC −1.23) dBTP, LRA 4.77, P 10.18 by the riser rule, 141.454 / 144 BPM, cue onsets within 0.21 ms; 08b −14.1 LUFS, TP −1.5 (AAC −1.43), LRA 3.2, P 11.25 by the verdict rule, 128 / 128 BPM, onsets within 0.29 ms; 08c −14.08 LUFS, TP −1.5 (AAC −1.38), LRA 4.78, P 10.5 (verdict + hit), 114.286 / 112.5 BPM, onsets within 0.33 ms. Each MP4 is byte-identical to its render (the render already carries the engine's audio): sha256 `786b819d…` (08a), `ff2cca96…` (08b), `08578b59…` (08c); video md5 `0b75fb48710b`, `62d6c362264f`, `391fa7381aff`; masters `1ea499b7…`, `f3b5f311…`, `75ea8d0e…`.
- Pack state: 08a was built with the committed Scoreboard calibration (the concurrent ship step rewrote `looks/scoreboard/sound/calibration.json` at 06:36, after this build). 08b and 08c were built after the ship step's Becker `MODEL` refit in the working tree (06:31: C −23.29, a 0.065, b 1.159; committed C −23.37, a 0.061, b 1.165). The audio-only runs of the same cuts before that refit gave the same verdicts within 0.1 dB / 0.04 LU (below), so the failures do not hang on it.
- The §2.3 rows these cuts need on promotion (`sound/tools/tempo-table.mjs --cues` on the three WIP records; Appendix B and the engine agree on all 3):
  - `| 08a | riser | 10.180 | 24 (r0) | 141.454 | base 13.93: 9 (r1) @ 144.00 | 14.29 |` (was P 14.770, 36 beats at 146.242, V 18.40, base 22.00, L 22.36)
  - `| 08b | verdict | 11.250 | 24 (r0) | 128.000 | base 12.85: free | 13.37 |` (was P 21.800, 44 at 121.101, base 27.00, L 27.50)
  - `| 08c | verdict+hit | 10.500 | 20 (r0) | 114.286 | base 12.10: 3 (r3) @ 112.50 | 12.60 |` (was P 17.350, 36 at 124.496, base 22.00, L 22.50)

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/08/<id>/final --detail`; the CUE DRIFT block and "baseline DIFFERS" are expected for WIP cuts). Each gated check with its margin to the limit (negative = failing):

| | 08a (Scoreboard): **38/42**, 4 fail | 08b (Becker Rig): **40/42**, 2 fail | 08c (Becker Rig): **41/42**, 1 fail |
|---|---|---|---|
| A1 delivery / master (±1 / ±0.3 of −14) | −14.13 / −14.04: 0.87 / 0.26 | −14.16 / −14.10: 0.84 / 0.20 | −14.17 / −14.08: 0.83 / 0.22 |
| A2 true peak (≤ −1 dBTP) | −1.20: 0.20 | −1.40: 0.40 | −1.38: 0.38 |
| A3 LRA (SB 4-9, BR 3-8) | 4.72: 0.72 | 3.16: **0.16** | 4.68: 1.68 |
| A4 short-term / momentary max (≤ −8 / −6) | −11.24 / −9.41: 3.24 / 3.41 | −12.07 / −11.02: 4.07 / 5.02 | −11.48 / −9.78: 3.48 / 3.78 |
| A5 PLR (8-13) | 12.93: **0.07** | 12.76: 0.24 | 12.78: 0.22 |
| A6 silence | 0% | 0% | 0% |
| A7 M(0-0.4 s) (≥ −18) | −9.69: 8.31 | −11.53: 6.47 | −11.77: 6.23 |
| A8 corr mean / min / mono fold | 0.74 / 0.41 / −0.74: 0.44 / 0.51 / 0.76 | 0.91 / 0.61 / −0.26: 0.61 / 0.71 / 1.24 | 0.89 / 0.51 / −0.40: 0.59 / 0.61 / 1.10 |
| A9 DC (≤ 1e-4) | 1.4e-5 | 9.6e-6 | 1.3e-5 |
| A10 phone drop (SB ≤ 7, BR ≤ 4.5) | 2.54: 4.46 | 2.62: 1.88 | 2.21: 2.29 |
| A11 > 1 dB limited (≤ 3%) / max (≤ 6 dB) | **✗ 3.788%: −0.79 points** / 3.45 dB: 2.55 | 1.049%: 1.95 / 4.82: 1.18 | 0.838%: 2.16 / 4.68: 1.32 |
| A12-A14 | AAC LC 48 kHz stereo, 16.430 vs 16.433 s; video md5 identical; master unique | 15.350 vs 15.367 s; identical; unique | 14.600 vs 14.600 s; identical; unique |
| BANDS (dB re 1 kHz, margin to the window) | **✗ 16 kHz −11.8 against −12: −0.2**; 31.5 +4.9, 63 +3.0, 125 +2.6, 250 +1.6, 500 +2.2, 2k +2.0, 4k +3.5, 8k +1.5 | **✗ 125 Hz 7.5 against 7: −0.5; 2 kHz +1.2 against 0: −1.2**; 31.5 +5.3, 63 +2.1, 250 +1.2, 500 +1.4, 4k +1.8, 8k +3.4, 16k +6.1 | 31.5 +5.8, 63 +1.9, 125 +1.9, **250 +0.6**, 500 +1.5, 2k +1.5, 4k +2.7, 8k +1.5, 16k +5.0 |
| HARSH (≤ 2) | −0.33: 2.33 | −1.43: 3.43 | −1.57: 3.57 |
| B1 music / SFX | −2.86 (−3.5..−1.5): 0.64 / −3.26 (−5..−2.5): 0.76 | −2.31 (−4.5..−0.5): 1.81; SFX − music −0.55 (±2): 1.45; returns −11.47 (≤ −8): 3.47 | −1.96: 1.46; −1.0: 1.0; −11.23: 3.23 |
| B2 duck at P (≤ −8 dB) | −10.8: 2.8 | −10: 2.0 | −10: 2.0 |
| B3 closest cue over the music (≥ 3 dB) | 4.6: 1.6 (13/13) | 3.3: **0.3** (17/17) | 6.9: 3.9 (14/14) |
| B4 onsets (≤ 2 ms) | 0.21: 1.79 | 0.29: 1.71 | 0.33: 1.67 |
| B5 onset at P (±10 ms) | −1.3: 8.7 | 0.0: 10 | 0.0: 10 |
| B6 continuity (≤ 18 LU) | 4.9: 13.1 | 3.3: 14.7 | 2.6: 15.4 |
| B7 energy curve | **✗ build halves −17.1 → −17.3 (edge): falls 0.2 LU** | drop-build 3.3 / 4.3, halves rise | drop-build 3.2 / 4.3, halves rise |
| B8 logo M(L+0.2) ≥ −13, not over the payoff | **✗ −13.21: −0.21** (payoff −10.12) | **✗ −11.95, 0.22 LU over the payoff's −12.17** | −12.15: 0.85; payoff −10.26 (1.89 over the logo) |
| B9, B10 | pass | pass | pass |
| S1-S14 | pass (S9 141.454 / 144 BPM) | pass (S9 128 / 128) | **✗ S8: mallet velocity SD 0.159 against ≤ 0.15** (others pass; S9 114.286 / 112.5) |
| TRAIN, DUCK (SB); MALLET, FLAMS (BR) | pass | pass | pass |

**What fails, and why** (none of these can be moved by a spec knob without bringing still moments back; each is the ship step's, per the brief):
- **08a A11, 3.788% of samples limited by more than 1 dB against 3%.** The limiter's hotspot is the payoff burst at P (the riser's end, the last count's landing): the kit's `hit` with the pack's reverse crash, clap, kick and hat at 10.18 s, 0.507 s over 1 dB at up to 3.45 dB; plus a hat at 0.43 s (0.095 s). That is 0.62 s in all, the same as the round-2 cut (2.553% × 24.5 s); the shorter file makes it a larger share (06b's lesson, BIBLE §11.2). An audio-only sweep of eleven 08a variants (payoff 0.45 / 0.55 / 0.65 s after the count, a 1.2 s payoff roll, 1.2 / 1.4 s holds, the verdict ding at 0.5 or removed, rung 1 at 0.55 / 0.6 s, 0.05 s caption gaps) gave 3.75-4.28%. It needs a pack-level rule for the Scoreboard P stack (as the bible's note on 06b asks), or a body of 20.7 s or more.
- **08a BANDS 16 kHz, −11.8 against a −12 ceiling (0.2 over).** 13 bright cues (dings, the riser, two hits, two cashes, rolls) in a 13.9 s body; the variants gave −11.2 to −12.1. 06a's condensed cut sits at −12.4.
- **08a B7, the BUILD's second half 0.2 LU quieter than its first (edge windows).** Rungs 3 and 4 cut, roll and land inside the BUILD's second half, so the cue ducks take more of it; variants gave −0.1 to −0.6 LU.
- **08a B8, the logo at −13.21 LUFS against −13.** The variants gave −13.11 to −13.92 (B8 is tempo-map sensitive, as 06a's sweep found). The Scoreboard refit the ship step is running (calibration.json, 06:36) may move it.
- **08b BANDS 125 Hz +0.5 and 2 kHz +1.2 over their ceilings.** Four coin thuds and punches, the plate's hit (low end) and the blank's ding, the landing pops and the verdict's ding (2 kHz bells) in a 12.85 s body, where Becker's crowding rule (§6.7 item 4) watches the 1 kHz octave only. The sweep (verdict 0.8 / 0.9 / 1.1 s after the count, `landAfter` 2.2 / 2.3 / 2.4, before the MODEL refit) gave 125 Hz 7.1-8.2 and 2 kHz +0.8 to +2.4 in every variant.
- **08b B8: the logo (−11.95 LUFS) is 0.22 LU louder than the payoff (−12.17).** P is the verdict (the verdict rule); its window holds the morph's pop and the verdict's ding, 0.9 s after the plate's hit. Only `landAfter` 2.4 with the verdict 1.1-1.2 s after the count passed in the sweep, by 0.05-0.78 LU, at a cost of 0.8 s and still-free picture not yet rendered; left for the pack.
- **08c S8, mallet velocity SD 0.159 against ≤ 0.15.** A score property of a 12.1 s body (fewer mallet notes, wider spread); 0.154-0.159 in all six variants (ask, answer, `landAfter` 2.0 / 2.4, rung 1 at 1.3 s, a 1.4 s hold, 0.45 s dwells).
- Tight passes to watch: 08a A5 0.07 and A2 0.20 (closed-loop encode targets); 08b A3 LRA 0.16, B3 0.3 dB; 08c 250 Hz +0.6.

**Check (`checks/08-unit-ladder.py`):**
- `--spec [KEY=]PATH` (repeatable; KEY a/b/c, 08a/08b/08c or the full id) checks a spec in place of `studio/specs/<id>.json`. Each teaser has two expectation sets, picked by the spec's length: the round-2 cut (22.0 / 27.0 / 22.0 s) and the condensed cut; a spec of any other length is checked as condensed and fails its lane (08a 13-15 s, 08b 12-14 s, 08c 11.5-13.5 s of body) and stops there. `IN_SPECS` names the cut `studio/specs/` must hold (`"full"` for all three today).
- Shared by both cuts: every number, string, rung and kit option; the kit replays (Scoreboard roll, Becker Rig drop / punch / fill with `landAfter` and the pre-fill); the payoff, blank, morph and asked-takeaway rules.
- The narration rules (2.6 words/s, a VO line at 0.0, questions on their cuts, the voice not before its count, the 20-40 s lane, a 2.5 s verdict hold) stay with the round-2 set. The condensed set has instead:
  - captions on screen ≥ max(1.2 s, 0.12 s a word), from frame 1 until they end or the payoff / verdict hides the band (the lines under the label or verdict exempt), back to back (< 0.2 s gaps), the last shown line up to the hide;
  - the hook caption whole on frame 1 (Scoreboard: rises in by −0.14 s; Becker Rig: its last word popped by frame 1);
  - each question within 0.85 s of its cut; each number line (own or merged) within 0.6 s after its count, never before, printing that rung's figure;
  - each landing followed by the next cut in 0.35-0.6 s; landings 2.44-3.0 s apart (the climax rung up to 3.4 s);
  - the verdict held 1.2-1.6 s;
  - 08a: rung 1 cuts at 0.5-0.6 s; the payoff cuts 0.45-0.65 s after the last count; the last question line runs through its landing to the payoff cut (the last count uncaptioned);
  - 08b: the blank ticks from 0.12-0.25 s (grid hidden on frame 1) and before the first wind-up, lands 0.3-0.6 s after the count on its merged line, rung 1 cuts 0.35-0.6 s later, a `pointUp` beat on the landing; rung 0's punch by 0.8 s; `landAfter` set; the verdict 0.8-1.5 s after the last count, the last question running to it;
  - 08c: `prefillPan` from frame 1 at least until rung 1 cuts (≤ 0.5 s past it); the pre-filled answer up ≥ 1.2 s before rung 1; the ask 0.5-0.8 s after the last count, on a line carrying "Versus community?" from that landing; the answer 1.25-1.4 s after the ask.
- Results: **680 checks, 0 failed by default** (was 677; one "which cut" row per teaser); **701, 0 failed** with `--spec studio/specs-wip/08a-scoreboard-costco-hot-dogs.json --spec studio/specs-wip/08b-becker-rig-hours-at-15.json --spec studio/specs-wip/08c-becker-rig-college-in-big-macs.json`.
- Mutation test (scratch copies in `/tmp/cond/08/mut/`, `/tmp/cond/08/tools/mutate.py`): **23 of 23 caught**, each with exit 1 and its targeted rule among the named failures:
  - 08a: rung 1 at 0.8 s; the hook caption from 0.0; the payoff 1.0 s after the last count; "≈ 1,000." up 1.0 s; "≈ 262,000." re-added for 0.55 s; rung 4 cut 0.24 s later; "≈ 1,100"; a 15.5 s body;
  - 08b: the blank from frame 1; the blank 0.8 s after the count; no `pointUp` beat; the verdict 1.8 s after the last count; `landAfter` 2.6; a 0.4 s caption gap; "≈ the 18th";
  - 08c: no `prefillPan`; `prefillPan` 0.5 s; the ask 1.0 s after the last count; a 2.0 s verdict hold; "≈ 7,235." and "Versus community?" split again; rung 1 at 0.9 s; the hook caption from −0.2 s; "≈ 5,152".

**To promote** (the ship step):
1. Copy the three WIP specs over `studio/specs/<id>.json` and set `IN_SPECS` to `"cond"` for all three in `checks/08-unit-ladder.py` (the round-2 sets then serve git-history copies: `git show d71fd5c:studio/specs/<id>.json` passed with `--spec` from outside `studio/specs/`).
2. Commit the kit change with them (`looks/becker-rig/formats/unit-ladder.js` and README §12); the committed specs render as before (proof above).
3. BIBLE §11.1 for the three moved records: refit Scoreboard (§11.2) and Becker Rig's `MODEL`, store the records in `test/fixtures/cues.json`, `tempo-table --write` (the three rows above), then `verify --strict-cues` and `npm test`, and add a status line. The sound gates these cuts fail today are listed under Verify; each needs a pack-level answer, not a spec one (the sweeps under Verify).
4. Ship by §11.5 from a picture folder that holds these renders (or fresh renders of the promoted specs).
5. Publishing and `teasers/v2/teasers.json`: runtimes 16.43 / 15.35 / 14.6 s; the check counts above; 08a's and 08c's Instagram covers (the final frame) still exist; 08b's cover moment (the 117-hour pile, "≈ 20th", the grid at the 20th) is now 2.55-2.95 s.

**Open items:**
- Sound (above): 08a A11 3.79% (P burst), 16 kHz −11.8, B7 −0.2 LU, B8 −13.21; 08b 125 Hz 7.5 and 2 kHz +1.2, B8 logo over payoff by 0.22 LU; 08c S8 mallet SD 0.159. All structural for these bodies (the sweeps above), all for the pack refit / P-stack rules.
- The figure is small once the piles grow (Becker Rig's camera); pose changes alone barely move the frame-difference metric, so the condensed Becker cuts rely on cuts, punches, flying icons and camera moves for motion.
- 08c's 10.8 pop overlaps the working line for two frames (kit default, also in the round-2 cut).
