# Format 9: year-by-year growth ladder, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (revised the same day after the verifier and hook-judge reviews). Hook pass 2026-10-08 (all three hooks kept), then hook pass 2 the same day (**all three hooks replaced**), then the assembly pass and the assembly fix pass (after QA) the same day, then the **port of 09a to Becker Rig** (2026-10-08: the owner kept Scoreboard and Becker Rig and retired Clean Sheet and Live Sheet), then the **port QA fix pass** the same day, then the **condensed cut** of all three and its **fixer pass** after the critic (2026-10-13, written in `studio/specs-wip/` and promoted into `studio/specs/` the same day; shipped the same evening with sound bible v2.5). What changed and why is in the **Review log** at the end.
**Format:** `growth-ladder`, hook pattern **P2** ("small amount × time =") for the ladders. Since hook pass 2 the hooks on top of them are a payout question (09a), a POV gift (09b) and a P1 "take your number × a constant" (09c).
**Lane:** one small regular amount (or one small lump), year by year
**Files:**
- Specs (the ids and file names were unchanged by hook pass 2; 09a's changed in the Becker Rig port, and its Live Sheet spec now sits in [`studio/specs/retired/`](../../studio/specs/retired/09a-live-sheet-100-a-month-doubles.json)):
  - [`studio/specs/09a-becker-rig-100-a-month-doubles.json`](../../studio/specs/09a-becker-rig-100-a-month-doubles.json)
  - [`studio/specs/09b-becker-rig-1000-times-1-07.json`](../../studio/specs/09b-becker-rig-1000-times-1-07.json)
  - [`studio/specs/09c-scoreboard-5-a-day-millionaire.json`](../../studio/specs/09c-scoreboard-5-a-day-millionaire.json)
  - These hold the condensed cuts (2026-10-13; 14.0 / 13.9 / 12.8 s bodies, each + the 2.5 s end card), promoted from `studio/specs-wip/` on 2026-10-13. The narration cuts they replaced (28.5 / 27.0 / 31.5 s bodies) are in git history (`480efc1^` and earlier), and `renders/channel/` has shipped the condensed cuts since 2026-10-13 (sound bible v2.5), and their renders are in git at c4a3014. The sections below describe the condensed cuts; the narration cuts' beat sheets and guide VO are in git history (be74d57 and earlier). The review log's "Condensed cut (2026-10-13)" lists every change.
- Check: [`teasers/v2/checks/09-growth-ladder.py`](checks/09-growth-ladder.py). Run `python3 teasers/v2/checks/09-growth-ladder.py`.
  - Since the promotion (2026-10-13) it reports **536 checks, 0 failures** and exits 0 on `studio/specs/` (the condensed cuts), and **515 checks, 0 failures** with `--spec` on git-history copies of the narration cuts (`git show 480efc1^:studio/specs/<id>.json`). Before it, it reported 515 on `studio/specs/` (the narration cuts; 509 after the port QA fix pass, 507 after the Becker Rig port, 492 after the assembly fix pass, 499 after the assembly pass, 468 after hook pass 2, 518 before that on the old ladders). Since the condensed cut it is cut-aware: `--spec [KEY=]PATH` checks a file in place of `studio/specs/<id>.json`, and each spec is checked as the narration cut or the condensed cut by its length. With the three WIP specs, then in `studio/specs-wip/`, it reported 536 checks, 0 failures (523 / 522 / 521 with one WIP spec each).
  - Break test, in a scratch copy: 09a's year-8 formula line "≈ $89/mo" → "≈ $90/mo", 09b's age-40 rung "≈ $14,974" → "≈ $14,975" and 09c's "about 75,176 times" → "75,177". It exited 1 with 4 failures, catching all three. Moving 09b's rung 1 back to 1.6 s also exits 1 (the $1,070 sync and the "lands by 1.0 s" claim).
  - Assembly-pass break test, in a scratch copy: 09a's year-8 Earns cell "≈ $89" → "≈ $90", 09b's verdict "81×" → "82×" and 09c's second beat "≈ $375,880" → "≈ $375,881". It exited 1 with 4 failures, catching all three.
  - Fix-pass break test, in a scratch copy: 09a's verdict "year 9" → "year 8" and a formula line given back its leading "≈"; 09c's hero beat "× 75,176" → "× 75,177", its tag's "≈" → "=" and its verdict "≈ $13.30" → "≈ $13.31". It exited 1 with 8 failures, catching all five.
  - Port break test, in a scratch copy of 09a's Becker spec: the year-8 working line "≈ **$89/mo**" → "≈ **$90/mo**", the "under $100" tag held to 7.6 s (over row 9's incoming coin), the verdict relight moved to row 8, the gauge target "$100" → "$90" and `cols` [0, 2, 3] → [0, 1, 3]. It exited 1 with 8 failures, catching all five.

**How the facts were checked**
- None of the three teasers puts market data on screen. Every on-screen number comes from one stated assumption (8% or 7% a year), and the footer prints that assumption with "not a forecast". Nothing on screen needs a source.
- **The stated rate matches every row in all three** (the P2 pitfall: FinCalC's 3.77M short is a 10% table under a "12%" label):
  - 09a says "8% a year, compounded monthly" on screen, and every row uses 8% ÷ 12 a month. Its working line's "× 8% ÷ 12" is the same monthly rate.
  - 09b says "7% a year, added once a year", and every rung is × 1.07 per year.
  - 09c says "7% a year", and every row grows each dollar by exactly 7% a year: the monthly rate is (1.07)^(1/12) − 1 ≈ 0.565%. The checker asserts this.
- Real-world figures appear only in the captions and pinned comments: the S&P 500's long-run averages, used to explain why we chose 7% and 8%. See "Sources" under 09a for what is confirmed and what is not.
- Web searches: 4 in round 1 and 2 in the revision; none in the hook passes (no new real-world figure). The egress proxy blocked every page fetch (NYU Stern, A Wealth of Common Sense, twice). Figures marked **[click-check]** come from search results and should be opened by someone before posting.

**Studio linter:** `node src/cli.mjs check` on the three specs after hook pass 2, and again after the assembly fix pass: **3/3 clean, 0 errors, 0 warnings.** After the Becker Rig port: 09a, 09b and the kit's two growth-ladder samples, **4/4 clean, 0 errors, 0 warnings** (09b's stills match its shipped MP4). After the port QA fix pass: the same four, **4/4 clean, 0 errors, 0 warnings**.
- I rendered stills of all three at 0, 1.5 and 3 s and at their key beats and verdicts and read them (times in the review log).
- Every 09a working line is 38 characters or fewer without its `**` (the longest is 29), so it stays one 40 px line inside x 62-940; the checker enforces that.
- `lookOpts` in 09c (`input`) is read by the kit and documented in `looks/scoreboard/README.md`. Newer options are documented only in their format file's header comment (the kit READMEs, which the assembly and port passes may not edit, do not list them yet): 09a's `cols`, `second`, `target`, `working` and `beats` (Becker Rig port) in `looks/becker-rig/formats/growth-ladder.js`; 09c's `beats` (assembly pass; since the fix pass a beat may move the hero with `hero` / `tag`), `heroTag` and `verdictStyle: "stack"` in `looks/scoreboard/formats/growth-ladder.js`. 09b's narration cut carries no `lookOpts`; its condensed cut carries one, `beats` (an act-only opening shrug on row 0, documented in the Becker Rig growth-ladder format header). 09c no longer uses `goal` or `icon`.

---

## (a) The format in 5 lines

1. **Mechanic** ([`04-formats.md`](../../research/v2/04-formats.md), rank 9, viability 5):
   - one small monthly amount at one rate;
   - a sheet unmasks one row per year;
   - a milestone lands about a third of the way in;
   - the biggest number sits on the last row;
   - the finished table holds.
2. **Evidence** (FinCalC TV, all watched or catalogued in [`watch/fincalc-tv.md`](../../research/v2/watch/fincalc-tv.md)):
   - "₹2000 SIP Returns for 1-15 Years": **3,771,667** views, 30 s. https://www.youtube.com/shorts/Y57tm58Y6zI
   - "Rs. 1000 in Sukanya Samriddhi Yojana Scheme": **2,139,784**, 41 s. https://www.youtube.com/shorts/pUlH-hZ6KcM
   - "Rs. 5000 SIP Returns Calculation in Sensex for Last 25 Years": 963,086. https://www.youtube.com/shorts/8of2v9B5exk
   - Amount-first titles have a median of 53,954 across the channel (n=15); payout-first titles a median of 100,740 (n=11, hook bank 4.4).
3. **The P2 cousins** ([`02-hook-bank.md`](../../research/v2/02-hook-bank.md)):
   - ChartOrbit, "Does investing 100$ monthly in BMW make you rich?": **1,391,731 (5.91x)**. https://www.youtube.com/shorts/2cF446rExhY
   - ChartOrbit, "…in NVIDIA…": 500,774 (14.1x). https://www.youtube.com/shorts/XEhGBuH2xn4
   - The Market Hustle, "$10 each day = $930 by the end of the year": 46,137 (1.1x med). https://www.instagram.com/reel/Dd5KkdPs20G/
4. **What wins, and what we add:**
   - **What wins:** row 1 on screen at 0.0 s, a small everyday input, about one row every 1.3 s, a milestone a third of the way in (FinCalC: profit passes ₹1 lakh at 0:09, and profit ≈ deposits at 0:15), the biggest number last, and a hold long enough to screenshot.
   - **What we add:** the 04-formats twist. The stated rate matches the table, a marker sits on the row where the milestone happens, and "you put in" and "worth" run side by side so growth visibly overtakes deposits.
   - **The step beyond FinCalC, after hook pass 2:** each hook hands the viewer a number they own and a question the ladder answers. 09a asks when your own $100 a month is out-earned by its own growth (year 9). 09b puts a horizon you own on one $1,000 gift (birth to 65). 09c leaves a blank multiplier for your own daily amount (× 75,176). Each ladder still ends on a verdict (R12), not only on a big number. Round 2's printed wrong answers ("Doubled by year 9?", "$1,000 + 30 × $70 = $3,100?", "A millionaire in 40 years?") are gone: the judges found them too dense for 1.5 s, or a trap only Rule-of-72 readers fall into.
5. **Pitfalls:**
   - FinCalC's own 2026 six-second cards in this formula stalled: 9,017 (https://www.youtube.com/shorts/a4GbewbYbPw) and 10,445 (https://www.youtube.com/shorts/1NugTIGX-d4).
   - Its 3.77M short is a 10% table under a "12%" label (study check).
   - The multiples are modest (14.1x at most where scored), and the two hits are 2022-23 and India-only.
   - Millionaire-goal hooks flopped in the benchmark: H75 "…still Retire a Millionaire" 34,225, H88 "$24,500 COULD BECOME $10.8 MILLION" 15,274. Since hook pass 2 no 09 hook mentions a million; 09c uses it only in its verdict, as a rate (≈ $13.30 a day).
   - So all three teasers are full ladders, not 6-second cards, and every rate on screen matches every row. Until 2026-10-13 they were VO-paced 27.0-31.5 s ladders; the condensed cuts (12.8-14.0 s bodies + the 2.5 s end card) keep every rung and number, with on-screen captions and no narration.

### Decisions shared by all three

- **Each teaser busts a different wrong belief:**
  - 09a: "$100 a month earns pocket change for decades." Frame 1 anchors it (≈ $8 a month by 0.5 s); the ladder answers year 9.
  - 09b: "A $1,000 gift is a token." One word in the header ("just"); the ladder answers over 81 times.
  - 09c: "$5 a day makes you a millionaire." Not printed at frame 1 (the judges' R5 caveat); the verdict (a million ≈ $13.30 a day) answers it, and the caption's $5 example (≈ $375,880) backs it up.
- **Captions hold the answer back.** Line 1 of each caption names the twist, not the number ("Sooner than you'd guess.", "One gift. Never topped up.", "Multiply by your own number."), so the feed preview doesn't give the payoff away (hook judge, round 2).
- **Rounding:**
  - every rounded result shows "≈" on screen; in the VO it is "about", or "over" when the true value is floored;
  - exact values carry none of these;
  - each ladder keeps one precision, now to the dollar in all three. 09c moved from the nearest $100 to the dollar when its ladder became $1 a day; its per-day rate is to the cent (≈ $13.30).

  The checker enforces all of this.
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$19,200" = 5 words). Every row the VO names lands within 0.5 s of its word. (That is the narration cuts' rule. The condensed cuts, 2026-10-13, have no narration: the same lines are on-screen captions, each up ≥ max(1.2 s, 0.12 s a word) and up while its row lands; see the review log.)
- **Lane check:**
  - No product or brand is named. Latte/Starbucks belongs to `pov-race`.
  - No by-age lookup table. "$3 a day by age" belongs to `find-your-row`. 09b's rungs are ages, but they are one person's timeline for one $1,000 gift, not a row per kind of viewer: every rung is the same money at a later age. Judge 2 asked for this lane question to be settled before 09b ships; this is the decision.
  - No two-people duel. That belongs to `ledger-duel`.
  - Each teaser is one amount, climbing year by year.
  - 09a and 09c both use regular deposits, but they ask different questions (the year growth matches the deposit vs a multiplier for any daily amount), use different rates and conventions, and live in different looks.
  - One POV in the format: 09b. Hook pass 2 kept 09a off a second "POV:" opener (see the review log).
- **No advice language.** These are worked examples at an assumed rate, and every caption says so.

---

## 09a: Becker Rig: "You add $100 a month. When does it earn $100 a month?"

| | |
|---|---|
| Look | `becker-rig` (since the port, 2026-10-08; it was `live-sheet`). A light void, one green stick figure at the foot of a ladder whose rungs are the years, a coin thrown up to each rung, a $100 gauge under each monthly figure, ink tags, a heave onto a gold plate on the last row |
| Spec | Condensed cut: `studio/specs/09a-becker-rig-100-a-month-doubles.json` (14.0 s + the 2.5 s end card = 16.5 s; promoted from `studio/specs-wip/` on 2026-10-13 over the 28.5 s narration cut, which is in git history, `480efc1^`). The Live Sheet spec is retired to `studio/specs/retired/09a-live-sheet-100-a-month-doubles.json` |
| Platform title | **You Add $100 a Month. When Does It Earn $100 a Month?** |
| On-screen hook (header) | **You add $100 a month. / When does it earn $100 a month?** (12 words, 2 lines; "$100 a month" in the kit's hero green on line 1) |
| Frame 1 | Header, the 2-line footer (16 px under the hook), and the working line "$1,245 × 8% ÷ 12 ≈ **$8/mo**" (in ink, result in green): what the Year 1 Worth earns the next month. Column heads Year / Worth / Earns a month (wrapped "Earns / a month"; YEAR stands over the top of the ladder). Rung 1 already settled: 1 · ≈ $1,245 · **≈ $8** (green, 58 px). The other 7 rungs show their year, dim, over dotted empty shelves. The figure (1.3×, clear of the rail) stands at the foot of the ladder, hand on chin, looking up it. The first caption, "By year 1 it's earning about $8 a month.", is complete on frame 1. From frame 2 he shrugs (an act-only opening beat), then nods (0.35 s); row 1's $100 gauge (a track ending in an upright tick) fills grey to 8% by 0.65 s |
| Footer | ASSUMES 8% a year, compounded monthly / $100 in at month-end · not a forecast (2 lines, broken at the separator). Port: line 2 dropped "each" (42 → 37 characters), because the kit fits the footer to x 62-940 and the old line only fit at 36 px, under the 40 px floor |

**Topic vs the seed:**
- Kept: $100 a month at 8%, year by year, in FinCalC's put-in vs worth grammar, and round 2's verified Worth cells (years 1, 5, 9, 15, 20 and 30). Since the Becker Rig port the ladder prints Worth vs Earns a month; the put-in totals stay in the spec's data (and the checker) but are not drawn (see the look note).
- Changed in hook pass 2: the question. Round 2 asked "Doubled by year 9?", a trap that only lands for viewers who know the Rule of 72. Now the header asks when the pile **earns** what you add: a payout noun, FinCalC's best-performing title type (payout-first median 100,740, hook bank 4.4).
- "Earns" here means the balance's growth over the next month at the assumed rate: balance × 8% ÷ 12. It stays in the balance; it is not a payout. The working line shows that sum for every row, and the caption says it in words.
- The ladder ends on a single repeatable answer: **year 9**, and the same year for any monthly amount.

**Wrong belief it exploits:**
- "$100 a month earns pocket change for decades." Frame 1 anchors it: by year 1 the pile earns ≈ $8 a month against the $100 you add, so the natural guess is 20-30 years. It earns more than $100 a month from year 9 (month 106 grows $100.91), at the assumed 8%.
- A second belief busted at the verdict (the VO and the working line): "a bigger deposit gets there sooner." It doesn't. The amount cancels, so it is year 9 for $50, $500 or $5,000 a month.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$100 a month" in the header, "8%" and "$100" in the footer, the Year 1 rung (≈ $1,245, earning ≈ $8 a month) and the whole working line "$1,245 × 8% ÷ 12 ≈ $8/mo", all at 0.0 s |
| R2 | One input ($100 a month). The header asks for a year; no result is printed |
| R3 | Pass: the answer is everyone's, because the amount cancels. The VO and the working line ("$50 or $500/mo: still year 9") say so at the verdict |
| R4 | $100 a month: small, round and ChartOrbit's stake |
| R5 | Implied, not printed: ≈ $8 against $100 at 0.0 s (and his shrug from frame 2) makes "decades" the viewer's guess, and year 9 busts it |
| R6 | Partial: "You add" + $100 a month. The header names no horizon (both judges) |
| R7 | One target to take a side on: your own $100 a month |
| R8 | 12 words, 2 lines |
| R9 | 7 dim year rungs over empty dotted shelves from 0.0 s. The monthly figure the question asks about, "Earns a month", is the ladder's hero column (it drops, turns green and takes the gold plate), and each row's $100 gauge shows how far that month's growth is from the deposit; the working line shows the sum (Worth × 8% ÷ 12) |
| R10 | First payoff (≈ $8 a month) at 0.0 s in the Earns cell. Biggest number (year 30, ≈ $149,036 earning ≈ $994 a month, heaved onto the gold plate) last |
| R11 | The header asks; the verdict answers in the caption band ("From **year 9** / it earns more than you add.", a green swoosh under "year 9") while rung 9 re-lights green and the figure points at it. Caption line 1 holds the year back ("Sooner than you'd guess.") |
| R12 | One number to repeat in a comment: **year 9**, for any amount |

**Benchmark hooks it is modelled on**
- H32, FinCalC: "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate". 428,862 (54.46x), https://www.youtube.com/shorts/K2QbxGXa29k. Borrowed: a monthly payout noun as the hook.
- H39, FinCalC: "How to Get ₹10K to ₹2 Lakh Monthly Income?". 100,740 (7.44x), https://www.youtube.com/shorts/I79lgAEBBjU. FinCalC's payout-first titles have a median of 100,740 (n=11), against 20,748 for its tax titles (hook bank 4.4).
- H18, ChartOrbit: "Does investing 100$ monthly in BMW make you rich?". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: $100 a month as the stake, and a question that waits for an answer.
- H84, Master Money: "4 DEAD SIMPLE NUMBERS…", slot 1 typing "$72,000 × 0.7" into "$50,400" before 3 s. 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: formula, then result, in the same slot: "$1,245 × 8% ÷ 12 ≈ $8/mo" on screen at 0.0 s.
- H27, FinCalC: "₹2000 SIP Returns for 1-15 Years". 3,771,667, https://www.youtube.com/shorts/Y57tm58Y6zI. Borrowed: row 1 on screen at 0.0 s and the row unmask.

**Beat sheet** (condensed cut, 2026-10-13: 14.0 s body + the 2.5 s end card = 16.5 s; rungs at 0.0, 1.85, 3.15, 5.05, 7.1, 8.35, 9.65 and 11.25 s; verdict at 12.4 s. The 28.5 s narration cut's sheet and guide VO are in git history.)

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Frame 1: header, footer, working line "$1,245 × 8% ÷ 12 ≈ **$8/mo**" (ink, result green). Rung **1** settled: ≈ $1,245 / **≈ $8** (green). 7 dim rungs above. The figure thinks at the foot of the ladder | "By year 1 it's earning about $8 a month." (−0.5-2.7; complete on frame 1) |
| 0.02-1.1 | He shrugs from frame 2 (an act-only beat on row 0 at t −0.12: the kit starts an act 0.14 s after its beat), then the kit's nod (0.35) and hand back on his chin (0.75); row 1's gauge fills grey to 8% (0.1-0.65) | |
| 0.9-1.85 | The first throw (wind-up 0.9, release ≈ 1.45) → rung 5 at 1.85: ≈ $7,348 / ≈ $49 (thud); the working line swaps | |
| 2.2-3.15 | The next throw (release ≈ 2.75) → rung **8** at 3.15: ≈ $13,387 / **≈ $89**, gauge at 89%. The red tag "under $100" drops over rung 9's slot (3.23-4.45). Buzz. He shrugs (3.29), then a hand on his chin (≈ 3.69). Line "… ≈ **$89/mo**" | "Year 8: about $89. Not yet." (2.75-4.55) |
| 4.1-5.05 | The throw for rung 9 (release ≈ 4.65, after the tag has gone) | |
| 5.05 | Rung **9**: ≈ $15,743 / **≈ $105**. The crossing: ≈ $105 swells to 1.15× under a burst and a shake, pop; its gauge snaps green with a pulse (5.7); the green tag "beats your **$100**" drops over rung 15's slot (5.29-6.5). He hops (5.19), then points at the row (≈ 5.66). Line "$15,743 × 8% ÷ 12 ≈ **$105/mo**" | "Year 9: about $105. More than you add." (4.6-7.85) |
| 7.1 | Rung 15: ≈ $34,604 / ≈ $231, gauge green from here up. Line "… ≈ **$231/mo**" | |
| 8.35 | Rung **20**: ≈ $58,902 / ≈ $393. Line "… ≈ **$393/mo**". (The narration cut's act-only beat here is gone: the next throw starts 0.3 s after the rung) | "Year 20: about $393 a month." (7.9-10.75; up 0.45 s before the rung, as the coin flies) |
| 9.65 | Rung 25: ≈ $95,103 / ≈ $634. Line "… ≈ **$634/mo**" | |
| 9.87-11.25 | The short heave (1.38 s): the heavy coin into his arms (9.87), pressed overhead and wobbling under a riser (10.15), a dip (10.70) and the heave (≈ 10.84, whoosh). The caption still reads "Year 20…" through the heave, so the biggest number is not given away | "Year 30: about $994 a month. On its own." (10.8-12.35; up 0.45 s before the plate, as the coin flies) |
| 11.25 | Rung **30**: ≈ $149,036 / **≈ $994** on the gold plate (biggest, last): hit, shake, burst, a 3% camera punch, cash; coins spill down the right margin. He celebrates with a hop (11.47). Line "$149,036 × 8% ÷ 12 ≈ **$994/mo**" | |
| 12.4 | Verdict in the caption band: "From **year 9** / it earns more than you add." (green swoosh under "year 9"), ding. Rung 9 relights green inside its green outlined plate; the gold plate steps back. He points at year 9 (12.54; the kit's pointUp at the plate, 12.5, is overridden 0.04 s later). Line "$50 or $500/mo: still **year 9**" | ("Any monthly amount: year 9.", the last caption line, sits under the verdict and is not shown) |
| 12.4-14.0 | Hold (1.6 s) on the finished ladder, rung 9 in its green plate, him pointing at it; then the 2.5 s end card | |

**Captions** (on-screen text, no narration; 43 words, 38 shown). Each is up ≥ max(1.2 s, 0.12 s a word), back to back (0.05 s gaps), and each number line goes up 0.4-0.45 s before its rung lands (the coin is in the air), so no line names a number before its rung shows it (the checker caps the lead at 0.5 s). The year-9 line stays up 0.75 s past rung 15's landing, where the next line would otherwise lead its rung by 1.1 s:

> By year 1 it's earning about $8 a month. · Year 8: about $89. Not yet. · Year 9: about $105. More than you add. · Year 20: about $393 a month. · Year 30: about $994 a month. On its own. · (under the verdict) Any monthly amount: year 9.

"By year 1 it's earning" is the rate at the end of year 1, not what year 1 earned: the judges' wording fix. Year 1 grows $44.99 in all (≈ $3.75 a month on average); month 12 grows $7.58 and month 13 grows $8.30.

**The maths**

- **Basis:** $100 deposited at each month-end, at r = 8%/12 a month, compounded monthly (as the footer says).
- **Formulas:**
  - Worth after n months: W(n) = 100 × ((1 + r)^n − 1) ÷ r.
  - You put in: $100 × 12 × year.
  - "Earns a month" at a year-end: W × r, the next month's growth. The working line multiplies the shown Worth; the checker asserts it rounds to the same dollar as the exact Worth.
  - The crossing: month k grows W(k − 1) × r, which is at least the $100 deposit exactly when (1 + r)^(k − 1) ≥ 2, i.e. k − 1 ≥ ln 2 ÷ ln(1 + r) = 104.32. So month 106 is the first, and months 97-108 are year 9. The deposit cancels, so the month is the same for any amount.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Year 1 | W(12) / 1,200; × r | 1,244.99 → 8.30 | ≈ $1,245 / ≈ $8/mo |
| Year 5 | W(60) / 6,000; × r | 7,347.69 → 48.98 | ≈ $7,348 / ≈ $49/mo |
| Year 8 | W(96) / 9,600; × r | 13,386.86 → 89.25 | ≈ $13,387 / ≈ $89/mo ("under $100", "Not yet") |
| Year 9 | W(108) / 10,800; × r | 15,742.95 → 104.95 | ≈ $15,743 / ≈ $105/mo ("beats your $100", "More than you add") |
| Year 15 | W(180) / 18,000; × r | 34,603.82 → 230.69 | ≈ $34,604 / ≈ $231/mo |
| Year 20 | W(240) / 24,000; × r | 58,902.04 → 392.68 | ≈ $58,902 / ≈ $393/mo |
| Year 25 | W(300) / 30,000; × r | 95,102.64 → 634.02 | ≈ $95,103 / ≈ $634/mo |
| Year 30 | W(360) / 36,000; × r | 149,035.94 → 993.57 | ≈ $149,036 / ≈ $994/mo |
| "By year 1 it's earning about $8 a month" | month 13's growth, W(12) × r | 8.30 (month 12: 7.58; year-1 average: 3.75) | about $8 |
| Verdict "From year 9 it earns more than you add." | the first month with growth ≥ $100 | month 106: 100.91 (month 105: 99.58) | year 9 |
| "Any monthly amount: year 9" (VO), "$50 or $500/mo: still year 9" (working line) | the amount cancels out of (1 + r)^(k − 1) ≥ 2 | month 106 for $50, $500, $1,000 and $5,000 | year 9 |
| "On its own" (year 30) | 993.57 ÷ 100 | 9.94 | almost 10 times your $100 (caption) |
| Pinned "72 ÷ 8 = 9" | 72 ÷ 8 | 9 | 9 |
| Pinned "(1 + 8%/12)^n = 2" | ln 2 ÷ ln(1 + r) months; ÷ 12 | 104.32 months = 8.69 years | ≈ 8.7 years (a lump sum's doubling time) |
| Pinned "At 7%: year 11. At 10%: year 8." | the same crossing at 7% ÷ 12 and 10% ÷ 12 a month | month 121; month 85 | year 11; year 8 |

- **Cross-checks:**
  - Years 1, 5, 9, 15, 20 and 30 are round 2's verified rows; year 25 (95,102.64) was verified in round 1; year 8 (13,386.86) is new, and the checker recomputes every row.
  - The year 1 and 30 Worth values match the FORMATS.md example rows to the dollar ($1,245; $149,036).

**Sources (real-world inputs).** None on screen. The rate is an assumption, labelled "not a forecast". The caption's context line ("≈ 10% a year since 1928 before inflation, ≈ 7% after") rests on these:

| Figure | Publisher, page | Date | URL | Status |
|---|---|---|---|---|
| S&P 500 since 1928: **10.09%** a year nominal, **6.81%** inflation-adjusted (dividends reinvested, CPI from BLS) | Official Data Foundation, "S&P 500: since 1928" (officialdata.org) | a live figure computed through the current year (1928 to 2026 year-to-date), read 2026-10-07; it will drift | https://www.officialdata.org/us/stocks/s-p-500/1928 | Both figures confirmed in search results (round 1 and the verifier). Page fetch blocked: **[click-check]** |
| 1928-2024: stocks **+9.94%** a year, nominal (data: Aswath Damodaran, NYU Stern) | Ben Carlson, A Wealth of Common Sense, "Historical Returns For Stocks, Bonds, Cash, Real Estate and Gold" | January 2025 | https://awealthofcommonsense.com/2025/01/historical-returns-for-stocks-bonds-cash-real-estate-and-gold/ | Nominal figure confirmed in search results (twice). Its **real** figure is **not confirmed**: search summaries only derive "roughly 6-7%". Dropped from the checker. **[click-check]** |
| 1928-2025: ≈ 10% nominal, ≈ 6.9% real | Search-engine summaries of Damodaran's series (not read directly) | searched 2026-10-07 | https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histret.html | Unconfirmed corroboration only |

So the "≈ 10% before inflation" has two confirmed sources (10.09% and 9.94%), and the "≈ 7% after inflation" has one confirmed source (6.81%) plus unconfirmed corroboration. The caption wording ("≈") covers both.

**Assumptions (in the footer):**
- 8% a year, compounded monthly (8%/12 a month);
- $100 in at each month-end;
- no fees, no taxes, no inflation adjustment;
- the rate is not a forecast.

**Caption (IG/TikTok; also the YouTube description)**
> Sooner than you'd guess.
> You add $100 a month at an assumed 8% a year. At the end of year 1 the pile is earning ≈ $8 a month (the balance × 8% ÷ 12). By year 8 it's ≈ $89. Then in year 9 it passes your $100: month 106 grows ≈ $100.91 on its own. By year 30 it earns ≈ $994 a month, almost 10 times what you add. "Earns" here means growth at the assumed rate that stays in the account, not a payout. And the year doesn't depend on the amount: $50 or $500 a month, it's still year 9.
> Maths: deposits at month-end, 8% a year compounded monthly. 8% is an assumption, not a forecast (the S&P 500 has returned ≈ 10% a year since 1928 before inflation, ≈ 7% after). Educational maths, not advice.
> #compoundinterest #investing #moneymath #ruleof72

**Pinned comment**
> Year 9 isn't a coincidence: 72 ÷ 8 = 9. Monthly growth passes your deposit exactly when (1 + 8%/12)^n = 2, the lump-sum doubling time (≈ 8.7 years). At 7% it's year 11. At 10%, year 8.

**Per-platform notes**
- **YouTube Shorts:** the title repeats the header's question, FinCalC's payout grammar. The 1.6 s hold on the finished ladder (12.4-14.0 s in the condensed cut) is the screenshot frame.
- **Instagram Reels:** cover on frame 1 (the question, the "≈ $8/mo" working line, the dim rungs and the first caption) or on the crossing at about 5.5 s in the condensed cut (8.5 s in the narration cut: the "beats your $100" tag over ≈ $105, the figure celebrating).
- **TikTok:** the comment fights will be the rate ("8% is too high or too low") and "that's compounding, not earning". The pinned comment takes the first (7% → year 11, 10% → year 8); the caption defines "earns" for the second. Keep "year 9" out of the first 100 characters of the caption (it first appears at about character 180).
- **Not a 6 s card:** FinCalC's 2026 amount-first cards stalled at 9,017-10,445. Keep the full ladder: the condensed cut keeps every rung and number in 14.0 s, on on-screen captions with no narration (the narration cut was voiced).
- **Look note (Becker Rig, since the port):**
  - **Three columns, not four.** The kit stands the figure left of the ladder, which leaves x 312-922 for the table. Measured in the kit's fonts, four numbers a row need about 790 px at the smallest sizes the look allows (year 52, "$36,000" 160 in mono, "≈ $149,036" 250 at 44 px, the plated "≈ $994" 226), so `lookOpts.cols: [0, 2, 3]` prints Year / Worth / Earns a month. "You put in" stays in `data.rows` (the spec is still look-agnostic and the checker still verifies $1,200 … $36,000) but is not drawn here. The hero column is "Earns a month", the number the hook asks about: it is what the coins become, what turns green, and what takes the gold plate. `second: "bold"` sets the Worth in the hero face in ink (40 px), a balance rather than a grey deposit. The Earns cells land at 58 px (63 on the plate), 72 px apart, against 09b's Worth at 56 px (60 on the plate) 80 px apart. Two things buy that room (port QA fix pass): the footer sits 16 px under this 2-line hook instead of pinned at y 452 (about 66 px back), and the YEAR head may stand over the top of the ladder instead of right of its rails (the kit allows it only when the values would otherwise be under 56 px; 09b is unchanged).
  - **The $100 gauge** (`target: "$100"`): under each Earns cell a 9 px track as long as your $100, ending in an upright tick ("up to here = $100"), filled grey to Earns ÷ $100 (8%, 49%, 89%; never shorter than 20 px), snapping green with its tick and a pulse on the rows that reach it, years 9 to 25. The plated year 30 has no gauge: the gold plate says "reached", and a gauge under it sat on the "$" of ≈ $634. It replaces the kit's put-in/growth meter, which would compare the wrong columns here.
  - **The working line** (`working`) is the Live Sheet's formula bar as a Becker working line: the same nine lines, mono 40 px under the footer, in ink (the footer is grey, so the line reads as the maths, not as a third line of small print), one at a time, swapped as each rung lands, the result in green (`**…**`). With no ≈ chip in this look, a line starts on the shown Worth ("$1,245 × 8% ÷ 12 ≈ $8/mo"), which is the arithmetic on the shown figure, and the checker asserts it rounds like the exact one.
  - **Beats** (`beats`, the Live Sheet's marks plus figure acts): year 8 gets the red tag "under $100", a buzz, a shrug and a hand on the chin; year 9 gets an impact (≈ $105 swells to 1.15× under a burst), the green tag "beats your **$100**" once the burst has faded, a pop, a hop and a point; the verdict relights rung 9 inside a green outlined plate while the gold plate steps back, and he points at it. Each tag sits over the next rung's empty slot and is gone at least 0.6 s before that rung's coin flies (the checker asserts it, and in the condensed cut that each tag is up ≥ 1.0 s).
  - Act-only beats: the narration cut gave year 20 one (a point, then a hand on the chin, 13.9 s), so the figure acted through its 3.9 s gap, and the checker asserted it ended ≥ 0.6 s before the next coin's wind-up. The condensed cut drops it (the next throw starts 0.3 s after rung 20, where the kit would cut the act to nothing) and has one act-only beat instead, the opening shrug on row 0 at t −0.12 (moving from frame 2); the checker asserts there is no other.
  - Timing (condensed cut): rung gaps of 1.25-2.05 s keep the figure throwing (a throw takes the last 0.95 s before its rung, a landing moves for about 0.4 s); the two gaps over 1.7 s hold the year-8 and year-9 acts and tags. Rung 25 → 30 is 1.6 s, so the last coin gets the kit's short heave (1.38 s), not 09b's long struggle. The spec's 19.4 s "roll" cue is gone (there is no count-up in this look); the kit adds swipes, thuds, the riser, whoosh, hit, cash and the verdict's ding. Captions keep "about" with the number after it.

---

## 09b: Becker Rig: "POV: someone invested just $1,000 for you at birth. What's it worth at 65?"

| | |
|---|---|
| Look | `becker-rig` (a light void, one green stick figure, a ladder whose rungs are the rows, coins thrown up to each rung, per-row composition meters, a gold plate and impact on the last row) |
| Spec | Condensed cut: `studio/specs/09b-becker-rig-1000-times-1-07.json` (13.9 s + the 2.5 s end card = 16.4 s; promoted from `studio/specs-wip/` on 2026-10-13 over the 27.0 s narration cut, which is in git history, `480efc1^`) |
| Platform title | **POV: Someone Invested Just $1,000 for You at Birth. What's It Worth at 65?** |
| On-screen hook (header) | **POV: someone invested just / $1,000 for you at birth. / What's it worth at 65?** (14 words, 3 lines; "$1,000" in the hero green; line 1 breaks after "just", which keeps its right edge in to x ≈ 850) |
| Frame 1 | Header and the 2-line footer. 8 rungs labelled by **age**, 1, 10, 18, 25, 30, 40, 50 and 65, under the heads Age / Put in / Worth. Condensed cut: rung 1 is already settled (1 · $1,000 · **$1,070**), the 7 above dim over dotted empty shelves, and the first caption "Age 1: $1,070." is complete. The figure (scaled 1.3×, standing clear of the rail, his pencil inside x ≥ 40) in the "think" pose at the foot of the ladder; from frame 2 he shrugs (an act-only opening beat), then nods (0.35 s). (The narration cut threw rung 1's coin at about 0.75 s and landed $1,070 at 1.0 s) |
| Footer | ASSUMES 7% a year, added once a year / never topped up · not a forecast (2 lines, broken at the separator) |

**Topic vs the seed:**
- Kept: Becker idea 1's maths, $1,000 × 1.07 once a year, with $1,967 at 10 and $7,612 at 30 (verified figures in `watch/alan-becker.md` §6), and its devices: numbers as objects (each coin becomes its row's number), the escalation ladder, and the final scale gag (the last coin is too heavy and has to be heaved).
- Changed in hook pass 2: the stake and the horizon. Round 2 left $1,000 alone for 30 years and printed the simple-interest guess "$1,000 + 30 × $70 = $3,100?" in the header (7 numbers in 14 words, which both judges found too dense). Now the $1,000 is a gift at birth and the ladder runs to 65, a horizon the viewer owns. The rungs are ages on one person's timeline.
- Not kept: the ×1.07 gate prop (the kit does not draw it) and round 2's "$3,100?" guess.

**Wrong belief it exploits:** "$1,000 is a token gift; it won't matter by retirement." One word in the header, "just", carries it. Never topped up, the $1,000 is ≈ $81,273 at 65, over 81 times the gift. If 7% is read as a return after inflation (the S&P 500's ≈ 6.8% a year since 1928), that is roughly today's dollars.

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "$1,000" (the input) and "65" in the header, "7%" in the footer, 8 age labels and (condensed cut) rung 1's $1,070 at 0.0 s |
| R2 | One input ($1,000, once). The header asks; no result is printed |
| R3 | Partial: the rungs are ages, so most viewers can place their own age between two rungs. The amount is fixed at $1,000; the caption gives the scaling rule for other gifts |
| R4 | $1,000: round, familiar, a plausible birth gift |
| R5 | One word: "just" implies the gift is a token |
| R6 | You ("for you") + $1,000 + a horizon (birth to 65). The stake is passive and hypothetical ("someone invested"), which both judges docked |
| R7 | One named target: 65, the top rung |
| R8 | 14 words, 3 lines |
| R9 | 8 dim age rungs with empty shelves from frame 1 |
| R10 | First payoff at 0.0 s in the condensed cut ($1,070; 1.0 s in the narration cut). Biggest number last (≈ $81,273, heaved onto the gold plate) |
| R11 | The header asks; the verdict answers. Caption line 1 holds the number back ("One gift. Never topped up.") |
| R12 | Lopsided and repeatable: "over 81 times the gift" (VO), printed in the verdict's line 2 since the assembly pass ("Over 81× the gift") |

**Benchmark hooks it is modelled on**
- H16, ChartOrbit: "What If You Invested $5,000 in NETFLIX and DISNEY?", frame 1 "POV: In 2002 You invested $5000 in". 15,876,376 (100.45x), https://www.youtube.com/shorts/KmtLGAPIutg. Borrowed: the POV grammar on a lump sum.
- H18, ChartOrbit: frame 1 "POV: Since 1996 you invested $100/month in BMW and never sold". 1,391,731 (5.91x), https://www.youtube.com/shorts/2cF446rExhY. Borrowed: "never sold", here "never topped up".
- H45, @investment_timeline: "POV: You invested in Monster instead of paying $3/day for a Monster Energy". 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473. Borrowed: "POV" + you + a small, concrete stake.
- H72, The Market Hustle: "How hitting $100K by age 40 and never investing again would grow". 67,160 (1.6x med), https://www.instagram.com/reel/DdpT7thyGvN/. The benchmark's left-alone lump measured against a life; 09b adds "you" and a small stake.

**Beat sheet** (condensed cut, 2026-10-13: 13.9 s body + the 2.5 s end card = 16.4 s; the rig choreography is the kit's own: a coin thrown to each rung, the last one heaved; this sheet lists only what the kit draws. The 27.0 s narration cut's sheet and guide VO are in git history.)

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Frame 1: header, footer, rung **1** settled ($1,000 / **$1,070**), 7 dim age rungs, the figure thinking | "Age 1: $1,070." (−0.5-2.65; complete on frame 1) |
| 0.02-1.1 | He shrugs from frame 2 (an act-only beat on row 0 at t −0.12), then the kit's nod (0.35); rung 1's meter draws (0.1-0.65) | |
| 0.8-1.75 | The first throw (wind-up 0.8, release ≈ 1.35) → rung 10 at 1.75: ≈ $1,967 (almost doubled) | |
| 3.15 | Rung **18**: ≈ $3,380 (a throw every 1.4 s from here, each winding up 0.45 s after the last landing) | "At 18: about $3,380." (2.7-5.45) |
| 4.55 | Rung 25: ≈ $5,427 | |
| 5.95 | Rung **30**: ≈ $7,612 | "At 30: about $7,612." (5.5-8.25) |
| 7.35 | Rung 40: ≈ $14,974 | |
| 8.75 | Rung **50**: ≈ $29,457 | "At 50: about $29,457." (8.3-10.9: it stays up through the heave, so the struggle never shows the answer) |
| 8.85-11.35 | The long heave (the kit's shortest struggle, 2.2 s): hands out (8.85), the heavy coin drops into his arms and he buckles (9.15, thud), hitches it up (≈ 9.40) and it sags back (≈ 9.58, step), presses it overhead (9.75) and strains, wobbling harder, under a riser; a last dip (10.80) and the heave (≈ 10.93, whoosh) | "At 65: about $81,273." (10.95-12.25: up 0.4 s before the plate, as the coin flies) |
| 11.35 | Rung **65**: **≈ $81,273** on the gold plate. Hit, shake, burst (clipped clear of the labels), cash; coins spill down the right margin. He celebrates (11.57), then points up at the plate (12.6) | |
| 12.3 | Verdict: "**≈ $81,273** at 65. / Over 81× the gift, never topped up." Ding (kit) | ("Over 81 times the gift.", the last caption line, sits under the verdict and is not shown) |
| 12.3-13.9 | Hold (1.6 s), then the 2.5 s end card | |

**Captions** (on-screen text, no narration; 24 words, 19 shown). Each is up ≥ 1.2 s, back to back (0.05 s gaps); each age line goes up 0.45 s before its rung, and the age-65 line, the hook's answer, 0.4 s before the plate, with the coin in the air (until the fixer pass it went up 1.25 s early, at the heave's peak, and answered the hook about 1 s before the plate; the checker now caps every lead at 0.5 s):

> Age 1: $1,070. · At 18: about $3,380. · At 30: about $7,612. · At 50: about $29,457. · At 65: about $81,273. · (under the verdict) Over 81 times the gift.

**The maths**

- **Basis:** V(a) = $1,000 × 1.07^a at age a. The 7% is credited once a year (on each birthday), and nothing is added or withdrawn.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Age 1 | 1,000 × 1.07 | 1,070.00 | $1,070 |
| Age 10 | × 1.07¹⁰ | 1,967.15 (1.97×) | ≈ $1,967 |
| Age 18 | × 1.07¹⁸ | 3,379.93 | ≈ $3,380 |
| Age 25 | × 1.07²⁵ | 5,427.43 | ≈ $5,427 |
| Age 30 | × 1.07³⁰ | 7,612.26 | ≈ $7,612 |
| Age 40 | × 1.07⁴⁰ | 14,974.46 | ≈ $14,974 |
| Age 50 | × 1.07⁵⁰ | 29,457.03 | ≈ $29,457 |
| Age 65 | × 1.07⁶⁵ | 81,272.86 | ≈ $81,273 |
| "Over 81 times the gift" | 81,272.86 ÷ 1,000 | 81.27 | over 81 |
| "Put in" | the one deposit | 1,000 | $1,000 on every rung |
| Pinned: the same $1,000 at 25 | 1,000 × 1.07⁴⁰ (40 years to 65) | 14,974.46 | ≈ $14,974 (the age-40 rung's figure) |
| Pinned: birth vs 25 | 81,272.86 ÷ 14,974.46 = 1.07²⁵ | 5.43 | × 5.4 |
| Caption: "roughly doubles every 10 years" | 72 ÷ 7; first age with V ≥ 2,000 | 10.3; age 11 (2,104.85) | ≈ 10 |

- **Cross-checks:**
  - Ages 1, 10, 25 and 30 are round 2's verified rungs ($1,070; $1,967; $5,427; $7,612), and $1,967 and $7,612 match `alan-becker.md` §6, idea 1.
  - Age 40 ($14,974.46) was round 2's pinned-comment figure.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 6.8% a year after inflation since 1928" is the Official Data Foundation figure (6.81%) listed under 09a: confirmed in search results, page fetch blocked, **[click-check]**.

**Assumptions (in the footer):**
- 7% a year, credited once a year;
- one $1,000 at birth, nothing added or withdrawn ("never topped up");
- no fees, taxes or inflation adjustment;
- not a forecast; read as rough today's dollars only if 7% is taken as a return after inflation.

**Caption**
> One gift. Never topped up.
> Someone invests $1,000 for you on the day you're born, and nobody touches it again. At an assumed 7% a year it roughly doubles every 10 years (72 ÷ 7 ≈ 10): ≈ $1,967 at 10, ≈ $7,612 at 30, ≈ $29,457 at 50 and ≈ $81,273 at 65, over 81 times the gift. 7% is close to what the S&P 500 has returned after inflation since 1928 (≈ 6.8% a year), so read these as rough today's dollars. A different gift? Scale every rung: $500 halves them, $5,000 multiplies them by 5.
> Maths: 7% a year, credited once a year, nothing added or taken out. An assumption, not a forecast. Educational maths, not advice.
> #compoundinterest #investing #moneymath #mathtok

**Pinned comment**
> Got the $1,000 at 25 instead of at birth? It's ≈ $14,974 at 65, not ≈ $81,273. Those first 25 years multiply it by 5.4.

**Per-platform notes**
- **YouTube Shorts:** the title repeats the header's POV and question.
- **Instagram Reels:** cover on frame 1 (the POV header over the age ladder, rung 1 at $1,070 and the first caption) or on the heave frame (≈ 10.5 s in the condensed cut, ≈ 17 s in the narration cut: the coin overhead, the top rung still empty and the caption "At 50: about $29,457.", so the cover does not give the answer away; until the fixer pass the age-65 line was already up there).
- **TikTok:** the comment fights will be "where do you get 7%?" and "inflation". The caption answers both with the after-inflation framing; the pinned comment invites "I got mine at 25" replies.
- **Look note:**
  - Becker devices used (`alan-becker.md` §4): numbers as objects (the coin becomes the number), the escalation ladder, and the final scale gag (the heave).
  - Throw mode with 8 rungs and the heave on rung 65. The 3-line header and the 2-line footer fit above the ladder (stills at 0, 0.6, 1.0, 1.5, 3, 19 and 23 s).
  - Narration cut: rung 1 at 1.0 s leaves the kit room for a real throw (it needs a cycle of at least 0.42 s after the 0.35 s opening; this one is 0.585 s). The intro's 0.75 s "think" key falls 4 ms before the release, which does not show. Condensed cut: rung 1 is settled at frame 1 (as 09a's), the figure moves from frame 2 (`lookOpts.beats`, one act-only shrug on row 0 at t −0.12; 09b had no `lookOpts` before), and the first throw winds up at 0.8 s, after the nod. Rung gaps of 1.4 s keep him throwing (no still run over 0.2 s before the verdict); the 2.6 s gap before the plate is the shortest that keeps the long heave (room ≥ 2.2 s).
  - Fix pass (format file, kit workarounds reported to the kit owner): the header gets 0.1em word spacing (the heavy display face fused "investedjust" at phone size), and the Worth cells set "≈ $7,612" with a visible space, as the verdict and captions do.

---

## 09c: Scoreboard: "Take what you could invest a day. Year 40 = that × ?"

| | |
|---|---|
| Look | `scoreboard` (a black top bar with a neon odometer, a dark stage with a board of year slots and two-tone meters, one green money colour) |
| Spec | Condensed cut: `studio/specs/09c-scoreboard-5-a-day-millionaire.json` (12.8 s + the 2.5 s end card = 15.3 s; promoted from `studio/specs-wip/` on 2026-10-13 over the 31.5 s narration cut, which is in git history, `480efc1^`; the file name still says "5-a-day-millionaire", but the $5 ladder is now an example in the caption) |
| Platform title | **Take What You Could Invest a Day. Year 40 = That × What?** |
| On-screen hook (header) | **TAKE WHAT YOU COULD INVEST A DAY. / YEAR 40 = THAT × ?** (10 words plus "= × ?", 2 lines; "A DAY" is the only green phrase). Since the fix pass "=" and "×" are set at cap height in a heavy weight, and the "?" is a green boxed blank |
| Frame 1 | Header with the blank multiplier. The hero odometer at **≈ $377**, labelled by a two-line tag on its left, "YEAR 1" / "$1 A DAY" (`lookOpts.heroTag`, fix pass), so the big number never reads as an unlabelled answer; the tag swaps with each row. Row 1's count lands just before frame 1 (rowT −0.4 s, assembly pass), so the first frame never shows a count in flight. The footer working "$1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast" under it. The input strip "$1 A DAY · 7% A YEAR" (`lookOpts.input`) over the board: row 1 (1 · $365 · ≈ $377) lit, its landing glow fading, above 5 dark slots |
| Footer | $1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast (the rate is on the input strip; the footer stopped repeating it in the fix pass) |

**Topic vs the seed:**
- Kept: a small daily amount, deposited monthly at an effective 7% a year, year by year, on the Scoreboard's odometer and board. Round 2's verified $5-a-day maths: every $1 row is the $5 row ÷ 5.
- Changed in hook pass 2: the question. Round 2 asked "$5 a day, invested. A millionaire in 40 years?"; "millionaire" is the benchmark's weakest goal word (H75 34,225; H88 15,274). Now the header gives the viewer a job (take your own daily amount) and leaves the multiplier blank.
- The $1 ladder **is** the multiplier: year 40 is ≈ $75,176 for $1 a day, and every row scales with the amount, so year 40 ≈ your daily amount × 75,176. The verdict gives the honest rate for a million, ≈ $13.30 a day, and the caption brings the meme back as an example ($5 a day ≈ $375,880: still not a million).
- The $1,000,000 goal strip is gone; the input strip takes its place.

**Wrong belief it exploits:** "$5 a day makes you a millionaire" (and its cousin, "a dollar a day doesn't add up to anything"). Neither is printed at frame 1: "× ?" is a blank, not a wrong answer (both judges, R5). The ladder answers the second with × 75,176, and the verdict answers the first: a million takes ≈ $13.30 a day, not $5 (the caption adds that $5 a day is ≈ $375,880 at year 40).

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | "40" in the header; "$1", "365" and "≈ $30.42" in the footer; the "$1 A DAY · 7% A YEAR" strip, the odometer (tagged "YEAR 1 / $1 A DAY") and row 1 at ≈ $377, all at 0.0 s |
| R2 | One input ($1 a day, as the unit). The multiplier is left blank, not printed |
| R3 | Pass: "what you could invest a day" is the viewer's own number, and the multiplier makes every row theirs. "Could" includes viewers who don't invest yet |
| R4 | $1 a day: the smallest round unit (H64's "$1") |
| R5 | Weak: no wrong answer at frame 1. The meme is busted later, by the verdict (11.2 s in the condensed cut, 25.6 s in the narration cut: a million takes ≈ $13.30 a day) and the caption's $5 example |
| R6 | You ("you could invest") + an amount (a day) + a horizon (year 40) |
| R7 | One named target: year 40 |
| R8 | 10 words, 2 lines |
| R9 | The boxed "× ?" blank and 6 board slots (5 dark) from frame 1; the hero fills the blank at 10.25 s in the condensed cut (20.8 s in the narration cut: "× 75,176") |
| R10 | First payoff ≈ $377 at 0.0 s. Biggest number last (year 40, ≈ $75,176) |
| R11 | The header asks; the verdict answers under the board. Caption line 1 holds the number back ("Multiply by your own number.") |
| R12 | A personal constant to repeat: "× 75,176", and a meme-buster: "a million ≈ $13.30 a day" |

**Benchmark hooks it is modelled on**
- H84, Master Money: "Take your salary and multiply it by 0.7", slot 1 typing at 0.0 s. 3,000,000 (140x), https://www.tiktok.com/@mastermoneyco/video/7680913784143105310. Borrowed: "take your number" × a constant.
- H55, @real_unick: "Number one: take your monthly income, multiply it by 200". 115,845 (67.1x), https://www.instagram.com/reel/DbMUONdvGcr/. Borrowed: a regular amount times a constant, in the first line.
- H76, Jake: "…take your monthly income and multiply by 0.55". 983,900 (36.3x), https://www.instagram.com/reel/DcWOomPDl9Y/.
- H64, Gage Heward: "What $1 costs you by age". 1,150,974 (210x med), https://www.instagram.com/reel/Da_dukjxB56/. Borrowed: the $1 unit the viewer scales up.
- H45, @investment_timeline: a per-day stake ("$3/day"). 1.5M (140.6x), https://www.tiktok.com/@investment_timeline/video/7671760671867997473.

**Beat sheet** (condensed cut, 2026-10-13: 12.8 s body + the 2.5 s end card = 15.3 s. Each rung is a hard cut: a thud, the slot lights, the year and "you put in" slam in, then the row's Worth and the hero count up together while its meter grows; the kit's count clock times the landings. The 31.5 s narration cut's sheet and guide VO are in git history.)

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Frame 1: header with the boxed "× ?". Hero odometer at ≈ $377 (row 1 landed at −0.05 s; its bump and glow settle by 0.31 s), tagged "YEAR 1 / $1 A DAY". Footer working. Input strip "$1 A DAY · 7% A YEAR". Row **1** (1 · $365 · ≈ $377) lit | "Year 1: about $377." (−0.5-1.9; complete on frame 1) |
| 0.5 | Cut. Row 5: $1,825, counts to ≈ $2,166 (lands 1.48) | |
| 1.95 | Cut. Row **10**: $3,650, lands ≈ $5,203 at 3.05 | "Year 10: about $5,203." (1.95-3.4) |
| 3.45 | Cut. Row **20**: $7,300, lands ≈ $15,438 at 4.81 | "Year 20: about $15,438." (3.45-5.15) |
| 5.2 | Cut. Row **30**: $10,950, lands ≈ $35,571 at 6.61 | "Year 30: about $35,571." (5.2-6.95) |
| 7.0 | Cut. Row **40**: a taller slot; the row and the hero count over a riser for 2.4 s and land **≈ $75,176** at 9.52 (hit, cash, bloom) | "Year 40: about $75,176." (7.0-9.9) |
| 10.25 | The hero takes the header's blank, 0.73 s after the landing: a hard cut from ≈ $75,176 to **"× 75,176"** (bump and glow), its tag now "YEAR 40 ≈ / DAILY AMOUNT". The board stays whole | "Your daily amount, about 75,176 times." (9.95-11.15; it rises in 0.3 s before the hero) |
| 10.85-11.2 | The rows scroll up by three whole rows to 20-30-40, a black band rises at the foot, and at 11.2 the verdict stack slams in under a green rule: "A MILLION BY YEAR 40:" / **"≈ $13.30 A DAY"**. The hero dims to 42%. Reveal + cash | "A million? About $13.30 a day." (11.2-12.8) |
| 11.2-12.8 | Hold (1.6 s), then the 2.5 s end card | |

The cuts come 0.39-0.47 s after the previous landing, so a landing's bump runs into the next cut and the ladder never stands still (the longest still run before the verdict is 0.23 s on the full frame, 0.33 s with the caption band out). Rows under 2 s apart get the kit's thud-ding rhythm (no roll sound) until the last row's riser. The hero beat sits between the year-40 landing and the verdict's make-room scroll so that neither wait reaches 0.4 s: near-still 9.90-10.27 and 10.53-10.90 (0.37 s each, caption band out); until the fixer pass it came at landing + 0.8 s and the first wait was 0.43 s, with only the multiplier caption rising in.

**Captions** (on-screen text, no narration; 32 words, all shown). Each is up ≥ 1.2 s, back to back (0.05 s gaps), goes up with its row's cut and stays ≥ 0.33 s past the landing; the Scoreboard lights its words as the line runs. "Year 40: about $75,176." goes up with the year-40 cut at 7.0 s, 2.5 s before the riser roll lands the number: its unlit words are grey but readable, and the highlight reaches "$75,176" at about 9.0-9.2 s, with the landing. That is accepted as the format's grammar (inherited from the narration cut, where the line led by 4.4 s): the line cannot start nearer the landing without leaving row 40's 2.4 s roll uncaptioned or captioned "Year 30", and the multiplier line after it needs its 1.2 s before the verdict at 11.2 s:

> Year 1: about $377. · Year 10: about $5,203. · Year 20: about $15,438. · Year 30: about $35,571. · Year 40: about $75,176. · Your daily amount, about 75,176 times. · A million? About $13.30 a day.

**The maths**

- **Basis:** m = $1 × 365 ÷ 12 = $30.4167 deposited at each month-end, at an **effective 7% a year**: the monthly rate is r = (1.07)^(1/12) − 1 = 0.5654%, so every dollar grows exactly × 1.07 a year.
- **Formulas:**
  - Worth after n months: W(n) = m × ((1 + r)^n − 1) ÷ r.
  - You put in: $1 × 365 × years.
  - W is linear in the deposit, so any daily amount d gives d × W.
- **Display:** to the dollar; the per-day rate to the cent.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Footer "≈ $30.42/mo" | 1 × 365 ÷ 12 | 30.4167 | ≈ $30.42 |
| Year 1 | W(12) / 365 | 376.57 | ≈ $377 / $365 |
| Year 5 | W(60) / 1,825 | 2,165.54 | ≈ $2,166 / $1,825 |
| Year 10 | W(120) / 3,650 | 5,202.82 | ≈ $5,203 / $3,650 |
| Year 20 | W(240) / 7,300 | 15,437.56 | ≈ $15,438 / $7,300 |
| Year 30 | W(360) / 10,950 | 35,570.85 | ≈ $35,571 / $10,950 |
| Year 40 | W(480) / 14,600 | 75,176.07 | ≈ $75,176 / $14,600 |
| Hero "× 75,176" (tag "YEAR 40 ≈ DAILY AMOUNT"), "about 75,176 times" | W(480) for $1 a day ÷ $1 | 75,176.07 | ≈ × 75,176 |
| Caption "$5 a day ≈ $375,880" | 5 × 75,176.07 | 375,880.35 (round 2's verified year-40 value) | ≈ $375,880 |
| Verdict "A MILLION BY YEAR 40: ≈ $13.30 A DAY" | 1,000,000 ÷ 75,176.07 | 13.302 ($13.30 a day reaches $999,842; $13.31 reaches $1,000,593) | ≈ $13.30 |
| Pinned "$10 a day? ≈ $751,761" | 10 × 75,176.07 | 751,760.69 | ≈ $751,761 |
| Caption: 7% ÷ 12 a month instead | $30.4167 a month at 7% ÷ 12, 480 months | 79,838.07 (≈ 7.2% a year effective) | ≈ × 79,838 |

- **Cross-checks:**
  - Every row is round 2's verified $5 row ÷ 5: 1,882.84 ÷ 5 = 376.57; 26,014.12 ÷ 5 = 5,202.82; 77,187.82 ÷ 5 = 15,437.56; 177,854.25 ÷ 5 = 35,570.85; 375,880.35 ÷ 5 = 75,176.07. The checker recomputes them all and asserts the $5 line.
  - The multiplier holds for any daily amount (W is linear in m); the checker asserts the $5 and $10 lines from it.

**Sources (real-world inputs).** None on screen; 7% is a stated assumption. The caption's "≈ 7% a year after inflation, ≈ 10% before, since 1928" uses the sources under 09a: Official Data Foundation, 10.09% / 6.81% (confirmed); A Wealth of Common Sense from Damodaran, 9.94% nominal for 1928-2024 (confirmed; its real figure is unconfirmed).

**Assumptions (in the footer and the input strip, plus the caption for the compounding detail):**
- $1 × 365 ÷ 12 a month, deposited at month-end;
- 7% a year, effective (each dollar grows 7% a year);
- no fees or taxes;
- not a forecast;
- read as rough today's dollars only if your daily amount rises with prices.

**Caption**
> Multiply by your own number.
> The board is $1 a day (≈ $30.42 a month), put in at each month-end at an assumed 7% a year. Every row scales with the amount, so year 40 ≈ your daily amount × 75,176. $5 a day ≈ $375,880: not the million the meme promises. $10 a day ≈ $751,761. A million in 40 years takes ≈ $13.30 a day.
> Why 7%? The S&P 500 has returned ≈ 7% a year after inflation since 1928 (≈ 10% before), so read these as rough today's dollars if your daily amount rises with prices. "7% a year" here means each dollar grows 7% a year; if your calculator uses 7% ÷ 12 a month (≈ 7.2% a year), the multiplier is ≈ 79,838. Not a forecast. Educational maths, not advice.
> #investing #compoundinterest #moneymath #mathtok

**Pinned comment**
> $10 a day? ≈ $751,761. Reply with yours.

**Per-platform notes**
- **YouTube Shorts:** the title mirrors the header and asks "× What?".
- **Instagram Reels:** cover on frame 1 (the "× ?" header, the tagged odometer and the board) or on the "× 75,176" frame (about 10.5 s in the condensed cut, 20.8 s in the narration cut: "× 75,176" on the hero under the header's blank).
- **TikTok:** the comments should be viewers' own multiplications; the pinned comment asks for them. Expect "S&P does 10%!": the caption answers with the after-inflation framing and the other compounding convention.
- **Risk:** "× 75,176" is a long number to remember (both judges), and in the condensed cut it is on the hero 0.95 s before the verdict lands (it stays up, dimmed to 42%, through the 1.6 s hold). The narration cut ran 31.5 s (37 s until the fix pass cut vo[6], "$5 a day…", and its beat), with ≈ 10 s after the last row landed.
- **Look note:**
  - `lookOpts.input: true` draws the "$1 A DAY · 7% A YEAR" strip; there is no `goal` (no $1,000,000 strip or halfway notch now).
  - `lookOpts.heroTag: true` (fix pass) labels the hero with a two-line tag ("YEAR 1" / "$1 A DAY", swapped on every cut); it replaces the coin icon.
  - `lookOpts.beats`: one beat with `hero` / `tag` (fix pass) moves the hero at 20.8 s (10.25 s in the condensed cut) ("× 75,176", tag "YEAR 40 ≈ / DAILY AMOUNT") and leaves the board whole. The assembly pass's two label-stack beats (20.8 and 25.6 s) are gone: the second showed ≈ $375,880 at 88 px under a 130 px hero still saying $75,176.
  - `lookOpts.verdictStyle: "stack"` (fix pass) draws the verdict in the beats' style: a green rule, line 1 white, line 2 88 px green, in the kit's verdict slot. At 25.6 s the rows scroll up by whole rows (row 20 right under the labels, no gap) and the hero dims to 42% (stills at 25.35, 25.5, 25.7, 26.2 and 31.47 s).
  - Kit workarounds in the format file (reported to the kit owner): the header is built by the format so that "=" and "×" render at cap height in a heavy weight and "× ?" gets a green boxed blank (the kit set them at about x-height). The year column sits 18 px in from the slot edge, meter stubs under 6 px are not drawn, and lined boards meter with the bright underline only (no translucent fill behind the put-in digits).
  - In race terms this is one counter climbing with no finish line. It is not a crash race, so there are no crash bands (the look's rule for fixed-rate hypotheticals).

---

## Search log (6 searches over two rounds)

1. (Round 1) S&P 500 historical average annual return since 1928, nominal and inflation-adjusted (Damodaran 2025). Secondary summaries: ≈ 10.0% nominal, ≈ 6.5-7% real.
2. (Round 1) Damodaran "Historical Returns on Stocks, Bonds and Bills" 1928-2025, geometric average, real. A Wealth of Common Sense results: ≈ 6.9% real and ≈ 10% nominal for 1928-2025 (summary).
3. (Round 1) The same, restricted to awealthofcommonsense.com. The January 2025 article: 1928-2024 stocks +9.94% nominal. (Round 1 also recorded "+6.8% real" here; the verifier could not confirm it, and neither could search 5.)
4. (Round 1) officialdata.org S&P 500 since 1928. 10.09% a year nominal, 6.81% inflation-adjusted.
5. (Revision) "A Wealth of Common Sense historical returns 1928-2024 stocks 9.9% inflation-adjusted real return". Confirms +9.94% nominal for 1928-2024 and about 3% inflation; the real return appears only as a derived "roughly 6-7%". Not a confirmation of 6.8%.
6. (Revision) "Damodaran historical returns S&P 500 1928-2025 geometric average real return". Summaries give ≈ 10.0% nominal and ≈ 6.9% real for 1928-2025; not read from the primary page.

WebFetch on pages.stern.nyu.edu and awealthofcommonsense.com was blocked by the egress proxy (round 1), and on awealthofcommonsense.com again in this revision.

---

## Review log (round-2 verifier and hook judge)

The checker went from 504 to **518 checks, 0 failures**. The studio linter: 3/3 clean, 0 errors, 1 warning (09c footer, 37.7 px). Stills read: 09a at 0, 2.5, 5.5, 7.6, 10.0, 11.8, 16.8, 18.6, 18.8, 19.5, 20.4, 22.5, 26.5, 27 and 28 s; 09b at 0, 1.4, 2.4, 7.0, 16.5, 23.5 and 28 s; 09c at 0, 2.8, 16.5, 19.8, 28.2 and 30.5 s.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 09c | must | "7% a year" on screen, but every row used 7% ÷ 12 a month (≈ 7.23% a year), so "year 53" depended on a hidden convention | **Option B.** Every row is now recomputed at an effective 7% a year (monthly rate (1.07)^(1/12) − 1), so the footer's plain "7% a year" is what the rows do and matches the caption's long-run (annualized) justification. New rows: ≈ $1,900, $26,000, $77,200, $177,900, $375,900, $765,400 and **≈ $1,011,700 at year 54** (crossing in month 646). VO, verdict, caption and pinned comment say 54. "Not even halfway" (37.6%) and "under a tenth" (9.7%) still hold. The pinned comment's 10% figure is now ≈ $844,100 at year 40 and year 42 for the million, with the 10% ÷ 12 variant (≈ $961,800) beside it. The caption names the other convention (7% ÷ 12 → year 53). I chose B over A because "7%/12 a month" on a one-line footer is jargon, and B needs no extra label. The checker now asserts that (1 + r)^12 = 1.07 |
| V2 | 09b | should | The Becker kit ignores `lookOpts.guess` and `lookOpts.gate`: no "$3,100?" marker, a boing over an empty frame, "Already past the guess" pointing at nothing, 6.8 s with nothing landing | **Removed the dependence.** Both `lookOpts` keys and the 6.6 s boing are gone. The guess is now printed in the header ("$1,000 + 30 × $70 = $3,100?"), which the chrome draws for the whole video (checked in stills). The VO names the number ("Already past $3,100."). The opening was re-cut: row 1 lands at 1.6 s and row 2 at 6.0 s, so the empty stretch is 4.4 s and carries the guess. The beat sheet describes only what the kit draws. I did not edit the kit: its module belongs to the kit builders and is not needed now |
| V3 | 09a | should | The "1st $100 ≈ $356" line had no horizon and appeared just after row 20 landed | **Both fixes.** The line names its year ("Yr 16: 1st $100 ≈ $356"), and row 20 moved from 17.2 to 19.8 s, so row 16 is the newest row while it shows (the checker asserts both). The "last $100" half became its own line, "Newest $100: still $100", at 19.6 s ("starts from zero"), because the combined 33-character line wrapped onto two lines in the stills |
| V4 | 09a | should | The Live Sheet module was a stub, so the ladder, formula bar and marks were never linted; lookOpts not documented | The module has landed. Re-linted: 0 errors, 0 warnings. Stills checked: 8 rows plus the mark slot fit, with the sheet ending at about y 1180 and the footer above y 1300. Two formula-bar lines (33 and 34 characters) wrapped onto two lines; I shortened them, and the checker now enforces 32 characters or fewer. Documented `formulaBar`, `marks`, `markStyle`, `inputsAtStart`, `unmask`, `bars` and `subLabels` in `looks/live-sheet/README.md` §8 |
| V5 | 09c | should | The Scoreboard module was a stub; footer placement, odometer, board and goal never linted; `goal`/`icon` not documented | The module has landed. Re-linted: 0 errors, 1 warning (the footer at 37.7 px, above the 34 px floor). This kit puts the footer in the top bar under the hero by design (the board fills the stage to y 1300 with captions on), not in the bottom bar. Stills show the board, the goal strip, the meters and the verdict replacing the header, clear of the caption band. Documented `goal`, `icon`, `input` and `meters` in `looks/scoreboard/README.md` |
| V6 | 09a | nit | Nothing on screen says the Rule of 72 is for a lump sum | Added the formula-bar line "Rule of 72 = one lump sum" at 16.0 s ("Why 16, not 9?") |
| V7 | 09a | nit | Pinned comment's 7% and 10% years hold only for monthly compounding | Now "At 7% a year (compounded monthly) it takes until year 19. At 10%, year 13." |
| V8 | 09b | nit | "about 2.5× more" is wrong (it is 1.46× more); "30 years of that is $3,100" can be heard as 30 × $70 | Caption: "about 2.5 times as much". VO line 2 is now "So year 30: $3,100. Right?", a balance like every later rung line, with "$1,000 + 30 × $70" in the header. The checker asserts 2.4 ≤ 7,612.26 ÷ 3,100 < 2.6 |
| V9 | 09c | nit | Rung gaps up to 5.7 s against the look's 2.5-4 s rule | Accepted. The year-40 line is now split from "Not even halfway.", so the 6.0 s 40 → 50 gap gets a caption change and a buzz at 19.4 s. Noted under the beat sheet |
| V10 | 09a | nit | The AWOCS "+6.8% real" was never confirmed; officialdata is a live year-to-date figure | The real figure is now attributed to Official Data Foundation (6.81%, read 2026-10-07, live figure). The AWOCS real figure is marked unconfirmed and dropped from the checker (`SP_REAL = (6.81,)`). Two more searches (5, 6) still did not confirm it, and the page fetch is blocked. **[click-check]** kept. Caption wording unchanged |

### Hook judge

| Teaser | Score before | Issue | What I did | My estimate after |
|---|---|---|---|---|
| 09a | 6 | must: no wrong answer at frame 1 (R5, R7 fail); the first VO repeats the banner | **Adopted the rewrite.** Header "$100 a month at 8%. / Doubled by year 9?"; formula bar at 0.0 s "Year 9: 2 × $10,800 = $21,600?" (exact); title "$100 a Month at 8%: Doubled by Year 9?". The judge's first VO line (18 spoken words in 6.6 s) breaks the 2.6 words-a-second budget, so it is split and trimmed: "$100 a month at 8%." + "Rule of 72: doubled by year 9." The year-9 bar now compares with the frame-1 target ("≈ $15,743 < $21,600"). Caption line 1 is "Rule of 72 says year 9. Not even close." rather than "The Rule of 72 is wrong here": the rule is right for a lump sum, so calling it wrong would be dishonest | 7 |
| 09b | 5 | must: the generic "what's it worth?" question; the $3,100 twist off screen until 4.6 s and absent on IG/TikTok; R3, R5, R7 fail | **Adopted the rewrite.** Header "Leave $1,000 at 7% for 30 years. / $1,000 + 30 × $70 = $3,100?" with "$3,100?" in the red second emphasis. The judge's first VO (25 spoken words in 9 s) does not fit 2.6 words a second, so the opener is "Year 1 adds $70. So year 30: $3,100. Right?" (0.0-5.8 s). It puts the first coin in the air by 1.2 s and on rung 1 at 1.6 s, which also answers the judge's Becker "something arrives within 1 s" point as far as the kit allows. Added the judge's optional "got $5,000? × 5" to the footer for R3 (linted, no warning). Caption line 1: "Not $3,100. Not even close." I kept the $3,100 guess rather than the judge's alternative ("What does year 30 earn?", ≈ $498): the guess is the more common belief, and it is now on screen | 7 |
| 09c | 6 | must: "millionaire?" with no horizon is trivially "yes, eventually" (P3 risk); R6 fails; the verdict is an anticlimax | **Adopted the rewrite**, with the V1 numbers. Header "$5 A DAY, INVESTED. / A MILLIONAIRE IN 40 YEARS?"; first VO "$5 a day for 40 years. Millionaire?"; year 40 turns on "Not even halfway." (now its own line); verdict "Not in 40. / In 54 years." ("years" added so the verdict reads on its own as a cover); title "Does $5 a Day Make You a Millionaire in 40 Years?"; caption line 1 "Not even halfway."; pinned comment "Even at 10% a year, year 40 is ≈ $844,100 … Still short." (≈ $961,800 under 10% ÷ 12, also short). One change from the rewrite: row 1 lands silently at 2.0 s under the question rather than at 3.2 s with its own VO line, which keeps the first payoff inside 3 s (R10) | 7.5 |
| all | — | should: caption line 1 gives the payoff away in the feed | Line 1 of every caption now names the bust without the number; the answer comes after the first 100 characters | — |

The hook judge's output reached me truncated after the caption-giveaway issue, so any later items in it were not visible to me and are not addressed here.

### Hook pass (2026-10-08)

*Superseded by hook pass 2 below: all three hooks were replaced the same day. This pass is kept as the record of what the earlier hooks scored.*

Two judges scored each teaser's current hook and four candidate rewrites (A-D) out of 10. The rule: adopt the best candidate only if its average is at least 7.5 and at least 0.75 above the current hook. A key that either judge marks dishonest is out; both judges marked every visible key honest. Two things were cut off in transit: judge 2's 09c scores for C and D, and the 09c candidate text after A's change list.

| Teaser | Current | A | B | C | D | Decision |
|---|---|---|---|---|---|---|
| 09a | 5.5 / 5 → **5.25** | 7 / 7 → **7.00** | 7 / 6.5 → 6.75 | 6 / 5 → 5.50 | 6 / 6 → 6.00 | **Keep current** |
| 09b | 6 / 5 → **5.50** | 7 / 6 → 6.50 | 7.5 / 7 → **7.25** | 6.5 / 6 → 6.25 | 5.5 / 4.5 → 5.00 | **Keep current** |
| 09c | 6 / 5.5 → **5.75** | 5.5 / 6 → 5.75 | 6.5 / 5.5 → **6.00** | 5 / cut off | 5.5 / cut off | **Keep current** |

**Why nothing was adopted:**
- No candidate reached 7.5. The best were 09b-B (POV, "$1,000 for you at birth", 7.25) and 09a-A ("When does it earn $100 a month?", 7.00). Both clear the +0.75 margin but miss the floor.
- On 09c, judge 2's missing scores cannot change the result. For C to reach 7.5, judge 2 would need a 10; for D, a 9.5. Judge 2's highest score in this format was 7. B-D's specs were also cut off, so none of them could have been applied as written.

**Titles:** all three are kept. The judges scored whole hooks, not titles alone, and no candidate title is clearly better for the current body:
- **09a.** A's and B's titles ask questions the current video does not answer: when growth passes $100 a month (year 9, not on screen), and halfway (year 23, which has no row). C's "The Rule of 72 Says 9 Years. Not for $100 a Month." fits the current numbers. But both judges docked C for giving the verdict away, and a title that does so in the feed has the same flaw. C averaged 5.50, against 5.25 for the current hook. D's title needs the share-of-balance framing.
- **09b.** Both judges flagged that the current title's "Is It Really Just" gives away the direction of the answer. No candidate title fixes that for the current body. A's needs each year's earnings (≈ $498 is not on any rung). B's needs the age ladder. D's needs the "Really cost" column. C's "Double? Triple? More?" fits (≈ 7.6× is "more"), but both judges found that "More?" gives the answer away in the same way.
- **09c.** A's "$5 a Day Won't Make You a Millionaire in 40 Years. So When Does It?" fits the body (year 54). But it is A's verdict-first hook moved into the title, and both judges docked exactly that (R2/R11) and the P3 "so when?" loop. A averaged 5.75, level with the current hook. B-D's titles were cut off.

**What the judges agreed on, for the next round:**
- **09a.**
  - The current wrong answer (year 9) only lands for viewers who already know the Rule of 72, and the rule is not named until 3.4 s. vo[0] repeats the banner word for word. Nothing new moves from 0.5 to 3.4 s. There is no "you".
  - A was the strongest lever (7 / 7): a payout noun, and the ≈ $8-vs-$100 gap on screen by 0.5 s. It was held back by its P3 time-to-goal shape, and because the empty cells count Worth, not the monthly earnings the question asks about. It also has no horizon.
  - If A is revisited, both judges ask for the same wording fix. "Year 1 earns about $8 a month" is the year-end rate: month 12 grows $7.58, month 13 grows $8.30, and the year-1 average is $3.75. Say "By year 1 it's earning about $8 a month."
  - B (6.75) attacks a belief everyone holds. But "halfway there" is measured against a total not seen until 12 s, and "half the money" is literally true of the put-in ($18,000 of $36,000).
- **09b.**
  - The current header carries 7 numbers and a sum in 14 words, and nothing lands until $1,070 at 1.6 s.
  - B came closest. It was held back by a passive, hypothetical stake ("someone invested for you"), by the generic "what's it worth at 65?" question, and by its 3 lines. Its age rungs also drift toward 02's find-your-row lane: judge 2 asks for that lane question to be settled before it ships.
  - A (6.50) asks about each year's earnings, but the rungs show balances. Its ≈ $498 answer cannot be read off the ladder.
- **09c.**
  - The current vo[0] spends 3.2 s repeating the header. There is no "you" on screen. "Millionaire" is the benchmark's weak spot (H75 34,225; H88 15,274).
  - A answers the yes/no on frame 1. B's "your age + 54" is cosmetic, because every viewer's row is the same 54 years.
- **Open items (not applied, because they were not scored):**
  - 09a and 09c: give vo[0] new information instead of the banner. Both judges named the banner echo on each.
  - 09b: a title that mirrors the header without "Is It Really Just", e.g. "Leave $1,000 at 7% for 30 Years: $3,100?".

**Files:** no changes to the specs, beats, VO, captions, check script or `teasers.json`.
- Re-run of `checks/09-growth-ladder.py`: **518 checks, 0 failures**, exit 0.
- `node src/cli.mjs check` on all three specs: 0 errors, 0 warnings. With today's Scoreboard kit, the round-2 warning on the 09c footer (37.7 px) no longer fires.
- Stills at 0, 1.5 and 3 s for all three, with today's kits:
  - **09a.** At 0.0 s: the banner, the formula bar typing "Year 9: 2 × $10,800", row 1 at ≈ $1,245, and seven put-in rows with empty Worth cells. The bar reads "= $21,600?" by 1.5 s. Nothing else changes by 3.0 s, as both judges said.
  - **09b.** At 0.0 s: the 2-line header with "$3,100?" in red, the footer, and 8 dim rungs. The figure stands at the left edge, with its pencil just past the frame. The coin is in the air at 1.5 s, and $1,070 sits on rung 1 at 3.0 s.
  - **09c.** At 0.0 s: the header, the odometer already rolling (≈ $1,84x), the footer working, and the goal strip over 7 dark slots. YEAR 1 is lit (≈ $1,900) by 3.0 s.

### Hook pass 2 (2026-10-08)

The owner rejected round 1 partly because the hooks were weak. Two judges scored each teaser's current hook, its round-1 best (R1, with renderability and maths fixes) and four new rewrites (A-D), out of 10. The round-2 rule: adopt the best candidate when its average is at least 1.0 above the current hook, even below 7.5; otherwise keep the current hook. A key that either judge marks dishonest is out; both judges marked every key honest. Judge 2's 09c scores and the end of the candidate list were cut off in the brief I was given; I read them from the judges' and the hook doctor's own structured outputs, so every score below is complete.

| Teaser | Current | R1 | A | B | C | D | Decision |
|---|---|---|---|---|---|---|---|
| 09a | 5.5 / 5.5 → **5.50** | 7 / 7 → **7.00** | 7 / 6 → 6.50 | 7.5 / 6.5 → **7.00** | 6.5 / 6.5 → 6.50 | 6 / 5 → 5.50 | **Adopt R1** (+1.50; tied with B) |
| 09b | 5.5 / 5 → **5.25** | 7 / 6.5 → **6.75** | 6 / 5.5 → 5.75 | 6 / 5.5 → 5.75 | 6.5 / 6 → 6.25 | 6.5 / 5.5 → 6.00 | **Adopt R1** (+1.50) |
| 09c | 6 / 5.5 → **5.75** | 6 / 5.5 → 5.75 | 6 / 5 → 5.50 | 6.5 / 6 → 6.25 | 7 / 6.5 → **6.75** | 5.5 / 5.5 → 5.50 | **Adopt C** (+1.00, exactly the margin) |

**Cross-slate:** the doctor flagged three shared levers. 09a-A and 09c-C both use the P1 multiplier: only 09c-C is adopted. 09a-B and 09b-C both use "quit": neither is adopted. 09a-C and 09c-D both use "skip one deposit": neither is adopted.

**09a: adopted R1, "You add $100 a month. When does it earn $100 a month?"**
- **The tie with B (both 7.00).** I chose R1 for three reasons:
  1. Both judges gave R1 a 7; B split 7.5 / 6.5.
  2. 09b adopts a POV opener. B ("POV: 5 years of $100 a month…") would make two of the three 09 hooks "POV:" openers, the grammar the `pov-race` format (06) is built on. R1 keeps three different levers in the format: a payout question, a POV gift and a P1 multiplier.
  3. B's "over 80 times" compares cashing out at year 5 with 25 more years of deposits. Judge 2 noted that stopping the deposits but staying invested still reaches ≈ $53,933 (7,347.69 × 1.00667^300 = 53,933.31), so B needed a caption definition of "quit" to stay honest. R1 needed only "earns = growth, not a payout".

  Against R1: B carries the fuller stake (you + $100 a month + 5 years, R6) and attacks a belief people feel more (judge 1 called it the strongest emotional hook in the set). If the owner prefers that open, B's spec was built and linted by the hook doctor (`hd09/specs/09a-live-sheet-hdB-quit-at-5.json` in the session scratchpad).
- **Why R1 scores:** a payout noun on the viewer's own $100 (H32, 54.46x; payout-first median 100,740), the ≈ $8-vs-$100 gap on screen by 0.5 s (H84's formula-then-result, 140x), a VO that adds information instead of reading the banner, and an answer that is the same for every amount (R3 pass).
- **Applied as written:**
  - header, title and footer;
  - rows for years 1, 5, 8, 9, 15, 20, 25 and 30; rowT [0.0, 3.2, 4.6, 8.0, 12.2, 13.9, 17.8, 19.4]; duration 28.5; hold 9.1;
  - the 9 formula-bar lines (all 30 characters or fewer), the marks (row 8 "under $100", row 9 "earns $100+") and the sfx (buzz 4.6, pop 8.0, roll 19.4);
  - all 6 VO lines at their start times, including the judges' fix to vo[0] ("By year 1 it's earning about $8 a month.");
  - the verdict, caption line 1 ("Sooner than you'd guess.") and the pinned comment's 72 ÷ 8 explanation.
- **Deviations, with reasons:**
  1. VO durations are set to exactly 2.6 spoken words a second by the checker's count: vo[0] 3.85 s (candidate 4.0), vo[2] 4.25 (4.3), vo[3] 3.85 (3.9), vo[5] 1.95 (2.0). No start time moved.
  2. The pinned comment adds "At 7% it's year 11. At 10%, year 8." It keeps round 2's answer to the rate fight; the checker asserts both years.
- **What the judges still flag (not fixed here):** a time-to-goal ("when") shape, a softened P3; the empty cells count Worth while the monthly figure lives in the formula bar; no horizon in the banner.
- **Stills read** at 0, 1.5, 3, 8.6 and 25 s:
  - 0.0 s: the banner, the bar typing "≈ $1,245 × 8% ÷ 12", row 1 at ≈ $1,245, 7 rows with put-in and empty Worth cells, the footer.
  - 1.5 s: the bar reads "≈ $1,245 × 8% ÷ 12 ≈ $8/mo". 3.0 s: unchanged, caption "about $8 a month"; row 5 lands at 3.2 s.
  - 8.6 s: row 9 yellow with its tooltip wiping in. 25 s: the verdict card fits under the footer, with row 30 highlighted.

**09b: adopted R1, "POV: someone invested just $1,000 for you at birth. What's it worth at 65?"**
- **Why it won:** the POV grammar (H16, 15.9M, 100.45x; H18, 1.39M), a small round stake with a horizon the viewer owns (65), "just" as the one-word belief, 8 countable age rungs and a lopsided ending (over 81 times, R12).
- **Applied as written:**
  - header, title, footer, input ("once, at birth") and columns (Age / Put in / Worth);
  - the 8 age rungs and their values; rowT from rung 10 on [3.4 … 17.8]; duration 27.0; hold 9.2;
  - the 6 VO lines at their start times, the verdict and caption line 1 ("One gift. Never topped up.").
- **Deviations, with reasons:**
  1. **Rung 1 lands at 1.0 s, not 1.6 s.** Both judges docked the 1.6 s first payoff. The sync rule (a named row within 0.5 s of its word) puts "$1,070" at 0.78 s. The kit still throws a real coin: wind-up at about 0.4 s, release at about 0.75 s. Stills at 0.6, 1.0 and 1.5 s show the coin in hand, then $1,070 on rung 1.
  2. VO durations at 2.6 words a second by the checker's count: vo[0] and vo[5] 2.35 s (candidate 2.4), vo[3] 4.25 (4.3), vo[4] 4.65 (4.7).
  3. The candidate had no pinned comment. I wrote one from verified figures: the same $1,000 put in at 25 is ≈ $14,974 at 65 (the age-40 rung's number), so the first 25 years multiply it by 5.4.
  4. The caption's scaling line replaces round 2's footer "got $5,000? × 5", which the candidate's footer dropped.
- **Lane decision (judge 2's open item):** 09b stays in `growth-ladder`. The rungs are ages, but they are one person's timeline for one $1,000; it is not a table with a row per kind of viewer. The lane check above records this.
- **What the judges still flag (not fixed here):** a passive, hypothetical stake ("someone invested"), the generic "what's it worth?" question, and 3 lines of 14 words.
- **Stills read** at 0, 0.6, 1.0, 1.5, 3, 19 and 23 s:
  - 0.0 s: the 3-line header, the footer, 8 dim age rungs, the figure thinking.
  - 0.6 s: the coin in his hand, caption "Age 1: $1,070."; 1.0 s: $1,070 on rung 1 with "$1,000" put in; 1.5 s: settled; 3.0 s: winding up for rung 10.
  - 23 s: every rung filled, ≈ $81,273 on the gold plate, the 2-line verdict under the ladder.

**09c: adopted C, "Take what you could invest a day. Year 40 = that × ?"**
- **Why it won:** the P1 grammar (H84, 140x; H55, 67.1x; H76, 36.3x) applied to the viewer's own daily amount. "Could invest" includes non-investors. The first payoff lands at 0.4 s. The takeaway, "a million ≈ $13.30 a day", busts the $5-a-day meme honestly (R12).
- **Applied as written:**
  - header, title and footer; input $1 a day;
  - rows for years 1, 5, 10, 20, 30 and 40, to the dollar; rowT [0.4, 3.0, 4.6, 8.0, 12.2, 16.6];
  - `lookOpts` {icon "coin", input true}, with the goal strip dropped;
  - the 8 VO texts, the verdict text, caption line 1 ("Multiply by your own number.") and the pinned comment.
- **Deviations, with reasons:**
  1. **The tail is re-timed.** As written, the last VO line ended at 35.6 s in a 37.0 s video, under the 2 s end hold the checker requires, and its hold (5.0) did not equal duration − last row. Now vo[5] starts at 20.8 (was 20.9), vo[6] at 25.6 (25.8), and vo[7] and the verdict at 31.1 (31.6). The last line ends at 34.95; the duration stays 37.0 and hold is 20.4 (the kit reads hold only when duration is omitted).
  2. VO durations at 2.6 words a second by the checker's count, e.g. vo[7] 3.85 s (candidate 4.0) and vo[6] 5.4 s (5.5).
- **What the judges still flag (not fixed here):** no wrong belief in the first 1.5 s; × 75,176 is too long to remember the way × 0.7 is; 37 s is long, and the blank is answered on screen at 16.6 s but in words only at 20.8 s.
- **Stills read** at 0, 1.5, 3, 17.6, 31, 32 and 36.5 s:
  - 0.0 s: the header with "× ?", the hero at ≈ $376 with the coin, the footer working, the "$1 A DAY · 7% A YEAR" strip, row 1 lit over 5 dark slots.
  - 1.5 s: ≈ $377 on the hero and row 1. 3.0 s: row 5 slamming in.
  - 17.6 s: all 6 rows, the hero counting through ≈ $65,115 toward ≈ $75,176.
  - 31-36.5 s: the 2-line verdict under the board, which compacts to rows 20-40.

**Files:**
- `studio/specs/09a-…`, `09b-…` and `09c-…json`: the new hooks, with ids and file names unchanged. `node src/cli.mjs check` on all three: 3/3 clean, 0 errors, 0 warnings.
- `checks/09-growth-ladder.py`:
  - rebuilt for the three new ladders: 09a's monthly-earnings lines (`A_EARN`, the shown-vs-exact rounding, the month-106 crossing, amount independence, and the pinned 7% and 10% years); 09b's age rungs (`B_AGES`, "over 81", the 25-start pinned figure, the 1.0 s first payoff); 09c's $1 ladder (`C_MULT`, the $5 and $10 lines, ≈ $13.30, the 7% ÷ 12 caption figure and the "≈" before the verdict's multiplier);
  - the columns check now reads a per-spec list (09b's are Age / Put in / Worth), and 09a's mark labels ("under $100", "earns $100+") are covered;
  - result: **468 checks, 0 failures** (518 before). The break test is in the header notes.
- This write-up: the header notes, the shared decisions (beliefs, captions, rounding, lane check) and all three teaser sections (hook, title, frame 1, topic, belief, rules, benchmarks, beat sheet, VO, maths, sources, assumptions, caption, pinned comment and notes) were rewritten. The search log is unchanged: this pass needed no new real-world figure.
- `teasers/v2/teasers.json`: the three 09 entries' titles, headers, runtimes, key numbers and hook scores (7.0, 6.75 and 6.75, the judges' averages), and the format's check line, were updated. `slate.json` lists formats only, so it needed no change.

### Assembly pass (2026-10-08)

Rendered all three in their kits and read the contact sheets, stills, and frames pulled from the MP4s. Three fixes, one per teaser, plus a type-floor fix in the live-sheet format. Every number on screen is still a verified figure: the checker now reports **499 checks, 0 failures** (468 before). The studio linter gives 3/3 clean (0 errors, 0 warnings), and the kits' growth-ladder samples and stress specs (live-sheet 5, scoreboard 2) are still clean.

- **09a: the monthly figure now sits in the sheet.** Before, the sheet showed Year / You put in / Worth, and the hook's unit ("earn $100 **a month**") appeared only in the formula bar. The bar finished typing "≈ $89/mo" about 0.9 s after the VO said it, and at year 30 the VO said "$994 a month" while the sheet's climax was ≈ $149,036. Both judges had flagged this (R9 caveat).
  - Now: a 4th column, "Earns a month" (`data.columns[3]`, with a no-break space so it wraps "Earns / a month"). Its cells are ≈ $8, $49, $89, $105, $231, $393, $634 and $994, the same strings as each formula line's result; the checker asserts that.
  - Frame 1 shows ≈ $8 right under "When does it earn $100 a month?". Both mark tooltips ("under $100", "earns $100+") open under the Earns cell they describe. The summary row counts up to ≈ $994 as the VO says it.
  - Format fix (`looks/live-sheet/formats/growth-ladder.js`): `inputsAtStart` now pre-shows only the put-in column, as the kit README says, so a 4-column ladder's Worth still lands with its row. Also, the summary row's font fit stepped from 41 to 39 px under the 40 px floor; it is now clamped. No other spec uses the live-sheet growth-ladder; the 5 kit specs are unchanged and clean.
- **09b: R12's line is now on screen.** "Over 81 times the gift" was voiced at 22.3 s, but the verdict card covers the caption band from that moment, so it never showed. The verdict is now "**≈ $81,273** at 65. / Over 81× the gift, never topped up." (81,272.86 ÷ 1,000 = 81.27, floored to "over 81"). "$1,000" is still in the header.
- **09c: the screen was static from 19 s to 31 s, and frame 1 showed a count in flight.**
  - After row 40 landed, nothing changed on screen for 12 s while three VO lines carried the answer to the header's "× ?" and the $5 example. New `lookOpts.beats` in `looks/scoreboard/formats/growth-ladder.js`:
    - from the first beat the rows scroll up (as they did for the verdict) and a black band rises at the foot;
    - each beat slams a two-line stack into the verdict's slot: 20.8 s "YEAR 40 ≈ YOUR DAILY AMOUNT" / "× 75,176" (88 px green), and 25.6 s "$5 A DAY × 75,176" / "≈ $375,880";
    - the verdict replaces beat 2 at 31.1 s, and each beat cues a reveal.
    - The option is documented in the format file's header comment. The kit README, which this pass may not edit, does not list it yet.
  - Frame 1 read "$376" (hero and row 1, the ≈ an unlit ghost) under a caption saying "about $377". Row 1 is now at rowT −0.4 s, so its count lands at −0.05 s and frame 1 shows ≈ $377 everywhere. The checker asserts rowT ≤ −0.35, and the VO sync rule still holds (|−0.4 − 0.0| ≤ 0.5).
- **Checker changes:**
  - the row width is now per spec, so 09a has 4 columns;
  - 09a's Earns cells are expected exactly, equal the formula-bar results, rise row by row, and cross $100 between the marked rows;
  - 09b's verdict tokens now end on "81" (not "$1,000");
  - 09c's two beats are covered (40; 75,176; $5 × 75,176; ≈ $375,880), and there are claims for the beats' ≈, their VO anchors, 5 × 75,176 = 375,880, and the frame-1 landing.
  - Break test: see the header notes (4 failures, all three caught).
- **Read:**
  - 09a: contact sheet; stills at 0, 5.4, 9.0, 21.0 and 25.2 s.
  - 09b: contact sheet; stills at 0, 1.6, 5.9, 9.9, 14.0, 16.2-18.0 (the heave, 6 frames), 19.0, 21.0, 23.5 and 27.0 s.
  - 09c: contact sheet; stills at 0, 1.5, 3.6, 19.5, 20.8, 20.85, 20.9, 21.5, 25.65, 26.5 and 32.0 s.
- **MP4s:** `studio/out/09a-…mp4` (28.5 s), `09b-…mp4` (27.0 s) and `09c-…mp4` (37.0 s), all 1080 × 1920, 30 fps, H.264 + AAC. Frames pulled with ffmpeg at 0 / 9.0 / 21.0 s (09a), 0 / 5.9 / 23.5 s (09b) and 0 / 21.5 / 26.5 s (09c) match the stills (mean absolute difference 0.6-2.0 per channel: compression only).
- **Not changed here:** `teasers/v2/teasers.json`'s format-9 check line still says 468 checks; this pass may not edit that file.

### Assembly fix pass (2026-10-08, after QA)

QA scored the three below the round-2 bar: 09b 7.5, 09a 6.5 and 09c 6.5. It found no maths errors (499 checks, 0 failures). This pass applies every must and should issue and the cheap nits. The edits are in the three specs and the three `growth-ladder.js` format files only: no kit `lib.js`, `theme.js`, `kit.js`, `style.css` or README was touched. Every number on screen is still a verified figure. The checker reports **492 checks, 0 failures**: it has fewer checks than before because the cut $5 VO line and beat take their checks with them, and the new claims below add some back. The studio linter gives 3/3 clean (0 errors, 0 warnings), and the scoreboard kit's two growth-ladder samples are still clean.

- **09a (live-sheet):**
  - **Must, reflow:** each tooltip opened a spacer row, so the lower table and the footer jumped about 65 px four times. Marks are now chips (`markStyle` 'chip', the 'auto' choice when it fits): a dark pill dropped over the gridline under the output cell, laid over the next row's still-empty cells. There is no spacer row and nothing moves. The footer stays at the same y in the stills at 4.8, 4.9, 5.0, 7.7, 7.85, 7.95, 8.2, 8.3, 11.8, 11.9, 12.1 and 12.25 s.
  - **Must, the exit glitch:** the old tooltip exited by a width clip ("arns $100+" at 18.95 s). Chips fade in and out by opacity only, with a 6 px drop and a 104% settle on the way in. Each is gone before the next row lands, so row 30's landing (19.4 s) has the moment to itself.
  - **Should, the selection:** it slid through the Worth digits at 20.2-20.7 s, and it grew over every filled row. Now it sits on the newest row's landing cells only and snaps with a 7 px outward pop, so no edge crosses a value.
  - **Should, the climax:** the crossing is now a moment. At 8.0 s the ≈ $105 cell lands bigger in ink on yellow, the year cell turns yellow, and the chip reads "beats your **$100**". At the verdict, row 9 re-lights full width with a bump and takes the selection, and the summary row's yellow fades. The verdict is a two-line stack (`verdictStyle: "stack"`): "From **year 9**" at 88 px over "it earns more than you add." Year 9 is the one focal point on the last frame.
  - **Nits:**
    - The formula-bar lines drop their leading "≈" (the bar's chip is the ≈). A line swaps in whole and types only its result as the row's cell lands, so the bar never blanks to "≈ |".
    - Each chip shows within 0.2 s of its row landing (4.78 and 8.18 s), so the buzz and pop now belong to it.
    - The captions keep "about" with the number after it ("ABOUT $393 A MONTH").
    - The footer is pre-broken at its separator with "\n" (no orphan "·").
- **09b (becker-rig):**
  - **Should, dead air:** the figure stood idle from 13.4 to 16.3 s. The heave now fills the 4.4 s after rung 50: the heavy coin drops into his arms at about 14.2 s, he hitches it up and it sags, he presses it overhead at about 15.6 s and strains under a riser, and he heaves it at 17.4 s.
  - **Should, the impact:** the hit lines are clipped to the band between the column heads and the row under the plate, and the spill drops down the right margin (x 940-1000). Crops at 17.85 and 17.95 s show nothing crossing "WORTH".
  - **Should, header word spacing:** the format file adds 0.1em word spacing and re-fits the header (a kit workaround, reported to the kit owner). The spec breaks line 1 after "just", which keeps its right edge in to about x 850.
  - **Nits:**
    - The footer is pre-broken at its separator.
    - The Worth cells read "≈ $7,612", with a visible space, as the verdict and captions do.
    - The figure is scaled 1.3× and stands clear of the rail, which sits 68 px further right. His pencil stays inside x ≥ 40.
- **09c (scoreboard):**
  - **Should, the unlabelled hero:** `heroTag` puts a two-line tag left of the hero ("YEAR 1" / "$1 A DAY") and swaps it on every cut.
  - **Should, the operators:** the format builds the header, so "=" and "×" render at cap height in Inter Full Black, and "× ?" ends on a green boxed blank (a kit workaround, reported).
  - **Should, the focal conflict:** beat 2 ("$5 A DAY × 75,176" / "≈ $375,880") is cut. The one remaining beat moves the hero itself: at 20.8 s a hard cut to "× 75,176", tagged "YEAR 40 ≈ / DAILY AMOUNT".
  - **Should, the verdict:** it now leads with the new fact. "A MILLION BY YEAR 40:" sits in white over **"≈ $13.30 A DAY"** in 88 px green, under a green rule (`verdictStyle: "stack"`), and the hero dims to 42%.
  - **Should, the length:** vo[6] ("$5 a day: about $375,880.", 5.4 s) and its beat are cut, and the verdict moves to 25.6 s. The video is now 31.5 s, with a 2.05 s hold after the last VO line. The $5 example lives in the caption.
  - **Nits:**
    - The footer no longer repeats "7% a year": the input strip carries it.
    - The year column sits 18 px in from the slot edge.
    - Meter stubs under 6 px are not drawn.
    - Lined boards meter with the bright underline only, so no translucent fill sits behind the put-in digits.
  - **Found in this pass:** when the rows scrolled up for the verdict, they left a gap of about 60 px under the column labels, where row 10 had faded out. The scroll now moves by whole row pitches, so row 20 sits right under the labels (stills at 25.35, 25.5, 25.7, 26.2 and 31.47 s).
- **Checker changes:**
  - 09a: the verdict expects "9" only. A claim pins the verdict text and its emphasis, and another the two mark labels and tones. The formula-bar lines expect the Worth without "≈", with a claim that no line starts with a second "≈".
  - 09c:
    - The footer drops the 7% token, with a claim that the rate is on the input strip from frame 1.
    - The verdict expects "40" and "≈ $13.30", with a claim that pins its text and `verdictStyle`.
    - The hero beat is covered ("× 75,176", tag "YEAR 40"), with a claim for its "≈", its single beat and its VO anchor.
    - A claim checks the hero tag's inputs.
    - The $5 claims are now caption claims.
  - Break test: see the header notes (8 failures, all five edits caught).
- **Read:**
  - 09a: contact sheet; stills at 0, 4.75, 8.15, 11.95, 14.5, 20.3, 25.0 and 28.47 s, plus the 16-frame grid at 4.8-24.3 s.
  - 09b: contact sheet; stills at 0, 9.6, 13.6, 14.4, 15.2, 16.0, 16.8, 17.4, 17.85, 17.95, 18.1, 18.3, 18.6 and 26.97 s, plus crops of the impact.
  - 09c: contact sheet; stills at 0, 13.0, 19.5, 21.2, 25.3, 25.35, 25.5, 25.7, 26.2 and 31.47 s.
- **MP4s:** `studio/out/09a-…mp4` (28.5 s), `09b-…mp4` (27.0 s) and `09c-…mp4` (31.5 s), all 1080 × 1920, 30 fps, H.264 + AAC. I pulled frames with ffmpeg at 11.95 and 25.0 s (09a), 0 and 17.95 s (09b), and 20.9 s, 26.2 s and the last frame (09c). The ones compared against stills (all but 09c's 20.9 s, which I looked at but had no matching still) match them, with a mean absolute difference of 0.3-1.4%: compression only.
- **Kit-level issues, worked around in the format files or specs and reported to the kit owners:**
  - becker-rig: the header's word spacing.
  - live-sheet and becker-rig chrome: a wrapped footer starts its second line with "·" (worked around with "\n" in the specs).
  - scoreboard: the `ax` operators "=" and "×" render at about x-height.
  - The kit READMEs do not yet list the new options: live-sheet `verdictStyle` and chip marks; scoreboard `heroTag`, `verdictStyle`, and `beats[].hero` / `tag`.
- **Not changed here:** `teasers/v2/teasers.json`'s format-9 check line still says 468 checks; this pass may not edit that file.

### Port to Becker Rig (2026-10-08)

The owner watched the teasers in all four looks and kept two, Scoreboard and Becker Rig. Clean Sheet and Live Sheet are retired, so 09a moved from Live Sheet to Becker Rig. 09b (already Becker Rig) and 09c (Scoreboard) are untouched.

- **Kept exactly:** the header (the hook) and its first VO line, all 6 VO lines and their times, the verdict, the whole `data` block (all 32 cells, including the no-break space in "Earns a month"), every rung time, the duration (28.5 s) and the hold. The retired spec and the new one have identical `header`, `vo`, `verdict` and `data`.
- **Spec:** new id `09a-becker-rig-100-a-month-doubles` with look `becker-rig`. The old spec was moved with `git mv` to `studio/specs/retired/`. `lookOpts` was rewritten for the Becker kit:
  - dropped (Live Sheet only): `inputsAtStart`, `verdictStyle`, `formulaBar`, `marks`;
  - added: `cols: [0, 2, 3]`, `second: "bold"`, `target: "$100"`, `working` (the formula bar's nine lines, now with the result in `**…**`), and `beats` (the two marks as tags, with figure acts, plus a relight of rung 9 at the verdict).
  - The `roll` cue at 19.4 s is gone, because this look has no count-up. The buzz (4.6 s) and pop (8.0 s) stay on their rungs.
- **Two changes the look needed:**
  1. **"You put in" is not drawn.** Four numbers a row do not fit beside the figure: measured, about 790 px against the 610 px the ladder leaves. So the ladder prints Year / Worth / Earns a month. The put-in strings stay in the data and in the checker. Of the four columns they are the least tied to the hook: no VO line, mark, formula-bar line or verdict used them.
  2. **The footer's line 2 lost "each"** ("$100 in at month-end · not a forecast"). The kit fits the footer to x 62-940, where the old 42-character line only fit at 36 px, a linter warning under the 40 px floor. The assumption list below the maths still spells out "each month-end".
- **Format file** (`looks/becker-rig/formats/growth-ladder.js`, the only kit file touched). There are five new optional `lookOpts`, documented in its header comment: `cols`, `second`, `target`, `working` and `beats` (act / label + tone / impact / relight). Two small fixes came out of reading the stills:
  - column heads now wrap only at ordinary spaces, so a no-break space keeps "a month" together ("Earns / a month", not "Earns a / month");
  - a rung timed at t ≤ 0 is already settled at frame 1, with no squash on the cover frame and no thud for a drop nobody sees.
  
  Without the new options the format behaves as before: 09b and the kit's two growth-ladder samples lint clean, and 09b's stills at 9.6 and 24 s match its shipped MP4 (mean difference 1.15-1.27 of 255, compression only). No spec other than 09a has a rung at t ≤ 0.
- **Found and fixed while reading the stills and lint:**
  - the "Earns a / month" head wrap;
  - the 36 px footer;
  - a gauge track too faint to read as "the length of $100" (now the kit's line grey, with a slate fill);
  - a blank working-line frame at each swap, and a slide-in that crossed x 60 (now a hard swap with a 12 px slide from the right);
  - tags popping from 0.82 scale (33-36 px for a frame in a 0.1 s lint; they now drop and fade at full size);
  - row 1 caught mid-squash on frame 1.
- **Checker** (`checks/09-growth-ladder.py`):
  - the new id; `lookOpts.working[i]` replaces `formulaBar[i]`, with the same tokens; `lookOpts.beats[0..1].label` replaces `marks`; `lookOpts.target` = "$100"; `lookOpts.cols` = [0, 2, 3] (numeric); beat durations are skipped as timing.
  - New claims:
    - working lines are ≤ 38 characters, land with their rungs and end on one `**…**` result, and start on the shown Worth;
    - the tags are "under $100" (bad) and "beats your **$100**" (good) on rungs 8 and 9, each gone ≥ 0.6 s before the next rung;
    - the relight is on the year-9 rung at `verdict.t` with a point;
    - the impact is on the year-9 rung;
    - the ladder prints Year / Worth / Earns a month;
    - the $100 gauge stays short on exactly years 1, 5 and 8, by the shown cells and by the exact values.
  - Result: **507 checks, 0 failures**. The break test is in the header notes (8 failures, all five edits caught).
- **Linter:** `node src/cli.mjs check`: 09a clean (0 errors, 0 warnings), and 09b and both kit samples are still clean. At a 0.1 s step the only finding is a 3.3:1 contrast warning on a dim year label while his raised arm passes behind it (7.70 s). 09b shows the same thing at that step (3.10-5.10 s), so it is existing kit behaviour, not part of the port.
- **Read:**
  - the contact sheet;
  - stills at 0, 0.2, 3.0, 3.2, 4.6, 4.75, 4.8, 6.5, 7.6, 8.0, 8.1, 8.25, 8.3, 10.0, 12.2, 13.9, 17.8, 18.6, 19.4, 19.55, 19.7, 20.8, 24.2, 24.4, 24.6, 25.5 and 28.47 s;
  - every number on screen against the checker's computed strings: the 8 Worth and 8 Earns cells, the 9 working lines, the two tags, the footer and the verdict.
- **MP4:** `studio/out/09a-becker-rig-100-a-month-doubles.mp4`: 28.5 s, 1080 × 1920, 30 fps, H.264 + AAC, 20 SFX cues. Frames pulled with ffmpeg at 0, 8.3 and 24.6 s match the stills (mean absolute difference 0.44-0.49%, compression only).
- **Not changed here:**
  - `teasers/v2/teasers.json` and `renders/v2/` still name the Live Sheet 09a; this pass may only edit the spec, the format file, this write-up and the check.
  - The Becker Rig README does not list the five new growth-ladder options yet; the format file's header comment documents them.

### Port QA fix pass (2026-10-08)

QA scored the Becker Rig 09a 7/10, a step below 09b, with six shoulds and three nits. Every number, the hook, the VO lines and times, the verdict and the tags are unchanged; the spec gained one act-only beat. Everything else is in the format file (`looks/becker-rig/formats/growth-ladder.js`, its header comment updated).

- **Should, small and dense numbers (50 px on a 64 px pitch):** the footer is now lifted to 16 px under a 1-2 line hook instead of pinned at y 452 (for this hook, about 66 px back), and the YEAR head may stand over the top of the ladder when keeping it right of the rails would leave the values under 56 px (here the head word, 121 px wide over "30", was what bound the row's width). The Earns cells now land at **58 px (63 on the plate), 72 px apart**; the Worth column at 41 px. 09b keeps its layout (3-line hook, values already at 56 px), checked element by element at 26 s.
- **Should, the crossing at 8.0 s:** ≈ $105 swells to 1.15× (anchored right, over 0.5 s) under a bigger burst (12 lines, r 34, shake 8), still clipped above its shelf. ≈ $89 is ink by the time ≈ $105 lands (it used to stay green until 8.3 s), so ≈ $105 is the only green number from 8.0 s.
- **Should, the gauge under the gold plate:** in target mode the plated row has no gauge (the plate already says "reached"); it used to sit on the "$" of ≈ $634 through the end hold.
- **Should, the $100 gauge did not read as $100:** the track is 9 px and ends in an upright tick at the column's right edge (grey, green with the fill once the row reaches it), and a short fill is never under 20 px. The optional yellow cap for rows past $100 was not added; no multiple label was added.
- **Should, the 14.5-16.8 s freeze:** an act-only beat `{ t: 13.9, row: 5, act: ["point", "think"], d: 2.3 }`. He points at 14.04 s, puts a hand on his chin at about 15.1 s and is back to idle at 16.2 s, 0.65 s before he takes the next coin (16.85 s). (2.3 s, not QA's 2.4 s: 2.4 s would end 0.55 s before that coin.) The checker asserts it (509 checks).
- **Should, the gold plate outshone year 9 at the verdict:** a relight now pops a green outlined plate (the gold plate's 6 px border and 18 px radius, no fill) behind rung 9 from its year to ≈ $105. At this pitch a full-pad plate would cut the gauge of rung 15 above it, so its top and bottom edges ride exactly on the gauge lines over and under the row, and those two gauges (and their ticks) hand over to it as it pops in: one even border, nothing new in the text bands. The relight bump drops to 1.06× so the swelling digits stay clear of that edge. From 24.2 s the gold plate steps back over 0.3 s (grey border, 55% fill). Year 9 is the one focal point of the end hold.
- **Nit, the hit lines through the fading tag:** an impact beat's tag now waits until its burst has faded (in at 8.24 s, not 8.08 s), and its position follows the swelling number.
- **Nit, the working line read as small print:** it is set in ink (result still green) under the grey footer.
- **Nit, the plate burst grazed ≈ $149,036:** the plate's hit lines are clipped to the right of its left edge − 8. This also keeps 09b's left hit line off its "$1,000" column during its plate impact (19.4-19.7 s); nothing else in 09b changes.
- **Side effects checked:** the kit's two growth-ladder samples get the lifted footer too (both have 2-line hooks), and the 40-year sample's YEAR head now stands over its ladder top; both lint clean and read fine at their end frames.
- **Checker:** 509 checks, 0 failures (one new claim for the act-only beat; it fails if the beat runs to 2.4 s).
- **Linter:** 09a, 09b and both samples, 4/4 clean, 0 errors, 0 warnings.
- **Read:** the 12-frame contact sheet and stills at 0, 1.0, 5.0, 8.0, 8.1, 8.17, 8.3, 8.5, 14.6, 15.0, 15.5, 16.0, 16.5, 19.4, 19.43, 19.45, 19.47, 19.5, 20.5, 24.25, 24.4, 24.6 and 28.47 s.
- **MP4:** `studio/out/09a-becker-rig-100-a-month-doubles.mp4` re-rendered: 28.5 s, 1080 × 1920, 30 fps, H.264 + AAC, 20 SFX cues. Frames pulled at 8.5, 24.6 and 28.4 s match the stills (mean absolute difference 0.47-0.50%, compression only).
- **Not changed here:** `teasers/v2/teasers.json` and `renders/v2/` (still the Live Sheet 09a); the Becker Rig README (the new behaviours are in the format file's header comment).

### Condensed cut (2026-10-13): 09a, 09b, 09c

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The 06c and 06b precedents apply (`06-pov-race.md`, "Condensed cut" and "Opening hold fix and re-ship").

**Files:**
- New: `studio/specs-wip/09a-becker-rig-100-a-month-doubles.json`, `09b-becker-rig-1000-times-1-07.json` and `09c-scoreboard-5-a-day-millionaire.json`, retimed copies of the narration cuts.
- Changed: this write-up (the three sections' spec rows, frame 1, R-rows, beat sheets, captions and platform notes, the header, and this entry) and `checks/09-growth-ladder.py`.
- Not touched: `studio/specs/` (the ship step promotes), every kit file (`studio/looks/**`: no kit change was needed), `studio/src/**`, `studio/sound/**`, the sound packs, `test/`, `publishing/` and `renders/`. Renders are in `/tmp/cond/09/<id>/final/` only. Nothing is committed.

**Kept, character for character:** every header, footer, caption line, verdict, data cell, working line, tag, tone, the hero beat's text and tag, every `sfx` kind and gain, `cols`, `second`, `target`, `input`, `heroTag`, `verdictStyle` and the 2.5 s end card (the brand layer is untouched). Only times moved, plus three choreography changes, each a spec knob:
- 09a and 09b gain one act-only opening beat, `{ "t": -0.12, "row": 0, "act": "shrug", "d": 0.72 }`: the kit starts an act 0.14 s after its beat, so the figure shrugs from frame 2 (frame 1, the cover, is unchanged). In 09a it is appended after the other beats, so the tags stay `lookOpts.beats[0]` and `[1]`. 09b had no `lookOpts` before.
- 09a drops the narration cut's act-only beat on year 20 (13.9 s, point then think): in the condensed cut the next throw starts 0.3 s after that rung, where the kit would cut the act to nothing.
- 09b's rung 1 is settled at frame 1 (`rowT[0]` 0.0, as 09a's), so the cover shows $1,070 under its caption; the narration cut threw that coin and landed it at 1.0 s.

**Measured before** (`renders/channel/`, frame difference at 270×480, `tblend` difference → `signalstats` YAVG; still under 0.15, near-still under 0.25):

| Teaser | Body / total | Still runs ≥ 0.4 s before the verdict | Longest | After the verdict |
|---|---|---|---|---|
| 09a | 28.5 / 31.0 s | 0.87-2.27, 4.93-5.90, 6.03-7.07, 8.80-9.70, 9.83-11.07, 12.57-12.97, 14.20-15.13, 15.27-16.33, 16.43-16.87, 20.87-24.03 | 3.17 s | 24.63-28.53 (3.90), card 29.73-31.00 |
| 09b | 27.0 / 29.5 s | 1.37-2.47, then 0.70 s before every throw (3.77, 5.77, 7.77, 9.77, 11.77), 19.23-22.10; near-still 0.03-0.43 and 14.40-14.90 | 2.87 s | 22.73-27.03 (4.30), card 28.23-29.50 |
| 09c | 31.5 / 34.0 s | 0.23-3.00, 6.00-6.43, 6.47-8.00, 10.13-12.00, 13.93-14.33, 14.37-16.40, 19.67-20.80, 21.10-21.77, 21.80-25.30 | 3.50 s | 25.87-31.53 (5.66), card 33.00-34.00 |

**The cuts:**

| | 09a | 09b | 09c |
|---|---|---|---|
| Body / total | 28.5 / 31.0 → **14.0 / 16.5 s** | 27.0 / 29.5 → **13.9 / 16.4 s** | 31.5 / 34.0 → **12.8 / 15.3 s** |
| `rowT` | 0, 3.2, 4.6, 8.0, 12.2, 13.9, 17.8, 19.4 → **0, 1.85, 3.15, 5.05, 7.1, 8.35, 9.65, 11.25** | 1.0, 3.4, 5.4, 7.4, 9.4, 11.4, 13.4, 17.8 → **0, 1.75, 3.15, 4.55, 5.95, 7.35, 8.75, 11.35** | −0.4, 3.0, 4.6, 8.0, 12.2, 16.6 → **−0.4, 0.5, 1.95, 3.45, 5.2, 7.0** (landings −0.05, 1.48, 3.05, 4.81, 6.61, 9.52) |
| Last rung | short heave (1.6 s gap) | long heave, the kit's shortest struggle (2.6 s gap, 2.2 s cycle; was 4.4 / 3.6 s) | 2.4 s roll over a riser |
| Final reveal → verdict | 19.4 → 24.2 (+4.8) → **11.25 → 12.4 (+1.15)** | 17.8 → 22.3 (+4.5) → **11.35 → 12.3 (+0.95)** | hero 20.8, verdict 25.6 (+4.8) → **hero 10.25 (landing + 0.73), verdict 11.2 (+0.95)** (fixer pass; the first cut had the hero at 10.32, landing + 0.8) |
| Verdict hold | 4.3 s → **1.6 s** | 4.7 s → **1.6 s** | 5.9 s → **1.6 s** |
| Beats | tags 4.6 (d 2.7) / 8.0 (d 3.2), act-only 13.9, relight 24.2 → **tags 3.15 (d 1.3) / 5.05 (d 1.45), opening shrug −0.12, relight 12.4** | **opening shrug −0.12** (new) | hero 20.8 → **10.25** (10.32 until the fixer pass) |
| `sfx` | buzz 4.6, pop 8.0 → **3.15, 5.05** (on their rungs) | none (all the kit's) | none |
| Captions | VO-paced, 0.0-26.15 → **reading-paced, −0.5-14.0**; since the fixer pass each number line leads its rung by 0.4-0.45 s (year 20 and year 30 led by 1.1 and 1.25 s) | **−0.5-13.9**; each age line leads its rung by 0.45 s and the age-65 line the plate by 0.4 s (1.25 s until the fixer pass) | **−0.5-12.8** |

Why these numbers:
- **Becker (09a, 09b):** the figure stands still between throws. A landing moves for about 0.4 s and a throw takes the last 0.95 s before its rung, so a rung gap with no act leaves about gap − 1.3 s still; 1.25-1.4 s gaps keep him throwing. 09a's two longer gaps (1.9 and 2.05 s) hold the year-8 and year-9 tags (each up ≥ 1.2 s and gone 0.6 s before the next coin) and their acts. The first throw winds up at 0.8-0.9 s, after the kit's frame-1 nod.
- **The verdict's point (09a):** the kit's heave cues a pointUp at the plate 1.25 s after it lands. A verdict at plate + 1.15 s starts the relight beat's point at + 1.29 s, after that key, so he points at year 9 (not the plate) through the hold; at + 1.0 s he would point up at the plate all through it.
- **Scoreboard (09c):** a landing's bump runs 0.36 s and the next count starts 0.12 s after its cut, so cuts 0.39-0.47 s after each landing keep the board moving; the first cut at 0.5 s follows frame 1's landing bump (to 0.31 s). The hero takes the blank 0.73 s after the year-40 landing and the verdict's make-room scroll (verdict − 0.35 s) starts 0.24 s after the hero's bump: the hero splits the 1.33 s between the landing and the scroll so that neither wait reaches 0.4 s (0.37 s each, measured with the caption band out). The first cut had it at landing + 0.8 s with the scroll 0.17 s after its bump; the wait before it was then 0.43 s near-still with only the multiplier caption rising in (fixer pass).

**Iteration** (every version linted clean):
1. **09a v1** (rungs 0, 1.75, 3.05, 4.95, 7.0, 8.25, 9.55, 11.15; verdict at plate + 1.3 s): the opening held still for 0.43 s (0.03-0.47: with the caption complete on frame 1 nothing moved until the kit's nod at 0.35 s), and 12.07-12.47 was near-still (0.40 s) before the verdict. **v2**: the opening shrug at t 0 (moving from 0.14 s) and the verdict at plate + 1.15 s: the longest still run before the verdict fell to 0.30 s. **v3**: the shrug at t −0.12, moving from frame 2.
2. **Sound (09a).** v3's audio failed BANDS: 2 kHz +0.1 dB over its 0 dB ceiling. The stems show why: the kit's verdict ding (F#6 + A6, the D chord's 3rd and 5th) carries about 38% of the mix's 2 kHz octave over the body, and the hit and cash at P about another 20%. A shorter body makes them a larger share (the shipped 28.5 s cut already sat 0.1 dB under the ceiling, BIBLE §11.2). No spec timing can move that ding off D: a verdict 0.8-1.5 s after P falls in the DROP's first bar, the tonic, because 4 beats take at least 1.76 s at Becker's 136 BPM limit. About 30 audio-only `verify --no-video` variants (verdict + 0.9 to + 1.3 s, hold 1.4-1.6 s, rung gaps ± 0.1 s, the pop's gain 0.5-1.5) read 2 kHz −0.2 to +0.5 dB; three passed at 0.0. **The cut** is one of them: the first gap 1.85 s (was 1.75), everything else as v3.
3. **09b**: the first draft (verdict at plate + 1.05 s, 14.0 s) failed BANDS twice: 2 kHz +0.1 over 0 and 8 kHz −4.9 over −5. Ten variants (verdict + 0.95 to + 1.15 s, rung gaps 1.35-1.45 s, heave gaps 2.5-2.7 s, hold 1.5 s): **the cut** is the verdict at + 0.95 s (12.3 s, a 13.9 s body), the one variant with every octave ≥ 0.1 dB inside its window.
4. **09c**: the first draft (rows −0.4, 0.6, 1.95, 3.4, 5.1, 6.85; hero + 0.78, verdict + 0.95) was near-still for 0.47 s at the opening (the first cut at 0.6) and for 0.40 s between the hero's bump and the make-room scroll. With the first cut at 0.42 and the verdict at hero + 0.85 its audio failed BANDS: 125 Hz +1.8 under its 2 dB floor, with B8's logo at −12.88 LUFS (0.12 over −13). Eight variants (cut spacing, hero + 0.76 to + 0.86, verdict + 0.85 to + 0.95, hold 1.5): anchoring the verdict (≥ 4 beats after P) made 125 Hz worse (+1.2); **the cut** (rows −0.4, 0.5, 1.95, 3.45, 5.2, 7.0; hero + 0.8; verdict + 0.88) passes with 125 Hz at +2.1 on the delivered file and B8 at −12.39. (The fixer pass moved the hero to + 0.73, so the verdict is now hero + 0.95; the hero beat carries no cue, and the master is byte-identical.)

**Measured after** (the final renders, after the fixer pass, same method; "caption band out" measures the top 1320 px, above every caption (the band starts at y ≥ 1337 in every still before the verdict; the Becker ground line is at y 1304, the Scoreboard board ends by y 1293), and counts it against the full frame: the crop's YAVG × 330/480, i.e. the full-frame audit with the caption band's pixels removed):

| | Still runs ≥ 0.4 s | Before the verdict: still runs ≥ 0.2 s (full frame) | Near-still ≥ 0.2 s (full frame) | Caption band out, ≥ 0.25 s |
|---|---|---|---|---|
| 09a | **only the verdict hold, 12.83-14.03**, and the card hold, 15.23-16.50 | 0.20-0.40, 1.03-1.23, 2.33-2.53, 3.47-3.70, 3.83-4.13 (0.30), 5.87-6.17 (0.30), 7.53-7.73 | + 5.83-6.20 (0.37), 8.83-9.03, 12.13-12.37 | still 3.83-4.13 (0.30), 5.87-6.17 (0.30); near-still + 5.83-6.20 (0.37), 12.13-12.40 (0.27) |
| 09b | **only the verdict hold, 12.87-13.93**, and the card hold, 15.13-16.40 | six runs of 0.20 s (0.20, 0.93, 2.33, 3.73, 5.13, 7.93) | all ≤ 0.23 s | none before the verdict; near-still 12.23-12.63 (0.40) straddles the verdict's landing at 12.3 (the plate's celebration settling while the verdict pops in, in the excluded band; the full frame moves there) |
| 09c | **only the verdict hold, 11.47-12.83**, and the card hold, 14.30-15.30 | 10.67-10.90 (0.23) | + 0.13-0.50 (0.37, the opening: frame 1's landing bump, then the first cut), 10.53-10.90 (0.37) | still 0.23-0.50 (0.27), 10.57-10.90 (0.33); near-still 0.13-0.50 (0.37), **9.90-10.27 (0.37)**, 10.53-10.90 (0.37) |

- **Before the verdict the longest still run is 0.30 s on the full frame** (was 3.17 / 2.87 / 3.50 s) and 0.33 s with the caption band out (09c 10.57-10.90), and nothing is near-still for 0.4 s on either metric.
- **Corrected in the fixer pass:** this table first measured the caption band out as the top 1100 px (Becker) or 1300 px (Scoreboard) scaled by 480/h to a "full-frame equivalent". That inflated motion (× 1.75 / × 1.48), and the 1100 px crop also cut off the figure's legs and the bottom rungs. Re-measured correctly, the first cut's renders read 0.43 s near-still in 09c (9.90-10.33, between the year-40 landing and the hero; reported as 0.27 s), the critic's item, now 0.37 s; 09a and 09b read as above.
- **Frame 1:** 09a's and 09b's covers are the hook, the first rung and the complete first caption; the figure moves from frame 2 (frame differences 0.80, 0.91, 0.66, 0.69 and 0.42 over frames 2-6 in 09a, 0.79, 0.90, 0.65, 0.69 and 0.42 in 09b, then a 0.20 s lull before the kit's nod). 09c's cover is unchanged (row 1 landed, its bump and glow settling over frames 2-4: 0.65, 0.82, 0.59).
- Near-still stretches where only a caption changes: none of 0.4 s. The longest are 09c's 9.90-10.27 (the multiplier caption rising in before the hero) and 09a's 5.83-6.20 (the figure's point after the year-9 hop, with the tag and the gauge pulse settling), 0.37 s each.

**Stills read** (`node src/cli.mjs stills specs-wip/<id>.json --at …`; the first cut's, two contact sheets each in `/tmp/cond/09/st/`, then the fixer pass's):
- 09a at 0, 0.03, 0.1, 0.3, 0.9, 1.85, 2.75, 3.15, 3.4, 4.2, 5.05, 5.3, 5.6, 6.2, 7.1, 7.25, 8.35, 9.65, 10.0, 10.6, 11.25, 11.5, 12.1, 12.4, 12.8, 13.95, 14.5 and 16.45: frame 1 is the hook with ≈ $1,245 / ≈ $8 and the working line, and he has started his shrug at 0.03; every rung lands on its cells and working line (≈ $49, ≈ $89 with "under $100", ≈ $105 swollen with "beats your $100", ≈ $231, ≈ $393, ≈ $634, ≈ $994 on the gold plate); the coin is in the air for each throw and the tags never overlap a coin; at 12.8 and 13.95 rung 9 is relit in its green plate, he points at it, and the verdict and "$50 or $500/mo: still year 9" are up; the end card is unchanged.
- 09b at 0, 0.1, 0.3, 0.9, 1.75, 2.7, 3.15, 4.55, 5.5, 5.95, 7.35, 8.3, 8.75, 9.15, 9.5, 9.8, 10.1, 10.5, 10.95, 11.35, 11.6, 12.0, 12.3, 12.7, 13.5, 13.85, 14.5 and 16.35: the cover has $1,000 / $1,070 on rung 1 and "Age 1: $1,070."; every rung (≈ $1,967, ≈ $3,380, ≈ $5,427, ≈ $7,612, ≈ $14,974, ≈ $29,457) lands under its caption; the heave reads (the coin in his arms at 9.5, overhead at 9.8-10.95); ≈ $81,273 lands on the plate at 11.35 with its burst clear of the labels; the verdict is up at 12.7-13.85.
- 09c at 0, 0.1, 0.3, 0.5, 0.7, 1.48, 1.95, 2.5, 3.05, 3.45, 4.0, 4.81, 5.2, 6.0, 6.61, 7.0, 8.0, 9.0, 9.52, 9.95, 10.32, 10.5, 10.9, 11.2, 11.4, 12.0, 12.75 and 15.25: the hero and each row land on ≈ $377, ≈ $2,166, ≈ $5,203, ≈ $15,438, ≈ $35,571 and ≈ $75,176, each with its caption; "× 75,176" under "YEAR 40 ≈ / DAILY AMOUNT" at 10.32-10.9; the rows scrolled to 20-30-40 with the verdict stack at 11.2-12.75 and the hero dimmed; the end card at 15.25.
- Fixer pass (`/tmp/cond/09/fix/st/{a,b,c}-sheet{1,2}.png`): 09a at 0, 0.1, 1.85, 3.15, 4.2, 5.05, 5.6, 7.1, 7.5, 7.95, 8.35, 9.65, 10.2, 10.5, 10.85, 11.1, 11.25, 11.5, 12.4, 12.8, 13.95 and 14.5: the year-9 line is still up over rung 15 at 7.5, "Year 20…" types on at 7.95 with the coin in the air, the heave (10.2-10.5) shows "Year 20: about $393 a month.", "Year 30…" types on at 10.85 and reads in full at 11.1 as the coin flies, the plate lands at 11.25. 09b at 0, 0.1, 1.75, 3.15, 5.95, 8.3, 8.75, 9.5, 10.0, 10.5, 10.9, 11.0, 11.2, 11.35, 11.6, 12.0, 12.25, 12.3, 12.7, 13.85 and 14.5: the heave frames (9.5-10.9) show "At 50: about $29,457." under an empty top rung; "At 65…" types on at 11.0 and reads in full at 11.2, with the coin in flight; the plate lands at 11.35; the verdict at 12.7-13.85. 09c at 0, 0.5, 3.05, 7.0, 9.0, 9.52, 9.8, 9.95, 10.1, 10.2, 10.25, 10.4, 10.6, 10.75, 10.85, 11.0, 11.2, 11.4, 12.75 and 15.25: ≈ $75,176 lands at 9.52, the multiplier caption rises in at 9.95-10.1, "× 75,176" under "YEAR 40 ≈ / DAILY AMOUNT" from 10.25, the scroll from 10.85, the verdict stack at 11.2.

**Lint:** `node src/cli.mjs check specs-wip/<id>.json`: 0 errors, 0 warnings for each (16.5 s = 14.0 + 2.5; 16.4 s = 13.9 + 2.5; 15.3 s = 12.8 + 2.5).

**Render and sound** (`render specs-wip/<id>.json --out /tmp/cond/09/<id>/final/render`, then `sound … --video …/render --out …/final --score`; every mux kept the render's video md5):

| | Frames, sfx | Video md5 | Sound | §2.3 row for promotion |
|---|---|---|---|---|
| 09a | 495, 24 | `4b327fd3bee5` (fixer pass; first cut `c417be115d75`) | −14.01 LUFS, P 11.25 (riser), 128 / 130.909 BPM, onsets ≤ 0.25 ms; master `e69fd28e6e3a4291…` | `\| 09a \| riser \| 11.250 \| 24 (r0) \| 128.000 \| base 14.00: 6 (r2) @ 130.91 \| 14.50 \|` |
| 09b | 492, 24 | `bb90bfe74d20` (fixer pass; first cut `c6130d2947b3`) | −14.01 LUFS, P 11.35 (riser), 126.872 / 117.647 BPM, onsets ≤ 0.31 ms; master `6508af7e3ae35f6e…` | `\| 09b \| riser \| 11.350 \| 24 (r0) \| 126.872 \| base 13.90: 5 (r1) @ 117.65 \| 14.40 \|` |
| 09c | 459, 20 | `be7e28b3687a` (fixer pass; first cut `aea1572a0455`) | −14.09 LUFS, P 9.52 (riser), 151.261 / 146.341 BPM, onsets ≤ 0.08 ms; master `19c21120229cee6d…` | `\| 09c \| riser \| 9.520 \| 24 (r0) \| 151.261 \| base 12.80: 8 (r0) @ 146.34 \| 13.16 \|` |

V is anchored in none of them (each verdict lands under 4 beats after P). The rows they replace: 09a P 19.400, 40 beats at 123.711, V 24.20, base 28.50, L 29.00; 09b P 17.800, 36 at 121.348, base 27.00, L 27.50; 09c P 19.120, 46 at 144.351, V 25.60, base 31.50, L 31.86.

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/09/<id>/final --detail`): **PASS, 42/42 gated for each**; units 64/64 (09a) and 64/64 (09b) for Becker Rig (the kinds these cues use), 69/69 for Scoreboard (09c). The CUE DRIFT block (the one teaser) and "baseline DIFFERS" are expected for a WIP cut. These are the packs at HEAD 1cbb8b3: a parallel short-body sound pass refit Becker Rig's `MODEL` (06:31) and Scoreboard's `calibration.json` (06:36) while this pass ran, so all three were rebuilt and re-verified after both, with byte-identical masters (sha256 `e69fd28e…`, `6508af7e…`, `19c21120…`) and the same results. The audio-only sweeps that chose the timings ran partly on the packs before that refit. The fixer pass rebuilt and re-verified all three on its new renders (packs still at 1cbb8b3): the same masters, and every gated line below identical; only A13's video md5 changed. Each gated check against its limit, margin in brackets (09a / 09b / 09c):
- A1 delivery −14.10 / −14.11 / −14.15 LUFS (±1: 0.90 / 0.89 / 0.85); master −14.01 / −14.01 / −14.09 (±0.3: 0.29 / 0.29 / 0.21).
- A2 −1.20 / −1.17 / −1.40 dBTP against −1.0 (0.20 / **0.17** / 0.40).
- A3 LRA 5.94 / 5.65 (3-8: 2.06 / 2.35) / **4.28 (4-9: 0.28)**.
- A4 short-term max −10.93 / −10.99 / −11.86 against −8 (2.93 / 2.99 / 3.86); momentary −8.89 / −9.15 / −7.98 against −6 (2.89 / 3.15 / 1.98).
- A5 PLR 12.90 / **12.94** / 12.75 against 13 (0.10 / **0.06** / 0.25): closed-loop encode targets, as in every teaser.
- A6 0% silent. A7 −11.84 / −12.50 / −7.98 against −18 (6.16 / 5.50 / 10.02). A8 correlation 0.88 / 0.88 / 0.77 (≥ 0.3), minimum 0.56 / 0.44 / 0.48 (≥ −0.1), mono fold −0.45 / −0.48 / −0.67 LU (±1.5). A9 DC ≤ 1.3e-5 against 1e-4. A10 phone drop 1.60 / 1.69 LU against 4.5 (2.90 / 2.81), 2.31 against 7 (4.69).
- A11 1.077 / 1.219 / 0.654% against 3% (1.92 / 1.78 / 2.35 points); max 3.6 / 2.65 / 1.79 dB against 6.
- A12-A14: AAC LC stereo 48 kHz, 16.500 / 16.400 / 15.300 s against the video; video md5 identical; masters unique.
- **BANDS** (dB re 1 kHz, margin to the nearer edge of the look's window):
  - 09a (Becker): 31.5 −10.2 (5.8), 63 2.6 (4.4), 125 4.2 (2.8), 250 0.6 (0.6), 500 2.0 (2.0), **2000 0.0 (0.0, on its ceiling)**, 4000 −4.1 (2.1), 8000 −6.0 (1.0), 16000 −16.8 (4.8).
  - 09b (Becker): 31.5 −10.6 (5.4), 63 2.3 (4.3), 125 4.4 (2.6), **250 0.1 (0.1)**, 500 1.8 (2.2), 2000 −0.3 (0.3), 4000 −4.0 (2.0), **8000 −5.2 (0.2)**, 16000 −16.4 (4.4).
  - 09c (Scoreboard): 31.5 −16.1 (3.9), 63 5.5 (1.5), **125 2.1 (0.1)**, 250 0.3 (0.3), 500 −0.4 (0.6), 2000 −1.9 (1.9), 4000 −6.7 (2.3), 8000 −7.3 (2.3), 16000 −12.7 (0.7).
- HARSH −0.90 / −1.15 / 0.34 against 2 (2.90 / 3.15 / 1.66).
- B1 Becker music −2.43 / −2.51 (−4.5..−0.5: 1.93 / 1.99), SFX − music 0.01 / 0.16 (±2), returns −10.33 / −10.36 (≤ −8); Scoreboard music −2.85 (−3.5..−1.5: 0.65), SFX −3.41 (−5..−2.5: 0.91).
- B2 duck at P −9 / −9 / −10.8 dB against −8 (1.0 / 1.0 / 2.8). B3 closest cue 6.2 / 4.6 / 4.4 dB over the music against 3 (3.2 / 1.6 / 1.4). B4 onsets 0.25 / 0.31 / 0.08 ms against 2. B5 0.0 / 0.0 / −1.3 ms against ±10. B6 2.8 / 2.2 / 5.0 LU against 18. B7 drop-build 2.8 and 3.3 / 2.6 and 3.3 / 5.4 and 5.1 against 2 (0.8 / 0.6 / 3.1 at the tighter).
- **B8 logo −12.04 / −12.00 / −12.39 LUFS against −13 (0.96 / 1.00 / 0.61)**, under the payoff's −11.36 / −11.06 / −10.94.
- B9 quietest −30.2 / −28.3 / −24.2 against −45. B10 no flams. S1 99.5 / 99.5 / 100% in key (≥ 97). S2-S8, S10, S11, S13 pass. S9 128 / 130.909 (segment 1 at the top of 112-128), 126.872 / 117.647 (−7.3% of ±8%), 151.261 / 146.341 (136-152; −3.3%). S12 pad moves 5 / 5 / 3 st (≤ 5). S14 12 notes against 12, as in every teaser. MALLET −7.3 / −7.0 LU (≥ −10). TRAIN and DUCK (09c, 0.5 dB extra) pass. B1w (reported, not gated): 09a's music sits at −2.43, outside its as-written −4.5..−2.5 window; 09b's passes.

**Check (`checks/09-growth-ladder.py`):**
- `--spec [KEY=]PATH` (repeatable; KEY a/b/c, 09a/09b/09c or the full id) checks a file in place of `studio/specs/<id>.json`. Each spec is checked as the narration cut (28.5 / 27.0 / 31.5 s) or the condensed cut (a 12-16 s body) by its length; any other length fails "a known cut". `IN_SPECS` names the cut `studio/specs/` must hold (the narration cuts until promotion). Every string, number, row and claim is shared by both cuts, and every spec must sit on a frame.
- New for the condensed cut (docstring 4.): captions up ≥ max(1.2 s, 0.12 s a word) from frame 1, back to back, the first complete on frame 1 (Becker ≤ −0.48 s, Scoreboard ≤ −0.14 s); each number caption up while its row lands (Becker: up ≤ 0.5 s before, ≥ 0.5 s after (1.3 s until the fixer pass); Scoreboard: up with the row's cut, ≥ 0.25 s past the kit-clock landing); the verdict 0.8-1.5 s after the final reveal (the plate, or 09c's hero beat) and held 1.2-1.6 s; Becker motion: rung gaps ≤ 1.7 s without an act and ≤ 2.1 s with one, rung 2 ≥ 1.6 s, the opening act-only beat (t in (−0.14, −0.107], ≥ 0.3 s long), each teaser's heave (09a short 1.4-2.2 s, 09b long 2.3-3.15 s), 09a's tags up ≥ 1.0 s, the verdict's point after the heave's pointUp, and no other act-only beat; Scoreboard motion: the first cut ≤ 0.5 s, every later cut ≤ 0.5 s after the previous landing, the hero 0.6-0.75 s after the year-40 landing (0.6-0.9 until the fixer pass), the make-room scroll ≤ 0.25 s after the hero's bump, and the hero beat while its caption is up.
- Results: 515 checks, 0 failed by default (was 509: three "which cut" rows and three frame rows); 523 / 522 / 521, 0 failed with each WIP spec; 536, 0 failed with all three; a copy of the narration 09a passed with `--spec a=…` from outside `studio/specs/` checks as the narration cut.
- Mutation test (scratch copies in `/tmp/cond/09/mut/`, `tools/mutate.py`): **25 of 25 caught**, each with exit 1 and a named failure: 09a vo[0] at 0.0; the verdict 0.6 s and 1.1 s after the plate; a 2.0 s hold; no opening act; the opening act at t 0; year 15 0.4 s later (a 2.45 s gap); a 0.35 s caption gap; a 1.0 s caption; "about $106"; "about" dropped; the "beats your $100" tag up 0.86 s; the year-8 caption 1.6 s early; a 17.0 s body. 09b: a 2.0 s (short) heave gap; the age-65 caption 2.0 s early; rung 2 at 1.4 s; a plain 1.85 s gap. 09c: the first cut at 0.8 s; the hero 0.3 s later; the verdict 0.4 s later; the year-20 caption 0.3 s before its cut; "× 75,177"; row 1 at 0.0 (a count in flight on frame 1); vo[0] at −0.1. The fixer pass re-ran them with six more (`/tmp/cond/09/fix/mutate.py`, results in `/tmp/cond/09/fix/mut/result.txt`): **31 of 31 caught**.

**To promote** (step 1 was done on 2026-10-13, see "Promoted (2026-10-13)" at the end of this log):
1. Copy the three WIP specs over `studio/specs/` and set `IN_SPECS` to "condensed" for all three in the check (the narration sets then serve git-history copies passed with `--spec`).
2. BIBLE §11.1 for the moved records (all three): refit Becker's `MODEL` (§11.2) and re-measure Scoreboard, store the records in `test/fixtures/cues.json`, `tempo-table --write` (the three rows above), then `verify --strict-cues` and `npm test`.
3. After the refit, re-check the margins that sit at or near an edge: **09a BANDS 2 kHz 0.0**, **09b BANDS 250 Hz 0.1 and 8 kHz 0.2, A5 0.06, A2 0.17**, **09c BANDS 125 Hz 0.1, A3 LRA 0.28, A1 master 0.21, B8 0.61**. If one flips, fix it at pack level, not by retiming these specs: the Becker pair's 2 kHz octave is the kit's verdict ding (F#6 + A6 on the DROP's tonic, which a verdict 0.8-1.5 s after P cannot leave) plus the hit and cash at P, in a 14 s body (the §6.7 crowding rule reads the 1 kHz octave only); 09c's 125 Hz floor is six landing dings (gain 0.5) against the 808 in a 12.8 s body.
4. Ship by §11.5 from a picture folder holding these three renders (or fresh renders of the promoted specs) and `renders/channel/` for the others.
5. Publishing: rebuild the three sheets (`build_publishing.py <id> --covers`, then `--check`). The covers change: 09a's frame 1 now carries the complete first caption, 09b's frame 1 has rung 1 at $1,070 and its caption, 09c's is as before. `teasers/v2/teasers.json`: runtimes 16.5, 16.4 and 15.3 s (were 31.0, 29.5 and 34.0).

**Open items:**
- The sound margins above, the set's thinnest after this cut (09a's 2 kHz on its ceiling; the shipped cut had 0.1 dB).
- The bodies (12.8-14.0 s) are shorter than 06c's and 06b's (15.7, 18.3 s): a ladder has one beat per rung and no race in between, and every caption still gets ≥ 1.4 s (09c's multiplier line exactly 1.2 s). 09c's "× 75,176" is up 0.95 s before the verdict lands; it stays on the dimmed hero through the 1.6 s hold.

### Condensed cut, fixer pass (2026-10-13, after the critic)

**The critic's verdict:** pass, no musts. Scores 09a 8, 09b 7.5, 09c 7.5. It reproduced the motion audit on the final MP4s (the only still runs ≥ 0.4 s are the verdict and card holds) and found two shoulds in the picture, three in the sound and three nits. The kit is untouched, so no default-unchanged proof is needed (`looks/*/formats/growth-ladder.js` unchanged since d350c05).

**Applied** (spec times only: no text, number, row, verdict, `sfx` or kit change; `studio/specs/` untouched):

| Item | Severity | Was | Now | Why |
|---|---|---|---|---|
| 09b: the age-65 line answered the hook during the heave | should | vo[3] 8.3-10.05; vo[4] "At 65: about $81,273." 10.1-12.25 (readable from about 10.3, 1.05 s before the plate at 11.35) | vo[3] 8.3-**10.9** (d 2.6); vo[4] **10.95-12.25** (d 1.3, ≥ 1.2 s for 4 words) | The line now leads the plate by 0.4 s, like every other age line (0.45 s), and appears as the coin flies, so the plate is the reveal. The heave frame, the suggested IG cover, shows "At 50: about $29,457." |
| 09c: near-still before the hero | should | hero beat at 10.32 (landing + 0.8): 9.90-10.33 near-still with the caption band out (0.43 s), only the multiplier caption rising in | hero at **10.25** (landing + 0.73); verdict stays 11.2 (now hero + 0.95); the make-room scroll 0.24 s after the hero's bump | Both waits are now 0.37 s (9.90-10.27 and 10.53-10.90, caption band out). The full-frame audit reads 0.23 s still and 0.37 s near-still after the hero (it read 0.30 s before) |
| 09c: the write-up's caption-band-out column | should | top 1100 / 1300 px scaled × 480/h | top 1320 px counted against the full frame (× h/480) | The scaling inflated motion, and the 1100 px crop cut off the figure's legs and the bottom rungs. Re-measured: see "Measured after" above |
| 09a: year-20 and year-30 lines led their rungs by 1.1 and 1.25 s | nit | vo[2] 4.6-7.2; vo[3] 7.25-9.95; vo[4] 10.0-12.35 | vo[2] 4.6-**7.85**; vo[3] **7.9-10.75**; vo[4] **10.8-12.35** (d 1.55, ≥ 1.2 s for 9 words) | Both now lead by 0.45 s, with the coin in the air. The heave shows "Year 20…", not the biggest number. The year-9 line stays up 0.75 s past rung 15's landing; that is the cost |
| 09c: "Year 40: about $75,176." readable (grey) 2.3 s before the roll lands | nit (optional) | — | **accepted** as the format's grammar | The highlight reaches the number with the landing (≈ 9.0-9.2 s). A later start would leave the 2.4 s roll uncaptioned or captioned "Year 30", and the multiplier line after it needs its 1.2 s before the verdict. Noted under 09c's captions |
| Write-up: four stale lines | nit | 09a's look note (the year-20 act-only beat); the linter paragraph ("09b carries no `lookOpts`"); 09a's "Keep this voiced"; 09b's IG cover (the heave frame showed the answer) | rewritten | The narration-cut details are now marked as history |

**No audio cue moved.** `node src/cli.mjs cues` before and after: the records differ only in `vo` (09a, 09b) and `beats` (09c), and every `sfx` list is identical. The engine carries `vo` and `beats` in its timeline (`src/sound/cues.mjs`, `timeline.mjs`) but never reads them. The rebuilt masters are byte-identical to the first cut's: `e69fd28e6e3a4291…`, `6508af7e3ae35f6e…`, `19c21120229cee6d…`.

**Check (`checks/09-growth-ladder.py`):**
- `BR_CAP_LEAD` 1.3 → **0.5 s**. A Becker number caption goes up at most 0.5 s before its rung, including the last line, the hook's answer, before the plate.
- `SB_HERO_AFTER` (0.6, 0.9) → **(0.6, 0.75) s** after the year-40 landing.
- Counts are unchanged: 515 checks, 0 failures by default (the narration cuts in `studio/specs/`); 536, 0 failures with the three WIP specs; 523 / 522 / 521 with one each.
- The first cut's WIP specs now fail exactly the critic's four rows: 09a vo[3] (lead 1.10) and vo[4] (1.25), 09b vo[4] (1.25), 09c hero (0.8).
- Mutation test: 31 of 31 caught (`/tmp/cond/09/fix/mutate.py`, `/tmp/cond/09/fix/mut/result.txt`). That is the 25 above plus six new ones, each the first cut's value or the boundary put back:
  - 09a's year-20 line at 7.25;
  - 09a's year-30 line at 10.0;
  - 09b's age-65 line at 10.1;
  - 09b's age-65 line 0.6 s early;
  - 09c's hero at 10.32;
  - 09c's hero at 10.3.

**Verified:**
- **Lint:** `check specs-wip/<id>.json`: 0 errors, 0 warnings for each (16.5 / 16.4 / 15.3 s).
- **Stills read:** two contact sheets each in `/tmp/cond/09/fix/st/` (times under "Stills read" above).
- **Renders:** `/tmp/cond/09/<id>/final/` (picture in `render/`; the muxed MP4, `sound/` and `verify.txt` beside it). The first cut's renders were deleted to free disk; its verify results are the list above.
- **Motion:** as in "Measured after" above. Frame 1 is unchanged in all three: in 09a and 09b the figure moves from frame 2, and in 09c the landing bump moves frames 2-4.
- **Sound** (`sound … --score`, then `verify … --detail`): **PASS, 42/42 gated for each**, every line identical to the list above (only A13's video md5 changed: `4b327fd3bee5`, `bb90bfe74d20`, `be7e28b3687a`). CUE DRIFT (1) and "baseline DIFFERS" are expected for a WIP cut.

**Not applied: the critic's three sound shoulds.** They belong to the ship step. Each margin below is unchanged by this pass, because no cue moved. The critic's diagnosis and remedy for each:
- **09a**
  - Margins: BANDS 2 kHz 0.0 dB re 1 kHz against a 0 ceiling (no margin); A5 PLR 12.90 against 13 (0.10); A2 −1.20 dBTP against −1.0 (0.20); A1 master −14.01 (0.29); next BANDS 250 Hz 0.6, 8 kHz 1.0, B7 0.8.
  - Cause: the kit's verdict ding (F#6 + A6 on the DROP tonic, about 38% of the 2 kHz octave) and P's hit and cash (about 20%) in a 14 s body. A verdict 0.8-1.5 s after P cannot leave that chord.
  - For the ship step: a pack-level rule (extend the BIBLE §6.7 crowding rule from the 1 kHz to the 2 kHz octave, or trim the verdict ding's 2 kHz share in short bodies) and the Becker `MODEL` refit on the promoted records; then re-check 2 kHz with `verify --detail`.
- **09b**
  - Margins: BANDS 250 Hz +0.1 against a 0 floor (0.1), 8 kHz −5.2 against a −5 ceiling (0.2), 2 kHz −0.3 against 0 (0.3); A5 12.94 (0.06); A2 −1.17 (0.17); A1 master −14.01 (0.29).
  - Cause: as 09a, plus 250 Hz on its floor. It was the only one of ten timing variants with every octave ≥ 0.1 dB inside its window, so the next pack change can flip it.
  - For the ship step: the same rule and refit (§11.2); re-check 250 Hz and 8 kHz first.
- **09c**
  - Margins: BANDS 125 Hz +2.1 against a 2 floor (0.1), 250 Hz +0.3 against 0 (0.3); A3 LRA 4.28 against a 4 floor (0.28); A1 master −14.09 (0.21); A5 12.75 (0.25); A2 −1.40 (0.40); next B1 music 0.65, B8 logo 0.61, 16 kHz 0.7.
  - Cause: six landing dings (gain 0.5) outweigh the 808 in the reference octave in a 12.8 s body, and the short body compresses LRA.
  - For the ship step: re-measure Scoreboard (§11.2) on the moved record; if 125 Hz or LRA flips, fix it at pack level.

No spec was retimed for sound, and `acceptance.json` is untouched.

### Promoted (2026-10-13)

The three condensed cuts (after the fixer pass) were copied from `studio/specs-wip/` over `studio/specs/` (commit 480efc1) and `IN_SPECS` is "condensed" for each: 536 checks, 0 failures by default, and 515, 0 failures on git-history copies of the narration cuts passed with `--spec` (`git show 480efc1^:studio/specs/<id>.json`); the sound refit and the ship follow (`renders/channel/` keeps the narration cuts until then).

### Shipped (2026-10-13): 09a, 09b, 09c

- **Sound (BIBLE v2.5).** The promotion moved the cue records of all 12 condensed cuts and recuts (07a-10c), so BIBLE §11.1 ran for the batch:
  - Both looks were refit on the fresh records: Scoreboard's calibration and Becker Rig's `MODEL` (round 3; §11.2).
  - Both packs gained rules for the payoff of short bodies: Scoreboard the payoff's own range (the DROP lift, with A3's floor read from `acceptance.json`), room and burst at P, and a 2 kHz floor (§4.7); Becker Rig the payoff stack, the P ding with the hit, the landing and a re-measured card (§6.7 items 7-8).
  - The records were stored in `test/fixtures/cues.json` (one line per teaser, so the diff is the batch's 12 lines), `tempo-table --write` rewrote the 12 §2.3 rows, and `npm test` passes 28/28.
  - No spec, cue gain or `acceptance.json` threshold was touched.
  - The margins the critic left for the ship step (09a's and 09b's 2 kHz and 250 Hz octaves, 09c's 125 Hz and LRA) all pass on the refit packs: see the table.
  - 09b's moved record has a swipe and thud every 1.4 s (its throws), which BIBLE §2.1 now lists. 09a and 09c lost their V anchors (their verdicts fail §2.3's V rule: 09c's would need a tempo 5.6% under BPM₁), so their §2.3 rows have a base segment only.
  - BIBLE Appendix A's worked examples are 09c (A.1) and 09b (A.2), so both tables were regenerated from the new records (A.1: 24 beats at 151.261 BPM to P 9.520, 8 beats at 146.34; A.2: 24 beats at 126.872 BPM to P 11.350, 5 beats at 117.65), and the test pins in `test/sound.test.mjs` follow them.
- **Verify.** `verify --from <build> --strict-cues --video <pictures>` passes all 30 at 42/42, with units at 69/69 and 77/77. The pictures were the reviewed renders of the promoted specs for the batch and `renders/channel/` for the other 18. The masters are byte-identical to the sound designers' final builds, and the batch's exact BANDS margins match their after-tables to 0.005 dB, so nothing regressed. This format's §2.3 rows and measurements:

  | Teaser | §2.3 row (P, BPM, base) | A1 / A2 / A5 | Tightest BANDS octaves (dB inside) | B3 closest cue | B8 logo / payoff (LUFS) |
  |---|---|---|---|---|---|
  | 09a | P 11.25 (riser), 128.000 → 130.91, base 14.00 | −14.17 / −1.30 / 12.87 | 250 Hz 1.22, 2 kHz 1.67 | 6.2 dB | −12.28 / −11.01 |
  | 09b | P 11.35 (riser), 126.872 → 117.65, base 13.90 | −14.10 / −1.50 / 12.60 | 4 kHz 1.33, 250 Hz 1.49 | 4.6 dB | −12.17 / −10.55 |
  | 09c | P 9.52 (riser), 151.261 → 146.34, base 12.80 | −14.17 / −1.40 / 12.77 | 500 Hz 0.74, 250 Hz 0.98 | 4.4 dB | −11.83 / −11.12 |

  Margins in this format (BIBLE §11.2): 09c's 500 Hz octave, at 0.74 dB inside, is the tightest of the three; every other octave is at least 0.98 dB inside (09c 250 Hz).

- **Shipped by §11.5.**
  - The build went to `/tmp`, not into `renders/channel/`. Every mux kept its source's video md5, and the files were then copied into `renders/channel/`.
  - `verify --from <build> --write-baseline` rewrote `test/fixtures/sound-baseline.sha256`.
  - Both packs changed, so all 30 masters differ from the previous (v2.4) baseline. All 30 MP4s in `renders/channel/` changed with them, and the 18 pictures outside the batch are unchanged.
  - The audit of `renders/channel/` used `--out` in `/tmp`, so no sidecar was written into `renders/`. All 30 teasers pass 16/16 symbolic score checks.
  - This format's files:

  | Teaser | Shipped (length, sha256) | Replaces (in git at c4a3014) | Video md5 (kept) | Audit: I / TP / LRA / PLR, score |
  |---|---|---|---|---|
  | 09a | 16.5 s, `8b0c9435…` | 31.0 s, `ccf60e08…` | `4b327fd3bee5…` | −14.17 / −1.34 / 4.99 / 12.83, 16/16 |
  | 09b | 16.4 s, `e006ea97…` | 29.5 s, `b07daebb…` | `bb90bfe74d20…` | −14.10 / −1.55 / 4.88 / 12.56, 16/16 |
  | 09c | 15.3 s, `f1316590…` | 34.0 s, `20c57655…` | `be7e28b3687a…` | −14.17 / −1.40 / 4.73 / 12.77, 16/16 |

- **Publishing.**
  - `python3 publishing/tools/build_publishing.py <id> --covers`, then `--check`, passes for all three (numbers check: PASS).
  - In the data files, the video facts (`CUT` with `shipped` and `replaces`, the Video bullet and the for-video note) now describe the shipped cut, and the Trial Reels note fetches the pre-condense render from c4a3014.
  - Moments and lengths that only the retired cut had were rewritten or dated, and no claim was added.
  - The checked-maths line records the re-run at the ship: 536 checks, 0 failed.
  - All three covers were re-picked by content on the shipped files and re-exported, with the same crops: 09a frame 18 (0.60 s, the question frame with the gauge filled; was 54); 09b frame 282 (9.40 s, the heave's buckle; was 438); 09c frame 12 (0.40 s, the question frame; was 75), where the caption's last word, '$377.', is still grey, because it lights after the row 5 cut in this cut.
  - 09b's long alt text said the figure throws a coin to every rung; in the condensed cut age 1 ($1,070) is filled from frame 1, so it now says so (no figure changed).
- **Elsewhere.** `teasers/v2/teasers.json`: runtimes 16.5 / 16.4 / 15.3 s (frame-exact). Its key-number times now name the condensed cut, with the retired cut's in brackets, and its check note records the re-run at the ship. `renders/channel/README.md` (the length table), `HANDOFF-finance-channel.md` and the BIBLE v2.5 status line name the ship.
