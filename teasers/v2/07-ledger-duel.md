# Format 7: "2 people invest" ledger duel, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07
**Format:** `ledger-duel`, hook pattern **P4** ("same money, two choices")
**Lane:** two people, the same money, two choices, a year-by-year ledger
**Files:**
- Specs:
  - [`studio/specs/07a-live-sheet-start-at-25.json`](../../studio/specs/07a-live-sheet-start-at-25.json)
  - [`studio/specs/07b-becker-rig-panic-sell-2008.json`](../../studio/specs/07b-becker-rig-panic-sell-2008.json)
  - [`studio/specs/07c-clean-sheet-savings-rate.json`](../../studio/specs/07c-clean-sheet-savings-rate.json)
- Check: [`teasers/v2/checks/07-ledger-duel.py`](checks/07-ledger-duel.py). Run `python3 teasers/v2/checks/07-ledger-duel.py`. It reports **415 checks, 0 failures** and exits 0. A deliberately corrupted cell and VO number made it exit 1.

**How the facts were checked:**
- I ran 11 web searches out of the 14 allowed.
- The egress proxy blocked every attempt to open a page (Slickcharts, NYU Stern, the Motley Fool, the q4cdn PDF, FRED, and curl to FRED and NYU Stern). So each real-world figure below comes from a **search result**: the publisher's page title, URL and date, plus the search engine's reading of the page.
- Before posting, someone should open the four pages that carry the most weight and confirm them by hand. They are marked **[click-check]** in the sources.
- 07a needs no real-world data. Its 7% is a stated assumption.

**Studio linter:** `node src/cli.mjs check` passes on all three specs (**3/3 clean, 0 errors**). The one warning is in 07b: the Becker kit sets its footer at 37.9 px, below the 40 px recommendation, whatever the footer length. When I linted, each kit's `formats/ledger-duel.js` still drew a "TODO ledger-duel" placeholder. So the lint covers the header, footer, verdict and captions only, not the ledger itself. Re-run it once the duel bodies land. The extra `lookOpts` are proposals, and a kit must render without them.

---

## (a) The format in 5 lines

1. **Mechanic** ([`04-formats.md`](../../research/v2/04-formats.md), rank 7):
   - Two named people start with the same stake.
   - A ledger of "YYYY: $NN,NNN" rows fills both columns at once, about one row a second.
   - A crash or turning row lands mid-way.
   - It ends on the finished table and loops.
2. **Evidence:** Jake (@jacobdoesmoney) has 3 of 3 duels at 5.7-6.6x his median. The 3 series reels hold 70% of the account's 12-reel plays.
   - QQQ vs TQQQ: 322,339 (6.6x med; 136 comments), https://www.instagram.com/reel/DdUZ5K1gGlc/
   - VOO vs SOXL: 301,112 (6.17x; 1.8K likes), https://www.instagram.com/reel/Dc6u8k2lIBX/
   - QQQ vs SPY: 276,471 (5.66x; 23 comments), https://www.instagram.com/reel/DdFHnhtCeLw/
3. **The P4 pattern elsewhere in the benchmark:**
   - ChartOrbit, "What If You Invested $5,000 in NETFLIX and DISNEY?": 15,876,376 (100.45x), https://www.youtube.com/shorts/KmtLGAPIutg
   - ChartOrbit, "…USA and EUROPE?", with its "Financial Crisis" band: 2,808,307 (345.09x), https://www.youtube.com/shorts/VwfZNjxu6fU
   - HD Guy, "Which is cheaper? 1 Missile or 75 Rounds/Second": 11,957,600 (3.81x), https://www.youtube.com/shorts/TIRAehb_9sc
   - The Market Hustle, "How Long It Took To Recover After the Worst Crashes": 190,187 (4.5x med), https://www.instagram.com/reel/DduW3hgShyh/
4. **What wins inside the format:**
   - a risk twist or reversal: the two leverage duels drew 136 and 44 comments, against 23 for the plain index duel;
   - a lopsided ending;
   - a crash row at 0:06-0:07.

   **What we add:**
   - one set of final numbers, the same on screen, in the VO and in the caption (Jake's screen and caption finals differ on all three duels);
   - a faceless winner cue: the winner's column is highlighted at the verdict, and in 07b the rig's poses do it.
5. **Pitfalls:**
   - n = 3, all from one near-miss account, all in September 2026.
   - Jake's duels are silent and 11 s long. With a voice-over ours run 25.0-28.5 s, inside the 12-30 s lane set for this format. The rows still land about a second apart, and a music-only 12-14 s cut is worth testing.
   - The lecture version of the panic-sell idea flopped. Master Money's "MISSING THE BEST 10 DAYS CAN DESTROY YOUR RETURNS" got 2,916 (0.3x med), https://www.instagram.com/reel/DeKyDoNxKhx/. That is why 07b is a duel, not a warning.

### Decisions shared by all three

- **The "2 people" have names** (Ava/Ben, Alex/Sam, Mia/Leo), so comments can take sides. Jake used tickers; we have no person on camera, so names do the work his costumes did.
- **Rounding:**
  - every rounded result shows "≈" on screen and "about" in the VO;
  - exact values carry neither;
  - each ledger keeps one precision: 07a to the nearest $1,000, 07b to the nearest $100, 07c to the dollar (to the cent for month 1).

  The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume about 2.6 spoken words a second, with digits expanded the way they would be read ("$69,600" = 6 words).
- **No advice language.** Each teaser is a worked comparison of two choices, and every caption says so.

---

## 07a: Live Sheet: "2 people invest $200 a month. Who has more at 65?"

| | |
|---|---|
| Look | `live-sheet` (yellow banner, formula bar, a ledger sheet on black) |
| Spec | `studio/specs/07a-live-sheet-start-at-25.json` (27.5 s) |
| Platform title | **2 People Invest $200 a Month. One Stops at 35. Who Has More at 65?** |
| On-screen hook (header) | **2 people invest $200 a month / Who has more at 65?** (11 words) |
| Columns at 0.0 s | **Ava**: "Age 25 → 35 · puts in $24,000"; **Ben**: "Age 35 → 65 · puts in $72,000" |
| Footer | ASSUMES 7% a year, compounded monthly · not a forecast |

**Topic change from the seed, and why**
- The seed was "one starts at 25, one at 35". In that version Ava invests for 40 years and puts in more money, so the answer to "who wins" is obvious before frame 2. The only open question left is "by how much": no wrong belief to bust (R5) and no surprise verdict (R12).
- I kept the lane exactly: $200 a month, ages 25 and 35, 7%, to 65. I added the benchmark's winning twist, a reversal of the expected winner. Jake's duels with a twist drew 136 and 44 comments, against 23 for the plain one.
- Now Ava starts at 25 and **stops at 35**, and Ben starts at 35 and never stops. Ben puts in 3× the money, yet Ava still finishes ahead.
- The seed's own answer becomes the pinned comment: had Ava never stopped, she would have ≈ $525,000.

**Wrong belief it exploits:** "Whoever puts in more money ends up with more." It is on screen at 0.0 s ($24,000 vs $72,000), so most viewers pick Ben in second 1.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$200", "65", "$24,000" and "$72,000" are on screen at 0.0 s |
| R2 | One dollar input in the hook line ($200 a month) and no result |
| R3 | Every viewer has an age. The rows are ages, so viewers place themselves on the ledger |
| R4 | $200 a month is small, round and familiar |
| R5 | The 3× deposit gap is printed above the columns, and the result reverses it |
| R6 | Two people, $200 a month, until 65 |
| R7 | Options named: Ava 25 → 35, Ben 35 → 65 |
| R8 | 11 words, 2 lines |
| R9 | 8 age rows are visible with empty cells, a countable loop |
| R10 | First row (Age 30: ≈ $14,000) at 3.4 s; biggest numbers on the last row |
| R11 | The question is on screen ("Who has more at 65?"); the caption opens with the verdict |
| R12 | A repeatable verdict: "a third of the money, still wins by ≈ $37,000" |

**Benchmark hooks it is modelled on**
- H78, Jake: "2 people invest $10,000 / 10 years ago", 322,339 (6.6x med). This is the grammar: "2 people invest $X" plus a horizon, two named columns, a ledger.
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?", 1,391,731 (5.91x). A small monthly amount, plus a question that waits for a verdict.
- H64, Gage: "What $1 costs you by age", 1,150,974 (210x med). Ages as the rows, so each viewer finds their own.

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Banner "2 people invest **$200 a month** / Who has more at 65?". Formula bar "= $200 every month, growing 7% a year". Ava and Ben column heads with their plans. Rows Age 30 … Age 65 labelled, cells empty. Footer on | "Two people invest $200 a month." (0.0-3.1) |
| 3.4 | Row **Age 30**: ≈ $14,000 / $0. This is the first payoff | "Ava invests from 25 to 35, then stops." (3.3-7.2) |
| 6.8 | Row **Age 35**: ≈ $35,000 / $0, tag "Ava stops · Ben starts". Formula bar "Ava: $200 × 120 months = $24,000 in". Pop | (…then stops.) |
| 7.4 | Formula bar "Ben: $200 × 360 months = $72,000 in" | "Ben starts at 35 and never stops." (7.4-10.5) |
| 8.4, 9.4 | Rows 40 and 45: ≈ $49,000 / ≈ $14,000; ≈ $70,000 / ≈ $35,000 | |
| 10.9, 11.8, 12.7 | Rows 50, 55, 60: ≈ $99,000 / ≈ $63,000; ≈ $140,000 / ≈ $104,000; ≈ $198,000 / ≈ $162,000 | "Ben puts in 3 times as much." (10.7-13.4) |
| 14.0 | Row **Age 65** counts up over 0.8 s: **≈ $281,000 / ≈ $244,000**. Formula bar "Ava's ≈ $35,000 at 35, untouched: × ≈ 8.1 by 65". Roll | "At 65, Ava has about $281,000." (13.6-18.3) |
| 18.5 | Ben's final cell pulses | "Ben has about $244,000." (18.5-22.0) |
| 22.2 | Verdict "**Ava** wins by ≈ $37,000 / with a third of the money". Ava's column is highlighted. Ding | "A third of the money, and Ava still wins." (22.2-25.7) |
| 25.7-27.5 | The finished sheet holds, then clears to the frame-1 state, which makes the loop | |

**Full guide VO** (about 63 spoken words)

> Two people invest $200 a month. Ava invests from 25 to 35, then stops. Ben starts at 35 and never stops. Ben puts in 3 times as much. At 65, Ava has about $281,000. Ben has about $244,000. A third of the money, and Ava still wins.

**The maths**

- **Basis:** $200 deposited at each month-end, at 7%/12 a month, compounded monthly.
- **Formula:** for n months of deposits, B(n) = 200 × ((1 + 0.07/12)^n − 1) ÷ (0.07/12).
  - Ava at age a = B(min(m, 120)) × (1 + 0.07/12)^(m − 120 if m > 120), where m = 12 × (a − 25).
  - Ben at age a = B(12 × (a − 35)).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Ava's deposits | $200 × 120 | 24,000 | $24,000 |
| Ben's deposits | $200 × 360 | 72,000 | $72,000 |
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
| "× ≈ 8.1" | g^360 = (1 + 0.07/12)^360 | 8.1165 | ≈ 8.1 |
| Pinned: Ava never stops | B(480) | 524,962.68 | ≈ $525,000 |

In the table, g = 1 + 0.07/12.

- **Cross-checks:**
  - Ava is ahead at every row, so Ben never catches up. The gap holds at about $35,000-37,000 from age 35 on.
  - B(360) and B(480) equal the verified figures in `research/v2/watch/alan-becker.md` §6, idea 4 ($243,994 and $524,963).

**Sources:** none. There is no real-world input. The 7% is an assumption, labelled on screen as "not a forecast".
**Assumptions (in the footer):** 7% a year, compounded monthly, deposits at month-end, no fees, no taxes, no inflation adjustment, and the rate is not a forecast.

**Caption (IG/TikTok; also the YouTube description)**
> Ava wins with a third of the money. Ava put in $24,000 (age 25 to 35, then stopped). Ben put in $72,000 (age 35 to 65). At 65: Ava ≈ $281,000, Ben ≈ $244,000.
> Maths: $200 a month at an assumed 7% a year, compounded monthly. A rate, not a forecast. Educational maths, not advice.
> #compoundinterest #investing #personalfinance #moneymath

**Pinned comment**
> If Ava had never stopped at 35, she'd have ≈ $525,000 at 65. What age did you start?

**Per-platform notes**
- **YouTube Shorts:** use the title above. Its question matches the banner. No keyword CTA: in the benchmark, keyword CTAs lifted comments, not views.
- **Instagram Reels:** this is Jake's home platform. Use the finished-ledger frame as the cover. In the one benchmark test, Gage's filled table beat his empty one (n = 1). The first caption line is the verdict.
- **TikTok:** the header stays on screen all the way through. The footer sits above y 1480. Put the verdict in the first 100 characters of the caption.
- **Silent cut to test:** music only, rows every 1.0 s, 13 s, verdict as the last frame.

---

## 07b: Becker Rig: "2 people invest $10,000 in 2007. One sells in the crash to stay safe."

| | |
|---|---|
| Look | `becker-rig` (a light void, one hero-colour stick figure plus one neutral figure, coin-blocks as props, impacts) |
| Spec | `studio/specs/07b-becker-rig-panic-sell-2008.json` (28.5 s) |
| Platform title | **2 People Invest $10,000 in 2007. One Sells in the Crash. How Far Apart Now?** |
| On-screen hook (header) | **2 people invest $10,000 in 2007 / One sells in the crash to stay safe** (14 words) |
| Columns at 0.0 s | **Alex**: "Holds through the crash"; **Sam**: "Sells at the end of 2008". Stake: "$10,000 each in the S&P 500 · Jan 2007". Row "Jan 2007: $10,000 / $10,000" |
| Footer | S&P 500 total return, dividends in · no fees · cash at 0% (the source, S&P DJI, and the year-end rule are in the caption) |

**Wrong belief it exploits:** "Selling in a crash keeps you safe." "To stay safe" in the hook is the one word (R5). The verdict turns it over: both took the same −37%, and selling only skipped the recovery.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$10,000", "2007" and the first ledger row "$10,000 / $10,000" are on screen at 0.0 s |
| R2 | One dollar input ($10,000) and no result |
| R3 | Anyone who was investing, or knows someone who was, in 2008 has a row; the S&P 500 is the viewer's own index fund |
| R4 | $10,000 is Jake's stake and the benchmark's round number |
| R5 | "to stay safe" names the belief the result then breaks |
| R6 | Two people, $10,000, since 2007 |
| R7 | Options named: holds vs sells at the end of 2008 |
| R8 | 14 words |
| R9 | 10 ledger rows, with the crash row in the middle |
| R10 | First new row (2007: ≈ $10,500) at 2.7 s; the crash at 5.2 s; biggest number last (2025) |
| R11 | The title asks "How far apart now?"; the caption opens with the verdict (≈ 10.5×) |
| R12 | Lopsided: ≈ $69,600 vs ≈ $6,600 |

**Benchmark hooks it is modelled on**
- H78/H79, Jake: "2 people invest $10,000 / 10 years ago", 322,339 (6.6x med) and 301,112 (6.17x). Same stake, two choices, ledger, and the 2022 crash row as the reversal (TQQQ −64.8%, SOXL −72.7%).
- H17, ChartOrbit: "POV: In 2008 You invested $5000 in [US] VS [EU]" with a "Financial Crisis" band, 2,808,307 (345.09x). A crash year as the start date.
- H71, The Market Hustle: "How Long It Took To Recover After the Worst Crashes:", "Invested Once: Before the Crash" vs "Monthly DCA", 190,187 (4.5x med). The red worst case beside the relief number, and its caption "It's about continuing to invest through a crash instead of stopping."

**Beat sheet** (the rig choreography is in `lookOpts.beats`)

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header. Two stick figures, Alex in the hero colour and Sam in neutral, each beside a coin-block. Ledger row "Jan 2007: $10,000 / $10,000". Footer | "Two people invest $10,000 in 2007." (0.0-3.9) |
| 2.7 | Row **2007**: ≈ $10,500 / ≈ $10,500. Both blocks swell slightly | (…in 2007) |
| 5.2 | **Impact:** a "−37%" weight drops on both blocks, with a white flash, a shake and a thud. Row **2008**: ≈ $6,600 / ≈ $6,600, tag "crash −37%" | "2008 takes 37%." (4.1-6.8) |
| 7.4 | Sam lifts his block and stuffs it into a mattress labelled "0%". Whoosh | "Sam sells to stay safe." (7.0-9.0) |
| 9.5 | Row 2009: ≈ $8,400 / ≈ $6,600. Alex stands his ground | "Alex holds. By 2012, he's back above $10,000." (9.2-13.5) |
| 10.4 | Row **2012**: ≈ $11,500 / ≈ $6,600, tag "back above $10,000" | |
| 11.6, 12.3, 13.0 | Rows 2016, 2019, 2021: ≈ $19,600, ≈ $30,000, ≈ $45,700 against ≈ $6,600. Alex's block grows at each row | |
| 14.5 | A smaller "≈ −18%" impact lands on Alex's block only. Row **2022**: ≈ $37,400 / ≈ $6,600, tag "dip ≈ −18%". Alex shrugs | "2022 dips. Alex holds again." (13.7-16.4) |
| 17.4 | Row **2025**: Alex's cell rolls up to **≈ $69,600** and his block towers over the stage. Roll | "End of 2025: Alex has about $69,600." (16.6-22.0) |
| 22.2 | Sam peeks out of the mattress; his block is unchanged at ≈ $6,600. Verdict "Selling didn't dodge the crash. / It dodged the **recovery**." Alex's column is highlighted. Boing | "Sam's still at about $6,600. He dodged the recovery." (22.2-27.2) |
| 27.2-28.5 | Hold, then the loop back to frame 1 | |

**Full guide VO** (about 67 spoken words)

> Two people invest $10,000 in 2007. 2008 takes 37%. Sam sells to stay safe. Alex holds. By 2012, he's back above $10,000. 2022 dips. Alex holds again. End of 2025: Alex has about $69,600. Sam's still at about $6,600. He dodged the recovery.

**The maths**

- **Basis:** year-end value V_y = $10,000 × Π (1 + TR_k) for k = 2007…y. TR is the S&P 500 total return for each calendar year (dividends reinvested).
- **Sam's path:** the same as Alex's until the 2008 year-end close. After that it is flat (cash at 0%).

| Row | TR that year | Alex, exact | Alex, shown | Sam, shown |
|---|---:|---:|---|---|
| Jan 2007 | | 10,000.00 | $10,000 | $10,000 |
| 2007 | +5.49% | 10,549.00 | ≈ $10,500 | ≈ $10,500 |
| 2008 | −37.00% | 6,645.87 | ≈ $6,600 | ≈ $6,600 (sells) |
| 2009 | +26.46% | 8,404.37 | ≈ $8,400 | ≈ $6,600 |
| 2012 | (2010 +15.06, 2011 +2.11, 2012 +16.00) | 11,453.96 | ≈ $11,500 | ≈ $6,600 |
| 2016 | (2013 +32.39, 2014 +13.69, 2015 +1.38, 2016 +11.96) | 19,568.08 | ≈ $19,600 | ≈ $6,600 |
| 2019 | (2017 +21.83, 2018 −4.38, 2019 +31.49) | 29,973.95 | ≈ $30,000 | ≈ $6,600 |
| 2021 | (2020 +18.40, 2021 +28.71) | 45,678.09 | ≈ $45,700 | ≈ $6,600 |
| 2022 | −18.11% | 37,405.79 | ≈ $37,400 | ≈ $6,600 |
| 2025 | (2023 +26.29, 2024 +25.02, 2025 +17.88) | 69,618.94 | ≈ $69,600 | ≈ $6,600 |

- **"−37%":** TR 2008 = −37.00%, so 6,645.87 ÷ 10,549.00 − 1 = −37.0%.
- **"back above $10,000":** 2012 is the first year-end at or above $10,000. 2011 ended at $9,874.10.
- **"dip ≈ −18%":** TR 2022 = −18.11%.
- **Caption figures:**
  - 69,618.94 ÷ 6,645.87 = 10.48, shown as ≈ 10.5×.
  - Alex's multiple on his $10,000 is 6.96, shown as ≈ 7.0×.
- **Pinned comment:** 6,645.87 × 1.05^17 = 15,232.5, shown as ≈ $15,200. That is under a quarter of Alex's.
- **Sensitivity (computed by the checker, not on screen):**
  - Damodaran's NYU Stern series uses its own method. For the years it returned it gives 2007 +5.48, 2008 −36.55, 2009 +25.94, 2010 +14.82, 2022 −18.04, 2023 +26.06 and 2024 +24.88. Swapping those in gives 2025 ≈ $69,500 and Sam ≈ $6,700, so the story holds within about 1-2%. On screen we use the index provider's official figures.
  - A fund charging 0.10% a year would end at ≈ $68,400.

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| S&P 500 total return, 2006-2016 (returned by a search that did **not** supply the numbers): 15.79, 5.49, −37.00, 26.46, 15.06, 2.11, 16.00, 32.39, 13.69, 1.38, 11.96 | Slickcharts, "S&P 500 Total Returns by Year Since 1926" (S&P DJI data) **[click-check]** | searched 2026-10-07 | https://www.slickcharts.com/sp500/returns |
| S&P 500 total return, 2017-2025 (also returned without supplied numbers): 21.83, −4.38, 31.49, 18.40, 28.71, −18.11, 26.29, 25.02, 17.88 | Slickcharts (above); US500.com, "S&P 500 Returns By Year"; History of Market, "S&P 500 Annual Returns by Year: Complete Table 1928–2026"; YCharts, "S&P 500 Annual Total Return" | searched 2026-10-07 | https://us500.com/tools/returns/sp500-returns-by-year · https://historyofmarket.com/articles/sp500-annual-returns-by-year · https://ycharts.com/indicators/sp_500_total_return_annual |
| 2008 = −37% (primary publisher) | S&P Dow Jones Indices, sector performance matrix (PDF); S&P Global Market Intelligence, "S&P 500 logs its worst annual performance since 2008" | searched 2026-10-07 | https://www.spglobal.com/spdji/en/documents/performance-reports/spdji-sector-performance-matrix.pdf · https://www.spglobal.com/marketintelligence/en/news-insights/latest-news-headlines/s-p-500-logs-its-worst-annual-performance-since-2008-73687583 |
| Independent cross-check (its own method, partial years) | Aswath Damodaran, NYU Stern, "Historical Returns on Stocks, Bonds and Bills" | dataset updated yearly; update date not seen | https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html |

A second search confirmed the 2007-2016 figures, but that query supplied the numbers, so I counted it only as a weak check. The search that did not supply them (row 1) is the real check.

**Assumptions (in the footer):**
- calendar-year S&P 500 total return with dividends reinvested (S&P DJI);
- year-end values;
- an index with no fees and no taxes;
- Sam sells at the 2008 year-end close (not the March 2009 low) and his cash earns 0%;
- not inflation-adjusted.

**Caption**
> Holding finished ≈ 10.5× ahead. Same $10,000, same −37% in 2008. Alex held: ≈ $69,600 by the end of 2025. Sam sold at the end of 2008 and kept cash: ≈ $6,600. Selling didn't skip the drop. It skipped the recovery.
> Data: S&P 500 total return, dividends reinvested, 2007-2025 calendar years (S&P Dow Jones Indices). Index, no fees; cash at 0%. Past returns, not a prediction. Educational maths, not advice.
> #stockmarket #investing #2008crash #moneymath

**Pinned comment**
> "Sam's cash would've earned interest." Even at 5% every single year from 2009, his ≈ $6,600 grows to ≈ $15,200. That's under a quarter of Alex's ≈ $69,600.

**Per-platform notes**
- **YouTube Shorts:** title above. The impact frame at 5.2 s is the moment to keep in the first 6 s of the YouTube feed preview.
- **Instagram Reels:** cover on the 2008 impact frame, or on the finished ledger. Test both: Jake's covers are pre-number frames.
- **TikTok:** the comment fight is "but cash earns interest" or "nobody sells at the year-end", and the pinned comment answers the first. Expect timing arguments (the March 2009 low); the footer states the year-end rule.
- **Look note:** the Becker rig is a look reference, not a benchmark (`alan-becker.md`). Its devices used here are §4 "results are transformations" (the −37% weight crushing both blocks) and §6 idea 10's "punchline, not episode" (the mattress gag). The kit must also render a plain ledger if `lookOpts.beats` is ignored.

---

## 07c: Clean Sheet: "2 people save $10,000: big bank vs high-yield"

| | |
|---|---|
| Look | `clean-sheet` (white worksheet, formula lines above highlighted results, a pointer) |
| Spec | `studio/specs/07c-clean-sheet-savings-rate.json` (25.0 s) |
| Platform title | **2 People Save $10,000: Big Bank vs High-Yield. How Far Apart in 5 Years?** |
| On-screen hook (header) | **2 people save $10,000: / big bank vs high-yield** (8 words, 2 lines; the 5-year horizon is in the footer, the badge "$10,000 → 5 YEARS?" and the first VO line, all at 0.0 s) |
| Columns at 0.0 s | **Mia**: "Big-bank savings · 0.01% APY" (formula "$10,000 × 1.0001 a year"); **Leo**: "High-yield savings · 4.00% APY" ("$10,000 × 1.04 a year"). Badge "$10,000 → 5 YEARS?". Row "Day 1: $10,000 / $10,000" |
| Footer | ASSUMES both rates hold 5 years · 0.01% = Chase Savings APY, Sep 2026 |

**Topic change from the seed, and why**
- The seed asked for "sourced average rates over recent years".
- My searches found today's verified rates (Chase 0.01%; top high-yield 4.25-4.50%) and the FDIC national average (0.37%). They found **no year-by-year high-yield average that I could confirm from two sources**: a high-yield history search returned only FDIC national averages and this month's top rates.
- Following the brief ("if a figure can't be verified, choose a topic that doesn't need it"), 07c uses **today's verified rates held for 5 years**, and the footer says so.
- **0.01%** is Chase's posted standard savings rate. **4.00%** is a round high-yield rate below every top rate found.

**Wrong belief it exploits:** "A savings account is a savings account, and my bank pays something." Month 1 pays about 8 cents, against about $33.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$10,000", "0.01%", "4.00%", "5 years" (footer and badge) and the Day 1 row are on screen at 0.0 s |
| R2 | One dollar input ($10,000) and no result |
| R3 | Anyone with savings can swap in their own balance: the interest scales linearly (×balance ÷ 10,000) |
| R4 | $10,000 of savings is round and familiar |
| R5 | "Big bank" sounds safe and normal, and the first row shows 8 cents |
| R6 | Two people, $10,000; the 5-year horizon is in the footer, the badge, the VO and the title |
| R7 | Options named: big bank vs high-yield, with both rates printed |
| R8 | 8 words |
| R9 | 7 rows visible (Day 1, Month 1, Years 1-5) |
| R10 | First payoff (Month 1: ≈ $10,000.08 vs ≈ $10,032.74) at 3.6 s; biggest last |
| R11 | The title asks "How far apart in 5 years?"; the verdict is on screen and opens the caption |
| R12 | A tiny honest verdict, "≈ $2,167 vs ≈ $5", in the spirit of Debt Freedom's "$2.98" verdict |

**Benchmark hooks it is modelled on**
- H80, Jake: "2 people invest $10,000 / 10 years ago" (QQQ vs SPY), 276,471 (5.66x med). The same stake in two places, with plain-English labels under the names.
- H49, The Debt Freedom Project: "What's the difference between daily payments and one extra lump sum payment each month?", with the caption "Yes, daily payments work!", 382,100 (289.1x). A tiny dollar difference still breaks out when it is a clear verdict.
- H07, HD Guy: "Which is cheaper? 1 Missile or 75 Rounds/Second", 11,957,600 (3.81x). Two named options, one forced pick.
- **Avoided on purpose:** FinCalC's "SIP vs RD Which is Better…", 7,665 (contrast H42). That is the generic "which is better?" form.

**Beat sheet**

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Page title, badge "$10,000 → 5 YEARS?", two columns with their APYs and formula lines, row "Day 1: $10,000 / $10,000", empty rows Month 1 and Years 1-5, footer | "Two people save $10,000 for 5 years." (0.0-3.5) |
| 3.6 | **Month 1**: ≈ $10,000.08 / ≈ $10,032.74. Tick | "Month 1. Big bank: about 8 cents." (3.6-6.3) |
| 6.5 | The pointer moves to Leo's cell, green highlighter | "High-yield: about $33." (6.5-8.9) |
| 9.9 | **Year 1**: $10,001 / $10,400. Pop | "After a year: $1 versus $400." (9.1-12.6) |
| 10.8, 11.6, 12.4 | Years 2-4: ≈ $10,002 / $10,816; ≈ $10,003 / ≈ $11,249; ≈ $10,004 / ≈ $11,699 | |
| 13.5 | **Year 5**: ≈ $10,005 / **≈ $12,167** on the blue goal highlighter. Ding | "By year 5, Leo is up about $2,167." (12.8-18.2) |
| 18.4 | Coral highlighter on Mia's ≈ $10,005 | "Mia is up about $5." (18.4-20.8) |
| 21.0 | Verdict "Interest after 5 years: / **≈ $2,167** vs ≈ $5" | "Same $10,000. Different account." (21.0-23.4) |
| 23.4-25.0 | Hold, then the results clear to the frame-1 state (loop) | |

**Full guide VO** (about 57 spoken words)

> Two people save $10,000 for 5 years. Month 1. Big bank: about 8 cents. High-yield: about $33. After a year: $1 versus $400. By year 5, Leo is up about $2,167. Mia is up about $5. Same $10,000. Different account.

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
| Formula lines | 1 + APY | 1.0001 / 1.04 | "× 1.0001" / "× 1.04" |

- **Extras for the write-up and comments:**
  - 2,166.53 ÷ 5.001 = ≈ 433×.
  - The FDIC national average of 0.37% on $10,000 is $37 a year.
  - At 0.15% (a Wells Fargo figure from one search summary, unverified), Mia would earn ≈ $75 in 5 years. That is still under 4% of Leo's.

**Sources (real-world inputs)**

| Figure | Publisher, page | Date | URL |
|---|---|---|---|
| Chase Savings standard rate 0.01% APY | JPMorgan Chase Bank, "Consumer Deposit Rates: rates in effect as of Friday, September 11, 2026" (rate sheet PDF) **[click-check]** | 2026-09-11 | https://www.chase.com/content/dam/chase-ux/ratesheets/pdfs/rdfl1.pdf |
| Same, second source: "0.01% … effective as of 05/07/2025 … current through 2026"; Premier relationship rate 0.02% | Bankrate, "Chase Savings Account Interest Rates" | searched 2026-10-07 | https://www.bankrate.com/banking/savings/chase-savings-rates/ |
| Same, third source: Chase savings "up to 0.02% APY", national average 0.37% | NerdWallet, "Chase Savings Account Interest Rates: How They Compare" | searched 2026-10-07 | https://www.nerdwallet.com/banking/learn/chase-savings-account-interest-rate-how-it-compares |
| High-yield rates now: top offers up to 4.27% | Bankrate, "Best High-Yield Savings Accounts Of October 2026 - Up to 4.27%" **[click-check]** | October 2026 | https://www.bankrate.com/banking/savings/best-high-yield-interests-savings-accounts/ |
| Same, second source: up to 4.25% APY | Yahoo Finance, "Best high-yield savings interest rates today, Friday, October 2, 2026: Earn up to 4.25% APY" | 2026-10-02 | https://finance.yahoo.com/personal-finance/banking/article/best-high-yield-savings-interest-rates-today-friday-october-2-2026-earn-up-to-425-apy-100000647.html |
| Same, third source: up to 4.50% | Fortune, "Top high-yield savings rates: Up to 4.50% on Thursday, Sept. 24, 2026" | 2026-09-24 | https://fortune.com/article/best-savings-account-rates-9-24-2026/ |
| FDIC national average savings rate 0.37% APY (pinned comment only) | The Motley Fool, "Average Savings Account Interest Rate in September 2026" **[click-check]**; NerdWallet (above); primary: FDIC, "National Rates and Rate Caps" (the value was not shown in search) | September 2026 | https://www.fool.com/money/research/average-savings-account-interest-rate/ · https://www.fdic.gov/national-rates-and-rate-caps |
| Not used on screen: Bank of America Advantage Savings 0.04%, Wells Fargo Way2Save 0.15% (one search summary; unverified) | U.S. News, "Do You Keep Your Savings at Chase or Wells Fargo? Here's How Much You're Losing" (among the results) | searched 2026-10-07 | https://www.usnews.com/banking/articles/do-you-keep-your-savings-at-chase-or-wells-fargo-heres-how-much-youre-losing |

**Assumptions (in the footer):**
- both APYs hold for 5 years (they will move);
- interest is left in, and nothing is added;
- 0.01% is Chase Savings' standard APY on its 2026-09-11 rate sheet;
- 4.00% is a round high-yield rate below the top advertised rates (4.25-4.50%);
- no taxes, no fees (Chase Savings' $5 monthly fee is waivable and is ignored here).

**Caption**
> ≈ $2,167 vs ≈ $5. Same $10,000 for 5 years: a 4.00% APY high-yield account vs a 0.01% APY big-bank savings account (Chase Savings' standard rate on its Sep 11, 2026 rate sheet). Rates move; this holds both still for 5 years. Top advertised high-yield rates in late Sep/early Oct 2026: 4.25-4.50%. Educational maths, not advice.
> #savings #highyieldsavings #personalfinance #moneymath

**Pinned comment**
> The FDIC's national average savings rate is 0.37% (Sep 2026): $37 a year on $10,000. What does yours pay?

**Per-platform notes**
- **YouTube Shorts:** title above. "Big bank" and "high-yield" are the search words.
- **Instagram Reels:** the 8-cents row is the cover candidate, or the finished sheet. It is a natural save-and-share for anyone who keeps savings at a branch bank.
- **TikTok:** expect comments naming banks and rates. The pinned comment asks for them, which is the duel's "pick a side" in comment form.
- **Look note:** the Clean Sheet direction is "parked" in `03-look-directions.md` (its step-by-step pages underperformed). Here it hosts a two-column ledger with the formula lines kept on the page, which is the "shows the working" strength the sheet looks share.

---

## Search log (11 of 14)

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

WebFetch attempts on Slickcharts, NYU Stern, the Motley Fool and q4cdn were blocked by the egress proxy, as was curl to FRED and NYU Stern.
