# Format 10: real-time cost counter, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Format:** `cost-counter`. No hook pattern of its own in the hook bank ("–"). The hooks borrow the grammar of P1, P4, P6, P7 and P9 winners (quoted under each teaser).
**Lane:** a real-time dollar counter at a verified rate (interest on the US debt, new US debt, a mega-company's sales per second)
**Files:**
- Specs:
  - [`studio/specs/10a-scoreboard-debt-interest-live.json`](../../studio/specs/10a-scoreboard-debt-interest-live.json)
  - [`studio/specs/10b-becker-rig-debt-vs-your-pay.json`](../../studio/specs/10b-becker-rig-debt-vs-your-pay.json)
  - [`studio/specs/10c-live-sheet-amazon-makes.json`](../../studio/specs/10c-live-sheet-amazon-makes.json)
- Check: [`teasers/v2/checks/10-cost-counter.py`](checks/10-cost-counter.py). Run `python3 teasers/v2/checks/10-cost-counter.py`. It recomputes every number from the sourced inputs, rebuilds every display string, then compares them with the three specs and with the caption and pinned-comment numbers in this file. It prints a table and exits 1 on any mismatch.
  - It reports **558 checks, 0 failures** and exits 0.
  - As a test I changed one counter final (10a), one VO number (10b) and one pinned-comment number (10c). It exited 1 with 7 failures, naming all three.

**How the facts were checked**
- **Searches:** I used **13 of the 14** web searches allowed.
- **Fetches were blocked.** The egress proxy blocked every page fetch I tried: fiscal.treasury.gov, cbo.gov, americanactionforum.org, jec.senate.gov and treasurydirect.gov. Each figure below therefore rests on search results: the publisher's page, its URL and date, and the search engine's quote of the page. Pages marked **[click-check]** should be opened once before posting.
- **Two sources per figure.** Every rate input has two independent sources: a primary or official one plus a second publisher. The one exception is the FY2026 debt growth ($2.46T). It has one direct source plus two independent consistency checks (GAO and Euronews), set out under 10b.
- **No market data.** No teaser uses a market price or a forecast on screen.

**Studio linter:** `node src/cli.mjs check` passes on all three specs: **3/3 clean, 0 errors, 0 warnings**.
- I shortened the 10b footer once, because its first line had rendered at 36 px.
- `formats/cost-counter.js` is still a stub in all three kits (Scoreboard, Becker Rig, Live Sheet). The lint therefore covers the header, footer, captions and verdict, but not the counter itself. Re-run it once the modules land.
- I rendered stills at 0 s and about 33 s. In all three, the header, footer, caption band and verdict fit their zones.
- Everything in `lookOpts` is a proposal for the kit builder. Each spec renders its story from the contract fields alone.

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
4. **What we add** (04-formats twist): the working in a footer ("≈ $X a second"), milestones the viewer owns (their year of pay, a house), and a verdict (R12). HD Guy's counter never says what the number means.
5. **Pitfall, and why it is a 3:**
   - The format lives on spectacle footage we will not have.
   - Its two civilian money topics flopped: "Wages Visualized In Real Time" got **9,025** and "Cost Of Data Centers In Real Time" got **8,288** (URLs unknown).

   So every teaser below puts a number the viewer owns into the first 3 s (R3, R10), says "you" (R6) and ends on a verdict a viewer can repeat (R12). The counter alone is not the hook.

### Decisions shared by all three

- **The counter starts at frame 1, at $0, and "since you hit play" is literal.** The counter starts the moment the video does, so the number on screen is what passed while this viewer watched.
  - At 0.0 s the rate ("≈ $X every second") and the footer's working are already on screen (R1).
  - The counter is ticking by frame 2. That is HD Guy's "already running" opener.
  - The loop restarts the count, which is honest on every replay.
- **Milestones are the viewer's own money, and they repeat across the series.** They are a year of median full-time pay ($1,251 a week × 52 = **$65,052**, BLS Q2 2026) and a median new house (**$393,700**, Census, Aug 2026). The viewer learns the yardsticks once.
  - In every teaser the pay milestone is the first payoff, inside 3 s (R10): 2.1 s, 0.83 s and 2.9 s.
  - The VO always gives the swap-in rule for the viewer's own pay (R3): "Divide your pay by 30,800" in 10a. The pinned comments do the same in 10b and 10c.
- **Rounding:**
  - Every rounded number shows "≈" on screen and in the captions, and that includes the counters' final readings.
  - Rates are shown to 3 significant figures (10b to 2, because $78,006 → "≈ $78,000").
  - Times are given to the second in the VO, and to 0.1 s on the Live Sheet.
  - The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$65,052" = 4 words, "2025" = 2, "US" = 2). Every milestone the VO names passes within 0.5 s of the word: the largest gap is 0.06 s.
- **Lane check:**
  - These are counters at a real rate, over one continuous stretch.
  - No find-your-row table: 10c has only 2 milestone rows, not one per viewer.
  - No unit stacks (that is `unit-ladder`).
  - No race between two assets (`chart-race`).
  - No "instead of paying" (`pov-race`).
- **10a and 10b are both about the federal debt, but they are different numbers:**
  - 10a is the interest (a cost, $970B a year);
  - 10b is the growth of the debt itself ($2.46T a year).
  - Post them at least a week apart, or as a labelled pair ("Part 2: the debt itself").
- **Tone:**
  - Factual and non-partisan: no party, no person and no policy is named.
  - Educational maths only, no advice language.
  - No logos. "Amazon" appears only as text.

---

## 10a: Scoreboard: "US debt interest, since you hit play"

| | |
|---|---|
| Look | `scoreboard` (black bars, neon-green odometer in the top bar, label stack in the bottom bar, footer working) |
| Spec | `studio/specs/10a-scoreboard-debt-interest-live.json` (36.5 s) |
| Platform title | **US Debt Interest in Real Time** |
| On-screen hook (header) | **US DEBT INTEREST, / SINCE YOU HIT PLAY** (7 words, 2 lines; "PLAY" in green) |
| Frame 1 | Header. The odometer reads **$0** and starts rolling at once. The label stack shows "≈ $30,800 / EVERY SECOND". Footer: "FY2025 net interest $970B ÷ 31,536,000 s". Four ladder pips (one per milestone) show the countable loop |
| Footer | FY2025 net interest $970B ÷ 31,536,000 s |

**Topic vs the seed:**
- Kept: interest on the US national debt per second, from the latest full-year Treasury net-interest figure (FY2025: $970 billion).
- Added: the milestones are the viewer's own yardsticks, and the ending is a round number anyone can repeat: **$1 million in ≈ 33 seconds**.
- Why not FY2026: Treasury's final statement for FY2026 (which ended 2026-09-30) is not out yet. CBO projects FY2026 above $1.0 trillion, so this counter runs slightly slow. The caption says so.

**Wrong belief it exploits**
1. "A few seconds of a government budget line is small change." In fact a year of median pay goes in **2.1 s**.
2. "Interest payments pay the debt down." None of it does: interest is the cost of carrying the debt, and the VO says so at 23.4 s.
3. "$1 million is a lot of money." In fact it takes **≈ 33 seconds**.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, rolling), "≈ $30,800 every second" and the footer's "$970B ÷ 31,536,000 s" are on screen at 0.0 s |
| R2 | The hook line holds no result and no number (HD Guy's titles carry none: "the number is the payoff"). The one input, the rate, sits in the label stack |
| R3 | The VO's swap-in rule: "Divide your pay by 30,800. That's your seconds." The pinned comment repeats it |
| R4 | The yardsticks are a year of pay and a house, not "$970 billion" |
| R5 | Three implied wrong answers (above), made visible by the numbers, with no "most people think" |
| R6 | You ("since you hit play") + an amount (the counter) + a horizon (this video) |
| R7 | The milestones are named, not "big numbers" |
| R8 | 7 words, 2 lines |
| R9 | 4 milestone pips are visible from 0.0 s, and each one lights as it is passed |
| R10 | First payoff at 2.1 s (a year of median pay). The biggest number ($1 million) comes last |
| R11 | The screen counts; the caption gives the verdict ("$1 million in ≈ 33 seconds, and none of it pays the debt down") |
| R12 | One number to repeat: **$1 million every ≈ 33 seconds** |

**Benchmark hooks it is modelled on**
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**, frame 1 "$0.30". **28,289,823 views, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the title grammar "[Thing] Cost in Real Time", a counter already rolling at 0.0 s, round milestones as the open loop, 0 cuts, and an ending on the peak with no CTA.
- **H45, @investment_timeline, "POV: You invested in Monster instead of paying $3/day for a Monster Energy"**. **1.5M, 140.6x.** https://www.tiktok.com/@investment_timeline/video/7671760671867997473
  - Borrowed: the second-person stake. The counter is framed as *your* time ("since you hit play").
- **H84, Master Money, "Take your salary and multiply it by 0.7…"** (spoken). **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the spoken swap-in instruction ("Divide your pay by 30,800").

**Beat sheet** (milestone pass time = value ÷ $30,758.50 a second)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Odometer **$0**, rolling. Label "≈ $30,800 / EVERY SECOND". Footer. 4 pips | "US debt interest. Live." (0.0-2.0) |
| 2.11 | The counter passes **$65,052**. Pip 1 lights. Label slams: "$1,251 × 52 = $65,052 / A YEAR OF MEDIAN PAY". Thud | "There goes a year of median pay." (2.1-4.9) |
| 5.1 | Label back to the rate: "≈ $30,800 / EVERY SECOND" | "≈ $30,800 a second." (5.1-8.2) |
| 8.3 | (counter running, about $255,000 at this point) | "Divide your pay by 30,800. That's your seconds." (8.3-12.6) |
| 12.80 | The counter passes **$393,700**. Pip 2. Label "$393,700 / A MEDIAN NEW HOUSE". Thud | "A median new house. Gone." (12.8-14.8) |
| 15.2 | Label "≈ $30,800 × 3,600 s / ≈ $111 MILLION AN HOUR" | "That's ≈ $111 million an hour." (15.2-18.7) |
| 21.15 | The counter passes **$650,520**. Pip 3. Label "$65,052 × 10 = $650,520 / 10 YEARS OF MEDIAN PAY". Thud | "10 years of median pay." (21.1-23.1) |
| 23.4 | (counter running) | "None of it pays the debt down. It's just interest." (23.4-27.3) |
| 27.6 | (counter running; the odometer glows hotter) | "At fiscal 2025's rate: $970 billion a year." (27.6-32.3) |
| 32.51 | The counter passes **$1,000,000**. Pip 4. Label "$1,000,000 / $1 MILLION". Hit + cash | "$1 million. In ≈ 33 seconds." (32.5-35.3) |
| 32.5 | Verdict replaces the label stack: "**$1 MILLION** IN ≈ 33 SECONDS. / JUST THE INTEREST." | |
| 32.6 | The counter stops at **≈ $1,002,727** | |
| 32.6-36.5 | Hold, then a hard cut back to frame 1 (loop) | |

**Full guide VO** (79 spoken words)

> US debt interest. Live. There goes a year of median pay. About $30,800 a second. Divide your pay by 30,800. That's your seconds. A median new house. Gone. That's about $111 million an hour. 10 years of median pay. None of it pays the debt down. It's just interest. At fiscal 2025's rate: $970 billion a year. $1 million. In about 33 seconds.

**The maths**

- **Basis:** FY2025 net interest of $970,000,000,000, spread evenly over a 365-day year of 31,536,000 seconds.
- **Rate:** r = $970B ÷ 31,536,000 = $30,758.498… a second (spec `perSecond` 30,758.50).
- **Counter:** value(t) = r × t, with t in seconds from 0.0.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Rate | 970,000,000,000 ÷ 31,536,000 | 30,758.498 | ≈ $30,800 every second |
| Per hour | r × 3,600 | 110,730,594 | ≈ $111 million an hour |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 (exact) |
| 10 years of median pay | $65,052 × 10 | 650,520 | $650,520 (exact) |
| Pass: a year of pay | 65,052 ÷ r | 2.115 s | VO at 2.1 s |
| Pass: a median new house | 393,700 ÷ r | 12.800 s | VO at 12.8 s |
| Pass: 10 years of pay | 650,520 ÷ r | 21.149 s | VO at 21.1 s |
| Pass: $1 million | 1,000,000 ÷ r | 32.511 s | "≈ 33 seconds" |
| Counter final | r × 32.6 | 1,002,727.04 | ≈ $1,002,727 |
| Swap-in rule | your pay ÷ 30,800 | e.g. 65,052 ÷ 30,758.50 = 2.115 | "≈ 2.1 seconds" (caption) |
| "30,758" (caption) | r rounded to the dollar | 30,758.498 | ≈ $30,758 |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Net interest, FY2025: $970 billion** (Treasury's final Monthly Treasury Statement; the third-largest outlay after Social Security and Medicare) **[click-check]** | American Action Forum, "Sizing Up Interest Payments on the National Debt" (summarising Treasury's September 2025 MTS) | after Oct 2025 | https://www.americanactionforum.org/insight/sizing-up-interest-payments-on-the-national-debt/ |
| Same figure, independent: "net outlays for interest are projected to rise by $69 billion (or 7 percent), from $970 billion in 2025 to over $1.0 trillion in 2026" | Congressional Budget Office, *The Budget and Economic Outlook: 2026 to 2036* | February 2026 | https://www.cbo.gov/publication/62105 |
| Primary statement (fetch blocked by the proxy) | U.S. Treasury, Bureau of the Fiscal Service, Monthly Treasury Statement, September 2025 (FY2025 final) | October 2025 | https://www.fiscal.treasury.gov/files/reports-statements/mts/mts0925.pdf |
| Context, not used for the rate: CBO's FY2025 summary says net interest *on the public debt* passed $1 trillion. That is a narrower line which leaves out other interest the government earns, so using $970B keeps the counter conservative | CBO, "Monthly Budget Review: Summary for Fiscal Year 2025" | November 2025 | https://cbo.gov/publication/61307 |
| **Median full-time pay: $1,251 a week** (120.9 million full-time wage and salary workers, not seasonally adjusted, +4.6% a year) | U.S. Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026" (USDL-26-1257) | 2026-07-21 | https://www.bls.gov/news.release/archives/wkyeng_07212026.htm |
| Same, second source | DWM Magazine, "USBLS announces unemployment and wage rates" | 2026-07-24 | https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/ |
| **Median sales price of new houses sold, August 2026: $393,700** (down 5.8% from $417,900 a year earlier) | U.S. Census Bureau and HUD, New Residential Sales, August 2026 | 2026-09-24 | https://www.census.gov/construction/nrs/pdf/newressales_202608.pdf |
| Same, second source | First Trust, "New single-family home sales increased 6.4% in August" | 2026-09-24 | https://www.ftportfolios.com/Commentary/EconomicResearch/2026/9/24/new-single-family-home-sales-increased-6.4percent-in-august |

**Assumptions** (the footer carries the rate's; the label stack carries the pay basis "$1,251 × 52")
- FY2025 net interest ($970B) is spread evenly over a 365-day year. Real payments are lumpy (coupon dates), so this is the average rate.
- "Median pay" means BLS median usual weekly earnings of full-time wage and salary workers × 52.
- "Median new house" means the Census median sales price of new houses sold.

**Caption (IG / TikTok; also the YouTube description)**
> $1 million in ≈ 33 seconds, and none of it pays the debt down. In fiscal 2025 the US paid $970 billion in net interest (Treasury; CBO). Divide by the 31,536,000 seconds in a year: ≈ $30,758 a second. A year of median full-time pay ($1,251 a week × 52 = $65,052, BLS) lasts ≈ 2.1 seconds. Yours: divide your yearly pay by 30,800. CBO projects over $1.0 trillion for 2026 (+$69 billion, 7%), so this counter runs slow. Educational maths, not advice.
> #nationaldebt #interest #moneymath #realtime

**Pinned comment**
> Divide your yearly pay by 30,800. That's how many seconds of US debt interest it covers. Median full-time pay: ≈ 2.1 seconds. What did you get?

**Per-platform notes**
- **YouTube Shorts:** use HD Guy's title grammar exactly ("US Debt Interest in Real Time"). His Pattern B lives here, at a median of about 261K. Keep it with no CTA, and hard-cut back to frame 1 so the replay restarts the count.
- **Instagram Reels:** caption line 1 is the verdict. Use the verdict frame (32.5 s) as the cover.
- **TikTok:**
  - The comment fight will be "net vs gross interest" or "that's last year's number". The caption pre-empts both: the $970B is the net figure (a gross figure is bigger), and FY2026 is projected higher.
  - Reply with the CBO line rather than a new number.
  - Put "$1 million in ≈ 33 seconds" in the first 100 characters.
- **Look note:**
  - The Scoreboard's real-time mode is "0 cuts" (03-look-directions, Direction 3), so the stage stays a dark grid.
  - `lookOpts.labels` gives each milestone a label stack: line 1 holds the working in green ("$1,251 × 52 = $65,052"), line 2 the name in white caps.
  - `heroIcon: false`, because there is no unit object.

---

## 10b: Becker Rig: "Which is bigger: a year of your pay, or 1 second of new US debt?"

| | |
|---|---|
| Look | `becker-rig` (white void and floor, our green stick figure with the pencil, maths in ink, impact kit) |
| Spec | `studio/specs/10b-becker-rig-debt-vs-your-pay.json` (37.5 s) |
| Platform title | **Which Is Bigger: Your Yearly Pay or 1 Second of US Debt?** |
| On-screen hook (header) | **Which is bigger: a year of / your pay, or 1 second / of new US debt?** (15 words, 3 lines; "1 second" in green) |
| Frame 1 | Header and the 2-line footer. A generic "debt clock" readout panel ("NEW US DEBT SINCE YOU HIT PLAY", no real branding) shows **$0** and starts counting. The figure holds a **$65,052** block overhead (sub-label "1 year of median pay") |
| Footer | FY2026: debt +$2.46T ÷ 31,536,000 s / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: what the US national debt adds while you watch, in the Becker overheating counter (watch/alan-becker.md §6 idea 9, built on the *Clicks Per Second* structure).
- Changed: the counter is a **duel against the viewer's own pay** (HD Guy's "Which is cheaper? A or B" grammar). The first answer lands in 0.83 s, and the escalation ends on "a whole working life".
- Rejected: a company counter. That would repeat 10c.

**Wrong belief it exploits**
- "A whole year of my work is bigger than one second of anything." It isn't: 1 second of new debt (≈ $78,006) is more than a year of median pay ($65,052).
- The escalation then busts the belief that the debt clock moves slowly. A whole 40-year working life ($2,602,080) goes in ≈ 33 s.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The $65,052 block, the counter ($0, rolling) and the footer ($2.46T, $1,251) are on screen at 0.0 s |
| R2 | One input in the hook ("1 second"); the result is not given |
| R3 | "Your pay" is the stake. Viewers who earn more than $78,006 "win" (pinned comment): each viewer places themselves against one line |
| R4 | A year of pay and 1 second are both familiar units |
| R5 | The implied wrong answer is "my year, obviously". The counter passes it before the VO finishes "a year's pay" |
| R6 | You + your yearly pay + 1 second |
| R7 | Two named options, so the viewer picks a side at frame 1 |
| R8 | 15 words, 3 lines (the limit) |
| R9 | The figure's prop queue (pay block, house, 40-year block) and the heat states are the countable loop: each prop goes into the counter in turn |
| R10 | First payoff at 0.83 s. The biggest number (a working life, $2.6 million) comes last |
| R11 | The question is on screen; the caption gives the verdict ("1 second of new US debt beats a year of median pay") |
| R12 | A winner you can repeat: **the debt, in under 1 second**; and **40 years of pay ≈ 33 seconds** |

**Benchmark hooks it is modelled on**
- **H07, HD Guy, "Which is cheaper? 1 Missile or 75 Rounds/Second"**. **11,957,600 views, 3.81x.** https://www.youtube.com/shorts/TIRAehb_9sc
  - It is the channel's only question-form title, and it is in its top 6 by views.
  - Borrowed: "Which is [X]: A, or [a per-second amount]?", where one side is a rate.
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**, frame 1 "$0.30". **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counter running from frame 1, round milestones, and an ending at the peak.
- **H84, Master Money, "Take your salary and multiply it by 0.7"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the viewer's own pay as the input.
- **Look reference** (not benchmark evidence): Alan Becker's *Clicks Per Second*, watch/alan-becker.md §2.3.
  - Frame 1 is a familiar UI with the number already counting.
  - It escalates (solo → team → magic), and the counter heats from blue to orange to white, cracks and explodes.

**Beat sheet** (milestone pass time = value ÷ $78,006.09 a second; gag beats from `lookOpts`)

| t (s) | On screen (Becker action) | VO |
|---|---|---|
| 0.0 | Header, footer. Debt-clock panel at **$0**, counting. The figure lifts the **$65,052** block ("1 year of median pay") toward the panel's slot | "A year's pay? Under 1 second." (0.0-2.4) |
| 0.83 | The counter passes **$65,052**. **Swallow:** the panel slurps the block out of his hands. Thud, small shake. Label "A year of median pay: $65,052" | (…"pay" lands at ≈ 0.8 s) |
| 2.5 | He stares at his empty hands, then at the panel | "That's new US debt, live." (2.5-4.9) |
| 5.05 | The counter passes **$393,700**. **Push:** he shoves a house into the slot, and it goes down in one gulp. Label "A median new house: $393,700" | "A median new house: ≈ 5 seconds." (5.0-7.8) |
| 8.0 | The rate stamps under the panel: "≈ $78,000 every second" | "≈ $78,000 a second." (8.0-10.4) |
| 12.82 | The counter passes **$1,000,000**. **Shocked:** he jumps back; the panel turns **orange** and its last digits blur. Buzz | "$1 million: ≈ 13 seconds." (12.8-15.2) |
| 15.5 | **Carry:** he drags in a huge block, "40 years × $65,052 / ≈ $2.6 million", with an effort loop | "Now 40 years of median pay." (15.5-17.9) |
| 18.1 | He heaves it up to the slot. It sticks halfway | "40 × $65,052 ≈ $2.6 million." (18.1-22.8) |
| 23.0 | He leans on it. The panel shudders | "That's a whole working life." (23.0-25.0) |
| 25.3 | The panel goes **white-hot** and smoke curls | "The debt grew $2.46 trillion in fiscal 2026." (25.3-30.4) |
| 30.4-33.4 | No VO: a riser as the panel cracks (hold, then snap) | |
| 33.36 | The counter passes **$2,602,080**. **Burst:** the panel bursts (white impact frame, shake, hit), and the 40-year block drops on the figure (flattened). Gag stamp "≈ 33 SECONDS" | "A working life: ≈ 33 seconds." (33.4-35.8) |
| 33.4 | The counter stops at **≈ $2,605,403**. Verdict in the caption band: "40 years of pay: / **≈ 33 seconds** of new debt." | |
| 33.4-37.5 | Hold. He peels himself off the floor and stares at the cracked panel (loop point) | |

**Full guide VO** (73 spoken words)

> A year's pay? Under 1 second. That's new US debt, live. A median new house: about 5 seconds. About $78,000 a second. $1 million: about 13 seconds. Now 40 years of median pay. 40 times $65,052: about $2.6 million. That's a whole working life. The debt grew $2.46 trillion in fiscal 2026. A working life: about 33 seconds.

**The maths**

- **Basis:** total public debt outstanding rose by $2.46 trillion in FY2026 (Debt to the Penny, 2025-09-30 to 2026-09-29), spread over a 365-day year.
- **Rate:** r = $2,460,000,000,000 ÷ 31,536,000 = $78,006.088… a second (`perSecond` 78,006.09).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Rate | 2.46e12 ÷ 31,536,000 | 78,006.088 | ≈ $78,000 every second |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 |
| 40 years of median pay | $65,052 × 40 | 2,602,080 | $2,602,080 / ≈ $2.6 million |
| Pass: a year of pay | 65,052 ÷ r | 0.834 s | "Under 1 second" |
| Pass: a median new house | 393,700 ÷ r | 5.047 s | ≈ 5 seconds |
| Pass: $1 million | 1,000,000 ÷ r | 12.820 s | ≈ 13 seconds |
| Pass: 40 years of pay | 2,602,080 ÷ r | 33.357 s | ≈ 33 seconds |
| Counter final | r × 33.4 | 2,605,403.35 | ≈ $2,605,403 |
| The duel | r vs $65,052 | 78,006 > 65,052 | the debt wins, in 0.83 s |
| "≈ $78,006" (caption) | r rounded to the dollar | 78,006.088 | ≈ $78,006 |
| "≈ 0.64 seconds" (pinned) | $50,089 ÷ r | 0.642 s | ≈ 0.64 seconds |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Debt growth, FY2026: $2.46 trillion.** The year ended at **$40,096,954,633,566.68** on 2026-09-29, the last reading before the year closed. Of the growth, $2.09T is held by the public and $369B is intragovernmental **[click-check]** | PrimeRates, "Federal Debt Grew $2.46 Trillion in Fiscal 2026 to End at $40.1 Trillion" (citing Treasury's Debt to the Penny) | early Oct 2026 | https://primerates.com/?p=13878 |
| Consistency check 1 (start level): total federal debt "near $37.6 trillion as of September 30, 2025", up about $2.2T in FY2025. $40.097T − $37.6T ≈ $2.5T, which agrees with $2.46T to the rounding of "$37.6T" | U.S. Government Accountability Office, GAO-26-107908 (highlights), audit of the FY2025 Schedules of Federal Debt | FY2025 audit | https://www.gao.gov/assets/gao-26-107908-highlights.pdf |
| Consistency check 2 (pace): $38T in October 2025, $39T in March 2026, $40.047T at the close of 2026-08-18. That is ≈ $2.0T in ≈ 10 months, or ≈ $2.4-2.5T a year | Euronews, "Five charts explaining America's $40 trillion debt" | 2026-08-22 | https://www.euronews.com/2026/08/22/five-charts-explaining-americas-40-trillion-debt |
| Primary dataset (fetch blocked by the proxy) | U.S. Treasury, Fiscal Data, "Debt to the Penny" | daily | https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/ |
| Median full-time pay $1,251 a week; median new house $393,700 | BLS (2026-07-21) and DWM Magazine (2026-07-24); Census/HUD (2026-09-24) and First Trust (2026-09-24) | | see 10a |
| **Average new-vehicle transaction price, August 2026: $50,089** (pinned comment only) | Cox Automotive / Kelley Blue Book, "August 2026 ATP report" | 2026-09-10 | https://www.coxautoinc.com/insights/august-2026-atp-report/ |
| Same, second source | Kelley Blue Book press release via Cision (WBOY), "Average New-Vehicle Transaction Price Moves Back Above $50,000 in August" | 2026-09-10 | https://digital-release.wboy.com/business/press-releases/cision/20260910LA45270/kelley-blue-book-report-average-new-vehicle-transaction-price-moves-back-above-50000-in-august |

**Assumptions** (in the 2-line footer and the milestone labels)
- The FY2026 growth ($2.46T) is spread evenly over 365 days. The debt grows in steps (auctions, tax dates), so this is the average rate.
- The debt is gross federal debt, which includes intragovernmental holdings.
- Pay is BLS median weekly earnings × 52. A "working life" is 40 years of that pay, with no raises. The label says "40 years of median pay".

**Caption (IG / TikTok; also the YouTube description)**
> 1 second of new US debt (≈ $78,006) beats a year of median pay ($65,052). The debt grew $2.46 trillion in fiscal 2026 and ended it at $40.097 trillion (Treasury's Debt to the Penny, Sept. 29, 2026). Divide by 31,536,000 seconds: ≈ $78,006 a second. 40 years of median pay ($1,251 a week × 52 × 40 = $2,602,080) ≈ 33 seconds. Educational maths, not advice.
> #nationaldebt #debtclock #moneymath

**Pinned comment**
> Earn more than $78,006 a year? Your year beats 1 second. Barely. A new car ($50,089, KBB, August 2026) lasts ≈ 0.64 seconds.

**Per-platform notes**
- **YouTube Shorts:** the question title is HD Guy's rarest and one of his biggest (H07). Keep the ending as a hard cut back to frame 1: the figure picks the pay block back up, and the loop restarts the count.
- **Instagram Reels:** use the burst frame (33.4 s) as the cover, with the verdict. Caption line 1 is the verdict.
- **TikTok:**
  - The fight will be "the debt includes money the government owes itself". The pinned reply: of the $2.46T, $2.09T is held by the public (still ≈ $66,000 a second, still more than a year of median pay). That figure is from the PrimeRates source above, and 2.09e12 ÷ 31,536,000 = $66,273.
  - Keep "1 second beats a year of pay" in the first 100 characters.
- **Look note:**
  - This needs the Becker kit's cost-counter module, a generic **debt-clock panel prop** (an LED readout, no usdebtclock.org styling), and 4 actions from the pose library: lift, push, shocked, flattened (all in §7.2's pilot set).
  - `lookOpts.heat` drives the overheat: cool → orange (12.8 s) → white (25.3 s) → burst (33.4 s).
  - One impact kit, at the burst only (README: "one per short").

---

## 10c: Live Sheet: "What Amazon makes while you watch this"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input and peach output headers) |
| Spec | `studio/specs/10c-live-sheet-amazon-makes.json` (31.0 s) |
| Platform title | **What Amazon Makes While You Watch This** |
| On-screen hook (header) | **What Amazon makes / while you watch this** (7 words, 2 lines; "makes" emphasised) |
| Frame 1 | Banner. Formula bar "= $716.9B ÷ 31,536,000 s ≈ $22,733 a second". The big counter cell "Since you hit play" reads **$0** and starts counting. The rows "A year of median pay · $65,052 · ___" and "A median new house · $393,700 · ___" show their "Passed at" cells empty. 2-line footer |
| Footer | Amazon 2025: net sales $716.9B, net income $77.7B / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: Amazon's latest annual revenue (2025 net sales, $716.9B) turned into a per-second counter, with milestones the viewer knows.
- Added: the **"makes" vs "keeps" twist**. Amazon kept ≈ 10.8% (net income $77.7B), so ≈ $2,464 a second. Even that slice is a year of median pay every ≈ 26 seconds.
- Why the twist: the Live Sheet's job is to show the working, and the formula bar is where revenue becomes profit.
- Why Amazon over Apple:
  - its revenue is the bigger counter (≈ $22,733/s vs Apple's smaller one);
  - "what Amazon makes" carries the wrong belief in one word.

**Wrong belief it exploits:** "What Amazon *makes*" is what it keeps (revenue = profit). In fact it keeps ≈ 11 cents of each dollar. The verdict then refuses to let the correction become a shrug: the kept part is still a year of median pay every ≈ 26 s.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter cell ($0, counting), the formula bar ($716.9B ÷ 31,536,000 s ≈ $22,733) and the two milestone amounts are on screen at 0.0 s |
| R2 | The hook line has no number and no result. The one input sits in the formula bar |
| R3 | A year of median pay is the first row, and the pinned comment gives the swap-in rule ("Your yearly pay ÷ 22,700") |
| R4 | A year of pay and a house, not "$716.9 billion" |
| R5 | One word does it: "makes". The same device as "What You **Actually** Make" (3.0M) |
| R6 | You ("while you watch this") + an amount (the counter) + a horizon |
| R7 | The company and the milestones are named |
| R8 | 7 words, 2 lines |
| R9 | 2 empty "Passed at" cells, plus the verdict row to come |
| R10 | First payoff at 2.9 s (a year of median pay). The biggest answer, the kept-pay verdict, comes last |
| R11 | The question is on screen; the caption gives the verdict ("'Makes' isn't 'keeps'") |
| R12 | One number to repeat: **a year of median pay, kept every ≈ 26 seconds** |

**Benchmark hooks it is modelled on**
- **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the single word that implies the viewer's wrong number ("make").
- **H70, The Market Hustle, "What You're Buying / When You Invest / $10,000 in These ETFs"**. **221,830** (pinned; 617 comments). https://www.instagram.com/reel/DMwLzi8PhdK/
  - Borrowed: the grammar "What [X] [verb] when/while you [action]", with the whole sheet on screen at 0.0 s.
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**. **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counter is running at 0.0 s, and milestones pull the viewer through.
- **Look evidence:** Debt Freedom's formula bar as proof ("What difference…", **1,900,000, 902.5x**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637).

**Beat sheet** (milestone pass time = value ÷ $22,732.75 a second; formula-bar steps from `lookOpts.formulaSteps`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. Formula bar "= $716.9B ÷ 31,536,000 s ≈ $22,733 a second". Counter cell **$0**, counting. Rows with empty "Passed at". Footer | "What Amazon makes while you watch this." (0.0-2.8) |
| 2.86 | The counter passes **$65,052**. Row 1's "Passed at" snaps to **≈ 2.9 s** and the row flashes yellow. Pop | "There goes a year of median pay." (2.9-5.7) |
| 5.9 | (counter running) | "Amazon's 2025 sales: $716.9 billion." (5.9-10.2) |
| 10.4 | The formula bar's "≈ $22,733 a second" flashes | "Divided by every second in a year: ≈ $22,700." (10.4-15.5) |
| 17.32 | The counter passes **$393,700**. Row 2's "Passed at" snaps to **≈ 17.3 s**. Pop | "There goes a median new house." (17.3-19.7) |
| 19.9 | Formula bar rewrites "= $77.7B ÷ $716.9B ≈ 10.8% kept". A new row slides in: "Kept as profit (≈ 10.8%)", its own counter already at its running total. Swipe | "That's sales. It keeps ≈ 11%." (19.9-22.7) |
| 22.9 | Formula bar "= $77.7B ÷ 31,536,000 s ≈ $2,464 a second" | "≈ $2,500 a second." (22.9-26.1) |
| 26.40 | The kept counter passes **$65,052**. Formula bar "= $65,052 ÷ $2,464 ≈ 26.4 s". Ding | "A year of median pay, kept every ≈ 26 seconds." (26.4-30.3) |
| 26.4 | Verdict band: "It keeps a year of median pay / every **≈ 26 seconds**." | |
| 26.5 | The counters stop: sales **≈ $602,418**, kept **≈ $65,292** | |
| 26.5-31.0 | Hold the finished sheet, then clear to frame 1 (loop) | |

**Full guide VO** (69 spoken words)

> What Amazon makes while you watch this. There goes a year of median pay. Amazon's 2025 sales: $716.9 billion. Divided by every second in a year: about $22,700. There goes a median new house. That's sales. It keeps about 11%. About $2,500 a second. A year of median pay, kept every about 26 seconds.

(Read the last line as "...kept every 26 seconds or so".)

**The maths**

- **Basis:** Amazon's 2025 net sales of $716,900,000,000 and net income of $77,700,000,000, each spread evenly over a 365-day year.
- **Rates:** sales r = $22,732.749… a second (`perSecond` 22,732.75); kept k = $2,463.851… a second (`lookOpts.kept.perSecond` 2,463.85).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Sales rate | 716.9e9 ÷ 31,536,000 | 22,732.750 | ≈ $22,733 a second (formula bar); ≈ $22,700 (VO, rate label) |
| Kept share | 77.7 ÷ 716.9 | 10.838% | ≈ 10.8% (sheet); ≈ 11% (VO); ≈ 11 cents of each dollar (caption) |
| Kept rate | 77.7e9 ÷ 31,536,000 | 2,463.851 | ≈ $2,464 a second (formula bar); ≈ $2,500 (VO) |
| Passed: a year of pay | 65,052 ÷ r | 2.862 s | ≈ 2.9 s |
| Passed: a median new house | 393,700 ÷ r | 17.319 s | ≈ 17.3 s |
| Kept passes a year of pay | 65,052 ÷ k | 26.403 s | ≈ 26 seconds (VO, verdict); ≈ 26.4 s (formula bar, with $2,464) |
| Sales counter final | r × 26.5 | 602,417.87 | ≈ $602,418 |
| Kept counter final | k × 26.5 | 65,292.05 | ≈ $65,292 |

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
> "Makes" isn't "keeps". Amazon took in $716.9 billion in 2025 (net sales) and kept $77.7 billion (net income): ≈ 11 cents of each dollar. Per second: ≈ $22,733 in, ≈ $2,464 kept. Even the kept part is a year of median pay ($65,052) every ≈ 26 seconds. Source: Amazon's Q4 2025 results (February 2026). Educational maths, not advice.
> #amazon #moneymath #revenue #profit

**Pinned comment**
> Your yearly pay ÷ 22,700 = seconds of Amazon sales. ÷ 2,464 = seconds of Amazon profit. Post yours.

**Per-platform notes**
- **YouTube Shorts:** the title asks the question. If it underperforms, A/B it with HD Guy's grammar ("Amazon Sales in Real Time"). Keep the 4.5 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** use the finished sheet with the verdict band as the cover. Caption line 1, "'Makes' isn't 'keeps'", is the verdict.
- **TikTok:**
  - The fight will be "revenue isn't profit" (the video agrees, which disarms it) or "AWS makes all the profit". Answer with the release's own segment figures only if asked; they are not used on screen.
  - Keep "≈ 11 cents of each dollar" early in the caption.
- **Look note:**
  - This follows the Live Sheet README §8 suggestion: a big counter cell with the rate in the formula bar, and milestones as rows under it.
  - The "kept" counter is a second live cell (`lookOpts.kept`). Without it, the kit still tells the story through the formula-bar steps, the VO and the verdict.
  - No Amazon logo or brand colours: the name is text in the banner.
