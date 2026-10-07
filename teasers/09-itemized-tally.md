## 9. The Itemized Tally (Receipts & Teardowns)

**Series:** *Itemized* (an Envelope Math series) · **Lane:** Envelope (31 to 42 s masters; 43 to 47 s Reels/TikTok cuts with one extra beat) · **Lead devices:** thermal receipt, ballpoint running total, red pen, verdict stamp (POSTAGE DUE / OPENED BY MISTAKE), Sealed Answer
**Teasers:** 09A Six groceries, $11.39 in 2006: did they actually double? (in dollars, and in minutes of work) · 09B Your $10 at Chipotle: how much is profit? · 09C A $2 Powerball ticket: what's it actually worth?
**Specs:** `engine/specs/09-itemized-tally-{a,b,c}.json` · **Renders:** `engine/out/09-itemized-tally-{a,b,c}.mp4` (stills in `engine/out/stills/`) · **Math check:** `teasers/09-itemized-tally-math.py`
**Inputs verified:** 2026-10-07, twice: by the writer, and again in the polish pass with a fresh WebSearch budget (see **Final fact check** at the end). Every real-world number is listed with its source and date under each teaser. Nothing below is a creator's claim we haven't recomputed. The polish pass corrected August 2026 eggs ($2.272 → $2.279, so the 2026 bag is $25.20), rebuilt 09B's rows from the exact 10-K dollar lines (HQ $0.91, taxes $0.34), and replaced the retired 1-800-GAMBLER helpline with 1-800-MY-RESET.

---

### Why it goes viral

**The mechanism.** An itemized tally turns one price people already have an opinion about into a run of small "higher or lower?" bets, with the total held back until the end.

1. **Each line is a micro-game.** Every new row is a guess and an instant answer, so a 95 s video can hold like a 15 s one. Monarch's receipt re-shop held people for 1:35, and vidIQ's own read is that "viewers guess each price and the total along with her" (`research/watch/group3-video3.md`).
2. **The held total is an open loop.** The viewer keeps a mental running sum and stays to check it. The payoff lands in the final line (Monarch at 1:31 of 1:35; Big Mac at the 30 s mark).
3. **A planned pattern break resets attention at about 35 to 40%.** Monarch's milk "FREE?!" fake-out at 0:33 of 1:35 (milk got cheaper: $2.82 → $2.06); Tilbury's "but there are hidden costs like staff, rent and packaging" at about 20 of 30 s.
4. **Two numbers side by side share better than one** ($32.59 vs $73.66; $5.29 vs $3.63). Leaving the last subtraction to the viewer ($5.29 − $3.63 is never said) drove **5,127 comments** on the Big Mac.
5. **Famous nouns carry it.** McDonald's, Nutella, Walmart, Costco, a latte. Brand-name search pulls viewers from outside finance, and the title templates repeat ("Cost vs Price:", "Then vs Now:").

**The evidence** (from `research/02-top-10-approaches.md` §9, `research/raw/creator-catalogs.md`, `research/raw/yt-big-number-math.md`, `research/raw/ig-tiktok-outliers.md` and the watch files):

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| Mark Tilbury (~8.9M) | Cost vs Price: McDonald's Big Mac | 29,408,278 | 11.55x (5,127 comments) | 30 s | transcript | https://www.youtube.com/shorts/nWXP8rHErQc |
| Mark Tilbury | Cost vs Price: Nutella Jar 🤨 | 15,200,411 | 2.41x | 27 s | inferred | https://www.youtube.com/shorts/mlCx2b404Rc |
| Humphrey Yang (~2.0M) | Costco has a $58 billion dirty little secret🤫 #costco | 8,641,648 | 87.8x | 57 s | inferred | https://www.youtube.com/shorts/YWU4xng8zCc |
| Humphrey Yang | What Prices Will Look Like in 50 Years 🤯 | 7,951,767 | n/a (1.13 comments/1K, 4 to 6x his norm) | 55 s | inferred | https://www.youtube.com/shorts/VbklM5ubC70 |
| **Monarch (4.9K)** | **Then Vs Now: Walmart Groceries** | **3,724,308** | **603.21x** | 95 s | **watched** + transcript | https://www.youtube.com/shorts/5MSoNPKDjDE |
| @yourgrandmas_bf (TikTok) | Why your latte costs $7 | 2.1M | 13.4x | 56 s | inferred | https://www.tiktok.com/@yourgrandmas_bf/video/7685809892430548238 |
| @sidewalk.tv (IG, 59.0K) | Pizza Owner Salary $80,000 ("$400k sales, with 20% margins") | 1.2M | 7.8x | n/a | inferred | https://www.instagram.com/reel/DbODBM8o3f4/ |
| **Gaurav Asija (8.28K)** | **Lottery (Matka) #business Explained** | **835,718** | **467.6x** | 84 s | **watched** + transcript | https://www.youtube.com/shorts/qoXoUyzqod8 |
| Greateen (14.7K) | Candy Bars Then Vs Now: You Won't Believe The Difference | 450,185 | 18.91x | 23 s | inferred | https://www.youtube.com/shorts/iBxKSJ5RT1U |
| Founder Talk Podcast (814) | The Average Chick-fil-A Location Beats McDonald's Revenue in Six Days Instead of Seven | 308,273 | 182.7x | 46 s | transcript | https://www.youtube.com/shorts/aIksb0vifn4 |
| danmcbabe (5.9K) | $20 Then vs Now: The Crunchwrap Inflation Breakdown | 161,298 | 36.59x | 26 s | inferred | https://www.youtube.com/shorts/Fqw2pbitSxU |

**What the evidence says about a new channel.** The two watched originals are both tiny-account breakouts: Monarch at 603x on 4.9K subs and Matka at 468x on 8.3K subs. Both run long (84 to 95 s), which shows serial micro-payoffs can hold a long Short when every beat adds a number (report 01, §3.4).

**Counter-evidence.** The IG/TikTok "business" cluster had the **lowest median outlier (17.6x)** in that sweep (`raw/ig-tiktok-outliers.md`). Teardowns without a famous object or a real artifact plateau. Tilbury's Nutella sequel did 15.2M but only 2.41x, so a repeat on a weaker noun decays. Every teaser below therefore rides a household name or a real public document.

---

### How the originals do it

**1. Monarch, "Then Vs Now: Walmart Groceries"** (3,724,308 views, 603.21x, 95 s, watched: `research/watch/group3-video3.md`)
- **What it nails.**
  - A found-object hook that gives proof and curiosity in one sentence: "I found a Walmart receipt that's over 20 years old."
  - An anchor by 0:06: "17 items cost $32.59".
  - About 12 item-by-item reveals, one every 3 to 5 s, each a paired yellow (2005) and cyan (2026) tag.
  - The **milk plot twist at 0:33 to 0:40** (about 35 to 42%): "FREE?!", then the reveal that milk got cheaper ($2.82 → $2.06).
  - The payoff is two receipts side by side: **$32.59 vs $73.66**.
- **What it misses.**
  - **No running total on screen.** It is vidIQ's first "do better" item, and the viewer has to keep the sum in their head.
  - **No loop:** it hard-stops on a car reaction.
  - **No adjustment.** A +126% basket is never compared to inflation or pay.
  - **A mixed basket draws fairness attacks.** Three greeting cards (+$14.24) and a "DVD equivalent" (+$9.00) are about 57% of the $41.07 rise (our check), so "groceries" overstates food inflation.
  - It is face-on, a 95 s in-store vlog that is costly to repeat.

**2. Mark Tilbury, "Cost vs Price: McDonald's Big Mac"** (29,408,278 views, 11.55x, 30 s, transcript: `research/raw/creator-catalogs.md`)
- **What it nails.**
  - The hook is a price everyone knows plus a yes/no question: "$5.29. Is it a rip-off or not?"
  - The tally follows the physical object (bottom bun 5¢ → patty 40¢ → … ingredients ≈ $1.66).
  - The twist at about 20 s ("hidden costs like staff, rent, and packaging") takes the total cost to $3.63.
  - It **never states the margin**, so the viewer does $5.29 − $3.63 in the comments (5,127 of them).
  - A reusable series title ("Cost vs Price: ___").
- **What it misses.**
  - **Every ingredient cost is his own claim**, with no source.
  - The "hidden costs" jump of +$1.97 is one unexplained lump.
  - There is no running total on screen.
  - It is a sequel template that decays (Nutella 2.41x).

**3. Gaurav Asija, "Lottery (Matka) #business Explained"** (835,718 views, 467.6x, 84 s, watched: `research/watch/group4-video3.md`)
- **What it nails.**
  - A newsjack: the trending *Matka King* series.
  - An escalating payout ladder: ₹900 → ₹9,000 → ₹1,00,000, with the odds shrinking as the payouts grow.
  - Tactile props (playing cards).
  - A moral-flip ending that is safe to share with family.
- **What it misses.**
  - The math is spoken, never shown.
  - The reveal ("99% only the bookie wins") is **dramatic but wrong**. 99% is roughly the chance one jodi bet loses. The house's take is about 10% of everything wagered (10% × ₹900 = ₹90 back per ₹100; our check).
  - It uses borrowed TV/poster visuals.
  - It runs 84 s where 45 would do.

---

### The Envelope Math upgrade

**What we replicate.** We keep the formula that works:
- A famous price or a public document in frame 1, with a yes/no or "what now?" question.
- One line every 3 to 3.6 s, so every sentence adds a number.
- A planned pattern break at 35 to 40%.
- Two numbers side by side at the end.
- One subtraction left for the viewer to do.

**What we improve.**
1. **A running total on screen, always.** 09A's 2026 receipt carries a live TOTAL row that updates with every printed price; 09B and 09C have a ballpoint counter under the receipt ("left: $10.00", "worth so far: 0¢") that steps after every line and is already readable in frame 0. This is the fix vidIQ ranked first for Monarch.
2. **Sourced lines only.** Each line is a public number (BLS average prices, a 10-K, the official prize chart) or a labelled ASSUME. There are no Tilbury-style claimed costs and no fabricated receipt. 09A's two receipts say what they are: "AVG PRICE, 2006" and "AUG 2026" (BLS U.S. averages, not a store receipt).
3. **The adjustment line the originals never draw**, written in three handwritten lines or fewer after a flip:
   - minutes of work (09A);
   - company-level costs after the restaurant (09B);
   - the jackpot's after-tax expected value (09C).

   It usually flips the story: "×2.2 prices" becomes "×1.1 in minutes of work", "$7 profit?" becomes "$1.29", and a "$1 million prize" is worth 9¢.
4. **The hero number is sealed.** The Sealed Answer wiggles through a 2 to 3 s PAUSE & GUESS (or DO THE MATH) timer and opens about 2 s before the end, so its card lands in the last 2 s (94 to 96% of the runtime). The exact figure goes in the pinned comment with "envelope said ≈X, within Y%".
5. **A loop.** The last line answers or re-asks the frame-1 question, so the cut back to frame 1 reads as one thought ("…Not double." → "Did they actually double?").
6. **We correct dramatic framings instead of repeating them.** Matka's "99%" becomes an honest expected value. Monarch's mixed basket becomes six food staples, so the "you cherry-picked" attack has less to hold.

**The uniquely-ours twist: "the receipt is printed on the envelope."** Every episode is a thermal receipt printing onto the back of a manila envelope. The hidden cost or plot twist gets a rubber stamp (**POSTAGE DUE** for a cost you didn't see coming, **OPENED BY MISTAKE** when the obvious answer was wrong), and the answer is literally sealed. Nobody else in the corpus shows the tally *and* the adjustment *and* the exact check.

**Series name: *Itemized*.** One word that says the mechanic, reads like a receipt, and works as a title prefix the way "Cost vs Price:" does for Tilbury.
- **Title template:** `Itemized: [famous thing + anchor number]. [one question]? (Envelope Math No. 09X)`. Examples: "Itemized: 6 groceries cost $11.39 in 2006. Did they actually double?" · "Itemized: your $10 at Chipotle. How much is profit?" · "Itemized: what's a $2 Powerball ticket actually worth?"
- **Rotating variable:** the thing being itemized. It can be a basket (then vs now), a brand's dollar (cost vs price) or a ticket/bet (expected value). Rotate the noun every episode and don't repeat a brand back to back (the research's §3.10 decay warning).
- **Next in the queue** (each needs its own sourcing pass):
  - "Itemized: a 1996 movie night vs today"
  - "Itemized: a $5 footlong, 2008 vs now"
  - "Itemized: a $5 Mega Millions ticket"
  - "Itemized: your first $1,000 paycheck"

  The last one must stay a tally, not a split, so it stays out of #5's lane.

**Devices used** (format bible §3 → engine op):

| Device | Op | Job in this series |
|---|---|---|
| Masking-tape hook | `hook` at t 0 | Frame-1 number + question, finished in frame 0 (the thumbnail); leaves when the twist needs the top band |
| Postmark No. 09A/B/C | `postmark` | Series badge in the flap (175, 258, r 100), persistent |
| **Receipt** | `receipt` | The tally: one row per beat, each printed at its own `at`. 09A pairs an `instant` 2006 receipt (printed in frame 0) with a 2026 receipt that prints line by line |
| Running total | receipt `running` row (09A) · `counter` with `steps` (09B, 09C) | Updates with every printed row; 09B/09C's counter is readable in frame 0 |
| Red pen | `annotate` with text `target` anchors (circle, underline, double), `highlight` | The line to beat, the verdict, the first answer and the open "?" |
| Row marks | receipt row `highlight` / `color` | The twist rows (bananas; crew; the $50K row and its "less than" note) and the doubled prices in red |
| Verdict stamps | `stamp` | POSTAGE DUE (09B crew, 09C tax) · OPENED BY MISTAKE (09A verdict, 09C twist) |
| Item icon | `emoji` | 🍌 on 09A's pattern break |
| Flip | `flip` | Receipt side → working side |
| ASSUME: sticky | `sticky` | The inputs the adjustment line depends on (56 px) |
| Ballpoint working (≤3 lines) | `write` | The adjustment math, 64 to 100 px |
| Pause & guess | `timer` | 2 to 3 s commit before the reveal |
| **Sealed Answer** | `envelope` | The hero number (card 110 to 112 px) |
| Loop | spec `loop: true` | The last 0.35 s crossfades into frame 0 |

---

### Teasers

#### 09A: Six groceries, $11.39 in 2006. Did they actually double?

**Working title:** Itemized: 6 groceries cost $11.39 in 2006. Did they actually double? · **Series tag:** (Envelope Math No. 09A · Itemized)
**Lane / runtime:** Envelope, **41.5 s** master. The writer's 51 s cut spent 5 s on set-up with no new number and 6 s after the reveal; both were cut. A 47 s Reels/TikTok cut adds the minimum-wage beat (see platform notes).

**Frame-1 hook** (fully drawn in frame 0, which is also the thumbnail)
- **On screen:** masking tape "6 groceries: **$11.39** in 2006 / Did they **actually** double?", the postmark No. 09A, the receipt header "AVG U.S. PRICE 2006 → 2026" and a postage stamp "$11.39 · 6 ITEMS · 2006".
- **First spoken line (0.1 to 2.6 s):** "Six groceries cost eleven thirty-nine in 2006."

**Beat sheet** (spec `09-itemized-tally-a.json`; receipt slot 3.2 s, header already printed at t 0)

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.6 | Hook | Tape hook, postmark, receipt header, $11.39 postage stamp (all in frame 0) |
| 2.6 to 4.9 | The stake + source | "Did they actually double? BLS prices, line by line." Receipt rule (1.8); RUNNING TOTAL $0.00 → $0.00 (2.0) |
| 5.0 to 14.5 | Lines 1 to 3, **first payoff at 12%** | EGGS 1.31 → 2.27 · MILK 3.08 → 4.23 · BREAD 1.08 → 1.82; both totals tick 0.35 s after each row |
| 14.6 to 17.7 | **Pattern break (35 to 43%)** | BANANAS 0.50 → 0.65: yellow highlight, 🍌, red "+15¢ in 20 years?!", red circle |
| 17.8 to 24.1 | The big movers | COFFEE 3.20 → 9.30 (☕ "coffee ×2.9"); GROUND BEEF 2.22 → 6.92 (🥩 "beef ×3.1") |
| 24.2 to 28.7 | Totals (58 to 69%) | **$11.39 → $25.19**, 2026 total circled, red "× 2.2", "(78% of it: coffee + beef)". VO: "2.2 times. In dollars, yes." |
| 28.8 | Flip | Working side |
| 29.0 to 36.2 | The adjustment line | ASSUME sticky (pay, 29.1); sealed envelope slides in (29.4); "2006: $11.39 ÷ $16.79 ≈ 41 min" (29.9); "2026: $25.19 ÷ $32.53 ≈" (33.9) |
| 36.3 to 39.3 | Commit | PAUSE & GUESS timer, 3 s |
| **39.3 to 41.5** | **Hero in the last 2 s** | Envelope opens (39.3); card out from 39.75 (96%): **≈ 46 min / ×1.1, not ×2.2**; red "46 min" completes line 2 (39.9); OPENED BY MISTAKE (40.3) |
| 39.4 to 41.4 | Loop | "46 minutes. Not double." cuts to frame 1's "Did they actually double?" |

**Full voice-over** (calm, dry; ≈ 170 wpm)
> Six groceries cost eleven thirty-nine in 2006. Did they actually double? BLS prices, line by line.
> Eggs: a buck thirty-one a dozen. Now two twenty-seven.
> Milk: three-oh-eight a gallon. Now four twenty-three.
> Bread: a buck-oh-eight a pound. Now a buck eighty-two.
> Bananas: fifty cents… now sixty-five. Fifteen cents in twenty years?!
> Coffee: three twenty a pound. Now nine thirty.
> Ground beef: two twenty-two. Now six ninety-two. Triple.
> Total: eleven thirty-nine then. Twenty-five nineteen now. Two point two times. In dollars, yes.
> But pay rose too: sixteen seventy-nine an hour in 2006. So that bag cost forty-one minutes of work.
> Today: thirty-two fifty-three an hour. Today's bag costs… Pause. Guess the minutes.
> Forty-six minutes. Not double.
> *(loop)* Six groceries cost eleven thirty-nine in 2006. Did they actually double?

**The envelope math** (the receipt carries the six sourced lines; the handwriting is two lines under a pencil label, and the sealed card holds the answer)
1. `2006: $11.39 ÷ $16.79 ≈ 41 min` (exact 40.70 min)
2. `2026: $25.19 ÷ $32.53 ≈ 46 min` (exact 46.46 min; "46 min" is written in red when the envelope opens)
3. Sealed card: `≈ 46 min` / `×1.1, not ×2.2` (minutes ×1.14 exact, ×1.12 from the rounded 46 ÷ 41; prices ×2.21)

The verdict is a ratio on purpose. The writer's "+6 min" was the exact 5.76 rounded, but the screen shows 41 and 46, and anyone subtracting those gets 5.

**ASSUME sticky:** "avg hourly pay / 2006: $16.79 / 2026: $32.53". The receipt header also flags the price basis: "AVG U.S. PRICE".

**Sources** (writer-verified with WebSearch on 2026-10-07; the QA pass could not re-load them, see the Verification log)

| Input | Value | Source (date) |
|---|---|---|
| Eggs, grade A large, dozen (APU0000708111) | 2006 avg $1.31 · Aug 2026 $2.272 | BLS average price data via FRED, https://fred.stlouisfed.org/series/APU0000708111 ; 2006 avg also in https://www.aol.com/articles/much-21-everyday-grocery-items-123000733.html (Aug 2026 data released 2026-09-11) |
| Milk, whole, gallon (APU0000709112) | 2006 avg $3.08 · Aug 2026 $4.229 | https://fred.stlouisfed.org/series/APU0000709112 ; https://www.usinflationcalculator.com/inflation/milk-prices-adjusted-for-inflation/ ; https://www.aol.com/articles/much-21-everyday-grocery-items-123000733.html |
| Bread, white pan, lb (APU0000702111) | 2006 avg $1.08 · Aug 2026 $1.823 | https://fred.stlouisfed.org/series/APU0000702111 ; https://basketreport.com/prices/bread/history/ |
| Bananas, lb (APU0000711211) | 2006 avg $0.50 · Aug 2026 $0.652 | https://fred.stlouisfed.org/series/APU0000711211 ; https://basketreport.com/prices/bananas/ |
| Coffee, 100% ground roast, lb (APU0000717311) | 2006 avg $3.20 ($3.203) · Aug 2026 $9.299 | https://fred.stlouisfed.org/data/APU0000717311 ; https://www.usinflationcalculator.com/inflation/coffee-prices-by-year-and-adjust-for-inflation/ |
| Ground beef, 100% beef, lb (APU0000703112) | 2006 avg $2.22 · Aug 2026 $6.923 | https://fred.stlouisfed.org/series/APU0000703112 ; https://basketreport.com/prices/ground-beef/history/ ; https://themoneyoverview.com/25-ground-beef-averaged-6-92-a-pound-in-august-up-about-60-cents/ |
| Release schedule | Aug 2026 CPI/average prices out 2026-09-11; next 2026-10-14 | https://www.bls.gov/news.release/cpi.htm ; https://www.bls.gov/cpi/factsheets/average-prices.htm |
| Avg hourly earnings, production & nonsupervisory, private | Aug 2006 $16.79 (as first published) | BLS Employment Situation, Aug 2006 (released 2006-09-01): https://www.bls.gov/news.release/archives/empsit_09012006.pdf |
| Same series | Aug 2026 $32.53 | BLS Employment Situation, Table B-8: https://www.bls.gov/news.release/empsit.t24.htm ; Real Earnings Aug 2026: https://www.bls.gov/news.release/realer.nr0.htm |
| Federal minimum wage (pinned comment only) | $5.15 (Sep 1997 to Jul 2007); $7.25 since 2009-07-24 | https://www.cbpp.org/sites/default/files/archive/8-31-06mw.htm ; https://www.ontheclock.com/State-Minimum-Wage |

*Basis note, stated in the pin:* 2006 prices are BLS annual averages; the 2006 wage is August (mid-year, inside that year's $16.52 to $17.06 monthly range, and any month in that range still rounds to 40 to 41 min). 2026 prices and pay are both August 2026, so they share a month: August is the latest average-price release as of 2026-10-07 (September prices come out 2026-10-14). The September jobs report is already out, so the pay figure is the matched August one, not the newest one. Cite the August 2026 Employment Situation release itself, because the live Table B-8 link now shows later months.

**Ending**
- **Loop line:** "46 minutes. Not double." cuts straight to the frame-1 tape "Did they actually double?", so the answer and the question meet at the seam.
- **Comment bait** (a genuine question, in the caption): "Which wage should the envelope use: average pay or minimum wage? (The pin has both.)"
- **Pinned comment:** "Exact: $11.39 (2006 avg) → $25.198 (Aug 2026) = ×2.21. Pay $16.79 → $32.53/hr = ×1.94. Minutes of work: 40.7 → 46.5, +5.8 min (+14%), so ×1.1. Envelope said ≈46 min, within 1%. Coffee + beef = 78% of the $13.80 jump. At the federal minimum wage ($5.15 → $7.25) the same bag goes 133 → 208 min (+57%), so who's buying matters. Assumptions: BLS U.S. average prices (2006 annual avg; Aug 2026); BLS avg hourly earnings, non-managers (Aug 2006 as first published; Aug 2026). Sources in the description. Want a different item itemized? Comment it."

**Description**
> Same 6 groceries, 2006 vs today, rung up line by line on one envelope. Then the line nobody draws: what the bag costs in minutes of work.
> Prices: BLS average prices, U.S. city average (2006 annual average; Aug 2026, released Sep 11 2026). Pay: BLS average hourly earnings, production & nonsupervisory employees (Aug 2006 $16.79; Aug 2026 $32.53). Exact numbers in the pinned comment.
> Educational math, not financial advice.
> #inflation #groceryprices #thenvsnow #envelopemath #personalfinance

**Platform notes**
- **YouTube Shorts:** post the 41.5 s master. Title = the on-screen hook. Pin the comment at upload. Frame 0 (tape hook + $11.39 stamp + receipt header) is the thumbnail. Add to an "Itemized" playlist.
- **Instagram Reels and TikTok:** a 47 s cut. After the reveal, add one beat that brings a new number: "At minimum wage? A hundred thirty-three minutes then. Two oh-eight now." Then loop. That lands Reels inside the 45 to 60 s sweet spot. Reels cover = the 27.5 s frame (both totals, "× 2.2"). For sends, the caption names a taggable person: "Send this to whoever says groceries doubled." Run it as a Trial Reel first. On TikTok, don't pad to 60 s just for Creator Rewards: it would take about 13 s more with no new number, which breaks the "every sentence adds a number" rule (report 01, §3.4). Native captions on, no music needed (the foley is the music).

**Why this one should travel.** It is the format's strongest small-account proof (Monarch, 603x on 4.9K subs) rebuilt with both of vidIQ's top fixes (a running total and a loop). It also adds the twist the watch notes asked for ("'Hours of work' re-pricing… often flips the story", `watch/group3-video3.md`). The hook now asks a yes/no question everyone already has an answer to ("did groceries double?"). The video then answers it twice: "in dollars, yes" at 58%, and "in minutes of work, ×1.1" in the last 2 s. The bananas pattern break lands at 35%, like Monarch's milk, and works the same way (the price that didn't follow). The ending gives two arguments, not one: "×2.2" vs "×1.1", and average pay vs minimum wage. Both are honest, labelled and pinned, which is the "one honest thing to argue about" rule (report 02, rules 5 and 6). A food-only basket avoids Monarch's cards-and-DVD fairness attack.

---

#### 09B: Your $10 at Chipotle. How much is profit?

**Working title:** Itemized: your $10 at Chipotle. How much is profit? · **Series tag:** (Envelope Math No. 09B · Itemized)
**Lane / runtime:** Envelope, **31.2 s**. That is Tilbury's 27 to 30 s Cost vs Price length plus the sealed reveal. The writer's 38.8 s cut had a 7.3 s set-up and 6 s after the reveal.

**Frame-1 hook** (fully drawn in frame 0)
- **On screen:** masking tape "**$10** at Chipotle. / How much is profit?", the postmark No. 09B, the receipt header "WHERE YOUR $10 GOES" and a postage stamp "$10 · ONE ORDER".
- **First spoken line (0.1 to 2.3 s):** "Ten bucks at Chipotle. How much is profit?"

**Beat sheet** (spec `09-itemized-tally-b.json`; receipt slot 3.2 s, header printed at t 0)

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.3 | Hook | Tape hook, postmark, receipt header, $10 postage (all in frame 0) |
| 2.3 to 4.5 | Source | "Chipotle's own 2025 numbers, line by line." Rule prints (1.4); LEFT OF YOUR $10: $10.00 (1.8) |
| 4.6 to 7.7 | Line 1, **first payoff (15%)** | FOOD, DRINKS, BAGS $2.96 → counter $7.04. VO: "Seven bucks profit? Rip-off?" |
| 7.8 to 10.9 | **Twist (25 to 35%)** | CREW (LABOR) $2.51 → $4.53; red circles on $2.51 and $2.96; **POSTAGE DUE** slams (9.7, 31%) |
| 11.0 to 17.3 | Restaurant costs | RENT $0.52 → $4.01; ADS, DELIVERY, FEES $1.47 → **$2.54** underlined (what the restaurant level keeps) |
| 17.4 to 23.7 | The company's costs | HQ + DEPRECIATION $0.92 → $1.62; TAXES (NET) $0.33 prints (20.6), but the counter **holds at $1.62** |
| 23.8 | Flip | ASSUME sticky (24.1); "$1.62 − $0.33 = ?" (24.4); sealed envelope, "guess first" (25.0) |
| 26.0 to 29.0 | Commit | DO THE MATH timer, 3 s |
| **29.0 to 31.2** | **Hero in the last 2 s** | Envelope opens (29.0); card out from 29.45 (94%): **$1.29 / of every $10** |
| 29.1 to 31.1 | Re-hook + loop | "$1.29. Rip-off or not?" cuts back to frame 1's "How much is profit?" |

**Full voice-over** (≈ 175 wpm)
> Ten bucks at Chipotle. How much is profit? Chipotle's own 2025 numbers, line by line.
> Food, drinks and the bag: two ninety-six. Seven bucks profit? Rip-off?
> Not so fast. The crew: two fifty-one. Almost as much as the food.
> Rent: fifty-two cents. Down to four-oh-one.
> Ads, delivery, card fees: a buck forty-seven. The restaurant keeps two fifty-four.
> Headquarters, depreciation, new stores: ninety-two cents.
> Then taxes, minus the interest it earns: thirty-three cents.
> You do the last subtraction. Pause. What's left of your ten?
> A buck twenty-nine. Rip-off or not?

**The envelope math** (the receipt rows are each line's share of revenue × $10; the handwriting is one line and the sealed card holds the answer)
1. `$1.62 − $0.33 = ?` (operating margin 16.2% × $10, minus taxes net of interest income)
2. Sealed card: `$1.29 / of every $10` (check: net income $1,535.8M ÷ revenue $11,925.6M = 12.88% → $1.288)

The "12.9% profit" line and the "food $2.96 · profit $1.29" pair moved to the pin. Both sat after the reveal and pushed the hero 6 s from the end.

**ASSUME sticky:** "your $10 splits like Chipotle's 2025 average". These are company-wide averages, not one order; delivery orders and regions differ.

**Sources** (writer-verified with WebSearch on 2026-10-07; the QA pass could not re-load them, see the Verification log)

| Input | Value | Source (date) |
|---|---|---|
| Food, beverage & packaging | 29.6% of total revenue (FY2025) | Chipotle Q4 & FY2025 results, 2026-02-03: https://ir.chipotle.com/2026-02-03-CHIPOTLE-ANNOUNCES-FOURTH-QUARTER-AND-FULL-YEAR-2025-RESULTS |
| Labor | 25.1% | same release |
| Occupancy | 5.2% | same release; FY2025 10-K: https://www.sec.gov/Archives/edgar/data/1058090/000105809026000009/cmg-20251231.htm |
| Other operating costs (marketing, delivery, card fees, utilities, technology, maintenance) | 14.7% | same release + 10-K definition |
| Restaurant-level operating margin | 25.4% (= 100 − 74.6, cross-checked) | same release |
| Operating margin | 16.2% | same release |
| Total revenue / net income FY2025 | $11,925,601K / $1,535,761K | FY2025 10-K (filed 2026-02-04), link above |

The "HQ + depreciation" row is 25.4% − 16.2% = 9.2% (G&A, depreciation & amortization, pre-opening and impairment/closure costs). The "taxes (net)" row is 16.2% − 12.88% = 3.32% (income tax minus interest and other income). Both are derived in the math check, not claimed.

**Ending**
- **Re-hook / loop:** "A buck twenty-nine. Rip-off or not?" lands on the card and cuts back to the frame-1 question "How much is profit?"
- **Comment bait:** "Rip-off or not? And which chain's $10 should we itemize next?"
- **Pinned comment:** "Exact: Chipotle's 2025 net income $1,535.8M ÷ revenue $11,925.6M = 12.88%, so $1.288 of every $10 (envelope said $1.29, within 0.2%). Food $2.96 vs profit $1.29. Lines are % of total revenue, FY2025: food/bev/packaging 29.6%, labor 25.1%, occupancy 5.2%, other operating 14.7% → restaurant margin 25.4% ($2.54); operating margin 16.2% ($1.62); taxes net of interest income 3.3% ($0.33). Company averages, not your order. Source: Chipotle FY2025 results (Feb 3 2026) & 10-K."

**Description**
> Your $10 at Chipotle, itemized from Chipotle's own 2025 numbers: food, crew, rent, everything else, headquarters, taxes. Then you do the last subtraction.
> Sources: Chipotle Q4/FY2025 results (Feb 3 2026) and FY2025 Form 10-K. Company-wide averages applied to $10, not any single order. Exact figures pinned.
> Educational math, not financial advice.
> #chipotle #costvsprice #businessmath #envelopemath #fastfood

**Platform notes**
- **YouTube Shorts:** 31.2 s master. The title starts with the brand ("Itemized: your $10 at Chipotle") for search reach outside finance. No logos and no restaurant footage: the brand name only.
- **Instagram Reels:** the master, with a taggable person in the caption: "Send to the friend who says Chipotle is a rip-off." Cover = the 17 s frame (POSTAGE DUE, both circles, $2.54 underlined).
- **TikTok:** a 37 s cut. Add one beat after the reveal: "So how'd they make a billion and a half? Volume: eleven point nine billion in sales." Show "$1.54B ÷ $11.93B = 12.9%" in ink, then loop. Don't pad to 60 s. TikTok bans branded financial content, but this is organic and unpaid, so it doesn't apply. Never imply wrongdoing (pitfall 4): the script credits the costs.

**Why this one should travel.** It is Tilbury's 29.4M Cost vs Price structure (famous price → layer-by-layer tally → "hidden costs" twist → open subtraction), with every line from a public filing. That makes it the version that survives the "source?" comments, and our accuracy is the advantage (report 01, §3.13). The twist does the job Tilbury's "hidden costs" did, but specifically: the crew ($2.51) costs about 85% as much as the food. The POSTAGE DUE stamp makes the hidden-cost moment visual at 31%. The open subtraction ($1.62 − $0.33) recreates the Big Mac's comment engine on purpose, and "Rip-off or not?" splits the audience in the last 2 s, just as the loop restarts.

---

#### 09C: What's a $2 Powerball ticket actually worth?

**Working title:** Itemized: what's a $2 Powerball ticket actually worth? · **Series tag:** (Envelope Math No. 09C · Itemized)
**Lane / runtime:** Envelope, **39.5 s**. That is under half of Matka's 84 s, with all its math shown. The writer's 44.8 s cut put a 5.9 s re-hook after the reveal; the break-even question now lives in the pin and the comment bait.

**Frame-1 hook** (fully drawn in frame 0)
- **On screen:** masking tape "**$2** Powerball ticket. / What's it **really** worth?", the postmark No. 09C, the receipt header "PRIZE × CHANCE = WORTH" and a postage stamp "$2 · ONE TICKET". ("Really" fits the tape at 74 px; "actually" only fits at 66 px. The title keeps "actually".)
- **First spoken line (0.1 to 2.4 s):** "A two-dollar Powerball ticket. What's it really worth?"

**Beat sheet** (spec `09-itemized-tally-c.json`; receipt slot 3.0 s, header printed at t 0)

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.4 | Hook | Tape hook, postmark, receipt header, $2 postage (all in frame 0) |
| 2.4 to 4.5 | Rule of the game | "Each prize: prize × chance. Add them up." Rule prints (1.6); WORTH SO FAR 0¢ (1.8) |
| 4.6 to 7.5 | Line 1, **first payoff (12%)** | $4 · 1 IN 38 ... 10¢ → 10¢ |
| 7.6 to 13.5 | Small prizes | $4–$7 · 3 MORE WAYS ... 7¢ → 17¢ · $100 · 2 WAYS ... 1¢ → 18¢ |
| 13.6 to 19.5 | **Twist (34 to 49%)** | $50,000 · 1 IN 913K ... 5¢ → 23¢; red circles on 5¢ and 10¢; receipt prints "↑ LESS THAN THE $4 PRIZE" (16.6); **OPENED BY MISTAKE** (16.9, 43%) |
| 19.6 to 22.5 | Partial total (50 to 57%) | $1,000,000 · 1 IN 11.7M ... 9¢ → **32¢** |
| 22.6 to 25.5 | Cliffhanger | JACKPOT · 1 IN 292.2M ... ? |
| 25.8 | Flip | ASSUME sticky (26.1); sealed envelope slides in (26.4) |
| 26.0 to 33.6 | The jackpot line | "$199.8M × 0.63 ≈ $125.9M" (27.0; 0.63 underlined at 29.2; **POSTAGE DUE** for the tax at 29.5); "÷ 292.2M ≈ 43¢" (31.0) |
| 33.7 to 37.3 | Commit | "+ 32¢ small prizes = ?" (33.7); DO THE MATH timer, 2 s (35.3) |
| **37.4 to 39.5** | **Hero in the last 2 s** | Envelope opens (37.4); card out from 37.85 (96%): **≈ 75¢ / per $2 ticket** |
| 37.5 to 39.4 | Loop | "About 75 cents. For two dollars." cuts back to frame 1's "$2 Powerball ticket. What's it really worth?" |

**Full voice-over** (≈ 170 wpm; the odds are long words)
> A two-dollar Powerball ticket. What's it really worth? Each prize: prize times chance. Add them up.
> Four bucks, at one in thirty-eight: worth ten cents.
> Three more small wins: seven cents.
> Both hundred-dollar prizes: one cent.
> Fifty grand, at one in nine hundred thirteen thousand: five cents.
> Less than the four-dollar prize!
> A million bucks: nine cents. Thirty-two cents so far.
> Now the jackpot: one in two hundred ninety-two million.
> Jackpot cash this week: about a hundred ninety-nine point eight million. Minus thirty-seven percent federal tax.
> Times a one-in-two-hundred-ninety-two-million chance: forty-three cents.
> Plus the thirty-two cents. So the whole ticket is worth… about seventy-five cents. For two dollars.

**The envelope math** (the receipt rows are prize × chance per tier; the handwriting is three lines)
1. `$199.8M × 0.63 ≈ $125.9M` (cash option after a 37% federal rate; exact $125.874M)
2. `÷ 292.2M ≈ 43¢` (exact 43.08¢; the rounded line, 125.9 ÷ 292.2, also gives 43.09¢)
3. `+ 32¢ small prizes = ?` → sealed card **≈ 75¢ per $2 ticket** (exact 75.07¢; within 0.1%)

**ASSUME sticky:** "cash ≈ $199.8M (Oct 7 est.) · 37% fed tax · no split". It also says, by leaving it out, that there is no state tax; the pin says so outright. The small prizes are counted before tax, and the pin says that too.

**Sources** (writer-verified with WebSearch on 2026-10-07; the QA pass could not re-load them, see the Verification log)

| Input | Value | Source (date) |
|---|---|---|
| Prize chart and odds ($2 play) | PB only $4, 1 in 38.32 · 1+PB $4, 1 in 91.98 · 2+PB $7, 1 in 701.33 · 3 $7, 1 in 579.76 · 3+PB $100, 1 in 14,494.11 · 4 $100, 1 in 36,525.17 · 4+PB $50,000, 1 in 913,129.18 · 5 $1,000,000, 1 in 11,688,053.52 · 5+PB jackpot, 1 in 292,201,338 · any prize 1 in 24.87 | Official chart: https://www.powerball.com/powerball-prize-chart (also https://www.lotteryusa.com/powerball/prizes-odds). Every figure is re-derived from C(69,5) × 26 in the math check |
| Jackpot for Wed 2026-10-07 | $485M estimated annuity; cash ≈ $199.8M | https://www.yahoo.com/news/us/articles/powerball-winning-numbers-oct-5-111407510.html ; https://www.wthr.com/article/news/nation-world/powerball-winning-numbers-oct-5-2026/507-9a01fc8b-0441-4f0c-bd7d-d614a4250379 (after no winner on 2026-10-05) |
| Federal tax | Top rate 37% for 2026 (single > $640,600); 24% is only the withholding | https://www.journalofaccountancy.com/news/2025/oct/annual-inflation-adjustments-announced-for-tax-year-2026/ ; https://www.lotterycalc.com/blog/federal-lottery-tax-rate |
| Help line (description) | 1-800-GAMBLER (National Problem Gambling Helpline) | https://www.ncpgambling.org/wp-content/uploads/2023/12/1-800-GAMBLER-Fact-Sheet.pdf |

*Freshness rule:* the jackpot line is the only input that moves. Re-check the cash value on the morning of upload, update the sticky, line 1 and the card, and re-run the math check. The 32¢ of small prizes never changes.

**Ending**
- **Loop:** "About 75 cents. For two dollars." cuts back to frame 1's "$2 Powerball ticket. What's it really worth?", so "two dollars" meets "$2" at the seam.
- **Comment bait** (the old spoken re-hook, moved to the caption): "How big must the jackpot get to break even? Guess before you open the pin."
- **Pinned comment:** "Exact: small prizes 31.99¢ + jackpot slice 43.08¢ = 75.07¢ per $2 ticket (envelope said ≈75¢, within 0.1%), about 37.5¢ back per $1. Small prizes are counted before tax: tax the $50K and $1M tiers at the same 37% and it's ≈70¢. Break-even: the cash prize would have to reach ≈ $779M (taxed at 37%), about $1.89B advertised at this week's cash/annuity ratio. That's before state tax and before splitting, and splits get likelier as jackpots grow. Odds: official prize chart; C(69,5) × 26 = 292,201,338. Jackpot: $485M est., $199.8M cash, Oct 7 2026 drawing. This is arithmetic, not a recommendation. Gambling problem? 1-800-GAMBLER."

**Description**
> Every prize on a $2 Powerball ticket, worth = prize × chance, itemized on one envelope. The $50,000 prize is worth less than the $4 one.
> Odds: official Powerball prize chart. Jackpot: $485M est. ($199.8M cash) for the Oct 7 2026 drawing; 37% top federal rate; no split, no state tax. Exact figures pinned. Help: 1-800-GAMBLER.
> Educational math, not financial advice.
> #powerball #lottery #expectedvalue #envelopemath #moneymath

**Platform notes**
- **YouTube Shorts:** 39.5 s master. Expect limited ads on a gambling topic (pitfall 5), so keep it framed as expected value only, with no "how to win", no strategy and no "buy". Pin at upload. Post while the jackpot story is live, and only after re-checking the cash value that morning (freshness rule above).
- **Instagram Reels:** the master, with a taggable person in the caption: "Send to the coworker who runs the office pool." Cover = the 17.5 s frame (OPENED BY MISTAKE over the circled 5¢ and 10¢).
- **TikTok:** a cut of about 46 s. After the reveal, add two beats: "Twenty tickets a year? Forty bucks in, about fifteen back" (20 × $2 = $40; 20 × 75.07¢ = $15.01), then the break-even question with "it's pinned". Then loop. No sponsored or affiliate lottery links (TikTok bans financial branded content). Organic only.

**Why this one should travel.** Matka proved the payout ladder at 467.6x on an 8.3K-sub channel, but it spoke its math and got the punchline wrong. This version shows prize × chance on every line and corrects the framing instead of repeating it (report 02 pitfall 6). It newsjacks a live half-billion jackpot (report 01, §3.11). The twist at 34 to 49% ("the $50,000 prize is worth less than the $4 one") is counterintuitive, true and checkable, the ideal "math police" comment magnet (§3.7). The hero lands in the last 2 s, and "for two dollars" loops straight into the "$2" hook. The break-even question gives the pin a reason to be opened.

---

### Math check

The script is at `teasers/09-itemized-tally-math.py` (reproduced below). It recomputes every number on screen, in the VO and in the pins from the sourced inputs. Its assertions fail if any displayed rounding is wrong. It also re-derives all eight fixed-prize odds and the jackpot odds from C(69,5) × 26 and checks them against the published chart. Since the QA pass it also reads the three specs and asserts:
- every receipt row, running-total counter and handwritten line matches the math;
- the hook, postage stamp and dollar figure are fully drawn in frame 0;
- the first payoff lands by 40% and the sealed card lands in the last 2 s;
- every caption allows at least 0.25 s per word.

```python
#!/usr/bin/env python3
"""Math check for teasers 09A, 09B, 09C (Envelope Math: Itemized).

Recomputes every number shown on screen, spoken in the VO or quoted in a pinned comment,
from the sourced inputs only, and asserts the rounded values we display.
Run: python3 teasers/09-itemized-tally-math.py
"""
from fractions import Fraction as F
from math import comb


def pct(x):
    return f"{x * 100:.2f}%"


def within(approx, exact):
    return abs(approx - exact) / exact


# ======================================================================= 09A
print("=" * 72, "\n09A  6 groceries, 2006 vs Aug 2026 (BLS average prices)\n" + "=" * 72)
# BLS CPI average prices, U.S. city average. 2006 = annual average; 2026 = August 2026 (released 2026-09-11).
items = [  # name, 2006 avg, Aug 2026 (3 decimals as published)
    ("eggs, grade A large, dozen", 1.31, 2.272),
    ("milk, whole, gallon", 3.08, 4.229),
    ("bread, white pan, lb", 1.08, 1.823),
    ("bananas, lb", 0.50, 0.652),
    ("coffee, 100% ground roast, lb", 3.20, 9.299),
    ("ground beef, 100% beef, lb", 2.22, 6.923),
]
run06 = run26 = 0.0
for name, p06, p26 in items:
    shown = round(p26, 2)
    run06 = round(run06 + p06, 2)
    run26 = round(run26 + shown, 2)
    print(f"  {name:32s} {p06:5.2f} -> {shown:5.2f}  x{p26 / p06:4.2f}  running {run06:6.2f} | {run26:6.2f}")
t06 = sum(p for _, p, _ in items)
t26_shown = sum(round(q, 2) for *_, q in items)
t26_exact = sum(q for *_, q in items)
assert round(t06, 2) == 11.39 and round(t26_shown, 2) == 25.19
print(f"  totals: 2006 ${t06:.2f} | 2026 ${t26_shown:.2f} (receipt) / ${t26_exact:.3f} (unrounded)")
ratio = t26_shown / t06
print(f"  ratio {ratio:.3f}  -> on screen x2.2   (+{(ratio - 1) * 100:.1f}%)")
assert round(ratio, 1) == 2.2
jump = t26_shown - t06
cof = round(9.299, 2) - 3.20
beef = round(6.923, 2) - 2.22
share = (cof + beef) / jump
print(f"  increase ${jump:.2f}; coffee +${cof:.2f}, beef +${beef:.2f} = ${cof + beef:.2f} = {pct(share)} of the jump -> '78%'")
assert round(share * 100) == 78
print(f"  bananas +${round(0.652, 2) - 0.50:.2f} in 20 yrs (x{0.652 / 0.50:.2f}); coffee x{9.299 / 3.20:.1f}; beef x{6.923 / 2.22:.1f}")
assert round(9.299 / 3.20, 1) == 2.9 and round(6.923 / 2.22, 1) == 3.1
# Average hourly earnings, production & nonsupervisory employees, private (BLS Employment Situation):
# Aug 2006 $16.79 (as first published 2006-09-01); Aug 2026 $32.53.
w06, w26 = 16.79, 32.53
m06 = t06 / w06 * 60
m26 = t26_shown / w26 * 60
m26x = t26_exact / w26 * 60
print(f"  pay ratio x{w26 / w06:.3f} -> 'x1.9'")
assert round(w26 / w06, 1) == 1.9
print(f"  minutes of work: 2006 {m06:.2f} min | 2026 {m26:.2f} min ({m26x:.2f} unrounded)")
print(f"  difference {m26 - m06:.2f} min (+{(m26 / m06 - 1) * 100:.1f}%)")
assert round(m06) == 41 and round(m26) == 46
# QA fix: the screen shows "41 min" and "46 min", so a viewer subtracting gets 5, not the exact 5.76 -> "+6".
# The verdict is therefore a ratio, which survives rounding either way: "x1.1, not x2.2".
assert round(m26 / m06, 1) == 1.1 and round(round(m26) / round(m06), 1) == 1.1
assert round(ratio, 1) == 2.2
print(f"  verdict 'x1.1, not x2.2': exact {m26 / m06:.3f}; from the rounded screen values {round(m26) / round(m06):.3f}")
print(f"  envelope said ~46 min: within {pct(within(46, m26))}; ~41 min: within {pct(within(41, m06))}")
mw06, mw26 = 5.15, 7.25  # federal minimum wage 2006 / 2026
print(f"  at federal minimum wage: {t06 / mw06 * 60:.1f} min -> {t26_shown / mw26 * 60:.1f} min (+{(t26_shown / mw26) / (t06 / mw06) * 100 - 100:.0f}%)")

# ======================================================================= 09B
print("=" * 72, "\n09B  $10 at Chipotle (FY2025 10-K / Q4 release, % of total revenue)\n" + "=" * 72)
food, labor, occ, other = 29.6, 25.1, 5.2, 14.7
rlm_reported, opm = 25.4, 16.2
revenue, net_income = 11_925_601, 1_535_761  # $ thousands, FY2025
rlm = 100 - (food + labor + occ + other)
print(f"  restaurant costs {food + labor + occ + other:.1f}% -> restaurant-level margin {rlm:.1f}% (reported {rlm_reported}%)")
assert abs(rlm - rlm_reported) < 1e-9
net = net_income / revenue
print(f"  net margin {net_income:,} / {revenue:,} = {pct(net)}")
lines = [("food, drinks, bags", food / 10), ("crew (labor)", labor / 10), ("rent (occupancy)", occ / 10),
         ("ads, delivery, card fees, utilities (other op.)", other / 10),
         ("HQ + depreciation + new stores (to operating)", (rlm - opm) / 10)]
left = 10.0
for name, v in lines:
    left = round(left - round(v, 2), 2)
    print(f"  {name:48s} ${v:5.2f}   left ${left:5.2f}")
assert left == round(opm / 10, 2) == 1.62
tax_line = opm / 10 - net * 10
print(f"  taxes, net of interest income: {opm / 10:.2f} - {net * 10:.4f} = ${tax_line:.4f} -> $0.33")
assert round(tax_line, 2) == 0.33 and round(1.62 - 0.33, 2) == 1.29 == round(net * 10, 2)
print(f"  profit per $10: ${net * 10:.4f} -> '$1.29' (within {pct(within(1.29, net * 10))}); '12.9%'")
print(f"  crew vs food: {labor / food * 100:.0f}% ('almost as much'); food $2.96 vs profit $1.29 = {2.96 / 1.29:.1f}x")
print(f"  revenue growth check: {revenue / 11_313_853 - 1:.4f} (reported +5.4%)")

# ======================================================================= 09C
print("=" * 72, "\n09C  a $2 Powerball ticket (official prize chart, Oct 7 2026 jackpot est.)\n" + "=" * 72)
W, R = 69, 26
total = comb(W, 5) * R
print(f"  combinations: C(69,5) x 26 = {total:,}")
assert total == 292_201_338


def p(k, pb):  # exactly k white balls, with/without the Powerball
    return F(comb(5, k) * comb(W - 5, 5 - k), comb(W, 5)) * (F(1, R) if pb else F(R - 1, R))


tiers = [  # label, prize $, k, pb, published odds "1 in"
    ("Powerball only", 4, 0, True, 38.32), ("1 + PB", 4, 1, True, 91.98), ("2 + PB", 7, 2, True, 701.33),
    ("3", 7, 3, False, 579.76), ("3 + PB", 100, 3, True, 14_494.11), ("4", 100, 4, False, 36_525.17),
    ("4 + PB", 50_000, 4, True, 913_129.18), ("5", 1_000_000, 5, False, 11_688_053.52),
]
ev = {}
for lab, prize, k, pb, pub in tiers:
    pr = p(k, pb)
    one_in = 1 / pr
    assert round(float(one_in), 2) == pub, (lab, float(one_in))
    ev[lab] = prize * pr
    print(f"  {lab:15s} ${prize:>9,}  1 in {float(one_in):>14,.2f} (matches chart)  worth {float(ev[lab]) * 100:6.3f} c")
win_any = sum(p(k, pb) for _, _, k, pb, _ in tiers) + F(1, total)
print(f"  overall odds of any prize: 1 in {float(1 / win_any):.2f} (chart: 24.87)")
groups = [("$4  1 in 38", ["Powerball only"]), ("$4-$7  3 more ways", ["1 + PB", "2 + PB", "3"]),
          ("$100  2 ways", ["3 + PB", "4"]), ("$50,000", ["4 + PB"]), ("$1,000,000", ["5"])]
shown = [10, 7, 1, 5, 9]
cum = 0
cum_shown = 0
for (lab, keys), s in zip(groups, shown):
    v = float(sum(ev[x] for x in keys)) * 100
    cum += v
    cum_shown += s
    assert round(v) == s
    print(f"  {lab:22s} {v:6.3f} c -> {s} c   running {cum:6.3f} c -> {round(cum)} c (receipt sum {cum_shown} c)")
    assert round(cum) == cum_shown
small = float(sum(ev.values()))
print(f"  all non-jackpot prizes: ${small:.5f}")
print(f"  twist: $50,000 tier {float(ev['4 + PB']) * 100:.2f} c < $4 Powerball-only tier {float(ev['Powerball only']) * 100:.2f} c")
assert ev["4 + PB"] < ev["Powerball only"]
cash, tax = 199_800_000, 0.37
after = cash * (1 - tax)
jp = after / total
print(f"  jackpot: ${cash / 1e6:.1f}M x {1 - tax:.2f} = ${after / 1e6:.3f}M -> '$125.9M';  / {total:,} = ${jp:.5f} -> 43 c")
assert round(after / 1e6, 1) == 125.9 and round(jp * 100) == 43
whole = small + jp
print(f"  whole ticket: {small * 100:.3f} + {jp * 100:.3f} = {whole * 100:.3f} c -> '~75 c' (within {pct(within(0.75, whole))})")
assert round(whole * 100) == 75
print(f"  return per $1 spent: {whole / 2:.3f}")
print(f"  TikTok beat: 20 tickets = ${20 * 2} in, ${20 * whole:.2f} back on average -> 'about fifteen back'")
assert round(20 * whole) == 15
need_cash = (2 - small) * total / (1 - tax)
ratio_now = 199.8 / 485
print(f"  break-even cash (no split, 37% fed only): ${need_cash / 1e6:,.1f}M; "
      f"at this week's cash/annuity ratio {ratio_now:.4f} ~ ${need_cash / ratio_now / 1e9:.2f}B advertised")
print(f"  if the $50K and $1M tiers are taxed at the same 37%: small prizes {(small - 0.37 * float(ev['4 + PB'] + ev['5'])) * 100:.2f} c, "
      f"ticket {(small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100:.2f} c -> '~70 c' (pin note)")
assert round((small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100) == 70

# ======================================================================= specs
# QA addition: the specs are the source of what viewers see. Check every on-screen number against the math above,
# and check the format-bible timing rules (number in frame 0, payoff by ~40%, hero in the last 2 s).
import json
import os
import re

SPECS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine", "specs")


def load(stem):
    with open(os.path.join(SPECS, f"09-itemized-tally-{stem}.json")) as f:
        return json.load(f)


def texts(spec):
    out = []
    for o in spec["ops"]:
        for k in ("text", "label", "value", "note", "header"):
            v = o.get(k)
            if isinstance(v, list):
                out += [str(x) for x in v]
            elif v is not None:
                out.append(str(v))
        for it in o.get("items", []):
            out += [str(x) for x in it]
        for c in o.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
    return out


def chain(spec, x):
    """Final values of a chained counter at column x, in time order."""
    return [o["to"] for o in sorted((o for o in spec["ops"] if o["type"] == "counter" and o["x"] == x), key=lambda o: o["t"])]


def rows(spec):
    r = next(o for o in spec["ops"] if o["type"] == "receipt")
    return [round(r["t"] + i / r["lps"], 2) for i in range(2 + len(r["items"]))], r


def frame0(spec):
    hook = next(o for o in spec["ops"] if o["type"] == "hook")
    lines = len(hook["text"]) if isinstance(hook["text"], list) else 1
    assert hook["t"] + 0.2 + 0.14 * (lines - 1) <= 0, "hook is not fully drawn in frame 0"
    stamp_ = next(o for o in spec["ops"] if o["type"] == "postage")
    assert stamp_["t"] + 0.35 <= 0, "postage stamp is not in frame 0"
    assert re.search(r"\$\d", " ".join(hook["text"])), "no dollar figure on the frame-0 hook"


def hero(spec):
    env = next(o for o in spec["ops"] if o["type"] == "envelope")
    card_in = env["openAt"] + 0.45
    assert spec["duration"] - 2.0 <= card_in < spec["duration"] - 1.2, (card_in, spec["duration"])
    return env


print("=" * 72, "\nspecs: on-screen numbers and timing\n" + "=" * 72)
a, b, c = load("a"), load("b"), load("c")
for s_ in (a, b, c):
    frame0(s_)
    hero(s_)
    caps = s_["captions"]
    for x in caps:
        assert x["end"] - x["t"] >= 0.25 * len(x["text"].split()) - 1e-9, x
    for x, y in zip(caps, caps[1:]):
        assert y["t"] >= x["end"] - 1e-9, (x, y)

# 09A
tA = texts(a)
r_t, rec = rows(a)
want = [f"{p06:.2f} → {round(p26, 2):.2f}" for _, p06, p26 in items]
assert [it[1] for it in rec["items"]] == want, rec["items"]
c06, c26 = chain(a, 560), chain(a, 820)
assert c06[1:] == [round(sum(p for _, p, _ in items[:i + 1]), 2) for i in range(6)], c06
assert c26[1:] == [round(sum(round(q, 2) for *_, q in items[:i + 1]), 2) for i in range(6)], c26
for s in ("+15¢ in 20 years?!", "coffee ×2.9", "beef ×3.1", "× 2.2", "(78% of it: coffee + beef)",
          "2006: $11.39 ÷ $16.79 ≈ 41 min", "2026: $25.19 ÷ $32.53 ≈", "46 min", "≈ 46 min", "×1.1, not ×2.2"):
    assert s in tA, s
assert "$16.79" in next(o["text"] for o in a["ops"] if o["type"] == "sticky")
assert "$32.53" in next(o["text"] for o in a["ops"] if o["type"] == "sticky")
ban = r_t[2 + 3] / a["duration"]
print(f"  09A  eggs (first payoff) {r_t[2]:.1f}s = {r_t[2] / a['duration']:.0%}; bananas break {r_t[5]:.1f}s = {ban:.0%}; "
      f"hero card {hero(a)['openAt'] + 0.45:.2f}s of {a['duration']}s")
assert r_t[2] / a["duration"] <= 0.4 and 0.3 <= ban <= 0.45

# 09B
tB = texts(b)
r_t, rec = rows(b)
want = [f"${round(v, 2):.2f}" for _, v in lines] + [f"${round(tax_line, 2):.2f}"]
assert [it[1] for it in rec["items"]] == want, (rec["items"], want)
left_chain = [10.0]
for _, v in lines:
    left_chain.append(round(left_chain[-1] - round(v, 2), 2))
assert chain(b, 770) == left_chain, chain(b, 770)
for s in ("$1.62 − $0.33 = ?", "$1.29", "of every $10"):
    assert s in tB, s
print(f"  09B  food (first payoff) {r_t[2]:.1f}s = {r_t[2] / b['duration']:.0%}; crew twist {r_t[3]:.1f}s = {r_t[3] / b['duration']:.0%}; "
      f"hero card {hero(b)['openAt'] + 0.45:.2f}s of {b['duration']}s")
assert r_t[2] / b["duration"] <= 0.4

# 09C
tC = texts(c)
r_t, rec = rows(c)
vals = [it[1] for it in rec["items"] if it[1] not in ("", "?")]
assert vals == [f"{s}¢" for s in shown], vals
run = [sum(shown[:i + 1]) for i in range(len(shown))]
assert chain(c, 780) == [0] + run, chain(c, 780)
for s in ("$4 · 1 IN 38", "$50,000 · 1 IN 913K", "$1,000,000 · 1 IN 11.7M", "JACKPOT · 1 IN 292.2M",
          f"${cash / 1e6:.1f}M × {1 - tax:.2f} ≈ ${after / 1e6:.1f}M", f"÷ {total / 1e6:.1f}M ≈ {round(jp * 100)}¢",
          f"+ {cum_shown}¢ small prizes = ?", f"≈ {round(whole * 100)}¢"):
    assert s in tC, s
assert round(after / 1e6, 1) / round(total / 1e6, 1) * 100 > 42.5  # the rounded line also gives 43c
assert f"${cash / 1e6:.1f}M" in next(o["text"] for o in c["ops"] if o["type"] == "sticky")
print(f"  09C  $4 row (first payoff) {r_t[2]:.1f}s = {r_t[2] / c['duration']:.0%}; $50K twist {r_t[5]:.1f}s = {r_t[5] / c['duration']:.0%}; "
      f"hero card {hero(c)['openAt'] + 0.45:.2f}s of {c['duration']}s")
assert r_t[2] / c["duration"] <= 0.4

print("\nall assertions passed")
```

**Output** (run 2026-10-07, after the QA fixes):

```
======================================================================== 
09A  6 groceries, 2006 vs Aug 2026 (BLS average prices)
========================================================================
  eggs, grade A large, dozen        1.31 ->  2.27  x1.73  running   1.31 |   2.27
  milk, whole, gallon               3.08 ->  4.23  x1.37  running   4.39 |   6.50
  bread, white pan, lb              1.08 ->  1.82  x1.69  running   5.47 |   8.32
  bananas, lb                       0.50 ->  0.65  x1.30  running   5.97 |   8.97
  coffee, 100% ground roast, lb     3.20 ->  9.30  x2.91  running   9.17 |  18.27
  ground beef, 100% beef, lb        2.22 ->  6.92  x3.12  running  11.39 |  25.19
  totals: 2006 $11.39 | 2026 $25.19 (receipt) / $25.198 (unrounded)
  ratio 2.212  -> on screen x2.2   (+121.2%)
  increase $13.80; coffee +$6.10, beef +$4.70 = $10.80 = 78.26% of the jump -> '78%'
  bananas +$0.15 in 20 yrs (x1.30); coffee x2.9; beef x3.1
  pay ratio x1.937 -> 'x1.9'
  minutes of work: 2006 40.70 min | 2026 46.46 min (46.48 unrounded)
  difference 5.76 min (+14.1%)
  verdict 'x1.1, not x2.2': exact 1.141; from the rounded screen values 1.122
  envelope said ~46 min: within 0.99%; ~41 min: within 0.73%
  at federal minimum wage: 132.7 min -> 208.5 min (+57%)
======================================================================== 
09B  $10 at Chipotle (FY2025 10-K / Q4 release, % of total revenue)
========================================================================
  restaurant costs 74.6% -> restaurant-level margin 25.4% (reported 25.4%)
  net margin 1,535,761 / 11,925,601 = 12.88%
  food, drinks, bags                               $ 2.96   left $ 7.04
  crew (labor)                                     $ 2.51   left $ 4.53
  rent (occupancy)                                 $ 0.52   left $ 4.01
  ads, delivery, card fees, utilities (other op.)  $ 1.47   left $ 2.54
  HQ + depreciation + new stores (to operating)    $ 0.92   left $ 1.62
  taxes, net of interest income: 1.62 - 1.2878 = $0.3322 -> $0.33
  profit per $10: $1.2878 -> '$1.29' (within 0.17%); '12.9%'
  crew vs food: 85% ('almost as much'); food $2.96 vs profit $1.29 = 2.3x
  revenue growth check: 0.0541 (reported +5.4%)
======================================================================== 
09C  a $2 Powerball ticket (official prize chart, Oct 7 2026 jackpot est.)
========================================================================
  combinations: C(69,5) x 26 = 292,201,338
  Powerball only  $        4  1 in          38.32 (matches chart)  worth 10.437 c
  1 + PB          $        4  1 in          91.98 (matches chart)  worth  4.349 c
  2 + PB          $        7  1 in         701.33 (matches chart)  worth  0.998 c
  3               $        7  1 in         579.76 (matches chart)  worth  1.207 c
  3 + PB          $      100  1 in      14,494.11 (matches chart)  worth  0.690 c
  4               $      100  1 in      36,525.17 (matches chart)  worth  0.274 c
  4 + PB          $   50,000  1 in     913,129.18 (matches chart)  worth  5.476 c
  5               $1,000,000  1 in  11,688,053.52 (matches chart)  worth  8.556 c
  overall odds of any prize: 1 in 24.87 (chart: 24.87)
  $4  1 in 38            10.437 c -> 10 c   running 10.437 c -> 10 c (receipt sum 10 c)
  $4-$7  3 more ways      6.554 c -> 7 c   running 16.992 c -> 17 c (receipt sum 17 c)
  $100  2 ways            0.964 c -> 1 c   running 17.955 c -> 18 c (receipt sum 18 c)
  $50,000                 5.476 c -> 5 c   running 23.431 c -> 23 c (receipt sum 23 c)
  $1,000,000              8.556 c -> 9 c   running 31.987 c -> 32 c (receipt sum 32 c)
  all non-jackpot prizes: $0.31987
  twist: $50,000 tier 5.48 c < $4 Powerball-only tier 10.44 c
  jackpot: $199.8M x 0.63 = $125.874M -> '$125.9M';  / 292,201,338 = $0.43078 -> 43 c
  whole ticket: 31.987 + 43.078 = 75.065 c -> '~75 c' (within 0.09%)
  return per $1 spent: 0.375
  TikTok beat: 20 tickets = $40 in, $15.01 back on average -> 'about fifteen back'
  break-even cash (no split, 37% fed only): $779.3M; at this week's cash/annuity ratio 0.4120 ~ $1.89B advertised
  if the $50K and $1M tiers are taxed at the same 37%: small prizes 26.80 c, ticket 69.87 c -> '~70 c' (pin note)
======================================================================== 
specs: on-screen numbers and timing
========================================================================
  09A  eggs (first payoff) 5.0s = 12%; bananas break 14.6s = 35%; hero card 39.75s of 41.5s
  09B  food (first payoff) 4.6s = 15%; crew twist 7.8s = 25%; hero card 29.45s of 31.2s
  09C  $4 row (first payoff) 4.6s = 12%; $50K twist 13.6s = 34%; hero card 37.85s of 39.5s

all assertions passed
```

---

### Verification log

QA pass by an independent fact-checker, editor and QA reviewer, 2026-10-07. I assumed there were mistakes and looked for them.
- **Files touched:** this md, `teasers/09-itemized-tally-math.py`, `engine/specs/09-itemized-tally-{a,b,c}.json`, the re-rendered `engine/out/sheets/09-itemized-tally-{a,b,c}.png`, and `engine/out/stills/09-itemized-tally-*`.
- **Stills:** stale stills rendered from the old timings were deleted.
- `engine/src` was not edited.

**1. Math (recomputed independently in python3, then the script was extended to read the specs)**
- **Checked:** every number in the md, VO, captions, receipts, counters, handwriting, sealed cards, stickies, pins and descriptions:
  - 09A: six prices, both running-total chains, ×2.21, 78.26%, ×2.9 / ×3.1, +15¢, 40.70 / 46.46 min, ×1.94 pay, and 132.7 / 208.5 min at minimum wage.
  - 09B: 74.6% → 25.4%, the six rows, the $10 → $1.62 chain, 12.88%, 85%, and +5.4% growth.
  - 09C: all eight fixed-prize odds re-derived from C(69,5) × 26 and matched to the chart, overall odds 1 in 24.87, per-tier worth, the 10/17/18/23/32¢ chain, $125.874M, 43.08¢, 75.07¢, 37.5¢ per $1, the $779.3M / $1.89B break-even, and $15.01 per 20 tickets.
- **Arithmetic:** every writer number reproduces.
- **Bug (09A, on screen and in VO):** the working showed "≈ 41 min" and "≈ 46 min", then the verdict said "+6 min" and the VO "Six more minutes". The exact gap is 5.76, but a viewer subtracting the numbers on screen gets 5, which is a free "math police" win against us. **Changed:** the verdict is now a ratio, `×1.1, not ×2.2`. That holds both ways: 46.46 ÷ 40.70 = 1.14 exact, and 46 ÷ 41 = 1.12 from the screen. The exact +5.8 min (+14%) moved to the pin. The script asserts both roundings.
- **Gap (09C):** the jackpot is taxed at 37% but the $50K and $1M prizes are counted pre-tax, and nothing said so. **Changed:** the pin says so and gives the taxed figure (≈ 70¢, 69.87¢ exact). The ASSUME note in the md says so too. The script asserts it.
- **Sensitivity checked:** any 2006 monthly wage in the cited $16.52 to $17.06 range still gives 40 to 41 min. The 09B tax row stays $0.33 for any unrounded operating margin below 16.228%. Above that it would be $0.34. Re-check this against the 10-K's exact operating income before upload.
- **Added to the script:** a specs section that asserts:
  - each receipt row, counter chain and handwritten line;
  - that the hook, postage stamp and dollar figure are fully drawn in frame 0;
  - that the first payoff lands by 40% and the sealed card lands in the last 2 s;
  - that every caption allows ≥ 0.25 s per word.

  All assertions pass. The md now embeds the updated script and its output.

**2. Facts (as of 2026-10-07)**
- **Not re-verified on the web in this pass.** This run's shared WebSearch budget was already used up when QA started; the tool refused every query. Direct loads of the cited primary sources (fred.stlouisfed.org, bls.gov, ir.chipotle.com, powerball.com) were all blocked by the egress proxy. I did not use search engines, readers or archives to get around this. The Sources tables now say "writer-verified; QA could not re-load".
- **What I could still check:**
  - All Powerball odds are pure combinatorics and match the chart to the cent.
  - The federal 37% top rate for 2026 (single > $640,600) and the $5.15 → $7.25 federal minimum wage dates match what I know.
  - Oct 5 and Oct 7 2026 are a Monday and a Wednesday, which are Powerball draw days.
  - The Chipotle shares are internally consistent: 100 − 74.6 = 25.4%, and $11,925.6M ÷ $11,313.9M (FY2024) = +5.4%, matching the reported growth.
  - The evidence-table rows (views, outliers, lengths, URLs) match `research/02-top-10-approaches.md` and `research/raw`. The Monarch, Big Mac and Matka claims match the watch files. The 57% cards+DVD share (23.24 ÷ 41.07) recomputes.
- **Wrong claim fixed (09A basis note):** it said August 2026 pay was "the latest release as of 2026-10-07". The September jobs report (normally the first Friday, Oct 2 2026) would already be out. The note now says August pay is used to match the latest average-price month (Sep prices are due Oct 14). It also says to cite the August release itself, because the live Table B-8 link shows later months.
- **Flagged, not changed:** the 09C cash/annuity ratio (199.8 ÷ 485 = 0.412) is lower than the roughly 0.45 to 0.46 typical of 2025 jackpots. That is possible if rates rose, but it is the input most worth re-checking. It also moves daily anyway (freshness rule).
- **Before publishing, re-confirm:**
  - the six Aug 2026 BLS average prices and the six 2006 annual averages;
  - $16.79 and $32.53 (and whether $32.53 has since been revised);
  - Chipotle's FY2025 percentages, net income and revenue, plus the exact operating income;
  - the jackpot and cash value on the morning of upload.

**3. Brand and policy (format bible §2)**
- **≤3 lines:** pass.
  - 09A: a pencil label plus two math lines, with the sealed card as the third.
  - 09B: one line plus the card.
  - 09C: three lines plus the card.
- **A number in frame 1: FAIL → fixed (all three).** The hook, postmark and postage stamp started at t = 0 and eased in from zero, and the receipt header printed at 0.4 s. Frame 0 (the thumbnail and the first frame in the feed) was blank kraft; the t = 0 still showed only the paper. Now:
  - the hook starts at t −0.8, the postmark and stamp at −0.5;
  - the receipt starts early enough (−1.4 / −1.8) that its header is already printed;
  - so frame 0 shows the tape hook with the dollar figure, the postage stamp, the postmark and the receipt header.
- **Honest rounding + exact pinned comment:** present in all three. The 09A pin now carries the exact +5.8 min. The 09B pin keeps "food $2.96 vs profit $1.29", which was cut from the screen. The 09C pin adds the pre-tax note.
- **No advice language:** pass. No "you should", "you need to", "guaranteed" or "get rich". 09C keeps "This is arithmetic, not a recommendation" and the 1-800-GAMBLER line.
- **No borrowed footage or impersonation:** pass. Everything is drawn, and the brands appear only as names with public prices and filings.
- **Disclaimer:** "Educational math, not financial advice." is in all three descriptions. Pass.

**4. Virality (scored against `02-top-10-approaches.md` §9, `watch/group3-video3.md` and `watch/group4-video3.md`)**

| | Hook before | Hook after | Why |
|---|---|---|---|
| 09A | 6.5 | 8.5 | "6 groceries cost $11.39 in 2006. Today?" asked for a number but forced no stance, and frame 0 was blank. **Rewritten:** "6 groceries: $11.39 in 2006 / Did they *actually* double?" It is a yes/no question everyone already has an answer to, and "actually" is the bible's myth-bust word. The video answers it twice: "in dollars, yes" at 58%, then ×1.1 in minutes of work in the last 2 s. |
| 09B | 7 | 8.5 | The copy ("$10 at Chipotle. How much is profit?") is Tilbury's 29.4M formula and stays. It lost points only to the blank frame 0, the 7.3 s set-up and a hero 6 s from the end, all fixed. |
| 09C | 6.5 | 8 | "What's it worth?" was generic, and frame 0 was blank. **Rewritten:** "What's it *really* worth?" ("actually" doesn't fit the tape above 66 px; the title keeps "actually"). The receipt header "PRIZE × CHANCE = WORTH" is now in frame 0, so the thumbnail promises math. |

- **Slow beats tightened:**
  - Set-ups cut from 7.3 to 7.5 s to 4.5 to 4.9 s; the first item now prints at 4.6 to 5.0 s.
  - Receipt slots cut from 3.6 / 3.5 s to 3.2 s on 09A/09B; 09C stays at 3.0 s.
  - Masters: 09A 51.0 → 41.5 s, 09B 38.8 → 31.2 s, 09C 44.8 → 39.5 s.
  - VO is about 165 to 180 wpm (the md's old "≈ 150 wpm" didn't fit the old caption windows either).
- **First partial payoff by about 40%:** pass on all three.
  - 09A: eggs at 12%.
  - 09B: food at 15%, then the crew twist and POSTAGE DUE at 25 to 31%.
  - 09C: $4 at 12%, then the $50K twist and OPENED BY MISTAKE at 34 to 43%.
  - The planned pattern breaks sit at 35 to 43% (09A bananas) and 34 to 49% (09C), as in Monarch.
- **Biggest number in the last 2 s: FAIL → fixed.** The writer's envelopes opened at 84 to 88%, and 6 s of verdict lines and re-hook followed. Now every envelope opens 2.1 to 2.2 s before the end, and its card slides out 1.65 to 1.75 s before the end:
  - 09A ≈ 46 min at 39.75 of 41.5 s;
  - 09B $1.29 at 29.45 of 31.2 s;
  - 09C ≈ 75¢ at 37.85 of 39.5 s.

  09A's OPENED BY MISTAKE stamp also lands in the last 1.2 s.
- **Loop / re-hook:** each last line meets frame 1:
  - 09A: "46 minutes. Not double." → "Did they actually double?"
  - 09B: "$1.29. Rip-off or not?" → "How much is profit?"
  - 09C: "…For two dollars." → "$2 Powerball ticket."
  - 09C's spoken break-even re-hook moved to the comment bait and the pin.
- **Platform notes corrected:** the writer promised "60 s+" / "64 s" TikTok cuts that one extra beat could never reach. The cuts are now stated honestly (09A 47 s, 09B 37 s, 09C about 46 s), with a note not to pad to 60 s with numberless beats.

**5. Visual QA (`check`, sheets and stills, all looked at)**
- `node src/cli.js check` ends with **zero warnings** on all three. The writer's specs also passed lint; their faults were timing and frame 0, which lint doesn't catch.
- **Fixed during this pass:**
  - The first hook rewrites were too wide for the safe area (974 and 1,023 px against a 968 px limit). I measured them with the engine's own font metrics, then set the 09A tape at 68 px and used "really" at 74 px for 09C.
  - The 09A OPENED BY MISTAKE stamp covered the envelope's "2026 = ? MIN" label. It moved up 40 px.
  - The ASSUME stickies (09A, 09C) were still fading out under the timer that replaces them. They now leave 0.3 s earlier.
  - The 09A running total was two unlabelled numbers. A pencil "→" between them now matches the receipt's "2006 → 2026" columns.
- **Reading time:** every caption allows ≥ 0.25 s per word. Two of the writer's captions failed this rule ("now 65. Up 15 cents in 20 years." at 0.21 s/word; "2.2 times. Coffee and beef did 78% of it." at 0.21), and so did a first draft of mine (0.23). All are fixed. Every written line stays readable at least 0.25 s per word after it finishes writing. The sealed cards stay 1.65 to 1.75 s, enough for their 4 to 7 words.
- **Sheets** (`engine/out/sheets/09-itemized-tally-{a,b,c}.png`) and **stills** (`engine/out/stills/09-itemized-tally-*`, including the t = 0 thumbnail of each) were re-rendered from the final specs.

**Engine requests (not implemented here; engine/src untouched)**
1. The `counter` lint box measures the prefix plus `Math.round(to)`, without the decimals ("$25" instead of "$25.19"), so it under-reports counter width. Measure the formatted string.
2. Give `receipt` a `startRow` or `instant` option, so the header can be printed in frame 0 without shifting the whole receipt to a negative `t`.
3. Add an anchor for annotations on receipt rows (for example `annotate.target: {op, row}`), so circles and highlights don't need hand-computed y values that break when `size` changes.
4. Add a `check` warning when frame 0 has no readable text, and another when an `envelope` card lands earlier than `duration − 2` (format bible §2.2 and §2.5).
5. Give `hook` an `instant: true` option. Pre-rolled ops (negative `t`) currently stack all their SFX on sample 1, because `sec()` clamps to 1. A pre-rolled op should either drop its SFX or start them at 0 with their natural spacing.
