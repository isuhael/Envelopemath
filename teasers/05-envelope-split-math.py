#!/usr/bin/env python3
"""Math check for approach #5, The Envelope Split (teasers 05A, 05B, 05C).

Recomputes every number that appears on screen, in the voice-over or in a pinned comment,
and asserts the values the scripts and specs use. Run:  python3 teasers/05-envelope-split-math.py

Real-world inputs (verified 2026-10-07; sources in teasers/05-envelope-split.md):
  BLS median usual weekly earnings, full-time wage & salary workers, Q2 2026 ... $1,251
  BLS median annual wage, registered nurses, May 2025 ......................... $97,550
  Federal minimum wage (= Texas minimum wage) ................................. $7.25/hr
  2026 standard deduction, single ............................................. $16,100
  2026 brackets, single: 10% to $12,400 · 12% to $50,400 · 22% to $105,700
  FICA, employee: 6.2% Social Security (wage base $184,500) + 1.45% Medicare
  iPhone 18 Pro starting price (Apple, Sept 2026) ............................. $1,199
  Texas max combined sales tax (6.25% state + up to 2% local) ................. 8.25%
  NAR median existing-home price, August 2026 ................................. $429,100
  NAR 2025 Profile: first-time buyers' median down payment 10%, median age 40
  Fidelity 50/15/5: 50% of take-home on essentials, 5% of take-home to short-term savings;
  Fidelity emergency fund: 3 to 6 months of essential expenses
"""
from decimal import Decimal as D, ROUND_HALF_UP
import math
from fractions import Fraction as F

def c(x):  # round to cents
    return D(x).quantize(D('0.01'), ROUND_HALF_UP)

def d(x):  # round to whole dollars (what the stuff envelopes show)
    return int(D(x).quantize(D('1'), ROUND_HALF_UP))

def pct_off(est, exact):
    return abs(D(est) - D(exact)) / D(exact) * 100  # print with 2 decimals: 0.515% is NOT 'within 0.5%'

STD = D(16100)
BRACKETS = [(D(12400), D('0.10')), (D(50400), D('0.12')), (D(105700), D('0.22')), (D(201775), D('0.24'))]
SS_RATE, SS_BASE, MED_RATE = D('0.062'), D(184500), D('0.0145')
PAYS = 26  # paid every two weeks

def federal_tax(gross):
    taxable, tax, lo = max(D(0), gross - STD), D(0), D(0)
    for hi, rate in BRACKETS:
        if taxable > lo:
            tax += (min(taxable, hi) - lo) * rate
        lo = hi
    return tax

def take_home(gross):
    tax = federal_tax(gross)
    fica = min(gross, SS_BASE) * SS_RATE + gross * MED_RATE
    return tax, fica, (gross - tax - fica) / PAYS

SPLIT = {'MUST': D('0.50'), 'FUTURE': D('0.15'), 'OOPS': D('0.05'), 'FUN': D('0.30')}
assert sum(SPLIT.values()) == 1

def show_split(name, pay):
    ten = c(pay * D('0.10'))
    print(f'  10% (move the decimal) = ${ten}')
    exact = {k: c(pay * v) for k, v in SPLIT.items()}
    rounded = {k: d(pay * v) for k, v in SPLIT.items()}
    # the spoken shortcuts reproduce the exact split
    assert exact['OOPS'] == c(pay * D('0.10') / 2)                     # 5% = half of 10%
    assert exact['FUTURE'] == c(pay * D('0.10') + pay * D('0.05'))     # 15% = 10% + 5%
    assert exact['FUN'] == c(pay * D('0.10') * 3)                      # 30% = three tens
    assert exact['MUST'] == c(pay / 2)                                 # 50% = half
    for k in SPLIT:
        print(f'  {k:6s} {int(SPLIT[k]*100):2d}%  exact ${exact[k]:>9,}   envelope shows ${rounded[k]:,}')
    print(f'  envelopes add to ${sum(rounded.values()):,} (take-home ${c(pay):,})')
    return exact, rounded

print('=' * 72)
print('05A  The median paycheck: one envelope takes 30 months')
print('=' * 72)
weekly = D(1251)
gross_a = weekly * 52
tax_a, fica_a, pay_a = take_home(gross_a)
print(f'  gross ${weekly:,}/wk x 52 = ${gross_a:,}/yr  (per paycheck ${gross_a / PAYS:,.2f})')
print(f'  federal income tax ${c(tax_a):,} · FICA ${c(fica_a):,}')
print(f'  take-home per paycheck = ${c(pay_a):,}')
assert c(gross_a / PAYS) == D('2502.00') and c(tax_a) == D('5626.24') and c(fica_a) == D('4976.48')
assert c(pay_a) == D('2094.20')
ex_a, rd_a = show_split('A', c(pay_a))
assert rd_a == {'MUST': 1047, 'FUTURE': 314, 'OOPS': 105, 'FUN': 628} and sum(rd_a.values()) == 2094
assert d(c(pay_a) * D('0.10')) == 209
# time to fill OOPS: 3 months of MUST at 5% of pay per month
months = 3 * SPLIT['MUST'] / SPLIT['OOPS']
monthly_pay = c(pay_a) * PAYS / 12
target = 3 * monthly_pay * SPLIT['MUST']
paychecks = target / ex_a['OOPS']
print(f'  OOPS goal = 3 months of MUST = 3 x 50% = {3*SPLIT["MUST"]*100:.0f}% of a month\'s pay = ${c(target):,}')
print(f'  {3*SPLIT["MUST"]*100:.0f}% / 5% a month = {months} months = {paychecks:.2f} paychecks')
assert months == 30 and c(paychecks) == 65
assert 65 * ex_a['OOPS'] == c(target) == D('6806.15')  # 65 deposits of $104.71 hit the target to the cent
print(f'  check: 65 x ${ex_a["OOPS"]} = ${65 * ex_a["OOPS"]:,} = 3 months of MUST (${c(target):,})')
for label, gross in [('median', gross_a), ('nurse', D(97550)), ('$7.25/hr', D('7.25') * 2080)]:
    p = c(take_home(gross)[2])
    monthly = F(p) * PAYS / 12                       # exact fractions: no rounding drift
    m = (3 * monthly * F(SPLIT['MUST'])) / (monthly * F(SPLIT['OOPS']))
    print(f'  {label:9s} take-home ${p:>8,}  -> OOPS full in {m} months')
    assert m == 30
six = 6 * SPLIT['MUST'] / SPLIT['OOPS']
print(f'  6 months of cushion: 6 x 50% / 5% = {six} months ({six * PAYS / 12} paychecks)')
assert six == 60
print(f'  pinned: exact 30.0 months, 65 paychecks (envelope said 30: within {pct_off(30, months):.2f}%)')

print()
print('=' * 72)
print('05B  $7.25/hr first job vs. the $1,199 iPhone 18 Pro')
print('=' * 72)
gross_b = D('7.25') * 80
annual_b = D('7.25') * 40 * 52
tax_b = federal_tax(annual_b)
fica_b = c(gross_b * (SS_RATE + MED_RATE))
pay_b = gross_b - fica_b
print(f'  80 hrs x $7.25 = ${gross_b} per paycheck; full year ${annual_b:,} vs standard deduction ${STD:,}')
print(f'  federal income tax owed on the year: ${tax_b}  ->  only FICA: ${fica_b}')
print(f'  take-home per paycheck = ${pay_b}')
assert gross_b == 580 and annual_b == 15080 and tax_b == 0 and fica_b == D('44.37') and pay_b == D('535.63')
ex_b, rd_b = show_split('B', pay_b)
assert rd_b == {'MUST': 268, 'FUTURE': 80, 'OOPS': 27, 'FUN': 161} and sum(rd_b.values()) == 536
assert c(pay_b * D('0.10')) == D('53.56')
fun_b = ex_b['FUN']
phone, tx = D(1199), D('0.0825')
rough = phone / 161
exact_pre = phone / fun_b
print(f'  envelope: $1,199 / $161 = {rough:.4f} ~ 7.45 (on screen)  -> 8 paychecks = 16 weeks')
print(f'  exact pre-tax: $1,199 / ${fun_b} = {exact_pre:.4f} -> {math.ceil(exact_pre)} paychecks')
assert round(rough, 2) == D('7.45')  # QA 2026-10-07: screen said 7.5, but 1,199/161 = 7.447 rounds to 7.4 (1 dp) / 7.45 (2 dp)
assert math.ceil(exact_pre) == 8 and math.ceil(rough) == 8
tax_amt = c(phone * tx)
total = phone + tax_amt
print(f'  Texas tax 8.25%: ${tax_amt}  -> total ${total:,}')
assert tax_amt == D('98.92') and total == D('1297.92')
eight = fun_b * 8
short = total - eight
need = total / fun_b
print(f'  8 deposits of ${fun_b} = ${eight:,} -> ${short} short;  ${total:,} / ${fun_b} = {need:.3f} -> {math.ceil(need)} paychecks = {2*math.ceil(need)} weeks')
assert eight == D('1285.52') and short == D('12.40') and math.ceil(need) == 9
state_only = c(phone * D('1.0625'))
breakeven = (eight / phone - 1) * 100
covers = lambda rate: phone + c(phone * rate) <= eight
assert covers(D('0.072')) and not covers(D('0.0725'))  # 'under 7.22%' was wrong at 7.217-7.219%; say '7.2% or less'
print(f'  at the bare 6.25% state rate: ${state_only:,} -> {math.ceil(state_only / fun_b)} paychecks; '
      f'8 paychecks stop covering it above a {breakeven:.3f}% combined rate (so: covered at 7.2% or less)')
assert state_only == D('1273.94') and math.ceil(state_only / fun_b) == 8 and round(breakeven, 1) == D('7.2')
fun_median = ex_a['FUN']
print(f'  median FUN ${fun_median}: pre-tax {phone/fun_median:.3f} -> {math.ceil(phone/fun_median)} paychecks; '
      f'with tax {total/fun_median:.3f} -> {math.ceil(total/fun_median)} paychecks')
assert math.ceil(total / fun_median) == 3 and math.ceil(phone / fun_median) == 2
# TikTok-cut variant: part-time, 20 hrs/wk
pt_pay = D('7.25') * 40 - c(D('7.25') * 40 * (SS_RATE + MED_RATE))
pt_fun = c(pt_pay * SPLIT['FUN'])
print(f'  TikTok variant, 20 hrs/wk: take-home ${pt_pay} -> FUN ${pt_fun} -> {total/pt_fun:.2f} -> {math.ceil(total/pt_fun)} paychecks with tax')
assert pt_pay == D('267.81') and pt_fun == D('80.34') and math.ceil(total / pt_fun) == 17
print(f'  pinned: exact {exact_pre:.2f} paychecks pre-tax (envelope said ~7.45: within {pct_off("7.45", exact_pre):.2f}%); '
      f'with tax {need:.2f} -> 9 paychecks')

print()
print('=' * 72)
print("05C  A nurse's paycheck vs. the $429,100 median home")
print('=' * 72)
gross_c = D(97550)
tax_c, fica_c, pay_c = take_home(gross_c)
print(f'  ${gross_c:,}/yr  (per paycheck gross ${c(gross_c / PAYS):,})')
print(f'  federal income tax ${c(tax_c):,} · FICA ${c(fica_c):,}')
print(f'  take-home per paycheck = ${c(pay_c):,}')
assert c(gross_c / PAYS) == D('3751.92') and c(tax_c) == D('12631.00') and c(fica_c) == D('7462.58')
assert c(pay_c) == D('2979.09')
assert c(gross_c / 2080) == D('46.90')  # BLS also lists $46.90/hr
ex_c, rd_c = show_split('C', c(pay_c))
assert rd_c == {'MUST': 1490, 'FUTURE': 447, 'OOPS': 149, 'FUN': 894}
print(f'  note: each envelope rounds to the dollar, so they add to ${sum(rd_c.values()):,} (pinned comment says so)')
assert d(c(pay_c) * D('0.10')) == 298
home = D(429100)
dp10, dp20 = home * D('0.10'), home * D('0.20')
fut = ex_c['FUTURE']
rough_c = D(43000) / 450
n10, n20 = dp10 / fut, dp20 / fut
print(f'  10% down = ${dp10:,.0f};  20% down = ${dp20:,.0f}')
print(f'  envelope: $43,000 / $450 = {rough_c:.2f} ~ 96 paychecks')
print(f'  exact: ${dp10:,.0f} / ${fut} = {n10:.2f} paychecks = {n10/PAYS:.3f} years '
      f'= 3 yrs {((n10/PAYS) - 3) * 12:.1f} months  (97th paycheck tops it off: 96 x ${fut} = ${96*fut:,})')
print(f'  20%: ${dp20:,.0f} / ${fut} = {n20:.2f} paychecks = {n20/PAYS:.2f} years')
assert dp10 == 42910 and dp20 == 85820
assert round(rough_c) == 96 and round(n10) == 96 and c(n10) == D('96.03')
assert int(n10 / PAYS) == 3 and round(((n10 / PAYS) - 3) * 12) == 8
assert round(n20) == 192 and round(n20 / PAYS, 1) == D('7.4')
med_fut = ex_a['FUTURE']
print(f'  TikTok third bar, median worker: ${dp10:,.0f} / ${med_fut} = {dp10/med_fut:.1f} paychecks = {dp10/med_fut/PAYS:.2f} years')
assert round(dp10 / med_fut, 1) == D('136.6') and round(dp10 / med_fut / PAYS, 1) == D('5.3')
print(f'  pinned: exact {n10:.2f} paychecks (envelope said ~96: within {pct_off(96, n10):.2f}%)')
print()
print('All assertions passed.')
