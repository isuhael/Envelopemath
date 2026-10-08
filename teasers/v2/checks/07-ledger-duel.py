#!/usr/bin/env python3
"""Math + spec check for format 7, "ledger-duel" (teasers 07a Scoreboard, 07b Becker rig, 07c Becker rig).

1. Recomputes every on-screen number from its inputs (below).
2. Loads the three spec JSONs and asserts that
   - every computed display string (ledger cells, verdict, events) equals the spec exactly,
   - every number inside every other string (header, footer, stake, plans, labels, lookOpts,
     VO lines) equals the computed, formatted value, in order,
   - rounded results carry "≈" on screen and "about" in the VO; exact ones carry neither,
   - every string in the spec that contains a digit is covered by a check,
   - VO timing fits ~2.6 spoken words per second, lines don't overlap, each mentioned beat
     lands within 0.9 s of the moment its VO line says it, durations sit in the 12-30 s lane,
   - the first payoff row lands by 3.0 s (R10), each working line (07a, Scoreboard label stack) stays up
     long enough to read, and a formula that multiplies shown factors reproduces the shown result,
   - the look-specific staging (port to Scoreboard / Becker rig, 2026-10-08): no option of a retired look
     is left, 07a's climax count lands on its spoken value, its table (rows, and its cut in the VO gap), its
     plan focus on the "3 times" line and its resting working line; 07c's quiet gains, crown,
     mark tones, hero figure and the Becker mono footer/stake line budgets,
   - every spec path the write-up names exists (in specs/ or specs/retired/).
3. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/07-ledger-duel.py
"""
import json
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.path.join(ROOT, "studio", "specs")
WPS = 2.6           # VO read speed, spoken words per second
LANE = (12.0, 30.0)  # duration lane for this format (task brief)
BEAT_TOL = 0.9       # a mentioned beat must land within this many seconds of its word
R10_MAX = 3.0        # first payoff row lands within about 3 s (hook bank R10)
BAR_READ = 1.5       # seconds a working line must stay readable
WORK_CPS = 15        # a Scoreboard working line is a hard cut (slam, 0.22 s): read at ~15 characters a second
SLAM = 0.22
MONO_LINE = 37       # Becker rig footer / stake line: JetBrains Mono 700 40 px, -0.02em, 878 px wide = 37 characters
RETIRED_OPTS = {     # options of the retired looks that must not survive the port
    "07a-scoreboard-start-at-25": ("formulaBar", "rowLabelsAtStart", "eventStyle", "total"),
    "07c-becker-rig-savings-rate": ("formulas", "badge"),
}

# ============================================================== inputs

# 07a: assumption only (no real-world data). Monthly deposits at month-end,
# 7%/12 per month, compounded monthly.
A_DEPOSIT = 200
A_RATE = 0.07
A_START, A_STOP, B_START, END_AGE = 25, 35, 35, 65
A_ROWS = [30, 35, 40, 45, 50, 55, 60, 65]

# 07b: S&P 500 total return (dividends reinvested), calendar years, % (S&P Dow Jones Indices,
# as reproduced by Slickcharts "S&P 500 Total Returns by Year Since 1926"; 2017-2025 also listed
# by YCharts, US500.com and History of Market). Verified by web search 2026-10-07.
SP_TR = {2007: 5.49, 2008: -37.00, 2009: 26.46, 2010: 15.06, 2011: 2.11, 2012: 16.00,
         2013: 32.39, 2014: 13.69, 2015: 1.38, 2016: 11.96, 2017: 21.83, 2018: -4.38,
         2019: 31.49, 2020: 18.40, 2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02,
         2025: 17.88}
# Independent cross-check, NYU Stern (Damodaran) "Historical Returns on Stocks, Bonds and Bills",
# own calculation from index levels + dividends; only the years the search returned.
DAMODARAN = {2007: 5.48, 2008: -36.55, 2009: 25.94, 2010: 14.82, 2022: -18.04, 2023: 26.06,
             2024: 24.88}
B_STAKE = 10_000
B_BUY_YEAR = 2007       # both buy at the 2007 year-end close (Dec 31, 2007), "right before 2008"
B_SELL_YEAR = 2008      # Sam sells at the 2008 year-end close
B_CASH_RATE = 0.0       # Sam's cash earns 0% (footer)
B_ROWS = ["Dec 2007", 2008, 2009, 2012, 2016, 2019, 2021, 2022, 2025]

# 07c: Chase Savings standard APY 0.01% (Chase consumer deposit rate sheets, rates in effect
# Oct 2, 2026 [rdwi1.pdf] and Sep 11, 2026 [rdny1.pdf]; Bankrate and NerdWallet Chase-savings
# pages). 4.00% = a round high-yield APY, below every top rate found (The College Investor
# Sep 28, 2026: 4.01-4.15% named offers; Bankrate Oct 2026 "up to 4.21%"; Yahoo Finance Oct 2,
# 2026 up to 4.25%; Fortune Sep 24, 2026 up to 4.50%). Assumed to hold for 5 years.
# Hook pass 2 (2026-10-08): $100 deposited at each month-end for 5 years (60 deposits) instead
# of a $10,000 lump sum. The monthly rate is the APY's monthly equivalent, (1 + APY)^(1/12) − 1,
# so 12 months of compounding give exactly the APY.
C_DEPOSIT = 100
C_YEARS = 5
C_MONTHS = 12 * C_YEARS
C_APY_BIG = 0.0001
C_APY_HY = 0.04
FDIC_NATIONAL_SAVINGS = 0.0037   # Sep 2026, Motley Fool / NerdWallet citing FDIC (pinned comment)
C_APY_WELLS = 0.0015             # write-up only: Wells Fargo Way2Save, one search summary (unverified)
C_APY_CHASE_REL = 0.0002         # write-up only: Chase Savings relationship rate (Oct 2, 2026 sheet)

# ============================================================== formatting

def rnd(x, step):
    """Round half-up to a multiple of step (step may be 0.01)."""
    q = (Decimal(repr(x)) / Decimal(repr(step))).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
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

def pct(p, dp=0, signed=False, approx_sign=True):
    shown = rnd(p, 10 ** -dp)
    s = f"{abs(shown):.{dp}f}%"
    if signed and shown < 0:
        s = "−" + s
    if approx_sign and not is_exact(p, shown):
        s = "≈ " + s
    return s

def num(x, dp=0, approx_sign=True):
    shown = rnd(x, 10 ** -dp)
    s = f"{shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def bare(s):
    return s.replace("≈ ", "")

# ============================================================== models

# ---- 07a
r = A_RATE / 12
def fv_annuity(n):
    return A_DEPOSIT * ((1 + r) ** n - 1) / r

def ava(age):
    m = (age - A_START) * 12
    paid = min(m, (A_STOP - A_START) * 12)
    return fv_annuity(paid) * (1 + r) ** max(0, m - paid)

def ben(age):
    m = (age - B_START) * 12
    return 0.0 if m <= 0 else fv_annuity(m)

A_IN = A_DEPOSIT * (A_STOP - A_START) * 12
B_IN = A_DEPOSIT * (END_AGE - B_START) * 12
A_FINAL, B_FINAL = ava(END_AGE), ben(END_AGE)
A_GAP = A_FINAL - B_FINAL
A_GROW30 = (1 + r) ** ((END_AGE - A_STOP) * 12)
A_FULL40 = fv_annuity((END_AGE - A_START) * 12)          # pinned comment: if Ava never stopped

def duel_at(rate):
    """(Ava, Ben) at 65 for a nominal annual rate, monthly compounding (sensitivity)."""
    q = rate / 12
    fv = lambda n: A_DEPOSIT * ((1 + q) ** n - 1) / q
    return fv(120) * (1 + q) ** 360, fv(360)

lo, hi = 0.04, 0.07                                        # break-even rate by bisection
for _ in range(100):
    mid = (lo + hi) / 2
    a_, b_ = duel_at(mid)
    lo, hi = (lo, mid) if a_ > b_ else (mid, hi)
A_BREAKEVEN = (lo + hi) / 2
A6_AVA, A6_BEN = duel_at(0.06)

# ---- 07b
def sp_path(returns, stake=B_STAKE):
    v, out = stake, {}
    for y in sorted(returns):
        v *= 1 + returns[y] / 100
        out[y] = v
    return out

def after_buy(returns):
    return {y: v for y, v in returns.items() if y > B_BUY_YEAR}

HOLD = sp_path(after_buy(SP_TR))          # year-end values from the 2007 close
HOLD[B_BUY_YEAR] = float(B_STAKE)
SAM = {y: (HOLD[y] if y <= B_SELL_YEAR else HOLD[B_SELL_YEAR] * (1 + B_CASH_RATE) ** (y - B_SELL_YEAR))
       for y in HOLD}
first_back = next(y for y in sorted(HOLD) if y > B_SELL_YEAR and HOLD[y] >= B_STAKE)
B_RATIO = HOLD[2025] / SAM[2025]
B_SINCE_SELL = HOLD[2025] / HOLD[B_SELL_YEAR]
B_SAM_5PCT = SAM[B_SELL_YEAR] * 1.05 ** (2025 - B_SELL_YEAR)   # pinned-comment bound
mixed = dict(SP_TR); mixed.update(DAMODARAN)
DAMO = sp_path(after_buy(mixed))                                # sensitivity only (write-up)

# ---- 07c
def c_monthly(apy):
    return (1 + apy) ** (1 / 12) - 1

def c_interest(apy, n, deposit=C_DEPOSIT):
    """Interest earned after n month-end deposits: future value of the deposits minus the deposits."""
    q = c_monthly(apy)
    return deposit * ((1 + q) ** n - 1) / q - deposit * n

C_IN = C_DEPOSIT * C_MONTHS                                     # "5 years = $6,000"
C_INT_BIG = c_interest(C_APY_BIG, C_MONTHS)
C_INT_HY = c_interest(C_APY_HY, C_MONTHS)
C_Y1_BIG_CENTS = c_interest(C_APY_BIG, 12) * 100                  # VO: "about 5 cents"
C_Y3_BIG_CENTS = c_interest(C_APY_BIG, 36) * 100                  # VO: "about 53 cents"
C_FDIC = c_interest(FDIC_NATIONAL_SAVINGS, C_MONTHS)              # pinned comment
C_WELLS = c_interest(C_APY_WELLS, C_MONTHS)                       # write-up only
C_CHASE_REL = c_interest(C_APY_CHASE_REL, C_MONTHS)               # write-up only
C_BEGIN_BIG = c_interest(C_APY_BIG, C_MONTHS) * (1 + c_monthly(C_APY_BIG)) + C_IN * c_monthly(C_APY_BIG)
C_BEGIN_HY = c_interest(C_APY_HY, C_MONTHS) * (1 + c_monthly(C_APY_HY)) + C_IN * c_monthly(C_APY_HY)

# ============================================================== expectations
# path -> ("exact", "string")  or  ("tokens", ["tok", ...])

def T(*toks):
    return ("tokens", list(toks))

def E(s):
    return ("exact", s)

def money_k(x):   # 07a ledger precision: nearest $1,000
    return money(x, 1000)

expect = {}
vo_expect = {}     # id -> list of [(token, rounded?)] per VO line
beats = {}         # id -> list of (row label, vo line index, keyword)
first_payoff = {}  # id -> latest allowed t of the first non-start payoff row

# ---- 07a
ida = "07a-scoreboard-start-at-25"
ea = {
    "header": T("2", money(A_DEPOSIT), str(A_STOP - A_START), str(END_AGE - B_START), str(END_AGE)),
    "footer": T(pct(A_RATE * 100)),
    "data.stake": T(money(A_DEPOSIT), pct(A_RATE * 100)),
    "data.people[0].plan": T(str(A_START), str(A_STOP), money(A_IN)),
    "data.people[1].plan": T(str(B_START), str(END_AGE), money(B_IN)),
    "verdict.text": T(money_k(A_GAP)),
    "lookOpts.working[0].text": T(money(A_DEPOSIT), pct(A_RATE * 100)),
    "lookOpts.working[1].text": T(money(A_DEPOSIT), str((A_STOP - A_START) * 12), money(A_IN)),
    "lookOpts.working[2].text": T(money(A_DEPOSIT), str((END_AGE - B_START) * 12), money(B_IN)),
    # round-2 fix pass (2026-10-08): the bar carries the twist. "Ben: $72,000 = 3 × $24,000" on "Ben invests 3 times
    # as much", then each person's money in → their Age 65 cell, as the marks land on those cells
    "lookOpts.working[3].text": T(money(B_IN), num(B_IN / A_IN), money(A_IN)),
    # Scoreboard fix pass (2026-10-08): the working line goes back to the resting line as the Age 65 row cuts
    # (no stale "3 × $24,000" under the climax); no new numbers
    "lookOpts.working[4].text": T(money(A_DEPOSIT), pct(A_RATE * 100)),
    "lookOpts.working[5].text": T(money(A_IN), money_k(A_FINAL)),
    "lookOpts.working[6].text": T(money(B_IN), money_k(B_FINAL)),
}
for i, age in enumerate(A_ROWS):
    ea[f"data.rows[{i}].label"] = E(f"Age {age}")
    ea[f"data.rows[{i}].values[0]"] = E(money_k(ava(age)))
    ea[f"data.rows[{i}].values[1]"] = E(money_k(ben(age)))
ea["data.rows[1].event"] = E("Ava stops · Ben starts")
expect[ida] = ea
vo_expect[ida] = [
    [(str(A_START), False), (str(A_STOP), False)],
    [(str(B_START), False)],
    [(num(B_IN / A_IN), False)],
    [(str(END_AGE), False), (bare(money_k(A_FINAL)), True)],
    [(bare(money_k(B_FINAL)), True)],
    [],
]
# "Age 30" lands at 1.4 s as the first payoff (R10) while line 0 sets up Ava's plan; it is not a spoken beat
beats[ida] = [("Age 35", 0, "stops"), ("Age 65", 3, "65")]
first_payoff[ida] = R10_MAX

# ---- 07b
idb = "07b-becker-rig-panic-sell-2008"
eb = {
    "header": T("2", money(B_STAKE), str(B_SELL_YEAR)),
    "footer": T("500", pct(B_CASH_RATE * 100)),
    "data.stake": T(money(B_STAKE), "500", "31", str(B_BUY_YEAR)),
    "data.people[1].plan": T(str(B_SELL_YEAR)),
    "data.rows[1].event": E("crash " + pct(SP_TR[2008], 0, signed=True)),
    "data.rows[3].event": E("back above " + money(B_STAKE)),
    "data.rows[7].event": E("dip " + pct(SP_TR[2022], 0, signed=True)),
    # round-2 assembly: the rig's cash-out pill over Sam's column (lookOpts.beats[1], act "sell")
    "lookOpts.beats[1].label": E("sold → cash at " + pct(B_CASH_RATE * 100)),
}
for i, y in enumerate(B_ROWS):
    if y == "Dec 2007":
        eb[f"data.rows[{i}].label"] = E("Dec 2007")
        eb[f"data.rows[{i}].values[0]"] = E(money(B_STAKE))
        eb[f"data.rows[{i}].values[1]"] = E(money(B_STAKE))
    else:
        eb[f"data.rows[{i}].label"] = E(str(y))
        eb[f"data.rows[{i}].values[0]"] = E(money(HOLD[y], 100))
        eb[f"data.rows[{i}].values[1]"] = E(money(SAM[y], 100))
expect[idb] = eb
vo_expect[idb] = [
    [(str(B_SELL_YEAR), False), (pct(-SP_TR[2008]), False)],
    [(money(HOLD[B_SELL_YEAR], 100), False)],
    [],
    [(str(first_back), False), (money(B_STAKE), False)],
    [("2022", False)],
    [("2025", False), (bare(money(HOLD[2025], 100)), True)],
    [(bare(money(SAM[2025], 100)), not is_exact(SAM[2025], rnd(SAM[2025], 100)))],
    # round-2 fix pass: the last line is split so the verdict (verdict.t = this line's t) lands on
    # "He dodged the recovery." and "Sam's still at $6,300." stays captioned under its ring
    [],
]
beats[idb] = [("2008", 0, "takes"), (str(first_back), 3, str(first_back)),
              ("2022", 4, "dips"), ("2025", 5, "2025")]
first_payoff[idb] = R10_MAX

# ---- 07c (hook pass 2: "You save $100 a month / 5 years = $6,000 / A big bank adds: ?")
idc = "07c-becker-rig-savings-rate"
ec = {
    "header": T(money(C_DEPOSIT), str(C_YEARS), money(C_IN)),
    # round-2 fix pass: the footer no longer names Chase (its Oct 2 rate sheet is still unopened, [click-check]);
    # the caption keeps the Chase citation
    "footer": T(pct(C_APY_BIG * 100, 2)),
    "data.stake": T(money(C_DEPOSIT)),
    # round-2 fix pass: the plans drop "$100 a month" (the stake line says it once for both)
    "data.people[0].plan": T(pct(C_APY_BIG * 100, 2)),
    "data.people[1].plan": T(pct(C_APY_HY * 100, 2)),
    # column order: You (big bank) left, Leo (high-yield) right; same cent precision as the ledger. The verdict
    # carries the spoken last line ("Same $6,000, different account:")
    "verdict.text": T(money(C_IN), money(C_INT_BIG, 0.01), money(C_INT_HY, 0.01)),
}
c_rows = [("Start", 0.0, 0.0)]
for y in range(1, C_YEARS + 1):
    c_rows.append((f"Year {y}", c_interest(C_APY_BIG, 12 * y), c_interest(C_APY_HY, 12 * y)))
for i, (lab, vb, vh) in enumerate(c_rows):
    ec[f"data.rows[{i}].label"] = E(lab)
    ec[f"data.rows[{i}].values[0]"] = E(money(vb, 0.01))
    ec[f"data.rows[{i}].values[1]"] = E(money(vh, 0.01))
expect[idc] = ec
vo_expect[idc] = [
    # round-2 fix pass: line 0 is split, so the frame-1 caption ("Year 1 at a big bank:") shows no number
    [("1", False)],
    [(bare(num(C_Y1_BIG_CENTS)), True)],
    [(bare(money(c_interest(C_APY_HY, 12))), True)],
    [("3", False), (bare(num(C_Y3_BIG_CENTS)), True)],
    [(str(C_YEARS), False), (bare(money(C_INT_BIG, 0.01)), True)],
    [(bare(money(C_INT_HY)), True)],
    [(money(C_IN), False)],
]
# "Year 1" lands at 1.0 s as the first payoff, just after VO line 0 says "Year 1" (R10)
beats[idc] = [("Year 1", 0, "1"), ("Year 3", 3, "3"), ("Year 5", 4, "5")]
first_payoff[idc] = R10_MAX

# ============================================================== text helpers

NUM_CORE = r"(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?"
TOKEN_RE = re.compile(r"(≈ )?([−-]?\$?" + NUM_CORE + r"%?)")

def strip_markup(s):
    return s.replace("**", "").replace("__", "").replace("\u00a0", " ")

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
    """Approximate spoken words: digits expanded the way the VO would read them."""
    t = strip_markup(text).replace("S&P", "S and P").replace("-", " ").replace("→", " to ")
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
            if dollar:
                out += words_int(int(ip)) + ["dollars"] + words_int(int(fp)) + ["cents"]
                continue
            out += words_int(int(ip)) + ["point"] + [ONES[int(c)] for c in fp]
        else:
            n = int(val)
            if not dollar and not per and "," not in core and 2000 <= n <= 2099:
                out += (["two", "thousand"] + (words_int(n % 100) if n % 100 else [])) if n < 2010 \
                    else (["twenty"] + words_int(n % 100))
            else:
                out += words_int(n)
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

def string_leaves(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from string_leaves(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from string_leaves(v, f"{path}[{i}]")

# ============================================================== checks

rows_out, fails = [], []

def record(sid, field, shown, want, ok, why=""):
    rows_out.append((sid, field, shown, want, "ok" if ok else "FAIL"))
    if not ok:
        fails.append(f"{sid} {field}: shown {shown!r} want {want!r} {why}")

def check_spec(sid):
    path = os.path.join(SPECS, sid + ".json")
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    # --- common fields
    record(sid, "id = file stem", spec.get("id"), sid, spec.get("id") == sid)
    record(sid, "format", spec.get("format"), "ledger-duel", spec.get("format") == "ledger-duel")
    record(sid, "look", spec.get("look"), "in id", spec.get("look") in ("clean-sheet", "live-sheet", "scoreboard", "becker-rig")
           and sid.startswith(sid[:4] + spec.get("look", "?") + "-"))
    record(sid, "fps", spec.get("fps"), 30, spec.get("fps") == 30)
    record(sid, "captions", spec.get("captions"), True, spec.get("captions") is True)
    dur = spec["duration"]
    record(sid, "duration lane", dur, f"{LANE[0]}-{LANE[1]} s", LANE[0] <= dur <= LANE[1])
    record(sid, "header has a number at t=0", spec["header"], "digit", bool(re.search(r"\d", spec["header"])))
    words = len(strip_markup(spec["header"]).replace("\n", " ").split())
    record(sid, "header ≤ 15 words (R8)", words, "≤ 15", words <= 15)
    nlines = spec["header"].count("\n") + 1
    record(sid, "header ≤ 4 lines (R8)", nlines, "≤ 4", nlines <= 4)
    d = spec["data"]
    record(sid, "people", len(d["people"]), 2, len(d["people"]) == 2)
    record(sid, "rows 6-12", len(d["rows"]), "6-12", 6 <= len(d["rows"]) <= 12)
    record(sid, "winner index", d["winner"], "0/1", d["winner"] in (0, 1))

    # --- display strings and numeric tokens
    exp = expect[sid]
    covered = set()
    for p, (kind, want) in exp.items():
        covered.add(p)
        try:
            shown = get(spec, p)
        except (KeyError, IndexError):
            record(sid, p, None, want, False, "(missing)")
            continue
        if kind == "exact":
            record(sid, p, shown, want, shown == want)
        else:
            got = tokens(shown)
            record(sid, p, " | ".join(got), " | ".join(want), got == want)
    # VO numbers
    vx = vo_expect[sid]
    record(sid, "vo line count", len(spec["vo"]), len(vx), len(spec["vo"]) == len(vx))
    for i, (line, want) in enumerate(zip(spec["vo"], vx)):
        covered.add(f"vo[{i}].text")
        got = tokens(line["text"])
        wt = [w for w, _ in want]
        record(sid, f"vo[{i}] numbers", " | ".join(got), " | ".join(wt), got == wt)
        # "about" before rounded numbers only
        for tok, rounded in want:
            m = re.search(r"(\S+)\s+" + re.escape(tok) + r"(?![\d,])", line["text"])
            prev = m.group(1).lower() if m else ""
            ok = (prev == "about") == rounded
            record(sid, f"vo[{i}] '{tok}' rounded→'about'", prev or "(start)", "about" if rounded else "not about", ok)
    # every digit-bearing string is covered
    for p, s in string_leaves(spec):
        if p in ("id", "look", "format") or p.startswith("sfx") or not re.search(r"\d", s):
            continue
        record(sid, f"covered: {p}", s.replace("\n", " / "), "checked", p in covered)

    # --- ≈ on rounded ledger cells is enforced by the exact strings above; winner = bigger final
    last = d["rows"][-1]["values"]
    finals = [float(re.sub(r"[^\d.]", "", bare(v))) for v in last]
    record(sid, "winner = larger final", d["winner"], finals.index(max(finals)), d["winner"] == finals.index(max(finals)))

    # --- timing
    vo = spec["vo"]
    for i, line in enumerate(vo):
        n = len(spoken(line["text"]))
        need = n / WPS
        ok = need - 0.05 <= line["d"] <= need + 0.6
        record(sid, f"vo[{i}] d vs {n} words", line["d"], f"{need:.2f}-{need + 0.6:.2f}", ok)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(sid, f"vo[{i}] ends before vo[{i+1}]", end, f"≤ {vo[i+1]['t']}", end <= vo[i + 1]["t"])
    end = vo[-1]["t"] + vo[-1]["d"]
    record(sid, "last VO ends ≥ 1 s before end", round(end, 2), f"≤ {dur - 1.0}", end <= dur - 1.0)
    record(sid, "hold = duration − last VO end", d["hold"], round(dur - end, 2), abs(d["hold"] - (dur - end)) < 0.051)
    record(sid, "verdict.t = last VO line t", spec["verdict"]["t"], vo[-1]["t"], spec["verdict"]["t"] == vo[-1]["t"])
    ts = [row["t"] for row in d["rows"]]
    record(sid, "row times increasing", ts, "ascending", all(a < b for a, b in zip(ts, ts[1:])) and ts[-1] < dur)
    pay = [row["t"] for row in d["rows"] if row["t"] > 0][0]
    record(sid, "first payoff row (R10)", pay, f"≤ {first_payoff[sid]}", pay <= first_payoff[sid])
    for label, li, kw in beats[sid]:
        row = next(row for row in d["rows"] if row["label"] == label)
        line = vo[li]
        sp = spoken(line["text"])
        kw_sp = [w.lower() for w in spoken(kw)]
        low = [w.lower() for w in sp]
        idx = next(k for k in range(len(low)) if low[k:k + len(kw_sp)] == kw_sp)
        est = line["t"] + line["d"] * idx / len(sp)
        record(sid, f"beat '{label}' vs VO word '{kw}'", row["t"], f"{est:.2f} ± {BEAT_TOL}", abs(row["t"] - est) <= BEAT_TOL)
    for cue in spec.get("sfx", []):
        anchors = ts + [spec["verdict"]["t"]] + [b["t"] for b in spec.get("lookOpts", {}).get("beats", [])]
        record(sid, f"sfx {cue['kind']} on a beat", cue["t"], "a row/verdict/beat t", any(abs(cue["t"] - a) < 1e-9 for a in anchors))
    # the Scoreboard working line (label stack line 1) is a hard cut that holds until the next line, and the
    # label stack yields at verdict.t: each line must stay up long enough to read
    bar = spec.get("lookOpts", {}).get("working", [])
    for i, k in enumerate(bar):
        until = bar[i + 1]["t"] if i + 1 < len(bar) else spec["verdict"]["t"]
        n = len(re.sub(r"^\s*=\s*", "", strip_markup(k["text"])))      # the kit drops a leading "= "
        need = (SLAM if k["t"] > 0 else 0.0) + max(BAR_READ, n / WORK_CPS)   # a line at t <= 0 is landed on frame 1
        record(sid, f"working[{i}] on screen ≥ slam + read", round(until - k["t"], 2), f"≥ {need:.2f}",
               until - k["t"] >= need)
    for opt in RETIRED_OPTS.get(sid, ()):
        record(sid, f"no retired-look option '{opt}'", opt in spec.get("lookOpts", {}), False, opt not in spec.get("lookOpts", {}))
    # VO-locked marks (lookOpts.marks [{t, row, person}], and 07c's lookOpts.winnerT on the winner's final cell):
    # each lands after its row, inside a VO line, and that line names the marked cell's value (as shown, to the
    # dollar, or in cents)
    lo = spec.get("lookOpts", {})
    picks = [(m["t"], m["row"], m["person"], f"mark {m['row']}/{m['person']}") for m in lo.get("marks", [])]
    if "winnerT" in lo:
        picks.append((lo["winnerT"], len(d["rows"]) - 1, d["winner"], "winnerT"))
    for mt, mr, mp, what in picks:
        cell = d["rows"][mr]["values"][mp]
        val = float(re.sub(r"[^\d.]", "", bare(cell)))
        said = {bare(cell), money(val, 1, approx_sign=False), f"{rnd(val * 100, 1):.0f} cents"}
        line = next((v for v in vo if v["t"] <= mt <= v["t"] + v["d"]), None)
        text = strip_markup(line["text"]) if line else ""
        named = any(re.search(re.escape(x) + r"(?![\d,])", text) for x in said)
        record(sid, f"{what} at {mt} names {cell}", text or "(no VO line)", f"after row t {d['rows'][mr]['t']}, VO names it",
               bool(line) and named and mt >= d["rows"][mr]["t"])
    for b in spec.get("lookOpts", {}).get("beats", []):
        anchors = ts + [line["t"] + k * 0.1 for line in vo for k in range(int(line["d"] * 10) + 1)]
        record(sid, f"rig beat {b['act']} inside a row or VO line", b["t"], "anchored", any(abs(b["t"] - a) < 0.051 for a in anchors))

# ---- maths statements made in VO, verdicts, captions and pinned comments
def claim(sid, what, shown, want, ok):
    record(sid, "claim: " + what, shown, want, ok)

claim(ida, "Ben puts in 3× Ava", B_IN / A_IN, 3, B_IN == 3 * A_IN)
claim(ida, "header: Ava 10 yrs, Ben 30 yrs", (A_STOP - A_START, END_AGE - B_START), (10, 30),
      (A_STOP - A_START, END_AGE - B_START) == (10, 30))
claim(ida, "Ava never behind at any row", min(ava(a) - ben(a) for a in A_ROWS) > 0, True,
      all(ava(a) > ben(a) for a in A_ROWS))
claim(ida, "gap from display finals", money_k(A_FINAL), "≈ $281,000 − ≈ $244,000 = ≈ $37,000",
      rnd(A_FINAL, 1000) - rnd(B_FINAL, 1000) == rnd(A_GAP, 1000))
claim(ida, "formula bar: 3 × $24,000 = $72,000 (shown factors)", 3 * A_IN, B_IN, 3 * A_IN == B_IN)
claim(ida, "formula bar: Ava's money in → her Age 65 cell", f"{money(A_IN)} → {money_k(A_FINAL)}",
      f"$24,000 → {money_k(ava(A_ROWS[-1]))}", A_IN == 24_000 and money_k(A_FINAL) == money_k(ava(A_ROWS[-1])) == "≈ $281,000")
claim(ida, "formula bar: Ben's money in → his Age 65 cell", f"{money(B_IN)} → {money_k(B_FINAL)}",
      f"$72,000 → {money_k(ben(A_ROWS[-1]))}", B_IN == 72_000 and money_k(B_FINAL) == money_k(ben(A_ROWS[-1])) == "≈ $244,000")
claim(ida, "the twist: less in, more out", (A_IN < B_IN, A_FINAL > B_FINAL), (True, True), A_IN < B_IN and A_FINAL > B_FINAL)
claim(ida, "pinned: Ava never stops", money_k(A_FULL40), "≈ $525,000", money_k(A_FULL40) == "≈ $525,000")
claim(ida, "caption: break-even rate", f"{A_BREAKEVEN * 100:.3f}%", "≈ 6.1%", pct(A_BREAKEVEN * 100, 1) == "≈ 6.1%")
claim(ida, "caption: at 6% Ben edges ahead", f"{money_k(A6_AVA)} vs {money_k(A6_BEN)}", "≈ $197,000 vs ≈ $201,000",
      A6_BEN > A6_AVA and (money_k(A6_AVA), money_k(A6_BEN)) == ("≈ $197,000", "≈ $201,000"))
claim(idb, "2008 drop on the 2007 close", pct((HOLD[2008] / HOLD[2007] - 1) * 100, 0, signed=True), "−37%",
      pct((HOLD[2008] / HOLD[2007] - 1) * 100, 0, signed=True) == "−37%")
claim(idb, "both at $6,300 exactly after 2008", HOLD[2008], 6300.0, abs(HOLD[2008] - 6300) < 1e-6)
claim(idb, "first year-end back above $10,000", first_back, 2012, first_back == 2012 and HOLD[2011] < B_STAKE)
claim(idb, "caption: Alex ÷ Sam", num(B_RATIO, 1), "≈ 10.5", num(B_RATIO, 1) == "≈ 10.5")
claim(idb, "caption: growth after the sale", num(B_SINCE_SELL, 1), "≈ 10.5", num(B_SINCE_SELL, 1) == "≈ 10.5")
claim(idb, "caption: Alex's multiple on $10,000", num(HOLD[2025] / B_STAKE, 1), "≈ 6.6", num(HOLD[2025] / B_STAKE, 1) == "≈ 6.6")
claim(idb, "pinned: Sam at 5% a year 2009-2025", money(B_SAM_5PCT, 100), "≈ $14,400", money(B_SAM_5PCT, 100) == "≈ $14,400")
claim(idb, "pinned: 5% case < 1/4 of Alex", round(B_SAM_5PCT / HOLD[2025], 3), "< 0.25", B_SAM_5PCT < HOLD[2025] / 4)
B_FEE10 = sp_path({y: v - 0.10 for y, v in after_buy(SP_TR).items()})[2025]   # write-up: 0.10%/yr fee drag (approx.)
claim(idb, "write-up: 0.10% a year fee drag", money(B_FEE10, 100), "≈ $64,900", money(B_FEE10, 100) == "≈ $64,900")
claim(idb, "write-up: Damodaran swap", f"{money(DAMO[2025], 100)} / {money(DAMO[2008], 100)}", "≈ $65,900 / ≈ $6,300",
      (money(DAMO[2025], 100), money(DAMO[2008], 100)) == ("≈ $65,900", "≈ $6,300"))
claim(idc, "header: 5 years of $100 a month", C_IN, 6000, C_IN == 6000 and C_MONTHS == 60)
claim(idc, "monthly rate compounds to the APY", round((1 + c_monthly(C_APY_HY)) ** 12 - 1, 12), C_APY_HY,
      abs((1 + c_monthly(C_APY_HY)) ** 12 - 1 - C_APY_HY) < 1e-12)
claim(idc, "year 1 at the big bank, in cents", f"{C_Y1_BIG_CENTS:.4f}", "≈ 5", num(C_Y1_BIG_CENTS) == "≈ 5")
claim(idc, "year 3 at the big bank, in cents", f"{C_Y3_BIG_CENTS:.4f}", "≈ 53", num(C_Y3_BIG_CENTS) == "≈ 53")
claim(idc, "the big bank adds under $2 on $6,000", round(C_INT_BIG, 4), "< 2", C_INT_BIG < 2)
claim(idc, "caption: $200 a month doubles both", (round(c_interest(C_APY_BIG, C_MONTHS, 200), 4),
      round(c_interest(C_APY_HY, C_MONTHS, 200), 4)), "2 × each",
      abs(c_interest(C_APY_BIG, C_MONTHS, 200) - 2 * C_INT_BIG) < 1e-9
      and abs(c_interest(C_APY_HY, C_MONTHS, 200) - 2 * C_INT_HY) < 1e-9)
claim(idc, "write-up: high-yield ÷ big bank at year 5", num(C_INT_HY / C_INT_BIG), "≈ 419", num(C_INT_HY / C_INT_BIG) == "≈ 419")
claim(idc, "pinned: FDIC avg 0.37% on the same deposits", money(C_FDIC), "≈ $55", money(C_FDIC) == "≈ $55")
claim(idc, "pinned: FDIC case under a tenth of 4.00%", round(C_FDIC / C_INT_HY, 4), "< 0.1", C_FDIC < C_INT_HY / 10)
claim(idc, "write-up: Wells 0.15% case", money(C_WELLS, 0.01), "≈ $22.16", money(C_WELLS, 0.01) == "≈ $22.16")
claim(idc, "write-up: Chase 0.02% relationship rate", money(C_CHASE_REL, 0.01), "≈ $2.95", money(C_CHASE_REL, 0.01) == "≈ $2.95")
claim(idc, "write-up: deposits at month-start instead", f"{money(C_BEGIN_BIG, 0.01)} / {money(C_BEGIN_HY, 0.01)}",
      "≈ $1.53 / ≈ $639.57", (money(C_BEGIN_BIG, 0.01), money(C_BEGIN_HY, 0.01)) == ("≈ $1.53", "≈ $639.57"))

# ---- look-specific staging (port to Scoreboard / Becker rig, 2026-10-08)
def load(sid):
    with open(os.path.join(SPECS, sid + ".json"), encoding="utf-8") as f:
        return json.load(f)

def word_t(line, kw):
    """Estimated time the VO line reaches keyword kw (uniform spoken-word rate, as the beat check)."""
    sp = [w.lower() for w in spoken(line["text"])]
    k = [w.lower() for w in spoken(kw)]
    idx = next(j for j in range(len(sp)) if sp[j:j + len(k)] == k)
    return line["t"] + line["d"] * idx / len(sp)

SA, SC = load(ida), load(idc)
loA, loC = SA.get("lookOpts", {}), SC.get("lookOpts", {})
rowsA = SA["data"]["rows"]

# 07a, Scoreboard: no leader border (both panels stay neutral until the verdict floods Ava's)
claim(ida, "Scoreboard: leader border off", loA.get("leader"), False, loA.get("leader") is False)
# the climax: the Age 65 count rolls from its cut (+0.08 s) for max(1.0 s, the kit's jump time), stretched to land
# 0.15 s before the first mark on that row (lookOpts.finalRoll, default 2.4 s, caps it): it must land as the VO says
# Ava's final, and the mark that lights her panel must follow it
def roll_for(a, b):
    lo_, hi_ = min(a, b), max(a, b)
    if abs(b - a) < 1e-9:
        return 0.0
    return min(1.9, max(0.8, 0.7 + 0.45 * __import__("math").log2(hi_ / lo_))) if lo_ > 0 else 1.1
startA = rowsA[-1]["t"] + 0.08
rollA = max(roll_for(ava(60), ava(65)), roll_for(ben(60), ben(65)))
mk65 = [m for m in loA.get("marks", []) if m["row"] == len(rowsA) - 1]
limitA = min(m["t"] for m in mk65) - 0.15 if mk65 else 1e9
landA = startA + min(loA.get("finalRoll", 2.4), max(max(1.0, rollA), limitA - startA))
sayA = word_t(SA["vo"][3], bare(money_k(A_FINAL)))
claim(ida, "Scoreboard: Age 65 count lands on the spoken '$281,000'", round(landA, 2), f"{sayA:.2f} ± {BEAT_TOL}",
      abs(landA - sayA) <= BEAT_TOL)
sayB = word_t(SA["vo"][4], bare(money_k(B_FINAL)))
for m in loA.get("marks", []):
    who = SA["data"]["people"][m["person"]]["name"]
    say = sayA if m["person"] == 0 else sayB
    claim(ida, f"Scoreboard: {who}'s mark on the Age 65 row, on the spoken final", (m["row"], m["t"]),
          f"row {len(rowsA) - 1}, {say:.2f} ± {BEAT_TOL}, after the land", m["row"] == len(rowsA) - 1
          and abs(m["t"] - say) <= BEAT_TOL and m["t"] >= landA)
w4 = next(w for w in loA["working"] if money_k(A_FINAL) in strip_markup(w["text"]))
claim(ida, "Scoreboard: the working line with ≈ $281,000 cuts in after the count lands", w4["t"], f"≥ {landA:.2f}",
      w4["t"] >= landA - 1e-6 and money_k(A_FINAL) in strip_markup(w4["text"]))
# fix pass (2026-10-08): as the Age 65 row cuts, the working line goes back to the resting line (word for word)
wk65 = [w for w in loA["working"] if abs(w["t"] - rowsA[-1]["t"]) < 1e-9]
claim(ida, "Scoreboard: the working line rests as the Age 65 row cuts", [w["text"] for w in wk65], loA["working"][0]["text"],
      len(wk65) == 1 and wk65[0]["text"] == loA["working"][0]["text"])
# the full table forms in the VO gap after Ava's line (her ≈ $281,000 owns the stage while it is said), with Ben's
# working line on the same cut, and before Ben's mark
vo3, vo4 = SA["vo"][3], SA["vo"][4]
tT = loA.get("tableT")
claim(ida, "Scoreboard: table forms in the VO gap after Ava's final", tT, f"{vo3['t'] + vo3['d']:.2f}-{vo4['t']:.2f}",
      tT is not None and vo3["t"] + vo3["d"] - 1e-9 <= tT <= vo4["t"] and tT > landA)
wB = next(w for w in loA["working"] if money_k(B_FINAL) in strip_markup(w["text"]))
claim(ida, "Scoreboard: Ben's working line cuts with the table", wB["t"], tT, tT is not None and abs(wB["t"] - tT) < 1e-9)
# the plans' money pieces ("put in $24,000", "put in $72,000") light on "Ben invests 3 times as much"; the focus
# ends before the climax row cuts
vo2 = SA["vo"][2]
pfs = loA.get("planFocus", [])
claim(ida, "Scoreboard: plan focus on the '3 times as much' line", [(x["t"], x.get("d")) for x in pfs],
      f"inside {vo2['t']}-{vo2['t'] + vo2['d']:.2f}, off before {rowsA[-1]['t']}",
      len(pfs) == 1 and vo2["t"] <= pfs[0]["t"] <= vo2["t"] + vo2["d"]
      and pfs[0]["t"] + pfs[0].get("d", 2.0) + 0.3 <= rowsA[-1]["t"] + 1e-9
      and num(B_IN / A_IN) in strip_markup(vo2["text"])
      and all(money(x) in SA["data"]["people"][k]["plan"] for k, x in ((0, A_IN), (1, B_IN))))
keepA = sorted({0, len(rowsA) - 1, *loA.get("tableRows", range(len(rowsA)))})
claim(ida, "Scoreboard: final table rows (decades after the twist row)", [rowsA[i]["label"] for i in keepA],
      ["Age 30", "Age 35", "Age 45", "Age 55", "Age 65"],
      [rowsA[i]["label"] for i in keepA] == ["Age 30", "Age 35", "Age 45", "Age 55", "Age 65"]
      and any(rowsA[i].get("event") for i in keepA))

# 07c, Becker rig
figC = {f["person"]: f["color"] for f in loC.get("figures", [])}
# fix pass (2026-10-08): the kit default, winner = hero. Leo (the winner) is the green figure, so the green figure,
# Leo's green column head, his fresh green cells, his green ring and the verdict's green ≈ $617.90 all name the same
# person; You (the viewer's stand-in, in the losing seat) is slate and still ponders the hook on frame 1
claim(idc, "Becker: Leo (winner) is the hero figure, You neutral", figC, "{0: neutral, 1: hero}",
      figC == {0: "neutral", 1: "hero"} and SC["data"]["winner"] == 1)
claim(idc, "Becker: You ponders the hook on frame 1", loC.get("ponder"), 0, loC.get("ponder") == 0)
# quiet gains: one coin is 15 px; the tallest stack (Leo's ≈ $617.90) stands 300-600 px. You's yearly gains must stay
# under minGain coins at any such height (his cells land in ink, he never rides them); Leo's must clear it
mg = loC.get("minGain", 0)
gainsY = [c_interest(C_APY_BIG, 12 * y) - c_interest(C_APY_BIG, 12 * (y - 1)) for y in range(1, C_YEARS + 1)]
gainsL = [c_interest(C_APY_HY, 12 * y) - c_interest(C_APY_HY, 12 * (y - 1)) for y in range(1, C_YEARS + 1)]
claim(idc, "Becker: You's gains are quiet (< minGain coins at a 600 px tower)", round(max(gainsY) * 600 / C_INT_HY / 15, 4),
      f"< {mg}", mg > 0 and max(gainsY) * 600 / C_INT_HY < mg * 15)
claim(idc, "Becker: Leo's gains are not quiet (>= minGain coins at a 300 px tower)", round(min(gainsL) * 300 / C_INT_HY / 15, 3),
      f">= {mg}", min(gainsL) * 300 / C_INT_HY >= mg * 15)
# the crown (gold plate, impact, cash) lands as the VO says Leo's final, after the Year 5 row
sayL = word_t(SC["vo"][5], bare(money(C_INT_HY)))
claim(idc, "Becker: crown (winnerT) on the spoken '$618'", loC.get("winnerT"), f"{sayL:.2f} ± {BEAT_TOL}",
      loC.get("winnerT", 0) > SC["data"]["rows"][-1]["t"] and abs(loC.get("winnerT", 0) - sayL) <= BEAT_TOL)
# ring tones follow the verdict's colours: You's numbers are __red__, Leo's **green**
vtext = SC["verdict"]["text"]
claim(idc, "Becker: verdict colours You's final red, Leo's green",
      vtext.replace("\n", " / "), "__≈ $1.48__ … **≈ $617.90**",
      f"__{money(C_INT_BIG, 0.01)}__" in vtext and f"**{money(C_INT_HY, 0.01)}**" in vtext)
for m in loC.get("marks", []):
    want = "bad" if m["person"] == 0 else "good"
    claim(idc, f"Becker: ring tone on row {m['row']} person {m['person']}", m.get("tone"), want, m.get("tone") == want)
# the mono footer (<= 2 lines) and stake line (1 line) fit 878 px at 40 px
fl = SC["footer"].split("\n")
claim(idc, "Becker: footer ≤ 2 mono lines of ≤ 37 characters", [len(x) for x in fl], f"≤ {MONO_LINE}",
      len(fl) <= 2 and all(len(x) <= MONO_LINE for x in fl))
claim(idc, "Becker: stake line one mono line", len(SC["data"]["stake"]), f"≤ {MONO_LINE}", len(SC["data"]["stake"]) <= MONO_LINE)
claim(idc, "Becker: plans set on two lines", [pp["plan"].count("\n") for pp in SC["data"]["people"]], [1, 1],
      all(pp["plan"].count("\n") == 1 for pp in SC["data"]["people"]))

# ---- the write-up names only spec files that exist (live in specs/, retired in specs/retired/)
MD = os.path.join(ROOT, "teasers", "v2", "07-ledger-duel.md")
with open(MD, encoding="utf-8") as f:
    md_text = f.read()
for ref in sorted(set(re.findall(r"studio/specs/(?:retired/)?[\w.-]+\.json", md_text))):
    claim("md", f"path exists: {ref}", os.path.exists(os.path.join(ROOT, ref)), True, os.path.exists(os.path.join(ROOT, ref)))
for sid in (ida, idb, idc):
    claim("md", f"write-up names the live spec {sid}", f"studio/specs/{sid}.json" in md_text, True,
          f"studio/specs/{sid}.json" in md_text)

for sid in (ida, idb, idc):
    check_spec(sid)

# ---- sensitivity (information only, not asserted): Damodaran's figures where available
print("\nSensitivity (07b, info only): S&P DJI vs Damodaran-substituted years 2008-10, 2022-24")
for y in (2008, 2012, 2025):
    print(f"  {y}: S&P DJI {money(HOLD[y], 100):>12}   with Damodaran years {money(DAMO[y], 100):>12}")
print(f"  Sam (sold end-2008): {money(SAM[2025], 100)} vs {money(DAMO[2008], 100)}")

# ---- table
w = [max(len(str(r_[i])) for r_ in rows_out) for i in range(5)]
w = [min(x, m) for x, m in zip(w, (31, 46, 44, 44, 4))]
print()
print(" | ".join(h.ljust(x) for h, x in zip(("spec", "field", "on screen / in spec", "computed", "ok"), w)))
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
