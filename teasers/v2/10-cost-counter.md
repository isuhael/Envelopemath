# Format 10: real-time cost counter, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (round-2 revision), hook pass 2026-10-08 (10b's hook replaced). What changed and why is in the **Review log** at the end.
**Format:** `cost-counter`. No hook pattern of its own in the hook bank ("–"). The hooks borrow the grammar of P4, P5, P6, P8 and P9 winners (quoted under each teaser).
**Lane:** a real-time dollar counter at a verified rate (interest on the US debt, new US debt, a mega-company's sales and profit per second)
**Files:**
- Specs:
  - [`studio/specs/10a-scoreboard-debt-interest-live.json`](../../studio/specs/10a-scoreboard-debt-interest-live.json)
  - [`studio/specs/10b-becker-rig-debt-vs-your-pay.json`](../../studio/specs/10b-becker-rig-debt-vs-your-pay.json)
  - [`studio/specs/10c-live-sheet-amazon-makes.json`](../../studio/specs/10c-live-sheet-amazon-makes.json)
- Check: [`teasers/v2/checks/10-cost-counter.py`](checks/10-cost-counter.py). Run `python3 teasers/v2/checks/10-cost-counter.py`. It recomputes every number from the sourced inputs, rebuilds every display string, compares them with the three specs and with the caption and pinned-comment numbers in this file, prints a table and exits 1 on any mismatch.
  - It reports **853 checks, 0 failures** and exits 0 (after the 2026-10-08 hook pass; it was 861 before 10b's new hook replaced the house, $1 million and car checks with the minute, crossover and 3/10/20-year checks).
  - New in this round: every footer must carry the viewer-owned pay figure ("$1,251 … × 52") at 0.0 s; every header must ask a question; **one rounding per quantity** (any number within 5% of a computed quantity, in a spec string, a VO line, a caption or a pinned comment, must be that quantity's one shown rounding); and a list of banned overclaims ("live", "in real time", "fiscal 2026" for a 364-day window, "Under 1 second" as a universal claim).
  - As a test I broke one thing per teaser in a scratch copy: the 10a footer without the pay figure, 10b's caption back to "≈ $78,006", and 10c's vo[6] back to "≈ $2,500". It exited 1 with 7 failures, naming all three. Run against the round-1 captions, the new guards flagged "$30,758", "$78,006", "$22,733" and "fiscal 2026".

**How the facts were checked**
- **Searches:** this round used **8 of the 10** web searches allowed (round 1 used 13 of 14).
- **Fetches were blocked.** The egress proxy blocked every fetch: `api.fiscaldata.treasury.gov` (the Debt to the Penny API, by curl and by fetch), primerates.com, crfb.org, cbo.gov and thetrading.tools. Each figure below therefore rests on search results: the publisher's page, its URL and date, and the search engine's quote of the page. Pages marked **[click-check]** should be opened once before posting.
- **Two sources per on-screen figure.** Every rate input has a primary or official source plus a second publisher, or two confirmed readings of the same official series (10b).
- **Nothing unverifiable on screen.** 10b no longer claims a fiscal-year figure, because the 2026-09-30 reading could not be confirmed (Review log, item V4).
- **No market data.** No teaser uses a market price or a forecast on screen.

**Studio linter:** `node src/cli.mjs check` passes on all three specs: **3/3 clean, 0 errors, 0 warnings**.
- The Scoreboard, Live Sheet and Becker Rig `cost-counter` modules are all built (working tree), so all three specs are linted with their real counters.
- I rendered stills at 0 s, 1.5 s and the verdict for all three (10b again at 0 / 1.5 / 3 / 25.5 / 33.4 s after the hook pass). In each, the header, the two-part footer, the caption band and the verdict fit their zones.
- Everything in `lookOpts` is a proposal for the kit builder. Each spec tells its story from the contract fields alone: the header asks, the footer carries the pay figure and the working, the counter runs, the verdict answers.

---

## (a) The format in 5 lines

1. **Mechanic** ([`04-formats.md`](../../research/v2/04-formats.md), rank 10, viability 3):
   - one continuous stretch;
   - a dollar counter ticks at a fixed real rate;
   - round milestones pull the viewer through;
   - it ends at the peak, with no CTA.

   It is money piling up over real seconds, **not** a "time to reach $X" clock.
2. **Evidence** (HD Guy, [`watch/hd-guy.md`](../../research/v2/watch/hd-guy.md), Pattern B):
   - "F-16 Afterburner Fuel Cost in Real Time": **28,289,823 views, 110.85x**, 30 s, watched. https://www.youtube.com/shorts/2DtXV2uxM_E
     - Frame 1 is only a green "$0.30" counter in the top bar.
     - It passes $100 at about 11 s and $200 at about 22.5 s, and ends at $247.00.
   - Siblings: "A-10 Warthog Cost in Real time" 1,419,522 (0.8x), "Freedom Flyover Cost in Real Time" 895,484 (7.45x), "B-52 Fuel Cost in Real Time" 368,448. The median of the 9 "in real time" titles is about 261K (URLs unknown).
3. **What wins:**
   - the title states the rule and carries no number;
   - the counter is already running at 0.0 s;
   - round milestones are the open loop ($100, $200);
   - 0 cuts;
   - it ends on the biggest number, and comments argue about the input ("JP-8 price vs full cost per flight hour").
4. **What we add** (04-formats twist): the working in a footer, milestones the viewer owns (their year of pay, a house), **a question the counter answers** (R5, R11), and a verdict a viewer can repeat (R12). HD Guy's counter never says what the number means.
5. **Pitfall, and why it is a 3:**
   - The format lives on spectacle footage we will not have.
   - Its civilian money topics flopped: "Wages Visualized In Real Time" got **9,025** and "Cost Of Data Centers In Real Time" got **8,288** (URLs unknown). HD Guy's government-money titles flopped too: "Real-Time Cost Of Alaska Summit 2025" 44,045 and "The $1Trillion US Defense Budget in Action" 12,051.

   So the counter is never the hook on its own. Every teaser below opens on a **question** with a wrong answer the viewer already holds, puts the viewer's pay figure on screen at 0.0 s (R1, R3), and ends on a lopsided verdict (R12).

### Decisions shared by all three

- **The counter is the answer machine; the header is the question.**
  - 10a: "How much comes off the debt?" The counter shows $1 million of interest; the answer is $0.
  - 10b: "40 years of your pay vs 1 minute of new US debt. Which is bigger?" The counter eats the 40 years in ≈ 33 seconds, 55% of the minute.
  - 10c: "How much does Amazon really make?" Two counters (sales and kept) answer it from frame 1.
- **The counter starts at frame 1, at $0** in all three, so "since you hit play" is literal: the number on screen is what passed while this viewer watched. The loop restarts the count, which is honest on every replay.
  - 10b's 2.4 s armed pause and its ding were dropped in the hook pass (2026-10-08): nothing moved in its first 1.5 s.
- **The viewer's own number is on screen at 0.0 s in every teaser:** the footer carries the pay basis ($1,251 a week × 52 = **$65,052**, BLS Q2 2026). The checker enforces it.
  - The milestones are the viewer's yardsticks and repeat across the series: a year of median full-time pay ($65,052) and a median new house (**$393,700**, Census, Aug 2026). 10b counts in years of that pay (3, 10, 20 and 40).
  - Pay is the first payoff in every teaser: a year of median pay at 2.1 s (10a) and 2.9 s (10c); 3 years of median pay at 2.5 s in 10b (its first $65,052 block goes at 0.83 s in the proposed block-stack).
  - The swap-in rule for the viewer's own pay (R3): the VO says it in 10a ("Yearly pay ÷ 30,800 = your seconds."); the pinned comments say it in 10b and 10c.
- **Rounding: one rounding per quantity.** A quantity shows one rounded figure everywhere it appears: spec strings, captions (the VO), formula bar, caption text and pinned comment. The checker enforces it.
  - Every rounded number shows "≈" on screen and in the captions, including the counters' final readings.
  - Rates: 3 significant figures (≈ $30,800, ≈ $22,700), 2 for 10b (≈ $78,000 a second, ≈ $4.7 million a minute), and Amazon's kept rate to the dollar (≈ $2,464) because the formula bar divides by it.
  - Times: whole seconds everywhere, the Live Sheet included (≈ 3 s, ≈ 17 s, ≈ 26 s). The rates are year averages, so tenths of a second would be false precision. The one exception is the 10a caption's "≈ 2.1 seconds" for a year of median pay, which is never shown beside a different rounding.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$65,052" = 4 words, "2025" = 2, "US" = 2).
- **Sync:** each milestone passes within 0.29 s of the start of the VO line that names it, and the on-screen beat (label, thud, row) lands on the pass itself. The 0.29 s case is 10a's first pass: the opening question runs to 2.4 s and the pay passes at 2.11 s. 10b's gaps are 0.03-0.14 s (3, 10, 20 and 40 years). Every other gap is 0.07 s or less.
- **Lane check:**
  - These are counters at a real rate, over one continuous stretch.
  - No find-your-row table: 10c has 2 milestone rows and 1 kept row, not one per viewer.
  - No unit stacks (that is `unit-ladder`). 10b's proposed 40-block stack is a prop the counter eats, not a ladder of units.
  - No race between two assets (`chart-race`); 10c's two counters are one company's sales and profit, not rival assets.
  - No "instead of paying" (`pov-race`).
  - 10c's makes-vs-keeps is a **per-second rate** comparison, not a split of one sum into shares (that is `split-sheet`).
- **10a and 10b are both about the federal debt, but they ask different questions:**
  - 10a is the interest, and what it does to the debt (nothing: "$0 off the debt");
  - 10b is the growth of the debt itself, against the viewer's working life (40 years of pay vs 1 minute).
  - Post them at least a week apart, or as a labelled pair ("Part 2: the debt itself").
- **Tone:**
  - Factual and non-partisan: no party, no person and no policy is named.
  - Educational maths only, no advice language.
  - No logos. "Amazon" appears only as text.

---

## 10a: Scoreboard: "US debt interest since you hit play. How much comes off the debt?"

| | |
|---|---|
| Look | `scoreboard` (black bars, neon-green odometer in the top bar, label stack in the bottom bar, footer working) |
| Spec | `studio/specs/10a-scoreboard-debt-interest-live.json` (36.5 s) |
| Platform title | **US Debt Interest Since You Hit Play: How Much Comes Off the Debt?** |
| On-screen hook (header) | **US DEBT INTEREST SINCE YOU HIT PLAY. / HOW MUCH COMES OFF THE DEBT?** (13 words, 2 lines; "PLAY" in green, "OFF THE DEBT" in red) |
| Frame 1 | Header. The odometer reads **$0** and starts rolling at once. The label stack shows "≈ $30,800 / EVERY SECOND". Footer: "FY25: $970B ÷ 31,536,000 s · pay $1,251 × 52". Four ladder pips show the countable loop, and the first milestone's ghost icon (a year of pay) starts filling. Proposed for the kit: the pips labelled with their amounts, and a red "OFF THE DEBT  $___" cell that stays empty until the verdict |
| Footer | FY25: $970B ÷ 31,536,000 s · pay $1,251 × 52 |

**Topic vs the seed:**
- Kept: interest on the US national debt per second, from the latest full-year Treasury net-interest figure (FY2025: $970 billion).
- Added: **the question "how much comes off the debt?"** and its answer, **$0**. Net interest is the cost of carrying the debt; none of it repays principal. That gives 10a an angle 10b cannot share.
- Why not FY2026: Treasury's final statement for FY2026 (which ended 2026-09-30) is due about 2026-10-13 (the 8th business day of October; 2026-10-12 is a federal holiday). It is not out today. FY2026 interest is running higher, so this counter runs slow, and the caption says so in the past tense with the latest actual (CBO, through August). See the posting plan under the per-platform notes.

**Wrong belief it exploits**
1. **"Some of the interest must pay the debt down."** The header asks, and the verdict answers: **$0** of it does. Interest is not principal; the counter is pure carrying cost.
2. "A few seconds of a government budget line is small change." In fact a year of median pay goes in **2.1 s**.
3. "$1 million is a lot of money." In fact it takes **≈ 33 seconds**.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, rolling), "≈ $30,800 every second" and the footer's "$970B ÷ 31,536,000 s · pay $1,251 × 52" are on screen at 0.0 s |
| R2 | The hook line holds no number and no result (HD Guy's titles carry none: "the number is the payoff"). The inputs sit in the footer |
| R3 | The viewer's pay basis ($1,251 × 52) is in the footer at 0.0 s and passes at 2.1 s. The swap-in rule is spoken at 8.5 s ("Yearly pay ÷ 30,800 = your seconds.") and repeated in the pinned comment |
| R4 | The yardsticks are a year of pay and a house. "$970 billion" appears only as the footer's working and once in the VO |
| R5 | The question implies the wrong answer "some of it" and the verdict breaks it ($0), with no "most people think" |
| R6 | You ("since you hit play") + an amount (the counter) + a horizon (this video). The money is the government's, so this is a partial pass |
| R7 | The VO opens on the question, not on a topic label ("US debt interest. Live." is gone). The milestones are named; the proposed pip labels name them at frame 1 |
| R8 | 13 words, 2 lines |
| R9 | 4 milestone pips are visible from 0.0 s and light as they are passed; the proposed "OFF THE DEBT $___" cell stays open to the end |
| R10 | First payoff at 2.1 s (a year of median pay). The biggest number ($1 million) comes last, with the $0 |
| R11 | The question is on screen and in the title; the caption leads with the verdict |
| R12 | A lopsided pair to repeat: **$1 million in ≈ 33 seconds, $0 of it off the debt** |

**Benchmark hooks it is modelled on**
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**, frame 1 "$0.30". **28,289,823 views, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: a counter already rolling at 0.0 s, round milestones as the open loop, 0 cuts, and an ending on the peak with no CTA.
- **H49, The Debt Freedom Project, "What's the difference between daily payments and one extra lump sum payment each month?"** (frame 1), caption "Yes, daily payments work!". **382,100, 289.1x.** https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
  - Borrowed: a question about how a debt is paid on screen at frame 1, and a verdict that takes a side (P5, R11).
- **H84, Master Money, "Take your salary and multiply it by 0.7…"** (spoken). **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the spoken swap-in instruction ("Yearly pay ÷ 30,800").
- **Contrast, H52, "Credit Card Debt Payoff Strategies"** (a topic label at frame 1 and in the first line): **90,600**, that creator's lowest. The round-1 opener "US debt interest. Live." made the same move.

**Beat sheet** (milestone pass time = value ÷ $30,758.50 a second)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Odometer **$0**, rolling. Label "≈ $30,800 / EVERY SECOND". Footer with the pay figure. 4 pips (proposed: labelled). Proposed: red "OFF THE DEBT  $___" cell | "How much comes off the debt?" (0.0-2.4) |
| 2.11 | The counter passes **$65,052**. Pip 1 lights. Label slams: "$1,251 × 52 = $65,052 / A YEAR OF MEDIAN PAY". Thud | "There goes a year of median pay." (2.4-5.2) |
| 5.3 | Label back to the rate: "≈ $30,800 / EVERY SECOND" | "≈ $30,800 a second." (5.3-8.4) |
| 8.5 | (counter running, about $261,000 at this point) | "Yearly pay ÷ 30,800 = your seconds." (8.5-12.8) |
| 12.80 | The counter passes **$393,700**. Pip 2. Label "$393,700 / A MEDIAN NEW HOUSE". Thud | "A median new house. Gone." (12.8-14.8) |
| 15.2 | Label "≈ $30,800 × 3,600 s / ≈ $111 MILLION AN HOUR" | "That's ≈ $111 million an hour." (15.2-18.7) |
| 21.15 | The counter passes **$650,520**. Pip 3. Label "$65,052 × 10 = $650,520 / 10 YEARS OF MEDIAN PAY". Thud | "10 years of median pay." (21.1-23.1) |
| 23.4 | (counter running) | "At fiscal 2025's rate: $970 billion a year." (23.4-28.1) |
| 28.4 | (counter running; proposed: the empty red cell pulses) | "So, how much came off the debt?" (28.4-31.2) |
| 31.2-32.5 | No VO: the counter closes on $1,000,000 | |
| 32.51 | The counter passes **$1,000,000**. Pip 4. Hit + cash | "$1 million. And $0 off the debt." (32.5-36.0) |
| 32.5 | Verdict replaces the label stack: "**$1 MILLION** IN ≈ 33 SECONDS. / **$0** OF IT PAYS THE DEBT DOWN." ("$0" in red). Proposed: the red cell fills "$0" | |
| 32.6 | The counter stops at **≈ $1,002,727** | |
| 32.6-36.5 | Hold, then a hard cut back to frame 1 (loop) | |

**Full guide VO** (79 spoken words, digits expanded)

> How much comes off the debt? There goes a year of median pay. About $30,800 a second. Yearly pay divided by 30,800 equals your seconds. A median new house. Gone. That's about $111 million an hour. 10 years of median pay. At fiscal 2025's rate: $970 billion a year. So, how much came off the debt? $1 million. And $0 off the debt.

**The maths**

- **Basis:** FY2025 net interest of $970,000,000,000, spread evenly over a 365-day year of 31,536,000 seconds.
- **Rate:** r = $970B ÷ 31,536,000 = $30,758.498… a second (spec `perSecond` 30,758.50).
- **Counter:** value(t) = r × t, with t in seconds from 0.0.
- **Off the debt:** $0. Interest payments are the cost of the debt; they repay no principal.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Rate | 970,000,000,000 ÷ 31,536,000 | 30,758.498 | ≈ $30,800 every second (screen, VO, caption, pinned) |
| Per hour | r × 3,600 | 110,730,594 | ≈ $111 million an hour |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 (exact) |
| 10 years of median pay | $65,052 × 10 | 650,520 | $650,520 (exact) |
| Pass: a year of pay | 65,052 ÷ r | 2.115 s | label at 2.11 s; "≈ 2.1 seconds" (caption, pinned) |
| Pass: a median new house | 393,700 ÷ r | 12.800 s | VO at 12.8 s |
| Pass: 10 years of pay | 650,520 ÷ r | 21.149 s | VO at 21.1 s |
| Pass: $1 million | 1,000,000 ÷ r | 32.511 s | "≈ 33 seconds" (verdict) |
| Counter final | r × 32.6 | 1,002,727.04 | ≈ $1,002,727 |
| Off the debt | principal repaid by interest | 0 | $0 |
| Swap-in rule | your yearly pay ÷ 30,800 | e.g. 65,052 ÷ 30,758.50 = 2.115 | "≈ 2.1 seconds" (caption, pinned) |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Net interest, FY2025: $970 billion** (Treasury's final Monthly Treasury Statement; the third-largest outlay after Social Security and Medicare) **[click-check]** | American Action Forum, "Sizing Up Interest Payments on the National Debt" (summarising Treasury's September 2025 MTS) | after Oct 2025 | https://www.americanactionforum.org/insight/sizing-up-interest-payments-on-the-national-debt/ |
| Same figure, independent: "net outlays for interest are projected to rise by $69 billion (or 7 percent), from $970 billion in 2025 to over $1.0 trillion in 2026" (used here only for the $970 billion actual) | Congressional Budget Office, *The Budget and Economic Outlook: 2026 to 2036* | February 2026 | https://www.cbo.gov/publication/62105 |
| Primary statement (fetch blocked by the proxy) | U.S. Treasury, Bureau of the Fiscal Service, Monthly Treasury Statement, September 2025 (FY2025 final) | October 2025 | https://www.fiscal.treasury.gov/files/reports-statements/mts/mts0925.pdf |
| **FY2026 ran higher (caption only):** net interest *on the public debt* was $1,052 billion in the first 11 months of FY2026, up $111 billion (12%) from $941 billion a year earlier **[click-check]** | The Money Overview, "Interest on the national debt jumped $111 billion this fiscal year, CBO says" (citing CBO's *Monthly Budget Review: August 2026*, 2026-09-09; cbo.gov fetch blocked) | September 2026 | https://themoneyoverview.com/48-interest-on-the-national-debt-jumped-111-billion-this-fiscal-year-cbo-says/ |
| Direction confirmed, not quoted: FY2026 "interest costs reached an estimated $1.1 trillion, a record 3.4% of GDP" (search-result quote) | Committee for a Responsible Federal Budget, "U.S. Ran a $2 Trillion Deficit Last Year, We Estimate" | 2026-10-01 | https://www.crfb.org/blogs/us-ran-2-trillion-deficit-last-year-we-estimate |
| Context, not used for the rate: CBO's FY2025 summary says net interest *on the public debt* passed $1 trillion. That line is wider than the $970B net-interest total, so using $970B keeps the counter conservative, and the caption names which line its 12% is for | CBO, "Monthly Budget Review: Summary for Fiscal Year 2025" | November 2025 | https://cbo.gov/publication/61307 |
| **Median full-time pay: $1,251 a week** (120.9 million full-time wage and salary workers, not seasonally adjusted, +4.6% a year) | U.S. Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026" (USDL-26-1257) | 2026-07-21 | https://www.bls.gov/news.release/archives/wkyeng_07212026.htm |
| Same, second source | DWM Magazine, "USBLS announces unemployment and wage rates" | 2026-07-24 | https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/ |
| **Median sales price of new houses sold, August 2026: $393,700** (down 5.8% from $417,900 a year earlier) | U.S. Census Bureau and HUD, New Residential Sales, August 2026 | 2026-09-24 | https://www.census.gov/construction/nrs/pdf/newressales_202608.pdf |
| Same, second source | First Trust, "New single-family home sales increased 6.4% in August" | 2026-09-24 | https://www.ftportfolios.com/Commentary/EconomicResearch/2026/9/24/new-single-family-home-sales-increased-6.4percent-in-august |

**Assumptions** (the footer carries the rate's working and the pay basis)
- FY2025 net interest ($970B) is spread evenly over a 365-day year. Real payments are lumpy (coupon dates), so this is the average rate.
- "Median pay" means BLS median usual weekly earnings of full-time wage and salary workers × 52.
- "Median new house" means the Census median sales price of new houses sold.

**Caption (IG / TikTok; also the YouTube description)**
> $1 million of US debt interest in ≈ 33 seconds, and $0 of it pays the debt down: interest is the cost of carrying the debt, not a repayment. In fiscal 2025 the US paid $970 billion in net interest (Treasury; CBO). Divide by the 31,536,000 seconds in a year: ≈ $30,800 a second. A year of median full-time pay ($1,251 a week × 52 = $65,052, BLS) lasts ≈ 2.1 seconds. Yours: divide your yearly pay by 30,800. Fiscal 2026 ran hotter: CBO's August review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow. Educational maths, not advice.
> #nationaldebt #interest #moneymath

**Pinned comment**
> Yearly pay ÷ 30,800 = the seconds of US debt interest it covers. Median full-time pay: ≈ 2.1 seconds. What did you get?

**Per-platform notes**
- **Posting plan (preferred):** post after Treasury's September 2026 Monthly Treasury Statement (about 2026-10-13) and rebuild on FY2026 net interest. Set `NET_INTEREST_FY2025` in the check to the FY2026 figure and rerun it; it will list every string to change: perSecond, rateDisplay, intro, rateSteps, vo[2], vo[3], vo[5], vo[7] ("fiscal 2026's rate"), the milestone pass times and VO times, the "≈ 33 seconds" (it becomes ≈ 31-32 s at about $1.07T), counterT, final, hold, the footer ("FY26"), the caption (drop the "ran hotter" sentence) and the pinned comment. If it posts before then, it goes out as written: FY2025, with the past-tense caption.
- **YouTube Shorts:** the title asks the question and keeps HD Guy's "since you hit play" premise. No CTA; hard-cut back to frame 1 so the replay restarts the count.
- **Instagram Reels:** caption line 1 is the verdict. Use the verdict frame (32.5 s) as the cover.
- **TikTok:**
  - Expected comment fights: "net vs gross interest", "that's last year's number" and "some of it must go to principal". The caption pre-empts all three: $970B is the net figure (a gross figure is bigger), FY2026 ran higher, and interest is not principal.
  - Reply with the CBO line rather than a new number.
  - Put "$1 million … $0 of it pays the debt down" in the first 100 characters.
- **Look note:**
  - The Scoreboard's real-time mode is "0 cuts" (03-look-directions, Direction 3), so the stage stays a dark grid.
  - `lookOpts.labels` gives each milestone a label stack: line 1 holds the working in green ("$1,251 × 52 = $65,052"), line 2 the name in white caps.
  - **Proposals for the kit builder** (the current Scoreboard `cost-counter` module ignores them, and the story renders without them):
    - `pipLabels`: print each pip's amount beside its icon on the ladder from frame 1, so the four targets are named at 0.0 s (R7, R9).
    - `slot`: a red "OFF THE DEBT  $___" cell under the hero, empty from frame 1, filling with "$0" at 32.5 s with a thud. It keeps the question visibly open for the whole short.
  - `heroIcon: false`, because there is no unit object.

---

## 10b: Becker Rig: "40 years of your pay vs 1 minute of new US debt. Which is bigger?"

| | |
|---|---|
| Look | `becker-rig` (white void and floor, our green stick figure with the pencil, maths in ink, impact kit) |
| Spec | `studio/specs/10b-becker-rig-debt-vs-your-pay.json` (36.6 s) |
| Platform title | **Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US Debt?** |
| On-screen hook (header) | **40 years of your pay vs / 1 minute of new US debt. / Which is bigger?** (15 words, 3 lines; "1 minute" in green) |
| Frame 1 | Header and the 2-line footer. A generic "debt clock" readout panel ("NEW US DEBT SINCE YOU HIT PLAY", no real branding) is **already counting from $0** (≈ $117,302 at 1.5 s). Under it, the kit's NEXT ticker names the first target: "3 years of median pay: $195,156", with that object's dashed ghost on the floor. Proposed for the kit: the figure hugs a tall stack of 40 small **$65,052** blocks ("40 × $65,052 / 40 years of median pay"), and a "1 MINUTE" ring on the panel starts draining |
| Footer | New debt ≈ $2.46T ÷ (364 × 86,400 s) / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: what the US national debt adds per second, in the Becker overheating counter (watch/alan-becker.md §6 idea 9, built on the *Clicks Per Second* structure).
- Kept: a **duel against the viewer's own pay** (HD Guy's "Which is cheaper? A or B" grammar), where one side is a rate.
- Changed in the hook pass: the stake grew from "your year's pay vs 1 second" to **"40 years of your pay vs 1 minute"**. The old duel was close (1.2x) and flipped for anyone earning more than ≈ $78,000. The new one is lopsided (1.8x) and holds for anyone under ≈ $117,000 a year. The counter now runs from frame 1, so the 2.4 s armed pause and its ding are gone.
- The basis is the **364 days between two confirmed Debt to the Penny readings**, not "fiscal 2026", because the fiscal year's last reading could not be confirmed (Review log, item V4).
- Rejected: a company counter. That would repeat 10c.

**Wrong belief it exploits**
- "My whole working life is obviously bigger than 1 minute of anything." It isn't: 1 minute of new debt (≈ $4.7 million) is 1.8x a 40-year working life of median pay ($2,602,080). It holds for anyone earning under ≈ $117,000 a year (pinned comment).
- The escalation then busts the belief that the debt clock moves slowly: that whole working life goes in **≈ 33 seconds**, 55% of the minute.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The running counter ($0 at frame 1), the NEXT ticker ("3 years of median pay: $195,156") and the footer ($2.46T, 364 × 86,400 s, $1,251 × 52) are on screen at 0.0 s. Proposed: the 40-block stack ("40 × $65,052") |
| R2 | One input against one input in the hook ("40 years" vs "1 minute"); the result is not given |
| R3 | "Your pay" is the stake. The blocks show the median, so the pinned comment gives the flip point (≈ $117,000 a year) and the swap-in rule (yearly pay × 40 ÷ 78,000 = your working life in seconds). Partial pass: the on-screen blocks are not the viewer's own |
| R4 | 40 years and 1 minute are round, familiar units. "$2.6 million" appears only as the working (40 × $65,052) |
| R5 | The implied wrong answer is "my 40 years, obviously". 1 minute is 1.8x bigger |
| R6 | You + 40 years of your pay + 1 minute. The debt is the government's, so this is a partial pass |
| R7 | Two named sides in the header and in the first VO line ("Your 40 years, or 1 minute?"); the counter answers |
| R8 | 15 words, 3 lines |
| R9 | The kit shows the next target at all times (NEXT ticker) and checks off 3, 10, 20 and 40 years. Proposed: the 40 blocks in his arms, one eaten every 0.83 s, a loop the viewer can count down |
| R10 | The counter moves at 0.0 s. First payoff at 2.50 s (3 years of median pay, VO 2.4 s); proposed earlier beats: the first block eaten at 0.83 s and the "1 SECOND ≈ $78,000" stamp at 1.0 s. The biggest number (a working life, $2.6 million) comes last |
| R11 | The question is on screen and in the title; the caption leads with the verdict |
| R12 | A lopsided pair to repeat: **a working life ≈ 33 seconds; 1 minute ≈ $4.7 million** |

**Benchmark hooks it is modelled on**
- **H07, HD Guy, "Which is cheaper? 1 Missile or 75 Rounds/Second"**. **11,957,600 views, 3.81x.** https://www.youtube.com/shorts/TIRAehb_9sc
  - It is the channel's only question-form title, and it is in its top 6 by views.
  - Borrowed: "Which is [X]: A, or [a per-time amount]?", where one side is a rate.
- **H17, ChartOrbit, "POV: In 2008 You invested $5000 in [USA] VS [EU]"**. **2,808,307, 345.09x.** https://www.youtube.com/shorts/VwfZNjxu6fU (and **H16**, Netflix vs Disney, **15,876,376, 100.45x**, https://www.youtube.com/shorts/KmtLGAPIutg)
  - Borrowed: two named sides at frame 1 and a lopsided end.
- **H78-H80, "2 people invest $10,000 / 10 years ago"** (Instagram, **276,471-322,339**). https://www.instagram.com/reel/DdUZ5K1gGlc/
  - Borrowed: a round horizon inside the stake ("40 years").
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**, frame 1 "$0.30". **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counter is already moving at 0.0 s, round milestones, and an ending at the peak.
- **H84, Master Money, "Take your salary and multiply it by 0.7"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the viewer's own pay as the input (the pinned swap-in rule).
- **Look reference** (not benchmark evidence): Alan Becker's *Clicks Per Second*, watch/alan-becker.md §2.3.
  - Frame 1 is a familiar UI already counting.
  - It escalates, and the counter heats from green to orange to white, cracks and explodes.

**Beat sheet** (milestone pass time = value ÷ $78,201.35 a second, from 0.0 s; gag beats from `lookOpts`)

| t (s) | On screen (Becker action) | VO |
|---|---|---|
| 0.0 | Header, footer. The panel counts from **$0**. NEXT: "3 years of median pay: $195,156", with its ghost on the floor. Proposed: the figure hugs the 40-block stack ("40 × $65,052 / 40 years of median pay"); the "1 MINUTE" ring starts draining | "Your 40 years, or 1 minute?" (0.0-2.4) |
| 0.83 | Proposed: the panel slurps the top block (1 year of median pay, $65,052) | |
| 1.0 | Proposed: the counter has run exactly 1 second. A stamp lands under the panel: "1 SECOND ≈ $78,000" | |
| 1.5 | The counter reads ≈ $117,302 (2.5% of the minute gone) | |
| 2.50 | The counter passes **$195,156**. The strip flashes "✓ 3 years of median pay: $195,156"; the wad of bills drops. **Swallow:** he hugs the rest of his stack tighter | "3 years, gone." (2.4-4.0) |
| 4.2 | (counter running) | "≈ $78,000 a second." (4.2-6.6) |
| 8.32 | The counter passes **$650,520**. **Push:** he shoves back against the slot; it keeps eating | "10 years of median pay." (8.2-10.6) |
| 10.6 | (counter running) | "The debt grew ≈ $2.46 trillion in 364 days." (10.6-16.4) |
| 16.5 | Heat key "orange": the panel heats up and its last digits blur. Buzz | "Halfway: 20 years." (16.5-18.0) |
| 16.64 | The counter passes **$1,301,040**. **Shocked:** his stack is half gone | ("20 years" is said at 16.88) |
| 18.2 | NEXT: "40 years of median pay: $2,602,080" | "40 × $65,052 ≈ $2.6 million." (18.2-22.9) |
| 23.1 | He looks at the few blocks left | "That's a whole working life." (23.1-25.1) |
| 25.3 | Proposed: the ring's 60 s mark gets its label, "≈ $4.7 MILLION" | "1 minute: ≈ $4.7 million." (25.3-28.4) |
| 28.6 | Heat key "white": the panel is near its peak, vibrating, with steam | "How long do 40 years last?" (28.6-31.0) |
| 31.1-33.3 | No VO: a riser as the panel cracks | |
| 33.27 | The counter passes **$2,602,080** | |
| 33.3 | The counter locks on **≈ $2,604,105**. **Burst:** white impact frame, shake, hit; the blast knocks him flat (flattened), arms empty. Gag stamp "≈ 33 SECONDS". Verdict in the caption band: "40 years of median pay: **≈ 33 seconds**. / 1 minute of new US debt ≈ **$4.7 million**." The ring stops at 55% | "A working life: ≈ 33 seconds." (33.3-35.7) |
| 33.3-36.6 | Hold. He peels himself off the floor and stares at the cracked panel. Hard cut to frame 1: the counter back at $0, the stack back in his arms (loop) | |

All "≈ N seconds" are counter time, and the counter starts at 0.0 s, so they are also video time.

**Full guide VO** (75 spoken words, digits expanded)

> Your 40 years, or 1 minute? 3 years, gone. About $78,000 a second. 10 years of median pay. The debt grew about $2.46 trillion in 364 days. Halfway: 20 years. 40 times $65,052: about $2.6 million. That's a whole working life. 1 minute: about $4.7 million. How long do 40 years last? A working life: about 33 seconds.

**The maths**

- **Basis:** total public debt outstanding (Treasury's Debt to the Penny) rose from **$37,637,553,494,935.61** on 2025-09-30 to **$40,096,954,633,566.68** on 2026-09-29: Δ = **$2,459,401,138,631.07** in **364 days**.
- **Rate:** r = Δ ÷ (364 × 86,400 s) = Δ ÷ 31,449,600 s = $78,201.349… a second (`perSecond` 78,201.35).
- **Counter:** value(t) = r × t, from 0.0 s.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Growth | $40,096,954,633,566.68 − $37,637,553,494,935.61 | 2,459,401,138,631.07 | ≈ $2.46T (footer, VO, caption) |
| Rate | Δ ÷ 31,449,600 s | 78,201.349 | ≈ $78,000 every second (strip, stamp, VO, caption, pinned) |
| 1 minute of new debt | r × 60 | 4,692,080.93 | ≈ $4.7 million (VO, verdict, ring label, caption) |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 (one block) |
| 40 years of median pay | $65,052 × 40 | 2,602,080 | $2,602,080 / ≈ $2.6 million |
| The duel | 1 minute ÷ 40 years of median pay | 1.803 | 1 minute is bigger (1.8x, md only); margin ≈ $2.1 million (md only) |
| Crossover pay | 1 minute ÷ 40 | 117,302.02 | ≈ $117,000 a year (pinned) |
| 1 minute in years of median pay | 1 minute ÷ $65,052 | 72.13 | ≈ 72 years of median pay (caption) |
| Block n eaten | n × $65,052 ÷ r | n × 0.8319 s | proposed block-stack timing |
| Pass: 3 years of pay | $195,156 ÷ r | 2.496 s | VO 2.4 |
| Pass: 10 years of pay | $650,520 ÷ r | 8.319 s | VO 8.2 |
| Pass: 20 years of pay | $1,301,040 ÷ r | 16.637 s | VO 16.5 ("20 years" said at 16.88) |
| Pass: 40 years of pay | $2,602,080 ÷ r | 33.274 s | ≈ 33 seconds (VO and verdict at 33.3) |
| Share of the minute used | 33.274 ÷ 60 | 55.5% | the ring stops at 55% (proposal) |
| Counter at 1.5 s | r × 1.5 | 117,302.02 | (frame check; equal to the crossover pay because 1.5 = 60 ÷ 40) |
| Counter final | r × 33.3 | 2,604,104.91 | ≈ $2,604,105 |
| TikTok reply: the part held by the public | $2.09T ÷ 31,449,600 s | 66,455.5 | ≈ $66,000 a second; × 60 = 3,987,332 ≈ $4.0 million a minute |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Debt on 2026-09-29: $40,096,954,633,566.68**, "the final reading published before the fiscal year ended". Of the year's growth, $2.09T is held by the public and $369B is intragovernmental **[click-check]** | PrimeRates, "Federal Debt Grew $2.46 Trillion in Fiscal 2026 to End at $40.1 Trillion" (citing Treasury's Debt to the Penny) | early Oct 2026 | https://primerates.com/?p=13878 |
| **Debt on 2025-09-30: $37,637,553,494,935.61** (the same series' start point, confirmed in round 1's search results and by the verifier) **[click-check]** | same PrimeRates article, citing Debt to the Penny | early Oct 2026 | https://primerates.com/?p=13878 |
| Consistency check 1 (start level): total federal debt "near $37.6 trillion as of September 30, 2025" | U.S. Government Accountability Office, GAO-26-107908 (highlights), audit of the FY2025 Schedules of Federal Debt | FY2025 audit | https://www.gao.gov/assets/gao-26-107908-highlights.pdf |
| Consistency check 2 (pace): $38T in October 2025, $39T in March 2026, $40.047T at the close of 2026-08-18. That is ≈ $2.0T in ≈ 10 months, or ≈ $2.4-2.5T a year | Euronews, "Five charts explaining America's $40 trillion debt" | 2026-08-22 | https://www.euronews.com/2026/08/22/five-charts-explaining-americas-40-trillion-debt |
| Primary dataset (API and page fetch both blocked by the proxy) | U.S. Treasury, Fiscal Data, "Debt to the Penny" | daily | https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/ |
| **Not used:** the 2026-09-30 reading. Search summaries gave unsourced, mutually inconsistent figures ("$40.17 trillion" for FY2026; $40,260,641,972,390 on 2026-10-01; $40,242,446,619,209.33 on 2026-10-02). If $40.17T is right, full-year growth was ≈ $2.53T, which is why nothing on screen says "fiscal 2026" | search results only | 2026-10-07 | (no primary page reachable) |
| Median full-time pay $1,251 a week | BLS (2026-07-21) and DWM Magazine (2026-07-24) | | see 10a |

**Assumptions** (in the 2-line footer and the milestone labels)
- The 364-day growth is spread evenly over those 364 days. The debt grows in steps (auctions, tax dates, month-end trust-fund credits), so this is the average rate.
- The debt is gross federal debt, which includes intragovernmental holdings.
- Pay is BLS median weekly earnings × 52. A "working life" is 40 years of that pay, with no raises. The labels and the verdict say "median pay"; the header's "your pay" is answered for every viewer by the pinned flip point (≈ $117,000 a year).

**Caption (IG / TikTok; also the YouTube description)**
> 40 years of median pay ≈ 33 seconds of new US debt. 1 minute of it ≈ $4.7 million, or ≈ 72 years of median pay. Treasury's Debt to the Penny: $37.638 trillion on Sept. 30, 2025, $40.097 trillion on Sept. 29, 2026, so ≈ $2.46 trillion more in 364 days. Divide by 364 × 86,400 seconds: ≈ $78,000 a second. 40 years of median pay ($1,251 a week × 52 × 40 = $2,602,080) ≈ 33 seconds. Educational maths, not advice.
> #nationaldebt #debtclock #moneymath

**Pinned comment**
> Earn more than ≈ $117,000 a year? Your 40 years beat 1 minute. Yours: yearly pay × 40 ÷ 78,000 = your working life in seconds.

**Per-platform notes**
- **Before posting (optional upgrade):** if Debt to the Penny can be read, take the 2026-09-30 reading. A full fiscal year would let the footer say "FY2026" and divide by 31,536,000 s; rerun the check after changing `DEBT_2026_09_29`, `DAYS_B` and the strings it lists. The 364-day version is correct as it stands.
- **YouTube Shorts:** the question title is HD Guy's rarest and one of his biggest (H07). Keep the ending as a hard cut back to frame 1: the counter restarts at $0 and the stack is back in his arms.
- **Instagram Reels:** use the burst frame (33.3 s) as the cover, with the verdict. Caption line 1 is the working-life verdict.
- **TikTok:**
  - Expected fight: "the debt includes money the government owes itself". The pinned reply: of the $2.46T, $2.09T is held by the public. That is still ≈ $66,000 a second, so 1 minute of it (≈ $4.0 million) still beats a working life of median pay ($2.6 million). It comes from the PrimeRates source above: 2.09e12 ÷ 31,449,600 = $66,456.
  - Expected fight: "I earn more than that". The pinned comment gives the flip point (≈ $117,000) and the swap-in rule.
  - Expected question: "why 364 days?" Answer: those are the two official readings either side of the fiscal year we could confirm.
  - Keep "40 years of median pay ≈ 33 seconds" in the first 100 characters.
- **Look note:**
  - The Becker Rig `cost-counter` module is built (working tree; another session is restyling it as this is written). It draws the readout panel counting from frame 1, the NEXT ticker with the next target's ghost, a dropping object and a "✓" strip flash at each milestone, the heat ramp and the lock with the impact kit. It reads `lookOpts.heat` (the "orange", "white" and "burst" keys at 16.5, 28.6 and 33.3 s) and maps them onto its own colour ramp. It guesses a wad of bills for every "years of median pay" milestone.
  - **Proposals for the kit builder** (the module ignores them today; the story renders without them): `opener` with `prop: "block-stack"`, `blocks: 40`, `unit: 65052` (40 blocks in his arms, block n eaten at n × 65,052 ÷ perSecond, so every 0.83 s); `stamp` ("1 SECOND ≈ $78,000" at exactly 1 s of counting); `timer` (a "1 MINUTE" ring that drains from 0.0 s, gets the label "≈ $4.7 million" on its 60 s mark at 25.3 s and stops at 55% on the lock); `actions` (swallow, push, shocked, flattened, all in §7.2's pilot set); `gag` ("≈ 33 seconds" at the burst).
  - The old `armed`, `queue` and `carry` proposals are gone: the counter runs from frame 1 and the stack is in his arms from the start.
  - One impact kit, at the burst only (README: "one per short").

---

## 10c: Live Sheet: "How much does Amazon really make while you watch this?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input and peach output headers) |
| Spec | `studio/specs/10c-live-sheet-amazon-makes.json` (31.0 s) |
| Platform title | **What Amazon Really Keeps While You Watch This** |
| On-screen hook (header) | **How much does Amazon really make / while you watch this?** (10 words, 2 lines; "really" highlighted) |
| Frame 1 | Banner. The formula bar starts typing "= $716.9B ÷ 31,536,000 s ≈ $22,700 a second" (complete by about 1.5 s). The big cell "Amazon's sales since you hit play" reads **$0** and counts. Under it, the rows "A year of median pay · $65,052 · ___" and "A median new house · $393,700 · ___", with their "Passed at" cells empty. The bottom row, **"Kept as profit (≈ 11%)"**, counts from $0 at its own, slower rate. 2-line footer with the pay basis |
| Footer | Amazon 2025: net sales $716.9B, net income $77.7B / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: Amazon's latest annual revenue (2025 net sales, $716.9B) turned into a per-second counter, with milestones the viewer knows.
- Changed: the **"makes" vs "keeps" gap is on screen from frame 1** as two counters, sales (≈ $22,700 a second) and kept (net income, ≈ $2,464 a second). In round 1 the kept row slid in at 19.9 s.
- Why the twist: the Live Sheet's job is to show the working, and the formula bar is where revenue becomes profit.
- Why Amazon over Apple:
  - its revenue is the bigger counter (≈ $22,700 a second against Apple's smaller one);
  - "what Amazon really makes" carries the wrong belief in one word.

**Wrong belief it exploits:** "What Amazon makes" is what it keeps (revenue = profit). The header's "really" puts that belief in doubt, and the two counters break it: Amazon keeps ≈ 11 cents of each dollar. The verdict then refuses to let the correction become a shrug: the kept part is still a year of median pay every ≈ 26 s.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The sales cell ($0, counting), the kept row ($0, counting), the formula bar ($716.9B ÷ 31,536,000 s), the milestone amounts and the footer's pay basis are on screen at 0.0 s |
| R2 | The hook line has no number and no result. The inputs sit in the formula bar and the footer |
| R3 | A year of median pay is the first row and the footer's pay basis; the pinned comment gives the swap-in rule ("Your yearly pay ÷ 22,700"). No row is the viewer's own, so this is a partial pass |
| R4 | A year of pay and a house, not "$716.9 billion" |
| R5 | One word does it: "really". The same device as "What You **Actually** Make" (3.0M) |
| R6 | You ("while you watch this") + an amount (the counters) + a horizon. The money is Amazon's, so this is a partial pass |
| R7 | Two named counters, and the first VO line names them: "Top: sales. Bottom: what it keeps." |
| R8 | 10 words, 2 lines |
| R9 | 2 empty "Passed at" cells, plus the kept counter visibly crawling toward a year of pay |
| R10 | First payoff at 2.9 s (sales passes a year of median pay). The last and biggest answer, the kept counter passing a year of pay, lands at 26.4 s |
| R11 | The question is on screen; the caption gives the verdict ("'Makes' isn't 'keeps'") |
| R12 | A lopsided pair to repeat: **sells a year of median pay in ≈ 3 s, keeps one every ≈ 26 s** (9.2x apart) |

**Benchmark hooks it is modelled on**
- **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the single word that implies the viewer's wrong number ("actually" → "really").
- **H70, The Market Hustle, "What You're Buying / When You Invest / $10,000 in These ETFs"**. **221,830** (pinned; 617 comments). https://www.instagram.com/reel/DMwLzi8PhdK/
  - Borrowed: the whole sheet on screen at 0.0 s, every number in dollars.
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**. **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counters are running at 0.0 s, and milestones pull the viewer through.
- **Look evidence:** Debt Freedom's formula bar as proof ("What difference…", **1,900,000, 902.5x**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637).

**Beat sheet** (milestone pass time = value ÷ $22,732.75 a second; kept pass = value ÷ $2,463.85; formula-bar steps from `lookOpts.formulaSteps`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. The formula bar types "= $716.9B ÷ 31,536,000 s ≈ $22,700 a second". Sales cell **$0**, counting. Rows with empty "Passed at". Kept row "Kept as profit (≈ 11%)" counting. Footer | "Top: sales. Bottom: what it keeps." (0.0-2.4) |
| 2.86 | Sales passes **$65,052**. Row 1's "Passed at" snaps to **≈ 3 s** and the row flashes yellow. Pop | "Sales just passed a year of median pay." (2.9-6.0) |
| 6.1 | (both counters running) | "Amazon's 2025 sales: $716.9 billion." (6.1-10.4) |
| 10.5 | The formula bar's "≈ $22,700 a second" flashes | "Divided by every second in a year: ≈ $22,700." (10.5-15.6) |
| 17.32 | Sales passes **$393,700**. Row 2's "Passed at" snaps to **≈ 17 s**. Pop | "Sales just passed a median new house." (17.3-20.1) |
| 20.2 | Formula bar rewrites "= $77.7B ÷ $716.9B ≈ 11% kept". Swipe | "But it keeps ≈ 11%." (20.2-22.6) |
| 22.9 | Formula bar "= $77.7B ÷ 31,536,000 s ≈ $2,464 a second" | "≈ $2,464 a second." (22.9-26.4) |
| 26.40 | The kept counter passes **$65,052**. Formula bar "= $65,052 ÷ $2,464 ≈ 26 s". Ding | "Kept: a year of median pay every ≈ 26 seconds." (26.4-30.3) |
| 26.4 | Verdict: "Sells a year of median pay in ≈ 3 s. / Keeps one every **≈ 26 s**." | |
| 26.5 | The counters stop: sales **≈ $602,418**, kept **≈ $65,292** | |
| 26.5-31.0 | Hold the finished sheet, then clear to frame 1 (loop) | |

**Full guide VO** (70 spoken words, digits expanded)

> Top: sales. Bottom: what it keeps. Sales just passed a year of median pay. Amazon's 2025 sales: $716.9 billion. Divided by every second in a year: about $22,700. Sales just passed a median new house. But it keeps about 11%. About $2,464 a second. Kept: a year of median pay every 26 seconds or so.

(Read the last line as "...every 26 seconds or so"; the caption shows "≈ 26 seconds".)

**The maths**

- **Basis:** Amazon's 2025 net sales of $716,900,000,000 and net income of $77,700,000,000, each spread evenly over a 365-day year.
- **Rates:** sales r = $22,732.749… a second (`perSecond` 22,732.75); kept k = $2,463.851… a second (`lookOpts.kept.perSecond` 2,463.85).

| On screen | Formula | Exact | Shown (everywhere) |
|---|---|---:|---|
| Sales rate | 716.9e9 ÷ 31,536,000 | 22,732.750 | ≈ $22,700 a second (formula bar, rate label, VO, caption, pinned) |
| Kept share | 77.7 ÷ 716.9 | 10.838% | ≈ 11% (formula bar, kept label, VO); ≈ 11 cents of each dollar (caption) |
| Kept rate | 77.7e9 ÷ 31,536,000 | 2,463.851 | ≈ $2,464 a second (formula bar, VO, caption, pinned) |
| Passed: a year of pay (sales) | 65,052 ÷ r | 2.862 s | ≈ 3 s (row, verdict, caption) |
| Passed: a median new house (sales) | 393,700 ÷ r | 17.319 s | ≈ 17 s (row) |
| Kept passes a year of pay | 65,052 ÷ k | 26.403 s | ≈ 26 s (formula bar, VO, verdict, caption); 65,052 ÷ 2,464 = 26.401 rounds the same |
| Sales counter final | r × 26.5 | 602,417.87 | ≈ $602,418 |
| Kept counter final | k × 26.5 | 65,292.05 | ≈ $65,292 |
| Verdict ratio (md only) | 26.403 ÷ 2.862 | 9.23 | "9.2x apart" |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Amazon 2025 net sales $716.9B (+12% from $638.0B); net income $77.7B ($7.17 a diluted share)** | Amazon, "Amazon earnings Q4 2025 report" (company newsroom; the Q4 2025 results release) | February 2026 | https://aboutamazon.com/news/company-news/amazon-earnings-q4-2025-report |
| Same release, as distributed | "Amazon.com Announces Fourth Quarter Results" (press-release copy on Seeking Alpha) | February 2026 | https://seekingalpha.com/pr/20390462 |
| Same figures, independent report | exchange4media, "Amazon Q4 sales and marketing expense rises 8.7% to $14bn as net sales climb 14%" | February 2026 | https://www.exchange4media.com/digital-news/amazon-q4-sales-and-marketing-expense-rises-87-to-14bn-as-net-sales-climb-14-151740.html |
| Median full-time pay $1,251 a week; median new house $393,700 | BLS (2026-07-21) and DWM Magazine (2026-07-24); Census/HUD (2026-09-24) and First Trust (2026-09-24) | | see 10a |

**Assumptions** (in the 2-line footer)
- 2025 net sales and net income are spread evenly over 365 days. Sales are seasonal (Q4 is the biggest quarter), so this is the year's average rate.
- "Kept" means GAAP net income ÷ net sales for the full year.

**Caption (IG / TikTok; also the YouTube description)**
> "Makes" isn't "keeps". Amazon sells a year of median pay ($65,052) in ≈ 3 seconds and keeps one every ≈ 26 seconds. In 2025 it took in $716.9 billion (net sales) and kept $77.7 billion (net income): ≈ 11 cents of each dollar. Per second: ≈ $22,700 in, ≈ $2,464 kept. Source: Amazon's Q4 2025 results (February 2026); pay: BLS. Educational maths, not advice.
> #amazon #moneymath #revenue #profit

**Pinned comment**
> Your yearly pay ÷ 22,700 = seconds of Amazon sales. ÷ 2,464 = seconds of Amazon profit. Post yours.

**Per-platform notes**
- **YouTube Shorts:** the title promises the twist ("really keeps"). If it underperforms, A/B it with the header's question ("How Much Does Amazon Really Make While You Watch This?"). Keep the 4.5 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** use the finished sheet with the verdict as the cover. Caption line 1, "'Makes' isn't 'keeps'", is the verdict.
- **TikTok:**
  - Expected fights: "revenue isn't profit" (the video agrees, which disarms it) and "AWS makes all the profit". Answer with the release's own segment figures only if asked; they are not used on screen.
  - Keep "≈ 3 seconds … ≈ 26 seconds" early in the caption.
- **Look note:**
  - The Live Sheet `cost-counter` module is built (working tree) and reads everything this spec passes: `formulaSteps`, `columns`, `rows` (with the "≈ 3 s" and "≈ 17 s" display strings) and `kept`.
  - `kept.t: 0.0` puts the kept row on the sheet, counting, from frame 1. The kit then starts its selection box on the kept row (its rule for a kept row that is present at frame 1).
  - No Amazon logo or brand colours: the name is text in the banner.

---

## Review log

Round 2 review: one verifier (maths, facts, contract, timing) and one hook judge (scores 5 / 7 / 5). Each issue is listed with what I did. Check: **861 checks, 0 failures**. Lint: **3/3 clean, 0 warnings**.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 10a | must | No number the viewer owns on screen at 0.0 s | **Fixed.** The footer now carries the pay basis at frame 1: "FY25: $970B ÷ 31,536,000 s · pay $1,251 × 52". I tried the suggested 2-line footer first: the Scoreboard's footer band is one 50 px line, so it rendered at 33.8 px (2 type-floor warnings). The one-line version renders at 40 px with 0 warnings. I also proposed `pipLabels` (the four amounts beside the pips from frame 1). The checker now requires "$1,251 … × 52" in every footer. Frame 1 row, footer row and R1/R3 rows updated |
| V2 | 10c | must | The same quantity shown with two roundings at once (caption vs formula bar) | **Fixed, and generalised.** One rounding per quantity: ≈ $22,700 (formula bar, rate label, VO, caption, pinned), ≈ 11% (formula bar, kept label, VO), ≈ $2,464 (VO, formula bar, caption, pinned). The same problem also sat at 26.4 s ("≈ 26 seconds" in the caption band beside "≈ 26.4 s" in the formula bar), so all times are now whole seconds (rows ≈ 3 s / ≈ 17 s, formula bar ≈ 26 s). vo[6] is "≈ $2,464 a second." with d 3.5 (9 words, 3.46 s at 2.6 w/s, ends 26.4). The checker gained a one-rounding guard over specs, captions and pinned comments: run on the round-1 file it flags $22,733, $30,758 and $78,006 |
| V3 | 10a | should | FY2025 rate presented with a stale projection for a year that has ended | **Fixed for posting now; rebuild plan for after 2026-10-13.** The September MTS is not out (due about Oct 13: the 8th business day, with Oct 12 a federal holiday). The caption now says, in the past tense: "Fiscal 2026 ran hotter: CBO's August review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow" ($1,052B vs $941B, CBO Monthly Budget Review of 2026-09-09, via The Money Overview, **[click-check]**). I could not confirm the verifier's 8.9% (CRFB) in my searches, so I quote the figure I could source and name its line, which is wider than the $970B total. "Live." is gone from the VO and "in Real Time" from the title, and the checker bans both. The per-platform notes list the rebuild steps for FY2026 |
| V4 | 10b | should | "$2.46 trillion in fiscal 2026" is a 364-day window | **Fixed by changing the claim.** The Debt to the Penny API (`api.fiscaldata.treasury.gov`) is blocked by curl and by fetch, and 4 searches found no primary 2026-09-30 reading. Search summaries gave unsourced values, one of which ($40.17T) would make full-year growth ≈ $2.53T. So the teaser now uses only the two confirmed readings, $37,637,553,494,935.61 (2025-09-30) and $40,096,954,633,566.68 (2026-09-29): Δ $2,459,401,138,631.07 over 364 days = $78,201/s. Footer "New debt ≈ $2.46T ÷ (364 × 86,400 s)"; VO "The debt grew ≈ $2.46 trillion in 364 days."; the caption gives both dates. All on-screen roundings hold (≈ $78,000, ≈ 5 / 13 / 33 s); the pass times, final (≈ $2,604,105) and the public-part reply (≈ $66,000) are recomputed. The checker bans "fiscal 2026" and "FY2026" in 10b |
| V5 | 10b | should | "A year's pay? Under 1 second." is universal; verdict and title wording | **Fixed via the hook rewrite (J2).** The VO now opens with "Your year, or 1 second? Pick." and answers "Median pay loses.", which is true for the median. The verdict says "40 years of median pay". Title: "Which Is Bigger: Your Yearly Pay or 1 Second of New US Debt?". The checker bans "Under 1 second" |
| V6 | 10b | should | "≈ $78,006" is false precision | **Fixed.** "≈ $78,000" in the caption (both places) and the pinned comment ("Earn more than ≈ $78,000 a year?"). The "$78,006 (caption)" maths row is gone. On the 364-day basis the exact rate is $78,201, so $78,006 would now be wrong as well as over-precise |
| V7 | 10a | should | "Divide your pay by 30,800" works only for yearly pay | **Fixed.** vo[3] is "Yearly pay ÷ 30,800 = your seconds." (11 words, d 4.3, 8.5-12.8 s) |
| V8 | 10a | nit | Caption "≈ $30,758" vs screen "≈ $30,800" | **Fixed.** Caption: "Divide by the 31,536,000 seconds in a year: ≈ $30,800 a second." Maths row dropped |
| V9 | 10a, 10c | nit | "Within 0.5 s of the word" was measured to the line start | **Fixed.** Reworded and re-measured: each milestone passes within 0.29 s of the start of the VO line that names it (the 0.29 s is 10a's first pass, after the opening question); every other gap is ≤ 0.07 s |

### Hook judge

| # | Teaser | Score | What I did |
|---|---|---:|---|
| J1 | 10a | 5 → est. 7 | **Adopted the rewrite.** Header "US debt interest since you hit play. / How much comes off the debt?" ("off the debt" in red); first VO is the question; the verdict pairs "$1 million in ≈ 33 seconds" with "$0 of it pays the debt down"; the title is a question. Proposed the labelled pips and the red "OFF THE DEBT  $___" cell as `lookOpts` (`pipLabels`, `slot`). From the contract fields alone, the header asks and the verdict answers. **Three deviations, with reasons:** (1) The opening line is the 6-word "How much comes off the debt?", not "How much of this comes off the debt?". The 8-word version takes 3.1 s at 2.6 w/s and would push "There goes a year of median pay" a full second past the 2.11 s pass; the 6-word one keeps it at 2.4 s. (2) The verdict leads with "$1 million in ≈ 33 seconds" rather than "≈ $1,002,727 of interest": the round number is the one viewers repeat, and the counter already shows the exact one. (3) Title "…How Much Comes Off the Debt?": "How Much Comes Off?" alone is ambiguous. The interest-only angle also separates 10a from 10b |
| J2 | 10b | 7 → est. 7.5 | **Adopted the rewrite.** Header "Your year's pay vs / 1 second of new US debt. / Which is bigger?" (12 words). The panel is armed at $0 with a "1 SECOND" tag until 2.4 s ("Your year, or 1 second? Pick."), then starts on a ding, labelled "New US debt, from the ding" (the SFX set has no beep). The house and the 40-year block sit in a visible queue (R9); a stamp "1 SECOND ≈ $78,000" lands at exactly 1 s of counting; then "Median pay loses."; every later beat moves +2.4 s; caption line 1 is the working-life verdict. **Deviations:** the stamp and pinned comment use "≈ $78,000", not "$78,006" (V6 wins); the duration is 39.0 s, not 39.9 (hold 3.3 s); and verdict line 1 became "A working life, 40 years of median pay:". At full size the 2-line verdict dipped 6 px under the caption band during its entry animation (a lint error); the longer first line sets a smaller size and clears it. **Cost, accepted:** the counter is not running at frame 1, and the first payoff is at 3.23 s, not 0.83 s. Frame 1 still holds three numbers, and the pick window is what makes the question work (R7) |
| J3 | 10c | 5 → est. 6.5 | **Adopted the core of the rewrite.** Header "How much does Amazon really make / while you watch this?" (a question, R5 via "really"); both counters run from frame 1 (`kept.t: 0`, which the Live Sheet kit already supports); the first VO names them ("Top: sales. Bottom: what it keeps.", since this kit stacks them); the verdict pair is "Sells a year of median pay in ≈ 3 s. / Keeps one every ≈ 26 s."; title "What Amazon Really Keeps While You Watch This". "There goes a year of median pay" (word for word in 10a) became "Sales just passed…". **Not adopted:** the 2×2 "Passed at" grid with a 4th cell "= $393,700 ÷ $2,464 ≈ 160 s". The Live Sheet's cost-counter table has 3 columns and no passed-at cell on the kept row, and a fourth number arriving after the counters stop would dilute the verdict pair. The kept pass is shown in the formula bar instead ("= $65,052 ÷ $2,464 ≈ 26 s"). R3 stays partial (no row of the viewer's own), so I estimate below the judge's 7 |

### Hook pass (2026-10-08)

Two judges scored each teaser's current hook and four candidate rewrites (A-D) out of 10. The rule: adopt the best candidate only if its average is at least 7.5 and at least 0.75 above the current hook. A key that either judge marks dishonest is out. Judge 2's 10c scores for C and D were cut off in transit, and so was the full text of the 10c candidates.

| Teaser | Current | A | B | C | D | Decision |
|---|---|---|---|---|---|---|
| 10a | 5 / 5 → **5.00** | 7 / 7 → **7.00** | 4 (dishonest) / 5.5 → out | 4 / 4.5 → 4.25 | 6 / 6 → 6.00 | **Keep current** |
| 10b | 6 / 6 → **6.00** | 7.5 / 7.5 → **7.50** | 5.5 / 6 → 5.75 | 5 / 6 → 5.50 | 5.5 / 5.5 → 5.50 | **Adopt A** |
| 10c | 4 / 4.5 → **4.25** | 5 / 5 → 5.00 | 5.5 / 6 → **5.75** | 4.5 / cut off | 6.5 / cut off | **Keep current** |

**10a: kept.**
- The best candidate, A ("…how many years of **your pay**?", with a tally of years), averaged 7.00. That clears the +0.75 margin but misses the 7.5 floor.
- Both judges held it back for the same reasons: "your pay" on screen is really the median, the money is the government's (R6 partial), and the count of 15 years is set by the video's length.
- B is out: judge 1 marked it dishonest. Judge 1 reports that Treasury's FY2025 function table puts both Medicare ($996.7B) and Health ($978.9B) above net interest (~$970.7B). If so, "only 2 bills are bigger" holds only under AAF's program grouping. Judge 2 accepted AAF's ranking, but the rule drops a key that either judge marks dishonest. The "third-largest outlay" wording in 10a's source row is AAF's own wording, and it is not on screen.
- Title kept. A's title and D's title only work with their own headers, and neither judge scored a title on its own.

**10c: kept.**
- No visible score comes near the floor. The best fully scored candidate is B at 5.75.
- For C to reach 7.5, judge 2 would need a 10.5. For D, judge 2 would need an 8.5, above every score judge 2 gave in this format (its highest was 7.5).
- D's full spec was also cut off in transit, so it could not have been applied as written.
- Title kept for the same reason as 10a.

**10b: adopted A, "40 years of your pay vs 1 minute of new US debt. Which is bigger?"**
- **Why it won:** both judges gave it 7.5. It attacks the strongest wrong belief in the format: "my whole working life obviously beats 1 minute".
  - The duel is lopsided: 1 minute ≈ $4.7 million is 1.8x a working life of median pay ($2,602,080).
  - It holds for anyone under ≈ $117,000 a year. The old duel flipped at ≈ $78,000.
  - The counter is live at 0.0 s, where the old one was armed and still for 2.4 s.
- **Applied as written:**
  - header, title and vo[0];
  - data.label "New US debt since you hit play";
  - counterT [0.0, 33.3];
  - the milestones 3 / 10 / 20 / 40 years of median pay;
  - the final ≈ $2,604,105 and hold 3.3;
  - VO lines 1-8 at the candidate's times;
  - no `armed`, no `queue`;
  - `opener` block-stack "40 × $65,052";
  - stamp "1 second ≈ $78,000" at 1.0 s;
  - `timer` (1 minute, 60 s);
  - heat orange at 16.5 s;
  - the sfx (no ding; buzz 16.5, riser 2.2 s, hit);
  - the pinned flip point (≈ $117,000) and "≈ 72 years of median pay" in the caption.
- **Deviations, with reasons:**
  1. **The verdict, the last VO line, the burst, the hit and the gag are at 33.3 s, not 33.2 s.** The 40-year pass is at 33.274 s, and the kit's lock (the burst) is at counterT[1] = 33.3 s. At 33.2 s, the verdict would land 2 frames before the pass. The riser moved from 31.0 to 31.1 s, so it still runs 2.2 s and ends on the hit. Duration (36.6 s) and hold (3.3 s) are unchanged.
  2. **New vo[9], "How long do 40 years last?" (28.6-31.0 s, 6 words, 2.31 s).** As written, A left 4.8 s with no VO (28.4-33.2 s). Judge 2 marked down 4.7 s and 5.6 s silences in 10a-D and 10b-C. The new line re-opens the loop that the verdict closes, and the silent riser before the burst is now 2.2 s, as it was before. White heat moved from 28.4 to 28.6 s to start with the line.
  3. **Verdict line 1 is "40 years of median pay: ≈ 33 seconds."**, not "A working life: ≈ 33 seconds." This keeps round 2's rule (V5) that the verdict names the median. The VO still says "A working life".
  4. **The pinned comment adds the swap-in rule:** "yearly pay × 40 ÷ 78,000 = your working life in seconds". Both judges docked A because the blocks are the median, not the viewer's own pay. The new-car line went, because it belonged to the old 1-second duel.
  5. **The `timer` gets an end label, "≈ $4.7 million" on its 60 s mark, at 25.3 s** (a proposal, like the timer itself). Judge 2 said the minute "is asserted in the VO, not shown".
  6. **Kit-facing changes:**
     - `opener` carries `blocks: 40` and `unit: 65052`, so a kit can time the block-eating from the data (block n at n × 0.8319 s).
     - `carry` is removed, because the stack is in his arms from frame 1.
     - `actions` are rewritten for the new milestones.
- **What the judges still flag (not fixed here):**
  - "40 years of pay" is not a small input (R4).
  - The debt is the government's (R6 partial).
  - The block-stack, the stamp and the ring are proposals that the Becker kit does not draw yet.
- **Today's render, checked in stills at 0, 1.5, 3, 25.5 and 33.4 s:**
  - At 0.0 s, frame 1 shows the header, the footer with $1,251 × 52, the panel at $0 and NEXT "3 years of median pay: $195,156".
  - At 1.5 s the counter reads $117,302 under the caption "Your 40 years, or 1 minute?".
  - At 3.0 s the strip shows "✓ 3 years of median pay: $195,156" as the wad lands. This is the first rendered payoff, at 2.50 s.
  - The 2-line verdict fits the caption band at 33.4 s.
- **Write-up:** the 10b section was rewritten: hook, title, frame 1, wrong belief, rules, benchmarks, beat sheet, VO, maths, caption, pinned comment and notes. The shared decisions were updated too. The car's source rows are gone, along with the car itself.

**Files:**
- `studio/specs/10b-becker-rig-debt-vs-your-pay.json`: new hook. `node src/cli.mjs check`: 0 errors, 0 warnings. 10a and 10c are unchanged and still clean.
- `checks/10-cost-counter.py` changes:
  - It rebuilds 10b from the new hook. New constants: `MINUTE`, `PAY3` and `PAY20`.
  - New asserts: 1 minute beats 40 years; the working life goes inside the minute; the public-held part alone still wins; the 40-year pass comes before the stop.
  - One-rounding guards were added for ≈ $4.7 million, ≈ $117,000 and ≈ 72 years.
  - The house, $1 million and car checks were dropped from 10b.
  - Result: **853 checks, 0 failures**.
- `teasers/v2/teasers.json`: the 10b entry's title, header, runtime (36.6 s) and key numbers were updated.
