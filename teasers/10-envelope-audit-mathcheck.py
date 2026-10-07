#!/usr/bin/env python3
"""Math check for approach #10, The Envelope Audit (teasers 10A, 10B, 10C).

Recomputes every number that appears on screen, in the voice-over, on the
sealed card, in the pinned comments and in the "claim survival" stat, then
reads the three specs and asserts that what is drawn matches what is computed.
Inputs are the real-world figures listed in teasers/10-envelope-audit.md
(sources, dates and verification status there).
Run from anywhere: python3 teasers/10-envelope-audit-mathcheck.py
"""
from decimal import Decimal as D, ROUND_HALF_UP
from pathlib import Path
import json
import math
import re

ok_count = 0
SPECS = Path(__file__).resolve().parent.parent / "engine" / "specs"


def check(label, got, want, tol=1e-9):
    """Assert that a computed value matches what the script/screen says."""
    global ok_count
    good = abs(got - want) <= tol
    flag = "ok " if good else "XX "
    print(f"  {flag} {label}: computed {got:,.4f} | on screen {want:,.4f}")
    if not good:
        raise SystemExit(f"MISMATCH: {label}")
    ok_count += 1


def assert_true(label, cond):
    global ok_count
    print(f"  {'ok ' if cond else 'XX '} {label}")
    if not cond:
        raise SystemExit(f"FAILED: {label}")
    ok_count += 1


def pct_off(rough, exact):
    return abs(rough - exact) / exact * 100


def money(x):
    return float(D(str(x)).quantize(D("0.01"), rounding=ROUND_HALF_UP))


# ----------------------------------------------------------------------------
print("10A  'Write off your $100-a-night chef. Dinner's FREE.'")
# Inputs: ASSUME $100 per dinner (chef + groceries). 26 USC 274(n): meals 50%.
# IRS 2026 brackets (Rev. Proc. 2025-32): 24% band, single $105,700-$201,775.
dinner = 100.0
meal_cap = 0.50
rate = 0.24
deductible = dinner * meal_cap
back = deductible * rate
you_pay = dinner - back
check("line 1: $100 x 50% cap = $50 deductible", deductible, 50)
check("line 2: $50 x 24% = $12 back", back, 12)
check("sealed card: $100 - $12 = $88 (not $0)", you_pay, 88)
check("postage: 12 cents back per $1", back / dinner, 0.12)
year = 365
check("a year of dinners: $100 x 365 = $36,500", dinner * year, 36_500)
check("you still pay a year: $88 x 365 = $32,120", you_pay * year, 32_120)
check("tax back a year: $12 x 365 = $4,380", back * year, 4_380)
check("last 2 s: '≈ $32K a year' is within 0.4% of $32,120", pct_off(32_000, you_pay * year), 0.37, 0.005)
check("claim survival: $12 saved of the $100 'free' = 12%", back / dinner * 100, 12)
# Robustness for the pinned comment: even a 50% combined marginal rate.
check("pinned: at a 50% combined rate the dinner still costs $75", dinner - dinner * meal_cap * 0.50, 75)
# Personal / family dinners: 26 USC 262 -> $0 deductible -> pay the full $100.
check("pinned: a family (personal) dinner saves $0, costs $100", dinner - 0, 100)

# ----------------------------------------------------------------------------
print("\n10B  'Pay the minimum on $5,000 and you'll pay for 20 YEARS.'")
# Inputs: ASSUME $5,000 balance, no new charges. Fed G.19 accounts-assessed-
# interest rate, Q2 2026 = 22.15% (envelope rounds to 22%). Minimum = the greater
# of $25 or 1% of the balance + that month's interest (Capital One terms; Chase $40).
B0 = 5_000.0


def payoff(balance, apr, floor, pct=0.01):
    """Month-by-month minimum-only payoff, interest = balance x APR/12, cents rounded."""
    r = apr / 12
    months, paid, interest = 0, 0.0, 0.0
    path = [balance]
    while balance > 0.004:
        i = money(balance * r)
        due = money(balance + i)
        pay = min(money(max(floor, pct * balance + i)), due)
        balance = money(due - pay)
        paid += pay
        interest += i
        months += 1
        path.append(balance)
    return months, money(paid), money(interest), path


env_int = B0 * 0.22 / 12
check("line 1: $5,000 x 22% / 12 ≈ $92 interest", env_int, 91.67, 0.005)
check("line 2: + 1% of $5,000 = $50", B0 * 0.01, 50)
check("line 2: min ≈ $92 + $50 = $142", round(env_int) + 50, 142)
halving = math.log(2) / -math.log(1 - 0.01)
check("line 3: debt shrinks 1%/mo -> halves every ~69 months", halving, 68.97, 0.01)
check("        69 months = 5.75 years ('about every 6 years')", halving / 12, 5.75, 0.01)
check("rule of 70 shortcut (TikTok cut): 70 / 1 = 70 months", 70 / 1, 70)
floor_kicks_in = 25 / (0.01 + 0.22 / 12)
print(f"  $25 floor takes over below ${floor_kicks_in:,.2f} of balance (envelope 22%)")

m22, paid22, int22, path22 = payoff(B0, 0.22, 25)
m_ex, paid_ex, int_ex, path_ex = payoff(B0, 0.2215, 25)
m40, paid40, int40, _ = payoff(B0, 0.2215, 40)
print(f"  at 22% (envelope rate): {m22} months = {m22/12:.2f} yr, paid ${paid22:,.2f}, interest ${int22:,.2f}")
print(f"  EXACT at 22.15% (Fed Q2 2026), $25 floor: {m_ex} months = {m_ex//12} yr {m_ex%12} mo, "
      f"paid ${paid_ex:,.2f}, interest ${int_ex:,.2f}")
print(f"  same at a $40 floor: {m40} months = {m40//12} yr {m40%12} mo, paid ${paid40:,.2f}, interest ${int40:,.2f}")
check("sealed card: ≈ 19 years (exact months / 12)", m_ex / 12, 19.25, 0.0001)
check("  envelope '19' vs exact 19.25 yr: within 1.3%", pct_off(19, m_ex / 12), 1.30, 0.005)
check("last 2 s: ≈ $13,100 paid (envelope rate 22%)", paid22, 13_100, 0.5)
check("pinned: exact paid at 22.15% = $13,158.75", paid_ex, 13_158.75, 0.005)
check("  envelope ≈ $13,100 vs exact: within 0.5%", pct_off(13_100, paid_ex), 0.45, 0.005)
check("pinned: exact interest = $8,158.75", int_ex, 8_158.75, 0.005)
check("pinned: $40 floor -> 184 months", m40, 184)
check("pinned: $40 floor -> $12,516.44 paid", paid40, 12_516.44, 0.005)
check("first month exact interest at 22.15%", money(B0 * 0.2215 / 12), 92.29)
check("pay $5,000, hand over ≈ 2.6x", paid_ex / B0, 2.63, 0.01)
check("claim '20 years' is within 4% of the exact 19.25", pct_off(20, m_ex / 12), 3.90, 0.005)
check("claim survival: 19.25 of the claimed 20 years = 96%", round(m_ex / 12 / 20 * 100), 96)
# Robustness: the APR could not be re-verified by QA, so show the answer does not hinge on it.
spread = {apr: payoff(B0, apr, 25)[0] for apr in (0.21, 0.215, 0.22, 0.2215, 0.225, 0.23)}
print("  robustness, months by APR ($25 floor): " + ", ".join(f"{a*100:.2f}%: {m}" for a, m in spread.items()))
assert_true("every APR from 21% to 23% still rounds to ≈ 19 years", all(round(m / 12) == 19 for m in spread.values()))
check("curve mark 'yr 6 ≈ $2.4K' (written rounded)", path_ex[72], 2_400, 50)
check("curve mark 'yr 12 ≈ $1.2K' (written rounded)", path_ex[144], 1_200, 50)
check("balance path is APR-independent until the floor: yr 6 at 22% = at 22.15%", path22[72], path_ex[72], 0.01)

# ----------------------------------------------------------------------------
print("\n10C  'At $1.04 BILLION, a $2 Powerball ticket's worth $3.56.'")
# Inputs: Powerball draw of Aug 12 2026: $1.040B annuity, $450.5M cash (powerball.com).
# Jackpot odds 1 in 292,201,338; $2 play (Powerball prize chart).
# Top federal rate 37% (IRS, tax year 2026). State tax excluded. Single winner assumed.
odds = 292_201_338
annuity = 1.040e9
cash = 450.5e6
check("odds = C(69,5) x 26", math.comb(69, 5) * 26, odds)
naive = annuity / odds
cash_per = cash / odds
after_tax_flat = cash * (1 - 0.37) / odds
check("line 1 (the claim): $1.04B / 292.2M ≈ $3.56", naive, 3.56, 0.005)
check("line 2: $450.5M cash / 292.2M ≈ $1.54", cash_per, 1.54, 0.005)
check("line 3: $1.54 x 63% ≈ $0.97 (envelope uses the rounded $1.54)", 1.54 * 0.63, 0.97, 0.005)
check("line 3 unrounded: cash x 63% / odds", after_tax_flat, 0.97, 0.005)
check("cash share of the advertised jackpot ≈ 43%", cash / annuity * 100, 43.32, 0.01)

# Exact federal tax with the 2026 single-filer schedule (Rev. Proc. 2025-32),
# standard deduction $16,100, no other income (state tax excluded).
brackets = [(12_400, .10), (50_400, .12), (105_700, .22), (201_775, .24),
            (256_225, .32), (640_600, .35), (float("inf"), .37)]


def tax_2026_single(income):
    taxable = max(0.0, income - 16_100)
    tax, lo = 0.0, 0.0
    for hi, r in brackets:
        if taxable > lo:
            tax += (min(taxable, hi) - lo) * r
        lo = hi
    return tax


fed = tax_2026_single(cash)
exact = (cash - fed) / odds
print(f"  exact 2026 federal tax on $450.5M: ${fed:,.0f} (effective {fed/cash*100:.4f}%)")
check("sealed card: ≈ 97¢ (exact brackets)", exact, 0.97, 0.005)
check("  envelope 97¢ vs exact: within 0.2%", pct_off(0.97, exact), 0.15, 0.005)

small = [  # (prize, odds per $2 play), Powerball prize chart; two $100, two $7 and two $4 tiers
    (1_000_000, 11_688_053.52), (50_000, 913_129.18), (100, 36_525.17), (100, 14_494.11),
    (7, 579.76), (7, 701.33), (4, 91.98), (4, 38.32),
]
ev_small = sum(prize / o for prize, o in small)
check("TikTok cut: the $1M tier is worth ≈ 8.6¢ a ticket", 1_000_000 / 11_688_053.52, 0.086, 0.0005)
check("every smaller prize, pre-tax ≈ 32.0¢", ev_small, 0.320, 0.0005)
upper = exact + ev_small
check("card line 2: all prizes, small ones tax-free, ≤ $1.29", upper, 1.29, 0.005)
check("claim survival: $0.97 of the claimed $3.56 = 27%", round(exact / naive * 100), 27)
be_jackpot_only = 2 * odds / ((cash / annuity) * 0.63)
be_exact_scaling = annuity * 2 / exact
be_with_small = (2 - ev_small) * odds / ((cash / annuity) * 0.63)
check("last 2 s: 'about 2 x $1.04B' (multiplier $2 / 97.15¢)", 2 / exact, 2.06, 0.005)
check("pinned: break-even ≈ $2.14B jackpot share alone (flat 37%)", be_jackpot_only / 1e9, 2.14, 0.005)
check("  same by scaling the exact 97.15¢", be_exact_scaling / 1e9, 2.14, 0.005)
check("last 2 s: '≈ $2.1 BILLION' is within 2% of $2.14B", pct_off(2.1e9, be_jackpot_only), 1.94, 0.005)
check("pinned: break-even ≈ $1.80B with small prizes tax-free", be_with_small / 1e9, 1.80, 0.005)
check("the claim's own break-even: 2 x 292,201,338 = $584.4M", 2 * odds / 1e6, 584.40, 0.005)

# ----------------------------------------------------------------------------
print("\nSpecs: on-screen strings, captions, frame 1, timing")


def load(stem):
    return json.loads((SPECS / f"{stem}.json").read_text())


def drawn_text(spec):
    out = []
    for op in spec["ops"]:
        t = op.get("text")
        if isinstance(t, list):
            out.extend(t)
        elif isinstance(t, str):
            out.append(t)
        for c in op.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for m in op.get("marks", []):
            out.append(m["text"])
        if op["type"] == "postage":
            out.append(f'{op["value"]} {op.get("label", "")}')
    return [s.replace("*", "") for s in out]


def has(spec, s):
    return any(s in t for t in drawn_text(spec))


def words(s):
    return len([w for w in re.split(r"\s+", s) if re.search(r"[A-Za-z0-9$¢%?≈≠]", w)])


def hook_ready(op):
    return op["t"] + 0.2 + 0.14 * (len(op["text"]) - 1)


musts = {
    "10-envelope-audit-a": ["$100-a-night chef.", "$100 × 50% cap = $50", "$50 × 24% = $12 back", "$88", "not $0",
                             "12¢ BACK PER $1", "≈ $32K a year", "CLAIM SURVIVAL: 12%", "IRC §274(n)"],
    "10-envelope-audit-b": ["$5,000 and you'll", "20 YEARS", "$5,000 × 22% ÷ 12 ≈ $92", "min: $92 + $50 = $142",
                             "1%/mo → halves every ~6 yrs", "yr 6 ≈ $2.4K", "yr 12 ≈ $1.2K", "≈ 19 years",
                             "the claim said 20", "≈$13,100", "CLAIM SURVIVAL: 96%", "22% APR"],
    "10-envelope-audit-c": ["$1.04 BILLION", "$3.56", "odds: 1 in 292,201,338", "$1.04B ÷ 292.2M ≈ $3.56",
                             "$450.5M ÷ 292.2M ≈ $1.54", "$1.54 × 63% ≈", "≈ 97¢", "≤ $1.29", "30 yearly payments",
                             "about 2 × $1.04B", "≈ $2.1 BILLION", "CLAIM SURVIVAL: 27%"],
}
# the biggest number of each video and where it must land (last 2 s)
biggest = {"10-envelope-audit-a": "≈ $32K a year", "10-envelope-audit-b": "ours: ≈19 yrs, ≈$13,100",
           "10-envelope-audit-c": "≈ $2.1 BILLION"}
first_payoff = {"10-envelope-audit-a": "$100 × 50% cap = $50", "10-envelope-audit-b": "min: $92 + $50 = $142",
                "10-envelope-audit-c": "$1.04B ÷ 292.2M ≈ $3.56"}

for stem, strings in musts.items():
    spec = load(stem)
    dur = spec["duration"]
    print(f" {stem} ({dur}s)")
    for s in strings:
        assert_true(f"on screen: '{s}'", has(spec, s))
    vo = re.sub(r"\s*\[[^\]]*\]\s*", " ", spec["vo"]).split()
    caps = " ".join(c["text"] for c in spec["captions"]).split()
    assert_true("captions = voice-over word for word", vo == caps)
    hooks = [op for op in spec["ops"] if op["type"] == "hook"]
    assert_true("frame 1: the claim hook is fully drawn at t = 0", hook_ready(hooks[0]) <= 0.0)
    assert_true("frame 1: the claim hook carries a $ figure", any("$" in line for line in hooks[0]["text"]))
    slow = [c for c in spec["captions"] if c["end"] - c["t"] < 0.25 * words(c["text"]) - 1e-9]
    assert_true("every caption is on screen ≥ 0.25 s per word", not slow)
    fp = next(op for op in spec["ops"] if op.get("text") == first_payoff[stem])
    fp_done = fp["t"] + len(fp["text"]) / fp["cps"]
    assert_true(f"first payoff written by {fp_done:.1f}s = {fp_done/dur*100:.0f}% (≤ 40%)", fp_done / dur <= 0.40)
    big = next(op for op in spec["ops"] if op.get("text") == biggest[stem])
    big_done = big["t"] + len(big["text"]) / big["cps"]
    assert_true(f"biggest number '{biggest[stem]}' lands at {big_done:.2f}s, inside the last 2 s",
                dur - 2 <= big_done <= dur - 1.0)
    env = next(op for op in spec["ops"] if op["type"] == "envelope")
    assert_true(f"sealed reveal at {env['openAt']}s = {env['openAt']/dur*100:.0f}% (after a 3 s timer)",
                any(op["type"] == "timer" and op["t"] + op["seconds"] <= env["openAt"] for op in spec["ops"]))
    surv = next(op for op in spec["ops"] if str(op.get("text", "")).startswith("CLAIM SURVIVAL"))
    assert_true("claim-survival stat finishes ≥ 0.75 s before the end",
                surv["t"] + len(surv["text"]) / surv["cps"] <= dur - 0.75)

curve = next(op for op in load("10-envelope-audit-b")["ops"] if op["type"] == "curve")
want = [round(path_ex[k]) for k in range(0, len(path_ex), 3)]
assert_true(f"10B curve = exact 22.15% balance every 3 months ({len(want)} points, 0 at month {m_ex})",
            curve["values"] == want)
assert_true("10B curve marks sit at month 72 and 144", [m["i"] * 3 for m in curve["marks"]] == [72, 144])

print(f"\nAll {ok_count} checks passed.")
