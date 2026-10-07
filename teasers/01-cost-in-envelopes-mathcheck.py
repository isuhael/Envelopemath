#!/usr/bin/env python3
"""Math check for approach #1, Cost in Envelopes (teasers 01A, 01B, 01C).

Recomputes every number said or shown in the three teasers from the sourced inputs
(facts re-verified 2026-10-07; see the md's "Final fact check" table), then cross-checks
the values baked into engine/specs/01-cost-in-envelopes-{a,b,c}.json: counter targets,
sealed cards, on-screen working, stamp values, the to-scale stack heights, and the
format-bible structure (hook finished on frame 0 with no negative-t hack, postmark in the
flap, captions == VO, first payoff by ~40%, verdict in the last 2 s, loop). It also runs
the engine linter and requires zero warnings.
Run from anywhere:  python3 teasers/01-cost-in-envelopes-mathcheck.py
Exits non-zero if any check fails.
"""
import json
import math
import os
import re
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ENGINE = os.path.join(ROOT, "engine")
SPECS = os.path.join(ENGINE, "specs")
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


def by_id(s, op_id):
    return next(o for o in s["ops"] if o.get("id") == op_id)


def texts(s):
    """Every string drawn on screen (write, lines, sticky, card lines, hook lines, stamp values)."""
    out = []
    for o in s["ops"]:
        if o["type"] in ("write", "sticky"):
            out.append(o["text"])
        elif o["type"] == "lines":
            out += [x if isinstance(x, str) else x["text"] for x in o["lines"]]
        elif o["type"] == "envelope":
            out += [c if isinstance(c, str) else c["text"] for c in o["card"]]
        elif o["type"] == "hook":
            out += o["text"] if isinstance(o["text"], list) else [o["text"]]
        elif o["type"] == "postage":
            out.append(str(o["value"]))
    return out


def structure(s, payoff_at, core):
    """Format-bible §2 checks shared by all three teasers. `core` = the md's three envelope
    lines, each a list of pieces: a string must be drawn on screen verbatim, an int must be a
    counter target."""
    dur = s["duration"]
    hooks = ops(s, "hook")
    check("frame 0: every hook starts at t = 0 (renders finished; no negative-t hack)", all(h["t"] == 0 for h in hooks))
    lines = [l for h in hooks for l in (h["text"] if isinstance(h["text"], list) else [h["text"]])]
    check("frame 0: the hook's red word is a number", bool(re.search(r"\*\$[\d,]+", " ".join(lines))))
    pm = ops(s, "postmark")
    check("series postmark sits in the flap (x 175, y 258, r 100, persist, t 0)",
          len(pm) == 1 and (pm[0]["x"], pm[0]["y"], pm[0]["r"], pm[0]["t"]) == (175, 258, 100, 0) and pm[0].get("persist") is True)
    caps = " ".join(c["text"] for c in s["captions"])
    norm = lambda x: re.sub(r"\s+", " ", x.replace("…", "...")).strip()
    check("captions read exactly as the VO script", norm(caps) == norm(s["vo"]))
    stamp_t = ops(s, "stamp")[-1]["t"]
    check(f"verdict stamp lands in the last 2 s ({dur - stamp_t:.1f} s before the end)", dur - stamp_t <= 2.0 + 1e-9)
    check(f"first partial payoff by ~40% of runtime ({payoff_at / dur:.0%})", payoff_at / dur <= 0.40)
    check("ends on a seamless loop back to frame 0 (spec loop: true)", s.get("loop") is True)
    shown = texts(s) + [o["to"] for o in ops(s, "counter")]
    check("three-line rule: the md's ≤ 3 core lines are on screen as written",
          len(core) <= 3 and all(piece in shown for line in core for piece in line))
    # Final review (2026-10-07): the card rises out of the envelope from openAt + 0.45 s and is fully
    # out at openAt + 1.05 s (engine envelope op), so the spoken/captioned answer must not beat it.
    env = ops(s, "envelope")[0]
    reveal = min((c for c in s["captions"] if c["t"] >= env["openAt"]), key=lambda c: c["t"])
    check(f"reveal VO waits for the card (caption at +{reveal['t'] - env['openAt']:.2f} s after openAt; card visible from +0.45 s)",
          reveal["t"] - env["openAt"] >= 0.5)
    cuts = sorted(o["t"] for o in s["ops"] if o["type"] in ("flip", "clear"))
    card_leave = next(t for t in cuts if t > env["openAt"])
    check(f"sealed card fully readable for ≥ 1.3 s ({card_leave - (env['openAt'] + 1.05):.2f} s)",
          card_leave - (env["openAt"] + 1.05) >= 1.3 - 1e-9)
    # every handwritten line and sticky stays fully written on screen for ≥ 1 s before it is cleared
    short = []
    for o in s["ops"]:
        if o["type"] not in ("write", "sticky"):
            continue
        done = o["t"] + (0.3 if o["type"] == "sticky" else 0) + len(o["text"]) / o.get("cps", 22 if o["type"] == "sticky" else 15)
        leave = min([o.get("until", dur)] + [t for t in cuts if t > o["t"]])
        if leave - done < 1.0 - 1e-9:
            short.append(f"{o['text'][:24]!r} {leave - done:.2f}s")
    check("reading time: every written line / sticky holds ≥ 1 s once finished" + (f" (short: {short})" if short else ""), not short)


# ---------------------------------------------------------------- 01A
print("01A  Elon's $1 trillion in Costco hot dogs: how many do you get?")
NET_WORTH = 1_000_000_000_000          # envelope input: "about $1 trillion"
BLOOMBERG = 1_040_000_000_000          # Bloomberg Billionaires Index after Mon Oct 5 2026 (+$65B)
FORBES_OCT5 = 1_000_000_000_000        # Forbes real-time, Mon Oct 5 2026 morning ("about $1 trillion")
FORBES_OCT1 = 936_000_000_000          # Forbes top-10 list, as of Oct 1 2026
COMBO = 1.50                           # Costco hot dog + soda, unchanged since 1985 (Apr 2026 reporting)
WORLD = 8_200_000_000                  # US Census Bureau IDB, world population, July 2026
WORLD_UN = 8_300_678_395               # UN WPP projection, July 1 2026 (pinned comment only)

dogs = NET_WORTH / COMBO
each = dogs / WORLD
print(f"  L1  $1,000,000,000,000 / $1.50 = {dogs:,.2f} hot dogs")
print(f"  L2  shown as {round(dogs):,} (counter) and said as 'about 667 billion'")
print(f"  L3  / 8.2 billion people = {each:.4f} each  -> envelope says 'about 81'")
print(f"      envelope 81 vs exact {each:.2f}: within {within(81, each):.2f}%")
print(f"      tip: /1.5 == x2/3 -> {NET_WORTH * 2 / 3:,.2f}")
for name, nw in (("Bloomberg $1.04T (Oct 5)", BLOOMBERG), ("Forbes ~$1T (Oct 5)", FORBES_OCT5), ("Forbes $936B (Oct 1)", FORBES_OCT1)):
    d = nw / COMBO
    print(f"      at {name}: {d:,.0f} hot dogs, {d / WORLD:.2f} each (envelope 81 is within {within(81, d / WORLD):.1f}%)")
print(f"      at the UN's {WORLD_UN / 1e9:.2f}B people: {dogs / WORLD_UN:.2f} each (envelope 81 is within {within(81, dogs / WORLD_UN):.1f}%)")
print(f"      tray: 9 x 9 = {9 * 9}")
print(f"      refresh rule: 'about $1T' stays within 5% for ${NET_WORTH * 0.95 / 1e9:,.0f}B to ${NET_WORTH * 1.05 / 1e9:,.0f}B")
print(f"      'same price since 1985' -> {2026 - 1985} years by 2026")
a = spec("a")
counter = by_id(a, "count")
grid = ops(a, "grid")[0]
check("counter shows round($1T / $1.50)", counter["to"] == round(dogs))
check("'667 billion' is dogs rounded to the nearest billion", round(dogs / 1e9) == 667 and "667 billion" in a["vo"])
check("card '≈ 81 each' matches round(each)", round(each) == 81 and ops(a, "envelope")[0]["card"][0] == "≈ 81 each")
check("grid holds 81 hot dogs", grid["rows"] * grid["cols"] == 81 == grid["filled"])
check("/1.5 equals x2/3", abs(NET_WORTH / 1.5 - NET_WORTH * 2 / 3) < 1e-3)
check("stamp value is the sourced $1.50", any(o["value"] == "$1.50" for o in ops(a, "postage")))
check("both current trackers are within 5% of the envelope's $1T", all(abs(x / NET_WORTH - 1) <= 0.05 for x in (BLOOMBERG, FORBES_OCT5)))
check("red circle is anchored to the counter (target, not coordinates)", any(o.get("target", {}).get("op") == "count" for o in ops(a, "annotate")))
structure(a, counter["t"] + counter["dur"], [["$1,000,000,000,000", "÷ $1.50"], [666_666_666_667], ["÷ 8.2 billion people"]])

# ---------------------------------------------------------------- 01B
print("\n01B  The $40 trillion US debt in $10K envelopes: how tall is it?")
DEBT = 40e12                           # envelope input: "$40 trillion" (crossed Aug 18 2026)
DEBT_AUG18 = 40.05e12                  # Treasury, close of business Tue Aug 18 2026 (as reported Aug 19-20)
DEBT_OCT5 = 40_249_104_431_078         # Debt to the Penny, Oct 5 2026 (FiscalData via IndexBox)
BILL_IN = 0.0043                       # BEP: thickness of one note, inches
BILLS_PER_ENV = 100                    # one $10K envelope = 100 x $100
R_EQ_KM = 6378.137                     # NASA Earth fact sheet, equatorial radius
BURJ_M = 828                           # CTBUH, Burj Khalifa height
GEO_KM = 35_786                        # AMS Glossary, geostationary altitude
MOON_KM = 384_400                      # NASA Space Place, average Earth-Moon distance

env_cm = BILL_IN * 2.54 * BILLS_PER_ENV
equator = 2 * math.pi * R_EQ_KM
print(f"  L1  100 x 0.0043 in = {BILL_IN * 100:.2f} in = {env_cm:.4f} cm per envelope  (envelope: ≈ 1.1 cm)")
m_env = 1e6 / 1e4
b_env = 1e9 / 1e4
print(f"      $1M = {m_env:,.0f} envelopes = {m_env * env_cm / 100:.3f} m   (said: just over a meter; shown ≈ 1.1 m)")
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
for name, debt in (("Aug 18 $40.05T", DEBT_AUG18), ("Oct 5 $40.249T", DEBT_OCT5)):
    k = debt / 1e4 * env_cm / 1e5
    print(f"      at {name}: {k:,.0f} km, {k / equator:.3f} laps, spare {k - equator:,.0f} km")
limit = 44_500 / 1.1 * 1e5 * 1e4
print(f"      refresh rule: card '≈ 44,000 km' (1.1 cm) holds while debt < ${limit / 1e12:.3f}T")
print(f"      'about $40T' vs the latest Debt to the Penny: within {within(DEBT, DEBT_OCT5):.2f}%")
ones_km = DEBT * BILL_IN * 2.54 / 1e5
print(f"      re-hook, in $1 bills: {DEBT:,.0f} x 0.0043 in = {ones_km:,.0f} km = {ones_km / MOON_KM:.2f} Earth-Moon distances")
b = spec("b")
stacks = ops(b, "stack")
px_per_m_1 = stacks[0]["ref"]["h"] / 1.7
check("$1M stack height in px matches 1.0922 m beside a 1.7 m person",
      abs(stacks[0]["h"] - m_env * env_cm / 100 * px_per_m_1) < 1.5)
check("$1B stack height in px = 1,092.2 m at 0.6 px/m", abs(stacks[1]["h"] - b_env * env_cm / 100 * 0.6) < 1.5)
check("both stacks are drawn as manila $10K envelopes (skin: envelope)", all(st.get("skin") == "envelope" for st in stacks))
burj = [o for o in ops(b, "annotate") if o.get("kind") == "box"][0]
check("Burj outline = 828 m at 0.6 px/m, standing on the same ground", abs(burj["h"] - BURJ_M * 0.6) < 1 and burj["y"] + burj["h"] == stacks[1]["y"])
check("4 billion envelopes", n_env == 4e9 and by_id(b, "envelopes")["lines"] == ["$40T ÷ $10K", "= 4 billion envelopes"])
check("card '≈ 44,000 km' = 4e9 x 1.1 cm", round(km_env) == 44_000 and ops(b, "envelope")[0]["card"][0] == "≈ 44,000 km")
check("card still holds at the latest Debt to the Penny", DEBT_OCT5 < limit)
check("stack is longer than the equator", km_exact > equator)
check("'≈ 1.1 laps' holds for the envelope figure AND the exact figure",
      round(km_env / equator, 1) == 1.1 == round(km_exact / equator, 1) and "≈ 1.1 laps of the equator" in texts(b))
check("on screen, the equator is the sourced 40,075 km", f"equator: {equator:,.0f} km" in texts(b))
check("$1B stack is taller than the Burj Khalifa", b_env * env_cm / 100 > BURJ_M)
check("'Just over a meter.' (VO) is the $1M stack: 1 m < 1.0922 m and it rounds to the on-screen ≈ 1.1 m",
      1 < m_env * env_cm / 100 and round(m_env * env_cm / 100, 1) == 1.1 and "Just over a meter." in b["vo"] and "waist" not in b["vo"])
check("'1.1 cm' on screen is 1.0922 cm rounded",round(env_cm, 1) == 1.1 and "1.1 cm" in " ".join(texts(b)) and "1.1 centimeters" in b["vo"])
structure(b, stacks[0]["t"] + stacks[0]["dur"],
          [["100 × $100 = $10K ≈ 1.1 cm"], ["$40T ÷ $10K", "= 4 billion envelopes"], ["≈ 44,000 km", "4 billion × 1.1 cm"]])

# ---------------------------------------------------------------- 01C
print("\n01C  $1,000,000 in pennies vs Lady Liberty: who's heavier?")
PENNY_G = 2.500                        # US Mint coin specifications
LB = 0.45359237                        # kg per pound (exact)
STATUE_LB = 560_000                    # NPS "Statue of Liberty Facts": estimated 560,000 lb (179,200 lb copper)
STATUE_1954_LB = 450_000               # NPS Historical Handbook No. 11 (1954): 450,000 lb = 225 tons
STATUE_STATS_LB = 176_000 + 440_000    # NPS "Statue Statistics": copper 176,000 lb + framework 440,000 lb
UNIT_COST = 0.0302                     # US Mint 2025 Annual Report: FY2025 penny unit cost 3.02 cents
UNIT_COST_FY24 = 0.0369                # FY2024 (previous version of this teaser)

pennies = 1_000_000 / 0.01
grams = pennies * PENNY_G
kg = grams / 1000
lb = kg / LB
tons = lb / 2000
statue_t = STATUE_LB / 2000
print(f"  L1  $1,000,000 / $0.01 = {pennies:,.0f} pennies")
print(f"  L2  x 2.5 g = {grams:,.0f} g = {kg:,.0f} kg = {lb:,.1f} lb = {tons:.2f} US tons  (card: ≈ 275 tons)")
print(f"      envelope 275 vs exact {tons:.2f}: within {within(275, tons):.2f}%")
print(f"      Lady Liberty (NPS facts) {STATUE_LB:,} lb = {statue_t:.0f} US tons = {STATUE_LB * LB / 1000:.1f} t; "
      f"she is heavier by {statue_t - tons:.2f} tons; pennies = {tons / statue_t:.3f} of her ({100 - tons / statue_t * 100:.1f}% short)")
for name, slb in (("NPS 1954 handbook", STATUE_1954_LB), ("NPS statistics copper+framework", STATUE_STATS_LB)):
    st = slb / 2000
    print(f"      vs {name} ({slb:,} lb = {st:.0f} tons): pennies/statue = {tons / st:.2f} -> {'pennies' if tons > st else 'statue'} heavier")
cost = pennies * UNIT_COST
print(f"  L3  {pennies:,.0f} x $0.0302 = ${cost:,.0f}  (said: about $3 million, within {within(3e6, cost):.2f}%)")
print(f"      at the FY2024 3.69 cents it was ${pennies * UNIT_COST_FY24:,.0f}")
print(f"      per dollar of pennies: 100 x 3.02 cents = ${100 * UNIT_COST:.2f}; weight of $1 in pennies = {100 * PENNY_G:.0f} g")
NICKEL_G = 5.000                       # US Mint coin specifications (pinned-comment follow-up)
nickels = 1_000_000 / 0.05
n_tons = nickels * NICKEL_G / 1000 / LB / 2000
print(f"      pinned follow-up, $1M in nickels: {nickels:,.0f} x 5 g = {nickels * NICKEL_G / 1000:,.0f} kg = {n_tons:.1f} US tons "
      f"({'lighter' if n_tons < STATUE_1954_LB / 2000 else 'heavier'} than every Lady Liberty figure)")
NOTE_G = 1.0                           # BEP: a note weighs about 1 gram
print(f"      TikTok ladder: $1M in $1 bills = {1e6 * NOTE_G / 1000:,.0f} kg = {1e6 * NOTE_G / 1000 / LB / 2000:.2f} US tons; "
      f"in $100 bills = {1e4 * NOTE_G / 1000:.0f} kg")
c = spec("c")
check("$1M in nickels is lighter than every Lady Liberty figure", n_tons < min(STATUE_LB, STATUE_1954_LB, STATUE_STATS_LB) / 2000)
check("100,000,000 pennies", pennies == 1e8 and "$1,000,000 = 100,000,000 pennies" in texts(c))
check("250,000,000 g", grams == 2.5e8 and "× 2.5 g = 250,000,000 g" in texts(c))
check("card '≈ 275 tons' rounds the exact US tons", round(tons / 5) * 5 == 275 and ops(c, "envelope")[0]["card"][0] == "≈ 275 tons")
check("stamp '280 tons' is the NPS 560,000 lb", statue_t == 280 and any(o["value"] == "280 tons" for o in ops(c, "postage")))
check("'she wins by a hair': statue heavier, by under 2%", tons < statue_t and (statue_t - tons) / statue_t < 0.02)
check("'photo finish' holds for the envelope figures too (275 vs 280)", 275 < 280 and (280 - 275) / 280 < 0.02)
check("$3.02M to mint", round(cost) == 3_020_000 and "100M × 3.02¢ = $3.02M" in texts(c) and "$3.02M to make $1M" in texts(c))
check("'about $3 million' (VO) is $3.02M rounded", round(cost / 1e6) == 3 and "about $3 million" in c["vo"])
check("sticky carries the FY2025 unit cost", "3.02¢" in ops(c, "sticky")[0]["text"] and "FY2025" in ops(c, "sticky")[0]["text"])
l1 = by_id(c, "l1")
structure(c, l1["t"] + len(l1["text"]) / l1["cps"], [["$1,000,000 = 100,000,000 pennies"], ["× 2.5 g = 250,000,000 g"], ["100M × 3.02¢ = $3.02M"]])

# ---------------------------------------------------------------- engine lint
print("\nengine lint (node src/cli.js check)")
res = subprocess.run(["node", "src/cli.js", "check"] + [f"specs/01-cost-in-envelopes-{k}.json" for k in "abc"],
                     cwd=ENGINE, capture_output=True, text=True)
print("  " + res.stdout.strip().replace("\n", "\n  "))
check("zero linter warnings on all three specs", res.returncode == 0 and "⚠" not in res.stdout and res.stdout.count("✓") == 3)

print(f"\n{'ALL CHECKS PASS' if not fails else f'{len(fails)} CHECK(S) FAILED'}")
raise SystemExit(1 if fails else 0)
