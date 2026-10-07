#!/usr/bin/env python3
"""Maths + spec check for format 3, "what-difference" (teasers 03a, 03b, 03c).

1. Recomputes every on-screen number from its sourced inputs (named constants below):
   - 03a: a $44,000 car loan at 7% APR over 72 months, simple interest charged daily,
     paid monthly / biweekly / weekly / weekly rounded up to $200;
   - 03b: a $5,000 card balance at 22% APR, no new charges, paid with the issuer minimum
     (Chase formula) / a flat $150 / a flat $250;
   - 03c: a $400,000 30-year mortgage at 7.3%, with $0 / $100 / $500 extra a month.
2. Loads the three spec JSONs and asserts that
   - every display string the maths produces (option details, payoff, interest, deltas,
     verdict) equals the spec exactly,
   - every number inside every other string (header, footer, stake, names, lookOpts,
     VO lines) equals the computed, formatted value, in order,
   - rounded results carry "≈" on screen and "about" in the VO; exact ones carry neither,
   - every string in the spec that contains a digit is covered by a check,
   - shown deltas equal the difference of the shown totals (no rounding drift),
   - the contract shape of FORMATS.md section 3 (stake, metrics, 2-4 options, winner, hold),
   - hook rules that can be tested mechanically: a number in the header at t = 0 (R1),
     exactly one dollar figure in the header (R2), header <= 15 words (R8), the baseline
     option's results already on screen at frame 1 (R1/R10),
   - timing: VO read at ~2.6 spoken words per second, lines don't overlap, each later option
     lands within 0.9 s of the word that names it (its landing = option.resultT when the kit
     reads one, else option.t), every lookOpts step (lever, footerSteps, checkT) sits on a beat,
     no spec-level sfx (each kit cues its own landings), duration in the 20-40 s lane,
     hold = duration - last VO end, verdict.t = last VO line t.
3. Prints a table and exits 1 on any mismatch.

Revision 2 (2026-10-07, after the verifier and hook-judge reviews): specs rebuilt against the
shipped kit APIs (live-sheet lookOpts.formulas/lever, clean-sheet option.resultT, scoreboard
option.resultT + footerSteps), new hooks and VO, Experian figures dropped (not verifiable).

Run:  python3 teasers/v2/checks/03-what-difference.py
"""
import json
import math
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.path.join(ROOT, "studio", "specs")
WPS = 2.6            # VO read speed, spoken words per second
LANE = (20.0, 40.0)  # duration lane for this format (task brief)
BEAT_TOL = 0.9       # an option must land within this many seconds of the word that names it
FIRST_VALUES_BY = 3.0  # R10: the first option's values are on screen by this time

# ============================================================== sourced inputs
# Searches run 2026-10-07; publisher pages are listed in teasers/v2/03-what-difference.md.

# 03a. Edmunds Q3 2026 (Oct 2026): avg amount financed, new vehicles $44,664; avg APR 7.0%;
#      avg term "past 70 months"; 25.5% of new loans at 84 months or more. Edmunds Q2 2026
#      (AP): $44,156 at 7.0%. $44,000 = a round loan just under both quarterly averages (it is
#      NOT their rounding: $44,664 rounds to $45,000), so the screen says "New-car loan" and
#      the caption says "≈ the average". 7% = Edmunds; 72 months = the standard term just
#      above the "past 70 months" average. (Revision 2 dropped the Experian Q2 2026 figures:
#      the verifier could not confirm them and a fresh search returned different numbers.)
EDMUNDS_Q3_AMOUNT, EDMUNDS_Q3_APR = 44_664, 0.070
EDMUNDS_Q2_AMOUNT = 44_156
CAR_P, CAR_APR, CAR_N = 44_000, 0.07, 72
CAR_WHATIF_APRS = (0.06, 0.08)   # unsourced what-if rates for the sensitivity line (write-up)
CAR_ROUND_UP = 200          # the weekly payment rounded up to the next round number

# 03b. Federal Reserve G.19, Q2 2026: commercial-bank rate on credit card plans, accounts
#      assessed interest 22.15% (Q1 2026: 21.52%). Bankrate weekly average (Aug 2026): 19.56%
#      (new-card offers; used as the low sensitivity case). Minimum payment = Chase cardmember
#      agreement: the larger of $40 (or the balance if less) or 1% of the new balance plus
#      the interest billed.
FED_G19_Q2_2026 = 0.2215
BANKRATE_AUG_2026 = 0.1956
CARD_B, CARD_APR = 5_000, 0.22
MIN_PCT, MIN_FLOOR = 0.01, 40
CARD_FLATS = (150, 250)

# 03c. Freddie Mac PMMS, Oct 1 2026: 30-yr fixed 7.28% (prior week 7.03%). MBA Weekly Survey,
#      week ending Sep 25 2026: 30-yr conforming contract rate 7.30%. Both round to 7.3%.
#      Loan: $400,000, a round figure just under the NAR median existing-home price for
#      Aug 2026 ($429,100), i.e. about 7% down.
FREDDIE_OCT1_2026, MBA_SEP25_2026 = 0.0728, 0.0730
NAR_MEDIAN_AUG_2026 = 429_100
MORT_P, MORT_APR, MORT_N = 400_000, 0.073, 360
MORT_EXTRAS = (0, 100, 500)

# ============================================================== formatting

def D(x):
    return Decimal(repr(x))

def rnd(x, step):
    """Round half-up to a multiple of step (step may be 0.01 or 0.1)."""
    q = (D(x) / D(step)).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    return float(q * D(step))

def c2(x):
    """Round to the cent, half-up (statement arithmetic)."""
    return rnd(x, 0.01)

def ceil_cent(x):
    return math.ceil(round(x * 100, 6)) / 100

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
    shown = rnd(x, 10 ** -dp) if dp else rnd(x, 1)
    s = f"{shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def pct(p, dp=0):
    return f"{p * 100:.{dp}f}%"

def bare(s):
    return s.replace("≈ ", "")

def val(s):
    """Numeric value of a display string such as '≈ $8,900' or '≈ 26.7 years'."""
    return float(re.search(r"[\d,]+(?:\.\d+)?", s).group(0).replace(",", ""))

# ============================================================== models

# ---- 03a: car loan, simple interest charged daily (APR / 365 per day), interest rounded to
# the cent each period, each payment applied the day it is paid. A month = 365/12 days, so a
# monthly period charges exactly APR/12.
DAYS_MONTH = 365 / 12

def car_payment(P, apr, n):
    r = apr / 12
    return c2(P * r / (1 - (1 + r) ** -n))

def car_run(P, apr, pay, days):
    b, n, interest = float(P), 0, 0.0
    while b > 0.004:
        i = c2(b * apr * days / 365)
        p = min(pay, c2(b + i))
        b = c2(b + i - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "months": n * days / DAYS_MONTH}

CAR_PMT = car_payment(CAR_P, CAR_APR, CAR_N)
CAR_BIWK = c2(CAR_PMT / 2)
CAR_WK = c2(CAR_PMT / 4)
CAR = {
    "monthly": car_run(CAR_P, CAR_APR, CAR_PMT, DAYS_MONTH),
    "biweekly": car_run(CAR_P, CAR_APR, CAR_BIWK, 14),
    "weekly": car_run(CAR_P, CAR_APR, CAR_WK, 7),
    "rounded": car_run(CAR_P, CAR_APR, CAR_ROUND_UP, 7),
}
CAR_YEAR_MONTHLY = 13 * CAR_PMT          # 13 monthly payments
CAR_YEAR_BIWK = 26 * CAR_BIWK
CAR_YEAR_WK = 52 * CAR_WK
CAR_YEAR_ROUND = 52 * CAR_ROUND_UP
CAR_SIMPLE_INT = CAR_PMT * CAR_N - CAR_P   # formula-bar shortcut: payments - principal
CAR_SAVE = {k: CAR["monthly"]["interest"] - v["interest"] for k, v in CAR.items()}
CAR_WK_VS_BIWK = CAR["biweekly"]["interest"] - CAR["weekly"]["interest"]
CAR_ROUND_EXTRA_WK = CAR_ROUND_UP - CAR_WK
CAR_ROUND_EXTRA_YR = CAR_YEAR_ROUND - CAR_YEAR_WK
CAR_ROUND_SOONER_YRS = (CAR["monthly"]["months"] - CAR["rounded"]["months"]) / 12

def car_case(apr, P=CAR_P):                 # sensitivity (write-up)
    pm = car_payment(P, apr, CAR_N)
    out = {"monthly": car_run(P, apr, pm, DAYS_MONTH), "biweekly": car_run(P, apr, c2(pm / 2), 14),
           "weekly": car_run(P, apr, c2(pm / 4), 7), "rounded": car_run(P, apr, CAR_ROUND_UP, 7)}
    return pm, out

# ---- 03b: credit card, interest billed monthly at APR/12 (rounded to the cent), no new
# charges. Minimum (Chase cardmember agreement): the larger of $40 or 1% of the new balance
# plus the interest billed; the whole balance when it is under $40.
def card_min(nb, i):
    if nb <= MIN_FLOOR:
        return nb
    return max(MIN_FLOOR, c2(MIN_PCT * nb + i))

def card_run(B, apr, rule):
    b, n, interest, first = float(B), 0, 0.0, None
    while b > 0.004:
        i = c2(b * apr / 12)
        nb = c2(b + i)
        p = min(rule(nb, i), nb)
        first = p if first is None else first
        b = c2(nb - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "years": n / 12, "first": first}

def card_case(apr):
    return {"min": card_run(CARD_B, apr, card_min),
            150: card_run(CARD_B, apr, lambda nb, i: 150),
            250: card_run(CARD_B, apr, lambda nb, i: 250)}

CARD = card_case(CARD_APR)
CARD_FIRST_MIN = CARD["min"]["first"]
CARD_150_OVER_MIN = 150 - CARD_FIRST_MIN
CARD_SOONER = {k: CARD["min"]["years"] - CARD[k]["years"] for k in CARD_FLATS}
CARD_SAVE_150 = CARD["min"]["interest"] - CARD[150]["interest"]
CARD_FLAT_FIRST = card_run(CARD_B, CARD_APR, lambda nb, i: CARD_FIRST_MIN)   # pinned comment

# ---- 03c: mortgage, standard monthly amortisation at APR/12, interest rounded to the cent,
# scheduled payment rounded up to the cent (so 360 payments clear it), extra goes to principal.
MORT_R = MORT_APR / 12
MORT_PMT = ceil_cent(MORT_P * MORT_R / (1 - (1 + MORT_R) ** -MORT_N))

def mort_run(P, pmt, extra):
    b, n, interest, extra_in = float(P), 0, 0.0, 0.0
    while b > 0.004:
        i = c2(b * MORT_R)
        p = min(pmt + extra, c2(b + i))
        extra_in += max(0.0, p - pmt)
        b = c2(b + i - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "years": n / 12, "extra_in": extra_in}

MORT = {x: mort_run(MORT_P, MORT_PMT, x) for x in MORT_EXTRAS}
MORT_SAVE = {x: MORT[0]["interest"] - MORT[x]["interest"] for x in MORT_EXTRAS}
MORT_SOONER_YRS = {x: MORT[0]["years"] - MORT[x]["years"] for x in MORT_EXTRAS}
MORT_SOONER_MO = {x: MORT[0]["n"] - MORT[x]["n"] for x in MORT_EXTRAS}
MORT_SIMPLE_INT = MORT_PMT * MORT_N - MORT_P          # footer shortcut
MORT_PER_DOLLAR = MORT_SAVE[100] / MORT[100]["extra_in"]
MORT_FULL_EXTRAS = round(MORT[100]["extra_in"] / 100)   # months in which the full $100 extra went in

def mort_case(apr):                                    # sensitivity (write-up)
    r = apr / 12
    pmt = ceil_cent(MORT_P * r / (1 - (1 + r) ** -MORT_N))
    out = {}
    for x in MORT_EXTRAS:
        b, n, interest = float(MORT_P), 0, 0.0
        while b > 0.004:
            i = c2(b * r)
            p = min(pmt + x, c2(b + i))
            b = c2(b + i - p)
            interest += i
            n += 1
        out[x] = (n, interest)
    return pmt, out

# ============================================================== expectations
# path -> ("exact", "string")  or  ("tokens", ["tok", ...])

def T(*toks):
    return ("tokens", list(toks))

def E(s):
    return ("exact", s)

def months_disp(m):
    return f"{num(m)} months"

def years_disp(y, dp=1):
    return f"{num(y, dp)} years"

expect, vo_expect, beats, steps = {}, {}, {}, {}

# ---- 03a
ida = "03a-live-sheet-car-loan-weekly"
car_keys = ["monthly", "biweekly", "weekly", "rounded"]
ea = {
    "header": T(money(CAR_P)),
    "footer": T(),                                     # "ASSUMES daily interest, posted when paid"
    "data.stake.value": E(money(CAR_P)),
    "data.stake.terms": E(f"{pct(CAR_APR)} APR · {CAR_N} months"),
    "data.options[0].detail": E(f"{money(CAR_PMT, 0.01)} a month"),
    "data.options[1].detail": E(f"{money(CAR_BIWK, 0.01)} every 2 wks"),
    "data.options[2].detail": E(f"{money(CAR_WK, 0.01)} a week"),
    "data.options[3].detail": E(f"{money(CAR_ROUND_UP)} a week"),
    "verdict.text": T(money(CAR_ROUND_UP), num(CAR_ROUND_SOONER_YRS), money(CAR_SAVE["rounded"], 100)),
    # live-sheet: one working per option (formulas[0] belongs to the pre-filled baseline column, which the
    # kit never re-types), plus the lever line retyped into the bar at lever.t
    "lookOpts.formulas[0]": T(money(CAR_PMT, 0.01), str(CAR_N), money(CAR_P), money(CAR_SIMPLE_INT, 100)),
    "lookOpts.formulas[1]": T(money(CAR_BIWK, 0.01), "26", money(CAR_YEAR_BIWK, 0.01)),
    "lookOpts.formulas[2]": T(money(CAR_WK, 0.01), "52", money(CAR_YEAR_WK, 0.01)),
    "lookOpts.formulas[3]": T(money(CAR_WK, 0.01), money(CAR_ROUND_EXTRA_WK, 0.01), money(CAR_ROUND_UP)),
    "lookOpts.lever.text": T("13", money(CAR_PMT, 0.01), money(CAR_YEAR_MONTHLY, 0.01), "13", "12"),
}
for i, k in enumerate(car_keys):
    run = CAR[k]
    ea[f"data.options[{i}].values.payoff"] = E(months_disp(run["months"]))
    ea[f"data.options[{i}].values.interest"] = E(money(run["interest"], 100))
expect[ida] = ea
vo_expect[ida] = [
    [],                                                  # "About a year off this loan. Guess which one."
    [(str(CAR["monthly"]["n"]), False), (bare(money(CAR["monthly"]["interest"], 100)), True)],
    [(bare(num(CAR["biweekly"]["months"])), True), (bare(money(CAR_SAVE["biweekly"], 100)), True)],
    [(bare(num(CAR["weekly"]["months"])), True), (bare(money(CAR_WK_VS_BIWK)), True)],
    [("13", False), ("12", False)],
    [(money(CAR_ROUND_UP), False)],
    [(bare(num(CAR["rounded"]["months"])), True), (bare(money(CAR_SAVE["rounded"], 100)), True)],
    [(bare(money(CAR_ROUND_EXTRA_WK)), True)],
]
# (option, VO line, word): option 0 is the pre-filled baseline (on screen before any word names it)
beats[ida] = [(1, 2, "Biweekly"), (2, 3, "Weekly"), (3, 5, "round")]
# VO lines that say "about a year" (no digit, so the token checks can't see them): they rest on the
# CAR_ROUND_SOONER_YRS claim below
year_lines = {ida: [0, 7]}

# ---- 03b
idb = "03b-clean-sheet-card-minimum"
eb = {
    "header": T(money(CARD_B)),
    "footer": T(pct(CARD_APR), pct(MIN_PCT), money(MIN_FLOOR)),
    "data.stake.value": E(money(CARD_B)),
    "data.stake.terms": E(f"{pct(CARD_APR)} APR · no new charges"),
    "data.options[0].detail": E(f"starts at {money(CARD_FIRST_MIN, 0.01)}, then shrinks"),
    "data.options[1].name": E(f"A flat {money(150)}"),
    "data.options[2].name": E(f"A flat {money(250)}"),
    "data.options[0].values.payoff": E(years_disp(CARD["min"]["years"])),
    "data.options[0].values.interest": E(money(CARD["min"]["interest"], 100)),
    "verdict.text": T(money(CARD_150_OVER_MIN), num(CARD_SOONER[150])),
}
for i, k in ((1, 150), (2, 250)):
    # each flat payment's working: how far above the FIRST minimum it is (the lever, sized honestly)
    eb[f"data.options[{i}].detail"] = E(f"{money(k)} − {money(CARD_FIRST_MIN, 0.01)} = {money(k - CARD_FIRST_MIN, 0.01)} more")
    eb[f"data.options[{i}].values.payoff"] = E(years_disp(CARD[k]["years"]))
    eb[f"data.options[{i}].values.interest"] = E(money(CARD[k]["interest"], 100))
    eb[f"data.options[{i}].delta"] = E(f"{num(CARD_SOONER[k])} years sooner")
expect[idb] = eb
vo_expect[idb] = [
    [(money(CARD_B), False), (bare(num(CARD["min"]["years"])), True)],
    [(bare(money(CARD["min"]["interest"], 100)), True)],
    [(money(150), False)],
    [(bare(money(CARD_150_OVER_MIN)), True)],
    [(bare(num(CARD[150]["years"], 1)), True), (bare(money(CARD[150]["interest"], 100)), True)],
    [(money(250), False), (bare(num(CARD[250]["years"], 1)), True)],
    [],
]
beats[idb] = [(1, 2, "flat"), (2, 5, "flat")]

# ---- 03c
idc = "03c-scoreboard-mortgage-extra-100"
ec = {
    "header": T(money(100), "30"),
    "footer": T(money(MORT_P), pct(MORT_APR, 1), pct(FREDDIE_OCT1_2026, 2), "1"),
    "data.stake.value": E(money(MORT_P)),
    "data.stake.terms": E(f"{pct(MORT_APR, 1)} fixed · {MORT_N // 12} years"),
    "verdict.text": T(money(100), money(MORT_SAVE[100], 100)),
    "lookOpts.footerSteps[0].text": T(money(MORT_PMT, 0.01), str(MORT_N), money(MORT_P), money(MORT_SIMPLE_INT, 100)),
    "lookOpts.footerSteps[1].text": T(money(MORT_PMT, 0.01), money(100), money(MORT_PMT + 100, 0.01)),
    "lookOpts.footerSteps[2].text": T(money(MORT_PMT, 0.01), money(500), money(MORT_PMT + 500, 0.01)),
    "lookOpts.footerSteps[3].text": T(money(MORT_SAVE[100], 100), money(100), str(MORT_FULL_EXTRAS),
                                       money(MORT_PER_DOLLAR, 0.01)),
}
for i, x in enumerate(MORT_EXTRAS):
    run = MORT[x]
    ec[f"data.options[{i}].detail"] = E(f"{money(MORT_PMT + x, 0.01)} a month")
    ec[f"data.options[{i}].values.payoff"] = E(years_disp(run["years"]) if x else f"{num(run['years'])} years")
    ec[f"data.options[{i}].values.interest"] = E(money(run["interest"], 100))
    if x:
        ec[f"data.options[{i}].name"] = E(f"+{money(x)} a month")
        ec[f"data.options[{i}].delta"] = E(money(MORT_SAVE[x], 100) + " less")
expect[idc] = ec
vo_expect[idc] = [
    [(bare(money(MORT[0]["interest"], 100)), True)],   # "Interest alone: about $587,200."
    [],                                                 # "More than the loan." (claim below)
    [(money(100), False)],
    [(str(MORT_SOONER_MO[100]), False), (bare(money(MORT_SAVE[100], 100)), True)],
    [(money(500), False)],
    [(bare(num(MORT_SOONER_YRS[500])), True), (bare(money(MORT_SAVE[500], 100)), True)],
    [(money(100), False), (bare(money(MORT_PER_DOLLAR, 0.01)), True)],
]
beats[idc] = [(1, 2, "Add"), (2, 4, "Add")]
year_lines[idb] = []
year_lines[idc] = []

# ============================================================== text helpers

NUM_CORE = r"(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?"
TOKEN_RE = re.compile(r"(≈ )?([−-]?\$?" + NUM_CORE + r"%?)")

def strip_markup(s):
    return s.replace("**", "").replace("__", "")

def tokens(s):
    return [(m.group(1) or "") + m.group(2) for m in TOKEN_RE.finditer(strip_markup(s))]

ONES = ("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen "
        "fifteen sixteen seventeen eighteen nineteen").split()
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
    t = strip_markup(text).replace("-", " ").replace("→", " to ").replace("+", " plus ")
    out = []
    for raw in t.split():
        w = raw.strip(".,:;!?'\"()")
        m = re.fullmatch(r"(\$)?(" + NUM_CORE + r")(%)?", w)
        if not m:
            if w:
                out.append(w)
            continue
        dollar, core, per = m.groups()
        v = core.replace(",", "")
        if "." in v:
            ip, fp = v.split(".")
            if dollar:
                out += words_int(int(ip)) + ["dollars"] + words_int(int(fp)) + ["cents"]
                continue
            out += words_int(int(ip)) + ["point"] + [ONES[int(c)] for c in fp]
        else:
            out += words_int(int(v))
        if dollar:
            out.append("dollars")
        if per:
            out.append("percent")
    return out

def word_time(line, kw):
    """When the VO reaches keyword kw inside a line (t + words before it / WPS-scaled d)."""
    sp = [w.lower() for w in spoken(line["text"])]
    kws = [w.lower() for w in spoken(kw)]
    idx = next(k for k in range(len(sp)) if sp[k:k + len(kws)] == kws)
    return line["t"] + line["d"] * idx / len(sp)

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
    with open(os.path.join(SPECS, sid + ".json"), encoding="utf-8") as f:
        spec = json.load(f)
    # --- common fields and contract shape (FORMATS.md, common + section 3)
    record(sid, "id = file stem", spec.get("id"), sid, spec.get("id") == sid)
    record(sid, "format", spec.get("format"), "what-difference", spec.get("format") == "what-difference")
    look = spec.get("look", "?")
    record(sid, "look in id", look, sid[4:], look in ("clean-sheet", "live-sheet", "scoreboard", "becker-rig")
           and sid.startswith(sid[:4] + look + "-"))
    record(sid, "fps", spec.get("fps"), 30, spec.get("fps") == 30)
    record(sid, "captions", spec.get("captions"), True, spec.get("captions") is True)
    dur = spec["duration"]
    record(sid, "duration lane", dur, f"{LANE[0]}-{LANE[1]} s", LANE[0] <= dur <= LANE[1])
    hdr = strip_markup(spec["header"]).replace("\n", " ")
    record(sid, "R1 header has a number at t=0", spec["header"].replace("\n", " / "), "a digit", bool(re.search(r"\d", hdr)))
    dollars = re.findall(r"\$" + NUM_CORE, hdr)
    record(sid, "R2 one dollar figure in header", dollars, "exactly 1", len(dollars) == 1)
    words = len(hdr.split())
    record(sid, "R8 header ≤ 15 words", words, "≤ 15", words <= 15)
    record(sid, "footer present (assumptions at t=0)", bool(spec.get("footer")), True, bool(spec.get("footer")))
    d = spec["data"]
    for k in ("label", "value", "terms"):
        record(sid, f"stake.{k}", d["stake"].get(k), "string", isinstance(d["stake"].get(k), str))
    keys = [m["key"] for m in d["metrics"]]
    record(sid, "metrics", keys, ["payoff", "interest"], keys == ["payoff", "interest"])
    opts = d["options"]
    record(sid, "options 2-4", len(opts), "2-4", 2 <= len(opts) <= 4)
    for i, o in enumerate(opts):
        record(sid, f"options[{i}] values = metrics", sorted(o["values"]), sorted(keys), sorted(o["values"]) == sorted(keys))
        record(sid, f"options[{i}] tone", o.get("tone"), "good/bad/goal/neutral", o.get("tone") in ("good", "bad", "goal", "neutral"))
    record(sid, "winner index", d["winner"], f"0-{len(opts) - 1}", 0 <= d["winner"] < len(opts))
    ts = [o["t"] for o in opts]
    record(sid, "options t ascending", ts, "ascending", all(a < b for a, b in zip(ts, ts[1:])) and ts[-1] < dur)
    # when each option's results are on screen. live-sheet: option.t IS the landing (t <= 0 = pre-filled).
    # clean-sheet / scoreboard: option.resultT pins the landing (clean-sheet: t is when the working starts
    # typing; scoreboard: t is the hard cut that names the option).
    land = [o.get("resultT", o["t"]) if look in ("clean-sheet", "scoreboard") else o["t"] for o in opts]
    if look in ("clean-sheet", "scoreboard"):
        record(sid, "every option pins its landing (resultT)", ["resultT" in o for o in opts], "all",
               look == "scoreboard" and "resultT" in opts[0] or all("resultT" in o for o in opts))
    record(sid, "R10 first values on screen", land[0], f"≤ {FIRST_VALUES_BY}", land[0] <= FIRST_VALUES_BY)
    # frame 1 = the baseline already worked out (R1 full answer, R10 shock first). clean-sheet: both metrics
    # (0.5 s apart) and the 0.38 s highlighter must have settled before t = 0
    settle = land[0] + (0.5 * (len(keys) - 1) + 0.38 if look == "clean-sheet" else 0)
    record(sid, "R1 baseline results on screen at frame 1", round(settle, 2), "≤ 0", settle <= 0)
    record(sid, "no spec-level sfx (each kit cues its own landings)", len(spec.get("sfx", [])), 0, not spec.get("sfx"))

    # --- display strings and numeric tokens
    covered = set()
    for p, (kind, want) in expect[sid].items():
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
    # deltas = difference of the shown totals (money deltas) - no rounding drift on screen
    base = opts[0]["values"]
    for i, o in enumerate(opts[1:], 1):
        if "delta" not in o:
            continue
        if "$" in o["delta"]:
            diff = val(base["interest"]) - val(o["values"]["interest"])
        else:
            diff = round(val(base["payoff"]) - val(o["values"]["payoff"]))
        record(sid, f"options[{i}] delta = shown difference", o["delta"], diff, abs(val(o["delta"]) - diff) < 1e-6)

    # --- VO numbers and "about"
    vx = vo_expect[sid]
    record(sid, "vo line count", len(spec["vo"]), len(vx), len(spec["vo"]) == len(vx))
    for i, (line, want) in enumerate(zip(spec["vo"], vx)):
        covered.add(f"vo[{i}].text")
        got = tokens(line["text"])
        wt = [w for w, _ in want]
        record(sid, f"vo[{i}] numbers", " | ".join(got), " | ".join(wt), got == wt)
        for tok, rounded in want:
            m = re.search(r"(\S+)\s+" + re.escape(tok) + r"(?!\d|[.,]\d)", line["text"])
            prev = m.group(1).lower() if m else ""
            record(sid, f"vo[{i}] '{tok}' rounded→'about'", prev or "(start)", "about" if rounded else "not about",
                   (prev == "about") == rounded)
    # every digit-bearing string is covered
    for p, s in string_leaves(spec):
        if p in ("id", "look", "format") or p.startswith("sfx") or not re.search(r"\d", s):
            continue
        record(sid, f"covered: {p}", s.replace("\n", " / "), "checked", p in covered)

    # --- timing
    vo = spec["vo"]
    for i, line in enumerate(vo):
        n = len(spoken(line["text"]))
        need = n / WPS
        record(sid, f"vo[{i}] d vs {n} words", line["d"], f"{need:.2f}-{need + 0.6:.2f}", need - 0.05 <= line["d"] <= need + 0.6)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(sid, f"vo[{i}] ends before vo[{i + 1}]", end, f"≤ {vo[i + 1]['t']}", end <= vo[i + 1]["t"])
    end = vo[-1]["t"] + vo[-1]["d"]
    record(sid, "last VO ends ≥ 1 s before end", round(end, 2), f"≤ {dur - 1.0}", end <= dur - 1.0)
    record(sid, "hold = duration − last VO end", d["hold"], round(dur - end, 2), abs(d["hold"] - (dur - end)) < 0.051)
    record(sid, "verdict.t = last VO line t", spec["verdict"]["t"], vo[-1]["t"], spec["verdict"]["t"] == vo[-1]["t"])
    for oi, li, kw in beats[sid]:
        est = word_time(vo[li], kw)
        # clean-sheet: the results land at resultT; live-sheet: t is the landing; scoreboard: t is the cut
        at = land[oi] if look == "clean-sheet" else opts[oi]["t"]
        record(sid, f"option {oi} '{opts[oi]['name']}' vs VO word '{kw}'", at, f"{est:.2f} ± {BEAT_TOL}",
               abs(at - est) <= BEAT_TOL)
        if look == "clean-sheet":
            record(sid, f"option {oi} working types first (t < resultT)", (opts[oi]["t"], land[oi]), "t + 0.15 ≤ resultT",
                   opts[oi]["t"] + 0.15 <= land[oi])
    for li in year_lines[sid]:
        record(sid, f"vo[{li}] says 'about a year'", vo[li]["text"], "contains 'about a year'", "about a year" in vo[li]["text"].lower())
    anchors = ts + [spec["verdict"]["t"]] + [line["t"] for line in vo]
    lo = spec.get("lookOpts", {})
    for key in ("formulaBar", "footerSteps"):
        for k, stp in enumerate(lo.get(key, [])):
            record(sid, f"lookOpts.{key}[{k}] on a beat", stp["t"], "an option/VO/verdict t",
                   any(abs(stp["t"] - a) < 1e-9 for a in anchors))
            record(sid, f"lookOpts.{key}[{k}] after t = 0 (spec.footer visible at frame 1)", stp["t"], "> 0", stp["t"] > 0)
            record(sid, f"lookOpts.{key}[{k}] ≤ 45 chars (kit footer limit)", len(stp["text"]), "≤ 45", len(stp["text"]) <= 45)
    if isinstance(lo.get("lever"), dict):
        record(sid, "lookOpts.lever on a beat", lo["lever"]["t"], "an option/VO/verdict t",
               any(abs(lo["lever"]["t"] - a) < 1e-9 for a in anchors))
    if "checkT" in lo:
        record(sid, "lookOpts.checkT on a beat", lo["checkT"], "an option/VO/verdict t",
               any(abs(lo["checkT"] - a) < 1e-9 for a in anchors))
    if look == "live-sheet" and "formulas" in lo:
        record(sid, "lookOpts.formulas: one per option", len(lo["formulas"]), len(opts), len(lo["formulas"]) == len(opts))
    for cue in spec.get("sfx", []):
        record(sid, f"sfx {cue['kind']} on a beat", cue["t"], "an option/VO/verdict t", any(abs(cue["t"] - a) < 1e-9 for a in anchors))
    return spec

def claim(sid, what, shown, want, ok):
    record(sid, "claim: " + what, shown, want, ok)

# ---- maths statements made in VO, verdicts, captions, pinned comments and the write-up
claim(ida, "monthly schedule clears in 72 payments", CAR["monthly"]["n"], CAR_N, CAR["monthly"]["n"] == CAR_N)
claim(ida, "biweekly year = weekly year = 13 monthly payments",
      (money(CAR_YEAR_BIWK, 0.01), money(CAR_YEAR_WK, 0.01), money(CAR_YEAR_MONTHLY, 0.01)), "all equal",
      abs(CAR_YEAR_BIWK - CAR_YEAR_MONTHLY) < 0.005 and abs(CAR_YEAR_WK - CAR_YEAR_MONTHLY) < 0.005)
claim(ida, "weekly beats biweekly by < $50", money(CAR_WK_VS_BIWK, 0.01), "< $50", 0 < CAR_WK_VS_BIWK < 50)
claim(ida, "rounding up ≈ 1 year sooner", num(CAR_ROUND_SOONER_YRS, 2), "≈ 1", num(CAR_ROUND_SOONER_YRS) == "≈ 1")
claim(ida, "rounding = ≈ $54 more a month", money(CAR_ROUND_EXTRA_YR / 12), "≈ $54", money(CAR_ROUND_EXTRA_YR / 12) == "≈ $54")
claim(ida, "$44,000: a round loan just under both Edmunds 2026 averages, within 1.5%", CAR_P,
      f"≤ {EDMUNDS_Q2_AMOUNT:,} and ≤ {EDMUNDS_Q3_AMOUNT:,}, ≥ 98.5% of {EDMUNDS_Q3_AMOUNT:,}",
      CAR_P <= min(EDMUNDS_Q2_AMOUNT, EDMUNDS_Q3_AMOUNT) and CAR_P >= 0.985 * EDMUNDS_Q3_AMOUNT)
claim(ida, "screen never calls $44,000 'the average' (it is not its rounding)", money(EDMUNDS_Q3_AMOUNT, 1000),
      f"≠ {money(CAR_P)}", money(EDMUNDS_Q3_AMOUNT, 1000).replace("≈ ", "") != money(CAR_P))
claim(ida, "APR = Edmunds Q3 2026 average", pct(CAR_APR), pct(EDMUNDS_Q3_APR), CAR_APR == EDMUNDS_Q3_APR)
car_whatif = {apr: car_case(apr) for apr in CAR_WHATIF_APRS}
car_exact = car_case(CAR_APR, EDMUNDS_Q3_AMOUNT)
for lab, (pm_, s_) in [(pct(a, 0), v) for a, v in car_whatif.items()] + [("$44,664", car_exact)]:
    gap = (s_["monthly"]["months"] - s_["rounded"]["months"]) / 12
    wk = s_["biweekly"]["interest"] - s_["weekly"]["interest"]
    claim(ida, f"verdict holds at {lab}: rounding ≈ 1 yr sooner, weekly beats biweekly by < $50",
          (num(gap, 2), money(wk, 0.01)), "≈ 1 (0.75-1.25) / < $50", 0.75 <= gap <= 1.25 and 0 < wk < 50)
claim(idb, "minimum interest is more than the $5,000 owed", money(CARD["min"]["interest"], 100), "> $5,000",
      CARD["min"]["interest"] > CARD_B)
claim(idb, "first minimum = 1% of new balance + interest", money(CARD_FIRST_MIN, 0.01),
      money(c2(MIN_PCT * c2(CARD_B * (1 + CARD_APR / 12)) + c2(CARD_B * CARD_APR / 12)), 0.01),
      abs(CARD_FIRST_MIN - c2(MIN_PCT * c2(CARD_B * (1 + CARD_APR / 12)) + c2(CARD_B * CARD_APR / 12))) < 0.005)
claim(idb, "VO: about $4,500 less interest with a flat $150", money(CARD_SAVE_150, 100), "≈ $4,500",
      money(CARD_SAVE_150, 100) == "≈ $4,500")
claim(idb, "$4,500 = shown $7,300 − shown $2,800", rnd(CARD["min"]["interest"], 100) - rnd(CARD[150]["interest"], 100),
      rnd(CARD_SAVE_150, 100), rnd(CARD["min"]["interest"], 100) - rnd(CARD[150]["interest"], 100) == rnd(CARD_SAVE_150, 100))
claim(idb, "pinned: hold the first minimum flat", f"{CARD_FLAT_FIRST['n']} months, {money(CARD_FLAT_FIRST['interest'], 100)}",
      "≈ 57 months, ≈ $3,100", CARD_FLAT_FIRST["n"] == 57 and money(CARD_FLAT_FIRST["interest"], 100) == "≈ $3,100")
lo_card = card_case(BANKRATE_AUG_2026)
hi_card = card_case(FED_G19_Q2_2026)
claim(idb, "verdict holds at 19.56% and 22.15%: flat $150 ≥ 10 yrs sooner",
      (num(lo_card["min"]["years"] - lo_card[150]["years"], 1), num(hi_card["min"]["years"] - hi_card[150]["years"], 1)),
      "≥ 10", min(lo_card["min"]["years"] - lo_card[150]["years"], hi_card["min"]["years"] - hi_card[150]["years"]) >= 10)
claim(idc, "baseline clears in 360 payments", MORT[0]["n"], MORT_N, MORT[0]["n"] == MORT_N)
claim(idc, "VO: interest is more than the loan", money(MORT[0]["interest"], 100), f"> {money(MORT_P)}",
      MORT[0]["interest"] > MORT_P)
claim(idc, "+$100: 40 months sooner", MORT_SOONER_MO[100], 40, MORT_SOONER_MO[100] == 40)
claim(idc, "+$100: full extra in every month but the last", money(MORT[100]["extra_in"], 0.01),
      f"$100 × {MORT[100]['n'] - 1}", abs(MORT[100]["extra_in"] - 100 * (MORT[100]["n"] - 1)) < 0.005)
claim(idc, "footer step: shown ≈ $78,600 ÷ ($100 × 319) rounds like the exact ratio",
      (money(rnd(MORT_SAVE[100], 100) / (100 * MORT_FULL_EXTRAS), 0.01), money(MORT_PER_DOLLAR, 0.01)), "same ≈ $2.46",
      money(rnd(MORT_SAVE[100], 100) / (100 * MORT_FULL_EXTRAS), 0.01) == money(MORT_PER_DOLLAR, 0.01))
claim(idc, "+$100 for 319 full months = $31,900 put in", money(MORT[100]["extra_in"], 0.01), money(100 * MORT_FULL_EXTRAS),
      abs(MORT[100]["extra_in"] - 100 * MORT_FULL_EXTRAS) < 0.005)
claim(idc, "rate between Freddie Mac and MBA (both round to 7.3%)", pct(MORT_APR, 1),
      f"{pct(FREDDIE_OCT1_2026, 2)} / {pct(MBA_SEP25_2026, 2)}",
      pct(FREDDIE_OCT1_2026, 1) == pct(MBA_SEP25_2026, 1) == pct(MORT_APR, 1))
claim(idc, "loan < NAR median price (≈ 7% down)", pct(1 - MORT_P / NAR_MEDIAN_AUG_2026, 1), "≈ 6.8%",
      MORT_P < NAR_MEDIAN_AUG_2026)
m728 = mort_case(FREDDIE_OCT1_2026)
claim(idc, "verdict holds at 7.28%: +$100 saves > $75,000", money(m728[1][0][1] - m728[1][100][1], 100), "> $75,000",
      m728[1][0][1] - m728[1][100][1] > 75_000)

specs = [check_spec(s) for s in (ida, idb, idc)]

# ---- winner = the option the verdict names (03a rounding, 03b flat $150, 03c +$100)
for sid, spec, kw in ((ida, specs[0], money(CAR_ROUND_UP)), (idb, specs[1], "≈ $7"), (idc, specs[2], money(100))):
    w = spec["data"]["options"][spec["data"]["winner"]]
    named = kw in strip_markup(spec["verdict"]["text"]) and (kw in (w["name"] + " " + w["detail"]) or sid == idb)
    if sid == idb:
        named = named and w["name"] == f"A flat {money(150)}"
    record(sid, "winner = option the verdict names", w["name"], kw, named)

# ============================================================== report
print("Model results")
print(f"  03a car: payment {money(CAR_PMT, 0.01)} / {money(CAR_BIWK, 0.01)} / {money(CAR_WK, 0.01)} / {money(CAR_ROUND_UP)}")
for k in car_keys:
    r_ = CAR[k]
    print(f"     {k:9} n={r_['n']:4d}  months={r_['months']:6.2f}  interest={money(r_['interest'], 0.01):>11}  saves {money(CAR_SAVE[k], 0.01)}")
for lab, (pm_, s_) in [(f"{pct(a)} (what-if)", v) for a, v in car_whatif.items()] + [("$44,664 at 7% (Edmunds exact)", car_exact)]:
    print(f"     sensitivity {lab}: payment {money(pm_, 0.01)}; " +
          "; ".join(f"{k} {s_[k]['months']:.2f} mo {money(s_[k]['interest'], 100)}" for k in car_keys) +
          f"; weekly beats biweekly by {money(s_['biweekly']['interest'] - s_['weekly']['interest'], 0.01)}")
print(f"  03b card: first minimum {money(CARD_FIRST_MIN, 0.01)}")
for k in ("min",) + CARD_FLATS:
    r_ = CARD[k]
    print(f"     {str(k):4} n={r_['n']:4d}  years={r_['years']:5.2f}  interest={money(r_['interest'], 0.01):>11}")
for lab, cs in (("19.56% (Bankrate)", lo_card), ("22.15% (Fed G.19)", hi_card)):
    print(f"     sensitivity {lab}: " + "; ".join(f"{k} {cs[k]['years']:.1f} yrs {money(cs[k]['interest'], 100)}" for k in ("min",) + CARD_FLATS)
          + f"; first min {money(cs['min']['first'], 0.01)}")
print(f"  03c mortgage: payment {money(MORT_PMT, 0.01)}")
for x in MORT_EXTRAS:
    r_ = MORT[x]
    print(f"     +${x:<4} n={r_['n']:4d}  years={r_['years']:6.2f}  interest={money(r_['interest'], 0.01):>13}  saves {money(MORT_SAVE[x], 0.01)}  extra in {money(r_['extra_in'], 0.01)}")
print(f"     sensitivity 7.28% (Freddie Mac): payment {money(m728[0], 0.01)}; " +
      "; ".join(f"+${x} {m728[1][x][0]} mo {money(m728[1][x][1], 100)}" for x in MORT_EXTRAS))

w = [max(len(str(r_[i])) for r_ in rows_out) for i in range(5)]
w = [min(x, m) for x, m in zip(w, (33, 48, 46, 46, 4))]
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
