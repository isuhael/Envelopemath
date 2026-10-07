## 10. The Envelope Audit (Claim Check)

**Writer brief:** take a money claim people are already sharing and paraphrase it on masking tape in frame 1. Give the claim credit for what's true, then red-pen it down to its honest number, seal that number for a two-second guess, and stamp a verdict.
**Lane:** Envelope (a 35.4 s master), cut to about 45 s for Instagram and about 62 s for TikTok.
**Series:** **Envelope Audit**. Each episode ends on one recurring number: **Claim Survival %**, the share of the claim that's still standing after the red pen.
**Specs:** `engine/specs/10-envelope-audit-{a,b,c}.json` · **Sheets:** `engine/out/sheets/10-envelope-audit-{a,b,c}.png` · **Math check:** `teasers/10-envelope-audit-mathcheck.py` (110 checks, all pass; it also reads the three specs)
**Facts checked:** 2026-10-07. Every view count, outlier score and URL in the evidence sections is copied from `research/raw/` or `research/watch/`. The writer checked the real-world inputs with WebSearch on 2026-10-07. The QA pass could not re-open any web source: the search budget was used up and every primary site was egress-blocked. The Verification log at the end says what was confirmed another way and what must be re-checked before publishing.
**Lane discipline:** an audit tests **one claim** and reveals the answer inside the video. It does not use the receipt or running-tally devices (#9, Itemized Tally), and it never holds the answer back for a later post (#8, Trap Card).

---

### Why it goes viral

**The mechanism: a claim people half-believe opens a loop ("is that real?") that only the verdict closes. Showing the arithmetic turns the verdict into something viewers can check and argue about.**

1. **A debunk is an open loop with a double payoff.** Viewers stay to find out who's right. The claim can survive the audit (sog_geovanie's "still under $1T" survived a wrong calendar) or collapse ("a write-off is a coupon worth your tax rate"). Believers and skeptics both comment. *(watch/group1-video4; 02-top-10 §10)*
2. **Visible skepticism inside 1.5 s backs up the viewer's own.** Money Guy lands the absurd claim and the hosts' visible disbelief within about 1.5 s. We get the same effect from a tape quote plus a red **AUDIT** stamp, without a face and without another creator's clip. *(watch/group6-video2, "Hook")*
3. **Unquantified claims are comment fuel, and quantified ones are send fuel.** Money Guy shows **no number at all**, and Sklar never says how long "forever" is. Both broke out on topic alone, so the math they skipped is open territory. *(watch/group6-video2; watch/group5-video1)*
4. **Accuracy is scarce in this category.** About 70% of 10 graded high-view finance TikToks scored C or lower (DayTrading.com, n = 10). Vivian Tu credits a 3M-view, 100K-follower first week to "I actually showed people the math" ([CNBC](https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html)). *(report 01 §3.13)*
5. **Rounding that people can correct, labelled as rounding, drives comments without bait.** @anatalksmoney's own caption said "the math police blew up my comments" (491.2x), and Kel King's 48-week "year" drew thousands of "actually…" replies. We round on purpose, label it ≈, and pin the exact figure. *(report 01 §3.7; watch/group3-video2)*
6. **Each audit has a taggable person built in:** "the friend who writes everything off", "the friend who only pays the minimum", "the office pool guy". Instagram weights sends per reach most heavily for non-followers. *(report 01 §3.12, §4.1)*

**Evidence**

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| The Money Guy Show | Private Chef Every Night as a Tax Write-Off? - Financial Advisors React | 6,195,245 | **272.45x** | 36 s | watched + transcript (no numbers shown) | https://www.youtube.com/shorts/LcaiiOGG3SY |
| @sog_geovanie (TT, 1.3K) | Congratulations Elon Musk!!! … $1,000,000,000,000.00 (live fact-check) | 2.4M | **1,005.7x** | 107 s | watched | https://www.tiktok.com/@sog_geovanie/video/7667278089755299085 |
| David Sklar & Associates (1.36K) | Stop Paying the Minimum on Credit Cards. It's Keeping You in Debt | 303,523 | **1,227.8x** | 85 s | watched + transcript ("takes forever" never quantified) | https://www.youtube.com/shorts/XCmCiQaEg3k |
| Caleb Hammer | 900% Interest Rate Loan For a PS5! | 9,234,026 | n/a | 36 s | inferred | https://www.youtube.com/shorts/deQOQaL9fBQ |
| Kel King (YT, 9.16K), *a claim begging for an audit* | A car you can buy for $3k and rent for $400 weekly | 5,189,444 | 1,131.1x | 7 s | watched | https://www.youtube.com/shorts/KnC5kPBGiJ4 |
| @financeunfiltered2 (TT, 10.9K) | Financial Audit's Most Disturbing Episode | 823.1K | 1,506.8x | 75 s | inferred | https://www.tiktok.com/@financeunfiltered2/video/7683562309007985934 |
| The Money Guy Show | Is $3 Million Really Enough to Retire? | 1,321,361 | 30.48x | 100 s | inferred | https://www.youtube.com/shorts/FAkH9nBCJ08 |
| Straight Arrow (227K) | Inflation cooled, so why didn't prices come down? | 1,081,002 | 242.7x | 114 s | inferred | https://www.youtube.com/shorts/T1ceBGc8WsM |
| Founder Files (544) | Why You're Wrong About Elon Musk's Net Worth | 318,620 | 220.51x | 145 s | inferred | https://www.youtube.com/shorts/Rkp2sZwVIJw |

---

### How the originals do it

**1. The Money Guy Show, "Private Chef Every Night as a Tax Write-Off?" (6,195,245 views, 272.45x, watched).**
0–22 s: a split screen with the hosts cringing above another creator's clip, with captions escalating word by word: "EVERY SINGLE YEAR / MONTH / DAY". 22–30 s: a host role-play ("When my daughter tries to pass the Parmesan bread…"). 30–36 s: the punchline "I'm not your father tonight, I'm the CEO" over a stock photo with a red X. Hard end.
- **What it nails:** an outrageous claim and visible disbelief in about 1.5 s, a lifestyle fantasy (a private chef), a quotable punchline and a 36 s runtime.
- **What it misses:** **no number appears at any point.** There's no chef cost, no tax rate and no deduction value, so the viewer never learns what a write-off is actually worth. It depends on another creator's clip (a reaction/stitch, which carries originality risk under YouTube's Oct 2026 rules). The punchline closes the conversation where a question would have opened one.

**2. @sog_geovanie, "Congratulations Elon Musk!!! …$1,000,000,000,000.00" (2.4M, 1,005.7x, watched).**
0–34 s: a reposted clip makes the claim ($50,000 an hour since the birth of Christ is still under $1T). 34–99 s: an uncut phone-calculator screen recording ("Nah bro, this … gotta be lying"), with 2,026 + 33 = 2,059 years, then 50,000 × 24 × 365 × 2,059 = $901.8B. 99–107 s: stunned payoff.
- **What it nails:** the debunk arc ("let me prove him wrong") and a mini-reveal at every step. The payoff is held to the last 8 s, and the claim survives the check, which is the surprise.
- **What it misses:** 65 s of calculator typing with no captions. The calendar logic is wrong (AD counts from the birth, not the death), which drew thousands of correction comments by accident. It reposts someone else's clip, and it doesn't loop. One division ($1T ÷ $50K = 20M hours ≈ 2,280 years) would have done the whole job in a line.

**3. David Sklar & Associates, "Stop Paying the Minimum on Credit Cards" (303,523, 1,227.8x, watched).**
One 75 s talking-head take: the myth is rejected by 0:08, then the mechanism ("paying the interest and a little tiny bit of principle"), then fear reframing, then a 10 s contact slate.
- **What it nails:** a myth everyone recognises ("just pay the minimum"), stated with authority in the first sentence.
- **What it misses:** "It takes forever" is **never quantified.** There is no balance, APR, payoff time or total paid, no on-screen hook text, no captions, and about 0.1 cuts per 10 s. vidIQ's own fix ("animate the math, e.g. a $5,000 balance paid at the minimum taking 20+ years") is our teaser 10B.

---

### The Envelope Math upgrade

**What we replicate**
- The claim is on screen in frame 1 and visible skepticism follows at 0.4 s (the tape quote plus a slammed **AUDIT** stamp in place of a grimacing host).
- The debunk arc where every step is a mini-reveal (sog_geovanie), but compressed from 65 s of calculator into **three handwritten lines**.
- A 30–40 s runtime on YouTube (Money Guy's 36 s), with longer cuts for Instagram and TikTok.

**What we improve**
1. **The number they never show.** Every audit ends on an honest figure: $88 a dinner, 19 years, 97¢.
2. **Credit first.** The claim's true part gets a **green ✓** before any red ink (business meals *are* deductible; $1.04B ÷ 292.2M *is* $3.56). It's fair, keeps believers watching, and protects the brand from smugness.
3. **Cite the rule on screen** (vidIQ's suggestion for Money Guy): "IRC §274(n)", "Aug 12, 2026 draw", "Minimum Payment Warning".
4. **Assumptions on a sticky note, rounding labelled ≈, exact figure pinned.** This turns the "math police" into a feature (report 01 §3.7) without ever being wrong.
5. **Commit before the reveal.** The honest number is sealed in the envelope behind a 3-second PAUSE & GUESS timer (report 01 §3.6).
6. **No borrowed clips, no named creator.** The claim is paraphrased in our own words on tape. We audit claims, not people.
7. **End on a question that splits the comments** instead of a punchline, land the biggest number in the last 2 seconds, and loop to the claim.

**The uniquely-ours twist: Claim Survival %.** Every audit closes on a typewritten line, **CLAIM SURVIVAL: N%**: the honest number as a share of what the claim promised. A "free" dinner that saves 12% survives at **12%**. "20 years" that's really 19¼ survives at **96%**. A "$3.56 ticket" worth 97¢ survives at **27%**. This gives the series a collectible, comparable stat ("what's the lowest survival rate so far?"), and since some claims survive, viewers can't predict the stamp, which keeps the loop open.

**The ritual (same every episode): Quote → Check → Strike → Seal → Stamp → Re-hook + Survival.**

| Beat | Device (format bible) | Engine op |
|---|---|---|
| Quote the claim in frame 1 | Masking-tape hook in quotation marks + "THE CLAIM:" typewriter label + red AUDIT stamp | `hook`, `write` (type), `stamp` |
| Check: credit the true part | Ballpoint working + a green check | `write`, `annotate` check (green) |
| Strike: correct it | Red pen strikes, circles, red notes | `annotate` strike / circle, red `write` |
| State assumptions | ASSUME: sticky | `sticky` |
| The unit | Postage stamp holding the unit ($2 ticket, 12¢ coupon) | `postage` |
| Seal: guess first | The Sealed Answer (wax ≈) + PAUSE & GUESS | `envelope`, `timer` |
| Stamp: verdict | Stamp lexicon: RETURN TO SENDER, ROUGHLY RIGHT, OPENED BY MISTAKE | `stamp` |
| Last 2 s: re-hook, biggest number, survival | Tape question + the episode's biggest number in red + typewritten CLAIM SURVIVAL | `hook`, `write`, `annotate` double |
| Series identity | Postmark No. 10A/B/C | `postmark` |
| Scene changes | Flip | `flip`, `clear` |

**Title template:** `"[Claim, with its number]"? [What it actually costs / We actually checked] (Envelope Audit No. [N])`. The on-screen claim, the title and the first spoken line all carry the claim's number. The honest number stays out of the title and out of the first line of the description, because those show under the video on TikTok and Instagram and would spoil the PAUSE & GUESS.

**Verdict lexicon for audits:** RETURN TO SENDER (myth), ROUGHLY RIGHT (the claim survives), OPENED BY MISTAKE (the "obvious" math was the wrong envelope), POSTAGE DUE (the claim hid a cost).

---

### Teasers

All three run 35.4 s in the Envelope lane (report 01 §4.2: YouTube favours under 30 s, Instagram 45–60 s and TikTok over 60 s, so the master is cut three ways). The claim and its number are on screen in frame 1. Each has a first answer by 28–34%, a red-pen pattern break at 27–41%, the sealed reveal at 68–71% and the verdict stamp at 74–80%. The re-hook question follows, and the episode's **biggest number lands in the last 2 seconds** with the CLAIM SURVIVAL stat. The last frame cuts back to the claim tape.

#### 10A: "“Write off your $100-a-night chef. Dinner's free.” What does it actually cost?" · *Envelope Audit No. 10A*

**Topic:** taxes / write-offs · **Verdict:** RETURN TO SENDER · **Claim survival:** 12%
**Lane / runtime:** Envelope, 35.4 s master (spec `10-envelope-audit-a.json`)

**Frame-1 hook**
- On screen (fully drawn in frame 1): small typewriter label **THE CLAIM:** above **“Write off your / $100-a-night chef. / Dinner's FREE.”** ("FREE" in red), with a red **AUDIT** stamp slamming in at 0.4 s.
- First spoken line (0.1–2.2 s): **"Write off your hundred-dollar chef, and dinner's free?"**

**Beat sheet**
| Time | Beat | On screen |
|---|---|---|
| 0.0–2.2 | Hook: the claim | Tape quote (frame 1), AUDIT stamp at 0.4 s, postmark No. 10A |
| 2.2–3.8 | "Let's audit it on one envelope." | Pen writes **$100 a dinner** |
| 3.8–6.4 | Set the number | ASSUME sticky: $100 = chef + food, 24% bracket, a real business meal |
| 6.4–9.2 | **Credit first** | "business meals:" **deductible ✓** (green) |
| 9.2–10.8 | Pattern break (27%) | Red pen strikes **FREE** on the tape. Flip |
| 10.8–14.0 | Strike 1: the 50% cap (**first payoff: $50**, written by 12.1 s = 34%) | **$100 × 50% cap = $50** (circled), red note "meals: 50% cap · IRC §274(n)" |
| 14.0–17.4 | Strike 2: a deduction isn't a refund | **$50 back?** struck in red, plus "not a refund" |
| 17.4–20.0 | The coupon | **$50 × 24% = $12 back** ($12 circled, double underline) |
| 20.0–24.4 | Seal and guess | "the $100 “free” dinner:", sealed envelope ("what it really costs"), 3-2-1 PAUSE & GUESS |
| 24.4–26.2 | **Reveal** (69%) | Card: **$88** / not $0 |
| 26.3 | **Verdict** (74%) | Stamp **RETURN TO SENDER** ("That claim? Return to sender.") |
| 27.9–31.5 | The rule | **written off ≠ paid off**, plus a postage stamp **12¢ BACK PER $1** |
| 31.5–33.0 | Re-hook | Tape **Still want the chef at $88 a night?** |
| 33.0–35.4 | **Biggest number + survival (last 2 s)** | "every night:" **≈ $32K a year** in red, double-underlined (fully written at 33.7 s), then **CLAIM SURVIVAL: 12%** (34.5 s). Cuts back to the claim tape |

**Full voice-over**
> Write off your hundred-dollar chef, and dinner's free? Let's audit it on one envelope. Say dinner's a hundred bucks, chef and groceries. True part first: business meals really are deductible. But free? Two problems. One: meals are capped at fifty percent. So fifty bucks. Two: a deduction isn't a refund. It saves you your tax rate. At twenty-four percent, that's twelve bucks back. So the hundred-dollar dinner really costs you… *(two-second pause, ticking)* Eighty-eight dollars. Not zero. That claim? Return to sender. Written off isn't paid off. It's a coupon: twelve cents on the dollar. Still want the chef? Every night, that's thirty-two grand a year.

**The envelope math (3 lines)**
1. `$100 × 50% cap = $50` (deductible)
2. `$50 × 24% = $12 back` (the write-off coupon: 12¢ per $1)
3. Sealed card: `$88` (= $100 − $12, "not $0"). Last 2 s: `≈ $32K a year` (exact $88 × 365 = $32,120)

**ASSUME sticky:** "$100 = chef + food. 24% tax bracket. A real business meal."

| Input | Value used | Source (writer checked 2026-10-07; QA status in the Verification log) |
|---|---|---|
| Dinner cost | **$100**, a labelled round assumption (not a market rate) | n/a (assumption on the sticky) |
| Meal deduction limit | **50%** | 26 U.S.C. §274(n) ([Cornell LII](https://www.law.cornell.edu/uscode/text/26/274)); IRS Publication 463: 50% of business meals, and only if you (or an employee) are present and it isn't lavish ([irs.gov/publications/p463](https://www.irs.gov/publications/p463)); the temporary 100% restaurant rule covered only 2021–2022 ([beancount.io, 2026-07-29](https://beancount.io/blog/2026/07/29/business-meals-2026-what-is-50-percent-deductible-after-temporary-100-expired-document-business-purpose-guide)) |
| Tax bracket | **24%** (single filers, $105,700–$201,775 of taxable income in 2026) | IRS, "IRS releases tax inflation adjustments for tax year 2026, including amendments from the One, Big, Beautiful Bill" (Rev. Proc. 2025-32) ([irs.gov](https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill)) |
| Family / personal dinners | **$0 deductible** | 26 U.S.C. §262 ([Cornell LII](https://www.law.cornell.edu/uscode/text/26/262)); 26 CFR §1.262-1 lists household expenses including domestic service ([Cornell LII](https://www.law.cornell.edu/cfr/text/26/1.262-1)) |
| Entertainment | Not deductible | 26 U.S.C. §274(a) ([Cornell LII](https://www.law.cornell.edu/uscode/text/26/274)) |

**Ending**
- Loop / re-hook: the tape asks "Still want the chef at $88 a night?", the VO lands "Every night, that's thirty-two grand a year." on the red ≈ $32K, and the cut returns to the "Dinner's FREE" tape.
- Comment bait (a real question, not "comment YES"): *Still want the chef at $88 a night?*
- **Pinned comment:** "Exact: $88.00 a dinner, $32,120 a year (envelope said ≈ $32K, within 0.4%). That's the best case: every dinner a real business meal with you at the table, federal income tax at 24%. A dinner with family is personal, so $0 deductible and the full $100. Even at a 50% combined tax rate the dinner still costs $75. Rules: IRC §274(n) (50% meal cap), IRC §262, IRS Pub 463, IRS 2026 brackets. Illustrative math, not tax advice. Claim survival: 12%. What should we audit next?"

**Description:** "Write off your $100-a-night chef and dinner's free? We audited it on one envelope. Business meals are deductible, but only 50%, and a deduction saves your tax rate, not the bill: $100 → $88. Assumptions: $100 a dinner, 24% federal bracket, a genuine business meal (best case). Sources: 26 U.S.C. §274(n) and §262; IRS Publication 463; IRS tax year 2026 inflation adjustments (Rev. Proc. 2025-32). Checked 2026-10-07. Illustrative, US federal only. Educational math, not financial advice."
**Hashtags:** #taxes #writeoff #smallbusiness #moneymath #envelopemath

**Platform notes**
- **YouTube Shorts:** use the 35.4 s master. The title carries the claim's number ("$100-a-night chef"), not the answer. Pin the exact figure. No music needed: the stamp thump and pen scratch are the sound.
- **Instagram Reels (~45 s):** add a third strike after "Two problems": "Three: dinner with family? Personal. Zero." (IRC §262; the card reads $100, not $88). Caption line: "Send this to the friend who writes everything off." Post first as a Trial Reel. Keep to 5 hashtags.
- **TikTok (~62 s):** add the family-dinner strike plus a "but my state and self-employment tax…" beat that shows robustness: even at a 50% combined rate, $100 → $75. Then the yearly ladder ($12 × 365 = $4,380 back on $36,500). Paraphrase the claim on tape and never stitch the original. TikTok bans branded finance content, so don't take a sponsor on this one.

**Why this one should travel:** it rides the topic that gave Money Guy its 272.45x outlier (6.2M) and does the one thing that video never did: put the number on screen. It busts a misconception millions half-believe ("a write-off makes it free") with one line of arithmetic. It has a taggable person built in (the friend who writes everything off), and a rule worth saving ("written off ≠ paid off"). Small-business and side-hustle viewers extend reach beyond finance (02-top-10 §10, "Algorithmic").

---

#### 10B: "“Pay the minimum on $5,000 and you'll pay for 20 years”? We actually checked" · *Envelope Audit No. 10B*

**Topic:** credit card debt · **Verdict:** ROUGHLY RIGHT · **Claim survival:** 96%
**Lane / runtime:** Envelope, 35.4 s master (spec `10-envelope-audit-b.json`)

**Frame-1 hook**
- On screen (fully drawn in frame 1): **THE CLAIM:** above **“Pay the minimum on / $5,000 and you'll / pay for 20 YEARS.”** ("20 YEARS" in red), with the **AUDIT** stamp at 0.4 s.
- First spoken line (0.1–2.0 s): **"Twenty years to pay off five grand?"**

**Beat sheet**
| Time | Beat | On screen |
|---|---|---|
| 0.0–2.0 | Hook: the claim | Tape quote (frame 1), AUDIT stamp at 0.4 s, postmark No. 10B |
| 2.0–4.2 | "Sounds like a scare tactic. Let's audit it." | Pen writes **$5,000**. ASSUME sticky slaps on at 3.0 s |
| 4.2–7.0 | Set the inputs (VO: "no new charges") | "on a credit card at 22%", 💳, sticky: 22% APR, minimum = interest + 1% ($25 floor). Flip |
| 7.0–9.6 | Line 1 | **$5,000 × 22% ÷ 12 ≈ $92** |
| 9.6–12.6 | Line 2 (**first payoff**, written by 10.9 s = 31%) | **min: $92 + $50 = $142** |
| 12.6–14.6 | Pattern break (36–41%) | Red circle on **$50**, plus "only $50 hits the debt" |
| 14.6–17.8 | Line 3, the shortcut | **1%/mo → halves every ~6 yrs** |
| 16.2–21.0 | The crawl | Napkin curve of the balance: **yr 6 ≈ $2.4K** (17.5 s), **yr 12 ≈ $1.2K** (17.8 s), a long tail |
| 21.0–25.0 | Seal and guess | "$5,000, minimum only:", sealed envelope "how long, really?", PAUSE & GUESS |
| 25.0–26.8 | **Reveal** (71%) | Card: **≈ 19 years** / the claim said 20 |
| 26.9 | **Verdict** (76%) | Stamp **ROUGHLY RIGHT** |
| 28.8–31.2 | Save-worthy pointer | Hand-drawn statement box: **MINIMUM PAYMENT WARNING / pay only the minimum:** |
| 31.2–32.6 | Re-hook | Tape **What does YOUR box say?** |
| 32.6–35.4 | **Biggest number + survival (last 2 s)** | In the box, in red: **ours: ≈19 yrs, ≈$13,100** ($13,100 underlined; fully written at 33.65 s), then **CLAIM SURVIVAL: 96%** (34.6 s). Cuts back to "20 YEARS" |

**Full voice-over**
> Twenty years to pay off five grand? Sounds like a scare tactic. Let's audit it. Five grand, no new charges, at twenty-two percent, about average. Month one, the interest alone is about ninety-two bucks. A common minimum is that plus one percent: one forty-two. So only fifty bucks touches the debt. One percent a month halves the debt about every six years. Year six: still twenty-four hundred. Year twelve: twelve hundred. So how long, really? *(two-second pause, ticking)* About nineteen years. The scary claim checks out. Roughly. Your statement's warning box prints your own number. What does yours say? Ours: about thirteen grand paid on five.

**The envelope math (3 lines)**
1. `$5,000 × 22% ÷ 12 ≈ $92` (month-one interest; exact $91.67 at 22%, $92.29 at 22.15%)
2. `min: $92 + $50 = $142` (only the 1%, **$50**, reduces the debt)
3. `1%/mo → halves every ~6 yrs` (rule of 70: 70 ÷ 1 = 70 months; exact ln 2 ÷ −ln 0.99 = 69 months ≈ 5.75 years). Two halvings bring $5,000 to about $1,200 by year 12, and the $25 floor mops up the tail, so the envelope says **≈ 19 years**. At the envelope's 22% that's $13,099.76 paid, written **≈ $13,100**.
- The curve is the exact month-by-month balance at 22.15% (231 months), sampled every 3 months (78 points, $0 at month 231). Its marks: year 6 = $2,425, year 12 = $1,176. Until the floor kicks in, paying interest + 1% shrinks the balance by exactly 1% a month whatever the APR, which is why the shortcut works.

**ASSUME sticky:** "22% APR. Minimum = interest + 1% ($25 floor)." The $5,000 balance and "no new charges" are said in the VO and repeated in the pinned comment and description.

| Input | Value used | Source (writer checked 2026-10-07; QA status in the Verification log) |
|---|---|---|
| APR | **22%** on screen. The exact calculation uses **22.15%**, the Fed G.19 "interest rate on credit card plans, accounts assessed interest" for Q2 2026 (prior quarter 21.52%) | FRED series TERMCBCCINTNS ([fred.stlouisfed.org](https://fred.stlouisfed.org/series/TERMCBCCINTNS)); Federal Reserve G.19 ([federalreserve.gov](https://www.federalreserve.gov/releases/g19/)). *Caveat: neither the writer nor QA could open FRED or the Fed page. The writer took the figure from two search-result summaries citing G.19 (release of Sept 8, 2026). Re-open G.19 before publishing. The on-screen answer does not hinge on it: any APR from 21% to 23% gives 228–232 months, still ≈ 19 years.* |
| Minimum-payment formula | Greater of **$25** or **1% of balance + that month's interest** (+ fees) | Capital One account terms ([capitalone.com](https://card-apis.capitalone.com/disclosure.31753.en-US.html)). Chase uses the larger of **$40** or 1% + interest + late fees ([chase.com](https://www.chase.com/personal/credit-cards/education/basics/how-to-calculate-your-minimum-credit-card-payment)), so the pinned comment gives the $40-floor result too |
| Statement warning box | Issuers must print a "Minimum Payment Warning" with the payoff time and total cost | Reg Z 12 CFR 1026.7(b)(12) ([Consumer Compliance Outlook](https://www.consumercomplianceoutlook.org/articles/2010/first-issue-2010/an-overview-of-the-regulation-z-rules-implementing-the-card-act)) |
| Balance | **$5,000**, a labelled round assumption, no new charges | n/a (assumption) |

**Ending**
- Loop / re-hook: the tape asks "What does YOUR box say?", the VO lands "Ours: about thirteen grand paid on five." on the red ≈ $13,100, and the cut returns to "Pay the minimum on $5,000 and you'll pay for 20 YEARS."
- Comment bait: *What does the Minimum Payment Warning box on your statement say?* (Viewers can post the years; balances aren't needed.)
- **Pinned comment:** "Exact: 231 months (19 yr 3 mo) and $13,158.75 paid, $8,158.75 of it interest (envelope said ≈ 19 years and ≈ $13,100, within 1.3% and 0.5%). The claim's '20 years' is within 4%. Assumptions: $5,000, no new charges, 22.15% APR (Fed G.19, Q2 2026), minimum = interest + 1% with a $25 floor. Anywhere from 21% to 23% APR it's still about 19 years (228–232 months), because the 1% does the paying. On a card with a $40 floor: 184 months (15 yr 4 mo), $12,516.44. Real cards compute interest daily, so your box will differ a little. Terms vary by issuer. Claim survival: 96%."

**Description:** "Pay only the minimum on $5,000 and you'll pay for 20 years? We audited it on one envelope. Only the 1% part of the minimum touches the debt, so the balance halves roughly every six years: about 19 years and about $13,100 paid. Assumptions: $5,000 balance, no new charges, 22.15% APR (Federal Reserve G.19, Q2 2026), minimum = interest + 1% of balance with a $25 floor (a common issuer formula, e.g. Capital One account terms; Chase uses $40). Your statement's Minimum Payment Warning box (Reg Z §1026.7(b)(12)) shows your own number. Checked 2026-10-07. Terms vary by issuer. Educational math, not financial advice."
**Hashtags:** #creditcarddebt #personalfinance #moneymath #envelopemath #debt

**Platform notes**
- **YouTube Shorts:** use the 35.4 s master. The title puts the claim and its number first and keeps the answer sealed ("We actually checked").
- **Instagram Reels (~45 s):** after the reveal, add a "depends on your card" beat: the same math on a $40-floor card is 15 years 4 months and $12,516 paid, written as a second line on the card. That's the honest range, and it invites "mine says…" comments. Caption: "Send this to whoever says 'I just pay the minimum'."
- **TikTok (~62 s):** add the rule-of-70 explainer (70 ÷ 1 = 70 months), the interest total ($8,158.75 of interest on a $5,000 balance, about 2.6× repaid), and the $40-floor comparison. Every sentence carries a new number, as the research advises for long cuts (report 01 §3.4).

**Why this one should travel:** Sklar's numberless take on this exact myth hit 1,227.8x from 1.36K subs, and vidIQ's own fix for it ("$5,000 at the minimum taking 20+ years") is this video. The claim *surviving* is a twist on the format (believers win this round), and it proves the series audits both ways. "Check the box on your statement" is a save-worthy, non-advice action, and the topic sits in Caleb Hammer's APR-outrage lane (9.2M on a 900% PS5 loan).

---

#### 10C: "“At $1.04 billion, a $2 Powerball ticket's worth $3.56”? What it's actually worth" · *Envelope Audit No. 10C*

**Topic:** lottery / expected value · **Verdict:** OPENED BY MISTAKE · **Claim survival:** 27%
**Lane / runtime:** Envelope, 35.4 s master (spec `10-envelope-audit-c.json`)

**Frame-1 hook**
- On screen (fully drawn in frame 1): **THE CLAIM:** above **“At $1.04 BILLION, / a $2 Powerball / ticket's worth $3.56.”** ("$3.56" in red), with the **AUDIT** stamp at 0.4 s.
- First spoken line (0.1–2.0 s): **"A two-dollar ticket worth three fifty-six?"**

**Beat sheet**
| Time | Beat | On screen |
|---|---|---|
| 0.0–2.0 | Hook: the claim | Tape quote (frame 1), AUDIT stamp at 0.4 s, postmark No. 10C |
| 2.0–4.0 | "Let's audit the jackpot math." | 🎟️ (claim stays up) |
| 4.0–8.2 | The real inputs | **Aug 12, 2026 jackpot: $1.04B**, **odds: 1 in 292,201,338**. Flip |
| 8.2–10.6 | **Credit first / first payoff** (written by 9.9 s = 28%) | **$1.04B ÷ 292.2M ≈ $3.56 ✓** (green), postage stamp **$2 ONE TICKET**, ASSUME sticky |
| 10.6–12.8 | Strike 1: the annuity (pattern break, 31%) | **$1.04B** struck, "= 30 yearly payments" |
| 12.8–17.4 | The cash (**second payoff, already under $2**) | "→ cash: $450.5M", **$450.5M ÷ 292.2M ≈ $1.54** (circled) |
| 17.4–20.0 | Strike 2: tax | "− 37% federal tax", **$1.54 × 63% ≈ ?** (red ?) |
| 20.0–24.0 | Seal and guess | "jackpot share of one $2 ticket:", sealed envelope "what's it really worth?", PAUSE & GUESS |
| 24.0–28.4 | **Reveal** (68%) | Card: **≈ 97¢** / all prizes, tax-free: ≤ $1.29 |
| 28.4 | **Verdict** (80%) | Stamp **OPENED BY MISTAKE** |
| 30.2–32.2 | Re-hook | Tape **When is the jackpot share worth $2?**, pencil "about 2 × $1.04B →" |
| 32.2–35.4 | **Biggest number + survival (last 2 s)** | **≈ $2.1 BILLION** in red, double-underlined (fully written at 33.5 s), then **CLAIM SURVIVAL: 27%** (34.6 s). VO "Ever seen one that big?" cuts back to the $1.04 BILLION claim tape |

**Full voice-over**
> A two-dollar ticket worth three fifty-six? Let's audit the jackpot math. August's jackpot: one point oh four billion. Odds: one in two hundred ninety-two million. Divide, and yes: three fifty-six. On paper. But the billion is thirty yearly payments. Take the cash instead: four fifty point five million. That's a dollar fifty-four a ticket. Then federal tax takes the top rate: thirty-seven percent. So what's it really worth per ticket? *(two-second pause, ticking)* About ninety-seven cents. Add every smaller prize, even tax-free: a dollar twenty-nine. The obvious math opened the wrong envelope. When is the jackpot share worth two bucks? Roughly double: two point one billion. Ever seen one that big?

**The envelope math (3 lines)**
1. `$1.04B ÷ 292.2M ≈ $3.56` (the claim's own math, credited ✓; exact $3.5592)
2. `$450.5M ÷ 292.2M ≈ $1.54` (cash option; exact $1.5417)
3. `$1.54 × 63% ≈ ?`, sealed as **≈ 97¢** (exact with the 2026 brackets: $0.9715). Card line 2: **all prizes, tax-free: ≤ $1.29** (upper bound: + 32.0¢ of smaller prizes, pre-tax)
- Last 2 s: the jackpot share scales with the jackpot, so it reaches $2 at $2 ÷ 97.15¢ = 2.06 × $1.04B, written "about 2 × $1.04B → **≈ $2.1 BILLION**" (exact $2.14B, within 2%). This is a scaling of line 3, not a new calculation line.

**ASSUME sticky:** "One winner, no split. Federal tax only, no state tax."

| Input | Value used | Source (writer checked 2026-10-07; QA status in the Verification log) |
|---|---|---|
| Jackpot (annuity) | **$1.040 billion**, Powerball draw of **Wed Aug 12, 2026**, one ticket sold in Quincy, IL | Powerball, "$1.040 Billion Powerball Jackpot Won in Illinois" ([powerball.com](https://www.powerball.com/1.040-billion-powerball-jackpot-won-in-illinois)) |
| Cash value | **$450.5 million** (the cash option) | Same page. The video no longer says which option the winner chose. Context only: the writer found an Illinois Lottery release saying the lump sum was taken ([illinoislottery.com](https://www.illinoislottery.com/illinois-lottery/press-and-media-center/press-release/2026/9/mystery-solved-illinois-lottery-confirm-1-04-billion-powerball-jackpot-has-been-claimed)) |
| Annuity structure | 30 graduated payments over 29 years, rising 5% a year ("thirty yearly payments" on screen) | Powerball FAQs ([powerball.com/faqs](https://www.powerball.com/faqs)) |
| Jackpot odds, ticket price, smaller prizes | **1 in 292,201,338** (= C(69,5) × 26, re-derived in the math check); **$2** per play; every tier from $1M (1 in 11,688,053.52) to $4 (1 in 38.32) | Powerball prize chart ([powerball.com](https://www.powerball.com/powerball-prize-chart)); the same chart is cited independently in `teasers/09-itemized-tally.md` |
| Federal tax | **37%** top rate (over $640,600, single, 2026). Exact calculation uses the full 2026 schedule with a $16,100 standard deduction | IRS, tax year 2026 inflation adjustments (Rev. Proc. 2025-32) ([irs.gov](https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill)) |
| State tax, jackpot splits | Excluded (both would make the ticket worth *less*) | Assumption on the sticky |
| Help line | 1-800-GAMBLER (National Problem Gambling Helpline) | NCPG fact sheet ([ncpgambling.org](https://www.ncpgambling.org/wp-content/uploads/2023/12/1-800-GAMBLER-Fact-Sheet.pdf)), as cited by the 09 team |

*Caveat: powerball.com and illinoislottery.com were egress-blocked for direct fetching for both the writer and QA. The jackpot, cash value and draw date come from the writer's WebSearch results on those official pages and local-news syndication of the same AP report. QA could only check consistency: Aug 12, 2026 was a Wednesday (a draw day), and the 09 team's sourced Oct 7, 2026 jackpot ($485M after 23 rollovers) fits a reset in mid-August. Re-open the pages before publishing.*

**Ending**
- Loop / re-hook: the tape asks "When is the jackpot share worth $2?", the red ≈ $2.1 BILLION lands, and "Ever seen one that big?" cuts back to the "$1.04 BILLION" claim tape.
- Comment bait: *Ever seen a jackpot that big?* (Viewers post the biggest jackpot they remember, and the "math police" argue about it. We don't assert a record figure until one has been re-sourced.)
- **Pinned comment:** "Exact: 97.15¢ of jackpot value per $2 ticket (envelope said ≈ 97¢, within 0.2%), using 2026 federal brackets on the $450.5M cash option (effective 36.99%), one winner, no state tax. Every smaller prize, counted tax-free, adds at most 32.0¢, so ≤ $1.29. The claim's $3.56 used the 30-payment annuity. Break-even for the jackpot share alone: ≈ $2.14B advertised (envelope said ≈ $2.1B, within 2%), or ≈ $1.80B counting smaller prizes tax-free, at the same 43% cash ratio and 37% tax, assuming nobody splits it (splits push it higher). Claim survival: 27%. This is arithmetic, not a recommendation. Gambling problem? 1-800-GAMBLER."

**Description:** "At $1.04 billion, a $2 Powerball ticket's worth $3.56? On paper, yes. We audited it on one envelope. The billion is 30 yearly payments: the cash option was $450.5M, and federal tax takes 37%. The jackpot share of a ticket is about 97¢. Even with every smaller prize counted tax-free, it's about $1.29. Sources: Powerball (Aug 12, 2026 draw, $1.040B annuity / $450.5M cash; prize chart odds 1 in 292,201,338) and the IRS 2026 tax rates. Assumes one winner, no state tax. Checked 2026-10-07. Gambling problem? 1-800-GAMBLER. Educational math, not financial advice."
**Hashtags:** #powerball #lottery #moneymath #envelopemath #math

**Platform notes**
- **YouTube Shorts:** use the 35.4 s master. Repost-proof: only names and public numbers, no lottery logos or broadcast clips. Post it the week Powerball next crosses $1B (report 01 §3.11, "ride the price story of the week") and update the inputs with that week's annuity and cash figures (the math check re-runs in a second).
- **Instagram Reels (~45 s):** add a beat on splits, "more tickets sold means more chance you share it", with no number on screen unless sourced. Then extend the ending with the all-prizes break-even (≈ $1.8B advertised, counting smaller prizes tax-free). Caption: "Send this to the office-pool organiser."
- **TikTok (~62 s):** add the splits beat and the tax-bracket detail (effective 36.99%, not a flat 37%). *Don't name a record jackpot until it has been re-sourced; it wasn't verified here.* Skip the tier-by-tier prize ladder: it is the whole of teaser 09C (Itemized Tally), so the two shouldn't post in the same window.

**Why this one should travel:** a famous noun (Powerball) is in frame 1, and the viral "expected value" claim is *correct on paper*, so the credit beat is real and the twist (OPENED BY MISTAKE) earns its stamp. It rides a dated news event (a $1.04B jackpot won on Aug 12, 2026), and the research shows topical prices drive breakouts (report 01 §3.11). Specific numbers (292,201,338; $450.5M) read as true (report 01 §3.8). The ending lands a bigger number than the hook (≈ $2.1B) and asks a question viewers love to answer from memory (report 01 §3.6–3.7).

---

### Math check

Script: `teasers/10-envelope-audit-mathcheck.py` (run with `python3 teasers/10-envelope-audit-mathcheck.py`). It recomputes every on-screen, spoken, sealed-card and pinned-comment number in 10A–10C. It simulates the minimum-payment payoff month by month (cent rounding), computes the lottery tax with the full 2026 single-filer schedule, and shows the 10B answer holds for any APR from 21% to 23%. It then reads the three specs and asserts:
- the on-screen strings;
- captions that match the VO word for word;
- a fully drawn claim hook with a $ figure in frame 1;
- ≥ 0.25 s per word on every caption;
- the first payoff by 40%;
- the biggest number inside the last 2 s;
- the 10B curve equal to the exact 22.15% balance path.

It stops with `MISMATCH` or `FAILED` if anything drifts.

```python
#!/usr/bin/env python3
"""Math check for approach #10, The Envelope Audit (teasers 10A, 10B, 10C).

Recomputes every number that appears on screen, in the voice-over, on the
sealed card, in the pinned comments and in the "claim survival" stat, then
reads the three specs and asserts that what is drawn matches what is computed.
Inputs are the real-world figures listed in teasers/10-envelope-audit.md
(sources, dates and verification status there).
Run from anywhere: python3 teasers/10-envelope-audit-mathcheck.py
"""
from decimal import Decimal as D, ROUND_HALF_UP
from pathlib import Path
import json
import math
import re

ok_count = 0
SPECS = Path(__file__).resolve().parent.parent / "engine" / "specs"


def check(label, got, want, tol=1e-9):
    """Assert that a computed value matches what the script/screen says."""
    global ok_count
    good = abs(got - want) <= tol
    flag = "ok " if good else "XX "
    print(f"  {flag} {label}: computed {got:,.4f} | on screen {want:,.4f}")
    if not good:
        raise SystemExit(f"MISMATCH: {label}")
    ok_count += 1


def assert_true(label, cond):
    global ok_count
    print(f"  {'ok ' if cond else 'XX '} {label}")
    if not cond:
        raise SystemExit(f"FAILED: {label}")
    ok_count += 1


def pct_off(rough, exact):
    return abs(rough - exact) / exact * 100


def money(x):
    return float(D(str(x)).quantize(D("0.01"), rounding=ROUND_HALF_UP))


# ----------------------------------------------------------------------------
print("10A  'Write off your $100-a-night chef. Dinner's FREE.'")
# Inputs: ASSUME $100 per dinner (chef + groceries). 26 USC 274(n): meals 50%.
# IRS 2026 brackets (Rev. Proc. 2025-32): 24% band, single $105,700-$201,775.
dinner = 100.0
meal_cap = 0.50
rate = 0.24
deductible = dinner * meal_cap
back = deductible * rate
you_pay = dinner - back
check("line 1: $100 x 50% cap = $50 deductible", deductible, 50)
check("line 2: $50 x 24% = $12 back", back, 12)
check("sealed card: $100 - $12 = $88 (not $0)", you_pay, 88)
check("postage: 12 cents back per $1", back / dinner, 0.12)
year = 365
check("a year of dinners: $100 x 365 = $36,500", dinner * year, 36_500)
check("you still pay a year: $88 x 365 = $32,120", you_pay * year, 32_120)
check("tax back a year: $12 x 365 = $4,380", back * year, 4_380)
check("last 2 s: '≈ $32K a year' is within 0.4% of $32,120", pct_off(32_000, you_pay * year), 0.37, 0.005)
check("claim survival: $12 saved of the $100 'free' = 12%", back / dinner * 100, 12)
# Robustness for the pinned comment: even a 50% combined marginal rate.
check("pinned: at a 50% combined rate the dinner still costs $75", dinner - dinner * meal_cap * 0.50, 75)
# Personal / family dinners: 26 USC 262 -> $0 deductible -> pay the full $100.
check("pinned: a family (personal) dinner saves $0, costs $100", dinner - 0, 100)

# ----------------------------------------------------------------------------
print("\n10B  'Pay the minimum on $5,000 and you'll pay for 20 YEARS.'")
# Inputs: ASSUME $5,000 balance, no new charges. Fed G.19 accounts-assessed-
# interest rate, Q2 2026 = 22.15% (envelope rounds to 22%). Minimum = the greater
# of $25 or 1% of the balance + that month's interest (Capital One terms; Chase $40).
B0 = 5_000.0


def payoff(balance, apr, floor, pct=0.01):
    """Month-by-month minimum-only payoff, interest = balance x APR/12, cents rounded."""
    r = apr / 12
    months, paid, interest = 0, 0.0, 0.0
    path = [balance]
    while balance > 0.004:
        i = money(balance * r)
        due = money(balance + i)
        pay = min(money(max(floor, pct * balance + i)), due)
        balance = money(due - pay)
        paid += pay
        interest += i
        months += 1
        path.append(balance)
    return months, money(paid), money(interest), path


env_int = B0 * 0.22 / 12
check("line 1: $5,000 x 22% / 12 ≈ $92 interest", env_int, 91.67, 0.005)
check("line 2: + 1% of $5,000 = $50", B0 * 0.01, 50)
check("line 2: min ≈ $92 + $50 = $142", round(env_int) + 50, 142)
halving = math.log(2) / -math.log(1 - 0.01)
check("line 3: debt shrinks 1%/mo -> halves every ~69 months", halving, 68.97, 0.01)
check("        69 months = 5.75 years ('about every 6 years')", halving / 12, 5.75, 0.01)
check("rule of 70 shortcut (TikTok cut): 70 / 1 = 70 months", 70 / 1, 70)
floor_kicks_in = 25 / (0.01 + 0.22 / 12)
print(f"  $25 floor takes over below ${floor_kicks_in:,.2f} of balance (envelope 22%)")

m22, paid22, int22, path22 = payoff(B0, 0.22, 25)
m_ex, paid_ex, int_ex, path_ex = payoff(B0, 0.2215, 25)
m40, paid40, int40, _ = payoff(B0, 0.2215, 40)
print(f"  at 22% (envelope rate): {m22} months = {m22/12:.2f} yr, paid ${paid22:,.2f}, interest ${int22:,.2f}")
print(f"  EXACT at 22.15% (Fed Q2 2026), $25 floor: {m_ex} months = {m_ex//12} yr {m_ex%12} mo, "
      f"paid ${paid_ex:,.2f}, interest ${int_ex:,.2f}")
print(f"  same at a $40 floor: {m40} months = {m40//12} yr {m40%12} mo, paid ${paid40:,.2f}, interest ${int40:,.2f}")
check("sealed card: ≈ 19 years (exact months / 12)", m_ex / 12, 19.25, 0.0001)
check("  envelope '19' vs exact 19.25 yr: within 1.3%", pct_off(19, m_ex / 12), 1.30, 0.005)
check("last 2 s: ≈ $13,100 paid (envelope rate 22%)", paid22, 13_100, 0.5)
check("pinned: exact paid at 22.15% = $13,158.75", paid_ex, 13_158.75, 0.005)
check("  envelope ≈ $13,100 vs exact: within 0.5%", pct_off(13_100, paid_ex), 0.45, 0.005)
check("pinned: exact interest = $8,158.75", int_ex, 8_158.75, 0.005)
check("pinned: $40 floor -> 184 months", m40, 184)
check("pinned: $40 floor -> $12,516.44 paid", paid40, 12_516.44, 0.005)
check("first month exact interest at 22.15%", money(B0 * 0.2215 / 12), 92.29)
check("pay $5,000, hand over ≈ 2.6x", paid_ex / B0, 2.63, 0.01)
check("claim '20 years' is within 4% of the exact 19.25", pct_off(20, m_ex / 12), 3.90, 0.005)
check("claim survival: 19.25 of the claimed 20 years = 96%", round(m_ex / 12 / 20 * 100), 96)
# Robustness: the APR could not be re-verified by QA, so show the answer does not hinge on it.
spread = {apr: payoff(B0, apr, 25)[0] for apr in (0.21, 0.215, 0.22, 0.2215, 0.225, 0.23)}
print("  robustness, months by APR ($25 floor): " + ", ".join(f"{a*100:.2f}%: {m}" for a, m in spread.items()))
assert_true("every APR from 21% to 23% still rounds to ≈ 19 years", all(round(m / 12) == 19 for m in spread.values()))
check("curve mark 'yr 6 ≈ $2.4K' (written rounded)", path_ex[72], 2_400, 50)
check("curve mark 'yr 12 ≈ $1.2K' (written rounded)", path_ex[144], 1_200, 50)
check("balance path is APR-independent until the floor: yr 6 at 22% = at 22.15%", path22[72], path_ex[72], 0.01)

# ----------------------------------------------------------------------------
print("\n10C  'At $1.04 BILLION, a $2 Powerball ticket's worth $3.56.'")
# Inputs: Powerball draw of Aug 12 2026: $1.040B annuity, $450.5M cash (powerball.com).
# Jackpot odds 1 in 292,201,338; $2 play (Powerball prize chart).
# Top federal rate 37% (IRS, tax year 2026). State tax excluded. Single winner assumed.
odds = 292_201_338
annuity = 1.040e9
cash = 450.5e6
check("odds = C(69,5) x 26", math.comb(69, 5) * 26, odds)
naive = annuity / odds
cash_per = cash / odds
after_tax_flat = cash * (1 - 0.37) / odds
check("line 1 (the claim): $1.04B / 292.2M ≈ $3.56", naive, 3.56, 0.005)
check("line 2: $450.5M cash / 292.2M ≈ $1.54", cash_per, 1.54, 0.005)
check("line 3: $1.54 x 63% ≈ $0.97 (envelope uses the rounded $1.54)", 1.54 * 0.63, 0.97, 0.005)
check("line 3 unrounded: cash x 63% / odds", after_tax_flat, 0.97, 0.005)
check("cash share of the advertised jackpot ≈ 43%", cash / annuity * 100, 43.32, 0.01)

# Exact federal tax with the 2026 single-filer schedule (Rev. Proc. 2025-32),
# standard deduction $16,100, no other income (state tax excluded).
brackets = [(12_400, .10), (50_400, .12), (105_700, .22), (201_775, .24),
            (256_225, .32), (640_600, .35), (float("inf"), .37)]


def tax_2026_single(income):
    taxable = max(0.0, income - 16_100)
    tax, lo = 0.0, 0.0
    for hi, r in brackets:
        if taxable > lo:
            tax += (min(taxable, hi) - lo) * r
        lo = hi
    return tax


fed = tax_2026_single(cash)
exact = (cash - fed) / odds
print(f"  exact 2026 federal tax on $450.5M: ${fed:,.0f} (effective {fed/cash*100:.4f}%)")
check("sealed card: ≈ 97¢ (exact brackets)", exact, 0.97, 0.005)
check("  envelope 97¢ vs exact: within 0.2%", pct_off(0.97, exact), 0.15, 0.005)

small = [  # (prize, odds per $2 play), Powerball prize chart; two $100, two $7 and two $4 tiers
    (1_000_000, 11_688_053.52), (50_000, 913_129.18), (100, 36_525.17), (100, 14_494.11),
    (7, 579.76), (7, 701.33), (4, 91.98), (4, 38.32),
]
ev_small = sum(prize / o for prize, o in small)
check("TikTok cut: the $1M tier is worth ≈ 8.6¢ a ticket", 1_000_000 / 11_688_053.52, 0.086, 0.0005)
check("every smaller prize, pre-tax ≈ 32.0¢", ev_small, 0.320, 0.0005)
upper = exact + ev_small
check("card line 2: all prizes, small ones tax-free, ≤ $1.29", upper, 1.29, 0.005)
check("claim survival: $0.97 of the claimed $3.56 = 27%", round(exact / naive * 100), 27)
be_jackpot_only = 2 * odds / ((cash / annuity) * 0.63)
be_exact_scaling = annuity * 2 / exact
be_with_small = (2 - ev_small) * odds / ((cash / annuity) * 0.63)
check("last 2 s: 'about 2 x $1.04B' (multiplier $2 / 97.15¢)", 2 / exact, 2.06, 0.005)
check("pinned: break-even ≈ $2.14B jackpot share alone (flat 37%)", be_jackpot_only / 1e9, 2.14, 0.005)
check("  same by scaling the exact 97.15¢", be_exact_scaling / 1e9, 2.14, 0.005)
check("last 2 s: '≈ $2.1 BILLION' is within 2% of $2.14B", pct_off(2.1e9, be_jackpot_only), 1.94, 0.005)
check("pinned: break-even ≈ $1.80B with small prizes tax-free", be_with_small / 1e9, 1.80, 0.005)
check("the claim's own break-even: 2 x 292,201,338 = $584.4M", 2 * odds / 1e6, 584.40, 0.005)

# ----------------------------------------------------------------------------
print("\nSpecs: on-screen strings, captions, frame 1, timing")


def load(stem):
    return json.loads((SPECS / f"{stem}.json").read_text())


def drawn_text(spec):
    out = []
    for op in spec["ops"]:
        t = op.get("text")
        if isinstance(t, list):
            out.extend(t)
        elif isinstance(t, str):
            out.append(t)
        for c in op.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for m in op.get("marks", []):
            out.append(m["text"])
        if op["type"] == "postage":
            out.append(f'{op["value"]} {op.get("label", "")}')
    return [s.replace("*", "") for s in out]


def has(spec, s):
    return any(s in t for t in drawn_text(spec))


def words(s):
    return len([w for w in re.split(r"\s+", s) if re.search(r"[A-Za-z0-9$¢%?≈≠]", w)])


def hook_ready(op):
    return op["t"] + 0.2 + 0.14 * (len(op["text"]) - 1)


musts = {
    "10-envelope-audit-a": ["$100-a-night chef.", "$100 × 50% cap = $50", "$50 × 24% = $12 back", "$88", "not $0",
                             "12¢ BACK PER $1", "≈ $32K a year", "CLAIM SURVIVAL: 12%", "IRC §274(n)"],
    "10-envelope-audit-b": ["$5,000 and you'll", "20 YEARS", "$5,000 × 22% ÷ 12 ≈ $92", "min: $92 + $50 = $142",
                             "1%/mo → halves every ~6 yrs", "yr 6 ≈ $2.4K", "yr 12 ≈ $1.2K", "≈ 19 years",
                             "the claim said 20", "≈$13,100", "CLAIM SURVIVAL: 96%", "22% APR"],
    "10-envelope-audit-c": ["$1.04 BILLION", "$3.56", "odds: 1 in 292,201,338", "$1.04B ÷ 292.2M ≈ $3.56",
                             "$450.5M ÷ 292.2M ≈ $1.54", "$1.54 × 63% ≈", "≈ 97¢", "≤ $1.29", "30 yearly payments",
                             "about 2 × $1.04B", "≈ $2.1 BILLION", "CLAIM SURVIVAL: 27%"],
}
# the biggest number of each video and where it must land (last 2 s)
biggest = {"10-envelope-audit-a": "≈ $32K a year", "10-envelope-audit-b": "ours: ≈19 yrs, ≈$13,100",
           "10-envelope-audit-c": "≈ $2.1 BILLION"}
first_payoff = {"10-envelope-audit-a": "$100 × 50% cap = $50", "10-envelope-audit-b": "min: $92 + $50 = $142",
                "10-envelope-audit-c": "$1.04B ÷ 292.2M ≈ $3.56"}

for stem, strings in musts.items():
    spec = load(stem)
    dur = spec["duration"]
    print(f" {stem} ({dur}s)")
    for s in strings:
        assert_true(f"on screen: '{s}'", has(spec, s))
    vo = re.sub(r"\s*\[[^\]]*\]\s*", " ", spec["vo"]).split()
    caps = " ".join(c["text"] for c in spec["captions"]).split()
    assert_true("captions = voice-over word for word", vo == caps)
    hooks = [op for op in spec["ops"] if op["type"] == "hook"]
    assert_true("frame 1: the claim hook is fully drawn at t = 0", hook_ready(hooks[0]) <= 0.0)
    assert_true("frame 1: the claim hook carries a $ figure", any("$" in line for line in hooks[0]["text"]))
    slow = [c for c in spec["captions"] if c["end"] - c["t"] < 0.25 * words(c["text"]) - 1e-9]
    assert_true("every caption is on screen ≥ 0.25 s per word", not slow)
    fp = next(op for op in spec["ops"] if op.get("text") == first_payoff[stem])
    fp_done = fp["t"] + len(fp["text"]) / fp["cps"]
    assert_true(f"first payoff written by {fp_done:.1f}s = {fp_done/dur*100:.0f}% (≤ 40%)", fp_done / dur <= 0.40)
    big = next(op for op in spec["ops"] if op.get("text") == biggest[stem])
    big_done = big["t"] + len(big["text"]) / big["cps"]
    assert_true(f"biggest number '{biggest[stem]}' lands at {big_done:.2f}s, inside the last 2 s",
                dur - 2 <= big_done <= dur - 1.0)
    env = next(op for op in spec["ops"] if op["type"] == "envelope")
    assert_true(f"sealed reveal at {env['openAt']}s = {env['openAt']/dur*100:.0f}% (after a 3 s timer)",
                any(op["type"] == "timer" and op["t"] + op["seconds"] <= env["openAt"] for op in spec["ops"]))
    surv = next(op for op in spec["ops"] if str(op.get("text", "")).startswith("CLAIM SURVIVAL"))
    assert_true("claim-survival stat finishes ≥ 0.75 s before the end",
                surv["t"] + len(surv["text"]) / surv["cps"] <= dur - 0.75)

curve = next(op for op in load("10-envelope-audit-b")["ops"] if op["type"] == "curve")
want = [round(path_ex[k]) for k in range(0, len(path_ex), 3)]
assert_true(f"10B curve = exact 22.15% balance every 3 months ({len(want)} points, 0 at month {m_ex})",
            curve["values"] == want)
assert_true("10B curve marks sit at month 72 and 144", [m["i"] * 3 for m in curve["marks"]] == [72, 144])

print(f"\nAll {ok_count} checks passed.")
```

Output (run 2026-10-07):

```text
10A  'Write off your $100-a-night chef. Dinner's FREE.'
  ok  line 1: $100 x 50% cap = $50 deductible: computed 50.0000 | on screen 50.0000
  ok  line 2: $50 x 24% = $12 back: computed 12.0000 | on screen 12.0000
  ok  sealed card: $100 - $12 = $88 (not $0): computed 88.0000 | on screen 88.0000
  ok  postage: 12 cents back per $1: computed 0.1200 | on screen 0.1200
  ok  a year of dinners: $100 x 365 = $36,500: computed 36,500.0000 | on screen 36,500.0000
  ok  you still pay a year: $88 x 365 = $32,120: computed 32,120.0000 | on screen 32,120.0000
  ok  tax back a year: $12 x 365 = $4,380: computed 4,380.0000 | on screen 4,380.0000
  ok  last 2 s: '≈ $32K a year' is within 0.4% of $32,120: computed 0.3736 | on screen 0.3700
  ok  claim survival: $12 saved of the $100 'free' = 12%: computed 12.0000 | on screen 12.0000
  ok  pinned: at a 50% combined rate the dinner still costs $75: computed 75.0000 | on screen 75.0000
  ok  pinned: a family (personal) dinner saves $0, costs $100: computed 100.0000 | on screen 100.0000

10B  'Pay the minimum on $5,000 and you'll pay for 20 YEARS.'
  ok  line 1: $5,000 x 22% / 12 ≈ $92 interest: computed 91.6667 | on screen 91.6700
  ok  line 2: + 1% of $5,000 = $50: computed 50.0000 | on screen 50.0000
  ok  line 2: min ≈ $92 + $50 = $142: computed 142.0000 | on screen 142.0000
  ok  line 3: debt shrinks 1%/mo -> halves every ~69 months: computed 68.9676 | on screen 68.9700
  ok          69 months = 5.75 years ('about every 6 years'): computed 5.7473 | on screen 5.7500
  ok  rule of 70 shortcut (TikTok cut): 70 / 1 = 70 months: computed 70.0000 | on screen 70.0000
  $25 floor takes over below $882.35 of balance (envelope 22%)
  at 22% (envelope rate): 230 months = 19.17 yr, paid $13,099.76, interest $8,099.76
  EXACT at 22.15% (Fed Q2 2026), $25 floor: 231 months = 19 yr 3 mo, paid $13,158.75, interest $8,158.75
  same at a $40 floor: 184 months = 15 yr 4 mo, paid $12,516.44, interest $7,516.44
  ok  sealed card: ≈ 19 years (exact months / 12): computed 19.2500 | on screen 19.2500
  ok    envelope '19' vs exact 19.25 yr: within 1.3%: computed 1.2987 | on screen 1.3000
  ok  last 2 s: ≈ $13,100 paid (envelope rate 22%): computed 13,099.7600 | on screen 13,100.0000
  ok  pinned: exact paid at 22.15% = $13,158.75: computed 13,158.7500 | on screen 13,158.7500
  ok    envelope ≈ $13,100 vs exact: within 0.5%: computed 0.4465 | on screen 0.4500
  ok  pinned: exact interest = $8,158.75: computed 8,158.7500 | on screen 8,158.7500
  ok  pinned: $40 floor -> 184 months: computed 184.0000 | on screen 184.0000
  ok  pinned: $40 floor -> $12,516.44 paid: computed 12,516.4400 | on screen 12,516.4400
  ok  first month exact interest at 22.15%: computed 92.2900 | on screen 92.2900
  ok  pay $5,000, hand over ≈ 2.6x: computed 2.6317 | on screen 2.6300
  ok  claim '20 years' is within 4% of the exact 19.25: computed 3.8961 | on screen 3.9000
  ok  claim survival: 19.25 of the claimed 20 years = 96%: computed 96.0000 | on screen 96.0000
  robustness, months by APR ($25 floor): 21.00%: 228, 21.50%: 229, 22.00%: 230, 22.15%: 231, 22.50%: 231, 23.00%: 232
  ok  every APR from 21% to 23% still rounds to ≈ 19 years
  ok  curve mark 'yr 6 ≈ $2.4K' (written rounded): computed 2,424.9400 | on screen 2,400.0000
  ok  curve mark 'yr 12 ≈ $1.2K' (written rounded): computed 1,176.0800 | on screen 1,200.0000
  ok  balance path is APR-independent until the floor: yr 6 at 22% = at 22.15%: computed 2,424.9500 | on screen 2,424.9400

10C  'At $1.04 BILLION, a $2 Powerball ticket's worth $3.56.'
  ok  odds = C(69,5) x 26: computed 292,201,338.0000 | on screen 292,201,338.0000
  ok  line 1 (the claim): $1.04B / 292.2M ≈ $3.56: computed 3.5592 | on screen 3.5600
  ok  line 2: $450.5M cash / 292.2M ≈ $1.54: computed 1.5417 | on screen 1.5400
  ok  line 3: $1.54 x 63% ≈ $0.97 (envelope uses the rounded $1.54): computed 0.9702 | on screen 0.9700
  ok  line 3 unrounded: cash x 63% / odds: computed 0.9713 | on screen 0.9700
  ok  cash share of the advertised jackpot ≈ 43%: computed 43.3173 | on screen 43.3200
  exact 2026 federal tax on $450.5M: $166,635,000 (effective 36.9889%)
  ok  sealed card: ≈ 97¢ (exact brackets): computed 0.9715 | on screen 0.9700
  ok    envelope 97¢ vs exact: within 0.2%: computed 0.1514 | on screen 0.1500
  ok  TikTok cut: the $1M tier is worth ≈ 8.6¢ a ticket: computed 0.0856 | on screen 0.0860
  ok  every smaller prize, pre-tax ≈ 32.0¢: computed 0.3199 | on screen 0.3200
  ok  card line 2: all prizes, small ones tax-free, ≤ $1.29: computed 1.2913 | on screen 1.2900
  ok  claim survival: $0.97 of the claimed $3.56 = 27%: computed 27.0000 | on screen 27.0000
  ok  last 2 s: 'about 2 x $1.04B' (multiplier $2 / 97.15¢): computed 2.0587 | on screen 2.0600
  ok  pinned: break-even ≈ $2.14B jackpot share alone (flat 37%): computed 2.1415 | on screen 2.1400
  ok    same by scaling the exact 97.15¢: computed 2.1411 | on screen 2.1400
  ok  last 2 s: '≈ $2.1 BILLION' is within 2% of $2.14B: computed 1.9361 | on screen 1.9400
  ok  pinned: break-even ≈ $1.80B with small prizes tax-free: computed 1.7990 | on screen 1.8000
  ok  the claim's own break-even: 2 x 292,201,338 = $584.4M: computed 584.4027 | on screen 584.4000

Specs: on-screen strings, captions, frame 1, timing
 10-envelope-audit-a (35.4s)
  ok  on screen: '$100-a-night chef.'
  ok  on screen: '$100 × 50% cap = $50'
  ok  on screen: '$50 × 24% = $12 back'
  ok  on screen: '$88'
  ok  on screen: 'not $0'
  ok  on screen: '12¢ BACK PER $1'
  ok  on screen: '≈ $32K a year'
  ok  on screen: 'CLAIM SURVIVAL: 12%'
  ok  on screen: 'IRC §274(n)'
  ok  captions = voice-over word for word
  ok  frame 1: the claim hook is fully drawn at t = 0
  ok  frame 1: the claim hook carries a $ figure
  ok  every caption is on screen ≥ 0.25 s per word
  ok  first payoff written by 12.1s = 34% (≤ 40%)
  ok  biggest number '≈ $32K a year' lands at 33.72s, inside the last 2 s
  ok  sealed reveal at 24.4s = 69% (after a 3 s timer)
  ok  claim-survival stat finishes ≥ 0.75 s before the end
 10-envelope-audit-b (35.4s)
  ok  on screen: '$5,000 and you'll'
  ok  on screen: '20 YEARS'
  ok  on screen: '$5,000 × 22% ÷ 12 ≈ $92'
  ok  on screen: 'min: $92 + $50 = $142'
  ok  on screen: '1%/mo → halves every ~6 yrs'
  ok  on screen: 'yr 6 ≈ $2.4K'
  ok  on screen: 'yr 12 ≈ $1.2K'
  ok  on screen: '≈ 19 years'
  ok  on screen: 'the claim said 20'
  ok  on screen: '≈$13,100'
  ok  on screen: 'CLAIM SURVIVAL: 96%'
  ok  on screen: '22% APR'
  ok  captions = voice-over word for word
  ok  frame 1: the claim hook is fully drawn at t = 0
  ok  frame 1: the claim hook carries a $ figure
  ok  every caption is on screen ≥ 0.25 s per word
  ok  first payoff written by 10.9s = 31% (≤ 40%)
  ok  biggest number 'ours: ≈19 yrs, ≈$13,100' lands at 33.65s, inside the last 2 s
  ok  sealed reveal at 25.0s = 71% (after a 3 s timer)
  ok  claim-survival stat finishes ≥ 0.75 s before the end
 10-envelope-audit-c (35.4s)
  ok  on screen: '$1.04 BILLION'
  ok  on screen: '$3.56'
  ok  on screen: 'odds: 1 in 292,201,338'
  ok  on screen: '$1.04B ÷ 292.2M ≈ $3.56'
  ok  on screen: '$450.5M ÷ 292.2M ≈ $1.54'
  ok  on screen: '$1.54 × 63% ≈'
  ok  on screen: '≈ 97¢'
  ok  on screen: '≤ $1.29'
  ok  on screen: '30 yearly payments'
  ok  on screen: 'about 2 × $1.04B'
  ok  on screen: '≈ $2.1 BILLION'
  ok  on screen: 'CLAIM SURVIVAL: 27%'
  ok  captions = voice-over word for word
  ok  frame 1: the claim hook is fully drawn at t = 0
  ok  frame 1: the claim hook carries a $ figure
  ok  every caption is on screen ≥ 0.25 s per word
  ok  first payoff written by 9.9s = 28% (≤ 40%)
  ok  biggest number '≈ $2.1 BILLION' lands at 33.48s, inside the last 2 s
  ok  sealed reveal at 24.0s = 68% (after a 3 s timer)
  ok  claim-survival stat finishes ≥ 0.75 s before the end
  ok  10B curve = exact 22.15% balance every 3 months (78 points, 0 at month 231)
  ok  10B curve marks sit at month 72 and 144

All 110 checks passed.
```

---

### Verification log

QA pass by an independent fact-checker, editor and QA reviewer, 2026-10-07. I assumed there were mistakes and looked for them. Files touched: this md, `teasers/10-envelope-audit-mathcheck.py`, `engine/specs/10-envelope-audit-{a,b,c}.json`, and the re-rendered `engine/out/sheets/10-envelope-audit-{a,b,c}.png` and `engine/out/stills/10-envelope-audit-*`. `engine/src` was not edited.

**1. Math (recomputed independently with python3, then the script was rewritten to cover the specs too)**
- **Checked:** every number in the md, the VO, the captions, the tape hooks, the envelope lines, the sealed cards, the curve values and marks, the pinned comments and the descriptions.
  - 10A: $100 × 50% × 24% = $12 → $88; $88 × 365 = $32,120; $12 × 365 = $4,380; $75 at a 50% rate.
  - 10B: $91.67 and $92.29; $142; 68.97 months = 5.75 years. The month-by-month payoff: 230 months and $13,099.76 at 22%; 231 months, $13,158.75 and $8,158.75 at 22.15%; 184 months and $12,516.44 at a $40 floor. Curve marks $2,425 and $1,176.
  - 10C: 3.5592, 1.5417, 0.9702, 0.9713 and 0.9715; $166,635,000 of tax (36.99% effective); 31.99¢ of smaller prizes; $1.2913; break-evens of $2.1415B and $1.7990B; C(69,5) × 26 = 292,201,338.
  - Every claim-survival figure (12%, 96%, 27%) and every "within X%".
- **Arithmetic errors in the writer's numbers:** none.
- **Wrong (curve data):** 10B's curve was the 22% path (230 months) with an extra 0 appended. Its x-axis therefore implied 231 months while the tail values came from the other APR, and the md called it "the exact balance at 22% (230 months)". **Changed:** the curve is now the exact 22.15% path sampled every 3 months (78 points, $0 at month 231), and the md says so. The script asserts it point by point.
- **Wrong (md vs VO):** the md said "no new charges" was stated in the VO. It wasn't. **Changed:** the VO and caption now say "Five grand, no new charges, at twenty-two percent".
- **Wrong (md vs VO):** the md said the claim, the title and the first spoken line all carry the same number, but 10A's first spoken line ("Write off your chef and dinner's free?") had none. **Changed:** "Write off your hundred-dollar chef, and dinner's free?"
- The script went from 38 to 110 checks. The new checks cover:
  - the new numbers (≈ $2.1B, the 2.06× multiplier, APR robustness, the balance path being independent of the APR until the floor);
  - spec assertions: on-screen strings, captions = VO, the frame-1 hook, caption read time, first payoff ≤ 40%, biggest number in the last 2 s, curve = exact path.
  - All pass.

**2. Facts (as of 2026-10-07)**
- **Not re-verified on the web in this pass.** This run's WebSearch budget was used up when QA started (the tool refused every query). Direct fetches of powerball.com, federalreserve.gov, irs.gov, law.cornell.edu, fred.stlouisfed.org and illinoislottery.com were all egress-blocked. I did not use readers, archives or other workarounds.
- **Confirmed another way:**
  - These settled rules match my own knowledge up to mid-2026: IRC §274(n) (50% meal limit), §274(a) (entertainment), §262 (personal expenses), the 100% restaurant rule (2021–2022 only), Reg Z §1026.7(b)(12) (Minimum Payment Warning), and Powerball's 30-payment, 29-year annuity with 5% steps and its $2 play.
  - The 2026 single brackets and the $16,100 standard deduction (Rev. Proc. 2025-32) match my knowledge, and the 05 and 09 teams cite the same figures.
  - Powerball odds: re-derived as C(69,5) × 26 = 292,201,338. The prize tiers match the chart the 09 team cited independently.
  - Aug 12, 2026 was a Wednesday, a Powerball draw day. The 09 team's sourced Oct 7, 2026 jackpot ($485M, $199.8M cash, after 23 rollovers since mid-August) fits an Aug 12 win. That is consistency, not proof.
- **Could not confirm** (after my knowledge cutoff, sources blocked):
  - the $1.040B / $450.5M Aug 12 jackpot and the Quincy, IL ticket;
  - the G.19 Q2 2026 rate of 22.15% and its release date;
  - Chase's $40 floor and Capital One's current wording.
- **Changed to reduce reliance on unconfirmed or imprecise facts:**
  - 10C VO "The winner took the cash" is a claim about a real person's choice. It now reads "Take the cash instead". The cash figure still comes from the official page.
  - 10C "paid over 30 yrs" was imprecise: the annuity is 30 payments over 29 years, and the math police would catch it. Screen, VO and description now say "30 yearly payments".
  - 10B: added an APR robustness line to the pinned comment and the script. Any APR from 21% to 23% gives 228–232 months, still ≈ 19 years, so a stale rate can't flip the verdict.
  - 10A: removed the "$76 per person" private-chef context figure. It came from a vendor blog, wasn't used in the math and couldn't be checked here. The $100 is labelled as an assumption.
  - The source tables now say "writer checked … QA status in the Verification log", and so does the header's "Facts checked" line.
- **Before publishing:**
  - Re-open Powerball's Aug 12, 2026 page (annuity, cash, odds) and G.19 (the Q2 2026 accounts-assessed-interest rate).
  - Confirm the Capital One and Chase minimum-payment terms.
  - If any input changes, edit it in the math check and re-run it. The spec asserts list every on-screen string that depends on it.

**3. Brand and policy (format bible §2)**
- **≤ 3 lines:** pass.
  - 10A: two lines plus the sealed card. The struck "$50 back?" is a red-pen correction, not a calculation line.
  - 10B: three lines plus the curve.
  - 10C: three lines plus the card.
  - The new last-2-second numbers are not new calculations: the card's yearly line (10A), the warning box filled in (10B) and a scaling of line 3 (10C).
- **A number in frame 1: FAIL → fixed.** In all three old specs, the hook, the "THE CLAIM:" label and the postmark started at t = 0 and eased in from zero. Frame 0, the thumbnail and the first frame in the feed, was blank kraft in a still rendered at t = 0. Now the hook and label start at t −0.5 and the postmark at t −0.3, so frame 0 shows the full claim with its $ figure. The AUDIT stamp slams in at 0.4 s.
- **Honest rounding and an exact pinned comment:** present in all three ("Exact: … (envelope said ≈ …, within …%)"). 10C's pin now also covers the new ≈ $2.1B (within 2%).
- **No advice language:** no "should", "you need to", "guaranteed" or "get rich". 10A says "Illustrative math, not tax advice" and 10C says "This is arithmetic, not a recommendation". Pass.
- **No borrowed footage or impersonation:** everything is drawn, and the claims are paraphrased. Powerball, Capital One and Chase appear only as names and public terms. Pass.
- **Disclaimer:** "Educational math, not financial advice." is in all three descriptions. Pass. Added 1-800-GAMBLER to 10C's description and pin, as 09C does.
- **Spoilers (fixed):** the three titles ("…still costs $88", "Audited: ≈19 years", "Audited: ≈97¢") and 10B's first description sentence gave away the sealed answer before the PAUSE & GUESS. The titles now carry the claim's number and "actually" (bible §6) and keep the answer sealed. The title template is updated to match.

**4. Virality (scored against 02-top-10 §10 and watch/group6-video2, group1-video4, group5-video1)**

| | Before | After | Why |
|---|---|---|---|
| 10A | 7 | 8.5 | A proven topic (Money Guy 272.45x) carrying the number Money Guy never showed. But frame 1 was blank, the spoken hook had no number and the title spoiled $88. All three fixed. |
| 10B | 7.5 | 8.5 | Sklar's 1,227.8x myth with vidIQ's own suggested number. Held back by the same blank frame 1 and a title that spoiled ≈ 19 years. Fixed. |
| 10C | 6.5 | 8 | **Hook rewritten.** The old tape ("$1.04 BILLION jackpot / makes a $2 ticket / worth $3.56.", size 74) had no famous noun and read like a math sentence. It is now "“At $1.04 BILLION, / a $2 Powerball / ticket's worth $3.56.”" at size 80: the famous noun is in frame 1 and the lines are shorter. The old ending also repeated 09C's ("how big must the jackpot get? It's pinned"). |

- **First partial payoff by about 40%:** pass on all three, asserted by the script.
  - 10A: $50 written by 12.1 s (34%).
  - 10B: $142 by 10.9 s (31%); "only $50 hits the debt" by 14.1 s (40%).
  - 10C: ✓ $3.56 by 9.9 s (28%); $1.54 by 16.5 s.
- **Biggest number in the last 2 s: FAIL → fixed.** All three ended on a question and a small 46 px survival line. The biggest numbers ($32K a year, $13,100 paid) were used on the reveal card 9–10 s before the end, and 10C held its biggest number (the break-even) back for the pin. The new endings:
  - **10A:** the card now reads "$88 / not $0". The last 2 s land "every night: ≈ $32K a year" (140 px, red, double underline, done at 33.7 s) under the "Still want the chef at $88 a night?" tape.
  - **10B:** the card now reads "≈ 19 years / the claim said 20". The last 2 s fill in the drawn Minimum Payment Warning box with "ours: ≈19 yrs, ≈$13,100" (done at 33.65 s) under "What does YOUR box say?".
  - **10C:** the last 2 s land "≈ $2.1 BILLION" (done at 33.5 s) under "When is the jackpot share worth $2?", with "about 2 × $1.04B →" as the working. The VO's "Ever seen one that big?" is the re-hook. This keeps the lane rule (the answer is revealed inside the video) and stops 10C repeating 09C's pinned break-even.
  - CLAIM SURVIVAL is now 56 px (it was 46) and finishes at 34.5–34.6 s of 35.4.
- **Tightened:**
  - 10A's verdict now has its own VO line ("That claim? Return to sender."), so every beat after the reveal adds something new.
  - 10B's card line 2, "the claim said 20", sets up the 96%.
  - 10C's end card no longer repeats the $2 postage stamp.
- **Loop:** each final frame (the question plus the biggest number) cuts back to the claim tape, which is now fully drawn in frame 0. Pass.

**5. Visual QA (ran check, sheets and stills, and looked at every one)**
- `node src/cli.js check` passes with zero warnings on all three, before and after. My first new 10B layout drew two warnings: the sticky overlapped the "on a credit card" line and sat in the caption band. Narrowing the sticky to 360 and raising the line to y 960 cleared both.
- **Fixed:**
  - The blank frame 0 (see 3).
  - **10B curve:** it was short (h 270), with 52 px marks crowded under line 3. The lines moved up (y 460/580/668/780), the curve is now h 330 with 58 px marks, and it starts 0.2 s earlier. Each mark stays on screen ≥ 3.2 s.
  - **10B sticky:** 44 px was hard to read at phone size. It is now 48 px.
  - **Red circles:** the circles on $50 (10A, 10B), $12 and $1.54 overlapped the "=" and "back" glyphs at the default pad of 18. They are re-centred on measured glyph extents with pad 12.
  - **10A transition:** the "written off" pen started while the reveal card was still fading, which ghosted at 28.0 s. It now starts at 28.15 s, and the rule-screen text went from 104 to 124 px.
  - **10C end screen:** the lower half sat empty for 1.6 s after the final question. The working line now starts at 31.5 s.
- **Reading time:**
  - Every text item stays on screen ≥ 0.25 s per word after it finishes writing. I checked this with the engine's own `prepare()` timings and timed each curve mark individually. Tightest: 10B "on a credit card at 22%", 1.57 s for 6 words; CLAIM SURVIVAL, 0.81 s for 3 words.
  - Every caption is on screen ≥ 0.25 s per word. The old 10B "A common minimum is that plus one percent:" had 1.9 s for 8 words; it now has 2.1 s. Two captions sit exactly at the 0.25 s/word floor: 10A "It's a coupon: twelve cents on the dollar." and 10C "When is the jackpot share worth two bucks?".
- Captions sit in y 1320–1480, and content ends by y 1300 except for the envelope's 0.45 s slide-in.

**Open items (not fixed here)**
- **10C and 09C overlap.** Both are Powerball expected-value videos (09C: a $2 ticket ≈ 75¢ at the Oct 7 jackpot; 10C: ≈ 97¢ of jackpot share at $1.04B). 10C now ends differently (break-even revealed, prize ladder dropped from its TikTok cut), but the two shouldn't post within a few weeks of each other.
- The unconfirmed inputs listed in 2.

**Engine requests (not implemented; engine/src untouched)**
1. A `hook` option that starts fully drawn (e.g. `instant: true`), so frame 0 isn't blank without the negative-`t` workaround. The workaround also stacks every tape sound on the first sample.
2. A `labelSize` param for `postage`. The fixed 18 px label ("BACK PER $1", "ONE TICKET") can't be read on a phone; for now the VO carries it.
3. `check` should lint `stamp`, `annotate` and `postage` boxes for overlaps and the safe area. A red circle can cross a glyph and still pass.
4. `check` should warn when frame 0 has no readable text (format bible §2.2), and when an op stays on screen for less than 0.25 s per word after it finishes writing.
