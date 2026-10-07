## 1. Cost in Envelopes (the Unit Swap)

**Series:** *Cost in Envelopes* · **Lanes:** Flash (01C, 14.0 s) and Envelope (01A 26.0 s, 01B 27.8 s) · **Lead devices:** postage stamp (the unit), ballpoint working, counter, grid / envelope stack, sealed answer, verdict stamp
**Teasers:** 01A Elon's $1 trillion in Costco hot dogs: how many do you get? · 01B The $40 trillion US debt in $10K envelopes: how tall is it? · 01C $1,000,000 in pennies vs. Lady Liberty: who's heavier?
**Specs:** `engine/specs/01-cost-in-envelopes-{a,b,c}.json` · **Renders:** `engine/out/01-cost-in-envelopes-{a,b,c}.mp4` · **Math check:** `teasers/01-cost-in-envelopes-mathcheck.py`
**Inputs:** gathered by the writer with WebSearch on 2026-10-07, then re-verified live in the polish pass the same day (see **Final fact check** at the end). Two inputs changed: the US Mint's penny unit cost is now the FY2025 figure (3.02¢, was FY2024's 3.69¢), and the Statue of Liberty is now the current NPS estimate (560,000 lb = 280 tons, was 450,000 lb = 225 tons). The second change flips 01C's answer from "the pennies win" to "a photo finish: she wins by a hair".

---

### Why it goes viral

**The mechanism.** Nobody can feel the gap between a million, a billion and a trillion (magnitude neglect). A unit swap restates an unreadable number as a count of one cheap, familiar thing, so the size suddenly becomes something you can picture. Three things carry it:

1. **The unit is the hook.** "Cost in Units of ___" is a fill-in-the-blank title, so every episode is a fresh test of a new unit. The unit choice decides almost everything: the same creator's episodes range from 75,736 views (Single Family Homes) to 30.6M (RTX 5090). Topical, youth-coded or iconic units (RTX 5090 during the 2026 GPU price spike, iPhone 17 Pro in launch week, lattes, Red Bull) produce an instant "wait, HOW many?" and a reason to send it.
2. **It needs no language.** The originals are text, music and a counter (the lattes Short returned "No transcript available"), so they can be seeded to audiences in any country.
3. **It loops and finishes.** At 11 to 40 s it's easy to finish. Ending on the full pile and cutting back to one unit reads as "again", and replays count as views on YouTube (since 2025-03-31) and Instagram.

The research's first principle backs this: raw mega-numbers flop and converted ones break out (report 01, §3.1). Fahad Riaz's unconverted "How much is a billion dollars?" scored 3.6x on a 1.52M-sub channel (974,007 views, https://www.youtube.com/shorts/GBf_DfU_dJQ).

**The evidence** (all from `research/02-top-10-approaches.md` §1 and `research/raw/yt-personal-money-math.md` §1a):

| Creator (size) | Title | Views | Outlier | Length | URL |
|---|---|---|---|---|---|
| HD Guy (188K) | Cost in Units of RTX 5090 | 30,575,734 | 62.5x | 26 s | https://www.youtube.com/shorts/E2oVrAwHDOw |
| InFocus (3.49K) | Cost in Units of iPhone 17 Pro | 14,909,673 | n/a (≈4,272 views/sub) | 11 s | https://www.youtube.com/shorts/MiwPs13cYkk |
| HD Guy | Cost in Units of Starbucks Lattes | 9,858,055 | 106.2x | 40 s | https://www.youtube.com/shorts/NHbMe2F_JXY |
| HD Guy | Cost in Units of Monster Energy | 4,333,679 | 28.9x | 29 s | https://www.youtube.com/shorts/jlKUWdrrqEI |
| The Bravest On Duty (3.36K) | Cost in Gigabytes of DDR5 RAM | 2,587,866 | 51.5x | 26 s | https://www.youtube.com/shorts/Bje9Muj0P00 |
| FVIDEOS PRODUCTION (3.85K) | What 1 million euros looks like (**watched**) | 1,825,837 | **890.12x** | 25 s | https://www.youtube.com/shorts/GntsUz5JwiM |
| Cost of War (841) | Cost in Units of Red Bull | 1,763,358 | 66.8x | 19 s | https://www.youtube.com/shorts/_dSLFJhgWNg |
| @g1djuan (TikTok, 14.0K) | $100k in cash (what $100,000 looks like) | 1.7M | 187.2x | 22 s | https://www.tiktok.com/@g1djuan/video/7662090649352670494 |
| ZdakMemes (2.3K) | ELON MUSK IS 72X RICHER THAN IRON MAN 💀 | 1,184,552 | 34.76x | 6 s | https://www.youtube.com/shorts/z-j-OUhom78 |
| Humphrey Yang (TikTok, 2020) | Bezos's net worth in rice (1 grain = $100K, ≈58 lb) | ~2.2M combined (press) | n/a | 2 × 60 s | https://www.tiktok.com/@humphreytalks/video/6796564670481190150 |

**What the evidence says about a new channel.** HD Guy posted 9 "Cost in Units" episodes between 2026-07-26 and 2026-09-18, and channels under 5K subs copied the format within weeks and still reached 1.76M to 14.9M views. That is the strongest sign in the corpus that a zero-subscriber channel can break out with this mechanic.

**Counter-evidence.** Weak units flop: Cost of War's Robux (44,977) and V-Bucks (50,887), and HD Guy's Single Family Homes (75,736). Template saturation is real: three copycats appeared within weeks, and YouTube's Oct 1 2026 Shorts update names "template-based bulk changes" as unoriginal. Both risks shape the upgrade below.

---

### How the originals do it

**1. FVIDEOS PRODUCTION, "What 1 million euros looks like"** (1,825,837 views, 890.12x, 25 s, watched scene by scene: `research/watch/group3-video4.md`)
- **What it nails.**
  - A running counter badge synced to a physical action: one +€50,000 stack drops about every 1.2 s, about 8 drops per 10 s, and each drop works like a cut.
  - ASMR thuds on the beat.
  - Zero words, so it travels globally.
  - The payoff lands on the 20th stack at 0:24 (1.000.000 €).
  - The loop is the strongest in the set: a full pile cuts back to one clean stack.
- **What it misses.**
  - **No "so what":** €1M is never compared to anything.
  - **One denomination only:** vidIQ's own "do better" list says compare €50 vs €100 vs €500.
  - **No scale object** (a person, a car, a building).
  - **Prop €500 notes** (no longer issued by the ECB) start "is it fake?" fights that the creator can't win.

**2. HD Guy, "Cost in Units of Starbucks Lattes" / "RTX 5090"** (9,858,055 at 106.2x; 30,575,734 at 62.5x; inferred from metadata, no VO transcript)
- **What it nails.**
  - The unit *is* the title, and it's the most topical or iconic cheap thing of the week (RTX 5090 during the GPU price spike).
  - A fill-in-the-blank series template ("Cost in Units of ___") that turns every episode into a new A/B test.
  - Short runtimes (26 to 40 s).
- **What it misses.**
  - **No working:** viewers see a count but never the division, the unit price, or its date.
  - **A template anyone can clone in a week**, which copycats did, and a template YouTube now penalises.
  - **Hit-or-miss reach:** episodes swing from 75K to 30.6M depending only on the unit. Nothing in the format itself carries a weak week.

**3. Humphrey Yang, Bezos's net worth in rice** (TikTok 2020; ~2.2M combined views per Business Today, https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html)
- **What it nails.**
  - The archetype: 1 grain = $100,000, so 10,000 grains = $1B and Bezos ≈ 58 lb of rice.
  - The physical pile *is* the proof, and the effort became part of the hook ("This took me hours don't let it flop").
- **What it misses.**
  - Two 60-second parts and hours of hand-counting: not repeatable weekly.
  - No sealed guess, so the viewer never commits to an answer before the reveal.

---

### The Envelope Math upgrade

**What we replicate**
- **The unit as the hook, named in frame 1:** a famous, cheap, topical unit with the big number on masking tape.
- **A running counter or growing pile synced to an action:** `counter` ticks with foley, `stack` bricks drop, the `grid` fills.
- **Escalation to an extreme:** 01B climbs $1M → $1B → $40T.
- **A physical scale shot:** a person, a building, the planet.
- **A hard loop:** the last line flows back into the first frame.
- **Numbers-first readability:** the counts carry the story with the sound off, and captions are burned in.

**What we improve**
1. **Show the division.** Each count is worked in ≤3 ink lines on the envelope ("$1,000,000,000,000 ÷ $1.50"). The originals hide this, and it's our whole thesis.
2. **Source and date the unit.** The unit price sits on the stamp, and the assumptions go on an ASSUME sticky with source and date. The exact figures go in the pinned comment ("envelope said ≈ X, within Y%").
3. **Add the one "so what" line the originals never give:** 81 hot dogs *for every person on Earth*; a stack that *wraps the equator*; pennies that *weigh about as much as the Statue of Liberty*.
4. **Make the scale physically honest:**
   - bill thickness 0.0043 in (BEP);
   - penny 2.500 g (US Mint);
   - the $1M and $1B stacks are drawn to scale against a 1.7 m person and the 828 m Burj Khalifa.
5. **Make the viewer commit before the reveal.** The final count is sealed in the envelope with a 2 to 3 s PAUSE & GUESS timer, the most consistent tiny-channel breakout mechanic in the research (report 01, §3.6).

**The uniquely-ours twist: "The Unit Stamp."** Every episode issues its unit as a perforated **postage stamp** printed with the unit's sourced price: 🌭 **$1.50 COSTCO COMBO**, 💵 **$10K 1 ENVELOPE**, 🪙 **1¢ 2.5 g EACH**. The stamp is the episode's collectible identity, the count is sealed in the envelope, and the verdict stamp (SPECIAL DELIVERY / POSTAGE DUE / RETURN TO SENDER) cancels it. Comments then request the next stamp ("do it in Taco Bell Baja Blasts"), which feeds the series. That gives it a request-driven, collectible structure no copycat template has.

Each episode also leaves one **save-worthy envelope rule**:
- ÷ 1.5 is × ⅔.
- In $100 bills, a million is about a meter and a billion is about a kilometer.
- $1 of pennies weighs 250 g, so $1 million of them weighs about one Statue of Liberty.

**Anti-template guardrail.** The mechanic stays fixed but the payoff shape rotates: count → **split** (01A), count → **height** (01B), count → **weight** (01C). Never run the same unit twice in a row.

**Series name:** **Cost in Envelopes**. The postmark carries the episode number (No. 01A, 01B, 01C).
**Title template:** `[Big price or fortune] in [unit]: [question]? (Cost in Envelopes No. ___)`, e.g. "Elon's $1 trillion in Costco hot dogs: how many do you get? (Cost in Envelopes No. 01A)". The title, the tape on frame 1 and the first spoken line say the same thing (report 01, §3.3).
**Hook template (tape: two or three number/unit strips, then a question strip):** `[WHO]'S *$[N]* / IN [UNIT]. / [QUESTION]?` or `*$[N]* [THING] / IN [UNIT]. / [QUESTION]?`. The red word is always the number. The last strip is the question the sealed envelope answers ("HOW MANY DO YOU GET?", "HOW TALL IS IT?", "WHO'S HEAVIER?"), so the viewer commits to a guess from frame 1 (report 01, §3.6). The question is its own, slightly smaller strip (a second `hook` op) so the number and unit can run at 80–86 px. Every strip is a `hook` at `t: 0`, which the engine renders finished, so frame 0 is the thumbnail.

**Envelope devices used (format bible §3):**

| Device | Engine op | 01A | 01B | 01C |
|---|---|---|---|---|
| Masking-tape hook | `hook` | ✓ | ✓ | ✓ |
| Postage stamp = the unit | `postage` | 🌭 $1.50 | 💵 $10K | 🪙 1¢ + 🗽 280 tons |
| ASSUME sticky | `sticky` | ✓ | ✓ | ✓ |
| Ballpoint working (≤3 lines) | `write` | ✓ | ✓ | ✓ |
| Running count | `counter` | 0 → 666,666,666,667 | n/a | n/a |
| Napkin chart / scale | `grid`, `stack`, `annotate` | 9×9 tray | manila-envelope stacks (`skin: envelope`) + Burj + globe ring | ⚖️ |
| Red pen | `annotate` (text-anchored `target` where it marks text) | circle on the counter | ring on the globe | underline on 100,000,000; double underline on $3.02M |
| Sealed Answer + guess timer | `envelope`, `timer` | ✓ (3 s) | ✓ (3 s) | ✓ (2 s) |
| Verdict stamp | `stamp` | SPECIAL DELIVERY | POSTAGE DUE | RETURN TO SENDER |
| Postmark No. | `postmark` | 01A | 01B | 01C |
| Flip | `flip` | ✓ | ✓ | ✓ |

---

### Teasers

#### 01A: Elon's $1 trillion in Costco hot dogs: how many do you get?

- **Working title:** Elon's $1 trillion in Costco hot dogs: how many do you get? (Cost in Envelopes No. 01A)
- **Money topic:** billionaire wealth (Musk back at ≈ $1 trillion this week)
- **Unit stamp:** 🌭 $1.50 COSTCO COMBO
- **Lane / runtime:** Envelope, **26.0 s** (bible §5: 25 to 45 s). This is the YouTube master, under 30 s per the length research. Every caption runs at ≤ 4 words/s and every screen holds one idea.
- **Spec:** `engine/specs/01-cost-in-envelopes-a.json` · **Render:** `engine/out/01-cost-in-envelopes-a.mp4`

**Frame-1 hook**
- On screen, finished, in frame 0 (three tape strips): **ELON'S *$1 TRILLION* / IN COSTCO HOT DOGS.** at 80 px, then the question strip **HOW MANY DO YOU GET?** at 70 px. Below them, filling the content zone: a 330 px bobbing 🌭 and a large $1.50 COSTCO COMBO stamp (label at 40 px).
- First spoken line (0.1 to 3.3 s): *"Elon's trillion dollars, in Costco hot dogs. How many do you get?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.3 | Hook (frame 0 = thumbnail) | Tape hook (number + unit) and question strip; 🌭 bobs; $1.50 COSTCO COMBO stamp |
| 3.3–6.8 | Flip, set-up | Large ASSUME sticky (66 px, written in 1.2 s, then held 2 s): "Elon ≈ $1 trillion (Bloomberg, Oct 5 2026). Costco combo $1.50 since 1985." |
| 6.8–10.9 | Flip, line 1 + **partial payoff (39%)** | "$1,000,000,000,000" over "÷ $1.50" (96 px column); red tip "÷ 1.5 = × ⅔"; red counter (124 px) runs 0 → **666,666,666,667** over "hot dogs 🌭" (written as the count starts) and pops at 10.2 s; red circle anchored to the counter |
| 10.9–13.7 | Flip, pattern break (line 3) | "666,666,666,667 🌭" in red; 🌍; "÷ 8.2 billion people" (88 px) |
| 13.7–18.2 | Seal + guess | "Each person gets…"; sealed envelope "how many each?"; 3-s PAUSE & GUESS (14.9–17.9) |
| 18.2–21.3 | **Reveal (70%)** | Envelope opens at 18.2 s; card **"≈ 81 each"** (124 px) / "hot dogs per person" fully out at 19.25 s and held 2 s. The VO says "Eighty-one" at 18.8 s, with the card's ding, not before it |
| 21.3–24.0 | Flip, scale shot | A 9×9 tray of 🌭 fills (21.6–23.2 s): "your share: 81" (76 px) |
| 24.0–26.0 | **Verdict + loop (last 2.0 s)** | SPECIAL DELIVERY slams above the tray; `loop: true` crossfades the last 0.35 s into frame 0 |

**Voice-over** (the captions are exactly these lines, split into 15 caption cards of ≤ 2 lines at ≤ 4 words/s; the "667 billion" card carries `say: "about six hundred sixty-seven billion hot dogs."`)

> Elon's trillion dollars, in Costco hot dogs. How many do you get? *(0.1)*
> He's worth about a trillion. A combo's a buck fifty. *(3.4)*
> A trillion over a buck fifty: about 667 billion hot dogs. *(6.9)*
> Still can't picture it? Split them with everyone on Earth. *(10.9)*
> How many does each person get? Guess before it opens. *(13.8)*
> Eighty-one. Each. Every human alive. *(18.8)*
> That's your tray. And your mom's. And everyone's. *(21.4)*
> All from one man's net worth. *(23.8, loops to the first line)*

**The envelope math (3 lines)**

1. `$1,000,000,000,000` over `÷ $1.50`, written as a column (tip: ÷ 1.5 = × ⅔)
2. `= 666,666,666,667 hot dogs` (the red counter; exact 666,666,666,666.67; said "about 667 billion")
3. `÷ 8.2 billion people` with a 🌍 (sealed card "≈ 81 each"; exact 81.30)

**ASSUME sticky (on screen):** "Elon ≈ $1 trillion (Bloomberg, Oct 5 2026). Costco combo $1.50 since 1985."

**Sources (re-verified live on 2026-10-07; full table under Final fact check)**
- **Musk ≈ $1 trillion.**
  - Bloomberg Billionaires Index: **$1.04T** after a $65B jump on Monday 2026-10-05 (SpaceX +7.6%, Tesla +2.2%). Reported by Billionaires.Africa, 2026-10-06: https://www.billionaires.africa/2026/10/06/elon-musk-becomes-a-trillionaire-again-as-spacex-shares-hit-highest-since-june/ and Benzinga, Oct 2026: https://www.benzinga.com/trading-ideas/movers/26/10/62179650/elon-musk-is-a-trillionaire-again-thanks-to-spacex-stock
  - Forbes put him at **about $1 trillion** on the morning of 2026-10-05 (Yahoo Finance, "Elon Musk Hits Trillionaire Status for the 2nd Time…"): https://finance.yahoo.com/markets/stocks/articles/elon-musk-hits-trillionaire-status-171431066.html. Forbes, 2026-10-02, "…Pushing Net Worth Back Towards $1 Trillion": https://www.forbes.com/sites/fionariley/2026/10/02/elon-musk-gains-61-billion-in-a-day-as-spacex-and-tesla-shares-rise-pushing-net-worth-back-towards-1-trillion/
  - **Correction:** the earlier draft said "Forbes $936B on 2026-10-06". The $936B is Forbes' figure **as of 2026-10-01** (Forbes Australia, "The top 10 richest people in the world (October 2026)": https://www.forbes.com.au/news/billionaires/top-10-richest-people-in-world/).
  - First trillionaire on 2026-06-12 after the SpaceX IPO: Times of Israel, 2026-06-12: https://www.timesofisrael.com/liveblog_entry/elon-musk-worlds-first-trillionaire-after-spacex-debut/
  - The envelope uses the round **$1T** on purpose; the range goes in the pinned comment.
- **Costco hot dog + soda = $1.50, unchanged since 1985.**
  - Gray TV/KFVS12, 2026-04-29 (water option added, price unchanged): https://www.kfvs12.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/
  - Fortune, 2026-03-21 (CEO confirms $1.50): https://fortune.com/2026/03/21/costco-hot-dog-price-1-50-ceo-confirms
- **World population 8.2 billion (July 2026).** US Census Bureau, World Population Day 2026 (International Database projection): https://www.census.gov/newsroom/stories/world-population-day.html. The UN's projection for 2026-07-01 is higher (≈ 8.30 billion); at that figure it's 80.3 each, so the envelope's "≈ 81" is within 0.9%. Pinned comment only.

**Ending**
- **Loop line:** "All from one man's net worth." This flows straight back into "Elon's trillion dollars, in Costco hot dogs." The spec sets `loop: true`, so the last 0.35 s crossfades into frame 1.
- **Comment bait (a real question):** "What should we count his trillion in next? Best unit gets its own stamp."
- **Pinned comment:**
  > Exact: $1,000,000,000,000 ÷ $1.50 = 666,666,666,667 hot dogs ÷ 8.2 billion people = 81.3 each (envelope said ≈ 81, within 0.4%). His number moves daily: at Bloomberg's $1.04T (Oct 5, 2026) it's 84.6 each; at Forbes' $936B (Oct 1, 2026) it's 76.1 each. With the UN's 8.3B people instead of the Census Bureau's 8.2B, it's 80.3 each. Assumptions: net worth ≈ $1T (on paper, not cash); combo $1.50 (Costco, same price since 1985); world population 8.2B (US Census Bureau, July 2026). Envelope rule: dividing by 1.5 is the same as taking two-thirds. What should we count his trillion in next?

**Description:**
> Elon's back at about $1 trillion. Here's that fortune counted in $1.50 Costco hot dog combos, then split with all 8.2 billion people on Earth. How many do you get? Rough math, real money: $1T ÷ $1.50 ≈ 667 billion hot dogs ≈ 81 each. Exact figures are in the pinned comment.
> Sources (checked Oct 7, 2026): net worth, Bloomberg Billionaires Index $1.04T (Oct 5, 2026) and Forbes about $1T (Oct 5, 2026); Costco combo $1.50 since 1985 (Gray TV, Apr 29, 2026; Fortune, Mar 21, 2026); world population 8.2B (US Census Bureau, July 2026).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #Costco #ElonMusk #MoneyMath

**Platform notes**
- **YouTube Shorts:** post the 26.0 s master as is. The title equals the tape hook plus the series tag; pin the exact-figures comment.
  - Musk's net worth swings by tens of billions a day, so post within 48 h of the last check and re-check the morning you post. If neither Bloomberg nor Forbes is within 5% of $1T (i.e. both are outside $950B to $1.05T), retitle with the current figure and re-run the math check (it's one variable).
- **Instagram Reels:** same cut, max 5 hashtags. Sends are the top non-follower signal, so the "your mom's" line is the taggable beat. Use a Trial Reel first, and keep the comment ask a real question (no "comment YES").
- **TikTok:** a 60 s+ cut earns Creator Rewards and more reach (Buffer: +43.2%). Extend by voicing the Bloomberg-vs-Forbes range on screen (84.6 each at $1.04T vs 76.1 each at $936B) and answering the best unit request from the comments in a follow-up.

**Why this one should travel**
- **The live search is the hook.** "Elon becomes trillionaire" was a live search that carried a 1.3K-follower account to 2.4M at 1,005.7x (`research/watch/group1-video4.md`). Elon is the subject of 7 of the 33 big-number outliers.
- **A cheap food unit works.** Lattes (9.86M), Big Macs (1.75M) and Red Bull (1.76M) all broke out, and Costco's $1.50 combo is one of the most famous fixed prices in America, back in the news this year.
- **The question puts the viewer in the sum.** "How many do you get?" on frame 1 makes the viewer commit (report 01, §3.6), and "your share: 81" pays it off personally and sendably.
- **The ratio-meme crowd has a precedent:** ZdakMemes' "72x richer than Iron Man" got 1.18M in 6 s.

---

#### 01B: The $40 trillion US debt in $10K envelopes: how tall is it?

- **Working title:** The $40 trillion US debt in $10K envelopes: how tall is it? (Cost in Envelopes No. 01B)
- **Money topic:** government debt (the US crossed $40T on 2026-08-18)
- **Unit stamp:** 💵 $10K 1 ENVELOPE (100 × $100). This is the format's namesake unit.
- **Lane / runtime:** Envelope, **27.8 s**. It uses the approach doc's "How tall is $[N] in $10K envelopes?" formula as the hook question.
- **Spec:** `engine/specs/01-cost-in-envelopes-b.json` · **Render:** `engine/out/01-cost-in-envelopes-b.mp4`

**Frame-1 hook**
- On screen, finished, in frame 0 (four tape strips): ***$40 TRILLION* / OF US DEBT / IN $10K ENVELOPES.** at 86 px, then **HOW TALL IS IT?** at 72 px, with a 270 px bobbing ✉️ and a large $10K "1 ENVELOPE" stamp.
- First spoken line (0.1 to 3.3 s): *"Forty trillion in US debt, in ten-grand envelopes. How tall is it?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.3 | Hook (frame 0 = thumbnail) | Tape hook (number + unit) and question strip; ✉️ bobs; $10K "1 ENVELOPE" stamp |
| 3.3–7.0 | Flip, set-up + line 1 (the unit) | Large ASSUME sticky (64 px); "100 × $100 = $10K ≈ 1.1 cm" (76 px) |
| 7.0–10.4 | Flip, **partial payoff 1 (32%)** | "$1 million = 100 envelopes"; a stack of manila $10K envelopes (`skin: envelope`) grows beside a 🧍 "you" (1.7 m) to a red dimension "≈ 1.1 m" (lands at 8.8 s); VO "Just over a meter." |
| 10.4–14.7 | Flip, **partial payoff 2 + pattern break** | "$1 billion = 100,000 envelopes"; the envelope stack reaches "≈ 1.1 km"; pencil outline labelled "Burj Khalifa / 828 m" to scale, and shorter |
| 14.7–19.4 | Seal + guess | Line 2 as a column, "$40T ÷ $10K / = 4 billion envelopes" (84 px); sealed envelope "how tall?"; 3-s PAUSE & GUESS (16.2–19.2) |
| 19.4–22.4 | **Reveal (70%)** | Card **"≈ 44,000 km"** (112 px) / "4 billion × 1.1 cm" (line 3), fully out at 20.45 s; the VO says it at 20.1 s, as the card clears the envelope |
| 22.4–25.8 | Flip, scale shot | 🌍 with a red ring around the equator; "equator: 40,075 km"; red "≈ 1.1 laps of the equator" |
| 25.8–27.8 | **Verdict + re-hook (last 2.0 s)** | POSTAGE DUE slams; "now in $1 bills…?"; `loop: true` crossfades into frame 0 |

**Voice-over** (the captions are exactly these lines, split into 14 caption cards of ≤ 2 lines at ≤ 4 words/s; the "1.1 centimeters" card carries `say: "About one point one centimeters thick."`)

> Forty trillion in US debt, in ten-grand envelopes. How tall is it? *(0.1)*
> A hundred hundreds each. About 1.1 centimeters thick. *(3.4)*
> A million? A hundred envelopes. Just over a meter. *(7.2)*
> A billion? A hundred thousand envelopes. *(10.6)*
> Taller than the Burj Khalifa. *(12.7)*
> Forty trillion? Four billion envelopes. *(14.8)*
> How tall is that stack? Guess before it opens. *(16.8)*
> About forty-four thousand kilometers. *(20.1)*
> Longer than the equator. It wraps the whole planet. *(22.6)*
> Now in one-dollar bills: where does it reach? *(25.7, re-hook)*

**The envelope math (3 lines)**

1. `100 × $100 = $10K ≈ 1.1 cm` (exact 100 × 0.0043 in = 0.43 in = 1.0922 cm)
2. `$40T ÷ $10K` over `= 4 billion envelopes` (4,000,000,000)
3. `4 billion × 1.1 cm ≈ 44,000 km` (sealed card; exact 43,688 km)

The rungs come from line 1 and are drawn to scale:
- $1M = 100 envelopes = 1.09 m, drawn beside a 1.7 m person.
- $1B = 100,000 envelopes = 1,092 m, against the Burj Khalifa at 828 m.

The scale shot only uses numbers already on screen: 44,000 ÷ 40,075 = 1.098 ≈ **1.1 laps**. The exact 43,688 km is 1.090 laps, which also rounds to 1.1, so the envelope and the exact figure agree.

**ASSUME sticky (on screen):** "Debt ≈ $40 trillion (US Treasury, Aug 2026). 1 bill = 0.0043 in thick (BEP)."

**Sources (re-verified live on 2026-10-07; full table under Final fact check)**
- **US debt crossed $40 trillion in August 2026: $40.05T at the close of business on Tuesday 2026-08-18, in Treasury data released 2026-08-19.**
  - PBS NewsHour, Aug 2026: https://pbs.org/newshour/economy/the-u-s-national-debt-now-stands-at-40-trillion
  - Fox 35 Orlando, Aug 2026: https://www.fox35orlando.com/news/us-national-debt-surpasses-record-40-trillion
  - NPR (via WFAE), 2026-08-20: https://www.wfae.org/2026-08-20/u-s-debt-tops-40-trillion
  - Latest: Treasury Debt to the Penny showed **$40,249,104,431,078 on 2026-10-05** (FiscalData dataset as reported by IndexBox: https://www.indexbox.io/blog/us-public-debt-outstanding-reaches-40249104431078-dollars-on-october-5-2026/). The envelope's "$40T" is within 0.62% of it, and the "≈ 44,000 km" card holds while the debt stays under $40.455T. **Re-pull it on publish day:** https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/
- **Bill thickness 0.0043 in, weight ≈ 1 g.** Bureau of Engraving and Printing, Currency FAQs: https://www.bep.gov/currency/faqs. The BEP quote is corroborated by The Physics Factbook: https://hypertextbook.com/facts/1999/DeneneWilliams.shtml
- **Burj Khalifa 828 m**, still the world's tallest building. CTBUH Skyscraper Center: https://www.skyscrapercenter.com/building/wd/3
- **Earth's equatorial radius 6,378.137 km**, so the circumference is 40,075 km. NASA Earth Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
- **Pinned comment only:**
  - geostationary orbit 35,786 km, AMS Glossary: https://glossary.ametsoc.org/wiki/Geostationary_satellite
  - average Moon distance 384,400 km, NASA Space Place: https://spaceplace.nasa.gov/moon-distance/en/

**Ending**
- **Re-hook (second question):** "Now in one-dollar bills: where does it reach?" Then it crossfades back to frame 1 (`loop: true`).
- **Comment bait:** "Guess where the $1-bill stack reaches before you open the pinned comment."
- **Pinned comment:**
  > Exact: $40T ÷ $10K = 4,000,000,000 envelopes × 1.0922 cm (100 bills × 0.0043 in) = 43,688 km (envelope said ≈ 44,000, within 0.7%). Earth's equator is 40,075 km, so that's 1.09 laps (envelope said ≈ 1.1), or 3,613 km to spare, and stood up it passes the geostationary satellites (35,786 km). At the latest Debt to the Penny (~$40.25T, Oct 5, 2026) it's ~43,960 km. Cash only; envelope paper ignored. In $1 bills: 4,368,800 km ≈ 11.4 times the Earth–Moon distance. Envelope rule: in $100 bills, $1 million is about a meter and $1 billion is about a kilometer.

**Description:**
> The US national debt passed $40 trillion in August. How tall is it in $10,000 envelopes (100 hundred-dollar bills, about 1.1 cm each)? A million is just over a meter, a billion beats the Burj Khalifa, and $40 trillion ≈ 44,000 km: about 1.1 laps of the equator. Exact figures are in the pinned comment.
> Sources (checked Oct 7, 2026): debt, US Treasury via PBS NewsHour ($40T crossed Aug 18, 2026) and Treasury Debt to the Penny ($40.25T on Oct 5, 2026); note thickness 0.0043 in (Bureau of Engraving and Printing); Burj Khalifa 828 m (CTBUH); Earth's equatorial radius 6,378.137 km (NASA).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #NationalDebt #MoneyMath

**Platform notes**
- **YouTube Shorts:** the 27.8 s master is the YouTube cut. Pin the exact comment.
  - The debt rises daily, so re-pull Debt to the Penny on publish day. The envelope's "≈ 44,000 km" holds while the debt is under $40.45T (4.045 billion envelopes × 1.1 cm = 44,500 km). Above that, update line 2, line 3 and the card from the math check (one variable). "≈ 1.1 laps" holds until about $41.9T.
- **Instagram Reels:** same cut; open with a Trial Reel. "For whoever says 'just print more'." is the caption's send line (a dedication, not a "send this" or "tag a friend" ask, both of which Meta demotes as engagement bait), used as caption copy rather than in the VO.
- **TikTok:** a ~65 s cut adds the answer rung on screen. A fourth stack in $1 bills that runs off the top of the frame is still an engine request; until then, a hand-drawn "→ 🌕 × 11" arrow works. Add a fifth "how far is it to the satellites" rung (35,786 km) before the equator wrap.

**Why this one should travel**
- **It fixes a proven failure.** Raw debt posts scored 1.35x ("The national debt is hard to comprehend") and 3 to 11x for "debt surpasses $38T" news (report 01, §3.1). Converted to a physical scale and asked as a question, it lands where the corpus says conversions win.
- **Scale shorts are scarce.** "Polished scale visualization is scarce on Shorts" is one of the five whitespace gaps (report 01, §6 gap 4).
- **It matches two breakouts:** FVIDEOS' counter-plus-physical-stack (890x) and Story Snap's Earth-lap distance conversion (9.4M at 150.55x).
- **The $40T milestone is a search-led news number from August 2026.** The ending is a real second question that pulls people into the pinned comment.

---

#### 01C: $1,000,000 in pennies vs. Lady Liberty: who's heavier?

- **Working title:** $1,000,000 in pennies vs. Lady Liberty: who's heavier? (Cost in Envelopes No. 01C)
- **Money topic:** cash and coins: the dead penny (US penny production ended 2025-11-12) and the "what $1 million looks like" curiosity
- **Unit stamp:** 🪙 1¢ 2.5 g EACH, versus a 🗽 280 tons LADY LIBERTY stamp
- **Lane / runtime:** Flash, **14.0 s**, hard loop. This is the series' Flash-lane test: three of the top six big-number Shorts run 14 s or shorter (report 01, §3.4).
- **Spec:** `engine/specs/01-cost-in-envelopes-c.json` · **Render:** `engine/out/01-cost-in-envelopes-c.mp4`
- **What changed in the polish pass:** the live re-check found that the National Park Service's current figure for the statue is **560,000 lb (280 US tons)**, not the 450,000 lb (225 tons) of its 1954 handbook. A million in pennies is 275.6 tons, so the honest answer is no longer "the pennies win". It is **a photo finish that she wins by a hair** (4.4 tons, 1.6%). The question, the hook and the loop still work, and the near-tie is the more surprising fact: $1 million in pennies weighs about one Statue of Liberty.

**Frame-1 hook**
- On screen, finished, in frame 0 (four tape strips): ***$1,000,000* / IN PENNIES / VS. LADY LIBERTY:** at 86 px, then **WHO'S HEAVIER?** at 74 px. Below them: the 1¢ "2.5 g EACH" stamp, a red "vs" and the 🗽 "280 tons" LADY LIBERTY stamp (labels at 40 px).
- First spoken line (0.1 to 2.6 s): *"A million in pennies versus Lady Liberty. Who's heavier?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.6 | Hook (frame 0 = thumbnail) | Tape hook (number + dilemma) and question strip; 1¢ stamp, "vs", 280 tons stamp |
| 2.6–5.9 | Flip, **partial payoff (27%)** + line 2 | Line 1 "$1,000,000 = 100,000,000 pennies" (72 px), red underline anchored to "100,000,000" at 3.85 s; line 2 "× 2.5 g = 250,000,000 g" (80 px, written 4.0–4.6 s); ⚖️ |
| 5.9–8.35 | Seal + guess | "Heavier than her 280 tons?"; sealed envelope "heavier?"; 2-s PAUSE & GUESS (6.3–8.3) |
| 8.35–10.75 | **Reveal (60%)** | Envelope opens at 8.35 s; card **"≈ 275 tons"** (112 px) / red "she wins by a hair" fully out at 9.4 s and held 1.35 s; the VO says it at 8.9 s, as the card rises |
| 10.75–12.0 | Flip, twist | Line 3 "100M × 3.02¢ = $3.02M" (80 px), red double underline anchored to "$3.02M" at 11.75 s; ASSUME sticky "1¢ cost 3.02¢ to make (US Mint, FY2025)." |
| 12.0–14.0 | **Verdict + loop (last 2.0 s)** | RETURN TO SENDER slams beside the sticky; red "$3.02M to make $1M"; "No wonder they stopped." crossfades into frame 0 (`loop: true`) |

**Voice-over** (the captions are exactly these lines, split into 9 caption cards of ≤ 2 lines at ≤ 4 words/s; the number cards carry `say` readings: "two hundred eighty tons", "two hundred seventy-five tons", "three million dollars")

> A million in pennies versus Lady Liberty. Who's heavier? *(0.1)*
> A hundred million pennies. Two and a half grams each. *(2.7)*
> She's about 280 tons. *(5.9)*
> Heavier or lighter? Guess. *(7.2)*
> About 275 tons. A photo finish. *(8.9)*
> Minting them cost about $3 million. *(10.8)*
> No wonder they stopped. *(12.7, loops to the first line)*

**The envelope math (3 lines)**

1. `$1,000,000 = 100,000,000 pennies`
2. `× 2.5 g = 250,000,000 g` (= 250,000 kg = 551,156 lb = 275.6 US tons; sealed card "≈ 275 tons"; she is 280 tons, so she wins by 4.4 tons, 1.6%)
3. `100M × 3.02¢ = $3.02M` (exact $3,020,000; said "about $3 million"; red verdict line "$3.02M to make $1M")

**ASSUME sticky (on screen):** "1¢ cost 3.02¢ to make (US Mint, FY2025)." The other two inputs sit on the stamps: "1¢ · 2.5 g EACH" and "280 tons · LADY LIBERTY" (40 px typewriter labels). Their sources are in the description and the pinned comment.

**Sources (re-verified live on 2026-10-07; full table under Final fact check)**
- **Penny weight 2.500 g; nickel 5.000 g.** US Mint coin specifications: https://www.usmint.gov/learn/coin-and-medal-programs/coin-specifications
- **Final circulating penny struck 2025-11-12.**
  - US Mint press release: https://www.usmint.gov/news/press-releases/united-states-mint-hosts-historic-ceremonial-strike-for-final-production-of-the-circulating-one-cent-coin
  - CoinNews, 2025-11-12: https://www.coinnews.net/2025/11/12/us-mint-marks-end-circulating-penny/
- **Cost per penny 3.02¢ (FY2025, US Mint 2025 Annual Report).** The report says the FY2025 unit cost was 3.02 cents, above face value for the 20th consecutive fiscal year: https://www.usmint.gov/content/dam/usmint/reports/2025-annual-report.pdf. Corroborated by Greysheet ("unit costs for the penny were 3.02 cents and the nickel was 13.31 cents"): https://www.greysheet.com/news/story/house-passed-measure-could-impact-five-cent-coin-production
  - This replaces FY2024's 3.69¢ (CoinNews, 2025-02-10: https://www.coinnews.net/2025/02/10/penny-costs-3-69-cents-to-make-in-2024/). At 3.69¢ the line would have read $3.69M.
- **Statue of Liberty ≈ 560,000 lb (280 US tons).** NPS, Statue of Liberty Facts: "estimated to weigh 560,000 pounds (254,000 kg), of which 179,200 pounds (81,300 kg) are copper": https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm. The same figure was posted by the Department of the Interior on X in 2026: https://x.com/Interior/status/2070203740594811366
  - **The figure varies by source, so the pinned comment gives all three:** NPS Historical Handbook No. 11 (1954) says 450,000 lb = 225 tons (https://www.nps.gov/parkhistory/online_books/hh/11/hh11k1.htm), which the pennies would beat; NPS Statue Statistics lists 176,000 lb of copper and 440,000 lb of framework (https://www.nps.gov/stli/learn/historyculture/statue-statistics.htm), 308 tons together. The envelope uses the NPS Facts page because it is the one current, explicit total.

**Ending**
- **Loop line:** "No wonder they stopped." It crossfades (`loop: true`) to "A million in pennies versus Lady Liberty. Who's heavier?"
- **Comment bait (second question):** "Same $1M in nickels: heavier or lighter than her? Answer's pinned."
- **Pinned comment:**
  > Exact: 100,000,000 pennies × 2.500 g = 250,000 kg = 551,156 lb = 275.6 US tons (envelope said ≈ 275, within 0.2%). Lady Liberty: the National Park Service estimates 560,000 lb = 280 tons, so she wins by about 4.4 tons (1.6%). Photo finish. Her weight depends on whose figure you use: the NPS's 1954 handbook said 450,000 lb (225 tons), which the pennies beat; its statistics page lists 176,000 lb of copper plus 440,000 lb of framework (308 tons). Minting cost: 100M × $0.0302 (US Mint FY2025 unit cost) = $3,020,000 (we said about $3M, within 0.7%). In nickels (5 g each): 20M × 5 g = 110.2 tons, lighter than her on every figure. Envelope rule: $1 of pennies weighs 250 g.

**Description:**
> Who's heavier: a million dollars in pennies or the Statue of Liberty? $1M is 100,000,000 coins at 2.5 g each: about 275 tons. The National Park Service puts her at about 280 tons, so it's a photo finish. And at 3.02¢ apiece (FY2025), minting them cost about $3 million. Exact figures and the other weight estimates are in the pinned comment.
> Sources (checked Oct 7, 2026): coin weights (US Mint coin specifications); penny unit cost 3.02¢ (US Mint 2025 Annual Report); Statue of Liberty ≈ 560,000 lb (National Park Service, Statue of Liberty Facts); last circulating penny struck Nov 12, 2025 (US Mint).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #Penny #MoneyMath #StatueOfLiberty

**Platform notes**
- **YouTube Shorts:** the 14.0 s cut loops cleanly. The last line lands on the hook again, and replays count as views. Keep the title equal to the tape hook.
- **Instagram Reels:** the short-loop cluster is where small IG accounts break out (1,106x, 1,131x, 522x at 5 to 8 s). This is our closest fit; let it loop. Send line in the caption: "For the friend with the penny jar." (a dedication, not a "tag a friend" ask: Meta demotes tag-baiting).
- **TikTok:** post as is for the loop, then a 60 s+ follow-up that answers the nickel question and runs the denomination ladder by weight. Each rung goes on its own envelope line: $1M in pennies 275.6 US tons → nickels 110.2 US tons → $1 bills 1,000 kg ≈ 1.1 US tons (BEP: ≈ 1 g per note) → $100 bills 10 kg. All of those inputs are already sourced above.

**Why this one should travel**
- **It sits inside a proven family.** "What $1 million looks like" is the highest-outlier unit-swap original (FVIDEOS, 890.12x on 3.85K subs), with @g1djuan's "$100k in cash" at 187.2x. We add the comparison object vidIQ said was missing.
- **The penny is still live news.** Production ended in Nov 2025, and stores are rounding cash totals.
- **"Who's heavier?" is a 2-second commitment** asked on frame 1 (report 01, §3.6), and a photo finish means both camps were nearly right, which is an argument people want to finish in the comments (225 vs 280 vs 308 tons).
- **RETURN TO SENDER is an argument people want to have:** spending $3.02 to make $1.
- **It's the series' Flash-lane test** (report 01, §3.4).

---

### Math check

`teasers/01-cost-in-envelopes-mathcheck.py` recomputes every number said or shown in 01A, 01B and 01C from the sourced inputs. It also opens the three specs and asserts:
- the counter target, the sealed-card numbers, the stamp values, the 9×9 tray and the on-screen working lines (including `lines` columns);
- the stack heights in pixels, so the $1M and $1B envelope stacks and the Burj outline really are to scale;
- that "≈ 1.1 laps" is true for both the envelope figure and the exact figure, and that the "≈ 44,000 km" card still holds at the latest Debt to the Penny;
- 01C's new answer: the statue (560,000 lb = 280 tons) is heavier than 275.6 tons of pennies by under 2%, and $3.02M is 100M × 3.02¢;
- the format-bible structure: every hook is at `t: 0` (finished in frame 0, no negative-t hack) and its red word is a number, the postmark sits in the flap, the spec loops back to frame 0, the captions read exactly as the VO, the ≤ 3 core lines are on screen as written, the first partial payoff lands by 40% of the runtime, and the verdict stamp lands in the last 2 s;
- the reveal timing and reading time (added in the final review): the answer is not captioned/spoken before the card is out of the envelope (≥ openAt + 0.5 s), the card stays fully readable for ≥ 1.3 s, and every handwritten line and sticky holds ≥ 1 s once written;
- and it runs `node src/cli.js check` on the three specs and requires zero warnings.

Run it with `python3 teasers/01-cost-in-envelopes-mathcheck.py`.

```python
#!/usr/bin/env python3
"""Math check for approach #1, Cost in Envelopes (teasers 01A, 01B, 01C).

Recomputes every number said or shown in the three teasers from the sourced inputs
(facts re-verified 2026-10-07; see the md's "Final fact check" table), then cross-checks
the values baked into engine/specs/01-cost-in-envelopes-{a,b,c}.json: counter targets,
sealed cards, on-screen working, stamp values, the to-scale stack heights, and the
format-bible structure (hook finished on frame 0 with no negative-t hack, postmark in the
flap, captions == VO, first payoff by ~40%, verdict in the last 2 s, loop). It also runs
the engine linter and requires zero warnings.
Run from anywhere:  python3 teasers/01-cost-in-envelopes-mathcheck.py
Exits non-zero if any check fails.
"""
import json
import math
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENGINE = os.path.join(ROOT, "engine")
SPECS = os.path.join(ENGINE, "specs")
fails = []


def check(label, ok):
    print(f"  [{'ok' if ok else 'FAIL'}] {label}")
    if not ok:
        fails.append(label)


def within(envelope, exact):
    return abs(envelope - exact) / exact * 100


def spec(stem):
    with open(os.path.join(SPECS, f"01-cost-in-envelopes-{stem}.json"), encoding="utf-8") as f:
        return json.load(f)


def ops(s, kind):
    return [o for o in s["ops"] if o["type"] == kind]


def by_id(s, op_id):
    return next(o for o in s["ops"] if o.get("id") == op_id)


def texts(s):
    """Every string drawn on screen (write, lines, sticky, card lines, hook lines, stamp values)."""
    out = []
    for o in s["ops"]:
        if o["type"] in ("write", "sticky"):
            out.append(o["text"])
        elif o["type"] == "lines":
            out += [x if isinstance(x, str) else x["text"] for x in o["lines"]]
        elif o["type"] == "envelope":
            out += [c if isinstance(c, str) else c["text"] for c in o["card"]]
        elif o["type"] == "hook":
            out += o["text"] if isinstance(o["text"], list) else [o["text"]]
        elif o["type"] == "postage":
            out.append(str(o["value"]))
    return out


def structure(s, payoff_at, core):
    """Format-bible §2 checks shared by all three teasers. `core` = the md's three envelope
    lines, each a list of pieces: a string must be drawn on screen verbatim, an int must be a
    counter target."""
    dur = s["duration"]
    hooks = ops(s, "hook")
    check("frame 0: every hook starts at t = 0 (renders finished; no negative-t hack)", all(h["t"] == 0 for h in hooks))
    lines = [l for h in hooks for l in (h["text"] if isinstance(h["text"], list) else [h["text"]])]
    check("frame 0: the hook's red word is a number", bool(re.search(r"\*\$[\d,]+", " ".join(lines))))
    pm = ops(s, "postmark")
    check("series postmark sits in the flap (x 175, y 258, r 100, persist, t 0)",
          len(pm) == 1 and (pm[0]["x"], pm[0]["y"], pm[0]["r"], pm[0]["t"]) == (175, 258, 100, 0) and pm[0].get("persist") is True)
    caps = " ".join(c["text"] for c in s["captions"])
    norm = lambda x: re.sub(r"\s+", " ", x.replace("…", "...")).strip()
    check("captions read exactly as the VO script", norm(caps) == norm(s["vo"]))
    stamp_t = ops(s, "stamp")[-1]["t"]
    check(f"verdict stamp lands in the last 2 s ({dur - stamp_t:.1f} s before the end)", dur - stamp_t <= 2.0 + 1e-9)
    check(f"first partial payoff by ~40% of runtime ({payoff_at / dur:.0%})", payoff_at / dur <= 0.40)
    check("ends on a seamless loop back to frame 0 (spec loop: true)", s.get("loop") is True)
    shown = texts(s) + [o["to"] for o in ops(s, "counter")]
    check("three-line rule: the md's ≤ 3 core lines are on screen as written",
          len(core) <= 3 and all(piece in shown for line in core for piece in line))
    # Final review (2026-10-07): the card rises out of the envelope from openAt + 0.45 s and is fully
    # out at openAt + 1.05 s (engine envelope op), so the spoken/captioned answer must not beat it.
    env = ops(s, "envelope")[0]
    reveal = min((c for c in s["captions"] if c["t"] >= env["openAt"]), key=lambda c: c["t"])
    check(f"reveal VO waits for the card (caption at +{reveal['t'] - env['openAt']:.2f} s after openAt; card visible from +0.45 s)",
          reveal["t"] - env["openAt"] >= 0.5)
    cuts = sorted(o["t"] for o in s["ops"] if o["type"] in ("flip", "clear"))
    card_leave = next(t for t in cuts if t > env["openAt"])
    check(f"sealed card fully readable for ≥ 1.3 s ({card_leave - (env['openAt'] + 1.05):.2f} s)",
          card_leave - (env["openAt"] + 1.05) >= 1.3 - 1e-9)
    # every handwritten line and sticky stays fully written on screen for ≥ 1 s before it is cleared
    short = []
    for o in s["ops"]:
        if o["type"] not in ("write", "sticky"):
            continue
        done = o["t"] + (0.3 if o["type"] == "sticky" else 0) + len(o["text"]) / o.get("cps", 22 if o["type"] == "sticky" else 15)
        leave = min([o.get("until", dur)] + [t for t in cuts if t > o["t"]])
        if leave - done < 1.0 - 1e-9:
            short.append(f"{o['text'][:24]!r} {leave - done:.2f}s")
    check("reading time: every written line / sticky holds ≥ 1 s once finished" + (f" (short: {short})" if short else ""), not short)


# ---------------------------------------------------------------- 01A
print("01A  Elon's $1 trillion in Costco hot dogs: how many do you get?")
NET_WORTH = 1_000_000_000_000          # envelope input: "about $1 trillion"
BLOOMBERG = 1_040_000_000_000          # Bloomberg Billionaires Index after Mon Oct 5 2026 (+$65B)
FORBES_OCT5 = 1_000_000_000_000        # Forbes real-time, Mon Oct 5 2026 morning ("about $1 trillion")
FORBES_OCT1 = 936_000_000_000          # Forbes top-10 list, as of Oct 1 2026
COMBO = 1.50                           # Costco hot dog + soda, unchanged since 1985 (Apr 2026 reporting)
WORLD = 8_200_000_000                  # US Census Bureau IDB, world population, July 2026
WORLD_UN = 8_300_678_395               # UN WPP projection, July 1 2026 (pinned comment only)

dogs = NET_WORTH / COMBO
each = dogs / WORLD
print(f"  L1  $1,000,000,000,000 / $1.50 = {dogs:,.2f} hot dogs")
print(f"  L2  shown as {round(dogs):,} (counter) and said as 'about 667 billion'")
print(f"  L3  / 8.2 billion people = {each:.4f} each  -> envelope says 'about 81'")
print(f"      envelope 81 vs exact {each:.2f}: within {within(81, each):.2f}%")
print(f"      tip: /1.5 == x2/3 -> {NET_WORTH * 2 / 3:,.2f}")
for name, nw in (("Bloomberg $1.04T (Oct 5)", BLOOMBERG), ("Forbes ~$1T (Oct 5)", FORBES_OCT5), ("Forbes $936B (Oct 1)", FORBES_OCT1)):
    d = nw / COMBO
    print(f"      at {name}: {d:,.0f} hot dogs, {d / WORLD:.2f} each (envelope 81 is within {within(81, d / WORLD):.1f}%)")
print(f"      at the UN's {WORLD_UN / 1e9:.2f}B people: {dogs / WORLD_UN:.2f} each (envelope 81 is within {within(81, dogs / WORLD_UN):.1f}%)")
print(f"      tray: 9 x 9 = {9 * 9}")
print(f"      refresh rule: 'about $1T' stays within 5% for ${NET_WORTH * 0.95 / 1e9:,.0f}B to ${NET_WORTH * 1.05 / 1e9:,.0f}B")
print(f"      'same price since 1985' -> {2026 - 1985} years by 2026")
a = spec("a")
counter = by_id(a, "count")
grid = ops(a, "grid")[0]
check("counter shows round($1T / $1.50)", counter["to"] == round(dogs))
check("'667 billion' is dogs rounded to the nearest billion", round(dogs / 1e9) == 667 and "667 billion" in a["vo"])
check("card '≈ 81 each' matches round(each)", round(each) == 81 and ops(a, "envelope")[0]["card"][0] == "≈ 81 each")
check("grid holds 81 hot dogs", grid["rows"] * grid["cols"] == 81 == grid["filled"])
check("/1.5 equals x2/3", abs(NET_WORTH / 1.5 - NET_WORTH * 2 / 3) < 1e-3)
check("stamp value is the sourced $1.50", any(o["value"] == "$1.50" for o in ops(a, "postage")))
check("both current trackers are within 5% of the envelope's $1T", all(abs(x / NET_WORTH - 1) <= 0.05 for x in (BLOOMBERG, FORBES_OCT5)))
check("red circle is anchored to the counter (target, not coordinates)", any(o.get("target", {}).get("op") == "count" for o in ops(a, "annotate")))
structure(a, counter["t"] + counter["dur"], [["$1,000,000,000,000", "÷ $1.50"], [666_666_666_667], ["÷ 8.2 billion people"]])

# ---------------------------------------------------------------- 01B
print("\n01B  The $40 trillion US debt in $10K envelopes: how tall is it?")
DEBT = 40e12                           # envelope input: "$40 trillion" (crossed Aug 18 2026)
DEBT_AUG18 = 40.05e12                  # Treasury, close of business Tue Aug 18 2026 (as reported Aug 19-20)
DEBT_OCT5 = 40_249_104_431_078         # Debt to the Penny, Oct 5 2026 (FiscalData via IndexBox)
BILL_IN = 0.0043                       # BEP: thickness of one note, inches
BILLS_PER_ENV = 100                    # one $10K envelope = 100 x $100
R_EQ_KM = 6378.137                     # NASA Earth fact sheet, equatorial radius
BURJ_M = 828                           # CTBUH, Burj Khalifa height
GEO_KM = 35_786                        # AMS Glossary, geostationary altitude
MOON_KM = 384_400                      # NASA Space Place, average Earth-Moon distance

env_cm = BILL_IN * 2.54 * BILLS_PER_ENV
equator = 2 * math.pi * R_EQ_KM
print(f"  L1  100 x 0.0043 in = {BILL_IN * 100:.2f} in = {env_cm:.4f} cm per envelope  (envelope: ≈ 1.1 cm)")
m_env = 1e6 / 1e4
b_env = 1e9 / 1e4
print(f"      $1M = {m_env:,.0f} envelopes = {m_env * env_cm / 100:.3f} m   (said: just over a meter; shown ≈ 1.1 m)")
print(f"      $1B = {b_env:,.0f} envelopes = {b_env * env_cm / 100:,.1f} m vs Burj {BURJ_M} m "
      f"(taller by {b_env * env_cm / 100 - BURJ_M:,.1f} m, {b_env * env_cm / 100 / BURJ_M:.2f}x)")
n_env = DEBT / 1e4
print(f"  L2  $40T / $10K = {n_env:,.0f} envelopes")
km_env = n_env * 1.1 / 1e5
km_exact = n_env * env_cm / 1e5
print(f"  L3  x 1.1 cm = {km_env:,.0f} km (envelope)  | exact {km_exact:,.1f} km  -> within {within(km_env, km_exact):.2f}%")
print(f"      equator = 2 x pi x {R_EQ_KM} = {equator:,.1f} km")
print(f"      laps: envelope {km_env:,.0f} / {equator:,.0f} = {km_env / equator:.3f}; exact {km_exact / equator:.3f}  (shown: ≈ 1.1 laps)")
print(f"      spare (pinned only): exact {km_exact - equator:,.1f} km")
print(f"      past geostationary orbit ({GEO_KM:,} km)? {km_exact > GEO_KM}")
for name, debt in (("Aug 18 $40.05T", DEBT_AUG18), ("Oct 5 $40.249T", DEBT_OCT5)):
    k = debt / 1e4 * env_cm / 1e5
    print(f"      at {name}: {k:,.0f} km, {k / equator:.3f} laps, spare {k - equator:,.0f} km")
limit = 44_500 / 1.1 * 1e5 * 1e4
print(f"      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < ${limit / 1e12:.3f}T")
print(f"      'about $40T' vs the latest Debt to the Penny: within {within(DEBT, DEBT_OCT5):.2f}%")
ones_km = DEBT * BILL_IN * 2.54 / 1e5
print(f"      re-hook, in $1 bills: {DEBT:,.0f} x 0.0043 in = {ones_km:,.0f} km = {ones_km / MOON_KM:.2f} Earth-Moon distances")
b = spec("b")
stacks = ops(b, "stack")
px_per_m_1 = stacks[0]["ref"]["h"] / 1.7
check("$1M stack height in px matches 1.0922 m beside a 1.7 m person",
      abs(stacks[0]["h"] - m_env * env_cm / 100 * px_per_m_1) < 1.5)
check("$1B stack height in px = 1,092.2 m at 0.6 px/m", abs(stacks[1]["h"] - b_env * env_cm / 100 * 0.6) < 1.5)
check("both stacks are drawn as manila $10K envelopes (skin: envelope)", all(st.get("skin") == "envelope" for st in stacks))
burj = [o for o in ops(b, "annotate") if o.get("kind") == "box"][0]
check("Burj outline = 828 m at 0.6 px/m, standing on the same ground", abs(burj["h"] - BURJ_M * 0.6) < 1 and burj["y"] + burj["h"] == stacks[1]["y"])
check("4 billion envelopes", n_env == 4e9 and by_id(b, "envelopes")["lines"] == ["$40T ÷ $10K", "= 4 billion envelopes"])
check("card '≈ 44,000 km' = 4e9 x 1.1 cm", round(km_env) == 44_000 and ops(b, "envelope")[0]["card"][0] == "≈ 44,000 km")
check("card still holds at the latest Debt to the Penny", DEBT_OCT5 < limit)
check("stack is longer than the equator", km_exact > equator)
check("'≈ 1.1 laps' holds for the envelope figure AND the exact figure",
      round(km_env / equator, 1) == 1.1 == round(km_exact / equator, 1) and "≈ 1.1 laps of the equator" in texts(b))
check("on screen, the equator is the sourced 40,075 km", f"equator: {equator:,.0f} km" in texts(b))
check("$1B stack is taller than the Burj Khalifa", b_env * env_cm / 100 > BURJ_M)
check("'Just over a meter.' (VO) is the $1M stack: 1 m < 1.0922 m and it rounds to the on-screen ≈ 1.1 m",
      1 < m_env * env_cm / 100 and round(m_env * env_cm / 100, 1) == 1.1 and "Just over a meter." in b["vo"] and "waist" not in b["vo"])
check("'1.1 cm' on screen is 1.0922 cm rounded",round(env_cm, 1) == 1.1 and "1.1 cm" in " ".join(texts(b)) and "1.1 centimeters" in b["vo"])
structure(b, stacks[0]["t"] + stacks[0]["dur"],
          [["100 × $100 = $10K ≈ 1.1 cm"], ["$40T ÷ $10K", "= 4 billion envelopes"], ["≈ 44,000 km", "4 billion × 1.1 cm"]])

# ---------------------------------------------------------------- 01C
print("\n01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?")
PENNY_G = 2.500                        # US Mint coin specifications
LB = 0.45359237                        # kg per pound (exact)
STATUE_LB = 560_000                    # NPS "Statue of Liberty Facts": estimated 560,000 lb (179,200 lb copper)
STATUE_1954_LB = 450_000               # NPS Historical Handbook No. 11 (1954): 450,000 lb = 225 tons
STATUE_STATS_LB = 176_000 + 440_000    # NPS "Statue Statistics": copper 176,000 lb + framework 440,000 lb
UNIT_COST = 0.0302                     # US Mint 2025 Annual Report: FY2025 penny unit cost 3.02 cents
UNIT_COST_FY24 = 0.0369                # FY2024 (previous version of this teaser)

pennies = 1_000_000 / 0.01
grams = pennies * PENNY_G
kg = grams / 1000
lb = kg / LB
tons = lb / 2000
statue_t = STATUE_LB / 2000
print(f"  L1  $1,000,000 / $0.01 = {pennies:,.0f} pennies")
print(f"  L2  x 2.5 g = {grams:,.0f} g = {kg:,.0f} kg = {lb:,.1f} lb = {tons:.2f} US tons  (card: ≈ 275 tons)")
print(f"      envelope 275 vs exact {tons:.2f}: within {within(275, tons):.2f}%")
print(f"      Lady Liberty (NPS facts) {STATUE_LB:,} lb = {statue_t:.0f} US tons = {STATUE_LB * LB / 1000:.1f} t; "
      f"she is heavier by {statue_t - tons:.2f} tons; pennies = {tons / statue_t:.3f} of her ({100 - tons / statue_t * 100:.1f}% short)")
for name, slb in (("NPS 1954 handbook", STATUE_1954_LB), ("NPS statistics copper+framework", STATUE_STATS_LB)):
    st = slb / 2000
    print(f"      vs {name} ({slb:,} lb = {st:.0f} tons): pennies/statue = {tons / st:.2f} -> {'pennies' if tons > st else 'statue'} heavier")
cost = pennies * UNIT_COST
print(f"  L3  {pennies:,.0f} x $0.0302 = ${cost:,.0f}  (said: about $3 million, within {within(3e6, cost):.2f}%)")
print(f"      at the FY2024 3.69 cents it was ${pennies * UNIT_COST_FY24:,.0f}")
print(f"      per dollar of pennies: 100 x 3.02 cents = ${100 * UNIT_COST:.2f}; weight of $1 in pennies = {100 * PENNY_G:.0f} g")
NICKEL_G = 5.000                       # US Mint coin specifications (pinned-comment follow-up)
nickels = 1_000_000 / 0.05
n_tons = nickels * NICKEL_G / 1000 / LB / 2000
print(f"      pinned follow-up, $1M in nickels: {nickels:,.0f} x 5 g = {nickels * NICKEL_G / 1000:,.0f} kg = {n_tons:.1f} US tons "
      f"({'lighter' if n_tons < STATUE_1954_LB / 2000 else 'heavier'} than every Lady Liberty figure)")
NOTE_G = 1.0                           # BEP: a note weighs about 1 gram
print(f"      TikTok ladder: $1M in $1 bills = {1e6 * NOTE_G / 1000:,.0f} kg = {1e6 * NOTE_G / 1000 / LB / 2000:.2f} US tons; "
      f"in $100 bills = {1e4 * NOTE_G / 1000:.0f} kg")
c = spec("c")
check("$1M in nickels is lighter than every Lady Liberty figure", n_tons < min(STATUE_LB, STATUE_1954_LB, STATUE_STATS_LB) / 2000)
check("100,000,000 pennies", pennies == 1e8 and "$1,000,000 = 100,000,000 pennies" in texts(c))
check("250,000,000 g", grams == 2.5e8 and "× 2.5 g = 250,000,000 g" in texts(c))
check("card '≈ 275 tons' rounds the exact US tons", round(tons / 5) * 5 == 275 and ops(c, "envelope")[0]["card"][0] == "≈ 275 tons")
check("stamp '280 tons' is the NPS 560,000 lb", statue_t == 280 and any(o["value"] == "280 tons" for o in ops(c, "postage")))
check("'she wins by a hair': statue heavier, by under 2%", tons < statue_t and (statue_t - tons) / statue_t < 0.02)
check("'photo finish' holds for the envelope figures too (275 vs 280)", 275 < 280 and (280 - 275) / 280 < 0.02)
check("$3.02M to mint", round(cost) == 3_020_000 and "100M × 3.02¢ = $3.02M" in texts(c) and "$3.02M to make $1M" in texts(c))
check("'about $3 million' (VO) is $3.02M rounded", round(cost / 1e6) == 3 and "about $3 million" in c["vo"])
check("sticky carries the FY2025 unit cost", "3.02¢" in ops(c, "sticky")[0]["text"] and "FY2025" in ops(c, "sticky")[0]["text"])
l1 = by_id(c, "l1")
structure(c, l1["t"] + len(l1["text"]) / l1["cps"], [["$1,000,000 = 100,000,000 pennies"], ["× 2.5 g = 250,000,000 g"], ["100M × 3.02¢ = $3.02M"]])

# ---------------------------------------------------------------- engine lint
print("\nengine lint (node src/cli.js check)")
res = subprocess.run(["node", "src/cli.js", "check"] + [f"specs/01-cost-in-envelopes-{k}.json" for k in "abc"],
                     cwd=ENGINE, capture_output=True, text=True)
print("  " + res.stdout.strip().replace("\n", "\n  "))
check("zero linter warnings on all three specs", res.returncode == 0 and "⚠" not in res.stdout and res.stdout.count("✓") == 3)

print(f"\n{'ALL CHECKS PASS' if not fails else f'{len(fails)} CHECK(S) FAILED'}")
raise SystemExit(1 if fails else 0)
```

**Output** (run 2026-10-07, final review):

```text
01A  Elon's $1 trillion in Costco hot dogs: how many do you get?
  L1  $1,000,000,000,000 / $1.50 = 666,666,666,666.67 hot dogs
  L2  shown as 666,666,666,667 (counter) and said as 'about 667 billion'
  L3  / 8.2 billion people = 81.3008 each  -> envelope says 'about 81'
      envelope 81 vs exact 81.30: within 0.37%
      tip: /1.5 == x2/3 -> 666,666,666,666.67
      at Bloomberg $1.04T (Oct 5): 693,333,333,333 hot dogs, 84.55 each (envelope 81 is within 4.2%)
      at Forbes ~$1T (Oct 5): 666,666,666,667 hot dogs, 81.30 each (envelope 81 is within 0.4%)
      at Forbes $936B (Oct 1): 624,000,000,000 hot dogs, 76.10 each (envelope 81 is within 6.4%)
      at the UN's 8.30B people: 80.31 each (envelope 81 is within 0.9%)
      tray: 9 x 9 = 81
      refresh rule: 'about $1T' stays within 5% for $950B to $1,050B
      'same price since 1985' -> 41 years by 2026
  [ok] counter shows round($1T / $1.50)
  [ok] '667 billion' is dogs rounded to the nearest billion
  [ok] card '≈ 81 each' matches round(each)
  [ok] grid holds 81 hot dogs
  [ok] /1.5 equals x2/3
  [ok] stamp value is the sourced $1.50
  [ok] both current trackers are within 5% of the envelope's $1T
  [ok] red circle is anchored to the counter (target, not coordinates)
  [ok] frame 0: every hook starts at t = 0 (renders finished; no negative-t hack)
  [ok] frame 0: the hook's red word is a number
  [ok] series postmark sits in the flap (x 175, y 258, r 100, persist, t 0)
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (39%)
  [ok] ends on a seamless loop back to frame 0 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written
  [ok] reveal VO waits for the card (caption at +0.60 s after openAt; card visible from +0.45 s)
  [ok] sealed card fully readable for ≥ 1.3 s (2.05 s)
  [ok] reading time: every written line / sticky holds ≥ 1 s once finished

01B  The $40 trillion US debt in $10K envelopes: how tall is it?
  L1  100 x 0.0043 in = 0.43 in = 1.0922 cm per envelope  (envelope: ≈ 1.1 cm)
      $1M = 100 envelopes = 1.092 m   (said: just over a meter; shown ≈ 1.1 m)
      $1B = 100,000 envelopes = 1,092.2 m vs Burj 828 m (taller by 264.2 m, 1.32x)
  L2  $40T / $10K = 4,000,000,000 envelopes
  L3  x 1.1 cm = 44,000 km (envelope)  | exact 43,688.0 km  -> within 0.71%
      equator = 2 x pi x 6378.137 = 40,075.0 km
      laps: envelope 44,000 / 40,075 = 1.098; exact 1.090  (shown: ≈ 1.1 laps)
      spare (pinned only): exact 3,613.0 km
      past geostationary orbit (35,786 km)? True
      at Aug 18 $40.05T: 43,743 km, 1.092 laps, spare 3,668 km
      at Oct 5 $40.249T: 43,960 km, 1.097 laps, spare 3,885 km
      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < $40.455T
      'about $40T' vs the latest Debt to the Penny: within 0.62%
      re-hook, in $1 bills: 40,000,000,000,000 x 0.0043 in = 4,368,800 km = 11.37 Earth-Moon distances
  [ok] $1M stack height in px matches 1.0922 m beside a 1.7 m person
  [ok] $1B stack height in px = 1,092.2 m at 0.6 px/m
  [ok] both stacks are drawn as manila $10K envelopes (skin: envelope)
  [ok] Burj outline = 828 m at 0.6 px/m, standing on the same ground
  [ok] 4 billion envelopes
  [ok] card '≈ 44,000 km' = 4e9 x 1.1 cm
  [ok] card still holds at the latest Debt to the Penny
  [ok] stack is longer than the equator
  [ok] '≈ 1.1 laps' holds for the envelope figure AND the exact figure
  [ok] on screen, the equator is the sourced 40,075 km
  [ok] $1B stack is taller than the Burj Khalifa
  [ok] 'Just over a meter.' (VO) is the $1M stack: 1 m < 1.0922 m and it rounds to the on-screen ≈ 1.1 m
  [ok] '1.1 cm' on screen is 1.0922 cm rounded
  [ok] frame 0: every hook starts at t = 0 (renders finished; no negative-t hack)
  [ok] frame 0: the hook's red word is a number
  [ok] series postmark sits in the flap (x 175, y 258, r 100, persist, t 0)
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (32%)
  [ok] ends on a seamless loop back to frame 0 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written
  [ok] reveal VO waits for the card (caption at +0.70 s after openAt; card visible from +0.45 s)
  [ok] sealed card fully readable for ≥ 1.3 s (1.95 s)
  [ok] reading time: every written line / sticky holds ≥ 1 s once finished

01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?
  L1  $1,000,000 / $0.01 = 100,000,000 pennies
  L2  x 2.5 g = 250,000,000 g = 250,000 kg = 551,155.7 lb = 275.58 US tons  (card: ≈ 275 tons)
      envelope 275 vs exact 275.58: within 0.21%
      Lady Liberty (NPS facts) 560,000 lb = 280 US tons = 254.0 t; she is heavier by 4.42 tons; pennies = 0.984 of her (1.6% short)
      vs NPS 1954 handbook (450,000 lb = 225 tons): pennies/statue = 1.22 -> pennies heavier
      vs NPS statistics copper+framework (616,000 lb = 308 tons): pennies/statue = 0.89 -> statue heavier
  L3  100,000,000 x $0.0302 = $3,020,000  (said: about $3 million, within 0.66%)
      at the FY2024 3.69 cents it was $3,690,000
      per dollar of pennies: 100 x 3.02 cents = $3.02; weight of $1 in pennies = 250 g
      pinned follow-up, $1M in nickels: 20,000,000 x 5 g = 100,000 kg = 110.2 US tons (lighter than every Lady Liberty figure)
      TikTok ladder: $1M in $1 bills = 1,000 kg = 1.10 US tons; in $100 bills = 10 kg
  [ok] $1M in nickels is lighter than every Lady Liberty figure
  [ok] 100,000,000 pennies
  [ok] 250,000,000 g
  [ok] card '≈ 275 tons' rounds the exact US tons
  [ok] stamp '280 tons' is the NPS 560,000 lb
  [ok] 'she wins by a hair': statue heavier, by under 2%
  [ok] 'photo finish' holds for the envelope figures too (275 vs 280)
  [ok] $3.02M to mint
  [ok] 'about $3 million' (VO) is $3.02M rounded
  [ok] sticky carries the FY2025 unit cost
  [ok] frame 0: every hook starts at t = 0 (renders finished; no negative-t hack)
  [ok] frame 0: the hook's red word is a number
  [ok] series postmark sits in the flap (x 175, y 258, r 100, persist, t 0)
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (27%)
  [ok] ends on a seamless loop back to frame 0 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written
  [ok] reveal VO waits for the card (caption at +0.55 s after openAt; card visible from +0.45 s)
  [ok] sealed card fully readable for ≥ 1.3 s (1.35 s)
  [ok] reading time: every written line / sticky holds ≥ 1 s once finished

engine lint (node src/cli.js check)
  ✓ specs/01-cost-in-envelopes-a.json (26s, 20 ops)
  ✓ specs/01-cost-in-envelopes-b.json (27.8s, 24 ops)
  ✓ specs/01-cost-in-envelopes-c.json (14s, 18 ops)
  [ok] zero linter warnings on all three specs

ALL CHECKS PASS
```

---

### Verification log

*(First QA pass, kept as history. Where it disagrees with the **Final fact check** and **Polish pass** below, those win: the negative-t hooks, 3.69¢, 225 tons and "the pennies win" described here have all been replaced.)*

Independent fact-check, edit and QA pass on 2026-10-07, run against this file, the three specs and the math check. The approach was to assume mistakes, recompute everything, render and look.

**1. Math (python3).** Every number in this file, the VO, the captions and the specs was recomputed. The arithmetic itself was right: $1T ÷ $1.50 = 666,666,666,666.67; ÷ 8.2B = 81.30; 100 × 0.0043 in = 1.0922 cm; 4e9 × 1.0922 cm = 43,688 km; 2π × 6,378.137 = 40,075.0 km; 1e8 × 2.5 g = 250,000 kg = 275.58 US tons; 1e8 × $0.0369 = $3,690,000; the stack pixels are to scale (321 px = 1.091 m beside a 500 px = 1.7 m person; 655 px = 1,091.7 m and 497 px = 828.3 m at 0.6 px/m). Three consistency bugs were found and fixed:
- **01B, on screen:** the envelope showed "≈ 44,000 km" and "equator: 40,075 km", then "+ ≈ 3,600 km to spare". That is 44,000 − 40,075 = 3,925, so the viewer's own subtraction contradicted the envelope (the 3,600 came from the exact 43,688 km). The spare line was replaced with **"≈ 1.1 laps of the equator"**, which is true for the envelope figure (1.098) and the exact one (1.090). The exact 3,613 km spare stays in the pinned comment.
- **01B, VO vs envelope:** the VO said "about a centimeter thick" while the envelope said "≈ 1.1 cm". It now says "About 1.1 centimeters thick."
- **01A, platform note:** the 5% refresh rule tested only the lower bound ("both under $950B"). It now reads "outside $950B to $1.05T".

**2. Facts.** A fresh WebSearch was not possible in this pass: the shared 200-search budget for the turn was already spent. WebFetch to every cited domain (billionaires.africa, axios.com, census.gov, coinnews.net, usmint.gov, nps.gov, bep.gov, fiscaldata.treasury.gov, nasa.gov) was blocked by the egress proxy. So the inputs were checked three ways instead:
- **Long-standing reference values, confirmed independently:** BEP note thickness 0.0043 in and ≈ 1 g; US Mint penny 2.500 g and nickel 5.000 g; Burj Khalifa 828 m (CTBUH); equatorial radius 6,378.137 km; geostationary altitude 35,786 km; mean Earth–Moon distance 384,400 km; Costco's $1.50 hot dog + soda since 1985; FY2024 penny unit cost 3.69¢ (US Mint 2024 Annual Report); final circulating penny struck 2025-11-12; Statue of Liberty 450,000 lb / 225 tons (NPS), with the 156-ton copper + steel figure noted as the caveat.
- **Corroborated elsewhere in the repo:** Musk becoming the first trillionaire on 2026-06-12 matches the 02 Rate Clock writer's independent sources (Nairametrics, 2026-06-13; Channel 4 News, 2026-06-12; Forbes $1.1T).
- **Consistent, but not re-verified in this pass:** Bloomberg $1.04T and Forbes $936B for Musk on 2026-10-06; Costco's combo still $1.50 (Axios, 2026-05-02); world population 8.2B (US Census Bureau, July 2026), which is consistent with the Census clock's trajectory (≈ 8.09B on 2025-01-01, growing ≈ 71M a year); US debt crossing $40T on 2026-08-18 ($40.047T); Debt to the Penny $40.242T on 2026-10-02. **All of these must be re-checked with WebSearch on publish day.** Also check whether the US Mint has published an FY2025 penny unit cost (it would replace 3.69¢), and confirm the NPS 450,000 lb page.
- **Source hygiene:** the Census link pointed at a `cdn.www.census.gov` mirror. It now gives the canonical `www.census.gov` page.

**3. Brand and policy (format bible §2).**

| Rule | 01A | 01B | 01C |
|---|---|---|---|
| ≤ 3 core lines | ✓ ($1T ÷ $1.50 · counter · ÷ 8.2B) | ✓ (100 × $100 · $40T ÷ $10K · 4B × 1.1 cm) | ✓ ($1M = 100M · × 2.5 g · 100M × 3.69¢) |
| Number in frame 1 | **✗ → ✓** (the first frame was blank) | **✗ → ✓** | **✗ → ✓** |
| Honest rounding + exact pinned comment | ✓ (≈ 81, within 0.4%) | **✗ → ✓** (the 3,600 mismatch; now ≈ 1.1 laps, within 0.7%) | ✓ (≈ 275, within 0.2%) |
| No advice language | ✓ (scan of the md and specs: no "should/need to/guaranteed/get rich") | ✓ | ✓ |
| No borrowed footage, no impersonation | ✓ (drawn props; brands appear as names and public prices only) | ✓ | ✓ |
| Disclaimer in the description | ✓ | ✓ | ✓ |
| ASSUME sticky for assumptions | ✓ | ✓ | ✓ (moved to carry the one assumption, 3.69¢ FY2024, readably) |
| Partial payoff by 40% / verdict in the last 2 s | 30% / **3.8 s → 2.0 s** | 32% / **3.8 s → 2.0 s** | 25% / **4.5 s → 2.0 s** |
| Loop or re-hook | ✓ loop | ✓ re-hook | ✓ loop |

**Frame 1 was blank in all three.** The renderer animates the hook, postmark and stamps in from their own `t`. At `t: 0` the first frame, which is the thumbnail, showed an empty envelope. The hook, postmark, stamps and emoji now start at t −0.6 to −0.3 (the same pattern the 02 specs use), so frame 1 shows the full hook with its red number. The math check now asserts this.

**4. Virality (hooks scored 1–10 against `research/02-top-10-approaches.md` §1 and the watch breakdowns).**

| Teaser | Before | Score | After | Score | Why |
|---|---|---|---|---|---|
| 01A | ELON'S *$1 TRILLION* / IN COSTCO HOT DOGS | 8 | ELON'S *$1 TRILLION* / IN COSTCO HOT DOGS. / HOW MANY DO YOU GET? | 9 | Two famous nouns, a live search (1,005.7x) and the unit-as-title template (lattes 9.86M) were already there. It lacked the bible's "stake + question". Adding the viewer's own share makes them commit on frame 1 (report §3.6) and sets up the "your share: 81" payoff. |
| 01B | *$40 TRILLION* OF DEBT / IN $10K ENVELOPES | 6.5 | *$40 TRILLION* US DEBT / IN $10K ENVELOPES. / HOW TALL IS IT? | 8.5 | Debt is the weakest topic in the corpus (1.35x; 3–11x), and the old hook never said what is being measured. The new one uses the approach doc's own formula ("How tall is $[N] in $10K envelopes?") as a question, and names the US milestone. |
| 01C | *$1,000,000* IN PENNIES / VS. LADY LIBERTY | 7.5 | *$1,000,000* IN PENNIES / VS. LADY LIBERTY: / WHO'S HEAVIER? | 9 | The contest's dimension (weight) was only implied by a stamp. Now it is an explicit 2-second heavier-or-lighter vote, the most consistent tiny-channel mechanic (§3.6), inside the "what $1M looks like" family (890x). |

Titles, tape, first spoken line and description now say the same thing (report §3.3). Pacing changes:
- **01A:** the first math moved from 7.6 s to 3.6 s (the winners land the first conversion at 1–3 s), so the counter pops at 30% instead of 40%. The "1 hot dog + 1 soda = 1 unit" line (7 words, 1.35 s readable) was cut; the sticky and VO say "combo". Runtime went from 27.2 s to 24.2 s.
- **01B:** the setup was compressed and the runtime went from 30.1 s to 26.4 s, under YouTube's sub-30 s preference.
- **01C:** 18.5 s sat between the bible's lanes (Flash 6–14 s, Envelope 25–45 s) while being called "Flash" and "the short-cluster test". It is now cut to **13.9 s**.

**5. Visual QA.** I ran `check` on all three specs (✓, zero warnings), rendered the 12-frame sheets and safe-zone stills, and looked at every one. On top of `check`, a reading-time pass (0.25 s per word, measured from when each text finishes writing until it leaves) and a caption wrap pass were run. Found and fixed:
- **9 texts too short to read:**
  - 01A "1 hot dog + 1 soda = 1 unit" (1.35 s for 7 words) and the 81 card (1.70 s for 7 words).
  - 01B "100 × $100 = $10K ≈ 1.1 cm" (1.72 s), "Burj Khalifa · 828 m" (0.63 s for 4 words), the 44,000 km card (1.70 s for 8 words) and the re-hook caption (2.4 s for 10 words).
  - 01C "× 2.5 g = 250,000,000 g" (0.59 s for 5 words), the 275 card (1.30 s for 7 words) and the 17-word sticky (4.0 s).
  - All now meet the floor.
- **3 captions wrapping to 3 lines** (the engine centres captions on y 1400, so a third line spills past the 1480 safe edge; a fourth is silently dropped). The hook captions were split and the 01B line reworded.
- **01A:** the red circle cut through the last "7" of 666,666,666,667. It is now widened to clear the digits, and the counter is set at 112 px.
- **01A:** hook line 1 sat on the postmark ring. The hook moved to y 445.
- **01C:** the red circle overlapped "to mint" and the "=". The line is now "100M × 3.69¢ = $3.69M" with a tight circle (pad 6), and "to make $1M" moved into the red verdict line.
- **01C:** the ASSUME sticky appeared only after the reveal, at 40 px with 17 words. It now carries one assumption at 56 px and is readable for 2.2 s.

**Math check upgrades:** the math check now also asserts the structure: hook fully drawn at frame 1 with a red number, `loop: true`, captions == VO, core lines on screen, first payoff by 40% and the verdict in the last 2 s. As a negative test, I reintroduced the old frame-1, caption, verdict-timing and 3,600 km defects in a scratch copy: 4 of 4 failed as expected.

**Engine requests (engine/src was not edited by this pass):** while this review ran, the renderer gained several of the features it needed. The specs now use them: a hook at t ≤ 0.05 renders `instant`; `postage.labelSize` is set to 28 to 30 for 01A/01B and 24 for 01C; `loop: true`. `check` now also lints frame 0, caption wraps, caption pace and a 56 px floor for handwriting, and all three specs pass it with zero warnings. The floor arrived mid-review, so the stickies (42 to 46 px), the 01A "÷ 1.5 = × ⅔" tip (46 px), the 01B Burj label (46 px, now split into "Burj Khalifa" / "828 m" so it clears the $1B stack) and the card sub-lines (54 px) were raised to 56 px and re-laid out. The 01A sticky widened to 440 px and moved to y 600 to clear the postmark and line 1. Still open:
1. `check`: include `annotate` in the overlap boxes (`stamp`, `postage` and `postmark` are now boxed). The red-circle collisions fixed above (circle through the last digit, circle over "to mint") were invisible to the linter.
2. `check`: a reading-time lint for on-screen text (words vs seconds fully written on screen), not just captions. 8 of the 9 reading-time failures above were in on-screen text or cards, not captions.
3. `grid`: a `labelSize` ("your share: 81" is fixed at 56 px).
4. `stack`: a fourth, off-the-top-of-frame stack for the TikTok $1-bill rung (01B platform note).

---

### Final fact check

Re-verified live with WebSearch on **2026-10-07** (polish pass). WebFetch to every cited domain was blocked by this environment's egress proxy, so each value was confirmed from the search results' text for the cited page, with a second independent result wherever one existed. "Changed" rows were fixed everywhere: md, spec text, stamps, cards, captions/VO and the math check (re-run, all pass).

| Input | Value used | Source URL | Checked on | Status |
|---|---|---|---|---|
| Musk net worth (01A envelope) | ≈ $1T | Bloomberg via https://www.billionaires.africa/2026/10/06/elon-musk-becomes-a-trillionaire-again-as-spacex-shares-hit-highest-since-june/ and https://www.benzinga.com/trading-ideas/movers/26/10/62179650/elon-musk-is-a-trillionaire-again-thanks-to-spacex-stock | 2026-10-07 | ✓ Confirmed: Bloomberg $1.04T after +$65B on Mon 2026-10-05. Sticky date corrected Oct 6 → Oct 5 |
| Musk, Forbes figure (pinned range) | ≈ $1T (Oct 5); $936B (Oct 1) | https://finance.yahoo.com/markets/stocks/articles/elon-musk-hits-trillionaire-status-171431066.html · https://www.forbes.com.au/news/billionaires/top-10-richest-people-in-world/ | 2026-10-07 | **Corrected:** the draft said "Forbes $936B on Oct 6"; $936B is Forbes' Oct 1 figure, and Forbes had him at about $1T on Oct 5 |
| Musk first trillionaire | 2026-06-12 (SpaceX IPO) | https://www.timesofisrael.com/liveblog_entry/elon-musk-worlds-first-trillionaire-after-spacex-debut/ | 2026-10-07 | ✓ Confirmed (md context only) |
| Costco hot dog + soda | $1.50, unchanged since 1985 | https://www.kfvs12.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/ · https://fortune.com/2026/03/21/costco-hot-dog-price-1-50-ceo-confirms | 2026-10-07 | ✓ Confirmed (Apr 2026 water option, price unchanged) |
| World population | 8.2 billion (July 2026) | https://www.census.gov/newsroom/stories/world-population-day.html | 2026-10-07 | ✓ Confirmed (Census IDB). The UN projection (≈ 8.30B, 2026-07-01) gives 80.3 each; noted in the pinned comment |
| US population | 342,620,143 (2026-07-01) | https://www.census.gov/newsroom/stories/world-population-day.html | 2026-10-07 | ✓ Confirmed; not used on screen or in the math |
| US debt crossing $40T | $40.05T at close of business 2026-08-18 | https://pbs.org/newshour/economy/the-u-s-national-debt-now-stands-at-40-trillion · https://www.wfae.org/2026-08-20/u-s-debt-tops-40-trillion | 2026-10-07 | ✓ Confirmed (draft's "$40.047T" restated as the reported $40.05T) |
| Debt to the Penny, latest | $40,249,104,431,078 (2026-10-05) | https://www.indexbox.io/blog/us-public-debt-outstanding-reaches-40249104431078-dollars-on-october-5-2026/ (dataset: https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/) | 2026-10-07 | **Updated** (was $40.242T on Oct 2). "$40T" within 0.62%; the 44,000 km card holds below $40.455T |
| Note thickness / weight | 0.0043 in; ≈ 1 g | https://www.bep.gov/currency/faqs | 2026-10-07 | ✓ Confirmed |
| Burj Khalifa | 828 m | https://www.skyscrapercenter.com/building/wd/3 | 2026-10-07 | ✓ Confirmed (still the tallest building) |
| Earth's equatorial radius | 6,378.137 km (→ 40,075 km) | https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html | 2026-10-07 | ✓ Confirmed |
| Geostationary altitude | 35,786 km | https://glossary.ametsoc.org/wiki/Geostationary_satellite | 2026-10-07 | ✓ Confirmed (pinned only) |
| Mean Earth–Moon distance | 384,400 km | https://spaceplace.nasa.gov/moon-distance/en/ | 2026-10-07 | ✓ Confirmed (pinned only) |
| Penny / nickel weight | 2.500 g / 5.000 g | https://www.usmint.gov/learn/coin-and-medal-programs/coin-specifications | 2026-10-07 | ✓ Confirmed |
| Penny unit cost | **3.02¢ (FY2025)** | https://www.usmint.gov/content/dam/usmint/reports/2025-annual-report.pdf · https://www.greysheet.com/news/story/house-passed-measure-could-impact-five-cent-coin-production | 2026-10-07 | **Changed** from FY2024's 3.69¢: line 3, sticky, verdict line and VO now say 100M × 3.02¢ = $3.02M, "about $3 million" |
| Final circulating penny | struck 2025-11-12 | https://www.usmint.gov/news/press-releases/united-states-mint-hosts-historic-ceremonial-strike-for-final-production-of-the-circulating-one-cent-coin · https://www.coinnews.net/2025/11/12/us-mint-marks-end-circulating-penny/ | 2026-10-07 | ✓ Confirmed |
| Statue of Liberty weight | **560,000 lb = 280 US tons** | https://www.nps.gov/stli/learn/statue-of-liberty-facts.htm · https://x.com/Interior/status/2070203740594811366 | 2026-10-07 | **Changed** from 450,000 lb (225 tons, NPS 1954 handbook). The pennies (275.6 tons) now lose by 1.6%: card "she wins by a hair", VO "A photo finish". All three NPS figures are in the pinned comment |
| YouTube Shorts views count replays | since 2025-03-31 | https://support.sproutsocial.com/hc/en-us/articles/35874991211533-YouTube-Shorts-View-Count-Update-March-2025 | 2026-10-07 | ✓ Confirmed (md context) |
| YouTube Oct 1 2026 Shorts originality update ("template-based bulk changes") | 2026-10-01 | https://ppc.land/re-uploaded-shorts-lose-reach-as-youtube-favours-original-clips/ | 2026-10-07 | ✓ Confirmed (md context) |
| Instagram Reels "views" include replays | plays + replays | https://developers.facebook.com/docs/instagram-platform/reference/instagram-media/insights/ | 2026-10-07 | ✓ Confirmed (md context) |
| Evidence-table view counts and outlier scores | as captured in `research/` | URLs in the evidence table | not re-checked | Research corpus with its own capture dates; not shown on screen |

### Polish pass

Finishing-producer pass on 2026-10-07 against the upgraded engine (README re-read first). `engine/src` was not edited.

**Facts (see the table above).** Three inputs changed and were fixed everywhere:
- **01C, Statue of Liberty 450,000 lb → 560,000 lb (NPS, current).** This flipped the verdict: 275.6 tons of pennies is 1.6% *lighter* than 280 tons. The stamp now reads "280 tons", the seal header "Heavier than her 280 tons?", the card "≈ 275 tons / she wins by a hair", the VO "She's about 280 tons… About 275 tons. A photo finish." The pinned comment sets out all three NPS figures (225 / 280 / 308 tons) so the comments can argue with sources.
- **01C, penny unit cost 3.69¢ (FY2024) → 3.02¢ (FY2025, US Mint 2025 Annual Report).** Line 3 is now "100M × 3.02¢ = $3.02M", the sticky "1¢ cost 3.02¢ to make (US Mint, FY2025).", the verdict line "$3.02M to make $1M", and the VO "Minting them cost about $3 million."
- **01A, Forbes figure.** "$936B on Oct 6" was really Forbes' Oct 1 figure; Forbes had him at about $1T on Oct 5. The sticky's Bloomberg date is now Oct 5 (the day of the $65B jump to $1.04T). The envelope's round $1T stands.
- **01B, latest Debt to the Penny** refreshed to $40,249,104,431,078 (Oct 5). No on-screen change: the 44,000 km card holds below $40.455T.

**Specs (all three rebuilt for the new engine; `check` returns zero warnings).**
- **Frame 0 is the thumbnail.** Every hook is now at `t: 0`, so the engine renders it finished; the old `t: -0.6` hook hacks are gone. The number and unit run at 80–86 px (they were 68–70 px), and the question is its own strip at 70–74 px. The hook's longest line ("HOW MANY DO YOU GET?") can't fit at 80 px. The frame-0 props are larger and fill the content zone: a 330 px 🌭 / 270 px ✉️ beside 320 × 380 stamps with 40 px labels (they were 24–30 px), and `valueSize` set on each stamp. The postage stamps keep a `t: -0.4` start because `postage` has no `instant` mode and the stamp belongs in the thumbnail. The README documents this as "already on screen in frame 0".
- **Postmark moved into the flap** (`x 175, y 258, r 100, persist`), clear of the hook.
- **Legibility.** All working lines are now 64–96 px (some were 56–66 px), and the hero numbers 112–124 px (the counter was 112; the cards were 100–110). Sticky text is 60–66 px with explicit line breaks so it wraps cleanly. "you" under the 1.7 m figure is a 64 px write: the stack's built-in reference label is fixed at 44 px. Pen modes are chosen per line: `low` where a line sits under another, the default or `small` near the caption band so the pen never dips into the captions.
- **One idea per screen, content zone filled.** Each beat now has its own screen with a `flip` or `clear` between them: hook → sticky → working → pattern break → seal → reveal → scale shot. Content sits in y 600–1300 instead of piling up at the top.
- **Text anchors replace hand-measured marks:** the 01A circle targets the counter (`target {op: "count", pad: 40}`), and the pad is sized so the ellipse clears the end digits (the old circle clipped the last "7"). In 01C, the underline targets "100,000,000" and a red **double underline** targets "$3.02M". A circle around that short word can't avoid the "=" beside it.
- **Envelope stacks:** both 01B stacks use `skin: "envelope"` (manila $10K envelopes instead of cash bricks), still to scale (321 px = 1.09 m beside a 500 px = 1.7 m person; 655 px = 1,092 m beside the 497 px = 828 m Burj at 0.6 px/m).
- **Columns:** 01A writes "$1,000,000,000,000" over "÷ $1.50" (96 px). 01B's line 2 is a `lines` column "$40T ÷ $10K / = 4 billion envelopes" (84 px).
- **`grid.labelSize`** 76 for "your share: 81" (it was fixed at 56). The tray grew to 70 px cells.
- **Captions:** every card is ≤ 2 lines and ≤ 4 words/s, which split them into 15 / 14 / 9 cards. The two that failed the new linter (01A "Still can't picture it? Split them…" at 3 lines; 01C's opening at 3 lines) were split. `say` was added where the voice should read a number differently ("667 billion", "1.1 centimeters", "280 tons", "275 tons", "$3 million"). The VO text is unchanged for 01A and 01B; 01C's changed with the facts. Captions equal the VO (asserted).
- **Loop:** `loop: true` on all three, so the last 0.35 s crossfades into frame 0.
- **Runtimes:** 01A 24.2 → 26.0 s and 01B 26.4 → 27.8 s (the extra flips and the reading floor), both still under 30 s. 01C 13.9 → 14.0 s (Flash). Partial payoffs land at 37% / 32% / 27% and reveals at 68% / 70% / 62%. The verdict stamps land exactly 2.0 s before the end.

**Render QA.** All three were rendered with `node src/cli.js render … -o out/`, and frames were extracted from each MP4 at 0.0 s, the partial payoff, the reveal and duration − 0.2 s (`engine/out/stills/01-cost-in-envelopes-*`). I looked at every one. Fixed between renders: the 01A circle clipping the last digit; the sticky wraps; the 01C stamp label overflowing its frame ("US MINT · 2.5 g" → "2.5 g EACH"); the 01C RETURN TO SENDER stamp covering the sticky's text (moved to the lower right); the `low` pen dipping into the caption band on lines near y 1250; and ops starting before a flip's midpoint (the linter flagged them as overlaps). The duration − 0.2 s frames show the intended crossfade back to the hook.

**Audio** (`ffmpeg -af volumedetect`): 01A mean −25.2 dB / max −2.1 dB; 01B −24.5 / −1.7; 01C −23.7 / −1.9. All are inside the −30 to −18 dB mean and below the −1 dB max.

**Math check** rewritten for the new specs (multiple hook ops, `lines` columns, stamp values, 01C's new answer, FY2025 cost, postmark position, no negative-t hooks, and the linter run) and re-run: all checks pass.

**Engine requests (still open):** `postage` has no `instant` flag (stamps in the thumbnail still need a negative `t`); `stack`'s `ref.label` is fixed at 44 px (worked around with a 64 px write); a fourth, off-the-top-of-frame stack for the TikTok $1-bill rung (01B).

### Final review

Independent final review, 2026-10-07, against the upgraded engine (README re-read first; `engine/src` not edited). Method: a 12-frame contact sheet per spec (`engine/out/review01/sheet-{a,b,c}.png`); frames pulled from each MP4 at 0.0 s, ~40%, ~75% and the end, plus every beat that changed, before and after the fixes (`engine/out/review01/f/`, `engine/out/review01/g/`), all looked at as a phone viewer would. Then `node src/cli.js check`, the math check, a scripted reading-time audit (seconds each text stays fully written on screen), a scan that every number on screen or in a caption also appears in this md (all 42 do), and a live WebSearch spot-check of the volatile inputs. Where this section disagrees with the **Polish pass** above (timings, payoff percentages, the 01B "waist high" line), this section wins.

**Facts spot-checked live (WebSearch, 2026-10-07).** WebFetch to nps.gov is still blocked by the egress proxy, so values were read from the search results for the cited pages.

| Input | Result | Source (date) |
|---|---|---|
| Musk ≈ $1T | ✓ Bloomberg Billionaires Index $1.04T after +$65B on Mon 2026-10-05; Forbes reported him back above $1T the same day | Forbes, 2026-10-05: https://www.forbes.com/sites/alisondurkee/2026/10/05/elon-musk-becomes-a-trillionaire-again-after-spacex-stock-jumps/ · Billionaires.Africa, 2026-10-06 (cited above) |
| Costco combo $1.50 | ✓ unchanged; water option added | Axios, 2026-05-02: https://axios.com/2026/05/02/costco-hot-dog-combo-options-water · KFVS12, 2026-04-29 (cited above) |
| World population 8.2B | ✓ Census IDB projection for July 2026 | US Census Bureau, World Population Day 2026 (cited above) |
| Statue of Liberty 560,000 lb | ✓ "estimated to weigh 560,000 pounds (254,000 kg), of which 179,200 pounds (81,300 kg) are copper" | NPS, Statue of Liberty Facts (cited above) |
| Penny unit cost 3.02¢ (FY2025) | ✓ 20th straight year above face value | Greysheet, citing the US Mint 2025 Annual Report (cited above) |
| US debt > $40T | Not re-pulled; the Oct 5 Debt to the Penny figure above stands. The publish-day re-pull rule in 01B's platform notes is unchanged | — |

**Findings and fixes** (all three specs re-rendered with `node src/cli.js render … -o out/`; runtimes unchanged at 26.0 / 27.8 / 14.0 s)

*01A: Elon's $1 trillion in Costco hot dogs*
1. **The ASSUME sticky couldn't be read.** It finished writing at 5.69 s and the flip started at 6.2 s, leaving 0.51 s for 16 words. Fix: trimmed to "Elon ≈ $1 trillion (Bloomberg, Oct 5 2026). Costco combo $1.50 since 1985." and written at 80 cps instead of 48. Every op and caption from 6.2 s to 20.7 s moves 0.6 s later, and the tray beat absorbs the 0.6 s, so the stamp still lands at 24.0 s (the last 2 s). The sticky now holds for 1.97 s and is on screen for 3.2 s.
2. **"hot dogs 🌭" was written at the pop and cleared 0.37 s later.** It is now written when the count starts (8.6 s), so the counter reads "N hot dogs" the whole time (1.97 s hold).
3. **"÷ 8.2 billion people" held for 0.89 s.** Now written at 30 cps: 1.13 s.
4. **The VO gave away the reveal.** "Eighty-one. Each." was captioned 0.1 s after `openAt`, but the engine's card only starts rising at openAt + 0.45 s and is fully out at + 1.05 s. A sound-off viewer read "Eighty-one" over a sealed envelope. The caption now starts at openAt + 0.6 s (18.8 s, on the card's ding), after a 0.7 s gap that the paper-tear sound fills.
5. The first partial payoff now lands at 39% (was 37%; the limit is 40%) and the reveal at 70%.

*01B: $40 trillion of US debt in $10K envelopes*
1. **The VO contradicted the picture.** It said "About waist high", but the 🧍 reference has cartoon proportions: its waist sits at about 36% of its height, while the 1.09 m stack reaches 64%, which is chest height on the emoji. The VO and caption now say **"Just over a meter."** That's true (1.0922 m), matches the on-screen "≈ 1.1 m" and seeds the envelope rule (a million ≈ a meter). The description was updated to match.
2. **The reveal caption was 0.1 s after `openAt`.** It now starts at openAt + 0.7 s (20.1 s).
3. **Faster writing on the set-up screen.** The sticky now writes at 80 cps (was 50), so its hold goes from 1.58 to 2.15 s. "100 × $100 = $10K ≈ 1.1 cm" writes at 28 cps (was 22), so its hold goes from 1.02 to 1.27 s.

*01C: $1,000,000 in pennies vs. Lady Liberty*
1. **The payoff card was on screen fully for only 0.85 s**, and the caption "About 275 tons" arrived at `openAt` + 0.0 s, while the wax seal was still on.
   - Fix: the guess timer runs 6.3–8.3 s (was 6.5–8.5), the envelope opens at 8.35 s (was 8.7), and the twist flip moves to 10.75 s (was 10.6). The twist ops move 0.15 s later; the stamp stays at 12.0 s.
   - The caption now lands at 8.9 s.
   - The card is fully out at 9.4 s and held for 1.35 s, after 0.5 s of rising during which "≈ 275 tons" is already legible.
2. **"× 2.5 g = 250,000,000 g" held for 1.03 s.** It now starts at 4.0 s at 40 cps: 1.33 s.
3. **The sticky writes at 80 cps (was 60).** It holds for 2.10 s.

**Math check extended.** The script now also asserts:
- the answer is not captioned before the card is out (caption ≥ openAt + 0.5 s);
- the card is fully readable for ≥ 1.3 s;
- every handwritten line and sticky holds ≥ 1 s once written;
- plus that "Just over a meter." is true and that "waist" is gone from 01B's VO.

Negative test: run against the pre-review specs (git `d716b4d~1`), these checks fail 6 times as expected. They pass on the current specs. The code and output blocks above were regenerated from the script.

**Checked and left as is (with reasons)**
- **Frame 0** of all three: the finished tape hook with a red number, the unit stamp(s), the postmark in the flap, nothing in the top 230 px but decoration. The last 0.35 s crossfades into it (`loop: true`); confirmed on the end frames.
- **Negative t on the frame-0 stamps.** The postage stamps (and 01C's "vs") keep `t: -0.4`, because `postage` and `write` have no `instant` mode. The README documents negative t as "already on screen in frame 0 (no sound)". No hook uses a negative-t workaround.
- **Platform UI.** Nothing readable sits at x > 940 below y 820. The one exception is 01A's red circle, whose right stroke reaches x ≈ 990 at y ≈ 1100. The digits end at x ≈ 935, and a tighter circle would clip the last "7" again, so I left it. Captions are ≤ 2 lines inside 1320–1480, and nothing readable is below 1480.
- **Envelope notes** ("how many each?", "how tall?", "heavier?") are drawn by the engine at 54 × w/780 px, about 53 px. That's just under the 56 px handwriting floor, and the linter doesn't check it. They're legible in the frames, and the line above each envelope repeats them.
- **Envelope slide-in.** The sealed envelope slides up through the caption band for about 0.4 s (the engine animates it in from +900 px). This is transient.
- **01C stamp overlap.** RETURN TO SENDER covers the sticky's corner, not its text (a stamp on a paper prop is allowed).
- **Audio** (volumedetect): 01A −25.5 / −2.5 dB, 01B −24.6 / −2.0 dB, 01C −23.9 / −1.9 dB (mean / max).
- **Advice language and impersonation.** There is no advice language. Musk, Costco and the NPS appear as names and public figures only, with drawn props and no borrowed footage.

**Engine requests** (not fixed here; `engine/src` was not touched):
1. An `instant` flag for `postage` and `write`, so frame-0 props don't need negative t.
2. Lint the envelope `note` size, and a reading-time lint for on-screen text (this pass found 7 short holds the linter can't see).
3. Lint `annotate` against the right rail.
4. A `stack` ref figure with adult proportions, or a waist tick, so "waist high" can be drawn honestly.

**Hook scores** (1–10, against `research/02-top-10-approaches.md` §1)

| Teaser | Hook (frame 0) | Score | Why |
|---|---|---|---|
| 01A | ELON'S *$1 TRILLION* / IN COSTCO HOT DOGS. / HOW MANY DO YOU GET? | **9** | Hits two of the doc's formulas ("Cost in Units of [cheap, recognisable, topical item]"; "1 [unit] = $[X]. Here's [a billionaire]"). The subject is this week's live search (trillionaire again on Oct 5), and the unit is an iconic fixed price in the lattes / Big Mac / Red Bull food family. The "you" question makes the viewer commit. Risk: Elon-wealth conversions are a crowded genre, and the number moves daily. |
| 01B | *$40 TRILLION* / OF US DEBT / IN $10K ENVELOPES. / HOW TALL IS IT? | **8** | Uses the doc's own formula ("How tall is $[N] in $10K envelopes?") and its namesake unit, and pays off with the Earth-wrap scale shot the evidence favours. Held back because debt is the corpus's weakest topic (1.35x; 3–11x for debt-milestone news), and a $10K envelope is a less instantly familiar unit than a hot dog. |
| 01C | *$1,000,000* / IN PENNIES / VS. LADY LIBERTY: / WHO'S HEAVIER? | **9** | A 2-second binary vote on frame 0 inside the "what $1M looks like" family (890x, 187x). The penny's end is live news, and the photo-finish answer (275 vs 280 tons, with the 225/308-ton NPS variants pinned) invites correction comments. Flash length suits the loop cluster. |

**Verdicts**
- **01A: fixed.** The sticky, two short holds and the reveal-spoiling caption are fixed. It is ready to post after the publish-day net-worth re-check in its platform notes.
- **01B: fixed.** The VO/visual contradiction and the reveal sync are fixed. It is ready after the publish-day Debt to the Penny re-pull.
- **01C: fixed.** The payoff hold, the reveal sync and the line-2 hold are fixed. It is ready.

### Compliance audit (2026-10-07)

Last-line-of-defence pass on advice language, claims, brand non-negotiables and platform rules (md edits only; `engine/specs` and `engine/src` untouched while the renders run).
- **Advice / promise language:** none on screen, in captions, VO, pins or descriptions. No tickers, funds or urgency. All three descriptions carry "Educational math, not financial advice."
- **Claims about real people and companies:** Musk ≈ $1T (Bloomberg/Forbes, dated, "on paper" in the pin), Costco $1.50, US Treasury, US Mint, NPS: all within their cited sources. No logos, footage or likenesses.
- **Non-negotiables:** ≤ 3 lines, a number in frame 0, ≈ rounding with the exact figure pinned, partial payoff by 39% / 32% / 27%, verdict stamp exactly 2.0 s before the end, `loop: true`. All pass.
- **Mechanic:** all three are unit swaps (count → split, height, weight), the approach-1 mechanic.
- **Engagement bait, fixed in this md:** 01C's Reels caption said "tag the friend with the penny jar" (tag-baiting, which Meta demotes) and 01B's said "Send this to whoever…" (share-baiting). Both are now "For the friend…" dedications.
- **Slate note:** 01A and 02A both lead on Musk's $1 trillion. Post them at least a week apart (or use 02A's no-name variant), as 02A's slate note says.
- **Spec issues:** none.
