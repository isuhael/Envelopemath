# 10c publishing sheet: 1 second of Amazon's profit in weeks of your work

YouTube Shorts (@envelopemath) and Instagram Reels (@envelopemath). Prepared 2026-10-13. Machine-readable twin: `publishing/10c-scoreboard-amazon-makes.json`.

- **Video.** `renders/channel/10c-scoreboard-amazon-makes.mp4`: the pre-condense cut (33.5 s: a 31 s body + the 2.5 s card; sha256 `261e3e9f…`). The 10 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). Nothing below names a timestamp except the cover, which is picked by content (the finished board with the verdict), so the copy carries over to the condensed cut unchanged. The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py 10c-scoreboard-amazon-makes --covers`.
- **Numbers.** Every figure comes from `teasers/v2/10-cost-counter.md` (10c) and its check, `python3 teasers/v2/checks/10-cost-counter.py`: 1005 checks, 0 failed on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/10-cost-counter.py`). `python3 publishing/tools/build_publishing.py 10c-scoreboard-amazon-makes --check` checks this sheet's limits, paste blocks and figures, recomputes the profit rate and every answer from $77.7 billion and $1,251 a week, holds every figure to the write-up's one rounding (≈ $2,464 a second; ≈ 2 and ≈ 10 weeks; ≈ $12,319; ≈ 13 and ≈ 26 seconds), keeps $77.7 billion beside 2025 and named as net income, and bans 'live', a share price and any person's name.
- **Honesty rules kept.** The title asks and never gives the result, and so does the YouTube thumbnail (frame 1: the $0 odometer and the ladder of profit targets, no answer on screen). The Instagram caption keeps every result below 'more'. The Instagram cover is the finished board with the verdict, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, "A year of median pay: ≈ 26 seconds.", and the copy says its conditions: Amazon's full-year 2025 net income as Amazon reports it (profit, not sales), spread evenly over the year (an average rate), and gross median full-time pay. No advice, no urgency, and 'Not financial advice.' is in both.
- **Brand.** "Amazon" is used only to name the company whose reported profit the maths divides. Both platforms' copy says 'Not affiliated with or endorsed by Amazon.' The video has no Amazon logo or brand colours: the name is text in the header. No brand handle is tagged, no share price or ticker is named, and no person is named.

---

## YouTube Shorts

### Title (vidIQ title score, short-form, scored against this channel)

| # | Title | Score | Chars |
|---|---|---:|---:|
| 1 | How Long Would You Have to Work for 1 Second of Amazon's Profit? | 98 | 64 |
| 2 | How Much Profit Does Amazon Make Every Second? How Long Do You Work for It? | 97 | 75 |
| 3 | 1 Second of Amazon's Profit: How Long Would You Have to Work for It? | 97 | 68 |

**Pick (paste):**

```
How Long Would You Have to Work for 1 Second of Amazon's Profit?
```

- 64 of 100 characters.
- The pick is the header's question with 'Would You Have to', which raises it from 88 to 98: 'How Long' opens it, 'Amazon's Profit' closes it, and '1 Second' (the input) sits in the middle. A title cut short still asks.
- It names no result and not even the answer's unit: no weeks, no ≈ $2,464, no ≈ 26 seconds. The wrong answer the viewer holds ('a few minutes of my work') stays intact until the first pass.
- 'Profit' is the word on screen and in the copy, and the copy says it is net income, not sales: the same-idea Shorts on Amazon divide its revenue instead ('Amazon makes $22,700 every second'). vidIQ's model ranks titles but does not predict views; the three question-first titles scored 97-98, the header itself 88.
- Also scored, not used: "Amazon Makes a Profit Every Second. How Long Do You Work for 1 Second of It?" 89; "How Long Do You Work for 1 Second of Amazon's Profit?" 88 (the write-up's title and the on-screen header); "How Long Do You Work for 1 Second of Amazon's Profit? #Amazon #MoneyMath #Profit" 88 (the house 3-hashtag form).

### Description (paste)

```
How long would you have to work for 1 second of Amazon's profit? About 2 weeks, at median full-time pay. Amazon kept $77.7 billion in 2025: about $2,464 a second. A year of median pay goes by in about 26 seconds.

The math, shown:
• Amazon's 2025 net income: $77.7 billion.
• ÷ 31,536,000 seconds in a year ≈ $2,464 a second.
• Median full-time pay is $1,251 a week (BLS): $2,464 ÷ $1,251 ≈ 2 weeks of work per second.
• 5 seconds: ≈ $12,319, ≈ 10 weeks of median pay.
• Half a year of median pay, $32,526: ≈ 13 seconds.
• A year of it, $1,251 × 52 = $65,052: ≈ 26 seconds.
• Yours: 2,464 ÷ your weekly pay = your weeks per second.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Profit: Amazon's net income for full-year 2025 (GAAP, as Amazon reports it), from its Q4 2025 results (February 2026), spread evenly over a 365-day year; profit is seasonal and lumpy, so this is the year's average rate. Pay: BLS median usual weekly earnings of full-time wage and salary workers, Q2 2026 (gross, before tax). Not financial advice. Not affiliated with or endorsed by Amazon.
#Amazon #Profit #MoneyMath
```

1,183 of 5,000 characters (1,215 UTF-8 bytes; YouTube counts this limit in bytes, and `≈`, `×`, `•`, `—`, `÷` take 2-3 each). No `<` or `>`, which YouTube rejects. It follows the house template: an answer-first opening line for the search snippet, then 'The math, shown:' bullets, then the follow line. The credit, assumptions and 'Not financial advice.' line comes next, and the 3 hashtags close it. The opening line is the title's question with the write-up's caption answer, for the search snippet. The credit line answers the comment fights the write-up expects before they start: 'that's before tax' (the weeks are gross median pay) and 'net income includes one-off gains' (it is the net income Amazon reports). The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08a: the counter is an average rate, not a number that shouldn't be true.

### Hashtags (order matters)

1. `#Amazon`: the brand ('amazon' 873,376 searches a month, +4.2% on its 30-day baseline) and the write-up's first tag.
2. `#Profit`: the counter's subject and the write-up's tag ('amazon profit' 3,398 a month): profit, not sales, is the point.
3. `#MoneyMath`: the write-up's tag and the format's shared third tag: 10a, 10b and 10c all carry it, so the counter series links up.

The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.

### Tags (paste; 328 of 500 characters as YouTube counts them: commas count, and a tag with a space counts 2 more for the quotes YouTube adds)

```
amazon profit, amazon profit per second, how much money does amazon make every second, how much does amazon make every minute, how much does amazon make, amazon net income, amazon 2025, amazon, profit per second, median pay, weeks of work, salary, money math, math animation, the back of the envelope, envelope math
```

Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'how much money does amazon make every second' (4,651 a month) is the video's question as people type it, at the lowest competition of the set (25.0); 'how much does amazon make every minute' (5,275) is its sibling. Left out on purpose: 'amazon stock' (34,058, +69.3%), because this Short names no share price and is not about the stock; 'jeff bezos' (198,267), because the write-up names no person; and 'amazon fba', 'amazon earnings' and the seller phrases, which want how-to-sell videos.

### Pinned comment (post it, then pin it)

```
How many weeks is yours? 2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2.

The $77.7 billion is Amazon's net income for 2025, as Amazon reports it, not its sales, spread evenly over the year. The weeks are median full-time pay before tax.
```

The question comes first so it shows in the collapsed preview, and it asks for the viewer's own number (R3): the write-up's pinned comment, with its swap-in rule and the median's answer. The second paragraph answers the comment fights the write-up expects: 'that's before tax' and 'net income includes one-off gains'. 'AWS makes all the profit' is answered only if asked, with the release's own segment figures, as the write-up says.

### Related video and end screen

- **Related video:** [What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? #Starbucks #LatteFactor #stocks](https://www.youtube.com/shorts/fbpdKf4Wy8c) (`fbpdKf4Wy8c`). 06c, live since Mon 12 Oct 2026 and the channel's best-performing brand Short (760 views): a household brand's money set against the viewer's own, the same move as this Short.
- **Swap later:** 10a (US debt interest vs your salary), the same Scoreboard counter on a salary ladder, once published; then point 10a's Related video at this Short.
- **End screen:** Shorts have no end screens or cards. The Related video link is the Shorts equivalent.

### Thumbnail and settings

- **Thumbnail:** in the YouTube app, pick frame 1: the header 'HOW LONG DO YOU WORK FOR / 1 SECOND OF AMAZON'S PROFIT?', the odometer on '$0', the footer 'Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52', the ladder of profit targets '≈ $2,464 · ≈ $12,319 · $32,526 · $65,052' (no answer yet) beside the empty bill tagged '≈ $2,464', the label stack '≈ $2,464 every second / AMAZON'S PROFIT SINCE YOU HIT PLAY' and the caption 'How long do you work for this?'. It asks without answering, like the title beside it in search. The Instagram cover below is the finished board with the verdict, as the write-up asks.
- **Settings:** Category Education. Not made for kids. Altered or synthetic content: No (it's an animated chart, not realistic footage). Remixing allowed. No captions needed: there's no narration and all the text is on screen.

### Posting window

- **When:** First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.
- **Spacing:** Keep it at least 6 h from any other upload on the channel, and on a different evening from 10a and 10b. Suggested order within the series: 10c, then 10a, then 10b.
- **Why:** The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. 10c goes first of the three: it waits on no data decision (10a waits for fiscal 2026's interest figure), it is not about the federal debt (so 10a and 10b can be spaced a week apart after it), and its question is searched as people type it ('how much money does amazon make every second?', 4,651 a month). Its figure is dated full-year 2025, so a newer Amazon report does not make it wrong.

---

## Instagram Reels

### Caption (paste)

```
How long would you have to work for 1 second of Amazon's profit? Amazon's profit counter starts at $0 the moment you hit play.

1 second of Amazon's profit ≈ 2 weeks of median full-time pay.

The math, shown:
• Amazon kept $77.7 billion in 2025 (net income).
• ÷ 31,536,000 seconds in a year ≈ $2,464 a second.
• Median full-time pay is $1,251 a week (BLS): $2,464 ÷ $1,251 ≈ 2 weeks of it per second.
• 5 seconds: ≈ $12,319, ≈ 10 weeks.
• Half a year of median pay, $32,526: ≈ 13 seconds.
• A year of it, $1,251 × 52 = $65,052: ≈ 26 seconds.

Yours: 2,464 ÷ your weekly pay.

Source: Amazon's Q4 2025 results (February 2026); pay: BLS, gross. The year's average rate: profit is seasonal and lumpy. Not financial advice. Not affiliated with or endorsed by Amazon.

How many weeks is yours?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#amazon #profit #salary #moneymath #personalfinance
```

- 976 of 2,200 characters.
- **First 125 characters:** the header's question plus the counter's $0 start, with no figure but the input (1 second). The write-up's caption line 1 is the hook's answer ('1 second of Amazon's profit ≈ 2 weeks of median full-time pay.'); the house rule moves it to the second paragraph, below 'more', because the caption overlays the Reel from frame 1. The numbers sit below the fold, where Instagram search and Google indexing still read them.
- The write-up's caption sentences are kept: net income, the division, the median's weeks, the year in ≈ 26 seconds, the swap-in rule and its source line. The 5-second and half-year rows are added from its maths table, so the caption carries the whole ladder.
- No brand handle is tagged. The caption follows the house close: the follow line plus the credit.

### Hashtags (5, Instagram's cap since Dec 2025)

`#amazon #profit #salary #moneymath #personalfinance`

Three are the write-up's own (`#amazon #moneymath #profit`), plus two:

- `#amazon` names the brand and `#profit` the counter's subject; `#salary` is the unit the answers come in (weeks of pay).
- `#moneymath` says what kind of video it is, as on 10a and 10b.

`#personalfinance` is the broad layer, as on 06b, 06c and 08a: the answers are about the viewer's own pay.

### Alt text

- **Short (96 characters; paste this one into Instagram):** Chart: 1 second of Amazon's 2025 profit, about $2,464, is about 2 weeks of median full-time pay.
  - It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', so screen readers read it cleanly, and it keeps the hook's answer with its basis (2025 profit; median full-time pay).
- **Long (for anywhere with room, such as a website embed):** Animation on a black scoreboard. The header asks: how long do you work for 1 second of Amazon's profit? A green counter starts at $0 and climbs at about $2,464 a second: Amazon's 2025 net income, $77.7 billion, spread over the year. A ladder of targets turns into answers in weeks of median full-time pay ($1,251 a week): 1 second, about $2,464, is about 2 weeks; 5 seconds, about $12,319, about 10 weeks; $32,526, at about 13 seconds, is 6 months. The counter stops on exactly $65,052 as a coin grows to fill the stage. Payoff: a year of median pay: about 26 seconds.
- **Where:** Advanced settings → Accessibility → Alt text, if your app shows it for Reels.

### Cover

![10c cover, 3:4](10c-scoreboard-amazon-makes-cover-3x4.jpg)

- **Files:** `publishing/10c-scoreboard-amazon-makes-cover-3x4.jpg` (1080×1440) and `publishing/10c-scoreboard-amazon-makes-cover-9x16.jpg` (1080×1920). Both come from the pre-condense (33.5 s) render at 30 s (frame 900).
- **Frame, by content:** The finished board with the verdict, as the write-up's Instagram note asks: the header 'HOW LONG DO YOU WORK FOR / 1 SECOND OF AMAZON'S PROFIT?', the odometer on '$65,052', the 2-line footer 'Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52', the ladder reading '≈ 2 weeks · ≈ 10 weeks · 6 months · 1 year' beside the big lit coin, and the two-line verdict 'A YEAR OF MEDIAN PAY: / ≈ 26 SECONDS.' with nothing under it. The hook's own answer (≈ 2 weeks) is the ladder's bottom row. On any cut, use a settled frame of the verdict hold, after the last caption clears and before the end card. On the pre-condense 33.5 s render the counter lands on $65,052 with the verdict at about frame 792 (26.4 s); the coin's growth and glow settle by about frame 823 (27.43 s), the last caption clears at frame 845 (28.17 s), and the board then holds still (frame-to-frame mean luma change under 0.001) until the end card at about frame 931 (31.03 s). Frame 900 (30.00 s) is used. If the cut changes, re-pick it by content.
- **Crop:** 3:4 = 1080×1440 from y 0 to 1440 of the 1080×1920 frame: the badge (from y 141), the header, the odometer, the footer, the ladder and the coin, and the verdict (to y 1293), with 141 px above and 147 px below; it drops the empty black below. A centred grid crop (y 240-1680) cuts the badge and the header.
- **How to set it:** In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.
- **Re-export:** `ffmpeg -ss 30.0 -i renders/channel/10c-scoreboard-amazon-makes.mp4 -frames:v 1 -vf "crop=1080:1440:0:0" -q:v 2 publishing/10c-scoreboard-amazon-makes-cover-3x4.jpg` and `ffmpeg -ss 30.0 -i renders/channel/10c-scoreboard-amazon-makes.mp4 -frames:v 1 -q:v 2 publishing/10c-scoreboard-amazon-makes-cover-9x16.jpg`, or `python3 publishing/tools/build_publishing.py 10c-scoreboard-amazon-makes --covers`.
- **Not used on Instagram:** frame 1 (the $0 odometer, the ladder of profit targets and 'How long do you work for this?'). It asks without answering, so it is the YouTube thumbnail, where it sits beside a title that asks; on Instagram the write-up picks the finished board, the save-able answer.
- **When the condensed cut ships:** re-pick the verdict frame by content on the shipped file (a settled frame of the verdict hold, after the last caption and before the end card) and re-export both JPGs with `--covers`.

### First comment (post it, then pin it)

```
2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2. Yours?
```

### Trial Reels

**Post as a regular Reel, not a Trial.** @envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared. A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show 471c793:renders/channel/10c-scoreboard-amazon-makes.mp4 > 10c-33.5s.mp4` (sha256 261e3e9f…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.

### Posting window and settings

- **When:** Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 10a and 10b.
- **Why:** October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.
- **Audio:** Rename the original audio to '1 second of Amazon's profit — The Back of the Envelope' if the app allows; it is the score, with no voice.
- **Share to feed:** On.

---

## Why these choices (research evidence)

**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.

| Keyword | Est. searches/month | Competition | Overall | Note | vidIQ as of |
|---|---:|---:|---:|---|---|
| amazon profit | 3,398 | 44.5 | 53.8 | seed: the exact topic | 2026-10-12 |
| how much does amazon make every minute? | 5,275 | 36.0 | 58.9 | the same per-time question, in minutes | 2026-07-21 |
| how much money does amazon make every second? | 4,651 | 25.0 | 62.8 | the video's question as people type it; low competition | 2026-10-12 |
| how much money does amazon actually make per order? | 4,113 | 23.9 | 62.8 |  | 2026-10-12 |
| amazon | 873,376 | 64.6 | 67.4 | +4.2% vs its 30-day baseline (837,907); the brand | 2026-10-12 |
| amazon stock | 34,058 | 37.6 | 65.6 | +69.3%; stock intent, no share price here: not in the tags | 2026-10-12 |
| amazon web services | 27,004 | 57.5 | 56.7 | +48.1%; the segment the 'AWS makes all the profit' comment names | 2026-10-12 |
| jeff bezos | 198,267 | 71.0 | 59.0 | a person the write-up does not name: not in the copy or tags | 2026-10-12 |
| personal finance | 1,436,792 | 60.0 | 71.1 | -18.1% vs its baseline (1,754,064); the broad layer | 2026-10-12 |

People ask this exact question: 'how much money does amazon make every second?' (4,651, competition 25.0) and 'every minute?' (5,275). 'amazon profit' itself is small (3,398), and the brand is huge (873,376). The searches around the brand pull elsewhere: 'amazon stock' is rising (+69.3%) and 'jeff bezos' is big, but this Short names no share price and no person, so neither is in the copy or tags; 'amazon earnings' and its matching terms are all seller and self-publishing phrases. The title asks the question; the tags carry the searched phrasings.

**2. Amazon per second is a known idea, always as revenue and never in the viewer's own time (vidIQ YouTube search and outliers, Shorts, under 4 min).**

| Title | Channel (subs) | Views | Date |
|---|---|---:|---|
| How Much Money Amazon Warehouse Employees Make | Caleb Hammer (3,970,000) | 4,590,278 | 2025-03-20 |
| America Spends $222,000+ Per Second… | The Iced Coffee Hour (1,660,000) | 810,279 | 2025-12-15 |
| How much Amazon earns in 1 Minute #shorts #mangeshshinde | Mangesh Shinde Shorts (1,300,000) | 401,502 | 2024-10-21 |
| How Companies Make $1,000,000 In SECONDS! 😱💸 | SnipStory (4,220) | 203,086 | 2026-10-04 |
| Amazon makes $22,700 every second 🤯💸 #amazon #money #shorts | Dollar Clock (0) | 32 | 2026-10-10 |
| 💰 Biggest Companies’ Revenue Per Second 🤯 | PerSecond World (0) | 1 | 2026-10-12 |

Company-money-per-time Shorts travel: 'How much Amazon earns in 1 Minute' has 401,502 views and 'How Companies Make $1,000,000 In SECONDS!' 203,086 (6.97x). Two brand-new channels posted the same idea in the last week ('Amazon makes $22,700 every second', 32 views; 'Biggest Companies' Revenue Per Second', 1), both on revenue.

None uses profit, and none answers in the viewer's own unit. The biggest Amazon money Short in the searches is the other side of the ledger: Caleb Hammer's 'How Much Money Amazon Warehouse Employees Make' (4,590,278). This Short joins the two: Amazon's profit, priced in weeks of median pay. The copy names net income and its source, so it is not read as another revenue counter.

**3. Per-second fortunes and profit-vs-pay both travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since January 2025, at least 10K views).**

- **@money_reel** (TikTok), "Making $300 A Second, … Pays His $1,000 Illegal Fence Fine In 4 Seconds.": 1.5M (3333.3x). The same story as **@xsfund** (Instagram): 953.1K (45.6x).
  - A fortune re-priced per second against a cost: the move this Short makes with a company's profit and a week of pay. Their per-second figure is theirs, not verified here, and they are about a person; this Short names none.
- **@cbseveningnews** (TikTok), "U.S. CORPORATE PROFITS": 1M (18.5x). Profit set against pay, as a news chart.
- **@tc_theinvestor** (Instagram), "The number of hours needed to escape poverty living on minimum wage": 172.2K (33.1x). Work time as the unit.
- The per-second Reels state a dollar figure; none converts it into the viewer's own working time, which is this Short's answer.

**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; refreshed 2026-10-13).**

| YouTube Short | Posted (ET) | Views |
|---|---|---:|
| Can You Find the Missing Dollar? (`LjHDFzVxRyM`) | Sun 07:04 | 1,254 |
| You Can Lean on $1 Million. Not on $1 Billion. (`hJBvmGA6sZ0`) | Thu 00:25 | 1,221 |
| Your Interest Has a Speed Limit (`XVUeMcTg9OQ`) | Sun 05:49 | 1,141 |
| What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? (06c) (`fbpdKf4Wy8c`) | Mon 03:45 | 760 |
| Pay the Minimum on $5,000? 238 Months. (`8__HTUa2PoU`) | Mon 22:09 | 642 |
| A $2 Lottery Ticket Was Worth $6.98. Until the Fine Print. (`FW_oxA3kbsM`) | Wed 12:03 | 348 |
| You Can Carry $1 Million. Not in Pennies. (`mXbKY_R63h4`) | Thu 13:38 | 177 |
| Start Investing 10 Years Late? You Get Half. (`EqFQCJheCMU`) | Tue 22:27 | 161 |
| What If You Bought Netflix Stock Instead of Paying for Netflix? (06b) (`krfZEHhb0xU`) | Mon 12:14 | 75 |

| Instagram Reel | Posted (ET) | Plays | Skip rate | Avg watched |
|---|---|---:|---:|---:|
| $5,000 on the minimum (`DeIvYk7I4Qr`) | Mon 22:46 | 7,303 | 27.4% | 56.5% |
| $1M stack vs Burj Khalifa (`DeOEthJJ1TG`) | Thu 00:28 | 5,449 | 27.0% | 83.1% |
| Missing dollar (`DeWgFZRoR_S`) | Sun 07:05 | 1,997 | 32.0% | 81.3% |
| Powerball $6.98 (`DeMvZv9IqRw`) | Wed 12:05 | 1,825 | 58.7% | 57.9% |
| 06c latte vs Starbucks stock (`DeYuqT4pjVC`) | Mon 03:46 | 1,711 | 40.3% | 69.1% |
| $1M in pennies (`DePe11HIHwn`) | Thu 13:37 | 598 | 42.0% | 66.7% |
| 10 years late (`DeLSd9io8UK`) | Tue 22:30 | 219 | 65.1% | 30.6% |
| Speed limit (e) (`DeEW2ZMIiYd`) | Sun 05:54 | 177 | 56.9% | 31.2% |

Channel totals:

- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).
- **Instagram:** 8 followers and 20,519 views in 30 days.

The channel has no counter Short yet. Its brand Shorts are the nearest kind: 06c (Starbucks: 760 views, 1,711 plays at a 40.3% skip rate) and 06b (Netflix, Mon 12 Oct 12:14 ET: 75 views so far), both too young to compare; 06b's Reel shows 7 plays while Instagram's owner insights catch up.

Medians by posting slot (n = 2-3 each, confounded by topic; 06b and 06c left out as too young):

- **YouTube:** Sunday early morning ET 1,198, weekday 22:00-00:30 ET 642, weekday midday 263.
- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.

One weekday evening is the best Instagram slot and the second-best YouTube slot, so the plan posts both then. On Instagram, skip rate predicts plays better than the hour does (27.0-27.4% for the top two, 56.9-65.1% for the bottom two). So the window is a light-touch test, and the condense (fewer still moments) is the bigger reach lever.

**5. Platform rules applied.**

- **YouTube title:** 100 characters. The Shorts player shows only the opening, so the keywords come first.
- **YouTube description:** 5,000 characters.
- **YouTube hashtags:** the first 3 show; over 60 and all are ignored; `#Shorts` isn't needed.
- **YouTube tags:** 500 characters, low weight.
- **YouTube Shorts:** no end screens. The Related video link is the Shorts equivalent.
- **YouTube AI disclosure:** only for realistic altered content.
- **Instagram caption:** 2,200 characters, about 125 shown before 'more'.
- **Instagram hashtags:** 5 at most.
- **Instagram search and Google:** keywords in the caption feed Instagram search, and Google indexes public professional posts (since 10 Jul 2025).
- **Instagram grid:** a 3:4 crop of the 9:16 cover.
- **Trial Reels:** shown to non-followers only.

**6. Limits.**

- @envelopemath's YouTube Analytics (audience hours, geography) were not read here; the 06b and 06c sheets found vidIQ's YouTube authorization is a different channel. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.
- vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the write-up's and the outliers' own tags.
- Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.
- The $77.7 billion rests on Amazon's own Q4 2025 release (company newsroom) and two copies of its figures, found by search; the write-up's round could not fetch pages directly. Open the release once before posting.
- The figures in other creators' titles and descriptions (revenue per second, a person's earnings per second) are theirs, not verified here; the copy states only the write-up's maths.
- The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.

---

## Check log (first build, 2026-10-13)

- **Maths.** `python3 teasers/v2/checks/10-cost-counter.py`: 1005 checks, 0 failed on `studio/specs/`. Every public figure traces to the 10c maths table: $77,700,000,000 ÷ 31,536,000 = $2,463.85 ≈ $2,464 a second; ÷ $1,251 = 1.97 ≈ 2 weeks; × 5 = $12,319.25 ≈ $12,319, ÷ $1,251 = 9.85 ≈ 10 weeks; $65,052 ÷ 2 = $32,526, ÷ k = 13.20 ≈ 13 s; $1,251 × 52 = $65,052, ÷ k = 26.40 ≈ 26 s (and $65,052 ÷ $2,464 = 26.40 too). The data file recomputes every one.
- **Limits.** Title 64/100. Description 1,183 characters (1,215 bytes) of 5,000. 3 hashtags. Tags 328/500 as YouTube counts them. Instagram caption 976/2,200, with the first 125 characters result-free. 5 hashtags. Short alt text 96. No `<` or `>`.
- **vidIQ.** Keywords pulled 2026-10-13 (table above). 6 titles scored against this channel: the pick 98, the write-up's title 88. Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).
- **vidIQ re-queried** after the build: the pick's title score 98, as first scored.
- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/10-cost-counter.py`, shared with 10a and 10b.
- **Mutation test.** Breaks on scratch copies of this file all fail by name: a title that gives the answer ('… ≈ 2 Weeks'), the affiliation line dropped from the caption, 'amazon stock' in the tags, a second rounding of the rate ('$2,463.85'), '≈ 3 weeks' for the 1-second answer (caught by the figures check: 3 is no maths figure), and a result in the caption's first 125 characters. (20 of 20 across 10a-10c.)
- **Kept on purpose.**
  - The pick (98) is not the write-up's title (88): it adds 'Would You Have to' and keeps every word of the question; the on-screen header stays as it is.
  - The YouTube thumbnail is frame 1 (the question) and the Instagram cover is the finished board with the verdict, as the write-up's Instagram note asks.
  - 'Profit' is always named as net income (as Amazon reports it), and never as sales: the same-idea Shorts divide revenue.
  - No share price, ticker or person: 'amazon stock' (+69.3%) and 'jeff bezos' are big searches, and neither is in the write-up's video.
- **Still to do.** An adversarial pass of this sheet; the ship rebuild (`--covers`) on the condensed file, re-reading the long alt text against it.
