## 1. Cost in Envelopes (the Unit Swap)

**Series:** *Cost in Envelopes* · **Lanes:** Flash (01C, 13.9 s) and Envelope (01A 24.2 s, 01B 26.4 s) · **Lead devices:** postage stamp (the unit), ballpoint working, counter, grid / stack, sealed answer, verdict stamp
**Teasers:** 01A Elon's $1 trillion in Costco hot dogs: how many do you get? · 01B The $40 trillion US debt in $10K envelopes: how tall is it? · 01C $1,000,000 in pennies vs. Lady Liberty: who's heavier?
**Specs:** `engine/specs/01-cost-in-envelopes-{a,b,c}.json` · **Sheets:** `engine/out/sheets/01-cost-in-envelopes-{a,b,c}.png` · **Math check:** `teasers/01-cost-in-envelopes-mathcheck.py`
**Inputs:** gathered by the writer with WebSearch on 2026-10-07. Every real-world number is listed with its source and date under each teaser. The independent QA pass could not re-run the web checks (see the verification log at the end), so the publish-day re-checks listed there are mandatory.

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
3. **Add the one "so what" line the originals never give:** 81 hot dogs *for every person on Earth*; a stack that *wraps the equator*; pennies *heavier than the Statue of Liberty*.
4. **Make the scale physically honest:**
   - bill thickness 0.0043 in (BEP);
   - penny 2.500 g (US Mint);
   - the $1M and $1B stacks are drawn to scale against a 1.7 m person and the 828 m Burj Khalifa.
5. **Make the viewer commit before the reveal.** The final count is sealed in the envelope with a 2 to 3 s PAUSE & GUESS timer, the most consistent tiny-channel breakout mechanic in the research (report 01, §3.6).

**The uniquely-ours twist: "The Unit Stamp."** Every episode issues its unit as a perforated **postage stamp** printed with the unit's sourced price: 🌭 **$1.50 COSTCO COMBO**, 💵 **$10K 1 ENVELOPE**, 🪙 **1¢ 2.5 g US MINT**. The stamp is the episode's collectible identity, the count is sealed in the envelope, and the verdict stamp (SPECIAL DELIVERY / POSTAGE DUE / RETURN TO SENDER) cancels it. Comments then request the next stamp ("do it in Taco Bell Baja Blasts"), which feeds the series. That gives it a request-driven, collectible structure no copycat template has.

Each episode also leaves one **save-worthy envelope rule**:
- ÷ 1.5 is × ⅔.
- In $100 bills, a million is about a meter and a billion is about a kilometer.
- $1 of pennies weighs 250 g.

**Anti-template guardrail.** The mechanic stays fixed but the payoff shape rotates: count → **split** (01A), count → **height** (01B), count → **weight** (01C). Never run the same unit twice in a row.

**Series name:** **Cost in Envelopes**. The postmark carries the episode number (No. 01A, 01B, 01C).
**Title template:** `[Big price or fortune] in [unit]: [question]? (Cost in Envelopes No. ___)`, e.g. "Elon's $1 trillion in Costco hot dogs: how many do you get? (Cost in Envelopes No. 01A)". The title, the tape on frame 1 and the first spoken line say the same thing (report 01, §3.3).
**Hook template (tape, three strips):** `[WHO]'S *$[N]* / IN [UNIT]. / [QUESTION]?` or `*$[N]* [THING] / IN [UNIT]. / [QUESTION]?`. The red word is always the number. The third strip is the question the sealed envelope answers ("HOW MANY DO YOU GET?", "HOW TALL IS IT?", "WHO'S HEAVIER?"), so the viewer commits to a guess from frame 1 (report 01, §3.6). All three strips are fully drawn on the first frame (the ops start at a negative `t`).

**Envelope devices used (format bible §3):**

| Device | Engine op | 01A | 01B | 01C |
|---|---|---|---|---|
| Masking-tape hook | `hook` | ✓ | ✓ | ✓ |
| Postage stamp = the unit | `postage` | 🌭 $1.50 | 💵 $10K | 🪙 1¢ + 🗽 225 tons |
| ASSUME sticky | `sticky` | ✓ | ✓ | ✓ |
| Ballpoint working (≤3 lines) | `write` | ✓ | ✓ | ✓ |
| Running count | `counter` | 0 → 666,666,666,667 | n/a | n/a |
| Napkin chart / scale | `grid`, `stack`, `annotate` | 9×9 tray | stacks + Burj + globe ring | n/a |
| Red pen | `annotate` | circle | box, ring | underline, circle |
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
- **Lane / runtime:** Envelope, **24.2 s**, at the lane's short edge (bible §5 says 25 to 45 s). This is the YouTube master, under 30 s per the length research. Every beat sits at or just above its reading-time floor (0.25 s per word), so it isn't padded out to 25 s.
- **Spec:** `engine/specs/01-cost-in-envelopes-a.json` · **Sheet:** `engine/out/sheets/01-cost-in-envelopes-a.png`

**Frame-1 hook**
- On screen from the very first frame (three tape strips): **ELON'S *$1 TRILLION* / IN COSTCO HOT DOGS. / HOW MANY DO YOU GET?**, with the $1.50 COSTCO COMBO stamp and a bobbing 🌭.
- First spoken line (0.1 to 3.2 s): *"Elon's trillion dollars, in Costco hot dogs. How many do you get?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.0 | Hook | Tape hook (number + stake + question); 🌭 bobs; $1.50 COSTCO COMBO stamp |
| 3.0–5.4 | Flip, set-up, line 1 | ASSUME sticky; small unit stamp; "$1,000,000,000,000 ÷ $1.50" written |
| 5.1–7.3 | **Partial payoff (30%)** | Red tip "÷ 1.5 = × ⅔"; red counter runs 0 → **666,666,666,667** and pops at 7.2 s; "hot dogs 🌭"; red circle |
| 8.6–11.5 | Pattern break | Line 3 "÷ 8.2 billion people 🌍" |
| 11.5–15.6 | Seal + guess | Header "8.2 billion people. Each gets…"; sealed envelope "how many each?"; 3-s PAUSE & GUESS |
| 15.7–18.6 | **Reveal (65%)** | Envelope opens: card **"≈ 81 each / hot dogs per person"** |
| 18.6–22.2 | Scale shot | Flip; a 9×9 tray of 🌭 fills: "your share: 81" |
| 22.2–24.2 | **Verdict + loop (last 2.0 s)** | SPECIAL DELIVERY slams; loop line |

**Voice-over** (the captions are exactly these lines)

> Elon's trillion dollars, in Costco hot dogs. How many do you get? *(0.1)*
> He's worth about a trillion. A combo's a buck fifty. *(3.2)*
> A trillion over a buck fifty: about 667 billion hot dogs. *(5.8)*
> Still can't picture it? Split them with everyone on Earth. *(8.65)*
> How many does each person get? Guess before it opens. *(11.6)*
> Eighty-one. Each. Every human alive. *(15.7)*
> That's your tray. And your mom's. And everyone's. *(18.7)*
> All from one man's net worth. *(21.8, loops to the first line)*

**The envelope math (3 lines)**

1. `$1,000,000,000,000 ÷ $1.50` (tip: ÷ 1.5 = × ⅔)
2. `= 666,666,666,667 hot dogs` (the red counter; exact 666,666,666,666.67; said "about 667 billion")
3. `÷ 8.2 billion people 🌍` (sealed card "≈ 81 each"; exact 81.30)

**ASSUME sticky (on screen):** "Elon ≈ $1T (Bloomberg, Oct 6 2026). Combo $1.50 since 1985."

**Sources (gathered 2026-10-07 by the writer; see the verification log for what QA could and could not re-check)**
- **Musk ≈ $1 trillion.**
  - Bloomberg Billionaires Index put him at **$1.04T** and Forbes at **$936B** on 2026-10-06, as reported by Billionaires.Africa, 2026-10-06: https://www.billionaires.africa/2026/10/06/elon-musk-becomes-a-trillionaire-again-as-spacex-shares-hit-highest-since-june/
  - Forbes, 2026-10-02, "…Pushing Net Worth Back Towards $1 Trillion": https://www.forbes.com/sites/fionariley/2026/10/02/elon-musk-gains-61-billion-in-a-day-as-spacex-and-tesla-shares-rise-pushing-net-worth-back-towards-1-trillion/
  - First trillionaire on 2026-06-12 after the SpaceX IPO: https://news.bgov.com/capital-markets/elon-musk-becomes-worlds-first-trillionaire-after-spacex-ipo. Independently corroborated by the 02 Rate Clock sources (Nairametrics, 2026-06-13; Channel 4 News, 2026-06-12; Forbes $1.1T on 2026-06-12).
  - The envelope uses the round **$1T** on purpose; the range goes in the pinned comment.
- **Costco hot dog + soda = $1.50, unchanged since 1985.**
  - Axios, 2026-05-02: https://axios.com/2026/05/02/costco-hot-dog-combo-options-water
  - Gray TV/KAIT, 2026-04-29: https://www.kait8.com/2026/04/29/costcos-iconic-150-hot-dog-combo-debuts-new-change-first-time-decades/
- **World population 8.2 billion (July 2026).** US Census Bureau, World Population Day 2026: https://www.census.gov/newsroom/stories/world-population-day.html (the writer's search result pointed at the `cdn.www.census.gov` mirror of the same page).

**Ending**
- **Loop line:** "All from one man's net worth." This flows straight back into "Elon's trillion dollars, in Costco hot dogs." The spec sets `loop: true`, so the last 0.35 s crossfades into frame 1.
- **Comment bait (a real question):** "What should we count his trillion in next? Best unit gets its own stamp."
- **Pinned comment:**
  > Exact: $1,000,000,000,000 ÷ $1.50 = 666,666,666,667 hot dogs ÷ 8.2 billion people = 81.3 each (envelope said ≈ 81, within 0.4%). His number moves daily: at Bloomberg's $1.04T (Oct 6, 2026) it's 84.6 each; at Forbes' $936B it's 76.1 each. Assumptions: net worth ≈ $1T (on paper, not cash); combo $1.50 (Costco, same price since 1985); world population 8.2B (US Census Bureau, July 2026). Envelope rule: dividing by 1.5 is the same as taking two-thirds. What should we count his trillion in next?

**Description:**
> Elon's back at about $1 trillion. Here's that fortune counted in $1.50 Costco hot dog combos, then split with all 8.2 billion people on Earth. How many do you get? Rough math, real money: $1T ÷ $1.50 ≈ 667 billion hot dogs ≈ 81 each. Exact figures are in the pinned comment.
> Sources (checked Oct 7, 2026): net worth, Bloomberg Billionaires Index $1.04T and Forbes $936B (Oct 6, 2026); Costco combo $1.50 since 1985 (Axios, May 2, 2026); world population 8.2B (US Census Bureau, July 2026).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #Costco #ElonMusk #MoneyMath

**Platform notes**
- **YouTube Shorts:** post the 24.2 s master as is. The title equals the tape hook plus the series tag; pin the exact-figures comment.
  - Musk's net worth swings by tens of billions a day, so post within 48 h of the last check and re-check the morning you post. If neither Bloomberg nor Forbes is within 5% of $1T (i.e. both are outside $950B to $1.05T), retitle with the current figure and re-run the math check (it's one variable).
- **Instagram Reels:** same cut, max 5 hashtags. Sends are the top non-follower signal, so the "your mom's" line is the taggable beat. Use a Trial Reel first, and keep the comment ask a real question (no "comment YES").
- **TikTok:** a 60 s+ cut earns Creator Rewards and more reach (Buffer: +43.2%). Extend by voicing the Bloomberg-vs-Forbes range on screen (84.6 vs 76.1 each) and answering the best unit request from the comments in a follow-up.

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
- **Lane / runtime:** Envelope, **26.4 s**. It uses the approach doc's "How tall is $[N] in $10K envelopes?" formula as the hook question.
- **Spec:** `engine/specs/01-cost-in-envelopes-b.json` · **Sheet:** `engine/out/sheets/01-cost-in-envelopes-b.png`

**Frame-1 hook**
- On screen from the very first frame (three tape strips): ***$40 TRILLION* US DEBT / IN $10K ENVELOPES. / HOW TALL IS IT?**, with a bobbing ✉️ and the $10K stamp.
- First spoken line (0.1 to 3.25 s): *"Forty trillion in US debt, in ten-grand envelopes. How tall is it?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.1 | Hook | Tape hook (number + question); ✉️ bobs; $10K "1 ENVELOPE" stamp |
| 2.6–6.5 | Set-up + line 1 (the unit) | ASSUME sticky; "100 × $100 = $10K ≈ 1.1 cm" |
| 6.5–9.6 | **Partial payoff 1 (32%)** | Flip; "$1 million = 100 envelopes"; the stack grows beside a 🧍 "you" (1.7 m) to a red dimension "≈ 1.1 m" (lands at 8.4 s) |
| 9.6–14.0 | **Partial payoff 2 + pattern break** | Flip; "$1 billion = 100,000 envelopes"; the tall stack reaches "≈ 1.1 km"; pencil outline labelled "Burj Khalifa / 828 m" to scale, and shorter |
| 14.0–18.4 | Seal + guess | Line 2 "$40T ÷ $10K = 4 billion envelopes"; sealed envelope "how tall?"; 3-s PAUSE & GUESS |
| 18.5–21.4 | **Reveal (70%)** | Card **"≈ 44,000 km / 4 billion × 1.1 cm"** (line 3) |
| 21.4–24.4 | Scale shot | Flip; 🌍 with a red ring around the equator; "equator: 40,075 km"; red "≈ 1.1 laps of the equator" |
| 24.4–26.4 | **Verdict + re-hook (last 2.0 s)** | POSTAGE DUE slams; "now in $1 bills…?" |

**Voice-over** (the captions are exactly these lines)

> Forty trillion in US debt, in ten-grand envelopes. How tall is it? *(0.1)*
> A hundred hundreds each. About 1.1 centimeters thick. *(3.25)*
> A million? A hundred envelopes. About waist high. *(6.7)*
> A billion? A hundred thousand envelopes. *(9.8)*
> Taller than the Burj Khalifa. *(12.3)*
> Forty trillion? Four billion envelopes. *(14.1)*
> How tall is that stack? Guess before it opens. *(15.9)*
> About forty-four thousand kilometers. *(18.5)*
> Longer than the equator. It wraps the whole planet. *(21.6)*
> Now in one-dollar bills: where does it reach? *(24.3, re-hook)*

**The envelope math (3 lines)**

1. `100 × $100 = $10K ≈ 1.1 cm` (exact 100 × 0.0043 in = 0.43 in = 1.0922 cm)
2. `$40T ÷ $10K = 4 billion envelopes` (4,000,000,000)
3. `4 billion × 1.1 cm ≈ 44,000 km` (sealed card; exact 43,688 km)

The rungs come from line 1 and are drawn to scale:
- $1M = 100 envelopes = 1.09 m, drawn beside a 1.7 m person.
- $1B = 100,000 envelopes = 1,092 m, against the Burj Khalifa at 828 m.

The scale shot only uses numbers already on screen: 44,000 ÷ 40,075 = 1.098 ≈ **1.1 laps**. The exact 43,688 km is 1.090 laps, which also rounds to 1.1, so the envelope and the exact figure agree.

**ASSUME sticky (on screen):** "Debt ≈ $40T (Treasury, Aug 2026). 1 bill = 0.0043 in (BEP)."

**Sources (gathered 2026-10-07 by the writer; see the verification log)**
- **US debt crossed $40 trillion on 2026-08-18 ($40.047T, Treasury figures).**
  - PBS NewsHour, Aug 2026: https://pbs.org/newshour/economy/the-u-s-national-debt-now-stands-at-40-trillion
  - Fox 10, Aug 2026: https://www.fox10phoenix.com/news/us-national-debt-surpasses-record-40-trillion
  - Latest: Treasury Debt to the Penny showed **$40,242,446,619,209.33 on 2026-10-02** (surfaced through search; the Treasury site was not reachable from this environment). **Re-pull it on publish day:** https://fiscaldata.treasury.gov/datasets/debt-to-the-penny/
- **Bill thickness 0.0043 in, weight ≈ 1 g.** Bureau of Engraving and Printing, Currency FAQs: https://www.bep.gov/currency/faqs. The BEP quote is corroborated by The Physics Factbook: https://hypertextbook.com/facts/1999/DeneneWilliams.shtml
- **Burj Khalifa 828 m.** CTBUH Skyscraper Center: https://www.skyscrapercenter.com/building/wd/3
- **Earth's equatorial radius 6,378.137 km**, so the circumference is 40,075 km. NASA Earth Fact Sheet: https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
- **Pinned comment only:**
  - geostationary orbit 35,786 km, AMS Glossary: https://glossary.ametsoc.org/wiki/geostationary-satellite/
  - average Moon distance 384,400 km, NASA Space Place: https://spaceplace.nasa.gov/moon-distance/

**Ending**
- **Re-hook (second question):** "Now in one-dollar bills: where does it reach?" Then it crossfades back to frame 1 (`loop: true`).
- **Comment bait:** "Guess where the $1-bill stack reaches before you open the pinned comment."
- **Pinned comment:**
  > Exact: $40T ÷ $10K = 4,000,000,000 envelopes × 1.0922 cm (100 bills × 0.0043 in) = 43,688 km (envelope said ≈ 44,000, within 0.7%). Earth's equator is 40,075 km, so that's 1.09 laps (envelope said ≈ 1.1), or 3,613 km to spare, and stood up it passes the geostationary satellites (35,786 km). At the latest Debt to the Penny (~$40.24T, Oct 2, 2026) it's ~43,950 km. Cash only; envelope paper ignored. In $1 bills: 4,368,800 km ≈ 11.4 times the Earth–Moon distance. Envelope rule: in $100 bills, $1 million is about a meter and $1 billion is about a kilometer.

**Description:**
> The US national debt passed $40 trillion in August. How tall is it in $10,000 envelopes (100 hundred-dollar bills, about 1.1 cm each)? A million is waist high, a billion beats the Burj Khalifa, and $40 trillion ≈ 44,000 km: about 1.1 laps of the equator. Exact figures are in the pinned comment.
> Sources (checked Oct 7, 2026): debt, US Treasury via PBS NewsHour ($40T crossed Aug 18, 2026) and Treasury Debt to the Penny; note thickness 0.0043 in (Bureau of Engraving and Printing); Burj Khalifa 828 m (CTBUH); Earth's equatorial radius 6,378.137 km (NASA).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #NationalDebt #MoneyMath

**Platform notes**
- **YouTube Shorts:** the 26.4 s master is the YouTube cut. Pin the exact comment.
  - The debt rises daily, so re-pull Debt to the Penny on publish day. The envelope's "≈ 44,000 km" holds while the debt is under $40.45T (4.045 billion envelopes × 1.1 cm = 44,500 km). Above that, update line 2, line 3 and the card from the math check (one variable). "≈ 1.1 laps" holds until about $41.9T.
- **Instagram Reels:** same cut; open with a Trial Reel. "Send this to whoever says 'just print more'" is the share prompt, used as caption copy rather than in the VO.
- **TikTok:** a ~65 s cut adds the answer rung on screen. A fourth stack in $1 bills runs off the top of the frame as an engine request; until then, a hand-drawn "→ 🌕 × 11" arrow works. Add a fifth "how far is it to the satellites" rung (35,786 km) before the equator wrap.

**Why this one should travel**
- **It fixes a proven failure.** Raw debt posts scored 1.35x ("The national debt is hard to comprehend") and 3 to 11x for "debt surpasses $38T" news (report 01, §3.1). Converted to a physical scale and asked as a question, it lands where the corpus says conversions win.
- **Scale shorts are scarce.** "Polished scale visualization is scarce on Shorts" is one of the five whitespace gaps (report 01, §6 gap 4).
- **It matches two breakouts:** FVIDEOS' counter-plus-physical-stack (890x) and Story Snap's Earth-lap distance conversion (9.4M at 150.55x).
- **The $40T milestone is a search-led news number from August 2026.** The ending is a real second question that pulls people into the pinned comment.

---

#### 01C: $1,000,000 in pennies vs. Lady Liberty: who's heavier?

- **Working title:** $1,000,000 in pennies vs. Lady Liberty: who's heavier? (Cost in Envelopes No. 01C)
- **Money topic:** cash and coins: the dead penny (US penny production ended 2025-11-12) and the "what $1 million looks like" curiosity
- **Unit stamp:** 🪙 1¢ 2.5 g US MINT, versus a 🗽 225 tons stamp
- **Lane / runtime:** Flash, **13.9 s**, hard loop. This is the series' Flash-lane test: three of the top six big-number Shorts run 14 s or shorter (report 01, §3.4).
- **Spec:** `engine/specs/01-cost-in-envelopes-c.json` · **Sheet:** `engine/out/sheets/01-cost-in-envelopes-c.png`

**Frame-1 hook**
- On screen from the very first frame (three tape strips): ***$1,000,000* IN PENNIES / VS. LADY LIBERTY: / WHO'S HEAVIER?**, with the 1¢ stamp, a red "vs" and the 🗽 225 tons stamp.
- First spoken line (0.1 to 2.4 s): *"A million in pennies versus Lady Liberty. Who's heavier?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.3 | Hook | Tape hook (number + dilemma + question); 1¢ stamp, "vs", 225 tons stamp |
| 2.3–3.7 | **Partial payoff (25%)** | Line 1 "$1,000,000 = 100,000,000 pennies", red underline on the count |
| 3.7–5.9 | Line 2 | "× 2.5 g = 250,000,000 g" |
| 5.9–8.3 | Seal + guess | Header "Heavier than 225 tons?"; sealed envelope "heavier?"; 2-s PAUSE & GUESS |
| 8.4–10.7 | **Reveal (60%)** | Card **"≈ 275 tons / the pennies win"** |
| 10.7–11.9 | Twist | Flip; 🪙; line 3 "100M × 3.69¢ = $3.69M"; ASSUME sticky; red circle on $3.69M |
| 11.9–13.9 | **Verdict + loop (last 2.0 s)** | RETURN TO SENDER slams; red "$3.69M to make $1M"; "No wonder they stopped." cuts back to frame 1 |

**Voice-over** (the captions are exactly these lines)

> A million in pennies versus Lady Liberty. Who's heavier? *(0.1)*
> A hundred million pennies. Two and a half grams each. *(2.4)*
> She weighs 225 tons. *(5.0)*
> Heavier or lighter? Guess. *(6.1)*
> About 275 tons. The pennies win. *(8.4)*
> Minting them cost $3.7 million. *(10.8)*
> No wonder they stopped. *(12.7, loops to the first line)*

**The envelope math (3 lines)**

1. `$1,000,000 = 100,000,000 pennies`
2. `× 2.5 g = 250,000,000 g` (= 250,000 kg = 551,156 lb = 275.6 US tons; sealed card "≈ 275 tons")
3. `100M × 3.69¢ = $3.69M` (exact $3,690,000; said "$3.7 million"; red verdict line "$3.69M to make $1M")

**ASSUME sticky (on screen):** "1¢ costs 3.69¢ to make (US Mint, FY2024)." The other two inputs sit on the stamps with their sources: "1¢ · 2.5 g · US MINT" and "225 tons · LADY LIBERTY · NPS". The labels are set to `labelSize` 24 so they can be read on a phone, and the sources are also in the description.

**Sources (gathered 2026-10-07 by the writer; see the verification log)**
- **Penny weight 2.500 g; nickel 5.000 g.** US Mint coin specifications: https://www.usmint.gov/learn/coin-and-medal-programs/coin-specifications
- **Final circulating penny struck 2025-11-12.**
  - PBS NewsHour: https://www.pbs.org/newshour/nation/u-s-mint-in-philadelphia-to-press-final-penny-as-the-1-cent-coin-gets-canceled
  - US Mint press release: https://www.usmint.gov/news/press-releases/united-states-mint-hosts-historic-ceremonial-strike-for-final-production-of-the-circulating-one-cent-coin
- **Cost per penny 3.69¢ (FY2024, US Mint Annual Report).**
  - CoinNews, 2025-02-10: https://www.coinnews.net/2025/02/10/penny-costs-3-69-cents-to-make-in-2024/
  - AP via KSAT, 2025-05-23: https://www.ksat.com/business/2025/05/23/the-penny-costs-nearly-4-cents-to-make-heres-how-much-the-us-spends-on-minting-its-other-coins/
  - No FY2025 unit cost was published in the results; re-check before posting.
- **Statue of Liberty 450,000 lb (225 tons).** NPS historical handbook: https://www.nps.gov/parkhistory/online_books/hh/11/hh11k1.htm (NPS Statue Statistics page: https://www.nps.gov/stli/learn/historyculture/statue-statistics.htm).
  - **Caveat:** other references give copper 62,000 lb + steel 250,000 lb = 156 tons (e.g. Guinness World Records, https://www.guinnessworldrecords.com/world-records/74085-heaviest-statue). The verdict holds under both: 275.6 tons beats 225 and 156.
  - Confirm on the NPS page before publishing; it was blocked from this environment.

**Ending**
- **Loop line:** "No wonder they stopped." It crossfades (`loop: true`) to "A million in pennies versus Lady Liberty. Who's heavier?"
- **Comment bait (second question):** "Same $1M in nickels: heavier or lighter than her? Answer's pinned."
- **Pinned comment:**
  > Exact: 100,000,000 pennies × 2.500 g = 250,000 kg = 551,156 lb = 275.6 US tons (envelope said ≈ 275, within 0.2%). Lady Liberty: 450,000 lb = 225 tons (NPS), so the pennies win by ~51 tons (1.22×). Some references count only her copper + steel (156 tons); the pennies win by more. Minting cost: 100M × $0.0369 (US Mint FY2024 unit cost) = $3,690,000 (we said $3.7M, within 0.3%). In nickels (5 g each): 20M × 5 g = 110.2 tons, lighter than her. Envelope rule: $1 of pennies weighs 250 g.

**Description:**
> Who's heavier: a million dollars in pennies or the Statue of Liberty? $1M is 100,000,000 coins at 2.5 g each: about 275 tons, heavier than Lady Liberty (225 tons). And at 3.69¢ apiece, minting them cost about $3.7M. Exact figures are in the pinned comment.
> Sources (checked Oct 7, 2026): coin weights (US Mint coin specifications); penny unit cost 3.69¢ (US Mint FY2024 Annual Report via CoinNews, Feb 10, 2025); Statue of Liberty 450,000 lb (National Park Service); last circulating penny struck Nov 12, 2025 (PBS NewsHour).
> Educational math, not financial advice.
> #EnvelopeMath #CostInEnvelopes #Penny #MoneyMath #StatueOfLiberty

**Platform notes**
- **YouTube Shorts:** the 13.9 s cut loops cleanly. The last line lands on the hook again, and replays count as views. Keep the title equal to the tape hook.
- **Instagram Reels:** the short-loop cluster is where small IG accounts break out (1,106x, 1,131x, 522x at 5 to 8 s). This is our closest fit; let it loop. Tag line in the caption: "tag the friend with the penny jar."
- **TikTok:** post as is for the loop, then a 60 s+ follow-up that answers the nickel question and runs the denomination ladder by weight. Each rung goes on its own envelope line: $1M in pennies 275.6 US tons → nickels 110.2 US tons → $1 bills 1,000 kg ≈ 1.1 US tons (BEP: ≈ 1 g per note) → $100 bills 10 kg. All of those inputs are already sourced above.

**Why this one should travel**
- **It sits inside a proven family.** "What $1 million looks like" is the highest-outlier unit-swap original (FVIDEOS, 890.12x on 3.85K subs), with @g1djuan's "$100k in cash" at 187.2x. We add the comparison object vidIQ said was missing.
- **The penny is still live news.** Production ended in Nov 2025, and stores are rounding cash totals.
- **"Who's heavier?" is a 2-second commitment** asked on frame 1 (report 01, §3.6).
- **RETURN TO SENDER is an argument people want to have:** spending $3.69 to make $1.
- **It's the series' Flash-lane test** (report 01, §3.4).

---

### Math check

`teasers/01-cost-in-envelopes-mathcheck.py` recomputes every number said or shown in 01A, 01B and 01C from the sourced inputs. It also opens the three specs and asserts:
- the counter target, the sealed-card numbers, the 9×9 tray and the on-screen working lines;
- the stack heights in pixels, so the $1M and $1B stacks and the Burj outline really are to scale;
- that "≈ 1.1 laps" is true for both the envelope figure and the exact figure;
- the format-bible structure: the hook is fully drawn on frame 1 and its red word is a number, the spec loops back to frame 1, the captions read exactly as the VO, the ≤ 3 core lines are on screen as written, the first partial payoff lands by 40% of the runtime, and the verdict stamp lands in the last 2 s.

Run it with `python3 teasers/01-cost-in-envelopes-mathcheck.py`.

```python
#!/usr/bin/env python3
"""Math check for approach #1, Cost in Envelopes (teasers 01A, 01B, 01C).

Recomputes every number said or shown in the three teasers from the sourced inputs,
then cross-checks the values baked into engine/specs/01-cost-in-envelopes-{a,b,c}.json:
counter targets, sealed cards, on-screen working, the to-scale stack heights, and the
format-bible structure (number in frame 1, captions == VO, first payoff by ~40%,
verdict in the last 2 s).
Run from anywhere:  python3 teasers/01-cost-in-envelopes-mathcheck.py
Exits non-zero if any check fails.
"""
import json
import math
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, "engine", "specs")
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


def texts(s):
    """Every string drawn on screen (write text, sticky, card lines, hook lines)."""
    out = []
    for o in s["ops"]:
        if o["type"] in ("write", "sticky"):
            out.append(o["text"])
        elif o["type"] == "envelope":
            out += [c if isinstance(c, str) else c["text"] for c in o["card"]]
        elif o["type"] == "hook":
            out += o["text"]
    return out


def structure(s, payoff_at, core):
    """Format-bible §2 checks shared by all three teasers. `core` = the md's three envelope
    lines: a string must be drawn on screen verbatim, an int must be a counter target."""
    dur = s["duration"]
    hook = ops(s, "hook")[0]
    lines = hook["text"]
    fully_in = hook["t"] + 0.2 + 0.14 * (len(lines) - 1)      # engine: line i lands at t + 0.14 i + 0.2
    check("frame 1: hook fully drawn at t = 0 (first frame / thumbnail)", fully_in <= 0)
    check("frame 1: the hook's red word is a number", bool(re.search(r"\*\$[\d,]+", " ".join(lines))))
    caps = " ".join(c["text"] for c in s["captions"])
    norm = lambda x: re.sub(r"\s+", " ", x.replace("…", "...")).strip()
    check("captions read exactly as the VO script", norm(caps) == norm(s["vo"]))
    stamp_t = ops(s, "stamp")[-1]["t"]
    check(f"verdict stamp lands in the last 2 s ({dur - stamp_t:.1f} s before the end)", dur - stamp_t <= 2.0 + 1e-9)
    check(f"first partial payoff by ~40% of runtime ({payoff_at / dur:.0%})", payoff_at / dur <= 0.40)
    check("ends on a seamless loop back to frame 1 (spec loop: true)", s.get("loop") is True)
    shown = texts(s) + [o["to"] for o in ops(s, "counter")]
    check("three-line rule: the md's ≤ 3 core lines are on screen as written", len(core) <= 3 and all(x in shown for x in core))


# ---------------------------------------------------------------- 01A
print("01A  Elon's $1 trillion in Costco hot dogs: how many do you get?")
NET_WORTH = 1_000_000_000_000          # envelope input: "about $1 trillion"
BLOOMBERG = 1_040_000_000_000          # Bloomberg Billionaires Index, Oct 6 2026
FORBES = 936_000_000_000               # Forbes real-time, Oct 6 2026
COMBO = 1.50                           # Costco hot dog + soda, unchanged since 1985
WORLD = 8_200_000_000                  # US Census Bureau, world population, July 2026

dogs = NET_WORTH / COMBO
each = dogs / WORLD
print(f"  L1  $1,000,000,000,000 / $1.50 = {dogs:,.2f} hot dogs")
print(f"  L2  shown as {round(dogs):,} (counter) and said as 'about 667 billion'")
print(f"  L3  / 8.2 billion people = {each:.4f} each  -> envelope says 'about 81'")
print(f"      envelope 81 vs exact {each:.2f}: within {within(81, each):.2f}%")
print(f"      tip: /1.5 == x2/3 -> {NET_WORTH * 2 / 3:,.2f}")
for name, nw in (("Bloomberg $1.04T", BLOOMBERG), ("Forbes $936B", FORBES)):
    d = nw / COMBO
    print(f"      at {name}: {d:,.0f} hot dogs, {d / WORLD:.2f} each (envelope 81 is within {within(81, d / WORLD):.1f}%)")
print(f"      tray: 9 x 9 = {9 * 9}")
print(f"      refresh rule: 'about $1T' stays within 5% for ${NET_WORTH * 0.95 / 1e9:,.0f}B to ${NET_WORTH * 1.05 / 1e9:,.0f}B")
print(f"      'same price since 1985' -> {2026 - 1985} years by 2026")
a = spec("a")
counter = ops(a, "counter")[0]
check("counter shows round($1T / $1.50)", counter["to"] == round(dogs))
check("'667 billion' is dogs rounded to the nearest billion", round(dogs / 1e9) == 667 and "667 billion" in a["vo"])
check("card '≈ 81 each' matches round(each)", round(each) == 81 and "81" in ops(a, "envelope")[0]["card"][0])
check("grid holds 81 hot dogs", ops(a, "grid")[0]["rows"] * ops(a, "grid")[0]["cols"] == 81 == ops(a, "grid")[0]["filled"])
check("/1.5 equals x2/3", abs(NET_WORTH / 1.5 - NET_WORTH * 2 / 3) < 1e-3)
check("on-screen line 1 and line 3 carry the same inputs", "$1,000,000,000,000 ÷ $1.50" in texts(a) and "÷ 8.2 billion people 🌍" in texts(a))
structure(a, counter["t"] + counter["dur"], ["$1,000,000,000,000 ÷ $1.50", 666_666_666_667, "÷ 8.2 billion people 🌍"])

# ---------------------------------------------------------------- 01B
print("\n01B  The $40 trillion US debt in $10K envelopes: how tall is it?")
DEBT = 40e12                           # envelope input: "$40 trillion" (crossed Aug 18 2026)
DEBT_AUG18 = 40.047e12                 # Treasury figure on the crossing day (as reported)
DEBT_OCT2 = 40_242_446_619_209.33      # Debt to the Penny, Oct 2 2026 (search-surfaced; re-pull at publish)
BILL_IN = 0.0043                       # BEP: thickness of one note, inches
BILLS_PER_ENV = 100                    # one $10K envelope = 100 x $100
R_EQ_KM = 6378.137                     # NASA Earth fact sheet, equatorial radius
BURJ_M = 828                           # CTBUH, Burj Khalifa height
GEO_KM = 35_786                        # geostationary orbit altitude
MOON_KM = 384_400                      # NASA, average Earth-Moon distance

env_cm = BILL_IN * 2.54 * BILLS_PER_ENV
equator = 2 * math.pi * R_EQ_KM
print(f"  L1  100 x 0.0043 in = {BILL_IN * 100:.2f} in = {env_cm:.4f} cm per envelope  (envelope: ≈ 1.1 cm)")
m_env = 1e6 / 1e4
b_env = 1e9 / 1e4
print(f"      $1M = {m_env:,.0f} envelopes = {m_env * env_cm / 100:.3f} m   (said: about waist high, ≈ 1.1 m)")
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
for name, debt in (("Aug 18 $40.047T", DEBT_AUG18), ("Oct 2 $40.242T", DEBT_OCT2)):
    k = debt / 1e4 * env_cm / 1e5
    print(f"      at {name}: {k:,.0f} km, {k / equator:.3f} laps, spare {k - equator:,.0f} km")
limit = 44_500 / 1.1 * 1e5 * 1e4
print(f"      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < ${limit / 1e12:.3f}T")
ones_km = DEBT * BILL_IN * 2.54 / 1e5
print(f"      re-hook, in $1 bills: {DEBT:,.0f} x 0.0043 in = {ones_km:,.0f} km = {ones_km / MOON_KM:.2f} Earth-Moon distances")
b = spec("b")
stacks = ops(b, "stack")
px_per_m_1 = stacks[0]["ref"]["h"] / 1.7
check("$1M stack height in px matches 1.0922 m beside a 1.7 m person",
      abs(stacks[0]["h"] - m_env * env_cm / 100 * px_per_m_1) < 1.5)
check("$1B stack height in px = 1,092.2 m at 0.6 px/m", abs(stacks[1]["h"] - b_env * env_cm / 100 * 0.6) < 1.5)
burj = [o for o in ops(b, "annotate") if o.get("kind") == "box"][0]
check("Burj outline = 828 m at 0.6 px/m, standing on the same ground", abs(burj["h"] - BURJ_M * 0.6) < 1 and burj["y"] + burj["h"] == stacks[1]["y"])
check("4 billion envelopes", n_env == 4e9 and "$40T ÷ $10K = 4 billion envelopes" in texts(b))
check("card '≈ 44,000 km' = 4e9 x 1.1 cm", round(km_env) == 44_000 and "44,000" in ops(b, "envelope")[0]["card"][0])
check("stack is longer than the equator", km_exact > equator)
check("'≈ 1.1 laps' holds for the envelope figure AND the exact figure",
      round(km_env / equator, 1) == 1.1 == round(km_exact / equator, 1) and "≈ 1.1 laps of the equator" in texts(b))
check("on screen, the equator is the sourced 40,075 km", f"equator: {equator:,.0f} km" in texts(b))
check("$1B stack is taller than the Burj Khalifa", b_env * env_cm / 100 > BURJ_M)
check("'1.1 cm' on screen is 1.0922 cm rounded", round(env_cm, 1) == 1.1 and "1.1 cm" in " ".join(texts(b)) and "1.1 centimeters" in b["vo"])
structure(b, stacks[0]["t"] + stacks[0]["dur"], ["100 × $100 = $10K ≈ 1.1 cm", "$40T ÷ $10K = 4 billion envelopes", "4 billion × 1.1 cm"])

# ---------------------------------------------------------------- 01C
print("\n01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?")
PENNY_G = 2.500                        # US Mint coin specifications
LB = 0.45359237                        # kg per pound (exact)
STATUE_LB = 450_000                    # NPS: 225 tons
STATUE_ALT_LB = 62_000 + 250_000       # other references: copper + steel only
UNIT_COST = 0.0369                     # US Mint FY2024 cost to make and ship one penny

pennies = 1_000_000 / 0.01
grams = pennies * PENNY_G
kg = grams / 1000
lb = kg / LB
tons = lb / 2000
print(f"  L1  $1,000,000 / $0.01 = {pennies:,.0f} pennies")
print(f"  L2  x 2.5 g = {grams:,.0f} g = {kg:,.0f} kg = {lb:,.1f} lb = {tons:.2f} US tons  (card: ≈ 275 tons)")
print(f"      envelope 275 vs exact {tons:.2f}: within {within(275, tons):.2f}%")
print(f"      Lady Liberty {STATUE_LB:,} lb = {STATUE_LB / 2000:.0f} tons = {STATUE_LB * LB / 1000:.1f} t; "
      f"pennies heavier by {tons - STATUE_LB / 2000:.1f} tons ({tons / (STATUE_LB / 2000):.2f}x)")
print(f"      vs copper+steel only ({STATUE_ALT_LB:,} lb = {STATUE_ALT_LB / 2000:.0f} tons): {tons / (STATUE_ALT_LB / 2000):.2f}x")
cost = pennies * UNIT_COST
print(f"  L3  {pennies:,.0f} x $0.0369 = ${cost:,.0f}  (said: $3.7 million, within {within(3.7e6, cost):.2f}%)")
print(f"      per dollar of pennies: 100 x 3.69 cents = ${100 * UNIT_COST:.2f}; weight of $1 in pennies = {100 * PENNY_G:.0f} g")
NICKEL_G = 5.000                       # US Mint coin specifications (pinned-comment follow-up)
nickels = 1_000_000 / 0.05
n_tons = nickels * NICKEL_G / 1000 / LB / 2000
print(f"      pinned follow-up, $1M in nickels: {nickels:,.0f} x 5 g = {nickels * NICKEL_G / 1000:,.0f} kg = {n_tons:.1f} US tons "
      f"({'lighter' if n_tons < STATUE_LB / 2000 else 'heavier'} than Lady Liberty)")
NOTE_G = 1.0                           # BEP: a note weighs about 1 gram
print(f"      TikTok ladder: $1M in $1 bills = {1e6 * NOTE_G / 1000:,.0f} kg = {1e6 * NOTE_G / 1000 / LB / 2000:.2f} US tons; "
      f"in $100 bills = {1e4 * NOTE_G / 1000:.0f} kg")
c = spec("c")
check("$1M in nickels is lighter than 225 tons", n_tons < STATUE_LB / 2000)
check("100,000,000 pennies", pennies == 1e8 and "$1,000,000 = 100,000,000 pennies" in texts(c))
check("250,000,000 g", grams == 2.5e8 and "× 2.5 g = 250,000,000 g" in texts(c))
check("card '≈ 275 tons' rounds the exact US tons", round(tons / 5) * 5 == 275 and "275" in ops(c, "envelope")[0]["card"][0])
check("heavier than 225 tons", tons > STATUE_LB / 2000)
check("heavier than the copper+steel-only figure too", tons > STATUE_ALT_LB / 2000)
check("$3.69M to mint", round(cost) == 3_690_000 and "100M × 3.69¢ = $3.69M" in texts(c) and "$3.69M to make $1M" in texts(c))
check("'$3.7 million' (VO) is $3.69M rounded", round(cost / 1e5) / 10 == 3.7 and "$3.7 million" in c["vo"])
under = [o for o in ops(c, "write") if o["text"].startswith("$1,000,000 =")][0]
structure(c, under["t"] + len(under["text"]) / under["cps"], ["$1,000,000 = 100,000,000 pennies", "× 2.5 g = 250,000,000 g", "100M × 3.69¢ = $3.69M"])

print(f"\n{'ALL CHECKS PASS' if not fails else f'{len(fails)} CHECK(S) FAILED'}")
raise SystemExit(1 if fails else 0)
```

**Output** (run 2026-10-07):

```text
01A  Elon's $1 trillion in Costco hot dogs: how many do you get?
  L1  $1,000,000,000,000 / $1.50 = 666,666,666,666.67 hot dogs
  L2  shown as 666,666,666,667 (counter) and said as 'about 667 billion'
  L3  / 8.2 billion people = 81.3008 each  -> envelope says 'about 81'
      envelope 81 vs exact 81.30: within 0.37%
      tip: /1.5 == x2/3 -> 666,666,666,666.67
      at Bloomberg $1.04T: 693,333,333,333 hot dogs, 84.55 each (envelope 81 is within 4.2%)
      at Forbes $936B: 624,000,000,000 hot dogs, 76.10 each (envelope 81 is within 6.4%)
      tray: 9 x 9 = 81
      refresh rule: 'about $1T' stays within 5% for $950B to $1,050B
      'same price since 1985' -> 41 years by 2026
  [ok] counter shows round($1T / $1.50)
  [ok] '667 billion' is dogs rounded to the nearest billion
  [ok] card '≈ 81 each' matches round(each)
  [ok] grid holds 81 hot dogs
  [ok] /1.5 equals x2/3
  [ok] on-screen line 1 and line 3 carry the same inputs
  [ok] frame 1: hook fully drawn at t = 0 (first frame / thumbnail)
  [ok] frame 1: the hook's red word is a number
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (30%)
  [ok] ends on a seamless loop back to frame 1 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written

01B  The $40 trillion US debt in $10K envelopes: how tall is it?
  L1  100 x 0.0043 in = 0.43 in = 1.0922 cm per envelope  (envelope: ≈ 1.1 cm)
      $1M = 100 envelopes = 1.092 m   (said: about waist high, ≈ 1.1 m)
      $1B = 100,000 envelopes = 1,092.2 m vs Burj 828 m (taller by 264.2 m, 1.32x)
  L2  $40T / $10K = 4,000,000,000 envelopes
  L3  x 1.1 cm = 44,000 km (envelope)  | exact 43,688.0 km  -> within 0.71%
      equator = 2 x pi x 6378.137 = 40,075.0 km
      laps: envelope 44,000 / 40,075 = 1.098; exact 1.090  (shown: ≈ 1.1 laps)
      spare (pinned only): exact 3,613.0 km
      past geostationary orbit (35,786 km)? True
      at Aug 18 $40.047T: 43,739 km, 1.091 laps, spare 3,664 km
      at Oct 2 $40.242T: 43,953 km, 1.097 laps, spare 3,878 km
      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < $40.455T
      re-hook, in $1 bills: 40,000,000,000,000 x 0.0043 in = 4,368,800 km = 11.37 Earth-Moon distances
  [ok] $1M stack height in px matches 1.0922 m beside a 1.7 m person
  [ok] $1B stack height in px = 1,092.2 m at 0.6 px/m
  [ok] Burj outline = 828 m at 0.6 px/m, standing on the same ground
  [ok] 4 billion envelopes
  [ok] card '≈ 44,000 km' = 4e9 x 1.1 cm
  [ok] stack is longer than the equator
  [ok] '≈ 1.1 laps' holds for the envelope figure AND the exact figure
  [ok] on screen, the equator is the sourced 40,075 km
  [ok] $1B stack is taller than the Burj Khalifa
  [ok] '1.1 cm' on screen is 1.0922 cm rounded
  [ok] frame 1: hook fully drawn at t = 0 (first frame / thumbnail)
  [ok] frame 1: the hook's red word is a number
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (32%)
  [ok] ends on a seamless loop back to frame 1 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written

01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?
  L1  $1,000,000 / $0.01 = 100,000,000 pennies
  L2  x 2.5 g = 250,000,000 g = 250,000 kg = 551,155.7 lb = 275.58 US tons  (card: ≈ 275 tons)
      envelope 275 vs exact 275.58: within 0.21%
      Lady Liberty 450,000 lb = 225 tons = 204.1 t; pennies heavier by 50.6 tons (1.22x)
      vs copper+steel only (312,000 lb = 156 tons): 1.77x
  L3  100,000,000 x $0.0369 = $3,690,000  (said: $3.7 million, within 0.27%)
      per dollar of pennies: 100 x 3.69 cents = $3.69; weight of $1 in pennies = 250 g
      pinned follow-up, $1M in nickels: 20,000,000 x 5 g = 100,000 kg = 110.2 US tons (lighter than Lady Liberty)
      TikTok ladder: $1M in $1 bills = 1,000 kg = 1.10 US tons; in $100 bills = 10 kg
  [ok] $1M in nickels is lighter than 225 tons
  [ok] 100,000,000 pennies
  [ok] 250,000,000 g
  [ok] card '≈ 275 tons' rounds the exact US tons
  [ok] heavier than 225 tons
  [ok] heavier than the copper+steel-only figure too
  [ok] $3.69M to mint
  [ok] '$3.7 million' (VO) is $3.69M rounded
  [ok] frame 1: hook fully drawn at t = 0 (first frame / thumbnail)
  [ok] frame 1: the hook's red word is a number
  [ok] captions read exactly as the VO script
  [ok] verdict stamp lands in the last 2 s (2.0 s before the end)
  [ok] first partial payoff by ~40% of runtime (25%)
  [ok] ends on a seamless loop back to frame 1 (spec loop: true)
  [ok] three-line rule: the md's ≤ 3 core lines are on screen as written

ALL CHECKS PASS
```

---

### Verification log

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
