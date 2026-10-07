## 3. The Read-It Ladder

**Writer brief:** one small recurring number climbs the calendar (a week, a year, a decade) in ballpoint on the back of an envelope, inside a 9 to 9.6 s loop. Then the envelope **flips over**, and the back carries the one line the money lecture never says.
**Lane:** Flash. 03A and 03B run **9.0 s** and 03C runs **9.6 s**, all with `loop: true`: the research's loop lane is 6 to 9 s, and our voice-over needs the top of it (03C's longer number words need 0.6 s more).
**Series:** **Day to Decade**. The postmark carries the number (No. 03A, 03B, 03C).
**Specs:** `engine/specs/03-read-it-ladder-{a,b,c}.json` · **Sheets:** `engine/out/sheets/03-read-it-ladder-{a,b,c}.png` · **Stills:** `engine/out/stills/03-read-it-ladder-*.png` · **MP4s:** `engine/out/03-read-it-ladder-{a,b,c}.mp4` · **Math check:** `teasers/03-read-it-ladder-mathcheck.py`
**Facts checked:** 2026-10-07. Every view count, outlier score and URL in the evidence sections is copied from `research/raw/` or `research/watch/`. **QA pass (same day):** see the [Verification log](#verification-log). It fixed a blank first frame, caption pacing, the hooks and one overstated claim, and it took the one unconfirmed price off the rendered video. **Polish pass (same day):** 03C was replaced (Powerball → the average new-car payment), every real-world input was re-verified live with WebSearch, and the specs were rebuilt for the upgraded renderer. See the [Final fact check](#final-fact-check) and the [Polish pass](#polish-pass).

> **Sourcing note (writer's draft, superseded by the Final fact check):** this run's shared WebSearch budget was used up before this writer's first search, so I ran no new searches. I picked topics whose only real-world inputs had already been verified with WebSearch on 2026-10-07 by other writers in this run. Each one is cited below with its URL and the file that verified it. Everything else is pure arithmetic or a labelled assumption. Re-open each URL once before publishing.
>
> **QA note (superseded by the Final fact check):** the QA pass couldn't search either (same exhausted budget), and direct fetches of the cited pages (apple.com, cnbc.com, macrumors.com, bls.gov, powerball.com, lotteryusa.com) were blocked by the egress proxy. Each input was cross-checked inside the repo and, where possible, re-derived from first principles. Details are in the Verification log.

---

### Why it goes viral

**The mechanism: the clip is shorter than the time it takes to read it.** One small number climbs through bigger time units as a single block of text. Viewers map it onto their own habit, and they haven't finished reading when the clip loops.

1. **Read time is longer than run time, so completion passes 100%.** The winners are 6 to 8 s single shots with a text block you can't finish in one pass. YouTube (since 2025-03-31) and Instagram (since 2025-04-21) count every replay as a view. Loops raise reach, though not YouTube's engaged views. *(report 01, §4.2; watch/group2-video1)*
2. **Small × time = shock is the purest envelope move.** The raw IG/TikTok sweep calls the unit-conversion ladder "envelope math in its purest form" and "the highest-outlier hook type in the set": its top post reached **1,106.2x**. The daily-habit cluster's *median* is **285.7x**, second only to paycheck splits (453.7x). *(raw/ig-tiktok-outliers.md, cluster table and §3)*
3. **The twist carries it, and the lecture kills it.** "Latte factor" returned **zero** finance Shorts. The winners flip the expected lecture: "not enough to buy a nice car so enjoy your caffeine bro" validates the viewer, and "NOW IMAGINE HAVING 10 OF THEM 🥹" sells the dream. Both split the YOLO camp from the invest-it camp in the comments. *(report 02, §3)*
4. **Rounding calls in the math police.** $90 × 12 = $1,080 vs $3 × 365 = $1,095, and "$27/day = $10,000" when it's $9,855. @anatalksmoney captioned her own rounding "the math police blew up my comments" and got **491.2x**. *(watch/group2-video2)*
5. **It costs almost nothing to make,** so it can run at the cadence TikTok rewards. Small accounts break out on it: @mightym11805 had **594 followers** when it hit 2.0M. *(raw/ig-tiktok-outliers.md §2.3)*

**Evidence**

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| Kel King (YT, 9.16K) | A car you can buy for $3k and rent for $400 weekly | 5,189,444 | **1,131.1x** | 7 s | watched | https://www.youtube.com/shorts/KnC5kPBGiJ4 |
| @mightym11805 (IG, 594) | An energy drink is $3 a day | 2.0M | **1,106.2x** | 7.6 s | watched | https://www.instagram.com/reel/DanrXawh9Xq/ |
| @anatalksmoney (TT, 62.5K) | when I … said $27/day is $10,000 a year ("the math police blew up my comments") | 926.2K | 491.2x | 5.85 s | watched | https://www.tiktok.com/@anatalksmoney/video/7664247808488181023 |
| @kliqclip (TT, 2.8K) | $27.40 a day adds up to $10,000 a year … invested over 40 years | 755.2K | 327.4x | 155 s | inferred (long variant) | https://www.tiktok.com/@kliqclip/video/7679159700285312277 |
| @felix.padilla.eng (TT, 983) | HOW MUCH MONEY YOU WASTE WITHOUT NOTICING | 260.8K | 243.9x | 6 s | inferred | https://www.tiktok.com/@felix.padilla.eng/video/7673438595176320269 |
| @spendshiftofficial (IG, 1.1K) | A $150 Saturday, $150 a week, $7,800 a year, $78,000 every 10 years | 201.0K | 101.7x | n/a (no music, no VO) | inferred | https://www.instagram.com/reel/Dcnv5ngT_gA/ |
| @financebestiechloe (TT, 7.1K) | If youre making $30 an hour, full time, that is $4800 a month... | 399.0K | 29.9x | 8 s | inferred (wage ladder) | https://www.tiktok.com/@financebestiechloe/video/7664624298379857182 |

**Counter-evidence we design around:** the lecture framing is dead ("latte factor" = 0 finance Shorts; Ramit Sethi's "buy the lattes" is mainstream). The format is also the easiest to clone: theme pages copy captions word for word within weeks. **Handwriting and the front/back flip are the moat** (report 02, §3 pitfalls 1 and 3).

---

### How the originals do it

**1. @mightym11805, "An energy drink is $3 a day" (2.0M, 1,106.2x, 7.6 s, watched: `watch/group2-video1.md`).**
One POV shot: a hand grips a yellow can on a gym bench, cracks it at about 0:02 to 0:04 and lifts it. A static white block of text sits on screen from frame 1: "$3 a day / $21 a week / $90 a month $1,080 a year / $10,800 every 10 years", then a blank line, then "That's not enough to buy a nice car so enjoy your caffeine bro." There is no voice-over, only a hip-hop beat.
- **What it nails:** the whole ladder is in frame 1, and reading it takes longer than the clip. The punchline is **anti-guilt** (it agrees with the viewer). The can crack lands just as you reach the yearly line. Faceless, and zero cuts.
- **What it misses:** the math is never shown. The yearly line quietly uses a 360-day year ($90 × 12 = $1,080, not $1,095). Nothing moves. vidIQ's own fixes were to "animate each line in sync with SFX", "show the invested-value counter-perspective" and "add a dry, funny voiceover".

**2. Kel King, "A car you can buy for $3k and rent for $400 weekly" (5,189,444, 1,131.1x, 7 s, watched: `watch/group3-video2.md`).**
A man counts cash on the hood of a Ford Fusion at dusk. A white box of caps text in frame 1 reads "BUY A FORD FUSION FOR $3K RENT IT FOR $400/WEEKLY FOR ENTIRE YEAR… $19,200 / NOW IMAGINE HAVING 10 OF THEM 🥹 / FIRE YOUR BOSS🔥".
- **What it nails:** the whole formula fits in one breath. The "now imagine 10" scaler is the cheapest dopamine in finance. Cash on the hood is a trust shortcut.
- **What it misses:** the "year" is 48 weeks ($400 × 48 = $19,200; 52 weeks would be $20,800). The $3,000 price and every cost (insurance, repairs, platform fees) are left out. "FIRE YOUR BOSS" brushes YouTube's get-rich-quick policy. It went viral partly *because* it's wrong, which we can't copy as a brand.

**3. @anatalksmoney, "$27/day is $10,000 a year" (926.2K, 491.2x, 5.85 s, watched: `watch/group2-video2.md`).**
A single selfie lip-sync take to a trending audio clip ("I didn't have a pen and paper…"), with one static caption.
- **What it nails:** the reverse-daily frame ($10K a year → $27 a day) maps straight onto the viewer's day. The self-deprecating rounding joke turns "math police" corrections into free comment velocity.
- **What it misses:** the arithmetic never appears ($27 × 365 = $9,855). It is face-led and runs on licensed trending audio, so it can't be copied by a faceless channel.

---

### The Envelope Math upgrade

**What we copy:** the 6 to 9 s single-shot loop, one daily number climbing week → year → decade, a habit the viewer maps onto themselves, a **non-lecture** punchline, and a deliberate, labelled rounding for the math police.

**What we improve:**
1. **The math is visible.** Each rung carries its red multiplier in the gutter (×7, ×52, ×10), so anyone can check it in a second. This is the fix vidIQ ranked first ("animate each line in sync with SFX"): the pen writes one rung per scratch.
2. **Honest rounding.** Rounded rungs carry "≈", and the pinned comment gives the exact figure as "envelope said ≈X, within Y%". The math police get something to say, and we are never wrong.
3. **Sourced, dated inputs, and the assumption on a sticky.** The yellow ASSUME: sticky sits under the ladder ("every day, for 10 years"). 03C also writes its source on the envelope in pencil ("Edmunds, Q3 2026").
4. **Sound for both audiences.** A dry 9 s voice-over for sound-on, burned-in word-by-word captions for sound-off (69% of US adults aged 18 to 54 watch video with the sound off in public: Verizon Media and Publicis Media survey, 2019), and original foley only: pen scratch, flip whoosh, stamp thump. No licensed music, so no Shorts revenue cut.
5. **Both camps get a number.** Every pinned comment carries the other side's math (e.g. 03A's invested value at an assumed 7%), so the YOLO-vs-invest argument has an honest number to fight over.

**Our own twist: The Flip Side.** The ladder climbs on the front of the envelope. Just when the viewer braces for the lecture, the **envelope flips over**. The back says one thing, under a masking-tape "FLIP SIDE" label, that turns the ladder around:
- **03A:** it validates you: a year of the habit costs less than one iPhone 18 Pro.
- **03B:** it reverses the lecture onto income: your boss did this math too.
- **03C:** it turns the decade back into your working hour: $94,440 ÷ 20,800 hours = $4.54 of every hour you work.

A lexicon stamp gives the verdict, and a second flip in the last 0.6 s turns the envelope back over while the page crossfades into frame 1 (`loop: true`). The loop reads as "turning the envelope back over". The ladder is gone from the back before you finish reading it, which is what drives the rewatch. No other ladder account flips the paper, so the format can't be copied caption-for-caption: the back of the envelope *is* the joke.

**Series name:** *Day to Decade*.
**Title template:** `[tape text] (Day to Decade No. N)`, e.g. "Your habit is $3 a day. For 10 years? (Day to Decade No. 03A)". Title = tape text = first spoken line.
**Hook template (masking tape, 2–3 strips, finished on frame 0):** whose number it is + the daily figure (number in red) + the stake as a question: "YOUR HABIT IS / *$3* A DAY. / FOR 10 YEARS?", "A *$1/HR* RAISE IS / ONLY $8 A DAY?", "AVERAGE NEW-CAR / PAYMENT: *$787*/MO. / FOR 10 YEARS?". Always a dollar figure in frame 1, never a concept, and the ink answers the question by about 35% of the runtime.
**Spoken signature:** every episode says "**Flip side?**" on the flip. It is the sound-on cue for the series.

**Format-bible devices used:** the Envelope (kraft), ballpoint working (`ladder`), red pen (gutter multipliers, double underline, strike), ASSUME: sticky, masking-tape hook (front and back), Postmark No., verdict stamps (RETURN TO SENDER, OPENED BY MISTAKE, POSTAGE DUE), the Flip (twice: the pattern break and the loop), and an emoji prop for the "product" (big on frame 0, small once the ink starts). No outro card, per the bible's Flash lane.

**Screen template (all three specs, after the polish pass):**

| Zone (y, 1080×1920) | Front (0 to the first flip, 4.15–4.75 s) | Back, "the flip side" |
|---|---|---|
| 0–340 (flap) | Postmark No. 03A/B/C at (175, 258), r 100, persistent | Postmark |
| 364–657 (3 strips, size 76: 03A, 03C) · 379–592 (2 strips, size 84: 03B) | Tape hook, number in red, finished on frame 0 | Tape "FLIP SIDE" (y 430, size 92) |
| 660–1060 | Frame 0: one big emoji prop (330–340 px), gone at 0.40–0.45 s. Then the `ladder`: 2–3 rungs, labels 74–83 px, red multipliers 66–75 px in the gutter, last rung red at 106–120 px with a target-anchored double underline; values end at x 910 (30 px clear of the button rail) | Punchline in red pen (96–108 px, 2 lines), or 03C's division line, then the 190 px hero |
| 1046–1316 | ASSUME: sticky, 56–58 px (left) · small emoji prop (right) · 03C's pencil source line | Emoji prop · verdict stamp |
| 1320–1480 | Word-highlighted captions (numerals; `say` gives the spoken form), ≤ 2 lines, ≤ 4 words/s | Captions |
| loop | | Final flip 0.6 s before the end; `loop: true` crossfades the last 0.35 s into frame 0 |

**Keeping to our lane:** no unit counts (#1), no division of a mega-number into time (#2), no A-vs-B pick or crossover (#4). The only comparison is a one-line benchmark on the back (one phone), the way the originals use "not a nice car". 03C's back divides a personal monthly bill by the viewer's own work hours. That is the wage-ladder variant already in our evidence (@financebestiechloe), not #2's mega-number rate.

---

### Teasers

#### 03A: "Your habit is $3 a day. For 10 years?" · *Day to Decade No. 03A*

- **Topic:** everyday spending habits. **Lane:** Flash, **9.0 s** loop.
- **Spec:** `engine/specs/03-read-it-ladder-a.json` · **Sheet:** `engine/out/sheets/03-read-it-ladder-a.png` · **MP4:** `engine/out/03-read-it-ladder-a.mp4`

**Frame-1 hook (rendered finished on frame 0).** Tape, 3 strips: **YOUR HABIT IS** / ***$3* A DAY.** / **FOR 10 YEARS?** ($3 in red), with a big ☕ in the middle of the envelope. That is a number, a stake and a question, and the answer is ink 3 s later.
**First spoken line (0.05–2.5 s):** "Your habit is three bucks a day. For ten years?"

**Beat sheet** (times from the spec)

| Time | Picture | Sound / VO (caption) |
|---|---|---|
| 0.00 | Frame 0 = thumbnail: postmark No. 03A in the flap, the 3-strip tape hook ($3 in red), a big ☕ in the middle | "Your habit is $3 a day." (0.05–1.55) |
| 0.45–0.97 | ☕ fades as the pen writes rung 1: red **×7**, *a week ······ $21* | scratch · "For 10 years?" (1.55–2.50) |
| 1.17–1.94 (22%) | **Partial payoff:** rung 2, **×52**, *a year ······ ≈$1,100* | scratch |
| 1.30–2.37 | ASSUME sticky: *every day, for 10 years* | paper |
| 2.14–3.04 (34%) | Rung 3, red and larger (106 px): **×10**, *a decade ······ ≈$11,000* (answers the hook) | scratch · "About $11,000." (2.65–3.70) |
| 2.55 | Small ☕ pops, lower right | pop |
| 3.15–3.50 | Red double underline under ≈$11,000 (text anchor) | scribble |
| 4.15–4.65 (46%) | **Pattern break:** the envelope flips (cut at 4.40) | whoosh · "Flip side?" (3.85–4.50) |
| 4.45–6.52 | Back: tape **FLIP SIDE**; red pen, 96 px: *A year of it costs less / than one iPhone 18 Pro.* | "A year of it costs less" (4.50–6.05) · "than one iPhone 18 Pro." (6.05–7.45) |
| 6.10 | 📱 pops, bottom-left | pop |
| 6.80–7.51 | Ink, 76 px: *(a year: exactly $1,095)*; red underline under $1,095 at 7.52 | scratch |
| 7.50 (thump 7.70, 86%) | **Verdict:** stamp **RETURN TO SENDER** (the lecture, sent back) | stamp thump · "Return to sender." (7.50–8.50) |
| 8.40–9.00 | The envelope flips back over (cut at 8.65), then crossfades into frame 0 | whoosh → loop |

**Voice-over (29 words, about 3.4 words/s, dry, amused):**
> Your habit is three bucks a day. For ten years? About eleven grand. Flip side? A year of it costs less than one iPhone eighteen Pro. Return to sender.

**The envelope math (3 lines, the ladder):**
1. `×7   a week ······ $21`  (exact: $3 × 7 = $21)
2. `×52  a year ······ ≈$1,100`  (exact: $21 × 52 = $1,092; a calendar year is $3 × 365 = **$1,095**, which the back of the envelope shows)
3. `×10  a decade ···· ≈$11,000`  (exact: **$10,950**; $10,957.50 counting leap days)

**ASSUME sticky:** *every day, for 10 years.* (The $3 is on the tape right above it.)
**Sources:**
- **iPhone 18 Pro starting price $1,199** (256GB; announced 2026-09-09, $100 more than the iPhone 17 Pro's $1,099). Apple's own store page: https://www.apple.com/shop/buy-iphone/iphone-18-pro ; MacRumors, 2026-09-09: https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/. **Re-verified live with WebSearch on 2026-10-07** (polish pass); the earlier rumour-headline MacRumors link is replaced. The rendered video still doesn't print the price: the claim "a year of it costs less than one iPhone 18 Pro" holds at any starting price of $1,096 or more, and the exact $1,095 on the back is pure math. $1,199 appears in the pin and description.
- The $3 is the viewer's own number (the tape says "YOUR habit"). It is not a price we quote, so no source is needed. The comparison is made against the **Pro** on purpose: a base model may cost less than $1,095, so "one new iPhone" alone would not be safe.

**Ending**
- **Loop / re-hook:** "…than one iPhone 18 Pro." → stamp + "Return to sender." → flip → "Your habit is three bucks a day. For ten years?"
- **Comment bait (a real question):** "What's your $3? I'll ladder the best ones." Confession comments are the engine here ("my $3 is a Celsius"), and requests feed the series.
- **Pinned comment:**
  > Exact: $3 × 365 = $1,095 a year, $10,950 a decade ($10,957.50 with leap days). Envelope said ≈ $11,000, within 0.5%. (The ×52 rung gives $1,092 because 52 weeks is 364 days. Hence the ≈.) The iPhone 18 Pro starts at $1,199 (Apple, Sept 9 2026), so a year of a $3 habit is $104 less; any habit up to $3.28 a day still comes in under it. Invest-it camp, here's your number: $91.25 at the end of each month at an assumed 7% a year, compounded monthly, for 10 years ≈ $15,800, before fees and taxes. Arithmetic, not a recommendation. What's your $3?

**Description**
> Your habit is $3 a day. For 10 years? About $11,000. Flip side? A whole year of it ($1,095) costs less than one iPhone 18 Pro. For the friend who keeps getting lectured about their energy drink.
> Educational math, not financial advice.
> Source (checked Oct 7, 2026): iPhone 18 Pro starts at $1,199 (apple.com; announced Sept 9, 2026). The $3 is your number. Exact figures pinned.
> #EnvelopeMath #DayToDecade #moneymath #budgeting

**Platform notes**
- **YouTube Shorts:** title = the tape text + "(Day to Decade No. 03A)". Frame 0 now carries the whole hook, so it works as the thumbnail; the 4.0 s frame (full ladder, underline) is the alternative. Loops count as views but not engaged views, so the series has to earn follows. End screens aren't available on Shorts, so link 03B as the Related video.
- **Instagram Reels:** cover = frame 0 or the 4.0 s frame. The text block is three short rungs (Instagram warns against Reels "predominantly covered by text"). Run it first as a Trial Reel to non-followers. The caption's "for the friend who…" line drives sends, the top non-follower signal, without "tag a friend" bait. Use 4 hashtags (the cap is 5).
- **TikTok:** sound on: one pen scratch per rung, the flip whoosh and the stamp thump do the work of the original's can crack. Reply to "do mine" comments with **video replies** that are new ladders. That is the series' comment loop, and each reply is a new 9 s episode.

**Why this one should travel:** it is the format's biggest proven shape (@mightym11805: $3 a day, 2.0M at 1,106.2x from 594 followers) with all three of vidIQ's fixes added: synced animation, the invested counter-number (pinned) and a dry VO. The tape now asks the question the original's text block answered in frame 1 ("…for 10 years?"), and the ink answers it at 34% of the runtime. The validating punchline is the move the research credits with carrying the format. Naming the phone in everyone's hand turns it into a send ("you bought the phone, let me have my coffee"). The ≈ rounding gives the math police an honest target, and the exact $1,095 is on the back for anyone who checks (report 01 §3.7).

---

#### 03B: "A $1/hr raise is only $8 a day?" · *Day to Decade No. 03B*

- **Topic:** pay and raises (income). **Lane:** Flash, **9.0 s** loop.
- **Spec:** `engine/specs/03-read-it-ladder-b.json` · **Sheet:** `engine/out/sheets/03-read-it-ladder-b.png` · **MP4:** `engine/out/03-read-it-ladder-b.mp4`

**Frame-1 hook (rendered finished on frame 0).** Tape: **A *$1/HR* RAISE IS** / **ONLY $8 A DAY?** ($1/HR in red), with a big 💵 in the middle of the envelope. The question mark turns the dismissive "only" into a dare.
**First spoken line (0.05–2.1 s):** "A one-dollar raise? Only eight bucks a day?"

**Beat sheet**

| Time | Picture | Sound / VO (caption) |
|---|---|---|
| 0.00 | Frame 0 = thumbnail: postmark No. 03B in the flap, 2-strip tape hook ($1/HR in red), a big 💵 in the middle | "A $1 raise?" (0.05–0.90) · "Only $8 a day?" (0.90–2.10) |
| 0.40–0.92 | 💵 fades as the pen writes rung 1: red **×5**, *a week ······ $40* | scratch |
| 1.12–1.84 (20%) | **Partial payoff:** rung 2, **×52**, *a year ······ $2,080* | scratch |
| 1.25–2.28 | ASSUME sticky: *8 hrs × 5 days / pre-tax* | paper |
| 2.04–2.90 (32%) | Rung 3, red and larger (110 px): **×10**, *a decade ······ $20,800* | scratch · "$20,800." (2.50–3.75) |
| 2.45 | Small 💵 pops, lower right | pop |
| 3.10–3.45 | Red double underline under $20,800 (text anchor) | scribble |
| 3.80–4.10 (42%) | **Twist 1:** red pen strikes **ONLY** on the tape (text anchor on the hook) | scratch · "Only." (3.80–4.40) |
| 4.60–5.10 (51%) | Envelope flips (cut at 4.85) | whoosh · "Flip side?" (4.40–5.05) |
| 4.90–6.27 | Back: tape **FLIP SIDE**; red pen, 108 px: *Your boss did / this math too.* | "Your boss did this math too." (5.05–6.60) |
| 6.30 | 👔 pops, bottom-right | pop |
| 6.70–7.29 | Ink, 92 px: *Now you have.* | "Now you have." (6.70–7.70) |
| 7.50 (thump 7.70, 86%) | **Verdict:** stamp **OPENED BY MISTAKE** (the "only" was wrong, and you've now read the boss's math) | stamp thump |
| 8.40–9.00 | The envelope flips back over (cut at 8.65), then crossfades into frame 0 | whoosh → loop |

**Voice-over (24 words, about 3.1 words/s):**
> A one-dollar raise? Only eight bucks a day? Twenty thousand eight hundred. Only. Flip side? Your boss did this math too. Now you have.

**The envelope math (3 lines):**
1. `×5   a week ······ $40`  ($1 × 8 hrs = $8 a day, on the tape; × 5 days)
2. `×52  a year ······ $2,080`  (= 2,080 hours)
3. `×10  a decade ···· $20,800`  (exact, before tax)

**ASSUME sticky:** *8 hrs × 5 days, pre-tax.* (52 weeks a year is the ×52 in the gutter.)
**Sources:**
- **Median usual weekly earnings, full-time wage and salary workers, Q2 2026: $1,251** (BLS *Usual Weekly Earnings* release, 2026-07-21): https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (current release page: https://www.bls.gov/news.release/wkyeng.htm). **Re-verified live with WebSearch on 2026-10-07** (polish pass): still the latest; the Q3 2026 release is due Oct 21 2026 (https://www.bls.gov/schedule/news_release/wkyeng.htm). Used in the pinned comment and description only: $1,251 ÷ 40 = $31.275 an hour, so $1 is a **3.2%** raise.
- The $1 raise is illustrative (it is the viewer's raise), and 2,080 hours is the standard full-time convention (40 × 52).
- "Your boss did this math too" is a wry line, not a factual claim about any employer.

**Ending**
- **Loop / re-hook:** "Now you have." → OPENED BY MISTAKE → flip → "A one-dollar raise? Only eight bucks a day?" The strike on ONLY is gone in frame 0, so the loop re-sets the trap.
- **Comment bait:** "What was your last raise, per hour? I'll run it to a decade." This is the same request engine as 03A, on the income side. Salary talk is a proven send/comment magnet: Salary Transparent Street passed 1B views in two years (raw/web-trends-and-whitespace.md).
- **Pinned comment:**
  > Exact: $20,800 before tax (8 hrs × 5 days × 52 weeks × 10 years = 20,800 hours). Envelope said $20,800, within 0%. Real calendars have 260 to 262 weekdays a year: 2026 to 2035 has 2,608 of them, which is $20,864 (within 0.3%). For the median full-time worker ($1,251 a week, BLS Q2 2026, about $31.28 an hour at 40 hrs) $1 is a 3.2% raise. Spread over every calendar day it's $5.70 a day. If your later raises are percentages, they're figured on top of it. Pre-tax, no overtime. What was your last raise, per hour?

**Description**
> A $1-an-hour raise is only $8 a day? On the envelope: $40 a week, $2,080 a year, $20,800 a decade, before tax. Your boss did this math too. Now you have. For the coworker who said "it's only a dollar."
> Educational math, not financial advice.
> Assumptions: 8-hour days, 5 days a week, 52 weeks, pre-tax. Context: median full-time pay is $1,251 a week (BLS Usual Weekly Earnings, Q2 2026, released Jul 21, 2026), so $1/hr is about a 3.2% raise. Checked Oct 7, 2026. Exact figures pinned.
> #EnvelopeMath #DayToDecade #salary #payraise

**Platform notes**
- **YouTube Shorts:** title = tape text + "(Day to Decade No. 03B)". Choose the 4.3 s frame as the thumbnail (struck ONLY, $20,800 underlined), or frame 0. Raise-season timing helps: post in late-year review season (Oct to Jan).
- **Instagram Reels:** cover = the 4.3 s frame. Sends are the goal, so the caption names a person ("the coworker who said it's only a dollar"). Use 4 hashtags. Consider a carousel follow-up: "$1, $2, $3 an hour, to a decade" as a save-worthy table.
- **TikTok:** sound on: the strike gets its own scratch on "Only.", and the stamp thump closes the back. Stitch-friendly: invite "stitch this with your raise". Reply to comments with video ladders of viewers' raises.

**Why this one should travel:** it is the ladder with the lecture turned onto the *income* side. The research's wage-ladder variant ("If you make $X/hr full time…", @financebestiechloe 399K) proves the hook, and Kel King's 1,131.1x shows how hard "one small weekly number × a year" lands. It adds a red-pen strike on the viewer's own dismissive word ("only"), which is visible working and a twist in one mark. "Your boss did this math too. Now you have." is a send-to-a-coworker line that validates the viewer without telling anyone what to do, and the postal stamp lands the joke.

---

#### 03C: "The average new-car payment is $787/mo. For 10 years?" · *Day to Decade No. 03C*

> **Replaced 2026-10-07 (polish pass).** The old 03C ("$2 a day on Powerball, for 10 years?") was the slate's third Powerball teaser (09C and the old 10C also cover it), so it was retired. The new 03C keeps the Day to Decade shape on a different everyday number: the average new-car payment. It isn't a lottery, coffee or phone topic (03A and 05B cover habits and phones). Its Powerball facts, pin and help line are retired with it.

- **Topic:** car payments (the biggest recurring bill most people never ladder). **Lane:** Flash, **9.6 s** loop (`loop: true`).
- **Spec:** `engine/specs/03-read-it-ladder-c.json` · **Sheet:** `engine/out/sheets/03-read-it-ladder-c.png` · **MP4:** `engine/out/03-read-it-ladder-c.mp4`

**Frame-1 hook (rendered finished on frame 0).** Tape, 3 strips: **AVERAGE NEW-CAR** / **PAYMENT: *$787*/MO.** / **FOR 10 YEARS?** ($787 in red), with a big 🚗 in the content zone and the No. 03C postmark in the flap. That is a sourced number, a stake and a question; the ink answers it at 4.15 s.
**First spoken line (0.05–3.0 s):** "The average new-car payment is seven eighty-seven a month."

**Beat sheet** (times from the spec)

| Time | Picture | Sound / VO (caption) |
|---|---|---|
| 0.00 | Frame 0 = thumbnail: postmark No. 03C in the flap, the 3-strip tape hook ($787 in red), a big 🚗 in the middle of the envelope | "Average new-car payment:" (0.05–1.50) |
| 0.45–1.20 (13%) | 🚗 fades as the pen writes rung 1. **Partial payoff:** red **×12**, *a year ······ $9,444* | scratch |
| 1.30–2.40 | ASSUME sticky: *$787 every month, 10 yrs* | paper · "$787 a month." (1.50–3.00) |
| 1.45–2.02 | Pencil source line, right: *Edmunds, Q3 2026* | |
| 2.60 | Small 🚗 pops, lower right | pop · "For 10 years?" (3.00–3.80) |
| 3.25–4.15 (43%) | Rung 2, red and larger (120 px): **×10**, *a decade ······ $94,440*. The value lands 3.80–4.15 and answers the hook | scratch · "$94,440." (3.80–4.70) |
| 4.20–4.55 | Red double underline under $94,440 (text anchor) | scribble |
| 4.75–5.25 (49%) | **Pattern break:** the envelope flips (cut at 5.00) | whoosh · "Flip side?" (4.75–5.40) |
| 5.05 | Back: tape **FLIP SIDE** | tape |
| 5.20–6.03 | Ink (80 px, 5.20–5.76): *$94,440 ÷ 20,800 hrs*; pencil under it (64 px, 5.45–6.03, no pen): *(10 yrs of 40-hr weeks)* | scratch |
| 6.05–6.47 | **Hero line**, red pen, 190 px: ***$4.54*** | scratch · "That's $4.54" (5.50–6.50) |
| 6.78–7.51 | Ink (84 px): *of every hour you work* | "of every hour you work." (6.50–7.80) |
| 7.25 | 🚗 pops, bottom-left | pop |
| 7.90 (thump 8.10, 84%) | **Verdict:** stamp **POSTAGE DUE** (the per-hour cost nobody quotes you) | stamp thump · "Postage due." (8.05–8.95) |
| 9.00–9.60 | The envelope flips back over (cut at 9.25), then crossfades into frame 0 | whoosh → loop |

**Voice-over (26 words, about 2.9 words/s, dry):**
> The average new-car payment is seven eighty-seven a month. For ten years? Ninety-four grand. Flip side? That's four fifty-four of every hour you work. Postage due.

**The envelope math (3 lines):**
1. `×12  a year ······ $9,444`  ($787 × 12, exact)
2. `×10  a decade ···· $94,440`  (120 payments, exact. The VO's "ninety-four grand" is within 0.5%.)
3. Back: `$94,440 ÷ 20,800 hrs = $4.54`  (20,800 = 40 hrs × 52 weeks × 10 years, which is 03B's decade of hours; exact $4.5404, so $4.54 is within 0.01%)

**ASSUME sticky:** *$787 every month, 10 yrs.* The back carries the second assumption in pencil: *(10 yrs of 40-hr weeks)*.
**Sources** (all checked with WebSearch on 2026-10-07; see the Final fact check):
- **Average monthly payment on financed new-vehicle purchases, Q3 2026: $787** (record; $777 in Q2 2026, $756 in Q3 2025). Edmunds press release, 2026-10-01: https://www.globenewswire.com/news-release/2026/10/01/3373320/0/en/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html ; CNBC, 2026-10-06: https://www.cnbc.com/2026/10/06/car-loans-are-getting-longer-as-monthly-payments-hit-record-highs.html
- Same release, used in the pin and reply only: **21.2%** of financed new-car purchases had payments of **$1,000 or more** in Q3 2026; average APR **7.0%**; average amount financed **$44,664**.
- Corroboration on a different basis (all new-vehicle loans, Q2 2026): Experian, **$765**: https://www.experianplc.com/newsroom/press-releases/2026/hybrids-continue-to-gain-ground-amid-elevated-gas-prices--accord. We quote Edmunds because it is the newer quarter and the one the news cycle is using.
- **BLS median full-time weekly earnings, Q2 2026: $1,251** (pin only), as in 03B.
- The 10-year run and the 40-hour week are labelled assumptions, on screen.

**Ending**
- **Loop / re-hook:** "…of every hour you work." → POSTAGE DUE → flip → crossfade into "The average new-car payment is seven eighty-seven a month."
- **Comment bait (a real question):** "What's your payment? I'll run it per hour." Everyone knows their own number, so it's a one-word comment ("$640"), and replies feed the series (each reply is a video ladder).
- **Pinned comment:**
  > Exact: $787 × 12 = $9,444 a year; × 10 = $94,440 a decade (120 payments). ÷ 20,800 work hours (40 hrs × 52 weeks × 10 years) = $4.5404, shown as $4.54. Per calendar day it's $25.87. At the median full-time wage ($1,251 a week, BLS Q2 2026, about $31.28 an hour) $4.54 is 14.5% of gross pay: roughly the first 8.7 minutes of every hour, before tax. Source: Edmunds Q3 2026 (released Oct 1 2026), average payment on financed new vehicles, up from $756 a year earlier. Assumption: the same $787 every month for 10 years, one loan after the next. Arithmetic, not a recommendation. What's your payment? I'll run it per hour.
  > *Reply key (40-hr weeks):* $400 → $2.31 an hour · $600 → $3.46 · $1,000 → $5.77 (21.2% of new-car buyers pay $1,000+, Edmunds Q3 2026).

**Description**
> The average new-car payment is $787 a month. For 10 years? $94,440. Flip side: that's $4.54 of every hour you work. For the friend who just said "it's only $787 a month."
> Educational math, not financial advice.
> Source (checked Oct 7, 2026): Edmunds Q3 2026 new-vehicle finance data, released Oct 1, 2026 (average monthly payment on financed new vehicles: $787). Assumptions: the same $787 every month for 10 years; 40-hour weeks, 52 weeks a year. Exact figures pinned.
> #EnvelopeMath #DayToDecade #carpayment #moneymath

**Platform notes**
- **YouTube Shorts:** title = tape text + "(Day to Decade No. 03C)". Frame 0 (tape + 🚗) is the thumbnail; the 4.6 s frame ($94,440 double-underlined) is the alternative. The Edmunds figure came out on Oct 1 and CNBC ran it on Oct 6, so post while it's in the news. Edmunds publishes each quarter's figures shortly after the quarter closes (Q3 came out Oct 1), so refresh the $787 when the Q4 number is out; until then the on-screen "Edmunds, Q3 2026" line dates it honestly.
- **Instagram Reels:** cover = the 4.6 s frame. The caption's "for the friend who…" line drives sends without "tag a friend" bait. Run it as a Trial Reel first. 4 hashtags.
- **TikTok:** sound on: one scratch per rung, the flip whoosh, then the stamp thump after "of every hour you work." Invite "stitch this with your payment" and reply with per-hour video ladders. No lender, dealer or product is named or linked, so TikTok's finance branded-content rules aren't triggered.

**Why this one should travel:** "How much are you paying a month for your car?" is a proven comparison hook in the research: AutoBuddy's street-interview short asks exactly that (2.33M views, but it is a paid ad, so we take the structure only), the bald trader's "Car Loan vs Cash Payment" did 3.2M at 17.7x, and Kel King's car ladder hit 1,131.1x (evidence table above; `research/raw/yt-personal-money-math.md` rows 13 and 16). The number is record-high and in this week's news. The front gives the Kel King-style big total ($94,440), and the flip side turns it back into the viewer's own working hour: the wage-ladder variant (@financebestiechloe, 399K) applied to a bill. It doesn't lecture. There's no "buy used", only a conversion everyone can redo with their own payment, which is what fills the comments ("mine's $1,100", "paid off, sorry", "it's a tool, I need it"). 20,800 hours is the same decade 03B wrote down, so the series rhymes.

---

### Math check

Script: `teasers/03-read-it-ladder-mathcheck.py`. It recomputes every number that is written, spoken or pinned in 03A, 03B and 03C from the sourced inputs and labelled assumptions, asserts each displayed rounding, and prints the "within Y%" for each pinned comment. Each input carries its source and check date in the script header. The polish pass replaced the Powerball block with the 03C car-payment math (rungs, the $4.54 flip side, the pin's per-day, median-wage and $1,000-payment figures, and the reply key) and added a cross-check: it reads the three specs, confirms that every number drawn on screen or shown in a caption traces to the math, and confirms that each spec's `vo` is its captions' `say` text in order. Run: `python3 teasers/03-read-it-ladder-mathcheck.py`

Output (2026-10-07, after the polish pass):

```
======================================================================== 
03A  Your habit is $3 a day  (assumption: same $3, every day, 10 years)
========================================================================
  rung 1  x7 : $3 x 7 = $21                       (shown '$21', exact)
  rung 2  x52: $21 x 52 = $1,092; 365 days = $1,095  (shown '≈$1,100', within 0.46% of $1,095)
  rung 3  x10: $1,095 x 10 = $10,950; with leap days $10,957.50
           shown '≈$11,000': within 0.46% of $10,950 and 0.39% of $10,957.50
  flip side: a year $1,095 < iPhone 18 Pro $1,199  (by $104, = 91.3% of the phone)
  claim 'a year < one iPhone 18 Pro' holds for any starting price >= $1,096
  break-even habit: $1199 / 365 = $3.285 a day -> 'up to $3.28'
  invest-camp: $91.25 at the end of each month, assumed 7%/yr compounded monthly, 120 months = $15,794 -> '≈$15,800'
               (annual deposits, annual compounding would give $15,129)
======================================================================== 
03B  A $1/hr raise is only $8 a day  (assumption: 8-hr days, 5 a week, 52 weeks, pre-tax)
========================================================================
  tape : $1 x 8 hrs = $8 a day
  rungs: x5 = $40 a week; x52 = $2,080 a year; x10 = $20,800 a decade (all exact)
  hours: 8 x 5 x 52 = 2,080 a year
  weekdays per calendar year: 2026:261, 2027:261, 2028:260, 2029:261, 2030:261, 2031:261, 2032:262, 2033:260, 2034:260, 2035:261, 2036:262
  2026-2035 weekdays x 8 hrs = 20,864 hrs -> $20,864 (envelope said $20,800, within 0.31%)
  BLS median $1,251/wk / 40 = $31.275/hr -> $1 is a 3.20% raise
  per calendar day: $2,080 / 365 = $5.70
======================================================================== 
03C  Average new-car payment $787/mo  (assumption: the same $787 every month for 10 years;
     40-hr weeks, 52 weeks a year)
========================================================================
  rungs: $787 x 12 = $9,444 a year; x 10 = $94,440 a decade (exact, 120 payments)
  flip side: $94,440 / 20,800 hrs (10 yrs of 40-hr weeks) = $4.5404 an hour worked
             shown '$4.54': within 0.008%
  VO 'ninety-four grand': $94,000, within 0.47% of $94,440
  per calendar day: $9,444 / 365 = $25.8740 -> '$25.87' (pin)
  per clock hour, 24/7: $9,444 / 8,760 = $1.078 (pin: '≈$1.08 an hour, even parked')
  vs BLS median $31.275/hr: 14.52% of gross pay = the first 8.71 min of every hour (pin: '≈8.7 min')
  a $1,000 payment (21.2% of new-car buyers): $5.7692 of every hour -> '$5.77' (pin)
  Edmunds context (pin): Q2 2026 $777, Q3 2025 $756 -> +$31 (4.1%) in a year; APR 7.0%, financed $44,664, interest $9,938; 25.5% of loans 84+ months
    $  400/mo -> $2.31 of every hour worked
    $  600/mo -> $3.46 of every hour worked
    $  787/mo -> $4.54 of every hour worked
    $1,000/mo -> $5.77 of every hour worked
======================================================================== 
Cross-check: every number on screen or in a caption traces to the math above
========================================================================
  03A: 20 strings, numbers on screen/captions [3, 7, 10, 18, 21, 52, 1095, 1100, 11000] -> all trace
  03B: 19 strings, numbers on screen/captions [1, 5, 8, 10, 40, 52, 2080, 20800] -> all trace
  03C: 22 strings, numbers on screen/captions [3, 4.54, 10, 12, 40, 787, 2026, 9444, 20800, 94440] -> all trace

all assertions passed
```

### Production notes (writer's log)

*Superseded by the Verification log below. The "0 warnings" line was true under the linter at the time of writing; the linter has since added frame-0, text-size and stamp checks, and the specs were reworked to pass them.*

- `node src/cli.js check` passes with **0 warnings** on all three specs (9.0 s each).
- I measured caption widths in the caption font: every line is ≤ 800 px, so none reaches the right button rail (x > 940). Captions use numerals so they match the ink.
- Fixed during QA:
  - The red strike on the tape word "ONLY" (03B) was hidden *under* the tape, because hooks are drawn in screen space after paper ops. It is now `fixed: true, z: 5`.
  - The sticky collided with the decade rung, so I moved the ladder up and narrowed the sticky.
  - 03A's back named "one new iPhone"; it now says "iPhone 18 Pro", because a base model can cost less than $1,095.
  - 03C's back question was enlarged to two lines.
  - The pen now starts at 0.7 s, so frame 1 isn't static for long.

---

### Verification log

> **Historical.** This log records the first QA pass. Its 03C rows describe the retired Powerball teaser, and its iPhone and BLS rows ("couldn't re-open") are superseded by the [Final fact check](#final-fact-check), which re-verified them live. Spec coordinates and timings below are the pre-polish ones; the current ones are in the beat sheets above and in the [Polish pass](#polish-pass).

QA pass by the independent fact-checker / editor, 2026-10-07. Everything below was checked against the md, the three specs, the rendered sheets and stills, and `research/`. Files changed: this md, `engine/specs/03-read-it-ladder-{a,b,c}.json`, `teasers/03-read-it-ladder-mathcheck.py` (a QA block was appended), and the sheets and stills in `engine/out/`. `engine/src` was not touched.

**Limitation.** This run's shared WebSearch budget was already used up when QA started; the tool refused the first query. Direct fetches of the cited primary pages (apple.com, cnbc.com, macrumors.com, bls.gov, powerball.com, lotteryusa.com) were all blocked by the egress proxy. I did not use search engines, readers or archives to get around this. Inputs were therefore cross-checked against other teams' WebSearch records in this repo and re-derived from first principles where possible. Where neither was enough, I took the input off the rendered video.

#### 1. Math (independent recompute in python3)

Every number in the md, the VO, the captions, the ink, the stickies, the pins and the descriptions was recomputed from scratch, separately from the writer's script. Checked: $3 × 7 / × 52 / × 365 / × 3,650; ≈$1,100 and ≈$11,000 (0.46%; 0.39% with leap days); $1,199 − $1,095 = $104; $1,199 ÷ 365 = $3.285; the 7% annuity ($15,794); $8 / $40 / $2,080 / $20,800; weekdays 2026–2035 = 2,608 (×8 = $20,864, 0.31%); $1,251 ÷ 40 = $31.275 and 3.197%; $2,080 ÷ 365 = $5.70; C(69,5) × 26 = 292,201,338; ÷ 3,650 = 80,055.16 (80,055.66 as independent draws; ≈1 in 80,000 is within 0.07%); any-prize odds 1 in 24.867 re-derived from the matrix; 146.8 expected prizes; 1 in 16,011 over 50 years; 292,201 tickets = 800.6 years ≈ $584,403.

**Result: no arithmetic errors.** Three wording fixes for precision:
- 03A pin: "$91.25 a month at 7% ≈ $15,800" holds only for end-of-month deposits compounded monthly (annual compounding gives $15,129). The pin now says so.
- 03A pin: "the break-even habit is $3.28 a day". Break-even is $3.285, so it now reads "any habit up to $3.28 a day still comes in under it".
- 03C pin: "147 small prizes" now reads "147 prizes of any size". The expected count covers every tier.

The writer's script still passes, with a QA block added: (exactly $1,095), the 03A claim's price threshold, the compounding convention, and the any-prize odds from the matrix.

#### 2. Facts

| Input | Where it's used | Status | Action |
|---|---|---|---|
| iPhone 18 Pro from $1,199 (Apple event, 2026-09-09) | 03A. It was **on screen** ("(it starts at $1,199)"), and also in the pin and description | Only source: the 05 writer's WebSearch. 05's own QA marked it **unverified** (the MacRumors slug reads like a pre-event rumour headline). This QA couldn't re-open it. | **Removed from the rendered video.** The ink sub-line now shows the exact year, "(exactly $1,095)", which is pure math and also serves the math police. The on-screen claim "a year of it costs less than one iPhone 18 Pro" holds at **any** starting price of $1,096 or more. That includes $1,099, the iPhone 17 Pro's 2025 launch price (from QA's reference knowledge, not re-searched), so it survives even if Apple held the price flat; the script asserts this. $1,199 stays in the pin and description with its source. **Re-check on apple.com before posting the pin.** |
| BLS median full-time weekly earnings, Q2 2026: $1,251 | 03B pin and description only | Writer-verified with WebSearch by three teams (02, 05, 08), with the same release, date and URL. QA couldn't re-open bls.gov. | Kept. BLS normally publishes Q3 in mid-October, so refresh the pin if it's out when posting. |
| Powerball: $2 a play; jackpot 1 in 292,201,338; any prize 1 in 24.87 | 03C sticky, ladder, pin, description | Writer-verified by 09 (full prize chart in its source table). Both odds are **re-derived** here from the 5-of-69 + 1-of-26 matrix. | Kept |
| 1-800-GAMBLER (NCPG) | 03C pin and description | Recorded by 09; matches QA's reference knowledge | Kept |
| Research claims in this md (1,106.2x, 285.7x, 594 followers, 69% sound-off, YouTube 2025-03-31 / Instagram 2025-04-21 replay counting, "≈70% graded C or lower", Salary Transparent Street 1B) | Why it goes viral, Upgrade, Why it should travel | Each checked against `research/01`, `research/raw/ig-tiktok-outliers.md`, `raw/web-trends-and-whitespace.md` and `watch/group2-video1/2` | **One fix:** the md paired "the highest-outlier hook type in the IG/TikTok sweep" with "the daily-habit cluster's median is 285.7x". The paycheck cluster's median is higher (453.7x). It now says the raw sweep calls the ladder the highest-outlier type (top post 1,106.2x) and that the cluster median is second to paycheck splits. |

#### 3. Brand and policy (format bible §2)

| Rule | Before QA | After QA |
|---|---|---|
| ≤ 3 lines of math | Pass (3 ladder rungs) | Pass. 03A's back sub-line is the exact figure, not a calculation. |
| **A number in frame 1** | **Fail, all three.** A still at t = 0 (rendered and viewed) was a blank envelope: no hook, no postmark, no prop. Hooks and postmarks animated in from t = 0. | Pass. Hooks sit at `t: 0`, which the current engine renders finished (`instant`). Postmark (t −0.4) and prop (t −0.5) are pre-rolled. Re-rendered frame 0 shows the tape, $3/$1/$2 in red, the postmark and the prop. |
| Honest rounding + exact pinned comment | Pass | Pass. 03A now also shows the exact $1,095 on screen. |
| ASSUME sticky | Present, but 38–42 px handwriting | 56 px on all three (see §5) |
| No advice language | Pass | Pass. VO, captions, ink, pins and descriptions were scanned for "should", "need to", "must", "guaranteed", "get rich" and "financial freedom". The pins say "Arithmetic, not a recommendation"; 03C adds "either way" and the help line. |
| Disclaimer | Pass | Pass: "Educational math, not financial advice." in all three descriptions |
| No borrowed footage or impersonation | Pass | Pass. Everything is drawn. Apple, BLS and Powerball appear only as names, prices and published figures. |

#### 4. Virality

Hooks were scored 1–10 against `research/02` §3 (evidence, anatomy, hook formulas) and `watch/group2-video1` (@mightym11805, 1,106.2x), `watch/group2-video2` (@anatalksmoney, 491.2x) and `watch/group3-video2` (Kel King, 1,131.1x).

| Teaser | Before | After | Why |
|---|---|---|---|
| 03A | **6** | **8** | Before: frame 0 was blank. Once in, "YOUR HABIT IS / $3 A DAY" copies the 1,106x formula but drops the stake: the original's frame 1 runs all the way to "$10,800 every 10 years". After: "YOUR HABIT IS / *$3* A DAY. / FOR 10 YEARS?" gives a number, a stake and a question (bible §6) on frame 0, and the ink answers it at 34% of the runtime. |
| 03B | **6.5** | **8** | Before: blank frame 0. The copy itself was strong (7.5): "ONLY" is a built-in argument the red pen later strikes. After: on frame 0, with a question mark ("ONLY $8 A DAY?") that turns the dismissal into a dare. The verdict stamp now lands in the last 2 s. |
| 03C | **6** | **8** | Before: blank frame 0, and "$2 A DAY ON / POWERBALL" had no stake. After: "*$2* A DAY ON / POWERBALL, / FOR 10 YEARS?" uses the same Day to Decade template as 03A, so the series reads as one. |

**Pacing.** The VO ran at 3.4 to 4.0 words a second (up to about 240 wpm), with segments up to 8 syllables a second, which is not the bible's "calm, dry" voice. Five captions were under 0.25 s per word: 03A "Your habit is $3 a day." and "A year of it costs less"; 03B "A $1 raise? Only $8 a day." and "Your boss did this math too."; 03C "Jackpot odds by then?". The VO was cut to 24–29 words (3.1 to 3.4 words a second); the ink carries the rungs the voice skips. Every caption is now at least 0.25 s per word, and each caption that names a number now appears with or after the pen writes it (03A's "$11,000" and 03B's "$20,800" used to land up to 0.6 s early).

| | First partial payoff (≤ 40%) | Hook answered | Pattern break (flip) | Last 2 s (7.0–9.0 s) | Loop |
|---|---|---|---|---|---|
| 03A | year ≈$1,100 at 1.93 s (21%) | ≈$11,000 at 3.04 s (34%) | 4.15 s (46%); was 5.0 s (56%) | exact $1,095 (to 7.33 s), RETURN TO SENDER thump at 7.75 s with spoken "Return to sender." | flip at 8.75 s, cut at 9.0 s to frame 0 |
| 03B | year $2,080 at 1.83 s (20%) | $20,800 at 2.90 s (32%); strike on ONLY at 3.8 s | 4.6 s (51%); was 5.75 s (64%) | OPENED BY MISTAKE thump at 7.85 s. **Before, 03B had no verdict in the last 2 s:** its stamp was on the front at 55%. | same |
| 03C | decade $7,300 at 2.30 s (26%) | ≈1 in 80,000 at 3.55 s (39%) | 4.75 s (53%); was 5.3 s (59%) | hero "1 in 1." (6.95–7.53 s), POSTAGE DUE thump at 7.95 s | same |

On "biggest number last": in this format the decade rung *answers the hook*, so it lands at about a third of the runtime by design. The last 2 s carry the flip-side verdict, which bible §2.5 allows ("the biggest number **or verdict**"). 03B's stamp changed from SPECIAL DELIVERY on the front to **OPENED BY MISTAKE** on the back. In the lexicon that means a plot twist where the obvious answer ("only") was wrong, and it doubles as a postal joke: you've now read the boss's math.

#### 5. Visual QA

Sheets for all three were rendered and viewed four times as fixes landed. Stills were rendered and viewed at t = 0, at the full front (4.0 / 4.3 / 4.4 s), at the stamp slam (7.7–7.85 s) and at the final back (8.5 s), with the safe-zone overlay. Found and fixed:

1. **Blank frame 0** in all three (see §3).
2. **Five captions under 0.25 s per word**, and two captions that gave away numbers before the ink wrote them (see §4).
3. **Ladder values touched the button rail.** The right edge sat at x 930 plus glyph overshoot, right on the x 940 line. The ladders are now `w: 800` (ending at x 910) and the underlines were re-measured to match.
4. **The 3-strip tapes** (03A, 03C) overlapped the postmark (lint) and the prop. The postmark moved to y 290 on all three, the props to y 300–310, the tapes to y 432 and the ladders to y 770.
5. **Sticky text was 38–42 px**, below the linter's new 56 px phone minimum, and the stickies' real height reached the caption band. The stickies are now 56 px (w 340–360). The ladder rows were tightened (`rowH` 104 for 03A/03C, 116 for 03B; the ladder labels are 64–72 px) to make room. 03B's sticky reads "8 hrs × 5 days, pre-tax" (same assumption, 2 lines). 03C keeps the exact odds, on 3 lines.
6. **03C's POSTAGE DUE slam** (1.9× overshoot) covered "1 in 1." mid-slam. It moved to (710, 1215) at size 60.
7. **03B's strike** was re-measured for the new "ONLY $8 A DAY?" line (x 201, w 222). The stills confirm it lands on ONLY.

`node src/cli.js check`: **0 warnings on all three** under the current linter. That linter changed during this pass (frame-0, stamp, postmark, text-size and caption-pace checks were added), so re-run `check` if it changes again.

#### Engine requests (not implemented: `engine/src` is out of bounds)

- `check`: the sticky box ignores `rot`, so a rotated sticky's corners can poke about 12 px outside it.
- `check`: stamps are boxed at their settled size, but the `slam` entrance starts at 1.9× and can cover neighbouring text for about 0.15 s. Either lint the peak footprint against text that's on screen, or add a gentler `slam: "soft"` for stamps placed next to hero text.
- README: `ladder` accepts `rowH` (used here) but the ops table doesn't list it.
- Nice-to-have: a lint that warns when a caption shows a number before the ink op that writes it (a spoiler check).

#### Open before publishing

*Updated by the polish pass.*
- ~~Re-verify the iPhone 18 Pro $1,199 starting price.~~ Done 2026-10-07 (Apple store page; see the Final fact check).
- BLS's Q3 2026 *Usual Weekly Earnings* is due **Oct 21 2026**. If it's out at posting time, refresh $1,251 and the 3.2% in 03B's pin, and the $31.28 / 14.5% / 8.7 minutes in 03C's pin (re-run the math check).
- 03C: if Edmunds' Q4 2026 figure is out at posting time, keep the video (it says "Q3 2026" on screen) but add the new figure to the pin.
- Record the VO to the caption timings in the specs: each caption's `say` is the line to read, and each spec's `vo` is those lines joined (24–29 words in 8.5–9 s).

---

### Final fact check

Polish pass, 2026-10-07. Every real-world input that is on screen or in this md was re-checked live with WebSearch, against the primary source where the search engine reached it. Direct page fetches were blocked by the network egress proxy (edmunds.com, globenewswire.com, autoremarketing.com, briefglance.com and others), so values were read from the search engine's view of the cited pages. No 03A or 03B value changed, so nothing cascaded. The new 03C input is the Edmunds Q3 2026 release. The math check passes, and its cross-check traces every number on screen and in captions to it.

| Input | Value used | Source URL | Checked on | Status |
|---|---|---|---|---|
| iPhone 18 Pro starting price (03A pin, description; the on-screen claim only needs ≥ $1,096) | $1,199 (256GB; announced Sept 9 2026; +$100 vs the iPhone 17 Pro) | https://www.apple.com/shop/buy-iphone/iphone-18-pro ; https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/ (Sept 9 2026) | 2026-10-07 | **Confirmed** on Apple's store page and MacRumors (QA had it unverified). The rumour-slug MacRumors link is replaced. |
| iPhone 17 Pro launch price (03A md, as the floor the claim survives) | $1,099 | implied by the same MacRumors report ("$100 increase over the equivalent iPhone 17 Pro") | 2026-10-07 | **Confirmed** (indirectly: $1,199 − $100) |
| BLS median usual weekly earnings, full-time wage and salary workers, Q2 2026 (03B pin and description; 03C pin) | $1,251 (120.9M workers; +4.6% y/y) | https://www.bls.gov/news.release/wkyeng.htm (release of Jul 21 2026; archive https://www.bls.gov/news.release/archives/wkyeng_07212026.htm) | 2026-10-07 | **Confirmed.** Still the latest; Q3 2026 is due Oct 21 2026 (https://www.bls.gov/schedule/news_release/wkyeng.htm). |
| Edmunds: average monthly payment, financed new-vehicle purchases, Q3 2026 (03C **on screen**: tape, sticky, ladder, captions) | **$787** (Q2 2026 $777; Q3 2025 $756) | https://www.globenewswire.com/news-release/2026/10/01/3373320/0/en/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html (Edmunds release, Oct 1 2026); https://www.cnbc.com/2026/10/06/car-loans-are-getting-longer-as-monthly-payments-hit-record-highs.html (Oct 6 2026) | 2026-10-07 | **Confirmed** in two independent sources. A record high. |
| Edmunds Q3 2026: share of financed new-car purchases at $1,000+/month (03C reply key) | 21.2% (Q2 20.3%; Q3 2025 19.1%) | same Edmunds release; CNBC Oct 6 2026 | 2026-10-07 | **Confirmed** |
| Edmunds Q3 2026: average APR; average amount financed (03C sources line) | 7.0%; $44,664 | same Edmunds release; CNBC Oct 6 2026 | 2026-10-07 | **Confirmed** |
| Edmunds Q2 2026 average payment (03C context) | $777 (APR 7.0%, financed $44,156) | https://gmauthority.com/blog/2026/07/new-car-buyers-stretching-out-loans-at-record-levels-in-q2-2026/ (Jul 2026) | 2026-10-07 | **Confirmed**; matches the Q3 release's prior-quarter figure |
| Experian average monthly payment, new-vehicle loans, Q2 2026 (03C corroboration only) | $765 | https://www.experianplc.com/newsroom/press-releases/2026/hybrids-continue-to-gain-ground-amid-elevated-gas-prices--accord | 2026-10-07 | **Confirmed.** Different basis and quarter; not used on screen. |
| YouTube Shorts counts every play and replay as a view; old metric kept as "engaged views" (Why it goes viral #1) | from Mar 31 2025 | https://emarketer.com/content/youtube-shorts-changes-view-count-rules-match-tiktok--instagram ; https://support.sproutsocial.com/hc/en-us/articles/35874991211533-YouTube-Shorts-View-Count-Update-March-2025 | 2026-10-07 | **Confirmed** |
| Instagram "Views" replaces plays/replays and counts every start or replay of a Reel (Why it goes viral #1) | from Apr 21 2025 | https://support.agorapulse.com/en/articles/10749883-instagram-metrics-deprecation-apr-2025 ; https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes | 2026-10-07 | **Confirmed** (secondary sources; Meta's own page wasn't in the results) |
| Sound-off viewing (Upgrade #4) | 69% watch with the sound off in public (5,616 US adults aged 18–54, April 2019) | https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx (Verizon Media + Publicis Media) | 2026-10-07 | **Corrected wording:** "69% of US adults" became "69% of US adults aged 18 to 54 … 2019 survey". |
| Creator stats in the evidence tables and "Why it should travel" (views, outlier scores, follower counts, durations; AutoBuddy 2.33M, the bald trader 3.2M at 17.7x, Lugan3d) | as listed | copied from `research/raw/` and `research/watch/` (dated sweeps) | not re-checked | Research-corpus figures, not on screen; unchanged. |
| Powerball odds and price, 1-800-GAMBLER (old 03C) | n/a | n/a | n/a | **Retired** with the old 03C; no longer used anywhere in this approach. |

### Polish pass

2026-10-07, finishing producer. `engine/src` was not edited. Files changed: this md, `engine/specs/03-read-it-ladder-{a,b,c}.json`, `teasers/03-read-it-ladder-mathcheck.py`, and the renders in `engine/out/` (MP4s, sheets, stills). `teasers/teasers.json` was left for the slate index to regenerate.

**Slate change: 03C replaced.**
- The old 03C was "$2 a day on Powerball", the slate's third Powerball teaser. The new 03C is "The average new-car payment is $787/mo. For 10 years?": $787 × 12 = $9,444 a year, × 10 = $94,440 a decade. On the flip side, $94,440 ÷ 20,800 work hours = $4.54 of every hour you work, and POSTAGE DUE lands on it.
- The full 03C section (hook, beat sheet, VO, math, sticky, sources, loop, comment bait, pin and reply key, description, platform notes, why it travels) is written above. The new spec replaces `03-read-it-ladder-c.json`, and the math check was rewritten for it.
- Why this topic:
  - The number is sourced and dated, and it's in this week's news (Edmunds released it Oct 1, CNBC ran it Oct 6).
  - Everyone knows their own payment, so the comment ask gets a one-word answer.
  - The flip side turns a bill into the viewer's working hour, and its 20,800 hours rhymes with 03B.
  - Hook score (same rubric as the QA pass): **8**. It has a number, a stake and a question, and its comparison hook is proven in the research (AutoBuddy, the bald trader).

**Facts**
- Every input was re-verified live (table above). 03A's iPhone 18 Pro price is now sourced to Apple's store page. 03B's BLS figure is confirmed as still the latest (Q3 is due Oct 21). One md wording fix: the 69% sound-off figure covers adults aged 18–54 in a 2019 survey.
- The math script header now carries the source and check date for each input. The Powerball block is gone, the 03C car-payment block is new, and a spec cross-check was added. The script and its output are re-embedded above.

**Specs (all three)**
- **Frame 0** is the thumbnail. The hook, the postmark and a big emoji prop (330–340 px, centred in the content zone) all start at `t: 0` and render finished. The prop fades as the pen starts at 0.40–0.45 s. All negative-t pre-roll (postmark −0.4, prop −0.5) is gone.
- **Postmark** moved into the flap at (175, 258), r 100. The old corner emoji next to it was dropped.
- **Legibility:**
  - Ladders went from size 80–90 to 92–104: labels 74–83 px (were 64–72), gutter multipliers 66–75 px (were 58–65), and red hero rungs 106–120 px.
  - Back punchlines are 96–108 px. 03C's hero is 190 px. Sub-lines are 76–92 px (03A's "(exactly $1,095)" was 60 px). Stickies are 56–58 px.
  - No handwriting is under 64 px except the ASSUME stickies (56–58 px). They are notes, not working, and are still above the linter floor.
- **Layout:** the front fills the content zone. The ladder sits at 660–1060 and the sticky plus a small prop at 1046–1316, under a hook kept at 364–657. Each beat is one screen: the front is the ladder and the back is the flip side, separated by a flip.
- **Engine features:**
  - Every red mark uses a text `target` anchor: the decade double underlines, 03A's $1,095 underline and 03B's strike on ONLY (the hand-measured coordinates and the `fixed`/`z` workaround are gone).
  - 03C's decade rung uses per-row `at` to land on its VO line.
  - Back-side sub-lines use `pen: "small"` / `"small-low"`, and 03C's pencil lines use `pen: false`, so two pens never show at once.
  - `loop: true` on all three. The final flip moved to 0.6 s before the end (it was 0.25 s), so the flip's cut lands just as the 0.35 s crossfade into frame 0 begins. The duration-0.2 s frame shows the blank envelope opening into the hook, not a double exposure.
- **Captions:** they show numerals ("$3", "$20,800", "$94,440"), and `say` carries the spoken form ("three bucks", "twenty thousand eight hundred", "ninety-four grand"). Every caption is ≤ 2 lines and ≤ 4 words/s. Each spec's `vo` equals its joined `say` text, and the math check asserts it.
- **Lint:** `node src/cli.js check` returns zero warnings on all three. Nothing uses `allowOverlap` or `decor`.

**Specs (per episode)**
- **03A (9.0 s):**
  - The sticky now reads "every day, for 10 years". It fits on 2 lines at 58 px; the $3 is on the tape above it.
  - The back sub-line is "(a year: exactly $1,095)" at 76 px, with a red underline on $1,095.
  - RETURN TO SENDER lands at 7.50 s (thump 7.70) and reads for about 0.6 s, plus the 0.25 s squash, before the closing flip.
- **03B (9.0 s):**
  - Ladder size 90 → 96 and punchline 96 → 108 px. "Now you have." went from 88 to 92 px.
  - The strike on ONLY targets the tape text.
  - OPENED BY MISTAKE moved to 7.50 s.
- **03C (9.6 s):** new. Front: 3-strip tape, a 2-rung ladder (×12, ×10) at size 104, the ASSUME sticky and an "Edmunds, Q3 2026" pencil source line. Back: the division line, its pencil explanation, the 190 px $4.54, "of every hour you work" and POSTAGE DUE.

**Render QA** (`node src/cli.js render`, frames pulled with ffmpeg at 540 px and viewed)
- **Frames checked:**
  - 03A at 0.0 / 1.95 (partial payoff) / 3.6 (reveal) / 6.9 / 8.0 (verdict) / 8.8 s.
  - 03B at 0.0 / 1.9 / 4.2 (reveal plus the struck ONLY) / 6.5 / 8.0 (verdict) / 8.8 s.
  - 03C at 0.0 / 1.3 (partial payoff) / 4.6 (reveal) / 6.1 / 6.9 / 8.4 (verdict) / 9.4 s.
- **Fixed after the first render:**
  - The closing flip squashed the back while the loop crossfade drew frame 0 on top of it, which left a double exposure in the last 0.35 s. The flip now cuts before the crossfade starts.
  - 03C's back drew two pens at once: the pencil line and the hero, then the hero's fading pen and the sub-line's. The pencil line is now a pen-less separate `write`, the division writes faster (cps 36), and the hero (6.05 s) and sub-line (6.78 s) wait for the previous pen to clear. 03A's back got the same fix: its sub-line starts after the punchline's pen lifts.
  - 03A's $1,095 underline started before the number finished writing. The sub-line now starts at 6.80 s and the underline at 7.52 s (it was 7.2).
  - 03C's source line was 58 px; it is now 64 px and shortened to "Edmunds, Q3 2026".
- **Audio** (`volumedetect`): 03A mean −22.6 dB, max −1.9 dB; 03B mean −22.9 dB, max −1.8 dB; 03C mean −23.0 dB, max −2.2 dB. All are within the −30 to −18 dB target, with peaks below −1 dB.
