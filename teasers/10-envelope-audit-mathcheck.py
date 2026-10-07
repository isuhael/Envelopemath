#!/usr/bin/env python3
"""Math check for approach #10, The Envelope Audit (teasers 10A, 10B, 10C).

Recomputes every number that appears on screen, in the voice-over, on the
sealed card, in the pinned comments and in the "claim survival" gauge, then
reads the three specs and asserts that what is drawn matches what is computed.
Inputs are the real-world figures listed in teasers/10-envelope-audit.md
(sources, dates and the final fact check table are there).
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
surv_a = round(back / dinner * 100)
check("claim survival: $12 saved of the $100 'free' = 12%", surv_a, 12)
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
check("bars: $92 to interest, $50 to the debt (of $142)", round(env_int) + B0 * 0.01, 142)
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
surv_b = round(m_ex / 12 / 20 * 100)
check("claim survival: 19.25 of the claimed 20 years = 96%", surv_b, 96)
# Robustness: the answer must not hinge on the exact APR.
spread = {apr: payoff(B0, apr, 25)[0] for apr in (0.21, 0.215, 0.22, 0.2215, 0.225, 0.23)}
print("  robustness, months by APR ($25 floor): " + ", ".join(f"{a*100:.2f}%: {m}" for a, m in spread.items()))
assert_true("every APR from 21% to 23% still rounds to ≈ 19 years", all(round(m / 12) == 19 for m in spread.values()))
check("curve mark 'yr 6 ≈ $2.4K' (written rounded)", path_ex[72], 2_400, 50)
check("curve mark 'yr 12 ≈ $1.2K' (written rounded)", path_ex[144], 1_200, 50)
check("balance path is APR-independent until the floor: yr 6 at 22% = at 22.15%", path22[72], path_ex[72], 0.01)

# ----------------------------------------------------------------------------
print("\n10C  'A 1% fee eats a THIRD of your retirement.'")
# Inputs: ASSUME $10,000 left alone for 40 years, 7% a year before fees, no new
# deposits; the 1% fee is modelled as 1 point off the yearly return (7% -> 6%).
# Context figures (pinned comment only): ICI 2025 equity mutual fund average
# expense ratio 0.40%; Morningstar 2025 asset-weighted average for all US funds 0.32%.
P, g, fee, n = 10_000.0, 0.07, 0.01, 40
gross = P * (1 + g) ** n
net = P * (1 + g - fee) ** n
ratio = net / gross
less = (1 - ratio) * 100
print(f"  $10K at 7% for 40 yrs = ${gross:,.2f}; at 6% = ${net:,.2f}; ratio {ratio:.4f}; {less:.2f}% less")
check("7% - 1% fee = 6%", g - fee, 0.06, 1e-12)
check("line 1: $10K at 7%, 40 yrs ≈ $150K", gross, 150_000, 500)
check("line 2: $10K at 6%, 40 yrs ≈ $103K", net, 103_000, 500)
check("line 3 (rounded inputs): $103K / $150K ≈ 0.69", 103 / 150, 0.69, 0.005)
check("line 3 exact = (1.06 / 1.07)^40", ratio, (1.06 / 1.07) ** 40)
check("  (1.06 / 1.07)^40 ≈ 0.687", ratio, 0.687, 0.0005)
check("sealed card: ≈ 31% less", less, 31, 0.5)
check("  envelope 31% vs exact 31.31%: within 1%", pct_off(31, less), 0.99, 0.01)
check("card line 2: the claim's 'a third' = 33%", 100 / 3, 33, 0.5)
surv_c = round(less / (100 / 3) * 100)
check("claim survival: 31.31% of the claimed 33.33% = 94%", surv_c, 94)
check("last 2 s: the fee eats ≈ $47K per $10K", gross - net, 47_000, 500)
check("  envelope $47K vs exact $46,887.40: within 0.3%", pct_off(47_000, gross - net), 0.24, 0.005)
check("  $47K is ≈ 4.7x the $10K put in", (gross - net) / P, 4.69, 0.005)


def fv_yearly(r, years=n, due=False):
    """Future value of $1 added every year for `years` years (end of year unless due)."""
    v = ((1 + r) ** years - 1) / r
    return v * (1 + r) if due else v


yearly = (1 - fv_yearly(g - fee) / fv_yearly(g)) * 100
yearly_due = (1 - fv_yearly(g - fee, due=True) / fv_yearly(g, due=True)) * 100
check("fine print: the same amount added each year-end -> ≈ 22% less", yearly, 22, 0.5)
check("  exact 22.48% (pinned)", yearly, 22.48, 0.005)
check("  added at each year-start instead: 23.2% (pinned)", yearly_due, 23.20, 0.01)
check("pinned: fee taken as 1% of the balance (x 0.99 a year): 33.1% less", (1 - 0.99 ** n) * 100, 33.10, 0.005)
check("pinned: measured against the growth (not the balance), the fee takes 33.6% of the gains",
      (gross - net) / (gross - P) * 100, 33.55, 0.005)
check("pinned: over 30 years instead of 40: 24.5% less", (1 - (1.06 / 1.07) ** 30) * 100, 24.55, 0.005)
check("pinned: a 0.40% fee (ICI 2025 equity fund average) -> 13.9% less", (1 - ((1 + g - 0.004) / (1 + g)) ** n) * 100, 13.91, 0.005)
check("pinned: a 0.32% fee (Morningstar 2025 all-fund average) -> 11.3% less", (1 - ((1 + g - 0.0032) / (1 + g)) ** n) * 100, 11.29, 0.005)
rob = {G: (1 - ((1 + G - fee) / (1 + G)) ** n) * 100 for G in (0.04, 0.05, 0.06, 0.07, 0.08, 0.09, 0.10)}
print("  robustness, % less by gross return: " + ", ".join(f"{G*100:.0f}%: {v:.1f}" for G, v in rob.items()))
assert_true("any gross return from 4% to 10% gives 30.6-32.1% less (≈ 31%)", all(30.5 < v < 32.1 for v in rob.values()))

# ----------------------------------------------------------------------------
print("\nSpecs: on-screen strings, captions, frame 0, timing")


def load(stem):
    return json.loads((SPECS / f"{stem}.json").read_text())


def norm(s):
    return re.sub(r"\s+", " ", s.replace("*", "")).strip()


def drawn_text(spec):
    out = []
    for op in spec["ops"]:
        t = op.get("text")
        if isinstance(t, list):
            out.extend(t)
        elif isinstance(t, str):
            out.extend(t.split("\n"))
            out.append(t.replace("\n", " "))
        for c in op.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for m in op.get("marks", []):
            out.append(m["text"])
        for it in op.get("items", []):
            out.append(f'{it["label"]} {it.get("display", "")}')
        if op["type"] == "postage":
            out.append(f'{op["value"]} {op.get("label", "")}')
    return [norm(s) for s in out]


def has(spec, s):
    return any(s in t for t in drawn_text(spec))


def op_by_id(spec, i):
    return next(op for op in spec["ops"] if op.get("id") == i)


def written_by(op):
    return op["t"] + len(op["text"]) / op["cps"]


musts = {
    "10-envelope-audit-a": ["$100-a-night chef.", "Dinner's FREE.", "$100 × 50% cap = $50", "$50 × 24% = $12 back",
                             "$88", "not $0", "12¢ BACK PER $1", "≈ $32K a year", "IRC §274(n)", "deductible",
                             "24% tax bracket"],
    "10-envelope-audit-b": ["$5,000 and you'll", "20 YEARS", "$5,000 × 22% ÷ 12 ≈ $92", "min: $92 + $50 = $142",
                             "interest $92", "the debt $50", "1%/mo → halves every ~6 yrs", "yr 6 ≈ $2.4K",
                             "yr 12 ≈ $1.2K", "≈ 19 years", "the claim said 20", "ours: ≈ $13,100", "22% APR",
                             "($25 floor)"],
    "10-envelope-audit-c": ["A 1% fee eats", "THIRD", "$10,000", "left alone 40 years", "7% a year before fees",
                             "No new deposits", "7%: $10K → ≈ $150K", "6%: $10K → ≈ $103K", "$103K ÷ $150K ≈ 0.69",
                             "≈ 31% less", "the claim said 33%", "≈ 31% less", "≈ 22% less", "fee eats ≈ $47K",
                             "every $10K left 40 yrs:"],
}
survival = {"10-envelope-audit-a": surv_a, "10-envelope-audit-b": surv_b, "10-envelope-audit-c": surv_c}
first_payoff = {"10-envelope-audit-a": "l1", "10-envelope-audit-b": "l2", "10-envelope-audit-c": "l1"}

for stem, strings in musts.items():
    spec = load(stem)
    dur = spec["duration"]
    print(f" {stem} ({dur}s)")
    for s in strings:
        assert_true(f"on screen: '{s}'", has(spec, s))
    vo = re.sub(r"\s*\[[^\]]*\]\s*", " ", spec["vo"]).split()
    spoken = " ".join(c.get("say", c["text"]) for c in spec["captions"]).split()
    assert_true("captions (say, else text) = voice-over word for word", vo == spoken)
    claim = next(op for op in spec["ops"] if op["type"] == "quote")
    assert_true("frame 0: the claim card is on screen, finished, at t = 0", claim["t"] == 0)
    assert_true("frame 0: the claim carries a number", bool(re.search(r"\d", claim["text"])))
    pm = next(op for op in spec["ops"] if op["type"] == "postmark")
    assert_true("postmark in the flap at (175, 258), r 100, t 0",
                (pm["t"], pm["x"], pm["y"], pm["r"], pm.get("persist")) == (0, 175, 258, 100, True))
    assert_true("no negative-t ops", all(op["t"] >= 0 for op in spec["ops"]))
    assert_true("loop: true", spec.get("loop") is True)
    slow = [c for c in spec["captions"] if c["end"] - c["t"] < 0.25 * len(c["text"].split()) - 1e-9]
    assert_true("every caption is on screen ≥ 0.25 s per word", not slow)
    fp_done = written_by(op_by_id(spec, first_payoff[stem]))
    assert_true(f"first payoff written by {fp_done:.1f}s = {fp_done/dur*100:.0f}% (≤ 40%)", fp_done / dur <= 0.40)
    big = op_by_id(spec, "big")
    big_done = written_by(big)
    assert_true(f"biggest number '{norm(big['text'])}' lands at {big_done:.2f}s, inside the last 2 s",
                dur - 2 <= big_done <= dur - 1.0)
    env = next(op for op in spec["ops"] if op["type"] == "envelope")
    assert_true(f"sealed reveal at {env['openAt']}s = {env['openAt']/dur*100:.0f}% (after a 3 s timer)",
                any(op["type"] == "timer" and op["t"] + op["seconds"] <= env["openAt"] for op in spec["ops"]))
    meter = next(op for op in spec["ops"] if op["type"] == "meter")
    check("claim-survival gauge reads the computed survival %", meter["to"], survival[stem])
    m_done = meter["t"] + meter["dur"]
    assert_true(f"claim-survival gauge settles at {m_done:.2f}s, ≥ 0.75 s before the loop crossfade",
                m_done <= dur - 0.35 - 0.75 + 1e-9)

curve = next(op for op in load("10-envelope-audit-b")["ops"] if op["type"] == "curve")
want = [round(path_ex[k]) for k in range(0, len(path_ex), 3)]
assert_true(f"10B curve = exact 22.15% balance every 3 months ({len(want)} points, 0 at month {m_ex})",
            curve["values"] == want)
assert_true("10B curve marks sit at month 72 and 144", [m["i"] * 3 for m in curve["marks"]] == [72, 144])
curves_c = [op for op in load("10-envelope-audit-c")["ops"] if op["type"] == "curve"]
assert_true("10C curves = $10K compounding at 7% and at 6%, year by year (41 points each)",
            [c["values"] for c in curves_c] == [[round(P * (1 + r) ** k) for k in range(n + 1)] for r in (0.07, 0.06)])
assert_true("10C curves share one scale (max $150,000)", all(c["max"] == 150_000 for c in curves_c))

print(f"\nAll {ok_count} checks passed.")
