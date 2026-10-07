# YouTube Shorts: everyday personal-finance math (salaries, purchases, debt, budgeting)

Research corpus for **Back of the Envelope / Envelope Math**. Compiled 2026-10-07.
Cluster: everyday money math in YouTube Shorts (salary/tax, house affordability, car loans, credit-card debt, "true cost", budgeting/cash stuffing, girl math, savings-by-age, FIRE, rent vs buy, hourly vs annual pay).

---

## 0. Method, budget and caveats

**Tools:** vidIQ `vidiq_outliers` (contentType `short`, English titles) and `vidiq_video_transcript`. WebSearch was used once for context. `vidiq_watch_shortform_content` was not called; a later stage handles that.

**vidIQ budget used: 20 of 20 calls** (15 outlier searches and 5 transcripts).

| # | Keyword | publishedWithin | sort | limit | Signal |
|---|---|---|---|---|---|
| 1 | salary after taxes breakdown | allTime | viewCount | 20 | Strong: 22.8M taxes-by-country short from a 14.8K-sub channel |
| 2 | how much house can I afford | oneYear | breakoutScore | 20 | Strong, replicable: "Bran the Mortgage Man" wage-specific series |
| 3 | car loan math | allTime | viewCount | 20 | Mixed: big views come from animation comedy and one paid lead-gen ad |
| 4 | credit card minimum payment trap | allTime | breakoutScore | 20 | Big breakout multiples on tiny channels, but low view ceilings (81K–304K) |
| 5 | true cost of | oneYear | viewCount | 20 | Led to the "Cost in Units of ___" format, the biggest find in this cluster |
| 6 | latte factor | allTime | viewCount | 15 | **No finance results.** All 15 were coffee or latte-art videos |
| 7 | cash stuffing envelopes | oneYear | breakoutScore | 20 | Weak: best real cash-stuffing short got 146K. Mostly red envelopes and ASMR |
| 8 | girl math | allTime | viewCount | 20 | Big views, but almost all comedy skits with very little math |
| 9 | how much should I have saved by 30 | allTime | breakoutScore | 20 | Mid: savings-by-age charts get 30K–140K. Brand content tops the list |
| 10 | FIRE 4% rule retire early math | allTime | viewCount | 20 | Weak: best finance result is 94K. Mostly unrelated "rule" videos |
| 11 | rent vs buy math | oneYear | breakoutScore | 20 | Payback and cost comparisons win ("$3k car rents for $400/wk", 5.19M). Literal rent-vs-buy is weak |
| 12 | hourly wage per year | oneYear | viewCount | 20 | Strong: "HOURLY VS SALARY" 6.3M, a "wage per hour" series, a Minecraft explainer |
| 13 | *(adjacent)* cost in units of | oneYear | viewCount | 20 | **Exploding format:** 30.6M, 14.9M, 9.9M, 4.3M, 2.6M, 1.8M, 1.7M |
| 14 | *(adjacent)* I did the math money | allTime | breakoutScore | 20 | Skits and a lottery-math story. The PadSplit rent-math short reached 601K |
| 15 | *(adjacent)* paycheck budget breakdown | oneYear | viewCount | 20 | Formula listicle (816K from 1.48K subs) and "budget my paycheck with me" |

Transcripts pulled: `3EQfIGdT54E`, `4F1Gqy069IU`, `0dK1u1hWJB4`, `z_fN85fAbkM`, and `NHbMe2F_JXY`. The last one returned **"No transcript available"**, which suggests it has no spoken track.

**Caveats (read before using the numbers):**
- **The vidIQ index is skewed toward recent uploads.** Even with `allTime`, almost every result was published between Oct 2025 and Oct 2026. Classic evergreen hits from 2021–2024 do not appear here, so this is a picture of what is breaking out now.
- **Subscriber counts are current, not counts at upload time.** Channels may have grown because of the viral video.
- **Breakout score** is vidIQ's multiple of the channel's typical views. A value of `0` means vidIQ did not compute it. It does not mean the video had zero breakout.
- **Some breakouts are paid ads, not organic content.** Treat these as non-replicable:
  - `4F1Gqy069IU` (AutoBuddy: 239 subs, 2.33M views). The transcript is a lead-gen pitch: "Links below. free 60-second quiz…".
  - `eqJHuCe02cs` (ADNOC credit-card promo, 4.35M views).
  - Probably `wYbnUpVpOKo` (RBC, 236K views, breakout 2,290).
- **YouTube and i.ytimg.com are blocked by the egress proxy**, so I could not watch videos or view thumbnails. A "Format" entry is **confirmed** only when it comes from a transcript. Entries marked *(inferred)* are based on the title, tags, channel name and duration, and the watch stage should check them.

---

## 1. Top examples table (sorted by views; personal-money-math relevant)

`V/S` = views ÷ current subscribers, a rough "reach beyond the audience" ratio. Subs and views come from vidIQ on 2026-10-07.

| # | Title (verbatim) | Creator | Subs | Views | Breakout | V/S | Dur (s) | Published | URL | Format | Hook (title, or spoken where transcribed) |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Cost in Units of RTX 5090 | HD Guy | 188K | 30,575,734 | 62.5 | 163 | 26 | 2026-08-25 | https://www.youtube.com/shorts/E2oVrAwHDOw | Unit-conversion list; likely text and music with no VO *(inferred, see #6)* | Title: "Cost in Units of RTX 5090" |
| 2 | what you get after Taxes hit your pocket 🌎 | RealEstate with AJ | 14.8K | 22,816,685 | 17,564.8 | 1,542 | 31 | 2026-01-13 | https://www.youtube.com/shorts/3EQfIGdT54E | Two-voice Q&A list: same $1M salary, take-home % by country (Hindi) **(transcript)** | Spoken: "1 मिलियन सैलरी इन इंडिया। 30% गवर्नमेंट का 70% आपका।" ("1 million salary in India. 30% is the government's, 70% is yours.") |
| 3 | It pays to know math 🛍️ #skit #math #money #soccer | Amyinnewport | 212K | 16,691,678 | 83.9 | 79 | 26 | 2026-06-23 | https://www.youtube.com/shorts/5gRH3mMSfvw | Live-action shopping-math skit *(inferred from #skit)* | Title |
| 4 | Cost in Units of iPhone 17 Pro | InFocus | 3.49K | 14,909,673 | n/a (0) | 4,272 | 11 | 2026-09-08 | https://www.youtube.com/shorts/MiwPs13cYkk | Copy of the HD Guy unit-conversion format, timed to the iPhone launch *(inferred)* | Title: "Cost in Units of iPhone 17 Pro" |
| 5 | Car Guys Math 💀 | Lugan3d Animations | 694K | 13,997,365 | 1.6 | 20 | 28 | 2026-09-15 | https://www.youtube.com/shorts/jNDa5cK2LYk | 3D-animated comedy *(inferred from channel)*. Big channel, not a breakout | Title |
| 6 | Cost in Units of Starbucks Lattes | HD Guy | 188K | 9,858,055 | 106.2 | 52 | 40 | 2026-08-10 | https://www.youtube.com/shorts/NHbMe2F_JXY | Unit conversion. **No transcript available, so likely no VO** (text and music) | Title: "Cost in Units of Starbucks Lattes" |
| 7 | getting paid after taxes | WOW Moments | 1.69M | 6,974,175 | 74.6 | 4 | 17 | 2026-05-19 | https://www.youtube.com/shorts/YWXQY80tEfc | Meme clip (tags: memes, funny) | Title |
| 8 | HOURLY VS SALARY #shorts | Sharp Knife Shop | 255K | 6,334,692 | 127.2 | 25 | 17 | 2026-09-25 | https://www.youtube.com/shorts/i6CFQqrDoyY | A-vs-B comedic comparison from a non-finance channel *(inferred)* | Title: "HOURLY VS SALARY" |
| 9 | A car you can buy for $3k and rent for $400 weekly | Kel King | 9.16K | 5,189,444 | 1,131.1 | 567 | 7 | 2026-01-27 | https://www.youtube.com/shorts/KnC5kPBGiJ4 | 7-second payback claim (tags: car rental business) *(inferred)* | Title contains the whole math: $3k cost vs $400/wk revenue |
| 10 | Cost in Units of Monster Energy | HD Guy | 188K | 4,333,679 | 28.9 | 23 | 29 | 2026-09-18 | https://www.youtube.com/shorts/jlKUWdrrqEI | Unit conversion *(inferred)* | Title |
| 11 | How much money I saved living extremely frugal this year | Bradley on a Budget | 259K | 3,895,564 | 5.3 | 15 | 179 | 2025-12-31 | https://www.youtube.com/shorts/jYhvZInAgQI | Frugal-vlog year-end number reveal *(inferred)* | Title |
| 12 | How I Used Math to Beat the Lottery for $15,000 #shorts #gambling #mindset | Mindception | 294K | 3,578,655 | 26.0 | 12 | 60 | 2026-08-28 | https://www.youtube.com/shorts/twXXW7es414 | Narrated money story with a probability angle *(inferred)* | Title |
| 13 | Car Loan vs Cash Payment | the bald trader | 207K | 3,197,058 | 17.7 | 15 | 65 | 2026-08-01 | https://www.youtube.com/shorts/_pgaOXQ4Vhw | Explainer: car EMI vs paying cash and keeping the fixed deposit (tags: EMI, FD interest, reducing balance) *(inferred)* | Title |
| 14 | Are all inclusive's less than rent? | Live The Dash | 470K | 2,674,492 | 58.6 | 6 | 77 | 2026-08-25 | https://www.youtube.com/shorts/Efm-YUd-68Q | Travel-vlog cost comparison: holiday per month vs rent *(inferred)* | Title (question) |
| 15 | Cost in Gigabytes of DDR5 RAM | The Bravest On Duty | 3.36K | 2,587,866 | 51.5 | 770 | 26 | 2026-09-27 | https://www.youtube.com/shorts/Bje9Muj0P00 | Copy of the unit conversion, using a scarce "currency" (RAM) *(inferred)* | Title |
| 16 | My Car Loan is HOW MUCH?! You WONT Believe It! | AutoBuddy | 239 | 2,328,824 | 7,210.0 | 9,744 | 77 | 2026-04-14 | https://www.youtube.com/shorts/4F1Gqy069IU | **Paid lead-gen ad** styled as a street interview **(transcript)** | Spoken: "Excuse me. Quick question. How much are you paying a month for your car loan?" |
| 17 | Cost in Units of Red Bull | Cost of War | 841 | 1,763,358 | 66.8 | 2,097 | 19 | 2026-09-25 | https://www.youtube.com/shorts/_dSLFJhgWNg | Copy of the unit conversion from a tiny military-cost channel *(inferred)* | Title |
| 18 | Cost in Units of Big Macs | HD Guy | 188K | 1,748,742 | 56.8 | 9 | 33 | 2026-08-02 | https://www.youtube.com/shorts/Hv6aZR4hUEI | Unit conversion *(inferred)* | Title |
| 19 | The Livable Wage In 2026 For The Average American | Freddie Smith | 259K | 1,487,547 | 18.5 | 6 | 166 | 2026-03-30 | https://www.youtube.com/shorts/Txygzw4TciI | Long talking-head cost-of-living math *(inferred)* | Title |
| 20 | Mitch McConnell earns $193,000 per year #shorts | AR World | 5.07K | 1,463,241 | 24.0 | 289 | 6 | 2026-05-13 | https://www.youtube.com/shorts/zSFVFAB5g2E | 6-second famous-person salary card *(inferred)* | Title: a named person plus an exact dollar figure |
| 21 | Girls doing Girl Math | Colette Lecates | 60.6K | 1,309,624 | 13.6 | 22 | 42 | 2026-03-07 | https://www.youtube.com/shorts/G9K57AD5mAg | Comedy sketch *(inferred)* | Title |
| 22 | 8th pay commission basic salary #8thpaycommission #salary #basicpay | Study with Abhi | 9.1K | 1,299,315 | 853.2 | 143 | 9 | 2026-08-07 | https://www.youtube.com/shorts/9vXOS5nIIB8 | 9-second Indian pay-scale number card (news-driven) *(inferred)* | Title |
| 23 | minimum wage explained using minecraft #shorts | Explained Using Minecraft | 5.77K | 1,144,959 | 100.9 | 198 | 79 | 2026-09-27 | https://www.youtube.com/shorts/PemdtWMd_OM | Gameplay "skin" over an economics explainer *(inferred from channel)* | Title |
| 24 | Drain cleaner wage per hour #fyp #foryou #viral | Wage Per Hour | 4.9K | 843,623 | 125.8 | 172 | 61 | 2026-09-15 | https://www.youtube.com/shorts/79-AczbfbYc | Repeatable series: "[job] wage per hour" *(inferred from channel)* | Title |
| 25 | How I Split Every Paycheck (The Exact 5 Percentages) | Joey Viola | 1.48K | 815,565 | 565.9 | 551 | 40 | 2026-08-09 | https://www.youtube.com/shorts/z_fN85fAbkM | Numbered formula listicle with ×0.55, ×0.05, ×0.10, ×0.15, ×0.15 **(transcript)** | Spoken: "Number one, take your monthly income and multiply it by 0.55." |
| 26 | How much house can you afford making $33/hour? 💰🤔 #mortgagetips | Bran the Mortgage Man | 41.8K | 805,550 | 172.0 | 19 | 99 | 2026-08-03 | https://www.youtube.com/shorts/0dK1u1hWJB4 | Worked calculation, step by step, in reply to a viewer-style question **(transcript)** | Spoken: "Hey Brandon, how much house can I afford making $33 an hour?" / "Come here, let's do the math real quick." |
| 27 | Can someone help me girl math this #ladieswatches | Kira Kirby | 14.8K | 697,591 | 165.0 | 47 | 11 | 2026-08-01 | https://www.youtube.com/shorts/EfnJqXxsrg4 | Girl-math request clip asking viewers to justify a purchase *(inferred)* | Title is a comment-bait request |
| 28 | What 1GB of RAM Cost Every Year 📉📈 1980 to 2026 | Silicon Mountain Media | 9.71K | 647,421 | 44.7 | 67 | 31 | 2026-09-30 | https://www.youtube.com/shorts/5KpJov0U-Ro | Year-by-year price ticker *(inferred)* | Title |
| 29 | I Did the Math—And I Was Spending Way Too Much on Rent | PadSplit | 3.53K | 600,876 | 26.8 | 170 | 45 | 2026-06-25 | https://www.youtube.com/shorts/XL-nrLrpKK0 | Brand testimonial with rent math (may be promoted) *(inferred)* | Title: "I Did the Math…" |
| 30 | How Much Money Will a Tesla Cybercab Actually Make Per Year? | The Real Oshow | 52.1K | 556,210 | 123.1 | 11 | 59 | 2026-09-10 | https://www.youtube.com/shorts/Xp6ryufGrAA | **Fermi-style revenue estimate**, the closest match to envelope math *(inferred)* | Title (question with "Actually") |
| 31 | Budgeting my Taco Bell paycheck!!✨🌮💰 #budget | Fairy Tanton | 43.6K | 501,897 | 108.2 | 12 | 134 | 2025-12-06 | https://www.youtube.com/shorts/JV6_pyDpBI4 | "Budget with me" for a relatable low-wage job *(inferred)* | Title |
| 32 | Why should I pay rent in dubai ??? | Zoheb Sayyed | 10.6K | 500,948 | 241.7 | 47 | 110 | 2026-10-03 | https://www.youtube.com/shorts/opnvVsLcpVo | Rent-vs-buy talking head (Dubai) *(inferred)* | Title |
| 33 | Making $100,000 per year? This is how much house you can afford 🏠#mortgagetips #homebuyertips | Bran the Mortgage Man | 41.8K | 328,628 | 81.1 | 8 | 110 | 2026-08-11 | https://www.youtube.com/shorts/bZ-Y19PyCzA | Same worked-calculation series as #26 | Title |
| 34 | The True Cost of the iPhone Duo Around the World! 📱 | Real Money Patterns | 20.8K | 318,704 | 83.9 | 15 | 57 | 2026-10-01 | https://www.youtube.com/shorts/Ffhmk3i7IAo | Price × geography comparison *(inferred)* | Title |
| 35 | Stop Paying the Minimum on Credit Cards. It's Keeping You in Debt #credit #creditcard #creditscore | David Sklar & Associates | 1.36K | 303,523 | 1,227.8 | 223 | 85 | 2026-03-25 | https://www.youtube.com/shorts/XCmCiQaEg3k | Expert talking head (insolvency trustee) *(inferred)* | Title (imperative) |
| 36 | Budget my $13k paycheck with me #budgetingtips #budgeting #budgetwithme | With The Aims | 4.63K | 295,605 | 44.4 | 64 | 135 | 2025-10-13 | https://www.youtube.com/shorts/NfaqZKLoSkk | "Budget with me" for a large paycheck *(inferred)* | Title |
| 37 | Estimating Labor: General Contractor's Hourly Wage Breakdown #shorts | The General Contractor Network | 2.35K | 270,162 | 216.7 | 115 | 94 | 2025-10-31 | https://www.youtube.com/shorts/tYo7lCD6i1c | Trade-business hourly cost breakdown *(inferred)* | Title |
| 38 | The True Cost of a "Free" Car! 🚗 | Real Money Patterns | 20.8K | 229,210 | 57.8 | 11 | 59 | 2026-09-20 | https://www.youtube.com/shorts/TNL4trcoLjw | Hidden-cost breakdown *(inferred)* | Title (scare quotes on "Free") |
| 39 | 🦈 These percentages are based on your monthly net income (after taxes), not your gross paycheck. | Dallin \| Finance Bro (Minus the Tesla) | 1.08K | 207,088 | 245.1 | 192 | 46 | 2026-08-05 | https://www.youtube.com/shorts/gKR7rg_SdfE | Budget-percentages listicle *(inferred)* | Title |
| 40 | Cash stuffing $30 #cashstuffing #cashstuffingenvelope #savingchallenge #money #reels #viral | The Orderly Mom | 7.8K | 146,449 | 130.3 | 19 | 45 | 2025-10-09 | https://www.youtube.com/shorts/d_-p-WObgGA | Cash-stuffing ASMR with a small dollar amount *(inferred)* | Title |
| 41 | How Much Should You Have Saved for Retirement: Average 401(K) Balance by Age | America's Wealth Management Show | 9.79K | 137,861 | 99.6 | 14 | 51 | 2026-08-27 | https://www.youtube.com/shorts/a9jI9wi3K60 | Benchmark-by-age chart *(inferred)* | Title |
| 42 | If I give you 25 $20 bills. How much money do you have ? | Teacherman 91 | 104K | 126,371 | 109.8 | 1.2 | 22 | 2026-08-27 | https://www.youtube.com/shorts/fyqJusHJw1c | Mental-math quiz on the street *(inferred)* | Title: a quiz question |
| 43 | Why you must pay more than minimum monthly payment to paydown loans faster | Martin Morris | 1.2K | 80,866 | 40,433 | 67 | 162 | 2025-11-22 | https://www.youtube.com/shorts/zIrTpTBvjr8 | Amortization explainer *(inferred)* | Title |
| 44 | Why Most People Stay Broke After Getting a Salary | jalal trader | 101 | 49,629 | 1,341.0 | 491 | 44 | 2026-09-16 | https://www.youtube.com/shorts/QptRrxYIDYM | Motivational money explainer *(inferred)* | Title |

**Excluded as off-topic despite high views:**
- `kx-LNsh2C_A` "A man revealed the true cost of his medication": 13.8M views, health clip.
- `TN_yDx4IKhc` "Honest budget breakdown" (wedding outfit): 4.84M views.
- `Q0mhLCB2gJM` Jenny Hoyos "How Much Money Can I Find Around the House?": 3.95M views on a 12.4M-sub channel, so not a breakout.
- `eqJHuCe02cs` ADNOC credit-card ad: 4.35M views.
- `NZMOlECLcuM` "Ranking Funniest Credit Card Roulette": 12.9M views, a prank compilation.
- All "latte factor" results, which were coffee-art videos.

### 1a. Timeline of the "Cost in Units of ___" series (all from vidIQ)

HD Guy (UCWpAMkeoxG8bi7pIf4OmGEA, 188K subs):

| Video | Published | Views |
|---|---|---|
| Single Family Homes | 2026-07-26 | 75,736 |
| Teslas | 2026-07-31 | 157,578 |
| Big Macs | 2026-08-02 | 1,748,742 |
| PS5 Consoles | 2026-08-03 | 241,339 |
| **Starbucks Lattes** | 2026-08-10 | **9,858,055** |
| Chipotle Burritos | 2026-08-13 | 911,479 |
| RAM | 2026-08-24 | 754,842 |
| **RTX 5090** | 2026-08-25 | **30,575,734** |
| Monster Energy | 2026-09-18 | 4,333,679 |

Copycat channels that appeared within weeks:

| Channel | Subs | Video | Published | Views |
|---|---|---|---|---|
| InFocus | 3.49K | **iPhone 17 Pro** | 2026-09-08 | **14,909,673** |
| InFocus | 3.49K | KFC Buckets | 2026-09-27 | 169,324 |
| Cost of War | 841 | Robux | 2026-09-17 | 44,977 |
| Cost of War | 841 | V-Bucks | 2026-09-20 | 50,887 |
| Cost of War | 841 | **Red Bull** | 2026-09-25 | **1,763,358** |
| The Bravest On Duty | 3.36K | **DDR5 RAM** ("Cost in Gigabytes of…") | 2026-09-27 | **2,587,866** |
| The Bravest On Duty | 3.36K | Mustang S550 GT | 2026-10-04 | 302,981 |

**What the timeline shows:**
- The format is **under three months old**.
- Copies from channels with under 5K subs are still hitting 1.7M–14.9M views. This is the strongest evidence in this cluster that a brand-new channel can break out with a unit-conversion format.
- vidIQ tags HD Guy's and Cost of War's videos with the topic "Military", and one channel is literally named "Cost of War". This suggests the expensive things being converted are often military hardware (for example, "a jet costs N lattes"). That is an inference the watch stage should confirm.
- The "unit" is always a cheap, recognisable, often youth-coded consumer item: lattes, Big Macs, Monster, Red Bull, Robux, V-Bucks, RTX 5090, RAM.
- The two biggest copies, RTX 5090/RAM and iPhone 17 Pro, use the **hot price story of the moment** as the unit. RTX 5090 and DDR5 prices roughly doubled in 2026 ([PCWorld](https://www.pcworld.com/article/3081160/neweggs-7500-rtx-5090-card-is-a-sad-depressing-omen.html)), and the iPhone 17 Pro short went up the week of launch.

---

## 2. Transcripts (verbatim) and structure

### 2.1 `3EQfIGdT54E`: "what you get after Taxes hit your pocket 🌎" (22.8M views, 14.8K subs, 31s)

Verbatim (Hindi):
> 1 मिलियन सैलरी इन इंडिया। 30% गवर्नमेंट का 70% आपका। और कनाडा में? कनाडा में 50% गवर्नमेंट का 50% आपका। और यूके में यूके में 40% गवर्नमेंट का 60% आपका। और यूएसए में? यूएसए में 26% गवर्नमेंट का बाकी आपका। एक्सक्यूज मी, व्हाट्स अबाउट सिंगापुर? अह सिंगापुर में 24% गवर्नमेंट का बाकी आपका। अच्छा तो दुबई में? दुबई में नो टैक्स सब कुछ आपके पॉकेट पर। आपके पॉकेट में।

Translation:
> 1 million salary in India: 30% the government's, 70% yours. And in Canada? 50/50. And the UK? 40% government, 60% yours. And the USA? 26% government, the rest yours. "Excuse me, what about Singapore?" 24% government. "OK, and Dubai?" Dubai: no tax, everything goes in your pocket.

**Structure:**
- **Fixed input:** one salary held constant, so only the country changes.
- **Rhythm:** a call-and-response list with the cadence "X% government's, Y% yours". There are 6 beats in 31s, about one every 5s.
- **Payoff at the end:** the list builds toward the extreme case (Dubai, 0%). That ending works as both the punchline and the reason to rewatch.
- **Interruption:** a second voice cuts in ("Excuse me, what about Singapore?"). This mimics a commenter and keeps the list from feeling flat.
- **Comment bait:** the numbers are simplified headline percentages. Leaving out countries and rounding contestable figures invites "you forgot X" and "that's wrong" comments. This is a hypothesis; the comments were not pulled.
- **Reach:** the 🌎 emoji and cross-country framing give it global appeal, and the percentages are language-agnostic, which helps explain 1,542× views/subs.

### 2.2 `0dK1u1hWJB4`: "How much house can you afford making $33/hour? 💰🤔" (806K views, 41.8K subs, 99s)

Verbatim (excerpt; the full text follows the same pattern):
> Hey Brandon, how much house can I afford making $33 an hour? >> Come here, let's do the math real quick. All right, Megan, so you said you make $33 an hour and we're saying you work 40 hours per week… $1,320 per week… multiply that by the 52 weeks… 68,640. We divide it by 12… $5,720. We multiply by 50% because we can use half of that towards your total debt, $2,860… taxes… $400… insurance… 200… mortgage insurance… $200… $2,060 for principal, interest… $1,000 borrowed at a rate of 6.5% equals $6.32… divide it by $6.32… 325.944. We multiply it by 1,000… $325,944, which means that you can purchase a home for $343,000 putting 5% down based on your income of $33 an hour.

**Structure:**
- **Opening:** a viewer persona asks a question containing an exact wage, then "Come here, let's do the math real quick". The hook arrives in the first 3 seconds and promises a personal answer.
- **Device:** a chain of about 10 arithmetic steps, each a running total (×40, ×52, ÷12, ×50%, −400, −200, −200, ÷6.32, ×1000). Each step is a small "click", and the viewer has to stay to see the answer.
- **Rule of thumb:** "$1,000 borrowed at 6.5% equals $6.32/month" is a back-of-envelope constant, essentially **envelope math**.
- **Payoff:** the final number ($343,000) lands in the last ~3 seconds, so there is no reason to swipe early.
- **Series engine:** the same channel repeats the format with different incomes (each row was returned by vidIQ):

| Title | Views |
|---|---|
| $33/hr | 806K |
| $100K/yr | 329K |
| $15/hr + $25/hr | 124K |
| $100K (older) | 84K |
| $150K | 26K |

  Copycats use the same title template: Antonio Cucciniello "$33 an hour" (42K), "$23/Hr" (33K) and "$14.25/hour" (14K); Donovan Tubbs "$20/hr" (51K); Rob Krop "75k income" (15K, 1.11K subs, breakout 34).
- **Comment bait:** every viewer's wage is different, so "do $X/hr next" requests effectively write the series. This is inferred from the series structure; comments were not pulled.

### 2.3 `z_fN85fAbkM`: "How I Split Every Paycheck (The Exact 5 Percentages)" (816K views, 1.48K subs, 40s, breakout 566)

Verbatim:
> Number one, take your monthly income and multiply it by 0.55. That's the maximum you should aim to spend on essential expenses like housing, groceries, and transportation. Number two, take your monthly income and multiply it by 0.05. That's your guilt-free money… Number three… multiply it by 0.1… debt… or investing. Number four… multiply it by 0.15… short-term goals… Number five… multiply it by 0.15… invest long-term wealth every single month. Put those dollars to work instead of wondering where they went. Safe [save] for later.

**Structure:**
- **No intro.** The first words are the first instruction. About 4 words/second, five beats of about 8s each.
- **Device:** one multiplier per bucket. The viewer can run the calculation on their own income while watching, which makes it participatory.
- **Retention:** the numbered list ("Number one… Number five") tells the viewer how much is left.
- **CTA:** the closing "Save for later" is save-bait. Saves are a strong ranking signal on Shorts.
- **Replicable:** this is a 1.48K-sub channel with 551× views/subs. A similar listicle by Dallin (1.08K subs; 207K views; breakout 245) confirms the pattern.

### 2.4 `4F1Gqy069IU`: "My Car Loan is HOW MUCH?! You WONT Believe It!" (2.33M views, 239 subs, 77s). **Paid ad; use the structure, not the numbers.**

Verbatim (opening):
> Excuse me. Quick question. How much are you paying a month for your car loan? Uh, $680 a month. It's killing me. What car? Toyota RAV 4 2023. Mine is $720… $590… And you?… $490. Wait, $490? What car? Rav 4. Like the guy before, actually. How? The last person with a RAV 4 is paying $680. I used this thing called Autobuddy…

**Structure:**
- **Opening:** a street-interview format with social comparison: the same car at different prices ($680 vs $490). Viewers instinctively compare against their own payment.
- **Payoff:** the "how?" reveal sets up the product. The breakout score of 7,210 almost certainly reflects ad spend.
- **Lesson for us:** the "same item, different price" contrast is a strong hook even without ads. AutoBuddy's other organic-looking short "We Asked This Guy What He Pays on His Car Loan…" got 40K views (breakout 40).

### 2.5 `NHbMe2F_JXY`: "Cost in Units of Starbucks Lattes" (9.86M views, 40s)

`vidiq_video_transcript` returned **"No transcript available."** This is consistent with a **no-voiceover format** (on-screen text, visuals and music), which suits faceless production and works across languages. The watch stage should confirm this.

---

## 3. Pattern analysis (with evidence)

### P1. Unit conversion ("Cost in Units of ___") is the biggest money-math format right now, and copies from new channels are working

**Evidence:**
- HD Guy: 30.6M (RTX 5090), 9.86M (lattes), 4.33M (Monster), 1.75M (Big Macs).
- Copies from tiny channels:

| Channel | Subs | Video | Views | Views/subs |
|---|---|---|---|---|
| InFocus | 3.49K | iPhone 17 Pro | 14.9M | 4,272× |
| The Bravest On Duty | 3.36K | DDR5 | 2.59M | 770× |
| Cost of War | 841 | Red Bull | 1.76M | 2,097× |

- All of them are 11–40s long. The one checked transcript was empty (no VO).

**Why it works:**
- One relatable unit turns an incomprehensible price into something the viewer can picture.
- The title is a template, so it is easy to serialise.
- It needs no language and no face.
- The unit choice itself is the hook: lattes call back to the latte factor, RTX/RAM to the 2026 price spike, Robux/V-Bucks to youth culture.

**Relevance to Envelope Math:** this is Fermi estimation in its most viral form. The "latte factor" keyword returned **zero** finance shorts, but "Cost in Units of Starbucks Lattes" got 9.86M. The idea works when it is repackaged as a unit, not taught as a concept.

### P2. Constant-input comparison lists (same salary or price across countries, jobs or cases)

**Evidence:**
- `3EQfIGdT54E`: $1M salary take-home by country. 22.8M views, breakout 17,565, from 14.8K subs.
- `Ffhmk3i7IAo`: iPhone price around the world, 319K, breakout 84.
- `79-AczbfbYc`: the "[job] wage per hour" series, 844K, breakout 126, from 4.9K subs.
- `zSFVFAB5g2E`: "Mitch McConnell earns $193,000 per year", 1.46M in 6s from 5.07K subs.

**Mechanics:**
- Hold one number fixed and vary only one thing, so each beat is instantly comparable.
- Run the list in escalating order and end on the extreme (Dubai at 0%).
- Every omission or rounding becomes comment fuel.

### P3. Personal-number "how much can you afford on $X" worked calculations, built as a series of comment requests

**Evidence:** the Bran the Mortgage Man series (806K / 329K / 124K / 84K; the top one has breakout 172) plus at least three copycat channels using identical title templates.

**What drives it:**
- The hook is the viewer's own number. The title states an exact wage ("$33/hour", "$100,000 per year", "$15/hr + $25/hr").
- The worked arithmetic is visible and step by step, with a single answer revealed at the very end.

**Length:** these run 93–111s. That is long for Shorts but holds up because each step is a mini-reveal. Views per video are lower (100K–800K) than for P1 and P2, but the format is reliably repeatable.

**Envelope twist:** replace the 10-step bank-style calculation with a 3-step envelope estimate and the "6.32 per $1,000" style rule-of-thumb constant. That gives a shorter video with the same payoff.

### P4. Formula and percentage listicles ("multiply your income by 0.55")

**Evidence:**
- `z_fN85fAbkM`: 816K views from 1.48K subs (breakout 566).
- `gKR7rg_SdfE`: 207K views from 1.08K subs (breakout 245).
- Both are 40–46s, open with no intro, use a numbered list, and end with save-bait.

**Mechanics:**
- **Participatory math:** the viewer runs the calculation on their own income while watching.
- **Saves:** "save for later" content earns saves.

**Risk:** generic advice that is easy to copy. The differentiator would be showing the calculation on an actual envelope, cash split into physical envelopes.

### P5. A-vs-B contrast titles (hourly vs salary, loan vs cash, holiday vs rent)

**Evidence:**
- "HOURLY VS SALARY": 6.33M views, breakout 127 (from a knife shop, a non-finance channel).
- "Car Loan vs Cash Payment": 3.20M.
- "Are all inclusive's less than rent?": 2.67M.
- "Rent vs. Buy: The Hidden Math of Mumbai Real Estate": 112K.

**Mechanics:** a binary frame forces the viewer to pick a side in the comments. The surprising version, where the "obviously expensive" option wins (holiday cheaper than rent), does better than a neutral comparison.

**Note:** literal "rent vs buy" titles underperform. The winners recast the comparison with a surprising pairing.

### P6. Payback or "this pays for itself in N weeks" shock math in under 10 seconds

**Evidence:** `KnC5kPBGiJ4`, "A car you can buy for $3k and rent for $400 weekly": **5.19M views in 7s**, breakout 1,131, from 9.16K subs.

**Mechanics:**
- The entire calculation sits in the title. The viewer does the division ($3k ÷ $400 ≈ 7.5 weeks) in their head, and that realisation is the payoff.
- 7 seconds means near-certain loops, which push average view duration above 100%.

**Envelope twist:** this is the purest back-of-envelope hook: two numbers on an envelope and a slash.

### P7. Social-comparison number reveals (street interviews, salary cards, "what do you pay?")

**Evidence:**
- AutoBuddy's interview format: 2.33M, paid.
- "Mitch McConnell earns $193,000 per year": 1.46M.
- "Salary After 5 Years in Corporate America" (MoneyCoachDave): 18K views. Modest, but the same trope.
- "If I give you 25 $20 bills. How much money do you have?" (Teacherman): 126K, breakout 110.

**Mechanics:** people compare their own number against someone else's. A quiz-question title ("How much money do you have?") turns the comment section into an answer section.

### P8. Debt-trap math has big breakout multiples but low ceilings

**Evidence:**
- "Stop Paying the Minimum on Credit Cards…": 304K, breakout 1,228, 1.36K subs, 85s.
- "Why you must pay more than minimum…": 81K, breakout 40,433 (!), 1.2K subs, 162s.
- "Paying only the minimum on your credit card? Here's what really happens": 20K.

**Reading:** these are evergreen, search-driven explainers that over-perform tiny channel baselines but rarely go mass-viral. None in the vidIQ index broke 500K. The minimum-payment shock ("this takes N years") likely needs a P1 or P6 visual skin to break out.

### P9. Borrowed "skins" from entertainment widen reach beyond finance audiences

**Evidence:**
- "minimum wage explained using minecraft": 1.14M views, breakout 101, from 5.77K subs.
- "Car Guys Math 💀" (3D animation): 14.0M, but from a 694K channel.
- "It pays to know math 🛍️ #skit": 16.7M.
- "Girls doing Girl Math" (sketch): 1.31M.

**Mechanics:** the finance content rides on a format the audience already binges (Minecraft, animation, sketches), and the math is the twist inside.

**Caveat:** the big girl-math and skit numbers come from comedy channels with very little math. "Girl math" outliers are mostly breakout 8–44, so the trend looks mature. The most finance-like girl-math clip, "Can someone help me girl math this #ladieswatches" (698K, breakout 165), is a comment-bait request rather than a lesson.

### P10. Topical price hooks multiply reach

**Evidence:**
- Cost in Units of RTX 5090: 30.6M.
- Cost in Units of RAM: 755K.
- Cost in Gigabytes of DDR5: 2.59M.
- What 1GB of RAM Cost Every Year: 647K, published 2026-09-30.
- iPhone 17 Pro: 14.9M, launch week.
- India's 8th Pay Commission salary cards: 1.30M, breakout 853. Multiple 5–10s videos from 3–9K-sub channels hit 200K–1.97M.
- "The Livable Wage In 2026": 1.49M.

**Mechanics:** a price that is in the news at that moment, expressed in a simple calculation, beats evergreen topics.

### P11. Literal "classic personal-finance" keywords are weak on Shorts right now

| Keyword | Best relevant result |
|---|---|
| latte factor | 0 finance results |
| FIRE / 4% rule | 94K |
| cash stuffing | 146K (ASMR, not math) |
| saved by 30 | best organic about 138K |

Brand and ad content (RBC, ADNOC) inflates the breakout lists.

**Implication:** keep these ideas, but deliver them in P1, P2 or P6 packaging. Do not title videos with the jargon. For example, the 4% rule becomes "How many lattes a day can $1M buy forever?".

### P12. Hook mechanics observed (first 1–3 seconds)

| Hook type | Example | Source |
|---|---|---|
| Number-first statement | "1 million salary in India. 30% government's, 70% yours." | `3EQfIGdT54E` |
| Instruction-first | "Number one, take your monthly income and multiply it by 0.55." | `z_fN85fAbkM` |
| Viewer question plus a promise to compute | "How much house can I afford making $33 an hour?" → "let's do the math real quick" | `0dK1u1hWJB4` |
| Interruption | "Excuse me. Quick question. How much are you paying a month…" | `4F1Gqy069IU` |
| Title-only template, no VO | "Cost in Units of ___" | `NHbMe2F_JXY` |

**Patterns:**
- Titles almost always contain **a specific dollar figure or percentage**: $33/hour, $3k / $400, $193,000, $1 million, 0.55, $13k, $1700.
- Titles also use **question forms** ("Are all inclusive's less than rent?", "How Much Money Will a Tesla Cybercab Actually Make Per Year?").
- The word "Actually" or "REALLY" signals a myth-bust.

### P13. Length and payoff timing

- **Durations of the top 10 relevant videos by views:** 26, 31, 26, 11, 28, 40, 17, 17, 7, 29 seconds, a median of about 26s. The mass-viral (over 5M) end is dominated by **7–40s visual or list formats**.
- **The "worked math" formats** (P3, P8, livable wage) run 85–166s and top out around 0.3–1.5M, but they break out reliably on small channels.
- **Payoff timing is consistently at the very end:**
  - the final country (Dubai at 0%)
  - the final number ($343,000)
  - the final bucket plus "save for later"
  - the payback ratio left implied in a 7s clip (resolved by the viewer, which drives loops)

### P14. Loop and comment bait devices

- **Ending on the extreme or the answer** sends viewers back to the start to re-check the numbers (`3EQfIGdT54E`, `KnC5kPBGiJ4`).
- **Template series invite requests:** "do $25/hr", "do it in Big Macs" (Bran; HD Guy). HD Guy changed the unit nine times in two months.
- **Contestable rounding and omissions** ("what about Singapore?" is literally written into the 22.8M script).
- **Direct asks:**
  - "Can someone help me girl math this" (698K)
  - "Comment «Budget» and I'll send you my spreadsheet" (`L37CJmCpEdI`, 18K)

### P15. Which top performers are true breakouts from small channels?

**Organic small-channel breakouts (subs under 15K and views over 500K), the evidence that a zero-subscriber channel can do this:**

| Video | Subs | Views | Views/subs |
|---|---|---|---|
| `3EQfIGdT54E` (taxes by country) | 14.8K | 22.8M | 1,542× |
| `MiwPs13cYkk` (Cost in Units of iPhone 17 Pro) | 3.49K | 14.9M | 4,272× |
| `KnC5kPBGiJ4` (car payback) | 9.16K | 5.19M | 567× |
| `Bje9Muj0P00` (DDR5 units) | 3.36K | 2.59M | 770× |
| `_dSLFJhgWNg` (Red Bull units) | 841 | 1.76M | 2,097× |
| `zSFVFAB5g2E` (senator salary) | 5.07K | 1.46M | 289× |
| `9vXOS5nIIB8` (pay-commission card) | 9.1K | 1.30M | 143× |
| `PemdtWMd_OM` (Minecraft minimum wage) | 5.77K | 1.14M | 198× |
| `79-AczbfbYc` (wage per hour) | 4.9K | 844K | 172× |
| `z_fN85fAbkM` (paycheck percentages) | 1.48K | 816K | 551× |
| `XL-nrLrpKK0` (PadSplit "I did the math", possibly promoted) | 3.53K | 601K | 170× |

**Big-channel hits** (useful for format reference, but not proof a new channel can do it):
- Car Guys Math: 694K subs.
- HOURLY VS SALARY: 255K subs.
- Car Loan vs Cash: 207K subs.
- All-inclusive vs rent: 470K subs.
- Bradley on a Budget: 259K subs.
- Freddie Smith: 259K subs.

**Ads to ignore:** AutoBuddy (`4F1Gqy069IU`), ADNOC (`eqJHuCe02cs`), and probably RBC (`wYbnUpVpOKo`).

---

## 4. Implications for "Back of the Envelope" (hand-off notes; research only)

These follow directly from the evidence above, for the strategy stage:

1. **"Cost in Envelopes of ___" / unit conversion (P1, P10).** This is the highest-ceiling format and has been proven on tiny channels. The brand fit is the Fermi-estimate move of turning a price into a familiar unit.
2. **Same number, different place or job (P2).** Fixed input, escalating list, extreme ending.
3. **"Making $X/hr? Here's the envelope answer" (P3).** A personal-number series fed by comment requests, cut from the 10-step version to 3 envelope steps.
4. **Two-number payback flash in under 10 seconds (P6).** The whole calculation fits on the envelope.
5. **A-vs-B with a surprising winner (P5).**
6. **Cash-envelope splits (P4 plus the #cashstuffing aesthetic).** Physical envelopes visualise the percentage formula. Cash-stuffing alone is weak (146K max), so it needs the math overlay.
7. **Debt-trap math reskinned visually (P8 plus P1).** For example, "your minimum payment in years" shown as envelopes running out.
8. **Topical price of the week (P10).**
9. **Comment-request formats** ("girl math this for me" becomes "envelope math this for me") (P14).
10. **Avoid jargon titles** (latte factor, 4% rule, FIRE) and repackage them into units or payback hooks instead (P11).

**Open questions for the watch stage:**
- What exactly is on screen in "Cost in Units of ___" (military hardware? a count-up animation? music?)
- Whether `3EQfIGdT54E` uses on-screen percentages or only voice.
- The visual style of `KnC5kPBGiJ4` and `i6CFQqrDoyY`.
