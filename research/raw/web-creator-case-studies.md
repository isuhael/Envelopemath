# Finance short-form creator case studies, 2020 to 2026 (with a focus on money math)

Research date: 2026-10-07. Scope: the finance creators named in the brief, plus finance-math and "money visualized" creators found along the way. This file covers each creator's signature format, most viral Shorts or Reels with view counts, hook style, recurring series, cadence, and what interviews and articles say about why they grew. Everything here is research. Ideas for Envelope Math come later.

---

## 0. Method, data provenance and caveats (read first)

**Hard numbers (vidIQ, pulled 2026-10-07).** 8 vidIQ calls were used, which is the budget:

| # | Call | Result |
|---|------|--------|
| 1 | `vidiq_channel_videos` @HumphreyYang, short, popular | **failed**: handle not found |
| 2 | `vidiq_channel_videos` @marktilbury, short, popular | 50 Shorts with views, likes, comments, duration, breakout |
| 3 | `vidiq_channel_videos` @MrPlanktin, short, popular | 50 Shorts |
| 4 | `vidiq_channel_videos` @nischa, short, popular | 50 Shorts |
| 5 | `vidiq_channel_videos` @humphrey, short, popular | 50 Shorts (Humphrey Yang, channel UCFBpVaKCC0ajGps1vf0AgBg) |
| 6 | `vidiq_outliers` on 12 creator handles | **failed**: @ErikaKullberg not found (her YouTube handle is @Erika2) |
| 7 | `vidiq_outliers` on @CalebHammer, @MinorityMindset, @WhiteBoardFinance, @Erika2, @GrahamStephan, @AndreiJikh, @yourrichbff (short, "allTime", sorted by views) | 60 rows. All were published Oct 2025 or later, so the outlier index effectively covers only the trailing ~12 months. **No rows came back for Caleb Hammer, Minority Mindset or WhiteBoard Finance.** |
| 8 | `vidiq_channel_videos` @WhiteBoardFinance, short, popular | 19 Shorts |

"Breakout" is vidIQ's multiple of a video's views over the channel's typical views. `null` means vidIQ had no score, usually for older videos. Like% and comments per 1k views are my own arithmetic on the vidIQ counts.

**Article claims.** WebFetch was blocked by the network egress proxy for every domain I tried (fortune.com, nbcnews.com, tubefilter.com, businessofbusiness.com, hermoney.com, financialsamurai.com, stan.store, thetilt.com, wikipedia.org). Interview and article claims below therefore come from **WebSearch result summaries of those pages**, not from my reading of the full article. Each claim links to the page the search surfaced it from. Where sources disagree (for example Caleb Hammer's subscriber totals) I give both. I did not watch any video: "hook" means the **title or caption verbatim**, not the first spoken line, unless a source quotes the spoken line.

**Gaps.** I could not get vidIQ Shorts data for Caleb Hammer, Jaspreet Singh/Minority Mindset, Austin Hankwitz, Tori Dunlap, The Budget Mom, Hamish Hodder, Ramit Sethi or Brian Feroldi, so their sections lean on press numbers. TikTok and Instagram per-video numbers for named creators come only from press coverage.

---

## 1. At-a-glance table

Ordered by how math- or number-driven each creator's viral work is.

| Creator | Math-driven? | Signature short-form format | Biggest verified short-form hits | Hook style | Recurring series | Cadence / growth facts |
|---|---|---|---|---|---|---|
| **Mark Tilbury** (YouTube ~8.9M subs per [vidanalyze](https://vidanalyze.com/channel/marktilbury/statistics)) | **High** in his top breakouts | 15 to 49 s Shorts: big-number visualizations, "cost vs price" breakdowns, "hater vs millionaire" skits | "HATER CHALLENGES MILLIONAIRE (to sell a pen)" 59.4M; "Spending $100 BILLION in 40 Seconds" 40.9M (11.91x); "What if everyone got $1 billion? 😳" 37.1M; "Cost vs Price: McDonald's Big Mac" 29.4M (11.55x) (vidIQ) | Absurd number + time limit; "What if…"; "Cost vs Price: [brand item]" | Cost vs Price (2026); $X to $Y scales; Hater vs Millionaire; "Asking a Millionaire…" | Channel launched 2014; 6M+ subs by 2024; 18M+ cross-platform by 2026 ([YouTube Wiki](https://youtube.fandom.com/wiki/Mark_Tilbury), [Wikipedia](https://en.wikipedia.org/wiki/Mark_Tilbury)) |
| **Humphrey Yang** (YouTube ~2.0M, TikTok 3.3M+) | **High** | Analogies and visual props; business-model estimation; "how much do X make"; tangible-asset experiments | "A Great Analogy on the Market" 51.6M; "Selling my Gold Bar from Costco 1 Year Later…" 24.9M (191.75x); "What Hydroflask Doesn't Want You To Know" 19.5M; "How Much Do Bowling Alleys Make?" 10.6M (vidIQ) | Insider reveal ("doesn't want you to know", "dirty little secret"); "Estimating Sales: [business]!" | Estimating Sales; Business Model Breakdown; Dividend "$100/month" series; multi-part factory tours | 1 video/day for 30 days, repeated; a 260-day streak took him to 1M TikTok followers; ~1,100 videos in 5 years ([Yahoo Finance](https://finance.yahoo.com/news/humphrey-yang-shares-1-thing-230137056.html), [Fortune](https://fortune.com/2022/08/07/who-is-humphrey-yang-personal-finance-tiktok-gen-z)) |
| **Mr Planktin** (YouTube ~870K subs, per the sibling vidIQ file `yt-big-number-math.md`) | **One-off** | Animated cartoon comedy skits; finance appears only as a topic | "Compound interest explained 😂 #shorts" 9.06M (153.15x); follow-up "Compound interest explained here #shorts" 1.71M (5.52x, 3 weeks old) (vidIQ) | Topic + laughing emoji | None in finance; the channel is mostly family/school skits | Most other top Shorts are non-finance (for example "Why does Sonic have one eye?" 4.7M) |
| **Vivian Tu / Your Rich BFF** (6M+ followers cross-platform) | **Medium**: her breakout was "showing the math" | Talking head with a branded intro, myth-busting | First TikTok (Jan 2021): 3M views and 100K followers in a week ([HarryWalker](https://www.harrywalker.com/speakers/vivian-tu), [CNBC](https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html)) | "your rich BFF and favorite Wall Street girly" intro ([PureWow](https://purewow.com/feature/purewow-24-in-24/honorees/vivian-tu)) | Myth-busting | YouTube Shorts top views now go to sponsored posts (see §2.4) |
| **Tori Dunlap / Her First 100K** | **Medium** | Personal projection with a big number, plus a lead magnet | "How I'll retire with $6M+ at 26": 4M views in week 1 and 100K email subs in 7 days ([HoneyBook](https://www.honeybook.com/blog/financial-feminist-email-subscribers), [BuzzFeed](https://www.buzzfeed.com/farrahpenn/viral-investing-money-tiktok-tori-dunlap)) | Specific large dollar figure + age | Financial Feminist | Studied TikTok for 6 months before posting ([ginx.tv](https://www.ginx.tv/en/who-is-tori-dunlap-tiktok-finance-queen-money-expert)); 1.6M followers in 13 months ([Side Hustle Nation](https://www.sidehustlenation.com/tiktok-marketing/)) |
| **Erika Kullberg** (YouTube @Erika2, 2.3M subs) | Low (consumer-rights "fine print") | Plays both customer and company in one skit | Nike warranty skit 44.1M views ([Money.com](https://money.com/collection-post/changemakers-erika-kullberg)) | Catchphrase "I read the fine print so you don't have to" ([NBC](https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891)) | #ThanksErika | 3.9M followers in her first month; 85% of YouTube views from Shorts ([OutlierKit](https://outlierkit.com/channel/erika2)) |
| **Caleb Hammer / Financial Audit** | **Medium**: line-by-line bank-statement numbers | Long-form audit show, clipped to Shorts/TikTok/Reels | Clips "often generated millions of views" ([Stan](https://stan.store/blog/caleb-hammer-creator-bio/)); per-clip numbers not found | A guest's spending number revealed, then the host's reaction | Financial Audit plus spin-off shows | 250M+ YouTube views/month across 9 shows ([Stan](https://stan.store/blog/caleb-hammer-creator-bio/)); 3.82M subs and 4.86B views ([Wikipedia](https://en.wikipedia.org/wiki/Caleb_Hammer)) |
| **Nischa** (YouTube 1M+) | Low to medium | Calm explainer, checklists and routines | "My 6-step Payday Routine" 4.40M (19.52x); "Signs you're doing well financially" 4.02M (12.41x) (vidIQ) | "My N-step…", "Signs you're…" | Payday / money-habit lists | Started Dec 2021; twice a week from June 2022; one "day in the life of an investment banker" video brought 50K subs in a month ([NBC Miami/CNBC](https://www.nbcmiami.com/news/business/money-report/an-investment-banker-quit-her-job-to-become-a-youtuber-and-now-makes-over-1-million/3357475/)) |
| **Austin Hankwitz** | Low to medium | Transparent personal-wealth journey (credit score, portfolio) | "How I became a full-time influencer in 12 months" 6.9M views on TikTok ([Business of Business](https://www.businessofbusiness.com/articles/gen-z-fintok-influencer-austin-hankwitz-teaches-us-how-to-make-it-rain/)) | "How I…" with a timeframe | Rich Habits podcast | Started March 2020 at 24; ~500K followers within a year; 777.6K TikTok and 3.7% engagement as of 2026-09-22 ([CreatorDB](https://creatordb.app/creatorstats/austin-hankwitz/)) |
| **Jaspreet Singh / Minority Mindset** | Medium | Whiteboard with line drawings and key words ([Yahoo Finance](https://finance.yahoo.com/news/6-reasons-watch-jaspreet-singh-170556761.html)) | No per-video data found | Contrarian "minority vs majority" mindset | Market Briefs newsletter | Treats each platform differently ([SPI 565](https://www.smartpassiveincome.com/podcasts/spi-565-the-minority-mindset-brand-and-empire/)) |
| **Brian Feroldi** | **High** on static graphics | "Visualized" investing-concept graphics (X/LinkedIn) | Thread "15 timeless investing principles, visualized": 28K likes, 6.4K RTs, 500+ comments ([Practical Ecommerce](https://www.practicalecommerce.com/building-the-perfect-twitter-thread)) | "N [concepts], visualized" | Visualized threads | YouTube launched 2021: 40K subs and 1M views in year 1; 80K+ by early 2026 ([search summary of brianferoldi.com / yespress](https://yespress.io/brian-feroldi.md)) |
| **WhiteBoard Finance (Marko)** | High on long-form | Hand-drawn whiteboard explainers (long-form) | Top Short only **19.7K** views (vidIQ) | News/fear titles ("$9.2 TRILLION Debt Problem") | none in Shorts | 1M+ YouTube subs on long-form ([CreatorDB](https://creatordb.app/creatorstats/whiteboardfinance/)) |
| **The Budget Mom (Kumiko Love)** | Medium (envelope allocation) | Cash-stuffing envelope videos | No per-video data found | ASMR-like satisfaction of counting bills ([Journal of Business, Spokane](https://www.spokanejournal.com/local-news/cash-stuffing-craze-resurfaces/)) | Stuffing sessions | Cash stuffing since 2016; 7 envelopes |
| **Hamish Hodder** | Low to medium | Narrative finance disasters (frauds, collapses) | Most-watched video >1M (The Big Short investors' $9.4B loss) ([Famous Birthdays](https://www.famousbirthdays.com/people/hamish-hodder.html)); no Shorts data | Disaster plus dollar figure | n/a | 374K YouTube, 2.9% engagement ([CreatorDB](https://creatordb.app/creatorstats/hamishhodder/)) |
| **Ramit Sethi** | Low; actively anti-"latte math" | Coaching clips (Netflix "How to Get Rich", Money for Couples) | No short-form numbers found | "Buy all the lattes you want" stance | Money for Couples | Podcast billed as "reality TV drama and warm, authentic storytelling" ([Global Player](https://www.globalplayer.com/podcasts/42L2vg/)) |

---

## 2. Case studies

### 2.1 Mark Tilbury: the biggest finance-math Shorts on YouTube

**Who.** UK entrepreneur and investor. YouTube channel launched 2014. Growth was "initially slow". The channel passed 6M subs by 2024, and his cross-platform following passed 18M by 2026 ([YouTube Wiki](https://youtube.fandom.com/wiki/Mark_Tilbury), [Wikipedia](https://en.wikipedia.org/wiki/Mark_Tilbury)). Third-party trackers put him at ~8.9M subs and 2.4B total views ([vidanalyze](https://vidanalyze.com/channel/marktilbury/statistics)). One profile credits "snappy editing and animations that resonate with younger viewers" ([search summary](https://ftp.kpc.alaska.edu/26435911/mark-tilbury-net-worth-a-deep-dive-into)); this source is weak. I could not find a primary interview about his Shorts process.

**Top Shorts by views (vidIQ, popular=true, 2026-10-07).**

| Title (verbatim) | Views | Likes | Like% | Comments | Dur | Breakout | Published |
|---|---|---|---|---|---|---|---|
| [HATER CHALLENGES MILLIONAIRE (to sell a pen)](https://www.youtube.com/shorts/YVcgERxQtgI) | 59,361,801 | 1,838,786 | 3.10 | 3,840 | 23 s | 4.69 | 2025-02-04 |
| [HOW TO BEAT THE RAT RACE!](https://www.youtube.com/shorts/Ay_hu2hI0qE) | 51,141,309 | 1,741,757 | 3.41 | 7,838 | 26 s | n/a | 2023-09-26 |
| [How I Make $100,000+ Per Week](https://www.youtube.com/shorts/YHe1OlCXZt8) | 49,730,618 | 2,154,474 | 4.33 | 14,591 | 43 s | 4.55 | 2024-08-15 |
| [**Spending $100 BILLION in 40 Seconds**](https://www.youtube.com/shorts/zWWzd4TWIV8) | **40,927,810** | 1,391,810 | 3.40 | 8,997 | 49 s | **11.91** | 2025-03-24 |
| [**What if everyone got $1 billion? 😳**](https://www.youtube.com/shorts/FIdnR2Vcf3o) | **37,091,106** | 730,786 | 1.97 | 9,084 | 30 s | 7.13 | 2025-09-25 |
| [**Cost vs Price: McDonald's Big Mac**](https://www.youtube.com/shorts/nWXP8rHErQc) | **29,408,278** | 554,288 | 1.88 | 5,127 | 30 s | **11.55** | 2026-02-19 |
| [HOW BRANDS MANIPULATE YOU](https://www.youtube.com/shorts/hBrp78btcI4) | 29,354,617 | 914,203 | 3.11 | 8,272 | 23 s | 2.60 | 2025-01-08 |
| [They Give You FREE Extra Fries On Purpose](https://www.youtube.com/shorts/mg0aTXWzLOU) | 25,830,913 | 446,309 | 1.73 | 3,464 | 20 s | 5.00 | 2025-05-28 |
| [**How Long Does It Take For These Companies To Make $1 Million?**](https://www.youtube.com/shorts/EqB0MNwSfXs) | **22,963,921** | 487,871 | 2.12 | 1,474 | 26 s | 4.24 | 2025-08-19 |
| [**$1 to $1 Sextillion 😅**](https://www.youtube.com/shorts/lXBtU0uYOXI) | **20,193,818** | 548,628 | 2.72 | 5,135 | 44 s | 2.85 | 2025-08-24 |
| [**How Much Gordon Ramsey Makes! 🤑**](https://www.youtube.com/shorts/fFBKKlfdm_g) | **19,613,064** | 383,011 | 1.95 | 1,255 | 22 s | 4.79 | 2026-04-06 |
| [Why 'they' want to BAN cash 😳](https://www.youtube.com/shorts/3TpM-rfxuFU) | 19,550,231 | 406,221 | 2.08 | 6,150 | 24 s | 6.47 | 2025-09-22 |
| [**Making $1 Every Second ($1M to $1 Trillion)**](https://www.youtube.com/shorts/-pqKQqr25VM) | **15,347,851** | 638,596 | **4.16** | 2,800 | **17 s** | 4.82 | 2024-11-06 |
| [**Cost vs Price: Nutella Jar 🤨**](https://www.youtube.com/shorts/mlCx2b404Rc) | **15,200,411** | 354,589 | 2.33 | 3,912 | 27 s | 2.41 | 2026-06-08 |
| [WHAT IF I GAVE YOU $100,000,000?💰](https://www.youtube.com/shorts/TE2q8hwgmec) | 15,400,842 | 657,141 | 4.27 | 6,014 | 31 s | n/a | 2023-08-26 |

Bold rows are math or number-visualization formats.

**Signature formats, inferred from titles; I did not watch the videos.**
1. **Big-number-to-time or scale conversions**: "Spending $100 BILLION in 40 Seconds", "Making $1 Every Second ($1M to $1 Trillion)", "$1 to $1 Sextillion". These are his highest-breakout math Shorts. *Spending $100B* has the **highest breakout score (11.91) of any Tilbury Short in the returned set.**
2. **Hypothetical redistribution math**: "What if everyone got $1 billion?" (37.1M) and "WHAT IF I GAVE YOU $100,000,000?" (15.4M).
3. **"Cost vs Price" unit-economics series (new in 2026)**: Big Mac 29.4M (11.55x, the second-highest breakout in the set), then Nutella 15.2M. This is a repeatable title template (`Cost vs Price: [familiar product]`) that decomposes a retail price into its parts.
4. **Revenue-rate conversions**: "How Long Does It Take For These Companies To Make $1 Million?" and "How Much Gordon Ramsey Makes!", which turn annual revenue or earnings into a clock.
5. **Skits**: "Hater vs Millionaire", "Asking a Millionaire to Pay My Rent". These hold the top raw-view slots but are not math.

**Takeaway.** Within one large creator's catalogue, the **number-visualization and price-decomposition Shorts carry the highest breakout multiples** (11.91, 11.55, 7.13), above his skits (4.69, 6.71, 6.65) and his advice Shorts (1 to 3x). Durations are 17 to 49 s.

---

### 2.2 Humphrey Yang: analogies, estimation, tangible money

**Origin story (2019 to 2020).** He started TikTok in late 2019 to teach financial literacy to Gen Z and young millennials ([Fortune 2020](https://fortune.com/2020/03/21/tik-tok-influencers-personal-finance-advice)). He challenged himself to post **one video a day for 30 days, then another 30** ([The Tilt](https://www.thetilt.com/content-entrepreneur/humphrey-yang-tiktok), [Fortune 2022](https://fortune.com/2022/08/07/who-is-humphrey-yang-personal-finance-tiktok-gen-z)). He later said, "After that 260-day streak, I had a million followers on TikTok", and that he had posted ~1,100 videos in five years, about 220 a year ([Yahoo Finance](https://finance.yahoo.com/news/humphrey-yang-shares-1-thing-230137056.html)). His timing was good: there were few finance accounts on TikTok, and COVID brought an influx of new users ([Fortune 2022 via search summary](https://fortune.com/2022/08/07/who-is-humphrey-yang-personal-finance-tiktok-gen-z)).

**Inflection video.** A Hydro Flask post took him "from around 10,000 followers to over 100,000" ([SF Standard](https://sfstandard.com/business/san-francisco-tiktok-financial-literacy-education/)). The YouTube version, ["What Hydroflask Doesn't Want You To Know #Shorts"](https://www.youtube.com/shorts/cSuotMlL9-w), has **19,475,328 views** at a 4.92% like rate (vidIQ).

**The rice video (Feb/Mar 2020), the archetypal "money visualized" short.** He spent a Saturday night counting 10,000 grains of rice. One grain stood for $100,000, so 10 grains made $1M and 10,000 grains made $1B. Jeff Bezos's then-$122B net worth came to about 58 lb of rice. The project produced two 60-second TikToks with **2.2M combined views on TikTok**, then went viral again on Twitter ([Business Today](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html), [AOL](https://www.aol.com/article/news/2020/03/02/jeff-bezos-tiktok-billionaire-rice-counting-wealthy-humphrey-yang/23938703)). The TikTok caption was "This took me hours don't let it flop #billion #money #personalfinance #rice" ([TikTok](https://www.tiktok.com/@humphreytalks/video/6796564670481190150)).

**Approach (his own words, via summaries).** He uses relatable analogies and pop culture: he explained NFTs "to a 3-year-old" with a Taylor Swift Reputation-tour ticket, and short selling with an iPhone ([The Tilt](https://www.thetilt.com/content-entrepreneur/humphrey-yang-tiktok), [SF Standard](https://sfstandard.com/business/san-francisco-tiktok-financial-literacy-education/)). His goal is to "break it down and make it easy for folks to understand" ([Yahoo Finance](https://finance.yahoo.com/news/humphrey-yang-shares-1-thing-230137056.html)). His growth advice: "audience-first mentality", find your "wheelhouse" content, and "balance experimental content versus wheelhouse content" ([Karat](https://www.trykarat.com/blogs/how-to-grow-to-5m-subscribers-tiktok-ban-update-new-creator-brand)). On the Financial Samurai podcast the host remarked on a "20 hours to create a video" figure, and YouTube ads went from ~15% to ~40% of his revenue year over year ([Financial Samurai](https://www.financialsamurai.com/helping-others-and-making-millions-on-youtube-and-tiktok/)). He was Gen Z's most-trusted finfluencer in a 2023 Consumer Affairs poll, ranked first by 33% ([FA Mag](https://www.fa-mag.com/news/these-are-the-financial-gurus-gen-z-turn-to-for-advice-69248.html?section=3)). His YouTube channel is ~2.0M subs with 567M views, 54% of it Shorts, described as a "Shorts funnel" into 8 to 15 minute long-form ([OutlierKit](https://outlierkit.com/resources/youtube-finance-niche-creators/), [SocialPruf](https://socialpruf.com/youtube/humphrey)).

**Top YouTube Shorts (vidIQ).**

| Title (verbatim) | Views | Like% | Comments | Dur | Breakout | Published |
|---|---|---|---|---|---|---|
| [A Great Analogy on the Market, Subscribe ⬇️](https://www.youtube.com/shorts/_gsCYGzjoRc) | 51,644,734 | **5.84** | 6,980 | 54 s | n/a | 2022-02-11 |
| [Part 1 of the gold factory tour of @pampsasuisse! Subscribe for parts 2-7!](https://www.youtube.com/shorts/Md6nocjVUYA) | 29,601,553 | 3.28 | 6,508 | 54 s | 41.68 | 2024-10-03 |
| [Selling my Gold Bar from Costco 1 Year Later... 👀](https://www.youtube.com/shorts/P2vPRrQ2Ml4) | 24,906,351 | 2.21 | 6,952 | 85 s | **191.75** | 2025-03-26 |
| [Selling My 10 Ounce Silver Bar 👀](https://www.youtube.com/shorts/6nGGHe2HMaE) | 20,219,823 | 2.26 | 3,882 | 84 s | **215.16** | 2025-09-24 |
| [What Hydroflask Doesn't Want You To Know #Shorts](https://www.youtube.com/shorts/cSuotMlL9-w) | 19,475,328 | 4.92 | 4,237 | 45 s | n/a | 2021-08-31 |
| [🎳 How Much Do Bowling Alleys Make? #bowling #smallbusiness #profit](https://www.youtube.com/shorts/6rL-7T66QfA) | **10,557,323** | **5.67** | 2,590 | 56 s | n/a | 2023-05-02 |
| [How U.S. Taxes ACTUALLY Work! Explained.](https://www.youtube.com/shorts/H1-l-LbG3Fc) | 8,711,895 | 4.51 | 2,592 | 40 s | n/a | 2022-01-15 |
| [Costco has a $58 billion dirty little secret🤫 #costco](https://www.youtube.com/shorts/YWU4xng8zCc) | 8,641,648 | 3.30 | 2,092 | 57 s | **87.8** | 2024-09-02 |
| [Two Investors Buy Apple At The Same Time. Who Makes More?](https://www.youtube.com/shorts/SaGvoCTVCyk) | 8,404,025 | 4.51 | 1,388 | 36 s | n/a | 2021-12-12 |
| [What Prices Will Look Like in 50 Years 🤯](https://www.youtube.com/shorts/VbklM5ubC70) | 7,951,767 | 4.41 | **8,997 (1.13 per 1k)** | 55 s | n/a | 2021-12-16 |
| [**Estimating Sales: Hot Dog Stand! 🌭** #hotdogs #smallbusiness](https://www.youtube.com/shorts/-J2MeVAY6wU) | **6,818,036** | 4.93 | 1,506 | 34 s | n/a | 2023-02-23 |
| [Trader Joe's Business Model Breakdown: What's your favorite item? LMK ⬇️](https://www.youtube.com/shorts/0-2zGRlP_Dg) | 5,689,769 | 4.24 | **5,832 (1.02 per 1k)** | 59 s | n/a | 2023-08-31 |
| [Two Friends Buy Tesla Stock - Watch What Happens](https://www.youtube.com/shorts/7N5B2Gga3ts) | 5,035,188 | 4.16 | 465 | 34 s | n/a | 2021-11-12 |
| [Why In N Out burger isn't COMPLETELY nation-wide. Do you like In N Out or Five Guys more? #innout](https://www.youtube.com/shorts/hFfj4JHXLbg) | 4,171,269 | 5.49 | **5,736 (1.38 per 1k)** | 60 s | n/a | 2023-02-24 |
| [**Estimating Sales: Local Deli! 🥪 Was this more or less than you expected?**](https://www.youtube.com/shorts/RdbXFTNyjSQ) | 2,765,242 | 2.38 | 580 | 34 s | n/a | 2023-01-26 |
| [How Much $ Do You Need For $100 / Month in Dividends with McDonald's Stock?](https://www.youtube.com/shorts/V-4rDxdhf5A) | 2,181,124 | 1.60 | 709 | 32 s | 15.89 | 2025-08-25 |
| [How Much $ Do You Need For $100 / Month in Dividends with Coca Cola Stock](https://www.youtube.com/shorts/i2PARTow-Po) | 1,888,538 | 1.83 | 706 | 32 s | 12.95 | 2025-03-30 |

**Takeaways.**
- **His "Estimating Sales" series is literally back-of-the-envelope Fermi estimation of small businesses.** Examples: hot dog stand 6.8M, deli 2.8M, bowling alley 10.6M. It is a proven format, and as of 2023 it had not been turned into a dedicated faceless brand. The deli title asks "Was this more or less than you expected?", which invites viewers to compare their own guess with the answer.
- **Like rates on his explainer and estimation Shorts (4.4 to 5.8%) run well above his newer tangible-asset Shorts (2.2%).** The tangible-asset Shorts carry far higher breakout multiples (88x to 215x), so they reach beyond his own audience.
- **Captions that ask a direct question earn about 4 to 6 times more comments per view.** In-N-Out (1.38 per 1k), What Prices Will Look Like in 50 Years (1.13), Trader Joe's (1.02) compare with 0.2 to 0.3 per 1k typical.
- His recurring "How Much $ Do You Need For $100/Month in Dividends with [brand] Stock?" template is a **reverse-calculation series**: the answer is a principal amount. It reliably gets 13 to 16x breakouts at ~2M views.

---

### 2.3 Mr Planktin: one finance skit inside an animation channel

Mr Planktin's top Shorts are mostly animated family/school comedy ("Why does Sonic have one eye?" 4.7M; "He found out when his father actually was 😢" 3.4M). The finance outlier is **["Compound interest explained 😂 #shorts"](https://www.youtube.com/shorts/rrpn3zo2Slo): 9,059,331 views, 153.15x breakout, 61 s, 8,729 comments (0.96 per 1k), published 2026-06-10.** A follow-up, ["Compound interest explained here #shorts"](https://www.youtube.com/shorts/uoS1qzRWdbM), had 1,714,967 views (5.52x) after ~3 weeks, at 3,838 views/hour and **1.86 comments per 1k**, the highest comment rate in this whole dataset (vidIQ). The sibling file `yt-big-number-math.md` has its transcript and puts the channel at ~870K subs.

**Takeaway.** A dry math concept packaged as a character comedy, in a format built for entertainment, reached far beyond the finance audience. A second episode still did well but with a much lower multiple: the novelty wears off, but repeats still work.

---

### 2.4 Vivian Tu (Your Rich BFF): she "showed people the math"

- She posted her first video in **January 2021** (New Year's Day per one summary), using #richtok, #financetok and #budgetok. In her words it "went gangbusters". **By the end of the week it had 3M views and she had 100K followers** ([CNBC](https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html), [HarryWalker](https://www.harrywalker.com/speakers/vivian-tu)).
- The CNBC headline quote is **"I actually showed people the math."** It refers to her viral debunk of the idea that avocado toast stops people buying homes: "they were just like, 'So, like, it's not the avocado toast?'" She attributed the real cause to house prices and inflation rising faster than wages ([CNBC](https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html)).
- Her pitch in the first video: "I don't have a get rich quick scheme to share with you, but if you want to actually understand finance, I can explain it to you" ([HarryWalker](https://www.harrywalker.com/speakers/vivian-tu)).
- Branded intro: she introduces herself in every video as **"your rich BFF and favorite Wall Street girly"** ([PureWow](https://purewow.com/feature/purewow-24-in-24/honorees/vivian-tu)). She has 6M followers across platforms, plus Forbes 30 Under 30 (2023) and Top Creators recognition ([HarryWalker](https://www.harrywalker.com/speakers/vivian-tu)).
- **YouTube Shorts today (vidIQ outliers, trailing ~12 months).** The top rows are almost all **sponsored posts** with very low like rates (~0.1%), for example a GEICO partner post at 21.5M views (343.73x) and a second GEICO post at 17.1M (662.97x). That pattern is consistent with paid distribution, so I treat these as *not* evidence of organic virality. Her organic educational Shorts in the window are much smaller, for example "Golden rule - If your debt is more than 7% pay it off BEFORE investing!" at 830K (11.45x, 4.1% like rate).

---

### 2.5 Tori Dunlap (Her First 100K): a big personal number plus a lead magnet

- **April 2021:** a TikTok about how she, at 26, would **retire with more than $6 million**, and how to start investing, got **4M views in its first week**. She gained **100,000 email subscribers in 7 days** through a Money Personality Quiz linked from the caption. She spent "15 minutes filming and editing" it ([HoneyBook](https://www.honeybook.com/blog/financial-feminist-email-subscribers), [BuzzFeed](https://www.buzzfeed.com/farrahpenn/viral-investing-money-tiktok-tori-dunlap), [Growth In Reverse](https://growthinreverse.com/tori-dunlap/)).
- She had studied the TikTok ecosystem for 6 months before her "grand entry" ([ginx.tv](https://www.ginx.tv/en/who-is-tori-dunlap-tiktok-finance-queen-money-expert)), and reached 1.6M followers in 13 months ([Side Hustle Nation](https://www.sidehustlenation.com/tiktok-marketing/)).

**Takeaway.** One specific, large, compound-interest-driven number ($6M) tied to a relatable starting point (age 26) went viral, and a lead magnet that was already built converted the spike into an owned audience.

---

### 2.6 Erika Kullberg: a two-character template and a catchphrase

- **Format:** she plays both roles, the customer and the company (for example "Nike", wearing a different shirt). The customer gets refused, then cites the policy fine print ([Money.com](https://money.com/collection-post/changemakers-erika-kullberg)). The sign-off is **"I read the fine print so you don't have to"** ([NBC](https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891)).
- **Nike warranty skit: 44.1M views** ([Money.com](https://money.com/collection-post/changemakers-erika-kullberg)). She gained **3.9M followers in the first month**, and #ThanksErika passed 2.4M views as it became a meme ([NBC summary](https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891)).
- YouTube (@Erika2): 2.3M subs and 332M views, **85% of views from Shorts**; channel started 2019-08-26 ([OutlierKit](https://outlierkit.com/channel/erika2), [vidIQ stats page](https://vidiq.com/youtube-stats/channel/@erika2/)). She had 70K subs and 4M views in under a year in 2020 ([Making Sense of Cents](https://www.makingsenseofcents.com/2020/11/how-to-start-a-youtube-channel.html), [TubeTalk](https://tubetalk.buzzsprout.com/271511/6624862-0-subscribers-to-over-100-000-in-less-than-a-year-how-erika-kullberg-did-this-in-2020)).

**Takeaway.** The same predictable template every time, plus a catchphrase that became a meme, built a parody and remix loop. Each video is also a concrete money win (a free pair of shoes, a refund).

---

### 2.7 Caleb Hammer (Financial Audit): real people's numbers, clipped

- He started posting Financial Audit to YouTube in **2022**: the show goes through guests' bank statements and debts line by line. He had 360K subs within a year, and a TikTok clips account reached 250K followers ([Wikipedia](https://en.wikipedia.org/wiki/Caleb_Hammer)).
- "Short clips from Financial Audit episodes often generated millions of views across YouTube, TikTok, Instagram", introducing new audiences. He brings in **250M+ YouTube views a month across nine shows**, with a combined audience of 7.6M+ ([Stan](https://stan.store/blog/caleb-hammer-creator-bio/)). Subscriber totals vary by source: 3.5M+ subs and 4B+ views ([Stan](https://stan.store/blog/caleb-hammer-creator-bio/)) versus 3.82M subs and 4.86B views ([Wikipedia](https://en.wikipedia.org/wiki/Caleb_Hammer)).
- He runs organised clipping campaigns with AI clipping tools such as WayinVideo ([Notion campaign page](https://app.notion.com/p/WayinVideo-X-Caleb-Hammer_Clipping-Campaign-36b3f2ea3aed80928881e4ac26c092d5)). In 2026 he launched an owned streaming app and membership platform ([Tubefilter](https://www.tubefilter.com/2026/07/08/caleb-hammer-bets-on-ownership-why-he-launched-a-streaming-app-and-membership-platform-with-uscreen/amp/)).
- No Shorts outliers came back from vidIQ for @CalebHammer in the trailing-12-month window. That may mean the clips live on separate clip channels; unverified.

**Takeaway.** The engine is a real person's specific numbers (income, spend line, debt total) plus judgement and drama, cut into many clips per episode.

---

### 2.8 Nischa: routines and checklists, not math

She started in Dec 2021 and went to two posts a week in June 2022. A "day in the life of an investment banker" video brought **50K subs in one month**. She now has 1M+ subs and over $1M a year in revenue ([NBC Miami / CNBC](https://www.nbcmiami.com/news/business/money-report/an-investment-banker-quit-her-job-to-become-a-youtuber-and-now-makes-over-1-million/3357475/)). Top Shorts (vidIQ): ["My 6-step Payday Routine"](https://www.youtube.com/shorts/RIOcs8stB6w) 4,398,612 (19.52x, 50 s); ["Signs you're doing well financially"](https://www.youtube.com/shorts/QS-7ts4S8N8) 4,019,031 (12.41x); ["Bad money habits that hold you back"](https://www.youtube.com/shorts/kCApHwptVp4) 1,253,538 (5.26x). Her math-flavoured Shorts are much smaller: "Why net worth skyrockets after $10k" 431K (5.53x), "What if you invest $10,000 and never touch it again?" 66K.

---

### 2.9 Austin Hankwitz: radical transparency

He started TikTok in March 2020 at 24, as a side project while working at a finance company. He had about half a million followers within a year and quit his job about 6 months in ([Business of Business](https://www.businessofbusiness.com/articles/gen-z-fintok-influencer-austin-hankwitz-teaches-us-how-to-make-it-rain/)). His most popular TikTok, **"How I became a full-time influencer in 12 months", had 6.9M views**. He charged $4.5K to $8K per post and made over $500K ([Business of Business](https://www.businessofbusiness.com/articles/gen-z-fintok-influencer-austin-hankwitz-teaches-us-how-to-make-it-rain/), [The Wealth Advisor](https://www.thewealthadvisor.com/article/wall-street-influencers-are-making-bigger-bucks-bankers)). His content is built on "authenticity and transparency": he shares his credit score, student debt and portfolio. He warns that depending on brand deals can lead to "a terrible spiral" ([Yahoo Finance](https://finance.yahoo.com/news/finance-tiktoker-explains-how-brand-deals-can-send-influencers-into-a-terrible-spiral-225910219.html)). As of 2026-09-22: 777.6K TikTok followers at 3.7% engagement against a 1.5% category median ([CreatorDB](https://creatordb.app/creatorstats/austin-hankwitz/)).

---

### 2.10 Jaspreet Singh (Minority Mindset): whiteboard and a contrarian frame

He uses a simple whiteboard with line drawings or key words to explain concepts ([Yahoo Finance](https://finance.yahoo.com/news/6-reasons-watch-jaspreet-singh-170556761.html)). The brand promise is thinking like the "minority" rather than the majority about money ([FinCon](https://finconexpo.com/jaspreet-singh/)). He tailors content to each platform ([SPI 565](https://www.smartpassiveincome.com/podcasts/spi-565-the-minority-mindset-brand-and-empire/)). The business monetises through the Market Briefs newsletter, products and newsletter ad sales ([search summary](https://www.whitecoatinvestor.com/interview-with-jaspreet-singh-of-the-minority-mindset/)). A dated Yahoo profile cites 1.67M YouTube subs and 51.2M TikTok views; that figure is old and the date is unknown. **No per-Short data:** vidIQ returned no outliers for @MinorityMindset.

---

### 2.11 Graham Stephan and Andrei Jikh (Shorts outliers in the trailing ~12 months, vidIQ)

- Graham Stephan (5.18M subs): ["Why I'm Selling My Rental Properties"](https://www.youtube.com/shorts/3nkqbqIc9nk) 5.45M (16.78x, 34 s); ["I Was Wrong About Togi…."](https://www.youtube.com/shorts/GNMvtBA6LWU) 3.55M (20.32x); ["The $10,000,000 Credit Card!"](https://www.youtube.com/shorts/c6hpJIr3vWo) 1.90M (9.11x); ["Ranking The BEST Credit Cards 💳"](https://www.youtube.com/shorts/K7UvJQsjMOM) 1.33M (32.77x). Patterns: personal decisions or confessions, collaborations with other creators, and big dollar figures in the title.
- Andrei Jikh (3.38M subs): ["The US Is Buying Stocks"](https://www.youtube.com/shorts/mXdRCyFqeio) 2.36M (42.22x); ["I Gave Up $325,000 For Pokémon Cards"](https://www.youtube.com/shorts/yjz_rNcXwf8) 737K (14.71x). Patterns: news-driven macro, and a specific dollar sacrifice.

---

### 2.12 Brian Feroldi: "visualized" concepts as static graphics

His best thread opens with "15 timeless investing principles, visualized" and drew 500+ comments, 6.4K retweets and 28K likes. His thread structure is hook, body, ask, summary. He documents the topic, format and image of each winning hook so he can reuse it ([Practical Ecommerce](https://www.practicalecommerce.com/building-the-perfect-twitter-thread), [Nathan Barry podcast](https://podcastaddict.com/nathan-barry-archive/episode/148393743)). His YouTube is modest: 40K subs and 1M views in year 1 (2021), 80K+ by early 2026 ([search summary](https://yespress.io/brian-feroldi.md)). **Takeaway:** "X, visualized" is a proven hook on text and graphics platforms, but I found no evidence that he moved it into high-view Shorts.

---

### 2.13 WhiteBoard Finance: whiteboard math did not carry over to Shorts

Marko Zlatic's long-form whiteboard channel has 1M+ subs ([CreatorDB](https://creatordb.app/creatorstats/whiteboardfinance/)). His **Shorts top out at 19,707 views** ("2025 Market Crash? The $9.2 TRILLION Debt Problem No One Is Talking About"). Most are news or macro commentary from March 2025 with under 10K views (vidIQ). **This is negative evidence:** a successful long-form visual-math brand does not automatically produce Shorts reach, especially when the Shorts are news commentary rather than a self-contained calculation with a payoff.

---

### 2.14 The Budget Mom, cash stuffing and the 100 Envelope Challenge (relevant to the "envelope" name)

- **The Budget Mom (Kumiko Love):** she had a finance degree but $77K of debt, and has used cash stuffing since 2016 with **seven envelopes**. Followers reported "a sense of satisfaction watching her count fresh bills into beautifully decorated envelopes" ([Journal of Business, Spokane](https://www.spokanejournal.com/local-news/cash-stuffing-craze-resurfaces/)).
- **#cashstuffing:** about 1.9B views across about 103K posts by one count; other sources range from 1.5B to 2.5B depending on date ([Dexerto](https://www.dexerto.com/entertainment/what-is-tiktoks-viral-cash-stuffing-trend-1909596), [Canstar](https://www.canstar.com.au/budgeting/tiktok-money-trends/)).
- **The 100 Envelope Challenge:** you put $1 to $100 in numbered envelopes, which totals **$5,050**, the Gauss sum 1+2+…+100. The hashtag has passed **150M TikTok views** ([Bustle](https://www.bustle.com/life/hundred-envelope-challenge-tiktok), [TIME](https://time.com/6249003)). This viral money trend is, at heart, an arithmetic series.

---

### 2.15 Hamish Hodder and Ramit Sethi (thin data)

- **Hamish Hodder:** Melbourne-based, posting since 2018. He makes narrative finance-disaster videos (frauds, collapses, meltdowns). His most-watched video (>1M) is about the investors behind *The Big Short* losing $9.4B ([Famous Birthdays](https://www.famousbirthdays.com/people/hamish-hodder.html)). He has 374K YouTube subs at 2.9% engagement ([CreatorDB](https://creatordb.app/creatorstats/hamishhodder/)). No Shorts data found.
- **Ramit Sethi:** Netflix's "How to Get Rich" ([Netflix](https://www.netflix.com/gb/title/81410436)) and the Money for Couples podcast, billed as "reality TV drama and warm, authentic storytelling" ([Global Player](https://www.globalplayer.com/podcasts/42L2vg/)). He is famous for rejecting latte math ("buy all the lattes you want"; [Netflix listing summary](https://www.netflix.com/vn-en/title/81410436)). No short-form view data found.

---

### 2.16 "Money visualized" beyond video (format ancestors)

- **"Wealth shown to scale"** (Matt Korostoff, 2020): $1,000 per pixel, and you scroll horizontally through Bezos's wealth. A single small square marks median US lifetime earnings (~$1.7M). Multiple r/dataisbeautiful posts drew tens of thousands of upvotes ([Inverse](https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us), [Kottke](https://kottke.org/20/05/0036693-a-visualization-of-wealth)). The mechanic: make the viewer *physically experience* the scale through time spent, not just see a number.
- **MetaBallStudios** (Spain, ~732K subs): 3D size and scale comparisons ([NetWorthSpot](https://www.networthspot.com/metaballstudios/net-worth/)). I did not find data on its money-specific videos.

---

## 3. Cross-creator patterns (evidence-backed)

1. **Converting a giant number into time or a human scale produces the biggest finance-math breakouts.** Evidence: Tilbury's "Spending $100 BILLION in 40 Seconds" (40.9M, 11.91x, his top breakout), "Making $1 Every Second ($1M to $1 Trillion)" (15.3M, 4.16% like rate), "$1 to $1 Sextillion" (20.2M) (vidIQ). The format's ancestor is Humphrey Yang's rice video: one grain = $100K, Bezos = 58 lb of rice, viral on TikTok and Twitter ([Business Today](https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html)). The non-video version is "Wealth shown to scale" ([Inverse](https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us)).
2. **Revenue-per-second and "how long to make $X" framing is a strong, simple template.** Evidence: "How Long Does It Take For These Companies To Make $1 Million?" (22.96M, 26 s); "How Much Gordon Ramsey Makes!" (19.6M, 22 s) (vidIQ; [Shorts link](https://www.youtube.com/shorts/EqB0MNwSfXs)).
3. **Price decomposition of familiar products is a breakout series in 2026.** Evidence: Tilbury's "Cost vs Price: McDonald's Big Mac" got 29.4M at 11.55x, the second-highest breakout in his returned set. "Cost vs Price: Nutella Jar" followed at 15.2M ([Big Mac](https://www.youtube.com/shorts/nWXP8rHErQc), [Nutella](https://www.youtube.com/shorts/mlCx2b404Rc)).
4. **Fermi-style business estimation is already proven at multi-million scale.** Evidence: Humphrey Yang's "Estimating Sales: Hot Dog Stand!" (6.8M, 34 s), "Estimating Sales: Local Deli!" (2.8M), "How Much Do Bowling Alleys Make?" (10.6M, 5.67% like rate), "Costco has a $58 billion dirty little secret" (8.6M, 87.8x) ([hot dog](https://www.youtube.com/shorts/-J2MeVAY6wU), [bowling](https://www.youtube.com/shorts/6rL-7T66QfA), [Costco](https://www.youtube.com/shorts/YWU4xng8zCc)).
5. **The vehicle is a famous brand, product or person; the math rides on it.** Evidence: almost every math hit above is anchored to a household name: McDonald's, Nutella, Costco, Trader Joe's, In-N-Out, Gordon Ramsay, Jeff Bezos, Apple, Tesla (vidIQ; [Trader Joe's](https://www.youtube.com/shorts/0-2zGRlP_Dg), [In-N-Out](https://www.youtube.com/shorts/hFfj4JHXLbg)).
6. **An insider-reveal framing ("doesn't want you to know", "dirty little secret", "on purpose") lifts finance explainers.** Evidence: "What Hydroflask Doesn't Want You To Know" (19.5M) took Humphrey from about 10K to over 100K TikTok followers ([SF Standard](https://sfstandard.com/business/san-francisco-tiktok-financial-literacy-education/)). Tilbury's "They Give You FREE Extra Fries On Purpose" got 25.8M and "HOW BRANDS MANIPULATE YOU" 29.4M (vidIQ).
7. **Showing the math to debunk a popular money myth launched one of the biggest finance creators.** Evidence: Vivian Tu's first video got 3M views and 100K followers in a week; her own explanation is "I actually showed people the math" on avocado toast versus house prices ([CNBC](https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html), [HarryWalker](https://www.harrywalker.com/speakers/vivian-tu)).
8. **A single, specific, large projected number tied to a relatable starting point converts well.** Evidence: Tori Dunlap's "retire with $6M+ at 26" got 4M views in week 1 and 100K email subscribers in 7 days via a pre-built quiz ([HoneyBook](https://www.honeybook.com/blog/financial-feminist-email-subscribers), [BuzzFeed](https://www.buzzfeed.com/farrahpenn/viral-investing-money-tiktok-tori-dunlap)).
9. **Story and character packaging can make abstract math go far beyond finance audiences.** Evidence: Mr Planktin's animated "Compound interest explained 😂" got 9.06M at 153x on a mostly non-finance comedy channel. Humphrey's two-character comparisons, "Two Investors Buy Apple At The Same Time. Who Makes More?" (8.4M) and "Two Friends Buy Tesla Stock - Watch What Happens" (5.0M), work the same way (vidIQ; [Planktin](https://www.youtube.com/shorts/rrpn3zo2Slo), [Apple](https://www.youtube.com/shorts/SaGvoCTVCyk)).
10. **A fixed template plus a recurring catchphrase builds recognition and meme loops.** Evidence: Erika Kullberg's two-role skit ending "I read the fine print so you don't have to" got 44.1M on the Nike video and 3.9M followers in her first month ([Money.com](https://money.com/collection-post/changemakers-erika-kullberg), [NBC](https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891)). Vivian Tu's fixed intro is "your rich BFF and favorite Wall Street girly" ([PureWow](https://purewow.com/feature/purewow-24-in-24/honorees/vivian-tu)).
11. **Volume and daily cadence compounded early growth.** Evidence: Humphrey posted one video a day for 30 days, repeated; his 260-day streak took him to 1M TikTok followers; he made ~1,100 videos in 5 years ([Yahoo Finance](https://finance.yahoo.com/news/humphrey-yang-shares-1-thing-230137056.html), [The Tilt](https://www.thetilt.com/content-entrepreneur/humphrey-yang-tiktok)). He also advises balancing "experimental" and "wheelhouse" content ([Karat](https://www.trykarat.com/blogs/how-to-grow-to-5m-subscribers-tiktok-ban-update-new-creator-brand)).
12. **Captions that ask an explicit question drive about 4 to 6 times more comments per view.** Evidence: Humphrey's In-N-Out ("Do you like In N Out or Five Guys more?") drew 1.38 comments per 1k views, Trader Joe's ("What's your favorite item? LMK") 1.02 per 1k, and "What Prices Will Look Like in 50 Years 🤯" 1.13 per 1k. His other explainers sit around 0.2 to 0.3 per 1k (vidIQ counts; [In-N-Out](https://www.youtube.com/shorts/hFfj4JHXLbg)).
13. **Reverse-calculation series ("How much do you need for $X/month?") are dependable mid-tier performers.** Evidence: Humphrey's dividend series: McDonald's 2.18M (15.89x), Coca-Cola 1.89M (12.95x), both 32 s ([McDonald's](https://www.youtube.com/shorts/V-4rDxdhf5A), [Coca-Cola](https://www.youtube.com/shorts/i2PARTow-Po)).
14. **Tangible money objects with a time-skip payoff produce the highest multiples.** Evidence: "Selling my Gold Bar from Costco 1 Year Later… 👀" (24.9M, 191.75x) and "Selling My 10 Ounce Silver Bar 👀" (20.2M, 215.16x). A multi-part gold-factory series opened with Part 1 at 29.6M (41.68x), with "Subscribe for parts 2-7!" in the title ([gold bar](https://www.youtube.com/shorts/P2vPRrQ2Ml4), [factory](https://www.youtube.com/shorts/Md6nocjVUYA)).
15. **Shorts length: the winners in this set run 17 to 61 s, and most math hits run 22 to 49 s.** Evidence: Tilbury's math Shorts run 17 to 49 s; Humphrey's estimation Shorts 34 to 56 s; Planktin 61 s (vidIQ).
16. **News commentary and generic advice Shorts underperform, even for big long-form brands.** Evidence: WhiteBoard Finance's best Short is 19.7K views despite 1M+ long-form subs (vidIQ; [CreatorDB](https://creatordb.app/creatorstats/whiteboardfinance/)). Nischa's math-flavoured Shorts get 66K to 431K while her routines get about 4M (vidIQ).
17. **Treat sponsored-post outliers with suspicion.** Evidence: Your Rich BFF's top YouTube Shorts in the trailing year are GEICO, Lyft and hotels.com partner posts at 12 to 21.5M views and up to 663x breakout, with ~0.1% like rates. Organic educational Shorts in the same window are around 0.8M (vidIQ outliers).
18. **Clipping long-form numbers content is a discovery engine at scale.** Evidence: Caleb Hammer's audit clips "often generated millions of views". He runs nine shows with 250M+ views a month and organised clipping campaigns ([Stan](https://stan.store/blog/caleb-hammer-creator-bio/), [Notion](https://app.notion.com/p/WayinVideo-X-Caleb-Hammer_Clipping-Campaign-36b3f2ea3aed80928881e4ac26c092d5)).
19. **Envelope-native money trends are already huge and arithmetic at heart.** Evidence: #cashstuffing has 1.5 to 2.5B views ([Dexerto](https://www.dexerto.com/entertainment/what-is-tiktoks-viral-cash-stuffing-trend-1909596)). The 100 Envelope Challenge has 150M+ views, and its $5,050 total is the 1-to-100 sum ([Bustle](https://www.bustle.com/life/hundred-envelope-challenge-tiktok)). Viewers find bill-counting itself satisfying ([Journal of Business, Spokane](https://www.spokanejournal.com/local-news/cash-stuffing-craze-resurfaces/)).
20. **The niche economics are favourable; these are third-party estimates and unverified.** OutlierKit reports personal finance had the highest share of 10x-breakout videos in its August 2026 trending-niches data (16.7%), and estimates finance Shorts CPM around $4.50 per 1k ([OutlierKit RPM guide](https://outlierkit.com/blog/youtube-rpm-finance-niche), [OutlierKit finance creators](https://outlierkit.com/resources/youtube-finance-niche-creators/)). Coverage of FinTok notes that algorithms reward bold, attention-grabbing claims over complex explanations ([The National](https://thenationalnews.com/business/money/what-is-fintok-and-why-is-it-going-viral-1.1162271), [NBC DFW](https://www.nbcdfw.com/news/business/money-report/dont-be-so-quick-to-take-money-advice-from-tiktok-heres-why/3557078/)). That is a risk for an "estimate honestly" brand, and also a gap it can fill.

---

## 4. Research notes for the Envelope Math hand-off (observations, not ideas)

- **White space:** Humphrey's "Estimating Sales" Fermi series (2023) proved demand for back-of-the-envelope business estimates. No 2024 to 2026 "Estimating Sales" titles appear among his 50 most popular Shorts in vidIQ. That only tells us about his top 50, so whether the series continued is unverified. No faceless channel in this research owns rough-but-right estimation as its brand.
- **Proven templates to adapt, not copy:** big number to time or human scale (Tilbury); `Cost vs Price: [product]` (Tilbury 2026); `How much do [business] make?` and `Estimating Sales: [business]` (Humphrey); `How much $ do you need for $X/month from [brand]` (Humphrey); two-character "who ends up richer" (Humphrey, Planktin); a myth-bust with the math shown (Vivian Tu).
- **Brand mechanics that recurred:** a fixed opener or catchphrase (Kullberg, Tu); one consistent visual system (Jaspreet's whiteboard, Humphrey's props); a question in the caption for comments; multi-part series with "part 1 of N" in the title.
- **The envelope double meaning has real demand behind it:** #cashstuffing (1.5 to 2.5B views) and the 100 Envelope Challenge ($5,050 = Gauss sum, 150M+ views).
- **Cautions:** sponsored Shorts distort outlier data. News and macro Shorts underperform. Bold claims spread faster than accurate ones, so an "estimated, showing the work" brand has to make the estimate itself the hook.

## 5. Gaps and open questions

- There are no per-video numbers for Caleb Hammer clips, Jaspreet Singh, Austin Hankwitz (beyond one TikTok), The Budget Mom, Hamish Hodder or Ramit Sethi clips. vidIQ returned no outliers for these, or their handles were not tried within the budget.
- Hooks are titles only. First spoken lines and visual structure need transcripts (the sibling files `yt-big-number-math.md` and `yt-personal-money-math.md` have some).
- Every article claim comes from search summaries because WebFetch was egress-blocked. A human spot-check of the key quotes (the CNBC Vivian Tu quote, the Yahoo/Humphrey 260-day streak, the HoneyBook/Tori Dunlap numbers) is advisable before external use.

---

## Sources

**vidIQ (pulled 2026-10-07):** `vidiq_channel_videos` for @marktilbury (UCxgAuX3XZROujMmGphN_scA), @humphrey (UCFBpVaKCC0ajGps1vf0AgBg), @MrPlanktin (UCh4qXrrRXhKiEfRmTbIWRVw), @nischa (UCQpPo9BNwezg54N9hMFQp6Q), @WhiteBoardFinance (UCL_v4tC26PvOFytV1_eEVSg); `vidiq_outliers` for @yourrichbff (UCgbXT2QuTj4SYxaWCs3vuAw), @GrahamStephan (UCV6KDgJskWaEckne5aPA0aQ), @AndreiJikh (UCGy7SkBjcIAgTiwkXEtPnYg), @Erika2 (UCoSw1rKMkCbwzKpkC0OjRKA), @CalebHammer, @MinorityMindset, @WhiteBoardFinance. Individual Shorts are linked inline as https://www.youtube.com/shorts/<id>.

**Web (claims come from search summaries of these pages):**
- Business Today, Humphrey Yang rice video: https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html
- AOL, rice video reaction: https://www.aol.com/article/news/2020/03/02/jeff-bezos-tiktok-billionaire-rice-counting-wealthy-humphrey-yang/23938703
- TikTok, Humphrey rice video: https://www.tiktok.com/@humphreytalks/video/6796564670481190150
- Fortune (2020), TikTok finance influencers: https://fortune.com/2020/03/21/tik-tok-influencers-personal-finance-advice
- Fortune (2022), Who is Humphrey Yang: https://fortune.com/2022/08/07/who-is-humphrey-yang-personal-finance-tiktok-gen-z
- Yahoo Finance, Humphrey 260-day streak: https://finance.yahoo.com/news/humphrey-yang-shares-1-thing-230137056.html
- SF Standard, Humphrey Yang: https://sfstandard.com/business/san-francisco-tiktok-financial-literacy-education/
- The Tilt, Humphrey Yang: https://www.thetilt.com/content-entrepreneur/humphrey-yang-tiktok
- Karat, Humphrey growth advice: https://www.trykarat.com/blogs/how-to-grow-to-5m-subscribers-tiktok-ban-update-new-creator-brand
- Financial Samurai podcast, Humphrey Yang: https://www.financialsamurai.com/helping-others-and-making-millions-on-youtube-and-tiktok/
- OutlierKit, finance creators 2026: https://outlierkit.com/resources/youtube-finance-niche-creators/
- OutlierKit, finance RPM: https://outlierkit.com/blog/youtube-rpm-finance-niche
- OutlierKit, Erika Kullberg channel: https://outlierkit.com/channel/erika2
- SocialPruf, Humphrey: https://socialpruf.com/youtube/humphrey
- FA Mag, Consumer Affairs Gen Z poll: https://www.fa-mag.com/news/these-are-the-financial-gurus-gen-z-turn-to-for-advice-69248.html?section=3
- CNBC, Vivian Tu: https://www.cnbc.com/2022/01/28/how-your-rich-bff-vivian-tu-built-a-massive-tiktok-following.html
- Fortune, Vivian Tu: https://fortune.com/2022/11/27/how-vivian-tu-rich-bff-tiktok-became-successful-personal-finance/
- Harry Walker Agency, Vivian Tu: https://www.harrywalker.com/speakers/vivian-tu
- PureWow, Vivian Tu: https://purewow.com/feature/purewow-24-in-24/honorees/vivian-tu
- HoneyBook, Tori Dunlap: https://www.honeybook.com/blog/financial-feminist-email-subscribers
- BuzzFeed, Tori Dunlap $6M video: https://www.buzzfeed.com/farrahpenn/viral-investing-money-tiktok-tori-dunlap
- Growth In Reverse, Tori Dunlap: https://growthinreverse.com/tori-dunlap/
- Side Hustle Nation, Tori Dunlap: https://www.sidehustlenation.com/tiktok-marketing/
- ginx.tv, Tori Dunlap: https://www.ginx.tv/en/who-is-tori-dunlap-tiktok-finance-queen-money-expert
- NBC News, Erika Kullberg: https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891
- Money.com, Erika Kullberg: https://money.com/collection-post/changemakers-erika-kullberg
- vidIQ stats page, @Erika2: https://vidiq.com/youtube-stats/channel/@erika2/
- Making Sense of Cents, Erika Kullberg YouTube growth: https://www.makingsenseofcents.com/2020/11/how-to-start-a-youtube-channel.html
- TubeTalk, Erika Kullberg: https://tubetalk.buzzsprout.com/271511/6624862-0-subscribers-to-over-100-000-in-less-than-a-year-how-erika-kullberg-did-this-in-2020
- Stan, Caleb Hammer: https://stan.store/blog/caleb-hammer-creator-bio/
- Wikipedia, Caleb Hammer: https://en.wikipedia.org/wiki/Caleb_Hammer
- Notion, WayinVideo x Caleb Hammer clipping campaign: https://app.notion.com/p/WayinVideo-X-Caleb-Hammer_Clipping-Campaign-36b3f2ea3aed80928881e4ac26c092d5
- Tubefilter, Caleb Hammer ownership: https://www.tubefilter.com/2026/07/08/caleb-hammer-bets-on-ownership-why-he-launched-a-streaming-app-and-membership-platform-with-uscreen/amp/
- NBC Miami / CNBC, Nischa Shah: https://www.nbcmiami.com/news/business/money-report/an-investment-banker-quit-her-job-to-become-a-youtuber-and-now-makes-over-1-million/3357475/
- Business of Business, Austin Hankwitz: https://www.businessofbusiness.com/articles/gen-z-fintok-influencer-austin-hankwitz-teaches-us-how-to-make-it-rain/
- The Wealth Advisor, finfluencer earnings: https://www.thewealthadvisor.com/article/wall-street-influencers-are-making-bigger-bucks-bankers
- Yahoo Finance, Hankwitz on brand deals: https://finance.yahoo.com/news/finance-tiktoker-explains-how-brand-deals-can-send-influencers-into-a-terrible-spiral-225910219.html
- CreatorDB, Austin Hankwitz: https://creatordb.app/creatorstats/austin-hankwitz/
- Yahoo Finance, Jaspreet Singh: https://finance.yahoo.com/news/6-reasons-watch-jaspreet-singh-170556761.html
- SPI 565, Jaspreet Singh: https://www.smartpassiveincome.com/podcasts/spi-565-the-minority-mindset-brand-and-empire/
- FinCon, Jaspreet Singh: https://finconexpo.com/jaspreet-singh/
- White Coat Investor, Jaspreet Singh: https://www.whitecoatinvestor.com/interview-with-jaspreet-singh-of-the-minority-mindset/
- Practical Ecommerce, Brian Feroldi threads: https://www.practicalecommerce.com/building-the-perfect-twitter-thread
- Nathan Barry podcast, Brian Feroldi: https://podcastaddict.com/nathan-barry-archive/episode/148393743
- yespress, Brian Feroldi: https://yespress.io/brian-feroldi.md
- CreatorDB, WhiteBoard Finance: https://creatordb.app/creatorstats/whiteboardfinance/
- Journal of Business (Spokane), cash stuffing / The Budget Mom: https://www.spokanejournal.com/local-news/cash-stuffing-craze-resurfaces/
- Dexerto, cash stuffing: https://www.dexerto.com/entertainment/what-is-tiktoks-viral-cash-stuffing-trend-1909596
- Canstar, TikTok money trends: https://www.canstar.com.au/budgeting/tiktok-money-trends/
- Bustle, 100 Envelope Challenge: https://www.bustle.com/life/hundred-envelope-challenge-tiktok
- TIME, 100 Envelope Challenge: https://time.com/6249003
- Famous Birthdays, Hamish Hodder: https://www.famousbirthdays.com/people/hamish-hodder.html
- CreatorDB, Hamish Hodder: https://creatordb.app/creatorstats/hamishhodder/
- Netflix, How to Get Rich: https://www.netflix.com/gb/title/81410436
- Global Player, Money for Couples: https://www.globalplayer.com/podcasts/42L2vg/
- Inverse, Wealth shown to scale: https://www.inverse.com/input/culture/this-site-visualizes-the-terrifying-levels-of-wealth-inequality-in-the-us
- Kottke, Wealth shown to scale: https://kottke.org/20/05/0036693-a-visualization-of-wealth
- NetWorthSpot, MetaBallStudios: https://www.networthspot.com/metaballstudios/net-worth/
- The National, FinTok: https://thenationalnews.com/business/money/what-is-fintok-and-why-is-it-going-viral-1.1162271
- NBC DFW, TikTok money advice: https://www.nbcdfw.com/news/business/money-report/dont-be-so-quick-to-take-money-advice-from-tiktok-heres-why/3557078/
- YouTube Wiki, Mark Tilbury: https://youtube.fandom.com/wiki/Mark_Tilbury
- Wikipedia, Mark Tilbury: https://en.wikipedia.org/wiki/Mark_Tilbury
- vidanalyze, Mark Tilbury stats: https://vidanalyze.com/channel/marktilbury/statistics
- Sibling research file (vidIQ transcripts, Mr Planktin subscriber count): /home/user/Envelopemath/research/raw/yt-big-number-math.md
