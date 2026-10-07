# Spec contract: the ten formats

Every teaser is one JSON file in `specs/`. The **content** (`header`, `vo`, `data`, …) is look-agnostic: the same `data` block renders in any look kit that implements the format. A look kit decides *how* it looks; this file decides *what* it must show and *when*.

The formats come from [`research/v2/04-formats.md`](../research/v2/04-formats.md) (ranked by benchmark evidence). Hook rules R1–R12 and patterns P1–P9 come from [`research/v2/02-hook-bank.md`](../research/v2/02-hook-bank.md).

## Common fields (every spec)

```jsonc
{
  "id": "01a-clean-sheet-paid-biweekly",   // = file stem: NN + a|b|c + look + slug
  "look": "clean-sheet",                   // clean-sheet | live-sheet | scoreboard | becker-rig
  "format": "dead-simple-list",            // one of the ten format ids below
  "fps": 30,
  "duration": 32.0,                        // optional; otherwise the kit derives it from the last beat + hold
  "header": "3 DEAD SIMPLE NUMBERS\nIF YOU'RE PAID **EVERY 2 WEEKS**",  // the on-screen hook, visible at t = 0
  "footer": "ASSUMES 26 paychecks a year, before tax",                  // assumption line, visible at t = 0 (omit if none)
  "captions": true,                        // show the VO lines in the caption band (y 1320-1480)
  "vo": [                                  // the guide voice-over; recorded later, captions use it now
    { "t": 0.0, "d": 2.2, "text": "Paid every two weeks? Three numbers." }
  ],
  "verdict": { "t": 27.5, "text": "That's **$5,000** you didn't know you had." },  // closing line (R11/R12); optional
  "data": { },                             // format-specific, below
  "sfx": [ { "t": 3.2, "kind": "ding" } ]  // optional extra cues; kits add their own
}
```

**Text markup** (header, labels, verdict, captions): `**x**` = primary emphasis (the kit's highlight: highlighter box, accent colour, neon), `__x__` = second emphasis (costs, debt, the "bad" number), `\n` = line break. Everything else is literal. Use `≈` for every rounded result (the brand's honesty sign), `×` `÷` `−` for operators, and commas in numbers.

**Display strings vs numbers.** Any number that appears as text is a **display string** exactly as written in the spec: the kit never re-formats or computes it. Numbers that drive motion (chart points, counter rates, icon counts) are numeric; their final on-screen value is pinned by a display string (`final`, `display`) so a race or counter always lands on the verified figure.

**Timing.** Every beat carries `t` (seconds from the start) so the picture can be locked to the VO. A kit must honour given times; when a `t` is omitted it applies its own default pacing. **Frame 1 (t = 0) must already show the header and at least one number** (rule R1, enforced by the linter).

**Tone** (`"tone"` on items/rows/options): `good` (money kept/earned), `bad` (cost, debt, loss), `goal` (the final answer), `neutral`. Kits map tones to their palette.

**Duration lanes** (benchmark): 5–14 s silent tables and duels; 26–44 s worked lists and ladders; 30–60 s chart races. The linter allows 5–90 s.

---

## 1. `dead-simple-list` — "N dead simple numbers" (P1)

One example income or amount; numbered empty slots; each slot types `input × 0.X` and swaps (or adds) the answer. First answer by ~3 s.

```jsonc
"data": {
  "input": { "label": "Paycheck", "value": "$2,500", "note": "every 2 weeks" },  // optional badge: the viewer-owned number
  "typeDur": 0.6,                       // seconds to type each formula (default 0.6)
  "items": [                            // 3-6 items; all slots (numbers) visible from t = 0, empty
    { "t": 1.0, "label": "Your real yearly pay", "formula": "$2,500 × 26", "result": "$65,000", "tone": "good",
      "note": "not $60,000", "resultT": 1.9 },   // resultT optional (default t + typeDur + 0.3)
    { "t": 6.0, "label": "Your 2 bonus checks", "formula": "26 − 24", "result": "2 a year", "tone": "good" }
  ]
}
```

## 2. `find-your-row` — find-your-row lookup table (P7)

One row per kind of viewer, denser than one pass can read (5–14 rows). Usually 6–14 s and silent or near-silent. The viewer pauses to find their row.

```jsonc
"data": {
  "columns": [ { "label": "Start at age" }, { "label": "Worth at 65", "emph": true } ],   // 2-4 columns
  "rows": [ ["20", "≈ $345,000"], ["25", "≈ $240,000"], ["30", "≈ $165,000"] ],         // display strings
  "formula": "= $3 × 365 × years, growing 7% a year",   // the rough formula (formula bar / footnote)
  "rowsT": 0.4,          // first row lands
  "rowEvery": 0.25,      // one row per rowEvery s, top to bottom (or give per-row times in "rowT": [..])
  "pick": [ { "t": 5.0, "row": 2, "label": "Most people start here" } ],   // optional pointer landings
  "hold": 4.0            // seconds the full table holds after the last row/pick
}
```

## 3. `what-difference` — "What difference does X make?" (P5)

One fixed debt or pot of money handled 2–4 ways. Each way gets a payoff date/total; the verdict names the winning lever.

```jsonc
"data": {
  "stake": { "label": "Car loan", "value": "$30,000", "terms": "6.5% APR · 60 months" },
  "metrics": [ { "key": "payoff", "label": "Paid off in" }, { "key": "interest", "label": "Interest" } ],
  "options": [   // 2-4
    { "t": 2.0, "name": "Monthly", "detail": "$587 a month", "values": { "payoff": "60 months", "interest": "$5,220" } },
    { "t": 7.0, "name": "Biweekly", "detail": "$294 every 2 weeks", "values": { "payoff": "55 months", "interest": "$4,740" },
      "delta": "−$480", "tone": "good" }
  ],
  "winner": 1,          // index of the winning option; highlighted from verdict.t
  "hold": 3.0
}
```

## 4. `chart-race` — same-stake line-chart race (P4)

The same stake from the same date in 2 (max 3) named rivals; live tip counters; ends dead on the verified final values.

```jsonc
"data": {
  "stake": "$5,000 in Jan 2015",
  "series": [   // numeric points [x, value]; x usually a decimal year
    { "name": "Netflix", "points": [[2015.0, 5000], [2015.5, 7400], [2016.0, 6800]], "final": "$X" },
    { "name": "Disney",  "points": [[2015.0, 5000], [2015.5, 5600], [2016.0, 5200]], "final": "$Y" }
  ],
  "x": { "from": 2015, "to": 2025, "tickEvery": 2 },
  "y": { "prefix": "$", "dp": 0, "compact": false, "log": false },
  "raceT": [2.0, 26.0],         // the x range sweeps across these seconds (linear in x)
  "events": [ { "x": 2020.2, "label": "COVID crash" } ],   // optional flags on the x axis
  "hold": 4.0
}
```

## 5. `split-sheet` — one round sum, every percentage in dollars (P9)

The whole sheet is on screen at frame 1 (labels and percentages); the dollar amounts fill as a pointer walks it.

```jsonc
"data": {
  "total": { "label": "Your paycheck after tax", "display": "$4,000", "value": 4000 },
  "parts": [   // 3-7, in walk order
    { "t": 2.0, "label": "Needs", "pct": "50%", "amount": "$2,000", "note": "rent, food, bills", "tone": "neutral", "share": 0.5 },
    { "t": 5.0, "label": "Wants", "pct": "30%", "amount": "$1,200", "share": 0.3 },
    { "t": 8.0, "label": "Savings", "pct": "20%", "amount": "$800", "tone": "good", "share": 0.2 }
  ],
  "check": "$2,000 + $1,200 + $800 = $4,000",   // optional sum line, shown at checkT
  "checkT": 11.0,
  "hold": 3.0
}
```

## 6. `pov-race` — POV spend-vs-own race (P6)

"POV: you invested in X instead of paying $Y for X's product." Spend line (cumulative cost, worth nothing) against the same money in the stock.

```jsonc
"data": {
  "spend": { "label": "Spent on iPhones", "points": [[2007.5, 499], [2008.5, 698]], "final": "$9,000 spent", "item": "phone" },
  "own":   { "label": "Same money in Apple stock", "points": [[2007.5, 499], [2008.5, 610]], "final": "$X" },
  "purchases": [ { "x": 2007.5, "label": "iPhone", "price": "$499" } ],   // optional ticks on the spend line
  "x": { "from": 2007, "to": 2025, "tickEvery": 3 },
  "y": { "prefix": "$", "dp": 0 },
  "raceT": [1.5, 18.0],
  "hold": 4.0
}
```

## 7. `ledger-duel` — "2 people invest" ledger duel (P4)

Same stake, two choices side by side; a year-by-year ledger fills both columns at once; often a crash row mid-way; ~11–20 s.

```jsonc
"data": {
  "people": [ { "name": "Alex", "plan": "S&P 500 fund" }, { "name": "Sam", "plan": "Savings at 4%" } ],
  "stake": "$10,000 each in 2000",
  "rows": [   // display strings; 6-12 rows
    { "label": "2000", "values": ["$10,000", "$10,000"] },
    { "label": "2008", "values": ["$7,900", "$13,700"], "event": "crash", "tone": "bad" }
  ],
  "rowsT": 1.0, "rowEvery": 0.6,     // or per-row "t"
  "winner": 0,                        // highlighted at verdict.t (or after the last row)
  "hold": 3.0
}
```

## 8. `unit-ladder` — price ladder in a unit you know ("Cost in Units of X") (P8)

Cost ÷ unit price, repeated on a cheap-to-huge ladder; shown as a counter plus a stack/grid of unit icons.

```jsonc
"data": {
  "unit": { "name": "Costco hot dog", "price": "$1.50", "icon": "hotdog" },
  "rungs": [   // 4-7, cheap → huge; units numeric (drives the stack), unitsDisplay is what's printed
    { "t": 2.0, "item": "A month of Netflix", "cost": "$17.99", "units": 12, "unitsDisplay": "≈ 12" },
    { "t": 6.0, "item": "An iPhone 17", "cost": "$799", "units": 533, "unitsDisplay": "≈ 533" }
  ],
  "hold": 3.0
}
```

Icon names every kit supports (a generic token is the fallback): `cup`, `hotdog`, `burger`, `pizza`, `phone`, `car`, `house`, `coin`, `bill`, `gas`, `ticket`, `bag`, `egg`, `hour` (an hour of work).

## 9. `growth-ladder` — year-by-year growth ladder (P2)

One small monthly amount; one row per year (or per 5 years) unmasks; the biggest number is the last row.

```jsonc
"data": {
  "input": { "amount": "$100", "per": "a month", "rate": "8% a year" },
  "columns": ["Year", "You put in", "Worth"],
  "rows": [ ["1", "$1,200", "$1,245"], ["10", "$12,000", "$18,295"], ["30", "$36,000", "$149,036"] ],
  "rowsT": 1.5, "rowEvery": 1.2,     // or per-row "rowT": [..]
  "highlightLast": true,
  "hold": 3.0
}
```

## 10. `cost-counter` — real-time cost counter

A dollar counter ticks at a fixed real rate over one continuous stretch; milestones flash as it passes them.

```jsonc
"data": {
  "label": "Interest on the US national debt",
  "perSecond": 36000,                  // dollars per real second (numeric)
  "rateDisplay": "≈ $36,000 every second",
  "counterT": [1.0, 25.0],             // the counter runs (linearly, real time) over these seconds
  "startValue": 0,
  "prefix": "$", "dp": 0,
  "milestones": [ { "value": 30000, "label": "a new car" }, { "value": 420000, "label": "a median US home" } ],
  "final": "$864,000",                 // what the counter reads at the end (= perSecond × run time)
  "hold": 3.0
}
```

---

## Look-specific options

A kit may read an optional `"lookOpts": { … }` object for things only it needs (the Becker rig's prop choice, a Scoreboard footer style). Kits document those in `looks/<look>/README.md`, and must render sensibly without them.
