#!/usr/bin/env python3
"""Math + timing check for format 1, "dead-simple-list" (teasers 01a, 01b, 01c). Round-2 revision + hook passes
(01c is the bracket-myth hook since hook pass 1: "Will a 3% raise push $65,000 into a higher bracket?"; 01b is the
Social Security wage-cap hook since hook pass 2: "You pay 6.2% to Social Security. A $1M salary pays…?").
Since the port of 2026-10-08 the owner keeps two looks: 01a runs in Scoreboard (was Clean Sheet) and 01b in Becker Rig
(was Live Sheet); the retired specs are in studio/specs/retired/. 01c was always Becker Rig.

1. Recomputes every on-screen number from its inputs (constants below, sources in
   teasers/v2/01-dead-simple-list.md).
2. Loads the three spec JSONs and asserts that every display string that carries a
   digit equals the computed, formatted value (a digit-bearing string the script does
   not know about is an error too), and that every number spoken in the vo text equals
   the computed value, line by line.
3. Re-evaluates every formula exactly as it is typed on screen and checks that the
   displayed result is that value rounded to the shown precision ($1, 1¢ when cents
   are shown, or 0.1 point for a percent): one rounding rule for the whole series, so
   anyone who redoes a visible formula gets the visible answer.
4. Checks the timing contract: VO read at ~2.6 words/s, no overlapping lines, each
   beat's t / resultT (and a held-back note's noteT, 01a's check line) at the moment the VO
   says it, a note that continues its result ("× 12 = $60,000") is true, header + a number at t = 0,
   first payoff by 3 s, results every ≤ 7.5 s, duration inside the 26-44 s lane with a
   ≥ 1.5 s hold after the last VO line (01c: 25-44 s and ≥ 1.2 s, its loop-tight ending
   since the round-2 QA), the verdict on the last VO line (the chrome swaps captions for
   the verdict card, so a line after it would have no on-screen text); for 01c, the 12%
   on screen before "10 points more", ①'s raise beside ③'s $450, and the caption and
   verdict breaks between phrases; no caption shows a result before the sheet lands it (both kept looks show a
   whole VO line at once).
5. Contract checks: only lookOpts keys the target look kit actually reads; a wrong guess
   (01b's struck $62,000) types, lands and is struck on the VO words that say it, and its
   typed formula gives its shown result; the Becker figure's acting after the goal (01c's
   lookOpts.acts) uses moves the kit has, points only at real items, and sits on the VO words
   it plays (or after the last line); 01a's Scoreboard payoff (lookOpts.heroFinal: the hero rolls $2,500 to the
   goal's $5,000 under "Your 2 extra checks" as the VO says it; lookOpts.echo: ②'s $5,000 lights with ③'s at the
   verdict, the same month of pay) and 01b's Becker wrong-guess throw and finale.
6. Sensitivity checks: the 26/27-payday calendar claims; 01b's Social Security cap maths
   (the $20/hr year is under the $184,500 cap, the $1M salary's real rate, "more than five
   times", the pinned comment's dollar ratios); and 01c's bracket maths (the $45 against the
   full 2026 federal tax, the pinned comment's myth / FICA / kept figures, and the salary window).

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
    "01a": SPECS / "01a-scoreboard-paid-biweekly.json",      # ported from Clean Sheet (2026-10-08)
    "01b": SPECS / "01b-becker-rig-20-an-hour.json",          # ported from Live Sheet (2026-10-08)
    "01c": SPECS / "01c-becker-rig-60k-a-year.json",
}
RETIRED = {          # the pre-port specs, moved (git mv) out of the live spec folder
    "01a": SPECS / "retired" / "01a-clean-sheet-paid-biweekly.json",
    "01b": SPECS / "retired" / "01b-live-sheet-20-an-hour.json",
}
WPS = 2.6            # guide VO read rate, words per second
ANCHOR_TOL = 0.5     # s: a beat may sit this far from the estimated spoken moment
LANE = (26.0, 44.0)  # benchmark duration lane for worked lists
HOLD_MIN = 1.5       # s of hold after the last VO line
# per-teaser exceptions, each with its reason. 01c (round-2 QA): a loop-tight ending. Its kit holds the finished
# sheet instead of clearing it, so the old 2.5 s silent tail read as a swipe-away leak; the closing pose now plays
# right after the last VO line and the video loops 1.2 s later (25.3 s, 0.7 s under the lane's floor).
# 01b (port to Becker Rig): the same kit and the same reason. The Live Sheet cleared its cells for the last 0.5 s
# (a loop); the Becker Rig holds, so the closing pose plays right after the last VO line and the video loops 1.5 s
# after it (24.0 s, 2.0 s under the lane's floor; the hold after the VO keeps the series' 1.5 s)
# 01a (Scoreboard QA fix pass): the Scoreboard holds the finished board too, and the port's 26.0 s (Clean Sheet's
# length) left 2.3 s of dead frame after the last word; it now ends 0.8 s after the last VO line (24.5 s; the kit's
# own default would be 24.1 s), as 08a does (0.9 s)
LANE_EXCEPT = {"01c": (25.0, 44.0), "01b": (24.0, 44.0), "01a": (24.0, 44.0)}
HOLD_EXCEPT = {"01c": 1.2, "01a": 0.8}
HOLD_MAX = {"01a": 1.0}   # s: no dead tail (the Scoreboard holds a still board after the last word)
MAX_GAP = 7.5        # s between consecutive payoffs (results, then the verdict); format pace is 4-7 s

# lookOpts keys each kit's dead-simple-list module (or its chrome) actually reads. Only the two kept looks are live;
# a spec in a retired look fails here
KIT_LOOKOPTS = {
    "scoreboard": {"hero", "heroTag", "heroFinal", "slotFormula", "labels", "notes", "checkRow", "check", "checkT",
                   "wrongGuess", "goal", "echo", "intro", "layout", "pointer", "startNum", "stageBottom", "footerSteps"},
    "becker-rig": {"hits", "actions", "figureScale", "input", "layout", "acts", "finale", "wrongGuess"},
}
BECKER_HITS = {"kick", "chop", "slam"}
BECKER_FINALES = {"cheer", "shocked"}   # becker-rig dead-simple-list lookOpts.finale
SB_ROLL_MAX = 1.4    # Scoreboard dead-simple-list: the hero's payoff roll (heroFinal) takes 1.0-1.4 s, from t + 0.04
SB_ICONS = {"cup", "hotdog", "burger", "pizza", "phone", "car", "house", "coin", "bill", "gas", "ticket", "bag", "egg",
            "hour"}   # Scoreboard unit icons (FORMATS.md §8): heroFinal.icon
BECKER_ACTS = {"point", "wag", "shrug", "nod", "cheer", "proud"}   # becker-rig dead-simple-list lookOpts.acts

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
NBSP = "\u00a0"         # keeps a highlight or a rule on one rendered line (the kits never break at it)


def money(x, dp=0):
    return f"${x:,.{dp}f}"


def approx(s):
    return f"≈ {s}"


def num(n):
    return f"{n:,}"


def ordinal(n):
    n = int(n)
    suf = "th" if 10 <= n % 100 <= 20 else {1: "st", 2: "nd", 3: "rd"}.get(n % 10, "th")
    return f"{n}{suf}"


def rnd(x, dp=0):
    """Round half up (display rounding), not Python's banker's rounding."""
    q = 10 ** dp
    return int(x * q + 0.5 + 1e-9) / q if dp else int(x + 0.5 + 1e-9)


# ------------------------------------------------- series constants (all three)
HRS_WEEK = 40
WEEKS = 52
HRS_YEAR = HRS_WEEK * WEEKS          # 2,080: one hours constant for the whole series
MONTHS = 12
DAYS = 365
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
A_TWELVE = A_MONTH * MONTHS                      # 12 normal months = $60,000 (= the × 24 figure)
A_LEFT = A_YEAR - A_WRONG                        # $5,000 the budget forgets
A_MONTHS_OF_PAY = A_YEAR // A_MONTH              # 13
assert A_TWELVE == A_WRONG and A_YEAR % A_MONTH == 0 and A_LEFT == A_MONTH == A_PAY * A_EXTRA
A_27 = A_PAY * (A_PAYDAYS + 1)                   # $67,500 in a 27-payday year (pinned comment)

# ------------------------------------------------- 2026 federal tax + FICA, single filer (01c; 01b uses FICA's 6.2%)
# (IRS Rev. Proc. 2025-32; SSA 2026 fact sheet; second publishers in the write-up)
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


def fica(gross):
    return min(gross, SS_WAGE_BASE) * SS_RATE + gross * MED_RATE


def bracket_rate(gross):
    taxable = max(0, gross - STD_DED)
    low = 0
    for top, rate in BRACKETS:
        if taxable <= top:
            return rate, low, top
        low = top
    raise ValueError(gross)


def ss_tax(gross):
    """2026 Social Security tax, employee share: 6.2% of wages up to the $184,500 wage base."""
    return min(gross, SS_WAGE_BASE) * SS_RATE


# ------------------------------------------------- 01b inputs and maths (hook pass 2: the Social Security wage cap)
B_WAGE = 20
B_YEAR = B_WAGE * HRS_YEAR                       # $41,600
SS_PCT = round(SS_RATE * 100, 1)                 # 6.2, as shown and spoken
SS_PCT_S = f"{SS_PCT:.1f}"                       # "6.2"
B_SS = ss_tax(B_YEAR)                            # 2,579.20: yours, a year
B_SS_D = rnd(B_SS)                               # shown as ≈ $2,579
B_RIVAL = 1_000_000                              # the named rival: a $1M salary
assert B_RIVAL % 1_000_000 == 0
B_RIVAL_S = f"${B_RIVAL // 1_000_000}M"          # "$1M" (header, label, verdict)
B_WRONG = B_RIVAL * SS_RATE                      # $62,000: the flat-6.2% guess, typed and struck
B_CAPPED = ss_tax(B_RIVAL)                       # $11,439: what the $1M salary really pays
B_RATE = B_CAPPED / B_RIVAL * 100                # 1.1439 (% of their pay)
B_RATE_D = rnd(B_RATE, 1)                        # shown as ≈ 1.1%
B_RATE_S = f"{B_RATE_D:.1f}%"                    # "1.1%"
B_TIMES = SS_PCT / B_RATE                        # 5.42: "more than five times their rate"
assert abs(B_WRONG - 62_000) < 1e-6 and abs(B_CAPPED - 11_439) < 1e-6

# ------------------------------------------------- 01c inputs and maths (hook pass: the bracket myth)
C_SALARY = 65_000                                # ≈ BLS Q2 2026 median full-time pay ($1,251 × 52 = $65,052)
C_PCT = 3                                        # the example raise, in percent
C_NEW = C_SALARY * (100 + C_PCT) // 100          # $66,950: the new pay
assert C_SALARY * (100 + C_PCT) % 100 == 0
C_RAISE = C_NEW - C_SALARY                       # $1,950
C_TOP12, C_LO = BRACKETS[1]                      # 12% bracket ends at $50,400 of taxed pay
C_HI = BRACKETS[2][1]                            # 22% above it
C_LO_PCT, C_HI_PCT = round(C_LO * 100), round(C_HI * 100)
C_PTS = C_HI_PCT - C_LO_PCT                      # 10 points
C_LINE = C_TOP12 + STD_DED                       # $66,500 of pay: where 22% starts
C_OVER = C_NEW - C_LINE                          # $450 over the line
C_COST = C_OVER * C_PTS // 100                   # $45: what the bracket costs
assert C_OVER * C_PTS % 100 == 0
assert C_SALARY < C_LINE < C_NEW, "the example must cross the line"

# ---------------------------------------------------------- expected strings
EXPECT = {
    "01a": {
        "header": "3 DEAD SIMPLE NUMBERS\nPAID **EVERY 2 WEEKS**?\nWHAT YOUR BUDGET MISSES",
        "footer": f"ASSUMES {A_PAYDAYS} paydays a year · pay before tax",
        # (Scoreboard QA fix pass: a no-break space after "=", so the verdict never leaves "=" at a line's end)
        "verdict.text": f"Every 2 weeks ={NBSP}**{A_MONTHS_OF_PAY}{NBSP}months** of pay a year",
        "data.input.value": money(A_PAY),
        "data.input.note": "every 2 weeks",
        "data.items[0].formula": f"{money(A_PAY)} × {A_PAYDAYS}",
        "data.items[0].result": money(A_YEAR),
        "data.items[0].note": f"not × {A_SEMI} = {money(A_WRONG)}",
        "data.items[1].label": "A normal month",
        "data.items[1].formula": f"{money(A_PAY)} × 2",
        "data.items[1].result": money(A_MONTH),
        "data.items[1].note": f"× {MONTHS} = {money(A_TWELVE)}",
        "data.items[2].formula": f"{money(A_YEAR)} − {money(A_WRONG)}",
        "data.items[2].result": money(A_LEFT),
        "data.items[2].label": f"The {A_EXTRA} checks your budget forgets",
        "data.check": f"{A_NORMAL_MONTHS}×2 + {A_EXTRA}×3 = {A_PAYDAYS} paydays",
        # Scoreboard: the hero's payoff tag (the VO's "It's your 2 extra checks"), over the goal's $5,000
        "lookOpts.heroFinal.tag": f"Your {A_EXTRA} extra checks",
    },
    "01b": {
        # (Becker QA fix pass: 6.2% is the viewer's cost, red (__x__) as in ①'s ≈ $2,579 and the verdict; it was
        # hero green, which in Becker Rig means a good or new number)
        "header": (f"3 DEAD SIMPLE NUMBERS\nYOU PAY __{SS_PCT_S}%__ TO SOCIAL SECURITY.\n"
                   f"A {B_RIVAL_S} SALARY PAYS…?"),
        "footer": f"ASSUMES {HRS_WEEK} hrs × {WEEKS} wks · {TAX_YEAR} rates\nemployee share, no Medicare",
        # (Becker port: a break between the two sentences; the kit's verdict otherwise wrapped "A $1M salary / pays")
        "verdict.text": f"You pay __{SS_PCT_S}%__.\nA {B_RIVAL_S} salary pays **≈{NBSP}{B_RATE_S}**.",
        "data.input.value": f"{money(B_WAGE)}/hr",
        "data.input.note": f"{HRS_WEEK} hrs a week",
        "data.items[0].formula": f"{money(B_WAGE)} × {num(HRS_YEAR)} × {SS_PCT_S}%",
        "data.items[0].result": approx(money(B_SS_D)),
        "data.items[0].note": f"{SS_PCT_S}% of every dollar",
        "data.items[1].label": f"A {B_RIVAL_S} salary pays",
        "data.items[1].formula": f"{money(SS_WAGE_BASE)} × {SS_PCT_S}%",
        "data.items[1].result": money(B_CAPPED),
        "data.items[1].note": f"taxed only up to {money(SS_WAGE_BASE)}",
        "data.items[2].formula": f"{money(B_CAPPED)} ÷ {money(B_RIVAL)}",
        "data.items[2].result": approx(B_RATE_S),
        "data.items[2].note": f"yours: {SS_PCT_S}%",
        "lookOpts.wrongGuess.formula": f"{money(B_RIVAL)} × {SS_PCT_S}%",
        "lookOpts.wrongGuess.result": money(B_WRONG),
    },
    "01c": {
        "header": f"4 DEAD SIMPLE NUMBERS\nWILL A {C_PCT}% RAISE PUSH **{money(C_SALARY)}**\nINTO A HIGHER BRACKET?",
        "footer": f"ASSUMES single, standard deduction\n{TAX_YEAR} federal income tax only",
        "verdict.text": f"Higher bracket? Yes.\nIt costs you **{money(C_COST)}{NBSP}a{NBSP}year**",
        "data.input.value": money(C_SALARY),
        "data.items[0].label": f"Pay after {C_PCT}%",
        "data.items[0].note": f"+{money(C_RAISE)} raise",
        "data.items[0].formula": f"{money(C_SALARY)} × {1 + C_PCT / 100:.2f}",
        "data.items[0].result": money(C_NEW),
        "data.items[1].label": f"Where {C_HI_PCT}% starts",
        "data.items[1].formula": f"{money(C_TOP12)} + {money(STD_DED)}",
        "data.items[1].result": money(C_LINE),
        "data.items[2].formula": f"{money(C_NEW)} − {money(C_LINE)}",
        "data.items[2].result": money(C_OVER),
        "data.items[2].note": f"{C_HI_PCT}%, not {C_LO_PCT}%",
        "data.items[3].formula": f"{money(C_OVER)} × {C_PTS}%",
        "data.items[3].result": money(C_COST),
        "data.items[3].note": f"{C_HI_PCT}% − {C_LO_PCT}%",
    },
}

# results that must carry "≈" (rounded, or resting on a rough constant) vs exact ones
APPROX_RESULTS = {
    "01a": [False, False, False],
    "01b": [True, False, True],
    "01c": [False, False, False, False],
}

# numbers spoken in each VO line, in order (cents are expressed in dollars; "3%" is 3; "1.1%" is 1.1)
VO_NUMBERS = {
    # (each result starts its own VO line, so the caption never shows it before the sheet lands it)
    "01a": [
        [A_PAYDAYS, A_PAY],                       # "Your paycheck, times 26. On $2,500:"
        [A_YEAR],                                 # "$65,000 a year."
        [A_SEMI, A_WRONG],
        [2],                                      # "A normal month: 2 checks,"
        [A_MONTH],                                # "$5,000."
        [MONTHS, A_TWELVE],
        [A_YEAR],                                 # "From $65,000, that leaves"
        [A_LEFT],                                 # "$5,000."
        [A_EXTRA],                                # "It's your 2 extra checks,"
        [A_EXTRA, 3],                             # "from the 2 months with 3 paydays."
        [A_MONTHS_OF_PAY],
    ],
    "01b": [
        [B_WAGE],                                 # "At $20 an hour, you pay about"
        [B_SS_D],                                 # "$2,579 a year."
        [],                                       # "A million-dollar salary:"   (Becker port: the guess has its own
        [B_WRONG],                                # "$62,000?"                    caption line, as every result does)
        [SS_WAGE_BASE],                           # "No. It stops at $184,500:"
        [B_CAPPED],                               # "$11,439."
        [],                                       # "That's about"                (Becker port: the climax ≈ 1.1%
        [B_RATE_D],                               # "1.1% of their pay."           starts its own caption line)
        [SS_PCT],
        [],                                       # "more than five times": checked in sensitivity()
    ],
    "01c": [
        [C_SALARY, C_PCT],                        # "$65,000, plus 3%:"
        [C_NEW],                                  # "$66,950."
        [C_HI_PCT],                               # "22% starts at"
        [C_LINE],                                 # "$66,500 of pay."
        [],                                       # "You crossed it by"
        [C_OVER],                                 # "$450."
        [C_OVER, C_HI_PCT, C_PTS],                # "Only those $450 pay 22%. 10 points more:"
        [C_COST],                                 # "$45."
        [],                                       # "Not your whole raise."
        [],                                       # "Not your whole pay."
        [C_COST],                                 # the verdict line
    ],
}

# where each beat should sit: (vo line index, token or None for the line start)
ANCHORS = {
    "01a": {"items": [((0, None), (1, None)),      # each result lands on the VO line that starts with it
                      ((3, None), (4, None)),
                      ((6, None), (7, None))],
            "verdict": (10, None),
            # notes held back to the VO line that says them (item.noteT), and the check line (data.checkT)
            "notes": {0: (2, None), 1: (5, None)},     # "Not times 24…", "12 normal months: $60,000."
            "check": (9, None)},                        # "from the 2 months with 3 paydays."
    "01b": {"items": [((0, None), (1, None)),
                      ((4, "stops"), (5, None)),
                      ((6, None), (7, None))],         # ③'s block drops on "That's about", ≈ 1.1% lands on its line
            "verdict": (9, None),
            "notes": {2: (8, None)},                    # "yours: 6.2%" opens on "Yours: 6.2%, on every dollar…"
            # the struck flat-rate guess: types on vo[2], lands as its own line "$62,000?" starts, is struck on "No."
            "wrongGuess": {"t": (2, None), "resultT": (3, None), "strikeT": (4, None)},
            # the figure after the goal: points at ① ("Yours: 6.2%…"), shrugs as the verdict pops, points at the
            # ≈ 1.1% on "their rate", and stands hands on hips once the VO is over
            "acts": [(8, None), (9, None), (9, "their"), "after"]},
    "01c": {"items": [((0, None), (1, None)),      # each result starts its own VO line (assembly pass 01c)
                      ((2, None), (3, None)),
                      ((4, None), (5, None)),
                      ((6, None), (7, None))],
            "verdict": (10, None),
            # the figure's acting after the goal (lookOpts.acts), in order: points at ③'s $450 on "Not your whole
            # raise.", wags "no" on "Not your whole pay.", shrugs on "Higher bracket? Yes.", points at the $45 as
            # the verdict says it, and stands proud once the VO is over ("after")
            "acts": [(8, None), (9, None), (10, None), (10, money(C_COST)), "after"]},
}

# ------------------------------------------------------------ VO helpers
NUM_TOKEN = re.compile(r"(\$?)(\d[\d,]*)(?:\.(\d+))?(st|nd|rd|th)?(%)?")


def vo_numbers(text):
    """Numbers spoken in a VO line; 'N cents' becomes N/100 dollars."""
    out = []
    for m in re.finditer(r"(\$?\d[\d,]*(?:\.\d+)?)(?:st|nd|rd|th)?(\s+cents)?", text):
        v = float(m.group(1).lstrip("$").rstrip(",").replace(",", ""))
        out.append(v / 100 if m.group(2) else v)
    return out


def words_int(n):
    if n < 100:
        return 1                      # "twenty-six"
    if n < 10_000:
        return 2                      # "eight hundred", "three sixty-five", "twenty eighty", "thirty-four sixty-seven"
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
    dollar, ip, dec, ordn, pct = m.groups()
    n = int(ip.replace(",", ""))
    if ordn:
        return 1                                   # "thirteenth"
    if pct:
        return words_int(n) + (1 + len(dec) if dec else 0) + 1   # "three percent"
    if dec is None:
        return words_int(n)
    if dollar:
        return 2 if n == 0 else words_int(n) + 1   # "$28.85" twenty-eight eighty-five; "$0.48" forty-eight cents
    return words_int(n) + 1 + len(dec)             # "8.9" eight point nine


def spoken_words(text):
    return sum(token_words(t) for t in text.split())


def anchor_time(vo, line, token):
    if not 0 <= line < len(vo):
        return None  # the VO has fewer lines than ANCHORS expects: reported as a failure by the caller
    t0 = vo[line]["t"]
    if token is None:
        return t0
    before = 0
    for tok in vo[line]["text"].split():
        if tok.strip(".,:;?!'\"()") == token:
            return t0 + before / WPS
        before += token_words(tok)
    return None  # token not spoken in that line: reported as a failure by the caller


# ------------------------------------------------------------ formula evaluator
SAFE = re.compile(r"^[\d\s.+\-*/()]+$")


def eval_formula(formula):
    """Evaluate a formula exactly as typed on screen: '$3,467 × 0.85', '$20 × 2,080 hrs', '$60,000 × 3%'."""
    s = formula.replace("×", "*").replace("÷", "/").replace("−", "-").replace("$", "")
    s = re.sub(r"(\d[\d,]*(?:\.\d+)?)%", lambda m: f"({m.group(1)}/100)", s)
    s = re.sub(r"(?<=\d),(?=\d{3})", "", s)
    s = re.sub(r"[A-Za-z]+", "", s)
    if not SAFE.match(s):
        raise ValueError(f"unsafe formula {formula!r} -> {s!r}")
    return eval(s, {"__builtins__": {}}, {})  # noqa: S307 (sanitised to digits and operators above)


def display_value(result):
    """'≈ $2,947' -> (2947.0, 0 dp, 1); '≈ $0.48' -> (0.48, 2 dp, 1); '≈ 1.1%' -> (1.1, 1 dp, 100).
    The last value scales the typed formula to the shown unit (a percent shows the ratio × 100)."""
    m = re.search(r"\$(\d[\d,]*)(?:\.(\d+))?", result)
    scale = 1
    if not m:
        m = re.search(r"(\d[\d,]*)(?:\.(\d+))?%", result)
        scale = 100
    whole = m.group(1).replace(",", "")
    dp = len(m.group(2)) if m.group(2) else 0
    return float(whole + ("." + m.group(2) if dp else "")), dp, scale


def show(x, dp, scale):
    return money(x, dp) if scale == 1 else f"{x:.{dp}f}%"


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


SKIP_PATHS = re.compile(r"^(id|look|format|vo\[\d+\]\.text|sfx\[\d+\]\.kind|.*\.tone|.*\.verb|lookOpts\.hits\[\d+\]|lookOpts\.labels)$")


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
    lines = spec["header"].count("\n") + 1
    record(key, "R8 header ≤ 4 lines (kit fits 3)", lines, "≤ 3", lines <= 3)
    dollars_in_header = len(re.findall(r"\$\d", spec["header"]))
    record(key, "R2 ≤ 1 $ figure in header", dollars_in_header, "≤ 1", dollars_in_header <= 1)
    has_num_t0 = bool(re.search(r"\$\d", d["input"]["value"])) or dollars_in_header == 1
    record(key, "R1 header + $ number at t=0", has_num_t0, True, has_num_t0 and items[0]["t"] == 0.0)
    eq(key, "captions on", spec.get("captions"), True)
    eq(key, "format", spec["format"], "dead-simple-list")
    eq(key, "id = file stem", spec["id"], FILES[key].stem)

    # 2. "≈" on every rounded result, never on exact ones; the visible formula gives the visible result
    for i, it in enumerate(items):
        want = APPROX_RESULTS[key][i]
        record(key, f"items[{i}] ≈ marker", it["result"][:1] == "≈", want, (it["result"][:1] == "≈") == want)
        shown, dp, scale = display_value(it["result"])
        val = eval_formula(it["formula"]) * scale
        unit = ("1¢" if dp else "$1") if scale == 1 else f"{10 ** -dp:g} point"
        record(key, f"items[{i}] '{it['formula']}' = {val:,.4f} → shown", it["result"],
               f"{show(rnd(val, dp), dp, scale)} (round to {unit})", abs(rnd(val, dp) - shown) < 1e-9)
        exact = abs(val - round(val, dp)) < 1e-9
        record(key, f"items[{i}] ≈ iff rounded", it["result"][:1] == "≈", not exact,
               (it["result"][:1] == "≈") == (not exact))

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
    lane, hold = LANE_EXCEPT.get(key, LANE), HOLD_EXCEPT.get(key, HOLD_MIN)
    record(key, f"duration in {lane[0]:g}-{lane[1]:g} s lane", dur, lane, lane[0] <= dur <= lane[1])
    record(key, f"≥ {hold} s hold after last VO", round(dur - last_end, 2), f"≥ {hold}", dur - last_end >= hold - 1e-9)
    if key in HOLD_MAX:
        record(key, f"≤ {HOLD_MAX[key]} s still tail after last VO", round(dur - last_end, 2), f"≤ {HOLD_MAX[key]}",
               dur - last_end <= HOLD_MAX[key] + 1e-9)

    # 5. beat timing: matches the VO, types before it resolves, first payoff ≤ 3 s, steady pace
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
    payoffs = [it["resultT"] for it in items] + [spec["verdict"]["t"]]
    gaps = [round(b - a, 2) for a, b in zip(payoffs, payoffs[1:])]
    record(key, f"payoff gaps ≤ {MAX_GAP} s", gaps, f"all ≤ {MAX_GAP}", max(gaps) <= MAX_GAP)
    vl, vtok = ANCHORS[key]["verdict"]
    vt = anchor_time(vo, vl, vtok)
    record(key, "verdict.t at VO mention", spec["verdict"]["t"], "(no anchor)" if vt is None else f"{vt:.2f}±{ANCHOR_TOL}",
           vt is not None and abs(spec["verdict"]["t"] - vt) <= ANCHOR_TOL)
    record(key, "verdict after last result", spec["verdict"]["t"], f"≥ {items[-1]['resultT']}",
           spec["verdict"]["t"] >= items[-1]["resultT"])
    later = [i for i, line in enumerate(vo) if line["t"] > spec["verdict"]["t"] + 1e-9]
    record(key, "no VO line after the verdict card (it hides captions)", later, "[]", not later)
    for s in spec.get("sfx", []):
        record(key, f"sfx {s['kind']} inside duration", s["t"], f"< {dur}", 0 <= s["t"] < dur)

    # 5b. notes held back to their VO line (item.noteT) land after their result, at the VO mention; a note that
    # continues its result ("× 12 = $60,000" beside "$5,000") is arithmetic and must be true
    note_anchors = ANCHORS[key].get("notes", {})
    for i, it in enumerate(items):
        if "noteT" in it or i in note_anchors:
            ln = note_anchors.get(i)
            est = anchor_time(vo, *ln) if ln else None
            record(key, f"items[{i}].noteT at VO mention", it.get("noteT"),
                   "(no anchor)" if est is None else f"{est:.2f}±{ANCHOR_TOL}",
                   est is not None and "noteT" in it and abs(it["noteT"] - est) <= ANCHOR_TOL)
            record(key, f"items[{i}].noteT after its result", it.get("noteT"), f"≥ {it['resultT']}",
                   it.get("noteT", -1) >= it["resultT"])
        note = it.get("note", "")
        wrong = re.match(r"^not\s+([×÷+−][^=]*)=(.*)$", note)
        if wrong:                                   # "not × 24 = $60,000": the wrong multiplier on the same input
            base = re.match(r"\s*(\$?[\d,.]+)", it["formula"]).group(1)
            got = eval_formula(f"{base} {wrong.group(1)}")
            want, dp, sc = display_value(wrong.group(2))
            record(key, f"items[{i}] note '{note}' ({base} {wrong.group(1).strip()}) is true", f"{got:,.4f}",
                   show(want, dp, sc), abs(got * sc - want) < 1e-9)
        if re.match(r"^[×÷+−]", note) and "=" in note:
            lhs, rhs = note.split("=", 1)
            got = eval_formula(f"{it['result']} {lhs}")
            want, dp, sc = display_value(rhs)
            record(key, f"items[{i}] note '{it['result']} {note}' is true", f"{got:,.4f}", show(want, dp, sc),
                   abs(got * sc - want) < 1e-9)
    if "check" in d:
        lhs, rhs = d["check"].split("=", 1)
        got, want = eval_formula(lhs), vo_numbers(rhs)
        record(key, f"check line '{d['check']}' is true", got, want, len(want) == 1 and abs(got - want[0]) < 1e-9)
        ln = ANCHORS[key].get("check")
        est = anchor_time(vo, *ln) if ln else None
        record(key, "data.checkT at VO mention", d.get("checkT"),
               "(no anchor)" if est is None else f"{est:.2f}±{ANCHOR_TOL}",
               est is not None and abs(d.get("checkT", -99) - est) <= ANCHOR_TOL)
        shown = d["checkT"] + 0.3          # the Scoreboard slams the check row in (a hard cut); it is not typed
        record(key, "check line lands after the last result, before the verdict", f"{d['checkT']}-{shown:.1f}",
               f"{items[-1]['resultT']} … {spec['verdict']['t']}",
               items[-1]["resultT"] < d["checkT"] and shown < spec["verdict"]["t"])

    # 5c. captions never run ahead of the sheet: both kept looks show a whole VO line at once (Becker pops its words
    # in ~0.3 s; Scoreboard greys the unspoken ones), so no line may say a result before that result is on screen,
    # unless an earlier item already shows the same figure (01a's ②/③ $5,000)
    wg = spec.get("lookOpts", {}).get("wrongGuess")
    shown_at = [(it["result"], it["resultT"]) for it in items] + ([(wg["result"], wg["resultT"])] if wg else [])
    for res, rt in shown_at:
        val = display_value(res)[0]
        early = [i for i, line in enumerate(vo) if line["t"] < rt - 1e-9 and any(abs(n - val) < 1e-9 for n in vo_numbers(line["text"]))
                 and not any(abs(display_value(r2)[0] - val) < 1e-9 and t2 <= line["t"] + 1e-9 for r2, t2 in shown_at)]
        record(key, f"no caption says {res} before it lands ({rt} s)", early, "[]", not early)

    # 6. contract: only lookOpts the kit reads
    lo = spec.get("lookOpts", {})
    record(key, "look is a kept look (Scoreboard or Becker Rig)", spec["look"], sorted(KIT_LOOKOPTS), spec["look"] in KIT_LOOKOPTS)
    unknown = sorted(set(lo) - KIT_LOOKOPTS.get(spec["look"], set()))
    record(key, f"lookOpts keys read by the {spec['look']} kit", sorted(lo), "no unknown keys", not unknown)
    if spec["look"] == "becker-rig":
        hits = lo.get("hits", [])
        record(key, "becker hits valid, goal slams", hits, f"{sorted(BECKER_HITS)}, slam on goal",
               all(h in BECKER_HITS for h in hits) and all(
                   (items[i]["tone"] == "goal") == (h == "slam") for i, h in enumerate(hits)))
        if "finale" in lo:
            record(key, "becker finale is a kit move", lo["finale"], sorted(BECKER_FINALES), lo["finale"] in BECKER_FINALES)
        if lo.get("wrongGuess"):
            g = lo["wrongGuess"]
            record(key, "becker wrong guess: a valid, non-goal throw", g.get("hit", "kick"), "kick or chop",
                   g.get("hit", "kick") in BECKER_HITS - {"slam"})
            # the kit's own timing rule: it starts >= 0.35 s, after the previous item lands, lands >= 0.35 s before
            # its item's t (else the kit skips it silently)
            r = g["item"]
            prev_land = items[r - 1]["resultT"] if r > 0 else 0.0
            record(key, "becker wrong guess fits between its neighbours (kit rule)", (g["t"], g["resultT"]),
                   f"t ≥ {max(0.35, prev_land + 0.3):.2f}, resultT ≤ {items[r]['t'] - 0.35:.2f}",
                   g["t"] >= max(0.35, prev_land + 0.3) and g["resultT"] <= items[r]["t"] - 0.35 + 1e-9)
    if spec["look"] == "scoreboard":
        goal_i = next((i for i, it in enumerate(items) if it.get("tone") == "goal"), len(items) - 1)
        hf = lo.get("heroFinal")
        if isinstance(hf, dict):
            # the payoff rolls into the hero as the VO names it, after the goal lands (kit: >= 0.5 s), and lands
            # before the next beat (the check row) cuts in
            ln = next((i for i, line in enumerate(vo) if abs(line["t"] - hf["t"]) < 1e-9), None)
            record(key, "heroFinal.t on a VO line start", hf["t"], "a vo t", ln is not None)
            tag = hf.get("tag", items[goal_i]["label"]).lower()
            record(key, "heroFinal tag is what that VO line says", tag, vo[ln]["text"] if ln is not None else "-",
                   ln is not None and tag in vo[ln]["text"].lower())
            record(key, "heroFinal after the goal lands (+0.5 s)", hf["t"], f"≥ {items[goal_i]['resultT'] + 0.5}",
                   hf["t"] >= items[goal_i]["resultT"] + 0.5 - 1e-9)
            nxt = min([x for x in [d.get("checkT"), spec["verdict"]["t"]] if x is not None and x > hf["t"]])
            record(key, "heroFinal's roll lands before the next beat", f"≤ {hf['t'] + 0.04 + SB_ROLL_MAX:.2f}", f"< {nxt}",
                   hf["t"] + 0.04 + SB_ROLL_MAX < nxt)
            record(key, "heroFinal lands on the goal's result (no display override)", hf.get("display", items[goal_i]["result"]),
                   items[goal_i]["result"], hf.get("display", items[goal_i]["result"]) == items[goal_i]["result"])
            if "icon" in hf:
                # (QA fix pass) the payoff's unit icons: each one is one input (a check), so count × input = the payoff
                cnt = hf.get("count", 1)
                record(key, "heroFinal icon is a kit icon", hf["icon"], sorted(SB_ICONS), hf["icon"] in SB_ICONS)
                got = cnt * display_value(d["input"]["value"])[0]
                record(key, "heroFinal icons: count × input = the payoff", f"{cnt} × {d['input']['value']} = {money(got)}",
                       items[goal_i]["result"], isinstance(cnt, int) and 1 <= cnt <= 4 and abs(got - display_value(items[goal_i]["result"])[0]) < 1e-9)
                if key == "01a":
                    eq(key, "heroFinal icons = the 2 extra checks (26 − 24)", cnt, A_EXTRA)
        # (QA fix pass) a note "not … = X" is struck in the label stack as the VO line running at its noteT says X
        for i, it in enumerate(items):
            m = re.match(r"^not\b.*=\s*(.+)$", it.get("note", ""))
            if not m:
                continue
            nt = it.get("noteT", it["resultT"] + 0.35)
            line = next((ln for ln in vo if ln["t"] <= nt + 1e-9 < ln["t"] + ln["d"]), None)
            said = line is not None and any(abs(x - display_value(m.group(1))[0]) < 1e-9 for x in vo_numbers(line["text"]))
            record(key, f"items[{i}] note's struck {m.group(1).strip()} is said on the VO line at its noteT", nt,
                   line["text"] if line else "(no VO line)", said)
        ec = lo.get("echo")
        if ec:
            eitems = ec["items"] if isinstance(ec, dict) else ec
            et = ec.get("t", spec["verdict"]["t"]) if isinstance(ec, dict) else spec["verdict"]["t"]
            for i in eitems:
                record(key, f"echo item {i} shows the goal's figure", items[i]["result"], items[goal_i]["result"],
                       i != goal_i and items[i]["result"] == items[goal_i]["result"])
            record(key, "echo lands with the verdict line", et, spec["verdict"]["t"], abs(et - spec["verdict"]["t"]) < 1e-9)
    acts, aa = lo.get("acts", []), ANCHORS[key].get("acts")
    if acts or aa:
        record(key, "lookOpts.acts anchored in ANCHORS", len(acts), len(aa or []), len(acts) == len(aa or []))
        goal_t = max(it["resultT"] for it in items)
        for j, (a, anc) in enumerate(zip(acts, aa or [])):
            record(key, f"acts[{j}] '{a.get('act')}' is a kit move", a.get("act"), sorted(BECKER_ACTS),
                   a.get("act") in BECKER_ACTS)
            if "item" in a:
                record(key, f"acts[{j}].item is a real item", a["item"], f"0..{len(items) - 1}",
                       isinstance(a["item"], int) and 0 <= a["item"] < len(items))
            record(key, f"acts[{j}] after the goal lands (+0.4 s, the figure's jump)", a["t"], f"≥ {goal_t + 0.4:.2f}",
                   a["t"] >= goal_t + 0.4 - 1e-9)
            if anc == "after":
                record(key, f"acts[{j}] after the last VO line, ≥ 1.2 s before the end", a["t"],
                       f"{last_end:.2f} … {dur - 1.2:.2f}", last_end <= a["t"] <= dur - 1.2 + 1e-9)
            else:
                est = anchor_time(vo, *anc)
                record(key, f"acts[{j}] '{a.get('act')}' at VO mention", a["t"],
                       f"VO never says {anc[1]!r}" if est is None else f"{est:.2f}±{ANCHOR_TOL}",
                       est is not None and abs(a["t"] - est) <= ANCHOR_TOL)
        ts = [a["t"] for a in acts]
        record(key, "acts in time order", ts, "ascending", ts == sorted(ts))
    if key == "01c":
        # round-2 QA: the 12% that "10 points more" leans on is on screen (③'s note) before the VO says it
        note_t = items[2]["resultT"] + 0.24          # the becker-rig kit fades a note in 0.24 s after its result
        said = anchor_time(vo, 6, str(C_PTS))
        record(key, f"③ note shows {C_LO_PCT}% before '{C_PTS} points more' is said", f"{note_t:.2f} s",
               f"< {said:.2f} s", f"{C_LO_PCT}%" in items[2].get("note", "") and note_t < said)
        # "Not your whole raise": both sides on screen, ①'s note (the whole raise) and ③'s $450 of it
        record(key, "① note shows the whole raise; ③'s $450 is part of it", items[0].get("note"),
               f"+{money(C_RAISE)} raise > {money(C_OVER)}", items[0].get("note") == f"+{money(C_RAISE)} raise"
               and items[2]["result"] == money(C_OVER) and C_OVER < C_RAISE)
        # caption and verdict breaks fall between phrases (\n), never inside one
        record(key, "vo[6] caption breaks after '22%.'", vo[6]["text"].split("\n")[0], "…22%.",
               vo[6]["text"].count("\n") == 1 and vo[6]["text"].split("\n")[0].endswith("22%."))
        record(key, "verdict breaks after 'Yes.'", spec["verdict"]["text"].split("\n")[0], "Higher bracket? Yes.",
               spec["verdict"]["text"].split("\n")[0] == "Higher bracket? Yes.")
    if key == "01b":
        # Becker QA fix pass: the viewer's 6.2% is one colour everywhere, the cost red (__x__), in the header and the
        # verdict (①'s ≈ $2,579, tone "bad", is red too)
        rate = f"__{SS_PCT_S}%__"
        record(key, "6.2% red (__x__) in the header and the verdict", (rate in spec["header"], rate in spec["verdict"]["text"]),
               (True, True), rate in spec["header"] and rate in spec["verdict"]["text"] and f"**{SS_PCT_S}%**" not in spec["header"])
        # Becker port: the verdict breaks between its two sentences (one line each), never inside "A $1M salary pays"
        record(key, "verdict breaks between its sentences", spec["verdict"]["text"].split("\n"),
               "['You pay …%__.', 'A $1M salary pays …']", spec["verdict"]["text"].count("\n") == 1
               and spec["verdict"]["text"].split("\n")[0].endswith("__.") and spec["verdict"]["text"].split("\n")[1].startswith(f"A {B_RIVAL_S} salary pays"))
    wg = lo.get("wrongGuess")
    if wg:
        record(key, "wrongGuess.t on the VO line that voices it", wg["t"],
               "a vo t", any(abs(wg["t"] - line["t"]) < 1e-9 for line in vo))
        wa = ANCHORS[key].get("wrongGuess")
        record(key, "wrongGuess anchored in ANCHORS", bool(wa), True, bool(wa))
        for what, (ln, tok) in (wa or {}).items():
            est = anchor_time(vo, ln, tok)
            ok = est is not None and abs(wg[what] - est) <= (1e-9 if tok is None else ANCHOR_TOL)
            record(key, f"wrongGuess.{what} at VO mention", wg[what],
                   f"VO never says {tok!r}" if est is None else f"{est:.2f}" + ("" if tok is None else f"±{ANCHOR_TOL}"), ok)
        r = wg["item"]
        record(key, "wrongGuess types before its row's real formula", wg["t"], f"< {items[r]['t']}", wg["t"] < items[r]["t"])
        record(key, "wrongGuess lands, then is struck", (wg["resultT"], wg["strikeT"]), "t + typeDur ≤ resultT < strikeT",
               wg["t"] + type_dur <= wg["resultT"] < wg["strikeT"])
        record(key, "wrongGuess struck before the real result lands", wg["strikeT"], f"< {items[r]['resultT']}",
               wg["strikeT"] < items[r]["resultT"])
        gv, (gs, gdp, gsc) = eval_formula(wg["formula"]), display_value(wg["result"])
        record(key, f"wrongGuess '{wg['formula']}' = shown, exact", wg["result"], show(gv * gsc, gdp, gsc),
               abs(gv * gsc - gs) < 1e-9)


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
            months2 = sum(1 for m in range(1, 13) if sum(1 for x in in_year if x.month == m) == 2)
            counts.setdefault(n, []).append(months3)
            assert months3 == n - 24 and months2 + months3 == 12, (y, n, months2, months3)
    record("01a", "26-payday years → exactly 2 three-check months", sorted(set(counts[26])), [2], set(counts[26]) == {2})
    record("01a", "27-payday years → exactly 3 three-check months", sorted(set(counts[27])), [3], set(counts[27]) == {3})
    share = len(counts[27]) / (len(counts[26]) + len(counts[27]))
    record("01a", "27-payday years ≈ 1 in 11 (pinned comment)", f"1 in {1 / share:.1f}", "1 in 10-12",
           10 <= 1 / share <= 12)
    eq("01a", "27-payday year pay (pinned comment)", money(A_27), "$67,500")
    eq("01a", "13 months = year ÷ a normal month", A_YEAR / A_MONTH, 13.0)
    eq("01a", "② note: a normal month × 12 = ③'s $60,000 = the × 24 guess", (A_MONTH * MONTHS, A_PAY * A_SEMI),
       (A_WRONG, A_WRONG))
    eq("01a", "check line: 10 two-payday months × 2 + 2 three-payday months × 3 = the 26 in ①",
       A_NORMAL_MONTHS * 2 + A_EXTRA * 3, A_PAYDAYS)
    eq("01a", "③'s label: 26 − 24 = the 2 checks = ③ ÷ $2,500 = the check line's 2 three-payday months",
       (A_PAYDAYS - A_SEMI, A_LEFT // A_PAY), (A_EXTRA, A_EXTRA))
    eq("01a", "① note: $2,500 × 24 = $60,000 = ③'s $60,000", A_PAY * A_SEMI, A_WRONG)
    eq("01a", "a normal month happens 10 times a year (check line)", A_NORMAL_MONTHS, 10)
    eq("01a", "verdict: ② and ③ both show a month of pay ($65,000 = 13 × $5,000)", (A_MONTH, A_LEFT, A_YEAR // A_MONTH),
       (A_MONTH, A_MONTH, A_MONTHS_OF_PAY))

    # 01b: the Social Security wage cap (2026, employee share)
    close("01b", "Social Security on $41,600 (6.2%)", round(B_SS, 2), 2579.20, 0.005)
    record("01b", "'on every dollar, all year': $41,600 under the cap", B_YEAR, f"< {SS_WAGE_BASE:,}", B_YEAR < SS_WAGE_BASE)
    record("01b", "the cap binds for the $1M salary", B_RIVAL, f"> {SS_WAGE_BASE:,}", B_RIVAL > SS_WAGE_BASE)
    close("01b", "flat-rate guess: $1,000,000 × 6.2% (struck)", round(B_WRONG, 2), 62_000.00, 0.005)
    close("01b", "real: $184,500 × 6.2%", round(B_CAPPED, 2), 11_439.00, 0.005)
    close("01b", "their rate: $11,439 ÷ $1,000,000 (%)", round(B_RATE, 4), 1.1439, 1e-9)
    record("01b", "'more than five times their rate'", f"{B_TIMES:.2f}×", "5 < x < 6", 5 < B_TIMES < 6)
    record("01b", "'more than five times' also on the shown ≈ 1.1%", f"{SS_PCT / B_RATE_D:.2f}×", "> 5",
           SS_PCT / B_RATE_D > 5)
    eq("01b", "pinned: pay ratio $1M ÷ $41,600", f"{B_RIVAL / B_YEAR:.0f}×", "24×")
    eq("01b", "pinned: Social Security dollars ratio $11,439 ÷ $2,579.20", f"{B_CAPPED / B_SS:.1f}×", "4.4×")

    # 01c: the bracket maths against the full 2026 federal tax, the pinned comment, the salary window
    eq("01c", "3% of $65,000 = a $1,950 raise", C_RAISE, 1950)
    record("01c", "$65,000 sits in the 12% bracket, $66,950 in 22%", (bracket_rate(C_SALARY)[0], bracket_rate(C_NEW)[0]),
           (0.12, 0.22), bracket_rate(C_SALARY)[0] == 0.12 and bracket_rate(C_NEW)[0] == 0.22)
    eq("01c", "22% line in pay = $50,400 + $16,100", C_LINE, 66_500)
    fed0, fed1 = fed_tax(C_SALARY), fed_tax(C_NEW)
    close("01c", "2026 federal tax on $65,000 (single)", round(fed0, 2), 5620.00, 0.005)
    close("01c", "2026 federal tax on $66,950 (single)", round(fed1, 2), 5899.00, 0.005)
    close("01c", "federal tax on the raise = 12% × $1,500 + 22% × $450", round(fed1 - fed0, 2),
          round(C_LO * (C_LINE - C_SALARY) + C_HI * C_OVER, 2), 0.005)
    close("01c", "raise's tax − the same raise all at 12% = the $45 shown", round(fed1 - fed0 - C_LO * C_RAISE, 2),
          float(C_COST), 0.005)
    # the rule on screen holds for every salary a 3% raise carries across the line
    lo_s = -(-C_LINE * 100 // (100 + C_PCT))     # smallest whole salary whose 3% raise passes $66,500
    worst = max(abs((fed_tax(x * 1.03) - fed_tax(x) - C_LO * x * 0.03) - C_PTS / 100 * (x * 1.03 - C_LINE))
                for x in range(lo_s, C_LINE, 25))
    record("01c", f"(new pay − $66,500) × 10% = bracket cost, salaries {money(lo_s)}-{money(C_LINE - 1)}",
           f"max error {money(worst, 2)}", "$0.00", worst < 0.005)
    eq("01c", "salary window where a 3% raise crosses the line (write-up)", (money(lo_s), money(C_LINE - 1)),
       ("$64,564", "$66,499"))
    fica_r = fica(C_NEW) - fica(C_SALARY)
    record("01c", "raise below the Social Security wage base", C_NEW, f"≤ {SS_WAGE_BASE:,}", C_NEW <= SS_WAGE_BASE)
    eq("01c", "FICA on the raise, half-up to 1¢ (pinned comment)", money(rnd(fica_r, 2), 2), "$149.18")
    eq("01c", "federal tax on the raise (pinned comment)", money(fed1 - fed0), "$279")
    eq("01c", "raise kept after federal + FICA (pinned ≈ $1,522)", money(rnd(C_RAISE - (fed1 - fed0) - fica_r)), "$1,522")
    myth = (C_NEW - STD_DED) * C_PTS / 100
    eq("01c", "myth: all taxed pay 10 points more (pinned comment)", money(myth), "$5,085")
    record("01c", "R12 lopsided: myth ÷ real", f"{myth / C_COST:.0f}×", "≥ 100×", myth / C_COST >= 100)
    med = 1_251 * WEEKS
    record("01c", "$65,000 vs BLS Q2 2026 median full-time pay ($1,251 × 52)", f"{money(med)} ({abs(C_SALARY - med) / med:.2%} off)",
           "within 0.5%", abs(C_SALARY - med) / med <= 0.005)
    record("01c", "'Not your whole raise': share of the raise taxed 22%", f"{C_OVER / C_RAISE:.0%}", "< 50%",
           C_OVER / C_RAISE < 0.5)


def main():
    for key, path in RETIRED.items():
        record(key, "pre-port spec retired (studio/specs/retired/)", path.name, "present",
               path.exists() and not (SPECS / path.name).exists())
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
