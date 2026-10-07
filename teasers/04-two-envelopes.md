## 4. Two Envelopes (Pick-One Dilemma -> Race to the Crossover)

**Series:** *Two Envelopes* · **Lanes:** one per lane, on purpose: Envelope (04A, 31 s), Race (04B, 52.8 s), Flash (04C, 15 s) · **Lead devices:** `pick` (two sealed envelopes, A and B), a 1-second silent pick beat, the typed crossover rule, a napkin race chart (`curve` + `compare`), red-pen crossover circle, Sealed Answer + guess timer, `FIRST CLASS` / `OPENED BY MISTAKE` stamps, postmark No.
**Teasers:** 04A $1,000,000 now or $1,000 a week for life? · 04B $200 a month at 25 or $400 a month at 35? · 04C $5,000 to sign or $2 more an hour?
**Specs:** `engine/specs/04-two-envelopes-{a,b,c}.json` · **Sheets:** `engine/out/sheets/04-two-envelopes-{a,b,c}.png` · **Math check:** `teasers/04-two-envelopes-mathcheck.py` (all assertions pass, output below)

**Sourcing note (read before publishing).** This run's shared WebSearch budget was already used up when this writer started, and the egress proxy blocks the primary sites (ssa.gov, powerball.com and wikipedia.org all returned `EGRESS_BLOCKED`). So the three teasers are built so that **nothing on screen depends on a real-world statistic**:
- every amount in the dilemmas is the dilemma's own stated hypothetical;
- every rate or hour count is a labelled assumption (ASSUME sticky, or the envelope label);
- the only real-world figure, the BLS median full-time weekly pay of **$1,251** (Q2 2026), appears only in the 04A and 04C descriptions and pins, never in the video.

That BLS figure was verified with WebSearch on 2026-10-07 by the team and is cited with its URL and release date in `teasers/02-rate-clock.md`, `teasers/05-envelope-split.md` and `teasers/08-trap-card.md`. Re-check it on publish day; a newer quarterly release may be out by then. Two topics that needed fresh sourcing were dropped rather than published unverified: Social Security at 62 vs 70, and this week's Powerball cash vs annuity.

---

### Why it goes viral

**The mechanism.** Put two money paths side by side where intuition and math disagree, make the viewer pick in the first second, then run the clock to the moment one path overtakes the other.

1. **Silent commitment.** A binary choice is answered in the head within 1 to 2 s, so the viewer's ego is invested before any explanation starts. Then they stay to check their answer (`research/watch/group5-video3.md`: "Viewers answer it in their own heads within a second, so they're invested before the subject even speaks").
2. **The obvious option usually loses to a rate or an exponent.** The lump sum looks bigger, but the stream wins on its unit or its horizon. In Teacherman's menu, "$1,000 per second" is worth $31.5B a year and beats "$100 Million right now", so the smallest-looking number wins (report 02 §4, our check).
3. **Suspense about *when*, not *whether*.** Race versions hold attention to the overtake. Behind the Border's lands at 0:33 of 62 s (~55%), and viewers stay past the midpoint to see it (`research/watch/group4-video1.md`).
4. **Two defensible answers make two comment camps.** The comments fill with picks, return-rate fights, "day's amount vs running total" corrections and life-expectancy arguments. Filomation's caption is deliberately ambiguous about who the "idiot" is, so both camps comment (`group4-video4.md`).
5. **Algorithmically cheap and loopable.** 5 to 11 s dilemma cards loop past 100% (Filomation 6 s, Granny Drive 5 s). Music-only race tickers are language-free. It is the most consistent small-account breakout format across all three platforms (report 01 §3.6; `raw/yt-puzzles-estimation-business.md` P1).

**The evidence** (copied from `research/02-top-10-approaches.md` §4; "watched" = scene-by-scene breakdown exists):

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| Finance With Sharan | Why You Should Invest Early (early stopper vs late starter) | 69,845,216 | n/a | 48 s | transcript | https://www.youtube.com/shorts/sU9SFT1nAOw |
| Mr Planktin (870K) | Compound interest explained 😂 #shorts (saver vs spender) | 9,059,331 | 153.15x | 61 s | transcript | https://www.youtube.com/shorts/rrpn3zo2Slo |
| Humphrey Yang | Two Investors Buy Apple At The Same Time. Who Makes More? | 8,404,025 | n/a | 36 s | inferred | https://www.youtube.com/shorts/SaGvoCTVCyk |
| Filomation (1.75K) | Someone's never heard of compound interest ($1M vs $1,000/week for life) | 5,662,642 | **388.12x** | 6 s | **watched** | https://www.youtube.com/shorts/klM8NXv-MFg |
| Granny Drive (96.3K) | $200M Once or $20 Per Second? Elon Musk SHUTS It Down 💀 | 5,612,751 | 73.33x | 5 s | inferred | https://www.youtube.com/shorts/H6f0Ip3OoOg |
| Behind the Border (4.1K) | Elon Musk vs MBS: Net Worth Comparison (2012–2027) 💰 | 1,740,010 | **535.07x** | 62 s | **watched** | https://www.youtube.com/shorts/72ifhkiGq40 |
| @investment_timeline (TT, 72.8K) | POV: You invested in Monster instead of paying $3/day for a Monster Energy | 1.5M | 140.6x | 60 s | inferred | https://www.tiktok.com/@investment_timeline/video/7671760671867997473 |
| @jacobhartmanofficial (IG) | You can only keep 1: $900 billion today / $25 million per day / … | 1.2M | 59.4x | 7 s | inferred | https://www.instagram.com/reel/Da8MKBZIzaN/ |
| @ruinvests (IG, 4.9K) | This magic jar goes up by $10,000 every single day | 1.1M | 305.3x | n/a | inferred | https://www.instagram.com/reel/DalTnVjKFu1/ |
| Techtonic (2.18K) | $1 Million NOW or $5 Per Push-Up? 🤯 | 1,059,551 | 97.8x | 36 s | transcript | https://www.youtube.com/shorts/duL1v9d3HOA |
| Zenwish (2.68K) | Would you take $1,000,000… or 1 penny doubled for 30 days? 🤯Most people get this WRONG | 454,859 | 52.01x | 59 s | transcript | https://www.youtube.com/shorts/a_ot_bqjeDQ |
| @mem.efarm (IG, 22.3K) | Would You Take $10k a Day or a Penny? | 372.1K | 224.2x | n/a | inferred | https://www.instagram.com/reel/DaoJRxYNO2A/ |
| Teacherman 91 (104K) | You can only pick one: $100,000 per day / $100 Million right now / $10,000 per minute / $1,000 per second | 308,972 | 94.0x | 49 s | inferred | https://www.youtube.com/shorts/4ziWdQ5bvX0 |
| Teacherman 91 | would you take 1 million cash or a penny that doubles for 30 days? | 246,315 | **735.3x** | 54 s | **watched** | https://www.youtube.com/shorts/p2Vu4YKeJMM |
| Alaric Moses Ong (6.48K) | Would you take the $1 million… if you couldn't spend it on the people who matter most? 🤔💰 | 51,481 | 421.8x | 11 s | inferred | https://www.youtube.com/shorts/z4DXR8vJGTg |

**Counter-evidence we design around.**
- **The doubling penny is worn out.** NYKentertain's version got 6,932,542 views but only 1.81x, and Cletus's got 4.82x.
- **Race repeats decay.** Behind the Border went 535x → 29.8x → 5.2x, and Planktin's sequel fell to 5.52x.

So: **fresh pairs only** (no penny), and a **different payoff shape every episode**.

---

### How the originals do it

**1. Filomation, "Someone's never heard of compound interest"** (5,662,642 views, 388.12x, ~6 s, watched: `research/watch/group4-video4.md`)
- **What it nails.**
  - A real money decision with two defensible answers: $1,000 a week for life vs $1 million.
  - A smug on-screen take ("what an idiot, somebody forgot to take econ") that both camps want to correct.
  - A 5 s static shot that forces a rewatch just to read it, so retention goes past 100%. Zero production cost.
- **What it misses.**
  - **No math at all.** The two numbers that settle it, **19.2 years** to break even and the **5.2%** implied rate, never appear. vidIQ's own fix list starts with "Put the math on screen".
  - **A real winner's photo and name** (privacy and likeness risk), plus a trending track (rights).
  - **No resolution**, so the video builds no trust and gives no reason to follow.

**2. Behind the Border, "Elon Musk vs MBS: Net Worth Comparison (2012–2027)"** (1,740,010 views, 535.07x, 62 s, watched: `research/watch/group4-video1.md`)
- **What it nails.**
  - The race template: one split screen, the year ticking every ~4 s with a rolling-counter SFX, and ages under the numbers for a mood layer.
  - The overtake is deferred to 0:33 (~55%), so the suspense is about *when*. It needs no language.
- **What it misses.**
  - **Unsourced, smoothed numbers.** The MBS series rises in tidy 5s and then collapses.
  - **Repurposed TV footage.**
  - **No explanation of the one jump that matters** ($22B → $68B).
  - **No loop.**
  - **Its own sequels decayed** to 29.8x and 5.2x.

**3. Teacherman 91, "would you take 1 million cash or a penny that doubles for 30 days?"** (246,315 views, 735.3x, 54 s, watched: `research/watch/group5-video3.md`), with Techtonic's "$1 Million NOW or $5 Per Push-Up?" (1,059,551, 97.8x, transcript) as the worked-solve cousin
- **What it nails.**
  - The question stays on screen the whole time.
  - The respondent visibly changes her mind ($1M → "wait…" → the penny), which mirrors the viewer.
  - Techtonic adds the two moves we keep: **annualise the rate** ($5 × 100 × 365 = $182,500 a year) and **compute the break-even** ($1M ÷ $5 = 200,000 push-ups). Then a twist re-hook: "What if it's a dollar per push-up?"
- **What it misses.**
  - **The number is withheld.** Teacherman never says $5,368,709.12, so the "payoff" is rage-bait.
  - **The premise is worn out** (penny).
  - Street-interview production needs a presenter and strangers, which a faceless channel can't batch weekly.

---

### The Envelope Math upgrade

**What we replicate**
- **The dilemma is frame 1, the title and the first spoken line**, with both options as physical sealed envelopes A and B (`pick`).
- **A silent 1-second pick beat** (`timer`, "PICK ONE"), as the research build specifies (0.5–1 s).
- **The race.** Two lines on a napkin chart (`curve` + `compare`) drawn by the pen, with the crossover arriving late.
  - 04A: the crossing lands at ~8.8 s in a 31 s video.
  - 04B: a slow start, a fast middle and a slow-motion photo finish, the Behind the Border rhythm.
- **Two final numbers side by side** and a **twist that flips the answer** (04A's 5.2% bond, 04B's 6%).
- **A hard loop:** the last frame re-slaps the frame-1 hook over the same two envelopes.

**What we improve**
1. **Show the envelope.** Every crossover is worked in ≤3 ink lines. None of the originals shows a single line of it.
2. **Always deliver the number** (pitfall 2). It goes in the video, sealed for a 3-second guess (04A, 04B), with the exact figure pinned ("envelope said ≈ X, within Y%").
3. **Show both sides of a contestable assumption** (pitfall 5):
   - 04A gives the break-even horizon *and* the implied rate;
   - 04B shows 7% and then flips it at 6%;
   - 04C gives the condition under which each envelope wins.
4. **Fresh pairs only** (pitfall 1). No penny, no celebrity net worths, no lottery-winner screenshots. The three pairs (lump vs life stream, early vs doubled-late, signing bonus vs raise) are the research's own "write fresh dilemmas" list.
5. **Index-style, labelled assumptions** (pitfall 8): "7% a year, compounded monthly … before fees, tax & inflation" on a sticky plus a `7%` postage stamp. No tickers, no picks.

**The uniquely-ours twist: "The Crossover Line."** Every episode is solved with the same typed rule at the top of the envelope:

> **crossover = head start ÷ catch-up**

Each episode plugs in different numbers, and the answer comes out in a different unit each time:

| Episode | Head start | ÷ Catch-up per period | = Crossover |
|---|---|---|---|
| 04A | $1,000,000 | $1,000 a week | **1,000 weeks ≈ 19.2 years** |
| 04C | $5,000 | $80 a week | **62.5 weeks** |
| 04B | $34,600 at 35, which earns $202 a month on its own | B's extra $200 a month, i.e. $200 − $202 < 0 | **never** |

When the catch-up is zero or negative, the crossover never comes. That makes it a save-worthy rule viewers can reuse on their own offers, leases and payouts. It is also the anti-template guardrail: the *rule* is fixed, but the answer comes out in years (04A), as "never" (04B) and in weeks (04C), and each one lands in a different length lane.

**Series name:** **Two Envelopes**. The postmark carries the number (No. 04A, 04B, 04C).
**Title template:** `[Option A] or [Option B]? (Two Envelopes No. ___)`, e.g. "$1 million now or $1,000 a week for life? (Two Envelopes No. 04A)".
**Hook template (tape, three short strips):** `[A] / OR *[B]* / [QUALIFIER?]`. Option B, the one that looks smaller, is always the red word.

**Envelope devices used (format bible §3):**

| Device | Engine op | 04A | 04B | 04C |
|---|---|---|---|---|
| Masking-tape hook (frame 1 and loop) | `hook` | ✓ | ✓ | ✓ |
| Which envelope? A/B | `pick` | ✓ (open + rule) | ✓ (open + loop) | ✓ (open + verdict) |
| Silent pick beat | `timer` (1 s, PICK ONE) | ✓ | ✓ | ✓ |
| Typed crossover rule | `write` (type font) | ✓ | ✓ | ✓ |
| Ballpoint working (≤3 lines) | `write` | 3 lines | 3 lines | 3 lines |
| Napkin race chart | `curve` + `compare` + `marks` | flat $1M vs +$52K/yr | 40-yr race, 25 → 65 | flat $5K vs +$80/wk |
| Red pen | `annotate` | underline, 3 circles | circle "never" | underline, 2 circles |
| ASSUME sticky / postage stamp | `sticky`, `postage` | n/a (all inputs are the dilemma's) | ✓ sticky + `7%` stamp | n/a (assumption on envelope B: "raise, 40 hrs/wk") |
| Stuffed envelopes | `stuff` | n/a | $96,000 vs $144,000 deposits | n/a |
| Sealed Answer + guess timer | `envelope`, `timer` | ✓ 5.2% (3 s) | ✓ gap at 65 (3 s) | n/a (Flash: the race is the reveal) |
| Verdict stamps | `stamp` | FIRST CLASS + OPENED BY MISTAKE | FIRST CLASS + OPENED BY MISTAKE | FIRST CLASS |
| Postmark No. | `postmark` | 04A | 04B | 04C |
| Flip | `flip` | ✓ | ✓ | ✓ |

---

### Teasers

#### 04A: $1,000,000 now or $1,000 a week for life?

- **Working title:** $1 million now or $1,000 a week for life? (Two Envelopes No. 04A)
- **Money topic:** windfalls and payouts: lump sum vs a lifetime stream (the annuity question)
- **Lane / runtime:** Envelope, **31.0 s** (card + solve). The research build is ~24 s. This runs longer because the VO is paced at ≤3.4 words/s and includes a 3-second guess.
- **Spec:** `engine/specs/04-two-envelopes-a.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-a.png`

**Frame-1 hook**
- On screen (tape, three strips): **$1,000,000 NOW / OR *$1,000 A WEEK* / FOR LIFE?** Below it, envelope A "$1,000,000 · today" and envelope B "$1,000 a wk · for life" pop in by 0.4 s.
- First spoken line (0.15–3.1 s): *"A million now… or a thousand a week, for life?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.1 | Hook | Tape hook; envelopes A and B |
| 3.1–4.1 | **Silent pick** | 1-s PICK ONE ring; no VO |
| 4.1–4.35 | Flip | Clean side |
| 4.35–6.75 | Line 1 | Typed rule "crossover = head start ÷ catch-up"; ink "$1,000,000 ÷ $1,000/wk = 1,000 wks", red underline |
| 6.4–10.4 | Race chart | Flat ink line "A: $1M, today" vs red line "B: +$52K a year", 30 years on the x-axis |
| 6.8–9.2 | **Partial payoff (~29%)** | Line 2 "1,000 wks ÷ 52 ≈ 19.2 yrs", circled at 8.45; the lines cross at "yr 19.2" at ~8.8 |
| 9.3–11.7 | Verdict 1 | Crossing circled (10.45); **FIRST CLASS** slams on B's side (10.9) |
| 11.7–11.95 | Flip | **Pattern break at ~38%** |
| 12.0–16.4 | The other side | Red "but $1M earns interest…"; sealed envelope slides in; line 3 "$52,000 ÷ $1,000,000 =" |
| 16.4–19.4 | Guess | 3-s GUESS ring |
| 19.4–21.6 | **Reveal** | Envelope opens: card "5.2% / a year, forever"; red "5.2%" written into line 3, circled |
| 21.6–25.0 | Hero line | "the weekly = a 5.2% bond"; **OPENED BY MISTAKE** (23.6) |
| 25.0–28.0 | The rule | "beat 5.2% forever? → $1M" / "can't? → the weekly"; envelopes return with red conditions "beat 5.2%?" / "19.2+ yrs?" |
| 28.1–31.0 | Loop | The hook re-slaps over the two envelopes = frame 1 |

**Voice-over** (timings = captions in the spec)

> A million now… or a thousand a week, for life? *(0.15)*
> *[1-second silent pick]*
> A million divided by a thousand a week… *(4.35)*
> …is a thousand weeks. Nineteen point two years. *(6.75)*
> Collect longer, and the weekly check wins. *(9.3)*
> But the million can earn interest. *(12.0)*
> What rate pays a grand a week, forever? *(14.0)*
> *[3-second pause to guess]*
> Five point two percent. A year. Forever. *(19.4)*
> That weekly check is a five-point-two-percent bond in disguise. *(21.6)*
> Beat that forever, the million wins. Can't? The check. *(25.2)*
> So: a million now, or a thousand a week? *(28.1, loops to the first line)*

**The envelope math (3 lines)**
1. `$1,000,000 ÷ $1,000/wk = 1,000 wks` (exact)
2. `1,000 wks ÷ 52 ≈ 19.2 yrs` (exact 19.23 = 19 years 12 weeks; within 0.16%)
3. `$52,000 ÷ $1,000,000 = 5.2%` (exact: a $1M perpetuity at 5.2% pays $52,000 a year)

**ASSUME sticky:** none on screen. Every input is the dilemma's own stated amount ($1,000,000; $1,000 a week; 52 weeks a year). The things the envelope deliberately leaves out (tax, inflation, how long "life" is) are named in the pinned comment.

**Sources (verified 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. All are the stated hypothetical and arithmetic.
- **Description only:** BLS median usual weekly earnings, full-time wage and salary workers, Q2 2026 = **$1,251**. BLS, *Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026*, released 2026-07-21: https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (team WebSearch verification 2026-10-07; see the sourcing note at the top). $1,000 ÷ $1,251 = 79.9%, said as "about 80%".
- **Format reference** (not a fact used on screen): Filomation's meme, `research/watch/group4-video4.md`. No real winner, screenshot or lottery brand appears.

**Ending**
- **Loop line:** "So: a million now, or a thousand a week?" This *is* the opening question, over the same two envelopes.
- **Comment bait (a real question):** "Which envelope did you pick, and what return are you assuming?"
- **Pinned comment:**
  > Exact: $1,000,000 ÷ $1,000 a week = 1,000 weeks = 19.23 years, i.e. 19 years and 12 weeks (envelope said ≈ 19.2, within 0.2%). The rate is exact: $52,000 ÷ $1,000,000 = 5.2%. That's what the million has to earn every year, forever, to pay $1,000 a week without shrinking. What the envelope leaves out: tax (rules differ by country and by payout type); inflation (at an assumed 3%, the year-20 $1,000 buys what about $554 buys today, which tilts toward the million); and how long "life" is. Present value of $52K a year for 30 years: $1.02M at 3%, $0.80M at 5%, $0.65M at 7%. Envelope rule: crossover = head start ÷ catch-up. Which did you pick?

**Description**
> $1 million now, or $1,000 a week for life? The envelope math: $1M ÷ $1,000 a week = 1,000 weeks ≈ 19.2 years to break even, and $52,000 ÷ $1M = 5.2%. The weekly check is a 5.2% bond in disguise. For scale: $1,000 a week is about 80% of the typical US full-time paycheck ($1,251/week, BLS, Q2 2026, released Jul 21 2026). Hypothetical dilemma, pre-tax, before inflation. Exact figures are in the pinned comment.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #MoneyMath #WouldYouRather #LumpSum

**Platform notes**
- **YouTube Shorts:** post the 31 s master; the title equals the tape hook plus the series tag.
  - If 3-second retention is fine but the end dips, cut a 26 s version that drops the rule card (25.0–28.0) and loops straight from the OPENED BY MISTAKE stamp.
  - A/B test a title that names the twist (the research hook formula): "$1M now or $1,000 a week for life? (It's a 5.2% bond)".
- **Instagram Reels:** same cut, max 5 hashtags.
  - Sends are the top non-follower signal. The caption carries the taggable line: "send this to the friend who'd grab the million."
  - Run it as a Trial Reel first. Keep the comment ask a real question; no "comment YES".
- **TikTok:** a 60 s+ cut (Creator Rewards, and Buffer's +43.2% reach for 60 s+). Add two more envelope beats after the rule: the inflation drag (3% assumed, $554) and the present-value row at 3/5/7%. Each is one line and one new number per sentence.

**Why this one should travel**
- **The pair is proven to break out from a tiny channel:** Filomation 5.66M at 388x on 1.75K subs, the exact same pair. @joshcelder's "1 million dollars or $1,000 per week for life?" also appears among the pick-one polls (`raw/ig-tiktok-outliers.md`).
- **We add the one thing the original's own analysis asked for:** "Put the math on screen" and "Name the implied rate" (vidIQ, `group4-video4.md`). The 19.2-year crossover and the 5.2% bond are both genuinely surprising, and both are exact.
- **The comment war is built in and honest:** return rates, inflation, tax and age, with no factual error to correct, just assumptions to argue.

---

#### 04B: $200 a month at 25 or $400 a month at 35?

- **Working title:** $200 a month at 25 or $400 a month at 35? (Two Envelopes No. 04B)
- **Money topic:** saving and investing timing: starting early vs doubling up later (the race variant)
- **Lane / runtime:** Race, **52.8 s** (research: 45–60 s races; Instagram's 45–60 s median-view sweet spot)
- **Spec:** `engine/specs/04-two-envelopes-b.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-b.png`

**Frame-1 hook**
- On screen (tape): **$200 A MONTH AT 25 / OR *$400 A MONTH* / AT 35?**, with envelope A "$200/mo · starting at 25" and envelope B "$400/mo · starting at 35".
- First spoken line (0.15–4.3 s): *"Two hundred a month at twenty-five… or four hundred a month at thirty-five?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–4.3 | Hook | Tape hook; envelopes A and B |
| 4.3–5.3 | **Silent pick** | 1-s PICK ONE ring |
| 5.3–5.55 | Flip | Clean side |
| 5.6–8.6 | Assumptions | ASSUME sticky writes in; `7%` postage stamp "ASSUMED" |
| 8.6–12.2 | What each puts in | Stuffed envelopes fill and count up: "A · 40 yrs" **$96,000**, "B · 30 yrs" **$144,000** |
| 12.3–14.7 | Stakes | Red "B puts in $48,000 more" |
| 14.7–14.95 | Flip | |
| 15.0–19.1 | Race, slow start | Legend "A: $200 at 25" (red) / "B: $400 at 35" (ink); A's line leaves 25; B's sits at $0 |
| 18.0–20.7 | **Partial payoff (~35%)** | Dot "35: $34.6K" (19.4); B lifts off at 35 |
| 20.7–22.6 | **Pattern break: the fast middle** | B, on double deposits, climbs as steeply as A; ages 35 → 60 pass in ~2.7 s |
| 22.6–25.4 | Photo finish (slow) | The two lines run parallel to 65; "≈$525K" lands on A at 25.4 |
| 25.6–28.6 | Sealed question | Sealed envelope; "at 65: who's ahead, by how much?" |
| 28.6–31.6 | Guess | 3-s PAUSE & GUESS |
| 31.6–35.4 | **Reveal** | Card "A by ≈ $37K / $525K vs $488K"; **FIRST CLASS** (32.4) |
| 35.5–35.75 | Flip | |
| 35.8–43.5 | The why (3 lines) | Typed rule; lines 1–3; red circle on "never" (43.5) |
| 44.5–49.0 | **Twist (hero, ~84–93%)** | Red "at 6%: B passes A at 63 yrs 8 mo"; **OPENED BY MISTAKE** (47.0) |
| 49.1–52.8 | Loop | Flip; envelopes A and B plus the tape hook = frame 1 |

**Voice-over**

> Two hundred a month at twenty-five… *(0.15)* …or four hundred a month at thirty-five? *(2.2)*
> *[1-second silent pick]*
> Same seven percent a year for both, until sixty-five. *(5.6)*
> A puts in ninety-six grand. B puts in a hundred forty-four. *(8.6)*
> Forty-eight grand more. Does B catch up? *(12.3)*
> Age twenty-five: A starts. *(15.0)*
> At thirty-five: A's got thirty-five grand. B: zero. *(18.0)*
> Then B puts in double… *(20.7)* …and the gap… never… closes. *(22.6)*
> Sixty-five. Who's ahead, and by how much? Guess. *(25.9)*
> *[3-second pause]*
> A. By about thirty-seven grand. With forty-eight grand less put in. *(31.6)*
> Why? At thirty-five, A's head start is thirty-five grand. *(35.8)*
> That alone earns two-oh-two a month. *(39.1)*
> B's extra is two hundred. B never gains a dollar. *(41.6)*
> Drop it to six percent, though, and B passes A at sixty-three and eight months. *(44.5)*
> So: two hundred at twenty-five, or four hundred at thirty-five? *(49.35, loops)*

**The envelope math (3 lines, the "why")**
1. `A's head start at 35 ≈ $34,600` (exact $34,616.96 = $200 a month for 120 months at 7%/12)
2. `$34,600 × 7% ÷ 12 ≈ $202/mo` (exact $201.93 on the unrounded balance)
3. `B's extra $200 < $202 → never` (the gap grows by $1.93 in month 121, and more every month after)

The deposits ($96,000 vs $144,000) are shown as stuffed envelopes, not ink lines. The race values (A $524,962.68, B $487,988.40, gap $36,974.28) come from the chart and the sealed card.

**ASSUME sticky (on screen):** "7% a year, compounded monthly. Both invest until 65. Before fees, tax & inflation." The `7%` postage stamp reads "ASSUMED".

**Sources (verified 2026-10-07)**
- **Real-world inputs:** none. The deposits are the dilemma's own amounts, and the 7% is a labelled assumption, not a forecast or an index's history. No ticker, fund or product is named (pitfall 8).
- **Format reference:** the research's race variant (`research/02-top-10-approaches.md` §4: "$200/mo from age 25 vs $400/mo from 35, at an assumed 7% → ≈$525K vs ≈$488K at 65 (our check)"), re-derived exactly in the math check.

**Ending**
- **Loop line:** "So: two hundred at twenty-five, or four hundred at thirty-five?" This is the frame-1 question over the same envelopes.
- **Comment bait (a real question):** "What rate are you assuming? At 6.1% it's a dead heat."
- **Pinned comment:**
  > Exact, at 7% a year compounded monthly: A $524,963 vs B $487,988 at 65, so A wins by $36,974 (envelope said ≈ $37K, within 0.1%). A's head start at 35 is $34,616.96, and its interest alone is $201.93 a month, more than B's extra $200. So the gap grows every month and B never catches up, even if both kept going past 65. The rate decides it:
  > - At 6%, B passes A at 63 years 8 months and leads by $3,508 at 65.
  > - Dead heat at 65 at 6.11%.
  > - "Never" holds for any rate of 6.95% or more.
  >
  > Math police, yearly deposits and compounding: $479,124 vs $453,412, so A still wins at 65 (B would catch up around 85). The 7% is an assumption, before fees, tax and inflation, not a forecast. Envelope rule: crossover = head start ÷ catch-up, and when the catch-up is zero or less, it never comes. What rate are you assuming?

**Description**
> $200 a month from 25, or $400 a month from 35? B puts in $48,000 more, and still loses. At an assumed 7% a year (compounded monthly): A ≈ $525K, B ≈ $488K at 65. Why: A's $34,600 head start earns ≈ $202 a month on its own, more than B's extra $200, so B never gains a dollar. Drop the rate to 6% and B wins by a nose. Exact figures and the tie rate are pinned. Assumed returns, before fees, taxes and inflation; not a forecast.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #CompoundInterest #MoneyMath #Investing

**Platform notes**
- **YouTube Shorts:** post the 52.8 s master. The research puts races at 45–62 s on Shorts. Our photo finish lands at 43–48% of runtime, close to where Behind the Border's overtake lands (~55%).
  - Keep it under 60 s: a Short over 1 minute with any Content ID claim is blocked globally, and our foley is original anyway.
- **Instagram Reels:** this is the native length (45–60 s had the highest median views, Socialinsider).
  - Caption question: "Which one are you, A or B?"
  - Taggable line: "send it to the friend who says they'll start next year."
- **TikTok:** a 65 s cut. After the twist, add the math-police beat: yearly compounding is $479K vs $453K, and B would only catch up at ~85. Then the tie rate (6.1%). Every added sentence carries a new number.

**Why this one should travel**
- **It's the corpus's biggest premise** (Finance With Sharan's early-stopper vs late-starter, **69.8M**; Planktin's saver vs spender, 9.06M at 153x; Humphrey's two investors, 8.4M), rebuilt faceless with no family skit and no engagement-bait interlude.
- **It inverts the race format's expected payoff.** Behind the Border's audience waits for the overtake (535x); here the overtake **never comes**, which is the research's own suggested twist. Then the 6% flip makes it come after all, so the ending re-hooks the argument.
- **"I'll invest double later" is a real, common plan,** so the dilemma is personal, taggable and save-worthy. The 3-line why ("head start interest vs extra deposit") is a rule viewers can apply to their own numbers.

---

#### 04C: $5,000 to sign or $2 more an hour?

- **Working title:** $5,000 to sign or $2 more an hour? (Two Envelopes No. 04C)
- **Money topic:** pay and job offers: signing bonus vs hourly raise
- **Lane / runtime:** Flash, **15.0 s** (research: 5–15 s dilemma loops)
- **Spec:** `engine/specs/04-two-envelopes-c.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-c.png`

**Frame-1 hook**
- On screen (tape): ***$5,000* TO SIGN / OR *$2 MORE* / AN HOUR?** Below it, envelope A "$5,000 · signing bonus" and envelope B "+$2/hr · raise, 40 hrs/wk".
- First spoken line (0.15–3.1 s): *"Five grand to sign… or two bucks more an hour?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.1 | Hook | Tape hook; envelopes A and B |
| 3.1–4.1 | **Silent pick** | 1-s PICK ONE ring |
| 4.1–4.3 | Flip | |
| 4.35–6.5 | Line 1 | Typed rule; "$2 × 40 hrs = $80 a week", red underline |
| 5.2–9.8 | Race chart | Flat ink "A: $5,000 once" vs red "B: +$80 a week" over 104 weeks |
| 6.5–9.3 | **Partial payoff (~43%)** | Line 2 "$5,000 ÷ $80 = 62.5 weeks"; lines cross at "wk 62.5" (~8.0); circled (8.6) |
| 9.4–10.9 | Verdict | Crossing circled (9.85); **FIRST CLASS** (10.15) |
| 10.9–11.1 | Flip | |
| 11.0–12.5 | Line 3 (hero) | Red "+$4,160 every year after"; envelopes return with conditions "leave before wk 63" / "stay past wk 63" |
| 12.6–14.2 | The other side | Envelope A's condition carries the line |
| 14.3–15.0 | Loop | The hook re-slaps over the envelopes = frame 1 |

**Voice-over**

> Five grand to sign… or two bucks more an hour? *(0.15)*
> *[1-second silent pick]*
> Two bucks, forty hours: eighty a week. *(4.35)*
> Five grand over eighty… sixty-two and a half weeks. *(6.5)*
> Stay longer? The raise wins: *(9.4)* forty-one sixty a year. *(11.0)*
> Leave sooner? The five grand. *(12.6, loops to the first line)*

**The envelope math (3 lines)**
1. `$2 × 40 hrs = $80 a week` (exact)
2. `$5,000 ÷ $80 = 62.5 weeks` (exact, ≈ 14.4 months; after 62 weeks the raise has paid $4,960, after 63 weeks $5,040, hence "wk 63")
3. `+$4,160 every year after` ($80 × 52, exact)

**ASSUME (on the envelope, no separate sticky in the Flash cut):** envelope B reads "raise, 40 hrs/wk". The pinned comment states the rest (52 paid weeks, before tax).

**Sources (verified 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. The bonus, the raise and the 40-hour week are the dilemma's stated terms.
- **Description only:** BLS median full-time weekly pay **$1,251** (Q2 2026, released 2026-07-21): https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (team WebSearch verification 2026-10-07). $1,251 ÷ 40 = $31.27/hr, so $2 is a 6.4% raise on a typical full-time wage.

**Ending**
- **Loop line:** "Leave sooner? The five grand." It flows straight into "Five grand to sign… or two bucks more an hour?"
- **Comment bait (a real question):** "What's your crossover week? Bonus ÷ (raise × hours a week)."
- **Pinned comment:**
  > Exact: $2 × 40 = $80 a week; $5,000 ÷ $80 = 62.5 weeks ≈ 14.4 months (no rounding on this one). After 62 weeks the raise has paid $4,960; after 63, $5,040. After 2 years it's $8,320 vs $5,000; after 3 years, $12,480 vs $5,000. Assumptions: 40 paid hours a week, 52 weeks, before tax. Not modelled: future % raises (they'd apply to the higher wage), overtime, any repayment clause in the offer, retirement match. Envelope rule: crossover = bonus ÷ (raise × hours). What's yours?

**Description**
> $5,000 to sign, or $2 more an hour? $2 × 40 hours = $80 a week, and $5,000 ÷ $80 = 62.5 weeks. Stay past week 63 and the raise wins, then keeps paying $4,160 a year. For scale: $2 is about a 6.4% raise on the typical US full-time wage ($1,251/week ÷ 40, BLS, Q2 2026). Hypothetical offer, pre-tax. Exact figures are pinned.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #JobOffer #MoneyMath #Salary

**Platform notes**
- **YouTube Shorts:** a 15 s loop. The hook, the three lines and the verdict are readable sound-off; the last frame equals the first, so replays read as one continuous loop.
- **Instagram Reels:** same cut.
  - Caption with a direct question (Humphrey's caption questions earned 4–6x more comments per view).
  - Taggable line: "send to the friend with an offer on the table."
  - Max 5 hashtags.
- **TikTok:** a 60 s+ "your offers" cut. Solve three viewer-submitted bonus-vs-raise pairs from the comments, one envelope each with the same rule. That clears the Creator Rewards bar and turns comments into the next episode.

**Why this one should travel**
- **It's a fresh pair from the research's own list** ("salary vs signing bonus", pitfall 1), with a decision real viewers face, which drives saves and sends rather than idle rage-bait.
- **It runs Techtonic's proven device** (1.06M at 97.8x on 2.18K subs): annualise a per-unit rate and compute the break-even. Here it's in 2 ink lines with the answer actually delivered.
- **It pairs with, but doesn't repeat, 03B** ("A $1 raise is 'only' $8 a day", the Read-It Ladder). 03B ladders what a raise is worth over a decade; 04C asks when a raise overtakes cash on the table. Cross-link them in a playlist, but keep their hero numbers different. That's why 04C's pin stops at 3 years ($12,480), not the 5-year $20,800 that coincides with 03B's headline.
- **It fits the research's short-loop evidence:** dilemma and puzzle cards of 4–11 s farm loops (Filomation 6 s, Granny Drive 5 s, Alaric Moses Ong 11 s at 422x), and this one also carries a full solve.

---

### Math check

`teasers/04-two-envelopes-mathcheck.py` recomputes every number shown on screen, spoken, pinned or put in a description, and asserts each displayed rounding. That includes:
- the 1,000-week and 19.2-year crossover;
- the 5.2% perpetuity;
- the monthly 40-year race, with a month-by-month proof that the gap never shrinks;
- the 6% overtake month;
- the tribonacci tie rate;
- the yearly-compounding "math police" case;
- the week-63 verdict.

```python
#!/usr/bin/env python3
"""Math check for teasers 04A, 04B, 04C (Two Envelopes).

Recomputes every number shown on screen, spoken in the VO, or quoted in a pinned comment or
description, and asserts the rounded value we display. Run: python3 teasers/04-two-envelopes-mathcheck.py
"""
from math import log


def within(approx, exact):
    return abs(approx - exact) / abs(exact)


def fv(pmt, i, n):
    """Future value of n end-of-period deposits of pmt at periodic rate i."""
    return pmt * ((1 + i) ** n - 1) / i if n > 0 else 0.0


BLS_WEEKLY = 1251  # BLS median usual weekly earnings, full-time wage & salary workers, Q2 2026 (released 2026-07-21)

# ============================================================================ 04A
print("=" * 76, "\n04A  $1,000,000 now or $1,000 a week for life?\n" + "=" * 76)
LUMP, WEEKLY = 1_000_000, 1_000
weeks = LUMP / WEEKLY
years = weeks / 52
yearly = WEEKLY * 52
rate = yearly / LUMP
print(f"  line 1  $1,000,000 / $1,000 a week = {weeks:,.0f} weeks")
print(f"  line 2  {weeks:,.0f} / 52 = {years:.4f} years -> '19.2 yrs' (within {within(19.2, years):.2%})")
print(f"          = {int(weeks // 52)} years + {weeks - 52 * (weeks // 52):.0f} weeks")
print(f"  line 3  $1,000 x 52 = ${yearly:,} a year; ${yearly:,} / $1,000,000 = {rate:.1%} (exact)")
assert weeks == 1000 and round(years, 1) == 19.2 and yearly == 52_000 and abs(rate - 0.052) < 1e-12
assert (int(weeks // 52), round(weeks % 52)) == (19, 12)
# chart: cumulative weekly payments vs the flat lump; first whole year where B >= A
first_year = next(y for y in range(100) if yearly * y >= LUMP)
print(f"  chart   weekly total passes $1M during year {first_year} (crossing at {years:.2f}); "
      f"30-yr axis top = ${yearly * 30:,}")
assert first_year == 20
# perpetuity check: $1M at 5.2% pays exactly $52,000 a year without shrinking
assert abs(LUMP * 0.052 - yearly) < 1e-6
# pinned-comment context: what a fixed $1,000 is worth after 20 years at an ASSUMED 3% inflation
real20 = 1000 / 1.03 ** 20
print(f"  pin     $1,000 in year 20 at an assumed 3% inflation = ${real20:,.2f} of today's money -> '$554'")
assert round(real20) == 554
# present value of $52,000/yr (end of year) for N years at r: shows the answer moves with rate & horizon
for r in (0.03, 0.05, 0.07):
    row = []
    for n in (20, 30, 40):
        pv = yearly * (1 - (1 + r) ** -n) / r
        row.append(f"{n} yrs ${pv / 1e6:.2f}M")
    print(f"  pin     PV of $52K/yr at {r:.0%}: " + ", ".join(row))
pv_3_30 = yearly * (1 - 1.03 ** -30) / 0.03
pv_7_30 = yearly * (1 - 1.07 ** -30) / 0.07
assert round(pv_3_30 / 1e6, 2) == 1.02 and round(pv_7_30 / 1e6, 2) == 0.65
share = WEEKLY / BLS_WEEKLY
print(f"  desc    $1,000 / $1,251 (BLS median full-time week, Q2 2026) = {share:.1%} -> 'about 80%'")
assert round(share, 2) == 0.80

# ============================================================================ 04B
print("=" * 76, "\n04B  $200 a month at 25 or $400 a month at 35? (7%/yr assumed, monthly)\n" + "=" * 76)
i = 0.07 / 12
depA, depB = 200 * 480, 400 * 360
print(f"  stuff   A: $200 x 480 months = ${depA:,}   B: $400 x 360 months = ${depB:,}   B - A = ${depB - depA:,}")
assert (depA, depB, depB - depA) == (96_000, 144_000, 48_000)

A65, B65 = fv(200, i, 480), fv(400, i, 360)
gap65 = A65 - B65
print(f"  race    at 65: A ${A65:,.2f} -> '≈$525K' ({within(525_000, A65):.3%}); "
      f"B ${B65:,.2f} -> '$488K' ({within(488_000, B65):.3%})")
print(f"  sealed  gap ${gap65:,.2f} -> 'A by ≈ $37K' (within {within(37_000, gap65):.2%})")
assert round(A65 / 1000) == 525 and round(B65 / 1000) == 488 and round(gap65 / 1000) == 37

head = fv(200, i, 120)
print(f"  mark    A at 35: ${head:,.2f} -> '35: $34.6K' / '≈ $34,600' (within {within(34_600, head):.3%})")
assert round(head / 100) * 100 == 34_600 and round(head / 1000, 1) == 34.6
interest = head * i
interest_env = 34_600 * 0.07 / 12
print(f"  line 2  $34,616.96 x 7% / 12 = ${interest:.2f}; as written ($34,600 x 7% / 12) = ${interest_env:.2f} -> '≈ $202/mo'")
assert round(interest) == 202 and round(interest_env) == 202
print(f"  line 3  B's extra deposit $200 < ${interest:.2f}: the gap grows by ${interest - 200:.2f} in month 121")
assert interest > 200

# "never": simulate month by month for 100 years; the gap A - B must rise every single month after 35
a, b, prev_gap, checkpoints = 0.0, 0.0, None, {}
for m in range(1, 1201):
    a = a * (1 + i) + 200
    if m > 120:
        b = b * (1 + i) + 400
    if m >= 120:
        gap = a - b
        if prev_gap is not None:
            assert gap > prev_gap, f"gap shrank in month {m}"
        prev_gap = gap
    if m % 120 == 0:
        checkpoints[25 + m // 12] = (a, b, a - b)
for age in (35, 45, 55, 65):
    ca, cb, cg = checkpoints[age]
    print(f"  race    age {age}: A ${ca:>11,.0f}  B ${cb:>11,.0f}  gap ${cg:>8,.0f}")
print("  never   gap rises every month from 35 to 125 (both still depositing): B never catches up")
assert abs(checkpoints[65][0] - A65) < 0.01 and abs(checkpoints[65][1] - B65) < 0.01

# the twist: at 6% B passes A before 65
i6 = 0.06 / 12
m_pass = next(m for m in range(121, 481) if fv(400, i6, m - 120) >= fv(200, i6, m))
age_y, age_m = 25 + (m_pass // 12), m_pass % 12
print(f"  twist   at 6%: B first >= A after deposit {m_pass} -> age {age_y} yrs {age_m} mo")
assert (age_y, age_m) == (63, 8)
A65_6, B65_6 = fv(200, i6, 480), fv(400, i6, 360)
print(f"  pin     at 6%, age 65: A ${A65_6:,.0f} vs B ${B65_6:,.0f} (B ahead by ${B65_6 - A65_6:,.0f})")
assert round(B65_6 - A65_6) == 3508

# tie rate at 65: 200[(1+i)^480 - 1] = 400[(1+i)^360 - 1]; with x = (1+i)^120: x^3 - x^2 - x - 1 = 0
lo, hi = 1.5, 2.0
for _ in range(200):
    mid = (lo + hi) / 2
    lo, hi = (mid, hi) if mid ** 3 - mid ** 2 - mid - 1 < 0 else (lo, mid)
x = (lo + hi) / 2
tie = (x ** (1 / 120) - 1) * 12
print(f"  pin     tie at 65 when (1+i)^120 = {x:.5f} (the tribonacci constant) -> {tie:.3%} a year -> 'about 6.1%'")
assert abs(fv(200, tie / 12, 480) - fv(400, tie / 12, 360)) < 1e-6 and round(tie * 100, 1) == 6.1
never = (2 ** (1 / 120) - 1) * 12
print(f"  pin     'never' (head-start interest >= $200) needs (1+i)^120 >= 2 -> rate >= {never:.3%}")
assert 0.069 < never < 0.07
# math-police variant: yearly deposits and yearly compounding
A65y, B65y = 2400 * ((1.07 ** 40 - 1) / 0.07), 4800 * ((1.07 ** 30 - 1) / 0.07)
d0 = 2400 * ((1.07 ** 10 - 1) / 0.07)
n_catch = log((2400 / 0.07) / ((2400 / 0.07) - d0)) / log(1.07)
print(f"  pin     yearly compounding: A ${A65y:,.0f} vs B ${B65y:,.0f} at 65 (A still ahead); "
      f"B would only catch up at about age {35 + n_catch:.1f}")
assert A65y > B65y and 85 < 35 + n_catch < 86

# ============================================================================ 04C
print("=" * 76, "\n04C  $5,000 to sign or $2 more an hour?\n" + "=" * 76)
BONUS, RAISE, HOURS = 5000, 2, 40
weekly = RAISE * HOURS
cross = BONUS / weekly
print(f"  line 1  $2 x 40 hrs = ${weekly} a week")
print(f"  line 2  $5,000 / $80 = {cross} weeks = {cross / 52 * 12:.1f} months")
assert weekly == 80 and cross == 62.5
print(f"  verdict after 62 weeks the raise has paid ${weekly * 62:,}; after 63 weeks ${weekly * 63:,} "
      "-> 'leave before wk 63 / stay past wk 63'")
assert weekly * 62 < BONUS < weekly * 63
yearly_c = weekly * 52
print(f"  line 3  $80 x 52 = ${yearly_c:,} a year -> '+$4,160 every year after'")
assert yearly_c == 4160
for yrs in (1, 2, 3, 5):
    print(f"  pin     after {yrs} yr: raise ${yearly_c * yrs:,} vs bonus $5,000")
assert yearly_c * 2 == 8320 and yearly_c * 5 == 20_800
hourly_med = BLS_WEEKLY / 40
print(f"  desc    BLS median full-time week $1,251 / 40 = ${hourly_med:.2f}/hr; $2 = {RAISE / hourly_med:.1%} raise")
assert round(RAISE / hourly_med * 100, 1) == 6.4

print("\nall assertions passed")
```

**Output** (`python3 teasers/04-two-envelopes-mathcheck.py`, run 2026-10-07):

```text
============================================================================ 
04A  $1,000,000 now or $1,000 a week for life?
============================================================================
  line 1  $1,000,000 / $1,000 a week = 1,000 weeks
  line 2  1,000 / 52 = 19.2308 years -> '19.2 yrs' (within 0.16%)
          = 19 years + 12 weeks
  line 3  $1,000 x 52 = $52,000 a year; $52,000 / $1,000,000 = 5.2% (exact)
  chart   weekly total passes $1M during year 20 (crossing at 19.23); 30-yr axis top = $1,560,000
  pin     $1,000 in year 20 at an assumed 3% inflation = $553.68 of today's money -> '$554'
  pin     PV of $52K/yr at 3%: 20 yrs $0.77M, 30 yrs $1.02M, 40 yrs $1.20M
  pin     PV of $52K/yr at 5%: 20 yrs $0.65M, 30 yrs $0.80M, 40 yrs $0.89M
  pin     PV of $52K/yr at 7%: 20 yrs $0.55M, 30 yrs $0.65M, 40 yrs $0.69M
  desc    $1,000 / $1,251 (BLS median full-time week, Q2 2026) = 79.9% -> 'about 80%'
============================================================================ 
04B  $200 a month at 25 or $400 a month at 35? (7%/yr assumed, monthly)
============================================================================
  stuff   A: $200 x 480 months = $96,000   B: $400 x 360 months = $144,000   B - A = $48,000
  race    at 65: A $524,962.68 -> '≈$525K' (0.007%); B $487,988.40 -> '$488K' (0.002%)
  sealed  gap $36,974.28 -> 'A by ≈ $37K' (within 0.07%)
  mark    A at 35: $34,616.96 -> '35: $34.6K' / '≈ $34,600' (within 0.049%)
  line 2  $34,616.96 x 7% / 12 = $201.93; as written ($34,600 x 7% / 12) = $201.83 -> '≈ $202/mo'
  line 3  B's extra deposit $200 < $201.93: the gap grows by $1.93 in month 121
  race    age 35: A $     34,617  B $          0  gap $  34,617
  race    age 45: A $    104,185  B $     69,234  gap $  34,951
  race    age 55: A $    243,994  B $    208,371  gap $  35,624
  race    age 65: A $    524,963  B $    487,988  gap $  36,974
  never   gap rises every month from 35 to 125 (both still depositing): B never catches up
  twist   at 6%: B first >= A after deposit 464 -> age 63 yrs 8 mo
  pin     at 6%, age 65: A $398,298 vs B $401,806 (B ahead by $3,508)
  pin     tie at 65 when (1+i)^120 = 1.83929 (the tribonacci constant) -> 6.109% a year -> 'about 6.1%'
  pin     'never' (head-start interest >= $200) needs (1+i)^120 >= 2 -> rate >= 6.952%
  pin     yearly compounding: A $479,124 vs B $453,412 at 65 (A still ahead); B would only catch up at about age 85.5
============================================================================ 
04C  $5,000 to sign or $2 more an hour?
============================================================================
  line 1  $2 x 40 hrs = $80 a week
  line 2  $5,000 / $80 = 62.5 weeks = 14.4 months
  verdict after 62 weeks the raise has paid $4,960; after 63 weeks $5,040 -> 'leave before wk 63 / stay past wk 63'
  line 3  $80 x 52 = $4,160 a year -> '+$4,160 every year after'
  pin     after 1 yr: raise $4,160 vs bonus $5,000
  pin     after 2 yr: raise $8,320 vs bonus $5,000
  pin     after 3 yr: raise $12,480 vs bonus $5,000
  pin     after 5 yr: raise $20,800 vs bonus $5,000
  desc    BLS median full-time week $1,251 / 40 = $31.27/hr; $2 = 6.4% raise

all assertions passed
```
