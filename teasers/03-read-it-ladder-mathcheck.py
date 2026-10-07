#!/usr/bin/env python3
"""Math check for teasers 03A, 03B, 03C (Envelope Math: Day to Decade / The Read-It Ladder).

Recomputes every number that is written on the envelope, spoken in the VO, or quoted in a
pinned comment or description, from the sourced inputs and the labelled assumptions only. It
asserts each rounded value we display and prints how far the envelope's rounding sits from the
exact figure. The last block reads the three renderer specs and checks that every number drawn
on screen or shown in a caption traces to this script.
Run: python3 teasers/03-read-it-ladder-mathcheck.py

Polish pass 2026-10-07: 03C was replaced (Powerball -> the average new-car payment). The
Powerball block is retired; its numbers no longer appear anywhere in this approach.
"""
import calendar
import datetime as dt
import json
import os
import re
from fractions import Fraction as F


def within(shown, exact):
    """Relative gap between the envelope's rounded figure and the exact one, in %."""
    return abs(shown - exact) / exact * 100


def weekdays(year):
    return sum(1 for d in range(1, 367 if calendar.isleap(year) else 366)
               if (dt.date(year, 1, 1) + dt.timedelta(d - 1)).weekday() < 5)


# ---------------------------------------------------------------- sourced inputs (all re-checked 2026-10-07)
# Apple store page (https://www.apple.com/shop/buy-iphone/iphone-18-pro) and MacRumors 2026-09-09
# (https://www.macrumors.com/2026/09/09/iphone-18-pro-pricing/): iPhone 18 Pro from $1,199 (256GB).
IPHONE_18_PRO = 1199
# BLS Usual Weekly Earnings, Q2 2026, released 2026-07-21 (https://www.bls.gov/news.release/wkyeng.htm):
# median weekly earnings of full-time wage and salary workers. Q3 2026 is due 2026-10-21.
BLS_MEDIAN_WEEKLY = 1251
# Edmunds Q3 2026 new-vehicle finance data, press release 2026-10-01 (GlobeNewswire
# https://www.globenewswire.com/news-release/2026/10/01/3373320/0/en/new-car-financing-records-pile-up-in-q3-as-buyers-borrow-more-and-stretch-loans-longer-according-to-edmunds.html ;
# CNBC 2026-10-06 https://www.cnbc.com/2026/10/06/car-loans-are-getting-longer-as-monthly-payments-hit-record-highs.html)
CAR_PAYMENT = 787             # average monthly payment, financed new-vehicle purchases, Q3 2026
CAR_PAYMENT_Q2, CAR_PAYMENT_Q3_2025 = 777, 756
CAR_APR = 7.0                 # average APR, % (pin only)
CAR_FINANCED = 44_664         # average amount financed (pin only)
CAR_INTEREST = 9_938          # average total interest over the life of the loan (pin only)
SHARE_1000 = 21.2             # % of financed new-car purchases with payments of $1,000+ (pin only)
SHARE_84 = 25.5               # % with terms of 84 months or longer (pin only)

# ======================================================================= 03A
print("=" * 72, "\n03A  Your habit is $3 a day  (assumption: same $3, every day, 10 years)\n" + "=" * 72)
day = 3
week = day * 7
year_52 = week * 52            # what the ladder's x52 gutter literally gives
year = day * 365               # exact calendar year
decade_365 = year * 10         # 3,650 days
decade_leap = day * F(36525, 10)  # 3,652.5 days: a decade averages 2.5 leap days
shown_year, shown_decade = 1100, 11000
assert week == 21
print(f"  rung 1  x7 : ${day} x 7 = ${week}                       (shown '$21', exact)")
print(f"  rung 2  x52: ${week} x 52 = ${year_52:,}; 365 days = ${year:,}  (shown '≈$1,100', within {within(shown_year, year):.2f}% of ${year:,})")
print(f"  rung 3  x10: ${year:,} x 10 = ${decade_365:,}; with leap days ${float(decade_leap):,.2f}")
print(f"           shown '≈$11,000': within {within(shown_decade, decade_365):.2f}% of ${decade_365:,} "
      f"and {within(shown_decade, float(decade_leap)):.2f}% of ${float(decade_leap):,.2f}")
assert round(year, -2) == shown_year and round(year_52, -2) == shown_year
assert round(decade_365, -3) == shown_decade and round(float(decade_leap), -3) == shown_decade
assert within(shown_year, year) < 0.5 and within(shown_decade, decade_365) < 0.5
gap = IPHONE_18_PRO - year
print(f"  flip side: a year ${year:,} < iPhone 18 Pro ${IPHONE_18_PRO:,}  (by ${gap}, = {year / IPHONE_18_PRO * 100:.1f}% of the phone)")
assert year < IPHONE_18_PRO and shown_year < IPHONE_18_PRO and year_52 < IPHONE_18_PRO
assert f"(a year: exactly ${year:,})" == "(a year: exactly $1,095)"   # the back's sub-line
# the claim does not hang on the exact price: it holds for any starting price above $1,095
print(f"  claim 'a year < one iPhone 18 Pro' holds for any starting price >= ${year + 1:,}")
# daily habit that would still come in under one iPhone a year (pinned-comment nuance)
print(f"  break-even habit: ${IPHONE_18_PRO} / 365 = ${IPHONE_18_PRO / 365:.3f} a day -> 'up to $3.28'")
assert int(IPHONE_18_PRO / 365 * 100) / 100 == 3.28 and 3.28 * 365 < IPHONE_18_PRO < 3.29 * 365
# the invest-it camp's number (pinned comment, labelled assumption: 7%/yr, monthly compounding)
monthly = year / 12
r = 0.07 / 12
fv = monthly * ((1 + r) ** 120 - 1) / r
fv_annual = year * ((1.07 ** 10 - 1) / 0.07)
print(f"  invest-camp: ${monthly:.2f} at the end of each month, assumed 7%/yr compounded monthly, 120 months = ${fv:,.0f} -> '≈$15,800'")
print(f"               (annual deposits, annual compounding would give ${fv_annual:,.0f})")
assert monthly == 91.25 and round(fv, -2) == 15800
assert round(decade_365, -3) == 11000   # VO: "about eleven grand"

# ======================================================================= 03B
print("=" * 72, "\n03B  A $1/hr raise is only $8 a day  (assumption: 8-hr days, 5 a week, 52 weeks, pre-tax)\n" + "=" * 72)
raise_hr = 1
r_day = raise_hr * 8
r_week = r_day * 5
r_year = r_week * 52
r_decade = r_year * 10
assert (r_day, r_week, r_year, r_decade) == (8, 40, 2080, 20800)
print(f"  tape : $1 x 8 hrs = ${r_day} a day")
print(f"  rungs: x5 = ${r_week} a week; x52 = ${r_year:,} a year; x10 = ${r_decade:,} a decade (all exact)")
print(f"  hours: 8 x 5 x 52 = {8 * 5 * 52:,} a year")
wd = {y: weekdays(y) for y in range(2026, 2037)}
print("  weekdays per calendar year: " + ", ".join(f"{y}:{n}" for y, n in wd.items()))
assert wd[2026] == 261 and min(wd.values()) >= 260 and max(wd.values()) <= 262
dec_hours = sum(wd[y] for y in range(2026, 2036)) * 8
print(f"  2026-2035 weekdays x 8 hrs = {dec_hours:,} hrs -> ${dec_hours:,} (envelope said $20,800, within {within(r_decade, dec_hours):.2f}%)")
med_hr = BLS_MEDIAN_WEEKLY / 40
print(f"  BLS median ${BLS_MEDIAN_WEEKLY:,}/wk / 40 = ${med_hr:.3f}/hr -> $1 is a {raise_hr / med_hr * 100:.2f}% raise")
assert med_hr == 31.275 and round(raise_hr / med_hr * 100, 1) == 3.2  # $31.275 -> said '≈$31.28'
print(f"  per calendar day: ${r_year:,} / 365 = ${r_year / 365:.2f}")
assert round(r_year / 365, 2) == 5.70

# ======================================================================= 03C (replaced 2026-10-07)
print("=" * 72, "\n03C  Average new-car payment $787/mo  (assumption: the same $787 every month for 10 years;"
      "\n     40-hr weeks, 52 weeks a year)\n" + "=" * 72)
c_year = CAR_PAYMENT * 12
c_decade = c_year * 10
assert (c_year, c_decade) == (9_444, 94_440)
print(f"  rungs: ${CAR_PAYMENT} x 12 = ${c_year:,} a year; x 10 = ${c_decade:,} a decade (exact, 120 payments)")
hrs_year = 40 * 52
hrs_decade = hrs_year * 10
assert (hrs_year, hrs_decade) == (2_080, 20_800)   # 20,800 = 03B's decade of hours (series web)
per_hr = F(c_decade, hrs_decade)
assert per_hr == F(c_year, hrs_year) == F(CAR_PAYMENT * 12, 2080)
print(f"  flip side: ${c_decade:,} / {hrs_decade:,} hrs (10 yrs of 40-hr weeks) = ${float(per_hr):.4f} an hour worked")
print(f"             shown '$4.54': within {within(4.54, float(per_hr)):.3f}%")
assert round(float(per_hr), 2) == 4.54
print(f"  VO 'ninety-four grand': ${round(c_decade, -3):,}, within {within(94_000, c_decade):.2f}% of ${c_decade:,}")
assert round(c_decade, -3) == 94_000
per_day = F(c_year, 365)
print(f"  per calendar day: ${c_year:,} / 365 = ${float(per_day):.4f} -> '$25.87' (pin)")
assert round(float(per_day), 2) == 25.87
print(f"  per clock hour, 24/7: ${c_year:,} / 8,760 = ${c_year / 8760:.3f} (context only: not in the pin)")
assert round(c_year / 8760, 2) == 1.08
share = float(per_hr) / med_hr
print(f"  vs BLS median ${med_hr:.3f}/hr: {share * 100:.2f}% of gross pay = the first {share * 60:.2f} min of every hour (pin: '≈8.7 min')")
assert round(share * 100, 1) == 14.5 and round(share * 60, 1) == 8.7
p1000 = 1000 * 12 / hrs_year
print(f"  a $1,000 payment ({SHARE_1000}% of new-car buyers): ${p1000:.4f} of every hour -> '$5.77' (pin)")
assert round(p1000, 2) == 5.77
print(f"  Edmunds context (the pin uses only Q3 2025 $756): Q2 2026 ${CAR_PAYMENT_Q2}, Q3 2025 ${CAR_PAYMENT_Q3_2025} -> +${CAR_PAYMENT - CAR_PAYMENT_Q3_2025} "
      f"({(CAR_PAYMENT / CAR_PAYMENT_Q3_2025 - 1) * 100:.1f}%) in a year; APR {CAR_APR}%, financed ${CAR_FINANCED:,}, "
      f"interest ${CAR_INTEREST:,}; {SHARE_84}% of loans 84+ months")
assert CAR_PAYMENT - CAR_PAYMENT_Q3_2025 == 31 and round((CAR_PAYMENT / CAR_PAYMENT_Q3_2025 - 1) * 100, 1) == 4.1
# comment-bait answer key: what a few common payments are per hour worked (40 x 52)
for pay in (400, 600, 787, 1000):
    print(f"    ${pay:>5,}/mo -> ${pay * 12 / 2080:.2f} of every hour worked")

# ======================================================================= cross-check: specs vs math
print("=" * 72, "\nCross-check: every number on screen or in a caption traces to the math above\n" + "=" * 72)
SPECS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine", "specs")
NUM = re.compile(r"\d[\d,]*(?:\.\d+)?")
# numbers each episode may show: computed values + factors/assumptions + labels that are names, not math
ALLOWED = {
    "a": {day, week, year, shown_year, shown_decade, 7, 52, 10, 18},           # 18 = "iPhone 18 Pro" (a name)
    "b": {raise_hr, r_day, r_week, r_year, r_decade, 5, 52, 10, 8},
    "c": {CAR_PAYMENT, c_year, c_decade, hrs_decade, 4.54, 12, 10, 40, 3, 2026},  # 3, 2026 = "Q3 2026" (the source)
}


def texts(op):
    t = op.get("type")
    if t == "hook":
        return op["text"] if isinstance(op["text"], list) else [op["text"]]
    if t in ("write", "sticky"):
        return [op["text"]] + ([op["title"]] if op.get("title") else [])
    if t == "lines":
        return [l if isinstance(l, str) else l["text"] for l in op["lines"]]
    if t == "ladder":
        return [f"{r.get('factor', '')} {r['label']} {r['value']}" for r in op["rows"]]
    if t == "stamp":
        return [op["text"]]
    if t == "postmark":
        return []  # "No. 03A" is the episode number
    return []


for s in "abc":
    spec = json.load(open(os.path.join(SPECS, f"03-read-it-ladder-{s}.json")))
    found = set()
    strings = [x for op in spec["ops"] for x in texts(op)] + [c["text"] for c in spec["captions"]]
    for txt in strings:
        for m in NUM.findall(txt.replace("*", "")):
            v = float(m.replace(",", ""))
            v = int(v) if v.is_integer() else v
            assert v in ALLOWED[s], f"03{s.upper()}: '{m}' in {txt!r} does not trace to the math"
            found.add(v)
    print(f"  03{s.upper()}: {len(strings)} strings, numbers on screen/captions {sorted(found)} -> all trace")
    assert spec["loop"] is True and spec["duration"] <= 10
    # VO text = the captions' spoken form, in order
    spoken = " ".join(c.get("say", c["text"]) for c in spec["captions"])
    norm = lambda x: re.sub(r"[^a-z0-9 ]", "", x.lower().replace("-", " ")).split()
    assert norm(spoken) == norm(spec["vo"]), f"03{s.upper()}: vo and caption 'say' text differ"

print("\nall assertions passed")
