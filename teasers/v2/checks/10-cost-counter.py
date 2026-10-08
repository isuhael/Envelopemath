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
     stored and the exact rate); milestones ascend and are all passed before the counter stops;
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
SALARIES_A = [30000, 50000, 100000, 250000, 10**6]   # 10a's salary ladder (round, familiar yearly salaries)

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
    """$30K / $250K / $1M (the pip labels)."""
    return "$1M" if v == 10**6 else f"${v // 1000}K"

A["salaries"] = SALARIES_A
A["t"] = {v: pass_time(v, RATE_A) for v in SALARIES_A}
A["shown"] = {v: secs_shown(A["t"][v]) for v in SALARIES_A}         # 1.0 / 1.6 / 3.3 / 8 / 33
A["s_1m"] = A["shown"][10**6]                                          # 33
A["run"] = (F("0.0"), F("32.6"))
A["final_exact"] = RATE_A * (A["run"][1] - A["run"][0])
A["final"] = f"{ap(rhu(A['final_exact']), A['final_exact'])}{usd(A['final_exact'])}"
A["fy"] = 25                                                           # "FY25" in the footer
assert [A["shown"][v] for v in SALARIES_A] == [1, F("1.6"), F("3.3"), 8, 33], A["shown"]
assert A["t"][10**6] < A["run"][1], "the $1 million row must pass before the counter stops"
assert all(A["t"][v] < 5 for v in SALARIES_A[:3]), "the three everyday rows close inside 5 s"
row("10a", "rate", "$970B ÷ 31,536,000 s", RATE_A, A["rate_disp"] + " every second")
row("10a", "per hour", "rate × 3,600 ÷ 1e6", RATE_A * 3600 / 10**6, f"≈ ${A['hour_m']} million")
for v in SALARIES_A:
    row("10a", f"t {k_label(v)} salary", f"{usd(v)} ÷ rate", A["t"][v], f"≈ {secs_text(A['shown'][v])}")
row("10a", "t median pay", "$65,052 ÷ rate", A["t_pay"], f"≈ {d1(A['s_pay'])} seconds (caption)")
row("10a", "counter final", "rate × 32.6 s", A["final_exact"], A["final"])
row("10a", "at 1.5 s", "rate × 1.5 ÷ $50,000", RATE_A * F(3, 2) / 50000 * 100, "the $50K bill ≈ 92% full (frame check)")

SPEC_A = {
    "id": "10a-scoreboard-debt-interest-live",
    "look": "scoreboard",
    "format": "cost-counter",
    "fps": 30,
    "duration": 36.5,
    "header": "US debt interest since you hit **play**:\nwhen does it pass **your salary**?",
    "footer": (f"FY{A['fy']}: ${NET_INTEREST_FY2025 // 10**9}B ÷ {SECONDS_PER_YEAR:,} s"
               f" · pay {usd(MEDIAN_WEEKLY)} × {WEEKS}"),
    "captions": True,
    "vo": [
        (0.0, 1.4, "Find your salary."),
        (1.6, 1.6, f"{usd(50000)}: passed."),
        (3.25, 2.0, f"{usd(100000)}: passed."),
        (5.4, 3.1, f"**{A['rate_disp']}** a second."),
        (8.5, 3.9, f"{usd(250000)} a year: ≈ {secs_text(A['shown'][250000])}."),
        (12.7, 4.3, f"Yearly pay ÷ {A['rate_shown']:,} = your seconds."),
        (17.2, 3.5, f"That's **≈ ${A['hour_m']} million** an hour."),
        (21.0, 4.7, f"At fiscal 2025's rate: ${NET_INTEREST_FY2025 // 10**9} billion a year."),
        (28.0, 2.7, "Last row: $1 million a year."),
        (32.5, 2.7, f"**$1 million**: ≈ {secs_text(A['s_1m'])}."),
    ],
    "verdict": (32.5, f"**$1 million** a year: ≈ {secs_text(A['s_1m'])}."
                      f"\n{usd(100000)} a year: ≈ {secs_text(A['shown'][100000])}."),
    "data": {
        "label": "Net interest on the US debt, since you hit play",
        "perSecond": float(rhu(RATE_A, F(1, 100))),
        "rateDisplay": f"{A['rate_disp']} every second",
        "counterT": [float(A["run"][0]), float(A["run"][1])],
        "startValue": 0, "prefix": "$", "dp": 0,
        "milestones": [(v, f"A {usd(v)} salary: {usd(v)}") for v in SALARIES_A],
        "final": A["final"],
        "hold": 3.9,
    },
    "lookOpts": {
        "intro": {"l1": A["rate_disp"], "l2": "every second"},
        "labels": [{"l1": f"{usd(v)} a year", "l2": f"≈ {secs_text(A['shown'][v])}"} for v in SALARIES_A],
        "rateSteps": [   # each VO beat gets its label-stack beat (assembly pass): the swap-in rule, the hourly rate,
                         # the source figure and the last row; d holds a beat to the next one (no flash of the rate)
            {"t": 12.7, "l1": f"Yearly pay ÷ {A['rate_shown']:,}", "l2": "= your seconds", "d": 4.5},
            {"t": 17.2, "l1": f"{A['rate_disp']} × 3,600 s", "l2": f"≈ ${A['hour_m']} million an hour"},
            {"t": 21.0, "l1": "Fiscal 2025 net interest", "l2": f"${NET_INTEREST_FY2025 // 10**9} billion a year"},
            {"t": 28.0, "l1": "Last row", "l2": f"{usd(10**6)} a year", "d": 4.6},
        ],
        "pips": True,
        "pipLabels": [k_label(v) for v in SALARIES_A],
        "icons": ["bill", "bill", "bill", "bill", "coin"],
        "heroIcon": False,
    },
    # (milestone value, VO line index, phrase in that line that names it). $30K is not spoken: it lights at
    # 0.975 s, during "Find your salary.", and the label stack names it on screen.
    "sync": [(50000, 1, "$50,000"), (100000, 2, "$100,000"), (250000, 4, "$250,000"), (10**6, 9, "$1 million")],
    "beats": [(12.7, 5), (17.2, 6), (21.0, 7), (28.0, 8)],    # lookOpts.rateSteps: (t, VO line index that starts with it)
    "t0": 0.0,               # the counter runs from frame 1
    "rate": RATE_A,
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
B["run"] = (B["t0"], F("33.3"))
B["final_exact"] = RATE_B * (B["run"][1] - B["run"][0])
B["final"] = f"{ap(rhu(B['final_exact']), B['final_exact'])}{usd(B['final_exact'])}"
assert B["t_pay"] - B["t0"] < 1, "a year's median pay must pass in under 1 second"
assert B["growth_t"] == F("2.46"), "the readings must still round to the $2.46T PrimeRates headline"
assert B["minute"] > PAY40, "1 minute of new debt must beat 40 years of median pay (the header's answer)"
assert B["t_pay40"] - B["t0"] < MINUTE, "the working life must go inside the minute"
assert DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY) * MINUTE > PAY40, "the public part alone must still win"
assert B["t_pay40"] < B["run"][1], "the counter must pass 40 years before it stops"
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
row("10b", "t 40 yrs pay", "$2,602,080 ÷ rate", B["t_pay40"], f"≈ {B['s_pay40']} seconds (VO 33.3)")
row("10b", "minute used", "t 40 yrs ÷ 60 s", (B["t_pay40"] - B["t0"]) / MINUTE * 100, f"{B['minute_used']}% (md only)")
row("10b", "counter final", "rate × 33.3 s", B["final_exact"], B["final"])
row("10b", "public part", "$2.09T ÷ (364 × 86,400 s)", DEBT_HELD_PUBLIC_GROWTH / (DAYS_B * SECONDS_PER_DAY), f"≈ ${B['public_rate']:,} a second; ≈ ${d1(B['public_minute_m'])} million a minute (TikTok reply)")

SPEC_B = {
    "id": "10b-becker-rig-debt-vs-your-pay",
    "look": "becker-rig",
    "format": "cost-counter",
    "fps": 30,
    "duration": 36.6,
    "header": f"{WORKING_YEARS} years of your pay vs\n**1 minute** of new US debt.\nWhich is bigger?",
    "footer": (f"New debt ≈ ${float(B['growth_t'])}T ÷ ({DAYS_B} × {SECONDS_PER_DAY:,} s)"
               f"\nPay: BLS median {usd(MEDIAN_WEEKLY)} a week × {WEEKS}"),
    "captions": True,
    "vo": [
        (0.0, 2.4, f"Your {WORKING_YEARS} years, or 1 minute?"),
        (2.4, 1.6, "3 years, gone."),
        (4.2, 2.4, f"**{B['rate_disp']}** a second."),
        (8.2, 2.4, f"{TEN} years of median pay."),
        (10.6, 5.8, f"The debt grew ≈ ${float(B['growth_t'])} trillion in {DAYS_B} days."),
        (16.5, 1.5, "Halfway: 20 years."),
        (18.2, 4.7, f"{WORKING_YEARS} × {usd(PAY)} ≈ **${d1(B['pay40_m'])} million**."),
        (23.1, 2.0, "That's a whole working life."),
        (25.3, 3.1, f"1 minute: ≈ ${d1(B['minute_m'])} million."),
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
            (PAY40, f"{WORKING_YEARS} years of median pay: {usd(PAY40)}"),
        ],
        "final": B["final"],
        "hold": 3.3,
    },
    "lookOpts": {
        "stage": "white",
        "surface": "debt-clock",
        "surfaceLabel": "New US debt since you hit play",
        "opener": {"t": 0.0, "pose": "lift", "prop": "block-stack", "blocks": WORKING_YEARS, "unit": PAY,
                   "text": f"{WORKING_YEARS} × {usd(PAY)}", "sub": f"{WORKING_YEARS} years of median pay"},
        "stamp": {"t": float(B["t0"] + 1), "text": f"1 second {B['rate_disp']}"},
        "timer": {"t0": float(B["t0"]), "label": "1 minute", "total": MINUTE,
                  "endLabel": {"t": 25.3, "text": f"≈ ${d1(B['minute_m'])} million"}},
        "actions": [
            {"milestone": 0, "verb": "swallow", "becomes": "the panel has been slurping blocks off the top of his stack since frame 1, one per year of pay; he hugs the rest tighter"},
            {"milestone": 1, "verb": "push", "becomes": "he shoves back against the panel's slot; it keeps eating"},
            {"milestone": 2, "verb": "shocked", "becomes": "halfway: his stack is half gone; the counter turns orange and its last digits blur"},
            {"milestone": 3, "verb": "flattened", "becomes": "white-hot, it cracks and bursts as the last block goes in; the blast knocks him flat, arms empty"},
        ],
        "heat": [
            {"t": 0.0, "state": "cool"}, {"t": 16.5, "state": "orange"},
            {"t": 28.6, "state": "white"}, {"t": 33.3, "state": "burst"},
        ],
        "gag": {"t": 33.3, "text": f"≈ {B['s_pay40']} seconds"},
    },
    "sync": [(PAY3, 1, "3 years"), (PAY10, 3, "10 years"), (PAY20, 5, "20 years"),
             (PAY40, 10, "A working life")],
    "beats": [(16.5, 5), (25.3, 8), (28.6, 9), (33.3, 10)],   # heat orange, timer end label, heat white, burst/gag
    "t0": 0.0,               # the counter runs from frame 1 (no armed pause)
    "rate": RATE_B,
}

# ---------- 10c: 1 second of Amazon's profit, in weeks of median pay (hook pass 2) -------------
C = {}
C["keep_shown"] = rhu(KEEP_C)                                          # 2,464 (rate label, formula bar, VO, caption)
C["keep_cents"] = rhu(KEEP_C, F(1, 100))                               # 2,463.85 (perSecond; the 1-second row's value)
C["wk1"] = KEEP_C / MEDIAN_WEEKLY                                      # 1.97 weeks of median pay per second
C["wk1_shown"] = rhu(C["wk1"])                                         # 2
C["fx_wk1"] = rhu(F(C["keep_shown"]) / MEDIAN_WEEKLY)                  # 2 (formula bar: $2,464 ÷ $1,251)
C["five"] = KEEP_C * 5                                                 # 12,319.25 (5 seconds of profit)
C["five_cents"] = rhu(C["five"], F(1, 100))                            # 12,319.25 (the 5-second row's value)
C["five_shown"] = rhu(C["five"])                                       # 12,319
C["wk5"] = C["five"] / MEDIAN_WEEKLY                                   # 9.85 weeks
C["wk5_shown"] = rhu(C["wk5"])                                         # 10
C["fx_wk5"] = rhu(F(C["five_shown"]) / MEDIAN_WEEKLY)                  # 10 (formula bar: $12,319 ÷ $1,251)
C["half"] = F(PAY, 2)                                                  # 32,526 (6 months of median pay, exact)
C["t_half"] = C["half"] / KEEP_C                                       # 13.20 s
C["s_half"] = rhu(C["t_half"])                                         # 13
C["t_keep_pay"] = F(PAY) / KEEP_C                                      # 26.40 s
C["s_keep_pay"] = rhu(C["t_keep_pay"])                                 # 26
C["fx_keep_pay"] = rhu(F(PAY) / C["keep_shown"])                       # 26 (with the shown $2,464)
C["run"] = (F("0.0"), F("26.5"))
C["fx_rate"] = f"= ${float(AMZN_NET_INCOME_2025 / 10**9)}B ÷ {SECONDS_PER_YEAR:,} s ≈ ${C['keep_shown']:,}"
C["final_exact"] = KEEP_C * (C["run"][1] - C["run"][0])
C["final"] = f"{ap(rhu(C['final_exact']), C['final_exact'])}{usd(C['final_exact'])}"
# the Live Sheet kit times its rows on the rate start -> final over counterT (preroll 0): the rows must still pass
# at 1.000 / 5.000 / 13.201 / 26.403 s
C["kit_rate"] = F(rhu(C["final_exact"])) / (C["run"][1] - C["run"][0])
C["kit_t"] = [F(v) / C["kit_rate"] for v in (C["keep_cents"], C["five_cents"], C["half"], PAY)]
assert C["final_exact"] > PAY, "the counter must pass a year of median pay before it stops"
assert C["fx_keep_pay"] == C["s_keep_pay"], "the formula-bar time must equal the exact time's rounding"
assert C["fx_wk1"] == C["wk1_shown"], "the formula-bar weeks must equal the exact weeks' rounding"
assert C["fx_wk5"] == C["wk5_shown"], "the formula-bar weeks (5 s) must equal the exact weeks' rounding"
assert C["half"].denominator == 1, "half a year of median pay must be a whole dollar amount"
assert all(abs(a - b) < F(1, 100) for a, b in zip(C["kit_t"], (1, 5, C["t_half"], C["t_keep_pay"]))), C["kit_t"]
row("10c", "kept per second", "$77.7B ÷ 31,536,000 s", KEEP_C, f"≈ ${C['keep_shown']:,} (everywhere)")
row("10c", "1 s in weeks", "rate ÷ $1,251", C["wk1"], f"≈ {C['wk1_shown']} weeks (row, VO, verdict)")
row("10c", "5 s of profit", "rate × 5", C["five"], f"≈ ${C['five_shown']:,}")
row("10c", "5 s in weeks", "rate × 5 ÷ $1,251", C["wk5"], f"≈ {C['wk5_shown']} weeks")
row("10c", "half a year", "$65,052 ÷ 2", C["half"], f"{usd(C['half'])} (6 months, exact)")
row("10c", "t half a year", "$32,526 ÷ rate", C["t_half"], f"≈ {C['s_half']} seconds")
row("10c", "t a year", "$65,052 ÷ rate", C["t_keep_pay"], f"≈ {C['s_keep_pay']} seconds (also $65,052 ÷ $2,464)")
row("10c", "counter final", "rate × 26.5 s", C["final_exact"], C["final"])
row("10c", "at 1.5 s", "rate × 1.5", KEEP_C * F(3, 2), "$3,696 on the counter (frame check)")

SPEC_C = {
    "id": "10c-live-sheet-amazon-makes",
    "look": "live-sheet",
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
        (15.8, 5.0, f"{C['keep_shown']:,} ÷ your weekly pay = your weeks."),
        (22.4, 1.6, "And a whole year?"),
        (26.4, 1.6, f"≈ {C['s_keep_pay']} seconds."),
    ],
    "verdict": (26.4, f"1 second ≈ **{C['wk1_shown']} weeks** of median pay.\nA year: ≈ {C['s_keep_pay']} s."),
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
        "hold": 4.5,
    },
    "lookOpts": {
        "preroll": 0,
        # one line each (<= 32 characters: the kit's bar keeps one 76 px line at 40-42 px), one working per VO beat
        "formulaSteps": [
            {"t": 0.0, "text": C["fx_rate"]},
            {"t": 2.8, "text": f"= ${C['keep_shown']:,} ÷ {usd(MEDIAN_WEEKLY)} ≈ {C['fx_wk1']} weeks"},
            {"t": 5.2, "text": f"= ${C['five_shown']:,} ÷ {usd(MEDIAN_WEEKLY)} ≈ {C['fx_wk5']} weeks"},
            {"t": 7.4, "text": C["fx_rate"]},
            {"t": 13.2, "text": f"= {usd(PAY)} ÷ 2 = {usd(C['half'])}"},
            {"t": 15.8, "text": f"= ${C['keep_shown']:,} ÷ your weekly pay"},
            {"t": 26.4, "text": f"= {usd(PAY)} ÷ ${C['keep_shown']:,} ≈ {C['fx_keep_pay']} s"},
        ],
        "columns": ["Since play", "Profit", "Median pay"],
        "rows": [
            {"label": "1 second", "amount": f"≈ ${C['keep_shown']:,}", "at": f"≈ {C['wk1_shown']} weeks"},
            {"label": "5 seconds", "amount": f"≈ ${C['five_shown']:,}", "at": f"≈ {C['wk5_shown']} weeks"},
            {"label": f"≈ {C['s_half']} seconds", "amount": usd(C["half"]), "at": "6 months"},
            {"label": f"≈ {C['s_keep_pay']} seconds", "amount": usd(PAY), "at": "1 year"},
        ],
        "loop": True,
    },
    # The 1-second row snaps "≈ 2 weeks" on screen at its pass (1.000 s) while vo[0] asks the question; vo[1] reads
    # it back at 2.8 s with the formula bar's working, so it is not in the 0.5 s VO sync list.
    "sync": [(C["five_cents"], 2, "5 seconds"), (C["half"], 4, "≈ 13"), (PAY, 7, "≈ 26")],
    "beats": [(0.0, 0), (2.8, 1), (5.2, 2), (7.4, 3), (13.2, 4), (15.8, 5), (26.4, 7)],    # the formula-bar steps start their VO lines
    "t0": 0.0,
    "rate": KEEP_C,
}

EXPECTED = [SPEC_A, SPEC_B, SPEC_C]

# One shown rounding per quantity: (name, exact value, the one display allowed within ±5% of it)
QUANTITIES = {
    "10a": [("rate", RATE_A, A["rate_shown"]), ("per hour, millions", RATE_A * 3600 / 10**6, A["hour_m"]),
            ("pass: median pay", A["t_pay"], A["s_pay"])]
           + [(f"pass: {k_label(v)}", A["t"][v], A["shown"][v]) for v in SALARIES_A],
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
        return (common | {F(A["fy"]), F(2025), F(970), F(A["rate_shown"]), F(A["hour_m"]), F(rhu(A["final_exact"])),
                          F(3600)}
                | {F(v) for v in SALARIES_A} | {F(v // 1000) for v in SALARIES_A}      # $30,000 / $30K pip labels
                | {F(A["shown"][v]) for v in SALARIES_A})                              # ≈ 1.0 / 1.6 / 3.3 / 8 / 33 s
    if tid == "10b":
        return common | {F(DAYS_B), F(SECONDS_PER_DAY), B["growth_t"], F(B["rate_shown"]), F(3), F(PAY3), F(TEN),
                         F(PAY10), F(20), F(PAY20), F(WORKING_YEARS), F(PAY40), F(B["pay40_m"]), F(B["s_pay40"]),
                         B["minute_m"], F(rhu(B["final_exact"]))}
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
    for r, name in ((rate, "exact"), (F(str(d["perSecond"])), "stored")):
        fin = r * (t1 - t0) + F(d["startValue"])
        eq(tid, f"final = {name} perSecond × run", d["final"], f"{ap(rhu(fin), fin)}{usd(fin)}")
    vals = [F(m["value"]) for m in d["milestones"]]
    check(vals == sorted(vals), tid, "milestones ascend")
    check(all(pass_time(v, rate, t0) < t1 for v in vals), tid, "every milestone passes before the counter stops")

    # ---- every number token is computed or a labelled constant --------------------------
    allowed = allowed_numbers(tid)
    for where, text in display_strings(spec):
        for n in number_tokens(text):
            check(n in allowed, tid, f"number {n} in {where} is computed/sourced", text)
        if where in APPROX_NEEDED:
            check("≈" in text, tid, f"≈ on rounded {where}", text)

    # ---- "≈" on rounded results only: a "≈ X" in VO/verdict must not be exact ----------
    exact_set = {F(MEDIAN_WEEKLY), F(PAY), F(NEW_HOUSE), F(PAY3), F(PAY10), F(PAY20), F(PAY40), F(SECONDS_PER_YEAR), F(10**6)}
    for where, text in display_strings(spec):
        for m in re.finditer(r"≈ \$?(\d[\d,]*(?:\.\d+)?)", strip_markup(text)):
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
