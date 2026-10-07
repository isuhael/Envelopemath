"""Math check for Envelope Puzzle No. 08A / 08B / 08C (The Trap Card).
Run from the repo root: python3 teasers/08-trap-card-mathcheck.py
Recomputes every number in the md (scripts, envelope lines, pinned comments, descriptions) and
cross-checks the on-screen strings in engine/specs/08-trap-card-{a,b,c}.json against the math."""
import datetime as dt
import json
import pathlib
from collections import Counter
from fractions import Fraction as F

ROOT = pathlib.Path(__file__).resolve().parent.parent
def pct(x): return f"{x * 100:.2f}%"
def within(env, exact): return abs(env - exact) / abs(exact)
def spec(f): return json.loads((ROOT / f"engine/specs/08-trap-card-{f}.json").read_text())
def texts(s):
    out = []
    for o in s["ops"]:
        t = o.get("text")
        if t is None: continue
        out += t if isinstance(t, list) else [t]
    return [t.replace("*", "") for t in out]

print("=== 08A  $2,500 every 2 weeks ===")
pay = 2_500
trap = pay * 24                          # "twice a month" thinking = 2 x 12 = 24 checks
paydays = 52 // 2                        # 52 weeks / 2
answer = pay * paydays
assert (trap, paydays, answer) == (60_000, 26, 65_000)
print(f"trap (on screen, '24' struck): ${pay:,} x 24 = ${trap:,}")
print(f"52 weeks / 2 = {paydays} paydays;  ${pay:,} x {paydays} = ${answer:,};  missed: ${answer - trap:,} = {(answer - trap) // pay} checks")
bls_week = 1_251                         # BLS median usual weekly earnings, full-time, Q2 2026
bls_biweekly, bls_year = bls_week * 2, bls_week * 52
print(f"BLS median: ${bls_week:,}/wk -> ${bls_biweekly:,} every 2 weeks -> ${bls_year:,}/yr")
print(f"$2,500 vs ${bls_biweekly:,}: off by {pct(within(pay, bls_biweekly))}; ${answer:,} vs ${bls_year:,}: within {pct(within(answer, bls_year))}")
assert within(answer, bls_year) < 0.001
# A 26-payday year has exactly two 3-payday months: every month holds at least 2 biweekly
# paydays (28+ days) and at most 3, and 26 = 12 x 2 + 2.
anchor = dt.date(2026, 1, 2)             # every other Friday from Fri 2 Jan 2026
assert anchor.weekday() == 4
dates = [anchor + dt.timedelta(days=14 * k) for k in range(60)]
for y in (2026, 2027):
    ds = [d for d in dates if d.year == y]
    c = Counter(d.month for d in ds)
    print(f"{y}: {len(ds)} paydays on the calendar, 3-payday months {sorted(m for m, n in c.items() if n == 3)}, first {ds[0]}, last {ds[-1]}")
first_2027 = anchor + dt.timedelta(days=14 * 26)
assert (first_2027.month, first_2027.day) == (1, 1)
print(f"caveat: the first 2027 payday ({first_2027}) is New Year's Day, a bank holiday; payrolls that pay the business day before move it to 2026-12-31,"
      " so the md no longer names a specific 27-check year")
tot = Counter()
for off in range(14):                    # every possible biweekly phase, years 2000-2100
    c, d = Counter(), dt.date(1999, 12, 1) + dt.timedelta(days=off)
    while d.year <= 2100:
        if d.year >= 2000: c[d.year] += 1
        d += dt.timedelta(days=14)
    for y in range(2000, 2101): tot[c[y]] += 1
every = (tot[26] + tot[27]) / tot[27]
print(f"27-payday years: {tot[27]} of {tot[26] + tot[27]} schedule-years -> one every {every:.1f} years; 27 x ${pay:,} = ${27 * pay:,}")
print(f"long-run average: 365.2425 / 14 = {365.2425 / 14:.3f} paydays a year (= 26 + 1/{1 / (365.2425 / 14 - 26):.1f})")
assert round(every) == 11 and 27 * pay == 67_500

print("\n=== 08B  Stocks fell 57% (S&P 500, Oct 9 2007 -> Mar 9 2009) ===")
peak, low, regain = 1565.15, 676.53, 1569.19
drop = 1 - low / peak
need = peak / low - 1
assert round(drop * 100) == 57
print(f"drop: 1 - {low}/{peak} = {pct(drop)}  (said '57%'); {(2009 - 2007) * 12 + (3 - 10)} months peak to low")
print(f"trap (on screen): $43 + 57% = ${43 * 1.57:.2f}, not $100; index: {low} x 1.57 = {low * 1.57:.2f}, still {pct(1 - low * 1.57 / peak)} below the peak")
assert round(43 * 1.57, 2) == 67.51
print(f"exact gain to get back: {peak}/{low} = {peak / low:.4f} -> +{pct(need)}")
print(f"with the rounded 57%: 1/0.43 - 1 = +{pct(1 / 0.43 - 1)}")
print(f"envelope: $43 x 2.3 = ${43 * 2.3:.1f} (~$100) -> +130%; within {pct(within(1.30, need))} of +{pct(need)} (stated 'within 1.1%')")
assert within(1.30, need) < 0.011
print(f"rule: -50% takes +{pct(1 / 0.5 - 1)} to get back;  regained {regain} > {peak}: {regain > peak}")
t_peak = (dt.date(2013, 3, 28) - dt.date(2007, 10, 9)).days / 365.25
t_low = (dt.date(2013, 3, 28) - dt.date(2009, 3, 9)).days / 365.25
print(f"peak -> new closing high: {t_peak:.2f} yrs (stated 'about 5 1/2');  bottom -> new high: {t_low:.2f} yrs")
assert abs(t_peak - 5.5) < 0.05

print("\n=== 08C  Gatorade 32 oz -> 28 oz, same price ===")
old, new = 32, 28
less = F(old - new, old)
more = F(old, new) - 1
assert less == F(1, 8) and more == F(1, 7)
print(f"trap (on screen): 4 / 32 = {pct(float(less))} = less drink, not the price change")
print(f"exact: price per oz up = 32/28 - 1 = 4/28 = 1/7 = +{pct(float(more))}")
print(f"envelope: 'about 1/7 = +14%'; within {pct(within(0.14, float(more)))} of exact (stated 'within 2%')")
assert within(0.14, float(more)) <= 0.02 + 1e-12
print(f"check: 1 - 1/(1 + 1/7) = {1 - 1 / (1 + more)} (the 1/8 shrink)")
print(f"rule: shrink by 1/n -> pay 1/(n-1) more per unit; e.g. 1/10 smaller -> +{pct(10 / 9 - 1)}")

print("\n=== on-screen strings in the specs ===")
need_on_screen = {
    "a": ["$2,500 every 2 weeks", "is NOT $60,000 a year!", "1 year = $ ?", "$2,500 × 24 = $60,000", "pre-tax pay ≈ US median (BLS)"],
    "b": ["Stocks fell 57%.", "is NOT +57%!", "To get back: + ? %", "$43 + 57% = $100?", "$67.51", "S&P 500 price only, Oct '07 → Mar '09"],
    "c": ["Gatorade: 32 oz → 28 oz", "Same price.", "The hike is NOT 12.5%!", "Per ounce: + ? %", "4 ÷ 32 = 12.5%", "less drink", "same shelf price, old & new bottle"],
}
for f, want in need_on_screen.items():
    s = spec(f)
    have = texts(s)
    missing = [w for w in want if w not in have]
    assert not missing, (f, missing)
    hook = next(o for o in s["ops"] if o["type"] == "hook")
    assert hook["t"] <= -0.2 - 0.14 * (len(hook["text"]) - 1), "hook must be fully on screen in frame 0"
    caps = " ".join(c["text"] for c in s["captions"])
    print(f"08{f.upper()}: on-screen strings present; hook fully drawn at t=0; captions: {caps}")
assert "60 grand" in " ".join(c["text"] for c in spec("a")["captions"])
assert "+57%" in " ".join(c["text"] for c in spec("b")["captions"])
assert "12.5%" in " ".join(c["text"] for c in spec("c")["captions"])
print("\nall asserts passed")
