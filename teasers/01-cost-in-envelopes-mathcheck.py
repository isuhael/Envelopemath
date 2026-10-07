#!/usr/bin/env python3
"""Math check for approach #1, Cost in Envelopes (teasers 01A, 01B, 01C).

Recomputes every number said or shown in the three teasers from the sourced inputs,
then cross-checks the values baked into engine/specs/01-cost-in-envelopes-{a,b,c}.json:
counter targets, sealed cards, on-screen working, the to-scale stack heights, and the
format-bible structure (number in frame 1, captions == VO, first payoff by ~40%,
verdict in the last 2 s).
Run from anywhere:  python3 teasers/01-cost-in-envelopes-mathcheck.py
Exits non-zero if any check fails.
"""
import json
import math
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SPECS = os.path.join(ROOT, "engine", "specs")
fails = []


def check(label, ok):
    print(f"  [{'ok' if ok else 'FAIL'}] {label}")
    if not ok:
        fails.append(label)


def within(envelope, exact):
    return abs(envelope - exact) / exact * 100


def spec(stem):
    with open(os.path.join(SPECS, f"01-cost-in-envelopes-{stem}.json"), encoding="utf-8") as f:
        return json.load(f)


def ops(s, kind):
    return [o for o in s["ops"] if o["type"] == kind]


def texts(s):
    """Every string drawn on screen (write text, sticky, card lines, hook lines)."""
    out = []
    for o in s["ops"]:
        if o["type"] in ("write", "sticky"):
            out.append(o["text"])
        elif o["type"] == "envelope":
            out += [c if isinstance(c, str) else c["text"] for c in o["card"]]
        elif o["type"] == "hook":
            out += o["text"]
    return out


def structure(s, payoff_at, core):
    """Format-bible §2 checks shared by all three teasers. `core` = the md's three envelope
    lines: a string must be drawn on screen verbatim, an int must be a counter target."""
    dur = s["duration"]
    hook = ops(s, "hook")[0]
    lines = hook["text"]
    fully_in = hook["t"] + 0.2 + 0.14 * (len(lines) - 1)      # engine: line i lands at t + 0.14 i + 0.2
    check("frame 1: hook fully drawn at t = 0 (first frame / thumbnail)", fully_in <= 0)
    check("frame 1: the hook's red word is a number", bool(re.search(r"\*\$[\d,]+", " ".join(lines))))
    caps = " ".join(c["text"] for c in s["captions"])
    norm = lambda x: re.sub(r"\s+", " ", x.replace("…", "...")).strip()
    check("captions read exactly as the VO script", norm(caps) == norm(s["vo"]))
    stamp_t = ops(s, "stamp")[-1]["t"]
    check(f"verdict stamp lands in the last 2 s ({dur - stamp_t:.1f} s before the end)", dur - stamp_t <= 2.0 + 1e-9)
    check(f"first partial payoff by ~40% of runtime ({payoff_at / dur:.0%})", payoff_at / dur <= 0.40)
    check("ends on a seamless loop back to frame 1 (spec loop: true)", s.get("loop") is True)
    shown = texts(s) + [o["to"] for o in ops(s, "counter")]
    check("three-line rule: the md's ≤ 3 core lines are on screen as written", len(core) <= 3 and all(x in shown for x in core))


# ---------------------------------------------------------------- 01A
print("01A  Elon's $1 trillion in Costco hot dogs: how many do you get?")
NET_WORTH = 1_000_000_000_000          # envelope input: "about $1 trillion"
BLOOMBERG = 1_040_000_000_000          # Bloomberg Billionaires Index, Oct 6 2026
FORBES = 936_000_000_000               # Forbes real-time, Oct 6 2026
COMBO = 1.50                           # Costco hot dog + soda, unchanged since 1985
WORLD = 8_200_000_000                  # US Census Bureau, world population, July 2026

dogs = NET_WORTH / COMBO
each = dogs / WORLD
print(f"  L1  $1,000,000,000,000 / $1.50 = {dogs:,.2f} hot dogs")
print(f"  L2  shown as {round(dogs):,} (counter) and said as 'about 667 billion'")
print(f"  L3  / 8.2 billion people = {each:.4f} each  -> envelope says 'about 81'")
print(f"      envelope 81 vs exact {each:.2f}: within {within(81, each):.2f}%")
print(f"      tip: /1.5 == x2/3 -> {NET_WORTH * 2 / 3:,.2f}")
for name, nw in (("Bloomberg $1.04T", BLOOMBERG), ("Forbes $936B", FORBES)):
    d = nw / COMBO
    print(f"      at {name}: {d:,.0f} hot dogs, {d / WORLD:.2f} each (envelope 81 is within {within(81, d / WORLD):.1f}%)")
print(f"      tray: 9 x 9 = {9 * 9}")
print(f"      refresh rule: 'about $1T' stays within 5% for ${NET_WORTH * 0.95 / 1e9:,.0f}B to ${NET_WORTH * 1.05 / 1e9:,.0f}B")
print(f"      'same price since 1985' -> {2026 - 1985} years by 2026")
a = spec("a")
counter = ops(a, "counter")[0]
check("counter shows round($1T / $1.50)", counter["to"] == round(dogs))
check("'667 billion' is dogs rounded to the nearest billion", round(dogs / 1e9) == 667 and "667 billion" in a["vo"])
check("card '≈ 81 each' matches round(each)", round(each) == 81 and "81" in ops(a, "envelope")[0]["card"][0])
check("grid holds 81 hot dogs", ops(a, "grid")[0]["rows"] * ops(a, "grid")[0]["cols"] == 81 == ops(a, "grid")[0]["filled"])
check("/1.5 equals x2/3", abs(NET_WORTH / 1.5 - NET_WORTH * 2 / 3) < 1e-3)
check("on-screen line 1 and line 3 carry the same inputs", "$1,000,000,000,000 ÷ $1.50" in texts(a) and "÷ 8.2 billion people 🌍" in texts(a))
structure(a, counter["t"] + counter["dur"], ["$1,000,000,000,000 ÷ $1.50", 666_666_666_667, "÷ 8.2 billion people 🌍"])

# ---------------------------------------------------------------- 01B
print("\n01B  The $40 trillion US debt in $10K envelopes: how tall is it?")
DEBT = 40e12                           # envelope input: "$40 trillion" (crossed Aug 18 2026)
DEBT_AUG18 = 40.047e12                 # Treasury figure on the crossing day (as reported)
DEBT_OCT2 = 40_242_446_619_209.33      # Debt to the Penny, Oct 2 2026 (search-surfaced; re-pull at publish)
BILL_IN = 0.0043                       # BEP: thickness of one note, inches
BILLS_PER_ENV = 100                    # one $10K envelope = 100 x $100
R_EQ_KM = 6378.137                     # NASA Earth fact sheet, equatorial radius
BURJ_M = 828                           # CTBUH, Burj Khalifa height
GEO_KM = 35_786                        # geostationary orbit altitude
MOON_KM = 384_400                      # NASA, average Earth-Moon distance

env_cm = BILL_IN * 2.54 * BILLS_PER_ENV
equator = 2 * math.pi * R_EQ_KM
print(f"  L1  100 x 0.0043 in = {BILL_IN * 100:.2f} in = {env_cm:.4f} cm per envelope  (envelope: ≈ 1.1 cm)")
m_env = 1e6 / 1e4
b_env = 1e9 / 1e4
print(f"      $1M = {m_env:,.0f} envelopes = {m_env * env_cm / 100:.3f} m   (said: about waist high, ≈ 1.1 m)")
print(f"      $1B = {b_env:,.0f} envelopes = {b_env * env_cm / 100:,.1f} m vs Burj {BURJ_M} m "
      f"(taller by {b_env * env_cm / 100 - BURJ_M:,.1f} m, {b_env * env_cm / 100 / BURJ_M:.2f}x)")
n_env = DEBT / 1e4
print(f"  L2  $40T / $10K = {n_env:,.0f} envelopes")
km_env = n_env * 1.1 / 1e5
km_exact = n_env * env_cm / 1e5
print(f"  L3  x 1.1 cm = {km_env:,.0f} km (envelope)  | exact {km_exact:,.1f} km  -> within {within(km_env, km_exact):.2f}%")
print(f"      equator = 2 x pi x {R_EQ_KM} = {equator:,.1f} km")
print(f"      laps: envelope {km_env:,.0f} / {equator:,.0f} = {km_env / equator:.3f}; exact {km_exact / equator:.3f}  (shown: ≈ 1.1 laps)")
print(f"      spare (pinned only): exact {km_exact - equator:,.1f} km")
print(f"      past geostationary orbit ({GEO_KM:,} km)? {km_exact > GEO_KM}")
for name, debt in (("Aug 18 $40.047T", DEBT_AUG18), ("Oct 2 $40.242T", DEBT_OCT2)):
    k = debt / 1e4 * env_cm / 1e5
    print(f"      at {name}: {k:,.0f} km, {k / equator:.3f} laps, spare {k - equator:,.0f} km")
limit = 44_500 / 1.1 * 1e5 * 1e4
print(f"      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < ${limit / 1e12:.3f}T")
ones_km = DEBT * BILL_IN * 2.54 / 1e5
print(f"      re-hook, in $1 bills: {DEBT:,.0f} x 0.0043 in = {ones_km:,.0f} km = {ones_km / MOON_KM:.2f} Earth-Moon distances")
b = spec("b")
stacks = ops(b, "stack")
px_per_m_1 = stacks[0]["ref"]["h"] / 1.7
check("$1M stack height in px matches 1.0922 m beside a 1.7 m person",
      abs(stacks[0]["h"] - m_env * env_cm / 100 * px_per_m_1) < 1.5)
check("$1B stack height in px = 1,092.2 m at 0.6 px/m", abs(stacks[1]["h"] - b_env * env_cm / 100 * 0.6) < 1.5)
burj = [o for o in ops(b, "annotate") if o.get("kind") == "box"][0]
check("Burj outline = 828 m at 0.6 px/m, standing on the same ground", abs(burj["h"] - BURJ_M * 0.6) < 1 and burj["y"] + burj["h"] == stacks[1]["y"])
check("4 billion envelopes", n_env == 4e9 and "$40T ÷ $10K = 4 billion envelopes" in texts(b))
check("card '≈ 44,000 km' = 4e9 x 1.1 cm", round(km_env) == 44_000 and "44,000" in ops(b, "envelope")[0]["card"][0])
check("stack is longer than the equator", km_exact > equator)
check("'≈ 1.1 laps' holds for the envelope figure AND the exact figure",
      round(km_env / equator, 1) == 1.1 == round(km_exact / equator, 1) and "≈ 1.1 laps of the equator" in texts(b))
check("on screen, the equator is the sourced 40,075 km", f"equator: {equator:,.0f} km" in texts(b))
check("$1B stack is taller than the Burj Khalifa", b_env * env_cm / 100 > BURJ_M)
check("'1.1 cm' on screen is 1.0922 cm rounded", round(env_cm, 1) == 1.1 and "1.1 cm" in " ".join(texts(b)) and "1.1 centimeters" in b["vo"])
structure(b, stacks[0]["t"] + stacks[0]["dur"], ["100 × $100 = $10K ≈ 1.1 cm", "$40T ÷ $10K = 4 billion envelopes", "4 billion × 1.1 cm"])

# ---------------------------------------------------------------- 01C
print("\n01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?")
PENNY_G = 2.500                        # US Mint coin specifications
LB = 0.45359237                        # kg per pound (exact)
STATUE_LB = 450_000                    # NPS: 225 tons
STATUE_ALT_LB = 62_000 + 250_000       # other references: copper + steel only
UNIT_COST = 0.0369                     # US Mint FY2024 cost to make and ship one penny

pennies = 1_000_000 / 0.01
grams = pennies * PENNY_G
kg = grams / 1000
lb = kg / LB
tons = lb / 2000
print(f"  L1  $1,000,000 / $0.01 = {pennies:,.0f} pennies")
print(f"  L2  x 2.5 g = {grams:,.0f} g = {kg:,.0f} kg = {lb:,.1f} lb = {tons:.2f} US tons  (card: ≈ 275 tons)")
print(f"      envelope 275 vs exact {tons:.2f}: within {within(275, tons):.2f}%")
print(f"      Lady Liberty {STATUE_LB:,} lb = {STATUE_LB / 2000:.0f} tons = {STATUE_LB * LB / 1000:.1f} t; "
      f"pennies heavier by {tons - STATUE_LB / 2000:.1f} tons ({tons / (STATUE_LB / 2000):.2f}x)")
print(f"      vs copper+steel only ({STATUE_ALT_LB:,} lb = {STATUE_ALT_LB / 2000:.0f} tons): {tons / (STATUE_ALT_LB / 2000):.2f}x")
cost = pennies * UNIT_COST
print(f"  L3  {pennies:,.0f} x $0.0369 = ${cost:,.0f}  (said: $3.7 million, within {within(3.7e6, cost):.2f}%)")
print(f"      per dollar of pennies: 100 x 3.69 cents = ${100 * UNIT_COST:.2f}; weight of $1 in pennies = {100 * PENNY_G:.0f} g")
NICKEL_G = 5.000                       # US Mint coin specifications (pinned-comment follow-up)
nickels = 1_000_000 / 0.05
n_tons = nickels * NICKEL_G / 1000 / LB / 2000
print(f"      pinned follow-up, $1M in nickels: {nickels:,.0f} x 5 g = {nickels * NICKEL_G / 1000:,.0f} kg = {n_tons:.1f} US tons "
      f"({'lighter' if n_tons < STATUE_LB / 2000 else 'heavier'} than Lady Liberty)")
NOTE_G = 1.0                           # BEP: a note weighs about 1 gram
print(f"      TikTok ladder: $1M in $1 bills = {1e6 * NOTE_G / 1000:,.0f} kg = {1e6 * NOTE_G / 1000 / LB / 2000:.2f} US tons; "
      f"in $100 bills = {1e4 * NOTE_G / 1000:.0f} kg")
c = spec("c")
check("$1M in nickels is lighter than 225 tons", n_tons < STATUE_LB / 2000)
check("100,000,000 pennies", pennies == 1e8 and "$1,000,000 = 100,000,000 pennies" in texts(c))
check("250,000,000 g", grams == 2.5e8 and "× 2.5 g = 250,000,000 g" in texts(c))
check("card '≈ 275 tons' rounds the exact US tons", round(tons / 5) * 5 == 275 and "275" in ops(c, "envelope")[0]["card"][0])
check("heavier than 225 tons", tons > STATUE_LB / 2000)
check("heavier than the copper+steel-only figure too", tons > STATUE_ALT_LB / 2000)
check("$3.69M to mint", round(cost) == 3_690_000 and "100M × 3.69¢ = $3.69M" in texts(c) and "$3.69M to make $1M" in texts(c))
check("'$3.7 million' (VO) is $3.69M rounded", round(cost / 1e5) / 10 == 3.7 and "$3.7 million" in c["vo"])
under = [o for o in ops(c, "write") if o["text"].startswith("$1,000,000 =")][0]
structure(c, under["t"] + len(under["text"]) / under["cps"], ["$1,000,000 = 100,000,000 pennies", "× 2.5 g = 250,000,000 g", "100M × 3.69¢ = $3.69M"])

print(f"\n{'ALL CHECKS PASS' if not fails else f'{len(fails)} CHECK(S) FAILED'}")
raise SystemExit(1 if fails else 0)
