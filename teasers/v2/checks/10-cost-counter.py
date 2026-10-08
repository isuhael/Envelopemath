#!/usr/bin/env python3
"""
Format 10 "cost-counter" (real-time cost counter): maths and spec check for teasers 10a, 10b and 10c.

1. Recomputes every on-screen number from its inputs. The sourced real-world inputs are named constants below
   (publisher, date and URL for each are in teasers/v2/10-cost-counter.md, "Sources"). Everything else is
   arithmetic on them, done in exact fractions.
2. Builds every display string the specs should carry (header, footer, VO caption lines, verdict, data.label,
   rateDisplay, milestone labels, final, and every text in lookOpts) from those numbers.
3. Loads the three spec JSONs from studio/specs/ and asserts:
   - every display string equals the computed, formatted string exactly;
   - every number token in every display string and VO line is a computed value or a labelled constant;
   - "≈" sits on every rounded result and on no exact one (rate, counter final, times, rounded VO numbers);
   - numerics: perSecond = exact rate to the cent; the counter final = perSecond × run time (checked with the
     stored and the exact rate), or, when the counter stops on its last milestone (10a, 10b, 10c), that milestone's exact
     amount with no "≈" (the stop is within $0.50 of it at both rates, so the dollar reading is exact); milestones
     ascend and are all passed before the counter stops;
   - frame 1: the header asks a question (R11) and the footer carries the viewer-owned pay number
     ("$1,251 ... × 52") at t = 0 (R1, R3); the counter starts where the write-up says (0.0 s in all three:
     10b's armed pause is gone since the hook pass);
   - one rounding per quantity: any number within 5% of a computed quantity, in any display string, VO line,
     caption or pinned comment, must be that quantity's one shown rounding (no "$22,733" beside "$22,700");
   - timing:
     every VO line fits 2.6 words/s (d >= words / 2.6) and ends before the next starts; each milestone's pass
     time (counterT[0] + value / perSecond) is within 0.5 s of the moment its VO line says it; lookOpts beats
     start with their VO line; the verdict lands with its VO line; the counter stops within 0.2 s of the
     verdict; duration is inside the 20-40 s lane and covers the last VO line (+0.4 s) and the verdict (+2.5 s);
     hold = duration - counterT[1];
   - look-specific (10c, ported from the Live Sheet to the Scoreboard on 2026-10-08): the kit's passes
     (value ÷ perSecond, from 0.0 s) land at 1.000 / 5.000 / 13.201 / 26.403 s, before the stop; the ladder
     (pipLabels) is the milestones' own amounts and pipPassed the answers the label stack slams; every label beat
     holds to the next one, so the resting rate never flashes between beats;
   - contract shape (studio/FORMATS.md, common fields + section 10), captions on, fps 30, id = file stem;
   - the caption and pinned-comment numbers in teasers/v2/10-cost-counter.md are computed or sourced values.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/10-cost-counter.py
"""
import json
import math
import re
import sys
from fractions import Fraction as F
from pathlib import Path

HERE = Path(__file__).resolve()
REPO = HERE.parents[3]
SPEC_DIR = REPO / "studio" / "specs"
MD = REPO / "teasers" / "v2" / "10-cost-counter.md"
WPS = 2.6                    # voice-over reading speed, words per second
LANE = (20.0, 40.0)          # duration lane for this format (HD Guy's F-16 counter is 30 s; brief: 20-40 s)
SYNC = 0.5                   # max gap (s) between a beat and the moment the VO says it

# ======================================================================================
# Sourced real-world inputs (USD). Sources: teasers/v2/10-cost-counter.md, "Sources".
# ======================================================================================
NET_INTEREST_FY2025 = 970 * 10**9       # Treasury final MTS FY2025 via AAF; CBO Budget & Economic Outlook 2026-2036 (Feb 2026)
# CBO Monthly Budget Review, August 2026 (2026-09-09), via The Money Overview: net interest on the public debt in
# the first 11 months of FY2026 vs FY2025 (caption only; a different, wider line than the $970B net-interest total)
NI_PUBLIC_11M_FY2026 = 1052 * 10**9
NI_PUBLIC_11M_FY2025 = 941 * 10**9
DEBT_2025_09_30 = F("37637553494935.61")  # Debt to the Penny, 2025-09-30 (via primerates.com; GAO-26-107908: "near $37.6 trillion")
DEBT_2026_09_29 = F("40096954633566.68")  # Debt to the Penny, 2026-09-29, the last reading found before FY2026 closed
DEBT_HELD_PUBLIC_GROWTH = F("2.09") * 10**12   # same source: the part held by the public (pinned-reply note only)
AMZN_NET_INCOME_2025 = F("77.7") * 10**9  # Amazon Q4 2025 release (Feb 2026): net income FY2025 (net sales $716.9B: md only)
MEDIAN_WEEKLY = 1251                    # BLS, Usual Weekly Earnings Q2 2026 (2026-07-21): median full-time, NSA
NEW_HOUSE = 393700                      # Census/HUD New Residential Sales, Aug 2026 (2026-09-24): median new house

# Conventions (printed on screen)
WEEKS = 52
SECONDS_PER_YEAR = 365 * 24 * 60 * 60   # 31,536,000 (365-day year)
SECONDS_PER_DAY = 24 * 60 * 60          # 86,400
DAYS_B = 364                            # 10b's window: 2025-09-30 -> 2026-09-29 is 364 days
DEBT_GROWTH = DEBT_2026_09_29 - DEBT_2025_09_30   # 2,459,401,138,631.07
WORKING_YEARS = 40
TEN = 10
MINUTE = 60                             # seconds in the header's minute
SALARIES_A = [30000, 100000, 250000, 500000, 10**6]  # 10a's salary ladder (round, familiar yearly salaries)

# ======================================================================================
# Formatting helpers
# ======================================================================================
def rhu(x, step=1):
    """Round half up (x: Fraction/int/str) to a multiple of step; int when the result is whole."""
    x, step = F(x), F(step)
    v = math.floor(x / step + F(1, 2)) * step
    return int(v) if v.denominator == 1 else v

def sig_step(x, n):
    """Step that keeps n significant figures of x."""
    return F(10) ** (math.floor(math.log10(float(x))) - n + 1)

def sig(x, n):
    return rhu(x, sig_step(x, n))

def ap(shown, exact):
    """'≈ ' when the shown value is a rounding of the exact one."""
    return "" if F(shown) == F(exact) else "≈ "

def usd(x):
    """$ to the dollar, exact or rounded (no ≈ here; callers add it)."""
    return f"${rhu(x):,}"

def num(x, dp=0):
    q = rhu(x, F(1, 10 ** dp)) if dp else rhu(x)
    return f"{float(q):,.{dp}f}" if dp else f"{q:,}"

def d1(q):
    """One decimal place, for values already rounded to 0.1."""
    return f"{float(q):.1f}"

def strip_markup(s):
    return s.replace("**", "").replace("__", "").replace("\n", " ")

NUM_RE = re.compile(r"\d[\d,]*(?:\.\d+)?")

def number_tokens(s):
    out = []
    for m in NUM_RE.finditer(strip_markup(s)):
        tok = m.group(0).rstrip(",")
        out.append(F(tok.replace(",", "")))
    return out

# ---------- spoken-word estimate (for VO timing) --------------------------------------
def int_words(n):
    """Words to read a non-negative integer aloud; hyphenated tens count as one word."""
    if n == 0:
        return 1
    words = 0
    for scale in (10**12, 10**9, 10**6, 10**3, 1):
        g = (n // scale) % 1000
        if not g:
            continue
        h, r = divmod(g, 100)
        words += 2 if h else 0          # "seven hundred"
        words += 1 if r else 0          # "sixty-five"
        words += 1 if scale > 1 else 0  # "thousand"
    return words

def spoken_words(text):
    """Estimate the words the owner will say for one caption line (conservative)."""
    s = strip_markup(text)
    s = (s.replace("≈", " about ").replace("×", " times ").replace("÷", " divided by ")
          .replace("=", " equals ").replace("%", " percent "))
    s = re.sub(r"\bUS\b", " U S ", s)
    n = 0

    def money(m):
        nonlocal n
        whole, frac = m.group(1), m.group(2)
        n += int_words(int(whole.replace(",", ""))) + (1 + len(frac) if frac else 0) + 1   # + "dollars"
        return " "
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d+))?", money, s)

    def year(m):
        nonlocal n
        n += 2                                               # "twenty twenty-five"
        return " "
    s = re.sub(r"\b(19\d\d|20\d\d)(?:'s)?\b", year, s)

    def plain(m):
        nonlocal n
        whole, frac = m.group(1), m.group(2)
        n += int_words(int(whole.replace(",", ""))) + (1 + len(frac) if frac else 0)
        return " "
    s = re.sub(r"(\d[\d,]*)(?:\.(\d+))?", plain, s)
    n += len([w for w in re.split(r"[\s,.:?!;]+", s) if re.search(r"[A-Za-z]", w)])
    return n

def words_before(text, phrase):
    plain = strip_markup(text)
    i = plain.find(phrase)
    assert i >= 0, f"{phrase!r} not in {plain!r}"
    return spoken_words(plain[:i]) if i else 0

# ======================================================================================
# The maths
# ======================================================================================
PAY = MEDIAN_WEEKLY * WEEKS                                  # 65,052
PAY3 = PAY * 3                                               # 195,156 (10b)
PAY10 = PAY * TEN                                            # 650,520
PAY20 = PAY * 20                                             # 1,301,040 (10b)
PAY30 = PAY * 30                                             # 1,951,560 (10b, assembly pass 4)
PAY40 = PAY * WORKING_YEARS                                  # 2,602,080

RATE_A = F(NET_INTEREST_FY2025, SECONDS_PER_YEAR)            # $/s, interest
RATE_B = DEBT_GROWTH / (DAYS_B * SECONDS_PER_DAY)            # $/s, new debt (364-day window)
KEEP_C = F(AMZN_NET_INCOME_2025) / SECONDS_PER_YEAR          # $/s, Amazon net income

def pass_time(value, rate, t0=0):
    return F(t0) + F(value) / rate

VALUES = []   # (teaser, what, formula, exact, shown) rows for the printed table

def row(tid, what, formula, exact, shown):
    VALUES.append((tid, what, formula, exact, shown))
    return shown

# ---------- 10a: interest on the US debt, against a ladder of salaries (hook pass 2) -----------
A = {}
A["rate_shown"] = sig(RATE_A, 3)                                       # 30,800
A["rate_disp"] = f"{ap(A['rate_shown'], RATE_A)}${A['rate_shown']:,}"   # ≈ $30,800
A["hour_m"] = sig(RATE_A * 3600 / 10**6, 3)                            # 111 (million)
A["t_pay"] = pass_time(PAY, RATE_A)                                    # median pay (caption only now)
A["s_pay"] = rhu(A["t_pay"], F(1, 10))                                 # 2.1 (caption)

def secs_shown(t):
    """A pass time as shown: tenths under 5 s (the first rows close fast), whole seconds from 5 s."""
    return rhu(t, F(1, 10)) if t < 5 else rhu(t)

def secs_text(q):
    """'1.0 second' / '1.6 seconds' / '8 seconds' (q already rounded)."""
    txt = d1(q) if F(q).denominator != 1 or q < 5 else f"{q}"
    return f"{txt} second" if txt == "1.0" else f"{txt} seconds"

def k_label(v):
    """$30K / $250K / $1M (the pip labels); the median row is "Median $65K"."""
    return "$1M" if v == 10**6 else f"Median ${round(v / 1000)}K" if v == PAY else f"${v // 1000}K"

# the ladder: the salaries plus the median (assembly pass 2: the footer's $1,251 × 52 becomes a row of its own)
A["ladder"] = sorted(SALARIES_A + [PAY])                               # 30,000 / 65,052 / 100,000 / 250,000 / 500,000 / 1,000,000
A["t"] = {v: pass_time(v, RATE_A) for v in A["ladder"]}
A["shown"] = {v: secs_shown(A["t"][v]) for v in A["ladder"]}          # 1.0 / 2.1 / 3.3 / 8 / 16 / 33
A["s_1m"] = A["shown"][10**6]                                          # 33
A["s_fx_pay"] = rhu(F(PAY, A["rate_shown"]), F(1, 10))                 # 2.1 (label: $65,052 ÷ 30,800, the swap-in rule)
# the counter stops on the $1 million pass (5 dp: the exact-rate pass is 32.5113402 s, the kit's 32.5113383 s)
A["run"] = (F("0.0"), F("32.51135"))
A["final_exact"] = RATE_A * (A["run"][1] - A["run"][0])                # 1,000,000.30
A["lands_on"] = 10**6
A["final"] = usd(A["lands_on"])                                        # $1,000,000 (no ≈: within $0.50 at both rates)
A["fy"] = 25                                                           # "FY25" in the footer
assert [A["shown"][v] for v in A["ladder"]] == [1, F("2.1"), F("3.3"), 8, 16, 33], A["shown"]
assert A["shown"][PAY] == A["s_pay"] == A["s_fx_pay"], "the median's time must round alike exactly and by the swap-in rule"
assert A["t"][10**6] < A["run"][1], "the $1 million row must pass before the counter stops"
assert pass_time(10**6, F("30758.5")) < A["run"][1], "the kit's (stored-rate) $1 million pass must come before the stop"
assert abs(A["final_exact"] - A["lands_on"]) < F(1, 2), "the counter must stop on $1,000,000 to the dollar"
assert all(A["t"][v] < 5 for v in A["ladder"][:3]), "the three everyday rows close inside 5 s"
row("10a", "rate", "$970B ÷ 31,536,000 s", RATE_A, A["rate_disp"] + " every second")
row("10a", "per hour", "rate × 3,600 ÷ 1e6", RATE_A * 3600 / 10**6, f"≈ ${A['hour_m']} million (label ≈ ${A['hour_m'] * 10**6:,})")
for v in A["ladder"]:
    row("10a", f"t {k_label(v)}", f"{usd(v)} ÷ rate", A["t"][v], f"≈ {secs_text(A['shown'][v])}")
row("10a", "swap-in: median", "$65,052 ÷ 30,800", F(PAY, A["rate_shown"]), f"≈ {d1(A['s_fx_pay'])} seconds (label at 12.45 s)")
row("10a", "counter final", "rate × 32.51135 s", A["final_exact"], A["final"] + " (stops on the $1M pass)")
row("10a", "at 1.5 s", "rate × 1.5 ÷ $65,052", RATE_A * F(3, 2) / PAY * 100, "the median bill ≈ 71% full (frame check)")

SPEC_A = {
    "id": "10a-scoreboard-debt-interest-live",
    "look": "scoreboard",
    "format": "cost-counter",
    "fps": 30,
    "duration": 36.5,
    "header": "US debt interest since you hit **play**:\nwhen does it pass **your salary**?",
    "footer": (f"FY{A['fy']}: ${NET_INTEREST_FY2025 // 10**9}B ÷ {SECONDS_PER_YEAR:,} s"
               f" · median {usd(MEDIAN_WEEKLY)} × {WEEKS}"),
    "captions": True,
    "vo": [
        (0.0, 1.4, "Find your salary."),
        (2.1, 1.15, "Median pay: passed."),
        (3.25, 2.0, f"{usd(100000)}: passed."),
        (5.4, 3.1, f"**{A['rate_disp']}** a second."),
        (8.5, 3.9, f"{usd(250000)} a year: ≈ {secs_text(A['shown'][250000])}."),
        (12.45, 3.85, f"Your seconds: yearly pay ÷ {A['rate_shown']:,}."),
        (16.3, 2.7, f"{usd(500000)}: ≈ {secs_text(A['shown'][500000])}."),
        (19.1, 3.5, f"That's **≈ ${A['hour_m']} million** an hour."),
        (22.7, 4.7, f"At fiscal 2025's rate: ${NET_INTEREST_FY2025 // 10**9} billion a year."),
        (28.0, 1.6, "And the last row?"),
        (32.5, 1.6, "**$1 million**: passed."),
    ],
    # one line, so the kit's verdict slot sets it larger than the label slams ($100,000 ≈ 3.3 s moved to the caption)
    "verdict": (32.5, f"**$1M** a year: ≈ {secs_text(A['s_1m'])}."),
    "data": {
        "label": "Net interest on the US debt, since you hit play",
        "perSecond": float(rhu(RATE_A, F(1, 100))),
        "rateDisplay": f"{A['rate_disp']} every second",
        "counterT": [float(A["run"][0]), float(A["run"][1])],
        "startValue": 0, "prefix": "$", "dp": 0,
        "milestones": [(v, f"Median pay: {usd(v)}" if v == PAY else f"A {usd(v)} salary: {usd(v)}") for v in A["ladder"]],
        "final": A["final"],
        "hold": 3.98865,
    },
    "lookOpts": {
        "intro": {"l1": A["rate_disp"], "l2": "every second"},
        "labels": [{"l1": f"Median pay: {usd(v)}" if v == PAY else f"{usd(v)} a year", "l2": f"≈ {secs_text(A['shown'][v])}"}
                   for v in A["ladder"]],
        "flash": 4.6,    # a milestone holds the label stack to the next beat (the $250K row to the rule at 12.45 s)
        "rateSteps": [   # each VO beat gets its label-stack beat. The labels carry the working, the captions the
                         # sentence (assembly pass 2: no line sits twice on screen); d holds a beat to the next one
            {"t": 5.4, "l1": A["rate_disp"], "l2": "every second", "d": 3.0},
            {"t": 12.45, "l1": f"{usd(PAY)} ÷ {A['rate_shown']:,}", "l2": f"≈ {d1(A['s_fx_pay'])} seconds (median)", "d": 4.0},
            {"t": 19.1, "l1": f"{A['rate_disp']} × 3,600 s", "l2": f"≈ ${A['hour_m'] * 10**6:,}", "d": 3.6},
            {"t": 22.7, "l1": f"${NET_INTEREST_FY2025 // 10**9}B ÷ {SECONDS_PER_YEAR:,} s", "l2": f"{A['rate_disp']} every second", "d": 5.3},
            {"t": 28.0, "l1": "Next", "l2": f"{usd(10**6)} a year", "d": 4.6},
        ],
        "pips": True,
        "pipLabels": [k_label(v) for v in A["ladder"]],
        "icons": ["bill", "bill", "bill", "bill", "bill", "coin"],
        "heroIcon": False,
    },
    # (milestone value, VO line index, phrase in that line that names it). $30K is not spoken: it lights at
    # 0.975 s, during "Find your salary.", and the label stack names it on screen.
    "sync": [(PAY, 1, "Median pay"), (100000, 2, "$100,000"), (250000, 4, "$250,000"), (500000, 6, "$500,000"),
             (10**6, 10, "$1 million")],
    "beats": [(5.4, 3), (12.45, 5), (19.1, 7), (22.7, 8), (28.0, 9)],   # lookOpts.rateSteps: (t, VO line it starts)
    "t0": 0.0,               # the counter runs from frame 1
    "rate": RATE_A,
    "lands_on": A["lands_on"],   # the counter stops on the $1 million pass
}

# ---------- 10b: 40 years of your pay vs 1 minute of new US debt -------------------------
B = {}
B["rate_shown"] = sig(RATE_B, 2)                                       # 78,000
B["rate_disp"] = f"{ap(B['rate_shown'], RATE_B)}${B['rate_shown']:,}"
B["t0"] = F("0.0")                                                     # the counter runs from frame 1
B["t_pay"] = pass_time(PAY, RATE_B, B["t0"])                           # the first block (1 year) goes at 0.83 s
B["t_pay3"] = pass_time(PAY3, RATE_B, B["t0"])
B["t_pay10"] = pass_time(PAY10, RATE_B, B["t0"])
B["t_pay20"] = pass_time(PAY20, RATE_B, B["t0"])
B["t_pay40"] = pass_time(PAY40, RATE_B, B["t0"])
B["s_pay40"] = rhu(B["t_pay40"] - B["t0"])                             # 33
B["pay40_m"] = rhu(F(PAY40, 10**6), F(1, 10))                          # 2.6
B["growth_t"] = rhu(DEBT_GROWTH / 10**12, F(1, 100))                   # 2.46
B["minute"] = MINUTE * RATE_B                                          # 4,692,080.93 (1 minute of new debt)
B["minute_m"] = rhu(B["minute"] / 10**6, F(1, 10))                     # 4.7 (VO, verdict, timer, caption)
B["cross_pay"] = sig(B["minute"] / WORKING_YEARS, 3)                   # 117,000 (pinned: the pay where 40 years = 1 minute)
B["minute_years"] = rhu(B["minute"] / PAY)                             # 72 (caption: 1 minute in years of median pay)
B["minute_used"] = rhu((B["t_pay40"] - B["t0"]) / MINUTE * 100)        # 55 (% of the minute used at the burst; md only)
B["public_rate"] = sig(DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY), 2)   # 66,000 (TikTok reply)
B["public_minute_m"] = rhu(DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY) * MINUTE / 10**6, F(1, 10))   # 4.0
B["t_pay30"] = pass_time(PAY30, RATE_B, B["t0"])
# the counter stops on the 40-year pass (assembly pass 4; 5 dp: the exact-rate pass is 33.2741064 s, the kit's
# stored-rate pass 33.2741059 s), so the board and the strip's last ✓ show the same $2,602,080
B["run"] = (B["t0"], F("33.27411"))
B["final_exact"] = RATE_B * (B["run"][1] - B["run"][0])                # 2,602,080.28
B["lands_on"] = PAY40
B["final"] = usd(B["lands_on"])                                        # $2,602,080 (no ≈: within $0.50 at both rates)
B["hold"] = F("36.6") - B["run"][1]                                    # 3.32589
assert B["t_pay"] - B["t0"] < 1, "a year's median pay must pass in under 1 second"
assert B["growth_t"] == F("2.46"), "the readings must still round to the $2.46T PrimeRates headline"
assert B["minute"] > PAY40, "1 minute of new debt must beat 40 years of median pay (the header's answer)"
assert B["t_pay40"] - B["t0"] < MINUTE, "the working life must go inside the minute"
assert DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY) * MINUTE > PAY40, "the public part alone must still win"
assert B["t_pay40"] < B["run"][1], "the counter must pass 40 years before it stops"
assert pass_time(PAY40, F("78201.35")) < B["run"][1], "the kit's (stored-rate) 40-year pass must come before the stop"
assert abs(B["final_exact"] - B["lands_on"]) < F(1, 2), "the counter must stop on $2,602,080 to the dollar"
assert int((B["t_pay30"] - B["t0"]) / (F(PAY) / RATE_B)) == 30, "the 30-year pass is the 30th brick (10 left)"
row("10b", "growth", "$40.097T − $37.638T", DEBT_GROWTH / 10**12, f"≈ ${float(B['growth_t'])}T")
row("10b", "rate", "Δ ÷ (364 × 86,400 s)", RATE_B, B["rate_disp"] + " every second (stamp at 1.0 s)")
row("10b", "1 minute", "rate × 60 s", B["minute"], f"≈ ${d1(B['minute_m'])} million")
row("10b", "40 years of pay", "$65,052 × 40", PAY40, f"{usd(PAY40)} / ≈ ${d1(B['pay40_m'])} million")
row("10b", "minute ÷ 40 yrs", "1 minute ÷ $2,602,080", B["minute"] / PAY40, "1.8x (md only)")
row("10b", "crossover pay", "1 minute ÷ 40", B["minute"] / WORKING_YEARS, f"≈ ${B['cross_pay']:,} a year (pinned)")
row("10b", "minute in pay", "1 minute ÷ $65,052", B["minute"] / PAY, f"≈ {B['minute_years']} years of median pay (caption)")
row("10b", "t 1 yr (block 1)", "$65,052 ÷ rate", B["t_pay"], "0.83 s (first block eaten)")
row("10b", "t 3 yrs pay", "$195,156 ÷ rate", B["t_pay3"], "VO 2.4")
row("10b", "t 10 yrs pay", "$650,520 ÷ rate", B["t_pay10"], "VO 8.2")
row("10b", "t 20 yrs pay", "$1,301,040 ÷ rate", B["t_pay20"], "VO 16.5 ('20 years' at 16.88)")
row("10b", "t 30 yrs pay", "$1,951,560 ÷ rate", B["t_pay30"], "VO 25.1 ('30 years gone. 10 left.')")
row("10b", "t 40 yrs pay", "$2,602,080 ÷ rate", B["t_pay40"], f"≈ {B['s_pay40']} seconds (VO 33.3)")
row("10b", "minute used", "t 40 yrs ÷ 60 s", (B["t_pay40"] - B["t0"]) / MINUTE * 100, f"{B['minute_used']}% (md only)")
row("10b", "counter final", "rate × 33.27411 s", B["final_exact"], B["final"] + " (stops on the 40-year pass)")
row("10b", "public part", "$2.09T ÷ (364 × 86,400 s)", DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY), f"≈ ${B['public_rate']:,} a second; ≈ ${d1(B['public_minute_m'])} million a minute (TikTok reply)")

SPEC_B = {
    "id": "10b-becker-rig-debt-vs-your-pay",
    "look": "becker-rig",
    "format": "cost-counter",
    "fps": 30,
    "duration": 36.6,
    # pay green, debt red (the colours the short uses for them); 2 lines, so the hook sets at ≈ 84 px
    "header": f"Your pay for **{WORKING_YEARS} years** vs\n__1 minute__ of new US debt?",
    "footer": (f"New debt ≈ ${float(B['growth_t'])}T ÷ ({DAYS_B} × {SECONDS_PER_DAY:,} s)"
               f"\nPay: BLS median {usd(MEDIAN_WEEKLY)} a week × {WEEKS}"),
    "captions": True,
    "vo": [
        (0.0, 2.4, f"Your {WORKING_YEARS} years, or 1 minute?"),
        (2.4, 1.6, "3 years, gone."),
        (4.2, 2.4, f"**{B['rate_disp']}** a second."),
        (8.2, 2.4, f"{TEN} years of median pay."),
        # no-break spaces keep "≈ $2.46 trillion" together in the caption
        (10.6, 5.8, f"The debt grew ≈\u00a0${float(B['growth_t'])}\u00a0trillion in {DAYS_B} days."),
        (16.5, 1.5, "Halfway: 20 years."),
        (18.2, 4.7, f"{WORKING_YEARS} × {usd(PAY)} ≈ **${d1(B['pay40_m'])} million**."),
        (23.1, 2.0, "That's a whole working life."),
        (25.1, 3.3, f"30 years gone. {TEN} left."),
        (28.6, 2.4, f"How long do {WORKING_YEARS} years last?"),
        (33.3, 2.4, f"A working life: **≈ {B['s_pay40']} seconds.**"),
    ],
    "verdict": (33.3, f"{WORKING_YEARS} years of median pay: **≈ {B['s_pay40']} seconds**."
                      f"\n1 minute of new US debt ≈ __${d1(B['minute_m'])} million__."),
    "data": {
        "label": "New US debt since you hit play",
        "perSecond": float(rhu(RATE_B, F(1, 100))),
        "rateDisplay": f"{B['rate_disp']} every second",
        "counterT": [float(B["run"][0]), float(B["run"][1])],
        "startValue": 0, "prefix": "$", "dp": 0,
        "milestones": [
            (PAY3, f"3 years of median pay: {usd(PAY3)}"),
            (PAY10, f"{TEN} years of median pay: {usd(PAY10)}"),
            (PAY20, f"20 years of median pay: {usd(PAY20)}"),
            (PAY30, f"30 years of median pay: {usd(PAY30)}"),
            (PAY40, f"{WORKING_YEARS} years of median pay: {usd(PAY40)}"),
        ],
        "final": B["final"],
        "hold": float(B["hold"]),
    },
    "lookOpts": {
        "stage": "white",
        "surface": "debt-clock",
        "surfaceLabel": "New US debt since you hit play",
        "opener": {"t": 0.0, "pose": "lift", "prop": "block-stack", "blocks": WORKING_YEARS, "unit": PAY,
                   "text": f"{WORKING_YEARS} × {usd(PAY)}", "sub": f"{WORKING_YEARS} years of median pay",
                   "countdown": "{n} years left"},
        "stamp": {"t": float(B["t0"] + 1), "text": f"1 second {B['rate_disp']}"},
        "timer": {"t0": float(B["t0"]), "label": "1 minute", "total": MINUTE,
                  "endLabel": {"t": 33.3, "text": f"≈ ${d1(B['minute_m'])} million"}},
        "actions": [
            {"milestone": 0, "verb": "swallow", "becomes": "the panel has been slurping blocks off the top of his stack since frame 1, one per year of pay; he hugs the rest tighter"},
            {"milestone": 1, "verb": "push", "becomes": "he shoves back against the panel's slot; it keeps eating"},
            {"milestone": 2, "verb": "shocked", "becomes": "halfway: his stack is half gone; the counter turns orange and its last digits blur"},
            {"milestone": 3, "verb": "flinch", "becomes": "30 years gone, 10 bricks left: he flinches back from the board"},
            {"milestone": 4, "verb": "flattened", "becomes": "white-hot, it cracks and bursts as the last block goes in; the blast knocks him flat, arms empty"},
        ],
        "heat": [
            {"t": 0.0, "state": "cool"}, {"t": 16.5, "state": "orange"},
            {"t": 28.6, "state": "white"}, {"t": 33.3, "state": "burst"},
        ],
        "gag": {"t": 33.3, "text": f"≈ {B['s_pay40']} seconds"},
    },
    "sync": [(PAY3, 1, "3 years"), (PAY10, 3, "10 years"), (PAY20, 5, "20 years"), (PAY30, 8, "30 years"),
             (PAY40, 10, "A working life")],
    "beats": [(16.5, 5), (28.6, 9), (33.3, 10)],   # heat orange, heat white, burst/gag/timer end label
    "t0": 0.0,               # the counter runs from frame 1 (no armed pause)
    "rate": RATE_B,
    "lands_on": B["lands_on"],   # the counter stops on the 40-year pass
}

# ---------- 10c: 1 second of Amazon's profit, in weeks of median pay (hook pass 2) -------------
C = {}
C["keep_shown"] = rhu(KEEP_C)                                          # 2,464 (rate label, label-stack working, ladder, VO, caption)
C["keep_cents"] = rhu(KEEP_C, F(1, 100))                               # 2,463.85 (perSecond; the 1-second row's value)
C["wk1"] = KEEP_C / MEDIAN_WEEKLY                                      # 1.97 weeks of median pay per second
C["wk1_shown"] = rhu(C["wk1"])                                         # 2
C["fx_wk1"] = rhu(F(C["keep_shown"]) / MEDIAN_WEEKLY)                  # 2 (label stack at 2.8 s: $2,464 ÷ $1,251 a week)
C["five"] = KEEP_C * 5                                                 # 12,319.25 (5 seconds of profit)
C["five_cents"] = rhu(C["five"], F(1, 100))                            # 12,319.25 (the 5-second row's value)
C["five_shown"] = rhu(C["five"])                                       # 12,319
C["wk5"] = C["five"] / MEDIAN_WEEKLY                                   # 9.85 weeks
C["wk5_shown"] = rhu(C["wk5"])                                         # 10
C["fx_wk5"] = rhu(F(C["five_shown"]) / MEDIAN_WEEKLY)                  # 10 (the shown $12,319 ÷ $1,251 rounds like the exact weeks)
C["half"] = F(PAY, 2)                                                  # 32,526 (6 months of median pay, exact)
C["t_half"] = C["half"] / KEEP_C                                       # 13.20 s
C["s_half"] = rhu(C["t_half"])                                         # 13
C["t_keep_pay"] = F(PAY) / KEEP_C                                      # 26.40 s
C["s_keep_pay"] = rhu(C["t_keep_pay"])                                 # 26
C["fx_keep_pay"] = rhu(F(PAY) / C["keep_shown"])                       # 26 (with the shown $2,464)
# the counter stops on the year-of-median-pay pass (exact 26.40257 s; the kit times row 4 on 65,052 ÷ the stop)
C["run"] = (F("0.0"), F("26.4026"))
C["fx_rate"] = f"= ${float(AMZN_NET_INCOME_2025 / 10**9)}B ÷ {SECONDS_PER_YEAR:,} s ≈ ${C['keep_shown']:,}"
C["final_exact"] = KEEP_C * (C["run"][1] - C["run"][0])                # 65,052.07
C["lands_on"] = PAY
C["final"] = usd(C["lands_on"])                                        # $65,052 (no ≈: within $0.50 at both rates)
# the Scoreboard kit times each pass at counterT[0] + value ÷ perSecond (the stored rate, from frame 1): the
# milestones must pass at 1.000 / 5.000 / 13.201 / 26.403 s, all before the stop (port to Scoreboard, 2026-10-08)
C["kit_rate"] = C["keep_cents"]
C["kit_t"] = [C["run"][0] + F(v) / C["kit_rate"] for v in (C["keep_cents"], C["five_cents"], C["half"], PAY)]
assert all(t < C["run"][1] for t in C["kit_t"]), "every milestone (the kit's pass) must come before the stop"
assert C["kit_t"][0] == 1 and C["kit_t"][1] == 5, "the 1- and 5-second rows pass on the second exactly"
assert C["final_exact"] > PAY, "the counter must pass a year of median pay before it stops"
assert abs(C["final_exact"] - PAY) < F(1, 2) and abs(F("2463.85") * C["run"][1] - PAY) < F(1, 2), \
    "the counter must stop on $65,052 to the dollar (exact and stored rate)"
assert C["fx_keep_pay"] == C["s_keep_pay"], "$65,052 ÷ the shown $2,464 must round like the exact time"
assert C["fx_wk1"] == C["wk1_shown"], "the label-stack working ($2,464 ÷ $1,251) must round like the exact weeks"
assert C["fx_wk5"] == C["wk5_shown"], "$12,319 ÷ $1,251 must round like the exact weeks (5 s)"
assert C["half"].denominator == 1, "half a year of median pay must be a whole dollar amount"
assert all(abs(a - b) < F(1, 100) for a, b in zip(C["kit_t"], (1, 5, C["t_half"], C["t_keep_pay"]))), C["kit_t"]
row("10c", "kept per second", "$77.7B ÷ 31,536,000 s", KEEP_C, f"≈ ${C['keep_shown']:,} (everywhere)")
row("10c", "1 s in weeks", "rate ÷ $1,251", C["wk1"], f"≈ {C['wk1_shown']} weeks (label, ladder, VO, caption)")
row("10c", "5 s of profit", "rate × 5", C["five"], f"≈ ${C['five_shown']:,}")
row("10c", "5 s in weeks", "rate × 5 ÷ $1,251", C["wk5"], f"≈ {C['wk5_shown']} weeks")
row("10c", "half a year", "$65,052 ÷ 2", C["half"], f"{usd(C['half'])} (6 months, exact)")
row("10c", "t half a year", "$32,526 ÷ rate", C["t_half"], f"≈ {C['s_half']} seconds")
row("10c", "t a year", "$65,052 ÷ rate", C["t_keep_pay"], f"≈ {C['s_keep_pay']} seconds (also $65,052 ÷ $2,464)")
row("10c", "counter final", "rate × 26.4026 s", C["final_exact"], C["final"] + " (stops on the 1-year pass)")
row("10c", "at 1.5 s", "rate × 1.5", KEEP_C * F(3, 2), "$3,695 on the Scoreboard counter (a running count rounds down; frame check)")

SPEC_C = {
    "id": "10c-scoreboard-amazon-makes",
    "look": "scoreboard",
    "format": "cost-counter",
    "fps": 30,
    "duration": 31.0,
    "header": "How long do **you** work for\n1 second of Amazon's profit?",
    "footer": (f"Amazon 2025 net income: ${float(AMZN_NET_INCOME_2025 / 10**9)}B"
               f"\nPay: BLS median {usd(MEDIAN_WEEKLY)} a week × {WEEKS}"),
    "captions": True,
    "vo": [
        (0.0, 2.7, "How long do you work for this?"),
        (2.8, 2.4, f"≈ {C['wk1_shown']} weeks, at median pay."),
        (5.2, 2.0, f"5 seconds: ≈ {C['wk5_shown']} weeks."),
        (7.4, 4.3, f"Amazon's 2025 profit: ${float(AMZN_NET_INCOME_2025 / 10**9)} billion."),
        (13.2, 2.4, f"≈ {C['s_half']} seconds: half a year."),
        # a no-break space keeps "weekly pay" together in the caption ("… your weekly pay / = your weeks.")
        (15.8, 5.0, f"{C['keep_shown']:,} ÷ your weekly\u00a0pay = your weeks."),
        (22.8, 1.6, "And a whole year?"),     # into the riser (24.0-26.4 s): two 2 s silences, not one of 3.8 s
        (26.4, 1.6, f"≈ {C['s_keep_pay']} seconds."),
    ],
    # the climax, one short line each so it sets at ≈ 78 px in the Scoreboard's tall slot (fixer pass): the 1-second
    # answer stays on the end frame as the ladder's bottom row ("≈ 2 weeks"), in caption line 1 and the pinned comment
    "verdict": (26.4, f"A year of median pay:\n**≈ {C['s_keep_pay']} seconds**."),
    "data": {
        "label": "Amazon's profit since you hit play",
        "perSecond": float(C["keep_cents"]),
        "rateDisplay": f"≈ ${C['keep_shown']:,} every second",
        "counterT": [float(C["run"][0]), float(C["run"][1])],
        "startValue": 0, "prefix": "$", "dp": 0,
        "milestones": [
            (float(C["keep_cents"]), f"1 second: ≈ ${C['keep_shown']:,}"),
            (float(C["five_cents"]), f"5 seconds: ≈ ${C['five_shown']:,}"),
            (int(C["half"]), f"≈ {C['s_half']} seconds: {usd(C['half'])}"),
            (PAY, f"≈ {C['s_keep_pay']} seconds: {usd(PAY)}"),
        ],
        "final": C["final"],
        "hold": 4.5974,
    },
    # Scoreboard (port, 2026-10-08): the Live Sheet's table becomes the milestone ladder and the label stack.
    #   ladder (pipLabels): the Profit column, the targets ahead, from frame 1 (the answers stay hidden);
    #   pipPassed: the You work column, each ladder label turning into its answer as its icon lands in the slot;
    #   labels: each pass slams its row (time: profit / the answer); rateSteps: the old formula steps, one working
    #   per VO beat, each held to the next beat (the resting rate shows only 0-1.0 s);
    #   icons: bills for the first three rows (a stacked twin, no "×5"/"×13" badge from a time), a coin for the year.
    "lookOpts": {
        "labels": [
            {"l1": f"1 second: ≈ ${C['keep_shown']:,}", "l2": f"≈ {C['wk1_shown']} weeks of work"},
            {"l1": f"5 seconds: ≈ ${C['five_shown']:,}", "l2": f"≈ {C['wk5_shown']} weeks of work"},
            {"l1": f"≈ {C['s_half']} seconds: {usd(C['half'])}", "l2": "6 months of work"},
            {"l1": f"≈ {C['s_keep_pay']} seconds: {usd(PAY)}", "l2": "1 year of work"},
        ],
        "rateSteps": [
            {"t": 2.8, "l1": f"${C['keep_shown']:,} ÷ {usd(MEDIAN_WEEKLY)} a week", "l2": f"≈ {C['fx_wk1']} weeks of median pay", "d": 2.2},
            {"t": 7.4, "l1": f"${float(AMZN_NET_INCOME_2025 / 10**9)}B ÷ {SECONDS_PER_YEAR:,} s", "l2": f"≈ ${C['keep_shown']:,} every second", "d": 5.9},
            {"t": 15.8, "l1": f"${C['keep_shown']:,} ÷ your weekly pay", "l2": "your weeks per second", "d": 7.0},
            {"t": 22.8, "l1": f"{usd(MEDIAN_WEEKLY)} × {WEEKS} = {usd(PAY)}", "l2": "Next: a year of median pay", "d": 3.6},
        ],
        "pips": True,
        "pipLabels": [f"≈ ${C['keep_shown']:,}", f"≈ ${C['five_shown']:,}", usd(C["half"]), usd(PAY)],
        "pipPassed": [f"≈ {C['wk1_shown']} weeks", f"≈ {C['wk5_shown']} weeks", "6 months", "1 year"],
        "icons": ["bill", "bill", "bill", "coin"],
        "badges": False,
        "heroIcon": False,
        "climaxScale": True,    # the coin grows on its pass toward the bills' width (as far as the stage allows)
        "tallVerdict": True,    # the kit's 196 px boxed verdict slot: the two-line verdict sets at ≈ 78 px
    },
    # The 1-second row's answer ("≈ 2 weeks of work") slams in at its pass (1.000 s) while vo[0] asks the question;
    # vo[1] reads it back at 2.8 s with the label stack's working, so it is not in the 0.5 s VO sync list.
    "sync": [(C["five_cents"], 2, "5 seconds"), (C["half"], 4, "≈ 13"), (PAY, 7, "≈ 26")],
    "beats": [(2.8, 1), (7.4, 3), (15.8, 5), (22.8, 6)],    # lookOpts.rateSteps: (t, VO line it starts)
    "t0": 0.0,
    "rate": KEEP_C,
    "lands_on": C["lands_on"],   # the counter stops on the year-of-median-pay pass
}

# 10c in the Scoreboard: the ladder is the milestones' own amounts, in order; each pass label leads with its
# milestone's label; the answers on the ladder are the label stack's answers; and the label stack never drops back
# to the resting rate between beats (flash 3.0 s, the kit default; each rate step held to the next beat)
_oc = SPEC_C["lookOpts"]
assert _oc["pipLabels"] == [lab.split(": ")[1] for _, lab in SPEC_C["data"]["milestones"]], "ladder = the milestones' amounts"
assert [x["l1"] for x in _oc["labels"]] == [lab for _, lab in SPEC_C["data"]["milestones"]], "pass labels = milestones"
assert all(x["l2"].startswith(p) for x, p in zip(_oc["labels"], _oc["pipPassed"])), "ladder answers = label answers"
_beats_c = sorted([(float(t), 3.0) for t in C["kit_t"]] + [(s["t"], s["d"]) for s in _oc["rateSteps"]])
_beats_c = [b for b in _beats_c if b[0] < SPEC_C["verdict"][0]]
assert all(t + hold >= nxt - 1e-9 for (t, hold), (nxt, _) in zip(_beats_c, _beats_c[1:] + [(SPEC_C["verdict"][0], 0)])), \
    "10c: every label beat holds to the next one (the resting rate shows only before the first pass)"

EXPECTED = [SPEC_A, SPEC_B, SPEC_C]

# One shown rounding per quantity: (name, exact value, the one display allowed within ±5% of it)
QUANTITIES = {
    "10a": [("rate", RATE_A, A["rate_shown"]), ("per hour, millions", RATE_A * 3600 / 10**6, A["hour_m"]),
            ("pass: median pay", A["t_pay"], A["s_pay"])]
           + [(f"pass: {k_label(v)}", A["t"][v], A["shown"][v]) for v in A["ladder"]],
    "10b": [("growth, $T", DEBT_GROWTH / 10**12, B["growth_t"]), ("rate", RATE_B, B["rate_shown"]),
            ("pass: 40 years", B["t_pay40"] - B["t0"], B["s_pay40"]), ("40 years, $M", F(PAY40, 10**6), B["pay40_m"]),
            ("1 minute, $M", B["minute"] / 10**6, B["minute_m"]), ("crossover pay", B["minute"] / WORKING_YEARS, B["cross_pay"]),
            ("1 minute in years of pay", B["minute"] / PAY, B["minute_years"])],   # (≈ $66,000 public part: TikTok note only)
    "10c": [("profit rate", KEEP_C, C["keep_shown"]), ("weeks per second", C["wk1"], C["wk1_shown"]),
            ("5 s of profit", C["five"], C["five_shown"]), ("weeks in 5 s", C["wk5"], C["wk5_shown"]),
            ("pass: half a year", C["t_half"], C["s_half"]), ("pass: a year", C["t_keep_pay"], C["s_keep_pay"])],
}
# Exact inputs shown verbatim that happen to sit within 5% of a computed quantity (not roundings of it):
# 10a's $30,000 salary row is 2.5% under the ≈ $30,800 rate.
EXACT_INPUTS = {"10a": {F(30000)}, "10b": set(), "10c": set()}
# Phrases that overclaim (a fixed average shown as "live", fiscal-year wording for a 364-day window, a universal
# claim that holds only for the median)
FORBIDDEN = {
    "10a": [r"\blive\b", r"\bin real time\b"],
    "10b": [r"\blive\b", r"fiscal 2026", r"FY2026", r"[Uu]nder 1 second"],
    "10c": [r"\blive\b"],
}

# Every number allowed in any display string or VO line, per teaser: computed values + labelled constants.
def allowed_numbers(tid):
    common = {F(MEDIAN_WEEKLY), F(WEEKS), F(PAY), F(NEW_HOUSE), F(SECONDS_PER_YEAR), F(1), F(10**6)}
    if tid == "10a":
        return (common | {F(A["fy"]), F(2025), F(970), F(A["rate_shown"]), F(A["hour_m"]), F(A["hour_m"] * 10**6),
                          F(3600)}
                | {F(v) for v in SALARIES_A} | {F(v // 1000) for v in SALARIES_A}      # $30,000 / $30K pip labels
                | {F(round(PAY / 1000))}                                               # "Median $65K" pip label
                | {F(A["shown"][v]) for v in A["ladder"]})                             # ≈ 1.0 / 2.1 / 3.3 / 8 / 16 / 33 s
    if tid == "10b":
        return common | {F(DAYS_B), F(SECONDS_PER_DAY), B["growth_t"], F(B["rate_shown"]), F(3), F(PAY3), F(TEN),
                         F(PAY10), F(20), F(PAY20), F(30), F(PAY30), F(WORKING_YEARS), F(PAY40), F(B["pay40_m"]),
                         F(B["s_pay40"]), B["minute_m"], F(rhu(B["final_exact"]))}
    return common | {F(2025), F("77.7"), F(C["keep_shown"]), F(C["wk1_shown"]), F(5), F(C["five_shown"]),
                     F(C["wk5_shown"]), F(2), F(C["half"]), F(C["s_half"]), F(6), F(C["s_keep_pay"]),
                     F(rhu(C["final_exact"]))}                                   # "÷ 2", "6 months", "1 year"

# ======================================================================================
# Checks
# ======================================================================================
FAILS = []
CHECKS = 0

def check(ok, tid, what, detail=""):
    global CHECKS
    CHECKS += 1
    if not ok:
        FAILS.append((tid, what, detail))

def eq(tid, what, got, want):
    check(got == want, tid, what, f"got {got!r}, want {want!r}")

def display_strings(spec):
    """Every on-screen / caption text in a spec, with a path."""
    out = [("header", spec["header"]), ("footer", spec.get("footer", "")), ("verdict", spec["verdict"]["text"]),
           ("data.label", spec["data"]["label"]), ("data.rateDisplay", spec["data"]["rateDisplay"]),
           ("data.final", spec["data"]["final"])]
    out += [(f"vo[{i}]", v["text"]) for i, v in enumerate(spec["vo"])]
    out += [(f"milestones[{i}].label", m["label"]) for i, m in enumerate(spec["data"]["milestones"])]

    def walk(o, path):
        if isinstance(o, dict):
            for k, v in o.items():
                if k in ("t", "milestone", "perSecond", "state", "pose", "prop", "verb", "surface", "stage") and not isinstance(v, (dict, list)):
                    continue
                walk(v, f"{path}.{k}")
        elif isinstance(o, list):
            for i, v in enumerate(o):
                walk(v, f"{path}[{i}]")
        elif isinstance(o, str):
            out.append((path, o))
    walk(spec.get("lookOpts", {}), "lookOpts")
    return out

APPROX_NEEDED = {  # display strings whose number is rounded: they must carry "≈"
    "data.rateDisplay", "data.final",
}

def check_spec(want):
    tid = want["id"][:3]
    path = SPEC_DIR / f"{want['id']}.json"
    check(path.exists(), tid, "spec file exists", str(path))
    if not path.exists():
        return
    spec = json.loads(path.read_text())

    # ---- contract shape -------------------------------------------------------------
    eq(tid, "id = file stem", spec.get("id"), path.stem)
    for k in ("id", "look", "format", "fps", "duration", "header", "footer", "captions", "vo", "verdict", "data"):
        check(k in spec, tid, f"common field {k}")
    for k in ("label", "perSecond", "rateDisplay", "counterT", "startValue", "prefix", "dp", "milestones", "final", "hold"):
        check(k in spec["data"], tid, f"data.{k}")
    check(set(spec["data"]) <= {"label", "perSecond", "rateDisplay", "counterT", "startValue", "prefix", "dp",
                                "milestones", "final", "hold"}, tid, "data has only contract keys", str(sorted(spec["data"])))
    for m in spec["data"]["milestones"]:
        check(set(m) == {"value", "label"}, tid, "milestone has value + label only", str(m))
    check(isinstance(spec["data"]["perSecond"], (int, float)), tid, "perSecond numeric")
    check(all(isinstance(m["value"], (int, float)) for m in spec["data"]["milestones"]), tid, "milestone values numeric")
    for k in ("look", "format", "fps", "duration", "header", "footer", "captions"):
        eq(tid, k, spec[k], want[k])
    eq(tid, "captions on", spec["captions"], True)

    # ---- display strings and numerics ------------------------------------------------
    eq(tid, "vo count", len(spec["vo"]), len(want["vo"]))
    for i, (v, w) in enumerate(zip(spec["vo"], want["vo"])):
        eq(tid, f"vo[{i}].t", v["t"], w[0])
        eq(tid, f"vo[{i}].d", v["d"], w[1])
        eq(tid, f"vo[{i}].text", v["text"], w[2])
    eq(tid, "verdict.t", spec["verdict"]["t"], want["verdict"][0])
    eq(tid, "verdict.text", spec["verdict"]["text"], want["verdict"][1])
    d, wd = spec["data"], want["data"]
    for k in ("label", "perSecond", "rateDisplay", "counterT", "startValue", "prefix", "dp", "final", "hold"):
        eq(tid, f"data.{k}", d[k], wd[k])
    eq(tid, "milestones", [(m["value"], m["label"]) for m in d["milestones"]], wd["milestones"])
    eq(tid, "lookOpts", spec.get("lookOpts"), want["lookOpts"])

    rate = want["rate"]
    check(abs(F(d["perSecond"]) - rate) <= F(1, 200), tid, "perSecond = exact rate to the cent",
          f"{d['perSecond']} vs {float(rate):.4f}")
    t0, t1 = F(str(d["counterT"][0])), F(str(d["counterT"][1]))
    lands = want.get("lands_on")
    for r, name in ((rate, "exact"), (F(str(d["perSecond"])), "stored")):
        fin = r * (t1 - t0) + F(d["startValue"])
        if lands is None:
            eq(tid, f"final = {name} perSecond × run", d["final"], f"{ap(rhu(fin), fin)}{usd(fin)}")
        else:   # the counter stops on its last milestone: the dollar reading is that milestone, exactly
            check(abs(fin - lands) < F(1, 2), tid, f"counter stops on {usd(lands)} ({name} rate)", f"{float(fin):,.2f}")
            eq(tid, f"final = the milestone it stops on ({name} rate)", d["final"], usd(rhu(fin)))
    if lands is not None:
        eq(tid, "the stop is the last milestone", F(d["milestones"][-1]["value"]), F(lands))
        check("≈" not in d["final"], tid, "no ≈ on a final that is the milestone exactly", d["final"])
    vals = [F(m["value"]) for m in d["milestones"]]
    check(vals == sorted(vals), tid, "milestones ascend")
    check(all(pass_time(v, rate, t0) < t1 for v in vals), tid, "every milestone passes before the counter stops")

    # ---- every number token is computed or a labelled constant --------------------------
    allowed = allowed_numbers(tid)
    for where, text in display_strings(spec):
        for n in number_tokens(text):
            check(n in allowed, tid, f"number {n} in {where} is computed/sourced", text)
        if where in APPROX_NEEDED and not (where == "data.final" and want.get("lands_on") is not None):
            check("≈" in text, tid, f"≈ on rounded {where}", text)

    # ---- "≈" on rounded results only: a "≈ X" in VO/verdict must not be exact ----------
    exact_set = {F(MEDIAN_WEEKLY), F(PAY), F(NEW_HOUSE), F(PAY3), F(PAY10), F(PAY20), F(PAY40), F(SECONDS_PER_YEAR), F(10**6)}
    for where, text in display_strings(spec):
        for m in re.finditer(r"≈\s\$?(\d[\d,]*(?:\.\d+)?)", strip_markup(text)):   # \s: a no-break space too
            n = F(m.group(1).replace(",", ""))
            check(n not in exact_set, tid, f"≈ not on an exact value in {where}", text)

    # ---- one rounding per quantity; no overclaiming words --------------------------------
    texts = display_strings(spec)
    check_quantities(tid, texts)
    check_forbidden(tid, texts)

    # ---- frame 1 ------------------------------------------------------------------------
    eq(tid, "counter starts where the write-up says", float(t0), want["t0"])
    check(bool(NUM_RE.search(spec["footer"])), tid, "footer carries a number at t = 0")
    check(usd(MEDIAN_WEEKLY) in spec["footer"] and f"× {WEEKS}" in spec["footer"], tid,
          "viewer-owned pay ($1,251 × 52) in the footer at t = 0 (R1, R3)", spec["footer"])
    check("?" in spec["header"], tid, "header asks a question (R11)", spec["header"])

    # ---- timing ------------------------------------------------------------------------
    check(bool(NUM_RE.search(d["rateDisplay"])), tid, "rateDisplay carries a number")
    check(spec["vo"][0]["t"] == 0.0, tid, "VO starts at 0.0")
    for i, v in enumerate(spec["vo"]):
        words = spoken_words(v["text"])
        need = round(words / WPS, 2)
        check(v["d"] >= need - 1e-9, tid, f"vo[{i}] fits 2.6 w/s", f"{words} words need {need} s, d = {v['d']}")
        if i + 1 < len(spec["vo"]):
            check(v["t"] + v["d"] <= spec["vo"][i + 1]["t"] + 1e-9, tid, f"vo[{i}] ends before vo[{i + 1}]",
                  f"{v['t'] + v['d']:.2f} > {spec['vo'][i + 1]['t']}")
    for value, li, phrase in want["sync"]:
        line = spec["vo"][li]
        said = F(str(line["t"])) + F(words_before(line["text"], phrase)) / F(str(WPS))
        passed = pass_time(value, rate, t0)
        check(abs(said - passed) <= F(str(SYNC)), tid, f"milestone {value:,} synced to vo[{li}]",
              f"passes {float(passed):.3f} s, said {float(said):.3f} s")
    for t, li in want["beats"]:
        eq(tid, f"beat {t} starts vo[{li}]", spec["vo"][li]["t"], t)
    for t, li in want.get("extra_sync", []):
        check(abs(F(str(spec["vo"][li]["t"])) - t) <= F(str(SYNC)), tid, f"kept counter synced to vo[{li}]",
              f"{float(t):.3f} vs {spec['vo'][li]['t']}")
    vt = spec["verdict"]["t"]
    check(any(abs(v["t"] - vt) < 1e-9 for v in spec["vo"]), tid, "verdict lands with a VO line")
    check(abs(float(t1) - vt) <= 0.2, tid, "counter stops with the verdict", f"{float(t1)} vs {vt}")
    dur = spec["duration"]
    check(LANE[0] <= dur <= LANE[1], tid, "duration in the 20-40 s lane", str(dur))
    last = spec["vo"][-1]
    check(dur >= last["t"] + last["d"] + 0.4 - 1e-9, tid, "duration covers last VO + 0.4 s")
    check(dur >= vt + 2.5 - 1e-9, tid, "duration covers verdict + 2.5 s")
    check(abs(d["hold"] - (dur - float(t1))) < 1e-9, tid, "hold = duration - counter end",
          f"{d['hold']} vs {dur - float(t1):.2f}")
    check(len(strip_markup(spec["header"]).split()) <= 15, tid, "header <= 15 words (R8)")

    ROWS.append((want["id"], len(spec["vo"]), len(d["milestones"]), d["rateDisplay"], d["final"], dur))

def check_quantities(tid, texts):
    """Any number within 5% of a computed quantity must be that quantity's one shown rounding."""
    for where, text in texts:
        for n in number_tokens(text):
            if n in EXACT_INPUTS[tid]:
                continue
            for name, exact, shown in QUANTITIES[tid]:
                if n != F(shown) and abs(n - exact) <= abs(F(exact)) / 20:
                    check(False, tid, f"one rounding for {name}: {float(n):g} in {where} (shown is {float(shown):g})", text)

def check_forbidden(tid, texts):
    for where, text in texts:
        for pat in FORBIDDEN[tid]:
            check(not re.search(pat, strip_markup(text), re.I), tid, f"no overclaim /{pat}/ in {where}", text)

# ---- caption / pinned comment numbers in the write-up ------------------------------------
def check_md():
    if not MD.exists():
        check(False, "md", "write-up exists", str(MD))
        return
    text = MD.read_text()
    cbo_pct = rhu(F(NI_PUBLIC_11M_FY2026 - NI_PUBLIC_11M_FY2025, NI_PUBLIC_11M_FY2025) * 100)   # 12 (%)
    extra = {   # caption / pinned-comment numbers: computed here, or a labelled sourced constant
        "10a": {F(2026), A["s_pay"], F(cbo_pct), F(11), F(0)},                   # 2.1 s; CBO: 12%, 11 months; $0 off the debt
        "10b": {rhu(DEBT_2025_09_30 / 10**12, F(1, 1000)), rhu(DEBT_2026_09_29 / 10**12, F(1, 1000)),
                F(30), F(29), F(2025), F(2026),                                  # Sept. 30, 2025 / Sept. 29, 2026
                F(B["minute_years"]), F(B["cross_pay"])},                        # caption: ≈ 72 years; pinned: ≈ $117,000
        "10c": {F(4), F(2026)},                                                  # "Q4 2025"; Feb 2026
    }
    assert cbo_pct == 12
    for tid in ("10a", "10b", "10c"):
        m = re.search(rf"^## {tid}\b.*?(?=^## |\Z)", text, re.S | re.M)
        check(bool(m), "md", f"section {tid} in write-up")
        if not m:
            continue
        sec = m.group(0)
        blocks = re.findall(r"\*\*(?:Caption|Pinned comment)[^\n]*\n((?:> [^\n]*\n?)+)", sec)
        check(len(blocks) == 2, "md", f"{tid}: caption + pinned comment blocks found", str(len(blocks)))
        allowed = allowed_numbers(tid) | extra[tid]
        for b in blocks:
            body = re.sub(r"#\w+", "", b)
            for n in number_tokens(body):
                check(n in allowed, "md", f"{tid} caption/pinned number {n} is computed/sourced", body[:80])
        texts = [(f"md {tid} caption/pinned", re.sub(r"#\w+", "", b)) for b in blocks]
        check_quantities(tid, texts)
        check_forbidden(tid, texts)

ROWS = []
for want in EXPECTED:
    check_spec(want)
check_md()

# ======================================================================================
# Report
# ======================================================================================
print(f"{'teaser':6} {'what':18} {'formula':24} {'exact':>18}  shown")
print("-" * 110)
for tid, what, formula, exact, shown in VALUES:
    print(f"{tid:6} {what:18} {formula:24} {float(exact):>18,.4f}  {shown}")
print()
print(f"{'spec':40} {'vo':>3} {'miles':>5}  {'rate':24} {'final':16} {'dur':>5}")
for r in ROWS:
    print(f"{r[0]:40} {r[1]:>3} {r[2]:>5}  {r[3]:24} {r[4]:16} {r[5]:>5}")
print()
print(f"{CHECKS} checks, {len(FAILS)} failures")
for f in FAILS:
    print("FAIL", *f)
sys.exit(1 if FAILS else 0)
