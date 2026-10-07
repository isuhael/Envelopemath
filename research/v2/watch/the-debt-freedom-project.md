# The Debt Freedom Project (TikTok, @thedebtfreedomproject): deep study

**Benchmark rank:** #6 in the approved finance-math-core set (TikTok; 100% est. finance maths: 4 of 4 videos at qualification, now 5 of 5 found).
**Study date:** 2026-10-07
**Creator:** says "Hi, my name is Becky" and "I'm a CPA" on camera (3 of 4 watched videos). Surname, location and bio: unknown.
**Sources used (all vidIQ):** 4 x `vidiq_watch_shortform_content` (custom LOOK/HOOK prompt); 0 x `vidiq_video_transcript` (that tool is YouTube-only and every video here is TikTok); 2 catalogue calls: 1 x `vidiq_instagram_tiktok_outlier_search` (TikTok has no profile tool, so I ran a concept search for this channel's subject with `collapseByCreator=false`, 60 results per platform, posted after 2025-10-01, at least 1K views; it returned 5 of this channel's videos, one of them new to us) and 1 x `vidiq_ig_profile_reels` for `thedebtfreedomproject` (returned "Instagram profile not found."). Budget used: 4/4 watch jobs, 0/3 transcripts, 2/2 catalogue calls. Polls were free.
**Rule:** every number, quote, title and URL below comes from those calls. View counts and "x median" multiples are as vidIQ returned them on 2026-10-07. Post dates are decoded from the TikTok video IDs (the top 32 bits are the Unix upload time). My own arithmetic checks were run in Python and are labelled "check". Anything not seen is "unknown".
**Saved frame:** vidIQ returned one frame image, the opening frame of "Yes, daily payments work!": [`debt-freedom-frames/daily-payments-7667419558063525133-frame.jpg`](debt-freedom-frames/daily-payments-7667419558063525133-frame.jpg).

---

## 0. Headline findings

1. **Correction to the qualification note: it is not a split screen and it is not low-face.** In all four watched videos, frame 1 is a **full-frame close-up of the creator's face**, with a white bold sans-serif question laid across her chest. The spreadsheet arrives after a hard cut, between 0:10 and 0:45. The face comes back at the end for the recap. The face and the spreadsheet are never on screen at the same time. (vidIQ's outlier-search metadata calls the format "split screen (creator + screen recording)", but the scene-by-scene watches and the saved frame contradict that.)
2. **Correction: the spreadsheet is mostly filmed, not screen-recorded.** In 3 of 4 videos it is a phone pointed at a laptop or monitor running Microsoft Excel: handheld, panning, tilting and scrolling, with keyboard sounds in one. Only the credit-card video looks like a direct screen capture with a mouse cursor selecting cells.
3. **The look is "proof over polish".** It is stock Excel: white grid, the default Aptos Narrow, Calibri or Carlito font, a yellow highlighted row, blue input cells and green summary cells, with the **formula bar showing the real interest formula** (`=(0.0424/365)*B10*D10`). There is no music, no SFX, no burned-in captions and no motion graphics, and the edit runs at 0.1 to 0.22 cuts per 10 s.
4. **The hook is a pair: the question goes on screen and the verdict goes in the caption.** Frame 1 asks a "what difference does X make?" question, and the TikTok caption answers it with an exclamation: "Look what a difference rounding makes!" (1.9M, 902.5x), "Yes, daily payments work!" (382.1K, 289.1x), "...an extra $100 per month can really make a difference!" (290.7K, 127.3x). 4 of the 5 videos found use the word "difference". The fifth has a topic label on screen ("Credit Card Debt Payoff Strategies") and a generic question as its caption, and it is the weakest at 90.6K and 52.5x.
5. **The maths is always the same debt paid a different way.** The comparisons are monthly vs biweekly vs weekly vs weekly-rounded-up; $50 a day vs one $1,500 lump; +$100 a month vs biweekly; and four credit-card habits. Every answer comes as **total interest plus a payoff date**, and the date is the number that travels: "6/1/28" becomes "3/12/27", and "cut his Jeep loan from 5 years to 2 years".
6. **One real loan runs across the channel.** The same **$58,593.13 Jeep loan at 4.24% over 75 months** drives the 1.9M rounding video (2026-07-31) and the 290.7K comment-reply sequel (2026-08-23). A third video, "Watch me help my dad cut his Jeep loan from 5 years to 2 years" (266.7K, 44.5x, not watched), may use the same loan, but that is unknown.
7. **All five breakouts fall in a 4-week window and ride a trend.** They were posted between 2026-07-28 and 2026-08-23, and 4 of 5 captions carry **#micropayments** (the fifth caption is cut off). "Yes, daily payments work!" shows that a tiny answer can still break out when it settles a live argument: daily payments beat the lump sum by **$2.98** in one month on a $75,000 loan.
8. **The payoff lands late and nothing loops.** The first new number lands 30% to 45% of the way through, and the biggest number lands 62% to 81% of the way through, followed by a summary table or a spoken recap. Runtimes are 177 to 354 s. The shortest (177 s) reached 127.3x and the longest (354 s) reached 902.5x, so length is not what separates them.
9. **Arithmetic checks.** The daily-payments and credit-card numbers reproduce exactly (check). The car-loan numbers do not agree with each other. The same loan has a baseline total interest of **$8,304.88** in the rounding video and **$8,192.41** in the reply video (as vidIQ read them). A textbook monthly amortisation gives $890.69 a month and $8,208.93 of interest (check), against the $892.24 shown on screen; the gap may come from a 42-day first period, but that is unknown. Two figures vidIQ derived in the $100 walkthrough do not follow from its own numbers (details in 4.3).

---

## 1. Channel facts

| Field | Value |
|---|---|
| Channel | **The Debt Freedom Project**, [@thedebtfreedomproject](https://www.tiktok.com/@thedebtfreedomproject) (TikTok) |
| Followers | 41.6K to 42.4K (vidIQ snapshots attached to each video) |
| Creator | "Becky", self-described CPA and "numbers geek" (spoken). Surname unknown |
| Finance-maths share | 5 of 5 videos found (loan and credit-card payoff maths) |
| Typical views | vidIQ's "their median" at each video: 1.3K, 1.7K, 2.1K, 2.3K, 6K |
| Instagram | `vidiq_ig_profile_reels("thedebtfreedomproject")` returned "Instagram profile not found." Another handle may exist (unknown) |
| YouTube | not checked (no budget left) |
| Full catalogue | **unknown.** TikTok has no profile tool, so only the 5 videos that surfaced in two outlier searches (qualification and this study) are known. Someone should scroll the profile grid by hand |

### All five known videos

| # | Posted (decoded from ID) | Caption (as returned) | Frame-1 on-screen text | Views | x median (median) | Length | Watched |
|---|---|---|---|---:|---|---:|---|
| 1 | 2026-07-31 | "Look what a difference rounding makes! #debt #micropayments #debtpayoffjourney #carloan #debtpayoff" | "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" | 1,900,000 | **902.5x** (2.1K) | 354 s | yes |
| 2 | 2026-07-28 | "Yes, daily payments work! #debt #studentloan #micropayments #debtpayoffjourney #debtpayoff" | "What's the difference between daily payments and one extra lump sum payment each month?" | 382,100 | **289.1x** (1.3K) | 308 s | yes |
| 3 | 2026-08-23 | "Replying to @Am_taylor an extra $100 per month can really make a difference! #debt #debtpayoff #debt... #debtpayoffjourney #carloan #loan" | Reply sticker plus "How much difference does an extra $100 per month make on a car loan payoff?" | 290,700 | **127.3x** (2.3K) | 177 s | yes |
| 4 | 2026-08-07 | "Small changes can make a big difference in paying off a car loan. #debt #debtpayoff #debtpayoffjourn... #debtpayoffjourney #micropayments #jeep" | "Watch me help my dad cut his Jeep loan from 5 years to 2 years." (from vidIQ search metadata, not a watch) | 266,700 | **44.5x** (6K) | 290 s | no |
| 5 | 2026-07-30 | "What are some strategies to pay credit card debt faster? #debt #micropayments #debtpayoffjourney #de... #creditcards" | "Credit Card Debt Payoff Strategies" | 90,600 | **52.5x** (1.7K) | 323 s | yes |

URLs:
1. https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
2. https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
3. https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
4. https://www.tiktok.com/@thedebtfreedomproject/video/7671119810108935437 (new: not in the qualification file)
5. https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534

---

## 2. Videos studied and why

| Watched | Why |
|---|---|
| #1 Rounding (1.9M, 902.5x) | Biggest breakout; the template of the "ladder of scenarios" format |
| #2 Daily payments (382.1K, 289.1x) | Head-to-head A vs B with a tiny honest answer ($2.98); settles a trend debate |
| #3 Reply to @Am_taylor (290.7K, 127.3x) | Comment-reply sequel on the same loan; shortest video (177 s) |
| #5 Credit-card strategies (90.6K, 52.5x) | The only one with a topic label instead of a question on screen: the contrast case for the hook |

Not watched: #4, the "help my dad" Jeep video (266.7K, 44.5x). It surfaced in the catalogue search only after the four watch jobs were submitted, and the 4-job budget was spent.

---

## 3. The look (synthesis across the 4 watched videos)

### 3.1 Layout in the 9:16 frame: three acts, never split

| Act | What fills the frame | Where text sits | Length |
|---|---|---|---|
| **1. Face + question** | Full-frame selfie close-up of Becky (blonde, clear or blush-pink glasses), head and shoulders, plain indoor background (off-white wall or door frame; kitchen with white cabinets and a plant in #3) | Static question in the **lower-middle third**, centred, over her chest. In the saved frame of #2 the four text lines sit at roughly 62% to 84% of frame height (my read of the image); the face fills the top 60%. In #3 a native TikTok **reply sticker** sits **top-left** | 10 to 45 s (0:00-0:44 in #1; 0:00-0:25 in #2; 0:00-0:10 in #3; 0:00-0:15 in #5) |
| **2. The spreadsheet** | Excel filling the frame: a phone filming the laptop or monitor (handheld, panning down the amortisation rows) in #1 to #3, or a direct capture with cursor and tab switches in #5 | No overlay text except plain section headers in #1 ("Normal Monthly Payments", "Bi-weekly Payments", "Weekly Payments", "Weekly plus Rounding", "Summary") | 2 to 4 min |
| **3. Face recap** | Back to the selfie | none | 15 to 45 s |

### 3.2 Palette

- **Act 1:** natural skin tones and a cream or off-white wall. Her top is the only strong colour: hot-pink or magenta in #1 (vidIQ: "commands attention in the feed"), black in #2 and #5, white jacket over dark blue in #3.
- **Act 2:** default Excel light theme. White cells, grey gridlines and headers, the green ribbon, black numbers, **yellow row highlights** (vidIQ estimate in #2: "#FFF275 style"), light-green summary highlights, blue selection boxes, blue/green input cells in #3, red font for payments and credits in #5, and green, blue and purple arrows in #2.
- No brand colour, logo or watermark is reported in any of the four.

### 3.3 Typography

- **Hook text:** TikTok's native text tool. Bold sans-serif, white fill with a thin black stroke or drop shadow, centred, sentence case for the questions and Title Case for the label in #5. Four lines of about 20 to 25 characters each.
- **Reply sticker (#3):** the native TikTok widget: white box, small sans-serif, round avatar, the commenter's words verbatim.
- **Numbers:** whatever Excel shows. Aptos Narrow or Calibri (#1, #2, #5), Carlito (#3), accounting format `$#,##0.00`, regular weight with bold summary lines.

### 3.4 How numbers appear

- **A live Excel amortisation table** with labelled columns: `Days Between`, `Pmt Date`, `Beginning Balance`, `Payment`, `Principal`, `Interest`, `Ending Balance` (#1). The working is visible: the formula bar shows `=C10-D5`, `=(0.0424/365)*B10*D10` and `=SUM(...)`.
- **Revealed by scrolling or by typing.** The camera scrolls down to the payoff row, or she types a new payment into an input cell and the payoff date and total interest recalculate (#3).
- **One sheet tab per scenario,** ending in a **summary table**: scenario, total interest, payoff date (#1).
- **A ledger for the credit card (#5):** date, description, amount, daily balance and monthly summary, with charges in black and payments in red, and the cursor drag-selecting each range it is talking about.
- There is no handwriting, counter, chart, animation or calculator UI anywhere.

### 3.5 Pace, sound and edit

- **Cuts:** about 0.1 to 0.22 per 10 s, which means 2 to 5 cuts per video in total.
- **Captions:** none burned in. The only on-screen text in the body is the section headers in #1.
- **Audio:** voice only, with room tone. #3 adds keyboard typing and birds outside. No music and no SFX in any of the four.
- **Loops:** none. Each video ends on a spoken recap or rule.

### 3.6 Qualification note vs what the watch shows

| Qualification said | Watch shows |
|---|---|
| "Low-face" | Face is frame 1 in 4 of 4, on screen for the first 10 to 45 s and again at the end |
| "Split screen" | Hard cuts between a full-frame face and a full-frame spreadsheet. Never simultaneous |
| "Screen-recorded spreadsheet" | 3 of 4 film the screen with a handheld phone; 1 of 4 (#5) looks like a direct capture with a cursor |
| "Static text title" | Correct: a static white TikTok-text question over the chest, held through the intro (until 0:44 in #1) |
| "Often opens by replying to a comment" | 1 of 5 known videos is a comment reply (#3). #2 opens "I've had a lot of people ask me..." (spoken). "Often" is not supported |
| "3-6 min" | Correct: 177 to 354 s |

---

## 4. Per-video study

### 4.1 "Look what a difference rounding makes!" (1,900,000 views, 902.5x, 354 s, posted 2026-07-31)

- **URL:** https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
- **Frame 1 (0.0 s):** a centred talking head: a middle-aged woman with clear/tortoise glasses, blonde hair parted in the middle and a **hot-pink/magenta sleeveless top**, in front of a neutral office background with an off-white door frame. In the lower-middle third, centred, in bold white sans-serif with a black stroke: "What difference does / monthly, biweekly, and / weekly payments make on / paying off a car loan?" The text stays on screen until 0:44.
- **First 3 s, spoken:** "Let's get your car loan paid off sooner. Hi, my name is Becky..." (she adds "I'm a CPA and a numbers geek" within the first 5 s, per vidIQ).
- **First 3 s, on screen:** the question above.
- **The loan:** $58,593.13 at 4.24% over 75 months, started 2/18/2022, first payment 4/1/2022 (42 days of interest). vidIQ calls these "real personal numbers ($58k Jeep loan)".
- **Beats:**

| Time | % of runtime | Beat | Number shown |
|---|---|---|---|
| 0:00-0:15 | 0-4% | Promise + credentials | none |
| 0:16-0:44 | 5-12% | Roadmap: 4 scenarios, the real loan | $58k Jeep loan |
| 0:45-2:32 | 13-43% | Scenario 1, normal monthly: daily-interest formula explained | $892.24/mo; first month $606.37 principal, $285.87 interest, $57,986.76 balance; payoff **6/1/28**; total interest **$8,304.88** |
| 2:33-3:20 | 43-57% | Scenario 2, biweekly: **first payoff** | $446.12 every 14 days; payoff **11/19/27**; interest **$7,496.47** |
| 3:21-4:02 | 57-68% | Scenario 3, weekly: the "myth bust" (barely better than biweekly) | $223.06 every 7 days; payoff **11/12/27**; interest **$7,469.96** |
| 4:03-4:46 | 69-81% | Scenario 4, weekly + rounding to $250: **biggest number** | +$26.94/week; payoff **3/12/27**; interest **$6,582.66**; saves **$1,722.22** and about 15 months |
| 4:47-5:38 | 81-96% | Summary table | Regular $8,304.88 6/1/28; Biweekly $7,496.47 11/19/27; Weekly $7,469.96 11/12/27; Weekly Plus Rounding $6,582.66 3/12/27 |
| 5:39-5:54 | 96-100% | Close on face: "Hopefully these strategies will help you speed things up a bit." | none |

- **Checks:** $8,304.88 - $6,582.66 = $1,722.22; biweekly saves $808.41, weekly saves $834.92, and weekly beats biweekly by only $26.51 (all check). Biweekly ($446.12 x 26) and weekly ($223.06 x 52) both come to **$11,599.12 a year, exactly 13 monthly payments** against 12 (check). That is why weekly barely beats biweekly. The video does not say this, as far as the walkthrough reports. "Rounding" to $250 a week is really **+$116.74 a month** of extra principal (check).
- **Number device:** a handheld phone filming Excel on a monitor, scrolling the amortisation rows, with formulas visible in the formula bar and plain section headers; it ends on a 4-row summary table of total interest and payoff date.
- **Ending/CTA:** no explicit CTA. vidIQ expects comments arguing over whether lenders really apply weekly or biweekly payments to principal or hold them until the monthly due date, and saves for the spreadsheet method.
- **Why the hook works (vidIQ + benchmark comparison):** a universal debt (car loan); three named options in one question, which promises a ranking; credentials inside 5 s. The **caption names the winning lever (rounding), not the question**, so the caption and frame 1 together give both the question and a teaser of the answer.

### 4.2 "Yes, daily payments work!" (382,100 views, 289.1x, 308 s, posted 2026-07-28)

- **URL:** https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
- **Frame 1 (0.0 s), confirmed by the saved image:** a full-frame selfie close-up. Her face fills the top 60% of the frame: blonde hair, blush-pink translucent glasses, black V-neck top, cream wall, a white sofa back at the edges. In the lower-middle third, centred, in TikTok bold white sans with a thin dark outline, four lines: "What's the difference / between daily payments / and one extra lump sum / payment each month?"
- **First 3 s, spoken:** "Hi, I'm Becky and I'm a CPA. I've had a lot of people ask me..."
- **First 3 s, on screen:** the question above.
- **Beats:**

| Time | % | Beat | Number |
|---|---|---|---|
| 0:00-0:25 | 0-8% | Credentials + "people keep asking" | none |
| 0:26-1:51 | 8-36% | Scenario A, one $1,500 payment at month end (laptop filmed from above) | $75,000 at 7%; 30 days; $14.38/day; interest **$431.51**; principal **$1,068.49**; balance **$73,931.51** |
| 1:52-3:36 | 36-70% | Scenario B, $50 a day for 30 days | Day 1 interest $14.38, principal $35.62, balance $74,964.38; daily interest falls to $14.18 by day 30; interest **$428.53**; principal **$1,071.47**; balance **$73,928.53** |
| 3:37-4:38 | 70-90% | Side-by-side: **payoff and biggest number** | Difference **$2.98** in one month |
| 4:39-5:08 | 90-100% | Face: the principle | "Every dollar that you reduce your principal today is a dollar less that you have to pay interest on tomorrow." |

- **Checks:** all reproduce exactly when daily interest is rounded to the cent: $428.53, $1,071.47, $73,928.53 and $431.51, $1,068.49, $73,931.51 (check).
- **Number device:** a handheld camera looking down at a laptop running Excel, with yellow row highlights, green summary highlights and coloured arrows, panning and scrolling.
- **Why the hook works:** it settles a live debate (#micropayments), and the caption takes a side ("Yes, ... work!"), which invites people who disagree to comment. **The answer is small and honest ($2.98)**, and vidIQ expects the comments to argue about whether $3 a month is worth the hassle. The breakout came from the verdict, not from the size of the number.

### 4.3 "Replying to @Am_taylor an extra $100 per month can really make a difference!" (290,700 views, 127.3x, 177 s, posted 2026-08-23)

- **URL:** https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
- **Frame 1 (0.0 s):** a talking head in a bright kitchen or living area (white cabinets, a plant), wearing a white collared jacket over a dark blue layer, with clear-rimmed glasses. **Top-left:** the native TikTok reply sticker: "Reply to Am_taylor's comment / Now do monthly payments with an extra $100 going to principal so essentially $1000 a month". **Lower-middle third:** in bold white sans with a dark stroke: "How much difference does an extra $100 per month make on a car loan payoff?"
- **First 3 s, spoken:** "Let's see how much difference an extra $100 per month makes on a car loan payoff..."
- **First 3 s, on screen:** the sticker and the question above.
- **This is a sequel:** it uses the same $58,593.13 / 4.24% / 75-month loan as #1, three weeks later, at a viewer's request.
- **Beats:**

| Time | % | Beat | Number |
|---|---|---|---|
| 0:00-0:10 | 0-6% | The viewer's request is the hook | $100, $1,000 |
| 0:11-0:52 | 6-29% | Baseline on the Jeep loan | $892.24/mo; interest $8,192.41; payoff 06/01/2028 |
| 0:53-1:20 | 30-45% | **First payoff:** round up to $1,000 a month (typed into an input cell) | +$107.76; interest $7,174.63 (saves $1,017.78); payoff **09/01/2027**, 9 payments fewer |
| 1:21-1:49 | 46-61% | Plain biweekly | $446.12 every 14 days; interest $7,396.46 (saves $795.95); payoff **11/05/2027**, 209 days sooner |
| 1:50-2:12 | 62-74% | **Biggest number:** biweekly $500 | +$53.88 per payment; interest **$6,499.07** (saves **$1,693.34**); payoff **03/12/2027** |
| 2:13-2:57 | 75-100% | Face recap, read as dates | "June '28 -> Nov '27 -> Sept '27 -> March '27" |

- **Checks:** $1,017.78, $795.95 and $1,693.34 follow from the totals shown, and 06/01/2028 to 11/05/2027 is 209 days (check). Two of vidIQ's derived figures do not follow: it says $500 biweekly saves "$1,149.96 vs. standard bi-weekly", but $7,396.46 - $6,499.07 = **$897.39** (check); and it says "eliminates 326 days / over 15 months", but 06/01/2028 to 03/12/2027 is **447 days, about 14.7 months** (check). The baseline interest here ($8,192.41) differs from #1 ($8,304.88) for the same loan. The reason is unknown (a different template, or a misread).
- **Number device:** a POV phone shot of the laptop and keyboard running a "75-Month Car Loan Payoff Template" in Excel. She types values into blue/green input cells and the payoff summary cards recalculate.
- **Why the hook works:** the commenter's own words are the brief, shown verbatim in the native sticker, so the video reads as an answer that was asked for. The question is concrete ($100). The recap turns four scenarios into four dates, which is easy to repeat in the comments. Of the four watched, it is the most compressed: the first payoff lands at 0:53.

### 4.4 "What are some strategies to pay credit card debt faster?" (90,600 views, 52.5x, 323 s, posted 2026-07-30)

- **URL:** https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534
- **Frame 1 (0.0 s):** a centred selfie, smiling: black sleeveless ribbed top, clear glasses, an off-white wall and a green potted plant on the right. In the lower third, in bold white sans with a black stroke and **Title Case**: "Credit Card Debt Payoff Strategies". **A label, not a question.**
- **First 3 s, spoken:** "Let's talk about credit card debt payoff strategies. Hi, my name is Becky and I'm a CPA."
- **First 3 s, on screen:** "Credit Card Debt Payoff Strategies".
- **Beats:**

| Time | % | Beat | Number |
|---|---|---|---|
| 0:00-0:15 | 0-5% | Credentials + promise ("understand your debt better so that you can pay it off faster") | none |
| 0:16-2:05 | 5-39% | Tab "Normal": charges plus a $200 payment at month end. **First payoff: the balance still rises** | 23.99% APR; $9,250.00 opening; charges $52 + $23 + $11 + $37 + $150 + $42 + $5 = $320; average daily balance $9,434.80; interest $186.03; ending **$9,556.03 (+$306.03)** |
| 2:06-2:48 | 39-52% | Tab "Random Micro": the trend's advice | payments $339; ADB $9,374.60; interest $184.85; ending $9,415.85 (+$165.85) |
| 2:49-3:30 | 52-65% | Tab "Pay Charges Daily" | payments $520; ADB $9,254.00; interest $182.47; ending $9,232.47 (**-$17.53**, the first fall) |
| 3:31-4:04 | 65-75% | Tab "Pay Charges + Micro": **biggest number** | payments $590; ADB $9,223.17; interest $181.86; ending $9,161.86 (**-$88.14**) |
| 4:05-4:50 | 75-90% | Face: the rule, "ending balance must always be lower than beginning balance" | none |
| 4:51-5:22 | 90-100% | Warning about residual (trailing) interest when paying a card off | none |

- **Checks:** all four interest figures ($186.03, $184.85, $182.47, $181.86) and all four ending balances reproduce from ADB x 23.99% / 365 x 30 (check).
- **Number device:** a direct capture of desktop Excel ledgers with the cursor selecting ranges and the formula bar showing the working; one tab per strategy.
- **Why it underperformed the others (comparison within this benchmark, not a vidIQ claim):** it is the only one of the five with a **topic label** on screen instead of a specific comparison question, the only one whose caption is a generic "What are some strategies...?" with no verdict, and the only one without "difference". The content is as strong as the others (it has a genuine surprise at 2:05: you paid $200 and still owe $306 more), but that surprise is not in frame 1.

### 4.5 Not watched: "Small changes can make a big difference in paying off a car loan." (266,700 views, 44.5x, 290 s, posted 2026-08-07)

- **URL:** https://www.tiktok.com/@thedebtfreedomproject/video/7671119810108935437
- vidIQ search metadata only: "A financial professional helps her father use an excel spreadsheet template to calculate how to pay off his new Jeep loan faster." Opening visual: "Static camera shot of the creator and her elderly father looking directly at the camera." Opening text: "Watch me help my dad cut his Jeep loan from 5 years to 2 years." Voice only, no SFX, not looped.
- Frame 1, exact text styling and numbers: unknown (not watched).

---

## 5. Hook and title catalogue (5 known videos)

| Formula | Example (verbatim) | Views | x median |
|---|---|---:|---:|
| **On-screen "what difference does X make?" question with named options** | "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?" | 1,900,000 | 902.5x |
| | "What's the difference between daily payments and one extra lump sum payment each month?" | 382,100 | 289.1x |
| | "How much difference does an extra $100 per month make on a car loan payoff?" | 290,700 | 127.3x |
| **Caption = verdict exclamation that answers the frame-1 question** | "Look what a difference rounding makes!" | 1,900,000 | 902.5x |
| | "Yes, daily payments work!" | 382,100 | 289.1x |
| | "...an extra $100 per month can really make a difference!" | 290,700 | 127.3x |
| | "Small changes can make a big difference in paying off a car loan." | 266,700 | 44.5x |
| **Settle-the-debate verdict ("Yes, X works!") on a trending tactic** | "Yes, daily payments work!" (#micropayments) | 382,100 | 289.1x |
| **Reply to a viewer comment, with the native sticker showing their exact request** | "Replying to @Am_taylor..." / sticker: "Now do monthly payments with an extra $100 going to principal so essentially $1000 a month" | 290,700 | 127.3x |
| **"Watch me help [family member] cut [debt] from X years to Y years"** (time-collapse promise) | "Watch me help my dad cut his Jeep loan from 5 years to 2 years." | 266,700 | 44.5x |
| **Spoken opener "Let's [verb] ... / Hi, my name is Becky and I'm a CPA"** | "Let's get your car loan paid off sooner. Hi, my name is Becky..." | 1,900,000 | 902.5x |
| | "Hi, I'm Becky and I'm a CPA. I've had a lot of people ask me..." | 382,100 | 289.1x |
| | "Let's see how much difference an extra $100 per month makes on a car loan payoff..." | 290,700 | 127.3x |
| **Topic label on screen + generic question caption (the weakest)** | "Credit Card Debt Payoff Strategies" / "What are some strategies to pay credit card debt faster?" | 90,600 | 52.5x |

Patterns across the five:
- "Difference" appears in 4 of 5. The one without it is the lowest.
- Every video names a concrete debt and a concrete lever in its text: car loan, $100, daily, rounding, Jeep, 5 years to 2 years. The only exception is the label.
- Hashtags: #debt on 5 of 5, #micropayments on 4 of 5 (the fifth caption is cut off), #debtpayoffjourney on 5 of 5, #carloan on 2.
- No emoji, no all-caps, no "you won't believe" phrasing. The tone is plain and calm.
- n = 5, all from a single 4-week window, so every pattern here is suggestive, not proven.

---

## 6. Formats

| Format | Known examples | What it is |
|---|---|---|
| **A. The payment ladder** | #1 (1.9M), #3 (290.7K), #5 (90.6K) | One real debt, 3 or 4 payment behaviours, each one a sheet tab, building to the best one. It ends on a summary table or spoken recap of **total interest + payoff date** per option. The biggest number lands at 62% to 81% of runtime |
| **B. Same money, different timing (A vs B)** | #2 (382.1K) | The same dollars ($1,500) paid two ways ($50 a day vs one lump). The answer is the delta ($2.98), then a rule |
| **C. Comment-reply sequel on the running case** | #3 (290.7K) | A viewer asks "now do X", and she re-runs the same loan from an earlier hit with their variable. The native sticker is the hook |
| **D. Helping a real person with their real loan** | #4 (266.7K, not watched) | Family member on camera, their loan, a time-collapse promise ("5 years to 2 years") |

---

## 7. What transfers to Back of the Envelope (from this benchmark only)

1. **Put the question on screen and the verdict in the caption.** Frame 1 asks "What difference does X make?" with the options named. The caption answers with an exclamation ("Look what a difference rounding makes!"). This channel's three biggest hits all do it, and the one that doesn't is its weakest.
2. **Compare the same money paid two or more ways, and report the payoff date as well as the dollars.** Dates ("June '28 to March '27") and durations ("5 years to 2 years") are the numbers she repeats in the recap and puts in the hook.
3. **A small honest answer can break out when it settles a live argument.** $2.98 got 382.1K at 289.1x because the caption took a side in the #micropayments debate. Rough-but-right maths that says "yes, but barely" is a hook in itself.
4. **Use one running case across a series.** The $58,593.13 Jeep loan anchors the 1.9M video and the 290.7K sequel. A recurring example lets viewers ask for "now do X" and makes sequels cheap to produce.
5. **Answering a comment works when the comment is the brief.** The sticker shows the viewer's exact request ("Now do ... an extra $100 ... $1000 a month"), and the video answers exactly that.
6. **Show the working as proof.** The formula bar (`=(0.0424/365)*B10*D10`) and the highlighted row are her credibility device, more than the face. Back of the Envelope's equivalent would be the one-line rough formula left visible on screen. That is an inference from this benchmark, not something any video tested.
7. **What does not transfer:**
   - The 3-to-6-minute length. Her first new number arrives 30% to 45% of the way in: at 0:53 at best, 2:33 at worst.
   - The face as frame 1, and CPA authority.
   - The absence of captions and music.
   - Exact-to-the-cent amortisation.
   - Her look has nothing to adopt beyond "a real tool as proof": no palette, no brand and no type system.

---

## 8. Unknowns

- **The full catalogue:** total video count, how many are finance maths, and what she posted before 2026-07-28. Only 5 videos are known.
- **Engagement:** likes, comments, shares and saves were not returned for any video, and retention is unknown.
- **The car-loan figures:** why the same loan shows $8,304.88 baseline interest in #1 and $8,192.41 in #3, and why the payment is $892.24 rather than the textbook $890.69.
- **Video #4:** whether it uses the same Jeep loan, and its frame 1, styling and numbers (not watched).
- **The account itself:** whether Becky has a YouTube or differently named Instagram account, and her bio, surname, location and any product or CTA. No CTA was reported in any of the four watched videos.
- **Text styling:** the exact on-screen font name (described only as TikTok-style bold white sans with a stroke) and the exact hex colours (the only hex is vidIQ's estimate "#FFF275 style" for the yellow highlight).

---

## Appendix A. Full vidIQ walkthroughs (verbatim)

### A.1 Look what a difference rounding makes! (7668828789551418637), durationSeconds 354.155

Here is a complete analysis of the video based on your specifications:

---

### 1) FRAME 1 (0.0 s) Breakdown
* **Layout:** Centered talking-head portrait format (9:16 vertical orientation).
* **Text Verbatim:**
  > What difference does
  > monthly, biweekly, and
  > weekly payments make on
  > paying off a car loan?
* **Font Style:** Bold sans-serif font, white text with a prominent black drop shadow/stroke, title case/sentence casing.
* **Text Position:** Centered horizontally over the lower chest area (lower-middle third of the 9:16 frame).
* **Subject/Face/Props:** A middle-aged woman wearing clear/tortoise glasses, blonde hair parted in the middle, and a bright magenta/hot-pink sleeveless top. Neutral office background with an off-white door frame behind her.

---

### 2) First 3 Seconds
* **Spoken Audio (0:00 – 0:03):** 
  *"Let's get your car loan paid off sooner. Hi, my name is Becky..."*
* **On-Screen Text (0:00 – 0:03):** 
  *"What difference does monthly, biweekly, and weekly payments make on paying off a car loan?"* (Stays fixed on screen until 0:44).

---

### 3) Visual System Across the Video
* **Color Palette:** 
  * Vibrant hot-pink/magenta (speaker’s shirt).
  * Spreadsheet UI: Standard Microsoft Excel white/light gray cells, green accents/ribbon, black text, and soft blue row selection highlights.
* **Typography:** Clean standard sans-serif text overlays for headers (*"Normal Monthly Payments"*, *"Bi-weekly Payments"*, *"Weekly Payments"*, *"Weekly plus Rounding"*, *"Summary"*). The Excel sheet utilizes standard font (*Aptos Narrow*).
* **How Numbers Appear:** Structured **Microsoft Excel spreadsheet** displayed directly on a computer screen (shot handheld with slight panning and scrolling down amortization tables). Active cells and Excel formulas (`=C10-D5`, `=(0.0424/365)*B10*D10`, `=SUM(...)`, etc.) are shown in the formula bar.
* **Motion & Transitions:** Direct hard cuts between the speaker talking to camera and handheld phone-camera recordings pointed at the Excel computer monitor, followed by manual scrolling down the rows.
* **Cuts per 10 s:** Very low (~0.15 cuts per 10 s; 5 main sections filmed continuously).
* **Captions Style:** Large bold sans-serif static topic banner text centered at the top/bottom.
* **Music/SFX:** None; clean, clear vocal presentation with natural ambient room acoustic.

---

### 4) The Math & Calculations (In Chronological Order)

#### **Base Loan Details:**
* **Loan Balance:** $58,593.13
* **Interest Rate:** 4.24%
* **Term:** 75 months
* **Start Date:** 2/18/2022
* **First Payment Date:** 4/1/2022 (42 days accrued interest)

---

#### **Scenario 1: Normal Monthly Payments (0:45 – 2:32)**
* **Monthly Payment:** $892.24
* **First Month Breakdown:**
  * Principal: $606.37
  * Interest: $285.87
  * Ending Balance: $57,986.76
* **Daily Interest Formula Shown:** `=(0.0424/365) * Beginning Balance * Number of Days`
* **Payoff Date:** June 1, 2028 (`6/1/28`)
* **Total Interest Paid:** **$8,304.88**

---

#### **Scenario 2: Bi-Weekly Payments (2:33 – 3:20)**
* **Bi-Weekly Payment:** $892.24 ÷ 2 = **$446.12** every 14 days
* **Payoff Date:** November 19, 2027 (`11/19/27`)
* **Total Interest Paid:** **$7,496.47**
* **Interest Savings:** ~$808.41

---

#### **Scenario 3: Weekly Payments (3:21 – 4:02)**
* **Weekly Payment:** $892.24 ÷ 4 = **$223.06** every 7 days
* **Payoff Date:** November 12, 2027 (`11/12/27`)
* **Total Interest Paid:** **$7,469.96**
* **Interest Savings:** ~$834.92 (only ~$26.51 more than bi-weekly)

---

#### **Scenario 4: Weekly Payments + Rounding Up (4:03 – 4:46)**
* **Calculated Weekly Amount:** $223.06
* **Rounded Weekly Payment:** **$250.00** (+$26.94 extra principal/week)
* **Payoff Date:** March 12, 2027 (`3/12/27`)
* **Total Interest Paid:** **$6,582.66**
* **Total Interest Savings:** **$1,722.22** ($8,304.88 – $6,582.66)
* **Time Saved:** 1 year and ~3 months (15 months earlier)

---

#### **Summary Table Shown (4:47 – 5:38)**
| Scenario | Total Interest | Payoff Date |
| :--- | :--- | :--- |
| **Regular** | $8,304.88 | 6/1/28 |
| **Biweekly** | $7,496.47 | 11/19/27 |
| **Weekly** | $7,469.96 | 11/12/27 |
| **Weekly Plus Rounding** | $6,582.66 | 3/12/27 |

---

### 5) Structure & Beats
* **0:00 – 0:15 | The Credibility Hook:** Introduces self as a CPA and "numbers geek" with a clear promise to save money on auto debt.
* **0:16 – 0:44 | Roadmap & Agenda:** Introduces the 4 scenarios using real personal numbers ($58k Jeep loan).
* **0:45 – 2:32 | Baseline Scenario:** Monthly schedule breakdown and daily interest calculation explanation.
* **2:33 – 3:20 | Scenario 2 (Bi-weekly):** Shows payoff shifting from 2028 to 2027.
* **3:21 – 4:02 | Scenario 3 (Weekly):** Debunks the myth that simple weekly payments save vastly more than bi-weekly.
* **4:03 – 4:46 | Payoff / Biggest Number:** The power of micro-rounding ($26.94 extra) dropping payoff to March 2027.
* **4:47 – 5:38 | Summary Table:** Comparison showing total savings and payoff dates side by side.
* **5:39 – 5:54 | Closing Advice:** Takeaway on making extra principal micropayments.
* **Loop:** Does not intentionally loop cleanly; standard narrative ending.

---

### 6) Ending and CTA
* **Ending:** Face-to-camera wrap up: *"Hopefully these strategies will help you speed things up a bit."*
* **Engagement Drivers:**
  * **Saves:** Driven by the spreadsheet template and calculation formulas shown.
  * **Comments/Discussion:** Viewers debating whether lenders allow true weekly/biweekly principal applications vs. holding funds in escrow until the monthly due date.

---

### 7) What Makes It Work

#### **What Makes the LOOK Work:**
1. **Raw "Proof over Polish" Aesthetic:** Filming the actual Excel screen with real formulas rather than polished mockups instantly validates authenticity and CPA credentials.
2. **High-Contrast Subject Visuals:** The bold pink top against a neutral backdrop commands attention in the feed during talking-head segments.
3. **Clear Excel Layout:** Well-labeled columns (`Days Between`, `Pmt Date`, `Beginning Balance`, `Payment`, `Principal`, `Interest`, `Ending Balance`) allow viewers to trace the math easily.

#### **What Makes the HOOK Work:**
1. **Universal Pain Point:** Car loans are one of the most common high-interest consumer debts, making payoff optimization immediately relevant.
2. **Instant Authority Stacking:** Opening with *"I'm a CPA and a numbers geek"* within the first 5 seconds establishes expertise.
3. **Specific Question Framing:** Asking the explicit difference between monthly, biweekly, and weekly creates an open information loop that demands watching until the summary table.

---

### A.2 Yes, daily payments work! (7667419558063525133), durationSeconds 308.534

Here is the detailed analysis of the video based on your custom instructions:

---

### 1) FRAME 1 (0.0 s) Breakdown
* **Layout & Composition:** Close-up talking head portrait centered vertically and horizontally in a standard 9:16 vertical video framing.
* **On-Screen Text (Verbatim):**
  > What’s the difference  
  > between daily payments  
  > and one extra lump sum  
  > payment each month?
* **Font Style:** Clean sans-serif, bold weight, centered alignment, white text fill with a subtle black drop shadow/outline for readability, title/sentence casing. Positioned in the lower-middle third (overlapping the chest/neck area).
* **Subject & Background:** A middle-aged woman wearing clear/blush translucent glasses, blonde hair parted in the middle/side, wearing a dark/black V-neck top. Neutral indoor wall background with soft ambient lighting.

---

### 2) Exact Spoken Words & On-Screen Text (First 3 Seconds)
* **Spoken Words (Verbatim 0:00 - 0:03):**  
  *"Hi, I'm Becky and I'm a CPA. I've had a lot of people ask me..."*
* **On-Screen Text (Verbatim 0:00 - 0:03):**  
  `What’s the difference between daily payments and one extra lump sum payment each month?`

---

### 3) Visual System Across the Video
* **Palette:** Realistic everyday tones (talking head) transitioning to classic Microsoft Excel software colors: soft grey UI, white grid canvas, bold yellow row highlights (`#FFF275` style), light green table highlights, and green/blue/purple directional arrows.
* **Typography:** 
  * *Hook overlay:* Clean white sans-serif with subtle outline.
  * *Spreadsheet:* Microsoft standard UI font (**Aptos Narrow** / Calibri), regular/bold data formatting, standard Excel accounting number styles (`$#,##0.00`).
* **How Numbers Appear:** Real live-recorded physical laptop screen showing Microsoft Excel spreadsheets with formulas already structured and cells highlighted/revealed via scrolling and static view.
* **Motion & Transitions:** 
  * Direct cut from talking-head intro (0:00–0:25) to a handheld camera shot looking down at a laptop screen (0:26–4:38), then a hard cut back to talking head (4:39–5:08).
  * Camera pans, tilts, and slow vertical scrolls across the Excel sheet to follow along with the spoken math.
* **Cuts per 10 s:** Extremely low pace (~0.1 cuts/10s; only 2 major scene cuts across 5:08).
* **Captions Style:** No automated bouncy subtitles; only static hook text on the intro frame.
* **Music / SFX:** Purely raw, clean voiceover narration with ambient room sound. No background music or UI sound effects.

---

### 4) The Math: Calculations & Reveal Order

1. **Baseline Parameters:**
   * Loan Amount: **$75,000.00**
   * Interest Rate: **7%**
   * Days Between Payments: **30 days** (May 31 to June 30)
   * Daily Interest Rate / Formula: $\frac{7\%}{365} \times \$75,000 = \mathbf{\$14.38/\text{day}}$

2. **Scenario 1: Single Monthly Lump Sum Payment ($1,500 Extra):**
   * Payment: **$1,500.00**
   * Total Interest accrued ($14.38 \times 30$): **$431.51**
   * Principal Paid ($1,500.00 - $431.51): **$1,068.49**
   * Ending Principal Balance ($75,000 - $1,068.49): **$73,931.51**

3. **Scenario 2: Daily Micro-Payments ($50/day over 30 days = $1,500 total):**
   * Day 1 Daily Interest: **$14.38** $\rightarrow$ Principal Paid: **$35.62** $\rightarrow$ New Balance: **$74,964.38**
   * Daily Interest drops incrementally as balance reduces: from **$14.38** (Day 1) down to **$14.18** (Day 30).
   * Total Payments Made: **$1,500.00** (30 payments of $50)
   * Total Principal Paid: **$1,071.47**
   * Total Interest Paid: **$428.53**
   * Ending Balance: **$73,928.53**

4. **The Comparison (Payoff / Delta):**
   * Extra Principal Reduction: $\$1,071.47 - \$1,068.49 = \mathbf{+\$2.98}$
   * Interest Saved: $\$431.51 - \$428.53 = \mathbf{-\$2.98}$
   * Net Balance Difference: $\$73,931.51 - \$73,928.53 = \mathbf{\$2.98\text{ lower balance in 1 month}}$

---

### 5) Structure & Beats
* **0:00 - 0:25 (The Hook & Credibility):** Introduces herself as a CPA; states the widespread debate around daily micro-payments vs. monthly lump sum.
* **0:26 - 1:51 (Scenario A):** Demonstrates monthly calculation ($1,500 extra) on a $75k balance at 7%.
* **1:52 - 3:36 (Scenario B):** Breaks down daily payments ($50/day) showing day-by-day compounding interest reduction.
* **3:37 - 4:38 (The Payoff / Summary Table):** Side-by-side comparison reveals the exact delta (**$2.98/month**).
* **4:39 - 5:08 (The Big Takeaway / Outro):** Contextualizes why small daily interest savings create a compounding snowball effect over long loan amortizations (mortgages, student loans).
* **Looping:** Does not seamlessly loop; closes with a structured final financial principle.

---

### 6) Ending, CTA, & Engagement Drivers
* **Ending:** Ends on a strong personal finance rule: *"Every dollar that you reduce your principal today is a dollar less that you have to pay interest on tomorrow."*
* **CTA:** Implicit authority CTA (no aggressive "link in bio" pitch, which enhances trust).
* **Engagement Drivers (Comments/Saves/Shares):**
  * *Comment driver:* People debating whether saving ~$3/month is worth the hassle of daily payments vs. automated monthly payments.
  * *Save driver:* The transparent spreadsheet layout gives a clear template for viewers managing mortgages or student debt.

---

### 7) What Makes It Work

#### Look (3 Bullets)
* **Authentic "Desk-Level" Realism:** Filming the physical laptop screen with real Excel sheets builds immediate grassroots credibility compared to polished animated graphics.
* **Clean Spreadsheet UX:** Clear color coding (yellow row highlights, distinct column headers, bold summary lines) makes multi-digit financial math instantly readable on mobile.
* **Warm, Professional Presence:** Personal face-to-camera opening establishes CPA authority while maintaining an approachable demeanor.

#### Hook (3 Bullets)
* **Direct Comparison Question:** Solves an ongoing viral personal finance debate ("micro-payments vs lump sum") right in the opening seconds.
* **Instant CPA Authority:** Saying *"I'm Becky and I'm a CPA"* immediately signals expert-backed data rather than generic TikTok advice.
* **Relatable Premise:** Frame 1 text clearly articulates a specific, actionable debt-payoff dilemma that resonates with anyone carrying a mortgage, car loan, or student debt.

---

### A.3 Replying to @Am_taylor an extra $100 per month can really make a difference! (7677265948205698318), durationSeconds 177.634

Here is the detailed analysis of the video based on your custom instructions:

---

### 1) FRAME 1 (0.0 s) Breakdown

* **Layout & Composition:** Vertical 9:16 talking-head shot centered on a woman speaking directly to the camera.
* **Background:** Bright indoor residential setting (kitchen/living area with white cabinets and a plant visible).
* **Face/Hands/UI:**
  * **Speaker:** Blonde woman wearing clear-rimmed glasses, a white collared jacket over a dark blue under-layer.
  * **Top-Left UI Overlay:** TikTok comment reply sticker.
  * **Bottom Overlay:** On-screen text prompt centered in the lower-middle third.
* **Verbatim Text & Font Styling:**
  * **Comment Sticker (Top-Left):**
    * Text: *"Reply to Am_taylor's comment / Now do monthly payments with an extra $100 going to principal so essentially $1000 a month"*
    * Style: Native TikTok reply widget (white background, small sans-serif font, circular profile avatar).
  * **Hook Text (Lower Third):**
    * Text: *"How much difference does an extra $100 per month make on a car loan payoff?"*
    * Style: Sans-serif font, bold, sentence/title casing, white lettering with a subtle dark drop-shadow/stroke.

---

### 2) First 3 Seconds (Spoken Words & On-Screen Text)

* **Spoken Words (0:00 - 0:03):**
  > *"Let's see how much difference an extra $100 per month makes on a car loan payoff..."*
* **On-Screen Text (Verbatim):**
  * Top-Left: *"Reply to Am_taylor's comment / Now do monthly payments with an extra $100 going to principal so essentially $1000 a month"*
  * Bottom: *"How much difference does an extra $100 per month make on a car loan payoff?"*

---

### 3) Visual System Across the Video

* **Palette:** Office/Excel aesthetic — soft blues, greys, and white grid cells; real-world natural indoor lighting on the talking-head shots.
* **Typography:** Clean sans-serif on the screen recording (*Carlito* in Microsoft Excel) and standard TikTok sans-serif font for overlays.
* **How Numbers Appear:** Spreadsheet UI (Microsoft Excel 75-Month Car Loan Payoff Template). Values are typed into blue/green input cells and calculate automatically across the amortization table and payoff summary cards.
* **Motion & Transitions:**
  * Direct cuts between the talking-head camera and POV screen captures of the laptop screen and keyboard.
  * Smooth handheld pan/zoom over specific Excel cells to emphasize changing numbers.
* **Pacing / Cuts:** ~4 cuts across a ~177-second video (~0.22 cuts per 10 s; very long, steady educational takes).
* **Captions Style:** Minimal native TikTok comment overlay persisting in the corner; no animated word-by-word subtitles.
* **Music / SFX:** Natural ambient speaking voice, keyboard typing sounds, and background birds chirping outside; no background music track.

---

### 4) The Math & Calculations (In Order of Appearance)

1. **Initial Baseline Loan Terms:**
   * **Original Loan Amount:** `$58,593.13`
   * **Interest Rate:** `4.240%`
   * **Term:** `75 months`
   * **Scheduled Monthly Payment:** `$892.24`
   * **Total Interest Paid (Baseline):** `$8,192.41`
   * **Baseline Payoff Date:** `06/01/2028` (June 1, 2028)
2. **Scenario 1 — Rounding Up to $1,000/Month (Extra Principal):**
   * **Extra Monthly Amount:** `$1,000.00 - $892.24 = $107.76`
   * **Total Interest Paid:** `$7,174.63` (Savings: `$1,017.78`)
   * **New Payoff Date:** `09/01/2027` (September 1, 2027 — saves 9 months / 9 payments).
3. **Scenario 2 — Baseline Bi-Weekly Payments ($892.24/month converted to bi-weekly without extra):**
   * **Bi-Weekly Payment:** `$446.12` every 14 days.
   * **Total Interest Paid:** `$7,396.46` (Savings: `$795.95`)
   * **New Payoff Date:** `11/05/2027` (November 5, 2027 — eliminates 209 days).
4. **Scenario 3 — Bi-Weekly Payments with Extra ($1,000/month equivalent bi-weekly):**
   * **Extra Bi-Weekly Amount:** `$53.88` (Total bi-weekly payment: `$500.00`)
   * **Total Interest Paid:** `$6,499.07` (Savings: `$1,149.96` vs. standard bi-weekly; `$1,693.34` vs. baseline monthly)
   * **Final Accelerated Payoff Date:** `03/12/2027` (March 12, 2027 — eliminates 326 days / over 15 months earlier than the baseline).

---

### 5) Structure & Beat Breakdown

* **0:00 - 0:10 (Hook):** Sets up the viewer's question via comment sticker: what happens if you add $100/mo to round up to $1,000, and what if you switch to bi-weekly?
* **0:11 - 0:52 (Baseline Context):** Shows real loan numbers on a Jeep loan ($58k at 4.24%) and establishes June 2028 as the baseline end date.
* **0:53 - 1:20 (Payoff #1 — Monthly $1,000):** Inputs $107.76 extra; payoff accelerates to September 2027.
* **1:21 - 1:49 (Bi-Weekly Baseline):** Compares paying standard half-payments every two weeks; payoff moves to November 2027.
* **1:50 - 2:12 (Biggest Payoff / Peak Acceleration):** Inputs $500 bi-weekly; payoff lands on **March 12, 2027** (saving over a full year and over $1,600 in interest).
* **2:13 - 2:57 (Summary & Recap):** Returns to talking head to clearly compare all 4 options side-by-side.
* **Loop:** Does not create a seamless infinite loop; concludes naturally as a structured recap.

---

### 6) Ending and CTA

* **Ending:** Clear verbal recap summarizing the payoff timelines (`June '28` $\rightarrow$ `Nov '27` $\rightarrow$ `Sept '27` $\rightarrow$ `March '27`).
* **Engagement Triggers (Comments/Shares/Saves):**
  * **Saves:** Highly saveable because it functions as an educational reference on how bi-weekly mortgage/auto loan hacks work.
  * **Comments:** Replying directly to a user's comment encourages other viewers to drop their own loan amounts and interest rates in the comments requesting custom calculations.

---

### 7) What Makes It Work

#### What Makes the Look Work:
* **Tangible Proof (Spreadsheet UI):** Filming the actual Excel interface rather than just talking builds immediate trust and authority.
* **Real-World Numbers:** Using an authentic, non-rounded vehicle balance (`$58,593.13`) makes the demonstration relatable and realistic.
* **Clear Input vs. Output Distinction:** Highlighting the blue input cells and green calculation summaries helps viewers follow complex amortization math easily.

#### What Makes the Hook Work:
* **Direct Community Response:** Answering a real comment immediately signals high engagement and relevance.
* **Clear, Quantifiable Curiosity Gap:** Asking *"How much difference does an extra $100 make?"* poses a concrete financial question viewers want answered.
* **Dual-Variable Comparison:** Promising to compare both extra principal *and* bi-weekly frequency increases anticipation for the final result.

---

### A.4 What are some strategies to pay credit card debt faster? (7668431231775755534), durationSeconds 323.453

Here is a complete, structured analysis of the video based on your instructions.

---

### 1) Frame 1 (0.0 s) Breakdown
* **Layout:** Centered vertical selfie shot (9:16 portrait orientation) of a woman talking directly to the camera.
* **On-screen Text:** 
  * Verbatim text: `"Credit Card Debt Payoff Strategies"`
  * Placement: Lower-third area across her chest.
  * Typography: Sans-serif font, bold weight, Title Case, white text fill with a subtle black drop shadow/stroke for legibility.
* **Subject & Props:** A middle-aged woman with blonde hair, clear-framed glasses, wearing a black sleeveless ribbed top, smiling directly at the camera.
* **Background:** Clean, neutral indoor office/home setting with an off-white wall and a green potted plant visible on the right side.

---

### 2) First 3 Seconds (Hook)
* **Verbatim Spoken Words:**  
  *"Let's talk about credit card debt payoff strategies. Hi, my name is Becky and I'm a CPA."*
* **Verbatim On-Screen Text:**  
  `"Credit Card Debt Payoff Strategies"`

---

### 3) Visual System Across the Video
* **Palette:**
  * Talking head: Natural skin tones, blonde, black top, cream/off-white background.
  * Spreadsheet: Standard Microsoft Excel light theme (white cells, gray gridlines, dark gray headers, standard green Excel accents), black text for charges/balances, red font for payments/credits, light gray fill for summary rows, blue selection boxes.
* **Typography:**
  * Hook Title: Bold sans-serif, white with black outline.
  * Spreadsheet: Standard Excel system font (`Aptos Narrow` / `Calibri`), regular and bold weights.
* **How Numbers Appear:**
  * Screen recording / direct capture of a live Excel desktop application. Numbers are organized in clean financial ledger tables (Date, Description, Amount, Daily Balance, Monthly Summary).
  * The creator uses the mouse cursor to click into cells, drag-select cell ranges to highlight calculation blocks, and reveal formulas in the formula bar (`fx`).
* **Motion & Transitions:**
  * Hard cuts between the direct-to-camera intro/outro and different Excel worksheet tabs (`Normal`, `Random Micro`, `Pay Charges Daily`, `Pay Charges + Micro`).
  * Subtle vertical scrolling within Excel to show the summary cards at the bottom.
* **Pacing / Cuts per 10 s:**
  * Very deliberate, educational pacing: ~0.15 cuts per 10 seconds (total runtime ~5:22 with only 5 main scene cuts across 4 spreadsheet models).
* **Captions Style:** No burn-in open captions during the body; relies only on static title text at the start and clear visual tabular data.
* **Music & SFX:** Clean vocal audio only; no background music or artificial sound effects.

---

### 4) The Math & Calculation Breakdown (In Order of Appearance)

#### Scenario 1: Standard Minimum / End-of-Month $200 Payment
* **Interest Rate:** `23.99%` (Annual)
* **Opening Balance:** `$9,250.00`
* **Charges Added:** `$52.00` + `$23.00` + `$11.00` + `$37.00` + `$150.00` + `$42.00` + `$5.00` = `Total Charges: $320.00`
* **Payment:** `($200.00)` at end of month (6/30).
* **Average Daily Balance (ADB):** Sum of daily balances / 30 days = `$9,434.80`
* **Monthly Interest Formula:** `=(23.99% / 365) * 30 * $9,434.80` = `$186.03`
* **Ending Balance:** `$9,250.00 + $320.00 - $200.00 + $186.03 = $9,556.03`
* **Net Balance Change:** `+$306.03` *(Balance increased despite paying $200)*.

#### Scenario 2: Random Micro-Payments
* **Opening Balance:** `$9,250.00` | **Total Charges:** `$320.00`
* **Payments:** Multiple $2, $3, $5, $10, $20, $25 payments throughout the month + $200 at end = `Total Payments: ($339.00)`
* **Average Daily Balance:** `$9,374.60`
* **Monthly Interest:** `$184.85`
* **Ending Balance:** `$9,415.85`
* **Net Balance Change:** `+$165.85` *(Slight improvement, but balance still increases because charges + interest > payments)*.

#### Scenario 3: Pay Each Charge Immediately Next Day (Zero New Debt Growth)
* **Opening Balance:** `$9,250.00`
* **Charges:** `$320.00` | **Offsetting Payments for each charge:** `($320.00)` + **Month-End Base Payment:** `($200.00)` = `Total Payments: ($520.00)`
* **Average Daily Balance:** `$9,254.00`
* **Monthly Interest:** `$182.47`
* **Ending Balance:** `$9,232.47`
* **Net Balance Change:** `-$17.53` *(First time balance actually decreases)*.

#### Scenario 4: Pay Each Charge Next Day + Random Micro-Payments
* **Opening Balance:** `$9,250.00`
* **Charges:** `$320.00`
* **Offsetting Payments + Micro-payments + End Payment:** `Total Payments: ($590.00)`
* **Average Daily Balance:** `$9,223.17`
* **Monthly Interest:** `$181.86`
* **Ending Balance:** `$9,161.86`
* **Net Balance Change:** `-$88.14` *(Largest reduction in principal balance)*.

---

### 5) Structure & Beat Breakdown
* **0:00 – 0:15 | Intro & Credibility Hook:** Host introduces herself as a CPA and frames the mission: understanding how credit card interest math works so viewers can pay debt off faster.
* **0:16 – 2:05 | Beat 1 (The Trap):** Demonstrates the default user behavior (making charges, paying $200 at month-end). **First Payoff / Realization:** Reveals that paying $200 still resulted in owing **+$306.03 more**.
* **2:06 – 2:48 | Beat 2 (The Flawed Fix):** Tests the popular advice of "random micro-payments." Shows that without matching new charges, the balance still increases by **+$165.85**.
* **2:49 – 3:30 | Beat 3 (The Matching Strategy):** Demonstrates matching every charge next day + base payment. Shows the first balance decrease (**-$17.53**).
* **3:31 – 4:04 | Beat 4 (The Accelerated Strategy / Biggest Number):** Combines next-day charge payoff with daily micro-payments. **Biggest payoff:** Principal drops by **-$88.14** in a single month on the exact same spending.
* **4:05 – 4:50 | Beat 5 (Summary & Behavioral Takeaway):** Talking head recaps the principle: ending balance must always be lower than beginning balance.
* **4:51 – 5:22 | Outro & CPA Warning:** Explains trailing/residual interest ("residual interest trap") when paying off accounts in full.
* **Loop Status:** Does not seamlessly loop; structured as a formal masterclass-style lesson.

---

### 6) Ending, Call to Action (CTA) & Engagement Triggers
* **Ending Statement:** Explains why viewers must wait for the final billing cycle statement to confirm zero residual interest so the card is truly "paid in full."
* **Engagement / Save / Share Triggers:**
  * **High Save Value:** The video provides a repeatable, 4-step financial model that viewers will want to reference while reviewing their own credit card statements.
  * **Comment Driver:** Debunks the myth that making small micro-payments alone solves debt without addressing daily transaction matching, inviting debate from viewers using different payoff methods (Snowball vs. Avalanche vs. Daily Pay).

---

### 7) What Makes the Look & Hook Work

#### What Makes the Look Work:
1. **Real Native Tool (Excel over Fancy Graphics):** Using a live spreadsheet instantly conveys institutional authority and authenticity, looking like a real one-on-one session with a CPA rather than a generic financial ad.
2. **Visual Contrast in Ledger:** Color-coding charges (black) vs. credits/payments (red) lets viewers immediately grasp cash flow direction at a glance.
3. **Cursor as a Pointer:** Selecting ranges and clicking formula bars actively directs visual focus to the exact arithmetic being discussed.

#### What Makes the Hook Work:
1. **Immediate Subject Clear Framing:** States `"Credit Card Debt Payoff Strategies"` both audibly and on-screen within the first second.
2. **Instant Authority Stacking:** Introducing herself as a `"CPA"` and `"Numbers Geek"` establishes immediate trust on a high-stakes topic (personal finance).
3. **Pain-Point Promise:** Delivers a clear outcome within 10 seconds: *"understand your debt better so that you can pay it off faster."*

---

## Appendix B. vidIQ outlier-search entries for this channel (verbatim)

Source: `vidiq_instagram_tiktok_outlier_search`, query "CPA screen-records a spreadsheet amortization schedule to show how extra payments, biweekly payments or rounding up pay off a car loan, credit card or mortgage faster and save interest", concept embedding, `collapseByCreator=false`, 60 results per platform, posted after 2025-10-01, at least 1,000 views. 5 of the 60 TikTok results were this channel. The other results come from creators outside the approved benchmark and are not used anywhere in this file.

**@thedebtfreedomproject** — "Replying to @Am_taylor an extra $100 per month can really make a difference! #debt #debtpayoff #debt... #debtpayoffjourney #carloan #loan"
   290.7K views (127.3x their median of 2.3K) · 41.7K followers · 177s
   https://www.tiktok.com/@thedebtfreedomproject/video/7677265948205698318
   **tiktok_concept**: A creator demonstrates the impact of extra payments and payment frequency on a car loan using a spreadsheet.
   **niche**: Personal Finance
   **hook_0_3s**:
     visual: A split-screen approach with a comment overlay above the creator's face.
     text: How much difference does an extra $100 per month make on a car loan payoff?
     audio: Immediate speaking with an informative, direct tone.
   **format**:
     style: split screen (creator + screen recording)
     intended_value: Education
     is_looped: false
     template: screen recording with voiceover commentary
   **effort**:
     time: within an hour
     barrier: requires spreadsheet software knowledge and prepared data
   **execution**:
     pacing: Moderate
     text_overlays: Guiding text
     visual_changes: Moderate
   **audio**:
     audio_mix: Voice only
     sfx_present: false
   **audience**:
     culture_region: United States
     audience_is_global: false
     demographics: Adults aged 25-45 looking for debt management strategies

**@thedebtfreedomproject** — "Look what a difference rounding makes! #debt #micropayments #debtpayoffjourney #carloan #debtpayoff"
   1.9M views (902.5x their median of 2.1K) · 42.4K followers · 354s
   https://www.tiktok.com/@thedebtfreedomproject/video/7668828789551418637
   **tiktok_concept**: A CPA demonstrates how changing payment frequencies and adding small extra amounts to a car loan can significantly reduce the total interest paid and payoff time.
   **niche**: Finance
   **hook_0_3s**:
     visual: A person speaking directly to the camera.
     text: What difference does monthly, biweekly, and weekly payments make on paying off a car loan?
     audio: Immediate conversational speaking.
   **format**:
     style: Split screen (creator + screen recording)
     intended_value: Education
     is_looped: false
     template: screen recording walkthrough with camera
   **effort**:
     time: within a day
     barrier: requires spreadsheet knowledge and ability to clearly explain complex data
   **execution**:
     pacing: Moderate
     text_overlays: Static text
     visual_changes: Moderate (switching between camera and spreadsheet views)
   **audio**:
     audio_mix: Voice only
     sfx_present: false
   **audience**:
     culture_region: United States
     audience_is_global: false
     demographics: Adults 25-50 interested in personal finance and debt reduction

**@thedebtfreedomproject** — "What are some strategies to pay credit card debt faster? #debt #micropayments #debtpayoffjourney #de... #creditcards"
   90.6K views (52.5x their median of 1.7K) · 41.6K followers · 323s
   https://www.tiktok.com/@thedebtfreedomproject/video/7668431231775755534
   **tiktok_concept**: A CPA explains credit card debt payoff strategies by visually walking through a spreadsheet calculation.
   **niche**: Personal Finance
   **hook_0_3s**:
     visual: Talking head of the creator looking directly into the camera.
     text: Credit Card Debt Payoff Strategies
     audio: Immediate conversational speaking.
   **format**:
     style: Split screen (talking head + screen recording)
     intended_value: Education
     is_looped: false
     template: educational screen recording with talking head
   **effort**:
     time: within an hour
     barrier: requires basic spreadsheet knowledge
   **execution**:
     pacing: Moderate
     text_overlays: Static text
     visual_changes: Moderate
   **audio**:
     audio_mix: Voice only
     sfx_present: false
   **audience**:
     culture_region: North America (US)
     audience_is_global: false
     demographics: Adults interested in personal finance and debt management

**@thedebtfreedomproject** — "Yes, daily payments work! #debt #studentloan #micropayments #debtpayoffjourney #debtpayoff"
   382.1K views (289.1x their median of 1.3K) · 41.6K followers · 308s
   https://www.tiktok.com/@thedebtfreedomproject/video/7667419558063525133
   **tiktok_concept**: A certified public accountant compares the financial impact of making daily loan payments versus a single monthly lump sum payment.
   **niche**: Finance
   **hook_0_3s**:
     visual: Close-up of the creator speaking directly into the camera.
     text: What's the difference between daily payments and one extra lump sum payment each month?
     audio: Creator's voice speaking directly to the camera.
   **format**:
     style: talking head and screen recording
     intended_value: Education
     is_looped: false
     template: screen recorded walkthrough with narration
   **effort**:
     time: within an hour
   **execution**:
     pacing: Moderate
     text_overlays: Static text
     visual_changes: Moderate
   **audio**:
     audio_mix: Voice only
     sfx_present: false
   **audience**:
     culture_region: United States
     audience_is_global: true
     demographics: Adults aged 30-55, interested in financial literacy and debt management.

**@thedebtfreedomproject** — "Small changes can make a big difference in paying off a car loan. #debt #debtpayoff #debtpayoffjourn... #debtpayoffjourney #micropayments #jeep"
   266.7K views (44.5x their median of 6K) · 41.6K followers · 290s
   https://www.tiktok.com/@thedebtfreedomproject/video/7671119810108935437
   **tiktok_concept**: A financial professional helps her father use an excel spreadsheet template to calculate how to pay off his new Jeep loan faster.
   **niche**: Personal Finance
   **hook_0_3s**:
     visual: Static camera shot of the creator and her elderly father looking directly at the camera.
     text: Watch me help my dad cut his Jeep loan from 5 years to 2 years.
     audio: Immediate speaking in a casual, conversational tone.
   **format**:
     style: Talking head + screen recording
     intended_value: Education
     is_looped: false
     template: live-action face-to-camera with screen recording
   **effort**:
     time: within a day
     barrier: Requires knowledge of financial amortization and the ability to explain complex spreadsheets simply
   **execution**:
     pacing: Moderate
     visual_changes: Moderate (switching between faces and screen recording)
   **audio**:
     audio_mix: Voice only
     sfx_present: false
   **audience**:
     culture_region: United States (implied by the use of dollars, the 'Jeep' car, the veteran hat, and the accent).
     audience_is_global: false
     demographics: Adults interested in personal finance, likely middle-aged or older individuals managing debt.

