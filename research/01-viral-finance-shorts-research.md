# Viral finance and finance-math Shorts: what goes viral and why

**Prepared for:** *Back of the Envelope* ("Envelope Math"), a new faceless short-form channel on YouTube Shorts, Instagram Reels and TikTok.
**Research date:** 2026-10-07
**Status:** Research only. This report combines 8 raw research sweeps and 22 scene-by-scene video breakdowns into one evidence base. The ranked shortlist of formats is in [`02-top-10-approaches.md`](02-top-10-approaches.md).
**Rule used throughout:** every view count, outlier score and URL below is copied from a file in `research/raw/` or `research/watch/`. Where something is unknown, the text says so. Calculations marked "(our check)" were redone by the research team; they are not the creator's claims.

---

## Executive summary

1. **The hook is the conversion, not the number.** Raw mega-numbers do poorly. Fahad Riaz's "How much is a billion dollars?" scored 3.62x on a 1.52M-sub channel, and "The national debt is hard to comprehend" scored 1.35x. The same numbers converted into **units** ("Cost in Units of Starbucks Lattes", 9.86M), **time** (Story Snap's "$1/second for a billion = 32 years of your life", 9.4M at 150.55x) or a **dilemma** (Filomation, 5.66M at 388x) break out.
2. **Small accounts break out because of the format, not the audience.** On Instagram and TikTok, posts from accounts under 5K followers had a **174.4x median outlier**, against 18.6x for 500K+ accounts. On YouTube, channels of 841 to 14.8K subs reached 1.7M to 22.8M views with unit conversions, tax splits and receipt re-shops.
3. **Successful videos are either very short or long, and few sit in between.** One cluster is 4 to 8 s "read-it" loops: text takes longer to read than the clip runs (1,106x, 1,131x, 522x). The other is 45 to 155 s walkthroughs where every sentence adds a number (603x, 908x, 591x). A video fails because of sentences with no new number, not because it is long.
4. **Almost nobody shows the math.** Dr Bandana never states the spend rate. Granny Drive never computes the 116-day break-even. Monarch never adjusts for inflation. Tilbury never states the Big Mac margin. The "$11M/mo" in a CoComelon title is never derived. Money Guy and Sklar show no numbers at all. Meanwhile, published money math is often wrong: a guide's MrBeast-per-second figure is off by 86,400x, and roughly 70% of top finance TikToks in one graded sample scored C or lower. **A visible, sourced, rough-but-right envelope calculation is a position nobody holds.**
5. **The double meaning of "envelope" has demand on both sides.** #cashstuffing is reported at about 1.9B TikTok views, and the 100 Envelope Challenge at 150M+. Implicit Fermi estimation, such as "How much would it cost to…" and "Cost in Units of…", breaks out from 4.5K-sub channels at 390x. Explicit "napkin math" or "Fermi" titles have no search demand. So the method should be the signature, not the keyword.
6. **The platforms now actively reward originality and penalise templates.** YouTube's Oct 1 2026 Shorts update, Instagram's Apr 30 2026 aggregator rule and TikTok's For You eligibility rules all down-rank re-uploads and template-based bulk changes. A hand-drawn envelope look with our own calculations is both the brand and the protection.

---

## 1. Methodology and data sources

### 1.1 Tools and sweeps

| Sweep (file) | Tool(s) | Calls | What was scanned |
|---|---|---|---|
| `raw/yt-big-number-math.md` | vidIQ `vidiq_outliers` (Shorts), `vidiq_video_transcript` | 20 (14 outlier searches + 6 transcripts) | Big-number money math, compounding, inflation, net worth, national debt. 33 finance rows tabled |
| `raw/yt-personal-money-math.md` | vidIQ outliers + transcripts | 20 (15 + 5) | Salary/tax, house affordability, car loans, credit cards, "true cost", budgeting, girl math, FIRE, hourly pay. 44 rows tabled, plus a timeline of the "Cost in Units" series |
| `raw/yt-puzzles-estimation-business.md` | vidIQ outliers + transcripts | 20 (15 + 5) | Money puzzles, dilemmas, guess-the-price, business models, lottery/casino, creator income. 36 rows tabled |
| `raw/ig-tiktok-outliers.md` | vidIQ `vidiq_instagram_tiktok_outlier_search` | 15 (12 queries + 3 retries) | 66 unique finance-relevant IG/TikTok posts, deduplicated and clustered into 15 patterns |
| `raw/creator-catalogs.md` | vidIQ `vidiq_channel_videos` (popular Shorts) + transcripts | 20 | Top Shorts of Mark Tilbury, Finance With Sharan, Graham Stephan, Caleb Hammer, Money Guy, Mr Planktin, Nischa, Your Rich BFF and others (up to 50 Shorts each) |
| `raw/web-creator-case-studies.md` | vidIQ channel/outlier calls + WebSearch | 8 vidIQ | Humphrey Yang, Tilbury, Vivian Tu, Tori Dunlap, Erika Kullberg, Caleb Hammer, Nischa, WhiteBoard Finance, cash-stuffing creators |
| `raw/web-trends-and-whitespace.md` | vidIQ outliers + WebSearch | 6 vidIQ + ~45 searches | Named trends (#cashstuffing, girl math, loud budgeting, no-buy) and a landscape of napkin-math / Fermi whitespace |
| `raw/web-platform-mechanics.md` | WebSearch | ~60 searches, 0 vidIQ | Ranking signals, view counting, length, originality/AI rules, monetization, finance regulation |
| `watch/group1…group6` (22 files) | vidIQ `vidiq_watch_shortform_content` (+4 transcripts) | 22 watch jobs | Scene-by-scene breakdowns of the 22 most instructive outliers: hooks, every number on screen, pacing, loops, comment triggers, plus our math audits |

**Totals:** about 109 vidIQ calls across the sweeps, including **about 67 outlier searches**. YouTube searches each requested up to 15 to 20 results and IG/TikTok calls returned up to 16. There were also about 20 creator catalogs (up to 50 Shorts each), 22 watch jobs and more than 100 web searches. From this the team tabled about 180 finance-relevant Shorts and Reels (33 + 44 + 36 + 66, plus the creator-catalog tables, with some overlap). 22 of them were watched scene by scene.

### 1.2 Date range and index caveats

- **The YouTube outlier index covers about the last 12 months**, even with `allTime` set. Almost every result was published between **Oct 2025 and Oct 2026**; the oldest was 2025-10-09. The **IG/TikTok index covers about 90 to 120 days**: every result was posted between **2026-06-10 and 2026-10-03**. Creator catalogs and web sources fill in older classics from 2020 to 2025, such as Humphrey Yang's rice video, the Hydroflask video and Erika Kullberg.
- **Outlier score definitions.** On YouTube it is vidIQ's breakoutScore: views ÷ the channel's typical Short. On IG/TikTok it is plays ÷ the creator's median plays. `n/a` means vidIQ did not compute a score. It does not mean zero.
- **View counts are inflated by counting changes.** Since 2025-03-31 a YouTube Shorts view counts on every start or replay, and since 2026-08-24 YouTube counts views from the first frame. Earnings still use "engaged views". Public counts are reach figures, not attention figures.
- **Data hygiene.** These were **excluded as paid or boosted**: AutoBuddy (7,210x, a lead-gen ad), the ADNOC card promo, the RBC promo, and Your Rich BFF's GEICO, Lyft and Hotels.com posts (21.5M views at a **0.07%** like rate). The rule used: a like rate below about 0.3% means distribution was paid. Re-uploads (@bigkbreezyy.ai, 29 followers) were discounted.
- **Evidence levels.** "Watched" means a vidIQ scene-by-scene breakdown exists in `watch/`. "Transcript" means the spoken words were pulled. "Inferred" means the format was judged from title, duration and tags only.
- **Limitations.** Most YouTube and web pages could not be fetched directly because of the egress proxy, so web claims come from search-result summaries, each linked in the raw files. Like and comment counts were not pulled for most IG/TikTok posts. The visuals of HD Guy's "Cost in Units" videos were not watched.

---

## 2. The most viral examples

### 2.1 Top 25 by reach (finance or finance-math, organic)

Sorted by views. The "Approach" column refers to the ranked formats in `02-top-10-approaches.md`: A1 Cost in Envelopes · A2 Rate Clock · A3 Read-It Ladder · A4 Two Envelopes · A5 Envelope Split · A6 Same Pile, Different Place · A7 Sealed-Envelope Estimate · A8 Trap Card · A9 Itemized Tally · A10 Envelope Audit.

| # | Creator (platform, size) | Title (verbatim) | Views | Outlier | Length | Format / approach | URL |
|---|---|---|---|---|---|---|---|
| 1 | Finance With Sharan (YT) | Why You Should Invest Early | 69,845,216 | n/a | 48 s | Family skit: early stopper vs late starter, "5 Cr vs 11.5 Cr" (transcript) · A4 | https://www.youtube.com/shorts/sU9SFT1nAOw |
| 2 | Mark Tilbury (YT, ~8.9M) | Spending $100 BILLION in 40 Seconds | 40,927,810 | 11.91x (his top breakout) | 49 s | Time-boxed spend-down · A2 | https://www.youtube.com/shorts/zWWzd4TWIV8 |
| 3 | HD Guy (YT, 188K) | Cost in Units of RTX 5090 | 30,575,734 | 62.5x | 26 s | Price restated in units of a hot item (inferred) · A1 | https://www.youtube.com/shorts/E2oVrAwHDOw |
| 4 | Mark Tilbury | Cost vs Price: McDonald's Big Mac | 29,408,278 | 11.55x | 30 s | Ingredient-by-ingredient tally, "hidden costs" twist, 5,127 comments (transcript) · A9 | https://www.youtube.com/shorts/nWXP8rHErQc |
| 5 | Mark Tilbury | How Long Does It Take For These Companies To Make $1 Million? | 22,963,921 | 4.24x | 26 s | Fixed $1M target, varying company rate · A2/A6 | https://www.youtube.com/shorts/EqB0MNwSfXs |
| 6 | RealEstate with AJ (YT, 14.8K) | what you get after Taxes hit your pocket 🌎 | 22,816,685 | **17,564.8x** (corpus max) | 31 s | One $1M stack split country by country, Dubai last (watched) · A6 | https://www.youtube.com/shorts/3EQfIGdT54E |
| 7 | LIE HARD by Gaurav Kapoor (YT, 6.1K) | Guess the price 💲 | 17,889,341 | 3,339.5x | 48 s | Commit-then-reveal resale guess, celebrity panel, sponsored (watched) · A7 | https://www.youtube.com/shorts/f_vANVcVHo8 |
| 8 | Mark Tilbury | Making $1 Every Second ($1M to $1 Trillion) | 15,347,851 | 4.82x | 17 s | Rate-to-time ladder, 4.16% like rate · A2 | https://www.youtube.com/shorts/-pqKQqr25VM |
| 9 | InFocus (YT, 3.49K) | Cost in Units of iPhone 17 Pro | 14,909,673 | n/a (≈4,272 views/sub) | 11 s | Unit conversion, launch week (inferred) · A1 | https://www.youtube.com/shorts/MiwPs13cYkk |
| 10 | Humphrey Yang (YT, ~2.0M) | 🎳 How Much Do Bowling Alleys Make? | 10,557,323 | n/a | 56 s | Fermi business estimate, 5.67% like rate · A7 | https://www.youtube.com/shorts/6rL-7T66QfA |
| 11 | HD Guy | Cost in Units of Starbucks Lattes | 9,858,055 | 106.2x | 40 s | Unit conversion, no transcript (likely no VO) · A1 | https://www.youtube.com/shorts/NHbMe2F_JXY |
| 12 | Story Snap (YT, 53.7K) | How long would it actually take to pick up a BILLION dollars 💵🤑 | 9,405,491 | 150.55x | 14 s | Two-sentence rate conversion: Earth laps, then "32 years of your life" (transcript) · A2 | https://www.youtube.com/shorts/hbXfAY8PrjE |
| 13 | @mathsgenius222 (IG, 14.1K) | Answer without Googling... The answer is not 300! | 9.3M | 522.3x | 5 s | Silent still of a handwritten trick puzzle (watched) · A8 | https://www.instagram.com/reel/Da121CCI8Bh/ |
| 14 | Mr Planktin (YT, 870K) | Compound interest explained 😂 #shorts | 9,059,331 | 153.15x | 61 s | Animated saver-vs-spender kids, running interest counter (transcript) · A4 | https://www.youtube.com/shorts/rrpn3zo2Slo |
| 15 | Humphrey Yang | Two Investors Buy Apple At The Same Time. Who Makes More? | 8,404,025 | n/a | 36 s | Two-path race · A4 | https://www.youtube.com/shorts/SaGvoCTVCyk |
| 16 | The Money Guy Show (YT) | Private Chef Every Night as a Tax Write-Off? - Financial Advisors React | 6,195,245 | 272.45x | 36 s | Claim + expert disbelief, no numbers shown (watched) · A10 | https://www.youtube.com/shorts/LcaiiOGG3SY |
| 17 | Filomation (YT, 1.75K) | Someone's never heard of compound interest | 5,662,642 | 388.12x | 6 s | $1M lump vs $1,000/week-for-life reaction meme (watched) · A4 | https://www.youtube.com/shorts/klM8NXv-MFg |
| 18 | Granny Drive (YT, 96.3K) | $200M Once or $20 Per Second? Elon Musk SHUTS It Down 💀 | 5,612,751 | 73.33x | 5 s | Would-you-rather card · A4 | https://www.youtube.com/shorts/H6f0Ip3OoOg |
| 19 | Kel King (YT, 9.16K) | A car you can buy for $3k and rent for $400 weekly | 5,189,444 | 1,131.1x | 7 s | Static payback text over cash-count B-roll (watched) · A3 | https://www.youtube.com/shorts/KnC5kPBGiJ4 |
| 20 | Dr Bandana (YT, 25.2K) | How Long Would It Take to Spend $1 Billion? ⏳💰 | 4,583,002 | 98.03x | 63 s | Hour-stamped story countdown (transcript) · A2 | https://www.youtube.com/shorts/zHHIUJSzrhA |
| 21 | DanielChunNY (YT, 4.5K) | How much would it cost to rent Monica's apartment from Friends? | 3,735,961 | 390.46x | 60 s | Pop-culture costing, $200 anchor → $8,000/mo (watched) · A7 | https://www.youtube.com/shorts/m-caEiD0MlQ |
| 22 | Monarch (YT, 4.9K) | Then Vs Now: Walmart Groceries | 3,724,308 | 603.21x | 95 s | 2005 receipt re-shopped item by item, $32.59 → $73.66 (watched) · A9 | https://www.youtube.com/shorts/5MSoNPKDjDE |
| 23 | @jamaalourcity (TT, 47.4K) | "Pocket Watching" Ep. 77: Jordan Howlett's monthly income | 3.7M | 908.0x | 152 s | On-calculator Fermi estimate, $1.06M/mo (watched) · A7 | https://www.tiktok.com/@jamaalourcity/video/7664369518873103638 |
| 24 | @se33y (TT, 56K) | budget my paycheck ($5,416.33) as a 20 year old nurse | 3.2M | 591.4x | 106 s | Line-by-line paycheck allocation (watched) · A5 | https://www.tiktok.com/@se33y/video/7679220804218866957 |
| 25 | @moneyletter (IG, 33.9K) | How to split your paycheck (without going broke) | ~3.0M | 316.0x | 72 s | Cash dropped into 50/15/5/30 labelled cups, "Comment BUDGET" (watched) · A5 | https://www.instagram.com/reel/DcTb9M9xLC0/ |

### 2.2 Breakout leaders: highest multiples from small accounts (not in 2.1)

These show which formats work with no audience behind them.

| Creator (size) | Title | Views | Outlier | Length | Format / approach | URL |
|---|---|---|---|---|---|---|
| @financeunfiltered2 (TT, 10.9K) | Financial Audit's Most Disturbing Episode | 823.1K | 1,506.8x | 75 s | Host tries to calculate a guest's income live · A10 | https://www.tiktok.com/@financeunfiltered2/video/7683562309007985934 |
| David Sklar & Associates (YT, 1.36K) | Stop Paying the Minimum on Credit Cards. It's Keeping You in Debt | 303,523 | 1,227.8x | 85 s | Credentialed myth-bust, zero numbers shown (watched) · A10 | https://www.youtube.com/shorts/XCmCiQaEg3k |
| @mightym11805 (IG, 594) | An energy drink is $3 a day | 2.0M | 1,106.2x | 7.6 s | Hand + can, static day→decade ladder, anti-guilt punchline (watched) · A3 | https://www.instagram.com/reel/DanrXawh9Xq/ |
| @sog_geovanie (TT, 1.3K) | Congratulations Elon Musk!!! You worked SOOOOO hard for that $1,000,000,000,000.00 | 2.4M | 1,005.7x | 107 s | Live calculator fact-check: $50K/hr since Year 1 < $1T (watched) · A2/A10 | https://www.tiktok.com/@sog_geovanie/video/7667278089755299085 |
| FVIDEOS PRODUCTION (YT, 3.85K) | What 1 million euros looks like | 1,825,837 | 890.12x | 25 s | Wordless cash-stack drops, +€50K counter badge (watched) · A1 | https://www.youtube.com/shorts/GntsUz5JwiM |
| Teacherman 91 (YT, 104K) | would you take 1 million cash or a penny that doubles for 30 days? | 246,315 | 735.3x | 54 s | Street dilemma, answer never revealed (watched) · A4 | https://www.youtube.com/shorts/p2Vu4YKeJMM |
| @hoooon492 (TT, 11.4K) | How to be financially free | 1.0M | 713.3x | 45 s | Faceless stick-figure income split · A5 | https://www.tiktok.com/@hoooon492/video/7677806086635785485 |
| Joey Viola (YT, 1.48K) | How I Split Every Paycheck (The Exact 5 Percentages) | 815,565 | 565.9x | 40 s | "Multiply your income by 0.55" list, save CTA (watched) · A5 | https://www.youtube.com/shorts/z_fN85fAbkM |
| Behind the Border (YT, 4.1K) | Elon Musk vs MBS: Net Worth Comparison (2012–2027) 💰 | 1,740,010 | 535.07x | 62 s | Music-only net-worth race, overtake at 0:33 (watched) · A4 | https://www.youtube.com/shorts/72ifhkiGq40 |
| @anatalksmoney (TT, 62.5K) | when I ... said $27/day is $10,000 a year ("math police") | 926.2K | 491.2x | 5.85 s | Lip-sync over deliberate rounding (watched) · A3 | https://www.tiktok.com/@anatalksmoney/video/7664247808488181023 |
| Gaurav Asija (YT, 8.28K) | Lottery (Matka) #business Explained | 835,718 | 467.6x | 84 s | Payout ladder → "house wins" reveal, newsjacked (watched) · A9 | https://www.youtube.com/shorts/qoXoUyzqod8 |
| Alaric Moses Ong (YT, 6.48K) | Would you take the $1 million… if you couldn't spend it on the people who matter most? | 51,481 | 421.8x | 11 s | Dilemma card · A4 | https://www.youtube.com/shorts/z4DXR8vJGTg |

**Also notable but outside the ranked tables:** @giraffe.8206791's cash-drop savings box, "My saving journey - Day 12" (IG, 10.2M, 98.9x, https://www.instagram.com/reel/DcvTGf_tK8r/), has the largest raw IG reach but no math. Think India's Fevicol founder story (YT, 7,190,255, 1,145x, https://www.youtube.com/shorts/ZblsUiXANEw) uses "billion" as a status word with **zero math** (watched). Humphrey Yang's 2020 rice video (1 grain = $100K, Bezos ≈ 58 lb of rice) drew about 2.2M combined TikTok views per press reports and is the ancestor of the unit-swap format (https://www.tiktok.com/@humphreytalks/video/6796564670481190150).

---

## 3. What makes viral finance-math Shorts stand out

Each principle is backed by the evidence above.

**3.1 Converting the number is the hook.** A familiar unit or a span of human time makes magnitude something the viewer can feel. "Latte factor" returned **zero** finance Shorts, yet "Cost in Units of Starbucks Lattes" reached 9.86M. Story Snap's single division (9.4M, 150.55x) beats a big creator's "How much is a billion dollars?" (3.62x). News-style "debt surpasses $38T" posts sit at 3 to 11x. *(raw/yt-big-number-math.md P1; raw/yt-personal-money-math.md P1)*

**3.2 Ride a famous noun, never a jargon title.** Nearly every 10M+ math Short rides on a household name: McDonald's, Starbucks, RTX 5090, iPhone 17 Pro, Elon, Friends, Walmart, Costco. Concept titles fail. The best strict "Rule of 72" Short got **29,860** views. Schwab's compound-interest explainer got 23K and Acorns' 15.5K. WhiteBoard Finance's best Short got 19.7K despite more than 1M long-form subs. Nischa's $10K-compounding Short got 66K while her routines got 4.4M. *(creator-catalogs §E; web-creator-case-studies §2.13)*

**3.3 Frame 1 = title = first spoken line, and it contains a number or a dilemma.** All five transcribed puzzle and business outliers open on their title question within the first sentence. Monica's "How much would it cost…" appears as title, on-screen text and first spoken line at once. Joey Viola's first words are step one ("Number one, take your monthly income and multiply it by 0.55"). TikTok's ad data says over 63% of top-CTR videos land the key message in 3 s. *(yt-puzzles P12; watch/group5-video2; watch/group4-video2)*

**3.4 Run two length modes.** Short loops: @mightym11805 at 7.6 s (1,106x), Kel King at 7 s (1,131x), mathsgenius at 5 s (522x), Filomation at 6 s (388x). Long walkthroughs: Monarch at 95 s (603x), Regalis at 88 s (244x), jamaal at 152 s (908x), se33y at 106 s (591x). Of the top six big-number Shorts by views, three are 14 s or shorter and three run 61 to 95 s; the 20 to 45 s middle is under-represented. Long works when **every sentence adds a number**. Regalis broke out at 88 s on "one new number per sentence", and vidIQ flagged jamaal's 60 s of numberless biography as the weak point. *(ig-tiktok §2.3; yt-big-number P6; yt-puzzles P5; watch/group1-video2)*

**3.5 Give an early partial payoff, hold the hero number to the end, and break the pattern at 35 to 40%.**
- Story Snap pays off distance at about 6 s, then lands the twist ("32 years of your life") at 14 s.
- Big numbers come late: Monica's $8,000 at 54 of 60 s (90%), jamaal's $1.06M at 140 of 152 s (92%), Monarch's total in the final line.
- Monarch's milk got *cheaper* at about 0:33 (35%), resetting attention. Behind the Border's overtake lands at 55%.
- Two final numbers side by side ($32.59 vs $73.66; ₹5 Cr vs ₹11.5 Cr) are more shareable than one.

**3.6 Make the viewer commit before the reveal.** Dilemmas (Teacherman 735x, Alaric 422x, Filomation 388x), guess-the-price (LIE HARD 3,339x; bris 6.8M at 212x; Jolene Erdman 3.18M at 174x) and puzzle cards (mathsgenius 522x) are the most consistent tiny-channel breakouts. A silent vote in 1 to 2 s invests the viewer's ego. They watch to check their answer and comment to defend it.

**3.7 Correctable rounding and open loops drive comments, so make them deliberate and label them.** Examples:
- @anatalksmoney captioned her own rounding "the math police blew up my comments" (491x).
- Fairy Tanton's "check my math" title over a 30% tax estimate that is off by $14.63 reached 1.29M at 50.7x.
- Tilbury left the Big Mac margin unstated (5,127 comments).
- Teacherman never gave the penny answer (735x).
- sog_geovanie's "AD = After Death" slip triggered correction comments.

For a "right" brand, the safe version is a labelled rough figure, the exact number pinned in a comment, and a genuine question. Meta demotes "comment YES" style bait. *(watch/group2-video2; yt-big-number P7; platform mechanics §5)*

**3.8 Oddly specific numbers read as true; round numbers read as goals.** Specific inputs recur among top performers: "$5,416.33" (3.2M), "$713.59", "$17.50 after taxes", "$27.40 a day", "$5.29 Big Mac", "17 items cost $32.59". Round power-of-ten targets ($1M, $1B, $1T, ₹1 Cr) work as milestones. *(ig-tiktok §2.4; creator-catalogs §B)*

**3.9 Faceless works when the number earns the attention a face would.** Faceless or hands-only outliers include:
- Cost in Units (likely no VO)
- FVIDEOS (hands, 890x)
- @mightym11805 (hand and can, 1,106x)
- mathsgenius (still paper, 522x)
- @hoooon492 (stick figures, 713x)
- @investment_timeline (animated chart, 141x)
- Story Snap (VO over walking, 150.55x)
- Mr Planktin (animation, 153x)

Formats that won on charisma must be rebuilt with the number first and a running total on screen. Those include jamaal's 60 s biography, se33y's car vlog and AJ's street skit.

**3.10 Named series compound, but repeats of the same subject decay.**
- Series identity drives follows and request comments: "Pocket Watching" Ep. 77, HD Guy's nine "Cost in Units" episodes in two months, Bran's wage series, Tilbury's "Cost vs Price", "Day 2 of Excellent Indian Businesses", "Follow for Chandler and Joey's next".
- Repeats decay fast: Behind the Border went 535x → 29.8x → 5.2x, and Planktin's sequel fell to 5.52x.
- The unit choice decides everything: HD Guy's episodes range from 75,736 (Single Family Homes) to 30.6M (RTX 5090).
- **Keep the template; rotate the variable.**

**3.11 Ride the price story of the week.**
- Topical units: RTX 5090 (30.6M) and DDR5 (2.59M) came during the 2026 GPU/RAM price spike, and iPhone 17 Pro (14.9M on 3.49K subs) in launch week.
- Search-led news: sog_geovanie rode a live "elon becomes trillionaire" search.
- Newsjacks: Matka newsjacked the *Matka King* series, and India's 8th Pay Commission salary cards hit 853.2x.
- Even a local news station's "$5,000 dividend would cost $1.2T" broke out at 47.8x.

**3.12 Design for sends, saves and completion.**
- Instagram's top three signals are watch time, likes per reach and sends per reach, and sends matter most for non-followers.
- Frameworks earn saves (Joey's "Save for later").
- Comment-keyword lead magnets work on Instagram ("Comment BUDGET", 316x; "comment your take-home", 125.1x).
- A direct question in the caption earned Humphrey 4 to 6x more comments per view (1.02 to 1.38 per 1K vs 0.2 to 0.3).
- Build a taggable person into every script, e.g. "the friend who writes everything off".

**3.13 Accuracy is now an advantage.** DayTrading.com graded 10 high-view finance TikToks and about 70% scored C or lower, with 60% getting D/F on oversimplification. A widely indexed guide mislabels per-day dollars as per-second. Vivian Tu attributes her 3M-view, 100K-follower first week to "I actually showed people the math." *(web-trends §1.16; web-creator-case-studies §2.4)*

---

## 4. Platform mechanics and policy constraints

Every item is sourced in `raw/web-platform-mechanics.md`, with evidence grades kept: [OFFICIAL], [DATA], [3P].

### 4.1 Distribution: every post is tested on its own
- **All three platforms test each post on a small seed audience, regardless of followers.** TikTok: follower count and past hits are not direct For You factors ([TechCrunch](https://techcrunch.com/2020/06/18/tiktok-explains-how-the-recommendation-system-behind-its-for-you-feed-works)). Instagram shows a post "to a small audience" first ([TechCrunch, Apr 30 2024](https://techcrunch.com/2024/04/30/instagram-is-updating-its-ranking-systems-to-surface-more-content-from-smaller-original-creators)). YouTube finds a "seed audience" for each Short ([MediaPost](https://www.mediapost.com/publications/article/388588/)). [OFFICIAL]
- **YouTube's key choice signal is "Viewed vs. swiped away" / "Stayed to watch"** ([Search Engine Journal](https://www.searchenginejournal.com/youtube-explains-how-shorts-algorithm-works/494953/)). **Instagram reports a 3-second Skip rate** (Aug 2025) ([Metricool](https://metricool.com/instagram-reel-analytics/)).
- **Instagram's top signals are watch time, likes per reach and sends per reach**, with sends weighted most for non-followers ([Social Media Today, Jan 2025](https://www.socialmediatoday.com/news/instagram-shares-algorithm-insights-2025/738034/)). [OFFICIAL]
- **TikTok weights finishing a longer video** as a strong signal ([TikTok Newsroom](https://newsroom.tiktok.com/en-us/how-tiktok-recommends-videos-for-you/)). [OFFICIAL]

### 4.2 Views, loops and length
- **YouTube counts a Shorts view on every start and replay** (since 2025-03-31). The stricter count lives on as **Engaged views, which exclude loops and drive earnings** ([Tubefilter](https://www.tubefilter.com/2025/03/26/youtube-shorts-views-counting-stats/); [Says.com](https://says.com/my/tech/youtube-shorts-new-metric)). First-frame counting extended to all formats on 2026-08-24 ([Tubefilter](https://www.tubefilter.com/2026/08/18/youtubes-now-counting-public-views-from-the-first-frame-hoping-inflated-numbers-will-help-creators-negotiate-brand-deals/)). **Instagram Views include repeat views** (Apr 21 2025) ([SocialPilot](https://www.socialpilot.co/instagram-marketing/instagram-views-metrics-changes)). Loops raise reach, not YouTube earnings.
- **Length sweet spots differ by platform:**
  - **YouTube:** creators favour under 30 s ([Adobe, 507 creators](https://www.adobe.com/express/learn/blog/youtube-shorts-length-study)).
  - **Instagram:** 45 to 60 s had the highest median views ([Socialinsider, ~140K Reels](https://socialinsider.io/blog/instagram-reels-length/)).
  - **TikTok:** over 60 s gets **43.2% more reach** ([Buffer, 1.1M videos](https://buffer.com/resources/longer-tiktoks-get-more-views-data/)), and only videos over 1 minute earn Creator Rewards ([Metricool](https://metricool.com/tiktok-creator-next/)). [DATA]
  - **Practical rule:** make one master and cut it three ways (~25 s / ~45 s / ~65 s).
- **TikTok's ad data:** over 63% of top-CTR videos put the key message in the first 3 s ([TikTok for Business](https://ads.tiktok.com/business/en-US/blog/9-creative-tips-to-drive-auction-ad-performance)).
- **Captions and sound:** 69% of US adults watch sound-off in public, and 80% are more likely to finish with captions ([Verizon/Publicis](https://www.streamingmedia.com/Articles/News/Online-Video-News/80-of-Video-Caption-Users-Arent-Hearing-Impaired-Finds-Verizon-131860.aspx)). 88% of TikTok users say sound is essential ([ROI Revolution](https://roirevolution.com/blog/july-2021-social-media-water-cooler/)). Instagram warns against Reels "predominantly covered by text" ([Tubefilter](https://tubefilter.com/2021/02/10/instagram-reels-with-tiktok-watermark-less-discoverable/)).

### 4.3 Originality, templates and AI (the biggest constraint for a faceless channel)
- **YouTube YPP "inauthentic content" (Jul 15 2025)** targets content that "follows a template with minimal variation" or is mass-produced ([Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/)).
- **YouTube Shorts recommendation update (Oct 1 2026):** "VO descriptions of what's happening on screen, minor technical edits, or template-based bulk changes" do not count as original. Commentary, analysis and perspective do ([Relevant Audience](https://www.relevantaudience.com/youtube/youtube-shorts-original-content-reach-update/); [Android Headlines](https://www.androidheadlines.com/2026/10/youtube-cuts-reach-reuploaded-shorts-originality-push.html)).
- **Instagram (Apr 30 2026):** accounts that mainly post unoriginal content are removed from recommendations, and **75% of US recommendations now come from original posts** ([TechCrunch](https://techcrunch.com/2026/04/30/instagram-restricts-reach-of-content-aggregators-in-new-crackdown/)). Other apps' watermarks make Reels less discoverable; your own logo is fine ([Social Media Today](https://www.socialmediatoday.com/news/instagram-clarifies-including-your-own-logo-on-a-reel-is-ok/730852/)).
- **TikTok:** unoriginal, low-quality or watermarked re-uploads are ineligible for For You ([Online Optimism](https://onlineoptimism.com/blog/updates-tiktoks-community-guidelines)). Users have an "AI" slider to see less AI content ([TechRepublic](https://www.techrepublic.com/article/news-tiktok-ai-content/)).
- **Copyright trap:** a YouTube Short **over 1 minute with any active Content ID claim is blocked globally** ([YouTube Help](https://support.google.com/youtube/answer/15424877?hl=en)). Licensed music reduces the creator's share of Shorts revenue ([vidIQ](https://vidiq.com/blog/post/youtube-shorts-monetization/)). This rules out copying the TV-clip outliers (Seinfeld 246x, Futurama 1,442x, Friends clips in Monica).
- **"AI slop" is a stated 2026 YouTube priority** ([eWeek](https://www.eweek.com/de/news/youtube-ai-slop-crackdown-creators/)). Kapwing's audit of a fresh account found **21% of the first 500 Shorts shown were AI-generated** ([The Decoder](https://the-decoder.com/one-in-five-youtube-shorts-shown-to-new-users-is-ai-generated-slop-study-finds/)). Realistic synthetic content needs a disclosure label, but animated envelopes and charts do not ([9to5Google](https://9to5google.com/2024/03/18/youtube-altered-content-disclosure/)).

### 4.4 Engagement-bait and cadence rules
- **Meta demotes engagement bait** ("comment YES", "tag a friend", vote-baiting) ([SEJ](https://www.searchenginejournal.com/facebook-demoting-engagement-bait/228071)). Content that is "sensitive or low-quality… about health or finance" is not recommended ([Social Samosa](https://www.socialsamosa.com/2020/09/facebook-highlights-recommendation-guidelines)).
- **YouTube Shorts lead:** posting more does not by itself widen reach. **Deleting and re-uploading is treated as spam** ([Social Media Today](https://www.socialmediatoday.com/news/youtube-shares-advice-for-shorts-creators-including-notes-on-hashtags-the/691835/)).
- **Cadence data:** Instagram 3 to 5 posts/week ([Buffer, 2M posts](https://buffer.com/resources/how-often-to-post-on-instagram/)). TikTok views per post keep rising up to 11+ posts/week ([Buffer, 11.4M posts](https://buffer.com/resources/how-often-should-you-post-on-tiktok/)).
- **Instagram hashtags are capped at 5** ([Blog du Modérateur](https://www.blogdumoderateur.com/instagram-limite-hashtags-5-par-publication/)). **Trial Reels** test a Reel on non-followers only ([RouteNote](https://routenote.com/blog/how-to-test-reels-with-non-followers-on-instagram/)). Public professional posts are indexed by Google ([Metricool](https://metricool.com/instagram-indexing-on-google/)).

### 4.5 Monetization
- **YouTube Partner Program (YPP):** today the bar is 1,000 subs plus 10M Shorts views in 90 days. **From Feb 1 2027**, new applicants need 1,000 subs plus 20M qualified Shorts views in 90 days or 8,000 watch hours, and everyone needs a rolling 10M per 90 days to keep earning from the Shorts pool ([YouTube Blog](https://blog.youtube/news-and-events/youtube-partner-program-updates-2027-new-opportunities-earn/)). A channel launching now has about 4 months under the lower bar.
- **Shorts RPM** is about $0.03 to $0.10 per 1,000 views ([vidIQ](https://vidiq.com/blog/post/youtube-shorts-monetization/)). Shorts are for discovery; long-form, products and sponsors pay.

### 4.6 Finance-specific rules
- **TikTok bans branded content for all financial products** ([Savings.com.au](https://www.savings.com.au/savings-accounts/the-end-of-fintok-tiktok-bans-crypto-and-finance-related-branded-content)).
- **YouTube bans "get rich quick" promises and misleading titles** ([YouTube Help](https://support.google.com/youtube/answer/2801973)).
- **FTC:** disclosures go in the video itself, spoken if the endorsement is spoken ([Davis Wright Tremaine](https://www.dwt.com/insights/2023/07/ftc-advertising-endorsement-and-testimonial-guides)).
- **UK FCA FG24/1:** unauthorised promotion of regulated products can be a criminal offence, and urgency language is flagged ([FCA](https://fca.org.uk/publications/finalised-guidance/fg24-1-finalised-guidance-financial-promotions-social-media)).
- **EU ESMA (Jan 2026):** a "not investment advice" disclaimer **does not protect you** ([CONSOB/ESMA](https://www.consob.it/web/consob-and-its-activities/w/press-release-of-12-january-2026-finfluencers-)).
- **Operating rule:** teach math, not picks. State assumptions on screen ("7%/yr assumed, before fees and taxes"). No named-ticker calls, no personalised advice.

---

## 5. Trends (what's moving, and what's moving *right now*)

### 5.1 Live in the last 90 days (from the outlier indexes)
- **"Cost in Units of ___".** HD Guy's first episode posted 2026-07-26. By 2026-10-07, copycat channels with under 5K subs had reached 1.76M (Red Bull), 2.59M (DDR5) and 14.9M (iPhone 17 Pro). The format is **under 3 months old** and spreading fast, so expect saturation. *(yt-personal §1a)*
- **"How to be financially free (in 5 steps)":** **16 near-identical posts from 13 creators, about 12.7M plays in 90 days.** This template has become a meme. *(ig-tiktok §2.1)*
- **Read-it ladders** (day → week → year → decade) are the highest-outlier hook type in the IG/TikTok sweep: the daily-habit cluster's median is 285.7x.
- **Fermi-style income estimates** have the highest median outlier of any IG/TikTok cluster (533.5x).
- **"You can only keep 1" rate-vs-lump-sum polls:** @jacobhartmanofficial 1.2M, @who_manyo 643K, @ruinvests 305x.
- **Topical prices:** RTX/DDR5 price doubling, the iPhone 17 Pro launch, the "Elon becomes trillionaire" search, the *Matka King* series and India's 8th Pay Commission.
- **Weekly countdown templates** ("There are 18 weeks left in 2026") get reposted weekly with a new number.

### 5.2 The 2022–2026 vocabulary cycle (each term is a fresh hook you can put a number on)
- **#cashstuffing:** 360M views (Apr 2022) → about 1.9B across about 103K posts. It spawned a $2.2M/yr binder business (Baddies & Budgets).
- **100 Envelope Challenge:** 150M+ views. Its total is the Gauss sum 1+…+100 = **$5,050**; the 52-week version is $1,378 (our check).
- **Girl math / boy math (2023):** individual posts reached 629K and about 2M likes in weeks; #boymath is about 290M.
- **Loud budgeting (2024):** about 10M hashtag views.
- **Underconsumption core:** searches peaked Aug 2024.
- **No Buy 2025:** +40% YoY searches.
- **Doom spending:** 41% of Gen Z admit impulsive purchases to ease anxiety.
- **"Always worth the money" (summer 2026)** and **moneymaxxing (2026).**
- The vocabulary turns over about once a year. *(web-trends §1)*

### 5.3 What did not travel on Shorts
Whiteboard and macro news explainers (WhiteBoard Finance, at most 19.7K). Concept-name titles (Rule of 72 at 29,860; "latte factor" with zero finance results). Pure cash-stuffing process videos on YouTube (The Budget Mom's "Stuffing September Cash Envelopes" got 18,157 views; the best cash-stuffing Short was 146,449). Institutional compound-interest explainers (15K to 23K). "If you invested $X in [stock]" what-ifs (none above 300K in the YouTube outlier index). *(yt-big-number P10; creator-catalogs §E)*

---

## 6. The whitespace Back of the Envelope can own

**"Show the envelope."** The formats proven at scale (unit swaps, rate clocks, dilemmas, ladders, tallies, estimates) almost never show their arithmetic. When they do, it is often wrong. Examples: AJ's single unexplained tax rates, the Kel King video's 48-week "year" with no costs, sog_geovanie's AD error, jamaal's unsourced $8 RPM, Matka's "99% the bookie wins", and a guide's 86,400x per-second error. The channel can own **one recognisable ritual**: a 1 to 3 line calculation handwritten on an envelope, with labelled assumptions, a low–high range where inputs are uncertain, and a postmark-style source stamp.

Five specific gaps the evidence supports:
1. **Implicit Fermi estimation has no finance brand.** "How much would it cost to…" reaches millions (Monica 390x on 4.5K subs; GTA 5 4.74M; NFL 2.03M), but the channels doing it are fandom, sports, gaming and real-estate channels with no recurring method. Humphrey Yang's "Estimating Sales" proved demand (6.8M, 10.6M), and no 2024 to 2026 episodes appear in his top 50.
2. **The literal term "napkin math" or "envelope math" is unowned.** The only finance "napkin math" Short found had 31,266 views. No Fermi or market-sizing Short broke out. Lead with the subject and use the method as the signature.
3. **Nobody does the math behind cash-stuffing.** About 1.9B #cashstuffing views, and nobody computes envelope ratios, time-to-fill, the Gauss sum behind the 100-envelope challenge, or inflation's drag on cash. On YouTube the category's ceiling is 146K, so the math layer is what would make it work there.
4. **Polished scale visualization is scarce** on Shorts ("how much is a billion" at 3.6x; few true visualizations ranked). The brand can add stack heights, weights and envelope towers, all physically accurate.
5. **Accuracy is a competitive advantage in a low-trust category.** About 70% of graded finance TikToks scored C or lower. A channel that shows its work, gives ranges, corrects viral claims and makes its own rounding a deliberate "math police" joke has a promise nobody else makes.

**The name collision is minor.** A business podcast called "Back of the Envelope" exists ([Apple Podcasts](https://podcasts.apple.com/us/podcast/back-of-the-envelope/id1517652287)). No short-form "Envelope Math" brand surfaced. Handles and trademarks still need checking.

---

## 7. Open questions to verify before scripting
- What is actually on screen in HD Guy's "Cost in Units" videos (vidIQ tags hint at military hardware; unconfirmed)?
- Instagram Trial Reels eligibility for a new professional account (200 vs 1,000 followers).
- Whether YouTube's Oct 2026 originality update treats AI voice-over on *original* animation differently from narration over borrowed clips.
- Any real-world figure used in a video (tax rates, CPI, RPMs, unit prices, net worths) must be re-sourced and dated at script time. None of the creators' figures quoted above were independently verified unless marked "(our check)".

## Source files
`research/raw/`: yt-big-number-math.md · yt-personal-money-math.md · yt-puzzles-estimation-business.md · ig-tiktok-outliers.md · creator-catalogs.md · web-creator-case-studies.md · web-trends-and-whitespace.md · web-platform-mechanics.md
`research/watch/`: group1-video1…4 · group2-video1…4 · group3-video1…4 · group4-video1…4 · group5-video1…4 · group6-video1…2
