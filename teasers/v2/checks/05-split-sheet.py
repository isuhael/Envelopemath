#!/usr/bin/env python3
"""Math + timing check for format 5, "split-sheet" (teasers 05a, 05b, 05c).

1. Recomputes every on-screen number from its inputs (constants below; sources in
   teasers/v2/05-split-sheet.md):
     05a  Chipotle FY2025 10-K / Q4 release lines ($ thousands) -> each line's share of $10
     05b  the 50/30/20 rule on a $3,000 take-home with $1,200 rent (pure arithmetic)
     05c  Costco FY2026 results ($ millions) -> each line's share of a $100 cart
2. Loads the three spec JSONs and asserts that every digit-bearing display string equals
   the computed, formatted value (a digit-bearing string the script does not know is an
   error too), that numeric fields agree with their display strings (value, share), and
   that every number spoken in the vo text (digits and number words) equals the
   computed value, line by line.
3. Checks "≈" on every rounded result and never on an exact one, that the parts add up
   to the total, the hook rules R1/R2/R8/R10, and the timing contract: VO read at
   ~2.6 words/s, no overlapping lines, every beat's t at the moment the VO says it,
   header + a number at t = 0, duration inside the 20-40 s lane for this format.
   05c's rows and hero roll in after their cut, so for 05c the check also recomputes each
   LANDING the way the scoreboard kit does (cut + 0.18 s + roll) and holds it to the spoken
   number, not just the cut (fix pass 2026-10-08: the payoff landed 1.4 s after it was said).
4. Fact-consistency checks on the sourced inputs (identities and reported percentages)
   and the robustness of each verdict.

Prints a table and exits non-zero on any mismatch.
Run:  python3 teasers/v2/checks/05-split-sheet.py
"""
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parents[3]
SPECS = ROOT / "studio" / "specs"
FILES = {
    "05a": SPECS / "05a-clean-sheet-chipotle-10.json",
    "05b": SPECS / "05b-becker-rig-3000-paycheck.json",
    "05c": SPECS / "05c-scoreboard-costco-100.json",
}
LOOKS = {"05a": "clean-sheet", "05b": "becker-rig", "05c": "scoreboard"}
WPS = 2.6              # guide VO read rate, words per second
LANE = (20.0, 40.0)    # duration lane this format was briefed on
EARLY, LATE = 0.8, 0.2  # a beat may land up to 0.8 s before / 0.2 s after the spoken number
START_TOL = 0.05       # a beat tied to a line start sits within 0.05 s of it

rows = []
errors = 0


def record(teaser, check, got, want, ok):
    global errors
    rows.append((teaser, check, str(got), str(want), bool(ok)))
    if not ok:
        errors += 1


def eq(teaser, check, got, want):
    record(teaser, check, got, want, got == want)


# ---------------------------------------------------------------- formatting
def money(x, dp=0):
    return f"${x:,.{dp}f}"


def cents_or_dollars(x):
    """$10 -> '$10', 2.96 -> '$2.96' (2 dp whenever there are cents)."""
    return money(x, 0) if abs(x - round(x)) < 1e-9 else money(x, 2)


def approx(s):
    return f"≈ {s}"


def pct(share, dp):
    return f"{share * 100:.{dp}f}%"


def r2(x):
    """Round half up to cents (avoids float-repr surprises such as 2.675)."""
    return float(f"{x + 1e-12:.2f}")


# ================================================================ 05a inputs
# Chipotle Mexican Grill, year ended Dec 31, 2025 ($ thousands). Q4/FY2025 release (Feb 3, 2026,
# SEC 8-K ex. 99.1) and FY2025 Form 10-K. See the write-up's source table.
A_REV = 11_925_601
A_FOOD = 3_527_043          # food, beverage and packaging
A_LABOR = 2_991_680
A_OCC = 624_898             # occupancy
A_OTHER = 1_755_824         # other operating costs (marketing, delivery & card fees, utilities, repairs, tech)
A_OPINC = 1_935_798         # income from operations
A_INTEREST = 73_721         # interest and other income, net
A_TAX = 473_758             # provision for income taxes
A_NI = 1_535_761            # net income
A_DA = 361_382              # depreciation and amortization (inside the HQ row)
A_ORDER = 10                # the viewer's $10

A_HQ = A_REV - A_FOOD - A_LABOR - A_OCC - A_OTHER - A_OPINC   # G&A + D&A + pre-opening + impairment
A_TAXNET = A_TAX - A_INTEREST
A_LINES = [A_FOOD, A_LABOR, A_OCC, A_OTHER, A_HQ, A_TAXNET, A_NI]
A_SHARE = [v / A_REV for v in A_LINES]
A_PCT = [pct(s, 1) for s in A_SHARE]                         # shown to 0.1 pt, the 10-K's precision
A_AMT = [r2(s * A_ORDER) for s in A_SHARE]                   # $10 x exact share, to the cent
A_COSTS = r2(sum(A_AMT[:6]))                                  # the six cost rows, as shown
A_WRONG = r2(A_ORDER - A_AMT[0])                              # the guess: $10 - food = "profit"

# ================================================================ 05b inputs
B_PAY = 3_000               # example take-home paycheck (paid monthly)
B_RULE = [0.50, 0.30, 0.20] # 50/30/20: needs / wants / savings (Warren & Tyagi, All Your Worth, 2005)
B_PIECES = 10               # saw the paycheck into tenths
B_TENTH = B_PAY // B_PIECES                                  # $300
B_COUNT = [round(s * B_PIECES) for s in B_RULE]              # 5, 3, 2 pieces
B_AMT = [n * B_TENTH for n in B_COUNT]                       # 1,500 / 900 / 600
B_DAYS = 30                                                   # a 30-day month (footer)
B_RENT = 1_200                                                # example rent (header input, footer; hook pass 2)
B_RENT_N = B_RENT // B_TENTH                                 # rent eats 4 bricks
B_FOOD = B_AMT[0] - B_RENT                                   # needs left for food + every bill: $300
B_FOOD_N = B_COUNT[0] - B_RENT_N                             # 1 brick
B_FOOD_DAY = B_FOOD // B_DAYS                                # $10 a day
B_PARTS = [B_RENT, B_FOOD, B_AMT[1], B_AMT[2]]              # the four bins, in walk order
B_PARTS_N = [B_RENT_N, B_FOOD_N, B_COUNT[1], B_COUNT[2]]    # bricks per bin: 4 / 1 / 3 / 2
B_PARTS_PCT = [pct(a / B_PAY, 0) for a in B_PARTS]          # 40% / 10% / 30% / 20%

# ================================================================ 05c inputs
# Costco Wholesale, fiscal 2026 = 52 weeks ended Aug 30, 2026 ($ millions). Q4/FY2026 release
# (Sept 24, 2026; 8-K ex. 99.1). See the write-up's source table.
C_TOTAL_REV = 303_154
C_MEMBER = 5_907            # membership fees
C_MERCH = 264_279           # merchandise costs
C_SGA = 27_190              # selling, general and administrative
C_NI = 9_226                # net income (pinned comment only)
C_CART = 100                # the viewer's $100

C_SALES = C_TOTAL_REV - C_MEMBER                              # net sales, 297,247
C_LEFT_M = C_SALES - C_MERCH - C_SGA                         # what the cart leaves Costco, 5,778
C_OPINC = C_TOTAL_REV - C_MERCH - C_SGA                       # 11,685
C_LINES = [C_MERCH, C_SGA, C_LEFT_M]
C_SHARE = [v / C_SALES for v in C_LINES]
C_PCT = [pct(s, 2) for s in C_SHARE]
C_AMT = [r2(s * C_CART) for s in C_SHARE]
C_FEES = r2(C_MEMBER / C_SALES * C_CART)                      # membership fees per $100 of sales
C_REMAIN1 = r2(C_CART - C_AMT[0])                             # hero after the goods row
C_REMAIN2 = r2(C_REMAIN1 - C_AMT[1])                          # hero after the staff row
C_OPS = r2(C_OPINC / C_SALES * C_CART)                        # operating profit per $100 of sales (hero at the verdict)


def millions(v):
    return f"${v:,}M"


# ---------------------------------------------------------- expected strings
A_LABELS_NODIGIT = True   # labels/notes in 05a carry no digits (checked by the walker)
EXPECT = {
    "05a": {
        "header": f"What You're Really Paying For\nWhen You Spend **{money(A_ORDER)}**\nat Chipotle:",
        # fix pass: one footer line (the 2-line footer sat between the hook and the sheet at ~40 px)
        "footer": "Chipotle FY2025 10-K average · not your order",
        # fix pass: the verdict is a lockup (64 px words, the goal on its blue highlighter at ~90 px, the guess struck)
        "verdict.text": f"Chipotle keeps\n**{approx(money(A_AMT[6], 2))}**, not __{money(A_WRONG, 2)}__.",
        "data.total.display": money(A_ORDER, 2),
        **{f"data.parts[{i}].pct": A_PCT[i] for i in range(7)},
        **{f"data.parts[{i}].amount": approx(money(A_AMT[i], 2)) for i in range(7)},
        # one 40 px mono line under the sheet ("check: " + 28 characters fits the 856 px column; "$10.00" broke it
        # onto two lines and the kit dropped the check), worded as the VO says it: "$10 minus $8.71 of costs"
        "data.check": f"{money(A_ORDER)} − {money(A_COSTS, 2)} of costs = {money(r2(A_ORDER - A_COSTS), 2)}",
        "lookOpts.wrongGuess.formula": f"{money(A_ORDER)} − {money(A_AMT[0], 2)}",
        "lookOpts.wrongGuess.result": f"{money(A_WRONG, 2)} profit?",
    },
    "05b": {
        "header": f"Rent **{money(B_RENT)}** on 50/30/20?\nFood and every bill get\nthis much a day:",
        "footer": f"ASSUMES {money(B_PAY)} a month after tax · {money(B_RENT)} rent · {B_DAYS}-day month",
        "verdict.text": f"{money(B_RENT)} rent leaves food and\nevery bill **{money(B_FOOD_DAY)} a day**.",
        "data.total.display": money(B_PAY),
        **{f"data.parts[{i}].pct": B_PARTS_PCT[i] for i in range(4)},
        **{f"data.parts[{i}].amount": money(B_PARTS[i]) for i in range(4)},
        # fix pass: "needs get 5" moved to the needs bracket; the day working ends on the header slot's figure
        "data.parts[0].note": f"{B_RENT_N} × {money(B_TENTH)}",
        "data.parts[1].note": f"{money(B_FOOD)} ÷ {B_DAYS} = **{money(B_FOOD_DAY)}**",
        "data.parts[2].note": f"{B_COUNT[1]} × {money(B_TENTH)} · fun money",
        "data.parts[3].note": f"{B_COUNT[2]} × {money(B_TENTH)} · savings",
        "data.check": " + ".join(money(a) for a in B_PARTS) + f" = {money(sum(B_PARTS))}",
        "lookOpts.tenth.formula": f"{money(B_PAY)} ÷ {B_PIECES}",
        "lookOpts.tenth.display": money(B_TENTH),
        "lookOpts.actions[0].tool": f"÷ {B_PIECES}",
        "lookOpts.actions[0].becomes": f"{B_PIECES} bricks of {money(B_TENTH)}",
        **{f"lookOpts.actions[{i + 1}].tool": f"{B_PARTS_N[i]} × {money(B_TENTH)}" for i in range(4)},
        # the cleaver's label after the food brick lands (the per-day beat), until the next raise
        "lookOpts.actions[2].after": f"÷ {B_DAYS}",
        "lookOpts.payoff.text": f"{money(B_FOOD_DAY)} a day",
        # the header's answer slot ("this much a day: [$10]"), a dashed "$?" from frame 1
        "lookOpts.payoff.slot.text": money(B_FOOD_DAY),
        # the bracket over RENT + FOOD + BILLS: needs = half = 5 bricks
        "lookOpts.needs.text": f"NEEDS {pct(B_RULE[0], 0)} = {B_COUNT[0]} bricks",
    },
    "05c": {
        "header": f"IS COSTCO'S PROFIT\nALL MEMBERSHIP FEES?\nFOLLOW YOUR **{money(C_CART)}** CART:",
        "footer": "Costco FY2026 · company-wide · before tax",
        "verdict.text": f"Not all fees: your cart leaves **{approx(money(C_AMT[2], 2))}**.\nMembership fees: **{approx(money(C_FEES, 2))}**.",
        "data.total.display": money(C_CART, 2),
        "data.check": f"{money(C_AMT[0], 2)} + {money(C_AMT[1], 2)} + {money(C_AMT[2], 2)} = {money(r2(sum(C_AMT)), 2)}",
        **{f"data.parts[{i}].pct": C_PCT[i] for i in range(3)},
        **{f"data.parts[{i}].amount": approx(money(C_AMT[i], 2)) for i in range(3)},
        "lookOpts.remaining[0].display": approx(money(C_REMAIN1, 2)),
        "lookOpts.remaining[1].display": approx(money(C_REMAIN2, 2)),
        "lookOpts.footerSteps[0].text": f"{millions(C_MERCH)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_AMT[0], 2)}",
        "lookOpts.footerSteps[1].text": f"{millions(C_SGA)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_AMT[1], 2)}",
        "lookOpts.footerSteps[2].text": f"{money(C_CART)} − {money(C_AMT[0], 2)} − {money(C_AMT[1], 2)} = {money(C_AMT[2], 2)} before tax",
        # at the check the footer goes back to the assumption line (one working on screen per beat)
        "lookOpts.footerSteps[3].text": "Costco FY2026 · company-wide · before tax",
        "lookOpts.footerSteps[4].text": f"{millions(C_MEMBER)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_FEES, 2)}",
        "lookOpts.footerSteps[5].text": f"cart {millions(C_LEFT_M)} + fees {millions(C_MEMBER)} = {millions(C_OPINC)}",
        # the verdict's climax: the hero rolls ≈ $1.94 -> ≈ $3.93, cart + fees per $100 (half each)
        "lookOpts.heroFinal.display": approx(money(C_OPS, 2)),
        "lookOpts.heroFinal.tag": f"PROFIT PER {money(C_CART)}",
        "lookOpts.bonus.label": f"Membership fees, per {money(C_CART)} of sales",
        "lookOpts.bonus.amount": approx(money(C_FEES, 2)),
    },
}

# numbers spoken in each VO line, in order ("N cents" -> N/100 dollars; number words count too)
VO_NUMBERS = {
    "05a": [
        [A_AMT[0], A_ORDER, A_WRONG], [A_AMT[1]], [A_AMT[2]], [A_AMT[3]], [A_AMT[4]], [A_AMT[5]], [A_AMT[6], A_WRONG],
    ],
    "05b": [
        [B_PIECES, B_TENTH, B_RENT_N], [B_COUNT[0], B_FOOD_N, B_FOOD_DAY],
        [B_COUNT[1], B_AMT[1], B_COUNT[2], B_AMT[2]], [B_PAY], [B_RENT, B_FOOD_DAY],
    ],
    "05c": [
        [C_AMT[0], C_CART], [C_AMT[1]], [C_AMT[2], 0], [C_CART], [C_FEES, C_CART], [C_OPS],
    ],
}

# captions are on, so the VO text is on screen: a spoken number carries "≈" exactly when it is a rounded result.
# Rounded: every per-row amount in 05a and 05c and the membership-fee figure. Exact: the inputs ($10, $100),
# the wrong guess $10 − $2.96 = $7.04 and the costs $8.71 (both exact on the shown numbers), and all of 05b
# ($300 ÷ 30 = $10 a day is exact in the footer's 30-day month).
VO_ROUNDED = {
    "05a": set(A_AMT),
    "05b": set(),
    "05c": set(C_AMT) | {C_FEES, C_OPS},
}

# where each beat should sit: (vo line, token) -> t lands EARLY..LATE around that spoken token;
# (vo line, None) -> t on the line start; "frame1" -> on the sheet at t <= 0; "silent" -> a beat no VO line voices
# (05a's check line types between the goal landing and the verdict); (vo line, token, "land") -> 05c: the cut sits
# between the line start and the spoken token, and the kit's LANDING (see landing_05c) on the spoken token
ANCHORS = {
    "05a": {
        "data.parts[0].t": (0, "$2.96"), "data.parts[1].t": (1, "$2.51"), "data.parts[2].t": (2, "52"),
        "data.parts[3].t": (3, "$1.47"), "data.parts[4].t": (4, "91"), "data.parts[5].t": (5, "34"),
        "data.parts[6].t": (6, "$1.29"),
        # fix pass: the spoken "Check: ..." line is cut; the check types silently once profit has landed
        "data.checkT": "silent",
        # the verdict lockup lands on "Not $7.04" (≈ $1.29 on its highlighter, the guess struck)
        "verdict.t": (6, "Not"),
        # the wrong guess is on the sheet at frame 1 (R5: the hook); vo[0] voices it, inside its first line
        "lookOpts.wrongGuess.t": "frame1", "lookOpts.wrongGuess.strikeT": (1, None),
        "sfx[0].t": (1, None),
        # assembly pass: the hook's two numbers nudge as vo[0] says them, and each row activates (pointer, accent %,
        # the profit row's % unmasks) as its VO line names it; its amount still lands on the spoken number
        "lookOpts.bumps[0].t": (0, "$10"), "lookOpts.bumps[1].t": (0, "$7.04"),
        "lookOpts.activate[1]": (1, "Crew"), "lookOpts.activate[2]": (2, None), "lookOpts.activate[3]": (3, None),
        "lookOpts.activate[4]": (4, None), "lookOpts.activate[5]": (5, None), "lookOpts.activate[6]": (6, None),
    },
    "05b": {
        # the cleaver comes out on "Ten", the slab slams into 10 bricks on "$300", 4 tumble into RENT on "four",
        # the lone brick lands in FOOD + BILLS on "one"
        "lookOpts.actions[0].t": (0, "Ten"), "lookOpts.tenth.t": (0, "$300"), "data.parts[0].t": (0, "four"),
        "data.parts[1].t": (1, "one"), "data.parts[2].t": (2, "$900"), "data.parts[3].t": (2, "$600"),
        # fix pass: the check line leads its VO line by up to 0.6 s (the stage above it had emptied after the hop)
        "data.checkT": (3, None, "lead"), "verdict.t": (4, None),
        # fix pass: the needs bracket draws on "Needs"; "$10" stamps into the header's answer slot on the spoken "$10"
        "lookOpts.needs.t": (1, "Needs"), "lookOpts.payoff.slot.t": (1, "$10"),
        # the closing gold slab "FOOD + EVERY BILL · $10 a day" re-slams on the spoken "$10" of the verdict line
        "lookOpts.payoff.t": (4, "$10"),
    },
    "05c": {
        "data.parts[0].t": (0, "$88.91", "land"), "data.parts[1].t": (1, "$9.15", "land"), "data.parts[2].t": (2, "$1.94", "land"),
        "data.checkT": (3, None), "verdict.t": (5, None),
        # each footer working lands with its row (not at the cut, so it never prints the figure first)
        "lookOpts.footerSteps[0].t": "land0", "lookOpts.footerSteps[1].t": "land1", "lookOpts.footerSteps[2].t": "land2",
        "lookOpts.footerSteps[3].t": (3, None), "lookOpts.footerSteps[4].t": (4, "$1.99"), "lookOpts.footerSteps[5].t": (5, None),
        # the hero's LEFT counter rolls with the row it subtracts: ≈ $11.09 with row 1, ≈ $1.94 as ≈ $9.15 lands
        "lookOpts.remaining[0].t": "sync0", "lookOpts.remaining[1].t": "sync1",
        # the verdict's climax: the hero rolls to ≈ $3.93 PROFIT PER $100 from the line start, landing on "$3.93"
        "lookOpts.heroFinal.t": (5, "$3.93", "hero"),
        # the membership row is the header's contender: on the sheet, landed, at frame 1; vo[4] voices it
        "lookOpts.bonus.t": "frame1",
        # ...and the pointer and the label stack return to it when vo[4] names it ("Membership fees: ...")
        "lookOpts.bonus.focusT": (4, None),
    },
}

# the scoreboard kit's timing (formats/split-sheet.js): a part's cut, then CUT, then its roll; lookOpts.rolls
# overrides a roll; heroFinal starts 0.04 s after its t and rolls 1.1 s
SB_CUT, SB_HERO_ROLL = 0.18, 1.1


def landing_05c(spec):
    parts = spec["data"]["parts"]
    lo = spec.get("lookOpts", {})
    times = [p["t"] for p in parts]
    intro = lo.get("intro") is True or (lo.get("intro") is not False and times[0] >= 0.5)
    rolls = lo.get("rolls") or []
    out = []
    for i, p in enumerate(parts):
        first = i == 0 and not intro
        cut = min(times[0], 0) if first else times[i]
        big = p.get("tone") == "goal" or i == len(parts) - 1
        nxt = times[i + 1] if i + 1 < len(parts) else float("inf")
        given = rolls[i] if i < len(rolls) and rolls[i] else None
        roll = given if given else max(0.45, min(1.35 if big else 1.0, nxt - cut - SB_CUT - 0.35))
        start = -0.3 if first else cut + SB_CUT
        out.append(round(start + roll, 4))
    return out


# lookOpts.maskPct: the goal row's % reads "?" until its beat (else it answers the header at frame 1).
# 05c masks every row: on a $100 base each % IS its dollar amount, so no cart dollar is printed at frame 1.
MASK = {"05a": [6], "05b": None, "05c": [0, 1, 2]}

# the header's one $ figure (R2): the input the viewer holds up against their own. Default: data.total.display.
# 05b's is the rent; its Rent row repeats that input, so it is exempt from "no result in the header".
HEADER_INPUT = {"05b": money(B_RENT)}
INPUT_ROWS = {"05b": [0]}

# the first payoff (a computed dollar figure on screen): path of the beat that carries it
FIRST_PAYOFF = {"05a": "data.parts[0].t", "05b": "lookOpts.tenth.t", "05c": "data.parts[0].t"}

# results that must carry "≈" (rounded) vs exact
APPROX_AMOUNTS = {"05a": True, "05b": False, "05c": True}

# ------------------------------------------------------------ VO helpers
NUM_WORDS = {"zero": 0, "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
             "eight": 8, "nine": 9, "ten": 10}
NUM_TOKEN = re.compile(r"(\$?)(\d[\d,]*)(?:\.(\d+))?(%)?")


def vo_numbers(text, with_approx=False):
    """Numbers spoken in a VO line, in order: digits ('N cents' -> N/100) and number words.
    with_approx=True returns (value, preceded by "≈ ") pairs."""
    out = []
    pattern = r"(\$?\d[\d,]*(?:\.\d+)?)%?(\s+cents)?|\b(" + "|".join(NUM_WORDS) + r")\b"
    for m in re.finditer(pattern, text, flags=re.IGNORECASE):
        if m.group(3):
            v = float(NUM_WORDS[m.group(3).lower()])
        else:
            v = float(m.group(1).lstrip("$").replace(",", ""))
            v = v / 100 if m.group(2) else v
        ap = text[:m.start()].endswith("≈ ")
        out.append((v, ap) if with_approx else v)
    return out


def words_int(n):
    if n < 100:
        return 1                       # "thirty", "ninety-one"
    if n < 10_000:
        return 2                       # "three hundred", "fifteen hundred", "three thousand"
    k, r = divmod(n, 1000)
    return words_int(k) + 1 + (0 if r == 0 else words_int(r))


def token_words(tok):
    core = tok.strip(".,:;?!'\"()")
    if not core:
        return 0
    m = NUM_TOKEN.fullmatch(core)
    if not m:
        return 1
    dollar, ip, dec, per = m.groups()
    n = int(ip.replace(",", ""))
    if per:
        return words_int(n) + 1                    # "two percent"
    if dec is None:
        return words_int(n) + (1 if dollar else 0)  # "three hundred dollars" (conservative)
    if dollar:
        return words_int(n) + 1                    # "$2.96" two ninety-six; "$88.91" eighty-eight ninety-one
    return words_int(n) + 1 + len(dec)


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
    return None


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


def get(spec, path):
    node = spec
    for part in re.findall(r"[^.\[\]]+|\[\d+\]", path):
        node = node[int(part[1:-1])] if part.startswith("[") else node[part]
    return node


SKIP_PATHS = re.compile(r"^(id|vo\[\d+\]\.text)$")


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

    # 2. contract shape (FORMATS.md §5 + common fields)
    eq(key, "id = file stem", spec["id"], FILES[key].stem)
    eq(key, "look", spec["look"], LOOKS[key])
    eq(key, "format", spec["format"], "split-sheet")
    eq(key, "fps", spec["fps"], 30)
    eq(key, "captions on", spec.get("captions"), True)
    d = spec["data"]
    parts = d["parts"]
    record(key, "3-7 parts", len(parts), "3..7", 3 <= len(parts) <= 7)
    for k in ("label", "display", "value"):
        record(key, f"data.total.{k} present", k in d["total"], True, k in d["total"])
    total_val = d["total"]["value"]
    eq(key, "total.value = total.display", float(total_val),
       float(d["total"]["display"].lstrip("$").replace(",", "")))
    for i, p in enumerate(parts):
        for k in ("t", "label", "pct", "amount"):
            record(key, f"parts[{i}].{k} present", k in p, True, k in p)
        share_shown = float(p["pct"].rstrip("%")) / 100
        record(key, f"parts[{i}].share = pct/100", p.get("share"), round(share_shown, 6),
               abs(p.get("share", -1) - share_shown) < 1e-9)
        record(key, f"parts[{i}] tone valid", p.get("tone", "neutral"), "good|bad|goal|neutral",
               p.get("tone", "neutral") in ("good", "bad", "goal", "neutral"))
        if i:
            record(key, f"parts[{i}] in walk order", p["t"], f"> {parts[i - 1]['t']}", p["t"] > parts[i - 1]["t"])

    # 3. the split adds up, on screen (shown numbers) and in the exact shares
    shown_pcts = [float(p["pct"].rstrip("%")) for p in parts]
    shown_amts = [float(p["amount"].lstrip("≈ $").replace(",", "")) for p in parts]
    record(key, "shown % add to 100", round(sum(shown_pcts), 6), 100, abs(sum(shown_pcts) - 100) < 1e-9)
    record(key, "shown amounts add to the total", round(sum(shown_amts), 2), total_val,
           abs(sum(shown_amts) - total_val) < 1e-9)
    for i, (sp, sa) in enumerate(zip(shown_pcts, shown_amts)):
        record(key, f"parts[{i}] amount = pct × total (to the cent)", sa, r2(sp / 100 * total_val),
               abs(sa - r2(sp / 100 * total_val)) < 0.0051)
    # ≈ on every rounded result, never on an exact one
    for i, p in enumerate(parts):
        want = APPROX_AMOUNTS[key]
        record(key, f"parts[{i}].amount ≈ marker", p["amount"][:1] == "≈", want, (p["amount"][:1] == "≈") == want)

    # 4. hook rules
    plain = spec["header"].replace("**", "").replace("__", "")
    words = len(plain.split())
    record(key, "R8 header ≤ 15 words", words, "≤ 15", words <= 15)
    dollars = [x.rstrip(".,") for x in re.findall(r"\$[\d,.]+", plain)]
    h_in = HEADER_INPUT.get(key, d["total"]["display"].split(".")[0])
    record(key, "R2 one $ figure in header (the input)", dollars, [h_in], dollars == [h_in])
    inputs = INPUT_ROWS.get(key, [])
    for j in inputs:
        eq(key, f"parts[{j}] is the header's input", parts[j]["amount"], h_in)
    results = {p["amount"].lstrip("≈ ") for j, p in enumerate(parts) if j not in inputs}
    bonus = spec.get("lookOpts", {}).get("bonus")
    if bonus:
        results.add(bonus["amount"].lstrip("≈ "))
    record(key, "R2 no result in header", [r for r in results if r in plain], [], not any(r in plain for r in results))
    record(key, "R1 header + $ number at t = 0", bool(dollars) and bool(re.search(r"\d", d["total"]["display"])),
           True, bool(dollars))
    record(key, "header ≤ 3 lines", spec["header"].count("\n") + 1, "≤ 3", spec["header"].count("\n") <= 2)

    # 5. VO numbers, line by line
    vo = spec["vo"]
    eq(key, "VO line count", len(vo), len(VO_NUMBERS[key]))
    for i, (line, want) in enumerate(zip(vo, VO_NUMBERS[key])):
        got = vo_numbers(line["text"])
        ok = len(got) == len(want) and all(abs(g - w) < 1e-9 for g, w in zip(got, want))
        record(key, f"vo[{i}] numbers", got, [float(w) for w in want], ok)
        # captions show the VO: "≈" on every rounded result and on no exact figure
        for v, ap in vo_numbers(line["text"], with_approx=True):
            rounded = any(abs(v - r) < 1e-9 for r in VO_ROUNDED[key])
            record(key, f"vo[{i}] '≈' on {v:g} iff rounded", ap, rounded, ap == rounded)

    # 6. VO pacing, overlaps, duration
    for i, line in enumerate(vo):
        n = spoken_words(line["text"])
        need = n / WPS
        record(key, f"vo[{i}] d fits {n} words @2.6/s", line["d"], f"{need:.2f}..{need + 1.0:.2f}",
               need - 1e-9 <= line["d"] <= need + 1.0)
        if i + 1 < len(vo):
            end = round(line["t"] + line["d"], 3)
            record(key, f"vo[{i}] ends before vo[{i + 1}]", end, f"≤ {vo[i + 1]['t']}", end <= vo[i + 1]["t"] + 1e-9)
    eq(key, "vo[0] starts at 0.0", vo[0]["t"], 0.0)
    dur = spec["duration"]
    last_end = round(vo[-1]["t"] + vo[-1]["d"], 3)
    record(key, "duration in 20-40 s lane", dur, LANE, LANE[0] <= dur <= LANE[1])
    record(key, "hold = duration − last VO end", d["hold"], round(dur - last_end, 3), abs(d["hold"] - (dur - last_end)) < 1e-9)
    record(key, "≥ 2 s hold on the finished sheet", round(dur - last_end, 2), "≥ 2.0", dur - last_end >= 2.0 - 1e-9)

    # 7. beat timing: every beat at the moment the VO says it
    lands = landing_05c(spec) if key == "05c" else None
    tok_dur = lambda tok: token_words(tok) / WPS
    for path, anchor in ANCHORS[key].items():
        try:
            beat = get(spec, path)
        except (KeyError, IndexError, TypeError):
            record(key, f"{path} present (anchored beat)", "(absent)", "a time", False)
            continue
        if anchor == "frame1":
            record(key, f"{path} on the sheet at frame 1", beat, "≤ 0 (kit: typed + landed at t = 0)", beat <= 0)
            continue
        if anchor == "silent":
            lo_, hi_ = d["parts"][-1]["t"], spec["verdict"]["t"]
            record(key, f"{path} silent: after the goal lands, before the verdict", beat, f"{lo_}..{hi_}", lo_ < beat < hi_)
            continue
        if isinstance(anchor, str) and anchor.startswith("land"):
            i = int(anchor[4:])
            record(key, f"{path} = row {i}'s landing (kit)", beat, f"{lands[i]:.2f}", abs(beat - lands[i]) <= 0.02)
            continue
        if isinstance(anchor, str) and anchor.startswith("sync"):
            i = int(anchor[4:])
            record(key, f"{path} rolls with row {i} (same t)", beat, d["parts"][i]["t"], abs(beat - d["parts"][i]["t"]) < 1e-9)
            continue
        line, tok = anchor[0], anchor[1]
        kind = anchor[2] if len(anchor) > 2 else None
        est = anchor_time(vo, line, tok)
        if est is None:
            record(key, f"{path} at VO mention", beat, f"VO line {line} never says {tok!r}", False)
        elif kind in ("land", "hero"):
            # the cut (or the hero's roll start) sits between the line start and the spoken number...
            lo_, hi_ = vo[line]["t"] - START_TOL, est
            record(key, f"{path} cut between vo[{line}] start and '{tok}'", beat, f"{lo_:.2f}..{hi_:.2f}", lo_ - 1e-9 <= beat <= hi_ + 1e-9)
            # ...and the number LANDS while it is being said (kit roll included), never after
            land = lands[int(re.search(r"\[(\d+)\]", path).group(1))] if kind == "land" else round(beat + 0.04 + SB_HERO_ROLL, 4)
            lo2, hi2 = est - 0.15, est + tok_dur(tok) + 0.15
            record(key, f"{path} lands on the spoken '{tok}' (vo[{line}])", land, f"{lo2:.2f}..{hi2:.2f}", lo2 - 1e-9 <= land <= hi2 + 1e-9)
        elif tok is None and kind == "lead":
            record(key, f"{path} leads vo[{line}] by ≤ 0.6 s", beat, f"{est - 0.6:.2f}..{est:.2f}", est - 0.6 - 1e-9 <= beat <= est + START_TOL)
        elif tok is None:
            record(key, f"{path} on vo[{line}] start", beat, f"{est:.2f}", abs(beat - est) <= START_TOL)
        else:
            lo_, hi_ = max(vo[line]["t"], est - EARLY), est + LATE
            record(key, f"{path} at '{tok}' (vo[{line}])", beat, f"{lo_:.2f}..{hi_:.2f}", lo_ - 1e-9 <= beat <= hi_ + 1e-9)
    timed = [p for p, _ in walk(spec) if re.search(r"(^|\.)(t|checkT|strikeT)$", p) and not p.startswith("vo[")]
    for p in timed:
        record(key, f"{p} anchored", p, "in ANCHORS", p in ANCHORS[key])
    # masked goal %: only goal rows, and the header's answer is not printed at frame 1 otherwise
    mask = spec.get("lookOpts", {}).get("maskPct")
    eq(key, "lookOpts.maskPct", mask, MASK[key])
    if mask and sorted(mask) == list(range(len(parts))):
        record(key, "maskPct masks every row (no row's dollars printed at frame 1)", mask, "all rows", True)
    else:
        for j in mask or []:
            record(key, f"maskPct[{j}] is the goal row", parts[j].get("tone"), "goal", parts[j].get("tone") == "goal")
    goal = [j for j, p in enumerate(parts) if p.get("tone") == "goal"]
    if mask:
        record(key, "the goal row is masked", goal, f"⊂ {mask}", all(j in mask for j in goal))
    wg = spec.get("lookOpts", {}).get("wrongGuess")
    if wg:
        res = float(re.search(r"[\d.]+", wg["result"]).group())
        said = vo_numbers(vo[0]["text"])
        record(key, "wrong guess voiced in vo[0] (it is on screen from frame 1)", said, f"contains {res}",
               any(abs(x - res) < 1e-9 for x in said))
    fp = get(spec, FIRST_PAYOFF[key])
    record(key, "R10 first payoff ≤ 3 s", fp, "≤ 3.0", fp <= 3.0)
    for s in spec.get("sfx", []):
        record(key, f"sfx {s['kind']} inside duration", s["t"], f"< {dur}", 0 <= s["t"] < dur)
    record(key, "verdict after the last part", spec["verdict"]["t"], f"≥ {parts[-1]['t']}",
           spec["verdict"]["t"] >= parts[-1]["t"])

    # labels that carry a fact (notes can be hidden by a kit's layout solver, so the label must be right alone)
    if key == "05a":
        wg = spec["lookOpts"]["wrongGuess"]
        act = spec["lookOpts"]["activate"]
        record(key, "each row activates before its amount lands, after the previous one landed",
               act, "parts[i-1].t < activate[i] ≤ parts[i].t",
               all(parts[i - 1]["t"] < act[i] <= parts[i]["t"] for i in range(1, len(parts))))
        # fix pass: row 1 lights a beat after frame 1, so frame 1's only loud figures are the $10.00 and the guess
        record(key, "row 1 activates after frame 1, before its amount (0 < activate[0] < parts[0].t)", act[0],
               f"0..{parts[0]['t']}", act[0] is not None and 0 < act[0] < parts[0]["t"])
        lo5a = spec["lookOpts"]
        record(key, "the payoff is the biggest figure: goal amount scaled ≥ 1.2x, verdict lockup on", (lo5a.get("goalScale"), lo5a.get("bigVerdict")),
               "(≥ 1.2, True)", (lo5a.get("goalScale") or 0) >= 1.2 and lo5a.get("bigVerdict") is True)
        record(key, "check line types after profit lands and before the verdict", d["checkT"],
               f"{parts[6]['t']}..{spec['verdict']['t']}", parts[6]["t"] < d["checkT"] < spec["verdict"]["t"])
        record(key, "bumps hit the frame-1 hook figures ($10 total, the $7.04 guess)",
               [b["at"] for b in spec["lookOpts"]["bumps"]], ["total", "guess"],
               [b["at"] for b in spec["lookOpts"]["bumps"]] == ["total", "guess"])
        record(key, "struck guess stays until the check line replaces it (strikeT < until ≤ checkT)",
               wg.get("until"), f"{wg['strikeT']}..{d['checkT']}", wg["strikeT"] < wg.get("until", -1) <= d["checkT"])
        lab = parts[5]["label"].lower()
        record(key, "row 6 label says the tax is net of interest (3.4% is not the provision, 4.0%)", parts[5]["label"],
               "mentions tax and interest", "tax" in lab and "interest" in lab)
        record(key, "VO for row 6 says it is net of interest", vo[5]["text"], "mentions interest", "interest" in vo[5]["text"].lower())
    if key == "05b":
        ten = spec["lookOpts"]["tenth"]
        eq(key, "tenth.count = pieces", ten["count"], B_PIECES)
        whole = [p["share"] * ten["count"] for p in parts]
        record(key, "every share × count is whole (else the kit drops the bricks)", [round(w, 6) for w in whole],
               "whole numbers", all(abs(w - round(w)) < 1e-9 for w in whole))
        eq(key, "bricks per bin = share × count", [round(w) for w in whole], B_PARTS_N)
        eq(key, "envelopes (bin names)", spec["lookOpts"]["envelopes"], ["RENT", "FOOD + BILLS", "WANTS", "SAVINGS"])
        slot = spec["lookOpts"]["payoff"]["slot"]
        record(key, "header ends on 'a day:' and its answer slot holds the per-day figure", (spec["header"][-6:], slot["text"]),
               ("a day:", money(B_FOOD_DAY)), spec["header"].endswith("a day:") and slot["text"] == money(B_FOOD_DAY))
        record(key, "the slot fills on the beat the lone brick lands (after it, before vo[2])", slot["t"],
               f"{parts[1]['t']}..{vo[2]['t']}", parts[1]["t"] <= slot["t"] < vo[2]["t"])
        record(key, "the goal row's working answers the slot ($300 ÷ 30 = $10)", parts[1]["note"],
               f"ends '= **{money(B_FOOD_DAY)}**'", parts[1]["note"].endswith(f"= **{money(B_FOOD_DAY)}**"))
        nd = spec["lookOpts"]["needs"]
        record(key, "needs bracket spans RENT + FOOD + BILLS = 5 bricks = 50%", (nd["parts"], B_PARTS_N[0] + B_PARTS_N[1]),
               "([0, 1], 5)", nd["parts"] == [0, 1] and B_PARTS_N[0] + B_PARTS_N[1] == B_COUNT[0] and B_RULE[0] == 0.5)
        pay = spec["lookOpts"]["payoff"]
        record(key, "payoff slab = the header's answer in its unit, after the verdict", (pay["text"], pay["t"]),
               f"'a day', ≥ {spec['verdict']['t']}", "a day" in pay["text"] and pay["t"] >= spec["verdict"]["t"])
    if key == "05c":
        txt = spec["verdict"]["text"].lower()
        record(key, "verdict does not say Costco 'keeps' ≈ $1.94 (it keeps ≈ $3.93 before tax incl. fees)",
               spec["verdict"]["text"], "no 'keep'", "keep" not in txt)
        record(key, "header does not say 'keep' either (the body shows what the cart leaves)", spec["header"],
               "no 'keep'", "keep" not in spec["header"].lower())
        land2 = landing_05c(spec)[2]
        cur = [x["text"] for x in spec["lookOpts"]["footerSteps"] if x["t"] <= land2 + 0.02]
        record(key, "'before tax' is on screen when ≈ $1.94 lands", cur[-1] if cur else "", "contains 'before tax'",
               bool(cur) and "before tax" in cur[-1])
        rems = spec["lookOpts"]["remaining"]
        record(key, "hero LEFT = $100 − the rows landed so far", [r["display"] for r in rems],
               [approx(money(C_REMAIN1, 2)), approx(money(C_REMAIN2, 2))], [r["t"] for r in rems] == [parts[0]["t"], parts[1]["t"]])
        hf = spec["lookOpts"].get("heroFinal") or {"display": "(absent)"}
        record(key, "verdict hero = cart + fees per $100, on the shown rows too (1.94 + 1.99)", hf["display"],
               approx(money(r2(C_AMT[2] + C_FEES), 2)), hf["display"] == approx(money(r2(C_AMT[2] + C_FEES), 2)) == approx(money(C_OPS, 2)))
        record(key, "the hero carries a tag in remaining mode (never unlabelled)", spec["lookOpts"].get("heroTag"), "LEFT",
               spec["lookOpts"].get("heroTag") == "LEFT")
        record(key, "one working per beat: the label stack drops its formula (labelWorking false)", spec["lookOpts"].get("labelWorking"),
               False, spec["lookOpts"].get("labelWorking") is False)
        record(key, "membership row on the sheet at frame 1 = the header's contender", spec["lookOpts"]["bonus"]["t"],
               "≤ 0", spec["lookOpts"]["bonus"]["t"] <= 0)


# ------------------------------------------------------------ facts and claims
def facts():
    # 05a: Chipotle identities and the reported percentages
    eq("05a", "net income = op. income + interest − tax ($K)", A_OPINC + A_INTEREST - A_TAX, A_NI)
    eq("05a", "reported line % (10-K): food, labor, occupancy, other",
       [pct(v / A_REV, 1) for v in (A_FOOD, A_LABOR, A_OCC, A_OTHER)], ["29.6%", "25.1%", "5.2%", "14.7%"])
    eq("05a", "reported op. margin 16.2%", pct(A_OPINC / A_REV, 1), "16.2%")
    eq("05a", "reported restaurant-level margin 25.4%",
       pct((A_REV - A_FOOD - A_LABOR - A_OCC - A_OTHER) / A_REV, 1), "25.4%")
    eq("05a", "reported tax 4.0% · interest 0.6%", [pct(A_TAX / A_REV, 1), pct(A_INTEREST / A_REV, 1)], ["4.0%", "0.6%"])
    eq("05a", "tax alone per $10 would be ≈ $0.40 (so row 6 must say 'minus interest')", money(r2(A_TAX / A_REV * 10), 2), "$0.40")
    eq("05a", "reported effective tax rate 23.6%", pct(A_TAX / (A_OPINC + A_INTEREST), 1), "23.6%")
    eq("05a", "net income ≈ $1.54B (release)", round(A_NI / 1e6, 2), 1.54)
    record("05a", "HQ row (G&A+D&A+pre-opening+impairment) ≥ D&A", A_HQ, f"≥ {A_DA}", A_HQ >= A_DA)
    eq("05a", "exact shares add to 1", round(sum(A_SHARE), 12), 1.0)
    eq("05a", "rounded cents add to $10.00 (no plug)", round(sum(A_AMT), 2), 10.0)
    eq("05a", "shown 0.1-pt shares add to 100.0%", round(sum(float(p[:-1]) for p in A_PCT), 6), 100.0)
    record("05a", "crew vs profit ('almost twice', caption)", round(A_LABOR / A_NI, 2), "1.9..2.0",
           1.9 <= A_LABOR / A_NI < 2.0)
    record("05a", "profit < food (pinned comment)", A_AMT[6], f"< {A_AMT[0]}", A_AMT[6] < A_AMT[0])
    eq("05a", "five middle lines (write-up: ≈ $5.75)", money(r2(sum(A_AMT[1:6])), 2), "$5.75")
    eq("05a", "food + middle lines + profit = $10.00", round(A_AMT[0] + sum(A_AMT[1:6]) + A_AMT[6], 2), 10.0)

    # 05b: the rule and the claims
    eq("05b", "50/30/20 shares add to 1", sum(B_RULE), 1.0)
    eq("05b", "pieces add to 10", sum(B_COUNT), B_PIECES)
    eq("05b", "amounts add to the paycheck", sum(B_AMT), B_PAY)
    eq("05b", "every amount exact (no rounding)", [s * B_PAY for s in B_RULE], [float(a) for a in B_AMT])
    eq("05b", "rent is a whole number of bricks", B_RENT % B_TENTH, 0)
    eq("05b", "needs = half = 5 bricks (VO 'Needs get five')", (B_AMT[0], B_COUNT[0]), (B_PAY // 2, 5))
    eq("05b", "food + every bill = needs − rent = 0.5 × 3,000 − 1,200", B_FOOD, 300)
    eq("05b", "$300 ÷ 30 exact", B_FOOD % B_DAYS, 0)
    eq("05b", "food + every bill a day", B_FOOD_DAY, 10)
    eq("05b", "bins add to the paycheck (4 + 1 + 3 + 2 bricks)", (sum(B_PARTS), sum(B_PARTS_N)), (B_PAY, B_PIECES))
    eq("05b", "shown % add to 100 (40 + 10 + 30 + 20)", sum(int(x[:-1]) for x in B_PARTS_PCT), 100)
    record("05b", "rent under half the take-home (the belief: 'under half is fine')", B_RENT, f"< {B_PAY // 2}",
           B_RENT < B_PAY // 2)
    record("05b", "≈ $10 a day still true in an average 30.44-day month", round(B_FOOD / (365.25 / 12), 2),
           "rounds to $10", round(B_FOOD / (365.25 / 12)) == B_FOOD_DAY)
    # pinned comment: other rents on the same $3,000, and the same $1,200 rent on $4,000
    for rent, want in ((1_000, "$16.67"), (1_400, "$3.33"), (1_500, "$0.00")):
        eq("05b", f"pinned: ${rent:,} rent → food + bills a day", money((B_AMT[0] - rent) / B_DAYS, 2), want)
    eq("05b", "pinned: $4,000 take-home, $1,200 rent → $800 = $26.67 a day",
       (4_000 // 2 - B_RENT, money((4_000 // 2 - B_RENT) / B_DAYS, 2)), (800, "$26.67"))

    # 05c: Costco identities and claims
    eq("05c", "net sales = total revenue − membership ($M)", C_SALES, 297_247)
    eq("05c", "net sales ≈ $297.2B (release)", round(C_SALES / 1000, 1), 297.2)
    eq("05c", "op. income ≈ $11.69B (reported)", round(C_OPINC / 1000, 2), 11.69)
    eq("05c", "op. income = cart's leftover + membership fees", C_LEFT_M + C_MEMBER, C_OPINC)
    eq("05c", "rounded cents add to $100.00 (no plug)", round(sum(C_AMT), 2), 100.0)
    record("05c", "'less than 2% of your cart'", round(C_SHARE[2] * 100, 4), "< 2", C_SHARE[2] < 0.02)
    record("05c", "membership fees > what the cart leaves", (C_MEMBER, C_LEFT_M), "fees bigger", C_MEMBER > C_LEFT_M)
    record("05c", "fees ≈ half of operating income (caption)", round(C_MEMBER / C_OPINC, 3), "0.45..0.55",
           0.45 <= C_MEMBER / C_OPINC <= 0.55)
    record("05c", "header 'all membership fees?' → no: the cart leaves more than zero (VO 'Not zero.')",
           (C_LEFT_M, C_AMT[2]), "> 0", C_LEFT_M > 0 and C_AMT[2] > 0)
    record("05c", "'about half each' (caption): cart and fees both 45-55% of operating income",
           (round(C_LEFT_M / C_OPINC, 3), round(C_MEMBER / C_OPINC, 3)), "0.45..0.55 each",
           all(0.45 <= x / C_OPINC <= 0.55 for x in (C_LEFT_M, C_MEMBER)))
    record("05c", "not all fees after tax either: fees < net income (md: 64%)", round(C_MEMBER / C_NI, 3), "< 1 (0.640)",
           C_MEMBER < C_NI and round(C_MEMBER / C_NI, 3) == 0.640)
    record("05c", "'your cart makes almost half' (VO): cart share of operating profit 45-50%, exact and shown",
           (round(C_LEFT_M / C_OPINC, 3), round(C_AMT[2] / C_OPS, 3)), "0.45..0.50",
           all(0.45 <= x < 0.50 for x in (C_LEFT_M / C_OPINC, C_AMT[2] / C_OPS)))
    record("05c", "'your cart makes almost as much' (caption): cart / fees 95-100%, exact and shown",
           (round(C_LEFT_M / C_MEMBER, 3), round(C_AMT[2] / C_FEES, 3)), "0.95..1.0",
           all(0.95 <= x < 1.0 for x in (C_LEFT_M / C_MEMBER, C_AMT[2] / C_FEES)))
    record("05c", "per-$100 fees beat per-$100 leftover after rounding", (C_FEES, C_AMT[2]), "fees bigger", C_FEES > C_AMT[2])
    # FY2025 robustness (release: net sales $269.9B, membership $5.323B, merch $239.886B, SG&A $24.966B)
    lo, hi = 269_850 - 239_886 - 24_966, 269_950 - 239_886 - 24_966
    record("05c", "FY2025 too: fees $5,323M > cart's leftover", f"{lo:,}..{hi:,}", "< 5,323", hi < 5_323)
    eq("05c", "net income per $100 of sales (pinned comment)", money(r2(C_NI / C_SALES * 100), 2), "$3.10")
    eq("05c", "operating income per $100 of sales, cart + fees (the verdict's hero; why the verdict avoids 'keeps')",
       money(r2(C_OPINC / C_SALES * 100), 2), "$3.93")
    eq("05c", "≈ $3.93 = ≈ $1.94 + ≈ $1.99 on the shown rows (no plug)", round(C_AMT[2] + C_FEES, 2), C_OPS)
    # footer working uses the exact millions; the rounded inputs still give the same cents
    for v, a in ((C_MERCH, C_AMT[0]), (C_SGA, C_AMT[1]), (C_MEMBER, C_FEES)):
        eq("05c", f"{millions(v)} in $B (2 dp) gives the same cents", r2(round(v / 1000, 2) / round(C_SALES / 1000, 2) * 100), a)


def main():
    for key, path in FILES.items():
        try:
            spec = json.loads(path.read_text(encoding="utf-8"))
        except Exception as e:  # noqa: BLE001
            record(key, f"load {path.name}", repr(e), "valid JSON", False)
            continue
        check_spec(key, spec)
    facts()

    # computed table of every on-screen number, for the write-up
    print("Computed values")
    print("  05a  $10 at Chipotle (FY2025, $K)")
    names = ["food, drinks & packaging", "crew pay", "rent", "ads, delivery & card fees",
             "HQ, wear & tear, new stores", "income tax − interest", "profit"]
    for n, v, s, p, a in zip(names, A_LINES, A_SHARE, A_PCT, A_AMT):
        print(f"       {n:30s} {v:>11,}  {s * 100:8.4f}%  -> {p:>6}  ${s * 10:.4f} -> ≈ ${a:.2f}")
    print(f"       costs shown ${A_COSTS:.2f}; guess $10 − ${A_AMT[0]:.2f} = ${A_WRONG:.2f}")
    print(f"  05b  ${B_PAY:,} ÷ {B_PIECES} = ${B_TENTH}; rule pieces {B_COUNT} -> {B_AMT}; rent ${B_RENT:,} = {B_RENT_N} bricks; "
          f"food + bills ${B_FOOD} = {B_FOOD_N} brick = ${B_FOOD_DAY} a day; bins {B_PARTS} ({B_PARTS_PCT})")
    print("  05c  $100 at Costco (FY2026, $M)")
    for n, v, s, p, a in zip(["merchandise costs", "SG&A", "left (op. margin on sales)"], C_LINES, C_SHARE, C_PCT, C_AMT):
        print(f"       {n:30s} {v:>11,}  {s * 100:8.4f}%  -> {p:>7}  ≈ ${a:.2f}")
    print(f"       membership fees {C_MEMBER:,} -> ≈ ${C_FEES:.2f} per $100; remaining hero ${C_REMAIN1:.2f} -> ${C_REMAIN2:.2f}")
    print(f"       operating income {C_OPINC:,} = cart {C_LEFT_M:,} ({C_LEFT_M / C_OPINC:.1%}) + fees {C_MEMBER:,} ({C_MEMBER / C_OPINC:.1%})")
    print()

    w = [5, 56, 44, 44]
    print(f"{'id':<{w[0]}} {'check':<{w[1]}} {'spec':<{w[2]}} {'computed':<{w[3]}} ok")
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
