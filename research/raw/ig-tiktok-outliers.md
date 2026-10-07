# Instagram Reels + TikTok outliers: finance and finance-math (raw corpus)

**Compiled:** 2026-10-07 for *Back of the Envelope* / "Envelope Math"
**Source:** vidIQ `vidiq_instagram_tiktok_outlier_search`. 15 calls (budget 16). `vidiq_watch_shortform_content` was not used.
**Audience rescore (every call):** `Culture/Region: US/English-speaking; Global: true; Demographics: 18-34 young adults and early-career professionals interested in personal finance, investing, saving and money tips;`
**Settings:** `resultsPerPlatform: 8`, `datePostedAfter: 2025-01-01` (retries used `2024-01-01`), one result per creator per platform (the vidIQ default).

## How to read this file

- **Plays, followers, outlier multiple, duration and the format/hook descriptions** come from vidIQ. "Outlier" is the post's plays divided by the creator's median plays. vidIQ reports duration for TikTok and only rarely for Instagram, so most IG durations show as n/a.
- **Hook text** is the on-screen text or first spoken line from vidIQ's 0-3s annotation, plus the caption fragment vidIQ returned. Captions are truncated where vidIQ truncated them.
- **Posted\*** is decoded from the post ID: TikTok `id >> 32` gives unix seconds; for IG the shortcode becomes a media id, and `(id >> 23) + 1314220021721` gives ms. These dates are approximate (UTC). Captions that name a date agree with them; for example "18 weeks left in 2026" decodes to 2026-08-23.
- **Score** is my composite virality rank: `log10(plays) + 0.5*log10(outlier)`. It rewards raw reach first and breakout-versus-baseline second, so a 2M-play post from a 594-follower account (1,106x) outranks a 2.6M post from a 60K account (12x).
- **Index window caveat:** every result in all 15 calls was posted between **2026-06-10 and 2026-10-03**. The two retries with `datePostedAfter 2024-01-01` returned exactly the same items as the 2025 runs. The outlier index therefore seems to hold only about the last 90-120 days, so older evergreen classics from 2024-2025 are **not** in this corpus. Everything below shows what is breaking out *right now*.
- **Selection bias:** the tool returns outliers by design, so treat the follower-size findings as "what can break out", not "what usually happens".

## Queries run (and yield)

| # | Type | Query | Window | Yield: finance-relevant / on-concept (of 16) | Best hit |
|---|---|---|---|---|---|
| 1 | concept | compound interest visualized with money math on screen | 2025+ | 16 / ~10 | @themarkethustle 2.4M; @investment_timeline 1.5M (140.6x) |
| 2 | concept | how much a celebrity or billionaire earns per second / per day calculation | 2025+ | 16 / ~5 (**no literal per-second videos**) | @jamaalourcity 3.7M (908x); @thecasharchive (live $ counters) |
| 2r | concept | same, retry | 2024+ | identical results | n/a |
| 3 | concept | cash stuffing envelope budget with money counting | 2025+ | 16 / ~10 | @giraffe.8206791 10.2M; @monets_money 3.9M |
| 4 | concept | money riddle or math puzzle about money that viewers argue about in comments | 2025+ | 14 / ~11 | @mathsgenius222 9.3M (522x); "You can only keep 1" posts |
| 4r | concept | same, retry | 2024+ | identical results | n/a |
| 5 | concept | salary or paycheck breakdown showing where every dollar goes | 2025+ | 16 / ~14 | @se33y 3.2M (591x); @moneyletter 3.0M (316x) |
| 6 | concept | business breakdown: how much a small business or franchise really makes | 2025+ | 16 / ~12 | @laundromatmoneyofficial 3.2M; @yourgrandmas_bf 2.1M |
| 7 | hook | "If you make $X an hour, here is what that means" | 2025+ | 16 / ~8 | @tyskywalka2.0 796K; @financebestiechloe 399K; @anatalksmoney 926K (491x) |
| 8 | hook | "You are losing thousands of dollars because of this one number" | 2025+ | 16 / ~5 | @anatalksmoney; @spendshiftofficial (101.7x); @felix.padilla.eng (243.9x) |
| 9 | format | handwritten math on paper or whiteboard explaining a money calculation | 2025+ | 14 / ~12 (2 items had mismatched metadata, excluded) | @budgeters_anonymous 949K; @wrightwayinvesting 133.7K (825x) |
| 10 | format | calculator on screen with text overlays doing quick math | 2025+ | **thin/noisy**: 8 relevant / ~3 on-format; 5 clearly off-topic, 3 off-audience | @pasiveempire (calculator app) |
| 10r | format | same, retry | 2024+ | identical results | n/a |
| 11 | concept (extra) | visualizing how big a million/billion/trillion dollars is | 2025+ | 16 / ~7 | @g1djuan 1.7M (187x); @musohihi 1.1M (200x) |
| 12 | concept (extra) | small daily habit cost multiplied out over a year/decade | 2025+ | 16 / ~6 | @mightym11805 2.0M (1,106x); @kliqclip 755K (327x) |

---

## 1. Top 32 examples, ranked by composite virality score

All rows are finance or money-math, plus one pure-math riddle kept because it is the template behind the "argue in the comments" money-puzzle format.

| # | Score | Platform | Creator | Followers | Plays | Outlier | Dur. | Posted* | Pattern | Format | Hook / caption (verbatim where known) | URL |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | 8.33 | IG | @mathsgenius222 | 14.1K | 9.3M | 522.3x | n/a | 2026-07-16 | riddle | static photo of handwritten puzzle on paper, no voice | Answer without Googling... The answer is not 300! (caption: Everyone keeps saying 300... But they're all wrong) | https://www.instagram.com/reel/Da121CCI8Bh/ |
| 2 | 8.05 | TT | @jamaalourcity | 47.4K | 3.7M | 908.0x | 152s | 2026-07-19 | fermi-estimate | PiP talking head over image slideshow + screen-recorded calculator app | You know Jordan, right? (on-screen: JORDAN) - estimating a creator's income from views + brand deals | https://www.tiktok.com/@jamaalourcity/video/7664369518873103638 |
| 3 | 8.01 | IG | @giraffe.8206791 | 26.0K | 10.2M | 98.9x | n/a | 2026-09-01 | cash-asmr | top-down fixed cam, $100 bill dropped in clear acrylic box, raw thud SFX | My saving journey - Day 12 ("Another $100 added today") | https://www.instagram.com/reel/DcvTGf_tK8r/ |
| 4 | 7.89 | TT | @se33y | 56.0K | 3.2M | 591.4x | 106s | 2026-08-28 | paycheck | car talking head + text overlay, line-by-line allocation | budget my paycheck ($5,416.33) as a 20 year old nurse | https://www.tiktok.com/@se33y/video/7679220804218866957 |
| 5 | 7.88 | TT | @sog_geovanie | 1.3K | 2.4M | 1005.7x | 107s | 2026-07-27 | big-number | split screen creator + screen-recorded math, sarcastic voice | Congratulations Elon Musk!!!!!!!!! You worked SO00000 hard for that $1,000,000,000,000.00 | https://www.tiktok.com/@sog_geovanie/video/7667278089755299085 |
| 6 | 7.82 | IG | @mightym11805 | 594 | 2.0M | 1106.2x | n/a | 2026-07-10 | daily-habit | close-up can crack + static math overlay, music+SFX | An energy drink is $3 a day (caption: I'm not saying it's smart... I'm saying it's worth it.) | https://www.instagram.com/reel/DanrXawh9Xq/ |
| 7 | 7.73 | IG | @moneyletter | 33.9K | 3.0M | 316.0x | n/a | 2026-08-21 | paycheck | talking head with cash + labeled cups (50/15/5/30 sticky notes) | How to split your paycheck (without going broke) / VO: If you just got paid, do not spend a single dollar... | https://www.instagram.com/reel/DcTb9M9xLC0/ |
| 8 | 7.58 | IG | @monets_money | 139.7K | 3.9M | 93.1x | n/a | 2026-07-18 | cash-asmr | top-down hands-only cash stuffing into envelopes/binder, lo-fi | Back with my first cash stuffing for July. | https://www.instagram.com/reel/Da8OytZu12O/ |
| 9 | 7.5 | TT | @financeunfiltered2 | 10.9K | 823.1K | 1506.8x | 75s | 2026-09-09 | audit-drama | podcast split screen; host tries to calculate guest's income | Financial Audit's Most Disturbing Episode / 'What do you do, Caitlin, for a living?' | https://www.tiktok.com/@financeunfiltered2/video/7683562309007985934 |
| 10 | 7.49 | TT | @jacobdoesmoney2 | 18.4K | 2.8M | 124.6x | 43s | 2026-08-22 | n-steps-formula | talking head pointing pen at numbered list; multiply income by fixed ratios | How to be financially free (in 5 steps) | https://www.tiktok.com/@jacobdoesmoney2/video/7676877278369828127 |
| 11 | 7.49 | IG | @bigkbreezyy.ai | 29 | 1.1M | 798.8x | n/a | 2026-09-10 | paycheck | talking head + static itemized list, ends on reality-check line | People swear 20k/mo means you've made it. | https://www.instagram.com/reel/DdHf1yTIpaB/ |
| 12 | 7.47 | IG | @reallysimas | 3.9K | 1.7M | 305.7x | n/a | 2026-09-03 | n-steps-formula | talking head filling numbered list; VO 'multiply it by point five five' | how to be financially free (in 5 steps) | https://www.instagram.com/reel/DcziZHIRnm5/ |
| 13 | 7.43 | TT | @hoooon492 | 11.4K | 1.0M | 713.3x | 45s | 2026-08-25 | n-steps-formula | stick-figure 2D animation narrating income split | How to be financially free | https://www.tiktok.com/@hoooon492/video/7677806086635785485 |
| 14 | 7.41 | IG | @thegroundeddollar | 2.3K | 1.1M | 553.2x | n/a | 2026-07-21 | cash-asmr | top-down static POV, zipper + calculator-click ASMR, counts bills & coins | (no text hook) wallet unzips, calculator clicking; caption: count up of my bi-weekly paycheck | https://www.instagram.com/reel/DbDUGk2RDIz/ |
| 15 | 7.37 | TT | @g1djuan | 14.0K | 1.7M | 187.2x | 22s | 2026-07-13 | big-number | talking head holding a stack of cash | $100k in cash (what $100,000 looks like) | https://www.tiktok.com/@g1djuan/video/7662090649352670494 |
| 16 | 7.34 | TT | @zayra.bellee | 64.7K | 1.1M | 386.7x | 26s | 2026-08-22 | n-steps-formula | talking head with accumulating text list | 4 steps to be financially free | https://www.tiktok.com/@zayra.bellee/video/7676944432637250829 |
| 17 | 7.31 | TT | @anatalksmoney | 62.5K | 926.2K | 491.2x | 5s | 2026-07-19 | daily-habit | static talking head, text-only setup (5s) | when I ... said $27/day is $10,000 a year (caption: and the math police blew up my comments) | https://www.tiktok.com/@anatalksmoney/video/7664247808488181023 |
| 18 | 7.28 | IG | @ruinvests | 4.9K | 1.1M | 305.3x | n/a | 2026-07-09 | choose-one | creator holding two mason jars (cash vs empty), fast cuts, counters | This magic jar goes up by $10,000 every single day (Would you rather $10,000 a day or a doubling penny?) | https://www.instagram.com/reel/DalTnVjKFu1/ |
| 19 | 7.25 | TT | @investment_timeline | 72.8K | 1.5M | 140.6x | 60s | 2026-08-08 | daily-habit | faceless animated line graph: stock vs daily purchase, music only | POV: You invested in Monster instead of paying $3/day for a Monster Energy | https://www.tiktok.com/@investment_timeline/video/7671760671867997473 |
| 20 | 7.19 | TT | @musohihi | 17.8K | 1.1M | 200.6x | 272s | 2026-08-17 | big-number | faceless stick-figure animation, fast, SFX | POV: You Are The World's First Trillionaire | https://www.tiktok.com/@musohihi/video/7675032495917681934 |
| 21 | 7.18 | IG | @hungarianexperiment | 58.0K | 3.7M | 16.4x | n/a | 2026-08-03 | money-tiers | faceless text list over single moody car shot, music only | What Money Actually Buys: $10K = A safety net ... (caption: Do you agree?) | https://www.instagram.com/reel/Dblcs7gTi2y/ |
| 22 | 7.14 | TT | @kliqclip | 2.8K | 755.2K | 327.4x | 155s | 2026-08-28 | daily-habit | expert interview clip w/ captions | OKAY. HOW (caption: $27.40 a day adds up to $10,000 a year ... invested over 40 years) | https://www.tiktok.com/@kliqclip/video/7679159700285312277 |
| 23 | 7.12 | IG | @laundromatmoneyofficial | 243.0K | 3.2M | 16.7x | n/a | 2026-07-09 | business | POV b-roll pulling coin trays + voiceover revenue tally | I own the laundromat. Let's see how much money it made in the past 7 days and in the entire month of May. | https://www.instagram.com/reel/DaliZcmh1II/ |
| 24 | 7.06 | IG | @iamherstationery | 174.3K | 1.1M | 110.7x | n/a | 2026-07-24 | cash-asmr | top-down hands stuffing labeled envelopes | It's PAYDAY | https://www.instagram.com/reel/DbLrUE9Rysj/ |
| 25 | 7.04 | IG | @quantguild | 32.0K | 793.5K | 187.8x | n/a | 2026-08-13 | riddle | split-screen dialogue + animated coin (expected value) | If I said to you for every time you got heads... | https://www.instagram.com/reel/Db_VPOulufP/ |
| 26 | 7.01 | IG | @tommoneymays | 220.5K | 1.1M | 87.7x | n/a | 2026-07-25 | big-number | talking head + dynamic counter overlays | IMAGINE SOMEONE HANDS YOU $1,000,000,000,000 | https://www.instagram.com/reel/DbOYHlPucRw/ |
| 27 | 6.99 | TT | @eggfacetips | 1.3K | 744.7K | 174.4x | 39s | 2026-07-20 | riddle | animated character, satirical arbitrage chain | If you take $1 ... (The $1 to $400 infinite money) | https://www.tiktok.com/@eggfacetips/video/7664734857204944142 |
| 28 | 6.97 | IG | @jacobhartmanofficial | 745.0K | 1.2M | 59.4x | 7s | 2026-07-18 | choose-one | static street b-roll + 4-option text poll, music only | You can only keep 1: 1. $900 billion today 2. $25 million per day 3. $1.2 million per hour 4. $10 billion per year | https://www.instagram.com/reel/Da8MKBZIzaN/ |
| 29 | 6.96 | IG | @thebudgetingprincess | 60.0K | 2.6M | 12.2x | n/a | 2026-07-18 | weeks-left | overhead hands coloring a printable 26-paycheck tracker, trending rap audio | Get Paid Bi-weekly? Try this challenge (Save $4,000 in 26 paychecks) | https://www.instagram.com/reel/Da60nSvTNfH/ |
| 30 | 6.95 | IG | @themarkethustle | 1.0M | 2.4M | 14.1x | n/a | 2026-08-15 | compound-table | faceless static ferry shot + static text table, lofi | Investing $1,000/month at 10% / Here's how long each $100k takes: | https://www.instagram.com/reel/DcEqfyDhmZc/ |
| 31 | 6.94 | TT | @jacobdoesmoney2 | 18.4K | 1.2M | 53.4x | 6s | 2026-08-24 | compound-table | gym b-roll + static table, lofi | How Long $1 Million Actually Lasts | https://www.tiktok.com/@jacobdoesmoney2/video/7677673983285775647 |
| 32 | 6.89 | TT | @yourgrandmas_bf | 0 (as reported) | 2.1M | 13.4x | 56s | 2026-09-15 | business | owner behind counter, cost-stack breakdown with b-roll | Why your latte costs $7 | https://www.tiktok.com/@yourgrandmas_bf/video/7685809892430548238 |

**Two rows to discount:** @bigkbreezyy.ai has 29 followers and its bio reads "AI funny memes", so it is almost certainly a re-upload of someone else's video, and the 798.8x is inflated by a near-zero baseline. @yourgrandmas_bf shows "0 followers" in vidIQ, which is probably a data gap. Both are kept because the *concept* still reached 1.1M and 2.1M plays.

---

## 2. Pattern analysis

### 2.1 Pattern clusters (66 unique finance-relevant posts, deduplicated)

| Cluster | Posts | Total plays | Median outlier | What it is |
|---|---|---|---|---|
| cash-asmr (envelope / savings box / cash count) | 4 | 16.3M | 104.8x | Hands-only, top-down, physical cash, satisfying sound, running total |
| riddle / money puzzle / arbitrage chain | 5 | 11.8M | 174.4x | A question with a "wrong" intuitive answer and a step-by-step reveal |
| paycheck (budget-my-check / split) | 4 | 8.1M | 453.7x | Specific paycheck amount allocated line by line |
| n-steps-formula ("financially free in N steps") | 6 in ranked set (**16 posts / 13 creators / about 12.7M plays** counting every copy seen) | 8.0M | 215.4x | "Multiply your monthly income by 0.55 / 0.10 ..." rule list |
| business (how much X makes / why X costs Y) | 6 | 7.0M | 17.6x | Revenue minus costs equals owner take-home; cost stack of a familiar price |
| big-number (trillion / $100k in cash / live counters) | 5 | 6.7M | 200.6x | Making an incomprehensible quantity tangible |
| compound-table (milestone tables, "$X/mo for N years") | 7 | 5.8M | 35.6x | Static table of growth milestones |
| daily-habit (latte factor, "$3/day") | 6 | 5.6M | 285.7x | Per-day cost scaled up to per-year and per-decade (plus invested) |
| choose-one / would-you-rather | 5 | 4.5M | 59.4x | Options at different time rates; viewer must pick |
| weeks-left / savings challenge tables | 4 | 4.2M | 25.9x | "N weeks left in 2026" and weekly-deposit tables |
| fermi-estimate (estimate someone's income) | 2 | 4.1M | 533.5x | Back-of-envelope estimate of a known person's money |
| money-tiers ("what $X actually buys") | 2 | 3.9M | 93.0x | Ladder of money amounts with a life meaning for each |
| hourly-wage ("If you make $X/hr...") | 5 | 2.9M | 49.9x | Hourly to monthly to "what it means" |
| whiteboard / notebook explainers | 4 | 2.0M | 89.7x | Handwritten diagram plus voiceover |
| audit-drama (Caleb Hammer clips) | 1 | 0.8M | 1,506.8x | Host tries to *calculate* a guest's income live |

**Takeaways**
- **Highest median outlier:** fermi-estimate (533x), paycheck (454x), daily-habit (286x), n-steps (215x), big-number (201x). In every one of these the arithmetic itself is the content. The audience watches the number get built.
- **Lowest median outlier:** business (17.6x), weeks-left (25.9x), compound-table (35.6x). These still reach millions, but mostly through larger accounts or theme pages; they are lower-variance formats.
- **Most cloned template:** "How to be financially free (in 5 steps)". 16 posts from 13 creators in a single 90-day window, almost word-for-word: @jacobdoesmoney2 2.8M, @reallysimas 1.7M, @zayra.bellee 1.1M, @diaryofasalesgirl 1.1M, @hoooon492 1.0M, @jacobdoesmoney 983.9K and 942.8K, @brennan_valeski 912.8K, @lockedwliam 473.4K, @itsjoeyviola 440.9K and 276K, @ericsfinancials 288.9K, @mustachemillionaire 236.9K, @meetalexpark 206K, @real_unick 115.5K, @financebronextdoor 96.6K. The template is: monthly income × a fixed ratio for each bucket (spoken example from @reallysimas: "Your monthly income multiply it by point five five"). **It is a meme format, and a copy-proof "envelope" version of it is an opening.**

### 2.2 Creator size: tiny accounts break out

| Follower bucket | Posts | Median plays | Median outlier |
|---|---|---|---|
| < 5K | 21 | 745K | 174.4x |
| 5K-50K | 23 | 794K | 98.9x |
| 50K-500K | 18 | 1.1M | 57.9x |
| 500K+ | 4 | 1.1M | 18.6x |

Examples of breakouts under 1K followers: @mightym11805 (594 followers, 2.0M), @brennan_valeski (845, 912.8K), @riskaadjusted (340, 567.5K), @invest_with_shalinder (364, 428.9K), @felix.padilla.eng (983, 260.8K), @studentliving12 (134, 162.8K), @wrightwayinvesting (105, 133.7K). @sog_geovanie had 1.3K followers and reached 2.4M. **For a zero-subscriber channel, the concept and hook clearly matter more than the existing audience in this niche.** Selection bias applies, as noted above.

### 2.3 Duration: two winning modes, weak middle

TikTok durations, where known:
- **5-8 s "read-it" loops** (text over static b-roll, music only): @anatalksmoney 5s 926K (491x); @jacobdoesmoney2 6s 1.2M; @felix.padilla.eng 6s 261K (244x); @timelessfinancesolutions 6s 236K; @anamandeve 7s 766K; @jacobhartmanofficial (IG) 7s 1.2M; @financebestiechloe 8s 399K. The text is too long to read in the runtime, which forces a pause or rewatch. Most are tagged `is_looped: true`.
- **100-155 s calculation walkthroughs** (voice-led, math is the plot): @jamaalourcity 152s 3.7M (908x); @kliqclip 155s 755K (327x); @mountaineer_matt 112s 721K; @sog_geovanie 107s 2.4M (1,006x); @se33y 106s 3.2M (591x). Each line of math is a mini-reveal, so retention holds.
- **20-60 s** is mostly the N-steps formula lists (26-45s) and visual explainers (@investment_timeline 60s 1.5M, @yourgrandmas_bf 56s 2.1M).
- Longest still working: @musohihi 272s 1.1M (stick-figure trillionaire story).

### 2.4 Hook devices that recur among top performers

1. **An oddly specific number in the hook.** "$5,416.33" (@se33y 3.2M), "$713.59" (@tylerworley3 768K), "(2421.88)" (@chaylpnjourney), "$17.50 after taxes" (@jacobhartmanofficial 657K), "$3,520 a month" (@studentliving12), "$4800 a month" (@financebestiechloe), "$27.40 a day" (@kliqclip). Specificity reads as real and invites viewers to compare it with their own paycheck.
2. **The unit-conversion ladder** (per-day → per-week → per-year → per-decade). "A $150 Saturday, $150 a week, $7,800 a year, $78,000 every 10 years" (@spendshiftofficial, 101.7x, no voiceover); "An energy drink is $3 a day" (@mightym11805, 1,106x); "$27/day is $10,000 a year" (@anatalksmoney, 491x). **This is envelope math in its purest form,** and it is the highest-outlier hook type in the set.
3. **Wrong-answer / ambiguity bait.** "Answer without Googling... The answer is not 300!" / caption "Everyone keeps saying 300... But they're all wrong" (@mathsgenius222, 9.3M, 522x). The caption on @anatalksmoney's post is literally "and the math police blew up my comments". Correction comments are the engine.
4. **Forced choice before the reveal.** "You can only keep 1: $900 billion today / $25 million per day / $1.2 million per hour / $10 billion per year" (@jacobhartmanofficial 1.2M); the same template from @who_manyo (643K); "Would You Take $10k a Day or a Penny?" (@ruinvests 1.1M at 305x; @mem.efarm 372K at 224x); "50 pounds of $100 bills or 50 pounds of gold?" (@mountaineer_matt 721K). The viewer commits to an answer, so they stay for the reveal and comment their pick. Rate-versus-lump-sum framing is itself a math lesson.
5. **Celebrity or known-entity anchor.** Elon's trillion (@sog_geovanie), MrBeast vs Kevin Hart live counters (@thecasharchive 205x), "You know Jordan, right?" (@jamaalourcity), the Zendaya/Tom Holland prenup (@mrsdowjones 159x), Monster stock vs a Monster can (@investment_timeline 141x), Robinhood in 2021 (@youngbuffett).
6. **Reality-check / contrarian income claim.** "$35 AN HOUR IS THE NEW 'JUST GETTING BY.'" (@saadmughal228 878K); "People swear 20k/mo means you've made it." (@bigkbreezyy.ai 1.1M; parodied by @cloud__ventures at 134.7x, which shows it reached meme status); "If you make 20/hr you can't afford to live on your own" (@tyskywalka2.0 796K). These provoke agree/disagree comments, and the comments are full of viewers' own numbers.
7. **Calendar-timely countdowns.** "There are 18 weeks left in 2026" (@timelessfinancesolutions); "There are 21 weeks left in 2026" (@elegant_flex81 134.7K); "FACTS: if you and your partner saved $200/week in 2026" (@anamandeve 766K). The template can be reposted every week with a new number.
8. **"Why does X cost Y?" demystification.** "Why your latte costs $7" (@yourgrandmas_bf 2.1M); "WHAT'S THE PROFIT MARGIN ON A PIZZA?" (@icedcoffeehour 1.1M); "How does this business afford rent in NYC? $4.8k/mo??" (@flickman); "Pizza Owner Salary $80,000" on "$400k sales, with 20% margins" (@sidewalk.tv 1.2M).
9. **Physical money as proof and spectacle.** "$100k in cash" (@g1djuan 1.7M at 187x; @gidflips 430K); a $100 bill dropped into an acrylic box (@giraffe.8206791 10.2M); coin trays pulled from laundromat machines (@laundromatmoneyofficial 3.2M).

### 2.5 Visual formats ranked by evidence

| Format | Strongest evidence | Faceless? | Production cost |
|---|---|---|---|
| Hands-only top-down cash (envelopes, savings box, counting) | @giraffe.8206791 10.2M; @monets_money 3.9M; @thegroundeddollar 1.1M (553x); @iamherstationery 1.1M | Yes | Needs real cash and props |
| Handwritten puzzle or notes on paper, static | @mathsgenius222 9.3M (522x) | Yes | Very low |
| Talking head + accumulating rule list | 16-post N-steps cluster, about 12.7M | No | Low |
| Talking head + specific-paycheck allocation | @se33y 3.2M; @tylerworley3 768K | No | Low |
| Physical-prop metaphor (labeled cups, mason jars) | @moneyletter 3.0M (316x, cups labeled 50/15/5/30); @ruinvests 1.1M (jars); @profitplugg 655K (81x, jars) | Partly | Low |
| Text-on-screen over static b-roll, music only | @hungarianexperiment 3.7M; @themarkethustle 2.4M; @jacobhartmanofficial 1.2M; @jacobdoesmoney2 1.2M; @spendshiftofficial 101.7x | Yes (or passive face) | Very low |
| Screen-recorded calculator / on-screen arithmetic | @jamaalourcity 3.7M (908x); @sog_geovanie 2.4M (1,006x); @pasiveempire 127K | Can be | Low |
| Animated line chart (invest vs spend) | @investment_timeline 1.5M (141x); @youngbuffett 511K | Yes | Medium |
| Stick-figure / 2D animation | @hoooon492 1.0M (713x); @musohihi 1.1M (201x); @thecasualceo7 133K (250x); @smartmoneysketches 33K (54x) | Yes | Medium-high |
| Whiteboard / notebook explainer with VO | @budgeters_anonymous 949K; @hermoneymastery 565K + 419K; @the_home_loan_mom 366K (131x); @wrightwayinvesting 134K (825x); @fxalexg (Bugatti windshield used as whiteboard) 2.2M | Can be | Low |
| Podcast / audit clip | @financeunfiltered2 823K (1,507x); @calebhammmerclips 856K | No (needs guests) | High |

### 2.6 Audio

- Text-overlay loops are almost always **music only** (lo-fi, trending pop or rap). @thebudgetingprincess used "Who the F*** Is DDG?" by DDG; @felix.padilla.eng used "FEEL IT" by SZA.
- Math walkthroughs are **voice only** and start speaking at frame 1.
- Cash videos lean on **raw ASMR**: the bill thud (@giraffe.8206791), zipper plus calculator clicks (@thegroundeddollar), and counting cash with calculator clicks (@bookedandbudgetingco).
- @spendshiftofficial's 101.7x post had **no music and no voiceover**, only ambient room noise.

### 2.7 Comment and share triggers

- **Correction bait** (an intuitive wrong answer, or a rounding the "math police" will fix): @mathsgenius222, @anatalksmoney.
- **Pick-one polls** that ask for a choice in the comments: @jacobhartmanofficial, @who_manyo, @ruinvests, @joshcelder ("1 million dollars or $1,000 per week for life?"), and @johnxduda ("Drop your $200 breakdown below.").
- **Personalised-reply CTA:** "Comment your take-home and I'll reply with your exact five-number split" (@itsjoeyviola, 125.1x on 3.7K followers). Every comment becomes a reply video or thread.
- **Comment-keyword DM funnels** (IG-native, ManyChat-style). I saw at least 9: "Comment BUDGET and we'll send you our budget calculator" (@moneyletter, 316x), "Comment SPLIT" (@itsjoeyviola), "comment MAP" (@morgan.on.money), "Comment START" (@laundromatmoneyofficial, @pedro_and_zach), "Comment train" (@hermoneymastery), "Comment Monopoly" (@paisa.clarity), "comment PRINT" (@itsmollieai), "Comment sauce" (@sera.trades). **A free calculator offered as a lead magnet fits Envelope Math naturally.**
- **"Do you agree?"** as the whole caption: @hungarianexperiment, 3.7M.
- **Send-to-partner and share framing:** "if you and your partner saved $200/week" (@anamandeve); "How to make your kid stupid rich" (@budgeters_anonymous).

### 2.8 Ecosystem notes

- **Theme-page cloning is common.** @moneymovesjake and @jacobhartmanofficial posted the identical caption "Your TIME is VERY VALUABLE 🤯🙉📈" with the same "$25/hour → $17.50 after taxes" text. @moneymovesjake's "Thank you for following ❤️💸" post (1.6M, **3,493x**) copies @mr.thank.you's 54M-follower format word for word ("Without being greedy - how much money you need..."). Both use "Results not guaranteed" disclaimers. Proven text templates get re-skinned across accounts within weeks.
- **Cross-posting across platforms works:** @jacobdoesmoney (IG, 983.9K and 942.8K) and @jacobdoesmoney2 (TT, 2.8M) use the same caption. @monets_money has IG at 3.9M and TT at 942.7K for the same "first cash stuffing for July". @tommoneymays has IG at 1.1M and TT at 308K for the same trillion-dollar script. @fxalexg has IG at 2.2M and TT at 1.5M.
- **Cross-posted pairs:** IG beat TT in 3 of 4 (@monets_money 3.9M vs 942.7K; @tommoneymays 1.1M vs 308.2K; @fxalexg 2.2M vs 1.5M). The exception is @jacobdoesmoney (IG 983.9K) vs @jacobdoesmoney2 (TT 2.8M), which are separate accounts.

### 2.9 Gaps and what was *not* found

- **Literal "X earns $Y per second" videos did not surface** as outliers in this window, even after the retry. The nearest neighbours are rate-framed choice polls ("$1.2 million per hour"), live rising counters (@thecasharchive), and trillion-scale math (@sog_geovanie, @tommoneymays, @musohihi). The per-second device appears inside other formats rather than as a standalone trend right now. Treat it as an open lane, not a proven one.
- **Calculator-on-screen as a format** returned noisy results. 5 of 16 were clearly off-topic (lash extensions, a scar-perception video, a hair-clipper ad, an AI-tool launch, a materialism monologue) and 3 more were off-audience. Proof that it works comes from @jamaalourcity, @sog_geovanie and @pasiveempire rather than from a dense cluster.
- No IG durations for most reels, and no like, comment or share counts from this tool.

---

## 3. Implications for Envelope Math (evidence → opportunity)

| Evidence | Opportunity for a faceless "back of the envelope" channel |
|---|---|
| fermi-estimate has the highest median outlier (533x): @jamaalourcity 3.7M estimating a creator's income with a calculator | Core brand lane: **"Envelope estimate: how much does ___ make?"** for celebrities, creators, businesses and sports. Show the 3-4 rough inputs, multiply, give a range. Literal per-second rates can be a sub-device (see 2.9). |
| Unit-conversion ladders have the highest outlier hooks: $3/day (1,106x), $27/day (491x), $150 Saturday (101.7x) | **"The envelope ladder"**: per-day, per-week, per-year, per-decade, then the invested value, written down an envelope. |
| Correction bait (@mathsgenius222 9.3M; "math police") | **"Envelope puzzle"**: a money riddle handwritten on an envelope, with a tempting wrong answer. Reveal in the next video or a pinned comment. |
| Forced choice (keep-1 polls, penny vs $10k, cash vs gold) | **"Which envelope?"**: 2-4 envelopes, each holding a different rate or lump sum. The viewer picks before the math reveal. |
| Cash-envelope ASMR is the biggest raw reach (16.3M across 4 posts) | The brand name is the prop. Real or animated envelopes filled with bills, a satisfying thud, and a running total. Pairs naturally with #cashstuffing. |
| "Financially free in N steps" is cloned 16 times | **"Envelope version of the N-steps rule"**: the same multiply-by-ratio math, shown as income split into labeled envelopes (like @moneyletter's cups, 316x), and stress-tested ("does 0.55 actually work on a $3,520/mo paycheck?"). |
| Specific-paycheck allocation (@se33y 3.2M at 591x; @tylerworley3) | **"Envelope a real paycheck"**: an oddly specific net amount ($2,421.88) split live into envelopes. |
| Big-number visualization (@g1djuan 1.7M; @sog_geovanie 2.4M; @musohihi 1.1M) | **"How many envelopes?"**: e.g. how many envelopes of $10k equal Elon's net worth, and how tall the stack is. Rough-but-right physical scaling. |
| "Why X costs Y" (@yourgrandmas_bf latte 2.1M; pizza 1.1M / 1.2M) | **"Envelope teardown"** of a familiar price, with the cost stack written on an envelope. |
| Weeks-left countdown tables | **"Envelope countdown"**: a weekly-updated, calendar-timely savings table. Cheap to make, so it suits a recurring series. |
| Tiny accounts break out (median 174x under 5K followers) | A zero-subscriber start is not a handicap in this niche if the hook is right. |
| 5-8s loops and 100-155s walkthroughs both win | Run two cadences: 6-8s single-envelope "read-it" loops, and 60-120s full envelope-math walkthroughs. |
| Comment-keyword funnels (Comment BUDGET → calculator) | Offer an "Envelope calculator" as the CTA. |

---

## 4. Remaining finance-relevant posts (ranks 33-66)

| # | Platform | Creator | Followers | Plays | Outlier | Dur. | Pattern | Hook / caption | URL |
|---|---|---|---|---|---|---|---|---|---|
| 33 | IG | @saadmughal228 | 2.7K | 878.3K | 70.3x | n/a | hourly-wage | $35 AN HOUR IS THE NEW 'JUST GETTING BY.' | https://www.instagram.com/reel/Dbwa9rbhbnc/ |
| 34 | IG | @johnxduda | 55.0K | 1.2M | 34.5x | n/a | choose-one | You only get $200. Choose your money blessings. (caption: Drop your $200 breakdown below.) | https://www.instagram.com/reel/DdSKL7xjbpO/ |
| 35 | TT | @thecasharchive | 2.6K | 429.1K | 204.9x | 12s | big-number | MrBeast is now making MORE MONEY than the richest actor Kevin Hart... | https://www.tiktok.com/@thecasharchive/video/7671991043306491157 |
| 36 | TT | @anamandeve | 171.2K | 766.4K | 57.6x | 7s | weeks-left | FACTS: if you and your partner saved $200/week in 2026 | https://www.tiktok.com/@anamandeve/video/7660260266902408478 |
| 37 | TT | @tyskywalka2.0 | 25.7K | 796.0K | 49.9x | 72s | hourly-wage | If you make 20/hr you can't afford to live on your own | https://www.tiktok.com/@tyskywalka2.0/video/7672492623310982413 |
| 38 | IG | @mem.efarm | 22.3K | 372.1K | 224.2x | n/a | choose-one | Would You Take $10k a Day or a Penny? (caption: Why 99% of People Fail This Money Test) | https://www.instagram.com/reel/DaoJRxYNO2A/ |
| 39 | TT | @mrsdowjones | 335.5K | 429.7K | 159.0x | 69s | fermi-estimate | The Truth About Zendaya & Tom Holland's $65 Million Prenup | https://www.tiktok.com/@mrsdowjones/video/7670241231984659743 |
| 40 | IG | @brennan_valeski | 845 | 912.8K | 33.0x | n/a | n-steps-formula | 4 steps to be financially free | https://www.instagram.com/reel/DclkWd2OaKT/ |
| 41 | IG | @who_manyo | 116.7K | 643.1K | 58.1x | n/a | choose-one | You can only keep 1: $600 million today / $200,000 per day / $9,000 per hour / $75 million per year | https://www.instagram.com/reel/DbN7amnMeex/ |
| 42 | IG | @itsjoeyviola | 3.7K | 440.9K | 125.1x | n/a | n-steps-formula | How to be financially free (in 5 steps) (caption CTA: Comment your take-home and I'll reply with your exact five-number split) | https://www.instagram.com/reel/Db_mu9EPjon/ |
| 43 | IG | @the_home_loan_mom | 5.2K | 365.9K | 131.3x | n/a | whiteboard | How Much Do You Need to Make to Buy a $2.1 M House? | https://www.instagram.com/reel/Da8bce2IfJe/ |
| 44 | TT | @felix.padilla.eng | 983 | 260.8K | 243.9x | 6s | daily-habit | HOW MUCH MONEY YOU WASTE WITHOUT NOTICING | https://www.tiktok.com/@felix.padilla.eng/video/7673438595176320269 |
| 45 | IG | @budgeters_anonymous | 371.0K | 949.3K | 17.3x | n/a | whiteboard | How to make your kid stupid rich for stupid little money | https://www.instagram.com/reel/DbQxhxAubXP/ |
| 46 | IG | @hermoneymastery | 42.0K | 565.3K | 48.0x | n/a | whiteboard | Month Ahead On Bills | https://www.instagram.com/reel/DayAMiEid3g/ |
| 47 | IG | @wrightwayinvesting | 105 | 133.7K | 825.2x | n/a | whiteboard | You know, it's been said that a 30-year mortgage for the middle class is like crack. | https://www.instagram.com/reel/Db57Gr8D7Ad/ |
| 48 | IG | @riskaadjusted | 340 | 567.5K | 39.6x | n/a | weeks-left | How much you need to deposit each week to reach your savings goal in a year: | https://www.instagram.com/reel/DbgPUtARaio/ |
| 49 | IG | @sidewalk.tv | 59.0K | 1.2M | 7.8x | n/a | business | Pizza Owner Salary $80,000 (caption: takes home $80k/year on $400k sales, with 20% margins) | https://www.instagram.com/reel/DbODBM8o3f4/ |
| 50 | TT | @tylerworley3 | 27.6K | 768.2K | 18.7x | 68s | paycheck | Budget my paycheck ($713.59) | https://www.tiktok.com/@tylerworley3/video/7673258359549693214 |
| 51 | IG | @jacobhartmanofficial | 745.0K | 657.0K | 23.0x | n/a | hourly-wage | If you make $25/hour, you take home about $17.50 after taxes. | https://www.instagram.com/reel/DbB-4QnooKK/ |
| 52 | IG | @pedro_and_zach | 3.1K | 243.1K | 169.5x | n/a | money-tiers | Nobody talks about this. Probability you actually become a millionaire based on your age right now | https://www.instagram.com/reel/DaiZASfAnGS/ |
| 53 | TT | @youngbuffett | 164.0K | 511.4K | 35.6x | 76s | compound-table | WHAT WOULD HAVE HAPPENED IF YOU INVESTED $10,000 IN ROBINHOOD IN 2021? | https://www.tiktok.com/@youngbuffett/video/7671144916776488205 |
| 54 | TT | @mountaineer_matt | 35.4K | 721.3K | 13.3x | 112s | riddle | If somebody offered you a choice between 50 pounds of $100 bills and 50 pounds of gold, which one would be worth more? | https://www.tiktok.com/@mountaineer_matt/video/7670394266845269278 |
| 55 | IG | @themakeshiftproject | 1.0M | 902.0K | 6.4x | n/a | compound-table | How Much Can You Make By Investing In The S&P 500? | https://www.instagram.com/reel/DceeezJKxV4/ |
| 56 | TT | @financebestiechloe | 7.1K | 399.0K | 29.9x | 8s | hourly-wage | If youre making $30 an hour, full time, that is $4800 a month... | https://www.tiktok.com/@financebestiechloe/video/7664624298379857182 |
| 57 | IG | @invest_with_shalinder | 364 | 428.9K | 22.2x | n/a | compound-table | INVESTING vs SAVING (The $20/day rule that can make you a millionaire) | https://www.instagram.com/reel/DckL0KhSAN1/ |
| 58 | IG | @spendshiftofficial | 1.1K | 201.0K | 101.7x | n/a | daily-habit | A $150 Saturday, $150 a week, $7,800 a year, $78,000 every 10 years | https://www.instagram.com/reel/Dcnv5ngT_gA/ |
| 59 | TT | @grant_calvert | 18.3K | 197.4K | 81.5x | 23s | compound-table | What $500 a month into VOO looks like over 38 years | https://www.tiktok.com/@grant_calvert/video/7669969800516472095 |
| 60 | IG | @studentliving12 | 134 | 162.8K | 88.4x | n/a | hourly-wage | if you're making $22 an hour, full time, that is $3,520 a month | https://www.instagram.com/reel/DbOv26fO8mo/ |
| 61 | IG | @gageheward | 9.7K | 173.9K | 71.1x | n/a | compound-table | 221k at 25 = $10,000,000 | https://www.instagram.com/reel/DaqXVd6SgpF/ |
| 62 | TT | @benny_bucks | 219.3K | 236.2K | 34.1x | 63s | riddle | If you take $1 and convert it to Iranian rial... | https://www.tiktok.com/@benny_bucks/video/7673286755327429920 |
| 63 | IG | @flickman | 11.0K | 265.5K | 18.5x | n/a | business | How does this business afford rent in NYC? $4.8k/mo?? | https://www.instagram.com/reel/Da3YK59IJZ5/ |
| 64 | TT | @its_riocuts | 957 | 128.0K | 47.0x | 27s | business | HOW MUCH DO I MAKE AS A FULLY BOOKED BARBER | https://www.tiktok.com/@its_riocuts/video/7667330924962434307 |
| 65 | IG | @pasiveempire | 19.0K | 127.1K | 36.3x | n/a | business | Just a example for 10 machines... (vending machine income) | https://www.instagram.com/reel/DcpRXqzOLS4/ |
| 66 | TT | @timelessfinancesolutions | 9.6K | 235.6K | 3.6x | 6s | weeks-left | There are 18 weeks left in 2026 | https://www.tiktok.com/@timelessfinancesolutions/video/7677269270279097630 |

### Also seen (finance-relevant, not in ranked set)

These appeared in results but were left out of the ranking, either because they repeat a cluster already well represented or because the math is incidental.

- @jacobdoesmoney (IG) 983.9K (36.3x) https://www.instagram.com/reel/DcWOomPDl9Y/ and 942.8K (23.2x) https://www.instagram.com/reel/DcCU-RKD0Fz/ : "How to be financially free (in 5 steps)"
- @diaryofasalesgirl (TT, 1.1M followers) 1.1M (15.9x) 30s https://www.tiktok.com/@diaryofasalesgirl/video/7679490340654419231 : "4 steps to be financially free" (caption "girl math to real wealth")
- @lockedwliam (IG, 1.2K) 473.4K (363.9x) https://www.instagram.com/reel/DbdoGJSh_ey/ : "4 steps to financial freedom"
- @ericsfinancials (IG) 288.9K (94.8x) https://www.instagram.com/reel/DbZ2QInhLf5/ ; @mustachemillionaire (IG, 956) 236.9K (74.8x) https://www.instagram.com/reel/Db8pDXLO6Yn/ ; @meetalexpark (IG, 1.4K) 206K (161x) https://www.instagram.com/reel/Dbo3tQ6zstL/ ; @itsjoeyviola 276K (152.1x) https://www.instagram.com/reel/DcbhwFUx5sg/ ; @real_unick 115.5K (67.1x, 37s) https://www.instagram.com/reel/DbMUONdvGcr/ ; @financebronextdoor (TT) 96.6K (94.8x) https://www.tiktok.com/@financebronextdoor/video/7670176429845368078 : N-steps clones
- @moneymovesjake (TT) 1.6M (3,493.4x, 8s) https://www.tiktok.com/@moneymovesjake/video/7663124906074295583 : "Without being greedy - how much money you need to solve all your problems?" (engagement bait, no math; copy of @mr.thank.you 2.4M https://www.instagram.com/reel/DcbHZ47ykTr/)
- @moneymovesjake (TT) 166.4K (397.1x, 7s) https://www.tiktok.com/@moneymovesjake/video/7662503699599691039 : "If you make $25/hour, you take home about $17.50 after taxes." (same text as @jacobhartmanofficial)
- @harryponders (IG, 522K) 2.3M (18.6x) https://www.instagram.com/reel/DbwvQn6M4LN/ : "$12 million" would-you-rather (non-math dilemma)
- @realoutliners (IG) 1.8M (4.9x) https://www.instagram.com/reel/DdE3W6LPTAm/ : 3D skit "If you tear a 100 bill into two pieces..."
- @fxalexg (IG, 1.7M) 2.2M (3.1x) https://www.instagram.com/reel/DdPoqzDxdpq/ and (TT) 1.5M (4.5x, 151s) https://www.tiktok.com/@fxalexg/video/7685150189341936927 : trading-challenge math written on a Bugatti windshield
- @kaylajsherman (IG, 3.7K) 2.1M (53.9x) https://www.instagram.com/reel/DdNYZQqxZ3o/ : "Wanna hear something that will make you feel better about yourself?" (Roth IRA left uninvested; confessional, no math on screen)
- @calebhammercomposer (TT, 4.7M) 7.2M (3.3x) https://www.tiktok.com/@calebhammercomposer/video/7690619919217495310 : live-audit promo
- @financeunfiltered2 (TT) 823.1K (1,506.8x) is ranked above. Related audit clips: @calebhammmerclips 855.5K (10.8x) https://www.tiktok.com/@calebhammmerclips/video/7678051342467845406 ; @cashauditx 219K (197.2x) "I BRING HOME $1,749 ... ONCE A MONTH." https://www.tiktok.com/@cashauditx/video/7660208226801044767 ; @amithevillain8 296K (36x) "200 Cokes a Month" https://www.tiktok.com/@amithevillain8/video/7661713952023268621
- @icedcoffeehour (IG, 548K) 1.1M (3.2x) "WHAT'S THE PROFIT MARGIN ON A PIZZA?" https://www.instagram.com/reel/DdQozPKgk0a/ ; @theicedcoffeehour (TT) 868.5K (32.3x, 28s) "What's the worst small business" https://www.tiktok.com/@theicedcoffeehour/video/7663269033046805780
- @alexis.nicole_ (IG) 828.6K (124.5x) "HOW MUCH I MADE DOG SITTING in one week" https://www.instagram.com/reel/DajBUIVt1UZ/
- @brittanyybowen (TT, 823.6K) 813.9K (10.9x, 208s) "July paycheck breakdown" https://www.tiktok.com/@brittanyybowen/video/7670196656238824717
- @kingba2026 (TT) 696.3K (21.8x, 17s) "POV: You said you'd start saving 'tomorrow' Day 3" (dollar into acrylic box) https://www.tiktok.com/@kingba2026/video/7674386700646223135
- @profitplugg (IG, 820.1K) 655.2K (81.3x) "Top Money Accounts" (labeled mason jars) https://www.instagram.com/reel/DbCRSg_PVO8/
- @theliving_man (TT) 620.2K (64.5x, 14s) "Start saving $2,000 a month today..." (yacht-cost satire) https://www.tiktok.com/@theliving_man/video/7662833462038056225
- @rubyydarcy (IG) 502.5K (132.4x) "Things I refuse to buy in my 20s to be a millionaire at 30" https://www.instagram.com/reel/Dci-ZBhSVAG/
- @smobydayig (IG, 80.2K) 463.7K (93.2x) "how I would budget: $1200 bi-weekly paycheck" https://www.instagram.com/reel/DZYo5e3ldvQ/
- @gidflips (IG) 430K (72.1x) "$100k in cash" https://www.instagram.com/reel/DavoN0WPmbE/
- @tommybarber823 (TT) 411.2K (34.5x, 208s) "come count my tips with me" https://www.tiktok.com/@tommybarber823/video/7667246923211869470
- @hermoneymastery (TT, 583.4K) 418.7K (42.1x, 147s) "Month Ahead On Bills" https://www.tiktok.com/@hermoneymastery/video/7662075222270463245
- @investwjonah (TT) 367.4K (26.4x, 13s) "What 4 years of buying the dip looks like:" https://www.tiktok.com/@investwjonah/video/7676138392547036447
- @tommoneymays (TT) 308.2K (53.1x, 104s) "YOU CAN'T SPEND $1 TRILLION IN A LIFETIME" https://www.tiktok.com/@tommoneymays/video/7666521340672838925
- @josuesegoviano2 (TT) 301.7K (73.9x, 45s) "Open a High yield savings account" https://www.tiktok.com/@josuesegoviano2/video/7662941262143638798
- @randyandelena (TT) 285.2K (22.2x, 84s) "How we split our FINANCES" https://www.tiktok.com/@randyandelena/video/7660000169613643038
- @tessaxlarson (TT) 281.7K (30.4x, 140s) "How to pay off your debt faster" (notepad math) https://www.tiktok.com/@tessaxlarson/video/7662075042842299662
- @wealthlogic69 (TT) 195.4K (87x, 239s) "Why Net Worth Skyrockets After $100K" https://www.tiktok.com/@wealthlogic69/video/7666577738416819487
- @gageheward (IG) 169.8K (73.2x) "$25 million for retirement 60: 50: 40: 30: 20:" https://www.instagram.com/reel/DajGUb1RFCe/
- @therealbrianmark (TT) 139.8K (185.5x, 113s) "I make 1.5m a month here's how much I ACTUALLY keep" https://www.tiktok.com/@therealbrianmark/video/7669600683376577812
- @elegant_flex81 (IG) 134.7K (68.1x) "There are 21 weeks left in 2026" https://www.instagram.com/reel/Db5sv0bxDNI/
- @thecasualceo7 (IG, 2.5K) 133.4K (249.5x) "STEAL THIS JAPANESE MONEY HABIT" (Kakeibo, stick figures) https://www.instagram.com/reel/DaujpgZDau4/
- @rainxlife_ (TT) 113.3K (1,174.1x, 360s) "1 Stop buying liabilities" (whiteboard animation) https://www.tiktok.com/@rainxlife_/video/7669411236974513428
- @cloud__ventures (IG, 357) 111K (134.7x) "People swear $20k/month means you made it" (parody) https://www.instagram.com/reel/DcpKL4kscTR/
- @wealth_withlisa (TT) 100.9K (20x, 31s) "$5,000" (monthly-salary rules of thumb) https://www.tiktok.com/@wealth_withlisa/video/7665547829410155789
- @feymershow (TT) 77.8K (207.5x, 350s) "My Liquor Store makes $1M_yr, but I earn ____ Ep 1" https://www.tiktok.com/@feymershow/video/7665672485186129182
- @theschoolofmoneysg (IG, 2.7K) 55.9K (79.3x) "Your money makes money at $100k" (seesaw animation) https://www.instagram.com/reel/Db7XpGGCDOf/
- @smartmoneysketches (TT) 32.6K (53.8x, 48s) "MONEY NEVER SLEEPS" (stick figure) https://www.tiktok.com/@smartmoneysketches/video/7664543774109945110

### Excluded as noise or mismatched metadata

- The whiteboard search returned @bbcnews (https://www.tiktok.com/@bbcnews/video/7678555828336479491) and @mocc_css_pms_official (https://www.tiktok.com/@mocc_css_pms_official/video/7659946808310844692). vidIQ's concept text describes whiteboard finance explainers, but the captions are a Yayoi Kusama news item and a Pakistani government-jobs notice. The annotation is unreliable, so I excluded both.
- The calculator-format search was off-topic for @michogrl (lash extensions), @erin.gunzelman (scar perception), @blendfrend (hair-clipper ad), @aliabdaal (AI tool launch), @nor3mak7 (materialism monologue) and @ashmeets.s (Punjabi-language credit-card points, Canada).
- Also excluded: @justinsilvajr (couple's candy math game, not money), @success_dose0 (Urdu-language, Pakistan audience) and @ai.edits757 (separating stuck bills, not math).
