# 03 · What difference does X make? Three teasers

**Format:** `what-difference` (rank 3 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P5**)
**Date:** 2026-10-07 (revision 2, after the verifier and hook-judge reviews), plus the 2026-10-08 hook pass on 03b, the 2026-10-08 assembly pass on all three, the 2026-10-08 fixer pass after the round-2 QA, the 2026-10-08 port (the owner kept Scoreboard and Becker Rig and retired Live Sheet and Clean Sheet, so 03a moved to Becker Rig and 03b to Scoreboard), and the 2026-10-08 fixer pass after the port QA (see "Review log" at the end)
**Specs:**
- [`studio/specs/03a-becker-rig-car-loan-weekly.json`](../../studio/specs/03a-becker-rig-car-loan-weekly.json) (the condensed cut since 2026-10-13; the round-2 cut was 37.2 s; ported from Live Sheet, the old spec is `studio/specs/retired/03a-live-sheet-car-loan-weekly.json`)
- [`studio/specs/03b-scoreboard-card-minimum.json`](../../studio/specs/03b-scoreboard-card-minimum.json) (the condensed cut since 2026-10-13; the round-2 cut was 30.6 s; ported from Clean Sheet, the old spec is `studio/specs/retired/03b-clean-sheet-card-minimum.json`)
- [`studio/specs/03c-scoreboard-mortgage-extra-100.json`](../../studio/specs/03c-scoreboard-mortgage-extra-100.json) (the condensed cut since 2026-10-13; the round-2 cut was 29.8 s)

**Condensed cut (2026-10-13), promoted 2026-10-13 (not yet shipped).** The owner's note on the set ("Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good.") is applied to all three, on the 06b/06c precedent. The condensed specs were written in `studio/specs-wip/` and promoted over the round-2 cuts in `studio/specs/` on 2026-10-13 (the round-2 specs are in git history, `4fb0b00^` and earlier); `renders/channel/` keeps the round-2 renders until the ship step. The beat sheets and caption tables below describe the condensed cuts; the round-2 beat sheets and guide VO scripts are in git history (HEAD 3db6d30), and the Review log ("Condensed cut (2026-10-13)" and "Fixer pass (2026-10-13, condensed-cut QA)") lists every change.
- [`studio/specs/03a-becker-rig-car-loan-weekly.json`](../../studio/specs/03a-becker-rig-car-loan-weekly.json): 14.8 s body + the 2.5 s end card = 17.3 s (was 37.2 + 2.5 = 39.7 s; the editor's condensed cut was 15.25 + 2.5 = 17.75 s, retimed by the fixer pass)
- [`studio/specs/03b-scoreboard-card-minimum.json`](../../studio/specs/03b-scoreboard-card-minimum.json): 11.65 + 2.5 = 14.15 s (was 30.6 + 2.5 = 33.1 s)
- [`studio/specs/03c-scoreboard-mortgage-extra-100.json`](../../studio/specs/03c-scoreboard-mortgage-extra-100.json): 12.85 + 2.5 = 15.35 s (was 29.8 + 2.5 = 32.3 s)

**Maths check:** [`checks/03-what-difference.py`](checks/03-what-difference.py). It rebuilds all three loans payment by payment from the sourced inputs, then checks every display string in the three specs against the computed, formatted value, and every number in every VO line too. It also checks:
- each shown delta equals the difference of the shown totals, and "≈"/"about" appear exactly on rounded numbers;
- the contract shape, R1 (a number in the header, and the baseline option's results already on screen at frame 1), R2, R8 and R10;
- the timing: VO at 2.6 spoken words/s, no overlaps, each later option lands within 0.9 s of the word that names it (landing = `resultT` where the kit reads one), every `lookOpts` step (lever, footer steps) sits on a beat, footer steps start after t = 0 and stay within the kit's 45-character limit;
- the assembly-pass beats: every `lookOpts.reads` entry (03a, 03b, 03c) and every 03c `deltaT` sits within 0.25 s of the VO word that speaks its number, marks a value already on screen, and that word speaks the marked value (or, for 03a's "$1,800 less", the shown difference the marked cell makes);
- the fixer-pass beats: 03a's bar steps ("≈ $1,100", "≈ $35", "≈ $1,800") are typed by the word that speaks them (and no more than 0.8 s early) and each "a − b ≈ c" step has c = the shown a − b; 03a's pair read marks two equal "≈ $8,900" cells as the VO speaks the exact $35 gap they hide; the 03a scan sits on "Guess" over the three still-empty columns, and the lever's columns are the two 13-payment ones; 03b's ② values and ③'s payoff land on the words that speak them, its "$0 more" working is marked on "dollar", and its winner delta lands on "ten" with the winner beat; 03c's label steps ("40 months sooner", "≈ 11 years sooner") slam within 0.25 s of their words, after their race and before their delta;
- no spec-level `sfx` (each kit cues its own landings);
- the port beats (2026-10-08):
  - 03a (Becker Rig): each lane wakes on the word that names it (`option.t`) and its crate lands on the word that speaks its payoff (`option.resultT`, within 0.25 s); the round-up value's count-down settles on "$1,800" and drops by exactly the shown $1,800; each working-slot line is on screen by its word and no more than 0.8 s early, and holds at least 2 s; the footer is one line;
  - 03b (Scoreboard): each hard cut on the word that names the option; each race lands on its payoff's word at the shared speed (`keepSpeed`); the hero holds ≈ 15.1 years at frame 1 and bumps on "fifteen"; the row-cell reads on "$7,300" and "$3,100"; the label steps (the shrink note at frame 1, "More than the $5,000 owed" on "More", "$0 more than the first minimum" on "dollar");
- the port-QA fixer beats (2026-10-08):
  - 03a: the slot step "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" is on screen by "year" (no more than 0.8 s early); its a and b are the two crates on screen (Monthly's 72, the winner's bare 60), a − b = c exactly, the "≈" is there because 60 is rounded (exact 11.93), and 12 months = its ≈ 1 year; the strip label `gapLabel` "≈ 12 mo" is the same ≈ 12 in the crate metric's unit; the read on "twelve" marks Monthly's crate (the 12-payments-a-year lane, outside the lever) and the read on "year" the winner's crate (shown 72 − 60 = 12); the lever's second beat on "thirteen"; the waiting figures' pat on "this" ("this loan"), done before the scan;
  - 03b: no option carries a delta (the verdict alone says "≈ 10 years sooner"; no "13 years" anywhere on screen, ③'s ≈ 13 is a write-up claim); `heroEnd: "value"`: the hero lands ②'s own ≈ 4.8 on "ten" (`data.winnerT`), rolled from ①'s ≈ 15.1 after the verdict, and the shown 15.1 − 4.8 rounds to the verdict's ≈ 10; the frame-1 label step is one size down;
- the sensitivity claims in this file.

Since the condensed cut (2026-10-13) the check is cut-aware: `--spec [KEY=]PATH` checks a spec in place of `studio/specs/<id>.json`, and each spec is held to the round-2 rules above or, by its length, to the condensed cut's (captions paced for reading, every beat inside the caption that carries its number, the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s, and a proxy for the motion audit; see "Condensed cut (2026-10-13)" in the Review log). Since the promotion (2026-10-13): **565 checks, 0 failures** by default (the condensed cuts in `studio/specs/`) and **528, 0 failures** with `--spec` on git-history copies of the round-2 cuts. Before it: **528 checks, 0 failures** by default (the round-2 cuts in `studio/specs/`); **565 checks, 0 failures** with `--spec` on the three WIP specs (551 before the fixer pass); 14 of 14 condensed-cut mutations caught, then 25 of 25 in the fixer pass. `--spec` takes KEY as a, 03a or the full id.

Result before the condensed cut: **525 checks, 0 failures, exit 0** (after the 2026-10-08 port-QA fixer pass; 509 after the port, 480 after the fixer pass, 439 after the assembly pass, 388 after the 03b hook pass). Mutation tests:
- Revision 2: one interest cell changed (03c "≈ $508,600" → "≈ $508,700"), one "about" removed (03b "About $7 more" → "$7 more") and the 03a lever moved off its beat (18.0 → 18.3 s) gave 4 failures and exit 1, as they should; the restored specs pass again.
- Hook pass, on scratch copies of the new 03b spec: note "$99.66" → "$99.67", verdict "≈ 10" → "≈ 11", ②'s landing moved off "keep" (10.6 → 11.6 s), and one "about" removed ("About 4.8 years" → "4.8 years"). That gave 4 of 4 failures and exit 1.
- Assembly pass: 03a's "$10,000" read moved off its word (5.8 → 6.3 s), 03b's "4.8" read pointed at the wrong cell (payoff → interest) and 03c's "$78,600" slam moved back to 9.45 s. That gave 3 of 3 failures and exit 1; the specs were restored byte for byte and pass again.
- Fixer pass, on scratch copies of the specs: 03a's first bar step moved late (9.7 → 10.6 s), 03a's last step said "≈ $1,700", 03b's winner delta moved off "ten" (27.1 → 27.6 s) and 03c's first label step said "41 months sooner". All 4 were caught (9 failing rows, exit 1).
- Port, on scratch copies of the new specs: 03a's Biweekly crate landing moved late (9.0 → 9.6 s), 03a's footer put back to the two-line Live Sheet text, 03a's new slot step said "$12.64", 03b's shrink note said "$99.67", 03b's `winnerT` moved off "ten" (27.1 → 27.6 s), 03b's `keepSpeed` dropped, and 03b's "$3,100" read moved off its word (18.0 → 18.5 s). All 7 were caught (10 failing rows, exit 1); the restored specs pass.
- Port-QA fixer pass, on scratch copies of the specs (the check pointed at a scratch folder): 03a's new step said "≈ 11 months", its "year" read moved late (34.2 → 34.8 s), its `gapLabel` said "≈ 13 mo", its lever beat moved off "thirteen" (19.6 → 20.4 s) and its pat moved onto the scan (1.4 → 2.2 s); 03b got ③'s delta back, its `winnerT` moved off "ten" (27.1 → 27.6 s) and its `heroEnd` was dropped. All 8 were caught (16 failing rows, exit 1).
**Studio linter:** `node src/cli.mjs check specs/03*.json` gives **3/3 clean, 0 errors, 0 warnings**, at the default step and at every frame (`--every 0.0333333`, 1/30 s), against the Becker Rig (03a) and Scoreboard (03b, 03c) what-difference modules. The kits' own what-difference samples are clean too, at every frame (Becker Rig 3, Scoreboard 2; two Becker samples had one-frame contrast faults at 6.60 and 16.17 s before the port-QA pass, now fixed). The port-QA pass changes two things every spec of the format sees: Becker Rig's winner plate and celebration, and Scoreboard's race label side (03c's labels now wait at the track's start instead of riding outside and jumping in; 03c was re-rendered). Everything else it adds is opt-in. Stills and 12-frame contact sheets were inspected for every port beat, because the linter does not catch every render bug (it missed "[object Object]" in round 1). (Before the port, 03a was linted against the Live Sheet module and 03b against the Clean Sheet module committed in 7445bcc; see the Review log.)
**Web searches used:** round 1 used 13 of 14; the verifier used 11 more; revision 2 used 1 search and 2 page fetches (both fetches blocked by the egress proxy). The egress proxy blocks every primary page (Edmunds, the Fed, Freddie Mac, Auto Remarketing, Experian), so each figure below rests on search-result text for the named page, cross-checked by the verifier's own searches. Re-open the primary pages before publishing (see "Open items").

---

## (a) The format in 5 lines

1. **What it is.** Hold one real debt fixed and pay it 2-4 ways. Every way gets the same two outputs, a payoff time and the total interest. The question with the options named goes on screen, and the verdict goes in the caption.
2. **Breakouts (all @thedebtfreedomproject, TikTok, median 1.3K-6K views):**
   - "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" / caption "Look what a difference rounding makes!": **1,900,000 views, 902.5x**, the largest multiple in the benchmark. https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
   - "What's the difference between daily payments and one extra lump sum payment each month?" / "Yes, daily payments work!": **382,100, 289.1x**, on a $2.98 answer. https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
   - "How much difference does an extra $100 per month make on a car loan payoff?": **290,700, 127.3x**. https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
3. **Loan maths works under a minute too.** FinCalC TV's "Home Loan Part payment Reduce Tenure NOT EMI" got **578,461** in 59 s (https://www.youtube.com/shorts/7CFEV6D3QNM). The Market Hustle's red-worst-case vs cyan-relief columns, "How Long It Took To Recover After the Worst Crashes:", got **190,187 (4.5x med)** in 73 s (https://www.instagram.com/reel/DduW3hgShyh/).
4. **What kills it.** A topic label instead of a question: the same creator's "Credit Card Debt Payoff Strategies" got **90,600 (52.5x)**, her lowest (https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534). A neutral "X vs Y, which is better?" also fails: FinCalC's bucket has a median of 13,322 (n = 8). The other thing that kills it is length. Her first new number lands 30-45% of the way into 3-6 minutes. Ours: the baseline's full answer is on screen at 0.0 s, the lever the hook asks about lands at 22-34% of the runtime, and each teaser runs 30-37 s.
5. **What we add.** One line of envelope working per option, left visible as proof (her Excel formula bar, made readable). The lever is sized honestly ("biweekly = 13 payments, not 12"; "$142.59 − $142.59 = $0 more"). The headline is rounded with "≈", and the exact payments stay in the working. The verdict stays even when the answer is small ($2.98 broke out).

**Hook grammar we steal (P5).** On screen: "What difference do [A and B] really make on [one debt]?", "[A] vs [B] on [one debt]: what difference does it make?" or "How much difference does [just $X extra a month] make on [one debt]?" In the caption: a verdict that names the winning lever. We avoid topic labels and "which is better?".

---

## (b) The three teasers at a glance

| | 03a | 03b | 03c |
|---|---|---|---|
| Look | Becker Rig (ported from Live Sheet) | Scoreboard (ported from Clean Sheet) | Scoreboard |
| Debt | $44,000 car loan, 7%, 72 months | $5,000 card balance, 22% APR | $400,000 mortgage, 7.3%, 30 years |
| Options | Monthly · Biweekly · Weekly · Round up (to $200 a week) | The card minimum · Keep paying the first minimum ($142.59) · a flat $250 | Just the payment · +$100 a month · +$500 a month |
| On-screen hook (t = 0) | What difference do weekly and / biweekly payments really make / on a **$44,000** car loan? | What difference does / paying the SAME minimum / every month make on **$5,000**? | HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE? |
| Words in hook | 14 | 12 | 14 |
| Numbers on screen at 0.0 s | $44,000 (header) · working slot "New-car loan · 7% APR · 72 months" · the four payments under the lane names · Monthly lane already run: its crate at its flag reading 72 (months to pay off), ≈ $10,000 in red, its coin pile full | $5,000 (header) · red hero "PAID OFF IN ≈ 15.1 YEARS" · footer "22% APR · minimum = 1% + interest, $40 floor" · row "THE CARD MINIMUM ≈ $7,300" over a full red bar "≈ 15.1 YEARS" · label stack "starts at $142.59, then shrinks" / "$142.59 → $99.66 BY YEAR 3" (red) | $100 · hero counter ≈ $587,200 of interest in red · lane 1 "30 YEARS" · footer "$400,000 at 7.3%" · label stack "$2,742.29 a month" |
| The lever lands | lanes wake on their names (8.0, 13.0, 23.0 s); crates land on their numbers: ≈ 65 (9.0 s), ≈ 65 (14.0 s), ≈ 60 (27.2 s, after a strain on "round up"); the 13-payments lever at 18.0 s, nodded again on "thirteen" (19.6 s) | 9.6 s cut ("$142.59 − $142.59 = $0 more"); "$0 more than the first minimum" on "dollar" (13.0 s); the race lands on "4.8" (16.0 s); at the winner beat the hero rolls ≈ 15.1 → ≈ 4.8 YEARS again and lands on "ten" (27.1 s) | 6.4 s cut, 8.9 s landing, 9.4 s "40 MONTHS SOONER", 10.6 s delta (on the spoken "$78,600") |
| The screen answers the VO (reads) | 1.4 s pat (the waiting figures pat their crates on "this loan"); 2.4 s scan (they hop on "Guess which one"); 4.2 s, 5.8 s (Monthly's crate and value); 16.2 s (both ≈ $8,900 values, "$35"); 18.0 s and 19.6 s (the lever's two lanes, "13"); 22.0 s (Monthly's crate, "not 12"); 34.2 s (the gold ≈ 60 crate, its strip and banner, "year") | 2.4 s (the hero, "fifteen"), 5.0 s (≈ $7,300 in row 1), 7.8 s ("More than the $5,000 owed" slams on "More"), 13.0 s ("$0 more than the first minimum" on "dollar"), 18.0 s (≈ $3,100 in row 2) | 1.2 s (the hero) |
| Differences on screen | slot steps "≈ $1,100 less interest" (10.2 s), "≈ $35 less interest than biweekly" (16.0 s), "≈ $1,800 less interest" (28.2 s), with ≈ $8,200 counting down from ≈ $10,000 into it, and "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" (33.9 s); the green time-saved strip on each lane's floor, the winner's labelled "≈ 12 mo" on a banner from its flag (31.45 s) | the hero's roll from ①'s ≈ 15.1 down to ②'s ≈ 4.8 (26.1-27.1 s) under the verdict's "≈ 10 years sooner" (no option delta) | "40 MONTHS SOONER", "≈ $78,600 LESS", "≈ 11 YEARS SOONER", "≈ $245,000 LESS" |
| Verdict (screen) | Round up to **$200** a week: **≈ 1 year** sooner (the gold plate on ≈ $8,200, the "≈ 12 mo" banner) | Same payment, **$0** more: **≈ 10 years** sooner (the hero holds "PAID OFF IN ≈ 4.8 YEARS", green) | +$100 a month: each $1 saves **≈ $2.46** (the hero holds "≈ $78,600 LESS") |
| Runtime (body, before the 2.5 s end card) | 37.2 s round-2 cut; **14.8 s condensed** | 30.6 s; **11.65 s condensed** | 29.8 s; **12.85 s condensed** |
| Benchmark hook it copies most closely | H48, 1.9M, 902.5x | H31's "NOT EMI" mechanic + H48 frame + H84's one-word cue | H50, 290.7K, 127.3x |

The times in the rows above are the round-2 cut's (what `studio/specs/` held until the condensed cut's promotion on 2026-10-13). The condensed cut keeps every number, string and beat role in this table and only moves the clock (plus the three small changes listed per teaser below); its times are in each beat sheet.

**Winner convention.** `winner` is the option the verdict names, not always the biggest number. In 03b the flat $250 is faster than keeping the first minimum, but the verdict answers the $0 lever the hook asks about. The $250 row is the "biggest number last" bonus, toned `good` rather than `goal`.

**Frame-1 convention.** In all three, the baseline option is already worked out at frame 1 (R1 "the full answer", R10 "shock first"), and the later options sit named but empty (R9). Each kit expresses that differently:
- Becker Rig (03a): `option.t ≤ 0` means "already run": the crate stands at its flag with its payoff on its face, the money value is in and the coin pile is full. For the later lanes `option.t` is when the lane wakes and `option.resultT` when its crate lands.
- Scoreboard (03b, 03c): `option.resultT 0.0` on the first option makes its race land at frame 1, so the hero shows ≈ 15.1 years (03b) or ≈ $587,200 (03c) at 0.0 s instead of rolling through unverified intermediate values.
- (Retired with the port: Live Sheet's pre-filled `t ≤ 0` column, and Clean Sheet's negative `t` / `resultT` with the note typing from `noteT −0.15`.)

---

## 03a · Becker Rig · Weekly and biweekly vs monthly on a $44,000 car loan

**Spec:** `studio/specs/03a-becker-rig-car-loan-weekly.json` · the condensed cut since its promotion on 2026-10-13 (below); the round-2 cut it replaced (37.2 s, captions on) is in git history (`4fb0b00^`) and is the one `renders/channel/` ships until the ship step
**Condensed cut (2026-10-13, fixer pass; promoted 2026-10-13):** `studio/specs/03a-becker-rig-car-loan-weekly.json` (written as `studio/specs-wip/03a-becker-rig-car-loan-weekly.json`) · 14.8 s + the 2.5 s end card = 17.3 s. The beat sheet and captions below are the condensed cut's; the times quoted in "Why this hook" are the round-2 cut's, which are also in the Review log ("Condensed cut (2026-10-13)").

*Ported to Becker Rig on 2026-10-08 (it was built in Live Sheet, now retired; the old spec is in `studio/specs/retired/`). The hook, the VO, every number and the verdict are unchanged. What changed is how the screen carries them: the debt is a crate the stick figure drives down a time lane, so each payoff is a distance. See "Port to Becker Rig (2026-10-08): 03a" in the Review log.*
**Platform title:** What Difference Do Weekly Car Payments Really Make on $44,000?
**On-screen hook (header):** What difference do weekly and / biweekly payments really make / on a **$44,000** car loan?

### Why this hook

**Modelled on:**
1. **H48, The Debt Freedom Project:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" with the caption "Look what a difference rounding makes!". **1,900,000 views, 902.5x.** We keep her grammar and her four scenarios (monthly, biweekly, weekly, weekly rounded up). We swap "paying off a car loan" for the stake, so a number sits in the hook. Weekly is named first because it is the bigger-sounding hack; monthly is the filled baseline column, so it needs no slot in the question.
2. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make" (**3,000,000, 140x**). One word ("ACTUALLY", here "really") implies the viewer's current belief is off (R5).
3. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461.** The verdict names the real lever and denies the expected one.

**Rules satisfied:**
- **R1:** $44,000 is in the header, the working slot reads "New-car loan · 7% APR · 72 months", and the Monthly lane has already run at 0.0 s: its crate stands at its flag reading 72 (under "Months to pay off") and ≈ $10,000 sits in red under "Interest" (confirmed in the render).
- **R2:** the hook has one dollar figure, the input, and no result.
- **R3 (partial):** $44,000 ≈ the average new-car loan (Edmunds Q3 2026: $44,664). It is not the viewer's own loan; the pinned comment asks for theirs, which is the sequel engine of her 290.7K reply video.
- **R4:** the input is the size of a loan car buyers have actually signed.
- **R5:** "really" casts doubt on the popular hack, and the first spoken line promises "about a year off" without saying which column earns it.
- **R6:** the stake is the amount plus 72 months; "your" goes in the caption and the pinned comment.
- **R7:** weekly and biweekly are named; the Monthly baseline and the "Round up" lane are on screen from frame 1, each name over its payment.
- **R8:** 14 words.
- **R9:** 4 lanes, 3 of them waiting at 0.0 s ("?" crates on the start line, empty money sockets).
- **R10:** values on screen at 0.0 s; the first comparison lands at 9.0 s (the Biweekly crate on "sixty-five"), after a 3.6 s promise line (on "this loan" the three waiting figures pat their crates, on "Guess which one" they hop in turn) and the baseline read-out (Monthly's crate and its ≈ $10,000 bump as they are spoken).
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "Weekly barely beats biweekly. Rounding up is the real trick!"

**The wrong belief it plays on:** "Weekly payments must beat biweekly by a lot. The schedule is the trick." In fact biweekly and weekly each add up to exactly **13 monthly payments a year** ($9,752.08 = 13 × $750.16), so weekly beats biweekly by only **$35.49**. The date moves when you pay more: rounding $187.54 up to $200 (+$12.46 a week) takes ≈ 1 year off. That is the myth bust Debt Freedom shows at 3:21 but never explains.

### Beat sheet (condensed cut, 2026-10-13)

Becker Rig timing (`looks/becker-rig/formats/what-difference.js`): each option is a lane with a floor line, a stick figure behind a red crate on the start line, the name over its payment at the left, and the money value under the INTEREST head at the right. The lane is a time axis shared by all four: a crate travels as far as its option takes to pay off, so the longest payoff (72 months) reaches the far side, a flag drops where the debt is gone and the floor from that flag to the far side turns green (the time saved). `option.t` is when the lane **wakes** (on the word that names it); `option.resultT` is when its crate **lands** (on the word that speaks its payoff), and the money value lands 0.45 s later. Every run moves at one shared speed (1.8 s for 72 months) unless the lead-in is shorter. The working slot under the footer shows one line at a time, popped in whole: the stake line, then each option's working from its wake (Monthly's from its first read), each `lookOpts.steps` line and the lever. `lookOpts.pat` has the waiting figures pat their crates, `scan` hops them, `reads` bump a crate or a value and turn its figure green, `lever.options` bands two lanes' values and nods their figures (again at each `lever.beats` time), `countCell` counts Round up's interest down from ≈ $10,000, and `gapLabel` puts the time the winner saved on a banner his pennant unfurls into. Figures are slate while they wait, green on their turn.

**Condensed cut timing (fixer pass).** `lookOpts.race` is 1.2 (72 months in 1.2 s, so Biweekly's and Weekly's crates run 1.08 s and Round up's 1.0 s). Every lane wakes as the caption that names it goes up, leans in for 0.42 s and runs at that one speed: no lane waits and none strains. Each money value drops 0.45 s after its crate (the kit default). The Becker figures are small in the col layout (0.51, 151 px lanes), so a single figure's hop, a crate read or a value read registers on the frame-difference audit as near-still (YAVG 0.1-0.24). The cut therefore puts a slot pop, a lane wake, a run, a lever beat or two figures moving at once at least every 0.4 s: the scan is a ripple (two figures in the air at once), Monthly's working pops with its ≈ $10,000 read, the $1,800 working pops inside the count-down, and a compare read follows it. The verdict lands 0.8 s after the counted ≈ $8,200 settles and holds 1.6 s; then the end card.

| t (s) | On screen | Caption (on-screen text, no narration) |
|---|---|---|
| 0.0 | **Frame 1, the thumbnail:** the header (the hook), the footer "Daily interest, posted when paid", the slot "New-car loan · **7%** APR · **72** months", the heads, the four lanes, each name over its payment (Monthly $750.16 · Biweekly $375.08 · Weekly $187.54 · Round up $200). Monthly has already run: its crate at its flag reading 72, **≈ $10,000** in red, its coin pile full. Three slate figures wait at "?" crates. The hook caption is complete (it is pre-typed) | "About a year off this loan. Guess which one." (−0.5 to 1.2 s, up 1.2 s: its floor) |
| 0.03-1.25 | **The scan ripple from frame 2:** Biweekly, Weekly and Round up hop in turn, then Biweekly again (`scan.options [1, 2, 3, 1]`, 0.26 s apart: 0.03, 0.29, 0.55, 0.81), green for the hop, each "?" popping (tick). From 0.29 s to about 1.0 s two figures are in the air at once; the last lands at 1.25 as Monthly's caption goes up | (same) |
| 1.25 | Read: Monthly's 72 crate pulses and his figure turns green | "Monthly: 72 months, about $10,000 in interest." (1.25-2.45) |
| 1.95 | The slot pops "= $750.16 × 72 − $44,000 ≈ $10,000" (the stake line was up 0-1.95 s) with a read of **≈ $10,000** (12% bump, red flash), late in the caption so it carries into Biweekly's wake | (same) |
| 2.5 | Biweekly wakes (name to ink, figure green, a step) and leans in; 2.95: slot "= $375.08 × 26 / = $9,752.08 a year" (Monthly's working has been up 1.0 s). He drives the crate 2.92-4.0 s (swipe, roll, coins flying) and it slams in at **≈ 65** (4.0, thud). **≈ $8,900** drops in green at 4.45 (pop); a fist. 4.5: slot "= $10,000 − $8,900 / ≈ $1,100 less interest" | "Biweekly: about 65 months, about $1,100 less." (2.5-4.8) |
| 4.85 | Weekly wakes, runs 5.27-6.35 and lands at **≈ 65** beside Biweekly's; 5.7: slot "= $187.54 × 52 / = $9,752.08 a year" (the $1,100 step has been up 1.2 s). **≈ $8,900** drops in ink at 6.8 and the slot shows "≈ $35 less interest / than biweekly"; he shrugs. 7.05: pair read, both ≈ $8,900 values bump and flash together and both figures turn green | "Weekly: about 65 months too. Only about $35 better." (4.85-7.75) |
| 7.8 | Lever: slot "= 13 × $750.16 = $9,752.08: / 13 payments, not 12"; the Biweekly and Weekly values get the pale green band and bump, their crates pulse, their figures nod (swipe). Lever beats at 8.4 and 8.9: both lanes bump and nod again. 9.3: read of Monthly's 72 crate, the lane that pays 12 a year | "Both add up to 13 monthly payments a year, not 12." (7.8-9.6) |
| 9.65 | Round up wakes; slot "= $187.54 + $12.46 = $200 a week". He leans in and drives the crate 10.15-11.15 s | "Now round each weekly payment up to $200." (9.65-11.1) |
| 11.15 | The crate lands at **≈ 60**, the nearest flag of the four. **≈ $8,200** counts down from ≈ $10,000 over 11.6-12.4 s and settles from 110%. 12.05, inside the count's last 0.4 s: slot "= $10,000 − $8,200 / ≈ $1,800 less interest" (for 0.35 s the running count, about "$8,3xx" in green without the "≈", shows under it). 12.6: compare read: Monthly's ≈ $10,000 and Round up's ≈ $8,200 bump and flash together and both figures turn green | "About 60 months. About $1,800 less." (11.15-13.15) |
| 13.2 | **Verdict** in the caption band: "Round up to **$200** a week: / **≈ 1 year** sooner". Winner beat: the gold plate opens behind ≈ $8,200, impact (shake, flash, punch, hit + cash, rays), his crate and pennant turn gold, he jumps and lands in a V; the others slump. The slot shows "= $187.54 + $12.46 = $200 a week" again (the verdict card hides the last caption's "about $12 more a week"). 13.65: his pennant unfurls into the "**≈ 12 mo**" banner. 14.1: slot "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" (its "about a year sooner"). 14.25: read of the gold ≈ 60 crate (pulse, strip, banner, a hop). He keeps waving | (the verdict card takes the caption band; "About $12 more a week. About a year sooner." is the verdict's own line, carried by the two slot lines) |
| 14.8-17.3 | The 2.5 s end card (unchanged) | |

### Captions (on-screen text, no narration; 66 words, 57 shown)

Every caption is the round-2 VO line word for word, paced for reading: each is up at least max(1.2 s, 0.12 s a word), and they run back to back (0.05 s apart).

| # | Caption | Up (s) | Words | Up for |
|---|---|---|---|---|
| 0 | About a year off this loan. Guess which one. | −0.5 → 1.2 (complete on frame 1) | 9 | 1.2 s |
| 1 | Monthly: 72 months, about $10,000 in interest. | 1.25 → 2.45 | 7 | 1.2 s |
| 2 | Biweekly: about 65 months, about $1,100 less. | 2.5 → 4.8 | 7 | 2.3 s |
| 3 | Weekly: about 65 months too. Only about $35 better. | 4.85 → 7.75 | 9 | 2.9 s |
| 4 | Both add up to 13 monthly payments a year, not 12. | 7.8 → 9.6 | 11 | 1.8 s |
| 5 | Now round each weekly payment up to $200. | 9.65 → 11.1 | 8 | 1.45 s |
| 6 | About 60 months. About $1,800 less. | 11.15 → 13.15 | 6 | 2.0 s |
| 7 | About $12 more a week. About a year sooner. | 13.2 (the verdict's line: the verdict card shows instead, and the slot carries "$187.54 + $12.46 = $200 a week" and "≈ 1 year sooner") | 9 | — |

The working slot holds one line at a time: the stake line (0-1.95), Monthly's working (1.95-2.95), Biweekly's (2.95-4.5), the $1,100 step (4.5-5.7), Weekly's working (5.7-6.8), the $35 step (6.8-7.8), the lever (7.8-9.65), Round up's working (9.65-12.05), the $1,800 step (12.05-13.2), Round up's working again (13.2-14.1) and the year step (14.1 to the card). Every line before the verdict holds at least 1.0 s; the two lines of the verdict hold 0.9 s and 0.7 s. `formulas[0]`, `formulas[1]` and `formulas[2]` carry their own `t`, and the round-2 `steps[3]` (the repeat of Round up's working) is back, at the verdict.

### The maths

Model: simple interest charged daily (APR ÷ 365 per day), rounded to the cent each period. Each payment is applied the day it is paid. A month is 365/12 days, so a monthly period charges exactly 7%/12. The schedule runs payment by payment until the balance is $0, and the last payment is whatever is left.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $44,000, 7% APR, 72 months | Inputs (sources below) | |
| $750.16 a month | 44,000 × (0.07/12) ÷ (1 − (1 + 0.07/12)^−72) = 750.156… | $750.16 |
| 72 (months to pay off), ≈ $10,000 | Monthly schedule: 72 payments; interest $10,011.20. Working shortcut 750.16 × 72 − 44,000 = $10,011.52 | ≈ $10,000 |
| $375.08 (Biweekly header) | 750.16 ÷ 2 | $375.08 |
| ≈ 65, ≈ $8,900; VO "about $1,100 less"; bar step "= $10,000 − $8,900 ≈ $1,100 less interest" | 142 payments × 14 days = 1,988 days ÷ (365/12) = 65.36 months; interest $8,916.74; 10,011.20 − 8,916.74 = $1,094.46; shown 10,000 − 8,900 = 1,100 | ≈ 65 · ≈ $8,900 · ≈ $1,100 |
| $187.54 (Weekly header) | 750.16 ÷ 4 = 187.54 | $187.54 |
| ≈ 65, ≈ $8,900 | 282 × 7 = 1,974 days = 64.90 months; interest $8,881.25 (saves $1,129.95) | ≈ 65 · ≈ $8,900 |
| VO "only about $35 better"; bar step "≈ $35 less interest than biweekly" (the two equal ≈ $8,900 cells hide it) | 8,916.74 − 8,881.25 = $35.49 | ≈ $35 |
| $9,752.08 a year (×2), 13 × $750.16 (lever) | 375.08 × 26 = 187.54 × 52 = 13 × 750.16 = 9,752.08 | exact |
| $200 a week: $187.54 + $12.46 | 200 − 187.54 = 12.46 (VO "about $12 more a week") | exact |
| $200 (Round up header) | the weekly payment rounded up | exact |
| ≈ 60, ≈ $8,200; VO and bar step "≈ $1,800 less" | 261 × 7 = 1,827 days = 60.07 months; interest $8,184.40; saves $1,826.80; shown 10,000 − 8,200 = 1,800 | ≈ 60 · ≈ $8,200 · ≈ $1,800 |
| ≈ 1 year sooner (VO line 1, VO line 8, verdict) | (72 − 60.07) ÷ 12 = 0.99 | ≈ 1 |
| Rounding up in monthly terms (write-up only) | (200 × 52 − 9,752.08) ÷ 12 = 53.99 | ≈ $54 more a month |
| Shown-difference consistency | VO and bar $1,100 = shown 10,000 − 8,900; VO and bar $1,800 = shown 10,000 − 8,200 | matches |

**Sensitivity (write-up only; the rates are what-ifs, not sourced):**

| Case | Payment | Monthly | Biweekly | Weekly | Rounded up to $200 | Weekly beats biweekly by | Rounding: years sooner |
|---|---|---|---|---|---|---|---|
| $44,000 at 6% | $729.21 | 72 mo, ≈ $8,500 | 65.36 mo, ≈ $7,600 | 65.13 mo, ≈ $7,600 | 58.45 mo, ≈ $6,800 | $29.39 | 1.13 |
| $44,000 at 8% | $771.46 | 73 mo (a small last payment), ≈ $11,500 | 64.90 mo, ≈ $10,200 | 64.90 mo, ≈ $10,200 | 61.91 mo, ≈ $9,700 | $41.89 | 0.92 |
| $44,664 at 7% (Edmunds' exact average) | $761.48 | 72 mo, ≈ $10,200 | 65.36 mo, ≈ $9,100 | 64.90 mo, ≈ $9,000 | 61.22 mo, ≈ $8,500 | $35.91 | 0.90 |

In every case weekly beats biweekly by under $50 and rounding up takes about a year off, so the verdict holds.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| New-car loan size | $44,000: a round loan just under both 2026 quarterly averages. It is **not** their rounding ($44,664 rounds to $45,000), so the screen says "New-car loan", not "Avg", and the caption says "≈ the average" | **Edmunds**, Q3 2026 new-vehicle finance data, reported by Auto Remarketing, "Edmunds spots 6 new records as average amounts financed, payments & terms keep growing in Q3" (Oct 2026): avg amount financed **$44,664**, avg APR **7.0%**, avg payment **$787**, avg term "past 70 months", 84-month-plus loans **25.5%**. https://www.autoremarketing.com/?p=131431 · also Briefglance, https://briefglance.com/companies/edmunds-com-inc/pulses/84146 (confirmed again by the verifier's searches) | **Edmunds**, Q2 2026: **$44,156** at **7.0%** (AP via Santa Maria Times, https://santamariatimes.com/ap/business/nearly-1-in-4-new-vehicle-buyers-in-q2-stretched-loans-to-84-months-or/article_5832a407-bcfa-54a3-9664-dc9063d99ef4.html; confirmed by the verifier) |
| APR | 7% | Edmunds Q3 2026: 7.0% (above) | Edmunds Q2 2026: 7.0% (above) |
| Term | 72 months | Edmunds Q3 2026: average term "past 70 months"; 25.5% of new loans run 84 months or more, so 72 is a standard term just above the average | (none: round 1's Experian figures were dropped, see the Review log) |
| Daily simple interest on car loans; biweekly mechanics | Model assumption | Debt Freedom's own sheet uses `=(0.0424/365)*B10*D10` (watch study, section 3.4) | Printed in the footer as an assumption |

### Assumptions (footer, on screen from 0.0 s)

"Daily interest, posted when paid" (port: the Becker Rig footer is one or two mono lines at 40 px, and "ASSUMES daily interest, posted when paid" wrapped with "paid" alone on its second line; the 32-character line fits on one and gives the lanes the height). 7% APR and 72 months are in the working slot's stake line at frame 1; the caption spells the posting assumption out in full.

### Caption / description (verdict first, R11)

> Weekly barely beats biweekly. Rounding up is the real trick!
> Weekly beats biweekly by about $35: both add up to 13 monthly payments a year instead of 12. Rounding the weekly payment up to $200 (about $12 more a week) pays off your car about a year sooner and saves about $1,800 of interest on a $44,000 loan.
> $44,000 at 7% APR over 72 months ≈ the average new-car loan (Edmunds Q3 2026: $44,664 at 7.0%). Simple interest charged daily; assumes each payment is applied the day it lands. Educational math only.
> #carloan #debtpayoff #biweekly #micropayments #mathtok

### Pinned comment

> Does your lender apply a weekly payment the day it lands, or hold it until the due date? That decides whether any of this works. Drop your loan amount, APR and months and we'll run your column next.

The first sentence starts the argument vidIQ predicted for H48's comments. The second sets up a comment-reply sequel (H50's 127.3x was one).

### Per-platform notes

- **TikTok.** Caption line 1 is the verdict, with no numbers. Keep #micropayments: 4 of Debt Freedom's 5 breakouts carried it. Answer the best "now do mine" comment with the native reply sticker, on the same $44,000 running case (her $58,593.13 Jeep loan carried both the 1.9M video and the 290.7K reply).
- **Instagram Reels.** Make the cover the finished board at about 33 s in the round-2 cut, about 14.3-14.8 s in the condensed cut (four lanes run, the gold plate on ≈ $8,200, the "≈ 12 mo" banner on the winner's flag, the winner arms up in a V). Gage's one A/B favoured a finished-table cover. No comment-keyword CTA: in the benchmark it lifts comments, not views.
- **YouTube Shorts.** Use the platform title above. Let the loop run: the finished board holds to 37.2 s (condensed cut: 14.8 s), then the 2.5 s end card, and the loop cuts back to frame 1 (three crates on the start line again).

---

## 03b · Scoreboard · Paying the same minimum every month on a $5,000 credit card

**Spec:** `studio/specs/03b-scoreboard-card-minimum.json` · the condensed cut since its promotion on 2026-10-13 (below); the round-2 cut it replaced (30.6 s, captions on) is in git history (`4fb0b00^`) and is the one `renders/channel/` ships until the ship step
**Condensed cut (2026-10-13; promoted 2026-10-13):** `studio/specs/03b-scoreboard-card-minimum.json` (written as `studio/specs-wip/03b-scoreboard-card-minimum.json`) · 11.65 s + the 2.5 s end card = 14.15 s. The beat sheet and captions below are the condensed cut's; the times quoted in "Why this hook" are the round-2 cut's, which are also in the Review log ("Condensed cut (2026-10-13)").

*Ported to Scoreboard on 2026-10-08 (it was built in Clean Sheet, now retired; the old spec is in `studio/specs/retired/`). The hook, the VO, every number and the verdict are unchanged. What changed is how the screen carries them: the payoff time is the neon hero ("PAID OFF IN ≈ 15.1 YEARS" in red at frame 1, rolling down to ≈ 4.8, and at the winner beat rolling from ≈ 15.1 down to ≈ 4.8 again, landing on "ten" while the verdict says "≈ 10 years sooner"), and the three options are a leaderboard of time bars. See "Port to Scoreboard (2026-10-08): 03b" and "Fixer pass (2026-10-08, port QA)" in the Review log.*
**Platform title:** What Difference Does Paying the Same Card Minimum Every Month Make on $5,000?
**On-screen hook (header):** What difference does / paying the SAME minimum / every month make on **$5,000**?

(Hook pass, 2026-10-08: this hook replaced "Minimum vs a flat payment / on a **$5,000** credit card: / what difference does it make?". Option ② changed from a flat $150 to the first minimum held flat. See "Hook pass" in the Review log.)

### Why this hook

**Modelled on:**
1. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461.** It uses the same mechanic: hold the payment and the term collapses. The verdict denies the lever the viewer expects ("pay more").
2. **H49, The Debt Freedom Project:** "What's the difference between daily payments and one extra lump sum payment each month?" with the caption "Yes, daily payments work!", **382,100, 289.1x**, on a $2.98 answer. A tiny lever plus a verdict. Ours costs $0.
3. **H48, same channel:** "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?", **1,900,000, 902.5x.** We use its "What difference does … make on …?" frame.
4. **H84, Master Money:** "4 DEAD SIMPLE NUMBERS / That Tell You What / You Actually Make", **3,000,000, 140x.** We copy two things. One capitalised R5 word: "ACTUALLY" there, "SAME" here. And the working beside the result from frame 1: here the label stack already reads "starts at $142.59, then shrinks" over "$142.59 → $99.66 BY YEAR 3" at 0.0 s.
5. **H71, The Market Hustle:** "How Long It Took To Recover After the Worst Crashes:", **190,187 (4.5x med).** Open in the red: the hero "PAID OFF IN ≈ 15.1 YEARS" is red on screen at 0.0 s, as his "25 YEARS" is.

**Designed against:**
- **H52, "Credit Card Debt Payoff Strategies":** a topic label, **90,600**, her weakest, on the same subject.
- **FinCalC's neutral "X vs Y, which is better?" bucket:** median **13,322**. That was the old header's shape.

**Rules satisfied:**
- **R1:** $5,000 is in the header ("card" sits in ①'s name). "The card minimum" has already run at frame 1: the hero reads "PAID OFF IN ≈ 15.1 YEARS" in red, its row posts ≈ $7,300 in red over a full red bar labelled "≈ 15.1 YEARS", and the label stack reads its working "starts at $142.59, then shrinks" over "$142.59 → $99.66 BY YEAR 3" in red, so the shrink is shown in numbers at frame 1 (the Clean Sheet typed this note from 0.0 to about 1.3 s; the hook pass judged it within the first 1.5 s).
- **R2:** the hook holds one dollar figure, the stake input, and no result.
- **R3 (partial):** every cardholder has a minimum payment, and $5,000 is a round balance to map theirs onto. It is not the viewer's own balance; the pinned comment asks for their card's formula.
- **R4:** $5,000 is round, and the lever costs $0.
- **R5:** "SAME" in caps implies the wrong belief "paying the same can't change anything; to finish faster I must pay more".
- **R6 (partial):** $5,000 at 22% (the footer), with the horizon as the payoff. The header has no "you"; "your" comes in VO line 4 and the caption.
- **R7:** both levers are on the board from frame 1: "KEEP PAYING $142.59" and "A FLAT $250", each with "?" in its score slot.
- **R8:** 12 words.
- **R9:** 3 rows, 2 of them showing "?".
- **R10:**
  - The biggest number comes first: ≈ 15.1 years is the hero at frame 1, and it bumps as "fifteen" is spoken (2.4 s).
  - The screen answers each later line: ≈ $7,300 bumps on "$7,300" (5.0 s) and "MORE THAN THE $5,000 OWED" slams on "More" (7.8 s).
  - The lever is a hard cut at 9.6 s with its working "$142.59 − $142.59 = $0 more"; "$0 MORE THAN THE FIRST MINIMUM" slams on "dollar" (13.0 s); its race lands on "4.8" (16.0 s), the hero rolling down from ≈ 15.1, and ≈ $3,100 bumps on "$3,100" (18.0 s).
  - The headline difference, "≈ 10 years sooner", is the verdict's alone (25.8 s), and the hero proves it last: it rolls from ①'s red ≈ 15.1 down to ②'s green ≈ 4.8 and lands on the spoken "ten" (27.1 s).
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "Same payment, $0 more: ≈ 10 years sooner", spoken as the last VO line ("Same payment: about 10 years sooner.").

**The wrong belief it plays on:** "My minimum is a fixed bill, and to finish faster I have to pay more." In fact the minimum is 1% of the balance plus the interest, so it shrinks as the balance shrinks:
- it is **$142.59** in month 1, **$127.40** in month 12 and **$99.66** in month 36;
- paid that way, $5,000 at 22% takes **≈ 15 years** and **≈ $7,300** of interest, more than the $5,000 owed;
- keeping the payment at the first minimum, **$0** more than the first bill asked for, clears it in **57 payments (≈ 4.8 years)** with **≈ $3,100** of interest. That is **≈ 10 years sooner**.

The "$0 more" is measured against the **first** minimum. From month 2 the held payment is above that month's shrinking minimum: by month 36 it is $42.93 above $99.66. The VO ("your first minimum") and the verdict ("the first minimum") both name that anchor.

### Beat sheet (condensed cut, 2026-10-13)

Scoreboard timing (`looks/scoreboard/formats/what-difference.js`): the top bar holds the hook, the hero odometer and the footer; the dark stage holds a leaderboard, one row per option (name and interest on top, the time bar below, one shared scale); the bottom bar holds the label stack (line 1 the option's working in green, line 2 its name or a step), then the verdict. `option.t` is the **hard cut** (label stack slam, the row lights, the pointer jumps, thud). With `lookOpts.keepSpeed` the bar then waits, lit but empty, and races at the one shared speed (2.4 s for the longest bar, 0.7 s at the least) so it lands on `option.resultT`: the bar label and the interest cell roll with it, and the hero rolls the payoff (`counter: "payoff"`) down from the previous option's landed value on the same clock, its "≈" an unlit ghost until it lands (bump, glow, bloom, ding). `lookOpts.reads`: the hero bumps 6% and flares, or (with `option`) a row's interest cell swells 16% and glows in its colour for about 0.6 s while the label stack steps back, on a soft tick. `lookOpts.labelSteps` slam a line 2 of their own (`small`: one size down). With `lookOpts.heroEnd: "value"`, `data.winnerT` is when the hero lands the winner's own payoff, rolled from ①'s; its roll and the board's winner beat start 1.04 s before. A bar's label rides inside the bar's end when its landed label fits there (it waits at the track's start until the end reaches it), else just past it, never switching mid-race.

**Condensed cut timing.** `lookOpts.race` is 8 (the 15.1-year bar would take 8 s, so ②'s 4.8-year bar runs 2.54 s and ③'s 2.2-year bar 1.15 s, at one shared speed) with `keepSpeed`, so ②'s bar races from 0.35 s after its cut, under "Now keep paying…" and "Not a dollar more…", and the hero rolls ≈ 15.1 → ≈ 4.8 the whole time. `lookOpts.readHold` 0.15 (opt-in, see the Review log) holds each cell read 0.15 s at its peak instead of 0.3. The verdict lands 0.9 s after ③'s landing, the hero's winner roll lands 0.9 s into the verdict (`data.winnerT`), and the verdict holds 1.6 s; then the end card.

| t (s) | On screen | Caption (on-screen text, no narration) |
|---|---|---|
| 0.0 | **Frame 1, the thumbnail:** the header (the hook, "$5,000" green); the hero "PAID OFF IN **≈ 15.1 YEARS**" in red; the footer "22% APR · minimum = 1% + interest, $40 floor"; the board: THE CARD MINIMUM, ≈ $7,300 in red over a full red bar "≈ 15.1 YEARS"; KEEP PAYING $142.59 "?"; A FLAT $250 "?"; the label stack "starts at $142.59, then shrinks" / "**$142.59 → $99.66 BY YEAR 3**" (red, one size down). The hook caption is complete. From frame 2 the landing settles (row 1 lights, the hero bumps, a bloom) | "Minimum on $5,000: about 15 years. Because it shrinks." (−0.4 to 1.45 s, up 1.45 s) |
| 0.5 | Read: the hero bumps 6% and its glow flares. 1.05: the note "$142.59 → $99.66 BY YEAR 3" slams again (same line, one size down), on "Because it shrinks." | (same) |
| 1.5 | Read, as the caption goes up: row 1's ≈ $7,300 swells and glows red while the label stack steps back. 1.95 (fixer pass; was 2.15): line 2 slams "**MORE THAN THE $5,000 OWED**" (red, pop), at full strength until 2.4. 2.4 (was 2.6): ≈ $7,300 swells again, against the $5,000 owed; the stack steps back to 55% for 0.48 s (the line stays legible) and is at full strength again from about 2.9 to the cut. The line is up 1.2 s, 0.72 s of it at full strength (was 1.0 s and 0.52 s) | "About $7,300 in interest. More than you owed." (1.5-3.1) |
| 3.15 | Hard cut: row 2 lights, the pointer jumps to it; label stack "$142.59 − $142.59 = $0 more" / "KEEP PAYING $142.59" (thud). 3.5-6.05: its bar races at the shared speed; the hero rolls down from ≈ 15.1, turning green, and row 2's bar label and interest roll with it ("≈" unlit while running) | "Now keep paying the first one." (3.15-4.45) |
| 4.65 | Line 2 slams "**$0 MORE THAN THE FIRST MINIMUM**" (green) while the bar races | "Not a dollar more than your first minimum." (4.5-5.95) |
| 6.05 | The race lands: hero **≈ 4.8 YEARS**, the bar a third the length of row 1's with "≈ 4.8 YEARS" riding inside its end, **≈ $3,100** in the row (bump, glow, bloom, ding). 6.45: read of the bar's "≈ 4.8 YEARS"; 6.95: read of ≈ $3,100 (green glow) | "About 4.8 years. About $3,100 in interest." (6.0-7.6) |
| 7.65 | Hard cut: "$250 − $142.59 = $107.41 more" / "A FLAT $250". 8.0-9.15: the bar races; the hero rolls ≈ 4.8 → **≈ 2.2 YEARS** and lands at 9.15: ≈ 2.2 YEARS, ≈ $1,300 (its label rides just past the bar's end). 9.55: read of the bar's "≈ 2.2 YEARS" | "A flat $250: about 2.2 years." (7.65-10.0) |
| 10.05 | **Verdict:** the label stack drops away and "SAME PAYMENT, **$0** MORE: / **≈ 10 YEARS** SOONER" slams in under a green rule (reveal). Winner beat: row 2 glows green (its bar solid green), the others dim, the pointer jumps to it, the stage blooms (cash). The hero jumps back to ①'s red **≈ 15.1 YEARS** and rolls down (0.86 s), turning green, to ②'s **≈ 4.8 YEARS** at 10.95 (bump, glow): the 10 years the verdict claims are the roll itself | "Same payment: about 10 years sooner." (10.05-11.45) |
| 11.65-14.15 | The 2.5 s end card (unchanged) | |

### Captions (on-screen text, no narration; 50 words, all shown)

Every caption is the round-2 VO line word for word, paced for reading (up at least max(1.2 s, 0.12 s a word), back to back, 0.05 s apart).

| # | Caption | Up (s) | Words | Up for |
|---|---|---|---|---|
| 0 | Minimum on $5,000: about 15 years. Because it shrinks. | −0.4 → 1.45 (complete on frame 1) | 9 | 1.45 s |
| 1 | About $7,300 in interest. More than you owed. | 1.5 → 3.1 | 8 | 1.6 s |
| 2 | Now keep paying the first one. | 3.15 → 4.45 | 6 | 1.3 s |
| 3 | Not a dollar more than your first minimum. | 4.5 → 5.95 | 8 | 1.45 s |
| 4 | About 4.8 years. About $3,100 in interest. | 6.0 → 7.6 | 7 | 1.6 s |
| 5 | A flat $250: about 2.2 years. | 7.65 → 10.0 | 6 | 2.35 s |
| 6 | Same payment: about 10 years sooner. | 10.05 → 11.45, with the verdict | 6 | 1.4 s |

### The maths

**Model:**
- Interest is billed monthly at 22%/12 on the balance, rounded to the cent, with no new charges.
- The minimum follows the Chase cardmember agreement formula: the larger of $40, or 1% of the new balance plus the interest billed. When the new balance is under $40, the minimum is the whole balance.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $5,000, 22% APR | Inputs (sources below) | |
| starts at $142.59 | Interest 5,000 × 0.22/12 = $91.67; new balance $5,091.67; 1% = $50.92; 50.92 + 91.67 | $142.59 |
| Note "$142.59 → $99.66 by year 3"; VO "because it shrinks" | Replay of the minimum schedule: $127.40 in month 12, $100.68 in month 35, $99.66 in month 36 (the first month under $100; 36 = 3 × 12). The minimum never rises; it reaches the $40 floor near the end | $99.66 |
| ≈ 15.1 years (VO "about 15") | Minimum schedule: 181 payments ÷ 12 | 15.08 |
| ≈ $7,300 (VO "more than you owed") | Total interest on the minimum schedule: $7,340.79 (> $5,000) | ≈ $7,300 |
| Keep paying $142.59: $142.59 − $142.59 = $0 more (VO "not a dollar more than your first minimum") | | $0, exact |
| ≈ 4.8 years, ≈ $3,100 (VO "about 4.8", "about $3,100") | First minimum held flat: 57 payments ÷ 12 = 4.75, rounded half-up; interest $3,081.74 | ≈ 4.8 · ≈ $3,100 |
| ≈ 10 years sooner (verdict, VO line 7 "about 10 years sooner"; the hero's 15.1 → 4.8 roll at the winner beat) | (181 − 57) ÷ 12 = 10.33; shown 15.1 − 4.8 = 10.3 | ≈ 10 |
| **Not stated anywhere: the interest saving** | 7,340.79 − 3,081.74 = $4,259.05 rounds to ≈ $4,300, but the shown 7,300 − 3,100 = 4,200 would drift, so neither the screen nor the caption states a saving; the caption gives both totals | (left out) |
| $250 − $142.59 = $107.41 more | | $107.41 |
| ≈ 2.2 years, ≈ $1,300 | Flat $250: 26 payments; interest $1,285.71 | 2.17 → ≈ 2.2 · ≈ $1,300 |
| ≈ 13 years sooner (write-up only since the port-QA pass: not on screen, not in the VO) | (181 − 26) ÷ 12 = 12.92; shown 15.1 − 2.2 = 12.9 | ≈ 13 |
| Pinned: rounding up to $150 is $7.41 above the first minimum and only takes it from 57 months to 52 | 150 − 142.59 = 7.41; flat $150: 52 payments, interest $2,798.09 | 57 → 52 |

**Sensitivity (write-up only):**
- **At the Fed's exact 22.15%:**
  - the minimum takes 182 payments (15.2 years) and ≈ $7,400 (first minimum $143.21);
  - holding $143.21 flat takes 57 payments (4.75 years) and ≈ $3,100, 10.42 years sooner;
  - $250 takes 2.2 years and ≈ $1,300.
- **At Bankrate's 19.56%** (the average for new-card offers):
  - the minimum takes 177 payments (14.8 years) and ≈ $6,500 (first minimum $132.32);
  - holding $132.32 flat takes 60 payments (5.0 years) and ≈ $2,800, 9.75 years sooner;
  - $250 takes 2.1 years and ≈ $1,100.
- **The verdict holds at both rates:** 9.75 and 10.42 both round to ≈ 10 years sooner.
- **Formulas vary by issuer.**
  - Capital One-style cards use a $25 floor, and some cards use 2-3% of the balance.
  - A 2%-of-balance minimum with no "+ interest" term would take far longer, so the Chase formula is the gentle case. That is why the footer names the formula.
  - Holding the first minimum flat works under any shrinking formula; how much it saves depends on the formula.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| Card APR | 22% (rounded from 22.15%) | **Federal Reserve, G.19 Consumer Credit**, release of Aug 7, 2026 (Q2 2026): commercial-bank interest rate on credit card plans, **accounts assessed interest 22.15%** (Q1 2026: 21.52%). https://www.federalreserve.gov/releases/g19/20260807/ · series TERMCBCCINTNS on FRED, https://fred.stlouisfed.org/graph/?g=1hhyS · as summarised by Walnut, https://walnutinvest.com/stats/interest-rate-statistics (confirmed by the verifier) | **Bankrate** weekly average credit card rate **19.56%** (Aug 12, 2026), syndicated at https://www.azfamily.com/bankrate-article/2026/08/12/current-credit-card-interest-rates/ (confirmed by the verifier). It measures new-card offers, not balances that pay interest, so it is the low sensitivity case. The Fed's "all accounts" rate, 20.94% (May 2026), sits between the two |
| Minimum-payment formula | the larger of $40, or 1% of the new balance + interest | **Chase cardmember agreement** (COL00040): "(3) the larger of: (a) $40 (or total amount you owe if less than $40); or (b) the sum of: (i) 1% of the new balance … PLUS (ii) any periodic interest charges and late fees". https://www.chase.com/content/feed/public/creditcards/cma/Chase/COL00040.pdf (confirmed by the verifier) | The same agreement filed in the **CFPB** credit card agreement database: https://files.consumerfinance.gov/a/assets/credit-card-agreements/pdf/QCCA4Q2023/JPMORGAN_CHASE_BANK_NATIONAL_ASSOCIATION/COL00040-271320.pdf. **U.S. Bank** explainer (minimums are 1-3% or a flat amount plus interest, and vary by issuer): https://www.usbank.com/credit-cards/credit-card-insider/credit-card-basics/credit-card-minimum-payment.html |
| $5,000 balance | Round example | (not a sourced average; framed as "on $5,000") | |

### Assumptions (footer, on screen from 0.0 s)

"22% APR · minimum = 1% + interest, $40 floor" (fixer pass: one line at 40 px; "no new charges" moved to the caption). On the Scoreboard it sits under the hero for the whole video (no footer steps).

### Caption / description

> Never let your minimum shrink!
> The minimum is 1% of the balance plus interest, so it shrinks as you pay ($142.59 in month 1, $99.66 by month 36): about 15 years and about $7,300 of interest on $5,000, more than the debt itself. Keep paying the first minimum, $142.59, every month: about 4.8 years and about $3,100 of interest instead of about 15 years and $7,300. A flat $250 clears it in about 2.2 years.
> 22% ≈ the Fed's Q2 2026 average for cards that charge interest (22.15%). Assumes no new charges. Minimum formula from a big-bank cardmember agreement: 1% of the balance + interest, $40 floor. Yours is in your agreement under "Minimum Payment". Educational math only.
> #creditcarddebt #debtpayoff #minimumpayment #mathtok

Line 1 is now literally the lever. Line 2 gives both pairs of totals, and no interest saving (see the maths).

### Pinned comment

> Rounding up to $150 ($7.41 above the first minimum) only takes it from 57 months to 52. What formula does your card use: 1%, 2% or 3%?

### Per-platform notes

- **TikTok.**
  - The verdict goes in caption line 1, in the grammar of "Yes, daily payments work!".
  - Two comment fights are likely:
    - "Nobody's minimum is 1%." The pinned comment invites people to post their formula, which is cheap sequel material ("now do 2%").
    - "That IS paying more." Answer with the anchor: $0 more than the first minimum, and $42.93 more than the month-36 minimum.
- **Instagram Reels.** Cover: the payoff frame at about 28 s in the round-2 cut, about 11.3-11.6 s in the condensed cut: the hero "PAID OFF IN ≈ 4.8 YEARS" in green over the board (the red 15.1-year bar, the glowing green 4.8-year row) and the verdict "≈ 10 years sooner". Save-bait is the worked board itself, so no keyword CTA.
- **YouTube Shorts.**
  - Use the title above.
  - In the round-2 cut the first 9.6 s hold the worked minimum while two VO lines play, and the screen answers the VO three times: the hero bumps at 2.4 s, ≈ $7,300 at 5.0 s, and "MORE THAN THE $5,000 OWED" slams at 7.8 s.
  - The condensed cut (2026-10-13) answers the retention worry: the worked minimum holds 3.15 s, with five beats in it (the hero read, the note re-slam, two reads of ≈ $7,300 and "MORE THAN THE $5,000 OWED"), and the lever the hook asks about is cut in at 3.15 s.

---

## 03c · Scoreboard · Just $100 extra a month on a 30-year mortgage

**Spec:** `studio/specs/03c-scoreboard-mortgage-extra-100.json` · the condensed cut since its promotion on 2026-10-13 (below); the round-2 cut it replaced (29.8 s, captions on) is in git history (`4fb0b00^`) and is the one `renders/channel/` ships until the ship step
**Condensed cut (2026-10-13; promoted 2026-10-13):** `studio/specs/03c-scoreboard-mortgage-extra-100.json` (written as `studio/specs-wip/03c-scoreboard-mortgage-extra-100.json`) · 12.85 s + the 2.5 s end card = 15.35 s. The beat sheet and captions below are the condensed cut's; the times quoted in "Why this hook" are the round-2 cut's, which are also in the Review log ("Condensed cut (2026-10-13)").
**Platform title:** How Much Difference Does Just $100 Extra a Month Make on a Mortgage?
**On-screen hook (header):** HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE?

### Why this hook

**Modelled on:**
1. **H50, The Debt Freedom Project:** "How much difference does an extra $100 per month make on a car loan payoff?", **290,700, 127.3x.** We take the grammar word for word and swap the debt. "JUST" is the one-word R5 cue that $100 is too small to matter.
2. **H31, FinCalC TV:** "Home Loan Part payment Reduce Tenure NOT EMI", **578,461** (59 s). Home-loan prepayment maths travels at Shorts length.
3. **H71, The Market Hustle:** "How Long It Took To Recover After the Worst Crashes:", **190,187 (4.5x med).** Open in the red: his "25 YEARS" in red is on screen at 0.0 s. Our counter reads **≈ $587,200** of interest in red at 0.0 s.

**Rules satisfied:**
- **R1:** $100 is in the header; at 0.0 s the counter reads ≈ $587,200 in red, lane 1 is a full red bar labelled "30 YEARS", and the footer reads "$400,000 at 7.3%".
- **R2:** one dollar figure in the hook; the result is hidden.
- **R3 (partial):** an extra $100 is a sum anyone can test against their own payment; the $400,000 at 7.3% is ours. The pinned comment asks for their numbers.
- **R4:** $100 is small and round.
- **R5:** "JUST $100" voices the belief "$100 is a rounding error on a $400,000 loan".
- **R6:** a 30-year mortgage, with the $400,000 at 7.3% in the footer from 0.0 s.
- **R7:** the lever is named, and the $500 lane is on the board.
- **R8:** 14 words.
- **R9:** 3 lanes, 2 of them showing "?".
- **R10:** a shock number at 0.0 s (it bumps as the VO speaks it, 1.2 s); the +$100 answer lands at 8.9 s and its delta slams in at 10.6 s, on the spoken "$78,600"; the biggest saving comes last.
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** the hero lands "INTEREST ≈ $78,600 LESS" at the verdict, and the verdict slot carries the kicker the last VO line speaks: "+$100 a month: each $1 saves ≈ $2.46".

**The wrong belief it plays on:** "$100 a month can't matter on a $400,000 loan." It saves **≈ $78,600** of interest and **40 months**. That is $31,900 put in, about $2.46 of interest saved per extra dollar. The baseline shock goes first: the interest alone (**≈ $587,200**) is more than the loan.

### Beat sheet (condensed cut, 2026-10-13)

Scoreboard timing: `option.t` is the hard cut that names the option; its bar starts racing 0.35 s later, at one shared speed (the longest bar takes 2.4 s), and the hero rolls the interest on the same clock, from the previous option's landed score down to this one's (fixer pass: it used to snap to about $0 and count up), its "≈" an unlit ghost until it lands. The delta slams in at `option.deltaT` (assembly pass: pinned to the VO word that speaks it; the kit default is 0.55 s after the race lands). The first option carries `resultT 0.0`, so its race has already landed at frame 1. `lookOpts.reads` (assembly pass): the hero bumps 6% and its glow flares when the VO speaks the number it holds. Fixer pass: `lookOpts.labelSteps` slam "40 months sooner" and "≈ 11 years sooner" into the label stack on their words; `firstName: false` keeps lane 1's name out of the frame-1 label stack; `heads: false` drops the board's "INTEREST" head (the hero's tag names the metric).

**Condensed cut timing.** The races keep the kit's shared speed (2.4 s for the 30-year bar: +$100 runs 2.14 s, +$500 1.53 s), each under its "Add …" caption. After each landing four beats follow about 0.5 s apart, so the board never holds still: the "sooner" label step, a read of the landed bar's label, the delta, and a read of the hero (the new interest total). (Fixer pass: the label step now comes first, so each "sooner" line is up 1.1 s before its delta replaces it; it was 0.55 s.) `lookOpts.readHold` 0.15 (opt-in, see the Review log) holds each cell read 0.15 s at its peak instead of 0.3. The verdict lands 1.0 s after the last delta, the hero's "≈ $78,600 LESS" 0.7 s into it (`data.winnerT`), and the verdict holds 1.6 s; then the end card.

| t (s) | On screen | Caption (on-screen text, no narration) |
|---|---|---|
| 0.0 | **Frame 1, the thumbnail:** the header (the hook); the hero "INTEREST **≈ $587,200**" in red; the footer "$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)"; the board (no column head): JUST THE PAYMENT · ≈ $587,200 · a full red bar "30 YEARS"; +$100 A MONTH "?"; +$500 A MONTH "?"; the label stack "$2,742.29 a month". The hook caption, now one line of two sentences, is complete. From frame 2 the landing settles (row 1 lights, the hero bumps, a bloom) | "Interest alone: about $587,200. More than the loan." (−0.4 to 1.95 s, up 1.95 s) |
| 0.45 | Read: the hero bumps 6% and flares. 1.0: row 1's ≈ $587,200 swells and glows red, and the footer rewrites to "$2,742.29 × 360 − $400,000 ≈ $587,200" (the working of "More than the loan"; held to 2.8 s, 1.8 s in all). 1.55: the hero bumps again, against the $400,000 in that working | (same) |
| 2.0 | Hard cut: label "$2,842.29 a month / +$100 A MONTH", row 2 lights (thud). 2.8 (fixer pass; it was at the cut): footer "$2,742.29 + $100 = $2,842.29 a month" (the label stack has carried that payment since the cut). 2.35-4.49: the bar races and the hero rolls **down** from ≈ $587,200 to **≈ $508,600** in green (the $78,600 gap is the motion); the bar's label waits, then rides inside its end | "Add just $100 a month." (2.0-4.4) |
| 4.49 | Lands: ≈ 26.7 YEARS on the bar, ≈ $508,600 posted in the row (bump, glow, bloom, ding). 4.8: "**40 MONTHS SOONER**" slams into the label stack. 5.35: read of "≈ 26.7 YEARS" (it swells and glows; the stack steps back to 55% for 0.48 s, the line still legible). 5.9: the delta **≈ $78,600 LESS** replaces it (the line was up 1.1 s). 6.45: the hero (≈ $508,600) bumps on "less interest" | "40 months sooner. About $78,600 less interest." (4.45-6.9) |
| 6.95 | Hard cut: "+$500 A MONTH"; footer "$2,742.29 + $500 = $3,242.29 a month". 7.3-8.83: the hero rolls down from ≈ $508,600 to **≈ $342,200**; the bar lands at "≈ 19.1 YEARS" | "Add $500 a month." (6.95-8.75) |
| 8.83 | Lands (bump, ding). 9.15: "**≈ 11 YEARS SOONER**" slams. 9.7: read of "≈ 19.1 YEARS". 10.25: "≈ $245,000 LESS" (the line was up 1.1 s). 10.75: the hero (≈ $342,200) bumps | "About 11 years sooner. About $245,000 less." (8.8-11.2) |
| 11.25 | **Verdict** replaces the label stack: "+$100 A MONTH: / EACH $1 SAVES **≈ $2.46**". Row 2 glows neon, the others dim; the hero counts up from zero to "INTEREST **≈ $78,600 LESS**" and lands at 11.95, the last number up top. Footer "≈ $78,600 ÷ ($100 × 319) ≈ $2.46". Cash (kit cue) | "Each dollar of that $100 saves about $2.46." (11.25-12.65, with the verdict) |
| 12.85-15.35 | The 2.5 s end card (unchanged) | |

### Captions (on-screen text, no narration; 39 words, all shown)

The round-2 VO lines word for word, paced for reading (up at least max(1.2 s, 0.12 s a word), back to back, 0.05 s apart). The first two lines are merged into one caption ("Interest alone: about $587,200." + "More than the loan."), so the hook frame carries both facts and the opening needs one caption change fewer.

| # | Caption | Up (s) | Words | Up for |
|---|---|---|---|---|
| 0 | Interest alone: about $587,200. More than the loan. | −0.4 → 1.95 (complete on frame 1) | 8 | 1.95 s |
| 1 | Add just $100 a month. | 2.0 → 4.4 | 5 | 2.4 s |
| 2 | 40 months sooner. About $78,600 less interest. | 4.45 → 6.9 | 7 | 2.45 s |
| 3 | Add $500 a month. | 6.95 → 8.75 | 4 | 1.8 s |
| 4 | About 11 years sooner. About $245,000 less. | 8.8 → 11.2 | 7 | 2.4 s |
| 5 | Each dollar of that $100 saves about $2.46. | 11.25 → 12.65, with the verdict | 8 | 1.4 s |

### The maths

Model: standard monthly amortisation at 7.3%/12, with interest rounded to the cent. The scheduled payment is rounded up to the cent, so 360 payments clear the loan. Every extra dollar goes to principal the month it is paid. Taxes, insurance and PMI are excluded.

| On screen / in VO | Formula and inputs | Result |
|---|---|---|
| $400,000, 7.3%, 30 years | Inputs (sources below) | |
| $2,742.29 a month | 400,000 × (0.073/12) ÷ (1 − (1 + 0.073/12)^−360) = 2,742.2837, rounded up | $2,742.29 |
| 30 years, ≈ $587,200 (VO "more than the loan") | 360 payments; interest $587,216.16 (> $400,000). Footer working 2,742.29 × 360 − 400,000 = $587,224.40 | ≈ $587,200 |
| $2,842.29 / $3,242.29 a month | 2,742.29 + 100; 2,742.29 + 500 | exact |
| ≈ 26.7 years, ≈ $508,600 | +$100: 320 payments ÷ 12 = 26.67; interest $508,590.78 | ≈ 26.7 · ≈ $508,600 |
| VO and label step "40 months sooner" | 360 − 320 | 40 |
| ≈ $78,600 less | 587,216.16 − 508,590.78 = 78,625.38; shown 587,200 − 508,600 = 78,600 | ≈ $78,600 |
| ≈ 19.1 years, ≈ $342,200 | +$500: 229 payments = 19.08 years; interest $342,178.64 | ≈ 19.1 · ≈ $342,200 |
| ≈ $245,000 less; VO and label step "about 11 years sooner" | 587,216.16 − 342,178.64 = 245,037.52; (360 − 229) ÷ 12 = 10.92 | ≈ $245,000 · ≈ 11 |
| $100 × 319 | The full $100 goes in for 319 months ($31,900); the 320th payment is the smaller remainder | exact |
| ≈ $78,600 ÷ ($100 × 319) ≈ $2.46 (VO "about $2.46"; verdict "each $1 saves ≈ $2.46") | 78,600 ÷ 31,900 = 2.464; exact 78,625.38 ÷ 31,900 = 2.4647 | ≈ $2.46 |

**Sensitivity (write-up only):** at Freddie Mac's exact **7.28%** the payment is $2,736.85. Interest comes to ≈ $585,300 with no extra, ≈ $507,000 with +$100 (still 320 months, so 40 months sooner; ≈ $78,200 saved) and ≈ $341,300 with +$500 (230 months). The "+$100 saves more than $75,000" verdict holds.

### Sources

| Input | Value used | Source 1 | Source 2 |
|---|---|---|---|
| 30-year fixed rate | 7.3% (shown as "≈ Freddie Mac 7.28%") | **Freddie Mac** Primary Mortgage Market Survey, Oct 1, 2026: 30-yr fixed averaged **7.28%** (7.03% the week before, 6.34% a year earlier; 15-yr 6.60%). Freddie Mac release "Mortgage Rates Increase" (GlobeNewswire via StreetInsider), https://www.streetinsider.com/Globe+Newswire/Mortgage+Rates+Increase/25411462.html · Trading Economics, "US Mortgage Rates Climb Further in October", https://tradingeconomics.com/united-states/30-year-mortgage-rate/news/588887 · FRED series MORTGAGE30US, https://fred.stlouisfed.org/graph/?g=n5kM (confirmed by the verifier) | **Mortgage Bankers Association** Weekly Mortgage Applications Survey, week ending Sep 25, 2026 (released Sep 30): average contract rate, 30-yr fixed conforming, **7.30%** (from 7.12%), "highest since November 2023" (confirmed by the verifier). Reported by JM Financial Services market news, https://www.jmfinancialservices.in/market-news-and-insights/1734750 (the search returned three of its pages, IDs 1729262, 1733675 and 1734750; which one holds this item is not confirmed) |
| Loan size | $400,000 (round example) | **NAR** Existing-Home Sales, August 2026: median existing-home price **$429,100** (+1.6% y/y), so $400,000 is that price with about 7% down. https://www.nar.realtor/newsroom/nar-existing-home-sales-report-shows-2-0-decrease-in-august (confirmed by the verifier) | Mortgage News Daily on the same release: https://www.mortgagenewsdaily.com/news/09112026-existing-home-sales-nar-inventory-prices-appr |

### Assumptions (footer, on screen from 0.0 s to 4.6 s; condensed cut: to 1.0 s, then the "× 360" working to 2.8 s)

"$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)". The Scoreboard footer is one line of about 45 characters, and from 4.6 s it carries the working instead (`lookOpts.footerSteps`). The loan size goes here because, with the counter opening on the interest, the kit shows the stake nowhere else. "Extra goes to principal", the date's year, and "no taxes or insurance" go in the caption.

### Caption / description

> Yes, just $100 a month really makes a difference!
> About $78,600 less interest and 40 months sooner on a $400,000, 30-year loan at 7.3%. $500 a month: about 11 years sooner and about $245,000 less.
> 7.3% ≈ the Freddie Mac average for the week of Oct 1, 2026 (7.28%); MBA had 7.30%. Assumes a fixed rate and that every extra dollar is applied to principal; taxes, insurance and PMI not included. Educational math only.
> #mortgage #homeloan #debtfree #mathtok

### Pinned comment

> Extra payments only shorten the loan if the servicer applies them to principal. Some apply them to next month's payment instead. Drop your balance, rate and extra amount and we'll put your row on the board.

### Per-platform notes

- **TikTok.** The red counter at 0.0 s is the scroll-stop, so keep the first 0.5 s free of any intro. Put the verdict in caption line 1. Run the comment-reply sequel ("now do $50", "now do 6%") on the same $400,000 board.
- **Instagram Reels.** Cover: the verdict frame (hero "≈ $78,600 LESS", verdict "+$100 a month: each $1 saves ≈ $2.46") over the three lanes, at about 24 s in the round-2 cut, about 12.3-12.8 s in the condensed cut. Comments will argue about investing the $100 instead. Leave that argument alone (no advice); a later P4 duel can answer it with maths.
- **YouTube Shorts.** Use the title above. HD Guy-style diegetic sound only (the kit's thud, roll, ding, pop and cash; no music bed). Hard-cut loop at 29.8 s (condensed cut: after the end card at 15.35 s) back to the red counter.

---

## Open items

1. **Primary pages were not opened.** The egress proxy blocked every page fetch (edmunds.com, federalreserve.gov, autoremarketing.com, experian.com, santamariatimes.com and others). Each figure on screen was cross-checked by the verifier's independent searches:
   - Edmunds Q3 2026 ($44,664, 7.0%) and Q2 2026 ($44,156) for the car loan;
   - the Fed (22.15%) and Bankrate (19.56%) for the card APR, and the Chase formula;
   - Freddie Mac (7.28%) and MBA (7.30%) for the mortgage rate, and NAR ($429,100) for the loan size.

   Before publishing, read these four primary pages: the Fed's G.19 for Aug 7, 2026; Freddie Mac's PMMS for Oct 1, 2026; Edmunds' Q3 2026 release; and the Chase agreement PDF.
2. **The MBA citation's exact page** (one of three JM Financial pages) is unconfirmed. Freddie Mac's 7.28% is the figure on screen.
3. **Kit behaviour the specs work around:**
   - **Scoreboard:** while a race rolls (about 2.1 s for +$100, 1.5 s for +$500), the hero rolls the interest down from the previous landed score and the lane label counts the years, so a paused frame can show an intermediate figure ("$561,174", "9.4 YEARS"). Only the landed values are verified figures. Their "≈" now stays an unlit ghost until they land, which marks them as running. 03c avoids this at frame 1 (`resultT 0.0`). The verdict's count-up to "≈ $78,600 LESS" (22.04-23.04 s) runs the same way.
   - **Scoreboard, 03b (port):** the same holds for its races and its payoff roll: the hero passes through running payoff values ("8.2 YEARS" at 15.6 s, and from 15.1 down to 4.8 again at 26.1-27.1 s) with an unlit "≈". `keepSpeed` keeps each race short (0.76 s and 0.7 s at the shared speed), and the winner beat's roll lasts 1.04 s; only the landed values are verified figures. Condensed cut (critic's nit, 2026-10-13; no change in the fixer pass): ②'s race now runs 2.54 s under two captions, so for most of it the hero and row 2's bar label show two different running years (hero "8.3 YEARS", bar "2.5 YEARS" at 4.7 s), the hero rolling down from 15.1 while the label counts up from 0. Kit open item: an opt-in (Scoreboard what-difference only) to keep the bar label hidden, or as an unlit "≈" ghost, until its bar lands.
   - **Becker Rig, 03a (port):** a running crate's face counts the months up in grey digits without the "≈" (and ≈ $8,200 counts down from ≈ $10,000 over 0.8 s, 27.65-28.45 s), so a paused frame can show an intermediate figure; only the landed strings are verified. The working slot pops whole lines (it does not type), one at a time; every line holds at least 2 s. The kit has no loop clear: the last 2.2 s hold the finished board (the winner keeps a small wave going). The time axis is honest from zero, so 12 months is 40 px of a 240 px run: the col layout cannot run longer without shrinking the figures (row: 0.30, money 48 px, tested and rejected), so the time saved is carried by the "≈ 12 mo" banner, the slot step and the read on "year". The winner's plate clears the lane line and the crate by only 4-6 px: the 151 px lanes hold a 64 px value over a 56 px crate whose face is at its 41 px floor.
   - **Live Sheet and Clean Sheet:** retired with the port. Their notes on 03a's pre-filled working and 03b's split/swap layout are in the Review log (revision 2 to the fixer pass).
4. **The ports depend on two format modules.**
   - 03a uses `looks/becker-rig/formats/what-difference.js`: its `scan`, `reads`, `lever.options`, `steps`, `formulas`, `countCell` and `option.resultT` carry the Live Sheet beats over (no edit in the port); the port-QA pass added `pat`, `lever.beats` and `gapLabel` (opt-in) and changed the winner beat for every spec (the plate's growth rule, the pennant under it, the lasting wave, a hop on a later read, the value turning ink as the plate opens) and the flag's drop under a title row.
   - 03b uses opt-in additions to `looks/scoreboard/formats/what-difference.js`: from the port, `lookOpts.keepSpeed`, cell reads (`reads: [{ t, option, metric }]`), `lookOpts.endTag`, `data.winnerT` and the hero's roll to a duration delta; from the port-QA pass, `lookOpts.heroEnd` and `labelSteps[].small`. The port-QA pass also changed, for every spec, how a cell read looks (a held 16% swell, the label stack stepping back) and which side a bar's label rides (decided from the landed bar; 03c's labels changed with it).
   - If either module changes, re-run `node src/cli.mjs check specs/03*.json --every 0.0333333` and the stills at 0, 1.65, 19.7, 22.1, 31.6, 33.0, 34.3 and 37.17 s (03a) and 0, 5.15, 15.8, 16.05, 26.6, 27.15 and 30.57 s (03b).
5. **Renders:**
   - Port (2026-10-08): 03a and 03b are rendered to `studio/out/03a-becker-rig-car-loan-weekly.mp4` (37.2 s, 1,116 frames) and `studio/out/03b-scoreboard-card-minimum.mp4` (30.6 s, 918 frames). Both are 1080×1920 H.264 at 30 fps with an AAC track of the kits' SFX (no VO yet). Frames extracted with ffmpeg (03a at 0, 16.3 and 31.6 s; 03b at 0, 16.1 and 27.5 s) match the stills at the same times: mean pixel difference 0.84-1.26 of 255, which is codec noise.
   - Port-QA fixer pass (2026-10-08): 03a and 03b are re-rendered to the same paths (37.2 s, 1,116 frames; 30.6 s, 918 frames). Frames pulled from the MP4s (03a at 1.6, 22.0, 33.0 and 34.3 s; 03b at 5.2, 15.8, 26.6 and 30.5 s) match fresh stills: mean pixel difference 0.77-1.28 of 255. Frame-differencing the new 03a finds no still stretch longer than 2.0 s (it was 4.5 s at 18.4-22.9 s, 3.6 s at the end and 1.6 s after the hook).
   - 03c is re-rendered too (`studio/out/03c-scoreboard-mortgage-extra-100.mp4`, 29.8 s, 894 frames): its spec is unchanged, but its race labels now follow the Scoreboard module's new label-side rule.
   - The retired looks' renders (`03a-live-sheet-…`, `03b-clean-sheet-…`) are still in `studio/out/` and `renders/v2/`; they are not the current teasers.
   - Condensed cut (2026-10-13): the three condensed renders are in `/tmp/cond/03/<id>/render/` and, with the sound rebuilt on them, `/tmp/cond/03/<id>/final/` (fixer pass: 03a 17.3 s, 519 frames; 03b 14.15 s, 425 frames; 03c 15.35 s, 461 frames; the editor's 03a was 17.75 s, 533 frames). Each final MP4 is byte-identical to its render. Nothing under `renders/` changed.
6. **The condensed cut is promoted (2026-10-13), not yet shipped.** `studio/specs/` holds it (moved from `studio/specs-wip/`); `renders/channel/` and `publishing/` still hold the round-2 cuts. The ship step owns sound and the ship; the steps, the sound failures it must settle and the publishing facts that change are in the Review log entries "Condensed cut (2026-10-13)" ("To promote") and "Fixer pass (2026-10-13, condensed-cut QA)". On promotion, these go stale and are outside this pass's files: `teasers/v2/teasers.json` (runtimes 17.3 / 14.15 / 15.35 s), `publishing/03{a,b,c}-*.{md,json}` (`for_video`, the covers, "525 checks") and the files under `renders/`.

---

## Review log

Revision 2, 2026-10-07. Each review issue, and what was done.

### Verifier

| # | Teaser | Severity | Issue | What I did |
|---|---|---|---|---|
| V1 | 03a | must | `lookOpts.formulaBar` is not read by the live-sheet module; the 13-payments proof never renders | Replaced with `lookOpts.formulas` (one working per option) and `lookOpts.lever` `{t: 18.0, text: "= 13 × $750.16 = $9,752.08: 13 payments, not 12"}`, as the verifier proposed. The "≈ $648 more" line is dropped; "$187.54 + $12.46 = $200 a week" is the Rounded-up working. The render shows the lever line in the bar at 18.0-22 s. |
| V2 | 03a | must | 63 lint errors: footer past y 1480, captions hidden behind the card, deltas overlapping | Applied the verifier's fix (name "Rounded up"; details "$750.16 a month", "$375.08 every 2 wks", "$187.54 a week", "$200 a week"; the three `delta` fields deleted). I went one step further on the footer: the verifier's two-line footer still had its second line half-covered by the verdict card from 31 s in my render (the linter does not flag it), so it is now one line, "ASSUMES daily interest, posted when paid" (7% and 72 months are on the stake row; the caption spells the assumption out). Lint: 0 errors, 0 warnings; captions visible in every still. |
| V3 | 03a | must | "Avg new-car loan" over $44,000 presents a rounded figure as the average; Experian unverified | `stake.label` is now "New-car loan". The md's R3 says "$44,000 ≈ the average new-car loan (Edmunds Q3 2026: $44,664)", and the sources table says outright that $44,000 is not the average's rounding. I searched for Experian Q2 2026 once: the result text gave different figures ($41,983 and $749) and both Experian pages were blocked, so neither set is usable. Experian is gone from the md and the check; source 2 is now Edmunds Q2 2026 ($44,156, confirmed by the verifier). The Experian 6.35% sensitivity is replaced by what-ifs at 6% and 8% and by Edmunds' exact $44,664; the verdict holds in all three. |
| V4 | 03b | must | `lookOpts.check` object rendered "check: [object Object]"; badge and formulas ignored | `lookOpts` is removed entirely (badge, formulas, check). I tried the verifier's short check line first: with the new 3-line hook, the layout engine keeps the workings and drops the check (it ranks the working above the check), so the $7.41 still never appeared. The proof now lives in the working lines, which stay on the sheet once typed: ② "$150 − $142.59 = $7.41 more" (from 9.2 s) and ③ "$250 − $142.59 = $107.41 more". ①'s working "starts at $142.59, then shrinks" is on screen from frame 1. |
| V5 | 03c | must | `footerSteps[0]` at t 0.0 hides the footer; "Freddie Mac" 7.3% without ≈ | The footer is visible from 0.0 to 4.6 s and reads "$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)" (45 characters). The loan size is added because the scoreboard shows the stake nowhere else once the counter opens on the interest. The first step moves to 4.6 s, on "More than the loan.". The check now asserts that every footer step starts after t = 0. |
| V6 | 03c | must | `footerSteps[3]` was 68 characters, clipped, with type under the floor | Replaced with "≈ $78,600 ÷ ($100 × 319) ≈ $2.46" (32 characters). The check asserts ≤ 45 characters per step and that the shown ratio rounds like the exact one (2.464 and 2.4647). |
| V7 | all | must | Stale "linter 3/3 clean; modules are stubs" claim | `node src/cli.mjs check specs/03*.json` gives 3/3 clean against the built modules. Stills and contact sheets were inspected. The md header and Open items are rewritten, and the maths check was re-run after every string change (387 checks, 0 failures). |
| V8 | 03b | should | `option.t` is typing start, so results landed about 1.45 s late and the spec pops were off the beat | Every 03b option now pins `resultT`: ① lands before frame 1 (t −3.0, resultT −2.4), ② at 10.2 s (the VO word "flat" is at 10.0), ③ at 20.8 s ("flat" at 20.6). The check measures Clean Sheet landings by `resultT` and asserts that the working types first. |
| V9 | 03a, 03b, 03c | should | Spec-level sfx double the kits' own cues | All three `sfx` arrays are deleted; the check asserts there are none. |
| V10 | 03b | should | The "≈ $143" working was erased in swap layout while the VO still referred to it | The VO line "It starts at about $143 and shrinks." is cut. With the working-tree clean-sheet module the layout now stays in split mode, so "starts at $142.59, then shrinks" stays visible all video (the committed module still falls back to swap; see Open item 4). I tested the verifier's alternative, a typed `note` under the minimum: the extra line pushed the layout into swap mode, which erased every working line, including the $7.41, so it was rejected. |
| V11 | 03b, 03c | should | The lever the hook asks about lands late (03b at 50%, 03c at about 40%) | 03b: "More than the $5,000 you owed." becomes "More than you owed." and moves into line 2. The "$143" line is cut. The $150 working types at 9.2 s (30%), with results at 10.2 s, against 18.0 s and about 19.2 s before. Runtime is 38.0 → 30.2 s. 03c: the stake recital is cut; the +$100 cut comes at 6.4 s (22%), it lands at 8.9 s and its delta at 9.4 s, against 11.1 s and 13.8 s before. Runtime is 34.3 → 29.8 s. The rest of the verifier's 03b re-timing text was truncated in the brief; I followed its direction rather than its exact times. |

### Hook judge

| Teaser | Score before | What I did | Score after (my estimate) |
|---|---|---|---|
| 03a | 7 | **Adopted** the header rewrite "What difference do weekly and / biweekly payments really make / on a **$44,000** car loan?" ("really" is the R5 cue; weekly comes first), the opening VO "About a year off this loan. Guess which one." (honest: rounded-up weekly pays off at 60.07 months against 72, 11.9 months sooner), the title "What Difference Do Weekly Car Payments Really Make on $44,000?" and caption line 1 "Weekly barely beats biweekly. Rounding up is the real trick!" (the numbers move to line 2). Every later beat shifted by about 3.8 s; runtime 37.2 s. The frame-1 legibility issue (captions invisible, three-line footer in the UI zone) is fixed by V2. Not changed: R3 stays partial (a national-average loan, not the viewer's own), and the first comparison now lands at 8.0 s. | 8 |
| 03b | 6 | **Adopted** the header "Minimum vs a flat payment / on a **$5,000** credit card: / what difference does it make?" (15 words, one $ figure, the stake the viewer maps their balance onto). Step ① is filled in coral at frame 1, the opening VO is "Only the minimum on $5,000? About 15 years.", the $150 beat moves to 9.2 s, the title is the judge's, and caption line 1 is "Never let your minimum shrink!". The second yellow highlight is gone: $150 is no longer in the title, and the stake terms are hidden because the footer states them. **Adapted:** the judge wanted ②'s working "≈ $7 more than the first minimum" visible at frame 1. The kit cannot type a later option's working before that option starts without resting the baseline's coral boxes. Instead, frame 1 shows "$142.59" (①'s working) against "A flat $150" (②'s name), and ②'s working "$150 − $142.59 = $7.41 more" types at 9.2 s and stays. Runtime 30.2 s (the judge suggested about 30). | 7 |
| 03c | 7 | **Adopted** "HOW MUCH DIFFERENCE DOES / JUST **$100** EXTRA A MONTH MAKE / ON A 30-YEAR MORTGAGE?". The counter reads ≈ $587,200 in red at 0.0 s with no roll (`resultT 0.0`) and lane 1 reads "30 YEARS". Title "How Much Difference Does Just $100 Extra a Month Make on a Mortgage?" and caption line 1 "Yes, just $100 a month really makes a difference!" (numbers on line 2). **Adapted:** the judge's single opening line "About $587,200 of interest on this $400,000 loan. More than the loan." runs to 22 spoken words, about 8.5 s at 2.6 words/s, so it became "Interest alone: about $587,200." plus "More than the loan.", with $400,000 in the footer at that moment. The +$100 cut is at 6.4 s (the judge suggested about 4.4 s) and its answer at 9.4 s (suggested about 7 s); runtime 29.8 s (suggested about 28). | 8 |

### Hook pass (2026-10-08)

The owner rejected round 1 partly because "hooks are weak". For 03b, four rewritten hooks (A-D) were scored against the current hook by two judges. Each hook is a header, a first VO line, the first 1.5 s and a platform title, built on the hook bank's P1-P9 and R1-R12.

**Rule:**
- Average the two judges' scores per option.
- An option either judge marks dishonest is out.
- Adopt the best option only if its average is **≥ 7.5** and **≥ 0.75 above the current hook**. Otherwise keep the current hook (a clearly better title may still be taken).

| Teaser | Option | Judge 1 | Judge 2 | Average | Decision |
|---|---|---:|---:|---:|---|
| 03b | current: "Minimum vs a flat payment / on a $5,000 credit card: / what difference does it make?" | 6 | 6 | 6.0 | replaced |
| 03b | A: "What difference does / rounding your minimum / up to $150 really make?" | 8 | 5 (dishonest) | out | Judge 2 marked it dishonest (see below) |
| 03b | **B: "What difference does / paying the SAME minimum / every month make on $5,000?"** | 7 | 8 | **7.5** | **adopted** (+1.5) |
| 03b | C: "POV: you're 25, owe $5,000 / on a credit card, and pay / only the minimum" | 7.5 | 7 | 7.25 | under 7.5 |
| 03b | D: "Your bank picks the minimum. / You pick a flat $150. / What's the difference?" | 5.5 | 4 (dishonest) | out | Judge 2 marked it dishonest (see below) |

**The judges' diagnosis of the old hook** (both gave it 6):
- "Minimum vs a flat payment … what difference does it make?" is the neutral X-vs-Y shape of FinCalC's weak "which is better" bucket (median 13,322; H40 89,045; H42 7,665).
- The lever, "a flat payment", is unsized jargon, while H50 (127.3x) works because its lever is a sized "$100".
- There is no R5 cue word and no "you", and the header sits at the 15-word cap.
- "Fifteen" was not spoken until about 3.2 s.
- The viewer had to subtract $150 − $142.59 alone.
- Nothing on the sheet moved for 9.2 s.

**Why A and D are out.** Judge 2 found that both hooks sell a cause the video cannot pay off:
- **A** credited the effect to "rounding up". Almost all of the 129-month gain comes from not letting the payment shrink: the first minimum held flat already clears the card in 57 months, and rounding $142.59 up to $150 adds only 5 more months (57 → 52). A viewer who pays the minimum plus $7.41 every month finishes in 140 payments, only 3.4 years sooner, not 11. I recomputed both figures and they hold.
- **D** opened at 0.0 s with "About 11 years off, for about $7", but the extra is $7.41 only in month 1 ($22.60 by month 12, $50.34 by month 36). Its "Guess which" also had no real guess, because the header already named $150.

**Why B won.** B is the only option whose hook names the real mechanism, and its verdict is the most lopsided honest one available ($0 more against ≈ 10 years sooner; R12, the H49 logic). It is H31's "Reduce Tenure NOT EMI" mechanic, and "SAME" in caps is H84's one-word cue. The note proves the shrink in numbers within 1.5 s.

Both judges docked it for clarity: strictly, it is the same *payment*, not the same *minimum*, after month 1. They also noted that the header has no "you" and that $5,000 is a stand-in balance.

**What I applied:**

| # | Change | Notes |
|---|---|---|
| HP1 | **Hook as proposed:**<br>- header "What difference does / paying the SAME minimum / every month make on **$5,000**?" (12 words, one dollar figure);<br>- title "What Difference Does Paying the Same Card Minimum Every Month Make on $5,000?";<br>- VO line 1 "Minimum on $5,000: about 15 years. Because it shrinks." (t 0.0, d 4.4; "fifteen" at about 2.4 s);<br>- option ① note "$142.59 → $99.66 by year 3", `noteT 0.0`. | The note is the month-36 minimum, the first month under $100 (month 35: $100.68). The check asserts the value and that the minimum never rises. The stills show the note complete, caret still on, by 1.5 s. |
| HP2 | **Option ② replaced:**<br>- "A flat $150" becomes "Keep paying $142.59", with working "$142.59 − $142.59 = $0 more";<br>- `t 9.6`, `resultT 10.6`;<br>- values ≈ 4.8 years and ≈ $3,100, delta "≈ 10 years sooner", tone `goal`.<br>③ (a flat $250) is re-timed to `t 21.4` and `resultT 22.0`, with its content unchanged. The verdict is "**$0** more than the first minimum: / **≈ 10 years** sooner" at 26.0 s. The VO is re-timed as proposed (4.6 / 9.6 / 12.6 / 16.0 / 21.4 / 26.0). Duration is 31.4 s, hold 2.2 s. | First minimum held flat: 57 payments (4.75 → ≈ 4.8 years), $3,081.74. (181 − 57) ÷ 12 = 10.33, and the shown 15.1 − 4.8 = 10.3, so there is no drift. "keep" is spoken at about 10.0 s against the 10.6 s landing; "flat" at about 21.8 s against 22.0 s. The flat $150 leaves the sheet and moves to the pinned comment. |
| HP3 | **One wording change from the proposal:** VO line 4 "Not a dollar more than your first bill." becomes "Not a dollar more than your first minimum." | "First bill" can be read as the statement balance ($5,091.67). "First minimum" matches the verdict's anchor. The line keeps the same 8 spoken words and the same timing. |
| HP4 | **Caption, pinned comment and check:**<br>- Caption line 1 stays "Never let your minimum shrink!", which is now literally the lever.<br>- Line 2 gives both pairs of totals (≈ 4.8 years and ≈ $3,100 against ≈ 15 years and $7,300) and no interest saving.<br>- The pinned comment becomes "Rounding up to $150 ($7.41 above the first minimum) only takes it from 57 months to 52. What formula does your card use: 1%, 2% or 3%?".<br>- `checks/03-what-difference.py` has new 03b expectations (note, ② name, working, values and delta, verdict tokens, VO lines, beat keyword "keep", winner "Keep paying $142.59"). | The saving is left out because the exact $4,259.05 rounds to ≈ $4,300, but the shown 7,300 − 3,100 = 4,200 would drift; the check asserts that drift so nobody adds the saving later. New claims cover the note month, the minimum never rising, 57 payments, ≈ 10 years, the pinned 57 → 52 and $7.41, and the sensitivity (holding the first minimum flat is 9.75 years sooner at 19.56% and 10.42 at 22.15%, both ≈ 10). The $4,500 claims for the old flat-$150 caption are removed. |
| HP5 | **Kept as scored:** the header wording "the SAME minimum", and no "you" in the header (R6 partial). | ②'s name "Keep paying $142.59" is on screen from frame 1 and makes the anchor explicit. VO line 4 and the verdict say "first minimum". Rewording the header would mean shipping a hook the judges did not score. |

**Verification:**
- **Maths check:** `python3 teasers/v2/checks/03-what-difference.py` gives **388 checks, 0 failures, exit 0**.
- **Mutation test:** on scratch copies of the new 03b spec (note $99.67, verdict ≈ 11, ② landing at 11.6 s, one "about" removed), all 4 mutations were caught.
- **Studio linter:** `node src/cli.mjs check specs/03b-clean-sheet-card-minimum.json` gives 0 errors and 0 warnings (31.4 s).
- **Stills:** at 0, 1.5, 3, 11.5 and 29.5 s.
  - 0.0 s: the 3-line header with $5,000 on yellow, the footer, the stake, ①'s coral results, and ② "Keep paying $142.59" and ③ "A flat $250" over empty slots.
  - 1.5 s: the note complete.
  - 11.5 s: ②'s "$0 more" working and its green results, with the note still visible.
  - 29.5 s: the full sheet in split layout, with every working line and the 2-line verdict.
  - "Keep paying $142.59" wraps to 2 lines in the name column. It reads cleanly and does not collide with the delta chip.

**Score after:** 7.5 (the judges' average for B), up from 6.

### Assembly pass (2026-10-08)

The round-2 assembly brief set a higher bar: every frame designed, the hook landing at frame 1, every beat on its VO line, no dead air, and every number right. All three specs were already lint-clean at the default 0.25 s step. Their stills and 12-frame contact sheets showed five problems:
- **03a:** the Live Sheet does not move from about 0.5 s to 6.8 s, nor from 23.8 s to 31.0 s, while the VO reads numbers already on the sheet.
- **03a:** the formula bar wraps two workings with an orphan word ("= $375.08 × 26 = $9,752.08 a" / "year"), and the lever breaks as "… $9,752.08: 13" / "payments, not 12".
- **03b:** the sheet is frozen from 1.45 s, when the note finishes, to 9.6 s, while two VO lines read ①'s numbers.
- **03c:** the two delta slams land 1.2-1.8 s before the VO speaks them, and "≈ $245,000 LESS" lands during the previous line.
- **03c:** one overlap at the +$100 landing frame (8.90 s) that only a frame-exact lint finds. The row's "≈ $508,600" slams in from 1.24× about 55% of its height, so its glyph box grows 10 px down into the bar label "≈ 26.7 YEARS". The inks never touch, but it is an overlap at that frame.

No number, no wording and no VO line changed: the 51 new checks (388 → 439) are timing checks only.

| # | Teaser | Change | Where |
|---|---|---|---|
| AP1 | 03a | **Reads:** at 4.2 s ("72") and 5.8 s ("$10,000") the selection marks Monthly's two cells; at 27.2 s ("60") and 28.4 s ("$1,800") it steps onto Rounded up's "≈ 60 months" and "≈ $8,200". Each cell flashes and its value settles from 108% on a soft tick. | spec `lookOpts.reads`; new `reads` option in `looks/live-sheet/formats/what-difference.js` |
| AP2 | 03a | **Formula bar line breaks:** "= $375.08 × 26\n= $9,752.08 a year", "= $187.54 × 52\n= $9,752.08 a year", lever "= 13 × $750.16 = $9,752.08:\n13 payments, not 12". The strings keep the same length (a space became the break), so the typing timing is unchanged. | spec `lookOpts.formulas`, `lever`; the format forces the two-line bar when an author break is present |
| AP3 | 03b | **Reads:** ①'s "≈ 15.1 years" pops at 2.4 s ("fifteen"), "≈ $7,300" at 5.0 s, the stake "$5,000" at 7.8 s ("More than you owed"), and ②'s "≈ 4.8 years" at 16.4 s and "≈ $3,100" at 18.4 s. Each pop is 108% for 0.38 s, scaled from the box's aligned edge, so a right-column box never crosses the x 940 rail. | spec `lookOpts.reads`; new `reads` option in `looks/clean-sheet/formats/what-difference.js` |
| AP4 | 03c | **Delta slams on the spoken number:** `deltaT` 10.6 ("About $78,600") and 18.6 ("About $245,000"), against the kit default of about 9.4 and 16.8 (0.55 s after each race lands). | spec `options[1].deltaT`, `options[2].deltaT` (an existing kit field) |
| AP5 | 03c | **Hero read:** at 1.2 s ("$587,200") the red hero bumps 6% and its glow flares, so the hook number answers the first VO line. | spec `lookOpts.reads`; new `reads` option in `looks/scoreboard/formats/what-difference.js` |
| AP6 | 03c | **Slam overlap fixed:** in two-line rows the posted money cell now slams from the figure's baseline (`transform-origin` 100% / baseline), and its start scale is capped to the room above it inside the row (about 1.16×). | `looks/scoreboard/formats/what-difference.js` |
| AP7 | all | **Check:** `reads_expect` and `delta_beats` in `checks/03-what-difference.py` assert each read and slam is within 0.25 s of its anchor word, marks a value already on screen, and that the word speaks that value. A whole-unit rounding counts ("fifteen" for ≈ 15.1). For 03a's "$1,800" the check asserts it equals the shown 10,000 − 8,200. | maths check: 439 checks, 0 failures |

**Verification:**
- **Numbers.** An independent re-derivation (a separate script, not the check's code) reproduced every on-screen figure:
  - 03a: $750.16; 72 / 142 / 282 / 261 payments; interest $10,011.20, $8,916.74, $8,881.25, $8,184.40; 65.36, 64.90 and 60.07 months.
  - 03b: 181 / 57 / 26 payments; $7,340.79, $3,081.74, $1,285.71; the minimum is $127.40 in month 12 and $99.66 in month 36.
  - 03c: $2,742.29; 360 / 320 / 229 payments; $587,216.16, $508,590.78, $342,178.64; 78,600 ÷ 31,900 = 2.464.
- **Linter.** `check specs/03*.json` gives 3/3 clean at the default step and at every frame (`--every 0.0333333`). The kits' own what-difference samples (live-sheet 2, clean-sheet 3, scoreboard 2) stay clean after the three format edits.
- **Stills.** These were inspected at the frame-1 hook, every read peak, every re-timed slam, the verdict and the last frame, plus fresh 12-frame contact sheets.
- **Renders.** See Open item 5: three frames per MP4 match the stills.
- **Mutations.** 3 of 3 caught (see the top of this file).

**Not changed, and why:**
- **The 2.2 s holds.** After the last VO line each teaser holds its payoff for 2.2 s (the last 0.5 s of 03a and 03b is the loop clear). The verdict stays on screen the whole time, so it is not empty air, and the check pins hold = duration − last VO end.
- **03a's VO deltas.** The VO's "$1,100 less" and "$35 better" are still not on screen. A "vs Monthly" delta row would make the table 4 × 3, which the Live Sheet README says runs without captions. They remain VO-only, as in revision 2. (Superseded by the fixer pass below: they are now typed into the formula bar as working steps, without a delta row.)

### Fixer pass (2026-10-08, round-2 QA)

The round-2 QA scored 03a 6.5, 03b 6 and 03c 8 (numbers all right: 439 checks, MP4s matching the stills). Every must, should and nit is addressed below. Edits are in the three specs and in each kit's `formats/what-difference.js` only (no `lib.js`, `theme.js`, `style.css` or README touched); each format's header comment documents its new options.

| # | Teaser | QA issue | What I did | Where |
|---|---|---|---|---|
| F1 | 03a | **must** Column headers wrap 3-4 lines ("Rounded / up", "every / 2 wks"), the header band taller than the results | Every header is now exactly 2 lines: the name over the bare payment ($750.16, $375.08, $187.54, $200); "Rounded up" is "Round up". The format now prefers a column shape where every name and payment fits on one line at 40 px (here the 46 px gutter), then sets one name size and one payment size across the row. The band is about 110 px instead of about 200 | spec `options[].detail`, `options[3].name`; format header fit |
| F2 | 03a | Payoff cells wrap "72 / months" and stay small | The unit moved into the row label ("Months to pay off"); the cells read 72, ≈ 65, ≈ 65, ≈ 60. New `lookOpts.valueSize: "row"` sizes each value row on its own, so the months row is set at 80 px while the money row keeps the size "≈ $10,000" allows | spec `metrics[0].label`, `values.payoff`; format |
| F3 | 03a | Sheet frozen 0.5-4.2 s and 13.8-18.0 s | New `lookOpts.scan`: on "Guess which one" (2.4 s) the selection hops across the three empty columns, a tick each. A pair read at 16.2 s ("$35") spans both ≈ $8,900 cells and they flash together; the "≈ $35" bar step types at 15.9 s | spec `scan`, `reads[2]`; format |
| F4 | 03a | The "13 payments, not 12" lever is only small mono in the bar | New `lever.options [1, 2]`: at 18.0 s the selection springs onto the Biweekly and Weekly value rows and both columns wash pale yellow while the lever line holds the bar (until the next working types) | spec `lever.options`; format |
| F5 | 03a | The VO's differences ($1,100, $35) never on screen | New `lookOpts.steps`, typed into the bar between the workings: "= $10,000 − $8,900 / ≈ $1,100 less interest" (9.7 s), "≈ $35 less interest / than biweekly" (15.9 s), "= $10,000 − $8,200 / ≈ $1,800 less interest" (27.8 s); each number is typed by the word that speaks it | spec `steps`; format |
| F6 | 03a | The payoff is not the climax (42 px winner cells, the $44,000 input the biggest number) | The winner's ≈ 60 is 80 px; `lookOpts.countCell` counts ≈ $8,200 down from ≈ $10,000 over 0.8 s and settles it from 110%; at 31.0 s both winner cells pop to 110% as the yellow wash reaches them. The verdict is shortened to "Round up to **$200** a week: / **≈ 1 year** sooner" so the card sets at the kit's 56 px maximum (it was about 50); "≈ $1,800 less" stays on screen in the bar under it | spec `countCell`, `verdict.text`; format |
| F7 | 03a | nit: the winner selection flush on the card edge, its corner clipped | The card now keeps a 20 px un-numbered tail under the last row (the README's rule), and a last-column selection is inset 4 px from the card edge | format |
| F8 | 03a | nit: mono "−" reads as a hyphen | The bar sets "−" in Inter (`.wd-op`) | format |
| F9 | 03a | nit: the selection sweep from ≈ 60 to the interest cell strikes through the label row | Down a column (and at the loop clear) the selection now jumps cell to cell instead of sweeping | format |
| F10 | 03b | **must** The headline "≈ 10 years sooner" is never spoken | VO line 7 is now "Same payment: about 10 years sooner." (25.8 s, d 2.6), and ②'s delta lands on "ten" (`deltaT 27.1`) with the winner beat (`data.winnerT 27.1`): it wipes in blue, the pointer lands, the ding. The verdict reads "Same payment, **$0** more: / **≈ 10 years** sooner" (56 px, from about 46). The tagline "The minimum shrinks. Your payment doesn't have to." is dropped. Duration 31.4 → 30.6 s | spec `vo[6]`, `verdict`, `options[1].deltaT`, `winnerT`, `duration` |
| F11 | 03b | ②'s results land 5-6 s before they are spoken; 12.3-16.4 s static | ②'s results now land on their words (`resultT 16.0`, `valueEvery 2.0` → 18.0 s), so the "$0 more" working holds the stage alone during line 4; a new `detail` read (13.0 s, "dollar") pops that working and turns it ink. ③'s payoff lands on "2.2" (23.8 s). VO lines 4-6 start 0.4 s earlier (12.2, 15.6, 21.0) | spec; format (`target: "detail"` reads) |
| F12 | 03b | Cramped rhythm; two yellow $5,000s at frame 1 | The footer is one line, "22% APR · minimum = 1% + interest, $40 floor" ("no new charges" moved to the caption); new `lookOpts.stake: "header"` drops the stake row (the header shows $5,000) and turns the 7.8 s stake read into a re-swipe of the header's highlight; ① is named "The card minimum" so "card" stays on screen; new `lookOpts.gap: 40` keeps at least 40 px between the option blocks (now about 45-60 px) | spec `footer`, `stake`, `gap`, `options[0].name`; format |
| F13 | 03b | At the verdict ②'s delta stays green while ③'s same-size chip sits under it | The winner's delta re-wipes blue at the winner beat (or, as here, lands blue when it lands with it); ③'s delta rests with the other boxes | format |
| F14 | 03b | No visual climax at the verdict | Besides the 56 px verdict, ②'s delta pops as the pointer lands (to 115% at most; here about 106%, clamped so it never touches the name beside it) with a blue ring pulsing off the box | format |
| F15 | 03b | nit: the delta shows as an empty green pill for about 3 frames | Deltas reveal their figure with the wipe (the whole box is clipped by the highlighter's front) | format |
| F16 | 03b | nit: frame 1 shows a lone caret | `noteT −0.15`: frame 1 shows "$14…" typing | spec |
| F17 | 03c | The hero resets to about $0 and counts up in green | The hero now rolls each race from the previous option's landed score: ≈ $587,200 down to ≈ $508,600, then ≈ $508,600 down to ≈ $342,200; the ≈ stays an unlit ghost until it lands (`lookOpts.heroRoll`, default "from") | format |
| F18 | 03c | The last VO line speaks $2.46 but both focal spots say ≈ $78,600 LESS | The hero keeps "≈ $78,600 LESS"; the verdict slot carries the kicker: "+$100 a month: / each $1 saves **≈ $2.46**" | spec `verdict.text` |
| F19 | 03c | nit: "40 months sooner" spoken, never shown | New `lookOpts.labelSteps`: "40 MONTHS SOONER" slams into the label stack at 9.4 s, then ≈ $78,600 LESS at 10.6 s as before; likewise "≈ 11 YEARS SOONER" at 17.4 s before ≈ $245,000 LESS | spec `labelSteps`; format |
| F20 | 03c | nit: frame-1 label stack repeats lane 1's name; "INTEREST" twice | `lookOpts.firstName: false` (frame 1's stack is "$2,742.29 a month" only) and `heads: false` (no board column head; the rows take the room) | spec; format |

**Check:** `checks/03-what-difference.py` is updated for every new string and beat (480 checks, 0 failures): the 03a headers, bare payoff numbers, steps (tokens, a − b = c, typed by their words), pair read, scan, lever columns and counted cell; the 03b VO line 7 ("about 10"), the value beats, the `detail` read and the winner delta on "ten"; the 03c verdict kicker tokens and label steps. Four mutations on scratch copies were all caught (see the top of this file).

**Verification:**
- **Linter:** `check specs/03*.json` 3/3 clean at the default step and at every frame (`--every 0.0333333`). The kits' own what-difference samples stay clean after the three format edits (live-sheet 2 samples + 3 stress specs, clean-sheet 3, scoreboard 2).
- **Stills:** frame 1 of each; 03a at 2.6 (scan), 3.25, 3.9, 10.5 (step), 16.3 (pair read), 19.0 (lever), 23.1-23.7 (count-down), 31.3-31.45 (winner pop), 33.0 and 36.9 (loop jump); 03b at 7.9 (header re-swipe), 13.1 (detail read), 16.1, 18.2, 24.0, 27.2 (delta wipe), 27.7 and 27.8 (pop and ring, clear of the name), 28.5; 03c at 7.2 and 8.0 (roll-down), 9.6 ("40 MONTHS SOONER"), 10.8, 15.2, 17.4, 24.0 (verdict kicker); plus fresh 12-frame contact sheets.
- **Renders:** see Open item 5.

**Not changed, and why:**
- **03a verdict size.** The QA asked for ≥ 60 px; the Live Sheet verdict card tops out at 56 px in `lib.js`, which this pass may not edit. The verdict was shortened so it reaches that 56 px, and the winner column pops as it lands (the QA's alternative).
- **03b ③'s delta** ("≈ 13 years sooner", 24.9 s) still lands without its own VO words; line 6 speaks ③'s "2.2 years", and the delta is the bonus row's difference, toned good rather than goal.
- **03c's verdict-time hero** still counts "≈ $78,600 LESS" up from zero (22.04-23.04 s): it is a new quantity (the saving), not a reset of the interest total.

### Port to Becker Rig (2026-10-08): 03a

The owner kept two looks, Scoreboard and Becker Rig, and retired Clean Sheet and Live Sheet. **03a moved from Live Sheet to Becker Rig**, with the kit's own what-difference samples and the other Becker Rig teasers as the bar.

- **Spec:** `studio/specs/03a-becker-rig-car-loan-weekly.json` (new id `03a-becker-rig-car-loan-weekly`, look `becker-rig`). The old spec was moved with `git mv` to `studio/specs/retired/03a-live-sheet-car-loan-weekly.json`.
- **Kept exactly:** the header (the hook), all eight VO lines and their times, the verdict, every number, the four options and their wake times (0.0 / 8.0 / 13.0 / 23.0 s, each on the word that names it), the lever (18.0 s, the Biweekly and Weekly lanes), the scan (2.4 s, "Guess"), the reads at 4.2 ("72"), 5.8 ("$10,000") and 16.2 s (the pair, "$35"), the count-down, the 37.2 s runtime, the caption and the pinned comment.
- **Changed because the look needs it:**
  - **Footer:** "ASSUMES daily interest, posted when paid" → "Daily interest, posted when paid". The Becker Rig footer is mono 40 px; the old 40-character line wrapped with "paid" alone on its second line and took 48 px from the four lanes. The 32-character line fits on one. (Other Becker Rig footers drop "ASSUMES" too: 02a, 04b, 05a, 06c, 07b, 08b.)
  - **Payoff landings (`option.resultT`, new):** in this kit `option.t` is when a lane wakes, and at the shared run speed the crates landed 1.2-1.3 s after the VO spoke their numbers (Biweekly's showed "16" months on "sixty-five"). Each crate now lands on its number: ≈ 65 at 9.0 s, ≈ 65 at 14.0 s, ≈ 60 at 27.2 s. Round up wakes on "round" (23.0 s) and lands on "sixty" (27.2 s), so the kit's long lead-in plays as a strain: he leans into the "?" crate, it trembles and holds, then gives at 25.7 s (rounding up is the extra push). Its ≈ $8,200 counts down from ≈ $10,000 and settles on "$1,800" (28.45 s).
  - **Working-slot steps re-timed:** the Becker slot pops whole lines (Live Sheet typed them), so each step now appears just before the word that speaks its number: 9.7 → 10.2 s ("$1,100"), 15.9 → 16.0 s ("$35"), 27.8 → 28.2 s ("$1,800"). One step is added at 31.2 s, "= $187.54 + $12.46 = $200 a week" (the round-up working, already shown at 23.0 s), on "about $12 more a week".
  - **Reads:** the two Live Sheet reads on Round up's cells (27.2 s "60", 28.4 s "$1,800") are dropped: the crate's landing and the count-down's settle now fall on those words.
  - **`lookOpts`:** `valueSize` dropped (the Becker kit does not read it); `formulas`, `lever`, `steps`, `scan`, `reads` and `countCell` carry over (the Becker module reads the Live Sheet keys as they are).
- **Look notes:** the beat sheet above is rewritten for the kit: the time-axis lanes (the crate's travel is the payoff time, the green strip the time saved), the figure acts (hop on the scan, lean and drive, slam and fist, the shrug on Weekly's equal result, the nod on the lever, the strain on round-up, the jump and the V on the gold plate), and no loop clear.
- **Format module:** `looks/becker-rig/formats/what-difference.js` is unchanged.
- **Check script** (`checks/03-what-difference.py`): the new id; Becker Rig landings are `option.resultT` (wake = `option.t`, on its naming word, with at least 0.77 s to the landing so the kit keeps the wake on it); `value_beats` put each crate on its number (within 0.25 s); slot steps are checked as on screen by their word and at most 0.8 s early (no typing model), and every slot line holds at least 2 s; the count-down settles on "$1,800" and drops by exactly the shown $1,800; the footer is one line (36 characters at most); the new step's tokens. **Result: 509 checks, 0 failures** (with 03b's port checks). Mutations on scratch copies: see the top of this file.
- **Verification:** `node src/cli.mjs check` clean (0 errors, 0 warnings) at the default step and at every frame, and the three Becker Rig what-difference samples clean. A 12-frame contact sheet and stills at 0, 2.6 (scan), 4.3 (read), 8.6, 9.05 (landing), 9.6, 10.4, 14.05, 15.3, 16.3 (pair read), 18.6 (lever), 24.5 (strain), 26.0, 27.25 (landing), 28.5 (count-down settled), 31.1 (impact), 31.5, 31.6 and 37.17 s were read by eye. Every number on screen (the hook's $44,000; 7% APR, 72 months; the four payments; 72, ≈ 65, ≈ 65, ≈ 60; ≈ $10,000, ≈ $8,900 twice, ≈ $8,200; every slot line; the verdict) matches the check. MP4 rendered to `studio/out/03a-becker-rig-car-loan-weekly.mp4`; frames pulled at 0, 16.3 and 31.6 s match the stills (see Open item 5).
- **Not changed (outside this pass's files):** `teasers/v2/teasers.json` still lists 03a as `03a-live-sheet-car-loan-weekly` (spec, `renders/v2/` MP4, and the 388-check result); `slate.json` has no 03 entry.

### Port to Scoreboard (2026-10-08): 03b

**03b moved from Clean Sheet to Scoreboard**, with 03c (the Scoreboard what-difference teaser) as the bar.

- **Spec:** `studio/specs/03b-scoreboard-card-minimum.json` (new id `03b-scoreboard-card-minimum`, look `scoreboard`). The old spec was moved with `git mv` to `studio/specs/retired/03b-clean-sheet-card-minimum.json`.
- **Kept exactly:** the header (the hook), all seven VO lines and their times, the verdict, every number, the footer, the three options (names, workings, values, deltas, tones), the cuts (9.6 and 21.0 s), the landings on "4.8" (16.0 s) and "2.2" (23.8 s), the winner's "≈ 10 years sooner" on "ten" (27.1 s), the 30.6 s runtime, the caption and the pinned comment.
- **Changed because the look needs it:**
  - **The hero is the payoff time** (`lookOpts.counter: "payoff"`): the Scoreboard's one focal number is the hero, and 03b's shock is time (the hook's first spoken number is "15 years"; the md models it on H71's red "25 YEARS"). So frame 1 opens on "PAID OFF IN ≈ 15.1 YEARS" in red, each race rolls it down (≈ 4.8, ≈ 2.2 years), and the interest values sit in the rows.
  - **Option 1 (the minimum):** `t −3.0` / `resultT −2.4` → `t 0.0` / `resultT 0.0` (the Scoreboard's frame-1 landing, as 03c). Its typed `note` ("$142.59 → $99.66 by year 3", `noteT −0.15`) becomes the label stack's line 2 at frame 1 (`lookOpts.labelSteps[0]`, t 0.0): the same string, on screen from frame 1 instead of typing in by 1.3 s, so the hook's "shrink in numbers within 1.5 s" holds.
  - **Option 2:** `valueEvery 2.0` dropped (the Scoreboard posts both values with the race's landing); ≈ $3,100 now lands with ≈ 4.8 years at 16.0 s and bumps on "$3,100" (a cell read at 18.0 s).
  - **`lookOpts.keepSpeed: true` (new):** with a `resultT` 6.4 s after its cut, the kit stretched option 2's race into a 6 s crawl, so the hero sat on unverified figures ("7.6 YEARS" at 13.2 s) under "Not a dollar more…". Now the bar waits, lit but empty, and races at the shared speed (15.24-16.0 s).
  - **Reads:** the hero bumps on "fifteen" (2.4 s); row cells bump and glow on "$7,300" (5.0 s) and "$3,100" (18.0 s). The Clean Sheet reads on "dollar" (the "$0 more" working) and on "More than you owed" (the header's $5,000 re-swipe) have no Scoreboard target, so they became label steps: "More than the $5,000 owed" on "More" (7.8 s, red) and "$0 more than the first minimum" on "dollar" (13.0 s, green). Both are new display strings built from shown numbers ($5,000; $0) and are checked.
  - **The winner's payoff:** `data.winnerT 27.1` (as before) now means the hero lands "≈ 10 YEARS SOONER" on "ten", under the tag "PAID OFF" (`lookOpts.endTag`); its 1 s roll and the board's winner beat start at 26.06 s, after the verdict (25.8 s). Option 2's `deltaT 27.1` stays (its label-stack slot has yielded to the verdict, so the hero carries it; its pop is the landing's sound). Option 3's delta "≈ 13 years sooner" slams into the label stack at the kit default (24.35 s). (Superseded by the port-QA fixer pass, F26-F27: no option deltas; the hero rolls ≈ 15.1 → ≈ 4.8 on "ten".)
  - **`lookOpts`:** Clean Sheet's `stake`, `gap` and its `reads` are dropped; `intro: false` added (the frame-1 race, as 03c).
- **Format changes** (`looks/scoreboard/formats/what-difference.js` only; its header comment documents them): `keepSpeed`; cell reads (`reads: [{ t, option, metric }]`, the bar label too); `endTag`; `data.winnerT` (the payoff lands on it, the roll starts 1.04 s before but not before `verdict.t`); and the hero's roll to a duration delta when the hero's metric is a duration (as a money delta on a money hero). All are opt-in: 03c and both samples render pixel-identical (26 of 26 frames at 0, 1.2, 7.5, 9.0, 10.7, 15.5, 18.7, 22.5, 23.2 and 27 s, and the end).
- **Check script:** the new id; the Scoreboard landing is `option.resultT` and its cut (`option.t`) sits on the naming word ("keep", "flat"); `value_beats` put the races on "4.8" and "2.2"; the hero read accepts the whole-unit rounding ("fifteen" for ≈ 15.1 years); cell reads must mark a value already posted; label steps (frame 1, "More", "dollar", each while its option holds the stack; interest > stake; the "$0 more" working); `keepSpeed` with every race starting after its cut + 0.35 s; the held delta: counter = payoff, a duration delta, `winnerT` = `deltaT`, the roll starting after the verdict; `endTag`. The note's expectation moved from `data.options[0].note` to `lookOpts.labelSteps[0].text` (the same string). **Result: 509 checks, 0 failures.**
- **Verification:** `node src/cli.mjs check` clean (0 errors, 0 warnings) at the default step and at every frame. A 12-frame contact sheet and stills at 0, 2.5, 4.9, 5.1 (the cell read), 7.9, 9.7, 13.1, 15.6 (mid-race), 16.05, 16.1, 18.1 (the cell read), 23.0, 24.5, 26.0, 26.6 (mid-roll), 27.15, 27.5 and 30.5 s were read by eye. Every number on screen (the hook's $5,000; the footer's 22%, 1% and $40; the hero's ≈ 15.1 / ≈ 4.8 / ≈ 2.2 years and ≈ 10 years sooner; ≈ $7,300, ≈ $3,100, ≈ $1,300 and the three bar labels; $142.59, $250, $107.41, $0 and $99.66 in the label stack; ≈ 13 years sooner; the verdict) matches the check. MP4 rendered to `studio/out/03b-scoreboard-card-minimum.mp4`; frames pulled at 0, 16.1 and 27.5 s match the stills (see Open item 5).
- **Not changed (outside this pass's files):** `teasers/v2/teasers.json` still lists 03b as `03b-clean-sheet-card-minimum`; the new MP4s are in `studio/out/`, not yet copied to `renders/v2/`.

### Fixer pass (2026-10-08, port QA)

The port QA scored 03a 7.5 and 03b 8 (509 checks, 0 failures; both specs lint-clean; no must). Every should and nit is addressed below. Edits are in the two specs, the two kits' `formats/what-difference.js` (each header comment documents what changed), this file and the check. No hook, VO line, number or verdict changed.

| # | Teaser | QA issue | What I did | Where |
|---|---|---|---|---|
| F21 | 03a | **should** Frozen 5.4 s from 31.8 s to the end; "about a year sooner" has no beat and no working line | New slot step at 33.9 s: "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" (the two crates on screen; "≈" because 60 is rounded, the exact gap is 11.93 months). New read at 34.2 s ("year"): the gold ≈ 60 crate pulses, its time-saved strip thickens again, the new "≈ 12 mo" banner (F23) pulses and the winner hops. The winner's celebration wave now settles to a smaller one that keeps going through the hold instead of dying out | spec `steps[4]`, `reads[4]`; format (the lasting wave, a hop and a strip pulse on a later read) |
| F22 | 03a | **should** 3 s still during the lever line; "not twelve" gets no beat | A second lever beat on "thirteen" (`lever.beats: [19.6]`: both 13-payment lanes bump, pulse and nod again, swipe), and a read of Monthly's 72 crate on "twelve" (22.0 s): his crate pulses and his figure turns green as the two 13-payment figures turn back to slate, so 13 against 12 is two lanes against one | spec `lever.beats`, `reads[3]`; format (`lever.beats`) |
| F23 | 03a | **should** The crate-travel picture barely shows "about a year" (crates 40 px apart, strips 20-40 px) | **Run length:** tested and not changed. The axis is honest from zero, and in the col layout the run (240 px) ends where the figure behind the longest crate meets the money column. The row layout (a still at 33 s, in scratch) doubles it to 560 px, but the figures drop from 0.51 to 0.30 (smaller than the crates) and the money from 64 to 48 px. Narrowing the title column gains at most 26 px ("Round up" would wrap to 3 lines in a 151 px lane). A per-lane far side (each figure clear of its own lane's value) gained 10 px but crowded the kit samples' figures against their values, so it was reverted. **The time saved is now an object instead:** new `lookOpts.gapLabel` "≈ 12 mo". At 31.45 s the winner's pennant unfurls into a green banner pointed at the far side, carrying the label over his thickened strip, and it pulses on the read at 34.2 s. Together with the slot step (F21), "about a year" is a number on the lane, a working line and a beat | spec `gapLabel`; format (`gapLabel`) |
| F24 | 03a | nit: the winner lane is cramped (the plate about 7 px under the lane line, about 4 px over the crate and touching its pennant) | The plate now hugs its value (the ink box measured from the font, a 5 px border, 1 px of air). The value grows to 1.15x only when the plate then clears the line above and the crate (and pennant) under it by at least 14 px; otherwise to 1.08x, or not at all when 1.08x would leave under 4 px. It then shifts up to 6 px to centre the plate in the gap. Here it does not grow (1.08x would leave about 2 px) and clears by 6 px above and 4 px below. The pennant under a plate now flies level with the crate's top instead of poking into the plate. 14 px is not reachable: the 151 px lane holds a 64 px value over a 56 px crate whose face is already at its 41 px floor | format |
| F25 | 03a | nit: the hook is frozen from 0.5 to 2.4 s | New `lookOpts.pat` at 1.4 s ("this loan"): the three waiting figures lift the hand resting on their crate and drop it back, top lane first, 0.08 s apart, looking down at it. Each "?" crate swells a little on contact with a soft tick. It ends at 1.9 s, before the scan's hops at 2.4 s | spec `pat`; format (`pat`) |
| F26 | 03b | **should** The climax is duplicated and spoiled early: the verdict says "≈ 10 YEARS SOONER" at 25.8 s, then the hero lands the same words at 27.1 s | QA's option B, the 03c split (F18). Option ②'s delta and `deltaT` are removed, and so is `lookOpts.endTag`. New `lookOpts.heroEnd: "value"`: at the winner beat (26.06 s, after the verdict) the hero jumps back to ①'s red ≈ 15.1 YEARS, rolls down to ②'s own ≈ 4.8 YEARS (turning green as it goes) and lands on "ten" (`data.winnerT 27.1`, unchanged). The verdict alone says "≈ 10 years sooner", and the hero proves it with the motion: the shown 15.1 − 4.8 = 10.3 rounds to the verdict's ≈ 10. The finished board has one "10 years" (the verdict), and the hero reads "PAID OFF IN ≈ 4.8 YEARS" | spec; format (`heroEnd`) |
| F27 | 03b | **should** ③'s unspoken "≈ 13 YEARS SOONER" slams at 72 px before the verdict and upstages its 10 | ③'s delta is removed. The label stack keeps "$250 − $142.59 = $107.41 more" / "A FLAT $250" until the verdict, and ③'s bar label ≈ 2.2 YEARS and ≈ $1,300 already show it is fastest. The ≈ 13 is now a write-up claim in the check (12.92, and the shown 15.1 − 2.2 = 12.9 rounds the same), and the check asserts that "13 years" appears nowhere on screen | spec; check |
| F28 | 03b | nit: ②'s bar label jumps from outside to inside the bar two frames before landing | On two-line rows the label's side is now decided once, from the landed bar. A label that ends inside waits at the track's start until the bar's end reaches it, then rides inside it (the bar's bright edge dims while it passes under the label). A label that ends outside rides just past the end the whole way. No label switches sides mid-race. This changes 03c's races too (its labels used to ride outside, then jump in); 03c stays lint-clean and was re-rendered | format |
| F29 | 03b | nit: the "$7,300" cell read is a weak 10% bump while two big red numbers compete | Cell reads now swell 16% (less where a cell has less room; 15.7% on both 03b cells), held for 0.3 s (up in 0.08 s, down in 0.25 s), with the glow held as long. The label stack steps back to 55% opacity during a cell read. The frame-1 label step "$142.59 → $99.66 BY YEAR 3" is one size down (`labelSteps[0].small`, ×0.88), so the 140 px hero is clearly the focal number | spec `labelSteps[0].small`; format |
| F30 | kit samples | (found while linting) Two Becker Rig what-difference samples failed one frame each when linted at every frame: a flag dropping through a row title (6.60 s) and green text on a gold plate as the plate opened (16.17 s) | Under a title row the flag now drops from just below the row. The winner's value turns ink from the moment its plate starts to open | format |

**Check:** `checks/03-what-difference.py` gives **525 checks, 0 failures** (509 before). New rows cover the following:
- 03a: the new step's tokens; its a − b = c; a and b are the two crates on screen; its "≈" is honest; and 12 months = ≈ 1 year.
- 03a: the step is on screen by "year", no more than 0.8 s early.
- 03a: the gap label is the same ≈ 12 in the crate metric's unit.
- 03a: the "twelve" read marks Monthly (outside the lever), and the "year" read marks the winner's crate (shown 72 − 60 = 12).
- 03a: the lever beat is on "thirteen", and the pat is on "this" and ends before the scan.
- 03b: no option delta; `heroEnd` "value" with no `endTag`; `winnerT` on "ten"; the roll starts after the verdict; the shown 15.1 − 4.8 rounds to the verdict's ≈ 10; the small frame-1 step; no "13 years" on screen; and the write-up's ≈ 13.

Eight mutations on scratch copies were all caught (see the top of this file).

**Verification:**
- **Linter:** `check specs/03*.json` 3/3 clean at the default step and at every frame. The kits' samples are clean at every frame (Becker Rig 3, Scoreboard 2).
- **Stills and contact sheets:** I read 16-frame contact sheets of both teasers, plus these stills:
  - 03a at 0, 1.3 and 1.65 (the pat), 19.75 (the lever beat), 22.15 (the "twelve" read), 31.5 (the banner unfurling), 33.0, 34.3 (the "year" read and hop) and 37.17 s;
  - 03b at 0, 5.15 (the cell read with the label stack stepped back), 15.5-16.05 (the label waiting, then riding inside), 26.1 (red 15.1 again), 26.6 (mid-roll), 27.15 and 30.57 s;
  - 03c at 7.2-8.5 and 15.6-16.0 s (its races under the new label rule).
- **Renders:** see Open item 5.
- **Motion:** frame-differencing the new 03a MP4 finds no still stretch longer than 2.0 s. The measure ignores the caption band and counts a frame as still when fewer than 40 quarter-resolution pixels change by more than 12 levels. Before this pass the longest were 4.5 s (18.4-22.9 s), 3.6 s (the end) and 1.6 s (after the hook). The reference Becker Rig renders measure 2.0 s (05b) and 1.2 s (09b) by the same rule.

### Condensed cut (2026-10-13): 03a, 03b, 03c

*(The editor's entry. The fixer pass below retimed 03a and moved a few 03b/03c beats; its entry supersedes this one's 03a timeline, the measurements, the render, sound and verify results and the check counts. "To promote" here is kept current.)*

**Owner's note:** "Too many still moments are a killer for a short. Condense the rest. The CTA (end card) is good." The 06c and 06b condensed cuts of 2026-10-12 are the precedent (`06-pov-race.md`, "Condensed cut" and "Opening hold fix and re-ship"), and their rules were applied: keep the hook, every number, the verdict wording, the facts and the end card; frame 1 is the thumbnail, with the hook caption complete and something moving from frame 2; no still run of 0.4 s or more before the verdict hold (frame difference at 270×480, `tblend` difference → `signalstats` YAVG, still when YAVG < 0.15, near-still under 0.25); captions up at least max(1.2 s, 0.12 s a word); the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s; a teaser as short as its story allows.

**Files:**
- New: `studio/specs-wip/03a-becker-rig-car-loan-weekly.json`, `studio/specs-wip/03b-scoreboard-card-minimum.json` and `studio/specs-wip/03c-scoreboard-mortgage-extra-100.json`, retimed copies of the round-2 specs.
- Changed: this write-up (the three beat sheets and caption tables, the header, the at-a-glance runtimes, the cover times in the platform notes, Open items 5-6 and this entry); `checks/03-what-difference.py` (cut-aware, `--spec`); one opt-in kit option, `lookOpts.readHold` in `studio/looks/scoreboard/formats/what-difference.js`, documented in that file's header and in the what-difference table of `studio/looks/scoreboard/README.md`.
- Not touched: `studio/specs/*.json`, every other kit file (no `lib.js`, `theme.js`, `style.css`, `cta.js`, `kit.js`, no other format, nothing in Becker Rig), `studio/src/`, `studio/sound/` and the packs, `studio/test/`, `publishing/` and `renders/`. Renders are in `/tmp/cond/03/<id>/` only. Nothing is committed.

**Kept, character for character:** the headers, footers and stakes; every option's name, detail, values, delta and tone; the verdicts; every caption word (the round-2 VO lines); the formulas, the lever, the working steps, the label steps, the footer steps and the gap label; 03a's count-down, lever lanes and winner beat; 03b's `heroEnd: "value"`, `keepSpeed`, frame-1 note and winner roll; 03c's `firstName`/`heads` and verdict kicker; and the 2.5 s end card (the brand layer is untouched). Beyond the clock, three small things changed, one per teaser:
- **03a** drops the round-2 `steps[3]` ("= $187.54 + $12.46 = $200 a week" again at the verdict, for the caption the verdict card hides; Round up's own working shows the same line from its wake) and the pat (see Iteration); `formulas[2]` gets its own `t`. (Fixer pass: `steps[3]` is back at the verdict, and `formulas[0]` and `formulas[1]` get their own `t` too.)
- **03b** re-slams its frame-1 note "$142.59 → $99.66 by year 3" on "Because it shrinks." (a second label step with the same string, one size down).
- **03c** merges its first two captions word for word: "Interest alone: about $587,200. More than the loan."

**Measured before** (`renders/channel/`, the round-2 cuts plus the card; `/tmp/cond/03/before/`):

| | Still runs ≥ 0.4 s before the verdict | Longest | Verdict → card |
|---|---|---|---|
| 03a (verdict 31.0 s) | 11 runs: 0.37-1.90, 1.93-2.53, 4.50-5.83, 6.27-7.83, 10.50-12.83, 14.93-15.93, 16.67-17.83, 18.43-19.63, 20.03-22.43, 23.30-25.80, 28.77-30.83 | 2.50 s (23.30-25.80, the strain) | 6.2 s, still 31.67-33.83 and 34.30-37.23 |
| 03b (verdict 25.8 s) | 14 runs, from 0.57-2.40 to 24.20-25.57 | 2.00 s (10.17-12.17) | 4.8 s, still 27.67-28.57 and 28.60-30.63 |
| 03c (verdict 22.0 s) | 11 runs, from 0.40-1.20 to 19.83-21.97 | 2.13 s (19.83-21.97) | 7.8 s, still 23.53-27.77 and 27.80-29.83 |

Each was a board that had finished its beat while a narration-paced line (2.4-5.6 s) played out over it.

**03a (Becker Rig):**

| | Round-2 cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 37.2 / 39.7 s | **15.25 / 17.75 s** | The brief, and the story's own pace: eight captions at reading speed, four lanes, the lever and the winner |
| Captions | narration-paced, 0.0-35.0 s | reading-paced, −0.5 to 13.6 s, 0.05 s apart; the verdict's line at 13.65 (the card replaces it, as before) | vo[0] at −0.5: the kit pre-types a line that starts early enough, so the hook is complete on frame 1 |
| `lookOpts.race` | 1.8 (default) | **1.2** | Runs of 1.0-1.08 s: the crates move fast enough to read as a race of time |
| Wake → landing | 8.0 → 9.0, 13.0 → 14.0, 23.0 → 27.2 (a 2 s strain) | **2.95 → 4.45, 5.3 → 6.8, 10.1 → 11.6** | Each lane wakes as its caption goes up and lands 1.5 s later at the shared speed; no strain (it registers as no motion: YAVG 0.03-0.08) |
| Scan / pat | scan 2.4 (0.4 apart), pat 1.4 | **scan 0.03 (0.45 apart)**, no pat | The hops move the frame from frame 2 (YAVG 0.13-0.23). The pat does not register at this figure size (0.02-0.04) and has no spoken "this loan" to land on |
| Reads | 4.2, 5.8, 16.2 (pair), 22.0, 34.2 | **1.75, 2.35, 7.5 (pair), 9.75, 13.25, 14.45** | Each inside the caption that carries its number. New: ≈ $8,200 on "About $1,800 less" (13.25), between the settled count-down and the verdict |
| Lever / beats | 18.0 / 19.6 | **8.25 / 8.85, 9.35** | A second beat keeps the two 13-payment lanes moving through the 1.8 s caption |
| Steps | 10.2, 16.0, 28.2, 31.2, 33.9 | **4.95, 7.25, 12.85, 14.0** (`steps[3]` dropped) | Each after the value it cites; the slot holds every line ≥ 1.0 s |
| `formulas[2]` | at Weekly's wake | **`{ t: 6.15 }`** | The $1,100 step stays up 1.2 s before Weekly's working replaces it |
| Verdict | 31.0 (2.55 s after the count settles), held 6.2 s | **13.65 (0.8 s after), held 1.6 s** | The brief |

**03b (Scoreboard):**

| | Round-2 cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 30.6 / 33.1 s | **11.65 / 14.15 s** | |
| Captions | 0.0-28.4 s | −0.4 to 11.45 s, 0.05 s apart | vo[0] at −0.4: the Scoreboard line has finished its 0.14 s rise by frame 1 |
| Cuts / landings | 9.6 / 16.0, 21.0 / 23.8 | **3.15 / 6.05, 7.65 / 9.15** | |
| `lookOpts.race` | 2.4 (② raced 0.76 s after waiting 5.3 s lit but empty) | **8** (② 2.54 s, ③ 1.15 s, one shared speed) | ②'s bar races from 0.35 s after its cut under "Now keep paying…" and "Not a dollar more…", so those 2.8 s move; `keepSpeed` stays on |
| Label steps | 0.0 (note), 7.8, 13.0 | **0.0, 1.05 (the note again), 2.15, 4.65** | |
| Reads | hero 2.4; ① interest 5.0; ② interest 18.0 | **hero 0.5; ① interest 1.55 and 2.6; ② bar label 6.45 and interest 6.95; ③ bar label 9.55** | Five beats in the 3.15 s before the lever, and two after each landing |
| `readHold` | (0.3) | **0.15** | See below |
| Verdict / winner roll | 25.8 (2.0 s after ③ lands), held 4.8 s; the hero lands at 27.1 | **10.05 (0.9 s after), held 1.6 s; lands at 10.95** (`data.winnerT`) | |

**03c (Scoreboard):**

| | Round-2 cut | Condensed cut | Why |
|---|---|---|---|
| Body / total | 29.8 / 32.3 s | **12.85 / 15.35 s** | |
| Captions | 7 lines, 0.0-27.6 s | **6** (the first two merged word for word), −0.4 to 12.65 s | Two 1.2 s captions at the opening needed five beats in 2.4 s; one 1.95 s caption needs three |
| Cuts / landings | 6.4 / 8.89, 14.4 / 16.28 | **2.0 / 4.49, 6.95 / 8.83** | Races at the kit's shared speed (2.14 s and 1.53 s), each under its "Add …" caption |
| Label steps / deltas | 9.4 / 10.6, 17.4 / 18.6 | **5.35 / 5.9, 9.7 / 10.25** | Each delta up ≥ 1.0 s before the next cut |
| Footer steps | 4.6, 6.4, 14.4, 22.0 | **1.0**, 2.0, 6.95, 11.25 | The working of "More than the loan" now sits inside the merged caption, with the row-1 read |
| Reads | hero 1.2 | **hero 0.45; ① interest 1.0; hero 1.55; ② bar label 4.8; hero 6.45; ③ bar label 9.15; hero 10.75** | After each landing: the bar label (the "sooner" years), the label step, the delta, then the hero (the new interest, "less interest") |
| `readHold` | (0.3) | **0.15** | See below |
| Verdict / hero payoff | 22.0 (3.4 s after the last delta), held 7.8 s; lands ≈ 23.04 | **11.25 (1.0 s after), held 1.6 s; lands at 11.95** (`data.winnerT`) | |

**Why a kit option, and only for Scoreboard.** On the Scoreboard board the motion between beats is discrete: a hero read registers for about 0.25 s, a slam for about 0.22 s, and a cell read swells in 0.08 s, **holds 0.3 s at its peak** and eases out over 0.25 s. With a beat every 0.5 s the held peak alone left near-still runs of exactly 0.40 s (03c draft at 5.73-6.13, 03b drafts at 1.80-2.20 and 7.23-7.63). `lookOpts.readHold` (seconds, 0.05-0.3) sets that hold; at 0.15 a read is up, held and down in 0.48 s and still reads as a swell. Hero reads are unchanged and no cue moves. **Default unchanged:** with the option absent the module keeps the old expression (`t0 + 0.38`, not a recomputed sum), and before and after the edit the cue records (`node src/cli.mjs cues`) of `specs/03b-*.json`, `specs/03c-*.json` and both Scoreboard what-difference samples are byte-identical, and so are their stills at 0, 2.4, 5.1, 13.1, 18.1 and 27.0 s (24 PNGs; 5.1 and 18.1 fall inside 03b's round-2 cell reads). Becker Rig needed no kit change.

**Iteration.**
- 03c, spec only, narration-like holds after each beat: still runs of 0.47-0.67 s between a delta and the next cut (v1). Each caption needed two or three beats, so the reads above were added; with two 1.2 s opening captions the opening still needed five beats in 2.4 s, so the two captions were merged.
- Scoreboard cell reads with the 0.3 s hold: near-still runs of exactly 0.40 s at every cell read; `readHold` 0.15 cleared them.
- 03b: a read of row 1's full-length bar label swelled past the right rail ("years" at x 955 > 940, a lint error at 1.00-1.27 s), so that beat became the note's re-slam on "Because it shrinks."
- 03a: at the col layout's figure size (0.51, in 151 px lanes) the pat, the strain and Monthly's crate reads barely register (YAVG 0.02-0.10), while the scan's hops (0.13-0.23), lane wakes, runs, landings, slot lines, lever beats and value reads do. So the scan moved to frame 2, the pat went, the lever got a second beat and ≈ $8,200 got a read. Two check rules then moved the picture: the motion proxy flagged 0.45 s after the pair read (moved 7.4 → 7.5 s) and the $35 step's 0.9 s in the slot (the lever moved 8.15 → 8.25 s).

**Measured after** (`/tmp/cond/03/<id>/final/<id>.mp4`, same method; `/tmp/cond/03/<id>/motion.txt`):

| | Before the verdict: still runs ≥ 0.2 s (none reaches 0.4) | Near-still (< 0.25) before the verdict, ≥ 0.4 s | Verdict hold, card | Frame 1 |
|---|---|---|---|---|
| 03a (verdict 13.65) | 1.37-1.67, 2.10-2.40, 4.53-4.87 (0.33), 6.90-7.20, 7.97-8.20, 9.80-10.03 | 0.03-1.70 (the scan's three hops), 2.07-2.90 (the ≈ $10,000 read), 12.17-12.80 (the count-down and Round up's recoil), 13.17-13.63 (the ≈ $8,200 read) | 14.33-15.27 (the winner's small wave), card 16.47-17.77 | the first hop from frame 2 (YAVG 0.04 → 0.12-0.14 → 0.21 at 0.17 s; the only still run there is 0.03-0.17, 0.13 s) |
| 03b (verdict 10.05) | 0.80-1.00, 1.17-1.50, 2.27-2.63 (0.37), 2.70-2.93, 7.40-7.67 | none (longest 0.37: 0.70-1.07 and 2.27-2.63) | 11.33-11.63, card 13.13-14.17 | moving from 0.033 s (the frame-1 landing settles: YAVG ≈ 3) |
| 03c (verdict 11.25) | 0.73-1.00, 1.77-2.00, 4.90-5.10, 5.60-5.90 (0.30), 6.23-6.47, 9.93-10.20, 10.50-10.77 | none (longest 0.37: 0.63-1.00) | 12.43-12.80, card 14.33-15.37 | moving from 0.033 s (as 03b) |

The longest still before the verdict is now **0.33 s (03a), 0.37 s (03b) and 0.30 s (03c)** (was 2.50, 2.00 and 2.13 s). In 03a the near-still stretches (YAVG 0.15-0.25) are real motion of small things: three figures hopping, a value bumping and flashing, the money value counting down while its figure recoils. Nowhere does only a caption change.

**Stills read** (`node src/cli.mjs stills`, 24-30 per teaser at every beat, tiled into `/tmp/cond/03/<id>/sheet.png`): 03a at 0, 0.033, 0.25, 0.7, 1.15, 1.8, 2.4, 3.0, 3.5, 4.45, 4.95, 5.4, 6.15, 6.8, 7.3, 7.55, 8.3, 8.9, 9.4, 9.8, 10.2, 10.8, 11.6, 12.1, 12.85, 13.3, 13.7, 14.05, 14.5 and 15.2 s; 03b at 0, 0.033, 0.5, 1.05, 1.2, 1.6, 2.15, 2.3, 2.65, 3.2, 3.6, 4.2, 4.7, 5.3, 6.05, 6.5, 7.0, 7.65, 8.2, 9.15, 9.6, 10.05, 10.5, 10.95, 11.6 s and the end; 03c at 0, 0.033, 0.5, 1.05, 1.6, 2.05, 3.2, 4.5, 4.85, 5.4, 5.95, 6.5, 7.0, 8.0, 8.85, 9.2, 9.75, 10.3, 10.8, 11.3, 11.6, 12.0, 12.8 s and the end.
- Frame 1 of each is the round-2 thumbnail with the complete hook caption: 03a's four lanes with Monthly run and three "?" crates; 03b's red "PAID OFF IN ≈ 15.1 YEARS" over the minimum's row and the shrink note; 03c's red "INTEREST ≈ $587,200" over the 30-year bar, with "Interest alone: about $587,200. More than the loan." under it.
- Every landed value, label step, delta, slot line and verdict matches the maths tables. Running values pass through unverified figures with the "≈" unlit, as before (03a's crate faces and the ≈ $8,200 count-down; 03b's hero "14.5 YEARS" … "6.1 YEARS" during ②'s 2.54 s race, and its winner roll "10.5 YEARS"; 03c's "$546,279", "$400,921" and the payoff's "$66,878 LESS").
- During a cell read the label stack steps back to 55%, by the kit's design: in 03b the second ≈ $7,300 read (2.6 s) dims "MORE THAN THE $5,000 OWED" for 0.48 s, which is the compare beat (the interest cell against the $5,000 in the label).
- 03a's slot shows each working line whole; at a pop frame (4.95, 12.85) the slot is empty for a frame, as in the round-2 cut. The verdict card takes the caption band at 13.65.

**Lint:** `node src/cli.mjs check` on the three WIP specs gives 0 errors and 0 warnings at the default step and at every frame (`--every 0.0333333`): 03a 17.75 s = 15.25 + 2.5 s end card, 03b 14.15 = 11.65 + 2.5, 03c 15.35 = 12.85 + 2.5. `specs/03*.json` and both Scoreboard what-difference samples are clean after the kit change.

**Render and sound:**
- `render specs-wip/<id>.json`: 03a 533 frames and 34 cues (35 in 37.2 s before); 03b 425 frames, 24 cues (20 before); 03c 461 frames, 25 cues (19 before).
- `sound … --video /tmp/cond/03/<id>/render --out /tmp/cond/03/<id>/final --score`: each video md5 is identical (03a `239b8881e0c5`, 03b `0302dec0ea0e`, 03c `b213d3f2c929`), and each final file is byte-identical to its render. 03a: P 13.65 (verdict + hit), 123.077 BPM throughout. 03b: P 10.05 (verdict), 143.284 BPM to P, 150 after. 03c: P 11.25 (verdict), 149.333 / 150 BPM.

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/03/<id>/final --detail`; full output in `/tmp/cond/03/<id>/verify.txt`): **03a 40/42 (units: Becker U4 5/6), 03b 40/42, 03c 40/42** (the round-2 cuts: 42/42 each, units 2/2, `/tmp/cond/03/before/verify-shipped.txt`). The CUE DRIFT block and "baseline DIFFERS" are expected for a WIP cut. Nothing was changed in the packs, the calibration or `acceptance.json`: the ship step owns sound.
- **03a passes** A1 −14.13 LUFS (master −14.03), A2 −1.20 dBTP against −1 (0.20 to spare), A3 LRA 5.99 (3-8), A4 −10.51 / −7.89 against −8 / −6, **A5 PLR 12.93 against 13 (0.07)**, A7 −11.86, A8 0.89 / 0.58 / −0.47 LU, A10 1.91 against 4.5, A11 2.07% against 3 (max 3.64 dB), HARSH 0.34 against 2, B1 music −2.44, SFX −1.17, SFX − music 1.27 (−2..2), B2 −9 against −8, B3 closest cue 6.9 dB against 3, B4 0.23 ms, B5 0.0 ms, B6 3.2 LU, B7 3.5 / 4.4, B8 logo −11.07 against −13 (payoff −8.94), S9 123.077 BPM, **S12 5 st against 5 (0)**, **S14 12 notes against 12 (0)**, and every other S, TRAIN, DUCK, MALLET and FLAMS row. (Critic: also **BANDS 125 Hz 6.6 in [1, 7], 0.4 to spare**.)
- **03a fails:** (1) **BANDS 8 kHz −4.0 dB re 1 kHz against a ceiling of −5 (1.0 over)**; the other octaves sit inside (31.5 −8.3, 63 4.3, 125 6.6, 250 1.7, 500 2.2, 2k −1.5, 4k −2.7, 16k −15.0); the round-2 cut measured 8 kHz −6.0. Likely cause: 34 cues in a 15.25 s body instead of 35 in 37.2 s, so the bright transients (six swipes, nine ticks, five pops, the coins' rolls, two hits) are about 2.4 times as dense over [0, base]. (2) **S8: the pad's velocity SD is 0.029 against a minimum of 0.03 (0.001 under)**; likely cause: the shorter body gives the pad few events (S2 counts 14), so its humanising barely varies. (3) **U4 (Becker units, computed on this teaser's consecutive same-kind cues): tick max NCC 0.982 against < 0.98**; two consecutive ticks render almost identically. A scratch copy with the scan at 0.1 s failed the same way (A11 then also failed, 3.89%), so it is the pack's tick variation at this spacing of nine ticks, not the frame-2 start.
- **03b passes** A1 −14.16 (master −14.08), A2 −1.36 (0.36 to spare), A3 5.52 (4-9), A4 −11.04 / −9.37, **A5 12.80 against 13 (0.20)**, A7 −9.52, A8 0.77 / 0.51 / −0.70, A10 2.12 against 7, A11 0.11% (max 1.14 dB), HARSH 0.27, B1 music −2.66 (−3.5..−1.5), SFX −4.05 (−5..−2.5), B2 −9, **B3 closest cue 3.8 dB against 3 (0.8)**, B4 0.04 ms, B5 0.0 ms, B6 2.8 LU, B7 3.6 / 4.8, S9 143.284 / 150, S14 12 against 12, DUCK 1.4 dB.
- **03b fails:** (1) **BANDS 125 Hz 1.7 dB re 1 kHz against a floor of 2 (0.3 under)**; 250 Hz 0.3 against 0 passes by 0.3 (the round-2 cut: 125 3.0, 250 2.0). (2) **B8: the logo's M(L+0.2) is −13.23 LUFS against ≥ −13 (0.23 under)**, the payoff −10.86 (the round-2 cut: −11.81 and −10.95).
- **03c passes** A1 −14.10 (master −14.02), **BANDS 63 Hz 4.3 against a floor of 4 (0.3; added after the critic)**, A2 −1.30 (0.30), A3 6.33, A4 −10.84 / −8.77, **A5 12.80 against 13 (0.20)**, A7 −8.77, A8 0.76 / 0.53 / −0.68, A10 2.14, A11 0.57% (max 1.74 dB), HARSH −0.42, B1 −2.61 / −4.03, B2 −9, B3 closest 4.7 dB, B4 0.04 ms, B5 0.0 ms, B6 5.1 LU, B7 4.4 / 5.7, S9 149.333 / 150, S14 12 against 12, DUCK 1.3 dB.
- **03c fails:** (1) **BANDS 125 Hz 0.5 against a floor of 2 (1.5 under) and 250 Hz −0.6 against 0 (0.6 under)** (the round-2 cut: 3.4 and 2.5). (2) **B8: logo −13.35 LUFS against ≥ −13 (0.35 under)**, payoff −10.97 (the round-2 cut: −12.05 and −10.76).
- Likely cause of the Scoreboard failures, the same pattern the 02 editor found on 02b/02c: in a 12-13 s body the SFX (reads' ticks, pops, thuds, rolls and dings, 24-25 cues instead of 19-20) own more of the 1 kHz reference octave while the pads and bass play for less of [0, base], so 125/250 Hz fall against 1 kHz; and the body around the card is denser and louder, so the logo, mastered with the whole file to −14 LUFS, measures 1.2-1.3 LU lower than in the round-2 cuts while the payoff holds. Scoreboard's calibration (GM, LOGO_PRE, BEDS) was fitted on 13-46 s bodies.

**Check (`checks/03-what-difference.py`):**
- `--spec [KEY=]PATH` (repeatable) checks a spec in place of `studio/specs/<id>.json`. The default run is unchanged apart from three new rows that say which cut `studio/specs/` holds.
- **Two cuts**, picked by length: the round-2 cut (37.2 / 30.6 / 29.8 s; what `studio/specs/` holds, `IN_SPECS`) and the condensed cut, whose string expectations are the round-2 ones with the condensed paths (`expect_c`: 03a's `formulas[2].text` and `steps[3]`, 03b's four label steps, 03c's merged first caption). Any other length is held to the condensed rules and fails its lane.
- **New for the condensed cut** (`check_cond`): the lane (14-17 / 10.5-13 / 11.5-14 s); each caption up ≥ max(1.2 s, 0.12 s a word) from frame 1 (03a's last line is the verdict's, which the card replaces); captions back to back (gaps 0-0.2 s); the hook complete on frame 1 (Becker Rig: the last word settled by t = 0; Scoreboard: t ≤ −0.14); each lane wakes or cuts as the caption that names it goes up and lands inside the caption that speaks its payoff; the shared race speed (03a: no wait and no strain; 03b/03c: the kit's own race arithmetic); every read inside the caption it answers, on a value already landed, answering that caption's number (or the shown difference, the "not 12" lane, the winner's "year", interest > stake or > loan, a bar's gap to the 30-year bar); 03a's steps after what they cite and inside their captions, the repeat dropped, a − b = c, the slot holding each line ≥ 1.0 s, the scan from frame 2 and over before the first read, the lever on vo[4] with 1-3 beats, no pat, the count settling inside vo[6]; 03b's four label steps, the race under "Not a dollar more…", and the round-2 winner rules; 03c's merged hook, footer steps, label steps ≥ 0.4 s before their deltas, each delta up ≥ 0.9 s; `readHold` 0.05-0.3; the verdict 0.8-1.5 s after the final reveal (03a: the counted ≈ $8,200 settling; 03b: ③'s landing; 03c: the last delta) and held 1.2-1.6 s; the winner roll 0.44-1.04 s into the hold; and a proxy for the motion audit built from the kits' motion windows (cuts, races, landings, reads, slams, wakes, runs, value drops, slot pops, the lever and the scan's hops), which allows no gap of 0.4 s or more before the verdict (03a 0.38 s, 03b 0.30 s, 03c 0.35 s; the audits measured 0.33, 0.37 and 0.30).
- **Results:** **528 checks, 0 failed by default** (was 525); **551, 0 failed with `--spec` on the three WIP specs**; the round-2 specs pass through `--spec` from outside `studio/specs/` (528, 0 failed). A scratch tree with the WIP specs in place of `studio/specs/` fails exactly the three "studio/specs/ holds the expected cut" rows until `IN_SPECS` is flipped to `"cond"` (then 551, 0 failed).
- **Mutation test** (scratch copies in `/tmp/cond/03/mut/`, `/tmp/cond/03/tools/mutate.py`): **14 of 14 caught**, each with exit 1 and a named failure: 03a vo[0] at 0.0 (a type-on at frame 1), a 21.0 s body, the lever beats removed, the $35 step before its value lands, the scan from 0.5 s; 03b the verdict 1.8 s after the final reveal, "≈ 4.9 years", `readHold` dropped, a 0.4 s caption gap; 03c the row-1 cell read moved to 1.6 s, the +$100 delta 0.15 s after its label step, a 1.0 s caption, a 2.2 s verdict hold, "$587,300" in the hook caption.

**To promote** (the ship step; step 1 was done on 2026-10-13, see "Promoted (2026-10-13)" at the end of this log):
1. Copy the three WIP specs over `studio/specs/` and set `IN_SPECS` to `"cond"` in the check (528 → 565 checks by default, after the fixer pass).
2. Follow BIBLE §11.1 for the three moved records: refit Becker Rig's `MODEL` (§11.2) for 03a and re-measure the Scoreboard calibration for 03b/03c; settle the failures at pack level (after the fixer pass: 03a A11, BANDS 125 Hz and 8 kHz, S8 pad; 03b BANDS 125 Hz and B8; 03c BANDS 125/250 Hz and B8; see "Fixer pass (2026-10-13, condensed-cut QA)"). Then store the records, run `tempo-table --write`, `verify --strict-cues` and `npm test`, and add the bible status line.
3. Ship by §11.5 from a picture folder that holds these renders (`/tmp/cond/03/<id>/render/`) and `renders/channel/` for the other 27.
4. Publishing (`build_publishing.py <id> --covers`, then `--check`), with these facts (fixer pass): runtimes 17.3 / 14.15 / 15.35 s (bodies 14.8 / 11.65 / 12.85 + the 2.5 s card); covers by content: 03a's finished board in the verdict hold (about 14.3-14.8 s: the gold plate, the "≈ 12 mo" banner, the winner's V), 03b's frame 1 (the clean red 15.1-year hook) or its settled verdict hold (about 11.3-11.6 s), 03c's settled verdict hold (about 12.3-12.8 s: "≈ $78,600 LESS" and the $2.46 kicker); check counts 528 by default, 565 on the condensed specs (the sheets quote 525). No copy changes: every number and caption word is the round-2 cut's (03c's merged first caption is the same two sentences). Then `teasers/v2/teasers.json` (runtimes).

**Open items:**
- The sound failures above are the ship step's.
- 03a loses two acting beats that carried no fact: the pat on "this loan" and the strain on Round up (both registered as no motion at this figure size). The round-2 spec keeps them until promotion.
- 03b's ② race now lasts 2.54 s at one shared speed with ③ (the port had rejected a 6 s crawl at uneven speed): the hero passes through running payoff values with an unlit "≈", the convention 03c's races already use.
- In 03a the figures are small (0.51 in 151 px lanes), so their moves register at YAVG 0.13-0.23; if the owner wants bigger motion there, the lever is the lane layout or figure size (the kit's), not the timing.

### Fixer pass (2026-10-13, condensed-cut QA): 03a, 03b, 03c

**The critic's verdict:** format 03 passes, with no must issues. Scores: 03a 6.5, 03b 8, 03c 7.5. Every should and nit is applied below or answered. The sound shoulds stay with the ship step, as the critic asked. Files changed: the three `studio/specs-wip/03*.json`, `checks/03-what-difference.py` and this write-up (the header, the at-a-glance runtime, 03a's beat sheet, captions and platform notes, 03b's and 03c's beat-sheet rows, Open items 3, 5 and 6, "To promote" and this entry). No kit file, spec in `studio/specs/`, pack, `src/`, `sound/`, `test/`, `publishing/` or `renders/` was touched. Every number, display string, caption word, verdict and the end card are unchanged.

| Critic item | Severity | What was done |
|---|---|---|
| 03a: four near-still stretches of 0.4 s or more before the verdict (0.03-1.70, 2.07-2.90, 12.17-12.80, 13.17-13.63) | should | A spec-only retime (below). No near-still run of 0.4 s or more is left before the verdict. The longest is 0.37 s, against 1.67 s before |
| 03c: "40 MONTHS SOONER" and "≈ 11 YEARS SOONER" each up only 0.55 s | should | Label steps at 4.8 and 9.15, bar-label reads at 5.35 and 9.7, deltas unchanged at 5.9 and 10.25. Each line is now up 1.1 s. The check's floor rose from 0.4 s to 1.0 s (`LABEL_TO_DELTA_C`), with a new rule that the bar-label read falls between the step and the delta |
| 03c: the "× 360" footer working up only 1.0 s | should | `footerSteps[1]` moved from 2.0 to 2.8. The working now holds 1.0-2.8 s (1.8 s). `footerSteps[0]` stays at 1.0: moving it to 0.8 would cut the assumptions footer, the only place the $400,000 and the 7.3% appear, to 0.8 s. The check wants `footerSteps[1]` inside "Add just $100 a month.", at least 1.6 s after `footerSteps[0]` (`FOOTER_WORKING_C`), and `footerSteps[0]` at 1.0 s or later |
| 03a, 03b, 03c sound (BANDS, S8, U4, B8, and the margins under 0.5 dB) | should | Left for the ship step (pack level, §11.1/§11.2). The results and every margin the critic named are recorded under "Verify" below, including 03a's 125 Hz and 03c's 63 Hz |
| 03b: "MORE THAN THE $5,000 OWED" at full strength for only 0.45 s | nit | The critic's 1.95/2.7 leaves the board still from about 2.1 to 2.7. The slam registers for only about 0.1 s, the motion proxy flags the gap, and a scratch render at 1.9/2.45 measured a still run of 0.43 s (2.03-2.47). So the cut uses 1.95 and 2.4, with the first read at 1.5 (with its caption; it was 1.55). The line is at full strength for 0.45 s before the compare read dims it, then again from about 2.9 to the cut. In all it is up 1.2 s, 0.72 s at full strength, against 1.0 s and 0.52 s before. The longest still run in 03b is 0.37 s (2.07-2.43). A hero read in place of the compare read would keep the stack bright, but it would answer no number in "More than you owed", so it was not used. The check rule is at least 0.45 s (`LABEL_FULL_B`) |
| 03b: two running years at once during ②'s race | nit | No change, as the critic said. Recorded as a kit open item (Open items 3) |
| 03a: the verdict card hides "About $12 more a week. About a year sooner."; the stake line is up only 1.75 s | nit | Both are done. `steps[3]` ("= $187.54 + $12.46 = $200 a week") is back at the verdict (13.2), then the year step at 14.1. They hold 0.9 s and 0.7 s, and the year step is up 0.7 s before the card. The stake line is up 0-1.95 s |
| check: `--spec <full id>=PATH` refused with a misleading message | nit | KEY may be a, 03a or the full id, as in 02's check, and an unknown KEY now lists the valid ones. The mutation run passes every spec with full-id keys |

**03a, the retime (spec only).** At the col layout's figure size, a single figure's hop, a crate read or a single value read registers as near-still (YAVG 0.1-0.24). Slot pops, lane wakes, runs, landings, lever beats, a pair or compare read (0.27-0.52) and two hops at once (0.29-0.38) register as motion. So each stretch got one of those:
- **Opening.** `vo[0]` ends at its 1.2 s floor (it was 1.65), and `vo[1]` goes up at 1.25. The scan is a ripple, `scan: { t: 0.03, every: 0.26, options: [1, 2, 3, 1] }`: Biweekly, Weekly, Round up, then Biweekly again, so two figures are in the air at once from 0.29 s to about 1.0 s and the last lands as Monthly's caption goes up. The critic suggested 0.3 s apart; at 0.3 the fourth hop runs 0.12 s into Monthly's caption, so 0.26 is used.
- **Monthly.** The crate read stays with the caption (1.25). The working (`formulas[0]`, now `{ t: 1.95 }`) pops with the ≈ $10,000 read at 1.95, late in the caption, and carries into Biweekly's wake at 2.5. Biweekly wakes as soon as `vo[1]`'s 1.2 s is up. `formulas[1]` is `{ t: 2.95 }`, so Monthly's working is up 1.0 s.
- **Middle.** Everything from Biweekly's wake to Round up's landing keeps its spacing, 0.45 s earlier: wakes 2.5, 4.85 and 9.65; landings 4.0, 6.35 and 11.15; `formulas[2]` 5.7; steps 4.5 and 6.8; pair read 7.05; lever 7.8 with beats 8.4 and 8.9; Monthly's crate read 9.3.
- **Count-down.** The $1,800 working pops at 12.05, inside the count's last 0.4 s (the count runs 11.6-12.4), as the critic suggested. The single ≈ $8,200 read is now a compare read of Monthly's ≈ $10,000 and Round up's ≈ $8,200 at 12.6, after the settle. The verdict is at 13.2, 0.8 s after the settle. The trade-off: for 0.35 s (12.05-12.4) the slot says "$8,200" while the running count still shows about "$8,3xx" (green, without the "≈"). It lands on ≈ $8,200 at 12.4.
- **Hold.** `steps[3]` is at 13.2 and the year step at 14.1. The gold crate read moved from 14.0 to 14.25. The hold's still run is now 0.43 s (14.40-14.83); it was 0.93 s.

Body 14.8 s, total 17.3 s (the editor's cut: 15.25 and 17.75 s).

**Iteration on 03a.** Each variant was rendered to `/tmp/cond/03/exp/` and audited:
- **e1.** The critic's literal suggestion: three hops 0.3 s apart, the working with the 1.25 crate read, the ≈ $10,000 read at 1.95, the $1,800 step at 11.95 and the compare read at 12.75. Near-still runs: 0.80-1.23 (0.43 s), 1.63-2.43 (0.80 s) and 12.23-12.80 (0.57 s).
- **e2.** Hops 0.2 s apart, the working at 1.6, the read at 2.05, the compare read at 12.05 and the step at 12.75. Near-still runs: 0.67-1.23 (0.57 s) and 1.90-2.43 (0.53 s).
- **e3 and e4.** The ripple at 0.25 and 0.3, with the working and read at 1.8. Near-still run: 2.10-2.50 (0.40 s).
- **e5.** The working and read at 1.95, the step at 12.05 and the compare read at 12.6. Clean.
- **The cut.** e5 with `every` 0.26.

**Measured after** (`/tmp/cond/03/<id>/final/<id>.mp4`, the method above; `/tmp/cond/03/<id>/motion.txt`; the editor's audits are in `/tmp/cond/03/editor/`):

| | Still runs ≥ 0.2 s before the verdict (none reaches 0.4) | Near-still (< 0.25) ≥ 0.2 s before the verdict (none reaches 0.4) | Verdict hold, card | Frame 1 |
|---|---|---|---|---|
| 03a (verdict 13.2) | 1.67-1.90, 4.10-4.43 (0.33), 6.50-6.73, 7.50-7.73, 9.33-9.57 | 0.03-0.37 (0.33, the first hop alone), 1.00-1.23, 1.63-1.97 (0.33), 2.23-2.50, 4.07-4.43 (0.37, Biweekly's landing to its value), 6.43-6.77 (0.33), 7.50-7.77, 8.23-8.43, 9.33-9.60, 10.03-10.27, 11.43-11.63, 11.70-11.97, 12.33-12.63 (0.30) | 14.40-14.83 (0.43), card 16.03-17.30 | unchanged; the first hop from frame 2 (YAVG 0.035, then 0.115 at 0.067 s) |
| 03b (verdict 10.05) | 0.80-1.00, 1.17-1.50 (0.33), 2.07-2.43 (0.37), 2.50-2.73, 2.87-3.17 (0.30), 7.40-7.67 | 0.70-1.07 (0.37), 1.17-1.50, 1.63-1.83, 2.07-2.43 (0.37), 2.50-2.73, 2.83-3.17 (0.33), 7.03-7.27, 7.40-7.67, 9.63-9.87 | 11.33-11.63, card 13.13-14.17 | unchanged; moving from 0.033 s |
| 03c (verdict 11.25) | 0.73-1.00, 1.77-2.00, 5.03-5.37 (0.33), 6.23-6.47, 9.40-9.73 (0.33), 9.80-10.00, 10.50-10.77 | 0.63-1.00 (0.37), 1.13-1.33, 1.73-2.00, 5.03-5.37, 5.43-5.67, 6.13-6.47, 6.63-6.97 (0.33), 9.40-9.73, 9.80-10.03, 10.50-10.77, 10.93-11.20 | 12.37-12.80 (0.43), card 14.33-15.37 | unchanged; moving from 0.033 s |

**Stills read** (`node src/cli.mjs stills`; frames in `/tmp/cond/03/<id>/stills/`, tiled to `sheet*.png`):
- **03a:** 0, 0.033, 0.15, 0.45, 0.7, 1.0, 1.3, 1.6, 2.0, 2.3, 2.55, 3.0, 3.5, 4.0, 4.5, 4.9, 5.75, 6.35, 6.85, 7.1, 7.85, 8.45, 8.95, 9.35, 9.7, 10.4, 11.15, 11.5, 12.1, 12.45, 12.65, 13.0, 13.25, 13.7, 14.15, 14.3 and 14.75 s, and the end.
- **03b:** 0, 0.033, 0.5, 1.05, 1.2, 1.55, 1.85, 2.0, 2.2, 2.45, 2.7, 3.0, 3.2, 3.6, 4.2, 4.7, 5.3, 6.05, 6.5, 7.0, 7.65, 8.2, 9.15, 9.6, 10.05, 10.5, 10.95 and 11.6 s, and the end.
- **03c:** 0, 0.033, 0.5, 1.05, 1.6, 2.05, 2.85, 3.5, 4.5, 4.85, 5.1, 5.4, 5.95, 6.5, 7.0, 8.0, 8.85, 9.2, 9.5, 9.75, 10.3, 10.8, 11.3, 11.6, 12.0 and 12.8 s, and the end.

What they show:
- Frame 1 of each is unchanged.
- **03a:** the ripple puts two green figures in the air at 0.45 and 0.7 s. The stake line is up to 1.95 s, and Monthly's working is in the slot from 2.0 s. At 12.1 s the slot shows the $1,800 working over the running "$8,295" (the trade-off above), and at 12.45 s it shows ≈ $8,200 settled. At 12.65 s both figures are green for the compare read. At 13.25 s the verdict sits over the slot's "= $187.54 + $12.46 = $200 a week", and at 14.15 s over "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" with the "≈ 12 mo" banner.
- **03b:** "MORE THAN THE $5,000 OWED" is at full strength at 2.0 and 2.2 s, dimmed but legible at 2.45 and 2.7 s, and full again at 3.0 s.
- **03c:** the footer's × 360 working is up from 1.05 to 2.85 s. "40 MONTHS SOONER" is at full strength at 4.85 and 5.1 s and dimmed at 5.4 s, then replaced by "≈ $78,600 LESS" at 5.95 s. "≈ 11 YEARS SOONER" behaves the same way from 9.2 s.
- Every landed value, slot line, label step, delta and verdict matches the maths tables.

**Lint:** `node src/cli.mjs check` on the three WIP specs gives 0 errors and 0 warnings at the default step and at every frame (`--every 0.0333333`): 03a 17.3 s = 14.8 + 2.5 s, 03b 14.15 s = 11.65 + 2.5 s, 03c 15.35 s = 12.85 + 2.5 s.

**Render and sound:**
- `render specs-wip/<id>.json --out /tmp/cond/03/<id>/render`: 03a 519 frames and 35 cues, 03b 425 frames and 24 cues, 03c 461 frames and 25 cues.
- `sound … --video /tmp/cond/03/<id>/render --out /tmp/cond/03/<id>/final --score`: each video md5 is identical (03a `8c90fd5347de`, 03b `06d5479a9ef6`, 03c `52c1baa03749`), and each final MP4 is byte-identical to its render.
- Tempo: 03a P 13.2 (verdict + hit) at 127.273 BPM throughout; 03b P 10.05 (verdict) at 143.284 / 150 BPM; 03c P 11.25 at 149.333 / 150 BPM.

**Verify** (`verify specs-wip/<id>.json --video /tmp/cond/03/<id>/final --detail`; full output in `/tmp/cond/03/<id>/verify.txt`). The CUE DRIFT block and "baseline DIFFERS" are expected for a WIP cut. Nothing was changed in the packs, the calibration or `acceptance.json`.

**03a: 39/42; units U4 6/6 (it was 5/6).**
- **Fails:**
  - **A11:** 4.575% of samples limited by more than 1 dB, against a limit of 3%; max 4.2 dB against 6. **This failure is new.**
  - **BANDS:** 125 Hz is 7.2 dB re 1 kHz against a window of 1-7 (0.2 over; the editor's cut measured 6.6). 8 kHz is −3.6 against a ceiling of −5 (1.4 over; the editor's −4.0).
  - **S8:** the pad's velocity SD is 0.029 against a minimum of 0.03.
- **Passes:**
  - A1 −14.18 delivery (master −14.09); A2 −1.86 dBTP (0.86 to spare); A3 LRA 5.01; A4 −11.09 / −8.62; A5 PLR 12.33 against 13 (0.67); A10 2.14.
  - B1 sfx − music 0.85; **B3 closest cue 3.0 dB against 3 (0.0 to spare, as rounded)**; B8 logo −11.35 against −13 (payoff −10.49).
  - S9 127.273 BPM; **S12 5 st against 5 (0)**; **S14 12 notes against 12 (0)**; HARSH 0.24.
  - Other octaves: 31.5 Hz −8.2, 63 Hz 4.5, 250 Hz 3.0, 500 Hz 2.6, 2 kHz −1.7, 4 kHz −2.0, 16 kHz −14.7.
  - U4: the tick NCC failure (0.982) is gone.
- **A11, likely cause.** The limiter's hotspots are the P stack and the DROP drums in the hold:
  - 13.21 s: hit, cash, clap, crash, kick, reverse crash, timpani and shaker, 3.54 dB;
  - 14.16 s: kick, snare, tambourine and shaker with no cue, 4.2 dB;
  - 13.94 s: 3.39 dB; 13.58 s: 3.22 dB.

  Scratch `audio` builds show how much the figure swings:

  | Build | Limited > 1 dB | Max |
  |---|---|---|
  | The editor's cut | 2.07% | 3.64 dB |
  | This cut | 4.58% | 4.2 dB |
  | This cut without the 14.25 s tick | 2.83% | — |
  | Scan back to three hops | 3.35% | 5.73 dB |
  | Verdict 0.1 s later (126.3 BPM) | 2.26% | — |

  A11 moves by about 2 points for one tick or a 0.1 s move of P. That is the DROP stack's limiting under a Becker `MODEL` fitted on the round-2 records (CUE DRIFT), not a beat of this cut. The ship step owns it: refit `MODEL` (§11.2), then apply a pack-level rule for the P stack and the hold's drums if it still needs room (the 06b practice, §11.2). The picture timing was not bent to pass it. One build of a stale fit would not settle the question either way.

**03b: 40/42.**
- **Fails:**
  - **BANDS:** 125 Hz is 1.7 against a floor of 2 (0.3 under).
  - **B8:** the logo's M(L+0.2) is −13.23 LUFS against −13 or louder (0.23 under; payoff −10.80).
- **Margins:** 250 Hz 0.5 against 0 (0.5); 63 Hz 4.7; A2 −1.26 (0.26); **A5 12.87 against 13 (0.13)**; B3 closest 3.8 dB (0.8); A11 0% (max 0.76 dB).

**03c: 40/42.**
- **Fails:**
  - **BANDS:** 125 Hz is 0.5 against a floor of 2 (1.5 under), and 250 Hz is −0.5 against 0 (0.5 under).
  - **B8:** −13.34 LUFS (0.34 under; payoff −11.17).
- **Margins:** **63 Hz 4.3 against a floor of 4 (0.3)**; A2 −1.30 (0.30); **A5 12.87 (0.13)**; A11 0.43% (max 1.56 dB); B3 closest 4.6 dB.

**Likely cause of the Scoreboard failures:** the same as in the editor's entry. A 12-13 s body with 24-25 cues gives the SFX more of the 1 kHz reference, and the logo is mastered lower against a denser body. The Scoreboard calibration was fitted on bodies of 13-46 s.

**Check (`checks/03-what-difference.py`):**
- **03a rules:**
  - the scan is the ripple: `options [1, 2, 3, 1]`, at most 0.3 s apart, every hop taken, the last landing within 0.1 s of `vo[1]`;
  - `vo[0]` ends at its reading floor + 0.1 s at most;
  - `formulas[0]` pops with the ≈ $10,000 read, in the last 0.6 s of `vo[1]` before Biweekly wakes;
  - the stake line is up at least 1.8 s;
  - five steps: `steps[3]` repeats `formulas[3]` exactly at the verdict, `steps[4]` is the year step, and `steps[3]` shows a + b = c;
  - the $1,800 step falls no earlier than the count's last 0.4 s;
  - the compare read: two different cells, Monthly among them, whose shown difference is the caption's $1,800;
  - each slot line holds at least 1.0 s before the verdict and at least 0.7 s in the hold (`SLOT_HOLD_VERDICT`); the condensed expectations read `formulas[0-2].text`.
- **03b and 03c rules:** see the table.
- **Two robustness fixes:** a missing path or step now fails with its row instead of crashing (`TypeError`), and the motion proxy's gap no longer stretches past the verdict when the next window starts after it. Mutation 10 found the second.
- **Results:**
  - **528 checks, 0 failures** by default (unchanged);
  - **565 checks, 0 failures** with `--spec` on the three WIP specs (551 before);
  - full-id KEYs work.
- **Mutation test** (`/tmp/cond/03/tools/mutate2.py`, copies in `/tmp/cond/03/mut2/`): **25 of 25 caught**, each with exit 1 and named failing rows.
  - The editor's 14, re-aimed at the new timeline: the $35 step at 6.6 s.
  - 03a, new: the editor's three-hop scan; the hook held 1.65 s; `formulas[0]` back with the crate read; the ≈ $10,000 read and working at 1.55; `steps[3]` dropped; a single ≈ $8,200 read; the $1,800 step at 11.7; the year step 0.5 s before the card.
  - 03b, new: the compare read 0.3 s after the label.
  - 03c, new: the editor's order (the label step 0.55 s before its delta); `footerSteps[1]` back at the cut.

**Open items (fixer pass):**
- **03a's A11 failure** is new and is the ship step's (see Verify). Watch 03a's B3 closest cue (3.0 against 3) after the refit too.
- **03a's 0.35 s of mismatch** between the $1,800 working and the running count (12.05-12.4) is the price of the critic's "step inside the count-down". To remove it, move the step to the settle (12.4), which brings back a 0.5 s near-still stretch before the verdict, or have the kit's count land sooner (a kit opt-in).
- **03a's figures are still small** (0.51); the motion now comes from beats that register, not from bigger figures.

### Promoted (2026-10-13)

The three condensed cuts (after the fixer pass) were copied from `studio/specs-wip/` over `studio/specs/` (commit 4fb0b00) and `IN_SPECS` is `"cond"` for each: 565 checks, 0 failures by default, and 528, 0 failures on git-history copies of the round-2 cuts passed with `--spec`; the sound refit and the ship follow (`renders/channel/` keeps the round-2 cuts until then).
