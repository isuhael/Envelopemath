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
**Lane / runtime:** Envelope, **41.6 s** master, `loop: true`. The writer's 51 s cut spent 5 s on set-up with no new number and 6 s after the reveal; both were cut. A 47 s Reels/TikTok cut adds the minimum-wage beat (see platform notes).

**Frame-1 hook** (finished in frame 0, which is also the thumbnail)
- **On screen:** masking tape "6 groceries: **$11.39** in 2006 / Did they **actually** double?", the postmark No. 09A in the flap, the full 2006 receipt (six BLS prices, red TOTAL $11.39) and, beside it, an empty receipt headed "AUG 2026". The empty column is the question.
- **First spoken line (0.1 to 2.6 s):** "Six groceries cost eleven thirty-nine in 2006."

**Beat sheet** (spec `09-itemized-tally-a.json`; two receipts side by side, 44 px type; each 2026 price prints 1.3 s into its 3.2 s slot, on "Now…")

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.6 | Hook | Tape hook, postmark, 2006 receipt with TOTAL $11.39, empty AUG 2026 receipt (all in frame 0) |
| 2.6 to 4.9 | The stake + source | "Did they actually double? BLS prices, line by line." |
| 5.0 to 14.5 | Lines 1 to 3, **first payoff at 15%** | A highlighter swipe marks the 2006 row being read; then the 2026 price prints beside it with its multiplier: ×1.7 $2.28 (6.3) · ×1.4 $4.23 (9.5) · ×1.7 $1.82 (12.7). The 2026 TOTAL row updates with each print |
| 14.6 to 17.7 | **Pattern break (35 to 43%)** | Hook leaves; BANANAS ×1.3 $0.65 prints highlighted (15.9); 🍌 and red "+15¢ in 20 years?!" |
| 17.8 to 24.1 | The big movers + the line to beat | Pencil "double = $22.78" (17.9); COFFEE ×2.9 $9.30 in red (19.1); GROUND BEEF ×3.1 $6.92 in red (22.3): the 2026 TOTAL jumps $18.28 → $25.20 and "$22.78" gets a red circle (22.65) |
| 24.2 to 28.7 | Totals (58 to 69%) | TOTAL $11.39 beside TOTAL $25.20; red "× 2.2", double-underlined (25.8); "78% of it: coffee + beef" with "coffee + beef" highlighted (26.4 to 27.4). VO: "2.2 times. In dollars, yes." |
| 28.8 | Flip | Working side |
| 29.1 to 36.1 | The adjustment line | ASSUME sticky (pay, 29.1); sealed envelope slides in (29.3); pencil "in minutes of work:" (29.4, 30 cps, so its pen is gone before the next line starts); "2006: $11.39 ÷ $16.79 ≈ 41 min" (30.35; "41 min" underlined at 32.45); "2026: $25.20 ÷ $32.53 ≈" (33.8) |
| 36.2 to 39.2 | Commit | PAUSE & GUESS timer, 3 s |
| **39.2 to 41.6** | **Hero in the last 2 s** | Envelope opens (39.2); card out from 39.65 (95%): **≈ 46 min / ×1.1, not ×2.2** (112 px); red "46 min" completes line 2 (39.8); OPENED BY MISTAKE (40.3) |
| 39.3 to 41.6 | Loop | "46 minutes. Not double." then a 0.35 s crossfade into frame 0's "Did they actually double?" |

**Full voice-over** (calm, dry; ≈ 170 wpm; the spec's `vo` and caption `say` fields carry the same words)
> Six groceries cost eleven thirty-nine in 2006. Did they actually double? BLS prices, line by line.
> Eggs: a buck thirty-one a dozen. Now two twenty-eight.
> Milk: three-oh-eight a gallon. Now four twenty-three.
> Bread: a buck-oh-eight a pound. Now a buck eighty-two.
> Bananas: fifty cents… now sixty-five. Fifteen cents in twenty years?!
> Coffee: three twenty a pound. Now nine thirty.
> Ground beef: two twenty-two. Now six ninety-two. Triple.
> Total: eleven thirty-nine then. Twenty-five twenty now. Two point two times. In dollars, yes.
> But pay rose too: sixteen seventy-nine an hour in 2006. So that bag cost forty-one minutes of work.
> Today: thirty-two fifty-three an hour. Today's bag costs… Pause. Guess the minutes.
> Forty-six minutes. Not double.
> *(loop)* Six groceries cost eleven thirty-nine in 2006. Did they actually double?

**The envelope math** (the receipts carry the six sourced lines; the handwriting is two lines under a pencil label, and the sealed card holds the answer)
1. `2006: $11.39 ÷ $16.79 ≈ 41 min` (exact 40.70 min)
2. `2026: $25.20 ÷ $32.53 ≈ 46 min` (exact 46.48 min; 46.49 from the unrounded $25.205; "46 min" is written in red when the envelope opens)
3. Sealed card: `≈ 46 min` / `×1.1, not ×2.2` (minutes ×1.14 exact, ×1.12 from the rounded 46 ÷ 41; prices ×2.21)

The verdict is a ratio on purpose. The exact gap is 5.78 min, but the screen shows 41 and 46, and anyone subtracting those gets 5.
The row multipliers (×1.7, ×1.4, ×1.7, ×1.3, ×2.9, ×3.1) are the shown 2026 price ÷ the 2006 price, and each rounds the same way from the unrounded BLS price.

**ASSUME sticky:** "avg hourly pay / 2006: $16.79 / 2026: $32.53". The receipt headers flag the price basis: "AVG PRICE, 2006" and "AUG 2026".

**Sources** (re-verified with WebSearch on 2026-10-07 in the polish pass; details in the Final fact check)

| Input | Value | Source (date) |
|---|---|---|
| Eggs, grade A large, dozen (APU0000708111) | 2006 avg $1.31 · **Aug 2026 $2.279** (was $2.272 in the writer's draft; +4.1% from July's $2.189) | BLS average price data via https://www.usinflationcalculator.com/inflation/egg-prices-adjusted-for-inflation/ (Aug data released 2026-09-11); https://themoneyoverview.com/36-egg-prices-ticked-back-up-to-about-2-28-a-dozen-in-august-bucking-the/ ; series https://fred.stlouisfed.org/series/APU0000708111 |
| Milk, whole, gallon (APU0000709112) | 2006 avg $3.08 · Aug 2026 $4.229 | https://www.usinflationcalculator.com/inflation/milk-prices-adjusted-for-inflation/ ; https://fred.stlouisfed.org/series/APU0000709112 |
| Bread, white pan, lb (APU0000702111) | 2006 avg $1.08 · Aug 2026 $1.823 | https://www.bakingbusiness.com/articles/66929-white-pan-bread-retail-price-rises-in-august ; https://fred.stlouisfed.org/data/APU0000702111 |
| Bananas, lb (APU0000711211) | 2006 avg $0.50 · Aug 2026 $0.652 | https://tradingeconomics.com/united-states/bananas-per-lb-4536-gm-in-us-city-average-fed-data.html ; https://basketreport.com/prices/bananas/ ; https://fred.stlouisfed.org/data/APU0000711211 |
| Coffee, 100% ground roast, lb (APU0000717311) | 2006 avg $3.20 ($3.203) · Aug 2026 $9.299 (July $9.317) | https://www.usinflationcalculator.com/inflation/coffee-prices-by-year-and-adjust-for-inflation/ ; https://fred.stlouisfed.org/data/APU0000717311 |
| Ground beef, 100% beef, lb (APU0000703112) | 2006 avg $2.22 · Aug 2026 $6.923 | https://basketreport.com/prices/ground-beef/history/ ; https://themoneyoverview.com/25-ground-beef-averaged-6-92-a-pound-in-august-up-about-60-cents/ ; https://fred.stlouisfed.org/series/APU0000703112 |
| Release schedule | Aug 2026 CPI/average prices out 2026-09-11; Sep 2026 due 2026-10-14 | https://eco3min.fr/en/next-us-cpi-release/ ; https://www.bls.gov/cpi/factsheets/average-prices.htm |
| Avg hourly earnings, production & nonsupervisory, private | Aug 2006 $16.79 (as first published, "rose by 2 cents… to $16.79") | BLS Employment Situation, Aug 2006 (released 2006-09-01): https://www.bls.gov/news.release/archives/empsit_09012006.pdf |
| Same series | Aug 2026 $32.53 (Sep 2026: $32.60, up 7 cents, released 2026-10-02) | BLS Real Earnings, Aug 2026 (2026-09-11): https://www.bls.gov/news.release/archives/realer_09112026.htm ; Sep jobs report: https://tradingeconomics.com/united-states/average-hourly-earnings/news/589162 |
| Federal minimum wage (pinned comment only) | $5.15 (Sep 1997 to Jul 2007); $7.25 since 2009-07-24 | https://www.scrippsnews.com/life/money/despite-inflation-the-federal-minimum-wage-has-not-had-an-increase-in-15-years ; https://www.cbpp.org/sites/default/files/archive/8-31-06mw.htm |

*Basis note, stated in the pin:* 2006 prices are BLS annual averages; the 2006 wage is August (mid-year, inside that year's $16.52 to $17.06 monthly range, and any month in that range still rounds to 40 to 41 min). 2026 prices and pay are both August 2026, so they share a month: August is the latest average-price release as of 2026-10-07 (September prices come out 2026-10-14). The September jobs report is already out ($32.60), so the pay figure is the matched August one, not the newest one; the September figure leaves the verdict unchanged ($25.20 ÷ $32.60 = 46.4 min). Cite the August 2026 Real Earnings release itself, because the live Table B-8 link now shows later months.

*Cross-slate note (slate audit, 2026-10-07):* $32.53 is a different series from the "$1,251 a week" BLS median used in 02B, 03B, 03C, 04, 05A and 08A (which works out to about $31.28 an hour at 40 hours). That one is the Q2 2026 *median* of usual weekly earnings of full-time wage and salary workers; this one is the August 2026 *average* hourly earnings of private production and nonsupervisory employees, chosen because the same series has an August 2006 value ($16.79) to compare against. The two are not meant to match.

**Ending**
- **Loop line:** "46 minutes. Not double." crossfades straight into the frame-1 tape "Did they actually double?", so the answer and the question meet at the seam.
- **Comment bait** (a genuine question, in the caption): "Which wage should the envelope use: average pay or minimum wage? (The pin has both.)"
- **Pinned comment:** "Exact: $11.39 (2006 avg) → $25.205 (Aug 2026) = ×2.21. Pay $16.79 → $32.53/hr = ×1.94. Minutes of work: 40.7 → 46.5, +5.8 min (+14%), so ×1.1. Envelope said ≈46 min, within 1%. Coffee + beef = 78% of the $13.81 jump. At the federal minimum wage ($5.15 → $7.25) the same bag goes 133 → 209 min (+57%), so who's buying matters. Assumptions: BLS U.S. average prices (2006 annual avg; Aug 2026); BLS avg hourly earnings, non-managers (Aug 2006 as first published; Aug 2026). Sources in the description. Want a different item itemized? Comment it."

**Description**
> Same 6 groceries, 2006 vs today, rung up line by line on one envelope. Then the line nobody draws: what the bag costs in minutes of work.
> Prices: BLS average prices, U.S. city average (2006 annual average; Aug 2026, released Sep 11 2026). Pay: BLS average hourly earnings, production & nonsupervisory employees (Aug 2006 $16.79; Aug 2026 $32.53). Exact numbers in the pinned comment.
> Educational math, not financial advice.
> #inflation #groceryprices #thenvsnow #envelopemath #personalfinance

**Platform notes**
- **YouTube Shorts:** post the 41.6 s master. Title = the on-screen hook. Pin the comment at upload. Frame 0 (tape hook + the full 2006 receipt + the empty 2026 one) is the thumbnail. Add to an "Itemized" playlist.
- **Instagram Reels and TikTok:** a 47 s cut. After the reveal, add one beat that brings a new number: "At minimum wage? A hundred thirty-three minutes then. Two oh-nine now." Then loop. That lands Reels inside the 45 to 60 s sweet spot. Reels cover = the 28.4 s frame (both TOTAL rows, "× 2.2", "78% of it: coffee + beef"). For sends, the caption names a taggable person as a dedication (not a "send this" ask, which Meta demotes): "For whoever says groceries doubled." Run it as a Trial Reel first. On TikTok, don't pad to 60 s just for Creator Rewards: it would take about 13 s more with no new number, which breaks the "every sentence adds a number" rule (report 01, §3.4). Native captions on, no music needed (the foley is the music).

**Why this one should travel.** It is the format's strongest small-account proof (Monarch, 603x on 4.9K subs) rebuilt with both of vidIQ's top fixes (a running total and a loop). It also adds the twist the watch notes asked for ("'Hours of work' re-pricing… often flips the story", `watch/group3-video3.md`). The hook asks a yes/no question everyone already has an answer to ("did groceries double?"), and every receipt row answers it in miniature (×1.7, ×1.4… ×3.1) while the 2026 total races the pencilled "double = $22.78". The video then answers it twice: "in dollars, yes" at 58%, and "in minutes of work, ×1.1" in the last 2 s. The bananas pattern break lands at 38%, like Monarch's milk, and works the same way (the price that didn't follow). The ending gives two arguments, not one: "×2.2" vs "×1.1", and average pay vs minimum wage. Both are honest, labelled and pinned, which is the "one honest thing to argue about" rule (report 02, rules 5 and 6). A food-only basket avoids Monarch's cards-and-DVD fairness attack.

---

#### 09B: Your $10 at Chipotle. How much is profit?

**Working title:** Itemized: your $10 at Chipotle. How much is profit? · **Series tag:** (Envelope Math No. 09B · Itemized)
**Lane / runtime:** Envelope, **31.2 s**, `loop: true`. That is Tilbury's 27 to 30 s Cost vs Price length plus the sealed reveal. The writer's 38.8 s cut had a 7.3 s set-up and 6 s after the reveal.

**Frame-1 hook** (finished in frame 0)
- **On screen:** masking tape "**$10** at Chipotle. / How much is profit?", the postmark No. 09B in the flap, the receipt "WHERE YOUR $10 GOES" with all five cost lines already printed and an empty AMOUNT column beside it, and the ballpoint counter "left: $10.00".
- **First spoken line (0.1 to 2.3 s):** "Ten bucks at Chipotle. How much is profit?"

**Beat sheet** (spec `09-itemized-tally-b.json`; 52 px type; a highlighter swipe marks the line being read, its amount prints 0.3 s into the beat, and the counter steps 0.35 s later)

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.3 | Hook | Tape hook, postmark, the five cost lines, empty AMOUNT column, "left: $10.00" (all in frame 0) |
| 2.3 to 4.5 | Source | "Chipotle's own 2025 numbers, line by line." |
| 4.6 to 7.7 | Line 1, **first payoff (16%)** | -$2.96 beside FOOD, DRINKS, BAGS (4.9) → left: $7.04 (5.25). VO: "Seven bucks profit? Rip-off?" |
| 7.8 to 10.9 | **Twist (26 to 35%)** | -$2.51 beside CREW (LABOR), highlighted in red (8.1) → $4.53; hook leaves (9.4); **POSTAGE DUE** slams (9.7, 31%) |
| 11.0 to 17.3 | Restaurant costs | -$0.52 RENT (11.3) → $4.01; -$1.47 ADS, DELIVERY, FEES (14.5) → **$2.54**, underlined (15.9): what the restaurant level keeps |
| 17.4 to 20.5 | The company's costs | -$0.91 HQ + DEPRECIATION (17.7) → left: $1.63 |
| 20.7 | Flip | ASSUME sticky (20.9); pencil "taxes, minus interest earned:" (21.0, 30 cps); sealed envelope (21.1); "$1.63 − $0.34 = ?" at 100 px (22.5, small low pen) |
| 26.0 to 29.0 | Commit | DO THE MATH timer, 3 s; red circle on the "?" |
| **29.0 to 31.2** | **Hero in the last 2 s** | Envelope opens (29.0); card out from 29.45 (94%): **$1.29 / of every $10** (110 px, red) |
| 29.1 to 31.2 | Re-hook + loop | "$1.29. Rip-off or not?" then a 0.35 s crossfade into frame 0's "How much is profit?" |

**Full voice-over** (≈ 175 wpm)
> Ten bucks at Chipotle. How much is profit? Chipotle's own 2025 numbers, line by line.
> Food, drinks and the bag: two ninety-six. Seven bucks profit? Rip-off?
> Not so fast. The crew: two fifty-one. Almost as much as the food.
> Rent: fifty-two cents. Down to four-oh-one.
> Ads, delivery, card fees: a buck forty-seven. The restaurant keeps two fifty-four.
> Headquarters, depreciation, new stores: ninety-one cents.
> Then taxes, minus the interest it earns: thirty-four cents.
> You do the last subtraction. Pause. What's left of your ten?
> A buck twenty-nine. Rip-off or not?

**The envelope math** (each amount is one exact FY2025 10-K line ÷ revenue × $10; the handwriting is one line and the sealed card holds the answer)
1. `$1.63 − $0.34 = ?` (what the five printed rows leave, minus income tax net of interest income)
2. Sealed card: `$1.29 / of every $10` (check: net income $1,535.8M ÷ revenue $11,925.6M = 12.88% → $1.288)

**Why $1.63 and not $1.62.** The polish pass rebuilt every amount from the exact 10-K dollar line instead of the rounded % shares. Rounded to the cent, the seven amounts (2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 + 1.29) add up to exactly $10.00, so every subtraction on screen is exact. The writer's version used 25.4% − 16.2% = 9.2% ($0.92) for HQ and 16.2% − 12.88% ($0.33) for taxes; the exact lines are $0.914 and $0.335, which round to $0.91 and $0.34 (the old QA had flagged that taxes would flip to $0.34 above a 16.228% operating margin; the exact margin is 16.23%). The operating margin itself is $1.62 per $10; the rounded rows leave $1.63. The pin says both.

The "12.9% profit" line and the "food $2.96 · profit $1.29" pair live in the pin.

**ASSUME sticky:** "your $10 splits like Chipotle's 2025 average". These are company-wide averages, not one order; delivery orders and regions differ.

**Sources** (re-verified with WebSearch on 2026-10-07 in the polish pass)

| Input | Value | Source (date) |
|---|---|---|
| Total revenue FY2025 | $11,925,601K (+5.4%) | Chipotle Q4 & FY2025 results, 2026-02-03: https://ir.chipotle.com/2026-02-03-CHIPOTLE-ANNOUNCES-FOURTH-QUARTER-AND-FULL-YEAR-2025-RESULTS ; same release as SEC exhibit 99.1: https://www.sec.gov/Archives/edgar/data/1058090/000105809026000007/cmg-20260203xex991.htm |
| Food, beverage & packaging | $3,527,043K (29.6%) | same |
| Labor | $2,991,680K (25.1%) | same |
| Occupancy | $624,898K (5.2%) | same |
| Other operating costs (marketing, delivery, card fees, utilities, technology, maintenance) | $1,755,824K (14.7%) | same + FY2025 10-K definition: https://www.sec.gov/Archives/edgar/data/1058090/000105809026000009/cmg-20251231.htm |
| G&A · D&A · pre-opening | $652,017K · $361,382K · $49,507K | same |
| Income from operations | $1,935,798K (16.2%) | same |
| Interest and other income · provision for income taxes | $73,721K · $473,758K | same |
| Net income | $1,535,761K (= 1,935,798 + 73,721 − 473,758) | same |
| Restaurant-level operating margin | 25.4% (reported; 25.38% from the lines) | same |

The "HQ + depreciation" row is G&A + D&A + pre-opening + impairment/closure costs. Impairment ($27,452K) is derived as revenue − operating income − every other line, so the row is $1,090,358K = 9.14% → $0.91. The "taxes (net)" row is $473,758K − $73,721K = $400,037K = 3.35% → $0.34. Both are derived in the math check, not claimed.

**Ending**
- **Re-hook / loop:** "A buck twenty-nine. Rip-off or not?" lands on the card and crossfades back to the frame-1 question "How much is profit?"
- **Comment bait:** "Rip-off or not? And which chain's $10 should we itemize next?"
- **Pinned comment:** "Exact: Chipotle's 2025 net income $1,535.8M ÷ revenue $11,925.6M = 12.88%, so $1.288 of every $10 (envelope said $1.29, within 0.2%). Food $2.96 vs profit $1.29. Each line is an exact FY2025 10-K line per $10 of revenue: food/bev/packaging $2.96 (29.6%), labor $2.51 (25.1%), occupancy $0.52 (5.2%), other operating costs $1.47 (14.7%: marketing, delivery and card fees plus utilities, restaurant tech and repairs, so the video's "ads, delivery, fees" row is shorthand for all of them) → the restaurant level keeps $2.54 (25.4%); G&A + depreciation + pre-opening + impairment $0.91 (9.1%); operating income $1.62 (16.2%; the rounded rows leave $1.63); income tax net of interest income $0.34 (3.4%); profit $1.29. Company averages, not your order. Source: Chipotle FY2025 results (Feb 3 2026) & 10-K."

**Description**
> Your $10 at Chipotle, itemized from Chipotle's own 2025 numbers: food, crew, rent, everything else, headquarters, taxes. Then you do the last subtraction.
> Sources: Chipotle Q4/FY2025 results (Feb 3 2026) and FY2025 Form 10-K. Company-wide averages applied to $10, not any single order. Exact figures pinned.
> Educational math, not financial advice.
> #chipotle #costvsprice #businessmath #envelopemath #fastfood

**Platform notes**
- **YouTube Shorts:** 31.2 s master. The title starts with the brand ("Itemized: your $10 at Chipotle") for search reach outside finance. No logos and no restaurant footage: the brand name only. Frame 0 (the five cost lines with an empty AMOUNT column) is the thumbnail.
- **Instagram Reels:** the master, with a taggable person in the caption, as a dedication: "For the friend who says Chipotle is a rip-off." Cover = the 16.5 s frame (POSTAGE DUE, the red crew row, "left: $2.54" underlined).
- **TikTok:** a 37 s cut. Add one beat after the reveal: "So how'd they make a billion and a half? Volume: eleven point nine billion in sales." Show "$1.54B ÷ $11.93B = 12.9%" in ink, then loop. Don't pad to 60 s. TikTok bans branded financial content, but this is organic and unpaid, so it doesn't apply. Never imply wrongdoing (pitfall 4): the script credits the costs.

**Why this one should travel.** It is Tilbury's 29.4M Cost vs Price structure (famous price → layer-by-layer tally → "hidden costs" twist → open subtraction), with every line from a public filing. That makes it the version that survives the "source?" comments, and our accuracy is the advantage (report 01, §3.13). The cost lines sit in frame 0 with their amounts blank, so every row is a guess before it prints. The twist does the job Tilbury's "hidden costs" did, but specifically: the crew ($2.51) costs about 85% as much as the food. The POSTAGE DUE stamp makes the hidden-cost moment visual at 31%. The open subtraction ($1.63 − $0.34) recreates the Big Mac's comment engine on purpose, and "Rip-off or not?" splits the audience in the last 2 s, just as the loop restarts.

---

#### 09C: What's a $2 Powerball ticket actually worth?

**Working title:** Itemized: what's a $2 Powerball ticket actually worth? · **Series tag:** (Envelope Math No. 09C · Itemized)
**Lane / runtime:** Envelope, **39.6 s**, `loop: true`. That is under half of Matka's 84 s, with all its math shown. The writer's 44.8 s cut put a 5.9 s re-hook after the reveal; the break-even question now lives in the pin and the comment bait.

**Frame-1 hook** (finished in frame 0)
- **On screen:** masking tape "**$2** Powerball ticket. / What's it **really** worth?", the postmark No. 09C in the flap, the official prize chart already printed as a receipt ("PRIZE · CHANCE": $4 1 IN 38 … JACKPOT 1 IN 292.2M) with an empty "= WORTH" column beside it, and the counter "worth so far: 0¢". ("Really" fits the tape at 74 px; "actually" doesn't. The title keeps "actually".)
- **First spoken line (0.1 to 2.4 s):** "A two-dollar Powerball ticket. What's it really worth?"

**Beat sheet** (spec `09-itemized-tally-c.json`; 46 px type; a highlighter swipe marks the tier being read, its worth prints at the start of the beat, and the counter steps 0.35 s later)

| Time | Beat | On screen |
|---|---|---|
| 0.0 to 2.4 | Hook | Tape hook, postmark, the prize chart, empty WORTH column, "worth so far: 0¢" (all in frame 0) |
| 2.4 to 4.5 | Rule of the game | "Each prize: prize × chance. Add them up." |
| 4.6 to 7.5 | Line 1, **first payoff (12%)** | = 10¢ beside $4 · 1 IN 38 (4.6) → worth so far: 10¢ |
| 7.6 to 13.5 | Small prizes | = 7¢ beside $4–$7 · 3 MORE WAYS → 17¢ · = 1¢ beside $100 · 2 WAYS → 18¢ |
| 13.6 to 19.5 | **Twist (34 to 49%)** | = 5¢ beside $50,000 · 1 IN 913K, highlighted in red (13.6) → 23¢; red circles on 5¢ (14.3) and 10¢ (14.8); VO "Less than the four-dollar prize!" (16.6) as the hook leaves; **OPENED BY MISTAKE** (16.9, 43%) |
| 19.6 to 22.5 | Partial total (50 to 57%) | = 9¢ beside $1,000,000 · 1 IN 11.7M → **worth so far: 32¢** |
| 22.6 to 25.5 | Cliffhanger | = ? beside JACKPOT · 1 IN 292.2M |
| 25.8 | Flip | ASSUME sticky (26.1); sealed envelope slides in (26.4) |
| 27.0 to 35.3 | The jackpot line | "$199.8M × 0.63 ≈ $125.9M" (27.0; 0.63 underlined at 29.2; **POSTAGE DUE** for the tax at 29.5); "÷ 292.2M ≈ 43¢" (31.0); "+ 32¢ small prizes = ?" (33.7) |
| 35.4 to 37.4 | Commit | DO THE MATH timer, 2 s |
| **37.4 to 39.6** | **Hero in the last 2 s** | Envelope opens (37.4); card out from 37.85 (96%): **≈ 75¢ / per $2 ticket** (110 px) |
| 37.5 to 39.6 | Loop | "About 75 cents. For two dollars." then a 0.35 s crossfade into frame 0's "$2 Powerball ticket. What's it really worth?" |

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

**The envelope math** (the receipt rows are prize × chance per tier; the handwriting is three lines at 72 px)
1. `$199.8M × 0.63 ≈ $125.9M` (cash option after a 37% federal rate; exact $125.874M)
2. `÷ 292.2M ≈ 43¢` (exact 43.08¢; the rounded line, 125.9 ÷ 292.2, also gives 43.09¢)
3. `+ 32¢ small prizes = ?` → sealed card **≈ 75¢ per $2 ticket** (exact 75.07¢; within 0.1%)

**ASSUME sticky:** "cash $199.8M (Oct 7 est.) / 37% fed tax, no split". It also says, by leaving it out, that there is no state tax; the pin says so outright. The small prizes are counted before tax, and the pin says that too.

**Sources** (re-verified with WebSearch on 2026-10-07 in the polish pass)

| Input | Value | Source (date) |
|---|---|---|
| Prize chart and odds ($2 play) | PB only $4, 1 in 38.32 · 1+PB $4, 1 in 91.98 · 2+PB $7, 1 in 701.33 · 3 $7, 1 in 579.76 · 3+PB $100, 1 in 14,494.11 · 4 $100, 1 in 36,525.17 · 4+PB $50,000, 1 in 913,129.18 · 5 $1,000,000, 1 in 11,688,053.52 · 5+PB jackpot, 1 in 292,201,338 · any prize 1 in 24.87 | Official chart: https://www.powerball.com/powerball-prize-chart ; https://www.lotteryusa.com/powerball/prizes-odds . Every figure is re-derived from C(69,5) × 26 in the math check |
| Jackpot for Wed 2026-10-07 | $485M estimated annuity; cash $199.8M (Mon 2026-10-05 drawing: $467M / $192.4M cash, no jackpot winner) | https://www.kgw.com/article/news/nation-world/powerball-winning-numbers-oct-5-2026/507-9a01fc8b-0441-4f0c-bd7d-d614a4250379 ; https://www.wkyc.com/article/news/lottery/winning-powerball-numbers-467-million-jackpot-monday-october-5-results-ohio-lottery-winners/95-0b0d7131-48fb-45a9-b24c-a46ad1dca5a4 ; https://www.yahoo.com/news/us/articles/powerball-winning-numbers-oct-5-111407510.html |
| Federal tax | Top rate 37% for 2026 (single > $640,600); 24% is only the withholding | https://www.nysscpa.org/article-content/irs-adjusts-2026-tax-brackets-and-standard-deductions-for-inflation-102425 ; https://www.journalofaccountancy.com/news/2025/oct/annual-inflation-adjustments-announced-for-tax-year-2026/ |
| Help line (pin, description) | **1-800-MY-RESET**, the National Problem Gambling Helpline since 2026-01-29 (a court order ended NCPG's use of 1-800-GAMBLER after 2025-09-29) | https://www.ncpgambling.org/news/1-800-my-reset-announcement/ ; https://sbcamericas.com/2026/01/29/ncpg-unveils-new-1-800-my-reset/ |

*Freshness rule:* the jackpot line is the only input that moves. Re-check the cash value on the morning of upload, update the sticky, line 1 and the card, and re-run the math check. The 32¢ of small prizes never changes. The cash/annuity ratio (199.8 ÷ 485 = 0.412) matches Monday's 192.4 ÷ 467 = 0.412, so the earlier QA's worry about it is settled for this week.

**Ending**
- **Loop:** "About 75 cents. For two dollars." crossfades back into frame 1's "$2 Powerball ticket. What's it really worth?", so "two dollars" meets "$2" at the seam.
- **Comment bait** (the old spoken re-hook, moved to the caption): "How big must the jackpot get to break even? Guess before you open the pin."
- **Pinned comment:** "Exact: small prizes 31.99¢ + jackpot slice 43.08¢ = 75.07¢ per $2 ticket (envelope said ≈75¢, within 0.1%), about 37.5¢ back per $1. Small prizes are counted before tax: tax the $50K and $1M tiers at the same 37% and it's ≈70¢. Break-even: the cash prize would have to reach ≈ $779M (taxed at 37%), about $1.89B advertised at this week's cash/annuity ratio. That's before state tax and before splitting, and splits get likelier as jackpots grow. Odds: official prize chart; C(69,5) × 26 = 292,201,338. Jackpot: $485M est., $199.8M cash, Oct 7 2026 drawing. This is arithmetic, not a recommendation. Gambling problem? Call 1-800-MY-RESET (National Problem Gambling Helpline)."

**Description**
> Every prize on a $2 Powerball ticket, worth = prize × chance, itemized on one envelope. The $50,000 prize is worth less than the $4 one.
> Odds: official Powerball prize chart. Jackpot: $485M est. ($199.8M cash) for the Oct 7 2026 drawing; 37% top federal rate; no split, no state tax. Exact figures pinned. Help: 1-800-MY-RESET (National Problem Gambling Helpline).
> Educational math, not financial advice.
> #powerball #lottery #expectedvalue #envelopemath #moneymath

**Platform notes**
- **YouTube Shorts:** 39.6 s master. Expect limited ads on a gambling topic (pitfall 5), so keep it framed as expected value only, with no "how to win", no strategy and no "buy". Pin at upload. Post while the jackpot story is live, and only after re-checking the cash value that morning (freshness rule above). Frame 0 (the prize chart with an empty WORTH column) is the thumbnail.
- **Instagram Reels:** the master, with a taggable person in the caption, as a dedication: "For the coworker who runs the office pool." Cover = the 17.5 s frame (OPENED BY MISTAKE over the circled 5¢ and 10¢).
- **TikTok:** a cut of about 46 s. After the reveal, add two beats: "Twenty tickets a year? Forty bucks in, about fifteen back" (20 × $2 = $40; 20 × 75.07¢ = $15.01), then the break-even question with "it's pinned". Then loop. No sponsored or affiliate lottery links (TikTok bans financial branded content). Organic only.

**Why this one should travel.** Matka proved the payout ladder at 467.6x on an 8.3K-sub channel, but it spoke its math and got the punchline wrong. This version prints the whole ladder in frame 0 and shows prize × chance on every line, and it corrects the framing instead of repeating it (report 02 pitfall 6). It newsjacks a live half-billion jackpot (report 01, §3.11). The twist at 34 to 49% ("the $50,000 prize is worth less than the $4 one") is counterintuitive, true and checkable, the ideal "math police" comment magnet (§3.7). The hero lands in the last 2 s, and "for two dollars" loops straight into the "$2" hook. The break-even question gives the pin a reason to be opened.

---

### Math check

The script is at `teasers/09-itemized-tally-math.py` (reproduced below). It recomputes every number on screen, in the VO and in the pins from the sourced inputs. Its assertions fail if any displayed rounding is wrong. It re-derives all eight fixed-prize odds and the jackpot odds from C(69,5) × 26 and checks them against the published chart, and it rebuilds 09B from the exact 10-K dollar lines (the seven rounded amounts must add up to exactly $10.00). It then reads the three specs and asserts:
- every receipt row, multiplier, counter step and handwritten line matches the math;
- no op has a negative `t`, the hook is at t 0 with a dollar figure, the postmark sits in the flap (175, 258, r 100) and `loop` is on;
- the first payoff lands by 40% and the sealed card (≥ 100 px) lands in the last 2 s;
- every handwritten line is at least 64 px, and every caption allows at least 0.25 s per word.

```python
#!/usr/bin/env python3
"""Math check for teasers 09A, 09B, 09C (Envelope Math: Itemized).

Recomputes every number shown on screen, spoken in the VO or quoted in a pinned comment,
from the sourced inputs only, and asserts the rounded values we display. Then reads the three
engine specs and checks every on-screen number, plus the format rules (hook in frame 0, no
negative-t pre-rolls, postmark in the flap, loop on, hero card in the last 2 s).
Inputs re-verified 2026-10-07 (polish pass); see the md's "Final fact check".
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
# Polish pass: eggs Aug 2026 corrected from 2.272 to 2.279 (BLS; +4.1% from July's 2.189).
items = [  # name, 2006 avg, Aug 2026 (3 decimals as published)
    ("eggs, grade A large, dozen", 1.31, 2.279),
    ("milk, whole, gallon", 3.08, 4.229),
    ("bread, white pan, lb", 1.08, 1.823),
    ("bananas, lb", 0.50, 0.652),
    ("coffee, 100% ground roast, lb", 3.20, 9.299),
    ("ground beef, 100% beef, lb", 2.22, 6.923),
]
run06 = run26 = 0.0
mult = []
for name, p06, p26 in items:
    shown = round(p26, 2)
    run06 = round(run06 + p06, 2)
    run26 = round(run26 + shown, 2)
    mult.append(f"×{shown / p06:.1f}")
    print(f"  {name:32s} {p06:5.2f} -> {shown:5.2f}  x{shown / p06:5.3f} ('{mult[-1]}')  running {run06:6.2f} | {run26:6.2f}")
    assert round(shown / p06, 1) == round(p26 / p06, 1)  # the multiplier is the same from the unrounded price
t06 = sum(p for _, p, _ in items)
t26_shown = sum(round(q, 2) for *_, q in items)
t26_exact = sum(q for *_, q in items)
assert round(t06, 2) == 11.39 and round(t26_shown, 2) == 25.20
print(f"  totals: 2006 ${t06:.2f} | 2026 ${t26_shown:.2f} (receipt) / ${t26_exact:.3f} (unrounded)")
double = 2 * round(t06, 2)
print(f"  'double = ${double:.2f}': the 2026 running total passes it on the beef line "
      f"({run26 - round(6.923, 2):.2f} -> {run26:.2f})")
assert round(double, 2) == 22.78 and round(t26_shown - round(6.923, 2), 2) < double < round(t26_shown, 2)
ratio = t26_shown / t06
print(f"  ratio {ratio:.4f} (unrounded {t26_exact / t06:.4f})  -> on screen x2.2   (+{(ratio - 1) * 100:.1f}%)")
assert round(ratio, 1) == 2.2 and round(t26_exact / t06, 1) == 2.2
jump = t26_shown - t06
cof = round(9.299, 2) - 3.20
beef = round(6.923, 2) - 2.22
share = (cof + beef) / jump
print(f"  increase ${jump:.2f}; coffee +${cof:.2f}, beef +${beef:.2f} = ${cof + beef:.2f} = {pct(share)} of the jump -> '78%'")
assert round(share * 100) == 78
print(f"  bananas +${round(0.652, 2) - 0.50:.2f} in 20 yrs (x{0.652 / 0.50:.2f}); coffee x{9.299 / 3.20:.1f}; beef x{6.923 / 2.22:.1f}")
assert round(round(0.652, 2) - 0.50, 2) == 0.15
assert round(9.299 / 3.20, 1) == 2.9 and round(6.923 / 2.22, 1) == 3.1
# Average hourly earnings, production & nonsupervisory employees, private (BLS Employment Situation):
# Aug 2006 $16.79 (as first published 2006-09-01); Aug 2026 $32.53 (BLS Real Earnings, 2026-09-11; the
# 2026-10-02 jobs report put September at $32.60, "up 7 cents", so August still reads $32.53).
w06, w26 = 16.79, 32.53
m06 = t06 / w06 * 60
m26 = t26_shown / w26 * 60
m26x = t26_exact / w26 * 60
print(f"  pay ratio x{w26 / w06:.3f} -> 'x1.9'")
assert round(w26 / w06, 1) == 1.9
print(f"  minutes of work: 2006 {m06:.2f} min | 2026 {m26:.2f} min ({m26x:.2f} unrounded)")
print(f"  difference {m26 - m06:.2f} min (+{(m26 / m06 - 1) * 100:.1f}%)")
assert round(m06) == 41 and round(m26) == 46 and round(m26x) == 46
# The screen shows "41 min" and "46 min", so the verdict is a ratio, which survives rounding either way.
assert round(m26 / m06, 1) == 1.1 and round(round(m26) / round(m06), 1) == 1.1
print(f"  verdict 'x1.1, not x2.2': exact {m26 / m06:.3f}; from the rounded screen values {round(m26) / round(m06):.3f}")
print(f"  envelope said ~46 min: within {pct(within(46, m26))}; ~41 min: within {pct(within(41, m06))}")
mw06, mw26 = 5.15, 7.25  # federal minimum wage 2006 / 2026
mm06, mm26 = t06 / mw06 * 60, t26_shown / mw26 * 60
print(f"  at federal minimum wage: {mm06:.1f} min -> {mm26:.1f} min (+{mm26 / mm06 * 100 - 100:.0f}%)")
assert round(mm06) == 133 and round(mm26) == 209 and round(mm26 / mm06 * 100 - 100) == 57

# ======================================================================= 09B
print("=" * 72, "\n09B  $10 at Chipotle (FY2025 10-K / Q4 release, $ thousands)\n" + "=" * 72)
# Polish pass: rows now come from the exact 10-K dollar lines, not the rounded % shares. That moves
# "HQ + depreciation" from $0.92 to $0.91 and "taxes (net)" from $0.33 to $0.34 (exact $0.3354).
revenue = 11_925_601
food, labor, occ, other = 3_527_043, 2_991_680, 624_898, 1_755_824
ga, da, preopen = 652_017, 361_382, 49_507
op_income, interest_other, tax, net_income = 1_935_798, 73_721, 473_758, 1_535_761
assert op_income + interest_other - tax == net_income
impair = revenue - op_income - (food + labor + occ + other + ga + da + preopen)
print(f"  impairment, closure & asset disposal (derived): ${impair:,}K")
assert 0 < impair < 50_000
shares = {"food": food, "labor": labor, "occ": occ, "other": other}
for k, v in shares.items():
    print(f"  {k:6s} {v / revenue * 100:6.3f}% of revenue")
assert [round(v / revenue * 100, 1) for v in shares.values()] == [29.6, 25.1, 5.2, 14.7]
rlm = (revenue - food - labor - occ - other) / revenue
opm = op_income / revenue
net = net_income / revenue
print(f"  restaurant-level margin {pct(rlm)} (reported 25.4%); operating margin {pct(opm)} (reported 16.2%); net {pct(net)}")
assert round(rlm * 100, 1) == 25.4 and round(opm * 100, 1) == 16.2
hq = ga + da + preopen + impair
lines = [("food, drinks, bags", food), ("crew (labor)", labor), ("rent (occupancy)", occ),
         ("ads, delivery, card fees, utilities (other op.)", other),
         ("HQ + depreciation + new stores (G&A, D&A, pre-opening, impairment)", hq),
         ("taxes, net of interest income", tax - interest_other), ("profit (net income)", net_income)]
per10 = [(n, v / revenue * 10) for n, v in lines]
shown_b = [round(v, 2) for _, v in per10]
for (n, v), s in zip(per10, shown_b):
    print(f"  {n:68s} ${v:6.4f} -> ${s:.2f}")
assert abs(sum(v for _, v in per10) - 10) < 1e-9
assert round(sum(shown_b), 2) == 10.00, sum(shown_b)  # the rounded rows add up to exactly $10.00
assert shown_b == [2.96, 2.51, 0.52, 1.47, 0.91, 0.34, 1.29]
left = [10.0]
for s in shown_b[:5]:
    left.append(round(left[-1] - s, 2))
print(f"  left of $10 after each receipt row: {left}")
assert left == [10.0, 7.04, 4.53, 4.01, 2.54, 1.63]
assert round(left[-1] - shown_b[5], 2) == shown_b[6] == 1.29
print(f"  on screen: ${left[-1]:.2f} - ${shown_b[5]:.2f} = ${shown_b[6]:.2f};  exact: operating ${opm * 10:.4f}, "
      f"taxes net ${(tax - interest_other) / revenue * 10:.4f}, profit ${net * 10:.4f}")
print(f"  profit per $10: ${net * 10:.4f} -> '$1.29' (within {pct(within(1.29, net * 10))}); '12.9%'")
assert round(net * 100, 1) == 12.9
print(f"  restaurant keeps ${rlm * 10:.4f} -> '$2.54' (the rounded chain also gives {left[4]:.2f})")
assert round(rlm * 10, 2) == left[4] == 2.54
print(f"  crew vs food: {labor / food * 100:.0f}% ('almost as much'); food $2.96 vs profit $1.29 = {2.96 / 1.29:.1f}x")
print(f"  revenue growth check: {revenue / 11_313_853 - 1:.4f} (reported +5.4%)")
assert round((revenue / 11_313_853 - 1) * 100, 1) == 5.4

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
assert round(float(1 / win_any), 2) == 24.87
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
# Jackpot for Wed 2026-10-07: $485M estimated annuity, $199.8M cash (after no winner on Mon 2026-10-05).
cash, annuity, tax_rate = 199_800_000, 485_000_000, 0.37
after = cash * (1 - tax_rate)
jp = after / total
print(f"  jackpot: ${cash / 1e6:.1f}M x {1 - tax_rate:.2f} = ${after / 1e6:.3f}M -> '$125.9M';  / {total:,} = ${jp:.5f} -> 43 c")
assert round(after / 1e6, 1) == 125.9 and round(jp * 100) == 43
assert round(round(after / 1e6, 1) / round(total / 1e6, 1) * 100) == 43  # the rounded line gives 43 c too
whole = small + jp
print(f"  whole ticket: {small * 100:.3f} + {jp * 100:.3f} = {whole * 100:.3f} c -> '~75 c' (within {pct(within(0.75, whole))})")
assert round(whole * 100) == 75 and cum_shown + round(jp * 100) == 75
print(f"  return per $1 spent: {whole / 2:.3f}")
print(f"  TikTok beat: 20 tickets = ${20 * 2} in, ${20 * whole:.2f} back on average -> 'about fifteen back'")
assert round(20 * whole) == 15
need_cash = (2 - small) * total / (1 - tax_rate)
ratio_now = cash / annuity
print(f"  break-even cash (no split, 37% fed only): ${need_cash / 1e6:,.1f}M; "
      f"at this week's cash/annuity ratio {ratio_now:.4f} ~ ${need_cash / ratio_now / 1e9:.2f}B advertised")
assert round(need_cash / 1e6, 1) == 779.3 and round(need_cash / ratio_now / 1e9, 2) == 1.89
print(f"  if the $50K and $1M tiers are taxed at the same 37%: small prizes {(small - 0.37 * float(ev['4 + PB'] + ev['5'])) * 100:.2f} c, "
      f"ticket {(small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100:.2f} c -> '~70 c' (pin note)")
assert round((small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100) == 70

# ======================================================================= specs
# The specs are the source of what viewers see: check every on-screen number against the math above,
# and the format rules (number in frame 0, payoff by ~40%, hero in the last 2 s, loop, no pre-roll hacks).
import json
import os
import re

SPECS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine", "specs")


def load(stem):
    with open(os.path.join(SPECS, f"09-itemized-tally-{stem}.json")) as f:
        return json.load(f)


def op(spec, **kw):
    hits = [o for o in spec["ops"] if all(o.get(k) == v for k, v in kw.items())]
    assert len(hits) == 1, (kw, len(hits))
    return hits[0]


def texts(spec):
    out = []
    for o in spec["ops"]:
        for k in ("text", "note", "header"):
            v = o.get(k)
            if isinstance(v, list):
                out += [str(x) for x in v]
            elif v is not None:
                out.append(str(v))
        for c in o.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for it in o.get("items", []):
            out += [str(x) for x in (it if isinstance(it, list) else (it["label"], it["value"]))]
    return out


def rule_checks(spec, code):
    ops = spec["ops"]
    assert all(o["t"] >= 0 for o in ops), "negative-t pre-roll left in the spec"
    hook = next(o for o in ops if o["type"] == "hook")
    assert hook["t"] == 0 and re.search(r"\$\d", " ".join(hook["text"])), "frame 0 needs the hook with a dollar figure"
    pm = next(o for o in ops if o["type"] == "postmark")
    assert (pm["t"], pm["x"], pm["y"], pm["r"], pm["persist"], pm["center"][1]) == (0, 175, 258, 100, True, code)
    assert spec.get("loop") is True
    env = next(o for o in ops if o["type"] == "envelope")
    card_in = env["openAt"] + 0.45
    assert spec["duration"] - 2.0 <= card_in < spec["duration"] - 1.2, (card_in, spec["duration"])
    hero = env["card"][0]
    hero_size = hero.get("size", env["cardSize"]) if isinstance(hero, dict) else env["cardSize"]
    assert hero_size >= 100, hero_size
    for o in ops:  # handwriting floors for this pass: 64px working lines (hero >= 100 checked above)
        if o["type"] == "write" and o.get("font", "hand") == "hand":
            assert o["size"] >= 64, (o["text"], o["size"])
    caps = spec["captions"]
    for x in caps:
        assert x["end"] - x["t"] >= 0.25 * len(x["text"].split()) - 1e-9, x
        assert x["end"] <= spec["duration"]
    for x, y in zip(caps, caps[1:]):
        assert y["t"] >= x["end"] - 1e-9, (x, y)
    return card_in


print("=" * 72, "\nspecs: on-screen numbers and timing\n" + "=" * 72)
a, b, c = load("a"), load("b"), load("c")

# 09A: a 2006 receipt (printed in frame 0) beside a 2026 receipt that prints line by line
heroA = rule_checks(a, "09A")
r06, r26 = op(a, id="r06"), op(a, id="r26")
assert r06["instant"] and [v for _, v in r06["items"]] == [f"${p06:.2f}" for _, p06, _ in items]
assert [it["value"] for it in r26["items"]] == [f"${round(p26, 2):.2f}" for *_, p26 in items]
assert [it["label"] for it in r26["items"]] == mult
assert r06["running"]["label"] == r26["running"]["label"] == "TOTAL"
tA = texts(a)
for s in ("+15¢ in 20 years?!", f"double = ${double:.2f}", "× 2.2", "78% of it: coffee + beef",
          "2006: $11.39 ÷ $16.79 ≈ 41 min", "2026: $25.20 ÷ $32.53 ≈", "46 min", "≈ 46 min", "×1.1, not ×2.2"):
    assert s in tA, s
sticky = op(a, type="sticky")["text"]
assert "$16.79" in sticky and "$32.53" in sticky
eggs_at = r26["items"][0]["at"]
ban_at = r26["items"][3]["at"]
print(f"  09A  eggs (first payoff) {eggs_at:.1f}s = {eggs_at / a['duration']:.0%}; bananas break {ban_at:.1f}s = {ban_at / a['duration']:.0%}; "
      f"hero card {heroA:.2f}s of {a['duration']}s")
assert eggs_at / a["duration"] <= 0.4 and 0.3 <= ban_at / a["duration"] <= 0.45

# 09B: the cost lines are printed in frame 0; their amounts (exact 10-K lines per $10) print beside them
# one by one, and the "left:" counter steps down after each
heroB = rule_checks(b, "09B")
rbl, rb = op(b, id="rbl"), op(b, id="rb")
assert rbl["instant"] and [lab for lab, _ in rbl["items"]] == ["FOOD, DRINKS, BAGS", "CREW (LABOR)", "RENT",
                                                             "ADS, DELIVERY, FEES", "HQ + DEPRECIATION"]
assert [it["value"] for it in rb["items"]] == [f"-${s:.2f}" for s in shown_b[:5]]
cnt = op(b, id="left")
assert [v for _, v in cnt["steps"]] == left
for it, (st, _) in zip(rb["items"], cnt["steps"][1:]):
    assert abs(st - (it["at"] + 0.35)) < 1e-9
tB = texts(b)
for s in (f"${left[-1]:.2f} − ${shown_b[5]:.2f} = ?", "$1.29", "of every $10"):
    assert s in tB, s
food_at, crew_at = rb["items"][0]["at"], rb["items"][1]["at"]
print(f"  09B  food (first payoff) {food_at:.1f}s = {food_at / b['duration']:.0%}; crew twist {crew_at:.1f}s = {crew_at / b['duration']:.0%}; "
      f"hero card {heroB:.2f}s of {b['duration']}s")
assert food_at / b["duration"] <= 0.4

# 09C: the prize chart is printed in frame 0; each tier's worth prints beside it; the counter adds them up
heroC = rule_checks(c, "09C")
rcl, rc = op(c, id="rcl"), op(c, id="rc")
assert rcl["instant"] and rcl["items"] == [["$4", "1 IN 38"], ["$4–$7", "3 MORE WAYS"], ["$100", "2 WAYS"],
                                           ["$50,000", f"1 IN {913_129.18 / 1e3:.0f}K"],
                                           ["$1,000,000", f"1 IN {11_688_053.52 / 1e6:.1f}M"],
                                           ["JACKPOT", f"1 IN {total / 1e6:.1f}M"]]
vals = [it["value"] for it in rc["items"] if it["value"] not in ("", "?")]
assert vals == [f"{s}¢" for s in shown], vals
wc = op(c, id="worth")
assert [v for _, v in wc["steps"]] == [0] + [sum(shown[:i + 1]) for i in range(len(shown))], wc["steps"]
tC = texts(c)
for s in (f"${cash / 1e6:.1f}M × {1 - tax_rate:.2f} ≈ ${after / 1e6:.1f}M", f"÷ {total / 1e6:.1f}M ≈ {round(jp * 100)}¢",
          f"+ {cum_shown}¢ small prizes = ?", f"≈ {round(whole * 100)}¢"):
    assert any(s in t for t in tC), s
assert f"${cash / 1e6:.1f}M" in op(c, type="sticky")["text"]
first_at, twist_at = rc["items"][0]["at"], rc["items"][3]["at"]
print(f"  09C  $4 row (first payoff) {first_at:.1f}s = {first_at / c['duration']:.0%}; $50K twist {twist_at:.1f}s = {twist_at / c['duration']:.0%}; "
      f"hero card {heroC:.2f}s of {c['duration']}s")
assert first_at / c["duration"] <= 0.4

print("\nall assertions passed")
```

**Output** (run 2026-10-07, after the polish pass):

```
======================================================================== 
09A  6 groceries, 2006 vs Aug 2026 (BLS average prices)
========================================================================
  eggs, grade A large, dozen        1.31 ->  2.28  x1.740 ('×1.7')  running   1.31 |   2.28
  milk, whole, gallon               3.08 ->  4.23  x1.373 ('×1.4')  running   4.39 |   6.51
  bread, white pan, lb              1.08 ->  1.82  x1.685 ('×1.7')  running   5.47 |   8.33
  bananas, lb                       0.50 ->  0.65  x1.300 ('×1.3')  running   5.97 |   8.98
  coffee, 100% ground roast, lb     3.20 ->  9.30  x2.906 ('×2.9')  running   9.17 |  18.28
  ground beef, 100% beef, lb        2.22 ->  6.92  x3.117 ('×3.1')  running  11.39 |  25.20
  totals: 2006 $11.39 | 2026 $25.20 (receipt) / $25.205 (unrounded)
  'double = $22.78': the 2026 running total passes it on the beef line (18.28 -> 25.20)
  ratio 2.2125 (unrounded 2.2129)  -> on screen x2.2   (+121.2%)
  increase $13.81; coffee +$6.10, beef +$4.70 = $10.80 = 78.20% of the jump -> '78%'
  bananas +$0.15 in 20 yrs (x1.30); coffee x2.9; beef x3.1
  pay ratio x1.937 -> 'x1.9'
  minutes of work: 2006 40.70 min | 2026 46.48 min (46.49 unrounded)
  difference 5.78 min (+14.2%)
  verdict 'x1.1, not x2.2': exact 1.142; from the rounded screen values 1.122
  envelope said ~46 min: within 1.03%; ~41 min: within 0.73%
  at federal minimum wage: 132.7 min -> 208.6 min (+57%)
======================================================================== 
09B  $10 at Chipotle (FY2025 10-K / Q4 release, $ thousands)
========================================================================
  impairment, closure & asset disposal (derived): $27,452K
  food   29.575% of revenue
  labor  25.086% of revenue
  occ     5.240% of revenue
  other  14.723% of revenue
  restaurant-level margin 25.38% (reported 25.4%); operating margin 16.23% (reported 16.2%); net 12.88%
  food, drinks, bags                                                   $2.9575 -> $2.96
  crew (labor)                                                         $2.5086 -> $2.51
  rent (occupancy)                                                     $0.5240 -> $0.52
  ads, delivery, card fees, utilities (other op.)                      $1.4723 -> $1.47
  HQ + depreciation + new stores (G&A, D&A, pre-opening, impairment)   $0.9143 -> $0.91
  taxes, net of interest income                                        $0.3354 -> $0.34
  profit (net income)                                                  $1.2878 -> $1.29
  left of $10 after each receipt row: [10.0, 7.04, 4.53, 4.01, 2.54, 1.63]
  on screen: $1.63 - $0.34 = $1.29;  exact: operating $1.6232, taxes net $0.3354, profit $1.2878
  profit per $10: $1.2878 -> '$1.29' (within 0.17%); '12.9%'
  restaurant keeps $2.5375 -> '$2.54' (the rounded chain also gives 2.54)
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
  09A  eggs (first payoff) 6.3s = 15%; bananas break 15.9s = 38%; hero card 39.65s of 41.6s
  09B  food (first payoff) 4.9s = 16%; crew twist 8.1s = 26%; hero card 29.45s of 31.2s
  09C  $4 row (first payoff) 4.6s = 12%; $50K twist 13.6s = 34%; hero card 37.85s of 39.6s

all assertions passed
```

---

### Verification log

*First QA pass, kept as history. Where it disagrees with the **Polish pass** below, the polish pass wins: the negative-t pre-rolls it added are gone (the engine now draws a t 0 hook finished), the postage stamps are gone, 09A's eggs are $2.28 (2026 bag $25.20), 09B's last rows are $0.91 / $0.34, and the help line is 1-800-MY-RESET.*

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

### Final fact check

Polish pass, 2026-10-07, with a fresh WebSearch budget. Direct page loads (WebFetch) of bls.gov, fred.stlouisfed.org, ir.chipotle.com, yahoo.com and most news sites were blocked by the egress proxy, so each value below was confirmed from search results that quote the cited page; the URL is the page the value comes from. "Corrected" rows changed the md, specs, captions, VO and math check.

| Input | Value used | Source URL | Checked on | Status |
|---|---|---|---|---|
| Eggs, grade A large, 2006 annual avg | $1.31 / dozen | https://www.usinflationcalculator.com/inflation/egg-prices-adjusted-for-inflation/ | 2026-10-07 | confirmed |
| Eggs, Aug 2026 (BLS, released 2026-09-11) | **$2.279** → $2.28 on screen | https://www.usinflationcalculator.com/inflation/egg-prices-adjusted-for-inflation/ ("$2.279… 4.1% increase from the July price of $2.189"); https://themoneyoverview.com/36-egg-prices-ticked-back-up-to-about-2-28-a-dozen-in-august-bucking-the/ | 2026-10-07 | **corrected** (writer had $2.272 → $2.27) |
| Milk, whole, 2006 avg · Aug 2026 | $3.08 · $4.229 | https://www.usinflationcalculator.com/inflation/milk-prices-adjusted-for-inflation/ | 2026-10-07 | confirmed |
| White bread, 2006 avg · Aug 2026 | $1.08 · $1.823 (182.3¢) | https://fred.stlouisfed.org/data/APU0000702111 ; https://www.bakingbusiness.com/articles/66929-white-pan-bread-retail-price-rises-in-august | 2026-10-07 | confirmed |
| Bananas, 2006 avg · Aug 2026 | $0.50 · $0.652 | https://fred.stlouisfed.org/data/APU0000711211 ; https://tradingeconomics.com/united-states/bananas-per-lb-4536-gm-in-us-city-average-fed-data.html | 2026-10-07 | confirmed |
| Coffee, 100% ground roast, 2006 avg · Aug 2026 | $3.203 ($3.20) · $9.299 (July $9.317) | https://www.usinflationcalculator.com/inflation/coffee-prices-by-year-and-adjust-for-inflation/ | 2026-10-07 | confirmed |
| Ground beef, 100% beef, 2006 avg · Aug 2026 | $2.22 · $6.923 | https://basketreport.com/prices/ground-beef/history/ ; https://themoneyoverview.com/25-ground-beef-averaged-6-92-a-pound-in-august-up-about-60-cents/ | 2026-10-07 | confirmed |
| CPI average-price releases | Aug 2026 data 2026-09-11; Sep 2026 data due 2026-10-14 | https://eco3min.fr/en/next-us-cpi-release/ | 2026-10-07 | confirmed |
| Avg hourly earnings, prod. & nonsupervisory, Aug 2006 | $16.79 ("rose by 2 cents… to $16.79", first published) | https://www.bls.gov/news.release/archives/empsit_09012006.pdf | 2026-10-07 | confirmed |
| Same series, Aug 2026 | $32.53 | https://www.bls.gov/news.release/archives/realer_09112026.htm | 2026-10-07 | confirmed |
| Same series, Sep 2026 (context only) | $32.60, up 7 cents (released 2026-10-02) | https://tradingeconomics.com/united-states/average-hourly-earnings/news/589162 | 2026-10-07 | confirmed; not used on screen (prices are August, so pay stays August; verdict unchanged at 46.4 min) |
| 2006 monthly wage range (basis note only) | $16.52 to $17.06 | writer's figure | 2026-10-07 | not re-checked this pass; not on screen, and the 40 to 41 min conclusion holds across it |
| Federal minimum wage (pin only) | $5.15 (1997 to 2007) · $7.25 since 2009-07-24 | https://www.scrippsnews.com/life/money/despite-inflation-the-federal-minimum-wage-has-not-had-an-increase-in-15-years | 2026-10-07 | confirmed |
| Chipotle FY2025 revenue | $11,925,601K (+5.4%) | https://www.sec.gov/Archives/edgar/data/1058090/000105809026000007/cmg-20260203xex991.htm (Q4/FY2025 release, 2026-02-03) | 2026-10-07 | confirmed |
| Chipotle FY2025 cost lines | food/bev/packaging $3,527,043K · labor $2,991,680K · occupancy $624,898K · other operating $1,755,824K · G&A $652,017K · D&A $361,382K · pre-opening $49,507K | same | 2026-10-07 | confirmed; **now used as dollar lines** (HQ row $0.92 → $0.91) |
| Chipotle FY2025 operating income · interest & other income · income tax · net income | $1,935,798K · $73,721K · $473,758K · $1,535,761K | same; https://www.sec.gov/Archives/edgar/data/1058090/000105809026000009/cmg-20251231.htm (10-K) | 2026-10-07 | confirmed; **taxes row corrected** $0.33 → $0.34 (exact $0.3354), open subtraction now $1.63 − $0.34 |
| Chipotle restaurant-level / operating margin | 25.4% · 16.2% | https://ir.chipotle.com/2026-02-03-CHIPOTLE-ANNOUNCES-FOURTH-QUARTER-AND-FULL-YEAR-2025-RESULTS | 2026-10-07 | confirmed |
| Powerball prize chart and odds | 1 in 38.32 … 1 in 292,201,338; any prize 1 in 24.87 | https://www.lotteryusa.com/powerball/prizes-odds | 2026-10-07 | confirmed (and re-derived from C(69,5) × 26) |
| Powerball jackpot, Wed 2026-10-07 | $485M est.; $199.8M cash | https://www.kgw.com/article/news/nation-world/powerball-winning-numbers-oct-5-2026/507-9a01fc8b-0441-4f0c-bd7d-d614a4250379 | 2026-10-07 | confirmed (re-check on upload morning) |
| Powerball, Mon 2026-10-05 | $467M / $192.4M cash; no jackpot winner | https://www.wkyc.com/article/news/lottery/winning-powerball-numbers-467-million-jackpot-monday-october-5-results-ohio-lottery-winners/95-0b0d7131-48fb-45a9-b24c-a46ad1dca5a4 | 2026-10-07 | confirmed; same 0.412 cash/annuity ratio, which settles the first QA's flag |
| Federal top rate, 2026 | 37% (single > $640,600) | https://www.nysscpa.org/article-content/irs-adjusts-2026-tax-brackets-and-standard-deductions-for-inflation-102425 | 2026-10-07 | confirmed |
| Problem-gambling help line | **1-800-MY-RESET** (National Problem Gambling Helpline, adopted 2026-01-29) | https://www.ncpgambling.org/news/1-800-my-reset-announcement/ ; https://sbcamericas.com/2026/01/29/ncpg-unveils-new-1-800-my-reset/ | 2026-10-07 | **corrected** (1-800-GAMBLER: NCPG lost the right to use it after 2025-09-29) |
| Draw days | 2026-10-05 = Monday, 2026-10-07 = Wednesday | python3 `datetime` | 2026-10-07 | confirmed |
| Creator evidence table (views, outliers, lengths, watch-file claims) | e.g. Big Mac 29,408,278 views, 11.55x | `research/raw/web-creator-case-studies.md` (snapshot 2026-02-19), `research/02-top-10-approaches.md`, `research/watch/` | 2026-10-07 | not re-checked live (WebSearch doesn't return view counts); research snapshots, not on screen |

### Polish pass

2026-10-07, finishing producer. Files touched: this md, `teasers/09-itemized-tally-math.py`, `engine/specs/09-itemized-tally-{a,b,c}.json`, new renders `engine/out/09-itemized-tally-{a,b,c}.mp4` and stills `engine/out/stills/09-itemized-tally-*`. `engine/src` was not edited.

**Facts**
- 09A eggs, Aug 2026: $2.272 → **$2.279** (BLS). Knock-on: the eggs row $2.27 → $2.28, the 2026 bag $25.19 → **$25.20** (receipt TOTAL, caption, VO, working line 2), the pin's unrounded total $25.198 → $25.205, the jump $13.80 → $13.81, minutes 46.46 → 46.48, and minimum-wage minutes 208 → 209 (TikTok beat and pin). Every verdict holds: ×2.2, 78%, ≈ 46 min, ×1.1.
- 09B rebuilt from the exact 10-K dollar lines instead of rounded % shares: HQ + depreciation $0.92 → **$0.91**, taxes (net) $0.33 → **$0.34**, left after HQ $1.62 → **$1.63**, the open subtraction "$1.62 − $0.33" → "**$1.63 − $0.34**". The seven rounded amounts now add up to exactly $10.00, and the answer is still $1.29. VO, captions, pin and Sources updated.
- 09C help line: 1-800-GAMBLER → **1-800-MY-RESET** in the pin, description and Sources.
- Noted the September 2026 wage ($32.60, out 2026-10-02) and kept the month-matched August figure; settled the 09C cash/annuity flag (Monday's ratio is the same 0.412).
- Math check rewritten for the new numbers and the new spec structure; it passes.

**Specs (all three regenerated for the upgraded engine; `check` returns zero warnings)**
- Frame 0: the hook is at t 0 (drawn finished); every negative-t pre-roll is gone. The postmark moved into the flap at (175, 258, r 100). The postage stamps are gone (they only reached frame 0 through a negative t).
- One layout for the series: an `instant` receipt holds the list in frame 0 (09A the 2006 prices with TOTAL $11.39; 09B the five cost lines; 09C the prize chart), and a second receipt beside it prints the money column one row at a time with per-row `at` (09A 2026 prices with ×multipliers; 09B amounts; 09C worth). A highlighter swipe marks the row being read. The frame-0 thumbnail is now a full receipt beside an empty column instead of a header over blank kraft.
- Running totals: 09A uses receipt `running` TOTAL rows (the two totals end side by side); 09B and 09C use one `counter` with `steps` each ("left: $", "worth so far:"), readable from frame 0. These replace 14, 6 and 6 chained counters.
- Marks: text-anchored `target` annotations replace hand-measured ones (09A circle on "$22.78", double underline on "2.2", highlight on "coffee + beef", underline on "41 min"; 09B underline on the counter's amount, circle on the "?"; 09C underline on "0.63"). Receipt rows aren't anchorable, so twist rows use row `highlight`/`color`; 09C's two circles on 10¢ and 5¢ and the reading-pointer swipes are computed from the engine's receipt geometry, not hand-measured.
- Sizes: handwriting is 64 to 120 px (was 48 to 80), the hero cards 110 to 112 px, receipts 44 to 52 px type (the 34 px labels are gone), stickies 56 px. The content zone (600 to 1300) is filled on both screens: receipts and counter on screen 1; sticky, timer, envelope and working on screen 2.
- Stacked working lines (09A lines 1 and 2, 09B's subtraction, 09C lines 2 and 3) use `pen: "low"`, so the moving pen never covers the line above.
- `loop: true` on all three (0.35 s crossfade into frame 0). Captions keep ≤ 2 lines and ≤ 4 words/s; `say` added wherever the VO reads a number differently, and each spec's `vo` is now built from the same `say` text.
- 09A: added "double = $22.78" as the line the 2026 total has to beat (circled when beef pushes it past), plus the per-row multipliers; dropped the coffee/beef margin notes the multipliers now carry; moved "× 2.2" and "78% of it" 0.6 s earlier so they're readable for 1.4 s before the flip. Duration 41.5 → 41.6 s.
- 09B: the taxes row moved off the receipt into the handwritten line after the flip; flip at 20.7.
- 09C: the "↑ LESS THAN THE $4 PRIZE" row is gone (it would have printed in frame 0 on the instant chart); the VO, caption, circles and OPENED BY MISTAKE carry the twist. POSTAGE DUE moved off the wax seal to the top-left. Duration 39.5 → 39.6 s.

**Render review** (frames pulled from each MP4 at 0.0 s, partial payoff, reveal and duration − 0.2 s; audio via `volumedetect`)
- The engine was updated mid-pass (low pen, captions wrapped at 820 px, a lint for text cleared before it finishes writing). The final specs pass the new `check` with zero warnings, and the final MP4s were rendered after that update.
- Audio: 09A mean −26.6 dB / max −1.6 dB; 09B −26.9 / −2.3; 09C −26.8 / −1.8. All inside the target.
- Fixed after looking: frames 0 of 09B/09C were a receipt header over empty kraft (led to the two-receipt layout); the second card line was clipped by the envelope front at 120 to 130 px card size (now 110 to 112); POSTAGE DUE sat on the wax seal; the 09B underline anchored to the "$" of the counter prefix (now the amount); the 09A "78%" line was readable for only 0.8 s.
- Left as is: the last 0.35 s of each render is a deliberate double exposure (the loop crossfade); the stamp's 0.28 s slam briefly overlaps nearby text before it settles.

**Engine requests (not implemented; engine/src untouched)**
1. Receipt rule: the dash count assumes 0.62 × size per dash, but a Special Elite dash is 0.636 × size, so the dashed rule runs about 20 px past the receipt's right edge. In 09A to 09C the right-hand receipt hides the left one's overflow; the right one's still shows.
2. Let `target` anchor to receipt rows ({op, row} or match on a row's label/value), so circles on receipt values don't need computed coordinates.
3. The envelope's `label` and `note` scale with `w` (26 px label at w 680), too small for a phone; add `labelSize`/`noteSize`.
4. Give receipt `running` a `suffix` (for cents, "32¢").

### Final review

Independent final reviewer, 2026-10-07. I assumed the producer missed things. Files touched: this md, `engine/specs/09-itemized-tally-{a,b,c}.json`; re-rendered `engine/out/09-itemized-tally-{a,b,c}.mp4`, `engine/out/sheets/09-itemized-tally-{a,b,c}.png` and `engine/out/stills/09-itemized-tally-{a-0.0,a-16.6,a-31.2,a-41.2,b-0.0,b-12.5,b-23.4,b-30.7,c-0.0,c-15.8,c-29.7,c-39.2}.png` (the polish pass's stills were deleted, since they showed the old captions and labels). `teasers/09-itemized-tally-math.py` and `engine/src` were not edited.

**How it was checked**
- Contact sheets (`sheet --n 12`) before and after the fixes, safe-zone stills (`still --safe`) at the twist, totals and reveal beats, extra stills wherever a pen was moving, and four frames pulled from each MP4 (09A 0.0 / 16.6 / 31.2 / 41.2 s; 09B 0.0 / 12.5 / 23.4 / 30.7 s; 09C 0.0 / 15.8 / 29.7 / 39.2 s, so the end frame is just before the 0.35 s loop crossfade). All were viewed at 540 px wide, about phone size.
- `node src/cli.js check`: zero warnings on all three, before and after the fixes. One intermediate caption split wrapped to 3 lines and the linter caught it; the final split is 2 lines.
- `python3 teasers/09-itemized-tally-math.py`: all assertions pass. The md's copy of the script is identical to the file, and its printed output is unchanged (none of the fixes moved a number or a payoff time).
- Cross-checks: in each spec the caption `say` lines join to exactly the spec's `vo`. The md VO matches the spec VO word for word, except that 09B writes "2025" where the spec says "twenty twenty-five" and 09C has "about"/"About". Every number in the captions matches the receipts, counters, handwriting and the math check: 09A's six prices, $11.39, $25.20, ×2.2, 41 and 46 min; 09B's $2.96, $2.51, $0.52, $4.01, $1.47, $2.54, $0.91, $0.34 and $1.29 (and "seven bucks" = $7.04 left); 09C's 10, 7, 1, 5, 9, 32, 43 and 75¢, plus 1 in 38 / 913,000 / 292 million.
- MP4 timestamps were checked against `engine/src`: the polish pass's renders were newer than the engine, so they weren't stale. They were re-rendered anyway, because the specs changed. Audio (`volumedetect`): 09A mean −26.8 dB / max −2.1 dB; 09B −27.1 / −2.3; 09C −26.8 / −1.8.
- Facts spot-checked with WebSearch on 2026-10-07. Direct page loads of sec.gov, dol.gov, fred.stlouisfed.org, basketreport.com, usinflationcalculator.com and kgw.com were blocked by the egress proxy, so each value is confirmed from search results that quote the named page.
  - Powerball, Wed 2026-10-07: **$485M est., $199.8M cash**, after no jackpot winner on Mon 2026-10-05 (https://www.yahoo.com/news/us/articles/powerball-winning-numbers-oct-5-111407510.html). Context for the freshness rule: in early August 2026 the ratio was $372M cash on $856M (0.435), against 0.412 now, so the cash/annuity ratio does move and the morning-of-upload re-check stays mandatory.
  - Chipotle FY2025 (10-K, https://www.sec.gov/Archives/edgar/data/1058090/000105809026000009/cmg-20251231.htm; release of 2026-02-03): revenue **$11,925,601K**, food, beverage & packaging **$3,527,043K**, labor **$2,991,680K**, income from operations **$1,935,798K**, income before taxes **$2,009,519K** (= 1,935,798 + 73,721, so interest & other income is $73,721K), income tax **$473,758K**, net income **$1,535,761K**; op. margin 16.2%, revenue +5.4%. One search summary gave food etc. as $3,526,992K, but an exact-string search for that figure found nothing, while "3,527,043" returns the 10-K. Either way the food row is $2.9575 per $10 → $2.96, and no on-screen amount changes.
  - BLS average hourly earnings, private production & nonsupervisory, Aug 2026: **$32.53**, "rose by 11 cents, or 0.3%" (Employment Situation of 2026-09-04: https://thebiggamehunter.us/employment-situation-summary-september-4-2026/ ; https://www.ftportfolios.com/Commentary/EconomicResearch/2026/9/4/nonfarm-payrolls-increased-162,000-in-august ; BLS Real Earnings 2026-09-11).
  - BLS average prices, Aug 2026 (released 2026-09-11): eggs **$2.279** ("4.1% increase from the July price of $2.189", https://www.usinflationcalculator.com/inflation/egg-prices-adjusted-for-inflation/); coffee **$9.299** (July $9.317, https://www.usinflationcalculator.com/inflation/coffee-prices-by-year-and-adjust-for-inflation/); ground beef **$6.923** (July $6.885, Aug 2025 $6.318, https://themoneyoverview.com/25-ground-beef-averaged-6-92-a-pound-in-august-up-about-60-cents/); ground beef 2006 average **$2.22** (https://basketreport.com/prices/ground-beef/history/). All match the md.

**Found and fixed (all three)**
- **Captions orphaned words and split numbers from their units.** Measured with the engine's own caption font and 820 px wrap, 16 captions broke badly, e.g. "Three more small wins: 7 / cents.", "Now the jackpot: 1 in 292 / million." (it reads "1 in 292" at a glance), "$10 at Chipotle. How much is / profit?", "Six groceries cost $11.39 in / 2006." Each now carries an explicit line break at the phrase boundary ("Now the jackpot: / 1 in 292 million."). The words are unchanged, a `say` line holds the spoken text where there wasn't one, and every caption is still ≤ 2 lines and ≤ 4 words/s. Fixed: 09A at 0.1, 15.8, 24.2, 29.0 and 31.7 s; 09B at 0.1, 2.3, 11.0, 20.7 and 26.0 s; 09C at 7.6, 13.6, 19.6, 22.6, 35.4 and 37.5 s. Left as is: 09B's "Food, drinks and the bag: / $2.96." and "Ads, delivery, card fees: / $1.47.", where the number alone on line 2 is the payoff.
- **Envelope labels were unreadable on a phone.** The engine draws the `label` at 30 × w/780 px, so 26 px typewriter at w 680 ("2026 = ? MIN", "WHAT'S LEFT?", "WHOLE TICKET = ?"). That is under the 40 px typewriter floor, and the linter doesn't measure it. In 09A the OPENED BY MISTAKE stamp also landed half on "2026 = ? MIN". Each label is now `""`. The timers ("PAUSE & GUESS" / "DO THE MATH"), the captions and the open "≈" / "= ?" in the working already ask the question, and the bare wax-sealed envelope is the brand's signature look.
- **The pen hung into the caption band.** The bottom working lines (09A "2026: $25.20 ÷ $32.53 ≈" and its red "46 min" at y 1242; 09B "$1.63 − $0.34 = ?" at y 1205; 09C lines 2 and 3 at y 1186 and 1280) used the full-size low pen, whose tail reached about y 1400 and crossed the caption while it played. They now use `pen: "small-low"` and stay above the band.

**Found and fixed (per teaser)**
- **09A: two pens wrote at once.** The pencil "in minutes of work:" (29.6 s, 15 cps) was still writing until 30.87 s when line 1 started at 30.0 s. For about 1.2 s two pens were on screen, one pointing up across the sealed envelope. It now writes from 29.4 s at 30 cps (gone by 30.33 s). Line 1 starts at 30.35 s, and its "41 min" underline moves to 32.45 s. That still lands while the caption says "41 minutes" (31.7–33.7 s). The red "× 2.2" now writes at 16 cps instead of 12, so its pen has gone before "78% of it" starts (it overlapped by 0.12 s); "× 2.2" still lands at 25.8 s.
- **09B: two pens, an unreadable note and an off-brand hero.** The pencil "taxes, minus interest earned:" overlapped the subtraction's pen by 0.73 s and now writes at 30 cps (done 21.97 s, subtraction 22.5 s). The envelope note "guess first" was 47 px handwriting (the note scales to 54 × w/780 and can't reach the 56 px floor at any width). It was cut: the DO THE MATH timer and "Pause. What's left of your ten?" do that job. The hero card "$1.29" was the only hero card in blue ink among the three 09 teasers. It is now red like 09A and 09C ("answers get red pen").
- **09C:** only the shared fixes above. The hand-placed circles on 10¢ and 5¢ sit on the values in every frame I pulled, and the POSTAGE DUE stamp clears the postmark (about 45 px gap at full size).

**Checked and left as is**
- Frame 0 of all three has the dollar hook on tape plus a fully printed receipt: 09A "$11.39" and six prices with TOTAL $11.39; 09B "$10" and the five cost lines with "left: $10.00"; 09C "$2" and the prize chart with "worth so far: 0¢". The hook is at `t: 0`, no op has a negative `t`, the postmark is the series op in the flap (175, 258, r 100), the envelopes open on purpose (`openAt`), and `loop: true` is on all three.
- Apart from the postmark's small print (series branding), every text passes the linter's phone floors: receipts are 44–52 px typewriter and handwriting is 56–120 px. The hero cards are 110–112 px. Nothing readable sits in the top bar or under the right rail. The 09A right receipt's paper edge touches x 944 below y 820, but its text ends at about x 910.
- Pacing: a new number every 3.0–3.2 s on screen 1; the first payoff at 12–16%; pattern breaks at 26–43%; and the hero card in the last 1.75–1.95 s, readable for about 1.1 s before the crossfade. That is tight but enough for a 1–3-word card that confirms a sum the viewer has just been asked to do.
- Known minor limits: 09B's counter shows tween values (e.g. "$4.34") for a fraction of a second between steps. The stamp's slam briefly passes over nearby text before it settles (the polish pass noted this). The receipt-rule overflow (engine request 1 above) is still visible on the right receipt.
- No advice language, no logos or footage, and no impersonation. 09C stays expected-value only, with the help line in the pin and the description.

**Hook scores (1–10, against `research/02-top-10-approaches.md` §9: a famous price or a real artifact in frame 1, a yes/no or "what now?" question, line-by-line micro-bets with a running total, a pattern break at 35–40%, a held hero number, one open subtraction, a loop)**

| | Score | Why |
|---|---|---|
| 09A | **8** | It is the strongest stance question of the three ("Did they *actually* double?" — everyone already has an answer), and frame 0 carries six prices, a red total and an empty 2026 column, so the thumbnail is the open loop. It has both of vidIQ's Monarch fixes (running total, loop) and an answer that flips the viewer's assumption (×2.2 in dollars, ×1.1 in minutes). It loses points because it has neither a famous brand nor a found artifact: BLS averages are more honest but less concrete than Monarch's "I found a 20-year-old Walmart receipt", which the research's counter-evidence says teardowns need to scale. |
| 09B | **8.5** | It follows Tilbury's 29.4M formula with a famous brand and a price everyone pays, and five cost lines sit in frame 0 with blank amounts, so every row is a bet. "Seven bucks profit? Rip-off?" sets up a fake-out, and the crew twist plus POSTAGE DUE lands at 26–31%. It ends on an open subtraction like the Big Mac's comment engine, plus "Rip-off or not?". It isn't a 9 because "How much is profit?" asks for an estimate rather than a stance; the yes/no only arrives at the end. |
| 09C | **8** | A famous noun, a price and "really" (the myth-bust word), with the whole prize chart in frame 0 and an empty WORTH column that promises math. The "$50,000 is worth less than $4" twist is counterintuitive, true and checkable. It loses points because the live newsjack ($485M jackpot) isn't in frame 0: it's only in the title and description, and on screen from 26 s. Most viewers also already expect "less than $2", and the gambling topic caps ad reach. |

**Verdicts:** 09A **fixed**, 09B **fixed**, 09C **fixed**. All three are ready to post: zero lint warnings, all math assertions pass, the MP4s are re-rendered from the final specs, and the inputs are re-confirmed as of 2026-10-07. Re-check the Powerball cash value on the morning of upload (freshness rule), and re-check 09A against the September 2026 average prices due 2026-10-14 if it posts after that date.

*Superseded by this review:* the beat-sheet times 29.6 / 30.0 / 32.3 s (09A), the "guess first" note (09B) and the envelope labels listed in the Polish pass.

### Compliance audit (2026-10-07)

Last-line-of-defence pass (md edits only; specs untouched while the renders run, so the spec item below is **reported, not applied**).
- **Advice / promise language:** none. 09C is framed as expected value only, with the 1-800-MY-RESET helpline in the pin and the description, and no "how to win" or "buy". All three descriptions carry the disclaimer.
- **Claims:** BLS prices and pay, Chipotle's FY2025 10-K and the official Powerball chart are used. **09B (spec issue, "should"):** the receipt row "ADS, DELIVERY, FEES" and the VO "Ads, delivery, card fees: $1.47" label Chipotle's whole "other operating costs" line (14.7%). That line also includes utilities, restaurant tech and repairs, so the label overstates what the company spends on ads, delivery and card fees. Proposed: row "ADS, DELIVERY, ETC." and VO/caption "Ads, delivery, fees, upkeep: $1.47" (lint-checked on a scratch copy; the math check's label list must follow). The pinned comment now spells out what the line contains.
- **Non-negotiables:** pass (first payoff at 12–16%, pattern break at 35–43%, sealed hero card in the last 2 s, loop). Mechanic: receipt + running total + adjustment line, approach 9.
- **Fixed in this md:** the three Reels "Send (this) to…" caption lines are now "For the…" dedications.
- **Freshness:** 09C's jackpot cash value must be re-checked on the morning of upload; a stale "$199.8M (Oct 7 est.)" would be a false on-screen figure.
