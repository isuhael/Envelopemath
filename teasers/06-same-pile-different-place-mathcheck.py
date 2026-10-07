#!/usr/bin/env python3
"""Same Pile (approach #6): recompute every number in teasers 06A, 06B and 06C and check it against the
specs (on-screen text, bar values, cross-out counts, captions and their spoken `say` lines) and the
pinned-comment claims.
Run from the repo root:  python3 teasers/06-same-pile-different-place-mathcheck.py
Standard library only. QA rewrite 2026-10-07; polish pass (new engine: em text, caption `say`) 2026-10-07.
Every real-world input below was re-checked by WebSearch on 2026-10-07 (see "Final fact check" in the md)."""
import json, os, re, unicodedata
from fractions import Fraction as F

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def spec(s):
    return json.load(open(os.path.join(ROOT, "engine", "specs", f"06-same-pile-different-place-{s}.json"), encoding="utf-8"))
def clean(t):
    return t.replace("*", "")
def texts(sp):
    out = []
    for o in sp["ops"]:
        t = o.get("text")
        if isinstance(t, list): out += [clean(x) for x in t]
        elif t: out.append(clean(t))
        for it in o.get("items", []): out.append(it.get("display", ""))
        if o.get("label"): out.append(o["label"])
    return out
def on_screen(sp, s):
    assert any(s in t for t in texts(sp)), f"not on screen in {sp['id']}: {s!r}"
def said(sp, s):
    """the voice says it: in a caption's `say` (or its text when no say) and in the vo script"""
    assert any(s in c.get("say", c["text"]) for c in sp["captions"]), f"not spoken in captions of {sp['id']}: {s!r}"
    assert s in sp["vo"], f"not in vo of {sp['id']}: {s!r}"
def shown(sp, s):
    assert any(s in c["text"] for c in sp["captions"]), f"not in caption text of {sp['id']}: {s!r}"
def off(est, exact):
    return abs(F(est) - F(exact)) / F(exact) * 100
def within(est, exact, claim):
    p = off(est, exact)
    assert p <= F(claim), f"claimed within {claim}% but it is {float(p):.3f}%"
    return float(p)
def graphemes(t):
    """user-perceived characters (the engine reveals handwriting glyph by glyph): flags are one, VS16 joins"""
    n, prev_ri = 0, False
    for ch in t:
        if ch in "️‍" or unicodedata.combining(ch): continue
        ri = 0x1F1E6 <= ord(ch) <= 0x1F1FF
        if ri and prev_ri: prev_ri = False; continue
        prev_ri = ri
        n += 1
    return n
def last2(sp, op_text):
    """the op whose text is op_text must finish writing inside the last 2 s (and before the loop crossfade)"""
    o = next(o for o in sp["ops"] if o.get("text") == op_text)
    done = o["t"] + graphemes(clean(o["text"])) / o.get("cps", 15)
    assert sp["duration"] - 2 <= done <= sp["duration"] - 0.35, (op_text, done, sp["duration"])
    return done

print("=== 06A  Same $1,000 of pay, 6 countries (OECD Taxing Wages 2026, 2025 data) ===")
A = spec("a")
PILE = 1000
rates = {"Chile": "7.1", "Switzerland": "18.1", "UK": "23.1", "USA": "24.3", "Germany": "38.7", "Belgium": "39.5"}
spoken = {"Chile": "seventy-one", "Switzerland": "one eighty-one", "UK": "two thirty-one", "USA": "Two forty-three",
          "Germany": "three eighty-seven", "Belgium": "Three ninety-five"}
bars = {o["items"][0]["value"]: o["items"][0]["display"] for o in A["ops"] if o["type"] == "bars"}
cut = {}
for c, r in rates.items():
    cut[c] = F(PILE) * F(r) / 100
    assert cut[c].denominator == 1
    v = int(cut[c])
    on_screen(A, f"{r}% = ${v}"); said(A, spoken[c]); shown(A, f"${v}")
    assert bars[v] == f"${v}"
    print(f"  {c:<12} $1,000 x {r:>4}% = ${v:<4} = {float(cut[c] / 100):.2f} envelopes of $100")
assert list(rates) == sorted(rates, key=lambda c: cut[c]), "must run ascending, extreme last"
assert cut["Chile"] < 100 and 100 < cut["Switzerland"] < 200          # "Not even one envelope" / "Under two envelopes"
oecd_avg = F(PILE) * F("25.1") / 100
assert cut["USA"] < oecd_avg                                          # "Just under the OECD average"
print(f"  OECD average 25.1% -> ${float(oecd_avg):.0f}; USA ${int(cut['USA'])} is ${float(oecd_avg - cut['USA']):.0f} under it")
ratio = cut["Belgium"] / cut["Chile"]
print(f"  Line 2: $395 / $71 = {float(ratio):.4f} -> '5½x' is {within('5.5', ratio, '1.2'):.2f}% off (pin says within 1.2%)")
on_screen(A, "$395 ÷ $71 ≈ 5½×"); said(A, "Five and a half times"); shown(A, "5½×")
env = cut["Belgium"] / 100
crosses = sum(1 for o in A["ops"] if o["type"] == "annotate" and o["kind"] == "cross")
assert crosses == round(env) == 4
print(f"  Line 3: Belgium pulls {float(env):.2f} envelopes -> '≈ 4 of 10' ({crosses} crossed) is {within(4, env, '1.3'):.2f}% off (pin: within 1.3%)")
on_screen(A, "≈ 4 of 10 ✉"); said(A, "almost four envelopes out of ten")
assert env < 4                                                        # "almost four"
print(f"  Germany vs Belgium gap: ${int(cut['Belgium'] - cut['Germany'])}")
print(f"  hero '≈ 4 of 10' finishes at {last2(A, '🇧🇪 ≈ 4 of 10 ✉'):.2f} s of {A['duration']} s")

print("\n=== 06B  Same $1,000 cash, 6 decades (BLS CPI-U, NSA, August of each year) ===")
B = spec("b")
NOW = F("334.980")   # August 2026
cpi = {"2016": F("240.849"), "2006": F("203.9"), "1996": F("157.3"), "1986": F("109.7"), "1976": F("57.4"), "1966": F("32.7")}
pct_said = {"2016": "twenty-eight percent", "2006": "Thirty-nine percent", "1996": "Fifty-three percent",
            "1986": "Sixty-seven percent", "1976": "Eighty-three", "1966": "Ninety percent"}
# cumulative cross-outs must equal the rounded envelopes of buying power lost
cross_ts = sorted(o["t"] for o in B["ops"] if o["type"] == "annotate" and o["kind"] == "cross")
year_t = {o["text"]: o["t"] for o in B["ops"] if isinstance(o.get("text"), str) and o["text"] in cpi}
assert list(year_t) == list(cpi), "years must run newest first, extreme last"
ends = sorted(year_t.values())[1:] + [B["duration"]]
for (y, c), end in zip(cpi.items(), ends):
    then = F(PILE) * c / NOW
    loss = 1 - c / NOW
    eaten = loss * 10
    crossed = sum(1 for t in cross_ts if t < (end if y != "1966" else 25.4))
    pct = round(loss * 100)
    on_screen(B, f"buys {pct}% less"); on_screen(B, f"= what ${round(then)} bought in {y}")
    said(B, pct_said[y]); shown(B, f"{pct}%")
    assert crossed == round(eaten), (y, crossed, float(eaten))
    print(f"  {y}: CPI {float(c):>7.3f}  buys {float(loss * 100):5.2f}% less -> '{pct}%'; = what ${float(then):6.2f} bought then -> '${round(then)}'; "
          f"envelopes eaten {float(eaten):.2f} -> {crossed} crossed")
mult = NOW / cpi["1966"]
exact = F(PILE) * cpi["1966"] / NOW
print(f"  Line 2: 335 / 32.7 = {float(F(335) / F('32.7')):.3f} ≈ 10x  (exact 334.980 / 32.7 = {float(mult):.4f}); said 'ten times'")
on_screen(B, "prices: 335 ÷ 32.7 ≈ 10×"); said(B, "ten times higher"); shown(B, "10×")
print(f"  Line 3: $1,000 / 10 = $100; exact ${float(exact):.2f} -> {within(100, exact, '2.5'):.2f}% off (pin: within 2.5%)")
on_screen(B, "$1,000 ÷ 10 ≈ $100"); said(B, "buys a hundred")
print(f"  Matching 1966's $1,000 today takes ${float(F(PILE) * mult):,.2f}")
yoy = NOW / F("323.976") - 1
print(f"  Consistency: Aug 2026 334.980 vs Aug 2025 323.976 = +{float(yoy * 100):.2f}% y/y (release headline: +3.4%)")
assert round(yoy * 1000) == 34
print(f"  hero '$100' finishes at {last2(B, '$1,000 ÷ 10 ≈ $100'):.2f} s of {B['duration']} s")

print("\n=== 06C  Same $1 million, 6 jobs (BLS May 2025 medians; statute; AFL-CIO 2026) ===")
C = spec("c")
GOAL = 1_000_000
mw = F("7.25") * 40 * 52
assert mw == 15080
on_screen(C, "$7.25/hr × 2,080 hrs")
pay = {"Minimum wage": mw, "HS teacher": F(72040), "Nurse (RN)": F(97550), "Software dev": F(135980),
       "US President": F(400000), "S&P 500 CEO": F(22_800_000)}
header = {j: f"$1M ÷ ${int(p):,} a year" for j, p in pay.items()}
header["S&P 500 CEO"] = "$1M ÷ $22.8M a year"
yrs_shown = {"Minimum wage": "66.3 yrs", "HS teacher": "13.9 yrs", "Nurse (RN)": "10.3 yrs", "Software dev": "7.4 yrs", "US President": "2.5 yrs"}
for job, p in pay.items():
    yrs = F(GOAL) / p
    on_screen(C, header[job])
    if job in yrs_shown:
        assert f"{float(yrs):.1f} yrs" == yrs_shown[job]; on_screen(C, yrs_shown[job])
    print(f"  {job:<13} ${float(p):>13,.0f}/yr -> {float(yrs):8.4f} yrs = {float(yrs * 365):9.2f} days   [{header[job]}]")
assert list(pay) == sorted(pay, key=lambda j: -(F(GOAL) / pay[j])), "must run longest first, extreme last"
assert 66 < F(GOAL) / mw < 67 and 13.5 <= F(GOAL) / pay["HS teacher"] < 14.5          # "sixty-six", "about fourteen"
assert 10 < F(GOAL) / pay["Nurse (RN)"] < 10.5 and 7 < F(GOAL) / pay["Software dev"] < 7.5  # "just over ten / seven"
said(C, "sixty-six years"); said(C, "about fourteen"); said(C, "just over ten"); said(C, "just over seven")
said(C, "Four hundred grand"); said(C, "Two and a half years"); shown(C, "$400K"); shown(C, "2½ years")
days = F(GOAL) / pay["S&P 500 CEO"] * 365
day_pay = pay["S&P 500 CEO"] / 365
env_h = F(100_000) / day_pay * 24
mw_env = F(100_000) / mw
assert round(days) == 16 and round(day_pay / 1000) == 62 and round(env_h) == 38 and f"{float(mw_env):.1f}" == "6.6"
on_screen(C, "16 days"); on_screen(C, "$22.8M ÷ 365 ≈ $62K a day"); on_screen(C, "all 10 ✉ in 16 days")
on_screen(C, "minimum wage:"); on_screen(C, "1 ✉ ≈ 6.6 yrs")
said(C, "Sixteen days"); said(C, "Sixty-two grand a day"); said(C, "thirty-eight hours"); said(C, "six point six years")
shown(C, "16 days"); shown(C, "$62K a day"); shown(C, "38 hours"); shown(C, "6.6 years")
print(f"  CEO: $1M in {float(days):.4f} days -> '16 days' is {within(16, days, '0.1'):.3f}% off (pin: within 0.1%)")
print(f"  CEO day rate ${float(day_pay):,.2f} -> '$62K'; one $100K envelope every {float(env_h):.2f} h -> 'thirty-eight hours'")
print(f"  Line 3: min wage, one $100K envelope = $100K / $15,080 = {float(mw_env):.4f} yrs -> '6.6 yrs' ({off('6.6', mw_env):.2f}% off)")
print(f"  With Musk (AFL-CIO $340.1M): $1M in {float(F(GOAL) / F(340_100_000) * 365):.2f} days; CEO / President pay = {float(pay['S&P 500 CEO'] / pay['US President']):.0f}x")
print(f"  hero '6.6 yrs' finishes at {last2(C, '1 ✉ ≈ 6.6 yrs'):.2f} s of {C['duration']} s")

print("\n=== Captions: at most 4 words/s (the linter's pace rule) ===")
for sp in (A, B, C):
    worst = max(len(c["text"].split()) / (c["end"] - c["t"]) for c in sp["captions"])
    assert worst <= 4, (sp["id"], worst)
    print(f"  {sp['id']}: {len(sp['captions'])} captions, fastest {worst:.2f} words/s")

print("\n=== Extra beats for the longer IG (~45 s) / TikTok (~65 s) cuts ===")
for c, r in {"Mexico": "13.2", "Korea": "16.5", "Japan": "22.6", "Lithuania": "38.7"}.items():
    print(f"  06A+ {c:<10} $1,000 x {r}% = ${float(F(PILE) * F(r) / 100):.0f}")
for y, c in cpi.items():
    print(f"  06B+ {y}: matching its $1,000 today takes ${float(F(PILE) * NOW / c):,.2f}")
print(f"  06C+ Airline pilot $232,140 -> {float(F(GOAL) / 232140):.3f} yrs")
print("\nALL CHECKS PASSED")
