# 08 · Unit ladder ("Cost in units of X"): three teasers

**Format:** `unit-ladder` (rank 8 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P8**)
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews; see the [Review log](#review-log))
**Specs:**
- [`studio/specs/08a-scoreboard-costco-hot-dogs.json`](../../studio/specs/08a-scoreboard-costco-hot-dogs.json) (file name kept; the hook is now "A new house, 1985 vs 2026, in $1.50 Costco hot dogs")
- [`studio/specs/08b-becker-rig-hours-at-15.json`](../../studio/specs/08b-becker-rig-hours-at-15.json)
- [`studio/specs/08c-clean-sheet-college-in-big-macs.json`](../../studio/specs/08c-clean-sheet-college-in-big-macs.json)

**Maths check:** [`checks/08-unit-ladder.py`](checks/08-unit-ladder.py).
- It recomputes every on-screen number from the sourced inputs, in exact fractions, and rebuilds every display string and VO line from those numbers. Then it compares them with the three specs, leaf by leaf.
- 08b divides by the **defined unit $13.10** (the kept hourly rounded to the cent), the same operand the screen shows in "÷ $13.10".
- Timing:
  - every VO line fits 2.6 words/s;
  - no VO lines overlap;
  - each rung starts on the VO line that names it;
  - the first count lands within 3 s (R10).
- It replays two built kits' own timing rules:
  - **Scoreboard (08a):** the counter-roll rules in `looks/scoreboard/formats/unit-ladder.js`.
  - **Clean Sheet (08c):** the type, wipe and count rules in `looks/clean-sheet/formats/unit-ladder.js`.
  - In both, the voice never says a number more than 0.5 s before its counter lands. 08c's check line is fully typed before the verdict appears.
- It also checks the contract shape, "≈" on every rounded result, and every pinned-comment number in this file.
- **Result: PASSED, all 599 checks.**
- **Mutation test:** a copy with one count changed (≈ 3,823 instead of ≈ 3,824), one VO line shortened to 3.0 s and one footer year changed (1986) fails 7 checks and exits with code 1.

**Studio linter** (`node src/cli.mjs check`): **3/3 clean, 0 errors, 0 warnings.** That covers safe zones, the type floor, overlap, contrast and the R1 hook number. I rendered stills of 08a (0.0, 0.7, 13.8, 18.5, 22.0 s) and 08c (0.0, 1.8, 18.4, 20.8, 22.0 s) and checked them by eye. 08b's kit format is still a stub, so only its header and footer render.

**Web searches used:** 14 in the first draft (log at the end) and 1 in this revision (the Costco frank and soda change, for the "same hot dog" fix).
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

**Hook grammar (P8), adapted:** HD Guy's "Cost in Units of [a cheap, familiar item]" (6 words, no number) works when the footage carries the subject. Without footage, the round-2 judge marked the literal copy weak (08a scored 4/10: its header was H13 word for word). So each header now **names what is being priced and gives one input**:
- 08a: "A NEW HOUSE, 1985 VS 2026, / IN **$1.50** COSTCO HOT DOGS"
- 08b: "Your rent, a car, a house: / hours of work at **$15/hr**"
- 08c: "Your degree, in **Big Macs**: / find your school"

All three keep HD Guy's footer device: "Tall Latte ☕ = $4.45" (H04) and "Price of RTX 5090 32GB: ~$4,899" (H01).

---

## (b) The three teasers at a glance

| | 08a | 08b | 08c |
|---|---|---|---|
| Look | Scoreboard | Becker Rig | Clean Sheet |
| Platform title | A New House in Costco Hot Dogs: 1985 vs 2026 | Your Rent, a Car, a House: In Hours of Work at $15/hr | What Your Degree Costs in Big Macs |
| On-screen header (t = 0) | A NEW HOUSE, 1985 VS 2026, / IN **$1.50** COSTCO HOT DOGS | Your rent, a car, a house: / hours of work at **$15/hr** | Your degree, in **Big Macs**: / find your school |
| Words in hook | 11 | 11 | 8 |
| Unit (footer or unit row) | $1.50 hot dog + soda, the same price since 1985 | $13.10, the ≈ $13.10 you keep per $15 hour | $6.22 Big Mac (The Economist, Jul 2026) |
| Rungs | 4: membership → iPhone 18 Pro → house 1985 → house Aug 2026 | 4: rent month → rent year → new car → new house | 5: community college → in-state → out-of-state → private → 4 yrs private with housing & food |
| First count lands | 0.61 s (≈ 43) | ≈ 2.4 s (≈ 117) | 1.63 s (≈ 667) |
| Twist | The one price that never moved: the house went 56,200 → ≈ 262,467 hot dogs | Rent takes ≈ 2 of every 3 hours you work | A row for every kind of student; the last row adds housing and food |
| Runtime | 27.0 s | 27.0 s | 27.0 s |
| VO words (checker estimate) | 61 | 59 | 61 |
| Verdict | Hot dog: still $1.50. / The house: **≈ 4.7×** the hot dogs. | **≈ 14 years** of full-time work. / Every cent you keep. | A Big Mac a day / for **≈ 115 years**. |
| Hook score (judge → after revision, my estimate) | 4 → ≈ 6 | 6 → ≈ 7 | 5 → ≈ 6.5 |

**Topic choices, and why**
- **08a keeps the hot dog, but the frozen price is now the hook, not a footnote.**
  - HD Guy's hot-dog short flopped (80,139, 1.44x) when the hot dog was just another cheap unit over military footage.
  - Ours leads with the fact that makes the Costco hot dog famous: **$1.50 in 1985, still $1.50**. That makes it the one ruler that never stretched, so the same house measured in 1985 and in 2026 is promised in the header and paid off at the end.
  - The new-car rung was dropped because 08b uses the same car.
- **08b turns the wage into the ruler for the three biggest bills** (rent, a car, a house).
  - The take-home calculation now lives in the footer and one TAX snip, not a spoken beat, because take-home pay is lane 1's subject.
  - The opener goes straight to rent: "≈ 2 of every 3 hours you work".
- **08c uses the Big Mac, not the brief's $6 latte.** Three reasons:
  1. No primary source publishes a US latte price. Format 6's writer searched and found only one dataset (FinanceBuzz: grande latte $4.45 in 2024), with no second source, so "$6" could not be verified.
  2. The Big Mac has a primary, dated price: **$6.22**, The Economist's Big Mac index, July 2026.
  3. It is a proven HD Guy unit (1,748,759 views, 56.76x). Lattes and the latte factor also already belong to 06c (Starbucks).
- **No rung is shared between the three teasers** except the median new house, which appears in 08a (in hot dogs, 1985 vs 2026) and in 08b (in hours of work), where it is used for different points.

---

## 08a · Scoreboard · "A New House in Costco Hot Dogs: 1985 vs 2026"

**Spec:** `studio/specs/08a-scoreboard-costco-hot-dogs.json` · **27.0 s** · captions on · rendered in the Scoreboard kit (stills at 0.0, 0.7, 13.8, 18.5 and 22.0 s)

**Platform title:** A New House in Costco Hot Dogs: 1985 vs 2026
**On-screen hook (header):** A NEW HOUSE, 1985 VS 2026, / IN **$1.50** COSTCO HOT DOGS
**Footer (t = 0):** Hot dog + soda: $1.50 in 1985. Still $1.50.
**A/B header:** YOUR PARENTS' HOUSE VS YOURS, / IN **$1.50** COSTCO HOT DOGS (same rungs, same labels)

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 views (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw. The counter is already running at 0.0 s, and the unit price is in the footer.
2. **H04, HD Guy, "Cost in Units of Starbucks Lattes"**: 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. A cheap everyday unit, and the footer "Tall Latte ☕ = $4.45", which becomes ours: "Hot dog + soda: $1.50 in 1985. Still $1.50."
3. **H17, ChartOrbit, "What If You Invested $5,000 in USA and EUROPE?"**: 2,808,307 (345.09x), https://www.youtube.com/shorts/VwfZNjxu6fU. A pair named in the hook with a start year ("POV: In 2008…"). Ours: "1985 VS 2026", two named houses the viewer can pick between before the maths.
- **Contrast we design against: H13, HD Guy, "Costco Hotdog Combos", 80,139 (1.44x).** The same unit with no reason for it. The round-1 header copied its title word for word. Ours puts the reason (the frozen $1.50) and the payoff pair (1985 vs 2026) into the hook line.

**Rules:**
- **R1 (pass):** at 0.0 s the counter is rolling ("≈ 35", landing on "≈ 43" at 0.61 s) under "$65 ÷ $1.50 / YOUR COSTCO MEMBERSHIP". "$1.50" is in the header and the footer.
- **R2 (pass):** one $ figure in the hook line, the input. The two years are the horizon, not results.
- **R5 (pass):** the header implies the belief that "a house costs what a house costs". Measured in the one price that did not move, the same median new house is **≈ 4.7×** the hot dogs.
- **R6 (pass):** a horizon (1985 vs 2026) and a stake ("your membership" on rung 1, the house you'd buy).
- **R7 (pass):** both houses are named in the header, and every rung is a named item.
- **R8 (pass):** 11 words on 2 lines.
- **R10 (pass):** the first count lands at 0.61 s. The biggest number is last (≈ 262,467 at 18.42 s).
- **R12 (pass):** "≈ 4.7× the hot dogs" is one repeatable number.
- **R3 (partial):** only rung 1 is the viewer's own number, and only for Costco members. The pinned comment gives the swap rule (your price ÷ 1.5).
- **R4 (partial):** the hot dog is the benchmark's flop unit. Our bet is that the frozen price, not the unit, carries the hook.
- **R9 (partial):** the kit shows 4 unlabelled rung pips. The labelled "1985: ?" and "2026: ?" slots are requested as `lookOpts.slots` but not drawn yet (kit notes).
- **R11 (partial):** the header states the comparison. Caption line 1, "The $1.50 never moved. The house did.", takes a side without the number.

**The wrong belief it plays on:** "Prices just went up with everything else, so a house costs what a house costs."
- Measured in the one price that did not move in 41 years, a median new house went from **56,200 hot dogs in 1985** to **≈ 262,467 in August 2026**.
- The sticker price went up **≈ 4.7×**, and the hot dog makes that visible without any inflation maths.
- The caption and the pinned comment say plainly that these are sticker prices.

### Beat sheet

Counter landing times are the Scoreboard kit's own (reproduced by the check). Line 1 of each label is "cost ÷ $1.50", and line 2 is the item.

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "A NEW HOUSE, 1985 VS 2026, / IN **$1.50** COSTCO HOT DOGS"; footer; hot-dog icon + hero counter already rolling ("≈ 35"); label "$65 ÷ $1.50 / YOUR COSTCO MEMBERSHIP"; 4 rung pips; dogs falling | "Costco hot dog, 1985: **$1.50**. Today: **$1.50**." |
| 0.61 | Counter lands **≈ 43** (ding); 43 dogs stacked | |
| 4.9 | Hold on the pile and "≈ 43" | "Your Costco membership? **≈ 43 hot dogs**." |
| 7.9 | Cut (thud). Label "$1,199 ÷ $1.50 / AN IPHONE 18 PRO"; the pile re-packs and the counter rolls | "An iPhone 18 Pro? **≈ 799**." |
| 9.80 | Counter lands **≈ 799** | |
| 11.4 | Cut. "$84,300 ÷ $1.50 / A MEDIAN NEW HOUSE, 1985" | "A new house in 1985? **56,200**." |
| 13.72 | Counter lands **56,200** | |
| 15.6 | Cut + riser. "$393,700 ÷ $1.50 / A MEDIAN NEW HOUSE, AUG 2026" | "And a new house in 2026? **≈ 262,000**." |
| 18.42 | Counter lands **≈ 262,467** (hit + cash); the stack fills the stage | |
| 20.6 | Verdict slams in: "Hot dog: still $1.50. / The house: **≈ 4.7×** the hot dogs." (ding) | "Same $1.50. **≈ 4.7×** the hot dogs." |
| 25.3-27.0 | Hold, then a hard cut back to frame 1 (loop) | (none) |

**Why the membership is on screen while the voice says the frozen price.** The judge's rewrite puts the price fact in the first VO line, and HD Guy's frame 1 always has a count running. So rung 1 rolls under the opener and lands at 0.61 s, and its own line ("Your Costco membership? ≈ 43 hot dogs.") follows at 4.9 s, after the count has landed. The label's line 1, "$65 ÷ $1.50", carries the same $1.50 the voice is saying.

### Guide VO script (6 lines, about 61 spoken words, 23.5 s of speech in a 27 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.7 | Costco hot dog, 1985: **$1.50**. Today: **$1.50**. | "Costco hot dog, nineteen eighty-five: a dollar fifty. Today: a dollar fifty." |
| 4.9 | 2.7 | Your Costco membership? **≈ 43 hot dogs**. | "Your Costco membership? About forty-three hot dogs." |
| 7.9 | 3.2 | An iPhone 18 Pro? **≈ 799**. | "An iPhone 18 Pro? About seven hundred ninety-nine." |
| 11.4 | 3.9 | A new house in 1985? **56,200**. | "A new house in nineteen eighty-five? Fifty-six thousand two hundred." |
| 15.6 | 4.7 | And a new house in 2026? **≈ 262,000**. | "And a new house in twenty twenty-six? About two hundred sixty-two thousand." |
| 20.6 | 4.7 | Same $1.50. **≈ 4.7×** the hot dogs. | "Same dollar fifty. About four point seven times the hot dogs." |

### The maths

**Rule:** count = cost ÷ $1.50, shown to the nearest whole hot dog, with "≈" unless the division is exact. The VO rounds for speech: exact if whole; below 1,000 to the unit; 1,000-9,999 to the 100; 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Your Costco membership | $65 ÷ $1.50 | 43.3333 | ≈ 43 | ≈ 43 |
| An iPhone 18 Pro | $1,199 ÷ $1.50 | 799.3333 | ≈ 799 | ≈ 799 |
| A median new house, 1985 | $84,300 ÷ $1.50 | 56,200 (exact) | 56,200 | 56,200 |
| A median new house, Aug 2026 | $393,700 ÷ $1.50 | 262,466.6667 | ≈ 262,467 | ≈ 262,000 |
| Verdict ratio | $393,700 ÷ $84,300 | 4.6702 | ≈ 4.7× | ≈ 4.7× |

- The ratio is the same in hot dogs and in dollars (262,466.67 ÷ 56,200 = 4.6702), because the unit price never moved. The check asserts this.
- **Captions are rounded on purpose.** The caption shows the spoken figure (≈ 262,000) while the hero counter shows the exact count (≈ 262,467). The screen is the working and the voice is the takeaway, as the format research recommends: "$143K ÷ ~$4.50 ≈ 32,000 lattes. The screen shows 32,168" (04-formats, rank 8). The same rule holds in 08b and 08c.
- **Requested kit option (`lookOpts.bigUnit`):** "1 block = 1,000 hot dogs" from 10,000 up. That gives **56 / 262 blocks** for the 1985 and 2026 houses, so the 2026 pile is visibly ≈ 4.7× the 1985 pile. See the kit notes.

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
- **Not shown on screen:** the house prices are sticker prices, not inflation-adjusted. That is the point of the frozen ruler, and the caption says so.
- Only the price is the same. The frank (Kirkland since 2009) and the drink (20 oz) changed, so nothing on screen says "same hot dog".

### Caption / description

> The $1.50 never moved. The house did.
> Costco's hot dog + soda: $1.50 in 1985, still $1.50. A median new house: 56,200 hot dogs in 1985. ≈ 262,467 in Aug 2026: ≈ 4.7× the hot dogs.
> (Costco $65 Gold Star; iPhone 18 Pro $1,199; Census median new house $84,300 in 1985 and $393,700 in Aug 2026. Sticker prices, not inflation-adjusted. Maths, not advice.)
> #costco #hotdog #housingmarket #moneymath

### Pinned comment

> Yes, these are sticker prices, not inflation-adjusted. That's the point of the hot dog: Costco never raised the $1.50 (the frank became Kirkland in 2009 and the soda grew to 20 oz, but the price didn't move). In dollars the house went $84,300 → $393,700 (Aug 2026), the same ≈ 4.7×. Any price ÷ 1.5 = your hot dogs. What should we price next?

### Per-platform notes

- **YouTube Shorts (home of every P8 breakout):**
  - Title exactly "A New House in Costco Hot Dogs: 1985 vs 2026". This title no longer competes in search with HD Guy's flopped "Costco Hotdog Combos" upload.
  - No CTA, a hard loop.
  - A/B test an SFX-only cut (a thud on each cut, roll ticks, hit + cash on the finale; no VO, captions off so the label stack does the talking) against the VO cut. HD Guy's 30.6M short has no voice at all.
  - A/B test the header "YOUR PARENTS' HOUSE VS YOURS, / IN $1.50 COSTCO HOT DOGS".
- **Instagram Reels:**
  - VO cut with captions on.
  - Cover: the two house counts side by side (56,200 vs ≈ 262,467).
  - Caption line 1: "The $1.50 never moved. The house did."
- **TikTok:**
  - VO cut.
  - Caption line 1 is the same, and it asks "what next?" at the end.
  - The tribe is Costco fans: #costco #costcofinds.

---

## 08b · Becker Rig · "Your Rent, a Car, a House: In Hours of Work at $15/hr"

**Spec:** `studio/specs/08b-becker-rig-hours-at-15.json` · **27.0 s** · captions on · lints clean. The Becker Rig `unit-ladder` format is still a stub in the kit, so the staging lives in `lookOpts`.

**Platform title:** Your Rent, a Car, a House: In Hours of Work at $15/hr
**On-screen hook (header):** Your rent, a car, a house: / hours of work at **$15/hr**
**Footer (t = 0):** ≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax

### Why this hook

**Modelled on:**
1. **H01 / H04, HD Guy, "Cost in Units of RTX 5090" (30,617,461, 62.49x) and "Cost in Units of Starbucks Lattes" (9,858,084, 106.16x).** The rule in the title, with the unit being an hour of your own work.
2. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206 (2.8x med), https://www.instagram.com/reel/Dd2QzRzRrGT/. The wage in the hook filters the viewer in. His best wage reel was also his lowest wage and smallest goal ("$20/HR → $10K SAVED"), which is why we use $15.
3. **H03, HD Guy, "Rifle to Nuclear Weapon Cost (Navy)"**: 16,229,536 (183.76x), https://www.youtube.com/shorts/M2c2F712ywo. It opens on the relatable anchor already counting. Ours opens on a month of rent, the bill everyone pays, with the count already rolling.
- **Contrast we design against: H15, HD Guy, "Wages Visualized In Real Time", 9,025.** A wage alone as spectacle flopped. Ours turns the wage into the ruler for the three things the viewer pays for.

**Becker devices used** (from `research/v2/watch/alan-becker.md` §4 and §6):
- **"Operators are tools":** a TAX snip cuts ≈ $1.90 off the $15 block in the first second. The figure then wields "÷ $13.10" and "× 12" as tools.
- **"Results are transformations":** hour blocks become a stack beside a month of work slots, then 12 stacks, then a car outline, then a house-sized pile.
- **"Scale is shown by the camera":** the pull-back on "× 12".
- **"getFlattened":** the house pile topples onto the figure at the verdict (§7.2 primitives).
- **§6 idea 9, "the counter that overheats"** ($60,000 ÷ 2,080 = $28.85/h): an earning-rate readout as the frame-1 surface. Ours is the $15 block becoming $13.10 = 1 hour.

**Rules:**
- **R1 (pass):** "$15/hr" is in the header and "≈ $13.10" in the footer at 0.0 s. The rent tag "$1,531" hangs over the figure, and the count is already rolling.
- **R2 (pass):** one $ figure in the hook line, the input.
- **R4 (pass):** $15 an hour is small and round, and many viewers earn it.
- **R5 (pass):** "rent is about a week of work" is wrong, because it is ≈ 2 of every 3 hours you work. The TAX snip also shows that gross pay is not what you keep.
- **R6 (pass):** your rent, $15 an hour, your hours.
- **R7 (pass):** rent, a car and a house are named in the header.
- **R8 (pass):** 11 words on 2 lines.
- **R10 (pass):** ≈ 117 lands at about 2.4 s and is spoken at about 2.3 s. The biggest number is last.
- **R12 (pass):** "≈ 2 of every 3 hours you work" and "≈ 14 years of full-time work".
- **R3 (partial):** one wage. The pinned comment gives the rule and two more wages, and anyone can divide their own rent by $13.10.
- **R9 (partial):** the header lists 3 things, and the car and house tags lie face-down from frame 1 (`lookOpts.facedown`). The kit is a stub, so none of it renders yet.
- **R11 (partial):** the header states the rule. Caption line 1 takes a side: "At $15 an hour, rent isn't a week of work. Not close."

**The wrong beliefs it plays on:**
1. "Rent is about a week of work." At the median asking rent it is ≈ 117 hours, which is 67.4% of a full-time month's 173.33 hours (≈ 2 of every 3), or ≈ 2.9 work-weeks.
2. "At $15 an hour, a thing costs price ÷ 15 hours." You keep ≈ $13.10, so every count is ≈ 14.5% bigger than the gross-wage guess (15 ÷ 13.10 = 1.145). This is shown by the snip and the footer, not spoken.

### Beat sheet

| t (s) | On screen (Becker Rig) | VO (caption) |
|---|---|---|
| 0.0 | White stage, floor line. Header; footer. The figure holds a **$15** block and the **TAX** scissors snip at once. Tag "$1,531 · MEDIAN RENT, 1 MONTH" hangs over him. The car and house tags lie face-down at stage right | "$15 an hour? Median rent: **≈ 117 hours**." |
| 0.0-1.0 | Snip: a sliver "≈ $1.90" falls off. At 1.0 s (pop) the block reads "$13.10 = 1 HOUR". He grabs "÷ $13.10" and stacks hour blocks; the counter rolls | (same line) |
| ≈ 2.4 | Counter lands **≈ 117** | |
| 4.6 | A month of work is drawn as 173 hour slots; 117 of them fill under the rent tag | "That's ≈ 2 of every 3 hours you work." |
| 8.4 | Rung 2: "$18,372 · MEDIAN RENT, 1 YEAR". He snaps "× 12"; the camera pulls back to 12 stacks; **≈ 1,402** | "A year of rent? **≈ 1,400 hours**." |
| 12.6 | Rung 3: the car tag flips, "$50,089 · AN AVERAGE NEW CAR". Blocks pour into a car outline; **≈ 3,824** | "An average new car? **≈ 3,800 hours**." |
| 16.8 | Rung 4: the house tag flips, "$393,700 · A MEDIAN NEW HOUSE". A house-sized pile rises over him; **≈ 30,053** | "A median new house? **≈ 30,000 hours**." |
| 20.3 | The pile topples and flattens the figure (thud, shake). Gag tag "≈ 14 YEARS". Verdict: "**≈ 14 years** of full-time work. / Every cent you keep." | "That's **≈ 14 years** of full-time work. Every cent you keep." |
| 25.0-27.0 | Hold. He pops back up holding the $15 block (loop to frame 1) | (none) |

### Guide VO script (6 lines, about 59 spoken words, 22.7 s of speech in a 27 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | $15 an hour? Median rent: **≈ 117 hours**. | "Fifteen dollars an hour? Median rent: about a hundred seventeen hours." |
| 4.6 | 3.5 | That's ≈ 2 of every 3 hours you work. | "That's about two of every three hours you work." |
| 8.4 | 3.9 | A year of rent? **≈ 1,400 hours**. | "A year of rent? About fourteen hundred hours." |
| 12.6 | 3.9 | An average new car? **≈ 3,800 hours**. | "An average new car? About thirty-eight hundred hours." |
| 16.8 | 3.2 | A median new house? **≈ 30,000 hours**. | "A median new house? About thirty thousand hours." |
| 20.3 | 4.7 | That's **≈ 14 years** of full-time work. Every cent you keep. | "That's about fourteen years of full-time work. Every cent you keep." |

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
| Snip per hour | $15 − 13.10058 | 1.8994 → **≈ $1.90** |

**Rule:** hours = cost ÷ $13.10. We define the unit as the rounded $13.10, so the operand on screen ("÷ $13.10") reproduces every count on a calculator. The footer keeps the "≈" on what you actually keep. Counts are shown to the nearest hour with "≈", and spoken to the 100, or to the 1,000 at 10,000 and up.

| On screen | Formula | Exact | Shown | VO / conversion |
|---|---|---:|---:|---|
| Median rent, 1 month | $1,531 ÷ $13.10 | 116.870 | ≈ 117 | ≈ 117 hours; ÷ (2,080 ÷ 12 = 173.33) = 0.6743 → 67.4%, "≈ 2 of every 3 hours" |
| Median rent, 1 year | ($1,531 × 12 = $18,372) ÷ $13.10 | 1,402.443 | ≈ 1,402 | ≈ 1,400 hours |
| An average new car | $50,089 ÷ $13.10 | 3,823.588 | ≈ 3,824 | ≈ 3,800 hours |
| A median new house | $393,700 ÷ $13.10 | 30,053.435 | ≈ 30,053 | ≈ 30,000 hours; ÷ 2,080 = 14.449 → "≈ 14 years" |

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
- no benefit premiums or 401(k) deferrals;
- median asking rent (Census), as the rung label says;
- a car and a house at sticker price, with no loan interest.

### Caption / description

> At $15 an hour, rent isn't a week of work. Not close.
> After 2026 federal tax + FICA (single, no state tax), $15 an hour keeps ≈ $13.10, so every price here is ÷ $13.10. Median rent ($1,531) ≈ 117 hours a month: 67.4% of a full-time month, ≈ 2 of every 3 hours you work. A median new house ($393,700) ≈ 30,053 hours: ≈ 14 years of full-time work, every cent you keep.
> (Rent: Census median asking rent, Q2 2026. Car: KBB average, Aug 2026. House: Census median new, Aug 2026. Maths, not advice.)
> #hourlywage #rent #housing #moneymath

### Pinned comment

> Your wage? Divide the price by what you KEEP per hour, not by your wage. At $15 you keep 87.3% (≈ $13.10). At $20/hr it's ≈ $17.12 (85.6%), at $25/hr ≈ $21.14 (84.5%), before state tax. Your rent ÷ that = your hours. What should we price in your hours next?

### Per-platform notes

- **TikTok (lead platform):**
  - Wage reels live here.
  - VO cut, captions on.
  - Caption line 1: "At $15 an hour, rent isn't a week of work. Not close."
  - Expect "not every state…" comments. The footer pre-empts them, and the pinned comment answers.
- **Instagram Reels:**
  - Same cut.
  - Cover: the month of 173 hour slots with 117 under the rent tag.
  - Caption line 1 is the same.
- **YouTube Shorts:**
  - Title "Your Rent, a Car, a House: In Hours of Work at $15/hr".
  - No CTA; the video loops back to the $15 block.

---

## 08c · Clean Sheet · "What Your Degree Costs in Big Macs"

**Spec:** `studio/specs/08c-clean-sheet-college-in-big-macs.json` · **27.0 s** · captions on · lints clean · rendered in the Clean Sheet kit (stills at 0.0, 1.8, 18.4, 20.8 and 22.0 s)

**Platform title:** What Your Degree Costs in Big Macs
**On-screen hook (header):** Your degree, in **Big Macs**: / find your school
**Footer (t = 0):** 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: tuition & fees; row 5 = full budget

### Why this hook

**Modelled on:**
1. **H11, HD Guy, "Cost in Units of Big Macs"**: 1,748,759 views (56.76x), https://www.youtube.com/shorts/Hv6aZR4hUEI. The same unit, already proven.
2. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. The P7 task in the hook ("Find your age" becomes "find your school") and a row for every viewer (R3).
3. **H04, HD Guy, "Cost in Units of Starbucks Lattes"**: 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. The unit-price device ("Tall Latte ☕ = $4.45" becomes the unit row "1 Big Mac = $6.22"), and the climb to a screen-filling finale.
- **Contrast:** HD Guy's "University Degrees" *as the unit* got 64,954. We use college as the subject and a cheap, familiar unit as the ruler.

**Rules:**
- **R1 (pass):** at 0.0 s the unit row "1 Big Mac = $6.22" is on the sheet, and step ① has "$4,150" written with the caret waiting. "$6.22" is also in the footer.
- **R2 (pass):** no $ figure in the header. The one input ($6.22) is in the unit row and the footer.
- **R3 (pass):** "find your school": community college, in-state, out-of-state and private each get a row.
- **R6 (pass):** "Your degree".
- **R7 (pass):** each school type is named.
- **R8 (pass):** 8 words.
- **R10 (pass):** ≈ 667 lands at 1.63 s (spoken at about 1.9 s). The biggest number is last.
- **R12 (pass):** "a Big Mac a day for ≈ 115 years".
- **R4 (partial):** the Big Mac is a proven, familiar unit, but most viewers are not paying for a degree right now.
- **R5 (partial):** the wrong belief ("a degree costs its tuition") is carried by row 5's label, "with housing & food", at 16.4 s, not by the hook.
- **R9 (partial):** the kit opens one rung at a time, so at frame 1 only ① shows. Drawing every row's circle and label from frame 1 (empty results) is requested as `lookOpts.preview` (kit notes).
- **R11 (partial):** the header gives a task, not a question. TikTok caption line 1 gives the hook a side: "Find your school. The last row is not a typo."

**The wrong beliefs it plays on:**
1. "A degree costs its tuition." Row 5 prices four years with housing, food, books and transport: ≈ 42,103 Big Macs. Tuition alone for four private years would be ≈ 28,939.
2. "State school is the cheap option." In-state tuition alone is ≈ 1,921 Big Macs a year.

### Beat sheet

Times are the Clean Sheet kit's own (reproduced by the check). Each step types "cost ÷ $6.22 =", wipes a highlighter in, and runs the count up on it (`countSpeed` 0.5). A finished step files into a sheet row when the next one opens.

| t (s) | On screen (Clean Sheet) | VO (caption) |
|---|---|---|
| 0.0 | Page; title "Your degree, in **Big Macs**: / find your school"; footer under the title; unit row "🍔 1 Big Mac = $6.22"; ① "Community college, 1 year", "$4,150" with the caret | "Find your school. Community college? **≈ 667 Big Macs**." |
| 0.0-1.63 | "$4,150 ÷ $6.22 =" types; the green box wipes in; the count runs up and lands at **≈ 667** (1.63) with a grid of burger icons | |
| 4.6 | ① files into its row; ② "State school, in-state, 1 year": "$11,950 ÷ $6.22 =" → **≈ 1,921** (6.29) | "A state school, in-state? **≈ 1,900**." |
| 8.4 | ③ "State school, out-of-state, 1 year": "$31,880 ÷ $6.22 =" → **≈ 5,125** (10.14) | "The same school, out-of-state? **≈ 5,100**." |
| 12.2 | ④ "Private college, 1 year": "$45,000 ÷ $6.22 =" → **≈ 7,235** (13.96) | "A private college, 1 year? **≈ 7,200**." |
| 16.4 | ⑤ "Private, 4 years, with housing & food": "4 × $65,470 ÷ $6.22 =" → blue final box **≈ 42,103** (18.26), a dense burger pile | "4 years private, with housing and food? **≈ 42,000**." |
| 18.6-20.7 | Check line types under it: "check: ≈ 42,103 ÷ 365 days ≈ 115 years" | |
| 21.0 | Verdict: "A Big Mac a day / for **≈ 115 years**." (ding) | "That's a Big Mac a day for **≈ 115 years**." |
| 26.3-27.0 | The finished sheet clears back to the frame-1 state (loop) | (none) |

### Guide VO script (6 lines, about 61 spoken words, 23.5 s of speech in a 27 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | Find your school. Community college? **≈ 667 Big Macs**. | "Find your school. Community college? About six hundred sixty-seven Big Macs." |
| 4.6 | 3.5 | A state school, in-state? **≈ 1,900**. | "A state school, in-state? About nineteen hundred." |
| 8.4 | 3.5 | The same school, out-of-state? **≈ 5,100**. | "The same school, out-of-state? About fifty-one hundred." |
| 12.2 | 3.9 | A private college, 1 year? **≈ 7,200**. | "A private college, one year? About seventy-two hundred." |
| 16.4 | 3.9 | 4 years private, with housing and food? **≈ 42,000**. | "Four years private, with housing and food? About forty-two thousand." |
| 21.0 | 4.7 | That's a Big Mac a day for **≈ 115 years**. | "That's a Big Mac a day for about a hundred fifteen years." |

### The maths

**Rule:** Big Macs = cost ÷ $6.22, to the nearest whole Big Mac, with "≈". The VO rounds for speech: below 1,000 to the unit, 1,000-9,999 to the 100, 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Community college, 1 year | $4,150 ÷ $6.22 | 667.203 | ≈ 667 | ≈ 667 |
| State school, in-state, 1 year | $11,950 ÷ $6.22 | 1,921.222 | ≈ 1,921 | ≈ 1,900 |
| State school, out-of-state, 1 year | $31,880 ÷ $6.22 | 5,125.402 | ≈ 5,125 | ≈ 5,100 |
| Private college, 1 year | $45,000 ÷ $6.22 | 7,234.727 | ≈ 7,235 | ≈ 7,200 |
| Private, 4 years, with housing & food | 4 × $65,470 = $261,880; ÷ $6.22 | 42,102.894 | ≈ 42,103 | ≈ 42,000 |
| Check / verdict | 42,103 ÷ 365 (one a day) | 115.351 | ≈ 115 years | ≈ 115 years |

- The verdict holds on the unrounded count too: 42,102.894 ÷ 365 = 115.35 → 115 (asserted).
- **For comparison (write-up only):** four years of private tuition and fees alone, 4 × $45,000 ÷ $6.22 = 28,938.9 → ≈ 28,939 Big Macs. Row 5 is bigger because it is the full budget.
- **Pinned-comment number** (checked): 4 years in-state with housing and food = 4 × $30,990 = $123,960 → ≈ 19,929 Big Macs.
- Captions are rounded on purpose (see 08a's maths).

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| US Big Mac price, July 2026 | $6.22 | **The Economist, Big Mac index dataset** (GitHub `TheEconomist/big-mac-data`, `output-data/big-mac-raw-index.csv`, row `2026-07-01, USA, 6.22`; downloaded 2026-10-07). https://github.com/TheEconomist/big-mac-data. The same file has $6.12 for Jan 2026 and $6.01 for Jul 2025. | Econlife, "Big Mac index", **July 2026**. https://econlife.com/2026/07/big-mac-index-3/. Also TrendForce DataTrack, "The Big Mac index: United States". https://datatrack.trendforce.com/Chart/content/4204/the-big-mac-index-united-states |
| 2025-26 average published tuition & fees: public two-year in-district $4,150; public four-year in-state $11,950; out-of-state $31,880; private nonprofit four-year $45,000 | | College Board, *Trends in College Pricing and Student Aid 2025* (2025-26 prices; exact release date not captured). https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf and its newsroom release https://newsroom.collegeboard.org/trends-college-pricing-and-student-aid-report-published-tuition-prices-public-institutions-and | Achievable, "2025 Trends in College Costs and Aid" (an independent summary of the same report). https://achievable.me/exams/sat/resources/2025-trends-in-college-costs-and-aid/ |
| 2025-26 average total budget, private nonprofit four-year (tuition, fees, housing, food, books, transport, other) | $65,470; public in-state $30,990 (pinned) | as above | as above |

- **Verification note:** collegeboard.org is blocked by the egress proxy, so the College Board figures come from search-result text that quotes the report, plus one independent summary. The verifier confirmed all six figures independently.
- The "budget" figures are College Board's estimated full-time undergraduate budgets. Row 5's label ("with housing & food") and the footer ("row 5 = full budget") say which basis it uses.

### Assumptions (footer, on screen at t = 0)

> 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26: tuition & fees; row 5 = full budget

- Rows 1-4 are published tuition and fees. Row 5 is College Board's average total budget for a private nonprofit four-year student, **$65,470 a year**: tuition, fees, housing, food, books, transport and other costs.
- These are sticker (published) prices, before grants, scholarships or aid.
- Row 5 is that budget × 4 years at today's prices, with no tuition growth.

### Caption / description

> Your degree, in Big Macs. Find your school.
> Community college ≈ 667 Big Macs a year. In-state ≈ 1,921. Out-of-state ≈ 5,125. Private ≈ 7,235.
> Four years private with housing & food: ≈ 42,103. That's a Big Mac a day for ≈ 115 years.
> (US Big Mac $6.22, The Economist's Big Mac index, Jul 2026. Rows 1-4: College Board 2025-26 average published tuition & fees. Row 5: College Board's average total budget, $65,470 a year: tuition, housing, food, books, transport, other. Sticker prices, before aid. Maths, not advice.)
> #college #tuition #bigmac #moneymath

### Pinned comment

> Rows 1-4 are sticker tuition & fees, before any grants or scholarships. Row 5 is the full budget (with housing, food and books). Four years in-state, full budget ($123,960): ≈ 19,929 Big Macs. What did your school really cost, in Big Macs?

### Per-platform notes

- **YouTube Shorts:**
  - Title "What Your Degree Costs in Big Macs".
  - No CTA; the loop clears the sheet back to frame 1.
- **Instagram Reels:**
  - Cover: the finished sheet (all five rows filled, blue final box). The sheet is the screenshot people save.
  - Caption line 1: "Find your school."
  - Tag the back-to-school and #studentloans crowd.
- **TikTok:**
  - VO cut, captions on.
  - Caption line 1: "Find your school. The last row is not a typo."
  - Comments will argue about net price against sticker price, and the pinned comment invites exactly that.

---

## Kit notes (for the look builders)

- **Scoreboard (08a), built. Two requests and one observation:**
  - **`lookOpts.bigUnit` (request, unchanged from the first draft).** The kit packs icons down to a 5 px cell, so any count above about 12,000 fills the stage. In the render, the 1985 house (56,200) and the 2026 house (≈ 262,467) both show the same full green block, which hides the twist. `bigUnit: { from: 10000, per: 1000, legend: "1 block = 1,000 hot dogs" }` gives 56 / 262 blocks, so the 2026 pile is visibly ≈ 4.7× the 1985 pile.
  - **`lookOpts.slots` (new request, for R9).** `[{ rung: 2, label: "1985: ?" }, { rung: 3, label: "2026: ?" }]` asks for two labelled empty slots, visible from frame 1, that fill with each house's count when it lands. Today the 4 rung pips are unlabelled.
  - **Observation.** A 3-line verdict ("Hot dog: still $1.50. / The house: ≈ 4.7× / the hot dogs." at 22.0 s) sits with its top line about 10 px into the stage edge, over the climax pile. The linter does not flag it. Shorter verdicts still wrap to 3 lines at the fitted size.
  - The kit ignores both request keys until they are built, and the spec renders fine without them.
- **Becker Rig (08b): the `unit-ladder` format is still a stub** ("TODO unit-ladder"). The spec follows the FORMATS.md contract, and the staging lives in `lookOpts`:
  - `opener`: the TAX snip, now landing at 1.0 s (`land`), with the pop SFX at 1.0;
  - `facedown`: the car and house tags lie face-down from frame 1, the countable open loop;
  - `actions` per rung, with "÷ $13.10" as the tool;
  - `gag`.
  - Only the shared chrome (header, footer, captions, verdict) renders today, and it lints clean.
- **Clean Sheet (08c): the `unit-ladder` format is built** (`looks/clean-sheet/formats/unit-ladder.js`). The spec now uses only keys the kit reads, plus one request:
  - `unitRow: "show"`: the unit row "1 Big Mac = $6.22" is always on the sheet. It replaces the old `badge` string, which the kit never read.
  - `countSpeed: 0.5`: the counters land before the voice says each number.
  - `check` + `checkT: 18.6`: the check line types from 18.6 to 20.71 s, before the verdict at 21.0 s.
  - **`preview: "labels"` (request, for R9 and "find your school").** It asks the kit to draw every rung's circle and label from frame 1, with empty results that fill in turn. The kit ignores it today: frame 1 shows only the unit row and ①.

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

- **P8 has one benchmark channel (HD Guy), and its spectacle is military footage.** Nothing in the benchmark shows that a personal-finance subject works in this format, so all three teasers test that hypothesis. The strongest hedges are 08c's row-per-viewer structure (R3, from the P7 winners) and 08b's rent-share verdict.
- **08a's unit is the benchmark's own flop (H13).** The bet is that the frozen price makes it a ruler rather than a novelty. If 08a underperforms the other two, the unit is the first suspect.
- **08a's twist is about sticker prices.** It is honest as stated, and the caption and pinned comment say so. Expect "inflation!" comments; those are engagement, not an error.
- **Single-publisher figures:**
  - The rent ($1,531) is a Census figure, cross-checked only against the same series' previous quarter (and by the verifier).
  - The College Board figures could not be opened at the source. They were read from search text plus one independent summary, then confirmed by the verifier.
- **The VO word counts are estimates** (2.6 words/s; years read as two words, money with cents as three). The tightest line is 08a's membership line (2.7 s for an estimated 2.69 s); several 3.9 s lines need 3.85 s.
- **Two of the three R9 open loops depend on kit work** that is requested but not built (08a `slots`, 08c `preview`), and 08b's whole staging waits for the Becker Rig format.

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
| V9 | 08b | info | The Becker Rig unit-ladder is a stub, so the opener timing can't be checked in a render | Still true. Kit notes list the staging keys, and the check pins the opener land (1.0 s) before the first count (2.4 s). |

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
