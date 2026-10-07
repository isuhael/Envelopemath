#!/usr/bin/env python3
"""
Format 8 "unit-ladder" (P8, "Cost in units of X"): maths and spec check for teasers 08a, 08b and 08c.

1. Recomputes every on-screen number from its inputs. The sourced real-world inputs are named constants
   below (publisher, date and URL for each are in teasers/v2/08-unit-ladder.md); everything else is
   arithmetic on them, done in exact fractions.
2. Builds every display string the specs should carry (header, footer, unit, rung item / cost / units /
   unitsDisplay, VO caption lines, verdict, lookOpts text) from those numbers.
3. Loads the three spec JSONs from studio/specs/ and asserts:
   - every display string equals the computed, formatted string exactly;
   - every number token in every display string and VO line is a computed value or a labelled constant;
   - "≈" sits on every rounded result and on no exact one;
   - timing: header + a number on screen at t = 0; every VO line fits 2.6 words/s (d >= words / 2.6) and
     ends before the next starts; every rung's t equals the start of the VO line that names it, and that
     line names it in its first words; the verdict lands with its VO line; duration is inside the 20-40 s
     lane and covers the last VO line (+0.4 s) and the verdict (+2.5 s); hold = duration - last landing;
   - Scoreboard only (its kit is built): the counter lands before (or within 0.5 s of) the VO saying the
     number, using the kit's own roll rules (looks/scoreboard/formats/unit-ladder.js);
   - contract shape (studio/FORMATS.md, section 8): 4-7 rungs, cheap -> huge, units numeric, known icon,
     captions on, fps 30, id = file stem.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/08-unit-ladder.py
"""
import json
import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve()
REPO = HERE.parents[3]
SPEC_DIR = REPO / "studio" / "specs"
WPS = 2.6                    # voice-over reading speed, words per second
LANE = (20.0, 40.0)          # duration lane for this format (benchmark: HD Guy 26-40 s)
ICONS = {"cup", "hotdog", "burger", "pizza", "phone", "car", "house", "coin", "bill", "gas",
         "ticket", "bag", "egg", "hour"}

# ======================================================================================
# Sourced real-world inputs (USD). Sources: teasers/v2/08-unit-ladder.md, "Sources".
# ======================================================================================
HOT_DOG_COMBO = F("1.50")        # Costco hot dog + soda; unchanged since 1985 (13 ABC 2026-04-29; NPR/HPPR 2024-06-04)
HOT_DOG_SINCE = 1985             # the year the $1.50 price was set (same sources)
COSTCO_MEMBERSHIP = 65           # Gold Star, from 2024-09-01 (Axios 2024-08-31; Disney Food Blog 2024-07-11)
IPHONE_18_PRO = 1199             # US starting price, announced 2026-09-09 (MacRumors 2026-09-09; Appleosophy 2026-09-12)
KBB_ATP = 50089                  # KBB average new-vehicle transaction price, Aug 2026 (Cox Automotive, 2026-09-10)
NEW_HOUSE_2026 = 393700          # Census/HUD median sales price of new houses sold, Aug 2026 (released 2026-09-24)
NEW_HOUSE_1985 = 84300           # Census median sales price of new houses sold, 1985 annual (FRED MSPNHSUSA; HUD USHMC)
HOUSE_YEAR_THEN, HOUSE_YEAR_NOW = 1985, 2026
RENT = 1531                      # Census HVS median asking rent, Q2 2026 (released 2026-07-28)
# 2026 federal tax, single filer (IRS Rev. Proc. 2025-32, 2025-10-09; SSA 2026 fact sheet), as used in 01
STD_DEDUCTION = 16100
BRACKET_10_TOP, BRACKET_12_TOP = 12400, 50400
RATE_10, RATE_12 = F(10, 100), F(12, 100)
FICA = F(765, 10000)             # 6.2% Social Security + 1.45% Medicare (employee)
SS_WAGE_BASE = 184500
BIG_MAC = F("6.22")              # US Big Mac price, The Economist Big Mac index, 2026-07-01 row
# College Board, Trends in College Pricing and Student Aid 2025 (Oct 2025), 2025-26 averages
CB_PUBLIC_2YR = 4150             # public two-year, in-district tuition & fees
CB_PUBLIC_4YR_IN = 11950         # public four-year, in-state tuition & fees
CB_PUBLIC_4YR_OUT = 31880        # public four-year, out-of-state tuition & fees
CB_PRIVATE_4YR = 45000           # private nonprofit four-year tuition & fees
CB_PUBLIC_4YR_IN_BUDGET = 30990  # public four-year in-state, total average budget (pinned comment only)
CB_PRIVATE_BUDGET = 65470        # private nonprofit four-year, total average budget (tuition, fees, housing, food, books, travel, other)

# Conventions (printed in footers / VO)
WAGE = 15                        # 08b: the viewer's wage, $/hr
HOURS_PER_WEEK, WEEKS_PER_YEAR = 40, 52
HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR          # 2,080
MONTHS = 12
DAYS_PER_YEAR = 365
DEGREE_YEARS = 4
BIG_UNIT_FROM, BIG_UNIT_PER = 10000, 1000   # 08a lookOpts.bigUnit (a kit request): 1 block = 1,000 hot dogs

# ======================================================================================
# Formatting helpers
# ======================================================================================
def rhu(x, step=1):
    """Round half up (x: Fraction or int) to a multiple of step; returns int (or Fraction if step < 1)."""
    x, step = F(x), F(step)
    v = math.floor(x / step + F(1, 2)) * step
    return int(v) if v.denominator == 1 else v

def usd(x, dp=0):
    x = F(x)
    if dp == 0:
        return f"${rhu(x):,}"
    q = rhu(x, F(1, 10 ** dp))
    return f"${float(q):,.{dp}f}"

def ap(rounded, exact):
    """'≈ ' when the shown value is a rounding of the exact one."""
    return "" if F(rounded) == F(exact) else "≈ "

def count(q):
    """On-screen unit count: nearest whole unit; '≈' unless the quotient is a whole number."""
    n = rhu(q)
    return ap(n, q) + f"{n:,}", n

def vo_round(q):
    """What the voice says: exact if whole; else < 1,000 to the unit, < 10,000 to the 100, else to the 1,000."""
    q = F(q)
    if q.denominator == 1:
        return f"{int(q):,}", int(q)
    step = 1 if q < 1000 else 100 if q < 10000 else 1000
    n = rhu(q, step)
    return "≈ " + f"{n:,}", n

def strip_markup(s):
    return s.replace("**", "").replace("__", "").replace("\n", " ")

NUM_RE = re.compile(r"\d[\d,]*(?:\.\d+)?")

def number_tokens(s):
    out = []
    for m in NUM_RE.finditer(strip_markup(s)):
        tok = m.group(0).rstrip(",")
        out.append(F(tok.replace(",", "")))
    return out

# ---------- spoken-word estimate (for VO timing) --------------------------------------
def int_words(n):
    """Words to read a non-negative integer aloud; hyphenated tens count as one word."""
    if n == 0:
        return 1
    words = 0
    for scale in (10**12, 10**9, 10**6, 10**3, 1):
        g = (n // scale) % 1000
        if not g:
            continue
        h, r = divmod(g, 100)
        words += 2 if h else 0          # "two hundred"
        words += 1 if r else 0          # "sixty-two"
        words += 1 if scale > 1 else 0  # "thousand"
    return words

def spoken_words(text):
    """Estimate the words the owner will say for one caption line (conservative)."""
    s = strip_markup(text).replace("≈", " about ").replace("×", " times ")
    count_ = 0

    def money(m):
        nonlocal count_
        d, c = int(m.group(1).replace(",", "")), m.group(2)
        if c is not None and int(c):
            count_ += int_words(d) + int_words(int(c)) + 1   # "a dollar fifty", "thirteen ten" (+1 safety)
        else:
            count_ += int_words(d) + 1                        # "+ dollars"
        return " "
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d\d))?", money, s)

    def year(m):
        nonlocal count_
        count_ += 2                                           # "nineteen eighty-five", "twenty twenty-six"
        return " "
    s = re.sub(r"\b(19\d\d|20\d\d)\b", year, s)

    def num(m):
        nonlocal count_
        whole, frac = m.group(1), m.group(2)
        count_ += int_words(int(whole.replace(",", "")))
        if frac:
            count_ += 1 + len(frac)                           # "point seven"
        return " "
    s = re.sub(r"(\d[\d,]*)(?:\.(\d+))?", num, s)
    count_ += len([w for w in re.split(r"[\s,.:?!;]+", s) if re.search(r"[A-Za-z]", w)])
    return count_

def words_before(text, phrase):
    plain = strip_markup(text)
    i = plain.find(phrase)
    assert i >= 0, f"{phrase!r} not in {plain!r}"
    return spoken_words(plain[:i])

# ======================================================================================
# Scoreboard kit timing (mirrors looks/scoreboard/formats/unit-ladder.js + theme.js M)
# ======================================================================================
SB = dict(rollMin=0.8, rollMax=1.9, rollFinal=2.4, regrid=0.42)

def scoreboard_landings(rungs):
    """Landing time of the hero counter on each rung (no unit intro when rung 1 starts before 0.5 s)."""
    times = [r["t"] for r in rungs]
    intro = times[0] >= 0.5
    lands = []
    for i, r in enumerate(rungs):
        prev_n = rungs[i - 1]["units"] if i else (1 if intro else 0)
        last = i == len(rungs) - 1
        roll = min(max(0.5 + 0.34 * math.log10(abs(r["units"] - prev_n) + 1), SB["rollMin"]), SB["rollMax"])
        if last:
            roll = max(roll, SB["rollFinal"])
        gap = times[i + 1] - times[i] if i + 1 < len(rungs) else math.inf
        roll = min(roll, max(0.45, gap - SB["regrid"] - 0.5))
        first = i == 0 and not intro
        t0 = (min(times[0], 0) - 0.45) if first else times[i]
        delay = 0 if first else SB["regrid"]
        lands.append(t0 + delay + roll)
    return lands

FINAL_COUNT = 2.4   # stub kits (Becker Rig, Clean Sheet): last rung lands after the final count-up (same 2.4 s)

# ======================================================================================
# Teaser builders: each returns (expected spec dict, rows for the table, allowed numbers,
# per-rung VO mapping, phrases that must open each rung's VO line, VO number phrases)
# ======================================================================================
def vo_line(t, d, text):
    return {"t": t, "d": d, "text": text}

def build_08a():
    unit = HOT_DOG_COMBO
    items = [
        ("Your Costco membership", COSTCO_MEMBERSHIP, usd(COSTCO_MEMBERSHIP), "Costco membership"),
        ("An iPhone 18 Pro", IPHONE_18_PRO, usd(IPHONE_18_PRO), "An iPhone 18 Pro"),
        ("An average new car", KBB_ATP, usd(KBB_ATP), "An average new car"),
        (f"A median new house in {HOUSE_YEAR_THEN}", NEW_HOUSE_1985, usd(NEW_HOUSE_1985), f"A new house in {HOUSE_YEAR_THEN}"),
        (f"A median new house in {HOUSE_YEAR_NOW}", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), f"a new house in {HOUSE_YEAR_NOW}"),
    ]
    rung_t = [0.0, 7.1, 10.9, 14.0, 18.2]
    rows, rungs, qs = [], [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / unit
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {usd(unit, 2)}", f"{float(q):,.4f}", disp))
    ratio = F(NEW_HOUSE_2026, NEW_HOUSE_1985)
    ratio_r = rhu(ratio, F(1, 10))
    ratio_disp = ap(ratio_r, ratio) + f"{float(ratio_r):.1f}×"
    assert ratio_disp == "≈ 4.7×"
    # in hot dogs the ratio is the same (the unit price never moved)
    assert qs[4] / qs[3] == ratio
    rows.append(("Ratio house 2026 / 1985", f"{usd(NEW_HOUSE_2026)} ÷ {usd(NEW_HOUSE_1985)}", f"{float(ratio):.4f}", ratio_disp))
    v = [vo_round(q)[0] for q in qs]
    vo = [
        vo_line(0.0, 2.8, f"Your Costco membership? **{count(qs[0])[0]} hot dogs**."),
        vo_line(3.0, 3.9, f"That hot dog: still **{usd(unit, 2)}**, since {HOT_DOG_SINCE}."),
        vo_line(7.1, 3.5, f"An iPhone 18 Pro? **{v[1]}**."),
        vo_line(10.9, 3.1, f"An average new car now? **{v[2]}**."),
        vo_line(14.0, 3.9, f"A new house in {HOUSE_YEAR_THEN}? **{v[3]}**."),
        vo_line(18.2, 4.7, f"And a new house in {HOUSE_YEAR_NOW}? **{v[4]}**."),
        vo_line(23.2, 4.3, f"Same hot dog. **{ratio_disp}** the hot dogs."),
    ]
    for q, (s, n) in zip(qs, map(vo_round, qs)):
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", s))
    duration = 30.0
    lands = scoreboard_landings(rungs)
    hold = round(duration - lands[-1], 2)
    exp = {
        "id": "08a-scoreboard-costco-hot-dogs",
        "look": "scoreboard",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": "COST IN UNITS OF\n**COSTCO HOT DOGS**",
        "footer": f"Hot dog + soda = {usd(unit, 2)}, same since {HOT_DOG_SINCE}",
        "captions": True,
        "vo": vo,
        "verdict": {"t": 23.2, "text": f"Same hot dog.\nThe house: **{ratio_disp}** the hot dogs."},
        "data": {
            "unit": {"name": "Costco hot dog", "price": usd(unit, 2), "icon": "hotdog"},
            "rungs": rungs,
            "hold": hold,
        },
        "lookOpts": {
            "climaxFill": 1,
            "bigUnit": {"from": BIG_UNIT_FROM, "per": BIG_UNIT_PER, "legend": f"1 block = {BIG_UNIT_PER:,} hot dogs"},
        },
        "sfx": [{"t": 23.2, "kind": "ding"}],
    }
    allowed = {F(x) for x in [HOT_DOG_COMBO, COSTCO_MEMBERSHIP, IPHONE_18_PRO, KBB_ATP, NEW_HOUSE_1985,
                              NEW_HOUSE_2026, HOT_DOG_SINCE, HOUSE_YEAR_THEN, HOUSE_YEAR_NOW]}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs} | {F(ratio_r)}
    labelled = {F(18): "model name 'iPhone 18 Pro'", F(1): "'1 block' (one unit)", F(BIG_UNIT_PER): "block size"}
    # with 1 block = 1,000 hot dogs the two house piles keep the ≈ 4.7× area ratio on screen
    blocks = [rhu(q / BIG_UNIT_PER) for q in qs if q >= BIG_UNIT_FROM]
    rows.append(("Blocks (car / 1985 / 2026)", f"count ÷ {BIG_UNIT_PER:,}", "", " / ".join(map(str, blocks))))
    mapping = {0: 0, 1: 2, 2: 3, 3: 4, 4: 5}           # rung index -> VO line index
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: strip_markup(vo[mapping[i]]["text"]).split("? ")[1].rstrip(".") for i in range(len(items))}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 6

def take_home_per_hour():
    gross = WAGE * HOURS_PER_YEAR
    assert gross < SS_WAGE_BASE
    taxable = max(0, gross - STD_DEDUCTION)
    assert taxable <= BRACKET_12_TOP, "08b assumes the 12% bracket is the top one reached"
    tax = RATE_10 * min(taxable, BRACKET_10_TOP) + RATE_12 * max(0, taxable - BRACKET_10_TOP)
    fica = FICA * gross
    net = gross - tax - fica
    return gross, taxable, tax, fica, net, F(net) / HOURS_PER_YEAR

def take_home_at(wage):
    gross = wage * HOURS_PER_YEAR
    taxable = max(0, gross - STD_DEDUCTION)
    assert taxable <= BRACKET_12_TOP
    tax = RATE_10 * min(taxable, BRACKET_10_TOP) + RATE_12 * max(0, taxable - BRACKET_10_TOP)
    return F(gross - tax - FICA * gross) / HOURS_PER_YEAR

PINNED = {}   # numbers quoted in pinned comments / captions (asserted against the write-up text)

def build_08b():
    gross, taxable, tax, fica, net, k = take_home_per_hour()
    for w in (20, 25):
        kw = take_home_at(w)
        PINNED[f"08b keep at ${w}/hr"] = ("≈ " + usd(kw, 2), f"{float(kw / w) * 100:.1f}%")
    PINNED["08b keep share at $15/hr"] = (f"{float(k / WAGE) * 100:.1f}%",)
    k_disp = "≈ " + usd(k, 2)                     # 13.1006 -> ≈ $13.10
    cut = WAGE - k
    cut_disp = "≈ " + usd(cut, 2)                 # 1.8994 -> ≈ $1.90
    assert k_disp == "≈ $13.10" and cut_disp == "≈ $1.90"
    rows = [
        ("Gross a year", f"{usd(WAGE)} × {HOURS_PER_YEAR:,}", f"{gross:,}", usd(gross)),
        ("Federal income tax", f"10% × {usd(BRACKET_10_TOP)} + 12% × ({usd(gross)} − {usd(STD_DEDUCTION)} − {usd(BRACKET_10_TOP)})", f"{float(tax):,.2f}", usd(tax, 2)),
        ("FICA", f"7.65% × {usd(gross)}", f"{float(fica):,.2f}", usd(fica, 2)),
        ("Kept a year", f"{usd(gross)} − tax − FICA", f"{float(net):,.2f}", usd(net, 2)),
        ("Kept per hour (unit)", f"{usd(net, 2)} ÷ {HOURS_PER_YEAR:,}", f"{float(k):.4f}", k_disp),
        ("Tax snip per hour", f"{usd(WAGE)} − {float(k):.4f}", f"{float(cut):.4f}", cut_disp),
    ]
    items = [
        ("A month of rent", RENT, usd(RENT), "A month of rent"),
        ("A year of rent", RENT * MONTHS, usd(RENT * MONTHS), "A year of rent"),
        ("An average new car", KBB_ATP, usd(KBB_ATP), "An average new car"),
        ("A median new house", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), "A median new house"),
    ]
    rung_t = [5.0, 10.4, 15.8, 20.0]
    rungs, qs = [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / k
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {float(k):.4f}", f"{float(q):,.3f}", disp))
    weeks = qs[0] / HOURS_PER_WEEK                          # 2.92
    months = qs[1] / (F(HOURS_PER_YEAR) / MONTHS)           # 8.09
    years = qs[3] / HOURS_PER_YEAR                          # 14.45
    w_r, m_r, y_r = rhu(weeks), rhu(months), rhu(years)
    rows += [
        ("Rent month in work weeks", f"{float(qs[0]):.3f} ÷ {HOURS_PER_WEEK}", f"{float(weeks):.3f}", f"{ap(w_r, weeks)}{w_r} weeks"),
        ("Rent year in work months", f"{float(qs[1]):.3f} ÷ (2,080 ÷ 12)", f"{float(months):.3f}", f"{ap(m_r, months)}{m_r} months"),
        ("House in full-time years", f"{float(qs[3]):.3f} ÷ 2,080", f"{float(years):.3f}", f"{ap(y_r, years)}{y_r} years"),
    ]
    v = [vo_round(q)[0] for q in qs]
    for q in qs:
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", vo_round(q)[0]))
    vo = [
        vo_line(0.0, 4.7, f"{usd(WAGE)} an hour? After tax, you keep **{k_disp}**."),
        vo_line(5.0, 5.1, f"A month of rent? **{v[0]} hours**. That's {ap(w_r, weeks)}{w_r} weeks."),
        vo_line(10.4, 5.1, f"A year of rent? **{v[1]} hours**: {ap(m_r, months)}{m_r} months."),
        vo_line(15.8, 3.9, f"An average new car? **{v[2]} hours**."),
        vo_line(20.0, 3.2, f"A median new house? **{v[3]} hours**."),
        vo_line(23.5, 4.7, f"That's **{ap(y_r, years)}{y_r} years** of full-time work. Every cent you keep."),
    ]
    duration = 30.0
    lands = [r["t"] + FINAL_COUNT for r in rungs]
    hold = round(duration - lands[-1], 2)
    exp = {
        "id": "08b-becker-rig-hours-at-15",
        "look": "becker-rig",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": f"Cost in hours of work\nat **{usd(WAGE)} an hour**",
        "footer": f"{k_disp} kept: 2026 federal tax + FICA, single, no state tax",
        "captions": True,
        "vo": vo,
        "verdict": {"t": 23.5, "text": f"**{ap(y_r, years)}{y_r} years** of full-time work.\nEvery cent you keep."},
        "data": {
            "unit": {"name": f"Hour of work at {usd(WAGE)} ({k_disp} kept)", "price": k_disp, "icon": "hour"},
            "rungs": rungs,
            "hold": hold,
        },
        "lookOpts": {
            "stage": "white",
            "inputProp": "block",
            "opener": {"t": 0.0, "verb": "snip", "tool": "TAX", "from": usd(WAGE), "cut": cut_disp,
                       "becomes": f"{k_disp} = 1 hour block"},
            "actions": [
                {"item": 0, "verb": "stack", "tool": f"÷ {usd(k, 2)}", "becomes": f"a stack of {rungs[0]['units']} hour blocks under a rent tag"},
                {"item": 1, "verb": "pull back", "tool": f"× {MONTHS}", "becomes": f"{MONTHS} stacks side by side"},
                {"item": 2, "verb": "fill", "tool": f"÷ {usd(k, 2)}", "becomes": "a car outline packed with hour blocks"},
                {"item": 3, "verb": "topple", "tool": f"÷ {usd(k, 2)}", "becomes": "a house-sized pile that flattens the figure"},
            ],
            "gag": {"t": 23.5, "text": f"{ap(y_r, years)}{y_r} YEARS"},
        },
        "sfx": [{"t": 3.1, "kind": "pop"}, {"t": 23.5, "kind": "thud"}],
    }
    allowed = {F(x) for x in [WAGE, RENT, RENT * MONTHS, KBB_ATP, NEW_HOUSE_2026, MONTHS, 2026]}
    allowed |= {rhu(k, F(1, 100)), rhu(cut, F(1, 100)), F(w_r), F(m_r), F(y_r)}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs}
    labelled = {F(1): "'1 hour block' (one unit)"}
    mapping = {0: 1, 1: 2, 2: 3, 3: 4}
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: f"{v[i]} hours" for i in range(len(items))}
    # sfx 'pop' at 3.1 s = when the VO says the kept amount (the snip lands)
    snip_t = vo[0]["t"] + words_before(vo[0]["text"], k_disp) / WPS
    assert abs(snip_t - 3.1) <= 0.35, f"08b snip sfx at 3.1 but VO says {k_disp} at {snip_t:.2f}"
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 5

def build_08c():
    unit = BIG_MAC
    items = [
        ("Community college, 1 year", CB_PUBLIC_2YR, usd(CB_PUBLIC_2YR), "A year of community college"),
        ("State school, in-state, 1 year", CB_PUBLIC_4YR_IN, usd(CB_PUBLIC_4YR_IN), "A state school, in-state"),
        ("State school, out-of-state, 1 year", CB_PUBLIC_4YR_OUT, usd(CB_PUBLIC_4YR_OUT), "Same school, out-of-state"),
        ("Private college, 1 year", CB_PRIVATE_4YR, usd(CB_PRIVATE_4YR), "A private college"),
        (f"Private college, {DEGREE_YEARS} years, all-in", DEGREE_YEARS * CB_PRIVATE_BUDGET,
         f"{DEGREE_YEARS} × {usd(CB_PRIVATE_BUDGET)}", f"{DEGREE_YEARS} years private, all-in"),
    ]
    rung_t = [0.0, 4.6, 8.4, 11.9, 16.1]
    rows, rungs, qs = [], [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / unit
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {usd(unit, 2)}", f"{float(q):,.3f}", disp))
    rungs[-1]["tone"] = "goal"
    instate4 = F(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET) / unit
    PINNED["08c 4 yrs in-state all-in"] = (usd(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET), count(instate4)[0])
    yrs = F(rungs[-1]["units"]) / DAYS_PER_YEAR          # one a day: 42,103 ÷ 365
    yrs_exact = qs[-1] / DAYS_PER_YEAR
    y_r = rhu(yrs)
    assert rhu(yrs_exact) == y_r
    rows.append(("A Big Mac a day", f"{rungs[-1]['units']:,} ÷ {DAYS_PER_YEAR}", f"{float(yrs):.3f}", f"{ap(y_r, yrs)}{y_r} years"))
    v = [vo_round(q)[0] for q in qs]
    for q in qs:
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", vo_round(q)[0]))
    vo = [
        vo_line(0.0, 4.3, f"A year of community college? **{v[0]} Big Macs**."),
        vo_line(4.6, 3.5, f"A state school, in-state? **{v[1]}**."),
        vo_line(8.4, 3.2, f"Same school, out-of-state? **{v[2]}**."),
        vo_line(11.9, 3.9, f"A private college? **{v[3]}** a year."),
        vo_line(16.1, 3.5, f"{DEGREE_YEARS} years private, all-in? **{v[4]} Big Macs**."),
        vo_line(20.0, 4.7, f"That's a Big Mac a day for **{ap(y_r, yrs)}{y_r} years**."),
    ]
    duration = 27.5
    lands = [r["t"] + FINAL_COUNT for r in rungs]
    hold = round(duration - lands[-1], 2)
    exp = {
        "id": "08c-clean-sheet-college-in-big-macs",
        "look": "clean-sheet",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": "What college costs\nin **Big Macs**",
        "footer": f"1 Big Mac = {usd(unit, 2)} (Jul 2026) · College Board 2025-26 averages, tuition & fees",
        "captions": True,
        "vo": vo,
        "verdict": {"t": 20.0, "text": f"A Big Mac a day\nfor **{ap(y_r, yrs)}{y_r} years**."},
        "data": {
            "unit": {"name": "Big Mac", "price": usd(unit, 2), "icon": "burger"},
            "rungs": rungs,
            "hold": hold,
        },
        "lookOpts": {
            "badge": f"1 BIG MAC = {usd(unit, 2)}",
            "check": f"check: {rungs[-1]['unitsDisplay']} ÷ {DAYS_PER_YEAR} days {ap(y_r, yrs)}{y_r} years",
        },
        "sfx": [{"t": 20.0, "kind": "ding"}],
    }
    allowed = {F(x) for x in [BIG_MAC, CB_PUBLIC_2YR, CB_PUBLIC_4YR_IN, CB_PUBLIC_4YR_OUT, CB_PRIVATE_4YR,
                              CB_PRIVATE_BUDGET, DEGREE_YEARS, DAYS_PER_YEAR, 2026, 2025, 26]}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs} | {F(y_r)}
    labelled = {F(1): "'1 year' / '1 Big Mac' (one unit)"}
    mapping = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: v[i] for i in range(len(items))}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 5

# ======================================================================================
# Checks
# ======================================================================================
FAILS = []
CHECKS = 0

def check(cond, msg):
    global CHECKS
    CHECKS += 1
    if not cond:
        FAILS.append(msg)
    return cond

def compare(path, exp, got):
    """Exact deep comparison; every leaf is a check."""
    if isinstance(exp, dict):
        check(isinstance(got, dict), f"{path}: expected an object")
        if not isinstance(got, dict):
            return
        check(set(exp) == set(got), f"{path}: keys differ: missing {sorted(set(exp) - set(got))}, extra {sorted(set(got) - set(exp))}")
        for k in exp:
            if k in got:
                compare(f"{path}.{k}", exp[k], got[k])
    elif isinstance(exp, list):
        check(isinstance(got, list) and len(got) == len(exp), f"{path}: expected {len(exp)} items, got {len(got) if isinstance(got, list) else type(got).__name__}")
        if isinstance(got, list):
            for i, (e, g) in enumerate(zip(exp, got)):
                compare(f"{path}[{i}]", e, g)
    elif isinstance(exp, float) or isinstance(got, float):
        check(isinstance(got, (int, float)) and abs(float(exp) - float(got)) < 1e-9, f"{path}: expected {exp!r}, got {got!r}")
    else:
        check(exp == got and type(exp) == type(got), f"{path}: expected {exp!r}, got {got!r}")

def display_strings(spec):
    """Every string that can appear on screen (or in the captions)."""
    out = [("header", spec["header"]), ("footer", spec["footer"]), ("verdict", spec["verdict"]["text"])]
    out += [(f"vo[{i}]", v["text"]) for i, v in enumerate(spec["vo"])]
    u = spec["data"]["unit"]
    out += [("unit.name", u["name"]), ("unit.price", u["price"])]
    for i, r in enumerate(spec["data"]["rungs"]):
        out += [(f"rung[{i}].item", r["item"]), (f"rung[{i}].cost", r["cost"]), (f"rung[{i}].unitsDisplay", r["unitsDisplay"])]

    def walk(p, x):
        if isinstance(x, dict):
            for k, v in x.items():
                if k not in ("t", "item", "verb"):
                    walk(f"{p}.{k}", v)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                walk(f"{p}[{i}]", v)
        elif isinstance(x, str):
            out.append((p, x))
    walk("lookOpts", spec.get("lookOpts", {}))
    return out

def run(name, builder):
    exp, rows, allowed, labelled, mapping, opens, say, lands, verdict_vo = builder()
    path = SPEC_DIR / f"{exp['id']}.json"
    print("=" * 108)
    print(f"{exp['id']}   ({exp['look']} · {exp['format']} · {exp['duration']} s)")
    print("=" * 108)
    print(f"{'what':38s} {'formula':44s} {'exact':>14s}  on screen")
    for r in rows:
        print(f"{r[0][:38]:38s} {r[1][:44]:44s} {r[2]:>14s}  {r[3]}")
    if not check(path.exists(), f"{exp['id']}: spec file missing at {path}"):
        return
    got = json.loads(path.read_text(encoding="utf-8"))

    # 1. exact equality with the computed spec (every display string, number, time)
    n0 = len(FAILS)
    compare(exp["id"], exp, got)
    spec = got

    # 2. contract shape
    check(spec["id"] == path.stem, f"{name}: id != file stem")
    check(spec["format"] == "unit-ladder" and spec["fps"] == 30 and spec["captions"] is True, f"{name}: format/fps/captions")
    rungs = spec["data"]["rungs"]
    check(4 <= len(rungs) <= 7, f"{name}: {len(rungs)} rungs (contract: 4-7)")
    check(spec["data"]["unit"]["icon"] in ICONS, f"{name}: unknown icon {spec['data']['unit']['icon']}")
    check(all(isinstance(r["units"], (int, float)) for r in rungs), f"{name}: units must be numeric")
    check(all(rungs[i]["units"] < rungs[i + 1]["units"] for i in range(len(rungs) - 1)), f"{name}: ladder not cheap -> huge")
    check(all(rungs[i]["t"] < rungs[i + 1]["t"] for i in range(len(rungs) - 1)), f"{name}: rung times not increasing")

    # 3. "≈" on every rounded count and on no exact one; units = the printed count
    for i, r in enumerate(rungs):
        shown = F(r["unitsDisplay"].replace("≈", "").replace(",", "").strip())
        check(shown == F(r["units"]), f"{name}: rung {i} units {r['units']} != shown {r['unitsDisplay']}")

    # 4. number tokens: computed values or labelled constants only
    for where, s in display_strings(spec):
        for tok in number_tokens(s):
            ok = tok in allowed or tok in labelled
            check(ok, f"{name}: {where}: number {float(tok):g} in {s!r} is not a computed value or labelled constant")

    # 5. timing
    vo = spec["vo"]
    t0_numbers = any(r["t"] == 0 for r in rungs) or bool(NUM_RE.search(spec["header"]))
    check(bool(spec["header"]) and t0_numbers and "$" in spec["footer"] and NUM_RE.search(spec["footer"]),
          f"{name}: frame 1 must show the header and a $ number")
    check(vo[0]["t"] == 0.0, f"{name}: VO must start at 0.0")
    for i, v in enumerate(vo):
        need = spoken_words(v["text"]) / WPS
        check(v["d"] + 1e-9 >= need, f"{name}: vo[{i}] d={v['d']} < {need:.2f} s needed for {spoken_words(v['text'])} words")
        if i + 1 < len(vo):
            check(v["t"] + v["d"] <= vo[i + 1]["t"] + 1e-9, f"{name}: vo[{i}] overlaps vo[{i + 1}]")
    for ri, vi in mapping.items():
        check(rungs[ri]["t"] == vo[vi]["t"], f"{name}: rung {ri} t={rungs[ri]['t']} but its VO line starts at {vo[vi]['t']}")
        wb = words_before(vo[vi]["text"], opens[ri])
        check(wb <= 1, f"{name}: rung {ri}: VO line {vi} names the item late ({wb} words in)")
    check(spec["verdict"]["t"] == vo[verdict_vo]["t"], f"{name}: verdict t != its VO line")
    dur = spec["duration"]
    check(LANE[0] <= dur <= LANE[1], f"{name}: duration {dur} outside {LANE}")
    check(dur >= vo[-1]["t"] + vo[-1]["d"] + 0.4 - 1e-9, f"{name}: duration ends before the last VO line + 0.4 s")
    check(dur >= spec["verdict"]["t"] + 2.5 - 1e-9, f"{name}: verdict held < 2.5 s")
    check(abs(lands[-1] + spec["data"]["hold"] - dur) <= 0.02, f"{name}: last landing {lands[-1]:.2f} + hold {spec['data']['hold']} != duration {dur}")
    for s in spec.get("sfx", []):
        check(0 <= s["t"] <= dur, f"{name}: sfx at {s['t']} outside the video")
    if spec["look"] == "scoreboard":
        for ri, vi in mapping.items():
            said = vo[vi]["t"] + words_before(vo[vi]["text"], say[ri]) / WPS
            check(said >= lands[ri] - 0.5, f"{name}: rung {ri}: VO says the number at {said:.2f} s, counter lands at {lands[ri]:.2f} s")
            print(f"  rung {ri}: cut {rungs[ri]['t']:5.2f}  counter lands {lands[ri]:5.2f}  VO says '{say[ri]}' at {said:5.2f}")
    print("  VO timing (words at 2.6/s):")
    for i, v in enumerate(vo):
        w = spoken_words(v["text"])
        print(f"    {v['t']:5.1f} + {v['d']:.1f}  needs {w / WPS:4.2f} s ({w:2d} words)  {strip_markup(v['text'])}")
    print(f"  checks failed for this teaser: {len(FAILS) - n0}")

def main():
    run("08a", build_08a)
    run("08b", build_08b)
    run("08c", build_08c)
    print("Pinned-comment / caption numbers (computed):")
    for k_, v_ in PINNED.items():
        print(f"  {k_:32s} {'  '.join(v_)}")
    md = REPO / "teasers" / "v2" / "08-unit-ladder.md"
    if md.exists():
        text = md.read_text(encoding="utf-8")
        for k_, v_ in PINNED.items():
            for s_ in v_:
                check(s_ in text, f"write-up: pinned/caption number {s_!r} ({k_}) not found in 08-unit-ladder.md")
    print("=" * 108)
    if FAILS:
        print(f"FAILED: {len(FAILS)} of {CHECKS} checks")
        for f in FAILS:
            print("  ✗", f)
        sys.exit(1)
    print(f"PASSED: all {CHECKS} checks")

if __name__ == "__main__":
    main()
