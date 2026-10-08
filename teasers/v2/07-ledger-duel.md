# Format 7: "2 people invest" ledger duel, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews; hook pass on 2026-10-08, 07c kept; hook pass 2 on 2026-10-08, 07c rewritten to "You save $100 a month"; assembly pass on 2026-10-08, 07a and 07c fitted, VO-locked marks added, rendered; see the [review log](#review-log))
**Format:** `ledger-duel`, hook pattern **P4** ("same money, two choices")
**Lane:** two people, the same money, two choices, a year-by-year ledger
**Files:**
- Specs:
  - [`studio/specs/07a-live-sheet-start-at-25.json`](../../studio/specs/07a-live-sheet-start-at-25.json)
  - [`studio/specs/07b-becker-rig-panic-sell-2008.json`](../../studio/specs/07b-becker-rig-panic-sell-2008.json)
  - [`studio/specs/07c-clean-sheet-savings-rate.json`](../../studio/specs/07c-clean-sheet-savings-rate.json)
- Check: [`teasers/v2/checks/07-ledger-duel.py`](checks/07-ledger-duel.py). Run `python3 teasers/v2/checks/07-ledger-duel.py`. It reports **410 checks, 0 failures** and exits 0 (407 after hook pass 2, 406 before it; the assembly pass added six VO-locked mark checks and dropped 07a's three "sfx on a beat" checks with its three duplicate spec cues). Two deliberate corruptions (the old "× ≈ 8.1" shortcut in 07a's formula bar, and "$6,600" in a 07b VO line) made it exit 1, each with a named failure. Hook pass 2's four corruptions of a scratch copy of the new 07c spec (a Year 3 cell, "about 6 cents", the Year 5 row off its word, a dropped "≈" in the verdict) gave 5 named failures and exit 1.
  - New in the revision: the first payoff row must land by **3.0 s** (R10); a formula that multiplies shown factors must reproduce the shown result; every formula-bar line must stay up long enough to type (24 characters a second) and then be read (1.5 s); headers are capped at 4 lines; 07a's break-even rate and 6% case are asserted.

**How the facts were checked:**
- Round 1 ran 11 web searches out of 14. This revision ran 3 more and one page fetch.
- The egress proxy blocks opening pages (Slickcharts, NYU Stern, the Motley Fool, chase.com, FRED). So each real-world figure below comes from a **search result**: the publisher's page title, URL and date, plus the search engine's reading of the page.
- Before posting, someone should open the pages that carry the most weight and confirm them by hand. They are marked **[click-check]** in the sources.
- 07a needs no real-world data. Its 7% is a stated assumption, and its break-even rate is now disclosed.

**Studio linter** (`node src/cli.mjs check`, re-run after the revision): **3/3 clean, 0 errors, 0 warnings.** The old footer warning on 07b is gone. After the assembly pass, 07a and 07c are lint-clean at every frame (`--every 0.0333333`) and rendered to `studio/out/` (see [Assembly pass](#assembly-pass-2026-10-08)).
- **07a (Live Sheet):** the live-sheet `ledger-duel` kit now exists in the working tree, so the ledger body, `lookOpts.formulaBar` and `rowLabelsAtStart` are linted and rendered. Stills and a contact sheet of the final spec checked at 0, 2.6, 4.5, 5.5, 6.6, 8.4, 14.0, 16.5 and 23.5 s; after the assembly pass at 0, 2.8, 4.5, 6.6, 8.0, 9.9, 12.5, 14.6, 15.4, 16.2, 16.5, 19, 21, 22.6, 24, 26.5 and 27.67 s.
- **07c (Clean Sheet):** the clean-sheet kit is built. Stills and a contact sheet of the round-2 spec checked at 0, 1.6, 2.6, 4.5, 6.6, 8.4, 14.0, 16.5 and 20 s. The hook-pass-2 spec is lint-clean at every frame (`--every 0.0333333`), with stills checked at 0, 1.5, 3.0, 9.8 and 16.5 s; after the assembly pass at 0, 1.5, 2.7, 3.0, 4.4, 5.5, 7.3, 8.7, 10.3, 10.5, 12.5, 12.8, 15.8, 16, 17.5 and 19.07 s.
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
   - Jake's duels are silent and 11 s long. With a voice-over ours run 19.1-27.7 s, inside the 12-30 s lane set for this format. The rows still land about a second apart once the bet is set, and a music-only 12-14 s cut is worth testing.
   - The lecture version of the panic-sell idea flopped. Master Money's "MISSING THE BEST 10 DAYS CAN DESTROY YOUR RETURNS" got 2,916 (0.3x med), https://www.instagram.com/reel/DeKyDoNxKhx/. That is why 07b is a duel, not a warning.

### Decisions shared by all three

- **The "2 people" have names** (Ava/Ben, Alex/Sam), so comments can take sides. Jake used tickers; we have no person on camera, so names do the work his costumes did. Since hook pass 2, 07c's pair is You/Leo: the viewer sits in the losing column.
- **The bet is in the hook line, not only in the column sub-labels** (revision): "10 years vs 30 years", "right before 2008 / One sells". The viewer can pick a side from the header alone (R7). Since hook pass 2, 07c's header names only the losing side ("A big bank adds: ?") and asks for one number; the high-yield side is in Leo's plan from frame 1 (R7 partial).
- **The first payoff lands by 3 s:** 2.4 s (07a), 1.0 s (07b), 1.0 s (07c).
- **Rounding:**
  - every rounded result shows "≈" on screen and "about" in the VO;
  - exact values carry neither (07b's $6,300 is exact: $10,000 × 0.63);
  - each ledger keeps one precision: 07a to the nearest $1,000, 07b to the nearest $100, 07c to the cent (interest only, from hook pass 2);
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
| Columns at 0.0 s | **Ava**: "Age 25 → 35 · put in $24,000"; **Ben**: "Age 35 → 65 · put in $72,000" (each plan on 2 lines; "puts in" wrapped to 3 and pushed the captions out of the band). Column A: Age 30 … Age 65, cells empty |
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
| 11.1, 12.0, 12.9 | Rows 50, 55, 60: ≈ $99,000 / ≈ $63,000; ≈ $140,000 / ≈ $104,000; ≈ $198,000 / ≈ $162,000 | "Ben invests 3 times as much." (10.9-13.6; captions "BEN INVESTS" / "3 TIMES AS MUCH") |
| 14.2 | Row **Age 65** counts up (lands 15.0): **≈ $281,000 / ≈ $244,000**. Formula bar, one line: "Ava's ≈ $34,617 grows × ≈ 8.12" (the product, ≈ $281,000, is the cell counting up under it). Roll, then pop | "At 65, Ava has about $281,000." (13.8-18.5) |
| 16.0 | Mark: the selection springs from the B:C range onto Ava's **≈ $281,000**, which flashes. Pop | (…about $281,000.) |
| 19.6 | Mark: the selection hops to Ben's **≈ $244,000**, which flashes. Pop | "Ben has about $244,000." (18.7-22.2) |
| 22.4 | Verdict card in the caption band: "**Ava** wins by ≈ $37,000 / with a third of the money". The selection springs onto Ava's column, which washes yellow, and her final cell takes the solid yellow. Ding | "A third of the money, and Ava still wins." (22.4-25.9) |
| 25.9-27.7 | The finished sheet holds, then clears to the frame-1 state, which makes the loop | |

**Full guide VO** (about 64 spoken words)

> Ava invests for 10 years. Ben invests for 30. Ava starts at 25 and stops at 35. Ben starts at 35 and never stops. Ben invests 3 times as much. At 65, Ava has about $281,000. Ben has about $244,000. A third of the money, and Ava still wins.

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
| Formula bar at 14.2 s | B(120) to the dollar × g^360 to 2 dp | 34,616.96 × 8.11650 = 280,968.48; **shown factors** 34,617 × 8.12 = 281,090.04 | "Ava's ≈ $34,617 grows × ≈ 8.12", typed as the Age 65 cell counts up to ≈ $281,000 (both products round to it) |
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

## 07c: Clean Sheet: "You save $100 a month. 5 years = $6,000. A big bank adds: ?"

| | |
|---|---|
| Look | `clean-sheet` (white worksheet, a booktabs ledger, highlighter boxes; the Clean Sheet kit ignores badges by design) |
| Spec | `studio/specs/07c-clean-sheet-savings-rate.json` (19.1 s) |
| Platform title | **You Save $100 a Month for 5 Years. How Much Does a Big Bank Add?** |
| On-screen hook (header) | **You save $100 a month / 5 years = $6,000 / A big bank adds: ?** (14 words, 3 lines, "$100 a month" on the yellow highlighter; render-checked) |
| Columns at 0.0 s | **You**: "Big bank / 0.01% APY / $100 a month"; **Leo**: "High-yield / 4.00% APY / $100 a month" (the kit splits each plan at " · "). Row "Start: $0.00 / $0.00" filled; Years 1-5 labelled in grey, cells empty |
| Stake line | "Interest earned so far · $100 a month each". `lookOpts.stake: "show"` keeps it on screen; by default the kit drops a stake line whose money the header already shows. It is the line that tells the viewer the cells are interest, not balances |
| Footer | ASSUMES $100 at each month-end, rates held 5 years · 0.01% = Chase Savings APY (2 lines; the rate sheet's date is in the caption) |

**Hook pass 2 (2026-10-08): rewritten.** The two judges averaged this hook at **7.25**, against **5.00** for the one it replaced ("2 people save **$10,000** / Big bank vs high-yield / Interest after 5 years?", with Mia and Leo each holding a $10,000 lump sum). Two other rewrites also averaged 7.25. This one won the tie on the owner's priority rules: it is the only option with a number the viewer owns and a full stake (you + $100 a month + 5 years). The money changed from a $10,000 lump sum to $100 a month; the lane, the rates, the sources and the two-column ledger did not. The first hook pass's "kept" verdict is superseded; both passes are in the [Review log](#hook-pass-2-2026-10-08).

**Topic change from the seed, and why**
- The seed asked for "sourced average rates over recent years".
- Round-1 searches found today's verified rates (Chase 0.01%; top high-yield offers in the 4.0-4.5% range) and the FDIC national average (0.37%). They found **no year-by-year high-yield average that I could confirm from two sources**.
- Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 07c uses **today's verified rates held for 5 years**, and the footer says so.
- **0.01%** is Chase's posted standard savings rate (Oct 2, 2026 sheet). **4.00%** is a round high-yield rate below every top rate found.
- Hook pass 2 swapped the $10,000 lump sum for **$100 a month**, a habit the viewer can own, and put "You" in the big-bank seat.

**Wrong belief it exploits:** "My savings at the bank earn something worth counting." The header asks for one number, what a big bank adds to $6,000 over 5 years, and most guesses land in the tens or hundreds of dollars. The answer is ≈ $1.48. Leo's column shows what the same deposits earn at 4.00%: ≈ $617.90. Both judges noted the limit: "a big bank pays almost nothing" is a familiar fact, so a savvy viewer's "basically nothing" is right.

**Hook rules**

| Rule | How |
|---|---|
| R1 | "$100 a month", "5 years", "$6,000", "0.01%", "4.00%" and the Start row ($0.00 / $0.00) are on screen at 0.0 s |
| R2 | **Partial.** One input ($100 a month) and an empty result slot ("?"). The header also shows the deposit total, $6,000; both judges counted it as a second dollar figure under a strict reading |
| R3 | $100 a month is a habit the viewer can own, and "You" heads the left column. The maths is linear, so the caption tells $200-a-month savers to double both columns |
| R4 | $100 a month: small, round, familiar |
| R5 | The "?" invites a guess in tens or hundreds of dollars; the answer is ≈ $1.48 |
| R6 | **Full:** you + $100 a month + 5 years, all in the header |
| R7 | **Partial.** The header names only the big bank; the high-yield side is in Leo's plan from frame 1. "Big bank" is unnamed in the header; Chase is in the footer |
| R8 | 14 words, 3 lines |
| R9 | One blank ("?") and 5 grey year rows with empty cells (render-checked) |
| R10 | First payoff (Year 1: ≈ $0.05 / ≈ $21.84) at **1.0 s**; biggest last (Year 5, the ledger's total line) |
| R11 | The header asks "A big bank adds: ?"; the verdict answers it ("$6,000 saved, 5 years: ≈ $1.48 vs ≈ $617.90"). The caption's first line repeats the question without a number |
| R12 | A lopsided, repeatable verdict on the same $6,000: ≈ $1.48 vs ≈ $617.90 (≈ 419×, kept off screen) |

**Benchmark hooks it is modelled on**
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years", with the Year 1 row on screen at 0 s, 3,771,667. A small monthly amount and one row per year.
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?", 1,391,731 (5.91x). A small monthly amount and a verdict to wait for (P2).
- H45, @investment_timeline: "POV: You invested in Monster instead of paying $3/day for a Monster Energy", 1.5M (140.6x). "You" and a small habit, in the losing seat.
- H84, Master Money: "Four dead simple ways to figure out what you actually make!", whose frame-1 caption reads "TAKE YOUR SALARY", 3,000,000 (140x). The viewer runs their own number (R3). The single empty slot follows the hook bank's rewrite 4.1B ("= $___ each").
- H49, The Debt Freedom Project: "Yes, daily payments work!", 382,100 (289.1x). A tiny dollar verdict ($2.98) still breaks out when it is clear.

**Beat sheet** (what the clean-sheet kit renders)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page title (3 lines, "$100 a month" on the yellow highlighter, "A big bank adds: ?"), the 2-line footer, the stake line, You and Leo with three-line plans, row "Start: $0.00 / $0.00", empty rows Years 1-5. The caption band shows the whole first line in grey and lights it word by word | "Year 1 at a big bank: about 5 cents." (0.0-3.45) |
| 1.0 | **Year 1** lands, the first payoff: the sand cursor band swipes the row and both values type in, ≈ $0.05 / ≈ $21.84. Pop | |
| 2.3 | Mark: You's ≈ $0.05 takes a coral box (`lookOpts.marks`). Pop | (…about 5 cents.) |
| 3.9 | Mark: Leo's ≈ $21.84 takes a green box; You's coral rests at 42%. Pop | "High-yield: about $22." (3.7-6.0) |
| 5.0 | Year 2: ≈ $0.23 / ≈ $92.56 | |
| 6.8 | Year 3: ≈ $0.53 / ≈ $214.11 | "Year 3: about 53 cents." (6.3-8.6) |
| 8.2 | Year 4: ≈ $0.94 / ≈ $388.52 | |
| 9.5 | **Year 5**, the ledger's total line (rule above, larger figures): ≈ $1.48 / ≈ $617.90. Ding | "Year 5: about $1.48." (8.9-11.95) |
| 10.0 | Mark: You's ≈ $1.48, the header's "?", takes a coral box. Pop | (…about $1.48.) |
| 12.2 | Winner beat (`lookOpts.winnerT` 12.2): Leo's ≈ $617.90 takes the blue box and his name the blue highlighter; You's ≈ $1.48 rests. Ding | "High-yield: about $618." (12.2-14.85) |
| 15.2 | Verdict "$6,000 saved, 5 years: / ≈ $1.48 vs **≈ $617.90**" (≈ $1.48 on coral, ≈ $617.90 on blue, in column order, the same colours as the two cells; render-checked on 2 lines). Reveal | "Same $6,000. Different account." (15.2-17.5) |
| 17.5-19.1 | Hold, then the values clear to the frame-1 state (loop) | |

**Full guide VO** (about 42 spoken words, 2.6-2.7 words a second)

> Year 1 at a big bank: about 5 cents. High-yield: about $22. Year 3: about 53 cents. Year 5: about $1.48. High-yield: about $618. Same $6,000. Different account.

**The maths**

- **Basis:** $100 is deposited at the end of each month for 60 months. Each account compounds monthly at the APY's monthly equivalent, q = (1 + APY)^(1/12) − 1, so 12 months of compounding give exactly the APY. Interest is left in, and nothing is withdrawn.
- **Formula:** interest after n deposits = 100 × ((1 + q)^n − 1) ÷ q − 100n.
- **Monthly rates:** big bank q = 1.0001^(1/12) − 1 = 0.0000083330; high-yield q = 1.04^(1/12) − 1 = 0.0032737.

| On screen | n | Big bank, exact | Shown | High-yield, exact | Shown |
|---|---:|---:|---|---:|---|
| Start | 0 | 0 | $0.00 | 0 | $0.00 |
| Year 1 | 12 | 0.05499 | ≈ $0.05 (VO: about 5 cents) | 21.8442 | ≈ $21.84 (VO: about $22) |
| Year 2 | 24 | 0.23000 | ≈ $0.23 | 92.5622 | ≈ $92.56 |
| Year 3 | 36 | 0.52503 | ≈ $0.53 (VO: about 53 cents) | 214.1089 | ≈ $214.11 |
| Year 4 | 48 | 0.94008 | ≈ $0.94 | 388.5175 | ≈ $388.52 |
| Year 5 | 60 | 1.47517 | ≈ $1.48 (VO: about $1.48) | 617.9024 | ≈ $617.90 (VO: about $618) |
| Deposits ("5 years = $6,000") | | 60 × $100 = 6,000 | $6,000 | | |
| Verdict | | 1.47517 | ≈ $1.48 | 617.9024 | ≈ $617.90 |

- **Rounding edges:** Year 1 at the big bank is 5.4999 cents, so ≈ $0.05 (just under the half cent); Year 3 is 52.503 cents, so ≈ $0.53. The checker asserts both.
- **Extras for the write-up and comments (all asserted by the checker):**
  - ≈ $617.90 ÷ ≈ $1.48 → 617.9024 ÷ 1.47517 = ≈ 419×. Kept off screen and out of the caption.
  - $200 a month doubles both columns exactly (≈ $2.95 and ≈ $1,235.80), because the interest is linear in the deposit.
  - The FDIC national average of 0.37% on the same deposits: ≈ $55 (54.81), under a tenth of 4.00%'s ≈ $617.90 (pinned comment).
  - Chase's 0.02% relationship rate: ≈ $2.95.
  - At 0.15% (a Wells Fargo figure from one search summary, unverified): ≈ $22.16, under 4% of Leo's.
  - Deposits at the start of each month instead: ≈ $1.53 vs ≈ $639.57. The footer states month-end.

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

**Assumptions (in the footer and caption):**
- $100 deposited at each month-end for 60 months, $6,000 in all;
- both APYs hold for 5 years (they will move), applied as their monthly equivalents;
- interest is left in, and nothing is withdrawn;
- 0.01% is Chase Savings' standard APY on its Oct 2, 2026 rate sheet (unchanged from Sep 11);
- 4.00% is a round high-yield rate below every named top offer (4.01-4.15%) and every "up to" headline (4.21-4.50%);
- no taxes, no fees (Chase Savings' $5 monthly fee is waivable and is ignored here).

**Caption**
> $100 a month for 5 years = $6,000 saved. What does a big bank add?
> At 0.01% APY (Chase Savings' standard rate on its Oct 2, 2026 rate sheet): ≈ $1.48. At 4.00% APY: ≈ $617.90. Save $200 a month? Double both. Deposits at each month-end, both rates held for 5 years; rates move. Top high-yield offers in late Sep/early Oct 2026 ran about 4.15-4.50%. Educational maths, not advice.
> #savings #highyieldsavings #personalfinance #moneymath

**Pinned comment**
> Not at Chase? The FDIC's national average is 0.37% APY (Sep 2026): ≈ $55 on the same $100 a month over 5 years, still under a tenth of 4.00%'s ≈ $618. What does yours pay?

**Per-platform notes**
- **YouTube Shorts:** title above. "$100 a month", "big bank" and "high-yield" are the search words. The title asks the header's question without the answer.
- **Instagram Reels:** cover on frame 1 (the "?" and both plans, cells empty), not the finished ledger, which answers the question. It is a natural save-and-share for anyone with a branch-bank savings account.
- **TikTok:** expect "my bank pays more" and "it's only 5 years" comments. The pinned comment answers the first with the FDIC average and asks for rates, which is the duel's "pick a side" in comment form.
- **Look note:** the Clean Sheet direction is "parked" in `03-look-directions.md` (its step-by-step pages underperformed). Its core rule is that the working stays visible. Here the working is the plans (rate and deposit for each column) and the header's own sum ("5 years = $6,000"). The kit shows the stake line only because `lookOpts.stake` is "show".
- **Known weakness (open):** the Clean Sheet caption shows the whole first VO line in grey from frame 1, so "about 5 cents" for year 1 is readable before the viewer has made a guess. Judge 1 docked the hook for it. Fixing it means a kit change (hide unspoken words) or a first line without a number; neither was scored.

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

### Hook pass 2 (2026-10-08)

The owner rejected round 1 partly because "hooks are weak". In round 2 the hook bank ([`02-hook-bank.md`](../../research/v2/02-hook-bank.md): 91 benchmark hooks, P1-P9, R1-R12, and §4 on why the old hooks were weak) was the yardstick. Two judges scored the current 07c hook and five rewrites (R1, A, B, C, D) out of 10. A hook here is the header at t = 0, the first VO line, what moves in the first 1.5 s, and the platform title.

**Rule (round 2):**
- Average the two judges' scores for each option.
- An option that either judge marks dishonest is out.
- Adopt the best option if its average is **at least 1.0 above the current hook**, even below 7.5. Otherwise keep the current hook; a clearly better title may still be taken.

| Option | Judge 1 | Judge 2 | Average | vs current | Decision |
|---|---:|---:|---:|---:|---|
| current: "2 people save **$10,000** / Big bank vs high-yield / Interest after 5 years?" | 5 | 5 | 5.00 | | replaced |
| R1: "Same **$10,000** / 1 month at high-yield / = ? years at a big bank" (pass 1's D with the footer fixed to "today's rates, held"; verdict "1 month = ≈ 33 years") | 7.5 | 7 | 7.25 | +2.25 | tied, not taken |
| A: "Your **$10,000** / Chase vs high-yield: / who pays you $1 first?" | 5.5 (dishonest) | 6 | out | | out (judge 1: honesty) |
| B: "Same **$10,000** / 30 years at a big bank / or 1 month at high-yield?" | 7 | 7.5 | 7.25 | +2.25 | tied, not taken |
| **C: "You save $100 a month / 5 years = $6,000 / A big bank adds: ?"** | 7.5 | 7 | **7.25** | **+2.25** | **adopted** |
| D: "Same **$10,000** / All of it at Chase, / or just $25 at high-yield?" | 6 | 6.5 | 6.25 | +1.25 | under the tie |

**Why A is out.** Judge 1 marked it dishonest. Its caption said "The race is the same for any balance", but the hook is a fixed $1 finish line, and how fast each account reaches $1 depends on the balance. I recomputed the judge's figures. On $1,000, high-yield takes 9.3 days and Chase 10.0 years. On $2,000, high-yield takes 4.7 days. Only A's verdict ("a day at high-yield beats a year at Chase") holds for every balance. Both judges also found that A's header question, "who pays you $1 first?", is answered on frame 1: the plans show 0.01% vs 4.00%, and the vo0 caption reads "Day 1: high-yield passes $1."

**Why C won a three-way tie.** R1, B and C all averaged 7.25. Each judge gave each of them 7 or 7.5 (R1 and C got 7.5 and 7; B got 7 and 7.5), so the scores alone cannot separate them. The tie-break is the owner's own list of the hook rules that matter most:

| Rule that matters most | R1 | B | C |
|---|---|---|---|
| A number the viewer owns (or a row for every viewer) at 0.0 s | no: a $10,000 that belongs to no one, and the screen never says the result holds for any balance (judge 1) | no: two strangers' $10,000 | **yes**: $100 a month and a "You" column |
| One input, never the result | yes | yes | partial: $6,000 is a second dollar figure (a sum, not the result) |
| Small, round, familiar inputs | yes | yes | yes |
| Implies a wrong answer the viewer already holds | yes, the strongest ("a year or two") | yes, but the trick-question form signals the twist (judge 1) | yes, but "big banks pay almost nothing" is a familiar fact (both judges) |
| Stake: you + amount + horizon | no "you" | no "you" | **yes, all three** |
| A countable open loop | one blank, but the rows stop at Year 5 and never reach 33 (judge 2) | 6 rows climbing to a close finish | one blank that is Year 5's own cell, plus 5 rows |
| First payoff by about 3 s | 1.0 s | 1.0 s | 1.0 s |
| ≤ 15 words on screen | 13 | 13 | 14 |

- **C is the only option that meets both stake rules.** It has a number the viewer owns, and the stake is complete (you + $100 a month + 5 years). Both judges named that as the gap in R1 and B ("no 'you' (R6)"), and pass 1 named it as the route up: judge 1 called "you" plus a named bank "the route to an 8". Judge 1 called C "the only candidate with a number the viewer actually owns"; judge 2 called its stake "the strongest of any option".
- **C's ledger builds to its own answer.** The "?" is filled by the Year 5 row, while R1's 33-year answer appears only on the verdict card. Judge 2 raised that in both passes. R1 is also unchanged from pass 1 apart from the footer, and it scored the same 7.25.
- **C's verdict is lopsided (≈ $1.48 vs ≈ $617.90).** B's is a close finish (≈ $30.04 vs ≈ $32.74), and B's "Leo at 0% after month 1" is a contrivance judge 2 expects commenters to attack.
- **What C gives up:**
  - It plays more like a P2 single-number guess inside a P4 duel, because the header names only one side (judge 2).
  - "Big bank" is unnamed in the header (R7).
  - The $6,000 is a second dollar figure (R2, read strictly).
  - Its wrong belief is a familiar one.
  - Judge 1's main deduction, the frame-1 caption, is under "Open" below.

**Maths re-checked.** Both judges recomputed C with month-end deposits and q = (1 + APY)^(1/12) − 1, and so did I:
- big bank $0.05499, $0.23000, $0.52503, $0.94008 and $1.47517 over years 1-5;
- high-yield $21.84, $92.56, $214.11, $388.52 and $617.90;
- deposits $6,000 exactly;
- "double both" for $200 a month is exact, because the interest is linear in the deposit.

The two half-cent edges (5.4999 cents → ≈ $0.05, and 52.503 cents → ≈ $0.53) round correctly, and the checker asserts both. For the other options I re-ran R1's equivalence (ln(1.0032737) ÷ ln(1.0001) = 32.69 years) and A's balance figures (above).

**What I applied:**

| # | Change | Notes |
|---|---|---|
| HP2-1 | **Hook as scored.**<br>- Header "You save **$100 a month** / 5 years = $6,000 / A big bank adds: ?" (14 words, 3 lines).<br>- Title "You Save $100 a Month for 5 Years. How Much Does a Big Bank Add?".<br>- VO line 0 "Year 1 at a big bank: about 5 cents.".<br>- Footer "ASSUMES $100 at each month-end, rates held 5 years · 0.01% = Chase Savings APY".<br>- Stake line "Interest earned so far · $100 a month each" with `lookOpts.stake: "show"`.<br>- People: You ("Big bank · 0.01% APY · $100 a month") vs Leo ("High-yield · 4.00% APY · $100 a month").<br>- The Start row ($0.00 / $0.00) is filled at frame 1; Year 1 lands at 1.0 s. | Same as the scratch spec the judges scored, apart from HP2-3. |
| HP2-2 | **Body as scored.**<br>- Rows (interest so far, to the cent): Year 2 at 5.0 s, Year 3 at 6.8 s, Year 4 at 8.2 s, Year 5 at 9.5 s (tone `goal`).<br>- VO lines 1-5 at 3.7, 6.3, 8.9, 12.2 and 15.2 s.<br>- Verdict "$6,000 saved, 5 years: / __≈ $1.48__ vs **≈ $617.90**" at 15.2 s.<br>- sfx: pop at 1.0 s, ding at 9.5 s.<br>- Winner: Leo. | The old Day 1 / Month 1 rows and the "× 1.0001 / × 1.04 a year" plan lines are gone with the lump sum. |
| HP2-3 | **Adapted: VO slot lengths.**<br>- 3.5 / 2.4 / 2.4 / 3.1 / 2.8 / 2.5 s became 3.45 / 2.3 / 2.3 / 3.05 / 2.65 / 2.3 s, so every line runs at 2.6-2.7 spoken words a second (the brief's 2.6-2.8). In the scratch spec they ran at 2.4-2.6.<br>- Start times are unchanged. The last line ends at 17.5 s, so with the 1.6 s hold the duration is 19.1 s (was 19.3).<br>- The Year 1 beat is keyed to the spoken "Year 1" (estimated 0.38 s against the row at 1.0 s), not to "big". | Every beat is still within 0.9 s of its word: Year 1 at 1.0 s vs 0.38 s, Year 3 at 6.8 s vs 6.68 s, Year 5 at 9.5 s vs 9.28 s. |
| HP2-4 | **Caption and pinned comment.**<br>- Caption: the scored text, with the question moved up to line 1 and no number in it (R11): "$100 a month for 5 years = $6,000 saved. What does a big bank add?". Line 2 gives ≈ $1.48 vs ≈ $617.90, the Chase sheet date, "double both" and the high-yield range.<br>- Pinned comment: rewritten for monthly deposits. "Not at Chase? The FDIC's national average is 0.37% APY (Sep 2026): ≈ $55 on the same $100 a month over 5 years, still under a tenth of 4.00%'s ≈ $618." | FDIC case 54.81 → ≈ $55; 54.81 ÷ 617.90 = 0.089. |
| HP2-5 | **Checker** (`checks/07-ledger-duel.py`).<br>- New 07c model: interest after n month-end deposits = 100 × ((1 + q)^n − 1) ÷ q − 100n.<br>- New expectations for the header, footer, stake, plans, verdict, the six row labels and cells, and the six VO lines (with "about" on rounded numbers only).<br>- Beats: Year 1 / "1", Year 3 / "3", Year 5 / "5".<br>- New claims: $6,000 = 60 × $100; the monthly rate compounds to the APY; 5 cents and 53 cents; under $2 at the big bank; $200 a month doubles both; ≈ 419×; the FDIC ≈ $55 is under a tenth of 4.00%; Wells ≈ $22.16; Chase 0.02% ≈ $2.95; deposits at month-start ≈ $1.53 / ≈ $639.57. | The lump-sum claims ($1 a year, ≈ 433×, $37 a year, ≈ $75 at 0.15%) were removed with the lump-sum body. 406 → 407 checks. |
| HP2-6 | **Kept as scored, though a judge flagged it.**<br>- VO line 0 still carries "about 5 cents". The Clean Sheet caption shows the whole line in grey from frame 1, so the scale of the answer is readable before the viewer guesses (judge 1).<br>- The header still says "big bank", not "Chase" (R7). | Changing either would ship a hook the judges did not score. Both are listed as open below. |
| HP2-7 | **`teasers.json`:** the 07c entry now has the new title, header, runtime 19.1 s, key numbers and hook score 7.25 (the judges' average); the format's check line says 407 checks. | |

**Verification:**
- **Maths check:** `python3 teasers/v2/checks/07-ledger-duel.py` gives **407 checks, 0 failures**, ALL OK, exit 0.
- **Mutation test:** I ran the checker against scratch copies of all three specs, with four corruptions to the new 07c: Year 3 "≈ $0.52", VO "about 6 cents", the Year 5 row moved to 10.5 s, and the verdict's "≈" dropped from $617.90. It reported 5 named failures and exit 1. The real specs were never touched.
- **Studio linter:** `node src/cli.mjs check specs/07c-clean-sheet-savings-rate.json` gives 0 errors and 0 warnings (19.1 s), at the default step and at every frame (`--every 0.0333333`). 07a and 07b are unchanged.
- **Stills** (`node src/cli.mjs stills … --at 0,1.5,3,9.8,16.5`):
  - **0.0 s.** The 3-line header, with "$100 a month" on the yellow highlighter and "A big bank adds: ?" on line 3. The 2-line footer, then the stake line with $100 in ink. You and Leo with their 3-line plans (0.01% APY / $100 a month; 4.00% APY / $100 a month). The Start row $0.00 / $0.00 in the sand band, and Years 1-5 labelled in grey with empty cells. The caption shows "Year 1 at a big bank: about 5 cents." with "Year" lit. The hook reads in frame 1.
  - **1.5 s.** Year 1 is filled in the sand band: ≈ $0.05 / ≈ $21.84. The caption is lit through "bank:".
  - **3.0 s.** The same rows, with the caption fully lit.
  - **9.8 s.** All five years are filled. Year 5, the total line, reads ≈ $1.48 / ≈ $617.90 in larger figures.
  - **16.5 s.** Leo's name is on the blue highlighter and his ≈ $617.90 in the blue box. The verdict sits on 2 lines: "$6,000 saved, 5 years:" over "≈ $1.48" on coral vs "≈ $617.90" on blue.

**Open:**
- **The frame-1 caption leak.** "About 5 cents" is readable before the guess. A kit option that hides unspoken caption words, or a first VO line without a number (for example "Year 1 at a big bank:" with the figure moved to line 2), would fix it. Either needs rescoring.
- **R7.** Putting "Chase" in the header (pass 1's A lever) would name the bank, but it moves the [click-check] rate into the most-read line. Not scored with this body.
- **Click-check.** The posting-day [click-check] of Chase's Oct 2, 2026 rate sheet stands, as before.

**Score after:** 7.25 (the judges' average for C), up from 5.00.

### Assembly pass (2026-10-08)

The round-2 assembly fitted 07a and 07c into their kits, checked every beat against its VO line in stills, and rendered both. 07b (Becker rig) was not part of this pass. Numbers did not change; on-screen wording changed in three places (below), and the checker follows them.

| # | Teaser | Found in the stills | What I did |
|---|---|---|---|
| A1 | 07a | **No captions at all, verdict typed into the formula bar.** The live-sheet ledger could not end above the caption band: the formula bar was two lines tall (for the 52-character "Ava's ≈ $34,617, untouched: / × ≈ 8.12 ≈ $281,000 at 65") and each plan wrapped to three lines ("puts in $24,000" is 307 px in a 294 px column). The kit then gives up the band, so the VO never showed as captions and the verdict was a small line in the bar. | **Fixed in the spec.** Plans "Age 25 → 35 · put in $24,000" / "Age 35 → 65 · put in $72,000" (2 lines each). Formula bar step 3 is now one line, "Ava's ≈ $34,617 grows × ≈ 8.12", typed as the Age 65 cell counts up to the product (≈ $281,000), so the bar is one line throughout. The sheet now ends above the band (51 px rows, cell text 40 px+), captions run for all six VO lines and the verdict is a card in the caption band at 22.4 s. The shown factors still multiply to the cell: 34,617 × 8.12 = 281,090.04 → ≈ $281,000 (checker claim kept). |
| A2 | 07a | Caption split "BEN PUTS IN 3" / "TIMES AS MUCH" (the chunker will not end a chunk on "in", so it split the number from "times"). | **VO line 3 is now "Ben invests 3 times as much."** (6 spoken words, 2.7 s slot still fits): captions "BEN INVESTS" / "3 TIMES AS MUCH". Full guide VO updated. |
| A3 | 07a | 15.0-22.4 s: the finished ledger sat still for 7.4 s while the VO read both finals. | **New kit beat, `lookOpts.marks`** (live-sheet `formats/ledger-duel.js`, opt-in): the selection springs onto one landed value at t and it flashes, with a pop. Marks at **16.0 s** (Ava's ≈ $281,000, VO "…about $281,000") and **19.6 s** (Ben's ≈ $244,000, VO "Ben has about $244,000"); the winner's column takes over at 22.4 s. |
| A4 | 07a | Spec sfx pop 6.0, roll 14.2 and ding 22.4 each doubled a cue the kit already makes at the same instant; the mixer normalises to the peak, so the doubles made every other cue quieter. | **Removed the three spec cues** (the kit still plays all three). |
| A5 | 07c | 1.5-5.0 s and 10.0-15.2 s: the ledger sat still while VO lines 1, 3 and 4 named single cells. | **New kit beat, `lookOpts.marks`** (clean-sheet `formats/ledger-duel.js`, opt-in): a landed value's own highlighter swipes in, in its tone, and rests at 42% when the next mark or the winner lands. Marks: **2.3 s** You's ≈ $0.05 (coral, "about 5 cents"), **3.9 s** Leo's ≈ $21.84 (green, "High-yield: about $22"), **10.0 s** You's ≈ $1.48 (coral, the header's "?", "about $1.48"). **`lookOpts.winnerT` 12.2**: Leo's ≈ $617.90 takes the blue box on "High-yield: about $618" instead of waiting for the verdict. The verdict at 15.2 s repeats the two cells' colours (coral ≈ $1.48 vs blue ≈ $617.90). |
| A6 | both | (checker) | **New assertion:** every mark (and 07c's `winnerT`) lands after its row, inside a VO line that names the marked cell's value (as shown, to the dollar, or in cents). With A4's three spec cues gone (and their three "sfx on a beat" checks), 407 → **410 checks, 0 failures**. Mutation test on scratch copies: a mark moved to Leo's Year 5 during "about $1.48", a mark before its row, a mark at 23.0 s and the old "× ≈ 8.1" factor gave 4 named failures and exit 1. |

**Verification:**
- **Maths check:** 410 checks, 0 failures, exit 0. An independent recomputation matches every cell, the verdict gap (36,974.28 → ≈ $37,000) and the bar product.
- **Linter:** 07a and 07c 0 errors, 0 warnings at every frame (`--every 0.0333333`). The kits' own ledger samples and live-sheet stress specs (6 files) stay clean; neither uses `marks`.
- **Purity:** seek(t) gives the same DOM reached directly or from another time, for both specs (format layer). The clean-sheet chrome's hidden caption lines keep stale `said` classes and inline opacity when `display: none` (also with the pre-assembly spec); nothing visible changes.
- **Stills / contact sheets** at the times listed under the linter paragraph above: header and numbers legible at 0.0 s; each row and mark on its VO word; no overlaps; the verdict card is the last and largest beat; footer on every frame.
- **Renders:** `studio/out/07a-live-sheet-start-at-25.mp4` (27.7 s, 1080×1920, 30 fps, h264 + aac) and `studio/out/07c-clean-sheet-savings-rate.mp4` (19.1 s). Frames pulled from each MP4 at 0, 16.2, 24 s (07a) and 0, 4.4, 16 s (07c) match the stills (mean pixel difference ≈ 2/255, compression only).

**Still open:**
- 07c's frame-1 caption leak ("about 5 cents" readable in grey before it is spoken) is the Clean Sheet chrome's design (the whole line shows while it is spoken); unchanged.
- `lookOpts.marks` is documented in both format files' header comments, not yet in the kits' READMEs (other agents own those files).
- `teasers.json` still quotes 407 checks for this format.
- 07b is unchanged by this pass.
