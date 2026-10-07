# Jake (Instagram, @jacobdoesmoney): deep study of the finance-math series

**Benchmark status:** near-miss account (Instagram, 41.3K followers at qualification, finance-maths share 54%). Studied **as a series reference only**: the "2 people invest $10,000 / 10 years ago" clone-duel series, plus the one breakout maths reel ("How to be financially free (in 5 steps)") that qualification listed as his best. His tier lists, sector picks and portfolio-review reels are catalogued for context but not studied.
**Study date:** 2026-10-07
**Sources used (all vidIQ):**
- 4 x `vidiq_watch_shortform_content` with the custom LOOK/HOOK prompt. All 4 completed (40 credits). Job IDs are in Appendix A.
  - I first submitted the 2 approved shorts in parallel (5 steps; QQQ vs TQQQ).
  - The QQQ vs TQQQ walkthrough ended on QQQ = $52,458, but the caption says QQQ = $73,406. To check whether vidIQ was misreading or the screen really differs from the caption, I used the remaining 2 jobs of the 4-job budget on the other two series reels (VOO vs SOXL; QQQ vs SPY), submitted in parallel. That also means all 3 series reels in the catalogue were watched.
- 0 x `vidiq_video_transcript`. That tool covers YouTube only, and this is an Instagram account. Every spoken line quoted below is vidIQ's watch-job transcription. The 3 series reels have **no voice at all** (music only), so there is no spoken hook to transcribe for them.
- 1 x `vidiq_ig_profile_reels` (12 reels, 5 credits). The second catalogue call was skipped: the tool returns the same first 12 reels and cannot paginate.
- No new calls: two figures come from vidIQ outlier searches already run earlier in this project and saved in `research/raw/ig-tiktok-outliers.md` and `research/v2/channels.json` (a second IG post of the 5-steps reel, and two TikToks on @jacobdoesmoney2). They are labelled "(earlier search)".

**Budget used:** 4/4 watch jobs, 0/3 transcripts, 1/2 catalogue calls. 45 credits in total.

**Images:** the 12 cover thumbnails (203x360) are saved in `jake-covers/<shortcode>-<slug>.jpg`. The image each watch job returned (180x320) is saved as `jake-covers/<shortcode>-jobframe.jpg`. For the 4 watched reels, the job image matches vidIQ's frame-1 description (an empty layout before any number appears).

**Rule:** every number, title, quote and URL below comes from those calls. Plays, likes and comments are as returned by `vidiq_ig_profile_reels` on 2026-10-07. The tool gives no outlier score, saves or shares for IG, so those are **unknown**. My own arithmetic is labelled **(check)**. Where I read text off a 203x360 cover myself, I say so. Anything not seen is "unknown".

---

## 0. Headline findings

1. **The series is a silent, 11-second "clone duel", and it is the account's only repeatable breakout.**
   - The same man is filmed twice in one locked-off outdoor shot and composited side by side against plain light-grey vertical siding. A white title box at the top reads "2 people invest $10,000 / 10 years ago". A huge bubbly ticker sits over each head (left always lime green, right always yellow). Under each ticker, a year-by-year balance ledger ("2017: $12,595" ...) stacks down his torso, about one row a second, on the music beat.
   - There is no voice, no cut, no on-screen CTA. Every series reel lasts 11.006 s.
   - All 3 series reels in the catalogue did **276,471 to 322,339 plays**, which is **5.7x to 6.6x the 12-reel median of 48,822 (check)**. The 9 other reels have a median of 25,890 (check). The 3 series reels hold **70% of the 12 reels' plays (check)**.
   - They were posted 09-05, 09-09 and 09-15, so all three are recent. Whether earlier series entries exist before 08-30 is **unknown** (12-reel limit).
2. **The hook is entirely visual and lands at 0.0 s.** Frame 1 already carries the premise (same $10,000, same start date), two named contenders, and two costumes that tell you who wins:
   - **The winner always wears the fitted olive polo and smiles; the loser always wears the black DKNY hoodie and looks worried.** This holds in 3 of 3 (QQQ beats SPY: QQQ in the polo, on the left; TQQQ beats QQQ and SOXL beats VOO: the leveraged fund in the polo, on the right). The colour of the ticker follows the side (left green, right yellow), but the costume follows the winner.
   - The first ledger row lands at about 0:01 and already shows a gap (TQQQ $18,653 vs QQQ $12,595; SOXL $24,211 vs VOO $11,591).
3. **Each reel has a built-in reversal at about 0:06-0:07: the 2022 row.** The leveraged fund falls 65% (TQQQ $147,306 to $51,878) or 73% (SOXL $172,256 to $46,992) **(check)**. vidIQ reports that on VOO vs SOXL the crash "reverses their emotional positions", and on the other two the characters react with head-holding or head-scratching. Then the final row (2025, at about 0:08-0:10) pays off.
4. **The screen and the caption give different final numbers.** This is the biggest open question on the account:

   | Reel | Final on screen (vidIQ, 2025 row) | Final in caption |
   |---|---|---|
   | QQQ vs TQQQ | QQQ $52,458 / TQQQ $185,551 | QQQ $73,406 / TQQQ unknown (caption truncated) |
   | QQQ vs SPY | QQQ $52,458 / SPY $34,392 | QQQ $73,406 / SPY $41,712 |
   | VOO vs SOXL | VOO $34,715 / SOXL $96,391 | VOO $41,697 / SOXL $439,737 |

   - vidIQ's readings look like real on-screen values, not noise: two independent jobs read the **identical** 9-row QQQ ledger, and the SPY and VOO ledgers differ by a gap that widens steadily every year from $12 to $323 **(check)**, which is what a small fee difference compounding would look like.
   - So either the video has a further row that vidIQ did not report (a "2026" row would make 10 rows for "10 years"; this is my guess, **unverified**), or the caption uses a different window from the screen. **Someone should scrub the last second of DdUZ5K1gGlc by hand.**
   - If the screen really ends at 2025, the SOXL reel's biggest on-screen number is the 2021 peak ($172,256) at about 0:06, not the ending.
5. **The caption does all the talking.** The reel is silent, so the caption carries the premise, a one-line definition of the exotic fund ("TQQQ, which aims for 3x the daily move of that same index"), both final values, the multiple ("Up 7.34x") and a credibility line ("That's not a typo — verified against Direxion's own official fund performance data (they run SOXL)").
6. **Leverage pairings did better than plain index pairings (n = 3).** QQQ vs TQQQ: 322,339 plays and 136 comments (the most comments of all 12 reels). VOO vs SOXL: 301,112 plays and 1.8K likes (the most likes). QQQ vs SPY, two plain index funds: 276,471 plays and only 23 comments.
7. **His biggest reel is a copied trend template, and his own remake of it flopped.**
   - "How to be financially free (in 5 steps)" (983,900 plays, 36.3x his then-median of 27.1K per the earlier search) is a 43.9 s talking head in a home studio: a white title card, an empty "1. to 5." list on the left, and each step typed as a formula that snaps to its answer ("1. $6,000 *.55" then "1. $3,300"). It is voiced and ends "Save this for your next paycheck."
   - An earlier search also found a second IG post with the same caption at 942.8K (23.2x his then-median of 40.6K): https://www.instagram.com/reel/DcCU-RKD0Fz/ (earlier search; not watched).
   - The same template appeared as 16 posts from 13 creators, Jake included, in one 90-day window (earlier search). Other creators' copies reached up to 1.7M (@reallysimas). His Aug 30 remake ("How To Be Financially Free (in 4 steps)", car-interior b-roll, 35 s) got **14,232 plays, 0.29x the median and the lowest on the account (check)**. So the 5-steps reach belongs to the trend, not to Jake's look.
8. **A third maths format, the text table over b-roll, is middling on IG.** "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN / Using the 4% rule:" (a 5-row "$X/mo → $Y invested" table over a canyon selfie, 6 s) got 64,190 plays (1.31x). The TikTok account @jacobdoesmoney2 posted a sibling table ("How Long $1 Million Actually Lasts", gym b-roll, 6 s, music only) at 1.2M (53.4x, earlier search), but qualification could not confirm that account is the same person.

---

## 1. Videos watched

| # | Title (IG caption opening) | Plays | Likes | Comments | Length (vidIQ) | Posted | Ratio to 12-reel median (check) | URL |
|---|---|---|---|---|---|---|---|---|
| 1 | How to be financially free (in 5 steps), % of monthly net. Caption: "These percentages come off your monthly net income, so what actually lands in your account after tax..." (earlier search) | 983,900 (earlier search; not in the 12-reel window) | unknown | unknown | 43.9 s | unknown (before 08-30) | 20.2x (check) | https://www.instagram.com/reel/DcWOomPDl9Y/ |
| 2 | "Two people each invest $10,000 in the same index, the Nasdaq-100. One buys QQQ. The other buys TQQQ ..." | 322,339 | 1K | 136 | 11.0 s | 2026-09-15 | 6.60x | https://www.instagram.com/reel/DdUZ5K1gGlc/ |
| 3 | "$10K in VOO 10 years ago = $41,697. $10K in SOXL (3x leveraged semis) = $439,737. ..." | 301,112 | 1.8K | 44 | 11.0 s | 2026-09-05 | 6.17x | https://www.instagram.com/reel/Dc6u8k2lIBX/ |
| 4 | "Two people each invest $10,000 ten years ago. One buys QQQ, the Nasdaq-100. The other buys SPY ..." | 276,471 | 834 | 23 | 11.0 s | 2026-09-09 | 5.66x | https://www.instagram.com/reel/DdFHnhtCeLw/ |

Why these four:
- #1 and #2 are the two approved best finance-math shorts (the biggest breakout, and the biggest series entry).
- #3 and #4 complete the series and were added to test the caption-vs-screen conflict found in #2 (see finding 4). Without them, the QQQ ledger could not be cross-checked.
- Not watched: the 4% table (64,190) and the fund-fee tier list (109,854). Their covers are described in section 2.

---

## 2. Catalogue: the 12 reels returned and their hook formulas

Source: 1 x `vidiq_ig_profile_reels` (handle "jacobdoesmoney"), 2026-10-07. Order as returned (no pinned reels this time, so it is newest first). Plays are exact as returned; likes are as rounded by the tool. "FM" = finance maths. Ratio = plays divided by the 12-reel median of 48,822 **(check)**. On-screen header text is read from the 203x360 cover thumbnails, so small text may be misread.

| Shortcode | Plays | Likes | Comments | Like rate (check) | Length | Posted | Ratio (check) | On-screen header (from cover) | Caption opening (as returned, truncated by the tool) | FM |
|---|---|---|---|---|---|---|---|---|---|---|
| DdUZ5K1gGlc | 322,339 | 1K | 136 | 0.31% | 11 s | 09-15 | 6.60x | "2 people invest $10,000 / 10 years ago" + QQQ "Nasdaq-100" vs TQQQ "3x Daily" | "Two people each invest $10,000 in the same index, the Nasdaq-100. One buys QQQ. The other buys TQQQ, which aims for 3x the daily move of that same index. Ten years later. QQQ: $10,000 to $73,406. Up ..." | **yes (series)** |
| DdPqzyFjKT9 | 33,454 | 351 | 35 | 1.05% | 10 s | 09-13 | 0.69x | "Growth ETFs" (talking head, studio) | "Bad, Good and Amazing ETFs ranked for buying and holding. This is the cheat sheet I wish I had when i first started investing. Save this for later, and share this with someone who could use this chea..." | no (tier list) |
| DdKg1mQDKbB | 64,190 | 209 | 31 | 0.33% | 6 s | 09-11 | 1.31x | "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN / Using the 4% rule:" + 5-row table, over canyon selfie b-roll | "Most people think retiring early means making millions every year. It doesn't. It means building enough invested assets that your portfolio can pay your bills. Using the 4% rule: $750K invested = ..." | yes |
| DdHXBCPk3J0 | 25,890 | 270 | 68 | 1.04% | 9 s | 09-10 | 0.53x | "6 ETFs to build a complete portfolio / (starting from $0)" (at a laptop) | "Most people think investing starts with picking the right stock. It doesn't — it starts with picking the right building blocks. Six ETFs cover almost everything a portfolio needs: one for US growth, ..." | no |
| DdFHnhtCeLw | 276,471 | 834 | 23 | 0.30% | 11 s | 09-09 | 5.66x | "2 people invest $10,000 / 10 years ago" + QQQ "Nasdaq-100" vs SPY "S&P 500" | "Two people each invest $10,000 ten years ago. One buys QQQ, the Nasdaq-100. The other buys SPY, the plain S&P 500. QQQ: $10,000 to $73,406. Up 7.34x. SPY: $10,000 to $41,712. Up 4.17x. This is not ..." | **yes (series)** |
| Dc_8Zs5CB4l | 22,190 | 128 | 18 | 0.58% | 10 s | 09-07 | 0.45x | "Safe Dividends" / "BAD" + AMC logo (talking head) | "Bad, Good and Amazing stocks to buy and hold. This is the cheat sheet I wish I had when i first started investing. Save this for later, and share this with someone who could use this cheat sheet too...." | no (tier list) |
| Dc9aU4XiMVh | 14,420 | 125 | 55 | 0.87% | 9 s | 09-06 | 0.30x | "Where the Smart Money Is Going in 2026. Don't miss it." (walking shirtless on a forest boardwalk) | "Most investors chase stocks. Smart investors follow capital. Every year, big money rotates into a handful of sectors before the headlines catch up. For 2026, five of them stand out — energy, cybersecu..." | no |
| Dc6u8k2lIBX | 301,112 | 1.8K | 44 | 0.60% | 11 s | 09-05 | 6.17x | "2 people invest $10,000 / 10 years ago" + VOO "S&P 500" vs SOXL "Semis 3x" | "$10K in VOO 10 years ago = $41,697. $10K in SOXL (3x leveraged semis) = $439,737. That's not a typo — verified against Direxion's own official fund performance data (they run SOXL), which reports a ..." | **yes (series)** |
| Dc4LJsLlfTZ | 20,682 | 197 | 7 | 0.95% | 10 s | 09-04 | 0.42x | "Safe Dividends" (talking head) | "Most investors chase yield and end up walking into dividend cuts. The key to building reliable passive income is knowing how to balance safety, compound growth, and monthly cash flow. Watch until the ..." | no (tier list) |
| DczO0aXCAqy | 109,854 | 832 | 52 | 0.76% | 10 s | 09-02 | 2.25x | "S&P 500 ETFs" / "BAD" + SPY card (talking head) | "You're probably overpaying for at least one of these. Same index. Same holdings. Same job. The only difference is the fee — and some funds charge 4–10x more than the identical alternative sitting rig..." | borderline (fee tier list; counted as maths at qualification) |
| Dctd5Snh88g | 80,893 | 207 | 107 | 0.26% | 74 s | 08-31 | 1.66x | "My $2M portfolio just got exposed" + brokerage balance card "$2,053,555.30" | "My $2 million portfolio just got picked apart by an AI, and it told me exactly what to change to retire by 40. I hold three ETFs across two brokerages: VOO, SMH, and AIS. That bet built most of this ..." | no (portfolio review) |
| Dcq78t3E-4_ | 14,232 | 179 | 2 | 1.26% | 35 s | 08-30 | 0.29x | "How To Be Financially Free / (in 4 steps)" + "1. $6,000 / 2. / 3. / 4." over car-interior b-roll | "These percentages come off your monthly net income, so what actually lands in your account after taxes, not your gross paycheck. The remaining 15% ($900 on a $6k income) goes toward long-term investi..." | yes (N-steps template, remake) |

Medians **(check)**: 48,822 for all 12; 25,890 for the 9 non-series reels; 299,974 mean for the 3 series reels. Total of the 12: 1,285,727 plays; the 3 series reels: 899,922 (70%).

### 2.1 Hook formulas, ranked by plays

| Formula | Example (verbatim) | Plays | Maths? |
|---|---|---|---|
| **A. Copied N-steps budget template:** "How to be financially free (in [N] steps)" + an empty numbered list + "$[income] *.[ratio]" per step | "How to be financially free (in 5 steps)"; remake "How To Be Financially Free (in 4 steps)" | 983,900 and 942,800 (earlier search; both 5 steps); 14,232 (4 steps, 08-30) | yes |
| **B. Clone duel, same money, two funds:** "2 people invest $10,000 / 10 years ago" + [TICKER] "[plain-English label]" vs [TICKER] "[label] ⚡" | QQQ "Nasdaq-100" vs TQQQ "3x Daily" | 322,339 | yes |
| | VOO "S&P 500" vs SOXL "Semis 3x" | 301,112 | yes |
| | QQQ "Nasdaq-100" vs SPY "S&P 500" | 276,471 | yes |
| **C. "You're overpaying" fee tier list:** category title + "BAD" + fund logo; caption "You're probably overpaying for at least one of these. Same index. Same holdings. Same job. The only difference is the fee" | "S&P 500 ETFs" / "BAD" | 109,854 | borderline |
| **D. Exposé of his own number:** "My $2M portfolio just got exposed" + a brokerage balance card ("$2,053,555.30") | "My $2 million portfolio just got picked apart by an AI, and it told me exactly what to change to retire by 40." | 80,893 | no |
| **E. Threshold table over b-roll:** "HOW MUCH YOU NEED INVESTED TO NEVER WORK AGAIN / Using the 4% rule:" + "$2,500/mo → $750,000 invested" ... "$15,000/mo → $4,500,000 invested" + "Most people think freedom is a Lamborghini." + "(Read caption for a full breakdown 👇)" | as left | 64,190 | yes |
| **F. Bad / Good / Amazing tier list** (talking head, studio, logos pop over his head) | "Growth ETFs"; "Safe Dividends" | 33,454; 22,190; 20,682 | no |
| **G. Build-a-portfolio listicle** | "6 ETFs to build a complete portfolio (starting from $0)" | 25,890 | no |
| **H. Insider-trend tease** | "Where the Smart Money Is Going in 2026. Don't miss it." | 14,420 | no |

Recurring devices across formulas:
- **Caption openers.** The 3 series reels open the caption with the premise and a number ("Two people each invest $10,000...", "$10K in VOO 10 years ago = $41,697."). Four of the 9 others open with a "Most people think X. It doesn't." / "Most investors chase X" contrarian line (E, G, H and the 09-04 "Safe Dividends" reel). None of those four passed 64,190 plays.
- **Save-and-share CTA in the caption** on the tier lists ("Save this for later, and share this with someone who could use this cheat sheet too"). The series reels' captions, as far as the tool shows them, have no CTA.
- **The ⚡ emoji marks the leveraged fund** in both leverage duels ("3x Daily ⚡", "Semis 3x ⚡").
- **Plain-English sub-labels under tickers** ("Nasdaq-100", "S&P 500", "3x Daily", "Semis 3x"): a viewer who does not know the ticker still gets the bet.

---

## 3. Look profile (the series' recurring visual system)

Built from the 3 series walkthroughs plus my reading of their covers. Where vidIQ's jobs disagree, both readings are given.

- **Footage:** one locked-off phone shot, daylight, outdoors. Off-white or light-grey vertical siding fills the background; a strip of dark mulch or gravel runs along the bottom edge. The same man (bald, muscular) is filmed twice and composited side by side, full body from head to shoes, each figure taking about half the width. No divider line is visible on the covers. 0 cuts, 0 camera moves.
- **Costume code (3 of 3):** fitted olive polo, smiling, flexing or clapping = the fund that wins. Black hoodie with a large mirrored "DKNY" print (the footage is mirrored; one vidIQ job misread it as "OAKLEY"), worried or tugging at the hoodie = the fund that loses. Dark grey shorts on both.
- **Title box:** "2 people invest $10,000" / "10 years ago", two lines in black bold sans-serif, sentence case, on a white rounded box with a soft shadow, top centre (from the cover: about the top 8-20% of the frame). On the cover the second line's box is narrower than the first, which looks like the native in-app text style with a background (my reading; check). Identical wording on all 3.
- **Ticker labels:** a very heavy, rounded "bubble" display font, all caps, at about a quarter of the way down, one centred over each head. **Left ticker lime green, right ticker yellow**, both with a black outline (vidIQ also reports a 3D shadow). One job described them as coloured boxes with white text; the covers show coloured letters with a black outline.
- **Sub-labels:** a short plain-English label plus one emoji under each ticker: "Nasdaq-100 💻" (one job read 🖥️), "3x Daily ⚡", "S&P 500 📊" or "S&P 500 📈", "Semis 3x ⚡". vidIQ calls them black; on the covers they look white with a dark outline (my reading).
- **Numbers:** a year-by-year **ledger**, not a chart or counter. Rows read "YYYY: $NN,NNN", stacked down each figure's chest, both sides popping in at the same moment on the beat, from 2017 to 2025 (9 rows reported) in about 9 seconds. Heavy condensed sans-serif with a black outline or drop shadow. Colour: one job read white years with green values on both sides; another read values in the side's colour (green left, yellow right). Unresolved.
- **Acting:** physical reactions synced to the rows. Flexing and clapping in bull years; head-holding, looking down or head-scratching at the 2022 row. In the leverage duels the emotional positions flip at 2022 (vidIQ).
- **Audio:** music only, no voice, no SFX. vidIQ describes an upbeat or chill hip-hop/lo-fi instrumental; the track name is **unknown**.
- **Ending and loop:** the full table stays on screen with the final totals at about 0:08-0:11, then the reel restarts on the empty title card. vidIQ rates all three as loopable. No on-screen or spoken CTA.
- **Palette:** natural daylight neutrals (grey wall, black, olive, skin) plus exactly two accent colours, lime green and yellow, plus the white title box. No brand colour, no logo, no watermark visible on the covers.

**The breakout's look (different format, for contrast):** indoor home studio with warm tungsten light, a fiddle-leaf fig on the left, a dark wood desk, a Shure SM7B-style microphone in the lower right. He sits right of centre in the olive polo holding a blue pen. A white rounded card at the top reads "How to be financially free" / "(in 5 steps)"; a black, heavy bold "1." to "5." list sits down the left edge. Each step appears as a typed formula and then snaps to the answer, with soft pop or click SFX and a faint beat under his voice. One take, 0 cuts, 43.9 s.

---

## 4. Walkthroughs (my structured notes; vidIQ's full text is in Appendix C)

### 4.1 "How to be financially free (in 5 steps)", 983,900 plays (earlier search), 43.9 s

- **Frame 1 (0.0 s):** a white rounded pill at the upper centre: "How to be financially free" (bold black sans) / "(in 5 steps)" (regular weight). Down the left edge: "1." "2." "3." "4." "5." (heavy bold black sans). He sits slightly right of centre, looking into the lens, holding a blue click-pen up toward the list. Studio background as in section 3.
- **First 3 s, spoken (vidIQ):** "Number one, take your monthly income and multiply by 0.55. That's the maximum..."
- **First 3 s, on screen:** 0:00 the title and empty list; 0:01 "1. $6,000 *.55"; 0:03 "1. $3,300".
- **Number device:** typed formula ("$6,000 *.55") that snaps to its result ("$3,300") in the same list slot as he states what it is for.
- **The maths, in order (all on an example $6,000 monthly net):**
  1. Essentials: $6,000 *.55 = $3,300 (housing, groceries, commute; "That's the maximum").
  2. Guilt-free spending: $6,000 *.05 = $300.
  3. Debt payoff or extra investing: $6,000 *.1 = $600.
  4. Short-term savings: $6,000 *.15 = $900 (house down payment, car, wedding).
  5. Long-term investing: $6,000 *.15 = $900.
  - Check: 55 + 5 + 10 + 15 + 15 = 100%; $3,300 + $300 + $600 + $900 + $900 = $6,000 **(check)**.
- **Beats:** 0:00-0:01 hook; 0:01-0:08 step 1 (first payoff and biggest number, $3,300, at 0:03); 0:08-0:15 step 2; 0:15-0:23 step 3; 0:23-0:32 step 4; 0:32-0:41 step 5; 0:41-0:44 outro ("Your money has a job instead of just disappearing") and CTA.
- **Ending and CTA (spoken):** "Save this for your next paycheck." vidIQ rates loopability high.
- **Comment and save drivers (vidIQ):** a reusable template people save for payday; debate over whether 55% covers high-cost rent and whether 5% fun money is enough.
- **Why it worked (my read of the evidence):** the hook is a promise plus a visible count (an empty 5-slot list), and the first calculation starts inside the first second. But the same caption and list were posted by many other creators in the same window, and his own 4-step remake got 14,232, so the format's reach cannot be credited to his look.

### 4.2 "2 people invest $10,000 10 years ago: QQQ vs TQQQ", 322,339 plays, 11.0 s

- **Frame 1 (0.0 s):** the series layout (section 3). Top: "2 people invest $10,000" / "10 years ago". Left: "QQQ" (lime green) / "Nasdaq-100 🖥️", the hoodie character "slightly stressed/neutral, adjusting his hoodie". Right: "TQQQ" (yellow) / "3x Daily ⚡", the polo character "smiling confidently, clapping/rubbing his hands together".
- **First 3 s, spoken:** none (music only).
- **First 3 s, on screen:** the title and labels; at about 0:01-0:02 "2017: $12,595" (left) and "2017: $18,653" (right); at about 0:03 "2018: $16,161" and "2018: $34,653".
- **The ledger (vidIQ), QQQ / TQQQ:** 2017 $12,595 / $18,653; 2018 $16,161 / $34,653; 2019 $16,521 / $29,755; 2020 $25,077 / $68,857; 2021 $33,936 / $147,306; 2022 $26,395 / $51,878; 2023 $34,006 / $83,429; 2024 $41,769 / $123,837; 2025 $52,458 / $185,551.
- **Beats:** 0:00-0:01 setup; 0:01-0:05 divergence (TQQQ $34K vs $16K by 2018); 0:06-0:07 pain beat (TQQQ $147,306 to $51,878, -64.8% **(check)**); 0:08-0:10 final payoff and biggest number ($185,551 vs $52,458, 3.54x **(check)**).
- **Ending:** no CTA; the spread is left on screen. Loops back to the title.
- **Caption:** "Two people each invest $10,000 in the same index, the Nasdaq-100. One buys QQQ. The other buys TQQQ, which aims for 3x the daily move of that same index. Ten years later. QQQ: $10,000 to $73,406. Up ..." (truncated by the tool). The caption's $73,406 does not appear in vidIQ's reading of the screen (finding 4).
- **Engagement:** 136 comments, the most of the 12 reels. vidIQ expects debate over holding 3x funds long term and over the 2022 drawdown. The comment content itself was not pulled, so what people actually argued about is **unknown**.

### 4.3 "2 people invest $10,000 10 years ago: VOO vs SOXL", 301,112 plays, 11.0 s

- **Frame 1 (0.0 s):** same layout. Left: "VOO" (lime green) / "S&P 500 📈", hoodie, "looking slightly up/concerned while pulling at his hoodie". Right: "SOXL" (yellow) / "Semis 3x ⚡️", polo, "smiling confidently with arms ready".
- **First 3 s, spoken:** none ("Chill instrumental hip-hop beat").
- **First 3 s, on screen:** "2017: $11,591" vs "2017: $24,211"; "2018: $13,822" vs "2018: $41,165".
- **The ledger (vidIQ), VOO / SOXL:** 2017 $11,591 / $24,211; 2018 $13,822 / $41,165; 2019 $14,303 / $38,459; 2020 $17,006 / $60,263; 2021 $22,848 / $172,256; 2022 $20,057 / $46,992; 2023 $23,476 / $88,647; 2024 $29,084 / $112,632; 2025 $34,715 / $96,391.
- **Beats:** 0:00-0:01 hook; 0:02-0:06 the leveraged bull run (SOXL to $172,256 by 2021; "The SOXL character flexes; the VOO investor looks unimpressed"); 0:06-0:07 the crash (SOXL to $46,992, -72.7% **(check)**); 0:08-0:10 final payoff ($96,391 vs $34,715, 2.78x **(check)**).
- **Biggest number:** on vidIQ's reading, the biggest on-screen number is the 2021 peak at about 0:06, not the ending. The caption's $439,737 is not in vidIQ's reading.
- **Ending:** "VOO creator looking steady, SOXL creator holding fists clenched". No CTA.
- **Caption:** "$10K in VOO 10 years ago = $41,697. $10K in SOXL (3x leveraged semis) = $439,737. That's not a typo — verified against Direxion's own official fund performance data (they run SOXL), which reports a ..." (truncated). The only series caption that opens with the result rather than the premise, and the only one with a sourcing claim.
- **Engagement:** 1.8K likes, the most of the 12 reels; 44 comments.

### 4.4 "2 people invest $10,000 10 years ago: QQQ vs SPY", 276,471 plays, 11.0 s

- **Frame 1 (0.0 s):** same layout, but the winner is now on the **left**: "QQQ" (green) / "Nasdaq-100 💻" in the olive polo, "smiling confidently"; "SPY" (yellow) / "S&P 500 📊" in the DKNY hoodie.
- **First 3 s, spoken:** none.
- **First 3 s, on screen:** "2017: $12,595" (green text, black outline) vs "2017: $11,579" (yellow text, black outline) at about 0:01; "2018: $16,161" vs "2018: $13,793" at about 0:02.
- **The ledger (vidIQ), QQQ / SPY:** 2017 $12,595 / $11,579; 2018 $16,161 / $13,793; 2019 $16,521 / $14,258; 2020 $25,077 / $16,936; 2021 $33,936 / $22,729; 2022 $26,395 / $19,933; 2023 $34,006 / $23,306; 2024 $41,769 / $28,843; 2025 $52,458 / $34,392. The QQQ column is identical to the QQQ column in 4.2.
- **Beats:** 0:00-0:01 hook; 0:01-0:03 early lead; 0:04-0:06 acceleration ($33.9K vs $22.7K); 0:06-0:07 drawdown beat (both react to 2022); 0:08-0:10 final ($52,458 vs $34,392; gap $18,066 **(check)**).
- **Ending:** "Full 2017–2025 comparison table visible across both chests with the final totals lingering." CTA: none, an implicit QQQ-vs-SPY debate.
- **Caption:** "Two people each invest $10,000 ten years ago. One buys QQQ, the Nasdaq-100. The other buys SPY, the plain S&P 500. QQQ: $10,000 to $73,406. Up 7.34x. SPY: $10,000 to $41,712. Up 4.17x. This is not ..." (truncated).
- **Engagement:** 834 likes, 23 comments, the weakest series entry. It is the only duel with no leveraged fund and no crash big enough to flip the characters (QQQ -22.2% and SPY -12.3% in 2022 **(check)**).

---

## 5. Look vs hook: what this account shows (series only)

| | Clone-duel series (3 reels) | 5-steps breakout | 4-step remake |
|---|---|---|---|
| Plays | 276,471-322,339 | 983,900 (+942,800 second post) | 14,232 |
| Length | 11.0 s | 43.9 s | 35 s |
| Voice | none (music) | talking, pen, studio | unknown (not watched) |
| Frame 1 | title + two tickers + two costumes; no numbers | title card + empty 1-5 list + face | title + "1. $6,000" + empty 2-4, car b-roll (cover) |
| First number | about 0:01 | 0:01 (formula), 0:03 (result) | unknown |
| Number device | year-by-year ledger, both sides at once | formula that snaps to its answer | unknown |
| Reversal | 2022 drawdown row at 0:06-0:07 | none | unknown |
| Biggest number | final row at 0:08-0:10 (or the 2021 peak on SOXL, per vidIQ) | first step ($3,300) | unknown |
| CTA | none; caption explains | "Save this for your next paycheck." | unknown |
| Owned by Jake? | yes; no copies by other creators appear in this project's data | copied template (16 posts, 13 creators) | same template |

What separates the series from his other maths: the duel's frame 1 sets up a **bet** (who wins, and by how much?), and the costumes answer "who" so the ledger only has to answer "how much". The Bad/Good/Amazing tier lists use the same man and stay at 0.42x-0.69x (the fee-focused "overpaying" list reaches 2.25x), so his face alone is not what carries the series.

---

## 6. Implications for Back of the Envelope (from this account only)

- **Format to borrow: the "same money, two choices" duel.** One title that fixes the inputs ("2 people invest $10,000 / 10 years ago"), two named contenders with plain-English sub-labels, and a ledger that fills both sides at once, one row per year, about a row a second, done in 11 s.
- **Frame 1 must hold the whole bet, with zero numbers yet.** Premise, both contenders, and a visual cue of who wins. Jake uses costume (polo = winner, hoodie = loser). A faceless channel would need a substitute cue; whether that works without a person is **unknown** from this account.
- **Put a reversal in the middle.** The 2022 row is where the leveraged side crashes 65-73% and the characters' moods flip. Every Jake duel has it, and the two with the deeper crash did best (n = 3).
- **Pick pairings with a risk twist.** 1x vs 3x drew 136 and 44 comments and the most likes; 1x vs 1x drew 23 comments.
- **Use a ledger, not a chart.** Rows of "YYYY: $NN,NNN" in heavy outlined sans, stacked in the lower-middle of the frame, two accent colours (green left, yellow right) on a neutral background. This is flat, clean text on real footage, the opposite of the kraft-envelope collage.
- **Let the caption carry the explanation and the proof.** Final values, the multiple ("Up 7.34x"), a one-line definition of anything exotic, and a source line ("verified against [issuer]'s own official fund performance data").
- **Do not copy his number mismatch.** Our on-screen final and our caption final should be the same figure, from the same window, stated once. On Jake's reels they differ on every duel (per vidIQ), and nothing in this study shows whether that helped or hurt.
- **Avoid leaning on trend templates for reach.** His 983.9K came from a template that 13 creators (16 posts) were posting in the same window; his own remake did 14,232.

---

## 7. Gaps and unknowns

- **The screen-vs-caption mismatch (finding 4) is unresolved.** Whether a final row exists that vidIQ did not report, or the caption uses another window, is unknown. Scrub DdUZ5K1gGlc, Dc6u8k2lIBX and DdFHnhtCeLw by hand.
- **Ledger value colour** (white-and-green vs side-coloured) differs between jobs.
- **Market data was not checked.** This study had no fund-performance source, so whether either set of numbers matches actual QQQ, TQQQ, SPY, VOO or SOXL returns is unknown.
- **Comment content** was not pulled (no budget), so what the 136 comments on QQQ vs TQQQ argue about is unknown.
- **Saves, shares, reach sources** are not returned by the IG tool.
- **When the series started:** the 12-reel window begins 08-30; earlier entries, if any, are unknown.
- **The 5-steps reel's post date**, likes and comments are unknown (outside the 12-reel window). Whether the 942.8K post (DcCU-RKD0Fz) is a re-upload is unknown.
- **@jacobdoesmoney2** (TikTok, 18.4K followers): qualification could not confirm it is the same person.
- **Music tracks and exact fonts** are unknown.
- The spoken lines are vidIQ watch-job transcriptions; no transcript tool exists for IG.

---

## Appendix A: job log

| Job | Reel | Submitted | Result |
|---|---|---|---|
| job_251a55c3-6643-4d49-9c26-17eb535c7b12 | DcWOomPDl9Y (5 steps) | 2026-10-07, batch 1 | completed (43.9 s) |
| job_ec4cfdf7-aef0-4922-8561-cabdecd1530a | DdUZ5K1gGlc (QQQ vs TQQQ) | 2026-10-07, batch 1 | completed (11.0 s) |
| job_24b1b081-3631-41d5-8883-90ccd4c989eb | Dc6u8k2lIBX (VOO vs SOXL) | 2026-10-07, batch 2 | completed (11.0 s) |
| job_1f875278-7cb6-4f91-95a2-acfa6816aea1 | DdFHnhtCeLw (QQQ vs SPY) | 2026-10-07, batch 2 | completed (11.0 s) |

Catalogue: `vidiq_ig_profile_reels` handle "jacobdoesmoney", 1 call, 12 reels.

## Appendix B: arithmetic checks (mine)

- **5-steps split:** 6,000 x 0.55 = 3,300; x 0.05 = 300; x 0.10 = 600; x 0.15 = 900 (twice). Sum 6,000. Percentages sum to 100.
- **Year-on-year moves implied by vidIQ's ledgers (%, 2017 to 2025, starting from $10,000):**
  - QQQ: +26.0, +28.3, +2.2, +51.8, +35.3, -22.2, +28.8, +22.8, +25.6
  - TQQQ: +86.5, +85.8, -14.1, +131.4, +113.9, -64.8, +60.8, +48.4, +49.8
  - SPY: +15.8, +19.1, +3.4, +18.8, +34.2, -12.3, +16.9, +23.8, +19.2
  - VOO: +15.9, +19.2, +3.5, +18.9, +34.4, -12.2, +17.0, +23.9, +19.4
  - SOXL: +142.1, +70.0, -6.6, +56.7, +185.8, -72.7, +88.6, +27.1, -14.4
- **VOO minus SPY, per row:** 12, 29, 45, 70, 119, 124, 170, 241, 323. A steadily widening gap, consistent with two separate jobs reading two real ledgers.
- **Final multiples on screen:** TQQQ/QQQ 3.54x; SOXL/VOO 2.78x; QQQ - SPY = $18,066.
- **Caption vs screen:** QQQ 73,406 / 52,458 = 1.40; SPY 41,712 / 34,392 = 1.21; VOO 41,697 / 34,715 = 1.20; SOXL 439,737 / 96,391 = 4.56.
- **Caption multiples:** 73,406 / 10,000 = 7.34x and 41,712 / 10,000 = 4.17x, both as stated. SOXL/VOO in the caption: 10.55x.
- **4% table (cover):** 750,000 x 4% / 12 = 2,500; 1,500,000 = 5,000; 2,250,000 = 7,500; 3,000,000 = 10,000; 4,500,000 = 15,000. All rows consistent.
- **Catalogue:** median of 12 = 48,822; median of the 9 non-series = 25,890; series total 899,922 of 1,285,727 = 70.0%. The 5-steps reel's 983,900 = 20.2x the current 12-reel median; the 4-step remake = 0.29x.

## Appendix C: vidIQ watch walkthroughs (verbatim)

### C.1 DcWOomPDl9Y: "How to be financially free (in 5 steps)" (durationSeconds 43.908)

Here is a complete analysis of the video based on your custom instructions:

---

### 1) FRAME 1 (0.0 s) Breakdown
* **Layout & Composition:** Vertical 9:16 framing. The speaker sits slightly right of center, looking directly into the lens. A prominent hook card is pinned at the upper middle, while a vertical numbered list (1 to 5) sits along the left edge.
* **On-Screen Text:**
  * **Header Card (Upper Center):** 
    * Line 1: `How to be financially free` (Bold, sans-serif, black text inside a solid white rounded pill/card with soft shadow).
    * Line 2: `(in 5 steps)` (Regular/medium weight, sans-serif, black text, centered below line 1 within the same white card).
  * **Sidebar List (Upper-Left to Mid-Left):**
    * `1.`
    * `2.`
    * `3.`
    * `4.`
    * `5.` (All black, heavy bold sans-serif font).
* **Subject & Props:** A bald, muscular man in an olive-green polo shirt holds a blue click-pen upright between his fingers, gesturing toward the text list. A Shure SM7B microphone is visible in the lower right foreground.
* **Background:** A softly lit modern interior office setup with warm accent lighting, a dark wooden shelf/desk, and a houseplant (Ficus lyrata/fiddle-leaf fig) on the left.

---

### 2) First 3 Seconds (Verbatim)
* **Spoken Audio:** *"Number one, take your monthly income and multiply by 0.55. That's the maximum..."*
* **On-Screen Text:** 
  * At 0:00: `How to be financially free (in 5 steps)` + `1.`, `2.`, `3.`, `4.`, `5.`
  * At 0:01: `1. $6,000 *.55`
  * At 0:03: `1. $3,300`

---

### 3) Visual System Across the Video
* **Color Palette:** Warm neutral tones (earthy greens, dark wood, warm tungsten rim light, clean white graphic cards with black typography, accent blue pen).
* **Typography:** Clean, modern geometric sans-serif (resembling Inter/Helvetica Bold). Black text on high-contrast white rounded cards or plain black text directly overlaid on the lighter background wall.
* **Number Display Style:** Typed, instant pop-on digital text. Formula appears first (e.g., `$6,000 *.55`), then instantly snaps to the final dollar amount (e.g., `$3,300`) as he states the purpose.
* **Motion & Transitions:** Single continuous take (no jump cuts). Dynamic motion comes entirely from natural hand gestures, facial expressions, and rapid on-screen text overlays matching the spoken rhythm.
* **Cuts per 10s:** 0 cuts (continuous 44-second single-take delivery).
* **Music & SFX:** Crisp, clean studio podcast voiceover tone; subtle low-profile background beat; soft pop/click sound effects synced to text reveals.

---

### 4) The Math & Calculations (In Chronological Order)
All calculations assume a baseline monthly income example of **$6,000**:

1. **Step 1 (Essentials - 55%):**
   * *Formula Shown:* `1. $6,000 *.55`
   * *Result Shown:* `1. $3,300` (Max for housing, groceries, commute).
2. **Step 2 (Guilt-Free Spending - 5%):**
   * *Formula Shown:* `2. $6,000 *.05`
   * *Result Shown:* `2. $300` (Fun/guilt-free money).
3. **Step 3 (Debt Payoff or Extra Investing - 10%):**
   * *Formula Shown:* `3. $6,000 *.1`
   * *Result Shown:* `3. $600` (Debt elimination or investment acceleration).
4. **Step 4 (Short-Term Savings - 15%):**
   * *Formula Shown:* `4. $6,000 *.15`
   * *Result Shown:* `4. $900` (House down payment, car, wedding).
5. **Step 5 (Long-Term Wealth/Investing - 15%):**
   * *Formula Shown:* `5. $6,000 *.15`
   * *Result Shown:* `5. $900` (Retirement/long-term wealth compounding).

*(Total allocation: 55% + 5% + 10% + 15% + 15% = 100% / $3,300 + $300 + $600 + $900 + $900 = $6,000).*

---

### 5) Structure & Beat Breakdown
* **0:00 - 0:01 | The Hook:** "How to be financially free (in 5 steps)" visual and verbal prompt.
* **0:01 - 0:08 | Step 1 (First Payoff):** Needs/Essentials calculation (`$3,300` is revealed at 0:03, which is also the largest single number).
* **0:08 - 0:15 | Step 2:** Guilt-free personal spending (`$300`).
* **0:15 - 0:23 | Step 3:** Debt payoff/surplus investing (`$600`).
* **0:23 - 0:32 | Step 4:** Short-term goals savings (`$900`).
* **0:32 - 0:41 | Step 5:** Long-term wealth creation (`$900`).
* **0:41 - 0:44 | Outro & CTA:** Final mindset anchor (*"Your money has a job instead of just disappearing"*) and save-prompt.
* **Loopability:** High; the ending CTA flows smoothly back into the opening list template.

---

### 6) Ending and CTA
* **Spoken CTA:** *"Save this for your next paycheck."*
* **Engagement Drivers:**
  * **Saves:** High utility template with exact percentages that viewers need to reference later when their paycheck actually arrives.
  * **Comments/Shares:** Prompts debate on percentage feasibility (e.g., whether 55% is realistic for high-cost-of-living rent, or whether 5% is enough for fun money).

---

### 7) Key Success Drivers

#### What Makes the LOOK Work:
1. **Clean Visual Hierarchy:** The persistent left-aligned list gives viewers an intuitive roadmap, reducing cognitive load as each slot is filled in real time.
2. **High-Authority Setting:** Professional studio microphone, crisp depth of field, and warm rim lighting immediately establish financial credibility.
3. **Dynamic Prop Interaction:** Holding and gesturing with the pen keeps the viewer's eye anchored near the text overlays, making the video feel like a personal 1-on-1 whiteboard coaching session.

#### What Makes the HOOK Work:
1. **Universal Pain/Aspiration:** "How to be financially free" targets a universal high-intent desire.
2. **Clear Constraint Promise:** Adding `(in 5 steps)` creates an immediate open loop that feels manageable and quick to consume.
3. **Zero Fluff Delivery:** Begins calculation #1 within the first single second, delivering immediate value before the viewer can swipe away.

---

### C.2 DdUZ5K1gGlc: "2 people invest $10,000 10 years ago", QQQ vs TQQQ (durationSeconds 11.006)

Here is the complete analysis of the video based on your custom instructions:

---

### 1) FRAME 1 (0.0 s): Look & Layout
* **Layout:** Vertical 9:16 split comparison featuring the same creator playing two distinct characters side-by-side against an identical neutral vertical shiplap/panel siding backdrop.
* **Top Header Card (Top Center):** 
  * White rounded pill container.
  * Text: `2 people invest $10,000` (Line 1) / `10 years ago` (Line 2).
  * Font: Sans-serif, bold, black, title case.
* **Left Column Column Header (0.0s):**
  * Top Badge: Green rounded rectangle with green outline, white rounded bold sans-serif text: `QQQ`.
  * Subtitle: Black sans-serif bold text: `Nasdaq-100 🖥️`.
* **Right Column Column Header (0.0s):**
  * Top Badge: Yellow rounded rectangle with yellow outline, dark sans-serif text: `TQQQ`.
  * Subtitle: Black sans-serif bold text: `3x Daily ⚡`.
* **People/Poses:**
  * **Left Side:** Bald man wearing a black oversized hoodie (`DKNY` print) and grey shorts looking slightly stressed/neutral, adjusting his hoodie.
  * **Right Side:** Same bald man wearing a fitted olive green polo shirt and grey shorts, smiling confidently, clapping/rubbing his hands together.
* **Background:** Light grey/off-white vertical wooden slat wall with a line of dark mulch/pebbles at the base.

---

### 2) First 3 Seconds: Audio & On-Screen Text
* **Spoken Words (Audio):** No spoken voiceover; an upbeat hip-hop/lo-fi electronic instrumental beat plays continuously (`0:00 - 0:10`).
* **On-Screen Text Verbatim (0:00 – 0:03):**
  * Top Header: `2 people invest $10,000` / `10 years ago`
  * Left: `QQQ` / `Nasdaq-100 🖥️`
  * Right: `TQQQ` / `3x Daily ⚡`
  * At ~0:01–0:02:
    * Left reveals: `2017: $12,595` (White year, Green bold value)
    * Right reveals: `2017: $18,653` (White year, Green bold value)
  * At ~0:03:
    * Left reveals: `2018: $16,161`
    * Right reveals: `2018: $34,653`

---

### 3) Visual System Across the Video
* **Color Palette:** Neutral outdoor palette (slate grey, khaki olive, black) contrasted with bright UI badges (Kelly Green for QQQ, Bright Gold/Yellow for TQQQ, White and Lime Green `#00FF00` text).
* **Typography:** Clean, modern, heavy sans-serif throughout. Headers have high-contrast background containers for instant legibility.
* **Number Display Method:** Stacked list format matching year-by-year chronological progression. Values appear sequentially line-by-line synchronized to music rhythm. Numbers are color-coded in vibrant green to denote financial growth.
* **Motion & Transitions:** Single locked-off camera split-screen (cloned actor). No camera movement or hard cuts (0 cuts per 10 s; continuous synchronized sequence). Physical acting acts as visual transitions/reactions (hand movements, head holding, flexing).
* **Music & SFX:** Steady rhythmic beat driving pacing; no vocal audio track.

---

### 4) The Math & Progression
Starting investment for both: **$10,000**

1. **2017:**
   * QQQ: `$12,595` *(+$2,595 / +25.9%)*
   * TQQQ: `$18,653` *(+$8,653 / +86.5%)*
2. **2018:**
   * QQQ: `$16,161`
   * TQQQ: `$34,653`
3. **2019:**
   * QQQ: `$16,521`
   * TQQQ: `$29,755` *(shows 3x volatility dip)*
4. **2020:**
   * QQQ: `$25,077`
   * TQQQ: `$68,857`
5. **2021:**
   * QQQ: `$33,936`
   * TQQQ: `$147,306` *(major leverage bull run peak)*
6. **2022:**
   * QQQ: `$26,395` *(drawdown)*
   * TQQQ: `$51,878` *(massive leverage drawdown from $147k)*
7. **2023:**
   * QQQ: `$34,006`
   * TQQQ: `$83,429`
8. **2024:**
   * QQQ: `$41,769`
   * TQQQ: `$123,837`
9. **2025 (Final):**
   * QQQ: **`$52,458`** (5.2x total return)
   * TQQQ: **`$185,551`** (18.5x total return)

---

### 5) Structure & Pacing
* **0:00 – 0:01 | The Hook / Setup:** Side-by-side comparison setup: Standard ETF (QQQ) vs. Leveraged 3x ETF (TQQQ).
* **0:01 – 0:05 | Initial Growth & Divergence:** Fast accumulation where TQQQ quickly pulls ahead ($34k vs $16k).
* **0:06 – 0:07 | The Rollercoaster (Pain Beat):** 2021-2022 crash shows TQQQ dropping dramatically from `$147,306` to `$51,878`, illustrating the psychological reality/risk of leveraged decay.
* **0:08 – 0:10 | Final Payoff & Biggest Number:** TQQQ rebounds to the ultimate high of `$185,551` vs QQQ’s `$52,458`.
* **Loopability:** Highly loopable due to the continuous background music and immediate reset from final balances back to the initial hook text.

---

### 6) Ending, CTA & Engagement Drivers
* **Ending:** Resolves on the 2025 cumulative balances without an overt verbal CTA, letting the dramatic spread speak for itself.
* **Comment Triggers:** 
  * Debate on whether holding leveraged ETFs (like TQQQ) long-term is smart or reckless due to volatility decay.
  * Discussion on the 2022 drawdown where TQQQ lost ~65% of its value in one year.
* **Save/Share Triggers:** Valuable visual reference for retail investors looking at Nasdaq-100 compounding returns over an 8–10 year horizon.

---

### 7) Why It Works

#### What Makes the Look Work:
* **Clear Side-by-Side Twin Concept:** Cloning the creator with distinct wardrobe/demeanors (understated hoodie vs. fitted confident polo) immediately establishes a relatable character dynamic.
* **High Contrast, Clean Data Stacking:** Placing crisp white years with bright green dollar values over dark clothing keeps the data perfectly readable on mobile.
* **Minimalist Visual Hierarchy:** Clean pill badges at the top isolate the subject matter immediately without cluttering the screen.

#### What Makes the Hook Work:
* **Concrete Number & Familiar Benchmark:** `$10,000` is the gold standard benchmark figure for personal finance scenarios, creating instant contextual grounding.
* **Well-Known vs. High-Risk Asset Pairing:** Comparing standard index investing (`QQQ`) with a popular high-risk alternative (`TQQQ`) taps directly into investor curiosity.
* **Zero Fluff / Immediate Visual Action:** Data starts generating in under 2 seconds, preventing viewer drop-off before the first beat lands.

---

### C.3 Dc6u8k2lIBX: "2 people invest $10,000 10 years ago", VOO vs SOXL (durationSeconds 11.006)

Here is the detailed analysis of the video based on your instructions:

---

### 1) FRAME 1 (0.0 s): Look & Layout
* **Layout:** Vertical 9:16 split-comparison format. Two clones/versions of the same bald man standing side by side in full body against a neutral, vertical-paneled outdoor wall/fence. 
* **Header Text (Top Center):** 
  * Contained within a rounded white rectangle banner with a drop shadow.
  * Text: `"2 people invest $10,000"` (Line 1) / `"10 years ago"` (Line 2).
  * **Font:** Bold, clean sans-serif (black text).
* **Column Labels (Upper Third):**
  * **Left Side (VOO):**
    * Title: `VOO` (Bold sans-serif, bright lime green with black outline).
    * Subtitle: `S&P 500 📈` (Black sans-serif).
  * **Right Side (SOXL):**
    * Title: `SOXL` (Bold sans-serif, bright yellow with black outline).
    * Subtitle: `Semis 3x ⚡️` (Black sans-serif).
* **Subject/Poses:**
  * **Left:** Wearing a black hoodie ("OAKLEY" backwards/mirrored), black shorts, looking slightly up/concerned while pulling at his hoodie.
  * **Right:** Wearing an olive green polo shirt, black shorts, smiling confidently with arms ready.

---

### 2) First 3 Seconds: Audio & On-Screen Text
* **Spoken Audio:** None (no voiceover).
* **Music / SFX:** Chill instrumental hip-hop beat playing consistently in the background.
* **On-Screen Text (Verbatim):**
  * `2 people invest $10,000 10 years ago`
  * `VOO | S&P 500 📈`
  * `SOXL | Semis 3x ⚡️`
  * *(Appearing sequentially by year)*:
    * `2017: $11,591` vs `2017: $24,211`
    * `2018: $13,822` vs `2018: $41,165`

---

### 3) Visual System Across the Video
* **Color Palette:** 
  * Background: Off-white/light gray vertical wood panel siding.
  * Accents: Vibrant lime green (VOO), bright yellow/gold (SOXL), high-contrast white text overlays.
* **Typography:** Bold sans-serif font across all elements for readability on mobile screens.
* **Number Display Style:** Digital list format. Numbers appear year-by-year in a stacked column list overlaid on the creator's torso/chest.
* **Motion & Transitions:** 
  * Static camera setup.
  * Synchronized physical acting (Right persona flexes and celebrates massive early gains; Left persona reacts stoically or disappointed until the 2022 market crash reverses their emotional positions).
* **Cuts per 10s:** 0 hard camera cuts (continuous shot with layered text/graphics and split-screen acting).
* **Sound Design:** Rhythmic hip-hop beat with no sudden jarring SFX.

---

### 4) The Math: Calculations & Reveal Order

Initial starting value: **$10,000** for each side.

| Year | VOO (1x S&P 500) | SOXL (3x Leveraged Semis) | Reveal Style |
| :--- | :--- | :--- | :--- |
| **2017** | $11,591 | $24,211 | Pop-in text |
| **2018** | $13,822 | $41,165 | Pop-in text |
| **2019** | $14,303 | $38,459 | Pop-in text |
| **2020** | $17,006 | $60,263 | Pop-in text |
| **2021** | $22,848 | **$172,256** *(Peak SOXL)* | Pop-in text |
| **2022** | $20,057 | $46,992 *(Huge 73% drop)* | Pop-in text |
| **2023** | $23,476 | $88,647 | Pop-in text |
| **2024** | $29,084 | $112,632 | Pop-in text |
| **2025** | **$34,715** | **$96,391** | Pop-in text |

---

### 5) Structure & Beat Breakdown
* **0:00 - 0:01 (Hook):** Establishes the premise—two distinct investment strategies starting with the same $10,000 base.
* **0:02 - 0:06 (The Leveraged Bull Run):** SOXL explodes from $10k to $172,256 by 2021. The SOXL character flexes; the VOO investor looks unimpressed.
* **0:06 - 0:07 (The Crash / The Turning Point):** 2022 bear market hits. SOXL plummets from $172k to $46k, showing the brutal volatility of 3x leverage.
* **0:08 - 0:10 (The Final Payoff):** Recovery into 2024–2025 where SOXL finishes nearly 3x higher than VOO ($96.3k vs $34.7k), but highlights the massive psychological rollercoaster.
* **Looping:** Natural seamless loop potential back to the hook.

---

### 6) Ending & Engagement Triggers
* **Ending:** Displays final 2025 balances ($34,715 vs $96,391) with both characters making final gestures (VOO creator looking steady, SOXL creator holding fists clenched).
* **Comment Triggers:** 
  * Leveraged ETF debates (many finance creators warn against holding 3x funds long-term due to volatility decay).
  * High emotional response from people who lost money in the 2022 crash vs. those who held through.
* **Save/Share Triggers:** High utility for retail investors researching leveraged vs. index fund returns over a 10-year horizon.

---

### 7) What Makes It Work

#### What Makes the Look Work (3 Bullets):
* **High Contrast Text:** Bright neon green and yellow column headers stand out instantly against dark clothing and muted backgrounds.
* **Visual Character Archetypes:** Differentiating the same person with contrasting outfits (hoodie vs. fitted polo) instantly builds two opposing investor personalities.
* **Clean Data Layout:** Stacking yearly values directly on the body keeps the eye in the vertical center of the frame.

#### What Makes the Hook Work (3 Bullets):
* **Familiar Baseline ($10,000):** A relatable round number that makes calculating percentage returns intuitive.
* **Popular Asset Clash:** VOO (safe, standard index) vs. SOXL (high-risk, high-reward retail favorite) pits two widely discussed financial strategies directly against each other.
* **Instant Disparity:** By 2017 (second 2), SOXL is already outperforming by over 2x, creating immediate curiosity about how high it will go.

---

### C.4 DdFHnhtCeLw: "2 people invest $10,000 10 years ago", QQQ vs SPY (durationSeconds 11.006)

Here is the comprehensive analysis of the video based on your instructions:

---

### 1) FRAME 1 (0.0 s): Detailed Breakdown

- **Layout / Composition:** Split-screen style with a single actor playing two clones standing side-by-side in a 9:16 vertical frame against a light-grey painted exterior wall and mulch ground.
- **Top Header:** 
  - A white rounded rectangle badge centered at the top.
  - **Text (Verbatim):**  
    `2 people invest $10,000`  
    `10 years ago`
  - **Font Style:** Bold, black, clean sans-serif typeface.
- **Left Side Labels (QQQ):**
  - **Title:** `QQQ` in a large, bold, rounded green bubble font with a black outline and 3D shadow effect.
  - **Subtitle:** `Nasdaq-100 💻` (black bold sans-serif with a desktop computer emoji).
- **Right Side Labels (SPY):**
  - **Title:** `SPY` in a large, bold, rounded yellow bubble font with a black outline and 3D shadow effect.
  - **Subtitle:** `S&P 500 📊` (black bold sans-serif with a bar chart emoji).
- **Subjects / Props:**
  - **Left Subject:** Muscular, bald man in an olive-green polo shirt and dark grey athletic shorts, smiling confidently.
  - **Right Subject:** The same muscular, bald man in a black hooded sweatshirt (`DKNY` logo) and matching dark grey shorts.

---

### 2) First 3 Seconds (Hook)

- **Spoken Words (Audio):**  
  *None.* (Background music only; an upbeat, rhythmic hip-hop/lo-fi beat playing throughout).
- **On-Screen Text (0.0s – 3.0s):**
  - Top Badge: `2 people invest $10,000` / `10 years ago`
  - Left Header: `QQQ` / `Nasdaq-100 💻`
  - Right Header: `SPY` / `S&P 500 📊`
  - **Year 2017 (reveals ~0:01):**
    - Left: `2017: $12,595` (Green text, black outline)
    - Right: `2017: $11,579` (Yellow text, black outline)
  - **Year 2018 (reveals ~0:02):**
    - Left: `2018: $16,161`
    - Right: `2018: $13,793`

---

### 3) Visual System

- **Color Palette:** 
  - **Green Accent (QQQ):** Signifying tech/growth and high returns.
  - **Yellow Accent (SPY):** Signifying stable/moderate broad-market returns.
  - **Neutral Base:** Muted natural lighting, grey wall, black/olive clothing.
- **Typography:** 
  - Headers: Heavy display sans-serif / rounded bubble style with heavy drop-shadows.
  - Data / Yearly Lists: Heavy condensed sans-serif with strong black drop-shadows/outlines for high readability against the background.
- **Number Appearance:** Stacked vertical list that reveals year-by-year in chronological order on beat with the music.
- **Motion & Transitions:** 
  - Single static camera shot throughout (zero camera movement/cuts).
  - Physical acting synchronization: The subjects react physically to the numbers appearing (e.g., clapping, flexing, or head-scratching when a downturn hits in 2022).
- **Pacing / Cuts:** 0 cuts (single continuous shot with synchronized animated text overlays).
- **Music & Sound Effects:** Rhythmic, modern beat that drives the fast, steady revelation of data beats.

---

### 4) The Math & Data Progression

Each figure represents the compounding value of an initial **$10,000** investment:

| Year | QQQ (Nasdaq-100) | SPY (S&P 500) | Visual Reveal Method |
|---|---|---|---|
| **Start** | *$10,000* | *$10,000* | Stated in top banner |
| **2017** | **$12,595** | **$11,579** | Pops in simultaneously on beat |
| **2018** | **$16,161** | **$13,793** | Pops in below previous year |
| **2019** | **$16,521** | **$14,258** | Pops in below |
| **2020** | **$25,077** | **$16,936** | Pops in below (Tech boom gap widens) |
| **2021** | **$33,936** | **$22,729** | Pops in below |
| **2022** | **$26,395** | **$19,933** | Pops in below (Bear market pullback) |
| **2023** | **$34,006** | **$23,306** | Pops in below |
| **2024** | **$41,769** | **$28,843** | Pops in below |
| **2025** | **$52,458** | **$34,392** | Final cumulative sum revealed |

---

### 5) Structure & Beat Breakdown

- **0:00 – 0:01 (Hook):** Establishes the head-to-head comparison premise ($10k invested 10 years ago).
- **0:01 – 0:03 (Early Lead):** First payoff happens as QQQ takes a modest lead by 2018.
- **0:04 – 0:06 (Acceleration):** 2020–2021 bull run demonstrates massive outperformance by QQQ ($33.9k vs. $22.7k).
- **0:06 – 0:07 (Drawdown Beat):** 2022 market drop; both characters react to the dip.
- **0:08 – 0:10 (Final Payoff / Peak Number):** 2025 numbers drop, revealing the peak value of **$52,458** for QQQ vs. **$34,392** for SPY.
- **Loop Potential:** Highly loopable due to the rapid, satisfying data-comparison format and static framing.

---

### 6) Ending, CTA & Engagement Drivers

- **Ending Visual:** Full 2017–2025 comparison table visible across both chests with the final totals lingering.
- **Call to Action (CTA):** Implicit debate prompt (QQQ vs. SPY).
- **Comment / Share Triggers:** 
  - Standard vs. Tech ETF debate (Index fund purists vs. growth stock investors).
  - Discussion on whether QQQ's higher volatility is worth the +$18,000 outperformance.
  - High save-rate value for viewers saving reference financial comparisons.

---

### 7) What Makes It Work

#### What Makes the Look Work:
1. **Clean Clone Split-Screen:** Flawless dual-performance alignment creates an engaging vs. dynamic without visual clutter.
2. **High-Contrast Text Layering:** Bold, colored typography with thick black shadows ensures 100% legibility against the subject's clothing.
3. **Physical Reactions to Data:** Dynamic gestures (flexing during bull years, looking down/concerned during the 2022 dip) add personality to raw data.

#### What Makes the Hook Work:
1. **Universal Financial Comparison:** Pitting the two most popular retail investment vehicles (S&P 500 vs. Nasdaq-100) immediately targets a massive audience.
2. **Tangible Round Number ($10,000):** Using an accessible, round starting amount makes the math instantly relatable and easy to scale mentally.
3. **Instant Visual Promise:** The top title card sets immediate expectations for a rapid, satisfying before-and-after payoff within the first second.

