## 4. Two Envelopes (Pick-One Dilemma -> Race to the Crossover)

**Series:** *Two Envelopes* · **Lanes:** one per lane, on purpose: Envelope (04A, 30.2 s), Long envelope / race (04B, 50.0 s), Flash (04C, 14.0 s) · **Lead devices:** `pick` (two sealed envelopes, A and B), a 1-second silent pick beat, the typed crossover rule, a napkin race chart (`curve` + `compare`), red-pen crossover circle, Sealed Answer + guess timer, `FIRST CLASS` / `OPENED BY MISTAKE` stamps, postmark No.
**Teasers:** 04A $1,000,000 now or $1,000 a week for life? · 04B $200 a month from 25 or $400 a month from 35: who has more at 65? · 04C $5,000 to sign or $2 more an hour?
**Specs:** `engine/specs/04-two-envelopes-{a,b,c}.json` (all three lint clean, `loop: true`) · **Sheets:** `engine/out/sheets/04-two-envelopes-{a,b,c}.png` · **Stills:** `engine/out/stills/04-two-envelopes-*.png` · **Math check:** `teasers/04-two-envelopes-mathcheck.py` (all assertions pass, output below; it also reads the spec files and asserts the on-screen strings, curve arrays and red-pen positions)

**Sourcing note (read before publishing).** Nothing in these three teasers depends on a real-world statistic, on screen or off:
- every amount in the dilemmas is the dilemma's own stated hypothetical;
- every rate or hour count is a labelled assumption (ASSUME sticky and `7%` stamp in 04B; "raise, 40 hrs/wk" on envelope 04C-B; "× 52 wks" written out in the ink);
- the BLS median-pay "for scale" line the writer put in the 04A and 04C descriptions has been **taken out of the published text**. Neither the writer nor the QA pass could verify it first-hand on 2026-10-07 (the shared WebSearch budget was exhausted and bls.gov, api.bls.gov and fred.stlouisfed.org are blocked by the egress proxy). It is kept below as an *optional* line to add only after re-checking the source on publish day.

Two topics that would have needed fresh sourcing were dropped rather than published unverified: Social Security at 62 vs 70, and this week's Powerball cash vs annuity. The evidence tables (views, outliers, URLs) are copied from `research/02-top-10-approaches.md` §4 and `research/watch/`; platform claims are from `research/01-viral-finance-shorts-research.md` §4 with the sources cited there.

---

### Why it goes viral

**The mechanism.** Put two money paths side by side where intuition and math disagree, make the viewer pick in the first second, then run the clock to the moment one path overtakes the other.

1. **Silent commitment.** A binary choice is answered in the head within 1 to 2 s, so the viewer's ego is invested before any explanation starts. Then they stay to check their answer (`research/watch/group5-video3.md`: "Viewers answer it in their own heads within a second, so they're invested before the subject even speaks").
2. **The obvious option usually loses to a rate or an exponent.** The lump sum looks bigger, but the stream wins on its unit or its horizon. In Teacherman's menu, "$1,000 per second" is worth $31.5B a year and beats "$100 Million right now", so the smallest-looking number wins (report 02 §4, our check).
3. **Suspense about *when*, not *whether*.** Race versions hold attention to the overtake. Behind the Border's lands at 0:33 of 62 s (~53%), and viewers stay past the midpoint to see it (`research/watch/group4-video1.md`).
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
  - The overtake is deferred to 0:33 (~53% of 62 s), so the suspense is about *when*. It needs no language.
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
- **The dilemma is frame 1, the title and the first spoken line**, with both options as physical sealed envelopes A and B (`pick`), already on screen in frame 0 so the thumbnail shows the whole choice.
- **A silent 1-second pick beat** (`timer`, "PICK ONE"), as the research build specifies (0.5–1 s).
- **The race.** Two lines on a napkin chart (`curve` + `compare`) drawn by the pen, with the crossover arriving late.
  - 04A: the lines cross at 8.3 s of 30.2 s.
  - 04B: a slow start (25 → 35), a fast middle (35 → 60 in 2.7 s) and a slow photo finish (60 → 65), the Behind the Border rhythm.
- **Two final numbers side by side** and a **twist that flips the answer** (04A: at 5.2% the million pays the same check forever; 04B: at 6% the late starter wins).
- **A hard loop.** Every spec sets `loop: true` (the last 0.35 s crossfades into frame 1), and the last spoken line is a question that runs straight into the first one.

**What we improve**
1. **Show the envelope.** Every crossover is worked in ≤3 ink lines. None of the originals shows a single line of it.
2. **Always deliver the number** (pitfall 2). It goes in the video, sealed for a 3-second guess (04A, 04B), with the exact figure pinned ("envelope said ≈ X, within Y%").
3. **Show both sides of a contestable assumption** (pitfall 5):
   - 04A gives the break-even horizon at 0% (19.2 years) *and* the rate at which the million never runs out (5.2%), and pins the in-between table;
   - 04B shows 7% and then flips it at 6%;
   - 04C gives the condition under which each envelope wins.
4. **Fresh pairs only** (pitfall 1). No penny, no celebrity net worths, no lottery-winner screenshots. The three pairs (lump vs life stream, early vs doubled-late, signing bonus vs raise) are the research's own "write fresh dilemmas" list.
5. **Index-style, labelled assumptions** (pitfall 8): "7% a year, compounded monthly, until 65. Before fees, tax & inflation." on a sticky plus a `7%` postage stamp. No tickers, no picks.

**The uniquely-ours twist: "The Crossover Line."** Every episode is solved with the same typed rule at the top of the envelope:

> **crossover = head start ÷ catch-up**

Each episode plugs in different numbers, and the answer comes out in a different unit each time:

| Episode | Head start | ÷ Catch-up per period | = Crossover |
|---|---|---|---|
| 04A | $1,000,000 | $1,000 a week | **1,000 weeks ≈ 19.2 years** (at 0%) |
| 04C | $5,000 | $80 a week | **62.5 weeks** |
| 04B | $34,600 at 35, which earns $202 a month on its own | B's extra $200 a month, i.e. $200 − $202 < 0 | **never** |

When the catch-up is zero or negative, the crossover never comes. That makes it a save-worthy rule viewers can reuse on their own offers, leases and payouts. It is also the anti-template guardrail: the *rule* is fixed, but the answer comes out in years (04A), as "never" (04B) and in weeks (04C), and each one lands in a different length lane.

**Series name:** **Two Envelopes**. The postmark carries the number (No. 04A, 04B, 04C).
**Title template:** `[Option A] or [Option B]? (Two Envelopes No. ___)`, e.g. "$1 million now or $1,000 a week for life? (Two Envelopes No. 04A)".
**Hook template (tape, three short strips):** `[A] / OR *[B]* / [STAKE OR PICK PROMPT]`. Option B is always the only red word (in 04A and 04C it is also the one that looks smaller).

**Envelope devices used (format bible §3):**

| Device | Engine op | 04A | 04B | 04C |
|---|---|---|---|---|
| Masking-tape hook (frame 1 and loop) | `hook` + `loop: true` | ✓ | ✓ | ✓ |
| Which envelope? A/B | `pick` | ✓ (open + range) | ✓ (open) | ✓ (open + conditions) |
| Silent pick beat | `timer` (1 s, PICK ONE) | ✓ | ✓ | ✓ |
| Typed crossover rule | `write` (type font, 40 px) | ✓ | ✓ | ✓ |
| Ballpoint working (≤3 lines) | `write` | 3 lines | 3 lines | 3 lines |
| Napkin race chart | `curve` + `compare` + `marks` | flat $1M vs +$52K/yr | 40-yr race, 25 → 65 | flat $5K vs +$80/wk |
| Red pen | `annotate` | underline, 4 circles | underline, circle "never" | underline, 3 circles |
| ASSUME sticky / postage stamp | `sticky`, `postage` | n/a (all inputs are the dilemma's) | ✓ sticky + `7%` stamp | n/a (assumption on envelope B: "raise, 40 hrs/wk") |
| Stuffed envelopes | `stuff` | n/a | $96,000 vs $144,000 deposits | n/a |
| Sealed Answer + guess timer | `envelope`, `timer` | ✓ 5.2% (3 s) | ✓ gap at 65 (3 s) | n/a (Flash: the race is the reveal) |
| Verdict stamps | `stamp` | FIRST CLASS + OPENED BY MISTAKE | FIRST CLASS + OPENED BY MISTAKE (last 2 s) | FIRST CLASS |
| Postmark No. | `postmark` (x 175, y 258, r 100) | 04A | 04B | 04C |
| Flip | `flip` | ✓ | ✓ | ✓ |

---

### Teasers

#### 04A: $1,000,000 now or $1,000 a week for life?

- **Working title:** $1 million now or $1,000 a week for life? (Two Envelopes No. 04A)
- **Money topic:** windfalls and payouts: lump sum vs a lifetime stream (the annuity question)
- **Lane / runtime:** Envelope, **30.2 s** (card + solve, `loop: true`). The research build is ~24 s. This runs longer because the captions are paced at ≤4 words/s and it includes a 3-second guess.
- **Spec:** `engine/specs/04-two-envelopes-a.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-a.png`

**Frame-1 hook** (hook score 8/10, unchanged: it is the exact pair behind Filomation's 388x on 1.75K subs)
- On screen (tape, three strips): **$1,000,000 NOW / OR *$1,000 A WEEK* / FOR LIFE?** Envelope A "$1,000,000 · today" and envelope B "$1,000 a wk · for life" are already in frame 0.
- First spoken line (0.15–3.0 s): *"A million now… or a thousand a week, for life?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.0 | Hook | Tape hook; envelopes A and B |
| 3.0–4.0 | **Silent pick** | 1-s PICK ONE ring; no VO |
| 4.0–4.4 | Flip | Clean side |
| 4.25–6.25 | Line 1 | Typed rule "crossover = head start ÷ catch-up"; ink "$1,000,000 ÷ $1,000/wk = 1,000 wks", red underline (6.25) |
| 6.0–9.8 | Race chart | Flat ink line "A: $1M, today" vs red line "B: +$52K a year", 30 years on the x-axis |
| 6.4–8.3 | **Partial payoff (~25%)** | Line 2 "1,000 wks ÷ 52 ≈ 19.2 yrs", circled at 7.9; the lines cross at "yr 19.2" at 8.3 |
| 8.9–10.9 | Verdict 1 | Crossing circled (9.3); **FIRST CLASS** lands on B's side (9.6) |
| 10.9–11.3 | Flip | **Pattern break at ~36%** |
| 11.15–15.4 | The other side | Red "but $1M earns interest…"; sealed envelope slides in; line 3 "$52,000 ÷ $1,000,000 =" |
| 15.4–18.4 | Guess | 3-s GUESS ring; the envelope wiggles |
| 18.4–19.9 | **Reveal** | Envelope opens: card "5.2% / a year, forever"; red "5.2%" written into line 3, circled (19.65) |
| 20.4–24.7 | Twist | Red "same check, forever + you keep $1M"; **OPENED BY MISTAKE** (23.2) |
| 24.7–25.1 | Flip | Envelopes return exactly as in frame 1 |
| 25.0–28.65 | **The range, biggest verdict last** | "earn 0%? $1M lasts 19.2 yrs" / "earn 5.2%? it lasts *forever*"; "forever" inked by 28.5 and circled at 28.65 (last 2 s) |
| 28.8–30.2 | Loop | "So… which envelope?"; the last 0.35 s crossfades into frame 1 |

**Voice-over** (timings = captions in the spec; captions show numerals, the VO says them as below)

> A million now… or a thousand a week, for life? *(0.15)*
> *[1-second silent pick]*
> A million divided by a thousand a week… *(4.25)*
> …is a thousand weeks. Nineteen point two years. *(6.6)*
> Collect longer, and the weekly check wins. *(8.9)*
> But the million can earn interest. *(11.15)*
> What rate pays a grand a week, forever? *(13.2)*
> *[3-second pause to guess]*
> Five point two percent. A year. Forever. *(18.4)*
> Earn that, and the million pays the same check forever… *(20.4)*
> …and you still keep the million. *(23.0)*
> Earn nothing? The million lasts nineteen point two years. *(24.95)*
> Earn five point two? It lasts forever. *(27.0)*
> So… which envelope? *(28.8, loops to the first line)*

**The envelope math (3 lines)**
1. `$1,000,000 ÷ $1,000/wk = 1,000 wks` (exact)
2. `1,000 wks ÷ 52 ≈ 19.2 yrs` (exact 19.23 = 19 years 12 weeks; within 0.16%)
3. `$52,000 ÷ $1,000,000 = 5.2%` (exact: 5.2% ÷ 52 = 0.1% a week, which is $1,000 a week on $1M with the million untouched)

The closing range ("earn 0%? $1M lasts 19.2 yrs / earn 5.2%? it lasts forever") restates lines 2 and 3; it adds no new calculation.

**ASSUME sticky:** none on screen. Every input is the dilemma's own stated amount ($1,000,000; $1,000 a week; 52 weeks a year, written in line 2). The things the envelope deliberately leaves out (tax, inflation, how long "life" is, the payer's credit) are named in the pinned comment.

**Sources (checked 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. All are the stated hypothetical and arithmetic.
- **Format reference** (not a fact used on screen): Filomation's meme, `research/watch/group4-video4.md`. No real winner, screenshot or lottery brand appears.

**Ending**
- **Loop line:** "So… which envelope?" runs straight into "A million now… or a thousand a week, for life?" over the same two envelopes (`loop: true`).
- **Comment bait (a real question):** "Which envelope did you pick, and what return are you assuming?"
- **Pinned comment:**
  > Exact: $1,000,000 ÷ $1,000 a week = 1,000 weeks = 19.23 years, i.e. 19 years and 12 weeks (envelope said ≈ 19.2, within 0.2%). $52,000 ÷ $1,000,000 = 5.2% exactly: that's 0.1% a week, which pays $1,000 every week without touching the million (5.33% a year if you compound it weekly). How long the million pays $1,000 a week, by what it earns: 0% → 19.2 yrs · 3% → 28.7 yrs · 4% → 36.7 yrs · 5% → 65.2 yrs · 5.2% → forever. So the real question is your rate × how long you'd collect. What the envelope leaves out: tax (rules differ by country and payout type); inflation (at an assumed 3%, year 20's $1,000 buys what about $554 buys today, which tilts toward the million); and whether the payer is good for it. Envelope rule: crossover = head start ÷ catch-up. Which did you pick?

**Description**
> $1 million now, or $1,000 a week for life? The envelope math: $1M ÷ $1,000 a week = 1,000 weeks ≈ 19.2 years to break even if the million earns nothing. And $52,000 ÷ $1M = 5.2%: earn that, and the million pays the same $1,000 a week forever while you keep the million. Anywhere in between, it's the rate against how long you collect (table in the pinned comment). Hypothetical dilemma, pre-tax, before inflation.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #MoneyMath #WouldYouRather #LumpSum

*Optional "for scale" line, add only after re-verifying the BLS figure on publish day:* "$1,000 a week is about 80% of median US full-time weekly pay ($1,251, BLS Usual Weekly Earnings, Q2 2026)." ($1,000 ÷ $1,251 = 79.9%.)

**Platform notes**
- **YouTube Shorts:** post the 30.2 s master; the title equals the tape hook plus the series tag.
  - If 3-second retention is fine but the end dips, cut a 25 s version that drops the range beat (24.7–28.8) and loops from the OPENED BY MISTAKE stamp.
  - A/B test a title that teases the twist (the research hook formula): "$1M now or $1,000 a week for life? (The answer is 5.2%)".
- **Instagram Reels:** same cut, max 5 hashtags.
  - Sends are the top non-follower signal. The caption carries the taggable line: "send this to the friend who'd grab the million."
  - Run it as a Trial Reel first. Keep the comment ask a real question; no "comment YES".
- **TikTok:** a 60 s+ cut (Creator Rewards needs over 1 minute; Buffer measured +43.2% reach for 60 s+, report 01 §4). Add two more envelope beats after the range: the inflation drag (3% assumed, $554) and the "how long it lasts" row at 3/4/5%. Each is one line and one new number per sentence.

**Why this one should travel**
- **The pair is proven to break out from a tiny channel:** Filomation 5.66M at 388x on 1.75K subs, the exact same pair. @joshcelder's "1 million dollars or $1,000 per week for life?" also appears among the pick-one polls (`raw/ig-tiktok-outliers.md`).
- **We add the one thing the original's own analysis asked for:** "Put the math on screen" and "Name the implied rate" (vidIQ, `group4-video4.md`). The 19.2-year crossover and the 5.2% at which the million never runs out are both genuinely surprising, and both are exact.
- **The comment war is built in and honest:** return rates, inflation, tax and age, with no factual error to correct, just assumptions to argue.

---

#### 04B: $200 a month from 25 or $400 a month from 35?

- **Working title:** $200 a month from 25 or $400 a month from 35? (Two Envelopes No. 04B)
- **Money topic:** saving and investing timing: starting early vs doubling up later (the race variant)
- **Lane / runtime:** Long envelope (race), **50.0 s**, five one-line mini-reveals (deposits → age 35 → the gap at 65 → why → the 6% twist). Research: 45–62 s races on Shorts; Instagram's 45–60 s median-view sweet spot.
- **Spec:** `engine/specs/04-two-envelopes-b.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-b.png`

**Frame-1 hook** (hook score 7 → 8/10 after the rewrite: the stake is now explicit and "from" removes the "only at 25?" misread)
- On screen (tape): **$200/MO FROM 25 / OR *$400/MO* FROM 35. / WHO HAS MORE AT 65?**, with envelope A "$200/mo · starting at 25" and envelope B "$400/mo · starting at 35" in frame 0.
- First spoken line (0.15–4.5 s): *"Two hundred a month from twenty-five… or four hundred from thirty-five. Who has more at sixty-five?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–4.5 | Hook | Tape hook; envelopes A and B |
| 4.5–5.5 | **Silent pick** | 1-s PICK ONE ring |
| 5.5–5.9 | Flip | Clean side |
| 5.75–8.4 | Assumptions | ASSUME sticky writes in; `7%` postage stamp "ASSUMED" |
| 8.3–11.4 | What each puts in | Stuffed envelopes fill and count up: "A · 40 yrs" **$96,000**, "B · 30 yrs" **$144,000** |
| 11.3–13.6 | Stakes | Red "B puts in $48,000 more" |
| 13.65–14.05 | Flip | |
| 13.9–18.1 | Race, slow start | Legend "A: $200 from 25" (red) / "B: $400 from 35" (ink); A's line leaves 25; B sits at $0 |
| 17.6–19.8 | **Partial payoff (~36%)** | Dot "35: $34.6K" (18.1); B lifts off at 35 |
| 18.1–20.8 | **Pattern break: the fast middle** | B, on double deposits, climbs as steeply as A; ages 35 → 60 pass in 2.7 s |
| 20.8–24.5 | Photo finish (slow) | The two lines run parallel to 65; "≈$525K" lands on A at 23.8 |
| 24.75–27.3 | Sealed question | Sealed envelope; "at 65: who's ahead, by how much?" |
| 27.3–30.3 | Guess | 3-s PAUSE & GUESS |
| 30.3–34.3 | **Reveal (61%)** | Card "A by ≈ $37K / $525K vs $488K"; **FIRST CLASS** (31.1) |
| 34.3–34.7 | Flip | |
| 34.55–42.6 | The why (3 lines) | Typed rule; lines 1–3; underline "$202/mo" (39.6); red circle on "never" (42.6) |
| 43.8–47.6 | **Twist** | Red "at 6%: B passes A at 63 yrs 8 mo" (44.0–45.6) |
| 47.6–50.0 | **Verdict in the last 2 s + loop** | **OPENED BY MISTAKE** (48.1); "So… which envelope now?"; the last 0.35 s crossfades into frame 1 |

**Voice-over**

> Two hundred a month from twenty-five… *(0.15)* …or four hundred from thirty-five. Who has more at sixty-five? *(2.2)*
> *[1-second silent pick]*
> Same seven percent a year for both, until sixty-five. *(5.75)*
> A puts in ninety-six grand. B puts in a hundred forty-four. *(8.4)*
> Forty-eight grand more. Does B catch up? *(11.4)*
> Age twenty-five: A starts. *(13.95)*
> At thirty-five: A's got almost thirty-five grand. B: zero. *(17.6)*
> Then B puts in double… *(19.8)* …and the gap… never… closes. *(21.6)*
> Sixty-five. Who's ahead, and by how much? Guess. *(24.75)*
> *[3-second pause]*
> A. By about thirty-seven grand. With forty-eight grand less put in. *(30.3)*
> Why? At thirty-five, A's head start is about thirty-four six. *(34.55)*
> That alone earns two-oh-two a month. *(37.9)*
> B's extra is two hundred. B never gains a dollar. *(40.6)*
> Drop it to six percent, though, and B passes A at sixty-three and eight months. *(43.8)*
> So… which envelope now? *(47.6, loops)*

**The envelope math (3 lines, the "why")**
1. `A's head start at 35 ≈ $34,600` (exact $34,616.96 = $200 a month for 120 months at 7%/12; within 0.05%)
2. `$34,600 × 7% ÷ 12 ≈ $202/mo` (exact $201.93 on the unrounded balance; $201.83 as written; both ≈ $202)
3. `B's extra $200 < $202 → never` (the gap grows by $1.93 in month 121, and more every month after)

The deposits ($96,000 vs $144,000) are shown as stuffed envelopes, not ink lines. The race values (A $524,962.68, B $487,988.40, gap $36,974.28) come from the chart and the sealed card; all 41 yearly points on both lines are checked against the formula.

**ASSUME sticky (on screen):** "7% a year, compounded monthly, until 65. Before fees, tax & inflation." The `7%` postage stamp reads "ASSUMED".

**Sources (checked 2026-10-07)**
- **Real-world inputs:** none. The deposits are the dilemma's own amounts, and the 7% is a labelled assumption, not a forecast or an index's history. No ticker, fund or product is named (pitfall 8).
- **Format reference:** the research's race variant (`research/02-top-10-approaches.md` §4: "$200/mo from age 25 vs $400/mo from 35, at an assumed 7% → ≈$525K vs ≈$488K at 65 (our check)"), re-derived exactly in the math check.

**Ending**
- **Loop line:** "So… which envelope now?" runs into "Two hundred a month from twenty-five…" over the same envelopes (`loop: true`).
- **Comment bait (a real question):** "What rate are you assuming? At about 6.1% it's a dead heat."
- **Pinned comment:**
  > Exact, at 7% a year compounded monthly: A $524,963 vs B $487,988 at 65, so A wins by $36,974 (envelope said ≈ $37K, within 0.1%). A's head start at 35 is $34,616.96, and its interest alone is $201.93 a month, more than B's extra $200. So the gap grows every month and B never catches up, even if both kept going past 65. The rate decides it:
  > - At 6%, B passes A at 63 years 8 months and leads by $3,508 at 65.
  > - Dead heat at 65 at 6.11%.
  > - "Never" holds at any rate of 6.96% or more.
  >
  > Math police, yearly deposits and compounding: $479,124 vs $453,412, so A still wins at 65 (B would catch up around 85). The 7% is an assumption, before fees, tax and inflation, not a forecast. Envelope rule: crossover = head start ÷ catch-up, and when the catch-up is zero or less, it never comes. What rate are you assuming?

**Description**
> $200 a month from 25, or $400 a month from 35? B puts in $48,000 more, and still loses. At an assumed 7% a year (compounded monthly): A ≈ $525K, B ≈ $488K at 65. Why: A's $34,600 head start earns ≈ $202 a month on its own, more than B's extra $200, so B never gains a dollar. Drop the rate to 6% and B wins by a nose. Exact figures and the tie rate are pinned. Assumed returns, before fees, taxes and inflation; not a forecast.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #CompoundInterest #MoneyMath #Investing

**Platform notes**
- **YouTube Shorts:** post the 50.0 s master. The research puts races at 45–62 s on Shorts. Our photo finish runs at 42–48% of runtime, close to where Behind the Border's overtake lands (~53%).
  - Keep it under 60 s: a Short over 1 minute with any Content ID claim is blocked globally (report 01 §4), and our foley is original anyway.
- **Instagram Reels:** this is the native length (45–60 s had the highest median views, Socialinsider, report 01 §4).
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
- **Lane / runtime:** Flash, **14.0 s** (bible: 6–14 s; research: 5–15 s dilemma loops), `loop: true`
- **Spec:** `engine/specs/04-two-envelopes-c.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-c.png`

**Frame-1 hook** (hook score 7 → 8/10 after the rewrite: the third strip makes the silent pick an explicit 1-second commitment, the research build's "Pick one." beat)
- On screen (tape): **$5,000 TO SIGN / OR *$2 MORE AN HOUR?* / PICK IN ONE SECOND.** Envelope A "$5,000 · signing bonus" and envelope B "+$2/hr · raise, 40 hrs/wk" are in frame 0. ("ONE" is spelled out: in the marker face a lone "1" reads as "I".)
- First spoken line (0.1–2.4 s): *"Five grand to sign… or two bucks more an hour?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.4 | Hook | Tape hook; envelopes A and B |
| 2.4–3.4 | **Silent pick** | 1-s PICK ONE ring |
| 3.4–3.75 | Flip | |
| 3.6–4.9 | **Line 1 (first partial payoff, 35%)** | Typed rule; "$2 × 40 hrs = $80 a week", red underline (4.9) |
| 4.45–7.85 | Race chart | Flat ink "A: $5,000 once" vs red "B: +$80 a week" over 104 weeks |
| 5.0–6.46 | **Line 2 (the answer, ~44%)** | "$5,000 ÷ $80 = 62.5 weeks", circled (6.35); lines cross at "wk 62.5" (6.46) |
| 7.45–9.05 | Verdict | Crossing circled (7.5); **FIRST CLASS** (7.8) |
| 9.05–9.4 | Flip | |
| 9.3–10.75 | Conditions | Envelopes return: A "leave < 62.5 wks?", B "stay 62.5+ wks?" |
| 10.35–12.05 | **Line 3, biggest number last** | "$80 × 52 wks × 3 yrs = *$12,480*" inked by 11.7, circled at 12.05 (last 2 s) |
| 12.5–14.0 | Loop | "…versus five grand." The last 0.35 s crossfades into frame 1 |

**Voice-over**

> Five grand to sign… or two bucks more an hour? *(0.1)*
> *[1-second silent pick]*
> Two bucks times forty hours: eighty a week. *(3.6)*
> Five grand over eighty: sixty-two and a half weeks. *(5.45)*
> Stay longer, and the raise wins. *(7.45)*
> Leave sooner? The five grand. *(9.3)*
> Stay three years? Twelve thousand four eighty… *(10.75)*
> …versus five grand. *(12.5, loops into "Five grand to sign…")*

**The envelope math (3 lines)**
1. `$2 × 40 hrs = $80 a week` (exact)
2. `$5,000 ÷ $80 = 62.5 weeks` (exact, ≈ 14.4 months; after 62 weeks the raise has paid $4,960, after 63 weeks $5,040, hence "< 62.5 / 62.5+")
3. `$80 × 52 wks × 3 yrs = $12,480` (exact; about 2.5× the bonus)

**ASSUME (on the envelope, no separate sticky in the Flash cut):** envelope B reads "raise, 40 hrs/wk", and line 3 writes out the 52 weeks. The pinned comment states the rest (before tax).

**Sources (checked 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. The bonus, the raise and the 40-hour week are the dilemma's stated terms.

**Ending**
- **Loop line:** "…versus five grand." flows straight into "Five grand to sign… or two bucks more an hour?"
- **Comment bait (a real question):** "What's your crossover week? Bonus ÷ (raise × hours a week)."
- **Pinned comment:**
  > Exact: $2 × 40 = $80 a week; $5,000 ÷ $80 = 62.5 weeks ≈ 14.4 months (no rounding on this one). After 62 weeks the raise has paid $4,960; after 63, $5,040. One year: $4,160; two: $8,320; three: $12,480, about 2.5× the bonus. Assumptions: 40 paid hours a week, 52 paid weeks a year, before tax. Not modelled: future % raises (they'd apply to the higher wage), overtime, any repayment clause on the bonus, retirement match. Envelope rule: crossover = bonus ÷ (raise × hours). What's your crossover week?

**Description**
> $5,000 to sign, or $2 more an hour? $2 × 40 hours = $80 a week, and $5,000 ÷ $80 = 62.5 weeks. Stay longer and the raise wins: three years of it is $12,480. Leave sooner and the bonus wins. Hypothetical offer, pre-tax, 40-hour weeks. Exact figures are pinned.
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #JobOffer #MoneyMath #Salary

*Optional "for scale" line, add only after re-verifying the BLS figure on publish day:* "$2 is about a 6.4% raise on the median US full-time wage ($1,251 a week ÷ 40 = $31.275 an hour, BLS Usual Weekly Earnings, Q2 2026)."

**Platform notes**
- **YouTube Shorts:** a 14 s loop. The hook, the three lines and the verdict are readable sound-off; `loop: true` crossfades the last 0.35 s into frame 1, and the last words ("…versus five grand") run into the first ("Five grand to sign…").
- **Instagram Reels:** same cut.
  - Caption with a direct question (Humphrey's caption questions earned 4–6x more comments per view, report 01).
  - Taggable line: "send to the friend with an offer on the table."
  - Max 5 hashtags.
- **TikTok:** a 60 s+ "your offers" cut. Solve three viewer-submitted bonus-vs-raise pairs from the comments, one envelope each with the same rule. That clears the Creator Rewards bar and turns comments into the next episode.

**Why this one should travel**
- **It's a fresh pair from the research's own list** ("salary vs signing bonus", pitfall 1), with a decision real viewers face, which drives saves and sends rather than idle rage-bait.
- **It runs Techtonic's proven device** (1.06M at 97.8x on 2.18K subs): annualise a per-unit rate and compute the break-even. Here it's in 3 ink lines with the answer actually delivered.
- **It pairs with, but doesn't repeat, 03B** ("A $1 raise is 'only' $8 a day", the Read-It Ladder). 03B ladders what a raise is worth over a decade; 04C asks when a raise overtakes cash on the table. Cross-link them in a playlist, but keep their hero numbers different: 04C stops at 3 years ($12,480), not the 5-year $20,800 that coincides with 03B's headline.
- **It fits the research's short-loop evidence:** dilemma and puzzle cards of 4–11 s farm loops (Filomation 6 s, Granny Drive 5 s, Alaric Moses Ong 11 s at 422x), and this one also carries a full solve.

---

### Math check

`teasers/04-two-envelopes-mathcheck.py` recomputes every number shown on screen, spoken, pinned or put in a description, asserts each displayed rounding, and opens the three spec files to assert the on-screen strings, the curve arrays and the red-pen crossing circles. That includes:
- the 1,000-week and 19.2-year crossover, the 5.2% (0.1% a week) at which the million lasts forever, and the pinned "how long it lasts" table;
- the monthly 40-year race (all 41 points of both lines), with a month-by-month proof that the gap never shrinks;
- the 6% overtake month, the tribonacci tie rate and the "never" threshold;
- the yearly-compounding "math police" case;
- the 62.5-week crossover and the 3-year $12,480.

**Output** (`python3 teasers/04-two-envelopes-mathcheck.py`, run 2026-10-07):

```text
============================================================================ 
04A  $1,000,000 now or $1,000 a week for life?
============================================================================
  line 1  $1,000,000 / $1,000 a week = 1,000 weeks
  line 2  1,000 / 52 = 19.2308 years -> "19.2 yrs" (within 0.16%) = 19 years + 12 weeks
  line 3  $1,000 x 52 = $52,000 a year; $52,000 / $1,000,000 = 5.2% (exact)
  chart   lines cross at year 19.23 -> pixel (618.7, 1017.1); drawn at t = 8.28 s; circle centred there
  twist   5.2% / 52 = 0.100% a week -> $1,000 a week forever, principal untouched (compounded weekly that is 5.33% a year)
  pin     how long $1M pays $1,000/wk:  0.0% -> 19.2 yrs  3.0% -> 28.7 yrs  4.0% -> 36.7 yrs  5.0% -> 65.2 yrs  5.2% -> forever
  note    30-year horizon: the million and the weekly are worth the same at 3.15% a year
  note    40-year horizon: the million and the weekly are worth the same at 4.20% a year
  note    50-year horizon: the million and the weekly are worth the same at 4.67% a year
  pin     $1,000 in year 20 at an assumed 3% inflation = $553.68 of today's money -> "$554"
============================================================================ 
04B  $200 a month from 25 or $400 a month from 35? (7%/yr assumed, monthly)
============================================================================
  stuff   A: $200 x 480 months = $96,000   B: $400 x 360 months = $144,000   B - A = $48,000
  race    at 65: A $524,962.68 -> "≈$525K" (0.007%); B $487,988.40 -> "$488K" (0.002%)
  sealed  gap $36,974.28 -> "A by ≈ $37K" (within 0.07%)
  chart   all 41 yearly points of both race lines match the monthly FV formula (to the cent)
  line 1  A at 35: $34,616.96 -> "35: $34.6K" / "≈ $34,600" / "almost $35K" (within 0.049%)
  line 2  $34,616.96 x 7% / 12 = $201.93; as written ($34,600 x 7% / 12) = $201.83 -> "≈ $202/mo"
  line 3  B's extra deposit $200 < $201.93: the gap grows by $1.93 in month 121
  never   gap rises every month from 35 to 125 (both still depositing): B never catches up
  twist   at 6%: B first >= A after deposit 464 -> age 63 yrs 8 mo
  pin     at 6%, age 65: A $398,298 vs B $401,806 (B ahead by $3,508)
  pin     tie at 65 when (1+i)^120 = 1.83929 (the tribonacci constant) -> 6.109% a year -> "6.11%"
  pin     "never" (head-start interest >= $200) needs (1+i)^120 >= 2 -> rate >= 6.9515% -> "6.96% or more"
  pin     yearly compounding: A $479,124 vs B $453,412 at 65 (A still ahead); B would only catch up at about age 85.5
============================================================================ 
04C  $5,000 to sign or $2 more an hour?
============================================================================
  line 1  $2 x 40 hrs = $80 a week
  line 2  $5,000 / $80 = 62.5 weeks = 14.4 months
  verdict after 62 weeks the raise has paid $4,960; after 63 weeks $5,040 -> "leave < 62.5 wks? / stay 62.5+ wks?"
  line 3  $80 x 52 wks x 3 yrs = $12,480 (vs the $5,000 bonus: 2.5x)
  chart   lines cross at week 62.5 -> pixel (590.7, 1036.7); drawn at t = 6.46 s; circle centred there
  pin     after 1 yr: raise $4,160 vs bonus $5,000
  pin     after 2 yr: raise $8,320 vs bonus $5,000
  pin     after 3 yr: raise $12,480 vs bonus $5,000
  pin     after 5 yr: raise $20,800 vs bonus $5,000
  option  if re-verified: $1,000 / $1,251 = 79.9% ("about 80%"); $2 / ($1,251 / 40 = $31.27/hr) = 6.4% raise

all assertions passed
```

(The last line's $31.27 is Python rounding $31.275 down; the optional description line writes the exact $31.275.)

---

### Verification log

QA pass, 2026-10-07: independent fact-check, short-form edit and visual QA of the writer's draft. Every number was recomputed in a separate script before the shipped math check was rewritten; the specs were re-timed and re-laid-out; the md above was brought in line with the specs.

**1. Math (python3, independent recompute of the md, every spec string, every curve array, every caption)**

| Checked | Result | Action |
|---|---|---|
| 04A: 1,000 wks, 19.23 yrs (19 y 12 wk), 5.2%, $52K/yr, chart arrays (31 points each), crossing pixel (618.7, 1017.1) vs red circle | Arithmetic right; the circle sits on the crossing | Kept; circle re-placed for the new chart height |
| 04A: "That weekly check is a 5.2% **bond** in disguise" | **Wrong framing.** A bond pays the coupon *and* gives the principal back; the life stream never does. At 5.2% the million pays the same $1,000 a week **and is still there**, which is the real twist | Replaced with "same check, forever + you keep $1M" (ink, VO, caption, description, A/B title) |
| 04A rule card "beat 5.2% forever? → $1M / can't? → the weekly" (also on the envelopes, "beat 5.2%?") | **Wrong decision rule.** Below 5.2% the million still pays $1,000 a week for decades: 28.7 yrs at 3%, 36.7 at 4%, 65.2 at 5%. Break-even rate depends on the horizon (3.15% over 30 yrs, 4.20% over 40, 4.67% over 50) | Replaced with the two exact end points: "earn 0%? $1M lasts 19.2 yrs / earn 5.2%? it lasts forever"; the in-between table goes in the pin |
| 04A pin: PV of $52K at 3/5/7% ($1.02M / $0.80M / $0.65M), $554 inflation figure | Right | PV row swapped for the "how long it lasts" row, which matches the new ending; $554 kept. Added the "5.2% = 0.1% a week = 5.33% compounded weekly" well-actually |
| 04B: $96K / $144K / $48K, A $524,962.68, B $487,988.40, gap $36,974.28, head start $34,616.96, $201.93 vs $201.83, all 41 points of both race lines, month-by-month "never" proof, 6% pass at 63 y 8 m, B +$3,508 at 65, tie 6.109%, yearly variant $479,124 / $453,412 / catch-up 85.5 | All right | Kept |
| 04B pin "'Never' holds for any rate of 6.95% or more" | **Wrong by a hair.** Never needs (1+i)^120 ≥ 2, i.e. ≥ 6.9515%; at 6.95% (1+i)^120 = 1.9997, so the gap still shrinks | Changed to "6.96% or more"; asserted both sides in the script |
| 04B "At 35: A's got 35 grand" (VO/caption) vs "35: $34.6K" (chart) | Mismatch between caption and on-screen math | Caption/VO now "almost $35K"; line 1 caption "about $34,600" |
| 04B curve end label "≈$525K" | Drew at 25.4 s and was cleared by the flip at 25.85 s: on screen for ~0.2 s | Race shortened to 9.5 s so the label holds ~0.9 s before the flip |
| 04C: $80/wk, 62.5 wks, 14.4 months, $4,960 / $5,040, $4,160 / $8,320 / $12,480 / $20,800, chart arrays (105 points), crossing pixel (590.7, 1036.7) | Right | Kept; $12,480 promoted to on-screen line 3 |
| 04C condition labels "leave before wk 63" / "stay past wk 63" | **Imprecise.** The crossing is at 62.5 weeks; the raise has already won by the end of week 63 ($5,040), so "past wk 63" overstates it | Changed to "leave < 62.5 wks?" / "stay 62.5+ wks?" |
| Math check script | Passed, but tested numbers only, not the specs | Rewritten: it now loads all three specs and asserts the on-screen strings, curve arrays, crossing circles and stuffed amounts |

**2. Facts (as of 2026-10-07)**

| Input | Status | Action |
|---|---|---|
| On-screen numbers in 04A/B/C | All are the dilemma's own hypotheticals or labelled assumptions (7% sticky + stamp; "40 hrs/wk" on envelope B; "÷ 52" / "× 52 wks" in the ink) | Nothing to source |
| BLS median full-time weekly pay $1,251, Q2 2026 (writer's 04A/04C descriptions and pins, "team-verified") | **Not verifiable in this pass.** The shared WebSearch budget was already exhausted when QA started, and the primary sources (www.bls.gov, api.bls.gov, fred.stlouisfed.org) are blocked by the egress proxy | Removed from every published description and pin. Kept as a clearly marked *optional* line, to add only after a publish-day check. The math for it ($1,000 ÷ $1,251 = 79.9%; $2 ÷ $31.275 = 6.4%) is still asserted |
| Evidence tables, outlier scores, URLs | Copied verbatim from `research/02-top-10-approaches.md` §4 and the watch files; spot-checked: Filomation 5,662,642 / 388.12x, Behind the Border 1,740,010 / 535.07x, Teacherman 246,315 / 735.3x, @joshcelder's poll in `raw/ig-tiktok-outliers.md` | Kept. One fix: Behind the Border's overtake is 0:33 of 62 s = **53%**, not "~55%" |
| Platform claims (Content ID block for Shorts over 1 min, Socialinsider 45–60 s, Buffer +43.2% for 60 s+, Creator Rewards over 1 min, Humphrey's 4–6x caption comments) | All traced to `research/01-viral-finance-shorts-research.md` §4 / `raw/web-creator-case-studies.md` with their cited URLs | Kept, now with the report reference |

**3. Brand and policy (format bible §2)**

| Rule | Draft | Now |
|---|---|---|
| ≤3 ink lines | Pass (A, B, C) | Pass. 04C's line 3 changed from "+$4,160 every year after" (ambiguous "after") to the full "$80 × 52 wks × 3 yrs = $12,480" |
| A number in frame 1 | Hook yes; the envelopes only popped in after frame 0 | Envelopes now at `t: -0.5`, so the thumbnail shows both options |
| Honest rounding + exact pin | Pass, except the 04B "35 grand" mismatch | Fixed (above) |
| No advice language | 04A's "Beat that forever, the million wins. Can't? The check." read as a decision rule (and was wrong) | Replaced with arithmetic statements. No "you should" in any script, caption, pin or description (the only grep hit is a competitor's title quoted in the evidence table); no bible-banned words |
| Lanes | **04C was 15.0 s, outside Flash (6–14 s).** 04B was labelled "Race" (not a bible lane) | 04C 14.0 s (Flash); 04B 50.0 s (Long envelope, five one-line reveals); 04A 30.2 s (Envelope) |
| Hook template "only option B is red" | 04C had both "$5,000" and "$2 MORE" in red | Only "$2 MORE AN HOUR?" is red |
| No borrowed footage / impersonation; disclaimer | Pass | Pass; "Educational math, not financial advice." in all three descriptions |

**4. Virality** (hook scores against `research/02-top-10-approaches.md` §4 and the watch breakdowns)

| Teaser | Hook before → after | Why | Structure fixes |
|---|---|---|---|
| 04A | 8 → 8 (kept) | The exact pair behind Filomation's 5.66M at 388x on 1.75K subs; concrete numbers, a binary choice | Partial payoff 19.2 yrs at 7.9 s (26%). The draft ended on 3 s of re-slapped hook with no new payoff; now "forever" is inked and circled at 28.5–28.65 s (last 2 s), then "So… which envelope?" loops into frame 1 (`loop: true`). Runtime 31.0 → 30.2 s |
| 04B | 7 → 8 | Draft "$200 A MONTH AT 25 / OR $400 A MONTH / AT 35?" had no stake and read as "only at 25". Now "$200/MO FROM 25 / OR $400/MO FROM 35. / WHO HAS MORE AT 65?", the research formula "Same $X a month. One starts at 25, one at 35. Who wins?" with the doubled-deposit twist | Partial payoff "35: $34.6K" at 18.1 s (36%). The draft's verdict landed at 47.0 s of 52.8 with a 3.5 s re-slap after it; now OPENED BY MISTAKE lands at 48.1 s of 50.0 (last 2 s), and the deposit and why beats are tighter. Runtime 52.8 → 50.0 s |
| 04C | 7 → 8 | Draft matched the "$[lump] or $[small] per [unit]?" formula (Techtonic 97.8x, Granny Drive 73x) but had low tension. Third strip "PICK IN ONE SECOND." makes it the research build's 1-second commitment. ("1" spelled out: the marker "1" rendered as "I") | "$80 a week" inked at 4.85 s (35%), "62.5" at ~6.0 s (43%) (draft: ~7.7 s, 51%). Biggest number $12,480 circled at 12.05 s of 14.0 (draft ended on the smaller $4,160 and a half-slapped hook). The draft's claim "the last frame equals the first" was false (the hook was mid-slap at 14.38 s); now `loop: true` |

**5. Visual QA** (`node src/cli.js check`, 12-frame sheets, safe-zone stills; all viewed)

| Found | Fix |
|---|---|
| `check` reported 19 warnings across the three drafts: postmark overlapping the hook (all three) and the 04B envelope card; typed rule at 38 px (min 40); chart legends at 48–52 px, 04B sticky at 46 px, envelope card lines at 46–52 px (min 56) | Postmark moved to the bible's badge position (x 175, y 258, r 100); rule 40 px; legends, sticky and card lines ≥ 56 px. **All three now lint with zero warnings** (re-run against the latest engine, including its new cleared-before-written check) |
| Red-pen circles and underlines were hand-placed pixel boxes | Switched to text anchors (`target`) so they always land on "1,000 wks", "19.2 yrs", "5.2%", "forever", "$202/mo", "never", "$80 a week", "62.5 weeks", "$12,480"; the two chart-crossing circles are computed from the curve geometry and asserted in the math check |
| Reading time (≥ 0.25 s per word after the pen finishes): 04B "B puts in $48,000 more" held 1.18 s for 5 words; 04C line 3 held 1.6 s for 9 words | Re-timed: 1.33 s and 2.3 s. Every caption ≤ 4 words/s (linted) |
| 04A line 3 and the twist line sat right on top of the caption band | Lifted 50–60 px |
| 04B "never" circle grazed the right-hand rail | Line 3 moved 25 px left |

**Engine requests** (not edited; `engine/src` untouched):
- `stuff`: expose `labelSize` / `amountSize`. Labels are fixed at 46 px (below the 56 px phone minimum the linter enforces elsewhere) and amounts at 56 px; 04B's "A · 40 yrs / B · 30 yrs" labels are the one sub-56 px text left in these specs, and the linter doesn't see it.
- `pick`: lint the `sub` labels (drawn at 0.7 × `size`, so ~50 px at size 72) and allow a `subSize`.
- `curve`: an `endLabel` for the `compare` series (B's "≈$488K"), and an option to keep the end label for a set hold time after the line finishes.

**Still open:** re-verify the BLS figure before using either optional "for scale" line; a full MP4 render was not part of this pass (sheets and stills only).
