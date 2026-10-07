# YouTube Shorts research: money puzzles, quizzes, estimation and business-model math

Cluster: **money puzzles / quizzes / estimation / business-model math** (YouTube Shorts only)
Research date: 2026-10-07
Data source: vidIQ MCP (`vidiq_outliers` with `contentType: "short"`, `vidiq_video_transcript`). All view, subscriber and breakout figures come from vidIQ as of 2026-10-07. Publish dates are converted from vidIQ UNIX timestamps (UTC). "Breakout" is vidIQ's breakoutScore: how many times more views the video got than the channel's typical video.

Evidence labels used below:
- **(T)**: transcript pulled. The hook and structure are quoted from the transcript.
- **(I)**: inferred from the title, channel name, tags, category and duration. The visuals were **not** watched (a later stage runs `vidiq_watch_shortform_content`). Treat the visual format of (I) rows as a hypothesis to check.
- Hook column: for (T) rows, the first spoken line, verbatim. For (I) rows, the title, verbatim. That is the only hook text available.

---

## 1. Method and call log (20 of 20 vidIQ calls used)

| # | Tool | Keyword / video | Window | Sort | Signal quality |
|---|------|-----------------|--------|------|----------------|
| 1 | outliers | "money riddle" | allTime | viewCount | Low. Mostly "money challenge" or saving videos; no true riddles surfaced |
| 2 | outliers | "math trick money" | oneYear | breakoutScore | Mixed. Drinking Math (6.0M, 2,203x), money-trick skits, "Girl Math", Mr. G "Don't get scammed! #math" |
| 3 | outliers | "guess the price" | oneYear | viewCount | **High.** Many tiny-channel breakouts (3,339x, 212x, 174x) |
| 4 | outliers | "1 million dollars or a penny doubled" | allTime | viewCount | **High.** Penny/dilemma cluster, several tiny-channel breakouts |
| 5 | outliers | "how does this company make money" | allTime | viewCount | **High.** Business-model shorts (Fevicol 7.2M / 1,145x, PE 244x, BBQ 51x) |
| 6 | outliers | "how much does a McDonalds franchise make" | allTime | breakoutScore | Medium. Chick-fil-A vs McDonald's (814 subs, 183x), McDonald's 6.5M burgers/day |
| 7 | outliers | "estimation interview question" | allTime | viewCount | Format signal only. Indian "IAS interview question" 4-second trick questions (16.2M); **no Fermi or estimation shorts surfaced** |
| 8 | outliers | "napkin math" | allTime | breakoutScore | **Noise.** Napkin folding and napkin hacks; one finance hit ("Napkin math on XRP price", 31K) |
| 9 | outliers | "lottery odds explained" | allTime | viewCount | Medium. Abhay Create 10M (big channel); Matka business explainer 468x |
| 10 | outliers | "casino house edge math" | oneYear | breakoutScore | Low. Mostly slot vlogs; Bluff 2.7M (craps odds); "Math Genius Outsmarted the Casino" 115x |
| 11 | outliers | "how much money does a youtuber make" | oneYear | viewCount | Medium. Creator-income reveals; CoComelon story 387x |
| 12 | outliers | "is it worth it math" | oneYear | breakoutScore | **Noise.** Generic "worth it" vlogs |
| 13 | outliers | *own:* "how much money per second" | allTime | viewCount | Medium. Per-second framing (Six Flags, America spends $222K/s, $1/s billionaire, Teacherman pick-one) |
| 14 | outliers | *own:* "would you take $1 million or" | oneYear | breakoutScore | **High.** Dilemma format confirmed (735x, 422x, 97.8x) |
| 15 | outliers | *own:* "money puzzle" (requireAllTitleTerms) | allTime | viewCount | Medium. Riddle Math Zone 5-second puzzle 2.79M |
| 16 | transcript | p2Vu4YKeJMM (Teacherman 91, penny vs $1M) | | | (T) |
| 17 | transcript | duL1v9d3HOA (Techtonic, $5 per push-up) | | | (T) |
| 18 | transcript | aIksb0vifn4 (Founder Talk Podcast, Chick-fil-A) | | | (T) |
| 19 | transcript | Oe7Fz1djrDA (Regalis Capital, PE dividend recap) | | | (T) |
| 20 | transcript | M3INFHSjExg (Abdullah Habib, CoComelon "$11M/mo") | | | (T) |

Caveat: even with `publishedWithin: "allTime"`, vidIQ's Shorts outlier index returned almost only videos from Oct 2025 to Oct 2026. Older evergreen hits in this niche are under-represented here.

Supplementary WebSearch for the "napkin math" or "back of the envelope" Shorts landscape found no dedicated Shorts channel. Results were books (Rob Eastaway, *Maths on the Back of an Envelope*; *Guesstimation*) and blog series. YouTube pages could not be fetched (egress blocked), so no visuals were verified on the web.

---

## 2. Top examples table (ranked by views; finance-relevant plus 3 format references)

| # | Title (verbatim) | Creator | Subs | Views | Breakout | Dur (s) | Published | URL | Format | Hook |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Guess the price 💲 | LIE HARD by Gaurav Kapoor | 6,090 | 17,889,341 | 3,339.5x | 48 | 2025-11-06 | https://www.youtube.com/shorts/f_vANVcVHo8 | (I) TV/show clip, guess-the-price game (category "Television program") | "Guess the price 💲" |
| 2 | ias interview question *(format reference, non-finance)* | Arjun kumar pandit | 45,600 | 16,207,916 | 302.0x | 4 | 2026-04-01 | https://www.youtube.com/shorts/FZXl1yPqyiM | (I) 4-second trick-question card | "ias interview question" |
| 3 | Odds of Winning a Lottery | Abhay Create | 3,890,000 | 10,008,006 | 2.5x | 52 | 2025-11-02 | https://www.youtube.com/shorts/Fjv5eMtGzro | (I) probability explainer (visuals unverified) | "Odds of Winning a Lottery" |
| 4 | Inheriting Ten Million Dollars In Pennies 🥴 | Zack D. Films | 28,800,000 | 8,331,003 | 1.89x | 46 | 2026-09-25 | https://www.youtube.com/shorts/58NETNy4gAA | (I) channel house style: 3D-animated "what if" explainer | "Inheriting Ten Million Dollars In Pennies 🥴" |
| 5 | How This Peon Builds a Billion dollar Company ?\|#shorts | Think India | 7,980 | 7,190,255 | 1,145.0x | 38 | 2025-10-09 | https://www.youtube.com/shorts/ZblsUiXANEw | (I) business origin story (tags: fevicol, glue) | "How This Peon Builds a Billion dollar Company ?" |
| 6 | Guess the price! | ShortCircuit | 2,550,000 | 6,966,499 | 65.8x | 22 | 2026-04-03 | https://www.youtube.com/shorts/lwRvNdvs_S0 | (I) gadget unboxing plus price guess | "Guess the price!" |
| 7 | Would You Take $1 Million or This Penny? 🤔 | NYKentertain | 871,000 | 6,932,542 | 1.81x | 33 | 2026-01-20 | https://www.youtube.com/shorts/Th_bC3XeyqA | (I) entertainment/skit dilemma | "Would You Take $1 Million or This Penny? 🤔" |
| 8 | Math Trick #math #mathtricks #mathhacks *(format reference, non-money)* | Drinking Math | 54,400 | 6,045,048 | 2,202.9x | 33 | 2026-04-29 | https://www.youtube.com/shorts/JtqkFomALAk | (I) handwritten mental-math shortcut (tags: Square, Power of 2, Math teacher) | "Math Trick" |
| 9 | This Customer's Money Trick Confused Everyone 😂 | Noah-z2n5o | 13,500 | 3,550,573 | 121.3x | 60 | 2026-07-16 | https://www.youtube.com/shorts/vSxX7jb6Krc | (I) comedy skit around a money/change trick (content unverified) | "This Customer's Money Trick Confused Everyone 😂" |
| 10 | Money Logic Puzzle #shorts #riddlemathzone #maths | Riddle Math Zone | 11,800 | 2,791,507 | 48.7x | 5 | 2025-11-12 | https://www.youtube.com/shorts/S59hm2Q4-_E | (I) 5-second static puzzle card | "Money Logic Puzzle" |
| 11 | The best odds in the casino, virtually 0% house edge. Max odds behind your passline! | Bluff | 955,000 | 2,721,624 | 4.75x | 70 | 2026-05-16 | https://www.youtube.com/shorts/nRe2YCJk9SM | (I) casino-table odds explainer (craps) | title |
| 12 | How Gas Stations Actually Make Money ft. The Fat Electrician | Underground Bullets | 194,000 | 2,361,687 | 2.64x | 35 | 2026-09-07 | https://www.youtube.com/shorts/GokrIEVSuOk | (I) creator-feature clip / talking head | title |
| 13 | MCDONALD'S SELLS 6.5 MILLION BURGERS A DAY AND 5.4 MILLION OF THOSE BURGER AREIN THE UNITED STATES | News nb | 27,900 | 1,817,610 | 39.2x | 48 | 2026-02-08 | https://www.youtube.com/shorts/qJDYZuToRAA | (I) big-number stat card / news-style | title |
| 14 | How do BBQ Restaurants Make Money? 🤑 | Earning Earth | 73,600 | 1,349,147 | 51.2x | 44 | 2026-01-10 | https://www.youtube.com/shorts/HOb2Hspcn3s | (I) business-model breakdown | "How do BBQ Restaurants Make Money? 🤑" |
| 15 | A $25 Million bill with expiration date 🇿🇼 | Alan's Theory | 718,000 | 1,250,254 | 326.9x | 84 | 2026-09-26 | https://www.youtube.com/shorts/d0--sB-Y7Gk | (I) money-object curiosity (Zimbabwe) | title |
| 16 | How a Phone Company Builds a Car Every 76 Seconds | Bradford Manning | 17,200 | 1,203,382 | 28.6x | 107 | 2026-09-28 | https://www.youtube.com/shorts/wXzD6iBNhCw | (I) business story built on a rate stat | title |
| 17 | Does a TikToker make more than a YouTuber? | No Limitations | 4,660 | 1,150,507 | 35.2x | 57 | 2026-02-22 | https://www.youtube.com/shorts/THqSRZ7fe-U | (I) creator-income comparison | title |
| 18 | $1 Million NOW or $5 Per Push-Up? 🤯 | Techtonic | 2,180 | 1,059,551 | 97.8x | 36 | 2026-09-03 | https://www.youtube.com/shorts/duL1v9d3HOA | **(T)** street interview; respondent does live mental math | "You got $5 per push-up for life or $1 million right now. Which are you taking?" |
| 19 | Lottery (Matka) #business Explained | Gaurav Asija | 8,280 | 835,718 | 467.6x | 84 | 2026-04-25 | https://www.youtube.com/shorts/qoXoUyzqod8 | (I) business-model explainer of an illegal lottery | title |
| 20 | America Spends $222,000+ Per Second… | The Iced Coffee Hour | 1,660,000 | 810,279 | 22.3x | 24 | 2025-12-15 | https://www.youtube.com/shorts/2JLqHH6_mjA | (I) podcast clip, per-second stat | title |
| 21 | Take $500,000 Now Or 1 Penny That Multiplies Daily! 😱 #shorts | Cletus | 38,600 | 787,472 | 4.82x | 52 | 2026-09-16 | https://www.youtube.com/shorts/da41ENiYBJU | (I) dilemma (channel category: video game culture) | title |
| 22 | YouTuber makes $11Million/mo in ads | Abdullah Habib | 25,600 | 659,337 | 386.9x | 139 | 2025-11-05 | https://www.youtube.com/shorts/M3INFHSjExg | **(T)** voiceover narrative story (CoComelon) | "So, this couple owns one of the biggest YouTube channels, making millions every single month, and nobody knows who they are." |
| 23 | Girl Math 🩷 I am basically saving him money | TwoTrends Family | 525,000 | 536,984 | 26.6x | 8 | 2026-09-22 | https://www.youtube.com/shorts/j33VVVUk-HE | (I) couple skit, "girl math" meme | title |
| 24 | Would you take $1,000,000… or 1 penny doubled for 30 days? 🤯Most people get this WRONG | Zenwish | 2,680 | 454,859 | 52.0x | 59 | 2026-02-16 | https://www.youtube.com/shorts/a_ot_bqjeDQ | (I) dilemma plus "you're wrong" frame | title |
| 25 | How Instagram Creators Actually Make Money (Most Don't) | Sree Vignesh | 1,830 | 353,950 | 175.5x | 59 | 2026-06-19 | https://www.youtube.com/shorts/nzrQe3Zueww | (I) creator-economy business model | title |
| 26 | How is possible that private equity guys make so much money #business | Regalis Capital | 6,520 | 339,655 | 244.1x | 88 | 2026-09-29 | https://www.youtube.com/shorts/Oe7Fz1djrDA | **(T)** voiceover worked example, multi-step number chain | "How is possible that private equity guys make so much money?" |
| 27 | You can only pick one: $100,000 per day / $100 Million right now / $10,000 per minute / $1,000 per second | Teacherman 91 | 104,000 | 308,972 | 94.0x | 49 | 2026-04-29 | https://www.youtube.com/shorts/4ziWdQ5bvX0 | (I) street-interview multi-option dilemma (same creator as #29) | title (the whole menu is the hook) |
| 28 | The Average Chick-fil-A Location Beats McDonald's Revenue in Six Days Instead of Seven | Founder Talk Podcast | 814 | 308,273 | 182.7x | 46 | 2026-09-09 | https://www.youtube.com/shorts/aIksb0vifn4 | **(T)** podcast/interview clip with an insider | "What does the average Chick-fil-A franchise owner make per year?" |
| 29 | would you take 1 million cash or a penny that doubles for 30 days? | Teacherman 91 | 104,000 | 246,315 | 735.3x | 54 | 2025-12-18 | https://www.youtube.com/shorts/p2Vu4YKeJMM | **(T)** street interview; answer withheld | "Would you take 1 million cash or a penny that doubles for 30 days?" |
| 30 | How much money YouTube paid for 15k views | Amazon and eBay Guru | 28,100 | 237,931 | 71.7x | 21 | 2025-10-29 | https://www.youtube.com/shorts/gwxbENWC_1w | (I) earnings screenshot reveal | title |
| 31 | Don't get scammed! #math | Mr. G - The Joy of Math | 313,000 | 216,020 | 23.7x | 70 | 2026-10-04 | https://www.youtube.com/shorts/pHNuLcE9Nzs | (I) teacher explains a money/scam math point (content unverified). **2 days old, 15,105 views/hour** | "Don't get scammed!" |
| 32 | Would you take the $1 million… if you couldn't spend it on the people who matter most? 🤔💰 | Alaric Moses Ong | 6,480 | 51,481 | 421.8x | 11 | 2026-08-07 | https://www.youtube.com/shorts/z4DXR8vJGTg | (I) 11-second dilemma card | title |
| 33 | How Much Money Does Six Flags Make in Just ONE SECOND? | Technical Thrills | 547 | 50,587 | 17.2x | 26 | 2026-08-29 | https://www.youtube.com/shorts/GjId1RM6maU | (I) per-second business math | title |
| 34 | Former CASINO Manager Ranks Casino Games | Casino Matchmaker | 67,400 | 54,163 | 64.3x | 128 | 2026-08-12 | https://www.youtube.com/shorts/F-ekH-xC8v8 | (I) insider tier-list | title |
| 35 | $1 Per Second… How Long Until You're a Billionaire? #whatif #facts #shorts | Raw Reset | 566 | 21,650 | 43.6x | 61 | 2026-03-14 | https://www.youtube.com/shorts/qas7-Yfwt0Q | (I) what-if time/money conversion | title |
| 36 | How a Math Genius Outsmarted the Casino 🎲 | MotionGA | 44,300 | 18,132 | 114.7x | 44 | 2026-09-15 | https://www.youtube.com/shorts/JtgRWwpjEUc | (I) animated story | title |

Also seen (smaller or less relevant, kept for reference):
- "McDonald's barely makes any money on burgers… It also wouldn't exist without them. 🍔", MoreMozi (148K subs), 135,259 views, 25.9x, 38 s. https://www.youtube.com/shorts/IWKuvyod3uY
- "This Is How Much A McDonalds Manager Makes", Jay Reed (311K), 910,872 views, 30x, 24 s. https://www.youtube.com/shorts/jgGJ1UpKAWs
- "How Much Profit Do We Make On A $1.5 Million Mowing Business?", Will Kelly (15.7K), 52,171 views, 24x, 60 s. https://www.youtube.com/shorts/JLY38AN523s
- "Can you solve Amazon's interview question??", Brainblast SAT Prep App (525K), 117,996 views, 6.3x, 69 s. https://www.youtube.com/shorts/ILUtXocRq0Q
- "Quant Interview Question #quant", quantprof (28.1K), 21,477 views, 8.75x, 33 s. https://www.youtube.com/shorts/hHFi5-bt1E8
- "Napkin math on XRP price.", Jake Claver (210K), 31,266 views, 7.1x, 62 s. https://www.youtube.com/shorts/vjV-cFqywrk (the only "napkin math" finance hit)
- "IAS interview question" (same channel as #2) also hit 4,460,098 (96x), 2,875,652 (21x) and 790,558 (16x), all 4 s long.
- "Guess the price" breakouts on tiny channels: bris (24.9K) 6,805,887 / 212x; Jolene Erdman (4.6K) 3,178,379 / 174x; KarantlyPlaying (1.23K) 513,939 / 46x; Lee Squad Collectibles (3.35K) 207,138 / 40x.

---

## 3. Transcripts: verbatim hooks and structure

### 3.1 Teacherman 91: "would you take 1 million cash or a penny that doubles for 30 days?" (54 s, 735x)
- **0 to 3 s hook:** "Would you take 1 million cash or a penny that doubles for 30 days?"
- Structure: question, then a snap answer ("1 million in cash"), then "Why?", then visible doubt ("Cuz I'm not doing the math… I'm pretty sure it might be more… Hold on, let me think about it"), then the respondent explains doubling out loud ("you have one, then you have two the next day, then you have four"), then flips to the penny. Last line: "I don't know. Is that right? Is that the better choice?"
- **Payoff:** the actual number is **never given**. The answer is left to the comments.
- Math they leave out: starting at 1 cent, day 30 alone = 2^29 cents = **$5,368,709.12**. The 30-day cumulative total = **$10,737,418.23**. The ambiguity (last day or running total) is itself comment fuel.

### 3.2 Techtonic: "$1 Million NOW or $5 Per Push-Up?" (36 s, 97.8x, channel 2,180 subs)
- **Hook:** "You got $5 per push-up for life or $1 million right now. Which are you taking?"
- Structure: respondent picks push-ups, then does live math: "if I do a 100 push-ups, that's $500", then the interviewer converts: "That equals $182,500 per year." Then a break-even: "You'd hit $1 million after 200,000 push-ups." Then a humour beat ("what do you do for a living… push-ups") and a **twist re-hook**: "What if it's a dollar per push-up? Does that change your answer?" It ends unresolved: "I think I'm still doing it. Really?"
- Device: annualise a per-unit rate and compute the break-even quantity. Every number checks out ($5 × 100 × 365 = $182,500; $1M ÷ $5 = 200,000).

### 3.3 Founder Talk Podcast: "The Average Chick-fil-A Location Beats McDonald's Revenue in Six Days Instead of Seven" (46 s, 182.7x, channel 814 subs)
- **Hook:** "What does the average Chick-fil-A franchise owner make per year?"
- Structure: insider answer ("Average volume would be like around 8 million"), context (freestanding plus drive-thru beats mall stores), comparison prompt ("what would McDonald's or Starbucks do… just to compare?"), "McDonald's is usually like 3 to 4 million", then the headline: "So more than double what McDonald's is in six days instead of seven". Then the margin math: a typical restaurant makes about 30% profit margin, and "Chick-fil-A will take 15% just straight up revenue. So that cuts your profit margin from 30% down to 15%."
- Device: **the title is a computed ratio**, not a quote. The editor turned a raw figure into a "six days instead of seven" comparison. The figures are the speaker's claims, not independently checked.

### 3.4 Regalis Capital: "How is possible that private equity guys make so much money" (88 s, 244.1x, 7 days old, 2,109 views/hour)
- **Hook:** "How is possible that private equity guys make so much money?"
- Structure: one hypothetical with round numbers, one new number per sentence: $2M-profit HVAC company bought at 4× = $8M, then $1.6M down and $6.4M bank loan, then a manager is hired and prices go up 8%, so profit goes from $2M to $3M. **Mid-roll re-hook:** "But private equity does something in between, and almost nobody outside that world talks about it. But here's the real money move." Then a refinance at about 3× profit = $9M, which pays off the $6.4M with "about $2.6 million goes into your pocket" ("dividend recap"), then an exit at 7× = $21M. Ends with a CTA to a free guide.
- Device: a number chain that builds to one named secret mechanism. It runs 88 s and still breaks out because every sentence advances the arithmetic.

### 3.5 Abdullah Habib: "YouTuber makes $11Million/mo in ads" (139 s, 386.9x)
- **Hook:** "So, this couple owns one of the biggest YouTube channels, making millions every single month, and nobody knows who they are."
- Structure: a mystery-person narrative (CoComelon founders), 11 years of obscurity, one viral song, then "two and a half billion times every single month… more than the NFL", then subscriber milestones, then the Moonbug sale ("paid 120 million for CoComelon and another channel combined"), then Moonbug sold "for $3 billion". Ends with comment bait: "If you want to know how, comment below and I'll make another video about".
- Device: a story first with numbers as plot beats. The "$11M/mo" title figure is **never derived on screen**. There is room for a version that does the views × RPM math.

---

## 4. Pattern analysis (with evidence)

### P1. The two-option money dilemma with a hidden-math twist is this cluster's most repeatable breakout format for small channels
- Evidence: Techtonic (2,180 subs) 1.06M / 97.8x; Zenwish (2,680 subs) 455K / 52x; Teacherman 91 has two outliers, 735x (penny) and 94x (pick-one per-second menu); Alaric Moses Ong (6,480) 422x; NYKentertain 6.93M on the same penny premise.
- Mechanism: the "obvious" option (lump sum) loses to exponential growth (penny) or to a rate that compounds over time (per push-up, per second). Viewers feel smart if they pick right, and the comments fill with picks and arguments.
- The hook is the dilemma itself, spoken in the first 2 to 3 s and matching the title word for word (3.1, 3.2).
- Payoff is withheld or partial (3.1 never gives the number) or followed by a twist re-hook (3.2: "What if it's a dollar per push-up?").

### P2. "Guess the number" participation games break out on tiny channels again and again
- Evidence: "Guess the price" from LIE HARD (6,090 subs) 17.9M / 3,339x; bris (24.9K) 6.8M / 212x; Jolene Erdman (4.6K) 3.18M / 174x; KarantlyPlaying (1.23K) 514K / 46x; Lee Squad (3.35K) 207K / 40x; ShortCircuit (2.55M) 6.97M / 65.8x.
- Mechanism: one hidden number, a 2 to 4 word title, and a reveal as the payoff. Low effort for the viewer, and it pulls guesses into the comments.
- None of these are math-driven. The guess is a price, not an estimate built from parts. That gap is an opening for an estimation version.

### P3. Ultra-short puzzle or trick-question cards (4 to 11 s) farm loops and comments
- Evidence: Riddle Math Zone "Money Logic Puzzle" 5 s, 2.79M (48.7x); "IAS interview question" channel posted four 4-second shorts at 16.2M / 4.46M / 2.88M / 791K; Alaric Moses Ong dilemma card 11 s, 422x; Girl Math skit 8 s, 537K.
- Mechanism: a question with no answer and a very short runtime gives near-forced rewatches (loop rate above 100%) plus "answer in comments" behaviour. Low production cost.
- Caveat: these are not deep math. They work because they are fast to read and quick to argue about.

### P4. "How [familiar business] ACTUALLY makes money" with one surprising number
- Evidence: Think India (7,980 subs) Fevicol origin 7.19M / 1,145x; Gaurav Asija (8,280) Matka lottery business 836K / 468x; Regalis Capital (6,520) PE 340K / 244x in 7 days; Founder Talk Podcast (814) Chick-fil-A 308K / 183x; Sree Vignesh (1,830) Instagram creators 354K / 175x; Earning Earth (73.6K) BBQ restaurants 1.35M / 51x; Underground Bullets gas stations 2.36M; MoreMozi "McDonald's barely makes any money on burgers" 135K / 26x.
- Title formulas seen: "How [X] Actually Make(s) Money", "How do [X] Make Money? 🤑", "How is possible that [group] make so much money", "[Brand A] Beats [Brand B] in [N] Days Instead of [M]", "[X] barely makes any money on [obvious product]".
- Mechanism: a familiar noun (McDonald's, gas station, BBQ joint, Chick-fil-A) plus a counter-intuitive margin or revenue split (the burger loses money, gas has thin margins, the franchise fee halves your margin).
- Small-channel breakouts are frequent here (6 of the 8 examples above come from channels under 10K subs). This is replicable for a new channel.

### P5. Worked number chains hold attention even at 60 to 140 s
- Evidence: Regalis PE (88 s, 244x) and Abdullah Habib (139 s, 387x) are both voiceover-only (faceless-compatible). Bradford Manning "Builds a Car Every 76 Seconds" (107 s, 28.6x, 1.2M in 8 days).
- Mechanism: one new number per sentence, round inputs, a named "secret move" at about 40 s (the Regalis re-hook "But here's the real money move"), and the punchline number (about $2.6M cash out) at about 60 to 70 s.
- Implication: length is not the problem. A dead sentence that adds no new number is.

### P6. Rate conversion and "per second" framing is a native device in this cluster
- Evidence: Six Flags "in Just ONE SECOND" (547 subs) 50.6K / 17x; "$1 Per Second… How Long Until You're a Billionaire?" (566 subs) 21.7K / 43.6x; Iced Coffee Hour "America Spends $222,000+ Per Second…" 810K; Teacherman pick-one menu (per day / now / per minute / per second) 309K / 94x; "Builds a Car Every 76 Seconds" 1.2M.
- Teacherman menu math (my check): $100K/day = $36.5M/yr; $100M now; $10K/minute = $5.26B/yr; **$1K/second = $31.5B/yr**. The smallest-looking number ($1,000) wins because of the unit. That is a unit trap.
- $1/second reaches $1B in about 31.7 years. That is a clean "aha" result.

### P7. Money as a physical object (quantity made tangible)
- Evidence: Zack D. Films "Inheriting Ten Million Dollars In Pennies" 8.33M in 11 days (big channel, 1.89x); Alan's Theory "$25 Million bill with expiration date" 1.25M / 327x; Hanging Horses "$1.55 million worth of mud on the tires" 1.8M / 152x (horse-world, not math).
- Envelope math behind the penny premise (my check, not the video's): $10M = 1 billion pennies × 2.5 g = **about 2,500 tonnes**. This kind of "it weighs as much as X" conversion is exactly back-of-envelope territory.

### P8. Familiar mega-brands and authority cues increase credibility
- Brands that showed up in the hits: McDonald's (6.5M burgers/day, 1.82M / 39x), Chick-fil-A, Six Flags, CoComelon/YouTube, Fevicol.
- Insider cues: Founder Talk Podcast (franchise owner answering), "Former CASINO Manager Ranks Casino Games" (64x), "ft. The Fat Electrician". A faceless channel can borrow this credibility by putting the source on screen (10-K, franchise disclosure document, Census).

### P9. Lottery and casino: big general channels own the pure-odds explainers; small-channel wins come from the business angle
- Evidence: "Odds of Winning a Lottery" 10M but only 2.5x on a 3.89M-sub channel; Bluff craps odds 2.72M / 4.75x on 955K subs. The breakout is the **business** of a lottery (Matka explained, 468x on 8.3K subs). "Casino house edge math" mostly returned slot vlogs. "How a Math Genius Outsmarted the Casino" was 115x but only 18K views.
- Implication: a house-edge short probably needs a business or "who gets the money" frame ("where your $20 actually goes") rather than a probability lecture.

### P10. Creator-economy money: high demand, mostly reveal or story formats, little math
- Evidence: "Does a TikToker make more than a YouTuber?" (4.66K subs) 1.15M / 35x; "How much money YouTube paid for 15k views" 238K / 72x; "How Instagram Creators Actually Make Money (Most Don't)" 354K / 175x; CoComelon story 659K / 387x (no derivation of the $11M/mo figure); solace6k editing income 2.42M / 37x.
- Gap: almost none show views × RPM × share as a visible calculation.

### P11. White space (and its warning)
- "napkin math" returned **zero** finance or estimation shorts except one XRP clip (31K). "estimation interview question" returned trick-question GK content, not Fermi problems ("how many golf balls fit in a bus"). "money riddle" returned money-challenge videos, not riddles.
- Reading: there is no direct competition for estimation-first money shorts on Shorts, **but** viewers don't search these terms either. The brand should lead with concrete hooks (a brand, a price, a dilemma, a number) and let "envelope math" be the visual signature and payoff, not the search keyword.

### P12. Hook mechanics, payoff timing, length and loop

| Mechanic | Evidence |
|---|---|
| Hook = title = first spoken line | All 5 transcripts open with the exact title question or claim within the first sentence |
| First number arrives at 3 to 10 s | Chick-fil-A "around 8 million" in the first answer; push-up "$500" then "$182,500 per year" by about 10 s |
| Re-hook mid-video | Regalis "But here's the real money move"; Techtonic "What if it's a dollar per push-up?" |
| Withheld answer drives comments | Teacherman penny never gives the number; Zenwish "Most people get this WRONG" |
| Explicit comment CTA | Abdullah Habib "comment below and I'll make another video"; Regalis CTA to a guide |
| Durations of breakouts | 4 to 11 s (puzzle and dilemma cards), 22 to 60 s (guess-the-price, dilemmas, business models, median about 46 s), 84 to 139 s (number-chain stories) |
| Loopability | Unresolved endings ("Is that the better choice?", "Really?") roll naturally back into the opening question |

### P13. Small channel vs big channel: what a zero-subscriber channel can copy

| Replicable by a new channel (small-channel breakouts) | Mostly big-channel territory |
|---|---|
| Dilemma street interviews and dilemma cards (2.2K, 2.7K, 6.5K subs) | Pure lottery odds explainers (3.89M subs) |
| Guess-the-price (1.2K to 25K subs) | Casino odds (955K) |
| Business-model "actually makes money" (814 to 8.3K subs) | 3D-animated money what-ifs (Zack D. Films, 28.8M) |
| PE/finance number chains (6.5K) | Podcast clips from big shows (Iced Coffee Hour 1.66M) |
| Per-second conversions (547 to 566 subs, modest absolute views) | |

---

## 5. Implications for "Back of the Envelope" (Envelope Math)

These are research-derived devices, not finished teasers:
1. **Dilemma + envelope reveal:** keep the P1 dilemma hook, then do what nobody in the sample does: show the three-line envelope calculation, and end on a second dilemma (re-hook and loop).
2. **"Guess the number" built from parts:** P2's participation, but the number is estimated live from 2 to 3 inputs on an envelope. The viewer guesses, the envelope estimates, then the real figure is shown.
3. **5-second envelope puzzle cards:** P3. The puzzle is written on an envelope, there is no answer, and the solution goes in a pinned comment or the next short.
4. **"[Brand] actually makes money on ___":** P4 and P8. One familiar brand, one margin split, worked on the envelope, with the source document flashed on screen.
5. **Per-second / unit-trap menus:** P6. Convert everything to $/second on the envelope; the smallest-looking number wins.
6. **Money as a physical object:** P7. Weight, volume and stack height of a sum ("$10M in pennies is about 2,500 tonnes").
7. **Number-chain deal stories:** P5. A PE-style chain with one new number per line, an "envelope move" reveal at about 40 s, and the punchline number at about 60 s.
8. **Creator-money math:** P10. Views × RPM × share, done visibly; a gap no competitor fills.
9. **House-edge as "where your $20 goes":** P9. A business frame, not a probability lecture.
10. **Cash-envelope double meaning:** none of the cluster's outliers use cash-stuffing; it is untested here and needs a check in the personal-finance cluster files.

---

## 6. Limitations
- Visuals were not watched for any video; (I) formats are hypotheses for the later `vidiq_watch_shortform_content` stage.
- vidIQ's Shorts outlier index skewed to the last 12 months even with `allTime`.
- Breakout scores on very small or very new channels can be inflated (for example, "Casino Drift", 2,300,431x, was excluded as an ad-like outlier with 0 engagement).
- Quoted figures inside transcripts (Chick-fil-A $8M, McDonald's $3-4M, Moonbug $120M / $3B) are the creators' claims and were not independently verified here.
