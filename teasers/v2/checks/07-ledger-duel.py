#!/usr/bin/env python3
"""Math + spec check for format 7, "ledger-duel" (teasers 07a, 07b, 07c).

1. Recomputes every on-screen number from its inputs (below).
2. Loads the three spec JSONs and asserts that
   - every computed display string (ledger cells, verdict, events) equals the spec exactly,
   - every number inside every other string (header, footer, stake, plans, labels, lookOpts,
     VO lines) equals the computed, formatted value, in order,
   - rounded results carry "≈" on screen and "about" in the VO; exact ones carry neither,
   - every string in the spec that contains a digit is covered by a check,
   - VO timing fits ~2.6 spoken words per second, lines don't overlap, each mentioned beat
     lands within 0.9 s of the moment its VO line says it, durations sit in the 12-30 s lane,
   - the first payoff row lands by 3.0 s (R10), each formula-bar line stays up long enough to
     type and read, and a formula that multiplies shown factors reproduces the shown result.
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
BAR_CPS = 24         # Live Sheet formula bar types ~24 characters a second (03-look-directions)
BAR_READ = 1.5       # seconds a typed formula-bar line must then stay readable

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
A_AVA35_SHOWN = rnd(ava(A_STOP), 1)                        # formula bar: Ava's balance at 35, to the dollar
A_GROW_SHOWN = rnd(A_GROW30, 0.01)                         # formula bar: growth factor, 2 dp

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
ida = "07a-live-sheet-start-at-25"
ea = {
    "header": T("2", money(A_DEPOSIT), str(A_STOP - A_START), str(END_AGE - B_START), str(END_AGE)),
    "footer": T(pct(A_RATE * 100)),
    "data.stake": T(money(A_DEPOSIT), pct(A_RATE * 100)),
    "data.people[0].plan": T(str(A_START), str(A_STOP), money(A_IN)),
    "data.people[1].plan": T(str(B_START), str(END_AGE), money(B_IN)),
    "verdict.text": T(money_k(A_GAP)),
    "lookOpts.formulaBar[0].text": T(money(A_DEPOSIT), pct(A_RATE * 100)),
    "lookOpts.formulaBar[1].text": T(money(A_DEPOSIT), str((A_STOP - A_START) * 12), money(A_IN)),
    "lookOpts.formulaBar[2].text": T(money(A_DEPOSIT), str((END_AGE - B_START) * 12), money(B_IN)),
    "lookOpts.formulaBar[3].text": T(money(ava(A_STOP)), num(A_GROW30, 2), money_k(A_FINAL), str(END_AGE)),
}
for i, age in enumerate(A_ROWS):
    ea[f"data.rows[{i}].label"] = E(f"Age {age}")
    ea[f"data.rows[{i}].values[0]"] = E(money_k(ava(age)))
    ea[f"data.rows[{i}].values[1]"] = E(money_k(ben(age)))
ea["data.rows[1].event"] = E("Ava stops · Ben starts")
expect[ida] = ea
vo_expect[ida] = [
    [(str(A_STOP - A_START), False), (str(END_AGE - B_START), False)],
    [(str(A_START), False), (str(A_STOP), False)],
    [(str(B_START), False)],
    [(num(B_IN / A_IN), False)],
    [(str(END_AGE), False), (bare(money_k(A_FINAL)), True)],
    [(bare(money_k(B_FINAL)), True)],
    [],
]
# "Age 30" lands at 2.4 s as the first payoff (R10) while line 0 sets up the contest; it is not a spoken beat
beats[ida] = [("Age 35", 1, "stops"), ("Age 65", 4, "65")]
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
    "lookOpts.beats[0].label": E(pct(SP_TR[2008], 0, signed=True)),
    "lookOpts.beats[1].label": E(pct(B_CASH_RATE * 100)),
    "lookOpts.beats[2].label": E(pct(SP_TR[2022], 0, signed=True)),
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
]
beats[idb] = [("2008", 0, "takes"), (str(first_back), 3, str(first_back)),
              ("2022", 4, "dips"), ("2025", 5, "2025")]
first_payoff[idb] = R10_MAX

# ---- 07c (hook pass 2: "You save $100 a month / 5 years = $6,000 / A big bank adds: ?")
idc = "07c-clean-sheet-savings-rate"
ec = {
    "header": T(money(C_DEPOSIT), str(C_YEARS), money(C_IN)),
    "footer": T(money(C_DEPOSIT), str(C_YEARS), pct(C_APY_BIG * 100, 2)),
    "data.stake": T(money(C_DEPOSIT)),
    "data.people[0].plan": T(pct(C_APY_BIG * 100, 2), money(C_DEPOSIT)),
    "data.people[1].plan": T(pct(C_APY_HY * 100, 2), money(C_DEPOSIT)),
    # column order: You (big bank) left, Leo (high-yield) right; same cent precision as the ledger
    "verdict.text": T(money(C_IN), str(C_YEARS), money(C_INT_BIG, 0.01), money(C_INT_HY, 0.01)),
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
    [("1", False), (bare(num(C_Y1_BIG_CENTS)), True)],
    [(bare(money(c_interest(C_APY_HY, 12))), True)],
    [("3", False), (bare(num(C_Y3_BIG_CENTS)), True)],
    [(str(C_YEARS), False), (bare(money(C_INT_BIG, 0.01)), True)],
    [(bare(money(C_INT_HY)), True)],
    [(money(C_IN), False)],
]
# "Year 1" lands at 1.0 s as the first payoff, just after VO line 0 says "Year 1" (R10)
beats[idc] = [("Year 1", 0, "1"), ("Year 3", 2, "3"), ("Year 5", 3, "5")]
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
    bar = spec.get("lookOpts", {}).get("formulaBar", [])
    for i, k in enumerate(bar):
        until = bar[i + 1]["t"] if i + 1 < len(bar) else dur - 0.5        # the loop clears the last 0.5 s
        n = len(strip_markup(k["text"]))
        shown = 0.7 * n if k["t"] <= 0 else 0.0                        # frame 1 arrives ~70% typed
        need = (n - shown) / BAR_CPS + BAR_READ
        record(sid, f"formulaBar[{i}] on screen ≥ type + read", round(until - k["t"], 2), f"≥ {need:.2f}",
               until - k["t"] >= need)
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
claim(ida, "formula bar: shown $34,617 × 8.12 → shown final", round(A_AVA35_SHOWN * A_GROW_SHOWN, 2),
      money_k(A_FINAL), money_k(A_AVA35_SHOWN * A_GROW_SHOWN) == money_k(A_FINAL))
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
