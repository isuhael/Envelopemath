#!/usr/bin/env python3
"""
Format 2 "find-your-row" (P7): maths and spec check for teasers 02a, 02b and 02c.

1. Recomputes every on-screen number from its inputs (the sourced inputs are named
   constants below; everything else is arithmetic on them).
2. Builds every display string the specs should carry (header, footer, formula, column
   labels, rows, pointer labels, verdict, VO/caption lines) from those numbers.
3. Loads the three spec JSONs from studio/specs/ and asserts:
   - every display string equals the computed, formatted string exactly;
   - every number token in every display string and VO line is a computed value;
   - "≈" sits on every rounded result and on no exact one;
   - timing: header + a number on screen at t = 0, VO lines fit 2.6 words/s and do not
     overlap, each pointer lands when its VO line starts, the verdict lands when the VO
     says it, duration is inside the 6-16 s lane, hold = duration - last row/pick;
   - contract shape (FORMATS.md section 2): 2-4 columns, 5-14 rows, captions on, id = stem.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/02-find-your-row.py
"""
import json
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve()
REPO = HERE.parents[3]
SPEC_DIR = REPO / "studio" / "specs"
WPS = 2.6  # voice-over reading speed, words per second

# --------------------------------------------------------------------------------------
# Sourced real-world inputs (publisher, date and URL for each in 02-find-your-row.md)
# --------------------------------------------------------------------------------------
FED_MIN_WAGE = 7.25          # USD/hr. US DOL Wage and Hour Division (in force since 2009-07-24);
                             # BLS CPS annual table 44: "$7.25 per hour in 2025".
KPG_MYA = 66.0               # million years ago: Chicxulub impact / non-avian dinosaur extinction.
                             # Renne et al., Science 2013: 66.038 / 66.043 Ma. AMNH: "66 million years ago".
SAPIENS_YEARS = 300_000      # years Homo sapiens has existed: Hublin et al., Nature 2017 (Jebel Irhoud,
                             # ~315,000 yrs); "at least 300,000 years ago".
BLS_MEDIAN_WEEKLY = 1251     # USD, median usual weekly earnings, full-time wage & salary workers,
                             # Q2 2026, not seasonally adjusted. BLS release 2026-07-21.
BLS_SOURCE_TOKENS = {2.0, 2026.0}  # "Q2 2026" in the 02c footer: source metadata, not maths

# Conventions (assumptions printed in each footer)
HOURS_PER_WEEK, WEEKS_PER_YEAR = 40, 52
HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR          # 2,080
MINUTES_PER_HOUR = 60

# --------------------------------------------------------------------------------------
# Formatting helpers
# --------------------------------------------------------------------------------------
def round_half_up(x, step):
    return int(x / step + 0.5) * step

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
ONES = "zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen eighteen nineteen".split()

def int_word_count(n):
    """Words to read a non-negative integer aloud (hyphenated tens count as one word)."""
    if n == 0:
        return 1
    words = 0
    for scale in (10**12, 10**9, 10**6, 10**3, 1):
        g = (n // scale) % 1000
        if g == 0:
            continue
        h, r = divmod(g, 100)
        if h:
            words += 2               # "two hundred"
        if r:
            words += 1               # "forty", "twenty-five", "eleven"
        if scale > 1:
            words += 1               # "thousand", "million", ...
    return words

def spoken_words(text):
    """Estimate how many words the owner will say for one VO line."""
    s = strip_markup(text)
    s = s.replace("≈", " about ")
    s = s.replace("/hr", " an hour")
    s = s.replace("000s", " zeros ")
    count = 0
    # money and numbers first
    def money_repl(m):
        nonlocal count
        dollars, cents_part, scale = m.group(1), m.group(2), m.group(3)
        d = int(dollars.replace(",", ""))
        if cents_part is not None:
            c = int(cents_part)
            if d == 0:
                count += int_word_count(c) + 1          # "fifty-two cents"
            else:
                count += int_word_count(d) + int_word_count(c)  # "seven twenty-five"
        else:
            count += int_word_count(d) + (1 if scale else 0) + 1  # "+ dollars"
        return " "
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d\d))?(\s(?:million|billion|trillion))?", money_repl, s)
    def num_repl(m):
        nonlocal count
        whole, frac, scale = m.group(1), m.group(2), m.group(3)
        count += int_word_count(int(whole.replace(",", "")))
        if frac:
            count += 1 + len(frac)                       # "point three"
        if scale:
            count += 1
        return " "
    s = re.sub(r"(\d[\d,]*)(?:\.(\d+))?(\s(?:million|billion|trillion))?", num_repl, s)
    count += len([w for w in re.split(r"[\s,.:?!;—–-]+", s) if re.search(r"[A-Za-z]", w)])
    return count

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

    def cost(age):                            # FV of MONTHLY at RATE/12, end of each month
        r, n = RATE / 12, (END_AGE - age) * 12
        return MONTHLY * ((1 + r) ** n - 1) / r

    def round_cost(x):                        # nearest $1,000; nearest $100 below $10,000
        return round_half_up(x, 1000) if x >= 10_000 else round_half_up(x, 100)

    rows, nums = [], []
    for a in AGES:
        c = cost(a)
        rc = round_cost(c)
        rows.append([str(a), usd(spend(a)), approx(rc, c) + usd(rc)])
        nums.append((f"row {a}", f"{usd(ANNUAL)} × {END_AGE - a} yrs = {usd(spend(a))};  FV({usd(MONTHLY, 2)}/mo, 7%/12, {(END_AGE - a) * 12} mo) = {usd(c, 2)} → {approx(rc, c)}{usd(rc)}"))

    i25, i35 = AGES.index(25), AGES.index(35)
    ratio = cost(25) / spend(25)
    ratio_disp = round(ratio, 1)
    gap = 35 - 25
    # verdict check: every 10-year pair in the table drops below half
    pairs = [(a, a + gap) for a in AGES if a + gap in AGES]
    assert all(cost(b) < cost(a) / 2 for a, b in pairs), "verdict 'less than half' fails a pair"
    assert cost(35) < cost(25) / 2
    # and for every whole age 18-55, not only the rows shown
    assert all(cost(a + gap) < cost(a) / 2 for a in range(18, END_AGE - gap + 1))

    vo = [
        {"t": 0.0, "d": 3.6, "text": f"What **{usd(DAILY)} a day** costs you, by age."},
        {"t": 4.0, "d": 3.5, "text": f"Start at 25: **{rows[i25][2]}**."},
        {"t": 7.7, "d": 2.5, "text": "Start at 35? **Less than half.**"},
    ]
    picks = [
        {"t": 4.0, "row": i25, "label": f"≈ {ratio_disp:.1f}× what you'd spend"},
        {"t": 7.7, "row": i35, "label": f"{gap} years later"},
    ]
    verdict_t = round(mention_time(vo[2], "Less than half"), 1)
    rows_t, row_every = 0.0, 0.5
    duration = 12.5
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02a-live-sheet-3-a-day-by-age",
        "look": "live-sheet",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": f"What **{usd(DAILY)} a day**\ncosts you by age",
        "footer": f"Invested monthly at {round(RATE * 100)}% a year until {END_AGE} · no tax, fees or inflation",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"Wait {gap} years: **less than half**."},
        "data": {
            "columns": [
                {"label": "Your age"},
                {"label": f"You'd spend\nby {END_AGE}"},
                {"label": f"It costs you\nby {END_AGE}", "emph": True},
            ],
            "rows": rows,
            "formula": f"= {usd(DAILY)} × {DAYS} ÷ 12 = {usd(MONTHLY, 2)} a month, at {round(RATE * 100)}%",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
    }
    allowed = {float(DAILY), float(DAYS), 12.0, MONTHLY, RATE * 100, float(END_AGE), float(gap), ratio_disp}
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    nums += [
        ("$3 a day", f"{usd(DAILY)} × {DAYS} = {usd(ANNUAL)} a year; ÷ 12 = {usd(MONTHLY, 2)} a month"),
        ("pick 25", f"{usd(cost(25), 2)} ÷ {usd(spend(25))} = {ratio:.3f} → ≈ {ratio_disp:.1f}×"),
        ("verdict", "10-yr pairs: " + ", ".join(f"{a}→{b}: {cost(b) / cost(a):.3f}" for a, b in pairs) + " (all < 0.5)"),
        ("pinned 10%", f"at 10%: age 25 → {usd(round_half_up(MONTHLY * ((1 + .1/12) ** 480 - 1) / (.1/12), 1000))}, age 18 → {usd(round_half_up(MONTHLY * ((1 + .1/12) ** 564 - 1) / (.1/12), 10000))}"),
        ("rule of 72", f"72 ÷ 7 = {72 / 7:.1f} yrs to double"),
    ]
    return exp, allowed, nums

# --------------------------------------------------------------------------------------
# 02b  Scoreboard  "$1 trillion at your hourly wage"
# --------------------------------------------------------------------------------------
def build_02b():
    TARGET = 1_000_000_000_000
    WAGES = [FED_MIN_WAGE, 10, 15, 20, 25, 30, 40, 50, 75, 100, 250, 500, 1000]

    def years(w):
        return TARGET / (w * HOURS_PER_YEAR)

    def fmt_years(y):
        if y >= 1_000_000:
            m = round(y / 1_000_000, 1)
            return f"≈ {m:.1f} million", m * 1_000_000
        r = round_half_up(y, 1000)
        return f"{approx(r, y)}{r:,}", r

    def fmt_wage(w):
        return (usd(w, 2) if w != int(w) else usd(w)) + "/hr"

    rows, nums = [], []
    for w in WAGES:
        y = years(w)
        disp, _ = fmt_years(y)
        rows.append([fmt_wage(w), disp])
        nums.append((f"row {fmt_wage(w)}", f"$1,000,000,000,000 ÷ ({usd(w, 2)} × {HOURS_PER_YEAR:,}) = {y:,.0f} yrs → {disp}"))

    y_min, y_top = years(FED_MIN_WAGE), years(WAGES[-1])
    assert WAGES[0] == FED_MIN_WAGE
    assert abs(y_min / 1e6 - KPG_MYA) / KPG_MYA < 0.01, "minimum-wage row is not ≈ 66 million"
    assert y_top > SAPIENS_YEARS, "$1,000/hr row must exceed the age of our species"
    vo = [
        {"t": 0.0, "d": 3.6, "text": f"Federal minimum wage: **{rows[0][1]} years**."},
        {"t": 3.8, "d": 2.9, "text": "You'd start when the dinosaurs died out."},
        {"t": 7.0, "d": 4.8, "text": f"Even **{usd(WAGES[-1])} an hour**? Longer than our species has existed."},
    ]
    picks = [
        {"t": 3.8, "row": 0, "label": "≈ when the dinosaurs died out"},
        {"t": 7.0, "row": len(WAGES) - 1, "label": f"Our species: ≈ {SAPIENS_YEARS:,} years"},
    ]
    verdict_t = round(mention_time(vo[2], "Longer than"), 1)
    rows_t, row_every = 0.0, 0.35
    duration = 14.0
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02b-scoreboard-trillion-at-your-wage",
        "look": "scoreboard",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": "$1 TRILLION\nAT YOUR **HOURLY WAGE**",
        "footer": f"{HOURS_PER_YEAR:,} hrs a year ({HOURS_PER_WEEK} × {WEEKS_PER_YEAR}) · every cent kept · no raises or interest",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"Even **{usd(WAGES[-1])}/hr**: longer than our species has existed."},
        "data": {
            "columns": [
                {"label": "Your wage"},
                {"label": "Years to earn\n$1 trillion", "emph": True},
            ],
            "rows": rows,
            "formula": f"= {usd(TARGET)} ÷ (wage × {HOURS_PER_YEAR:,})",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
    }
    allowed = {1.0, float(TARGET), float(HOURS_PER_YEAR), float(HOURS_PER_WEEK), float(WEEKS_PER_YEAR), float(SAPIENS_YEARS)}
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    nums += [
        ("2,080", f"{HOURS_PER_WEEK} × {WEEKS_PER_YEAR} = {HOURS_PER_YEAR:,} hrs a year"),
        ("dinosaurs", f"{y_min / 1e6:.2f} million yrs vs K–Pg {KPG_MYA} Ma (Renne 2013: 66.04) → {abs(y_min / 1e6 - KPG_MYA) / KPG_MYA:.1%} apart"),
        ("our species", f"{y_top:,.0f} yrs > {SAPIENS_YEARS:,} yrs (×{y_top / SAPIENS_YEARS:.1f})"),
        ("pinned 24/7", f"$1T ÷ ($7.25 × 8,766 hrs) = {TARGET / (FED_MIN_WAGE * 8766) / 1e6:.1f} million yrs"),
    ]
    return exp, allowed, nums

# --------------------------------------------------------------------------------------
# 02c  Clean Sheet  "Your salary is really this per hour"
# --------------------------------------------------------------------------------------
def build_02c():
    SALARIES = [30_000, 35_000, 40_000, 45_000, 50_000, 55_000, 60_000, 65_000,
                70_000, 80_000, 90_000, 100_000, 150_000, 200_000]

    def per_hour(s):
        return s / HOURS_PER_YEAR

    def per_min(s):
        return per_hour(s) / MINUTES_PER_HOUR

    rows, nums = [], []
    for s in SALARIES:
        h, m = per_hour(s), per_min(s)
        hr, mr = round(h + 1e-12, 2), round(m + 1e-12, 2)
        rows.append([usd(s), approx(hr, h) + usd(hr, 2), approx(mr, m) + usd(mr, 2)])
        nums.append((f"row {usd(s)}", f"{usd(s)} ÷ {HOURS_PER_YEAR:,} = {h:.4f} → {rows[-1][1]};  ÷ 60 = {m:.4f} → {rows[-1][2]}"))

    median_annual = BLS_MEDIAN_WEEKLY * WEEKS_PER_YEAR          # 65,052
    median_row_salary = round_half_up(median_annual, 1000)        # 65,000
    assert median_row_salary in SALARIES
    assert abs(median_annual - median_row_salary) / median_annual < 0.01
    im = SALARIES.index(median_row_salary)
    # shortcut: halve it, drop the 000s = salary / 2,000 → runs 2,080/2,000 - 1 = 4% high on every row
    shortcut_err = {s: (s / 2 / 1000) / per_hour(s) - 1 for s in SALARIES}
    assert all(abs(e - 0.04) < 1e-9 for e in shortcut_err.values())

    vo = [
        {"t": 0.0, "d": 2.9, "text": "Your salary, per hour and per minute."},
        {"t": 3.2, "d": 3.9, "text": f"Typical full-timer, **{rows[im][0]}**: {rows[im][1]} an hour."},
        {"t": 7.3, "d": 2.1, "text": f"**{rows[im][2]}** a minute."},
        {"t": 9.6, "d": 2.5, "text": "Shortcut: **halve it, drop the 000s.**"},
    ]
    picks = [{"t": 3.2, "row": im, "label": "≈ US median full-time pay"}]
    verdict_t = vo[3]["t"]
    rows_t, row_every = 0.0, 0.3
    duration = 14.0
    last_beat = max(rows_t + row_every * (len(rows) - 1), picks[-1]["t"])
    exp = {
        "id": "02c-clean-sheet-salary-per-hour",
        "look": "clean-sheet",
        "format": "find-your-row",
        "fps": 30,
        "duration": duration,
        "header": "What your salary\nreally pays **per hour**",
        "footer": f"{HOURS_PER_YEAR:,} hrs a year ({HOURS_PER_WEEK} × {WEEKS_PER_YEAR}) · before tax · median: BLS, Q2 2026",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": "Shortcut: **halve it, drop the 000s.**"},
        "data": {
            "columns": [
                {"label": "Salary"},
                {"label": f"Per hour\n÷ {HOURS_PER_YEAR:,}", "emph": True},
                {"label": f"Per minute\n÷ {MINUTES_PER_HOUR}"},
            ],
            "rows": rows,
            "formula": f"= salary ÷ {HOURS_PER_YEAR:,}, then ÷ {MINUTES_PER_HOUR}",
            "rowsT": rows_t,
            "rowEvery": row_every,
            "pick": picks,
            "hold": round(duration - last_beat, 2),
        },
    }
    allowed = {float(HOURS_PER_YEAR), float(HOURS_PER_WEEK), float(WEEKS_PER_YEAR), float(MINUTES_PER_HOUR), 0.0} | BLS_SOURCE_TOKENS
    for r in rows:
        for cell in r:
            allowed.update(number_tokens(cell))
    nums += [
        ("median", f"BLS ${BLS_MEDIAN_WEEKLY:,}/wk × {WEEKS_PER_YEAR} = {usd(median_annual)} → ≈ {usd(median_row_salary)} (row {im}); ÷ 40 hrs = ${BLS_MEDIAN_WEEKLY / 40:.3f}/hr"),
        ("shortcut", f"$65,000 → halve → 32,500 → drop 000 → $32.50 vs {rows[im][1]}: +{shortcut_err[65_000]:.0%} (same on every row: 2,080 ÷ 2,000)"),
        ("pinned PTO", f"3 weeks off = {3 * HOURS_PER_WEEK} hrs → {HOURS_PER_YEAR - 3 * HOURS_PER_WEEK:,} hrs worked; {HOURS_PER_YEAR:,} ÷ {HOURS_PER_YEAR - 3 * HOURS_PER_WEEK:,} = {HOURS_PER_YEAR / (HOURS_PER_YEAR - 3 * HOURS_PER_WEEK):.4f} → ≈ 6% more per hour worked; $65,000 ÷ 1,960 = {65_000 / 1960:.2f}"),
        ("pinned $100K", f"$100,000 ÷ 2,080 = {100_000 / 2080:.2f}/hr; ÷ 60 = {100_000 / 2080 / 60:.4f}/min"),
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

def check_spec(exp, allowed, path):
    sid = exp["id"]
    if not path.exists():
        check(sid, "file", str(path.name), "MISSING")
        return
    spec = json.loads(path.read_text())

    # --- exact display strings and fields
    check(sid, "id = file stem", path.stem, spec.get("id"))
    for k in ("id", "look", "format", "fps", "duration", "header", "footer", "captions"):
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

    # --- every number token in every display string is a computed value
    strings = [spec.get("header", ""), spec.get("footer", ""), spec.get("verdict", {}).get("text", ""),
               sd.get("formula", "")]
    strings += [c["label"] for c in sd.get("columns", [])]
    strings += [p["label"] for p in sd.get("pick", [])]
    strings += [cell for r in srows for cell in r]
    strings += [v["text"] for v in sv]
    stray = []
    for s in strings:
        for n in number_tokens(s):
            if not any(abs(n - a) < 1e-9 for a in allowed) and not (n == 0 and "000s" in s):
                stray.append((n, s))
    check(sid, "number tokens all computed", [], [f"{n} in {show(s, 40)}" for n, s in stray])

    # --- "≈" on rounded results only (rows rebuilt above with approx(); here: every ≈ is followed by a number or 'when'/'US')
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
          sd.get("rowsT", 1) == 0.0 and bool(number_tokens(srows[0][0] if srows else "")))

    # --- timing
    dur = spec.get("duration", 0)
    check(sid, "duration in 6-16 s lane", True, 6.0 <= dur <= 16.0)
    ok_fit, ok_gap = True, True
    for i, v in enumerate(sv):
        need = spoken_words(v["text"]) / WPS
        if v["d"] + 1e-9 < need:
            ok_fit = False
            TABLE.append((sid, f"vo[{i}] fit", f">= {need:.2f}s", f"{v['d']}s", False))
            FAILS.append((sid, f"vo[{i}] fit", need, v["d"]))
        if i + 1 < len(sv) and v["t"] + v["d"] > sv[i + 1]["t"] + 1e-9:
            ok_gap = False
    check(sid, "vo d >= words / 2.6", True, ok_fit)
    check(sid, "vo lines do not overlap", True, ok_gap)
    last_vo_end = max(v["t"] + v["d"] for v in sv) if sv else 0
    check(sid, "VO ends >= 1.5 s before the end", True, last_vo_end + 1.5 <= dur + 1e-9)
    starts = {v["t"] for v in sv}
    check(sid, "each pick lands as its VO line starts", True, all(p["t"] in starts for p in sd.get("pick", [])))
    last_row_t = sd.get("rowsT", 0) + sd.get("rowEvery", 0) * (len(srows) - 1)
    last_beat = max([last_row_t] + [p["t"] for p in sd.get("pick", [])])
    check(sid, "hold = duration - last row/pick", round(dur - last_beat, 2), sd.get("hold"))
    vt = spec.get("verdict", {}).get("t", -1)
    check(sid, "verdict after last pick, before end", True, last_beat <= vt <= dur)

    # word-count / time report
    for i, v in enumerate(sv):
        TABLE.append((sid, f"vo[{i}] timing", f"{spoken_words(v['text'])} words → {spoken_words(v['text']) / WPS:.2f}s",
                      f"t {v['t']} d {v['d']}", True))


def main():
    builders = [build_02a, build_02b, build_02c]
    calc_lines = []
    for b in builders:
        exp, allowed, nums = b()
        calc_lines.append((exp["id"], nums))
        check_spec(exp, allowed, SPEC_DIR / f"{exp['id']}.json")

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
    main()
