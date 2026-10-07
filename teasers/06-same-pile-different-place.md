## 6. Same Pile, Different Place (Fixed-Input Countdown)

**Series:** *Same Pile* · **Lane:** Envelope (25–45 s), cut at 30–32 s for Shorts (29.9 / 30.9 / 31.9 s) · **Writer brief:** hold one amount fixed, change one variable per beat (country, decade, job), and put the extreme case last.
**Specs:** `engine/specs/06-same-pile-different-place-{a,b,c}.json` · **Contact sheets:** `engine/out/sheets/06-same-pile-different-place-{a,b,c}.png` · **Math check:** `teasers/06-same-pile-different-place-mathcheck.py`
**Date:** 2026-10-07. The writer checked every real-world input by WebSearch on this date; links and publication dates are under each teaser. The QA pass could not re-run those searches (see the Verification log at the end).

---

### Why it goes viral

**The mechanism.** One number stays fixed and only one thing changes per beat, so each beat can be compared at a glance with no explanation. The brain treats it as a ranking and wants to see the last item. Viewers place themselves in the list ("where's my country / my year / my job?"), so the format earns identity comments. People also comment "you forgot X" or "that's not my rate", and expats and friends share it. Flags, years and job emoji need no language, so a new channel's seed audience can be global from the first post (`research/02-top-10-approaches.md` §6; `research/raw/yt-personal-money-math.md` P2 "constant-input comparison lists").

**The evidence** (from `research/02-top-10-approaches.md` §6 and `research/raw/*`):

| Creator (subs) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| RealEstate with AJ (14.8K) | what you get after Taxes hit your pocket 🌎 | 22,816,685 | **17,564.8x** (largest breakout in the whole corpus; 1,542 views per sub) | 31 s | watched + transcript | https://www.youtube.com/shorts/3EQfIGdT54E |
| Mark Tilbury (~8.9M) | How Long Does It Take For These Companies To Make $1 Million? | 22,963,921 | 4.24x | 26 s | inferred | https://www.youtube.com/shorts/EqB0MNwSfXs |
| AR World (5.07K) | Mitch McConnell earns $193,000 per year #shorts | 1,463,241 | 24.0x | 6 s | inferred | https://www.youtube.com/shorts/zSFVFAB5g2E |
| Wage Per Hour (4.9K) | Drain cleaner wage per hour #fyp #foryou #viral | 843,623 | 125.8x | 61 s | inferred (series) | https://www.youtube.com/shorts/79-AczbfbYc |
| Silicon Mountain Media (9.71K) | What 1GB of RAM Cost Every Year 📉📈 1980 to 2026 | 647,421 | 44.7x | 31 s | inferred | https://www.youtube.com/shorts/5KpJov0U-Ro |
| Monarch (4.9K) | What $1 Million by 65 Looks Like at Every Age | 381,675 | 18.89x | 40 s | inferred | https://www.youtube.com/shorts/qRmzEl-3aG8 |

The pattern holds for all three variables we use. **Place:** AJ's tax video (22.8M). **Time:** RAM cost by year (44.7x) and Monarch's age ladder (18.89x). **Job or company:** Tilbury's companies-to-$1M (23.0M), the wage-per-hour series (125.8x) and a politician's salary (24.0x). Most of these breakouts come from channels under 15K subscribers.

### How the originals do it

**1. RealEstate with AJ, "what you get after Taxes hit your pocket 🌎"** (22,816,685 views, 17,564.8x, 31 s; scene-by-scene in `research/watch/group2-video3.md`)
- *What it nails:*
  - The fixed input ("1 Million salary") and the first answer arrive together in the first 2 seconds.
  - The visual math is physical: the presenter peels the government's share off a cash stack.
  - The voice-over runs a call-and-response ("X% government's, Y% yours") with one country every 4–5 s.
  - Flags are the lower thirds.
  - A scripted interruption ("Excuse me, what about Singapore?") at about 60% puts the comment section on screen.
  - The extreme comes last: Dubai, "NO TAX", and the whole stack goes in his pocket.
- *What it misses:*
  - There is no stated basis. The currency is never named, and each country is a single percentage; "USA 26%" ignores state tax.
  - There is no loop; vidIQ's top fix was to make the last line lead back to "1 Million salary…".
  - It depends on a presenter and a street skit.
  - None of the arithmetic is shown.

**2. Mark Tilbury, "How Long Does It Take For These Companies To Make $1 Million?"** (22,963,921 views, 4.24x, 26 s; inferred, `research/raw/creator-catalogs.md`)
- *What it nails:* a round fixed target ($1M), famous nouns as the variable, and a countdown in a unit of time that escalates toward an absurd extreme.
- *What it misses:*
  - It is a big-channel hit (4.24x on about 8.9M subs), so it doesn't prove a new channel can do the same.
  - Like the rest of the cluster, it states the answer and never shows the division, which is the gap our brand exists to fill (format bible §1).

**3. Wage Per Hour, "Drain cleaner wage per hour"** (843,623 views, 125.8x, 61 s, 4.9K subs; inferred series)
- *What it nails:* a named series where the variable (the job) rotates. That is the "same template, new subject" engine that compounds follows and request comments (report 01 §3.10).
- *What it misses:* one job per episode means no countdown inside the video and no extreme payoff. At 61 s with no visible method, it relies on curiosity alone.

### The Envelope Math upgrade

**What we replicate:**
- The fixed pile appears in frame 1 and in the first spoken line.
- One variable changes per beat, every 2.2–3.2 s (the extreme gets a longer hold).
- Flags, years and job emoji act as language-free labels.
- The voice-over keeps a call-and-response rhythm ("Chile: seventy-one bucks…").
- A scripted interruption on masking tape ("Wait… the US?", "Wait… the President?") lands at 45–53%.
- The extreme comes last and gets a sting.

**What we improve:**
1. **One stated basis on an ASSUME: sticky**, taken from official tables (OECD Taxing Wages 2026, BLS CPI-U, BLS OEWS May 2025). This fixes AJ's biggest weakness (pitfall #1 in the approaches file).
2. **The working is the visual.** The formula stays on screen and only the variable is rewritten each beat (`$1,000 × 7.1% = $71` → `$1,000 × 18.1% = $181` …), so "only one thing changes" is literally true on screen.
3. **Honest rounding in envelopes.** The pile is ten envelopes, so every result rounds to an envelope count ("almost four", "nine of ten"). The exact figure goes in the pinned comment with "within Y%".
4. **A real loop.** The last line is a fragment that the first line completes ("All out of the…" → "Same thousand bucks of pay."). This was vidIQ's top fix for AJ.
5. **Faceless.** The envelope does what AJ's hands did: the red pen pulls, eats or fills envelopes.

**The uniquely-ours twist: "the pile is ten envelopes."**
- Every episode opens on the same ten manila envelopes, with the pile's value on a perforated **SAME PILE** postage stamp in the top-right corner. That stamp stays for the whole video as the fixed input.
- The variable then **pulls** envelopes (the taxman), **eats** them (inflation) or **fills** them (a paycheck). Each episode ends with a verdict stamp slammed onto the page.
- AJ's cash stack becomes something you can count and check, which is back-of-the-envelope maths done honestly.

**Series name:** **Same Pile**. **Title template:** `Same $[X], [N] [places | decades | jobs]: [question]? (Same Pile No. [n])`. The first spoken line always starts "Same [amount]…", and the last line always hands back to it.

**Envelope devices used** (format bible §3):
- Masking-tape hook.
- Postmark No. (06A/B/C).
- **Postage stamp** for the fixed input.
- The pile, drawn as 10 envelopes (`grid` with ✉️).
- **ASSUME: sticky**.
- Ballpoint working, with only the variable rewritten.
- **Napkin bars** (06A), **red-pen cross-outs** and a box (06B), and a hand-built **ladder** (06C).
- Red-pen circle on the extreme.
- Masking-tape interruption card.
- **Flip** to the reveal.
- **Verdict stamps:** `POSTAGE DUE` / `RETURN TO SENDER` / `FIRST CLASS`.

**Staying in lane:**
- No envelopes are filled by a budget split; that is #5.
- No sealed answer is guessed and opened; that is #7.
- The mechanic is always a countdown over one fixed input with the extreme last.
- Each episode also changes the *chart device* and adds original commentary (the twist line), not only the numbers. That avoids the "template-based bulk" drift flagged as pitfall #5 and by YouTube's Oct 2026 originality update.

**Verification note (applies to all three teasers):**
- This environment's proxy blocked direct page fetches of oecd.org and bls.gov. Every figure was therefore confirmed through WebSearch results that quote those official pages, cross-checked against a second figure where one was available. The cross-checks are listed under each teaser.
- **Before publishing, the producer should open the linked country notes and tables once and tick each number.** The US 2025 OECD figure (24.3%) is the one most worth re-opening; it is backed by a consistency check, not a second quote.
- **QA, 2026-10-07:** the independent QA pass could not re-verify any of these inputs online, because the shared WebSearch budget was exhausted and oecd.org, bls.gov, aflcio.org, taxfoundation.org and fred.stlouisfed.org were all blocked. It confirmed what it could from internal consistency and pre-2026 BLS data (see the Verification log). **The pre-publish tick is therefore mandatory for 06A and 06C, not optional.**

---

### Teasers

---

#### 06A: "Same $1,000 of pay, 6 countries: who taxes it most?" (Same Pile No. 1)

- **Topic:** taxes on a paycheck. **Variable:** country.
- **Lane:** Envelope, **29.9 s** (YT/IG master; AJ ran 31 s and Tilbury 26 s).
- **Spec:** `engine/specs/06-same-pile-different-place-a.json` · **Sheet:** `engine/out/sheets/06-same-pile-different-place-a.png`.

**Frame-1 hook**
- On screen, masking tape over the 10-envelope pile: **`Same $1,000 of pay,` / `6 countries:` / `who taxes it MOST?`** ("MOST" in red). Red pencil under the pile: `10 envelopes × $100`. A SAME PILE `$1K` stamp sits top right and postmark `No. 06A` top left. All of it is pre-rolled from −0.7 s, so frame 1 (the thumbnail) is fully drawn.
- First spoken line (0.15–1.75 s): **"Same thousand bucks of pay."**

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.35 | Hook | Tape hook, the full pile of ten envelopes and `10 envelopes × $100`, all complete in frame 1 |
| 3.4–5.45 | The rule | `$1,000 × tax rate` in ink; ASSUME sticky (bottom right, stays up 3.45–10.95 so the basis is readable while the first answers land) |
| 5.45–8.3 | 🇨🇱 Chile | `$1,000 ×` stays fixed and only `7.1% = $71` is written; bar 1 grows. **First partial payoff at 6.2 s (21%)** |
| 8.3–10.95 | 🇨🇭 Switzerland | `18.1% = $181`; bar 2 |
| 10.95–13.5 | 🇬🇧 UK | `23.1% = $231`; bar 3 |
| 13.5–17.4 | **Interruption** (45%) | Tape slaps in: `Wait… the US?` (13.5–15.2), then 🇺🇸 USA `24.3% = $243`; bar 4 |
| 17.4–20.0 | 🇩🇪 Germany | `38.7% = $387`; bar 5 jumps |
| 20.0–24.0 | **Extreme** | Pencil tease `the highest of all 38?`, then 🇧🇪 Belgium in red (21.65); `39.5% = $395` (22.4); red bar 6; red circle on `$395` (23.0) |
| 24.0 | Flip | |
| 24.35–27.9 | The pull | `$395 ÷ $71 ≈ 5½×` (24.35); the pile returns (25.0); the red pen crosses out 4 envelopes (26.3–27.05) |
| 27.9–28.9 | **Hero** (last 2 s) | `🇧🇪 ≈ 4 of 10 ✉` in big red |
| 28.3 | Verdict | `POSTAGE DUE` stamp slams in under it (thump and shake) |
| 28.25–29.9 | Loop | "All out of the…" runs straight into frame 1, "Same thousand bucks of pay." |

**Full voice-over** (captions use the same lines and timings)
> Same thousand bucks of pay. Six countries. Who taxes it most?
> Same rule: income tax plus social security.
> Chile: seventy-one bucks. Not even one envelope.
> Switzerland: one eighty-one. Under two envelopes.
> The UK: two thirty-one.
> *Wait, what about the US?* Two forty-three. Just under the OECD average.
> Then Germany jumps to three eighty-seven.
> And the highest of all thirty-eight? Belgium. Three ninety-five.
> Five and a half times Chile's cut.
> That's almost four envelopes out of ten.
> All out of the…

**The envelope math** (3 handwritten lines)
1. `$1,000 × tax rate`, rewritten each beat with only the rate changing: `× 7.1% = $71`, `× 18.1% = $181`, `× 23.1% = $231`, `× 24.3% = $243`, `× 38.7% = $387`, `× 39.5% = $395`
2. `$395 ÷ $71 ≈ 5½×` (exact 5.563, so the envelope is 1.14% off)
3. `🇧🇪 ≈ 4 of 10 ✉` (exact 3.95 envelopes, 1.27% off; the red pen crosses out exactly 4)

**ASSUME sticky:** *average-wage single worker, no kids · income tax + employee social security · OECD, 2025*

**Sources** (all checked by WebSearch on 2026-10-07)
- OECD (2026), *Taxing Wages 2026*, published 22 Apr 2026. It covers 2025 and reports the net personal average tax rate (income tax + employee SSC − cash benefits, % of gross wage) for a single worker without children at 100% of the average wage.
  - Overview: https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/overview_d93131c3.html. It gives the highest rates as Belgium 39.5%, Germany and Lithuania 38.7%; the lowest as Colombia 0.0%, Chile 7.1%, Costa Rica 9.8%, Mexico 13.2%; and the OECD average as 25.1%.
  - Release date: https://www.oecd.org/en/about/news/media-advisories/2026/04/oecd-to-release-taxing-wages-2026-on-wednesday-22-april.html
- Belgium 39.5%: https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/04/taxing-wages-2026-country-notes_491a0e97/belgium_2c42d1fc/f118830f-en.pdf
- Germany 38.7% (3rd highest): https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/04/taxing-wages-2026-country-notes_491a0e97/germany_649f0784/ca03c391-en.pdf
- UK 23.1% (take-home 76.9%, consistent): https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/united-kingdom-2025-2026-income-tax-year_98c92486.html
- Switzerland 18.1% (6th lowest): https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/04/taxing-wages-2026-country-notes_491a0e97/switzerland_2025165d/61078ba6-en.pdf
- Ranking cross-check: Korea 16.5% is "5th lowest", so Colombia, Chile, Costa Rica and Mexico sit below it, matching the overview. https://www.oecd.org/content/dam/oecd/en/publications/reports/2026/04/taxing-wages-2026-country-notes_491a0e97/korea_3ee85311/2d807492-en.pdf
- USA 24.3%: https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/united-states_4899032e.html
  - Cross-checks: the 2025 tax wedge is 30.0% (−0.09 pp), split as 15.4% income tax + 7.1% employee SSC + 7.5% employer SSC of labour cost, which gives (15.4 + 7.1)/(100 − 7.5) = 24.32% of gross (Tax Foundation, https://taxfoundation.org/publications/tax-burden-on-labor-in-the-oecd/).
  - The 2024 value was 24.4%: https://www.oecd.org/content/dam/oecd/en/publications/reports/2025/04/taxing-wages-2025-country-notes_16d47563/united-states_e44f6362/4a2a60b9-en.pdf
  - **Re-open the US table before publishing.**

**Ending**
- **Loop line:** "All out of the…", which flows into frame 1, "Same thousand bucks of pay."
- **Comment bait (a genuine question):** caption line 1 is *"Where does your country land? We'll pull its envelopes next."*
- **Taggable person:** "send this to the friend who keeps threatening to move abroad."
- **Pinned comment:**
  > Exact: Belgium's taxman takes $395 of every $1,000 an average single worker earns; Chile's takes $71. That's 5.56× (envelope said ≈ 5½×, within 1.2%; "≈ 4 of 10 envelopes" vs exact 3.95, within 1.3%). US: $243, just under the OECD average of $251. Assumptions: OECD Taxing Wages 2026 (2025 data), single, no kids, average wage, income tax + employee social security, net of cash benefits; each country's rate is for its own average-wage worker, applied to the same $1,000. Chile's 10% private-pension deposit counts as a non-tax payment in OECD's books, so it isn't in the 7.1%. Sources in the description. Want yours? Comment your country.

**Description**
> Same $1,000 of pay, 6 countries: who taxes it most? (Same Pile No. 1) — the OECD's 2025 numbers for an average single worker: income tax plus employee social security, out of the same $1,000. Chile $71 · Switzerland $181 · UK $231 · USA $243 · Germany $387 · Belgium $395. Source: OECD (2026), Taxing Wages 2026, published 22 Apr 2026. Overview: https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/overview_d93131c3.html · US: https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/united-states_4899032e.html · UK: https://www.oecd.org/en/publications/taxing-wages-2026_3a5169ef-en/full-report/united-kingdom-2025-2026-income-tax-year_98c92486.html · plus the OECD Taxing Wages 2026 country notes for Belgium, Germany and Switzerland. Educational math, not financial advice.
> #taxes #paycheck #envelopemath #moneyfacts #personalfinance

**Platform notes**
- **YT Shorts:** post the 29.9 s master. The title matches the tape hook. The loop fragment makes replays seamless (every start and replay counts as a view). No outro card. Pin the exact-figures comment.
- **IG Reels (~45 s cut):**
  - Add two beats that are already verified: 🇲🇽 Mexico $132 after Chile and 🇯🇵 Japan $226 before the UK.
  - Hold the POSTAGE DUE frame for 1.5 s.
  - The caption opens with the question. Use 5 hashtags at most.
  - Run it as a Trial Reel to non-followers first. The "friend moving abroad" line is there to drive sends, Instagram's top non-follower signal.
- **TikTok (~65 s cut, past 60 s for Creator Rewards):**
  - Add Mexico, Korea ($165), Japan and Lithuania (tied with Germany at $387: "a tie for silver").
  - Then add a second pass that reverses the order ("who keeps the most?").
  - No sponsor (TikTok bans branded financial content).
- **All platforms:** keep the tone neutral. It shows arithmetic and makes no judgement on any government, to avoid the "political hostility" pitfall.

**Why this one should travel**
- It is the format with the strongest evidence, AJ's 17,564.8x breakout, rebuilt without his weaknesses: one stated official basis, visible working and a real loop.
- Flags and dollar figures need no translation, which is how AJ reached 1,542 views per subscriber.
- The interruption is the comment section's own question for a US audience ("what about the US?").
- The ranking gives two honest things to argue about, without any wrong numbers:
  - Germany vs Belgium is within $8.
  - Chile's pension contributions are a contestable classification, flagged in the pinned comment.

---

#### 06B: "Same $1,000 cash, 6 decades: what did inflation eat?" (Same Pile No. 2)

- **Topic:** inflation and cash savings, the whitespace no one is doing the maths for: the cash-stuffing culture with about 1.9B #cashstuffing views (report 01 §6, gap 3). **Variable:** the decade you stuffed the envelope.
- **Lane:** Envelope, **30.9 s**.
- **Spec:** `engine/specs/06-same-pile-different-place-b.json` · **Sheet:** `engine/out/sheets/06-same-pile-different-place-b.png`.

**Frame-1 hook**
- On screen, tape: **`Same $1,000 cash,` / `6 decades:` / `what did INFLATION eat?`** ("INFLATION" in red). The pile of 10 envelopes sits underneath with `10 envelopes × $100` in red. SAME PILE `$1K` stamp and postmark `No. 06B`. All of it is pre-rolled, so frame 1 is fully drawn.
- First spoken line (0.15–1.9 s): **"Same thousand bucks in cash. Six decades."**

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.45 | Hook | Tape hook, the full pile and `10 envelopes × $100`, all complete in frame 1 |
| 3.5–6.75 | The rule | ASSUME sticky (header zone, 3.25 s); `$1,000 × CPI then ÷ CPI now` (3.7); `= what it buys, in then-dollars` (5.0, fully written by 6.0) |
| 6.75–9.8 | 2016 | `stuffed in` stays fixed and only the year is written (`2016`); `buys 28% less` (7.85); `= what $719 bought in 2016` (8.25, done 9.1); red pen crosses 3 envelopes (8.7–9.1). **First partial payoff at 7.85 s (25%)** |
| 9.8–12.5 | 2006 | `2006`; `buys 39% less`; `$609`; cross #4 (11.4) |
| 12.5–15.7 | **Pattern break** (46%) | `1996`; `buys 53% less`; `$470`; cross #5 (14.1), so the whole bottom row is gone; **red box around the bottom row** (14.5): "Half the pile, gone." |
| 15.7–18.6 | 1986 | `1986`; `buys 67% less`; `$327`; crosses #6 and #7 |
| 18.6–21.4 | 1976 | `1976`; `buys 83% less`; `$171`; cross #8 |
| 21.4–25.4 | **Extreme** | "And 1966?" with the year written slowly in red (21.5–22.3); then `buys 90% less` (23.2); `= what $98 bought in 1966`; cross #9 (24.0); **red circle on the one surviving envelope** (24.5) |
| 25.4–28.98 | Envelope math | `prices: 335 ÷ 32.7 ≈ 10×` (25.5); **`$1,000 ÷ 10 ≈ $100`** in red (27.85; the `$100` completes at 28.98, inside the last 2 s) |
| 29.1 | Verdict | `RETURN TO SENDER` stamp slams in the header zone |
| 29.1–30.9 | Loop | "And the envelope still holds the…" runs into frame 1, "Same thousand bucks in cash." |

**Full voice-over**
> Same thousand bucks in cash. Six decades. What did inflation eat?
> Opened today. Only the year you stuffed it changes.
> 2016? It buys twenty-eight percent less. Three envelopes, gone.
> 2006? Thirty-nine percent less. Four.
> 1996? Fifty-three percent. Half the pile, gone.
> 1986? Sixty-seven percent. Seven envelopes.
> 1976? Eighty-three. Eight envelopes.
> And 1966? … Ninety percent. Nine of ten envelopes, eaten.
> Prices are ten times higher. So your grand buys a hundred.
> And the envelope still holds the…

**The envelope math** (3 handwritten lines)
1. `$1,000 × CPI then ÷ CPI now`, the rule applied each beat: `$719 · $609 · $470 · $327 · $171 · $98`
2. `prices: 335 ÷ 32.7 ≈ 10×` (exact 334.980 ÷ 32.7 = 10.244)
3. `$1,000 ÷ 10 ≈ $100` (exact $97.62; the envelope is 2.44% off)

**ASSUME sticky:** *US CPI-U · August of each year vs Aug 2026 · cash earns 0%*

**Sources** (all checked by WebSearch on 2026-10-07)
- **August 2026 CPI-U 334.980** (1982–84 = 100, NSA, +3.4% year on year): BLS CPI news release, 11 Sep 2026, https://www.bls.gov/news.release/archives/cpi_09112026.htm. Corroborated by https://cpiinflationcalculator.com/the-consumer-price-index-rises-0-4-in-august-2026-seasonally-adjusted-and-holds-at-3-4-annually/.
- **August 2016 CPI-U 240.849:** BLS CPI news release, 16 Sep 2016, https://www.bls.gov/news.release/archives/cpi_09162016.pdf
- **August 2006 203.9, August 1996 157.3, August 1986 109.7, August 1976 57.4:** BLS historical CPI-U table (U.S. city average, all items), https://www.bls.gov/regions/mid-atlantic/data/consumerpriceindexhistorical_us_table.htm
- **August 1966 32.7** (1966 annual average 32.4): BLS historical CPI-U monthly table, https://www.bls.gov/cpi/tables/supplemental-files/historical-cpi-u-202402.pdf

**Ending**
- **Loop line:** "And the envelope still holds the…", which flows into frame 1, "Same thousand bucks in cash."
- **Comment bait:** caption line 1 is *"What year would you have stuffed it? We'll open that envelope next."*
- **Taggable person:** "send this to the grandparent with the coffee-can savings."
- **Pinned comment:**
  > Exact: $1,000 stuffed in August 1966 now buys what $97.62 bought then (envelope said ≈ $100, within 2.5%). Prices are 10.24× higher (CPI-U Aug 2026 334.980 vs Aug 1966 32.7), so matching 1966's $1,000 today takes $10,244. 2016 $719 · 2006 $609 · 1996 $470 · 1986 $327 · 1976 $171. Assumptions: BLS CPI-U, U.S. city average, all items, not seasonally adjusted, August each year; cash earns 0%. Sources in the description. What year would you have stuffed it?

**Description**
> Same $1,000 cash, 6 decades: what did inflation eat? (Same Pile No. 2) — the same ten envelopes, opened in August 2026, priced in the year they were stuffed. 2016: −28% · 2006: −39% · 1996: −53% · 1986: −67% · 1976: −83% · 1966: −90%. Source: BLS CPI-U, U.S. city average, all items, NSA. Aug 2026 (release of 11 Sep 2026): https://www.bls.gov/news.release/archives/cpi_09112026.htm · Aug 2016: https://www.bls.gov/news.release/archives/cpi_09162016.pdf · 1976–2006: https://www.bls.gov/regions/mid-atlantic/data/consumerpriceindexhistorical_us_table.htm · 1966: https://www.bls.gov/cpi/tables/supplemental-files/historical-cpi-u-202402.pdf. Educational math, not financial advice.
> #inflation #cashstuffing #envelopemath #moneyfacts #savings

**Platform notes**
- **YT Shorts:** post the 30.9 s master. "1966" is held as a mini-cliffhanger for 1.5 s, and the hero `$100` completes inside the last 2 s. Loop fragment. Pin the exact figures.
- **IG Reels (~45 s):**
  - Add a second pass after the stamp: "Flip it: what would you need today?" `2016 → $1,391 · 1996 → $2,130 · 1966 → $10,244` (all in the math check).
  - The caption opens with the year question. Use #cashstuffing for the cash-envelope community.
- **TikTok (~65 s):**
  - Run the full second pass for all six years ($1,391 / $1,643 / $2,130 / $3,054 / $5,836 / $10,244).
  - End on "and the envelope still holds the…" for the loop.
  - The cash-stuffing audience is native to TikTok, so it can be posted as a stitchable "do the math on your envelopes" prompt.

**Why this one should travel**
- It joins two proven signals: the year-by-year price ticker (Silicon Mountain's RAM by year, 44.7x) and inflation nostalgia (Monarch's then-vs-now groceries, 3.7M, 603x, watched).
- It aims them at the whitespace the research names: #cashstuffing has about 1.9B views, and *"nobody computes … inflation's drag on cash."*
- The ten envelopes are the meme's own prop, so the video lands with that community.
- The cross-outs grow every beat and the bottom row falls exactly at the halfway mark, which gives a pattern break built into the data.
- The "pick your year" question draws identity comments.

---

#### 06C: "Same $1 million, 6 jobs: how long to earn it?" (Same Pile No. 3)

- **Topic:** pay and careers. **Variable:** job.
- **Lane:** Envelope, **31.9 s**.
- **Spec:** `engine/specs/06-same-pile-different-place-c.json` · **Sheet:** `engine/out/sheets/06-same-pile-different-place-c.png`.

**Frame-1 hook**
- On screen, tape: **`Same $1 million,` / `6 jobs: how long` / `to EARN it?`** ("EARN" in red). The pile of 10 envelopes sits underneath with `10 envelopes × $100K`. SAME PILE `$1M` stamp and postmark `No. 06C`. All of it is pre-rolled, so frame 1 is fully drawn.
- First spoken line (0.15–1.7 s): **"Same million bucks. Six jobs."**

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.1 | Hook | Tape hook, the full pile and `10 envelopes × $100K`, all complete in frame 1 |
| 3.15–5.6 | The rule | `$1,000,000 ÷ a year's pay`; ASSUME sticky (3.2–8.95, so it stays up through rung 1) |
| 5.65 | Header | `time to earn $1M:` |
| 5.75–8.95 | ⏰ Minimum wage | Rung 1, `$7.25 × 2,080 hrs = $15,080` in red, then **`66.3 yrs`** (7.0). **First partial payoff at 7.0 s (22%)** |
| 8.95–11.65 | 🍎 HS teacher | `$72,040 a year` ··· `13.9 yrs` |
| 11.65–14.25 | 🩺 Nurse (RN) | `$97,550 a year` ··· `10.3 yrs` |
| 14.25–16.85 | 💻 Software dev | `$135,980 a year` ··· `7.4 yrs` |
| 16.85–21.3 | **Interruption** (53%) | Tape slaps in where rung 5 will go: `Wait… the President?` (16.85–18.3), then 🏛️ US President `$400,000 a year, by law` ··· `2.5 yrs` |
| 21.3–24.9 | **Extreme** | 💼 S&P 500 CEO `$22.8M a year, excl. Musk` ··· a 1.6 s hold ··· **`16 days`** in big red (22.9), red circle (23.6) |
| 24.9 | Flip | |
| 25.2–28.3 | The fill | `$22.8M ÷ 365 ≈ $62K a day`; the pile fills envelope by envelope (26.2–27.7); `all 10 ✉ in 16 days` in red (27.3) |
| 27.9 | Verdict | `FIRST CLASS` stamp slams onto the full pile |
| 28.35–30.35 | **Contrast hero** (last 2 s) | `min. wage: 1 ✉ ≈ 6.6 yrs` in red, written 29.0–30.2 |
| 30.4–31.9 | Loop | "Still chasing the…" runs into frame 1, "Same million bucks." |

**Full voice-over**
> Same million bucks. Six jobs. How long to earn it?
> Divide by a year's pay. Full-time, before tax.
> Federal minimum wage: sixty-six years. Longer than a career.
> A high school teacher: about fourteen.
> A nurse: just over ten.
> A software developer: just over seven.
> *Wait, what about the President?* Four hundred grand, set by law. Two and a half years.
> And the average S&P 500 CEO? … Sixteen days.
> Sixty-two grand a day. An envelope every thirty-eight hours.
> Minimum wage: six point six years for one.
> Still chasing the…

**The envelope math** (3 handwritten lines)
1. `$1,000,000 ÷ a year's pay`, applied on each rung: 66.3 / 13.9 / 10.3 / 7.4 / 2.5 years / 16 days (min wage first annualised as `$7.25 × 2,080 hrs = $15,080`)
2. `$22.8M ÷ 365 ≈ $62K a day` (exact $62,465.75), so one $100K envelope every 38.4 hours and all 10 in 16.01 days
3. `min. wage: 1 ✉ ≈ 6.6 yrs` (`$100K ÷ $15,080` = 6.631, 0.47% off). After the flip the screen holds exactly these three lines; the old fourth line, `($100K ÷ $15,080 a year)`, was cut.

**ASSUME sticky:** *full-time, before tax · BLS medians, May 2025 · CEO: S&P 500 average, 2025 (AFL-CIO)*. The "excl. Musk" qualifier now sits on the CEO rung itself.

**Sources** (all checked by WebSearch on 2026-10-07)
- **BLS OEWS May 2025** (released 15 May 2026; all-occupation median $50,980): https://www.bls.gov/news.release/ocwage.htm
- **High school teachers, median $72,040 (May 2025):** BLS Occupational Outlook Handbook, https://www.bls.gov/ooh/education-training-and-library/high-school-teachers.htm
- **Registered nurses, median $97,550 (May 2025):** https://www.bls.gov/ooh/healthcare/registered-nurses.htm (corroborated by Becker's, https://www.beckershospitalreview.com/compensation-issues/median-pay-for-42-hospital-jobs/)
- **Software developers, median $135,980 (May 2025):** https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm
- **Federal minimum wage $7.25/hr, unchanged since 24 Jul 2009:** U.S. DOL, https://www.dol.gov/agencies/whd/minimum-wage/faq and https://www.dol.gov/newsroom/releases/esa/esa20090716. Still current in 2026 per https://onpay.com/insights/minimum-wage-by-state-summary/. Full-time = 40 h × 52 wk = 2,080 h.
- **US President $400,000 a year** (3 U.S.C. §102, effective 20 Jan 2001, P.L. 106-58): CRS RS20115, https://www.everycrsreport.com/reports/RS20115.html, and https://federal-regs.com/uscode/title-3/102/
- **Average S&P 500 CEO pay 2025, $22.8M** (excluding Elon Musk; $340.1M including him): AFL-CIO Executive Paywatch 2026, Aug 2026.
  - https://aflcio.org/press/releases/afl-cio-report-shows-top-ceos-made-312-times-workers-pay-2025
  - https://aflcio.org/2026/8/13/12-things-you-need-know-afl-cios-2026-executive-paywatch-report
  - Corroborated: https://www.peoplematters.in/news/compensation-benefits/average-ceo-pay-climbs-to-dollar228-million-amid-rise-of-mega-compensation-awards-51440

**Ending**
- **Loop line:** "Still chasing the…", which flows into frame 1, "Same million bucks."
- **Comment bait:** caption line 1 is *"Comment your job and we'll run your million next."*
- **Taggable person:** "tag the nurse or teacher in your life."
- **Pinned comment:**
  > Exact: the average S&P 500 CEO earned $1M in 16.01 days in 2025 (envelope said 16 days, within 0.1%): $62,465.75 a day, one $100K envelope every 38.4 hours. Minimum wage ($7.25 × 2,080 hrs = $15,080/yr) needs 66.3 years for $1M and 6.63 years per envelope. Teacher 13.88 yrs · nurse 10.25 · software dev 7.35 · President 2.5. Gross pay, before tax, full-time; BLS May 2025 medians. AFL-CIO's $22.8M average excludes Elon Musk; with him included it's $340.1M, about 1.1 days. Comment your job and we'll run it.

**Description**
> Same $1 million, 6 jobs: how long to earn it? (Same Pile No. 3) — $1,000,000 ÷ one year's pay. Minimum wage 66.3 yrs · HS teacher 13.9 · nurse 10.3 · software dev 7.4 · US President 2.5 · average S&P 500 CEO 16 days. Sources: BLS OEWS/OOH May 2025 (released 15 May 2026): https://www.bls.gov/news.release/ocwage.htm · U.S. DOL minimum wage ($7.25 since 24 Jul 2009): https://www.dol.gov/agencies/whd/minimum-wage/faq · 3 U.S.C. §102 ($400,000 since 20 Jan 2001): https://www.everycrsreport.com/reports/RS20115.html · AFL-CIO Executive Paywatch 2026 (Aug 2026; average excludes Elon Musk): https://aflcio.org/press/releases/afl-cio-report-shows-top-ceos-made-312-times-workers-pay-2025. Educational math, not financial advice.
> #salary #CEOpay #envelopemath #careers #moneyfacts

**Platform notes**
- **YT Shorts:** post the 31.9 s master. Holding back "Sixteen days" for 1.6 s is the retention hinge. Loop fragment. Pin the exact figures.
- **IG Reels (~45 s):**
  - Add ✈️ airline pilot ($232,140, BLS May 2025, so 4.3 yrs) between the software developer and the interruption.
  - Hold the FIRST CLASS frame.
  - The "tag the nurse or teacher" line is the send driver.
- **TikTok (~65 s):**
  - Add the pilot rung and the "with one outlier included: about a day" twist (AFL-CIO's $340.1M) as a second sting.
  - Then run the comment-request format ("your job next") as a series.
  - Keep the President beat strictly about the salary set by law and never about any office-holder, to avoid political pile-ons.

**Why this one should travel**
- The countdown runs on famous nouns: Tilbury's companies-to-$1M (23.0M), the wage-per-hour series (125.8x from 4.9K subs) and a politician's salary (AR World 24.0x).
- The countdown falls from years to *days*, a unit change that hits harder than any single number.
- Every rung is a taggable job.
- The interruption beat is the comment section's question on screen, as in AJ's "what about Singapore?".
- Every figure is an official median, a statute or the AFL-CIO's published average, so the "well actually" replies have to argue about the assumptions (gross pay, median, one outlier excluded), never the arithmetic.

---

### Math check

Python 3, standard library only, saved as `teasers/06-same-pile-different-place-mathcheck.py` (run it from the repo root). It recomputes every number shown, spoken or pinned in 06A, 06B and 06C, plus the extra beats proposed for the longer cuts. It also reads the three specs and asserts:
- every on-screen number, caption phrase and bar value;
- the cumulative cross-out counts and the ascending/descending order;
- every "within X%" claim in the pinned comments;
- that each hero number finishes writing inside the last 2 s.

```python
#!/usr/bin/env python3
"""Same Pile (approach #6): recompute every number in teasers 06A, 06B and 06C and check it against the
specs (on-screen text, bar values, cross-out counts, captions) and the pinned-comment claims.
Run from the repo root:  python3 teasers/06-same-pile-different-place-mathcheck.py
Standard library only. QA rewrite, 2026-10-07."""
import json, os, re
from fractions import Fraction as F

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def spec(s):
    return json.load(open(os.path.join(ROOT, "engine", "specs", f"06-same-pile-different-place-{s}.json"), encoding="utf-8"))
def texts(sp):
    out = []
    for o in sp["ops"]:
        t = o.get("text")
        if isinstance(t, list): out += t
        elif t: out.append(t)
        for it in o.get("items", []): out.append(it.get("display", ""))
        if o.get("label"): out.append(o["label"])
    return out
def on_screen(sp, s):
    assert any(s in t for t in texts(sp)), f"not on screen in {sp['id']}: {s!r}"
def said(sp, s):
    assert any(s in c["text"] for c in sp["captions"]), f"not in captions of {sp['id']}: {s!r}"
    assert s in sp["vo"], f"not in vo of {sp['id']}: {s!r}"
def off(est, exact):
    return abs(F(est) - F(exact)) / F(exact) * 100
def within(est, exact, claim):
    p = off(est, exact)
    assert p <= F(claim), f"claimed within {claim}% but it is {float(p):.3f}%"
    return float(p)
def last2(sp, op_text):
    """the op whose text is op_text must finish writing inside the last 2 s"""
    o = next(o for o in sp["ops"] if o.get("text") == op_text)
    done = o["t"] + len(o["text"]) / o.get("cps", 15)
    assert sp["duration"] - 2 <= done <= sp["duration"], (op_text, done, sp["duration"])
    return done

print("=== 06A  Same $1,000 of pay, 6 countries (OECD Taxing Wages 2026, 2025 data) ===")
A = spec("a")
PILE = 1000
rates = {"Chile": "7.1", "Switzerland": "18.1", "UK": "23.1", "USA": "24.3", "Germany": "38.7", "Belgium": "39.5"}
spoken = {"Chile": "seventy-one", "Switzerland": "one eighty-one", "UK": "two thirty-one", "USA": "Two forty-three",
          "Germany": "three eighty-seven", "Belgium": "Three ninety-five"}
bars = {o["items"][0]["value"]: o["items"][0]["display"] for o in A["ops"] if o["type"] == "bars"}
cut = {}
for c, r in rates.items():
    cut[c] = F(PILE) * F(r) / 100
    assert cut[c].denominator == 1
    v = int(cut[c])
    on_screen(A, f"{r}% = "); on_screen(A, f"${v}"); said(A, spoken[c])
    assert bars[v] == f"${v}"
    print(f"  {c:<12} $1,000 x {r:>4}% = ${v:<4} = {float(cut[c] / 100):.2f} envelopes of $100")
assert list(rates) == sorted(rates, key=lambda c: cut[c]), "must run ascending, extreme last"
assert cut["Chile"] < 100 and 100 < cut["Switzerland"] < 200          # "Not even one envelope" / "Under two envelopes"
oecd_avg = F(PILE) * F("25.1") / 100
assert cut["USA"] < oecd_avg                                          # "Just under the OECD average"
print(f"  OECD average 25.1% -> ${float(oecd_avg):.0f}; USA ${int(cut['USA'])} is ${float(oecd_avg - cut['USA']):.0f} under it")
ratio = cut["Belgium"] / cut["Chile"]
print(f"  Line 2: $395 / $71 = {float(ratio):.4f} -> '5½x' is {within('5.5', ratio, '1.2'):.2f}% off (pin says within 1.2%)")
on_screen(A, "$395 ÷ $71 ≈ 5½×"); said(A, "Five and a half times")
env = cut["Belgium"] / 100
crosses = sum(1 for o in A["ops"] if o["type"] == "annotate" and o["kind"] == "cross")
assert crosses == round(env) == 4
print(f"  Line 3: Belgium pulls {float(env):.2f} envelopes -> '≈ 4 of 10' ({crosses} crossed) is {within(4, env, '1.3'):.2f}% off (pin: within 1.3%)")
on_screen(A, "≈ 4 of 10 ✉"); said(A, "almost four envelopes out of ten")
assert env < 4                                                        # "almost four"
print(f"  Germany vs Belgium gap: ${int(cut['Belgium'] - cut['Germany'])}")
us = (F("15.4") + F("7.1")) / (100 - F("7.5")) * 100
assert round(us, 1) == F("24.3")
print(f"  US cross-check from the 2025 wedge split: (15.4 + 7.1) / (100 - 7.5) = {float(us):.3f}% -> 24.3%")
print(f"  hero '≈ 4 of 10' finishes at {last2(A, '🇧🇪 ≈ 4 of 10 ✉'):.2f} s of {A['duration']} s")

print("\n=== 06B  Same $1,000 cash, 6 decades (BLS CPI-U, NSA, August of each year) ===")
B = spec("b")
NOW = F("334.980")   # August 2026
cpi = {"2016": F("240.849"), "2006": F("203.9"), "1996": F("157.3"), "1986": F("109.7"), "1976": F("57.4"), "1966": F("32.7")}
# cumulative cross-outs must equal the rounded envelopes of buying power lost
cross_ts = sorted(o["t"] for o in B["ops"] if o["type"] == "annotate" and o["kind"] == "cross")
year_t = {o["text"]: o["t"] for o in B["ops"] if isinstance(o.get("text"), str) and o["text"] in cpi}
ends = sorted(year_t.values())[1:] + [B["duration"]]
for (y, c), end in zip(cpi.items(), ends):
    then = F(PILE) * c / NOW
    loss = 1 - c / NOW
    eaten = loss * 10
    crossed = sum(1 for t in cross_ts if t < (end if y != "1966" else 25.4))
    pct = round(loss * 100)
    on_screen(B, f"{pct}%"); on_screen(B, f"= what ${round(then)} bought in {y}")
    assert crossed == round(eaten), (y, crossed, float(eaten))
    print(f"  {y}: CPI {float(c):>7.3f}  buys {float(loss * 100):5.2f}% less -> '{pct}%'; = what ${float(then):6.2f} bought then -> '${round(then)}'; "
          f"envelopes eaten {float(eaten):.2f} -> {crossed} crossed")
mult = NOW / cpi["1966"]
exact = F(PILE) * cpi["1966"] / NOW
print(f"  Line 2: 335 / 32.7 = {float(F(335) / F('32.7')):.3f} ≈ 10x  (exact 334.980 / 32.7 = {float(mult):.4f}); said 'ten times'")
on_screen(B, "prices: 335 ÷ 32.7 ≈ 10×"); said(B, "ten times higher")
print(f"  Line 3: $1,000 / 10 = $100; exact ${float(exact):.2f} -> {within(100, exact, '2.5'):.2f}% off (pin: within 2.5%)")
on_screen(B, "$1,000 ÷ 10 ≈ $100"); said(B, "buys a hundred")
print(f"  Matching 1966's $1,000 today takes ${float(F(PILE) * mult):,.2f}")
yoy = NOW / F("323.976") - 1
print(f"  Consistency: Aug 2026 334.980 vs Aug 2025 323.976 = +{float(yoy * 100):.2f}% y/y (release headline: +3.4%)")
assert round(yoy * 1000) == 34
print(f"  hero '$100' finishes at {last2(B, '$1,000 ÷ 10 ≈ $100'):.2f} s of {B['duration']} s")

print("\n=== 06C  Same $1 million, 6 jobs (BLS May 2025 medians; statute; AFL-CIO 2026) ===")
C = spec("c")
GOAL = 1_000_000
mw = F("7.25") * 40 * 52
assert mw == 15080
on_screen(C, "$7.25 × 2,080 hrs = $15,080")
pay = {"Minimum wage": mw, "HS teacher": F(72040), "Nurse (RN)": F(97550), "Software dev": F(135980),
       "US President": F(400000), "S&P 500 CEO": F(22_800_000)}
shown = {"Minimum wage": "66.3 yrs", "HS teacher": "13.9 yrs", "Nurse (RN)": "10.3 yrs", "Software dev": "7.4 yrs", "US President": "2.5 yrs"}
for job, p in pay.items():
    yrs = F(GOAL) / p
    if job in shown:
        assert f"{float(yrs):.1f} yrs" == shown[job]; on_screen(C, shown[job])
    print(f"  {job:<13} ${float(p):>13,.0f}/yr -> {float(yrs):8.4f} yrs = {float(yrs * 365):9.2f} days")
assert list(pay) == sorted(pay, key=lambda j: -(F(GOAL) / pay[j])), "must run longest first, extreme last"
assert 66 < F(GOAL) / mw < 67 and 13.5 <= F(GOAL) / pay["HS teacher"] < 14.5          # "sixty-six", "about fourteen"
assert 10 < F(GOAL) / pay["Nurse (RN)"] < 10.5 and 7 < F(GOAL) / pay["Software dev"] < 7.5  # "just over ten / seven"
days = F(GOAL) / pay["S&P 500 CEO"] * 365
day_pay = pay["S&P 500 CEO"] / 365
env_h = F(100_000) / day_pay * 24
mw_env = F(100_000) / mw
assert round(days) == 16 and round(day_pay / 1000) == 62 and round(env_h) == 38 and f"{float(mw_env):.1f}" == "6.6"
on_screen(C, "16 days"); on_screen(C, "$22.8M ÷ 365 ≈ $62K a day"); on_screen(C, "all 10 ✉ in 16 days"); on_screen(C, "min. wage: 1 ✉ ≈ 6.6 yrs")
said(C, "Sixteen days"); said(C, "Sixty-two grand a day"); said(C, "thirty-eight hours"); said(C, "six point six years")
print(f"  CEO: $1M in {float(days):.4f} days -> '16 days' is {within(16, days, '0.1'):.3f}% off (pin: within 0.1%)")
print(f"  CEO day rate ${float(day_pay):,.2f} -> '$62K'; one $100K envelope every {float(env_h):.2f} h -> 'thirty-eight hours'")
print(f"  Line 3: min wage, one $100K envelope = $100K / $15,080 = {float(mw_env):.4f} yrs -> '6.6 yrs' ({off('6.6', mw_env):.2f}% off)")
print(f"  With Musk (AFL-CIO $340.1M): $1M in {float(F(GOAL) / F(340_100_000) * 365):.2f} days; CEO / President pay = {float(pay['S&P 500 CEO'] / pay['US President']):.0f}x")
print(f"  hero '6.6 yrs' finishes at {last2(C, 'min. wage: 1 ✉ ≈ 6.6 yrs'):.2f} s of {C['duration']} s")

print("\n=== Extra beats for the longer IG (~45 s) / TikTok (~65 s) cuts ===")
for c, r in {"Mexico": "13.2", "Korea": "16.5", "Japan": "22.6", "Lithuania": "38.7"}.items():
    print(f"  06A+ {c:<10} $1,000 x {r}% = ${float(F(PILE) * F(r) / 100):.0f}")
for y, c in cpi.items():
    print(f"  06B+ {y}: matching its $1,000 today takes ${float(F(PILE) * NOW / c):,.2f}")
print(f"  06C+ Airline pilot $232,140 -> {float(F(GOAL) / 232140):.3f} yrs")
print("\nALL CHECKS PASSED")
```

**Output** (`python3 teasers/06-same-pile-different-place-mathcheck.py`, run 2026-10-07 against the final specs):

```
=== 06A  Same $1,000 of pay, 6 countries (OECD Taxing Wages 2026, 2025 data) ===
  Chile        $1,000 x  7.1% = $71   = 0.71 envelopes of $100
  Switzerland  $1,000 x 18.1% = $181  = 1.81 envelopes of $100
  UK           $1,000 x 23.1% = $231  = 2.31 envelopes of $100
  USA          $1,000 x 24.3% = $243  = 2.43 envelopes of $100
  Germany      $1,000 x 38.7% = $387  = 3.87 envelopes of $100
  Belgium      $1,000 x 39.5% = $395  = 3.95 envelopes of $100
  OECD average 25.1% -> $251; USA $243 is $8 under it
  Line 2: $395 / $71 = 5.5634 -> '5½x' is 1.14% off (pin says within 1.2%)
  Line 3: Belgium pulls 3.95 envelopes -> '≈ 4 of 10' (4 crossed) is 1.27% off (pin: within 1.3%)
  Germany vs Belgium gap: $8
  US cross-check from the 2025 wedge split: (15.4 + 7.1) / (100 - 7.5) = 24.324% -> 24.3%
  hero '≈ 4 of 10' finishes at 28.90 s of 29.9 s

=== 06B  Same $1,000 cash, 6 decades (BLS CPI-U, NSA, August of each year) ===
  2016: CPI 240.849  buys 28.10% less -> '28%'; = what $719.00 bought then -> '$719'; envelopes eaten 2.81 -> 3 crossed
  2006: CPI 203.900  buys 39.13% less -> '39%'; = what $608.69 bought then -> '$609'; envelopes eaten 3.91 -> 4 crossed
  1996: CPI 157.300  buys 53.04% less -> '53%'; = what $469.58 bought then -> '$470'; envelopes eaten 5.30 -> 5 crossed
  1986: CPI 109.700  buys 67.25% less -> '67%'; = what $327.48 bought then -> '$327'; envelopes eaten 6.73 -> 7 crossed
  1976: CPI  57.400  buys 82.86% less -> '83%'; = what $171.35 bought then -> '$171'; envelopes eaten 8.29 -> 8 crossed
  1966: CPI  32.700  buys 90.24% less -> '90%'; = what $ 97.62 bought then -> '$98'; envelopes eaten 9.02 -> 9 crossed
  Line 2: 335 / 32.7 = 10.245 ≈ 10x  (exact 334.980 / 32.7 = 10.2440); said 'ten times'
  Line 3: $1,000 / 10 = $100; exact $97.62 -> 2.44% off (pin: within 2.5%)
  Matching 1966's $1,000 today takes $10,244.04
  Consistency: Aug 2026 334.980 vs Aug 2025 323.976 = +3.40% y/y (release headline: +3.4%)
  hero '$100' finishes at 28.98 s of 30.9 s

=== 06C  Same $1 million, 6 jobs (BLS May 2025 medians; statute; AFL-CIO 2026) ===
  Minimum wage  $       15,080/yr ->  66.3130 yrs =  24204.24 days
  HS teacher    $       72,040/yr ->  13.8812 yrs =   5066.63 days
  Nurse (RN)    $       97,550/yr ->  10.2512 yrs =   3741.67 days
  Software dev  $      135,980/yr ->   7.3540 yrs =   2684.22 days
  US President  $      400,000/yr ->   2.5000 yrs =    912.50 days
  S&P 500 CEO   $   22,800,000/yr ->   0.0439 yrs =     16.01 days
  CEO: $1M in 16.0088 days -> '16 days' is 0.055% off (pin: within 0.1%)
  CEO day rate $62,465.75 -> '$62K'; one $100K envelope every 38.42 h -> 'thirty-eight hours'
  Line 3: min wage, one $100K envelope = $100K / $15,080 = 6.6313 yrs -> '6.6 yrs' (0.47% off)
  With Musk (AFL-CIO $340.1M): $1M in 1.07 days; CEO / President pay = 57x
  hero '6.6 yrs' finishes at 30.20 s of 31.9 s

=== Extra beats for the longer IG (~45 s) / TikTok (~65 s) cuts ===
  06A+ Mexico     $1,000 x 13.2% = $132
  06A+ Korea      $1,000 x 16.5% = $165
  06A+ Japan      $1,000 x 22.6% = $226
  06A+ Lithuania  $1,000 x 38.7% = $387
  06B+ 2016: matching its $1,000 today takes $1,390.83
  06B+ 2006: matching its $1,000 today takes $1,642.86
  06B+ 1996: matching its $1,000 today takes $2,129.56
  06B+ 1986: matching its $1,000 today takes $3,053.60
  06B+ 1976: matching its $1,000 today takes $5,835.89
  06B+ 1966: matching its $1,000 today takes $10,244.04
  06C+ Airline pilot $232,140 -> 4.308 yrs

ALL CHECKS PASSED
```

### Verification log

Independent fact-check, edit and QA pass, 2026-10-07. The specs were rebuilt beat by beat from the timings below. The beat sheets, voice-overs, envelope-math lines, pinned comments, descriptions and platform notes above were updated to match them.

**What was checked**
1. **Math.** Every number in this file, in the three specs (on-screen text, bar values, cross-out counts, captions, `vo`) and in the pinned comments and descriptions, recomputed with Python `fractions`. The script is now a standalone file, `teasers/06-same-pile-different-place-mathcheck.py`. It reads the spec JSON and asserts every on-screen string, caption phrase, bar value, cross-out count, list order and "within X%" claim, and that each hero number finishes inside the last 2 s.
2. **Facts.** Re-verification was attempted for every real-world input. WebSearch could not run (this run's shared budget of 200 searches was already used up), and direct fetches of the cited sources were all refused by the egress proxy: oecd.org, bls.gov, aflcio.org, taxfoundation.org, cpiinflationcalculator.com, peoplematters.in and fred.stlouisfed.org. The inputs were therefore checked for internal consistency and against BLS history from before 2026 (table below), and nothing was swapped for a figure that couldn't be sourced. The research claims in this file (1.9B #cashstuffing, Monarch 3.7M/603x, Tilbury ~8.9M subs, YouTube's Oct 1 2026 originality update, every evidence-table row) were re-checked against `research/` and all match.
3. **Brand and policy.** Format bible §2, non-negotiables 1–8.
4. **Virality.** Hooks scored against `research/02-top-10-approaches.md` §6 and `research/watch/group2-video3.md` (AJ). Checked the payoff timing, the pattern break, the hero in the last 2 s and the loop.
5. **Visual QA.** `node src/cli.js check` on all three specs, contact sheets, stills at t = 0 and at key beats, and a reading-time audit. The audit requires every text op and caption to stay on screen at least 0.25 s per word, and every write op to stay fully written for at least 0.4 s.

**What was wrong, and what changed**

| # | Teaser | Problem | Fix |
|---|---|---|---|
| 1 | All | **Frame 1 (t = 0) rendered blank.** The hook, the pile, the SAME PILE stamp and the postmark all animated in from t ≥ 0, so the thumbnail frame showed an empty envelope with no number (non-negotiable 2). | Pre-rolled from −0.5 to −1.0 s. The t = 0 stills now show the full tape hook, the pile and the `$1K`/`$1M` stamp. |
| 2 | 06A | The ASSUME sticky (12 words) was on screen for 2.8 s and fully written for only about 1 s before the flip wiped it. | Removed the 6.0 s flip. The sticky now sits bottom right from 3.45 to 10.95 s (7.5 s), across the Chile and Switzerland answers. |
| 3 | 06A | Slow open: the first answer came at 7.1 s, behind a 2.6 s rule beat and a flip. | Rule beat cut to 2.05 s ("Same rule: income tax plus social security."). First payoff at 6.2 s (21%); master 31.5 → 29.9 s. |
| 4 | 06A | "And the most of all thirty-eight?" is not grammatical English. | "And the highest of all thirty-eight?" in the VO, the caption and the pencil tease. |
| 5 | 06A | The last line, `🇧🇪 vs 🇨🇱 · ≈ 4 of 10 ✉`, set two flags against one number, in small pencil. The verdict landed 2.2 s before the end. | Ending reordered: `$395 ÷ $71 ≈ 5½×` first, then the pile with 4 cross-outs, then `🇧🇪 ≈ 4 of 10 ✉` in big red, finishing at 28.9 s of 29.9 s, with POSTAGE DUE under it. |
| 6 | 06A pin | "≈ 5½×, within 1.1%" is false: the error is 1.14%. | "within 1.2%". |
| 7 | 06A description | The description said "links pinned" and the pinned comment said "Sources in the description", so neither one carried a source. | The OECD URLs and publication date are now in the description. |
| 8 | 06B | Text cleared before it was written. "= what it buys, in then-dollars" and "= what $609 bought in 2006" were cleared mid-word; the first shows truncated on the old sheet at 6.5 s. "= what $171 bought in 1976" finished 0.02 s before it was cleared, and the 2016 and 1986 lines were fully readable for only 0.22 s. | Each line now starts 0.95 s into its beat and writes at 30 cps. Each holds at least 0.68 s fully written and at least 1.6 s on screen; the rule line is done at 6.0 s. |
| 9 | 06B | The hero `$100` landed at 27.1 s and the stamp at 28.5 s, 4.1 s and 2.7 s before the end. | `$100` completes at 28.98 s and RETURN TO SENDER at 29.1 s of a 30.9 s master. 0.3 s of dead air was trimmed from the close. |
| 10 | 06B pin | "within 2.4%" is false: the error is 2.44%. | "within 2.5%". |
| 11 | 06B description | No source links. | BLS release and table URLs added. |
| 12 | 06C | **The voice and the screen disagreed.** The VO said "six and a half years" while the envelope said "6.6 yrs" (exact 6.63). | VO and caption now say "Minimum wage: six point six years for one."; on screen `≈ 6.6 yrs`. |
| 13 | 06C | After the flip the screen held **four** handwritten lines: `$62K a day`, `all 10 ✉ in 16 days`, `min. wage: 1 ✉ = 6.6 yrs` and `($100K ÷ $15,080 a year)`. That breaks the three-line rule. | Cut the fourth line, leaving three. |
| 14 | 06C | The ASSUME sticky had 17 words on screen for 2.8 s. | Cut to 13 words and kept up from 3.2 to 8.95 s (5.75 s, no flip). "excl. Musk" moved onto the CEO rung, where it qualifies the number. |
| 15 | 06C | Two captions ran faster than 0.25 s per word: "Four hundred grand, set by law…" (11 words in 2.65 s) and "Minimum wage needs six and a half years for one." (10 words in 2.1 s). | Now 11 words in 2.95 s and 8 words in 2.0 s. |
| 16 | 06C | The last number and the verdict landed 3.4 s before the end of a 32.1 s master. | `min. wage: 1 ✉ ≈ 6.6 yrs` completes at 30.2 s of 31.9 s. |
| 17 | 06C pin | "within 0.05%" is false: the error is 0.055%. | "within 0.1%". |
| 18 | 06C description | No source links. | URLs for BLS, DOL, the CRS statute report and the AFL-CIO report added. |
| 19 | 06C | The rung sub-labels (the pay inputs) were 44 px. | Raised to 46 px and offset 54 px below the label, so the specs stay lint-clean. |
| 20 | Math check | The old embedded script printed the "within" percentages at 2 dp and never compared them with the claims. It also never read the specs. That is how items 6, 10, 12, 13 and 17 got through. | Replaced by the standalone script described above; its output is in the Math check section. |
| 21 | 06C "why it travels" | It said "every figure is an official median or a statute", but the CEO figure is the AFL-CIO's published average. | Reworded. |
| 22 | All | Mid-pass, `engine/src/check.js` was updated (outside this QA pass). The new linter flagged the SAME PILE postage stamp poking above the top safe edge (y 212 < 230), and two captions wrapping to 3 lines: 06B at 6.8 s and 06C at 5.65 s. | Stamp moved to y 334 and resized to 172×210, which keeps it clear of the tape hook. The two captions are split at the sentence break, with the same words and VO. |
| 23 | All | The loop relied on the spoken fragment alone. | Added the engine's new `"loop": true`, which crossfades the last 0.35 s into frame 0, so the cut back to the hook and the full pile is seamless. In 06B the crossed-out pile fades back to ten envelopes on "…the same thousand bucks in cash". |
| 24 | All | The format bible §7 was updated mid-pass to put the postmark badge at x 175, y 258, r 100; the specs had x 190, y 300, r 112. | Conformed. |

**Facts: status of each real-world input**

| Input | Value used | QA status |
|---|---|---|
| OECD *Taxing Wages 2026* (22 Apr 2026), net personal average tax rate for 2025: single worker, no children, 100% of average wage | Chile 7.1, Switzerland 18.1, UK 23.1, US 24.3, Germany 38.7, Belgium 39.5, OECD average 25.1; long-cut extras Mexico 13.2, Korea 16.5, Japan 22.6, Lithuania 38.7 | **Not re-verified online (blocked).** The figures are consistent with each other: Belgium highest, Germany and Lithuania tied at 38.7, Korea 5th lowest and Switzerland 6th lowest, and the UK take-home of 76.9% = 100 − 23.1. The US 24.3% can be rebuilt from the Tax Foundation wedge split: (15.4 + 7.1) / (100 − 7.5) = 24.32%. **Tick against the OECD pages before publishing.** |
| BLS CPI-U, Aug 2026 (released 11 Sep 2026) | 334.980 | **Not re-verified online.** Consistent with the release headline: against Aug 2025 (323.976, BLS) it is +3.40% year on year, matching "+3.4%". |
| BLS CPI-U, August of 2016 / 2006 / 1996 / 1986 / 1976 / 1966 | 240.849 / 203.9 / 157.3 / 109.7 / 57.4 / 32.7 | Match the BLS CPI-U NSA history the reviewer knows. These are historical values and do not go stale. |
| Federal minimum wage | $7.25/hr, unchanged since 24 Jul 2009 | Matches DOL/FLSA history. No federal change is known, and the writer's 2026 source says it is current. |
| US President's salary | $400,000 (3 U.S.C. §102, since 20 Jan 2001) | Matches the statute. |
| OECD membership | 38 countries | Correct. |
| BLS OEWS May 2025 medians (released 15 May 2026) | HS teacher $72,040 · RN $97,550 · software developer $135,980 · all occupations $50,980 · airline pilot $232,140 (long cut only) | **Not re-verified online.** RN $97,550 also appears in teaser 05, but that is a shared input, not independent confirmation. **HS teacher $72,040 is the figure most worth re-opening:** it sits well above the high-school-teacher medians in the OEWS releases the reviewer recalls, which were in the mid-$60Ks. |
| AFL-CIO Executive Paywatch 2026 (Aug 2026), 2025 S&P 500 CEO pay | $22.8M average excluding Elon Musk; $340.1M including him | **Not re-verified online. Tick before publishing.** |

**Brand and policy (format bible §2)**
- **Three-line rule:** passes in all three after fix 13.
- **A number in frame 1:** passes after fix 1.
- **Honest rounding with the exact figure pinned:** every rounding is labelled ≈, every pinned comment carries the exact figure, and every "within X%" claim is now true (the script asserts this).
- **No advice language:** VO, captions, descriptions and pins were scanned for "should", "need to", "guaranteed", "get rich" and "financial freedom". None found.
- **No borrowed footage or impersonation:** everything is drawn. Real names appear only as data labels (OECD, BLS, AFL-CIO, S&P 500, and Musk as the outlier excluded from an average), with no logos and no likeness. The President beat is about the statutory salary only.
- **Disclaimer:** present in all three descriptions.

**Virality**

| Teaser | Hook score before | After | Why |
|---|---|---|---|
| 06A | 7 | 8 | The copy is the research's top formula ("Same $[X], [N] countries…", modelled on AJ's 17,564.8x). But as rendered, frame 1 was blank and the first answer took 7.1 s, where AJ's arrives within 2 s. Now frame 1 is complete, the first answer lands at 6.2 s and the basis stays readable while it does. |
| 06B | 7 | 8 | A concrete pile and a vivid question ("what did *inflation* eat?"), aimed at the #cashstuffing whitespace and backed by Monarch (603x) and RAM by year (44.7x). Frame 1 was blank. |
| 06C | 7 | 8.5 | The closest match to Tilbury's 23.0M "How long … to make $1 million?", and the unit drops from years to *days*. Frame 1 was blank. |

Once frame 1 rendered, no hook copy scored under 8, so the copy was kept. The fixes were the frame-1 render and, for 06A, the tighter rule beat.

| | Duration | First partial payoff | Interruption / pattern break | Hero lands (last 2 s) | Loop |
|---|---|---|---|---|---|
| 06A | 29.9 s | 6.2 s (21%) | 13.5 s (45%) | `≈ 4 of 10` done 28.9 s; stamp 28.3 s | "All out of the…" → "Same thousand bucks of pay." |
| 06B | 30.9 s | 7.85 s (25%) | 14.1–14.5 s (46–47%) | `$100` done 28.98 s; stamp 29.1 s | "And the envelope still holds the…" → "Same thousand bucks in cash." |
| 06C | 31.9 s | 7.0 s (22%) | 16.85 s (53%) | `≈ 6.6 yrs` done 30.2 s | "Still chasing the…" → "Same million bucks." |

**Visual QA**
- `node src/cli.js check` passes on all three specs with **zero warnings**. That is under the updated linter, which also checks frame 0, stamps, caption wrap and caption pace.
- The reading-time audit passes: every text op and caption clears 0.25 s per word.
- Contact sheets were regenerated at `engine/out/sheets/06-same-pile-different-place-{a,b,c}.png`.
- The stills (at 0.5 scale, with the safe-zone overlay) were all looked at:
  - frame 1 for each teaser: `engine/out/stills/06-same-pile-different-place-{a,b,c}-0.png`;
  - 06A at 7.0 s (sticky legibility) and 29.8 s (final frame);
  - 06B at 15.0 s (pattern-break box) and 30.8 s (final frame);
  - 06C at 23.9 s (full ladder with the circled `16 days`) and 31.8 s (final frame).

**Engine requests.** No `engine/src` edits were made in this pass. The frame-0 and stamp-box checks this pass would have asked for have since landed in the linter. One request is still open: warn when a `write` op's `until` (or a `clear`/`flip`) comes before `t + len/cps`, that is, when text is cleared before it has finished writing. That is fix 8, which today only the reading-time audit catches.

**Still open before publishing:** re-open the OECD *Taxing Wages 2026* pages, the BLS Aug 2026 CPI release, the BLS OEWS May 2025 tables and the AFL-CIO Paywatch 2026 release, and tick each value in the facts table above. If any value moves, update the three places it appears (the spec, this file, and the constants in the math-check script), then rerun the script.
