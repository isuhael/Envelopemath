# FinCalC TV (YouTube, @fincalc): deep study

**Benchmark rank:** #3 in the approved finance-math-core set (85% calculator maths, 79 of 93 Shorts; 282K subscribers at qualification).
**Study date:** 2026-10-07
**Channel ID:** UCymd4lQ9ZJpvd7Pjz0g7vJQ (owner per qualification file: Abhilash Gupta)
**Sources used (all vidIQ):** 4 x `vidiq_watch_shortform_content` (custom LOOK/HOOK prompt), 3 x `vidiq_video_transcript`, 2 x `vidiq_channel_videos` (shorts, popular=true and popular=false). Budget used: 4/4 watch jobs, 3/3 transcripts (one returned "No transcript available"), 2/2 catalogue calls. Polls were free.
**Rule:** every number, title and URL below comes from those calls. View counts are as returned on 2026-10-07. The "outlier" figure is vidIQ's `breakoutScore` (n/a where vidIQ returned null). Hex values are vidIQ estimates and are marked "est.". My own arithmetic checks were run in Python and are labelled "check". Anything not seen is "unknown".

---

## 0. Headline findings

1. **The look is "a spreadsheet as the hero shot".** All four videos put an Excel-style grid at the centre: white cells, bold black sans-serif numbers with the ₹ sign, pale coloured header cells, one loud yellow banner. There is no handwriting, no counter, no chart, no animation of the numbers themselves. The only motion is the table appearing (row-by-row unmask or a smooth scroll) or nothing at all.
2. **Correction to the qualification note: it is not fully faceless.** The 2.14M Sukanya Samriddhi short opens and closes on the creator **on camera** (talking head, light-grey tee, cyan wall, YouTube Silver Play Button plaque on the wall). Only the middle 20 s is the spreadsheet. The 3.77M SIP short is faceless (voice only for the first ~6 s).
3. **Correction to the qualification note: the 6-second "single-result cards" are actually 16-row lookup tables.** Both 6 s breakouts (MIS 54.46x, SCSS 51.68x) are one static image held for 5 to 6 s: a yellow title box, a 3-column table of 16 deposit tiers (₹50,000 to ₹15,00,000; ₹1,00,000 to ₹30,00,000) and a keyword-comment CTA bar. No voice. The viewer's job is to **find their own row**, which needs a pause or a re-watch.
4. **The hook is the title plus frame 1, not a line of dialogue.** The 2022-23 hits use a spoken question in Hindi ("how much return can you get on ₹2000 monthly SIP at 12%?"). The 2026 cards have no voice at all; the entire answer is visible at 0.0 s.
5. **Payout-first titles are the strongest repeatable formula.** "Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate" (428,862, 54.46x) and "Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate" (264,377, 51.68x). Across 93 Shorts, the payout-first formula ("Monthly Income / Income for / Monthly Pension") has a median of **100,740** views (n=11), against 53,954 for amount-first, 20,748 for tax, 13,322 for "X vs Y" and 12,314 for "How to make ₹1 Crore". Only the loan/EMI formula is higher (median 578,461), but that is just 3 shorts, two of them from 2022.
6. **The biggest short's numbers do not match its own label (check).** The 3.77M short says "@12%" in the banner and in the voice-over, but every year in the table (as read by vidIQ) matches a **10% p.a.** SIP exactly (monthly compounding, payment at the start of the month). 7 of 7 years checked match to the rupee. It still got 3.77M views and 44,480 likes.
7. **The 6 s cards buy views, not engagement.** Card like rate median is **0.20%** (20 cards) against **1.68%** for the 27 Shorts of 60 s or less from 2022-23. The MIS card has 8 public comments on 428,862 views despite the "Comment POMIS" CTA.

---

## 1. Channel facts and eras

| Field | Value |
|---|---|
| Channel | **FinCalC TV**, [@fincalc](https://www.youtube.com/@fincalc) |
| Subscribers | 282K (qualification file, 2026-10-07) |
| Finance-math share | 85% (79/93 Shorts) per qualification file |
| Catalogue pulled | 93 unique Shorts: 50 "popular", 50 "recent", 7 in both. Recent window: 2026-03-23 to 2026-09-23 |
| Language | Hindi voice (2022-23 hits); English titles and on-screen text throughout |
| Watermark | `fincalc-blog.in` (yellow top banner, 2022-23 hits) |

Three eras show up in the catalogue (durations and dates from vidIQ; medians computed here):

| Era | What it is | n in catalogue | Median views | Like rate (median) | Best example |
|---|---|---:|---:|---:|---|
| 2022-23 | 28 to 60 s: spreadsheet reveal with Hindi voice, sometimes talking-head bookends | 27 (≤60 s, before 2024) | 89,045 | 1.68% | [₹2000 SIP Returns for 1-15 Years](https://www.youtube.com/shorts/Y57tm58Y6zI), 3,771,667 |
| 2025 to Jul 2026 | 1 to 3 min explainers (tax, SWP, NPS, ITR) | 30 recent Shorts longer than 6 s | 2,098 (recent only) | unknown (not computed) | [SWP for Monthly Income](https://www.youtube.com/shorts/BTqcVJR66sQ), 360,994 (2025) |
| Since 2026-07-31 | 5 to 6 s static cards, no voice, music only | 20 | **13,177** (mean 56,453; total 1,129,057) | **0.20%** | [Monthly Income using Post Office MIS Scheme at 7.4%](https://www.youtube.com/shorts/K2QbxGXa29k), 428,862 (54.46x) |

The cards lifted the recent median about 6x over the 2-3 min explainers they replaced, but only 4 of 20 cards passed 100K, and the two that broke out (54x, 52x) were both posted in the first four days of the format (2026-08-02 and 08-03).

---

## 2. Videos studied

| # | Short | Views | Outlier | Length | Published | Why it was picked |
|---|---|---:|---:|---:|---|---|
| 1 | [₹2000 SIP Returns for 1-15 Years #fincalc #shorts](https://www.youtube.com/shorts/Y57tm58Y6zI) | 3,771,667 | n/a | 30 s | 2022-10-30 | Biggest short on the channel; the "year ladder" reveal |
| 2 | [Rs. 1000 in Sukanya Samriddhi Yojana Scheme #fincalc](https://www.youtube.com/shorts/pUlH-hZ6KcM) | 2,139,784 | n/a | 41 s | 2023-05-07 | Second biggest; the same ladder with a talking-head wrapper |
| 3 | [Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate](https://www.youtube.com/shorts/K2QbxGXa29k) | 428,862 | **54.46x** | 6 s | 2026-08-02 | Current breakout format (6 s card) |
| 4 | [Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate](https://www.youtube.com/shorts/0Gc_IRi9RbU) | 264,377 | **51.68x** | 6 s | 2026-08-03 | Second 6 s breakout; confirms the card template |

Transcripts: #1 and #2 returned Hindi auto-captions; #3 returned "No transcript available" (consistent with vidIQ hearing no voice). #4 was not requested (budget), and vidIQ's watch reports no voice.

---

## 3. The FinCalC look (synthesis across the 4 watched videos)

**One idea:** the number lives in a spreadsheet cell, and the spreadsheet is the whole picture.

### 3.1 Layout in the 9:16 frame

- **2022-23 template (SIP short):** full-width **signal-yellow banner at the very top** carrying the URL `fincalc-blog.in`; below it the spreadsheet (upper-middle); **black negative space** in the lower-middle where future rows will appear; a full-width **neon/lime-green banner at the bottom** with a two-line title (`Rs. 2000 SIP Returns` / `for 1-15 Years @12%`). The yellow top + green bottom bookend the grid.
- **2023 talking-head variant (SSY short):** creator centred, cyan wall behind, Silver Play Button plaque upper right; same yellow top banner (`fincalc-blog.in`) and light-green lower-third banner (`Rs. 1000 Monthly Deposits` / `Sukanya Samriddhi Yojana`). At 0:10 a hard cut goes to a full-screen spreadsheet.
- **2026 card template (MIS, SCSS):** black letterbox bars top and bottom; a **white card** in the middle. On the card: a **yellow rounded title box** (MIS has a thin red stroke) in the top 20%; on MIS a rate row (`MIS Interest Rate` in a light-green pill + `7.4` in a green-bordered box); a **3-column table with 16 rows** filling the middle ~60%; a **CTA bar** at the bottom (`❤️ Comment "POMIS" to get Excel Calculator`, white on black; SCSS: `❤️ Comment "Senior Citizen" to get Calculator` with a bookmark icon at the right).

### 3.2 Palette (all est. by vidIQ)

| Role | Colour |
|---|---|
| Hero banner (title or URL) | Signal / canary yellow (#FFEB3B, #FFE800, #FFFF00 est.) |
| Title banner, 2022-23 bottom | Neon/lime green (#39FF14 / #7CFC00 est.) or light spring green (#90EE90 est.) |
| Input column headers | Light mint green (#C8E6C9 est.) |
| Output column header ("Total Income") | Muted peach (#FFE0B2 est.) |
| Alternative header row (SCSS, SSY) | Light sky blue (#E0F2FE est.) |
| Cells | Pure white #FFFFFF |
| Numbers and text | Black #000000; rate value in dark green (#2E7D32 est.) |
| Surround | Pure black (letterbox or negative space) |
| Accent | Red heart emoji in CTA; thin red stroke on MIS title box |

### 3.3 Typography

- One family everywhere: plain **bold sans-serif in the Arial / Helvetica / Roboto mould** (vidIQ's description in all four). No serif, no script, no handwriting.
- Title text is **Title Case**, black on yellow or green. Numbers are black, set as Excel would: `₹ 24,000.00`, `₹ 8,35,849.00` (2022), `₹ 5,39,452` (2023). In the 2026 cards vidIQ transcribes the amounts in Western grouping (`₹ 1,500,000`) but also says "Indian numbering"; the grouping style on the cards is **unknown**.
- No burned-in captions in any of the four. Static banners do the captioning job.

### 3.4 How numbers appear

| Short | Number device | Motion |
|---|---|---|
| SIP 3.77M | Screen-recorded spreadsheet | Rows unmask **one at a time from Year 1 to Year 15**, about one row every 1.3 to 1.4 s (vidIQ timings: Y1 0:00, Y5 0:04, Y10 0:12, Y15 0:20). Then a 9 s hold on the full table |
| SSY 2.14M | Spreadsheet (green/blue headers, white cells, bold black numbers) | One **smooth upward scroll** from Year 1 to Year 21 (0:10 to ~0:27/0:30) |
| MIS 429K | Pre-rendered table image | **Fully static**. Every number visible at 0.0 s |
| SCSS 264K | Pre-rendered table image | **Fully static**. Every number visible at 0.0 s |

### 3.5 Pace, sound and edit

- Cuts: **0 per 10 s** (SIP, MIS, SCSS); about **1.3 per 10 s** (SSY: talking head -> spreadsheet -> talking head -> CTA graphic).
- Music under everything: upbeat lo-fi hip-hop / trap with guitar (SIP), hip-hop/trap (SSY), uptempo synth-pop (both 2026 cards). No SFX on reveals were reported.
- Voice: Hindi, only in the first ~6 s (SIP) or first 10 s plus the outro (SSY). None in the cards.

---

## 4. Per-video study

### 4.1 ₹2000 SIP Returns for 1-15 Years (3,771,667 views, 30 s, 2022-10-30)

**Frame 1 (0.0 s), per vidIQ:** top: full-width bright-yellow banner, `fincalc-blog.in` in black bold sans, centred. Upper-middle: spreadsheet. Label cell `SIP Amount` (green fill, black bold sans) next to value `₹ 2,000.00` (white cell). Column headers `Years`, `Total Deposits`, `Maturity Amount`, `Profits` (dark green/teal text on light-green fill, bold sans). Row 1: `1` | `₹ 24,000.00` | `₹ 25,341.00` | `₹ 1,341.00` (black, regular sans). Lower-middle: solid black. Bottom: neon-green block with `Rs. 2000 SIP Returns` / `for 1-15 Years @12%` (black bold sans). No face, no hands.

**First 3 s spoken (transcript, Hindi auto-captions, verbatim):** "2000 के मंत्री सिप पर आपको कितना रिटर्न्स मिल सकता है 12% के रेट ऑफ रिटर्न". vidIQ heard "2000 ke **monthly** SIP pe aapko kitna returns mil sakta hai 12 percent ke rate of return pe..." (the caption's "मंत्री" is a mis-hearing of "monthly", my reading). English: "How much return can you get on a ₹2000 monthly SIP at a 12% rate of return?"

**First 3 s on screen:** `fincalc-blog.in`; Year 1 and Year 2 rows; `Rs. 2000 SIP Returns for 1-15 Years @12%`.

**Beats (vidIQ):**
- 0:00 to 0:06: spoken question frames the scenario; rows Y1 to Y5 already appearing.
- 0:06 to 0:12: Year 8 (0:09) is the first "milestone": profit crosses ₹1 lakh (`₹ 1,02,799.00`).
- 0:13 to 0:20: Year 12 (0:15) profit ₹2,69,483 nearly equals deposits ₹2,88,000. **Biggest number at 0:20:** Year 15, deposits ₹3,60,000 -> maturity **₹8,35,849**, profit ₹4,75,849.
- 0:21 to 0:29: 9 s hold on the full table with music. No CTA, no loop device; the URL banner is the only "brand".

**Maths shown (all 15 rows, in the order revealed):**

| Year | Deposits | Maturity | Profit | Revealed at |
|---:|---:|---:|---:|---|
| 1 | 24,000 | 25,341 | 1,341 | 0:00 |
| 2 | 48,000 | 53,335 | 5,335 | 0:01 |
| 3 | 72,000 | 84,260 | 12,260 | 0:02 |
| 4 | 96,000 | 1,18,424 | 22,424 | 0:03 |
| 5 | 1,20,000 | 1,56,165 | 36,165 | 0:04 |
| 6 | 1,44,000 | 1,97,858 | 53,858 | 0:06 |
| 7 | 1,68,000 | 2,43,917 | 75,917 | 0:07 |
| 8 | 1,92,000 | 2,94,799 | 1,02,799 | 0:09 |
| 9 | 2,16,000 | 3,51,008 | 1,35,008 | 0:11 |
| 10 | 2,40,000 | 4,13,104 | 1,73,104 | 0:12 |
| 11 | 2,64,000 | 4,81,702 | 2,17,702 | 0:13 |
| 12 | 2,88,000 | 5,57,483 | 2,69,483 | 0:15 |
| 13 | 3,12,000 | 6,41,199 | 3,29,199 | 0:16 |
| 14 | 3,36,000 | 7,33,682 | 3,97,682 | 0:18 |
| 15 | 3,60,000 | 8,35,849 | 4,75,849 | 0:20 |

**Check:** a ₹2,000 monthly SIP at **10% p.a.** (0.8333% a month, paid at the start of each month) gives 25,341 / 53,335 / 1,56,165 / 2,94,799 / 4,13,104 / 5,57,483 / 8,35,849 for years 1, 2, 5, 8, 10, 12, 15. That is an exact match on all 7 rows checked. At the labelled 12% the same convention gives ₹25,619 after year 1 and ₹10,09,152 after year 15. So **the table is a 10% table wearing a 12% label**, unless vidIQ misread the cells (unlikely, since 7 of 7 match).

**Look notes:** two high-contrast colour bars (yellow top, neon green bottom) frame a white Excel grid on black; the black space below the grid is "empty future" that fills row by row.

**Why the hook works (vidIQ + my reading):** (1) the whole equation (₹2,000, 1-15 years, 12%) is in the bottom banner and the voice by 3 s; (2) ₹2,000 a month is an affordable, everyday amount; (3) the ladder gives a reason to keep watching (where does Year 15 land?) and a reason to save (look up your own year later).

---

### 4.2 Rs. 1000 in Sukanya Samriddhi Yojana Scheme (2,139,784 views, 41 s, 2023-05-07)

**Frame 1 (0.0 s), per vidIQ:** 9:16 **talking head**, presenter centred: young South Asian man, light-grey crew-neck tee, speaking with hand gestures. Light cyan/blue wall; YouTube Silver Play Button plaque upper right; partial wall decal middle right. Top: high-contrast yellow banner `fincalc-blog.in` (black bold sans, lowercase). Lower third: light-green banner, two lines: `Rs. 1000 Monthly Deposits` / `Sukanya Samriddhi Yojana` (black bold sans, Title Case).

**First 3 s spoken (transcript, verbatim):** "सुकन्या समृद्धि योजना में अगर आप हर महीने ₹1000 का मंथली डिपॉजिट करते हो तो अगले 21 साल तक आपको कितना रिटर्न मिल सकता है चलिए देखते हैं". English (my translation): "If you make a monthly deposit of ₹1000 every month in Sukanya Samriddhi Yojana, how much return can you get over the next 21 years? Let's see." (vidIQ's first-3-s cut: "Sukanya Samriddhi Yojana mein agar aap har mahine 1,000 rupaye ka monthly deposit karte ho...")

**First 3 s on screen:** `fincalc-blog.in`; `Rs. 1000 Monthly Deposits` / `Sukanya Samriddhi Yojana`.

**Beats (vidIQ; its two timelines differ slightly, both given):**
- 0:00 to 0:10: hook, on camera.
- 0:10: hard cut to full-screen spreadsheet; smooth upward scroll begins (Year 1).
- 0:10 to 0:17: first payoff, Year 5 and Year 10 milestones scroll past.
- 0:18 to 0:27: scroll reaches Year 21: **₹5,39,452** maturity on ₹1,80,000 deposited (biggest number).
- 0:27 to 0:30: ~3 s hold on the table.
- 0:30 to 0:36: back on camera; thumbnail of the long-form video as picture-in-picture; spoken: the full calculation video is on YouTube, link in description.
- 0:36 to 0:40: animated "LIKE & SUBSCRIBE" + bell graphic; spoken: follow for more personal-finance topics. No loop.

**Maths shown:** Year 1 deposits ₹12,000 -> balance ₹12,520; Y2 ₹26,042; Y3 ₹40,645; Y4 ₹56,417; Y5 ₹73,450; Y6 ₹91,846; Y7 ₹1,11,714; Y8 ₹1,33,171; Y9 ₹1,56,345; Y10 ₹1,81,373; Y11 ₹2,08,403; Y12 ₹2,37,595; Y13 ₹2,69,123; Y14 ₹3,03,173; Y15 ₹3,39,947 (deposits stop at ₹1,80,000); Y16 ₹3,67,143 ... Y20 ₹4,99,493; **Y21 ₹5,39,452**.

**Check:** the rate is never said in the hook or shown in the banner (unknown from the video). The numbers match SSY at **8.0% p.a.** (interest on the monthly balance, credited yearly): Y1 12,520, Y5 73,450, Y10 1,81,372, Y15 3,39,944, Y21 5,39,449, within ₹3 of every row checked.

**Look notes:** the face, the plaque and the URL do the trust work; the spreadsheet does the proof. Yellow top banner + green lower third are the same bookends as the SIP short.

**Why the hook works:** (1) a named government scheme with high search intent (parents saving for a daughter); (2) a small, specific monthly amount; (3) an explicit "let's see" promise with a horizon (21 years) that is long enough to make a big number plausible.

---

### 4.3 Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate (428,862 views, 54.46x, 6 s, 2026-08-02)

**Frame 1 (0.0 s), per vidIQ:** black bars top and bottom; white card in the centre. Top 20%: rounded yellow rectangle with a thin red stroke: `Monthly Income Scheme in` / `Post Office (POMIS Scheme)` (bold black sans, centred, Title Case). Upper middle: `MIS Interest Rate` (bold black on light-green pill) and `7.4` (bold green in a light-green box with dark-green border). Middle 60%: table with headers `Deposit Amount`, `Monthly Income` (light-green fill) and `Total Income` (peach fill), 16 rows. Bottom 10%: black bar, `❤️ Comment "POMIS" to get Excel Calculator` (white sans, regular weight). No face, no hands.

**First 3 s spoken:** none (no voice; synth-pop music). Transcript call: "No transcript available."

**First 3 s on screen:** the entire frame above, unchanged.

**Beats:** one static beat, 0:00 to 0:05/0:06. Payoff at 0.0 s. Biggest number = bottom row. It loops by default (identical first and last frame).

**Maths shown (all at once):** Monthly income = deposit x 7.4% / 12; total = monthly x 60 (5-year term).
₹50,000 -> ₹308/mo -> ₹18,480 | ₹1L -> ₹617 -> ₹37,020 | ₹2L -> ₹1,233 -> ₹73,980 | ₹3L -> ₹1,850 -> ₹1,11,000 | ₹4L -> ₹2,467 -> ₹1,48,020 | ₹5L -> ₹3,083 -> ₹1,84,980 | ₹6L -> ₹3,700 -> ₹2,22,000 | ₹7L -> ₹4,317 -> ₹2,59,020 | ₹8L -> ₹4,933 -> ₹2,95,980 | ₹9L -> ₹5,550 -> ₹3,33,000 | ₹10L -> ₹6,167 -> ₹3,70,020 | ₹11L -> ₹6,783 -> ₹4,06,980 | ₹12L -> ₹7,400 -> ₹4,44,000 | ₹13L -> ₹8,017 -> ₹4,81,020 | ₹14L -> ₹8,633 -> ₹5,17,980 | **₹15L -> ₹9,250/mo -> ₹5,55,000**.
**Check:** ₹50,000, ₹1L and ₹15L rows reproduce exactly (308, 617, 9,250; 9,250 x 60 = 5,55,000).

**Engagement:** 660 likes (0.15%), 8 comments. The comment CTA did not produce visible comment volume.

**Why the hook works:** (1) the title promises a **payout** ("Monthly Income"), not a growth figure, from a trusted government brand at a stated rate; (2) every viewer can find "their" row, so the answer is personal; (3) 16 dense rows in 6 s cannot be read in one pass, so people pause or let it loop, which is where the watch time comes from (vidIQ's reading).

---

### 4.4 Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate (264,377 views, 51.68x, 6 s, 2026-08-03)

**Frame 1 (0.0 s), per vidIQ:** black bars top and bottom; white card. Bright-yellow rounded rectangle at the top: `Income for Senior Citizen Scheme in Post Office - Interest Rate = 8.2% - for 5 Years` (bold black sans). Table with pale-blue header row `Amount`, `Quarter Interest`, `Total Interest`; 16 rows ₹1,00,000 to ₹30,00,000 with ₹ and comma separators (medium-to-bold black sans). Below: `❤️ Comment "Senior Citizen" to get Calculator` (bold black sans, trigger phrase in quotes), black bookmark icon far right.

**First 3 s spoken:** none (instrumental synth-pop). Transcript not requested (budget); vidIQ reports no voice.

**First 3 s on screen:** the full frame above, unchanged.

**Beats:** one static beat, 0:00 to 0:05. Payoff at 0.0 s; biggest number in the bottom row; seamless loop.

**Maths shown (all at once):** quarterly interest = amount x 8.2% / 4; total = quarterly x 20 (5 years).
₹1L -> ₹2,050/qtr -> ₹41,000 | ₹2L -> ₹4,100 -> ₹82,000 | ₹3L -> ₹6,150 -> ₹1,23,000 | ₹4L -> ₹8,200 -> ₹1,64,000 | ₹5L -> ₹10,250 -> ₹2,05,000 | ₹6L -> ₹12,300 -> ₹2,46,000 | ₹7L -> ₹14,350 -> ₹2,87,000 | ₹8L -> ₹16,400 -> ₹3,28,000 | ₹9L -> ₹18,450 -> ₹3,69,000 | ₹10L -> ₹20,500 -> ₹4,10,000 | ₹11L -> ₹22,550 -> ₹4,51,000 | ₹12L -> ₹24,600 -> ₹4,92,000 | ₹13L -> ₹26,650 -> ₹5,33,000 | ₹14L -> ₹28,700 -> ₹5,74,000 | ₹15L -> ₹30,750 -> ₹6,15,000 | **₹30L -> ₹61,500/qtr -> ₹12,30,000** (the ladder jumps from ₹15L straight to ₹30L).
**Check:** ₹1L and ₹30L rows reproduce exactly.

**Engagement:** 298 likes (0.11%), 4 comments.

**Why the hook works:** (1) names the audience in the first word ("Income for Senior Citizens"), so it is also forwarded by their children; (2) a high, safe, government rate (8.2%) is the anchor; (3) same find-your-row mechanic as MIS.

---

## 5. Hook and title catalogue (93 Shorts)

Buckets were assigned by title wording (a few hand-corrected, e.g. "#saveincometax" in a hashtag does not make a tax short). Medians are of current views.

| Formula | n | Median views | Max | Examples (views, outlier) |
|---|---:|---:|---:|---|
| **A. Payout-first**: "Monthly Income / Income for [audience] / Monthly Pension using [scheme] at [rate]%" | 11 | **100,740** | 428,862 | [Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate](https://www.youtube.com/shorts/K2QbxGXa29k) 428,862 (54.46x, 6 s); [SWP for Monthly Income \| Systematic Withdrawal Plan in Mutual Funds](https://www.youtube.com/shorts/BTqcVJR66sQ) 360,994; [Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate](https://www.youtube.com/shorts/0Gc_IRi9RbU) 264,377 (51.68x, 6 s); [Monthly Income Scheme Post Office Interest #fincalc](https://www.youtube.com/shorts/d1-e0w0e1uQ) 219,620; [NPS Pension Calculator - How much Monthly Pension?](https://www.youtube.com/shorts/mS3SIHqlnTY) 207,561; [How to Get ₹10K to ₹2 Lakh Monthly Income? SWP Plan in Mutual Funds](https://www.youtube.com/shorts/I79lgAEBBjU) 100,740 (7.44x, 6 s) |
| **B. Amount-first ladder**: "₹[small monthly amount] [product] Returns (Calculation) for [1-15 / 5-30 / 15] Years (@ rate)" | 15 | 53,954 | 3,771,667 | [₹2000 SIP Returns for 1-15 Years](https://www.youtube.com/shorts/Y57tm58Y6zI) 3,771,667; [Rs. 1000 in Sukanya Samriddhi Yojana Scheme](https://www.youtube.com/shorts/pUlH-hZ6KcM) 2,139,784; [Rs. 5000 SIP Returns Calculation in Sensex for Last 25 Years](https://www.youtube.com/shorts/8of2v9B5exk) 963,086; [₹1000 PPF Interest Calculation for 15 Years](https://www.youtube.com/shorts/5J8R424BORo) 405,131; [Rs. 5000 SIP Returns Calculation for 5 Years to 30 Years](https://www.youtube.com/shorts/Ua4acKr-hvw) 137,201 (7.26x, 6 s). Weak 2026 cards in the same formula: [Rs. 1000 SIP ... for 1 Year to 15 Years at 12%](https://www.youtube.com/shorts/a4GbewbYbPw) 9,017; [Rs. 5000 SIP Returns Calculation for 20 Years](https://www.youtube.com/shorts/1NugTIGX-d4) 10,445 |
| **C. Loan instruction / EMI**: "[Loan] EMI Calculation", "Reduce Tenure NOT EMI" | 3 | 578,461 | 593,853 | [Bike Loan EMI Calculation \| Two wheeler Loan](https://www.youtube.com/shorts/ifdVjBxXg2w) 593,853; [Home Loan Part payment Reduce Tenure NOT EMI](https://www.youtube.com/shorts/7CFEV6D3QNM) 578,461; [Why you should Reduce Tenure with Home Loan Part Payment?](https://www.youtube.com/shorts/AhlIqNloq0k) 70,765 |
| **D. Scheme name + "Calculation"** (no amount in title) | 14 | 16,128 | 259,648 | [Post Office NSC Interest Calculation \| National Saving Certificate](https://www.youtube.com/shorts/mYODDeCtNpc) 259,648; [Mahila Samman Saving Certificate Calculation](https://www.youtube.com/shorts/kDgEn5vq0as) 93,163; [FD gives monthly interest & quarterly compounding](https://www.youtube.com/shorts/lAr-fJyGVqw) 74,632 |
| **E. Tax question / slab** | 33 | 20,748 | 144,713 | [How much Income Tax on Salary?](https://www.youtube.com/shorts/ROtxoGvr8dw) 144,713; [Income Tax Calculation 2023-24 \| Old vs New Tax Regime](https://www.youtube.com/shorts/FsuaiDNCP8A) 119,243; [Income Tax Return Filing 2025-26 (AY 2026-27)](https://www.youtube.com/shorts/b3R9sUcpaI8) 99,469 (38.59x) |
| **F. X vs Y / "Which is Better?"** | 8 | 13,322 | 89,045 | [Rs. 2000 SIP vs Step up SIP Returns Calculation for 15 years](https://www.youtube.com/shorts/YOd3VuWyqag) 89,045; [PPF vs Mutual Funds Which is Better? [With Returns]](https://www.youtube.com/shorts/aQiPUfvMypY) 19,713; 4 cards in 2026 all 7,665 to 15,363 |
| **G. Goal-first "₹1 Crore"** | 3 | 12,314 | 15,900 | [How much Time to Make Every CRORE after ₹1 Crore - ₹10 Crore SIP Plan](https://www.youtube.com/shorts/99PyDcFR1Mw) 15,900; [How to Make Rs. 1 Crore by SIP in Mutual Funds](https://www.youtube.com/shorts/z459Dk71NKg) 12,314; [How to Make ₹1 CRORE with SIP and Step up SIP 10% Increase](https://www.youtube.com/shorts/KYj-mSEH03Q) 10,083 (all 6 s cards) |
| **H. How-to / news / explainer** | 6 | 2,845 | 149,460 | [How to Invest in NPS Online](https://www.youtube.com/shorts/hDn2Hk-ivsw) 149,460 (2022); [STOP SIP due to US Iran War? NO! Watch THIS](https://www.youtube.com/shorts/oYqJDFwD9a4) 1,064; [How to Start SIP Online](https://www.youtube.com/shorts/52qwzq9QmHQ) 579 |

**Within the 20 six-second cards only:** payout-first cards median **264,377** (n=3); amount-first 18,835 (n=6); X vs Y 9,992 (n=4); goal-first crore 12,314 (n=3); tax 8,631 (n=2).

**Title devices (confounded by era, treat as weak):**
- `#fincalc` in the title: 28 titles, median 54,345 (almost all 2022-23, when the channel was stronger).
- `🔥` prefix: 5 titles (all 2026), median 8,702. No visible lift.
- A `%` rate in the title: 13 titles, median 15,363; but both 50x breakouts carry the rate ("at 7.4% Interest Rate", "at 8.2% Interest Rate").
- Question mark: 11 titles, median 36,326.

**Spoken hook formula (2022-23 hits):** "[amount] के मंथली SIP पर आपको कितना रिटर्न मिल सकता है [rate] के रेट ऑफ रिटर्न पर" ("How much return can you get on ₹X monthly at Y%?") and "[scheme] में अगर आप हर महीने ₹[X] ... करते हो तो अगले [N] साल तक आपको कितना रिटर्न मिल सकता है, चलिए देखते हैं" ("If you put ₹X a month into [scheme], how much will you get over the next N years? Let's see."). Pattern: **input amount + vehicle + horizon/rate, phrased as "how much will you get?"**, then silence while the table answers.

**On-screen CTA formula (2026 cards):** `❤️ Comment "[KEYWORD]" to get [Excel] Calculator` in a bar under the table. Keywords seen: "POMIS", "Senior Citizen". Public comments: 8 and 4.

---

## 6. Formats

| Format | Length | Structure | Evidence |
|---|---|---|---|
| **1. Ladder reveal** | ~30 s | Spoken "how much?" (0-6 s) over frame 1 that already shows Year 1; rows unmask one per ~1.3 s; first milestone (profit > ₹1 lakh) at ~0:09; biggest number at 0:20 on the last row; 9 s hold | ₹2000 SIP, 3.77M |
| **2. Talking-head sandwich + scroll** | ~40 s | Face asks the question (0-10 s); hard cut to spreadsheet scroll to Year 21 (10-30 s); face returns to plug the long video (30-36 s); like/subscribe graphic (36-40 s) | SSY, 2.14M |
| **3. Static lookup card** | 5-6 s | One frame: yellow title with rate and term, 16-row tier table (input -> monthly/quarterly payout -> 5-year total), keyword-comment CTA bar. No voice. Loops | MIS 54.46x, SCSS 51.68x; 20 cards, median 13,177 |

---

## 7. What transfers to Back of the Envelope (from this benchmark only)

1. **Frame 1 must already show the money.** In three of the four, results are on screen at 0.0 s (the Year 1 row, or the whole table); in the fourth (SSY) the input amount `Rs. 1000 Monthly Deposits` is in the banner from 0.0 s. Nobody waits for a title card.
2. **The "find your row" table is the strongest current device.** Both 50x breakouts are tier tables where every viewer locates their own amount. For us: a rough-but-right ladder (e.g. 5 to 16 rows of round inputs) rather than one example.
3. **Lead the title with the payout noun, then the vehicle and the rate.** "Monthly Income using X at 7.4%" beat "How to Make ₹1 Crore" by roughly 20x within the same card format and the same month.
4. **One loud colour, everything else spreadsheet-plain.** Yellow banner + white cells + black bold sans + pale header fills (green = input, peach = output) reads instantly on a phone and survives a pause.
5. **A row-by-row reveal gives a 30 s short a spine:** a milestone at ~1/3 (profit passes deposits or a round lakh) and the biggest number on the last row, then a hold long enough to screenshot.
6. **Get the label right.** The 3.77M short's numbers are a 10% table under a 12% label. Our "rough but right" promise means the stated rate and the shown numbers must agree, and the rate should be visible.
7. **Do not copy the 6 s card as the main format.** It buys views (median 13K vs 2K for the 2-3 min shorts) but likes fall to 0.20% and the keyword CTA produced 4 to 8 comments on 264K-429K views. It is a cheap test format for topics, not a community builder.

---

## 8. Unknowns

- What the other 18 six-second cards look like (only 2 watched). Whether the weak cards use the same table or a single-result layout is unknown.
- Whether commenters on the 3.77M short noticed the 10%/12% mismatch (comments not pulled).
- Number grouping on the 2026 cards (Indian vs Western) is unknown; vidIQ's text is inconsistent.
- Traffic sources, retention curves and loop counts are unknown (not available from these tools for a third-party channel).
- Whether the "Comment KEYWORD" CTA is wired to an auto-DM tool is unknown.

---

## Appendix A. Full vidIQ walkthroughs (verbatim)

Prompt used for all four: the LOOK/HOOK scene-by-scene prompt from the task brief (frame 1, first 3 s, visual system, maths, structure, ending/CTA, "what makes the look/hook work"). Text below is vidIQ's output, unedited. vidIQ's interpretive claims (e.g. what drives comments) are its own guesses, not observed data.

### A.1 ₹2000 SIP Returns for 1-15 Years (Y57tm58Y6zI), durationSeconds 30

Here is a structured analysis of the video based on your specifications:

---

### 1) Frame 1 Breakdown (0.0 s)
* **Layout & 9:16 Framing:**
  * **Top Banner:** Bright yellow rectangular banner spanning the full width at the very top.
  * **Upper-Middle Section:** A spreadsheet table (Excel-style) with a light green header and white data rows.
  * **Lower-Middle Section:** Solid black background/negative space.
  * **Bottom Banner:** Bright neon-green rectangular block with two lines of bold black text.
* **Verbatim Text & Font Details:**
  * **Top Banner:** `"fincalc-blog.in"` in black, bold, sans-serif font, centered.
  * **Spreadsheet Header:**
    * Cell A1/B1 label: `"SIP Amount"` (Green background, black bold sans-serif)
    * Cell B1 value: `"₹ 2,000.00"` (White cell, black bold sans-serif)
    * Table column headers: `"Years"`, `"Total Deposits"`, `"Maturity Amount"`, `"Profits"` (Dark green/teal text on light green background, bold sans-serif).
  * **Spreadsheet Row 1:**
    * `"1"` | `"₹ 24,000.00"` | `"₹ 25,341.00"` | `"₹ 1,341.00"` (Black, regular sans-serif, standard tabular font).
  * **Bottom Banner:**
    * Line 1: `"Rs. 2000 SIP Returns"`
    * Line 2: `"for 1-15 Years @12%"` (Black, bold, sans-serif).

---

### 2) First 3 Seconds (Spoken Words & On-Screen Text)
* **Spoken Words (Hindi, Verbatim):**
  > *"2000 ke monthly SIP pe aapko kitna returns mil sakta hai 12 percent ke rate of return pe..."*  
  *(Translation: How much return can you get on a 2000 monthly SIP at a 12 percent rate of return...)*
* **On-Screen Text Visible:**
  * Top banner: `fincalc-blog.in`
  * Spreadsheet: Year 1 & Year 2 data rows visible.
  * Bottom banner: `Rs. 2000 SIP Returns for 1-15 Years @12%`

---

### 3) Visual System
* **Color Palette:** Neon green (`#39FF14` / `#7CFC00`), Vibrant Yellow, Crisp White, Light Olive Green (table header fill), Deep Black background.
* **Typography:** Clean, geometric sans-serif (Arial / Helvetica style) across banners and spreadsheet UI.
* **Data Presentation:** Spreadsheet/Table UI revealing progressive rows line by line downwards.
* **Motion & Transitions:** No cut transitions; simple step-by-step reveal of spreadsheet rows unmasking sequentially from Year 1 to Year 15.
* **Pace / Cuts:** 0 cuts (single continuous screen recording format with progressive disclosure).
* **Captions Style:** No dynamic subtitle captions; static prominent text banners at top and bottom handle the topic framing.
* **Audio / SFX:** 
  * Hindi voiceover explanation in the first 6 seconds.
  * Upbeat, instrumental lo-fi hip-hop/trap beat with guitar strums and vinyl warmth playing continuously in the background.

---

### 4) The Math & Progression

| Year | Total Deposits (₹) | Maturity Amount (₹) | Profits (₹) | Reveal Timing |
| :--- | :--- | :--- | :--- | :--- |
| **1** | 24,000.00 | 25,341.00 | 1,341.00 | 0:00 (Initial frame) |
| **2** | 48,000.00 | 53,335.00 | 5,335.00 | 0:01 |
| **3** | 72,000.00 | 84,260.00 | 12,260.00 | 0:02 |
| **4** | 96,000.00 | 1,18,424.00 | 22,424.00 | 0:03 |
| **5** | 1,20,000.00 | 1,56,165.00 | 36,165.00 | 0:04 |
| **6** | 1,44,000.00 | 1,97,858.00 | 53,858.00 | 0:06 |
| **7** | 1,68,000.00 | 2,43,917.00 | 75,917.00 | 0:07 |
| **8** | 1,92,000.00 | 2,94,799.00 | 1,02,799.00 | 0:09 |
| **9** | 2,16,000.00 | 3,51,008.00 | 1,35,008.00 | 0:11 |
| **10** | 2,40,000.00 | 4,13,104.00 | 1,73,104.00 | 0:12 |
| **11** | 2,64,000.00 | 4,81,702.00 | 2,17,702.00 | 0:13 |
| **12** | 2,88,000.00 | 5,57,483.00 | 2,69,483.00 | 0:15 |
| **13** | 3,12,000.00 | 6,41,199.00 | 3,29,199.00 | 0:16 |
| **14** | 3,36,000.00 | 7,33,682.00 | 3,97,682.00 | 0:18 |
| **15** | 3,60,000.00 | 8,35,849.00 | 4,75,849.00 | 0:20 |

---

### 5) Structure & Beats
* **0:00 - 0:06 (Hook & Premise):** Spoken Hindi audio frames the investment scenario (₹2,000/month @ 12% p.a.).
* **0:06 - 0:12 (Mid-Term Inflection / First Payoff):** Year 8 shows profits crossing the ₹1 Lakh milestone (`₹1,02,799.00`).
* **0:13 - 0:20 (Exponential Compounding / Biggest Number):** By Year 12, profits (`₹2,69,483`) nearly match total deposits (`₹2,88,000`). At **Year 15 (0:20)**, the ultimate payoff lands: Deposits of **₹3,60,000** grow to **₹8,35,849** (Total Profit: **₹4,75,849**).
* **0:21 - 0:29 (Hold & Contemplation):** The full table stays statically on screen to let viewers pause, read, and process numbers.
* **Looping:** Does not create an infinite seamless loop, but effectively retains attention during the end hold.

---

### 6) Ending, CTA & Engagement Drivers
* **Ending:** Table remains fully displayed with background music until 0:29.
* **Implicit CTA / Watermark:** The domain `fincalc-blog.in` is continuously present at the top.
* **Engagement Drivers (Saves/Shares/Comments):**
  * **Saves:** High utility reference chart for personal finance planning.
  * **Comments:** Debates on whether 12% CAGR is realistic, mutual fund recommendations, or requests for other SIP amounts (e.g., ₹5,000 / ₹10,000).

---

### 7) Look & Hook Analysis

#### What Makes the Look Work:
1. **High-Contrast Color Blocks:** The high-visibility neon green and yellow banners immediately capture attention in vertical feeds against black negative space.
2. **Clear Spreadsheet Layout:** Presenting clean tabular data simulates a professional financial calculation tool, lending immediate authority and clarity.
3. **Progressive Downward Reveal:** Row-by-row visual pacing creates natural anticipation for the next compounding figure.

#### What Makes the Hook Work:
1. **Relatable Starting Amount:** ₹2,000/month is an affordable, realistic entry threshold for retail Indian investors.
2. **Clear Proposition in 3 Seconds:** The voiceover and bottom banner instantly state the entire equation: *Amount (₹2,000)*, *Timeline (1-15 Yrs)*, and *Rate (12%)*.
3. **Curiosity for the Final Payout:** Viewers stay watching to see how the "power of compounding" scales by Year 15 compared to Year 1.

### A.2 Rs. 1000 in Sukanya Samriddhi Yojana Scheme (pUlH-hZ6KcM), durationSeconds 41

### 1. Frame 1 (0.0 s) Breakdown

* **Layout & Composition:** Talking-head selfie format (9:16 vertical), presenter centered in the frame.
* **Top Banner:** High-contrast yellow rectangle banner pinned at the very top displaying:
  * Text: `fincalc-blog.in` (Sans-serif, bold, black, lowercase with hyphen).
* **Bottom Banner:** Light green rectangle banner pinned across the lower third displaying:
  * Line 1: `Rs. 1000 Monthly Deposits` (Sans-serif, bold, black, title case).
  * Line 2: `Sukanya Samriddhi Yojana` (Sans-serif, bold, black, title case).
* **Background:** Light cyan/blue painted wall, YouTube Silver Play Button plaque mounted on the upper right, and a partially visible wall decal/poster on the middle right.
* **Presenter:** Young South Asian male wearing a light grey crew-neck t-shirt, actively speaking with hand gestures.

---

### 2. Spoken Words & On-Screen Text (First 3 Seconds)

* **Spoken Audio (Hindi):**
  > *"Sukanya Samriddhi Yojana mein agar aap har mahine 1,000 rupaye ka monthly deposit karte ho..."*
* **On-Screen Text:**
  * Top: `fincalc-blog.in`
  * Bottom: `Rs. 1000 Monthly Deposits` / `Sukanya Samriddhi Yojana`

---

### 3. Visual System

* **Color Palette:** 
  * Backgrounds: Cyan blue (real world), pitch black (data table backdrop).
  * Accent Colors: Signal Yellow (`#FFEB3B`), Bright Spring Green (`#90EE90`), Soft Sky Blue (table headers).
* **Typography:** Clean, sans-serif fonts throughout (Arial/Roboto style), solid black text inside high-contrast color blocks.
* **Number Display Mode:** Static, clean spreadsheet table (green/blue headers, white data cells with bold black numbers).
* **Motion & Transitions:**
  * Talking head intro (0:00–0:10).
  * Direct cut to full-screen spreadsheet table (0:10).
  * Smooth upward scroll of the spreadsheet from Year 1 to Year 21 (0:10–0:30).
  * Direct cut back to presenter with thumbnail picture-in-picture overlay (0:30–0:36).
* **Pacing / Cuts:** ~1.3 cuts per 10 seconds (long continuous scroll during the calculation section to maximize watch time/readability).
* **Music / SFX:** Upbeat hip-hop/trap instrumental beat playing continuously beneath the spoken commentary and over the spreadsheet scroll.

---

### 4. The Math: Sequence of Calculations

* **Scheme Details:** Sukanya Samriddhi Yojana (SSY)
* **Monthly Contribution:** ₹1,000 / month (₹12,000 / year).
* **Active Deposit Period:** 15 Years.
* **Total Tenure:** 21 Years.

#### Progression Table (Revealed via Smooth Upward Scroll):
1. **Year 1:** Total Deposits: `₹ 12,000` | Balance: `₹ 12,520`
2. **Year 2:** Total Deposits: `₹ 24,000` | Balance: `₹ 26,042`
3. **Year 3:** Total Deposits: `₹ 36,000` | Balance: `₹ 40,645`
4. **Year 4:** Total Deposits: `₹ 48,000` | Balance: `₹ 56,417`
5. **Year 5:** Total Deposits: `₹ 60,000` | Balance: `₹ 73,450`
6. **Year 6:** Total Deposits: `₹ 72,000` | Balance: `₹ 91,846`
7. **Year 7:** Total Deposits: `₹ 84,000` | Balance: `₹ 1,11,714`
8. **Year 8:** Total Deposits: `₹ 96,000` | Balance: `₹ 1,33,171`
9. **Year 9:** Total Deposits: `₹ 1,08,000` | Balance: `₹ 1,56,345`
10. **Year 10:** Total Deposits: `₹ 1,20,000` | Balance: `₹ 1,81,373`
11. **Year 11:** Total Deposits: `₹ 1,32,000` | Balance: `₹ 2,08,403`
12. **Year 12:** Total Deposits: `₹ 1,44,000` | Balance: `₹ 2,37,595`
13. **Year 13:** Total Deposits: `₹ 1,56,000` | Balance: `₹ 2,69,123`
14. **Year 14:** Total Deposits: `₹ 1,68,000` | Balance: `₹ 3,03,173`
15. **Year 15:** Total Deposits: `₹ 1,80,000` | Balance: `₹ 3,39,947` *(End of deposits)*
16. **Year 16–20:** Deposits: `₹ 0` | Balance grows from `₹ 3,67,143` to `₹ 4,99,493` via compound interest.
17. **Year 21 (Final Payoff):** Total Invested: `₹ 1,80,000` | Maturity Balance: **`₹ 5,39,452`**.

---

### 5. Structure & Narrative Beats

* **0:00 – 0:10 (Hook):** Direct query explaining what happens when you invest ₹1,000/month in SSY for 21 years.
* **0:10 – 0:17 (First Payoff):** Table starts scrolling, showing the 5-year and 10-year growth milestones.
* **0:18 – 0:27 (Biggest Payoff):** Scroll hits Year 21, landing on the final maturity figure of **₹5,39,452**.
* **0:27 – 0:30 (Pause on Result):** 3-second hold on the full maturity table to let viewers digest the full breakdown.
* **0:30 – 0:36 (Cross-Promotion):** Host re-enters showing the YouTube thumbnail for the comprehensive video breakdown.
* **0:36 – 0:40 (Outro / CTA):** Animated "Like & Subscribe" button overlay with thumbs-up gesture.
* **Loop Status:** Does not loop seamlessly (ends on a dedicated call to action).

---

### 6. Ending & Call-to-Action (CTA)

* **Spoken CTA:** Mentions a full long-form video on YouTube with the link in the description, followed by: *"Aise aur personal finance related topic ke baare mein janne ke liye, mujhe follow kijiye."*
* **Visual CTA:** Green screen pop-up of an animated YouTube **"LIKE & SUBSCRIBE"** notification bell animation.
* **Save/Share Trigger:** The year-by-year compounding table serves as a reference cheat sheet, driving saves and shares for parents planning girl-child savings.

---

### 7. Core Mechanics

#### What Makes the Look Work:
* **High Contrast Framing:** Bold yellow and lime-green banners make the topic instantly readable even on silent/mute feeds.
* **Clean Tabular Proof:** Instead of abstract animated numbers, using an authentic spreadsheet grid creates financial authority and credibility.
* **Social Proof in Frame:** Visible YouTube Silver Creator Award in the background instantly builds trust with viewers.

#### What Makes the Hook Work:
* **Accessible Entry Point:** Choosing a low, relatable figure (**₹1,000/month**) makes the video relevant to a broad demographic.
* **Specific Government Scheme:** Targeting a high-search-intent keyword (*Sukanya Samriddhi Yojana*) directly targets parents looking for child-savings solutions.
* **Immediate Value Promise:** Sets up a clear mathematical expectation (*"Let's see how much return you get in 21 years"*) within the first 8 seconds.

### A.3 Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate (K2QbxGXa29k), durationSeconds 6

Here is the comprehensive scene-by-scene analysis of the video:

---

### 1) FRAME 1 (0.0 s): Detailed Layout & Visual Breakdown
* **Aspect Ratio & Canvas:** 9:16 vertical video with black borders top and bottom; the central content sits on a white rectangular card.
* **Top Header (Upper 20%):** 
  * Contained in a rounded rectangle with a bright yellow background and a thin red stroke.
  * **Text (Verbatim):** 
    * Line 1: `Monthly Income Scheme in`
    * Line 2: `Post Office (POMIS Scheme)`
  * **Font:** Bold sans-serif, black text, centered, Title Case.
* **Interest Rate Subheader (Upper Middle):**
  * Left: `MIS Interest Rate` (Bold sans-serif, black text over a light green pill highlight).
  * Right: `7.4` (Bold sans-serif, green text inside a rounded box with light green fill and a dark green border).
* **Data Table (Middle 60%):**
  * Grid lines in light gray/black.
  * **Column 1 Header:** `Deposit Amount` (Light green fill, bold black sans-serif).
  * **Column 2 Header:** `Monthly Income` (Light green fill, bold black sans-serif).
  * **Column 3 Header:** `Total Income` (Peach/light orange fill, bold black sans-serif).
  * **Table Body:** 16 rows listing deposits from ₹ 50,000 to ₹ 1,500,000 alongside their corresponding monthly and total payouts. Left-aligned numbers with standard Indian/Western currency formatting.
* **Bottom Banner / CTA (Lower 10%):**
  * Background: Pure black bar.
  * **Text (Verbatim):** `❤️ Comment "POMIS" to get Excel Calculator` (White text, sans-serif, regular weight, with red heart emoji on left).

---

### 2) Spoken Words & On-Screen Text (First 3 Seconds)
* **Spoken Audio:** None (No voiceover).
* **Music:** Synth-pop instrumental background beat.
* **On-Screen Text (Verbatim):**
  * `Monthly Income Scheme in Post Office (POMIS Scheme)`
  * `MIS Interest Rate 7.4`
  * `Deposit Amount | Monthly Income | Total Income`
  * Full table data visible statically (₹ 50,000 to ₹ 1,500,000).
  * `❤️ Comment "POMIS" to get Excel Calculator`

---

### 3) Visual System Across the Video
* **Color Palette:** 
  * Background: Clean white `#FFFFFF` framed by black `#000000` bars.
  * Highlights: Bright canary yellow `#FFE800`, light mint green `#C8E6C9`, muted peach `#FFE0B2`, and dark green accents `#2E7D32`.
* **Typography:** Clean, modern, highly legible sans-serif (resembling Arial / Helvetica bold).
* **Data Presentation:** Pre-rendered spreadsheet/cheat-sheet table (static display; no counter animations, handwriting, or progressive reveals).
* **Motion & Transitions:** 0 transitions; 100% static image held across the 5-second duration.
* **Cuts per 10 s:** 0 cuts.
* **Music/SFX:** Uptempo electronic synth background track loop.

---

### 4) The Math & Calculations
* **Underlying Logic:** Indian Post Office Monthly Income Scheme (POMIS) at **7.4% per annum** for a **5-year (60 months)** maturity tenure:
  $$\text{Monthly Income} = \frac{\text{Deposit Amount} \times 7.4\%}{12}$$
  $$\text{Total Income} = \text{Monthly Income} \times 60$$

* **Data Rows Shown (All visible simultaneously):**
  1. ₹ 50,000 $\rightarrow$ ₹ 308 / mo $\rightarrow$ ₹ 18,480 total
  2. ₹ 100,000 $\rightarrow$ ₹ 617 / mo $\rightarrow$ ₹ 37,020 total
  3. ₹ 200,000 $\rightarrow$ ₹ 1,233 / mo $\rightarrow$ ₹ 73,980 total
  4. ₹ 300,000 $\rightarrow$ ₹ 1,850 / mo $\rightarrow$ ₹ 111,000 total
  5. ₹ 400,000 $\rightarrow$ ₹ 2,467 / mo $\rightarrow$ ₹ 148,020 total
  6. ₹ 500,000 $\rightarrow$ ₹ 3,083 / mo $\rightarrow$ ₹ 184,980 total
  7. ₹ 600,000 $\rightarrow$ ₹ 3,700 / mo $\rightarrow$ ₹ 222,000 total
  8. ₹ 700,000 $\rightarrow$ ₹ 4,317 / mo $\rightarrow$ ₹ 259,020 total
  9. ₹ 800,000 $\rightarrow$ ₹ 4,933 / mo $\rightarrow$ ₹ 295,980 total
  10. ₹ 900,000 $\rightarrow$ ₹ 5,550 / mo $\rightarrow$ ₹ 333,000 total
  11. ₹ 1,000,000 $\rightarrow$ ₹ 6,167 / mo $\rightarrow$ ₹ 370,020 total
  12. ₹ 1,100,000 $\rightarrow$ ₹ 6,783 / mo $\rightarrow$ ₹ 406,980 total
  13. ₹ 1,200,000 $\rightarrow$ ₹ 7,400 / mo $\rightarrow$ ₹ 444,000 total
  14. ₹ 1,300,000 $\rightarrow$ ₹ 8,017 / mo $\rightarrow$ ₹ 481,020 total
  15. ₹ 1,400,000 $\rightarrow$ ₹ 8,633 / mo $\rightarrow$ ₹ 517,980 total
  16. ₹ 1,500,000 $\rightarrow$ ₹ 9,250 / mo $\rightarrow$ ₹ 555,000 total

---

### 5) Structure & Pacing
* **0:00 – 0:05:** Single static beat.
* **Payoff Timing:** Instantaneous (0.0s). Viewers immediately locate their personal savings target in the table.
* **Biggest Number:** ₹ 1,500,000 deposit yields ₹ 9,250/month and ₹ 555,000 total return (bottom row).
* **Looping Mechanism:** Seamless infinite loop due to identical static visuals and looping audio track. Because the chart contains extensive information, viewers pause or loop the video repeatedly to read specific rows, artificially inflating watch time and retention metrics.

---

### 6) Ending, CTA, and Engagement Triggers
* **Direct CTA:** `Comment "POMIS" to get Excel Calculator` (drives automated DM bots like ManyChat to deliver a lead magnet).
* **Saves / Bookmarks Driver:** Serves as a reference cheat sheet for personal finance planning that users save for future reference.
* **Shareability:** Highly shareable to family/WhatsApp groups looking for safe, government-backed fixed-income investment options.

---

### 7) Performance Drivers

#### What makes the LOOK work:
* **High-Contrast "Cheat Sheet" Aesthetic:** Yellow header box and color-coded column headers make it look like an official, easily digestible financial chart.
* **Clean Tabular Hierarchy:** Clear separation between initial deposit, monthly payout, and total 5-year return allows viewers to find their relevant number in seconds.
* **Mobile-Optimized Readability:** Crisp typography against a solid white card ensures all text and numbers remain legible on standard smartphone screens.

#### What makes the HOOK work:
* **Instant Value Proposition:** The header immediately clarifies the subject (Government Post Office Monthly Income Scheme) and the exact 7.4% rate without clickbait delay.
* **High Density of Information:** The complete payout chart encourages viewers to freeze the frame or watch multiple times, driving algorithm-boosting watch completion rates.
* **Low-Friction Automated Lead Magnet:** Asking for a simple one-word keyword comment (`"POMIS"`) provides clear incentive for viewers to trigger the algorithm with engagement.

### A.4 Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate (0Gc_IRi9RbU), durationSeconds 6

Here is a detailed breakdown of the video based on your specifications:

---

### 1) FRAME 1 (0.0 s)
* **Layout & Structure:** 9:16 vertical video with black bars at the top and bottom. The content occupies the central rectangular card on a plain white background.
* **Top Header Text (Banner):**
  * Placed inside a bright yellow rounded rectangle at the upper portion of the central graphic.
  * *Verbatim Text:* `Income for Senior Citizen Scheme in Post Office - Interest Rate = 8.2% - for 5 Years`
  * *Font/Style:* Bold Sans-Serif, Title Case / Sentence Case, Black text (`#000000`).
* **Main Table:**
  * Clean spreadsheet-style grid table with a pale blue header row (`Amount`, `Quarter Interest`, `Total Interest`).
  * 16 data rows displaying amount tiers from ₹ 100,000 to ₹ 3,000,000, formatted with Indian currency numbering/commas and the ₹ symbol.
  * *Font/Style:* Medium-to-bold Sans-Serif, Black text.
* **Bottom Bar / CTA:**
  * Located below the table with a red heart icon (`❤️`) on the left and a black bookmark icon on the far right.
  * *Verbatim Text:* `Comment "Senior Citizen" to get Calculator`
  * *Font/Style:* Bold Sans-Serif, Black text with quotation marks around the trigger phrase.

---

### 2) First 3 Seconds (Spoken Words & On-Screen Text)
* **Spoken Words / Voiceover:** None (purely instrumental background music).
* **On-Screen Text (Verbatim):**
  * `Income for Senior Citizen Scheme in Post Office - Interest Rate = 8.2% - for 5 Years`
  * Column Headers: `Amount | Quarter Interest | Total Interest`
  * Entire 16-row data table (₹100,000 to ₹3,000,000).
  * CTA: `❤️ Comment "Senior Citizen" to get Calculator`

---

### 3) Visual System Across the Video
* **Palette:**
  * Yellow (`#FFFF00` / `#FFEB3B`) header highlight banner.
  * Light Sky Blue (`#E0F2FE`) table header row.
  * Pure White (`#FFFFFF`) card background.
  * Solid Black (`#000000`) text, borders, and outer letterbox bars.
  * Red accent on the heart emoji (`❤️`).
* **Typography:** Clean, uniform, bold sans-serif across all elements.
* **Number Presentation:** Formatted static spreadsheet table (pre-calculated matrix with currency symbols and comma separators).
* **Motion & Transitions:** Completely static single-frame graphic across the full video duration (no zoom, pan, or reveal animations).
* **Cuts per 10 s:** 0 cuts (single static image looped/extended into a video format).
* **Music / SFX:** Upbeat, electronic synth-pop instrumental background track with rhythmic beats.

---

### 4) The Math & Numbers Shown
The table shows fixed quarterly and 5-year total returns calculated at an **8.2% annual interest rate** (simple interest / quarterly payout model: $\text{Quarterly Interest} = \text{Amount} \times 8.2\% \div 4$; $\text{Total Interest for 5 Years} = \text{Quarterly Interest} \times 20$):

1. **₹ 100,000** $\rightarrow$ Quarter: **₹ 2,050** | Total: **₹ 41,000**
2. **₹ 200,000** $\rightarrow$ Quarter: **₹ 4,100** | Total: **₹ 82,000**
3. **₹ 300,000** $\rightarrow$ Quarter: **₹ 6,150** | Total: **₹ 123,000**
4. **₹ 400,000** $\rightarrow$ Quarter: **₹ 8,200** | Total: **₹ 164,000**
5. **₹ 500,000** $\rightarrow$ Quarter: **₹ 10,250** | Total: **₹ 205,000**
6. **₹ 600,000** $\rightarrow$ Quarter: **₹ 12,300** | Total: **₹ 246,000**
7. **₹ 700,000** $\rightarrow$ Quarter: **₹ 14,350** | Total: **₹ 287,000**
8. **₹ 800,000** $\rightarrow$ Quarter: **₹ 16,400** | Total: **₹ 328,000**
9. **₹ 900,000** $\rightarrow$ Quarter: **₹ 18,450** | Total: **₹ 369,000**
10. **₹ 1,000,000** $\rightarrow$ Quarter: **₹ 20,500** | Total: **₹ 410,000**
11. **₹ 1,100,000** $\rightarrow$ Quarter: **₹ 22,550** | Total: **₹ 451,000**
12. **₹ 1,200,000** $\rightarrow$ Quarter: **₹ 24,600** | Total: **₹ 492,000**
13. **₹ 1,300,000** $\rightarrow$ Quarter: **₹ 26,650** | Total: **₹ 533,000**
14. **₹ 1,400,000** $\rightarrow$ Quarter: **₹ 28,700** | Total: **₹ 574,000**
15. **₹ 1,500,000** $\rightarrow$ Quarter: **₹ 30,750** | Total: **₹ 615,000**
16. **₹ 3,000,000** $\rightarrow$ Quarter: **₹ 61,500** | Total: **₹ 1,230,000**

*All numbers are immediately visible on screen simultaneously from 0.0s to the end.*

---

### 5) Structure & Pacing
* **0:00.0 - 0:05.0:** Static informational table display.
* **Payoff:** Instant payoff at 0.0s (the entire cheat sheet is accessible instantly without waiting).
* **Biggest Number:** The bottom row (₹ 3,000,000 yielding ₹ 1,230,000 total return).
* **Looping:** Seamless continuous loop design; viewers pause or re-watch multiple times to locate their specific investment amount.

---

### 6) Ending and CTA (Engagement Triggers)
* **On-Screen CTA:** `❤️ Comment "Senior Citizen" to get Calculator`
* **Comment Trigger:** Prompts users to comment a specific keyword (`Senior Citizen`) to trigger automated DM delivery of a financial calculator template.
* **Save / Share Triggers:** High "utility value" reference cheat sheet designed for screenshots, bookmarking/saves for retirement planning, or forwarding to elderly family members.

---

### 7) What Makes It Work

#### What Makes the Look Work:
* **High Contrast / High Legibility:** Black text on pure white with yellow and light-blue segmenting ensures quick readability even on small mobile screens.
* **Zero Fluff Layout:** Presents structured data in a familiar table format that immediately conveys authority and financial clarity.
* **Focal Hierarchy:** The bright yellow banner instantly captures the eye, followed by linear downward scanning through the investment tiers.

#### What Makes the Hook Work:
* **Specific High-Return Anchor:** Highlighting `8.2%` interest from a trusted government entity (`Post Office`) instantly attracts risk-averse investors and retirees.
* **High-Intent Audience Targeting:** Targeting "Senior Citizen Scheme" addresses a massive, high-search-volume demographic and their adult children.
* **Frictionless Keyword CTA:** Offering a personalized tool/calculator in exchange for a simple keyword comment maximizes algorithmic engagement.

---

## Appendix B. Transcripts (verbatim, vidIQ)

**Y57tm58Y6zI** (language: hi):
> 2000 के मंत्री सिप पर आपको कितना रिटर्न्स मिल सकता है 12% के रेट ऑफ रिटर्न [संगीत] [संगीत]

**pUlH-hZ6KcM** (language: hi):
> सुकन्या समृद्धि योजना में अगर आप हर महीने ₹1000 का मंथली डिपॉजिट करते हो तो अगले 21 साल तक आपको कितना रिटर्न मिल सकता है चलिए देखते हैं [संगीत] [संगीत] यह पूरा कैलकुलेशन का वीडियो मैंने अलग से युटुब पर बनाया है जिसका लिंक आपको डिस्क्रिप्शन क्षेत्र में मिल जाएगा ऐसे और परसों फाइनेंस रिलेटेड टॉपिक के बड़े में जन के लिए मुझे फॉलो कीजिए

(Auto-caption errors, my reading: "परसों" = "पर्सनल" (personal), "बड़े में जन के लिए" = "बारे में जानने के लिए" (to learn about). English of the outro: "I have made a separate full video of this calculation on YouTube; you will find the link in the description. Follow me to learn about more personal-finance topics like this.")

**K2QbxGXa29k:** "No transcript available for video K2QbxGXa29k."

**0Gc_IRi9RbU:** not requested (3-transcript budget used).

---

## Appendix C. Full Short catalogue (93 unique, from 2 vidIQ `channel_videos` calls)

List: P = in "popular" list, R = in "recent" list. Bucket letters refer to section 5. Like rate = likes / views.

| # | Short | Published | Length | Views | Likes (rate) | Comments | Outlier | Bucket | List |
|---:|---|---|---:|---:|---:|---:|---:|---|---|
| 1 | [₹2000 SIP Returns for 1-15 Years #fincalc #shorts](https://www.youtube.com/shorts/Y57tm58Y6zI) | 2022-10-30 | 30 s | 3,771,667 | 44,480 (1.18%) | 220 | n/a | B | P |
| 2 | [Rs. 1000 in Sukanya Samriddhi Yojana Scheme #fincalc](https://www.youtube.com/shorts/pUlH-hZ6KcM) | 2023-05-07 | 41 s | 2,139,784 | 36,868 (1.72%) | 218 | n/a | B | P |
| 3 | [Rs. 5000 SIP Returns Calculation in Sensex for Last 25 Years #fincalc](https://www.youtube.com/shorts/8of2v9B5exk) | 2023-05-01 | 36 s | 963,086 | 14,552 (1.51%) | 57 | n/a | B | P |
| 4 | [Bike Loan EMI Calculation \| Two wheeler Loan #fincalc #shorts](https://www.youtube.com/shorts/ifdVjBxXg2w) | 2022-08-07 | 58 s | 593,853 | 16,003 (2.69%) | 67 | n/a | C | P |
| 5 | [Home Loan Part payment Reduce Tenure NOT EMI](https://www.youtube.com/shorts/7CFEV6D3QNM) | 2022-11-09 | 59 s | 578,461 | 7,512 (1.30%) | 68 | n/a | C | P |
| 6 | [Monthly Income using Post Office MIS Scheme at 7.4% Interest Rate](https://www.youtube.com/shorts/K2QbxGXa29k) | 2026-08-02 | 6 s | 428,862 | 660 (0.15%) | 8 | 54.46x | A | P+R |
| 7 | [₹1000 PPF Interest Calculation for 15 Years \| PPF Calculator and Account Benefits](https://www.youtube.com/shorts/5J8R424BORo) | 2025-08-05 | 140 s | 405,131 | 3,568 (0.88%) | 36 | n/a | B | P |
| 8 | [SWP for Monthly Income \| Systematic Withdrawal Plan in Mutual Funds](https://www.youtube.com/shorts/BTqcVJR66sQ) | 2025-08-06 | 177 s | 360,994 | 3,501 (0.97%) | 32 | n/a | A | P |
| 9 | [Income for Senior Citizens using Post Office SCSS Scheme at 8.2% Interest Rate](https://www.youtube.com/shorts/0Gc_IRi9RbU) | 2026-08-03 | 6 s | 264,377 | 298 (0.11%) | 4 | 51.68x | A | P+R |
| 10 | [Post Office NSC Interest Calculation \| National Saving Certificate](https://www.youtube.com/shorts/mYODDeCtNpc) | 2023-05-15 | 34 s | 259,648 | 3,581 (1.38%) | 32 | n/a | D | P |
| 11 | [Monthly Income Scheme Post Office Interest #fincalc](https://www.youtube.com/shorts/d1-e0w0e1uQ) | 2023-07-22 | 34 s | 219,620 | 3,909 (1.78%) | 27 | n/a | A | P |
| 12 | [NPS Pension Calculator - How much Monthly Pension?](https://www.youtube.com/shorts/mS3SIHqlnTY) | 2025-09-03 | 146 s | 207,561 | 1,747 (0.84%) | 24 | n/a | A | P |
| 13 | [SIP Returns on Rs. 1000 SIP in Mutual Funds @12% #fincalc](https://www.youtube.com/shorts/dUMiAI07TaE) | 2022-12-07 | 28 s | 154,743 | 2,377 (1.54%) | 18 | n/a | B | P |
| 14 | [How to Invest in NPS Online #fincalc #saveincometax](https://www.youtube.com/shorts/hDn2Hk-ivsw) | 2022-10-31 | 59 s | 149,460 | 1,925 (1.29%) | 26 | n/a | H | P |
| 15 | [How much Income Tax on Salary?](https://www.youtube.com/shorts/ROtxoGvr8dw) | 2022-11-11 | 30 s | 144,713 | 1,891 (1.31%) | 19 | n/a | E | P |
| 16 | [Rs. 5000 SIP Returns Calculation for 5 Years to 30 Years - SIP in Mutual Funds](https://www.youtube.com/shorts/Ua4acKr-hvw) | 2026-08-11 | 6 s | 137,201 | 175 (0.13%) | 2 | 7.26x | B | P+R |
| 17 | [Income Tax Calculation 2023-24 \| Old vs New Tax Regime #fincalc](https://www.youtube.com/shorts/FsuaiDNCP8A) | 2023-09-09 | 39 s | 119,243 | 2,013 (1.69%) | 23 | n/a | E | P |
| 18 | [Rs. 2000 in Sukanya Samriddhi Yojana Scheme #fincalc](https://www.youtube.com/shorts/kBETAX7cD-E) | 2023-08-29 | 37 s | 117,457 | 2,121 (1.81%) | 10 | n/a | B | P |
| 19 | [ITR 2 Filing with STCG \| How to File ITR 2 Online](https://www.youtube.com/shorts/0WZEs6NQGg8) | 2025-07-22 | 174 s | 103,446 | 1,629 (1.57%) | 29 | n/a | E | P |
| 20 | [How to Get ₹10K to ₹2 Lakh Monthly Income? SWP Plan in Mutual Funds](https://www.youtube.com/shorts/I79lgAEBBjU) | 2026-09-02 | 6 s | 100,740 | 196 (0.19%) | 5 | 7.44x | A | P+R |
| 21 | [Income Tax Return Filing 2025-26 (AY 2026-27)](https://www.youtube.com/shorts/b3R9sUcpaI8) | 2026-06-18 | 175 s | 99,469 | 1,550 (1.56%) | 2 | 38.59x | E | P+R |
| 22 | [Mahila Samman Saving Certificate Calculation](https://www.youtube.com/shorts/kDgEn5vq0as) | 2023-10-09 | 30 s | 93,163 | 1,146 (1.23%) | 22 | n/a | D | P |
| 23 | [Rs. 2000 SIP vs Step up SIP Returns Calculation for 15 years #fincalc](https://www.youtube.com/shorts/YOd3VuWyqag) | 2022-12-19 | 44 s | 89,045 | 2,098 (2.36%) | 23 | n/a | F | P |
| 24 | [FD gives monthly interest & quarterly compounding #fincalc #shorts](https://www.youtube.com/shorts/lAr-fJyGVqw) | 2022-05-26 | 47 s | 74,632 | 1,561 (2.09%) | 30 | n/a | D | P |
| 25 | [Why you should Reduce Tenure with Home Loan Part Payment? #shorts #fincalc](https://www.youtube.com/shorts/AhlIqNloq0k) | 2025-04-08 | 133 s | 70,765 | 967 (1.37%) | 32 | n/a | C | P |
| 26 | [Income Tax Calculation 2024-25 Examples #shorts #fincalc](https://www.youtube.com/shorts/Y-nrX4z4lSY) | 2024-02-12 | 33 s | 64,761 | 937 (1.45%) | 3 | n/a | E | P |
| 27 | [How much Income Tax on Salary + STCG + LTCG Calculation Examples](https://www.youtube.com/shorts/47VBaz0uuRk) | 2025-02-22 | 142 s | 64,465 | 980 (1.52%) | 73 | n/a | E | P |
| 28 | [Marginal Relief in New Tax Regime 2025-26 #fincalc](https://www.youtube.com/shorts/k7IFdbTOfEY) | 2025-02-03 | 105 s | 54,735 | 577 (1.05%) | 12 | n/a | E | P |
| 29 | [FD Interest Calculation Rs. 1000 to 1 Lakh in Fixed Deposits #shorts #fincalc](https://www.youtube.com/shorts/pSjC2z5CqAI) | 2024-09-21 | 42 s | 53,954 | 601 (1.11%) | 2 | n/a | B | P |
| 30 | [How TDS is Deducted from Salary? #fincalc #shorts](https://www.youtube.com/shorts/RLO7hITX5f8) | 2022-06-02 | 50 s | 50,303 | 1,114 (2.21%) | 15 | n/a | E | P |
| 31 | [RD gives monthly interest & quarterly compounding #fincalc #shorts](https://www.youtube.com/shorts/vx61xdAj_H0) | 2022-05-24 | 56 s | 41,380 | 1,009 (2.44%) | 24 | n/a | D | P |
| 32 | [Income Tax Calculation on in-hand Salary or CTC? #fincalc](https://www.youtube.com/shorts/2SWRATZKX0s) | 2022-05-20 | 53 s | 36,326 | 491 (1.35%) | 7 | n/a | E | P |
| 33 | [Tax Rebate 87A - Save Rs. 60,000 Income Tax in New Tax Regime #shorts #fincalc](https://www.youtube.com/shorts/5TfwWyyniLM) | 2025-04-27 | 136 s | 34,338 | 460 (1.34%) | 12 | n/a | E | P |
| 34 | [How to Make Income Tax Calculator in Excel #fincalc](https://www.youtube.com/shorts/XMVu0sEmcv4) | 2022-12-22 | 60 s | 32,630 | 562 (1.72%) | 5 | n/a | E | P |
| 35 | [What is XIRR in SIP Returns Calculation? #fincalc #shorts](https://www.youtube.com/shorts/mdkfzmNP5Gw) | 2022-07-01 | 46 s | 31,971 | 431 (1.35%) | 1 | n/a | D | P |
| 36 | [NPS New Rules 2025 - 80% Withdrawal, 100% Equity](https://www.youtube.com/shorts/BBb9y3e3xpA) | 2025-09-29 | 158 s | 28,733 | 246 (0.86%) | 12 | n/a | H | P |
| 37 | [No Income Tax on 7.5 Lakh with New Tax Regime #fincalc #shorts](https://www.youtube.com/shorts/ZEma56uHesY) | 2023-04-06 | 59 s | 28,443 | 497 (1.75%) | 37 | n/a | E | P |
| 38 | [Rs. 2000 SIP Returns Calculation in Mutual Funds for 15 Years at 12% expected return](https://www.youtube.com/shorts/bXx75nkfbhE) | 2026-08-06 | 6 s | 28,073 | 52 (0.19%) | 3 | 3.26x | B | P+R |
| 39 | [New Tax Regime 2025 - No Income Tax up to 14 Lakh Income](https://www.youtube.com/shorts/SGL8VTyKOr8) | 2025-07-04 | 151 s | 27,916 | 270 (0.97%) | 8 | n/a | E | P |
| 40 | [Step up SIP Calculator [Examples]](https://www.youtube.com/shorts/XKkEkOAHNRY) | 2025-08-17 | 163 s | 25,907 | 288 (1.11%) | 7 | n/a | D | P |
| 41 | [STCG Tax Calculation with No Other Income](https://www.youtube.com/shorts/m55uWfk3JwQ) | 2025-02-16 | 79 s | 25,443 | 386 (1.52%) | 34 | n/a | E | P |
| 42 | [SWP Plan In Mutual Funds for Monthly Income #fincalc](https://www.youtube.com/shorts/9w7kI4Z0Mw0) | 2023-11-22 | 60 s | 23,806 | 389 (1.63%) | 0 | n/a | A | P |
| 43 | [🔥 Rs. 1000 PPF Interest Calculation at 7.1% for 15 Years - Public Provident Fund](https://www.youtube.com/shorts/uMX5eqtGip0) | 2026-08-08 | 6 s | 23,629 | 47 (0.20%) | 1 | 1.55x | B | P+R |
| 44 | [Tax Rebate under Section 87a limits in Old & new tax regime](https://www.youtube.com/shorts/jIC0Nun6cP4) | 2023-02-16 | 60 s | 22,922 | 386 (1.68%) | 14 | n/a | E | P |
| 45 | [Rs. 2000 PPF Interest Calculation for 15 Years. #shorts #fincalc](https://www.youtube.com/shorts/tJJuNFXcawI) | 2024-03-03 | 38 s | 22,771 | 320 (1.41%) | 1 | n/a | B | P |
| 46 | [New Tax Slabs 2023-24 \| Income Tax Calculation #fincalc](https://www.youtube.com/shorts/cJ37XU47jwQ) | 2023-05-18 | 59 s | 21,961 | 361 (1.64%) | 3 | n/a | E | P |
| 47 | [Standard Deduction in New Tax Regime](https://www.youtube.com/shorts/YnWsEp6HawI) | 2023-02-13 | 53 s | 20,748 | 249 (1.20%) | 16 | n/a | E | P |
| 48 | [PPF vs Mutual Funds Which is Better? [With Returns] #fincalc](https://www.youtube.com/shorts/aQiPUfvMypY) | 2023-05-02 | 59 s | 19,713 | 342 (1.73%) | 3 | n/a | F | P |
| 49 | [SIP vs PPF vs RD Which is Better? #fincalc](https://www.youtube.com/shorts/VUgzEG9H3uc) | 2024-06-03 | 58 s | 18,982 | 343 (1.81%) | 3 | n/a | F | P |
| 50 | [Savings Account Interest Calculation #fincalc #shorts](https://www.youtube.com/shorts/0_mpP78cLlM) | 2022-06-28 | 55 s | 18,143 | 415 (2.29%) | 7 | n/a | D | P |
| 51 | [How much Time to Make Every CRORE after ₹1 Crore - ₹10 Crore SIP Plan](https://www.youtube.com/shorts/99PyDcFR1Mw) | 2026-09-23 | 6 s | 15,900 | 11 (0.07%) | 0 | 1.60x | G | R |
| 52 | [🔥 Rs. 5000 Normal SIP vs Step up SIP 10% increase every year at 12% Expected Return](https://www.youtube.com/shorts/J-mZNAw9kt4) | 2026-08-13 | 6 s | 15,363 | 31 (0.20%) | 0 | n/a | F | R |
| 53 | [New Tax Regime vs Old Tax Regime - Income Tax Calculation](https://www.youtube.com/shorts/LwkhZ7Cu_IY) | 2026-07-31 | 6 s | 14,393 | 27 (0.19%) | 2 | 3.38x | E | R |
| 54 | [EPF Interest Rate 2025-26 is 8.25% \| EPF Interest Calculation Excel](https://www.youtube.com/shorts/T_KIs0eckcU) | 2026-06-18 | 159 s | 14,113 | 101 (0.72%) | 5 | 2.44x | D | R |
| 55 | [Rs. 1000 Sukanya Samriddhi Yojana Scheme Interest Calculation at 8.2% for 15 Years](https://www.youtube.com/shorts/2OgDfus3wjk) | 2026-08-04 | 6 s | 14,040 | 35 (0.25%) | 0 | 2.46x | B | R |
| 56 | [How to Make Rs. 1 Crore by SIP in Mutual Funds](https://www.youtube.com/shorts/z459Dk71NKg) | 2026-08-22 | 6 s | 12,314 | 35 (0.28%) | 2 | n/a | G | R |
| 57 | [How Compounding works in Mutual Funds via SIP and PPF](https://www.youtube.com/shorts/LWQ4gz20HXA) | 2026-09-22 | 6 s | 11,832 | 25 (0.21%) | 1 | 1.15x | D | R |
| 58 | [Rs. 5000 SIP vs Step up SIP Returns at 12% Expected Returns](https://www.youtube.com/shorts/17NbnWRLSqY) | 2026-09-12 | 6 s | 11,281 | 8 (0.07%) | 0 | 1.05x | F | R |
| 59 | [Rs. 5000 SIP Returns Calculation for 20 Years](https://www.youtube.com/shorts/1NugTIGX-d4) | 2026-08-09 | 6 s | 10,445 | 17 (0.16%) | 0 | n/a | B | R |
| 60 | [How to Make ₹1 CRORE with SIP and Step up SIP 10% Increase](https://www.youtube.com/shorts/KYj-mSEH03Q) | 2026-09-09 | 6 s | 10,083 | 13 (0.13%) | 0 | 1.01x | G | R |
| 61 | [Rs. 1000 SIP Returns Calculation for 1 Year to 15 Years at 12% Expected Rate of Returns](https://www.youtube.com/shorts/a4GbewbYbPw) | 2026-09-20 | 6 s | 9,017 | 27 (0.30%) | 0 | n/a | B | R |
| 62 | [🔥 Rs. 5000 SIP vs Step up SIP Returns Calculation Video](https://www.youtube.com/shorts/HHQWwCQE_H4) | 2026-08-19 | 6 s | 8,702 | 18 (0.21%) | 0 | n/a | F | R |
| 63 | [SIP vs RD Which is Better to achieve your Financial Goals](https://www.youtube.com/shorts/o-L6xW7fFA4) | 2026-08-23 | 6 s | 7,665 | 30 (0.39%) | 2 | n/a | F | R |
| 64 | [ITR filing - Tax Rebate 87A Kaise Milega New Tax Regime](https://www.youtube.com/shorts/IoIYr5DVaU4) | 2026-07-19 | 138 s | 6,099 | 54 (0.89%) | 0 | 1.68x | E | R |
| 65 | [Short Term Capital Gains (STCG) Tax Calculation Examples - ITR 2 Filing](https://www.youtube.com/shorts/d86t7IR5We4) | 2026-07-07 | 141 s | 5,305 | 59 (1.11%) | 2 | 2.02x | E | R |
| 66 | [Income Tax Calculator 2026-27 - Old and New Tax Regime](https://www.youtube.com/shorts/f-7NrALZtUI) | 2026-04-17 | 111 s | 4,924 | 51 (1.04%) | 1 | 1.92x | E | R |
| 67 | [ITR Filing - Marginal Relief Kaise Milta hai in new Tax Regime](https://www.youtube.com/shorts/EHSgpGkkpLg) | 2026-07-20 | 165 s | 4,263 | 43 (1.01%) | 3 | n/a | E | R |
| 68 | [ITR Filing - No Income Tax up to 12 Lakh with New Tax Regime](https://www.youtube.com/shorts/HmXrVuNfDJc) | 2026-07-16 | 156 s | 4,255 | 55 (1.29%) | 1 | 1.36x | E | R |
| 69 | [Benefits of Fixed Deposits (FD)](https://www.youtube.com/shorts/kze-_YlQwSg) | 2026-03-23 | 171 s | 3,964 | 14 (0.35%) | 0 | 1.64x | H | R |
| 70 | [🔥 SWP Calculator for Monthly Income [with Inflation] #mutualfunds](https://www.youtube.com/shorts/SnPKQ9b9XKI) | 2026-04-06 | 95 s | 3,688 | 32 (0.87%) | 1 | n/a | A | R |
| 71 | [EPF Interest Calculator - How to Calculate PF Interest](https://www.youtube.com/shorts/mbXbjV6fuIo) | 2026-07-14 | 159 s | 3,680 | 19 (0.52%) | 0 | 1.19x | D | R |
| 72 | [Senior Citizen Income Tax Slab 2026-27 \| New Tax Regime vs Old Tax Regime](https://www.youtube.com/shorts/JrmHA7ztqEM) | 2026-04-15 | 112 s | 3,240 | 23 (0.71%) | 2 | 1.42x | E | R |
| 73 | [New Income Tax ACT (April 2026) - HRA, STT, Allowances Changes](https://www.youtube.com/shorts/_dR7ax_2UJw) | 2026-04-02 | 179 s | 2,891 | 26 (0.90%) | 2 | 1.20x | E | R |
| 74 | [ITR-2 Filing with STCG - Income Tax Return Filing](https://www.youtube.com/shorts/m0SPCgJh1uI) | 2026-07-31 | 6 s | 2,869 | 8 (0.28%) | 1 | n/a | E | R |
| 75 | [Save Income Tax with Old Tax Regime and New Tax Regime](https://www.youtube.com/shorts/_xHBUMRpHFY) | 2026-04-12 | 128 s | 2,581 | 34 (1.32%) | 5 | 1.49x | E | R |
| 76 | [Senior Citizens Get ₹1 Lakh TDS Exemption on FDs](https://www.youtube.com/shorts/O_N5bu6giHo) | 2026-03-31 | 86 s | 2,516 | 19 (0.76%) | 1 | n/a | E | R |
| 77 | [Post Office NSC Interest Rate, Calculation and Tax Benefits](https://www.youtube.com/shorts/3_RuUsui04k) | 2026-08-01 | 5 s | 2,271 | 8 (0.35%) | 0 | n/a | D | R |
| 78 | [Tax Rebate Section 87A - ZERO TAX with Old and New Tax Regime](https://www.youtube.com/shorts/L5aN6tL4wNI) | 2026-04-22 | 149 s | 2,158 | 24 (1.11%) | 1 | n/a | E | R |
| 79 | [Income Tax on FD (Fixed Deposit) - No Tax up to 12 Lakh FD Interest](https://www.youtube.com/shorts/tcyziADcRRA) | 2026-04-04 | 77 s | 2,038 | 20 (0.98%) | 2 | n/a | E | R |
| 80 | [SWP Monthly Income For Retirement Calculation](https://www.youtube.com/shorts/48wvvOqjfwY) | 2026-04-09 | 85 s | 2,015 | 15 (0.74%) | 2 | 1.10x | A | R |
| 81 | [2 Types of FD - Cumulative vs Non Cumulative FD](https://www.youtube.com/shorts/WYdzB-5GIwg) | 2026-03-28 | 97 s | 1,963 | 27 (1.38%) | 2 | n/a | F | R |
| 82 | [4% Withdrawal Rule of SWP in Mutual Funds](https://www.youtube.com/shorts/-PLWu5ZJOLE) | 2026-04-07 | 80 s | 1,929 | 23 (1.19%) | 0 | n/a | A | R |
| 83 | [Income Tax Calculation between 5 Lakh to 20 Lakh - with Calculator](https://www.youtube.com/shorts/8-x1h3NwVSk) | 2026-07-27 | 158 s | 1,890 | 16 (0.85%) | 0 | n/a | E | R |
| 84 | [🔥 NEW Banking Rules 2026 EXPLAINED](https://www.youtube.com/shorts/QpLfQnYIU-4) | 2026-04-08 | 167 s | 1,726 | 27 (1.56%) | 1 | n/a | H | R |
| 85 | [SIP Calculator Online - Rs. 5000 SIP per month Calculation](https://www.youtube.com/shorts/IePnKt7mGfw) | 2026-08-16 | 124 s | 1,571 | 10 (0.64%) | 0 | n/a | B | R |
| 86 | [Income Tax Calculation on Salary Payslip Example](https://www.youtube.com/shorts/xGm6eLbujDo) | 2026-06-09 | 167 s | 1,538 | 9 (0.59%) | 3 | n/a | E | R |
| 87 | [FD Interest Calculation kaise hota hai? Compounding in Excel](https://www.youtube.com/shorts/WwNTTYw8ABo) | 2026-03-24 | 170 s | 1,495 | 19 (1.27%) | 2 | n/a | D | R |
| 88 | [NEW Post Office Interest Rates July 2026 to Sep 2026](https://www.youtube.com/shorts/N7YK5QfmisI) | 2026-07-02 | 150 s | 1,358 | 21 (1.55%) | 0 | n/a | D | R |
| 89 | [SIP Returns in 25 Years in Nifty 50](https://www.youtube.com/shorts/bNhpTi9x-AI) | 2026-04-11 | 70 s | 1,163 | 8 (0.69%) | 0 | n/a | D | R |
| 90 | [Senior Citizen Income Tax Calculation with Old and New Tax Regime](https://www.youtube.com/shorts/ADbcA7cCy-k) | 2026-07-30 | 163 s | 1,124 | 18 (1.60%) | 0 | n/a | E | R |
| 91 | [STOP SIP due to US Iran War? NO! Watch THIS](https://www.youtube.com/shorts/oYqJDFwD9a4) | 2026-04-10 | 78 s | 1,064 | 7 (0.66%) | 0 | n/a | H | R |
| 92 | [SWP के साथ आपका पैसा सुरक्षित #SmartInvesting #Shorts](https://www.youtube.com/shorts/o4s-y500r8U) | 2026-04-05 | 72 s | 729 | 6 (0.82%) | 0 | n/a | A | R |
| 93 | [How to Start SIP Online - Systematic Investment Plan](https://www.youtube.com/shorts/52qwzq9QmHQ) | 2026-08-09 | 108 s | 579 | 3 (0.52%) | 0 | n/a | H | R |

---

## Sources

- vidIQ `vidiq_watch_shortform_content` x4 (jobs job_87cdf2d8..., job_c4c378df..., job_82f65688..., job_5077cb50...), completed 2026-10-07.
- vidIQ `vidiq_video_transcript` x3: Y57tm58Y6zI, pUlH-hZ6KcM, K2QbxGXa29k (no transcript).
- vidIQ `vidiq_channel_videos` x2: @fincalc, videoFormat short, popular=true and popular=false.
- `research/v2/01-finance-math-channels.md` for subscriber count, finance-math share and the qualification look summary.
