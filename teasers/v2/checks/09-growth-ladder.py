#!/usr/bin/env python3
"""Math + spec check for format 9, "growth-ladder" (teasers 09a, 09b, 09c).

1. Recomputes every on-screen number from its inputs (section "inputs" below).
2. Loads the three spec JSONs and asserts that
   - every computed display string (ladder cells, input block, gate, goal) equals the spec exactly,
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
A_M, A_RATE = 100, 0.08
A_YEARS = [1, 5, 9, 12, 15, 16, 20, 30]
A_ALT_AMOUNTS = [50, 500]          # formula bar: "$50 or $500 a month: still year 16"

# 09b: $1,000 once, 7% a year, credited once a year (× 1.07), nothing added or taken out.
B_P, B_RATE = 1000, 0.07
B_YEARS = [1, 2, 5, 10, 15, 20, 25, 30]
B_HORIZON = 30

# 09c: $5 a day = $5 × 365 ÷ 12 a month, deposited at month-end, 7% a year compounded monthly.
C_DAY, C_DAYS, C_RATE = 5, 365, 0.07
C_M = C_DAY * C_DAYS / 12
C_YEARS = [1, 10, 20, 30, 40, 50, 53]
C_GOAL = 1_000_000

# Write-up only (captions / pinned comments): S&P 500 long-run averages, with dividends reinvested.
# Official Data Foundation (officialdata.org), "S&P 500 since 1928": 10.09% a year nominal, 6.81% real.
# A Wealth of Common Sense (Ben Carlson, Jan 2025) from Damodaran/NYU Stern, 1928-2024: 9.94% nominal, 6.8% real.
SP_NOMINAL = (10.09, 9.94)
SP_REAL = (6.81, 6.8)

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
A_IN = {y: A_M * 12 * y for y in A_YEARS}
A_W = {y: fv_monthly(A_M, A_RATE, 12 * y) for y in A_YEARS}
A_RATIO = {y: A_W[y] / A_IN[y] for y in A_YEARS}
def a_cross(m, rate=A_RATE):
    return first_year(lambda y: fv_monthly(m, rate, 12 * y) >= 2 * 12 * m * y)
A_CROSS = a_cross(A_M)
A_R72 = 72 / (A_RATE * 100)
A_FIRST_DEPOSIT = A_M * (1 + A_RATE / 12) ** (12 * A_CROSS - 1)   # the month-1 deposit at year 16
A_LUMP_DOUBLE = math.log(2) / (12 * math.log(1 + A_RATE / 12))    # write-up: lump sum, monthly comp.

# ---- 09b
B_V = {y: B_P * (1 + B_RATE) ** y for y in range(0, 41)}
B_SIMPLE = lambda y: B_P + B_P * B_RATE * y
B_GUESS = B_SIMPLE(B_HORIZON)
B_Y2_ADD = B_V[2] - B_V[1]
B_GATE = 1 + B_RATE
B_TIMES_GUESS = B_V[B_HORIZON] / B_GUESS
B_FIRST_PAST_GUESS = first_year(lambda y: B_V[y] >= B_GUESS)
B_DOUBLE_YEAR = first_year(lambda y: B_V[y] >= 2 * B_P)

# ---- 09c
C_IN = {y: C_DAY * C_DAYS * y for y in C_YEARS}
C_W = {y: fv_monthly(C_M, C_RATE, 12 * y) for y in C_YEARS}
C_MILLION_YEAR = first_year(lambda y: fv_monthly(C_M, C_RATE, 12 * y) >= C_GOAL)
C_SHARE = C_IN[53] / C_W[53]
C_MILLION_YEAR_10 = first_year(lambda y: fv_monthly(C_M, 0.10, 12 * y) >= C_GOAL)   # pinned comment
C_MILLION_MONTH_10 = first_year(lambda k: fv_monthly(C_M, 0.10, k) >= C_GOAL, stop=1200)  # month count

def c_money(x):          # 09c precision: nearest $100 (Scoreboard counters, "≈ $185,500" style)
    return money(x, 100)

# ============================================================== expectations
# path -> ("exact", "string")  or  ("tokens", ["tok", ...])

def T(*toks):
    return ("tokens", list(toks))

def E(s):
    return ("exact", s)

expect, vo_expect, beats, extra_t = {}, {}, {}, {}

# ---- 09a
ida = "09a-live-sheet-100-a-month-doubles"
ea = {
    "header": T(money(A_M), pct(A_RATE * 100)),
    "footer": T(pct(A_RATE * 100), money(A_M)),
    "verdict.text": T(str(A_CROSS), num(A_R72)),
    "data.input.amount": E(money(A_M)),
    "data.input.rate": E(pct(A_RATE * 100) + " a year"),
    "lookOpts.formulaBar[0].text": T(money(A_M), "12", money(A_M * 12)),
    "lookOpts.formulaBar[1].text": T("72", "72", num(A_RATE * 100), num(A_R72)),
    "lookOpts.formulaBar[2].text": T(money(A_W[9]), "2", money(A_IN[9])),
    "lookOpts.formulaBar[3].text": T(money(A_W[15]), "2", money(A_IN[15])),
    "lookOpts.formulaBar[4].text": T(money(A_W[16]), "2", money(A_IN[16])),
    "lookOpts.formulaBar[5].text": T("1", money(A_M), money(A_FIRST_DEPOSIT), money(A_M), money(A_M)),
    "lookOpts.formulaBar[6].text": T(money(A_W[30]), money(A_IN[30]), num(A_RATIO[30], 1)),
    "lookOpts.formulaBar[7].text": T(money(A_ALT_AMOUNTS[0]), money(A_ALT_AMOUNTS[1]), str(a_cross(A_ALT_AMOUNTS[0]))),
}
for i, y in enumerate(A_YEARS):
    ea[f"data.rows[{i}][0]"] = E(str(y))
    ea[f"data.rows[{i}][1]"] = E(money(A_IN[y]))
    ea[f"data.rows[{i}][2]"] = E(money(A_W[y]))
expect[ida] = ea
# VO: (token, mode) with mode exact | about | over
vo_expect[ida] = [
    [(money(A_M), "exact"), (pct(A_RATE * 100), "exact")],
    [("72", "exact"), (num(A_R72), "exact")],
    [("9", "exact")],
    [("15", "exact")],
    [(str(A_CROSS), "exact"), (money(A_IN[16]), "exact")],
    [(str(A_CROSS), "exact"), (num(A_R72), "exact"), (money(A_M), "exact")],
    [("30", "exact"), (num(flo(A_RATIO[30], 1)), "over")],
    [(str(A_CROSS), "exact")],
]
beats[ida] = [("9", 2, "Year 9"), ("15", 3, "Year 15"), ("16", 4, "Year 16"), ("30", 6, "Year 30")]
# lookOpts times that must sit on a beat (row t or VO word)
extra_t[ida] = [("formulaBar", 3.4, 1, "Rule"), ("formulaBar", 17.6, 5, "Every"), ("formulaBar", 24.8, 7, "Any")]

# ---- 09b
idb = "09b-becker-rig-1000-times-1-07"
eb = {
    "header": T(money(B_P), pct(B_RATE * 100), str(B_HORIZON)),
    "footer": T(pct(B_RATE * 100)),
    "verdict.text": T(money(B_V[B_HORIZON]), money(B_GUESS), pct(B_RATE * 100), pct(B_RATE * 100)),
    "data.input.amount": E(money(B_P)),
    "data.input.rate": E(pct(B_RATE * 100) + " a year"),
    "lookOpts.gate": E(f"×{B_GATE:.2f}"),
    "lookOpts.guess.display": E(money(B_GUESS) + "?"),
    "lookOpts.guess.label": E(f"+{money(B_P * B_RATE)} a year"),
}
for i, y in enumerate(B_YEARS):
    eb[f"data.rows[{i}][0]"] = E(str(y))
    eb[f"data.rows[{i}][1]"] = E(money(B_P))
    eb[f"data.rows[{i}][2]"] = E(money(B_V[y]))
expect[idb] = eb
vo_expect[idb] = [
    [(money(B_P), "exact"), (pct(B_RATE * 100), "exact"), (money(B_P * B_RATE), "exact")],
    [(str(B_HORIZON), "exact"), (money(B_GUESS), "exact")],
    [("2", "exact"), (bare(money(B_Y2_ADD)), "about"), (money(B_P * B_RATE), "exact")],
    [("10", "exact"), (bare(money(B_V[10])), "about")],
    [("20", "exact"), (bare(money(B_V[20])), "about")],
    [("30", "exact"), (bare(money(B_V[30])), "about")],
    [(money(B_GUESS), "exact"), (bare(num(B_TIMES_GUESS, 1)), "about")],
]
beats[idb] = [("1", 0, "plus"), ("2", 1 + 1, "Year 2"), ("10", 3, "Year 10"), ("20", 4, "Year 20"), ("30", 5, "Year 30")]
extra_t[idb] = [("guess", 6.6, 1, "$3,100")]

# ---- 09c
idc = "09c-scoreboard-5-a-day-millionaire"
ec = {
    "header": T(money(C_DAY)),
    "footer": T(money(C_DAY), str(C_DAYS), "12", money(C_M), pct(C_RATE * 100)),
    "verdict.text": T(str(C_MILLION_YEAR)),
    "data.input.amount": E(money(C_DAY)),
    "data.input.rate": E(pct(C_RATE * 100) + " a year"),
    "lookOpts.goal.display": E(money(C_GOAL)),
}
for i, y in enumerate(C_YEARS):
    ec[f"data.rows[{i}][0]"] = E(str(y))
    ec[f"data.rows[{i}][1]"] = E(money(C_IN[y]))
    ec[f"data.rows[{i}][2]"] = E(c_money(C_W[y]))
expect[idc] = ec
vo_expect[idc] = [
    [(money(C_DAY), "exact"), ("1", "exact"), (bare(c_money(C_W[1])), "about")],
    [("10", "exact"), (bare(c_money(C_W[10])), "about")],
    [("20", "exact"), (bare(c_money(C_W[20])), "about")],
    [("30", "exact"), (bare(c_money(C_W[30])), "about")],
    [("40", "exact"), (bare(c_money(C_W[40])), "about")],
    [("50", "exact"), (bare(c_money(C_W[50])), "about")],
    [(str(C_MILLION_YEAR), "exact"), (money(C_GOAL), "over")],
    [(str(C_MILLION_YEAR), "exact")],
]
beats[idc] = [("1", 0, "Year 1"), ("10", 1, "Year 10"), ("20", 2, "Year 20"), ("30", 3, "Year 30"),
              ("40", 4, "Year 40"), ("50", 5, "Year 50"), ("53", 6, "Year 53")]
extra_t[idc] = []

# numeric (non-string) values that must match the maths
numeric_expect = {
    idb: {"lookOpts.guess.value": B_GUESS},
    idc: {"lookOpts.goal.value": C_GOAL},
}

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
    record(sid, "columns", d["columns"], "Year / You put in / Worth", d["columns"] == ["Year", "You put in", "Worth"])
    record(sid, "rows × 3 strings", len(d["rows"]), "3 per row",
           all(len(r) == 3 and all(isinstance(c, str) for c in r) for r in d["rows"]))
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
        if re.fullmatch(r"vo\[\d+\]\.(t|d)|verdict\.t|data\.rowT\[\d+\]|lookOpts\..*\.(t|row)|data\.highlightLast", p):
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
    for item in spec.get("lookOpts", {}).get("marks", []):
        record(sid, f"mark row {item['row']} lands with its row", item["t"], ts[item["row"]], abs(item["t"] - ts[item["row"]]) < 1e-9)
    for cue in spec.get("sfx", []):
        ok = any(abs(cue["t"] - a) < 1e-9 for a in anchors + [t for _, t, _, _ in extra_t[sid]])
        record(sid, f"sfx {cue['kind']} on a beat", cue["t"], "row/VO/beat t", ok)

# ---- worded claims (VO, verdicts, formula bar) against the computed values
def claim(sid, what, shown, want, ok):
    record(sid, "claim: " + what, shown, want, ok)

claim(ida, "Rule of 72 at 8% = 9", A_R72, 9, A_R72 == 9)
claim(ida, "year 9 'not even close' (< 1.5×)", round(A_RATIO[9], 4), "< 1.5", A_RATIO[9] < 1.5)
claim(ida, "year 15 'still short' (< 2×)", round(A_RATIO[15], 4), "< 2", A_RATIO[15] < 2)
claim(ida, "year 16 'more than double' (> 2×)", round(A_RATIO[16], 4), "> 2", A_RATIO[16] > 2)
claim(ida, "first doubling year = 16", A_CROSS, 16, A_CROSS == 16)
claim(ida, "'still year 16' for $50 / $500 / $1,000", [a_cross(m) for m in (50, 500, 1000)], [16] * 3,
      all(a_cross(m) == A_CROSS for m in (50, 500, 1000)))
claim(ida, "year 30 'over 4 times'", round(A_RATIO[30], 4), "4 < x < 5", 4 < A_RATIO[30] < 5)
claim(ida, "1st $100 at year 16 (191 months)", money(A_FIRST_DEPOSIT), "≈ $356", money(A_FIRST_DEPOSIT) == "≈ $356")
claim(ida, "lump sum at 8% doubles in ≈ 8.7 yrs (write-up)", num(A_LUMP_DOUBLE, 1), "≈ 8.7", num(A_LUMP_DOUBLE, 1) == "≈ 8.7")

claim(idb, "year 1 = $1,000 + $70", money(B_V[1]), "$1,070", money(B_V[1]) == "$1,070")
claim(idb, "simple guess = $1,000 + 30 × $70", money(B_GUESS), "$3,100", money(B_GUESS) == "$3,100")
claim(idb, "year 2 adds $74.90", money(B_Y2_ADD, 0.01), "$74.90", money(B_Y2_ADD, 0.01) == "$74.90")
claim(idb, "year 10 'almost doubled' (1.9-2×)", round(B_V[10] / B_P, 4), "1.9 ≤ x < 2", 1.9 <= B_V[10] / B_P < 2)
claim(idb, "doubles in year 11 (write-up)", B_DOUBLE_YEAR, 11, B_DOUBLE_YEAR == 11)
claim(idb, "year 20 'already past the guess'", money(B_V[20]), "> $3,100 (first year past: 17)",
      B_V[20] > B_GUESS and B_FIRST_PAST_GUESS == 17)
claim(idb, "≈ 2.5× the guess", num(B_TIMES_GUESS, 1), "≈ 2.5", num(B_TIMES_GUESS, 1) == "≈ 2.5")
claim(idb, "Rule of 72: 72 ÷ 7 ≈ 10.3 (write-up)", num(72 / 7, 1), "≈ 10.3", num(72 / 7, 1) == "≈ 10.3")

claim(idc, "$5 × 365 ÷ 12", money(C_M), "≈ $152", money(C_M) == "≈ $152")
claim(idc, "year 40 'not even halfway' (< $500,000)", c_money(C_W[40]), "< $500,000", C_W[40] < C_GOAL / 2)
claim(idc, "first year-end ≥ $1,000,000 = 53", C_MILLION_YEAR, 53,
      C_MILLION_YEAR == 53 and fv_monthly(C_M, C_RATE, 12 * 52) < C_GOAL)
claim(idc, "'over $1,000,000' at year 53", c_money(C_W[53]), "> $1,000,000", C_W[53] > C_GOAL)
claim(idc, "put in 'under a tenth'", num(C_SHARE * 100, 1) + "%", "< 10%", C_SHARE < 0.1)

# ---- numbers quoted in the write-up's captions and pinned comments
claim(ida, "pinned: doubling year at 7%", a_cross(100, 0.07), 19, a_cross(100, 0.07) == 19)
claim(ida, "pinned: doubling year at 10%", a_cross(100, 0.10), 13, a_cross(100, 0.10) == 13)
claim(idb, "caption: year 30 adds ≈ $498", money(B_V[30] - B_V[29]), "≈ $498", money(B_V[30] - B_V[29]) == "≈ $498")
claim(idb, "pinned: year 40 compound", money(B_V[40]), "≈ $14,974", money(B_V[40]) == "≈ $14,974")
claim(idb, "pinned: year 40 simple", money(B_SIMPLE(40)), "$3,800", money(B_SIMPLE(40)) == "$3,800")
claim(idc, "pinned: $1M year at 10%", C_MILLION_YEAR_10, 41, C_MILLION_YEAR_10 == 41)
claim(idc, "pinned: at 10%, year 40 still short", c_money(fv_monthly(C_M, 0.10, 480)), "< $1,000,000",
      fv_monthly(C_M, 0.10, 480) < C_GOAL)
claim(idc, "caption: put in at year 53", money(C_IN[53]), "$96,725", money(C_IN[53]) == "$96,725")
claim(idc, "caption: growth at year 53", c_money(C_W[53] - C_IN[53]), "≈ $930,900", c_money(C_W[53] - C_IN[53]) == "≈ $930,900")
claim(ida, "caption: S&P ≈ 10% nominal (both sources)", SP_NOMINAL, "round to 10", all(round(x) == 10 for x in SP_NOMINAL))
claim(ida, "caption: S&P ≈ 7% real (both sources)", SP_REAL, "round to 7", all(round(x) == 7 for x in SP_REAL))

for sid in (ida, idb, idc):
    check_spec(sid)

# ============================================================== table
print("Growth ladders (computed):")
print(f"  09a $100/mo at 8%:  " + "  ".join(f"Y{y} {money(A_IN[y])}→{money(A_W[y])} ({A_RATIO[y]:.3f}×)" for y in A_YEARS))
print(f"  09b $1,000 × 1.07:  " + "  ".join(f"Y{y} {money(B_V[y])}" for y in B_YEARS) + f"  (simple guess {money(B_GUESS)})")
print(f"  09c $5/day at 7%:   " + "  ".join(f"Y{y} {money(C_IN[y])}→{c_money(C_W[y])}" for y in C_YEARS))
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
