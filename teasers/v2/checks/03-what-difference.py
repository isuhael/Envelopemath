#!/usr/bin/env python3
"""Maths + spec check for format 3, "what-difference" (teasers 03a, 03b, 03c).

1. Recomputes every on-screen number from its sourced inputs (named constants below):
   - 03a: a $44,000 car loan at 7% APR over 72 months, simple interest charged daily,
     paid monthly / biweekly / weekly / weekly rounded up to $200;
   - 03b: a $5,000 card balance at 22% APR, no new charges, paid with the issuer minimum
     (Chase formula) / the first minimum ($142.59) held flat / a flat $250 (a flat $150 is
     checked for the pinned comment);
   - 03c: a $400,000 30-year mortgage at 7.3%, with $0 / $100 / $500 extra a month.
2. Loads the three spec JSONs and asserts that
   - every display string the maths produces (option details, payoff, interest, deltas,
     verdict) equals the spec exactly,
   - every number inside every other string (header, footer, stake, names, lookOpts,
     VO lines) equals the computed, formatted value, in order,
   - rounded results carry "≈" on screen and "about" in the VO; exact ones carry neither,
   - every string in the spec that contains a digit is covered by a check,
   - shown deltas equal the difference of the shown totals (no rounding drift),
   - the contract shape of FORMATS.md section 3 (stake, metrics, 2-4 options, winner, hold),
   - hook rules that can be tested mechanically: a number in the header at t = 0 (R1),
     exactly one dollar figure in the header (R2), header <= 15 words (R8), the baseline
     option's results already on screen at frame 1 (R1/R10),
   - timing: VO read at ~2.6 spoken words per second, lines don't overlap, each later option
     lands within 0.9 s of the word that names it (its landing = option.resultT when the kit
     reads one, else option.t), every lookOpts step (lever, footerSteps, checkT) sits on a beat,
     no spec-level sfx (each kit cues its own landings), duration in the 20-40 s lane,
     hold = duration - last VO end, verdict.t = last VO line t.
3. Prints a table and exits 1 on any mismatch.

Revision 2 (2026-10-07, after the verifier and hook-judge reviews): specs rebuilt against the
shipped kit APIs (live-sheet lookOpts.formulas/lever, clean-sheet option.resultT, scoreboard
option.resultT + footerSteps), new hooks and VO, Experian figures dropped (not verifiable).
Hook pass (2026-10-08): 03b adopts hook B ("paying the SAME minimum every month"): option 2 is
now the first minimum held flat (57 payments), option 1 carries the typed note "$142.59 → $99.66
by year 3" (the month-36 minimum), the verdict is "$0 more ... ≈ 10 years sooner", and the
caption states no interest saving (shown 7,300 − 3,100 = 4,200 would drift from the exact ≈ 4,300).
Assembly pass (2026-10-08): no number or wording changed. New timing fields are checked: lookOpts.reads (03a, 03b:
the sheet marks a value already on screen as the VO speaks it; 03c: the hero bumps as the VO speaks its frame-1
score) and option.deltaT (03c: each delta slams in on its spoken number), each within 0.25 s of its anchor word and marking the value that word speaks. The 03a workings and
lever carry a "\n" (a forced break before "= $9,752.08 a year" and "13 payments"); the token checks ignore it.
Port (2026-10-08): the owner kept two looks, so 03a moved from Live Sheet to Becker Rig
(03a-becker-rig-car-loan-weekly) and 03b from Clean Sheet to Scoreboard (03b-scoreboard-card-minimum); the old specs
are in studio/specs/retired/. No number, VO line or verdict changed. Look-specific checks:
   - 03a (Becker Rig): option.t is the lane's WAKE (on the word that names it) and option.resultT the crate's payoff
     landing (on the word that speaks it); the money value lands 0.45 s later (the round-up lane's counts down from
     the baseline's and settles on "$1,800"); working-slot lines pop whole at their t (no typing), each by its word and
     no more than 0.8 s early, and each holds >= 2 s; the footer is one line ("Daily interest, posted when paid");
   - 03b (Scoreboard): option.t is the hard cut (on the word that names it), option.resultT the race's landing (on the
     payoff's word, lookOpts.keepSpeed: the race keeps the shared speed); the hero rolls the payoff metric and lands the
     winner's "≈ 10 years sooner" on "ten" (data.winnerT = option.deltaT); reads bump the hero ("fifteen") or a row cell
     ("$7,300", "$3,100"); lookOpts.labelSteps carry the shrink note at frame 1 (it was option.note), "More than the
     $5,000 owed" on "More" and "$0 more than the first minimum" on "dollar".
Port QA fixer pass (2026-10-08): no number, VO line or verdict changed.
   - 03a: a slot step "= 72 − 60 ≈ 12 months / ≈ 1 year sooner" by "year" (a − b = c on the shown values; ≈ because
     60 is rounded), a read of Round up's crate on "year", the winner's time-saved label "≈ 12 mo" (lookOpts.gapLabel:
     the same ≈ 12, months being the crate metric's unit), a read of Monthly's crate on "twelve" ("not 12": Monthly is
     the 12-payments-a-year lane, outside the lever), a second lever beat on "thirteen", and the waiting figures' pat on
     "this loan" (lookOpts.pat, before the scan);
   - 03b: no option carries a delta any more (the verdict alone says "≈ 10 years sooner"; ③'s "≈ 13 years sooner" is
     write-up only); lookOpts.heroEnd "value": the winner beat rolls the hero from ①'s ≈ 15.1 down to ②'s own ≈ 4.8 and
     lands on "ten" (data.winnerT), the shown gap 15.1 − 4.8 rounding to the verdict's ≈ 10.

Two cuts per teaser (condensed cut, 2026-10-13: the owner's "too many still moments are a killer for a short;
condense the rest. The CTA (end card) is good", the 06b/06c precedent). A spec is checked against one of two
expectation sets, picked by its duration:
   - the round-2 cut (narration-paced VO lines; 37.2 / 30.6 / 29.8 s): what studio/specs/ holds and renders/channel/
     ships today (IN_SPECS names the cut studio/specs/ must hold). Its rules are the ones listed above.
   - the condensed cut (studio/specs-wip/<id>.json; bodies of 14-17 / 10.5-13 / 11.5-14 s + the 2.5 s end card). Every
     number and display string is the round-2 cut's (03a times its first three formulas itself and keeps the round-2
     steps[3], a repeat of formulas[3], at the verdict for the hidden last caption; 03b re-slams its frame-1 note on
     "Because it shrinks"; 03c merges its first two captions, word for word). Its timing rules replace the narration
     rules (check_cond), with the fixer pass's (2026-10-13, critic) on top: 03a's scan ripple runs until Monthly's
     caption, the hook caption is not held past its floor, Monthly's working pops with the ≈ $10,000 read late in its
     caption, the $1,800 working pops inside the count-down, a compare read of ≈ $10,000 and ≈ $8,200 follows it, and
     the verdict hold carries the "$12 more a week" and "≈ 1 year" lines (>= 0.7 s each); 03b's "More than the $5,000
     owed" is up >= 0.5 s at full strength before the compare read dims it; 03c's "sooner" label steps are up >= 1.0 s
     before their deltas (the bar-label read between them) and its "× 360" footer working holds >= 1.6 s. The base
     rules: each caption up >= max(1.2 s, 0.12 s a
     word) from frame 1, back to back (gaps < 0.2 s), the hook caption complete on frame 1 (Becker Rig pre-types a line
     that starts early enough; a Scoreboard line has finished its 0.14 s rise), something moving from frame 2, every
     beat (wake, cut, landing, read, step, label step, delta, lever) inside the caption that carries its number and after
     the value it marks is on screen, the shared race speed, a proxy for the motion audit (the kits' motion windows leave
     no gap of 0.4 s before the verdict), the verdict 0.8-1.5 s after the final reveal and held 1.2-1.6 s before the end
     card, and the look options that carry the motion (03a: the scan from frame 2, the lever's beats; 03b/03c: a
     Scoreboard `readHold` of 0.05-0.3 s).

Run:  python3 teasers/v2/checks/03-what-difference.py                  (the specs in studio/specs/)
      python3 teasers/v2/checks/03-what-difference.py --spec studio/specs-wip/03a-becker-rig-car-loan-weekly.json ...
      --spec [KEY=]PATH (repeatable) checks PATH in place of studio/specs/<id>.json. KEY is a, b or c (or 03a/03b/03c,
      or the full id); without it the file's stem must be one of the three ids. A round-2-length spec is checked as the round-2 cut, any
      other as the condensed cut (and fails its lane unless it is one).
"""
import json
import math
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.path.join(ROOT, "studio", "specs")
WPS = 2.6            # VO read speed, spoken words per second
LANE = (20.0, 40.0)  # duration lane for this format (task brief)
BEAT_TOL = 0.9       # an option must land within this many seconds of the word that names it
FIRST_VALUES_BY = 3.0  # R10: the first option's values are on screen by this time

# ---- the two cuts (see the docstring): picked by the spec's duration
IDS = {"a": "03a-becker-rig-car-loan-weekly", "b": "03b-scoreboard-card-minimum", "c": "03c-scoreboard-mortgage-extra-100"}
R2_DURATION = {"a": 37.2, "b": 30.6, "c": 29.8}          # the round-2 cut's body (s)
IN_SPECS = {"a": "r2", "b": "r2", "c": "r2"}               # the cut studio/specs/ must hold ("cond" once promoted)
CUT_NAME = {"r2": "round-2 cut (narration-paced)", "cond": "condensed cut (2026-10-13)"}
# condensed-cut targets (the editor's brief for the owner's note, as for 06b/06c)
COND_LANE = {"a": (14.0, 17.0), "b": (10.5, 13.0), "c": (11.5, 14.0)}   # body (s), plus the 2.5 s end card
CAP_MIN, CAP_SPW = 1.2, 0.12     # captions (no narration): up >= 1.2 s a line, >= 0.12 s a word at phone size
CAP_GAP = 0.2                    # captions run back to back: each gap < 0.2 s
STILL_MAX = 0.4                  # the scheduled motion never leaves this long a gap before the verdict
VERDICT_AFTER = (0.8, 1.5)       # the verdict lands this long after the final reveal
VERDICT_HOLD = (1.2, 1.6)        # and holds this long before the end card
SLOT_HOLD_COND = 1.0             # 03a: a working-slot line holds >= 1.0 s (a 2-line mono working, read with its caption)
FRAME = 1 / 30


def parse_spec_args(argv):
    """--spec [KEY=]PATH (repeatable) -> {sid: abs path}; see the module docstring"""
    out, i = {}, 0
    while i < len(argv):
        a = argv[i]
        if a in ("-h", "--help"):
            print(__doc__)
            sys.exit(0)
        if a == "--spec" or a.startswith("--spec="):
            if a == "--spec":
                i += 1
                v = argv[i] if i < len(argv) else ""
            else:
                v = a.split("=", 1)[1]
            if not v:
                sys.exit("--spec needs a path")
            # (fixer pass: KEY may also be the full id, as in 02-find-your-row.py)
            keys = {**{k: k for k in IDS}, **{f"03{k}": k for k in IDS}, **{sid: k for k, sid in IDS.items()}}
            head, eq, tail = v.partition("=")
            if eq and head in keys:
                key, path = keys[head], tail
            elif eq and not os.path.exists(v):
                sys.exit(f"--spec {v}: KEY {head!r} is not one of {', '.join(keys)}")
            else:
                path = v
                stem = os.path.splitext(os.path.basename(v))[0]
                key = next((k for k, s_ in IDS.items() if s_ == stem), None)
                if key is None:
                    sys.exit(f"--spec {v}: the file stem is not one of {sorted(IDS.values())}; pass KEY=PATH "
                             f"(KEY: {', '.join(keys)})")
            if not os.path.isfile(path):
                sys.exit(f"--spec {v}: no such file")
            out[IDS[key]] = os.path.abspath(path)
        else:
            sys.exit(f"unknown argument {a!r}; usage: 03-what-difference.py [--spec [KEY=]PATH ...]")
        i += 1
    return out


SPEC_PATHS = {s_: os.path.join(SPECS, s_ + ".json") for s_ in IDS.values()}
SPEC_PATHS.update(parse_spec_args(sys.argv[1:]))
KEY_OF = {s_: k for k, s_ in IDS.items()}

# ============================================================== sourced inputs
# Searches run 2026-10-07; publisher pages are listed in teasers/v2/03-what-difference.md.

# 03a. Edmunds Q3 2026 (Oct 2026): avg amount financed, new vehicles $44,664; avg APR 7.0%;
#      avg term "past 70 months"; 25.5% of new loans at 84 months or more. Edmunds Q2 2026
#      (AP): $44,156 at 7.0%. $44,000 = a round loan just under both quarterly averages (it is
#      NOT their rounding: $44,664 rounds to $45,000), so the screen says "New-car loan" and
#      the caption says "≈ the average". 7% = Edmunds; 72 months = the standard term just
#      above the "past 70 months" average. (Revision 2 dropped the Experian Q2 2026 figures:
#      the verifier could not confirm them and a fresh search returned different numbers.)
EDMUNDS_Q3_AMOUNT, EDMUNDS_Q3_APR = 44_664, 0.070
EDMUNDS_Q2_AMOUNT = 44_156
CAR_P, CAR_APR, CAR_N = 44_000, 0.07, 72
CAR_WHATIF_APRS = (0.06, 0.08)   # unsourced what-if rates for the sensitivity line (write-up)
CAR_ROUND_UP = 200          # the weekly payment rounded up to the next round number

# 03b. Federal Reserve G.19, Q2 2026: commercial-bank rate on credit card plans, accounts
#      assessed interest 22.15% (Q1 2026: 21.52%). Bankrate weekly average (Aug 2026): 19.56%
#      (new-card offers; used as the low sensitivity case). Minimum payment = Chase cardmember
#      agreement: the larger of $40 (or the balance if less) or 1% of the new balance plus
#      the interest billed.
FED_G19_Q2_2026 = 0.2215
BANKRATE_AUG_2026 = 0.1956
CARD_B, CARD_APR = 5_000, 0.22
MIN_PCT, MIN_FLOOR = 0.01, 40
CARD_FLATS = (150, 250)

# 03c. Freddie Mac PMMS, Oct 1 2026: 30-yr fixed 7.28% (prior week 7.03%). MBA Weekly Survey,
#      week ending Sep 25 2026: 30-yr conforming contract rate 7.30%. Both round to 7.3%.
#      Loan: $400,000, a round figure just under the NAR median existing-home price for
#      Aug 2026 ($429,100), i.e. about 7% down.
FREDDIE_OCT1_2026, MBA_SEP25_2026 = 0.0728, 0.0730
NAR_MEDIAN_AUG_2026 = 429_100
MORT_P, MORT_APR, MORT_N = 400_000, 0.073, 360
MORT_EXTRAS = (0, 100, 500)

# ============================================================== formatting

def D(x):
    return Decimal(repr(x))

def rnd(x, step):
    """Round half-up to a multiple of step (step may be 0.01 or 0.1)."""
    q = (D(x) / D(step)).quantize(Decimal("1"), rounding=ROUND_HALF_UP)
    return float(q * D(step))

def c2(x):
    """Round to the cent, half-up (statement arithmetic)."""
    return rnd(x, 0.01)

def ceil_cent(x):
    return math.ceil(round(x * 100, 6)) / 100

def is_exact(x, shown):
    return abs(x - shown) < 1e-6

def money(x, step=1, approx_sign=True):
    shown = rnd(x, step)
    dp = 2 if step < 1 else 0
    s = f"${shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def num(x, dp=0, approx_sign=True):
    shown = rnd(x, 10 ** -dp) if dp else rnd(x, 1)
    s = f"{shown:,.{dp}f}"
    if approx_sign and not is_exact(x, shown):
        s = "≈ " + s
    return s

def pct(p, dp=0):
    return f"{p * 100:.{dp}f}%"

def bare(s):
    return s.replace("≈ ", "")

def val(s):
    """Numeric value of a display string such as '≈ $8,900' or '≈ 26.7 years'."""
    return float(re.search(r"[\d,]+(?:\.\d+)?", s).group(0).replace(",", ""))

# ============================================================== models

# ---- 03a: car loan, simple interest charged daily (APR / 365 per day), interest rounded to
# the cent each period, each payment applied the day it is paid. A month = 365/12 days, so a
# monthly period charges exactly APR/12.
DAYS_MONTH = 365 / 12

def car_payment(P, apr, n):
    r = apr / 12
    return c2(P * r / (1 - (1 + r) ** -n))

def car_run(P, apr, pay, days):
    b, n, interest = float(P), 0, 0.0
    while b > 0.004:
        i = c2(b * apr * days / 365)
        p = min(pay, c2(b + i))
        b = c2(b + i - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "months": n * days / DAYS_MONTH}

CAR_PMT = car_payment(CAR_P, CAR_APR, CAR_N)
CAR_BIWK = c2(CAR_PMT / 2)
CAR_WK = c2(CAR_PMT / 4)
CAR = {
    "monthly": car_run(CAR_P, CAR_APR, CAR_PMT, DAYS_MONTH),
    "biweekly": car_run(CAR_P, CAR_APR, CAR_BIWK, 14),
    "weekly": car_run(CAR_P, CAR_APR, CAR_WK, 7),
    "rounded": car_run(CAR_P, CAR_APR, CAR_ROUND_UP, 7),
}
CAR_YEAR_MONTHLY = 13 * CAR_PMT          # 13 monthly payments
CAR_YEAR_BIWK = 26 * CAR_BIWK
CAR_YEAR_WK = 52 * CAR_WK
CAR_YEAR_ROUND = 52 * CAR_ROUND_UP
CAR_SIMPLE_INT = CAR_PMT * CAR_N - CAR_P   # formula-bar shortcut: payments - principal
CAR_SAVE = {k: CAR["monthly"]["interest"] - v["interest"] for k, v in CAR.items()}
CAR_WK_VS_BIWK = CAR["biweekly"]["interest"] - CAR["weekly"]["interest"]
CAR_ROUND_EXTRA_WK = CAR_ROUND_UP - CAR_WK
CAR_ROUND_EXTRA_YR = CAR_YEAR_ROUND - CAR_YEAR_WK
CAR_ROUND_SOONER_YRS = (CAR["monthly"]["months"] - CAR["rounded"]["months"]) / 12

def car_case(apr, P=CAR_P):                 # sensitivity (write-up)
    pm = car_payment(P, apr, CAR_N)
    out = {"monthly": car_run(P, apr, pm, DAYS_MONTH), "biweekly": car_run(P, apr, c2(pm / 2), 14),
           "weekly": car_run(P, apr, c2(pm / 4), 7), "rounded": car_run(P, apr, CAR_ROUND_UP, 7)}
    return pm, out

# ---- 03b: credit card, interest billed monthly at APR/12 (rounded to the cent), no new
# charges. Minimum (Chase cardmember agreement): the larger of $40 or 1% of the new balance
# plus the interest billed; the whole balance when it is under $40.
def card_min(nb, i):
    if nb <= MIN_FLOOR:
        return nb
    return max(MIN_FLOOR, c2(MIN_PCT * nb + i))

def card_run(B, apr, rule):
    b, n, interest, first, pays = float(B), 0, 0.0, None, []
    while b > 0.004:
        i = c2(b * apr / 12)
        nb = c2(b + i)
        p = min(rule(nb, i), nb)
        first = p if first is None else first
        pays.append(p)
        b = c2(nb - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "years": n / 12, "first": first, "pays": pays}

def card_case(apr):
    out = {"min": card_run(CARD_B, apr, card_min),
           150: card_run(CARD_B, apr, lambda nb, i: 150),
           250: card_run(CARD_B, apr, lambda nb, i: 250)}
    first = out["min"]["first"]
    out["flat1"] = card_run(CARD_B, apr, lambda nb, i: first)   # the first minimum held flat
    return out

CARD = card_case(CARD_APR)
CARD_FIRST_MIN = CARD["min"]["first"]
CARD_150_OVER_MIN = 150 - CARD_FIRST_MIN
CARD_SOONER = {k: CARD["min"]["years"] - CARD[k]["years"] for k in CARD_FLATS}
CARD_SAVE_150 = CARD["min"]["interest"] - CARD[150]["interest"]
CARD_FLAT_FIRST = CARD["flat1"]                     # option 2: keep paying the first minimum ($0 more)
CARD_SOONER_F1 = CARD["min"]["years"] - CARD_FLAT_FIRST["years"]
CARD_SAVE_F1 = CARD["min"]["interest"] - CARD_FLAT_FIRST["interest"]
CARD_NOTE_MONTH = 36                                # option 1's note: the minimum at the end of year 3
CARD_MIN_AT_NOTE = CARD["min"]["pays"][CARD_NOTE_MONTH - 1]

# ---- 03c: mortgage, standard monthly amortisation at APR/12, interest rounded to the cent,
# scheduled payment rounded up to the cent (so 360 payments clear it), extra goes to principal.
MORT_R = MORT_APR / 12
MORT_PMT = ceil_cent(MORT_P * MORT_R / (1 - (1 + MORT_R) ** -MORT_N))

def mort_run(P, pmt, extra):
    b, n, interest, extra_in = float(P), 0, 0.0, 0.0
    while b > 0.004:
        i = c2(b * MORT_R)
        p = min(pmt + extra, c2(b + i))
        extra_in += max(0.0, p - pmt)
        b = c2(b + i - p)
        interest += i
        n += 1
    return {"n": n, "interest": interest, "years": n / 12, "extra_in": extra_in}

MORT = {x: mort_run(MORT_P, MORT_PMT, x) for x in MORT_EXTRAS}
MORT_SAVE = {x: MORT[0]["interest"] - MORT[x]["interest"] for x in MORT_EXTRAS}
MORT_SOONER_YRS = {x: MORT[0]["years"] - MORT[x]["years"] for x in MORT_EXTRAS}
MORT_SOONER_MO = {x: MORT[0]["n"] - MORT[x]["n"] for x in MORT_EXTRAS}
MORT_SIMPLE_INT = MORT_PMT * MORT_N - MORT_P          # footer shortcut
MORT_PER_DOLLAR = MORT_SAVE[100] / MORT[100]["extra_in"]
MORT_FULL_EXTRAS = round(MORT[100]["extra_in"] / 100)   # months in which the full $100 extra went in

def mort_case(apr):                                    # sensitivity (write-up)
    r = apr / 12
    pmt = ceil_cent(MORT_P * r / (1 - (1 + r) ** -MORT_N))
    out = {}
    for x in MORT_EXTRAS:
        b, n, interest = float(MORT_P), 0, 0.0
        while b > 0.004:
            i = c2(b * r)
            p = min(pmt + x, c2(b + i))
            b = c2(b + i - p)
            interest += i
            n += 1
        out[x] = (n, interest)
    return pmt, out

# ============================================================== expectations
# path -> ("exact", "string")  or  ("tokens", ["tok", ...])

def T(*toks):
    return ("tokens", list(toks))

def E(s):
    return ("exact", s)

def months_disp(m):
    return f"{num(m)} months"

def years_disp(y, dp=1):
    return f"{num(y, dp)} years"

expect, vo_expect, beats, steps = {}, {}, {}, {}

# ---- 03a
ida = "03a-becker-rig-car-loan-weekly"
car_keys = ["monthly", "biweekly", "weekly", "rounded"]
ea = {
    "header": T(money(CAR_P)),
    "footer": T(),                                     # "ASSUMES daily interest, posted when paid"
    "data.stake.value": E(money(CAR_P)),
    "data.stake.terms": E(f"{pct(CAR_APR)} APR · {CAR_N} months"),
    # fixer pass: each header is two lines, the name over the bare payment (the name says how often)
    "data.options[0].detail": E(money(CAR_PMT, 0.01)),
    "data.options[1].detail": E(money(CAR_BIWK, 0.01)),
    "data.options[2].detail": E(money(CAR_WK, 0.01)),
    "data.options[3].detail": E(money(CAR_ROUND_UP)),
    # fixer pass: the verdict keeps the lever and the year (56 px); "≈ $1,800 less" is the bar step at 27.8 s
    "verdict.text": T(money(CAR_ROUND_UP), num(CAR_ROUND_SOONER_YRS)),
    # live-sheet: one working per option (formulas[0] belongs to the pre-filled baseline column, which the
    # kit never re-types), plus the lever line retyped into the bar at lever.t
    "lookOpts.formulas[0]": T(money(CAR_PMT, 0.01), str(CAR_N), money(CAR_P), money(CAR_SIMPLE_INT, 100)),
    "lookOpts.formulas[1]": T(money(CAR_BIWK, 0.01), "26", money(CAR_YEAR_BIWK, 0.01)),
    "lookOpts.formulas[2]": T(money(CAR_WK, 0.01), "52", money(CAR_YEAR_WK, 0.01)),
    "lookOpts.formulas[3]": T(money(CAR_WK, 0.01), money(CAR_ROUND_EXTRA_WK, 0.01), money(CAR_ROUND_UP)),
    "lookOpts.lever.text": T("13", money(CAR_PMT, 0.01), money(CAR_YEAR_MONTHLY, 0.01), "13", "12"),
    # fixer pass: the differences the VO speaks, typed into the bar (shown totals; the result rounds the exact one)
    "lookOpts.steps[0].text": T(bare(money(CAR["monthly"]["interest"], 100)), bare(money(CAR["biweekly"]["interest"], 100)),
                                money(CAR_SAVE["biweekly"], 100)),
    "lookOpts.steps[1].text": T(money(CAR_WK_VS_BIWK)),
    "lookOpts.steps[2].text": T(bare(money(CAR["monthly"]["interest"], 100)), bare(money(CAR["rounded"]["interest"], 100)),
                                money(CAR_SAVE["rounded"], 100)),
    # port (Becker Rig): the round-up working comes back into the slot as the VO says "about $12 more a week"
    "lookOpts.steps[3].text": T(money(CAR_WK, 0.01), money(CAR_ROUND_EXTRA_WK, 0.01), money(CAR_ROUND_UP)),
    # port QA fixer: the verdict's "about a year" gets its working (shown 72 − shown 60 = 12; "≈" because 60 is rounded)
    "lookOpts.steps[4].text": T(str(CAR["monthly"]["n"]), bare(num(CAR["rounded"]["months"])),
                                num(CAR["monthly"]["months"] - CAR["rounded"]["months"]), num(CAR_ROUND_SOONER_YRS)),
    # ... and the time saved as an object: the winner's flag carries "≈ 12 mo" (months: the crate metric's unit)
    "lookOpts.gapLabel": T(num(CAR["monthly"]["months"] - CAR["rounded"]["months"])),
}
for i, k in enumerate(car_keys):
    run = CAR[k]
    # fixer pass: the unit moved into the row label ("Months to pay off"), so the cell is the bare number
    ea[f"data.options[{i}].values.payoff"] = E(num(run["months"]))
    ea[f"data.options[{i}].values.interest"] = E(money(run["interest"], 100))
expect[ida] = ea
vo_expect[ida] = [
    [],                                                  # "About a year off this loan. Guess which one."
    [(str(CAR["monthly"]["n"]), False), (bare(money(CAR["monthly"]["interest"], 100)), True)],
    [(bare(num(CAR["biweekly"]["months"])), True), (bare(money(CAR_SAVE["biweekly"], 100)), True)],
    [(bare(num(CAR["weekly"]["months"])), True), (bare(money(CAR_WK_VS_BIWK)), True)],
    [("13", False), ("12", False)],
    [(money(CAR_ROUND_UP), False)],
    [(bare(num(CAR["rounded"]["months"])), True), (bare(money(CAR_SAVE["rounded"], 100)), True)],
    [(bare(money(CAR_ROUND_EXTRA_WK)), True)],
]
# (option, VO line, word): option 0 is the pre-filled baseline (on screen before any word names it)
beats[ida] = [(1, 2, "Biweekly"), (2, 3, "Weekly"), (3, 5, "round")]
# VO lines that say "about a year" (no digit, so the token checks can't see them): they rest on the
# CAR_ROUND_SOONER_YRS claim below
year_lines = {ida: [0, 7]}

# ---- 03b
idb = "03b-scoreboard-card-minimum"
FIRST_S = money(CARD_FIRST_MIN, 0.01)
eb = {
    "header": T(money(CARD_B)),
    "footer": T(pct(CARD_APR), pct(MIN_PCT), money(MIN_FLOOR)),
    "data.stake.value": E(money(CARD_B)),
    "data.stake.terms": E(f"{pct(CARD_APR)} APR · no new charges"),
    "data.options[0].detail": E(f"starts at {FIRST_S}, then shrinks"),
    # hook pass: the shrink proved in numbers in the first 1.5 s (the minimum at the end of year 3). Port (Scoreboard):
    # it was option 1's typed note; it is now the label stack's line 2 at frame 1
    "lookOpts.labelSteps[0].text": E(f"{FIRST_S} → {money(CARD_MIN_AT_NOTE, 0.01)} by year {CARD_NOTE_MONTH // 12}"),
    # port: the two lines the Clean Sheet answered with reads (the header's $5,000 re-swipe, the "$0 more" working)
    "lookOpts.labelSteps[1].text": E(f"More than the {money(CARD_B)} owed"),
    "lookOpts.labelSteps[2].text": E(f"{money(0)} more than the first minimum"),
    "data.options[0].values.payoff": E(years_disp(CARD["min"]["years"])),
    "data.options[0].values.interest": E(money(CARD["min"]["interest"], 100)),
    # option 2 = the lever the hook asks about: the first minimum held flat, $0 more
    "data.options[1].name": E(f"Keep paying {FIRST_S}"),
    "data.options[1].detail": E(f"{FIRST_S} − {FIRST_S} = {money(0)} more"),
    "data.options[1].values.payoff": E(years_disp(CARD_FLAT_FIRST["years"])),
    "data.options[1].values.interest": E(money(CARD_FLAT_FIRST["interest"], 100)),
    "data.options[2].name": E(f"A flat {money(250)}"),
    "data.options[2].detail": E(f"{money(250)} − {FIRST_S} = {money(250 - CARD_FIRST_MIN, 0.01)} more"),
    "data.options[2].values.payoff": E(years_disp(CARD[250]["years"])),
    "data.options[2].values.interest": E(money(CARD[250]["interest"], 100)),
    "verdict.text": T(money(0), num(CARD_SOONER_F1)),
}
expect[idb] = eb
vo_expect[idb] = [
    [(money(CARD_B), False), (bare(num(CARD["min"]["years"])), True)],   # "Minimum on $5,000: about 15 years. Because it shrinks."
    [(bare(money(CARD["min"]["interest"], 100)), True)],
    [],                                                                    # "Now keep paying the first one."
    [],                                                                    # "Not a dollar more than your first minimum."
    [(bare(num(CARD_FLAT_FIRST["years"], 1)), True), (bare(money(CARD_FLAT_FIRST["interest"], 100)), True)],
    [(money(250), False), (bare(num(CARD[250]["years"], 1)), True)],
    [(bare(num(CARD_SOONER_F1)), True)],                                   # "Same payment: about 10 years sooner."
]
# port (Scoreboard): each option's hard cut on the word that names it; its race lands on the payoff's word (value_beats)
beats[idb] = [(1, 2, "keep"), (2, 5, "flat")]

# ---- 03c
idc = "03c-scoreboard-mortgage-extra-100"
ec = {
    "header": T(money(100), "30"),
    "footer": T(money(MORT_P), pct(MORT_APR, 1), pct(FREDDIE_OCT1_2026, 2), "1"),
    "data.stake.value": E(money(MORT_P)),
    "data.stake.terms": E(f"{pct(MORT_APR, 1)} fixed · {MORT_N // 12} years"),
    # fixer pass: the verdict slot carries the kicker the last VO line speaks; the hero keeps "≈ $78,600 LESS"
    "verdict.text": T(money(100), "$1", money(MORT_PER_DOLLAR, 0.01)),
    # fixer pass: the label stack shows the "sooner" each VO line speaks before its delta slams
    "lookOpts.labelSteps[0].text": T(str(MORT_SOONER_MO[100])),
    "lookOpts.labelSteps[1].text": T(num(MORT_SOONER_YRS[500])),
    "lookOpts.footerSteps[0].text": T(money(MORT_PMT, 0.01), str(MORT_N), money(MORT_P), money(MORT_SIMPLE_INT, 100)),
    "lookOpts.footerSteps[1].text": T(money(MORT_PMT, 0.01), money(100), money(MORT_PMT + 100, 0.01)),
    "lookOpts.footerSteps[2].text": T(money(MORT_PMT, 0.01), money(500), money(MORT_PMT + 500, 0.01)),
    "lookOpts.footerSteps[3].text": T(money(MORT_SAVE[100], 100), money(100), str(MORT_FULL_EXTRAS),
                                       money(MORT_PER_DOLLAR, 0.01)),
}
for i, x in enumerate(MORT_EXTRAS):
    run = MORT[x]
    ec[f"data.options[{i}].detail"] = E(f"{money(MORT_PMT + x, 0.01)} a month")
    ec[f"data.options[{i}].values.payoff"] = E(years_disp(run["years"]) if x else f"{num(run['years'])} years")
    ec[f"data.options[{i}].values.interest"] = E(money(run["interest"], 100))
    if x:
        ec[f"data.options[{i}].name"] = E(f"+{money(x)} a month")
        ec[f"data.options[{i}].delta"] = E(money(MORT_SAVE[x], 100) + " less")
expect[idc] = ec
vo_expect[idc] = [
    [(bare(money(MORT[0]["interest"], 100)), True)],   # "Interest alone: about $587,200."
    [],                                                 # "More than the loan." (claim below)
    [(money(100), False)],
    [(str(MORT_SOONER_MO[100]), False), (bare(money(MORT_SAVE[100], 100)), True)],
    [(money(500), False)],
    [(bare(num(MORT_SOONER_YRS[500])), True), (bare(money(MORT_SAVE[500], 100)), True)],
    [(money(100), False), (bare(money(MORT_PER_DOLLAR, 0.01)), True)],
]
beats[idc] = [(1, 2, "Add"), (2, 4, "Add")]
year_lines[idb] = []
year_lines[idc] = []

# Assembly pass (2026-10-08): the sheet answers the voice. A "read" (live-sheet / clean-sheet lookOpts.reads) puts
# the selection on (live-sheet) or pops (clean-sheet) a value that is already on screen as the VO speaks its number;
# a scoreboard delta slams in (option.deltaT) as the VO speaks it. Each is (target, VO line, anchor words): the read
# or slam must sit within READ_TOL of the anchor, the value it marks must already be on screen, and the anchor
# must speak that value (or, for the 03a "$1,800 less" read, the shown difference that the marked cell makes).
READ_TOL = 0.25
reads_expect = {
    # fixer pass: a pair read marks both ≈ $8,900 cells on "$35" (the same shown total; the VO speaks the exact gap)
    # port (Becker Rig): Round up's crate lands on "60" and its count-down settles on "$1,800" (value_beats), so the two
    # reads that marked its cells are gone
    # port QA fixer: Monthly's crate on "twelve" (the lane that pays 12 a year, against the lever's 13) and Round up's
    # crate on "year" (its shown gap to Monthly's 72 is the verdict's ≈ 1 year)
    ida: [((0, "payoff"), 1, "72"), ((0, "interest"), 1, "$10,000"), (((1, 2), "interest"), 3, "$35"),
          ((0, "payoff"), 4, "12"), ((3, "payoff"), 7, "year")],
    # fixer pass: the stake row is gone (the header shows $5,000; its highlight re-swipes on the stake read), option
    # 2's values land on their words (no reads needed), and its working "$0 more" is marked on "dollar"
    # port (Scoreboard): the hero (holding ≈ 15.1 years) bumps on "fifteen"; row cells on "$7,300" and "$3,100"
    idb: [("hero", 0, "15"), ((0, "interest"), 1, "$7,300"), ((1, "interest"), 4, "$3,100")],
    # scoreboard: a read is the hero (lookOpts.counter "interest") answering the VO while it holds option 0's score
    idc: [("hero", 0, "$587,200")],
}
# (port QA fixer: 03b's options carry no delta; its winner beat is checked with heroEnd below)
delta_beats = {ida: [], idb: [], idc: [(1, 3, "About $78,600"), (2, 5, "About $245,000")]}
pair_exact = {ida: CAR_WK_VS_BIWK}   # the exact gap a pair read's equal cells hide
# fixer pass: clean-sheet values pinned to their words (resultT + valueEvery per metric)
# port: Becker Rig crates (resultT) on the spoken payoff; Scoreboard races (resultT) on the spoken payoff
value_beats = {ida: [((1, "payoff"), 2, "65"), ((2, "payoff"), 3, "65"), ((3, "payoff"), 6, "60")],
               idb: [((1, "payoff"), 4, "4.8"), ((2, "payoff"), 5, "2.2")], idc: []}
# fixer pass: bar steps (03a) and label steps (03c): the number each one carries is on screen by the word that
# speaks it (03a: typed by then, and no more than 0.8 s early; 03c: the slam within 0.25 s of the word)
step_beats = {ida: [(0, 2, "$1,100"), (1, 3, "$35"), (2, 6, "$1,800"), (3, 7, "$12"), (4, 7, "year")], idb: [], idc: [(0, 3, "40"), (1, 5, "11")]}
# port (Scoreboard 03b): label steps (k, VO line, anchor word or None for frame 1)
label_beats = {idb: [(0, 0, None), (1, 1, "More"), (2, 3, "dollar")]}

# ---- condensed cut (2026-10-13): the same strings and numbers, with the paths the condensed specs use
# 03a: formulas[2] carries its own t ({ t, text }: shown after the $1,100 step has been read, not at Weekly's wake);
#      the round-2 steps[3] ("= $187.54 + $12.46 = $200 a week", a repeat of formulas[3] for the last caption, which the
#      verdict card replaces) is dropped, so the "≈ 1 year sooner" working is steps[3]
#      Fixer pass (2026-10-13, critic): formulas[0] and formulas[1] carry their own t too (Monthly's working pops with the
#      ≈ $10,000 read, late in its caption, so the stake line stays up 1.95 s; Biweekly's waits until Monthly's has been
#      up 1.0 s), and the round-2 steps[3] is back at the verdict (the verdict card hides the last caption, "About $12
#      more a week. About a year sooner.": the slot carries both halves in the hold), so the step paths are round-2's
ea_c = dict(ea)
for _i in (0, 1, 2):
    ea_c[f"lookOpts.formulas[{_i}].text"] = ea_c.pop(f"lookOpts.formulas[{_i}]")
# 03b: the frame-1 note is re-slammed (same string, one size down) on "Because it shrinks.", so the label steps shift
eb_c = dict(eb)
eb_c["lookOpts.labelSteps[3].text"] = eb_c.pop("lookOpts.labelSteps[2].text")
eb_c["lookOpts.labelSteps[2].text"] = eb_c.pop("lookOpts.labelSteps[1].text")
eb_c["lookOpts.labelSteps[1].text"] = eb["lookOpts.labelSteps[0].text"]
expect_c = {ida: ea_c, idb: eb_c, idc: dict(ec)}
# 03c: "Interest alone: about $587,200." and "More than the loan." are one caption (word for word): the hook
vo_expect_c = {ida: vo_expect[ida], idb: vo_expect[idb],
               idc: [vo_expect[idc][0] + vo_expect[idc][1]] + vo_expect[idc][2:]}
MERGED_03C = ("Interest alone:", "More than the loan.")
# reads: (target, caption, anchor). The anchor is the caption's word that the read answers; on screen there is no
# narration, so a read must fall inside that caption's window (not within 0.25 s of a spoken word)
reads_c = {
    # (fixer pass: the read on "$1,800 less" is a compare read of Monthly's ≈ $10,000 and Round up's ≈ $8,200 together,
    # after the count-down settles: the two shown values whose difference the caption and the step give)
    ida: [((0, "payoff"), 1, "72"), ((0, "interest"), 1, "$10,000"), (((1, 2), "interest"), 3, "$35"),
          ((0, "payoff"), 4, "12"), (((0, 3), "interest"), 6, "$1,800"), ((3, "payoff"), 7, "year")],
    idb: [("hero", 0, "15"), ((0, "interest"), 1, "$7,300"), ((0, "interest"), 1, "owed"),
          ((1, "payoff"), 4, "4.8"), ((1, "interest"), 4, "$3,100"), ((2, "payoff"), 5, "2.2")],
    idc: [("hero", 0, "$587,200"), ((0, "interest"), 0, "$587,200"), ("hero", 0, "loan"), ((1, "payoff"), 2, "40"),
          ("hero", 2, "$78,600"), ((2, "payoff"), 4, "11"), ("hero", 4, "$245,000")],
}
# 03a working-slot steps (cond indices): (step, caption, anchor)
steps_c = {ida: [(0, 2, "$1,100"), (1, 3, "$35"), (2, 6, "$1,800"), (3, 7, "$12"), (4, 7, "year")]}
# 03a (fixer pass): the scan's hops, by lane (the three waiting figures in turn, then Biweekly's again, so the ripple
# runs until Monthly's caption goes up: a single figure's hop registers as near-still)
SCAN_ORDER_C = {ida: [1, 2, 3, 1]}
SLOT_HOLD_VERDICT = 0.7          # 03a: the two working lines of the verdict hold: each >= 0.7 s (and >= 0.7 s before the card)
LABEL_FULL_B = 0.45              # 03b: "More than the $5,000 owed" at full strength before the compare read dims the stack
LABEL_TO_DELTA_C = 1.0           # 03c: each "sooner" label step up >= 1.0 s before its delta replaces it
FOOTER_WORKING_C = 1.6           # 03c: the "× 360" working (footerSteps[0]) held >= 1.6 s before the next footer step
# where each later option wakes / cuts (the caption that names it) and lands (the caption that speaks its payoff)
wakes_c = {ida: [(1, 2), (2, 3), (3, 5)], idb: [(1, 2), (2, 5)], idc: [(1, 1), (2, 3)]}
lands_c = {ida: [(1, 2), (2, 3), (3, 6)], idb: [(1, 4), (2, 5)], idc: [(1, 2), (2, 4)]}

# ============================================================== text helpers

NUM_CORE = r"(?:\d{1,3}(?:,\d{3})+|\d+)(?:\.\d+)?"
TOKEN_RE = re.compile(r"(≈ )?([−-]?\$?" + NUM_CORE + r"%?)")

def strip_markup(s):
    return s.replace("**", "").replace("__", "")

def tokens(s):
    return [(m.group(1) or "") + m.group(2) for m in TOKEN_RE.finditer(strip_markup(s))]

ONES = ("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen "
        "fifteen sixteen seventeen eighteen nineteen").split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()

def words_int(n):
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10]] + ([ONES[n % 10]] if n % 10 else [])
    if n < 1000:
        return [ONES[n // 100], "hundred"] + (words_int(n % 100) if n % 100 else [])
    for div, name in ((10 ** 9, "billion"), (10 ** 6, "million"), (1000, "thousand")):
        if n >= div:
            return words_int(n // div) + [name] + (words_int(n % div) if n % div else [])

def spoken(text):
    """Approximate spoken words: digits expanded the way the VO would read them."""
    t = strip_markup(text).replace("-", " ").replace("→", " to ").replace("+", " plus ")
    out = []
    for raw in t.split():
        w = raw.strip(".,:;!?'\"()")
        m = re.fullmatch(r"(\$)?(" + NUM_CORE + r")(%)?", w)
        if not m:
            if w:
                out.append(w)
            continue
        dollar, core, per = m.groups()
        v = core.replace(",", "")
        if "." in v:
            ip, fp = v.split(".")
            if dollar:
                out += words_int(int(ip)) + ["dollars"] + words_int(int(fp)) + ["cents"]
                continue
            out += words_int(int(ip)) + ["point"] + [ONES[int(c)] for c in fp]
        else:
            out += words_int(int(v))
        if dollar:
            out.append("dollars")
        if per:
            out.append("percent")
    return out

def word_time(line, kw):
    """When the VO reaches keyword kw inside a line (t + words before it / WPS-scaled d)."""
    sp = [w.lower() for w in spoken(line["text"])]
    kws = [w.lower() for w in spoken(kw)]
    idx = next(k for k in range(len(sp)) if sp[k:k + len(kws)] == kws)
    return line["t"] + line["d"] * idx / len(sp)

def get(spec, path):
    cur = spec
    for part in re.findall(r"[^.\[\]]+|\[\d+\]", path):
        cur = cur[int(part[1:-1])] if part.startswith("[") else cur[part]
    return cur

def string_leaves(obj, path=""):
    if isinstance(obj, str):
        yield path, obj
    elif isinstance(obj, dict):
        for k, v in obj.items():
            yield from string_leaves(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from string_leaves(v, f"{path}[{i}]")

# ============================================================== checks

rows_out, fails = [], []
CUT = {}

def record(sid, field, shown, want, ok, why=""):
    rows_out.append((sid, field, shown, want, "ok" if ok else "FAIL"))
    if not ok:
        fails.append(f"{sid} {field}: shown {shown!r} want {want!r} {why}")

def check_spec(sid):
    path = SPEC_PATHS[sid]
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    key = KEY_OF[sid]
    # two cuts, picked by length: the round-2 cut, or the condensed cut (any other length fails its lane)
    cut = "r2" if abs(spec.get("duration", 0) - R2_DURATION[key]) < 1e-9 else "cond"
    CUT[sid] = cut
    in_specs = os.path.dirname(os.path.abspath(path)) == os.path.abspath(SPECS)
    record(sid, "studio/specs/ holds the expected cut", CUT_NAME[cut] if in_specs else f"(--spec file) {CUT_NAME[cut]}",
           CUT_NAME[IN_SPECS[key]] if in_specs else "(--spec file)", (cut == IN_SPECS[key]) if in_specs else True)
    exp_s = expect_c[sid] if cut == "cond" else expect[sid]
    vx_s = vo_expect_c[sid] if cut == "cond" else vo_expect[sid]
    # --- common fields and contract shape (FORMATS.md, common + section 3)
    record(sid, "id = file stem", spec.get("id"), sid, spec.get("id") == sid)
    record(sid, "format", spec.get("format"), "what-difference", spec.get("format") == "what-difference")
    look = spec.get("look", "?")
    record(sid, "look in id", look, sid[4:], look in ("clean-sheet", "live-sheet", "scoreboard", "becker-rig")
           and sid.startswith(sid[:4] + look + "-"))
    record(sid, "fps", spec.get("fps"), 30, spec.get("fps") == 30)
    record(sid, "captions", spec.get("captions"), True, spec.get("captions") is True)
    dur = spec["duration"]
    lane = COND_LANE[key] if cut == "cond" else LANE
    record(sid, "duration lane" + (" (condensed body, + the 2.5 s end card)" if cut == "cond" else ""), dur,
           f"{lane[0]}-{lane[1]} s", lane[0] <= dur <= lane[1])
    hdr = strip_markup(spec["header"]).replace("\n", " ")
    record(sid, "R1 header has a number at t=0", spec["header"].replace("\n", " / "), "a digit", bool(re.search(r"\d", hdr)))
    dollars = re.findall(r"\$" + NUM_CORE, hdr)
    record(sid, "R2 one dollar figure in header", dollars, "exactly 1", len(dollars) == 1)
    words = len(hdr.split())
    record(sid, "R8 header ≤ 15 words", words, "≤ 15", words <= 15)
    record(sid, "footer present (assumptions at t=0)", bool(spec.get("footer")), True, bool(spec.get("footer")))
    d = spec["data"]
    for k in ("label", "value", "terms"):
        record(sid, f"stake.{k}", d["stake"].get(k), "string", isinstance(d["stake"].get(k), str))
    keys = [m["key"] for m in d["metrics"]]
    record(sid, "metrics", keys, ["payoff", "interest"], keys == ["payoff", "interest"])
    opts = d["options"]
    record(sid, "options 2-4", len(opts), "2-4", 2 <= len(opts) <= 4)
    for i, o in enumerate(opts):
        record(sid, f"options[{i}] values = metrics", sorted(o["values"]), sorted(keys), sorted(o["values"]) == sorted(keys))
        record(sid, f"options[{i}] tone", o.get("tone"), "good/bad/goal/neutral", o.get("tone") in ("good", "bad", "goal", "neutral"))
    record(sid, "winner index", d["winner"], f"0-{len(opts) - 1}", 0 <= d["winner"] < len(opts))
    ts = [o["t"] for o in opts]
    record(sid, "options t ascending", ts, "ascending", all(a < b for a, b in zip(ts, ts[1:])) and ts[-1] < dur)
    # when each option's results are on screen. live-sheet: option.t IS the landing (t <= 0 = pre-filled).
    # clean-sheet / scoreboard: option.resultT pins the landing (clean-sheet: t is when the working starts
    # typing; scoreboard: t is the hard cut that names the option).
    # becker-rig (port): option.t is when the lane WAKES, option.resultT when its crate lands (a pre-run option, t <= 0,
    # has landed before frame 1)
    land = [o.get("resultT", o["t"]) if look in ("clean-sheet", "scoreboard", "becker-rig") else o["t"] for o in opts]
    if look in ("clean-sheet", "scoreboard", "becker-rig"):
        pins = ["resultT" in o for o in opts]
        record(sid, "every option pins its landing (resultT)", pins, "all" if look == "clean-sheet" else "all but a pre-run first",
               all(pins[1:]) if look == "becker-rig" else (look == "scoreboard" and pins[0] or all(pins)))
    record(sid, "R10 first values on screen", land[0], f"≤ {FIRST_VALUES_BY}", land[0] <= FIRST_VALUES_BY)
    # frame 1 = the baseline already worked out (R1 full answer, R10 shock first). clean-sheet: both metrics
    # (0.5 s apart) and the 0.38 s highlighter must have settled before t = 0
    settle = land[0] + (0.5 * (len(keys) - 1) + 0.38 if look == "clean-sheet" else 0)
    record(sid, "R1 baseline results on screen at frame 1", round(settle, 2), "≤ 0", settle <= 0)
    record(sid, "no spec-level sfx (each kit cues its own landings)", len(spec.get("sfx", [])), 0, not spec.get("sfx"))

    # --- display strings and numeric tokens
    covered = set()
    for p, (kind, want) in exp_s.items():
        covered.add(p)
        try:
            shown = get(spec, p)
        except (KeyError, IndexError, TypeError):
            record(sid, p, None, want, False, "(missing)")
            continue
        if kind == "exact":
            record(sid, p, shown, want, shown == want)
        else:
            got = tokens(shown)
            record(sid, p, " | ".join(got), " | ".join(want), got == want)
    # deltas = difference of the shown totals (money deltas) - no rounding drift on screen
    base = opts[0]["values"]
    for i, o in enumerate(opts[1:], 1):
        if "delta" not in o:
            continue
        if "$" in o["delta"]:
            diff = val(base["interest"]) - val(o["values"]["interest"])
        else:
            diff = round(val(base["payoff"]) - val(o["values"]["payoff"]))
        record(sid, f"options[{i}] delta = shown difference", o["delta"], diff, abs(val(o["delta"]) - diff) < 1e-6)

    # --- VO numbers and "about"
    vx = vx_s
    record(sid, "vo line count", len(spec["vo"]), len(vx), len(spec["vo"]) == len(vx))
    for i, (line, want) in enumerate(zip(spec["vo"], vx)):
        covered.add(f"vo[{i}].text")
        got = tokens(line["text"])
        wt = [w for w, _ in want]
        record(sid, f"vo[{i}] numbers", " | ".join(got), " | ".join(wt), got == wt)
        for tok, rounded in want:
            m = re.search(r"(\S+)\s+" + re.escape(tok) + r"(?!\d|[.,]\d)", line["text"])
            prev = m.group(1).lower() if m else ""
            record(sid, f"vo[{i}] '{tok}' rounded→'about'", prev or "(start)", "about" if rounded else "not about",
                   (prev == "about") == rounded)
    # every digit-bearing string is covered
    for p, s in string_leaves(spec):
        if p in ("id", "look", "format") or p.startswith("sfx") or not re.search(r"\d", s):
            continue
        record(sid, f"covered: {p}", s.replace("\n", " / "), "checked", p in covered)

    # --- timing
    if cut == "cond":
        check_cond(sid, spec, land)
        return spec
    vo = spec["vo"]
    for i, line in enumerate(vo):
        n = len(spoken(line["text"]))
        need = n / WPS
        record(sid, f"vo[{i}] d vs {n} words", line["d"], f"{need:.2f}-{need + 0.6:.2f}", need - 0.05 <= line["d"] <= need + 0.6)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(sid, f"vo[{i}] ends before vo[{i + 1}]", end, f"≤ {vo[i + 1]['t']}", end <= vo[i + 1]["t"])
    end = vo[-1]["t"] + vo[-1]["d"]
    record(sid, "last VO ends ≥ 1 s before end", round(end, 2), f"≤ {dur - 1.0}", end <= dur - 1.0)
    record(sid, "hold = duration − last VO end", d["hold"], round(dur - end, 2), abs(d["hold"] - (dur - end)) < 0.051)
    record(sid, "verdict.t = last VO line t", spec["verdict"]["t"], vo[-1]["t"], spec["verdict"]["t"] == vo[-1]["t"])
    for oi, li, kw in beats[sid]:
        est = word_time(vo[li], kw)
        # clean-sheet: the results land at resultT; live-sheet: t is the landing; scoreboard: t is the cut
        at = land[oi] if look == "clean-sheet" else opts[oi]["t"]
        record(sid, f"option {oi} '{opts[oi]['name']}' vs VO word '{kw}'", at, f"{est:.2f} ± {BEAT_TOL}",
               abs(at - est) <= BEAT_TOL)
        if look == "clean-sheet":
            record(sid, f"option {oi} working types first (t < resultT)", (opts[oi]["t"], land[oi]), "t + 0.15 ≤ resultT",
                   opts[oi]["t"] + 0.15 <= land[oi])
        if look == "becker-rig":
            # the kit wakes the lane at t only if the lead-in (0.42 s) and the shortest run (0.35 s) fit before resultT
            record(sid, f"option {oi} wakes on its word: resultT − t ≥ 0.77 s", round(land[oi] - opts[oi]["t"], 2), "≥ 0.77",
                   land[oi] - opts[oi]["t"] >= 0.77 - 1e-9)
    # reads and delta slams on the spoken number (assembly pass)
    lo_r = spec.get("lookOpts", {}).get("reads", [])
    rx = reads_expect[sid]
    record(sid, "lookOpts.reads count", len(lo_r), len(rx), len(lo_r) == len(rx))
    for k, (rd, (tgt, li, kw)) in enumerate(zip(lo_r, rx)):
        est = word_time(vo[li], kw)
        spoken_tok = tokens(kw)
        if tgt == "stake":
            got_t, shown_v, on_by = rd.get("target"), d["stake"]["value"], 0.0
            ok_t = got_t == "stake"
        elif tgt == "hero":
            # the hero holds option 0's value of its metric (lookOpts.counter) from its landing until option 1's cut
            got_t, shown_v, on_by = rd.get("target"), opts[0]["values"][spec["lookOpts"].get("counter", "interest")], land[0]
            ok_t = got_t == "hero" and rd["t"] < opts[1]["t"]
        elif tgt[0] == "detail":
            # clean-sheet: the option's working line, typed (at most 1.1 s) from option.t
            oi = tgt[1]
            got_t, shown_v, on_by = (rd.get("target"), rd.get("option")), opts[oi]["detail"], opts[oi]["t"] + 1.1
            ok_t = got_t == ("detail", oi)
        else:
            ois, mk = tgt
            ois = ois if isinstance(ois, tuple) else (ois,)
            ro = rd.get("option")
            got_t = (tuple(ro) if isinstance(ro, list) else (ro,), rd.get("metric"))
            ok_t = got_t == (ois, mk)
            shown_v = opts[ois[0]]["values"][mk]
            # on screen by: live-sheet t is the landing (+0.42 s for the second metric); clean-sheet resultT
            # (+ valueEvery per metric, 0.5 s by default) plus the 0.38 s highlighter
            j = keys.index(mk)
            # becker-rig: the crate's metric at resultT, the money value 0.45 s later (valueEvery); scoreboard: every
            # metric with the race's landing (resultT, else the cut + the race)
            def on_screen(oi):
                if look == "clean-sheet":
                    return land[oi] + opts[oi].get("valueEvery", 0.5) * j + 0.38
                if look == "becker-rig":
                    return land[oi] + (opts[oi].get("valueEvery", d.get("valueEvery", 0.45)) if j else 0)
                if look == "scoreboard":
                    return land[oi] if "resultT" in opts[oi] else opts[oi]["t"] + 0.35 + 2.4
                return opts[oi]["t"] + 0.42 * j
            on_by = max(on_screen(oi) for oi in ois)
        record(sid, f"reads[{k}] target", got_t, tgt, ok_t)
        record(sid, f"reads[{k}] on VO word '{kw}'", rd["t"], f"{est:.2f} ± {READ_TOL}", abs(rd["t"] - est) <= READ_TOL)
        record(sid, f"reads[{k}] value already on screen", round(on_by, 2), f"< {rd['t']}", on_by < rd["t"])
        if tgt in ("stake", "hero"):
            if tgt == "stake":
                record(sid, f"reads[{k}] stake read on 'more than you owed' (interest > stake)", shown_v, val(base["interest"]),
                       val(base["interest"]) > val(shown_v))
            else:
                # (the VO may round the hero's value to whole units: "about 15 years" for "≈ 15.1 years")
                said = val(spoken_tok[0]) if spoken_tok else None
                record(sid, f"reads[{k}] anchor speaks the marked value", spoken_tok, shown_v,
                       said is not None and (said == val(shown_v) or (said == int(said) and said == round(val(shown_v)))))
        elif tgt[0] == "detail":
            # "not a dollar more" marks the working that ends "= $0 more"
            ok = shown_v.endswith(f"= {money(0)} more") and "not a dollar more" in vo[li]["text"].lower()
            record(sid, f"reads[{k}] 'not a dollar more' marks the $0 working", shown_v, f"… = {money(0)} more", ok)
        elif isinstance(tgt[0], tuple) and len(tgt[0]) > 1:
            # a pair read: the cells show the same rounded total, and the VO speaks the exact gap between them
            vals_ = [opts[oi]["values"][tgt[1]] for oi in tgt[0]]
            gap = pair_exact[sid]
            record(sid, f"reads[{k}] pair cells show the same total", vals_, "equal", len(set(vals_)) == 1)
            record(sid, f"reads[{k}] anchor = exact gap the equal cells hide", spoken_tok, money(gap),
                   bool(spoken_tok) and spoken_tok[0] == bare(money(gap)))
        elif sid == ida and kw == "12":
            # "... a year, not 12": the read marks Monthly's crate, the lane that pays 12 a year, the one the lever's
            # 13-payment lanes leave out
            lev = spec.get("lookOpts", {}).get("lever", {}).get("options", [])
            record(sid, f"reads[{k}] 'not 12' marks Monthly (12 payments a year, outside the lever)", (tgt[0], lev), "0 ∉ lever",
                   tgt[0] == 0 and 0 not in lev and opts[0]["name"] == "Monthly" and "not 12" in vo[li]["text"])
        elif sid == ida and kw == "year":
            # "about a year sooner": the read marks the winner's crate; its shown gap to Monthly's 72 is 12 months = ≈ 1 year
            gap_ = val(opts[0]["values"]["payoff"]) - val(shown_v)
            record(sid, f"reads[{k}] 'year' marks the winner's crate: shown 72 − 60 = 12 months ≈ 1 year", (tgt[0], gap_), "winner, 12",
                   tgt[0] == d["winner"] and gap_ == 12 and num(CAR_ROUND_SOONER_YRS) == "≈ 1" and "about a year" in vo[li]["text"].lower())
        elif tgt[1] == "interest" and spoken_tok and val(spoken_tok[0]) != val(shown_v):
            # the anchor speaks the difference this cell makes against the baseline's shown value
            diff = val(opts[0]["values"]["interest"]) - val(shown_v)
            record(sid, f"reads[{k}] anchor = shown difference", spoken_tok[0], diff, abs(val(spoken_tok[0]) - diff) < 1e-6)
        else:
            # the VO may round the shown value to whole units ("about 15 years" for "≈ 15.1 years")
            said = val(spoken_tok[0]) if spoken_tok else None
            record(sid, f"reads[{k}] anchor speaks the marked value", spoken_tok, shown_v,
                   said is not None and (said == val(shown_v) or (said == int(said) and said == round(val(shown_v)))))
    # clean-sheet values pinned to the words that speak them (fixer pass)
    for (oi, mk), li, kw in value_beats[sid]:
        est = word_time(vo[li], kw)
        j = keys.index(mk)
        at = land[oi] + opts[oi].get("valueEvery", 0.5) * j
        record(sid, f"option {oi} {mk} lands on VO word '{kw}'", round(at, 2), f"{est:.2f} ± {READ_TOL}", abs(at - est) <= READ_TOL)
        record(sid, f"option {oi} {mk}: the word speaks the landed value", tokens(kw), opts[oi]["values"][mk],
               [val(x) for x in tokens(kw)] == [val(opts[oi]["values"][mk])] or round(val(opts[oi]["values"][mk]), 1) == val(tokens(kw)[0]))
    for oi, li, kw in delta_beats[sid]:
        est = word_time(vo[li], kw)
        dt = opts[oi].get("deltaT")
        record(sid, f"option {oi} deltaT on VO words '{kw}'", dt, f"{est:.2f} ± {READ_TOL}", dt is not None and abs(dt - est) <= READ_TOL)
        # a winner's delta held for the verdict line (03b): the clean-sheet rules below; on the scoreboard the hero lands it
        held = dt is not None and dt >= spec["verdict"]["t"] and oi == d["winner"]
        if look == "scoreboard" and held:
            lo_s = spec.get("lookOpts", {})
            o_d = opts[oi]["delta"]
            record(sid, f"option {oi} delta held for the verdict: the hero lands it (counter = its metric, a duration)",
                   (lo_s.get("counter"), o_d), "payoff · '… years sooner'",
                   lo_s.get("counter") == "payoff" and bool(re.search(r"\byears?\b", o_d)) and bool(re.search(r"\byears?\b", opts[oi]["values"]["payoff"])))
            record(sid, f"option {oi} the hero's 1 s payoff roll starts after the verdict (winnerT − 1.04 ≥ verdict.t)",
                   round(d.get("winnerT", 0) - 1.04, 2), f"≥ {spec['verdict']['t']}", d.get("winnerT", 0) - 1.04 >= spec["verdict"]["t"] - 1e-9)
        if look == "scoreboard" and not held:
            record(sid, f"option {oi} deltaT after its race lands (t + 0.35 + 2.4 s at most)", dt, f"≥ {opts[oi]['t'] + 2.75:.2f}",
                   dt is not None and dt >= opts[oi]["t"] + 2.75)
            record(sid, f"option {oi} deltaT before the next option", dt, "< next t",
                   dt is not None and (oi + 1 >= len(opts) or dt < opts[oi + 1]["t"]))
        else:
            # clean-sheet: the winner's delta is held back for the verdict line and lands with the winner beat
            last_val = land[oi] + opts[oi].get("valueEvery", 0.5) * (len(keys) - 1)
            record(sid, f"option {oi} deltaT after its last value", dt, f"≥ {last_val + 0.3:.2f}", dt is not None and dt >= last_val + 0.3)
            record(sid, f"option {oi} deltaT with the verdict line and the winner beat", (dt, d.get("winnerT")),
                   f"≥ {spec['verdict']['t']}, = winnerT", dt is not None and dt >= spec["verdict"]["t"] and d.get("winnerT") == dt
                   and d["winner"] == oi)
        o_delta = opts[oi]["delta"]
        record(sid, f"option {oi} deltaT VO speaks its delta", tokens(kw), o_delta,
               [val(x) for x in tokens(kw)] == [val(x) for x in tokens(o_delta)])
    # bar steps (live-sheet) and label steps (scoreboard): the number they carry is on screen by its word
    lo_ = spec.get("lookOpts", {})
    for k, li, kw in step_beats[sid]:
        est = word_time(vo[li], kw)
        if look == "becker-rig":
            # a working-slot line pops in whole at its t (no typing): by the word that speaks its number, <= 0.8 s early
            stp = lo_["steps"][k]
            record(sid, f"lookOpts.steps[{k}] on screen by VO word '{kw}'", stp["t"], f"{est - 0.8:.2f}-{est + 0.25:.2f}",
                   est - 0.8 <= stp["t"] <= est + 0.25)
        elif look == "live-sheet":
            stp = lo_["steps"][k]
            txt = stp["text"]
            tok = bare(tokens(kw)[0]) if tokens(kw) else kw
            pos = txt.find(tok)
            cps = max(24.0, len(txt) / 0.9)
            typed = stp["t"] + 0.16 + (pos + len(tok)) / cps
            record(sid, f"lookOpts.steps[{k}] '{tok}' typed by VO word '{kw}'", round(typed, 2), f"{est - 0.8:.2f}-{est + 0.25:.2f}",
                   pos >= 0 and est - 0.8 <= typed <= est + 0.25)
        else:
            stp = lo_["labelSteps"][k]
            oi = stp["option"]
            record(sid, f"lookOpts.labelSteps[{k}] on VO word '{kw}'", stp["t"], f"{est:.2f} ± {READ_TOL}", abs(stp["t"] - est) <= READ_TOL)
            record(sid, f"lookOpts.labelSteps[{k}] after its race, before its delta", stp["t"],
                   f"{opts[oi]['t'] + 2.75:.2f}-{opts[oi].get('deltaT')}", opts[oi]["t"] + 2.75 <= stp["t"] < opts[oi].get("deltaT", 1e9))
        # (the VO may round it: "about $12" for $12.46; "about a year" has no digit: the step must carry the ≈ 1)
        stoks = tokens((lo_.get("steps") or lo_.get("labelSteps"))[k]["text"])
        if tokens(kw):
            record(sid, f"step {k} carries the number VO line {li} speaks", stoks, kw,
                   any(val(x) == val(tokens(kw)[0]) or round(val(x)) == val(tokens(kw)[0]) for x in stoks))
        else:
            record(sid, f"step {k} carries the 'about a year' VO line {li} speaks", stoks, "≈ 1",
                   "about a year" in vo[li]["text"].lower() and num(CAR_ROUND_SOONER_YRS) in stoks)
    if sid == ida:
        # scan: on "Guess", over the columns still empty then
        sc_ = lo_.get("scan", {})
        est = word_time(vo[0], "Guess")
        record(sid, "lookOpts.scan on VO word 'Guess'", sc_.get("t"), f"{est:.2f} ± {READ_TOL}", sc_.get("t") is not None and abs(sc_["t"] - est) <= READ_TOL)
        empty_then = [i for i, o in enumerate(opts) if o["t"] > sc_.get("t", 0) + 3 * sc_.get("every", 0.4)]
        record(sid, "lookOpts.scan: the columns after the baseline are all still empty", empty_then, [1, 2, 3], empty_then == [1, 2, 3])
        # the lever's columns are the two whose year adds up to 13 monthly payments
        lev = lo_.get("lever", {}).get("options")
        record(sid, "lookOpts.lever.options = the 13-payment columns (biweekly, weekly)", lev, [1, 2],
               lev == [1, 2] and abs(CAR_YEAR_BIWK - CAR_YEAR_MONTHLY) < 0.005 and abs(CAR_YEAR_WK - CAR_YEAR_MONTHLY) < 0.005)
        cc_ = lo_.get("countCell", {})
        record(sid, "lookOpts.countCell = the winner's interest, counted down from the baseline", cc_, "winner · interest · base",
               cc_.get("option") == d["winner"] and cc_.get("metric") == "interest" and cc_.get("from") == "base")
        # each bar step's result is the difference of the two shown totals it names (no drift)
        for k in (0, 2, 4):
            tk = tokens(lo_["steps"][k]["text"])
            record(sid, f"lookOpts.steps[{k}] shown a − b = its ≈ result", tk, "a − b = c", abs(val(tk[0]) - val(tk[1]) - val(tk[2])) < 1e-6)
        # port QA fixer: steps[4] works the verdict's year from the two crates on screen; "≈" only because 60 is rounded
        tk = tokens(lo_["steps"][4]["text"])
        record(sid, "lookOpts.steps[4]: a = Monthly's crate, b = the winner's crate (bare), ≈ on c", tk,
               f"{opts[0]['values']['payoff']} − {bare(opts[d['winner']]['values']['payoff'])}",
               tk[0] == opts[0]["values"]["payoff"] and tk[1] == bare(opts[d["winner"]]["values"]["payoff"])
               and tk[2].startswith("≈ ") and not is_exact(CAR["monthly"]["months"] - CAR["rounded"]["months"], val(tk[2])) and val(tk[2]) == 12)
        record(sid, "lookOpts.steps[4]: 12 months = the ≈ 1 year it states", (tk[2], tk[3]), "12 / 12 = 1", val(tk[2]) / 12 == val(tk[3]))
        # the gap label: the same ≈ 12, in the crate metric's unit (months), on the winner's flag after the winner beat
        gl_ = lo_.get("gapLabel")
        record(sid, "lookOpts.gapLabel = the step's ≈ 12, in months ('mo'; the crate metric is months)", gl_, f"{tk[2]} mo",
               isinstance(gl_, str) and tokens(gl_) == [tk[2]] and gl_.endswith(" mo") and "month" in d["metrics"][0]["label"].lower())
        # the lever's second beat: the two 13-payment lanes nod again on "thirteen"
        lb_ = lo_.get("lever", {}).get("beats", [])
        est = word_time(vo[4], "13")
        record(sid, "lookOpts.lever.beats[0] on VO word '13'", lb_[0] if lb_ else None, f"{est:.2f} ± {READ_TOL}",
               len(lb_) == 1 and abs(lb_[0] - est) <= READ_TOL and lb_[0] > lo_["lever"]["t"] + 0.3)
        # the pat: the waiting figures pat their crates on "this loan", done before the scan hops start
        pt_ = lo_.get("pat", {})
        est = word_time(vo[0], "this")
        record(sid, "lookOpts.pat on VO word 'this' (\"this loan\")", pt_.get("t"), f"{est:.2f} ± {READ_TOL}",
               pt_.get("t") is not None and abs(pt_["t"] - est) <= READ_TOL)
        pat_end = pt_.get("t", 0) + 2 * pt_.get("every", 0.08) + 0.34
        record(sid, "lookOpts.pat ends before the scan (3 lanes, 0.34 s each)", round(pat_end, 2), f"< {lo_['scan']['t']}",
               pat_end < lo_["scan"]["t"] and all(o["t"] > pat_end for o in opts[1:]))
    if look == "becker-rig":
        # port (Becker Rig): the footer is one mono line (40 px, x 62-940: 36 characters at most), so it never leaves an
        # orphan word and the lanes keep the height
        ft = spec["footer"]
        record(sid, "becker footer: one line (≤ 36 characters, no break)", f"{len(ft)} chars", "≤ 36", len(ft) <= 36 and "\n" not in ft)
        # the working slot shows one line at a time; each holds long enough to read (>= 2 s until the next one)
        firstRead = min([r["t"] for r in lo_.get("reads", []) if (r["option"] if isinstance(r["option"], list) else [r["option"]]) == [0]] or [2.0])
        slot = sorted([(firstRead if i == 0 and opts[0]["t"] <= 0 else opts[i]["t"], f"formulas[{i}]") for i in range(len(lo_.get("formulas", [])))]
                      + [(st["t"], f"steps[{k}]") for k, st in enumerate(lo_.get("steps", []))]
                      + ([(lo_["lever"]["t"], "lever")] if "lever" in lo_ else []))
        for (ta, na), (tb, nb) in zip(slot, slot[1:]):
            record(sid, f"slot line {na} holds ≥ 2 s (until {nb})", round(tb - ta, 2), "≥ 2.0", tb - ta >= 2.0 - 1e-9)
        # the counted money value (countCell) settles on the word that speaks the drop it shows
        cc_ = lo_.get("countCell", {})
        if cc_:
            oi = cc_["option"]
            settle = land[oi] + opts[oi].get("valueEvery", d.get("valueEvery", 0.45)) + 0.8
            li = 6
            est = word_time(vo[li], "$1,800")
            record(sid, f"countCell: option {oi}'s count-down settles on VO word '$1,800'", round(settle, 2), f"{est:.2f} ± {READ_TOL}",
                   abs(settle - est) <= READ_TOL)
            drop = val(opts[0]["values"]["interest"]) - val(opts[oi]["values"]["interest"])
            record(sid, "countCell: the count's drop (shown base − shown value) = the VO's $1,800", drop, val("$1,800"), drop == val("$1,800"))
    if sid == idb:
        lo_s = spec.get("lookOpts", {})
        # port (Scoreboard): the hero rolls the payoff (time): frame 1 is the hook's first spoken number, in red
        record(sid, "scoreboard hero = the payoff metric (frame 1: '≈ 15.1 years', red)", (lo_s.get("counter"), opts[0]["values"]["payoff"], opts[0]["tone"]),
               "payoff · ≈ 15.1 years · bad", lo_s.get("counter") == "payoff" and opts[0]["values"]["payoff"] == years_disp(CARD["min"]["years"]) and opts[0]["tone"] == "bad")
        # keepSpeed: every later race keeps the shared speed (2.4 s for the longest bar, >= 0.7 s) and starts after its
        # cut, so no bar crawls and no intermediate figure holds the screen
        record(sid, "lookOpts.keepSpeed", lo_s.get("keepSpeed"), True, lo_s.get("keepSpeed") is True)
        longest = max(val(o["values"]["payoff"]) for o in opts)
        for i, o in enumerate(opts[1:], 1):
            dur_ = min(2.4, max(0.7, 2.4 * val(o["values"]["payoff"]) / longest))
            st_ = land[i] - dur_
            record(sid, f"option {i} race starts after its cut + 0.35 s (shared speed)", round(st_, 2), f"≥ {o['t'] + 0.35:.2f}", st_ >= o["t"] + 0.35)
        # the label steps: the note at frame 1 (hook pass: the shrink in numbers within 1.5 s), the others on their words,
        # each while its option holds the label stack
        for k, li, kw in label_beats[sid]:
            stp = lo_s["labelSteps"][k]
            if kw is None:
                record(sid, f"lookOpts.labelSteps[{k}] on screen at frame 1", stp["t"], "0.0", stp["t"] == 0.0)
            else:
                est = word_time(vo[li], kw)
                record(sid, f"lookOpts.labelSteps[{k}] on VO word '{kw}'", stp["t"], f"{est:.2f} ± {READ_TOL}", abs(stp["t"] - est) <= READ_TOL)
            oi = stp["option"]
            nxt = opts[oi + 1]["t"] if oi + 1 < len(opts) else spec["verdict"]["t"]
            record(sid, f"lookOpts.labelSteps[{k}] while option {oi} holds the stack", (opts[oi]["t"], stp["t"], nxt), "t_opt ≤ t < next",
                   opts[oi]["t"] <= stp["t"] < nxt)
        record(sid, "labelSteps[1] 'More than the $5,000 owed': interest > stake", (opts[0]["values"]["interest"], money(CARD_B)), "> $5,000",
               val(opts[0]["values"]["interest"]) > CARD_B and CARD["min"]["interest"] > CARD_B)
        record(sid, "labelSteps[2] '$0 more' answers 'not a dollar more' and option 1's working", opts[1]["detail"], f"… = {money(0)} more",
               opts[1]["detail"].endswith(f"= {money(0)} more") and "not a dollar more" in vo[3]["text"].lower())
        # port QA fixer: one focal "≈ 10 years sooner" (the verdict's). The winner beat rolls the hero from ①'s payoff down
        # to ②'s own and lands it on "ten"; no option carries a delta (③'s "≈ 13 years sooner" is write-up only)
        record(sid, "no option carries a delta (the verdict alone says '≈ 10 years sooner')", [o.get("delta") for o in opts], "none",
               not any("delta" in o or "deltaT" in o for o in opts))
        record(sid, "lookOpts.heroEnd = 'value' (the hero lands ②'s own payoff; no endTag)", (lo_s.get("heroEnd"), lo_s.get("endTag")), "value · none",
               lo_s.get("heroEnd") == "value" and "endTag" not in lo_s)
        est = word_time(vo[6], "10")
        record(sid, "data.winnerT (the hero lands ≈ 4.8) on VO word '10'", d.get("winnerT"), f"{est:.2f} ± {READ_TOL}",
               d.get("winnerT") is not None and abs(d["winnerT"] - est) <= READ_TOL)
        record(sid, "the hero's 1 s roll starts after the verdict (winnerT − 1.04 ≥ verdict.t)", round(d.get("winnerT", 0) - 1.04, 2),
               f"≥ {spec['verdict']['t']}", d.get("winnerT", 0) - 1.04 >= spec["verdict"]["t"] - 1e-9)
        shown_gap = val(opts[0]["values"]["payoff"]) - val(opts[d["winner"]]["values"]["payoff"])
        record(sid, "the hero's roll (① 15.1 → ② 4.8) shows the verdict's ≈ 10: shown 15.1 − 4.8 rounds to it",
               (opts[0]["values"]["payoff"], opts[d["winner"]]["values"]["payoff"], round(shown_gap, 1)), num(CARD_SOONER_F1),
               num(shown_gap) == num(CARD_SOONER_F1) == "≈ 10" and tokens(spec["verdict"]["text"])[-1] == "≈ 10")
        record(sid, "frame-1 label step one size down (the hero is the focal number)", lo_s["labelSteps"][0].get("small"), True,
               lo_s["labelSteps"][0].get("small") is True and lo_s["labelSteps"][0]["t"] == 0.0)
        record(sid, "no '13 years' anywhere on screen (write-up only)", "", "absent",
               not any(re.search(r"\b13 years", x) for _, x in string_leaves(spec)))
    for li in year_lines[sid]:
        record(sid, f"vo[{li}] says 'about a year'", vo[li]["text"], "contains 'about a year'", "about a year" in vo[li]["text"].lower())
    anchors = ts + [spec["verdict"]["t"]] + [line["t"] for line in vo]
    lo = spec.get("lookOpts", {})
    for key in ("formulaBar", "footerSteps"):
        for k, stp in enumerate(lo.get(key, [])):
            record(sid, f"lookOpts.{key}[{k}] on a beat", stp["t"], "an option/VO/verdict t",
                   any(abs(stp["t"] - a) < 1e-9 for a in anchors))
            record(sid, f"lookOpts.{key}[{k}] after t = 0 (spec.footer visible at frame 1)", stp["t"], "> 0", stp["t"] > 0)
            record(sid, f"lookOpts.{key}[{k}] ≤ 45 chars (kit footer limit)", len(stp["text"]), "≤ 45", len(stp["text"]) <= 45)
    if isinstance(lo.get("lever"), dict):
        record(sid, "lookOpts.lever on a beat", lo["lever"]["t"], "an option/VO/verdict t",
               any(abs(lo["lever"]["t"] - a) < 1e-9 for a in anchors))
    if "checkT" in lo:
        record(sid, "lookOpts.checkT on a beat", lo["checkT"], "an option/VO/verdict t",
               any(abs(lo["checkT"] - a) < 1e-9 for a in anchors))
    if look in ("live-sheet", "becker-rig") and "formulas" in lo:
        record(sid, "lookOpts.formulas: one per option", len(lo["formulas"]), len(opts), len(lo["formulas"]) == len(opts))
    for cue in spec.get("sfx", []):
        record(sid, f"sfx {cue['kind']} on a beat", cue["t"], "an option/VO/verdict t", any(abs(cue["t"] - a) < 1e-9 for a in anchors))
    return spec

# ============================================================== the condensed cut (2026-10-13)

def months_of(disp, unit=1):
    """a payoff display in months ("≈ 26.7 years" = 320.4; a bare "≈ 65" takes the metric's unit, months)"""
    v = val(disp)
    return v * 12 if re.search(r"\byears?\b", disp) else v * unit


def sb_timeline(spec):
    """Scoreboard what-difference: each option's cut, race start, landing and delta (the kit's own arithmetic)"""
    d, lo = spec["data"], spec.get("lookOpts", {})
    opts = d["options"]
    race = lo.get("race", 2.4)
    lens = [months_of(o["values"]["payoff"]) for o in opts]
    mx = max(lens)
    out = []
    for i, o in enumerate(opts):
        first = i == 0 and lo.get("intro") is False
        cut = min(o["t"], 0) if first else o["t"]
        start = cut - 0.45 if first else cut + 0.35
        dur = min(max(race * lens[i] / mx, 0.7), race)
        nxt = opts[i + 1]["t"] if i + 1 < len(opts) else float("inf")
        dur = min(dur, max(0.5, nxt - start - 1.0))
        land = start + dur
        rT = o.get("resultT")
        if rT is not None and rT > start + 0.2:
            if lo.get("keepSpeed") is True and rT - dur > start:
                start = rT - dur
            land = rT
        delta = (o.get("deltaT", land + 0.55) if o.get("delta") else None)
        out.append({"cut": cut, "start": start, "land": land, "delta": delta, "shared": dur})
    return out


def br_timeline(spec):
    """Becker Rig what-difference: each lane's wake, push-off, landing and money drop (the kit's timeLane for a lane
    with t and resultT, and the pre-run lane)"""
    d, lo = spec["data"], spec.get("lookOpts", {})
    opts = d["options"]
    race = lo.get("race", 1.8)
    Ms = [months_of(o["values"]["payoff"]) for o in opts]
    sec = race / max(Ms)
    out = []
    for i, o in enumerate(opts):
        natural = max(0.6, Ms[i] * sec)
        if o["t"] <= 0:
            out.append({"wake": None, "act": None, "start": None, "land": min(o.get("resultT", -0.6), -0.6), "val": None,
                        "natural": natural})
            continue
        W, rT = o["t"], o["resultT"]
        lead = min(max(rT - W - 0.35, 0.3), 0.42)
        act = min(W, rT - 0.35 - lead)
        start = max(rT - natural, act + lead)
        out.append({"wake": W, "act": act, "start": start, "land": rT, "val": rT + o.get("valueEvery", d.get("valueEvery", 0.45)),
                    "natural": natural})
    return out


def scan_hops(spec, tl):
    """Becker Rig lookOpts.scan: the hop times (the kit's rule: the listed lanes in order, else every waiting lane; a
    hop only while that lane still waits, 0.3 s before its wake)"""
    sc = spec.get("lookOpts", {}).get("scan") or {}
    if "t" not in sc:
        return []
    every = sc.get("every", 0.4)
    order = sc.get("options") or [i for i, b in enumerate(tl) if b["act"] is not None and b["act"] > sc["t"] + 0.3]
    return [sc["t"] + j * every for j, li in enumerate(order)
            if tl[li]["act"] is not None and tl[li]["act"] > sc["t"] + j * every + 0.3]


def caption_window(spec, li):
    """[on, off) of caption li: from its t (or frame 1) to the next caption's t; the last one to the end (Becker Rig:
    the verdict card replaces the caption band from verdict.t)"""
    vo = spec["vo"]
    on = max(0.0, vo[li]["t"])
    off = vo[li + 1]["t"] if li + 1 < len(vo) else spec["duration"]
    return on, off


def inside(t, win, early=0.0):
    return win[0] - early - 1e-9 <= t < win[1] + 1e-9


def motion_windows(spec):
    """(a, b) windows in which the kit moves something that a frame-difference audit registers (from the motion audits
    of the condensed renders): races, cuts, wakes, landings, reads, slams, slot pops, the lever, the scan's hops"""
    lo, d = spec.get("lookOpts", {}), spec["data"]
    win = []
    if spec["look"] == "scoreboard":
        tl = sb_timeline(spec)
        h = lo.get("readHold", 0.3)
        for i, b in enumerate(tl):
            if i == 0:
                win.append((0.0, 0.33))                                   # the frame-1 landing settles from frame 2
                continue
            win += [(b["cut"], b["cut"] + 0.35), (b["start"], b["land"]), (b["land"], b["land"] + 0.33)]
            if b["delta"] is not None:
                win.append((b["delta"], b["delta"] + 0.22))
        for st in lo.get("labelSteps", []):
            if st["t"] > 0.05:
                win.append((st["t"], st["t"] + 0.2))
        for r in lo.get("reads", []):
            if r.get("option") is None:
                win.append((r["t"], r["t"] + 0.25))                       # the hero bumps 6%, its glow flares
            else:
                win += [(r["t"], r["t"] + 0.1), (r["t"] + 0.08 + h, r["t"] + 0.08 + h + 0.25)]   # a cell swells, holds, eases
    else:
        tl = br_timeline(spec)
        for b in tl:
            if b["wake"] is None:
                continue
            win += [(b["wake"], b["wake"] + 0.2), (b["start"], b["land"]), (b["land"], b["land"] + 0.35), (b["val"], b["val"] + 0.25)]
        for c in lo.get("countCell", []) if isinstance(lo.get("countCell"), list) else [lo.get("countCell", {})]:
            if c:
                b = tl[c["option"]]
                win.append((b["val"], b["val"] + 0.8))
        sc = lo.get("scan")
        if sc:
            for tt in scan_hops(spec, tl):
                win.append((tt, tt + 0.44))
        for r in lo.get("reads", []):
            win.append((r["t"], r["t"] + 0.4))                             # a value bumps and flashes, its figure greens (0.3-0.47 measured)
        lv = lo.get("lever")
        if lv:
            win += [(lv["t"], lv["t"] + 0.5)] + [(x, x + 0.45) for x in lv.get("beats", [])]
        for x in lo.get("steps", []) + [f for f in lo.get("formulas", []) if isinstance(f, dict)]:
            win.append((x["t"], x["t"] + 0.15))                            # a working line pops into the slot
    return win


def longest_gap(win, t0, t1):
    t, gap, at = t0, 0.0, t0
    for a, b in sorted(win):
        if b <= t:
            continue
        a = min(a, t1)                     # (fixer pass: a window after t1 never stretches a gap past t1)
        if a > t and a - t > gap:
            gap, at = a - t, t
        t = max(t, b)
        if t >= t1:
            break
    if t < t1 and t1 - t > gap:
        gap, at = t1 - t, t
    return gap, at


def check_cond(sid, spec, land):
    """the condensed cut: captions paced for reading, every beat inside its caption, no still moment before the verdict"""
    key, look = KEY_OF[sid], spec["look"]
    d, lo, vo = spec["data"], spec.get("lookOpts", {}), spec["vo"]
    opts, dur = d["options"], spec["duration"]
    V = spec["verdict"]["t"]
    becker = look == "becker-rig"
    win = [caption_window(spec, i) for i in range(len(vo))]

    # ---- captions: on-screen text, read at phone size, back to back from frame 1
    for i, v in enumerate(vo):
        n = len(strip_markup(v["text"]).split())
        need = max(CAP_MIN, CAP_SPW * n)
        if becker and i == len(vo) - 1:
            # (Becker Rig: the verdict card takes the caption band at verdict.t, so the verdict's own line is never shown;
            # the card carries its claim, as in the round-2 cut)
            record(sid, f"vo[{i}] is the verdict's line: the verdict card replaces it (t = verdict.t)", v["t"], V, abs(v["t"] - V) < 1e-9)
            continue
        end = min(v["t"] + v["d"], V) if becker else v["t"] + v["d"]
        shown = end - max(0.0, v["t"])
        record(sid, f"vo[{i}] caption up >= max({CAP_MIN}, {n} words x {CAP_SPW}) s", f"{shown:.2f} s", f">= {need:.2f}", shown + 1e-9 >= need)
    gaps = [round(b["t"] - (a["t"] + a["d"]), 3) for a, b in zip(vo, vo[1:])]
    record(sid, f"captions back to back (each gap 0-{CAP_GAP} s)", gaps, f"each 0 <= gap < {CAP_GAP}", all(-1e-9 <= g < CAP_GAP for g in gaps))
    v0 = vo[0]
    if becker:
        n0 = len(strip_markup(v0["text"]).split())
        done = v0["t"] + (n0 - 1) * min(0.045, 0.32 / max(1, n0)) + 0.16
        record(sid, "hook caption complete on frame 1 (pre-typed: its last word settled by t = 0)", f"t {v0['t']}, settled {done:.3f}", "<= 0", done <= 1e-9)
    else:
        record(sid, "hook caption complete on frame 1 (t <= -0.14: no rise on frame 1)", v0["t"], "<= -0.14", v0["t"] <= -0.14 + 1e-9)
    record(sid, "verdict.t = last caption's t", V, vo[-1]["t"], abs(V - vo[-1]["t"]) < 1e-9)
    end = vo[-1]["t"] + vo[-1]["d"]
    record(sid, "hold = duration − last caption end", d["hold"], round(dur - end, 2), abs(d["hold"] - (dur - end)) < 0.051)
    record(sid, "no lookOpts.pat or pat over before the first read (it does not register at this figure size)",
           lo.get("pat"), "absent", "pat" not in lo)

    # ---- the beats: each option wakes / cuts on the caption that names it and lands in the caption that speaks it
    tl = br_timeline(spec) if becker else sb_timeline(spec)
    for oi, li in wakes_c[sid]:
        record(sid, f"option {oi} '{opts[oi]['name']}' {'wakes' if becker else 'cuts'} as vo[{li}] goes up", opts[oi]["t"], vo[li]["t"],
               abs(opts[oi]["t"] - vo[li]["t"]) < 1e-9)
    for oi, li in lands_c[sid]:
        ln = tl[oi]["land"]
        record(sid, f"option {oi} lands inside vo[{li}] (or as it goes up)", round(ln, 2), f"{win[li][0]:.2f}-{win[li][1]:.2f}", inside(ln, win, 0.05) if False else inside(ln, win[li], 0.05))
    if becker:
        for oi in range(1, len(opts)):
            b = tl[oi]
            record(sid, f"option {oi} wakes on its caption: resultT − t >= 0.77 s", round(b["land"] - b["wake"], 2), ">= 0.77", b["land"] - b["wake"] >= 0.77 - 1e-9)
            run = b["land"] - b["start"]
            record(sid, f"option {oi} runs at the shared speed (no wait, no strain: lead-in <= 0.6 s)", f"run {run:.2f}, lead-in {b['start'] - b['act']:.2f}",
                   f"run {b['natural']:.2f}", abs(run - b["natural"]) < 0.02 and b["start"] - b["act"] <= 0.6 + 1e-9)
    else:
        record(sid, "Scoreboard: frame 1 is the first option landed (resultT 0): it settles from frame 2", opts[0].get("resultT"), 0.0, opts[0].get("resultT") == 0.0)
        for oi in range(1, len(opts)):
            b = tl[oi]
            record(sid, f"option {oi} races at the shared speed, after its cut + 0.35 s", f"{b['start']:.2f}-{b['land']:.2f}",
                   f"run {b['shared']:.2f} from >= {b['cut'] + 0.35:.2f}", b["start"] >= b["cut"] + 0.35 - 1e-9 and abs((b["land"] - b["start"]) - b["shared"]) < 0.02)
        rh = lo.get("readHold")
        record(sid, "lookOpts.readHold (a cell read held 0.05-0.3 s, so no read leaves a still frame of 0.4 s)", rh, "0.05-0.3",
               rh is not None and 0.05 <= rh <= 0.3)

    # ---- reads: each inside the caption it answers, on a value already on screen, answering that caption's number
    lo_r = sorted(lo.get("reads", []), key=lambda r: r["t"])
    rx = reads_c[sid]
    record(sid, "lookOpts.reads count", len(lo_r), len(rx), len(lo_r) == len(rx))
    for k, (rd, (tgt, li, kw)) in enumerate(zip(lo_r, rx)):
        record(sid, f"reads[{k}] inside vo[{li}] ('{kw}')", rd["t"], f"{win[li][0]:.2f}-{win[li][1]:.2f}", inside(rd["t"], win[li]))
        toks = tokens(kw)
        if tgt == "hero":
            # the hero holds the active option's value of its metric (lookOpts.counter): the last option cut by then
            hk = lo.get("counter", "interest")
            k_on = max(i for i, b in enumerate(tl) if b["cut"] <= rd["t"])
            shown_v, on_by = opts[k_on]["values"][hk], tl[k_on]["land"]
            record(sid, f"reads[{k}] target: the hero (holding option {k_on}'s {hk})", rd.get("target"), "hero", rd.get("target") == "hero" and rd.get("option") is None)
            record(sid, f"reads[{k}] hero value landed before the read", round(on_by, 2), f"< {rd['t']}", on_by < rd["t"])
            if kw == "loan":
                record(sid, f"reads[{k}] 'More than the loan': the hero's interest > the loan", (shown_v, money(MORT_P)), "> loan",
                       val(shown_v) > MORT_P and "more than the loan" in vo[li]["text"].lower())
            elif toks and k_on > 0 and val(toks[0]) != val(shown_v):
                diff = val(opts[0]["values"][hk]) - val(shown_v)
                record(sid, f"reads[{k}] caption's '{kw}' = the shown difference the hero's value makes", toks[0], diff, abs(val(toks[0]) - diff) < 1e-6)
            else:
                said = val(toks[0]) if toks else None
                record(sid, f"reads[{k}] caption's '{kw}' speaks the hero's value", kw, shown_v,
                       said is not None and (said == val(shown_v) or (said == int(said) and said == round(val(shown_v)))))
            continue
        ois, mk = tgt
        ois = ois if isinstance(ois, tuple) else (ois,)
        ro = rd.get("option")
        got = (tuple(ro) if isinstance(ro, list) else (ro,), rd.get("metric"))
        record(sid, f"reads[{k}] target", got, (ois, mk), got == (ois, mk))
        shown_v = opts[ois[0]]["values"][mk]
        def on_screen(oi):
            b = tl[oi]
            if becker:
                if b["wake"] is None:
                    return -1.0
                cc = lo.get("countCell", {})
                if mk == "interest" and isinstance(cc, dict) and cc.get("option") == oi:
                    return b["val"] + 0.8                                   # a counted value has settled
                return b["val"] if mk == "interest" else b["land"]
            return b["land"]
        on_by = max(on_screen(oi) for oi in ois)
        record(sid, f"reads[{k}] value already on screen", round(on_by, 2), f"< {rd['t']}", on_by < rd["t"])
        if len(ois) > 1 and len({opts[oi]["values"][mk] for oi in ois}) > 1:
            # (fixer pass) a compare read: two different cells together; the caption gives their shown difference
            a_, b_ = (val(opts[oi]["values"][mk]) for oi in ois)
            record(sid, f"reads[{k}] compare read: the caption's '{kw}' = the shown difference of the two cells", (toks, a_ - b_), kw,
                   bool(toks) and abs(abs(a_ - b_) - val(toks[0])) < 1e-6 and 0 in ois)
        elif len(ois) > 1:
            vals_ = [opts[oi]["values"][mk] for oi in ois]
            record(sid, f"reads[{k}] pair cells show the same total; the caption gives the exact gap they hide", (vals_, toks),
                   money(pair_exact[sid]), len(set(vals_)) == 1 and bool(toks) and toks[0] == bare(money(pair_exact[sid])))
        elif kw == "12":
            lev = lo.get("lever", {}).get("options", [])
            record(sid, f"reads[{k}] 'not 12' marks Monthly (12 payments a year, outside the lever), after the lever's beats", (ois[0], lev, rd["t"]),
                   "0 ∉ lever", ois[0] == 0 and 0 not in lev and "not 12" in vo[li]["text"] and rd["t"] > max(lo["lever"].get("beats") or [lo["lever"]["t"]]))
        elif kw == "year":
            gap_ = val(opts[0]["values"]["payoff"]) - val(shown_v)
            record(sid, f"reads[{k}] 'year' marks the winner's crate after the winner beat: shown 72 − 60 = 12 months ≈ 1 year", (ois[0], gap_, rd["t"]),
                   f"winner, 12, > {V}", ois[0] == d["winner"] and gap_ == 12 and num(CAR_ROUND_SOONER_YRS) == "≈ 1" and rd["t"] > V
                   and "about a year" in vo[li]["text"].lower())
        elif kw == "owed":
            st2 = lo["labelSteps"][2]
            # (fixer pass: the compare read dims the label stack to 55%, so the label is up at full strength >= 0.5 s first)
            record(sid, f"reads[{k}] 'More than you owed': the interest cell again, >= {LABEL_FULL_B} s after 'More than the $5,000 owed', interest > stake",
                   (shown_v, st2["t"], rd["t"]), "> $5,000", val(shown_v) > CARD_B and rd["t"] >= st2["t"] + LABEL_FULL_B - 1e-9
                   and "more than you owed" in vo[li]["text"].lower())
        elif mk == "payoff" and not becker and toks and val(toks[0]) != val(shown_v) and "sooner" in vo[li]["text"].lower():
            # a bar label read on "40 months sooner" / "About 11 years sooner": the shown gap to the baseline's bar
            gap_y = val(opts[0]["values"]["payoff"]) - val(shown_v)
            said = val(toks[0])
            ok = round(gap_y * 12) == said if re.search(re.escape(kw) + r"\s+months", vo[li]["text"]) else round(gap_y) == said
            record(sid, f"reads[{k}] bar label: the shown gap to the baseline's bar is the caption's '{kw}'", round(gap_y, 1), kw, ok)
        elif mk == "interest" and toks and val(toks[0]) != val(shown_v):
            diff = val(opts[0]["values"]["interest"]) - val(shown_v)
            record(sid, f"reads[{k}] caption's '{kw}' = the shown difference this cell makes", toks[0], diff, abs(val(toks[0]) - diff) < 1e-6)
        else:
            said = val(toks[0]) if toks else None
            record(sid, f"reads[{k}] caption's '{kw}' speaks the marked value", kw, shown_v,
                   said is not None and (said == val(shown_v) or (said == int(said) and said == round(val(shown_v)))))

    # ---- the final reveal, the verdict and its hold
    if becker:
        cc = lo.get("countCell", {})
        fin_t, what = tl[cc["option"]]["val"] + 0.8, "the counted ≈ $8,200 settling"
    elif sid == idb:
        fin_t, what = tl[-1]["land"], "the last race landing"
    else:
        fin_t, what = tl[-1]["delta"], "the last delta"
    after = V - fin_t
    record(sid, f"verdict lands {VERDICT_AFTER[0]}-{VERDICT_AFTER[1]} s after {what}", f"{after:.2f} s", f"{VERDICT_AFTER[0]}-{VERDICT_AFTER[1]}",
           VERDICT_AFTER[0] - 1e-9 <= after <= VERDICT_AFTER[1] + 1e-9)
    hold = dur - V
    record(sid, f"verdict holds {VERDICT_HOLD[0]}-{VERDICT_HOLD[1]} s before the end card", f"{hold:.2f} s", f"{VERDICT_HOLD[0]}-{VERDICT_HOLD[1]}",
           VERDICT_HOLD[0] - 1e-9 <= hold <= VERDICT_HOLD[1] + 1e-9)
    if not becker:
        wT = d.get("winnerT")
        record(sid, "the hero's payoff lands 0.44-1.04 s into the verdict hold (data.winnerT − verdict.t)", None if wT is None else round(wT - V, 2), "0.44-1.04",
               wT is not None and 0.44 - 1e-9 <= wT - V <= 1.04 + 1e-9 and wT <= dur - 0.4)

    # ---- the scheduled motion (a proxy for the motion audit): no gap of STILL_MAX before the verdict
    gap, at = longest_gap(motion_windows(spec), 0.0, V)
    record(sid, f"scheduled motion: no gap >= {STILL_MAX} s before the verdict (proxy for the motion audit)", f"longest {gap:.2f} s at {at:.2f}",
           f"< {STILL_MAX}", gap < STILL_MAX - 1e-9)

    # ---- per teaser
    if sid == ida:
        sc = lo.get("scan", {})
        record(sid, "lookOpts.scan from frame 2 (the waiting figures hop in turn: frame 1 is the thumbnail, then it moves)", sc.get("t"),
               f"0-{FRAME:.3f}", sc.get("t") is not None and 0 <= sc["t"] <= FRAME + 1e-9)
        hops = scan_hops(spec, tl)
        last_hop = (hops[-1] + 0.44) if hops else -1
        first_read = min(r["t"] for r in lo["reads"])
        record(sid, "lookOpts.scan: hops 0.45 s apart at most, all over before Monthly's first read", (sc.get("every"), round(last_hop, 2)),
               f"<= 0.45, <= {first_read}", sc.get("every", 0.4) <= 0.45 + 1e-9 and last_hop <= first_read + 1e-9)
        empty_then = [i for i, o in enumerate(opts) if o["t"] > last_hop]
        record(sid, "lookOpts.scan: the lanes after the baseline are all still waiting", empty_then, [1, 2, 3], empty_then == [1, 2, 3])
        # (fixer pass) one figure's hop is a near-still frame difference (YAVG 0.13-0.23): the hops overlap (two figures in
        # the air at once, 0.29-0.35 measured) and the ripple runs until Monthly's caption goes up
        record(sid, "lookOpts.scan: the ripple (lanes 1, 2, 3, then 1 again), hops <= 0.3 s apart, every one taken",
               (sc.get("options"), sc.get("every"), len(hops)), (SCAN_ORDER_C[sid], "<= 0.3", len(SCAN_ORDER_C[sid])),
               sc.get("options") == SCAN_ORDER_C[sid] and sc.get("every", 0.4) <= 0.3 + 1e-9 and len(hops) == len(SCAN_ORDER_C[sid]))
        record(sid, "lookOpts.scan: the last hop lands within 0.1 s of vo[1] going up", round(last_hop, 2), f"{vo[1]['t'] - 0.1:.2f}-{vo[1]['t']:.2f}",
               vo[1]["t"] - 0.1 - 1e-9 <= last_hop <= vo[1]["t"] + 1e-9)
        n0 = len(strip_markup(vo[0]["text"]).split())
        up0 = vo[0]["t"] + vo[0]["d"]
        record(sid, "vo[0] (the hook) ends as its reading floor allows: the opening is not held (<= floor + 0.1 s)", round(up0, 2),
               f"<= {max(CAP_MIN, CAP_SPW * n0) + 0.1:.2f}", up0 <= max(CAP_MIN, CAP_SPW * n0) + 0.1 + 1e-9)
        # the Monthly beat: the crate read as its caption goes up; the working pops with the ≈ $10,000 read, late in the
        # caption, bridging into Biweekly's wake (the read alone registers as near-still)
        r10 = [r for r in lo["reads"] if r["option"] == 0 and r["metric"] == "interest"]
        f0 = lo["formulas"][0]
        f0t = f0["t"] if isinstance(f0, dict) else None
        record(sid, "formulas[0] pops with the ≈ $10,000 read, in the last 0.6 s of vo[1] before Biweekly wakes", (f0t, [r["t"] for r in r10], opts[1]["t"]),
               f"same t, >= {opts[1]['t'] - 0.6:.2f}", f0t is not None and len(r10) == 1 and abs(r10[0]["t"] - f0t) < 1e-9
               and opts[1]["t"] - 0.6 - 1e-9 <= f0t and inside(f0t, win[1]))
        record(sid, "the stake line ('7% APR · 72 months') holds >= 1.8 s from frame 1", f0t, ">= 1.8", f0t is not None and f0t >= 1.8 - 1e-9)
        lev = lo.get("lever", {})
        record(sid, "lookOpts.lever as vo[4] goes up ('Both add up to 13 …'), on the 13-payment lanes", (lev.get("t"), lev.get("options")), (vo[4]["t"], [1, 2]),
               abs(lev.get("t", -1) - vo[4]["t"]) < 1e-9 and lev.get("options") == [1, 2]
               and abs(CAR_YEAR_BIWK - CAR_YEAR_MONTHLY) < 0.005 and abs(CAR_YEAR_WK - CAR_YEAR_MONTHLY) < 0.005)
        lb = lev.get("beats", [])
        record(sid, "lookOpts.lever.beats: 1-3 later beats inside vo[4], each >= 0.3 s after the last", lb, f"inside {win[4][0]:.2f}-{win[4][1]:.2f}",
               1 <= len(lb) <= 3 and all(inside(x, win[4]) for x in lb) and all(b_ - a_ >= 0.3 - 1e-9 for a_, b_ in zip([lev.get("t", 0)] + lb, lb)))
        cc = lo.get("countCell", {})
        record(sid, "lookOpts.countCell = the winner's interest, counted down from the baseline", cc, "winner · interest · base",
               cc.get("option") == d["winner"] and cc.get("metric") == "interest" and cc.get("from") == "base")
        settle = tl[cc["option"]]["val"] + 0.8
        record(sid, "countCell settles inside vo[6] ('About $1,800 less')", round(settle, 2), f"{win[6][0]:.2f}-{win[6][1]:.2f}", inside(settle, win[6]))
        drop = val(opts[0]["values"]["interest"]) - val(opts[cc["option"]]["values"]["interest"])
        record(sid, "countCell: the count's drop (shown base − shown value) = the caption's $1,800", drop, val("$1,800"), drop == val("$1,800"))
        # the working slot: the steps (each inside the caption that carries its number, never before the value it cites)
        st = lo.get("steps", [])
        # (fixer pass: the round-2 steps[3] is back, at the verdict: the card hides the last caption, so the slot carries
        # its "$12 more a week" (steps[3]) and then its "about a year sooner" (steps[4]) through the hold)
        record(sid, "lookOpts.steps: 5 (steps[3] repeats Round up's working at the verdict)", len(st), 5, len(st) == 5)
        f3 = lo["formulas"][3] if isinstance(lo["formulas"][3], str) else lo["formulas"][3]["text"]
        record(sid, "steps[3] repeats formulas[3] as the verdict lands (the hidden caption's '$12 more a week')",
               (st[3]["t"] if len(st) > 3 else None), V, len(st) > 3 and st[3]["text"] == f3 and abs(st[3]["t"] - V) < 1e-9)
        record(sid, "no other step repeats formulas[3]", [k for k, x in enumerate(st) if x["text"] == f3], [3],
               [k for k, x in enumerate(st) if x["text"] == f3] == [3])
        # (the $1,800 working may pop in the count-down's last 0.4 s: inside the count, as the critic asked, so the count
        # is not a near-still stretch; the counted value is on screen from its drop and lands on ≈ $8,200 0.4 s later)
        cites = {0: tl[1]["val"], 1: tl[2]["val"], 2: settle - 0.4, 3: V, 4: V + SLOT_HOLD_VERDICT}
        for k, li, kw in steps_c[sid]:
            if k >= len(st):
                record(sid, f"lookOpts.steps[{k}] present", None, "a step", False)
                continue
            x = st[k]
            record(sid, f"lookOpts.steps[{k}] inside vo[{li}] ('{kw}'), not before what it cites", x["t"], f">= {cites[k]:.2f}, in {win[li][0]:.2f}-{win[li][1]:.2f}",
                   inside(x["t"], win[li]) and x["t"] >= cites[k] - 1e-9)
            stoks = tokens(x["text"])
            if tokens(kw):
                record(sid, f"lookOpts.steps[{k}] carries the caption's {kw}", stoks, kw, any(val(y) == val(tokens(kw)[0]) or round(val(y)) == val(tokens(kw)[0]) for y in stoks))
            else:
                record(sid, f"lookOpts.steps[{k}] carries the 'about a year' of vo[{li}]", stoks, "≈ 1", "about a year" in vo[li]["text"].lower() and num(CAR_ROUND_SOONER_YRS) in stoks)
        if len(st) < 5:
            st = st + [{"t": -1, "text": ""}] * (5 - len(st))
        pad = lambda t_, n_: t_ + ["0"] * max(0, n_ - len(t_))     # (a missing or short step fails, it does not crash)
        for k in (0, 2, 4):
            tk = pad(tokens(st[k]["text"]), 3)
            record(sid, f"lookOpts.steps[{k}] shown a − b = its result", tk, "a − b = c", abs(val(tk[0]) - val(tk[1]) - val(tk[2])) < 1e-6)
        tk = pad(tokens(st[3]["text"]), 3)
        record(sid, "lookOpts.steps[3] shown a + b = its result ($187.54 + $12.46 = $200)", tk, "a + b = c", abs(val(tk[0]) + val(tk[1]) - val(tk[2])) < 1e-6)
        tk = pad(tokens(st[4]["text"]), 4)
        record(sid, "lookOpts.steps[4]: a = Monthly's crate, b = the winner's crate (bare), ≈ on c; 12 months = ≈ 1 year", tk,
               f"{opts[0]['values']['payoff']} − {bare(opts[d['winner']]['values']['payoff'])}",
               tk[0] == opts[0]["values"]["payoff"] and tk[1] == bare(opts[d["winner"]]["values"]["payoff"]) and tk[2].startswith("≈ ")
               and val(tk[2]) == 12 and val(tk[2]) / 12 == val(tk[3]))
        gl_ = lo.get("gapLabel")
        gl_t = gl_ if isinstance(gl_, str) else (gl_ or {}).get("text")
        record(sid, "lookOpts.gapLabel = the step's ≈ 12, in months ('mo')", gl_t, f"{tk[2]} mo", isinstance(gl_t, str) and tokens(gl_t) == [tk[2]] and gl_t.endswith(" mo"))
        # one working line at a time; each holds long enough to read with its caption
        f0_ = lo["formulas"][0]
        slot = [(f0_["t"] if isinstance(f0_, dict) else min(r["t"] for r in lo["reads"] if r["option"] == 0), "formulas[0]")]
        for i, f_ in enumerate(lo["formulas"][1:], 1):
            slot.append((f_["t"] if isinstance(f_, dict) else opts[i]["t"], f"formulas[{i}]"))
        slot += [(x["t"], f"steps[{k}]") for k, x in enumerate(st)] + [(lo["lever"]["t"], "lever")]
        slot.sort()
        # (each line before the verdict >= 1.0 s; the two lines of the verdict hold >= 0.7 s each, the last to the card)
        need_ = lambda ta: SLOT_HOLD_VERDICT if ta >= V - 1e-9 else SLOT_HOLD_COND
        for (ta, na), (tb, nb) in zip(slot, slot[1:]):
            record(sid, f"slot line {na} holds >= {need_(ta)} s (until {nb})", round(tb - ta, 2), f">= {need_(ta)}", tb - ta >= need_(ta) - 1e-9)
        record(sid, f"slot line {slot[-1][1]} holds >= {need_(slot[-1][0])} s (to the end card)", round(dur - slot[-1][0], 2), f">= {need_(slot[-1][0])}",
               dur - slot[-1][0] >= need_(slot[-1][0]) - 1e-9)
        for li in year_lines[sid]:
            record(sid, f"vo[{li}] says 'about a year'", vo[li]["text"], "contains 'about a year'", "about a year" in vo[li]["text"].lower())
        ft = spec["footer"]
        record(sid, "becker footer: one line (≤ 36 characters, no break)", f"{len(ft)} chars", "≤ 36", len(ft) <= 36 and "\n" not in ft)
        record(sid, "lookOpts.formulas: one per option", len(lo["formulas"]), len(opts), len(lo["formulas"]) == len(opts))
    if sid == idb:
        lsx = lo.get("labelSteps", [])
        hero_r = min(r["t"] for r in lo["reads"] if r.get("option") is None)
        first_cell = min(r["t"] for r in lo["reads"] if r.get("option") == 0)
        rules = [(0, 0, "on screen at frame 1, one size down", lambda s_: s_["t"] == 0.0 and s_.get("small") is True),
                 (1, 0, "re-slams the note on 'Because it shrinks.', after the hero read, one size down",
                  lambda s_: inside(s_["t"], win[0]) and s_["t"] > hero_r + 0.25 and s_.get("small") is True and "because it shrinks" in vo[0]["text"].lower()),
                 (2, 1, "'More than the $5,000 owed' inside vo[1], after the $7,300 read", lambda s_: inside(s_["t"], win[1]) and s_["t"] > first_cell + 0.2),
                 (3, 3, "'$0 more than the first minimum' inside vo[3] ('Not a dollar more …')",
                  lambda s_: inside(s_["t"], win[3]) and "not a dollar more" in vo[3]["text"].lower())]
        record(sid, "lookOpts.labelSteps count", len(lsx), 4, len(lsx) == 4)
        for k, li, what, f_ in rules:
            s_ = lsx[k] if k < len(lsx) else {}
            oi = s_.get("option", -1)
            nxt = opts[oi + 1]["t"] if 0 <= oi and oi + 1 < len(opts) else V
            record(sid, f"lookOpts.labelSteps[{k}] {what}", s_.get("t"), f"vo[{li}]", bool(s_) and f_(s_) and opts[oi]["t"] <= s_["t"] < nxt)
        record(sid, "labelSteps[2] 'More than the $5,000 owed': interest > stake", (opts[0]["values"]["interest"], money(CARD_B)), "> $5,000",
               val(opts[0]["values"]["interest"]) > CARD_B and CARD["min"]["interest"] > CARD_B)
        record(sid, "scoreboard hero = the payoff metric (frame 1: '≈ 15.1 years', red); keepSpeed", (lo.get("counter"), opts[0]["values"]["payoff"], lo.get("keepSpeed")),
               "payoff · ≈ 15.1 years · True", lo.get("counter") == "payoff" and opts[0]["values"]["payoff"] == years_disp(CARD["min"]["years"]) and lo.get("keepSpeed") is True)
        record(sid, "no option carries a delta (the verdict alone says '≈ 10 years sooner')", [o.get("delta") for o in opts], "none",
               not any("delta" in o or "deltaT" in o for o in opts))
        record(sid, "lookOpts.heroEnd = 'value' (the hero lands ②'s own payoff; no endTag)", (lo.get("heroEnd"), lo.get("endTag")), "value · none",
               lo.get("heroEnd") == "value" and "endTag" not in lo)
        shown_gap = val(opts[0]["values"]["payoff"]) - val(opts[d["winner"]]["values"]["payoff"])
        record(sid, "the hero's roll (① 15.1 → ② 4.8) shows the verdict's ≈ 10", round(shown_gap, 1), num(CARD_SOONER_F1),
               num(shown_gap) == num(CARD_SOONER_F1) == "≈ 10" and tokens(spec["verdict"]["text"])[-1] == "≈ 10")
        record(sid, "no '13 years' anywhere on screen (write-up only)", "", "absent", not any(re.search(r"\b13 years", x) for _, x in string_leaves(spec)))
        # option 1's race carries the two captions between its cut and its landing (the hero rolls 15.1 → 4.8 under them)
        b1 = tl[1]
        record(sid, "option 1's race runs under 'Not a dollar more …' (starts by vo[3], lands as vo[4] goes up)", f"{b1['start']:.2f}-{b1['land']:.2f}",
               f"<= {vo[3]['t']}, ~{vo[4]['t']}", b1["start"] <= vo[3]["t"] + 1e-9 and abs(b1["land"] - vo[4]["t"]) <= 0.1 + 1e-9)
    if sid == idc:
        record(sid, "vo[0] is the hook's two lines merged word for word", vo[0]["text"], " … ".join(MERGED_03C),
               vo[0]["text"].startswith(MERGED_03C[0]) and vo[0]["text"].endswith(MERGED_03C[1]))
        fs = lo.get("footerSteps", [])
        hero_r = min(r["t"] for r in lo["reads"] if r.get("option") is None)
        # (fixer pass: the "× 360" working of "More than the loan" holds >= 1.6 s: footerSteps[1], the +$100 payment, waits
        # until inside "Add just $100 a month." instead of popping at the cut; the label stack shows that payment from the cut)
        f0t_ = fs[0]["t"] if fs else -1
        want = [("the working of 'More than the loan', inside vo[0] after the first hero read, the assumptions footer up >= 1.0 s first",
                 lambda x: inside(x, win[0]) and x > hero_r and x < opts[1]["t"] and x >= 1.0 - 1e-9),
                (f"inside vo[1] ('Add just $100 …'), after option 1's cut, >= {FOOTER_WORKING_C} s after footerSteps[0]",
                 lambda x: inside(x, win[1]) and x > opts[1]["t"] and x - f0t_ >= FOOTER_WORKING_C - 1e-9),
                ("at option 2's cut", lambda x: abs(x - opts[2]["t"]) < 1e-9),
                ("with the verdict", lambda x: abs(x - V) < 1e-9)]
        record(sid, "lookOpts.footerSteps count", len(fs), 4, len(fs) == 4)
        for k, (what, f_) in enumerate(want):
            x = fs[k] if k < len(fs) else {"t": -1, "text": ""}
            record(sid, f"lookOpts.footerSteps[{k}] {what}", x["t"], "", f_(x["t"]) and x["t"] > 0)
            record(sid, f"lookOpts.footerSteps[{k}] ≤ 45 chars (kit footer limit)", len(x["text"]), "≤ 45", len(x["text"]) <= 45)
        for k, (oi, li) in enumerate(((1, 2), (2, 4))):
            s_ = lo["labelSteps"][k]
            b = tl[oi]
            # (fixer pass: the label step first after the landing, then the bar-label read, then the delta: the "sooner"
            # line is up >= 1.0 s before the delta replaces it; it was 0.55 s)
            record(sid, f"lookOpts.labelSteps[{k}] inside vo[{li}], after its race lands, >= {LABEL_TO_DELTA_C} s before its delta", (round(b["land"], 2), s_["t"], b["delta"]),
                   f"in {win[li][0]:.2f}-{win[li][1]:.2f}", inside(s_["t"], win[li]) and b["land"] + 0.2 <= s_["t"] <= b["delta"] - LABEL_TO_DELTA_C + 1e-9 and s_["option"] == oi)
            br_ = [r["t"] for r in lo["reads"] if r.get("option") == oi and r.get("metric") == "payoff"]
            record(sid, f"option {oi}'s bar-label read between its label step and its delta", (s_["t"], br_, b["delta"]), "step < read < delta",
                   len(br_) == 1 and s_["t"] + 0.2 <= br_[0] <= b["delta"] - 0.2)
            nxt = opts[oi + 1]["t"] if oi + 1 < len(opts) else V
            record(sid, f"option {oi}'s delta inside vo[{li}] and up >= 0.9 s before the next cut", (b["delta"], nxt), f">= 0.9",
                   inside(b["delta"], win[li]) and nxt - b["delta"] >= 0.9 - 1e-9)
            record(sid, f"lookOpts.labelSteps[{k}] carries the caption's number", tokens(s_["text"]), tokens(vo[li]["text"])[0],
                   val(tokens(s_["text"])[-1]) == val(tokens(vo[li]["text"])[0]))


def claim(sid, what, shown, want, ok):
    record(sid, "claim: " + what, shown, want, ok)

# ---- maths statements made in VO, verdicts, captions, pinned comments and the write-up
claim(ida, "monthly schedule clears in 72 payments", CAR["monthly"]["n"], CAR_N, CAR["monthly"]["n"] == CAR_N)
claim(ida, "biweekly year = weekly year = 13 monthly payments",
      (money(CAR_YEAR_BIWK, 0.01), money(CAR_YEAR_WK, 0.01), money(CAR_YEAR_MONTHLY, 0.01)), "all equal",
      abs(CAR_YEAR_BIWK - CAR_YEAR_MONTHLY) < 0.005 and abs(CAR_YEAR_WK - CAR_YEAR_MONTHLY) < 0.005)
claim(ida, "weekly beats biweekly by < $50", money(CAR_WK_VS_BIWK, 0.01), "< $50", 0 < CAR_WK_VS_BIWK < 50)
claim(ida, "rounding up ≈ 1 year sooner", num(CAR_ROUND_SOONER_YRS, 2), "≈ 1", num(CAR_ROUND_SOONER_YRS) == "≈ 1")
claim(ida, "rounding = ≈ $54 more a month", money(CAR_ROUND_EXTRA_YR / 12), "≈ $54", money(CAR_ROUND_EXTRA_YR / 12) == "≈ $54")
claim(ida, "$44,000: a round loan just under both Edmunds 2026 averages, within 1.5%", CAR_P,
      f"≤ {EDMUNDS_Q2_AMOUNT:,} and ≤ {EDMUNDS_Q3_AMOUNT:,}, ≥ 98.5% of {EDMUNDS_Q3_AMOUNT:,}",
      CAR_P <= min(EDMUNDS_Q2_AMOUNT, EDMUNDS_Q3_AMOUNT) and CAR_P >= 0.985 * EDMUNDS_Q3_AMOUNT)
claim(ida, "screen never calls $44,000 'the average' (it is not its rounding)", money(EDMUNDS_Q3_AMOUNT, 1000),
      f"≠ {money(CAR_P)}", money(EDMUNDS_Q3_AMOUNT, 1000).replace("≈ ", "") != money(CAR_P))
claim(ida, "APR = Edmunds Q3 2026 average", pct(CAR_APR), pct(EDMUNDS_Q3_APR), CAR_APR == EDMUNDS_Q3_APR)
car_whatif = {apr: car_case(apr) for apr in CAR_WHATIF_APRS}
car_exact = car_case(CAR_APR, EDMUNDS_Q3_AMOUNT)
for lab, (pm_, s_) in [(pct(a, 0), v) for a, v in car_whatif.items()] + [("$44,664", car_exact)]:
    gap = (s_["monthly"]["months"] - s_["rounded"]["months"]) / 12
    wk = s_["biweekly"]["interest"] - s_["weekly"]["interest"]
    claim(ida, f"verdict holds at {lab}: rounding ≈ 1 yr sooner, weekly beats biweekly by < $50",
          (num(gap, 2), money(wk, 0.01)), "≈ 1 (0.75-1.25) / < $50", 0.75 <= gap <= 1.25 and 0 < wk < 50)
claim(idb, "minimum interest is more than the $5,000 owed", money(CARD["min"]["interest"], 100), "> $5,000",
      CARD["min"]["interest"] > CARD_B)
claim(idb, "first minimum = 1% of new balance + interest", money(CARD_FIRST_MIN, 0.01),
      money(c2(MIN_PCT * c2(CARD_B * (1 + CARD_APR / 12)) + c2(CARD_B * CARD_APR / 12)), 0.01),
      abs(CARD_FIRST_MIN - c2(MIN_PCT * c2(CARD_B * (1 + CARD_APR / 12)) + c2(CARD_B * CARD_APR / 12))) < 0.005)
mp = CARD["min"]["pays"]
claim(idb, "VO 'because it shrinks' / 'then shrinks': the minimum never rises", f"{FIRST_S} → {money(mp[-2], 0.01)}",
      "non-increasing", all(a >= b - 1e-9 for a, b in zip(mp[:-1], mp[1:-1])))
claim(idb, f"note: month {CARD_NOTE_MONTH} (end of year 3) is the first minimum under $100",
      (money(mp[CARD_NOTE_MONTH - 2], 0.01), money(CARD_MIN_AT_NOTE, 0.01)), "≥ $100 then < $100",
      mp[CARD_NOTE_MONTH - 2] >= 100 > CARD_MIN_AT_NOTE)
claim(idb, "option 2 holds the first minimum flat: 57 payments", (CARD_FLAT_FIRST["n"], round(CARD_FLAT_FIRST["years"], 2)),
      "(57, 4.75 → ≈ 4.8)", CARD_FLAT_FIRST["n"] == 57 and years_disp(CARD_FLAT_FIRST["years"]) == "≈ 4.8 years")
claim(idb, "verdict '≈ 10 years sooner' = exact (181 − 57) ÷ 12 rounded", num(CARD_SOONER_F1, 2), "≈ 10",
      num(CARD_SOONER_F1) == "≈ 10")
claim(idb, "caption states no interest saving: shown 7,300 − 3,100 drifts from the exact one",
      (rnd(CARD["min"]["interest"], 100) - rnd(CARD_FLAT_FIRST["interest"], 100), money(CARD_SAVE_F1, 100)),
      "4,200 ≠ ≈ $4,300", rnd(CARD["min"]["interest"], 100) - rnd(CARD_FLAT_FIRST["interest"], 100) != rnd(CARD_SAVE_F1, 100))
claim(idb, "pinned: rounding up to $150 ($7.41 above) only takes it from 57 months to 52",
      (money(CARD_150_OVER_MIN, 0.01), CARD_FLAT_FIRST["n"], CARD[150]["n"]), "($7.41, 57, 52)",
      money(CARD_150_OVER_MIN, 0.01) == "$7.41" and CARD_FLAT_FIRST["n"] == 57 and CARD[150]["n"] == 52)
claim(idb, "write-up only: a flat $250 is ≈ 13 years sooner than the minimum (shown 15.1 − 2.2 = 12.9 rounds the same)",
      (num(CARD_SOONER[250], 2), round(rnd(CARD["min"]["years"], 0.1) - rnd(CARD[250]["years"], 0.1), 1)), "≈ 13",
      num(CARD_SOONER[250]) == "≈ 13" and num(rnd(CARD["min"]["years"], 0.1) - rnd(CARD[250]["years"], 0.1)) == "≈ 13")
lo_card = card_case(BANKRATE_AUG_2026)
hi_card = card_case(FED_G19_Q2_2026)
claim(idb, "verdict holds at 19.56% and 22.15%: the first minimum held flat ≈ 10 yrs sooner",
      (num(lo_card["min"]["years"] - lo_card["flat1"]["years"], 2), num(hi_card["min"]["years"] - hi_card["flat1"]["years"], 2)),
      "both ≈ 10", num(lo_card["min"]["years"] - lo_card["flat1"]["years"]) == num(hi_card["min"]["years"] - hi_card["flat1"]["years"]) == "≈ 10")
claim(idc, "baseline clears in 360 payments", MORT[0]["n"], MORT_N, MORT[0]["n"] == MORT_N)
claim(idc, "VO: interest is more than the loan", money(MORT[0]["interest"], 100), f"> {money(MORT_P)}",
      MORT[0]["interest"] > MORT_P)
claim(idc, "+$100: 40 months sooner", MORT_SOONER_MO[100], 40, MORT_SOONER_MO[100] == 40)
claim(idc, "+$100: full extra in every month but the last", money(MORT[100]["extra_in"], 0.01),
      f"$100 × {MORT[100]['n'] - 1}", abs(MORT[100]["extra_in"] - 100 * (MORT[100]["n"] - 1)) < 0.005)
claim(idc, "footer step: shown ≈ $78,600 ÷ ($100 × 319) rounds like the exact ratio",
      (money(rnd(MORT_SAVE[100], 100) / (100 * MORT_FULL_EXTRAS), 0.01), money(MORT_PER_DOLLAR, 0.01)), "same ≈ $2.46",
      money(rnd(MORT_SAVE[100], 100) / (100 * MORT_FULL_EXTRAS), 0.01) == money(MORT_PER_DOLLAR, 0.01))
claim(idc, "+$100 for 319 full months = $31,900 put in", money(MORT[100]["extra_in"], 0.01), money(100 * MORT_FULL_EXTRAS),
      abs(MORT[100]["extra_in"] - 100 * MORT_FULL_EXTRAS) < 0.005)
claim(idc, "rate between Freddie Mac and MBA (both round to 7.3%)", pct(MORT_APR, 1),
      f"{pct(FREDDIE_OCT1_2026, 2)} / {pct(MBA_SEP25_2026, 2)}",
      pct(FREDDIE_OCT1_2026, 1) == pct(MBA_SEP25_2026, 1) == pct(MORT_APR, 1))
claim(idc, "loan < NAR median price (≈ 7% down)", pct(1 - MORT_P / NAR_MEDIAN_AUG_2026, 1), "≈ 6.8%",
      MORT_P < NAR_MEDIAN_AUG_2026)
m728 = mort_case(FREDDIE_OCT1_2026)
claim(idc, "verdict holds at 7.28%: +$100 saves > $75,000", money(m728[1][0][1] - m728[1][100][1], 100), "> $75,000",
      m728[1][0][1] - m728[1][100][1] > 75_000)

specs = [check_spec(s) for s in (ida, idb, idc)]

# ---- winner = the option the verdict names (03a rounding, 03b the first minimum kept, 03c +$100)
for sid, spec, kw in ((ida, specs[0], money(CAR_ROUND_UP)), (idb, specs[1], money(0)), (idc, specs[2], money(100))):
    w = spec["data"]["options"][spec["data"]["winner"]]
    named = kw in strip_markup(spec["verdict"]["text"]) and (kw in (w["name"] + " " + w["detail"]) or sid == idb)
    if sid == idb:
        named = named and w["name"] == f"Keep paying {FIRST_S}"
    record(sid, "winner = option the verdict names", w["name"], kw, named)

# ============================================================== report
print("Model results")
print(f"  03a car: payment {money(CAR_PMT, 0.01)} / {money(CAR_BIWK, 0.01)} / {money(CAR_WK, 0.01)} / {money(CAR_ROUND_UP)}")
for k in car_keys:
    r_ = CAR[k]
    print(f"     {k:9} n={r_['n']:4d}  months={r_['months']:6.2f}  interest={money(r_['interest'], 0.01):>11}  saves {money(CAR_SAVE[k], 0.01)}")
for lab, (pm_, s_) in [(f"{pct(a)} (what-if)", v) for a, v in car_whatif.items()] + [("$44,664 at 7% (Edmunds exact)", car_exact)]:
    print(f"     sensitivity {lab}: payment {money(pm_, 0.01)}; " +
          "; ".join(f"{k} {s_[k]['months']:.2f} mo {money(s_[k]['interest'], 100)}" for k in car_keys) +
          f"; weekly beats biweekly by {money(s_['biweekly']['interest'] - s_['weekly']['interest'], 0.01)}")
print(f"  03b card: first minimum {money(CARD_FIRST_MIN, 0.01)}")
for k in ("min", "flat1") + CARD_FLATS:
    r_ = CARD[k]
    print(f"     {str(k):5} n={r_['n']:4d}  years={r_['years']:5.2f}  interest={money(r_['interest'], 0.01):>11}")
print(f"     minimum: month 12 {money(CARD['min']['pays'][11], 0.01)}, month {CARD_NOTE_MONTH} {money(CARD_MIN_AT_NOTE, 0.01)}")
for lab, cs in (("19.56% (Bankrate)", lo_card), ("22.15% (Fed G.19)", hi_card)):
    print(f"     sensitivity {lab}: " + "; ".join(f"{k} {cs[k]['n']} pmts {cs[k]['years']:.2f} yrs {money(cs[k]['interest'], 100)}" for k in ("min", "flat1") + CARD_FLATS)
          + f"; first min {money(cs['min']['first'], 0.01)}")
print(f"  03c mortgage: payment {money(MORT_PMT, 0.01)}")
for x in MORT_EXTRAS:
    r_ = MORT[x]
    print(f"     +${x:<4} n={r_['n']:4d}  years={r_['years']:6.2f}  interest={money(r_['interest'], 0.01):>13}  saves {money(MORT_SAVE[x], 0.01)}  extra in {money(r_['extra_in'], 0.01)}")
print(f"     sensitivity 7.28% (Freddie Mac): payment {money(m728[0], 0.01)}; " +
      "; ".join(f"+${x} {m728[1][x][0]} mo {money(m728[1][x][1], 100)}" for x in MORT_EXTRAS))

w = [max(len(str(r_[i])) for r_ in rows_out) for i in range(5)]
w = [min(x, m) for x, m in zip(w, (33, 48, 46, 46, 4))]
print()
print(" | ".join(h.ljust(x) for h, x in zip(("spec", "field", "on screen / in spec", "computed", "ok"), w)))
print("-+-".join("-" * x for x in w))
for r_ in rows_out:
    cells = [str(c).replace("\n", " / ") for c in r_]
    cells = [c if len(c) <= x else c[: x - 1] + "…" for c, x in zip(cells, w)]
    print(" | ".join(c.ljust(x) for c, x in zip(cells, w)))
print(f"\n{len(rows_out)} checks, {len(fails)} failures")
if fails:
    print("\nFAILURES:")
    for f_ in fails:
        print("  " + f_)
    sys.exit(1)
print("ALL OK")
