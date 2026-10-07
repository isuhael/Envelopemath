#!/usr/bin/env python3
"""Math check for teasers 04A, 04B, 04C (Two Envelopes).

Recomputes every number shown on screen, spoken in the VO, or quoted in a pinned comment or
description, and asserts the rounded value we display. Run: python3 teasers/04-two-envelopes-mathcheck.py
"""
from math import log


def within(approx, exact):
    return abs(approx - exact) / abs(exact)


def fv(pmt, i, n):
    """Future value of n end-of-period deposits of pmt at periodic rate i."""
    return pmt * ((1 + i) ** n - 1) / i if n > 0 else 0.0


BLS_WEEKLY = 1251  # BLS median usual weekly earnings, full-time wage & salary workers, Q2 2026 (released 2026-07-21)

# ============================================================================ 04A
print("=" * 76, "\n04A  $1,000,000 now or $1,000 a week for life?\n" + "=" * 76)
LUMP, WEEKLY = 1_000_000, 1_000
weeks = LUMP / WEEKLY
years = weeks / 52
yearly = WEEKLY * 52
rate = yearly / LUMP
print(f"  line 1  $1,000,000 / $1,000 a week = {weeks:,.0f} weeks")
print(f"  line 2  {weeks:,.0f} / 52 = {years:.4f} years -> '19.2 yrs' (within {within(19.2, years):.2%})")
print(f"          = {int(weeks // 52)} years + {weeks - 52 * (weeks // 52):.0f} weeks")
print(f"  line 3  $1,000 x 52 = ${yearly:,} a year; ${yearly:,} / $1,000,000 = {rate:.1%} (exact)")
assert weeks == 1000 and round(years, 1) == 19.2 and yearly == 52_000 and abs(rate - 0.052) < 1e-12
assert (int(weeks // 52), round(weeks % 52)) == (19, 12)
# chart: cumulative weekly payments vs the flat lump; first whole year where B >= A
first_year = next(y for y in range(100) if yearly * y >= LUMP)
print(f"  chart   weekly total passes $1M during year {first_year} (crossing at {years:.2f}); "
      f"30-yr axis top = ${yearly * 30:,}")
assert first_year == 20
# perpetuity check: $1M at 5.2% pays exactly $52,000 a year without shrinking
assert abs(LUMP * 0.052 - yearly) < 1e-6
# pinned-comment context: what a fixed $1,000 is worth after 20 years at an ASSUMED 3% inflation
real20 = 1000 / 1.03 ** 20
print(f"  pin     $1,000 in year 20 at an assumed 3% inflation = ${real20:,.2f} of today's money -> '$554'")
assert round(real20) == 554
# present value of $52,000/yr (end of year) for N years at r: shows the answer moves with rate & horizon
for r in (0.03, 0.05, 0.07):
    row = []
    for n in (20, 30, 40):
        pv = yearly * (1 - (1 + r) ** -n) / r
        row.append(f"{n} yrs ${pv / 1e6:.2f}M")
    print(f"  pin     PV of $52K/yr at {r:.0%}: " + ", ".join(row))
pv_3_30 = yearly * (1 - 1.03 ** -30) / 0.03
pv_7_30 = yearly * (1 - 1.07 ** -30) / 0.07
assert round(pv_3_30 / 1e6, 2) == 1.02 and round(pv_7_30 / 1e6, 2) == 0.65
share = WEEKLY / BLS_WEEKLY
print(f"  desc    $1,000 / $1,251 (BLS median full-time week, Q2 2026) = {share:.1%} -> 'about 80%'")
assert round(share, 2) == 0.80

# ============================================================================ 04B
print("=" * 76, "\n04B  $200 a month at 25 or $400 a month at 35? (7%/yr assumed, monthly)\n" + "=" * 76)
i = 0.07 / 12
depA, depB = 200 * 480, 400 * 360
print(f"  stuff   A: $200 x 480 months = ${depA:,}   B: $400 x 360 months = ${depB:,}   B - A = ${depB - depA:,}")
assert (depA, depB, depB - depA) == (96_000, 144_000, 48_000)

A65, B65 = fv(200, i, 480), fv(400, i, 360)
gap65 = A65 - B65
print(f"  race    at 65: A ${A65:,.2f} -> '≈$525K' ({within(525_000, A65):.3%}); "
      f"B ${B65:,.2f} -> '$488K' ({within(488_000, B65):.3%})")
print(f"  sealed  gap ${gap65:,.2f} -> 'A by ≈ $37K' (within {within(37_000, gap65):.2%})")
assert round(A65 / 1000) == 525 and round(B65 / 1000) == 488 and round(gap65 / 1000) == 37

head = fv(200, i, 120)
print(f"  mark    A at 35: ${head:,.2f} -> '35: $34.6K' / '≈ $34,600' (within {within(34_600, head):.3%})")
assert round(head / 100) * 100 == 34_600 and round(head / 1000, 1) == 34.6
interest = head * i
interest_env = 34_600 * 0.07 / 12
print(f"  line 2  $34,616.96 x 7% / 12 = ${interest:.2f}; as written ($34,600 x 7% / 12) = ${interest_env:.2f} -> '≈ $202/mo'")
assert round(interest) == 202 and round(interest_env) == 202
print(f"  line 3  B's extra deposit $200 < ${interest:.2f}: the gap grows by ${interest - 200:.2f} in month 121")
assert interest > 200

# "never": simulate month by month for 100 years; the gap A - B must rise every single month after 35
a, b, prev_gap, checkpoints = 0.0, 0.0, None, {}
for m in range(1, 1201):
    a = a * (1 + i) + 200
    if m > 120:
        b = b * (1 + i) + 400
    if m >= 120:
        gap = a - b
        if prev_gap is not None:
            assert gap > prev_gap, f"gap shrank in month {m}"
        prev_gap = gap
    if m % 120 == 0:
        checkpoints[25 + m // 12] = (a, b, a - b)
for age in (35, 45, 55, 65):
    ca, cb, cg = checkpoints[age]
    print(f"  race    age {age}: A ${ca:>11,.0f}  B ${cb:>11,.0f}  gap ${cg:>8,.0f}")
print("  never   gap rises every month from 35 to 125 (both still depositing): B never catches up")
assert abs(checkpoints[65][0] - A65) < 0.01 and abs(checkpoints[65][1] - B65) < 0.01

# the twist: at 6% B passes A before 65
i6 = 0.06 / 12
m_pass = next(m for m in range(121, 481) if fv(400, i6, m - 120) >= fv(200, i6, m))
age_y, age_m = 25 + (m_pass // 12), m_pass % 12
print(f"  twist   at 6%: B first >= A after deposit {m_pass} -> age {age_y} yrs {age_m} mo")
assert (age_y, age_m) == (63, 8)
A65_6, B65_6 = fv(200, i6, 480), fv(400, i6, 360)
print(f"  pin     at 6%, age 65: A ${A65_6:,.0f} vs B ${B65_6:,.0f} (B ahead by ${B65_6 - A65_6:,.0f})")
assert round(B65_6 - A65_6) == 3508

# tie rate at 65: 200[(1+i)^480 - 1] = 400[(1+i)^360 - 1]; with x = (1+i)^120: x^3 - x^2 - x - 1 = 0
lo, hi = 1.5, 2.0
for _ in range(200):
    mid = (lo + hi) / 2
    lo, hi = (mid, hi) if mid ** 3 - mid ** 2 - mid - 1 < 0 else (lo, mid)
x = (lo + hi) / 2
tie = (x ** (1 / 120) - 1) * 12
print(f"  pin     tie at 65 when (1+i)^120 = {x:.5f} (the tribonacci constant) -> {tie:.3%} a year -> 'about 6.1%'")
assert abs(fv(200, tie / 12, 480) - fv(400, tie / 12, 360)) < 1e-6 and round(tie * 100, 1) == 6.1
never = (2 ** (1 / 120) - 1) * 12
print(f"  pin     'never' (head-start interest >= $200) needs (1+i)^120 >= 2 -> rate >= {never:.3%}")
assert 0.069 < never < 0.07
# math-police variant: yearly deposits and yearly compounding
A65y, B65y = 2400 * ((1.07 ** 40 - 1) / 0.07), 4800 * ((1.07 ** 30 - 1) / 0.07)
d0 = 2400 * ((1.07 ** 10 - 1) / 0.07)
n_catch = log((2400 / 0.07) / ((2400 / 0.07) - d0)) / log(1.07)
print(f"  pin     yearly compounding: A ${A65y:,.0f} vs B ${B65y:,.0f} at 65 (A still ahead); "
      f"B would only catch up at about age {35 + n_catch:.1f}")
assert A65y > B65y and 85 < 35 + n_catch < 86

# ============================================================================ 04C
print("=" * 76, "\n04C  $5,000 to sign or $2 more an hour?\n" + "=" * 76)
BONUS, RAISE, HOURS = 5000, 2, 40
weekly = RAISE * HOURS
cross = BONUS / weekly
print(f"  line 1  $2 x 40 hrs = ${weekly} a week")
print(f"  line 2  $5,000 / $80 = {cross} weeks = {cross / 52 * 12:.1f} months")
assert weekly == 80 and cross == 62.5
print(f"  verdict after 62 weeks the raise has paid ${weekly * 62:,}; after 63 weeks ${weekly * 63:,} "
      "-> 'leave before wk 63 / stay past wk 63'")
assert weekly * 62 < BONUS < weekly * 63
yearly_c = weekly * 52
print(f"  line 3  $80 x 52 = ${yearly_c:,} a year -> '+$4,160 every year after'")
assert yearly_c == 4160
for yrs in (1, 2, 3, 5):
    print(f"  pin     after {yrs} yr: raise ${yearly_c * yrs:,} vs bonus $5,000")
assert yearly_c * 2 == 8320 and yearly_c * 5 == 20_800
hourly_med = BLS_WEEKLY / 40
print(f"  desc    BLS median full-time week $1,251 / 40 = ${hourly_med:.2f}/hr; $2 = {RAISE / hourly_med:.1%} raise")
assert round(RAISE / hourly_med * 100, 1) == 6.4

print("\nall assertions passed")
