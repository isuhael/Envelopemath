#!/usr/bin/env python3
"""Math + spec check for format 9, "growth-ladder" (teasers 09a, 09b, 09c).

1. Recomputes every on-screen number from its inputs (section "inputs" below).
2. Loads the three spec JSONs and asserts that
   - every computed display string (ladder cells, input block, goal) equals the spec exactly,
   - every number inside every other string (header, footer, verdict, lookOpts text, VO lines) equals
     the computed, formatted value, in order,
   - rounded results carry "≈" on screen; in the VO a rounded number is preceded by "about" and a
     floored one by "over"; exact numbers carry neither,
   - every string in the spec that contains a digit is covered by a check,
   - the worded claims ("more than double", "almost doubled", "not even halfway", "under a tenth", ...)
     hold for the computed values,
   - VO timing fits ~2.6 spoken words per second, lines don't overlap, every row the VO names lands
     within 0.5 s of the moment its word is spoken, the first row lands by 3 s (R10), the duration sits
     in the 20-40 s lane, the header has a number and is at most 15 words (R1, R8).
3. Also checks the numbers quoted in the write-up's captions and pinned comments.
   Hook pass 2 (2026-10-08) rebuilt all three ladders: 09a on "When does it earn $100 a month?" (monthly growth =
   Worth × 8% ÷ 12), 09b on one $1,000 from birth with age rungs, 09c on $1 a day (year 40 = daily amount × 75,176).
   Assembly pass (2026-10-08): 09a's sheet gained a 4th column, "Earns a month" (each row's Worth × 8% ÷ 12, the
   number the hook asks about, which until then lived only in the formula bar); 09b's verdict now prints the R12
   line ("Over 81× the gift"); 09c gained lookOpts.beats (the "× 75,176" and "$5 a day" working on screen) and its
   row 1 lands before frame 1 (rowT −0.4 s), so frame 1 shows ≈ $377, not a count in flight.
   Assembly fix pass (2026-10-08, after QA): 09a's verdict is "From **year 9** / it earns more than you add." (a
   big two-line stack), its good mark reads "beats your $100", and its formula-bar lines drop the leading "≈" (the
   bar's chip is the ≈ sign, so "≈ ≈ $1,245" read doubled). 09c lost vo[6] and beat 2 (the $5 example now lives in
   the caption only), its one beat moves the hero ("× 75,176", tagged "YEAR 40 ≈ / DAILY AMOUNT"), its verdict leads
   with the million ("A MILLION BY YEAR 40: / ≈ $13.30 A DAY"), and its footer no longer repeats "7% a year" (the
   input strip "$1 A DAY · 7% A YEAR" carries the rate from frame 1).
   Port to Becker Rig (2026-10-08): 09a moved from the retired Live Sheet look to Becker Rig (new id
   09a-becker-rig-100-a-month-doubles; the old spec is in studio/specs/retired/). Its data, VO, header and verdict
   are unchanged. The formula bar became lookOpts.working (the same nine lines, with the result in **…**), the
   marks became lookOpts.beats (the same two labels, now tags with figure acts, plus a relight of row 9 at the
   verdict), lookOpts.cols [0, 2, 3] prints Year / Worth / Earns a month (the kit cannot fit a 4th number a row
   beside the figure, so "You put in" stays in the data but is not drawn), and lookOpts.target "$100" turns the
   meters into a gauge to the $100 deposit. The footer's line 2 lost "each" to fit at 40 px.
   Port QA fix pass (2026-10-08): no number, VO line, header, verdict or tag changed. One act-only beat (no label)
   joins lookOpts.beats at rowT[5] (year 20, 13.9 s, point then think, 2.3 s), so the figure acts through the
   14.5-16.8 s gap; a claim asserts it is the only one, sits on the year-20 rung and ends >= 0.6 s before the next
   coin's wind-up (which starts at most 0.95 s before its rung). Everything else in that pass is in the format file.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/09-growth-ladder.py
"""
import json
import math
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP, ROUND_FLOOR

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.path.join(ROOT, "studio", "specs")
WPS = 2.6            # VO read speed, spoken words per second
LANE = (20.0, 40.0)  # duration lane for this format (task brief)
BEAT_TOL = 0.5       # a named row must land within this many seconds of its spoken word
FIRST_ROW_MAX = 3.0  # R10: first payoff by ~3 s
LOOKS = ("clean-sheet", "live-sheet", "scoreboard", "becker-rig")

# ============================================================== inputs (assumptions, no market data)

# 09a: $100 deposited at each month-end, 8% a year compounded monthly (8%/12 a month).
# Hook pass 2: "You add $100 a month. When does it earn $100 a month?" "Earn" = the balance's growth over the
# next month at the assumed rate (balance × 8% ÷ 12), which stays in the balance; it is not a payout.
A_M, A_RATE = 100, 0.08
A_YEARS = [1, 5, 8, 9, 15, 20, 25, 30]
A_ALT_AMOUNTS = [50, 500]          # formula bar: "$50 or $500/mo: still year 9"
A_PINNED_RATES = (0.07, 0.10)      # pinned comment: the same crossing at 7% and at 10% a year

# 09b: $1,000 invested once, at birth; 7% a year, credited once a year (× 1.07); never topped up.
# Hook pass 2: the rungs are one person's ages (a timeline from birth), not a table of start ages.
B_P, B_RATE = 1000, 0.07
B_AGES = [1, 10, 18, 25, 30, 40, 50, 65]
B_HORIZON = 65                     # the header's "What's it worth at 65?"
B_LATE_START = 25                  # pinned comment: the same $1,000 put in at 25 instead of at birth

# 09c: $1 a day = $1 × 365 ÷ 12 a month, deposited at month-end, at an EFFECTIVE 7% a year: the monthly rate is
# (1.07)^(1/12) − 1 ≈ 0.5654%, so every dollar grows exactly × 1.07 per year and the footer's "7% a year" matches
# every row. Hook pass 2: "Take what you could invest a day. Year 40 = that × ?" The $1 ladder IS the multiplier:
# every row scales with the daily amount, so year 40's Worth for $1 a day is the constant the header asks for.
C_DAY, C_DAYS, C_RATE = 1, 365, 0.07
C_M = C_DAY * C_DAYS / 12
C_YEARS = [1, 5, 10, 20, 30, 40]
C_HORIZON = 40                     # the header's "YEAR 40"
C_EXAMPLE_DAY = 5                  # caption: "$5 a day ≈ $375,880" (round 2's $5 ladder; on screen until the fix pass)
C_PINNED_DAY = 10                  # pinned comment: "$10 a day? ≈ $751,761"
C_GOAL = 1_000_000                 # verdict: "A MILLION BY YEAR 40: / ≈ $13.30 A DAY"

# Write-up only (captions / pinned comments): S&P 500 long-run averages, with dividends reinvested.
# Official Data Foundation (officialdata.org), "S&P 500 since 1928": 10.09% a year nominal, 6.81% real (a live
#   figure computed through the current year; read 2026-10-07).
# A Wealth of Common Sense (Ben Carlson, Jan 2025) from Damodaran/NYU Stern, 1928-2024: 9.94% nominal (search-
#   confirmed). Its real figure could not be confirmed (page blocked by the proxy), so it is not used here.
SP_NOMINAL = (10.09, 9.94)
SP_REAL = (6.81,)

# ============================================================== formatting

def rnd(x, step):
    """Round half-up to a multiple of step."""
    q = (Decimal(repr(x)) / Decimal(repr(step))).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    return float(q * Decimal(repr(step)))

def flo(x, step):
    q = (Decimal(repr(x)) / Decimal(repr(step))).quantize(Decimal("1"), rounding=ROUND_FLOOR)
    return float(q * Decimal(repr(step)))

def is_exact(x, shown):
    return abs(x - shown) < 1e-6

def money(x, step=1, approx_sign=True):
    shown = rnd(x, step)
    dp = 2 if step < 1 else 0
    s = f"${shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def num(x, dp=0, approx_sign=True):
    shown = rnd(x, 10 ** -dp)
    s = f"{shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def pct(p, dp=0):
    shown = rnd(p, 10 ** -dp)
    return f"{shown:.{dp}f}%"

def bare(s):
    return s.replace("≈ ", "")

# ============================================================== models

def fv_monthly(m, rate, months):
    """Future value of m deposited at each month-end for `months` months at rate/12 a month."""
    r = rate / 12
    return m * ((1 + r) ** months - 1) / r

def first_year(pred, start=1, stop=200):
    return next(y for y in range(start, stop) if pred(y))

# ---- 09a
A_R = A_RATE / 12
A_IN = {y: A_M * 12 * y for y in A_YEARS}
A_W = {y: fv_monthly(A_M, A_RATE, 12 * y) for y in A_YEARS}
A_EARN = {y: A_W[y] * A_R for y in A_YEARS}                  # next month's growth on the year-end balance
A_EARN_SHOWN = {y: rnd(A_W[y], 1) * A_R for y in A_YEARS}     # the formula bar works off the shown (rounded) Worth
def a_cross_month(m, rate=A_RATE):
    """First month whose growth (balance after the previous month × rate/12) is at least the deposit m."""
    return first_year(lambda k: fv_monthly(m, rate, k - 1) * rate / 12 >= m, start=1, stop=1200)
def a_cross(m, rate=A_RATE):
    return math.ceil(a_cross_month(m, rate) / 12)
A_CROSS_MONTH = a_cross_month(A_M)                            # 106
A_CROSS = a_cross(A_M)                                        # year 9 (months 97-108)
A_GROWTH = lambda k: fv_monthly(A_M, A_RATE, k - 1) * A_R      # growth in month k
A_Y1_AVG = (fv_monthly(A_M, A_RATE, 12) - 12 * A_M) / 12      # write-up: year 1's average monthly growth
A_R72 = 72 / (A_RATE * 100)
A_N_STAR = math.log(2) / math.log(1 + A_R)                    # growth ≥ deposit ⇔ (1 + r)^n ≥ 2 ⇔ n ≥ 104.32
A_LUMP_DOUBLE = math.log(2) / (12 * math.log(1 + A_R))        # the same n in years: a lump sum's doubling time

# ---- 09b
B_V = {a: B_P * (1 + B_RATE) ** a for a in range(0, 101)}
B_TIMES = B_V[B_HORIZON] / B_P                                # "Over 81 times the gift"
B_LATE = B_V[B_HORIZON - B_LATE_START]                        # pinned: $1,000 at 25, worth at 65
B_DOUBLE_YEAR = first_year(lambda y: B_V[y] >= 2 * B_P)

# ---- 09c
def fv_eff(m, rate, months):
    """Future value of m deposited at each month-end for `months` months, at an effective `rate` a year
    (monthly rate (1 + rate)^(1/12) − 1)."""
    r = (1 + rate) ** (1 / 12) - 1
    return m * ((1 + r) ** months - 1) / r

C_LAST = C_YEARS[-1]
C_IN = {y: C_DAY * C_DAYS * y for y in C_YEARS}
C_W = {y: fv_eff(C_M, C_RATE, 12 * y) for y in C_YEARS}
C_MULT = C_W[C_HORIZON] / C_DAY                               # year 40 = your daily amount × this
C_EXAMPLE = C_EXAMPLE_DAY * C_MULT                            # caption: $5 a day
C_PINNED = C_PINNED_DAY * C_MULT                              # pinned: $10 a day
C_PER_DAY_FOR_GOAL = C_GOAL / C_MULT                          # verdict: ≈ $13.30 a day for a million
C_NOM_MULT = fv_monthly(C_M, C_RATE, 12 * C_HORIZON) / C_DAY  # caption: the 7% ÷ 12 a month convention

# ============================================================== expectations
# path -> ("exact", "string")  or  ("tokens", ["tok", ...])

def T(*toks):
    return ("tokens", list(toks))

def E(s):
    return ("exact", s)

expect, vo_expect, beats, extra_t, columns = {}, {}, {}, {}, {}
numeric_expect = {}  # numeric (non-string) values that must match (09a's lookOpts.cols)

# ---- 09a
ida = "09a-becker-rig-100-a-month-doubles"
ea = {
    "header": T(money(A_M), money(A_M)),
    "footer": T(pct(A_RATE * 100), money(A_M)),
    "verdict.text": T(str(A_CROSS)),                # "From **year 9** / it earns more than you add."
    "data.input.amount": E(money(A_M)),
    "data.input.rate": E(pct(A_RATE * 100) + " a year"),
    # one formula-bar line per row: the row's Worth × 8% ÷ 12 = what it earns the next month
    # working line 9 (at the verdict): "$50 or $500/mo: still **year 9**"
    f"lookOpts.working[{len(A_YEARS)}].text": T(money(A_ALT_AMOUNTS[0]), money(A_ALT_AMOUNTS[1]),
                                                str(a_cross(A_ALT_AMOUNTS[0]))),
    "lookOpts.beats[0].label": T(money(A_M)),      # tag "under $100" on row 8
    "lookOpts.beats[1].label": T(money(A_M)),      # tag "beats your **$100**" on row 9
    "lookOpts.target": E(money(A_M)),              # the gauge under each Earns cell runs to your $100 deposit
}
for i, y in enumerate(A_YEARS):
    ea[f"data.rows[{i}][0]"] = E(str(y))
    ea[f"data.rows[{i}][1]"] = E(money(A_IN[y]))
    ea[f"data.rows[{i}][2]"] = E(money(A_W[y]))
    ea[f"data.rows[{i}][3]"] = E(money(A_EARN[y]))     # "Earns a month": next month's growth on that Worth
    # the working line multiplies the row's shown Worth (its cell's number without the "≈"): "$1,245 × 8% ÷ 12 ≈ $8/mo"
    ea[f"lookOpts.working[{i}].text"] = T(bare(money(A_W[y])), pct(A_RATE * 100), "12", money(A_EARN[y]))
expect[ida] = ea
numeric_expect[ida] = {"lookOpts.cols[0]": 0, "lookOpts.cols[1]": 2, "lookOpts.cols[2]": 3}   # Year / Worth / Earns
columns[ida] = ["Year", "You put in", "Worth", "Earns a\u00a0month"]   # no-break space: wraps "Earns / a month"
# VO: (token, mode) with mode exact | about | over
vo_expect[ida] = [
    [("1", "exact"), (bare(money(A_EARN[1])), "about")],
    [("8", "exact"), (bare(money(A_EARN[8])), "about")],
    [("9", "exact"), (bare(money(A_EARN[9])), "about")],
    [("20", "exact"), (bare(money(A_EARN[20])), "about")],
    [("30", "exact"), (bare(money(A_EARN[30])), "about")],
    [(str(A_CROSS), "exact")],
]
beats[ida] = [("1", 0, "year 1"), ("8", 1, "Year 8"), ("9", 2, "Year 9"), ("20", 3, "Year 20"), ("30", 4, "Year 30")]
# lookOpts times that must sit on a beat (row t or VO word); all of 09a's sit on row or verdict times
extra_t[ida] = []

# ---- 09b
idb = "09b-becker-rig-1000-times-1-07"
eb = {
    "header": T(money(B_P), str(B_HORIZON)),
    "footer": T(pct(B_RATE * 100)),
    # "≈ $81,273 at 65. / Over 81× the gift, never topped up." (R12's repeatable line, on screen since assembly)
    "verdict.text": T(money(B_V[B_HORIZON]), str(B_HORIZON), num(flo(B_TIMES, 1))),
    "data.input.amount": E(money(B_P)),
    "data.input.rate": E(pct(B_RATE * 100) + " a year"),
}
for i, a in enumerate(B_AGES):
    eb[f"data.rows[{i}][0]"] = E(str(a))
    eb[f"data.rows[{i}][1]"] = E(money(B_P))
    eb[f"data.rows[{i}][2]"] = E(money(B_V[a]))
expect[idb] = eb
columns[idb] = ["Age", "Put in", "Worth"]
vo_expect[idb] = [
    [("1", "exact"), (money(B_V[1]), "exact")],
    [("18", "exact"), (bare(money(B_V[18])), "about")],
    [("30", "exact"), (bare(money(B_V[30])), "about")],
    [("50", "exact"), (bare(money(B_V[50])), "about")],
    [(str(B_HORIZON), "exact"), (bare(money(B_V[B_HORIZON])), "about")],
    [(num(flo(B_TIMES, 1)), "over")],
]
# rung 1 lands while "$1,070" is spoken (the coin is thrown at about 0.75 s and lands at 1.0 s)
beats[idb] = [("1", 0, "$1,070"), ("18", 1, "At 18"), ("30", 2, "At 30"), ("50", 3, "At 50"),
              (str(B_HORIZON), 4, f"At {B_HORIZON}")]
extra_t[idb] = []

# ---- 09c
idc = "09c-scoreboard-5-a-day-millionaire"
ec = {
    "header": T(str(C_HORIZON)),
    # (the rate is on the input strip, "$1 A DAY · 7% A YEAR", from data.input: the footer no longer repeats it)
    "footer": T(money(C_DAY), str(C_DAYS), "12", money(C_M, 0.01)),
    # "A MILLION BY YEAR 40: / **≈ $13.30 A DAY**" (the new fact leads; × 75,176 is on the hero by then)
    "verdict.text": T(str(C_HORIZON), money(C_PER_DAY_FOR_GOAL, 0.01)),
    "data.input.amount": E(money(C_DAY)),
    "data.input.rate": E(pct(C_RATE * 100) + " a year"),
    # lookOpts.beats[0]: the hero takes the header's blank, "× 75,176", tagged "YEAR 40 ≈ / DAILY AMOUNT" (the ≈ is
    # in the tag, before the phrase)
    "lookOpts.beats[0].hero": T(bare(num(C_MULT))),
    "lookOpts.beats[0].tag": T(str(C_HORIZON)),
}
for i, y in enumerate(C_YEARS):
    ec[f"data.rows[{i}][0]"] = E(str(y))
    ec[f"data.rows[{i}][1]"] = E(money(C_IN[y]))
    ec[f"data.rows[{i}][2]"] = E(money(C_W[y]))
expect[idc] = ec
columns[idc] = ["Year", "You put in", "Worth"]
vo_expect[idc] = [
    [("1", "exact"), (bare(money(C_W[1])), "about")],
    [("10", "exact"), (bare(money(C_W[10])), "about")],
    [("20", "exact"), (bare(money(C_W[20])), "about")],
    [("30", "exact"), (bare(money(C_W[30])), "about")],
    [("40", "exact"), (bare(money(C_W[40])), "about")],
    [(bare(num(C_MULT)), "about")],
    [(bare(money(C_PER_DAY_FOR_GOAL, 0.01)), "about")],
]
beats[idc] = [("1", 0, "Year 1"), ("10", 1, "Year 10"), ("20", 2, "Year 20"), ("30", 3, "Year 30"),
              (str(C_LAST), 4, f"Year {C_LAST}")]
extra_t[idc] = []


# ============================================================== text helpers

NUM_CORE = r"(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?"
TOKEN_RE = re.compile(r"(≈ )?([−-]?\$?" + NUM_CORE + r"%?)")

def strip_markup(s):
    return s.replace("**", "").replace("__", "")

def tokens(s):
    return [(m.group(1) or "") + m.group(2) for m in TOKEN_RE.finditer(strip_markup(s))]

ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()

def words_int(n):
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10]] + ([ONES[n % 10]] if n % 10 else [])
    if n < 1000:
        return [ONES[n // 100], "hundred"] + (words_int(n % 100) if n % 100 else [])
    for div, name in ((10 ** 9, "billion"), (10 ** 6, "million"), (1000, "thousand")):
        if n >= div:
            return words_int(n // div) + [name] + (words_int(n % div) if n % div else [])

def spoken(text):
    """Approximate spoken words: digits expanded the way the VO would read them (conservative)."""
    t = strip_markup(text).replace("-", " ")
    out = []
    for raw in t.split():
        w = raw.strip(".,:;!?'\"()")
        m = re.fullmatch(r"(\$)?(" + NUM_CORE + r")(%)?", w)
        if not m:
            if w:
                out.append(w)
            continue
        dollar, core, per = m.groups()
        val = core.replace(",", "")
        if "." in val:
            ip, fp = val.split(".")
            out += words_int(int(ip)) + ["point"] + [ONES[int(c)] for c in fp]
        else:
            out += words_int(int(val))
        if dollar:
            out.append("dollars")
        if per:
            out.append("percent")
    return out

def get(spec, path):
    cur = spec
    for part in re.findall(r"[^.\[\]]+|\[\d+\]", path):
        cur = cur[int(part[1:-1])] if part.startswith("[") else cur[part]
    return cur

def leaves(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from leaves(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from leaves(v, f"{path}[{i}]")
    else:
        yield path, obj

def word_time(line, kw):
    """Estimated moment a keyword is spoken inside a VO line (linear in spoken words)."""
    sp = [w.lower() for w in spoken(line["text"])]
    kw_sp = [w.lower() for w in spoken(kw)]
    idx = next(k for k in range(len(sp)) if sp[k:k + len(kw_sp)] == kw_sp)
    return line["t"] + line["d"] * idx / len(sp)

# ============================================================== checks

rows_out, fails = [], []

def record(sid, field, shown, want, ok, why=""):
    rows_out.append((sid[:3], field, shown, want, "ok" if ok else "FAIL"))
    if not ok:
        fails.append(f"{sid} {field}: shown {shown!r} want {want!r} {why}")

def check_spec(sid):
    with open(os.path.join(SPECS, sid + ".json"), encoding="utf-8") as f:
        spec = json.load(f)
    # --- common fields (FORMATS.md)
    record(sid, "id = file stem", spec.get("id"), sid, spec.get("id") == sid)
    record(sid, "format", spec.get("format"), "growth-ladder", spec.get("format") == "growth-ladder")
    look = spec.get("look")
    record(sid, "look in id", look, "NNx-<look>-…", look in LOOKS and sid.startswith(sid[:4] + look + "-"))
    record(sid, "fps", spec.get("fps"), 30, spec.get("fps") == 30)
    record(sid, "captions", spec.get("captions"), True, spec.get("captions") is True)
    dur = spec["duration"]
    record(sid, "duration lane", dur, f"{LANE[0]}-{LANE[1]} s", LANE[0] <= dur <= LANE[1])
    record(sid, "header has a number (R1)", spec["header"], "digit", bool(re.search(r"\d", spec["header"])))
    words = len(strip_markup(spec["header"]).replace("\n", " ").split())
    record(sid, "header ≤ 15 words (R8)", words, "≤ 15", words <= 15)
    record(sid, "header ≤ 4 lines (R8)", spec["header"].count("\n") + 1, "≤ 4", spec["header"].count("\n") < 4)
    record(sid, "footer present at t=0", bool(spec.get("footer")), True, bool(spec.get("footer")))
    d = spec["data"]
    record(sid, "data keys", sorted(d), "input/columns/rows/rowT/highlightLast/hold",
           set(d) == {"input", "columns", "rows", "rowT", "highlightLast", "hold"})
    record(sid, "input keys", sorted(d["input"]), "amount/per/rate", set(d["input"]) == {"amount", "per", "rate"})
    record(sid, "columns", d["columns"], " / ".join(columns[sid]), d["columns"] == columns[sid])
    nc = len(columns[sid])
    record(sid, f"rows × {nc} strings", len(d["rows"]), f"{nc} per row",
           all(len(r) == nc and all(isinstance(c, str) for c in r) for r in d["rows"]))
    record(sid, "rowT per row", len(d["rowT"]), len(d["rows"]), len(d["rowT"]) == len(d["rows"]))
    record(sid, "highlightLast", d["highlightLast"], True, d["highlightLast"] is True)
    worths = [float(re.sub(r"[^\d.]", "", bare(r[2]))) for r in d["rows"]]
    record(sid, "biggest number on the last row", worths[-1], max(worths), worths[-1] == max(worths)
           and all(a < b for a, b in zip(worths, worths[1:])))

    # --- display strings and numeric tokens
    covered = set()
    for p, (kind, want) in expect[sid].items():
        covered.add(p)
        try:
            shown = get(spec, p)
        except (KeyError, IndexError, TypeError):
            record(sid, p, None, want, False, "(missing)")
            continue
        if kind == "exact":
            record(sid, p, shown, want, shown == want)
        else:
            got = tokens(shown)
            record(sid, p, " | ".join(got), " | ".join(want), got == want)
    for p, want in numeric_expect.get(sid, {}).items():
        covered.add(p)
        shown = get(spec, p)
        record(sid, p, shown, want, isinstance(shown, (int, float)) and abs(shown - want) < 1e-9)

    # --- VO numbers and their "about"/"over" words
    vo = spec["vo"]
    vx = vo_expect[sid]
    record(sid, "vo line count", len(vo), len(vx), len(vo) == len(vx))
    for i, (line, want) in enumerate(zip(vo, vx)):
        covered.add(f"vo[{i}].text")
        got = tokens(line["text"])
        record(sid, f"vo[{i}] numbers", " | ".join(got), " | ".join(w for w, _ in want), got == [w for w, _ in want])
        record(sid, f"vo[{i}] no ≈ in VO", line["text"][:40], "words, not ≈", "≈" not in line["text"])
        pos = 0
        for tok, mode in want:
            m = re.compile(r"(\S+)\s+" + re.escape(tok) + r"(?![\d,.]\d)").search(line["text"], pos)
            m0 = re.compile(r"(?<![\d$,.])" + re.escape(tok) + r"(?![\d,.]\d)").search(line["text"], pos)
            prev = m.group(1).lower() if (m and m0 and m.end() == m0.end()) else ""
            if m0:
                pos = m0.end()
            want_prev = {"about": "about", "over": "over"}.get(mode, "")
            ok = (prev == want_prev) if want_prev else prev not in ("about", "over")
            record(sid, f"vo[{i}] '{tok}' {mode}", prev or "(none)", want_prev or "not about/over", ok)

    # --- every digit-bearing string is covered
    for p, v in leaves(spec):
        if p in ("id", "look", "format", "fps", "duration", "captions") or p.startswith("sfx") or p == "data.hold":
            continue
        if re.fullmatch(r"vo\[\d+\]\.(t|d)|verdict\.t|data\.rowT\[\d+\]|lookOpts\..*\.(t|d|row)|data\.highlightLast", p):
            continue
        if isinstance(v, bool) or (isinstance(v, str) and not re.search(r"\d", v)):
            continue
        record(sid, f"covered: {p}", str(v).replace("\n", " / "), "checked", p in covered)

    # --- timing
    for i, line in enumerate(vo):
        n = len(spoken(line["text"]))
        need = n / WPS
        ok = need - 0.05 <= line["d"] <= need + 0.6
        record(sid, f"vo[{i}] d vs {n} words", line["d"], f"{need:.2f}-{need + 0.6:.2f}", ok)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(sid, f"vo[{i}] ends before vo[{i+1}]", end, f"≤ {vo[i+1]['t']}", end <= vo[i + 1]["t"])
    record(sid, "vo[0] at t=0", vo[0]["t"], 0.0, vo[0]["t"] == 0.0)
    end = vo[-1]["t"] + vo[-1]["d"]
    record(sid, "last VO ends ≥ 2 s before end (hold)", round(end, 2), f"≤ {dur - 2.0}", end <= dur - 2.0)
    record(sid, "verdict.t = last VO line t", spec["verdict"]["t"], vo[-1]["t"], spec["verdict"]["t"] == vo[-1]["t"])
    ts = d["rowT"]
    record(sid, "row times ascending", ts, "ascending", all(a < b for a, b in zip(ts, ts[1:])) and ts[-1] < dur)
    record(sid, "first row by 3 s (R10)", ts[0], f"≤ {FIRST_ROW_MAX}", ts[0] <= FIRST_ROW_MAX)
    record(sid, "hold = duration − last row", d["hold"], round(dur - ts[-1], 2), abs(d["hold"] - (dur - ts[-1])) < 0.051)
    record(sid, "last row before verdict", ts[-1], f"< {spec['verdict']['t']}", ts[-1] < spec["verdict"]["t"])
    for label, li, kw in beats[sid]:
        k = [r[0] for r in d["rows"]].index(label)
        est = word_time(vo[li], kw)
        record(sid, f"row {label} vs VO '{kw}'", ts[k], f"{est:.2f} ± {BEAT_TOL}", abs(ts[k] - est) <= BEAT_TOL)
    for key, t, li, kw in extra_t[sid]:
        est = word_time(vo[li], kw)
        found = [x for x in (spec["lookOpts"].get(key) if isinstance(spec["lookOpts"].get(key), list)
                             else [spec["lookOpts"][key]]) if abs(x["t"] - t) < 1e-9]
        record(sid, f"lookOpts.{key} t={t} vs VO '{kw}'", t, f"{est:.2f} ± {BEAT_TOL}", bool(found) and abs(t - est) <= BEAT_TOL)
    anchors = ts + [spec["verdict"]["t"]] + [line["t"] for line in vo]
    for item in [x for v in spec.get("lookOpts", {}).values() if isinstance(v, list) for x in v] + \
                [v for v in spec.get("lookOpts", {}).values() if isinstance(v, dict) and "t" in v]:
        if isinstance(item, dict) and "t" in item:
            ok = any(abs(item["t"] - a) < 1e-9 for a in anchors) or any(
                abs(item["t"] - t) < 1e-9 for _, t, _, _ in extra_t[sid])
            record(sid, f"lookOpts beat t={item['t']} anchored", item["t"], "row/VO/verdict t", ok)
    for item in [b for b in spec.get("lookOpts", {}).get("beats", []) if "label" in b and "row" in b]:
        record(sid, f"tag on row {item['row']} lands with its row", item["t"], ts[item["row"]], abs(item["t"] - ts[item["row"]]) < 1e-9)
    for cue in spec.get("sfx", []):
        ok = any(abs(cue["t"] - a) < 1e-9 for a in anchors + [t for _, t, _, _ in extra_t[sid]])
        record(sid, f"sfx {cue['kind']} on a beat", cue["t"], "row/VO/beat t", ok)

# ---- worded claims (VO, verdicts, formula bar) against the computed values
def claim(sid, what, shown, want, ok):
    record(sid, "claim: " + what, shown, want, ok)

def load(sid):
    with open(os.path.join(SPECS, sid + ".json"), encoding="utf-8") as f:
        return json.load(f)

# 09a: "You add $100 a month. When does it earn $100 a month?"
for y in A_YEARS:
    claim(ida, f"year {y}: shown Worth × 8% ÷ 12 rounds like the exact", money(A_EARN_SHOWN[y]), money(A_EARN[y]),
          money(A_EARN_SHOWN[y]) == money(A_EARN[y]))
claim(ida, "'By year 1 it's earning about $8': month 13 grows ≈ $8 (month 12 ≈ $7.58; year-1 average ≈ $3.75)",
      f"{money(A_GROWTH(13), 0.01)} / {money(A_GROWTH(12), 0.01)} / {money(A_Y1_AVG, 0.01)}",
      "≈ $8.30 / ≈ $7.58 / ≈ $3.75",
      money(A_GROWTH(13)) == "≈ $8" and money(A_GROWTH(13), 0.01) == "≈ $8.30"
      and money(A_GROWTH(12), 0.01) == "≈ $7.58" and money(A_Y1_AVG, 0.01) == "≈ $3.75")
claim(ida, "year 8 'Not yet' / tag 'under $100' (earns < $100)", money(A_EARN[8], 0.01), "< $100", A_EARN[8] < A_M)
claim(ida, "year 9 'More than you add' / tag 'beats your $100' / verdict 'it earns more than you add'",
      money(A_EARN[9], 0.01), "> $100", A_EARN[9] > A_M)
claim(ida, "first month earning ≥ $100 = 106, in year 9 (month 105 earns < $100)",
      f"m{A_CROSS_MONTH} {money(A_GROWTH(A_CROSS_MONTH), 0.01)} / m{A_CROSS_MONTH - 1} "
      f"{money(A_GROWTH(A_CROSS_MONTH - 1), 0.01)} / year {A_CROSS}", "m106 ≈ $100.91 / m105 < $100 / year 9",
      A_CROSS_MONTH == 106 and A_CROSS == 9 and A_GROWTH(105) < A_M <= A_GROWTH(106)
      and money(A_GROWTH(106), 0.01) == "≈ $100.91")
claim(ida, "verdict 'From year 9' (year 8's last month < $100, year 9 has a month ≥ $100)",
      A_CROSS, 9, A_GROWTH(96) < A_M and any(A_GROWTH(k) >= A_M for k in range(97, 109)))
claim(ida, "'Same year for any monthly amount' ($50 / $500 / $1,000 / $5,000)",
      [a_cross(m) for m in (50, 500, 1000, 5000)], [A_CROSS] * 4,
      all(a_cross(m) == A_CROSS and a_cross_month(m) == A_CROSS_MONTH for m in (50, 500, 1000, 5000)))
claim(ida, "year 30 'on its own' ≈ $994 a month, almost 10 times the $100", num(A_EARN[30] / A_M, 2), "9.9 ≤ x < 10",
      9.9 <= A_EARN[30] / A_M < 10)
claim(ida, "pinned: 72 ÷ 8 = 9 = the crossing year", A_R72, A_CROSS, A_R72 == A_CROSS)
claim(ida, "pinned: growth ≥ deposit ⇔ (1 + 8%/12)^n ≥ 2 ⇔ n ≥ 104.32 → month 106",
      num(A_N_STAR, 2), "≈ 104.32", num(A_N_STAR, 2) == "≈ 104.32" and math.ceil(A_N_STAR) + 1 == A_CROSS_MONTH)
claim(ida, "pinned: that n is the lump-sum doubling time, ≈ 8.7 years", num(A_LUMP_DOUBLE, 1), "≈ 8.7",
      num(A_LUMP_DOUBLE, 1) == "≈ 8.7")
claim(ida, "pinned: same crossing at 7% → year 11, at 10% → year 8",
      [a_cross(100, r_) for r_ in A_PINNED_RATES], [11, 8],
      [a_cross(100, r_) for r_ in A_PINNED_RATES] == [11, 8])
_sa = load(ida)
_lo = _sa["lookOpts"]
_wl = _lo["working"]
_plain = lambda x: strip_markup(x)
_long = [x["text"] for x in _wl if len(_plain(x["text"])) > 38]
claim(ida, "working lines fit one line (≤ 38 chars of 40 px mono in x 62-940)", _long or "all ≤ 38", "all ≤ 38", not _long)
_ecol = [r[3] for r in _sa["data"]["rows"]]
_ebar = [tokens(x["text"])[-1] for x in _wl[:len(A_YEARS)]]
claim(ida, "'Earns a month' cells = each row's working-line result (same string)", " | ".join(_ecol), " | ".join(_ebar),
      _ecol == _ebar)
claim(ida, "each row's working line appears as its row lands; the last at the verdict",
      [x["t"] for x in _wl], _sa["data"]["rowT"] + [_sa["verdict"]["t"]],
      [x["t"] for x in _wl] == _sa["data"]["rowT"] + [_sa["verdict"]["t"]])
claim(ida, "working-line results are the emphasis ('≈ **$8/mo**' … '**year 9**')",
      [re.findall(r"\*\*(.+?)\*\*", x["text"]) for x in _wl][:2], "one **…** each, ending the line",
      all(re.fullmatch(r".*\*\*[^*]+\*\*", x["text"]) and x["text"].count("**") == 2 for x in _wl))
_ev = [float(re.sub(r"[^\d.]", "", bare(x))) for x in _ecol]
_tags = [b for b in _lo["beats"] if "label" in b]
claim(ida, "'Earns a month' rises row by row; year 8 < $100 ≤ year 9 (the tags' rows 2 and 3)", _ecol[2:4],
      "≈ $89 / ≈ $105", all(a < b for a, b in zip(_ev, _ev[1:])) and _ev[2] < A_M <= _ev[3]
      and [b["row"] for b in _tags] == [2, 3])
claim(ida, "verdict names the crossing year in its emphasis ('From **year 9**') and says 'more than you add'",
      _sa["verdict"]["text"].replace("\n", " / "), "From **year 9** / it earns more than you add.",
      _sa["verdict"]["text"] == f"From **year {A_CROSS}**\nit earns more than you add.")
claim(ida, "tags: row 8 'under $100' (bad), row 9 'beats your **$100**' (good)",
      " / ".join(b["label"] for b in _tags), "under $100 / beats your **$100**",
      [(b["label"], b["tone"]) for b in _tags] == [("under $100", "bad"), ("beats your **$100**", "good")])
claim(ida, "each tag is gone ≥ 0.6 s before the next row lands (it sits on that row's empty slot)",
      [round(b["t"] + b["d"], 2) for b in _tags], [round(_sa["data"]["rowT"][b["row"] + 1] - 0.6, 2) for b in _tags],
      all(b["t"] + b["d"] <= _sa["data"]["rowT"][b["row"] + 1] - 0.6 + 1e-9 for b in _tags))
_rl = [b for b in _lo["beats"] if b.get("relight")]
claim(ida, "the verdict relights the crossing row (year 9) while the figure points at it",
      [(b["row"], b["t"], b.get("act")) for b in _rl], f"row of year {A_CROSS} at verdict.t, act point",
      len(_rl) == 1 and _sa["data"]["rows"][_rl[0]["row"]][0] == str(A_CROSS) and _rl[0]["t"] == _sa["verdict"]["t"]
      and _rl[0].get("act") == "point")
claim(ida, "the year-9 impact sits on the crossing row", [(b["row"], b["t"]) for b in _lo["beats"] if b.get("impact")],
      f"row of year {A_CROSS}", [_sa["data"]["rows"][b["row"]][0] for b in _lo["beats"] if b.get("impact")] == [str(A_CROSS)])
# port QA fix pass: one act-only beat fills the year-20 gap (13.9 s rung, next coin's wind-up starts ≤ 0.95 s before 17.8 s)
_acts = [b for b in _lo["beats"] if "label" not in b and not b.get("relight") and not b.get("impact")]
_rt = _sa["data"]["rowT"]
claim(ida, "one act-only beat on the year-20 rung, at its landing, ending ≥ 0.6 s before the next coin's wind-up",
      [(_sa["data"]["rows"][b["row"]][0], b["t"], round(b["t"] + b["d"], 2), b.get("act")) for b in _acts],
      f"year 20 at {_rt[5]}, ends ≤ {round(_rt[6] - 0.95 - 0.6, 2)}",
      len(_acts) == 1 and _sa["data"]["rows"][_acts[0]["row"]][0] == "20" and _acts[0]["t"] == _rt[_acts[0]["row"]]
      and _acts[0]["t"] + _acts[0]["d"] <= _rt[_acts[0]["row"] + 1] - 0.95 - 0.6 + 1e-9 and bool(_acts[0].get("act")))
_cols = [_sa["data"]["columns"][k] for k in _lo["cols"]]
claim(ida, "the ladder prints Year / Worth / Earns a month (Earns = the hook's number is the hero)",
      " / ".join(_cols), "Year / Worth / Earns a month", _cols == ["Year", "Worth", "Earns a\u00a0month"]
      and _lo.get("second") == "bold")
_short = [_sa["data"]["rows"][i][0] for i in range(len(A_YEARS)) if _ev[i] < A_M]   # rows whose gauge stays grey
claim(ida, "the $100 gauge stays short (grey) on years 1, 5, 8 and fills green from year 9 on, by the shown cells and exactly",
      _short, ["1", "5", "8"], _short == ["1", "5", "8"]
      and [y for y in A_YEARS if A_EARN[y] < A_M] == [1, 5, 8] and _lo["target"] == money(A_M))
claim(ida, "working lines multiply the shown Worth (the line starts with the Worth cell's number, no second '≈')",
      [x["text"][:2] for x in _wl if x["text"].startswith("≈")] or "none", "none",
      not any(x["text"].startswith("≈") for x in _wl)
      and all(tokens(x["text"])[0] == bare(r[2]) for x, r in zip(_wl, _sa["data"]["rows"])))
claim(ida, "footer states the compounding convention", "compounded monthly" in _sa["footer"], True,
      "compounded monthly" in _sa["footer"])
claim(ida, "frame 1: row 1 and its working line are on screen at 0.0 s",
      f"{_sa['data']['rowT'][0]} / {_wl[0]['t']}", "0.0 / 0.0",
      _sa["data"]["rowT"][0] == 0.0 and _wl[0]["t"] == 0.0)

# 09b: "POV: someone invested just $1,000 for you at birth. What's it worth at 65?"
claim(idb, "age 1 = $1,000 × 1.07 = $1,070 (exact)", money(B_V[1]), "$1,070", money(B_V[1]) == "$1,070")
claim(idb, "'Over 81 times the gift' (VO) / 'Over 81× the gift' (verdict)", num(B_TIMES, 2), "81 ≤ x < 82",
      81 <= B_TIMES < 82)
_sb = load(idb)
claim(idb, "'never topped up': $1,000 put in on every rung", sorted({r[1] for r in _sb["data"]["rows"]}), ["$1,000"],
      {r[1] for r in _sb["data"]["rows"]} == {money(B_P)})
claim(idb, "rungs are one person's ages, ascending from 1 (a timeline, not a by-start-age table)",
      [r[0] for r in _sb["data"]["rows"]][:2], "starts at 1, ascending",
      _sb["data"]["rows"][0][0] == "1" and all(int(a) < int(b) for a, b in
                                              zip([r[0] for r in _sb["data"]["rows"]], [r[0] for r in _sb["data"]["rows"]][1:])))
claim(idb, "first payoff ($1,070) lands by 1.0 s", _sb["data"]["rowT"][0], "≤ 1.0", _sb["data"]["rowT"][0] <= 1.0)
claim(idb, "header says 'just $1,000' and 'at birth'", "just" in _sb["header"] and "at birth" in _sb["header"], True,
      "just" in _sb["header"] and "at birth" in _sb["header"])
claim(idb, "pinned: the same $1,000 put in at 25 is ≈ $14,974 at 65 (= the age-40 rung)", money(B_LATE),
      "≈ $14,974", money(B_LATE) == "≈ $14,974" == money(B_V[40]))
claim(idb, "pinned: birth vs 25 = × 1.07^25 ≈ 5.4", num(B_V[B_HORIZON] / B_LATE, 1), "≈ 5.4",
      num(B_V[B_HORIZON] / B_LATE, 1) == "≈ 5.4" and abs(B_V[B_HORIZON] / B_LATE - (1 + B_RATE) ** B_LATE_START) < 1e-9)
claim(idb, "caption: almost doubled by 10 (1.97×), doubles at 11; Rule of 72: 72 ÷ 7 ≈ 10.3",
      f"{num(B_V[10] / B_P, 2)} / {B_DOUBLE_YEAR} / {num(72 / 7, 1)}", "≈ 1.97 / 11 / ≈ 10.3",
      1.9 <= B_V[10] / B_P < 2 and B_DOUBLE_YEAR == 11 and num(72 / 7, 1) == "≈ 10.3")
claim(idb, "caption: 7% is close to the S&P 500's ≈ 6.8% a year after inflation (officialdata)", SP_REAL,
      "rounds to 6.8", all(round(x, 1) == 6.8 for x in SP_REAL))

# 09c: "Take what you could invest a day. Year 40 = that × ?"
claim(idc, "$1 × 365 ÷ 12", money(C_M, 0.01), "≈ $30.42", money(C_M, 0.01) == "≈ $30.42")
claim(idc, "'7% a year' is the effective annual rate of every row", round(((1 + C_RATE) ** (1 / 12)) ** 12 - 1, 12),
      0.07, abs(((1 + C_RATE) ** (1 / 12)) ** 12 - 1 - C_RATE) < 1e-12)
claim(idc, "caption: every row scales with the daily amount ($5 a day = 5 × the $1 row; round 2's verified $375,880.35)",
      money(fv_eff(C_EXAMPLE_DAY * C_DAYS / 12, C_RATE, 480), 0.01), money(C_EXAMPLE, 0.01),
      abs(fv_eff(C_EXAMPLE_DAY * C_DAYS / 12, C_RATE, 480) - C_EXAMPLE) < 1e-6
      and money(C_EXAMPLE, 0.01) == "≈ $375,880.35")
claim(idc, "multiplier: year 40 Worth of $1 a day", num(C_MULT, 2), "≈ 75,176.07", num(C_MULT, 2) == "≈ 75,176.07")
_sc = load(idc)
claim(idc, "verdict leads with the million at beat size: 'A MILLION BY YEAR 40:' / '**≈ $13.30 A DAY**'",
      _sc["verdict"]["text"].replace("\n", " / "), "A MILLION BY YEAR 40: / **≈ $13.30 A DAY**",
      _sc["verdict"]["text"] == f"A MILLION BY YEAR {C_HORIZON}:\n**{money(C_PER_DAY_FOR_GOAL, 0.01)} A DAY**"
      and _sc["lookOpts"].get("verdictStyle") == "stack")
_bt = _sc["lookOpts"]["beats"]
claim(idc, "one beat: the hero shows '× 75,176' under a tag carrying ≈ (the rounded multiplier), on VO line 6",
      f"{_bt[0]['hero']} / {_bt[0]['tag']} @ {_bt[0]['t']}", "× 75,176 / YEAR 40 ≈ … @ 20.8",
      len(_bt) == 1 and _bt[0]["hero"] == "× " + bare(num(C_MULT)) and "≈" in _bt[0]["tag"]
      and _bt[0]["tag"].startswith(f"YEAR {C_HORIZON}") and _bt[0]["t"] == _sc["vo"][5]["t"]
      and not any(k in _bt[0] for k in ("l1", "l2")))
claim(idc, "the rate is on screen from frame 1 (input strip from data.input), the footer no longer repeats it",
      f"input {_sc['lookOpts'].get('input')} · {_sc['data']['input']['rate']} · footer has % {'%' in _sc['footer']}",
      "input True · 7% a year · footer has % False",
      _sc["lookOpts"].get("input") is True and _sc["data"]["input"]["rate"] == pct(C_RATE * 100) + " a year"
      and "%" not in _sc["footer"])
claim(idc, "frame 1's hero is labelled (heroTag: 'YEAR 1' + '$1 A DAY' from column 0, row 1 and data.input)",
      f"heroTag {_sc['lookOpts'].get('heroTag')} · {_sc['data']['columns'][0]} {_sc['data']['rows'][0][0]} · "
      f"{_sc['data']['input']['amount']} {_sc['data']['input']['per']}", "heroTag True · Year 1 · $1 a day",
      _sc["lookOpts"].get("heroTag") is True and _sc["data"]["rows"][0][0] == "1"
      and _sc["data"]["input"]["amount"] == money(C_DAY) and _sc["data"]["input"]["per"] == "a day")
claim(idc, "caption: $5 × 75,176 = 375,880, and the exact $5-a-day year 40 rounds to the same dollar",
      f"{C_EXAMPLE_DAY * round(C_MULT):,} / {money(C_EXAMPLE)}", "375,880 / ≈ $375,880",
      C_EXAMPLE_DAY * round(C_MULT) == 375_880 and money(C_EXAMPLE) == "≈ $375,880")
claim(idc, "frame 1 shows row 1 landed (rowT ≤ −0.35 s: cut − 0.45 s + 0.8 s roll ≤ 0), not a count in flight",
      _sc["data"]["rowT"][0], "≤ −0.35", _sc["data"]["rowT"][0] <= -0.35)
claim(idc, "header leaves the multiplier blank ('× ?')", strip_markup(_sc["header"]).rstrip().endswith("× ?"), True,
      strip_markup(_sc["header"]).rstrip().endswith("× ?"))
claim(idc, "'A million: ≈ $13.30 a day' (exact $13.302; $13.31 clears it, $13.30 falls $158 short)",
      money(C_PER_DAY_FOR_GOAL, 0.01), "≈ $13.30",
      money(C_PER_DAY_FOR_GOAL, 0.01) == "≈ $13.30" and 13.31 * C_MULT >= C_GOAL > 13.30 * C_MULT)
claim(idc, "caption: $5 a day at year 40 is still under a million (the meme's horizon)", money(C_EXAMPLE), "< $1,000,000",
      C_EXAMPLE < C_GOAL)
claim(idc, "pinned: $10 a day", money(C_PINNED), "≈ $751,761", money(C_PINNED) == "≈ $751,761")
claim(idc, "caption: at 7% ÷ 12 a month the multiplier would be ≈ 79,838", num(C_NOM_MULT), "≈ 79,838",
      num(C_NOM_MULT) == "≈ 79,838")
claim(idc, "caption: 7% ÷ 12 a month ≈ 7.2% a year effective", pct(((1 + C_RATE / 12) ** 12 - 1) * 100, 1), "7.2%",
      pct(((1 + C_RATE / 12) ** 12 - 1) * 100, 1) == "7.2%")
claim(ida, "caption: S&P ≈ 10% nominal (both sources)", SP_NOMINAL, "round to 10", all(round(x) == 10 for x in SP_NOMINAL))
claim(ida, "caption: S&P ≈ 7% real (officialdata)", SP_REAL, "round to 7", all(round(x) == 7 for x in SP_REAL))

for sid in (ida, idb, idc):
    check_spec(sid)

# ============================================================== table
print("Growth ladders (computed):")
print(f"  09a $100/mo at 8%:  " + "  ".join(f"Y{y} {money(A_IN[y])}→{money(A_W[y])} (earns {money(A_EARN[y])}/mo)"
                                          for y in A_YEARS) + f"  (first month ≥ $100: {A_CROSS_MONTH}, year {A_CROSS})")
print(f"  09b $1,000 at birth × 1.07:  " + "  ".join(f"age {a} {money(B_V[a])}" for a in B_AGES))
print(f"  09c $1/day at 7% a year (effective):   " + "  ".join(f"Y{y} {money(C_IN[y])}→{money(C_W[y])}" for y in C_YEARS)
      + f"  (× {num(C_MULT, 2)}; $1M ≈ {money(C_PER_DAY_FOR_GOAL, 0.01)} a day)")
w = [3, 44, 46, 46, 4]
print()
print(" | ".join(h.ljust(x) for h, x in zip(("id", "field", "in spec / shown", "computed / rule", "ok"), w)))
print("-+-".join("-" * x for x in w))
for r_ in rows_out:
    cells = [str(c).replace("\n", " / ") for c in r_]
    cells = [c if len(c) <= x else c[: x - 1] + "…" for c, x in zip(cells, w)]
    print(" | ".join(c.ljust(x) for c, x in zip(cells, w)))
print(f"\n{len(rows_out)} checks, {len(fails)} failures")
if fails:
    print("\nFAILURES:")
    for f_ in fails:
        print("  " + f_)
    sys.exit(1)
print("ALL OK")
