# Creator catalogs: the most viral finance Shorts (with a finance-math lens)

Pulled 2026-10-07 for the "Back of the Envelope" / Envelope Math channel. This is research only.

## Sources and method

- **Main source:** vidIQ `vidiq_channel_videos` with `videoFormat: "short"` and `popular: true`, one call per channel. Each call returned up to 50 of the channel's most popular Shorts with views, likes, comments, duration, VPH and vidIQ `breakoutScore`.
  - VPH is views per hour right now.
  - `breakoutScore` is vidIQ's outlier multiple against the channel's typical video. vidIQ leaves it null on many older uploads. That is why some numbers below say "n/a".
- **vidIQ budget:** 20 of 20 calls used.
  - 16 handle lookups from the brief.
  - 1 substitute: @MinorityMindset, for Jaspreet Singh.
  - 3 transcripts: Mark Tilbury's Big Mac, Mr Planktin's compound interest, Finance With Sharan's Why You Should Invest Early.
- **Supplementary web search** (snippets only; YouTube, vidIQ and analytics sites are blocked by the egress proxy):
  - Humphrey Yang's rice video
  - Erika Kullberg's Nike-warranty skit
  - Brian Feroldi's and Minority Mindset's channel size
  - Each is cited where it is used.
- **Caveats:**
  - View counts are a snapshot. "Format" descriptions come from titles plus transcripts where I pulled one. I did not watch the visuals, so any claim about visuals is marked *(inferred)*.
  - The like rate (likes ÷ views) and comment rate (comments ÷ views) are my own calculations from the vidIQ numbers.

### Handles that did not produce data

| Handle in brief | Result | Note |
|---|---|---|
| @HumphreyTalks | Resolved to `UCsvIZLbGmbpCMuobt-eXNYg`, but **0 Shorts returned** | Humphrey Yang's main YouTube handle appears to be `@humphrey` (OutlierKit lists `/channel/humphrey`). There was no budget left to retry. Web: OutlierKit says his most-viewed video is "The #1 Wealth Killer No One Talks About..." at 4.0M views. It does not say whether that is a Short. |
| @HamishHodder | Resolved to `UCODr9HUJ90xtWD-0Xoz4vPw`, **0 Shorts returned** | Web: he covers trading disasters and collapses, mostly long-form. No Shorts data. |
| @JaspreetSingh | Resolved to `UC844uzd2iDbrO3PQbPZa4bQ`, **0 Shorts returned** | Substituted with @MinorityMindset (his real channel) below. |
| @BrianFeroldi | "Channel not found" | Web: about 302K YouTube subscribers, about 12K average views; he makes 5-second infographic-style education content. |
| @ErikaKullberg | "Channel not found" | Her YouTube handle appears to be `@erika2`. Web (NBC News): her Nike-warranty "fine print" skit has **44.1M views** (platform not stated in the article; probably TikTok). That is where her catchphrase "They don't know that I know" comes from. |

---

## 1. Mark Tilbury (@MarkTilbury), the strongest finance-math signal in the set

**Signature format:** 15–50 s Shorts in two families.

- **"Millionaire character" skits:** HATER vs MILLIONAIRE, asking a millionaire to pay rent or split the bill, "HOW REAL MILLIONAIRES ROLL".
- **Since 2024–25, number/scale and cost-teardown explainers:** "Spending $100 BILLION in 40 Seconds", "Cost vs Price: …", "$1 to $1 Sextillion", "How Long Does It Take For These Companies To Make $1 Million?".

**Top Shorts by views:**

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | HATER CHALLENGES MILLIONAIRE (to sell a pen) | 59,361,801 | 23s | 4.69 | https://www.youtube.com/shorts/YVcgERxQtgI |
| 2 | HOW TO BEAT THE RAT RACE! | 51,141,309 | 26s | n/a | https://www.youtube.com/shorts/Ay_hu2hI0qE |
| 3 | How I Make $100,000+ Per Week | 49,730,618 | 43s | 4.55 | https://www.youtube.com/shorts/YHe1OlCXZt8 |
| 4 | HOW TO TAKE BACK CONTROL | 42,844,787 | 18s | 4.52 | https://www.youtube.com/shorts/fgRelUPN6N0 |
| 5 | Spending $100 BILLION in 40 Seconds | 40,927,810 | 49s | **11.91** | https://www.youtube.com/shorts/zWWzd4TWIV8 |
| 6 | What if everyone got $1 billion? 😳 | 37,091,106 | 30s | 7.13 | https://www.youtube.com/shorts/FIdnR2Vcf3o |

**His math/number Shorts specifically:**

| Title | Views | Dur | Breakout | Like % | URL |
|---|---|---|---|---|---|
| How I Make $100,000+ Per Week | 49,730,618 | 43s | 4.55 | 4.33% | https://www.youtube.com/shorts/YHe1OlCXZt8 |
| Spending $100 BILLION in 40 Seconds | 40,927,810 | 49s | 11.91 | 3.40% | https://www.youtube.com/shorts/zWWzd4TWIV8 |
| What if everyone got $1 billion? 😳 | 37,091,106 | 30s | 7.13 | 1.97% | https://www.youtube.com/shorts/FIdnR2Vcf3o |
| Cost vs Price: McDonald's Big Mac | 29,408,278 | 30s | **11.55** | 1.88% | https://www.youtube.com/shorts/nWXP8rHErQc |
| How Long Does It Take For These Companies To Make $1 Million? | 22,963,921 | 26s | 4.24 | 2.12% | https://www.youtube.com/shorts/EqB0MNwSfXs |
| $1 to $1 Sextillion 😅 | 20,193,818 | 44s | 2.85 | 2.72% | https://www.youtube.com/shorts/lXBtU0uYOXI |
| How Much Gordon Ramsey Makes! 🤑 | 19,613,064 | 22s | 4.79 | — | https://www.youtube.com/shorts/fFBKKlfdm_g |
| WHAT IF I GAVE YOU $100,000,000?💰 | 15,400,842 | 31s | n/a | — | https://www.youtube.com/shorts/TE2q8hwgmec |
| Making $1 Every Second ($1M to $1 Trillion) | 15,347,851 | 17s | 4.82 | 4.16% | https://www.youtube.com/shorts/-pqKQqr25VM |
| Cost vs Price: Nutella Jar 🤨 | 15,200,411 | 27s | 2.41 | 2.33% | https://www.youtube.com/shorts/mlCx2b404Rc |
| They Give You FREE Extra Fries On Purpose | 25,830,913 | 20s | 5.00 | — | https://www.youtube.com/shorts/mg0aTXWzLOU |
| HOW BRANDS MANIPULATE YOU | 29,354,617 | 23s | 2.60 | — | https://www.youtube.com/shorts/hBrp78btcI4 |
| HOW RICH PEOPLE AVOID PAYING TAX | 13,664,848 | 29s | 1.52 | — | https://www.youtube.com/shorts/rSECQaHajEw |

**Transcript: "Cost vs Price: McDonald's Big Mac" (29.4M, 11.55x), quoted in full as returned:**

> "A McDonald's Big Mac costs $5.29. Is it a rip-off or not? Well, let's see how much it costs them to make this burger. The bottom bun costs 5 cents. Beef patty, 40 cents. Lettuce, sauce, and onions, 28 cents. Middle bun, 5 cents. Another beef patty, 40 cents. Cheese lettuce sauce pickles and onions, 43 cents. Then the top bun, which is 5 cents. But there are hidden costs like staff, rent, and packaging. So, the total cost for this, $3.63."

**Why it works:**

1. **The hook is a price everyone knows, followed by a yes/no question** ("Is it a rip-off or not?").
2. **Layer-by-layer unit costs build a running tally.** Ingredients add up to $1.66. The structure follows the physical object, bun → patty → bun.
3. **A twist ("hidden costs").** Total cost jumps to $3.63, which defuses the obvious "it's a rip-off" answer.
4. **It never states the margin.** $5.29 − $3.63 = $1.66 is left for the viewer to work out. That open loop invites comments and rewatches. 5,127 comments.
5. **About 30 seconds, no face needed.** It became a repeatable series: the Nutella episode did 15.2M.

**What his biggest hits share:**

- All under 50 s. Titles are mostly ALL-CAPS imperatives or a dollar figure.
- **Status and wealth framing:** "millionaire" appears in 8 of his top 20 titles.
- Since 2025, his highest-breakout Shorts are the math/scale ones: $100B in 40 s (11.91x), Big Mac (11.55x), everyone gets $1B (7.13x).
- **He re-uploads proven winners.** The pen skit came back in 2026-08 (`qf5pfY5ljm8`) and did 21.9M with a VPH of 20,669.

**Math-driven:** yes. About 10 of his top 50 are explicit number or cost math.

---

## 2. Finance With Sharan (@FinancewithSharan)

India-focused. Has the single biggest finance-math Short in this set.

**Signature format:** scripted live-action skits of about 35–60 s, with recurring characters:

- dad and two sons
- customer and banker
- a "know your finance" quiz

The topics are consumer hacks (gold in Dubai, car insurance no-claim bonus, hospitals and banks "scamming you") and ₹ math.

| # | Title | Views | Dur | URL |
|---|---|---|---|---|
| 1 | Why You Should Invest Early | 69,845,216 | 48s | https://www.youtube.com/shorts/sU9SFT1nAOw |
| 2 | Know Your Finance Pt. 4 | 41,395,216 | 60s | https://www.youtube.com/shorts/FmxJnduHwCQ |
| 3 | Gold in Dubai is purer than gold in India. 👀 | 34,231,406 | 59s | https://www.youtube.com/shorts/4OMSPoWGOro |
| 4 | How Hospitals Are SCAMMING YOU | 29,392,263 | 52s | https://www.youtube.com/shorts/EHaDL4tCeBA |
| 5 | This Diwali Gift Gives Positive ROI ! | 24,308,009 | 58s | https://www.youtube.com/shorts/2wGh5gdp9oE |
| 6 | Buy Gold In Dubai? | 24,190,738 | 60s | https://www.youtube.com/shorts/pBwkKQqbY_Q |
| 8 | The Last ₹1 Crore Plan | 21,941,178 | 35s | https://www.youtube.com/shorts/gm3ITLOJkFc |
| — | How Indigo Airlines saves ₹400 Cr in a year | 8,067,921 | 54s | https://www.youtube.com/shorts/-qWE4Hhj8qM |
| — | Buy a TATA Car in HALF PRICE!!🏎️👀 | 7,083,340 | 2m14s | https://www.youtube.com/shorts/AcIBzyKgpsY (breakout 150.72) |
| — | What Salary Is Needed To Own A Bugatti | 6,530,404 | 44s | https://www.youtube.com/shorts/eoEWlljzZoI |

**Transcript: "Why You Should Invest Early" (69.8M; 3.18% like rate):**

> "hey Dad can you give me one L pocket money … I'm going to give you boys 50k per month for 10 years … 10 years later hey Dad guess what I'm a with 1.2 Cr … 20s are meant for partying I spent it on … I'm going to continue giving you boys 50k per month for the next 20 years … I'm going to spend all of this money on partying this time / I will invest everything … 20 years later how much money do you boys have now / I have five Cr / I have 11.5 crores … check the caption below"

**Math check (mine):** ₹50k/month for 120 months at about 1%/month is about ₹1.15 Cr, which matches "1.2 Cr". Left alone for 20 more years at about 12%/yr, that grows to about ₹11–13 Cr. The late starter puts in ₹50k/month for 240 months, about ₹4.95 Cr ("five Cr"). So the numbers are real. **The early-stopper vs late-starter paradox is told as a family drama**, and the payoff is two numbers said out loud. "Check the caption below" moves the explanation off-screen.

**What his hits share:**

- Characters plus conflict (dad and sons, customer and clerk).
- A money "secret" or arbitrage (Dubai gold appears twice, 58.4M combined).
- Concrete local-currency numbers.
- "Scam" or "hack" framing that echoes Erika Kullberg.

**Math-driven:** partly. The compounding and ₹-plan Shorts are pure math. The hacks are consumer arbitrage.

---

## 3. Graham Stephan (@GrahamStephan)

**Signature format:** 18–60 s clips cut from his podcast and collabs (talking heads plus captions). The **title pairs a celebrity or creator name with a money number or reveal**. About 11 of his top 20 titles name a famous person.

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | How Michael Reeves Learned To Code | 48,233,760 | 26s | n/a | https://www.youtube.com/shorts/6qclmwwqTlY |
| 2 | How Much Money Michael Reeves Spends | 46,278,581 | 55s | n/a | https://www.youtube.com/shorts/ZpsvtnLPv8E |
| 3 | How The Dogecoin Millionaire LOST $3 MILLION | 41,348,099 | 33s | n/a | https://www.youtube.com/shorts/xbU6mVkokZE |
| 4 | The BEST Investment in Shark Tank History | 39,487,029 | 55s | 9.27 | https://www.youtube.com/shorts/C_I-oouh38k |
| 5 | MrBeast Reveals How Much Money He Makes! | 30,928,778 | 32s | 5.37 | https://www.youtube.com/shorts/tZ9RS4s7_ws |
| — | Why Steve Harvey Owes $22 MILLION to the IRS | 13,253,606 | 51s | 2.37 | https://www.youtube.com/shorts/dq0-oOvlq-s |
| — | How I Bought A $78 Tesla | 12,273,729 | 18s | n/a | https://www.youtube.com/shorts/savNFG1ATbw |
| — | MrBeast Reveals How Much Money He Makes! (re-cut, 2025) | 11,431,056 | 40s | 27.00 | https://www.youtube.com/shorts/Z0QtK1qOnQ0 |
| — | How Much Money The Island Boys Make | 8,005,294 | 54s | 26.72 | https://www.youtube.com/shorts/p2uPjKIinjQ |
| — | The Problem With Food Waste in Restaurants | 5,593,826 | 36s | 116.01 | https://www.youtube.com/shorts/T8HBTk3wOOY |
| — | Beast Games Winner Paying $5 MILLION IN Taxes | 4,780,023 | 19s | 15.98 | https://www.youtube.com/shorts/wwf_gojUirw |
| — | How Much Money Bobby Lee Makes | 4,581,171 | 35s | 59.88 | https://www.youtube.com/shorts/WFIgGZtJEFk |

**What they share:**

- **"How Much Money [famous person] Makes/Spends"** is his most repeatable formula.
- **Tax-bill shock numbers** ($22M IRS, $5M taxes on a game-show win).
- A paradox price ("$78 Tesla").
- Re-cutting a proven topic works: MrBeast-income did 30.9M, then a 2025 re-cut did 11.4M at 27x.

**Math-driven:** light. The number is the hook, and the clip is talk. "Beast Games Winner Paying $5 MILLION IN Taxes" (19 s, 15.98x) is a pure back-of-envelope tax calculation.

---

## 4. Caleb Hammer (@CalebHammer)

**Signature format:** clips from the *Financial Audit* show. He reveals a guest's income or spending number, then reacts with outrage or judgment. The comment counts are the highest in the set: up to 19,611 comments, a 0.22% comment rate.

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | How Much Money My Former Employee Made | 17,076,571 | 18s | n/a | https://www.youtube.com/shorts/Ig7Y1dknYPM |
| 2 | She Purchased 3 Gas Stations For $3 MILLION | 16,595,335 | 50s | 9.16 | https://www.youtube.com/shorts/wKP_FneSLYM |
| 3 | How To Make Money on Twitter | 15,173,576 | 34s | n/a | https://www.youtube.com/shorts/NVqTkv3WPe4 |
| 4 | How To Make Money On X | 15,144,208 | 32s | n/a | https://www.youtube.com/shorts/WGkE4R69tEw |
| 5 | Spending $500k on Pokemon is INSANE | 14,461,055 | 59s | 6.37 | https://www.youtube.com/shorts/1CxVvNmlIeU |
| 6 | How Much Money Food Servers Make With Tips | 13,699,887 | 59s | n/a | https://www.youtube.com/shorts/OY0xewFZg7Q |
| — | He Spent $120,000 in ONE YEAR | 12,834,364 | 40s | n/a | https://www.youtube.com/shorts/lttwiAsiMuU |
| — | Asmongold Makes MILLIONS of Dollars Per Year | 11,369,463 | 41s | 6.22 | https://www.youtube.com/shorts/4m_M1Wpnr2Q |
| — | Couple Makes $10,000 Per Month! | 10,523,064 | 54s | 7.45 | https://www.youtube.com/shorts/WDeBicYg_ZA |
| — | 900% Interest Rate Loan For a PS5! | 9,234,026 | 36s | n/a | https://www.youtube.com/shorts/deQOQaL9fBQ |
| — | 700% Interest Rate Loans Should Be ILLEGAL! | 8,410,159 | 56s | n/a | https://www.youtube.com/shorts/dIOHOzpQuMA |
| — | How Much Money Copywriters Make | 8,948,048 | 38s | n/a | https://www.youtube.com/shorts/LPrzD3gacYE |
| — | How Much Money Twitch Streamers Make | 8,488,347 | 52s | n/a | https://www.youtube.com/shorts/MSXQs6l7I2Y |

**What they share:** in 8 of his top 20 titles, the hook is a money number or an income reveal ($3M, $500k, $120,000, $10,000/mo, "MILLIONS", "How Much Money X Makes"). Others use extreme APRs (900%, 700%). His comment counts show the reward for *judgment*: the viewer decides whether the number is crazy.

**Math-driven:** medium. The number is the story. The APR Shorts in particular are pure math outrage.

---

## 5. The Money Guy Show (@MoneyGuyShow)

**Signature format:** "Financial Advisors React": two advisors duet or react to other creators' clips (Caleb Hammer, YourRichBFF, Grant Cardone, Dave Ramsey, TikTok advice). There are also benchmark Shorts ("Is $X enough?", "net worth by age").

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | Private Chef Every Night as a Tax Write-Off? - Financial Advisors React | 6,195,245 | 36s | **272.45** | https://www.youtube.com/shorts/LcaiiOGG3SY |
| 2 | @CalebHammer Needs to Have $200,000 In Cash?! | 2,926,207 | 46s | 14.33 | https://www.youtube.com/shorts/axBZRR54Hl4 |
| 3 | WHY Do You Have Consumer Debt?! (@CalebHammer Audit) | 2,684,266 | 56s | 72.66 | https://www.youtube.com/shorts/0xYxYhfu2s0 |
| 4 | Can @CalebHammer Afford His House?! | 2,323,891 | 48s | 5.08 | https://www.youtube.com/shorts/kvPdwQAnx5Y |
| — | Financial Advisors React to Forgetting to Invest | 1,580,670 | 44s | 31.28 | https://www.youtube.com/shorts/p5d1tj75a4c |
| — | Is $3 Million Really Enough to Retire? | 1,321,361 | 1m40s | 30.48 | https://www.youtube.com/shorts/FAkH9nBCJ08 |
| — | Imagine Inheriting THIS in 2025… | 1,151,743 | 45s | 26.69 | https://www.youtube.com/shorts/fNEwSFM9ZrA |
| — | The Problem With 'What If' Investing @HasanMinhaj | 1,091,741 | 46s | 34.08 | https://www.youtube.com/shorts/b-RpwZT-oNk |
| — | $3M in Retirement Is Not Enough? @YourRichBFF | 687,061 | 49s | 42.45 | https://www.youtube.com/shorts/rNN6kvRiPHI |
| — | A Simple Breakdown of the 20/3/8 Car Buying Rule | 638,165 | 38s | 13.51 | https://www.youtube.com/shorts/Y63a70ZbfkY |
| — | This Is What Middle Class Looks Like Now | 587,473 | 45s | 12.79 | https://www.youtube.com/shorts/MoFkwlW4qeI |
| — | Why $100k at 30 Changes Everything | 476,010 | 41s | 7.41 | https://www.youtube.com/shorts/beAt9d9kYYU |
| — | The Strange Math Behind $1 Million | 308,438 | 32s | 8.73 | https://www.youtube.com/shorts/EruLWtWpqjQ |

**What they share:**

- **Borrowing someone else's viral claim and fact-checking it** ("Is X really enough?", "React to …").
- **Benchmark anxiety:** net worth by age, $3M retirement, $100k at 30.
- The "Is $3M enough?" question shows up twice with high breakouts (30.48x and 42.45x).

**Math-driven:** yes. The benchmark and "Is $X enough" Shorts are calculator math. The reaction format supplies the hook.

---

## 6. Mr Planktin (@MrPlanktin)

An animated channel. The catalog is now mostly kid and teacher drama stories, but **its #1 Short is finance math**.

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | Compound interest explained 😂 #shorts | 9,059,331 | 61s | **153.15** | https://www.youtube.com/shorts/rrpn3zo2Slo |
| — | Compound interest explained here #shorts (2026-09-18 follow-up) | 1,714,967 | 58s | 5.52 (VPH 3,838) | https://www.youtube.com/shorts/uoS1qzRWdbM |
| — | Dad was too greedy 😂 | 2,258,864 | 48s | 31.00 | https://www.youtube.com/shorts/nMhPQmnkdC8 |

**Transcript: "Compound interest explained 😂" (9.06M; 3.77% likes; 8,729 comments, a 0.096% comment rate, about 4x Tilbury's math Shorts):**

> "The dad gave Jeffree and Christian each $50. Christian went straight to Taco Bell and even treated his friends while Jeffree put $40 in the bank, keeping $10 for himself. After a month, the bank gave Jeffree an extra third of a percent, meaning he made 13 cents just for saving his money. The next month … now it's based on $80.13. So this time, Jeffree got about 26 cents. … But quick, which car will you buy for your mom? A rusty car? Scroll or ignore. A Tesla Cybertruck? Like this video. A Lamborghini? Subscribe. A Ferrari? Share this video with three friends. A Bugatti? Do all. And comment a heart emoji. After 10 years, Christian has nothing but a weight problem and cavities, while Jeffree has about $6,000 in the…"

**Math check (mine):** $40/month for 120 months at 1/3%/month (about 4%/yr) is about $5,890, which matches "about $6,000". This is the same **two-kid saver-vs-spender** structure as Sharan's 69.8M hit, animated and faceless.

There is an aggressive **engagement-bait interlude** in the middle: "which car will you buy for your mom? Like = Cybertruck, Subscribe = Lamborghini…". That likely explains the comment and like rates. The video **cuts off before the final number** ("$6,000 in the…"), which pushes a loop or rewatch.

**Math-driven:** yes. It is the purest compounding Short in the set.

---

## 7. Nischa (@nischa)

**Signature format:** ex-banker talking head with on-screen lists: routines, signs, habits, benchmarks.

| # | Title | Views | Dur | Breakout | URL |
|---|---|---|---|---|---|
| 1 | My 6-step Payday Routine. Full guide 👆 | 4,398,612 | 50s | 19.52 | https://www.youtube.com/shorts/RIOcs8stB6w |
| 2 | Signs you're doing well financially | 4,019,031 | 60s | 12.41 | https://www.youtube.com/shorts/QS-7ts4S8N8 |
| 3 | Bad money habits that hold you back | 1,253,538 | 53s | 5.26 | https://www.youtube.com/shorts/kCApHwptVp4 |
| — | Why net worth skyrockets after $10k | 431,232 | 60s | 5.53 | https://www.youtube.com/shorts/ZF5FKDFVm7U |
| — | One decision that can double your money | 297,096 | 56s | 4.75 | https://www.youtube.com/shorts/HJ8F_ajBNVg |
| — | What if you invest $10,000 and never touch it again? | 65,671 | 53s | n/a | https://www.youtube.com/shorts/Ay_30_qzc0E |

**What they share:** **a system you can copy** (payday routine) and **self-assessment checklists** (signs you're doing well). Her math Shorts ($10k compounding) do much worse than her routine and checklist Shorts.

**Math-driven:** low. **Relevance to Envelope Math:** the payday routine is close to envelope budgeting, at 4.4M and 19.5x.

---

## 8. Your Rich BFF (@YourRichBFF), Vivian Tu

**Data hygiene warning:** her top 4 Shorts by views are **sponsored and almost certainly ad-boosted**:

- GEICO: 21.5M views but 15,580 likes, a 0.07% like rate
- Lyft: 12.4M views, 8,984 likes
- Hotels.com: 11.9M views, 7,226 likes

The organic hits have like rates of 3–7%. **Filter out any Short with a like rate below about 0.3% before modelling "virality".**

| Organic hit | Views | Dur | Like % | URL |
|---|---|---|---|---|
| What to do if you WIN the lottery | 11,764,315 | 59s | 7.38% | https://www.youtube.com/shorts/daQ0o9aHA2g |
| How to predict layoffs! | 5,475,578 | 51s | 4.4% | https://www.youtube.com/shorts/t42IyJBRNXM |
| What's actually going on with the Japanese Yen… | 4,744,040 | 60s | 4.1% (33.92x) | https://www.youtube.com/shorts/oLtj-9-FF54 |
| Script to stop paying for your friends meals! | 3,703,071 | 55s | 6.4% | https://www.youtube.com/shorts/0EtFRjL9yNM |
| Women were not allowed to have credit cards in their name until 1974. | 3,532,339 | **11s** | 4.0% | https://www.youtube.com/shorts/C3Ir7Cx9kFA |
| What is the pink tax? | 2,532,382 | 59s | 7.0% | https://www.youtube.com/shorts/jxTe3uGVPrQ |
| Is Starbucks actually the worst bank in America?! | 1,807,287 | 59s | 3.5% | https://www.youtube.com/shorts/1nu6cbdm7Pc |

**What they share:**

- Green-screen explainer of a news item (yen, Maui real estate, Trump 2.0).
- Windfall hypotheticals (lottery).
- Scripts for social money situations.
- A surprising fact that fits in 11 seconds.
- "Starbucks is a bank": a stored-value float framed as a bank, which is very envelope-math-able.

**Math-driven:** low to medium.

---

## 9. Low-signal channels (included for completeness)

- **Austin Hankwitz (@AustinHankwitz):** YouTube Shorts are tiny. Top: "Explained: Refinancing Your Mortgage", 85,982 views (breakout 713.5, only because his median is about 120 views). His audience is on TikTok and IG, so YouTube is not representative. Notable number titles: "We Spent $40K on Vending Machines Around Nashville", "Feastables on track to deliver $200M in revenue in 2023…".
- **WhiteBoard Finance (@WhiteboardFinance):** Shorts top out at 19,706 ("2025 Market Crash? The $9.2 TRILLION Debt Problem No One Is Talking About"). **The whiteboard explainer works long-form but does not translate into Shorts reach.** News-reactive macro Shorts underperform.
- **The Budget Mom (@TheBudgetMom):** top 420,496 "CSL Plasma" (sponsored, 787 likes). Best organic: "My September Paycheck Budget", 101,176 (9.35x). **"Stuffing September Cash Envelopes" got 18,157 views.** *Implication: pure cash-stuffing process content is not a reach engine on YouTube Shorts for this creator. The "envelope" brand should lean on the math/estimation meaning for reach and use cash-envelope visuals as texture.* This is one creator, so it is a weak signal; see the sibling IG/TikTok file for #cashstuffing on other platforms.
- **Minority Mindset (@MinorityMindset), substitute for Jaspreet Singh:** vidIQ returned only 2022–23 Shorts, top 131,204 ("The Real SECRET of Financial Freedom!"). Web: about 2.25M subscribers. Shorts are clearly not his engine, or vidIQ's index is incomplete. Useful title: "How Much Money Do YOU Need to RETIRE TODAY?" (48K).

---

## Cross-creator comparison

### A. Title and hook formulas that recur among the biggest hits

| Formula | Evidence (views, breakout) | Math-driven? |
|---|---|---|
| **"How Much Money [famous person / job] Makes/Spends"** | Graham: Michael Reeves Spends 46.3M; MrBeast 30.9M + 11.4M (27x); Island Boys 8.0M (26.7x); Bobby Lee 4.6M (59.9x). Caleb: Former Employee 17.1M; Food Servers 13.7M; Copywriters 8.9M; Twitch Streamers 8.5M. Tilbury: Gordon Ramsey 19.6M; "How I Make $100,000+ Per Week" 49.7M | Yes, the income-estimation kind (Fermi-able) |
| **Scale/magnitude ladder** ("$1 to $1 Sextillion", "$1M to $1 Trillion", "Spending $100B in 40 Seconds") | Tilbury 40.9M (11.91x), 20.2M, 15.3M; Humphrey Yang rice-grain $1B (2 TikToks, 2.2M combined in 2020, Business Today/Fortune) | **Pure math** |
| **"How long does it take X to make $Y"** (rate × time) | Tilbury companies-to-$1M 23.0M; "Making $1 Every Second" 15.3M | **Pure math** |
| **Cost vs Price teardown** (unit economics of an everyday item) | Tilbury Big Mac 29.4M (11.55x), Nutella 15.2M; Sharan Indigo saves ₹400 Cr 8.1M; Tilbury Free Extra Fries 25.8M | **Pure math** |
| **"What if everyone / What if I gave you $X?"** (hypothetical economy) | Tilbury everyone gets $1B 37.1M (7.13x); $100,000,000 15.4M; lottery: Tilbury 17.9M, YRBFF 11.8M; Money Guy "Imagine Inheriting THIS" 1.15M (26.7x) | Yes |
| **Two-path compounding skit** (saver vs spender, early vs late) | Sharan 69.8M; Mr Planktin 9.06M (153x) + follow-up 1.7M in about 3 weeks | **Pure math** |
| **Outrage number** (APR, debt, wasteful spend) | Caleb 900% APR PS5 9.2M; 700% loans 8.4M; $120k in a year 12.8M; $500k Pokemon 14.5M | Yes (APR math) |
| **Tax-bill shock / how the rich avoid tax** | Graham Steve Harvey $22M 13.3M; Beast Games $5M tax 4.8M (16x); Tilbury rich avoid tax 13.7M and billionaires 13.0M; Money Guy private chef write-off 6.2M (272x) | Medium |
| **"Is $X enough?" / benchmark by age** | Money Guy $3M retire 1.32M (30.5x) + 687K (42.5x); Nischa Signs you're doing well 4.0M (12.4x); net worth by age 375K | Yes |
| **Fine print / "they don't want you to know"** | Erika Kullberg Nike 44.1M (web); Sharan hospitals 29.4M, banks 7.7M; Tilbury brands manipulate 29.4M, ban cash 19.6M; YRBFF pink tax 2.5M, Starbucks bank 1.8M | Can be made mathy |
| **Copyable system / routine** | Nischa payday routine 4.4M (19.5x); Budget Mom paycheck budget 101K | Light |

### B. Number devices that recur

1. **A precise, slightly odd price as the anchor** ($5.29 Big Mac, $78 Tesla), followed by a **running tally** that ends on a total.
2. **Round power-of-ten targets** ($1M, $1B, $1 trillion, $1 sextillion, ₹1 crore): the "ladder".
3. **Rate conversions:** per week, per second, per month, per year ("$100,000+ Per Week", "$1 Every Second", "$10,000 Per Month", "$120,000 in ONE YEAR").
4. **Two final numbers side by side** (₹5 Cr vs ₹11.5 Cr; $0 vs about $6,000). The contrast *is* the payoff.
5. **A time box in the title** ("in 40 Seconds", "in ONE YEAR", "for 10 years") that sets a promise or countdown.
6. **Leaving the last subtraction to the viewer** (Big Mac margin never stated) or **cutting off before the final number** (Planktin). Both drive comments and loops.
7. **Extreme percentages** (900% APR, 700%).

### C. Formats and production

- **Durations:**
  - The biggest math hits run **17–49 s** (Tilbury). Skits run 35–61 s (Sharan, Planktin).
  - Very short works when the number is the whole joke: 17 s "Making $1 Every Second" (15.3M); 18 s "$78 Tesla" (12.3M); 18 s "Former Employee" (17.1M); 11 s "credit cards until 1974" (3.5M).
- **Faces:** most mega-hits use a face (Tilbury's character, Graham and Caleb's clips, Sharan's skits). The **faceless proof point is Mr Planktin's animated compounding Short (9.06M, 153x)**. Tilbury's math Shorts get their hook from the number, not the personality (visuals unverified).
- **Series and re-uploads:** Tilbury runs "Cost vs Price: X" as a series (29.4M, 15.2M) and re-uploads proven skits (pen: 59.4M, then 21.9M). Graham re-cut MrBeast-income (30.9M, then 11.4M). Planktin made "Compound interest explained" a sequel (1.7M in about 3 weeks).
- **Engagement mechanics:**
  - Planktin's "Like = Cybertruck / Subscribe = Lambo / comment a heart" interlude (0.096% comment rate)
  - Sharan's "check the caption below"
  - Caleb's judgment bait (0.22% comment rate on "Fiance BEGS Partner to Stop Spending Money on TRAVEL")
- **Like rates on organic math hits** fall between about 1.9% and 4.3%. Below about 0.3% means a paid or boosted view count.

### D. Which are the most math-driven, ranked by evidence strength

1. **Scale/magnitude ladders**, including "how long to make $X". Highest breakout in the set's math content (11.91x at 40.9M).
2. **Cost vs Price unit-economics teardown.** 11.55x at 29.4M. Already a series.
3. **Two-path compounding story.** The single biggest finance-math Short in the set (69.8M) and the biggest breakout (153x, faceless).
4. **Celebrity/job income estimation** ("How much does X make"). The most replicated formula across creators.
5. **What-if-everyone hypothetical economics.** 37.1M.
6. **APR/debt outrage math.** 8–9M per Short, with very high comment rates.
7. **Benchmark / "Is $X enough?"** Mid reach, very high breakout (30–42x).
8. **Tax-bill shock math.** 4.8–13.3M.

### E. What did NOT travel on YouTube Shorts in this sample

- Whiteboard macro/news explainers (WhiteBoard Finance, at most 19.7K).
- Generic "X habits" lists from long-form-first creators (Minority Mindset at most 131K).
- Pure cash-stuffing process videos (Budget Mom, 18K).
- Nischa's own $10k-compounding explainers (65K) against her routine Shorts (4.4M).

The lesson: **the math must be wrapped in a story, a famous object, a famous person, or an absurd scale.** A neutral explanation does not travel on Shorts.

---

## Top 14 examples (finance-math relevant, ranked by views)

| Rank | Creator | Title | Views | Breakout | Dur | URL |
|---|---|---|---|---|---|---|
| 1 | Finance With Sharan | Why You Should Invest Early | 69,845,216 | n/a | 48s | https://www.youtube.com/shorts/sU9SFT1nAOw |
| 2 | Mark Tilbury | How I Make $100,000+ Per Week | 49,730,618 | 4.55 | 43s | https://www.youtube.com/shorts/YHe1OlCXZt8 |
| 3 | Mark Tilbury | Spending $100 BILLION in 40 Seconds | 40,927,810 | 11.91 | 49s | https://www.youtube.com/shorts/zWWzd4TWIV8 |
| 4 | Mark Tilbury | What if everyone got $1 billion? 😳 | 37,091,106 | 7.13 | 30s | https://www.youtube.com/shorts/FIdnR2Vcf3o |
| 5 | Graham Stephan | MrBeast Reveals How Much Money He Makes! | 30,928,778 | 5.37 | 32s | https://www.youtube.com/shorts/tZ9RS4s7_ws |
| 6 | Mark Tilbury | Cost vs Price: McDonald's Big Mac | 29,408,278 | 11.55 | 30s | https://www.youtube.com/shorts/nWXP8rHErQc |
| 7 | Mark Tilbury | How Long Does It Take For These Companies To Make $1 Million? | 22,963,921 | 4.24 | 26s | https://www.youtube.com/shorts/EqB0MNwSfXs |
| 8 | Finance With Sharan | The Last ₹1 Crore Plan | 21,941,178 | n/a | 35s | https://www.youtube.com/shorts/gm3ITLOJkFc |
| 9 | Mark Tilbury | $1 to $1 Sextillion 😅 | 20,193,818 | 2.85 | 44s | https://www.youtube.com/shorts/lXBtU0uYOXI |
| 10 | Caleb Hammer | She Purchased 3 Gas Stations For $3 MILLION | 16,595,335 | 9.16 | 50s | https://www.youtube.com/shorts/wKP_FneSLYM |
| 11 | Mark Tilbury | Making $1 Every Second ($1M to $1 Trillion) | 15,347,851 | 4.82 | 17s | https://www.youtube.com/shorts/-pqKQqr25VM |
| 12 | Caleb Hammer | How Much Money Food Servers Make With Tips | 13,699,887 | n/a | 59s | https://www.youtube.com/shorts/OY0xewFZg7Q |
| 13 | Mr Planktin | Compound interest explained 😂 | 9,059,331 | 153.15 | 61s | https://www.youtube.com/shorts/rrpn3zo2Slo |
| 14 | The Money Guy Show | Private Chef Every Night as a Tax Write-Off? - Financial Advisors React | 6,195,245 | 272.45 | 36s | https://www.youtube.com/shorts/LcaiiOGG3SY |

## Raw notes for the next step (replication ideas are only listed here, not developed)

- The highest-leverage faceless math formats: **scale ladder**, **cost vs price teardown**, **rate × time ("how long to make $X")**, **two-path compounding story**, **income estimation of a famous person or job**, and the **what-if-everyone hypothetical**. Each has at least one 15M+ Short with no evidence that a face is required for the math part.
- **"Envelope" angle:** Big Mac shows the template. Put a known price on the envelope, write each line item down, apply a "hidden costs" twist, and leave the final subtraction for the viewer. That is literally back-of-the-envelope math on camera.
- **Data hygiene:** treat Shorts with a like rate below about 0.3% as paid. Several "top" Shorts from YourRichBFF, Nischa (Dropbox) and The Budget Mom (CSL Plasma) are sponsored.

## Web sources used

- Business Today, "TikTok user uses rice to show Jeff Bezos' enormous wealth": https://businesstoday.in/latest/trends/tiktok-user-uses-rice-to-show-jeff-bezos-enormous-wealth/story/397321.html
- Fortune (2020-03-21), TikTok finance influencers: https://fortune.com/2020/03/21/tik-tok-influencers-personal-finance-advice
- NBC News, "How a lawyer's advice on reading the fine print became an unintended TikTok meme": https://www.nbcnews.com/pop-culture/viral/lawyers-advice-reading-fine-print-became-unintentional-tiktok-meme-rcna4891
- OutlierKit (search snippet only; the site is egress-blocked): https://outlierkit.com/channel/humphrey
- Brian Feroldi channel stats (search snippets): https://creatordb.app/creatorstats/brianferoldi/ and https://brianferoldi.substack.com/about
- Minority Mindset subscriber count (search snippet): https://vidiq.com/youtube-stats/channel/UCT3EznhW_CNFcfOlyDNTLLw
