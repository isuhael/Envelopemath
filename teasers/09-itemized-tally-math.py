#!/usr/bin/env python3
"""Math check for teasers 09A, 09B, 09C (Envelope Math: Itemized).

Recomputes every number shown on screen, spoken in the VO or quoted in a pinned comment,
from the sourced inputs only, and asserts the rounded values we display.
Run: python3 teasers/09-itemized-tally-math.py
"""
from fractions import Fraction as F
from math import comb


def pct(x):
    return f"{x * 100:.2f}%"


def within(approx, exact):
    return abs(approx - exact) / exact


# ======================================================================= 09A
print("=" * 72, "\n09A  6 groceries, 2006 vs Aug 2026 (BLS average prices)\n" + "=" * 72)
# BLS CPI average prices, U.S. city average. 2006 = annual average; 2026 = August 2026 (released 2026-09-11).
items = [  # name, 2006 avg, Aug 2026 (3 decimals as published)
    ("eggs, grade A large, dozen", 1.31, 2.272),
    ("milk, whole, gallon", 3.08, 4.229),
    ("bread, white pan, lb", 1.08, 1.823),
    ("bananas, lb", 0.50, 0.652),
    ("coffee, 100% ground roast, lb", 3.20, 9.299),
    ("ground beef, 100% beef, lb", 2.22, 6.923),
]
run06 = run26 = 0.0
for name, p06, p26 in items:
    shown = round(p26, 2)
    run06 = round(run06 + p06, 2)
    run26 = round(run26 + shown, 2)
    print(f"  {name:32s} {p06:5.2f} -> {shown:5.2f}  x{p26 / p06:4.2f}  running {run06:6.2f} | {run26:6.2f}")
t06 = sum(p for _, p, _ in items)
t26_shown = sum(round(q, 2) for *_, q in items)
t26_exact = sum(q for *_, q in items)
assert round(t06, 2) == 11.39 and round(t26_shown, 2) == 25.19
print(f"  totals: 2006 ${t06:.2f} | 2026 ${t26_shown:.2f} (receipt) / ${t26_exact:.3f} (unrounded)")
ratio = t26_shown / t06
print(f"  ratio {ratio:.3f}  -> on screen x2.2   (+{(ratio - 1) * 100:.1f}%)")
assert round(ratio, 1) == 2.2
jump = t26_shown - t06
cof = round(9.299, 2) - 3.20
beef = round(6.923, 2) - 2.22
share = (cof + beef) / jump
print(f"  increase ${jump:.2f}; coffee +${cof:.2f}, beef +${beef:.2f} = ${cof + beef:.2f} = {pct(share)} of the jump -> '78%'")
assert round(share * 100) == 78
print(f"  bananas +${round(0.652, 2) - 0.50:.2f} in 20 yrs (x{0.652 / 0.50:.2f}); coffee x{9.299 / 3.20:.1f}; beef x{6.923 / 2.22:.1f}")
assert round(9.299 / 3.20, 1) == 2.9 and round(6.923 / 2.22, 1) == 3.1
# Average hourly earnings, production & nonsupervisory employees, private (BLS Employment Situation):
# Aug 2006 $16.79 (as first published 2006-09-01); Aug 2026 $32.53.
w06, w26 = 16.79, 32.53
m06 = t06 / w06 * 60
m26 = t26_shown / w26 * 60
m26x = t26_exact / w26 * 60
print(f"  pay ratio x{w26 / w06:.3f} -> 'x1.9'")
assert round(w26 / w06, 1) == 1.9
print(f"  minutes of work: 2006 {m06:.2f} min | 2026 {m26:.2f} min ({m26x:.2f} unrounded)")
print(f"  difference {m26 - m06:.2f} min (+{(m26 / m06 - 1) * 100:.1f}%)")
assert round(m06) == 41 and round(m26) == 46
# QA fix: the screen shows "41 min" and "46 min", so a viewer subtracting gets 5, not the exact 5.76 -> "+6".
# The verdict is therefore a ratio, which survives rounding either way: "x1.1, not x2.2".
assert round(m26 / m06, 1) == 1.1 and round(round(m26) / round(m06), 1) == 1.1
assert round(ratio, 1) == 2.2
print(f"  verdict 'x1.1, not x2.2': exact {m26 / m06:.3f}; from the rounded screen values {round(m26) / round(m06):.3f}")
print(f"  envelope said ~46 min: within {pct(within(46, m26))}; ~41 min: within {pct(within(41, m06))}")
mw06, mw26 = 5.15, 7.25  # federal minimum wage 2006 / 2026
print(f"  at federal minimum wage: {t06 / mw06 * 60:.1f} min -> {t26_shown / mw26 * 60:.1f} min (+{(t26_shown / mw26) / (t06 / mw06) * 100 - 100:.0f}%)")

# ======================================================================= 09B
print("=" * 72, "\n09B  $10 at Chipotle (FY2025 10-K / Q4 release, % of total revenue)\n" + "=" * 72)
food, labor, occ, other = 29.6, 25.1, 5.2, 14.7
rlm_reported, opm = 25.4, 16.2
revenue, net_income = 11_925_601, 1_535_761  # $ thousands, FY2025
rlm = 100 - (food + labor + occ + other)
print(f"  restaurant costs {food + labor + occ + other:.1f}% -> restaurant-level margin {rlm:.1f}% (reported {rlm_reported}%)")
assert abs(rlm - rlm_reported) < 1e-9
net = net_income / revenue
print(f"  net margin {net_income:,} / {revenue:,} = {pct(net)}")
lines = [("food, drinks, bags", food / 10), ("crew (labor)", labor / 10), ("rent (occupancy)", occ / 10),
         ("ads, delivery, card fees, utilities (other op.)", other / 10),
         ("HQ + depreciation + new stores (to operating)", (rlm - opm) / 10)]
left = 10.0
for name, v in lines:
    left = round(left - round(v, 2), 2)
    print(f"  {name:48s} ${v:5.2f}   left ${left:5.2f}")
assert left == round(opm / 10, 2) == 1.62
tax_line = opm / 10 - net * 10
print(f"  taxes, net of interest income: {opm / 10:.2f} - {net * 10:.4f} = ${tax_line:.4f} -> $0.33")
assert round(tax_line, 2) == 0.33 and round(1.62 - 0.33, 2) == 1.29 == round(net * 10, 2)
print(f"  profit per $10: ${net * 10:.4f} -> '$1.29' (within {pct(within(1.29, net * 10))}); '12.9%'")
print(f"  crew vs food: {labor / food * 100:.0f}% ('almost as much'); food $2.96 vs profit $1.29 = {2.96 / 1.29:.1f}x")
print(f"  revenue growth check: {revenue / 11_313_853 - 1:.4f} (reported +5.4%)")

# ======================================================================= 09C
print("=" * 72, "\n09C  a $2 Powerball ticket (official prize chart, Oct 7 2026 jackpot est.)\n" + "=" * 72)
W, R = 69, 26
total = comb(W, 5) * R
print(f"  combinations: C(69,5) x 26 = {total:,}")
assert total == 292_201_338


def p(k, pb):  # exactly k white balls, with/without the Powerball
    return F(comb(5, k) * comb(W - 5, 5 - k), comb(W, 5)) * (F(1, R) if pb else F(R - 1, R))


tiers = [  # label, prize $, k, pb, published odds "1 in"
    ("Powerball only", 4, 0, True, 38.32), ("1 + PB", 4, 1, True, 91.98), ("2 + PB", 7, 2, True, 701.33),
    ("3", 7, 3, False, 579.76), ("3 + PB", 100, 3, True, 14_494.11), ("4", 100, 4, False, 36_525.17),
    ("4 + PB", 50_000, 4, True, 913_129.18), ("5", 1_000_000, 5, False, 11_688_053.52),
]
ev = {}
for lab, prize, k, pb, pub in tiers:
    pr = p(k, pb)
    one_in = 1 / pr
    assert round(float(one_in), 2) == pub, (lab, float(one_in))
    ev[lab] = prize * pr
    print(f"  {lab:15s} ${prize:>9,}  1 in {float(one_in):>14,.2f} (matches chart)  worth {float(ev[lab]) * 100:6.3f} c")
win_any = sum(p(k, pb) for _, _, k, pb, _ in tiers) + F(1, total)
print(f"  overall odds of any prize: 1 in {float(1 / win_any):.2f} (chart: 24.87)")
groups = [("$4  1 in 38", ["Powerball only"]), ("$4-$7  3 more ways", ["1 + PB", "2 + PB", "3"]),
          ("$100  2 ways", ["3 + PB", "4"]), ("$50,000", ["4 + PB"]), ("$1,000,000", ["5"])]
shown = [10, 7, 1, 5, 9]
cum = 0
cum_shown = 0
for (lab, keys), s in zip(groups, shown):
    v = float(sum(ev[x] for x in keys)) * 100
    cum += v
    cum_shown += s
    assert round(v) == s
    print(f"  {lab:22s} {v:6.3f} c -> {s} c   running {cum:6.3f} c -> {round(cum)} c (receipt sum {cum_shown} c)")
    assert round(cum) == cum_shown
small = float(sum(ev.values()))
print(f"  all non-jackpot prizes: ${small:.5f}")
print(f"  twist: $50,000 tier {float(ev['4 + PB']) * 100:.2f} c < $4 Powerball-only tier {float(ev['Powerball only']) * 100:.2f} c")
assert ev["4 + PB"] < ev["Powerball only"]
cash, tax = 199_800_000, 0.37
after = cash * (1 - tax)
jp = after / total
print(f"  jackpot: ${cash / 1e6:.1f}M x {1 - tax:.2f} = ${after / 1e6:.3f}M -> '$125.9M';  / {total:,} = ${jp:.5f} -> 43 c")
assert round(after / 1e6, 1) == 125.9 and round(jp * 100) == 43
whole = small + jp
print(f"  whole ticket: {small * 100:.3f} + {jp * 100:.3f} = {whole * 100:.3f} c -> '~75 c' (within {pct(within(0.75, whole))})")
assert round(whole * 100) == 75
print(f"  return per $1 spent: {whole / 2:.3f}")
print(f"  TikTok beat: 20 tickets = ${20 * 2} in, ${20 * whole:.2f} back on average -> 'about fifteen back'")
assert round(20 * whole) == 15
need_cash = (2 - small) * total / (1 - tax)
ratio_now = 199.8 / 485
print(f"  break-even cash (no split, 37% fed only): ${need_cash / 1e6:,.1f}M; "
      f"at this week's cash/annuity ratio {ratio_now:.4f} ~ ${need_cash / ratio_now / 1e9:.2f}B advertised")
print(f"  if the $50K and $1M tiers are taxed at the same 37%: small prizes {(small - 0.37 * float(ev['4 + PB'] + ev['5'])) * 100:.2f} c, "
      f"ticket {(small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100:.2f} c -> '~70 c' (pin note)")
assert round((small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100) == 70

# ======================================================================= specs
# QA addition: the specs are the source of what viewers see. Check every on-screen number against the math above,
# and check the format-bible timing rules (number in frame 0, payoff by ~40%, hero in the last 2 s).
import json
import os
import re

SPECS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine", "specs")


def load(stem):
    with open(os.path.join(SPECS, f"09-itemized-tally-{stem}.json")) as f:
        return json.load(f)


def texts(spec):
    out = []
    for o in spec["ops"]:
        for k in ("text", "label", "value", "note", "header"):
            v = o.get(k)
            if isinstance(v, list):
                out += [str(x) for x in v]
            elif v is not None:
                out.append(str(v))
        for it in o.get("items", []):
            out += [str(x) for x in it]
        for c in o.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
    return out


def chain(spec, x):
    """Final values of a chained counter at column x, in time order."""
    return [o["to"] for o in sorted((o for o in spec["ops"] if o["type"] == "counter" and o["x"] == x), key=lambda o: o["t"])]


def rows(spec):
    r = next(o for o in spec["ops"] if o["type"] == "receipt")
    return [round(r["t"] + i / r["lps"], 2) for i in range(2 + len(r["items"]))], r


def frame0(spec):
    hook = next(o for o in spec["ops"] if o["type"] == "hook")
    lines = len(hook["text"]) if isinstance(hook["text"], list) else 1
    assert hook["t"] + 0.2 + 0.14 * (lines - 1) <= 0, "hook is not fully drawn in frame 0"
    stamp_ = next(o for o in spec["ops"] if o["type"] == "postage")
    assert stamp_["t"] + 0.35 <= 0, "postage stamp is not in frame 0"
    assert re.search(r"\$\d", " ".join(hook["text"])), "no dollar figure on the frame-0 hook"


def hero(spec):
    env = next(o for o in spec["ops"] if o["type"] == "envelope")
    card_in = env["openAt"] + 0.45
    assert spec["duration"] - 2.0 <= card_in < spec["duration"] - 1.2, (card_in, spec["duration"])
    return env


print("=" * 72, "\nspecs: on-screen numbers and timing\n" + "=" * 72)
a, b, c = load("a"), load("b"), load("c")
for s_ in (a, b, c):
    frame0(s_)
    hero(s_)
    caps = s_["captions"]
    for x in caps:
        assert x["end"] - x["t"] >= 0.25 * len(x["text"].split()) - 1e-9, x
    for x, y in zip(caps, caps[1:]):
        assert y["t"] >= x["end"] - 1e-9, (x, y)

# 09A
tA = texts(a)
r_t, rec = rows(a)
want = [f"{p06:.2f} → {round(p26, 2):.2f}" for _, p06, p26 in items]
assert [it[1] for it in rec["items"]] == want, rec["items"]
c06, c26 = chain(a, 560), chain(a, 820)
assert c06[1:] == [round(sum(p for _, p, _ in items[:i + 1]), 2) for i in range(6)], c06
assert c26[1:] == [round(sum(round(q, 2) for *_, q in items[:i + 1]), 2) for i in range(6)], c26
for s in ("+15¢ in 20 years?!", "coffee ×2.9", "beef ×3.1", "× 2.2", "(78% of it: coffee + beef)",
          "2006: $11.39 ÷ $16.79 ≈ 41 min", "2026: $25.19 ÷ $32.53 ≈", "46 min", "≈ 46 min", "×1.1, not ×2.2"):
    assert s in tA, s
assert "$16.79" in next(o["text"] for o in a["ops"] if o["type"] == "sticky")
assert "$32.53" in next(o["text"] for o in a["ops"] if o["type"] == "sticky")
ban = r_t[2 + 3] / a["duration"]
print(f"  09A  eggs (first payoff) {r_t[2]:.1f}s = {r_t[2] / a['duration']:.0%}; bananas break {r_t[5]:.1f}s = {ban:.0%}; "
      f"hero card {hero(a)['openAt'] + 0.45:.2f}s of {a['duration']}s")
assert r_t[2] / a["duration"] <= 0.4 and 0.3 <= ban <= 0.45

# 09B
tB = texts(b)
r_t, rec = rows(b)
want = [f"${round(v, 2):.2f}" for _, v in lines] + [f"${round(tax_line, 2):.2f}"]
assert [it[1] for it in rec["items"]] == want, (rec["items"], want)
left_chain = [10.0]
for _, v in lines:
    left_chain.append(round(left_chain[-1] - round(v, 2), 2))
assert chain(b, 770) == left_chain, chain(b, 770)
for s in ("$1.62 − $0.33 = ?", "$1.29", "of every $10"):
    assert s in tB, s
print(f"  09B  food (first payoff) {r_t[2]:.1f}s = {r_t[2] / b['duration']:.0%}; crew twist {r_t[3]:.1f}s = {r_t[3] / b['duration']:.0%}; "
      f"hero card {hero(b)['openAt'] + 0.45:.2f}s of {b['duration']}s")
assert r_t[2] / b["duration"] <= 0.4

# 09C
tC = texts(c)
r_t, rec = rows(c)
vals = [it[1] for it in rec["items"] if it[1] not in ("", "?")]
assert vals == [f"{s}¢" for s in shown], vals
run = [sum(shown[:i + 1]) for i in range(len(shown))]
assert chain(c, 780) == [0] + run, chain(c, 780)
for s in ("$4 · 1 IN 38", "$50,000 · 1 IN 913K", "$1,000,000 · 1 IN 11.7M", "JACKPOT · 1 IN 292.2M",
          f"${cash / 1e6:.1f}M × {1 - tax:.2f} ≈ ${after / 1e6:.1f}M", f"÷ {total / 1e6:.1f}M ≈ {round(jp * 100)}¢",
          f"+ {cum_shown}¢ small prizes = ?", f"≈ {round(whole * 100)}¢"):
    assert s in tC, s
assert round(after / 1e6, 1) / round(total / 1e6, 1) * 100 > 42.5  # the rounded line also gives 43c
assert f"${cash / 1e6:.1f}M" in next(o["text"] for o in c["ops"] if o["type"] == "sticky")
print(f"  09C  $4 row (first payoff) {r_t[2]:.1f}s = {r_t[2] / c['duration']:.0%}; $50K twist {r_t[5]:.1f}s = {r_t[5] / c['duration']:.0%}; "
      f"hero card {hero(c)['openAt'] + 0.45:.2f}s of {c['duration']}s")
assert r_t[2] / c["duration"] <= 0.4

print("\nall assertions passed")
