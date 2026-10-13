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

Two cuts per teaser (condensed cut, 2026-10-13: the owner's "too many still moments are a killer for a short;
condense the rest. The CTA (end card) is good", on the 06b/06c precedent). A spec is checked against one of two
expectation sets, picked by its duration:
   - the round-2 cut (narration-paced VO lines; bodies of 36.5 / 36.6 / 31.0 s): retired from studio/specs/ on
     2026-10-13 and kept as a reference for a git-history copy (`git show 480efc1^:studio/specs/<id>.json`) passed
     with --spec; renders/channel/ still ships it until the ship step replaces it (SHIPPED names that cut). Its rules
     are the ones above.
   - the condensed cut (written in studio/specs-wip/; bodies of 34.95 / 35.75 / 28.8 s + the 2.5 s end card). 10b's
     (36.15 s since its fix pass) was promoted into studio/specs/ on 2026-10-13 and is what studio/specs/ holds
     (IN_SPECS; the sound and the ship follow). 10a's and 10c's (34.95 / 28.75 s) never reached studio/specs/: the
     recut below replaced them before the promotion, and they stay a reference for a git-history copy (`git show
     ca1087f:studio/specs-wip/<id>.json`) passed with --spec. The counter is real time ("since you hit play" is
     literal: $0 on frame 1, the rate, the stop on the last milestone), so every number, display string, lookOpts
     value, milestone and the counter's clock are the round-2 cut's; only the caption times, the verdict time, the
     duration and data.hold move. Its timing rules replace the narration
     rules (check_timing_cond): the lane (the last pass + the verdict's lag + its hold); the hook caption complete
     on frame 1 (Scoreboard: started >= 0.14 s before t = 0, its rise done; Becker Rig: its last word settled by
     t = 0); each caption up >= max(1.2 s, 0.12 s a word) from frame 1; captions back to back (gaps 0-0.2 s); each
     milestone's caption up within -0.15..+0.3 s of its pass (captions say "passed" / "gone", so never early);
     the lookOpts beats starting their caption lines; the counter moving every frame from frame 1 to the stop (a
     whole-dollar count at >= $1 a frame); the verdict 0.8-1.5 s after the final reveal (Scoreboard: the stop on
     the last milestone; Becker Rig: the lock's hit, where the board bursts, the stamp and the stopwatch's end
     label land) and held 1.2-1.6 s before the end card; a proxy for the motion audit (the reveal's own motion
     settles about 0.4 s after the stop on the Scoreboard and 0.75 s after the hit on the Becker Rig, as measured
     on the condensed renders; the gap from there to the verdict's first moving frame stays under 0.4 s); the
     verdict landing while the last caption is up (Scoreboard), or the last line hidden under it at its own time
     (Becker Rig, as 06c); the last caption ending >= 0.4 s before the card; hold = duration - counter end.
     Fix pass (2026-10-13, the critic's items): the verdict's hold is also at least its own reading time (0.12 s a
     word, counted as the captions are, "≈" included: 10b's 17-word verdict holds 2.04-2.14 s, the others 1.2-1.6 s);
     10c's verdict may land 0.75 s after the stop (it gives the motion audit margin; 10a and 10b keep 0.8); on the
     Scoreboard no text holds alone for more than 5.5 s before the reveal (the gaps between caption starts and label
     beats, 10c's 7.0 s rule hold was the critic's catch); and the Scoreboard run-up (lookOpts.runup, the kit's
     opt-in beat pulse over the last milestone's run-up) runs on the score's beat: lookOpts.runup.beat = P / N1 of
     the spec's row in studio/sound/BIBLE.md section 2.3 (read from the file), P = the last pass, the pulses
     covering the run-up from its last label beat with no gap of a beat or more; and a last caption the verdict
     repeats word for word (10c's "≈ 26 seconds.") ends within 0.5 s of the verdict landing. 10a's and 10c's
     condensed lookOpts also carry stream: 24 (a denser money stream; the kit default is 14).
   - the recut to the earlier verdict (10a and 10c only; the owner's decision of 2026-10-13, "Mixed": 10b ships
     real time as condensed, 10a and 10c take option B). The counter still runs in real time ("since you hit
     play" stays literal) but stops on a pass it already made in every cut: 10a on $500,000 at 16.256 s ("$500K a
     year: ≈ 16 seconds."), 10c on half a year of median pay, $32,526, at 13.201 s ("Half a year of median pay:
     ≈ 13 seconds."). The rows past the stop go (10a's $1M row and its coin, 10c's year row), the last kept row
     takes the coin, and the label beats and captions that sat after the new stop move before it (10a: the $970B
     working and "≈ $111 million an hour" at 4.65 and 6.4 s; 10c: the $77.7B working and the swap-in rule at 6.5 and
     8.2 s). Every caption and label string is a round-2 string except the new last caption ("**$500,000**:
     passed.", "And half a year?"), the new "Next" label and the new verdicts, all built from the same computed
     numbers. Its timing rules are the condensed cut's (check_timing_cond) with the recut's lane (the new last pass
     + the verdict's lag + its hold: 18.2-18.8 / 15.1-15.7 s), and three more: every label beat holds to the next
     one on 10a too (the resting rate never flashes between beats), the kit's riser (the run-up from the last label
     beat, min(2.4, gap - 0.4) s) is at least 0.8 s, so the score's P is the riser climax the run-up's beat is built
     on, and the run-up's (P, N1) is the recut's own §2.3 row (tempo-table on the recut's cue record: 10a 16.256 /
     40, 10c 13.201 / 33). The write-up's caption and pinned-comment numbers are checked against the cut the write-up
     describes (MD_CUT: the recut for 10a and 10c), so a caption that still says "$1 million ≈ 33 seconds" fails.
     Recut fix pass (2026-10-13, the critic's items): the run-up may start before the last label beat with the kit's
     own opt-in lookOpts.runup.from (10a 9.7 s, 10c 7.6 s: the coin pulses through the swap-in rule, where the stage
     measured near-still with the hero counter masked). check_runup then counts the pulses from `from` and holds it at
     or before the last label beat (the kit's riser keeps its own start, so the cue record does not move) and at least
     FROM_AFTER (1.0 s) after the previous pass (the last icon has dropped in and settled, so every pulse has an icon to
     bump). 10c's verdict stays at 13.96 s (14.0 was tried for the critic's N1 and not kept; see RECUT). Written in
     studio/specs-wip/, the recut was promoted into studio/specs/ on 2026-10-13 and is what studio/specs/ holds for
     10a and 10c (IN_SPECS; the sound and the ship follow).

Run:  python3 teasers/v2/checks/10-cost-counter.py                  (the specs in studio/specs/)
      python3 teasers/v2/checks/10-cost-counter.py --spec /tmp/10a-scoreboard-debt-interest-live.json ...
        (e.g. the retired round-2 cut: `git show 480efc1^:studio/specs/10a-scoreboard-debt-interest-live.json
        > /tmp/10a-scoreboard-debt-interest-live.json`, or 10a's real-time condensed cut: `git show
        ca1087f:studio/specs-wip/10a-scoreboard-debt-interest-live.json > /tmp/10a-scoreboard-debt-interest-live.json`)
      --spec [KEY=]PATH (repeatable) checks PATH in place of studio/specs/<id>.json. KEY is a, b or c (or 10a/10b/10c,
      or the full id); without it the file's stem must be one of the three ids. A round-2-length spec is checked as
      the round-2 cut; for 10a and 10c a spec in the condensed cut's lane as the condensed (real-time) cut and any
      other as the recut; for 10b any other length as the condensed cut (each fails its lane unless it is one).
      --md PATH checks the caption and pinned comments of PATH in place of teasers/v2/10-cost-counter.md (tests).
"""
import json
import math
import os
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

# ---- the two cuts (see the docstring): picked by the spec's duration
IDS = {"a": "10a-scoreboard-debt-interest-live", "b": "10b-becker-rig-debt-vs-your-pay", "c": "10c-scoreboard-amazon-makes"}
R2_DURATION = {"a": 36.5, "b": 36.6, "c": 31.0}            # the round-2 cut's body (s)
IN_SPECS = {"a": "recut", "b": "cond", "c": "recut"}       # the cut studio/specs/ must hold (promoted 2026-10-13;
                                                           # was {"a": "r2", "b": "r2", "c": "r2"})
SHIPPED = {"a": "r2", "b": "r2", "c": "r2"}                # the cut renders/channel/ ships (the ship step sets it to
                                                           # IN_SPECS); BIBLE.md's tempo rows may describe it until then
CUT_NAME = {"r2": "round-2 cut (narration-paced)", "cond": "condensed cut (2026-10-13)",
            "recut": "recut to the earlier verdict (2026-10-13)"}
MD_CUT = {"a": "recut", "b": "cond", "c": "recut"}         # the cut the write-up's caption and pinned comment describe
# the recut (10a and 10c, the owner's option B): the body is the new last pass (16.256 / 13.201 s) + the verdict's lag
# + its hold
RECUT_LANE = {"a": (18.2, 18.8), "c": (15.1, 15.7)}
# condensed-cut targets (the editor's brief for the owner's note, as for 06b/06c). The counter is real time, so a
# body is its last pass (32.51 / 33.27 / 26.40 s) + the verdict's lag (0.8-1.5 s) + its hold (1.2-1.6 s)
COND_LANE = {"a": (34.0, 35.6), "b": (35.0, 36.4), "c": (28.2, 29.5)}   # body (s), plus the 2.5 s end card
CAP_MIN, CAP_SPW = 1.2, 0.12     # captions (no narration): up >= 1.2 s a line, >= 0.12 s a word at phone size
CAP_GAP = 0.2                    # captions run back to back: each gap < 0.2 s
PASS_WIN = (-0.15, 0.3)          # a milestone's caption goes up this close to its pass (s, caption start - pass)
VERDICT_AFTER = {"a": (0.8, 1.5), "b": (0.8, 1.5), "c": (0.75, 1.5)}   # the verdict lands this long after the final
                                 # reveal (10c from 0.75: the coin's settle to the verdict band stays well under 0.4 s)
VERDICT_HOLD = (1.2, 1.6)        # and holds this long before the end card, or its reading time (CAP_SPW a word) if longer
STUTTER_MAX = 0.5                # a last caption the verdict repeats leaves within this long of the verdict landing
TEXT_GAP_MAX = 5.5               # Scoreboard: no text (caption start or label beat) holds alone longer before the reveal
BIBLE = REPO / "studio" / "sound" / "BIBLE.md"   # its section 2.3 rows give the score's beat up to P (lookOpts.runup)
RU_DUR = 0.32                    # the kit's run-up pulse lasts this long (looks/scoreboard/formats/cost-counter.js)
FROM_AFTER = 1.0                 # runup.from: the last icon drops in at the previous pass + its pop (<= 0.3 s), falls
                                 # (<= 0.3 s) and settles (0.24 s); a pulse from this long after the pass has it on stage
STILL_MAX = 0.4                  # the motion proxy never leaves this long a gap before the verdict
SETTLE = {"scoreboard": 0.40, "becker-rig": 0.75}   # the reveal's own motion (s after the reveal), measured
YIELD = {"scoreboard": 0.067, "becker-rig": 0.0}    # the verdict's first moving frame before verdict.t (label yield)
CAP_RISE = {"scoreboard": 0.14}  # a Scoreboard caption rises over 0.14 s (complete when started that long before 0)
CARD_PAD = 0.4                   # the last caption ends at least this long before the end card
CAP_TAIL = 0.15                  # both kits fade a caption out over 0.15 s past its end (runtime captionAt endPad)


MD_PATH = []                     # --md PATH (tests): the write-up whose caption and pinned comments are checked


def parse_spec_args(argv):
    """--spec [KEY=]PATH (repeatable) -> {id: Path}; --md PATH; see the module docstring"""
    out, i = {}, 0
    keys = {**{k: k for k in IDS}, **{f"10{k}": k for k in IDS}, **{sid: k for k, sid in IDS.items()}}
    while i < len(argv):
        a = argv[i]
        if a in ("-h", "--help"):
            print(__doc__)
            sys.exit(0)
        if a == "--md" or a.startswith("--md="):
            v = (argv[i + 1] if i + 1 < len(argv) else "") if a == "--md" else a.split("=", 1)[1]
            i += 1 if a == "--md" else 0
            if not os.path.isfile(v):
                sys.exit(f"--md {v}: no such file")
            MD_PATH.append(Path(os.path.abspath(v)))
        elif a == "--spec" or a.startswith("--spec="):
            if a == "--spec":
                i += 1
                v = argv[i] if i < len(argv) else ""
            else:
                v = a.split("=", 1)[1]
            if not v:
                sys.exit("--spec needs a path")
            head, eq_, tail = v.partition("=")
            if eq_ and head in keys:
                key, path = keys[head], tail
            elif eq_ and not os.path.exists(v):
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
            out[IDS[key]] = Path(os.path.abspath(path))
        else:
            sys.exit(f"unknown argument {a!r}; usage: 10-cost-counter.py [--spec [KEY=]PATH ...] [--md PATH]")
        i += 1
    return out


SPEC_PATHS = {sid: SPEC_DIR / f"{sid}.json" for sid in IDS.values()}
SPEC_PATHS.update(parse_spec_args(sys.argv[1:]))
KEY_OF = {sid: k for k, sid in IDS.items()}

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
# the recut (owner's option B, 2026-10-13): the counter stops on the $500,000 pass instead (5 dp: the exact-rate pass is
# 16.2556701 s, the kit's stored-rate pass 16.2556692 s; r × 16.25568 = $500,000.30, so the dollar reading is exact)
A["top_recut"] = 500000
A["run_recut"] = (F("0.0"), F("16.25568"))
A["final_exact_recut"] = RATE_A * (A["run_recut"][1] - A["run_recut"][0])     # 500,000.30
A["final_recut"] = usd(A["top_recut"])                                          # $500,000 (no ≈)
assert A["t"][A["top_recut"]] < A["run_recut"][1], "the $500,000 row must pass before the recut's stop"
assert pass_time(A["top_recut"], F("30758.5")) < A["run_recut"][1], "the kit's $500,000 pass must come before the stop"
assert abs(A["final_exact_recut"] - A["top_recut"]) < F(1, 2), "the recut must stop on $500,000 to the dollar"
assert A["shown"][A["top_recut"]] == 16, "the recut's verdict: $500K ≈ 16 seconds"
row("10a", "recut: final", "rate × 16.25568 s", A["final_exact_recut"], A["final_recut"] + " (the recut stops on the $500K pass)")

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
# (the pass rows t 3 / 10 / 20 / 30 / 40 yrs pay follow COND below: they name each cut's caption times)
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
# the recut (owner's option B, 2026-10-13): the counter stops on the half-year pass, $32,526 (exact 13.2012862 s, the
# kit's stored-rate pass 13.2012907 s; k × 13.2013 = $32,526.03, so the dollar reading is exact)
C["run_recut"] = (F("0.0"), F("13.2013"))
C["final_exact_recut"] = KEEP_C * (C["run_recut"][1] - C["run_recut"][0])     # 32,526.03
C["final_recut"] = usd(C["half"])                                              # $32,526 (no ≈)
assert C["kit_t"][2] < C["run_recut"][1] and C["t_half"] < C["run_recut"][1], "the half-year row must pass before the stop"
assert abs(C["final_exact_recut"] - C["half"]) < F(1, 2) and abs(F("2463.85") * C["run_recut"][1] - C["half"]) < F(1, 2), \
    "the recut must stop on $32,526 to the dollar (exact and stored rate)"
assert C["s_half"] == 13 and rhu(C["half"] / C["keep_shown"]) == 13, "half a year ≈ 13 s, by the exact and the shown rate"
row("10c", "recut: final", "rate × 13.2013 s", C["final_exact_recut"], C["final_recut"] + " (the recut stops on the half-year pass)")

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
for _w in EXPECTED:
    _w["cut"] = "r2"

# ---------- the condensed cut (2026-10-13) ----------------------------------------------------------------------
# The same strings, numbers, milestones, lookOpts and counter clock as the round-2 cut (the counter is real time:
# "since you hit play" is literal, so no pass can move); new caption times (reading-paced, back to back, the hook
# complete on frame 1), a new verdict time (0.8-1.5 s after the final reveal), a new duration (the verdict held
# 1.2-1.6 s) and data.hold = duration - counterT[1]. vo: (t, d) per line, in the round-2 order and wording.
import copy


def cond_of(base, duration, verdict_t, vo_td, sync, beats, reveal, hidden_last=False):
    w = copy.deepcopy(base)
    assert len(vo_td) == len(base["vo"])
    w["duration"] = duration
    w["vo"] = [(t, dd, text) for (t, dd), (_, _, text) in zip(vo_td, base["vo"])]
    w["verdict"] = (verdict_t, base["verdict"][1])
    w["data"]["hold"] = float(F(str(duration)) - F(str(base["data"]["counterT"][1])))
    w["sync_c"] = sync              # (milestone value, vo index): the caption that names it goes up at its pass
    w["beats"] = beats              # lookOpts beats: (t, the vo line it starts)
    w["reveal"] = reveal            # the final reveal: the stop (Scoreboard) or the lock's hit (Becker Rig)
    w["hidden_last"] = hidden_last  # Becker Rig: the last line lands under the verdict and is never shown (06c)
    w["cut"] = "cond"
    return w


COND = {
    # the stop on $1,000,000 at 32.511 s; the verdict 0.84 s later; "And the last row?" holds through the riser
    SPEC_A["id"]: cond_of(SPEC_A, 34.95, 33.35,
                          [(-0.4, 2.45), (2.1, 1.2), (3.3, 2.05), (5.4, 2.7), (8.15, 4.25), (12.45, 3.8),
                           (16.3, 2.75), (19.1, 3.55), (22.7, 5.25), (28.0, 4.45), (32.5, 2.05)],
                          sync=[(PAY, 1), (100000, 2), (250000, 4), (500000, 6), (10**6, 10)],
                          beats=SPEC_A["beats"], reveal=A["run"][1]),
    # the lock (33.274 s) and its hit at 33.3 s: the board bursts, the stamp and the stopwatch's end label land; the
    # question holds through it and the verdict replaces it 0.8 s later; "A working life" lands under the verdict.
    # Fix pass: the 17-word verdict holds its reading time, 2.05 s (body 36.15 s; 36.2 cost B3 0.9 dB at P's hit)
    SPEC_B["id"]: cond_of(SPEC_B, 36.15, 34.1,
                          [(-0.4, 2.85), (2.5, 1.65), (4.2, 4.05), (8.3, 2.25), (10.6, 5.8), (16.5, 1.6),
                           (18.2, 4.8), (23.1, 2.0), (25.1, 3.4), (28.6, 5.45), (34.1, 1.15)],
                          sync=[(PAY3, 1), (PAY10, 3), (PAY20, 5), (PAY30, 8)],
                          beats=[(16.5, 5), (28.6, 9)], reveal=F("33.3"), hidden_last=True),
    # the stop on $65,052 at 26.403 s (the coin grows 0.5 s); the verdict 0.76 s later. Fix pass: the $77.7B and
    # the swap-in rule beats (label + caption) move to 8.6 and 17.4 s, so no text holds alone over 5.4 s (the rule
    # held 7.0 s); "≈ 26 seconds." ends at 27.6 s, 0.44 s into the verdict, not 1.2 s under it
    SPEC_C["id"]: cond_of(SPEC_C, 28.75, 27.16,
                          [(-0.4, 3.15), (2.8, 2.15), (5.0, 3.55), (8.6, 4.55), (13.2, 4.15), (17.4, 5.35),
                           (22.8, 3.55), (26.4, 1.2)],
                          sync=[(C["five_cents"], 2), (C["half"], 4), (PAY, 7)],
                          beats=[(2.8, 1), (8.6, 3), (17.4, 5), (22.8, 6)], reveal=C["run"][1]),
}
# 10c: "Next: a year of median pay" (22.8 s) is held 3.7 s, not 3.6, so the label beat runs into the last pass
# (26.40258 s at the stored rate) instead of ending 2.6 ms before it. In the round-2 cut the verdict replaced the label
# stack at 26.4, so the gap never showed; with the verdict at 27.21 a frame inside it would flash the resting rate. No
# frame falls inside it (26.4 s ends the beat at 22.8 + 3.6 = 26.400000000000002 in float), so the picture and the cue
# record are unchanged, but the check now holds every beat to the next one (check_label_holds_c).
COND[SPEC_C["id"]]["lookOpts"]["rateSteps"][3]["d"] = 3.7
# Fix pass (2026-10-13): 10c's label beats follow their captions (8.6, 17.4 s), and a milestone label holds 4.2 s (the
# kit's flash; 3.0 by default), so the 5-second row's label reaches 8.6 s and the half-year's 17.4 s: the resting
# rate never flashes between beats (check_label_holds_c)
COND[SPEC_C["id"]]["lookOpts"]["rateSteps"][1]["t"] = 8.6
COND[SPEC_C["id"]]["lookOpts"]["rateSteps"][2]["t"] = 17.4
COND[SPEC_C["id"]]["lookOpts"]["flash"] = 4.2
# Fix pass: the Scoreboard run-up (lookOpts.runup, opt-in in the kit): the last icon, its ladder row and the hero's
# glow pulse on the score's beat from the last label beat to the last pass, the hero swells over the riser. beat =
# P / N1 of the spec's BIBLE section 2.3 row (10a 32.511 s / 80, 10c 26.403 s / 66; check_runup reads the rows)
COND[SPEC_A["id"]]["lookOpts"]["runup"] = {"beat": 0.40639}
COND[SPEC_C["id"]]["lookOpts"]["runup"] = {"beat": 0.40005}
# and a denser money stream (24 dots a second, the kit's default 14; a spec knob): the stage keeps moving while the
# counter climbs between beats (decoration; no cue, no text)
COND[SPEC_A["id"]]["lookOpts"]["stream"] = 24
COND[SPEC_C["id"]]["lookOpts"]["stream"] = 24
# (P, N1) of each cut's sound/BIBLE.md section 2.3 row: the run-up's beat is built on it, and BIBLE.md must carry the
# row of the cut studio/specs/ holds (IN_SPECS) or, until the sound pass's tempo-table --write for the promoted cuts,
# the row of the cut renders/channel/ ships (SHIPPED). The round-2 and condensed cuts share P (the same last pass) and
# N1; the recut's rows come from sound/tools/tempo-table.mjs --cues on its cue record (promoted into studio/specs/ on
# 2026-10-13; in BIBLE.md once the sound pass writes the table)
RUNUP_ROW = {"r2": {"a": (F("32.511"), 80), "c": (F("26.403"), 66)},
             "cond": {"a": (F("32.511"), 80), "c": (F("26.403"), 66)},
             "recut": {"a": (F("16.256"), 40), "c": (F("13.201"), 33)}}
RISER_MIN = 0.8                  # the kit cues its riser only when it lasts this long (P is then the riser climax)


# ---------- the recut to the earlier verdict (2026-10-13; 10a and 10c) --------------------------------------------
# The owner's decision ("Mixed"): 10b ships real time as condensed; 10a and 10c stop on a pass the counter already makes
# in every cut, so "since you hit play" stays literal: 10a on $500,000 (16.256 s), 10c on half a year of median pay
# ($32,526, 13.201 s). The rows past the stop go and the last kept row takes the coin; the beats after the new stop
# move before it. Every caption and label string is a round-2 string (picked by index below) except the new last
# caption, 10c's new "Next" label and question, and the verdicts, all built from the same numbers. vo: (t, d, text).
def recut_of(base, cond, *, duration, verdict, vo, milestones, run, final, lands_on, lookopts, sync, beats):
    w = copy.deepcopy(base)
    w["duration"] = duration
    w["vo"] = vo
    w["verdict"] = verdict
    w["data"]["milestones"] = milestones
    w["data"]["counterT"] = [float(run[0]), float(run[1])]
    w["data"]["final"] = final
    w["data"]["hold"] = float(F(str(duration)) - run[1])
    w["lookOpts"] = lookopts
    w["lands_on"] = lands_on
    w["sync_c"] = sync              # (milestone value, vo index): the caption that names it goes up at its pass
    w["beats"] = beats              # lookOpts beats: (t, the vo line it starts)
    w["reveal"] = run[1]            # the final reveal: the stop on the last kept milestone
    w["hidden_last"] = False
    w["cut"] = "recut"
    return w


_va, _rsa = SPEC_A["vo"], SPEC_A["lookOpts"]["rateSteps"]
_loa = copy.deepcopy(COND[SPEC_A["id"]]["lookOpts"])
_keep_a = [v for v in A["ladder"] if v <= A["top_recut"]]
_loa.update({
    "labels": _loa["labels"][:len(_keep_a)],
    # the $970B working and the hourly working move before the stop (4.65, 6.4 s); the rule to 10.55 s; "Next" names
    # the new last row. Each holds to the next beat (d clamped by the kit to the next beat's start)
    "rateSteps": [{**_rsa[3], "t": 4.65, "d": 1.75}, {**_rsa[2], "t": 6.4, "d": 1.75},
                  {**_rsa[1], "t": 10.55, "d": 2.9}, {**_rsa[4], "l2": f"{usd(A['top_recut'])} a year", "t": 13.45, "d": 2.85}],
    "pipLabels": _loa["pipLabels"][:len(_keep_a)],
    "icons": ["bill"] * (len(_keep_a) - 1) + ["coin"],   # the $500K row takes the coin
    # P / N1 = 16.256 / 40 (the recut's row). Recut fix pass: from 9.7 s (the kit's opt-in `from`), so the coin pulses
    # from 9.75 s, once the $250K label has had its read, through the rule and "Next" (the riser keeps its 13.45 s
    # prevT): with the hero counter masked, 9.67-10.57 s measured near-still before (the critic's S1)
    "runup": {"beat": 0.4064, "from": 9.7},
})
_vc, _rsc = SPEC_C["vo"], SPEC_C["lookOpts"]["rateSteps"]
_loc = copy.deepcopy(COND[SPEC_C["id"]]["lookOpts"])
_loc.update({
    "labels": _loc["labels"][:3],
    # the $77.7B working and the swap-in rule move before the stop (6.5, 8.2 s); the new "Next" beat at 10.8 s works
    # the footer's pay down to the half year (the kit's riser then lasts 2.0 s: see the Review log, BANDS)
    "rateSteps": [dict(_loc["rateSteps"][0]), {**_rsc[1], "t": 6.5, "d": 1.7}, {**_rsc[2], "t": 8.2, "d": 2.6},
                  {"t": 10.8, "l1": f"{usd(MEDIAN_WEEKLY)} × {WEEKS} ÷ 2 = {usd(C['half'])}",
                   "l2": "Next: half a year of median pay", "d": 2.45}],
    "pipLabels": _loc["pipLabels"][:3],
    "pipPassed": _loc["pipPassed"][:3],
    "icons": ["bill", "bill", "coin"],                    # the half-year row takes the coin
    # P / N1 = 13.201 / 33 (the recut's row). Recut fix pass: from 7.6 s, so the coin pulses from 7.60 s through the
    # $77.7B working's last beat, the rule and "Next" (the riser keeps its 10.8 s prevT): with the hero counter masked,
    # 7.67-8.20 and 8.93-10.80 s measured near-still before, 10.17-10.67 s still (the critic's S2)
    "runup": {"beat": 0.40003, "from": 7.6},
})
RECUT = {
    # the stop on $500,000 at 16.256 s; the verdict 0.81 s later, held 1.53 s
    SPEC_A["id"]: recut_of(
        SPEC_A, COND[SPEC_A["id"]], duration=18.6,
        verdict=(17.07, f"**${A['top_recut'] // 1000}K** a year: ≈ {secs_text(A['shown'][A['top_recut']])}."),
        vo=[(-0.4, 2.45, _va[0][2]), (2.1, 1.2, _va[1][2]), (3.3, 1.3, _va[2][2]), (4.65, 1.7, _va[8][2]),
            (6.4, 1.7, _va[7][2]), (8.15, 2.35, _va[4][2]), (10.55, 2.85, _va[5][2]), (13.45, 2.75, _va[9][2]),
            (16.25, 1.95, f"**{usd(A['top_recut'])}**: passed.")],
        milestones=[m for m in SPEC_A["data"]["milestones"] if m[0] <= A["top_recut"]],
        run=A["run_recut"], final=A["final_recut"], lands_on=A["top_recut"], lookopts=_loa,
        sync=[(PAY, 1), (100000, 2), (250000, 5), (A["top_recut"], 8)],
        beats=[(4.65, 3), (6.4, 4), (10.55, 6), (13.45, 7)]),
    # the stop on $32,526 at 13.201 s (the coin grows 0.5 s); the verdict 0.76 s later, held 1.59 s. (Recut fix pass:
    # 14.0 s, 0.80 s after the stop, was rendered and measured for the critic's N1 and not kept: it stretched the
    # landing's near-still with the hero masked from 0.37 to 0.43 s, 13.53-13.97, for a 0.04 s later verdict)
    SPEC_C["id"]: recut_of(
        SPEC_C, COND[SPEC_C["id"]], duration=15.55,
        verdict=(13.96, f"Half a year of median pay:\n**≈ {C['s_half']} seconds**."),
        vo=[(-0.4, 3.15, _vc[0][2]), (2.8, 2.15, _vc[1][2]), (5.0, 1.45, _vc[2][2]), (6.5, 1.65, _vc[3][2]),
            (8.2, 2.55, _vc[5][2]), (10.8, 2.35, "And half a year?"), (13.2, 1.2, _vc[4][2])],
        milestones=SPEC_C["data"]["milestones"][:3],
        run=C["run_recut"], final=C["final_recut"], lands_on=C["half"], lookopts=_loc,
        sync=[(C["five_cents"], 2), (C["half"], 6)],
        beats=[(2.8, 1), (6.5, 3), (8.2, 4), (10.8, 5)]),
}

# the 10b pass rows of the printed table, with each cut's caption (round-2: the VO line) times, put back in their
# place (after "t 1 yr (block 1)")
_n0 = len(VALUES)
for _what, _f, _v, _li in (("t 3 yrs pay", "$195,156 ÷ rate", "t_pay3", 1), ("t 10 yrs pay", "$650,520 ÷ rate", "t_pay10", 3),
                           ("t 20 yrs pay", "$1,301,040 ÷ rate", "t_pay20", 5), ("t 30 yrs pay", "$1,951,560 ÷ rate", "t_pay30", 8)):
    row("10b", _what, _f, B[_v], f"round-2 VO {SPEC_B['vo'][_li][0]} · condensed caption {COND[SPEC_B['id']]['vo'][_li][0]}"
        + (" ('20 years' said at 16.88 in round 2)" if _li == 5 else ""))
row("10b", "t 40 yrs pay", "$2,602,080 ÷ rate", B["t_pay40"],
    f"≈ {B['s_pay40']} seconds (the lock's hit 33.3; verdict round-2 {SPEC_B['verdict'][0]} · condensed {COND[SPEC_B['id']]['verdict'][0]})")
_new = VALUES[_n0:]
del VALUES[_n0:]
_at = next(i for i, r in enumerate(VALUES) if r[0] == "10b" and r[1] == "t 1 yr (block 1)") + 1
VALUES[_at:_at] = _new

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

# Every number allowed in any display string or VO line, per teaser: computed values + labelled constants. The recut
# drops what it no longer shows: 10a's $1 million row ($1,000,000, "$1M", ≈ 33 s), 10c's year row (≈ 26 s).
def allowed_numbers(tid, cut=None):
    out = _allowed_numbers(tid)
    if cut == "recut" and tid == "10a":
        out -= {F(10**6), F(10**6 // 1000), F(A["shown"][10**6])}
    if cut == "recut" and tid == "10c":
        out -= {F(C["s_keep_pay"])}
    return out


def _allowed_numbers(tid):
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
    sid, key = want["id"], KEY_OF[want["id"]]
    path = SPEC_PATHS[sid]
    check(path.exists(), tid, "spec file exists", str(path))
    if not path.exists():
        return
    spec = json.loads(path.read_text())

    # ---- which cut: the round-2 cut by its length; for 10a and 10c a spec in the condensed cut's lane is the condensed
    # (real-time) cut and any other the recut; for 10b any other length the condensed cut (each fails its lane if not one)
    dur_ = spec.get("duration", 0)
    if abs(dur_ - R2_DURATION[key]) < 1e-9:
        cut = "r2"
    elif key in RECUT_LANE and not (COND_LANE[key][0] - 1e-9 <= dur_ <= COND_LANE[key][1] + 1e-9):
        cut = "recut"
    else:
        cut = "cond"
    in_specs = path.resolve() == (SPEC_DIR / f"{sid}.json").resolve()
    check(cut == IN_SPECS[key] if in_specs else True, tid, "studio/specs/ holds the expected cut",
          f"{CUT_NAME[cut]} in studio/specs/, want {CUT_NAME[IN_SPECS[key]]}")
    CUTS[sid] = (CUT_NAME[cut], os.path.relpath(path, REPO))
    if cut == "cond":
        want = COND[sid]
    elif cut == "recut":
        want = RECUT[sid]

    # ---- contract shape -------------------------------------------------------------
    eq(tid, "id", spec.get("id"), sid)
    if in_specs:
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
    allowed = allowed_numbers(tid, want["cut"])
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
    check(len(strip_markup(spec["header"]).split()) <= 15, tid, "header <= 15 words (R8)")
    if tid == "10c" or want["cut"] == "recut":
        check_label_holds(tid, spec)
    if want["cut"] in ("cond", "recut"):
        check_timing_cond(tid, spec, want, d, rate, t0, t1)
        ROWS.append((want["id"], len(spec["vo"]), len(d["milestones"]), d["rateDisplay"], d["final"], spec["duration"]))
        return
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

    ROWS.append((want["id"], len(spec["vo"]), len(d["milestones"]), d["rateDisplay"], d["final"], dur))


def check_label_holds(tid, spec):
    """the Scoreboard (10c on every cut, 10a on the recut): every label beat (the kit's passes at the stored rate, the
    rate steps) holds to the next beat or the verdict, so the resting rate never flashes between beats (it shows only
    before the first pass)"""
    lo, d = spec["lookOpts"], spec["data"]
    kit_rate, t0 = F(str(d["perSecond"])), F(str(d["counterT"][0]))
    beats = sorted([(float(t0 + F(str(m["value"])) / kit_rate), lo.get("flash", 3.0)) for m in d["milestones"]]
                   + [(s["t"], s.get("d", 4.0)) for s in lo.get("rateSteps", [])])
    vt = spec["verdict"]["t"]
    beats = [b for b in beats if b[0] < vt]
    nxt = [b[0] for b in beats[1:]] + [vt]
    for (t, hold), n in zip(beats, nxt):
        check(t + hold >= n - 1e-9, tid, f"label beat at {t:.3f} s holds to the next beat ({n:.3f} s)",
              f"ends {t + hold:.3f} s")


def check_timing_cond(tid, spec, want, d, rate, t0, t1):
    """the condensed cut: captions paced for reading, every pass under its caption, the verdict after the reveal"""
    key, look = KEY_OF[want["id"]], spec["look"]
    vo, dur, vt = spec["vo"], spec["duration"], spec["verdict"]["t"]
    lo_, hi_ = (RECUT_LANE if want["cut"] == "recut" else COND_LANE)[key]
    check(lo_ - 1e-9 <= dur <= hi_ + 1e-9, tid, f"{'recut' if want['cut'] == 'recut' else 'condensed'} body in its lane "
          f"({lo_}-{hi_} s, + the 2.5 s end card)", str(dur))

    # frame 1: the hook caption complete (no type-on), the counter moving from frame 2 to the stop
    v0 = vo[0]
    if look == "scoreboard":
        check(v0["t"] <= -CAP_RISE["scoreboard"] + 1e-9, tid, "hook caption complete on frame 1 (its 0.14 s rise done)",
              f"vo[0].t = {v0['t']}")
    else:
        n = len(strip_markup(v0["text"]).split())
        done = v0["t"] + (n - 1) * min(0.045, 0.32 / max(1, n)) + 0.16
        check(done <= 1e-9, tid, "hook caption complete on frame 1 (its last word settled by t = 0)",
              f"settles at {done:.3f} s")
    check(float(t0) <= 0 and d["dp"] == 0 and F(str(d["perSecond"])) / spec["fps"] >= 1, tid,
          "the counter moves every frame from frame 1 to the stop (>= $1 a frame)", f"{d['perSecond']} / {spec['fps']}")

    # captions: reading-paced, back to back; a Becker Rig line at the verdict is never shown (the verdict replaces it)
    hidden = want["hidden_last"]
    shown = vo[:-1] if hidden else vo
    for i, v in enumerate(shown):
        words = len(strip_markup(v["text"]).split())
        need = max(CAP_MIN, CAP_SPW * words)
        up = v["t"] + v["d"] - max(0.0, v["t"])
        check(up >= need - 1e-9, tid, f"vo[{i}] up >= {need:.2f} s from frame 1 ({words} words)", f"up {up:.2f} s")
    for i in range(len(vo) - 1):
        gap = vo[i + 1]["t"] - (vo[i]["t"] + vo[i]["d"])
        check(-1e-9 <= gap < CAP_GAP - 1e-9, tid, f"captions back to back: vo[{i}] -> vo[{i + 1}] gap < {CAP_GAP} s",
              f"{gap:.2f} s")

    # each milestone's caption goes up at its pass (they say "passed" / "gone": never early); every pass under a caption
    for value, li in want["sync_c"]:
        passed = pass_time(value, rate, t0)
        lag = F(str(vo[li]["t"])) - passed
        check(F(str(PASS_WIN[0])) <= lag <= F(str(PASS_WIN[1])), tid,
              f"milestone {float(value):,.2f}'s caption vo[{li}] goes up at its pass ({PASS_WIN[0]}..+{PASS_WIN[1]} s)",
              f"pass {float(passed):.3f} s, caption {vo[li]['t']} ({float(lag):+.3f})")
    for m in d["milestones"]:   # (a caption stays up CAP_TAIL s past its end as it fades, unless the next one starts)
        tp = float(pass_time(F(str(m["value"])), rate, t0))
        check(any(v["t"] <= tp < v["t"] + v["d"] + CAP_TAIL for v in shown), tid,
              f"milestone {m['value']:,} passes under a caption", f"{tp:.3f} s")
    for t, li in want["beats"]:
        eq(tid, f"beat {t} starts vo[{li}]", vo[li]["t"], t)

    # the final reveal: the stop on the last milestone (Scoreboard), or the lock's hit (Becker Rig: the burst, the
    # stamp and the stopwatch's end label land on it)
    reveal = float(want["reveal"])
    if look == "scoreboard":
        check(abs(reveal - float(t1)) < 1e-9, tid, "the final reveal is the stop on the last milestone", f"{reveal} vs {float(t1)}")
    else:
        lo = spec["lookOpts"]
        check(0 <= reveal - float(t1) <= 0.1, tid, "the final reveal is the lock (the first beat on or after the stop)",
              f"{reveal} vs stop {float(t1)}")
        check(any(x["kind"] == "hit" and abs(x["t"] - reveal) < 1e-9 for x in spec.get("sfx", [])), tid,
              "the lock's hit lands on the reveal")
        check(abs(lo["gag"]["t"] - reveal) < 1e-9 and abs(lo["timer"]["endLabel"]["t"] - reveal) < 1e-9
              and any(k["state"] == "burst" and abs(k["t"] - reveal) < 1e-9 for k in lo["heat"]), tid,
              "the stamp, the stopwatch's end label and the burst land on the reveal")

    # the verdict: 0.8-1.5 s after the reveal (10c from 0.75), held 1.2-1.6 s or its reading time if longer (0.12 s a
    # word, counted as the captions are; up to 0.1 s over it); the motion proxy across the gap
    lag = vt - reveal
    va = VERDICT_AFTER[key]
    check(va[0] - 1e-9 <= lag <= va[1] + 1e-9, tid, f"verdict {va[0]}-{va[1]} s after the final reveal ({reveal:.3f} s)",
          f"{lag:.3f} s")
    hold = dur - vt
    vwords = len(strip_markup(spec["verdict"]["text"]).split())
    h_lo = max(VERDICT_HOLD[0], round(CAP_SPW * vwords, 2))
    h_hi = max(VERDICT_HOLD[1], round(h_lo + 0.1, 2))
    check(h_lo - 1e-9 <= hold <= h_hi + 1e-9, tid,
          f"verdict held {h_lo:.2f}-{h_hi:.2f} s before the end card ({vwords} words: >= {CAP_SPW} s a word)", f"{hold:.2f} s")
    gap = (vt - YIELD[look]) - (reveal + SETTLE[look])
    check(gap < STILL_MAX, tid, f"motion proxy: the reveal settles +{SETTLE[look]} s, the verdict moves within "
          f"{STILL_MAX} s of it", f"{gap:.3f} s")
    last = vo[-1]
    if hidden:
        eq(tid, "the last line lands under the verdict (never shown; Becker Rig, as 06c)", last["t"], vt)
        prev = vo[-2]
        check(prev["t"] <= reveal < prev["t"] + prev["d"], tid, "a caption is up through the reveal",
              f"vo[-2] {prev['t']}-{prev['t'] + prev['d']:.2f}")
    else:
        check(last["t"] <= vt <= last["t"] + last["d"], tid, "the verdict lands while the last caption is up",
              f"{last['t']}-{last['t'] + last['d']:.2f} vs {vt}")
        # a last caption the verdict repeats word for word ("≈ 26 seconds." under "… ≈ 26 seconds.") leaves soon after
        # the verdict lands, or the two read as a stutter (fix pass, 10c)
        norm = lambda s: re.sub(r"[^\w≈$ ]", "", strip_markup(s).replace("\u00a0", " ").lower()).split()
        lw, vw = norm(last["text"]), norm(spec["verdict"]["text"])
        if any(vw[i:i + len(lw)] == lw for i in range(len(vw) - len(lw) + 1)):
            over = last["t"] + last["d"] - vt
            check(over <= STUTTER_MAX + 1e-9, tid, f"the last caption, repeated in the verdict, ends <= {STUTTER_MAX} s after it lands",
                  f"{over:.2f} s")
    check(dur >= last["t"] + last["d"] + CARD_PAD - 1e-9, tid, f"the last caption ends >= {CARD_PAD} s before the end card")
    check(abs(d["hold"] - (dur - float(t1))) < 1e-9, tid, "hold = duration - counter end",
          f"{d['hold']} vs {dur - float(t1):.5f}")

    if look == "scoreboard":
        # no text holds alone for long: the gaps between caption starts and label beats (the kit's passes at the stored
        # rate, the rate steps), from frame 1 to the reveal
        lo = spec["lookOpts"]
        kit_rate = F(str(d["perSecond"]))
        ev = sorted({0.0} | {max(0.0, v["t"]) for v in vo if v["t"] < reveal}
                    | {float(t0 + F(str(m["value"])) / kit_rate) for m in d["milestones"]}
                    | {s["t"] for s in lo.get("rateSteps", [])})
        ev = [e for e in ev if e <= reveal + 1e-9]
        gaps = [(b - a, a, b) for a, b in zip(ev, ev[1:])]
        g, a, b = max(gaps)
        check(g <= TEXT_GAP_MAX + 1e-9, tid, f"no text holds alone over {TEXT_GAP_MAX} s before the reveal (captions, label beats)",
              f"{g:.2f} s, {a:.2f}-{b:.2f}")
        check_runup(tid, key, spec, t1, want["cut"])


def bible_row(tid):
    """the spec's row of the tempo table in studio/sound/BIBLE.md section 2.3: (rule, P, N1), or None"""
    if not BIBLE.exists():
        return None
    m = re.search(rf"^\| {tid} \| ([\w+]+) \| ([\d.]+) \| (\d+) \(r\d\) \| ([\d.]+) \|", BIBLE.read_text(), re.M)
    return (m.group(1), F(m.group(2)), int(m.group(3))) if m else None


def check_runup(tid, key, spec, t1, cut):
    """lookOpts.runup (the Scoreboard's opt-in run-up pulse): its beat is the score's beat up to the payoff, P / N1 of
    the cut's section 2.3 row (RUNUP_ROW; BIBLE.md carries the row of the cut studio/specs/ holds, or the shipped
    cut's until the sound pass's tempo-table --write), with P the riser
    climax = the last pass, and the kit's riser at least RISER_MIN s long so that P is the riser climax; the pulses
    (tp - k * beat, back to the last label beat before the pass) leave no gap of RU_DUR + 0.4 s or more"""
    ru = spec["lookOpts"].get("runup")
    check(isinstance(ru, dict) and isinstance(ru.get("beat"), (int, float)), tid, "lookOpts.runup.beat set (the run-up pulse)",
          str(ru))
    if not (isinstance(ru, dict) and isinstance(ru.get("beat"), (int, float))):
        return
    beat = F(str(ru["beat"]))
    P, N1 = RUNUP_ROW[cut][key]
    # the rows BIBLE.md may carry: the cut studio/specs/ holds (after the sound pass's tempo-table --write) or, until
    # then, the cut renders/channel/ ships (SHIPPED; the ship step sets it to IN_SPECS, so only the first is left)
    rows_ok = {RUNUP_ROW[SHIPPED[key]][key]: SHIPPED[key], RUNUP_ROW[IN_SPECS[key]][key]: IN_SPECS[key]}
    br = bible_row(tid)
    check(br is not None, tid, "the spec's tempo row is in BIBLE.md section 2.3", str(BIBLE))
    if br is not None:
        held = rows_ok.get((br[1], br[2]))
        check(br[0] == "riser" and held is not None, tid,
              f"BIBLE.md section 2.3 row = the (P, N1) of the cut studio/specs/ holds ({CUT_NAME[IN_SPECS[key]]}) "
              f"or, until its tempo-table --write, the shipped cut's ({CUT_NAME[SHIPPED[key]]}; rerun when the "
              f"table moves)",
              f"row {br[0]} P {float(br[1])} N1 {br[2]}, expected riser "
              + " or ".join(f"{float(p_)} / {n_}" for p_, n_ in rows_ok))
        if held is not None and (P, N1) != (br[1], br[2]):
            NOTES.append(f"{tid}: the {CUT_NAME[cut]} runs on (P, N1) = ({float(P)}, {N1}); BIBLE.md section 2.3 holds "
                         f"({float(br[1])}, {br[2]}), the row of the {CUT_NAME[held]}"
                         + (" (until the sound pass's tempo-table --write)" if held != IN_SPECS[key] else ""))
    check(abs(beat - P / N1) <= F(5, 10**6), tid, f"runup.beat = P / N1 = {float(P)} / {N1} (5 dp)",
          f"{float(beat)} vs {float(P / N1):.7f}")
    d, lo = spec["data"], spec["lookOpts"]
    kit_rate, t0 = F(str(d["perSecond"])), F(str(d["counterT"][0]))
    passes = sorted(t0 + F(str(m["value"])) / kit_rate for m in d["milestones"])
    tp = passes[-1]
    check(abs(tp - P) <= F(1, 1000), tid, "P is the last pass (the riser climax, to the ms)", f"{float(tp):.4f} vs {float(P)}")
    prev = max([t0] + passes[:-1] + [F(str(s["t"])) for s in lo.get("rateSteps", []) if F(str(s["t"])) < tp])
    riser = min(F("2.4"), tp - prev - F("0.4"))      # the kit's riser cue (cost-counter.js: min(2.4, tp - prevT - 0.4))
    check(riser >= F(str(RISER_MIN)), tid, f"the kit's riser lasts >= {RISER_MIN} s, so P is the riser climax",
          f"{float(riser):.3f} s ({float(prev):.2f} -> {float(tp):.3f})")
    # runup.from (the kit's existing opt-in key; recut fix pass, 2026-10-13): the pulses start earlier than the last
    # label beat. The riser keeps its own prevT, so `from` may only move the start back (at or before prev), and only
    # once the last icon is on the stage (it drops in at the previous pass + its pop, lands and settles within
    # FROM_AFTER s), so every pulse has an icon to bump
    start = prev
    if "from" in ru:
        frm = F(str(ru["from"]))
        start = max(t0, frm)                          # the kit: from = max(T0, from)
        prev_pass = passes[-2] if len(passes) > 1 else t0
        check(start <= prev, tid, "runup.from at or before the last label beat (the riser keeps its prevT)",
              f"from {float(frm)} vs the last label beat {float(prev):.2f}")
        check(start >= prev_pass + F(str(FROM_AFTER)), tid,
              f"runup.from >= the previous pass + {FROM_AFTER} s (the last icon has landed: a pulse has an icon to bump)",
              f"from {float(frm)} vs pass {float(prev_pass):.3f}")
    pulses = []
    k = 1
    while tp - k * beat >= start - F(1, 10**6):
        pulses.append(tp - k * beat)
        k += 1
    first = min(pulses) if pulses else tp
    gap = max(float(first - start), float(beat) - RU_DUR)
    check(len(pulses) >= 4 and gap < STILL_MAX, tid,
          f"run-up pulses cover {float(start):.2f}-{float(tp):.2f} s on the beat (no gap >= {STILL_MAX} s)",
          f"{len(pulses)} pulses, longest gap {gap:.3f} s")
    RUNUPS[tid] = (float(start), float(tp), len(pulses), float(beat))

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
    md = MD_PATH[0] if MD_PATH else MD
    if not md.exists():
        check(False, "md", "write-up exists", str(md))
        return
    text = md.read_text()
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
        allowed = allowed_numbers(tid, MD_CUT[tid[-1]]) | extra[tid]
        for b in blocks:
            body = re.sub(r"#\w+", "", b)
            for n in number_tokens(body):
                check(n in allowed, "md", f"{tid} caption/pinned number {n} is computed/sourced", body[:80])
        texts = [(f"md {tid} caption/pinned", re.sub(r"#\w+", "", b)) for b in blocks]
        check_quantities(tid, texts)
        check_forbidden(tid, texts)

ROWS = []
CUTS = {}
RUNUPS = {}
NOTES = []
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
print(f"{'spec':40} {'vo':>3} {'miles':>5}  {'rate':24} {'final':16} {'dur':>5}  cut (file)")
for r in ROWS:
    cut, rel = CUTS.get(r[0], ("?", "?"))
    print(f"{r[0]:40} {r[1]:>3} {r[2]:>5}  {r[3]:24} {r[4]:16} {r[5]:>5}  {cut} ({rel})")
for tid, (a, b, n, beat) in sorted(RUNUPS.items()):
    print(f"{tid}: run-up {a:.2f}-{b:.3f} s, {n} pulses on a {beat} s beat")
print()
for n in NOTES:
    print("note:", n)
print(f"{CHECKS} checks, {len(FAILS)} failures")
for f in FAILS:
    print("FAIL", *f)
sys.exit(1 if FAILS else 0)
