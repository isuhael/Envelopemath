#!/usr/bin/env python3
"""Math check for teasers 09A, 09B, 09C (Envelope Math: Itemized).

Recomputes every number shown on screen, spoken in the VO or quoted in a pinned comment,
from the sourced inputs only, and asserts the rounded values we display. Then reads the three
engine specs and checks every on-screen number, plus the format rules (hook in frame 0, no
negative-t pre-rolls, postmark in the flap, loop on, hero card in the last 2 s).
Inputs re-verified 2026-10-07 (polish pass); see the md's "Final fact check".
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
# Polish pass: eggs Aug 2026 corrected from 2.272 to 2.279 (BLS; +4.1% from July's 2.189).
items = [  # name, 2006 avg, Aug 2026 (3 decimals as published)
    ("eggs, grade A large, dozen", 1.31, 2.279),
    ("milk, whole, gallon", 3.08, 4.229),
    ("bread, white pan, lb", 1.08, 1.823),
    ("bananas, lb", 0.50, 0.652),
    ("coffee, 100% ground roast, lb", 3.20, 9.299),
    ("ground beef, 100% beef, lb", 2.22, 6.923),
]
run06 = run26 = 0.0
mult = []
for name, p06, p26 in items:
    shown = round(p26, 2)
    run06 = round(run06 + p06, 2)
    run26 = round(run26 + shown, 2)
    mult.append(f"×{shown / p06:.1f}")
    print(f"  {name:32s} {p06:5.2f} -> {shown:5.2f}  x{shown / p06:5.3f} ('{mult[-1]}')  running {run06:6.2f} | {run26:6.2f}")
    assert round(shown / p06, 1) == round(p26 / p06, 1)  # the multiplier is the same from the unrounded price
t06 = sum(p for _, p, _ in items)
t26_shown = sum(round(q, 2) for *_, q in items)
t26_exact = sum(q for *_, q in items)
assert round(t06, 2) == 11.39 and round(t26_shown, 2) == 25.20
print(f"  totals: 2006 ${t06:.2f} | 2026 ${t26_shown:.2f} (receipt) / ${t26_exact:.3f} (unrounded)")
double = 2 * round(t06, 2)
print(f"  'double = ${double:.2f}': the 2026 running total passes it on the beef line "
      f"({run26 - round(6.923, 2):.2f} -> {run26:.2f})")
assert round(double, 2) == 22.78 and round(t26_shown - round(6.923, 2), 2) < double < round(t26_shown, 2)
ratio = t26_shown / t06
print(f"  ratio {ratio:.4f} (unrounded {t26_exact / t06:.4f})  -> on screen x2.2   (+{(ratio - 1) * 100:.1f}%)")
assert round(ratio, 1) == 2.2 and round(t26_exact / t06, 1) == 2.2
jump = t26_shown - t06
cof = round(9.299, 2) - 3.20
beef = round(6.923, 2) - 2.22
share = (cof + beef) / jump
print(f"  increase ${jump:.2f}; coffee +${cof:.2f}, beef +${beef:.2f} = ${cof + beef:.2f} = {pct(share)} of the jump -> '78%'")
assert round(share * 100) == 78
print(f"  bananas +${round(0.652, 2) - 0.50:.2f} in 20 yrs (x{0.652 / 0.50:.2f}); coffee x{9.299 / 3.20:.1f}; beef x{6.923 / 2.22:.1f}")
assert round(round(0.652, 2) - 0.50, 2) == 0.15
assert round(9.299 / 3.20, 1) == 2.9 and round(6.923 / 2.22, 1) == 3.1
# Average hourly earnings, production & nonsupervisory employees, private (BLS Employment Situation):
# Aug 2006 $16.79 (as first published 2006-09-01); Aug 2026 $32.53 (BLS Real Earnings, 2026-09-11; the
# 2026-10-02 jobs report put September at $32.60, "up 7 cents", so August still reads $32.53).
w06, w26 = 16.79, 32.53
m06 = t06 / w06 * 60
m26 = t26_shown / w26 * 60
m26x = t26_exact / w26 * 60
print(f"  pay ratio x{w26 / w06:.3f} -> 'x1.9'")
assert round(w26 / w06, 1) == 1.9
print(f"  minutes of work: 2006 {m06:.2f} min | 2026 {m26:.2f} min ({m26x:.2f} unrounded)")
print(f"  difference {m26 - m06:.2f} min (+{(m26 / m06 - 1) * 100:.1f}%)")
assert round(m06) == 41 and round(m26) == 46 and round(m26x) == 46
# The screen shows "41 min" and "46 min", so the verdict is a ratio, which survives rounding either way.
assert round(m26 / m06, 1) == 1.1 and round(round(m26) / round(m06), 1) == 1.1
print(f"  verdict 'x1.1, not x2.2': exact {m26 / m06:.3f}; from the rounded screen values {round(m26) / round(m06):.3f}")
print(f"  envelope said ~46 min: within {pct(within(46, m26))}; ~41 min: within {pct(within(41, m06))}")
mw06, mw26 = 5.15, 7.25  # federal minimum wage 2006 / 2026
mm06, mm26 = t06 / mw06 * 60, t26_shown / mw26 * 60
print(f"  at federal minimum wage: {mm06:.1f} min -> {mm26:.1f} min (+{mm26 / mm06 * 100 - 100:.0f}%)")
assert round(mm06) == 133 and round(mm26) == 209 and round(mm26 / mm06 * 100 - 100) == 57

# ======================================================================= 09B
print("=" * 72, "\n09B  $10 at Chipotle (FY2025 10-K / Q4 release, $ thousands)\n" + "=" * 72)
# Polish pass: rows now come from the exact 10-K dollar lines, not the rounded % shares. That moves
# "HQ + depreciation" from $0.92 to $0.91 and "taxes (net)" from $0.33 to $0.34 (exact $0.3354).
revenue = 11_925_601
food, labor, occ, other = 3_527_043, 2_991_680, 624_898, 1_755_824
ga, da, preopen = 652_017, 361_382, 49_507
op_income, interest_other, tax, net_income = 1_935_798, 73_721, 473_758, 1_535_761
assert op_income + interest_other - tax == net_income
impair = revenue - op_income - (food + labor + occ + other + ga + da + preopen)
print(f"  impairment, closure & asset disposal (derived): ${impair:,}K")
assert 0 < impair < 50_000
shares = {"food": food, "labor": labor, "occ": occ, "other": other}
for k, v in shares.items():
    print(f"  {k:6s} {v / revenue * 100:6.3f}% of revenue")
assert [round(v / revenue * 100, 1) for v in shares.values()] == [29.6, 25.1, 5.2, 14.7]
rlm = (revenue - food - labor - occ - other) / revenue
opm = op_income / revenue
net = net_income / revenue
print(f"  restaurant-level margin {pct(rlm)} (reported 25.4%); operating margin {pct(opm)} (reported 16.2%); net {pct(net)}")
assert round(rlm * 100, 1) == 25.4 and round(opm * 100, 1) == 16.2
hq = ga + da + preopen + impair
lines = [("food, drinks, bags", food), ("crew (labor)", labor), ("rent (occupancy)", occ),
         ("ads, delivery, card fees, utilities (other op.)", other),
         ("HQ + depreciation + new stores (G&A, D&A, pre-opening, impairment)", hq),
         ("taxes, net of interest income", tax - interest_other), ("profit (net income)", net_income)]
per10 = [(n, v / revenue * 10) for n, v in lines]
shown_b = [round(v, 2) for _, v in per10]
for (n, v), s in zip(per10, shown_b):
    print(f"  {n:68s} ${v:6.4f} -> ${s:.2f}")
assert abs(sum(v for _, v in per10) - 10) < 1e-9
assert round(sum(shown_b), 2) == 10.00, sum(shown_b)  # the rounded rows add up to exactly $10.00
assert shown_b == [2.96, 2.51, 0.52, 1.47, 0.91, 0.34, 1.29]
left = [10.0]
for s in shown_b[:5]:
    left.append(round(left[-1] - s, 2))
print(f"  left of $10 after each receipt row: {left}")
assert left == [10.0, 7.04, 4.53, 4.01, 2.54, 1.63]
assert round(left[-1] - shown_b[5], 2) == shown_b[6] == 1.29
print(f"  on screen: ${left[-1]:.2f} - ${shown_b[5]:.2f} = ${shown_b[6]:.2f};  exact: operating ${opm * 10:.4f}, "
      f"taxes net ${(tax - interest_other) / revenue * 10:.4f}, profit ${net * 10:.4f}")
print(f"  profit per $10: ${net * 10:.4f} -> '$1.29' (within {pct(within(1.29, net * 10))}); '12.9%'")
assert round(net * 100, 1) == 12.9
print(f"  restaurant keeps ${rlm * 10:.4f} -> '$2.54' (the rounded chain also gives {left[4]:.2f})")
assert round(rlm * 10, 2) == left[4] == 2.54
print(f"  crew vs food: {labor / food * 100:.0f}% ('almost as much'); food $2.96 vs profit $1.29 = {2.96 / 1.29:.1f}x")
print(f"  revenue growth check: {revenue / 11_313_853 - 1:.4f} (reported +5.4%)")
assert round((revenue / 11_313_853 - 1) * 100, 1) == 5.4

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
assert round(float(1 / win_any), 2) == 24.87
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
# Jackpot for Wed 2026-10-07: $485M estimated annuity, $199.8M cash (after no winner on Mon 2026-10-05).
cash, annuity, tax_rate = 199_800_000, 485_000_000, 0.37
after = cash * (1 - tax_rate)
jp = after / total
print(f"  jackpot: ${cash / 1e6:.1f}M x {1 - tax_rate:.2f} = ${after / 1e6:.3f}M -> '$125.9M';  / {total:,} = ${jp:.5f} -> 43 c")
assert round(after / 1e6, 1) == 125.9 and round(jp * 100) == 43
assert round(round(after / 1e6, 1) / round(total / 1e6, 1) * 100) == 43  # the rounded line gives 43 c too
whole = small + jp
print(f"  whole ticket: {small * 100:.3f} + {jp * 100:.3f} = {whole * 100:.3f} c -> '~75 c' (within {pct(within(0.75, whole))})")
assert round(whole * 100) == 75 and cum_shown + round(jp * 100) == 75
print(f"  return per $1 spent: {whole / 2:.3f}")
print(f"  TikTok beat: 20 tickets = ${20 * 2} in, ${20 * whole:.2f} back on average -> 'about fifteen back'")
assert round(20 * whole) == 15
need_cash = (2 - small) * total / (1 - tax_rate)
ratio_now = cash / annuity
print(f"  break-even cash (no split, 37% fed only): ${need_cash / 1e6:,.1f}M; "
      f"at this week's cash/annuity ratio {ratio_now:.4f} ~ ${need_cash / ratio_now / 1e9:.2f}B advertised")
assert round(need_cash / 1e6, 1) == 779.3 and round(need_cash / ratio_now / 1e9, 2) == 1.89
print(f"  if the $50K and $1M tiers are taxed at the same 37%: small prizes {(small - 0.37 * float(ev['4 + PB'] + ev['5'])) * 100:.2f} c, "
      f"ticket {(small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100:.2f} c -> '~70 c' (pin note)")
assert round((small - 0.37 * float(ev['4 + PB'] + ev['5']) + jp) * 100) == 70

# ======================================================================= specs
# The specs are the source of what viewers see: check every on-screen number against the math above,
# and the format rules (number in frame 0, payoff by ~40%, hero in the last 2 s, loop, no pre-roll hacks).
import json
import os
import re

SPECS = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "engine", "specs")


def load(stem):
    with open(os.path.join(SPECS, f"09-itemized-tally-{stem}.json")) as f:
        return json.load(f)


def op(spec, **kw):
    hits = [o for o in spec["ops"] if all(o.get(k) == v for k, v in kw.items())]
    assert len(hits) == 1, (kw, len(hits))
    return hits[0]


def texts(spec):
    out = []
    for o in spec["ops"]:
        for k in ("text", "note", "header"):
            v = o.get(k)
            if isinstance(v, list):
                out += [str(x) for x in v]
            elif v is not None:
                out.append(str(v))
        for c in o.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for it in o.get("items", []):
            out += [str(x) for x in (it if isinstance(it, list) else (it["label"], it["value"]))]
    return out


def rule_checks(spec, code):
    ops = spec["ops"]
    assert all(o["t"] >= 0 for o in ops), "negative-t pre-roll left in the spec"
    hook = next(o for o in ops if o["type"] == "hook")
    assert hook["t"] == 0 and re.search(r"\$\d", " ".join(hook["text"])), "frame 0 needs the hook with a dollar figure"
    pm = next(o for o in ops if o["type"] == "postmark")
    assert (pm["t"], pm["x"], pm["y"], pm["r"], pm["persist"], pm["center"][1]) == (0, 175, 258, 100, True, code)
    assert spec.get("loop") is True
    env = next(o for o in ops if o["type"] == "envelope")
    card_in = env["openAt"] + 0.45
    assert spec["duration"] - 2.0 <= card_in < spec["duration"] - 1.2, (card_in, spec["duration"])
    hero = env["card"][0]
    hero_size = hero.get("size", env["cardSize"]) if isinstance(hero, dict) else env["cardSize"]
    assert hero_size >= 100, hero_size
    for o in ops:  # handwriting floors for this pass: 64px working lines (hero >= 100 checked above)
        if o["type"] == "write" and o.get("font", "hand") == "hand":
            assert o["size"] >= 64, (o["text"], o["size"])
    caps = spec["captions"]
    for x in caps:
        assert x["end"] - x["t"] >= 0.25 * len(x["text"].split()) - 1e-9, x
        assert x["end"] <= spec["duration"]
    for x, y in zip(caps, caps[1:]):
        assert y["t"] >= x["end"] - 1e-9, (x, y)
    return card_in


print("=" * 72, "\nspecs: on-screen numbers and timing\n" + "=" * 72)
a, b, c = load("a"), load("b"), load("c")

# 09A: a 2006 receipt (printed in frame 0) beside a 2026 receipt that prints line by line
heroA = rule_checks(a, "09A")
r06, r26 = op(a, id="r06"), op(a, id="r26")
assert r06["instant"] and [v for _, v in r06["items"]] == [f"${p06:.2f}" for _, p06, _ in items]
assert [it["value"] for it in r26["items"]] == [f"${round(p26, 2):.2f}" for *_, p26 in items]
assert [it["label"] for it in r26["items"]] == mult
assert r06["running"]["label"] == r26["running"]["label"] == "TOTAL"
tA = texts(a)
for s in ("+15¢ in 20 years?!", f"double = ${double:.2f}", "× 2.2", "78% of it: coffee + beef",
          "2006: $11.39 ÷ $16.79 ≈ 41 min", "2026: $25.20 ÷ $32.53 ≈", "46 min", "≈ 46 min", "×1.1, not ×2.2"):
    assert s in tA, s
sticky = op(a, type="sticky")["text"]
assert "$16.79" in sticky and "$32.53" in sticky
eggs_at = r26["items"][0]["at"]
ban_at = r26["items"][3]["at"]
print(f"  09A  eggs (first payoff) {eggs_at:.1f}s = {eggs_at / a['duration']:.0%}; bananas break {ban_at:.1f}s = {ban_at / a['duration']:.0%}; "
      f"hero card {heroA:.2f}s of {a['duration']}s")
assert eggs_at / a["duration"] <= 0.4 and 0.3 <= ban_at / a["duration"] <= 0.45

# 09B: the cost lines are printed in frame 0; their amounts (exact 10-K lines per $10) print beside them
# one by one, and the "left:" counter steps down after each
heroB = rule_checks(b, "09B")
rbl, rb = op(b, id="rbl"), op(b, id="rb")
assert rbl["instant"] and [lab for lab, _ in rbl["items"]] == ["FOOD, DRINKS, BAGS", "CREW (LABOR)", "RENT",
                                                             "ADS, DELIVERY, FEES", "HQ + DEPRECIATION"]
assert [it["value"] for it in rb["items"]] == [f"-${s:.2f}" for s in shown_b[:5]]
cnt = op(b, id="left")
assert [v for _, v in cnt["steps"]] == left
for it, (st, _) in zip(rb["items"], cnt["steps"][1:]):
    assert abs(st - (it["at"] + 0.35)) < 1e-9
tB = texts(b)
for s in (f"${left[-1]:.2f} − ${shown_b[5]:.2f} = ?", "$1.29", "of every $10"):
    assert s in tB, s
food_at, crew_at = rb["items"][0]["at"], rb["items"][1]["at"]
print(f"  09B  food (first payoff) {food_at:.1f}s = {food_at / b['duration']:.0%}; crew twist {crew_at:.1f}s = {crew_at / b['duration']:.0%}; "
      f"hero card {heroB:.2f}s of {b['duration']}s")
assert food_at / b["duration"] <= 0.4

# 09C: the prize chart is printed in frame 0; each tier's worth prints beside it; the counter adds them up
heroC = rule_checks(c, "09C")
rcl, rc = op(c, id="rcl"), op(c, id="rc")
assert rcl["instant"] and rcl["items"] == [["$4", "1 IN 38"], ["$4–$7", "3 MORE WAYS"], ["$100", "2 WAYS"],
                                           ["$50,000", f"1 IN {913_129.18 / 1e3:.0f}K"],
                                           ["$1,000,000", f"1 IN {11_688_053.52 / 1e6:.1f}M"],
                                           ["JACKPOT", f"1 IN {total / 1e6:.1f}M"]]
vals = [it["value"] for it in rc["items"] if it["value"] not in ("", "?")]
assert vals == [f"{s}¢" for s in shown], vals
wc = op(c, id="worth")
assert [v for _, v in wc["steps"]] == [0] + [sum(shown[:i + 1]) for i in range(len(shown))], wc["steps"]
tC = texts(c)
for s in (f"${cash / 1e6:.1f}M × {1 - tax_rate:.2f} ≈ ${after / 1e6:.1f}M", f"÷ {total / 1e6:.1f}M ≈ {round(jp * 100)}¢",
          f"+ {cum_shown}¢ small prizes = ?", f"≈ {round(whole * 100)}¢"):
    assert any(s in t for t in tC), s
assert f"${cash / 1e6:.1f}M" in op(c, type="sticky")["text"]
first_at, twist_at = rc["items"][0]["at"], rc["items"][3]["at"]
print(f"  09C  $4 row (first payoff) {first_at:.1f}s = {first_at / c['duration']:.0%}; $50K twist {twist_at:.1f}s = {twist_at / c['duration']:.0%}; "
      f"hero card {heroC:.2f}s of {c['duration']}s")
assert first_at / c["duration"] <= 0.4

print("\nall assertions passed")
