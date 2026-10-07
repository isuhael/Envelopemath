## 8. The Trap Card (Envelope Puzzle)

**Writer brief:** a 5–8 s money puzzle on the back of an envelope. Frame 1 names the tempting wrong answer and rules it out. The video never gives the answer: it is sealed in a wax-sealed envelope on screen, posted in the pinned comment and opened in a short follow-up post.
**Lane:** Flash (7.5 s puzzle post), plus a 12 s "Opened" answer post within 24 h.
**Series:** **Envelope Puzzle** (the puzzle post) and **Envelope Puzzle: Opened** (the answer post).
**Specs:** `engine/specs/08-trap-card-a.json`, `-b.json`, `-c.json` · **Sheets:** `engine/out/sheets/08-trap-card-{a,b,c}.png` · **Math check:** `teasers/08-trap-card-mathcheck.py`
**Facts checked:** 2026-10-07 by the writer (search-result extracts). The QA pass re-checked the math, the evidence numbers and the calendar claims, but could not re-load the web sources (see the Verification log at the end). Every view count, outlier score and URL in the evidence sections is copied from `research/raw/` or `research/watch/`.

---

### Why it goes viral

**The mechanism: the card rejects your answer before you've finished working it out.**

1. **Pre-emptive negation causes instant dissonance.** The brain does the intuitive sum automatically, and the card has already crossed it out ("The answer is not 300!"). People who fell for it feel caught, people who didn't feel smart, and both groups comment. *(watch/group1-video1, "Why it went viral")*
2. **It takes longer to solve than to watch.** A 5 s card makes people pause and rewatch, which pushes retention past 100%. Instagram counts repeat views (since Apr 21 2025) and YouTube counts a Shorts view on every start or replay (since 2025-03-31), so each rewatch adds reach. *(report 01, §4.2)*
3. **Correction comments drive it.** The caption names the popular wrong answer ("Everyone keeps saying 300… But they're all wrong"), and the comments fill with people defending answers. @anatalksmoney's deliberate rounding ("the math police blew up my comments") got 491.2x the same way. *(raw/ig-tiktok-outliers.md §3; watch/group2-video2)*
4. **It works with no audience.** The riddle / money-puzzle cluster has a **174.4x median outlier**, and posts from accounts under 5K followers have a 174.4x median against 18.6x for 500K+ accounts. @mathsgenius222 got about **660 views per follower**, the most cost-efficient format in the scan. *(raw/ig-tiktok-outliers.md; report 01 exec summary)*
5. **It costs almost nothing to make,** so it can run at a high cadence (Buffer: TikTok views per post keep rising up to 11+ posts a week). *(report 01, §4.4)*

**Evidence**

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| @mathsgenius222 (IG, 14.1K) | Answer without Googling... The answer is not 300! | 9.3M | **522.3x** | 5 s | watched | https://www.instagram.com/reel/Da121CCI8Bh/ |
| Arjun kumar pandit (YT, 45.6K), *format reference, not finance* | ias interview question | 16,207,916 | 302.0x | 4 s | inferred (same channel: 4,460,098 / 96x; 2,875,652 / 21x) | https://www.youtube.com/shorts/FZXl1yPqyiM |
| Riddle Math Zone (YT, 11.8K) | Money Logic Puzzle #shorts #riddlemathzone #maths | 2,791,507 | 48.7x | 5 s | inferred | https://www.youtube.com/shorts/S59hm2Q4-_E |
| ViralDrop (YT, 24.1K) | "Someone explain this math 📊🤔"#money #trending #viral | 1,806,487 | 48.62x | 6 s | inferred | https://www.youtube.com/shorts/HmEJcQrTtb8 |
| @anatalksmoney (TT, 62.5K), *correction-bait mechanic* | when I … said $27/day is $10,000 a year ("math police") | 926.2K | 491.2x | 5.85 s | watched | https://www.tiktok.com/@anatalksmoney/video/7664247808488181023 |
| @quantguild (IG, 32.0K) | If I said to you for every time you got heads... (expected value) | 793.5K | 187.8x | n/a | inferred | https://www.instagram.com/reel/Db_VPOulufP/ |
| @eggfacetips (TT, 1.3K) | If you take $1 ... (The $1 to $400 infinite money) | 744.7K | 174.4x | 39 s | inferred | https://www.tiktok.com/@eggfacetips/video/7664734857204944142 |

---

### How the originals do it

**1. @mathsgenius222, "Answer without Googling... The answer is not 300!" (9.3M, 522.3x, watched).**
One silent 5 s still of lined notebook paper, with four lines: a permission frame ("Answer without Googling...", double underlined), the negation in cyan highlighter ("The answer is not 300 !"), then "500 divided by half / plus 50 is ?".
- **What it nails:** the permission frame turns watching into a test. The negation lands in frame 1. The problem is only two lines with one ambiguous word ("half"), so both readings feel right. The still frame loops seamlessly, and the caption names the popular wrong answer.
- **What it misses:** it is grammar trivia, so the viewer learns nothing about money or about the creator. The answer (1,050) is never given. There is no sound, so it does nothing for a sound-on TikTok viewer. Notebook paper looks like everyone else's. vidIQ's own suggestions were to animate the writing, add a voice-over and add a two-part payoff.

**2. Riddle Math Zone, "Money Logic Puzzle" (2,791,507, 48.7x, 5 s, inferred from metadata).**
It is a 5 s static puzzle card that puts the word "money" in the title and the series in a hashtag (#riddlemathzone). The "IAS interview question" channel uses the same shape: four 4-second trick cards at 16.2M, 4.46M, 2.88M and 791K.
- **What it nails:** it is short enough to force rewatches, and the series identity sits in the title and hashtags.
- **What it misses (judged from metadata only, since the visuals were not watched):** a generic quiz channel builds no finance brand, and nothing indicates real-world stakes or a sourced number. `yt-puzzles-estimation-business.md` P3 adds the caveat that these cards "are not deep math. They work because they are fast to read and quick to argue about."

**3. ViralDrop, "Someone explain this math" (1,806,487, 48.62x, 6 s, inferred).**
The title is a confession that invites correction, on a 6 s money-math clip. It sits in the same "check my math" pattern as Fairy Tanton's hand-written budget ("Someone let me know if I did this math correctly", 1,287,495, 50.73x), which got its comments *because* the working was visible.
- **What it nails:** the viewer becomes the expert. "Explain this" is a genuine question, not vote-bait, so Meta's engagement-bait demotion doesn't apply.
- **What it misses:** the content was not transcribed, so how it resolves is unknown. In the examples that were watched, the answer is never published: mathsgenius never shows 1,050, and Teacherman's penny dilemma (735x) never reveals $5,368,709.12. Unresolved bait erodes trust over a series.

---

### The Envelope Math upgrade

**What we copy:** the 5–8 s runtime, the permission frame ("no calculator."), the **pre-emptive negation in frame 1**, a two-line problem, no answer inside the video, and a hard loop.

**What we improve:**
1. **Money with real stakes and a cited input.** We don't use grammar puzzles. Each trap teaches a rule you can save, and each real number (BLS median pay, S&P 500 closes, the Gatorade bottle size) is cited in the description.
2. **Motion and sound.** The tape hook is already up in frame 0 (it doubles as the thumbnail), the "ENVELOPE PUZZLE" stamp thumps (the sonic logo), the pen writes the question, the red pen circles the "?", and a pencil line shows the tempting math before the red pen catches it. A 23–25-word voice-over carries the sound-on viewer, and burned-in captions carry the sound-off viewer (69% of US adults watch sound-off in public).
3. **Always resolved.** The exact answer is pinned and the **Opened** short goes up within 24 h. That fixes the trust problem of mathsgenius and Teacherman without killing the comment debate on day one.
4. **An honest thing to argue about.** The pinned comment follows the house template, "Exact: X (envelope said ≈ Y, within Z%)", plus one true nuance for the "well actually" crowd: 27-paycheck years, rounded vs exact index closes, "less drink" vs "price per ounce".

**Our own twist, the Sealed Answer that doesn't open.** Below the question sits a wax-sealed envelope (the red "≈" seal) labelled **ANSWER · IN THE PIN**. It wiggles while you think. Above it, a pencil line works the tempting answer and the red pen catches the flaw at about 40% of the runtime (the partial payoff: you learn *why* the obvious answer fails, not what the right one is). At 83% a **RETURN TO SENDER** stamp slams beside the trap line (the verdict), and at 93% the whole envelope **flips over as if to show the answer on the back**. It lands blank and loops to frame 1. The back of the envelope only appears in the next post. This takes the brand's main device, the sealed answer, and holds it back. No other puzzle account in the research has this look.

**Series name:** *Envelope Puzzle* (puzzle post) / *Envelope Puzzle: Opened* (answer post). The postmark carries the number.
**Title template:** `[setup with a number] is NOT [tempting answer] (Envelope Puzzle No. N)`. Answer post: `Opened: [answer], not [tempting answer] (Envelope Puzzle No. N)`.
**Hook template (masking tape):** line 1 = the setup with a concrete number (and a famous noun when there is one); last line = the negation, with **NOT** in red.

**Screen template (all three specs):**

| Zone (y, 1080×1920) | What sits there | Device / op |
|---|---|---|
| 188–412, left | Postmark "No. 08A/B/C", persistent, already drawn in frame 0 (`t` −0.3) | `postmark` |
| 230–360, right | Red rubber stamp **ENVELOPE PUZZLE** (series badge), thump at 0.6 s | `stamp` (t 0.4) |
| 380–660 | The setup and the negation on masking tape, 2 or 3 strips, **fully drawn in frame 0** (`t` −0.5) | `hook` |
| 660–810 | The question in ballpoint ("1 year = $ ?", "To get back: + ? %") | `write` |
| around the "?" | Red-pen circle on the unknown (1.3–1.75 s) | `annotate circle` |
| 800–880 | Red "no calculator." (the permission frame) | `write` |
| 900–970, left | Pencil trap line (the tempting math) + red strike or red correction: **the partial payoff, 2.7–3.1 s (36–41%)** | `write` (pencil) + `annotate strike` / red `write` |
| 870–1000, right | **RETURN TO SENDER** stamp beside the trap line at 6.05 s (thump 6.25 s, 83%): the verdict | `stamp` |
| 1030–1300, right | The Sealed Answer, wax "≈", "ANSWER · IN THE PIN", never opens in this post | `envelope` (`openAt` past the end) |
| 1000–1300, left | **ASSUME:** sticky with the assumption and the source | `sticky` |
| 1320–1480 | Word-highlighted captions | `captions` |
| 7.0–7.5 s | Envelope flips → blank kraft → loop to the full card | `flip` |

**Format-bible devices used:** masking-tape hook, ballpoint working, pencil for the tempting wrong working, red pen (circle on the "?", strike or correction on the trap line), the Sealed Answer, the ASSUME: sticky, the postmark number, verdict stamps (ENVELOPE PUZZLE badge; RETURN TO SENDER on the trap line in the puzzle post and on the struck trap answer in the Opened post, from the lexicon's "a trap"), and the flip.

**The two-post rhythm:** day 1 is the puzzle. The answer goes into the pinned comment and the Opened short goes up 12–24 h later (link each from the other's pinned comment). Every Opened short ends with the next puzzle's sealed envelope sliding in, so the series chains.

**Keeping to our lane:** the trap is a question *we* ask with one tempting wrong answer, with no line-item tallies (#9) and no grading of someone else's claim (#10).

**Trap families to rotate** (keep the template, change the variable): *count traps* (08A: 26 paychecks, not 24), *base traps* (08B, 08C: the percentage is taken from a different starting number), and, for the backlog, *compounding traps* (+10% two years running = +21%) and *sum traps* (the 100 Envelope Challenge totals 1+…+100 = $5,050). Any real-world input in a backlog puzzle is re-sourced at script time.

---

### Teasers

#### 08A: "$2,500 every 2 weeks is NOT $60,000 a year" · *Envelope Puzzle No. 08A*

- **Topic:** paychecks (income). **Lane:** Flash. **Runtime:** 7.5 s puzzle post; Opened post 12 s the next day.
- **Spec:** `engine/specs/08-trap-card-a.json` · **Sheet:** `engine/out/sheets/08-trap-card-a.png`

**Frame-1 hook.** Tape, line 1: **$2,500 EVERY 2 WEEKS**. Tape, line 2: **IS *NOT* $60,000 A YEAR!** ("NOT" in red).
**First spoken line (0.1–1.8 s):** "Twenty-five hundred every two weeks."

**Beat sheet**

| Time | Picture | Sound / VO |
|---|---|---|
| 0.00 | **Frame 0 = full card:** postmark No. 08A and both tape strips already up (`t` −0.5), so the first frame and thumbnail carry "$2,500" and "$60,000" | tape rip; VO "Twenty-five hundred every two weeks." (0.1–1.8) |
| 0.40 | **ENVELOPE PUZZLE** rubber stamp slams onto the flap | stamp *thump* at 0.6 (sonic logo) |
| 0.50–1.25 | Pen writes **1 year = $ ?** | pen scratch |
| 1.30 | Red circle snaps around the "?" | scribble |
| 1.50–2.08 | Red pen writes *no calculator.* | VO "It's not sixty grand a year." (1.8–3.4) |
| 2.10–2.76 | Pencil writes the tempting math: **$2,500 × 24 = $60,000** | pencil scratch |
| 2.80–3.10 (37–41%) | **Partial payoff:** the red pen strikes the **24**. The count is the trap; the right count stays sealed | scribble |
| 3.15 (42%) | **Pattern break:** the sealed envelope (wax ≈, "ANSWER · IN THE PIN") slides up on the right and starts to wiggle | whoosh |
| 3.50–5.01 | ASSUME sticky (left) writes *pre-tax pay ≈ US median (BLS)* | paper; VO "So what is it? No calculator." (3.4–5.2) |
| 6.05 (thump 6.25, 83%) | **Verdict:** **RETURN TO SENDER** slams beside the struck trap line | stamp *thump*; VO "Ours is sealed in the pin." (5.2–7.2) |
| 7.00–7.50 (93%) | **Hero beat:** the envelope flips as if to show the answer, lands on a blank back, cuts to the full card in frame 0 | whoosh → loop |

**Voice-over (23 words, dry and amused):**
> Twenty-five hundred every two weeks. It's not sixty grand a year. So what is it? No calculator. Ours is sealed in the pin.

**The envelope math** (back of the envelope in the Opened post, and the pinned comment):
1. `52 weeks ÷ 2 = 26 paydays`
2. `26 × $2,500 = $65,000`
3. `not 24 → +$5,000 (2 "extra" checks)`

**ASSUME sticky:** *pre-tax pay ≈ US median (BLS)*. The $2,500 is a round stand-in for the real median full-time paycheck: $1,251 a week × 2 = $2,502.
**Trap line on screen (pencil + red):** `$2,500 × 24 = $60,000` with the **24** struck in red. The arithmetic is right; the count is the trap.
**Sources (writer checked with WebSearch 2026-10-07; QA could not re-load them, see the Verification log):**
- U.S. Bureau of Labor Statistics, *Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026*, released 2026-07-21: median weekly earnings of the 120.9 million full-time wage and salary workers = **$1,251** (not seasonally adjusted). https://www.bls.gov/news.release/archives/wkyeng_07212026.htm
- BLS Current Employment Statistics, *Length of pay periods*: biweekly is the most common pay period, used by **43.0%** of US private establishments (February 2023 data). https://www.bls.gov/ces/publications/length-pay-period.htm
- *Note:* bls.gov is blocked by this environment's egress proxy, so the figures were confirmed from search-result extracts of these pages, not a direct page load.

**Ending**
- **Loop / re-hook:** "Ours is sealed in the pin." → flip → frame 1, "Twenty-five hundred every two weeks."
- **Comment bait (a real question, not vote-bait):** on-screen "1 year = $ ?" and *no calculator*. The struck "24" tells people the count is the trap without giving the count, so the comments split 26 vs 27 (and the "52.14 weeks" crowd).
- **Pinned comment** (post at +12–24 h with the Opened short; until then pin *"Sealed until tomorrow. Your number, no calculator?"*):
  > Exact: $65,000 (26 paychecks × $2,500). 52 weeks ÷ 2 = 26, not 24, so $60,000 misses two whole checks ($5,000). That's why two months in a typical year bring a third payday. The $2,500 is the US median rounded: $1,251/wk (BLS, Q2 2026) × 2 = $2,502, so the real median year is $65,052 (envelope within 0.1%). Well actually: a year is 52 weeks plus a day (two in leap years), so about once every 11 years the calendar fits a 27th payday ($67,500). Pre-tax, no raises. Opened short: Envelope Puzzle No. 08A: Opened.

**Description**
> $2,500 every two weeks is NOT $60,000 a year. So what is it? No calculator. Our answer is sealed in the pinned comment. For the friend who budgets by the month.
> Educational math, not financial advice.
> Sources: BLS Usual Weekly Earnings, Q2 2026 (released Jul 21 2026), median full-time pay $1,251/week: bls.gov/news.release/archives/wkyeng_07212026.htm · BLS CES Length of pay periods (biweekly = 43.0% of private establishments): bls.gov/ces/publications/length-pay-period.htm · checked Oct 7 2026.
> #EnvelopeMath #paycheck #biweekly #mathpuzzle

**Platform notes**
- **YouTube Shorts:** title = hook text + "(Envelope Puzzle No. 08A)". Set the Opened short as the Related video once it's live. Loops count as views but not as engaged views, so the Opened short is what earns.
- **Instagram Reels:** frame 0 already shows the full hook; for the cover use the full card at about 5.5 s (question, struck trap line, sealed envelope and sticky all up, before the RETURN TO SENDER stamp). Use 4 hashtags (the cap is 5). Run it first as a Trial Reel to non-followers. Sends matter most for non-follower reach, which is why the caption has the "friend who budgets by the month" line. Don't write "tag a friend".
- **TikTok:** sound on: VO, tape rip, stamp thump and a soft clock-tick bed under the 3.5–6 s hold. Pin the placeholder, then the answer. Reply to the "27 paychecks!" commenters with a video reply (that is the Opened short's comment loop).

**Why this one should travel:** biweekly is the most common US pay period (43.0% of private establishments), so the trap catches a lot of real people with a $5,000 stake. It copies mathsgenius's one-wrong-answer negation (522.3x) but swaps grammar for money. It has a built-in honest "well actually" (the 27-payday year, about once every 11 years) like @anatalksmoney's math-police comments (491.2x). And it carries a taggable person and a save-worthy rule ("biweekly = 26 checks").

**Opened post (12 s, next day):** 0–1 s same tape and the sealed envelope · 1.2 s the seal breaks and the card reads **$65,000 / 26 checks, not 24** · 2.4 s flip · 2.9–7.5 s the three envelope lines in ink, with the rule line above line 3 · 7.6 s a red strike through a written "$60,000" + **RETURN TO SENDER** stamp · 8.5–10.5 s red rule: *"most years, 2 months get 3 paydays"* · 10.5–12 s the No. 08B sealed envelope slides in. VO: "Opened. Sixty-five grand. Fifty-two weeks is twenty-six paydays, not twenty-four. Two checks you forgot: five grand. Next one's already sealed."

---

#### 08B: "Stocks fell 57%. Back to even is NOT +57%" · *Envelope Puzzle No. 08B*

- **Topic:** investing / market crashes. **Lane:** Flash. **Runtime:** 7.5 s puzzle post; Opened post 12 s the next day.
- **Spec:** `engine/specs/08-trap-card-b.json` · **Sheet:** `engine/out/sheets/08-trap-card-b.png`

**Frame-1 hook.** Tape, three lines: **STOCKS FELL 57%.** / **BACK TO EVEN** / **IS *NOT* +57%!**
**First spoken line (0.1–1.7 s):** "Stocks fell fifty-seven percent."
*(The tape says "Stocks" rather than "S&P 500" on purpose: in the marker face the ampersand reads as "S+P". The sticky and the description name the S&P 500.)*

**Beat sheet**

| Time | Picture | Sound / VO |
|---|---|---|
| 0.00 | **Frame 0 = full card:** postmark No. 08B and all three tape strips already up (`t` −0.5) | tape rip; VO "Stocks fell fifty-seven percent." (0.1–1.7) |
| 0.40 | **ENVELOPE PUZZLE** stamp | thump at 0.6 |
| 0.50–1.40 | Pen writes **To get back: + ? %** | scratch |
| 1.40 | Red circle around the "?" | scribble |
| 1.55–2.13 | Red *no calculator.* | VO "Back to even isn't plus fifty-seven." (1.7–3.45) |
| 2.10–2.67 | Pencil writes the tempting math: **$43 + 57% = $100?** | pencil scratch |
| 2.72–3.15 (36–42%) | **Partial payoff:** red strike through "$100?", red pen writes **$67.51**. Proof that +57% fails; the real gain stays sealed | scribble |
| 3.20 (43%) | **Pattern break:** sealed answer envelope slides in on the right and wiggles | whoosh |
| 3.45–4.91 | ASSUME sticky (left): *S&P 500 price only, Oct '07 → Mar '09* | paper; VO "So what gain is it? No calculator." (3.45–5.25) |
| 6.05 (thump 6.25, 83%) | **Verdict:** **RETURN TO SENDER** slams beside the trap line | thump; VO "Ours is sealed in the pin." (5.25–7.2) |
| 7.00–7.50 (93%) | Flip → blank back → loop to the full card | whoosh |

**Voice-over (23 words):**
> Stocks fell fifty-seven percent. Back to even isn't plus fifty-seven. So what gain is it? No calculator. Ours is sealed in the pin.

**The envelope math:**
1. `$100 − 57% = $43`
2. `$43 × 2.3 ≈ $100`
3. `≈ +130% to get back (not +57%)`

**ASSUME sticky:** *S&P 500 price only, Oct '07 → Mar '09* (closing prices; price index, no dividends).
**Trap line on screen (pencil + red):** `$43 + 57% = $100?` with "$100?" struck and **$67.51** written in red (43 × 1.57 = 67.51).
**Sources (writer checked with WebSearch 2026-10-07; QA could not re-load them, see the Verification log):**
- S&P 500 closing high **1,565.15 on 2007-10-09** and closing low **676.53 on 2009-03-09** (≈57% off the high, 17 months later): ETF Trends "S&P 500 Snapshot" series, https://www.etftrends.com/innovative-etfs-content-hub/sp-500-snapshot-index-finishes-week-record-high/amp/ ; Benzinga, "This Day In Market History: S&P 500's Lowest Closing Price Of The Great Recession", https://benzinga.com/z/20077767
- First close above the 2007 record: **1,569.19 on 2013-03-28**, "inching above its previous record of 1,565.15 from October 2007": AP via WTVR, 2013-03-28, https://www.wtvr.com/2013/03/28/sp-stock-index-closes-at-all-time-high ; PRI, 2013-03-28, https://www.pri.org/stories/2013-03-28/sp-500-closes-1569-new-record-high
- *Note:* closing prices are used, not the intraday high (≈1,576 on 2007-10-11), and dividends are not included.

**Ending**
- **Loop / re-hook:** "Ours is sealed in the pin." → flip → "Stocks fell fifty-seven percent."
- **Comment bait:** "To get back: + ? %". Expect 57, 100, 130, 131 and 133 in the comments. All but the first two are defensible, depending on rounding, which is the honest argument.
- **Pinned comment:**
  > Exact: +131.4% (envelope said ≈ +130%, within 1.1%). The S&P 500 closed at 1,565.15 on Oct 9 2007 and 676.53 on Mar 9 2009 (−56.8%). 1,565.15 ÷ 676.53 = 2.3135, so getting back took +131.4%. With the rounded 57% it's +132.6%. A +57% bounce only takes $100 → $43 → $67.51. Rule: lose half, and it takes +100% to get back. It first closed above the old high on Mar 28 2013 (1,569.19), about 5½ years after the peak. Price only, no dividends. Arithmetic, not a forecast. Opened short: Envelope Puzzle No. 08B: Opened.

**Description**
> Stocks fell 57%. Getting back to even is NOT +57%. What gain is it? No calculator. Answer sealed in the pinned comment. For the friend who says "it'll bounce right back."
> Educational math, not financial advice. Past index levels, not a prediction.
> Sources: S&P 500 closes 1,565.15 (Oct 9 2007) and 676.53 (Mar 9 2009), ETF Trends S&P 500 Snapshot and Benzinga (benzinga.com/z/20077767); first close above the 2007 high 1,569.19 on Mar 28 2013 (AP via WTVR; PRI) · checked Oct 7 2026.
> #EnvelopeMath #stockmarket #investingmath #mathpuzzle

**Platform notes**
- **YouTube Shorts:** keep "S&P 500" in the title for search ("Stocks fell 57%. Back to even is NOT +57% | S&P 500, 2007–09 (Envelope Puzzle No. 08B)"). Use no ticker or fund names, to stay clear of YouTube's "get rich quick" and misleading-title rules.
- **Instagram Reels:** the cover is the full card at about 5.5 s (everything up except the final stamp). Meta doesn't recommend finance content it judges sensitive or low-quality, so the caption sticks to arithmetic and history, with no tickers and no "buy the dip". Sends go to "the friend who says it'll bounce right back."
- **TikTok:** TikTok bans branded content for financial products, and none is used here. Sound-on bed: a slow heartbeat thump that stops on the flip.

**Why this one should travel:** it is the research's flagship money trap (−50% then +50% is not even) upgraded with a famous, verifiable event. "S&P 500" is a famous noun (report §3.2). The rule ("−50% needs +100%") is save-worthy. The rounding produces an honest argument between 131% and 133% (report §3.7: correctable rounding drives comments). It also fits the "a 50% loss needs a 100% gain" Opened beat already sketched in `02-top-10-approaches.md`.

**Opened post (12 s):** seal breaks at 1.2 s, card **+131% (≈ ×2.3)** · flip · three lines in ink · a red strike through a written "+57%" + **RETURN TO SENDER** · red rule *"−50% needs +100%"* · 1,565 → 677 → 1,569 written as a pencil timeline, "Mar 28 2013" · No. 08C slides in. VO: "Opened. About a hundred and thirty percent. Fifty-seven off leaves forty-three cents on the dollar, and forty-three has to more than double. Next one's sealed."

---

#### 08C: "Gatorade went 32 oz to 28 oz, same price. The hike is NOT 12.5%" · *Envelope Puzzle No. 08C*

- **Topic:** groceries / shrinkflation. **Lane:** Flash. **Runtime:** 7.5 s puzzle post; Opened post 12 s the next day.
- **Spec:** `engine/specs/08-trap-card-c.json` · **Sheet:** `engine/out/sheets/08-trap-card-c.png`

**Frame-1 hook.** Tape, three strips: **GATORADE: 32 OZ → 28 OZ** / **SAME PRICE.** / **THE HIKE IS *NOT* 12.5%!** ("NOT" in red). *(QA: the old line 2, "Same price. NOT +12.5%!", never said +12.5% of what; "the hike" names the quantity before the question is written.)*
**First spoken line (0.1–2.0 s):** "Gatorade: thirty-two ounces to twenty-eight."

**Beat sheet**

| Time | Picture | Sound / VO |
|---|---|---|
| 0.00 | **Frame 0 = full card:** postmark No. 08C and all three tape strips already up (`t` −0.5) | tape rip; VO "Gatorade: thirty-two ounces to twenty-eight." (0.1–2.0) |
| 0.40 | **ENVELOPE PUZZLE** stamp | thump at 0.6 |
| 0.50–1.30 | Pen writes **Per ounce: + ? %** | scratch |
| 1.40 | Red circle around the "?" | scribble |
| 1.55–2.13 | Red *no calculator.* | VO "Same price. The hike's not twelve and a half percent." (2.0–3.8) |
| 2.10–2.57 | Pencil writes the tempting math: **4 ÷ 32 = 12.5%** | pencil scratch |
| 2.62–3.04 (35–41%) | **Partial payoff:** red pen writes **less drink** after it. The 12.5% is the drink you lost, not the price change; the price change stays sealed | scribble |
| 3.20 (43%) | **Pattern break:** sealed envelope slides in on the right | whoosh |
| 3.55–5.16 | ASSUME sticky (left): *same shelf price, old & new bottle* | paper; VO "Per ounce? No calculator." (3.8–5.3) |
| 6.05 (thump 6.25, 83%) | **Verdict:** **RETURN TO SENDER** slams beside the trap line | thump; VO "Ours is sealed in the pin." (5.3–7.2) |
| 7.00–7.50 (93%) | Flip → blank back → loop to the full card | whoosh |

**Voice-over (25 words; the brisk first line is the hook, about 6 syllables a second):**
> Gatorade: thirty-two ounces to twenty-eight. Same price. The hike's not twelve and a half percent. Per ounce? No calculator. Ours is sealed in the pin.

**The envelope math:**
1. `lost 4 oz of 32 = 1/8 (12.5% less drink)`
2. `same price, 28 oz: 32/28 = 1 + 4/28 = 1 + 1/7`
3. `≈ +14% per ounce (not 12.5%)`

**ASSUME sticky:** *same shelf price, old & new bottle*. This is as reported in 2022. If a store charged more for the new bottle, the per-ounce rise is bigger than 14%, never smaller.
**Trap line on screen (pencil + red):** `4 ÷ 32 = 12.5%` followed by **less drink** in red. Both statements are true; the trap is reading 12.5% as the price change.
**Sources (writer checked with WebSearch 2026-10-07; QA could not re-load them, see the Verification log):**
- AP, "No, you're not imagining it — package sizes are shrinking", 2022-06-08: "PepsiCo recently began phasing out 32-ounce Gatorade bottles in favor of 28-ounce ones." Via Bangor Daily News: https://www.bangordailynews.com/2022/06/08/nation/no-youre-not-imagining-it-package-sizes-are-shrinking/ (also Tampa Bay Times: https://www.tampabay.com/news/business/2022/06/08/no-youre-not-imagining-it-package-sizes-are-shrinking/)
- NPR, "'Shrinkflation' accelerates globally as manufacturers quietly shrink package sizes", 2022-06-08: 32 → 28 oz is "the equivalent of a 14% price increase". https://www.npr.org/2022/06/08/1103766334/shrinkflation-globally-manufacturers-shrink-package-sizes
- NBC DFW, "Paying the same but getting less: it's called shrinkflation": the 28-oz bottle came "for the same price". https://www.nbcdfw.com/news/local/paying-the-same-but-getting-less-its-called-shrinkflation/2970095/
- Still in the news in 2026: WFSB, "Shrinkflation costs average family $41 more per year at grocery store", 2026-04-16, https://www.wfsb.com/2026/04/16/shrinkflation-costs-average-family-41-more-per-year-grocery-store/ (cited for topicality only, and no figure from it is used on screen).
- *Note:* these pages are blocked by the egress proxy, so the quotes above come from search-result extracts.

**Ending**
- **Loop / re-hook:** "Ours is sealed in the pin." → flip → "Gatorade: thirty-two ounces to twenty-eight."
- **Comment bait:** "Per ounce: + ? %". Like mathsgenius's "half", two true-sounding readings split the comments: "12.5% less drink" is true, and "12.5% more expensive" is the trap.
- **Pinned comment:**
  > Exact: +14.3% per ounce (envelope said ≈ +14%, within 2%). Going 32 → 28 oz cuts 4 oz, which is 12.5% of the old bottle (4/32). But the same price now buys only 28 oz, so each ounce costs 4/28 = 1/7 = 14.29% more. Rule: shrink by 1/8, pay 1/7 more per unit. Assumes the same shelf price for both bottles, as reported when PepsiCo switched in 2022 (AP, NPR, NBC DFW). Opened short: Envelope Puzzle No. 08C: Opened.

**Description**
> Gatorade went from 32 oz to 28 oz for the same price. That's NOT a 12.5% price hike. Per ounce, how much more? No calculator. Answer sealed in the pinned comment. For the friend who only reads the shelf price.
> Educational math, not financial advice.
> Sources: AP, "No, you're not imagining it — package sizes are shrinking" (Jun 8 2022); NPR shrinkflation report (Jun 8 2022); NBC DFW shrinkflation report · checked Oct 7 2026.
> #EnvelopeMath #shrinkflation #groceries #mathpuzzle

**Platform notes**
- **YouTube Shorts:** "Gatorade" leads the title (famous-noun search). Brand name and public bottle sizes only: no logo, no bottle art, no impersonation.
- **Instagram Reels:** this is the most "send-able" of the three (grocery receipts are shared in group chats). The cover is the full card at about 5.5 s. Use 4 hashtags.
- **TikTok:** sound-on with a fizz-and-cap-twist foley under the hook (synthesised, no brand audio). It is a natural Stitch for shrinkflation creators, so invite Stitches in the caption ("Stitch your shrinkflation number"). That is a real call to action, not vote-bait.

**Why this one should travel:** it has a famous noun and a still-live 2026 grocery anxiety. It has the mathsgenius two-camp ambiguity (522.3x), where both readings feel right but only one is the price change. The rule is save-worthy ("shrink by 1/n, pay 1/(n−1) more"). And it hands the "math police" a fight they can win honestly, 12.5% vs 14.3%.

**Opened post (12 s):** seal breaks at 1.2 s, card **+14.3% per ounce** · flip · three lines in ink · a red strike through a written "+12.5%" + **RETURN TO SENDER** · red rule *"shrink 1/8 → pay 1/7 more"* · the next puzzle's sealed envelope slides in. VO: "Opened. Fourteen percent, not twelve and a half. You lost an eighth of the bottle, but each ounce costs a seventh more. Next one's sealed."

---

### Math check

Script: `teasers/08-trap-card-mathcheck.py` (python3, standard library only). It recomputes every number on screen, in the scripts, in the pinned comments and in the descriptions, asserts the key ones, and reads the three specs to confirm that the on-screen strings match the math and that each hook is fully drawn in frame 0.

```python
"""Math check for Envelope Puzzle No. 08A / 08B / 08C (The Trap Card).
Run from the repo root: python3 teasers/08-trap-card-mathcheck.py
Recomputes every number in the md (scripts, envelope lines, pinned comments, descriptions) and
cross-checks the on-screen strings in engine/specs/08-trap-card-{a,b,c}.json against the math."""
import datetime as dt
import json
import pathlib
from collections import Counter
from fractions import Fraction as F

ROOT = pathlib.Path(__file__).resolve().parent.parent
def pct(x): return f"{x * 100:.2f}%"
def within(env, exact): return abs(env - exact) / abs(exact)
def spec(f): return json.loads((ROOT / f"engine/specs/08-trap-card-{f}.json").read_text())
def texts(s):
    out = []
    for o in s["ops"]:
        t = o.get("text")
        if t is None: continue
        out += t if isinstance(t, list) else [t]
    return [t.replace("*", "") for t in out]

print("=== 08A  $2,500 every 2 weeks ===")
pay = 2_500
trap = pay * 24                          # "twice a month" thinking = 2 x 12 = 24 checks
paydays = 52 // 2                        # 52 weeks / 2
answer = pay * paydays
assert (trap, paydays, answer) == (60_000, 26, 65_000)
print(f"trap (on screen, '24' struck): ${pay:,} x 24 = ${trap:,}")
print(f"52 weeks / 2 = {paydays} paydays;  ${pay:,} x {paydays} = ${answer:,};  missed: ${answer - trap:,} = {(answer - trap) // pay} checks")
bls_week = 1_251                         # BLS median usual weekly earnings, full-time, Q2 2026
bls_biweekly, bls_year = bls_week * 2, bls_week * 52
print(f"BLS median: ${bls_week:,}/wk -> ${bls_biweekly:,} every 2 weeks -> ${bls_year:,}/yr")
print(f"$2,500 vs ${bls_biweekly:,}: off by {pct(within(pay, bls_biweekly))}; ${answer:,} vs ${bls_year:,}: within {pct(within(answer, bls_year))}")
assert within(answer, bls_year) < 0.001
# A 26-payday year has exactly two 3-payday months: every month holds at least 2 biweekly
# paydays (28+ days) and at most 3, and 26 = 12 x 2 + 2.
anchor = dt.date(2026, 1, 2)             # every other Friday from Fri 2 Jan 2026
assert anchor.weekday() == 4
dates = [anchor + dt.timedelta(days=14 * k) for k in range(60)]
for y in (2026, 2027):
    ds = [d for d in dates if d.year == y]
    c = Counter(d.month for d in ds)
    print(f"{y}: {len(ds)} paydays on the calendar, 3-payday months {sorted(m for m, n in c.items() if n == 3)}, first {ds[0]}, last {ds[-1]}")
first_2027 = anchor + dt.timedelta(days=14 * 26)
assert (first_2027.month, first_2027.day) == (1, 1)
print(f"caveat: the first 2027 payday ({first_2027}) is New Year's Day, a bank holiday; payrolls that pay the business day before move it to 2026-12-31,"
      " so the md no longer names a specific 27-check year")
tot = Counter()
for off in range(14):                    # every possible biweekly phase, years 2000-2100
    c, d = Counter(), dt.date(1999, 12, 1) + dt.timedelta(days=off)
    while d.year <= 2100:
        if d.year >= 2000: c[d.year] += 1
        d += dt.timedelta(days=14)
    for y in range(2000, 2101): tot[c[y]] += 1
every = (tot[26] + tot[27]) / tot[27]
print(f"27-payday years: {tot[27]} of {tot[26] + tot[27]} schedule-years -> one every {every:.1f} years; 27 x ${pay:,} = ${27 * pay:,}")
print(f"long-run average: 365.2425 / 14 = {365.2425 / 14:.3f} paydays a year (= 26 + 1/{1 / (365.2425 / 14 - 26):.1f})")
assert round(every) == 11 and 27 * pay == 67_500

print("\n=== 08B  Stocks fell 57% (S&P 500, Oct 9 2007 -> Mar 9 2009) ===")
peak, low, regain = 1565.15, 676.53, 1569.19
drop = 1 - low / peak
need = peak / low - 1
assert round(drop * 100) == 57
print(f"drop: 1 - {low}/{peak} = {pct(drop)}  (said '57%'); {(2009 - 2007) * 12 + (3 - 10)} months peak to low")
print(f"trap (on screen): $43 + 57% = ${43 * 1.57:.2f}, not $100; index: {low} x 1.57 = {low * 1.57:.2f}, still {pct(1 - low * 1.57 / peak)} below the peak")
assert round(43 * 1.57, 2) == 67.51
print(f"exact gain to get back: {peak}/{low} = {peak / low:.4f} -> +{pct(need)}")
print(f"with the rounded 57%: 1/0.43 - 1 = +{pct(1 / 0.43 - 1)}")
print(f"envelope: $43 x 2.3 = ${43 * 2.3:.1f} (~$100) -> +130%; within {pct(within(1.30, need))} of +{pct(need)} (stated 'within 1.1%')")
assert within(1.30, need) < 0.011
print(f"rule: -50% takes +{pct(1 / 0.5 - 1)} to get back;  regained {regain} > {peak}: {regain > peak}")
t_peak = (dt.date(2013, 3, 28) - dt.date(2007, 10, 9)).days / 365.25
t_low = (dt.date(2013, 3, 28) - dt.date(2009, 3, 9)).days / 365.25
print(f"peak -> new closing high: {t_peak:.2f} yrs (stated 'about 5 1/2');  bottom -> new high: {t_low:.2f} yrs")
assert abs(t_peak - 5.5) < 0.05

print("\n=== 08C  Gatorade 32 oz -> 28 oz, same price ===")
old, new = 32, 28
less = F(old - new, old)
more = F(old, new) - 1
assert less == F(1, 8) and more == F(1, 7)
print(f"trap (on screen): 4 / 32 = {pct(float(less))} = less drink, not the price change")
print(f"exact: price per oz up = 32/28 - 1 = 4/28 = 1/7 = +{pct(float(more))}")
print(f"envelope: 'about 1/7 = +14%'; within {pct(within(0.14, float(more)))} of exact (stated 'within 2%')")
assert within(0.14, float(more)) <= 0.02 + 1e-12
print(f"check: 1 - 1/(1 + 1/7) = {1 - 1 / (1 + more)} (the 1/8 shrink)")
print(f"rule: shrink by 1/n -> pay 1/(n-1) more per unit; e.g. 1/10 smaller -> +{pct(10 / 9 - 1)}")

print("\n=== on-screen strings in the specs ===")
need_on_screen = {
    "a": ["$2,500 every 2 weeks", "is NOT $60,000 a year!", "1 year = $ ?", "$2,500 × 24 = $60,000", "pre-tax pay ≈ US median (BLS)"],
    "b": ["Stocks fell 57%.", "is NOT +57%!", "To get back: + ? %", "$43 + 57% = $100?", "$67.51", "S&P 500 price only, Oct '07 → Mar '09"],
    "c": ["Gatorade: 32 oz → 28 oz", "Same price.", "The hike is NOT 12.5%!", "Per ounce: + ? %", "4 ÷ 32 = 12.5%", "less drink", "same shelf price, old & new bottle"],
}
for f, want in need_on_screen.items():
    s = spec(f)
    have = texts(s)
    missing = [w for w in want if w not in have]
    assert not missing, (f, missing)
    hook = next(o for o in s["ops"] if o["type"] == "hook")
    assert hook["t"] <= -0.2 - 0.14 * (len(hook["text"]) - 1), "hook must be fully on screen in frame 0"
    caps = " ".join(c["text"] for c in s["captions"])
    print(f"08{f.upper()}: on-screen strings present; hook fully drawn at t=0; captions: {caps}")
assert "60 grand" in " ".join(c["text"] for c in spec("a")["captions"])
assert "+57%" in " ".join(c["text"] for c in spec("b")["captions"])
assert "12.5%" in " ".join(c["text"] for c in spec("c")["captions"])
print("\nall asserts passed")
```

Output (run 2026-10-07, QA pass):

```
=== 08A  $2,500 every 2 weeks ===
trap (on screen, '24' struck): $2,500 x 24 = $60,000
52 weeks / 2 = 26 paydays;  $2,500 x 26 = $65,000;  missed: $5,000 = 2 checks
BLS median: $1,251/wk -> $2,502 every 2 weeks -> $65,052/yr
$2,500 vs $2,502: off by 0.08%; $65,000 vs $65,052: within 0.08%
2026: 26 paydays on the calendar, 3-payday months [1, 7], first 2026-01-02, last 2026-12-18
2027: 27 paydays on the calendar, 3-payday months [1, 7, 12], first 2027-01-01, last 2027-12-31
caveat: the first 2027 payday (2027-01-01) is New Year's Day, a bank holiday; payrolls that pay the business day before move it to 2026-12-31, so the md no longer names a specific 27-check year
27-payday years: 126 of 1414 schedule-years -> one every 11.2 years; 27 x $2,500 = $67,500
long-run average: 365.2425 / 14 = 26.089 paydays a year (= 26 + 1/11.3)

=== 08B  Stocks fell 57% (S&P 500, Oct 9 2007 -> Mar 9 2009) ===
drop: 1 - 676.53/1565.15 = 56.78%  (said '57%'); 17 months peak to low
trap (on screen): $43 + 57% = $67.51, not $100; index: 676.53 x 1.57 = 1062.15, still 32.14% below the peak
exact gain to get back: 1565.15/676.53 = 2.3135 -> +131.35%
with the rounded 57%: 1/0.43 - 1 = +132.56%
envelope: $43 x 2.3 = $98.9 (~$100) -> +130%; within 1.03% of +131.35% (stated 'within 1.1%')
rule: -50% takes +100.00% to get back;  regained 1569.19 > 1565.15: True
peak -> new closing high: 5.47 yrs (stated 'about 5 1/2');  bottom -> new high: 4.05 yrs

=== 08C  Gatorade 32 oz -> 28 oz, same price ===
trap (on screen): 4 / 32 = 12.50% = less drink, not the price change
exact: price per oz up = 32/28 - 1 = 4/28 = 1/7 = +14.29%
envelope: 'about 1/7 = +14%'; within 2.00% of exact (stated 'within 2%')
check: 1 - 1/(1 + 1/7) = 1/8 (the 1/8 shrink)
rule: shrink by 1/n -> pay 1/(n-1) more per unit; e.g. 1/10 smaller -> +11.11%

=== on-screen strings in the specs ===
08A: on-screen strings present; hook fully drawn at t=0; captions: $2,500 every two weeks. It's NOT 60 grand a year. So what is it? No calculator. Ours is sealed in the pin.
08B: on-screen strings present; hook fully drawn at t=0; captions: Stocks fell 57%. Back to even isn't +57%. So what gain is it? No calculator. Ours is sealed in the pin.
08C: on-screen strings present; hook fully drawn at t=0; captions: Gatorade: 32 ounces to 28. Same price. The hike's NOT 12.5%. Per ounce? No calculator. Ours is sealed in the pin.

all asserts passed
```

**How the figures map to what's published:** "within 0.1%" (08A) rounds up 0.08%; "within 1.1%" (08B) rounds up 1.03%; "within 2%" (08C) is exactly 2.00%; "about once every 11 years" is 11.2 (or 26 + 1/11.3 paydays a year on the Gregorian average); "about 5½ years after the peak" is 5.47 years; "$67.51" on screen is 43 × 1.57 exactly.

---

### Verification log

QA pass by an independent fact-checker, editor and QA reviewer, 2026-10-07. I assumed there were mistakes and looked for them. Files touched: this md, `teasers/08-trap-card-mathcheck.py`, `engine/specs/08-trap-card-{a,b,c}.json`, and the re-rendered `engine/out/sheets/08-trap-card-{a,b,c}.png` and `engine/out/stills/08-trap-card-*`. `engine/src` was not edited.

**1. Math (recomputed with python3, then the script was rewritten to cover the specs too)**
- Checked: every number in the md, the VO, the captions, the hooks, the envelope lines, the pinned comments and the descriptions. That covers 24 vs 26 checks, $60,000 / $65,000 / $5,000, $1,251 × 2 / × 52, 0.08%, 56.78%, 131.35%, 132.56%, $43 × 1.57 = $67.51, $43 × 2.3 = $98.90, 1.03%, 5.47 years, 17 months, 4/32 = 1/8, 32/28 − 1 = 1/7 = 14.29%, the 2.00% rounding gap, and the 27-payday frequency (126 of 1,414 schedule-years, one every 11.2).
- Arithmetic errors found: none in the writer's numbers.
- **Wrong (calendar fact):** the 08A pinned comment said an every-other-Friday schedule from Jan 2 2026 "gets 27 paychecks in 2027 (Jan 1 and Dec 31)" and that Jan and Jul are the 3-payday months of 2026. Jan 1 2027 is New Year's Day, a bank holiday. Payrolls that pay the business day before move that check to Dec 31 2026, which puts the 27th check in 2026 (and a third payday in December 2026). The "math police" would be right. **Changed:** the comment now states only calendar facts that hold in every case: two months in a typical year bring a third payday, and about once every 11 years the calendar fits a 27th ($67,500). The script asserts the holiday collision so nobody brings the claim back.
- **Unclear (fixed):** 08C envelope line 2 read "same price ÷ 28 oz → 4/28 = 1/7", which jumps steps. It now reads `same price, 28 oz: 32/28 = 1 + 4/28 = 1 + 1/7`.
- The md, captions and on-screen math now agree. `08-trap-card-mathcheck.py` reads all three specs and asserts that the on-screen strings ("$2,500 × 24 = $60,000", "$43 + 57% = $100?" / "$67.51", "4 ÷ 32 = 12.5%" / "less drink", hooks, stickies) are present and that each hook is fully drawn at t = 0. All asserts pass.

**2. Facts (as of 2026-10-07)**
- **Not re-verified on the web in this pass.** This run's WebSearch budget was already used up when the QA started (the tool refused every query). Direct loads of the cited pages (bls.gov, npr.org, wtvr.com, pri.org, benzinga.com, bangordailynews.com, nbcdfw.com), and of the FRED, Yahoo and BLS APIs, were all blocked by the egress proxy. I did not use search engines, readers or archives to get around this.
- What I could still check:
  - The S&P 500 figures (close 1,565.15 on 2007-10-09, close 676.53 on 2009-03-09, first close above the old record 1,569.19 on 2013-03-28) match the historical record as I know it. The weekdays (Tue, Mon, Thu) are trading days.
  - The Gatorade 32 → 28 oz switch (AP, June 2022, "PepsiCo recently began phasing out 32-ounce Gatorade bottles in favor of 28-ounce ones") matches what I know. The "same price" premise sits on the ASSUME sticky, as the bible requires for an assumption.
  - BLS Q2 2026 median weekly earnings of $1,251 (released 2026-07-21) is cited the same way by the 02 and 05 teams, but that is consistency, not verification.
  - The evidence-table numbers (522.3x, 9.3M, 14.1K, 660 views per follower, 174.4x, 18.6x, 491.2x, 302.0x, 48.7x, 48.62x, 50.73x, $5,368,709.12, 735x) all match `research/raw` and `research/watch`. So do the platform claims (repeat views since Apr 21 2025, YouTube start/replay views since 2025-03-31, 69% sound-off, the 5-hashtag cap, TikTok's ban on financial branded content).
- **Changed:** the three "Sources (checked with WebSearch …)" headings now say the writer checked them and QA could not re-load them. The header's "Facts checked" line says the same.
- **Before publishing:** re-confirm the BLS $1,251 (Q2 2026) and the 43.0% biweekly share, and the NBC DFW "same price" and NPR "14%" quotes.

**3. Brand and policy (format bible §2)**
- ≤3 lines: all three envelope-math blocks are 3 lines. The puzzle post shows the question plus one pencil trap line. Pass.
- **A number in frame 1: FAIL → fixed.** In the old specs the hook and the postmark started at t = 0 and eased in from zero, so frame 0 (the thumbnail and the first frame in the feed) was blank kraft (still rendered at t = 0). The hook now starts at t −0.5 and the postmark at t −0.3, so frame 0 shows the full hook. The tape sounds clamp to the first sample; they are not lost.
- Honest rounding and an exact pinned comment: present in all three ("Exact: … (envelope said ≈ …, within …%)").
- No advice language: one hit. The 08B pinned comment said "lose half, you need +100%" (the bible bans "you need to"). Now: "lose half, and it takes +100% to get back." No "should", "guaranteed" or "get rich" anywhere.
- No borrowed footage and no impersonation: everything is drawn, and Gatorade appears as a name plus public bottle sizes only. Pass.
- Disclaimer "Educational math, not financial advice." is in all three descriptions. Pass.
- Accuracy: the 08B YouTube title said "S&P 500 2008" for a fall from Oct 2007 to Mar 2009. Now "S&P 500, 2007–09".

**4. Virality (scored against `02-top-10-approaches.md` §8 and `watch/group1-video1`, `group2-video2`)**

| | Before | After | Why |
|---|---|---|---|
| 08A | 7 | 8.5 | Strong copy (concrete pay, a named wrong answer, a real two-reading ambiguity), but frame 0 was blank, there was no real partial payoff (a circle on "?" is not information), and nothing landed in the last 2 s except a flip to a blank back. |
| 08B | 7 | 8.5 | This is the research's flagship trap, held back by the same execution problems. "Stocks" stays, because the ampersand renders as "S+P" in the marker face (re-tested). |
| 08C | 6 | 8 | The famous noun works, but "Same price. NOT +12.5%!" never said +12.5% *of what*. **Rewritten** to three strips, "GATORADE: 32 OZ → 28 OZ / SAME PRICE. / THE HIKE IS *NOT* 12.5%!", with the title, VO line 2 and caption to match. |

- **Partial payoff by about 40% (new on all three):** a pencil line works the tempting math, then the red pen catches it.
  - 08A: `$2,500 × 24 = $60,000` with the 24 struck at 2.80–3.10 s (37–41%).
  - 08B: `$43 + 57% = $100?`, with "$100?" struck and **$67.51** in red at 2.72–3.15 s (36–42%).
  - 08C: `4 ÷ 32 = 12.5%` followed by **less drink** in red at 2.62–3.04 s (35–41%).
  - Each one proves the negation without giving the answer, so the puzzle stays sealed and the comments still have something to argue about.
- **Last 2 s:** the puzzle post can't show its answer, so the bible's "verdict" option is used. A RETURN TO SENDER stamp (the lexicon's "a trap") thumps at 6.25 s (83%) beside the trap line, then the envelope flips at 7.0–7.5 s (93%) to a blank back and loops to the full card. The old "?" → seal arrow was cut because it collided with the new trap line and stamp; the envelope label "ANSWER · IN THE PIN" and the VO carry that message.
- **Tightened:** the question writes faster (0.50–1.25/1.40 s, was 0.60–1.54), the circle comes right after it, and there is now a beat about every 0.5 s through 3.2 s (the old cut had nothing between 2.6 s and 5.35 s apart from the envelope and sticky).
- **Loop:** VO "Ours is sealed in the pin." → flip → full card in frame 0. Pass.

**5. Visual QA (check, sheets, stills; looked at every one)**
- `node src/cli.js check` passes with zero warnings on all three, before and after.
- **Fixed:**
  - The ASSUME stickies were set at size 42, which is illegible at phone size. They are now 46–50 on a 300-wide note on the left, and the sealed envelope moves to the right.
  - My first placement put the RETURN TO SENDER stamp on top of the trap line and made both unreadable. The trap lines are now left-set and the stamp is a compact 2-line block beside them, inside the right rail (x ≤ 930).
  - The red circle clipped the "?" in 08B and 08C because "?%" was set tight. The question now reads "+ ? %" and the circles are re-centred on the glyph.
- **Reading time:** every text item stays on screen at least 0.25 s per word after it finishes writing. The 08B sticky was 1.98 s for 9 words; it now starts 0.1 s earlier and writes faster, giving 2.34 s. Every caption is at least 0.25 s per word (tightest: 0.257 s, 08B "So what gain is it? No calculator.").
- Captions stay inside 1320–1480 and content ends by y 1300. The only exception is the envelope's 0.45 s slide-in, which passes under the caption band; captions draw on top.

**Engine requests (not implemented here; engine/src untouched)**
1. Add a `hook` option to start fully drawn (e.g. `instant: true`), so that frame 0 is not blank without the negative-`t` workaround. The workaround also stacks every tape SFX on sample 1.
2. Make `check` lint `stamp` and `annotate` boxes for overlaps (the stamp-over-text collision above passed lint).
3. Make `check` use the sticky's real wrapped height instead of `w × 0.45`.
4. Add a `check` warning when frame 0 has no readable text (format bible §2.2).
