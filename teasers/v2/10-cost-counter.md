# Format 10: real-time cost counter, three teasers

**Channel:** Back of the Envelope (YouTube Shorts, Instagram Reels, TikTok), US audience, USD
**Date:** 2026-10-07 (round-2 revision), hook pass 2026-10-08 (10b's hook replaced), hook pass 2 2026-10-08 (10a's and 10c's hooks replaced), assembly pass 2 2026-10-08 (10a and 10c re-paced; both counters now stop on their payoff), assembly pass 3 2026-10-08 (10b fitted and QA'd in the Becker kit's stack mode), assembly pass 4 2026-10-08 (10b's QA fixes: the counter stops on its payoff, a 2-line hook, a 30-year beat and a plinth countdown), port to Scoreboard 2026-10-08 (10c moved from the retired Live Sheet look to the Scoreboard; hook, numbers, VO and verdict unchanged), fixer pass 2026-10-08 (10c's Scoreboard QA: the verdict split into two short lines so it sets bigger than the labels, "And a whole year?" moved into the riser, the climax coin grown, and three kit nits), condensed cut 2026-10-13 (the owner's "too many still moments"; written in `studio/specs-wip/`), condensed-cut fix pass 2026-10-13 (the critic's items: 10c's label beats retimed and its verdict 0.05 s sooner, 10b's verdict held for its reading time, an opt-in Scoreboard run-up pulse for 10a and 10c, and the length put to the owner), recut to the earlier verdict 2026-10-13 (the owner's answer, "Mixed": 10b ships real time as condensed; 10a stops on its $500,000 pass and 10c on half a year of median pay), recut fix pass 2026-10-13 (the critic's items: the coin's run-up starts earlier in both, `runup.from`; 10c's verdict 0.04 s later; the motion re-measured with the mask on the counter), promoted into `studio/specs/` 2026-10-13 (10a and 10c the recut, 10b the condensed cut), shipped 2026-10-13 (sound bible v2.5). What changed and why is in the **Review log** at the end.

**Recut to the earlier verdict (2026-10-13), promoted into `studio/specs/` on 2026-10-13, and shipped the same day (sound bible v2.5).** The owner's note on the set ("Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good.") was applied to all three on the 06b/06c precedent (the condensed cut: still holds gone, captions reading-paced, the hook complete on frame 1, a run-up that pulses on the beat). The condensed cuts could not get much shorter, because these counters run in real time, so the length went to the owner, and the owner answered on 2026-10-13: **"Mixed"** (Review log, *Owner decision*). **10b ships real time as condensed** (36.15 s + the 2.5 s end card = 38.65 s; its WIP spec is untouched). **10a and 10c are recut to an earlier verdict on a pass their counters already make.** "Since you hit play" stays literal: $0 on frame 1, the sourced rate, and the stop on the verdict's own number. 10a now stops on **$500,000 at 16.256 s**: "**$500K** a year: ≈ 16 seconds." (body 18.6 s, 21.1 s with the card). 10c stops on **half a year of median pay, $32,526, at 13.201 s**: "Half a year of median pay: **≈ 13 seconds**." (body 15.55 s, 18.05 s with the card). The rows past the stop are gone (10a's $1M row and its coin, 10c's year row), and the last kept row takes the coin and the run-up. The beats that came after the new stop now come before it: in 10a the $970B working and "≈ $111 million an hour", in 10c the $77.7B working and the swap-in rule. The hooks still ask what the videos answer (Review log, "Recut to the earlier verdict"). Every number on screen is one the earlier cuts already showed, verified by the check. Totals with the end card: **10a 39.0 → 37.45 → 21.1 s, 10b 39.1 → 38.65 s, 10c 33.5 → 31.25 → 18.05 s** (round 2 → condensed → recut). The specs were written in `studio/specs-wip/` and promoted into `studio/specs/` on 2026-10-13 (the round-2 specs are in git history, `480efc1^` and earlier); `renders/channel/` has shipped them since 2026-10-13, and the round-2 renders are in git at c4a3014. The beat sheets and caption tables below describe the promoted cuts: 10a and 10c the recut, 10b the condensed cut. The real-time condensed 10a and 10c are in git history (ca1087f), and the round-2 beat sheets and guide VO scripts at 4f060a8 and earlier. The Review log entries "Condensed cut", "Condensed cut, fix pass", "Recut to the earlier verdict (2026-10-13)" and "Recut, fix pass (2026-10-13)" list every change. **Recut fix pass (the critic's items):** both coins now pulse on the beat from earlier (`lookOpts.runup.from`, the kit's own opt-in key: 10a from 9.75 s, 10c from 7.60 s), because a re-measure with the mask on the counter (the earlier mask missed its top) found counter-only stretches through the swap-in rule; what is left is one stretch in each (10a 6.8-8.1 s, 10c 3.8-5.0 s, a bill's last second before its pass), carried by the counter's roll and the stream, and the full frame never goes near-still for 0.4 s before either verdict. No cue moved (both cue records are byte-identical to the recut's). 10c's verdict stays at 13.96 s (14.0 was tried and not kept), the Instagram covers move to after the last caption, and 10c's verdict wording is put to the owner as a follow-up. Sound (the ship step's): on the committed Scoreboard pack 10a passes `verify` 42/42 and 10c fails BANDS 16 kHz by 0.3 dB, as the critic found; on a snapshot of the working tree, which the concurrent Scoreboard sound pass is still changing, both pass 42/42 with thin margins. So 10c must not ship on the committed pack as it was then (Review log, fix pass; the ship step's call; the spec itself was promoted on 2026-10-13).
**Format:** `cost-counter`. No hook pattern of its own in the hook bank ("–"). The hooks borrow the grammar of P4, P5, P6, P8 and P9 winners (quoted under each teaser).
**Lane:** a real-time dollar counter at a verified rate (interest on the US debt, new US debt, a mega-company's profit per second)
**Files:**
- Specs:
  - [`studio/specs/10a-scoreboard-debt-interest-live.json`](../../studio/specs/10a-scoreboard-debt-interest-live.json)
  - [`studio/specs/10b-becker-rig-debt-vs-your-pay.json`](../../studio/specs/10b-becker-rig-debt-vs-your-pay.json)
  - [`studio/specs/10c-scoreboard-amazon-makes.json`](../../studio/specs/10c-scoreboard-amazon-makes.json) (ported from the Live Sheet on 2026-10-08; the old spec is in [`studio/specs/retired/`](../../studio/specs/retired/10c-live-sheet-amazon-makes.json))
  - Promoted from `studio/specs-wip/` on 2026-10-13: the three specs above are now 10a the recut (18.6 s + the 2.5 s end card), 10b the condensed cut (36.15 s + card) and 10c the recut (15.55 s + card). The round-2 cuts they replaced are in git history (`480efc1^` and earlier), and `renders/channel/` has shipped these cuts since 2026-10-13 (sound bible v2.5), and the round-2 renders are in git at c4a3014. The real-time condensed 10a and 10c, never promoted, are in git history too (ca1087f, `studio/specs-wip/`)
- Check: [`teasers/v2/checks/10-cost-counter.py`](checks/10-cost-counter.py). Run `python3 teasers/v2/checks/10-cost-counter.py`. It recomputes every number from the sourced inputs, rebuilds every display string, compares them with the three specs and with the caption and pinned-comment numbers in this file, prints a table and exits 1 on any mismatch.
  - **Cut-aware since the condensed cut (2026-10-13).** `--spec [KEY=]PATH` (repeatable; KEY a/b/c, 10a/10b/10c or the full id) checks a spec in place of `studio/specs/<id>.json`. A spec of the round-2 length is held to the rules below; any other length to the condensed cut's (the same strings, numbers, lookOpts and counter clock; captions paced for reading and back to back, the hook complete on frame 1, each milestone's caption up at its pass, the verdict 0.8-1.5 s after the final reveal (10c from 0.75) and held 1.2-1.6 s or its reading time, a motion proxy for the gap between them, no text holding alone over 5.5 s on the Scoreboard, and the run-up pulse on the score's beat; see the Review log). At the fix pass: 1018 checks by default, 1055 with `--spec` on the three WIP specs, 26 of 26 condensed-cut mutations caught.
  - **Recut-aware since the recut (2026-10-13).** For 10a and 10c a spec in the condensed cut's lane is checked as the condensed (real-time) cut and any other length as the recut: the same rules with the recut's lane, its strings (the round-2 strings by index, plus the new last caption, 10c's new "Next" label and question, and the new verdicts), the stop on the new last milestone within $0.50 at both rates, every label beat holding to the next one on 10a too, the kit's riser at least 0.8 s, and the run-up on the recut's own (P, N1). `BIBLE.md` §2.3 must hold the row of the cut `studio/specs/` holds; until the promotion the run prints a note naming the recut's row. The write-up's caption and pinned-comment numbers are checked against the recut (`MD_CUT`), so "$1 million ≈ 33 seconds" or "≈ 26 seconds" there fails. `--md PATH` points that scan at a scratch copy. **1019 checks, 0 failures** by default (the round-2 cuts in `studio/specs/`; one more than before because the 10a caption now says "≈ $111 million an hour"). **995 checks, 0 failures** with `--spec` on the three WIP specs (10a and 10c recut, 10b condensed). **1058 checks, 0 failures** on the git-history condensed 10a and 10c with the 10b WIP spec. **27 of 27 recut mutations caught**, and the 26 condensed-cut mutations re-run on the history copies are all still caught (Review log, recut entry).
  - **Recut fix pass (2026-10-13).** The recut's expected `lookOpts.runup` carry `from` (10a 9.7 s, 10c 7.6 s); `check_runup` counts the pulses from `from` and holds it at or before the last label beat (the riser and the cue record stay put) and at least 1.0 s after the previous pass (the coin is on the stage). **1019 checks, 0 failures** by default; **999, 0 failures** with `--spec` on the three WIP specs (4 more: the two `from` rules on each); **1058, 0 failures** on the git-history condensed 10a and 10c. **34 of 34 recut mutations caught** (the 27 above, re-based, and 7 new), and the 26 condensed-cut mutations on the history copies are all still caught (Review log, fix pass).
  - **Since the promotion (2026-10-13)** `IN_SPECS` is `{"a": "recut", "b": "cond", "c": "recut"}`: **1002 checks, 0 failures** by default (the recut 10a and 10c and the condensed 10b in `studio/specs/`); **1016, 0 failures** with `--spec` on git-history copies of the three round-2 cuts (`git show 480efc1^:studio/specs/<id>.json`); **1059, 0 failures** on the git-history real-time condensed 10a and 10c (`git show ca1087f:studio/specs-wip/<id>.json`) with the promoted 10b. The run-up rule accepts `BIBLE.md` §2.3 holding the recut's rows (16.256 / 40, 13.201 / 33) or, until the sound pass's `tempo-table --write`, the rows of the round-2 cuts `renders/channel/` then shipped (32.511 / 80, 26.403 / 66; `SHIPPED` in the check); while it held the latter, the run printed a note naming the recut's row. At the ship (2026-10-13) `tempo-table --write` wrote the recut's rows and `SHIPPED` was set to `IN_SPECS`.
  - Before the condensed cut it reported **1005 checks, 0 failures** and exited 0 (after the fixer pass on 10c: its verdict has no "1 second ≈ 2 weeks" line any more, so three fewer number checks; 1008 after the port of 10c to the Scoreboard; 999 after assembly pass 4, 981 after assembly pass 2, 949 after the assembly pass, 915 after hook pass 2, 853 after the first hook pass). Assembly pass 4 moved 10b onto the "lands on" rule (its counter now stops on the 40-year pass) and added its 30-year row. Hook pass 2 rebuilt 10a on a salary ladder and 10c on Amazon's profit in weeks of median pay (4 rows), and dropped Amazon's sales from the check. Assembly pass 2 added the median and $500,000 rows to 10a's ladder (6 pass times) and a "lands on" rule: a counter that stops on its last milestone must be within $0.50 of it at both the exact and the stored rate, and then shows it with no "≈".
  - New in round 2: every footer must carry the viewer-owned pay figure ("$1,251 … × 52") at 0.0 s; every header must ask a question; **one rounding per quantity** (any number within 5% of a computed quantity, in a spec string, a VO line, a caption or a pinned comment, must be that quantity's one shown rounding); and a list of banned overclaims ("live", "in real time", "fiscal 2026" for a 364-day window, "Under 1 second" as a universal claim). Hook pass 2 added one exemption: 10a's $30,000 salary row is an exact input that happens to sit 2.5% under the ≈ $30,800 rate, so it is not read as a second rounding of the rate.
  - As a test I broke one thing per teaser in a scratch copy: the 10a footer without the pay figure, 10b's caption back to "≈ $78,006", and 10c's vo[6] back to "≈ $2,500". It exited 1 with 7 failures, naming all three. Run against the round-1 captions, the new guards flagged "$30,758", "$78,006", "$22,733" and "fiscal 2026".
  - Hook pass 2 test, in a scratch copy: 10a's $100K label as "≈ 3.2 seconds", 10a's vo[4] moved to 9.0 s, 10c's first row as "≈ 3 weeks" and 10c's pinned comment as "≈ 1.97". It exited 1 with 10 failures, catching all four (the wrong rounding, the VO overlap and the 0.87 s sync miss, the unsourced 3, and the second rounding of 1.97 weeks).
  - Assembly pass 2 test: 10a stopped at 32.5113 s (0.04 ms before its own $1 million pass) with final "≈ $1,000,000", the median label as "≈ 2.2 seconds", and 10c stopped at 26.5 s. It exited 1 with 20 failures, catching all four (the stop before the pass, the "≈" on an exact final, the second rounding of 2.115 s, and a $65,292 stop under a $65,052 final).
  - Assembly pass 4 test, in a scratch copy of 10b: the stop at 33.275 s (QA's suggestion, $70 past the pass), the caption's no-break spaces back to plain spaces, "30 years gone." moved to 25.6 s and the stopwatch's end label back at 25.3 s. It exited 1 with 11 failures, catching all four (a $2,602,150 stop under a $2,602,080 final at both rates, the VO text, the 0.64 s sync miss and the overlap into vo[9], and the end label).

**How the facts were checked**
- **Searches:** this round used **8 of the 10** web searches allowed (round 1 used 13 of 14).
- **Fetches were blocked.** The egress proxy blocked every fetch: `api.fiscaldata.treasury.gov` (the Debt to the Penny API, by curl and by fetch), primerates.com, crfb.org, cbo.gov and thetrading.tools. Each figure below therefore rests on search results: the publisher's page, its URL and date, and the search engine's quote of the page. Pages marked **[click-check]** should be opened once before posting.
- **Two sources per on-screen figure.** Every rate input has a primary or official source plus a second publisher, or two confirmed readings of the same official series (10b).
- **Nothing unverifiable on screen.** 10b no longer claims a fiscal-year figure, because the 2026-09-30 reading could not be confirmed (Review log, item V4).
- **No market data.** No teaser uses a market price or a forecast on screen.

**Studio linter:** `node src/cli.mjs check` passes on all three specs: **3/3 clean, 0 errors, 0 warnings** (30/30 clean across the slate after the promotion of 2026-10-13); since the promotion they are the cuts linted as WIP specs in `studio/specs-wip/` before it (the recut 10a 21.1 s = 18.6 + 2.5 s end card and 10c 18.05 s = 15.55 + 2.5, 0 errors and 0 warnings each, also with `--every 0.05`, the run-up's pulses and swell included, and again after the recut fix pass, with the earlier pulses; 10b 38.65 = 36.15 + 2.5 after the condensed cut's fix pass) (rerun after hook pass 2; 10a and 10c rerun after the assembly pass and again after assembly pass 2: 2/2 clean; the four kit samples of the two edited `cost-counter` modules are clean too; 10b and the two Becker `cost-counter` samples rerun after assembly pass 4: 3/3 clean; after the port, 10c in the Scoreboard, 10a and the two Scoreboard `cost-counter` samples: 4/4 clean; the same four again after the fixer pass: 4/4 clean).
- The Scoreboard and Becker Rig `cost-counter` modules are both built (working tree), so all three specs are linted with their real counters. 10a and 10c share the Scoreboard module.
- I rendered stills at 0 s, 1.5 s and the verdict for all three (10b again at 0 / 1.5 / 3 / 25.5 / 33.4 s after the hook pass; 10a at 0 / 1.5 / 3 / 33.5 s and 10c at 0 / 1.1 / 1.5 / 3 / 26.6 / 27.5 s after hook pass 2; 10c in the Scoreboard at 0, every beat and the end after the port, and again after the fixer pass). In each, the header, the footer, the caption band and the verdict fit their zones.
- The Scoreboard kit reads every `lookOpts` key that 10a and 10c pass. The Becker kit draws 10b's block-stack, stopwatch, actions, heat keys and gag stamp (stack mode); only its `stamp` is not drawn (10b, Look note). Each spec still tells its story from the contract fields alone: the header asks, the footer carries the pay figure and the working, the counter runs, the verdict answers.

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
  - 10a: "When does it pass your salary?" The counter lights a ladder of salaries: $30,000 at ≈ 1.0 second, median pay at ≈ 2.1 seconds, $100,000 at ≈ 3.3 seconds, $250,000 at ≈ 8 seconds and $500,000 at ≈ 16 seconds, where it stops on exactly $500,000 (the recut; the round-2 and condensed cuts went on to $1 million at ≈ 33 seconds).
  - 10b: "40 years of your pay vs 1 minute of new US debt. Which is bigger?" The counter eats the 40 years in ≈ 33 seconds, 55% of the minute.
  - 10c: "How long do you work for 1 second of Amazon's profit?" Each answer slams into the label stack as the counter passes its target, and the target on the ladder turns into that answer: ≈ 2 weeks of median pay at 1.0 s, ≈ 10 weeks at 5 s, half a year of it at ≈ 13 s, where it stops on exactly $32,526 (the recut; the earlier cuts went on to a year of it at ≈ 26 s, $65,052).
- **The counter starts at frame 1, at $0** in all three, so "since you hit play" is literal: the number on screen is what passed while this viewer watched. The loop restarts the count, which is honest on every replay.
  - 10b's 2.4 s armed pause and its ding were dropped in the hook pass (2026-10-08): nothing moved in its first 1.5 s.
  - 10c: the Scoreboard counts from `counterT[0]` (0.0 s) with no preroll, so frame 1 reads $0. In the retired Live Sheet build it needed `lookOpts.preroll: 0`: without it that kit started its counter 1 s in, which made the old 10c's frame 1 read $22,733 (found by the hook-pass-2 judges).
- **The viewer's own number is on screen at 0.0 s in every teaser:** the footer carries the pay basis ($1,251 a week × 52 = **$65,052**, BLS Q2 2026), and the checker enforces it. 10a also prints its salary ladder ($30K to $500K in the recut, $1M in the earlier cuts, with the median as its own "Median $65K" row, so the footer's pay figure pays off at 2.1 s) beside the pips from frame 1, so every viewer has a row.
  - The milestones are pay yardsticks: round yearly salaries plus the median in 10a; years of median pay in 10b (3, 10, 20 and 40); weeks and months of median pay in 10c (and a year of it before the recut). The median new house left the series in hook pass 2.
  - The first payoff lands by 2.5 s in every teaser: the $30,000 row at 0.98 s (10a), ≈ 2 weeks of median pay at 1.0 s (10c), 3 years of median pay at 2.5 s (10b; its first $65,052 brick goes into the board at 0.83 s).
  - The swap-in rule for the viewer's own pay (R3): the VO says it in 10a ("Your seconds: yearly pay ÷ 30,800.", with the label stack working it for the median: "$65,052 ÷ 30,800 / ≈ 2.1 seconds") and 10c ("2,464 ÷ your weekly pay = your weeks."); the pinned comments repeat it, and 10b's gives it.
- **Rounding: one rounding per quantity.** A quantity shows one rounded figure everywhere it appears: spec strings, captions (the VO), label stack and ladder, caption text and pinned comment. The checker enforces it.
  - Every rounded number shows "≈" on screen and in the captions, including 10b's counter final (≈ $2,604,105). 10a and 10c stop on their last milestone, within $0.50 of it, so their finals are exact dollar readings and carry no "≈" (assembly pass 2; the checker holds both rates to the $0.50): $500,000 and $32,526 in the recut, $1,000,000 and $65,052 before it.
  - Rates: 3 significant figures for 10a (≈ $30,800), 2 for 10b (≈ $78,000 a second, ≈ $4.7 million a minute), and Amazon's profit rate to the dollar (≈ $2,464) because the label stack's working and the swap-in rule divide by it.
  - Times: whole seconds from 5 s up (≈ 8, ≈ 13, ≈ 16 s; ≈ 26 and ≈ 33 s in 10b and the earlier 10a/10c cuts). Under 5 s, 10a's rows show tenths (≈ 1.0 / 2.1 / 3.3 s): whole seconds would put $30,000 and the median both at "≈ 1-2 s" and lose the ladder's point. Each time still has one rounding everywhere it appears; the median's 2.1 s is the same by the exact rate (2.115 s) and by the swap-in rule ($65,052 ÷ 30,800 = 2.112).
- **VO text uses numerals.** It doubles as the captions, and the checker reads its numbers. Line lengths assume 2.6 spoken words a second, with digits expanded the way they are read ("$65,052" = 4 words, "2025" = 2, "US" = 2).
- **Sync:** the on-screen beat (label, thud, row) lands on the pass itself, and each milestone the VO names passes within 0.5 s of the moment it is said (the checker's limit). The VO times below are the round-2 cut's.
  - **Recut (2026-10-13), 10a and 10c:** the condensed cut's caption rule, on the new clock. 10a: median pay 2.1 (pass 2.115), $100K 3.3 (3.251), $250K 8.15 (8.128), $500K 16.25 (16.256, "**$500,000**: passed."). 10c: 5 seconds 5.0 (5.000), ≈ 13 s 13.2 (13.201). Every label-stack beat starts with its caption (10a 4.65, 6.4, 10.55, 13.45 s; 10c 2.8, 6.5, 8.2, 10.8 s) and holds to the next beat.
  - **Condensed cut (2026-10-13):** there is no narration, so the VO lines are on-screen captions only, and the caption that names a milestone goes up within −0.15..+0.3 s of its pass (they say "passed" and "gone", so never early). 10a: median pay 2.1 (pass 2.115), $100K 3.3 (3.251), $250K 8.15 (8.128), $500K 16.3 (16.256), $1 million 32.5 (32.511). 10b: 3 years 2.5 (2.496), 10 years 8.3 (8.319), 20 years 16.5 (16.637), 30 years 25.1 (24.956); the 40-year pass is the lock, answered by the stamp and the verdict. 10c: 5 seconds 5.0 (5.000), ≈ 13 s 13.2 (13.201), ≈ 26 s 26.4 (26.403). Every label-stack beat still starts with its caption.
  - 10a: median pay said at 2.1 s (pass 2.11), $100K at 3.25 (3.25), $250K at 8.5 (8.13, the widest gap at 0.37 s), $500K at 16.3 (16.26), $1 million at 32.5 (32.51). The $30K row is not spoken: it lights at 0.98 s, during "Find your salary.", and the label stack names it. Every label-stack beat starts with its VO line (5.4, 12.45, 19.1, 22.7, 28.0 s) and holds to the next beat, so the resting rate never shows over a line it does not match.
  - 10b: gaps of 0.03-0.14 s (3, 10, 20 and 40 years).
  - 10c: 5 seconds said at 5.2 (pass 5.0), ≈ 13 at 13.2 (13.20), ≈ 26 at 26.4 (26.40). The 1-second answer slams into the label stack at 1.0 s while the opening question is still spoken, and vo[1] reads it back at 2.8 s with the label stack's working ("$2,464 ÷ $1,251 a week"): the one accepted gap (1.8 s), so the hook keeps its spoken question. Every rate step starts with its VO line (2.8, 7.4, 15.8, 22.8 s) and holds to the next beat, so the resting rate shows only before the first pass (0-1.0 s).
- **Lane check:**
  - These are counters at a real rate, over one continuous stretch.
  - No find-your-row table. 10a's salary ladder has a row for most kinds of viewer, but it is the counter's own milestone ladder (5 pips the counter lights in the recut, 6 before), with no per-row computation shown and the counter still the mechanic. 10c's 3 milestones (4 before the recut) are time slices of one counter (1, 5 and ≈ 13 s), on the same kind of ladder as 10a's.
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
| Spec | `studio/specs/10a-scoreboard-debt-interest-live.json`: the recut to the earlier verdict (18.6 s + the 2.5 s end card = 21.1 s), promoted from `studio/specs-wip/` on 2026-10-13. The round-2 cut (36.5 s) is in git history (`480efc1^`), and so is the real-time condensed cut (34.95 + 2.5 = 37.45 s; ca1087f) |
| Platform title | **US Debt Interest Since You Hit Play: When Does It Pass Your Salary?** |
| On-screen hook (header) | **US DEBT INTEREST SINCE YOU HIT PLAY: / WHEN DOES IT PASS YOUR SALARY?** (13 words, 2 lines; "PLAY" and "YOUR SALARY" in green) |
| Frame 1 | Header. The odometer reads **$0**, centred, and rolls from frame 1 ($46,137 at 1.5 s). On the stage, a 5-pip salary ladder labelled **$30K · Median $65K · $100K · $250K · $500K** (bottom to top; the recut; the earlier cuts had a sixth, $1M), with $30K lit as the next target, and the big bill ghost of the $30K row starting to fill, tagged "$30K" under it. Label stack "≈ $30,800 / EVERY SECOND". Footer "FY25: $970B ÷ 31,536,000 s · median $1,251 × 52". Caption "Find your salary." |
| Footer | FY25: $970B ÷ 31,536,000 s · median $1,251 × 52 |

**Topic vs the seed:**
- Kept: interest on the US national debt per second, from the latest full-year Treasury net-interest figure (FY2025: $970 billion).
- Changed in hook pass 2: **the yardstick is a ladder of round yearly salaries** ($30,000, $50,000, $100,000, $250,000, $1 million; since assembly pass 2: $30,000, median pay $65,052, $100,000, $250,000, $500,000, $1 million), and the viewer finds their own row. Pay is the yardstick, not the subject: HD Guy's one pay-as-subject counter, "Wages Visualized In Real Time", got 9,025 views.
- Dropped in hook pass 2: the question "How much comes off the debt?", its red "$0" slot, the median new house and the 10-year milestone. Both judges scored that hook 5: a gotcha whose answer ($0) many viewers can guess, with no number they own on screen. The $0 fact stays in the caption.
- Why not FY2026: Treasury's final statement for FY2026 (which ended 2026-09-30) is due about 2026-10-13 (the 8th business day of October; 2026-10-12 is a federal holiday). It is not out today. FY2026 interest is running higher, so this counter runs slow, and the caption says so in the past tense with the latest actual (CBO, through August). See the posting plan under the per-platform notes.

**Wrong belief it exploits**
1. **"My year's salary is a lot of money, even next to the government."** The counter passes $30,000 in ≈ 1.0 second, a year of median pay ($65,052) in ≈ 2.1 seconds and $100,000 in ≈ 3.3 seconds. Most viewers' whole year is gone before they finish reading the header.
2. "Half a million a year is a fortune." The counter gets there in **≈ 16 seconds** (the recut's verdict; the earlier cuts ran on to $1 million in ≈ 33 seconds).

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, rolling), the five salary pips ($30K to $500K, the median among them), "≈ $30,800 every second" and the footer's working are on screen at 0.0 s |
| R2 | The hook line holds one input, the viewer's own salary, and no result. The rate sits in the label stack and the footer |
| R3 | Pass: almost every viewer's salary sits on or between the pips ($30K to $500K), and the first caption is "Find your salary." The footer's median pay is a row of its own (passed at 2.1 s, "Median pay: passed."). The swap-in rule covers every other salary, between rows, under $30K or over $500K: it is captioned at 10.55 s ("Your seconds: yearly pay ÷ 30,800."), worked on screen for the median ("$65,052 ÷ 30,800 / ≈ 2.1 seconds") and pinned. The recut dropped the $1M row, so the ladder no longer reaches the top earners, and the rule covers them |
| R4 | Round, familiar salaries ($30K, $100K) and the median ($65K). "$970B" appears only as the footer's working, its label beat at 4.65 s and once in the captions |
| R5 | The implied wrong answer is "a while". The everyday rows go in ≈ 1.0 to 3.3 seconds, with no "most people think" |
| R6 | You (your salary) + an amount (the counter) + a horizon ("since you hit play"). The money is the government's, so this is a partial pass |
| R7 | The VO opens on an instruction ("Find your salary."), not a topic label |
| R8 | 13 words, 2 lines |
| R9 | 5 labelled pips from 0.0 s, each lit with a thud and a ding as it is passed (1.0, 2.1, 3.3, 8 s); the $500K coin is the long pull (it fills from 8.1 s, pulses on the beat from 9.75 s (the run-up from `runup.from` 9.7 s, through the swap-in rule and the 13.45 s "Next" beat) and lands at 16.26 s), and the big icon on the stage carries its target ("$250K", "$500K") as a tag |
| R10 | First payoff at 0.98 s: the $30K pip lights and the label stack slams "$30,000 A YEAR / ≈ 1.0 SECOND". Three rows are gone by 3.3 s; the biggest ($500,000) comes last, where the counter stops on exactly $500,000 |
| R11 | The question is on screen and in the title, and the video answers it: a row for each salary on the ladder, the rule for any other, and the one-line verdict for the top row. Re-checked for the recut: the question is about the viewer's salary, not about $1 million, so stopping at $500,000 leaves it answered |
| R12 | A line to repeat: **$500K a year: ≈ 16 seconds.** The caption pairs it with $100,000 ≈ 3.3 seconds, and the pinned comment gives the $100,000 row |

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

**Beat sheet (the recut to the earlier verdict, 2026-10-13: the real-time counter runs 0 → 16.256 s and stops on its $500,000 pass; captions reading-paced and back to back, the hook complete on frame 1; the verdict at 17.07 s, 0.81 s after the stop, held 1.53 s; body 18.6 s + the 2.5 s end card = 21.1 s; the coin pulses on the score's beat from 9.75 s, `lookOpts.runup` with `from` 9.7 s (the recut fix pass; it was from the 13.45 s "Next" beat))** (milestone pass time = value ÷ $30,758.50 a second). The real-time condensed cut (the counter on to $1,000,000 at 32.511 s, the verdict "$1M a year: ≈ 33 seconds." at 33.35 s; 34.95 + 2.5 = 37.45 s) is in git history (ca1087f), and the round-2 cut (36.5 + 2.5 = 39.0 s) with its guide VO script at 4f060a8 and earlier.

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header. Odometer **$0**, rolling from frame 2 ($1,025; $1,045 at 0.034 s). 5 pips "$30K · Median $65K · $100K · $250K · $500K"; $30K lit as the next target. Bill ghost filling, the money stream already pouring (24 dots a second), tagged "$30K". Label "≈ $30,800 / EVERY SECOND". Footer | "Find your salary." (−0.4-2.05: complete on frame 1) |
| 0.98 | The counter passes **$30,000**. Pip 1 lights (thud + ding); label slams "$30,000 A YEAR / ≈ 1.0 SECOND" (held to the next pass); the bill flies to the ladder (the labels it crosses duck) and the median's bill drops in | |
| 1.5 | The counter reads $46,137; the median bill is 71% full | |
| 2.11 | The counter passes **$65,052** (median pay, the footer's $1,251 × 52). Pip 2; tag "MEDIAN $65K" turns green. Label "MEDIAN PAY: $65,052 / ≈ 2.1 SECONDS" | "Median pay: passed." (2.1-3.3) |
| 3.25 | The counter passes **$100,000**. Pip 3. Label "$100,000 A YEAR / ≈ 3.3 SECONDS" (to 4.65) | "$100,000: passed." (3.3-4.6) |
| 4.65 | Label "$970B ÷ 31,536,000 S / ≈ $30,800 EVERY SECOND": the rate's working, the footer read out (to 6.4) | "At fiscal 2025's rate: $970 billion a year." (4.65-6.35) |
| 6.4 | Label "≈ $30,800 × 3,600 S / ≈ $111,000,000" (to the $250K pass). From 6.8 s the $250K bill is 84% full: until its pass only the counter, the stream and the bill's level line move (with the counter masked, the motion audit's one near-still run of 0.4 s or more, 6.80-8.13 s; the full frame keeps moving) | "That's **≈ $111 million** an hour." (6.4-8.1) |
| 8.13 | The counter passes **$250,000**. Pip 4. Label "$250,000 A YEAR / ≈ 8 SECONDS" (held to 10.55); the bill flies to the ladder and the **$500K coin** drops in, half full | "$250,000 a year: ≈ 8 seconds." (8.15-10.5) |
| 9.75 | The run-up starts (`runup.from` 9.7 s): the coin, 60% full, pulses on the beat (below) | |
| 10.55 | Label "$65,052 ÷ 30,800 / ≈ 2.1 SECONDS (MEDIAN)": the rule, worked for the footer's pay | "Your seconds: yearly pay ÷ 30,800." (10.55-13.4) |
| 13.45 | Label "NEXT / $500,000 A YEAR" (held to the pass) | "And the last row?" (13.45-16.2: the question holds through the riser) |
| 9.75-15.85 | **The run-up pulse** (`lookOpts.runup`, beat 0.4064 s = 16.256 s ÷ 40, the score's beat up to P; `from` 9.7 s): on each of 16 beats (9.75, 10.16, 10.57 … 15.04, 15.44, 15.85) the coin bumps and its rim glows, its "$500K" tag rides the bump, and the ladder's $500K row and the hero's glow pulse with it; the bump grows from 2.5% to 5% toward the pass. It runs under the $250K line's last 0.8 s, the rule and "Next" | |
| 13.86-16.26 | The kit's 2.4 s riser as the counter closes on $500,000; the hero swells 4% over it (eased in, released over the pass bump) | |
| 16.26 | The counter passes **$500,000** and stops on it exactly (counterT ends 16.25568 s). Pip 5 (coin); the coin pops with its "$500K" tag; hit + cash; label "$500,000 A YEAR / ≈ 16 SECONDS" | "**$500,000**: passed." (16.25-18.2) |
| 16.3-17.0 | The hero's bump and glow and the coin's pop settle (on the full frame the motion audit's only near-still before the verdict, 16.70-17.03, 0.33 s; the same with the counter masked) | |
| 17.07 | Verdict replaces the label stack (it yields from 17.0), one line: "**$500K** A YEAR: ≈ 16 SECONDS."; reveal cue | |
| 17.07-18.6 | Verdict hold (1.53 s), then the 2.5 s end card (unchanged) | |

**On-screen captions** (the recut; no narration, so the VO lines are captions only; 40 words, all shown, every line up ≥ 1.2 s from frame 1; every line but the last is a round-2 line, word for word):

| # | Up (s) | For (s) | Caption |
|---|---|---|---|
| 0 | −0.4-2.05 | 2.05 from frame 1 | Find your salary. |
| 1 | 2.1-3.3 | 1.2 | Median pay: passed. |
| 2 | 3.3-4.6 | 1.3 | $100,000: passed. |
| 3 | 4.65-6.35 | 1.7 | At fiscal 2025's rate: $970 billion a year. |
| 4 | 6.4-8.1 | 1.7 | That's **≈ $111 million** an hour. |
| 5 | 8.15-10.5 | 2.35 | $250,000 a year: ≈ 8 seconds. |
| 6 | 10.55-13.4 | 2.85 | Your seconds: yearly pay ÷ 30,800. |
| 7 | 13.45-16.2 | 2.75 | And the last row? |
| 8 | 16.25-18.2 | 1.95 | **$500,000**: passed. |

The recut dropped one caption, "**≈ $30,800** a second." (5.4 s in the condensed cut): the rate is on screen in the label stack from frame 1 to the first pass and again under the $970B working at 4.65 s, so the 4.65-8.1 s window carries the working and the hourly line instead.

**The maths**

- **Basis:** FY2025 net interest of $970,000,000,000, spread evenly over a 365-day year of 31,536,000 seconds.
- **Rate:** r = $970B ÷ 31,536,000 = $30,758.498… a second (spec `perSecond` 30,758.50).
- **Counter:** value(t) = r × t, with t in seconds from 0.0.
- **Salary rows:** pass time = salary ÷ r. Rows that pass under 5 s show tenths (whole seconds would put $30,000 and the median both at "≈ 1-2 s"); from 5 s up, whole seconds. Each time has one rounding everywhere it appears.
- **The stop (the recut):** the counter stops on the $500,000 pass: counterT ends at 16.25568 s, just after the exact pass (16.2556701 s) and the kit's stored-rate pass (16.2556692 s). r × 16.25568 = $500,000.30 (stored rate: $500,000.33), so the board's dollar reading is exactly $500,000. The earlier cuts stopped on the $1,000,000 pass at 32.51135 s ($1,000,000.30).

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Rate | 970,000,000,000 ÷ 31,536,000 | 30,758.498 | ≈ $30,800 every second (label; the swap-in caption and the pinned comment divide by 30,800) |
| Per hour | r × 3,600 | 110,730,594 | ≈ $111 million an hour (caption at 6.4 s, platform caption) |
| Pass: $30,000 | 30,000 ÷ r | 0.975 s | ≈ 1.0 second (label) |
| Pass: median pay | $1,251 × 52 = $65,052; ÷ r | 2.115 s | ≈ 2.1 seconds (label, platform caption); caption "Median pay: passed." at 2.1 |
| Pass: $100,000 | 100,000 ÷ r | 3.251 s | ≈ 3.3 seconds (label, caption, pinned); caption at 3.3 (the round-2 VO at 3.25) |
| Pass: $250,000 | 250,000 ÷ r | 8.128 s | ≈ 8 seconds (label, caption at 8.15; the round-2 VO at 8.5) |
| Pass: $500,000 | 500,000 ÷ r | 16.256 s | ≈ 16 seconds (label, **verdict**, platform caption); caption "$500,000: passed." at 16.25, where the recut stops |
| Pass: $1,000,000 (earlier cuts only) | 1,000,000 ÷ r | 32.511 s | ≈ 33 seconds (the round-2 and condensed verdict; not in the recut) |
| Per hour, in digits (label) | r × 3,600 | 110,730,594 | ≈ $111,000,000 (the same 3-figure rounding as ≈ $111 million) |
| Swap-in label | $65,052 ÷ 30,800 | 2.112 | ≈ 2.1 seconds (median), the same as the exact 2.115 |
| Counter at 1.5 s | r × 1.5 | 46,137.75 | $46,137 (70.9% of the median bill) |
| Counter final (the recut) | r × 16.25568 | 500,000.30 | $500,000 (stops on the $500K pass; no ≈: the dollar reading is exact) |
| Counter final (earlier cuts) | r × 32.51135 | 1,000,000.30 | $1,000,000 |
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

The salary rows ($30,000 to $500,000; $1 million before the recut) are round yardsticks chosen for the ladder, not statistics, so they need no source.

**Assumptions** (the footer carries the rate's working and the pay basis)
- FY2025 net interest ($970B) is spread evenly over a 365-day year. Real payments are lumpy (coupon dates), so this is the average rate.
- The salary rows are yearly gross salaries.
- "Median pay" (footer, the median row and caption) means BLS median usual weekly earnings of full-time wage and salary workers × 52.

**Caption (IG / TikTok; also the YouTube description)**
> $100,000 a year of pay ≈ 3.3 seconds of US debt interest. $500,000 ≈ 16 seconds. In fiscal 2025 the US paid $970 billion in net interest (Treasury; CBO). Divide by the 31,536,000 seconds in a year: ≈ $30,800 a second, ≈ $111 million an hour. A year of median full-time pay ($1,251 a week × 52 = $65,052, BLS) lasts ≈ 2.1 seconds. Yours: divide your yearly pay by 30,800. And $0 of it pays the debt down: interest is the cost of carrying the debt, not a repayment. Fiscal 2026 ran hotter: CBO's August review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow. Educational maths, not advice.
> #nationaldebt #interest #moneymath

**Pinned comment**
> Yearly pay ÷ 30,800 = your seconds ($100,000 ≈ 3.3). Which row are you?

**Per-platform notes**
- **Posting plan (preferred):** post after Treasury's September 2026 Monthly Treasury Statement (about 2026-10-13) and rebuild on FY2026 net interest. Set `NET_INTEREST_FY2025` in the check to the FY2026 figure and rerun it; it will list every string to change: perSecond, rateDisplay, intro, rateSteps (all four in the recut), vo[3] ("fiscal 2026's rate"), vo[4], vo[5], vo[6], every row's label time, the caption times that must stay at their passes, the verdict, counterT (the new $500,000 pass, to 5 decimals, so the stop still lands on $500,000), hold, the footer ("FY26"), the caption (drop the "ran hotter" sentence) and the pinned comment. At $1.0-1.1 trillion the $500,000 row moves from ≈ 16 s to ≈ 14-16 s and the $100,000 row from ≈ 3.3 s to ≈ 2.9-3.2 s, so the body shortens with it and the run-up's beat follows the new §2.3 row. If it posts before then, it goes out as written: FY2025, with the past-tense caption.
- **YouTube Shorts:** the title asks the question and keeps HD Guy's "since you hit play" premise. No CTA; hard-cut back to frame 1 so the replay restarts the count (and the viewer can watch their own row again).
- **Instagram Reels:** caption line 1 pairs the $100,000 row with the verdict's $500,000. Use the verdict frame as the cover: 18.4-18.55 s in the recut, the settled verdict hold once the last caption has gone ("$500,000: passed." is up to 18.2 s and fades out by 18.4; the card starts at 18.6): the board at $500,000, the lit coin, "$500K A YEAR: ≈ 16 SECONDS." (recut fix pass; it was 17.3-18.4 s, with the caption still under the verdict). It was 33 s on in the round-2 cut.
- **TikTok:**
  - Expected comment fights: "net vs gross interest", "that's last year's number", "my salary is before tax" (the rows are gross salaries) and "does any of it pay the debt down?". The caption pre-empts all four: $970B is the net figure (a gross figure is bigger), FY2026 ran higher, and $0 of it repays principal.
  - Reply with the CBO line rather than a new number.
  - Put "$100,000 a year of pay ≈ 3.3 seconds" in the first 100 characters.
- **Look note:**
  - The Scoreboard's real-time mode is "0 cuts" (03-look-directions, Direction 3), so the stage stays a dark grid.
  - The kit reads everything this spec passes: `intro` (the resting label stack), `labels` (one per row: "$30,000 a year" in green over "≈ 1.0 SECOND" in white caps; "Median pay: $65,052" for the median), `flash: 4.6` (a milestone holds the label stack to the next beat), `rateSteps` (in the recut, four label-stack beats, each starting with its caption and held to the next beat: the $970B working at 4.65 s, the hourly working at 6.4 s, the median's worked swap-in at 10.55 s and "Next / $500,000 a year" at 13.45 s, held to the $500,000 pass, whose label "$500,000 A YEAR / ≈ 16 SECONDS" then holds until the verdict replaces it; the earlier cuts had five, from the rate at 5.4 s to "Next / $1,000,000 a year" at 28.0 s), `pipLabels` ("$30K", "Median $65K" … "$500K" beside the ladder icons from frame 1) and `icons` (four bills and a coin for the $500,000 row; the coin was the $1 million row's before the recut).
  - The labels carry the working and the captions the sentence, so no line sits on screen twice; the milestone beats (label "$250,000 A YEAR / ≈ 8 SECONDS" over the caption "$250,000 a year: ≈ 8 seconds.") are the format's call-and-response and stay.
  - The milestone labels start with "A" or "Median", so the kit stacks a twin icon for the repeated bills instead of a "×N" badge.
  - `final` is "$500,000" (the recut; "$1,000,000" before) with no "≈", so the kit draws no unlit "≈" ghost beside the hero, and the number stays centred.
  - Kit changes in the Scoreboard `cost-counter` module (assembly pass 2): the big stage icon carries its pip label as a tag under the art (white while it fills, green on the pass, riding the icon's bump); ladder labels duck while a flying icon crosses them (this is what makes six labelled pips lint-clean: a $75K pip was dropped in hook pass 2 for exactly that contrast error); the hero is set 8% under its full fit, for air under the header and above the footer.
  - No `slot` (frame 1 holds one task), `heroIcon: false`, no spec sfx: the kit cues the riser, hit and cash on the last milestone.
  - Kit change from 10c's fixer pass (no change to this spec): the big icon keeps clear of the ladder column at its pop's peak (bump 1 + amp, plus the glow), so the bills sit right of the region's centre (x 420-937 at rest). The median bill's pop at 2.15 s now clears "Median $65K" by 33 px (it came within about 9 px and its glow covered the "K"). Lint is still clean; the MP4 in `studio/out/` was re-rendered with it.
  - Kit option from the condensed cut's fix pass (`lookOpts.runup`, opt-in; the promoted spec sets it, with `stream: 24`, a denser money stream than the kit's 14 dots a second; the round-2 spec sets neither): in the recut `{ "beat": 0.4064, "from": 9.7 }`. From 9.7 s (the kit's own opt-in `from`; without it the run-up starts at the last label beat before the pass, "Next" at 13.45 s) the coin pulses on the score's beat (P 16.256 s ÷ 40 beats, the recut's §2.3 row from `tempo-table --cues`; the condensed cut's was 32.511 s ÷ 80 = 0.40639 s from "Next" at 28.0 s), 16 pulses from 9.75 s, with its tag, the ladder's $500K row and the hero's glow; the hero swells 4% over the kit's 2.4 s riser, which keeps its 13.45 s start. It adds no cue, so the sound is the same. Its reason: with the coin filling, the money stream falls only a short way, and the stretches before a pass measured near-still with the hero counter masked (28.6-32.5 s in the condensed cut; 9.67-13.47 s in the recut before `from`; Review log, "Condensed cut, fix pass" and "Recut, fix pass"). The bill's last stretch before the $250K pass (6.8-8.1 s) cannot take a pulse (the run-up is the last milestone's) and is carried by the counter's own roll and the stream. If the tempo row moves (a new cue record), the check names the new P ÷ N₁ and the beat must follow it.

---

## 10b: Becker Rig: "Your pay for 40 years vs 1 minute of new US debt?"

| | |
|---|---|
| Look | `becker-rig` (white void and floor, our green stick figure with the pencil, maths in ink, impact kit) |
| Spec | `studio/specs/10b-becker-rig-debt-vs-your-pay.json`: the condensed cut (36.15 s + the 2.5 s end card = 38.65 s, after the fix pass), promoted from `studio/specs-wip/` on 2026-10-13. The round-2 cut (36.6 s) is in git history (`480efc1^`) |
| Platform title | **Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US Debt?** |
| On-screen hook (header) | **Your pay for 40 years vs / 1 minute of new US debt?** (12 words, 2 lines, set at ≈ 84 px; "40 years" in green and "1 minute" in red, the colours the short uses for pay and debt from frame 1 on). "Which is bigger?" is in the title; the first VO line asks it ("Your 40 years, or 1 minute?") |
| Frame 1 | Header and the 2-line footer. A generic "debt clock" readout board ("New US debt since you hit play", no real branding) is **already counting from $0** (≈ $117,302 at 1.5 s), with the rate line "≈ $78,000 every second". Under it the figure hugs his stack of 40 cash bricks on an ink plinth, **"40 × $65,052 / 40 years left"** (the second line counts down one year per brick), and a "1 MINUTE" stopwatch on the floor reads 0:00, its label centred over it. The stack is the target: the board's slot eats one brick every 0.83 s |
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
| R8 | 12 words, 2 lines (≈ 84 px, the full measure) |
| R9 | The 40 bricks in his arms are the target from frame 1: one eaten every 0.83 s with a tick, and the plinth counts them down ("40 years left" … "0 years left"); the strip checks off 3, 10, 20, 30 and 40 years. The stopwatch counts the minute |
| R10 | The counter moves at 0.0 s and the first brick goes at 0.83 s. At 1.0 s the counter reads $78,201 beside the stopwatch's 0:01. First payoff at 2.50 s (3 years of median pay; its caption at 2.5 s, the round-2 VO at 2.4 s). The biggest number (a working life, $2,602,080) comes last, and the counter stops on it |
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

**Beat sheet (condensed cut, 2026-10-13: the real-time counter runs 0 → 33.274 s as before, a brick every 0.83 s; captions reading-paced and back to back, the hook complete on frame 1; the question holds through the burst; the verdict at 34.1 s, 0.8 s after the lock's hit, held 2.05 s, its 17 words' reading time (fix pass: it was 34.2 s, held 1.55 s); body 36.15 s + the 2.5 s end card = 38.65 s)** (milestone pass time = value ÷ $78,201.35 a second, from 0.0 s; gag beats from `lookOpts`, all unchanged). The round-2 cut (verdict on the burst at 33.3 s, held 3.3 s; 36.6 + 2.5 = 39.1 s) and its guide VO script are in git history (4f060a8 and earlier).

| t (s) | On screen (Becker action) | Caption |
|---|---|---|
| 0.0 | Header, footer. The board counts from **$0** over "≈ $78,000 every second" ($2,606 on frame 2). The figure hugs his 40-brick stack on its plinth ("40 × $65,052 / 40 years left"); the "1 MINUTE" stopwatch reads 0:00 | "Your 40 years, or 1 minute?" (−0.4-2.45: complete on frame 1) |
| 0.83 | The board's slot slurps the top brick (1 year of median pay, $65,052) with a tick, and the plinth's count pops to "39 years left"; one more every 0.83 s | |
| 1.0 | The counter reads $78,201; the stopwatch 0:01 | |
| 2.50 | The counter passes **$195,156**: the board kicks, a pop, and the strip rolls to "✓ 3 years of median pay: $195,156". **Swallow:** he squeezes the rest of his stack | "3 years, gone." (2.5-4.15) |
| 4.2 | The strip rolls back to "≈ $78,000 every second" as the line starts | "≈ $78,000 a second." (4.2-8.25) |
| 8.32 | The counter passes **$650,520**: "✓ 10 years of median pay: $650,520". **Push:** he braces against his stack; it keeps eating | "10 years of median pay." (8.3-10.55) |
| 10.6 | The strip rolls back to the rate. Footer line 1 ("New debt ≈ $2.46T ÷ (364 × 86,400 s)") turns from grey to ink while the line is up (to 16.4) | "The debt grew ≈ $2.46 trillion in 364 days." (10.6-16.4) |
| 16.5 | Heat key "orange": the digits, the rim and the stopwatch's arc snap from ink to red. Buzz | "Halfway: 20 years." (16.5-18.1) |
| 16.64 | The counter passes **$1,301,040**: "✓ 20 years of median pay: $1,301,040"; the plinth reads "20 years left". **Shocked:** he jumps back toward the post and lets go | |
| 18.2 | The strip rolls back to the rate. He points, arm straight, at the plinth's "40 × $65,052" | "40 × $65,052 ≈ **$2.6 million**." (18.2-23.0) |
| 23.1 | He looks down at the few bricks left ("12 years left") | "That's a whole working life." (23.1-25.1) |
| 24.96 | The counter passes **$1,951,560**: "✓ 30 years of median pay: $1,951,560" (it holds to 27.36); the plinth reads "10 years left". **Flinch** | "30 years gone. 10 left." (25.1-28.5) |
| 28.6 | Heat key "white": the board vibrates and steams; he cowers | "How long do 40 years last?" (28.6-34.05: the question holds through the riser and the burst, until the verdict replaces it) |
| 31.1-33.3 | The spec's riser as the last bricks go ("1 year left" from 32.44) | |
| 33.27 | The counter passes **$2,602,080** and **stops on it**: the last brick goes ("0 years left") and the strip rolls to "✓ 40 years of median pay: $2,602,080" | |
| 33.3 | **Burst** (the lock's hit): white impact frame, shake, side hit lines; the board cracks; the blast knocks him onto the floor. The stopwatch stops at 0:33, its end label "≈ $4.7 million" pops under "1 MINUTE" (33.38) | |
| 33.42 | Gag: the green stamp "≈ 33 SECONDS" slams over the emptied plinth | |
| 33.5-34.05 | He sits up; the shake and the stamp's wobble settle (the motion audit finds no still or near-still run of 0.1 s or more before the verdict; with the verdict at 34.2 it was 34.07-34.20) | |
| 34.1 | Verdict in the caption band (it replaces the question): "40 years of median pay: **≈ 33 seconds**. / 1 minute of new US debt ≈ **$4.7 million**."; ding. It is solid by about 34.3; its swoosh draws about 34.45-34.8; he looks up at the cracked board (to about 34.9; the motion audit's still runs in the hold are 34.53-34.73 and 34.90-36.17) | ("A working life: **≈ 33 seconds.**" lands under the verdict at 34.1 and is never shown, as 06c's last line) |
| 34.1-36.15 | Verdict hold (2.05 s: 17 words at 0.12 s a word, the captions' reading floor, is 2.04 s; the stamp and the stopwatch's end label have carried both numbers since 33.4 s), then the 2.5 s end card (unchanged) | |

All "≈ N seconds" are counter time, and the counter starts at 0.0 s, so they are also video time.

**On-screen captions** (condensed cut; no narration, so the VO lines are captions only; 10 lines and 52 words shown, every line up ≥ 1.2 s from frame 1; the 11th, "A working life: **≈ 33 seconds.**", lands under the verdict and is never shown, because the Becker Rig verdict takes the caption band):

| # | Up (s) | For (s) | Caption |
|---|---|---|---|
| 0 | −0.4-2.45 | 2.45 from frame 1 | Your 40 years, or 1 minute? |
| 1 | 2.5-4.15 | 1.65 | 3 years, gone. |
| 2 | 4.2-8.25 | 4.05 | **≈ $78,000** a second. |
| 3 | 8.3-10.55 | 2.25 | 10 years of median pay. |
| 4 | 10.6-16.4 | 5.8 | The debt grew ≈ $2.46 trillion in 364 days. |
| 5 | 16.5-18.1 | 1.6 | Halfway: 20 years. |
| 6 | 18.2-23.0 | 4.8 | 40 × $65,052 ≈ **$2.6 million**. |
| 7 | 23.1-25.1 | 2.0 | That's a whole working life. |
| 8 | 25.1-28.5 | 3.4 | 30 years gone. 10 left. |
| 9 | 28.6-34.05 | 5.45 | How long do 40 years last? |
| 10 | 34.1 (hidden) | | A working life: **≈ 33 seconds.** |

**The maths**

- **Basis:** total public debt outstanding (Treasury's Debt to the Penny) rose from **$37,637,553,494,935.61** on 2025-09-30 to **$40,096,954,633,566.68** on 2026-09-29: Δ = **$2,459,401,138,631.07** in **364 days**.
- **Rate:** r = Δ ÷ (364 × 86,400 s) = Δ ÷ 31,449,600 s = $78,201.349… a second (`perSecond` 78,201.35).
- **Counter:** value(t) = r × t, from 0.0 s.

| On screen | Formula | Exact | Shown |
|---|---|---:|---|
| Growth | $40,096,954,633,566.68 − $37,637,553,494,935.61 | 2,459,401,138,631.07 | ≈ $2.46T (footer, VO, caption) |
| Rate | Δ ÷ 31,449,600 s | 78,201.349 | ≈ $78,000 every second (strip, stamp, VO, caption, pinned) |
| 1 minute of new debt | r × 60 | 4,692,080.93 | ≈ $4.7 million (verdict and stopwatch end label, both from 33.3 s; caption). Not in the VO: it would answer the header 8 s before the burst |
| A year of median pay | $1,251 × 52 | 65,052 | $65,052 (one block) |
| 40 years of median pay | $65,052 × 40 | 2,602,080 | $2,602,080 / ≈ $2.6 million |
| The duel | 1 minute ÷ 40 years of median pay | 1.803 | 1 minute is bigger (1.8x, md only); margin ≈ $2.1 million (md only) |
| Crossover pay | 1 minute ÷ 40 | 117,302.02 | ≈ $117,000 a year (pinned) |
| 1 minute in years of median pay | 1 minute ÷ $65,052 | 72.13 | ≈ 72 years of median pay (caption) |
| Block n eaten | n × $65,052 ÷ r | n × 0.8319 s | brick n slurped by the board (block-stack); the plinth then reads "40 − n years left" |
| Pass: 3 years of pay | $195,156 ÷ r | 2.496 s | caption 2.5 (the round-2 VO 2.4) |
| Pass: 10 years of pay | $650,520 ÷ r | 8.319 s | caption 8.3 (the round-2 VO 8.2) |
| Pass: 20 years of pay | $1,301,040 ÷ r | 16.637 s | caption 16.5, with the orange heat key (the round-2 VO said "20 years" at 16.88) |
| Pass: 30 years of pay | $1,951,560 ÷ r | 24.956 s | caption 25.1, as the round-2 VO ("30 years gone. 10 left."; it is the 30th brick, so 10 are left) |
| Pass: 40 years of pay | $2,602,080 ÷ r | 33.274 s | ≈ 33 seconds (the stamp at 33.42; the verdict at 34.1 in the condensed cut, 33.3 in the round-2 cut) |
| Share of the minute used | 33.274 ÷ 60 | 55.5% | the stopwatch's arc stops at 55% (33.3 ÷ 60 at the lock; no figure printed) |
| Counter at 1.5 s | r × 1.5 | 117,302.02 | (frame check; equal to the crossover pay because 1.5 = 60 ÷ 40) |
| Counter final | r × 33.27411 | 2,602,080.28 | $2,602,080 (no ≈: the counter stops on the 40-year pass, within $0.50 of it at the exact and the stored rate, so it matches the strip's last ✓) |
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
- **Instagram Reels:** use the end hold as the cover (≈ 34.5 s in the round-2 cut; 34.95-36.1 s in the condensed cut, after the swoosh and his look up): the counter on $2,602,080, the green "≈ 33 SECONDS" stamp and the verdict. The 33.3 s frame is the white impact frame. Caption line 1 is the working-life verdict.
- **TikTok:**
  - Expected fight: "the debt includes money the government owes itself". The pinned reply: of the $2.46T, $2.09T is held by the public. That is still ≈ $66,000 a second, so 1 minute of it (≈ $4.0 million) still beats a working life of median pay ($2.6 million). It comes from the PrimeRates source above: 2.09e12 ÷ 31,449,600 = $66,456.
  - Expected fight: "I earn more than that". The pinned comment gives the flip point (≈ $117,000) and the swap-in rule.
  - Expected question: "why 364 days?" Answer: those are the two official readings either side of the fiscal year we could confirm.
  - Keep "40 years of median pay ≈ 33 seconds" in the first 100 characters.
- **Look note:**
  - The Becker Rig `cost-counter` module draws 10b in its **stack mode** (`lookOpts.opener.prop: "block-stack"`, documented in the head of `looks/becker-rig/formats/cost-counter.js`; the kit README's §11 does not list it yet):
    - the readout board counting from frame 1, with the rate line, the ✓ strip at each pass and the lock on `final`;
    - 40 cash bricks on a plinth carrying `text` and, from frame 1, the `countdown` ("{n} years left": the bricks still on the stack, the number popping as each goes; `sub` is the fallback for a kit without it), slurped one by one into a slot in the board's bottom edge (brick n at n × 65,052 ÷ perSecond, so every 0.83 s, with a tick at gain 0.55, the loop's steady beat);
    - the `timer`: a "1 MINUTE" stopwatch on the floor, its label stack centred on it, elapsed m:ss in its face, an arc that fills in the heat colour, the end label "≈ $4.7 million" from 33.3 s, stopped at 0:33 and 55% by the lock;
    - the `heat` keys (orange at 16.5 s is the kit's red snap, now on the key itself; white at 28.6 s adds vibration and steam), the five `actions` (swallow, push, shocked, flinch, flattened), the lock with its impact kit and cracks, and the `gag` stamp over the emptied plinth, in the verdict's green;
    - between reactions, once he has let go, he acts on the VO line starts (a straight-arm point at the plinth at 18.3 s, a look down at 23.2 s), and he never stands in the post: his head stays 40 px clear of it, his torso and pencil to its right;
    - a footer line that a VO line works through turns ink while it plays (line 1, 10.6-16.4 s), and words the VO joins with a no-break space wrap as one unit in the caption.
    - In stack mode there is no NEXT ticker and no dropping object: the stack is the target.
  - **Not drawn:** `stamp` ("1 second ≈ $78,000" at 1.0 s). The board's rate line shows "≈ $78,000 every second" from frame 1, and at 1.0 s the counter itself reads $78,201 beside the stopwatch's 0:01. A second rate label while the header is still being read would compete with it. The spec keeps the key (the check pins it) for a kit that draws it.
  - The `becomes` texts in `actions` are directions, not all literal: the kit has no orange (orange maps to its red snap) and does not blur digits, and "knocks him flat" renders as knocked back onto the floor beside the post, knees up.
  - One impact kit, at the burst only (README: "one per short").

---

## 10c: Scoreboard: "How long do you work for 1 second of Amazon's profit?"

| | |
|---|---|
| Look | `scoreboard` (black bars, neon-green odometer in the top bar, a milestone ladder and a filling icon on the dark stage, label stack in the bottom bar, footer working). Ported from the retired Live Sheet on 2026-10-08 (Review log, "Port to scoreboard"); the old spec is `studio/specs/retired/10c-live-sheet-amazon-makes.json` |
| Spec | `studio/specs/10c-scoreboard-amazon-makes.json`: the recut to the earlier verdict (15.55 s + the 2.5 s end card = 18.05 s), promoted from `studio/specs-wip/` on 2026-10-13. The round-2 cut (31.0 s) is in git history (`480efc1^`), and so is the real-time condensed cut (28.75 + 2.5 = 31.25 s; ca1087f) |
| Platform title | **How Long Do You Work for 1 Second of Amazon's Profit?** |
| On-screen hook (header) | **HOW LONG DO YOU WORK FOR / 1 SECOND OF AMAZON'S PROFIT?** (11 words, 2 lines; "YOU" in green) |
| Frame 1 | Header. The odometer reads **$0**, centred, and counts from frame 1 ($3,695 at 1.5 s). Under it the 2-line footer with the pay basis. On the stage, a 3-pip ladder of the profit targets, **≈ $2,464 · ≈ $12,319 · $32,526** (bottom to top; the recut; the earlier cuts had a fourth, $65,052; ≈ $2,464 lit white as the next one; each "≈" hangs in a gutter, so the "$" and digits of the rows line up), and the big bill ghost of the 1-second row, the money stream already pouring into it, tagged "≈ $2,464" under it. No answer is on screen yet (the countable loop: each target turns into its answer as it is passed). Label stack "≈ $2,464 every second / AMAZON'S PROFIT SINCE YOU HIT PLAY". Caption "How long do you work for this?" |
| Footer | Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52 |

**Topic vs the seed:**
- Kept: Amazon's latest annual results (2025) turned into a per-second counter.
- Changed in hook pass 2: the counter is **profit** (2025 net income, $77.7B, ≈ $2,464 a second), and the answer is in the viewer's own unit, **weeks of median pay**, not dollars. The sales counter, the house row and the "makes vs keeps" twist are gone.
  - Both judges scored the old hook 4 and marked it dishonest as rendered: without `preroll`, the Live Sheet kit starts its counter 1 s in, so frame 1 read $22,733 under "since you hit play" and every pass landed ≈ 1 s early.
  - "Revenue isn't profit" is a correction most viewers already hold.
- Fixed: `lookOpts.preroll: 0`, so frame 1 is $0 and "since you hit play" is literal. The Scoreboard (port) has no preroll: its counter runs from `counterT[0]` = 0.0 s, so frame 1 is $0 without a key.
- Why Amazon: a household brand, and its profit per second (≈ $2,464) is the size of a couple of weeks' pay, so the comparison lands in a unit the viewer lives in.

**Wrong belief it exploits:** "A second of a company's profit is pocket change." 1 second of Amazon's 2025 profit (≈ $2,464) is **≈ 2 weeks** of median full-time pay; 5 seconds is ≈ 10 weeks; half a year of pay goes in **≈ 13 seconds** (the recut's verdict; the earlier cuts ran on to a whole year in ≈ 26).

**Hook rules satisfied**

| Rule | How |
|---|---|
| R1 | The counter ($0, counting), the rate ("≈ $2,464 every second"), the ladder's three profit targets and the footer ($77.7B, $1,251 a week × 52) are on screen at 0.0 s |
| R2 | The hook line has one input (1 second) and no result: no answer is on screen until the first pass |
| R3 | The answer unit is the viewer's: weeks of work ("≈ 2 WEEKS OF WORK", the header's "you"). The answers use the median ($1,251 a week, in the footer, the 2.8 s working and the verdict); the swap-in rule is captioned and worked in the label stack at 8.2 s (the recut; 17.4 s in the condensed cut, 15.8 s in the round-2 cut; "$2,464 ÷ your weekly pay / your weeks per second") and pinned. Partial pass: the answers are the median's, not the viewer's own |
| R4 | Small, round inputs (1 second, 5 seconds) and a familiar unit (weeks, months of pay). "$77.7 billion" appears only in the footer, the 6.5 s working (the recut; 8.6 s condensed, 7.4 s round 2) and once in the captions |
| R5 | The implied wrong answer is "a few minutes of my work". The first answer says ≈ 2 weeks |
| R6 | You ("do you work") + an amount (a second of profit) + a horizon ("since you hit play"). The money is Amazon's, so this is a partial pass |
| R7 | The VO opens on the question, not a label |
| R8 | 11 words, 2 lines |
| R9 | 3 targets on the ladder from 0.0 s, the next one glowing; the big icon fills toward it (tagged with its amount) and pops on the pass at 1.0 and 5.0 s (thud + ding) and 13.2 s (hit + cash), the label stack slams the answer and the ladder label turns into it (≈ 2 weeks, ≈ 10 weeks, 6 months). "And half a year?" lands at 10.8 s, into a 2.0 s riser; the coin pulses on the beat from 7.6 s (`runup.from`) to its pass |
| R10 | First payoff at 1.000 s: the bill pops and the label stack slams "1 SECOND: ≈ $2,464 / ≈ 2 WEEKS OF WORK". The biggest answer (half a year of pay) comes last, as the hero lands on exactly $32,526 (hit + cash) and the coin grows to the biggest object of the video (336 → about 424 px across, taller than the bills) |
| R11 | The question is on screen and in the title, and the video answers it: ≈ 2 weeks of median pay (1.0 s, read back at 2.8 s) and the viewer's own weeks by the rule (8.2 s, pinned). The verdict turns it round for the climax, and the end frame keeps the 1-second answer (the ladder's bottom row, ≈ 2 weeks). Re-checked for the recut: the hook asks about 1 second, so ending on half a year instead of a year leaves it answered |
| R12 | A line to repeat: **Half a year of median pay: ≈ 13 seconds.** The hook's own answer (1 second ≈ 2 weeks) is caption line 1 and the pinned comment |

**Benchmark hooks it is modelled on**
- **H04 and H01, HD Guy, "Cost in Units of Starbucks Lattes" and "Cost in Units of RTX 5090"**. **9,858,084 (106.16x) and 30,617,461 (62.49x).** https://www.youtube.com/shorts/NHbMe2F_JXY, https://www.youtube.com/shorts/E2oVrAwHDOw
  - Borrowed: a big sum re-priced in a unit the viewer lives in (here a week of work).
- **H84, Master Money, "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make"**. **3,000,000, 140x.** https://www.tiktok.com/@mastermoneyco/video/7680913784143105310
  - Borrowed: a "you" question about pay.
- **H64, Gage Heward, "What $1 costs you by age"**. **1,150,974, 210x median.** https://www.instagram.com/reel/Da_dukjxB56/
  - Borrowed: a personal cost, with every answer cell empty until it fills.
- **H32, FinCalC TV, 16-row Post Office MIS table**. **428,862, 54.46x.** https://www.youtube.com/shorts/K2QbxGXa29k
  - Borrowed: output cells that fill row by row (in the Scoreboard, the ladder labels that turn into their answers).
- **H02, HD Guy, "F-16 Afterburner Fuel Cost in Real Time"**. **28,289,823, 110.85x.** https://www.youtube.com/shorts/2DtXV2uxM_E
  - Borrowed: the counter is running at 0.0 s, and round milestones pull the viewer through.
- **Look evidence:** HD Guy's counters are this look (H02 above; "Cost in Units of…", H01 and H04): a neon odometer in a black top bar, one object on a dark stage, a hard-cut label stack. The working the Live Sheet put in its formula bar now rides the label stack's line 1.

**Beat sheet (the recut to the earlier verdict, 2026-10-13: the real-time counter runs 0 → 13.201 s and stops on its half-year pass, $32,526; captions reading-paced and back to back, the hook complete on frame 1; the verdict at 13.96 s, 0.76 s after the stop, held 1.59 s; body 15.55 s + the 2.5 s end card = 18.05 s; the coin pulses on the score's beat from 7.6 s, `lookOpts.runup` with `from` 7.6 s (the recut fix pass; the run-up was from the 10.8 s "Next" beat))** (milestone pass time = value ÷ $2,463.85 a second, from 0.0 s; label beats from `lookOpts.labels` and `lookOpts.rateSteps`). The real-time condensed cut (the counter on to $65,052 at 26.403 s, the verdict "A year of median pay: ≈ 26 seconds." at 27.16 s; 28.75 + 2.5 = 31.25 s) is in git history (ca1087f), and the round-2 cut (31.0 + 2.5 = 33.5 s) with its guide VO script at 4f060a8 and earlier. `lookOpts` in the recut: the year row's label, ladder entries and coin are gone, and the coin moves to the half-year row; the $77.7B working and the swap-in rule start at 6.5 and 8.2 s (were 8.6 and 17.4); the "Next" step is new ("$1,251 × 52 ÷ 2 = $32,526 / Next: half a year of median pay", 10.8 s); `runup` is `{ "beat": 0.40003, "from": 7.6 }` (13.201 s ÷ 33; the recut fix pass added `from`); `flash` 4.2, `stream` 24, `climaxScale` and `tallVerdict` as before.

| t (s) | On screen | Caption |
|---|---|---|
| 0.0 | Header. Odometer **$0**, counting from frame 2 ($82). Ladder "≈ $2,464 · ≈ $12,319 · $32,526" (≈ $2,464 lit as the next target). Bill ghost filling, the money stream already pouring (24 dots a second), tagged "≈ $2,464". Label "≈ $2,464 every second / AMAZON'S PROFIT SINCE YOU HIT PLAY". 2-line footer | "How long do you work for this?" (−0.4-2.75: complete on frame 1) |
| 1.00 | The counter passes **≈ $2,464** (1 second). The bill pops; thud + ding. Label slams "1 SECOND: ≈ $2,464 / ≈ 2 WEEKS OF WORK" (held to 2.8). The bill flies to the ladder, and as it lands (1.72 s) its ladder label turns **≈ 2 weeks**; the 5-second bill drops in, already part full | |
| 1.5 | The counter reads $3,695 | |
| 2.8 | Label "$2,464 ÷ $1,251 A WEEK / ≈ 2 WEEKS OF MEDIAN PAY": the working, for the footer's pay (to 5.0). From 3.8 s the 5-second bill is over 75% full: until its pass only the counter, the stream and the level line move (with the counter masked, near-still at 3.83-4.37 and 4.40-5.00 s; the full frame keeps moving) | "≈ 2 weeks, at median pay." (2.8-4.95) |
| 5.00 | The counter passes **≈ $12,319**. The bill pops; label "5 SECONDS: ≈ $12,319 / ≈ 10 WEEKS OF WORK" (held to 6.5); its ladder label turns **≈ 10 weeks** (5.72 s); the **coin** for the half year drops in, about 38% full, tagged "$32,526" | "5 seconds: ≈ 10 weeks." (5.0-6.45) |
| 6.5 | Label "$77.7B ÷ 31,536,000 S / ≈ $2,464 EVERY SECOND" (to 8.2) | "Amazon's 2025 profit: $77.7 billion." (6.5-8.15) |
| 8.2 | Label "$2,464 ÷ YOUR WEEKLY PAY / YOUR WEEKS PER SECOND": the swap-in rule (to 10.8) | "2,464 ÷ your weekly pay = your weeks." (8.2-10.75; the caption breaks "… your weekly pay / = your weeks.") |
| 10.8 | Label "$1,251 × 52 ÷ 2 = $32,526 / NEXT: HALF A YEAR OF MEDIAN PAY" (held to the pass; its second line sets a little smaller, width-bound) | "And half a year?" (10.8-13.15: the question holds through the riser) |
| 7.60-12.80 | **The run-up pulse** (`lookOpts.runup`, beat 0.40003 s = 13.201 s ÷ 33, the score's beat up to P; `from` 7.6 s): on each of 14 beats (7.60, 8.00, 8.40 … 12.00, 12.40, 12.80) the coin bumps and its rim glows, its "$32,526" tag rides the bump, and the ladder's top row and the hero's glow pulse with it; the bump grows from 2.5% to 5% toward the pass. It starts under the $77.7B line's last 0.6 s (the coin 58% full) and runs through the rule and "Next" | |
| 11.2-13.2 | The kit's riser, 2.0 s (it starts 0.4 s after the "Next" beat), as the counter closes on $32,526; the hero swells 4% over it (eased in, released over the pass bump) | |
| 13.20 | The counter passes **$32,526** and stops on it exactly (counterT ends 13.2013 s). The coin pops and grows over 0.5 s from about 336 to 424 px across (`climaxScale`); its tag fades as it grows; the top ladder label turns **6 months**; hit + cash; label "≈ 13 SECONDS: $32,526 / 6 MONTHS OF WORK" | "≈ 13 seconds: half a year." (13.2-14.4: it leaves 0.44 s into the verdict) |
| 13.6-13.9 | The coin settles (the motion audit's longest near-still before the verdict on the full frame, 0.13 s; 0.37 s with the counter masked at y 380-540, 13.53-13.90) | |
| 13.76-13.96 | A black band rises over the stage foot (the kit's tall verdict slot, `tallVerdict`); the label stack yields from 13.89 | |
| 13.96 | Verdict, two lines: "HALF A YEAR OF MEDIAN PAY: / **≈ 13 SECONDS**." (caps about 64 px, about level with the label lines' 62: the longer first line sets it a little under the year verdict's 78 px type, caps 68); reveal cue | |
| 13.96-15.55 | Verdict hold (1.59 s): the hero on $32,526, the big lit coin, the ladder reading ≈ 2 weeks · ≈ 10 weeks · 6 months, the verdict. Then the 2.5 s end card (unchanged) | |

The 1-second answer slams into the label stack at its pass (1.0 s) while the hook caption is up, and vo[1] reads it back at 2.8 s with the label stack's working: the one pass whose own caption is not at the pass (the hook keeps its question). The other two passes' captions go up within 0.01 s of them. The resting rate shows only before the first pass (0-1.0 s): every later beat holds to the next one (the checker asserts it).

**On-screen captions** (the recut; no narration, so the VO lines are captions only; 41 words, all shown, every line up ≥ 1.2 s from frame 1; every line but "And half a year?" is a round-2 line, word for word):

| # | Up (s) | For (s) | Caption |
|---|---|---|---|
| 0 | −0.4-2.75 | 2.75 from frame 1 | How long do you work for this? |
| 1 | 2.8-4.95 | 2.15 | ≈ 2 weeks, at median pay. |
| 2 | 5.0-6.45 | 1.45 | 5 seconds: ≈ 10 weeks. |
| 3 | 6.5-8.15 | 1.65 | Amazon's 2025 profit: $77.7 billion. |
| 4 | 8.2-10.75 | 2.55 | 2,464 ÷ your weekly pay = your weeks. |
| 5 | 10.8-13.15 | 2.35 | And half a year? |
| 6 | 13.2-14.4 | 1.2 | ≈ 13 seconds: half a year. |

**The maths**

- **Basis:** Amazon's 2025 net income of $77,700,000,000, spread evenly over a 365-day year.
- **Rate:** k = $77.7B ÷ 31,536,000 = $2,463.851… a second (`perSecond` 2,463.85).
- **Counter:** value(t) = k × t, from 0.0 s (the Scoreboard counts from `counterT[0]`; the running count shows whole dollars, rounded down).

| On screen | Formula | Exact | Shown (everywhere) |
|---|---|---:|---|
| Profit rate | 77.7e9 ÷ 31,536,000 | 2,463.851 | ≈ $2,464 a second (rate label, ladder, the 1-second label, the 2.8 / 6.5 / 8.2 s working in the recut (8.6 / 17.4 s condensed, 7.4 / 15.8 s round 2), captions, platform caption, pinned) |
| 1 second in weeks of median pay | 2,463.851 ÷ 1,251 | 1.970 | ≈ 2 weeks (label, ladder, VO, caption, pinned); the 2.8 s working's $2,464 ÷ $1,251 = 1.970 rounds the same |
| 5 seconds of profit | k × 5 | 12,319.25 | ≈ $12,319 |
| 5 seconds in weeks | 12,319.25 ÷ 1,251 | 9.848 | ≈ 10 weeks (label, ladder, VO, caption); $12,319 ÷ $1,251 = 9.847 rounds the same |
| Half a year of median pay | $1,251 × 52 ÷ 2 | 32,526 | $32,526 = 6 months (exact; the "Next" label at 10.8 s works it from the footer's pay) |
| Pass: half a year | 32,526 ÷ k | 13.201 s | ≈ 13 seconds (label, caption, **verdict**, platform caption, where the recut stops); 32,526 ÷ 2,464 = 13.201 rounds the same |
| Pass: a year of median pay (earlier cuts only) | 65,052 ÷ k | 26.403 s | ≈ 26 seconds (the round-2 and condensed verdict; not in the recut) |
| Counter at 1.5 s | k × 1.5 | 3,695.78 | $3,695 (frame check: the Scoreboard's running count rounds down, as 10a's $46,137) |
| Counter final (the recut) | k × 13.2013 | 32,526.03 | $32,526 (stops on the half-year pass; no ≈: the dollar reading is exact; stored rate $32,526.02) |
| Counter final (earlier cuts) | k × 26.4026 | 65,052.07 | $65,052 |
| Kit pass timing | value ÷ 2,463.85 (the stored rate), from 0.0 s | 1.000 / 5.000 / 13.201 s | each pass beat lands on its pass; the last at the stop itself (13.2012907 < 13.2013, after the exact pass 13.2012862) |

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
> 1 second of Amazon's profit ≈ 2 weeks of median full-time pay. Amazon kept $77.7 billion in 2025 (net income). Divide by the 31,536,000 seconds in a year: ≈ $2,464 a second. Median full-time pay is $1,251 a week (BLS), so 5 seconds ≈ 10 weeks of it, and half a year of it ($32,526) goes by every ≈ 13 seconds. Yours: 2,464 ÷ your weekly pay. Source: Amazon's Q4 2025 results (February 2026); pay: BLS. Educational maths, not advice.
> #amazon #moneymath #profit

**Pinned comment**
> 2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2. Yours?

**Per-platform notes**
- **YouTube Shorts:** the title is the header's question. The finished board is the screenshot frame (held 1.59 s in the recut and the condensed cut, 4.6 s in the round-2 cut).
- **Instagram Reels:** use the finished board with the verdict as the cover: 14.6-15.5 s in the recut, once the last caption has gone ("≈ 13 seconds: half a year." is up to 14.4 s and gone by 14.55; recut fix pass, it was 14.1-15.5 s) (the hero at $32,526, the big lit coin, the ladder reading ≈ 2 weeks · ≈ 10 weeks · 6 months, "HALF A YEAR OF MEDIAN PAY: ≈ 13 SECONDS."); it was 27 s on in the round-2 cut. Caption line 1 carries the hook's answer (1 second ≈ 2 weeks), which the verdict no longer repeats; on the cover it is the ladder's bottom row (≈ 2 weeks).
- **TikTok:**
  - Expected fights: "that's before tax" (the weeks are gross median pay, as the footer says), "net income includes one-off gains" (answer: the video uses the net income Amazon reports; other lines are not used on screen) and "AWS makes all the profit" (answer with the release's own segment figures only if asked).
  - Keep "1 second ≈ 2 weeks of median full-time pay" in the first 100 characters.
- **Look note:**
  - Ported from the Live Sheet to the Scoreboard on 2026-10-08 (Review log, "Port to scoreboard"). The header, footer, every number and the VO wording are unchanged. The fixer pass (Review log, "Fixer pass") split the verdict for the Scoreboard's slot (its second sentence, "1 second ≈ 2 weeks.", left it), moved "And a whole year?" from 21.0 to 22.8 s and dropped a leading "=" from a label line.
  - The Live Sheet's table becomes the Scoreboard's milestone ladder and label stack (as ported, with the year row; the recut drops it, see below):
    - the Profit column is the ladder (`pipLabels` "≈ $2,464", "≈ $12,319", "$32,526", "$65,052", the milestones' own amounts) and the big icon's tag: the targets the hero is chasing, from frame 1;
    - the You work column is what each ladder label turns into as its icon lands in the slot (`pipPassed` "≈ 2 weeks", "≈ 10 weeks", "6 months", "1 year"), so the answers stay hidden until passed and the end frame reads as the old finished column;
    - the Since play column rides the pass labels (`labels`: "1 SECOND: ≈ $2,464 / ≈ 2 WEEKS OF WORK" … ), the answer in the label stack's big line;
    - the formula bar's steps become `rateSteps`, one working per VO beat, each starting with its line and held to the next beat (round-2 cut: 2.8 s the median working, 7.4 s the rate's working, 15.8 s the swap-in rule, held 7.0 s, and 22.8 s "$1,251 × 52 = $65,052 / Next: a year of median pay", as 10a's "Next" beat, held 3.6 s into the verdict; the 7.4 s step is held 5.9 s, past the 13.2013 s pass, so frame 13.2 never flashes the resting rate: 5.8 s ended 1.3 ms short, and the checker caught it). In the condensed cut after its fix pass the rate's working is at 8.6 s and the swap-in rule at 17.4 s (each with its caption, so no text holds alone over 5.4 s), and the "Next" beat is held 3.7 s to the year's pass (26.403 s), whose label then holds 0.76 s until the verdict replaces it. A milestone label holds 4.2 s (`flash: 4.2`; the kit default is 3.0), so the 5-second row's label reaches the 8.6 s step and the half-year's the 17.4 s step.
  - `icons`: bills for the first three rows and a coin for the year, as 10a's ladder ends on a coin. `badges: false`: the kit would otherwise stamp the repeated bills "×5", "×13" from the names "5 seconds" and "≈ 13 seconds" (×13 is not true: it is 13.2 seconds), so they take the stacked twin on the ladder instead.
  - `final` is "$32,526" in the recut ("$65,052" before) with no "≈", so the hero draws no unlit "≈" ghost and lands centred on the pass, as 10a's $500,000 does.
  - The recut (2026-10-13; Review log, "Recut to the earlier verdict"): the ladder, `pipPassed`, `labels` and milestones lose the year row; `icons` are "bill", "bill", "coin", so the half-year row, now the last, takes the coin and its `climaxScale` growth; the `rateSteps` are the 2.8 s working, the $77.7B working at 6.5 s, the swap-in rule at 8.2 s and a new "Next" step at 10.8 s, "$1,251 × 52 ÷ 2 = $32,526 / Next: half a year of median pay", held to the pass (its second line is width-bound, a little under the other label lines); `runup` is `{ "beat": 0.40003, "from": 7.6 }` (13.201 s ÷ 33, the recut's §2.3 row; `from`, the kit's own opt-in, starts the pulses at 7.60 s instead of the 10.8 s "Next" beat, recut fix pass). The verdict is "Half a year of median pay: / **≈ 13 seconds**." (the owner's wording): its longer first line (779 px wide) sets it a little smaller than the year verdict: caps about 64 px against 68 px (78 px type), about level with the label lines (caps 62 px). If the owner wants the full size back, the shorter route is "Half a year of pay: / **≈ 13 seconds**." (the median is in the footer), measured at caps 67 px. That choice is put to the owner (Review log, *Owner decision*, follow-up); until the owner answers, the owner's wording stands.
  - Dropped with the Live Sheet: `preroll`, `formulaSteps`, `columns`, `rows`, `loop` (the Scoreboard reads none of them; its counter runs from `counterT[0]` = 0.0 s, so frame 1 is $0 without a preroll key).
  - The 2-line footer stays as written: the Scoreboard sets a `\n` footer as two 40 px rows and starts the stage one row lower.
  - Before the recut the verdict was two short lines, "A year of median pay: / **≈ 26 seconds**." (fixer pass). The judged version, "A year of median pay: **≈ 26 seconds**. / 1 second ≈ 2 weeks.", was width-bound in the Scoreboard's slot (line 1 at 776 px) and set at 54 px (caps 47), under the 72 px label line it replaces. Split, each line is short, and with `tallVerdict` (the kit's 196 px boxed slot: a black band rises over the stage foot in the 0.2 s before) it sets at **78 px** (caps about 68 px), above the label lines and level with 10a's one-line verdict (76 px). In the 170 px slot without the band it would set at 70 px. The 1-second answer stays on the end frame as the ladder's bottom row, in caption line 1 and in the pinned comment. If the owner wants "1 second ≈ 2 weeks" back in the verdict, the shorter route is "A year of pay: **≈ 26 seconds**." (the median is in the footer), at about 65 px.
  - `climaxScale: true`: the coin grows on its pass toward the bills' width, as far as the stage allows: 336 → 424 px across (the bills are 537 × 327), its top and foot 16 px inside the stage and the band. Its tag yields as it grows; the hero has just landed on the same number ($32,526 in the recut, where the half-year coin grows the same way).
  - Kit changes in the Scoreboard `cost-counter` module (this port; defaults unchanged, so 10a and the two samples render pixel-identically): `pipPassed` (a ladder label that turns into its answer once passed, the column sized for the wider text) and `badges: false`.
  - Kit changes in the fixer pass: `climaxScale` and `tallVerdict` (both opt-in, default off); a leading "≈ " in a ladder label hangs in a gutter as wide as "≈ ", so the column's digits align (only in a column that has one, so not in 10a); and the big icon keeps clear of the ladder column at its pop's peak (the bump's 1 + amp, plus 16 px of glow, plus 14 px): its art box sits right of the region's centre (here x 404-938 at rest, 33 px clear of "≈ 10 weeks" at the peak, was 4 px). That last one shows in 10a too (its Look note).
  - No `slot`: the label stack and the ladder carry the answers, and frame 1 holds one task. No Amazon logo or brand colours: the name is text in the header.
  - Condensed cut, fix pass (spec knobs and one opt-in kit option; the round-2 spec sets none of them): `flash: 4.2` (a milestone label holds to the moved 8.6 and 17.4 s beats), `stream: 24` (a denser money stream, the kit default 14, so the stage keeps moving while the counter climbs between beats) and `runup: { "beat": 0.40005 }` (from the "Next" beat at 22.8 s the coin pulses on the score's beat, P 26.403 s ÷ 66 beats, its tag, the ladder's top row and the hero's glow with it; the hero swells 4% over the riser). None adds a cue. With the hero counter masked, 23.7-26.4 s measured near-still before (the coin nearly full, the stream falling a short way); see the Review log.

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

### Assembly pass 4 (2026-10-08): 10b QA fixes

The round-2 assembly QA scored 10b 7/10: the build was clean and every number right, but the payoff frame had a confusing hero number and the back half dragged. Every must and should issue is fixed below, and so are the nits. Check: **999 checks, 0 failures**. Lint: 1/1 clean, 0 warnings (and the two Becker `cost-counter` samples). Files: the spec, `looks/becker-rig/formats/cost-counter.js` (no shared kit file), this write-up and the check.

| # | Severity | Issue | What I did |
|---|---|---|---|
| D1 | must | The counter locked on "≈ $2,604,105" right above "✓ 40 years of median pay: $2,602,080" on the climax frame (and the IG cover) | **Fixed.** counterT ends at **33.27411** s and `final` is "$2,602,080" (no ≈); hold 3.32589. QA suggested 33.275 s, but that stops $70 past the pass ($2,602,150), which the check's "lands on" rule rejects: the stop is set to 5 decimals, after both the exact-rate pass (33.2741064 s) and the kit's stored-rate pass (33.2741059 s), and r × 33.27411 = $2,602,080.28. The first frame on or after it is 33.3 s, with the burst, the VO and the hit. The board and the strip now read the same number, and the ≈ tuck nit is gone with it |
| D2 | should | The header coloured "1 minute" (the debt side) green | **Fixed.** Pay is green and debt red from frame 1: "Your pay for **40 years** vs / __1 minute__ of new US debt?". QA's "**40 years** of your pay vs / __1 minute__ of …" puts the two coloured runs on top of each other in adjacent lines, and the linter fails it (the kit's 1.02 leading makes their text boxes overlap); this order puts them on opposite sides, with the same words |
| D3 | should | The 3-line hook was fitted down to ≈ 60 px and filled only x 62-720 | **Fixed.** 2 lines, 12 words, set at ≈ 84 px across the full measure. "Which is bigger?" is in the title and the first VO line |
| D4 | should | 16.6-33.3 s: no ✓ for 16.7 s, and the per-brick tick was ≈ 29 dB under the pops | **Fixed.** (1) The plinth counts down "40 years left" … "1 year left" … "0 years left", the number popping as each brick goes (`opener.countdown`, new in the format file). (2) The tick gain is 0.55 (was 0.2). (3) A 30-year milestone, "30 years of median pay: $1,951,560", passes at 24.96 s (it is the 30th brick, so 10 are left) with a ✓, a pop and a flinch (`actions` milestone 3; flattened moved to 4) |
| D5 | should | VO 25.3 "1 minute: ≈ $4.7 million." settled the duel 8 s before the burst | **Fixed.** vo[8] is "30 years gone. 10 left." at 25.1 s (d 3.3; "30 years" is said 0.14 s after the pass), and the stopwatch's end label "≈ $4.7 million" moved to 33.3 s, so it arrives with the burst and the verdict |
| D6 | should | The caption wrapped "≈ $2.46 / trillion" for 5.8 s | **Fixed.** vo[4] joins "≈ $2.46 trillion" with no-break spaces and wraps "The debt grew / ≈ $2.46 trillion in 364 days.". The kit's caption builder (`wordTokens` in `lib.js`) splits on any whitespace, NBSP included, so the format file regroups NBSP-joined words into one no-wrap unit on its first seek (reported as a shared bug) |
| D7 | should | The figure stood in the post when shocked (16.7-18.2 s) and in the end hold (impaled) | **Fixed.** In stack mode his head stays 40 px clear of the post and his torso and pencil to its right; he sits more upright (`sitUp`, `sitUpLook`), so he fits between the post and the plinth, clear of both. The narrower plinth (D4's countdown line is shorter than "40 years of median pay") gives him 70 px more floor |
| D8 | should | The end frame had no single focal point; the red stamp sat ≈ 25 px from the end label and disagreed with the verdict's green "≈ 33 seconds" | **Fixed.** The stamp takes the verdict's colour for the same words (green) and is fitted 40 px clear of the end label (it steps down from 108 px when it must). With the counter on $2,602,080 the board no longer competes. The stopwatch's 0:33 stays: it is the instrument the minute is read on |
| D9 | nit | "1 MINUTE" and "≈ $4.7 million" were right-aligned to x 937, off the stopwatch's axis | **Fixed.** The stopwatch moves left (to x 801) so both label lines centre on it, with the wider one ending at the rail |
| D10 | nit | The buzz at 16.5 s came ≈ 0.25 s before the red snap | **Fixed in the format file:** with explicit heat keys the colour snaps on the key (16.5-16.65 s), so the buzz and the snap land together and the 20-year pass (16.64 s) kicks a red board |
| D11 | nit | Two VO lines had no visual | **Fixed.** Footer line 1 turns ink for "The debt grew ≈ $2.46 trillion in 364 days." (10.6-16.4 s); on "40 × $65,052 ≈ $2.6 million." he points, arm straight and snapped out in 0.2 s, at the plinth's "40 × $65,052" (18.3 s). Not done: the optional "= $2,602,080" on the plinth, which would have interrupted the countdown for 4.7 s |

**Checked:**
- Lint 0 errors, 0 warnings; the two Becker `cost-counter` samples too (neither uses stack mode, heat keys or NBSP).
- Contact sheet and stills at 0, 1.0, 12.0, 16.6, 17.0, 18.4, 18.6, 23.4, 25.1, 25.3, 33.27, 33.3, 33.5, 34.0 and 36.5 s. Every counter reading equals floor(78,201.35 × t) ($78,201 at 1.0 s, $938,416 at 12.0, $1,438,904 at 18.4, $1,829,911 at 23.4, $1,962,853 at 25.1, $2,601,758 at 33.27), then $2,602,080 from the stop. The plinth's count matches the bricks left (39 at 1.0 s, 26 at 12.0, 20 at 17.0, 18 at 18.4, 12 at 23.4, 10 at 25.1, 1 at 33.27, 0 from 33.3).
- MP4 rendered to `studio/out/10b-becker-rig-debt-vs-your-pay.mp4` (36.6 s, 1080×1920, 30 fps, h264 + aac). Frames pulled from it at 12.0 s ($938,416, "26 years left", footer line 1 in ink, the caption wrapped before "≈ $2.46 trillion") and 34.5 s ($2,602,080 over the matching ✓, the green stamp, "0 years left", the verdict, him seated clear of the post) match the stills. A brick tick now measures ≈ 10 dB under a pass pop (RMS 460 against 1,440, each over its own length).
- `teasers/v2/teasers.json` still carries the pre-pass 10b entry (the 3-line header, the four milestones, "counter final ≈ $2,604,105 at 33.3 s"); it was outside this pass's files.

### Port to scoreboard (2026-10-08): 10c from the Live Sheet

The owner kept two looks, Scoreboard and Becker Rig, and retired the Live Sheet. 10c moved to the Scoreboard as `10c-scoreboard-amazon-makes`, held to the bar of 10a (the Scoreboard teaser of this format). The old spec is `studio/specs/retired/10c-live-sheet-amazon-makes.json` (moved with `git mv`). Check: **1008 checks, 0 failures**. Lint: 0 errors, 0 warnings (and 10a and the two Scoreboard `cost-counter` samples: 4/4 clean).

**Kept, word for word:** the header (the hook), the 2-line footer, all 8 VO lines and their times, the verdict, `data` (label, rate, counterT [0.0, 26.4026], the 4 milestones, final "$65,052", hold 4.5974), the duration (31.0 s), the caption and the pinned comment. No number changed, and no beat moved: the passes land at 1.000 / 5.000 / 13.201 / 26.403 s as before.

**Changed (`lookOpts` only, for the new kit):**

| Live Sheet | Scoreboard | Why |
|---|---|---|
| `preroll: 0` | (none) | The Scoreboard counts from `counterT[0]`; frame 1 is $0 without a key |
| `columns` + `rows` (Since play · Profit · You work) | `pipLabels` (the Profit column) on the milestone ladder; `pipPassed` (the You work column) as what each ladder label turns into once passed; `labels` (time: profit / the answer) slammed into the label stack on each pass | The Scoreboard has no table. The ladder keeps the countable loop (four targets from frame 1, no answer until its pass), and the passed rows end as the old finished column |
| `formulaSteps` (6) | `rateSteps` (4): the median working at 2.8 s, the rate's working at 7.4 s, the swap-in rule at 15.8 s, "$1,251 × 52 = $65,052 / Next: a year of median pay" at 21.0 s | Labels carry the working, captions the sentence (10a's rule). The 0.0, 5.2, 13.2 and 26.4 s steps are now the resting rate and the pass labels; the 26.4 s working ("$65,052 ÷ $2,464 ≈ 26 s") is the verdict's job |
| `loop` | (none) | The Scoreboard has no loop key; the hold ends on the finished board and the replay restarts at $0 |
| | `icons` (bill, bill, bill, coin), `badges: false`, `heroIcon: false`, `pips: true` | One money object per row, the coin for the climax (as 10a). Without `badges: false` the kit would stamp the repeated bills "×5" and "×13" from the time names ("≈ 13 seconds" is 13.2 s, so "×13" would be wrong) |

**Kit changes** (`studio/looks/scoreboard/formats/cost-counter.js` only; both default off, so 10a and the two samples render pixel-identically to before, checked on 10a's stills at 0, 1.5, 8.3, 16.5 and 33.5 s):
- `pipPassed`: a ladder label shows its target ahead and turns into its answer as its icon lands in the slot, with the slot's bump (the column is sized for the wider of the two, so the big icon's region and the flying icon's ducking stay right).
- `badges: false`: a repeated icon never takes a "×N" badge from its name; it gets the stacked twin.

**Found and fixed during the port:**
- The 7.4 s rate step, held 5.8 s, ended at 13.2 s, 1.3 ms before the half-year pass (13.2013 s): frame 13.2 would have flashed the resting rate between two beats. Held 5.9 s (the pass cuts it). The checker now asserts that every label beat holds to the next one.
- The frame check at 1.5 s is $3,695, not the Live Sheet's $3,696: the Scoreboard's running count rounds down (as 10a's $46,137). Maths table and checker row updated.

**Checker** (`checks/10-cost-counter.py`): 10c's id and look; the expected `lookOpts` built from the computed numbers (labels, rate steps, ladder targets and answers); the kit-timing rule switched from the Live Sheet's (final ÷ run) to the Scoreboard's (value ÷ perSecond from 0.0 s), with all four passes before the stop; new asserts that the ladder is the milestones' own amounts, the pass labels are the milestone labels, the ladder answers match the label stack's, and no label beat leaves a gap; `beats` lists the four rate steps against the VO lines they start. Break test in a scratch copy: the look back to "live-sheet", the 7.4 s step back to 5.8 s, and the first ladder answer as "≈ 3 weeks". It reported 3 failures, catching all three (the look, the `lookOpts` mismatch and the unsourced 3).

**Checked:**
- Contact sheet and stills at 0, 1.0, 1.5, 2.8, 5.0, 7.4, 13.2, 15.8, 21.0, 26.4 and 30.97 s (end). Frame 1 shows the header, $0, the footer with $1,251 × 52, the four targets on the ladder, the bill ghost tagged "≈ $2,464" and the resting rate. Every hero reading equals floor(2,463.85 × t): $2,463 (1.0 s), $3,695 (1.5), $6,898 (2.8), $12,319 (5.0), $18,232 (7.4), $32,522 (13.2), $38,928 (15.8), $51,740 (21.0), $65,045 (26.4), then $65,052 from the stop. The ladder ("≈ $2,464 · ≈ $12,319 · $32,526 · $65,052", turning "≈ 2 weeks · ≈ 10 weeks · 6 months · 1 year"), the tags, every label, the footer and the verdict match this file and the check.
- MP4 rendered to `studio/out/10c-scoreboard-amazon-makes.mp4` (31.0 s, 930 frames, 1080×1920, 30 fps, h264 + aac, 34 sfx). Frames pulled from it at 0 ($0, frame 1), 5.0 s ($12,319, "5 SECONDS: ≈ $12,319 / ≈ 10 WEEKS OF WORK", the ladder's "≈ 2 weeks") and the last frame ($65,052, the lit coin, the four answers, the verdict) match the stills (PSNR 41.9, 41.0 and 38.7 dB: encoder noise only).

**Left as is** (the verdict and the coin were fixed in the fixer pass below): the two-line verdict sets at about 54 px in the Scoreboard's slot, under the 72 px label line (10a's A6 issue). The verdict is the blind-judged one, so its words stay; the payoff number lands full size in the hero. `teasers/v2/teasers.json` still lists 10c as `10c-live-sheet-amazon-makes` (its spec and `renders/v2/` paths); it was outside this port's files, and so was copying the new MP4 into `renders/v2/`.

### Fixer pass (2026-10-08): 10c QA fixes in the Scoreboard

The Scoreboard QA scored the port 7.5/10: a clean, accurate port, almost level with 10a, with one real gap, the end frame's verdict setting smaller than the label line before it. Every should is fixed below where this pass owns the files, and so is every nit. Check: **1005 checks, 0 failures**. Lint: 0 errors, 0 warnings (and 10a and the two Scoreboard `cost-counter` samples: 4/4 clean). Files: the spec, `looks/scoreboard/formats/cost-counter.js` (no shared kit file), this write-up and the check.

| # | Severity | Issue | What I did |
|---|---|---|---|
| F1 | should | The verdict set at about 53 px (46 px caps) under the 62 px caps of the label line it replaces; line 1 ("A YEAR OF MEDIAN PAY: ≈ 26 SECONDS.") was width-bound at 776 px | **Fixed.** Verdict **"A year of median pay: / **≈ 26 seconds**."**, each line short, with "≈ 26 SECONDS" alone on its green line. In the 170 px label slot two lines fit at 70 px, so the spec also sets `tallVerdict` (new, opt-in): the verdict takes the kit's own 196 px boxed slot (`L.limit - 196`, the band that chart-race and pov-race use) and sets at **78 px** (caps about 68), above the label lines and level with 10a's 76 px. The dropped second line ("1 second ≈ 2 weeks.") is the hook's answer: it stays on the end frame as the ladder's bottom row ("≈ 2 weeks"), in caption line 1 and in the pinned comment. This changes the judged verdict's wording, as the look needs (QA flagged it for the owner); the md notes the shorter one-line route if the owner wants the 1-second line back. R11, R12, the beat sheet, the Look note and the Reels note are updated, and the check's expected verdict |
| F2 | should | The port's MP4 is only in `studio/out/`; `renders/v2/` and `teasers/v2/teasers.json` still point at the retired Live Sheet build | **Not done in this pass: outside its files** (the rules allow the spec, this format's kit file, this write-up and the check). For whoever owns them: copy `studio/out/10c-scoreboard-amazon-makes.mp4` to `renders/v2/`, point the `teasers.json` entry (lines 751-767) at id `10c-scoreboard-amazon-makes`, spec `studio/specs/10c-scoreboard-amazon-makes.json`, mp4 `renders/v2/10c-scoreboard-amazon-makes.mp4`, look `scoreboard`, and move or retire `renders/v2/10c-live-sheet-amazon-makes.mp4`. Its key numbers should take the new verdict |
| F3 | nit | 3.8 s with no VO before the climax (22.6-26.4), 1.4 s of it before the riser | **Fixed.** vo[6] "And a whole year?" and its rate step moved 21.0 → 22.8 s (words unchanged), so the question lands into the riser (24.0-26.4 s, still 2.4 s: the kit times it from the last beat). The silences are now 20.8-22.8 s, with the swap-in rule holding (its step is held 7.0 s), and 24.4-26.4 s, on the riser. The checker's beat list and VO time follow |
| F4 | nit | Each pass's bump scaled the big bill to about 9 px from "≈ 10 weeks", its glow over the "s" (10a the same with "Median $65K") | **Fixed in the format file.** The big icon's left bound now counts its biggest frame: the bump's peak (1 + amp: 1.12 on a pass, 1.16 on the last), plus 16 px of glow, plus 14 px of air off the ladder column. The art box shifts right of the region's centre for that (its resting right edge up to x 960; past that it would shrink). 10c's bills sit at x 404-938 and clear "≈ 10 weeks" by 33 px at 13.25 s (was 4 px); 10a's clear "Median $65K" by 33 px at 2.15 s. A pure function of t, as before; the samples (no ladder labels) do not move |
| F5 | nit | The "≈" prefixes made the ladder column ragged by about 37 px | **Fixed in the format file.** A leading "≈ " in `pipLabels` / `pipPassed` hangs in a gutter as wide as "≈ " at the column's left edge, so every row's "$" or first digit starts at one x and the ≈ sits in the margin. The column's right edge (and so the big icon's region) does not move. Only a column with a "≈" gets the gutter, so 10a's ladder is unchanged |
| F6 | nit | Label line 2 opened with a bare "=" ("= YOUR WEEKS PER SECOND"); the caption split "weekly / pay" | **Fixed.** The 15.8 s step's l2 is "your weeks per second" (the two lines still read as working). vo[5] joins "weekly pay" with a no-break space (wording unchanged; the Scoreboard's caption splitter breaks only at plain spaces), so the caption reads "2,464 ÷ your weekly pay / = your weeks.". Both are in the check's expected strings |
| F7 | nit | The climax coin (about 335 px) was smaller than the bills before it (about 535 px wide) | **Fixed in the format file, opt-in.** `climaxScale: true \| n` (default off, so 10a is unchanged): the last milestone's icon grows on its pass, from its own size to the widest earlier icon's art width (or n×), on `ease.back` with a small bump riding on it, as far as the stage allows at the curve's peak (top to the stage foot, or to the verdict band). Here the stage's height is the cap: the coin goes 336 → **424 px** across (26% wider, 59% more area; taller than the 327 px bills), 16 px inside the stage top and the band. It takes the stage's whole height (it moves 16 px down to centre in it as it grows), so its tag has no room under it: the tag turns green and fades in 0.1 s as the coin grows over it, while the hero lands on the same $65,052 (one focal number) |

**Checked:**
- Lint 0 errors, 0 warnings (10c, 10a and the two samples).
- Stills at 0, 13.25, 17.0, 21.5, 23.2, 26.43, 26.5 and 30.97 s (end), and geometry probes at every frame from 26.43 to 27.0 s. Frame 1 is unchanged but for the ladder gutter and the bill 28 px to the right. Hero readings equal floor(2,463.85 × t): $32,646 (13.25 s), $41,885 (17.0), $57,161 (23.2), then $65,052 from the stop. The caption at 17.0 s wraps "2,464 ÷ your weekly pay / = your weeks."; at 23.2 s the label stack holds "$1,251 × 52 = $65,052 / NEXT: A YEAR OF MEDIAN PAY" under "And a whole year?". The coin rests at x 459-883, y 661-1086 (stage 645-1130, band from 1102); at its biggest frames (26.5-26.8 s) it stays 9 px inside the stage top and 14 px above the band. The end frame: the hero on $65,052, the lit coin, the ladder "1 year · 6 months · ≈ 10 weeks · ≈ 2 weeks" with the digits aligned, and the verdict at 78 px.
- 10a: stills at 2.15 s and the end. Its median bill clears the ladder label by 33 px at the pop's peak; nothing else moved (its verdict, 76 px, and ladder are unchanged).
- Break test in a scratch copy of the specs: vo[6] back at 21.0 s, the "=" back on l2, vo[5] with a plain space, and the verdict with "1 second ≈ 3 weeks." added. It reported 6 failures, catching all four (the VO time and the beat, the `lookOpts` mismatch, the VO text, the verdict and the unsourced 3).
- MP4s rendered to `studio/out/10c-scoreboard-amazon-makes.mp4` (31.0 s, 930 frames, 1080×1920, 30 fps, h264 + aac, 34 sfx) and, for the kit's bump-room change, `studio/out/10a-scoreboard-debt-interest-live.mp4` (36.5 s, 1095 frames, 45 sfx). Frames pulled from the 10c MP4 at 0, 17.0, 26.5 s and the last frame (the grown coin, the aligned ladder, the 78 px verdict) match fresh stills (PSNR 41.9, 39.7, 39.5 and 40.0 dB), and 10a's frame 66 (2.2 s) matches its still (39.3 dB): encoder noise only.

### Condensed cut (2026-10-13): 10a, 10b, 10c

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The precedent is 06c (30.5 → 18.2 s) and 06b (33.0 → 20.8 s) (`06-pov-race.md`, "Condensed cut" and "Opening hold fix and re-ship"), and their rules apply: keep the hook, every number, the verdict wording, the facts and the end card; frame 1 is the thumbnail, with the hook caption complete and something moving from frame 2; no still run of 0.4 s or more before the verdict hold (near-stills count); captions up at least max(1.2 s, 0.12 s a word); the verdict about 0.8-1.5 s after the final reveal, held about 1.2-1.6 s; a teaser as short as its story allows. Publishing data is a separate step.

**Files:**
- New: `studio/specs-wip/10a-scoreboard-debt-interest-live.json`, `studio/specs-wip/10b-becker-rig-debt-vs-your-pay.json` and `studio/specs-wip/10c-scoreboard-amazon-makes.json`: retimed copies of the round-2 specs (the file's own formatting kept, one caption per row).
- Changed: this write-up (the status paragraph, the shared Sync note, the three beat sheets and caption tables, the per-platform cover times, the maths rows that quoted VO times, this entry) and `checks/10-cost-counter.py`.
- Not touched: `studio/specs/`, every kit file (`studio/looks/**`: **no kit change**, every change is a spec value), `studio/src/**`, `studio/sound/**`, `studio/test/**`, `publishing/` and `renders/`. Renders are in `/tmp/cond/10/<id>/final/<id>.mp4` only (the picture with the sound rebuilt on it; the picture-only `render/` copies were deleted after the audit, since `final/` carries the same video stream, md5 checked). Nothing is committed.

**Why these three stay over 30 s (the real-time constraint).** This format's counters run in real time, and the hooks say so: "US debt interest **since you hit play**", "New US debt since you hit play" on 10b's board, "Amazon's profit since you hit play" on 10c's label stack. Frame 1 reads $0, the rate is the sourced one, and each counter stops on its last milestone, which is the verdict's own number: $1,000,000 at 32.511 s ("**$1M** a year: ≈ 33 seconds."), the 40th brick at 33.274 s ("40 years of median pay: **≈ 33 seconds**."), a year of median pay at 26.403 s ("A year of median pay: **≈ 26 seconds**."). A faster clock would make "since you hit play" false and the verdict's "≈ 33 seconds" disagree with the clip, and an earlier last milestone changes the verdict. Both are against the brief, so **no pass moved**: `counterT`, `perSecond`, the milestones and every pass time are the round-2 cut's. What the cut changes is everything around the clock: the still hold after each verdict, the verdict's timing, frame 1 and the caption pacing. The bodies end at the last pass + the verdict's lag + its hold. A shorter teaser needs a new verdict (see Open items).

**Kept, character for character:** the header, the footer, every caption's words, every display string and number, the milestones and their labels, the ladder (`pipLabels`, `pipPassed`), every `rateSteps` text and time, the icons, the stack, the stopwatch, the heat keys, the stamp, the actions, `final`, the spec's `sfx` (10b's buzz, riser and hit), the verdict text and the 2.5 s end card (the brand layer is untouched). One `lookOpts` value changed: 10c's 22.8 s step is held 3.7 s, not 3.6 (below).

**Measured before** (`renders/channel/<id>.mp4`). Method as for 06b/06c: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG); a frame is still when YAVG < 0.15, near-still < 0.25 (`/tmp/cond/10/tools/motion2.py`, with a per-region split in `regions.py`).
- **10a** (36.5 s + card = 39.0 s): still runs ≥ 0.4 s only after the verdict: 33.37-34.27 (0.90) and 34.30-36.53 (2.23; a one-frame caption-fade break between them), then the card hold 38.00-39.00. The verdict (on the stop, 32.5 s) held 4.0 s, 3.1 s of it still.
- **10b** (36.6 s + card = 39.1 s): 34.07-34.73 (0.67) and 34.90-36.63 (1.73) after the burst and verdict at 33.3 s (held 3.3 s), then the card hold 37.83-39.10.
- **10c** (31.0 s + card = 33.5 s): 26.97-28.17 (1.20) and 28.20-31.03 (2.83) after the verdict on the stop (26.4 s, held 4.6 s), then the card hold 32.50-33.50.
- **Before the verdict, none of the three has a still or near-still run of 0.2 s or more.** Each counter is the hero and changes every frame (10a $1,025 a frame, 10b $2,607, 10c $82). Full-frame YAVG from frame 2 to the reveal stays ≥ 0.29 (10a) and ≥ 0.27 (10b); 10c dips under 0.15 on two single frames (lowest 0.12) and under 0.25 for at most two frames in a row. The condensed renders measure the same, since the middle's picture did not change. The Scoreboard's money stream adds 0.03-0.17 on the stage (it thins as the icon fills, because the dots fall a shorter way). In 10b the figure and the stack stand still for about 0.5 s between brick slurps, while the board counts.
- Also: the hook caption typed on at frame 1 in all three (`vo[0].t` 0.0); the captions, paced for a narrator, left uncaptioned stretches of 1.6-2.9 s (10a 29.6-32.5, the riser, and 27.4-28.0; 10b 6.6-8.2 and 31.0-33.3; 10c 20.8-22.8 and 24.4-26.4).

| | Round-2 cut | Condensed cut | Why |
|---|---|---|---|
| Body / total (10a, 10b, 10c) | 36.5 / 39.0, 36.6 / 39.1, 31.0 / 33.5 s | **34.95 / 37.45, 35.75 / 38.25, 28.8 / 31.3 s** | The last pass + the verdict's lag + its hold (the clock is fixed) |
| Counter clock (`counterT`, `perSecond`, every pass) | 32.51135, 33.27411, 26.4026 s | **unchanged** | Real time: "since you hit play" |
| `vo[0].t` | 0.0 (types on at frame 1) | **−0.4** | The hook caption is complete on frame 1: a Scoreboard line has finished its 0.14 s rise by t = 0; 10b's six words are pre-typed by −0.015 s |
| Captions | Narration-paced, gaps up to 2.9 s | **Reading-paced, back to back** (gaps 0-0.05 s) | Each up ≥ max(1.2 s, 0.12 s a word) from frame 1 (the shortest, 10a's "Median pay: passed.", is up exactly 1.2 s, fixed by the median and $100K passes 1.14 s apart). "And the last row?" (10a), "How long do 40 years last?" (10b) and "And a whole year?" (10c) now hold through their risers |
| A milestone's caption | Speech-synced (10a's $250K said at 8.5 s, 0.37 s after the pass) | **Up within −0.15..+0.3 s of the pass** | They say "passed" and "gone": never early, never late. 10a $250K 8.15 (pass 8.128), 10b 3 years 2.5 (2.496) and 10 years 8.3 (8.319), 10c 5 seconds 5.0 (5.000) |
| `verdict.t` | On the reveal: 32.5, 33.3, 26.4 | **33.35 (stop + 0.84), 34.2 (the lock's hit + 0.9), 27.21 (stop + 0.81)** | The reveal (the stop, the coin's pop or growth; 10b's burst, stamp and end label) registers first. The Scoreboard verdict replaces the label stack, which shows the last pass's label ("$1,000,000 A YEAR / ≈ 33 SECONDS", "≈ 26 SECONDS: $65,052 / 1 YEAR OF WORK") until it yields |
| Verdict hold | 4.0, 3.3, 4.6 s | **1.6, 1.55, 1.59 s** | The precedent's 1.2-1.6 s |
| `data.hold` | 3.98865, 3.32589, 4.5974 | **2.43865, 2.47589, 2.3974** | = duration − `counterT[1]` |
| 10b's last caption, "A working life: **≈ 33 seconds.**" | Shown 33.3-35.7 | **Lands under the verdict at 34.2 and is never shown** | The Becker Rig verdict takes the caption band (06c's last line does the same); the verdict carries the same words and adds ≈ $4.7 million |
| 10c `rateSteps[3].d` ("Next: a year of median pay", 22.8 s) | 3.6 | **3.7** | It ended at 26.400, 2.6 ms before the last pass (26.40258 at the stored rate): with the verdict on the stop that gap was covered; with the verdict at 27.21 a frame inside it would flash the resting rate. No frame falls inside it (22.8 + 3.6 = 26.400000000000002 in float, after frame 792's 26.4), so the picture and the cue record are the same either way: stills at 22.8, 26.367, 26.4, 26.433 and 27.0 s are pixel-identical with 3.6 and 3.7, and the `cues` dumps are byte-identical. The check now holds every label beat to the next one on either cut |
| Cue records | 49 / 52 / 38 cues | **50 / 52 / 39** | 10a and 10c: the kit cues a `reveal` at a verdict that lands ≥ 0.6 s from the last pass (33.35, 27.21). 10b: the chrome's verdict ding moves 33.3 → 34.2. Base and the card move with the duration. Every other cue is where it was |

**Iteration.**
- 10c's verdict went in at 27.25 (stop + 0.85). Its near-still between the coin settling and the verdict's yield was 26.80-27.20, 0.40 s: at the limit. At 27.2 it was 0.37 s, but 0.797 s after the stop, under the 0.8 s floor. **27.21** keeps the 0.37 s (the label stack yields from 27.143, inside the same frame) and is 0.807 s after the stop.
- 10a's verdict at 33.35 leaves 0.33 s of near-still (32.97-33.30) between the landing's glow and the yield. 10b's lands at 34.2, while the burst's shake and the stamp's wobble are still settling (the longest run under 0.15 is 34.07-34.20, 0.13 s).
- The new label-hold rule found 10c's 2.6 ms gap (above) on the first run of the condensed check.

**Measured after** (`/tmp/cond/10/<id>/render/<id>.mp4`, and again on `final/<id>.mp4` with the same runs; same method):

| | Still runs ≥ 0.4 s | Before the verdict: longest still / near-still run |
|---|---|---|
| 10a round-2 (39.0 s) | 33.37-34.27, 34.30-36.53 (after the verdict at 32.5), card 38.00-39.00 | none ≥ 0.2 s |
| **10a condensed (37.45 s)** | **only the verdict hold, 33.60-34.70** (33.47-34.97 near-still, one caption-fade frame at 34.70), and the card hold 36.43-37.47 | **0.20 s still (33.10-33.30) / 0.33 s near-still (32.97-33.30)**, the landing's glow settling |
| 10b round-2 (39.1 s) | 34.07-34.73, 34.90-36.63 (after the verdict at 33.3), card 37.83-39.10 | none ≥ 0.2 s |
| **10b condensed (38.25 s)** | **only the verdict hold, 34.90-35.77**, and the card hold 36.97-38.27 | **0.13 s (34.07-34.20), none near-still ≥ 0.2 s** |
| 10c round-2 (33.5 s) | 26.97-28.17, 28.20-31.03 (after the verdict at 26.4), card 32.50-33.50 | none ≥ 0.2 s |
| **10c condensed (31.3 s)** | **only the verdict hold, 27.47-28.57**, and the card hold 30.30-31.30 | **0.17 s still (27.00-27.17) / 0.37 s near-still (26.80-27.17)**, the coin settling |

- The verdict holds: 10a 1.6 s, 1.33 s of it still; 10b 1.55 s, 0.87 s still (the verdict's pop, its swoosh to 34.88 and his look up to 35.02 move first); 10c 1.59 s, 1.33 s still. The round-2 holds had 3.13 s (10a), 2.39 s (10b) and 4.03 s (10c) of still.
- Frame 1 → 2: each counter leaves $0 (frame 2 reads $1,025, $2,606 and $82; the stills at 0.034 s read $1,045, $2,658 and $83), and the money stream (Scoreboard) is already falling at frame 1. Full-frame YAVG between frames 1 and 2 is 2.43 (10a), 2.43 (10b) and 1.44 (10c).
- The middle is the round-2 cut's picture apart from the caption times (the same passes, label beats, bricks and heat keys): no still or near-still run ≥ 0.2 s from frame 2 to the reveal in any of the three.

**Stills read** (`node src/cli.mjs stills`, tiled):
- 10a at 0, 0.03, 0.98, 2.13, 3.27, 5.45, 8.15, 12.5, 16.3, 19.15, 22.75, 28.05, 30.5, 32.52, 32.8, 33.2, 33.4, 33.8, 34.9, 35.5 and 37.4 s. Frame 1: the header, $0, the six pips, the $30K bill ghost, "≈ $30,800 / EVERY SECOND", the footer and the complete "Find your salary.". Hero readings: $1,045, $30,143 (0.98 s, "$30,000 A YEAR / ≈ 1.0 SECOND"), $65,515 ("MEDIAN PAY: $65,052 / ≈ 2.1 SECONDS"), $100,580, $167,633, $250,681, $384,481, $501,363, $589,025, $699,755, $862,775, $938,134, then $1,000,000 from 32.52 s with "$1,000,000 A YEAR / ≈ 33 SECONDS" to 33.2 s and the verdict "$1M A YEAR: ≈ 33 SECONDS." from 33.4 s. The card at 35.5 and 37.4 s.
- 10b at 0, 0.03, 0.2, 0.84, 2.52, 4.25, 8.33, 10.65, 16.55, 16.7, 18.4, 23.2, 25.0, 25.15, 28.7, 31.5, 33.0, 33.28, 33.35, 33.5, 33.7, 34.0, 34.25, 34.6, 35.1, 35.7 and 38.2 s. Frame 1: $0, "40 years left", 0:00 and the complete "Your 40 years, or 1 minute?". The plinth counts 39 (0.84 s), 37, 35, 30, 28, 21, 20, 18, 13, 10, 6, 3, 1 and 0 years left; the ✓ strips read "30 years of median pay: $1,951,560" (25.15 s) and "40 years of median pay: $2,602,080" (33.5 s on). The white impact frame at 33.28 s; the stamp "≈ 33 SECONDS" and "≈ $4.7 million" from 33.5 s under "How long do 40 years last?"; the verdict popping in at 34.25 s and settled from 34.6 s; the card at 38.2 s.
- 10c at 0, 0.03, 1.0, 1.75, 2.85, 5.02, 5.75, 7.45, 13.21, 13.95, 15.85, 20.5, 22.85, 24.5, 26.41, 26.7, 27.0, 27.15, 27.3, 27.6, 28.75 and 31.25 s, and the final end sequence again at 26.4, 26.43, 27.0, 27.17, 27.23, 27.5, 28.0, 28.77 and 29.0 s. Frame 1: $0, the ladder "≈ $2,464 · ≈ $12,319 · $32,526 · $65,052", the bill ghost, the resting rate and the complete "How long do you work for this?". The ladder turns ≈ 2 weeks (1.75 s), ≈ 10 weeks (5.75), 6 months (13.95), 1 year (26.43); at 26.4 s the label is still "NEXT: A YEAR OF MEDIAN PAY" over $65,045, at 26.43 "≈ 26 SECONDS: $65,052 / 1 YEAR OF WORK"; the band rises at 27.17, the verdict slams at 27.23 and holds to 28.77; the card at 29.0.

**Lint:** `node src/cli.mjs check specs-wip/<id>.json`: 10a 37.45 s = 34.95 + 2.5 s end card, 10b 38.25 = 35.75 + 2.5, 10c 31.3 = 28.8 + 2.5; 0 errors, 0 warnings each.

**Render and sound** (`/tmp/cond/10/<id>/`):
- `render specs-wip/<id>.json --out …/render`: 10a 1124 frames, 37.47 s, 50 sfx; 10b 1148 frames, 38.27 s, 52 sfx; 10c 939 frames, 31.3 s, 39 sfx.
- `sound specs-wip/<id>.json --video …/render --out …/final --score`: the video md5 is identical in each (10a `e19f2377f8b9`, 10b `883f6007b54c`, 10c `6a36ca64a85f`). P by the riser rule at 32.511, 33.300 and 26.403 s (as before); 147.642 / 147.601, 122.523 / 122.449 and 149.983 / 150.188 BPM; cue onsets within 0.06, 0.13 and 0.1 ms.
- The §2.3 rows the promotion will need (`tempo-table --cues` on the fixture with these three records substituted; Appendix B and the engine agree on all 30 rows, only these three move):
  - `| 10a | riser | 32.511 | 80 (r0) | 147.642 | base 34.95: 6 (r2) @ 147.60 | 35.31 |` (was base 36.50: 10 (r2) @ 150.41, L 36.86)
  - `| 10b | riser | 33.300 | 68 (r0) | 122.523 | base 35.75: 5 (r1) @ 122.45 | 36.27 |` (was base 36.60: 7 (r3) @ 127.27, L 37.10)
  - `| 10c | riser | 26.403 | 66 (r2) | 149.983 | base 28.80: 6 (r2) @ 150.19 | 29.16 |` (was base 31.00: 12 (r0) @ 156.62, L 31.36)
  - The tempo step at P falls from +1.9%, +3.9% and +4.4% to −0.03%, −0.06% and +0.14%. No V is anchored (each verdict is under 4 beats after P), so P → base is one short segment of 5-6 beats, as for 06b and 06c. The clock trains `test/sound.test.mjs` pins (10a tick 1.000 s, 10b tick 0.832 s) do not move.

**Verify** (`verify specs-wip/<id>.json --video …/final --detail`): **PASS, 42/42 gated on each; units 69/69 (Scoreboard) and 65/65 (Becker Rig).** The CUE DRIFT block and "baseline DIFFERS" (A14) are expected for WIP cuts. 10b's B1w is reported, not gated (as in its round-2 cut). For comparison, `verify` on the three round-2 specs against `renders/channel/` passes 42/42 each, with all three masters equal to the baseline and all three cue records equal to the fixture. Every gated numeric check, value (margin to its limit) [the round-2 cut's margin]; the Becker Rig windows are A3 3-8, A10 ≤ 4.5, B1 music −4.5..−0.5, BANDS 31.5 −16..−4, 63 −2..7, 125 1..7, 4000 −8..−2, 8000 −13..−5, 16000 −25..−12, and the margins below use them:

| Gate (limit; Scoreboard) | 10a: value (margin) [round-2 margin] | 10b (Becker Rig) | 10c |
|---|---|---|---|
| A1 delivery (-14 ±1) | -14.07 (0.93) [0.92] | -14.15 (0.85) [0.92] | -14.08 (0.92) [0.92] |
| A1 master (-14 ±0.3) | -14.01 (0.29) [0.29] | -14.09 (0.21) [0.29] | -14.01 (0.29) [0.29] |
| A2 TP (≤ -1) | -1.39 (0.39) [0.2] | -1.30 (0.3) [0.3] | -1.30 (0.3) [0.2] |
| A3 LRA (4-9; BR 3-8) | 5.75 (1.75) [1.77] | 5.57 (2.43) [2.45] | 5.75 (1.75) [2.33] |
| A4 ST max (≤ -8) | -10.79 (2.79) [2.73] | -9.84 (1.84) [1.96] | -10.99 (2.99) [2.55] |
| A4 M max (≤ -6) | -9.03 (3.03) [3.05] | -8.44 (2.44) [2.37] | -8.88 (2.88) [2.87] |
| A5 PLR (8-13) | 12.69 (0.31) [0.12] | 12.85 (0.15) [0.22] | 12.78 (0.22) [0.12] |
| A7 open (≥ -18) | -10.21 (7.79) [7.84] | -11.73 (6.27) [6.42] | -9.78 (8.22) [8.04] |
| A8 corr mean (≥ 0.3) | 0.78 (0.48) [0.48] | 0.92 (0.62) [0.62] | 0.78 (0.48) [0.48] |
| A8 corr min (≥ -0.1) | 0.44 (0.54) [0.54] | 0.58 (0.68) [0.6] | 0.53 (0.63) [0.63] |
| A8 mono fold (±1.5) | -0.61 (0.89) [0.91] | -0.28 (1.22) [1.22] | -0.62 (0.88) [0.9] |
| A10 phone drop (≤ 7; BR ≤ 4.5) | 3.08 (3.92) [3.84] | 2.43 (2.07) [1.98] | 2.88 (4.12) [4.05] |
| A11 limited % (≤ 3) | 1.254 (1.746) [1.546] | 0.614 (2.386) [2.001] | 1.034 (1.966) [1.819] |
| A11 max (≤ 6) | 3.23 (2.77) [2.59] | 3.01 (2.99) [3.08] | 3.18 (2.82) [2.85] |
| BANDS 31.5 (-20..3) | -16.6 (3.4) [3.7] | -9.9 (5.9) [5.6] | -15.4 (4.6) [4.9] |
| BANDS 63 (4..10) | 7.5 (2.5) [2.4] | 2.8 (4.2) [4.5] | 7.6 (2.4) [2.1] |
| BANDS 125 (2..8) | 3.6 (1.6) [2.0] | 5.2 (1.8) [1.8] | 3.6 (1.6) [1.7] |
| BANDS 250 (0..6) | 2.4 (2.4) [2.8] | 2.2 (2.2) [2.3] | 2.7 (2.7) [2.9] |
| BANDS 500 (-1..4) | 1.9 (2.1) [2.0] | 2.4 (1.6) [1.6] | 2.3 (1.7) [1.4] |
| BANDS 2000 (-5..0) | -4.1 (0.9) [1.0] | -2 (2.0) [2.2] | -3.5 (1.5) [1.7] |
| BANDS 4000 (-9..-2) | -7.8 (1.2) [1.3] | -4 (2.0) [2.0] | -7.1 (1.9) [2.1] |
| BANDS 8000 (-14..-5) | -9.2 (4.2) [4.0] | -8 (3.0) [3.0] | -8.8 (3.8) [3.7] |
| BANDS 16000 (-26..-12) | -14.1 (2.1) [1.9] | -20.3 (4.7) [4.5] | -13.1 (1.1) [1.0] |
| HARSH (≤ 2) | -0.43 (2.43) [2.45] | 0.35 (1.65) [1.53] | -0.07 (2.07) [2.06] |
| B1 music (−3.5..−1.5; BR −4.5..−0.5) | -1.99 (0.49) [0.37] | -1.18 (0.68) [0.5] | -1.9 (0.4) [0.27] |
| B1 sfx (-5..-2.5) | -3.42 (0.92) [0.91] | – | -3.28 (0.78) [0.8] |
| B2 duck (≤ -8) | -10.8 (2.8) [2.8] | -9 (1.0) [2.0] | -10.8 (2.8) [2.8] |
| B3 closest cue (≥ 3) | 4.1 (1.1) [1.3] | 4.1 (1.1) [1.5] | 4.3 (1.3) [1.9] |
| B4 onset (≤ 2) | 0.06 (1.94) [1.94] | 0.13 (1.87) [1.87] | 0.1 (1.9) [1.92] |
| B5 P onset (±10) | 0.0 (10.0) [10.0] | 0.0 (10.0) [10.0] | -6.7 (3.3) [3.3] |
| B6 valley (≤ 18) | 4.4 (13.6) [13.6] | 1.9 (16.1) [16.0] | 4.3 (13.7) [13.5] |
| B8 logo, M(L + 0.2) (≥ −13 LUFS) | -12.71 (0.29) [1.09] | -11.07 (1.93) [1.57] | -11.79 (1.21) [1.26] |
| B9 card quietest (≥ -45) | -22.4 (22.6) [19.8] | -27.0 (18.0) [16.2] | -22.2 (22.8) [20.4] |
| S1 in key (≥ 97) | 100.0 (3.0) [3.0] | 99.0 (2.0) [2.0] | 100.0 (3.0) [3.0] |
| S5 identical run (≤ 2) | 1 (1.0) [1.0] | 1 (1.0) [1.0] | 1 (1.0) [1.0] |
| S5 distinct (≥ 3) | 8 (5.0) [5.0] | 8 (5.0) [5.0] | 8 (5.0) [5.0] |
| S8 timing SD (1.5-5) | 2.99 (1.49) [1.48] | 2.75 (1.25) [1.1] | 3.03 (1.53) [1.53] |
| S8 off-grid (≤ 0.2) | 0.097 (0.103) [0.103] | 0.096 (0.104) [0.104] | 0.091 (0.109) [0.109] |
| S9 BPM: segment 1 / after P (tempo step at P, %) | 147.642/147.601 (-0.03) [1.88] | 122.523/122.449 (-0.06) [3.88] | 149.983/150.188 (0.14) [4.43] |
| S12 pad move (≤ 5) | 3 (2.0) [2.0] | 5 (0.0) [0.0] | 3 (2.0) [2.0] |
| S14 polyphony (≤ 12) | 12 (0.0) [0.0] | 12 (0.0) [0.0] | 12 (0.0) [0.0] |
| B1 sfx-music (-2..2) | – | 0.3 (1.7) [1.9] | – |
| B1 returns (≤ -8) | – | -11.36 (3.36) [3.41] | – |
| MALLET (≥ -10) | – | -9.0 (1.0) [0.7] | – |

- The pass/fail-only gates pass on all three: A6 (0% silent), A9 (DC ≤ 1e-4), A12 (AAC LC 48 kHz, audio = video length within a frame), A13 (video md5 identical), A14 (master unique), B10 (no flams), S2-S4, S6, S7, S10, S11, S13, TRAIN (0 music onsets near a tick), DUCK (0.0 dB extra), FLAMS and B7 (drop over build ≥ 2 LU: 10a 4.5 / 5.1, 10b 3.4 / 4.2, 10c 4.4 / 5.2, edge / centred; build halves rise in all three).
- **Tightest margins** (all pass): A1 master −14.09 in 10b (0.21 inside its ±0.3; it was −14.01; 10a and 10c are −14.01 as before); A5 PLR 12.85 in 10b (0.15 under 13; the encode loop holds it ≤ 12.95), 12.69 in 10a (0.31; it was 0.12) and 12.78 in 10c (0.22; it was 0.12); **B8 logo −12.71 LUFS in 10a, 0.29 over its −13 floor (it was −11.91, 1.09)**: the likely cause is the shorter stretch from P to the card (6 beats, was 10) under the logo's calibrated run-in, but it was not isolated here (sound is the ship step's); B2 payoff duck −9 dB in 10b (1.0 under −8; it was −10, 2.0); S12 (10b) and S14 (all three) at their limits, exactly as in the round-2 cuts ("all 30 teasers measure exactly 12" for S14).
- A11 falls in all three (10a 1.25%, 10b 0.61%, 10c 1.03% of samples limited > 1 dB, against 3%): the bodies stay long, so the payoff burst is a small share, unlike 06b's 2.83%.
- **Re-verified on the packs as they stand later the same day.** After these runs (05:50-06:27), the concurrent promote/ship step rewrote `looks/scoreboard/sound/calibration.json` and refit Becker Rig's `MODEL` (C −23.29, a 0.065, b 1.159) in the working tree. `verify` on the same three final MP4s against those packs: **PASS, 42/42 each**, no failures. What moved by more than 0.05: 10a A5 PLR 12.92 (**0.08** under 13; the encode loop caps it at 12.95), A2 −1.15 dBTP (0.15), B8 −12.35 LUFS (0.65, up from 0.29), A11 1.20%; 10b B3 4.2 dB (1.2), B1 sfx−music 0.38; 10c A2 −1.39 (0.39), A5 12.69 (0.31), B8 −11.40 (1.6). The ship step rebuilds and verifies on its own engine anyway; these are the numbers to expect.

**Check (`checks/10-cost-counter.py`):**
- `--spec [KEY=]PATH` (repeatable; KEY a, b, c, 10a, 10b, 10c or the full id) checks PATH in place of `studio/specs/<id>.json`. Two cuts per teaser, picked by length: the round-2 cut (36.5 / 36.6 / 31.0 s, what `studio/specs/` holds; `IN_SPECS` names it) and the condensed cut (any other length; it fails its lane unless it is one). The condensed expectations are built from the round-2 ones (`cond_of`): the same strings, numbers, milestones, `lookOpts` (10c's one hold excepted) and clock, with the new caption times, verdict time, duration and hold.
- New for the condensed cut (`check_timing_cond`): the lane (34.0-35.6 / 35.0-36.4 / 28.2-29.5 s); the hook caption complete on frame 1 (Scoreboard: `vo[0].t` ≤ −0.14; Becker Rig: its last word settled by t = 0, from the kit's stagger); the counter moving every frame from frame 1 to the stop (≥ $1 a frame, whole dollars); each caption up ≥ max(1.2 s, 0.12 s a word) from frame 1; captions back to back (gaps 0-0.2 s); each milestone's caption up within −0.15..+0.3 s of its pass, and every pass under a caption (with the kits' 0.15 s fade); the label beats starting their captions; the final reveal (Scoreboard: the stop on the last milestone; Becker Rig: the lock's hit, ≤ 0.1 s after the stop, with the stamp, the stopwatch's end label and the burst on it); the verdict 0.8-1.5 s after it and held 1.2-1.6 s; a motion proxy for the gap (the reveal's own motion settles about 0.40 s after the stop on the Scoreboard and 0.75 s after the hit on the Becker Rig, as measured above; the verdict's first moving frame, the label stack's yield 0.067 s before it on the Scoreboard, comes within 0.4 s of that); the verdict landing while the last caption is up (Scoreboard), or the last line hidden under it at its own time with a caption up through the reveal (Becker Rig); the last caption ending ≥ 0.4 s before the card; hold = duration − counter end.
- New on both cuts: "studio/specs/ holds the expected cut", the spec's id, and 10c's label-hold rule per spec (every label beat, the kit's passes at the stored rate and the rate steps, holds to the next beat or the verdict). The round-2 rules are unchanged, and so is the write-up scan (caption and pinned-comment numbers).
- Results: **1018 checks, 0 failures** by default (was 1005: the 13 new rows are the cut, the id and 10c's seven label beats); **1040 checks, 0 failures** with `--spec` on the three WIP specs. The table at the end of the run names the cut and the file checked for each teaser.
- **Mutation test** (scratch copies in `/tmp/cond/10/mut/`, `/tmp/cond/10/tools/mutate.py`, each with `KEY=PATH` and the other two WIP specs): **16 of 16 caught**, each with exit 1 and the named rule among its failures: 10a the hook caption at 0.0 (typed on at frame 1), the verdict on the reveal (32.5), a 36.0 s body, the $250K caption at 8.5 (0.37 s late), a 1.0 s caption, the counter running past $1,000,000 (stop 32.6); 10b the hook caption at −0.2 (its last word settles at 0.185 s), the verdict 0.6 s after the hit, the stamp off the reveal (33.6), a 0.5 s caption gap, the hidden last line shown (34.0); 10c a 0.8 s verdict hold, the "Next" step back to 3.6 s, the 5-second caption at 5.4, "≈ $2,465" in a caption, the verdict at 27.4 (a 0.53 s gap after the coin settles: the motion proxy).

**To promote** (the ship step; superseded by the list in "Condensed cut, fix pass" below):
1. Copy the three WIP specs over `studio/specs/<id>.json` and set `IN_SPECS = {"a": "cond", "b": "cond", "c": "cond"}` in the check (the round-2 set stays for a git-history copy passed with `--spec`).
2. BIBLE §11.1 for the moved records: Scoreboard (10a, 10c) re-measure on the fresh records (§11.2) and Becker Rig (10b) `MODEL` refit as the bible says; store the records in `test/fixtures/cues.json`; `tempo-table --write` (the three rows above); `verify --strict-cues`, `npm test`, and a bible status line naming the margins above (10a's B8 at 0.29 LU, 10b's A5 at 0.15 and B2 at 1.0).
3. Ship by §11.5 from a picture folder that holds these three renders (or fresh ones from the promoted specs) and `renders/channel/` for the other 27.
4. Then the publishing sheets (`publishing/10{a,b,c}-*`: `for_video`, the cover frames, the check counts) and `teasers/v2/teasers.json` (runtimes 37.45 / 38.25 / 31.3 s).

**Open items** (as they stood; the fix pass below answers or carries each):
- **An owner decision, if these must be shorter.** The real-time premise fixes each body at its last pass + about 2.4 s. A shorter cut needs a new verdict (and a new hook check), which the brief rules out here. The passes the counters already make, by the same rates: 10a's $500,000 row at 16.26 s ("$500K a year: ≈ 16 seconds" would give a body of about 18.7 s); 10c's half a year at 13.20 s (about 15.6 s); 10b's 20 years at 16.64 s (but its hook is "40 years vs 1 minute", so it would need a new duel). Each would drop the current climax, which is the format's open loop.
- The stretches before each last pass are the format's riser: 10a 28.0-32.5 s ("And the last row?", "NEXT / $1,000,000 A YEAR"), 10c 22.8-26.4 s ("And a whole year?"), 10b 28.6-33.3 s (the white-hot cower). They measure as moving (the hero counter changes every frame), but on the Scoreboard the stage itself is quiet there: the icon is nearly full, so the stream's dots fall only a short way (stage YAVG 0.03-0.09 against 0.1-0.2 earlier). If a critic reads "only a counter changes" strictly, the remedy is kit-level (an opt-in for a livelier near-full fill), not timing.
- The margins to watch: 10a's B8 (0.29 LU over its floor on the packs at render time, 0.65 on the refit packs) and A5 (0.31, then 0.08 on the refit packs, inside the encode loop's 12.95 cap); 10b's A5 (0.15 / 0.14) and B2 (1.0).
- On promotion these go stale and are outside this pass's files: `teasers/v2/teasers.json`, `publishing/10{a,b,c}-*.{md,json}` and the files under `renders/`.

### Condensed cut, fix pass (2026-10-13): the critic's items

**The review** (after the condensed cut): pass, no must; 10a 6/10, 10b 7/10, 10c 6/10. "The cuts follow the rules, and the remaining problem is retention (pace and quiet stretches) plus an owner decision on length." Every should and every cheap nit is handled below. The sound shoulds are the ship step's: the three were re-verified on their final renders and reported (no pack, `acceptance.json` or engine file touched).

| # | Severity | Item | What was done |
|---|---|---|---|
| 1 | should | 10a/10b/10c only 1.55 / 0.85 / 2.2 s shorter (4%, 2%, 7%); bodies about twice 06b/06c's; the real-time premise pins the last pass, so this is an owner call | **Put to the owner, with a recommendation** (*Owner decision*, below; the status paragraph at the top says it too). Not decided here: the brief keeps the verdict wording. The WIP cuts are the real-time option, ready to ship if the owner keeps it |
| 2 | should | 10c 15.8-22.8 s: 7.0 s with no new text (vo[5] under the same rule label); a second 5.8 s single-text hold at 7.4-13.2 s | **Applied as suggested, spec knobs only, no string changed.** The swap-in rule (`rateSteps[2]` + vo[5]) moves 15.8 → 17.4 s and the $77.7B working (`rateSteps[1]` + vo[3]) 7.4 → 8.6 s; vo[2] is up 5.0-8.55 and vo[4] 13.2-17.35. A milestone label now holds 4.2 s (`flash: 4.2`): with the kit's 3.0 the resting rate would have flashed at 8.0-8.6 and 16.2-17.4 s (the check's label-hold rule names both). The longest text hold is now 5.4 s (17.4-22.8, was 7.0) and the $77.7B hold 4.6 s (was 5.8). The masked near-still it measured is item 3's |
| 3 | should | 10a 28.6-32.5 s and 10c 23.7-26.4 s: the run-ups show only the counter moving (near-still with the hero masked) | **Applied: an opt-in Scoreboard kit option, `lookOpts.runup`** (Kit, below), set in both WIP specs: from the last label beat before the last pass, the big icon pulses on the score's beat (bump + rim glow, its tag riding it), with the ladder's target row and the hero's glow; the hero swells 4% over the riser. **Plus a spec knob: `stream: 24`** (the money stream at 24 dots a second, the kit's default 14), because the same masked audit found counter-only stretches outside the run-ups too (10a 7.7-8.1, 13.9-16.0, 20.9-21.4, 24.4-27.8 s; 10c 9.3-13.2 and 17.7-22.8 s). Results under *Measured* |
| 4 | should | 10b's 15-16-word verdict readable only about 1.3 s (under the 0.12 s-a-word floor) | **Applied**: the verdict lands at 34.1 s (the hit + 0.8) and the body is 36.15 s, so it holds 2.05 s: 17 words (counted as the captions are, "≈" included) at 0.12 s a word is 2.04 s. 36.2 s was rendered first, but the tail's length moves the band under P's hit (33.3 s, B3's 50 ms window): the hit cleared the music by 3.53 / 4.38 / 4.33 dB at 36.2 / 36.15 / 36.25 s on the Becker pack as it stood at 07:52-07:58, and by 2.43 (a B3 failure) / 3.22 / 3.17 dB on the pack as edited at 08:02-08:04 (item 6), so 36.15 it is. The check's hold window is now the verdict's reading time when that is over 1.6 s (10b: 2.04-2.14 s) |
| 5 | should | 10a sound margins (A5 0.08, A2 0.15, B1 music 0.50, A1 master 0.29) | **Not the cut's timing; left for the ship step.** 10a's cue record is byte-identical to the condensed cut's (`runup` and `stream` add no cue), and its master's sha256 is the one the critic measured (6bffea0bcf6e3eab), so the audio is unchanged; the margins moved with the 06:36 rewrite of `looks/scoreboard/sound/calibration.json`. Re-verified, same numbers (table) |
| 6 | should | 10b sound margins (A5 0.14, A1 master 0.21, A2 0.30, B2 1.0; S12, S14 at their limits) | Re-verified on the final render (table): PASS 42/42. The cut's own effect is the tail (36.15 s, a 6-beat segment at 126.32 BPM, +3.1%) and the verdict ding at 34.1. **Note:** `looks/becker-rig/sound/{balance,compose,sfx}.mjs` were being edited in the working tree while this pass ran (08:02-08:04, a payoff rule: `PAYOFF_LIFT`, `PAYOFF_OWN`; not by this pass). The final build and verify ran on that state (the files did not change during them). On it, B3's closest cue is P's own hit (3.2 dB, 0.2 over its floor; before that edit it was 4.4 at the same 36.15 s body) |
| 7 | should | 10c sound margins (B1 music 0.40, A2 0.39, A5 0.31, A1 0.29) | Re-verified (table): B1 music −1.93 (0.43), A2 −1.30 (0.30), A5 12.78 (0.22), A1 master 0.29. 10c's record moved (the thuds at 8.6 and 17.4 s, the reveal at 27.16 s, base 28.75 s), so the ship step's Scoreboard re-measure covers it |
| 8 | nit | 10c: the verdict sits over "≈ 26 seconds." for 1.2 s (a stutter) | vo[7] ends at 27.6 s: up 1.2 s, still up when the verdict lands, and gone 0.44 s later. A new check rule: a last caption the verdict repeats word for word ends within 0.5 s of it |
| 9 | nit | 10c: 0.37 s near-still before the verdict (limit 0.4) | The verdict at **27.16 s** (the stop + 0.757): measured 26.80-27.10, **0.30 s**. 27.15 and 27.16 draw the same frames (the band's first frame is 27.0, the verdict's 27.167); 27.16 keeps the lag over the check's 10c floor, now **0.75 s** (10a and 10b keep 0.8) |
| 10 | nit | Scoreboard captions light word by word across the line's duration (narration pacing) | **Not done; carried.** The word lighting is the Scoreboard's shared caption chrome (`looks/scoreboard/lib.js`, from `captionAt`), outside this format's file, so an opt-in in `formats/cost-counter.js` cannot reach it. 06b does the same |
| 11 | nit | Two stale Look-note lines (10a "held into the verdict"; 10c "held 3.6 s into the verdict") | Reworded for the condensed cut (both Look notes) |
| 12 | nit | The check's maths table printed round-2 VO times on a condensed run | The 10b pass rows now name both cuts ("round-2 VO 2.4 · condensed caption 2.5" … "verdict round-2 33.3 · condensed 34.1") |

**Files:**
- Changed: the three WIP specs; `teasers/v2/checks/10-cost-counter.py`; this write-up; `studio/looks/scoreboard/formats/cost-counter.js` (the opt-in `runup`, documented in its header) and `studio/looks/scoreboard/README.md` (its row in the cost-counter table and the Ported line).
- Not touched: `studio/specs/`, the Scoreboard `lib.js`, `theme.js`, `style.css`, `cta.js`, `kit.js` and every other format, the Becker Rig kit, the sound packs, `studio/src/`, `studio/sound/`, `studio/test/`, `publishing/` and `renders/`. Nothing is committed.
- Renders: `/tmp/cond/10/<id>/final/<id>.mp4` (picture + the sound built on it; the picture-only renders were deleted after the sound step's video-md5 check).

**Spec changes** (WIP against the condensed cut; every string and number is unchanged):

| | 10a | 10b | 10c |
|---|---|---|---|
| `duration` / `data.hold` | 34.95 / 2.43865 (unchanged) | 35.75 / 2.47589 → **36.15 / 2.87589** | 28.8 / 2.3974 → **28.75 / 2.3474** |
| `verdict.t` | 33.35 (unchanged) | 34.2 → **34.1** | 27.21 → **27.16** |
| captions | unchanged | vo[9] 28.6-34.15 → **28.6-34.05**; vo[10] (hidden) 34.2 → **34.1** | vo[2] **5.0-8.55**, vo[3] **8.6-13.15**, vo[4] **13.2-17.35**, vo[5] **17.4-22.75**, vo[7] **26.4-27.6** |
| `lookOpts` | + `stream: 24`, + `runup: { beat: 0.40639 }` | unchanged | `rateSteps[1].t` 7.4 → **8.6**, `rateSteps[2].t` 15.8 → **17.4**, + `flash: 4.2`, + `stream: 24`, + `runup: { beat: 0.40005 }` |
| Cue record | identical (50 cues) | the verdict ding 34.2 → 34.1, base and the card 35.75 → 36.15 (52 cues) | the thuds 7.4 → 8.6 and 15.8 → 17.4, the reveal 27.21 → 27.16, base and the card 28.8 → 28.75 (39 cues) |

The §2.3 rows the promotion will need (Appendix B run on the WIP cue records; the tempo step at P is −0.03%, +3.1% and +2.27%):
- `| 10a | riser | 32.511 | 80 (r0) | 147.642 | base 34.95: 6 (r2) @ 147.60 | 35.31 |` (as the condensed cut)
- `| 10b | riser | 33.300 | 68 (r0) | 122.523 | base 36.15: 6 (r2) @ 126.32 | 36.67 |` (was base 35.75: 5 (r1) @ 122.45, L 36.27)
- `| 10c | riser | 26.403 | 66 (r2) | 149.983 | base 28.75: 6 (r2) @ 153.39 | 29.11 |` (was base 28.80: 6 (r2) @ 150.19, L 29.16)

**Kit: `lookOpts.runup` in the Scoreboard `cost-counter` module (opt-in).**
- `{ beat, amp?, hero?, from? }`. From the last label beat or pass before the last milestone (the riser cue's own start point, or `from`), the big icon pulses at tp − k·beat (tp its pass): a bump of `amp` (0.05, half of it at the run-up's start) and a rim-glow flare, its tag riding the bump; the ladder's target row (icon, pip, label) and the hero's glow pulse with it. Over the riser's span (up to 2.4 s) the hero swells by `hero` (0.04), released over the pass bump. No cue is added.
- `beat` is the score's beat up to the payoff, 60 ÷ BPM₁ of the spec's §2.3 row: segment 1's grid runs from 0 to P (= the last pass, the riser climax) in whole beats, so tp − k·beat lands on the music's beats. 10a: 32.511 s ÷ 80 = 0.40639 s (11 pulses, 28.04-32.11 s); 10c: 26.403 s ÷ 66 = 0.40005 s (9 pulses, 22.80-26.00 s). The check reads the rows from `sound/BIBLE.md` and fails, naming the new P ÷ N₁, if they move.
- **Default unchanged, proved:** with the kit file at HEAD and then as changed, for every committed spec and sample that uses it (`specs/10a`, `specs/10c`, `samples/cost-counter.json`, `samples/cost-counter-2.json`), the cue records (`node src/cli.mjs cues`) are byte-identical (4 records) and the stills at 5 times each (10a 0, 16.3, 29.0, 31.9, 33.5; 10c 0, 13.2, 23.4, 25.8, 27.0; the samples at 0, 6.0, the run-up, the last pass and after it), with and without the brand, are md5-identical (40 frames). The WIP specs' cue records are identical with and without `runup` and `stream`. A `runup` with a beat out of range is ignored (its frame is md5-identical to the spec without it). Lint: 0/0 on both WIP specs at `--every 0.05`, and on the guard sample with `runup`.

**Measured** (`/tmp/cond/10/tools/motion2.py` and `motion3.py`: frame difference at 270×480 (`tblend` difference → `signalstats` YAVG), still < 0.15, near-still < 0.25; `motion3.py` also measures with the hero counter's band, y 430-610, left out, as the critic did):

| | Full frame, before the verdict: longest still / near-still | Hero band left out: near-still runs ≥ 0.4 s before the verdict |
|---|---|---|
| 10a condensed (before this pass) | 0.20 / 0.33 s (32.97-33.30, the landing's glow) | 10 runs, 8.1 s in all: 7.70-8.13, 13.90-14.43, 15.13-15.97, 20.87-21.37, 24.37-24.80, 25.67-26.50, 27.07-27.83, **28.67-29.63, 29.67-30.87, 30.90-32.50** |
| **10a fix pass** | 0.20 / 0.33 s (the same) | **none** (longest 0.37 s, 32.93-33.30, the landing; then 15.67-15.97, 0.30 s) |
| 10b condensed | 0.13 s (34.07-34.20) / none ≥ 0.2 s | (not a counter-only frame: the figure, the bricks and the heat keys move) |
| **10b fix pass** | **none ≥ 0.1 s** | — |
| 10c condensed | 0.17 / 0.37 s (26.80-27.17, the coin settling) | 11 runs, 12.1 s in all: 4.60-5.00, 9.30-10.17, 10.63-11.30, 11.33-13.20, 15.07-15.53, **18.10-19.13, 19.17-20.00, 20.03-20.70, 20.97-22.80, 22.93-23.70, 23.73-26.40** |
| **10c fix pass** | **0.10 / 0.30 s (26.80-27.10)** | **2 runs, 1.5 s: 12.30-13.20 (0.90) and 22.17-22.80 (0.63)**, each the last second before a pass with its icon over 90% full (the stream falls a short way) |

- The run-up alone (`runup` without `stream`, rendered first): 10a's masked run-up 28.0-32.5 s fell to one 0.23 s run (31.47-31.70), 10c's 22.8-26.4 s to one 0.23 s run (24.60-24.83). The denser stream then took out the other stretches: 10a's last 0.43-0.83 s runs and 10c's 17.7-22.8 s.
- A stream of 30 or 36 dots a second (tried on 10c) leaves 12.3-13.2 s at 0.77 s: a nearly full icon gets its dots from a short fall whatever the rate, so 24 is kept. A pulse before every pass would need a second kit option (an open item).
- The verdict holds: 10a 1.6 s (1.33 s of it still), 10b 2.05 s (34.53-34.73 and 34.90-36.17 still, 1.47 s; the verdict's fade, its swoosh and his look up move first), 10c 1.59 s (27.43-27.77 and 27.80-28.77 still, 1.31 s; the caption's fade at 27.75 splits it). Then the card holds (unchanged).
- Frame 1 is unchanged apart from the denser stream on 10a and 10c (more dots falling into the bill ghost): the hook caption complete, $0, the counter moving from frame 2.

**Stills read** (`node src/cli.mjs stills`, tiled; `/tmp/cond/10/fix/sheet-10{a,b,c}.png`):
- 10a at 0, 0.03, 0.98, 2.13, 3.27, 5.45, 8.15, 12.5, 16.3, 19.15, 22.75, 28.05, 28.07, 29.7, 31.73, 32.13, 32.52, 32.8, 33.4, 33.8, 34.9, 35.5 and 37.4 s (the final spec), plus every frame of 27.9-32.6 s (before `stream` was added): the coin's pulse (28.07, 31.73, 32.13 s: the bump, the rim glow, the "$1M" tag riding it, the ladder's $1M row glowing), the hero's swell from 30.1 s, frame 1 with the denser stream, everything else as in the condensed cut.
- 10b at 0, 0.03, 0.84, 2.52, 4.25, 8.33, 10.65, 16.55, 16.7, 18.4, 23.2, 25.15, 28.7, 31.5, 33.28, 33.5, 34.0, 34.15, 34.4, 34.9, 35.5, 36.1, 36.5 and 38.6 s, and 34.07-36.2 s in steps: "How long do 40 years last?" to 34.05, the verdict fading in from 34.1 (solid by 34.3), its swoosh under "≈ 33 seconds" by 34.75, the hold to 36.1, the card from 36.15.
- 10c at 0, 0.03, 1.0, 1.75, 2.85, 5.02, 8.0, 8.65, 13.21, 13.95, 17.0, 17.45, 20.5, 22.85, 23.23, 25.63, 26.03, 26.41, 26.7, 27.0, 27.2, 27.7, 28.6, 28.8 and 31.2 s (the final spec), plus every frame of 22.7-27.4 s (before `stream`): "5 SECONDS: ≈ $12,319 / ≈ 10 WEEKS OF WORK" still up at 8.0 s (no resting-rate flash), the $77.7B working from 8.65 s, the half-year label still up at 17.0 s, the rule from 17.45 s, the coin's pulse (23.23, 25.63, 26.03 s) and the hero's swell into the pass, "≈ 26 seconds." fading out by 27.75 s, the verdict alone from there.

**Check** (`checks/10-cost-counter.py`): new for the condensed cut: the verdict's hold is at least its reading time (0.12 s a word, counted as the captions are) and at most 0.1 s over it when that exceeds 1.6 s; 10c's verdict lag from 0.75 s; on the Scoreboard no text (caption start or label beat) holds alone over 5.5 s before the reveal; a last caption the verdict repeats word for word ends within 0.5 s of it; and `lookOpts.runup` (set, its beat = P ÷ N₁ of the spec's row in `sound/BIBLE.md` §2.3 read from the file, P the last pass to the ms, the pulses covering the run-up with no gap of 0.4 s or more). The expected `lookOpts` carry the new values (10c's 8.6 / 17.4 s steps and `flash`, both specs' `stream` and `runup`). **1018 checks, 0 failures** by default (the round-2 cuts in `studio/specs/`); **1055 checks, 0 failures** with `--spec` on the three WIP specs (was 1040). **Mutation test** (`/tmp/cond/10/tools/mutate2.py`, scratch copies in `/tmp/cond/10/mut2/`): **26 of 26 caught**, each with exit 1 and the named rule: the 16 earlier ones (re-based on the new WIP values) and 10 new: 10a without `runup`, 10a on 10c's beat, 10b held 1.55 s (the condensed cut's), 10b held 2.4 s, 10c's rule beat back at 15.8 s (7.0 s of one text), 10c without `flash` (the resting rate at 8.0-8.6 s), 10c's verdict 0.70 s after the stop, "≈ 26 seconds." held 0.84 s under the verdict, 10c on 10a's beat, 10c without `runup`.

**Lint:** 0 errors, 0 warnings on the three WIP specs (10a 37.45 s = 34.95 + 2.5, 10b 38.65 = 36.15 + 2.5, 10c 31.25 = 28.75 + 2.5), and with `--every 0.05` on 10a and 10c (the pulses and the swell included).

**Render and sound** (`/tmp/cond/10/<id>/final/`):
- `render specs-wip/<id>.json`: 10a 1124 frames (37.47 s), 10b 1160 (38.67 s), 10c 938 (31.27 s); 50, 52 and 39 sfx.
- `sound specs-wip/<id>.json --video … --out …/final --score`: the video md5 identical in each (10a `b601f06c8acb`, 10b `077ab11a4c13`, 10c `39f28e7237e2`); P 32.511 / 33.300 / 26.403 s (riser); 147.642 / 147.601, 122.523 / 126.316 and 149.983 / 153.387 BPM; cue onsets within 0.06 / 0.13 / 0.08 ms.
- `verify specs-wip/<id>.json --video …/final --detail`: **PASS, 42/42 gated on each; units 1/1 looks each.** CUE DRIFT (one record each) and "baseline DIFFERS" (A14) are the expected WIP notices; 10b's B1w is reported, not gated, as before. Every gated numeric check, value (margin to its limit); the pass/fail-only gates (A6, A9, A12, A13, A14, B7, B10, S2-S4, S6, S7, S10, S11, S13, TRAIN, DUCK, FLAMS) pass on all three:

| Gate | Limit (Scoreboard; Becker Rig) | 10a value (margin) | 10b value (margin) | 10c value (margin) |
|---|---|---|---|---|
| A1 delivery | -14 ±1 | -14.08 (0.92) | -14.12 (0.88) | -14.08 (0.92) |
| A1 master | -14 ±0.3 | -14.01 (0.29) | -14.07 (0.23) | -14.01 (0.29) |
| A2 TP | <= -1 | -1.15 (0.15) | -1.27 (0.27) | -1.30 (0.3) |
| A3 LRA | 4-9; 3-8 | 5.80 (1.8) | 4.89 (1.89) | 5.93 (1.93) |
| A4 ST max | <= -8 | -10.80 (2.8) | -10.63 (2.63) | -10.93 (2.93) |
| A4 M max | <= -6 | -8.95 (2.95) | -8.77 (2.77) | -8.90 (2.9) |
| A5 PLR | 8-13 | 12.92 (0.08) | 12.85 (0.15) | 12.78 (0.22) |
| A7 open | >= -18 | -10.22 (7.78) | -11.52 (6.48) | -9.82 (8.18) |
| A8 corr mean | >= 0.3 | 0.78 (0.48) | 0.92 (0.62) | 0.78 (0.48) |
| A8 corr min | >= -0.1 | 0.43 (0.53) | 0.58 (0.68) | 0.53 (0.63) |
| A8 mono fold | ±1.5 | -0.61 (0.89) | -0.23 (1.27) | -0.64 (0.86) |
| A10 phone drop | <= 7; <= 4.5 | 3.07 (3.93) | 2.64 (1.86) | 2.89 (4.11) |
| A11 limited % | <= 3 | 1.196 (1.804) | 0.388 (2.612) | 1.038 (1.962) |
| A11 max | <= 6 | 3.19 (2.81) | 1.93 (4.07) | 2.77 (3.23) |
| BANDS 31.5 | -20..3; -16..-4 | -16.5 (3.5) | -9.3 (5.3) | -15.6 (4.4) |
| BANDS 63 | 4..10; -2..7 | 7.5 (2.5) | 3.4 (3.6) | 7.6 (2.4) |
| BANDS 125 | 2..8; 1..7 | 3.6 (1.6) | 5.8 (1.2) | 3.5 (1.5) |
| BANDS 250 | 0..6 | 2.4 (2.4) | 3 (3.0) | 2.6 (2.6) |
| BANDS 500 | -1..4 | 1.9 (2.1) | 3 (1.0) | 2.2 (1.8) |
| BANDS 2000 | -5..0 | -4.1 (0.9) | -1.8 (1.8) | -3.5 (1.5) |
| BANDS 4000 | -9..-2; -8..-2 | -7.8 (1.2) | -3.7 (1.7) | -7.1 (1.9) |
| BANDS 8000 | -14..-5; -13..-5 | -9.2 (4.2) | -8.2 (3.2) | -8.9 (3.9) |
| BANDS 16000 | -26..-12; -25..-12 | -14.1 (2.1) | -20.6 (4.4) | -13.9 (1.9) |
| HARSH | <= 2 | -0.43 (2.43) | 0.59 (1.41) | -0.02 (2.02) |
| B1 music | -3.5..-1.5; -4.5..-0.5 | -2 (0.5) | -0.88 (0.38) | -1.93 (0.43) |
| B1 sfx | -5..-2.5 | -3.45 (0.95) | – | -3.4 (0.9) |
| B2 duck | <= -8 | -10.8 (2.8) | -9 (1.0) | -10.8 (2.8) |
| B3 closest cue | >= 3 | 4.1 (1.1) | 3.2 (0.2) | 4.2 (1.2) |
| B4 onset | <= 2 | 0.06 (1.94) | 0.13 (1.87) | 0.08 (1.92) |
| B5 P onset | ±10 | 0.0 (10.0) | 0.0 (10.0) | -2.7 (7.3) |
| B6 valley | <= 18 | 4.4 (13.6) | 2.4 (15.6) | 4.2 (13.8) |
| B8 logo, M(L + 0.2) | >= -13 LUFS | -12.35 (0.65) | -11.72 (1.28) | -12.14 (0.86) |
| B9 card quietest | >= -45 | -22.1 (22.9) | -28.5 (16.5) | -22.3 (22.7) |
| S1 in key | >= 97 | 100.0 (3.0) | 99.0 (2.0) | 100.0 (3.0) |
| S5 identical run | <= 2 | 1 (1.0) | 1 (1.0) | 1 (1.0) |
| S5 distinct | >= 3 | 8 (5.0) | 8 (5.0) | 8 (5.0) |
| S8 timing SD | 1.5-5 | 2.99 (1.49) | 2.71 (1.21) | 3.04 (1.54) |
| S8 off-grid | <= 0.2 | 0.097 (0.103) | 0.096 (0.104) | 0.091 (0.109) |
| S9 BPM, segment 1 / after P (tempo step at P, %) | step ±8% | 147.642/147.601 (-0.03) | 122.523/126.316 (3.1) | 149.983/153.387 (2.27) |
| S12 pad move | <= 5 | 3 (2.0) | 5 (0.0) | 3 (2.0) |
| S14 polyphony | <= 12 | 12 (0.0) | 12 (0.0) | 12 (0.0) |
| B1 sfx-music | -2..2 | – | -1.16 (0.84) | – |
| B1 returns | <= -8 | – | -12.27 (4.27) | – |
| MALLET | >= -10 | – | -9.0 (1.0) | – |
- **Under 0.5 of margin:** 10a A5 PLR 12.92 (0.08; the encode loop caps it at 12.95), A2 −1.15 dBTP (0.15), A1 master (0.29, centred), B1 music −2.0 (0.50); 10b B3 3.2 dB (0.20, the P hit at 33.3 s; see item 6), A5 12.85 (0.15), A1 master −14.07 (0.23), A2 −1.27 (0.27), B1 music −0.88 (0.38); 10c A5 12.78 (0.22), A1 master (0.29), A2 −1.30 (0.30), B1 music −1.93 (0.43). S12 (10b) and S14 (all three) at their limits, as in every cut. Likely causes, for the ship step: A5 and A2 follow the payoff stack's AAC overshoot (P = 32.511 / 33.3 / 26.403 s) under the −1.5 dBTP ceiling (PLR follows TP, since I is fixed); B1 music sits at the hot edge of the Scoreboard window on 10a and 10c; 10b's B3 is the P hit over the band's P downbeat on the Becker pack being edited now. None is a gate failure and none was fixed here (packs and `acceptance.json` are the ship step's).

**Owner decision (answered 2026-10-13: "Mixed").** *These three run in real time, so the condensed cuts are only 1-7% shorter than round 2 (bodies 34.95 / 36.15 / 28.75 s, about twice 06b's and 06c's 16-18 s). Do you want them shorter, and how?*
- **A. Ship them real time, as condensed here** (37.45 / 38.65 / 31.25 s with the card). "Since you hit play" stays literal and each keeps its climax ($1 million a year, a working life, a year of pay). The still holds are gone and the run-ups now move.
- **B. An earlier verdict on a pass the counter already makes** (10a and 10c; spec-only, every number already verified on screen):
  - 10a stops on $500,000 at 16.256 s: "$500K a year: ≈ 16 seconds.", a body of about 18.7 s (21.2 s with the card). The $1M row, its coin and riser go; the $500K row takes the coin; "≈ $111 million an hour" and the $970B working must move into the first 16 s or drop to the caption.
  - 10c stops on half a year ($32,526) at 13.201 s: "Half a year of median pay: ≈ 13 seconds.", about 15.6 s (18.1 s). The year row goes; the $77.7B working and the swap-in rule move before 13.2 s.
  - Each needs a new verdict and a hook re-check (both hooks still hold: "when does it pass your salary?", "how long do you work for 1 second…?"). 10b cannot do this without a new duel (its hook names "40 years vs 1 minute").
- **C. A visible fast-forward** (for example 2× with an on-screen real-time clock): keeps every climax, but "since you hit play" is no longer literal, the verdict's "≈ 33 seconds" becomes clock time, not video time, and it needs a new opt-in kit option.
- **Recommendation (the critic's too):** **A for 10b**, which has the best moment-to-moment action (the bricks, the heat keys, the cower, the burst); **B for 10a and 10c**, which keeps the premise literal and lands near the 06b/06c bodies. C is not recommended.
- **The owner's answer (2026-10-13): "Mixed", the recommendation.** 10b ships real time as it is (option A; its WIP spec is not touched again). 10a and 10c get option B, an earlier verdict on a pass the counter already makes, keeping "since you hit play" literal: 10a stops on $500,000 at 16.256 s ("$500K a year: ≈ 16 seconds."), 10c on half a year of median pay ($32,526) at 13.201 s ("Half a year of median pay: ≈ 13 seconds."). The verdict wording could be tightened for reading time, every number had to come from the sourced rates and the check, and the hooks had to be re-checked. Done in the next entry, "Recut to the earlier verdict (2026-10-13)".
- **Follow-up for the owner (open, from the recut's review, 2026-10-13): 10c's verdict wording.** Your wording, "Half a year of median pay: / **≈ 13 seconds**.", is what the recut uses. Its longer first line sets the verdict at caps of about 64 px, barely above the label lines (62 px), so the climax line is no bigger than the label it replaces. The shorter "Half a year of pay: / **≈ 13 seconds**." (the median is in the footer, and the label stack has just said "Next: half a year of median pay") measured caps 67 px. Keep yours, or take the shorter one? Until you answer, yours stays; the swap is one string in the spec and the check.

**To promote** (as it stood; superseded by the list in "Recut to the earlier verdict" below, after the owner's answer):
1. **First the owner's answer for 10a and 10c** (above). 10b can promote as it is. If B is chosen for 10a or 10c, that is a new cut (a new verdict, the rows trimmed, the check's expectations), not this file.
2. Copy the WIP specs over `studio/specs/<id>.json` and set `IN_SPECS = {"a": "cond", "b": "cond", "c": "cond"}` in the check. **The kit change ships with them**: 10a's and 10c's WIP specs use `lookOpts.runup` (the working tree's `formats/cost-counter.js`); without it they render as the condensed cut did, with no pulse.
3. BIBLE §11.1 for the moved records: the Scoreboard re-measure (10c's record moved; 10a's is identical to the condensed cut's but not to the fixture) and the Becker Rig `MODEL` refit (10b) on the pack as it then stands; store the records in `test/fixtures/cues.json`; `tempo-table --write` (the three rows above); `verify --strict-cues`, `npm test`. After the table is rewritten, rerun the check: its run-up rule reads the 10a and 10c rows (P 32.511 / N₁ 80 and 26.403 / 66 are expected to stay).
4. Ship by §11.5; then `publishing/10{a,b,c}-*` and `teasers/v2/teasers.json` (runtimes 37.45 / 38.65 / 31.25 s; covers: 10a 33.6-34.9 s, 10b 34.95-36.1 s, 10c 27.5-28.75 s).

**Open items** (as they stood; the recut entry below answers or carries each):
- The owner decision above (answered: "Mixed").
- 10c's two masked near-stills (12.30-13.20 and 22.17-22.80 s, the last second before a pass with the icon nearly full) stay; the full-frame metric has nothing there (the hero counter changes every frame). The cheap remedy for the second is `runup.from` ≈ 22.0 s (two more pulses); the first would need a pulse before every pass (a second opt-in).
- The caption karaoke on long reading-paced lines (item 10): an opt-in in the Scoreboard's shared caption code, for a later pass.
- The margins under 0.5 listed above, for the ship step's re-measure and refit.
- On promotion these go stale and are outside this pass's files: `teasers/v2/teasers.json`, `publishing/10{a,b,c}-*.{md,json}` and the files under `renders/`.

### Recut to the earlier verdict (2026-10-13): 10a and 10c

**The brief:** the owner's answer to the length question (*Owner decision*, above): "Mixed". 10b ships real time as condensed, and this pass does not touch its WIP spec. 10a and 10c get option B: an earlier verdict on a pass the counter already makes, with "since you hit play" kept literal. 10a stops on $500,000 at 16.256 s, verdict "$500K a year: ≈ 16 seconds." (the brief's body: about 18.7 s); the $1M row, its coin and its riser go, and the $500K row takes the coin, the run-up and the riser. "≈ $111 million an hour" and the $970B working move into the first 16 s or drop to a caption. 10c stops on half a year of median pay ($32,526) at 13.201 s, verdict "Half a year of median pay: ≈ 13 seconds." (about 15.6 s); the year row goes, and the $77.7B working and the swap-in rule move before 13.2 s. The verdict wording could be tightened for reading time, but every number had to come from the sourced rates and be verified by the check, and the hooks had to be re-checked. The condensed cut's rules stand: frame 1 complete and moving, no still run of 0.4 s or more before the verdict hold, captions up at least max(1.2 s, 0.12 s a word), the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s, and the end card unchanged.

**Files:**
- Changed: `studio/specs-wip/10a-scoreboard-debt-interest-live.json` and `studio/specs-wip/10c-scoreboard-amazon-makes.json` (the recut; the real-time condensed versions are in git history, ca1087f); `teasers/v2/checks/10-cost-counter.py`; this write-up (the status paragraph, the shared decisions, the 10a and 10c sections: tables, wrong beliefs, hook rules, beat sheets, caption tables, maths, platform captions, platform notes and look notes; the *Owner decision* entry; this entry).
- Not touched: `studio/specs-wip/10b-becker-rig-debt-vs-your-pay.json`, `studio/specs/`, every kit file (**no kit change**: the recut is spec values only, and `lookOpts.runup` is the fix pass's opt-in option, already in HEAD), the Scoreboard `lib.js`, `theme.js`, `style.css`, `cta.js`, `kit.js` and every other format, the sound packs, `sound/` (BIBLE.md, acceptance.json), `src/`, `test/`, `publishing/` and `renders/`. Nothing is committed.
- Renders: `/tmp/cond/10/<id>/recut-final/<id>.mp4` (the picture with the sound built on it). The picture-only renders in `recut/` were deleted after the sound step's video-md5 check.

**What changed** (spec, against the condensed cut; the counter's rate, the header, the footer and the end card are the same):

| | 10a | 10c |
|---|---|---|
| The stop (`counterT[1]`) / `final` | 32.51135 → **16.25568 s** / "$1,000,000" → **"$500,000"** (r × 16.25568 = $500,000.30; stored rate $500,000.33) | 26.4026 → **13.2013 s** / "$65,052" → **"$32,526"** (k × 13.2013 = $32,526.03; stored rate $32,526.02) |
| Milestones, ladder, icons | 6 → **5**: the $1,000,000 row, its label, its "$1M" pip and its coin go; `icons` bill ×4 + **coin for $500K** | 4 → **3**: the year row, its label, its pip and its "1 year" answer go; `icons` bill, bill, **coin for the half year** |
| Verdict | "**$1M** a year: ≈ 33 seconds." at 33.35 → "**$500K** a year: ≈ 16 seconds." at **17.07** (0.81 s after the stop) | "A year of median pay: / **≈ 26 seconds**." at 27.16 → "Half a year of median pay: / **≈ 13 seconds**." at **13.96** (0.76 s after the stop) |
| Verdict hold / body / total | 1.6 → **1.53 s** / 34.95 → **18.6 s** / 37.45 → **21.1 s** | 1.59 → **1.59 s** / 28.75 → **15.55 s** / 31.25 → **18.05 s** |
| `data.hold` | 2.43865 → 2.34432 | 2.3474 → 2.3487 |
| Captions | 11 → **9**. Dropped: "≈ $30,800 a second." (the rate is in the label stack from frame 1, and under the $970B working), "$500,000: ≈ 16 seconds." (the verdict says it) and "$1 million: passed.". New: "**$500,000**: passed." (16.25 s). Moved: "At fiscal 2025's rate: $970 billion a year." 22.7 → 4.65 s, "That's ≈ $111 million an hour." 19.1 → 6.4, the $250K line 8.15 (unchanged start), the swap-in rule 12.45 → 10.55, "And the last row?" 28.0 → 13.45 | 8 → **7**. Dropped: "And a whole year?", "≈ 26 seconds.". New: "And half a year?" (10.8 s). Moved: the $77.7B line 8.6 → 6.5 s, the swap-in rule 17.4 → 8.2, "≈ 13 seconds: half a year." 13.2 (unchanged; now the last line, up 1.2 s, gone 0.44 s into the verdict) |
| `rateSteps` | 5 → **4**: the 5.4 s rate step ("≈ $30,800 / every second", the resting label again) goes; the $970B working 22.7 → **4.65 s**, the hourly working 19.1 → **6.4**, the swap-in working 12.45 → **10.55**, "Next / $1,000,000 a year" 28.0 → "Next / **$500,000 a year**" **13.45** | the 2.8 s working kept; the $77.7B working 8.6 → **6.5 s**, the swap-in rule 17.4 → **8.2**; "$1,251 × 52 = $65,052 / Next: a year of median pay" (22.8) → "**$1,251 × 52 ÷ 2 = $32,526 / Next: half a year of median pay**" (**10.8**) |
| `runup.beat` | 0.40639 → **0.4064** (P 16.256 s ÷ 40) | 0.40005 → **0.40003** (P 13.201 s ÷ 33) |
| Cue record | 50 → **32 cues** (base 18.6) | 39 → **24 cues** (base 15.55) |

Every caption and label string in the recut is a round-2 string, word for word, except the new last caption (10a), the new question and "Next" label (10c) and the two verdicts. The check builds those from the same computed numbers.

**The hooks, re-checked.**
- 10a asks "US debt interest since you hit play: when does it pass your salary?". The video still answers it. Each salary from $30K to $500K has a pip or sits between two (each passed with a thud, a label and a caption). Any other salary, including the top earners the $1M row used to cover, gets the swap-in rule, captioned at 10.55 s, worked on screen for the median and pinned. The verdict gives the top row. The question was never about $1 million, so stopping on $500,000 leaves it honest. Frame 1 still shows $0, the five pips with the median among them, the rate and the footer's pay figure. "Since you hit play" stays literal: the counter starts at $0 on frame 1, runs at the sourced rate and stops on the verdict's own number.
- 10c asks "How long do you work for 1 second of Amazon's profit?". It is answered at 1.0 s (the label "≈ 2 WEEKS OF WORK"), read back at 2.8 s with its working ("≈ 2 weeks, at median pay"), and turned into the viewer's own answer by the rule at 8.2 s. The verdict was always the climax turned round (how much of your pay one stretch of profit is). The recut turns it round at half a year instead of a year, and the counter really stops on $32,526 at the time the verdict says.
- The titles, headers and footers are unchanged. The R-rules are re-stated in each section (10a R1, R3, R4, R9-R12; 10c R1, R3, R4, R9-R12).

**The numbers** (every one already on screen in the earlier cuts, now recomputed by the check):
- 10a: $500,000 ÷ $30,758.50 a second = 16.256 s → **≈ 16 seconds** (whole seconds from 5 s up, the format's rule; the same "≈ 16 SECONDS" the $500K label always showed). "$500K" is the ladder's own pip label. ≈ $111 million an hour = r × 3,600 = $110,730,594 to 3 figures.
- 10c: $1,251 × 52 ÷ 2 = **$32,526** (exact, 6 months of median pay; the new "Next" label works it from the footer's pay) ÷ $2,463.85 a second = 13.201 s → **≈ 13 seconds**; $32,526 ÷ the shown $2,464 = 13.201, which rounds the same.
- The stops land after both passes (exact and stored rate: 16.2556701 / 16.2556692 s; 13.2012862 / 13.2012907 s) and within $0.50 of the milestone at both rates, so the finals are exact and carry no "≈", as before.
- The platform captions follow the verdicts. 10a's line 1 is "… $500,000 ≈ 16 seconds." (was "$1 million ≈ 33 seconds."), and "≈ $111 million an hour" is added after the per-second rate. 10c's "a year of it ($65,052) goes by every ≈ 26 seconds" becomes "half a year of it ($32,526) goes by every ≈ 13 seconds". The pinned comments do not change.

**Timing choices.**
- 10a: the kit's riser runs min(2.4, the gap from the last label beat − 0.4) s, so the full 2.4 s riser needs "Next" at least 2.8 s before the pass: 13.45 s. That leaves 4.65-8.1 s, between the $100K caption and the $250K pass, for the two workings (1.7 s each, each a label beat with its caption), and 10.55-13.4 s (2.85 s) for the swap-in rule. The verdict went in at 17.1 s first (0.84 s after the stop): the landing's settle left 0.37 s of near-still before it. At **17.07 s** it is 0.33 s, the condensed cut's figure.
- 10c: the 0-5 s opening is the condensed cut's. The 5.0-13.2 s window carries four beats: the 5-second answer (1.45 s), the $77.7B working (1.65 s), the swap-in rule (2.55 s) and "And half a year?" (2.35 s, into a 2.0 s riser from 11.2 s). "Next" went in at 10.4 s first (a 2.4 s riser, the rule up 2.15 s). It is at **10.8 s** for the rule's reading time, the line a viewer has to work through. The move was first tried as a sound fix, but it was not one (below). The verdict at **13.96 s** is 0.76 s after the stop: the coin's growth settles inside 0.4 s, as in the condensed cut's 0.757 s.

**Iteration (sound).** The Scoreboard pack changed under this pass. The working tree's `looks/scoreboard/sound/*` was rewritten at 10:51 by the concurrent sound pass, not by this pass, and `git status` at the start showed no change there. Results on both packs:
- 10a, B8 (the logo's M(L + 0.2), ≥ −13 LUFS). With an 18.67 s body (verdict 17.07) it measured **−13.01 on the committed pack**, a fail. A sweep of the body on the committed pack (sound only, the same picture): 18.5 s −12.09, 18.55 −12.83, **18.6 −12.10**, 18.67 −13.01, 18.7 (verdict 17.1) −12.02. The last segment's beats move the logo's run-in. **18.6 s** was kept: hold 1.53 s, a shorter body, and it passes on both packs (−12.10 committed, −12.39 working tree; on the working tree 18.67 passes too, at −12.44).
- 10c, BANDS 16 kHz (≤ −12 dB re the 1 kHz octave). **On the committed pack the recut fails, at −11.7 (−11.9 with "Next" at 10.4 s, −11.8/−11.9 at bodies of 15.4-15.5 s).** The short body is bright. In the committed pack's mix (octave power over [0, base]), the riser and drop (11.2-15.55 s, 28% of the span) carry 16 kHz at −8.7 and −7.2 dB re the whole span's 1 kHz octave, against −14.6 before the riser. On the working tree's pack the build and riser are 2.7-2.8 dB darker at 16 kHz, and the recut passes at **−13.4** (−13.5 with "Next" at 10.4). No spec knob in the cut's lane moves it enough: the hold, the riser's length and the body each change it by 0.1-0.2 dB. 06b, the other short Scoreboard body, had its 16 kHz as its tightest band for the same reason. **10c's sound therefore depends on the working tree's Scoreboard pack (or another short-body rule) shipping. That is the ship step's call: no pack or `acceptance.json` was edited here.**

**Measured** (`/tmp/cond/10/tools/motion3.py` on the final renders: frame difference at 270×480, `tblend` difference → `signalstats` YAVG; still < 0.15, near-still < 0.25; and with the hero counter's band left out). **Corrected in the fix pass below (the critic's S1 and S2):** this entry first measured with the band at y 430-610, the default the earlier rounds used too. That band misses the top of the counter's digits (about y 395-430) and their glow, which change every frame, so its "masked" figures counted the counter as stage motion and read too busy. The figures below are re-measured with the band on the counter, **y 380-540** (`motion3.py --mask 380:540`; `/tmp/cond/10/fix2/tools/mstats.py` for the counts and the share). The earlier rounds' masked tables (the condensed cut and its fix pass, above) used the same leaky band; their full-frame figures stand.

| | Full frame, before the verdict: longest still / near-still | Counter masked (y 380-540), before the verdict: still runs ≥ 0.4 s / near-still runs ≥ 0.4 s / near-still share | Verdict hold |
|---|---|---|---|
| 10a condensed (fix pass) | 0.20 / 0.33 s | 1 (15.67-16.27, 0.60 s) / **17** (the longest 25.67-28.00, 2.33 s) / 0.63 | 1.6 s, 1.33 s still |
| **10a recut** (as first published) | **0.17 s (16.87-17.03) / 0.33 s (16.70-17.03)**, the landing's glow settling | none (the longest 7.90-8.13, 0.23 s) / **6**: 6.80-8.13 (1.33), 9.67-10.57 (0.90), 10.80-11.47 (0.67), 11.50-12.03 (0.53), 12.07-12.53 (0.47), 12.57-13.47 (0.90) / 0.49 | 1.53 s: still 17.23-18.37 and 18.40-18.63 (the caption's fade splits it), then the card (19.93/20.10-21.10) |
| 10c condensed (fix pass) | 0.07 / 0.30 s | 3 (the longest 11.73-13.20, 1.47 s) / **14** (the longest 18.87-21.37, 2.50 s) / 0.68 | 1.59 s |
| **10c recut** (as first published) | **0.07 s / 0.13 s (13.77-13.90)** | **1: 10.17-10.67 (0.50 s)**, the end of the rule beat / **5**: 3.83-4.37 (0.53), 4.40-5.00 (0.60), 7.67-8.20 (0.53), 8.93-10.10 (1.17), 10.13-10.80 (0.67) / 0.53 | 1.59 s: still 14.10-14.57 and 14.60-15.57, then the card (17.03-18.07) |

- On the full frame (the brief's metric) no still or near-still run reaches 0.4 s before either verdict; the recut passed that gate as published. With the counter masked it did not look as clean as first written: 10a had six near-still runs of 0.4 s or more and 10c one still run (10.17-10.67 s, the end of the swap-in rule beat with the coin about 80% full and the run-up not yet started). The fix pass below gives both coins their pulse from earlier (`runup.from`) and re-measures: 10a keeps one masked near-still run (6.80-8.13 s), 10c two (3.83-5.00 s), each the last stretch before a bill's pass, carried by the counter's roll and the stream.
- Against the condensed cut on the same correct mask the recut was already calmer: 10a 17 → 6 near-still runs of 0.4 s or more (share 0.63 → 0.49), 10c 3 → 1 still runs (the longest 1.47 → 0.50 s).
- Frame 1 → 2 is the condensed cut's: the hook caption complete, $0 → $1,025 (10a) and $82 (10c), the money stream falling.

**Stills read** (`node src/cli.mjs stills`, tiled; `/tmp/cond/10/recut/sheet-10{a,c}.png`, final specs):
- 10a at 0, 0.034, 0.98, 2.13, 3.27, 4.7, 6.45, 8.15, 10.6, 13.5, 14.75, 16.233, 16.267, 16.6, 17.0, 17.07, 17.1, 17.13, 17.3, 17.4, 18.2, 18.25, 18.55, 18.63, 18.65, 18.7 and 21.05 s, and the label boundaries at 4.667, 6.4 and 13.45 s. Frame 1: the header, $0, the five pips, the $30K bill ghost, "≈ $30,800 / EVERY SECOND", the footer and the complete "Find your salary.". Hero readings: $1,045, $30,143, $65,515, $100,580, $144,564 (the $970B working), $198,392 (the hourly working), $250,681, $326,040 (the rule), $415,239 and $453,687 ("NEXT / $500,000 A YEAR", the coin pulsing), $499,302 at 16.233 s, and $500,000 from 16.267 s with "$500,000 A YEAR / ≈ 16 SECONDS". The verdict "$500K A YEAR: ≈ 16 SECONDS." fades in at 17.07 s and is solid by 17.13 s; the caption is gone by 18.63 s and the card starts at 18.6 s. At each label boundary the next label is already slamming in: no frame shows the resting rate between beats.
- 10c at 0, 0.034, 1.0, 1.75, 2.85, 5.02, 5.75, 6.55, 8.25, 10.0, 10.85, 11.2, 12.4, 13.2, 13.233, 13.5, 13.95, 14.0, 14.3, 14.6, 15.5, 15.6 and 18.0 s, and 4.967, 5.0, 5.033, 8.2 and 10.8 s. Frame 1: $0, the ladder "≈ $2,464 · ≈ $12,319 · $32,526", the bill ghost, the resting rate and the complete "How long do you work for this?". Hero readings: $83, $2,463, $4,311, $7,021, $12,368, $14,167, $16,138, $20,326, $24,638, $26,732, $27,595 and $30,551 under "$1,251 × 52 ÷ 2 = $32,526 / NEXT: HALF A YEAR OF MEDIAN PAY", $32,522 at 13.2 s (the label still "Next"), then $32,526 from 13.233 s with "≈ 13 SECONDS: $32,526 / 6 MONTHS OF WORK". The ladder turns into ≈ 2 weeks, ≈ 10 weeks and 6 months, and the coin grows (about 336 → 424 px across). The band rises at 13.95 s, the verdict "HALF A YEAR OF MEDIAN PAY: / ≈ 13 SECONDS." is up from 14.0 s and held to 15.55 s, and the card follows.

**Lint:** `node src/cli.mjs check specs-wip/<id>.json`: 10a 21.1 s = 18.6 + 2.5 s end card, 10c 18.05 s = 15.55 + 2.5 (printed as 18.1 = 15.6 + 2.5); **0 errors, 0 warnings** each, also with `--every 0.05`.

**Render and sound** (`/tmp/cond/10/<id>/recut-final/`):
- `render specs-wip/<id>.json --out …/recut --jobs 1`: 10a 633 frames (21.1 s), 32 sfx; 10c 542 frames (18.07 s), 24 sfx.
- `sound specs-wip/<id>.json --video …/recut --out …/recut-final --score`: the video md5 is identical in each (10a `84610308a719`, 10c `1cc140bb4152`). P is 16.256 / 13.201 s by the riser rule, at 147.638 / 153.584 BPM (10a) and 149.989 / 153.257 BPM (10c); cue onsets are within 0.08 / 0.1 ms.
- The §2.3 rows the promotion will need (`sound/tools/tempo-table.mjs --cues` on the fixture with these two records substituted; Appendix B and the engine agree on all 30 rows):
  - `| 10a | riser | 16.256 | 40 (r0) | 147.638 | base 18.60: 6 (r2) @ 153.58 | 18.96 |` (was P 32.511, 80 beats, base 36.50: 10 (r2) @ 150.41, L 36.86)
  - `| 10c | riser | 13.201 | 33 (r1) | 149.989 | base 15.55: 6 (r2) @ 153.26 | 15.91 |` (was P 26.403, 66 (r2), base 31.00: 12 (r0) @ 156.62, L 31.36). N₁ 33 has a 1-beat pickup, as 06c's 25 does: the whole-second ticks and the 0.1 s-grid label beats sit on its 16ths.
  - The tempo step at P is +4.03% (10a) and +2.18% (10c), inside ±8%. No V is anchored.
  - `runup.beat` is P ÷ N₁ of these rows: 0.4064 and 0.40003 s.

**Verify** (`node src/cli.mjs verify specs-wip/<id>.json --video …/recut-final --detail`, on the working tree as it stands): **PASS, 42/42 gated on each; units 1/1 looks.** The CUE DRIFT block (one record each) and "baseline DIFFERS" (A14) are the expected WIP notices. A re-run 10 minutes later gave the same margins. Every gated numeric check, value (margin to its limit):

| Gate | Limit (Scoreboard) | 10a value (margin) | 10c value (margin) |
|---|---|---|---|
| A1 delivery | -14 ±1 | -14.08 (0.92) | -14.08 (0.92) |
| A1 master | -14 ±0.3 | -14.01 (0.29) | -14.01 (0.29) |
| A2 TP | <= -1 | -1.30 (0.30) | -1.30 (0.30) |
| A3 LRA | 4-9 | 5.19 (1.19) | 4.69 (0.69) |
| A4 ST max | <= -8 | -11.32 (3.32) | -11.61 (3.61) |
| A4 M max | <= -6 | -9.33 (3.33) | -9.34 (3.34) |
| A5 PLR | 8-13 | 12.78 (0.22) | 12.78 (0.22) |
| A7 open | >= -18 | -10.49 (7.51) | -9.90 (8.10) |
| A8 corr mean | >= 0.3 | 0.74 (0.44) | 0.75 (0.45) |
| A8 corr min | >= -0.1 | 0.41 (0.51) | 0.51 (0.61) |
| A8 mono fold | ±1.5 | -0.70 (0.80) | -0.70 (0.80) |
| A10 phone drop | <= 7 | 2.77 (4.23) | 2.75 (4.25) |
| A11 limited % | <= 3 | 1.499 (1.501) | 0.764 (2.236) |
| A11 max | <= 6 | 2.39 (3.61) | 3.38 (2.62) |
| BANDS 31.5 | -20..3 | -16.2 (3.8) | -14.1 (5.9) |
| BANDS 63 | 4..10 | 6.9 (2.9) | 8.2 (1.8) |
| BANDS 125 | 2..8 | 3.2 (1.2) | 4.1 (2.1) |
| BANDS 250 | 0..6 | 2.2 (2.2) | 3.1 (2.9) |
| BANDS 500 | -1..4 | 1.4 (2.4) | 2.5 (1.5) |
| BANDS 2000 | -5..0 | -4.0 (1.0) | -2.1 (2.1) |
| BANDS 4000 | -9..-2 | -7.0 (2.0) | -6.1 (2.9) |
| BANDS 8000 | -14..-5 | -8.6 (3.6) | -7.6 (2.6) |
| BANDS 16000 | -26..-12 | -13.8 (1.8) | -13.4 (1.4) |
| HARSH | <= 2 | -0.59 (2.59) | 0.28 (1.72) |
| B1 music | -3.5..-1.5 | -2.48 (0.98) | -2.23 (0.73) |
| B1 sfx | -5..-2.5 | -4.00 (1.00) | -3.91 (1.09) |
| B2 duck | <= -8 | -10.8 (2.8) | -10.8 (2.8) |
| B3 closest cue | >= 3 | 4.2 (1.2) | 4.1 (1.1) |
| B4 onset | <= 2 | 0.08 (1.92) | 0.10 (1.90) |
| B5 P onset | ±10 | 0.0 (10.0) | -2.7 (7.3) |
| B6 valley | <= 18 | 4.7 (13.3) | 4.3 (13.7) |
| B7 drop over build, edge / centred | >= 2 | 4.5 / 5.2 (2.5) | 4.7 / 5.1 (2.7) |
| B8 logo, M(L + 0.2) | >= -13 LUFS | -12.39 (0.61) | -12.26 (0.74) |
| B9 card quietest | >= -45 | -25.2 (19.8) | -24.2 (20.8) |
| S1 in key | >= 97 | 100.0 (3.0) | 100.0 (3.0) |
| S5 identical run | <= 2 | 1 (1.0) | 1 (1.0) |
| S5 distinct | >= 3 | 8 (5.0) | 8 (5.0) |
| S8 timing SD | 1.5-5 | 3.07 (1.57) | 3.00 (1.50) |
| S8 off-grid | <= 0.2 | 0.066 (0.134) | 0.073 (0.127) |
| S9 BPM, segment 1 in 136-152 / tempo step at P (±8%) | | 147.638 (4.36) / +4.03% (3.97) | 149.989 (2.01) / +2.18% (5.82) |
| S12 pad move | <= 5 | 3 (2.0) | 3 (2.0) |
| S14 polyphony | <= 12 | 12 (0.0) | 12 (0.0) |

- The pass/fail-only gates pass on both: A6 (0% silent), A9 (DC), A12 (AAC LC 48 kHz, audio = video within a frame), A13 (video md5 identical), A14 (master unique), B10, S2-S4, S6, S7, S10, S11, S13, TRAIN and DUCK.
- **Under 0.5 of margin:** A5 PLR 12.78 (0.22) on both, A1 master −14.01 (0.29, centred) and A2 −1.30 dBTP (0.30) on both, and S14 at its limit as in all 30 teasers. 10c's A3 LRA is 4.69 (0.69), lower than its condensed cut's 5.93 because the short body has less range.
- **On the committed pack** (`git archive HEAD studio` into a scratch folder, `node_modules` linked, the same final MP4s): 10a **PASS 42/42** (B8 −12.10 (0.90), A5 12.88 (0.12), A2 −1.20 (0.20), 16 kHz −13.4); 10c **41/42: BANDS 16 kHz −11.7, 0.3 over** (see *Iteration*).

**Check** (`checks/10-cost-counter.py`):
- **The recut is a third expectation set** (`RECUT`, built by `recut_of`). For 10a and 10c, a spec in the condensed cut's lane is checked as the condensed (real-time) cut and any other length as the recut; 10b is unchanged. The strings are the round-2 strings, picked by index, plus the new ones built from the same numbers. The numbers come from new maths blocks (`A["run_recut"]`, `C["run_recut"]`): the stop after both passes and within $0.50 at both rates, $500K ≈ 16 s, and half a year ≈ 13 s by the exact and the shown rate.
- New rules for the recut:
  - its lane: 18.2-18.8 / 15.1-15.7 s;
  - every label beat holds to the next one on 10a too (the condensed cut checked 10c only);
  - the kit's riser is at least 0.8 s, so the score's P is the riser climax the run-up is built on;
  - the run-up's (P, N₁) is the recut's row (`RUNUP_ROW`, per cut).
- `BIBLE.md` §2.3 must hold the row of the cut `studio/specs/` holds (`IN_SPECS`). Until the promotion the run prints a note naming the recut's row.
- The allowed numbers are per cut: the recut drops 10a's $1,000,000, "$1M" and ≈ 33 s, and 10c's ≈ 26 s. The write-up's caption and pinned-comment numbers are checked against the recut (`MD_CUT`), so the old "$1 million ≈ 33 seconds" caption failed until it was updated. `--md PATH` points that scan at a scratch copy.
- Results:
  - **1019 checks, 0 failures** by default (the round-2 cuts in `studio/specs/`; one number more than before, the 10a caption's "≈ $111 million").
  - **995 checks, 0 failures** with `--spec` on the three WIP specs.
  - **1058 checks, 0 failures** on the git-history condensed 10a and 10c with the 10b WIP spec (the condensed expectations are kept).
- **Mutation test** (`/tmp/cond/10/recut/mutate3.py`, scratch copies in `/tmp/cond/10/recut/mut/`): **27 of 27 caught**, each with exit 1 and the named rule.
  - 10a: the stop 0.03 ms before the $500K pass; final "≈ $500,000"; the verdict "≈ 17 seconds"; the verdict 0.64 s after the stop; a 2.0 s hold; the $1M row kept; the old $1M verdict; "Next" at 15.5 s (a 0.36 s riser, so no riser cue); the condensed cut's run-up beat; the $970B caption up 1.0 s; the $250K caption 0.37 s late; the $970B label held 1.0 s (the resting rate at 5.65-6.4 s); "≈ $110 million"; the hook caption typed on at frame 1.
  - 10c: the stop at 13.2012 s (before the stored-rate pass); the verdict "≈ 26 seconds"; the verdict at 14.3 s (the motion proxy); "Next" as "$1,251 × 26"; "Next" at 10.4 s without its caption; no `runup`; a 1.0 s hold; the coin row's answer as "1 year"; the swap-in caption up 1.0 s; the half-year caption 0.35 s late; the $77.7B label held 1.2 s.
  - The write-up: 10a's caption back to "$1 million ≈ 33 seconds."; 10c's back to "≈ 26 seconds".
  - The fix pass's 26 condensed-cut mutations, re-run on the git-history copies, are all still caught.

**To promote** (as it stood; the fix pass's list below replaces it):
1. Copy the three WIP specs over `studio/specs/<id>.json` (10a and 10c the recut, 10b the condensed cut) and set `IN_SPECS = {"a": "recut", "b": "cond", "c": "recut"}` in the check. The Scoreboard `runup` option they use is already in HEAD.
2. BIBLE §11.1 for the moved records. Re-measure the Scoreboard on the fresh records: 10a and 10c moved, to 32 and 24 cues. Refit the Becker Rig `MODEL` (10b). **10c needs the working tree's Scoreboard pack, or another short-body rule, to pass BANDS** (16 kHz −11.7 on the committed pack, −13.4 on the working tree). Store the records in `test/fixtures/cues.json`, run `tempo-table --write` (the 10a and 10c rows above, and 10b's from the fix pass), then `verify --strict-cues` and `npm test`. Rerun the check: its run-up rule then expects (16.256, 40) and (13.201, 33) in `BIBLE.md`.
3. Ship by §11.5. Then update `publishing/10{a,b,c}-*` and `teasers/v2/teasers.json`: runtimes **21.1 / 38.65 / 18.05 s**; covers 10a 17.3-18.4 s, 10b 34.95-36.1 s, 10c 14.1-15.5 s. The 10a and 10c sheets need the new verdicts and platform captions from this file.

**Open items** (as they stood; the fix pass below answers or carries each):
- 10c's sound depends on the Scoreboard pack (above). If the committed pack ships, 10c fails BANDS at 16 kHz by 0.3 dB.
- The margins under 0.5 (A5 0.22, A1 master 0.29 and A2 0.30 on both; S14 at its limit), for the ship step's re-measure.
- 10c's verdict sets at caps of about 64 px (the year verdict's were 68), about level with the label lines. The owner's wording is kept. "Half a year of pay: / ≈ 13 seconds." would measure caps 67 px. 10c's "Next" label sets its second line a little small (width-bound) but above the type floor.
- 10a's ladder now tops out at $500K: salaries above it have no row and use the rule (captioned and pinned).
- Carried from the fix pass: the caption karaoke on reading-paced lines (the Scoreboard's shared caption code).
- On promotion these go stale and are outside this pass's files: `teasers/v2/teasers.json`, `publishing/10{a,b,c}-*.{md,json}` and the files under `renders/`.

### Recut, fix pass (2026-10-13): the critic's items

**The brief:** apply every must and should (and the cheap nits) from the critic's review of the recut: PASS, no must items, 10a 8 and 10c 7.5. Sound items are fixed here only if the cut's timing causes them; otherwise they are noted for the ship step. The recut's rules, files and limits stand. 10b's WIP spec is not touched.

| # | Severity | Item | What was done |
|---|---|---|---|
| S1 | should | 10a: the masked motion figures came from a band (y 430-610) that misses the top of the counter (about y 395-430). With the counter masked (y 380-540) there are counter-only near-still runs at 6.80-8.13 s (1.33 s) and 9.67-13.47 s (six runs of 0.47-0.90 s) | **Re-measured and applied.** The recut entry's Measured section is corrected (the earlier rounds' masked tables used the same band; that is noted there), and so are the beat-sheet notes. The coin now pulses from 9.7 s (`lookOpts.runup.from`, the kit's existing opt-in key; no kit change): 16 pulses from 9.75 s, where there were 6 from 13.82 s. The six runs at 9.67-13.47 s are gone. 6.80-8.13 s stays: it is the $250K bill's last stretch, and the run-up only pulses the last milestone's icon. It is counter-carried, and the beat sheet, the Look note and this entry say so. 9.7 s was chosen over the critic's 10.55 s because from 10.55 s the 9.67-10.57 s run (0.90 s) stays |
| S2 | should | 10c: the same band. With the counter masked, 3.83-5.00, 7.67-8.20 and 8.93-10.80 s are near-still, and 10.17-10.67 s is still (0.50 s) | **Re-measured and applied.** `runup.from` is 7.6 s: 14 pulses from 7.60 s, where there were 6 from 10.80 s. The still run is gone (the longest masked still is now 0.27 s, at 4.73-5.00), and so are the near-still runs at 7.67-8.20 and 8.93-10.80 s. 3.83-5.00 s stays: it is the 5-second bill's last second, before the coin is on the stage. 7.6 s was chosen over the critic's 9.6 s, which leaves 8.93-9.6 s and on a still-frame sequence measured a 0.70 s near-still run at 12.27-12.97 s. With the earlier start, the pulses in the riser are stronger |
| S3 | should | 10c fails BANDS 16 kHz on the committed Scoreboard pack (−11.7, 0.3 over) and passes on the working tree's pack | **Not the cut's timing, so left for the ship step.** Re-verified on the committed pack with the new MP4: the same −11.7, 41/42 (table below). 10c's cue record is byte-identical to the recut's, and the recut's sweep found that the spec knobs move this band only 0.1-0.2 dB. **Do not promote 10c's WIP spec onto the committed pack as it is.** Ship it with the Scoreboard pack the concurrent sound pass is finishing, or with a short-body 16 kHz rule (To promote, below) |
| S4 | should | 10a: margins under 0.5 dB; B8 swings about 0.9 LU over a few hundredths of a second of body | **Not changed; left for the ship step.** This pass does not move 10a's duration, its verdict or any cue: the cue record is byte-identical to the recut's. Any later change to 10a's duration or verdict time must re-run `verify` on both packs (To promote) |
| S5 | should | 10c: margins under 0.5 dB; A3 LRA 4.69 | **Not changed; left for the ship step** (the Scoreboard refit's re-measure). The cue record is byte-identical to the recut's. On the working tree as it stands, 10c's B8 is now −12.97, a margin of 0.03 (it was −12.26 on the pack as it stood at 10:51). The Scoreboard pack changed under this pass (below), so this is the ship step's first number to watch |
| N1 | nit | 10c's verdict lands 0.76 s after the stop, and the last caption stays under it for 0.44 s; the IG covers include the caption | **Verdict: tried, not kept. Covers: fixed.** A verdict at 14.0 s (0.80 s after the stop) was rendered and measured. It stretched the landing's near-still, with the counter masked, from 0.37 to 0.43 s (13.53-13.97 s), in return for a verdict 0.04 s later and 0.04 s less caption overlap, and it moved the reveal cue. 13.96 s stays: the check's 10c floor is 0.75 s, the condensed fix pass's precedent. The covers move to frames where the last caption has gone (checked frame by frame): **10a 18.4-18.55 s, 10c 14.6-15.5 s** (were 17.3-18.4 and 14.1-15.5) |
| N2 | nit | 10c's verdict sets at caps of about 64 px; "Half a year of pay: / ≈ 13 seconds." measured caps 67 | **Put to the owner** (*Owner decision*, follow-up). The owner's wording stays until the owner answers |
| N3 | nit | 10a's R9 row said the coin "pulses on the beat from 13.45 s"; the first pulse was at 13.82 s | **Fixed**, and rewritten for the new start: "pulses on the beat from 9.75 s (the run-up from `runup.from` 9.7 s, through the swap-in rule and the 13.45 s "Next" beat)" |

**What changed:**
- `studio/specs-wip/10a-scoreboard-debt-interest-live.json`: `lookOpts.runup` `{ "beat": 0.4064 }` → `{ "beat": 0.4064, "from": 9.7 }`. `studio/specs-wip/10c-scoreboard-amazon-makes.json`: `{ "beat": 0.40003 }` → `{ "beat": 0.40003, "from": 7.6 }`. Nothing else in either spec changed (10c's verdict was tried at 14.0 s and put back to 13.96 s).
- **No kit change.** `from` is the kit's own documented opt-in key (the run-up's doc block in `looks/scoreboard/formats/cost-counter.js`, in HEAD since the condensed cut's fix pass). It moves the first pulse earlier and leaves the riser's span (its `prevT`) alone, so it adds no cue: **both cue records are byte-identical to the recut's** (`node src/cli.mjs cues`, then `cmp` against `/tmp/cond/10/recut/wip.cues.json`), and on any one pack the sound is the same.
- How `from` was chosen. I rendered every-frame still sequences (`/tmp/cond/10/tools/seqmotion.sh`, masked at y 380-540): 10a from 9.0 to 16.4 s with `from` at 10.55 and 9.7 s, and 10c from 7.0 or 8.0 to 13.3 s with `from` at 9.6, 8.6 and 7.6 s. For each, the earliest start that clears the measured run won, provided the coin is on the stage and has settled by then. 10a's coin drops in at 8.43 s and has settled by 8.97 s, and is 60% full at 9.75 s. 10c's has settled by 5.84 s and is 58% full at 7.60 s. The first pulse is at half the bump (2.5%), and the pulses sit on the score's beat grid (P − k·beat), so they are in time with the music from the first one. I read the frames at 7.53-8.47 s (10c) and 9.13-9.87 s (10a). The pulse is a gentle bump with a rim glow on the stage, and it does not reach the label stack or the caption.
- `teasers/v2/checks/10-cost-counter.py`: the recut's expected `lookOpts.runup` carry `from` (10a 9.7, 10c 7.6). `check_runup` counts the pulses from `from` and adds two rules. `from` must be at or before the last label beat, because the riser keeps its start and so the cue record cannot move. `from` must also be at least 1.0 s after the previous pass (`FROM_AFTER`), so the last icon has dropped in and settled and every pulse has an icon to bump. 10c's expected verdict stays 13.96 s, and the N1 trial is recorded beside it. The docstring describes all of this.
- This write-up: the date line, the status paragraph, the check and lint lines, 10a's R9 row, beat sheet (the 6.4 s note, the 9.75 s row, the run-up row, the landing note) and Look note; 10c's R9 row, beat sheet (the 2.8 s note, the run-up row, the landing note) and Look note; the Instagram covers; the recut entry's Measured section (corrected) and its To promote and Open items (superseded by this entry's); the *Owner decision* follow-up; and this entry.

**Measured** (the final renders in `/tmp/cond/10/<id>/final/`, using `motion3.py --mask 380:540` and `/tmp/cond/10/fix2/tools/mstats.py`; still < 0.15, near-still < 0.25; the full frame is the brief's gate and the masked metric is a flag):

| | Full frame, before the verdict: longest still / near-still | Counter masked (y 380-540): still runs ≥ 0.4 s / near-still runs ≥ 0.4 s / near-still share before the verdict |
|---|---|---|
| 10a condensed (fix pass) | 0.20 / 0.33 s | 1 / 17 / 0.63 |
| 10a recut | 0.17 / 0.33 s | none / 6 / 0.49 |
| **10a fix pass** | **0.17 s (16.87-17.03) / 0.33 s (16.70-17.03)** | **none (the longest 7.90-8.13, 0.23 s) / 1: 6.80-8.13 (1.33 s) / 0.38** |
| 10c condensed (fix pass) | 0.07 / 0.30 s | 3 / 14 / 0.68 |
| 10c recut | 0.07 / 0.13 s | 1 (10.17-10.67, 0.50 s) / 5 / 0.53 |
| **10c fix pass** | **0.07 s (13.83-13.90) / 0.13 s (13.77-13.90)** | **none (the longest 4.73-5.00, 0.27 s) / 2: 3.83-4.37 (0.53), 4.40-5.00 (0.60) / 0.42** |

- The shorter masked near-still runs (0.2-0.4 s): in 10a, 3.03-3.27, 6.03-6.40, 9.03-9.27, the run-up's gaps between pulses (14.00-14.23, 14.80-15.07, 15.63-15.87, 16.03-16.27; each ≤ 0.27 s) and the landing at 16.70-17.03 s (0.33). In 10c, 3.20-3.40, 6.17-6.50, 7.03-7.37, 7.40-7.63, the run-up's gaps (11.03-13.20 s, each ≤ 0.27 s) and the landing at 13.53-13.90 s (0.37). A tighter mask (y 395-530) gives the same runs to within a frame or two.
- **Counter-carried, by choice:** 10a 6.80-8.13 s (the hourly working, with the $250K bill 84-100% full) and 10c 3.83-5.00 s (the "≈ 2 weeks, at median pay" working, with the 5-second bill 77-100% full). The run-up option pulses only the last milestone's icon, and that icon is not on the stage yet. In both stretches the counter rolls every frame (+$1,025 or +$82 a frame), the stream pours into the bill and its level line rises, so the full frame never goes near-still there. A pulse before every pass would need a second opt-in kit option (an open item since the condensed fix pass); this pass does not add one.
- The verdict holds (10a 1.53 s, 10c 1.59 s) and frame 1 → 2 are unchanged.

**Stills read** (`node src/cli.mjs stills specs-wip/<id>.json`, tiled as `/tmp/cond/10/fix2/sheet-10{a,c}.png`; 24-frame contact sheets from `node src/cli.mjs sheet` in `/tmp/cond/10/fix2/sheets/`):
- 10a at 0, 0.034, 0.98, 2.13, 3.27, 4.7, 6.45, 8.15, 8.8, 9.75, 9.8, 10.6, 11.4, 12.6, 13.5, 14.75, 15.9, 16.233, 16.267, 16.6, 17.07, 17.13, 17.4, 18.2, 18.3, 18.4, 18.5, 18.55, 18.65 and 21.05 s. Everything is as in the recut except the coin, which pulses from 9.75 s (the bump, the rim glow, the "$500K" tag riding it, the ladder's $500K row glowing) under "$250,000 A YEAR / ≈ 8 SECONDS", then the rule, then "Next". Frame 1 shows the full hook caption, $0, the five pips, the bill ghost and the footer. The verdict "$500K A YEAR: ≈ 16 SECONDS." is solid from 17.13 s. "$500,000: passed." is up at 18.3 s and gone at 18.4 s, and the card fades in from 18.6 s.
- 10c at 0, 0.034, 1.0, 1.75, 2.85, 5.02, 5.75, 6.55, 7.6, 7.65, 8.25, 9.2, 9.65, 10.0, 10.85, 11.2, 12.4, 13.2, 13.233, 13.5, 13.95, 14.0, 14.3, 14.45, 14.55, 14.6, 15.5, 15.6 and 18.0 s. The coin pulses from 7.60 s under "$77.7B ÷ 31,536,000 S / ≈ $2,464 EVERY SECOND", then through the rule and "Next"; the rest is as in the recut. "≈ 13 seconds: half a year." is up at 14.45 s and gone at 14.55 s. Nothing collides or is cut off.
- I compared frames from the final MP4s at six times each with the stills: mean absolute difference 0.6-1.1 of 255 (2.1 at 10c's 10.85 s, a half-frame offset into the "Next" label's slam).

**Lint:** `node src/cli.mjs check specs-wip/<id>.json`: 10a 21.1 s = 18.6 + 2.5 s end card, 10c 18.05 s; **0 errors, 0 warnings** each, also with `--every 0.05`.

**Check** (`checks/10-cost-counter.py`): **1019 checks, 0 failures** with no arguments (the round-2 cuts in `studio/specs/`). **999, 0 failures** with `--spec` on the three WIP specs (995 before; the 4 new checks are the two `from` rules on each). **1058, 0 failures** on the git-history condensed 10a and 10c with the 10b WIP spec. **Mutation test** (`/tmp/cond/10/fix2/mutate4.py`, scratch copies in `/tmp/cond/10/fix2/mut/`): **34 of 34 caught**, each with exit 1 and the named rule. These are the recut's 27, re-based on the new WIP specs, and 7 new ones: 10a with `from` dropped, at 13.8 s (after "Next") and at 8.5 s (the coin still dropping in); 10c with `from` at 5.5 s and at 11.0 s; 10c's verdict at 14.0 s (the N1 trial) and at 13.9 s (0.70 s after the stop). The condensed fix pass's 26 mutations, run on the history copies (`/tmp/cond/10/recut/mutate2c.py`), are all still caught.

**Render and sound** (`/tmp/cond/10/<id>/final/`, replacing the real-time condensed finals there; 10b's final is untouched):
- `render specs-wip/<id>.json --jobs 2`: 10a 633 frames (21.1 s), 32 sfx; 10c 542 frames, 24 sfx.
- `sound specs-wip/<id>.json --video … --out …/final --score`, with the video md5 identical in each (10a `4dfb7f6ecd92`, 10c `d0e90a0b2d9c`). P is 16.256 / 13.201 s at 147.638 / 153.584 BPM (10a) and 149.989 / 153.257 BPM (10c), the recut's rows, and the cue onsets are within 0.08 / 0.1 ms.
- The recut's `recut-final/` MP4s and this pass's picture-only renders were deleted after the video-md5 checks (disk).
- **The Scoreboard pack moved during this pass.** The concurrent Scoreboard sound pass edited `looks/scoreboard/sound/{balance,bands,clearance,compose,energy,logo,sfx}.mjs` between 11:52 and 11:56 and changed two of them while this pass's first sound build was running. So the final sound and the working-tree `verify` were both run in a frozen copy of the working tree's `studio/` (taken at 11:57:52, with the pack unchanged during the copy). At 12:03 that copy still matched the live working tree (`/tmp/cond/10/fix2/packs-wt-snapshot.txt` has the md5s). The committed pack was verified from `git archive HEAD studio` with the WIP specs copied in, on the same MP4s.

**Verify** (`node src/cli.mjs verify specs-wip/<id>.json --video …/final --detail`): **10a PASS 42/42 on both packs. 10c PASS 42/42 on the working tree; 41/42 on the committed pack (BANDS 16 kHz −11.7, 0.3 over: S3).** Units pass 1/1 everywhere. The CUE DRIFT block (one record each) and "baseline DIFFERS" (A14) are the expected WIP notices. Every gated numeric check, value (margin to its limit):

| Gate | Limit | 10a working tree | 10a committed pack | 10c working tree | 10c committed pack |
|---|---|---|---|---|---|
| A1 delivery | -14 ±1 | -14.08 (0.92) | -14.08 (0.92) | -14.09 (0.91) | -14.17 (0.83) |
| A1 master | -14 ±0.3 | -14.01 (0.29) | -14.01 (0.29) | -14.01 (0.29) | -14.09 (0.21) |
| A2 TP | <= -1 | -1.30 (0.3) | -1.20 (0.2) | -1.18 (0.18) | -1.40 (0.4) |
| A3 LRA | 4-9 | 5.23 (1.23) | 5.30 (1.3) | 4.72 (0.72) | 4.94 (0.94) |
| A4 ST max | <= -8 | -11.31 (3.31) | -11.28 (3.28) | -11.51 (3.51) | -11.50 (3.5) |
| A4 M max | <= -6 | -9.29 (3.29) | -9.27 (3.27) | -9.26 (3.26) | -9.23 (3.23) |
| A5 PLR | 8-13 | 12.78 (0.22) | 12.88 (0.12) | 12.90 (0.1) | 12.77 (0.23) |
| A7 open | >= -18 | -10.49 (7.51) | -10.56 (7.44) | -9.83 (8.17) | -10.04 (7.96) |
| A8 corr mean | >= 0.3 | 0.74 (0.44) | 0.76 (0.46) | 0.75 (0.45) | 0.77 (0.47) |
| A8 corr min | >= -0.1 | 0.41 (0.51) | 0.44 (0.54) | 0.51 (0.61) | 0.53 (0.63) |
| A8 mono fold | ±1.5 | -0.70 (0.8) | -0.67 (0.83) | -0.69 (0.81) | -0.67 (0.83) |
| A10 phone drop | <= 7 | 2.76 (4.24) | 2.80 (4.2) | 2.79 (4.21) | 2.81 (4.19) |
| A11 limited % | <= 3 | 1.474 (1.526) | 1.495 (1.505) | 0.87 (2.13) | 0.662 (2.338) |
| A11 max | <= 6 | 2.39 (3.61) | 2.11 (3.89) | 3.23 (2.77) | 2.78 (3.22) |
| BANDS 31.5 | -20..3 | -16.2 (3.8) | -16.1 (3.9) | -14.1 (5.9) | -14 (6.0) |
| BANDS 63 | 4..10 | 6.9 (2.9) | 7 (3.0) | 8.3 (1.7) | 8.4 (1.6) |
| BANDS 125 | 2..8 | 3.2 (1.2) | 3.4 (1.4) | 4.1 (2.1) | 4.2 (2.2) |
| BANDS 250 | 0..6 | 2.2 (2.2) | 2.3 (2.3) | 3.1 (2.9) | 3.1 (2.9) |
| BANDS 500 | -1..4 | 1.4 (2.4) | 1.4 (2.4) | 2.5 (1.5) | 2.5 (1.5) |
| BANDS 2000 | -5..0 | -4 (1.0) | -4 (1.0) | -2.1 (2.1) | -2.2 (2.2) |
| BANDS 4000 | -9..-2 | -7 (2.0) | -7 (2.0) | -6.1 (2.9) | -6 (3.0) |
| BANDS 8000 | -14..-5 | -8.5 (3.5) | -8.3 (3.3) | -7.5 (2.5) | -7 (2.0) |
| BANDS 16000 | -26..-12 | -13.7 (1.7) | -13.4 (1.4) | -13.1 (1.1) | **-11.7 (FAIL, -0.3)** |
| HARSH | <= 2 | -0.61 (2.61) | -0.67 (2.67) | 0.26 (1.74) | 0.10 (1.9) |
| B1 music | -3.5..-1.5 | -2.47 (0.97) | -2.35 (0.85) | -2.22 (0.72) | -2.15 (0.65) |
| B1 sfx | -5..-2.5 | -4.01 (0.99) | -3.93 (1.07) | -3.81 (1.19) | -3.88 (1.12) |
| B2 duck | <= -8 | -10.8 (2.8) | -10.8 (2.8) | -10.8 (2.8) | -10.8 (2.8) |
| B3 closest cue | >= 3 | 4.2 (1.2) | 4.1 (1.1) | 4.1 (1.1) | 4.3 (1.3) |
| B4 onset | <= 2 | 0.08 (1.92) | 0.08 (1.92) | 0.1 (1.9) | 0.08 (1.92) |
| B5 P onset | ±10 | -4.0 (6.0) | -4.0 (6.0) | -2.7 (7.3) | 1.3 (8.7) |
| B6 valley | <= 18 | 4.7 (13.3) | 4.7 (13.3) | 4.2 (13.8) | 4.2 (13.8) |
| B7 drop-build edge/centred | >= 2 | 4.6/5.2 | 4.6/5.2 | 4.7/5.2 | 4.6/5.1 |
| B8 logo | >= -13 LUFS | -12.38 (0.62) | -12.10 (0.9) | -12.97 (0.03) | -12.71 (0.29) |
| B9 card quietest | >= -45 | -25.2 (19.8) | -25.5 (19.5) | -24.2 (20.8) | -24.7 (20.3) |
| S1 in key | >= 97 | 100.0 (3.0) | 100.0 (3.0) | 100.0 (3.0) | 100.0 (3.0) |
| S5 identical run | <= 2 | 1 (1.0) | 1 (1.0) | 1 (1.0) | 1 (1.0) |
| S5 distinct | >= 3 | 8 (5.0) | 8 (5.0) | 8 (5.0) | 8 (5.0) |
| S8 timing SD | 1.5-5 | 3.07 (1.57) | 3.07 (1.57) | 3.00 (1.5) | 3.00 (1.5) |
| S8 off-grid | <= 0.2 | 0.066 (0.134) | 0.066 (0.134) | 0.073 (0.127) | 0.073 (0.127) |
| S9 BPM | seg1 range, ±8% | 147.638/153.584 (4.03) | 147.638/153.584 (4.03) | 149.989/153.257 (2.18) | 149.989/153.257 (2.18) |
| S12 pad move | <= 5 | 3 (2.0) | 3 (2.0) | 3 (2.0) | 3 (2.0) |
| S14 polyphony | <= 12 | 12 (0.0) | 12 (0.0) | 12 (0.0) | 12 (0.0) |

- The pass/fail-only gates pass on all four runs: A6 (0% silent), A9 (DC), A12 (AAC LC 48 kHz, audio = video within a frame), A13 (video md5 identical), A14 (master unique), B10, S2-S4, S6, S7, S10, S11, S13, TRAIN and DUCK.
- **Under 0.5 of margin.** 10a: A5 PLR 0.22 / 0.12, A2 0.30 / 0.20 and A1 master 0.29 (working tree / committed). 10c: **B8 0.03 on the working tree** (it was 0.74 on the 10:51 pack; 0.29 committed), A5 0.10 / 0.23, A2 0.18 / 0.40, A1 master 0.29 / 0.21 and 16 kHz −0.3 committed. S14 is at its limit in all four, as in all 30 teasers. 10a's figures match the recut's on the committed pack, and on the working tree they are within 0.03 of them. 10c's moved with the pack, not with the cut: the cue record, and so the input to the engine, is byte-identical to the recut's.

**To promote** (the ship step; replaces the recut entry's list; step 1 was done on 2026-10-13, see "Promoted (2026-10-13)" at the end of this log):
1. Copy the three WIP specs over `studio/specs/<id>.json` (10a and 10c the recut with this pass's `runup.from`, 10b the condensed cut) and set `IN_SPECS = {"a": "recut", "b": "cond", "c": "recut"}` in the check. Everything they use (`runup`, its `from`, `stream`, `climaxScale`, `tallVerdict`) is already in the HEAD kit.
2. BIBLE §11.1 for the moved records: re-measure the Scoreboard on the fresh records (10a and 10c, 32 and 24 cues, byte-identical to the recut's) after the concurrent Scoreboard pass has landed, and refit the Becker Rig `MODEL` (10b). **Do not ship 10c on the committed Scoreboard pack:** it fails BANDS 16 kHz there by 0.3 dB. Ship it with the pack that pass finishes, or with a short-body 16 kHz rule, and re-check 10c's B8 (0.03 on the working tree now). **Any later change to 10a's duration or verdict time re-runs `verify` on both packs** (B8 swings about 0.9 LU over a few hundredths of a second of body: the recut's sweep). Store the records in `test/fixtures/cues.json`, run `tempo-table --write` (the 10a and 10c rows in the recut entry, 10b's from the condensed fix pass), then `verify --strict-cues` and `npm test`. Rerun the check: its run-up rule then expects (16.256, 40) and (13.201, 33) in `BIBLE.md`.
3. Ship by §11.5. Then update `publishing/10{a,b,c}-*` and `teasers/v2/teasers.json`: runtimes **21.1 / 38.65 / 18.05 s**; covers **10a 18.4-18.55 s, 10b 34.95-36.1 s, 10c 14.6-15.5 s** (each after its last caption has gone). The 10a and 10c sheets need the new verdicts and platform captions from this file.

**Open items:**
- 10c's sound on the Scoreboard pack: BANDS 16 kHz on the committed pack (S3), and B8 at 0.03 on the working tree as it stands (S5). Both are for the Scoreboard refit.
- The margins under 0.5 above, for the ship step's re-measure.
- **The owner's follow-up on 10c's verdict wording** (*Owner decision*): the owner's wording stays until the owner answers.
- Counter-carried stretches, by choice: 10a 6.80-8.13 s and 10c 3.83-5.00 s (masked near-still; the full frame moves). A pulse before every pass would need a second opt-in kit option.
- 10a's ladder tops out at $500K: salaries above it have no row and use the rule (captioned and pinned).
- Carried from the condensed fix pass: the caption karaoke on reading-paced lines (the Scoreboard's shared caption code).
- On promotion these go stale and are outside this pass's files: `teasers/v2/teasers.json`, `publishing/10{a,b,c}-*.{md,json}` and the files under `renders/`.

### Promoted (2026-10-13)

The three cuts of the recut fix pass (10a and 10c the recut with `runup.from`, 10b the condensed cut) were copied from `studio/specs-wip/` over `studio/specs/` (commit 480efc1) and `IN_SPECS` is `{"a": "recut", "b": "cond", "c": "recut"}`: 1002 checks, 0 failures by default, 1016, 0 failures on git-history copies of the round-2 cuts passed with `--spec` (`git show 480efc1^:studio/specs/<id>.json`), and 1059, 0 failures on the git-history real-time condensed 10a and 10c (`git show ca1087f:studio/specs-wip/<id>.json`); the run-up rule accepts the round-2 rows in `BIBLE.md` §2.3 until the sound pass's `tempo-table --write` (`SHIPPED`), and the sound refit and the ship follow (`renders/channel/` keeps the round-2 cuts until then).

### Shipped (2026-10-13): 10a, 10b, 10c

- **Sound (BIBLE v2.5).** The promotion moved the cue records of all 12 condensed cuts and recuts (07a-10c), so BIBLE §11.1 ran for the batch:
  - Both looks were refit on the fresh records: Scoreboard's calibration and Becker Rig's `MODEL` (round 3; §11.2).
  - Both packs gained rules for the payoff of short bodies: Scoreboard the payoff's own range (the DROP lift, with A3's floor read from `acceptance.json`), room and burst at P, and a 2 kHz floor (§4.7); Becker Rig the payoff stack, the P ding with the hit, the landing and a re-measured card (§6.7 items 7-8).
  - The records were stored in `test/fixtures/cues.json` (one line per teaser, so the diff is the batch's 12 lines), `tempo-table --write` rewrote the 12 §2.3 rows, and `npm test` passes 28/28.
  - No spec, cue gain or `acceptance.json` threshold was touched.
  - Every sound margin and failure recorded above for these cuts is cleared at pack level. 10c's BANDS 16 kHz, which failed on the committed Scoreboard pack and passed on the working tree's, is 1.19 dB inside on the shipped (v2.5) pack. The margins under 0.5 left for the ship step pass, A5 at 12.63-12.88 (the encode loop holds PLR at or under 12.95).
  - The rows moved: 10a's P is now its $500,000 pass at 16.256 s (40 beats at 147.638 BPM; it was the $1,000,000 pass at 32.511 s) and 10c's its half-year pass at 13.201 s (33 beats at 149.989; it was 26.403 s). 10b's P stays 33.300 s, and its base is the fix pass's 36.15 s (6 beats at 126.32; it was the round-2 36.60 s). BIBLE §2.1 lists the trains: ticks every 1.000 s in 10a and every 0.832 s in 10b; the recut 10c has none.
  - `checks/10-cost-counter.py`: `SHIPPED = IN_SPECS` after `tempo-table --write`, so the run-up rule now reads the recut's rows from §2.3 (1002 checks, 0 failures; the docstring's 35.75 s for 10b is now 36.15 s).
- **Verify.** `verify --from <build> --strict-cues --video <pictures>` passes all 30 at 42/42, with units at 69/69 and 77/77. The pictures were the reviewed renders of the promoted specs for the batch and `renders/channel/` for the other 18. The masters are byte-identical to the sound designers' final builds, and the batch's exact BANDS margins match their after-tables to 0.005 dB, so nothing regressed. This format's §2.3 rows and measurements:

  | Teaser | §2.3 row (P, BPM, base) | A1 / A2 / A5 | Tightest BANDS octaves (dB inside) | B3 closest cue | B8 logo / payoff (LUFS) |
  |---|---|---|---|---|---|
  | 10a | P 16.256 (riser), 147.638 → 153.58, base 18.60 | −14.08 / −1.30 / 12.78 | 2 kHz 1.00, 125 Hz 1.23 | 4.2 dB | −12.04 / −9.96 |
  | 10b | P 33.3 (riser), 122.523 → 126.32, base 36.15 | −14.08 / −1.20 / 12.88 | 500 Hz 0.95, 125 Hz 1.23 | 4.9 dB | −11.18 / −8.36 |
  | 10c | P 13.201 (riser), 149.989 → 153.26, base 15.55 | −14.09 / −1.46 / 12.63 | 16 kHz 1.19, 500 Hz 1.54 | 4.3 dB | −12.17 / −10.90 |

  Margins in this format (BIBLE §11.2): every BANDS octave of the three is at least 0.95 dB inside its window (10b 500 Hz). 10b's payoff, at −8.36 LUFS, sits 2.82 LU over its logo, the widest gap in the slate.

- **Shipped by §11.5.**
  - The build went to `/tmp`, not into `renders/channel/`. Every mux kept its source's video md5, and the files were then copied into `renders/channel/`.
  - `verify --from <build> --write-baseline` rewrote `test/fixtures/sound-baseline.sha256`.
  - Both packs changed, so all 30 masters differ from the previous (v2.4) baseline. All 30 MP4s in `renders/channel/` changed with them, and the 18 pictures outside the batch are unchanged.
  - The audit of `renders/channel/` used `--out` in `/tmp`, so no sidecar was written into `renders/`. All 30 teasers pass 16/16 symbolic score checks.
  - This format's files:

  | Teaser | Shipped (length, sha256) | Replaces (in git at c4a3014) | Video md5 (kept) | Audit: I / TP / LRA / PLR, score |
  |---|---|---|---|---|
  | 10a | 21.1 s, `0b2867fe…` | 39.0 s, `2d5f3d61…` | `4dfb7f6ecd92…` | −14.08 / −1.31 / 5.15 / 12.78, 16/16 |
  | 10b | 38.667 s, `c6620d92…` | 39.1 s, `7318edc4…` | `077ab11a4c13…` | −14.08 / −1.21 / 5.88 / 12.87, 16/16 |
  | 10c | 18.067 s, `0f85ac87…` | 33.5 s, `a6a16cf1…` | `d0e90a0b2d9c…` | −14.09 / −1.46 / 4.77 / 12.63, 16/16 |

- **Publishing.**
  - `python3 publishing/tools/build_publishing.py <id> --covers`, then `--check`, passes for all three (numbers check: PASS).
  - In the data files, the video facts (`CUT` with `shipped` and `replaces`, the Video bullet and the for-video note) now describe the shipped cut, and the Trial Reels note fetches the pre-condense render from c4a3014.
  - Moments and lengths that only the retired cut had were rewritten or dated, and no claim was added.
  - The checked-maths line records the re-run at the ship: 1002 checks, 0 failed.
  - 10a and 10c: their data files build in two states (`SHIPPED`, set when `studio/specs/` and `renders/channel/` both hold the recut); both now build in the shipped state, with covers from frame 555 (10a, 18.50 s) and frame 450 (10c, 15.00 s) of the shipped files. Their 'Still to do (the ship step)' notes are now 'Done on ship', `CUT` carries `shipped` and `replaces`, and the cover how-to no longer waits on the ship step. The owners' open questions stay open: 10a on fiscal 2026 numbers, 10c's verdict wording.
  - 10b: frame 1065 (35.50 s) is still inside the end hold of the shipped file (from frame 1050 to the end card at frame 1085), so the cover frame is kept and both JPGs were re-exported from the shipped file.
- **Elsewhere.** `teasers/v2/teasers.json`: runtimes 21.1 / 38.667 / 18.067 s (frame-exact). Its key-number times now name the recut or condensed cut, with the retired cut's in brackets, and its check note records the re-run at the ship. `renders/channel/README.md` (the length table), `HANDOFF-finance-channel.md` and the BIBLE v2.5 status line name the ship. The 10a and 10c key numbers now describe the recuts (the $500,000 and half-year stops, their verdicts and finals), with the retired cuts' rows marked.
