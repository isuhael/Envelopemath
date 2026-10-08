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
     ends before the next starts; each rung's VO line names it in its first words and starts on its cut, or
     (08b) up to 1.4 s after it, so the voice says the count as the built kit lands it; a rung pre-filled
     before frame 1 (08c) is read by the line at 0.0; a rung pre-rolled under the opener line (08a) is
     spoken after it lands; the verdict lands with its VO line; duration is inside the 20-40 s lane and
     covers the last VO line (+0.4 s) and the verdict (+2.5 s); hold = duration - last landing;
   - all three kits are built: the counter lands before (or within 0.5 s of) the VO saying the number,
     replaying each kit's own timing rules on the spec as written (looks/scoreboard, looks/becker-rig and looks/clean-sheet
     formats/unit-ladder.js); the first count lands within 3 s (R10); 08c's check line is fully typed
     before the verdict; the header is at most 15 words (R8);
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
HOUSE_MONTH_NOW = "Aug"         # the 2026 house figure is the August 2026 month (preliminary, NSA)
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
RENT_DAY = 1                     # 08b header: rent is due on the 1st
WORKDAY_HOURS = 8                # 08b calendar check: 8-hour workdays, Monday to Friday

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

# ======================================================================================
# Becker Rig kit timing (mirrors looks/becker-rig/formats/unit-ladder.js, "per-rung schedule")
# ======================================================================================
def becker_landings(rungs, hold, verdict_t=None, intro_opt=True):
    """Each rung: the coin drops, he punches it after a lead, the units fill and the count lands."""
    Ts = [r["t"] for r in rungs]
    n = len(rungs)
    intro = intro_opt and Ts[0] >= 0.9
    lands = []
    for i, r in enumerate(rungs):
        last = i == n - 1
        gap = Ts[i + 1] - Ts[i] if not last else max(3.4, hold + 1.4)
        placed = i == 0 and not intro and Ts[i] < 0.9          # the first coin already stands there at t = 0
        lead = 0.45 if placed else min(max(gap * 0.22, 0.45), 0.92)
        punch = max(0, Ts[i]) + lead
        fill0 = punch + 0.05
        if last:
            fd = 1.9
            if verdict_t is not None:
                fd = min(fd, verdict_t - 0.5 - fill0)
            fill = min(max(fd, 0.6), 2.2)
        else:
            fill = min(max(gap * 0.3, 0.5), 1.6)
        lands.append(fill0 + fill)
    return lands

# ======================================================================================
# Teaser builders: each returns (expected spec dict, rows for the table, allowed numbers,
# per-rung VO mapping, phrases that must open each rung's VO line, VO number phrases)
# ======================================================================================
def vo_line(t, d, text):
    return {"t": t, "d": d, "text": text}

def build_08a():
    unit = HOT_DOG_COMBO
    items = [
        ("Your Costco membership", COSTCO_MEMBERSHIP, usd(COSTCO_MEMBERSHIP), "Your Costco card"),
        ("An iPhone 18 Pro", IPHONE_18_PRO, usd(IPHONE_18_PRO), "An iPhone 18 Pro"),
        (f"A median new house, {HOUSE_YEAR_THEN}", NEW_HOUSE_1985, usd(NEW_HOUSE_1985), f"A new house in {HOUSE_YEAR_THEN}"),
        (f"A median new house, {HOUSE_MONTH_NOW} {HOUSE_YEAR_NOW}", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), f"And a new house in {HOUSE_YEAR_NOW}"),
    ]
    # rung 1 cuts at 1.5 s, under the opener line: frame 1 is the kit's unit intro (hero "1", one hot dog,
    # "$1.50 / YOUR HOT DOG + SODA") for the whole first 1.5 s
    rung_t = [1.5, 7.4, 11.0, 15.2]
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
    assert qs[3] / qs[2] == ratio
    rows.append(("Ratio house 2026 / 1985", f"{usd(NEW_HOUSE_2026)} ÷ {usd(NEW_HOUSE_1985)}", f"{float(ratio):.4f}", ratio_disp))
    # the hook's question: the $1.50 hot dog, had it risen like a new house (sticker prices, 1985 -> Aug 2026)
    rose = unit * ratio                                   # 1.50 × 4.670225 = 7.005338
    assert rose == F(NEW_HOUSE_2026) / qs[2]              # = the 2026 house ÷ 1985's 56,200 hot dogs
    rose_r = rhu(rose, F(1, 100))
    rose_disp = ap(rose_r, rose) + usd(rose, 2)
    assert rose_disp == "≈ $7.01"
    rows.append(("Hot dog risen like a house", f"{usd(unit, 2)} × {float(ratio):.6f}", f"{float(rose):.6f}", rose_disp))
    PINNED["08a hot dog risen like a house"] = (rose_disp.replace("≈ ", ""), f"{int(qs[2]):,}")
    v = [vo_round(q)[0] for q in qs]
    u2 = usd(unit, 2)
    vo = [
        # the opener: the viewer's own $1.50 hot dog (header, hero "1", label and voice on the same item)
        vo_line(0.0, 3.5, f"Your **{u2}** hot dog, since {HOT_DOG_SINCE}."),
        vo_line(3.7, 3.0, f"Your Costco card? **{v[0]}** of them."),
        vo_line(7.4, 3.2, f"An iPhone 18 Pro? **{v[1]}**."),
        vo_line(11.0, 3.9, f"A new house in {HOUSE_YEAR_THEN}? **{v[2]}**."),
        vo_line(15.2, 4.7, f"And a new house in {HOUSE_YEAR_NOW}? **{v[3]}**."),
        vo_line(20.2, 4.7, f"Rose like a house? A **{rose_disp}** hot dog."),
    ]
    for q, (s, n) in zip(qs, map(vo_round, qs)):
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", s))
    duration = 26.0
    lands = scoreboard_landings(rungs)
    hold = round(duration - lands[-1], 2)
    exp = {
        "id": "08a-scoreboard-costco-hot-dogs",
        "look": "scoreboard",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": f"WHAT YOUR **{u2}** HOT DOG WOULD\nCOST IF IT ROSE LIKE A HOUSE",
        "footer": f"Hot dog + soda: {u2} in {HOT_DOG_SINCE}. Still {u2}.",
        "captions": True,
        "vo": vo,
        "verdict": {"t": 20.2, "text": f"Rose like a house?\nA **{rose_disp}** hot dog."},
        "data": {
            "unit": {"name": "Costco hot dog", "label": "Your hot dog + soda", "price": u2, "icon": "hotdog"},
            "rungs": rungs,
            "hold": hold,
        },
        # the hero's payoff (built kit, lookOpts.payoff): at the verdict the hero cuts to the unit price and rolls
        # up to the answer, so "what it would cost" is the last number the hero lands on
        "lookOpts": {"climaxFill": 1, "payoff": {"t": 20.2, "from": u2, "display": rose_disp}},
        "sfx": [{"t": 20.2, "kind": "ding"}],
    }
    allowed = {F(x) for x in [HOT_DOG_COMBO, COSTCO_MEMBERSHIP, IPHONE_18_PRO, NEW_HOUSE_1985,
                              NEW_HOUSE_2026, HOT_DOG_SINCE, HOUSE_YEAR_THEN, HOUSE_YEAR_NOW]}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs} | {F(ratio_r), F(rose_r)}
    labelled = {F(18): "model name 'iPhone 18 Pro'"}
    mapping = {0: 1, 1: 2, 2: 3, 3: 4}           # rung index -> VO line index
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: v[i] for i in range(len(items))}
    # rung 0 cuts under the opener line (VO 0) and its count lands before its own VO line starts
    timing = {"prerolled": {0}, "prefilled": set(), "lead": {}, "lag": 0.0,
              "lands_of": lambda sp: scoreboard_landings(sp["data"]["rungs"]),
              "extras": scoreboard_payoff}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 5, timing

def scoreboard_payoff(sp, lands):
    """The hero's payoff roll (mirrors lookOpts.payoff in looks/scoreboard/formats/unit-ladder.js: it cuts at
    max(t, last landing + 0.3), holds 0.2 s, rolls 1.4 s). It must land on the verdict's beat, before the voice
    says the number (or within 0.5 s after)."""
    po = sp.get("lookOpts", {}).get("payoff")
    if not po:
        return [(False, "08a: lookOpts.payoff missing", None)]
    t0 = max(po.get("t", sp["verdict"]["t"]), lands[-1] + 0.3)
    land = t0 + 0.2 + po.get("roll", 1.4)
    line = next((v for v in sp["vo"] if po["display"] in strip_markup(v["text"])), None)
    if line is None:
        return [(False, f"08a: no VO line says the payoff {po['display']}", None)]
    said = line["t"] + words_before(line["text"], po["display"]) / WPS
    return [
        (po.get("t") == sp["verdict"]["t"], "08a: the payoff roll must start on the verdict", None),
        (po["from"] == sp["data"]["unit"]["price"] and po["display"] in sp["verdict"]["text"], "08a: payoff must roll from the unit price to the verdict's number", None),
        (said >= land - 0.5 and land >= t0, f"08a: VO says {po['display']} at {said:.2f} s, the hero lands it at {land:.2f} s",
         f"  payoff: cut {t0:5.2f}  hero {po['from']} -> {po['display']} lands {land:5.2f}  VO says '{po['display']}' at {said:5.2f}"),
    ]

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
    k_disp = "≈ " + usd(k, 2)                     # 13.1006 -> ≈ $13.10 (what you keep, rounded)
    U = rhu(k, F(1, 100))                         # the DEFINED unit: exactly $13.10; every count divides by it
    assert U == F("13.10")
    u_disp = usd(U, 2)                            # "$13.10": the operand the screen shows ("÷ $13.10")
    cut = WAGE - k
    cut_disp = "≈ " + usd(cut, 2)                 # 1.8994 -> ≈ $1.90
    assert k_disp == "≈ $13.10" and cut_disp == "≈ $1.90"
    rows = [
        ("Gross a year", f"{usd(WAGE)} × {HOURS_PER_YEAR:,}", f"{gross:,}", usd(gross)),
        ("Federal income tax", f"10% × {usd(BRACKET_10_TOP)} + 12% × ({usd(gross)} − {usd(STD_DEDUCTION)} − {usd(BRACKET_10_TOP)})", f"{float(tax):,.2f}", usd(tax, 2)),
        ("FICA", f"7.65% × {usd(gross)}", f"{float(fica):,.2f}", usd(fica, 2)),
        ("Kept a year", f"{usd(gross)} − tax − FICA", f"{float(net):,.2f}", usd(net, 2)),
        ("Kept per hour", f"{usd(net, 2)} ÷ {HOURS_PER_YEAR:,}", f"{float(k):.5f}", k_disp),
        ("Unit (defined, rounded)", "kept per hour to the cent", f"{float(U):.2f}", u_disp),
        ("Tax + FICA per hour", f"{usd(WAGE)} − {float(k):.4f}", f"{float(cut):.4f}", cut_disp),
    ]
    items = [
        ("Median rent, 1 month", RENT, usd(RENT), "Median rent"),
        ("Median rent, 1 year", RENT * MONTHS, usd(RENT * MONTHS), "A year of rent"),
        ("An average new car", KBB_ATP, usd(KBB_ATP), "An average new car"),
        ("A median new house", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), "A median new house"),
    ]
    rung_t = [0.0, 8.4, 12.6, 16.8]
    rungs, qs = [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / U
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {u_disp}", f"{float(q):,.3f}", disp))
    month_hours = F(HOURS_PER_YEAR, MONTHS)                 # 173.33 work hours a month
    share = qs[0] / month_hours                              # 0.674 of every work hour goes to rent
    assert abs(share - F(2, 3)) < F(1, 100), share          # "≈ 2 of every 3 hours"
    weeks = qs[0] / HOURS_PER_WEEK                           # 2.92 work weeks (caption: "isn't a week of work")
    years = qs[3] / HOURS_PER_YEAR                           # 14.45
    y_r = rhu(years)
    # the hook's blank: "you work for rent from the 1st to the ___". Rent's share of the month's work hours,
    # laid on the calendar from rent day (the 1st): on a 30-day month and on the average month (365 / 12 days)
    day30 = share * 30                                       # 20.23
    day_avg = share * F(DAYS_PER_YEAR, MONTHS)               # 20.51
    day = rhu(day30)
    assert day == 20 and abs(day_avg - day) < F(6, 10), (day30, day_avg)
    # and on a real calendar: 8-hour workdays Monday-Friday from the 1st; the date the 116.87th hour is worked,
    # for every weekday the 1st can fall on (the same in 28-31-day months, since it comes before the 22nd)
    workday_no = math.ceil(qs[0] / WORKDAY_HOURS)            # 116.87 / 8 = 14.6 -> during the 15th workday
    dates = []
    for first_wd in range(7):                                # 0 = the 1st is a Monday ... 6 = a Sunday
        n, date = 0, 0
        while n < workday_no:
            date += 1
            if (first_wd + date - 1) % 7 < 5:
                n += 1
        dates.append(date)
    assert min(dates) >= 19 and max(dates) <= 21 and day in dates, dates
    rows += [
        ("Rent share of work hours", f"{float(qs[0]):.3f} ÷ (2,080 ÷ 12 = {float(month_hours):.2f})", f"{float(share):.4f}", "≈ 2 of every 3"),
        ("Rent month in work weeks", f"{float(qs[0]):.3f} ÷ {HOURS_PER_WEEK}", f"{float(weeks):.3f}", "caption: not a week; ≈ 3"),
        ("Rent hours on the calendar", f"{float(share):.4f} × 30 days (× 30.42)", f"{float(day30):.2f} ({float(day_avg):.2f})", f"≈ the {day}th"),
        ("  Mon-Fri calendar, 8-h days", f"workday {workday_no} ({float(qs[0] / WORKDAY_HOURS):.1f} of 21.67)", "", f"the {min(dates)}th-{max(dates)}st"),
        ("House in full-time years", f"{float(qs[3]):.3f} ÷ 2,080", f"{float(years):.3f}", f"{ap(y_r, years)}{y_r} years"),
    ]
    PINNED["08b rent share"] = (f"{float(share) * 100:.1f}%",)
    PINNED["08b rent hours of the month"] = (f"{rhu(qs[0])} of {rhu(month_hours)} work hours",)
    v = [vo_round(q)[0] for q in qs]
    for q in qs:
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", vo_round(q)[0]))
    vo = [
        vo_line(0.0, 4.3, f"{usd(WAGE)} an hour? Median rent: **{v[0]} hours**."),
        vo_line(4.6, 3.7, f"Every hour you work, to **≈ the {day}th**."),
        # each later line starts 0.7-1.4 s after its cut, so the voice says the count as the built kit lands it
        vo_line(9.1, 3.9, f"A year of rent? **{v[1]} hours**."),
        vo_line(13.3, 3.9, f"An average new car? **{v[2]} hours**."),
        vo_line(18.2, 3.2, f"A median new house? **{v[3]} hours**."),
        vo_line(21.5, 4.7, f"That's **{ap(y_r, years)}{y_r} years** of full-time work. Every cent you keep."),
    ]
    duration = 27.0
    verdict_t = 21.5
    # the last landing does not depend on hold here (its lead is capped at 0.92 s), so one pass is exact
    lands = becker_landings(rungs, 7.33, verdict_t)
    hold = round(duration - lands[-1], 2)
    assert becker_landings(rungs, hold, verdict_t) == lands
    exp = {
        "id": "08b-becker-rig-hours-at-15",
        "look": "becker-rig",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": f"At **{usd(WAGE)}/hr**, you work for rent\nfrom the {RENT_DAY}st to the ___",
        "footer": f"{k_disp} kept: 2026 federal tax + FICA, single, no state tax",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"**{ap(y_r, years)}{y_r} years** of full-time work.\nEvery cent you keep."},
        "data": {
            "unit": {"name": f"Hour of work at {usd(WAGE)} ({k_disp} kept)", "price": u_disp, "icon": "hour"},
            "rungs": rungs,
            "hold": hold,
        },
        # the built recap table names each pile; without this both rent piles shorten to "Median rent"
        # blank: the built kit writes the hook's answer into the header's "___" (lookOpts.blank): the days tick up
        # from the 1st while vo[1] says "every hour you work" and land on the answer as the voice says it
        "lookOpts": {"pileLabels": ["Median rent, 1 month", "Median rent, 1 year", "Average new car", "Median new house"],
                     "blank": {"t": 4.7, "d": 1.7, "text": f"≈ {day}th"}},
        "sfx": [],
    }
    allowed = {F(x) for x in [WAGE, RENT, RENT * MONTHS, KBB_ATP, NEW_HOUSE_2026, MONTHS, 2026]}
    allowed |= {rhu(k, F(1, 100)), U, F(y_r), F(day)}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs}
    labelled = {F(1): "'1 month' / '1 year' / 'the 1st' (rent day)"}
    mapping = {0: 0, 1: 2, 2: 3, 3: 4}
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: f"{v[i]} hours" for i in range(len(items))}
    # rung 0's line opens on the wage ("$15 an hour?"), then names the rent
    timing = {"prerolled": set(), "prefilled": set(), "lead": {0: 4}, "lag": 1.4, "counter_sync": True,
              "lands_of": lambda sp: becker_landings(sp["data"]["rungs"], sp["data"]["hold"], sp["verdict"]["t"]),
              "extras": lambda sp, lands: becker_blank(sp, lands, f"≈ the {day}th")}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 5, timing

def becker_blank(sp, lands, phrase):
    """The header's blank fills in (mirrors lookOpts.blank in looks/becker-rig/formats/unit-ladder.js: the ordinals
    tick from t, the answer lands at t + d). It must start inside its VO line, land before the voice says the date
    (by at most 0.5 s), stay clear of rung 0's landing and of rung 1's cut, and count to the number it prints."""
    bl = sp.get("lookOpts", {}).get("blank")
    if not bl:
        return [(False, "08b: lookOpts.blank missing", None)]
    land = bl["t"] + bl.get("d", 1.6)
    line = next((v for v in sp["vo"] if phrase in strip_markup(v["text"])), None)
    if line is None:
        return [(False, f"08b: no VO line says {phrase!r}", None)]
    said = line["t"] + words_before(line["text"], phrase) / WPS
    rungs = sp["data"]["rungs"]
    n_text = int(re.sub(r"\D", "", bl["text"]))
    n_vo = int(re.sub(r"\D", "", phrase))
    return [
        ("___" in sp["header"], "08b: the header has no blank to fill", None),
        (n_text == n_vo, f"08b: the blank prints {bl['text']!r} but the voice says {phrase!r}", None),
        (line["t"] <= bl["t"] < said, "08b: the blank must start ticking inside its VO line, before the date is said", None),
        (land <= said + 1e-9 and said - land <= 0.5, f"08b: the blank lands at {land:.2f} s, the voice says the date at {said:.2f} s", None),
        (lands[0] + 0.6 <= land <= rungs[1]["t"] - 0.9, "08b: the blank must land between rung 0's count and rung 1's cut", 
         f"  blank: ticks 1st -> {bl['text']} from {bl['t']:5.2f}, lands {land:5.2f}  VO says '{phrase}' at {said:5.2f}"),
    ]

# Clean Sheet kit timing (mirrors looks/clean-sheet/formats/unit-ladder.js + theme.js MOTION)
CS = dict(popDelay=0.16, activate=0.3, collapse=0.42, typeCps=18, wipe=0.26, pop=0.22)

def clean_sheet_landings(rungs, unit_price, count_speed=1.0, vo=None):
    """Landing time of each rung's counter: the formula types 'cost ÷ price =', the highlighter wipes in,
    the count runs up and lands; a rung whose result starts by frame 1 is pre-filled (already landed at 0.0);
    a count overlapping a VO line lands by 60% of that line (or just before its own digits); a finished rung
    files into its row just before the next one opens."""
    op = " ÷ " + unit_price
    type_dur = min(max(len(op + " =") / 16, 0.4), 0.9)
    T = []
    for i, r in enumerate(rungs):
        res = r["t"] + type_dur + 0.25
        act = -1 if i == 0 else r["t"] - CS["activate"]
        cnt0 = res + CS["popDelay"]
        cntD = min(max(0.45 + 0.26 * math.log10(r["units"] + 1), 0.45), 1.7) * count_speed
        pre = res <= 0
        if pre:
            res = min(res, -(CS["wipe"] + 0.05))
            cnt0 = min(res + CS["popDelay"], -(CS["pop"] + 0.05))
            cntD = 0
        T.append({"act": act, "cnt0": cnt0, "cntD": cntD, "land": cnt0 + cntD, "pre": pre})
    for i, x in enumerate(T):
        if x["pre"] or not vo:
            continue
        raw = re.search(r"\d[\d,]*(?:\.\d+)?", rungs[i]["unitsDisplay"]).group(0)
        by = None
        for v in vo:
            text = v["text"].replace("**", "").replace("__", "")
            if v["t"] > x["land"] or v["t"] + v["d"] < x["cnt0"]:
                continue
            at = v["t"] + 0.6 * v["d"]
            k = text.find(raw)
            if k >= 0:
                at = min(at, v["t"] + (k / max(1, len(text))) * v["d"] * 0.88 - 0.1)
            by = at if by is None else min(by, at)
        if by is not None and by < x["land"]:
            x["cntD"] = max(0.35, by - x["cnt0"])
            x["land"] = x["cnt0"] + x["cntD"]
    for i in range(len(T) - 1):
        x, nx = T[i], T[i + 1]
        colD = min(max(nx["act"] - x["land"] - 0.1, 0.25), CS["collapse"])
        col = nx["act"] - colD
        if x["land"] > col - 0.1:
            x["cntD"] = max(0.3, col - 0.1 - x["cnt0"])
            x["land"] = x["cnt0"] + x["cntD"]
    return [x["land"] for x in T], [x["pre"] for x in T]

def cs_type_time(text):
    return min(max(len(text) / CS["typeCps"], 0.35), 2.2)

def build_08c():
    unit = BIG_MAC
    items = [
        ("Community college, 1 year", CB_PUBLIC_2YR, usd(CB_PUBLIC_2YR), "Community college"),
        ("State school, in-state, 1 year", CB_PUBLIC_4YR_IN, usd(CB_PUBLIC_4YR_IN), "A state school, in-state"),
        ("State school, out-of-state, 1 year", CB_PUBLIC_4YR_OUT, usd(CB_PUBLIC_4YR_OUT), "The same school, out-of-state"),
        ("Private college, 1 year", CB_PRIVATE_4YR, usd(CB_PRIVATE_4YR), "A private college, 1 year"),
    ]
    # row 1 starts before frame 1, so the built kit shows it already answered at 0.0 (its pre-fill)
    rung_t = [-1.0, 3.6, 7.6, 11.6]
    rows, rungs, qs = [], [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / unit
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {usd(unit, 2)}", f"{float(q):,.3f}", disp))
    rungs[-1]["tone"] = "goal"
    # the verdict: private vs community college, the same ratio in dollars and in Big Macs
    ratio = F(CB_PRIVATE_4YR, CB_PUBLIC_2YR)
    assert qs[3] / qs[0] == ratio
    ratio_r = rhu(ratio, F(1, 10))
    ratio_num = ap(ratio_r, ratio) + f"{float(ratio_r):.1f}"
    assert ratio_num == "≈ 10.8"
    rows.append(("Private ÷ community", f"{usd(CB_PRIVATE_4YR)} ÷ {usd(CB_PUBLIC_2YR)}", f"{float(ratio):.4f}", ratio_num + "×"))
    # write-up and pinned-comment numbers (full budgets are not on screen any more)
    tuition4 = F(DEGREE_YEARS * CB_PRIVATE_4YR) / unit                 # tuition alone, 4 years private
    rows.append(("(tuition only, 4 yrs private)", f"4 × {usd(CB_PRIVATE_4YR)} ÷ {usd(unit, 2)}", f"{float(tuition4):,.3f}", count(tuition4)[0]))
    PINNED["08c 4 yrs private tuition only"] = (count(tuition4)[0],)
    instate4 = F(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET) / unit
    PINNED["08c 4 yrs in-state all-in"] = (usd(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET), count(instate4)[0])
    private4 = F(DEGREE_YEARS * CB_PRIVATE_BUDGET) / unit
    yrs = F(count(private4)[1]) / DAYS_PER_YEAR                       # one a day: 42,103 ÷ 365
    y_r = rhu(yrs)
    assert rhu(private4 / DAYS_PER_YEAR) == y_r
    rows.append(("(pinned) 4 yrs private all-in", f"4 × {usd(CB_PRIVATE_BUDGET)} ÷ {usd(unit, 2)}", f"{float(private4):,.3f}", count(private4)[0]))
    rows.append(("(pinned) a Big Mac a day", f"{count(private4)[1]:,} ÷ {DAYS_PER_YEAR}", f"{float(yrs):.3f}", f"{ap(y_r, yrs)}{y_r} years"))
    PINNED["08c private full budget"] = (usd(CB_PRIVATE_BUDGET), usd(DEGREE_YEARS * CB_PRIVATE_BUDGET), count(private4)[0], f"{ap(y_r, yrs)}{y_r} years")
    v = [vo_round(q)[0] for q in qs]
    for q in qs:
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", vo_round(q)[0]))
    vo = [
        vo_line(0.0, 3.3, f"Community college? **{v[0]} Big Macs**."),
        vo_line(3.6, 3.7, f"A state school, in-state? **{v[1]}**."),
        vo_line(7.6, 3.7, f"The same school, out-of-state? **{v[2]}**."),
        vo_line(11.6, 3.9, f"A private college, 1 year? **{v[3]}**."),
        vo_line(16.2, 4.3, f"Private vs community: **{ratio_num}×** the Big Macs."),
    ]
    duration = 21.5
    count_speed = 0.5
    lands, pre = clean_sheet_landings(rungs, usd(unit, 2), count_speed, vo)
    assert pre == [True, False, False, False], pre       # only row 1 is pre-filled at frame 1
    hold = round(duration - lands[-1], 2)
    check_text = f"check: {usd(CB_PRIVATE_4YR)} ÷ {usd(CB_PUBLIC_2YR)} {ratio_num}"
    check_t = 14.0
    verdict_t = 16.2
    # the working before the answer: the check line starts after the final count lands and is fully typed
    # before the verdict appears (the kit types at 18 characters a second)
    assert lands[-1] < check_t and check_t + cs_type_time(check_text) <= verdict_t, (lands[-1], check_t + cs_type_time(check_text))
    rows.append(("Check line types", f"{check_t:.1f} s + {len(check_text)} chars ÷ 18/s", f"{check_t + cs_type_time(check_text):.2f}", f"done before verdict {verdict_t}"))
    exp = {
        "id": "08c-clean-sheet-college-in-big-macs",
        "look": "clean-sheet",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": "Community? In-state?\nOut-of-state? Private?\nYour year in **Big Macs**",
        "footer": f"1 Big Mac = {usd(unit, 2)} (Jul 2026) · College Board 2025-26: published tuition & fees",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"Private vs community college:\n**{ratio_num}×** the Big Macs."},
        "data": {
            "unit": {"name": "Big Mac", "price": usd(unit, 2), "icon": "burger"},
            "rungs": rungs,
            "hold": hold,
        },
        "lookOpts": {
            "unitRow": "show",
            "countSpeed": count_speed,
            "check": check_text,
            "checkT": check_t,
        },
        "sfx": [{"t": verdict_t, "kind": "ding"}],
    }
    allowed = {F(x) for x in [BIG_MAC, CB_PUBLIC_2YR, CB_PUBLIC_4YR_IN, CB_PUBLIC_4YR_OUT, CB_PRIVATE_4YR,
                              2026, 2025, 26]}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs} | {F(ratio_r)}
    labelled = {F(1): "'1 year' / '1 Big Mac' (one unit)"}
    mapping = {0: 0, 1: 1, 2: 2, 3: 3}
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: v[i] for i in range(len(items))}
    # row 1 is pre-filled before frame 1 and the opener line reads the answer already on screen
    timing = {"prerolled": set(), "prefilled": {0}, "lead": {}, "lag": 0.0, "counter_sync": True,
              "lands_of": lambda sp: clean_sheet_landings(sp["data"]["rungs"], sp["data"]["unit"]["price"],
                                                          sp.get("lookOpts", {}).get("countSpeed", 1.0), sp["vo"])[0]}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, 4, timing

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
    out += [("unit.name", u["name"]), ("unit.price", u["price"])] + ([("unit.label", u["label"])] if "label" in u else [])
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
    exp, rows, allowed, labelled, mapping, opens, say, lands, verdict_vo, timing = builder()
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
    # the timing checks below replay the kit on the spec as written (not on the expected spec)
    lands_exp = lands
    try:
        lands = timing["lands_of"](spec)
    except Exception as e:  # a malformed spec still reports through the checks above
        check(False, f"{name}: kit timing replay failed on the spec: {e}")
    check(all(abs(a - b) < 1e-9 for a, b in zip(lands, lands_exp)), f"{name}: kit landings on the spec differ from the expected ones")

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
    t0_numbers = any(r["t"] <= 0 for r in rungs) or bool(NUM_RE.search(spec["header"]))
    check(bool(spec["header"]) and t0_numbers and "$" in spec["footer"] and NUM_RE.search(spec["footer"]),
          f"{name}: frame 1 must show the header and a $ number")
    hw = len([w for w in strip_markup(spec["header"]).split() if re.search(r"[A-Za-z0-9]", w)])
    check(hw <= 15, f"{name}: header has {hw} words (R8: at most 15)")
    check(vo[0]["t"] == 0.0, f"{name}: VO must start at 0.0")
    for i, v in enumerate(vo):
        need = spoken_words(v["text"]) / WPS
        check(v["d"] + 1e-9 >= need, f"{name}: vo[{i}] d={v['d']} < {need:.2f} s needed for {spoken_words(v['text'])} words")
        if i + 1 < len(vo):
            check(v["t"] + v["d"] <= vo[i + 1]["t"] + 1e-9, f"{name}: vo[{i}] overlaps vo[{i + 1}]")
    for ri, vi in mapping.items():
        if ri in timing["prefilled"]:
            # answered before frame 1 (the kit's pre-fill); the opener line reads it from 0.0
            check(rungs[ri]["t"] < 0 and lands[ri] <= 0 and vo[vi]["t"] == 0.0, f"{name}: pre-filled rung {ri} must be landed by frame 1 and read at 0.0")
        elif ri in timing["prerolled"]:
            # cut under the opener line (the count rolls while it plays); its own VO line follows the landing
            v0 = vo[0]
            check(v0["t"] <= rungs[ri]["t"] < v0["t"] + v0["d"] and vo[vi]["t"] >= lands[ri],
                  f"{name}: pre-rolled rung {ri} must cut during the opener line and be spoken after its count lands")
        else:
            lag = vo[vi]["t"] - rungs[ri]["t"]
            check(-1e-9 <= lag <= timing["lag"] + 1e-9, f"{name}: rung {ri} t={rungs[ri]['t']} but its VO line starts at {vo[vi]['t']} (allowed lag {timing['lag']} s)")
        wb = words_before(vo[vi]["text"], opens[ri])
        lead = timing["lead"].get(ri, 1)
        check(wb <= lead, f"{name}: rung {ri}: VO line {vi} names the item late ({wb} words in, max {lead})")
    check(lands[0] <= 3.0, f"{name}: first count lands at {lands[0]:.2f} s (R10: within about 3 s)")
    check(spec["verdict"]["t"] == vo[verdict_vo]["t"], f"{name}: verdict t != its VO line")
    dur = spec["duration"]
    check(LANE[0] <= dur <= LANE[1], f"{name}: duration {dur} outside {LANE}")
    check(dur >= vo[-1]["t"] + vo[-1]["d"] + 0.4 - 1e-9, f"{name}: duration ends before the last VO line + 0.4 s")
    check(dur >= spec["verdict"]["t"] + 2.5 - 1e-9, f"{name}: verdict held < 2.5 s")
    check(abs(lands[-1] + spec["data"]["hold"] - dur) <= 0.02, f"{name}: last landing {lands[-1]:.2f} + hold {spec['data']['hold']} != duration {dur}")
    for s in spec.get("sfx", []):
        check(0 <= s["t"] <= dur, f"{name}: sfx at {s['t']} outside the video")
    if spec["look"] == "scoreboard" or timing.get("counter_sync"):
        for ri, vi in mapping.items():
            said = vo[vi]["t"] + words_before(vo[vi]["text"], say[ri]) / WPS
            check(said >= lands[ri] - 0.5, f"{name}: rung {ri}: VO says the number at {said:.2f} s, counter lands at {lands[ri]:.2f} s")
            print(f"  rung {ri}: cut {rungs[ri]['t']:5.2f}  counter lands {lands[ri]:5.2f}  VO says '{say[ri]}' at {said:5.2f}")
    for ok, msg, line in (timing.get("extras") or (lambda sp, ld: []))(spec, lands):
        check(ok, msg)
        if line:
            print(line)
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
