# Envelope Math: Format Bible

**Channel:** Back of the Envelope · **Format brand:** Envelope Math · **Tagline:** *Rough math. Real money.*

This page is the rulebook every teaser and episode follows. It exists so that a viewer who sees one
frame with the sound off knows it's ours, and so that whoever produces the next one can't
drift off-brand. It is derived from the research in `research/` and built for the renderer in
`engine/`.

---

## 1. The thesis (why this channel can win)

The research found the same gap in every finance-math cluster: **the biggest finance shorts quote a
number, but almost none show the math.**

- Story Snap's "$1B = 32 years of your life" (9.4M views) is a back-of-the-envelope conversion, but it is narrated over B-roll.
- "$200M once or $20/second?" (5.6M) never shows the 116-day break-even.
- "Cost in Units of iPhone 17 Pro" (14.9M, from 3.5K subs) is a Fermi estimate with no working shown.
- The one video in the sweep with visible hand arithmetic ("someone let me know if I did this math correctly", 1.29M) got its comments *because* of the visible working.

**Envelope Math's job is to make the calculation itself the visual.** Every video takes a number
people already argue about and works it out in three lines or fewer, in ink, on the back of an envelope.
Then it seals the answer for the viewer to guess before revealing it.

## 2. Non-negotiables

1. **Three-line rule.** The core calculation fits in 3 handwritten lines or fewer. If it needs more, it's two videos.
2. **A number in frame 1.** The first frame (which is also the thumbnail) shows a concrete dollar figure, price, wage or dilemma. Never a concept name ("compound interest explained").
3. **Round honestly, then check.** We round on purpose ("call it $5", "≈ 30 million seconds") and say so. The **exact figure goes in the pinned comment**, plus how far off the envelope was ("within 3%"). A deliberate rounding invites "well actually" comments without us ever being wrong.
4. **Math must be right.** Every number is recomputed before publishing. Real-world inputs (prices, salaries, rates) cite a source in the description, with the date. When an input is an assumption, it goes on an **ASSUME: sticky note** on screen.
5. **Partial payoff early, big number last.** Give a first answer by about 40% of the runtime; save the biggest number or verdict for the last 2 seconds.
6. **End on a loop or a re-hook.** The last line flows back into the first frame, or ends on a second dilemma/question. Outro cards are for series finales only.
7. **No advice, no hype.** We show arithmetic, not recommendations. Use "here's the math", never "you should". Each description carries the standard line: *Educational math, not financial advice.*
8. **No borrowed footage.** No TV/film clips or other creators' content. Everything is drawn: stories use our own characters, and real brands appear only as names and prices.

## 3. Signature devices (the "envelope vocabulary")

Each device maps to an engine op (`engine/README.md`).

| Device | What it is | Use it for | Engine op |
|---|---|---|---|
| **The Envelope** | Back of a manila catalog envelope: flap, brass clasp, centre seam | The stage for every video | `paper.style: "kraft"` |
| **Ballpoint working** | Blue handwriting with the pen visibly moving | All calculations (≤3 lines) | `lines`, `write` |
| **Red pen** | Circles, underlines, strikes, arrows | The answer, the mistake, the twist | `annotate` |
| **The Sealed Answer** | Envelope closed with a red wax "≈"; it wiggles while you guess, then opens | Every guess-the-number / dilemma reveal | `envelope` |
| **Verdict stamps** | Rubber stamps that slam in | Final verdicts (see the stamp lexicon below) | `stamp` |
| **Postmark No.** | Episode-number postmark, top-left | Series identity, collectability | `postmark` |
| **Postage stamp** | A perforated stamp holding "the unit" | The conversion unit (1 latte = $6) | `postage` |
| **ASSUME: sticky** | Yellow sticky with the assumptions | Rates, years, prices used | `sticky` |
| **Masking-tape hook** | Marker headline on tape strips | The frame-1 hook | `hook` |
| **Receipt** | Thermal receipt printing | Itemised costs, then vs now | `receipt` |
| **Stuffed envelopes** | Labelled cash envelopes filling with bills | Budgets, splits, "where it goes" | `stuff` |
| **Napkin charts** | Hatched bars, a pen-drawn curve, dot grids | Comparisons, growth, odds | `bars`, `curve`, `grid` |
| **Flip** | The envelope flips over to a clean side | Scene change | `flip` |

### Stamp lexicon (verdicts)

| Stamp | Meaning |
|---|---|
| `ROUGHLY RIGHT` | The envelope estimate landed close to the exact figure |
| `WORTH IT` / `NOT WORTH IT` | Value verdicts |
| `RETURN TO SENDER` | A bad deal, a myth, a trap |
| `POSTAGE DUE` | A hidden cost or fee you didn't see coming |
| `FIRST CLASS` | The clear winner in an A-vs-B |
| `SPECIAL DELIVERY` | A surprising bonus or windfall |
| `OPENED BY MISTAKE` | A plot twist: the "obvious" answer was wrong |

## 4. Sound

- **Sonic logo:** pen scratch, then a stamp *thump*. It plays on every verdict.
- **Reveal:** paper rustle, then a single *ding* when the sealed answer opens.
- **Voice:** calm, dry, slightly amused, like a friend checking your math on a napkin. Short sentences, with numbers said the way people say them ("about five grand", not "five thousand dollars").
- **Music:** optional, low and acoustic; the foley is the music.

## 5. Length lanes (from the research)

| Lane | Length | Shape | Use for |
|---|---|---|---|
| **Flash** | 6–14 s | One number, one conversion, hard loop | Unit conversions, per-second facts, puzzle cards |
| **Envelope** | 25–45 s | Hook → 3-line math → sealed answer → verdict → re-hook | Most episodes |
| **Long envelope** | 50–75 s | Chain of 3–5 mini-reveals, each one line | Receipts, business breakdowns, stories |

## 6. Words

- **Hooks:** a specific number + a stake + a question. "Your $6 latte costs $1,560 a year. Is it worth it?" Not "Let's talk about the latte factor."
- **Titles:** keep the number; the word "actually" signals a myth-bust; series names go in brackets: "$200M once or $20 a second? (Envelope Math No. 004)".
- **Pinned comment template:** "Exact: $X (envelope said ≈ $Y, within Z%). Assumptions: … Source: … Want yours? Comment your number."
- **Banned:** "guaranteed", "get rich", "you need to", "financial freedom in", any specific stock-pick framing.

## 7. Layout (1080×1920)

- y 0–230: flap, clasp, postmark; decoration only.
- y 380–620: the masking-tape hook.
- y 600–1300: the working (math, props, charts).
- y 1320–1480: captions.
- Keep anything readable out of the right-hand button rail (x > 940 below y 820).
- `node src/cli.js check` enforces this; `sheet` gives a contact sheet for eyeballing.

## 8. The ten formats (from `research/02-top-10-approaches.md`)

| # | Format | Lane | Lead devices |
|---|---|---|---|
| 1 | **Cost in Envelopes** (unit swap) | Flash / Envelope | `postage` (the unit), `counter`, `grid` or `stack`, `stamp` |
| 2 | **The Rate Clock** | Flash / Envelope | `lines` (rate ÷), `counter`, `ladder` of human times, `stamp` |
| 3 | **The Read-It Ladder** | Flash (6–9 s loop) | `ladder`, hook on tape, no outro, hard loop |
| 4 | **Two Envelopes** (pick-one → crossover) | Envelope | `pick`, `timer`, `curve` with `compare`, `stamp FIRST CLASS` |
| 5 | **The Envelope Split** | Envelope | `stuff` (labelled cash envelopes), `lines`, `sticky` |
| 6 | **Same Pile, Different Place** | Envelope | `ladder` / `bars` with one fixed input, extreme last, `stamp` |
| 7 | **The Sealed-Envelope Estimate** | Envelope / Long | `envelope` (sealed answer), `timer`, `lines`, `sticky`, `stamp ROUGHLY RIGHT` |
| 8 | **The Trap Card** | Flash (5–8 s) | `hook` + one `write` puzzle, red-pen trap, answer in pinned comment / next post |
| 9 | **The Itemized Tally** | Long envelope | `receipt`, running `counter`, `annotate`, `stamp POSTAGE DUE` |
| 10 | **The Envelope Audit** | Envelope | `write` the claim, red-pen `strike`, `lines`, `stamp RETURN TO SENDER` / `ROUGHLY RIGHT` |
