# 03 · What difference does X make? Three teasers

**Format:** `what-difference` (rank 3 in [`../../research/v2/04-formats.md`](../../research/v2/04-formats.md), hook pattern **P5**)
**Date:** 2026-10-07 (revision 2, after the verifier and hook-judge reviews), plus the 2026-10-08 hook pass on 03b, the 2026-10-08 assembly pass on all three, the 2026-10-08 fixer pass after the round-2 QA, and the 2026-10-08 port: the owner kept Scoreboard and Becker Rig and retired Live Sheet and Clean Sheet, so 03a moved to Becker Rig and 03b to Scoreboard (see "Review log" at the end)
**Specs:**
- [`studio/specs/03a-becker-rig-car-loan-weekly.json`](../../studio/specs/03a-becker-rig-car-loan-weekly.json) (37.2 s; ported from Live Sheet, the old spec is `studio/specs/retired/03a-live-sheet-car-loan-weekly.json`)
- [`studio/specs/03b-scoreboard-card-minimum.json`](../../studio/specs/03b-scoreboard-card-minimum.json) (30.6 s; ported from Clean Sheet, the old spec is `studio/specs/retired/03b-clean-sheet-card-minimum.json`)
- [`studio/specs/03c-scoreboard-mortgage-extra-100.json`](../../studio/specs/03c-scoreboard-mortgage-extra-100.json) (29.8 s)

**Maths check:** [`checks/03-what-difference.py`](checks/03-what-difference.py). It rebuilds all three loans payment by payment from the sourced inputs, then checks every display string in the three specs against the computed, formatted value, and every number in every VO line too. It also checks:
- each shown delta equals the difference of the shown totals, and "≈"/"about" appear exactly on rounded numbers;
- the contract shape, R1 (a number in the header, and the baseline option's results already on screen at frame 1), R2, R8 and R10;
- the timing: VO at 2.6 spoken words/s, no overlaps, each later option lands within 0.9 s of the word that names it (landing = `resultT` where the kit reads one), every `lookOpts` step (lever, footer steps) sits on a beat, footer steps start after t = 0 and stay within the kit's 45-character limit;
- the assembly-pass beats: every `lookOpts.reads` entry (03a, 03b, 03c) and every 03c `deltaT` sits within 0.25 s of the VO word that speaks its number, marks a value already on screen, and that word speaks the marked value (or, for 03a's "$1,800 less", the shown difference the marked cell makes);
- the fixer-pass beats: 03a's bar steps ("≈ $1,100", "≈ $35", "≈ $1,800") are typed by the word that speaks them (and no more than 0.8 s early) and each "a − b ≈ c" step has c = the shown a − b; 03a's pair read marks two equal "≈ $8,900" cells as the VO speaks the exact $35 gap they hide; the 03a scan sits on "Guess" over the three still-empty columns, and the lever's columns are the two 13-payment ones; 03b's ② values and ③'s payoff land on the words that speak them, its "$0 more" working is marked on "dollar", and its winner delta lands on "ten" with the winner beat; 03c's label steps ("40 months sooner", "≈ 11 years sooner") slam within 0.25 s of their words, after their race and before their delta;
- no spec-level `sfx` (each kit cues its own landings);
- the port beats (2026-10-08):
  - 03a (Becker Rig): each lane wakes on the word that names it (`option.t`) and its crate lands on the word that speaks its payoff (`option.resultT`, within 0.25 s); the round-up value's count-down settles on "$1,800" and drops by exactly the shown $1,800; each working-slot line is on screen by its word and no more than 0.8 s early, and holds at least 2 s; the footer is one line;
  - 03b (Scoreboard): each hard cut on the word that names the option; each race lands on its payoff's word at the shared speed (`keepSpeed`); the hero holds ≈ 15.1 years at frame 1 and bumps on "fifteen"; the row-cell reads on "$7,300" and "$3,100"; the label steps (the shrink note at frame 1, "More than the $5,000 owed" on "More", "$0 more than the first minimum" on "dollar"); the hero lands "≈ 10 years sooner" on "ten" (`data.winnerT` = the delta's time), its 1 s roll starting after the verdict;
- the sensitivity claims in this file.

Result: **509 checks, 0 failures, exit 0** (after the 2026-10-08 port; 480 after the fixer pass, 439 after the assembly pass, 388 after the 03b hook pass). Mutation tests:
- Revision 2: one interest cell changed (03c "≈ $508,600" → "≈ $508,700"), one "about" removed (03b "About $7 more" → "$7 more") and the 03a lever moved off its beat (18.0 → 18.3 s) gave 4 failures and exit 1, as they should; the restored specs pass again.
- Hook pass, on scratch copies of the new 03b spec: note "$99.66" → "$99.67", verdict "≈ 10" → "≈ 11", ②'s landing moved off "keep" (10.6 → 11.6 s), and one "about" removed ("About 4.8 years" → "4.8 years"). That gave 4 of 4 failures and exit 1.
- Assembly pass: 03a's "$10,000" read moved off its word (5.8 → 6.3 s), 03b's "4.8" read pointed at the wrong cell (payoff → interest) and 03c's "$78,600" slam moved back to 9.45 s. That gave 3 of 3 failures and exit 1; the specs were restored byte for byte and pass again.
- Fixer pass, on scratch copies of the specs: 03a's first bar step moved late (9.7 → 10.6 s), 03a's last step said "≈ $1,700", 03b's winner delta moved off "ten" (27.1 → 27.6 s) and 03c's first label step said "41 months sooner". All 4 were caught (9 failing rows, exit 1).
- Port, on scratch copies of the new specs: 03a's Biweekly crate landing moved late (9.0 → 9.6 s), 03a's footer put back to the two-line Live Sheet text, 03a's new slot step said "$12.64", 03b's shrink note said "$99.67", 03b's `winnerT` moved off "ten" (27.1 → 27.6 s), 03b's `keepSpeed` dropped, and 03b's "$3,100" read moved off its word (18.0 → 18.5 s). All 7 were caught (10 failing rows, exit 1); the restored specs pass.
**Studio linter:** `node src/cli.mjs check specs/03*.json` gives **3/3 clean, 0 errors, 0 warnings**, at the default step and at every frame (`--every 0.0333333`, 1/30 s), against the Becker Rig (03a) and Scoreboard (03b, 03c) what-difference modules. The kits' own what-difference samples are clean too (Becker Rig 3, Scoreboard 2). The port's additions to the Scoreboard module are opt-in: 03c and both Scoreboard samples render pixel-identical to before them (26 of 26 frames compared). Stills and 12-frame contact sheets were inspected for every port beat, because the linter does not catch every render bug (it missed "[object Object]" in round 1). (Before the port, 03a was linted against the Live Sheet module and 03b against the Clean Sheet module committed in 7445bcc; see the Review log.)
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
| The lever lands | lanes wake on their names (8.0, 13.0, 23.0 s); crates land on their numbers: ≈ 65 (9.0 s), ≈ 65 (14.0 s), ≈ 60 (27.2 s, after a strain on "round up"); the 13-payments lever at 18.0 s | 9.6 s cut ("$142.59 − $142.59 = $0 more"); "$0 more than the first minimum" on "dollar" (13.0 s); the race lands on "4.8" (16.0 s); the hero lands "≈ 10 YEARS SOONER" on "ten" (27.1 s) | 6.4 s cut, 8.9 s landing, 9.4 s "40 MONTHS SOONER", 10.6 s delta (on the spoken "$78,600") |
| The screen answers the VO (reads) | 2.4 s scan (the three waiting figures hop on "Guess which one"); 4.2 s, 5.8 s (Monthly's crate and value); 16.2 s (both ≈ $8,900 values, "$35"); 18.0 s (the lever's two lanes) | 2.4 s (the hero, "fifteen"), 5.0 s (≈ $7,300 in row 1), 7.8 s ("More than the $5,000 owed" slams on "More"), 13.0 s ("$0 more than the first minimum" on "dollar"), 18.0 s (≈ $3,100 in row 2) | 1.2 s (the hero) |
| Differences on screen | slot steps "≈ $1,100 less interest" (10.2 s), "≈ $35 less interest than biweekly" (16.0 s), "≈ $1,800 less interest" (28.2 s), with ≈ $8,200 counting down from ≈ $10,000 into it; the green time-saved strip on each lane's floor | the hero's "≈ 10 YEARS SOONER" (27.1 s); ③'s "≈ 13 YEARS SOONER" in the label stack (24.35 s) | "40 MONTHS SOONER", "≈ $78,600 LESS", "≈ 11 YEARS SOONER", "≈ $245,000 LESS" |
| Verdict (screen) | Round up to **$200** a week: **≈ 1 year** sooner (the gold plate on ≈ $8,200) | Same payment, **$0** more: **≈ 10 years** sooner (the hero holds "PAID OFF ≈ 10 YEARS SOONER") | +$100 a month: each $1 saves **≈ $2.46** (the hero holds "≈ $78,600 LESS") |
| Runtime | 37.2 s | 30.6 s | 29.8 s |
| Benchmark hook it copies most closely | H48, 1.9M, 902.5x | H31's "NOT EMI" mechanic + H48 frame + H84's one-word cue | H50, 290.7K, 127.3x |

**Winner convention.** `winner` is the option the verdict names, not always the biggest number. In 03b the flat $250 is faster than keeping the first minimum, but the verdict answers the $0 lever the hook asks about. The $250 row is the "biggest number last" bonus, toned `good` rather than `goal`.

**Frame-1 convention.** In all three, the baseline option is already worked out at frame 1 (R1 "the full answer", R10 "shock first"), and the later options sit named but empty (R9). Each kit expresses that differently:
- Becker Rig (03a): `option.t ≤ 0` means "already run": the crate stands at its flag with its payoff on its face, the money value is in and the coin pile is full. For the later lanes `option.t` is when the lane wakes and `option.resultT` when its crate lands.
- Scoreboard (03b, 03c): `option.resultT 0.0` on the first option makes its race land at frame 1, so the hero shows ≈ 15.1 years (03b) or ≈ $587,200 (03c) at 0.0 s instead of rolling through unverified intermediate values.
- (Retired with the port: Live Sheet's pre-filled `t ≤ 0` column, and Clean Sheet's negative `t` / `resultT` with the note typing from `noteT −0.15`.)

---

## 03a · Becker Rig · Weekly and biweekly vs monthly on a $44,000 car loan

**Spec:** `studio/specs/03a-becker-rig-car-loan-weekly.json` · 37.2 s · captions on

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
- **R10:** values on screen at 0.0 s; the first comparison lands at 9.0 s (the Biweekly crate on "sixty-five"), after a 3.6 s promise line (on "Guess which one" the three waiting figures hop in turn) and the baseline read-out (Monthly's crate and its ≈ $10,000 bump as they are spoken).
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "Weekly barely beats biweekly. Rounding up is the real trick!"

**The wrong belief it plays on:** "Weekly payments must beat biweekly by a lot. The schedule is the trick." In fact biweekly and weekly each add up to exactly **13 monthly payments a year** ($9,752.08 = 13 × $750.16), so weekly beats biweekly by only **$35.49**. The date moves when you pay more: rounding $187.54 up to $200 (+$12.46 a week) takes ≈ 1 year off. That is the myth bust Debt Freedom shows at 3:21 but never explains.

### Beat sheet

Becker Rig timing (`looks/becker-rig/formats/what-difference.js`): each option is a lane with a floor line, a stick figure behind a red crate on the start line, the name over its payment at the left, and the money value under the INTEREST head at the right. The lane is a time axis shared by all four: a crate travels as far as its option takes to pay off, so the longest payoff (72 months) reaches the far side, a flag drops where the debt is gone and the floor from that flag to the far side turns green (the time saved). `option.t` is when the lane **wakes** (on the word that names it); `option.resultT` is when its crate **lands** (on the word that speaks its payoff), and the money value lands 0.45 s later. Every run moves at one shared speed (1.8 s for 72 months) unless the lead-in is shorter. The working slot under the footer shows one line at a time, popped in whole: the stake line, then each option's working from its wake (Monthly's from its first read), each `lookOpts.steps` line and the lever. `lookOpts.scan` hops the waiting figures, `reads` bump a crate or a value and turn its figure green, `lever.options` bands two lanes' values and nods their figures, and `countCell` counts Round up's interest down from ≈ $10,000. Figures are slate while they wait, green on their turn.

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Header (the hook) and footer "Daily interest, posted when paid". Working slot "New-car loan · **7%** APR · **72** months". Heads: a little red crate + "MONTHS TO PAY OFF", and "INTEREST". Four lanes, each name over its payment: Monthly $750.16 · Biweekly $375.08 · Weekly $187.54 · Round up $200. **Monthly already run:** its crate green at its flag, "72"; **≈ $10,000** in red; its coin pile full. The other three: slate figures, a hand on the chin and one on a "?" crate at the start line (a nod in the first second); dashed money sockets | "About a year off this loan. Guess which one." |
| 2.4-3.2 | Scan on "Guess": the three waiting figures hop in turn (green for the hop), each "?" pops, a tick each | (same line) |
| 3.8 | Read at 4.2 ("72"): Monthly's crate pulses and its figure turns green; the slot changes to "= $750.16 × 72 − $44,000 ≈ $10,000". Read at 5.8 ("$10,000"): ≈ $10,000 bumps 12% and flashes red | "Monthly: 72 months, about $10,000 in interest." |
| 8.0 | Biweekly wakes on its name (name to ink, figure green, a step); slot "= $375.08 × 26 / = $9,752.08 a year". He leans in, then drives the crate along the lane (swipe, roll), its face counting the months, coins flying off onto the pile; the flag drops and the crate slams in at **≈ 65** on "sixty-five" (9.0, thud; the crate turns green). **≈ $8,900** drops in green (9.45, pop); a fist. Slot step at 10.2: "= $10,000 − $8,900 / ≈ $1,100 less interest" (on "$1,100", 10.4) | "Biweekly: about 65 months, about $1,100 less." |
| 13.0 | Weekly wakes; slot "= $187.54 × 52 / = $9,752.08 a year"; its crate lands at **≈ 65** (14.0), right beside Biweekly's, and **≈ $8,900** drops in ink (14.45): the same values as Biweekly, whose green settles to ink. He shrugs (14.75). Slot step at 16.0: "≈ $35 less interest / than biweekly"; pair read at 16.2 ("$35"): both ≈ $8,900 values bump and flash together and both figures turn green | "Weekly: about 65 months too. Only about $35 better." |
| 18.0 | Lever: slot "= 13 × $750.16 = $9,752.08: / 13 payments, not 12"; the Biweekly and Weekly values get a pale green band and bump, their crates pulse, their figures turn green and nod (swipe), until the next slot line | "Both add up to 13 monthly payments a year, not 12." |
| 23.0 | Round up wakes on "round"; slot "= $187.54 + $12.46 = $200 a week". He leans in and **strains**: the "?" crate trembles but holds (about 23.45-25.5 s), he crouches, and it gives at 25.7 | "Now round each weekly payment up to $200." (22.6) |
| 26.8 | The crate lands at **≈ 60** on "sixty" (27.2), the nearest flag of the four. **≈ $8,200** (27.65) counts down from ≈ $10,000 over 0.8 s and settles from 110% on "$1,800" (28.45). Slot step at 28.2: "= $10,000 − $8,200 / ≈ $1,800 less interest" | "About 60 months. About $1,800 less." |
| 31.0 | Winner: a gold plate opens behind ≈ $8,200, which grows on it; impact (a mostly vertical shake, a light flash, a 1.8% punch, hit + cash, short rays from the plate's ends). Round up's crate and pennant turn gold and its time-saved strip thickens (the verdict claims "≈ 1 year"). He crouches, jumps and lands arms up in a wide V; the others slump, and their values and crate faces settle grey. Verdict in the caption band: "Round up to **$200** a week: / **≈ 1 year** sooner" (its ding is skipped: it lands on the hit). Slot step at 31.2 (on "$12"): "= $187.54 + $12.46 = $200 a week" | "About $12 more a week. About a year sooner." |
| 35.0-37.2 | The finished board holds 2.2 s (this kit has no loop clear: the loop cuts back to frame 1) | (none) |

### Guide VO script (66 written words, 84 spoken with numbers read out: ≈ 32 s of speech at 2.6 words/s, spread over 0.0-35.0 s)

> About a year off this loan. Guess which one.
> Monthly: 72 months, about $10,000 in interest.
> Biweekly: about 65 months, about $1,100 less.
> Weekly: about 65 months too. Only about $35 better.
> Both add up to 13 monthly payments a year, not 12.
> Now round each weekly payment up to $200.
> About 60 months. About $1,800 less.
> About $12 more a week. About a year sooner.

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
- **Instagram Reels.** Make the cover the finished board at about 33 s (four lanes run, the gold plate on ≈ $8,200, the winner arms up in a V). Gage's one A/B favoured a finished-table cover. No comment-keyword CTA: in the benchmark it lifts comments, not views.
- **YouTube Shorts.** Use the platform title above. Let the loop run: the finished board holds to 37.2 s and the loop cuts back to frame 1 (three crates on the start line again).

---

## 03b · Scoreboard · Paying the same minimum every month on a $5,000 credit card

**Spec:** `studio/specs/03b-scoreboard-card-minimum.json` · 30.6 s · captions on

*Ported to Scoreboard on 2026-10-08 (it was built in Clean Sheet, now retired; the old spec is in `studio/specs/retired/`). The hook, the VO, every number and the verdict are unchanged. What changed is how the screen carries them: the payoff time is the neon hero ("PAID OFF IN ≈ 15.1 YEARS" in red at frame 1, rolling down to ≈ 4.8 and landing "≈ 10 YEARS SOONER" on "ten"), and the three options are a leaderboard of time bars. See "Port to Scoreboard (2026-10-08): 03b" in the Review log.*
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
  - The headline difference, "≈ 10 years sooner", lands last, in the hero, on the spoken "ten" (27.1 s), with the verdict on screen.
- **R11:** the question is on screen, and the verdict leads the caption.
- **R12:** "Same payment, $0 more: ≈ 10 years sooner", spoken as the last VO line ("Same payment: about 10 years sooner.").

**The wrong belief it plays on:** "My minimum is a fixed bill, and to finish faster I have to pay more." In fact the minimum is 1% of the balance plus the interest, so it shrinks as the balance shrinks:
- it is **$142.59** in month 1, **$127.40** in month 12 and **$99.66** in month 36;
- paid that way, $5,000 at 22% takes **≈ 15 years** and **≈ $7,300** of interest, more than the $5,000 owed;
- keeping the payment at the first minimum, **$0** more than the first bill asked for, clears it in **57 payments (≈ 4.8 years)** with **≈ $3,100** of interest. That is **≈ 10 years sooner**.

The "$0 more" is measured against the **first** minimum. From month 2 the held payment is above that month's shrinking minimum: by month 36 it is $42.93 above $99.66. The VO ("your first minimum") and the verdict ("the first minimum") both name that anchor.

### Beat sheet

Scoreboard timing (`looks/scoreboard/formats/what-difference.js`): the top bar holds the hook, the hero odometer and the footer; the dark stage holds a leaderboard, one row per option (name and interest on top, the time bar below, one shared scale); the bottom bar holds the label stack (line 1 the option's working in green, line 2 its name or a step), then the verdict. `option.t` is the **hard cut** (label stack slam, the row lights, the pointer jumps, thud). With `lookOpts.keepSpeed` the bar then waits, lit but empty, and races at the one shared speed (2.4 s for the longest bar, 0.7 s at the least) so it lands on `option.resultT`: the bar label and the interest cell roll with it, and the hero rolls the payoff (`counter: "payoff"`) down from the previous option's landed value on the same clock, its "≈" an unlit ghost until it lands (bump, glow, bloom, ding). `lookOpts.reads`: the hero bumps 6% and flares, or (with `option`) a row's interest cell bumps 10% and glows in its colour, on a soft tick. `lookOpts.labelSteps` slam a line 2 of their own. `data.winnerT` is when the hero lands the winner's delta ("PAID OFF ≈ 10 YEARS SOONER", `endTag`); its roll and the board's winner beat start 1.04 s before.

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | **Top bar:** header (the hook, 3 lines, "$5,000" green); hero "PAID OFF IN **≈ 15.1 YEARS**" in red; footer "22% APR · minimum = 1% + interest, $40 floor".<br>**Board** (INTEREST head): THE CARD MINIMUM, ≈ $7,300 in red over a full red bar "≈ 15.1 YEARS", lit, the pointer on it; KEEP PAYING $142.59 "?"; A FLAT $250 "?".<br>**Label stack:** "starts at $142.59, then shrinks" (green) / "**$142.59 → $99.66 BY YEAR 3**" (red).<br>Read at 2.4 ("fifteen"): the hero bumps and its glow flares | "Minimum on $5,000: about 15 years. Because it shrinks." ("fifteen" at about 2.4 s) |
| 4.6 | Read at 5.0 ("$7,300"): row 1's ≈ $7,300 bumps and glows red. At 7.8 ("More") line 2 slams "**MORE THAN THE $5,000 OWED**" (red, pop) | "About $7,300 in interest. More than you owed." |
| 9.6 | Hard cut: row 2 lights, the pointer jumps to it; label stack "$142.59 − $142.59 = $0 more" / "KEEP PAYING $142.59" (thud). Its bar waits, empty | "Now keep paying the first one." |
| 12.2 | At 13.0 ("dollar") line 2 slams "**$0 MORE THAN THE FIRST MINIMUM**" (green) | "Not a dollar more than your first minimum." |
| 15.6 | 15.24-16.0 the bar races (roll); the hero rolls down from ≈ 15.1 to **≈ 4.8 YEARS** (now green) and row 2's interest rolls up; all land together on "4.8" (16.0): the bar a third the length of row 1's, ≈ $3,100 in the row (bump, glow, bloom, ding). Read at 18.0 ("$3,100"): ≈ $3,100 bumps and glows green | "About 4.8 years. About $3,100 in interest." |
| 21.0 | Hard cut: "$250 − $142.59 = $107.41 more" / "A FLAT $250". 23.1-23.8 the bar races; the hero rolls ≈ 4.8 → **≈ 2.2 YEARS**; lands on "2.2" (23.8): ≈ 2.2 YEARS, ≈ $1,300. Its delta slams at 24.35: "≈ 13 YEARS SOONER" (green) | "A flat $250: about 2.2 years." |
| 25.8 | **Verdict:** the label stack drops away and "SAME PAYMENT, **$0** MORE: / **≈ 10 YEARS** SOONER" slams into the slot under a green rule (reveal) | "Same payment: about 10 years sooner." ("ten" at about 27.1 s) |
| 26.06-27.1 | **Winner beat:** row 2 glows green (its bar solid green), the others dim, the pointer jumps to it, the stage blooms (cash). The hero dips and rolls up from zero under the tag "PAID OFF", and lands **≈ 10 YEARS SOONER** on "ten" (27.1): bump, glow, pop | (same line) |
| 28.4-30.6 | The finished board holds 2.2 s (no loop clear: the loop cuts back to frame 1) | (none) |

### Guide VO script

50 written words, 67 spoken: about 26 s of speech, spread over 0.0-28.4 s.

> Minimum on $5,000: about 15 years. Because it shrinks.
> About $7,300 in interest. More than you owed.
> Now keep paying the first one.
> Not a dollar more than your first minimum.
> About 4.8 years. About $3,100 in interest.
> A flat $250: about 2.2 years.
> Same payment: about 10 years sooner.

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
| ≈ 10 years sooner (delta, verdict, VO line 7 "about 10 years sooner") | (181 − 57) ÷ 12 = 10.33; shown 15.1 − 4.8 = 10.3 | ≈ 10 |
| **Not stated anywhere: the interest saving** | 7,340.79 − 3,081.74 = $4,259.05 rounds to ≈ $4,300, but the shown 7,300 − 3,100 = 4,200 would drift, so neither the screen nor the caption states a saving; the caption gives both totals | (left out) |
| $250 − $142.59 = $107.41 more | | $107.41 |
| ≈ 2.2 years, ≈ $1,300 | Flat $250: 26 payments; interest $1,285.71 | 2.17 → ≈ 2.2 · ≈ $1,300 |
| ≈ 13 years sooner | (181 − 26) ÷ 12 = 12.92; shown 15.1 − 2.2 = 12.9 | ≈ 13 |
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
- **Instagram Reels.** Cover: the payoff frame at about 28 s: the hero "PAID OFF ≈ 10 YEARS SOONER" in green over the board (the red 15.1-year bar, the glowing green 4.8-year row) and the verdict. Save-bait is the worked board itself, so no keyword CTA.
- **YouTube Shorts.**
  - Use the title above.
  - The first 9.6 s hold the worked minimum while two VO lines play, and the screen answers the VO three times: the hero bumps at 2.4 s, ≈ $7,300 at 5.0 s, and "MORE THAN THE $5,000 OWED" slams at 7.8 s.
  - If retention still dips there, cut "More than you owed." (1.6 s) and pull every later beat 1.6 s earlier. That means re-timing the spec (the reads, `labelSteps`, `resultT`, `deltaT` and `winnerT` too) and re-running the check.

---

## 03c · Scoreboard · Just $100 extra a month on a 30-year mortgage

**Spec:** `studio/specs/03c-scoreboard-mortgage-extra-100.json` · 29.8 s · captions on
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

### Beat sheet

Scoreboard timing: `option.t` is the hard cut that names the option; its bar starts racing 0.35 s later, at one shared speed (the longest bar takes 2.4 s), and the hero rolls the interest on the same clock, from the previous option's landed score down to this one's (fixer pass: it used to snap to about $0 and count up), its "≈" an unlit ghost until it lands. The delta slams in at `option.deltaT` (assembly pass: pinned to the VO word that speaks it; the kit default is 0.55 s after the race lands). The first option carries `resultT 0.0`, so its race has already landed at frame 1. `lookOpts.reads` (assembly pass): the hero bumps 6% and its glow flares when the VO speaks the number it holds. Fixer pass: `lookOpts.labelSteps` slam "40 months sooner" and "≈ 11 years sooner" into the label stack on their words; `firstName: false` keeps lane 1's name out of the frame-1 label stack; `heads: false` drops the board's "INTEREST" head (the hero's tag names the metric).

| t (s) | On screen | VO |
|---|---|---|
| 0.0 | Top bar: header (the hook). Hero counter "INTEREST **≈ $587,200**" in red. Footer "$400,000 at 7.3% (≈ Freddie Mac 7.28%, Oct 1)". Board (no column head): JUST THE PAYMENT · ≈ $587,200 · full red bar "30 YEARS"; +$100 A MONTH "?"; +$500 A MONTH "?". Label stack "$2,742.29 a month" only (lane 1 already names the option). Read at 1.2 ("$587,200"): the hero bumps and flares | "Interest alone: about $587,200." |
| 4.6 | Footer rewrites to "$2,742.29 × 360 − $400,000 ≈ $587,200" | "More than the loan." |
| 6.4 | Hard cut: label "$2,842.29 a month / +$100 A MONTH", lane 2 lights; footer "$2,742.29 + $100 = $2,842.29 a month". 6.75-8.9 the bar races and the hero rolls **down** from ≈ $587,200 to **≈ $508,600** in green (the $78,600 gap is the motion); lane 2 lands at "≈ 26.7 YEARS" (≈ $508,600 posted in the row) | "Add just $100 a month." |
| 9.4 | Board holds: ≈ 26.7 YEARS under 30 YEARS. At 9.4 ("40") "**40 MONTHS SOONER**" slams into the label stack; at 10.6 ("About $78,600") the delta: **≈ $78,600 LESS** | "40 months sooner. About $78,600 less interest." |
| 14.4 | Hard cut: "+$500 A MONTH"; footer "$2,742.29 + $500 = $3,242.29 a month". 14.75-16.3 the hero rolls down from ≈ $508,600 to **≈ $342,200**; lane 3 lands at "≈ 19.1 YEARS" | "Add $500 a month." |
| 17.0 | At 17.4 ("11") "**≈ 11 YEARS SOONER**" slams into the label stack; at 18.6 ("About $245,000") "≈ $245,000 LESS" | "About 11 years sooner. About $245,000 less." |
| 22.0 | Verdict replaces the label stack: "+$100 A MONTH: / EACH $1 SAVES **≈ $2.46**" (the number the VO line speaks). Lane 2 glows neon, the others dim, and the hero counts up from zero to "INTEREST **≈ $78,600 LESS**" (lands at about 23.0 s), the last number up top. Footer "≈ $78,600 ÷ ($100 × 319) ≈ $2.46". Cash (kit cue) | "Each dollar of that $100 saves about $2.46." |
| 27.6-29.8 | Hold 2.2 s, then a hard cut back to frame 1 (loop) | (none) |

### Guide VO script (39 written words, 66 spoken: ≈ 25 s of speech, spread over 0.0-27.6 s)

> Interest alone: about $587,200.
> More than the loan.
> Add just $100 a month.
> 40 months sooner. About $78,600 less interest.
> Add $500 a month.
> About 11 years sooner. About $245,000 less.
> Each dollar of that $100 saves about $2.46.

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

### Assumptions (footer, on screen from 0.0 s to 4.6 s)

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
- **Instagram Reels.** Cover: the verdict frame (hero "≈ $78,600 LESS", verdict "+$100 a month: each $1 saves ≈ $2.46") over the three lanes, at about 24 s. Comments will argue about investing the $100 instead. Leave that argument alone (no advice); a later P4 duel can answer it with maths.
- **YouTube Shorts.** Use the title above. HD Guy-style diegetic sound only (the kit's thud, roll, ding, pop and cash; no music bed). Hard-cut loop at 29.8 s back to the red counter.

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
   - **Scoreboard, 03b (port):** the same holds for its races and its payoff roll: the hero passes through running payoff values ("8.2 YEARS" at 15.6 s, "9 YEARS SOONER" at 26.6 s) with an unlit "≈". `keepSpeed` keeps each race short (0.76 s and 0.7 s at the shared speed), and the payoff roll lasts 1.04 s; only the landed values are verified figures.
   - **Becker Rig, 03a (port):** a running crate's face counts the months up in grey digits without the "≈" (and ≈ $8,200 counts down from ≈ $10,000 over 0.8 s, 27.65-28.45 s), so a paused frame can show an intermediate figure; only the landed strings are verified. The working slot pops whole lines (it does not type), one at a time; every line holds at least 2 s. The kit has no loop clear: the last 2.2 s hold the finished board.
   - **Live Sheet and Clean Sheet:** retired with the port. Their notes on 03a's pre-filled working and 03b's split/swap layout are in the Review log (revision 2 to the fixer pass).
4. **The ports depend on two format modules.**
   - 03a uses `looks/becker-rig/formats/what-difference.js` as it is (no edit in the port): its `scan`, `reads`, `lever.options`, `steps`, `formulas`, `countCell` and `option.resultT` carry the Live Sheet beats over.
   - 03b uses five opt-in additions to `looks/scoreboard/formats/what-difference.js` made in the port: `lookOpts.keepSpeed`, cell reads (`reads: [{ t, option, metric }]`), `lookOpts.endTag`, `data.winnerT`, and the hero's roll to a duration delta. 03c and both Scoreboard samples render pixel-identical with them (26 of 26 frames).
   - If either module changes, re-run `node src/cli.mjs check specs/03*.json --every 0.0333333` and the stills at 0, 9.0, 16.2, 27.2 and 31.6 s (03a) and 0, 5.1, 16.1 and 27.5 s (03b).
5. **Renders:**
   - Port (2026-10-08): 03a and 03b are rendered to `studio/out/03a-becker-rig-car-loan-weekly.mp4` (37.2 s, 1,116 frames) and `studio/out/03b-scoreboard-card-minimum.mp4` (30.6 s, 918 frames). Both are 1080×1920 H.264 at 30 fps with an AAC track of the kits' SFX (no VO yet). Frames extracted with ffmpeg (03a at 0, 16.3 and 31.6 s; 03b at 0, 16.1 and 27.5 s) match the stills at the same times: mean pixel difference 0.84-1.26 of 255, which is codec noise.
   - 03c is unchanged since the fixer pass (`studio/out/03c-scoreboard-mortgage-extra-100.mp4`, 29.8 s, 894 frames; its frame at 10.8 s matched the still, mean difference 0.8-1.8 of 255).
   - The retired looks' renders (`03a-live-sheet-…`, `03b-clean-sheet-…`) are still in `studio/out/` and `renders/v2/`; they are not the current teasers.

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
  - **The winner's payoff:** `data.winnerT 27.1` (as before) now means the hero lands "≈ 10 YEARS SOONER" on "ten", under the tag "PAID OFF" (`lookOpts.endTag`); its 1 s roll and the board's winner beat start at 26.06 s, after the verdict (25.8 s). Option 2's `deltaT 27.1` stays (its label-stack slot has yielded to the verdict, so the hero carries it; its pop is the landing's sound). Option 3's delta "≈ 13 years sooner" slams into the label stack at the kit default (24.35 s).
  - **`lookOpts`:** Clean Sheet's `stake`, `gap` and its `reads` are dropped; `intro: false` added (the frame-1 race, as 03c).
- **Format changes** (`looks/scoreboard/formats/what-difference.js` only; its header comment documents them): `keepSpeed`; cell reads (`reads: [{ t, option, metric }]`, the bar label too); `endTag`; `data.winnerT` (the payoff lands on it, the roll starts 1.04 s before but not before `verdict.t`); and the hero's roll to a duration delta when the hero's metric is a duration (as a money delta on a money hero). All are opt-in: 03c and both samples render pixel-identical (26 of 26 frames at 0, 1.2, 7.5, 9.0, 10.7, 15.5, 18.7, 22.5, 23.2 and 27 s, and the end).
- **Check script:** the new id; the Scoreboard landing is `option.resultT` and its cut (`option.t`) sits on the naming word ("keep", "flat"); `value_beats` put the races on "4.8" and "2.2"; the hero read accepts the whole-unit rounding ("fifteen" for ≈ 15.1 years); cell reads must mark a value already posted; label steps (frame 1, "More", "dollar", each while its option holds the stack; interest > stake; the "$0 more" working); `keepSpeed` with every race starting after its cut + 0.35 s; the held delta: counter = payoff, a duration delta, `winnerT` = `deltaT`, the roll starting after the verdict; `endTag`. The note's expectation moved from `data.options[0].note` to `lookOpts.labelSteps[0].text` (the same string). **Result: 509 checks, 0 failures.**
- **Verification:** `node src/cli.mjs check` clean (0 errors, 0 warnings) at the default step and at every frame. A 12-frame contact sheet and stills at 0, 2.5, 4.9, 5.1 (the cell read), 7.9, 9.7, 13.1, 15.6 (mid-race), 16.05, 16.1, 18.1 (the cell read), 23.0, 24.5, 26.0, 26.6 (mid-roll), 27.15, 27.5 and 30.5 s were read by eye. Every number on screen (the hook's $5,000; the footer's 22%, 1% and $40; the hero's ≈ 15.1 / ≈ 4.8 / ≈ 2.2 years and ≈ 10 years sooner; ≈ $7,300, ≈ $3,100, ≈ $1,300 and the three bar labels; $142.59, $250, $107.41, $0 and $99.66 in the label stack; ≈ 13 years sooner; the verdict) matches the check. MP4 rendered to `studio/out/03b-scoreboard-card-minimum.mp4`; frames pulled at 0, 16.1 and 27.5 s match the stills (see Open item 5).
- **Not changed (outside this pass's files):** `teasers/v2/teasers.json` still lists 03b as `03b-clean-sheet-card-minimum`; the new MP4s are in `studio/out/`, not yet copied to `renders/v2/`.
