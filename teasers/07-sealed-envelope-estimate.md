## 7. The Sealed-Envelope Estimate

**Series:** *Sealed Answer* · **Lane:** Envelope (27.8 to 33.9 s masters; 60 s+ TikTok cuts) · **Lead devices:** the Sealed Answer envelope, PAUSE & GUESS timer, ballpoint two-column working (LOW | HIGH, or two competing rules), ASSUME/GIVEN/RULES sticky, the range ruler, red pen, ROUGHLY RIGHT stamp
**Teasers:** 07A Fry's 93¢ after 1,000 years · 07B What's in all 100 envelopes · 07C What the Eras Tour made
**Specs:** `engine/specs/07-sealed-envelope-estimate-{a,b,c}.json` · **Sheets:** `engine/out/sheets/07-sealed-envelope-estimate-{a,b,c}.png` · **Stills:** `engine/out/stills/07-sealed-envelope-estimate-*` · **Math check:** `teasers/07-sealed-envelope-estimate-mathcheck.py` (102 checks, all pass; it also checks the specs' on-screen numbers and beat timings)

> **Verification status. Read this before scheduling.**
> - **07A and 07B: cleared.** Their only real-world inputs are the show's own figures (93¢, 2.25%, 1,000 years, $4.3B) and the challenge's published rule ($1 to $100). Both were checked by WebSearch on 2026-10-07 in the research pass and recorded with URLs in `research/raw/`. The arithmetic corroborates both: 0.93 × 1.0225^1000 = $4.28B, which rounds to the show's $4.3B, and 1 + 2 + … + 100 = $5,050, the challenge's published total.
> - **07C: VERIFY before posting.** Its three real-world figures (149 shows, $2,077,618,725 gross, 10,168,008 tickets; Billboard Boxscore, Dec 2024) have **not** been verified by anyone. The writer's WebSearch budget was used up, and so was QA's (the limit is 200 calls per turn, shared by every agent). The egress proxy blocked billboard.com and wikipedia.org, and apnews.com refused the fetch. Do not post 07C until someone has searched these figures and pasted the source URL and date into its Sources. Everything else in 07C is labelled on screen as our assumption.
> - QA log: see [Verification log](#verification-log) at the end.

---

### Why it goes viral

**The mechanism: commit, then check.** The viewer is asked a money question they already wonder about ("what did that make?", "what's that worth now?"). Then they lock in a number before anything is shown. Four forces keep them watching:

1. **Ego is on the line.** A silent guess in the first 3 s turns every later number into an "am I close?" check. Guess-the-number games are the most consistent tiny-channel breakouts in the corpus (report 01 §3.6; `raw/yt-puzzles-estimation-business.md` P2).
2. **Each multiplication is a micro-reveal.** A Fermi chain (count × rate × price) adds a new number every 3 to 5 s. That is exactly what the long winners do ("one new number per sentence", report 01 §3.4).
3. **The hero number is held to about 90% of the runtime.** Monica's $8,000 lands at 54 of 60 s and jamaal's $1.06M at 140 of 152 s (report 01 §3.5).
4. **Contestable inputs farm comments.** jamaal's "$8 RPM" started the argument in his comments. "Who should I do next?" turns the comment section into the content calendar (`watch/group1-video2.md`).

**Algorithmically**, a famous noun (Friends, Jordan Howlett, an iPhone, Futurama, Taylor Swift) gives the seed audience an instant reason to stay. **The Fermi-estimate cluster had the highest median outlier of any IG/TikTok pattern: 533.5x**, though that median rests on only two posts (`raw/ig-tiktok-outliers.md`, line 98).

**The evidence** (copied from `research/02-top-10-approaches.md` §7 and the raw/watch files):

| Creator (size) | Title | Views | Outlier | Length | Status | URL |
|---|---|---|---|---|---|---|
| LIE HARD by Gaurav Kapoor (6.09K) | Guess the price 💲 (iPhone 11 Pro resale) | 17,889,341 | **3,339.5x** | 48 s | watched | https://www.youtube.com/shorts/f_vANVcVHo8 |
| Humphrey Yang | 🎳 How Much Do Bowling Alleys Make? | 10,557,323 | n/a (5.67% likes) | 56 s | inferred | https://www.youtube.com/shorts/6rL-7T66QfA |
| Humphrey Yang | Estimating Sales: Hot Dog Stand! 🌭 | 6,818,036 | n/a | 34 s | inferred | https://www.youtube.com/shorts/-J2MeVAY6wU |
| Graham Stephan | How Much Money Bobby Lee Makes | 4,581,171 | 59.88x | 35 s | inferred | https://www.youtube.com/shorts/WFIgGZtJEFk |
| DanielChunNY (4.51K) | How much would it cost to rent Monica's apartment from Friends? | 3,735,961 | **390.46x** | 60 s | watched | https://www.youtube.com/shorts/m-caEiD0MlQ |
| @jamaalourcity (TikTok, 47.4K) | "Pocket Watching" Ep. 77 (Jordan Howlett's monthly income) | 3.7M | **908.0x** | 152 s | watched | https://www.tiktok.com/@jamaalourcity/video/7664369518873103638 |
| Abdullah Habib (25.6K) | YouTuber makes $11Million/mo in ads (figure never derived) | 659,337 | 386.9x | 139 s | watched | https://www.youtube.com/shorts/M3INFHSjExg |
| Founder Talk Podcast (814) | The Average Chick-fil-A Location Beats McDonald's Revenue in Six Days… | 308,273 | 182.7x | 46 s | transcript | https://www.youtube.com/shorts/aIksb0vifn4 |
| OMG Economy (169 subs) | #Futurama Explained Compound Interest Perfectly | 28,851 | **1,442x** | 38 s | inferred | https://www.youtube.com/shorts/hzf9ZLjtMko |
| PikaFloats (20.7K) | Futurama Really Calculated This | 2,742,217 | 14.2x | n/a | inferred | https://www.youtube.com/shorts/dmslQ9pDddA |

More guess-the-price breakouts from small channels: bris (24.9K subs) 6,805,887 views at 212x, and Jolene Erdman (4.6K) 3,178,379 at 174x (`raw/yt-puzzles-estimation-business.md` §2). **None of them is math-driven.** P2 in that file calls this "an opening for an estimation version". That opening is this format.

**Counter-evidence we design around.** The top three originals lean on a face or credentials (jamaal's picture-in-picture, a broker on location, a celebrity comedy panel). jamaal's 60 s of biography with no numbers is the weak point vidIQ flagged. Income estimates of real people carry likeness and defamation risk. Copying TV clips is ruled out: a YouTube Short over 1 minute with any Content ID claim is blocked globally (report 01 §4.3).

---

### How the originals do it

**1. LIE HARD, "Guess the price 💲"** (17,889,341 views, 3,339.5x, 48 s, `watch/group2-video4.md`)
- **What it nails.**
  - Easy question first ("What phone is this?"), hard question second (what it's worth now).
  - Four panel guesses in descending order (28K → 25K → 19K → 14.5K) let the viewer rank their own guess.
  - A neutral-looking truth source reveals ₹16,100 at about 0:38 (79%), and "closest guess wins" adds a second payoff.
- **What it misses.**
  - There is **no estimation at all**: four guesses and an app screen.
  - The truth source is the sponsor (Cashify), so the "reveal" is an ad.
  - It ends on a branded slate instead of a loop.
  - The ₹1.05 lakh → ₹16,100 depreciation (about 85% gone) is never stated.

**2. @jamaalourcity, "Pocket Watching" Ep. 77** (3.7M, 908x, 152 s, `watch/group1-video2.md`)
- **What it nails.**
  - A household-name subject plus a named, numbered series ("Episode 77").
  - The calculator chain is the format: 237.5M views × 40% ÷ 1,000 × $8 RPM = $760K, plus 4 deals × $75K = $300K.
  - The hero number ($1,060,000/month) lands at 92% of the runtime.
  - The CTA "who should I pocket watch next?" feeds the calendar.
- **What it misses.**
  - About 60 s of biography with no numbers (18–79 s).
  - A single confident number built on unsourced inputs (the $8 RPM). The arithmetic holds, but the inputs are guesses with no range.
  - No loop, and the retention leans on a face a faceless channel doesn't have.

**3. DanielChunNY, "How much would it cost to rent Monica's apartment from Friends?"** (3,735,961, 390.46x, 60 s, `watch/group5-video2.md`)
- **What it nails.**
  - Title = on-screen text = first spoken line, about a question fans have argued over for 30 years.
  - A $200 anchor at 0:05.
  - A 6/10 → 8/10 → 10/10 scorecard that works as a progress bar.
  - **$8,000/month at 0:54 (90%)**, then a named sequel CTA ("Chandler and Joey's next").
- **What it misses.**
  - **No calculation.** The $8,000 is the broker's assertion; the math (comps, the 40x-rent income rule) is never shown.
  - It leans on *Friends* clips (a Content ID risk we can't take).
  - It ends linearly instead of looping.

**Pattern across all three:** commit → hold → reveal works. **The working is always missing, wrong-looking or sponsored.** Our upgrade is to keep the commit-and-reveal and put the working on the envelope.

---

### The Envelope Math upgrade

**What we replicate**
- **The question as title, tape hook and first spoken line,** about a famous noun with a number in frame 1. The hook is on screen in the very first frame (it's the thumbnail), not animating in.
- **A guess window in the first 6 s:** sealed envelope plus a 3-s PAUSE & GUESS timer (LIE HARD's commit, jamaal's suspense).
- **A Fermi chain with one new number every 3 to 5 s** (jamaal's calculator chain, without the 60 s of biography).
- **The hero number at 86 to 91% of the runtime, the verdict stamp in the last 2 s,** then a loop or "who's next?" (Monica 90%, jamaal 92%).

**What we improve**
1. **Show the work in two columns, not as one confident number.** Uncertain inputs are written **LOW (ink) | HIGH**, and the multiplication carries both (07B, 07C). When the answer comes from a rule of thumb, the two columns are two competing rules instead (07A: rule of 72 vs rule of 70), and we never call either one a ceiling. Both shapes still invite "it's closer to the high end" comments.
2. **Label every input.** Givens go on a **GIVEN** or **RULES** sticky; guesses go on an **ASSUME** sticky that says "our guesses, not data". Real figures are cited in the description and the pinned comment.
3. **Use a neutral truth source**: the show itself, the challenge's published rules, Billboard. Never a sponsor.
4. **Score ourselves in public.** The card shows the real figure; in 07B and 07C a red arrow drops it onto our range ruler. The pinned comment says "envelope said ≈ X, within Y%".
5. **End on a loop or a "who's next?" question,** never a slate.

**The uniquely-ours twist: "Seal first, show the work, then score it."** The answer is physically **sealed in frame 1**: a white envelope with a red wax "≈" that wiggles while you guess. Then the envelope **flips** and the working is done on its back, which is literally back-of-the-envelope math. Then it flips back and **opens**, scored against our working: on the **range ruler** (a hand-drawn line from our LOW to our HIGH where a red arrow lands the real number) or against the two rules. Before it opens, a **"your guess: $ ____"** blank is written for the viewer to fill in. No game show, sponsor app or broker has a prop that does all three jobs: commit, show the work, score it. Comment mechanic (optional, opt-in only): the closest guess gets its handle on the next envelope's "To:" line.

**Series name:** **Sealed Answer**. The postmark carries the episode number (No. 07A, 07B, 07C).
**Title template:** `[Money question with a number in it]? Guess first. (Sealed Answer No. ___)`, e.g. "How much did the Eras Tour make? 149 shows. Guess first. (Sealed Answer No. 07C)".
**Hook template (tape, 2–3 strips):** `[NUMBER] [SUBJECT]. / HOW MUCH [IS / DID] *[RED WORD]* …?` The sealed envelope's note carries the famous noun, the guess prompt or the options ("$1B? $2B? $3B?").
**Pinned-comment template:** "Exact: $X (envelope said ≈ $Y, within Z%). Assumptions: … Source: … [one real question]."

**Envelope devices used (format bible §3):**

| Device | Engine op | 07A | 07B | 07C |
|---|---|---|---|---|
| Masking-tape hook | `hook` | 93¢ IN THE BANK / FOR 1,000 YEARS | THE 100 ENVELOPE / CHALLENGE: / HOW MUCH IN ALL 100? | 149 SHOWS. / HOW MUCH DID THE / ERAS TOUR MAKE? |
| The Sealed Answer (guess window + reveal) | `envelope` | "Fry's balance now = ?" → $4.3B | "all 100 = ?" → $5,050 | "$1B? $2B? $3B?" → $2.08B |
| Guess timer | `timer` | 3 s | 3 s | 3 s |
| Flip to the working side and back | `flip` | ✓ | ✓ | ✓ |
| GIVEN / RULES / ASSUME sticky | `sticky` | GIVEN | RULES | ASSUME |
| Postage stamp (the unit) | `postage` | 93¢ FUTURAMA (stuck on the envelope) | 100 ENVELOPES | 149 SHOWS |
| Ballpoint two-column working (3 lines) | `write` | RULE OF 72 \| RULE OF 70 | all-$1 \| all-$100 → middle | tickets → price → gross |
| Red pen | `annotate` | underline, box | circle, ✗ outside range, arrow | box, arrow |
| Napkin chart | `curve` / ruler | hockey-stick curve | range ruler | range ruler |
| Verdict stamp | `stamp` | ROUGHLY RIGHT | ROUGHLY RIGHT | ROUGHLY RIGHT |
| Postmark No. | `postmark` | 07A | 07B | 07C |

**Anti-template guardrail.** The ritual stays fixed: seal, guess, flip, two columns, open, score. The payoff shape rotates. 07A's two numbers come from two *rules of thumb*, and the real answer beats both, with one rule clearly closer. 07B's range comes from *bounds*, and the answer is exactly the midpoint. 07C's range comes from *uncertain inputs* (true Fermi), and the answer lands inside it. Rotate subjects across fiction, everyday money and real businesses or people, so no two episodes in a row share a subject type. Repeats of one subject decay fast (report 01 §3.10).

---

### Teasers

#### 07A: Fry's 93¢, 1,000 years later

- **Working title:** Fry left 93¢ in the bank for 1,000 years. How much is it now? (Sealed Answer No. 07A)
- **Money topic:** savings and compound interest (a pop-culture balance)
- **Lane / runtime:** Envelope, **33.9 s** master
- **Spec:** `engine/specs/07-sealed-envelope-estimate-a.json` · **Sheet:** `engine/out/sheets/07-sealed-envelope-estimate-a.png`

**Frame-1 hook** (all on screen at frame 0)
- **On screen (tape):** **93¢ IN THE BANK / FOR *1,000 YEARS***. Under it sits the sealed envelope with the red note "Fry's balance now = ?", and a 93¢ postage stamp marked FUTURAMA is stuck on its corner.
- **First spoken line (0.2–3.0 s):** *"Fry's ninety-three cents. In the bank. For a thousand years."*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–3.0 | Hook | Tape hook; sealed envelope "Fry's balance now = ?"; 93¢ FUTURAMA stamp |
| 3.1–6.1 | Guess window | 3-s PAUSE & GUESS timer under the wiggling envelope |
| 6.2 | Flip | To the back of the envelope |
| 6.5–9.5 | Set-up + rule of 72 | GIVEN sticky "93¢ · 2.25% a year · 1,000 years (Futurama, 1999)"; 93¢ stamp; "RULE OF 72", "72 ÷ 2.25", "doubles every **32 yrs**" |
| 9.6–12.1 | Line 2 | "doublings **≈ 31**" |
| 12.2–14.5 | **Partial payoff (37%)** | "93¢ grows to **$2B**" at 12.6, underlined |
| 14.6–17.7 | **Pattern break (43%)** | "72 is tuned for 8%. Try 70."; red "RULE OF 70", "70 ÷ 2.25" |
| 17.8–21.2 | Rule-of-70 column | Red "31 yrs", "≈ 32", "**$4B**" |
| 21.3–23.9 | The gap | Red box around $2B and $4B; "1 yr apart = $2B apart" |
| 24.0 | Flip | |
| 24.35–27.0 | Sanity check | Hockey-stick curve drawn in red: "year 500: $63K", "½ in the last 31 yrs", end label "?"; sealed envelope "$2B or $4B?" |
| 27.1–29.7 | Last guess | "Two billion or four?" |
| 29.8–30.9 | **Reveal (91%)** | Envelope opens; the card slides out: **$4.3B**, "the show's number"; ding at 30.7 |
| 31.9 | **Verdict (last 2 s)** | ROUGHLY RIGHT slams; "rule of 70: within 7%" |
| 32.3–33.9 | Loop | "All from…" runs straight into the first line |

**Voice-over**

> Fry's ninety-three cents. In the bank. For a thousand years. *(0.2)*
> At two and a quarter percent. Guess the balance. *(3.1)*
> Rule of seventy-two: doubles every thirty-two years. *(6.5)*
> A thousand years: about thirty-one doublings. *(9.6)*
> That's about two billion dollars. *(12.2)*
> Seventy-two is tuned for eight percent. Try seventy. *(14.6)*
> Seventy says thirty-one years. Thirty-two doublings. Four billion. *(17.8)*
> One year apart. Two billion dollars apart. *(21.3)*
> Year five hundred? Just sixty-three grand. *(24.4)*
> Two billion or four? The show's number is in here. *(27.1)*
> Four point three billion. Seventy wins. *(30.1)*
> All from… *(32.3, loops into "Fry's ninety-three cents")*

**The envelope math (3 lines, two rules)**

| | RULE OF 72 (ink) | RULE OF 70 (red) | exact |
|---|---|---|---|
| header | 72 ÷ 2.25 | 70 ÷ 2.25 | |
| 1. doubles every | 32 yrs | 31 yrs (31.11) | 31.15 yrs |
| 2. doublings in 1,000 yrs | ≈ 31 (31.25) | ≈ 32 (32.14) | 32.10 |
| 3. 93¢ grows to | $2B ($1,997,159,793) | $4B ($3,994,319,585) | $4,283,508,450 |

Sealed card: **$4.3B** (the show's number). The exact balance is above both columns, which is why they are labelled by rule, not LOW and HIGH. Curve marks: year 500 = $63,116; the last 31 years add 49.8% of the total.

**GIVEN sticky (on screen):** "93¢ · 2.25% a year · 1,000 years (Futurama, 1999)". There are no assumptions beyond yearly compounding, which the pinned comment states: every input is the show's.

**Sources**
- **The 93¢, the 2.25% rate, the 1,000 years and the $4.3 billion balance:** *Futurama*, "A Fishful of Dollars" (1999). The balance is confirmed as mathematically correct by Abakcus (https://abakcus.com/video/futurama-93-cents-turned-43-billion-dollars) and VICE (https://vice.com/en/article/futurama-taught-me-everything-i-know-about-compound-interest). Both were found by WebSearch on 2026-10-07 and recorded in `research/raw/web-trends-and-whitespace.md` §1.10, with the research team's own check ($4,283,508,449.71), which the math check reproduces. QA could not re-load either page (abakcus.com is egress-blocked; see the log).
- **Rules of 72 and 70:** pure arithmetic, no external input. The rule of 72 is exact at 7.85%; at 2.25% the exact constant is 70.09. Both are in the math check.
- **IP note:** we name the show and quote its numbers. We do not draw Fry or use any clip, still or audio.

**Ending**
- **Loop line:** "All from…" flows straight into "Fry's ninety-three cents. In the bank. For a thousand years." as one sentence. The spec's `loop: true` crossfades the last 0.35 s into frame 0, so the picture loops with the sentence.
- **Comment bait (a real question):** "Which one did you learn: the rule of 72 or the rule of 70?"
- **Pinned comment:**
  > Exact: $4,283,508,449.71 (0.93 × 1.0225^1000; the show rounds it to $4.3 billion). Envelope said ≈ $4B with the rule of 70, within 7%. The rule of 72 said ≈ $2B, 53% low. Why: at 2.25% money doubles every 31.15 years, so 1,000 years is 32.1 doublings, and one extra doubling is worth $2B here. Rule of thumb: 72 is tuned for rates near 8%; near 2%, divide 70 by the rate. At year 500 the balance is only $63,116. Assumptions: compounded yearly. Source: Futurama, "A Fishful of Dollars" (1999): 93¢ at 2.25% a year for 1,000 years. Which rule did you learn?

**Description**
> Fry left 93 cents in the bank for 1,000 years at 2.25%. The show says he woke up to $4.3 billion. We worked it out on the back of an envelope: the rule of 72 says about $2B, the rule of 70 says about $4B, and the exact answer is $4.28B. Rough math, real money. Exact figures are in the pinned comment.
> Sources: Futurama, "A Fishful of Dollars" (1999); balance checked by Abakcus and VICE (checked Oct 7, 2026). Doubling-rule math is ours.
> Educational math, not financial advice.
> #EnvelopeMath #SealedAnswer #Futurama #CompoundInterest #MoneyMath

**Platform notes**
- **YouTube Shorts:** post the 33.9 s master. Title = tape hook + series tag. Pin the exact-figures comment. The rule-of-72 vs 70 disagreement is the "math police" comment engine (report 01 §3.7), so reply to corrections with the pinned math.
- **Instagram Reels:** same cut, at most 5 hashtags. The send line for the caption: "send this to the friend who swears by the rule of 72". Run it as a Trial Reel first; it is pure fandom plus math and should travel to non-followers.
- **TikTok:** make a 62 s cut for Creator Rewards and the longer-video reach lift (+43.2%, Buffer). Add two beats before the seal:
  - "Why 70?": the exact doubling time is 31.15 years, so the true constant is 70.1.
  - "Year 900: $463M. Year 950: $1.4B. Year 1,000: ?"
  Keep the reveal at about 90% and the stamp in the last 2 s.

**Why this one should travel**
- **Proven subject, empty format.** Futurama compound-interest Shorts broke out at **1,442x on a 169-sub channel** and 2.74M views for PikaFloats. Every one of them leans on the clip. Ours is the first that *does the doubling on screen* and has no Content ID exposure.
- **A guess almost everyone gets wrong.** Gut guesses for "93 cents after 1,000 years" are wildly low. The commit-then-reveal gap is huge, which is the mechanism behind LIE HARD's 3,339x.
- **A save-worthy rule plus a correction fight.** "Use 70 at low rates" is a reusable trick (saves), and the 72-vs-70 bet is the deliberate, labelled "well actually" the research recommends (§3.7).

---

#### 07B: What's in all 100 envelopes?

- **Working title:** The 100 Envelope Challenge: how much is in all 100? Guess first. (Sealed Answer No. 07B)
- **Money topic:** savings challenges and cash-envelope budgeting (the other meaning of "envelope")
- **Lane / runtime:** Envelope, **27.8 s** master
- **Spec:** `engine/specs/07-sealed-envelope-estimate-b.json` · **Sheet:** `engine/out/sheets/07-sealed-envelope-estimate-b.png`

**Frame-1 hook** (all on screen at frame 0)
- **On screen (tape):** **THE 100 ENVELOPE / CHALLENGE: / HOW MUCH IN *ALL 100*?** A full 10 × 10 grid of ✉️ sits underneath, labelled "$1, $2, $3 … $100".
- **First spoken line (0.2–2.8 s):** *"The hundred envelope challenge: how much in all?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.8 | Hook | Tape hook; the filled 100-envelope grid "$1, $2, $3 … $100" |
| 2.8–6.2 | Guess window | Grid clears; sealed envelope "all 100 = ?"; 3-s PAUSE & GUESS timer (3.1–6.1) |
| 6.3 | Flip | |
| 6.6–9.6 | Set-up + LOW (**first payoff, 28%**) | RULES sticky "#1 holds $1, #2 holds $2 … #100 holds $100."; 100 ENVELOPES stamp; "LOW: every envelope $1" → **100 × $1 = $100** at 7.7 |
| 9.7–12.5 | HIGH (39%) | "HIGH: every envelope $100" → **100 × $100 = $10,000** at 10.8 |
| 12.6–16.2 | The estimate | "MIDDLE: average ≈ $50" → red **100 × $50 ≈ $5,000** at 13.7, circled |
| 16.3 | Flip | New side: tape "EXACT TOTAL: SEALED"; sealed envelope "ours: ≈ $5,000" |
| 16.6–19.7 | Range ruler | Ruler $100 … $10,000 draws; red ✗ beyond each end ("already out") |
| 19.8–22.8 | Lock-in | "your guess: $ ______" written above the envelope |
| 22.9–24.0 | **Reveal (86%)** | Envelope opens: **$5,050**, "exactly halfway"; ding at 23.8 |
| 24.3 | Score | Red arrow drops at the dead centre of the ruler, "$5,050" |
| 25.9 | **Verdict (last 2 s)** | ROUGHLY RIGHT slams |
| 25.6–27.8 | Re-hook | "Now guess the fifty-two week challenge." |

**Voice-over**

> The hundred envelope challenge: how much in all? *(0.2)*
> A dollar in the first, a hundred in the last. Guess the total. *(2.9)*
> Low end: every envelope a dollar. A hundred bucks. *(6.6)*
> High end: every envelope a hundred. Ten grand. *(9.7)*
> Even steps, so the average is about fifty. Call it five grand. *(12.6)*
> Under a hundred, or over ten grand? You're already out. *(16.6)*
> The exact total's in here. Lock in your guess. *(19.8)*
> Five thousand fifty. Exactly halfway. *(23.2)*
> Now guess the fifty-two week challenge. *(25.6, re-hook)*

**The envelope math (3 lines)**
1. `LOW: 100 × $1 = $100`
2. `HIGH: 100 × $100 = $10,000`
3. `MIDDLE: 100 × $50 ≈ $5,000` (the exact average envelope is $50.50)

Sealed card: **$5,050**. It is exactly (100 + 10,000) ÷ 2, because the envelopes rise evenly. Pairing check: $1 + $100 = $101, × 50 pairs = $5,050.

**RULES sticky (on screen):** "#1 holds $1, #2 holds $2 … #100 holds $100." There are no real-world inputs beyond the challenge's rules.

**Sources**
- **The challenge rules and the $5,050 total:** Bustle (https://www.bustle.com/life/hundred-envelope-challenge-tiktok); Chime, "how to save $5,000 in 3 months" (https://www.chime.com/blog/100-envelope-challenge-how-to-save-5000-in-3-months/?bapage=1).
- **150M+ TikTok views on the hashtag:** TIME (https://time.com/6249003).
- Both were found by WebSearch on 2026-10-07 and recorded in `research/raw/web-creator-case-studies.md` (line 222) and `research/raw/web-trends-and-whitespace.md` §1.2. The total itself is exact arithmetic (Gauss sum), recomputed in the math check. QA could not re-load bustle.com or chime.com (egress-blocked).
- **The 52-week challenge ($1 in week one … $52 in week 52 = $1,378):** `research/raw/web-trends-and-whitespace.md` line 63, recomputed in the math check.
- **#cashstuffing scale (≈1.9B views across ≈103K posts):** Canstar, via `research/raw/web-trends-and-whitespace.md` §1.1 (2026-10-07). This is planning context only and never appears on screen or in the description.

**Ending**
- **Re-hook:** "Now guess the fifty-two week challenge." It is spoken over the verdict frame (the stamp lands under it at 25.9 s) and hands the viewer the next sealed question. The 52-week answer is the next episode.
- **Comment bait (a real question):** "Guess the 52-week total ($1 in week one, $52 in week fifty-two). It opens in the next envelope."
- **Pinned comment:**
  > Exact: $5,050 (envelope said ≈ $5,000, within 1%). It's exactly halfway between the all-$1 floor ($100) and the all-$100 ceiling ($10,000), because the envelopes climb by the same $1 each time. The same trick: pair $1 + $100, $2 + $99 … 50 pairs of $101. Rule for any "add a dollar each time" challenge: (first + last) ÷ 2 × how many. The 52-week answer opens in the next envelope; no spoilers, but it's between $52 and $2,704. Source: the challenge's rules (Bustle, Chime). Doing the challenge? Which envelope are you on?

**Description**
> The 100 Envelope Challenge: $1 in envelope one, $100 in envelope 100. How much is in all of them? We bounded it on the back of an envelope (at least $100, at most $10,000, about $5,000 in the middle), then opened the sealed answer: $5,050, exactly halfway. Rough math, real money. Exact figures are in the pinned comment.
> Source: 100 Envelope Challenge rules (Bustle, Chime; checked Oct 7, 2026).
> Educational math, not financial advice.
> #EnvelopeMath #SealedAnswer #100EnvelopeChallenge #CashStuffing #SavingsChallenge

**Platform notes**
- **YouTube Shorts:** post the 27.8 s master. Cash stuffing tops out at 146K on Shorts (report 01 §5.3); this works there only because the hook is a guess, not a stuffing ASMR clip. Keep "The 100 Envelope Challenge: how much is in all 100?" as the title.
- **Instagram Reels:** the strongest sends candidate of the three. The caption line is "send this to whoever's on day 1 of the 100 Envelope Challenge" (Instagram weights sends most for non-followers, report 01 §4.1). Use at most 5 hashtags.
- **TikTok:** this is TikTok's home trend (#cashstuffing ≈ 1.9B views). Cut to 60 s by adding the pairing proof on screen ($1 + $100, $2 + $99 …) after the reveal, and stitch-friendly framing ("check your binder").
- **Scheduling note:** the 100 Envelope Challenge total is also listed in approach #8's "verified puzzle bank" (`research/02-top-10-approaches.md`, line 556). The #8 teasers don't use it, but the calendar should run it once, here, as a sealed estimate.

**Why this one should travel**
- **It names the trend and the channel's double meaning.** The research's whitespace #3 is "nobody does the math behind cash-stuffing… the Gauss sum behind the 100-envelope challenge" (report 01 §6). The hashtag has 150M+ views, and its total is never shown as math. Naming the challenge on the tape lets its audience recognise it in frame 1.
- **The bounds trick is the save.** "At least, at most, middle" is the Fermi move in its purest form, and here the middle is *exactly* right. That's a satisfying surprise, and a rule viewers can reuse on any savings challenge.
- **Built-in sequel.** The 52-week envelope is a ready-made second episode, the "follow for part 2" pull that Monica and Abdullah Habib used.

---

#### 07C: What did the Eras Tour make?

- **Working title:** How much did the Eras Tour make? 149 shows. Guess first. (Sealed Answer No. 07C)
- **Money topic:** live-event business and celebrity money (the "pocket watching" lane, built on a public box-office figure rather than a guess at someone's personal income)
- **Lane / runtime:** Envelope, **30.5 s** master
- **Spec:** `engine/specs/07-sealed-envelope-estimate-c.json` · **Sheet:** `engine/out/sheets/07-sealed-envelope-estimate-c.png`
- **Status: VERIFY before posting** (see the sources below)

**Frame-1 hook** (all on screen at frame 0)
- **On screen (tape):** **149 SHOWS. / HOW MUCH DID THE / *ERAS TOUR* MAKE?**, with a 🎤. The sealed envelope's red note reads "$1B? $2B? $3B?".
- **First spoken line (0.2–2.3 s):** *"How much did the Eras Tour make?"*

**Beat sheet**

| Time | Beat | On screen |
|---|---|---|
| 0.0–2.3 | Hook | Tape hook + 🎤; sealed envelope "$1B? $2B? $3B?" |
| 2.4–5.6 | Guess window | 3-s PAUSE & GUESS timer (2.6–5.6) |
| 5.8 | Flip | |
| 6.1–9.6 | Set-up | ASSUME sticky "60K–75K fans a night. Avg ticket $150–$250. Our guesses, not data."; 149 SHOWS stamp; LOW / HIGH tags; "149 × 60K–75K" |
| 9.7–12.6 | **Partial payoff (32%)** | Tickets **8.9M \| 11.2M** at 9.9 ("about 9 to 11 million") |
| 12.7–15.6 | Line 2 | "× avg ticket **$150 \| $250**" |
| 15.7–18.6 | Line 3 | "= gross **$1.3B \| $2.8B**", boxed in red |
| 18.7–21.0 | Sanity middle | Red "middle ≈ $2B" |
| 21.1 | Flip | Tape "BILLBOARD'S TOTAL: SEALED"; range ruler $1.3B … $2.8B; sealed envelope "ours: $1.3B – $2.8B" |
| 24.35–26.1 | Lock-in | "your guess: $ ______"; "Final guess?" |
| 26.2–27.3 | **Reveal (89%)** | Envelope opens: **$2.08B**, "Billboard Boxscore"; ding at 27.1 |
| 27.4 | Score | Red arrow lands "real" just right of the ruler's middle (inside our range) |
| 28.6 | **Verdict (last 2 s)** | ROUGHLY RIGHT slams |
| 28.7–30.5 | Re-hook | "Who should I open next?" |

**Voice-over**

> How much did the Eras Tour make? *(0.2)*
> A hundred forty-nine shows. Lock in a guess. *(2.4)*
> Stadiums. Say sixty to seventy-five thousand fans a night. *(6.1)*
> That's about nine to eleven million tickets. *(9.7)*
> Average ticket: a hundred fifty to two-fifty. *(12.7)*
> So: one point three to two point eight billion. *(15.7)*
> Middle of the range: about two billion. *(18.7)*
> Billboard counted every show. Their number's in here. *(21.5)*
> Final guess? *(24.7)*
> Two point oh eight billion. Inside our range. *(26.4)*
> Who should I open next? *(28.7, re-hook)*

**The envelope math (3 lines, LOW | HIGH)**

| | LOW | HIGH |
|---|---|---|
| 1. tickets: 149 × 60K–75K | 8.9M (8,940,000) | 11.2M (11,175,000) |
| 2. × avg ticket | $150 | $250 |
| 3. = gross | $1.3B ($1,341,000,000) | $2.8B ($2,793,750,000) |

Middle ≈ $2B (arithmetic midpoint $2.07B, geometric $1.94B). Sealed card: **$2.08B**. Ruler arrow at 50.7% of the range (x = 504 px on the 200–800 px ruler; 511 px if you measure against the rounded $1.3B and $2.8B labels).

**ASSUME sticky (on screen):** "60K–75K fans a night. Avg ticket $150–$250. Our guesses, not data." Both are stated as assumptions, not claims. If the Billboard figures verify, the real averages (68,242 fans a night, $204.33 a ticket) fall inside both ranges; the math check asserts this.

**Sources (VERIFY: not checked by the writer or by QA)**
- **149 shows; $2,077,618,725 gross; 10,168,008 tickets:** Billboard Boxscore final tally of the Eras Tour (December 2024). **Unverified.** The writer's and QA's WebSearch budgets were both exhausted; billboard.com and wikipedia.org were egress-blocked, and apnews.com refused the fetch. These are the widely reported final figures as both the writer and QA know them, which is not verification. Before posting, search "Eras Tour Billboard Boxscore final gross 149 shows", paste the Billboard URL and date here and in the description, and re-run the math check if any figure differs (it will fail loudly on the card, the pinned averages and the arrow position).
- Everything else (stadium sizes, ticket averages) is an on-screen assumption, not a statistic.
- **Likeness note:** this uses the public box-office gross, not an estimate of anyone's personal income. No image of the artist, no music, no concert footage. The 🎤 emoji only.

**Ending**
- **Re-hook / loop:** "Who should I open next?" It is spoken over the verdict frame and flows back into frame 1's "How much did the Eras Tour make?", a question to a question, with a sealed envelope on screen in both.
- **Comment bait (a real question):** "Who should we open next? Name a tour, a creator or a business."
- **Pinned comment:**
  > Exact: $2,077,618,725 from 149 shows and 10,168,008 tickets (Billboard Boxscore, Dec 2024). Envelope said $1.3B–$2.8B, middle ≈ $2B, within 4%. The real averages were 68,242 fans a night and $204.33 a ticket, both inside our assumptions. That's about $13.9M a night. Assumptions: 60K–75K fans a night and a $150–$250 average ticket (our guesses). Who should we open next?

**Description**
> How much did the Eras Tour make? 149 shows, worked out on the back of an envelope: 9 to 11 million tickets, times a $150 to $250 average ticket, gives $1.3B to $2.8B. Then we opened Billboard's number: $2.08 billion, about $14 million a night. Rough math, real money. Exact figures are in the pinned comment.
> Source: Billboard Boxscore, final Eras Tour tally (Dec 2024) [URL to add at verification]. Stadium sizes and ticket averages are our assumptions.
> Educational math, not financial advice.
> #EnvelopeMath #SealedAnswer #ErasTour #TaylorSwift #MoneyMath

**Platform notes**
- **YouTube Shorts:** post the 30.5 s master. The famous-noun title does the discovery work (report 01 §3.2). Pin the comment and answer "do X next" requests: that is the calendar.
- **Instagram Reels:** the caption send line is "send this to the Swiftie who still has their wristband". Use at most 5 hashtags. Fan-account resharing is the likely amplifier.
- **TikTok:** cut to 60 s+ by adding a second Fermi pass after the reveal ("per night: $2.08B ÷ 149 ≈ $14M") and a "who's next" poll in the comments. Do not use the artist's music: original foley only. Licensed music also cuts Shorts revenue share (report 01 §4.3).

**Why this one should travel**
- **The biggest pocket-watching subject on the internet, with no defamation risk.** It's jamaal's 908x mechanic ("how much does X make?") pointed at a public box-office figure instead of someone's private income.
- **A true Fermi range that brackets the truth.** Viewers see the method work: the real figure lands just right of the middle of our range. That's the "rough but right" brand promise in one frame.
- **A comment engine, not bait.** Fans will argue about the inputs (stadium sizes, resale prices) and nominate the next subject. That is the jamaal and Monica pattern that turns comments into a content calendar.

---

### Math check

Script: `teasers/07-sealed-envelope-estimate-mathcheck.py` (python3, standard library only). Run it with `python3 teasers/07-sealed-envelope-estimate-mathcheck.py`. It has three jobs:
- **Math.** It recomputes every spoken, written, carded and pinned number in all three teasers and asserts each rounding.
- **Spec cross-check.** It opens the three engine specs and asserts that every on-screen number string is present, that 07A carries no LOW/HIGH labels, that the curve uses the show's inputs, and that both ruler arrows sit where the math puts them.
- **Timing rules.** For each spec it asserts:
  - the hook is on screen at frame 0;
  - the first payoff lands by 40%;
  - the hero card is out at 85–95%;
  - the verdict stamp falls in the last 2 s;
  - there is one VO line per caption;
  - every caption gets at least 0.25 s per word.

The 07C checks prove the arithmetic only. They cannot prove that the three Billboard inputs are right; that is what the VERIFY step is for.

**Output** (QA run, 2026-10-07; intermediate print lines kept, `[ok]` lines for the on-screen string checks trimmed):

```
========================================================================
07A  Fry's 93 cents, 1,000 years at 2.25% (Futurama, 'A Fishful of Dollars', 1999)
========================================================================
  exact balance 0.93 x 1.0225^1000 = $4,283,508,449.71
  rule of 72: 32.00 yrs -> 31.25 doublings; rule of 70: 31.11 yrs -> 32.14 doublings
  rule of 72: 93c x 2^31 = $1,997,159,792.64; rule of 70: 93c x 2^32 = $3,994,319,585.28
  rule of 70 is 6.75% low; rule of 72 is 53.38% low
  exact doubling time 31.15 yrs -> 32.10 doublings; exact constant 70.09
  the rule of 72 is exact at 7.85%
  year 500: $63,116.26; year 900: $462,879,514; year 950: $1,408,100,958
  share of the final balance earned in the last 31 years: 49.83%
  [ok] 07A spec has no LOW/HIGH labels (they implied the $4B was a ceiling)
  [ok] 07-sealed-envelope-estimate-a: hook fully on screen at frame 0 (t <= -0.5)
  [ok] 07-sealed-envelope-estimate-a: first payoff by 40% (12.6 s of 33.9 s = 37%)
  [ok] 07-sealed-envelope-estimate-a: hero card out at 85-95% (30.85 s = 91%)
  [ok] 07-sealed-envelope-estimate-a: verdict stamp in the last 2 s (31.9 s, ends 33.9 s)
  [ok] 07-sealed-envelope-estimate-a: one VO line per caption (12)
  [ok] 07-sealed-envelope-estimate-a: every caption gets >= 0.25 s per word
========================================================================
07B  The 100 Envelope Challenge ($1 in envelope 1 ... $100 in envelope 100)
========================================================================
  LOW 100 x $1 = $100; HIGH 100 x $100 = $10,000; average $50.50; estimate $5,000; exact $5,050
  ruler arrow x = 500.0 px (ruler 200..800)
  [ok] 07B arrow at the dead centre of the ruler
  [ok] 07-sealed-envelope-estimate-b: hook fully on screen at frame 0 (t <= -0.5)
  [ok] 07-sealed-envelope-estimate-b: first payoff by 40% (7.7 s of 27.8 s = 28%)
  [ok] 07-sealed-envelope-estimate-b: hero card out at 85-95% (23.95 s = 86%)
  [ok] 07-sealed-envelope-estimate-b: verdict stamp in the last 2 s (25.9 s, ends 27.8 s)
  [ok] 07-sealed-envelope-estimate-b: one VO line per caption (9)
  [ok] 07-sealed-envelope-estimate-b: every caption gets >= 0.25 s per word
========================================================================
07C  The Eras Tour gross. INPUTS NOT VERIFIED IN THIS RUN (see the md's VERIFY gate)
========================================================================
  tickets 8,940,000 | 11,175,000; gross $1,341,000,000 | $2,793,750,000
  middle: arithmetic $2,067,375,000; geometric $1,935,566,777
  '$2B' vs exact: 3.74%
  per show $13,943,750; avg ticket $204.33; avg crowd 68,242
  ruler arrow x = 504.2 px (exact ends); 511.0 px against the rounded labels
  [ok] 07C arrow at the exact position
  [ok] 07-sealed-envelope-estimate-c: hook fully on screen at frame 0 (t <= -0.5)
  [ok] 07-sealed-envelope-estimate-c: first payoff by 40% (9.9 s of 30.5 s = 32%)
  [ok] 07-sealed-envelope-estimate-c: hero card out at 85-95% (27.25 s = 89%)
  [ok] 07-sealed-envelope-estimate-c: verdict stamp in the last 2 s (28.6 s, ends 30.5 s)
  [ok] 07-sealed-envelope-estimate-c: one VO line per caption (11)
  [ok] 07-sealed-envelope-estimate-c: every caption gets >= 0.25 s per word
========================================================================
ALL 102 CHECKS PASSED
```

---

### Verification log

QA pass, 2026-10-07: an independent fact-check, edit and visual QA of the writer's draft. The writer's originals are superseded in place; `git diff` shows every change.

#### 1. Math

- **Method.** Every number in the md and in all three specs was recomputed from scratch with python3 before reading the writer's script: on-screen text, card values, curve marks, arrow positions, captions, VO, pinned comments, descriptions and the TikTok-cut beats.
- **Arithmetic: no errors found.** All of these reproduce exactly:
  - 07A: $4,283,508,449.71; 32 / 31.25 / 31.11 / 32.14; $1,997,159,793 / $3,994,319,585; 6.75% and 53.38% low; 31.15 yrs; 70.09; 7.85%; $63,116; 49.83%; year 900 $463M, year 950 $1.41B.
  - 07B: $100 / $10,000 / $50.50 / $5,050 / 0.99%; x = 500; 52-week $1,378.
  - 07C: 8.94M / 11.175M; $1.341B / $2.794B; midpoints $2.067B / $1.936B; 3.74%; $13.94M; $204.33; 68,242; x = 504.2.
- **Wrong by framing (07A).** The working was labelled **LOW | HIGH** and the sealed envelope read "ours: $2B – $4B". The exact balance, $4.28B, is above the "HIGH" column, so the on-screen range excluded the answer while calling $4B a ceiling. The two columns are two rules of thumb, not bounds.
  - **Changed:** the headers now read RULE OF 72 | RULE OF 70, and the envelope asks "$2B or $4B?".
  - The VO now frames a bet ("Two billion or four?" → "Seventy wins") instead of a range, and the md tables follow.
  - The math check now asserts that neither column is labelled a bound.
- **Rounding disclosure.** 07C's arrow sits at the exact-range position (504 px). Measured against the rounded ruler labels it would be at 511 px. That is a 7 px difference, and it is now noted under the 07C math.
- **Math check.** The old script checked only arithmetic (38 checks), and only against numbers typed into the script, so a spec could drift from the md without failing it. The rewritten script runs 102 checks: it loads the specs and asserts the on-screen strings, the arrow positions and the beat timings (see [Math check](#math-check)). The md's embedded copy of the old script was replaced by a description plus the output, so the two can't drift apart.

#### 2. Facts (as of 2026-10-07)

**QA could not verify anything live.**
- The shared WebSearch budget for this turn was already used up when QA started; every query was refused.
- Direct fetches of the cited pages were refused by the egress proxy: abakcus.com, bustle.com, chime.com, billboard.com and wikipedia.org.
- apnews.com refused the fetch.

| Input | Value | QA status |
|---|---|---|
| Futurama, "A Fishful of Dollars" (1999): 93¢, 2.25%, 1,000 years, $4.3B | as stated | **Corroborated in the repo**: research WebSearch on 2026-10-07, recorded with URLs in `raw/web-trends-and-whitespace.md` §1.10. Internally consistent: 0.93 × 1.0225^1000 = $4.28B rounds to the show's $4.3B. QA did not re-load the pages. |
| 100 Envelope Challenge: $1 … $100 = $5,050 | as stated | **Corroborated in the repo** (`raw/web-creator-case-studies.md` line 222; `raw/web-trends-and-whitespace.md` §1.2). The total is a pure Gauss sum. |
| 52-week challenge = $1,378 | as stated | Corroborated in the repo (`raw/web-trends-and-whitespace.md` line 63) and pure arithmetic. |
| 100 Envelope Challenge 150M+ TikTok views (TIME) | description context | Corroborated in the repo. Not on screen. |
| Eras Tour: 149 shows, $2,077,618,725, 10,168,008 tickets (Billboard, Dec 2024) | as stated | **UNVERIFIED.** Nothing in the repo corroborates it. It matches QA's own reference knowledge, but that is not a citation. **The VERIFY gate stays.** |
| Evidence table (views, outliers, lengths, timings) | — | Checked line by line against `research/raw/` and `research/watch/`. Two fixes, listed below. |

- **Fixed: OMG Economy's length.** The table said "n/a"; `raw/yt-big-number-math.md` row 31 records **38 s**.
- **Fixed: the 533.5x median.** "The Fermi-estimate cluster had the highest median outlier (533.5x)" now says it rests on **two posts** (`raw/ig-tiktok-outliers.md` line 98, n = 2). The claim is true but thin.
- **Fixed: 07C's VO.** "Billboard tallied all a hundred forty-nine shows" became "Billboard counted every show". The new line is shorter and makes no separate claim.

#### 3. Brand and policy (format bible §2)

| Rule | Before QA | Now |
|---|---|---|
| **≤ 3 lines** | Pass | Pass. 07A's "1 yr apart = $2B apart" is a red-pen note, not a fourth working line. |
| **A number in frame 1** | **Fail in all three.** Every hook, postmark and envelope started at `t: 0` and animates in, so the true first frame (the thumbnail) was a blank kraft envelope. Rendered and viewed at t = 0. | The hook, postmark, sealed envelope, postage stamp, 🎤 and the 07B grid are pre-rolled with a negative `t`. Checked on stills at t = 0 and on the first decoded frame of each rendered MP4. |
| **Honest rounding + exact pinned comment** | Pass on arithmetic. **Fail on framing** in 07A: a range labelled LOW/HIGH that excluded the answer. | Pass. 07A's pin now says "Assumptions: compounded yearly. Source: …", following the bible's template. |
| **No advice language** | Pass | Pass. VO, captions, on-screen text, pins and descriptions were scanned for "should", "need to", "must", "guaranteed", "get rich" and "financial freedom in". The only "should" is "Who should I open next?", a question about the next episode. |
| **No borrowed footage or impersonation** | Pass | Pass. Futurama and Billboard appear only as names and quoted figures; there are no clips, stills, characters, music or likeness. |
| **Disclaimer** | Pass | Pass: all three descriptions end "Educational math, not financial advice." |

#### 4. Virality

Hooks were scored 1–10 against `research/02-top-10-approaches.md` §7 (evidence, anatomy, hook formulas) and the watch breakdowns: LIE HARD `group2-video4`, jamaal `group1-video2`, Monica `group5-video2`.

| Teaser | Score | What was wrong | What changed |
|---|---|---|---|
| **07A** | 7.5 → 8.5 | The famous noun (Fry, Futurama) was only on a stamp label too small to read, so frame 1 was "93¢ for 1,000 years" with no fandom hook. The Futurama subject is the proven one (1,442x on 169 subs). The frame was blank anyway. | The envelope note is now "Fry's balance now = ?" and the stamp reads FUTURAMA. The first spoken word is "Fry's", so title = tape = first line. |
| **07B** | 7 → 8.5 | "100 ENVELOPES. HOW MUCH IS IN ALL 100?" asked an unanswerable question: the $1 … $100 rule only arrived with the grid at 0.3–2 s, and audio at 2.4 s. It never named the 150M-view trend its audience would recognise. | The tape reads "THE 100 ENVELOPE / CHALLENGE: / HOW MUCH IN *ALL 100*?". The filled grid and its "$1, $2, $3 … $100" label are on screen at frame 0, so a silent viewer can guess. |
| **07C** | 8 → 8.5 | The hook was strong (famous noun, number, three options to rank, as LIE HARD did) but it was invisible at frame 0. | Pre-rolled only; the wording is unchanged. |

**Structure: before → now.**

| Teaser | First payoff | Hero card fully out | Verdict stamp | Runtime |
|---|---|---|---|---|
| 07A | $2B at 34% → 37% | 87% → **91%** | T − 2.8 s → **T − 2.0 s** | 36.8 → **33.9 s** |
| 07B | $100 at 23% → 28% | **81%** → **86%** | **T − 4.2 s** → **T − 1.9 s** | 31.6 → **27.8 s** |
| 07C | 8.9M at 29% → 32% | **84%** → **89%** | T − 3.3 s → **T − 1.9 s** | 34.2 → **30.5 s** |

**Pace.** The writer's VO was not speakable in its windows.
- **How it was measured:** syllables per second per caption window, with 5.0/s as the ceiling for the bible's "calm, dry" voice.
- **Before:** 16 of 33 lines were over the ceiling. For example:
  - 07A line 2 had about 21 syllables in 3.3 s (6.4/s).
  - 07A's reveal line had about 19 syllables in 2.6 s (7.3/s).
  - 07B's reveal line had about 19 syllables in 2.7 s (7.0/s).
- **Now:** every line is 5.0/s or under. Words were cut rather than windows stretched.

**Slow beats cut.**
- **07C:** "Still happy with your guess?" was a 2.7 s filler line with nothing new on screen. It became a 1.4 s "Final guess?" over the "your guess" blank. The "fourteen million a night" tail was moved out of the ending (it stays in the pin, the description and the TikTok cut).
- **07A:** the 2.6 s post-reveal "within 7%" sentence is now a written line under the stamp, and the loop line was shortened to "All from…".
- **07B:** the flip to a separate "next envelope" was removed. It pushed the verdict 4.2 s before the end. The re-hook is now spoken over the verdict frame.

**Endings.**
- **07A:** "Four point three billion. Seventy wins. All from…" is one sentence with the opening "Fry's ninety-three cents", so the loop is seamless.
- **07B:** re-hooks to the 52-week challenge.
- **07C:** re-hooks with "Who should I open next?".
- **All three:** `loop: true` crossfades the last 0.35 s into frame 0, so a replay has no visual seam.

#### 5. Visual QA

**The engine changed during this QA pass.** Commits 78384a3 (frame 0, sealed envelopes, loop, new linter boxes) and 9966727 (minimum phone-legible text sizes) landed while QA was working. QA did not touch `engine/src`; the specs were brought up to the current engine and linter instead.

| Engine change | What QA did in the 07 specs |
|---|---|
| Postmark: README standard is now (175, 258), r 100, in the flap; the linter now boxes its ring. The old (190, 300) ring collided with 07A's curve and with 07B's hook and card. | All three use the standard postmark. |
| Envelope with no `openAt` stays sealed; the seal, note and label now scale with `w` / 780. | `openAt: 60` removed from the three never-opening envelopes. 07A's frame-1 envelope widened to `w` 780, so its "Fry's balance now = ?" note renders at the full 54 px. |
| Linter boxes the card that rises from an opened envelope, and postage stamps. | 07A's frame-1 93¢ stamp is deliberately stuck on the envelope's corner, so it carries `allowOverlap: true`. |
| Linter minimum text size: handwriting ≥ 56 px, typewriter ≥ 40 px. | 22 items were raised: sticky text 44–46 → 56, row labels 50–54 → 56, column heads 38 → 40, card second lines 46–50 → 56, ruler labels 52–54 → 56. Curve marks 50 → 56 too, though the linter doesn't check them. Stickies were widened (07A/07B 440 px, 07C 520 px) to stay at three lines. 07B's rule now reads "#1 holds $1, #2 holds $2 … #100 holds $100." 07C's sticky and its postage stamp moved right and down to clear the postmark. |
| `loop: true` crossfades the last 0.35 s into frame 0; captions take a `say` field. | All three specs set `loop: true`, and every caption carries its VO line as `say`. |

**Results.**
- **`check`:** zero warnings on all three specs against the current engine. During the rework the linter also caught 07B's sealed envelope touching the timer ring at y = 860; it is back at y = 855.
- **Contact sheets** (`engine/out/sheets/07-sealed-envelope-estimate-{a,b,c}.png`, 12 frames each) and **stills** were rendered and viewed after every change. Stills on disk: t = 0 for all three; 07A at 23.6, 27.5 and 33.4; 07B at 14.9 and 27.3; 07C at 18.5, 25.6 and 30.0.

**Problems found and fixed.**
- In all three endings the **ROUGHLY RIGHT stamp covered the envelope's "SEALED ANSWER" label**, and in 07A the moving pen crossed the stamp. All three stamps now sit on the envelope body (07A y 990; 07B and 07C y 900), clear of the label.
- **07A "rule of 70: within 7%"** got only 0.83 s on screen after it finished writing, for 5 words. It now writes faster (cps 36), is larger (60 px) and has 1.3 s.
- **07C "your guess: $ ______"** got 0.73 s after writing. It now starts at 24.35 s at cps 30 and has 1.1 s.
- **Captions:** 3 of the writer's captions were under 0.25 s per word: 07A 0.2–2.3, 07A 24.8–28.2 and 07B 2.4–5.6. All captions now clear 0.25 s per word, and both the math check and the linter enforce it.

**MP4s.** All three were rendered with `node src/cli.js render` on the final specs: 33.9 s, 27.8 s and 30.5 s. The first decoded frame of each shows the full hook, a number and the sealed envelope.

**No engine requests.** Every fix used ops and params the engine already has.

#### 6. Still open

- **07C's Billboard figures are unverified.** Search, cite (URL + date) and re-run the math check before posting 07C.
- **Re-load the Futurama and 100 Envelope sources on publish day.** The research team verified them by WebSearch on 2026-10-07, but QA could not re-load them.
