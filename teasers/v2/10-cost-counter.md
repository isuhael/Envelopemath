# Format 10: real-time cost counter, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (round-2 revision), hook pass 2026-10-08 (10b's hook replaced), hook pass 2 2026-10-08 (10a's and 10c's hooks replaced), assembly pass 2 2026-10-08 (10a and 10c re-paced; both counters now stop on their payoff), assembly pass 3 2026-10-08 (10b fitted and QA'd in the Becker kit's stack mode). What changed and why is in the **Review log** at the end.
**Format:** `cost-counter`. No hook pattern of its own in the hook bank ("–"). The hooks borrow the grammar of P4, P5, P6, P8 and P9 winners (quoted under each teaser).
**Lane:** a real-time dollar counter at a verified rate (interest on the US debt, new US debt, a mega-company's profit per second)
**Files:**
- Specs:
  - [`studio/specs/10a-scoreboard-debt-interest-live.json`](../../studio/specs/10a-scoreboard-debt-interest-live.json)
  - [`studio/specs/10b-becker-rig-debt-vs-your-pay.json`](../../studio/specs/10b-becker-rig-debt-vs-your-pay.json)
  - [`studio/specs/10c-live-sheet-amazon-makes.json`](../../studio/specs/10c-live-sheet-amazon-makes.json)
- Check: [`teasers/v2/checks/10-cost-counter.py`](checks/10-cost-counter.py). Run `python3 teasers/v2/checks/10-cost-counter.py`. It recomputes every number from the sourced inputs, rebuilds every display string, compares them with the three specs and with the caption and pinned-comment numbers in this file, prints a table and exits 1 on any mismatch.
  - It reports **981 checks, 0 failures** and exits 0 (after assembly pass 2; 949 after the assembly pass, 915 after hook pass 2, 853 after the first hook pass). Hook pass 2 rebuilt 10a on a salary ladder and 10c on Amazon's profit in weeks of median pay (4 rows), and dropped Amazon's sales from the check. Assembly pass 2 added the median and $500,000 rows to 10a's ladder (6 pass times) and a "lands on" rule: a counter that stops on its last milestone must be within $0.50 of it at both the exact and the stored rate, and then shows it with no "≈".
  - New in round 2: every footer must carry the viewer-owned pay figure ("$1,251 … × 52") at 0.0 s; every header must ask a question; **one rounding per quantity** (any number within 5% of a computed quantity, in a spec string, a VO line, a caption or a pinned comment, must be that quantity's one shown rounding); and a list of banned overclaims ("live", "in real time", "fiscal 2026" for a 364-day window, "Under 1 second" as a universal claim). Hook pass 2 added one exemption: 10a's $30,000 salary row is an exact input that happens to sit 2.5% under the ≈ $30,800 rate, so it is not read as a second rounding of the rate.
  - As a test I broke one thing per teaser in a scratch copy: the 10a footer without the pay figure, 10b's caption back to "≈ $78,006", and 10c's vo[6] back to "≈ $2,500". It exited 1 with 7 failures, naming all three. Run against the round-1 captions, the new guards flagged "$30,758", "$78,006", "$22,733" and "fiscal 2026".
  - Hook pass 2 test, in a scratch copy: 10a's $100K label as "≈ 3.2 seconds", 10a's vo[4] moved to 9.0 s, 10c's first row as "≈ 3 weeks" and 10c's pinned comment as "≈ 1.97". It exited 1 with 10 failures, catching all four (the wrong rounding, the VO overlap and the 0.87 s sync miss, the unsourced 3, and the second rounding of 1.97 weeks).
  - Assembly pass 2 test: 10a stopped at 32.5113 s (0.04 ms before its own $1 million pass) with final "≈ $1,000,000", the median label as "≈ 2.2 seconds", and 10c stopped at 26.5 s. It exited 1 with 20 failures, catching all four (the stop before the pass, the "≈" on an exact final, the second rounding of 2.115 s, and a $65,292 stop under a $65,052 final).

**How the facts were checked**
- **Searches:** this round used **8 of the 10** web searches allowed (round 1 used 13 of 14).
- **Fetches were blocked.** The egress proxy blocked every fetch: `api.fiscaldata.treasury.gov` (the Debt to the Penny API, by curl and by fetch), primerates.com, crfb.org, cbo.gov and thetrading.tools. Each figure below therefore rests on search results: the publisher's page, its URL and date, and the search engine's quote of the page. Pages marked **[click-check]** should be opened once before posting.
- **Two sources per on-screen figure.** Every rate input has a primary or official source plus a second publisher, or two confirmed readings of the same official series (10b).
- **Nothing unverifiable on screen.** 10b no longer claims a fiscal-year figure, because the 2026-09-30 reading could not be confirmed (Review log, item V4).
- **No market data.** No teaser uses a market price or a forecast on screen.

**Studio linter:** `node src/cli.mjs check` passes on all three specs: **3/3 clean, 0 errors, 0 warnings** (rerun after hook pass 2; 10a and 10c rerun after the assembly pass and again after assembly pass 2: 2/2 clean; the four kit samples of the two edited `cost-counter` modules are clean too).
- The Scoreboard, Live Sheet and Becker Rig `cost-counter` modules are all built (working tree), so all three specs are linted with their real counters.
- I rendered stills at 0 s, 1.5 s and the verdict for all three (10b again at 0 / 1.5 / 3 / 25.5 / 33.4 s after the hook pass; 10a at 0 / 1.5 / 3 / 33.5 s and 10c at 0 / 1.1 / 1.5 / 3 / 26.6 / 27.5 s after hook pass 2). In each, the header, the footer, the caption band and the verdict fit their zones.
- The Scoreboard and Live Sheet kits read every `lookOpts` key that 10a and 10c pass. The Becker kit draws 10b's block-stack, stopwatch, actions, heat keys and gag stamp (stack mode); only its `stamp` is not drawn (10b, Look note). Each spec still tells its story from the contract fields alone: the header asks, the footer carries the pay figure and the working, the counter runs, the verdict answers.

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
4. **What we add** (04-formats twist): the working in a footer, milestones the viewer owns (a ladder of round salaries, years or weeks of their pay), **a question the counter answers** (R5, R11), and a verdict a viewer can repeat (R12). HD Guy's counter never says what the number means.
5. **Pitfall, and why it is a 3:**
   - The format lives on spectacle footage we will not have.
   - Its civilian money topics flopped: "Wages Visualized In Real Time" got **9,025** and "Cost Of Data Centers In Real Time" got **8,288** (URLs unknown). HD Guy's government-money titles flopped too: "Real-Time Cost Of Alaska Summit 2025" 44,045 and "The $1Trillion US Defense Budget in Action" 12,051.

   So the counter is never the hook on its own. Every teaser below opens on a **question** with a wrong answer the viewer already holds, puts the viewer's pay figure on screen at 0.0 s (R1, R3), and ends on a lopsided verdict (R12).

### Decisions shared by all three

- **The counter is the answer machine; the header is the question.**
  - 10a: "When does it pass your salary?" The counter lights a ladder of salaries: $30,000 at ≈ 1.0 second, median pay at ≈ 2.1 seconds, $100,000 at ≈ 3.3 seconds, $1 million at ≈ 33 seconds, where it stops on exactly $1,000,000.
  - 10b: "40 years of your pay vs 1 minute of new US debt. Which is bigger?" The counter eats the 40 years in ≈ 33 seconds, 55% of the minute.
  - 10c: "How long do you work for 1 second of Amazon's profit?" The answer cells fill as the counter passes them: ≈ 2 weeks of median pay at 1.0 s, a year of it at ≈ 26 s, where it stops on exactly $65,052.
- **The counter starts at frame 1, at $0** in all three, so "since you hit play" is literal: the number on screen is what passed while this viewer watched. The loop restarts the count, which is honest on every replay.
  - 10b's 2.4 s armed pause and its ding were dropped in the hook pass (2026-10-08): nothing moved in its first 1.5 s.
  - 10c needs `lookOpts.preroll: 0`: without it the Live Sheet kit starts its counter 1 s in, which made the old 10c's frame 1 read $22,733 (found by the hook-pass-2 judges).
- **The viewer's own number is on screen at 0.0 s in every teaser:** the footer carries the pay basis ($1,251 a week × 52 = **$65,052**, BLS Q2 2026), and the checker enforces it. 10a also prints its salary ladder ($30K to $1M, with the median as its own "Median $65K" row, so the footer's pay figure pays off at 2.1 s) beside the pips from frame 1, so every viewer has a row.
  - The milestones are pay yardsticks: round yearly salaries plus the median in 10a; years of median pay in 10b (3, 10, 20 and 40); weeks, months and a year of median pay in 10c. The median new house left the series in hook pass 2.
  - The first payoff lands by 2.5 s in every teaser: the $30,000 row at 0.98 s (10a), ≈ 2 weeks of median pay at 1.0 s (10c), 3 years of median pay at 2.5 s (10b; its first $65,052 brick goes into the board at 0.83 s).
  - The swap-in rule for the viewer's own pay (R3): the VO says it in 10a ("Your seconds: yearly pay ÷ 30,800.", with the label stack working it for the median: "$65,052 ÷ 30,800 / ≈ 2.1 seconds") and 10c ("2,464 ÷ your weekly pay = your weeks."); the pinned comments repeat it, and 10b's gives it.
- **Rounding: one rounding per quantity.** A quantity shows one rounded figure everywhere it appears: spec strings, captions (the VO), formula bar, caption text and pinned comment. The checker enforces it.
  - Every rounded number shows "≈" on screen and in the captions, including 10b's counter final (≈ $2,604,105). 10a and 10c stop on their last milestone, within $0.50 of it, so their finals ($1,000,000 and $65,052) are exact dollar readings and carry no "≈" (assembly pass 2; the checker holds both rates to the $0.50).
  - Rates: 3 significant figures for 10a (≈ $30,800), 2 for 10b (≈ $78,000 a second, ≈ $4.7 million a minute), and Amazon's profit rate to the dollar (≈ $2,464) because the formula bar divides by it.
  - Times: whole seconds from 5 s up (≈ 8, ≈ 13, ≈ 16, ≈ 26, ≈ 33 s). Under 5 s, 10a's rows show tenths (≈ 1.0 / 2.1 / 3.3 s): whole seconds would put $30,000 and the median both at "≈ 1-2 s" and lose the ladder's point. Each time still has one rounding everywhere it appears; the median's 2.1 s is the same by the exact rate (2.115 s) and by the swap-in rule ($65,052 ÷ 30,800 = 2.112).
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$65,052" = 4 words, "2025" = 2, "US" = 2).
- **Sync:** the on-screen beat (label, thud, row) lands on the pass itself, and each milestone the VO names passes within 0.5 s of the moment it is said (the checker's limit).
  - 10a: median pay said at 2.1 s (pass 2.11), $100K at 3.25 (3.25), $250K at 8.5 (8.13, the widest gap at 0.37 s), $500K at 16.3 (16.26), $1 million at 32.5 (32.51). The $30K row is not spoken: it lights at 0.98 s, during "Find your salary.", and the label stack names it. Every label-stack beat starts with its VO line (5.4, 12.45, 19.1, 22.7, 28.0 s) and holds to the next beat, so the resting rate never shows over a line it does not match.
  - 10b: gaps of 0.03-0.14 s (3, 10, 20 and 40 years).
  - 10c: 5 seconds said at 5.2 (pass 5.0), ≈ 13 at 13.2 (13.20), ≈ 26 at 26.4 (26.40). The 1-second row snaps on screen at 1.0 s while the opening question is still spoken, and vo[1] reads it back at 2.8 s with the formula bar's working: the one accepted gap (1.8 s), so the hook keeps its spoken question.
- **Lane check:**
  - These are counters at a real rate, over one continuous stretch.
  - No find-your-row table. 10a's salary ladder has a row for every kind of viewer, but it is the counter's own milestone ladder (6 pips the counter lights), with no per-row computation shown and the counter still the mechanic. 10c's 4 rows are time slices of one counter (1, 5, ≈ 13 and ≈ 26 s).
  - No unit stacks (that is `unit-ladder`). 10b's 40-brick stack is a prop the counter eats, not a ladder of units.
  - No race between two assets (`chart-race`): every teaser has one counter.
  - No "instead of paying" (`pov-race`).
- **10a and 10b are both about the federal debt, but they ask different questions:**
  - 10a is the interest, against a ladder of yearly salaries (and, in the caption, what it does to the debt: nothing);
  - 10b is the growth of the debt itself, against the viewer's working life (40 years of pay vs 1 minute).
  - Post them at least a week apart, or as a labelled pair ("Part 2: the debt itself").
- **Tone:**
  - Factual and non-partisan: no party, no person and no policy is named.
  - Educational maths only, no advice language.
  - No logos. "Amazon" appears only as text.

---

## 10a: Scoreboard: "US debt interest since you hit play: when does it pass your salary?"

| | |
|---|---|
| Look | `scoreboard` (black bars, neon-green odometer in the top bar, milestone ladder on the stage, label stack in the bottom bar, footer working) |
| Spec | `studio/specs/10a-scoreboard-debt-interest-live.json` (36.5 s) |
| Platform title | **US Debt Interest Since You Hit Play: When Does It Pass Your Salary?** |
| On-screen hook (header) | **US DEBT INTEREST SINCE YOU HIT PLAY: / WHEN DOES IT PASS YOUR SALARY?** (13 words, 2 lines; "PLAY" and "YOUR SALARY" in green) |
| Frame 1 | Header. The odometer reads **$0**, centred, and rolls from frame 1 ($46,137 at 1.5 s). On the stage, a 6-pip salary ladder labelled **$30K · Median $65K · $100K · $250K · $500K · $1M** (bottom to top), with $30K lit as the next target, and the big bill ghost of the $30K row starting to fill, tagged "$30K" under it. Label stack "≈ $30,800 / EVERY SECOND". Footer "FY25: $970B ÷ 31,536,000 s · median $1,251 × 52". Caption "Find your salary." |
| Footer | FY25: $970B ÷ 31,536,000 s · median $1,251 × 52 |

**Topic vs the seed:**
- Kept: interest on the US national debt per second, from the latest full-year Treasury net-interest figure (FY2025: $970 billion).
- Changed in hook pass 2: **the yardstick is a ladder of round yearly salaries** ($30,000, $50,000, $100,000, $250,000, $1 million; since assembly pass 2: $30,000, median pay $65,052, $100,000, $250,000, $500,000, $1 million), and the viewer finds their own row. Pay is the yardstick, not the subject: HD Guy's one pay-as-subject counter, "Wages Visualized In Real Time", got 9,025 views.
- Dropped in hook pass 2: the question "How much comes off the debt?", its red "$0" slot, the median new house and the 10-year milestone. Both judges scored that hook 5: a gotcha whose answer ($0) many viewers can guess, with no number they own on screen. The $0 fact stays in the caption.
- Why not FY2026: Treasury's final statement for FY2026 (which ended 2026-09-30) is due about 2026-10-13 (the 8th business day of October; 2026-10-12 is a federal holiday). It is not out today. FY2026 interest is running higher, so this counter runs slow, and the caption says so in the past tense with the latest actual (CBO, through August). See the posting plan under the per-platform notes.

**Wrong belief it exploits**
1. **"My year's salary is a lot of money, even next to the government."** The counter passes $30,000 in ≈ 1.0 second, a year of median pay ($65,052) in ≈ 2.1 seconds and $100,000 in ≈ 3.3 seconds. Most viewers' whole year is gone before they finish reading the header.
2. "$1 million a year is out of reach." The counter gets there in **≈ 33 seconds**.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, rolling), the six salary pips ($30K to $1M, the median among them), "≈ $30,800 every second" and the footer's working are on screen at 0.0 s |
| R2 | The hook line holds one input, the viewer's own salary, and no result. The rate sits in the label stack and the footer |
| R3 | Full pass: every viewer's salary sits on or between the pips, and the first spoken words are "Find your salary." The footer's median pay is a row of its own (passed at 2.1 s, "Median pay: passed."). The swap-in rule for salaries between rows is spoken at 12.45 s ("Your seconds: yearly pay ÷ 30,800."), worked on screen for the median ("$65,052 ÷ 30,800 / ≈ 2.1 seconds") and pinned |
| R4 | Round, familiar salaries ($30K, $100K) and the median ($65K). "$970B" appears only as the footer's working, its label beat at 22.7 s and once in the VO |
| R5 | The implied wrong answer is "a while". The everyday rows go in ≈ 1.0 to 3.3 seconds, with no "most people think" |
| R6 | You (your salary) + an amount (the counter) + a horizon ("since you hit play"). The money is the government's, so this is a partial pass |
| R7 | The VO opens on an instruction ("Find your salary."), not a topic label |
| R8 | 13 words, 2 lines |
| R9 | 6 labelled pips from 0.0 s, each lit with a thud and a ding as it is passed (1.0, 2.1, 3.3, 8, 16 s); the $1M coin is the long pull, and the big icon on the stage carries its target ("$500K", "$1M") as a tag |
| R10 | First payoff at 0.98 s: the $30K pip lights and the label stack slams "$30,000 A YEAR / ≈ 1.0 SECOND". Three rows are gone by 3.3 s; the biggest ($1 million) comes last, where the counter stops on exactly $1,000,000 |
| R11 | The question is on screen and in the title; the one-line verdict answers it |
| R12 | A line to repeat: **$1M a year: ≈ 33 seconds.** The caption and pinned comment pair it with $100,000 ≈ 3.3 seconds |

**Benchmark hooks it is modelled on**
- **H64, Gage Heward, "What $1 costs you by age"** (48 blank rows, "Find your age"). **1,150,974 views, 210x the creator's median.** https://www.instagram.com/reel/Da_dukjxB56/
  - Borrowed: one row per kind of viewer, and the viewer finds theirs.
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**, frame 1 "$0.30". **28,289,823 views, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: a counter already rolling at 0.0 s, round milestones as the open loop, 0 cuts, and an ending on the peak with no CTA.
- **H57, Yannick, "Do all 4 if you make $20/hr…"**. **50,206 (2.8x median).** https://www.instagram.com/reel/Dd2QzRzRrGT/
  - Borrowed: a wage in the hook that filters the viewer in.
- **H32 and H35, FinCalC TV, 16-row Post Office tables**. **428,862 (54.46x) and 264,377 (51.68x).** https://www.youtube.com/shorts/K2QbxGXa29k, https://www.youtube.com/shorts/0Gc_IRi9RbU
  - Borrowed: a ladder of round inputs on screen at frame 1.
- **H84, Master Money, "Take your salary and multiply it by 0.7…"** (spoken). **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: the spoken swap-in instruction ("Yearly pay ÷ 30,800").
- **Contrast, H15, HD Guy, "Wages Visualized In Real Time"**: **9,025**. Pay as the subject of the counter flopped; here pay is only the yardstick.

**Beat sheet** (milestone pass time = value ÷ $30,758.50 a second)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Odometer **$0**, rolling. 6 pips "$30K · Median $65K · $100K · $250K · $500K · $1M"; $30K lit as the next target. Bill ghost filling, tagged "$30K". Label "≈ $30,800 / EVERY SECOND". Footer | "Find your salary." (0.0-1.4) |
| 0.98 | The counter passes **$30,000**. Pip 1 lights (thud + ding); label slams "$30,000 A YEAR / ≈ 1.0 SECOND" (held to the next pass); the bill flies to the ladder (the labels it crosses duck) and the median's bill drops in | |
| 1.5 | The counter reads $46,137; the median bill is 71% full | |
| 2.11 | The counter passes **$65,052** (median pay, the footer's $1,251 × 52). Pip 2; tag "MEDIAN $65K" turns green. Label "MEDIAN PAY: $65,052 / ≈ 2.1 SECONDS" | "Median pay: passed." (2.1-3.25) |
| 3.25 | The counter passes **$100,000**. Pip 3. Label "$100,000 A YEAR / ≈ 3.3 SECONDS" (to 5.4) | "$100,000: passed." (3.25-5.25) |
| 5.4 | Label slams the rate "≈ $30,800 / EVERY SECOND" (to the $250K pass) | "≈ $30,800 a second." (5.4-8.5) |
| 8.13 | The counter passes **$250,000**. Pip 4. Label "$250,000 A YEAR / ≈ 8 SECONDS" (held to 12.45) | "$250,000 a year: ≈ 8 seconds." (8.5-12.4) |
| 12.45 | Label "$65,052 ÷ 30,800 / ≈ 2.1 SECONDS (MEDIAN)": the rule, worked for the footer's pay | "Your seconds: yearly pay ÷ 30,800." (12.45-16.3) |
| 16.26 | The counter passes **$500,000**. Pip 5. Label "$500,000 A YEAR / ≈ 16 SECONDS"; the $1M coin drops in | "$500,000: ≈ 16 seconds." (16.3-19.0) |
| 19.1 | Label "≈ $30,800 × 3,600 s / ≈ $111,000,000" (the working; the caption says the sentence) | "That's ≈ $111 million an hour." (19.1-22.6) |
| 22.7 | Label "$970B ÷ 31,536,000 s / ≈ $30,800 EVERY SECOND" (held to 28.0) | "At fiscal 2025's rate: $970 billion a year." (22.7-27.4) |
| 28.0 | Label "NEXT / $1,000,000 A YEAR" (held until the verdict replaces it) | "And the last row?" (28.0-29.6) |
| 30.1-32.5 | No VO: the kit's riser as the counter closes on $1,000,000 | |
| 32.5 | Verdict replaces the label stack, one line: "**$1M** A YEAR: ≈ 33 SECONDS." | "$1 million: passed." (32.5-34.1) |
| 32.51 | The counter passes **$1,000,000** and stops on it exactly (counterT ends 32.51135 s). Pip 6 (coin); the coin pops with its "$1M" tag; hit + cash | |
| 32.5-36.5 | Hold, then a hard cut back to frame 1 (loop) | |

**Full guide VO** (75 spoken words, digits expanded)

> Find your salary. Median pay: passed. $100,000: passed. About $30,800 a second. $250,000 a year: about 8 seconds. Your seconds: yearly pay divided by 30,800. $500,000: about 16 seconds. That's about $111 million an hour. At fiscal 2025's rate: $970 billion a year. And the last row? $1 million: passed.

**The maths**

- **Basis:** FY2025 net interest of $970,000,000,000, spread evenly over a 365-day year of 31,536,000 seconds.
- **Rate:** r = $970B ÷ 31,536,000 = $30,758.498… a second (spec `perSecond` 30,758.50).
- **Counter:** value(t) = r × t, with t in seconds from 0.0.
- **Salary rows:** pass time = salary ÷ r. Rows that pass under 5 s show tenths (whole seconds would put $30,000 and the median both at "≈ 1-2 s"); from 5 s up, whole seconds. Each time has one rounding everywhere it appears.
- **The stop:** the counter stops on the $1,000,000 pass: counterT ends at 32.51135 s, just after the exact pass (32.5113402 s) and the kit's stored-rate pass (32.5113383 s). r × 32.51135 = $1,000,000.30, so the board's dollar reading is exactly $1,000,000.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Rate | 970,000,000,000 ÷ 31,536,000 | 30,758.498 | ≈ $30,800 every second (label, VO, caption, pinned) |
| Per hour | r × 3,600 | 110,730,594 | ≈ $111 million an hour |
| Pass: $30,000 | 30,000 ÷ r | 0.975 s | ≈ 1.0 second (label) |
| Pass: median pay | $1,251 × 52 = $65,052; ÷ r | 2.115 s | ≈ 2.1 seconds (label, caption); VO at 2.1 |
| Pass: $100,000 | 100,000 ÷ r | 3.251 s | ≈ 3.3 seconds (label, caption, pinned); VO at 3.25 |
| Pass: $250,000 | 250,000 ÷ r | 8.128 s | ≈ 8 seconds (label, VO at 8.5) |
| Pass: $500,000 | 500,000 ÷ r | 16.256 s | ≈ 16 seconds (label, VO at 16.3) |
| Pass: $1,000,000 | 1,000,000 ÷ r | 32.511 s | ≈ 33 seconds (label, verdict, caption); VO "$1 million: passed." at 32.5 |
| Per hour, in digits (label) | r × 3,600 | 110,730,594 | ≈ $111,000,000 (the same 3-figure rounding as ≈ $111 million) |
| Swap-in label | $65,052 ÷ 30,800 | 2.112 | ≈ 2.1 seconds (median), the same as the exact 2.115 |
| Counter at 1.5 s | r × 1.5 | 46,137.75 | $46,137 (70.9% of the median bill) |
| Counter final | r × 32.51135 | 1,000,000.30 | $1,000,000 (stops on the $1M pass; no ≈: the dollar reading is exact) |
| Swap-in rule | your yearly pay ÷ 30,800 | e.g. 100,000 ÷ 30,800 = 3.247 | approximate by design; the labels use the exact rate (3.251 → ≈ 3.3). The on-screen worked example is the median, where both round to 2.1 |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Net interest, FY2025: $970 billion** (Treasury's final Monthly Treasury Statement; the third-largest outlay after Social Security and Medicare) **[click-check]** | American Action Forum, "Sizing Up Interest Payments on the National Debt" (summarising Treasury's September 2025 MTS) | after Oct 2025 | https://www.americanactionforum.org/insight/sizing-up-interest-payments-on-the-national-debt/ |
| Same figure, independent: "net outlays for interest are projected to rise by $69 billion (or 7 percent), from $970 billion in 2025 to over $1.0 trillion in 2026" (used here only for the $970 billion actual) | Congressional Budget Office, *The Budget and Economic Outlook: 2026 to 2036* | February 2026 | https://www.cbo.gov/publication/62105 |
| Primary statement (fetch blocked by the proxy) | U.S. Treasury, Bureau of the Fiscal Service, Monthly Treasury Statement, September 2025 (FY2025 final) | October 2025 | https://www.fiscal.treasury.gov/files/reports-statements/mts/mts0925.pdf |
| **FY2026 ran higher (caption only):** net interest *on the public debt* was $1,052 billion in the first 11 months of FY2026, up $111 billion (12%) from $941 billion a year earlier **[click-check]** | The Money Overview, "Interest on the national debt jumped $111 billion this fiscal year, CBO says" (citing CBO's *Monthly Budget Review: August 2026*, 2026-09-09; cbo.gov fetch blocked) | September 2026 | https://themoneyoverview.com/48-interest-on-the-national-debt-jumped-111-billion-this-fiscal-year-cbo-says/ |
| Direction confirmed, not quoted: FY2026 "interest costs reached an estimated $1.1 trillion, a record 3.4% of GDP" (search-result quote) | Committee for a Responsible Federal Budget, "U.S. Ran a $2 Trillion Deficit Last Year, We Estimate" | 2026-10-01 | https://www.crfb.org/blogs/us-ran-2-trillion-deficit-last-year-we-estimate |
| Context, not used for the rate: CBO's FY2025 summary says net interest *on the public debt* passed $1 trillion. That line is wider than the $970B net-interest total, so using $970B keeps the counter conservative, and the caption names which line its 12% is for | CBO, "Monthly Budget Review: Summary for Fiscal Year 2025" | November 2025 | https://cbo.gov/publication/61307 |
| **Median full-time pay: $1,251 a week** (footer and caption; 120.9 million full-time wage and salary workers, not seasonally adjusted, +4.6% a year) | U.S. Bureau of Labor Statistics, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026" (USDL-26-1257) | 2026-07-21 | https://www.bls.gov/news.release/archives/wkyeng_07212026.htm |
| Same, second source | DWM Magazine, "USBLS announces unemployment and wage rates" | 2026-07-24 | https://www.dwmmag.com/2026/07/24/usbls-announces-unemployment-and-wage-rates/ |

The salary rows ($30,000 to $1 million) are round yardsticks chosen for the ladder, not statistics, so they need no source.

**Assumptions** (the footer carries the rate's working and the pay basis)
- FY2025 net interest ($970B) is spread evenly over a 365-day year. Real payments are lumpy (coupon dates), so this is the average rate.
- The salary rows are yearly gross salaries.
- "Median pay" (footer, the median row and caption) means BLS median usual weekly earnings of full-time wage and salary workers × 52.

**Caption (IG / TikTok; also the YouTube description)**
> $100,000 a year of pay ≈ 3.3 seconds of US debt interest. $1 million ≈ 33 seconds. In fiscal 2025 the US paid $970 billion in net interest (Treasury; CBO). Divide by the 31,536,000 seconds in a year: ≈ $30,800 a second. A year of median full-time pay ($1,251 a week × 52 = $65,052, BLS) lasts ≈ 2.1 seconds. Yours: divide your yearly pay by 30,800. And $0 of it pays the debt down: interest is the cost of carrying the debt, not a repayment. Fiscal 2026 ran hotter: CBO's August review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow. Educational maths, not advice.
> #nationaldebt #interest #moneymath

**Pinned comment**
> Yearly pay ÷ 30,800 = your seconds ($100,000 ≈ 3.3). Which row are you?

**Per-platform notes**
- **Posting plan (preferred):** post after Treasury's September 2026 Monthly Treasury Statement (about 2026-10-13) and rebuild on FY2026 net interest. Set `NET_INTEREST_FY2025` in the check to the FY2026 figure and rerun it; it will list every string to change: perSecond, rateDisplay, intro, rateSteps (all five), vo[3], vo[5], vo[6], vo[7], vo[8] ("fiscal 2026's rate"), every row's label time, the VO times that must stay in sync, the verdict, counterT (the new $1 million pass, to 5 decimals, so the stop still lands on $1,000,000), hold, the footer ("FY26"), the caption (drop the "ran hotter" sentence) and the pinned comment. At $1.0-1.1 trillion the $1 million row moves from ≈ 33 s to ≈ 29-32 s and the $100,000 row from ≈ 3.3 s to ≈ 2.9-3.2 s. If it posts before then, it goes out as written: FY2025, with the past-tense caption.
- **YouTube Shorts:** the title asks the question and keeps HD Guy's "since you hit play" premise. No CTA; hard-cut back to frame 1 so the replay restarts the count (and the viewer can watch their own row again).
- **Instagram Reels:** caption line 1 pairs the $100,000 row with the verdict's $1 million. Use the verdict frame (33 s on: the board at $1,000,000, the lit coin, "$1M A YEAR: ≈ 33 SECONDS.") as the cover.
- **TikTok:**
  - Expected comment fights: "net vs gross interest", "that's last year's number", "my salary is before tax" (the rows are gross salaries) and "does any of it pay the debt down?". The caption pre-empts all four: $970B is the net figure (a gross figure is bigger), FY2026 ran higher, and $0 of it repays principal.
  - Reply with the CBO line rather than a new number.
  - Put "$100,000 a year of pay ≈ 3.3 seconds" in the first 100 characters.
- **Look note:**
  - The Scoreboard's real-time mode is "0 cuts" (03-look-directions, Direction 3), so the stage stays a dark grid.
  - The kit reads everything this spec passes: `intro` (the resting label stack), `labels` (one per row: "$30,000 a year" in green over "≈ 1.0 SECOND" in white caps; "Median pay: $65,052" for the median), `flash: 4.6` (a milestone holds the label stack to the next beat), `rateSteps` (five label-stack beats, each starting with its VO line and held to the next beat: the rate at 5.4 s, the median's worked swap-in at 12.45 s, the hourly working at 19.1 s, the $970B working at 22.7 s and "Next / $1,000,000 a year" at 28.0 s, held into the verdict), `pipLabels` ("$30K", "Median $65K" … "$1M" beside the ladder icons from frame 1) and `icons` (five bills and a coin for the $1 million row).
  - The labels carry the working and the captions the sentence, so no line sits on screen twice; the milestone beats (label "$250,000 A YEAR / ≈ 8 SECONDS" over the caption "$250,000 a year: ≈ 8 seconds.") are the format's call-and-response and stay.
  - The milestone labels start with "A" or "Median", so the kit stacks a twin icon for the repeated bills instead of a "×N" badge.
  - `final` is "$1,000,000" with no "≈", so the kit draws no unlit "≈" ghost beside the hero, and the number stays centred.
  - Kit changes in the Scoreboard `cost-counter` module (assembly pass 2): the big stage icon carries its pip label as a tag under the art (white while it fills, green on the pass, riding the icon's bump); ladder labels duck while a flying icon crosses them (this is what makes six labelled pips lint-clean: a $75K pip was dropped in hook pass 2 for exactly that contrast error); the hero is set 8% under its full fit, for air under the header and above the footer.
  - No `slot` (frame 1 holds one task), `heroIcon: false`, no spec sfx: the kit cues the riser, hit and cash on the last milestone.

---

## 10b: Becker Rig: "40 years of your pay vs 1 minute of new US debt. Which is bigger?"

| | |
|---|---|
| Look | `becker-rig` (white void and floor, our green stick figure with the pencil, maths in ink, impact kit) |
| Spec | `studio/specs/10b-becker-rig-debt-vs-your-pay.json` (36.6 s) |
| Platform title | **Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US Debt?** |
| On-screen hook (header) | **40 years of your pay vs / 1 minute of new US debt. / Which is bigger?** (15 words, 3 lines; "1 minute" in green) |
| Frame 1 | Header and the 2-line footer. A generic "debt clock" readout board ("New US debt since you hit play", no real branding) is **already counting from $0** (≈ $117,302 at 1.5 s), with the rate line "≈ $78,000 every second". Under it the figure hugs his stack of 40 cash bricks on an ink plinth, **"40 × $65,052 / 40 years of median pay"**, and a "1 MINUTE" stopwatch on the floor reads 0:00. The stack is the target: the board's slot eats one brick every 0.83 s |
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
| R1 | The running counter ($0 at frame 1), the rate line (≈ $78,000), the stack's plinth ("40 × $65,052") and the footer ($2.46T, 364 × 86,400 s, $1,251 × 52) are on screen at 0.0 s |
| R2 | One input against one input in the hook ("40 years" vs "1 minute"); the result is not given |
| R3 | "Your pay" is the stake. The blocks show the median, so the pinned comment gives the flip point (≈ $117,000 a year) and the swap-in rule (yearly pay × 40 ÷ 78,000 = your working life in seconds). Partial pass: the on-screen blocks are not the viewer's own |
| R4 | 40 years and 1 minute are round, familiar units. "$2.6 million" appears only as the working (40 × $65,052) |
| R5 | The implied wrong answer is "my 40 years, obviously". 1 minute is 1.8x bigger |
| R6 | You + 40 years of your pay + 1 minute. The debt is the government's, so this is a partial pass |
| R7 | Two named sides in the header and in the first VO line ("Your 40 years, or 1 minute?"); the counter answers |
| R8 | 15 words, 3 lines |
| R9 | The 40 bricks in his arms are the target from frame 1: one eaten every 0.83 s, a loop the viewer can count down, and the strip checks off 3, 10, 20 and 40 years. The stopwatch counts the minute |
| R10 | The counter moves at 0.0 s and the first brick goes at 0.83 s. At 1.0 s the counter reads $78,201 beside the stopwatch's 0:01. First payoff at 2.50 s (3 years of median pay, VO 2.4 s). The biggest number (a working life, $2.6 million) comes last |
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

**Beat sheet** (milestone pass time = value ÷ $78,201.35 a second, from 0.0 s; gag beats from `lookOpts`; as rendered, assembly pass 3)

| t (s) | On screen (Becker action) | VO |
|---|---|---|
| 0.0 | Header, footer. The board counts from **$0** over "≈ $78,000 every second". The figure hugs his 40-brick stack on its plinth ("40 × $65,052 / 40 years of median pay"); the "1 MINUTE" stopwatch reads 0:00 | "Your 40 years, or 1 minute?" (0.0-2.4) |
| 0.83 | The board's slot slurps the top brick (1 year of median pay, $65,052); one more every 0.83 s, each with a soft tick | |
| 1.0 | The counter reads $78,201; the stopwatch 0:01 | |
| 1.5 | The counter reads ≈ $117,302 (2.5% of the minute gone) | |
| 2.50 | The counter passes **$195,156**: the board kicks, a pop, and the strip rolls to "✓ 3 years of median pay: $195,156". **Swallow:** he squeezes the rest of his stack | "3 years, gone." (2.4-4.0) |
| 4.2 | The strip rolls back to "≈ $78,000 every second" as the line starts | "≈ $78,000 a second." (4.2-6.6) |
| 8.32 | The counter passes **$650,520**: "✓ 10 years of median pay: $650,520". **Push:** he braces against his stack; it keeps eating | "10 years of median pay." (8.2-10.6) |
| 10.6 | The strip rolls back to the rate | "The debt grew ≈ $2.46 trillion in 364 days." (10.6-16.4) |
| 16.5 | Heat key "orange": the digits, the rim and the stopwatch's arc snap from ink to red. Buzz | "Halfway: 20 years." (16.5-18.0) |
| 16.64 | The counter passes **$1,301,040**: "✓ 20 years of median pay: $1,301,040". **Shocked:** he jumps back against the post and lets go; half the stack is gone | ("20 years" is said at 16.88) |
| 18.2 | The strip rolls back to the rate. He points at what is left of his stack and its plinth (40 × $65,052) | "40 × $65,052 ≈ $2.6 million." (18.2-22.9) |
| 23.1 | He looks down at the few bricks left | "That's a whole working life." (23.1-25.1) |
| 25.3 | The stopwatch gets its end label, "≈ $4.7 million" (a red mark on its 60 s point); he looks up at the board | "1 minute: ≈ $4.7 million." (25.3-28.4) |
| 28.6 | Heat key "white": the board vibrates and steams; he cowers | "How long do 40 years last?" (28.6-31.0) |
| 31.1-33.3 | No VO: a riser as the last bricks go | |
| 33.27 | The counter passes **$2,602,080**: "✓ 40 years of median pay: $2,602,080" (it holds to the end) | |
| 33.3 | The counter locks on **≈ $2,604,105**. **Burst:** white impact frame, shake, side hit lines, hit; the board cracks; the blast knocks him back onto the floor against the post (flattened), arms empty. The stopwatch stops at 0:33, its arc at 55%. Verdict in the caption band: "40 years of median pay: **≈ 33 seconds**. / 1 minute of new US debt ≈ **$4.7 million**." | "A working life: ≈ 33 seconds." (33.3-35.7) |
| 33.42 | Gag: a red rubber stamp "≈ 33 SECONDS" slams over the emptied plinth, clear of the stopwatch's "≈ $4.7 million" | |
| 33.3-36.6 | Hold. He sits up, knees up, and stares at the cracked board. Hard cut to frame 1: the counter back at $0, the stack back in his arms (loop) | |

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
| 1 minute of new debt | r × 60 | 4,692,080.93 | ≈ $4.7 million (VO, verdict, stopwatch end label, caption) |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 (one block) |
| 40 years of median pay | $65,052 × 40 | 2,602,080 | $2,602,080 / ≈ $2.6 million |
| The duel | 1 minute ÷ 40 years of median pay | 1.803 | 1 minute is bigger (1.8x, md only); margin ≈ $2.1 million (md only) |
| Crossover pay | 1 minute ÷ 40 | 117,302.02 | ≈ $117,000 a year (pinned) |
| 1 minute in years of median pay | 1 minute ÷ $65,052 | 72.13 | ≈ 72 years of median pay (caption) |
| Block n eaten | n × $65,052 ÷ r | n × 0.8319 s | brick n slurped by the board (block-stack) |
| Pass: 3 years of pay | $195,156 ÷ r | 2.496 s | VO 2.4 |
| Pass: 10 years of pay | $650,520 ÷ r | 8.319 s | VO 8.2 |
| Pass: 20 years of pay | $1,301,040 ÷ r | 16.637 s | VO 16.5 ("20 years" said at 16.88) |
| Pass: 40 years of pay | $2,602,080 ÷ r | 33.274 s | ≈ 33 seconds (VO and verdict at 33.3) |
| Share of the minute used | 33.274 ÷ 60 | 55.5% | the stopwatch's arc stops at 55% (33.3 ÷ 60 at the lock; no figure printed) |
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
  - The Becker Rig `cost-counter` module draws 10b in its **stack mode** (`lookOpts.opener.prop: "block-stack"`, documented in the head of `looks/becker-rig/formats/cost-counter.js`; the kit README's §11 does not list it yet):
    - the readout board counting from frame 1, with the rate line, the ✓ strip at each pass and the lock on `final`;
    - 40 cash bricks on a plinth carrying `text` / `sub`, slurped one by one into a slot in the board's bottom edge (brick n at n × 65,052 ÷ perSecond, so every 0.83 s, with a soft tick);
    - the `timer`: a "1 MINUTE" stopwatch on the floor, elapsed m:ss in its face, an arc that fills in the heat colour, the end label "≈ $4.7 million" from 25.3 s, stopped at 0:33 and 55% by the lock;
    - the `heat` keys (orange at 16.5 s is the kit's red snap; white at 28.6 s adds vibration and steam), the four `actions`, the lock with its impact kit and cracks, and the `gag` stamp over the emptied plinth.
    - In stack mode there is no NEXT ticker and no dropping object: the stack is the target.
  - **Not drawn:** `stamp` ("1 second ≈ $78,000" at 1.0 s). The board's rate line shows "≈ $78,000 every second" from frame 1, and at 1.0 s the counter itself reads $78,201 beside the stopwatch's 0:01. A second rate label while the header is still being read would compete with it. The spec keeps the key (the check pins it) for a kit that draws it.
  - The `becomes` texts in `actions` are directions, not all literal: the kit has no orange (orange maps to its red snap) and does not blur digits, and "knocks him flat" renders as knocked back onto the floor against the post, knees up.
  - One impact kit, at the burst only (README: "one per short").

---

## 10c: Live Sheet: "How long do you work for 1 second of Amazon's profit?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, "≈" formula bar, white sheet on black, mint input and peach output headers) |
| Spec | `studio/specs/10c-live-sheet-amazon-makes.json` (31.0 s) |
| Platform title | **How Long Do You Work for 1 Second of Amazon's Profit?** |
| On-screen hook (header) | **How long do you work for / 1 second of Amazon's profit?** (11 words, 2 lines; "you" highlighted) |
| Frame 1 | Banner. The formula bar starts typing "= $77.7B ÷ 31,536,000 s ≈ $2,464" (one line). The counter row "Amazon's profit since you hit play / ≈ $2,464 every second" and the big cell at **$0**, counting ($3,696 at 1.5 s). Under it, the table "Since play · Profit · You work" with four rows, "1 second · ≈ $2,464", "5 seconds · ≈ $12,319", "≈ 13 seconds · $32,526" and "≈ 26 seconds · $65,052", and their four "You work" cells empty (the countable loop). 2-line footer with the pay basis. Caption "How long do you work for this?" |
| Footer | Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: Amazon's latest annual results (2025) turned into a per-second counter.
- Changed in hook pass 2: the counter is **profit** (2025 net income, $77.7B, ≈ $2,464 a second), and the answer is in the viewer's own unit, **weeks of median pay**, not dollars. The sales counter, the house row and the "makes vs keeps" twist are gone.
  - Both judges scored the old hook 4 and marked it dishonest as rendered: without `preroll`, the Live Sheet kit starts its counter 1 s in, so frame 1 read $22,733 under "since you hit play" and every pass landed ≈ 1 s early.
  - "Revenue isn't profit" is a correction most viewers already hold.
- Fixed: `lookOpts.preroll: 0`, so frame 1 is $0 and "since you hit play" is literal.
- Why Amazon: a household brand, and its profit per second (≈ $2,464) is the size of a couple of weeks' pay, so the comparison lands in a unit the viewer lives in.

**Wrong belief it exploits:** "A second of a company's profit is pocket change." 1 second of Amazon's 2025 profit (≈ $2,464) is **≈ 2 weeks** of median full-time pay; 5 seconds is ≈ 10 weeks; half a year of pay goes in ≈ 13 seconds and a whole year in ≈ 26.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, counting), the formula bar ($77.7B ÷ 31,536,000 s), the four time rows with their profit amounts and the footer's pay basis are on screen at 0.0 s |
| R2 | The hook line has one input (1 second) and no result: the four answer cells are empty |
| R3 | The answer unit is the viewer's: weeks of work, under the column head "You work" (the header's "you"). The rows use the median ($1,251 a week, in the footer and the verdict); the swap-in rule is spoken at 15.8 s ("2,464 ÷ your weekly pay = your weeks.") and pinned. Partial pass: the cells are the median's, not the viewer's own |
| R4 | Small, round inputs (1 second, 5 seconds) and a familiar unit (weeks, months, a year of pay). "$77.7 billion" appears only in the formula bar, the footer and once in the VO |
| R5 | The implied wrong answer is "a few minutes of my work". The first cell says ≈ 2 weeks |
| R6 | You ("do you work") + an amount (a second of profit) + a horizon ("since you hit play"). The money is Amazon's, so this is a partial pass |
| R7 | The VO opens on the question, not a label |
| R8 | 11 words, 2 lines |
| R9 | 4 empty answer cells, filled at 1.0, 5.0, 13.2 and 26.4 s (each pops 1.2× on a solid yellow fill for 0.6 s), with a yellow progress line under the next row and a riser into the last |
| R10 | First payoff at 1.000 s: row 1's cell pops "≈ 2 weeks". The biggest answer (a year of pay) comes last, as the big cell lands on exactly $65,052 |
| R11 | The question is on screen and in the title; the verdict answers it, climax first |
| R12 | A line to repeat: **A year of median pay: ≈ 26 seconds. 1 second ≈ 2 weeks.** |

**Benchmark hooks it is modelled on**
- **H04 and H01, HD Guy, "Cost in Units of Starbucks Lattes" and "Cost in Units of RTX 5090"**. **9,858,084 (106.16x) and 30,617,461 (62.49x).** https://www.youtube.com/shorts/NHbMe2F_JXY, https://www.youtube.com/shorts/E2oVrAwHDOw
  - Borrowed: a big sum re-priced in a unit the viewer lives in (here a week of work).
- **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: a "you" question about pay.
- **H64, Gage Heward, "What $1 costs you by age"**. **1,150,974, 210x median.** https://www.instagram.com/reel/Da_dukjxB56/
  - Borrowed: a personal cost, with every answer cell empty until it fills.
- **H32, FinCalC TV, 16-row Post Office MIS table**. **428,862, 54.46x.** https://www.youtube.com/shorts/K2QbxGXa29k
  - Borrowed: a sheet whose output cells fill row by row.
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**. **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counter is running at 0.0 s, and round milestones pull the viewer through.
- **Look evidence:** Debt Freedom's formula bar as proof ("What difference…", **1,900,000, 902.5x**, https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637).

**Beat sheet** (row pass time = value ÷ $2,463.85 a second, with `preroll: 0`; formula-bar steps from `lookOpts.formulaSteps`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner. The formula bar types "= $77.7B ÷ 31,536,000 s ≈ $2,464". Big cell **$0**, counting. Table with 4 empty "You work" cells. Footer | "How long do you work for this?" (0.0-2.7) |
| 1.00 | The counter passes ≈ $2,464 (1 second). Row 1's cell pops **≈ 2 weeks** (1.2×, solid yellow, 0.6 s); yellow wipe; pop sound. The progress line moves under "5 seconds" | |
| 1.5 | The counter reads $3,696 | |
| 2.8 | The formula bar retypes "= $2,464 ÷ $1,251 ≈ 2 weeks" | "≈ 2 weeks, at median pay." (2.8-5.2) |
| 5.00 | The counter passes ≈ $12,319. Row 2 pops **≈ 10 weeks** (its scale capped so it stays 14 px clear of "≈ $12,319") | |
| 5.2 | The formula bar retypes "= $12,319 ÷ $1,251 ≈ 10 weeks" (held to 13.2) | "5 seconds: ≈ 10 weeks." (5.2-7.2) |
| 7.4 | (the footer carries "$77.7B") | "Amazon's 2025 profit: $77.7 billion." (7.4-11.7) |
| 13.20 | The counter passes **$32,526**. Row 3 pops **6 months**. Formula bar "= $65,052 ÷ 2 = $32,526" | "≈ 13 seconds: half a year." (13.2-15.6) |
| 15.8 | The formula bar retypes "= $2,464 ÷ your weekly pay" (the swap-in rule, held to 26.4) | "2,464 ÷ your weekly pay = your weeks." (15.8-20.8) |
| 21.0 | (the progress line runs under the last row) | "And a whole year?" (21.0-22.6) |
| 24.0-26.4 | No VO: a 2.4 s riser as the counter closes on $65,052 | |
| 26.40 | The counter passes **$65,052** and stops on it exactly (counterT ends 26.4026 s). Row 4 pops **1 year**; hit. Formula bar "= $65,052 ÷ $2,464 ≈ 26 s". Verdict card in the caption band: "A year of median pay: **≈ 26 seconds**. / 1 second ≈ 2 weeks." | "≈ 26 seconds." (26.4-28.0) |
| 26.4-31.0 | Hold the finished sheet, then clear to frame 1 (loop) | |

The one VO gap over 0.5 s: row 1 snaps on screen at its pass (1.0 s) while the opening question is still spoken, and vo[1] reads it back at 2.8 s, with the formula bar's working typed at the same moment. Every other row is said within 0.2 s of its pass.

**Full guide VO** (53 spoken words, digits expanded)

> How long do you work for this? About 2 weeks, at median pay. 5 seconds: about 10 weeks. Amazon's 2025 profit: $77.7 billion. About 13 seconds: half a year. 2,464 divided by your weekly pay equals your weeks. And a whole year? About 26 seconds.

**The maths**

- **Basis:** Amazon's 2025 net income of $77,700,000,000, spread evenly over a 365-day year.
- **Rate:** k = $77.7B ÷ 31,536,000 = $2,463.851… a second (`perSecond` 2,463.85).
- **Counter:** value(t) = k × t, from 0.0 s (`preroll: 0`).

| On screen | Formula | Exact | Shown (everywhere) |
|---|---|---:|---|
| Profit rate | 77.7e9 ÷ 31,536,000 | 2,463.851 | ≈ $2,464 a second (formula bar, rate label, row 1, VO, caption, pinned) |
| 1 second in weeks of median pay | 2,463.851 ÷ 1,251 | 1.970 | ≈ 2 weeks (row, VO, verdict, caption); the formula bar's $2,464 ÷ $1,251 = 1.970 rounds the same |
| 5 seconds of profit | k × 5 | 12,319.25 | ≈ $12,319 |
| 5 seconds in weeks | 12,319.25 ÷ 1,251 | 9.848 | ≈ 10 weeks (row, formula bar, VO, caption); the formula bar's $12,319 ÷ $1,251 = 9.847 rounds the same |
| Half a year of median pay | $65,052 ÷ 2 | 32,526 | $32,526 = 6 months (exact) |
| Pass: half a year | 32,526 ÷ k | 13.201 s | ≈ 13 seconds (row, VO) |
| Pass: a year of median pay | 65,052 ÷ k | 26.403 s | ≈ 26 seconds (row, formula bar, VO, verdict, caption); 65,052 ÷ 2,464 = 26.401 rounds the same |
| Counter at 1.5 s | k × 1.5 | 3,695.78 | $3,696 (frame check) |
| Counter final | k × 26.4026 | 65,052.07 | $65,052 (stops on the 1-year pass; no ≈: the dollar reading is exact) |
| Kit row timing | value ÷ (65,052 ÷ 26.4026) | 1.000 / 5.000 / 13.201 / 26.403 s | the rows snap on the pass; row 4 at the stop itself |

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| **Amazon 2025 net income $77.7B ($7.17 a diluted share)**; net sales $716.9B (+12% from $638.0B; not used on screen since hook pass 2) | Amazon, "Amazon earnings Q4 2025 report" (company newsroom; the Q4 2025 results release) | February 2026 | https://aboutamazon.com/news/company-news/amazon-earnings-q4-2025-report |
| Same release, as distributed | "Amazon.com Announces Fourth Quarter Results" (press-release copy on Seeking Alpha) | February 2026 | https://seekingalpha.com/pr/20390462 |
| Same figures, independent report | exchange4media, "Amazon Q4 sales and marketing expense rises 8.7% to $14bn as net sales climb 14%" | February 2026 | https://www.exchange4media.com/digital-news/amazon-q4-sales-and-marketing-expense-rises-87-to-14bn-as-net-sales-climb-14-151740.html |
| Median full-time pay $1,251 a week | BLS (2026-07-21) and DWM Magazine (2026-07-24) | | see 10a |

**Assumptions** (in the 2-line footer and the verdict)
- 2025 net income is spread evenly over 365 days. Profit is seasonal and lumpy, so this is the year's average rate.
- "Profit" means GAAP net income for the full year, as Amazon reports it.
- "Median pay" means BLS median usual weekly earnings of full-time wage and salary workers ($1,251 a week); a year of it is × 52 ($65,052) and 6 months is half of that.

**Caption (IG / TikTok; also the YouTube description)**
> 1 second of Amazon's profit ≈ 2 weeks of median full-time pay. Amazon kept $77.7 billion in 2025 (net income). Divide by the 31,536,000 seconds in a year: ≈ $2,464 a second. Median full-time pay is $1,251 a week (BLS), so 5 seconds ≈ 10 weeks of it, and a year of it ($65,052) goes by every ≈ 26 seconds. Yours: 2,464 ÷ your weekly pay. Source: Amazon's Q4 2025 results (February 2026); pay: BLS. Educational maths, not advice.
> #amazon #moneymath #profit

**Pinned comment**
> 2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2. Yours?

**Per-platform notes**
- **YouTube Shorts:** the title is the header's question. Keep the 4.5 s hold on the finished sheet: that is the screenshot frame.
- **Instagram Reels:** use the finished sheet with the verdict (27 s on: the big cell at $65,052, row 4 "1 year", the verdict card) as the cover. Caption line 1 is the verdict's second line (1 second ≈ 2 weeks).
- **TikTok:**
  - Expected fights: "that's before tax" (the weeks are gross median pay, as the footer says), "net income includes one-off gains" (answer: the video uses the net income Amazon reports; other lines are not used on screen) and "AWS makes all the profit" (answer with the release's own segment figures only if asked).
  - Keep "1 second ≈ 2 weeks of median full-time pay" in the first 100 characters.
- **Look note:**
  - The Live Sheet `cost-counter` module reads everything this spec passes: `preroll`, `formulaSteps`, `columns`, `rows` (the display strings for each row) and `loop`. There is no `kept` row any more.
  - `final` is "$65,052" with no "≈", so the big cell lands on the row-4 amount with no ≈ chip, at the moment row 4 pops.
  - The 6 formula steps are one line each (32 characters at most). The kit sizes the bar for its longest string, and the round-2 steps ("… ≈ $2,464 a second", "… $1,251 a week ≈ 2 weeks") forced a 2-line, 128 px bar with a one-word orphan ("a second", "weeks") on the second line. One line gives the table and the counter that 52 px back. Assembly pass 2 dropped the 7.4 s retype of the frame-1 rate (it read as a loop glitch), so "= $12,319 ÷ $1,251 ≈ 10 weeks" holds to 13.2 s.
  - Kit changes in the Live Sheet `cost-counter` module (assembly pass 2): each answer cell pops on its pass (`pop`, default 1.2×, capped 14 px clear of the amount column, on a solid yellow fill for 0.6 s), and a riser (with a hit) carries a quiet run-up into the last pass (`riser`, default on).
  - `preroll: 0` is required: the kit's default 1 s preroll would put $2,464 in frame 1 and snap the 1-second row before the first frame.
  - The column head is "You work" (assembly pass 2; it was "Median pay", which put a pay label over durations). It is shorter, so no label wraps: "Median pay for" had narrowed the label column until "≈ 13 seconds" wrapped and the footer ran into the caption band.
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

### Hook pass 2 (2026-10-08)

The owner rejected round 1 partly because the hooks were weak. Two judges scored the current hooks of 10a and 10c, each one's round-1 best (R1, with renderability fixes) and four new rewrites (A-D), out of 10. The round-2 rule: adopt the best candidate when its average is at least 1.0 above the current hook, even below 7.5. A key that either judge marks dishonest is out. 10b was not in this pass. Judge 2's 10c scores for C and D were cut off in transit, and so was the end of the 10c candidate list.

| Teaser | Current | R1 | A | B | C | D | Decision |
|---|---|---|---|---|---|---|---|
| 10a | 5 / 5 → **5.00** | 6.5 / 6.5 → 6.50 | 7.5 / 7 → **7.25** | 6 / 6 → 6.00 | 6.5 / 6 → 6.25 | 5.5 / 4.5 → 5.00 | **Adopt A** (+2.25) |
| 10c | 4 / 4, both dishonest → out (4.00) | 6 / 6 → 6.00 | 7 / 7 → **7.00** | 7 / 6.5 → 6.75 | 6 / 5 → 5.50 | dishonest (judge 1) / cut off → out | **Adopt A** (+3.00) |

The two winners do not collide: 10c-A shares its lever (your work time per second) with 10a-C, which was not adopted.

**10a: adopted A, "US debt interest since you hit play: when does it pass your salary?"**
- **Why it won:** the best first 1.5 s of the set (both judges).
  - It puts H64's find-your-row ("What $1 costs you by age", 1.15M, 210x median) inside H02's running counter (28.3M, 110.85x).
  - Every viewer has a round, familiar salary row at 0.0 s (R3 and R4 in full, not a median standing in for "you").
  - The $30K pip lights with a thud at 0.98 s, and the $50K bill is 92% full at 1.5 s: the viewer's year is gone before the header is read.
  - The old hook ("How much comes off the debt?") was a gotcha with no number the viewer owns, about government money.
- **Applied as written:**
  - header, title and vo[0] ("Find your salary.");
  - all 10 VO lines at the candidate's times;
  - verdict line 1;
  - the milestones $30,000 / $50,000 / $100,000 / $250,000 / $1,000,000 ("A $N salary: $N");
  - counterT [0.0, 32.6], final ≈ $1,002,727, hold 3.9, duration 36.5;
  - `intro`, `labels` (tenths under 5 s), `rateSteps` at 17.2 s, `pipLabels` "$30K" … "$1M", `icons` (four bills, a coin), `heroIcon: false`;
  - no `slot`, no spec sfx;
  - the footer, unchanged;
  - the pinned comment.
- **Deviations, with reasons:**
  1. **Verdict line 2 is "$100,000 a year: ≈ 3.3 seconds."**, not "…≈ 3.3." Judge 2: "The verdict '$100,000 a year: ≈ 3.3.' has no unit." It fits the verdict slot in the still at 33.5 s, and the lint stays at 0/0.
  2. **The caption keeps "$0 of it pays the debt down".** Judge 2 said A "loses the format's best twist". It goes in the caption only, so frame 1 still holds one task.
- **What the judges still flag (not fixed here):**
  - The money is the government's (R6 partial).
  - Most viewers' rows close by 3.3 s; the long pull is the $250K and $1M rows, which few viewers own.
  - The pinned rule (÷ 30,800) gives 3.2 s for $100,000, while the label uses the exact rate (3.251 s → ≈ 3.3). Both are "≈", and the write-up's maths table says so.
- **Today's render, checked in stills at 0, 1.5, 3 and 33.5 s:**
  - At 0.0 s, frame 1 shows the header, the odometer at $0, the 5 labelled pips with $30K lit, the bill ghost, "≈ $30,800 / EVERY SECOND", the footer and the caption "Find your salary.".
  - At 1.5 s the hero reads $46,137, the label stack reads "$30,000 A YEAR / ≈ 1.0 SECOND" and the $50K bill is nearly full.
  - At 3.0 s: $92,275 and "$50,000 A YEAR / ≈ 1.6 SECONDS", with the $100K bill nearly full.
  - At 33.5 s the 2-line verdict fits the slot, and all five pips are lit.

**10c: adopted A, "How long do you work for 1 second of Amazon's profit?"**
- **Why it won:** both judges gave it 7, against a current hook both judges scored 4 and marked dishonest as rendered (the kit's default 1 s preroll put $22,733 in frame 1 under "since you hit play").
  - A tiny input (1 second) re-priced in the viewer's own unit, a week of work, against a household brand: the H04 and H01 move (9.86M, 106.16x; 30.6M, 62.49x).
  - It attacks a belief viewers hold ("a second of a company's profit is pocket change"), where the old hook restated "revenue isn't profit".
  - 4 empty answer cells make a countable loop spread over the video (1, 5, ≈ 13 and ≈ 26 s), and the first payoff lands at exactly 1.0 s.
  - The verdict is repeatable: "1 second ≈ 2 weeks of median pay."
- **Applied as written:**
  - header, title, footer and vo[0] ("How long do you work for this?");
  - the VO lines at the candidate's times;
  - the verdict;
  - data: the profit label, perSecond 2,463.85, "≈ $2,464 every second", counterT [0, 26.5], final ≈ $65,292, hold 4.5, and the 4 milestones ($2,463.85, $12,319.25, $32,526, $65,052);
  - `preroll: 0`, the `rows`, the other formula steps and `loop`;
  - no `kept` row, no spec sfx;
  - the pinned comment, with the median's answer added ("Median ($1,251): ≈ 2").
- **Deviations, with reasons:**
  1. **vo[5] runs 5.0 s, not 4.7.** The checker reads "2,464" as 5 spoken words, so "2,464 ÷ your weekly pay = your weeks." is 13 words, which needs 5.0 s at 2.6 words a second. It now ends at 20.8 s, still before vo[6] at 22.4 s.
  2. **The formula step "= $2,464 ÷ $1,251 a week ≈ 2 weeks" moved from 1.0 s to 2.8 s**, so it types as the VO says "≈ 2 weeks" (beats land when the VO says them).
     - Row 1's "≈ 2 weeks" still snaps on the pass at 1.000 s, so the first payoff is unchanged.
     - The VO reads it back 1.8 s after the snap, because the opening question runs to 2.7 s. It is the one VO gap over 0.5 s in this teaser, kept so the hook keeps its spoken "you" question. The checker's sync list leaves row 1 out and says why.
  3. **The column head is "Median pay", not "Median pay for".**
     - With the longer head, the label column was too narrow: "≈ 13 seconds" and "≈ 26 seconds" wrapped to two lines and the rows grew.
     - The footer's second line then ran into the caption band, and the verdict card clipped it at 27.5 s. The lint passed, but the still showed it.
     - With "Median pay", every label holds one line, the counter cell grows, and the footer clears the band.
- **What the judges still flag (not fixed here):**
  - "You" is the median weekly pay; the swap-in rule comes at 15.8 s.
  - "Amazon makes your salary in seconds" is a familiar internet trope.
  - The bottom rows print "≈ 26 seconds · $65,052" from frame 1, which a sharp viewer can decode as a year of pay.
  - The money is Amazon's (R6 partial).
- **Today's render, checked in stills at 0, 1.1, 1.5, 3, 26.6 and 27.5 s:**
  - At 0.0 s, frame 1 shows the banner question, the formula bar typing the rate, the big cell at **$0**, the 4 rows with empty "Median pay" cells, the footer clear of the band and the caption "How long".
  - At 1.1 s row 1 reads "≈ 2 weeks" in yellow, with the counter at $2,710. At 1.5 s the counter reads $3,696 and the progress line runs under "5 seconds".
  - At 3.0 s the formula bar is retyping its second step, under the caption "≈ 2 weeks,".
  - At 26.6 s all four cells are filled, the counter shows ≈ $65,292 and the verdict card sits under the footer.

**Files:**
- `studio/specs/10a-scoreboard-debt-interest-live.json` and `studio/specs/10c-live-sheet-amazon-makes.json`: the new hooks (the ids and file names are unchanged, so links and the slate still resolve). `node src/cli.mjs check` on all three format-10 specs: 3/3 clean, 0 errors, 0 warnings.
- `checks/10-cost-counter.py`:
  - 10a was rebuilt on the salary ladder: `SALARIES_A`, the tenths-under-5 s rule (`secs_shown`), the pip labels, and asserts that the rows round to 1.0 / 1.6 / 3.3 / 8 / 33 s and that $1 million passes before the stop.
  - 10c was rebuilt on profit in weeks of median pay. New asserts: the formula bar's weeks and seconds round like the exact values; half a year is a whole dollar amount; with `preroll: 0` the kit's rows pass at 1.000 / 5.000 / 13.201 / 26.403 s.
  - Amazon's sales, the house and the 10-year milestone left the check.
  - The one-rounding guard gained `EXACT_INPUTS`, for 10a's $30,000 row.
  - Result: **915 checks, 0 failures**. The break test is in the header notes.
- This write-up: the 10a and 10c sections were rewritten (hook, title, frame 1, topic, wrong belief, rules, benchmarks, beat sheet, VO, maths, sources, caption, pinned comment and notes), and so were the shared decisions (questions, payoffs, rounding, sync, lane check). The house's source rows are gone: no teaser shows the house now.
- `teasers/v2/teasers.json`: the 10a and 10c entries' titles, headers, key numbers and hook scores (7.25 and 7.0, the judges' averages) were updated. `slate.json` lists formats only, so it needed no change.

### Assembly pass (2026-10-08)

The round-2 assembly QA of 10a and 10c in their kits: lint, contact sheets, stills at every beat, every on-screen number against this file and the check, then the MP4s. No number, VO line, header, footer or verdict changed; two `lookOpts` blocks did. No kit file was edited.

- **Found:**
  - 10a: three VO lines had no picture of their own. "Yearly pay ÷ 30,800 = your seconds." (12.7 s), "At fiscal 2025's rate: $970 billion a year." (21.0 s) and "Last row: $1 million a year." (28.0 s) played over the resting "≈ $30,800 / EVERY SECOND" label, so the stretch from the $250K pass (8.1 s) to the $1M pass (32.5 s) had one label beat (17.2 s).
  - 10c: two formula steps ran past one line ("= $77.7B ÷ 31,536,000 s ≈ $2,464 a second", 41 characters, and "= $2,464 ÷ $1,251 a week ≈ 2 weeks", 35). The kit then set the whole bar as two 40 px lines (128 px tall), leaving "a second" and "weeks" alone on line 2. The bar also sat on "= $2,464 ÷ $1,251 …" from 2.8 s to 13.2 s while the VO moved on to 5 seconds and to Amazon's $77.7 billion, and on "= $65,052 ÷ 2 = $32,526" through the swap-in rule at 15.8 s.
- **Changed:**
  - 10a `lookOpts.rateSteps`: four beats, each starting with its VO line: "Yearly pay ÷ 30,800 / = your seconds" at 12.7 s (held 4.5 s, to the next beat), the existing $111 million an hour beat at 17.2 s, "Fiscal 2025 net interest / $970 billion a year" at 21.0 s, and "Last row / $1,000,000 a year" at 28.0 s (held 4.6 s, into the verdict). The resting rate returns only 0-0.98 s, 6.3-8.1 s, 11.1-12.7 s and 25.0-28.0 s, never for a half-second flash between two beats.
  - 10c `lookOpts.formulaSteps`: 7 one-line steps (at most 32 characters, so the bar is one 76 px line and the card gets 52 px back): the rate at 0.0 s and again at 7.4 s with "Amazon's 2025 profit"; "= $2,464 ÷ $1,251 ≈ 2 weeks" at 2.8 s; "= $12,319 ÷ $1,251 ≈ 10 weeks" at 5.2 s (new: 9.847 rounds like the row's 9.848); "= $65,052 ÷ 2 = $32,526" at 13.2 s; "= $2,464 ÷ your weekly pay" at 15.8 s (new: the swap-in rule); "= $65,052 ÷ $2,464 ≈ 26 s" at 26.4 s.
  - `checks/10-cost-counter.py`: the expected `lookOpts` for both, `C["fx_rate"]` and `C["fx_wk5"]` (asserted equal to the row's ≈ 10 weeks), and every new step listed in `beats` against the VO line it starts. Result: **949 checks, 0 failures**.
- **Checked:**
  - Lint 2/2 clean, 0 errors, 0 warnings. Contact sheets and stills: 10a at 0, 1.0, 1.65, 3.3, 8.2, 13.5, 16.9, 17.3, 21.6, 31.5, 32.6 and 36.47 s; 10c at 0, 0.6, 1.1, 2.7, 5.2, 6.2, 8.4, 13.3, 16.5, 16.9, 26.5, 27.6 and 30.97 s.
  - Every counter reading in them equals the rate × t: 10a $30,758 (1.0 s), $50,751 (1.65 s), $101,503 (3.3 s), $252,219 (8.2 s), $532,122 (17.3 s), ≈ $1,002,727 (32.6 s); 10c $2,710 (1.1 s), $6,652 (2.7 s), $12,812 (5.2 s), $32,769 (13.3 s), ≈ $65,292 (26.5 s on). Every label, row, pip, formula and verdict string matches this file.
  - MP4s rendered to `studio/out/` (10a 36.5 s, 10c 31.0 s, 1080×1920, 30 fps, h264 + aac). Frames pulled from the MP4s at 0 / 1.5 / 32.6 s (10a: $0, $46,137 with the $50K bill 92% full, ≈ $1,002,727 under the verdict) and 0 / 1.5 / 27.6 s (10c: $0, $3,696 with row 1 at ≈ 2 weeks, ≈ $65,292 with all four cells and the verdict card) match the stills.
- **Left as is:** the Scoreboard's unlit "≈" ghost before the running counter (the kit's design: it lights when the clock stops on `final`); the label stack repeating the caption word for word at 12.7 and 17.2 s (the kit shows both).

### Assembly pass 2 (2026-10-08)

The round-2 assembly QA scored 10a 6.5 and 10c 7.0: every number right, frame 1 working, the weak spots pacing and the payoff. Every must and should issue is fixed below, and so are the cheap nits. Check: **981 checks, 0 failures**. Lint: 2/2 clean, 0 warnings (and the four `cost-counter` kit samples).

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| A1 | 10a | should | The label stack drifted off the VO at 5.4-6.3, 11.1-12.4 and 25.0-25.7 s | **Fixed.** A rate beat at 5.4 s ("≈ $30,800 / every second", held to the $250K pass); `flash: 4.6`, so each milestone label holds to the next beat (the $250K label to 12.45 s, as its VO ends at 12.4); every rate step is held to the next beat (the $970B working to 28.0 s). The resting rate now shows only 0-0.98 s. The beat sheet's 5.4 s row is rewritten |
| A2 | 10a | should | Nothing passed for 24 s after 8.1 s | **Fixed.** A $500,000 pip passes at 16.26 s ("$500,000 a year / ≈ 16 seconds"; VO "$500,000: ≈ 16 seconds." at 16.3 s). The rule line is 10 words and ends at 16.3 s; the $111 million beat moved 17.2 → 19.1 s and the $970 billion beat 21.0 → 22.7 s; both end before 28.0 s |
| A3 | 10a | should | The "≈" ghost beside the hero; the counter stopped at ≈ $1,002,727 | **Fixed.** counterT ends at **32.51135** s and `final` is "$1,000,000" (no ≈). The suggested 32.5113 s would stop 0.04 ms before the kit's own $1M pass (32.5113383 s), so the last milestone would never pop: the stop is set to 5 decimals, after both the exact and the stored-rate pass, and r × 32.51135 = $1,000,000.30. No ghost, the hero centres, and the board, the coin and the verdict peak together. hold 3.98865 |
| A4 | 10a | should | The footer's "pay $1,251 × 52" was never used | **Fixed (option 1).** The $50K pip became the median: "Median $65K" on the ladder, passed at 2.11 s, label "Median pay: $65,052 / ≈ 2.1 seconds", VO "Median pay: passed." (2.1-3.25 s). The footer says "median $1,251 × 52" (one line, 40 px). $50K left the ladder; it was 1.6 s, between $30K and the median |
| A5 | 10a | should | Four label beats repeated the caption word for word | **Fixed.** Labels carry the working, captions the sentence: 12.45 s "$65,052 ÷ 30,800 / ≈ 2.1 seconds (median)" under "Your seconds: yearly pay ÷ 30,800."; 19.1 s "≈ $30,800 × 3,600 s / ≈ $111,000,000" under "That's ≈ $111 million an hour."; 22.7 s "$970B ÷ 31,536,000 s / ≈ $30,800 every second" under the source line; 28.0 s "Next / $1,000,000 a year" under "And the last row?". The last VO is "$1 million: passed.", so the caption no longer repeats the verdict. **Not adopted:** "Next: $1,000,000 / ≈ 33 seconds" at 28.0 s, which would give the answer away 4.5 s early, and a "$1,000,000 ÷ 30,800 = ? seconds" teaser, because by the rounded rule that is 32.47 (≈ 32), against the verdict's ≈ 33 |
| A6 | 10a | should | The 2-line verdict was smaller than the label slams | **Fixed.** One line, **"$1M a year: ≈ 33 seconds."**, set at about 80 px: bigger than the 72 px label line 2. QA's "$1 million a year: ≈ 33 seconds." still breaks into two balanced lines in the kit's 170 px slot (about 70 px), so the ladder's own "$1M" spelling is used. "$100,000 a year ≈ 3.3 seconds" is in the caption (line 1) and the pinned comment |
| A7 | 10a | nit | The big stage icon had no amount on it | **Fixed in the format file.** The big icon carries its pip label as a tag under the art (Anton 52 px): white while it fills, green on the pass, riding the icon's bump; gone when it flies to the ladder (the $1M tag stays). The art gives up 64 px of height for it |
| A8 | 10a | nit | The top bar was cramped | **Fixed in the format file.** The hero is set 8% under its full fit (HERO_K 0.92), so it clears the header and the footer |
| A9 | 10a | nit | FY2025 rate; FY2026 runs about 12% higher | **Not done here.** Treasury's FY2026 statement is due about 2026-10-13. The posting plan (10a, per-platform notes) lists every string to rebuild, now including the 5-decimal stop |
| C1 | 10c | should | The big cell stopped at ≈ $65,292; the verdict led with the 1 s answer and ended "A year: ≈ 26 s." | **Fixed.** counterT ends at **26.4026** s and `final` is "$65,052", so the big cell lands on exactly a year of median pay as row 4 pops (k × 26.4026 = $65,052.07; 26.4026 s is after the exact pass, 26.40257 s). Verdict: **"A year of median pay: ≈ 26 seconds. / 1 second ≈ 2 weeks."** It fits the card in two lines. hold 4.5974 |
| C2 | 10c | should | The answers were the smallest type on screen | **Fixed in the format file.** Each answer cell pops on its pass: 1.2× (capped to stay 14 px clear of the amount column, so "≈ 10 weeks" pops a little less) on a solid yellow fill, held 0.6 s, then settles |
| C3 | 10c | should | "Median pay" sat over durations | **Fixed.** The column is "You work". It is shorter, so no label wraps; the footer and the verdict say median |
| C4 | 10c | nit | The 7.4 s formula step retyped frame 1's working | **Fixed.** Dropped; "= $12,319 ÷ $1,251 ≈ 10 weeks" holds 5.2-13.2 s. The checker's formula-step list is updated |
| C5 | 10c | nit | 10.6 s with no new cell | **Fixed.** "And a whole year?" moved 22.4 → 21.0 s; the format file adds a 2.4 s riser (24.0-26.4 s) and a hit on the last pass, over the running progress line |
| C6 | 10c | nit | Rows 3-4 print $32,526 and $65,052 from frame 1 | **Accepted.** "≈ $32.5K" and "≈ $65K" would be second roundings of two exact amounts that the formula bar ($65,052 ÷ 2 = $32,526) and now the landed counter ($65,052) show in full, which breaks the one-rounding rule. With the counter landing on the row's own $65,052, the printed amount is the target the viewer watches it reach |

**Files:**
- `studio/specs/10a-scoreboard-debt-interest-live.json`, `studio/specs/10c-live-sheet-amazon-makes.json`: as above.
- `studio/looks/scoreboard/formats/cost-counter.js`: the target tag (`tags`, on with `pipLabels`), ladder labels that duck under a flying icon, and the hero at 92% of its fit.
- `studio/looks/live-sheet/formats/cost-counter.js`: the answer-cell pop (`pop`) and the riser into the last pass (`riser`).
- `checks/10-cost-counter.py`: 10a's ladder (with the median and $500K), its VO, label beats and verdict; 10c's stop, verdict, column, VO time and formula steps; and the "lands on" rule for a counter that stops on its last milestone. Result: **981 checks, 0 failures**; the break test is in the header notes.
- `teasers/v2/teasers.json` still carries the pre-pass key numbers for 10a and 10c (ladder, finals, verdicts); it was outside this pass's files.

### Assembly pass 3 (2026-10-08): 10b in the Becker kit

The round-2 assembly QA of 10b in its kit: lint, contact sheet, stills at every beat, every on-screen number against this file and the check, then the MP4. No number, VO line, header, footer, verdict or `lookOpts` key changed: the spec is untouched. Every fix is in `studio/looks/becker-rig/formats/cost-counter.js` (no shared kit file was edited). Check: **981 checks, 0 failures**. Lint: 1/1 clean, 0 warnings (and the two `cost-counter` kit samples).

| # | Severity | Found | What I did |
|---|---|---|---|
| B1 | must | From the gag (33.42 s) to the end, the "≈ 33 SECONDS" stamp sat over the stopwatch's end label and hid its "≈": the payoff frame read "$4.7 million" with no ≈, a rounded number shown as exact | **Fixed.** The stamp is fitted with its 6° tilt included: under the board's slot, over the plinth (its corner had touched it), and 18 px clear of the end label whenever they share rows; its type steps down from 108 px until it fits. It now lands over the emptied stack, between the figure and the stopwatch |
| B2 | must | The figure's run-up to the lock was scheduled after the lock. The last pass (verb `flattened`, handled at the lock) moved the run-up's start to 33.27 s, so the cower for white heat (28.6 s) fell at 34.27 s and a lean-back at 35.87 s: in the end hold he got up off the floor again, through the post, with his pencil off the left edge. Before that he stood still from 20.2 to 32.4 s, through four VO lines | **Fixed.** The lock's own pass no longer moves the run-up. In the run-up he acts on the VO line starts: he points at his stack and plinth on "40 × $65,052 ≈ $2.6 million." (18.3 s), looks down at the few bricks left on "That's a whole working life." (23.2 s), looks up as the stopwatch's "≈ $4.7 million" lands (25.4 s), cowers at white heat (28.6 s), and is knocked down at 33.3 s and stays down |
| B3 | should | The 3-year ✓ held the strip to 4.9 s, 0.7 s into "≈ $78,000 a second." | **Fixed.** A ✓ flash rolls back to the rate at the next VO line start (at least 1 s after its pass, at most 2.4 s): 4.2, 10.6 and 18.2 s, so the rate line is on the board as the VO says it, and no flash cuts into the line that names its milestone |
| B4 | should | Knocked onto his butt, his straight legs ran under the plinth's corner; his pencil could leave the frame | **Fixed.** In stack mode he lands with his knees up (`sitUp`, `sitUpLook`), clear of the plinth, and a frame-edge clamp (the kit's `extentX`) keeps him and the pencil 28 px inside the left edge |
| B5 | note | The kit does not draw `lookOpts.stamp` ("1 second ≈ $78,000" at 1.0 s) | **Left as is** (Look note): the rate line carries it from frame 1, and the counter reads $78,201 at 0:01 |

**Checked:**
- Lint 0 errors, 0 warnings; the two kit samples too. The sample contact sheets are unchanged in layout (the flash rule only moves when a ✓ rolls back).
- Contact sheet and stills at 0, 1.0, 2.7, 4.3, 8.5, 10.7, 16.8, 16.9, 18.4, 18.6, 23.2, 23.4, 25.6, 28.8, 29.0, 31.0, 31.5, 33.35, 33.4, 33.6, 34.5, 36.0 and 36.57 s. Frame 1 holds the header, the footer with $1,251 × 52, $0 on the board, the rate line, "40 × $65,052 / 40 years of median pay" and the stopwatch at 0:00.
- Every counter reading in them equals floor(rate × t): $78,201 (1.0 s), $211,143 (2.7), $336,265 (4.3), $664,711 (8.5), $836,754 (10.7), $1,313,782 (16.8), $1,321,602 (16.9), $1,438,904 (18.4), $1,454,545 (18.6), $1,814,271 (23.2), $1,829,911 (23.4), $2,001,954 (25.6), $2,252,198 (28.8), $2,267,839 (29.0), $2,424,241 (31.0), $2,463,342 (31.5), then ≈ $2,604,105 from 33.3 s. The bricks left match (10 at 25.6 s, 20 at 16.8 s). The strip strings ($195,156, $650,520, $1,301,040, $2,602,080), the plinth, the end label (≈ $4.7 million), the stamp (≈ 33 seconds), the stopwatch (0:33, arc at 55%) and the verdict match this file.
- MP4 rendered to `studio/out/10b-becker-rig-debt-vs-your-pay.mp4` (36.6 s, 1080×1920, 30 fps, h264 + aac). Frames pulled from it at 1.0 s ($78,201, 0:01, under "Your 40 years, or 1 minute?"), 18.6 s ($1,454,545, pointing at the stack, under "40 × $65,052 ≈ $2.6 million.") and 36.0 s (≈ $2,604,105, the stamp clear of "≈ $4.7 million", the verdict, him seated) match the stills.

**Still open (kit-wide, not in this file's scope):** the kit README's §11 does not document stack mode (`opener`, `timer`, `gag`, `actions`); the format file's header comment does.
