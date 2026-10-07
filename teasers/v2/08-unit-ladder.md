# 08 · Unit ladder ("Cost in units of X"): three teasers

**Format:** `unit-ladder` (rank 8 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P8**)
**Date:** 2026-10-07
**Specs:**
- [`studio/specs/08a-scoreboard-costco-hot-dogs.json`](../../studio/specs/08a-scoreboard-costco-hot-dogs.json)
- [`studio/specs/08b-becker-rig-hours-at-15.json`](../../studio/specs/08b-becker-rig-hours-at-15.json)
- [`studio/specs/08c-clean-sheet-college-in-big-macs.json`](../../studio/specs/08c-clean-sheet-college-in-big-macs.json)

**Maths check:** [`checks/08-unit-ladder.py`](checks/08-unit-ladder.py).
- It recomputes every on-screen number from the sourced inputs, in exact fractions.
- It rebuilds every display string and VO line from those numbers and compares them with the three specs.
- It also checks the timing (2.6 words/s, no overlaps, each rung lands on the VO line that names it), the contract shape, "≈" on every rounded result, and the pinned-comment numbers in this file.
- For 08a it replays the Scoreboard kit's own counter-roll rules, so the voice never calls a number before the counter shows it.
- **Result: PASSED.**
- A mutation test (one count changed to "≈ 1,920", one VO line shortened to 3.0 s, one footer year changed to 1986) failed 7 checks with exit 1, as it should.

**Studio linter** (`node src/cli.mjs check`): all 3 specs have 0 errors and 0 warnings. That covers safe zones, the type floor and the R1 hook number. 08b's first footer shrank to 36 px and was shortened.

**Web searches used:** 14 of 14 (log at the end). The egress proxy blocks census.gov, fred.stlouisfed.org, huduser.gov, eia.gov, collegeboard.org and most news sites. Those pages could not be opened, so each figure was confirmed from search-result text, which quotes the source, plus a second source. The one exception is the Big Mac price, read directly from The Economist's own dataset on GitHub.

---

## (a) The format in 5 lines

1. **What it is.** One division, cost ÷ unit price, repeated on a ladder from cheap to huge. A counter and a growing stack of unit icons show each answer, the biggest lands last, and the unit price sits in a tiny footer. It runs 26-40 s with no CTA and loops back to rung 1.
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
   - HD Guy's one civilian pay topic, "Wages Visualized In Real Time", got **9,025**.
4. **What does not transfer.**
   - HD Guy's spectacle is military footage we will not have, and it shows no method at all.
   - Only one channel runs the format, which is why it rates viability 5.
   - The untested part is a personal-finance subject. So every teaser below re-prices **the viewer's own big purchases** (a phone, rent, a car, a house, college) in a unit the viewer has paid, and adds the one thing HD Guy never shows: the working (the "÷" line and the rounded answer).
5. **What we keep from HD Guy:**
   - the title states the rule, with no number in it;
   - frame 1 has the rule already running;
   - the input sits in the footer;
   - one division per rung;
   - the biggest number last;
   - no CTA;
   - a hard loop.

   **What we add:** "≈" on every rounded count, a verdict line (R12), and a VO the owner records. HD Guy has no voice at all, so an SFX-only cut is worth an A/B test (see the platform notes).

**Hook grammar we are stealing (P8):** "Cost in Units of [a cheap, familiar item]" (6 words, no number), with the unit price in the footer: "Tall Latte ☕ = $4.45" (H04), "Price of RTX 5090 32GB: ~$4,899" (H01).

---

## (b) The three teasers at a glance

| | 08a | 08b | 08c |
|---|---|---|---|
| Look | Scoreboard | Becker Rig | Clean Sheet |
| Platform title | Cost in Units of Costco Hot Dogs | Cost in Hours of Work at $15 an Hour | College Cost in Units of Big Macs |
| On-screen header (t = 0) | COST IN UNITS OF / **COSTCO HOT DOGS** | Cost in hours of work / at **$15 an hour** | What college costs / in **Big Macs** |
| Words in hook | 6 | 8 | 6 |
| Unit (footer) | $1.50 hot dog + soda, same since 1985 | ≈ $13.10 kept per $15 hour | $6.22 Big Mac (The Economist, Jul 2026) |
| Rungs | 5: membership → iPhone 18 Pro → new car → house 1985 → house 2026 | 4: rent month → rent year → new car → new house | 5: community college → in-state → out-of-state → private → 4 yrs private all-in |
| Twist | The one price that never moved: the house went 56,200 → ≈ 262,467 hot dogs | You keep ≈ $13.10, not $15; rent is ≈ 3 weeks of every month | A row for every kind of student; the all-in degree is the finale |
| Runtime | 30.0 s | 30.0 s | 27.5 s |
| VO words (estimated) | 66 | 67 | 59 |
| Verdict | Same hot dog. The house: **≈ 4.7×** the hot dogs. | **≈ 14 years** of full-time work. Every cent you keep. | A Big Mac a day for **≈ 115 years**. |
| Seed it replaces | Old hook #1 (rewrite A) | Brief seed | Brief seed "$6 lattes", swapped for a sourced unit (why: see 08c) |

**Topic changes from the seeds, and why**
- **08a keeps the hot dog** but gives it a reason to be the unit. HD Guy's hot-dog short flopped (80,139, 1.44x) when the hot dog was just another cheap unit over military footage. Ours uses the fact that makes the Costco hot dog famous: **$1.50 since 1985**. That makes it the one ruler that never stretched, so the same house measured in 1985 and in 2026 becomes the payoff.
- **08c swaps the $6 latte for the Big Mac.** Three reasons:
  1. No primary source publishes a US latte price. Format 6's writer searched and found only one dataset (FinanceBuzz: grande latte $4.45 in 2024), with no second source, so "$6" could not be verified.
  2. The Big Mac has a primary, dated price: **$6.22**, The Economist's Big Mac index, July 2026.
  3. It is a proven HD Guy unit (1,748,759 views, 56.76x). Lattes and the latte factor also already belong to 06c (Starbucks).

---

## 08a · Scoreboard · "Cost in Units of Costco Hot Dogs"

**Spec:** `studio/specs/08a-scoreboard-costco-hot-dogs.json` · **30.0 s** · captions on · rendered and checked in the Scoreboard kit (stills at 0.0, 1.6, 9.6, 16.8, 22.0 and 25.5 s)

**Platform title:** Cost in Units of Costco Hot Dogs
**On-screen hook (header):** COST IN UNITS OF / **COSTCO HOT DOGS**
**Footer (t = 0):** Hot dog + soda = $1.50, same since 1985

### Why this hook

**Modelled on:**
1. **H01, HD Guy, "Cost in Units of RTX 5090"**: 30,617,461 views (62.49x), https://www.youtube.com/shorts/E2oVrAwHDOw. Word for word the title grammar ("Cost in Units of [unit]", no number), the counter already running at 0.0 s, and the unit price in the footer.
2. **H04, HD Guy, "Cost in Units of Starbucks Lattes"**: 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. A cheap everyday unit, and the footer "Tall Latte ☕ = $4.45", which becomes ours: "Hot dog + soda = $1.50, same since 1985".
3. **H03, HD Guy, "Rifle to Nuclear Weapon Cost (Navy)"**: 16,229,536 (183.76x), https://www.youtube.com/shorts/M2c2F712ywo. The relatable anchor first (his 36-cent bullet, our $65 membership), then the climb to the biggest number last.
- **The hook bank's own rewrite** (02-hook-bank §4.1, Rewrite A): "Cost in Units of Costco Hot Dogs", with a purchase the viewer knows as rung 1.
- **Contrast we design against: H13, HD Guy, "Costco Hotdog Combos", 80,139 (1.44x).** Same unit, no reason for it. Ours makes the frozen price the story and re-prices the viewer's own purchases, not munitions.

**Rules satisfied:**
- **R1:** the counter is rolling at 0.0 s ("≈ 35", landing on "≈ 43" at 0.61 s). "$65 ÷ $1.50" is in the label and "$1.50" in the footer.
- **R2:** the hook line has no number and no result. The one input, $1.50, sits in the footer.
- **R4:** $1.50 is the smallest, most familiar price there is, and the Costco hot dog has a fan tribe (the CEO's "will not change as long as I'm around" quote travels).
- **R6:** "**Your** Costco membership", $65, since 1985.
- **R7:** every rung is a named item.
- **R8:** 6 words.
- **R9:** the kit shows one pip per rung (5) from frame 1.
- **R10:** the first payoff (≈ 43) lands at 0.61 s and is spoken at 1.15 s. The biggest number is last.
- **R11:** the header states the rule, the post caption gives the verdict.
- **R12:** "≈ 4.7× the hot dogs" is one repeatable number.
- **Partial: R3.** Only rung 1 is the viewer's own number. Anyone can swap in a price (price ÷ 1.5), but there is no row for every viewer.
- **Partial: R5.** The wrong belief is carried by the 1985 → 2026 pair, not by the hook line.

**The wrong belief it plays on:** "Prices just went up with everything else, so a house costs what a house costs."
- Measured in the one price that did not move in 41 years, a median new house went from **56,200 hot dogs in 1985** to **≈ 262,467 in 2026**.
- The sticker went up **≈ 4.7×**, and the hot dog makes that visible without any inflation maths.
- The caption and the pinned comment say plainly that these are sticker prices.

### Beat sheet

Counter landing times are the Scoreboard kit's own (reproduced by the check). Each label line 1 is "cost ÷ $1.50", and line 2 is the item.

| t (s) | On screen | VO (caption) |
|---|---|---|
| 0.0 | Header "COST IN UNITS OF / **COSTCO HOT DOGS**"; footer; hot-dog icon + hero counter already rolling ("≈ 35"); label "$65 ÷ $1.50 / YOUR COSTCO MEMBERSHIP"; 5 rung pips; first dogs falling | "Your Costco membership? **≈ 43 hot dogs**." |
| 0.61 | Counter lands **≈ 43** (ding); 43 dogs stacked | |
| 3.0 | Hold: the pile and "≈ 43" | "That hot dog: still **$1.50**, since 1985." |
| 7.1 | Cut (thud). Label "$1,199 ÷ $1.50 / AN IPHONE 18 PRO"; pile re-packs; counter rolls | "An iPhone 18 Pro? **≈ 799**." |
| 9.00 | Counter lands **≈ 799** | |
| 10.9 | Cut. "$50,089 ÷ $1.50 / AN AVERAGE NEW CAR" | "An average new car now? **≈ 33,000**." |
| 13.22 | Counter lands **≈ 33,393** | |
| 14.0 | Cut. "$84,300 ÷ $1.50 / A MEDIAN NEW HOUSE IN 1985" | "A new house in 1985? **56,200**." |
| 16.32 | Counter lands **56,200** | |
| 18.2 | Cut + riser. "$393,700 ÷ $1.50 / A MEDIAN NEW HOUSE IN 2026" | "And a new house in 2026? **≈ 262,000**." |
| 21.02 | Counter lands **≈ 262,467** (hit + cash); the stack fills the stage | |
| 23.2 | Verdict slams in: "Same hot dog. / The house: **≈ 4.7×** the hot dogs." (ding) | "Same hot dog. **≈ 4.7×** the hot dogs." |
| 27.5-30.0 | Hold, then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (7 lines, about 66 spoken words, 25.4 s of speech in a 30 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 2.8 | Your Costco membership? **≈ 43 hot dogs**. | "Your Costco membership? About forty-three hot dogs." |
| 3.0 | 3.9 | That hot dog: still **$1.50**, since 1985. | "That hot dog: still a dollar fifty, since nineteen eighty-five." |
| 7.1 | 3.5 | An iPhone 18 Pro? **≈ 799**. | "An iPhone 18 Pro? About seven hundred ninety-nine." |
| 10.9 | 3.1 | An average new car now? **≈ 33,000**. | "An average new car now? About thirty-three thousand." |
| 14.0 | 3.9 | A new house in 1985? **56,200**. | "A new house in nineteen eighty-five? Fifty-six thousand two hundred." |
| 18.2 | 4.7 | And a new house in 2026? **≈ 262,000**. | "And a new house in twenty twenty-six? About two hundred sixty-two thousand." |
| 23.2 | 4.3 | Same hot dog. **≈ 4.7×** the hot dogs. | "Same hot dog. About four point seven times the hot dogs." |

### The maths

**Rule:** count = cost ÷ $1.50, shown to the nearest whole hot dog, with "≈" unless the division is exact. The VO rounds for speech: exact if whole; below 1,000 to the unit; 1,000-9,999 to the 100; 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Your Costco membership | $65 ÷ $1.50 | 43.3333 | ≈ 43 | ≈ 43 |
| An iPhone 18 Pro | $1,199 ÷ $1.50 | 799.3333 | ≈ 799 | ≈ 799 |
| An average new car | $50,089 ÷ $1.50 | 33,392.6667 | ≈ 33,393 | ≈ 33,000 |
| A median new house in 1985 | $84,300 ÷ $1.50 | 56,200 (exact) | 56,200 | 56,200 |
| A median new house in 2026 | $393,700 ÷ $1.50 | 262,466.6667 | ≈ 262,467 | ≈ 262,000 |
| Verdict ratio | $393,700 ÷ $84,300 | 4.6702 | ≈ 4.7× | ≈ 4.7× |

- The ratio is the same in hot dogs and in dollars (262,466.67 ÷ 56,200 = 4.6702), because the unit price never moved. The check asserts this.
- **Requested kit option (`lookOpts.bigUnit`):** "1 block = 1,000 hot dogs" from 10,000 up, which gives **33 / 56 / 262 blocks** for the car, the 1985 house and the 2026 house. See the kit note at the end.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| Costco hot dog + soda, same price since 1985 | $1.50 | 13 ABC (WTVG/Gray), "Costco's iconic $1.50 hot dog combo debuts new change for the first time in decades", **2026-04-29**. The combo now offers a 20 oz soda or bottled water, still $1.50. https://www.13abc.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/ | NPR via HPPR, "Costco hot dogs have cost $1.50 since the 1980s. Here's why prices aren't changing", **2024-06-04**. https://www.hppr.org/2024-06-04/costco-hot-dogs-have-cost-1-50-since-the-1980s-heres-why-prices-arent-changing. Also Scripps News (CEO Ron Vachris: "will not change as long as I'm around"; date not captured): https://www.scrippsnews.com/business/company-news/costcos-1-50-hot-dog-combo-faces-inflation-the-ceos-answer |
| Costco Gold Star membership, from 2024-09-01 | $65 a year | Axios, "Costco membership fees increase Sunday: What to know", **2024-08-31**. https://www.axios.com/2024/08/31/costco-membership-cost-increase-2024-renewal-price | Disney Food Blog, **2024-07-11** (on Costco's 2024-07-10 announcement; first increase since 2017). https://disneyfoodblog.com/2024/07/11/costco-is-raising-membership-prices-how-much-more-will-you-be-paying. 2026 coverage (search 1) still describes the 2024 rise to $65 as the latest. |
| iPhone 18 Pro, US starting price (announced 2026-09-09) | $1,199 | MacRumors, "iPhone 18 Pro Starts at $1,199, Pro Max at $1,299", **2026-09-09**. https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/ | Appleosophy, "Pre-orders for the iPhone 18 Pro series are now live", **2026-09-12**. https://appleosophy.com/2026/09/12/pre-orders-for-the-iphone-18-pro-series-are-now-live/ |
| Kelley Blue Book average new-vehicle transaction price, August 2026 | $50,089 | Cox Automotive, "August 2026 ATP report" (data tables PDF alongside), **2026-09-10**. https://www.coxautoinc.com/insights/august-2026-atp-report/ | KBB press release via Cision (WBOY), "Average New-Vehicle Transaction Price Moves Back Above $50,000 in August", **2026-09-10**. https://digital-release.wboy.com/business/press-releases/cision/20260910LA45270/kelley-blue-book-report-average-new-vehicle-transaction-price-moves-back-above-50000-in-august |
| Median sales price of new houses sold, August 2026 | $393,700 | U.S. Census Bureau / HUD, New Residential Sales, August 2026, **released 2026-09-24**. https://www.census.gov/construction/nrs/pdf/newressales_202608.pdf | First Trust, "New single-family home sales increased 6.4% in August", **2026-09-24**. https://www.ftportfolios.com/Commentary/EconomicResearch/2026/9/24/new-single-family-home-sales-increased-6.4percent-in-august |
| Median sales price of new houses sold, 1985 (annual) | $84,300 | FRED (St. Louis Fed), series MSPNHSUSA (Census data), 1985 value. https://fred.stlouisfed.org/data/MSPNHSUSA | HUD, U.S. Housing Market Conditions, historical table 8. https://www.huduser.gov/periodicals/ushmc/summer03/histdat08.htm. Also GOBankingRates, "How Much House Could $500K Buy in the 80s vs. Today" (date not captured). https://www.gobankingrates.com/?p=1938847 |

**Notes on the inputs**
- The $48,397 "September" figure that also turned up in the KBB search matches KBB's **September 2024** release ("new vehicle prices end Q3 lower year over year"). KBB normally publishes September data in mid-October, so August 2026 is the latest month as of 2026-10-07.
- NAR's existing-home median (round 1 used $429,100) is a different measure. 08a uses the Census new-house series for both years, so the two houses compare like for like.

### Assumptions (footer, on screen at t = 0)

> Hot dog + soda = $1.50, same since 1985

The basis of each rung is in its label (median new house; average new car).
- **Not shown on screen:** the car and house prices are sticker prices, not inflation-adjusted. That is the point of the frozen ruler, and the caption says so.
- The 1985 figure is an annual median and the 2026 figure is August 2026, the latest month.

### Caption / description

> Cost in units of Costco hot dogs. The $1.50 hot dog + soda hasn't changed since 1985, so it's the one ruler that never stretched.
> A median new house: 56,200 hot dogs in 1985. ≈ 262,467 in 2026. Same hot dog, ≈ 4.7× the hot dogs.
> (Costco $65 Gold Star; iPhone 18 Pro $1,199; KBB average new car $50,089, Aug 2026; Census median new house $84,300 in 1985 and $393,700 in Aug 2026. Sticker prices, not inflation-adjusted. Maths, not advice.)
> #costco #hotdog #housingmarket #moneymath

### Pinned comment

> Yes, these are sticker prices, not inflation-adjusted. That's the point of the hot dog: Costco never raised it, so it's the one ruler that didn't stretch. In dollars the house went $84,300 → $393,700, the same ≈ 4.7×. What should we price in hot dogs next?

### Per-platform notes

- **YouTube Shorts (home of every P8 breakout):**
  - Title exactly "Cost in Units of Costco Hot Dogs".
  - No number in the title, no CTA, a hard loop.
  - A/B test an SFX-only cut (thud per cut, roll ticks, hit + cash on the finale, no VO, captions off so the label stack does the talking) against the VO cut. HD Guy's 30.6M short has no voice at all.
- **Instagram Reels:**
  - VO cut with captions on.
  - Cover: the finale frame (≈ 262,467 over the full stack).
  - Caption line 1: "Same hot dog. ≈ 4.7× the hot dogs."
- **TikTok:**
  - VO cut.
  - Caption line 1 states the verdict and asks "what next?"
  - The Costco-fan audience is the tribe; #costco #costcofinds.

---

## 08b · Becker Rig · "Cost in hours of work at $15 an hour"

**Spec:** `studio/specs/08b-becker-rig-hours-at-15.json` · **30.0 s** · captions on · lints clean. The Becker Rig `unit-ladder` format is still a stub in the kit, so `lookOpts` carries the staging.

**Platform title:** Cost in Hours of Work at $15 an Hour
**On-screen hook (header):** Cost in hours of work / at **$15 an hour**
**Footer (t = 0):** ≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax

### Why this hook

**Modelled on:**
1. **H01 / H04, HD Guy, "Cost in Units of RTX 5090" (30,617,461, 62.49x) and "Cost in Units of Starbucks Lattes" (9,858,084, 106.16x).** The "Cost in [unit]" rule-as-title grammar, with the unit being an hour of your own work.
2. **H57, Yannick, "Do all 4 if you make $20/hr and watch your finance change"**: 50,206 (2.8x med), https://www.instagram.com/reel/Dd2QzRzRrGT/. The wage in the hook filters the viewer in. His best wage reel was also his lowest wage and smallest goal ("$20/HR → $10K SAVED"), which is why we use $15.
3. **H84, Master Money, "4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make"**: 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. The "what you ACTUALLY make" belief (R5): his first slot is salary × 0.7. Ours is $15 → ≈ $13.10 kept.
- **Contrast we design against: H15, HD Guy, "Wages Visualized In Real Time", 9,025.** A wage alone as spectacle flopped. Ours turns the wage into the ruler for things the viewer buys.

**Becker devices used** (from `research/v2/watch/alan-becker.md` §4 and §6):
- **"Operators are tools":** a TAX snip cuts ≈ $1.90 off the $15 block. The figure then wields "÷ $13.10" and "× 12" as tools.
- **"Results are transformations":** hour blocks become a stack, then 12 stacks, then a car outline, then a house-sized pile.
- **"Scale is shown by the camera":** the pull-back on "× 12".
- **"getFlattened":** the house pile topples onto the figure at the verdict (§7.2 primitives).
- **§6 idea 9, "the counter that overheats"** ($60,000 ÷ 2,080 = $28.85/h): an earning-rate readout as the frame-1 surface. Ours is the $15 block becoming ≈ $13.10, one hour.

**Rules satisfied:**
- **R1:** "$15" is in the header and "≈ $13.10" in the footer at 0.0 s. The figure is holding the $15 block.
- **R2:** one input ($15) and no result in the hook.
- **R3:** you can swap in your own wage; the pinned comment gives the rule and two more wages.
- **R4:** $15 an hour is small, round and earned by many viewers.
- **R5:** the wrong answer is "price ÷ $15" (it's ÷ ≈ $13.10), and "rent is about a week's pay" (it's ≈ 3 weeks).
- **R6:** you, $15 an hour, hours of your life.
- **R7:** each rung is a named item.
- **R8:** 8 words.
- **R10:** "≈ $13.10" is spoken at 3.1 s (snip pop), and the biggest number is last.
- **R11:** the verdict is in the caption.
- **R12:** "≈ 14 years of full-time work".
- **Partial: R9.** The kit's rung count display is not built yet.

**The wrong beliefs it plays on:**
1. "At $15 an hour, a thing costs price ÷ 15 hours." You keep ≈ $13.10, so every count is ≈ 14.5% bigger than the gross-wage guess (15 ÷ 13.1006 = 1.145).
2. "Rent is about a week of work." At the median asking rent it is ≈ 117 hours, almost 3 of a month's ≈ 4.3 work-weeks.

### Beat sheet

| t (s) | On screen (Becker Rig) | VO (caption) |
|---|---|---|
| 0.0 | White stage, floor line. Header; footer. The figure holds a block labelled **$15**. A pair of scissors marked **TAX** hovers | "$15 an hour? After tax, you keep **≈ $13.10**." |
| 1.5-3.1 | Snip: a sliver "≈ $1.90" falls off. At 3.1 (pop) the block reads "≈ $13.10 = 1 HOUR" | (same line) |
| 5.0 | Rung 1: price tag "$1,531 · A MONTH OF RENT". The figure grabs "÷ $13.10" and stacks hour blocks; the counter rolls to **≈ 117** | "A month of rent? **≈ 117 hours**. That's ≈ 3 weeks." |
| 10.4 | Rung 2: "$18,372 · A YEAR OF RENT". He snaps "× 12"; camera pull-back to 12 stacks; **≈ 1,402** | "A year of rent? **≈ 1,400 hours**: ≈ 8 months." |
| 15.8 | Rung 3: "$50,089 · AN AVERAGE NEW CAR". Blocks pour into a car outline; **≈ 3,823** | "An average new car? **≈ 3,800 hours**." |
| 20.0 | Rung 4: "$393,700 · A MEDIAN NEW HOUSE". A house-sized pile rises over him; **≈ 30,052** | "A median new house? **≈ 30,000 hours**." |
| 23.5 | The pile topples and flattens the figure (thud, shake). Gag tag "≈ 14 YEARS". Verdict: "**≈ 14 years** of full-time work. / Every cent you keep." | "That's **≈ 14 years** of full-time work. Every cent you keep." |
| 28.2-30.0 | Hold. He pops back up holding the $15 block (loop to frame 1) | (none) |

### Guide VO script (6 lines, about 67 spoken words, 25.8 s of speech in a 30 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.7 | $15 an hour? After tax, you keep **≈ $13.10**. | "Fifteen dollars an hour? After tax, you keep about thirteen ten." |
| 5.0 | 5.1 | A month of rent? **≈ 117 hours**. That's ≈ 3 weeks. | "A month of rent? About a hundred seventeen hours. That's about three weeks." |
| 10.4 | 5.1 | A year of rent? **≈ 1,400 hours**: ≈ 8 months. | "A year of rent? About fourteen hundred hours: about eight months." |
| 15.8 | 3.9 | An average new car? **≈ 3,800 hours**. | "An average new car? About thirty-eight hundred hours." |
| 20.0 | 3.2 | A median new house? **≈ 30,000 hours**. | "A median new house? About thirty thousand hours." |
| 23.5 | 4.7 | That's **≈ 14 years** of full-time work. Every cent you keep. | "That's about fourteen years of full-time work. Every cent you keep." |

### The maths

**Take-home per hour** (2026, single filer, standard deduction, wages only, no state income tax):

| Step | Formula | Value |
|---|---|---:|
| Gross a year | $15 × 2,080 hrs (40 × 52) | $31,200 |
| Taxable | $31,200 − $16,100 standard deduction | $15,100 |
| Federal income tax | 10% × $12,400 + 12% × ($15,100 − $12,400) | $1,564.00 |
| FICA | 7.65% × $31,200 (below the $184,500 wage base) | $2,386.80 |
| Kept a year | $31,200 − $1,564.00 − $2,386.80 | $27,249.20 |
| **Kept per hour (the unit)** | $27,249.20 ÷ 2,080 | 13.1006 → **≈ $13.10** |
| Snip per hour | $15 − 13.1006 | 1.8994 → **≈ $1.90** |

**Rule:** hours = cost ÷ 13.1006 (the unrounded hourly). Shown to the nearest hour with "≈", and spoken to the 100, or to the 1,000 at 10,000 and up.

| On screen | Formula | Exact | Shown | VO / conversion |
|---|---|---:|---:|---|
| A month of rent | $1,531 ÷ 13.1006 | 116.865 | ≈ 117 | ≈ 117 hours; ÷ 40 hrs = 2.922 → "≈ 3 weeks" |
| A year of rent | ($1,531 × 12 = $18,372) ÷ 13.1006 | 1,402.381 | ≈ 1,402 | ≈ 1,400 hours; ÷ (2,080 ÷ 12 = 173.33) = 8.091 → "≈ 8 months" |
| An average new car | $50,089 ÷ 13.1006 | 3,823.419 | ≈ 3,823 | ≈ 3,800 hours |
| A median new house | $393,700 ÷ 13.1006 | 30,052.112 | ≈ 30,052 | ≈ 30,000 hours; ÷ 2,080 = 14.448 → "≈ 14 years" |

- "Every cent you keep" is the assumption made explicit: 14 years only if all take-home pay goes to the house, with no interest.
- **Pinned-comment numbers** (also checked):
  - At $20/hr you keep ≈ $17.12 (85.6%).
  - At $25/hr you keep ≈ $21.14 (84.5%).
  - At $15/hr you keep 87.3%.
  - Same formula, gross × 2,080, minus 2026 federal tax and FICA.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| Median asking rent, vacant for-rent units, Q2 2026 | $1,531/month | U.S. Census Bureau, "Quarterly Residential Vacancies and Homeownership, Second Quarter 2026", **2026-07-28**. https://www.census.gov/housing/hvs/files/qtr226/Q226press.pdf | Same series, Q4 2025: $1,464 (Census, Q425 release), a consistent level. https://www.census.gov/housing/hvs/files/qtr425/Q425press.pdf. This is a primary statistic with a single publisher, and no independent restatement was found within the search budget. |
| KBB average new-vehicle transaction price, Aug 2026 | $50,089 | as 08a | as 08a |
| Median sales price of new houses sold, Aug 2026 | $393,700 | as 08a | as 08a |
| 2026 standard deduction, single | $16,100 | IRS newsroom, "IRS releases tax inflation adjustments for tax year 2026…", **2025-10-09**. https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill | CPA Practice Advisor, **2025-10-09**. https://www.cpapracticeadvisor.com/2025/10/09/irs-adjusts-tax-brackets-standard-deduction-for-2026/170661/ |
| 2026 single brackets: 10% to $12,400; 12% to $50,400 | | IRS Rev. Proc. 2025-32 (**2025-10-09**). https://www.irs.gov/pub/irs-drop/rp-25-32.pdf | Tax Foundation, "2026 Tax Brackets". https://taxfoundation.org/data/all/federal/2026-tax-brackets/ |
| FICA 7.65% (6.2% Social Security to $184,500, plus 1.45% Medicare) | | SSA, "2026 Social Security Changes" fact sheet (Oct 2025). https://www.ssa.gov/cola/factsheets/2026.html | Kiplinger, "Six Changes to Social Security in 2026". https://www.kiplinger.com/retirement/social-security/changes-coming-to-social-security-in-2026 |

- The tax parameters were verified with two sources each by the format 1 writer, in [`01-dead-simple-list.md`](01-dead-simple-list.md) (tax check). They are reused here unchanged, so no search was spent on them.
- At $31,200 a single filer with no children is past the EITC phase-out, so no credit applies.

### Assumptions (footer, on screen at t = 0)

> ≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax

Also assumed: a 40-hour week and 52 weeks (2,080 hours); no benefit premiums or 401(k) deferrals; median asking rent (Census); a car and a house at sticker price, with no loan interest.

### Caption / description

> Cost in hours of work at $15 an hour. After 2026 federal tax + FICA (single, no state tax), $15 an hour keeps ≈ $13.10.
> A month of median rent ($1,531) ≈ 117 hours, almost 3 work weeks. A median new house ($393,700) ≈ 30,052 hours: ≈ 14 years of full-time work, every cent you keep.
> (Rent: Census, Q2 2026. Car: KBB average, Aug 2026. House: Census median new, Aug 2026. Maths, not advice.)
> #hourlywage #rent #housing #moneymath

### Pinned comment

> Your wage? Divide the price by what you KEEP per hour, not by your wage. At $15 you keep 87.3% (≈ $13.10). At $20/hr it's ≈ $17.12 (85.6%), at $25/hr ≈ $21.14 (84.5%), before state tax. What should we price in your hours next?

### Per-platform notes

- **TikTok (lead platform):**
  - Wage reels live here.
  - VO cut, captions on.
  - Caption line 1: "≈ 14 years of full-time work. Every cent you keep."
  - Expect "not every state…" comments; the footer pre-empts them, and the pinned comment answers.
- **Instagram Reels:**
  - Same cut.
  - Cover: the flattened figure under the house pile with "≈ 14 YEARS".
  - Caption line 1 states the verdict.
- **YouTube Shorts:**
  - Title "Cost in Hours of Work at $15 an Hour" (the HD Guy rule-title).
  - No CTA; the loop back to the $15 block.

---

## 08c · Clean Sheet · "What college costs in Big Macs"

**Spec:** `studio/specs/08c-clean-sheet-college-in-big-macs.json` · **27.5 s** · captions on · lints clean. The Clean Sheet `unit-ladder` format is still a stub in the kit.

**Platform title:** College Cost in Units of Big Macs
**On-screen hook (header):** What college costs / in **Big Macs**
**Footer (t = 0):** 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26 averages, tuition & fees

### Why this hook

**Modelled on:**
1. **H11, HD Guy, "Cost in Units of Big Macs"**: 1,748,759 views (56.76x), https://www.youtube.com/shorts/Hv6aZR4hUEI. The same unit, already proven.
2. **H04, HD Guy, "Cost in Units of Starbucks Lattes"**: 9,858,084 (106.16x), https://www.youtube.com/shorts/NHbMe2F_JXY. The footer device ("Tall Latte ☕ = $4.45" becomes "1 Big Mac = $6.22") and the climb to a screen-filling finale.
3. **H64, Gage Heward, "What $1 costs you by age"**: 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. Also **H32, FinCalC, "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate"**: 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. A row for every viewer (R3): here, a rung per kind of student.
- **Contrast:** HD Guy's "University Degrees" *as the unit* got 64,954. We use college as the subject and a cheap, familiar unit as the ruler.

**Rules satisfied:**
- **R1:** step ① is typing "$4,150 ÷ $6.22 =" at 0.0 s; "$6.22" is in the footer and the badge.
- **R2:** no number in the header. The one input ($6.22) sits in the badge and footer.
- **R3:** every viewer finds their row: community college, in-state, out-of-state, private.
- **R4:** a Big Mac is small and familiar, and the viewer has paid for one.
- **R5:** "college costs its tuition" (the finale is all-in), and "in-state is cheap" (≈ 1,921 Big Macs a year).
- **R7:** school types are named.
- **R8:** 6 words.
- **R9:** 5 numbered step circles are visible empty from frame 1.
- **R10:** the first result by about 2 s; the biggest last.
- **R11:** the verdict is in the caption.
- **R12:** "a Big Mac a day for ≈ 115 years".
- **Partial: R6.** No "you" in the header (the VO says "a year of…").

**The wrong beliefs it plays on:**
1. "A degree costs its tuition." The finale prices the whole thing, all-in, for 4 years.
2. "State school is the cheap option." Even in-state tuition alone is ≈ 1,921 Big Macs a year.

### Beat sheet

| t (s) | On screen (Clean Sheet) | VO (caption) |
|---|---|---|
| 0.0 | Page; title "What college costs / in **Big Macs**"; black badge "1 BIG MAC = $6.22"; footer; ① "Community college, 1 year" typing "$4,150 ÷ $6.22 ="; ②-⑤ empty circles; pointer at ① | "A year of community college? **≈ 667 Big Macs**." |
| ≈ 2.0 | ① green highlighter wipes in: **≈ 667** (click) | |
| 4.6 | ② "State school, in-state, 1 year": "$11,950 ÷ $6.22 =" → **≈ 1,921** | "A state school, in-state? **≈ 1,900**." |
| 8.4 | ③ "State school, out-of-state, 1 year": "$31,880 ÷ $6.22 =" → **≈ 5,125** | "Same school, out-of-state? **≈ 5,100**." |
| 11.9 | ④ "Private college, 1 year": "$45,000 ÷ $6.22 =" → **≈ 7,235** | "A private college? **≈ 7,200** a year." |
| 16.1 | ⑤ "Private college, 4 years, all-in": "4 × $65,470 ÷ $6.22 =" → blue final box **≈ 42,103** (84 px, 3% push-in) | "4 years private, all-in? **≈ 42,000 Big Macs**." |
| ≈ 18.5 | Check line types: "check: ≈ 42,103 ÷ 365 days ≈ 115 years" | |
| 20.0 | Verdict: "A Big Mac a day / for **≈ 115 years**." (ding) | "That's a Big Mac a day for **≈ 115 years**." |
| 24.7-27.5 | The finished sheet holds, then the results clear to the frame-1 state (loop) | (none) |

### Guide VO script (6 lines, about 59 spoken words, 22.7 s of speech in a 27.5 s video)

| t | d | Caption text (spec) | Read it as |
|---|---|---|---|
| 0.0 | 4.3 | A year of community college? **≈ 667 Big Macs**. | "A year of community college? About six hundred sixty-seven Big Macs." |
| 4.6 | 3.5 | A state school, in-state? **≈ 1,900**. | "A state school, in-state? About nineteen hundred." |
| 8.4 | 3.2 | Same school, out-of-state? **≈ 5,100**. | "Same school, out-of-state? About fifty-one hundred." |
| 11.9 | 3.9 | A private college? **≈ 7,200** a year. | "A private college? About seventy-two hundred a year." |
| 16.1 | 3.5 | 4 years private, all-in? **≈ 42,000 Big Macs**. | "Four years private, all-in? About forty-two thousand Big Macs." |
| 20.0 | 4.7 | That's a Big Mac a day for **≈ 115 years**. | "That's a Big Mac a day for about a hundred fifteen years." |

### The maths

**Rule:** Big Macs = cost ÷ $6.22, to the nearest whole Big Mac, with "≈". The VO rounds for speech: below 1,000 to the unit, 1,000-9,999 to the 100, 10,000 and up to the 1,000.

| On screen | Formula | Exact | Shown | VO |
|---|---|---:|---:|---:|
| Community college, 1 year | $4,150 ÷ $6.22 | 667.203 | ≈ 667 | ≈ 667 |
| State school, in-state, 1 year | $11,950 ÷ $6.22 | 1,921.222 | ≈ 1,921 | ≈ 1,900 |
| State school, out-of-state, 1 year | $31,880 ÷ $6.22 | 5,125.402 | ≈ 5,125 | ≈ 5,100 |
| Private college, 1 year | $45,000 ÷ $6.22 | 7,234.727 | ≈ 7,235 | ≈ 7,200 |
| Private college, 4 years, all-in | 4 × $65,470 = $261,880; ÷ $6.22 | 42,102.894 | ≈ 42,103 | ≈ 42,000 |
| Check / verdict | 42,103 ÷ 365 (one a day) | 115.351 | ≈ 115 years | ≈ 115 years |

- The verdict holds on the unrounded count too: 42,102.894 ÷ 365 = 115.35 → 115 (asserted).
- **Pinned-comment number** (checked): 4 years in-state, all-in = 4 × $30,990 = $123,960 → ≈ 19,929 Big Macs.

### Sources (all checked 2026-10-07)

| Input | Value | Source 1 | Source 2 |
|---|---|---|---|
| US Big Mac price, July 2026 | $6.22 | **The Economist, Big Mac index dataset** (GitHub `TheEconomist/big-mac-data`, `output-data/big-mac-raw-index.csv`, row `2026-07-01, USA, 6.22`; downloaded 2026-10-07). https://github.com/TheEconomist/big-mac-data. The same file has $6.12 for Jan 2026 and $6.01 for Jul 2025. | Econlife, "Big Mac index", **July 2026**. https://econlife.com/2026/07/big-mac-index-3/. Also TrendForce DataTrack, "The Big Mac index: United States". https://datatrack.trendforce.com/Chart/content/4204/the-big-mac-index-united-states |
| 2025-26 average published tuition & fees: public two-year in-district $4,150; public four-year in-state $11,950; out-of-state $31,880; private nonprofit four-year $45,000 | | College Board, *Trends in College Pricing and Student Aid 2025* (2025-26 prices; exact release date not captured). https://research.collegeboard.org/media/pdf/Trends-in-College-Pricing-and-Student-Aid-2025-final_0.pdf and its newsroom release https://newsroom.collegeboard.org/trends-college-pricing-and-student-aid-report-published-tuition-prices-public-institutions-and | Achievable, "2025 Trends in College Costs and Aid" (an independent summary of the same report). https://achievable.me/exams/sat/resources/2025-trends-in-college-costs-and-aid/ |
| 2025-26 average total budget, private nonprofit four-year (tuition, fees, housing, food, books, transport, other) | $65,470; public in-state $30,990 (pinned) | as above | as above |

- **Verification note:** collegeboard.org is blocked by the egress proxy, so the College Board figures come from the search-result text that quotes the report.
- The "budget" figures are College Board's estimated full-time undergraduate budgets. "All-in" is our shorthand for them.

### Assumptions (footer, on screen at t = 0)

> 1 Big Mac = $6.22 (Jul 2026) · College Board 2025-26 averages, tuition & fees

- Sticker (published) prices, before grants, scholarships or aid.
- The finale is the full average budget × 4 years, at today's prices (no tuition growth).

### Caption / description

> What college costs in Big Macs (US Big Mac $6.22, The Economist's Big Mac index, Jul 2026; College Board 2025-26 average published tuition & fees).
> Community college ≈ 667 a year. In-state ≈ 1,921. Out-of-state ≈ 5,125. Private ≈ 7,235.
> Four years private, all-in: ≈ 42,103. That's a Big Mac a day for ≈ 115 years. Maths, not advice.
> #college #tuition #bigmac #moneymath

### Pinned comment

> These are sticker prices (published tuition & fees), before any grants or scholarships. Four years in-state, all-in ($123,960): ≈ 19,929 Big Macs. What did your school really cost, in Big Macs?

### Per-platform notes

- **YouTube Shorts:**
  - Title "College Cost in Units of Big Macs" (HD Guy grammar plus the subject).
  - No CTA; the loop clears the sheet back to frame 1.
- **Instagram Reels:**
  - Cover: the finished sheet (all five rows filled, blue final box). The sheet is the screenshot people save.
  - Caption line 1: "Find your school."
  - Tag the back-to-school and #studentloans crowd.
- **TikTok:**
  - VO cut, captions on.
  - Caption line 1 states the verdict.
  - Comments will argue about net price against sticker price; the pinned comment invites exactly that.

---

## Kit notes (for the look builders)

- **Scoreboard (08a): `lookOpts.bigUnit` is a request.** The current kit packs icons down to a 5 px cell, so any count above about 12,000 fills the stage.
  - In the render, the car (≈ 33,393), the 1985 house (56,200) and the 2026 house (≈ 262,467) all show the same full green block. That hides the twist.
  - The spec asks for `bigUnit: { from: 10000, per: 1000, legend: "1 block = 1,000 hot dogs" }`, which gives 33 / 56 / 262 blocks, so the 2026 pile is visibly ≈ 4.7× the 1985 pile.
  - The kit ignores the key until it is built, and it renders fine without it.
- **Becker Rig (08b) and Clean Sheet (08c):** their `unit-ladder` formats are stubs ("TODO unit-ladder") as of this writing.
  - The specs follow the FORMATS.md contract, and the staging lives in `lookOpts`:
    - 08b: `opener` (the TAX snip), `actions` per rung, and `gag`. This uses the same shape as 01c's Becker spec.
    - 08c: `badge`, and `check` (the check line under the final answer).
  - Both lint clean through the shared chrome (header, footer, captions, verdict).

## Search log (14 of 14)

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

**Direct data download (not a search):** The Economist's `big-mac-data` repository on GitHub, for the $6.22 row. Every other host was blocked to direct fetches.

## Caveats

- **P8 has one benchmark channel (HD Guy), and its spectacle is military footage.** Nothing in the benchmark shows that a personal-finance subject works in this format, so all three teasers test that hypothesis. The strongest hedge is 08c's row-per-viewer structure (R3), borrowed from the P7 winners.
- **08a's twist is about sticker prices.** It is honest as stated, and the caption and pinned comment say so. Expect "inflation!" comments; those are engagement, not an error.
- **Single-publisher figures:**
  - The rent ($1,531) is a Census figure, cross-checked only against the same series' previous quarter.
  - The College Board figures could not be opened at the source and were read from search text plus one independent summary.
- **The VO word counts are estimates** (2.6 words/s; years read as two words, money with cents as three). Every line has at least 0.02 s of slack (08a's car line is the tightest: 3.1 s for an estimated 3.08 s).
