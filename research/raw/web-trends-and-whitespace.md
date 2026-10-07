# Viral finance short-form trends (2022–2026) and the whitespace for "Back of the Envelope"

Research memo for the **Back of the Envelope / Envelope Math** channel (YouTube Shorts, Instagram Reels, TikTok).
Date: 2026-10-07. Scope: research only. No scripts or teasers are written here.

Sister memos in the same folder go deeper on topics that this file only touches:
- `web-creator-case-studies.md`: individual creators such as Mark Tilbury, Humphrey Yang and Vivian Tu.
- `web-platform-mechanics.md`: ranking signals, how views are counted, policies.
- `yt-puzzles-estimation-business.md`: the money-puzzle, dilemma and business-model Shorts clusters.
- `ig-tiktok-outliers.md`: Instagram and TikTok outlier data.

This file covers two things: **(1) the named trends, memes and formats** in finance short-form video, and **(2) the whitespace for napkin math and Fermi estimation**.

---

## 0. Method, provenance and caveats (read first)

| Tool | Calls | Notes |
|---|---|---|
| vidIQ `vidiq_outliers` (`contentType: "short"`, `publishedWithin: "allTime"`, sorted by `viewCount`) | **6 of 6** | Keywords: "napkin math"; "how much money estimate fermi math"; "compound interest" (all title terms required); "cash stuffing envelopes"; "billion dollars visualized"; "how much would it cost to" (all title terms required). Figures are as of 2026-10-07. Publish dates were converted from vidIQ UNIX timestamps (UTC). |
| WebSearch | about 45 | The shared session search budget ran out at the end. The last two queries did not run: FermiLab (Japan) content, and xkcd *What If?* YouTube stats. Those leads are listed as unverified in §6. |
| WebFetch | 0 successful | The egress proxy blocked direct fetches of cnbc.com, wikipedia.org, knowyourmeme.com, philadelphiafed.org, canstar.com.au and youtube.com. |

**Provenance rule.** Figures marked *(vidIQ)* come straight from vidIQ. All other numbers come from the linked article, read through search-engine extracts, because direct fetches were blocked. Treat them as **"reported by [source]"**. I did not invent any number. Where a figure is unknown, the text says so.

**Caveats that change how to read the numbers:**
- **Hashtag view counts depend on the date.** #cashstuffing is quoted anywhere from about 360M to 1.9B depending on when it was measured (see §1.1). The ranges below are kept as they were reported.
- **YouTube Shorts views were inflated by a counting change.** Since 2025-03-31, a Shorts view counts as soon as the video starts or replays, with no minimum watch time. YouTube now splits "Views" from "Engaged views" ([PPC Land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/), [RouteNote](https://routenote.com/blog/how-are-views-counted-shorts-tiktok-reels/)). View counts after March 2025 are therefore not comparable with older ones.
- **vidIQ's Shorts outlier index is weighted toward recent videos.** Even with "allTime" set, almost every hit was published between Oct 2025 and Oct 2026. The sister memo `yt-puzzles-estimation-business.md` saw the same thing. Older evergreen hits such as Humphrey Yang's 2020 rice video only show up through web sources.
- **What "breakout" means.** vidIQ's breakoutScore is how many times more views a video got than that channel's typical video. A high score on a tiny channel is the strongest sign that the *format* is doing the work, not the audience.

---

## 1. Trend dossier: what has gone viral in finance short-form, and why

### 1.1 #cashstuffing / cash-envelope budgeting (the "envelope" in our name)

**What it is.** You withdraw your budget in cash and "stuff" it into labelled envelopes or binder pockets, one per category. It is the old **envelope system** re-skinned for TikTok ([Dexerto](https://www.dexerto.com/entertainment/what-is-tiktoks-viral-cash-stuffing-trend-1909596), [Yahoo Finance](https://finance.yahoo.com/news/tiktok-cash-stuffing-strategy-help-140641874.html)).

**Scale over time (as reported):**
- More than **360M views** under #cashstuffing in April 2022 ([CNBC, 2022-04-20](https://www.cnbc.com/2022/04/20/how-cash-stuffing-is-helping-tiktok-creators-beat-inflation-pay-debt.html)).
- About **820M** and about **376M** in other, undated reports ([search extracts of Marketplace / Yahoo coverage](https://origin-www.marketplace.org/story/2024/12/30/cash-stuffing-tiktok-budgeting-money-youtube-savings-personal-finance)).
- **More than 1.1B** by May 2024, and "surged past a billion views by 2023" ([Blackcat app article](https://blackcat.app/community/article/cash-stuffing-in-2026-how-tiktoks-favourite-budget-method-looks-on-a-phone), [Benzinga](https://www.benzinga.com/money/cash-stuffing)).
- **About 1.9B views across about 103,000 posts** in the latest figure found ([Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/)).

**Creators and money:**
- **Jasmine Taylor (@baddiesandbudgets).** She had about $60K of student debt plus $9K of medical and card debt. She cash-stuffed her way out and went viral. Her business, Baddies & Budgets, sells courses, binders and accessories and **brought in $2.2M in 2024** ([CNBC via NBC LA, 2025-05-15](https://www.nbclosangeles.com/news/business/money-report/tiktok-star-with-2-2-million-a-year-cash-stuffing-business-one-of-the-biggest-mistakes-i-see-people-make-with-money/3701802), [Black Enterprise](https://www.blackenterprise.com/millionaire-tiktok-star-shares-her-insight-to-financial-success-with-baddies-and-budgets)).
- **@stephtalksmoney:** about 322K followers. **@allthingsplanned_ (Jenika Nicole):** about 86K on TikTok and 20K on YouTube. **@budgetwithmie:** viral videos above 1M views, plus an Etsy binder shop. **Lily Cohen (LilyBudgets, YouTube):** above 1M views of pink-binder paycheck splits ([Yahoo Finance, "Meet the TikTok money experts who popularized cash stuffing"](https://finance.yahoo.com/news/meet-tiktok-money-experts-popularized-200022411.html)).
- **Yasmine Camilla:** cleared her debt in five months. Also in the 2022 coverage: **Shelise**, a 7-year cash stuffer, and **Lisa (BeeBudgeting)** ([CNBC 2022](https://www.cnbc.com/2022/04/20/how-cash-stuffing-is-helping-tiktok-creators-beat-inflation-pay-debt.html)).

**Why it spreads:**
1. **ASMR and aesthetics.** "Manicured fingers meticulously place cash in transparent envelopes" ([SoFi](https://www.sofi.com/learn/content/cash-stuffing/)). The envelopes are decorated with stickers and rhinestones ([Marketplace extract](https://origin-www.marketplace.org/story/2024/12/30/cash-stuffing-tiktok-budgeting-money-youtube-savings-personal-finance)).
2. **The "pain of paying".** Physical cash makes spending feel real. "The card didn't feel like real money" ([Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/), [Fortune 2023](https://www.fortune.com/2023/05/12/what-is-cash-stuffing-tiktok-personal-finance-trend-gen-z)).
3. **Debt-payoff arcs** that give viewers a reason to come back for the next episode (CNBC 2022).
4. **A merch economy.** "By 2025 the trend had spawned its own micro-economy of binder accessories" ([Blackcat](https://blackcat.app/community/article/cash-stuffing-in-2026-how-tiktoks-favourite-budget-method-looks-on-a-phone)).

**Platform gap (vidIQ).** On **YouTube Shorts**, the query "cash stuffing envelopes" mostly returned noise: Thanksgiving "stuffing" and Chinese red-envelope games. The best true cash-stuffing Short was **"Cash stuffing $30" by The Orderly Mom: 146,449 views, 7.8K subs, 130x breakout** ([link](https://www.youtube.com/shorts/d_-p-WObgGA), 2025-10-09). Cash stuffing is a **TikTok-native, ASMR-led** trend. On YouTube Shorts it is small, and nobody does the *math* layer.

### 1.2 Savings challenges are arithmetic series that went viral

- **The 100 Envelope Challenge.** Number 100 envelopes and put $1 to $100 in them over 100 days, for **$5,050** in total ([Bustle](https://www.bustle.com/life/hundred-envelope-challenge-tiktok), [Chime](https://www.chime.com/blog/100-envelope-challenge-how-to-save-5000-in-3-months/?bapage=1), [First Merchants](https://firstmerchants.com/resources/learn/blogs/blog-detail/resource-library/2024/12/05/what-is-the-100-envelope-challenge--and-can-it-be-done-digitally)). Variants spread it over 50 or 100 weeks. The sister memo cites TIME for **150M+ TikTok views** on the hashtag.
  - My check: 1 + 2 + … + 100 = **5,050**, the Gauss sum.
  - The 52-week version is 1 + … + 52 = **$1,378**.
  - These viral challenges are, at heart, high-school series math, and nobody frames them that way.
- Cash stuffing, the 100 envelope challenge and loud budgeting are routinely grouped as "the three TikTok money trends" ([Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/), [CBS News](https://www.cbsnews.com/news/tiktok-saving-money-tips-loud-budgeting-100-envelope-challenge/)).

### 1.3 "Girl math" and "boy math" (2023): the funny-math meme

**Origin.** The term started on a New Zealand radio podcast, *Fletch, Vaughan & Hayley*, which called a caller's $400 hair extensions "basically free" ([Hello! India](https://in.hellomagazine.com/lifestyle/20230921303445/girl-math-trend-explained/), [Fortune 2023-08-19](https://www.fortune.com/2023/08/19/girl-math-tiktok-money-trend-gen-z-millennial-financial-stress-women-consumer-spending)).

**TikTok spread:**
- **@samjamessssss**, 2 Aug 2023: "anything under $5 is free"; return $50 and spend $100 "is only spending $50". About **629K likes in six weeks** ([Know Your Meme](https://knowyourmeme.com/memes/boy-math-girl-math)), and a reported **3.2M views** ([Eklipse](https://blog.eklipse.gg/news/viral-girl-math-trend-on-tiktok.html)).
- **@casandra.mazzucco**, 7 Sept 2023: **about 2M likes in three weeks** ([Know Your Meme](https://knowyourmeme.com/memes/boy-math-girl-math)).
- An early count put #girlmath at about 37.8M views ([Eklipse](https://blog.eklipse.gg/news/viral-girl-math-trend-on-tiktok.html)). That figure is from early in the trend, and I found no later total.

**"Boy math"** started on Twitter/X on 16 Aug 2023 (@BowTieBernard, bulk-buying jokes) and later turned into sharper social commentary. The hashtag is reported at **about 290M views** ([Know Your Meme](https://knowyourmeme.com/memes/boy-math-girl-math), [SheThePeople](https://www.shethepeople.tv/us/why-is-boy-math-taking-over-girl-math-1423474)).

**Why it spread:**
- It names a *familiar* cognitive bias. Economists linked it to the "cashless effect" and the pain of paying ([Benzinga](https://feeds2.benzinga.com/news/23/08/33823295/tiktok-viral-girl-math-redefining-or-rationalizing-spending-habits)).
- It invites endless "my girl math is…" replies.
- The gender framing sparks debate ([KidsMoney](https://www.kidsmoney.org/?p=4932)).

**Fit for us.** The real arithmetic is cost-per-use: a $330 dress worn 3 times is "$110" ([Hello! India](https://in.hellomagazine.com/lifestyle/20230921303445/girl-math-trend-explained/)). That is a legitimate envelope-math calculation wrapped in a joke.

### 1.4 Loud budgeting (late 2023 to 2024)

- Coined by comedian **Lukas Battle** in his "Ins and Outs for 2024" TikTok. His post was reported at **more than 1.5M views**, and **#loudbudgeting at nearly 10M** in early 2024 ([Good Morning America](https://goodmorningamerica.com/living/story/loud-budgeting-viral-trend-save-money-106564692), [AfroTech](https://afrotech.com/loud-budgeting/), [WTXL](https://www.wtxl.com/what-is-loud-budgeting-the-newest-gen-z-tiktok-trend)).
- The core line: "It's not 'I don't have enough,' it's 'I don't want to spend'". It was framed as the answer to 2023's "quiet luxury".
- **Pattern.** It is a *reframing slogan* plus a calendar moment (New Year "ins and outs"). Gen Z rebrands money management with new vocabulary ([YPulse](https://www.ypulse.com/newsfeed/2024/02/02/gen-z-has-coined-terms-like-loud-budgeting-and-doom-spending-rebranding-money-management/)).

### 1.5 The anti-consumption wave and its successors (2024 to 2026)

| Trend | When | Evidence | Source |
|---|---|---|---|
| **Underconsumption core** | Summer 2024 | Anti-haul content. #underconsumption had about 13.5K posts. Global Google searches peaked in **Aug 2024**. Linked to cost of living and influencer fatigue | [Wikipedia](https://en.wikipedia.org/wiki/Underconsumption_core), [LBB](https://lbbonline.com/news/tiktok-trends-underconsumption-core), [BU](https://insights.bu.edu/whats-underconsumption-core-the-new-money-trend-taking-over-tiktok/?amp=1) |
| **No Buy 2025** (#nobuy) | Jan 2025 onward | Creators post "buy / no-buy" lists. Google searches for "no-buy challenge" were **up 40% year on year** | [SUCCESS](https://www.success.com/no-buy-2025-tiktok-trend), [SAN](https://san.com/cc/tiktoks-no-buy-2025-gains-momentum-amid-social-media-consumerism/) |
| **Doom spending / soft saving / financial nihilism** | 2024 to 2025 | **41%** of Gen Z admit impulsive purchases to ease anxiety. **43%** say TikTok trends influence them | [MarketBeat, 2025-06-16](https://www.marketbeat.com/articles/what-is-doom-spending-the-trend-takes-a-toll-on-personal-finances--and-members-of-this-generation-are-most-at-risk-2025-06-16), [Material+](https://www.materialplus.io/perspectives/decoding-the-new-gen-z-financial-lexicon-from-doom-spending-to-money-dysmorphia) |
| **"Always worth the money"** | Summer 2026 | Lists of items people swear by, from skin care to airline seat upgrades, with "hundreds of thousands of views and likes". Planners weighed in | [CNBC, 2026-08-04](https://www.cnbc.com/2026/08/04/worth-the-money-financial-planners.html) |
| **"Moneymaxxing"** | 2026 | Optimizing every dollar: high-yield savings, cashback stacking, bill negotiation, points. **Only the term is confirmed** (headline and summary); no view counts found | [KTVZ / Stacker, 2026-09-10](https://ktvz.com/stacker-personal-finance-investing/2026/09/10/girl-math-loud-budgeting-moneymaxxing-were-these-trends-worth-trying/) |

**Observation.** The vocabulary turns over about once a year:
- 2023: girl math
- 2024: loud budgeting, then underconsumption core
- 2025: no-buy year, doom spending
- 2026: worth-the-money, moneymaxxing

Each new term is a fresh hook that someone can *put a number on*: "your no-buy year, in dollars".

### 1.6 "What I spend in a week" and money diaries

- The format is usually young women in big cities itemizing a week of spending. **Lexie Lombard's "What I Spend in a Week in NYC as a 23 year old" ($555.10)** is credited as the first ([Jezebel](https://jezebel.com/the-engrossing-illusion-of-what-i-spend-in-a-week-youtu-1840171800), [PAPER](https://www.papermag.com/what-i-spend-youtube-influencer)).
- **Clark Peoples**, a Columbia student, went viral on TikTok with a **$16K week in NYC**. She reportedly **made $200K within five months** ([Blavity](https://blavity.com/columbia-university-student-spent-nearly-16k-one-week), [The Root](https://theroot.com/how-does-one-ny-college-student-spend-16k-in-one-week-1849827603)).
- **Why it spreads:** voyeurism plus class debate ("forcing conversations about class online", PAPER). The **total at the end** is the payoff.

### 1.7 Street interviews about money

- **Daniel Mac, "What do you do for a living?"** He started in Sept 2020 by asking luxury-car owners. A **Lamborghini** driver video made him go viral overnight. He has **14.2M TikTok followers** and **2.7B YouTube views**, and has interviewed celebrities from Biden to Gordon Ramsay ([Wikipedia](https://en.wikipedia.org/wiki/Daniel_Mac), [DMARGE](https://www.dmarge.com/who-is-daniel-mac), [Fox News](https://www.foxnews.com/media/daniel-mac-tiktok-famous-asking-simple-question-he-thinks-can-happen-anyone.amp)). The one-question format with an aspirational object at its center is now evergreen.
- **Salary Transparent Street (Hannah Williams).** Started in April 2022 after she found out she was underpaid. It reached **more than 1B views in two years** and **nearly 3M followers** across TikTok, Instagram and YouTube, with **about $1M in revenue** in one year ([Trade Secrets / beehiiv](https://trade-secrets.beehiiv.com/p/salary-transparency-street), [Creator Spotlight](https://creator-spotlight.beehiiv.com/p/hannah-williams-salary-transparent-street), [Fortune 2022](https://fortune.com/2022/08/04/hannah-williams-salary-transparency-street-tiktok-videos-asking-strangers-how-much-they-earn)).
- **"Double it and give it to the next person."** **@johnrusanov** started a street series on 7 May 2022: take $20 now, or pass it on so the seventh person gets the money. It drew about **209.6K plays and 29.6K likes in four months**, then became a comment-section meme ([Know Your Meme](https://knowyourmeme.com/memes/double-it-and-give-it-to-the-next-person), [Fortune 2022](https://www.fortune.com/2022/08/12/tiktok-free-money-strangers-nyc-experiment)). At its core it is a **geometric-growth** dilemma.

### 1.8 Money-etiquette debates (bill splitting)

- **@viccgotti's $4,600 birthday-dinner bill.** He refused to split the check for liquor he did not drink. The captioned video passed **13.5M views**, and a longer cut drew **3.1M** the same day. He had paid **$24.58** for his own meal ([Yahoo / Business Insider](https://www.yahoo.com/news/mega-viral-argument-over-4-140423102.html), [Deseret](https://www.deseret.com/24071104/birthday-etiquette-who-should-pay), [Blavity: "staged?" debate](https://blavity.com/tiktok-viral-argument-spiltting-bill-staged)).
- **Pattern.** Simple group arithmetic plus a moral choice produces a flood of comments. Accusations that it was staged only added views.

### 1.9 Would-you-rather and exponential dilemmas

- **"$1M now, or a penny doubled every day for 30 days?"** The penny is worth **$5,368,709.12** on day 30. It is still only about $5,243 on day 20, which is the twist ([MoneyLion](https://moneylion.com/trending/money/would-you-rather-have-a-penny-doubled-every-day-for-a-month-or-1-million), [MoneyPantry](https://moneypantry.com/penny-doubled-for-30-days/); I checked: 0.01 × 2^29 = 5,368,709.12). Snapchat lists "daily doubling" as a topic with "millions of trending videos" ([Snapchat](https://www.snapchat.com/topic/daily-doubling)).
- The sister memo `yt-puzzles-estimation-business.md` measured the dilemma cluster on YouTube Shorts with vidIQ: 735x, 422x and 97.8x breakouts.

### 1.10 TV or movie clip with a money caption

- **Seinfeld, "The Package" (1996).** Kramer: "They just write it off." Jerry: "You don't even know what a write-off is." It became the go-to clip for the write-off myth: a $100 write-off at 35% costs you $65, not $0 ([Wood LLP / Forbes column](https://www.woodllp.com/Publications/Articles/pdf/Seinfeld_Tax.pdf)).
- **Futurama, "A Fishful of Dollars" (1999).** Fry's **$0.93 at 2.25% for 1,000 years becomes $4.3B**, and the math is correct ([Abakcus](https://abakcus.com/video/futurama-93-cents-turned-43-billion-dollars), [VICE](https://vice.com/en/article/futurama-taught-me-everything-i-know-about-compound-interest)). My check: 0.93 × 1.0225^1000 = **$4,283,508,449.71**.
- **vidIQ evidence that the format breaks out on tiny channels:**
  - **Talk Spot, "$50 compound interest 53 years later - From #seinfeldshow #seinfeld":** **1,063,876 views, 1,810 subs, 246x** ([link](https://www.youtube.com/shorts/DUdIa3N8fb0), 2025-11-26).
  - **PikaFloats, "Futurama Really Calculated This #shorts #roblox":** **2,742,217 views, 20.7K subs, 14.2x**, with a Roblox tag that suggests split-screen gameplay ([link](https://www.youtube.com/shorts/dmslQ9pDddA), 2026-09-02).
  - **OMG Economy, "#Futurama Explained Compound Interest Perfectly":** 28,851 views on a **169-sub** channel, **1,442x** ([link](https://www.youtube.com/shorts/hzf9ZLjtMko)).
  - **makon, "How One Sentence Added $1 Billion To A Deal 👇"** (a *Succession* clip): 70,089 views, 485 subs, **107.5x** ([link](https://www.youtube.com/shorts/Bb8O11xfKpI), 2026-10-06).
- **Policy note.** YouTube says legitimate reaction and clip-based videos are not targeted by the July 2025 inauthentic-content rename ([Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660)). Copyright claims on raw clips are a separate risk that I did not research here.

### 1.11 Animated skits and stick figures

- **Mr Planktin, "Compound interest explained 😂 #shorts":** **9,059,331 views, 870K subs, 153x**, 61 s ([link](https://www.youtube.com/shorts/rrpn3zo2Slo), 2026-06-10). It is a saver-vs-spender kid story with an engagement-bait interlude. The transcript is in the sister memo `creator-catalogs.md`.
- **Filomation, "Someone's never heard of compound interest":** **5,662,642 views from a 1,750-sub channel, 388x, 6 seconds** ([link](https://www.youtube.com/shorts/klM8NXv-MFg), 2026-08-08). One joke, no explanation. It is the strongest evidence in this set that *the phrase "compound interest" plus a joke* is enough.
- **Compare institutional explainers on the same keyword** (vidIQ): Charles Schwab at 23,368 views (554K subs), Acorns at 15,546 (33.8K subs). The Stanford GSB Lusardi lesson is the exception at 1.12M views (251x).

### 1.12 "How much would it cost to…?": pop-culture costing (Fermi estimation in disguise)

vidIQ query "how much would it cost to", all title terms required, Shorts:

| Video | Channel (subs) | Views | Breakout | Date |
|---|---|---|---|---|
| [How Much Would It Cost To Beat GTA 5](https://www.youtube.com/shorts/utrM0rchbow) | LIL PIZZA (672K) | 4,738,022 | 7.2x | 2026-05-03 |
| [How much would it cost to rent Monica's apartment from Friends?](https://www.youtube.com/shorts/m-caEiD0MlQ) | DanielChunNY (**4,510**) | **3,735,961** | **390x** | 2025-12-08 |
| [How much would it cost to build Bucky's arm?](https://www.youtube.com/shorts/_NA0dK-IHOg) | CineDrama001 (101K) | 3,173,424 | 4.0x | 2026-08-01 |
| [How Much Would It Cost To Buy the NFL?](https://www.youtube.com/shorts/s3fyV8fLqt8) | EspacioNX (821K) | 2,033,867 | 8.0x | 2025-10-21 |
| [How Much Would It Cost To Buy EVERY Sidekick?](https://www.youtube.com/shorts/XsgNUrok0m4) | Clarky (16.4K) | 1,258,346 | 4.8x | — |
| [How Much Would It Cost To Buy All Of Soccer?](https://www.youtube.com/shorts/ivZfik8i-9c) | EspacioNX (821K) | 1,029,790 | 18.6x | 2025-10-18 |
| [How much would it cost to wear exactly what a MotoGP rider wears… for just one race?](https://www.youtube.com/shorts/e2AVdxmesXQ) | Apex Moto (15.7K) | 898,739 | 15.1x | — |

- The Monica analysis comes from NYC broker **Daniel Chun**, who estimates **$8,000 to $10,000 a month** today for the roughly 1,125 to 1,500 sq ft West Village unit ([Yahoo Finance](https://finance.yahoo.com/news/monicas-friends-apartment-rent-now-183103159.html)).
- Related outliers from the "how much money estimate fermi math" query:
  - "[How Much Money Will a Tesla Cybercab Actually Make Per Year?](https://www.youtube.com/shorts/Xp6ryufGrAA)" (The Real Oshow, 52.1K subs): **556,210 views, 123x**, 2026-09-10.
  - "[President Trump's $5,000 dividend promise would cost $1.2 trillion](https://www.youtube.com/shorts/ytf3d-2TpEg)" (KARE 11): 121,399 views, **47.8x**.
  - "[The Math That Exposes Undervalued AI Stocks](https://www.youtube.com/shorts/49gpONz6VaE)" (D-Marq-AnalyticS): 74,636 views, **151.9x**.
- **Key observation.** This is the **closest existing format to "back of the envelope" math**, and it is owned by **gaming, sports, TV-fandom and real-estate** channels, not finance channels. The titles promise a number and the subject does the borrowing of an audience. I did not watch whether they show their assumptions; vidIQ gives metadata only.

### 1.13 Money visualization and scale

- **Humphrey Yang's rice video (Feb/Mar 2020).** One grain = $100,000. He counted out $1B (10,000 grains) and showed Bezos at about **58 lbs of rice ≈ $122B**. Two 60-second TikToks drew a **combined 2.2M views**, then went viral again on Twitter ([Business Today](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html), [BuzzFeed News](https://www.buzzfeednews.com/article/tanyachen/tiktok-jeff-bezos-wealth-rice-grains-video), [AOL](https://www.aol.com/article/news/2020/03/02/jeff-bezos-tiktok-billionaire-rice-counting-wealthy-humphrey-yang/23938703)). Yang later built a 1M+ YouTube audience ([Fortune Creator 25](https://fortune.com/ranking/creator-25/2021/humphrey-yang/)).
- **Web ancestors:**
  - **"Wealth, shown to scale"** (Matt Korostoff): $1,000 per pixel, scrolled horizontally ([Inverse](https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us)).
  - **"Spend Bill Gates' Money"**: $100B to spend across 45 items, from a $2 cheeseburger to a $2.1B NBA team ([MEL](https://melmagazine.com/en-us/story/spend-bill-gates-money-game-wealth)).
- **vidIQ, "billion dollars visualized" (Shorts):** few true visualizations rank. The finance-relevant ones are "[How much is a billion dollars?](https://www.youtube.com/shorts/GBf_DfU_dJQ)" (Fahad Riaz, 1.52M subs, 974,007 views, only 3.6x) and "[What 1 Billion Dollars Look Like 💸](https://www.youtube.com/shorts/p40V6q1Gz9g)" (28,985 views). Most hits were memes, gaming or podcast clips. The best of those was "[What Managing a Billion Dollars' Worth of Watches Looks Like](https://www.youtube.com/shorts/GrCr_g0M_JU)" (EconomicClipsNow, 7.5K subs, 1,176,445 views, 76.5x). **Polished scale visualizations are scarce on Shorts.**

### 1.14 Unit conversion ("price in units of ___")

- **HD Guy, "Cost in Units of Monster Energy": 4,333,679 views, 188K subs, 28.9x**, 29 s ([link](https://www.youtube.com/shorts/jlKUWdrrqEI), 2026-09-18). From the title, it restates prices in cans of a familiar product. I have not watched it. It is the same mechanic as Yang's rice grains, but as a repeatable series.

### 1.15 Faceless stock footage plus AI voice

- **The economics pitch.** Vendor and tool blogs claim AI cut per-video cost from about 8 hours and $200 to under 30 minutes and under $3. They quote **finance RPMs of $12 to $20**, which are mostly long-form figures, and say faceless channels earn the same RPM as face-cam ones ([Vozo](https://www.vozo.ai/blogs/youtube/profitable-faceless-youtube-niches), [Vantaige](https://vantaige.io/blog/faceless-youtube-channel-ai-5000-month-2026)). These are low-confidence marketing figures with no named case study.
- **The risk.** On **15 July 2025**, YouTube renamed its "repetitious content" policy to **"inauthentic content"**. It targets mass-produced, templated videos with synthetic voices, "especially in Shorts". AI is allowed when it supports original, human-directed work ([Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660), [Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/), [AlternativeTo](https://alternativeto.net/news/2025/7/youtube-updates-its-policy-to-demonetize-inauthentic-mass-produced-ai-generated-content)). **A faceless channel needs a recognizable house voice and method, not a template.**

### 1.16 The finfluencer trust problem (context for positioning)

- A **2023 Bankrate** survey found **30%** of Americans use social media for financial advice. It was the third most popular source, after friends and family (47%) and professionals (35%) ([Philadelphia Fed](https://www.philadelphiafed.org/consumer-finance/how-americans-use-social-media-for-financial-advice), via search extract). **#FinTok** is reported at about **4.7B views** and #personalfinance at **more than 5B** ([The National](https://thenationalnews.com/business/money/what-is-fintok-and-why-is-it-going-viral-1.1162271), via search extract; the exact attribution is uncertain).
- **DayTrading.com's "Finance TikTok Report Card"** graded 10 high-view finance TikToks from Sept 2025:
  - **About 70% got C or lower overall.**
  - **60% got D or F on oversimplification.**
  - **30% got F on risk disclosure.**
  - A repeat review found 80% mediocre.
  - Small sample: n = 10 ([DayTrading.com](https://www.daytrading.com/tiktok/report-card), [The Daily Upside](https://www.thedailyupside.com/advisor/financial-planning/most-finfluential-tiktok-posts-were-already-misleading-now-the-trend-is-worsening/)).
- **Errors in published money math.** A finance guide says MrBeast's $50 to $100M a year in revenue works out to "$137 to $274 per second". In the same piece it says $1M a day is "$11.57 per second" ([Finbold](https://finbold.com/guide/how-much-money-does-mrbeast-make-a-second/)). **My check:** $50M a year is **$1.59/s** and $100M a year is **$3.17/s**. The "$137 to $274" figures are **per-day amounts in thousands** ($136,986 and $273,973 a day) mislabelled as per second, an error of about 86,400 times. Even Fortune's reported $700M a year is only about **$22/s**. Wrong money-per-second claims circulate in the wild, and a channel that shows its work can **fact-check them on camera**.

---

## 2. vidIQ quantification (6 calls)

| # | Keyword (Shorts, allTime, by views) | What came back | Signal for us |
|---|---|---|---|
| 1 | "napkin math" | Napkin *tricks and folding*. Top: "Amazing Napkin Trick!" 50.7M; "Napkin Trick!" 43.2M. **Only finance hit: "[Napkin math on XRP price.](https://www.youtube.com/shorts/vjV-cFqywrk)"** (Jake Claver, 210K subs) at **31,266 views, 7.1x** | **The literal term "napkin math" is unowned on Shorts.** No one has built a finance format under it |
| 2 | "how much money estimate fermi math" | No Fermi-style finance Shorts. Adjacent hits: Monster-units (4.33M), Futurama (2.74M), Cybercab revenue (556K, 123x), $5,000 dividend math (47.8x), AI-stock "math" (151.9x) | Estimation framing exists only *implicitly*, inside cost and revenue titles |
| 3 | "compound interest" (all terms) | Mr Planktin 9.06M (153x); Filomation 5.66M (388x); Mr Planktin follow-up 1.71M; Stanford GSB 1.12M (251x); Talk Spot / Seinfeld 1.06M (246x); then a long tail of brand explainers under 25K | The concept is proven, but **jokes, skits and clips win while institutional explainers lose** |
| 4 | "cash stuffing envelopes" | Mostly noise. Best true cash-stuffing Short: The Orderly Mom, 146K (130x) | Cash stuffing is weak on YT Shorts; the **math layer is absent** |
| 5 | "billion dollars visualized" | Memes, gaming and podcast clips. A real "how much is a billion" Short got 974K on a 1.52M-sub channel (3.6x) | Quality **scale visualization is scarce** |
| 6 | "how much would it cost to" (all terms) | 7 Shorts above 0.89M; DanielChunNY Monica 3.74M at **390x on 4.5K subs** | **Pop-culture costing is the strongest format proxy for envelope math** |

---

## 3. Whitespace: who does napkin math, Fermi or back-of-the-envelope content now

### 3.1 The landscape

| Player | What they do | Performance evidence | Gap relative to us |
|---|---|---|---|
| **Consulting / case-interview market sizing** (e.g., **Colin Rocker @careercolin**, "[How Many Golf Balls Fit in a Boeing 747?](https://www.tiktok.com/@careercolin/video/7081675547595803950)"; [Management Consulted](https://managementconsulted.com/market-sizing/), [StrategyCase](https://strategycase.com/market-sizing-case-interviews/)) | Teaches the market-sizing method used in every MBB and Big 4 interview ("pizzas sold in the US per year") | Views on Colin's video **unknown**. No viral market-sizing short surfaced in vidIQ or web search. Google even retired its golf-ball brainteaser ([techinterview.org](https://www.techinterview.org/post/3233474780/golf-balls-school-bus-google-fermi-estimation/)) | Dry, aimed at job-seekers, and **not about the viewer's own money or pop culture** |
| **xkcd *What If?*** (Randall Munroe) | Absurd hypotheticals answered with Fermi estimation ([AMS blog](https://blogs.ams.org/blogonmathblogs/2014/05/30/fermi-estimation-xkcd-what-if/)) | Bestselling books; a sequel, *What If? 2*, announced 2022 ([CS Monitor](https://m.csmonitor.com/Books/chapter-and-verse/2014/1218/What-If-continues-to-draw-critical-praise-stays-strong-on-sales-charts), [Slashdot](https://news.slashdot.org/story/22/01/31/1731251/xkcds-randall-munroe-announces-what-if-2)). Short-form stats **not verified** (search budget ran out) | Physics, not money. **No money-focused "What If" exists** |
| ***Guesstimation*** (Weinstein & Adam, Princeton UP) | A book on "solving the world's problems on the back of a cocktail napkin" ([Princeton UP](https://press.princeton.edu/books/paperback/9780691129495/guesstimation), [Physics Today](https://physicstoday.aip.org/reviews/guesstimation-solving-the-worlds-problems-on-the-back-of-a-cocktail-napkin)) | Featured in National Geographic ([ODU](https://www.odu.edu/news/news-archive/2009/03/WeinsteinsGuesstimatingFeat_15188)). No video presence found | The method is proven in print; **nobody has turned it into a Shorts format** |
| **Napkin Finance** (Tina Hay) | HBS-born illustrated "money simplified" explainers; WSJ-bestselling book ([Kara Goldin podcast](https://karagoldin.com/podcasts/tina-hay/), [NGPF](https://dev4.ngpf.org/blog/podcasts/ngpf-podcast-tina-hay-founderceo-of-napkin-finance/)) | Short-form view data not found | The **closest brand neighbor** ("napkin"), but its content is concept *definitions*, not estimation |
| **Simon Eskildsen, "napkin math"** | First-principles estimation for software systems ([Changelog](https://changelog.com/person/sirupsen)) | Niche engineering audience | Not consumer or money content |
| **Sam Denby: Wendover (≈4.9M) / Half as Interesting (≈2.9M)** | Logistics and economics explainers with research-grade numbers ([CreatorDB HAI](https://creatordb.app/creatorstats/halfasinteresting/), [CreatorDB Wendover](https://creatordb.app/creatorstats/wendoverproductions/), [Wikipedia](https://en.wikipedia.org/wiki/Sam_Denby)) | Large long-form channels | Long-form and topic-led; **does not walk through the calculation as the hook** |
| **"How much would it cost" channels** (DanielChunNY, EspacioNX, LIL PIZZA, Apex Moto) | Put a price tag on a pop-culture or sports object | Up to 4.74M views; 390x on a 4.5K-sub channel (§1.12) | Each is **single-topic** (real estate, sports, a game). None is a finance-math brand with a recurring method |
| **Unit-conversion and scale creators** (HD Guy; Humphrey Yang's 2020 rice; Wealth Shown to Scale) | Restate money in tangible units | 4.33M (HD Guy); 2.2M combined (Yang) | Few do it as a recurring Shorts series with a consistent visual system |
| **"Back of the Envelope" (podcast)** | A business podcast that discusses urgent topics "using back of the envelope calculations", with economist guests ([Apple Podcasts](https://podcasts.apple.com/us/podcast/back-of-the-envelope/id1517652287)) | Unknown | **Name-collision check:** a podcast already uses the exact phrase. No short-form channel under "Back of the Envelope" or "Envelope Math" surfaced in search ([search](https://en.wikipedia.org/wiki/Envelope_system)). Handles and trademarks still need checking |

### 3.2 How estimation content performs

- **Explicit estimation** ("napkin math", "Fermi", "market sizing", "estimation interview question") has **no breakout evidence** on Shorts. My vidIQ calls 1 and 2 and the sister memo's call 7 all came back with no Fermi or estimation Shorts.
- **Implicit estimation** (titles that promise a dollar figure for a familiar object, such as "How much would it cost to…", "Cost in units of…" or "How much will a Cybercab make per year?") **breaks out strongly**, including on tiny channels: 390x, 123x, 28.9x.
- **So the audience wants the *answer*. The *method* is a bonus they will sit through if the subject is fun.** Envelope Math's edge would be to make the method itself the signature visual: numbers scribbled on an envelope, a one-line assumption, then a sanity check.

### 3.3 Specific gaps (evidence → gap)

1. **The term "napkin math" or "envelope math" for money is unowned.** The only finance "napkin math" Short found had 31K views (§2).
2. **Cash stuffing has about 1.9B TikTok views, and nobody does the math** on it: envelope-category ratios, the 100-envelope Gauss sum, inflation's effect on cash sitting in envelopes, or the opportunity cost of cash versus a high-yield account. On YouTube Shorts the top cash-stuffing Short is only 146K (§1.1).
3. **Compound interest works only when wrapped in story, jokes or clips.** Brand explainers sit under 25K (§1.11). There is no recurring *character* or *ritual* for compounding math in finance Shorts.
4. **Pop-culture costing** reaches millions but is scattered across fandom channels with no recurring finance brand or method (§1.12).
5. **Scale visualization** (billion versus million, rice and pixels) is a proven hook (2020 to 2025), but quality Shorts versions are scarce (§1.13).
6. **Trust and accuracy are an open lane.** About 70% of top finance TikToks graded C or lower, and money-per-second claims with 86,400x errors are circulating (§1.16). "Show your work, give a range" is a differentiated promise.
7. **Headline numbers move fast.** Policy promises such as the $5,000 dividend costed at $1.2T broke out at 47.8x even for a local news channel. Quick "napkin check" reactions to news numbers are thinly served.
8. **The trend vocabulary renews every year** (§1.5). Each new term can take a 30-second envelope calculation: "girl math, checked", "your no-buy year in dollars", "moneymaxxing: is the cashback worth the time?".

---

## 4. Patterns (evidence-backed)

1. **Tactile money rituals scale on TikTok.** #cashstuffing went from more than 360M views (Apr 2022) to about 1.9B across 103K posts, and created a $2.2M-a-year business ([CNBC 2022](https://www.cnbc.com/2022/04/20/how-cash-stuffing-is-helping-tiktok-creators-beat-inflation-pay-debt.html), [Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/), [NBC LA / CNBC 2025](https://www.nbclosangeles.com/news/business/money-report/tiktok-star-with-2-2-million-a-year-cash-stuffing-business-one-of-the-biggest-mistakes-i-see-people-make-with-money/3701802)). On YouTube Shorts the best cash-stuffing Short reached only 146K (vidIQ, [link](https://www.youtube.com/shorts/d_-p-WObgGA)).
2. **The biggest savings challenges are disguised arithmetic.** The 100 Envelope Challenge is the Gauss sum ($5,050) ([Bustle](https://www.bustle.com/life/hundred-envelope-challenge-tiktok)), and the penny-doubling dilemma is 2^29 cents ([MoneyLion](https://moneylion.com/trending/money/would-you-rather-have-a-penny-doubled-every-day-for-a-month-or-1-million)). Viewers share the *result* without seeing it as math.
3. **Named money "logics" spread as memes.** Girl math got 629K likes in 6 weeks and 2M likes in 3 weeks on two videos; #boymath is about 290M views ([Know Your Meme](https://knowyourmeme.com/memes/boy-math-girl-math)). Loud budgeting got 1.5M+ on the origin post and about 10M on the hashtag ([GMA](https://goodmorningamerica.com/living/story/loud-budgeting-viral-trend-save-money-106564692)). A catchy label plus "my version" replies drives the spread.
4. **Compound interest is the most reliable finance-math topic on Shorts, but only as comedy, story or clip.** Mr Planktin 9.06M (153x, [link](https://www.youtube.com/shorts/rrpn3zo2Slo)), Filomation 5.66M from 1,750 subs (388x, 6 s, [link](https://www.youtube.com/shorts/klM8NXv-MFg)), Seinfeld clip 1.06M (246x, [link](https://www.youtube.com/shorts/DUdIa3N8fb0)). Schwab and Acorns explainers got about 15K to 23K (vidIQ).
5. **Borrowed nostalgia lends credibility and reach to money lessons.** The Futurama $0.93 to $4.3B scene is mathematically correct ([Abakcus](https://abakcus.com/video/futurama-93-cents-turned-43-billion-dollars)), and Seinfeld's write-off scene is the standard tax-myth clip ([Wood LLP](https://www.woodllp.com/Publications/Articles/pdf/Seinfeld_Tax.pdf)). Tiny channels using them break out: 1,442x on 169 subs ([link](https://www.youtube.com/shorts/hzf9ZLjtMko)) and 107x on 485 subs ([link](https://www.youtube.com/shorts/Bb8O11xfKpI)).
6. **"How much would it cost to ___?" is mass-market Fermi estimation, and the format beats the channel.** Monica's apartment drew 3.74M on a 4,510-sub channel, 390x ([link](https://www.youtube.com/shorts/m-caEiD0MlQ); $8 to $10K a month per [Yahoo](https://finance.yahoo.com/news/monicas-friends-apartment-rent-now-183103159.html)). Buy the NFL drew 2.03M ([link](https://www.youtube.com/shorts/s3fyV8fLqt8)), GTA 5 4.74M ([link](https://www.youtube.com/shorts/utrM0rchbow)), and Cybercab revenue 556K at 123x ([link](https://www.youtube.com/shorts/Xp6ryufGrAA)).
7. **Restating money in tangible units makes it shareable.** Monster cans got 4.33M ([link](https://www.youtube.com/shorts/jlKUWdrrqEI)). Rice grains (1 grain = $100K, 58 lbs = $122B) got 2.2M combined on TikTok in 2020 and then crossed to Twitter ([Business Today](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html)). $1,000 per pixel went viral as a website ([Inverse](https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us)).
8. **Everyday group arithmetic plus a moral choice farms comments.** @viccgotti's $4,600 bill split drew 13.5M plus 3.1M views ([Yahoo / BI](https://www.yahoo.com/news/mega-viral-argument-over-4-140423102.html)). "Double it and give it to the next person" became a durable meme ([Know Your Meme](https://knowyourmeme.com/memes/double-it-and-give-it-to-the-next-person)).
9. **Real people's real numbers are a top engine, but they need a face or a street.** Daniel Mac has 14.2M TikTok followers from one question ([Wikipedia](https://en.wikipedia.org/wiki/Daniel_Mac)). Salary Transparent Street passed 1B views in 2 years and about $1M in revenue ([Trade Secrets](https://trade-secrets.beehiiv.com/p/salary-transparency-street)). A $16K "what I spend in a week" became $200K in 5 months ([Blavity](https://blavity.com/columbia-university-student-spent-nearly-16k-one-week)). A faceless channel can only plug into this through the *math on* such clips, for example via reaction or stitch.
10. **Money-anxiety vocabulary turns over yearly, and each term is a fresh hook:** underconsumption core (Google searches peaked Aug 2024, [Wikipedia](https://en.wikipedia.org/wiki/Underconsumption_core)), No Buy 2025 (+40% YoY searches, [SUCCESS](https://www.success.com/no-buy-2025-tiktok-trend)), doom spending (41% of Gen Z, [MarketBeat](https://www.marketbeat.com/articles/what-is-doom-spending-the-trend-takes-a-toll-on-personal-finances--and-members-of-this-generation-are-most-at-risk-2025-06-16)), "worth the money" (summer 2026, [CNBC](https://www.cnbc.com/2026/08/04/worth-the-money-financial-planners.html)), and moneymaxxing (2026, [KTVZ](https://ktvz.com/stacker-personal-finance-investing/2026/09/10/girl-math-loud-budgeting-moneymaxxing-were-these-trends-worth-trying/)).
11. **Literal "napkin math" and Fermi estimation is whitespace on Shorts.** A vidIQ "napkin math" query returns napkin tricks; the only finance hit was 31K ([link](https://www.youtube.com/shorts/vjV-cFqywrk)). No Fermi or market-sizing breakout was found. Interview-prep market sizing exists ([TikTok @careercolin](https://www.tiktok.com/@careercolin/video/7081675547595803950)), but with no breakout evidence.
12. **Accuracy is a differentiator in a low-trust category.** About 70% of top finance TikToks were graded C or lower (n = 10, [DayTrading.com](https://www.daytrading.com/tiktok/report-card)). 30% of Americans use social media for money advice ([Philadelphia Fed](https://www.philadelphiafed.org/consumer-finance/how-americans-use-social-media-for-financial-advice)). A widely indexed guide mislabels per-day dollars as per-second, an 86,400x error ([Finbold](https://finbold.com/guide/how-much-money-does-mrbeast-make-a-second/); my calculation).
13. **Fast "cost it out" reactions to headline numbers break out even for local news.** "$5,000 dividend would cost $1.2 trillion" got 47.8x ([link](https://www.youtube.com/shorts/ytf3d-2TpEg)). "The Math That Exposes Undervalued AI Stocks" got 151.9x ([link](https://www.youtube.com/shorts/49gpONz6VaE)).
14. **Faceless AI production is cheap but now carries policy risk.** YouTube's "inauthentic content" policy (from 2025-07-15) targets templated, synthetic-voice, repetitive Shorts ([Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660), [Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/)). Since 2025-03-31, Shorts views count every start, so use "engaged views" when comparing ([PPC Land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/)).
15. **Name collision is minor but real.** A business podcast called "Back of the Envelope" already exists ([Apple Podcasts](https://podcasts.apple.com/us/podcast/back-of-the-envelope/id1517652287)). No "Envelope Math" brand surfaced. The envelope double meaning connects the #cashstuffing audience (about 1.9B views) with the estimation and Fermi audience.

---

## 5. Implications for the whitespace (observations only; the next step develops formats)

- The **evidence-weighted sweet spot** is where three proven ingredients overlap:
  - the *implicit-estimation title* ("How much would it cost to…", "in units of…");
  - a *story, clip or joke wrapper* (compounding skits, Seinfeld and Futurama);
  - a *shown method*, which nobody does well yet and which addresses the trust gap.
- **The envelope as both prop and brand device** sits on a ~1.9B-view TikTok aesthetic (cash stuffing) and on a math tradition (back-of-the-envelope or Fermi estimation). No creator found occupies both.
- **Formats that need a face or street access** (Daniel Mac, Salary Transparent Street) are the hardest for a faceless channel. Formats with the strongest tiny-channel breakouts (clip plus caption, skit, pop-culture costing, unit conversion) all work faceless.

---

## 6. Open questions and unverified leads

- **FermiLab (Japan).** A search surfaced a Japanese channel named "フェルミ研究所 / FermiLab", reported at about 2.1M subs and about 34M monthly views. I could **not** verify its content (it may be manga-style storytelling rather than estimation) or open the source page, so it is excluded from the evidence.
- **xkcd *What If?* on YouTube.** View and subscriber counts were not checked; the search budget ran out.
- **@careercolin's golf-ball video.** View count unknown.
- **The source of "#FinTok 4.7B".** It was attributed to SocialChamp in a search extract. Confirm before quoting publicly.
- **Visual format of HD Guy, DanielChunNY, EspacioNX and LIL PIZZA Shorts.** These are inferred from titles only. Run `vidiq_watch_shortform_content` or `vidiq_video_transcript` before replicating, especially to check whether they show assumptions on screen.
- **The latest #cashstuffing, #100envelopechallenge and #girlmath totals for 2026.** TikTok's own hashtag pages were not reachable.
- **Copyright exposure for TV-clip formats.** Not researched here.

---

## Sources

**vidIQ (Shorts outliers, 2026-10-07):**
- [rrpn3zo2Slo](https://www.youtube.com/shorts/rrpn3zo2Slo)
- [klM8NXv-MFg](https://www.youtube.com/shorts/klM8NXv-MFg)
- [uoS1qzRWdbM](https://www.youtube.com/shorts/uoS1qzRWdbM)
- [uElaQvKP89I](https://www.youtube.com/shorts/uElaQvKP89I)
- [DUdIa3N8fb0](https://www.youtube.com/shorts/DUdIa3N8fb0)
- [hzf9ZLjtMko](https://www.youtube.com/shorts/hzf9ZLjtMko)
- [dmslQ9pDddA](https://www.youtube.com/shorts/dmslQ9pDddA)
- [jlKUWdrrqEI](https://www.youtube.com/shorts/jlKUWdrrqEI)
- [m-caEiD0MlQ](https://www.youtube.com/shorts/m-caEiD0MlQ)
- [utrM0rchbow](https://www.youtube.com/shorts/utrM0rchbow)
- [_NA0dK-IHOg](https://www.youtube.com/shorts/_NA0dK-IHOg)
- [s3fyV8fLqt8](https://www.youtube.com/shorts/s3fyV8fLqt8)
- [ivZfik8i-9c](https://www.youtube.com/shorts/ivZfik8i-9c)
- [XsgNUrok0m4](https://www.youtube.com/shorts/XsgNUrok0m4)
- [e2AVdxmesXQ](https://www.youtube.com/shorts/e2AVdxmesXQ)
- [Xp6ryufGrAA](https://www.youtube.com/shorts/Xp6ryufGrAA)
- [ytf3d-2TpEg](https://www.youtube.com/shorts/ytf3d-2TpEg)
- [49gpONz6VaE](https://www.youtube.com/shorts/49gpONz6VaE)
- [vjV-cFqywrk](https://www.youtube.com/shorts/vjV-cFqywrk)
- [d_-p-WObgGA](https://www.youtube.com/shorts/d_-p-WObgGA)
- [Bb8O11xfKpI](https://www.youtube.com/shorts/Bb8O11xfKpI)
- [GrCr_g0M_JU](https://www.youtube.com/shorts/GrCr_g0M_JU)
- [GBf_DfU_dJQ](https://www.youtube.com/shorts/GBf_DfU_dJQ)
- [p40V6q1Gz9g](https://www.youtube.com/shorts/p40V6q1Gz9g)

**Web:**
- Cash stuffing: [CNBC 2022](https://www.cnbc.com/2022/04/20/how-cash-stuffing-is-helping-tiktok-creators-beat-inflation-pay-debt.html) · [Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/) · [Dexerto](https://www.dexerto.com/entertainment/what-is-tiktoks-viral-cash-stuffing-trend-1909596) · [Benzinga](https://www.benzinga.com/money/cash-stuffing) · [Blackcat](https://blackcat.app/community/article/cash-stuffing-in-2026-how-tiktoks-favourite-budget-method-looks-on-a-phone) · [Marketplace](https://origin-www.marketplace.org/story/2024/12/30/cash-stuffing-tiktok-budgeting-money-youtube-savings-personal-finance) · [Yahoo Finance: creators](https://finance.yahoo.com/news/meet-tiktok-money-experts-popularized-200022411.html) · [Yahoo Finance: strategy](https://finance.yahoo.com/news/tiktok-cash-stuffing-strategy-help-140641874.html) · [NBC LA / CNBC 2025](https://www.nbclosangeles.com/news/business/money-report/tiktok-star-with-2-2-million-a-year-cash-stuffing-business-one-of-the-biggest-mistakes-i-see-people-make-with-money/3701802) · [Black Enterprise](https://www.blackenterprise.com/millionaire-tiktok-star-shares-her-insight-to-financial-success-with-baddies-and-budgets) · [SoFi](https://www.sofi.com/learn/content/cash-stuffing/) · [Fortune 2023](https://www.fortune.com/2023/05/12/what-is-cash-stuffing-tiktok-personal-finance-trend-gen-z)
- 100 Envelope Challenge: [Bustle](https://www.bustle.com/life/hundred-envelope-challenge-tiktok) · [Chime](https://www.chime.com/blog/100-envelope-challenge-how-to-save-5000-in-3-months/?bapage=1) · [First Merchants](https://firstmerchants.com/resources/learn/blogs/blog-detail/resource-library/2024/12/05/what-is-the-100-envelope-challenge--and-can-it-be-done-digitally) · [CBS News](https://www.cbsnews.com/news/tiktok-saving-money-tips-loud-budgeting-100-envelope-challenge/)
- Girl math and boy math: [Know Your Meme](https://knowyourmeme.com/memes/boy-math-girl-math) · [Eklipse](https://blog.eklipse.gg/news/viral-girl-math-trend-on-tiktok.html) · [Hello! India](https://in.hellomagazine.com/lifestyle/20230921303445/girl-math-trend-explained/) · [Fortune](https://www.fortune.com/2023/08/19/girl-math-tiktok-money-trend-gen-z-millennial-financial-stress-women-consumer-spending) · [Benzinga](https://feeds2.benzinga.com/news/23/08/33823295/tiktok-viral-girl-math-redefining-or-rationalizing-spending-habits) · [SheThePeople](https://www.shethepeople.tv/us/why-is-boy-math-taking-over-girl-math-1423474) · [KidsMoney](https://www.kidsmoney.org/?p=4932)
- Loud budgeting: [GMA](https://goodmorningamerica.com/living/story/loud-budgeting-viral-trend-save-money-106564692) · [AfroTech](https://afrotech.com/loud-budgeting/) · [WTXL](https://www.wtxl.com/what-is-loud-budgeting-the-newest-gen-z-tiktok-trend) · [YPulse](https://www.ypulse.com/newsfeed/2024/02/02/gen-z-has-coined-terms-like-loud-budgeting-and-doom-spending-rebranding-money-management/)
- Anti-consumption: [Wikipedia: Underconsumption core](https://en.wikipedia.org/wiki/Underconsumption_core) · [LBB](https://lbbonline.com/news/tiktok-trends-underconsumption-core) · [BU](https://insights.bu.edu/whats-underconsumption-core-the-new-money-trend-taking-over-tiktok/?amp=1) · [SUCCESS](https://www.success.com/no-buy-2025-tiktok-trend) · [SAN](https://san.com/cc/tiktoks-no-buy-2025-gains-momentum-amid-social-media-consumerism/) · [MarketBeat](https://www.marketbeat.com/articles/what-is-doom-spending-the-trend-takes-a-toll-on-personal-finances--and-members-of-this-generation-are-most-at-risk-2025-06-16) · [Material+](https://www.materialplus.io/perspectives/decoding-the-new-gen-z-financial-lexicon-from-doom-spending-to-money-dysmorphia) · [CNBC 2026](https://www.cnbc.com/2026/08/04/worth-the-money-financial-planners.html) · [KTVZ / Stacker 2026](https://ktvz.com/stacker-personal-finance-investing/2026/09/10/girl-math-loud-budgeting-moneymaxxing-were-these-trends-worth-trying/)
- Spending diaries: [Jezebel](https://jezebel.com/the-engrossing-illusion-of-what-i-spend-in-a-week-youtu-1840171800) · [PAPER](https://www.papermag.com/what-i-spend-youtube-influencer) · [Blavity](https://blavity.com/columbia-university-student-spent-nearly-16k-one-week) · [The Root](https://theroot.com/how-does-one-ny-college-student-spend-16k-in-one-week-1849827603)
- Street interviews: [Wikipedia: Daniel Mac](https://en.wikipedia.org/wiki/Daniel_Mac) · [DMARGE](https://www.dmarge.com/who-is-daniel-mac) · [Fox News](https://www.foxnews.com/media/daniel-mac-tiktok-famous-asking-simple-question-he-thinks-can-happen-anyone.amp) · [Trade Secrets](https://trade-secrets.beehiiv.com/p/salary-transparency-street) · [Creator Spotlight](https://creator-spotlight.beehiiv.com/p/hannah-williams-salary-transparent-street) · [Fortune 2022: salaries](https://fortune.com/2022/08/04/hannah-williams-salary-transparency-street-tiktok-videos-asking-strangers-how-much-they-earn) · [Know Your Meme: double it](https://knowyourmeme.com/memes/double-it-and-give-it-to-the-next-person) · [Fortune 2022: free money](https://www.fortune.com/2022/08/12/tiktok-free-money-strangers-nyc-experiment)
- Debates and dilemmas: [Yahoo / BI: $4,600 bill](https://www.yahoo.com/news/mega-viral-argument-over-4-140423102.html) · [Deseret](https://www.deseret.com/24071104/birthday-etiquette-who-should-pay) · [Blavity: staged?](https://blavity.com/tiktok-viral-argument-spiltting-bill-staged) · [MoneyLion](https://moneylion.com/trending/money/would-you-rather-have-a-penny-doubled-every-day-for-a-month-or-1-million) · [MoneyPantry](https://moneypantry.com/penny-doubled-for-30-days/) · [Snapchat: daily doubling](https://www.snapchat.com/topic/daily-doubling)
- TV clips: [Wood LLP: Seinfeld Tax](https://www.woodllp.com/Publications/Articles/pdf/Seinfeld_Tax.pdf) · [Abakcus: Futurama](https://abakcus.com/video/futurama-93-cents-turned-43-billion-dollars) · [VICE](https://vice.com/en/article/futurama-taught-me-everything-i-know-about-compound-interest)
- Costing and visualization: [Yahoo Finance: Monica's apartment](https://finance.yahoo.com/news/monicas-friends-apartment-rent-now-183103159.html) · [Business Today: rice](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html) · [BuzzFeed News](https://www.buzzfeednews.com/article/tanyachen/tiktok-jeff-bezos-wealth-rice-grains-video) · [AOL](https://www.aol.com/article/news/2020/03/02/jeff-bezos-tiktok-billionaire-rice-counting-wealthy-humphrey-yang/23938703) · [Fortune Creator 25](https://fortune.com/ranking/creator-25/2021/humphrey-yang/) · [Inverse](https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us) · [MEL](https://melmagazine.com/en-us/story/spend-bill-gates-money-game-wealth) · [Finbold](https://finbold.com/guide/how-much-money-does-mrbeast-make-a-second/)
- Faceless channels and platform: [Vozo](https://www.vozo.ai/blogs/youtube/profitable-faceless-youtube-niches) · [Vantaige](https://vantaige.io/blog/faceless-youtube-channel-ai-5000-month-2026) · [Gulf News](https://gulfnews.com/technology/youtube-updates-monetisation-policies-ai-and-repetitive-content-ban-begins-july-15-1.500192660) · [Plagiarism Today](https://www.plagiarismtoday.com/2025/07/08/youtube-targets-inauthentic-content/) · [AlternativeTo](https://alternativeto.net/news/2025/7/youtube-updates-its-policy-to-demonetize-inauthentic-mass-produced-ai-generated-content) · [PPC Land](https://ppc.land/youtube-changes-how-shorts-views-are-counted-from-march-31/) · [RouteNote](https://routenote.com/blog/how-are-views-counted-shorts-tiktok-reels/)
- Trust: [Philadelphia Fed](https://www.philadelphiafed.org/consumer-finance/how-americans-use-social-media-for-financial-advice) · [The National: FinTok](https://thenationalnews.com/business/money/what-is-fintok-and-why-is-it-going-viral-1.1162271) · [DayTrading.com](https://www.daytrading.com/tiktok/report-card) · [The Daily Upside](https://www.thedailyupside.com/advisor/financial-planning/most-finfluential-tiktok-posts-were-already-misleading-now-the-trend-is-worsening/)
- Whitespace landscape: [TikTok @careercolin](https://www.tiktok.com/@careercolin/video/7081675547595803950) · [Management Consulted](https://managementconsulted.com/market-sizing/) · [StrategyCase](https://strategycase.com/market-sizing-case-interviews/) · [techinterview.org](https://www.techinterview.org/post/3233474780/golf-balls-school-bus-google-fermi-estimation/) · [AMS blog: xkcd What If](https://blogs.ams.org/blogonmathblogs/2014/05/30/fermi-estimation-xkcd-what-if/) · [CS Monitor](https://m.csmonitor.com/Books/chapter-and-verse/2014/1218/What-If-continues-to-draw-critical-praise-stays-strong-on-sales-charts) · [Slashdot](https://news.slashdot.org/story/22/01/31/1731251/xkcds-randall-munroe-announces-what-if-2) · [Princeton UP: Guesstimation](https://press.princeton.edu/books/paperback/9780691129495/guesstimation) · [Physics Today](https://physicstoday.aip.org/reviews/guesstimation-solving-the-worlds-problems-on-the-back-of-a-cocktail-napkin) · [ODU](https://www.odu.edu/news/news-archive/2009/03/WeinsteinsGuesstimatingFeat_15188) · [Kara Goldin: Tina Hay](https://karagoldin.com/podcasts/tina-hay/) · [NGPF: Tina Hay](https://dev4.ngpf.org/blog/podcasts/ngpf-podcast-tina-hay-founderceo-of-napkin-finance/) · [Changelog: Simon Eskildsen](https://changelog.com/person/sirupsen) · [Wikipedia: Sam Denby](https://en.wikipedia.org/wiki/Sam_Denby) · [CreatorDB: Half as Interesting](https://creatordb.app/creatorstats/halfasinteresting/) · [CreatorDB: Wendover](https://creatordb.app/creatorstats/wendoverproductions/) · [Apple Podcasts: Back of the Envelope](https://podcasts.apple.com/us/podcast/back-of-the-envelope/id1517652287) · [Wikipedia: Envelope system](https://en.wikipedia.org/wiki/Envelope_system)
