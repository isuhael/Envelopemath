#!/usr/bin/env python3
"""Math check for teasers 03A, 03B, 03C (Envelope Math: Day to Decade / The Read-It Ladder).

Recomputes every number that is written on the envelope, spoken in the VO, or quoted in a
pinned comment, from the sourced inputs and the labelled assumptions only. It asserts each
rounded value we display and prints how far the envelope's rounding sits from the exact figure.
Run: python3 teasers/03-read-it-ladder-mathcheck.py
"""
import calendar
import datetime as dt
from fractions import Fraction as F
from math import comb


def within(shown, exact):
    """Relative gap between the envelope's rounded figure and the exact one, in %."""
    return abs(shown - exact) / exact * 100


def weekdays(year):
    return sum(1 for d in range(1, 367 if calendar.isleap(year) else 366)
               if (dt.date(year, 1, 1) + dt.timedelta(d - 1)).weekday() < 5)


# ---------------------------------------------------------------- sourced inputs (2026-10-07)
IPHONE_18_PRO = 1199          # Apple, Sept 9 2026 event (CNBC / MacRumors), starting price
BLS_MEDIAN_WEEKLY = 1251      # BLS Usual Weekly Earnings, Q2 2026, full-time (released 2026-07-21)
PB_WHITE, PB_RED = 69, 26     # Powerball matrix: 5 of 69 white balls + 1 of 26 Powerballs
PB_PRICE = 2                  # Powerball, $2 per play (official prize chart)
PB_ANY_PRIZE_ODDS = 24.87     # official chart: overall odds of winning any prize, 1 in 24.87

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
# daily habit that would exactly equal one iPhone a year (pinned-comment nuance)
print(f"  break-even habit: ${IPHONE_18_PRO} / 365 = ${IPHONE_18_PRO / 365:.2f} a day")
assert round(IPHONE_18_PRO / 365, 2) == 3.28
# the invest-it camp's number (pinned comment, labelled assumption: 7%/yr, monthly compounding)
monthly = year / 12
r = 0.07 / 12
fv = monthly * ((1 + r) ** 120 - 1) / r
print(f"  invest-camp: ${monthly:.2f}/mo at an assumed 7%/yr for 120 months = ${fv:,.0f}  -> '≈$15,800'")
assert monthly == 91.25 and round(fv, -2) == 15800

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
print(f"  BLS median ${BLS_MEDIAN_WEEKLY:,}/wk / 40 = ${med_hr:.3f}/hr -> $1 is a {raise_hr / med_hr * 100:.1f}% raise")
assert med_hr == 31.275 and round(raise_hr / med_hr * 100, 1) == 3.2  # $31.275 -> said '≈$31.28'
print(f"  per calendar day: ${r_year:,} / 365 = ${r_year / 365:.2f}")
assert round(r_year / 365, 2) == 5.70

# ======================================================================= 03C
print("=" * 72, "\n03C  $2 a day on Powerball  (assumption: one $2 ticket every day for 10 years)\n" + "=" * 72)
N = comb(PB_WHITE, 5) * PB_RED
assert N == 292_201_338
print(f"  jackpot odds per ticket: C(69,5) x 26 = {comb(PB_WHITE, 5):,} x 26 = 1 in {N:,}")
c_year = PB_PRICE * 365
c_decade = c_year * 10
tickets = 365 * 10
assert (c_year, c_decade, tickets) == (730, 7300, 3650)
print(f"  rungs: $2 x 365 = ${c_year} a year; x10 = ${c_decade:,} a decade ({tickets:,} tickets)")
print(f"  with 2-3 leap days in a decade: 3,652-3,653 tickets = ${2 * 3652:,}-${2 * 3653:,}")
p1 = F(1, N)
p_add = tickets * p1                       # distinct tickets: exact if several share one draw
p_ind = 1 - (1 - p1) ** tickets            # tickets on 3,650 different draws (independent)
one_in_add = float(1 / p_add)
one_in_ind = 1 / float(p_ind)
print(f"  odds of at least one jackpot in {tickets:,} tickets: 1 in {one_in_add:,.2f} (additive) / 1 in {one_in_ind:,.2f} (independent draws)")
assert round(one_in_add) == 80055 and abs(one_in_ind - one_in_add) < 1
print(f"  shown '≈1 in 80,000': within {within(80000, one_in_add):.2f}%")
assert within(80000, one_in_add) < 0.1
print(f"  per-ticket odds unchanged on ticket #3,650: still 1 in {N:,}")
print(f"  flip side: P(spend the ${c_decade:,} | you buy every day) = 1  -> '1 in 1'")
small_wins = tickets / PB_ANY_PRIZE_ODDS
print(f"  any prize, 1 in {PB_ANY_PRIZE_ODDS} per ticket -> expected small wins in a decade: {small_wins:.1f} (pinned: '≈147')")
assert round(small_wins) == 147
print(f"  a lifetime habit (50 yrs = 18,250 tickets, $36,500): 1 in {N / 18250:,.0f}")
from math import log
k_add = N / 1000                                   # tickets for a 1-in-1,000 shot (additive)
k_ind = log(1 - 0.001) / log(1 - 1 / N)            # same, independent draws
print(f"  comment-bait answer: 1 in 1,000 needs {k_add:,.0f} tickets = {k_add / 365:,.1f} years "
      f"({k_ind / 365:,.1f} yrs if every ticket is a separate draw) -> '≈800 years', ≈${2 * k_add:,.0f}")
assert round(k_add / 365, -2) == 800 and round(k_ind / 365, -2) == 800


# ======================================================================= QA additions (2026-10-07)
print("=" * 72, "\nQA  checks added by the fact-check pass\n" + "=" * 72)
# 03A back: the ink now shows the exact year, and the claim must not hang on one unverified price.
assert f"(exactly ${year:,})" == "(exactly $1,095)"
min_price_for_claim = year + 1                      # "a year of it costs less than one iPhone 18 Pro"
print(f"  03A claim 'a year < one iPhone 18 Pro' holds for any starting price >= ${min_price_for_claim:,}")
for p_ in (1099, 1199):  # 1099 = iPhone 17 Pro 2025 launch price (QA reference knowledge, not re-searched); 1199 = writer-sourced 18 Pro price
    assert year < p_
    print(f"    at ${p_:,}: year ${year:,} is ${p_ - year} less; daily habit that still fits: up to ${int(p_ / 365 * 100) / 100:.2f}")
assert int(IPHONE_18_PRO / 365 * 100) / 100 == 3.28 and 3.28 * 365 < IPHONE_18_PRO < 3.29 * 365
# 03A VO rounding: "about eleven grand"
assert round(decade_365, -3) == 11000
# invest-camp figure is end-of-month deposits, monthly compounding (annual compounding gives less)
fv_annual = year * ((1.07 ** 10 - 1) / 0.07)
print(f"  03A invest-camp: monthly compounding ${fv:,.0f} (≈$15,800); annual deposits/compounding ${fv_annual:,.0f}")
# 03B VO "twenty thousand eight hundred" is exact; 03C VO "seventy-three hundred", "one in eighty thousand"
assert r_decade == 20800 and c_decade == 7300 and round(one_in_add, -4) == 80000
# 03C: overall 'any prize' odds re-derived from the matrix (chart: 1 in 24.87)
def ways(k, pb):
    return comb(5, k) * comb(PB_WHITE - 5, 5 - k) * (1 if pb else PB_RED - 1)
win_ways = sum(ways(k, pb) for k, pb in [(5, 1), (5, 0), (4, 1), (4, 0), (3, 1), (3, 0), (2, 1), (1, 1), (0, 1)])
any_odds = N / win_ways
print(f"  03C any-prize odds from the matrix: 1 in {any_odds:.3f} (chart 24.87); expected prizes in 3,650 tickets: {tickets / any_odds:.1f}")
assert round(any_odds, 2) == PB_ANY_PRIZE_ODDS and round(tickets / any_odds) == 147

print("\nall assertions passed")
