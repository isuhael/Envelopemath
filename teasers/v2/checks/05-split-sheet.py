#!/usr/bin/env python3
"""Math + timing check for format 5, "split-sheet" (teasers 05a, 05b, 05c).

1. Recomputes every on-screen number from its inputs (constants below; sources in
   teasers/v2/05-split-sheet.md):
     05a  Chipotle FY2025 10-K / Q4 release lines ($ thousands) -> each line's share of $10
     05b  the 50/30/20 rule on a $3,000 take-home paycheck (pure arithmetic)
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
B_PER_DAY = B_AMT[1] // B_DAYS                               # $30 a day of wants
B_GAP = B_AMT[1] - B_AMT[2]                                  # wants beat savings by $300

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


def millions(v):
    return f"${v:,}M"


# ---------------------------------------------------------- expected strings
A_LABELS_NODIGIT = True   # labels/notes in 05a carry no digits (checked by the walker)
EXPECT = {
    "05a": {
        "header": f"What You're Paying For\nWhen You Spend **{money(A_ORDER)}**\nat Chipotle:",
        "footer": f"ASSUMES {money(A_ORDER)} splits like Chipotle's FY2025 revenue (10-K) · an average, not your order",
        "verdict.text": f"Chipotle keeps **{approx(money(A_AMT[6], 2))}** of your {money(A_ORDER)}.\nNot __{money(A_WRONG, 2)}__.",
        "data.total.display": money(A_ORDER, 2),
        **{f"data.parts[{i}].pct": A_PCT[i] for i in range(7)},
        **{f"data.parts[{i}].amount": approx(money(A_AMT[i], 2)) for i in range(7)},
        "data.check": f"{money(A_ORDER, 2)} − {money(A_COSTS, 2)} of costs = {money(r2(A_ORDER - A_COSTS), 2)}",
        "lookOpts.wrongGuess.formula": f"{money(A_ORDER)} − {money(A_AMT[0], 2)}",
        "lookOpts.wrongGuess.result": f"{money(A_WRONG, 2)} profit?",
    },
    "05b": {
        "header": f"How much fun money does 50/30/20\nleave on a **{money(B_PAY)}** paycheck?",
        "footer": f"ASSUMES {money(B_PAY)} take-home (after tax), paid monthly · {B_DAYS}-day month",
        "verdict.text": f"Wants get **{money(B_AMT[1])}**: {money(B_GAP)} more than savings",
        "data.total.display": money(B_PAY),
        **{f"data.parts[{i}].pct": pct(B_RULE[i], 0) for i in range(3)},
        **{f"data.parts[{i}].amount": money(B_AMT[i]) for i in range(3)},
        "data.parts[0].note": f"{B_COUNT[0]} × {money(B_TENTH)} · rent, food, bills",
        "data.parts[1].note": f"{B_COUNT[1]} × {money(B_TENTH)} · fun money",
        "data.parts[2].note": f"{B_COUNT[2]} × {money(B_TENTH)} · saving, extra debt",
        "data.check": f"{money(B_AMT[0])} + {money(B_AMT[1])} + {money(B_AMT[2])} = {money(sum(B_AMT))}",
        "lookOpts.tenth.formula": f"{money(B_PAY)} ÷ {B_PIECES}",
        "lookOpts.tenth.display": money(B_TENTH),
        "lookOpts.actions[0].tool": f"÷ {B_PIECES}",
        "lookOpts.actions[0].becomes": f"{B_PIECES} blocks of {money(B_TENTH)}",
        **{f"lookOpts.actions[{i + 1}].tool": f"{B_COUNT[i]} × {money(B_TENTH)}" for i in range(3)},
        "lookOpts.gag.text": f"{money(B_AMT[1])} ÷ {B_DAYS} = {money(B_PER_DAY)} a day",
    },
    "05c": {
        "header": f"HOW MUCH OF YOUR **{money(C_CART)}**\nDOES COSTCO ACTUALLY KEEP?",
        "footer": "Costco FY2026 · company-wide · before tax",
        "verdict.text": f"Costco keeps **{approx(money(C_AMT[2], 2))}** of your {money(C_CART)}",
        "data.total.display": money(C_CART, 2),
        **{f"data.parts[{i}].pct": C_PCT[i] for i in range(3)},
        **{f"data.parts[{i}].amount": approx(money(C_AMT[i], 2)) for i in range(3)},
        "lookOpts.remaining[0].display": approx(money(C_REMAIN1, 2)),
        "lookOpts.remaining[1].display": approx(money(C_REMAIN2, 2)),
        "lookOpts.footerSteps[0].text": f"{millions(C_MERCH)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_AMT[0], 2)}",
        "lookOpts.footerSteps[1].text": f"{millions(C_SGA)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_AMT[1], 2)}",
        "lookOpts.footerSteps[2].text": f"{money(C_CART)} − {money(C_AMT[0], 2)} − {money(C_AMT[1], 2)} = {money(C_AMT[2], 2)}",
        "lookOpts.footerSteps[3].text": f"{millions(C_MEMBER)} ÷ {millions(C_SALES)} × {money(C_CART)} ≈ {money(C_FEES, 2)}",
        "lookOpts.footerSteps[4].text": f"fees {millions(C_MEMBER)} > what the cart leaves, {millions(C_LEFT_M)}",
        "lookOpts.bonus.label": f"Membership fees, per {money(C_CART)} of sales",
        "lookOpts.bonus.amount": approx(money(C_FEES, 2)),
    },
}

# numbers spoken in each VO line, in order ("N cents" -> N/100 dollars; number words count too)
VO_NUMBERS = {
    "05a": [
        [A_AMT[0]], [A_WRONG], [A_AMT[1]], [A_AMT[2]], [A_AMT[3]], [A_AMT[4]], [A_AMT[5]], [A_AMT[6]],
        [A_ORDER, A_COSTS], [A_WRONG, A_AMT[6]],
    ],
    "05b": [
        [B_PAY, B_PIECES, B_TENTH], [B_COUNT[0], B_AMT[0]], [B_COUNT[1], B_AMT[1]], [B_COUNT[2], B_AMT[2]],
        [*B_COUNT, B_PIECES, sum(B_AMT)], [B_GAP], [B_AMT[1], B_PER_DAY],
    ],
    "05c": [
        [C_CART], [C_AMT[0]], [C_AMT[1]], [C_AMT[2]], [2], [C_FEES, C_CART], [],
    ],
}

# where each beat should sit: (vo line, token) -> t lands EARLY..LATE around that spoken token;
# (vo line, None) -> t on the line start
ANCHORS = {
    "05a": {
        "data.parts[0].t": (0, "$2.96"), "data.parts[1].t": (2, "$2.51"), "data.parts[2].t": (3, "52"),
        "data.parts[3].t": (4, "$1.47"), "data.parts[4].t": (5, "91"), "data.parts[5].t": (6, "34"),
        "data.parts[6].t": (7, "$1.29"), "data.checkT": (8, None), "verdict.t": (9, None),
        "lookOpts.wrongGuess.t": (1, "$7.04"), "lookOpts.wrongGuess.strikeT": (2, None),
        "sfx[0].t": (1, "$7.04"), "sfx[1].t": (8, None), "sfx[2].t": (9, None),
    },
    "05b": {
        "lookOpts.tenth.t": (0, "$300"), "lookOpts.actions[0].t": (0, "Saw"),
        "data.parts[0].t": (1, "$1,500"), "data.parts[1].t": (2, "$900"), "data.parts[2].t": (3, "$600"),
        "data.checkT": (4, None), "verdict.t": (5, None), "lookOpts.gag.t": (6, "$30"),
        "sfx[0].t": (0, "Saw"), "sfx[1].t": (0, "$300"), "sfx[2].t": (5, None),
    },
    "05c": {
        "data.parts[0].t": (1, "$88.91"), "data.parts[1].t": (2, "$9.15"), "data.parts[2].t": (3, "$1.94"),
        "lookOpts.remaining[0].t": (1, "$88.91"), "lookOpts.remaining[1].t": (2, "$9.15"),
        "lookOpts.footerSteps[0].t": (1, "$88.91"), "lookOpts.footerSteps[1].t": (2, "$9.15"),
        "lookOpts.footerSteps[2].t": (3, "$1.94"), "lookOpts.footerSteps[3].t": (5, "$1.99"),
        "lookOpts.footerSteps[4].t": (6, None), "lookOpts.bonus.t": (5, "$1.99"), "verdict.t": (6, None),
        "sfx[0].t": (1, "$88.91"), "sfx[1].t": (2, "$9.15"), "sfx[2].t": (3, "$1.94"),
        "sfx[3].t": (5, "$1.99"), "sfx[4].t": (6, None),
    },
}

# the first payoff (a computed dollar figure on screen): path of the beat that carries it
FIRST_PAYOFF = {"05a": "data.parts[0].t", "05b": "lookOpts.tenth.t", "05c": "data.parts[0].t"}

# results that must carry "≈" (rounded) vs exact
APPROX_AMOUNTS = {"05a": True, "05b": False, "05c": True}

# ------------------------------------------------------------ VO helpers
NUM_WORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
             "eight": 8, "nine": 9, "ten": 10}
NUM_TOKEN = re.compile(r"(\$?)(\d[\d,]*)(?:\.(\d+))?(%)?")


def vo_numbers(text):
    """Numbers spoken in a VO line, in order: digits ('N cents' -> N/100) and number words."""
    out = []
    pattern = r"(\$?\d[\d,]*(?:\.\d+)?)%?(\s+cents)?|\b(" + "|".join(NUM_WORDS) + r")\b"
    for m in re.finditer(pattern, text, flags=re.IGNORECASE):
        if m.group(3):
            out.append(float(NUM_WORDS[m.group(3).lower()]))
        else:
            v = float(m.group(1).lstrip("$").replace(",", ""))
            out.append(v / 100 if m.group(2) else v)
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
    dollars = re.findall(r"\$[\d,.]+", plain)
    record(key, "R2 one $ figure in header (the input)", dollars, [d["total"]["display"].split(".")[0]],
           len(dollars) == 1 and dollars[0] == d["total"]["display"].split(".")[0])
    results = {p["amount"].lstrip("≈ ") for p in parts}
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
    for path, (line, tok) in ANCHORS[key].items():
        beat = get(spec, path)
        est = anchor_time(vo, line, tok)
        if est is None:
            record(key, f"{path} at VO mention", beat, f"VO line {line} never says {tok!r}", False)
        elif tok is None:
            record(key, f"{path} on vo[{line}] start", beat, f"{est:.2f}", abs(beat - est) <= START_TOL)
        else:
            lo, hi = max(vo[line]["t"], est - EARLY), est + LATE
            record(key, f"{path} at '{tok}' (vo[{line}])", beat, f"{lo:.2f}..{hi:.2f}", lo - 1e-9 <= beat <= hi + 1e-9)
    timed = [p for p, _ in walk(spec) if re.search(r"(^|\.)(t|checkT|strikeT)$", p) and not p.startswith("vo[")]
    for p in timed:
        record(key, f"{p} anchored", p, "in ANCHORS", p in ANCHORS[key])
    fp = get(spec, FIRST_PAYOFF[key])
    record(key, "R10 first payoff ≤ 3 s", fp, "≤ 3.0", fp <= 3.0)
    for s in spec.get("sfx", []):
        record(key, f"sfx {s['kind']} inside duration", s["t"], f"< {dur}", 0 <= s["t"] < dur)
    record(key, "verdict after the last part", spec["verdict"]["t"], f"≥ {parts[-1]['t']}",
           spec["verdict"]["t"] >= parts[-1]["t"])


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
    eq("05b", "wants − savings", B_GAP, 300)
    eq("05b", "$900 ÷ 30 exact", B_AMT[1] % B_DAYS, 0)
    for pay, want in ((2_400, [1_200, 720, 480]), (4_000, [2_000, 1_200, 800])):   # pinned comment
        eq("05b", f"pinned: ${pay:,} → tenths × 5/3/2", [pay // B_PIECES * n for n in B_COUNT], want)
    record("05b", "≈ $30 a day still true in an average 30.44-day month", round(B_AMT[1] / (365.25 / 12), 2),
           "rounds to $30", round(B_AMT[1] / (365.25 / 12)) == B_PER_DAY)

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
    record("05c", "per-$100 fees beat per-$100 leftover after rounding", (C_FEES, C_AMT[2]), "fees bigger", C_FEES > C_AMT[2])
    # FY2025 robustness (release: net sales $269.9B, membership $5.323B, merch $239.886B, SG&A $24.966B)
    lo, hi = 269_850 - 239_886 - 24_966, 269_950 - 239_886 - 24_966
    record("05c", "FY2025 too: fees $5,323M > cart's leftover", f"{lo:,}..{hi:,}", "< 5,323", hi < 5_323)
    eq("05c", "net income per $100 of sales (pinned comment)", money(r2(C_NI / C_SALES * 100), 2), "$3.10")
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
    print(f"  05b  ${B_PAY:,} ÷ {B_PIECES} = ${B_TENTH}; pieces {B_COUNT} -> {B_AMT}; wants/day ${B_PER_DAY}; gap ${B_GAP}")
    print("  05c  $100 at Costco (FY2026, $M)")
    for n, v, s, p, a in zip(["merchandise costs", "SG&A", "left (op. margin on sales)"], C_LINES, C_SHARE, C_PCT, C_AMT):
        print(f"       {n:30s} {v:>11,}  {s * 100:8.4f}%  -> {p:>7}  ≈ ${a:.2f}")
    print(f"       membership fees {C_MEMBER:,} -> ≈ ${C_FEES:.2f} per $100; remaining hero ${C_REMAIN1:.2f} -> ${C_REMAIN2:.2f}")
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
