# 08 · Unit ladder ("Cost in units of X"): three teasers

**Format:** `unit-ladder` (rank 8 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P8**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews). All three hooks were rewritten on 2026-10-08 in hook pass 2; see the [Review log](#review-log).
**Specs:** the file names are kept from the first draft.
- [`studio/specs/08a-scoreboard-costco-hot-dogs.json`](../../studio/specs/08a-scoreboard-costco-hot-dogs.json). The hook is now "What your $1.50 hot dog would cost if it rose like a house".
- [`studio/specs/08b-becker-rig-hours-at-15.json`](../../studio/specs/08b-becker-rig-hours-at-15.json). The hook is now "At $15/hr, you work for rent from the 1st to the ___".
- [`studio/specs/08c-clean-sheet-college-in-big-macs.json`](../../studio/specs/08c-clean-sheet-college-in-big-macs.json). The hook is now "Community? In-state? Out-of-state? Private? Your year in Big Macs".

**Maths check:** [`checks/08-unit-ladder.py`](checks/08-unit-ladder.py).
- It recomputes every on-screen number from the sourced inputs, in exact fractions, and rebuilds every display string and VO line from those numbers. Then it compares them with the three specs, leaf by leaf.
- 08b divides by the **defined unit $13.10** (the kept hourly rounded to the cent), the same operand the screen shows in "÷ $13.10".
- Timing:
  - every VO line fits 2.6 words/s;
  - no VO lines overlap;
  - each rung's VO line names it in its first words and starts on its cut. In 08b it starts up to 1.4 s after the cut, so the voice says the count as the built kit lands it. 08c's row 1 is pre-filled before frame 1 and read at 0.0. 08a's rung 1 cuts under the opener line and is spoken after it lands;
  - the first count lands within 3 s (R10);
  - the header is at most 15 words (R8).
- It replays all three built kits' own timing rules from `looks/<look>/formats/unit-ladder.js`:
  - **Scoreboard (08a):** the counter roll, including the unit intro.
  - **Becker Rig (08b):** coin drop, punch and fill.
  - **Clean Sheet (08c):** type, wipe, count, pre-fill, the VO fit and filing.
  - In all three, the voice never says a number more than 0.5 s before its counter lands. 08c's check line is fully typed before the verdict.
  - **08a's payoff roll** (`lookOpts.payoff`): it starts on the verdict, rolls from the unit price to the verdict's number, and lands (21.80 s) before the voice says "≈ $7.01" (22.12 s).
  - **08b's blank** (`lookOpts.blank`): it starts ticking inside vo[1], prints the same day the voice says, lands (6.40 s) at most 0.5 s before the voice says "≈ the 20th" (6.52 s), and sits between rung 0's landing and rung 1's cut.
- It also checks:
  - the contract shape;
  - "≈" on every rounded result;
  - the calendar claim behind 08b's "≈ the 20th", on a 30-day month, on the average month and on a Monday-Friday calendar for all 7 weekdays the 1st can fall on;
  - every pinned-comment and caption number in this file.
- **Result: PASSED, all 524 checks** (503 before the assembly pass; see the [Review log](#review-log)).
- **Mutation test:** on scratch copies of the three specs, six mutations: in 08a the verdict ≈ $7.01 → ≈ $7.00 and the rung-1 cut back to 2.0 s; in 08b "≈ the 20th" → "≈ the 18th" and vo[2] back on its cut at 8.4 s; in 08c one count ≈ 5,125 → ≈ 5,126 and row 1 moved to t = 0.0, so it is no longer pre-filled. 16 of 503 checks fail, and the script exits with code 1. Every mutation is caught by an independent rule as well as by the leaf-by-leaf comparison: R10 (first count at 3.48 s), the voice 0.69 s ahead of the counter, row 1 not pre-filled, or a number that is not computed.
- **Assembly-pass mutations:** 08b's blank "≈ 20th" → "≈ 18th", 08b's blank start 4.7 → 6.0 s, and 08a's payoff start 20.2 → 21.5 s. Each fails 3 checks (the leaf comparison plus two independent rules: a number that is not computed or a day the voice does not say; the blank landing after the voice; the payoff landing 0.98 s after the voice), and the script exits with code 1.

**Studio linter** (`node src/cli.mjs check`): **3/3 clean, 0 errors, 0 warnings.** That covers safe zones, the type floor, overlap, contrast and the R1 hook number. I rendered all three in the built kits and checked these stills by eye:
- 08a at 0.0, 1.5, 2.9, 3.0, 4.9, 9.5, 17.95, 18.05, 18.2, 21.6 and 25.9 s; in the assembly pass at 0, 3, 9.5, 13.5, 15.9, 18.2, 20.9, 22.5 and 25.97 s;
- 08b at 0.0, 1.5, 3.0, 6.5, 10.55, 10.68, 10.8, 19.6, 19.72, 19.8, 23.5 and 26.9 s; in the assembly pass at 0, 4.6, 5.5, 6.45, 6.8, 8.0, 15, 19.8, 22.5 and 26.97 s;
- 08c at 0.0, 1.5, 3.0, 5.4, 13.5, 15.8, 17.6 and 21.4 s; in the assembly pass at 0, 2, 5.5, 9.5, 13.5, 15.8, 18, 20.7 and 21.47 s.

The counters read as the check predicts on both sides of each tested landing, for example 1,391 → 1,402 across 10.63 s and 29,971 → 30,053 across 19.67 s.

**Web searches used:** 14 in the first draft (log at the end) and 1 in the first revision (the Costco frank and soda change, for the "same hot dog" fix). Hook pass 2 added no new facts: every new number is arithmetic on the sourced inputs.
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
| Look | Scoreboard | Becker Rig | Clean Sheet |
| Platform title | What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House | At $15/hr, You Work for Rent From the 1st Until… | Community? In-State? Private? Your Year of College in Big Macs |
| On-screen header (t = 0) | WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE | At **$15/hr**, you work for rent / from the 1st to the ___ | Community? In-state? / Out-of-state? Private? / Your year in **Big Macs** |
| Words in hook | 13 | 11 | 9 |
| Unit (footer or unit row) | $1.50 hot dog + soda, the same price since 1985 | $13.10, the ≈ $13.10 you keep per $15 hour | $6.22 Big Mac (The Economist, Jul 2026) |
| Frame 1 | Hero "1" and one hot dog landing at 0.2 s, label "$1.50 / YOUR HOT DOG + SODA" | The figure beside the $1,531 rent coin, HUD "$1,531 ÷ $13.10 = / ? hours of work" | Row ① already answered (≈ 667), circles ②③④ waiting |
| Rungs | 4: membership → iPhone 18 Pro → house 1985 → house Aug 2026 | 4: rent month → rent year → new car → new house | 4: community college → in-state → out-of-state → private (1 year of tuition & fees each) |
| First count lands | 2.98 s (≈ 43) | 2.10 s (≈ 117) | pre-filled at 0.0 (≈ 667) |
| Twist | The hot dog never rose. Had it risen like a new house: **≈ $7.01** | Rent takes every hour you work from the 1st to **≈ the 20th** | One private year is **≈ 10.8×** a community-college year |
| Runtime | 26.0 s | 27.0 s | 21.5 s |
| VO words (checker estimate) | 57 | 59 | 47 |
| Verdict | Rose like a house? / A **≈ $7.01** hot dog. | **≈ 14 years** of full-time work. / Every cent you keep. | Private vs community college: / **≈ 10.8×** the Big Macs. |
| Hook score (two blind judges, hook pass 2: current → adopted) | 4.5 → **6.0** | 5.75 → **7.0** | 5.25 → **6.5** |

**Topic choices, and why**
- **08a keeps the hot dog and turns its frozen price into the stake.**
  - HD Guy's hot-dog short flopped (80,139, 1.44x) when the hot dog was just another cheap unit over military footage.
  - Ours starts from the fact that makes the Costco hot dog famous: **$1.50 in 1985, still $1.50**. The header asks what the viewer's own $1.50 hot dog would cost had it risen like a new house, and the ladder answers it.
  - The verdict is one repeatable price: $1.50 × ($393,700 ÷ $84,300) = **≈ $7.01**.
  - The new-car rung was dropped in the first revision because 08b uses the same car.
- **08b turns the wage into the ruler for the three biggest bills** (rent, a car, a house).
  - The hook puts rent on the viewer's own calendar. Rent takes ≈ 117 of a month's ≈ 173 work hours, so you work for rent from the 1st to **≈ the 20th**.
  - Take-home pay is lane 1's subject, so it lives only in the footer and the "÷ $13.10" working, never in a spoken beat.
- **08c uses the Big Mac, not the brief's $6 latte.** Three reasons:
  1. No primary source publishes a US latte price. Format 6's writer searched and found only one dataset (FinanceBuzz: grande latte $4.45 in 2024), with no second source, so "$6" could not be verified.
  2. The Big Mac has a primary, dated price: **$6.22**, The Economist's Big Mac index, July 2026.
  3. It is a proven HD Guy unit (1,748,759 views, 56.76x). Lattes and the latte factor also already belong to 06c (Starbucks).
  - In hook pass 2 the ladder became four like-for-like rows (one year of published tuition & fees each), all named in the header. The full-budget "4 years with housing & food" row moved to the pinned comment.
- **No rung is shared between the three teasers** except the median new house, which appears in 08a (in hot dogs, 1985 vs 2026) and in 08b (in hours of work), where it is used for different points.

---

## 08a · Scoreboard · "What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House"

**Spec:** `studio/specs/08a-scoreboard-costco-hot-dogs.json` · **26.0 s** · captions on · lints clean · rendered in the Scoreboard kit (stills listed at the top)

**Platform title:** What Your $1.50 Costco Hot Dog Would Cost If It Rose Like a House
**On-screen hook (header):** WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE
**Footer (t = 0):** Hot dog + soda: $1.50 in 1985. Still $1.50.
**Unit intro label (t = 0):** $1.50 / YOUR HOT DOG + SODA

### Why this hook

**Modelled on:**
1. **H45 and H44, @investment_timeline.** "POV: You invested in Monster instead of paying $3/day for a Monster Energy", **1.5M (140.6x)**, https://www.tiktok.com/@investment_timeline/video/7671760671867997473. "…instead of paying $50 for a pair of Crocs", **1.9M (117.9x)**, https://www.tiktok.com/@investment_timeline/video/7676037874105519393. The viewer's own small, repeat purchase is the stake, and the answer is a counterfactual price.
2. **H48 and H49, The Debt Freedom Project.** A question on screen, answered by a verdict caption: "What difference does…", **1,900,000 (902.5x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637. "Yes, daily payments work!", **382,100 (289.1x)**, https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133. A tiny, honest verdict travels (R12). Ours: "Rose like a house? A ≈ $7.01 hot dog."
3. **H01 and H04, HD Guy.** "Cost in Units of RTX 5090", 30,617,461 (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw, and "Cost in Units of Starbucks Lattes", 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. The unit-price footer ("Tall Latte ☕ = $4.45") becomes ours: "Hot dog + soda: $1.50 in 1985. Still $1.50."
- **Contrast we design against: H13, HD Guy, "Costco Hotdog Combos", 80,139 (1.44x).** The same unit with no reason for it. Ours makes the frozen price the stake and asks a question only the ladder can answer.

**Frame 1 is one subject.** For the whole first 1.5 s the header, the hero "1" with its hot-dog icon, the big hot dog dropping in (it lands with a squash and a pop at 0.2 s), the label "$1.50 / YOUR HOT DOG + SODA" and the voice ("Your $1.50 hot dog, since 1985.") are all about the same $1.50 purchase. The kit draws this as its built unit intro, because rung 1 starts after 0.5 s. Round 1's frame 1 was split three ways: house in the header, membership on the counter and frozen price in the voice.

**Rules:**
- **R1 (pass):** "$1.50" is in the header, the footer and the label at 0.0 s, and the hero reads "1" (one hot dog).
- **R2 (pass):** one $ figure in the hook line, the input. The result (≈ $7.01) appears only at the payoff (20.2 s): the hero rolls up to it and the verdict states it.
- **R3 (pass):** the $1.50 is a price most viewers have paid, labelled "YOUR HOT DOG + SODA". Rung 1 (the $65 membership) fits members only.
- **R4 (pass):** $1.50 is small, round and familiar. The unit is still the benchmark's flop (H13), and the judges docked it.
- **R6 (pass):** you, the $1.50, and 1985 → 2026.
- **R8 (pass):** 13 words on 2 lines.
- **R10 (pass):** the unit lands at 0.2 s and the first count (≈ 43) at 2.98 s. The biggest count is the last rung (≈ 262,467 at 18.02 s), and the answer (≈ $7.01) is the last number the hero lands on (21.80 s).
- **R11 (pass):** the header is a question, and the verdict answers it.
- **R12 (pass):** "a ≈ $7.01 hot dog" is one repeatable number.
- **R5 (partial):** the header implies that prices "just rose together". The ladder shows the house rising ≈ 4.7× in the one ruler that never moved. Both judges called this belief weak.
- **R9 (partial):** one open question, answered only at 20.2 s, and 4 unlabelled rung pips. It is not a countable loop.

**The wrong belief it plays on:** "Everything went up together."
- Costco never raised the hot dog. A median new house went from **56,200 hot dogs in 1985** to **≈ 262,467 in August 2026**: **≈ 4.7×** the hot dogs.
- Had the hot dog risen like the house, it would cost **≈ $7.01** today ($1.50 × 4.6702 = $7.0053). Equivalently, the 2026 house divided over 1985's 56,200 hot dogs is $393,700 ÷ 56,200 = $7.0053 each.
- These are sticker prices, not inflation-adjusted, and the caption and pinned comment say so.

### Beat sheet

Counter landing times are the Scoreboard kit's own (reproduced by the check). Line 1 of each label is "cost ÷ $1.50", and line 2 is the item.

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "WHAT YOUR **$1.50** HOT DOG WOULD / COST IF IT ROSE LIKE A HOUSE"; footer; hero "1" beside the hot-dog icon; one big hot dog mid-fall; label "$1.50 / YOUR HOT DOG + SODA"; 4 rung pips | "Your **$1.50** hot dog, since 1985." |
| 0.2 | The hot dog lands (squash + pop) | |
| 1.5 | Cut (thud). Label "$65 ÷ $1.50 / YOUR COSTCO MEMBERSHIP" slams in; the pile re-packs and the counter rolls from 1 | (same line) |
| 2.98 | Counter lands **≈ 43** (ding); 43 dogs stacked | |
| 3.7 | Hold on the pile and "≈ 43" | "Your Costco card? **≈ 43** of them." |
| 7.4 | Cut. "$1,199 ÷ $1.50 / AN IPHONE 18 PRO"; the pile re-packs and the counter rolls | "An iPhone 18 Pro? **≈ 799**." |
| 9.30 | Counter lands **≈ 799** | |
| 11.0 | Cut. "$84,300 ÷ $1.50 / A MEDIAN NEW HOUSE, 1985"; the pile turns into an LED-dot wall | "A new house in 1985? **56,200**." |
| 13.32 | Counter lands **56,200**; the dot wall fills the stage (one dot ≈ 12 hot dogs) | |
| 15.2 | Cut + riser. "$393,700 ÷ $1.50 / A MEDIAN NEW HOUSE, AUG 2026". The 1985 wall pulls back into a mound of ≈ 21% of the stage (the real ratio: 56,200 ÷ 262,467 = 21.4%), then the new dots rain in around it at the same scale | "And a new house in 2026? **≈ 262,000**." |
| 18.02 | Counter lands **≈ 262,467** (hit + cash); the dot wall fills the stage edge to edge | |
| 20.2 | Verdict slams in, 2 lines: "Rose like a house? / A **≈ $7.01** hot dog." (ding). The hero cuts to "$1.50" and rolls up; the wall dims behind it | "Rose like a house? A **≈ $7.01** hot dog." |
| 21.80 | The hero lands **≈ $7.01** beside the hot-dog icon (hit + cash, glow, floor bloom) | |
| 24.9-26.0 | Hold, then a hard cut back to frame 1 (loop) | (none) |

**Why rung 1 cuts at 1.5 s, while the opener line is still playing.**
- The judged candidate cut at 2.0 s, which lands the first count at 3.48 s. Cutting at 1.5 s lands it at 2.98 s (R10) and leaves the first 1.5 s unchanged.
- The membership rolls silently under the end of the opener ("…since 1985"). Its own line follows at 3.7 s, after the count has landed, so the voice confirms a number that is already on screen.

### Guide VO script (6 lines, about 57 spoken words, 21.9 s of speech in a 26 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 3.5 | Your **$1.50** hot dog, since 1985. | "Your dollar-fifty hot dog, since nineteen eighty-five." |
| 3.7 | 3.0 | Your Costco card? **≈ 43** of them. | "Your Costco card? About forty-three of them." |
| 7.4 | 3.2 | An iPhone 18 Pro? **≈ 799**. | "An iPhone 18 Pro? About seven hundred ninety-nine." |
| 11.0 | 3.9 | A new house in 1985? **56,200**. | "A new house in nineteen eighty-five? Fifty-six thousand two hundred." |
| 15.2 | 4.7 | And a new house in 2026? **≈ 262,000**. | "And a new house in twenty twenty-six? About two hundred sixty-two thousand." |
| 20.2 | 4.7 | Rose like a house? A **≈ $7.01** hot dog. | "Rose like a house? About a seven-oh-one hot dog." |

### The maths

**Rule:** count = cost ÷ $1.50, shown to the nearest whole hot dog, with "≈" unless the division is exact. The VO rounds for speech: exact if whole; below 1,000 to the unit; 1,000-9,999 to the 100; 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Your Costco membership | $65 ÷ $1.50 | 43.3333 | ≈ 43 | ≈ 43 |
| An iPhone 18 Pro | $1,199 ÷ $1.50 | 799.3333 | ≈ 799 | ≈ 799 |
| A median new house, 1985 | $84,300 ÷ $1.50 | 56,200 (exact) | 56,200 | 56,200 |
| A median new house, Aug 2026 | $393,700 ÷ $1.50 | 262,466.6667 | ≈ 262,467 | ≈ 262,000 |
| House ratio (not shown; drives the verdict) | $393,700 ÷ $84,300 | 4.670225 | ≈ 4.7× | (not spoken) |
| **Verdict: the hot dog risen like a house** | $1.50 × 4.670225 | 7.005338 | **≈ $7.01** | ≈ $7.01 |

- The ratio is the same in hot dogs and in dollars (262,466.67 ÷ 56,200 = 4.6702), because the unit price never moved. The check asserts this.
- The verdict also equals $393,700 ÷ 56,200 = $7.005338: what each of 1985's 56,200 hot dogs would have to cost to buy the August 2026 house. The check asserts both forms.
- **Captions are rounded on purpose.** The caption shows the spoken figure (≈ 262,000) while the hero counter shows the exact count (≈ 262,467). The screen is the working and the voice is the takeaway, as the format research recommends: "$143K ÷ ~$4.50 ≈ 32,000 lattes. The screen shows 32,168" (04-formats, rank 8). The same rule holds in 08b and 08c.
- The 1985 and 2026 house piles both fill the stage (the kit packs icons down to a 5 px cell), so the counters carry the ≈ 4.7× and the verdict carries the ≈ $7.01.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| Costco hot dog + soda, same price since 1985 | $1.50 | 13 ABC (WTVG/Gray), "Costco's iconic $1.50 hot dog combo debuts new change for the first time in decades", **2026-04-29**. The combo now offers a 20 oz soda or bottled water, still $1.50. https://www.13abc.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/ | NPR via HPPR, "Costco hot dogs have cost $1.50 since the 1980s. Here's why prices aren't changing", **2024-06-04**. https://www.hppr.org/2024-06-04/costco-hot-dogs-have-cost-1-50-since-the-1980s-heres-why-prices-arent-changing. Also Scripps News (CEO Ron Vachris: "will not change as long as I'm around"; date not captured): https://www.scrippsnews.com/business/company-news/costcos-1-50-hot-dog-combo-faces-inflation-the-ceos-answer |
| What changed while the price did not (wording only; not on screen) | Hebrew National → Kirkland Signature franks in 2009; 12 oz can → 20 oz fountain drink | Food Republic, "Why Costco's Food Court Stopped Selling Hebrew National Hot Dogs". https://www.foodrepublic.com/2135138/costco-food-court-hebrew-national-hot-dogs | The verifier's own check (same facts). This is why nothing on screen says "same hot dog". |
| Costco Gold Star membership, from 2024-09-01 | $65 a year | Axios, "Costco membership fees increase Sunday: What to know", **2024-08-31**. https://www.axios.com/2024/08/31/costco-membership-cost-increase-2024-renewal-price | Disney Food Blog, **2024-07-11** (on Costco's 2024-07-10 announcement; first increase since 2017). https://disneyfoodblog.com/2024/07/11/costco-is-raising-membership-prices-how-much-more-will-you-be-paying. 2026 coverage (search 1) still describes the 2024 rise to $65 as the latest. |
| iPhone 18 Pro, US starting price (announced 2026-09-09) | $1,199 | MacRumors, "iPhone 18 Pro Starts at $1,199, Pro Max at $1,299", **2026-09-09**. https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/ | Appleosophy, "Pre-orders for the iPhone 18 Pro series are now live", **2026-09-12**. https://appleosophy.com/2026/09/12/pre-orders-for-the-iphone-18-pro-series-are-now-live/ |
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
> (Costco $65 Gold Star; iPhone 18 Pro $1,199; Census median new house $84,300 in 1985 and $393,700 in Aug 2026. Sticker prices, not inflation-adjusted. Maths, not advice.)
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
  - Cover: the verdict "Rose like a house? A ≈ $7.01 hot dog." over the full stage.
  - Caption line 1: "Costco never raised the $1.50. If it had risen like a new house: ≈ $7.01."
- **TikTok:**
  - VO cut.
  - Caption line 1 is the same, and it asks "what next?" at the end.
  - The tribe is Costco fans: #costco #costcofinds.

---

## 08b · Becker Rig · "At $15/hr, You Work for Rent From the 1st Until…"

**Spec:** `studio/specs/08b-becker-rig-hours-at-15.json` · **27.0 s** · captions on · lints clean · rendered in the built Becker Rig `unit-ladder` (stills listed at the top)

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
- **"Scale is shown by the camera":** each new pile pushes the camera back until the whole row, cheap to huge, is in frame.
- **The finale:** the last count lands on a gold plate with the impact kit; he jumps, then slumps. A recap table then names every pile (`pileLabels`, so the two rent piles read "Median rent, 1 month" and "Median rent, 1 year").

**Rules:**
- **R1 (pass):** "$15/hr" is in the header and "≈ $13.10" in the footer at 0.0 s. The HUD reads "Median rent, 1 month / $1,531 ÷ $13.10 = / ? hours of work", beside the gold $1,531 coin.
- **R2 (pass):** one $ figure in the hook line, the input.
- **R4 (pass):** $15 an hour is small and round, and many viewers earn it.
- **R5 (pass):** the blank invites the guess "rent is about a week of work". The answer is ≈ the 20th: ≈ 2 of every 3 hours you work.
- **R6 (pass):** you, $15 an hour, your rent and this month, starting on the 1st.
- **R8 (pass):** 11 words on 2 lines.
- **R9 (pass):** exactly one visible blank to fill ("___").
- **R10 (pass):** ≈ 117 lands at 2.10 s and is spoken at 2.31 s. The header's blank fills on screen at 6.40 s, as the voice says it (6.52 s). The biggest number is last.
- **R11 (pass):** one question, the blank.
- **R12 (pass):** "≈ the 20th" and "≈ 14 years of full-time work".
- **R3 (partial):** one wage, and the rent is the Census median, not yours. The pinned comment gives the rule for your own rent and wage.
- **The blank is answered on screen:** from 4.7 s the header's "___" ticks up through the days (1st, 2nd, … in grey), and at 6.40 s it lands on **≈ 20th** in green with a green rule and a ding, while the figure points up at it (`lookOpts.blank`). The header then reads "from the 1st to the ≈ 20th" for the rest of the video. Frame 1 shows both the "___" and the "? hours".

**The wrong beliefs it plays on:**
1. "Rent is about a week of work." At the median asking rent it is ≈ 117 hours, which is 67.4% of a full-time month's 173.33 hours (≈ 2 of every 3). Laid on the calendar from rent day, that is the 1st to **≈ the 20th**.
2. "At $15 an hour, a thing costs price ÷ 15 hours." You keep ≈ $13.10, so every count is ≈ 14.5% bigger than the gross-wage guess (15 ÷ 13.10 = 1.145). The footer and the "÷ $13.10" working show this; it is not spoken.

### Beat sheet

Times are the built Becker Rig kit's own (reproduced by the check). Each rung: a gold coin drops in (thud), he winds up and punches it, the units fill and the count lands.

| t (s) | On screen (Becker Rig) | VO (caption) |
|---|---|---|
| 0.0 | Header with the blank; footer; HUD "Median rent, 1 month / $1,531 ÷ $13.10 = / ? hours of work"; the figure beside the gold $1,531 coin | "$15 an hour? Median rent: **≈ 117 hours**." |
| 0.45 | He punches the coin (hit + shake); hour icons arc into a pyramid and the counter rolls | |
| 2.10 | Counter lands **117**; "=" turns to "≈" | |
| 4.6 | Hold on the 117-hour pile | "Every hour you work, to **≈ the 20th**." |
| 4.7 | The header's blank hands over to a rule sized for the answer, and the days tick up on it: 1st, 2nd, 3rd, … (grey) | |
| 6.40 | It lands on **≈ 20th** (green, pop, ding); the rule turns green and he points up at it | |
| 8.4 | Cut: HUD "Median rent, 1 year / $18,372 ÷ $13.10 = / ?"; a new coin drops; punch at 9.32 | |
| 9.1 | | "A year of rent? **≈ 1,400 hours**." |
| 10.63 | Counter lands **1,402**; the camera pulls back to show both piles | |
| 12.6 | Cut: "An average new car / $50,089 ÷ $13.10 ="; punch at 13.52 | |
| 13.3 | | "An average new car? **≈ 3,800 hours**." |
| 14.83 | Counter lands **3,824** | |
| 16.8 | Cut: "A median new house / $393,700 ÷ $13.10 ="; punch at 17.72 | |
| 18.2 | | "A median new house? **≈ 30,000 hours**." |
| 19.67 | Counter lands **30,053** on the gold plate (hit, shake, flash); he jumps, then slumps | |
| 21.5 | Verdict: "**≈ 14 years** of full-time work. / Every cent you keep." Then the recap table: ≈ 30,053 Median new house · ≈ 3,824 Average new car · ≈ 1,402 Median rent, 1 year · ≈ 117 Median rent, 1 month | "That's **≈ 14 years** of full-time work. Every cent you keep." |
| 26.2-27.0 | Hold (loop) | (none) |

**Why each later VO line starts after its cut.** The built kit punches 0.92 s after a cut and fills for 1.26 s (1.9 s on the house). So each line starts 0.7-1.4 s after its cut, and the voice says the number as the count lands: 10.64 / 14.84 / 19.74 s against landings at 10.63 / 14.83 / 19.67 s. The HUD names the item at the cut, and the voice names it while the coin drops.

### Guide VO script (6 lines, about 59 spoken words, 22.7 s of speech in a 27 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | $15 an hour? Median rent: **≈ 117 hours**. | "Fifteen dollars an hour? Median rent: about a hundred seventeen hours." |
| 4.6 | 3.7 | Every hour you work, to **≈ the 20th**. | "Every hour you work, to about the twentieth." |
| 9.1 | 3.9 | A year of rent? **≈ 1,400 hours**. | "A year of rent? About fourteen hundred hours." |
| 13.3 | 3.9 | An average new car? **≈ 3,800 hours**. | "An average new car? About thirty-eight hundred hours." |
| 18.2 | 3.2 | A median new house? **≈ 30,000 hours**. | "A median new house? About thirty thousand hours." |
| 21.5 | 4.7 | That's **≈ 14 years** of full-time work. Every cent you keep. | "That's about fourteen years of full-time work. Every cent you keep." |

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
  - Cover: the 117-hour pile with the header's blank above it.
  - Caption line 1 is the same.
- **YouTube Shorts:**
  - Title "At $15/hr, You Work for Rent From the 1st Until…". It holds the answer back for the video.
  - No CTA; the video loops.

---

## 08c · Clean Sheet · "Community? In-State? Private? Your Year of College in Big Macs"

**Spec:** `studio/specs/08c-clean-sheet-college-in-big-macs.json` · **21.5 s** · captions on · lints clean · rendered in the Clean Sheet kit (stills listed at the top)

**Platform title:** Community? In-State? Private? Your Year of College in Big Macs
**On-screen hook (header):** Community? In-state? / Out-of-state? Private? / Your year in **Big Macs**
**Footer (t = 0):** 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: published tuition & fees

### Why this hook

**Modelled on:**
1. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. A row for every viewer, with the first row landing at 0 s. Ours names every row in the header, because the built kit hides a waiting row's label until it opens.
2. **H32, FinCalC TV, "Monthly Income using Post Office MIS Scheme…"**: 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. The answer is already on screen at 0.0. Ours pre-fills row ①.
3. **H11, HD Guy, "Cost in Units of Big Macs"**: 1,748,759 views (56.76x), https://www.youtube.com/shorts/Hv6aZR4hUEI. The same unit, already proven.
- **Contrast:** HD Guy's "University Degrees" *as the unit* got 64,954. We use college as the subject and a cheap, familiar unit as the ruler.

**Frame 1 has a row for every viewer** (checked in the 0.0 s still), all drawn by the built kit:
- the 3-line header names all four options;
- the unit row reads "🍔 1 Big Mac = $6.22";
- row ① is already answered: "Community college, 1 year / $4,150 ÷ $6.22 =" with **≈ 667** in its green box and its icon grid. That is the kit's pre-fill for a rung whose result starts before frame 1;
- the empty numbered circles ②③④ wait under it, one for each option still to come.

**Rules:**
- **R1 (pass):** at 0.0 s the sheet shows "$4,150 ÷ $6.22 = ≈ 667" and the unit row "1 Big Mac = $6.22". "$6.22" is also in the footer.
- **R2 (pass):** no $ figure in the header.
- **R3 (pass):** community college, in-state, out-of-state and private each get a row, named in the header.
- **R7 (pass):** all four options are named before any maths.
- **R8 (pass):** 9 words on 3 lines.
- **R9 (pass):** the circles ②③④ count the three rows to go.
- **R10 (pass):** the first answer is on screen at 0.0. The biggest number is last (≈ 7,235 at 13.36 s).
- **R12 (pass):** "≈ 10.8× the Big Macs".
- **R4 (partial):** the Big Mac is a proven, familiar unit, but most viewers are not paying for a year of college right now ("your year").
- **R5 (miss):** nothing is attacked. Community < in-state < out-of-state < private is the order viewers expect, and only the size of the gap (≈ 10.8×) surprises. Both judges docked it.
- **R11 (partial):** four questions stacked in a 3-line header are slower to read than H64's 6 words.

**What it plays on:** the size of the gap, not the order. Viewers know private costs more than community college. Few would guess that one private year of tuition and fees buys ≈ 10.8 community-college years.

### Beat sheet

Times are the Clean Sheet kit's own (reproduced by the check). Each step types "cost ÷ $6.22 =", wipes a highlighter in and runs the count up on it (`countSpeed` 0.5). A finished step files into a sheet row when the next one opens.

| t (s) | On screen (Clean Sheet) | VO (caption) |
|---|---|---|
| 0.0 | Page; header; footer; unit row "🍔 1 Big Mac = $6.22"; ① "Community college, 1 year / $4,150 ÷ $6.22 =" already answered **≈ 667** with its icon grid; empty circles ②③④ | "Community college? **≈ 667 Big Macs**." |
| 2.9-3.3 | ① files into its row ("1 year $4,150 ······ ≈ 667"); ② rises into place | |
| 3.6 | ② "State school, in-state, 1 year": "$11,950 ÷ $6.22 =" → **≈ 1,921** (5.29) | "A state school, in-state? **≈ 1,900**." |
| 7.6 | ③ "State school, out-of-state, 1 year": "$31,880 ÷ $6.22 =" → **≈ 5,125** (9.34) | "The same school, out-of-state? **≈ 5,100**." |
| 11.6 | ④ "Private college, 1 year": "$45,000 ÷ $6.22 =" → blue final box **≈ 7,235** (13.36), with its icon field | "A private college, 1 year? **≈ 7,200**." |
| 14.0-15.67 | The check line types under it: "check: $45,000 ÷ $4,150 ≈ 10.8" | |
| 16.2 | Verdict: "Private vs community college: / **≈ 10.8×** the Big Macs." (ding) | "Private vs community: **≈ 10.8×** the Big Macs." |
| 20.8-21.5 | The finished sheet clears back to the frame-1 state (loop) | (none) |

### Guide VO script (5 lines, about 47 spoken words, 18.1 s of speech in a 21.5 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 3.3 | Community college? **≈ 667 Big Macs**. | "Community college? About six hundred sixty-seven Big Macs." |
| 3.6 | 3.7 | A state school, in-state? **≈ 1,900**. | "A state school, in-state? About nineteen hundred." |
| 7.6 | 3.7 | The same school, out-of-state? **≈ 5,100**. | "The same school, out-of-state? About fifty-one hundred." |
| 11.6 | 3.9 | A private college, 1 year? **≈ 7,200**. | "A private college, one year? About seventy-two hundred." |
| 16.2 | 4.3 | Private vs community: **≈ 10.8×** the Big Macs. | "Private versus community: about ten point eight times the Big Macs." |

### The maths

**Rule:** Big Macs = cost ÷ $6.22, to the nearest whole Big Mac, with "≈". The VO rounds for speech: below 1,000 to the unit, 1,000-9,999 to the 100, 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Community college, 1 year | $4,150 ÷ $6.22 | 667.203 | ≈ 667 | ≈ 667 |
| State school, in-state, 1 year | $11,950 ÷ $6.22 | 1,921.222 | ≈ 1,921 | ≈ 1,900 |
| State school, out-of-state, 1 year | $31,880 ÷ $6.22 | 5,125.402 | ≈ 5,125 | ≈ 5,100 |
| Private college, 1 year | $45,000 ÷ $6.22 | 7,234.727 | ≈ 7,235 | ≈ 7,200 |
| Check / verdict | $45,000 ÷ $4,150 | 10.8434 | ≈ 10.8× | ≈ 10.8× |

- The ratio is the same in Big Macs (7,234.727 ÷ 667.203 = 10.8434), because both rows divide by the same $6.22. The check asserts this.
- **Pinned-comment numbers** (checked):
  - College Board's full private budget (tuition, fees, housing, food, books, transport, other) is **$65,470** a year. 4 years is 4 × $65,470 = **$261,880** ÷ $6.22 = 42,102.894, so **≈ 42,103** Big Macs. ÷ 365 = 115.35, so a Big Mac a day for **≈ 115 years**.
  - 4 years in-state, full budget: 4 × $30,990 = **$123,960**, which is **≈ 19,929** Big Macs.
  - Write-up only: four years of private tuition and fees alone come to 4 × $45,000 ÷ $6.22 = 28,938.9, so **≈ 28,939** Big Macs.
- Captions are rounded on purpose (see 08a's maths).

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| US Big Mac price, July 2026 | $6.22 | **The Economist, Big Mac index dataset** (GitHub `TheEconomist/big-mac-data`, `output-data/big-mac-raw-index.csv`, row `2026-07-01, USA, 6.22`; downloaded 2026-10-07). https://github.com/TheEconomist/big-mac-data. The same file has $6.12 for Jan 2026 and $6.01 for Jul 2025. | Econlife, "Big Mac index", **July 2026**. https://econlife.com/2026/07/big-mac-index-3/. Also TrendForce DataTrack, "The Big Mac index: United States". https://datatrack.trendforce.com/Chart/content/4204/the-big-mac-index-united-states |
| 2025-26 average published tuition & fees: public two-year in-district $4,150; public four-year in-state $11,950; out-of-state $31,880; private nonprofit four-year $45,000 | | College Board, *Trends in College Pricing and Student Aid 2025* (2025-26 prices; exact release date not captured). https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf and its newsroom release https://newsroom.collegeboard.org/trends-college-pricing-and-student-aid-report-published-tuition-prices-public-institutions-and | Achievable, "2025 Trends in College Costs and Aid" (an independent summary of the same report). https://achievable.me/exams/sat/resources/2025-trends-in-college-costs-and-aid/ |
| 2025-26 average total budget, private nonprofit four-year (tuition, fees, housing, food, books, transport, other) | $65,470; public in-state $30,990 (both in the pinned comment only) | as above | as above |

- **Verification note:** collegeboard.org is blocked by the egress proxy, so the College Board figures come from search-result text that quotes the report, plus one independent summary. The verifier confirmed all six figures independently.
- The "budget" figures are College Board's estimated full-time undergraduate budgets. Since hook pass 2 they appear only in the pinned comment, which names the basis ("with housing, food and books"); every on-screen row is published tuition & fees.

### Assumptions (footer, on screen at t = 0)

> 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: published tuition & fees

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
  - No CTA; the loop clears the sheet back to frame 1.
- **Instagram Reels:**
  - Cover: the finished sheet (four rows filed, blue final box). The sheet is the screenshot people save.
  - Caption line 1: "Community, in-state, out-of-state or private: which row is yours?"
  - Tag the back-to-school and #studentloans crowd.
- **TikTok:**
  - VO cut, captions on.
  - Caption line 1 is the same.
  - Comments will argue about net price against sticker price, and the pinned comment invites exactly that.

---

## Kit notes (for the look builders)

As of hook pass 2, all three kits' `unit-ladder` formats are built, and every spec uses only keys its kit reads.

- **Scoreboard (08a), built.**
  - The spec uses `data.unit.label` ("Your hot dog + soda") for the built unit intro, `lookOpts.climaxFill` and `lookOpts.payoff` {t 20.2, from "$1.50", display "≈ $7.01"} (added in the assembly pass: at the verdict the hero cuts to the unit price and rolls up to the answer, so the payoff lands last in the hero, the kit's rule).
  - Round 1's two requests are dropped. `lookOpts.bigUnit` (1 block = 1,000 hot dogs) and `lookOpts.slots` ("1985: ?" / "2026: ?") were never read by the kit.
  - Overflow rungs (assembly pass, in the format): a rung too big for the pile at its density used to fill the stage just like the climax, so the 1985 and 2026 houses looked the same. Now, from the first such rung on, every LED dot stands for the same number of units as in the climax wall (≈ 12.2 hot dogs a dot here). The 1985 wall fills the stage with 9.6 px dots, and the 2026 rung re-packs it into 21.3% of the stage (4,590 of 21,528 cells; the real ratio is 21.4%) before its own dots rain in. The pile now shows the ≈ 4.7× gap.
  - The 2-line verdict fits clear of the stage (21.6 s still).
- **Becker Rig (08b), built.** The format is no longer a stub.
  - It reads `figure`, `figureScale`, `unitLabel` / `unitLabelOne`, `intro`, `iconSize`, `plate`, `pileLabels` and `blank`. The spec uses `pileLabels`, so the recap table tells the two rent piles apart (without it, both shorten to "Median rent"), and `blank` {t 4.7, d 1.7, text "≈ 20th"} (added in the assembly pass), which writes the hook's answer into the header's "___".
  - The first draft's staging keys (`opener` TAX snip, `facedown`, `actions`, `gag`, `stage`, `inputProp`) were never read and are removed. So are the pop and thud SFX cued for them. The kit cues its own hit, pop and roll.
  - The check replays the kit's per-rung schedule: lead = 0.22 × gap (0.45-0.92 s), punch, then a fill of 0.3 × gap (0.5-1.6 s), or 1.9 s on the last rung.
- **Clean Sheet (08c), built.**
  - It reads `unitRow`, `countSpeed`, `check` and `checkT`.
  - It draws every waiting rung's numbered circle from frame 1, with the labels hidden. The request `preview: "labels"` is dropped (never read), and the header names the rows instead.
  - A rung whose result would start by frame 1 (here t = −1.0) is pre-filled: on frame 1 it already shows its count and icon grid.
  - A count that overlaps a VO line lands by 60% of that line. The check replays all three rules.

## Search log (14 in the first draft + 1 in revision)

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

**Direct data download (not a search):** The Economist's `big-mac-data` repository on GitHub, for the $6.22 row. Every other host was blocked to direct fetches.

## Caveats

- **P8 has one benchmark channel (HD Guy), and its spectacle is military footage.** Nothing in the benchmark shows that a personal-finance subject works in this format, so all three teasers test that hypothesis. The strongest hedges are 08b's calendar blank (a date answer, R12) and 08c's row-per-viewer frame (R3, from the P7 winners).
- **08a's unit is the benchmark's own flop (H13).** The bet is that the frozen price makes it a ruler rather than a novelty. If 08a underperforms the other two, the unit is the first suspect.
- **08a's twist is about sticker prices.** The ≈ $7.01 is a sticker-to-sticker counterfactual (the house rose ≈ 4.7× in nominal dollars). It is honest as stated, and the caption and pinned comment say so. Expect "inflation!" comments; those are engagement, not an error.
- **08a's open loop is one question, answered at 20.2 s.** The first count (the membership, ≈ 43 at 2.98 s) is a ladder step, not the answer. Both judges noted this.
- **08b's blank is filled with the median, not the viewer's rent.** Since the assembly pass the header's "___" fills in on screen (≈ 20th at 6.40 s), but the rent is the Census median, not the viewer's.
- **08c attacks no wrong belief.** The order of the rows is what viewers expect; only the ≈ 10.8× gap surprises.
- **Single-publisher figures:**
  - The rent ($1,531) is a Census figure, cross-checked only against the same series' previous quarter (and by the verifier).
  - The College Board figures could not be opened at the source. They were read from search text plus one independent summary, then confirmed by the verifier.
- **The VO word counts are estimates** (2.6 words/s; years read as two words, money with cents as three). The tightest lines are 08a's opener (3.46 s for 3.5 s), 08c's verdict (4.23 s for 4.3 s) and 08b's opener (4.23 s for 4.3 s).

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
