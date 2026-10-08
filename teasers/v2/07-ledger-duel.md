# Format 7: "2 people invest" ledger duel, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews; hook pass on 2026-10-08, 07c kept; see the [review log](#review-log))
**Format:** `ledger-duel`, hook pattern **P4** ("same money, two choices")
**Lane:** two people, the same money, two choices, a year-by-year ledger
**Files:**
- Specs:
  - [`studio/specs/07a-live-sheet-start-at-25.json`](../../studio/specs/07a-live-sheet-start-at-25.json)
  - [`studio/specs/07b-becker-rig-panic-sell-2008.json`](../../studio/specs/07b-becker-rig-panic-sell-2008.json)
  - [`studio/specs/07c-clean-sheet-savings-rate.json`](../../studio/specs/07c-clean-sheet-savings-rate.json)
- Check: [`teasers/v2/checks/07-ledger-duel.py`](checks/07-ledger-duel.py). Run `python3 teasers/v2/checks/07-ledger-duel.py`. It reports **406 checks, 0 failures** and exits 0. Two deliberate corruptions (the old "× ≈ 8.1" shortcut in 07a's formula bar, and "$6,600" in a 07b VO line) made it exit 1, each with a named failure.
  - New in the revision: the first payoff row must land by **3.0 s** (R10); a formula that multiplies shown factors must reproduce the shown result; every formula-bar line must stay up long enough to type (24 characters a second) and then be read (1.5 s); headers are capped at 4 lines; 07a's break-even rate and 6% case are asserted.

**How the facts were checked:**
- Round 1 ran 11 web searches out of 14. This revision ran 3 more and one page fetch.
- The egress proxy blocks opening pages (Slickcharts, NYU Stern, the Motley Fool, chase.com, FRED). So each real-world figure below comes from a **search result**: the publisher's page title, URL and date, plus the search engine's reading of the page.
- Before posting, someone should open the pages that carry the most weight and confirm them by hand. They are marked **[click-check]** in the sources.
- 07a needs no real-world data. Its 7% is a stated assumption, and its break-even rate is now disclosed.

**Studio linter** (`node src/cli.mjs check`, re-run after the revision): **3/3 clean, 0 errors, 0 warnings.** The old footer warning on 07b is gone.
- **07a (Live Sheet):** the live-sheet `ledger-duel` kit now exists in the working tree, so the ledger body, `lookOpts.formulaBar` and `rowLabelsAtStart` are linted and rendered. Stills and a contact sheet of the final spec checked at 0, 2.6, 4.5, 5.5, 6.6, 8.4, 14.0, 16.5 and 23.5 s.
- **07c (Clean Sheet):** the clean-sheet kit is built. Stills and a contact sheet of the final spec checked at 0, 1.6, 2.6, 4.5, 6.6, 8.4, 14.0, 16.5 and 20 s.
- **07b (Becker rig):** `looks/becker-rig/formats/ledger-duel.js` is **still a stub** (it draws "TODO ledger-duel"). So only 07b's header, footer, verdict and captions are linted; its ledger, `lookOpts.beats` (impact, mattress carry, peek) and `rowLabelsAtStart` are unverified. Re-run `check` and `stills` once the kit lands, and confirm it renders a plain ledger with `lookOpts.beats` removed (FORMATS.md: kits must render sensibly without `lookOpts`).

---

## (a) The format in 5 lines

1. **Mechanic** ([`04-formats.md`](../../research/v2/04-formats.md), rank 7):
   - Two named people start with the same stake.
   - A ledger of "YYYY: $NN,NNN" rows fills both columns at once, about one row a second.
   - A crash or turning row lands early or mid-way.
   - It ends on the finished table and loops.
2. **Evidence:** Jake (@jacobdoesmoney) has 3 of 3 duels at 5.7-6.6x his median. The 3 series reels hold 70% of the account's 12-reel plays.
   - QQQ vs TQQQ: 322,339 (6.6x med; 136 comments), https://www.instagram.com/reel/DdUZ5K1gGlc/
   - VOO vs SOXL: 301,112 (6.17x; 1.8K likes), https://www.instagram.com/reel/Dc6u8k2lIBX/
   - QQQ vs SPY: 276,471 (5.66x; 23 comments), https://www.instagram.com/reel/DdFHnhtCeLw/
3. **The P4 pattern elsewhere in the benchmark:**
   - ChartOrbit, "What If You Invested $5,000 in NETFLIX and DISNEY?": 15,876,376 (100.45x), https://www.youtube.com/shorts/KmtLGAPIutg
   - ChartOrbit, "…USA and EUROPE?", which opens inside 2008 with a "Financial Crisis" band and the counters already below the stake: 2,808,307 (345.09x), https://www.youtube.com/shorts/VwfZNjxu6fU
   - HD Guy, "Which is cheaper? 1 Missile or 75 Rounds/Second": 11,957,600 (3.81x), https://www.youtube.com/shorts/TIRAehb_9sc
   - The Market Hustle, "How Long It Took To Recover After the Worst Crashes": 190,187 (4.5x med), https://www.instagram.com/reel/DduW3hgShyh/
4. **What wins inside the format:**
   - a risk twist or reversal: the two leverage duels drew 136 and 44 comments, against 23 for the plain index duel;
   - a lopsided ending;
   - a crash row at 0:06-0:07 (Jake), or at frame 1 (ChartOrbit H17).

   **What we add:**
   - one set of final numbers, the same on screen, in the VO and in the caption (Jake's screen and caption finals differ on all three duels);
   - a faceless winner cue: the winner's column is highlighted at the verdict, and in 07b the rig's poses do it.
5. **Pitfalls:**
   - n = 3, all from one near-miss account, all in September 2026.
   - Jake's duels are silent and 11 s long. With a voice-over ours run 22.1-27.7 s, inside the 12-30 s lane set for this format. The rows still land about a second apart once the bet is set, and a music-only 12-14 s cut is worth testing.
   - The lecture version of the panic-sell idea flopped. Master Money's "MISSING THE BEST 10 DAYS CAN DESTROY YOUR RETURNS" got 2,916 (0.3x med), https://www.instagram.com/reel/DeKyDoNxKhx/. That is why 07b is a duel, not a warning.

### Decisions shared by all three

- **The "2 people" have names** (Ava/Ben, Alex/Sam, Mia/Leo), so comments can take sides. Jake used tickers; we have no person on camera, so names do the work his costumes did.
- **The bet is in the hook line, not only in the column sub-labels** (revision): "10 years vs 30 years", "right before 2008 / One sells", "Big bank vs high-yield". The viewer can pick a side from the header alone (R7).
- **The first payoff lands by 3 s:** 2.4 s (07a), 1.0 s (07b), 1.0 s (07c).
- **Rounding:**
  - every rounded result shows "≈" on screen and "about" in the VO;
  - exact values carry neither (07b's $6,300 is exact: $10,000 × 0.63);
  - each ledger keeps one precision: 07a to the nearest $1,000, 07b to the nearest $100, 07c to the dollar (to the cent for month 1);
  - a formula that shows rounded factors must reproduce the shown result (07a's formula bar).

  The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume about 2.6 spoken words a second, with digits expanded the way they would be read ("$66,000" = 4 words).
- **No advice language.** Each teaser is a worked comparison of two choices, and every caption says so.

---

## 07a: Live Sheet: "2 people invest $200 a month. 10 years vs 30 years. Who wins at 65?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, formula bar, a ledger sheet on black) |
| Spec | `studio/specs/07a-live-sheet-start-at-25.json` (27.7 s) |
| Platform title | **2 People Invest $200 a Month. One Stops at 35. Who Has More at 65?** |
| On-screen hook (header) | **2 people invest $200 a month / 10 years vs 30 years. Who wins at 65?** (15 words, 2 lines; render-checked: fits the banner on 2 lines) |
| Columns at 0.0 s | **Ava**: "Age 25 → 35 · puts in $24,000"; **Ben**: "Age 35 → 65 · puts in $72,000". Column A: Age 30 … Age 65, cells empty |
| Formula bar at 0.0 s | "= $200 a month at 7% a year" (frame 1 arrives about 70% typed) |
| Footer | ASSUMES 7% a year, compounded monthly · not a forecast |

**Topic change from the seed, and why**
- The seed was "one starts at 25, one at 35". In that version Ava invests for 40 years and puts in more money, so the answer to "who wins" is obvious before frame 2. The only open question left is "by how much": no wrong belief to bust (R5) and no surprise verdict (R12).
- I kept the lane exactly: $200 a month, ages 25 and 35, 7%, to 65. I added the benchmark's winning twist, a reversal of the expected winner. Jake's duels with a twist drew 136 and 44 comments, against 23 for the plain one.
- Now Ava starts at 25 and **stops at 35**, and Ben starts at 35 and never stops. Ben puts in 3× the money, yet Ava still finishes ahead.
- The seed's own answer becomes the pinned comment: had Ava never stopped, she would have ≈ $525,000.

**Wrong belief it exploits:** "Whoever invests longer, and puts in more, ends up with more." The header now says it outright ("10 years vs 30 years"), and the plans print $24,000 vs $72,000 at 0.0 s, so most viewers pick Ben in second 1.

**Hook rules**

| Rule | How |
|---|---|
| R1 | "$200", "10", "30", "65", "$24,000" and "$72,000" are on screen at 0.0 s |
| R2 | One dollar input in the hook line ($200 a month) and no result |
| R3 | **Partial.** The ages let a viewer see themselves as an early or late starter, but no viewer can swap in their own number (normal for P4). The caption's break-even line lets a viewer test their own rate assumption |
| R4 | $200 a month is small, round and familiar |
| R5 | "10 years vs 30 years" is in the header, and the 3× deposit gap is in the plans; the result reverses both |
| R6 | Two people, $200 a month, until 65 |
| R7 | The header names the two options (10 years vs 30 years); the plans add when each starts |
| R8 | 15 words, 2 lines |
| R9 | 8 labelled age rows with empty cells at frame 1 (`rowLabelsAtStart`; render-checked) |
| R10 | First row (Age 30: ≈ $14,000 / $0) at **2.4 s**; biggest numbers on the last row |
| R11 | The question is on screen ("Who wins at 65?"); the caption opens without the answer and points at the Age 65 row |
| R12 | A repeatable verdict: "a third of the money, still wins by ≈ $37,000", with its condition disclosed (it holds above ≈ 6.1% a year) |

**Benchmark hooks it is modelled on**
- H78, Jake: "2 people invest $10,000 / 10 years ago", 322,339 (6.6x med). This is the grammar: "2 people invest $X" plus a horizon, two named columns, a ledger.
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?", 1,391,731 (5.91x). A small monthly amount, plus a question that waits for a verdict.
- H64, Gage: "What $1 costs you by age", 1,150,974 (210x med). Ages as the rows.

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner "2 people invest **$200 a month** / 10 years vs 30 years. Who wins at 65?". Formula bar typing "= $200 a month at 7% a year". Ava and Ben column heads with their plans. Rows Age 30 … Age 65 labelled, cells empty. Footer on | "Ava invests for 10 years. Ben invests for 30." (0.0-3.5) |
| 2.4 | Row **Age 30**: ≈ $14,000 / $0, the first payoff | |
| 3.6 | Formula bar "Ava: $200 × 120 months = $24,000" (one line, holds 4.0 s) | "Ava starts at 25 and stops at 35." (3.6-7.5) |
| 6.0 | Row **Age 35**: ≈ $35,000 / $0; event pill "Ava stops · Ben starts". Pop | (…stops at 35.) |
| 7.6 | Formula bar "Ben: $200 × 360 months = $72,000" (one line, holds 6.6 s) | "Ben starts at 35 and never stops." (7.6-10.7) |
| 8.6, 9.6 | Rows 40 and 45: ≈ $49,000 / ≈ $14,000; ≈ $70,000 / ≈ $35,000 | |
| 11.1, 12.0, 12.9 | Rows 50, 55, 60: ≈ $99,000 / ≈ $63,000; ≈ $140,000 / ≈ $104,000; ≈ $198,000 / ≈ $162,000 | "Ben puts in 3 times as much." (10.9-13.6) |
| 14.2 | Row **Age 65** counts up: **≈ $281,000 / ≈ $244,000**. Formula bar, two lines: "Ava's ≈ $34,617, untouched: / × ≈ 8.12 ≈ $281,000 at 65". Roll | "At 65, Ava has about $281,000." (13.8-18.5) |
| 18.7 | The finished ledger holds | "Ben has about $244,000." (18.7-22.2) |
| 22.4 | Verdict card in the caption band: "**Ava** wins by ≈ $37,000 / with a third of the money". Ava's column washes yellow and her final cell takes the solid yellow. Ding | "A third of the money, and Ava still wins." (22.4-25.9) |
| 25.9-27.7 | The finished sheet holds, then clears to the frame-1 state, which makes the loop | |

**Full guide VO** (about 64 spoken words)

> Ava invests for 10 years. Ben invests for 30. Ava starts at 25 and stops at 35. Ben starts at 35 and never stops. Ben puts in 3 times as much. At 65, Ava has about $281,000. Ben has about $244,000. A third of the money, and Ava still wins.

**The maths**

- **Basis:** $200 deposited at each month-end, at 7%/12 a month, compounded monthly.
- **Formula:** for n months of deposits, B(n) = 200 × ((1 + 0.07/12)^n − 1) ÷ (0.07/12).
  - Ava at age a = B(min(m, 120)) × (1 + 0.07/12)^(m − 120 if m > 120), where m = 12 × (a − 25).
  - Ben at age a = B(12 × (a − 35)).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Ava's deposits | $200 × 120 | 24,000 | $24,000 |
| Ben's deposits | $200 × 360 | 72,000 | $72,000 |
| "10 years vs 30 years" | 35 − 25; 65 − 35 | 10; 30 | 10; 30 |
| "3 times as much" | 72,000 ÷ 24,000 | 3 | 3 |
| Age 30, Ava / Ben | B(60) / 0 | 14,318.58 / 0 | ≈ $14,000 / $0 |
| Age 35 | B(120) / 0 | 34,616.96 / 0 | ≈ $35,000 / $0 |
| Age 40 | B(120)·g^60 / B(60) | 49,073.88 / 14,318.58 | ≈ $49,000 / ≈ $14,000 |
| Age 45 | B(120)·g^120 / B(120) | 69,568.37 / 34,616.96 | ≈ $70,000 / ≈ $35,000 |
| Age 50 | B(120)·g^180 / B(180) | 98,621.88 / 63,392.46 | ≈ $99,000 / ≈ $63,000 |
| Age 55 | B(120)·g^240 / B(240) | 139,808.87 / 104,185.33 | ≈ $140,000 / ≈ $104,000 |
| Age 60 | B(120)·g^300 / B(300) | 198,196.58 / 162,014.34 | ≈ $198,000 / ≈ $162,000 |
| Age 65 | B(120)·g^360 / B(360) | 280,968.48 / 243,994.20 | ≈ $281,000 / ≈ $244,000 |
| Verdict gap | 280,968.48 − 243,994.20 | 36,974.28 | ≈ $37,000 (equal to the gap between the two shown finals) |
| Formula bar at 14.2 s | B(120) to the dollar × g^360 to 2 dp | 34,616.96 × 8.11650 = 280,968.48; **shown factors** 34,617 × 8.12 = 281,090.04 | "≈ $34,617 … × ≈ 8.12 ≈ $281,000" (both products round to ≈ $281,000) |
| Pinned: Ava never stops | B(480) | 524,962.68 | ≈ $525,000 |

In the table, g = 1 + 0.07/12.

- **Sensitivity (in the caption; asserted by the checker):** the reversal depends on the rate.
  - **Break-even ≈ 6.1%** (6.109% nominal, compounded monthly). Above it Ava wins; below it Ben does.
  - At 6%: Ava ≈ $197,000 (197,395.14), Ben ≈ $201,000 (200,903.01). Ben edges ahead by ≈ $3,500.
  - At 6.5%: Ava leads by ≈ $14,000 (14,252.55). At 7%: by ≈ $37,000.
- **Cross-checks:**
  - At 7% Ava is ahead at every row, so Ben never catches up. The gap holds at about $35,000-37,000 from age 35 on.
  - B(360) and B(480) equal the verified figures in `research/v2/watch/alan-becker.md` §6, idea 4 ($243,994 and $524,963).

**Sources:** none. There is no real-world input. The 7% is an assumption, labelled on screen as "not a forecast", and the caption gives the break-even rate.
**Assumptions (in the footer):** 7% a year, compounded monthly, deposits at month-end, no fees, no taxes, no inflation adjustment, and the rate is not a forecast.

**Caption (IG/TikTok; also the YouTube description)**
> 10 years of $200 vs 30 years of $200. Watch the Age 65 row.
> Ava put in $24,000 (age 25 to 35, then stopped). Ben put in $72,000 (age 35 to 65). At 65: Ava ≈ $281,000, Ben ≈ $244,000.
> Maths: $200 a month at an assumed 7% a year, compounded monthly. A rate, not a forecast. At 6% a year Ben edges ahead (≈ $201,000 vs ≈ $197,000); Ava's head start wins above about 6.1%. Educational maths, not advice.
> #compoundinterest #investing #personalfinance #moneymath

**Pinned comment**
> If Ava had never stopped at 35, she'd have ≈ $525,000 at 65. What age did you start?

**Per-platform notes**
- **YouTube Shorts:** use the title above. It adds the twist ("One Stops at 35") without the answer. No keyword CTA: in the benchmark, keyword CTAs lifted comments, not views.
- **Instagram Reels:** this is Jake's home platform. Use **frame 1** as the cover (the plans with $24,000 vs $72,000 and the empty ledger), not the finished ledger, which would answer the question. Jake's covers are pre-number frames. The first caption line poses the bet; the answer is in line 2.
- **TikTok:** the header stays on screen all the way through. The footer sits above y 1480. Expect "but 7% isn't guaranteed" comments; the caption's break-even line answers them.
- **Silent cut to test:** music only, rows every 1.0 s, 13 s, verdict as the last frame.

---

## 07b: Becker Rig: "2 people invest $10,000 right before 2008. One sells to cut his losses."

| | |
|---|---|
| Look | `becker-rig` (a light void, one hero-colour stick figure plus one neutral figure, coin-blocks as props, impacts) |
| Spec | `studio/specs/07b-becker-rig-panic-sell-2008.json` (27.0 s) |
| Platform title | **2 People Invest $10,000 Right Before 2008. One Sells in the Crash. How Far Apart Now?** |
| On-screen hook (header) | **2 people invest $10,000 / right before 2008 / One sells to cut his losses** (13 words, 3 lines with set breaks; render-checked in the Becker chrome) |
| Columns at 0.0 s | **Alex**: "Holds through the crash"; **Sam**: "Sells at the end of 2008". Stake: "$10,000 each in the S&P 500 · Dec 31, 2007". Row "Dec 2007: $10,000 / $10,000" |
| Footer | Year-end S&P 500 total return, dividends in · cash at 0% (the source, S&P DJI, and "no fees" are in the caption) |

**Wrong belief it exploits:** "Selling in a crash cuts your losses." "To cut his losses" in the hook names it (R5). The verdict turns it over: both took the same −37%, and selling only locked the loss in and skipped the recovery. (Revision: the round-1 wording was "to stay safe"; it now avoids 04b's "safe savings account" so the two Becker-rig P4 teasers do not read as the same idea.)

**Hook rules**

| Rule | How |
|---|---|
| R1 | "$10,000", "2008" and the first ledger row "$10,000 / $10,000" are on screen at 0.0 s |
| R2 | One dollar input ($10,000) and no result |
| R3 | **Partial.** An S&P 500 fund is the kind of investment the viewer owns, and anyone who lived through 2008 (or 2022) has a side; there is no own-number row (normal for P4) |
| R4 | $10,000 is Jake's stake and the benchmark's round number |
| R5 | "to cut his losses" names the belief the result then breaks |
| R6 | Two people, $10,000, at the Dec 31, 2007 close |
| R7 | Options named: one sells; the plans say holds vs sells at the end of 2008 |
| R8 | 13 words, 3 lines |
| R9 | 9 ledger rows with the year labels proposed at frame 1 (`lookOpts.rowLabelsAtStart`); unverified until the Becker kit lands |
| R10 | The first payoff is the crash itself: row **2008: $6,300 / $6,300** and the −37% impact at **1.0 s**; biggest number last (2025) |
| R11 | The title asks "How far apart now?"; the caption's first line takes no number, the numbers follow |
| R12 | Lopsided: ≈ $66,000 vs $6,300 (≈ 10.5×) |

**Benchmark hooks it is modelled on**
- H17, ChartOrbit: "POV: In 2008 You invested $5000 in [US] VS [EU]" with a "Financial Crisis" band, 2,808,307 (345.09x). It opens inside 2008 with the counters already below the stake. 07b now does the same: the crash is the first thing that happens.
- H78/H79, Jake: "2 people invest $10,000 / 10 years ago", 322,339 (6.6x med) and 301,112 (6.17x). Same stake, two choices, ledger, and the 2022 crash row as a second test (TQQQ −64.8%, SOXL −72.7%).
- H71, The Market Hustle: "How Long It Took To Recover After the Worst Crashes:", 190,187 (4.5x med). Its caption: "It's about continuing to invest through a crash instead of stopping."

**Beat sheet** (the rig choreography is in `lookOpts.beats`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Two stick figures, Alex in the hero colour and Sam in neutral, each beside a coin-block. Ledger row "Dec 2007: $10,000 / $10,000"; the other year labels wait in grey. Footer | "2008 takes 37%." (0.0-2.7) |
| 1.0 | **Impact:** a "−37%" weight drops on both blocks, with a white flash, a shake and a thud. Row **2008**: $6,300 / $6,300, tag "crash −37%" | (…takes 37%.) |
| 2.9 | Both figures stagger; the blocks sit at $6,300 | "Both drop to $6,300." (2.9-6.0) |
| 6.5 | Sam lifts his block and stuffs it into a mattress labelled "0%". Whoosh | "Sam sells to cut his losses." (6.1-8.5) |
| 7.6 | Row 2009: ≈ $8,000 / $6,300. Alex stands his ground | |
| 9.9 | Row **2012**: ≈ $10,900 / $6,300, tag "back above $10,000" | "Alex holds. By 2012, he's back above $10,000." (8.7-13.0) |
| 10.8, 11.5, 12.2 | Rows 2016, 2019, 2021: ≈ $18,500, ≈ $28,400, ≈ $43,300 against $6,300. Alex's block grows at each row | |
| 14.3 | A smaller "≈ −18%" impact lands on Alex's block only. Row **2022**: ≈ $35,500 / $6,300, tag "dip ≈ −18%". Alex shrugs | "2022 dips. Alex holds again." (13.2-15.9) |
| 16.9 | Row **2025**: Alex's cell rolls up to **≈ $66,000** and his block towers over the stage. Roll | "End of 2025: Alex has about $66,000." (16.1-20.8) |
| 21.0 | Sam peeks out of the mattress; his block is unchanged at $6,300. Verdict "Selling didn't dodge the crash. / It dodged the **recovery**." Alex's column is highlighted. Boing | "Sam's still at $6,300. He dodged the recovery." (21.0-25.7) |
| 25.7-27.0 | Hold, then the loop back to frame 1 | |

**Full guide VO** (about 63 spoken words)

> 2008 takes 37%. Both drop to $6,300. Sam sells to cut his losses. Alex holds. By 2012, he's back above $10,000. 2022 dips. Alex holds again. End of 2025: Alex has about $66,000. Sam's still at $6,300. He dodged the recovery.

**The maths**

- **Basis:** both buy at the 2007 year-end close (Dec 31, 2007). Year-end value V_y = $10,000 × Π (1 + TR_k) for k = 2008…y. TR is the S&P 500 total return for each calendar year (dividends reinvested).
- **Sam's path:** the same as Alex's until the 2008 year-end close, when he sells. After that it is flat (cash at 0%).
- **Row years** are chosen for rhythm (the crash, the first year back above $10,000, a run of good years, the 2022 dip, the latest year). Every shown value compounds **every** calendar year in between; none is skipped in the maths.

| Row | TR that year | Alex, exact | Alex, shown | Sam, shown |
|---|---:|---:|---|---|
| Dec 2007 | (buy at the close) | 10,000.00 | $10,000 | $10,000 |
| 2008 | −37.00% | 6,300.00 | $6,300 | $6,300 (sells) |
| 2009 | +26.46% | 7,966.98 | ≈ $8,000 | $6,300 |
| 2012 | (2010 +15.06, 2011 +2.11, 2012 +16.00) | 10,857.86 | ≈ $10,900 | $6,300 |
| 2016 | (2013 +32.39, 2014 +13.69, 2015 +1.38, 2016 +11.96) | 18,549.70 | ≈ $18,500 | $6,300 |
| 2019 | (2017 +21.83, 2018 −4.38, 2019 +31.49) | 28,414.02 | ≈ $28,400 | $6,300 |
| 2021 | (2020 +18.40, 2021 +28.71) | 43,300.88 | ≈ $43,300 | $6,300 |
| 2022 | −18.11% | 35,459.09 | ≈ $35,500 | $6,300 |
| 2025 | (2023 +26.29, 2024 +25.02, 2025 +17.88) | 65,995.78 | ≈ $66,000 | $6,300 |

- **"−37%" and "$6,300":** TR 2008 = −37.00%, so $10,000 × 0.63 = $6,300.00 exactly. No "≈", no "about".
- **"back above $10,000":** 2012 is the first year-end at or above $10,000. 2011 ended at $9,360.23.
- **"dip ≈ −18%":** TR 2022 = −18.11%.
- **Caption figures:**
  - 65,995.78 ÷ 6,300 = 10.48, shown as ≈ 10.5×.
  - Alex's multiple on his $10,000 is 6.60, shown as ≈ 6.6×.
- **Pinned comment:** 6,300 × 1.05^17 = 14,439.72, shown as ≈ $14,400. That is 0.22 of Alex's, under a quarter.
- **Sensitivity (computed by the checker, not on screen):**
  - Damodaran's NYU Stern series uses its own method. For the years it returned it gives 2008 −36.55, 2009 +25.94, 2010 +14.82, 2022 −18.04, 2023 +26.06 and 2024 +24.88. Swapping those in gives 2025 ≈ $65,900 and Sam ≈ $6,300 (6,345.00), so the story holds within about 1%. On screen we use the index provider's official figures.
  - A fund charging 0.10% a year (subtracted from each year's return) would end at ≈ $64,900.

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| S&P 500 total return, 2006-2016 (returned by a search that did **not** supply the numbers): 15.79, 5.49, −37.00, 26.46, 15.06, 2.11, 16.00, 32.39, 13.69, 1.38, 11.96 | Slickcharts, "S&P 500 Total Returns by Year Since 1926" (S&P DJI data) **[click-check]** | searched 2026-10-07 | https://www.slickcharts.com/sp500/returns |
| S&P 500 total return, 2017-2025 (also returned without supplied numbers): 21.83, −4.38, 31.49, 18.40, 28.71, −18.11, 26.29, 25.02, 17.88 | Slickcharts (above); US500.com, "S&P 500 Returns By Year"; History of Market, "S&P 500 Annual Returns by Year: Complete Table 1928–2026"; YCharts, "S&P 500 Annual Total Return" | searched 2026-10-07 | https://us500.com/tools/returns/sp500-returns-by-year · https://historyofmarket.com/articles/sp500-annual-returns-by-year · https://ycharts.com/indicators/sp_500_total_return_annual |
| 2008 = −37% (primary publisher) | S&P Dow Jones Indices, sector performance matrix (PDF); S&P Global Market Intelligence, "S&P 500 logs its worst annual performance since 2008" | searched 2026-10-07 | https://www.spglobal.com/spdji/en/documents/performance-reports/spdji-sector-performance-matrix.pdf · https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/s-p-500-logs-its-worst-annual-performance-since-2008-73687583 |
| Independent cross-check (its own method, partial years) | Aswath Damodaran, NYU Stern, "Historical Returns on Stocks, Bonds and Bills" | dataset updated yearly; update date not seen | https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html |

The verifier independently matched the 2007-2025 figures (including 2025 +17.88% and 2008 −37.00%) against two sources. Since the revision starts at the 2007 close, the 2007 return (+5.49%) is no longer used.

**Assumptions (footer and caption):**
- calendar-year S&P 500 total return with dividends reinvested (S&P DJI);
- year-end values; both buy at the Dec 31, 2007 close;
- an index with no fees and no taxes (caption);
- Sam sells at the 2008 year-end close (not the March 2009 low) and his cash earns 0%;
- not inflation-adjusted.

**Caption**
> Same $10,000. Same −37%. Only one of them got the recovery.
> Both bought at the last close of 2007. Alex held: ≈ $66,000 by the end of 2025. Sam sold at the end of 2008 to cut his losses and kept cash: $6,300. Holding finished with ≈ 10.5× as much. Selling didn't skip the drop. It skipped the recovery.
> Data: S&P 500 total return, dividends reinvested, 2008-2025 calendar years (S&P Dow Jones Indices). Index, no fees; cash at 0%. Past returns, not a prediction. Educational maths, not advice.
> #stockmarket #investing #2008crash #moneymath

**Pinned comment**
> "Sam's cash would've earned interest." Even at 5% every single year from 2009 to 2025, his $6,300 grows to ≈ $14,400. That's under a quarter of Alex's ≈ $66,000.

**Per-platform notes**
- **YouTube Shorts:** title above. The impact frame at 1.0 s is the hook frame; keep it in the first second of the feed preview.
- **Instagram Reels:** cover on the 2008 impact frame (the bet plus the −37% weight, no final number). Test the finished ledger as a second cover.
- **TikTok:** the comment fight is "but cash earns interest" or "nobody sells at the year-end", and the pinned comment answers the first. Expect timing arguments (the March 2009 low); the footer states the year-end rule.
- **Look note:** the Becker rig is a look reference, not a benchmark (`alan-becker.md`). Its devices used here are §4 "results are transformations" (the −37% weight crushing both blocks), §5 "something arrives within 1 s" (the impact at 1.0 s) and §6 idea 10's "punchline, not episode" (the mattress gag). The kit must also render a plain ledger if `lookOpts.beats` is ignored; this is unverified while the kit is a stub.

---

## 07c: Clean Sheet: "2 people save $10,000. Big bank vs high-yield. Interest after 5 years?"

| | |
|---|---|
| Look | `clean-sheet` (white worksheet, a booktabs ledger, highlighter boxes; the Clean Sheet kit ignores badges by design) |
| Spec | `studio/specs/07c-clean-sheet-savings-rate.json` (22.1 s) |
| Platform title | **2 People Save $10,000: Big Bank vs High-Yield. How Far Apart in 5 Years?** |
| On-screen hook (header) | **2 people save $10,000 / Big bank vs high-yield / Interest after 5 years?** (12 words, 3 lines; render-checked) |
| Columns at 0.0 s | **Mia**: "Big bank / 0.01% APY / × 1.0001 a year"; **Leo**: "High-yield / 4.00% APY / × 1.04 a year" (the kit splits each plan at " · "). Row "Day 1: $10,000 / $10,000" filled; Month 1 and Years 1-5 labelled in grey, cells empty |
| Stake line | "$10,000 each · 5 years · nothing added" is in the spec; the kit's layout engine drops it because the header already shows the money. The horizon is on screen in header line 3 and the footer |
| Footer | ASSUMES both rates hold 5 years · 0.01% = Chase Savings APY, Oct 2026 |

**Hook pass (2026-10-08): kept.** The two judges averaged this hook at 5.50. The best eligible rewrite, D ("Same **$10,000** / 1 month at high-yield / = ? years at a big bank"), averaged 7.25: 1.75 above the current hook, but under the 7.5 floor. C was ruled out because judge 2 marked it dishonest. The hook, title and body stay as they are. Scores, the judges' notes and the levers for the next round are in the [Review log](#hook-pass-2026-10-08).

**Topic change from the seed, and why**
- The seed asked for "sourced average rates over recent years".
- Round-1 searches found today's verified rates (Chase 0.01%; top high-yield offers in the 4.0-4.5% range) and the FDIC national average (0.37%). They found **no year-by-year high-yield average that I could confirm from two sources**.
- Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 07c uses **today's verified rates held for 5 years**, and the footer says so.
- **0.01%** is Chase's posted standard savings rate (Oct 2, 2026 sheet). **4.00%** is a round high-yield rate below every top rate found.

**Wrong belief it exploits:** "A savings account is a savings account, and my bank pays something." The VO opens on the number almost everyone guesses too high: one month at a big bank pays about 8 cents.

**Hook rules**

| Rule | How |
|---|---|
| R1 | "$10,000", "5 years", "0.01%", "4.00%", "× 1.0001", "× 1.04" and the Day 1 row are on screen at 0.0 s |
| R2 | One dollar input ($10,000) and no result |
| R3 | **Partial.** The working on screen (× 1.0001 / × 1.04 a year) works for any balance, and the pinned comment spells out the swap (a year's interest = balance × 0.04 at 4.00% APY) |
| R4 | $10,000 of savings is round and familiar |
| R5 | "Big bank" sounds safe and normal; the first VO line and the Month 1 row show 8 cents |
| R6 | Two people, $10,000, 5 years, all in the header |
| R7 | Options named in the header: big bank vs high-yield, with both rates in the plans |
| R8 | 12 words, 3 lines |
| R9 | 7 rows visible (Day 1, Month 1, Years 1-5), labels in grey ahead of their values |
| R10 | First payoff (Month 1: ≈ $10,000.08 vs ≈ $10,032.74) at **1.0 s**; biggest last |
| R11 | The header asks "Interest after 5 years?", and the verdict answers in the same words. The caption's first line takes a side without the numbers |
| R12 | A tiny honest verdict, "≈ $5 vs ≈ $2,167", in the spirit of Debt Freedom's "$2.98" verdict |

**Benchmark hooks it is modelled on**
- H80, Jake: "2 people invest $10,000 / 10 years ago" (QQQ vs SPY), 276,471 (5.66x med). The same stake in two places, with plain-English labels under the names.
- H49, The Debt Freedom Project: "What's the difference between daily payments and one extra lump sum payment each month?", with the caption "Yes, daily payments work!", 382,100 (289.1x). A tiny dollar difference still breaks out when it is a clear verdict.
- H07, HD Guy: "Which is cheaper? 1 Missile or 75 Rounds/Second", 11,957,600 (3.81x). Two named options, one forced pick.
- **Avoided on purpose:** FinCalC's "SIP vs RD Which is Better…", 7,665 (contrast H42). That is the generic "which is better?" form; the header asks a countable question instead.

**Beat sheet** (what the clean-sheet kit renders)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page title (3 lines, $10,000 on the yellow highlighter), footer, two columns with names and three-line plans (APY and the yearly multiplier), row "Day 1: $10,000 / $10,000", empty rows Month 1 and Years 1-5 | "One month at a big bank: about 8 cents." (0.0-3.5) |
| 1.0 | **Month 1** lands: the sand cursor band swipes the row and both values type in, ≈ $10,000.08 / ≈ $10,032.74. Tick | |
| 3.6 | (Month 1 holds) | "High-yield: about $33." (3.6-6.0) |
| 7.0 | **Year 1**: $10,001 / $10,400. Pop | "After a year: $1 versus $400." (6.2-9.7) |
| 7.9, 8.8, 9.7 | Years 2-4: ≈ $10,002 / $10,816; ≈ $10,003 / ≈ $11,249; ≈ $10,004 / ≈ $11,699 | |
| 10.7 | **Year 5**, the ledger's total line (rule above, larger figures): ≈ $10,005 / ≈ $12,167. Ding | "By year 5, Leo is up about $2,167." (9.9-15.3) |
| 15.5 | (The finished ledger holds) | "Mia is up about $5." (15.5-17.9) |
| 18.1 | Winner beat: Leo's ≈ $12,167 takes the blue box and his name the blue highlighter. Verdict "Interest after 5 years: / ≈ $5 vs **≈ $2,167**" (≈ $5 on coral, ≈ $2,167 on blue, in column order) | "Same $10,000. Different account." (18.1-20.5) |
| 20.5-22.1 | Hold, then the values clear to the frame-1 state (loop) | |

**Full guide VO** (about 50 spoken words)

> One month at a big bank: about 8 cents. High-yield: about $33. After a year: $1 versus $400. By year 5, Leo is up about $2,167. Mia is up about $5. Same $10,000. Different account.

**The maths**

- **Basis:** balance after t years = $10,000 × (1 + APY)^t. APY is the effective annual rate, so month 1 uses t = 1/12. Interest stays in the account, and nothing is added or withdrawn.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Month 1, Mia | 10,000 × 1.0001^(1/12) | 10,000.0833 | ≈ $10,000.08 (VO: about 8 cents) |
| Month 1, Leo | 10,000 × 1.04^(1/12) | 10,032.7374 | ≈ $10,032.74 (VO: about $33) |
| Year 1 | 10,000 × 1.0001 / 10,000 × 1.04 | 10,001.00 / 10,400.00 | $10,001 / $10,400 (VO: $1 vs $400) |
| Year 2 | ^2 | 10,002.0001 / 10,816.00 | ≈ $10,002 / $10,816 |
| Year 3 | ^3 | 10,003.0003 / 11,248.64 | ≈ $10,003 / ≈ $11,249 |
| Year 4 | ^4 | 10,004.0006 / 11,698.59 | ≈ $10,004 / ≈ $11,699 |
| Year 5 | ^5 | 10,005.0010 / 12,166.53 | ≈ $10,005 / ≈ $12,167 |
| Verdict | balance − 10,000 at year 5 | 5.0010 / 2,166.53 | ≈ $5 / ≈ $2,167 |
| Plan multipliers | 1 + APY | 1.0001 / 1.04 | "× 1.0001 a year" / "× 1.04 a year" |

- **Extras for the write-up and comments:**
  - 2,166.53 ÷ 5.001 = ≈ 433×.
  - The FDIC national average of 0.37% on $10,000 is $37 a year.
  - At 0.15% (a Wells Fargo figure from one search summary, unverified), Mia would earn ≈ $75 in 5 years. That is still under 4% of Leo's.

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| Chase Savings standard rate 0.01% APY (all tiers; relationship rate 0.02%) | JPMorgan Chase Bank, "Consumer Deposit Rates: rates in effect as of Friday, October 02, 2026" (rate sheet PDF; read through the search engine, the fetch was blocked) **[click-check]** | 2026-10-02 | https://www.chase.com/content/dam/chase-ux/ratesheets/pdfs/rdwi1.pdf |
| Same rate on the previous sheet (the round-1 md cited rdfl1.pdf; the verifier found the Sep 11 sheet at rdny1.pdf) | JPMorgan Chase Bank, "Consumer Deposit Rates: rates in effect as of Friday, September 11, 2026" | 2026-09-11 | https://www.chase.com/content/dam/chase-ux/ratesheets/pdfs/rdny1.pdf |
| Same, second source: "0.01% … effective as of 05/07/2025 … current through 2026"; Premier relationship rate 0.02% | Bankrate, "Chase Savings Account Interest Rates" | searched 2026-10-07 | https://www.bankrate.com/banking/savings/chase-savings-rates/ |
| Same, third source: Chase savings "up to 0.02% APY", national average 0.37% | NerdWallet, "Chase Savings Account Interest Rates: How They Compare" | searched 2026-10-07 | https://www.nerdwallet.com/banking/learn/chase-savings-account-interest-rate-how-it-compares |
| High-yield offers now: NexBank 4.15%, CIT Bank, Always.bank and Pibank 4.10%, FVCbank 4.01% (so 4.00% is below every named offer) | The College Investor, "Best High-Yield Savings Rates For September 28, 2026" **[click-check]** | 2026-09-28 | https://thecollegeinvestor.com/89432/best-high-yield-savings-rates-for-september-28-2026/ |
| Same, Bankrate: "up to 4.21%" in October 2026 (the round-1 "4.27%" could not be confirmed and is withdrawn) | Bankrate, "Best High-Yield Savings Accounts" | October 2026 | https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/ |
| Same: up to 4.25% APY | Yahoo Finance, "Best high-yield savings interest rates today, Friday, October 2, 2026: Earn up to 4.25% APY" | 2026-10-02 | https://finance.yahoo.com/personal-finance/banking/article/best-high-yield-savings-interest-rates-today-friday-october-2-2026-earn-up-to-425-apy-100000647.html |
| Same: up to 4.50% | Fortune, "Top high-yield savings rates: Up to 4.50% on Thursday, Sept. 24, 2026" | 2026-09-24 | https://fortune.com/article/best-savings-account-rates-9-24-2026/ |
| FDIC national average savings rate 0.37% APY (pinned comment only; the verifier confirmed the Sep 21, 2026 release, Aug 0.38%) | FDIC, "National Rates and Rate Caps"; The Motley Fool, "Average Savings Account Interest Rate in September 2026"; NerdWallet (above) | September 2026 | https://www.fdic.gov/national-rates-and-rate-caps · https://www.fool.com/money/research/average-savings-account-interest-rate/ |
| Not used on screen: Bank of America Advantage Savings 0.04%, Wells Fargo Way2Save 0.15% (one search summary; unverified) | U.S. News, "Do You Keep Your Savings at Chase or Wells Fargo? Here's How Much You're Losing" | searched 2026-10-07 | https://www.usnews.com/banking/articles/do-you-keep-your-savings-at-chase-or-wells-fargo-heres-how-much-youre-losing |

**Assumptions (in the footer):**
- both APYs hold for 5 years (they will move);
- interest is left in, and nothing is added;
- 0.01% is Chase Savings' standard APY on its Oct 2, 2026 rate sheet (unchanged from Sep 11);
- 4.00% is a round high-yield rate below every named top offer (4.01-4.15%) and every "up to" headline (4.21-4.50%);
- no taxes, no fees (Chase Savings' $5 monthly fee is waivable and is ignored here).

**Caption**
> A savings account is not just a savings account.
> Same $10,000 for 5 years: ≈ $5 of interest at 0.01% APY (Chase Savings' standard rate on its Oct 2, 2026 rate sheet) vs ≈ $2,167 at 4.00% APY. Rates move; this holds both still for 5 years. Top high-yield offers in late Sep/early Oct 2026 ran about 4.15-4.50%. Educational maths, not advice.
> #savings #highyieldsavings #personalfinance #moneymath

**Pinned comment**
> Swap in your own balance: a year's interest is balance × 0.04 at 4.00% APY, and balance × 0.0001 at 0.01%. The FDIC's national average is 0.37% (Sep 2026): $37 a year on $10,000. What does yours pay?

**Per-platform notes**
- **YouTube Shorts:** title above. "Big bank" and "high-yield" are the search words.
- **Instagram Reels:** cover on frame 1 (the question plus both rates and multipliers) or the Month 1 row. It is a natural save-and-share for anyone who keeps savings at a branch bank.
- **TikTok:** expect comments naming banks and rates. The pinned comment asks for them, which is the duel's "pick a side" in comment form.
- **Look note:** the Clean Sheet direction is "parked" in `03-look-directions.md` (its step-by-step pages underperformed). Its core rule is that the working stays visible. In the revision the working lives in the column plans ("× 1.0001 a year" / "× 1.04 a year"), which the kit always draws; the round-1 badge and formula footnotes never rendered (the kit ignores badges and drops the footnotes first to keep figures at 48 px or more).

---

## Search log

Round 1 (11 of 14):
1. S&P 500 annual total return by year, 2007/2008/2009/2025: dqydj and others (5.48 / −36.55 / 25.94: their own method).
2. The S&P 500 figures for 2007-2016, with the numbers supplied: confirmed (weak check, since the query echoed them).
3. Damodaran's historical returns, restricted to stern.nyu.edu: partial years (cross-check).
4. S&P 500 calendar-year total returns 2017-2025, no numbers supplied: the full list.
5. S&P 500 total return 2006-2016, restricted to Slickcharts and related sites, no numbers supplied: the full list.
6. Average high-yield savings APY by year: only FDIC national averages and this month's top rates. This is why 07c changed basis.
7. Chase, Bank of America and Wells Fargo standard savings APYs: Chase 0.01%; the others unverified.
8. Chase Savings APY, restricted to bank and review sites: the Chase rate sheet, Bankrate and NerdWallet.
9. FDIC national savings rate, September 2026: 0.37%; Fortune's top rate of 4.50%.
10. A $10,000-since-2007 calculator: no usable figure.
11. S&P DJI on 2008 −37%, restricted to spglobal.com: the primary publisher's documents.

Revision (3 searches, 1 fetch):
12. Chase deposit rates "October 2, 2026" Chase Savings: review pages only.
13. Fetch of chase.com rdwi1.pdf: blocked by the egress proxy.
14. Chase rate sheets, extended search: the Oct 2, 2026 sheet (rdwi1.pdf) lists Chase Savings standard 0.01% APY on all tiers, relationship 0.02%; also the Sep 11 (rdny1.pdf), Jul 10 and Mar 20 sheets.
15. Best high-yield savings, October 2026: Bankrate "up to 4.21%"; The College Investor Sep 28, 2026 named offers 4.01-4.15%.

---

## Review log

Round-2 review: the verifier (1 must, 5 shoulds, 5 nits) and the hook judge (07a 7, 07b 7, 07c 6). Each item and what was done.

### Verifier

| # | Teaser | Severity, kind | Issue | What I did |
|---|---|---|---|---|
| V1 | 07a | **must**, math-rounding | Formula bar "≈ $35,000 … × ≈ 8.1" gives $283,500, not the ≈ $281,000 in the same frame | **Fixed.** The bar now reads "Ava's ≈ $34,617, untouched: / × ≈ 8.12 ≈ $281,000 at 65". 34,617 × 8.12 = 281,090.04 → ≈ $281,000, and the exact 34,616.96 × 8.11650 = 280,968.48 → ≈ $281,000. Each "≈ number" is bound with a no-break space so the bar wraps only before "×"; render-checked as two clean lines at 16.5 s. The checker now asserts that the product of the shown factors rounds to the shown final, and the maths table shows both products |
| V2 | 07a | should, timing-R10 | First row at 3.4 s | **Fixed.** Age 30 lands at **2.4 s**. The checker's own threshold is now 3.0 s for all three teasers (it had allowed 3.5-3.6 s) |
| V3 | 07a | should, timing-beat | Ava's bar line was up for 0.6 s | **Fixed.** Ava's line is at 3.6 s (VO "Ava starts at 25 and stops at 35") and holds 4.0 s; Ben's is at 7.6 s and holds 6.6 s. Both lines were cut to 32 characters so they fit on one line (render-checked; the original 35-character line wrapped "in"). The checker now requires each bar line to stay up for typing at 24 characters a second plus 1.5 s of reading |
| V4 | 07a | should, honesty-sensitivity | The reversal flips at ≈ 6.11%; not disclosed | **Fixed.** Added to the maths (break-even 6.109%; at 6% Ava ≈ $197,000 vs Ben ≈ $201,000; at 6.5% Ava leads by ≈ $14,000) and to the caption ("At 6% a year Ben edges ahead … Ava's head start wins above about 6.1%"). R12 now states the condition. The checker asserts both figures. Footer unchanged |
| V5 | 07c | should, md-vs-render | Badge and formula lines never render; md claimed them, plus pointer/highlighter beats with no spec field | **Fixed as suggested.** The plans now carry the working ("Big bank · 0.01% APY · × 1.0001 a year", "High-yield · 4.00% APY · × 1.04 a year"); the stake carries "5 years"; `lookOpts.badge` and `lookOpts.formulas` are deleted (07c has no `lookOpts`). Stills at 0, 1.6, 12 and 20 s and a contact sheet confirm the plans render as three lines each. The kit drops the stake line because the header shows the money, so the horizon now sits in header line 3 and the footer. The columns row, R1, R6, the beat sheet (only the kit's real beats: cursor band, total line, winner box) and the Look note were rewritten to match the render |
| V6 | 07c | should, timing-R10 | First payoff at 3.6 s | **Fixed, by the hook judge's route rather than the verifier's.** VO line 0 is now the first payoff itself ("One month at a big bank: about 8 cents."), and the Month 1 row lands at **1.0 s**. The verifier's shorter "Two people save $10,000." was not needed: the header carries the stake and the horizon |
| V7 | 07b | nit, clarity-labels | "Jan 2007" start row mixed with year-end rows; uneven years | **Fixed.** The start row is now "Dec 2007" (the Dec 31, 2007 buy, itself a year-end), and the footer states the rule: "Year-end S&P 500 total return, dividends in · cash at 0%". "No fees" moved to the caption. The md now says the row years are chosen for rhythm and every value compounds every year in between |
| V8 | 07a/07b | nit, contract-lint-coverage | Live-sheet and Becker ledger kits were stubs; md linter paragraph stale | **Partly fixed.** The linter paragraph is updated (3/3 clean, 0 warnings). The live-sheet kit has since landed in the working tree, so 07a's ledger, `formulaBar` and `rowLabelsAtStart` are now linted and render-checked. **Open:** the Becker `ledger-duel` kit is still a stub, so 07b's ledger, rig beats and plain-ledger fallback remain unverified |
| V9 | 07c | nit, fact-sourcing | Bankrate "up to 4.27%" unconfirmed; Chase sheet URL; newer Oct 2 sheet | **Fixed.** The 4.27% row is withdrawn; Bankrate's October page reads "up to 4.21%" (search). Added The College Investor's Sep 28 named offers (4.01-4.15%). The Chase citation now points to the Sep 11 sheet at rdny1.pdf and the Oct 2 sheet at rdwi1.pdf, which still lists Chase Savings at 0.01% (search reading; fetch blocked, marked [click-check]). The footer now says "Oct 2026". The caption range is now "about 4.15-4.50%" |
| V10 | 07c | nit, consistency-order | Verdict listed Leo first, columns run Mia then Leo | **Fixed.** Verdict "Interest after 5 years: / __≈ $5__ vs **≈ $2,167**" (coral, then blue), matching the columns; the caption gives the numbers in the same order. Render-checked at 20 s |
| V11 | 07b | nit, caption-wording | "≈ 10.5× ahead" | **Fixed.** Now "Holding finished with ≈ 10.5× as much", moved to caption line 2 |

### Hook judge

| Teaser | Judge | What I did | Score after (my estimate) |
|---|---|---|---|
| 07a | 7: the twist is missing from the hook line (R7 fail in the header), the first VO repeats the banner, R3 overstated, caption line 1 and IG cover give the answer away | **Adopted the rewrite.** Header "2 people invest **$200 a month** / 10 years vs 30 years. Who wins at 65?" (15 words; render-checked on 2 lines). VO opens "Ava invests for 10 years. Ben invests for 30." Age 30 row at 2.4 s. Caption line 1 "10 years of $200 vs 30 years of $200. Watch the Age 65 row."; IG cover is now frame 1. R3 rewritten as partial. **Not adopted:** the judge's separate "Same $200 a month." VO line (the banner shows it at 0.0 s and the formula bar repeats it; dropping it keeps rows about 1 s apart), and its 0.0-3.0 timing (9 spoken words need 3.5 s at our 2.6 words a second). Title kept: the judge rated it above the old header | 8 |
| 07b | 7: starts a year too early; the 2.7 s row is a +5% non-event; crash only at 5.2 s; caption gives away the magnitude; overlaps 04b | **Adopted the rewrite.** Bought at the Dec 31, 2007 close ("right before 2008"), frame-1 row "Dec 2007: $10,000 / $10,000", the −37% impact and the 2008 row at **1.0 s**. Re-ran the ledger on the same S&P DJI returns (matches the judge's figures: $6,300, ≈ $66,000, 10.48×, pinned ≈ $14,400). Caption line 1 "Same $10,000. Same −37%. Only one of them got the recovery." **Changed:** VO line 0 is "2008 takes 37%." alone, because the judge's "$10,000 each. Then 2008 takes 37%." is 11 spoken words and cannot fit 0.0-2.6 s; the header carries the $10,000. "To stay safe" became "to cut his losses", which names the same belief and removes the shared "safe" with 04b's "A safe savings account vs the S&P 500". Header set on 3 lines (13 words) after the Becker chrome wrapped it badly. Kept the 0% cash plus the 5% pinned-comment bound | 8 |
| 07c | 6: header is an X-vs-Y label with no question or horizon; no implied wrong answer; payoff at 3.6 s; caption opens with the full answer | **Adopted the rewrite, with a shorter header.** The judge's 2-line header wrapped to 4 lines with an orphaned "years" in the Clean Sheet, so it is now "2 people save **$10,000** / Big bank vs high-yield / Interest after 5 years?" (12 words, 3 lines, render-checked). Its last line is the countable question, and the verdict answers it word for word. VO opens on the 8 cents, Month 1 at 1.0 s, caption line 1 "A savings account is not just a savings account." **Not adopted:** the badge variant ("5 YEARS · 0.01% vs 4.00%"), because the kit ignores badges; and the coral highlighter on Mia's Month 1 cell, which has no field in the spec contract. The pinned comment now spells out the swap-your-balance rule (R3). The judge also noted 07c is the third slate teaser where cash loses (with 04b and 07b); that is lane-assigned ("high-yield vs big-bank savings"), so the topic stays | 7 |

### Still open
- The Becker `ledger-duel` kit is a stub: 07b's ledger body, rig beats, `rowLabelsAtStart` and the no-`lookOpts` fallback need `check` and `stills` once it lands.
- The [click-check] pages (Slickcharts, the Chase Oct 2 rate sheet, The College Investor's Sep 28 list) should be opened by hand before posting; the proxy blocks fetching them.

### Hook pass (2026-10-08)

The owner rejected round 1 partly because "hooks are weak". For 07c, two judges scored the current hook and four rewrites (A-D) out of 10. A hook here is the header at t = 0, the first VO line, what is visible in the first 1.5 s, and the platform title, built on the hook bank's P1-P9 and R1-R12. **Rule:** average the two judges' scores for each option. An option that either judge marks dishonest is out. Adopt the best option only if its average is **≥ 7.5** and **≥ 0.75 above the current hook**. Otherwise keep the current hook; a clearly better title may still be taken. 07a and 07b were not in this pass.

| Option | Judge 1 | Judge 2 | Average | Decision |
|---|---:|---:|---:|---|
| current: "2 people save **$10,000** / Big bank vs high-yield / Interest after 5 years?" | 6 | 5 | **5.50** | **kept** |
| A: "2 people save **$10,000** / Chase vs high-yield / Interest after 5 years?" (vo0 "One month at Chase: about 8 cents.") | 7 | 6 | 6.50 | |
| B: "POV: your **$10,000** / sits at a big bank / for 5 years" (a "You" column; verdict "cost you ≈ $2,162") | 7.5 | 6.5 | 7.00 | +1.50, under 7.5 |
| C: "2 people save **$10,000** / 0.01% vs 4.00% interest / How many times more?" (Year 1 at 1.0 s; verdict ≈ 433×) | 5 | 4 (dishonest) | (4.50) | out (judge 2: honesty) |
| D: "Same **$10,000** / 1 month at high-yield / = ? years at a big bank" (verdict "1 month = ≈ 33 years") | 7.5 | 7 | **7.25** | best eligible: +1.75, under 7.5 |

**Why nothing was adopted:**
- D (7.25) and B (7.00) both cleared the +0.75 margin but not the 7.5 floor. A (6.50) missed the floor by a full point.
- C is out. Judge 2 marked it dishonest because its stated mechanism, "400× every year", is false. The yearly interest ratio is 400 × (1.04 / 1.0001)^(n−1): 400, 416, 433, 450 and 468 in years 1-5, which is why the 5-year total comes to ≈ 433× (2,166.53 ÷ 5.0010 = 433.2). Judge 1 flagged the same phrase as loose and scored C 5. The on-screen numbers were right; the line must not reach any VO, caption or pinned comment. Both judges also found that C gives itself away: with "0.01% vs 4.00%" in the hook line, "How many times more?" is answered by dividing in the first second (R2).
- Both judges re-ran the maths of every option and found it correct: 8.33 cents and $32.74 in month 1; ≈ $5 vs ≈ $2,167 after 5 years; B's $12,166.53 − $10,005.00 = $2,161.53 → ≈ $2,162; D's ln(1.0032737) ÷ ln(1.0001) = 32.69 → ≈ 33 years, bracketed by $32.05 (32 years) and $33.05 (33 years); A's pinned 0.02% line, 10,000 × (1.0002^5 − 1) = $10.00. I recomputed the same figures.

**Title: kept** ("2 People Save $10,000: Big Bank vs High-Yield. How Far Apart in 5 Years?"). The judges scored whole hooks, not titles, and no candidate title is clearly better for the current body:
- **A** ("…Chase vs High-Yield…") would name Chase in the title while the header says "Big bank" and Chase sits only in the footer. It also moves the [click-check] rate into the most-read line and invites the 0.02% relationship-rate replies, for a gain both judges put at one point for the whole hook.
- **B** ("What If Your $10,000 Sat in High-Yield Instead of a Big Bank?") is R11's second form, which needs the screen to say "you did it": a POV header and a "You" column. Over the current Mia and Leo body, the title and the screen would not match.
- **D** ("1 Month at High-Yield = How Many Years at a Big Bank?") asks a question the current body never answers; there is no 33-year verdict in this cut.
- **C** is out on honesty.
- The current title already carries both options, the $10,000 and the 5-year horizon, and the verdict answers its question.

**What the judges agreed on, for the next round:**
- **The current hook:**
  - The plans print 0.01% vs 4.00% at frame 1, so the winner is known in second 1 and only the size is left open. Nothing reverses. Judge 2 adds that "a big bank pays almost nothing" is the most familiar fact in personal-finance shorts.
  - "Big bank" is an unnamed category (R7), and the $10,000 belongs to two strangers (R3/R6).
  - The first payoff at 1.0 s sits in the last digits of "≈ $10,000.08 / ≈ $10,032.74", and the spoken "8 cents" lands at about 2.7-3.5 s.
  - Both rank it under Jake's plain duel without a twist (H80, 276,471, 5.66x med) and far under ChartOrbit's P4 winners (H16 100.45x, H17 345.09x), whose outcome is not known at frame 1.
- **Levers:**
  - **B + A.** Judge 1 called combining them ("POV: your $10,000 / sits at Chase…") "the route to an 8": B has the clearest stake in the set (you + $10,000 + 5 years, R6) and puts the viewer in the losing seat (H45, H43), and A names a bank many viewers use (R7). Before rescoring it needs: judge 2's wording fix, "One month at that bank", not "at your bank" (many viewers' banks pay more; the FDIC national average is 0.37%); the posting-day [click-check] of Chase's rate sheet; and B's checker changes (header tokens without "2"; a verdict claim on $12,167 − $10,005 = $2,162).
  - **D.** The most novel option and the best open loop: one countable blank that cannot be solved in 1.5 s, money re-priced as time (P5/P8; H71's "25 YEARS" vs "~6.7 YEARS"), and a verdict viewers can repeat (R12, "1 month = 33 years"). Both judges noted that the ratio does not depend on the balance, so it holds for every viewer's savings (a hidden R3 strength the caption should state). It needs a "you" (R6) and a named bank (R7). Judge 1: the footer must change too, because "both rates hold 5 years" contradicts a 33-year equivalence. Judge 2: the 5-year dollar ledger does not itself build to the 33-year answer, so the verdict card has to fill the blank.
  - **C's first number.** Judge 1 rated the exact "$1 a year" row ($10,001 / $10,400, no ≈) at 1.0 s the cleanest first number of the five. A future cut could land Year 1 first without C's header.
- **Open items (not applied, because they were not scored):**
  - A B + A (or D + "you" + Chase) rewrite, rescored by both judges before it goes into the spec.
  - Seen in today's stills: the Clean Sheet caption shows the whole first VO line from 0.0 s, in grey ahead of the karaoke highlight, so "about 8 cents" is readable on frame 1 before it is spoken. Any rewrite whose vo0 carries the answer to the header's question (D's "about $33" or C's "$1") puts that answer on frame 1 too.

**Files:** no changes to the spec, beats, VO, captions, check script or `teasers.json` (which still carries round 2's writer estimate for 07c, 7; the judges' average for the kept hook is 5.50). The only changes to this write-up are the date line, the "Hook pass" line under 07c, and this log.
- Re-run of `python3 teasers/v2/checks/07-ledger-duel.py`: **406 checks, 0 failures**, ALL OK, exit 0.
- `node src/cli.mjs check` on 07a, 07b and 07c with today's kits: 0 errors, 0 warnings each.
- `node src/cli.mjs stills` on 07c at 0, 1.5 and 3.0 s:
  - **0.0 s.** The 3-line header with $10,000 on the yellow highlighter, the 2-line footer ("ASSUMES both rates hold 5 years / 0.01% = Chase Savings APY, Oct 2026"), Mia and Leo with their 3-line plans (0.01% APY, × 1.0001 a year; 4.00% APY, × 1.04 a year), the Day 1 row $10,000 / $10,000 filled, Month 1 and Years 1-5 labelled in grey with empty cells, and the caption "One month at a big bank: about 8 cents." with "One" lit.
  - **1.5 s.** Month 1 is filled in the sand band: ≈ $10,000.08 / ≈ $10,032.74. The caption is lit through "bank:".
  - **3.0 s.** The same rows; the caption is fully lit. Year 1 lands at 7.0 s.
