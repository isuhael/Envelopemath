#!/usr/bin/env python3
"""
Format 2 "find-your-row" (P7): maths and spec check for teasers 02a, 02b and 02c (round-2 revision,
then the round-2 hook pass of 2026-10-07: 02a "It's just $3 a day", 02b "earns your whole career's pay",
02c "what time your 9-to-5 starts paying you").

1. Recomputes every on-screen number from its inputs (the sourced inputs are named
   constants below; everything else is arithmetic on them).
2. Builds every display string the specs should carry (header, footer, formula, column
   labels, rows, pointer labels, verdict, VO/caption lines) from those numbers.
3. Loads the three spec JSONs from studio/specs/ and asserts:
   - every display string equals the computed, formatted string exactly;
   - every number token in every display string and VO line is a computed value;
   - "≈" sits on every rounded result and on no exact one;
   - timing: header + a number on screen at t = 0; every VO line fits BOTH 2.6 words/s
     (hyphenated numbers as one word) AND 2.8 words/s (hyphenated numbers split, e.g.
     "twenty-five" = 2 words); VO lines do not overlap; each pointer lands when its VO line
     starts and after its row has landed; the verdict lands when the VO says it; duration is
     inside the 6-16 s lane; hold = duration - last row/pick; the VO ends >= 1.5 s before the end;
   - contract shape (FORMATS.md section 2): 2-4 columns, 5-14 rows, no extra data fields;
   - the write-up (teasers/v2/02-find-your-row.md) quotes every VO line, verdict and footer
     exactly as the specs carry them, and carries the platform titles below.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/02-find-your-row.py
"""
import json
import re
import sys
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path

HERE = Path(__file__).resolve()
REPO = HERE.parents[3]
SPEC_DIR = REPO / "studio" / "specs"
MD_PATH = REPO / "teasers" / "v2" / "02-find-your-row.md"
WPS = 2.6        # voice-over reading speed, words per second (hyphenated numbers = 1 word)
WPS_SPLIT = 2.8  # second, stricter read: hyphenated numbers split ("twenty-five" = 2 words)

# --------------------------------------------------------------------------------------
# Sourced real-world inputs (publisher, date and URL for each in 02-find-your-row.md)
# --------------------------------------------------------------------------------------
FED_MIN_WAGE = 7.25          # USD/hr. US DOL Wage and Hour Division (in force since 2009-07-24);
                             # BLS CPS annual table 44: "$7.25 per hour in 2025".
MUSK_PLAN_MAX = 1_000_000_000_000   # Tesla 2025 CEO award "worth up to $1 trillion" if every target is hit,
                                    # "over the next decade"; approved by shareholders 2025-11-06 (Reuters).
DAYS_PER_YEAR_AVG = 365.25   # average calendar year (leap years included): 8,766 hrs a year, 24/7
BLS_MEDIAN_WEEKLY = 1251     # USD, median usual weekly earnings, full-time wage & salary workers,
                             # Q2 2026, not seasonally adjusted. BLS release 2026-07-21.
# 2026 federal income tax, single filer (IRS Rev. Proc. 2025-32, 2025-10-09)
STD_DEDUCTION_2026 = 16_100
BRACKETS_2026 = [(12_400, 0.10), (50_400, 0.12), (105_700, 0.22), (201_775, 0.24), (256_225, 0.32)]
# 2026 FICA (SSA 2026 fact sheet): 6.2% Social Security to the wage base, 1.45% Medicare on all wages,
# +0.9% Additional Medicare on wages over $200,000 (single)
SS_RATE, SS_WAGE_BASE_2026, MEDICARE_RATE = 0.062, 184_500, 0.0145
ADDL_MEDICARE_RATE, ADDL_MEDICARE_THRESHOLD = 0.009, 200_000

# Conventions (assumptions printed in each footer)
HOURS_PER_WEEK, WEEKS_PER_YEAR = 40, 52
HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR          # 2,080

TITLES = {   # hook pass (2026-10-07): the adopted candidates' platform titles
    "02a-live-sheet-3-a-day-by-age": "\"It's Just $3 a Day\": What It Costs You by 65, by Age",
    "02b-scoreboard-trillion-at-your-wage": "How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay",
    "02c-clean-sheet-salary-per-hour": "What Time Your 9-to-5 Starts Paying You, by Salary",
}

# --------------------------------------------------------------------------------------
# Formatting helpers
# --------------------------------------------------------------------------------------
def round_half_up(x, step):
    return int(x / step + 0.5) * step

def cents(x):
    """Round to the cent, half up, on the decimal value (avoids float ties going the wrong way)."""
    return float(Decimal(repr(x)).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP))

def usd(x, dp=0):
    return "$" + f"{x:,.{dp}f}"

def approx(rounded, exact, eps=1e-9):
    """'≈ ' when the shown value is a rounding of the exact one."""
    return "≈ " if abs(rounded - exact) > eps else ""

def strip_markup(s):
    return s.replace("**", "").replace("__", "").replace("\n", " ")

NUM_RE = re.compile(r"\d[\d,]*(?:\.\d+)?")

def number_tokens(s):
    out = []
    for m in NUM_RE.finditer(strip_markup(s)):
        tok = m.group(0).rstrip(",")
        out.append(float(tok.replace(",", "")))
    return out

# spoken-word estimate for VO timing ---------------------------------------------------
def int_word_count(n, split=False):
    """Words to read a non-negative integer aloud. Hyphenated tens ("twenty-five") count as one
    word, or as two with split=True."""
    if n == 0:
        return 1
    words = 0
    for scale in (10**12, 10**9, 10**6, 10**3, 1):
        g = (n // scale) % 1000
        if g == 0:
            continue
        hd, r = divmod(g, 100)
        if hd:
            words += 2               # "two hundred"
        if r:
            words += 1               # "forty", "twenty-five", "eleven"
            if split and r > 20 and r % 10:
                words += 1           # "twenty-five" read as two words
        if scale > 1:
            words += 1               # "thousand", "million", ...
    return words

def spoken_words(text, split=False):
    """Estimate how many words the owner will say for one VO line (always counts "dollars")."""
    s = strip_markup(text)
    s = s.replace("≈", " about ")
    s = s.replace("/hr", " an hour")
    count = 0
    def money_repl(m):
        nonlocal count
        dollars, cents_part, scale = m.group(1), m.group(2), m.group(3)
        d = int(dollars.replace(",", ""))
        if cents_part is not None:
            c = int(cents_part)
            if d == 0:
                count += int_word_count(c, split) + 1                 # "fifty-two cents"
            else:
                count += int_word_count(d, split) + int_word_count(c, split)  # "thirty-one twenty-five"
        else:
            count += int_word_count(d, split) + (1 if scale else 0) + 1     # + "dollars"
        return " "
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d\d))?(\s(?:million|billion|trillion))?", money_repl, s)
    def num_repl(m):
        nonlocal count
        whole, frac, scale = m.group(1), m.group(2), m.group(3)
        count += int_word_count(int(whole.replace(",", "")), split)
        if frac:
            count += 1 + len(frac)                       # "point three"
        if scale:
            count += 1
        return " "
    s = re.sub(r"(\d[\d,]*)(?:\.(\d+))?(\s(?:million|billion|trillion))?", num_repl, s)
    count += len([w for w in re.split(r"[\s,.:?!;—–-]+", s) if re.search(r"[A-Za-z]", w)])
    return count

def need_secs(text):
    return max(spoken_words(text) / WPS, spoken_words(text, split=True) / WPS_SPLIT)

def mention_time(line, phrase):
    """When the VO reaches `phrase` inside a line: t + words before it / WPS."""
    plain = strip_markup(line["text"])
    i = plain.find(phrase)
    assert i >= 0, f"phrase {phrase!r} not in VO line {plain!r}"
    return line["t"] + spoken_words(plain[:i]) / WPS

# --------------------------------------------------------------------------------------
# 02a  Live Sheet  "What $3 a day costs you by age"
# --------------------------------------------------------------------------------------
def build_02a():
    DAILY = 3
    DAYS = 365
    ANNUAL = DAILY * DAYS                     # 1,095
    MONTHLY = ANNUAL / 12                     # 91.25
    RATE = 0.07
    END_AGE = 65
    AGES = [18, 20, 25, 30, 35, 40, 45, 50, 55, 60]

    def spend(age):
        return ANNUAL * (END_AGE - age)

    def cost(age, rate=RATE):                 # FV of MONTHLY at rate/12, end of each month
        r, n = rate / 12, (END_AGE - age) * 12
        return MONTHLY * ((1 + r) ** n - 1) / r if n else 0.0

    def round_cost(x):                        # nearest $1,000; nearest $100 below $10,000
        return round_half_up(x, 1000) if x >= 10_000 else round_half_up(x, 100)

    rows, nums = [], []
    for a in AGES:
        c = cost(a)
        rc = round_cost(c)
        rows.append([str(a), usd(spend(a)), approx(rc, c) + usd(rc)])
        nums.append((f"row {a}", f"{usd(ANNUAL)} × {END_AGE - a} yrs = {usd(spend(a))};  FV({usd(MONTHLY, 2)}/mo, 7%/12, {(END_AGE - a) * 12} mo) = {usd(c, 2)} → {approx(rc, c)}{usd(rc)}"))

    i18, i25, i35 = AGES.index(18), AGES.index(25), AGES.index(35)
    ratio18 = cost(18) / spend(18)
    ratio18_disp = round(ratio18, 1)                              # 7.777 → 7.8
    ratio = cost(25) / spend(25)
    ratio_disp = round(ratio, 1)                                  # 5.468 → 5.5
    gap = 35 - 25
    younger = cost(25) / cost(35)
    younger_disp = round(younger, 1)                              # 2.152 → 2.2
    # verdict: "10 years younger: it costs more than double", for every whole age whose +10 is < 65
    whole = {a: cost(a) / cost(a + gap) for a in range(18, END_AGE - gap)}
    assert all(v > 2 for v in whole.values()), "verdict 'more than double' fails an age"
    pairs = [(a, a + gap) for a in AGES if a + gap in AGES]
    assert all(cost(a) > 2 * cost(b) for a, b in pairs)
    # the doubling-plus-deposits reasoning in the pinned comment: a lump sum alone would NOT double in 10 yrs
    lump_10y = (1 + RATE / 12) ** 120
    assert lump_10y > 2 * 0.99 and lump_10y < 2.01   # ≈ ×2.01: "roughly doubles every decade"

    # hook pass: the excuse the viewer already holds ("it's just $3 a day") is the header, and the spend
    # column is relabelled as that wrong answer, in red, beside the real cost
    # round-2 fix pass (2026-10-08): the opener is split so the first payoff gets its own pointer (row 18) as it is
    # spoken; the 35-row pick is a bracket from the 25 row (live-sheet lookOpts.compare), the 25 row stays tinted
    vo = [
        {"t": 0.0, "d": 1.95, "text": f"Just {usd(DAILY)} a day?"},
        {"t": 2.0, "d": 2.7, "text": f"At {AGES[i18]}: **{rows[i18][2]}**."},
        {"t": 4.9, "d": 3.3, "text": f"At {AGES[i25]}: **{rows[i25][2]}**."},
        {"t": 8.4, "d": 3.5, "text": f"{gap} years younger? It costs you **more than double**."},
    ]
    picks = [
        {"t": vo[1]["t"], "row": i18, "label": f"≈ {ratio18_disp:.1f}× what you think"},
        {"t": vo[2]["t"], "row": i25, "label": f"≈ {ratio_disp:.1f}× what you think"},
        {"t": vo[3]["t"], "row": i35, "label": f"≈ {younger_disp:.1f}×"},
    ]
    verdict_t = round(mention_time(vo[3], "more than double"), 1)
    rows_t, row_every = 0.0, 0.5
    duration = round(vo[-1]["t"] + vo[-1]["d"] + 1.5, 1)          # 11.9 + 1.5 = 13.4
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02a-live-sheet-3-a-day-by-age",
        "look": "live-sheet",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": f"“It’s just **{usd(DAILY)} a day**.”\nWhat it costs you by {END_AGE}:",
        "footer": f"At {round(RATE * 100)}% a year until {END_AGE} · no tax, fees, inflation",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"{gap} years younger?\nIt costs **more than double**."},
        "data": {
            "columns": [
                {"label": "Your age"},
                {"label": "__What you think it costs__", "tone": "bad"},   # the held (wrong) answer, in red
                {"label": "What it really costs you", "emph": True},
            ],
            "rows": rows,
            "formula": f"= {usd(DAILY)} × {DAYS} ÷ 12 = {usd(MONTHLY, 2)} a month",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
        "lookOpts": {"compare": [{"pick": 2, "from": i25}]},
        "sfx": [{"t": verdict_t, "kind": "ding"}],
    }
    allowed = {float(DAILY), float(DAYS), 12.0, MONTHLY, RATE * 100, float(END_AGE), float(gap),
               ratio18_disp, ratio_disp, younger_disp}
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    at10_25 = round_half_up(cost(25, 0.10), 1000)
    at10_18 = round_half_up(cost(18, 0.10), 10000)
    assert (at10_25, at10_18) == (577_000, 1_170_000)
    # the red "what you think" number beside the real cost in the rows that land in the first 1.5 s
    first = [(a, cost(a) / spend(a)) for a in AGES[:4]]
    nums += [
        ("$3 a day", f"{usd(DAILY)} × {DAYS} = {usd(ANNUAL)} a year; ÷ 12 = {usd(MONTHLY, 2)} a month"),
        ("red vs real", "rows landing by 1.5 s: " + ", ".join(f"{a}: ×{r:.2f}" for a, r in first)),
        ("first payoff", f"VO reaches '{rows[i18][2]}' at {mention_time(vo[1], rows[i18][2]):.2f} s (pointer on row 18 from {vo[1]['t']} s)"),
        ("pick 18", f"{usd(cost(18), 2)} ÷ {usd(spend(18))} = {ratio18:.3f} → ≈ {ratio18_disp:.1f}×"),
        ("pick 25", f"{usd(cost(25), 2)} ÷ {usd(spend(25))} = {ratio:.3f} → ≈ {ratio_disp:.1f}×"),
        ("bracket 25-35", f"FV(25) ÷ FV(35) = {usd(cost(25), 2)} ÷ {usd(cost(35), 2)} = {younger:.3f} → ≈ {younger_disp:.1f}× (and FV(35) ÷ FV(25) = {1 / younger:.3f} < 1/2)"),
        ("verdict", f"FV(age) ÷ FV(age + 10), ages 18-54: min {min(whole.values()):.3f} (age {min(whole, key=whole.get)}), max {max(whole.values()):.2f} (all > 2)"),
        ("pinned 10%", f"at 10%: age 25 → {usd(at10_25)}, age 18 → {usd(at10_18)}"),
        ("rule of 72", f"72 ÷ 7 = {72 / 7:.1f} yrs to double; a lump sum at 7%/12 for 120 mo = ×{lump_10y:.3f} (the extra deposits push the ratio above 2)"),
        ("effective", f"7%/12 monthly = {((1 + RATE / 12) ** 12 - 1) * 100:.2f}% effective a year (pinned comment)"),
    ]
    return exp, allowed, nums

# --------------------------------------------------------------------------------------
# 02b  Scoreboard  "How fast Elon's $1 trillion pay plan earns your whole career's pay"  (hook pass)
# --------------------------------------------------------------------------------------
def build_02b():
    TARGET = MUSK_PLAN_MAX
    WAGES = [FED_MIN_WAGE, 15, 20, 25, 30, 40, 50, 75, 100, 500, 1000]   # fix pass: $10 and $250 dropped (row pitch)
    PLAN_YEARS = 10                                           # "over the next decade" (Reuters)
    SECS = int(PLAN_YEARS * DAYS_PER_YEAR_AVG * 24 * 3600)    # 315,576,000 s (365.25-day years, 24/7)
    RATE = TARGET / SECS                                      # $3,168.81 a second
    CAREER_YEARS = 40
    CAREER_HOURS = HOURS_PER_YEAR * CAREER_YEARS              # 83,200 hours

    def career(w):                                            # 40 years of pay, exact (no "≈")
        return w * CAREER_HOURS

    def secs(w):                                              # how long the plan's average takes to earn it
        return career(w) / RATE

    def fmt_time(x):                                          # minutes to 0.1 below an hour, else hours to 0.1
        m = x / 60
        if m < 60:
            r = round(m, 1)
            return f"{approx(r, m)}{r:.1f} min", r
        hrs = m / 60
        r = round(hrs, 1)
        return f"{approx(r, hrs)}{r:.1f} hrs", r

    def fmt_wage(w):
        return (usd(w, 2) if w != int(w) else usd(w)) + "/hr"

    def fmt_career(w):
        c = career(w)
        assert abs(c - round(c)) < 1e-9                       # whole dollars, so exact
        return usd(round(c))

    rows, nums = [], []
    for w in WAGES:
        disp, _ = fmt_time(secs(w))
        rows.append([fmt_wage(w), fmt_career(w), disp])
        nums.append((f"row {fmt_wage(w)}", f"{usd(w, 2)} × {CAREER_HOURS:,} = {fmt_career(w)};  ÷ {usd(RATE, 2)}/s = {secs(w):,.1f} s = {secs(w) / 60:.3f} min → {disp}"))

    assert WAGES[0] == FED_MIN_WAGE
    assert SECS == 315_576_000
    rate_disp = round(RATE)                                   # ≈ $3,169 a second
    i20, i100, i1000 = WAGES.index(20), WAGES.index(100), WAGES.index(1000)
    min_min = secs(FED_MIN_WAGE) / 60                         # 3.17 → "≈ 3 minutes"
    m20 = secs(20) / 60                                       # 8.75 → "under 9 minutes"
    under20 = 9
    assert m20 < under20 and m20 > under20 - 1
    m100 = secs(100) / 60                                     # 43.76 (row ≈ 43.8 min; no longer picked)
    h1000 = secs(1000) / 3600                                 # 7.293 → VO "≈ 7 hours", row and verdict "≈ 7.3"
    h1000_vo = round(h1000)
    h1000_disp, _ = fmt_time(secs(1000))                      # "≈ 7.3 hrs"
    h1000_r = round(h1000, 1)
    min_disp = round(min_min)
    # fix pass (2026-10-08): the opener is split so the first payoff gets its pointer (minimum-wage row) as it is
    # spoken; the ending is the last row ($1,000/hr); pointer labels show the career-pay working the captions don't say
    vo = [
        {"t": 0.0, "d": 2.0, "text": f"{CAREER_YEARS} years at minimum wage?"},
        {"t": 2.0, "d": 2.0, "text": f"**≈ {min_disp} minutes** of his."},
        {"t": 4.2, "d": 2.7, "text": f"{usd(WAGES[i20])} an hour? Under {under20} minutes."},
        {"t": 7.0, "d": 3.5, "text": f"Even **{usd(WAGES[i1000])} an hour**? ≈ {h1000_vo} hours."},
    ]
    work = lambda w: f"{fmt_wage(w)} × {CAREER_HOURS:,} hrs = {fmt_career(w)}"
    picks = [
        {"t": vo[1]["t"], "row": 0, "label": work(FED_MIN_WAGE)},
        {"t": vo[2]["t"], "row": i20, "label": work(20)},
        {"t": vo[3]["t"], "row": i1000, "label": work(1000)},
    ]
    # the verdict lands alone, once the last VO line (and its caption) has ended
    verdict_t = round(vo[-1]["t"] + vo[-1]["d"] + 0.2, 1)
    rows_t, row_every = 0.0, 0.35
    duration = 14.0
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02b-scoreboard-trillion-at-your-wage",
        "look": "scoreboard",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": "ELON'S **$1 TRILLION** PAY PLAN\nEARNS YOUR WHOLE CAREER'S PAY IN…",
        "footer": f"Plan max ÷ {PLAN_YEARS} yrs, 24/7 · you: {CAREER_YEARS} yrs × {HOURS_PER_YEAR:,} hrs",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"Even **{fmt_wage(1000)}**\nfor {CAREER_YEARS} years:\n≈ {h1000_r:.1f} hours of his."},
        "data": {
            "columns": [
                {"label": "Your wage"},
                {"label": f"{CAREER_YEARS} years\nof your pay"},
                {"label": "His plan\nearns it in", "emph": True},
            ],
            "rows": rows,
            "formula": f"= wage × {HOURS_PER_YEAR:,} × {CAREER_YEARS} ÷ {usd(rate_disp)}/s",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
        "sfx": [{"t": verdict_t, "kind": "ding"}],
    }
    allowed = {1.0, float(TARGET), float(HOURS_PER_YEAR), float(CAREER_YEARS), float(PLAN_YEARS),
               24.0, 7.0,                                     # "24/7" in the footer (24 hrs, 7 days)
               float(rate_disp), float(min_disp), float(under20), float(h1000_vo), float(CAREER_HOURS)}
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    nums += [
        ("plan clock", f"{PLAN_YEARS} × {DAYS_PER_YEAR_AVG} × 24 × 3,600 = {SECS:,} s; $1,000,000,000,000 ÷ {SECS:,} = {usd(RATE, 2)}/s → ≈ {usd(rate_disp)}"),
        ("career", f"{CAREER_YEARS} yrs × {HOURS_PER_YEAR:,} hrs = {CAREER_HOURS:,} hrs; wage × {CAREER_HOURS:,} is exact (no ≈)"),
        ("VO min wage", f"{secs(FED_MIN_WAGE):.2f} s = {min_min:.3f} min → '≈ {min_disp} minutes' (at {mention_time(vo[1], f'≈ {min_disp} minutes'):.2f} s, pointer on the $7.25 row from {vo[1]['t']} s)"),
        ("VO $20", f"{m20:.3f} min → 'under {under20} minutes'"),
        ("VO $1,000", f"{h1000:.3f} hrs → VO '≈ {h1000_vo} hours', row and verdict '≈ {h1000_r:.1f}' ({h1000_disp}); VO ends {vo[-1]['t'] + vo[-1]['d']:.1f} s, verdict {verdict_t} s"),
        ("labels", "; ".join(p["label"] for p in picks) + f" (exact: wage × {CAREER_HOURS:,})"),
        ("$100/hr", f"{m100:.3f} min → row ≈ {round(m100, 1)} min; plan per hour = {usd(RATE * 3600)} (pinned)"),
    ]
    return exp, allowed, nums

# --------------------------------------------------------------------------------------
# 02c  Clean Sheet  "What you actually make per hour, by salary"
# --------------------------------------------------------------------------------------
def fed_tax_2026(salary):
    taxable = max(0, salary - STD_DEDUCTION_2026)
    tax, lo = 0.0, 0
    for hi, rate in BRACKETS_2026:
        if taxable > lo:
            tax += (min(taxable, hi) - lo) * rate
        lo = hi
    assert taxable <= BRACKETS_2026[-1][0], "salary above the brackets modelled"
    return tax

def fica_2026(salary):
    return (SS_RATE * min(salary, SS_WAGE_BASE_2026) + MEDICARE_RATE * salary
            + ADDL_MEDICARE_RATE * max(0, salary - ADDL_MEDICARE_THRESHOLD))

def build_02c():
    SALARIES = [200_000, 150_000, 100_000, 90_000, 80_000, 70_000, 65_000,
                60_000, 50_000, 40_000, 35_000, 30_000]   # biggest bite first (R10); 12 rows keep the
                                                          # formula line and the pick legend on screen
    # hook pass: the tax share of the year read as clock time on an 8-hour 9-to-5 (the Tax-Freedom-Day logic)
    DAY_START_H, DAY_END_H = 9, 17                        # 9 am to 5 pm
    DAY_MIN = (DAY_END_H - DAY_START_H) * 60              # 480 min = 8 hrs (2,080 hrs = 8 hrs × 260 workdays)
    assert DAY_MIN * 260 == HOURS_PER_YEAR * 60

    def per_hour(s):
        return s / HOURS_PER_YEAR

    def taxes(s):
        return fed_tax_2026(s) + fica_2026(s)

    def kept(s):
        return s - taxes(s)

    def kept_hour(s):
        return kept(s) / HOURS_PER_YEAR

    def tax_min(s):                                       # minutes of each workday that go to tax + FICA
        return DAY_MIN * taxes(s) / s

    def clock(minutes_after_9):                           # "≈ 10:18 am" (rounded to the minute)
        m = round_half_up(minutes_after_9, 1)
        hh, mm = divmod(DAY_START_H * 60 + m, 60)
        ampm = "am" if hh < 12 else "pm"
        h12 = hh if hh <= 12 else hh - 12
        return f"{approx(m, minutes_after_9)}{h12}:{mm:02d} {ampm}", m

    rows, nums = [], []
    for s in SALARIES:
        tm = tax_min(s)
        tmr = round_half_up(tm, 1)
        ck, _ = clock(tm)
        rows.append([usd(s), f"{approx(tmr, tm)}{tmr} min", ck])
        nums.append((f"row {usd(s)}",
                     f"fed {usd(fed_tax_2026(s), 2)} + FICA {usd(fica_2026(s), 2)} = {usd(taxes(s), 2)} ({taxes(s) / s:.2%}) × {DAY_MIN} min = {tm:.2f} min → {rows[-1][1]} → {ck}"))

    # BLS median pointer
    median_annual = BLS_MEDIAN_WEEKLY * WEEKS_PER_YEAR          # 65,052
    median_row_salary = round_half_up(median_annual, 1000)        # 65,000
    assert median_row_salary in SALARIES
    assert abs(median_annual - median_row_salary) / median_annual < 0.01
    im = SALARIES.index(median_row_salary)
    i100 = SALARIES.index(100_000)
    m100 = round_half_up(tax_min(100_000), 1)                     # 100 min
    h100, mm100 = divmod(m100, 60)                                # 1 hr 40 min
    # sanity: the tax share rises with pay (progressive tax), so every row's clock is later than the one below
    shares = [taxes(s) / s for s in SALARIES]
    assert all(a > b for a, b in zip(shares, shares[1:]))
    assert all(tax_min(a) > tax_min(b) for a, b in zip(SALARIES, SALARIES[1:]))
    # the previous cut's per-hour figures still hold on the same model (the pinned comment uses $65,000)
    assert per_hour(65_000) == 31.25 and round(kept_hour(65_000)) == 26
    # consistency with 01b (× 0.85 kept at $41,600) and 08b ($15/hr → ≈ $13.10 kept): same tax model
    assert abs(kept(41_600) / 41_600 - 0.85) < 0.01
    assert cents(kept(15 * HOURS_PER_YEAR) / HOURS_PER_YEAR) == 13.10

    # fix pass (2026-10-08): the opener is split so the median row is lit as its clock time is spoken; the verdict
    # escalates to the top row ($200,000, lit with it: clean-sheet lookOpts.verdictRow) and lands once the VO has ended;
    # "every workday" is said once, in the verdict
    vo = [
        {"t": 0.0, "d": 1.45, "text": f"{rows[im][0]}?"},
        {"t": 1.5, "d": 3.1, "text": f"You work for tax till **{rows[im][2][:-3]}**."},
        {"t": 4.7, "d": 2.6, "text": f"That's {rows[im][1].replace(' min', ' minutes')} a day."},
        {"t": 7.4, "d": 2.4, "text": f"Six figures? Until **{rows[i100][2][:-3]}**."},
    ]
    picks = [
        {"t": vo[1]["t"], "row": im, "label": "≈ US median full-time pay"},
        {"t": vo[3]["t"], "row": i100, "label": f"≈ {h100} hr {mm100} min of tax a day"},
    ]
    verdict_t = round(vo[-1]["t"] + vo[-1]["d"] + 0.2, 1)
    rows_t, row_every = 0.0, 0.2
    duration = 13.0
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02c-clean-sheet-salary-per-hour",
        "look": "clean-sheet",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": f"What time your **{DAY_START_H}-to-{DAY_END_H - 12}**\nstarts paying you, by salary",
        "footer": "Single · 2026 federal tax + FICA · no state tax",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"{usd(SALARIES[0])}: you work for tax till **{rows[0][2][:-3]}**, every workday."},
        "data": {
            "columns": [
                {"label": "Salary"},
                {"label": "Tax + FICA,\nminutes a day"},
                {"label": "Paying you\nfrom", "emph": True},
            ],
            "rows": rows,
            "formula": f"= {DAY_START_H}:00 am + {DAY_MIN} min × (tax + FICA) ÷ salary",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
        "lookOpts": {"verdictRow": 0},
        "sfx": [{"t": verdict_t, "kind": "ding"}],
    }
    allowed = {float(DAY_START_H), float(DAY_END_H - 12), 0.0, float(DAY_MIN), 2026.0, float(h100), float(mm100)}
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    nums += [
        ("workday", f"9 am-5 pm = {DAY_MIN} min; × 260 workdays = {HOURS_PER_YEAR:,} hrs a year (the slate's ÷ 2,080)"),
        ("median", f"BLS ${BLS_MEDIAN_WEEKLY:,}/wk × {WEEKS_PER_YEAR} = {usd(median_annual)} → ≈ {usd(median_row_salary)} (row {im})"),
        ("$65,000", f"{taxes(65_000) / 65_000:.4%} × 480 = {tax_min(65_000):.2f} min → {rows[im][1]} → {rows[im][2]}; row lit from {picks[0]['t']} s, VO reaches it at {mention_time(vo[1], rows[im][2][:-3]):.2f} s"),
        ("$200,000", f"{taxes(200_000) / 200_000:.4%} × 480 = {tax_min(200_000):.2f} min → {rows[0][1]} → {rows[0][2]} (verdict at {verdict_t} s)"),
        ("$100,000", f"{taxes(100_000) / 100_000:.4%} × 480 = {tax_min(100_000):.2f} min = {h100} hr {mm100} min → {rows[i100][2]}"),
        ("spread", f"{rows[-1][2]} at {usd(SALARIES[-1])} … {rows[0][2]} at {usd(SALARIES[0])} ({round_half_up(tax_min(SALARIES[0]), 1) - round_half_up(tax_min(SALARIES[-1]), 1)} min apart)"),
        ("pinned $65,000", f"{usd(65_000)} ÷ 2,080 = $31.25 an hour; kept {kept_hour(65_000):.4f} → ≈ $26"),
        ("cross-check", f"01b: $41,600 keeps {kept(41_600) / 41_600:.3f} (≈ 0.85); 08b: $15/hr keeps {usd(kept(31_200) / 2080, 2)}"),
    ]
    return exp, allowed, nums

# --------------------------------------------------------------------------------------
# Checks
# --------------------------------------------------------------------------------------
FAILS = []
TABLE = []

def check(spec_id, field, expected, actual):
    ok = expected == actual
    TABLE.append((spec_id, field, expected, actual, ok))
    if not ok:
        FAILS.append((spec_id, field, expected, actual))
    return ok

def show(v, n=60):
    if isinstance(v, set):
        v = sorted(v)
    s = json.dumps(v, ensure_ascii=False) if not isinstance(v, str) else v
    s = s.replace("\n", "\\n")
    return s if len(s) <= n else s[: n - 1] + "…"

def check_spec(exp, allowed, path, md_text):
    sid = exp["id"]
    if not path.exists():
        check(sid, "file", str(path.name), "MISSING")
        return
    spec = json.loads(path.read_text())

    # --- exact display strings and fields
    check(sid, "id = file stem", path.stem, spec.get("id"))
    for k in ("id", "look", "format", "fps", "duration", "header", "footer", "captions", "sfx"):
        check(sid, k, exp[k], spec.get(k))
    check(sid, "verdict", exp["verdict"], spec.get("verdict"))
    sv = spec.get("vo", [])
    check(sid, "vo count", len(exp["vo"]), len(sv))
    for i, (e, a) in enumerate(zip(exp["vo"], sv)):
        check(sid, f"vo[{i}]", e, a)
    d, sd = exp["data"], spec.get("data", {})
    for k in ("columns", "formula", "rowsT", "rowEvery", "pick", "hold"):
        check(sid, f"data.{k}", d[k], sd.get(k))
    srows = sd.get("rows", [])
    check(sid, "data.rows count", len(d["rows"]), len(srows))
    for i, (e, a) in enumerate(zip(d["rows"], srows)):
        check(sid, f"row[{i}]", e, a)
    extra = set(sd) - {"columns", "rows", "formula", "rowsT", "rowEvery", "rowT", "pick", "hold"}
    check(sid, "data: no fields outside the contract", set(), extra)
    top_extra = set(spec) - {"id", "look", "format", "fps", "duration", "header", "footer", "captions", "vo", "verdict", "data", "sfx", "lookOpts"}
    check(sid, "lookOpts", exp.get("lookOpts"), spec.get("lookOpts"))
    check(sid, "spec: no top-level fields outside the contract", set(), top_extra)

    # --- every number token in every display string is a computed value
    strings = [spec.get("header", ""), spec.get("footer", ""), spec.get("verdict", {}).get("text", ""),
               sd.get("formula", "")]
    strings += [c["label"] for c in sd.get("columns", [])]
    strings += [p["label"] for p in sd.get("pick", [])]
    strings += [p.get("label", "") for p in (spec.get("lookOpts") or {}).get("compare", [])]
    strings += [cell for r in srows for cell in r]
    strings += [v["text"] for v in sv]
    stray = []
    for s in strings:
        for n in number_tokens(s):
            if not any(abs(n - a) < 1e-9 for a in allowed):
                stray.append((n, s))
    check(sid, "number tokens all computed", [], [f"{n} in {show(s, 40)}" for n, s in stray])

    # --- "≈" is followed by a number or a named anchor (rows themselves are rebuilt with approx() above)
    bad_approx = [s for s in strings if "≈" in s and not re.search(r"≈ (\$?\d|when|US)", strip_markup(s))]
    check(sid, "≈ placement", [], bad_approx)

    # --- contract shape (FORMATS.md section 2)
    ncol = len(sd.get("columns", []))
    check(sid, "2-4 columns", True, 2 <= ncol <= 4)
    check(sid, "5-14 rows", True, 5 <= len(srows) <= 14)
    check(sid, "row width = columns", True, all(len(r) == ncol for r in srows))
    check(sid, "picks point at real rows", True, all(0 <= p["row"] < len(srows) for p in sd.get("pick", [])))

    # --- hook rules on the header
    hw = len(strip_markup(spec.get("header", "")).split())
    check(sid, "header <= 15 words (R8)", True, hw <= 15)
    check(sid, "number on screen at t=0 (R1)", True,
          sd.get("rowsT", 1) == 0.0 and bool(number_tokens(" ".join(srows[0]) if srows else "")))

    # --- timing
    dur = spec.get("duration", 0)
    check(sid, "duration in 6-16 s lane", True, 6.0 <= dur <= 16.0)
    ok_fit, ok_gap = True, True
    for i, v in enumerate(sv):
        need = need_secs(v["text"])
        if v["d"] + 1e-9 < need:
            ok_fit = False
            TABLE.append((sid, f"vo[{i}] fit", f">= {need:.2f}s", f"{v['d']}s", False))
            FAILS.append((sid, f"vo[{i}] fit", need, v["d"]))
        if i + 1 < len(sv) and v["t"] + v["d"] > sv[i + 1]["t"] + 1e-9:
            ok_gap = False
    check(sid, "vo d >= words/2.6 and split words/2.8", True, ok_fit)
    check(sid, "vo lines do not overlap", True, ok_gap)
    last_vo_end = max(v["t"] + v["d"] for v in sv) if sv else 0
    check(sid, "VO ends >= 1.5 s before the end", True, last_vo_end + 1.5 <= dur + 1e-9)
    starts = {v["t"] for v in sv}
    check(sid, "each pick lands as its VO line starts", True, all(p["t"] in starts for p in sd.get("pick", [])))
    row_land = [sd.get("rowsT", 0) + sd.get("rowEvery", 0) * i for i in range(len(srows))]
    check(sid, "each pick lands after its row", True, all(p["t"] >= row_land[p["row"]] for p in sd.get("pick", [])))
    last_row_t = row_land[-1] if row_land else 0
    last_beat = max([last_row_t] + [p["t"] for p in sd.get("pick", [])])
    check(sid, "hold = duration - last row/pick", round(dur - last_beat, 2), sd.get("hold"))
    vt = spec.get("verdict", {}).get("t", -1)
    check(sid, "verdict after last pick, before end", True, last_beat <= vt <= dur)
    check(sid, "ding on the verdict", True, any(abs(x.get("t", -1) - vt) < 1e-9 and x.get("kind") == "ding" for x in spec.get("sfx", [])))

    # --- the write-up quotes the specs exactly
    # (a "\n" line break is quoted in the write-up as " / ")
    q = lambda x: x.replace("\n", " / ")
    md_missing = [v["text"] for v in sv if q(v["text"]) not in md_text]
    md_missing += [x for x in (spec.get("verdict", {}).get("text", ""), spec.get("footer", ""), sd.get("formula", ""), TITLES[sid]) if q(x) not in md_text]
    check(sid, "md quotes VO, verdict, footer, formula, title", [], md_missing)

    # word-count / time report
    for i, v in enumerate(sv):
        TABLE.append((sid, f"vo[{i}] timing",
                      f"{spoken_words(v['text'])} w → {spoken_words(v['text']) / WPS:.2f}s; split {spoken_words(v['text'], True)} w → {spoken_words(v['text'], True) / WPS_SPLIT:.2f}s",
                      f"t {v['t']} d {v['d']}", True))


def main():
    builders = [build_02a, build_02b, build_02c]
    md_text = MD_PATH.read_text() if MD_PATH.exists() else ""
    calc_lines = []
    for b in builders:
        exp, allowed, nums = b()
        calc_lines.append((exp["id"], nums))
        check_spec(exp, allowed, SPEC_DIR / f"{exp['id']}.json", md_text)

    print("=" * 110)
    print("RECOMPUTED NUMBERS")
    print("=" * 110)
    for sid, nums in calc_lines:
        print(f"\n[{sid}]")
        for k, v in nums:
            print(f"  {k:<14} {v}")

    print("\n" + "=" * 110)
    print(f"{'spec':<38} {'field':<36} {'status':<6} expected / actual")
    print("=" * 110)
    for sid, field, e, a, ok in TABLE:
        mark = "ok" if ok else "FAIL"
        line = f"{sid:<38} {field:<36} {mark:<6} {show(e)}"
        if not ok:
            line += f"\n{'':<82}actual: {show(a)}"
        print(line)
    print("=" * 110)
    n = len(TABLE)
    if FAILS:
        print(f"FAILED: {len(FAILS)} of {n} checks")
        sys.exit(1)
    print(f"PASSED: all {n} checks")


if __name__ == "__main__":
    if "--emit" in sys.argv:          # print the expected specs (used once to draft them; review before saving)
        for b in (build_02a, build_02b, build_02c):
            print(json.dumps(b()[0], ensure_ascii=False, indent=2))
        sys.exit(0)
    main()
