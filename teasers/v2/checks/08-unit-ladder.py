#!/usr/bin/env python3
"""
Format 8 "unit-ladder" (P8, "Cost in units of X"): maths and spec check for teasers 08a, 08b and 08c.

1. Recomputes every on-screen number from its inputs. The sourced real-world inputs are named constants
   below (publisher, date and URL for each are in teasers/v2/08-unit-ladder.md); everything else is
   arithmetic on them, done in exact fractions.
2. Builds every display string the specs should carry (header, footer, unit, rung item / cost / units /
   unitsDisplay, VO caption lines, verdict, lookOpts text) from those numbers.
3. Loads the three spec JSONs from studio/specs/ and asserts:
   - every display string equals the computed, formatted string exactly;
   - every number token in every display string and VO line is a computed value or a labelled constant;
   - "≈" sits on every rounded result and on no exact one;
   - timing: header + a number on screen at t = 0; every VO line fits 2.6 words/s (d >= words / 2.6) and
     ends before the next starts; each rung's question line names it in its first words and starts on its cut, or
     (08b) up to 1.4 s after it; a rung's number has its own line that starts as the built kit lands the count
     (never before it, at most 0.6 s after), so no caption prints an answer the screen has not shown; a rung
     pre-filled before frame 1 (08c) is read by the line at 0.0; a rung pre-rolled under the opener line (08a) is
     asked after it; the verdict lands with its VO line; duration is inside the 20-40 s lane and covers the last VO
     line (+0.4 s) and the verdict (+2.5 s); hold = duration - last landing;
   - all three kits are built: the counter lands before (or within 0.5 s of) the VO saying the number,
     replaying each kit's own timing rules on the spec as written (looks/scoreboard, looks/becker-rig and looks/clean-sheet
     formats/unit-ladder.js); the first count lands within 3 s (R10); the header is at most 15 words (R8);
   - the payoffs: 08a's hero roll (lookOpts.payoff) starts with its question line and the footer's working, and the
     verdict lands with the hero; 08b's blank (lookOpts.blank) ticks during its question and lands as its answer
     line starts, on a month grid that holds the day, and its morph (lookOpts.morph) turns the last count into the
     verdict's years on the verdict's beat; 08c's payoff step (lookOpts.payoff) divides two costs on the sheet and
     lands with the verdict;
   - contract shape (studio/FORMATS.md, section 8): 4-7 rungs, cheap -> huge, units numeric, known icon,
     captions on, fps 30, id = file stem.
4. Prints a table and exits 1 on any mismatch.

Two cuts per teaser (2026-10-13), picked by the spec's duration:
   - the round-2 cut ("full": 08a 22.0 s, 08b 27.0 s, 08c 22.0 s; paced for a recorded VO), retired from
     studio/specs/ on 2026-10-13 and kept as a reference for a git-history copy passed with --spec from outside
     studio/specs/ (`git show 480efc1^:studio/specs/<id>.json > /tmp/<id>.json`); renders/channel/ still ships it
     until the ship step replaces it;
   - the condensed cut ("cond", the owner's 2026-10-13 note: "too many still moments are a killer for a short.
     Condense the rest. The CTA (end card) is good."), written to studio/specs-wip/ and promoted into studio/specs/
     on 2026-10-13: it is what studio/specs/ holds (IN_SPECS names the cut each id must hold there; the sound and the
     ship follow). A spec of any other length is checked against the condensed set and fails its lane.
   The condensed cut keeps every number, string, rung, unit, verdict, payoff and kit option of the round-2 cut; only
   the clock, the caption pacing and three caption merges change. Its rules replace the narration rules:
   - the posted shorts have no narration, so captions are paced for reading: each caption on screen for
     >= max(1.2 s, 0.12 s a word) (time on screen from frame 1 until the line ends or the payoff / verdict hides
     the caption band; a line hidden behind the verdict is narration-only and exempt), back to back (gaps < 0.2 s);
   - frame 1: the hook caption is complete (Scoreboard: rises in >= 0.14 s before frame 1; Becker Rig: its last word
     has popped by frame 1) and something moves from frame 2 (08a: the unit intro's hot dog falls and rung 1 cuts by
     0.6 s; 08b: the header's blank starts ticking by 0.25 s, its month grid still hidden on frame 1; 08c: the
     pre-filled frame pans back from frame 1 with lookOpts.prefillPan, at least until rung 1 cuts);
   - no still moment: each landing is followed by the next cut (or the blank) within 0.35-0.6 s; landings 2.44-3.0 s
     apart (two 1.2 s captions fit, nothing waits; the climax rung up to 3.4 s, for Scoreboard's 2.4 s final roll); each question line starts within 0.85 s of its cut and each
     number line within 0.6 s after its count lands (never before it);
   - fix pass (2026-10-13): no answer under the next rung's "?": a count's answer line that stays up past the next cut
     must carry that rung's question (merged "≈ 1,000. A new house in 1985?"), up from the landing so the question
     leads its cut by 0.35-0.6 s (08b's hook answer is the one exemption: the header keeps "≈ 20th" on screen); the
     caption lines are found by what they say, not by index; a caption counts every whitespace token ("≈" too, as in
     06-pov-race.py); 08b's figure moves from frame 2 (a lookOpts.beats pose by 0.1 s, back before the first wind-up)
     and its merged hook-answer line starts after the count lands, its day word popping as the blank lands (+0.1 s);
   - the payoff: 08a's payoff cut 0.45-0.65 s after the last landing (the verdict still lands with the hero);
     08b's verdict 0.8-1.5 s after the last landing; 08c's ask 0.5-0.8 s after the last landing, on a line that
     carries "Versus community?" from the last landing, the answer 1.25-1.4 s after the ask; verdict held 1.2-1.6 s;
   - lanes: 08a 13-15 s, 08b 12-14 s, 08c 11.5-13.5 s of body (+ the 2.5 s end card).

Run:  python3 teasers/v2/checks/08-unit-ladder.py                     (the specs in studio/specs/)
      python3 teasers/v2/checks/08-unit-ladder.py --spec /tmp/08a-scoreboard-costco-hot-dogs.json ...
        (e.g. the retired round-2 cut: `git show 480efc1^:studio/specs/08a-scoreboard-costco-hot-dogs.json
        > /tmp/08a-scoreboard-costco-hot-dogs.json`)
      --spec [KEY=]PATH (repeatable) checks PATH in place of studio/specs/<id>.json. KEY is a, b or c, 08a/08b/08c
      or the full id; without it the file's stem must be one of the three ids.
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
WPS = 2.6                    # voice-over reading speed, words per second
LANE = (20.0, 40.0)          # duration lane for this format (benchmark: HD Guy 26-40 s)
IDS = {"08a": "08a-scoreboard-costco-hot-dogs", "08b": "08b-becker-rig-hours-at-15",
       "08c": "08c-becker-rig-college-in-big-macs"}
FULL_DUR = {"08a": 22.0, "08b": 27.0, "08c": 22.0}            # the round-2 cuts (paced for a recorded VO)
COND_LANE = {"08a": (13.0, 15.0), "08b": (12.0, 14.0), "08c": (11.5, 13.5)}   # condensed bodies (2026-10-13)
IN_SPECS = {"08a": "cond", "08b": "cond", "08c": "cond"}     # the cut studio/specs/ holds (promoted 2026-10-13; was
                                                              # "full", now a reference for a git-history copy)
CAP_MIN, CAP_SPW = 1.2, 0.12  # caption pacing (no narration): >= 1.2 s a line, >= 0.12 s a word at phone size


def parse_spec_args(argv):
    """--spec [KEY=]PATH (repeatable) -> {key: absolute path}; see the module docstring"""
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
            m = re.fullmatch(r"(08[abc]|[abc]|08[abc]-[\w-]+)=(.+)", v)
            if m:
                k = m.group(1)
                key = k if k in IDS else "08" + k if len(k) == 1 else next((x for x, sid in IDS.items() if sid == k), None)
                path = m.group(2)
                if key is None:
                    sys.exit(f"--spec {v}: unknown key {k!r}")
            else:
                path = v
                stem = Path(v).stem
                key = next((x for x, sid in IDS.items() if sid == stem), None)
                if key is None:
                    sys.exit(f"--spec {v}: the file stem is not one of {sorted(IDS.values())}; pass KEY=PATH")
            if not Path(path).is_file():
                sys.exit(f"--spec {v}: no such file")
            out[key] = Path(path).resolve()
        else:
            sys.exit(f"unknown argument {a!r}; usage: 08-unit-ladder.py [--spec [KEY=]PATH ...]")
        i += 1
    return out


SPEC_PATHS = {k: SPEC_DIR / f"{sid}.json" for k, sid in IDS.items()}
SPEC_PATHS.update(parse_spec_args(sys.argv[1:]))


def cut_of(key):
    """'full' for a spec of the round-2 cut's exact length, else 'cond' (the condensed set; any other length fails
    its lane). None when the spec file is missing (reported by run())."""
    p = SPEC_PATHS[key]
    if not p.exists():
        return None
    d = json.loads(p.read_text(encoding="utf-8")).get("duration", 0)
    return "full" if abs(d - FULL_DUR[key]) < 1e-9 else "cond"
ICONS = {"cup", "hotdog", "burger", "pizza", "phone", "car", "house", "coin", "bill", "gas",
         "ticket", "bag", "egg", "hour"}

# ======================================================================================
# Sourced real-world inputs (USD). Sources: teasers/v2/08-unit-ladder.md, "Sources".
# ======================================================================================
HOT_DOG_COMBO = F("1.50")        # Costco hot dog + soda; unchanged since 1985 (13 ABC 2026-04-29; NPR/HPPR 2024-06-04)
HOT_DOG_SINCE = 1985             # the year the $1.50 price was set (same sources)
COSTCO_MEMBERSHIP = 65           # Gold Star, from 2024-09-01 (Axios 2024-08-31; Disney Food Blog 2024-07-11)
IPHONE_18_PRO = 1199             # US starting price, 2026-09-09 (MacRumors; Appleosophy). Not on screen since the fix pass (08a rung -> rent)
KBB_ATP = 50089                  # KBB average new-vehicle transaction price, Aug 2026 (Cox Automotive, 2026-09-10)
NEW_HOUSE_2026 = 393700          # Census/HUD median sales price of new houses sold, Aug 2026 (released 2026-09-24)
NEW_HOUSE_1985 = 84300           # Census median sales price of new houses sold, 1985 annual (FRED MSPNHSUSA; HUD USHMC)
HOUSE_YEAR_THEN, HOUSE_YEAR_NOW = 1985, 2026
HOUSE_MONTH_NOW = "Aug"         # the 2026 house figure is the August 2026 month (preliminary, NSA)
RENT = 1531                      # Census HVS median asking rent, Q2 2026 (released 2026-07-28)
# 2026 federal tax, single filer (IRS Rev. Proc. 2025-32, 2025-10-09; SSA 2026 fact sheet), as used in 01
STD_DEDUCTION = 16100
BRACKET_10_TOP, BRACKET_12_TOP = 12400, 50400
RATE_10, RATE_12 = F(10, 100), F(12, 100)
FICA = F(765, 10000)             # 6.2% Social Security + 1.45% Medicare (employee)
SS_WAGE_BASE = 184500
BIG_MAC = F("6.22")              # US Big Mac price, The Economist Big Mac index, 2026-07-01 row
# College Board, Trends in College Pricing and Student Aid 2025 (Oct 2025), 2025-26 averages
CB_PUBLIC_2YR = 4150             # public two-year, in-district tuition & fees
CB_PUBLIC_4YR_IN = 11950         # public four-year, in-state tuition & fees
CB_PUBLIC_4YR_OUT = 31880        # public four-year, out-of-state tuition & fees
CB_PRIVATE_4YR = 45000           # private nonprofit four-year tuition & fees
CB_PUBLIC_4YR_IN_BUDGET = 30990  # public four-year in-state, total average budget (pinned comment only)
CB_PRIVATE_BUDGET = 65470        # private nonprofit four-year, total average budget (tuition, fees, housing, food, books, travel, other)

# Conventions (printed in footers / VO)
WAGE = 15                        # 08b: the viewer's wage, $/hr
HOURS_PER_WEEK, WEEKS_PER_YEAR = 40, 52
HOURS_PER_YEAR = HOURS_PER_WEEK * WEEKS_PER_YEAR          # 2,080
MONTHS = 12
DAYS_PER_YEAR = 365
DEGREE_YEARS = 4
RENT_DAY = 1                     # 08b header: rent is due on the 1st
WORKDAY_HOURS = 8                # 08b calendar check: 8-hour workdays, Monday to Friday

# ======================================================================================
# Formatting helpers
# ======================================================================================
def rhu(x, step=1):
    """Round half up (x: Fraction or int) to a multiple of step; returns int (or Fraction if step < 1)."""
    x, step = F(x), F(step)
    v = math.floor(x / step + F(1, 2)) * step
    return int(v) if v.denominator == 1 else v

def usd(x, dp=0):
    x = F(x)
    if dp == 0:
        return f"${rhu(x):,}"
    q = rhu(x, F(1, 10 ** dp))
    return f"${float(q):,.{dp}f}"

def ap(rounded, exact):
    """'≈ ' when the shown value is a rounding of the exact one."""
    return "" if F(rounded) == F(exact) else "≈ "

def count(q):
    """On-screen unit count: nearest whole unit; '≈' unless the quotient is a whole number."""
    n = rhu(q)
    return ap(n, q) + f"{n:,}", n

def vo_round(q):
    """What the voice says: exact if whole; else < 1,000 to the unit, < 10,000 to the 100, else to the 1,000."""
    q = F(q)
    if q.denominator == 1:
        return f"{int(q):,}", int(q)
    step = 1 if q < 1000 else 100 if q < 10000 else 1000
    n = rhu(q, step)
    return "≈ " + f"{n:,}", n

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
        words += 2 if h else 0          # "two hundred"
        words += 1 if r else 0          # "sixty-two"
        words += 1 if scale > 1 else 0  # "thousand"
    return words

def spoken_words(text):
    """Estimate the words the owner will say for one caption line (conservative)."""
    s = strip_markup(text).replace("≈", " about ").replace("×", " times ")
    count_ = 0

    def money(m):
        nonlocal count_
        d, c = int(m.group(1).replace(",", "")), m.group(2)
        if c is not None and int(c):
            count_ += int_words(d) + int_words(int(c)) + 1   # "a dollar fifty", "thirteen ten" (+1 safety)
        else:
            count_ += int_words(d) + 1                        # "+ dollars"
        return " "
    s = re.sub(r"\$(\d[\d,]*)(?:\.(\d\d))?", money, s)

    def year(m):
        nonlocal count_
        count_ += 2                                           # "nineteen eighty-five", "twenty twenty-six"
        return " "
    s = re.sub(r"\b(19\d\d|20\d\d)\b", year, s)

    def num(m):
        nonlocal count_
        whole, frac = m.group(1), m.group(2)
        count_ += int_words(int(whole.replace(",", "")))
        if frac:
            count_ += 1 + len(frac)                           # "point seven"
        return " "
    s = re.sub(r"(\d[\d,]*)(?:\.(\d+))?", num, s)
    count_ += len([w for w in re.split(r"[\s,.:?!;]+", s) if re.search(r"[A-Za-z]", w)])
    return count_

def words_before(text, phrase):
    plain = strip_markup(text)
    i = plain.find(phrase)
    assert i >= 0, f"{phrase!r} not in {plain!r}"
    return spoken_words(plain[:i])

# ======================================================================================
# Scoreboard kit timing (mirrors looks/scoreboard/formats/unit-ladder.js + theme.js M)
# ======================================================================================
SB = dict(rollMin=0.8, rollMax=1.9, rollFinal=2.4, regrid=0.42)

def scoreboard_landings(rungs):
    """Landing time of the hero counter on each rung (no unit intro when rung 1 starts before 0.5 s)."""
    times = [r["t"] for r in rungs]
    intro = times[0] >= 0.5
    lands = []
    for i, r in enumerate(rungs):
        prev_n = rungs[i - 1]["units"] if i else (1 if intro else 0)
        last = i == len(rungs) - 1
        roll = min(max(0.5 + 0.34 * math.log10(abs(r["units"] - prev_n) + 1), SB["rollMin"]), SB["rollMax"])
        if last:
            roll = max(roll, SB["rollFinal"])
        gap = times[i + 1] - times[i] if i + 1 < len(rungs) else math.inf
        roll = min(roll, max(0.45, gap - SB["regrid"] - 0.5))
        first = i == 0 and not intro
        t0 = (min(times[0], 0) - 0.45) if first else times[i]
        delay = 0 if first else SB["regrid"]
        lands.append(t0 + delay + roll)
    return lands

# ======================================================================================
# Becker Rig kit timing (mirrors looks/becker-rig/formats/unit-ladder.js, "per-rung schedule")
# ======================================================================================
def becker_landings(rungs, hold, verdict_t=None, intro_opt=True, land_after=None, punches=None):
    """Each rung: the coin drops, he punches it after a lead, the units fill and the count lands. lookOpts.landAfter
    scales the lead and the fill so the count lands that long after the cut (the lead never under 0.4 s). A first rung
    cut before frame 1 (t < 0) is pre-filled: its whole schedule ends by -0.4 s, so frame 1 shows it landed."""
    Ts = [r["t"] for r in rungs]
    n = len(rungs)
    intro = intro_opt and Ts[0] >= 0.9
    la = max(0.9, land_after) if land_after else None
    lands = []
    for i, r in enumerate(rungs):
        last = i == n - 1
        gap = Ts[i + 1] - Ts[i] if not last else max(3.4, hold + 1.4)
        placed = i == 0 and not intro and Ts[i] < 0.9          # the first coin already stands there at t = 0
        prefill = i == 0 and not intro and Ts[i] < 0           # cut before frame 1: done by t = 0
        lead = 0.45 if placed else min(max(gap * 0.22, 0.45), 0.92)
        if last:
            fd = 1.9
            if verdict_t is not None:
                fd = min(fd, verdict_t - 0.5 - (max(0, Ts[i]) + lead + 0.05))
            fill = min(max(fd, 0.6), 2.2)
        else:
            fill = min(max(gap * 0.3, 0.5), 1.6)
        if la and not prefill:
            k = (la - 0.05) / (lead + fill)
            lead = max(0.4, lead * k)
            fill = max(0.35, la - 0.05 - lead)
        start = (min(-0.4, Ts[i] + lead + 0.05 + fill) - (lead + 0.05 + fill)) if prefill else max(0, Ts[i])
        lands.append(start + lead + 0.05 + fill)
        if punches is not None:
            punches.append(start + lead)                       # the punch (the wind-up starts 0.25 s before it)
    return lands

def becker_lands(sp, punches=None):
    """The Becker Rig kit's landings on a spec as written (rungs, hold, verdict, lookOpts.landAfter)."""
    return becker_landings(sp["data"]["rungs"], sp["data"]["hold"], sp["verdict"]["t"],
                           land_after=sp.get("lookOpts", {}).get("landAfter"), punches=punches)

# ======================================================================================
# Teaser builders: each returns (expected spec dict, rows for the table, allowed numbers,
# per-rung VO mapping, phrases that must open each rung's VO line, VO number phrases)
# ======================================================================================
def vo_line(t, d, text):
    return {"t": t, "d": d, "text": text}

def build_08a(cut="full"):
    unit = HOT_DOG_COMBO
    # cheap opener (the Costco card), then the house comparison: a month of rent today, the 1985 house, the Aug 2026 house
    items = [
        ("Your Costco membership", COSTCO_MEMBERSHIP, usd(COSTCO_MEMBERSHIP), "Costco card"),
        (f"A month of median rent, {HOUSE_YEAR_NOW}", RENT, usd(RENT), "A month of rent"),
        (f"A median new house, {HOUSE_YEAR_THEN}", NEW_HOUSE_1985, usd(NEW_HOUSE_1985), f"A new house in {HOUSE_YEAR_THEN}"),
        (f"A median new house, {HOUSE_MONTH_NOW} {HOUSE_YEAR_NOW}", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), f"And a new house in {HOUSE_YEAR_NOW}"),
    ]
    # rung 1 cuts at 1.5 s, under the opener line: frame 1 is the kit's unit intro (hero "$1.50", one hot dog,
    # "YOUR HOT DOG + SODA") for the whole first 1.5 s
    rung_t = [1.5, 4.8, 8.0, 11.95]
    if cut == "cond":
        # condensed (2026-10-13): rung 1 cuts at 0.5 s (the unit intro's hot dog lands at 0.2 s, then the cut); each
        # later rung cuts 0.5 s after the previous count lands (the kit's floor: a rung's roll ends >= 0.5 s before
        # the next cut), with room for two 1.2 s captions between landings
        rung_t = [0.5, 2.48, 4.92, 7.36]
    rows, rungs, qs = [], [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / unit
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {usd(unit, 2)}", f"{float(q):,.4f}", disp))
    ratio = F(NEW_HOUSE_2026, NEW_HOUSE_1985)
    ratio_r = rhu(ratio, F(1, 10))
    ratio_disp = ap(ratio_r, ratio) + f"{float(ratio_r):.1f}×"
    assert ratio_disp == "≈ 4.7×"
    # in hot dogs the ratio is the same (the unit price never moved)
    assert qs[3] / qs[2] == ratio
    rows.append(("Ratio house 2026 / 1985", f"{usd(NEW_HOUSE_2026)} ÷ {usd(NEW_HOUSE_1985)}", f"{float(ratio):.4f}", ratio_disp))
    # the hook's question: the $1.50 hot dog, had it risen like a new house (sticker prices, 1985 -> Aug 2026)
    rose = unit * ratio                                   # 1.50 × 4.670225 = 7.005338
    assert rose == F(NEW_HOUSE_2026) / qs[2]              # = the 2026 house ÷ 1985's 56,200 hot dogs (the on-screen working)
    rose_r = rhu(rose, F(1, 100))
    rose_disp = ap(rose_r, rose) + usd(rose, 2)
    assert rose_disp == "≈ $7.01"
    rows.append(("Hot dog risen like a house", f"{usd(unit, 2)} × {float(ratio):.6f}", f"{float(rose):.6f}", rose_disp))
    rows.append(("  = the working on screen", f"{usd(NEW_HOUSE_2026)} ÷ {int(qs[2]):,}", f"{float(F(NEW_HOUSE_2026) / qs[2]):.6f}", rose_disp))
    # the 1985 share of the Aug 2026 wall (the white mound inside the green wall)
    share = qs[2] / qs[3]
    rows.append(("1985 share of the 2026 wall", f"{int(qs[2]):,} ÷ {float(qs[3]):,.2f}", f"{float(share):.4f}", f"{float(share) * 100:.1f}%"))
    PINNED["08a hot dog risen like a house"] = (rose_disp.replace("≈ ", ""), f"{int(qs[2]):,}")
    v = [vo_round(q)[0] for q in qs]
    u2 = usd(unit, 2)
    working = f"{usd(NEW_HOUSE_2026)} ({HOUSE_MONTH_NOW} {HOUSE_YEAR_NOW}) ÷ {int(qs[2]):,} hot dogs ({HOUSE_YEAR_THEN})"
    question = "Rose like a house?"
    vo = [
        # the opener: the viewer's own $1.50 hot dog (header, hero "$1.50", label and voice on the same item)
        vo_line(0.0, 2.35, f"Your **{u2}** hot dog."),
        # each rung: the question on its cut, the number in its own cue once the hero has landed it
        vo_line(2.4, 0.8, "Costco card?"),
        vo_line(3.2, 1.55, f"**{v[0]}** hot dogs."),
        vo_line(4.8, 1.55, "A month of rent?"),
        vo_line(6.75, 1.2, f"**{v[1]}**."),
        vo_line(8.0, 2.35, f"A new house in {HOUSE_YEAR_THEN}?"),
        vo_line(10.35, 1.55, f"**{v[2]}**."),
        vo_line(11.95, 2.7, f"And a new house in {HOUSE_YEAR_NOW}?"),
        vo_line(14.8, 1.95, f"**{v[3]}**."),
        # the payoff: the question on the payoff cut, the answer as the hero lands it (= the verdict)
        vo_line(16.8, 1.55, question),
        vo_line(18.4, 2.7, f"A **{rose_disp}** hot dog."),
    ]
    for q, (s_, n) in zip(qs, map(vo_round, qs)):
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", s_))
    duration = 22.0
    lands = scoreboard_landings(rungs)
    pay_t = 16.8
    if cut == "cond":
        # captions paced for reading (no narration), back to back; frame 1 shows the whole hook line (-0.4 s).
        # Merged (fix pass): each count's answer line carries the next rung's question, up from that landing to the
        # next one, so the question leads its cut by 0.5 s and no answer stays under the next rung's "?" (rung 1's
        # question rides on its answer line too: the 0.5 s intro leaves no 1.2 s for "Costco card?" on its own).
        # Dropped: the last count's spoken rounding ("≈ 262,000."): the payoff cut hides the caption band (the
        # label stack carries the payoff), and the hero prints ≈ 262,467. The payoff cuts 0.55 s after the last
        # count (fix pass: 0.65 s was tried; it adds a 0.23 s near-still before the cut and raises the A11 limiter
        # share, for 0.1 s more dwell); the hero roll keeps its kit timing; the verdict lands with the hero, held 1.6 s.
        pay_t = 10.73
        vo = [
            vo_line(-0.4, 2.35, f"Your **{u2}** hot dog."),
            vo_line(1.98, 2.42, f"Costco card? **{v[0]}** hot dogs. A month of rent?"),
            vo_line(4.42, 2.42, f"**{v[1]}**. A new house in {HOUSE_YEAR_THEN}?"),
            vo_line(6.86, 3.87, f"**{v[2]}**. And a new house in {HOUSE_YEAR_NOW}?"),
            vo_line(10.73, 1.6, question),
            vo_line(12.33, 1.2, f"A **{rose_disp}** hot dog."),
        ]
        duration = 13.93
    hold = round(duration - lands[-1], 2)
    verdict_t = round(max(pay_t, lands[-1] + 0.3) + 0.2 + 1.4, 6)
    assert verdict_t == (18.4 if cut == "full" else 12.33)
    exp = {
        "id": "08a-scoreboard-costco-hot-dogs",
        "look": "scoreboard",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": f"WHAT YOUR **{u2}** HOT DOG WOULD\nCOST IF IT ROSE LIKE A HOUSE",
        "footer": f"Hot dog + soda: {u2} in {HOT_DOG_SINCE}. Still {u2}.",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"{question}\nA **{rose_disp}** hot dog."},
        "data": {
            "unit": {"name": "Costco hot dog", "label": "Your hot dog + soda", "price": u2, "icon": "hotdog"},
            "rungs": rungs,
            "hold": hold,
        },
        # built kit: frame 1's hero reads the unit price; the payoff (lookOpts.payoff) cuts the label stack to the
        # question and the hero to the unit price, rolls up and lands on the answer as the verdict lands; the 1985 dots
        # stay white inside the Aug 2026 wall (lookOpts.split, tagged); the footer turns into the payoff's working
        "lookOpts": {
            "introHero": "price",
            "climaxFill": 1,
            "payoff": {"t": pay_t, "from": u2, "display": rose_disp, "label": question},
            "split": {"tags": [f"{HOUSE_YEAR_THEN}", f"{HOUSE_MONTH_NOW} {HOUSE_YEAR_NOW}"]},
            "footerSteps": [{"t": pay_t, "text": working}],
        },
        "sfx": [{"t": verdict_t, "kind": "ding"}],
    }
    allowed = {F(x) for x in [HOT_DOG_COMBO, COSTCO_MEMBERSHIP, RENT, NEW_HOUSE_1985,
                              NEW_HOUSE_2026, HOT_DOG_SINCE, HOUSE_YEAR_THEN, HOUSE_YEAR_NOW]}
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs} | {F(ratio_r), F(rose_r)}
    labelled = {}
    mapping = {0: 1, 1: 3, 2: 5, 3: 7}           # rung index -> its question line (on the cut)
    answer = {0: 2, 1: 4, 2: 6, 3: 8}            # rung index -> the line that says its number (at the landing)
    if cut == "cond":
        mapping = {0: 1, 1: 1, 2: 2, 3: 3}       # each question rides on the previous answer's line (rung 0: its own)
        answer = {0: 1, 1: 2, 2: 3}              # the last count is printed by the hero, not captioned
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: v[i] for i in range(len(items))}
    # rung 0 cuts under the opener line (VO 0); its question follows the opener
    timing = {"prerolled": {0}, "prefilled": set(), "lead": {}, "lag": 0.0, "answer": answer,
              "lands_of": lambda sp: scoreboard_landings(sp["data"]["rungs"]),
              "extras": scoreboard_payoff, "cut": cut,
              # condensed: the caption band is hidden from the payoff cut (the label stack carries the question)
              "caps_off": lambda sp: sp["lookOpts"]["payoff"]["t"]}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, (10 if cut == "full" else 5), timing

def scoreboard_payoff(sp, lands):
    """The hero's payoff roll (mirrors lookOpts.payoff in looks/scoreboard/formats/unit-ladder.js: it cuts at
    max(t, last landing + 0.3), holds 0.2 s, rolls 1.4 s). Its question line starts on the cut (the label stack
    shows it); the verdict lands with the hero (never before it: no second, different number on screen); the
    voice says the answer as it lands (not before it, at most 0.5 s after); the footer turns into the working."""
    po = sp.get("lookOpts", {}).get("payoff")
    if not po:
        return [(False, "08a: lookOpts.payoff missing", None)]
    t0 = max(po.get("t", sp["verdict"]["t"]), lands[-1] + 0.3)
    land = t0 + 0.2 + po.get("roll", 1.4)
    line = next((v for v in sp["vo"] if po["display"] in strip_markup(v["text"])), None)
    if line is None:
        return [(False, f"08a: no VO line says the payoff {po['display']}", None)]
    said = line["t"] + words_before(line["text"], po["display"]) / WPS
    qline = next((v for v in sp["vo"] if po.get("label") and strip_markup(v["text"]) == strip_markup(po["label"])), None)
    steps = sp.get("lookOpts", {}).get("footerSteps", [])
    return [
        (qline is not None and abs(qline["t"] - t0) < 1e-6, "08a: the payoff's question line must start on the payoff cut", None),
        (abs(sp["verdict"]["t"] - land) < 1e-6, f"08a: the verdict ({sp['verdict']['t']} s) must land with the hero ({land:.2f} s)", None),
        (po["from"] == sp["data"]["unit"]["price"] and po["display"] in sp["verdict"]["text"], "08a: payoff must roll from the unit price to the verdict's number", None),
        (len(steps) == 1 and abs(steps[0]["t"] - t0) < 1e-6, "08a: the footer must turn into the payoff's working on the payoff cut", None),
        (land - 1e-6 <= line["t"] and said <= land + 0.5 and land >= t0, f"08a: VO says {po['display']} at {said:.2f} s, the hero lands it at {land:.2f} s",
         f"  payoff: cut {t0:5.2f}  hero {po['from']} -> {po['display']} lands {land:5.2f} (= verdict)  VO says '{po['display']}' at {said:5.2f}"),
    ]

def take_home_per_hour():
    gross = WAGE * HOURS_PER_YEAR
    assert gross < SS_WAGE_BASE
    taxable = max(0, gross - STD_DEDUCTION)
    assert taxable <= BRACKET_12_TOP, "08b assumes the 12% bracket is the top one reached"
    tax = RATE_10 * min(taxable, BRACKET_10_TOP) + RATE_12 * max(0, taxable - BRACKET_10_TOP)
    fica = FICA * gross
    net = gross - tax - fica
    return gross, taxable, tax, fica, net, F(net) / HOURS_PER_YEAR

def take_home_at(wage):
    gross = wage * HOURS_PER_YEAR
    taxable = max(0, gross - STD_DEDUCTION)
    assert taxable <= BRACKET_12_TOP
    tax = RATE_10 * min(taxable, BRACKET_10_TOP) + RATE_12 * max(0, taxable - BRACKET_10_TOP)
    return F(gross - tax - FICA * gross) / HOURS_PER_YEAR

PINNED = {}   # numbers quoted in pinned comments / captions (asserted against the write-up text)

def build_08b(cut="full"):
    gross, taxable, tax, fica, net, k = take_home_per_hour()
    for w in (20, 25):
        kw = take_home_at(w)
        PINNED[f"08b keep at ${w}/hr"] = ("≈ " + usd(kw, 2), f"{float(kw / w) * 100:.1f}%")
    PINNED["08b keep share at $15/hr"] = (f"{float(k / WAGE) * 100:.1f}%",)
    k_disp = "≈ " + usd(k, 2)                     # 13.1006 -> ≈ $13.10 (what you keep, rounded)
    U = rhu(k, F(1, 100))                         # the DEFINED unit: exactly $13.10; every count divides by it
    assert U == F("13.10")
    u_disp = usd(U, 2)                            # "$13.10": the operand the screen shows ("÷ $13.10")
    tax_cut = WAGE - k
    cut_disp = "≈ " + usd(tax_cut, 2)                 # 1.8994 -> ≈ $1.90
    assert k_disp == "≈ $13.10" and cut_disp == "≈ $1.90"
    rows = [
        ("Gross a year", f"{usd(WAGE)} × {HOURS_PER_YEAR:,}", f"{gross:,}", usd(gross)),
        ("Federal income tax", f"10% × {usd(BRACKET_10_TOP)} + 12% × ({usd(gross)} − {usd(STD_DEDUCTION)} − {usd(BRACKET_10_TOP)})", f"{float(tax):,.2f}", usd(tax, 2)),
        ("FICA", f"7.65% × {usd(gross)}", f"{float(fica):,.2f}", usd(fica, 2)),
        ("Kept a year", f"{usd(gross)} − tax − FICA", f"{float(net):,.2f}", usd(net, 2)),
        ("Kept per hour", f"{usd(net, 2)} ÷ {HOURS_PER_YEAR:,}", f"{float(k):.5f}", k_disp),
        ("Unit (defined, rounded)", "kept per hour to the cent", f"{float(U):.2f}", u_disp),
        ("Tax + FICA per hour", f"{usd(WAGE)} − {float(k):.4f}", f"{float(tax_cut):.4f}", cut_disp),
    ]
    items = [
        ("Median rent, 1 month", RENT, usd(RENT), "Median rent"),
        ("Median rent, 1 year", RENT * MONTHS, usd(RENT * MONTHS), "A year of rent"),
        ("An average new car", KBB_ATP, usd(KBB_ATP), "An average new car"),
        ("A median new house", NEW_HOUSE_2026, usd(NEW_HOUSE_2026), "A median new house"),
    ]
    rung_t = [0.0, 8.4, 12.85, 17.3]
    if cut == "cond":
        # condensed (2026-10-13): every count lands 2.2 s after its cut (lookOpts.landAfter); each later rung cuts
        # 0.4 s after the previous count (rung 1: after the header's blank) lands
        rung_t = [0.0, 2.95, 5.55, 8.15]
    rungs, qs = [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / U
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {u_disp}", f"{float(q):,.3f}", disp))
    month_hours = F(HOURS_PER_YEAR, MONTHS)                 # 173.33 work hours a month
    share = qs[0] / month_hours                              # 0.674 of every work hour goes to rent
    assert abs(share - F(2, 3)) < F(1, 100), share          # "≈ 2 of every 3 hours"
    weeks = qs[0] / HOURS_PER_WEEK                           # 2.92 work weeks (caption: "isn't a week of work")
    years = qs[3] / HOURS_PER_YEAR                           # 14.45
    y_r = rhu(years)
    # the hook's blank: "you work for rent from the 1st to the ___". Rent's share of the month's work hours,
    # laid on the calendar from rent day (the 1st): on a 30-day month and on the average month (365 / 12 days)
    day30 = share * 30                                       # 20.23
    day_avg = share * F(DAYS_PER_YEAR, MONTHS)               # 20.51
    day = rhu(day30)
    assert day == 20 and abs(day_avg - day) < F(6, 10), (day30, day_avg)
    # and on a real calendar: 8-hour workdays Monday-Friday from the 1st; the date the 116.87th hour is worked,
    # for every weekday the 1st can fall on (the same in 28-31-day months, since it comes before the 22nd)
    workday_no = math.ceil(qs[0] / WORKDAY_HOURS)            # 116.87 / 8 = 14.6 -> during the 15th workday
    dates = []
    for first_wd in range(7):                                # 0 = the 1st is a Monday ... 6 = a Sunday
        n, date = 0, 0
        while n < workday_no:
            date += 1
            if (first_wd + date - 1) % 7 < 5:
                n += 1
        dates.append(date)
    assert min(dates) >= 19 and max(dates) <= 21 and day in dates, dates
    rows += [
        ("Rent share of work hours", f"{float(qs[0]):.3f} ÷ (2,080 ÷ 12 = {float(month_hours):.2f})", f"{float(share):.4f}", "≈ 2 of every 3"),
        ("Rent month in work weeks", f"{float(qs[0]):.3f} ÷ {HOURS_PER_WEEK}", f"{float(weeks):.3f}", "caption: not a week; ≈ 3"),
        ("Rent hours on the calendar", f"{float(share):.4f} × 30 days (× 30.42)", f"{float(day30):.2f} ({float(day_avg):.2f})", f"≈ the {day}th"),
        ("  Mon-Fri calendar, 8-h days", f"workday {workday_no} ({float(qs[0] / WORKDAY_HOURS):.1f} of 21.67)", "", f"the {min(dates)}th-{max(dates)}st"),
        ("House in full-time years", f"{float(qs[3]):.3f} ÷ 2,080", f"{float(years):.3f}", f"{ap(y_r, years)}{y_r} years"),
    ]
    PINNED["08b rent share"] = (f"{float(share) * 100:.1f}%",)
    PINNED["08b rent hours of the month"] = (f"{rhu(qs[0])} of {rhu(month_hours)} work hours",)
    v = [vo_round(q)[0] for q in qs]
    for q in qs:
        rows.append(("  VO says", f"{float(q):,.2f} rounded for speech", "", vo_round(q)[0]))
    # Becker captions pop a whole line at once: every answer gets its own line, starting as its count (or the header's
    # blank) lands, so no caption ever prints an answer before the screen does
    say = [f"{v[0]} hours", v[1], v[2], f"{v[3]} hours"]
    vo = [
        vo_line(0.0, 2.35, f"{usd(WAGE)} an hour? Median rent:"),
        vo_line(2.4, 1.95, f"**{say[0]}**."),
        vo_line(4.4, 1.95, "Every hour you work, to…"),
        vo_line(6.4, 1.55, f"**≈ the {day}th**."),
        # each later question starts 0.1 s after its cut; its number has its own line at the landing
        vo_line(8.5, 1.55, "A year of rent?"),
        vo_line(10.75, 1.95, f"**{say[1]}**."),
        vo_line(12.95, 1.55, "An average new car?"),
        vo_line(15.2, 1.95, f"**{say[2]}**."),
        vo_line(17.4, 1.55, "A median new house?"),
        vo_line(20.2, 1.55, f"**{say[3]}**."),
        vo_line(21.8, 4.25, f"That's **{ap(y_r, years)}{y_r} years** of full-time work. Every cent you keep."),
    ]
    duration = 27.0
    verdict_t = 21.8
    land_after = None
    blank = {"t": 4.7, "d": 1.7, "text": f"≈ {day}th", "calendar": 30}
    if cut == "cond":
        # captions paced for reading (no narration), back to back; the hook line is whole on frame 1 (-0.4 s).
        # The header's blank ticks from 0.15 s (frame 1 keeps its "___"; the month grid fills beside the rolling
        # count) and lands 0.35 s after the count; one line carries both answers and the question between them
        # (merged: "≈ 117 hours." + "Every hour you work, to…" + "≈ the 20th."): fix pass, it starts just after the
        # count lands, timed so its last word ("≈ the 20th") pops just after the blank lands, and it is up 1.43 s (11
        # words need 1.32 s). Merged (fix pass): each later count's answer line carries the next rung's question, up from
        # that landing to the next one (the question leads its cut by 0.4 s; no answer under the next rung's "?").
        # Dropped: the last count's spoken rounding ("≈ 30,000 hours."): the verdict lands 0.9 s after the count
        # (the plate prints ≈ 30,053, and the morph keeps it in its working), too soon for a 1.2 s caption. Verdict
        # held 1.6 s.
        verdict_t, duration, land_after = 11.25, 12.85, 2.2
        blank = {"t": 0.15, "d": 2.4, "text": f"≈ {day}th", "calendar": 30}
        vo = [
            vo_line(-0.4, 2.7, f"{usd(WAGE)} an hour? Median rent:"),
            vo_line(2.32, 1.43, f"**{say[0]}**. Every hour you work, to **≈ the {day}th**."),
            vo_line(3.77, 1.36, "A year of rent?"),
            vo_line(5.15, 2.58, f"**{say[1]}**. An average new car?"),
            vo_line(7.75, 3.5, f"**{say[2]}**. A median new house?"),
            vo_line(11.25, 1.2, f"That's **{ap(y_r, years)}{y_r} years** of full-time work. Every cent you keep."),
        ]
    # the last landing does not depend on hold here (its lead is capped at 0.92 s; landAfter fixes it), so one
    # pass is exact
    lands = becker_landings(rungs, 6.83, verdict_t, land_after=land_after)
    hold = round(duration - lands[-1], 2)
    assert becker_landings(rungs, hold, verdict_t, land_after=land_after) == lands
    exp = {
        "id": "08b-becker-rig-hours-at-15",
        "look": "becker-rig",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": f"At **{usd(WAGE)}/hr**, you work for rent\nfrom the {RENT_DAY}st to the ___",
        "footer": f"{k_disp} kept: 2026 federal tax + FICA, single, no state tax",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"**{ap(y_r, years)}{y_r} years** of full-time work.\nEvery cent you keep."},
        "data": {
            "unit": {"name": f"Hour of work at {usd(WAGE)} ({k_disp} kept)", "price": u_disp, "icon": "hour"},
            "rungs": rungs,
            "hold": hold,
        },
        # no recap table (the four piles already compare; the end screen goes to the takeaway)
        # blank: the built kit writes the hook's answer into the header's "___" (lookOpts.blank): the days tick up
        # from the 1st while vo[2] says "every hour you work, to…" and land on the answer as its own line starts;
        # a 30-day month grid beside the first count fills in step (calendar)
        # morph: at the verdict the HUD turns the last answer into the takeaway: "30,053 hours ÷ 2,080 a year ≈ [14]
        # years of full-time work" (the plate shrinks round the 14)
        "lookOpts": {"pileLabels": False,
                     **({"landAfter": land_after} if land_after else {}),
                     "blank": blank,
                     "morph": {"t": verdict_t, "working": f"{rungs[3]['unitsDisplay'].replace('≈ ', '')} hours ÷ {HOURS_PER_YEAR:,} a year",
                               "display": f"{y_r}", "label": "years of full-time work"},
                     # condensed: the figure points up at the header's blank from frame 2 as it starts to tick
                     # (fix pass: the opening moved only the small ordinals and grid cells until the wind-up at
                     # 0.47 s), back to idle before the wind-up; and points up at the header's answer as it lands (the
                     # kit's own point waits for 0.9 s before the next cut, which the condensed cut does not leave).
                     # Beats are pose keys only: no cue, so the cue record and the audio do not move
                     **({"beats": [{"t": 0.03, "act": "pointUp", "d": 0.2},
                                   {"t": round(blank["t"] + blank["d"] - 0.14, 2), "act": "pointUp", "d": 0.3}]} if cut == "cond" else {})},
        "sfx": [],
    }
    allowed = {F(x) for x in [WAGE, RENT, RENT * MONTHS, KBB_ATP, NEW_HOUSE_2026, MONTHS, 2026, HOURS_PER_YEAR]}
    allowed |= {rhu(k, F(1, 100)), U, F(y_r), F(day)}
    # the morph's working: the house's hours over a full-time year, rounded to the year it shows
    assert rhu(F(rungs[3]["units"], HOURS_PER_YEAR)) == y_r
    rows.append(("Morph: house hours in years", f"{rungs[3]['units']:,} ÷ {HOURS_PER_YEAR:,}", f"{rungs[3]['units'] / HOURS_PER_YEAR:.3f}", f"≈ [{y_r}] years"))
    allowed |= {F(r["units"]) for r in rungs} | {F(vo_round(q)[1]) for q in qs}
    labelled = {F(1): "'1 month' / '1 year' / 'the 1st' (rent day)"}
    mapping = {0: 0, 1: 4, 2: 6, 3: 8}           # rung -> its question line
    answer = {0: 1, 1: 5, 2: 7, 3: 9}            # rung -> its number line (at the landing)
    if cut == "cond":
        mapping = {0: 0, 1: 2, 2: 3, 3: 4}       # rungs 2-3: the question rides on the previous answer's line
        answer = {0: 1, 1: 3, 2: 4}              # rung 0's number shares the blank's line; the last is the plate's
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: say[i] for i in range(len(items))}
    # rung 0's line opens on the wage ("$15 an hour?"), then names the rent
    timing = {"prerolled": set(), "prefilled": set(), "lead": {0: 4}, "lag": 1.4, "counter_sync": True, "answer": answer,
              # condensed: rung 0's answer line is the hook's answer (11 words, 1.32 s): it stays up past rung 1's cut
              # while the header keeps "≈ 20th" on screen; rung 1's question follows it
              "trail_ok": {0} if cut == "cond" else set(),
              "lands_of": becker_lands, "cut": cut, "caps_off": lambda sp: sp["verdict"]["t"],
              "extras": lambda sp, lands: becker_blank(sp, lands, f"≈ the {day}th", cut) + becker_morph(sp, y_r)}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, (10 if cut == "full" else 5), timing

def becker_blank(sp, lands, phrase, cut="full"):
    """The header's blank fills in (mirrors lookOpts.blank in looks/becker-rig/formats/unit-ladder.js: the ordinals
    tick from t, the answer lands at t + d). It must start ticking during its question line, land as its answer line
    starts (Becker captions pop a whole line: never before the blank, at most 0.5 s after), stay clear of rung 0's
    landing and of rung 1's cut, count to the number it prints, and its month grid must hold that day.
    Condensed cut: the blank ticks while rung 0's count fills (from frame 5: frame 1 keeps the "___" and the month
    grid, which fades in from t - 0.12 s, is hidden on frame 1), lands 0.3-0.6 s after the count, its line (which
    also carries the count's answer) starts on the landing, rung 1 cuts 0.35-0.6 s later, and a pointUp beat
    (lookOpts.beats) lands on it, since the kit's own point needs 0.9 s before the next cut."""
    bl = sp.get("lookOpts", {}).get("blank")
    if not bl:
        return [(False, "08b: lookOpts.blank missing", None)]
    land = bl["t"] + bl.get("d", 1.6)
    k = next((i for i, v in enumerate(sp["vo"]) if phrase in strip_markup(v["text"])), None)
    if k is None or k == 0:
        return [(False, f"08b: no VO line says {phrase!r} after a question", None)]
    line, qline = sp["vo"][k], sp["vo"][k - 1]
    # the condensed cut has no narration: a caption line is read as it pops, whole
    said = line["t"] + (words_before(line["text"], phrase) / WPS if cut == "full" else 0)
    rungs = sp["data"]["rungs"]
    n_text = int(re.sub(r"\D", "", bl["text"]))
    n_vo = int(re.sub(r"\D", "", phrase))
    out = [
        ("___" in sp["header"], "08b: the header has no blank to fill", None),
        (n_text == n_vo, f"08b: the blank prints {bl['text']!r} but the voice says {phrase!r}", None),
        (qline["t"] <= bl["t"] < qline["t"] + qline["d"], "08b: the blank must start ticking during its question line", None),
        (int(bl.get("calendar", 0)) in (28, 29, 30, 31) and n_text <= int(bl["calendar"]), "08b: the blank's month grid must be a month that holds its day", None),
    ]
    info = f"  blank: ticks 1st -> {bl['text']} from {bl['t']:5.2f}, lands {land:5.2f}  its line from {line['t']:5.2f}  month grid {bl.get('calendar')} days"
    if cut == "full":
        out.append((land - 1e-9 <= line["t"] <= land + 0.5 and said <= land + 0.5, f"08b: the blank lands at {land:.2f} s, its line starts at {line['t']:.2f} s", None))
        out.append((lands[0] + 0.6 <= land <= rungs[1]["t"] - 0.9, "08b: the blank must land between rung 0's count and rung 1's cut", info))
        return out
    beats = sp.get("lookOpts", {}).get("beats") or []
    pts = [b for b in beats if b.get("act") == "pointUp" and b.get("t", 0) > 1.0]
    punch = []
    becker_lands(sp, punch)
    # the merged line starts once the count has landed (checked with the numbers) and its words pop one by one (the
    # kit's caption): the day's word ("≈ the 20th") pops as the blank lands, never before it, at most 0.1 s after
    day_pop = becker_word_pop(line, phrase.split()[-1])
    info += f"  ('{phrase.split()[-1]}' pops at {day_pop:5.2f})"
    out += [
        (0.12 < bl["t"] <= 0.25, f"08b (condensed): the blank must start ticking by 0.25 s, its month grid hidden on frame 1 (t {bl['t']})", None),
        (punch[0] - 0.25 > bl["t"], "08b (condensed): the blank's tick must move the frame before the first wind-up", None),
        (lands[0] + 0.3 - 1e-9 <= land <= lands[0] + 0.6 + 1e-9, f"08b (condensed): the blank must land 0.3-0.6 s after the count ({land - lands[0]:.2f} s)", None),
        (f"{rungs[0]['unitsDisplay']}" in strip_markup(line["text"]) and lands[0] - 1e-9 <= line["t"] < land,
         "08b (condensed): one line, from the count's landing (before the blank's), carries the count's answer and the day", None),
        (land - 1e-6 <= day_pop <= land + 0.1, f"08b (condensed): the day pops at {day_pop:.2f} s, the blank lands at {land:.2f} s (window 0..+0.1 s)", None),
        (0.35 - 1e-9 <= rungs[1]["t"] - land <= 0.6 + 1e-9, f"08b (condensed): rung 1 must cut 0.35-0.6 s after the blank lands ({rungs[1]['t'] - land:.2f} s)", None),
        (len(pts) == 1 and abs(pts[0]["t"] - (land - 0.14)) < 0.006 and pts[0].get("d", 1.2) <= rungs[1]["t"] - pts[0]["t"],
         "08b (condensed): a pointUp beat must land on the blank (t = landing - 0.14 s) and end by rung 1's cut", info),
    ]
    return out

# the Becker Rig figure's pose names (looks/becker-rig/lib.js POSES; 'cheer' = celebrate), for lookOpts.beats
BECKER_POSES = {"stand", "idle", "lookUp", "think", "thinkUp", "point", "pointUp", "push", "pull", "lift", "carry", "hold",
                "windup", "release", "follow", "crouch", "catch", "chopUp", "chopDown", "shrug", "shocked", "celebrate",
                "cheer", "slump", "flat", "fall", "win", "sit"}

def becker_word_pop(v, word):
    """When `word` (the first whitespace token that contains it) starts to pop in a Becker Rig caption line: the kit
    splits the line on whitespace (lib.js wordTokens) and pops word k at t + k * min(0.045, 0.32 / n), each over 0.16 s."""
    toks = strip_markup(v["text"]).split()
    k = next((i for i, w in enumerate(toks) if word in w), None)
    if k is None:
        return math.inf
    return v["t"] + k * min(0.045, 0.32 / max(1, len(toks)))

def becker_opening_beat(sp, name):
    """Condensed Becker Rig cuts whose first coin stands at frame 1 (no pre-filled pan): the figure must move from
    frame 2. A scripted beat (lookOpts.beats, pose keys only: no cue) starts after frame 1 and by 0.1 s, and hands back
    to idle before the first wind-up (punch - 0.25 s), so the punch is unchanged."""
    punch = []
    becker_lands(sp, punch)
    beats = sp.get("lookOpts", {}).get("beats") or []
    first = [b for b in beats if 0 < b.get("t", -1) <= 0.1 + 1e-9]
    ok = len(first) == 1 and first[0].get("act") in BECKER_POSES and first[0].get("d") is not None \
        and first[0]["t"] + first[0]["d"] <= punch[0] - 0.25 + 1e-9
    b = first[0] if first else {}
    return [(ok, f"{name} (condensed): a figure beat must start between frame 2 and 0.1 s and hand back before the first wind-up ({punch[0] - 0.25:.2f} s)",
             f"  opening: {b.get('act', '?')} beat {b.get('t', 0):.2f}-{b.get('t', 0) + (b.get('d') or 0):.2f} s, then the wind-up at {punch[0] - 0.25:.2f} s")]

def becker_morph(sp, years_r):
    """At the verdict the HUD's last answer turns into the takeaway (lookOpts.morph): on the verdict's beat, its
    working divides the last rung's printed count by the full-time year, and it shows the verdict's year count."""
    mo = sp.get("lookOpts", {}).get("morph")
    if not mo:
        return [(False, "08b: lookOpts.morph missing", None)]
    last = sp["data"]["rungs"][-1]
    m = re.match(r"^([\d,]+) hours ÷ ([\d,]+) a year$", mo.get("working", ""))
    ok_w = bool(m) and int(m.group(1).replace(",", "")) == last["units"] and int(m.group(2).replace(",", "")) == HOURS_PER_YEAR
    return [
        (abs(mo["t"] - sp["verdict"]["t"]) < 1e-9, "08b: the morph must land on the verdict", None),
        (ok_w, f"08b: the morph's working must be the last count ÷ {HOURS_PER_YEAR:,} a year", None),
        (ok_w and rhu(F(int(m.group(1).replace(",", "")), HOURS_PER_YEAR)) == int(mo["display"]) == years_r and f"{years_r} years" in sp["verdict"]["text"],
         "08b: the morph's number must be the working's result and the verdict's", f"  morph: at {mo['t']:5.2f}  {mo['working']} ≈ [{mo['display']}] {mo.get('label', '')}"),
    ]

def build_08c(cut="full"):
    unit = BIG_MAC
    # the rungs are the header's own four words (one line each); "1 year" lives in the footer
    items = [
        ("Community", CB_PUBLIC_2YR, usd(CB_PUBLIC_2YR), "Community college"),
        ("In-state", CB_PUBLIC_4YR_IN, usd(CB_PUBLIC_4YR_IN), "In-state"),
        ("Out-of-state", CB_PUBLIC_4YR_OUT, usd(CB_PUBLIC_4YR_OUT), "Out-of-state"),
        ("Private", CB_PRIVATE_4YR, usd(CB_PRIVATE_4YR), "Private"),
    ]
    # rung 1 is cut before frame 1, so the built Becker Rig kit pre-fills it: frame 1 shows its pile and ≈ 667
    rung_t = [-1.0, 3.4, 7.5, 11.65]
    if cut == "cond":
        # condensed (2026-10-13): the pre-filled frame holds the community answer for 1.25 s while the camera pans
        # back (lookOpts.prefillPan); every count lands 2.2 s after its cut; each later rung cuts 0.4 s after the
        # previous count lands
        rung_t = [-1.0, 1.25, 3.85, 6.45]
    rows, rungs, qs = [], [], []
    for (item, cost, cost_disp, _), t in zip(items, rung_t):
        q = F(cost) / unit
        disp, n = count(q)
        qs.append(q)
        rungs.append({"t": t, "item": item, "cost": cost_disp, "units": n, "unitsDisplay": disp})
        rows.append((item, f"{cost_disp} ÷ {usd(unit, 2)}", f"{float(q):,.3f}", disp))
    # the payoff: private vs community college, the same ratio in dollars and in Big Macs
    ratio = F(CB_PRIVATE_4YR, CB_PUBLIC_2YR)
    assert qs[3] / qs[0] == ratio
    ratio_r = rhu(ratio, F(1, 10))
    ratio_num = ap(ratio_r, ratio) + f"{float(ratio_r):.1f}"
    assert ratio_num == "≈ 10.8"
    rows.append(("Private ÷ community (payoff)", f"{usd(CB_PRIVATE_4YR)} ÷ {usd(CB_PUBLIC_2YR)}", f"{float(ratio):.4f}", f"[{ratio_num.replace('≈ ', '')}] (working ends '≈')"))
    rows.append(("  the same in Big Macs", f"{float(qs[3]):,.3f} ÷ {float(qs[0]):,.3f}", f"{float(qs[3] / qs[0]):.4f}", ratio_num))
    # write-up and pinned-comment numbers (full budgets are not on screen)
    tuition4 = F(DEGREE_YEARS * CB_PRIVATE_4YR) / unit                 # tuition alone, 4 years private
    rows.append(("(tuition only, 4 yrs private)", f"4 × {usd(CB_PRIVATE_4YR)} ÷ {usd(unit, 2)}", f"{float(tuition4):,.3f}", count(tuition4)[0]))
    PINNED["08c 4 yrs private tuition only"] = (count(tuition4)[0],)
    instate4 = F(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET) / unit
    PINNED["08c 4 yrs in-state all-in"] = (usd(DEGREE_YEARS * CB_PUBLIC_4YR_IN_BUDGET), count(instate4)[0])
    private4 = F(DEGREE_YEARS * CB_PRIVATE_BUDGET) / unit
    yrs = F(count(private4)[1]) / DAYS_PER_YEAR                       # one a day: 42,103 ÷ 365
    y_r = rhu(yrs)
    assert rhu(private4 / DAYS_PER_YEAR) == y_r
    rows.append(("(pinned) 4 yrs private all-in", f"4 × {usd(CB_PRIVATE_BUDGET)} ÷ {usd(unit, 2)}", f"{float(private4):,.3f}", count(private4)[0]))
    rows.append(("(pinned) a Big Mac a day", f"{count(private4)[1]:,} ÷ {DAYS_PER_YEAR}", f"{float(yrs):.3f}", f"{ap(y_r, yrs)}{y_r} years"))
    PINNED["08c private full budget"] = (usd(CB_PRIVATE_BUDGET), usd(DEGREE_YEARS * CB_PRIVATE_BUDGET), count(private4)[0], f"{ap(y_r, yrs)}{y_r} years")
    # captions print the figure the counter shows (the voice may round it: see the write-up's VO table)
    say = [r["unitsDisplay"] for r in rungs]
    vo = [
        vo_line(0.0, 3.3, f"Community college? **{say[0]} Big Macs**."),
        # each later rung: the header's word as the question on its cut, the count in its own line as it lands
        vo_line(3.4, 0.6, "In-state?"),
        vo_line(5.1, 2.35, f"**{say[1]}**."),
        vo_line(7.5, 0.6, "Out-of-state?"),
        vo_line(9.25, 2.35, f"**{say[2]}**."),
        vo_line(11.65, 0.6, "Private?"),
        vo_line(13.45, 2.35, f"**{say[3]}**."),
        # the payoff: its question on the ask, the verdict line as its answer lands
        vo_line(15.85, 0.8, "Versus community?"),
        vo_line(17.35, 3.5, f"One private year: **{ratio_num}** community-college years."),
    ]
    duration = 22.0
    verdict_t = 17.35
    land_after = 1.7                               # lookOpts.landAfter: each count lands 1.7 s after its cut
    ask, pan = 15.85, None
    if cut == "cond":
        # captions paced for reading (no narration), back to back; the hook line is whole on frame 1 (-0.4 s).
        # The takeaway is asked 0.6 s after the last count (as his hop lands): the last count's line carries the
        # question with it (merged: "≈ 7,235." + "Versus community?"), up from the landing to the answer; the
        # answer lands 1.25 s after the ask (the compared piles stand side by side 0.5 s before it), held 1.6 s.
        # Merged (fix pass): each earlier count's answer line carries the next rung's question too, up from that
        # landing to the next one (the question leads its cut by 0.4 s; no answer under the next rung's "?").
        duration, verdict_t, land_after, ask, pan = 12.1, 10.5, 2.2, 9.25, 1.55
        vo = [
            vo_line(-0.4, 1.63, f"Community college? **{say[0]} Big Macs**."),
            vo_line(1.25, 2.18, "In-state?"),
            vo_line(3.45, 2.58, f"**{say[1]}**. Out-of-state?"),
            vo_line(6.05, 2.58, f"**{say[2]}**. Private?"),
            vo_line(8.65, 1.83, f"**{say[3]}**. Versus community?"),
            vo_line(10.5, 1.2, f"One private year: **{ratio_num}** community-college years."),
        ]
    pay_label = "community-college years"
    morph = {"t": verdict_t, "ask": ask, "item": "Private vs community",
             "working": f"{usd(CB_PRIVATE_4YR)} ÷ {usd(CB_PUBLIC_2YR)}", "display": ratio_num.replace("≈ ", ""),
             "label": pay_label, "compare": [0, 3]}
    lands = becker_landings(rungs, 8.65, verdict_t, land_after=land_after)
    hold = round(duration - lands[-1], 2)
    assert becker_landings(rungs, hold, verdict_t, land_after=land_after) == lands
    rows.append(("Counts land (Becker Rig kit)", f"pre-filled; then cut + {land_after} s", "", " / ".join(f"{x:.2f}" for x in lands)))
    exp = {
        "id": "08c-becker-rig-college-in-big-macs",
        "look": "becker-rig",
        "format": "unit-ladder",
        "fps": 30,
        "duration": duration,
        "header": "Community? In-state?\nOut-of-state? Private?\nYour year in **Big Macs**",
        # the Becker Rig footer is at most 2 mono lines at 40 px: the same facts, "published" dropped
        "footer": f"{usd(unit, 2)} Big Mac (Jul 2026) · 1 year of\nCollege Board 2025-26 tuition & fees",
        "captions": True,
        "vo": vo,
        "verdict": {"t": verdict_t, "text": f"One private year =\n**{ratio_num}** community-college years."},
        "data": {
            "unit": {"name": "Big Mac", "price": usd(unit, 2), "icon": "burger"},
            "rungs": rungs,
            "hold": hold,
        },
        # built kit: the pre-filled first pile at frame 1; every count lands 1.7 s after its cut (on the voice's
        # answer line); the asked takeaway (morph.ask): "Private vs community / $45,000 ÷ $4,150 = / ? community-college
        # years" on "Versus community?", the other piles dimmed, the answer [10.8] landing on the verdict's beat
        "lookOpts": {"landAfter": land_after, **({"prefillPan": pan} if pan else {}), "morph": morph},
        "sfx": [],
    }
    allowed = {F(x) for x in [BIG_MAC, CB_PUBLIC_2YR, CB_PUBLIC_4YR_IN, CB_PUBLIC_4YR_OUT, CB_PRIVATE_4YR,
                              2026, 2025, 26]}
    allowed |= {F(r["units"]) for r in rungs} | {F(ratio_r)}
    labelled = {F(1): "'1 year' (one unit)"}
    mapping = {0: 0, 1: 1, 2: 3, 3: 5}           # rung -> its question line
    answer = {0: 0, 1: 2, 2: 4, 3: 6}            # rung -> the line that prints and says its figure
    if cut == "cond":
        mapping = {0: 0, 1: 1, 2: 2, 3: 3}       # rungs 2-3: the question rides on the previous answer's line
        answer = {0: 0, 1: 2, 2: 3, 3: 4}
    opens = {i: items[i][3] for i in range(len(items))}
    say = {i: say[i] for i in range(len(items))}
    # rung 1 is pre-filled before frame 1 and the opener line reads the answer already on screen
    timing = {"prerolled": set(), "prefilled": {0}, "lead": {}, "lag": 0.0, "counter_sync": True, "answer": answer,
              "lands_of": becker_lands, "cut": cut, "caps_off": lambda sp: sp["verdict"]["t"],
              "extras": lambda sp, ld: becker_asked_payoff(sp, ld, ratio_r, cut)}
    return exp, rows, allowed, labelled, mapping, opens, say, lands, (8 if cut == "full" else 5), timing

def becker_asked_payoff(sp, lands, ratio_r, cut="full"):
    """The asked takeaway (lookOpts.morph with ask, in looks/becker-rig/formats/unit-ladder.js): it is asked after the
    last count lands, on its question line; its working divides the costs of the two piles it compares (both on
    screen as rungs); its number is that ratio to 0.1 with the "≈" the working ends on; it lands on the verdict's beat
    (the verdict line says it, never before it), and the verdict carries the same number and label."""
    mo = sp.get("lookOpts", {}).get("morph")
    if not mo or mo.get("ask") is None:
        return [(False, "08c: lookOpts.morph with ask missing", None)]
    rungs = sp["data"]["rungs"]
    cmp_ = mo.get("compare", [])
    m = re.match(r"^(\$[\d,]+) ÷ (\$[\d,]+)$", mo.get("working", ""))
    ok_w = bool(m) and len(cmp_) == 2 and m.group(1) == rungs[cmp_[1]]["cost"] and m.group(2) == rungs[cmp_[0]]["cost"]
    ratio = F(m.group(1)[1:].replace(",", "")) / F(m.group(2)[1:].replace(",", "")) if m else F(0)
    qline = next((v for v in sp["vo"] if abs(v["t"] - mo["ask"]) < 1e-9), None)
    if cut == "cond":
        # condensed: the question rides on the last count's line, up from that landing through the ask
        qline = next((v for v in sp["vo"] if "Versus community?" in strip_markup(v["text"])
                      and v["t"] <= mo["ask"] < v["t"] + v["d"] and abs(v["t"] - lands[-1]) <= 0.06), None)
    vline = next((v for v in sp["vo"] if abs(v["t"] - sp["verdict"]["t"]) < 1e-9), None)
    disp = str(mo.get("display"))
    said = vline["t"] + words_before(vline["text"], "≈ " + disp) / WPS if vline and ("≈ " + disp) in strip_markup(vline["text"]) else -1
    # the kit's asked-takeaway timing (looks/becker-rig/formats/unit-ladder.js): the smaller compared pile hops beside
    # the bigger one from ask + 0.2 s for 0.55 s (morph.beside); the "?" squashes out 0.096 s before t, the answer pops
    # in on t and is fully in (with the working's "≈") at t + 0.048 s
    side_land = mo["ask"] + 0.2 + 0.55
    full_in = mo["t"] + 0.048
    ok_side = len(cmp_) == 2 and cmp_[0] < cmp_[1] and rungs[cmp_[0]]["units"] < rungs[cmp_[1]]["units"] and mo.get("beside", True) is not False
    return [
        (ok_side, "08c: compare must name the smaller pile first, and it hops beside the bigger one (morph.beside)", None),
        (side_land <= mo["t"] - 0.5, f"08c: the compared piles must stand side by side ({side_land:.2f} s) before the answer lands",
         f"  side by side: the {rungs[cmp_[0]]['item'] if ok_side else '?'} pile hops beside the {rungs[cmp_[1]]['item'] if ok_side else '?'} pile {mo['ask'] + 0.2:5.2f}-{side_land:5.2f}; the answer is fully in (and '≈') at {full_in:5.2f}"),
        (full_in <= mo["t"] + 0.1 and (said < 0 or full_in <= said), "08c: the answer (and its '≈') must be fully in within 0.1 s of the verdict's beat, before the voice says it", None),
        (mo["ask"] > lands[-1] + 0.5, "08c: the takeaway must be asked after the last count lands", None),
        (qline is not None, "08c: the takeaway's question line must start on its ask" if cut == "full" else
         "08c (condensed): a line carrying 'Versus community?' must start on the last landing and be up at the ask", None),
        (ok_w, "08c: the morph's working must divide the costs of the two piles it compares", None),
        (ok_w and rhu(ratio, F(1, 10)) == F(disp) == ratio_r and mo.get("approx", True) is True, "08c: the morph's number must be ≈ the working's ratio to 0.1", None),
        (abs(mo["t"] - sp["verdict"]["t"]) < 1e-9 and vline is not None, "08c: the answer must land on the verdict's beat, with its line", None),
        (("≈ " + disp) in strip_markup(sp["verdict"]["text"]) and mo.get("label", "") in strip_markup(sp["verdict"]["text"]), "08c: the verdict must carry the morph's number and label", None),
        (said >= mo["t"] - 1e-9, f"08c: the voice says ≈ {disp} at {said:.2f} s, before it lands ({mo['t']:.2f} s)",
         f"  payoff: asked {mo['ask']:5.2f} ('{qline['text'] if qline else '?'}')  {mo['working']} ≈ [{disp}] {mo.get('label', '')} lands {mo['t']:5.2f} (= verdict)  VO says it at {said:5.2f}"),
    ]

# ======================================================================================
# Checks
# ======================================================================================
FAILS = []
CHECKS = 0

def check(cond, msg):
    global CHECKS
    CHECKS += 1
    if not cond:
        FAILS.append(msg)
    return cond

def compare(path, exp, got):
    """Exact deep comparison; every leaf is a check."""
    if isinstance(exp, dict):
        check(isinstance(got, dict), f"{path}: expected an object")
        if not isinstance(got, dict):
            return
        check(set(exp) == set(got), f"{path}: keys differ: missing {sorted(set(exp) - set(got))}, extra {sorted(set(got) - set(exp))}")
        for k in exp:
            if k in got:
                compare(f"{path}.{k}", exp[k], got[k])
    elif isinstance(exp, list):
        check(isinstance(got, list) and len(got) == len(exp), f"{path}: expected {len(exp)} items, got {len(got) if isinstance(got, list) else type(got).__name__}")
        if isinstance(got, list):
            for i, (e, g) in enumerate(zip(exp, got)):
                compare(f"{path}[{i}]", e, g)
    elif isinstance(exp, float) or isinstance(got, float):
        check(isinstance(got, (int, float)) and abs(float(exp) - float(got)) < 1e-9, f"{path}: expected {exp!r}, got {got!r}")
    else:
        check(exp == got and type(exp) == type(got), f"{path}: expected {exp!r}, got {got!r}")

def display_strings(spec):
    """Every string that can appear on screen (or in the captions)."""
    out = [("header", spec["header"]), ("footer", spec["footer"]), ("verdict", spec["verdict"]["text"])]
    out += [(f"vo[{i}]", v["text"]) for i, v in enumerate(spec["vo"])]
    u = spec["data"]["unit"]
    out += [("unit.name", u["name"]), ("unit.price", u["price"])] + ([("unit.label", u["label"])] if "label" in u else [])
    for i, r in enumerate(spec["data"]["rungs"]):
        out += [(f"rung[{i}].item", r["item"]), (f"rung[{i}].cost", r["cost"]), (f"rung[{i}].unitsDisplay", r["unitsDisplay"])]

    def walk(p, x):
        if isinstance(x, dict):
            for k, v in x.items():
                if k not in ("t", "item", "verb"):
                    walk(f"{p}.{k}", v)
        elif isinstance(x, list):
            for i, v in enumerate(x):
                walk(f"{p}[{i}]", v)
        elif isinstance(x, str):
            out.append((p, x))
    walk("lookOpts", spec.get("lookOpts", {}))
    return out

def run(name, builder):
    path = SPEC_PATHS[name]
    in_specs = path.parent.resolve() == SPEC_DIR.resolve()
    cut = cut_of(name) or IN_SPECS[name]
    exp, rows, allowed, labelled, mapping, opens, say, lands, verdict_vo, timing = builder(cut)
    print("=" * 108)
    print(f"{exp['id']}   ({exp['look']} · {exp['format']} · {exp['duration']} s · {'round-2' if cut == 'full' else 'condensed'} cut, {path.relative_to(REPO) if path.is_relative_to(REPO) else path})")
    print("=" * 108)
    print(f"{'what':38s} {'formula':44s} {'exact':>14s}  on screen")
    for r in rows:
        print(f"{r[0][:38]:38s} {r[1][:44]:44s} {r[2]:>14s}  {r[3]}")
    if not check(path.exists(), f"{exp['id']}: spec file missing at {path}"):
        return
    got = json.loads(path.read_text(encoding="utf-8"))
    n0 = len(FAILS)
    # which cut: studio/specs/ must hold IN_SPECS[name]; a --spec file is checked as the cut its length names
    check(not in_specs or cut == IN_SPECS[name], f"{name}: studio/specs/ must hold the {IN_SPECS[name]} cut, not the {cut} one")
    if cut == "cond":
        body = got.get("duration", 0)
        lo_, hi_ = COND_LANE[name]
        if not check(lo_ <= body <= hi_, f"{name}: {body} s is neither the round-2 cut ({FULL_DUR[name]} s) nor a condensed body ({lo_}-{hi_} s)"):
            print(f"  checks failed for this teaser: {len(FAILS) - n0}")
            return

    # 1. exact equality with the computed spec (every display string, number, time)
    compare(exp["id"], exp, got)
    spec = got
    # the timing checks below replay the kit on the spec as written (not on the expected spec)
    lands_exp = lands
    try:
        lands = timing["lands_of"](spec)
    except Exception as e:  # a malformed spec still reports through the checks above
        check(False, f"{name}: kit timing replay failed on the spec: {e}")
    check(all(abs(a - b) < 1e-9 for a, b in zip(lands, lands_exp)), f"{name}: kit landings on the spec differ from the expected ones")

    # 2. contract shape
    check(spec["id"] == path.stem, f"{name}: id != file stem")
    check(spec["format"] == "unit-ladder" and spec["fps"] == 30 and spec["captions"] is True, f"{name}: format/fps/captions")
    rungs = spec["data"]["rungs"]
    check(4 <= len(rungs) <= 7, f"{name}: {len(rungs)} rungs (contract: 4-7)")
    check(spec["data"]["unit"]["icon"] in ICONS, f"{name}: unknown icon {spec['data']['unit']['icon']}")
    check(all(isinstance(r["units"], (int, float)) for r in rungs), f"{name}: units must be numeric")
    check(all(rungs[i]["units"] < rungs[i + 1]["units"] for i in range(len(rungs) - 1)), f"{name}: ladder not cheap -> huge")
    check(all(rungs[i]["t"] < rungs[i + 1]["t"] for i in range(len(rungs) - 1)), f"{name}: rung times not increasing")

    # 3. "≈" on every rounded count and on no exact one; units = the printed count
    for i, r in enumerate(rungs):
        shown = F(r["unitsDisplay"].replace("≈", "").replace(",", "").strip())
        check(shown == F(r["units"]), f"{name}: rung {i} units {r['units']} != shown {r['unitsDisplay']}")

    # 4. number tokens: computed values or labelled constants only
    for where, s in display_strings(spec):
        for tok in number_tokens(s):
            ok = tok in allowed or tok in labelled
            check(ok, f"{name}: {where}: number {float(tok):g} in {s!r} is not a computed value or labelled constant")

    # 5. timing
    vo = spec["vo"]
    if cut == "cond":
        # condensed: find each rung's question and number lines by what they say (not by index), so a spec whose
        # lines were split, merged or reordered is judged on its own lines
        def line_of(phrase, start=0):
            return next((i for i, v in enumerate(vo) if i >= start and phrase in strip_markup(v["text"])), None)
        found = {}
        for ri in mapping:
            i = line_of(opens[ri])
            check(i is not None, f"{name}: no caption line asks rung {ri} ({opens[ri]!r})")
            found[ri] = mapping[ri] if i is None else i
        mapping = found
        found = {}
        for ri in timing.get("answer", mapping):
            i = line_of(say[ri], 0 if ri in timing["prefilled"] else mapping[ri])
            check(i is not None, f"{name}: no caption line prints rung {ri}'s {say[ri]!r}")
            found[ri] = timing["answer"][ri] if i is None else i
        timing = {**timing, "answer": found}
        # a count the screen prints but no caption carries (08a's hero, 08b's plate): never captioned before the band hides
        hide_ = timing["caps_off"](spec)
        for ri in mapping:
            if ri not in found and ri not in timing["prefilled"]:
                check(not any(say[ri] in strip_markup(v["text"]) for v in vo if v["t"] < hide_ - 1e-9),
                      f"{name}: rung {ri}'s {say[ri]!r} is printed by the screen, not captioned")
    t0_numbers = any(r["t"] <= 0 for r in rungs) or bool(NUM_RE.search(spec["header"]))
    check(bool(spec["header"]) and t0_numbers and "$" in spec["footer"] and NUM_RE.search(spec["footer"]),
          f"{name}: frame 1 must show the header and a $ number")
    hw = len([w for w in strip_markup(spec["header"]).split() if re.search(r"[A-Za-z0-9]", w)])
    check(hw <= 15, f"{name}: header has {hw} words (R8: at most 15)")
    if cut == "full":
        check(vo[0]["t"] == 0.0, f"{name}: VO must start at 0.0")
        for i, v in enumerate(vo):
            need = spoken_words(v["text"]) / WPS
            check(v["d"] + 1e-9 >= need, f"{name}: vo[{i}] d={v['d']} < {need:.2f} s needed for {spoken_words(v['text'])} words")
    for i, v in enumerate(vo):
        if i + 1 < len(vo):
            check(v["t"] + v["d"] <= vo[i + 1]["t"] + 1e-9, f"{name}: vo[{i}] overlaps vo[{i + 1}]")
    answer = timing.get("answer", mapping)
    for ri, vi in mapping.items():
        if ri in timing["prefilled"]:
            # answered before frame 1 (the kit's pre-fill); the opener line reads it from frame 1
            check(rungs[ri]["t"] < 0 and lands[ri] <= 0 and (vo[vi]["t"] == 0.0 if cut == "full" else vo[vi]["t"] <= 0 and vi == 0),
                  f"{name}: pre-filled rung {ri} must be landed by frame 1 and read from frame 1")
        elif ri in timing["prerolled"]:
            # cut under the opener line (the count rolls while it plays); its own question follows the opener
            v0 = vo[0]
            check(v0["t"] <= rungs[ri]["t"] < v0["t"] + v0["d"] and vo[vi]["t"] >= v0["t"] + v0["d"] - 1e-9,
                  f"{name}: pre-rolled rung {ri} must cut during the opener line and be asked after it")
        elif cut == "cond" and ri == 0 and vi == 0:
            # the opener names rung 0 (placed at frame 1) and is whole on frame 1
            check(rungs[0]["t"] == 0.0 and vo[0]["t"] <= 0, f"{name}: rung 0's opener must be up from frame 1")
        elif cut == "cond" and ri > 0 and vi == answer.get(ri - 1):
            # merged (fix pass): the previous count's answer line carries this rung's question, from that landing, so
            # the question leads its cut (by 0.35-0.6 s, the landing-to-cut gap) instead of trailing it
            lead_s = rungs[ri]["t"] - vo[vi]["t"]
            check(abs(vo[vi]["t"] - lands[ri - 1]) <= 0.06 and 0.35 - 1e-9 <= lead_s <= 0.6 + 1e-9,
                  f"{name}: rung {ri}: its question rides on rung {ri - 1}'s answer line, which must start on that landing ({lands[ri - 1]:.2f} s) and lead the cut by 0.35-0.6 s ({lead_s:.2f} s)")
        else:
            lag = vo[vi]["t"] - rungs[ri]["t"]
            lag_max = timing["lag"] if cut == "full" else 0.85
            check(-1e-9 <= lag <= lag_max + 1e-9, f"{name}: rung {ri} t={rungs[ri]['t']} but its question line starts at {vo[vi]['t']} (allowed lag {lag_max} s)")
        qtext = vo[vi]["text"]
        if cut == "cond" and ri > 0 and vi == answer.get(ri - 1):
            # a merged line: the question is the sentence after the previous count's answer
            plain = strip_markup(qtext)
            i0 = plain.find(say[ri - 1])
            j0 = plain.find(". ", i0 if i0 >= 0 else 0)
            qtext = plain[j0 + 2:] if i0 >= 0 and j0 >= 0 else plain
        if opens[ri] not in strip_markup(qtext):
            check(False, f"{name}: rung {ri}: VO line {vi} does not ask {opens[ri]!r} after the previous answer")
            continue
        wb = words_before(qtext, opens[ri])
        lead = timing["lead"].get(ri, 1)
        check(wb <= lead, f"{name}: rung {ri}: VO line {vi} names the item late ({wb} words in, max {lead})")
    check(lands[0] <= 3.0, f"{name}: first count lands at {lands[0]:.2f} s (R10: within about 3 s)")
    check(spec["verdict"]["t"] == vo[verdict_vo]["t"], f"{name}: verdict t != its VO line")
    dur = spec["duration"]
    if cut == "full":
        check(LANE[0] <= dur <= LANE[1], f"{name}: duration {dur} outside {LANE}")
        check(dur >= spec["verdict"]["t"] + 2.5 - 1e-9, f"{name}: verdict held < 2.5 s")
    check(dur >= vo[-1]["t"] + vo[-1]["d"] + 0.4 - 1e-9, f"{name}: duration ends before the last VO line + 0.4 s")
    check(abs(lands[-1] + spec["data"]["hold"] - dur) <= 0.02, f"{name}: last landing {lands[-1]:.2f} + hold {spec['data']['hold']} != duration {dur}")
    for s in spec.get("sfx", []):
        check(0 <= s["t"] <= dur, f"{name}: sfx at {s['t']} outside the video")
    if spec["look"] == "scoreboard" or timing.get("counter_sync"):
        for ri, vi in answer.items():
            # round-2 cut: when the voice says it (2.6 words/s); condensed (no narration): when its line goes up
            said = vo[vi]["t"] + (words_before(vo[vi]["text"], say[ri]) / WPS if cut == "full" else 0)
            if cut == "cond" and ri in timing["prefilled"]:
                said = max(said, lands[ri])
            check(said >= lands[ri] - (0.5 if cut == "full" else 0.05), f"{name}: rung {ri}: VO says the number at {said:.2f} s, counter lands at {lands[ri]:.2f} s")
            if cut == "cond" and ri not in timing["prefilled"]:
                check(say[ri] in strip_markup(vo[vi]["text"]), f"{name}: rung {ri}: its number line must print {say[ri]!r}")
            if vi != mapping[ri] or (cut == "cond" and ri not in timing["prefilled"]):
                # the number has its own caption cue (or, condensed, a merged line that starts with the landing): it
                # appears once the counter has landed (never printed, grey or whole, while the count still runs)
                check(lands[ri] - 0.05 <= vo[vi]["t"] <= lands[ri] + 0.6,
                      f"{name}: rung {ri}: its number cue starts at {vo[vi]['t']} s, the counter lands at {lands[ri]:.2f} s (window -0.05..+0.6 s)")
                check(mapping[ri] <= vi, f"{name}: rung {ri}: the number cue must follow its question")
            print(f"  rung {ri}: cut {rungs[ri]['t']:5.2f}  counter lands {lands[ri]:5.2f}  {'VO says' if cut == 'full' else 'line shows'} '{say[ri]}' at {said:5.2f}" + (f"  (own cue from {vo[vi]['t']:5.2f})" if vi != mapping[ri] else ""))
    for ok, msg, line in (timing.get("extras") or (lambda sp, ld: []))(spec, lands):
        check(ok, msg)
        if line:
            print(line)
    if cut == "cond":
        condensed_rules(name, spec, lands, timing, mapping, answer)
    print("  VO timing (words at 2.6/s):" if cut == "full" else "  Captions (on screen from frame 1 until hidden; need max(1.2 s, 0.12 s a word)):")
    hide = timing["caps_off"](spec) if cut == "cond" else None
    for i, v in enumerate(vo):
        w = spoken_words(v["text"])
        if cut == "full":
            print(f"    {v['t']:5.1f} + {v['d']:.1f}  needs {w / WPS:4.2f} s ({w:2d} words)  {strip_markup(v['text'])}")
        else:
            up = shown_for(v, hide)
            print(f"    {v['t']:5.2f} + {v['d']:.2f}  on screen {up:4.2f} s  needs {cap_need(v):4.2f}  {strip_markup(v['text'])}")
    print(f"  checks failed for this teaser: {len(FAILS) - n0}")


# ======================================================================================
# Condensed-cut rules (2026-10-13): no narration, no still moment
# ======================================================================================
def cap_words(v):
    # every whitespace-separated token counts, "≈" and "=" included (as in 06-pov-race.py's words(): the eye reads it)
    return len(strip_markup(v["text"]).split())


def cap_need(v):
    return max(CAP_MIN, CAP_SPW * cap_words(v))


def shown_for(v, hide):
    """Seconds a caption is on screen: from frame 1 (or its start) to its end, or to the moment the payoff /
    verdict hides the caption band."""
    return max(0.0, min(v["t"] + v["d"], hide) - max(v["t"], 0.0))


def condensed_rules(name, spec, lands, timing, mapping, answer):
    vo, rungs, dur = spec["vo"], spec["data"]["rungs"], spec["duration"]
    lo = spec.get("lookOpts", {})
    look = spec["look"]
    hide = timing["caps_off"](spec)
    V = spec["verdict"]["t"]
    # captions paced for reading; a line that starts once the band is hidden is narration-only (exempt), and is the
    # verdict's own line (Becker hides captions at the verdict) or the payoff's (Scoreboard hides them at the cut)
    for i, v in enumerate(vo):
        if v["t"] >= hide - 1e-9:
            check(i >= len(vo) - 2 and (abs(v["t"] - hide) < 1e-9 or abs(v["t"] - V) < 1e-9),
                  f"{name}: vo[{i}] starts after the caption band is hidden but is not the payoff's or verdict's line")
            continue
        up, need = shown_for(v, hide), cap_need(v)
        check(up + 1e-9 >= need, f"{name}: caption vo[{i}] on screen {up:.2f} s < {need:.2f} s ({cap_words(v)} words)")
    shown = [v for v in vo if v["t"] < hide - 1e-9]
    for a, b in zip(shown, shown[1:]):
        check(b["t"] - (a["t"] + a["d"]) < 0.2, f"{name}: caption gap {b['t'] - a['t'] - a['d']:.2f} s before {strip_markup(b['text'])!r} (back to back: < 0.2 s)")
    check(shown[-1]["t"] + shown[-1]["d"] >= hide - 0.2, f"{name}: the last shown caption must stay up until the band is hidden")
    # no answer under the next rung's "?" (fix pass): a count's answer line that stays up past the next cut must carry
    # that rung's question (merged), except where timing["trail_ok"] says why (08b: the hook's answer, see build_08b)
    for ri, vi in answer.items():
        if ri + 1 >= len(rungs):
            continue
        v = vo[vi]
        if v["t"] + v["d"] > rungs[ri + 1]["t"] + 0.05 and ri not in timing.get("trail_ok", set()):
            check(mapping[ri + 1] == vi, f"{name}: rung {ri}'s answer line {strip_markup(v['text'])!r} stays up {v['t'] + v['d'] - rungs[ri + 1]['t']:.2f} s past rung {ri + 1}'s cut without its question (merge them)")
    # frame 1: the hook line is whole (Scoreboard: it rises in over 0.14 s; Becker Rig: its words pop in 0.16 s each,
    # staggered by min(0.045, 0.32 / n))
    v0 = vo[0]
    if look == "scoreboard":
        whole = v0["t"] <= -0.14
    else:
        n = len([tk for tk in strip_markup(v0["text"]).split() if tk])
        whole = v0["t"] + (n - 1) * min(0.045, 0.32 / max(1, n)) + 0.16 <= 0
    check(whole, f"{name}: the hook caption must be whole on frame 1 (vo[0] starts at {v0['t']})")
    # the verdict is held 1.2-1.6 s before the end card, and the last line fits
    check(1.2 - 1e-9 <= dur - V <= 1.6 + 1e-9, f"{name}: verdict held {dur - V:.2f} s (condensed: 1.2-1.6 s)")
    # no still moment: each landing -> the next cut within 0.35-0.6 s (08b rung 0: -> its blank, checked there);
    # landings 2.44-3.0 s apart
    for i in range(len(rungs) - 1):
        if lands[i] <= 0:
            continue                                   # pre-filled: the pan carries frame 1 (checked below)
        if name == "08b" and i == 0:
            continue
        gap = rungs[i + 1]["t"] - lands[i]
        check(0.35 - 1e-9 <= gap <= 0.6 + 1e-9, f"{name}: rung {i} lands {gap:.2f} s before rung {i + 1} cuts (condensed: 0.35-0.6 s)")
    real = [x for x in lands if x > 0]
    for j, (a, b) in enumerate(zip(real, real[1:])):
        # the climax rung may take longer (Scoreboard's final roll is 2.4 s by design), never longer than 3.4 s
        top = 3.4 if j == len(real) - 2 else 3.0
        check(2.44 - 1e-9 <= b - a <= top + 1e-9, f"{name}: landings {a:.2f} -> {b:.2f} are {b - a:.2f} s apart (condensed: 2.44-{top} s)")
    last = lands[-1]
    if name == "08a":
        # frame 1 moves: the unit intro's hot dog falls from frame 1 and lands at 0.2 s; rung 1 cuts by 0.6 s
        check(0.5 <= rungs[0]["t"] <= 0.6, f"08a: rung 1 must cut 0.5-0.6 s in (the unit intro on, then no still): {rungs[0]['t']}")
        pt = lo["payoff"]["t"]
        check(0.45 - 1e-9 <= pt - last <= 0.65 + 1e-9, f"08a: the payoff must cut 0.45-0.65 s after the last count lands ({pt - last:.2f} s)")
        q = vo[mapping[3]]
        check(q["t"] < last < q["t"] + q["d"] + 1e-9 and abs(q["t"] + q["d"] - pt) < 1e-6,
              "08a: the last rung's question line must run through its landing to the payoff cut (its rounding is not captioned)")
        check(3 not in answer, "08a: the last count is printed by the hero (not captioned)")
    if name == "08b":
        for ok, msg, line in becker_opening_beat(spec, "08b"):
            check(ok, msg)
            print(line)
        punch = []
        becker_lands(spec, punch)
        check(punch[0] <= 0.8, f"08b: rung 0's punch must come by 0.8 s ({punch[0]:.2f})")
        check(0.8 - 1e-9 <= V - last <= 1.5 + 1e-9, f"08b: the verdict must land 0.8-1.5 s after the last count ({V - last:.2f} s)")
        q = vo[mapping[3]]
        check(q["t"] < last < q["t"] + q["d"] + 1e-9 and abs(q["t"] + q["d"] - V) < 1e-6,
              "08b: the last rung's question line must run through its landing to the verdict (the plate prints the count)")
        check(3 not in answer, "08b: the last count is printed by the plate and the morph's working (not captioned)")
        check(lo.get("landAfter") is not None, "08b: lookOpts.landAfter must set the condensed pace")
    if name == "08c":
        pp = lo.get("prefillPan")
        check(pp is not None and rungs[1]["t"] <= pp <= rungs[1]["t"] + 0.5,
              f"08c: lookOpts.prefillPan must move the pre-filled frame from frame 1 at least until rung 1 cuts ({pp})")
        check(1.2 - 1e-9 <= rungs[1]["t"] - 0.02 and vo[1]["t"] == rungs[1]["t"],
              "08c: the pre-filled answer must be up >= 1.2 s before rung 1 cuts, on its question line")
        mo = lo.get("morph", {})
        check(0.5 < mo.get("ask", 0) - last <= 0.8 + 1e-9, f"08c: the takeaway must be asked 0.5-0.8 s after the last count ({mo.get('ask', 0) - last:.2f} s)")
        check(1.25 - 1e-9 <= mo.get("t", 0) - mo.get("ask", 0) <= 1.4 + 1e-9, f"08c: the answer must land 1.25-1.4 s after the ask ({mo.get('t', 0) - mo.get('ask', 0):.2f} s)")
    print(f"  condensed: body {dur} s (lane {COND_LANE[name][0]}-{COND_LANE[name][1]}), verdict {V} held {dur - V:.2f} s, landings "
          + " / ".join(f"{x:.2f}" for x in lands) + ", cuts " + " / ".join(f"{r['t']:.2f}" for r in rungs))


def main():
    run("08a", build_08a)
    run("08b", build_08b)
    run("08c", build_08c)
    print("Pinned-comment / caption numbers (computed):")
    for k_, v_ in PINNED.items():
        print(f"  {k_:32s} {'  '.join(v_)}")
    md = REPO / "teasers" / "v2" / "08-unit-ladder.md"
    if md.exists():
        text = md.read_text(encoding="utf-8")
        for k_, v_ in PINNED.items():
            for s_ in v_:
                check(s_ in text, f"write-up: pinned/caption number {s_!r} ({k_}) not found in 08-unit-ladder.md")
    print("=" * 108)
    if FAILS:
        print(f"FAILED: {len(FAILS)} of {CHECKS} checks")
        for f in FAILS:
            print("  ✗", f)
        sys.exit(1)
    print(f"PASSED: all {CHECKS} checks")

if __name__ == "__main__":
    main()
