## 2. The Rate Clock

**Series:** *Envelope Math: Clocked* · **Lead writer/motion:** approach #2 of 10 · **As of:** 2026-10-07
**Specs:** `engine/specs/02-rate-clock-a.json`, `-b.json`, `-c.json` · **Renders:** `engine/out/02-rate-clock-a.mp4`, `-b.mp4`, `-c.mp4` · **Contact sheets:** `engine/out/sheets/02-rate-clock-a.png`, `-b.png`, `-c.png` · **Review stills:** `engine/out/stills/02-rate-clock-*.png`
**Math check:** `teasers/02-rate-clock-mathcheck.py` (output at the end of this file)

The mechanic in one line: take a number too big to feel, divide it by a rate a human can feel, and land on a time you *can* feel: seconds, a heartbeat, a date in history.

---

### Why it goes viral

**The mechanism.**

1. **The conversion is the hook, not the number.** "$1 billion" is wallpaper. "$1 billion = 32 years of your life" is a gut punch. The same topic framed abstractly flops: Fahad Riaz's "How much is a billion dollars?" scored 3.62x on a 1.52M-sub channel, and "The national debt is hard to comprehend" scored 1.35x (`raw/yt-big-number-math.md` P1). `raw/yt-big-number-math.md` P1 calls time/distance conversion "the dominant winner" of the big-number cluster.
2. **Two payoffs.** A concrete one early (Story Snap's distance at about 6 s) and an emotional one at the end (the years of your life). Viewers stay for the second and rewatch for the first.
3. **One division the viewer can check in their head.** That makes it a Fermi estimate in its purest form, and it invites "let me check that" behaviour: sog_geovanie's "this guy must be lying" arc held 65 s of uncut calculator footage.
4. **Famous mega-subjects bring their own search demand and polarisation.** "elon becomes trillionaire" was a live TikTok search suggestion on the sog_geovanie video (`watch/group1-video4.md`).
5. **It loops.** The 14–17 s versions end on a line that sends you back to the premise.

**The evidence** (all figures copied from `research/02-top-10-approaches.md` and the raw files; "watched" = scene-by-scene breakdown exists):

| Creator (size) | Title | Views | Outlier | Length | Evidence | URL |
|---|---|---|---|---|---|---|
| Mark Tilbury (~8.9M) | Spending $100 BILLION in 40 Seconds | 40,927,810 | 11.91x (his top breakout) | 49 s | inferred | https://www.youtube.com/shorts/zWWzd4TWIV8 |
| Mark Tilbury | How Long Does It Take For These Companies To Make $1 Million? | 22,963,921 | 4.24x | 26 s | inferred | https://www.youtube.com/shorts/EqB0MNwSfXs |
| Mark Tilbury | Making $1 Every Second ($1M to $1 Trillion) | 15,347,851 | 4.82x (4.16% like rate) | 17 s | inferred | https://www.youtube.com/shorts/-pqKQqr25VM |
| Story Snap (53.7K) | How long would it actually take to pick up a BILLION dollars 💵🤑 | 9,405,491 | 150.55x | 14 s | transcript | https://www.youtube.com/shorts/hbXfAY8PrjE |
| Dr Bandana (25.2K) | How Long Would It Take to Spend $1 Billion? ⏳💰 | 4,583,002 | 98.03x | 63 s | transcript | https://www.youtube.com/shorts/zHHIUJSzrhA |
| @sog_geovanie (TikTok, 1.3K) | Congratulations Elon Musk!!! You worked SOOOOO hard for that $1,000,000,000,000.00 | 2.4M | 1,005.7x | 107 s | **watched** | https://www.tiktok.com/@sog_geovanie/video/7667278089755299085 |
| The Iced Coffee Hour | America Spends $222,000+ Per Second… | 810,279 | 22.3x | 24 s | inferred | https://www.youtube.com/shorts/2JLqHH6_mjA |
| World Of Niya (8.8K) | How Long Would It Take to Spend $1 Trillion? ⌛💰 | 378,860 | 157.2x (8.8% engagement) | 95 s | inferred | https://www.youtube.com/shorts/Thu46g100X4 |
| Raw Reset (566) | $1 Per Second… How Long Until You're a Billionaire? | 21,650 | 43.6x | 61 s | inferred | https://www.youtube.com/shorts/qas7-Yfwt0Q |

Inside Tilbury's own catalogue, his rate and scale Shorts carry his highest breakouts (11.91x), above his skits (4.69–6.71x) and advice Shorts (1–3x) (`raw/web-creator-case-studies.md` §2.1). The two small-channel entries above (Story Snap at 150x, sog_geovanie at 1,006x) show the format works with no audience behind it.

**Counter-evidence we design around:** literal per-second videos did not surface as IG/TikTok outliers in the 90–120-day index (`raw/ig-tiktok-outliers.md` §2.9), so Reels/TikTok are an experiment, not a proven lane. Celebrity repeats decay fast (Behind the Border: 535x → 29.8x → 5.2x), so we rotate subjects. And abstract framing underperforms ("How much is a billion dollars?" 3.62x from a 1.52M-sub creator; "US National Debt SURPASSES $38 Trillion" 10.91x on 259K subs, `raw/yt-big-number-math.md`), so every teaser leads with the conversion.

---

### How the originals do it

**1. Story Snap, "How long would it actually take to pick up a BILLION dollars" (9.4M, 150.55x, 14 s).**
Script, in full: *"If you picked up $1 every second while walking, to reach $1 billion, you'd have to walk around the earth 15 times. And when you finally pick up the last bill, 32 years of your life are gone."*
- **Nails:** two sentences, two payoffs (distance at ~6 s, "32 years of your life" at the end), a hard end that loops. One number, two human units.
- **Misses:** the math is never shown; it's VO over walking B-roll. The distance claim is unchecked (our check: 15 laps ≈ 601,000 km over 10⁹ s implies ~0.6 m/s, plausible but never stated). Nothing to save or screenshot.

**2. @sog_geovanie, "Congratulations Elon Musk!!!…" (2.4M, 1,005.7x, 107 s, watched).**
0–34 s is someone else's clip making the claim ("$50,000 an hour since the birth of Jesus, still not $1 trillion"); 34–99 s is a live phone calculator (2,059 → 1.2M → 438M), each intermediate a mini-reveal; the payoff ($901.8B, still short) lands in the last 8 s.
- **Nails:** the debunk arc ("this guy must be lying"), timeliness (the trillionaire search), and a payoff that confirms the unbelievable.
- **Misses:** 34 s of a reposted clip (reuse risk); four multiplications where one division does the job; no captions during the calculator section; no loop. And a calendar error: he adds 33 years because "AD = After Death". AD counts from the birth, so it is about 2,025 years, not 2,059. That error generated the correction comments. The punchline survives the fix ($888B, still short), which is the opening we use.

**3. Dr Bandana, "How Long Would It Take to Spend $1 Billion?" (4.58M, 98.03x, 63 s) and Tilbury's "Spending $100 BILLION in 40 Seconds" (40.9M, 11.91x).**
Dr Bandana puts the stakes in sentence one ("spend $1 billion in 24 hours or go to prison"), then runs an hour-stamped countdown (Hour 1, 3, 9, 16, 23, Midnight) and ends on "If this was you, how would you spend it?"
- **Nails:** stakes up front, a clock you can hear ticking, and a comment prompt that asks for the viewer's own answer.
- **Misses:** it never states the rate the premise demands: $41.7M an hour, about $11.6K a second. The most interesting number in the video is the one it leaves out.

---

### The Envelope Math upgrade

**What we replicate.** The two-payoff structure (a partial answer by ~40%, the hero verdict in the last 2 seconds, ~90%). One division per idea. A famous noun or a famous dare in frame 1. Short runtimes (17–25 s) that end where the hook begins.

**What we improve.**
- **Show the divisor.** None of the originals shows where the "seconds in a year" or "hours in a year" come from. We write it as a pencil footnote under the line: *8,766 = 365¼ days × 24 hrs*, *31.5M = seconds in a year*, *86,400 = seconds in a day*. The math police have nothing to correct.
- **Get the calendar right, out loud.** 365¼-day years. The trillion dare counts from Year 1 properly (2,025 years, $888B) and back-dates the start with the Julian calendar (no year zero): around 9 March 256 BC. The pinned comment says so.
- **Label every assumption** on an ASSUME sticky (24/7, no days off; median pay × 52; 100,000 heartbeats a day). Sources go in the description with dates.
- **Make the clock felt, not just stated.** Each teaser has one "feel it" device: a to-scale timeline that a red arrow sweeps back past Year 1 (A), a counter that runs Apple's sales in *real time* to your salary (B), and a real 24-hour countdown ticking on the hook, then a heart beating at a true 70 bpm with a running "$10K spent" total that jumps on every beat (C).
- **Original everything.** No reposted clips, no logos (Apple is a name and a public number; the visual is a stopwatch), no footage.

**The uniquely-ours twist: the CLOCKED stamp.** A postmark is the post office's time stamp. In this series, the answer gets *clocked*: a red rubber stamp slams onto the envelope with the clock's answer ("CLOCKED IN / 256 BC", "CLOCKED / 3.3 MINUTES", "CLOCKED / $10K A HEARTBEAT"), on the pen-scratch-then-thump sonic logo. The rate itself rides on a **postage stamp** ("$50K PER HOUR", "$416B APPLE SALES FY25", "$1B IN 24 HOURS"): the rate is literally the postage. Proposed addition to the bible's stamp lexicon: **CLOCKED** = "the time it takes" (variant **CLOCKED IN** = "when the clock had to start"), used only by this series.

**Recurring series:** ***Envelope Math: Clocked*** (No. 1, 2, 3…).
**Title templates** (title = frame-1 text = first spoken line):
- Dare: `[Rate] Since [Moment], Still No [Mega-number] (Clocked No. N)`
- Guess: `[Famous Noun] Makes Your [$Number] in How Many Seconds? (Clocked No. N)` (on tape: `… IN ?? SECONDS`)
- Spend: `Spend [Mega-number] in [Time]: How Much per [Human Unit]? (Clocked No. N)`

**The ritual (same every episode, new variable every time):**
1. Masking-tape hook with a number, finished in frame 0 (a `hook` at `t: 0` renders complete, so frame 0 is the thumbnail), over one big prop that fills the content zone (🕰️, ⏱️, 💸 + a ticking 24:00:00).
2. Flip. The rate on a postage stamp, the assumptions on an ASSUME sticky.
3. ≤3 ballpoint lines of division, with a pencil footnote for the divisor.
4. Red-pen circle on the first answer by ~40%.
5. The "feel it" device (timeline / real-time counter / heartbeat).
6. CLOCKED stamp in the last 2 seconds (~90% of the runtime; bible rule 5). Loop line or comment question; the last 0.35 s crossfades into frame 0 (`"loop": true`).
7. Pinned comment: exact figure, "envelope said ≈X, within Y%".

**Bible devices used:** the Envelope (kraft), Ballpoint working (`lines`, `write`), Red pen (`annotate` circle/box/arrow/underline), Verdict stamp (`stamp`, CLOCKED), Postmark No. (`postmark`), Postage stamp (`postage`), ASSUME sticky (`sticky`), Masking-tape hook (`hook`), Flip (`flip`). Plus the bible's #2 lead devices: `lines` (rate ÷), `counter`, `ladder` of human times. A also uses a 3-second `timer` as its 35–40% pattern break. C uses a `counter` with `time: "hms"` (a real 24:00:00 countdown), a `counter` with `steps` (the running "$10K spent" total) and one `emoji` with `pulse` (the heart).

---

### Teasers

> All real-world inputs were re-checked live with WebSearch on 2026-10-07 in the finishing pass (see **Final fact check** at the end; it supersedes the QA note below). The egress proxy still blocks direct fetches of sec.gov, bls.gov and billionaires.africa, so those figures are confirmed from search-result text that quotes the primary page, and each row names the primary source. Re-open each source once before publishing.
> **QA note (2026-10-07, superseded):** the QA pass could not re-run WebSearch and cross-checked inside the repo instead. The finishing pass re-ran every search: all figures held, the Musk "now" figures were re-sourced, and Apple's Q3 FY2026 figure was confirmed and reinstated as context.

---

#### 02A · "$50,000 an Hour Since Year 1, Still No $1 Trillion" (Clocked No. 1)

- **Working title:** $50,000 an Hour Since Year 1, Still No $1 Trillion (Clocked No. 1)
- **Topic:** billionaire wealth (net worth vs. an hourly rate)
- **Lane / runtime:** **24.5 s**, loops (`"loop": true`), between the bible's Flash (6–14 s) and Envelope (25–45 s) lanes, at the approach's build length (~20 s plus a 3-second guess timer as the pattern break)
- **Spec:** `engine/specs/02-rate-clock-a.json` · **Render:** `engine/out/02-rate-clock-a.mp4` · **Sheet:** `engine/out/sheets/02-rate-clock-a.png`

**Frame-1 hook**
- On screen (masking tape at 74 px, finished at frame 0, which is the thumbnail): **EARN $50,000 AN HOUR / SINCE YEAR 1… / STILL NO *$1 TRILLION*** over a big mantel clock 🕰️. From 0.05 s, "$1,000,000,000,000" is inked under the clock at 110 px and double-underlined in red.
- First spoken line (0.0–2.0 s): *"Fifty grand an hour, since Year One."*

**Beat sheet** (one idea per screen; screens are separated by flips)

| Time | Picture | VO |
|---|---|---|
| 0.0–2.0 | **Screen 1, the dare.** Tape hook + 🕰️ already up (thumbnail frame); "$1,000,000,000,000" inked at 110 px (0.05–0.65); red double underline anchored to it (0.75) | "Fifty grand an hour, since Year One." |
| 2.0–4.8 | Red pen note, 64 px: "Musk crossed it in June (on paper)" (2.1–3.2) | "Still no trillion. Musk crossed it in June, on paper." |
| 4.8 | **Flip** | |
| 5.0–7.6 | **Screen 2, the division.** ASSUME sticky (5.05); postage stamp **$50K PER HOUR** (5.2); line 1 at 82 px: `$1T ÷ $50K/hr = 20M hrs` (5.5–7.0); pencil footnote "(8,766 = 365¼ days × 24 hrs)" at 64 px near the foot of the screen (7.05–7.7, held to 11.05, clear of the small pen) | "A trillion over fifty grand: twenty million hours." |
| 7.6–11.1 | Line 2: `÷ 8,766 hrs/yr ≈ 2,282 yrs`, answer in red (7.7–9.4); **red circle anchored on "2,282 yrs" at 9.45 s (39%) = payoff 1** | "Divide by hours in a year: about twenty-two eighty-two years." |
| 11.1–14.0 | Pattern break: 3-2-1 **GUESS THE YEAR** timer (45%) under the circled answer | "So what year did you have to start? Guess." |
| 14.0 | **Flip** | |
| 14.0–17.0 | **Screen 3, the ladder.** A timeline drawn to scale (256 BC at the left edge, Year 1 tick, 2026 tick; 14.25–14.7), typed headers "start in… / you'd have today"; rung 1: **Year 1 ···· $888B ✗** (14.9–15.8) | "Start in Year One: 888 billion. Short." |
| 17.0–20.1 | Rung 2: **Caesar's birth ···· $931B ✗** (17.6–19.1, per-row timing) | "Julius Caesar's birth? 931 billion. Still short." |
| 20.1–22.5 | Red arrow sweeps from 2026 back past Year 1 (20.1–20.8); **"≈ 256 BC" in red at 100 px** at its tip (20.6); rung 3 in red: **≈ 256 BC ···· $1T ✓** (20.9–21.8), red box anchored on "≈ 256 BC" at 21.9 | "You'd clock in around two fifty-six BC." |
| 22.5–24.5 | **CLOCKED IN / 256 BC** stamp slams at 22.6 s (92%, 1.9 s before the end); hold; the last 0.35 s crossfades into frame 0 (loop) | "Drop your hourly rate. I'll clock yours." |

**Full voice-over** (76 spoken words, ≤3.5 words/s in every caption window)
> Fifty grand an hour, since Year One. Still no trillion. Musk crossed it in June, on paper.
> A trillion over fifty grand: twenty million hours. Divide by hours in a year: about twenty-two eighty-two years.
> So what year did you have to start? Guess.
> Start in Year One: eight hundred eighty-eight billion. Short. Julius Caesar's birth? Nine hundred thirty-one billion. Still short.
> You'd clock in around two fifty-six BC.
> Drop your hourly rate. I'll clock yours.

**The envelope math** (2 lines + the ladder's last rung)
1. `$1T ÷ $50K/hr = 20M hrs` (exact: 20,000,000)
2. `÷ 8,766 hrs/yr ≈ 2,282 yrs` (exact: 2,281.54; 8,766 = 365.25 × 24)
3. Ladder rung: `≈ 256 BC ···· $1T ✓` (exact start: about 9 March 256 BC, Julian calendar). Rungs above it: Year 1 → $887.9B; 12 July 100 BC → $931.5B.

**ASSUME sticky:** "$50K every hour, 24/7, no days off. 365¼-day years." (No raises, interest or taxes; said in the pinned comment.)

**Sources**
| Input | Value | Source (date) |
|---|---|---|
| Musk crossed $1T on paper | Fri 12 Jun 2026, SpaceX's Nasdaq debut (opened at $150 vs a $135 IPO price): Forbes $1.1T; Bloomberg $1.11T | AP via The Gazette, 2026-06-12, https://gazette.com/2026/06/12/spacex-soars-25-in-wall-street-debut-and-makes-elon-musk-the-first-trillionaire/ ; Nairametrics (Forbes figure), 2026-06-13, https://nairametrics.com/2026/06/13/elon-musk-becomes-worlds-first-trillionaire-as-spacex-shares-surge-on-nasdaq-debut/ ; Washington Examiner (Bloomberg figure), https://www.washingtonexaminer.com/policy/technology/4606254/spacex-ipo-elon-musk-trillionaire/ (all re-checked 2026-10-07) |
| Musk now (pinned comment only; context for "on paper") | Bloomberg Billionaires Index **$1.04T** on Mon 5 Oct 2026 (+$65B that day; trillionaire again for the first time since June); Forbes real-time **$936B** (early Oct 2026) | Quartz, 2026-10-05, https://qz.com/elon-musk-trillionaire-spacex-stock-surge-100526 ; Billionaires.Africa, 2026-10-06, https://www.billionaires.africa/2026/10/06/elon-musk-becomes-a-trillionaire-again-as-spacex-shares-hit-highest-since-june/ ; Forbes real-time ranking via Derecha Diario, Oct 2026, https://derechadiario.com.ar/negocios-finanzas/ranking-forbes-quienes-10-personas-ricas-mundo-en-octubre-2026 (re-checked 2026-10-07) |
| Julius Caesar's birth | 12 or 13 July 100 BC (the traditional year; Britannica calls it "perhaps most probable") | World History Encyclopedia, https://www.worldhistory.org/timeline/Julius_Caesar/ ; Wikipedia, https://en.wikipedia.org/wiki/Julius_Caesar ; Britannica, https://www.britannica.com/biography/Julius-Caesar-Roman-ruler (re-checked 2026-10-07) |
| $50,000 an hour | Hypothetical: the rate in the viral claim | `research/watch/group1-video4.md` |

**Ending**
- **Loop / re-hook:** the last frame is the full envelope with "$1T ✓" and the CLOCKED IN stamp; the cut back to frame 1 ("EARN $50,000 AN HOUR…", already on screen at frame 0) reads as "again?".
- **Comment bait:** "Drop your hourly rate. I'll clock yours." (a genuine request that feeds future episodes; no vote-bait)
- **Pinned comment:**
  > Exact: $1T ÷ $50K/hr = 20,000,000 hours ÷ 8,766 hrs/yr (365.25 days × 24) = 2,281.5 years (envelope said ≈2,282, within 0.02%). Counting back from Oct 7, 2026 lands on about March 9, 256 BC (Julian calendar, and yes, we skipped year zero because there isn't one). Start Jan 1, AD 1 → $887.9B today. Start July 12, 100 BC, Caesar's birthday → $931.5B. Assumptions: $50K every hour, 24/7, no raises, no interest, no taxes. Musk's trillion is on paper: he first crossed $1T on Jun 12, 2026 (SpaceX IPO); on Oct 5, 2026 Bloomberg had him back at $1.04T, while Forbes' real-time list showed $936B in early October. Want yours? Comment your hourly rate.

**Description**
> $50,000 an hour, every hour since Year 1, and you'd still be $112 billion short of a trillion. One envelope, two lines, one timeline. Sources: Forbes and Bloomberg via AP / Nairametrics (Jun 12–13 2026); Bloomberg Billionaires Index via Quartz (Oct 5 2026); Forbes real-time list (Oct 2026); World History Encyclopedia (Caesar, 100 BC). Exact math in the pinned comment.
> Educational math, not financial advice.
> #EnvelopeMath #Clocked #MoneyMath #Trillionaire #ElonMusk

**Platform notes**
- **YouTube Shorts (master, 24.5 s):** title = hook. Post while "trillionaire" still searches (the "trillionaire again" coverage ran Oct 5–6, 2026). Pin the comment immediately. No end card; the envelope frame loops.
- **Instagram Reels (~35 s cut):** Rate Clock is unproven on Reels, so post as a **Trial Reel** first. Add one beat: the per-day figure ("$1.2M a day, every day") before the guess. Caption: "Send this to the friend who says a billion is 'basically a million'." ≤5 hashtags.
- **TikTok (~65 s fact-check cut, for the >60 s reach lift and Creator Rewards):** open on the claim in our own words (never the original clip): "A viral video says $50K an hour since Jesus was born still isn't a trillion. He added 33 years because 'AD means After Death'. It doesn't." Show his 2,059 → $901.8B in pencil, red-pen strike the 33, redo it as 2,025 years → $888B, then run the ladder. That turns the correction comments into credibility.

**Slate note:** 01A (Cost in Envelopes) also uses Musk's $1 trillion. Different mechanic, same famous number, and the research shows celebrity repeats decay (535x → 29.8x → 5.2x). If both ship, post them at least a week apart, or run 02A's no-name variant: beat 2 VO "Still no trillion. That's a one and twelve zeros." with the red note "a 1 and 12 zeros", and Musk moves to the pinned comment only. Everything else, including the timing, is unchanged.

**Why this one should travel**
It is the most-watched breakout in the cluster rebuilt properly: sog_geovanie's dare (1,005.7x from 1.3K followers) with the error fixed, the reposted clip removed, and four calculator steps replaced by one division. It keeps Story Snap's two-payoff shape (2,282 years at 39%, the 256 BC stamp in the last 2 seconds), rides a famous name and a live search, and the ladder ("Year 1? short. Caesar? still short.") is a mini guess-the-price at every rung, the mechanic behind Monarch's 603x.

---

#### 02B · "Apple Makes Your $65K Salary in How Many Seconds?" (Clocked No. 2)

- **Working title:** Apple Makes Your $65K Salary in How Many Seconds? (Clocked No. 2)
- **Topic:** corporate revenue vs. your pay
- **Lane / runtime:** **19.8 s**, loops, between the Flash and Envelope lanes (a 4.93-second real-time count is built in; Tilbury's company-clock Short runs 26 s)
- **Spec:** `engine/specs/02-rate-clock-b.json` · **Render:** `engine/out/02-rate-clock-b.mp4` · **Sheet:** `engine/out/sheets/02-rate-clock-b.png`

**Frame-1 hook**
- On screen (masking tape at 84 px, finished at frame 0): **APPLE MAKES YOUR / *$65K* SALARY IN / *?? SECONDS*** over a big ⏱️ (330 px); a red 200 px "?" is written beside it at 0.3 s. The blank asks for a guess; the word SECONDS is the shock.
- First spoken line (0.0–2.5 s): *"Apple makes your salary in how many seconds?"*

**Beat sheet**

| Time | Picture | VO |
|---|---|---|
| 0.0–2.5 | **Screen 1.** Tape hook + ⏱️ (thumbnail frame); red "?" (0.3) | "Apple makes your salary in how many seconds?" |
| 2.5 | **Flip** | |
| 2.5–4.9 | **Screen 2.** ASSUME sticky (typical full-time pay $1,251/wk × 52 ≈ $65K); postage **$416B APPLE SALES FY25**; line 1 at 78 px: `$416B ÷ 31.5M s ≈ $13.2K/s` (3.0–4.6); pencil footnote "(31.5M = seconds in a year)" at 64 px (4.66–5.3) | "Apple brings in about thirteen grand a second." |
| 4.9–7.5 | Line 2: `$65K ÷ $13.2K/s ≈ 4.9 sec`, answer in red (5.35–6.9); **red circle anchored on "4.9 sec" at 6.95 s (35%) = payoff 1** | "Your sixty-five grand? About four point nine seconds." |
| 7.5 | **Flip** (pattern break, 38%) | |
| 7.5–13.2 | **Screen 3, real time.** ⏱️ pulsing once a second; "Apple's sales, in real time:"; green counter **$0 → $65,052** (190 px) and red **0.0 → 4.9 sec** (120 px), both linear over the true 4.93 s (8.2–13.13) | "Watch. Real time." (then 4.4 s of ticking foley, no VO) |
| 13.2–14.9 | Red pen: "= a year of your work" (13.2–13.9) | "Done. That's your whole year." |
| 14.9 | **Flip** | |
| 14.9–17.8 | **Screen 4, the career.** 💼; `4.9 sec × 40 yrs` at 96 px (15.15–15.95); **hero `≈ 3.3 min` in red at 150 px** (16.0–16.65), circled (16.7); P.S. sticky "that's sales, not profit. Profit: pinned 📌" (16.95–18.1) | "Your whole forty-year career? About three point three minutes." |
| 17.8–19.8 | **CLOCKED / 3.3 MINUTES** stamp slams at 17.9 s (90%, 1.9 s before the end); the last 0.35 s crossfades into frame 0 | "That's sales, not profit. Profit's pinned." |

**Full voice-over** (47 spoken words, ≤3.5 words/s in every caption window)
> Apple makes your salary in how many seconds?
> Apple brings in about thirteen grand a second.
> Your sixty-five grand? About four point nine seconds.
> Watch. Real time. *(4.4 s of ticks)* Done. That's your whole year.
> Your whole forty-year career? About three point three minutes.
> That's sales, not profit. Profit's pinned.

**The envelope math** (3 lines)
1. `$416B ÷ 31.5M s ≈ $13.2K/s` (exact: $13,196/s over a 365-day year; $13,233/s over Apple's actual 364-day FY2025)
2. `$65K ÷ $13.2K/s ≈ 4.9 sec` (exact: 4.93 s; 4.92 s on the 364-day year)
3. `4.9 sec × 40 yrs` / `≈ 3.3 min` (one line written as two rows, the answer as the 150 px hero; exact: $2,602,080 career → 197 s = 3.29 min; 3.28 min on the 364-day year)

**ASSUME sticky:** "typical full-time pay $1,251/wk × 52 ≈ $65K". Second sticky (P.S.): sales, not profit.

**Sources**
| Input | Value | Source (date) |
|---|---|---|
| Apple FY2025 net sales | $416,161M ("$416 billion") | Apple Newsroom, "Apple reports fourth quarter results", 2025-10-30, https://www.apple.com/newsroom/2025/10/apple-reports-fourth-quarter-results/ ; Form 10-K for FY ended 2025-09-27, https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm |
| Apple FY2025 net income (pinned comment) | $112,010M | Same Form 10-K |
| FY2025 length | 52 weeks (ended last Saturday of Sept, 2025-09-27) | Same Form 10-K |
| Apple Q3 FY2026 (pinned comment only, context) | Revenue $109.4B, +16% YoY, quarter ended 2026-06-27 (reported 2026-07-30). **Reinstated:** confirmed by live search in the finishing pass | Apple Newsroom, 2026-07-30, https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/ ; Form 8-K exhibit 99.1, https://www.sec.gov/Archives/edgar/data/0000320193/000032019326000018/a8-kex991q3202606272026.htm ; MacRumors, 2026-07-30, https://macrumors.com/2026/07/30/apple-3q-2026-earnings (re-checked 2026-10-07) |
| Typical full-time pay | Median usual weekly earnings, 120.9M full-time wage and salary workers, Q2 2026 (not seasonally adjusted): $1,251 | BLS, Usual Weekly Earnings release, 2026-07-21, https://www.bls.gov/news.release/archives/wkyeng_07212026.htm (re-checked 2026-10-07; the Q3 2026 release is scheduled for 2026-10-28 per the BLS October schedule, https://www.bls.gov/schedule/2026/10_sched_list.htm) |

FY2025 is still the latest *full* fiscal year on 2026-10-07: Apple has not yet announced the date of its Q4 FY2026 report (it has reported in late October in past years; The Mac Observer, https://www.macobserver.com/news/apple-q4-fy2026-earnings-date-not-announced/). BLS Q2 2026 is still the latest wage figure (Q3 is due 2026-10-28). If either lands before publishing, swap the stamp/sticky values and rerun the script.

**Ending**
- **Loop / re-hook:** the stamp frame cuts back to "APPLE MAKES YOUR $65K SALARY IN ?? SECONDS": the blank replays with the answer now known (4.9), which is when people rewatch the real-time count.
- **Comment bait:** "Profit's pinned" (pulls viewers into the comments) and the pinned comment asks "Which company should I clock next?"
- **Pinned comment:**
  > Exact: Apple FY2025 net sales $416.161B over its 52-week (364-day) fiscal year = $13,233/sec. Typical full-time pay (BLS, Q2 2026) $1,251/wk × 52 = $65,052 → 4.92 seconds (envelope said ≈4.9, within 0.3%). A 40-year career, $2.60M → 3.28 minutes (envelope said ≈3.3, within 0.7%). PROFIT: net income $112.01B = $3,562/sec → your year in 18.3 seconds, your career in 12.2 minutes. FY2026 isn't out yet (Apple's June quarter alone was $109.4B, up 16% YoY); we'll re-clock it when it is. Sources: Apple Form 10-K FY2025 + Apple Newsroom (Oct 30 2025, Jul 30 2026); BLS Usual Weekly Earnings (Jul 21 2026). Which company should I clock next?

**Description**
> Apple brings in about $13,200 in sales every second. The typical full-time paycheck is about $65K a year. Here's that in real time. Sources: Apple Form 10-K FY2025 / Apple Newsroom (Oct 30 2025); BLS Usual Weekly Earnings, Q2 2026 (Jul 21 2026). Sales, not profit; profit is in the pinned comment.
> Educational math, not financial advice.
> #EnvelopeMath #Clocked #Apple #Salary #MoneyMath

**Platform notes**
- **YouTube Shorts (master, 19.8 s):** title = hook. The real-time count is the retention spike; keep the 4.4 s of ticking with no VO.
- **Instagram Reels (~35 s cut):** Trial Reel first. Add the profit beat on screen (a red-pen line: "in profit: 18 seconds") before the stamp. Caption: "Send this to your coworker on their lunch break." Sends are IG's top non-follower signal.
- **TikTok (~60 s cut):** run the same clock for the profit line, and add "per minute" ($791,783) and "per day" ($1.14B). A multi-company version (Tilbury's companies-to-$1M format) needs each company's figure sourced first; do not ad-lib. No branded content (TikTok bans it for financial products; none here).

**Why this one should travel**
It's Tilbury's company-clock template (22.96M) with the two things it lacks: the viewer's own number (the BLS median, so most viewers are "in" the video) and the math on screen. The real-time counter is a pure retention device: you can't scroll away from your salary being earned in 4.9 seconds. "Sales, not profit" pre-empts the obvious "well actually" and turns it into a pinned-comment click, the deliberate-rounding comment lever from research §3.7.

---

#### 02C · "Spend $1 Billion in 24 Hours: How Much per Heartbeat?" (Clocked No. 3)

- **Working title:** Spend $1 Billion in 24 Hours: How Much per Heartbeat? (Clocked No. 3)
- **Topic:** spending / windfall
- **Lane / runtime:** **17.0 s**, loops, just past the Flash lane's 14 s (Tilbury's per-second Short runs 17 s; Story Snap 14 s)
- **Spec:** `engine/specs/02-rate-clock-c.json` · **Render:** `engine/out/02-rate-clock-c.mp4` · **Sheet:** `engine/out/sheets/02-rate-clock-c.png`

**Frame-1 hook**
- On screen (masking tape at 80 px, finished at frame 0): **SPEND *$1 BILLION* / IN 24 HOURS. / HOW MUCH PER / *HEARTBEAT?*** over 💸, with a red typewriter clock **24:00:00** (120 px) that is already on screen at frame 0 and counts down in real time (23:59:56 at 4.0 s). The unexpected unit is the curiosity gap; the ticking clock is the stakes.
- First spoken line (0.0–3.2 s): *"Spend a billion in 24 hours. How much per heartbeat?"*

**Beat sheet**

| Time | Picture | VO |
|---|---|---|
| 0.0–3.2 | **Screen 1.** Tape hook + 💸 (thumbnail frame); countdown **24:00:00 → 23:59:56**, one clock second per real second (0–4.0, ticking foley) | "Spend a billion in 24 hours. How much per heartbeat?" |
| 3.2–4.4 | Clock keeps running, pops at 4.0 | "Whatever's left, you lose." |
| 4.4 | **Flip** | |
| 4.4–6.6 | **Screen 2.** ⏳; postage **$1B IN 24 HOURS**; line 1 at 78 px: `$1B ÷ 24 hrs ≈ $41.7M/hr`, answer in red (4.8–6.3); **red underline anchored on "$41.7M/hr" at 6.4 s (38%) = payoff 1**; pencil footnote "(86,400 = seconds in a day)" at 64 px (6.4–6.9) | "That's almost forty-two million an hour." |
| 6.6–9.0 | Line 2: `$1B ÷ 86,400 s ≈ $11,574/s` (6.9–8.4); red circle anchored on "$11,574/s" (8.5) | "Per second? Over eleven and a half grand." |
| 9.0 | **Flip** (pattern break, 53%) | |
| 9.0–11.9 | **Screen 3, the heartbeat.** ASSUME sticky (heart ≈ 100,000 beats a day, about 70 a minute); ❤️ (230 px) beating at a true 70 bpm from 9.3 s (one `emoji` op with `pulse`) | "Your heart beats about a hundred thousand times a day." |
| 11.9–14.3 | `$1B ÷ 100K beats` at 90 px (11.9–12.9); **hero `= $10K a beat` in red at 130 px** (12.95–13.75); circle on "$10K" (13.78); running total under the heart, **"$10K spent"**, +$10K on every beat from 13.8 s (a `counter` with `steps` on the beat times) | "So: ten grand. Every. Single. Heartbeat." |
| 14.3–17.0 | **CLOCKED / $10K A HEARTBEAT** stamp slams at 15.1 s (89%, 1.9 s before the end); heart and total keep going ($40K spent at 16.37 s); the last 0.35 s crossfades back to frame 0, where the clock reads 24:00:00 again | "What's beat one buying? Your clock starts now." |

**Full voice-over** (52 spoken words, ≤3.5 words/s in every caption window)
> Spend a billion in twenty-four hours. How much per heartbeat? Whatever's left, you lose.
> That's almost forty-two million an hour.
> Per second? Over eleven and a half grand.
> Your heart beats about a hundred thousand times a day.
> So: ten grand. Every. Single. Heartbeat.
> What's beat one buying? Your clock starts now.

**The envelope math** (3 lines)
1. `$1B ÷ 24 hrs ≈ $41.7M/hr` (exact: $41,666,667)
2. `$1B ÷ 86,400 s ≈ $11,574/s` (exact: $11,574.07)
3. `$1B ÷ 100K beats` / `= $10K a beat` (one line written as two rows, the answer as the 130 px hero; exact at 100,000 beats; at 70 bpm, 100,800 beats → $9,921)

Line 2 divides the billion by 86,400 directly rather than dividing the rounded $41.7M by 3,600 (which would give $11,583). The script checks both.

**ASSUME sticky:** "heart ≈ 100,000 beats a day (about 70 a minute)".

**Sources**
| Input | Value | Source (date) |
|---|---|---|
| Heartbeats per day | "beats around 100,000 times daily"; "your heart beats about 100,000 times per day" | Cleveland Clinic, "How Blood Flows Through Your Heart & Body", https://my.clevelandclinic.org/health/articles/17060-how-does-the-blood-flow-through-your-heart ; Cleveland Clinic Health Essentials, https://health.clevelandclinic.org/facts-about-the-heart (re-checked 2026-10-07) |
| | "each day, the average heart beats 100,000 times" | Texas Heart Institute, Heart Anatomy, https://www.texasheart.org/heart-health/heart-information-center/topics/heart-anatomy/ (checked 2026-10-07) |
| | "It beats over 100,000 times a day" (AHA newsroom, cardiologist quote) | https://newsroom.heart.org/local-news/on-world-heart-day-hot-springs-cardiologist-urges-residents-to-take-charge-of-heart-health (checked 2026-10-07) |
| $1B in 24 hours | Hypothetical premise (the Dr Bandana / Tilbury spend-down class, our wording, no prison stakes) | `research/raw/yt-big-number-math.md` transcript 3 |

**Ending**
- **Loop / re-hook:** "Your clock starts now" lands on the beating heart and cuts to "SPEND $1 BILLION IN 24 HOURS. HOW MUCH PER HEARTBEAT?": the line *is* the restart.
- **Comment bait:** "What's beat one buying?" A genuine, personal question (Dr Bandana's "how would you spend it?" prompt, made specific). No vote-bait.
- **Pinned comment:**
  > Exact: $1B ÷ 24 h = $41,666,667 an hour = $694,444 a minute = $11,574.07 a second. At ~100,000 heartbeats a day that's $10,000 a beat. At 70 bpm (100,800 beats) it's $9,921 (envelope said ≈$10K, within 0.8%). At a 60 bpm resting heart it's $11,574, exactly one second's worth; at 100 bpm, $6,944. Sleep 8 hours and you're at $17,361 a second while awake. This 17-second video just cost you $196,759. Source for beats/day: Cleveland Clinic, Texas Heart Institute, AHA. What's your first heartbeat buying?

**Description**
> You win a billion dollars, but it all has to be gone in 24 hours. How fast does it have to leave? One envelope, three lines, one heartbeat. Heart-rate source: Cleveland Clinic / Texas Heart Institute / American Heart Association (about 100,000 beats a day, checked Oct 7 2026).
> Educational math, not financial advice.
> #EnvelopeMath #Clocked #Billionaire #MoneyMath #WouldYouRather

**Platform notes**
- **YouTube Shorts (master, 17.0 s):** title = hook. Shortest of the three; the heartbeat foley carries the last 3 s into the loop.
- **Instagram Reels (~30 s cut):** Trial Reel first. Add the sleep twist ("sleep 8 hours? $17,361 a second while you're awake") as a red-pen line before the stamp. Caption: "Send this to the friend who'd blow it in the first hour."
- **TikTok (~60 s cut):** run it as the story Dr Bandana never computed: hour-stamped beats (Hour 1: $41.7M gone, Hour 8 asleep: catch-up rate, Hour 23…) with the envelope line under each, ending on the heartbeat. Ask viewers to stitch their first purchase.

**Why this one should travel**
It takes the strongest raw evidence in the cluster (Tilbury's spend-down at 40.9M/11.91x; Dr Bandana at 98x from 25.2K subs; World of Niya at 157x) and supplies the number all of them skip: the required rate. The heartbeat is the most "felt" clock there is, at a human scale nobody else uses, and it gives the viewer a physical action (find your pulse) that makes them rewatch.

---

### Math check

Script: `teasers/02-rate-clock-mathcheck.py` (run from the repo root: `python3 teasers/02-rate-clock-mathcheck.py`).

```python
#!/usr/bin/env python3
"""Math check for Envelope Math #2, The Rate Clock (teasers 02A, 02B, 02C).

Recomputes every number that appears on screen, in the voice-over or in a pinned
comment. Run: python3 teasers/02-rate-clock-mathcheck.py
"""
from datetime import date

TODAY = date(2026, 10, 7)  # publish/as-of date


def pct(envelope, exact):
    return abs(envelope - exact) / exact * 100


def jd_gregorian(y, m, d):
    """Julian Day Number at 00:00 UT for a Gregorian calendar date."""
    a = (14 - m) // 12
    yy = y + 4800 - a
    mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - yy // 100 + yy // 400 - 32045 - 0.5


def jd_julian(y, m, d):
    """Julian Day Number at 00:00 UT for a Julian calendar date (astronomical year: 1 BC = 0)."""
    a = (14 - m) // 12
    yy = y + 4800 - a
    mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - 32083 - 0.5


def julian_date_from_jd(jd):
    """Meeus: JD -> Julian calendar date. Returns (astronomical year, month, day)."""
    z = int(jd + 0.5)
    f = jd + 0.5 - z
    b = z + 1524
    c = int((b - 122.1) / 365.25)
    d = int(365.25 * c)
    e = int((b - d) / 30.6001)
    day = b - d - int(30.6001 * e) + f
    month = e - 1 if e < 14 else e - 13
    year = c - 4716 if month > 2 else c - 4715
    return year, month, day


def era(astro_year):
    return f"{1 - astro_year} BC" if astro_year <= 0 else f"AD {astro_year}"


print("=" * 72)
print("02A  The Trillion Dare: $50,000 an hour since Year 1")
print("=" * 72)
TRILLION = 1_000_000_000_000
RATE_HR = 50_000                      # hypothetical rate from the viral claim
HRS_PER_YR = 365.25 * 24              # Julian year, includes leap days
hours = TRILLION / RATE_HR
years = hours / HRS_PER_YR
per_year = RATE_HR * HRS_PER_YR
print(f"line 1  $1T / $50K per hr        = {hours:,.0f} hours   (envelope: 20,000,000 hrs)")
print(f"line 2  hours per year           = 365.25 x 24 = {HRS_PER_YR:,.0f}")
print(f"        20M / 8,766              = {years:,.2f} years  (envelope: ~2,282 yrs, off {pct(2282, years):.3f}%)")
print(f"        earned per year          = ${per_year:,.0f}  (= $438.3M)")
print(f"        earned per day           = ${RATE_HR*24:,.0f}  (TikTok cut: $1.2M a day)")
viral_years = 2026 + 33
print(f"        viral video's AD slip    = 2026 + 33 = {viral_years:,} yrs x $438M (365-day) = ${viral_years*RATE_HR*24*365/1e9:,.1f}B (their $901.8B)")

jd_now = jd_gregorian(TODAY.year, TODAY.month, TODAY.day)
jd_year1 = jd_julian(1, 1, 1)            # 1 Jan AD 1, Julian calendar (historians' convention)
jd_caesar = jd_julian(-99, 7, 12)        # 12 Jul 100 BC (astronomical -99), Julian calendar
hrs_since_year1 = (jd_now - jd_year1) * 24
hrs_since_caesar = (jd_now - jd_caesar) * 24
earned_year1 = hrs_since_year1 * RATE_HR
earned_caesar = hrs_since_caesar * RATE_HR
print(f"ladder  start 1 Jan AD 1   -> {hrs_since_year1:,.0f} hrs -> ${earned_year1/1e9:,.1f}B  (screen: $888B, short by ${(TRILLION-earned_year1)/1e9:,.0f}B)")
print(f"ladder  start 12 Jul 100 BC -> {hrs_since_caesar:,.0f} hrs -> ${earned_caesar/1e9:,.1f}B  (screen: $931B, short by ${(TRILLION-earned_caesar)/1e9:,.0f}B)")
jd_start = jd_now - hours / 24
y, m, d = julian_date_from_jd(jd_start)
print(f"ladder  start for exactly $1T  -> {era(y)}, month {m}, day {d:.1f} (Julian calendar)  (screen: ~256 BC)")
print(f"        naive 2,282 - 2,026 = 256 BC lands on the right year because two errors cancel: no year 0 (+1 yr)")
print(f"        vs. starting from Oct 2026 with 2,281.5 yrs, not 2,282 (2026.77 - 2281.54 = astronomical -254.8 -> 256 BC)")
print(f"        Caesar born 100 BC -> the start is {(1 - y) - 100} years before his birth")
# the screen-3 timeline is drawn to scale: 256 BC at x=120, Year 1 at x=208, 2026 at x=905 (spec 02-rate-clock-a)
X_START, X_NOW = 120, 905
px_per_yr = (X_NOW - X_START) / years
x_year1 = X_START + (jd_year1 - jd_start) / 365.25 * px_per_yr
print(f"        timeline scale {px_per_yr:.3f} px/yr -> Year 1 tick belongs at x = {x_year1:.0f}  (spec: 208)")

print()
print("=" * 72)
print("02B  Apple's stopwatch: how long to make your salary")
print("=" * 72)
APPLE_REV = 416_161_000_000            # FY2025 net sales (Form 10-K)
APPLE_NI = 112_010_000_000             # FY2025 net income (Form 10-K)
SEC_365 = 365 * 86_400
SEC_FY = 364 * 86_400                  # FY2025 was a 52-week year (29 Sep 2024 - 27 Sep 2025)
fy_days = (date(2025, 9, 27) - date(2024, 9, 28)).days
WEEKLY = 1_251                         # BLS median usual weekly earnings, full-time, Q2 2026
salary = WEEKLY * 52
rev_ps = APPLE_REV / SEC_365
rev_ps_fy = APPLE_REV / SEC_FY
t_salary = salary / rev_ps
t_salary_fy = salary / rev_ps_fy
career = 40 * salary
t_career = career / rev_ps
t_career_fy = career / rev_ps_fy
print(f"seconds in a 365-day year        = {SEC_365:,}  (screen: 31.5M sec)")
print(f"FY2025 length                    = {fy_days} days")
print(f"line 1  $416.161B / 31.536M s    = ${rev_ps:,.1f}/sec  (screen: ~$13.2K/sec, off {pct(13_200, rev_ps):.2f}%)")
print(f"        exact over 364 days      = ${rev_ps_fy:,.1f}/sec")
print(f"        median salary            = $1,251 x 52 = ${salary:,}  (screen: $65K)")
print(f"line 2  $65,052 / $13,196/sec    = {t_salary:.3f} s  (screen: ~4.9 sec)")
print(f"        exact (364-day FY)       = {t_salary_fy:.3f} s  -> envelope off {pct(4.9, t_salary_fy):.2f}%")
print(f"        envelope check $65K/$13.2K = {65_000/13_200:.3f} s")
print(f"line 3  4.9 s x 40 yrs           = {4.9*40:.0f} s = {4.9*40/60:.2f} min  (screen and VO: ~3.3 min)")
print(f"        QA: 'three and a quarter' (3.25) was dropped from the VO; exact is {career/rev_ps_fy/60:.2f}-{career/rev_ps/60:.2f} min")
print(f"        exact career $2,602,080  = {t_career:.1f} s = {t_career/60:.2f} min (365-day) / {t_career_fy/60:.2f} min (364-day)")
print(f"        envelope 3.3 min vs exact {t_career_fy/60:.3f} min -> off {pct(3.3, t_career_fy/60):.2f}%")
ni_ps = APPLE_NI / SEC_365
ni_ps_fy = APPLE_NI / SEC_FY
print(f"profit  $112.010B / 31.536M s    = ${ni_ps:,.1f}/sec; exact 364-day ${ni_ps_fy:,.1f}/sec")
print(f"        salary in profit         = {salary/ni_ps:.1f} s (365-day) / {salary/ni_ps_fy:.1f} s (364-day)")
print(f"        career in profit         = {career/ni_ps/60:.1f} min (365-day) / {career/ni_ps_fy/60:.1f} min (364-day)")
print(f"extended cut: sales per minute ${rev_ps*60:,.0f}/min, per day ${APPLE_REV/365/1e9:,.2f}B (365-day)")
print(f"counter runs $0 -> ${salary:,} over {t_salary:.2f} s in the video (real time at the 365-day rate)")
print(f"        counter speed ${salary/round(t_salary, 2):,.0f}/s vs Apple ${rev_ps:,.0f}/s; stopwatch 0.0 -> {round(t_salary, 2)} s (shows 4.9)")
print(f"        career on the clock: {t_career:.0f} s = {int(t_career // 60)} min {t_career % 60:.0f} s (stamp: 3.3 MINUTES)")

print()
print("=" * 72)
print("02C  Spend $1 billion in 24 hours: the heartbeat clock")
print("=" * 72)
BILLION = 1_000_000_000
per_hr = BILLION / 24
per_min = BILLION / (24 * 60)
per_sec = BILLION / 86_400
print(f"line 1  $1B / 24 hrs             = ${per_hr:,.0f}/hr  (screen: ~$41.7M/hr)")
print(f"        per minute               = ${per_min:,.0f}/min")
print(f"line 2  $1B / 86,400 s         = ${per_sec:,.2f}/sec  (screen: $11,574/sec)")
print(f"        check $41.7M/3,600       = ${41_700_000/3600:,.0f}  (rounding the hourly first would give $11,583)")
BEATS = 100_000                         # ~100,000 beats/day (AHA, Cleveland Clinic, Texas Heart Institute)
per_beat = BILLION / BEATS
print(f"line 3  $1B / 100,000 beats      = ${per_beat:,.0f}/beat  (screen: $10,000/beat)")
print(f"        100,000 beats/day        = {BEATS/1440:.1f} beats per minute average")
for bpm in (60, 70, 100):
    beats = bpm * 1440
    print(f"        at {bpm:>3} bpm: {beats:>7,} beats/day -> ${BILLION/beats:,.0f}/beat  (envelope $10K off {pct(10_000, BILLION/beats):.1f}%)")
RUNTIME = 17.0                          # length of the 02C video in seconds (QA retime, was 17.8)
print(f"        VO 'over eleven and a half grand': ${per_sec:,.2f} > $11,500 -> {per_sec > 11_500}")
print(f"        bonus: 8 hrs asleep -> ${BILLION/(16*3600):,.0f}/sec while awake")
print(f"        bonus: this {RUNTIME}-second video = ${per_sec * RUNTIME:,.0f} of the billion")
# animation timing in spec 02-rate-clock-c
CLOCK_FROM, CLOCK_DUR = 86_400, 4.0
end = CLOCK_FROM - CLOCK_DUR
print(f"anim    countdown 24:00:00 -> {int(end // 3600):02d}:{int(end % 3600 // 60):02d}:{int(end % 60):02d} over {CLOCK_DUR} s (1 clock second per real second)")
HEART_BPM = 70
period = 60 / HEART_BPM
# engine pulse = 1 + scale*max(0, sin(pi*t*bpm/60))^8 beats once every 120/bpm s, so the spec passes bpm 140
print(f"        heart: pulse bpm 2 x {HEART_BPM} -> one beat every {120 / (2 * HEART_BPM):.3f} s = {60 / (120 / (2 * HEART_BPM)):.0f} bpm")
beats_shown = 4
print(f"        running total: +$10,000 on each of {beats_shown} beats, {period:.3f} s apart -> ${10_000 * beats_shown:,} spent after {period * (beats_shown - 1):.3f} s")

# ---------------------------------------------------------------------------
# Screen check (final review): every number drawn in the three specs must be
# the rounding of the values computed above, and the captions' spoken text
# (`say`, else `text`) must join to the spec's `vo`.
import json
import re
from pathlib import Path

SPECS = Path(__file__).resolve().parent.parent / "engine" / "specs"


def spec(stem):
    return json.loads((SPECS / f"{stem}.json").read_text(encoding="utf-8"))


def screen_text(sp):
    """Every string the spec draws (write/lines/ladder/stamp/sticky/postage/hook), em markers removed."""
    out = []
    for op in sp["ops"]:
        for key in ("text", "value", "label", "title"):
            v = op.get(key)
            if isinstance(v, str):
                out.append(v)
            elif isinstance(v, list):
                out.extend(x for x in v if isinstance(x, str))
        for L in op.get("lines", []):
            out.append(L["text"] if isinstance(L, dict) else L)
        for r in op.get("rows", []):
            out += [r["label"], r["value"]]
    return " | ".join(s.replace("*", "").replace("\n", " ") for s in out)


def captions_match_vo(sp):
    said = " ".join(c.get("say", c["text"]).replace("\n", " ") for c in sp["captions"])
    vo = re.sub(r"\(.*?\)", "", sp["vo"])
    return " ".join(said.split()) == " ".join(vo.split())


def op(sp, **kw):
    hits = [o for o in sp["ops"] if all(o.get(k) == v for k, v in kw.items())]
    assert len(hits) == 1, kw
    return hits[0]


print()
print("=" * 72)
print("Screen check: spec text and animation vs the numbers above")
print("=" * 72)
a, b, c = spec("02-rate-clock-a"), spec("02-rate-clock-b"), spec("02-rate-clock-c")
A_, B_, C_ = screen_text(a), screen_text(b), screen_text(c)
checks = [
    ("A trillion inked", f"${TRILLION:,}" in A_),
    ("A line 1", f"$1T ÷ $50K/hr = {hours / 1e6:.0f}M hrs" in A_),
    ("A line 2", f"÷ {HRS_PER_YR:,.0f} hrs/yr ≈ {round(years):,} yrs" in A_),
    ("A footnote", f"({HRS_PER_YR:,.0f} = 365¼ days × 24 hrs)" in A_),
    ("A rung Year 1", f"${round(earned_year1 / 1e9)}B ✗" in A_),
    ("A rung Caesar", f"${round(earned_caesar / 1e9)}B ✗" in A_),
    ("A start year", f"≈ {era(y)}" in A_ and f"CLOCKED IN {era(y)}" in A_),
    ("A Year 1 tick", op(a, type="write", text="Year 1")["x"] == round(x_year1)),
    ("A captions = VO", captions_match_vo(a)),
    ("B postage", f"${APPLE_REV / 1e9:.0f}B" in B_),
    ("B line 1", f"${APPLE_REV / 1e9:.0f}B ÷ {SEC_365 / 1e6:.1f}M s ≈ ${rev_ps / 1e3:.1f}K/s" in B_),
    ("B sticky", f"${WEEKLY:,}/wk × 52 ≈ ${salary / 1e3:.0f}K" in B_),
    ("B line 2", f"${salary / 1e3:.0f}K ÷ ${rev_ps / 1e3:.1f}K/s ≈ {t_salary:.1f} sec" in B_),
    ("B real-time counter", op(b, type="counter", to=salary)["dur"] == round(t_salary, 2)),
    ("B career", f"≈ {t_career / 60:.1f} min" in B_ and f"{t_salary:.1f} sec × 40 yrs" in B_),
    ("B captions = VO", captions_match_vo(b)),
    ("C line 1", f"$1B ÷ 24 hrs ≈ ${per_hr / 1e6:.1f}M/hr" in C_),
    ("C line 2", f"$1B ÷ 86,400 s ≈ ${per_sec:,.0f}/s" in C_),
    ("C hero", f"${per_beat / 1e3:.0f}K a beat" in C_.replace("  ", " ")),
    ("C countdown", op(c, id="clock")["from"] - op(c, id="clock")["to"] == CLOCK_DUR == op(c, id="clock")["dur"]),
    ("C heart 70 bpm", op(c, type="emoji", char="❤️")["pulse"]["bpm"] == 2 * HEART_BPM),
    ("C running total", [s[1] for s in op(c, id="spent")["steps"]] == [10_000 * k for k in range(1, beats_shown + 1)]
     and all(abs(s[0] - k * period) < 0.001 for k, s in enumerate(op(c, id="spent")["steps"]))),
    ("C captions = VO", captions_match_vo(c)),
]
for name, ok in checks:
    print(f"  {'ok ' if ok else 'BAD'}  {name}")
assert all(ok for _, ok in checks), "screen check failed"
print("all screen checks pass")
```

Output (re-run 2026-10-07, final review; the screen check at the end is new):

```
========================================================================
02A  The Trillion Dare: $50,000 an hour since Year 1
========================================================================
line 1  $1T / $50K per hr        = 20,000,000 hours   (envelope: 20,000,000 hrs)
line 2  hours per year           = 365.25 x 24 = 8,766
        20M / 8,766              = 2,281.54 years  (envelope: ~2,282 yrs, off 0.020%)
        earned per year          = $438,300,000  (= $438.3M)
        earned per day           = $1,200,000  (TikTok cut: $1.2M a day)
        viral video's AD slip    = 2026 + 33 = 2,059 yrs x $438M (365-day) = $901.8B (their $901.8B)
ladder  start 1 Jan AD 1   -> 17,757,528 hrs -> $887.9B  (screen: $888B, short by $112B)
ladder  start 12 Jul 100 BC -> 18,629,520 hrs -> $931.5B  (screen: $931B, short by $69B)
ladder  start for exactly $1T  -> 256 BC, month 3, day 9.7 (Julian calendar)  (screen: ~256 BC)
        naive 2,282 - 2,026 = 256 BC lands on the right year because two errors cancel: no year 0 (+1 yr)
        vs. starting from Oct 2026 with 2,281.5 yrs, not 2,282 (2026.77 - 2281.54 = astronomical -254.8 -> 256 BC)
        Caesar born 100 BC -> the start is 156 years before his birth
        timeline scale 0.344 px/yr -> Year 1 tick belongs at x = 208  (spec: 208)

========================================================================
02B  Apple's stopwatch: how long to make your salary
========================================================================
seconds in a 365-day year        = 31,536,000  (screen: 31.5M sec)
FY2025 length                    = 364 days
line 1  $416.161B / 31.536M s    = $13,196.4/sec  (screen: ~$13.2K/sec, off 0.03%)
        exact over 364 days      = $13,232.6/sec
        median salary            = $1,251 x 52 = $65,052  (screen: $65K)
line 2  $65,052 / $13,196/sec    = 4.930 s  (screen: ~4.9 sec)
        exact (364-day FY)       = 4.916 s  -> envelope off 0.33%
        envelope check $65K/$13.2K = 4.924 s
line 3  4.9 s x 40 yrs           = 196 s = 3.27 min  (screen and VO: ~3.3 min)
        QA: 'three and a quarter' (3.25) was dropped from the VO; exact is 3.28-3.29 min
        exact career $2,602,080  = 197.2 s = 3.29 min (365-day) / 3.28 min (364-day)
        envelope 3.3 min vs exact 3.277 min -> off 0.69%
profit  $112.010B / 31.536M s    = $3,551.8/sec; exact 364-day $3,561.6/sec
        salary in profit         = 18.3 s (365-day) / 18.3 s (364-day)
        career in profit         = 12.2 min (365-day) / 12.2 min (364-day)
extended cut: sales per minute $791,783/min, per day $1.14B (365-day)
counter runs $0 -> $65,052 over 4.93 s in the video (real time at the 365-day rate)
        counter speed $13,195/s vs Apple $13,196/s; stopwatch 0.0 -> 4.93 s (shows 4.9)
        career on the clock: 197 s = 3 min 17 s (stamp: 3.3 MINUTES)

========================================================================
02C  Spend $1 billion in 24 hours: the heartbeat clock
========================================================================
line 1  $1B / 24 hrs             = $41,666,667/hr  (screen: ~$41.7M/hr)
        per minute               = $694,444/min
line 2  $1B / 86,400 s         = $11,574.07/sec  (screen: $11,574/sec)
        check $41.7M/3,600       = $11,583  (rounding the hourly first would give $11,583)
line 3  $1B / 100,000 beats      = $10,000/beat  (screen: $10,000/beat)
        100,000 beats/day        = 69.4 beats per minute average
        at  60 bpm:  86,400 beats/day -> $11,574/beat  (envelope $10K off 13.6%)
        at  70 bpm: 100,800 beats/day -> $9,921/beat  (envelope $10K off 0.8%)
        at 100 bpm: 144,000 beats/day -> $6,944/beat  (envelope $10K off 44.0%)
        VO 'over eleven and a half grand': $11,574.07 > $11,500 -> True
        bonus: 8 hrs asleep -> $17,361/sec while awake
        bonus: this 17.0-second video = $196,759 of the billion
anim    countdown 24:00:00 -> 23:59:56 over 4.0 s (1 clock second per real second)
        heart: pulse bpm 2 x 70 -> one beat every 0.857 s = 70 bpm
        running total: +$10,000 on each of 4 beats, 0.857 s apart -> $40,000 spent after 2.571 s

========================================================================
Screen check: spec text and animation vs the numbers above
========================================================================
  ok   A trillion inked
  ok   A line 1
  ok   A line 2
  ok   A footnote
  ok   A rung Year 1
  ok   A rung Caesar
  ok   A start year
  ok   A Year 1 tick
  ok   A captions = VO
  ok   B postage
  ok   B line 1
  ok   B sticky
  ok   B line 2
  ok   B real-time counter
  ok   B career
  ok   B captions = VO
  ok   C line 1
  ok   C line 2
  ok   C hero
  ok   C countdown
  ok   C heart 70 bpm
  ok   C running total
  ok   C captions = VO
all screen checks pass
```

The Julian Day helpers were spot-checked against known values: 1 Jan 2000 (Gregorian) = JD 2451544.5; 1 Jan AD 1 (Julian) = JD 1721423.5; 7 Oct 2026 = JD 2461320.5; and the inverse returns 12 Jul 100 BC for Caesar's birthday.

---

### Verification log

*Historical record of the first QA pass. Where it conflicts with the **Final fact check** or **Polish pass** below (negative-`t` hooks, the typed-glyph heart, the Musk sources), those later sections win.*

**QA pass, 2026-10-07.** Independent fact-check, edit and visual QA of 02A/02B/02C. Files changed: this md, `teasers/02-rate-clock-mathcheck.py`, `engine/specs/02-rate-clock-{a,b,c}.json`, `engine/out/sheets/02-rate-clock-{a,b,c}.png`, and new stills `engine/out/stills/02-rate-clock-*.png` (frame 0, payoff 1 and the last frame of each).

#### 1. Math (recomputed independently with python3)
I used a different method from the writer's script: exact `Fraction` arithmetic, Python's proleptic-Gregorian day ordinals plus a manual Julian-calendar walk (no Julian Day formulas).

| Check | Independent result | Status |
|---|---|---|
| $1T ÷ $50K/hr; ÷ 8,766 | 20,000,000 h; 2,281.54 yr | ✓ |
| 1 Jan AD 1 (Julian) → 7 Oct 2026 | 739,897 days → $887.88B (screen $888B) | ✓ |
| 12 Jul 100 BC (Julian) → 7 Oct 2026 | 776,230 days → $931.48B (screen $931B) | ✓ |
| Start date for exactly $1T | 833,333.3 days back = 9.7 March 256 BC (Julian) | ✓ (the script's comment explaining why the naive "2,282 − 2,026 = 256 BC" works was garbled; rewritten) |
| Apple $416.161B ÷ 31.536M s / 31.4496M s | $13,196.4/s / $13,232.6/s | ✓ |
| $1,251 × 52; ÷ rate | $65,052; 4.930 s (365-day) / 4.916 s (364-day) | ✓ |
| 40-year career | $2,602,080 → 3.286 / 3.277 min | ✓ screen 3.3. **Bug:** VO said "three and a quarter minutes" (3.25) against "3.3" on screen. Now "about three point three minutes". |
| Profit $112.010B | $3,551.8/s (365) / $3,561.6/s (364); 18.3 s; 12.2 min | ✓ |
| $1B ÷ 24 / 1,440 / 86,400 / 100,000 | $41,666,667 / $694,444 / $11,574.07 / $10,000 | ✓ **Bug:** VO said "eleven and a half grand" against "$11,574" on screen. Now "over eleven and a half grand" (true: $11,574 > $11,500). |
| 60 / 70 / 100 bpm; 16 h awake | $11,574 / $9,921 / $6,944; $17,361/s | ✓ |
| "This video cost you…" | Runtime changed 17.8 → 17.0 s, so $206,019 → **$196,759** | fixed in the pinned comment and the script |
| Heart animation | Beat period 0.857 s = 70 bpm | ✓ |
| B real-time counter | $0 → $65,052 over 4.93 s = $13,195/s | ✓ (matches the 365-day rate on the envelope) |

The script embedded above and its output were re-run and re-pasted, and they match `teasers/02-rate-clock-mathcheck.py` byte for byte.

#### 2. Facts
**Limitation:** this QA run could not do fresh WebSearch (the shared search budget for the run was used up), and direct fetches to apple.com, bls.gov, nairametrics.com and wect.com were blocked by the egress proxy. Each input was checked against figures already verified elsewhere in this repo, or against well-established reference facts.

| Input | QA finding | Action |
|---|---|---|
| Musk crossed $1T on paper in June 2026 | Same date (2026-06-12, SpaceX IPO) independently sourced in `teasers/01-cost-in-envelopes.md` (Bloomberg Government) | Kept |
| Musk "now" = Forbes 400 $908B (Sep 19) | **Stale.** 01's sources have Bloomberg $1.04T and Forbes $936B on 2026-10-06 ("trillionaire again") | Replaced in sources, pinned comment and description. The on-screen line ("crossed it in June, on paper") stays true either way |
| Apple FY2025 net sales $416.161B, net income $112.010B, 52-week FY ended 2025-09-27 | Consistent with Apple's FY2025 10-K / Oct 30 2025 release; FY2026 results not out before late October, so FY2025 is still the latest full year | Kept |
| Apple Q3 FY2026 revenue $109.4B, +16% | Could not be re-confirmed and nothing else in the repo corroborates it | **Cut** from the pinned comment (it was non-essential) |
| BLS median full-time weekly pay Q2 2026 = $1,251 (released 2026-07-21) | Same figure, release and URL in 03, 05 and 08 (08 adds 120.9M workers). Q3 is normally released mid-October, so Q2 is the latest | Kept |
| Heart ≈ 100,000 beats/day | Standard Cleveland Clinic / Texas Heart Institute / AHA figure | Kept |
| Julius Caesar born 12/13 July 100 BC | Standard dating | Kept |
| Evidence table and counter-evidence | View counts and outliers match `research/02-top-10-approaches.md` and the raw files. One misquote: "national debt surpasses $38T: 3–11x" merged two different videos | Rewritten as the two separate sourced figures (3.62x; 10.91x) |

#### 3. Brand and policy (format bible §2)
- **A number in frame 1. FAILED in all three originals.** The `hook` op slaps lines in from `t`, so at `t: 0` the frame (which is also the thumbnail) was an empty envelope. Fixed by starting hooks at `t: −0.6/−0.7` and postmarks at −0.3. Verified with `--t 0` stills.
- **Biggest number or verdict in the last 2 s. FAILED in all three.** The stamps landed 3.2–4.1 s before the end (82–84%), and the md's own ritual said "82–85%". Restructured: the stamps now fire at 22.6/24.5, 17.9/19.8 and 15.1/17.0 (each 1.9 s before the end, 89–92%). Ritual step 6 is rewritten to match.
- **A's stamp repeated payoff 1** ("2,282 YEARS", already circled at 37%). It is now **CLOCKED IN / 256 BC**, the new number, and it echoes the VO "clock in".
- **Title = on-screen text = first spoken line.** 02B's spoken line didn't match its title. With the new hooks, all three titles, tapes and first lines match.
- **≤3 lines:** A has 2 lines plus a ladder, B 3, C 3. ✓ **Honest rounding plus exact figure pinned:** ✓ in all three. **Disclaimer:** "Educational math, not financial advice." appears in all 3 descriptions ✓. **No advice language:** grep for should / need to / guaranteed / get rich / financial freedom finds nothing ✓. **No borrowed footage or impersonation:** all drawn; Apple and Musk appear as names and public figures only ✓.
- **Lanes:** the md called B (21.2 s) and C (17.8 s) "Flash lane", but the bible's Flash lane is 6–14 s. All three are now labelled honestly as sitting between the Flash and Envelope lanes, at the approach's ~20 s build length. *Bible gap to flag:* the bible has no lane for 14–25 s, which is where the Rate Clock's evidence lives (14–49 s).

#### 4. Virality (hook scores 1–10 against `research/02-top-10-approaches.md` §2 and `watch/group1-video4.md`)
| Teaser | Before | After | Why |
|---|---|---|---|
| 02A | 7.5 | 8.5 | The dare copy is sog_geovanie's 1,005.7x claim and hook formula #3, with a timely famous number. But frame 0 was blank and the ending re-stamped a number viewers had already seen. Now the hook is up at frame 0 and the final stamp is the new number. |
| 02B | 7 | 8 | It was the generic "How long does [company] take…" question (Tilbury's company clock, 4.24x, his weakest of the three), the spoken line omitted $65K, and frame 0 was blank. **Rewritten:** "APPLE MAKES YOUR $65K SALARY IN ?? SECONDS" puts the viewer's own number on screen, shows the shock unit (seconds) and asks for a guess. |
| 02C | 6.5 | 8 | "HOW FAST?" was vague: the stake was there but there was no curiosity gap. **Rewritten:** "…HOW MUCH PER HEARTBEAT?" adds a novel human unit to Dr Bandana's 98x premise. |

**Pacing.** The original VO could not be spoken in its windows. Example: A's "A year has eight thousand seven hundred sixty-six hours. So about two thousand two hundred eighty-two years." is 17 words in 2.8 s (about 6 words/s). Every line was rewritten and retimed to ≤3.5 spoken words/s, counting hyphenated number words separately.

**Structure.** Payoff 1 lands at 39% (A, 2,282 yrs), 35% (B, 4.9 s) and 37% (C, $41.7M/hr). Pattern breaks: the guess timer at 45% (A), the real-time counter at 38% (B), the heartbeat flip at 53% (C). Loops: A's CTA cuts back to the dare; B's "?? SECONDS" replays with the answer known; C's "Your clock starts now" restarts the dare.

#### 5. Visual QA
`node src/cli.js check` ends with zero warnings on all three. Sheets and stills were rendered and inspected.
- **C's heart flickered.** Each `emoji` state op pops in from scale 0, so the heart vanished for one frame and shrank for 2–3 frames twice per beat. It is rebuilt as typed-glyph `write` ops with instant size switches (190 → 232 px for 0.24 s per beat). It now pulses cleanly at a true 70 bpm.
- **Two pens wrote at once** (the footnotes in A and C started while line 2 was still being written). Footnotes are now `pen: false`.
- **A's stamp overlapped the red box on "≈ 256 BC".** The ladder moved up 15 px and the stamp moved to (570, 1205) at size 60.
- **A's footnote** was on screen for only 1.4 s and faded out under the timer. It now appears with line 2 (on screen 3.3 s) and cuts cleanly before the timer.
- **Caption rail.** Seven caption lines measured 811–859 px wide. Centred, they reach x ≈ 970, inside the right button rail (x > 940), and the linter does not check captions. Manual `\n` breaks keep every caption line ≤ 800 px and every caption at ≤ 2 lines.
- **Read time.** Every caption and every piece of on-screen text is up for ≥ 0.29 s per word (the minimum is 0.25). The only short items are the one-word "+$10K" pops (0.54–0.62 s).

#### Engine requests (engine/src not edited)
1. `hook`: an option to start fully drawn (or draw at `t`), so frame 0 can be the thumbnail without a negative `t`.
2. `emoji`: `pop: false` and/or a `pulse: {bpm}` param. Today every emoji op scales in from 0, so state-swapping animations flicker.
3. Linter: check `stamp`, `postage` and `annotate` bounds (the A stamp/box overlap passed lint), and check caption line width against the right rail.
4. Captions: wrap at ≤ 800 px (or rail-aware), not 860 px centred.
5. `ladder`: per-row start times (`rows[i].at`) so rungs can sync to the VO; today the gap is uniform.

#### Still open
- ~~Re-run WebSearch on each source before publishing~~ Done in the finishing pass on 2026-10-07; see **Final fact check** below.
- If Apple reports FY2026 (date not yet announced; late October in past years) before 02B ships, swap the postage stamp, the ASSUME/P.S. copy and the counter target, and rerun the script. Same for BLS Q3 2026 (scheduled 2026-10-28) and the $1,251 sticky.
- Engine requests 1, 2 and 5 above shipped in the engine upgrade and are now used (hook at `t: 0`, `emoji` `pulse`, `ladder` per-row `at`). New request: see the Polish pass.

---

### Final fact check

Live WebSearch on **2026-10-07** (finishing pass). The egress proxy blocks direct fetches of sec.gov, bls.gov and billionaires.africa, so those rows are confirmed from search-result text quoting the primary page; the primary URL is still the one listed.

| Input | Value used | Source URL | Checked on | Status |
|---|---|---|---|---|
| Musk first crossed $1T (02A on screen: "crossed it in June (on paper)") | Fri 12 Jun 2026, SpaceX Nasdaq debut; Forbes $1.1T, Bloomberg $1.11T | https://gazette.com/2026/06/12/spacex-soars-25-in-wall-street-debut-and-makes-elon-musk-the-first-trillionaire/ ; https://nairametrics.com/2026/06/13/elon-musk-becomes-worlds-first-trillionaire-as-spacex-shares-surge-on-nasdaq-debut/ ; https://www.washingtonexaminer.com/policy/technology/4606254/spacex-ipo-elon-musk-trillionaire/ | 2026-10-07 | Confirmed |
| SpaceX IPO price / first trade (sources only) | $135 offer, opened at $150 | https://www.dailyindependent.com/national/spacex-opens-11-higher-at-150-a-share-and-makes-musk-the-first-trillionaire/article_8ee41ee7-9fbb-56ea-b097-094343d5e65d.html | 2026-10-07 | Confirmed |
| Musk net worth now, Bloomberg (02A pinned comment) | $1.04T on Mon 5 Oct 2026 (+$65B that day) | https://qz.com/elon-musk-trillionaire-spacex-stock-surge-100526 ; https://www.billionaires.africa/2026/10/06/elon-musk-becomes-a-trillionaire-again-as-spacex-shares-hit-highest-since-june/ | 2026-10-07 | Confirmed; **date corrected** from "Oct 6" to Oct 5 (the day of the gain; Billionaires.Africa reported it Oct 6) |
| Musk net worth now, Forbes real-time (02A pinned comment) | $936B, early Oct 2026 | https://derechadiario.com.ar/negocios-finanzas/ranking-forbes-quienes-10-personas-ricas-mundo-en-octubre-2026 | 2026-10-07 | Confirmed via a report of the Forbes list; **source replaced** (the forbes.com URL carried over from 01 could not be found by search) |
| Apple FY2025 net sales (02B postage, line 1) | $416,161M ("$416B") | https://www.sec.gov/Archives/edgar/data/320193/000032019325000079/aapl-20250927.htm ; https://www.apple.com/newsroom/2025/10/apple-reports-fourth-quarter-results/ | 2026-10-07 | Confirmed |
| Apple FY2025 net income (02B pinned comment) | $112,010M | same 10-K | 2026-10-07 | Confirmed |
| Apple FY2025 length | 52 weeks, ended 27 Sep 2025 (FY2024 also 52, FY2023 53) | same 10-K | 2026-10-07 | Confirmed |
| Are Apple's FY2026 results out? | No. Q4 FY2026 date not yet announced; late October in past years. FY2025 stays the latest full year | https://www.macobserver.com/news/apple-q4-fy2026-earnings-date-not-announced/ | 2026-10-07 | Confirmed |
| Apple Q3 FY2026 (02B pinned comment, context) | $109.4B revenue, +16% YoY, quarter ended 27 Jun 2026 | https://www.apple.com/newsroom/2026/07/apple-reports-third-quarter-results/ ; https://www.sec.gov/Archives/edgar/data/0000320193/000032019326000018/a8-kex991q3202606272026.htm ; https://macrumors.com/2026/07/30/apple-3q-2026-earnings | 2026-10-07 | Confirmed; **reinstated** (the QA pass had cut it as unverifiable) |
| Typical full-time pay (02B sticky, line 2, counter) | BLS median usual weekly earnings, full-time wage and salary workers, Q2 2026: $1,251 → × 52 = $65,052 | https://www.bls.gov/news.release/archives/wkyeng_07212026.htm | 2026-10-07 | Confirmed |
| Is BLS Q3 2026 out? | No. Scheduled for Wed 28 Oct 2026 (one BLS calendar page lists 21 Oct); Q2 stays the latest | https://www.bls.gov/schedule/2026/10_sched_list.htm | 2026-10-07 | Confirmed; md previously said "mid-October", corrected |
| Julius Caesar's birth (02A rung 2) | 12/13 July 100 BC (traditional year) | https://en.wikipedia.org/wiki/Julius_Caesar ; https://www.worldhistory.org/timeline/Julius_Caesar/ ; https://www.britannica.com/biography/Julius-Caesar-Roman-ruler | 2026-10-07 | Confirmed |
| Heartbeats per day (02C sticky, line 3) | ≈100,000 | https://health.clevelandclinic.org/facts-about-the-heart ; https://my.clevelandclinic.org/health/articles/17060-how-does-the-blood-flow-through-your-heart | 2026-10-07 | Confirmed (Texas Heart Institute and AHA rows were confirmed in the first pass and not re-searched) |
| Calendar constants | 365¼ × 24 = 8,766 h/yr; 31,536,000 s/yr; 86,400 s/day; no year 0 between 1 BC and AD 1 | arithmetic and calendar convention, checked in `teasers/02-rate-clock-mathcheck.py` | 2026-10-07 | Confirmed (python3) |
| $50K an hour; $1B in 24 hours; 40-year career | Hypothetical premises, labelled on the ASSUME stickies | `research/watch/group1-video4.md`, `research/raw/yt-big-number-math.md` | n/a | Hypothetical, not a fact claim |
| Evidence-table view counts and outlier scores | As recorded in the research files | `research/02-top-10-approaches.md`, `research/raw/*` | not re-queried | Research data for the strategy section; nothing on screen depends on it |

No on-screen value changed: every figure that appears in a video held. The script was re-run after the spec changes and its output above is current.

---

### Polish pass

**Finishing producer, 2026-10-07.** Files: this md, `teasers/02-rate-clock-mathcheck.py`, `engine/specs/02-rate-clock-{a,b,c}.json`, `engine/out/02-rate-clock-{a,b,c}.mp4`, `engine/out/sheets/02-rate-clock-{a,b,c}.png`, `engine/out/stills/02-rate-clock-*.png`, and the approach-2 block of `teasers/teasers.json`.

**Facts.** All inputs re-searched live (table above). Changes: Musk "now" re-dated to Bloomberg's 5 Oct figure and re-sourced (Quartz, Billionaires.Africa; Forbes $936B via Derecha Diario); June crossing re-sourced to AP via The Gazette with Bloomberg's $1.11T added; Apple Q3 FY2026 ($109.4B, +16%) confirmed and put back in 02B's pinned comment as context; BLS Q3 release date corrected to 28 Oct; Apple Q4 FY2026 confirmed not yet scheduled. Script extended with animation checks (timeline scale, counter speed, career clock, countdown, heart rate, running total) and re-run.

**All three specs.**
- Postmark moved into the flap (`x 175, y 258, r 100`, `centerSize 34`). Hooks start at `t: 0` and render finished, so frame 0 is the thumbnail; the negative-`t` hook and postmark hacks are gone.
- Legibility: every working line is 78–96 px (ladder labels 69 px; was 70–80 px, crammed into y 900–1000); footnotes, stickies and timeline labels 64 px (were 46–54 px and failed the linter); hero numbers 100–190 px (A "≈ 256 BC" 100 px; B "$65,052" 190 px and "≈ 3.3 min" 150 px; C "= $10K a beat" 130 px and the 120 px "24:00:00").
- Layout: each screen fills the content zone (y 600–1300) with one idea; hooks sit over one big prop at frame 0 so the thumbnail is not half empty; the right edge of every working line sits at x ≤ 930 (ladder) or ≤ 915 (circled lines), so red marks stay out of the button rail.
- Marks: every circle, underline, double underline and box on text uses a `target` anchor instead of hand-measured coordinates; answers are red via `em: true`.
- Pens: `pen: "low"` on lines written under existing text, so the pen never covers the line above.
- Captions: all ≤2 lines with manual breaks (widest line 786 px, inside the rail), ≤3.6 words/s; `say` added on 10 captions where digits are read aloud differently ("$888 billion" → "eight hundred eighty-eight billion", "256 BC" → "two fifty-six BC", "4.9" → "four point nine", etc.).
- `"loop": true` on all three (each was already written to loop); `sfxGain 0.75`.
- `node src/cli.js check`: zero warnings on all three.

**02A.** Frame 0 gains a 250 px 🕰️; the trillion moved below it (110 px) with an anchored double underline and the Musk note under that. Screen 2 lines at 82 px, footnote after line 2 (no two pens at once). Guess timer enlarged (r 105). Screen 3: the timeline labels are 64 px, the ladder rungs use per-row `at` (14.9 / 17.6 / 20.9 s) instead of a uniform gap, a 100 px red "≈ 256 BC" lands at the arrow's tip, the box on "≈ 256 BC" is anchored, and the stamp has clear space under the ladder. The two typed headers are staggered by 0.12 s, because their aligned click trains made a −0.8 dB peak after encoding.

**02B.** Bigger frame-0 stopwatch (330 px) and "?" (200 px). Line 1 now reads `$416B ÷ 31.5M s ≈ $13.2K/s` ("sec" → "s") so it fits at 78 px; the footnote explains 31.5M. Real-time screen re-centred, and the ⏱️ pulses once a second. The career screen is rebuilt as one idea: `4.9 sec × 40 yrs` then a 150 px hero `≈ 3.3 min`. It used to re-ink both earlier lines at 70 px with a 90-chars/s blur and a duplicate postage stamp. The P.S. sticky now starts at 16.95 s (was 17.6), so it is fully written 1.7 s before the end (it finished only 0.9 s before).

**02C.** The red "24:00:00" is now a real countdown (`counter`, `time: "hms"`, 86,400 → 86,396 s over 4.0 s) that is on screen at frame 0 and reads 24:00:00 again when the loop returns. Lines at 82 px. Line 3 split into `$1B ÷ 100K beats` + hero `= $10K a beat`. The 19 `write` ops that faked the heartbeat became one `emoji` with `pulse`, and the 4 "+$10K" pops became one `counter` with `steps` on the beat times ("$10K spent" → "$40K spent").

**Render and review.** `node src/cli.js render` → `engine/out/02-rate-clock-a.mp4` (24.5 s), `-b.mp4` (19.8 s), `-c.mp4` (17.0 s), all 1080×1920 at 30 fps. Frames extracted with ffmpeg and inspected at 0.0 s, payoff 1, the reveal and duration − 0.2 s (A 0.0/9.9/22.9/24.3; B 0.0/7.2/13.2/18.6/19.6; C 0.0/6.8/14.0/15.5/16.8), plus contact sheets and heart-pulse frames (13.80/14.23/14.66 s: peak, trough, peak = 70 bpm). Audio (`volumedetect`): A mean −26.9 dB / max −2.8 dB; B −26.4 / −3.2; C −26.8 / −2.2. Before `sfxGain` and the header stagger, A peaked at 0.0 dB.

**Engine request (engine/src not edited).** `emoji.pulse` beats at half the requested rate: `max(0, sin(π·t·bpm/60))^8` has one positive lobe every 120/bpm s, so `bpm: 70` gives 35 beats a minute. 02C passes `bpm: 140` to get a true 70 bpm (the script documents this). If the engine is fixed to `|sin|` or `sin(2π…)`, change 02C back to `bpm: 70`.
