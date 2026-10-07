## 4. Two Envelopes (Pick-One Dilemma -> Race to the Crossover)

**Series:** *Two Envelopes* · **Lanes:** one per lane, on purpose: Envelope (04A, 32.0 s), Long envelope / race (04B, 51.0 s), Flash (04C, 14.0 s) · **Lead devices:** `pick` (two sealed envelopes, A and B), a 1-second silent pick beat, the typed crossover rule, a napkin race chart (`curve` + `compare`) whose crossover the engine finds, circles and labels, Sealed Answer + guess timer, `FIRST CLASS` / `OPENED BY MISTAKE` stamps, postmark No.
**Teasers:** 04A $1,000,000 now or $1,000 a week for life? · 04B $200 a month from 25 or $400 a month from 35: who has more at 65? · 04C $5,000 to sign or $2 more an hour?
**Specs:** `engine/specs/04-two-envelopes-{a,b,c}.json` (all three lint with zero warnings on the upgraded engine, `loop: true`) · **MP4s:** `engine/out/04-two-envelopes-{a,b,c}.mp4` · **Sheets:** `engine/out/sheets/04-two-envelopes-{a,b,c}.png` · **Stills (from the MP4s):** `engine/out/stills/04-two-envelopes-{a,b,c}-<t>.png` · **Math check:** `teasers/04-two-envelopes-mathcheck.py` (all assertions pass, output below; it also reads the spec files and asserts the on-screen strings, curve arrays and the engine's crossover labels)

**Sourcing note (read before publishing).** Nothing on screen in these three teasers depends on a real-world statistic:
- every amount in the dilemmas is the dilemma's own stated hypothetical;
- every rate or hour count is a labelled assumption (ASSUME sticky and `7%` stamp in 04B; "raise, 40 hrs/wk" on envelope 04C-B; "× 52 wks" written out in the ink);
- the one real-world figure is the BLS median-pay "for scale" line in the 04A and 04C **descriptions** (not on screen): $1,251 a week, full-time wage and salary workers, Q2 2026. It was re-verified on 2026-10-07 (see the Final fact check) and is back in both descriptions with its source. BLS publishes Q3 2026 on 2026-10-28: if either teaser posts on or after that date, re-check the figure and the percentage first.

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
- **The race.** Two lines on a napkin chart (`curve` + `compare`) drawn by the pen, each on its own screen, with the crossover arriving late. The engine computes the exact crossing, circles it and writes the label (`crossover: {label: "yr {x}"}`), so the circle can never drift off the lines.
  - 04A: even year pacing (`ease: "linear"`); the lines cross at 11.3 s of 32.0 s and the label reads "yr 19.2".
  - 04B: a slow start (25 → 35 in 3.6 s), a fast middle (35 → 60 in 2.6 s) and a slow photo finish (60 → 65 in 2.8 s), the Behind the Border rhythm. The lines never cross, so the engine draws no circle.
  - 04C: even week pacing; "wk 62.5" is circled at 8.5 s of 14.0 s.
- **Two final numbers side by side** and a **twist that flips the answer** (04A: at 5.2% the million pays the same check forever; 04B: at 6% the late starter wins).
- **A hard loop.** On the last screen the tape hook re-slaps over the same two envelopes, so the closing frames already look like frame 1; every spec sets `loop: true` (the last 0.35 s crossfades into frame 1), and the last spoken line is a question that runs straight into the first one.

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
| Masking-tape hook (frame 1, re-slapped on the last screen for the loop) | `hook` (renders finished at `t: 0`) + `loop: true` | ✓ | ✓ | ✓ |
| Which envelope? A/B | `pick` (labels 82–84 px, `subSize` 60–64) | ✓ (open + range) | ✓ (open + 6% reveal: B stamped, A dims) | ✓ (open + conditions) |
| Silent pick beat | `timer` (1 s, PICK ONE) | ✓ | ✓ | ✓ |
| Typed crossover rule | `write` (type font, 48 px) | ✓ | ✓ | ✓ |
| Ballpoint working (≤3 lines) | `write` (72–84 px; hero number 100–124 px) | 3 lines, hero "≈ 19.2 yrs" | 3 lines, hero "never" | 3 lines, heroes "62.5 weeks", "$12,480" |
| Napkin race chart | `curve` + `compare` + `crossover` / `marks` / `ticks` (+ `counter` steps in 04B) | flat $1M vs +$52K/yr, `ease: "linear"`, B labelled on its line from year 6, engine crossover "yr 19.2" | 40-yr race 25 → 65 (age ticks + an "age 25 → 65" counter synced to the pen), finish marks "A ≈$525K" / "B ≈$488K", no crossover | flat $5K vs +$80/wk, `ease: "linear"`, B labelled on its line from week 20, engine crossover "wk 62.5" |
| Red pen | `annotate` with text anchors (`target`) | underline, 3 circles + the engine's crossover circle | underline, circle on "never" | underline, 2 circles + the engine's crossover circle |
| ASSUME sticky / postage stamp | `sticky` (64 px), `postage` | n/a (all inputs are the dilemma's) | ✓ sticky + `7%` stamp | n/a (assumption on envelope B: "raise, 40 hrs/wk") |
| Stuffed envelopes | `stuff` (`labelSize` 62, `amountSize` 80) | n/a | $96,000 vs $144,000 deposits | n/a |
| Sealed Answer + guess timer | `envelope`, `timer` | ✓ 5.2% (3 s) | ✓ gap at 65 (3 s) | n/a (Flash: the race is the reveal) |
| Verdict stamps | `stamp`, `pick` reveal | FIRST CLASS + OPENED BY MISTAKE | FIRST CLASS on the sealed answer, then FIRST CLASS moves to envelope B at 6% (last 3 s) | FIRST CLASS |
| Postmark No. | `postmark` in the flap (x 175, y 258, r 100, t 0) | 04A | 04B | 04C |
| Flip | `flip` | ✓ (4) | ✓ (5) | ✓ (3) |

---

### Teasers

#### 04A: $1,000,000 now or $1,000 a week for life?

- **Working title:** $1 million now or $1,000 a week for life? (Two Envelopes No. 04A)
- **Money topic:** windfalls and payouts: lump sum vs a lifetime stream (the annuity question)
- **Lane / runtime:** Envelope, **32.0 s** (card + solve, `loop: true`; bible lane 25–45 s). The research build is ~24 s. This runs longer because the captions are paced at ≤4 words/s, it includes a 3-second guess, and the race now gets its own screen instead of sharing one with the math.
- **Spec:** `engine/specs/04-two-envelopes-a.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-a.png`

**Frame-1 hook** (hook score 8/10, unchanged: it is the exact pair behind Filomation's 388x on 1.75K subs)
- On screen (tape, three strips, 80 px): **$1,000,000 NOW / OR *$1,000 A WEEK* / FOR LIFE?** The hook renders finished in frame 0, and envelope A "$1,000,000 · today" and envelope B "$1,000 a wk · for life" (82 px labels) are already settled there, so frame 0 is the thumbnail.
- First spoken line (0.15–3.0 s): *"A million now… or a thousand a week, for life?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.0 | Hook | Tape hook; envelopes A and B |
| 3.0–4.0 | **Silent pick** | 1-s PICK ONE ring; no VO |
| 4.0–4.4 | Flip | Clean side |
| 4.25–6.55 | Line 1 | Typed rule "crossover = head start ÷ catch-up"; ink "$1,000,000 ÷ $1,000/wk = 1,000 wks", red underline on "1,000 wks" (6.25) |
| 6.6–8.75 | **Partial payoff (~25%)** | Line 2 "1,000 wks ÷ 52 =", then the hero "≈ 19.2 yrs" (120 px) inked by 8.06 and circled at 8.1 (held ~0.9 s before the flip) |
| 9.0–9.4 | Flip | |
| 9.2–12.6 | **The race** | Flat ink line "A: $1M today" vs the red line, 30 years at even pacing (ticks 0/10/20/30 yrs); "B: +$52K a yr" rides the red line from year 6 (10.1); the engine circles the crossing and writes "yr 19.2" at 11.27; **FIRST CLASS** lands on B's side, below the label (11.75) |
| 12.6–13.0 | Flip | **Pattern break at ~39%** |
| 12.85–17.0 | The other side | Red "but $1M can earn interest…"; sealed envelope slides in; line 3 "$52,000 ÷ $1,000,000 =" |
| 17.0–20.0 | Guess | 3-s GUESS ring beside the envelope |
| 20.0–21.75 | **Reveal (62%)** | Envelope opens: card "5.2% / a year, forever"; red "5.2%" written into line 3, circled (21.35) |
| 22.2–26.4 | Twist | Red "same check forever + you keep $1M"; **OPENED BY MISTAKE** on the envelope (25.0) |
| 26.4–26.8 | Flip | The hook and both envelopes return exactly as in frame 1 |
| 26.6–30.5 | **The range, biggest verdict last** | "earn 0%? $1M lasts 19.2 yrs" / "earn 5.2%? it lasts *forever*"; "forever" inked by 30.15 and circled at 30.1–30.5 (last 2 s) |
| 30.5–32.0 | Loop | "So… which envelope?"; the screen already matches frame 1 and the last 0.35 s crossfades into it |

**Voice-over** (timings = captions in the spec; captions show numerals, the VO says them as below)

> A million now… or a thousand a week, for life? *(0.15)*
> *[1-second silent pick]*
> A million divided by a thousand a week… *(4.25)*
> …is a thousand weeks. Nineteen point two years. *(6.6)*
> Collect longer than that… *(9.2)* …and the weekly check wins. *(11.25)*
> But the million can earn interest. *(12.85)*
> What rate pays a grand a week, forever? *(14.8)*
> *[3-second pause to guess]*
> Five point two percent. A year. Forever. *(20.0)*
> Earn that, and the million… *(22.0)* …pays the same check forever… *(23.5)*
> …and you still keep the million. *(24.9)*
> Earn nothing? The million lasts nineteen point two years. *(26.65)*
> Earn five point two? It lasts forever. *(28.7)*
> So… which envelope? *(30.5, loops to the first line)*

**The envelope math (3 lines)**
1. `$1,000,000 ÷ $1,000/wk = 1,000 wks` (exact)
2. `1,000 wks ÷ 52 = ≈ 19.2 yrs` (written as "1,000 wks ÷ 52 =" with the hero "≈ 19.2 yrs" on its own row; exact 19.23 = 19 years 12 weeks; within 0.16%)
3. `$52,000 ÷ $1,000,000 = 5.2%` (exact: 5.2% ÷ 52 = 0.1% a week, which is $1,000 a week on $1M with the million untouched)

The closing range ("earn 0%? $1M lasts 19.2 yrs / earn 5.2%? it lasts forever") restates lines 2 and 3; it adds no new calculation.

**ASSUME sticky:** none on screen. Every input is the dilemma's own stated amount ($1,000,000; $1,000 a week; 52 weeks a year, written in line 2). The things the envelope deliberately leaves out (tax, inflation, how long "life" is, the payer's credit) are named in the pinned comment.

**Sources (checked 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. All are the stated hypothetical and arithmetic.
- **Format reference** (not a fact used on screen): Filomation's meme, `research/watch/group4-video4.md`. No real winner, screenshot or lottery brand appears.
- **Description "for scale" line:** median usual weekly earnings of full-time wage and salary workers, $1,251, Q2 2026 (BLS release of 2026-07-21, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm), re-verified 2026-10-07. Not on screen.

**Ending**
- **Loop line:** "So… which envelope?" runs straight into "A million now… or a thousand a week, for life?" over the same two envelopes (`loop: true`).
- **Comment bait (a real question):** "Which envelope did you pick, and what return are you assuming?"
- **Pinned comment:**
  > Exact: $1,000,000 ÷ $1,000 a week = 1,000 weeks = 19.23 years, i.e. 19 years and 12 weeks (envelope said ≈ 19.2, within 0.2%). $52,000 ÷ $1,000,000 = 5.2% exactly: that's 0.1% a week, which pays $1,000 every week without touching the million (5.33% a year if you compound it weekly). How long the million pays $1,000 a week, by what it earns: 0% → 19.2 yrs · 3% → 28.7 yrs · 4% → 36.7 yrs · 5% → 65.2 yrs · 5.2% → forever. So the real question is your rate × how long you'd collect. What the envelope leaves out: tax (rules differ by country and payout type); inflation (at an assumed 3%, year 20's $1,000 buys what about $554 buys today, which tilts toward the million); and whether the payer is good for it. Envelope rule: crossover = head start ÷ catch-up. Which did you pick?

**Description**
> $1 million now, or $1,000 a week for life? The envelope math: $1M ÷ $1,000 a week = 1,000 weeks ≈ 19.2 years to break even if the million earns nothing. And $52,000 ÷ $1M = 5.2%: earn that, and the million pays the same $1,000 a week forever while you keep the million. Anywhere in between, it's the rate against how long you collect (table in the pinned comment). Hypothetical dilemma, pre-tax, before inflation. For scale: $1,000 a week is about 80% of the median US full-time weekly pay ($1,251, BLS Usual Weekly Earnings, Q2 2026).
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #MoneyMath #WouldYouRather #LumpSum

*"For scale" line:* $1,000 ÷ $1,251 = 79.9%. Source: BLS, "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026" (released 2026-07-21), re-verified 2026-10-07. BLS releases Q3 2026 on 2026-10-28; if posting on or after that date, re-check the figure and the percentage.

**Platform notes**
- **YouTube Shorts:** post the 32.0 s master; the title equals the tape hook plus the series tag.
  - If 3-second retention is fine but the end dips, cut a 26.4 s version that drops the range screen (26.4–32.0) and loops from the OPENED BY MISTAKE stamp.
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
- **Lane / runtime:** Long envelope (race), **51.0 s** (bible lane 50–75 s; under 60 s, so no `lane: "long"` needed), five one-line mini-reveals (deposits → age 35 → the gap at 65 → why → the 6% twist). Research: 45–62 s races on Shorts; Instagram's 45–60 s median-view sweet spot.
- **Spec:** `engine/specs/04-two-envelopes-b.json` · **Sheet:** `engine/out/sheets/04-two-envelopes-b.png`

**Frame-1 hook** (hook score 7 → 8/10 after the rewrite: the stake is now explicit and "from" removes the "only at 25?" misread)
- On screen (tape, 72 px): **$200/MO FROM 25 / OR *$400/MO* FROM 35. / WHO HAS MORE AT 65?**, rendered finished in frame 0, with envelope A "$200/mo · starting at 25" and envelope B "$400/mo · starting at 35" (84 px labels) already settled there.
- First spoken line (0.15–4.5 s): *"Two hundred a month from twenty-five… or four hundred from thirty-five. Who has more at sixty-five?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–4.5 | Hook | Tape hook; envelopes A and B |
| 4.5–5.5 | **Silent pick** | 1-s PICK ONE ring |
| 5.5–5.9 | Flip | Clean side |
| 5.75–7.6 | Assumptions | ASSUME sticky writes in; `7%` postage stamp "ASSUMED" |
| 8.3–12.0 | What each puts in | Stuffed envelopes fill and count up: "A · 40 yrs" **$96,000** (ink), "B · 30 yrs" **$144,000** (red) |
| 11.3–13.65 | Stakes | Red "B puts in $48,000 more" |
| 13.65–14.05 | Flip | |
| 13.9–17.9 | Race, slow start | Age ticks 25…65 and a big "age 25" counter that ticks in step with the pen (26 at 16.0 s, then faster); A's ink line leaves 25; B's red line sits at $0 |
| 17.9 | **Partial payoff (35%)** | Counter hits "age 35" (17.87) as the dot "35: $34.6K" lands on A and B lifts off |
| 17.9–20.5 | **Pattern break: the fast middle** | B, on double deposits, climbs as steeply as A; ages 35 → 60 pass in 2.6 s |
| 20.5–24.5 | Photo finish (slow) | The two lines run side by side to 65 (counter 61, 62, 63, 64… 65); finish dots "A ≈$525K" / "B ≈$488K" land with "age 65" at 23.3; no crossover circle, because the lines never cross |
| 24.5–24.9 | Flip | |
| 24.75–27.3 | Sealed question | Sealed envelope; "at 65: who's ahead, by how much?" |
| 27.3–30.3 | Guess | 3-s GUESS ring beside the envelope |
| 30.3–34.3 | **Reveal (59%)** | Card "A by ≈ $37K / $525K vs $488K"; **FIRST CLASS** on the envelope (31.1); red "with $48K less put in" (31.7) |
| 34.3–34.7 | Flip | |
| 34.55–43.25 | The why (3 lines) | Typed rule; lines 1–3; underline "$202/mo" (39.6); hero "never" (120 px), circled (42.85) |
| 44.3–44.7 | Flip | The hook and both envelopes return as in frame 1 |
| 44.55–48.7 | **Twist** | "at 6%: B passes A" / red "at 63 yrs 8 mo" (45.0–47.8); at 48.1 envelope B gets **FIRST CLASS** and A dims (the winner flips, last 3 s) |
| 49.0–51.0 | Loop | "So… which envelope now?"; the screen already matches frame 1 and the last 0.35 s crossfades into it |

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
> Drop the rate to six percent, though… *(44.55)* …and B passes A at sixty-three and eight months. *(46.6)*
> So… which envelope now? *(49.0, loops)*

**The envelope math (3 lines, the "why")**
1. `A's head start at 35 ≈ $34,600` (exact $34,616.96 = $200 a month for 120 months at 7%/12; within 0.05%)
2. `$34,600 × 7% ÷ 12 ≈ $202/mo` (exact $201.93 on the unrounded balance; $201.83 as written; both ≈ $202)
3. `B's extra $200 < $202 → never` (written as "B's extra $200 < $202 →" with the hero "never" on its own row; the gap grows by $1.93 in month 121, and more every month after)

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
- **YouTube Shorts:** post the 51.0 s master. The research puts races at 45–62 s on Shorts. Our photo finish (ages 60 → 65) runs at 40–46% of runtime (20.5–23.3 s), close to where Behind the Border's overtake lands (~53%).
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

**Frame-1 hook** (hook score 7 → 8/10 after the rewrite: the third strip makes the silent pick an explicit 1-second commitment, the research build's "Pick one." beat; **final review: 7/10**, see Final review)
- On screen (tape, 72 px): **$5,000 TO SIGN / OR *$2 MORE AN HOUR?* / PICK IN ONE SECOND.**, rendered finished in frame 0, with envelope A "$5,000 · signing bonus" and envelope B "+$2/hr · raise, 40 hrs/wk" (84 px labels, 60 px subs) already settled there. ("ONE" is spelled out: in the marker face a lone "1" reads as "I".)
- First spoken line (0.1–2.4 s): *"Five grand to sign… or two bucks more an hour?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.4 | Hook | Tape hook; envelopes A and B |
| 2.4–3.4 | **Silent pick** | 1-s PICK ONE ring |
| 3.4–3.75 | Flip | |
| 3.6–4.95 | **Line 1 (first partial payoff, 33%)** | Typed rule; "$2 × 40 hrs = $80 a week" (84 px), red underline on "$80 a week" (4.65) |
| 5.1–6.6 | **Line 2 (the answer, ~44%)** | "$5,000 ÷ $80 =", then the hero "62.5 weeks" (120 px) inked by 6.2 and circled (6.25) |
| 7.0–7.35 | Flip | |
| 7.2–9.4 | **The race** | Flat ink "A: $5,000 once" vs the red line over 104 weeks at even pacing (ticks 0 / 1 yr / 2 yrs); "B: +$80 a wk" rides the red line from week 20 (7.9); the engine circles the crossing and writes "wk 62.5" (8.5); **FIRST CLASS** (8.75), below it |
| 9.4–9.75 | Flip | The hook and both envelopes return, now labelled A "leave < 62.5 wks?", B "stay 62.5+ wks?" |
| 10.3–12.1 | **Line 3, biggest number last** | "$80 × 52 wks × 3 yrs =", then red "$12,480" (110 px) inked by 11.7 and circled at 11.75–12.1 (last 2.3 s) |
| 12.5–14.0 | Loop | "…versus five grand."; the screen already matches frame 1 and the last 0.35 s crossfades into it |

**Voice-over**

> Five grand to sign… or two bucks more an hour? *(0.1)*
> *[1-second silent pick]*
> Two bucks times forty hours: eighty a week. *(3.6)*
> Five grand over eighty: sixty-two and a half weeks. *(5.4)*
> Stay past that, and the raise wins. *(7.2)*
> Leave sooner? The five grand. *(9.6)*
> Stay three years? Twelve thousand four eighty… *(10.9)*
> …versus five grand. *(12.5, loops into "Five grand to sign…")*

**The envelope math (3 lines)**
1. `$2 × 40 hrs = $80 a week` (exact)
2. `$5,000 ÷ $80 = 62.5 weeks` (hero "62.5 weeks" on its own row; exact, ≈ 14.4 months; after 62 weeks the raise has paid $4,960, after 63 weeks $5,040, hence "< 62.5 / 62.5+")
3. `$80 × 52 wks × 3 yrs = $12,480` (written as "$80 × 52 wks × 3 yrs =" with the red hero "$12,480" on its own row; exact; about 2.5× the bonus)

**ASSUME (on the envelope, no separate sticky in the Flash cut):** envelope B reads "raise, 40 hrs/wk", and line 3 writes out the 52 weeks. The pinned comment states the rest (before tax).

**Sources (checked 2026-10-07)**
- **On-screen numbers:** none are real-world statistics. The bonus, the raise and the 40-hour week are the dilemma's stated terms.
- **Description "for scale" line:** the same BLS figure as 04A ($1,251 a week, Q2 2026, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm), re-verified 2026-10-07. Not on screen.

**Ending**
- **Loop line:** "…versus five grand." flows straight into "Five grand to sign… or two bucks more an hour?"
- **Comment bait (a real question):** "What's your crossover week? Bonus ÷ (raise × hours a week)."
- **Pinned comment:**
  > Exact: $2 × 40 = $80 a week; $5,000 ÷ $80 = 62.5 weeks ≈ 14.4 months (no rounding on this one). After 62 weeks the raise has paid $4,960; after 63, $5,040. One year: $4,160; two: $8,320; three: $12,480, about 2.5× the bonus. Assumptions: 40 paid hours a week, 52 paid weeks a year, before tax. Not modelled: future % raises (they'd apply to the higher wage), overtime, any repayment clause on the bonus, retirement match. Envelope rule: crossover = bonus ÷ (raise × hours). What's your crossover week?

**Description**
> $5,000 to sign, or $2 more an hour? $2 × 40 hours = $80 a week, and $5,000 ÷ $80 = 62.5 weeks. Stay longer and the raise wins: three years of it is $12,480. Leave sooner and the bonus wins. Hypothetical offer, pre-tax, 40-hour weeks. Exact figures are pinned. For scale: that $80 a week is about 6.4% of the median US full-time weekly pay ($1,251, BLS Usual Weekly Earnings, Q2 2026).
> Educational math, not financial advice.
> #EnvelopeMath #TwoEnvelopes #JobOffer #MoneyMath #Salary

*"For scale" line:* $80 ÷ $1,251 = 6.39% → "about 6.4%". (The draft's wording, "a 6.4% raise on the median US full-time wage", was loose: $1,251 ÷ 40 is the median full-time weekly pay spread over 40 hours, not the median hourly wage, so the line now compares weekly pay to weekly pay.) Source and re-check rule as in 04A: BLS Q2 2026 release of 2026-07-21, re-verified 2026-10-07; Q3 2026 comes out 2026-10-28.

**Platform notes**
- **YouTube Shorts:** a 14 s loop. The hook, the three lines and the verdict are readable sound-off; `loop: true` crossfades the last 0.35 s into frame 1, and the last words ("…versus five grand") run into the first ("Five grand to sign…").
- **Instagram Reels:** same cut.
  - Caption with a direct question.
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

`teasers/04-two-envelopes-mathcheck.py` recomputes every number shown on screen, spoken, pinned or put in a description, asserts each displayed rounding, and opens the three spec files to assert the on-screen strings (writes, hooks, cards, pick labels, stuffed-envelope labels, chart marks, end labels and ticks, captions) and the curve arrays. It also ports the engine's crossover finder (`crossing()` in `engine/src/ops/charts.js`) to Python and asserts the label the engine will write. That includes:
- the 1,000-week and 19.2-year crossover (engine label "yr 19.2"), the 5.2% (0.1% a week) at which the million lasts forever, and the pinned "how long it lasts" table;
- the monthly 40-year race (all 41 points of both lines), that B never leads at any point (so no crossover is drawn), that every step of the "age" counter lands within 0.005 s of the pen reaching that age, and a month-by-month proof that the gap never shrinks;
- the 6% overtake month, the tribonacci tie rate and the "never" threshold;
- the yearly-compounding "math police" case;
- the 62.5-week crossover (engine label "wk 62.5") and the 3-year $12,480;
- the two BLS "for scale" percentages (79.9% and 6.4%).

**Output** (`python3 teasers/04-two-envelopes-mathcheck.py`, run 2026-10-07 after the final review):

```text
============================================================================ 
04A  $1,000,000 now or $1,000 a week for life?
============================================================================
  line 1  $1,000,000 / $1,000 a week = 1,000 weeks
  line 2  1,000 / 52 = 19.2308 years -> "19.2 yrs" (within 0.16%) = 19 years + 12 weeks
  line 3  $1,000 x 52 = $52,000 a year; $52,000 / $1,000,000 = 5.2% (exact)
  chart   engine crossover at index 19.2308 (= 1,000/52 years) -> label "yr 19.2"; drawn at t = 11.27 s
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
  chart   B never leads A at any of the 41 points -> no engine crossover; marks at age 35 (i=10) and 65 (i=40)
  chart   age counter: 21 steps 25 -> 65, each within 0.005 s of the pen reaching that age; "age 35" at 17.87 s with the "35: $34.6K" dot
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
  chart   engine crossover at week 62.5 -> label "wk 62.5"; drawn at t = 8.50 s
  pin     after 1 yr: raise $4,160 vs bonus $5,000
  pin     after 2 yr: raise $8,320 vs bonus $5,000
  pin     after 3 yr: raise $12,480 vs bonus $5,000
  pin     after 5 yr: raise $20,800 vs bonus $5,000
  scale   04A: $1,000 / $1,251 = 79.94% -> "about 80%"; 04C: $80 / $1,251 = 6.39% -> "about 6.4%"

all assertions passed
```

---

### Verification log

QA pass, 2026-10-07: independent fact-check, short-form edit and visual QA of the writer's draft. (This is the record of that pass; its timings and pixel positions describe the pre-polish specs. The current specs, timings and facts are in the beat sheets above, the Final fact check and the Polish pass log below.) Every number was recomputed in a separate script before the shipped math check was rewritten; the specs were re-timed and re-laid-out; the md above was brought in line with the specs.

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

**Still open (at the end of the QA pass):** re-verify the BLS figure before using either optional "for scale" line; a full MP4 render was not part of this pass (sheets and stills only). *Both closed in the polish pass below; the three engine requests above shipped in the engine upgrade and are used in the specs (`stuff` sizes, `pick` `subSize`, `compare` marks / end labels).*

### Final fact check

Polish pass, 2026-10-07. Fresh web-search budget. bls.gov, tiktok.com, buffer.com, socialinsider.io and pages.stern.nyu.edu are blocked by this environment's egress proxy, so where a page could not be opened the value was confirmed from the search engine's text of that exact page (noted in the status column). YouTube figures were pulled through the vidIQ API (YouTube Data).

| Input | Value used | Source URL | Checked on | Status |
|---|---|---|---|---|
| Median usual weekly earnings, full-time wage and salary workers, Q2 2026 (not seasonally adjusted); 04A and 04C description "for scale" lines only | $1,251 a week (→ $1,000 = 79.9% "about 80%"; $80 = 6.39% "about 6.4%") | https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (BLS release of 2026-07-21) | 2026-10-07 | **Verified** (page text via search: "$1,251 in the second quarter of 2026", 120.9 million workers). Latest release on the check date |
| Next BLS release (staleness trigger for the line above) | Q3 2026 on 2026-10-28 | https://www.bls.gov/schedule/2026/10_sched_list.htm | 2026-10-07 | **Verified** (search text). Re-check the line if posting on or after 2026-10-28 |
| 04B growth rate | 7% a year, compounded monthly, until 65, before fees, tax and inflation | none (labelled assumption on the sticky and the `7%` stamp; not presented as a forecast or a market average) | 2026-10-07 | **Assumption, labelled.** No historical-return claim is made anywhere. The primary source for context (Damodaran, NYU Stern `histretSP`) could not be opened, and secondary summaries were not used, so no "historical average" line was added |
| 04B twist rate | 6% | none (what-if on the same assumption) | 2026-10-07 | Assumption, labelled ("at 6%") |
| 04A pin inflation | 3% a year (→ $554) | none | 2026-10-07 | Assumption, labelled "assumed" in the pin |
| Dilemma terms | $1,000,000 vs $1,000 a week; $200 a month from 25 vs $400 from 35, to 65; $5,000 bonus vs +$2 an hour, 40 hrs/wk, 52 wks | none (stated hypotheticals) | 2026-10-07 | Hypothetical, no source needed |
| YouTube: a Short over 1 minute with any active Content ID claim is blocked globally (04B platform note) | as stated | https://support.google.com/youtube/answer/15424877 | 2026-10-07 | **Verified** (search text of the Help page) |
| TikTok: only videos longer than 1 minute earn Creator Rewards (04A/04C TikTok notes) | as stated | https://www.tiktok.com/legal/page/global/tiktok-creator-rewards-program-eea/en | 2026-10-07 | **Verified** (search text; qualified views are of videos longer than 1 minute) |
| Buffer: TikToks over 60 s get 43.2% more reach (04A platform note) | +43.2% reach, 1.1M videos | https://buffer.com/resources/longer-tiktoks-get-more-views-data/ | 2026-10-07 | **Verified** (search text) |
| Socialinsider: 45–60 s Reels get the highest median views (04B platform note) | 45–60 s bracket highest | https://socialinsider.io/blog/instagram-reels-length/ | 2026-10-07 | **Verified** (search text). The page now reports 6M Reels from H1 2026 (report 01 quoted an earlier ~140K-Reel version); the claim is unchanged |
| "Humphrey's caption questions earned 4–6x more comments per view" (04C IG note) | removed | `research/02-top-10-approaches.md` line 600 (the 4–6× is one video's comments per 1K views against his norm, not a caption-question effect) | 2026-10-07 | **Misattributed → removed** from the platform note |
| Evidence table: 11 YouTube Shorts (views, lengths, URLs) | research snapshot as printed | vidIQ `vidiq_get_videos_by_ids` (YouTube Data API) for all 11 IDs | 2026-10-07 | **Verified live.** All 11 URLs resolve; every length matches; views equal or slightly above the snapshot (Filomation 5,662,642 unchanged; Behind the Border 1,744,912 vs 1,740,010; Sharan 69,845,249; Planktin 9,059,354; Humphrey 8,404,026; Granny Drive 5,612,757; Techtonic 1,059,688; Zenwish 454,859; Teacherman 308,973 and 246,317; Alaric Moses Ong 51,480). Table kept as the snapshot its outlier scores were computed from |
| Evidence table: Instagram / TikTok rows (@investment_timeline, @jacobhartmanofficial, @ruinvests, @mem.efarm) | research snapshot | the URLs in the table | 2026-10-07 | Not re-checked (instagram.com / tiktok.com not reachable from here); format evidence only, not used on screen or in any description |
| Behind the Border overtake at 0:33 of 62 s | 53% | `research/watch/group4-video1.md` | 2026-10-07 | Internal watch notes; the 62 s length is confirmed by vidIQ (PT1M2S) |

Nothing on screen changed value in this pass. The only published-text changes are the re-verified BLS lines (back in both descriptions, with source and date) and the removed Humphrey statistic.

### Polish pass

Polish pass, 2026-10-07, on the upgraded engine (README re-read; `engine/src` not edited). All three specs were rebuilt from scratch, each `node src/cli.js check` returns **zero warnings**, and each was rendered to MP4 and reviewed frame by frame.

**Engine upgrade adopted (all three specs)**
- **Frame 0 is the thumbnail.** The hook sits at `t: 0` and renders finished; the postmark moved to `t: 0` in the flap (x 175, y 258, r 100, `persist`). The old `t: -0.3` postmark hack is gone. The two `pick` envelopes stay at `t: -0.6` (the README's way to have a non-hook op already settled in frame 0, so the thumbnail shows both options); no hook uses negative t.
- **Engine crossover.** 04A and 04C drop the hand-placed crossing circles (pixel boxes computed in the math check) and the hand-placed `marks` labels: `crossover: {label: "yr {x}"}` / `"wk {x}"` now finds, circles and labels the exact crossing (19.2308 → "yr 19.2"; 62.5 → "wk 62.5"). The math check ports the engine's `crossing()` and asserts both labels.
- **Legends → chart labels.** The separate "A: … / B: …" legend writes are gone. 04A and 04C label A with a `compare.marks` dot at the start ("A: $1M today", "A: $5,000 once") and B with the curve's `endLabel` at the finish ("B: +$52K a yr", "B: +$80 a wk"). 04B labels the finish with two marks ("A ≈$525K" ink, "B ≈$488K" red, placed right of the end so they can't collide) and keeps "35: $34.6K" as a mark at age 35.
- **`ease: "linear"`** on 04A and 04C (even year / week pacing, so the crossing lands exactly where the VO says it does); 04B keeps the default ease-in-out for the slow-fast-slow race. **`ticks`** on all three x axes (0/10/20/30 yrs; ages 25…65; 0 / 1 yr / 2 yrs).
- **`pick` `subSize`** 60–64 (was 46–50 px, below the phone floor) and labels 82–84 px; **`stuff` `labelSize` 62 / `amountSize` 80** (was 46/56); typed rule 48 px (was 40).
- **Text anchors** for every red-pen mark on text ("1,000 wks", "19.2 yrs", "5.2%", "forever", "$202/mo", "never", "$80 a week", "62.5 weeks", "$12,480").
- **Sealed envelopes** both open on purpose (`openAt` = the reveal), so no far-future `openAt` hacks were needed.
- **Captions:** every caption ≤ 2 lines and ≤ 4 words/s (the two 3-line captions, 04A "Earn that, and the million pays the same check forever…" and 04B "Drop it to 6%, though, and B passes A…", were split). `say` added wherever the voice reads numerals differently from the caption.
- `loop: true` kept on all three.

**Layout: bigger, one idea per screen, content zone filled**
- Working lines 64–84 px (were 56–80; the ASSUME sticky 56 → 64 px, chart labels 56 → 64–72 px, sealed-card second lines 46–60 → 64 px); hero numbers 100–124 px: "≈ 19.2 yrs" 120, card "5.2%" 124, ink "5.2%" 104, card "A by ≈ $37K" 100, "never" 120, "at 63 yrs 8 mo" 100, "62.5 weeks" 120, "$12,480" 110.
- The race chart now gets its own screen in 04A and 04C (it used to share a screen with two lines of math and squeeze both). Charts are 480–540 px tall in the y 630–1190 band instead of 330–500 px.
- Each screen holds one idea and fills y 600–1300: hook + envelopes / the math / the race / the sealed answer / the range or twist. 04A has 4 flips, 04B 5, 04C 3.
- **Loop:** on the last screen of each teaser the hook re-slaps over the same two envelopes (04A 26.65 s, 04B 44.6 s, 04C 9.65 s). The top of the closing screen is no longer empty, and the end frame already matches frame 0 before the 0.35 s crossfade.
- 04B: the 6% twist now shows the winner flipping. The returning envelopes use the `pick` reveal: B gets FIRST CLASS and A dims at 48.1 s, in place of a separate OPENED BY MISTAKE stamp (a stamp on a `fixed` pick has to be `fixed` too, or the envelope covers it; the reveal avoids that and reads more clearly).
- 04A: the guess timer and the envelope sit side by side; the card is sized (`cardSize` 100, envelope w 600) so both card lines clear the envelope lip; "same check forever + you keep $1M" writes with a `low` pen so it no longer covers line 3.
- 04C: everything stays inside the Flash lane (14.0 s), with three flips. Ops start after each flip's midpoint (the linter caught three that started 0.025 s early).

**Copy and timing changes (md synced with the specs)**
- Runtimes: 04A 30.2 → **32.0 s** (the race has its own screen); 04B 50.0 → **51.0 s**; 04C **14.0 s** (unchanged).
- 04A VO "Collect longer, and the weekly check wins." → "Collect longer than that… / …and the weekly check wins." (it now plays over the race and lands on the crossing). 04C "Stay longer, and the raise wins." → "Stay past that, and the raise wins." 04B "Drop it to 6%…" → "Drop the rate to 6%…".
- On-screen wording: 04A line 2 and 04B/04C line 3 put their answers on a hero row ("≈ 19.2 yrs", "never", "$12,480"); 04A "but $1M earns interest…" → "but $1M can earn interest…"; 04B adds "with $48K less put in" under the reveal; 04B guess label "PAUSE & GUESS" → "GUESS" (the long label overlapped the envelope beside it).
- Facts: the BLS "for scale" lines were re-verified and restored to both descriptions with source and date (04C's wording corrected to compare weekly pay with weekly pay); the unsupported Humphrey "4–6x" claim was removed. No on-screen number changed.

**Render check**
- `node src/cli.js render` → `engine/out/04-two-envelopes-{a,b,c}.mp4` (1080×1920, 30 fps: 960, 1530 and 420 frames).
- Frames pulled from the MP4s (`engine/out/stills/04-two-envelopes-{a,b,c}-<t>.png`) and viewed: 04A at 0.0, 8.8 (partial payoff), 11.6 / 12.4 (crossover + FIRST CLASS), 16.4, 19.0, 21.6 (reveal), 25.6 (twist), 28.0, 30.6, 31.8 (duration − 0.2); 04B at 0.0, 12.8, 18.5 (partial payoff), 23.9 (finish), 28.5 (guess), 32.5 (reveal), 43.4 (never), 48.9 (6% flip), 50.8; 04C at 0.0, 2.9, 4.9, 6.8 (answer), 9.2 (crossover), 11.0, 12.2 ($12,480), 13.8. Nothing cramped, overlapping or cut off; no screen sits empty for more than a beat.
- Audio (`ffmpeg -af volumedetect`): 04A mean −24.0 dB / max −2.2 dB; 04B −24.8 / −1.7; 04C −23.7 / −1.6. All inside the −30 to −18 dB mean target with peaks below −1 dB.
- Contact sheets regenerated: `engine/out/sheets/04-two-envelopes-{a,b,c}.png`. Stale pre-polish stills were deleted.
- `python3 teasers/04-two-envelopes-mathcheck.py`: all assertions pass (output above).

### Final review

Independent final review, 2026-10-07, on the upgraded engine (README re-read; `engine/src` not edited). For each teaser: a fresh 12-frame contact sheet from the spec, frames pulled from the MP4 at 0.0 s, ~40 %, ~75 % and the end (plus every fixed beat), all viewed at phone size (540 px wide); the md's math check re-run plus an independent recompute; `node src/cli.js check`; the hook scored against `research/02-top-10-approaches.md` §4. Everything found below standard was fixed in the spec (and the md and math check), then all three MP4s were re-rendered and re-checked.

**What was checked, all three**
- **Lint:** `node src/cli.js check` → zero warnings on 04A, 04B and 04C after the fixes (re-run after the last edit).
- **Frame 0:** hook rendered finished + both envelopes with their numbers (04A $1,000,000 / $1,000 a wk; 04B $200/mo / $400/mo; 04C $5,000 / +$2/hr) + postmark in the flap. The two `pick` envelopes keep `t: -0.6`: `pick` has no `instant` option, and the README's negative-t rule is the documented way to have a non-hook op settled in frame 0 (the linter's frame-0 rule counts a `pick` only when t < -0.3). No hook uses negative t; no far-future `openAt`.
- **Safe zones:** nothing readable in the flap except the postmark; nothing in the caption band while captions play (linted); everything below y 820 ends left of x 940, including the rotated stamps (corners computed: ≤ 931).
- **Math:** `python3 teasers/04-two-envelopes-mathcheck.py` → all assertions pass (output above). Independent recompute (separate code): 1,000 wks; 19.2308 yrs; 52,000/1,000,000 = 13/250 = 5.2 %; A $524,962.68, B $487,988.40, gap $36,974.28, head start $34,616.96, its interest $201.93/mo; at 6 % B first ≥ A after deposit 464 (63 yrs 8 mo); $80/wk, 62.5 wks, $4,960 / $5,040, $12,480; 79.94 % and 6.39 % for the description lines. All match.
- **Numbers agree:** every number in every on-screen string, chart mark, card, pick label and caption of the three specs was extracted by script and found in this md (0 missing); captions and VO lines read the same numbers.
- **Fact:** the one real-world figure (description "for scale" lines only) re-verified by web search on 2026-10-07: BLS median usual weekly earnings, full-time wage and salary workers, Q2 2026 = **$1,251** (120.9 million workers), https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (released 2026-07-21). Still the latest release; Q3 2026 is due 2026-10-28.
- **Advice language / policy:** none on screen, in captions, pins or descriptions; no borrowed footage, real people or brands.
- **Audio:** 04A mean −24.0 dB / peak −1.6 dB; 04B −24.8 / −1.5; 04C −23.7 / −1.6.

**04A ($1,000,000 now or $1,000 a week for life?): fixed · hook 8/10**

| Found (as a viewer) | Fix |
|---|---|
| Race screen: the red line was unlabelled until its end label appeared at 12.2 s, 0.4 s before the flip started (≈ 0.5 s on screen for "B: +$52K a yr", under the 0.25 s/word reading floor) | Label moved onto the line as a `marks` entry at year 6 (appears 10.1 s, held 2.5 s); `endLabel: false`. FIRST CLASS re-placed (770, 1030, 44 px, −3°) so it clears both "yr 19.2" and the B label |
| Reveal screen: the red circle on "5.2%" covered the "=" of "$52,000 ÷ $1,000,000 =" | Line 3 76 → 72 px, red "5.2%" x 738 → 730: the circle now sits clear of the "=" and inside the rail |
| The partial-payoff hero "≈ 19.2 yrs" was fully inked for only ~0.7 s before the flip | Hero starts 7.5 s at 18 cps (inked by 8.06), circle at 8.1: held ~0.9 s, plus the squash |
| Closing screen: the circle on "forever" cut through the "s" of "lasts" | Two spaces before "forever" and target `pad` 2 (the math check now normalises whitespace) |
| The moving pen covered the captions while the lowest lines were written (22–24 s, 27–30 s) | Every write whose pen reached the caption band uses `pen: "small-low"` (6 writes); it now grazes the top of the caption band for a moment at most |

Hook: 8/10, unchanged. The tape and both envelopes put the exact pair behind Filomation's 5.66M views (388x on 1.75K subs) in frame 0, word for word as the title and first VO line. It stops short of 9 because the pair is not fresh (the research's "fresh pairs win" counter-evidence) and there is no stake line on the tape.

**04B ($200 a month from 25 or $400 a month from 35?): fixed · hook 8/10**

| Found (as a viewer) | Fix |
|---|---|
| Race, 13.9–16.5 s: with the slow ease-in the pen does not visibly leave age 25 for ~2 s (A's early line also hugs the axis), so the screen showed bare axes under "Age 25: A starts." | Added the research's race device: a big **"age 25 → 65" counter** (`counter` with `steps`) in the empty upper-left of the chart, ticking in step with the pen: yearly 25 → 35 (accelerating), every 5 years through the fast middle, then 61, 62, 63, 64 … 65 for the photo finish. "age 35" lands with the "35: $34.6K" dot (17.87 s) and "age 65" with the finish marks (23.3 s). The math check asserts every step is within 0.005 s of the pen reaching that age. In the fast middle the counter shows the last 5-year milestone passed |
| The pen covered the captions during "with $48K less put in", "never", "at 6%: B passes A", "at 63 yrs 8 mo", "B puts in $48,000 more" | `pen: "small-low"` on those 5 writes |

Checked and kept: the stuffed-envelope beat, the ASSUME sticky + `7%` stamp, the sealed answer (card "A by ≈ $37K / $525K vs $488K" clears the envelope lip), the 3-line why with "never" circled inside the rail, and the 6 % flip (B stamped FIRST CLASS, A dimmed), all legible at 540 px. The 40 % frame (20.4 s) is the fast middle of the race and the 75 % frame (38.2 s) is line 2 being written. Hook: 8/10. It is the research formula "Same $X a month. One starts at 25, one at 35. Who wins?" with the doubled deposit as the fresh twist, on the corpus's biggest premise (Finance With Sharan, 69.8M). Three strips of 72 px marker are dense for a thumbnail but read cleanly.

**04C ($5,000 to sign or $2 more an hour?): fixed · hook 7/10**

| Found (as a viewer) | Fix |
|---|---|
| Race: "B: +$80 a wk" appeared at the finish (9.1 s), 0.3 s before the flip (unreadable), so the red line was unlabelled for the whole race | Label moved onto the line as a `marks` entry at week 20 (58 px, appears 7.9 s, held 1.5 s); `endLabel: false`. FIRST CLASS re-placed (770, 1065, 44 px, −4°): ≥ 37 px clear of "wk 62.5" and the B label |
| The pen covered "Leave sooner? The five grand." while line 3 was written, and the caption under "$12,480" | `pen: "small-low"` on the 3 lowest writes |

Hook: 7/10, one below the producer's 8. "$5,000 TO SIGN / OR $2 MORE AN HOUR? / PICK IN ONE SECOND." is clear, personal and fresh (it is on the research's own "write fresh dilemmas" list), and it uses the "$[lump] or $[small] per [unit]?" formula with an explicit 1-second commitment. But it has none of the absurd scale that drives the formula's breakouts ($200M vs $20/s, $1M vs $5 a push-up), so it should win on saves and sends more than on raw stop-rate. The hook was not changed: an ego line such as "most people pick wrong" would be an unsourced claim.

**Left as is (noted, not defects)**
- Chart tick labels (0/10/20/30 yrs, ages 25…65, 0/1 yr/2 yrs) are drawn at the engine's fixed 40 px; they are secondary to the marks and read fine at 540 px. The linter does not cover them, and they cannot be resized without editing `engine/src`.
- The 0.35 s loop crossfade ghosts the end screen's pick sub-labels over frame 0's in 04C ("leave < 62.5 wks?" over "signing bonus"). That is how the engine's `loop` works.
- The 04A 40 % frame (12.8 s) lands mid-flip, so frames at 12.4 s and 13.2 s were checked on either side.

**Files.** Specs: `engine/specs/04-two-envelopes-{a,b,c}.json` · MP4s re-rendered: `engine/out/04-two-envelopes-{a,b,c}.mp4` (960 / 1530 / 420 frames, 1080×1920, 30 fps) · sheets regenerated: `engine/out/sheets/04-two-envelopes-{a,b,c}.png` · stills from the final MP4s (stale ones deleted): `engine/out/stills/04-two-envelopes-a-{0.0,8.9,10.6,12.4,12.8,21.6,24.0,24.5,28.0,31.0,31.9}.png`, `…-b-{0.0,14.5,17.95,20.4,23.9,32.0,33.8,38.2,43.9,48.9,50.9}.png`, `…-c-{0.0,2.9,5.6,6.8,8.1,9.3,10.5,11.5,12.3,13.9}.png` · math check updated: `teasers/04-two-envelopes-mathcheck.py` (B labels as marks, the age-counter sync, whitespace-normalised on-screen strings).

**Verdicts:** 04A **fixed** (hook 8) · 04B **fixed** (hook 8) · 04C **fixed** (hook 7). All three are ready to publish once the description BLS line is re-checked, if posting on or after 2026-10-28.
