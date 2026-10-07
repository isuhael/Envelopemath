#!/usr/bin/env python3
"""Math + timing check for format 1, "dead-simple-list" (teasers 01a, 01b, 01c).

1. Recomputes every on-screen number from its inputs (constants below, sources in
   teasers/v2/01-dead-simple-list.md).
2. Loads the three spec JSONs and asserts that every display string that carries a
   digit equals the computed, formatted value (a digit-bearing string the script does
   not know about is an error too), and that every number spoken in the vo text equals
   the computed value, line by line.
3. Checks the timing contract: VO read at ~2.6 words/s, no overlapping lines, each
   beat's t / resultT at the moment the VO says it, header + a number at t = 0,
   first payoff by 3 s, duration inside the 26-44 s lane.
4. Sensitivity checks: the x0.85 rule vs the exact 2026 federal + FICA calculation,
   the commute result across 25-29 minutes, and the 26/27-payday calendar claims.

Prints a table and exits non-zero on any mismatch.
Run:  python3 teasers/v2/checks/01-dead-simple-list.py
"""
import datetime
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
SPECS = ROOT / "studio" / "specs"
FILES = {
    "01a": SPECS / "01a-clean-sheet-paid-biweekly.json",
    "01b": SPECS / "01b-live-sheet-20-an-hour.json",
    "01c": SPECS / "01c-becker-rig-60k-a-year.json",
}
WPS = 2.6            # guide VO read rate, words per second
ANCHOR_TOL = 0.5     # s: a beat may sit this far from the estimated spoken moment
LANE = (26.0, 44.0)  # benchmark duration lane for worked lists

rows = []            # (teaser, check, spec value, expected, ok)
errors = 0


def record(teaser, check, got, want, ok):
    global errors
    rows.append((teaser, check, str(got), str(want), ok))
    if not ok:
        errors += 1


def eq(teaser, check, got, want):
    record(teaser, check, got, want, got == want)


def close(teaser, check, got, want, tol=1e-9):
    record(teaser, check, got, want, abs(got - want) <= tol)


# ---------------------------------------------------------------- formatting
def money(x, dp=0):
    return f"${x:,.{dp}f}"


def approx(s):
    return f"≈ {s}"


def num(n):
    return f"{n:,}"


def round_to(x, step):
    return round(x / step) * step


def ordinal(n):
    n = int(n)
    suf = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


# ------------------------------------------------- series constants (all three)
HRS_WEEK = 40
WEEKS = 52
HRS_YEAR = HRS_WEEK * WEEKS          # 2,080: one constant for the whole series
MONTHS = 12
assert HRS_YEAR == 2080

# ------------------------------------------------- 01a inputs and maths
A_PAY = 2_500                        # example paycheck (≈ BLS median full-time week $1,251 × 2)
A_PAYDAYS = 26                       # every 14 days: 364 / 14 = 26
A_SEMI = 2 * MONTHS                  # the wrong answer: twice a month = 24
assert 364 // 14 == A_PAYDAYS
A_YEAR = A_PAY * A_PAYDAYS                       # $65,000
A_WRONG = A_PAY * A_SEMI                         # $60,000
A_MONTH = A_PAY * 2                              # $5,000, a 2-check month
A_EXTRA = A_PAYDAYS - A_SEMI                     # 2 extra checks
A_NORMAL_MONTHS = MONTHS - A_EXTRA               # 10 months with 2 paydays
A_LEFT = A_YEAR - A_MONTH * MONTHS               # $5,000 left after 12 normal months
A_MONTHS_OF_PAY = A_YEAR // A_MONTH              # 13
assert A_YEAR % A_MONTH == 0 and A_LEFT == A_MONTH == A_PAY * A_EXTRA
A_27 = A_PAY * (A_PAYDAYS + 1)                   # $67,500 in a 27-payday year (pinned comment)

# ------------------------------------------------- 01b inputs and maths
B_WAGE = 20
B_YEAR = B_WAGE * HRS_YEAR                       # $41,600
B_WEEK = B_WAGE * HRS_WEEK                       # $800
B_WRONG_MONTH = B_WEEK * 4                       # $3,200, the "4 weeks" guess
B_MONTH = B_YEAR / MONTHS                        # 3,466.67
B_MONTH_D = round(B_MONTH)                       # shown as ≈ $3,467
B_KEEP = 0.85                                    # rough keep rule shown on screen
B_KEPT_RULE = B_MONTH_D * B_KEEP                 # 2,946.95 (what the formula on screen gives)
B_KEPT_D = round_to(B_KEPT_RULE, 50)             # shown as ≈ $2,950

# exact 2026 federal income tax + FICA, single filer (IRS Rev. Proc. 2025-32; SSA 2026 fact sheet)
TAX_YEAR = 2026
STD_DED = 16_100
BRACKETS = [(12_400, 0.10), (50_400, 0.12), (105_700, 0.22)]   # top of bracket, rate
SS_RATE, MED_RATE, SS_WAGE_BASE = 0.062, 0.0145, 184_500


def fed_tax(gross):
    taxable = max(0, gross - STD_DED)
    tax, low = 0.0, 0
    for top, rate in BRACKETS:
        if taxable > low:
            tax += (min(taxable, top) - low) * rate
        low = top
    assert taxable <= BRACKETS[-1][0], "income above the brackets listed here"
    return tax


B_FED = fed_tax(B_YEAR)                                           # 2,812.00
B_FICA = min(B_YEAR, SS_WAGE_BASE) * SS_RATE + B_YEAR * MED_RATE  # 3,182.40
B_NET = B_YEAR - B_FED - B_FICA                                   # 35,605.60
B_KEEP_EXACT = B_NET / B_YEAR                                     # 0.8559
B_KEPT_EXACT = B_NET / MONTHS                                     # 2,967.13

# ------------------------------------------------- 01c inputs and maths
C_SALARY = 60_000
C_HOUR = C_SALARY / HRS_YEAR                     # 28.846
C_HOUR_D = round(C_HOUR, 2)                      # ≈ $28.85
C_DAY = C_HOUR_D * 8                             # formula on screen: $28.85 × 8 = 230.80
C_DAY_D = round(C_DAY)                           # ≈ $231
C_MIN = C_HOUR_D / 60                            # formula on screen: $28.85 ÷ 60
C_MIN_D = round(C_MIN, 2)                        # ≈ $0.48
C_COMMUTE = 27                                   # min each way, ≈ US average (Census ACS)
C_COMMUTE_DAY = 2 * C_COMMUTE                    # 54 min there and back
C_DAY_HRS = 8 + C_COMMUTE_DAY / 60               # 8.9 h
C_REAL = C_DAY_D / C_DAY_HRS                     # formula on screen: $231 ÷ 8.9 = 25.96
C_REAL_D = round(C_REAL)                         # ≈ $26
C_GAG_SEC = 30
C_GAG = C_MIN_D * C_GAG_SEC / 60                 # 30 s of work = $0.24
C_GAG_CENTS = round(C_GAG * 100)                 # 24¢

# ---------------------------------------------------------- expected strings
EXPECT = {
    "01a": {
        "header": f"3 DEAD SIMPLE NUMBERS\nIF YOU'RE PAID **EVERY 2 WEEKS**",
        "footer": f"ASSUMES {A_PAYDAYS} paydays a year (some years have {A_PAYDAYS + 1}) · pay before tax",
        "verdict.text": f"Every 2 weeks = **{A_MONTHS_OF_PAY} months** of pay a year",
        "data.input.value": money(A_PAY),
        "data.input.note": "every 2 weeks",
        "data.items[0].formula": f"{money(A_PAY)} × {A_PAYDAYS}",
        "data.items[0].result": money(A_YEAR),
        "data.items[0].note": f"not × {A_SEMI} = {money(A_WRONG)}",
        "data.items[1].label": "A normal month (2 checks)",
        "data.items[1].formula": f"{money(A_PAY)} × 2",
        "data.items[1].result": money(A_MONTH),
        "data.items[1].note": f"{A_NORMAL_MONTHS} months a year",
        "data.items[2].label": f"Your {A_EXTRA} 'bonus' checks",
        "data.items[2].formula": f"{money(A_YEAR)} − {money(A_MONTH)} × {MONTHS}",
        "data.items[2].result": money(A_LEFT),
        "data.items[2].note": f"a {ordinal(A_MONTHS_OF_PAY)} month of pay",
        "lookOpts.wrongGuess.formula": f"{money(A_PAY)} × {A_SEMI}",
        "lookOpts.wrongGuess.result": money(A_WRONG),
    },
    "01b": {
        "header": f"4 DEAD SIMPLE NUMBERS\nIF YOU MAKE **{money(B_WAGE)}/HR**",
        "footer": (f"ASSUMES {HRS_WEEK} hrs × {WEEKS} wks · × {B_KEEP:.2f} ≈ left after {TAX_YEAR} "
                   f"federal tax + FICA, single, before state tax"),
        "verdict.text": f"**≈ {money(B_KEPT_D)}** a month lands. Not __{money(B_WRONG_MONTH)}__",
        "data.input.value": f"{money(B_WAGE)}/hr",
        "data.input.note": f"{HRS_WEEK} hrs a week",
        "data.items[0].formula": f"{money(B_WAGE)} × {num(HRS_YEAR)} hrs",
        "data.items[0].result": money(B_YEAR),
        "data.items[0].note": f"{num(HRS_YEAR)} hrs = {HRS_WEEK} × {WEEKS}",
        "data.items[1].formula": f"{money(B_WAGE)} × {HRS_WEEK} hrs",
        "data.items[1].result": money(B_WEEK),
        "data.items[2].formula": f"{money(B_YEAR)} ÷ {MONTHS}",
        "data.items[2].result": approx(money(B_MONTH_D)),
        "data.items[2].note": f"not {money(B_WEEK)} × 4 = {money(B_WRONG_MONTH)}",
        "data.items[3].formula": f"{money(B_MONTH_D)} × {B_KEEP:.2f}",
        "data.items[3].result": approx(money(B_KEPT_D)),
        "lookOpts.wrongGuess.formula": f"{money(B_WEEK)} × 4",
        "lookOpts.wrongGuess.result": money(B_WRONG_MONTH),
    },
    "01c": {
        "header": f"4 DEAD SIMPLE NUMBERS\nIF YOU MAKE **{money(C_SALARY)}** A YEAR",
        "footer": f"ASSUMES {HRS_WEEK} hrs × {WEEKS} wks · commute ≈ {C_COMMUTE} min each way (US avg)",
        "verdict.text": f"Count the commute: **≈ {money(C_REAL_D)}** an hour, not __{money(C_HOUR_D, 2)}__",
        "data.input.value": money(C_SALARY),
        "data.items[0].formula": f"{money(C_SALARY)} ÷ {num(HRS_YEAR)}",
        "data.items[0].result": approx(money(C_HOUR_D, 2)),
        "data.items[0].note": f"{num(HRS_YEAR)} work hrs a year",
        "data.items[1].formula": f"{money(C_HOUR_D, 2)} × 8",
        "data.items[1].result": approx(money(C_DAY_D)),
        "data.items[1].note": "8-hr day",
        "data.items[2].formula": f"{money(C_HOUR_D, 2)} ÷ 60",
        "data.items[2].result": approx(money(C_MIN_D, 2)),
        "data.items[3].formula": f"{money(C_DAY_D)} ÷ {C_DAY_HRS:g} hrs",
        "data.items[3].result": approx(money(C_REAL_D)),
        "data.items[3].note": f"8 hrs + {C_COMMUTE_DAY} min commute",
        "lookOpts.actions[0].tool": f"÷ {num(HRS_YEAR)}",
        "lookOpts.actions[0].becomes": f"one coin from a pile of {num(HRS_YEAR)}",
        "lookOpts.actions[1].tool": "× 8",
        "lookOpts.actions[1].becomes": "a stack of 8 coins",
        "lookOpts.actions[2].tool": "÷ 60",
        "lookOpts.actions[3].tool": f"+ {C_COMMUTE_DAY} min",
        "lookOpts.gag.text": f"{C_GAG_SEC} sec ≈ {C_GAG_CENTS}¢",
    },
}

# results that must carry "≈" (rounded, or resting on a rough constant) vs exact ones
APPROX_RESULTS = {
    "01a": [False, False, False],
    "01b": [False, False, True, True],
    "01c": [True, True, True, True],
}

# numbers spoken in each VO line, in order (cents are expressed in dollars)
VO_NUMBERS = {
    "01a": [
        [A_PAYDAYS, A_YEAR],
        [A_SEMI, A_WRONG],
        [2, A_PAYDAYS],
        [2, A_MONTH],
        [A_NORMAL_MONTHS],
        [MONTHS],
        [A_LEFT],
        [A_EXTRA, A_EXTRA, 3],
        [A_MONTHS_OF_PAY],
    ],
    "01b": [
        [HRS_YEAR, B_YEAR],
        [HRS_WEEK, B_WEEK],
        [4, B_WRONG_MONTH],
        [MONTHS],
        [B_MONTH_D],
        [B_KEEP],
        [B_KEPT_D],
        [B_WRONG_MONTH],
    ],
    "01c": [
        [HRS_YEAR, C_HOUR_D],
        [8, C_DAY_D],
        [60, C_MIN_D],
        [C_COMMUTE],
        [8, C_DAY_HRS],
        [C_DAY_D, C_REAL_D],
        [C_HOUR_D],
        [C_GAG_SEC, C_GAG_CENTS / 100],
    ],
}

# where each beat should sit: (vo line index, token or None for the line start)
ANCHORS = {
    "01a": {"items": [((0, None), (0, money(A_YEAR))),
                      ((3, None), (3, money(A_MONTH))),
                      ((5, None), (6, money(A_LEFT)))],
            "verdict": (8, None)},
    "01b": {"items": [((0, None), (0, money(B_YEAR))),
                      ((1, None), (1, money(B_WEEK))),
                      ((3, "A"), (4, money(B_MONTH_D))),
                      ((5, f"{round(B_KEEP * 100)}"), (6, money(B_KEPT_D)))],
            "verdict": (7, None)},
    "01c": {"items": [((0, None), (0, money(C_HOUR_D, 2))),
                      ((1, None), (1, money(C_DAY_D))),
                      ((2, None), (2, f"{round(C_MIN_D * 100)}")),
                      ((3, None), (5, money(C_REAL_D)))],
            "verdict": (6, None)},
}

# ------------------------------------------------------------ VO helpers
NUM_TOKEN = re.compile(r"(\$?)(\d[\d,]*)(?:\.(\d+))?(st|nd|rd|th)?")


def vo_numbers(text):
    """Numbers spoken in a VO line; 'N cents' becomes N/100 dollars."""
    out = []
    for m in re.finditer(r"(\$?\d[\d,]*(?:\.\d+)?)(?:st|nd|rd|th)?(\s+cents)?", text):
        v = float(m.group(1).lstrip("$").replace(",", ""))
        out.append(v / 100 if m.group(2) else v)
    return out


def words_int(n):
    if n < 100:
        return 1                      # "twenty-six"
    if n < 10_000:
        return 2                      # "eight hundred", "two thirty-one", "twenty eighty", "thirty-two hundred"
    if n < 1_000_000:
        k, r = divmod(n, 1000)
        return words_int(k) + 1 + (0 if r == 0 else words_int(r))   # "forty-one thousand six hundred"
    raise ValueError(n)


def token_words(tok):
    core = tok.strip(".,:;?!'\"()")
    if not core:
        return 0
    m = NUM_TOKEN.fullmatch(core)
    if not m:
        return 1
    dollar, ip, dec, ordn = m.groups()
    n = int(ip.replace(",", ""))
    if ordn:
        return 1                                   # "thirteenth"
    if dec is None:
        return words_int(n)
    if dollar:
        return 2 if n == 0 else words_int(n) + 1   # "$28.85" twenty-eight eighty-five; "$0.48" forty-eight cents
    return words_int(n) + 1 + len(dec)             # "8.9" eight point nine


def spoken_words(text):
    return sum(token_words(t) for t in text.split())


def anchor_time(vo, line, token):
    t0 = vo[line]["t"]
    if token is None:
        return t0
    before = 0
    for tok in vo[line]["text"].split():
        if tok.strip(".,:;?!'\"()") == token:
            return t0 + before / WPS
        before += token_words(tok)
    return None  # token not spoken in that line: reported as a failure by the caller


# ------------------------------------------------------------ spec walking
def walk(node, path=""):
    if isinstance(node, dict):
        for k, v in node.items():
            yield from walk(v, f"{path}.{k}" if path else k)
    elif isinstance(node, list):
        for i, v in enumerate(node):
            yield from walk(v, f"{path}[{i}]")
    else:
        yield path, node


SKIP_PATHS = re.compile(r"^(id|look|format|vo\[\d+\]\.text|sfx\[\d+\]\.kind|.*\.tone|.*\.verb|lookOpts\.stage|lookOpts\.inputProp)$")


def check_spec(key, spec):
    exp = EXPECT[key]
    seen = set()
    # 1. every digit-bearing display string is known and equals the computed value
    for path, val in walk(spec):
        if not isinstance(val, str) or SKIP_PATHS.match(path):
            continue
        if path in exp:
            eq(key, path, val, exp[path])
            seen.add(path)
        elif re.search(r"\d", val):
            record(key, f"unchecked display string {path}", val, "(not in EXPECT)", False)
    for path in exp:
        if path not in seen:
            record(key, f"missing {path}", "(absent)", exp[path], False)

    d = spec["data"]
    items = d["items"]
    n_header = int(spec["header"].split()[0])
    eq(key, "header count = number of items", len(items), n_header)
    record(key, "3-6 items", len(items), "3..6", 3 <= len(items) <= 6)
    words = len(spec["header"].replace("**", "").replace("__", "").split())
    record(key, "R8 header ≤ 15 words", words, "≤ 15", words <= 15)
    dollars_in_header = len(re.findall(r"\$\d", spec["header"]))
    record(key, "R2 ≤ 1 $ figure in header", dollars_in_header, "≤ 1", dollars_in_header <= 1)
    has_num_t0 = bool(re.search(r"\$\d", d["input"]["value"])) or dollars_in_header == 1
    record(key, "R1 header + $ number at t=0", has_num_t0, True, has_num_t0 and items[0]["t"] == 0.0)
    eq(key, "captions on", spec.get("captions"), True)
    eq(key, "format", spec["format"], "dead-simple-list")
    eq(key, "id = file stem", spec["id"], FILES[key].stem)

    # 2. "≈" on every rounded / rough result, never on exact ones
    for i, it in enumerate(items):
        want = APPROX_RESULTS[key][i]
        record(key, f"items[{i}] ≈ marker", it["result"][:1] == "≈", want, (it["result"][:1] == "≈") == want)

    # 3. VO numbers, line by line
    vo = spec["vo"]
    eq(key, "VO line count", len(vo), len(VO_NUMBERS[key]))
    for i, (line, want) in enumerate(zip(vo, VO_NUMBERS[key])):
        got = vo_numbers(line["text"])
        ok = len(got) == len(want) and all(abs(g - w) < 1e-9 for g, w in zip(got, want))
        record(key, f"vo[{i}] numbers", got, [float(w) for w in want], ok)

    # 4. VO pacing and overlaps
    for i, line in enumerate(vo):
        need = spoken_words(line["text"]) / WPS
        record(key, f"vo[{i}] d fits {spoken_words(line['text'])} words @2.6/s",
               line["d"], f"{need:.2f}..{need + 1.0:.2f}", need - 0.05 <= line["d"] <= need + 1.0)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(key, f"vo[{i}] ends before vo[{i + 1}]", end, f"≤ {vo[i + 1]['t']}", end <= vo[i + 1]["t"])
    last_end = vo[-1]["t"] + vo[-1]["d"]
    dur = spec["duration"]
    record(key, "duration in 26-44 s lane", dur, LANE, LANE[0] <= dur <= LANE[1])
    record(key, "≥ 1.5 s hold after last VO", round(dur - last_end, 2), "≥ 1.5", dur - last_end >= 1.5)

    # 5. beat timing: matches the VO, types before it resolves, first payoff ≤ 3 s
    type_dur = d.get("typeDur", 0.6)
    for i, it in enumerate(items):
        (tl, ttok), (rl, rtok) = ANCHORS[key]["items"][i]
        at, ar = anchor_time(vo, tl, ttok), anchor_time(vo, rl, rtok)
        for what, beat, est, tok in (("t", it["t"], at, ttok), ("resultT", it["resultT"], ar, rtok)):
            if est is None:
                record(key, f"items[{i}].{what} at VO mention", beat, f"VO never says {tok!r}", False)
            else:
                record(key, f"items[{i}].{what} at VO mention", beat, f"{est:.2f}±{ANCHOR_TOL}",
                       abs(beat - est) <= ANCHOR_TOL)
        record(key, f"items[{i}] typed before result", it["resultT"], f"≥ {it['t'] + type_dur:.2f}",
               it["resultT"] >= it["t"] + type_dur)
        if i + 1 < len(items):
            record(key, f"items[{i}] resolves before items[{i + 1}]", it["resultT"], f"< {items[i + 1]['t']}",
                   it["resultT"] < items[i + 1]["t"])
    record(key, "R10 first payoff ≤ 3 s", items[0]["resultT"], "≤ 3.0", items[0]["resultT"] <= 3.0)
    vl, vtok = ANCHORS[key]["verdict"]
    vt = anchor_time(vo, vl, vtok)
    record(key, "verdict.t at VO mention", spec["verdict"]["t"], f"{vt:.2f}±{ANCHOR_TOL}",
           abs(spec["verdict"]["t"] - vt) <= ANCHOR_TOL)
    record(key, "verdict after last result", spec["verdict"]["t"], f"≥ {items[-1]['resultT']}",
           spec["verdict"]["t"] >= items[-1]["resultT"])
    for s in spec.get("sfx", []):
        record(key, f"sfx {s['kind']} inside duration", s["t"], f"< {dur}", 0 <= s["t"] < dur)
    wg = spec.get("lookOpts", {}).get("wrongGuess")
    if wg:
        record(key, "wrongGuess.t on the VO line that voices it", wg["t"],
               "a vo t", any(abs(wg["t"] - line["t"]) < 1e-9 for line in vo))


# ------------------------------------------------------------ sensitivity / facts
def sensitivity():
    # 01a: a 26-payday year has exactly 2 three-payday months; 27-payday years ≈ 1 in 11
    first = datetime.date(2000, 1, 7)          # a Friday; the other biweekly cycle starts a week later
    counts = {}
    for start in (first, first + datetime.timedelta(days=7)):
        days, d = [], start
        while d.year < 2100:
            days.append(d)
            d += datetime.timedelta(days=14)
        for y in range(2000, 2100):
            in_year = [x for x in days if x.year == y]
            months3 = sum(1 for m in range(1, 13) if sum(1 for x in in_year if x.month == m) == 3)
            n = len(in_year)
            counts.setdefault(n, []).append(months3)
            assert months3 == n - 24, (y, n, months3)
    record("01a", "26-payday years → exactly 2 three-check months", sorted(set(counts[26])), [2], set(counts[26]) == {2})
    record("01a", "27-payday years → exactly 3 three-check months", sorted(set(counts[27])), [3], set(counts[27]) == {3})
    share = len(counts[27]) / (len(counts[26]) + len(counts[27]))
    record("01a", "27-payday years ≈ 1 in 11 (pinned comment)", f"1 in {1 / share:.1f}", "1 in 10-12",
           10 <= 1 / share <= 12)
    eq("01a", "27-payday year pay (pinned comment)", money(A_27), "$67,500")

    # 01b: x0.85 is within 1 point of the exact keep rate, and both round to the same $50
    close("01b", "2026 federal tax on $41,600 (single)", round(B_FED, 2), 2812.00, 0.005)
    close("01b", "FICA on $41,600", round(B_FICA, 2), 3182.40, 0.005)
    record("01b", "exact keep rate vs x0.85", f"{B_KEEP_EXACT:.4f}", "0.85 ± 0.01", abs(B_KEEP_EXACT - B_KEEP) <= 0.01)
    eq("01b", "exact monthly take-home → nearest $50", money(round_to(B_KEPT_EXACT, 50)), money(B_KEPT_D))
    eq("01b", "x0.85 on unrounded month → nearest $50", money(round_to(B_MONTH * B_KEEP, 50)), money(B_KEPT_D))
    record("01b", "'about 85 cents of each dollar' vs exact keep", f"{B_KEEP_EXACT * 100:.1f}¢", "85¢ ± 1¢",
           abs(B_KEEP_EXACT * 100 - B_KEEP * 100) <= 1.0)

    # 01c: on-screen chain agrees with the exact values; commute result robust to 25-29 min
    eq("01c", "exact hour → 2 dp", round(C_SALARY / HRS_YEAR, 2), C_HOUR_D)
    eq("01c", "exact day ($60,000 ÷ 260) → $", round(C_SALARY / (WEEKS * 5)), C_DAY_D)
    eq("01c", "exact minute → 2 dp", round(C_SALARY / HRS_YEAR / 60, 2), C_MIN_D)
    eq("01c", "exact real hour → $", round(C_SALARY / (WEEKS * 5) / C_DAY_HRS), C_REAL_D)
    robust = {c: round(C_SALARY / (WEEKS * 5) / (8 + 2 * c / 60)) for c in (25, 26, 27, 27.6, 28, 29)}
    record("01c", "≈ $26 for any 25-29 min commute", robust, "all 26", set(robust.values()) == {C_REAL_D})
    eq("01c", "30 s of work, exact → ¢", round(C_SALARY / HRS_YEAR / 3600 * C_GAG_SEC * 100), C_GAG_CENTS)
    close("01c", "commute hours a year (write-up)", C_COMMUTE_DAY * 5 * WEEKS / 60, 234.0)


def main():
    for key, path in FILES.items():
        try:
            spec = json.loads(path.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            record(key, f"load {path.name}", repr(e), "valid JSON", False)
            continue
        check_spec(key, spec)
    sensitivity()

    w = [7, 52, 44, 44]
    print(f"{'teaser':<{w[0]}} {'check':<{w[1]}} {'spec':<{w[2]}} {'computed':<{w[3]}} ok")
    print("-" * (sum(w) + 7))
    for teaser, check, got, want, ok in rows:
        g = got.replace("\n", "⏎")
        x = want.replace("\n", "⏎")
        print(f"{teaser:<{w[0]}} {check[:w[1]]:<{w[1]}} {g[:w[2]]:<{w[2]}} {x[:w[3]]:<{w[3]}} {'OK' if ok else 'FAIL'}")
    print("-" * (sum(w) + 7))
    print(f"{len(rows)} checks, {errors} failed")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
