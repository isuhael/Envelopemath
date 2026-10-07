#!/usr/bin/env python3
"""Math check for teasers 04A, 04B, 04C (Two Envelopes).

Recomputes every number shown on screen, spoken in the VO, or quoted in a pinned comment or
description, asserts the rounded value we display, and cross-checks the spec files themselves
(curve arrays, crossing positions, on-screen strings). Run: python3 teasers/04-two-envelopes-mathcheck.py
"""
import json
import os
from math import log, inf

HERE = os.path.dirname(os.path.abspath(__file__))
SPECS = os.path.join(HERE, '..', 'engine', 'specs')


def spec(stem):
    with open(os.path.join(SPECS, f'04-two-envelopes-{stem}.json'), encoding='utf-8') as f:
        return json.load(f)


def texts(s):
    """Every string a viewer can read: writes, hooks, cards, pick labels, chart marks/labels, captions."""
    out = []
    for o in s['ops']:
        if o['type'] == 'write':
            out.append(o['text'].replace('*', ''))
        elif o['type'] == 'hook':
            out += [t.replace('*', '') for t in o['text']]
        elif o['type'] == 'envelope':
            out += [c if isinstance(c, str) else c['text'] for c in o['card']]
        elif o['type'] == 'pick':
            for opt in o['options']:
                out += [opt['label'], opt.get('sub', '')]
        elif o['type'] == 'curve':
            out += [m['text'] for m in o.get('marks', []) + o.get('compare', {}).get('marks', [])]
            out += [str(o.get('endLabel', '')), str(o.get('compare', {}).get('endLabel', ''))]
            out += [str(t['label']) for t in o.get('ticks', [])]
        elif o['type'] == 'sticky':
            out.append(o['text'])
        elif o['type'] == 'stuff':
            out += [it['label'] for it in o['items']]
    return out + [c['text'] for c in s['captions']]


def crossing(a, b):
    """Python port of the engine's curve crossover (engine/src/ops/charts.js `crossing`): the fractional
    index where two equal-length series first swap the lead, ignoring a shared start."""
    lead = 0
    for k in range(len(a)):
        d = a[k] - b[k]
        sgn = (d > 0) - (d < 0)
        if sgn == 0:
            continue
        if lead and sgn != lead:
            d0, d1 = a[k - 1] - b[k - 1], d
            f = 0 if d0 == 0 else d0 / (d0 - d1)
            return k - 1 + f, a[k - 1] + f * (a[k] - a[k - 1])
        lead = sgn
    return None


def crossover_label(cv):
    """The label the engine writes at the crossing ("yr {x}" with x to `decimals`) and when it is drawn."""
    hit = crossing(cv['values'], cv['compare']['values'])
    assert hit, f'no crossing in curve at t={cv["t"]}'
    x, _ = hit
    n = len(cv['values']) - 1
    X = cv['crossover']
    label = X['label'].replace('{x}', f'{x:.{X.get("decimals", 1)}f}')
    assert cv.get('ease') == 'linear', 'crossing time below assumes ease: linear'
    t_draw = cv['t'] + 0.4 + (x / n) * cv['dur']
    return x, label, t_draw


def on_screen(s, *needles):
    blob = ' | '.join(texts(s))
    for n in needles:
        assert n in blob, f'{s["id"]}: expected "{n}" on screen'


def within(approx, exact):
    return abs(approx - exact) / abs(exact)


def fv(pmt, i, n):
    """Future value of n end-of-period deposits of pmt at periodic rate i."""
    return pmt * ((1 + i) ** n - 1) / i if n > 0 else 0.0


def lasts_weeks(pv, pmt, j):
    """Weeks a balance pv pays pmt at the end of every week, earning j per week (inf = forever)."""
    if j == 0:
        return pv / pmt
    if pv * j >= pmt:
        return inf
    return log(1 / (1 - pv * j / pmt)) / log(1 + j)


# ============================================================================ 04A
print('=' * 76, '\n04A  $1,000,000 now or $1,000 a week for life?\n' + '=' * 76)
A = spec('a')
LUMP, WEEKLY = 1_000_000, 1_000
weeks = LUMP / WEEKLY
years = weeks / 52
yearly = WEEKLY * 52
rate = yearly / LUMP
print(f'  line 1  $1,000,000 / $1,000 a week = {weeks:,.0f} weeks')
print(f'  line 2  {weeks:,.0f} / 52 = {years:.4f} years -> "19.2 yrs" (within {within(19.2, years):.2%})'
      f' = {int(weeks // 52)} years + {weeks % 52:.0f} weeks')
print(f'  line 3  $1,000 x 52 = ${yearly:,} a year; ${yearly:,} / $1,000,000 = {rate:.1%} (exact)')
assert weeks == 1000 and round(years, 1) == 19.2 and yearly == 52_000 and abs(rate - 0.052) < 1e-12
assert (int(weeks // 52), round(weeks % 52)) == (19, 12)
on_screen(A, '$1,000,000 ÷ $1,000/wk = 1,000 wks', '1,000 wks ÷ 52 =', '≈ 19.2 yrs', '$52,000 ÷ $1,000,000 =',
          '5.2%', 'a year, forever', 'A: $1M today', 'B: +$52K a yr', 'same check forever + you keep $1M',
          'earn 0%? $1M lasts 19.2 yrs', 'earn 5.2%? it lasts forever', '30 yrs')

# chart: cumulative weekly payments (per year) vs the flat lump; the engine computes and circles the crossing
cv = next(o for o in A['ops'] if o['type'] == 'curve')
assert cv['values'] == [yearly * y for y in range(31)] and cv['compare']['values'] == [LUMP] * 31
assert cv['max'] == yearly * 30 == 1_560_000
x, label, t_cross = crossover_label(cv)
assert abs(x - years) < 1e-9 and label == 'yr 19.2'
print(f'  chart   engine crossover at index {x:.4f} (= {weeks:,.0f}/52 years) -> label "{label}"; drawn at t = {t_cross:.2f} s')
assert 'B: +$52K a yr' == cv['endLabel'] and yearly == 52_000

# the twist: 5.2% means 0.1% a week, which pays $1,000 every week and leaves the $1M untouched
j = rate / 52
assert abs(LUMP * j - WEEKLY) < 1e-9
apy = (1 + j) ** 52 - 1
print(f'  twist   5.2% / 52 = {j:.3%} a week -> ${LUMP * j:,.0f} a week forever, principal untouched'
      f' (compounded weekly that is {apy:.2%} a year)')
assert round(apy * 100, 2) == 5.33

# how long the million pays $1,000 a week at other rates (weekly withdrawals, weekly rate = annual / 52)
print('  pin     how long $1M pays $1,000/wk:', end='')
lasts = {}
for r in (0.0, 0.03, 0.04, 0.05, 0.052):
    n = lasts_weeks(LUMP, WEEKLY, r / 52)
    lasts[r] = n / 52
    print(f'  {r:.1%} -> {"forever" if n == inf else f"{n / 52:.1f} yrs"}', end='')
print()
assert round(lasts[0.0], 1) == 19.2 and round(lasts[0.03], 1) == 28.7 and round(lasts[0.04], 1) == 36.7
assert round(lasts[0.05], 1) == 65.2 and lasts[0.052] == inf
# the old on-screen rule ("can't beat 5.2% forever? take the weekly") was wrong: below 5.2% the
# million still pays for decades; the break-even depends on the horizon. Present value of
# $52,000 a year for N years equals $1M at:
for N in (30, 40, 50):
    lo, hi = 1e-9, 0.2
    for _ in range(200):
        m = (lo + hi) / 2
        lo, hi = (m, hi) if yearly * (1 - (1 + m) ** -N) / m > LUMP else (lo, m)
    print(f'  note    {N}-year horizon: the million and the weekly are worth the same at {lo:.2%} a year')
real20 = 1000 / 1.03 ** 20
print(f'  pin     $1,000 in year 20 at an assumed 3% inflation = ${real20:,.2f} of today\'s money -> "$554"')
assert round(real20) == 554

# ============================================================================ 04B
print('=' * 76, '\n04B  $200 a month from 25 or $400 a month from 35? (7%/yr assumed, monthly)\n' + '=' * 76)
B = spec('b')
i = 0.07 / 12
depA, depB = 200 * 480, 400 * 360
print(f'  stuff   A: $200 x 480 months = ${depA:,}   B: $400 x 360 months = ${depB:,}   B - A = ${depB - depA:,}')
assert (depA, depB, depB - depA) == (96_000, 144_000, 48_000)
stuff = next(o for o in B['ops'] if o['type'] == 'stuff')
assert [it['amount'] for it in stuff['items']] == [96_000, 144_000]

A65, B65 = fv(200, i, 480), fv(400, i, 360)
gap65 = A65 - B65
print(f'  race    at 65: A ${A65:,.2f} -> "≈$525K" ({within(525_000, A65):.3%}); '
      f'B ${B65:,.2f} -> "$488K" ({within(488_000, B65):.3%})')
print(f'  sealed  gap ${gap65:,.2f} -> "A by ≈ $37K" (within {within(37_000, gap65):.2%})')
assert round(A65 / 1000) == 525 and round(B65 / 1000) == 488 and round(gap65 / 1000) == 37
cb = next(o for o in B['ops'] if o['type'] == 'curve')
assert all(abs(cb['compare']['values'][y] - fv(200, i, 12 * y)) < 0.006 for y in range(41))  # A (ink)
assert all(abs(cb['values'][y] - fv(400, i, 12 * (y - 10))) < 0.006 for y in range(41))  # B (red)
assert cb['max'] == cb['compare']['values'][-1]
print('  chart   all 41 yearly points of both race lines match the monthly FV formula (to the cent)')

head = fv(200, i, 120)
print(f'  line 1  A at 35: ${head:,.2f} -> "35: $34.6K" / "≈ $34,600" / "almost $35K" (within {within(34_600, head):.3%})')
assert round(head / 100) * 100 == 34_600 and round(head / 1000, 1) == 34.6 and head < 35_000
interest = head * i
interest_env = 34_600 * 0.07 / 12
print(f'  line 2  $34,616.96 x 7% / 12 = ${interest:.2f}; as written ($34,600 x 7% / 12) = ${interest_env:.2f} -> "≈ $202/mo"')
assert round(interest) == 202 and round(interest_env) == 202
print(f'  line 3  B\'s extra deposit $200 < ${interest:.2f}: the gap grows by ${interest - 200:.2f} in month 121')
assert interest > 200
on_screen(B, 'A’s head start at 35 ≈ $34,600', '$34,600 × 7% ÷ 12 ≈ $202/mo', 'B’s extra $200 < $202 →', 'never',
          'A by ≈ $37K', '$525K vs $488K', 'at 6%: B passes A', 'at 63 yrs 8 mo', 'B puts in $48,000 more',
          'with $48K less put in', '35: $34.6K', 'A ≈$525K', 'B ≈$488K', 'A · 40 yrs', 'B · 30 yrs')
assert 144_000 - 96_000 == 48_000
# the race chart: main series = B (red), compare = A (ink); the lines never swap the lead, so the engine
# draws no crossover circle (and the spec asks for none)
assert crossing(cb['values'], cb['compare']['values']) is None and 'crossover' not in cb
assert all(bv <= av for bv, av in zip(cb['values'], cb['compare']['values']))
assert [t['label'] for t in cb['ticks']] == ['25', '35', '45', '55', '65'] and [t['i'] for t in cb['ticks']] == [0, 10, 20, 30, 40]
mk = {m['text']: m['i'] for m in cb['marks'] + cb['compare']['marks']}
assert mk == {'35: $34.6K': 10, 'A ≈$525K': 40, 'B ≈$488K': 40}
print('  chart   B never leads A at any of the 41 points -> no engine crossover; marks at age 35 (i=10) and 65 (i=40)')
twist = next(o for o in B['ops'] if o['type'] == 'pick' and o.get('revealAt'))
assert twist['answer'] == 1 and twist['stamp'] == 'FIRST CLASS'  # at 6%, B (the second envelope) wins

# "never": simulate month by month for 100 years; the gap A - B must rise every single month after 35
a, b, prev_gap = 0.0, 0.0, None
for m in range(1, 1201):
    a = a * (1 + i) + 200
    if m > 120:
        b = b * (1 + i) + 400
    if m >= 120:
        gap = a - b
        if prev_gap is not None:
            assert gap > prev_gap, f'gap shrank in month {m}'
        prev_gap = gap
print('  never   gap rises every month from 35 to 125 (both still depositing): B never catches up')

# the twist: at 6% B passes A before 65
i6 = 0.06 / 12
m_pass = next(m for m in range(121, 481) if fv(400, i6, m - 120) >= fv(200, i6, m))
age_y, age_m = 25 + (m_pass // 12), m_pass % 12
print(f'  twist   at 6%: B first >= A after deposit {m_pass} -> age {age_y} yrs {age_m} mo')
assert (age_y, age_m) == (63, 8)
A65_6, B65_6 = fv(200, i6, 480), fv(400, i6, 360)
print(f'  pin     at 6%, age 65: A ${A65_6:,.0f} vs B ${B65_6:,.0f} (B ahead by ${B65_6 - A65_6:,.0f})')
assert round(B65_6 - A65_6) == 3508

# tie rate at 65: 200[(1+i)^480 - 1] = 400[(1+i)^360 - 1]; with x = (1+i)^120: x^3 - x^2 - x - 1 = 0
lo, hi = 1.5, 2.0
for _ in range(200):
    mid = (lo + hi) / 2
    lo, hi = (mid, hi) if mid ** 3 - mid ** 2 - mid - 1 < 0 else (lo, mid)
x = (lo + hi) / 2
tie = (x ** (1 / 120) - 1) * 12
print(f'  pin     tie at 65 when (1+i)^120 = {x:.5f} (the tribonacci constant) -> {tie:.3%} a year -> "6.11%"')
assert abs(fv(200, tie / 12, 480) - fv(400, tie / 12, 360)) < 1e-6 and round(tie * 100, 2) == 6.11
never = (2 ** (1 / 120) - 1) * 12
print(f'  pin     "never" (head-start interest >= $200) needs (1+i)^120 >= 2 -> rate >= {never:.4%} -> "6.96% or more"')
assert 0.0695 < never < 0.0696  # so "6.95% or more" (the draft) was wrong by a hair; 6.96% is safe
assert (1 + 0.0695 / 12) ** 120 < 2 < (1 + 0.0696 / 12) ** 120
# math-police variant: yearly deposits and yearly compounding
A65y, B65y = 2400 * ((1.07 ** 40 - 1) / 0.07), 4800 * ((1.07 ** 30 - 1) / 0.07)
d0 = 2400 * ((1.07 ** 10 - 1) / 0.07)
n_catch = log((2400 / 0.07) / ((2400 / 0.07) - d0)) / log(1.07)
print(f'  pin     yearly compounding: A ${A65y:,.0f} vs B ${B65y:,.0f} at 65 (A still ahead); '
      f'B would only catch up at about age {35 + n_catch:.1f}')
assert A65y > B65y and 85 < 35 + n_catch < 86

# ============================================================================ 04C
print('=' * 76, '\n04C  $5,000 to sign or $2 more an hour?\n' + '=' * 76)
C = spec('c')
BONUS, RAISE, HOURS = 5000, 2, 40
weekly = RAISE * HOURS
cross = BONUS / weekly
print(f'  line 1  $2 x 40 hrs = ${weekly} a week')
print(f'  line 2  $5,000 / $80 = {cross} weeks = {cross * 7 / (365.25 / 12):.1f} months')
assert weekly == 80 and cross == 62.5 and round(cross * 7 / (365.25 / 12), 1) == 14.4
print(f'  verdict after 62 weeks the raise has paid ${weekly * 62:,}; after 63 weeks ${weekly * 63:,}'
      ' -> "leave < 62.5 wks? / stay 62.5+ wks?"')
assert weekly * 62 < BONUS < weekly * 63
three = weekly * 52 * 3
print(f'  line 3  $80 x 52 wks x 3 yrs = ${three:,} (vs the $5,000 bonus: {three / BONUS:.1f}x)')
assert three == 12_480
on_screen(C, '$2 × 40 hrs = $80 a week', '$5,000 ÷ $80 =', '62.5 weeks', '$80 × 52 wks × 3 yrs =', '$12,480',
          'A: $5,000 once', 'B: +$80 a wk', 'leave < 62.5 wks?', 'stay 62.5+ wks?', 'raise, 40 hrs/wk', '1 yr', '2 yrs')
cc = next(o for o in C['ops'] if o['type'] == 'curve')
assert cc['values'] == [weekly * w for w in range(105)] and cc['compare']['values'] == [BONUS] * 105
assert cc['max'] == weekly * 104 == 8320
x, label, t_cross = crossover_label(cc)
assert x == cross and label == 'wk 62.5'
print(f'  chart   engine crossover at week {x} -> label "{label}"; drawn at t = {t_cross:.2f} s')
for yrs in (1, 2, 3, 5):
    print(f'  pin     after {yrs} yr: raise ${weekly * 52 * yrs:,} vs bonus $5,000')
assert weekly * 52 == 4160 and weekly * 52 * 2 == 8320 and weekly * 52 * 5 == 20_800

# ============================================================== "for scale" context (descriptions only)
# BLS median usual weekly earnings, full-time wage and salary workers, Q2 2026 = $1,251 (not seasonally
# adjusted). Source: BLS "Usual Weekly Earnings of Wage and Salary Workers, Second Quarter 2026", released
# 2026-07-21 (https://www.bls.gov/news.release/archives/wkyeng_07212026.htm). Re-verified by web search on
# 2026-10-07; still the latest release (Q3 2026 is scheduled for 2026-10-28, so re-check if posting after that).
BLS_WEEKLY = 1251
share_a = WEEKLY / BLS_WEEKLY            # 04A: $1,000 a week vs the median full-time weekly pay
share_c = weekly / BLS_WEEKLY            # 04C: the raise's $80 a week vs the same median
print(f'  scale   04A: $1,000 / ${BLS_WEEKLY:,} = {share_a:.2%} -> "about 80%"; '
      f'04C: $80 / ${BLS_WEEKLY:,} = {share_c:.2%} -> "about 6.4%"')
assert round(share_a * 100) == 80 and round(share_c * 100, 1) == 6.4

print('\nall assertions passed')
