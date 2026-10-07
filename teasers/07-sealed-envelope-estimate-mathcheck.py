#!/usr/bin/env python3
"""Math and spec check for approach 7, The Sealed-Envelope Estimate (Sealed Answer No. 07A, 07B, 07C).

Recomputes every spoken, written, carded and pinned number, then opens the three engine specs and
checks that the on-screen text, captions, arrow positions and beat timings agree with the math.
Standard library only. Run: python3 teasers/07-sealed-envelope-estimate-mathcheck.py
"""
import json
import math
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ok = 0


def check(label, cond):
    global ok
    if not cond:
        raise AssertionError(label)
    ok += 1
    print(f"  [ok] {label}")


def off(est, exact):
    return abs(exact - est) / exact


def spec(stem):
    with open(os.path.join(ROOT, "engine", "specs", stem + ".json"), encoding="utf-8") as f:
        return json.load(f)


def texts(s):
    """Every string a viewer can read in the spec (ops and captions)."""
    out = []
    for op in s["ops"]:
        for k in ("text", "note", "label", "value"):
            v = op.get(k)
            if isinstance(v, str):
                out.append(v)
            elif isinstance(v, list):
                out.extend(x for x in v if isinstance(x, str))
        for c in op.get("card", []):
            out.append(c if isinstance(c, str) else c["text"])
        for m in op.get("marks", []):
            out.append(m["text"])
    out.extend(c["text"] for c in s["captions"])
    return "\n".join(out)


def ops_of(s, kind):
    return [o for o in s["ops"] if o["type"] == kind]


def structure(s, first_number_t):
    """Brand timing and legibility rules for the upgraded engine (polish pass, 2026-10-07)."""
    T = s["duration"]
    hooks = ops_of(s, "hook")
    first = min(hooks, key=lambda h: h["t"])
    check(f"{s['id']}: hook at t 0 (renders finished, so frame 0 is the thumbnail)", first["t"] == 0)
    check(f"{s['id']}: no negative-t hook hacks", all(h["t"] >= 0 for h in hooks))
    pm = ops_of(s, "postmark")[0]
    check(f"{s['id']}: postmark in the flap (175, 258, r 100) at t 0, persistent",
          (pm["x"], pm["y"], pm["r"], pm["t"], pm.get("persist")) == (175, 258, 100, 0, True))
    # props without an `instant` mode slide in (envelope 0.45 s, grid 0.3 s, postage 0.35 s): a
    # negative t (README: "already on screen in frame 0") puts them fully in place for the thumbnail
    early = [o for o in s["ops"] if o["t"] < 0]
    need = {"envelope": 0.45, "grid": 0.3, "postage": 0.35}
    check(f"{s['id']}: frame-0 props fully in place at frame 0 ({', '.join(o['type'] for o in early)})",
          all(o["type"] in need and -o["t"] >= need[o["type"]] for o in early))
    sealed = [e for e in ops_of(s, "envelope") if not e.get("card")]
    check(f"{s['id']}: guess-window envelope stays sealed (no openAt)", sealed and all("openAt" not in e for e in sealed))
    check(f"{s['id']}: first payoff by 40% ({first_number_t:.1f} s of {T} s = {first_number_t / T:.0%})", first_number_t <= 0.4 * T)
    env = [e for e in ops_of(s, "envelope") if e.get("card")][-1]
    card_out = env["openAt"] + 1.05
    check(f"{s['id']}: hero card out at 85-95% ({card_out:.2f} s = {card_out / T:.0%})", 0.85 * T <= card_out <= 0.95 * T)
    check(f"{s['id']}: hero card number >= 100 px ({env['cardSize']} px)", env["cardSize"] >= 100)
    st = ops_of(s, "stamp")[-1]
    check(f"{s['id']}: verdict stamp in the last 2 s ({st['t']} s, ends {T} s)", st["t"] >= T - 2.0)
    check(f"{s['id']}: loop on", s.get("loop") is True)
    hand = [o for o in ops_of(s, "write") if o.get("font", "hand") == "hand"]
    small = [o["text"] for o in hand if o["size"] < 64]
    check(f"{s['id']}: every handwritten line >= 64 px", not small)
    ids = {o["id"] for o in s["ops"] if "id" in o}
    marks = [o for o in ops_of(s, "annotate") if "target" in o]
    check(f"{s['id']}: {len(marks)} text marks use target anchors on existing ids", marks and all(m["target"]["op"] in ids for m in marks))
    vo = s["vo"].split(" / ")
    check(f"{s['id']}: one VO line per caption ({len(vo)})", len(vo) == len(s["captions"]))
    check(f"{s['id']}: each caption's VO line is its 'say' (or its text)",
          all(v == c.get("say", c["text"]) for v, c in zip(vo, s["captions"])))
    fast = [c["text"] for c in s["captions"] if len(c["text"].split()) / (c["end"] - c["t"]) > 4]
    check(f"{s['id']}: every caption <= 4 words/s", not fast)


# ======================================================================== 07A
print("=" * 72)
print("07A  Fry's 93 cents, 1,000 years at 2.25% (Futurama, 'A Fishful of Dollars', 1999)")
print("=" * 72)
P, r, Y = 0.93, 0.0225, 1000
exact = P * (1 + r) ** Y
print(f"  exact balance 0.93 x 1.0225^1000 = ${exact:,.2f}")
check("the show's '$4.3 billion' = exact rounded to $0.1B", round(exact / 1e9, 1) == 4.3)
t72, t70 = 72 / 2.25, 70 / 2.25
d72, d70 = Y / t72, Y / t70
print(f"  rule of 72: {t72:.2f} yrs -> {d72:.2f} doublings; rule of 70: {t70:.2f} yrs -> {d70:.2f} doublings")
check("'72 / 2.25 = 32 yrs'", t72 == 32)
check("'doublings ~ 31' (1000/32 = 31.25)", round(d72) == 31)
check("'70 / 2.25 = 31 yrs' (31.11)", round(t70) == 31)
check("'doublings ~ 32' (1000/31.11 = 32.14)", round(d70) == 32)
low, high = P * 2 ** 31, P * 2 ** 32
print(f"  rule of 72: 93c x 2^31 = ${low:,.2f}; rule of 70: 93c x 2^32 = ${high:,.2f}")
check("rule-of-72 column '$2B'", round(low / 1e9) == 2)
check("rule-of-70 column '$4B'", round(high / 1e9) == 4)
check("'1 yr apart' (32 - 31.11 = 0.89 yr, rounds to 1)", round(t72 - t70) == 1)
check("'= $2B apart' ($4B - $2B)", round((high - low) / 1e9) == 2)
check("'70 wins' (rule of 70 is closer to the exact balance)", off(high, exact) < off(low, exact))
print(f"  rule of 70 is {off(high, exact):.2%} low; rule of 72 is {off(low, exact):.2%} low")
check("'rule of 70: within 7%'", off(high, exact) < 0.07)
check("pinned 'rule of 72 ... 53% low'", round(off(low, exact) * 100) == 53)
check("neither rule is labelled an upper bound (exact > both columns)", exact > high > low)
t_exact = math.log(2) / math.log(1 + r)
print(f"  exact doubling time {t_exact:.2f} yrs -> {Y / t_exact:.2f} doublings; exact constant {2.25 * t_exact:.2f}")
check("pinned '31.15 years', '32.1 doublings', 'constant 70.1'",
      f"{t_exact:.2f}" == "31.15" and f"{Y / t_exact:.1f}" == "32.1" and f"{2.25 * t_exact:.1f}" == "70.1")
lo_x, hi_x = 1.0, 20.0
for _ in range(80):
    mid = (lo_x + hi_x) / 2
    if 72 / mid > math.log(2) / math.log(1 + mid / 100):
        lo_x = mid
    else:
        hi_x = mid
print(f"  the rule of 72 is exact at {lo_x:.2f}%")
check("'72 is tuned for 8%' (exact at 7.85%)", round(lo_x) == 8)
y500 = P * (1 + r) ** 500
print(f"  year 500: ${y500:,.2f}; year 900: ${P * (1 + r) ** 900:,.0f}; year 950: ${P * (1 + r) ** 950:,.0f}")
check("'year 500: $63K' / 'just sixty-three grand'", round(y500 / 1000) == 63)
check("TikTok beat 'year 900: $463M'", round(P * (1 + r) ** 900 / 1e6) == 463)
check("TikTok beat 'year 950: $1.4B'", round(P * (1 + r) ** 950 / 1e9, 1) == 1.4)
share31 = 1 - (1 + r) ** -31
print(f"  share of the final balance earned in the last 31 years: {share31:.2%}")
check("'½ in the last 31 yrs' (within 1 point of half)", abs(share31 - 0.5) < 0.01)
check("curve mark i=969 sits at half the final balance (within 1%)", abs(P * (1 + r) ** 969 / exact - 0.5) < 0.01)

A = spec("07-sealed-envelope-estimate-a")
ta = texts(A)
for s in ("72 ÷ 2.25", "70 ÷ 2.25", "32 yrs", "31 yrs", "≈ 31", "≈ 32", "$2B", "$4B", "$4.3B",
          "1 yr apart = $2B apart", "year 500: $63K", "½ in the last 31 yrs", "rule of 70: within 7%",
          "93¢, 2.25% a year, 1,000 years (Futurama, 1999)", "RULE OF 72", "RULE OF 70", "$2B or $4B?"):
    check(f"07A spec shows {s!r}", s in ta)
check("07A spec has no LOW/HIGH labels (they implied the $4B was a ceiling)", "LOW" not in ta and "HIGH" not in ta)
curve = ops_of(A, "curve")[0]
check("07A curve uses the show's inputs", curve["fn"] == {"type": "compound", "principal": P, "rate": r, "years": Y})
first_a = next(o["t"] for o in A["ops"] if o.get("text") == "$2B")
structure(A, first_a)

# ======================================================================== 07B
print("=" * 72)
print("07B  The 100 Envelope Challenge ($1 in envelope 1 ... $100 in envelope 100)")
print("=" * 72)
n = 100
total = sum(range(1, n + 1))
lo_b, hi_b, avg, est = n * 1, n * 100, total / n, n * 50
print(f"  LOW {n} x $1 = ${lo_b:,}; HIGH {n} x $100 = ${hi_b:,}; average ${avg:.2f}; estimate ${est:,}; exact ${total:,}")
check("LOW '100 × $1 = $100'", lo_b == 100)
check("HIGH '100 × $100 = $10,000'", hi_b == 10_000)
check("'average ≈ $50' (exact $50.50)", round(avg) in (50, 51) and abs(avg - 50) < 1)
check("estimate '100 × $50 ≈ $5,000'", est == 5_000)
check("sealed card '$5,050' (1 + 2 + ... + 100)", total == 5_050)
check("pairing: 50 pairs x $101 = $5,050", 50 * 101 == total)
check("'exactly halfway' between $100 and $10,000", (lo_b + hi_b) / 2 == total)
check("pinned 'within 1%' (0.99%)", off(est, total) < 0.01)
check("'under $100 or over ten grand: already out'", lo_b < total < hi_b)
w52 = sum(range(1, 53))
check("52-week total $1,378 = (52 + 2,704) / 2", w52 == 1_378 == (52 * 1 + 52 * 52) / 2)
B = spec("07-sealed-envelope-estimate-b")
tb = texts(B)
for s in ("100 × $1 = $100", "100 × $100 = $10,000", "MIDDLE: average ≈ $50", "100 × $50 ≈ $5,000",
          "$5,050", "exactly halfway", "$1, $2, $3 … $100", "ours: ≈ $5,000", "$100", "$10,000"):
    check(f"07B spec shows {s!r}", s in tb)
arrow_b = next(o for o in ops_of(B, "annotate") if o["kind"] == "arrow")
x_b = 200 + (total - lo_b) / (hi_b - lo_b) * 600
print(f"  ruler arrow x = {x_b:.1f} px (ruler 200..800)")
check("07B arrow at the dead centre of the ruler", arrow_b["kind"] == "arrow" and arrow_b["to"][0] == round(x_b) == 500)
first_b = next(o["t"] for o in B["ops"] if o.get("text") == "100 × $1 = $100")
structure(B, first_b)

# ======================================================================== 07C
print("=" * 72)
print("07C  The Eras Tour gross (Billboard Boxscore final tally; verified by WebSearch 2026-10-07)")
print("=" * 72)
# Billboard, 'Taylor Swift's The Eras Tour Wraps as First Tour to Pass $2 Billion in Sales' (after the Dec 8, 2024 finale):
# 149 shows, $2,077,618,725, 10,168,008 tickets. Verified by WebSearch 2026-10-07 (see the md's Final fact check).
shows, gross, tickets = 149, 2_077_618_725, 10_168_008
fans_lo, fans_hi, price_lo, price_hi = 60_000, 75_000, 150, 250  # on-screen ASSUME sticky
t_lo, t_hi = shows * fans_lo, shows * fans_hi
g_lo, g_hi = t_lo * price_lo, t_hi * price_hi
print(f"  tickets {t_lo:,} | {t_hi:,}; gross ${g_lo:,} | ${g_hi:,}")
check("'8.9M' tickets", round(t_lo / 1e6, 1) == 8.9)
check("'11.2M' tickets", round(t_hi / 1e6, 1) == 11.2)
check("'about 9 to 11 million tickets'", round(t_lo / 1e6) == 9 and round(t_hi / 1e6) == 11)
check("'$1.3B'", round(g_lo / 1e9, 1) == 1.3)
check("'$2.8B'", round(g_hi / 1e9, 1) == 2.8)
mid_a, mid_g = (g_lo + g_hi) / 2, math.sqrt(g_lo * g_hi)
print(f"  middle: arithmetic ${mid_a:,.0f}; geometric ${mid_g:,.0f}")
check("'middle ≈ $2B' (both midpoints round to 2)", round(mid_a / 1e9) == 2 and round(mid_g / 1e9) == 2)
check("sealed card '$2.08B'", round(gross / 1e9, 2) == 2.08)
check("'inside our range'", g_lo < gross < g_hi)
print(f"  '$2B' vs exact: {off(2e9, gross):.2%}")
check("pinned 'within 4%'", off(2e9, gross) < 0.04)
print(f"  per show ${gross / shows:,.0f}; avg ticket ${gross / tickets:.2f}; avg crowd {tickets / shows:,.0f}")
check("pinned 'about $13.9M a night'", round(gross / shows / 1e6, 1) == 13.9)
check("pinned '68,242 fans a night' inside the 60K-75K assumption", round(tickets / shows) == 68_242 and fans_lo < tickets / shows < fans_hi)
check("pinned '$204.33 a ticket' inside the $150-$250 assumption", f"{gross / tickets:.2f}" == "204.33" and price_lo < gross / tickets < price_hi)
pollstar = 2.2e9  # Pollstar estimate via AP, Dec 9, 2024 (pin only)
check("pinned 'Pollstar estimate $2.2B is also inside our range'", g_lo < pollstar < g_hi)
C = spec("07-sealed-envelope-estimate-c")
tc = texts(C)
for s in ("149 × 60K–75K", "8.9M", "11.2M", "$150", "$250", "$1.3B", "$2.8B", "middle ≈ $2B", "$2.08B",
          "ours: $1.3B – $2.8B", "60K–75K fans a night. Avg ticket $150–$250. Our guesses, not data."):
    check(f"07C spec shows {s!r}", s in tc)
arrow_c = next(o for o in ops_of(C, "annotate") if o["kind"] == "arrow")
x_c = 200 + (gross - g_lo) / (g_hi - g_lo) * 600
print(f"  ruler arrow x = {x_c:.1f} px (exact ends); {200 + (gross / 1e9 - 1.3) / 1.5 * 600:.1f} px against the rounded labels")
check("07C arrow at the exact position", arrow_c["kind"] == "arrow" and arrow_c["to"][0] == round(x_c) == 504)
first_c = next(o["t"] for o in C["ops"] if o.get("text") == "8.9M")
structure(C, first_c)

print("=" * 72)
print(f"ALL {ok} CHECKS PASSED")
