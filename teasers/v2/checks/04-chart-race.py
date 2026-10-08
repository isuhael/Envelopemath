#!/usr/bin/env python3
"""Math + spec check for format 4, "chart-race" (teasers 04a, 04b, 04c). Round-2 revision.

1. Recomputes every on-screen number from its sourced inputs (below, each with its source).
2. Loads the three spec JSONs and asserts that
   - every display string (finals, stake, labels, footer steps, formula steps, ledger cells, verdict)
     equals the string rebuilt here from the computed values, character for character;
   - every chart point equals the computed value (x to 0.01, value to the cent);
   - every number inside every VO line equals the computed, formatted value, in order
     (rounded values carry "≈", exact ones don't; a rounded multiple always carries "≈");
   - every string anywhere in a spec that contains a digit is covered by a check;
   - VO timing fits ~2.6 spoken words per second (numbers expanded into spoken words), lines don't
     overlap and end inside the video; each VO line that names a year starts while that year's
     segment of the race is being drawn (on the chart's x -> t clock, -0.3 s / +0.6 s); event flags,
     footer/formula steps, figure beats and sfx sit on the beat they belong to;
   - SPOKEN-NUMBER SYNC: every figure the VO quotes mid-race is on screen at the moment it is spoken
     (the word's start time = line start + spoken words before it / 2.6): either the live tip counter
     reads it then, or a flag / beat label / ledger row carrying it is showing then;
   - the verdict lands after the last VO line ends (the kits hide captions under the verdict);
   - header <= 15 words with a $ number at t = 0, captions on, duration in the 25-50 s lane;
   - the claims the VO makes in words ("still behind", "doubled", "16 years to match it", "under $30 in 16 years",
     "≈ 2 to 1", "still under $17,000") hold in the data;
   - robustness: the verdicts survive the second gold source, and every on-screen savings figure in 04b
     survives every plausible value of the uncertain FDIC inputs.
3. Checks that the write-up quotes the same numbers (captions, pinned comments) and no stale ones.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/04-chart-race.py
"""
import itertools
import json
import math
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.environ.get("CHART_RACE_SPECS", os.path.join(ROOT, "studio", "specs"))  # override for mutation tests
WRITEUP = os.path.join(ROOT, "teasers", "v2", "04-chart-race.md")
IDS = {
    "a": "04a-scoreboard-sp500-vs-gold",
    "b": "04b-becker-rig-savings-vs-sp500",
    "c": "04c-live-sheet-usa-vs-europe",
}
WPS = 2.6            # VO read speed, spoken words per second
LANE = (25.0, 50.0)  # duration lane for this format (task brief)
PRE, POST = 0.3, 0.6  # a VO line naming year Y may start PRE s before Y's segment starts, POST s after it ends
EVENT_TOL = 1.0      # an event flag must land within this many s of the VO line naming its year
BECKER_NOTE = 2.6    # becker-rig: a beat's label shows for max(2.6 s, beat d) (looks/becker-rig/formats/chart-race.js)

# ============================================================== inputs (all verified 2026-10-07)

# S&P 500 total return (dividends reinvested), calendar years, %. S&P Dow Jones Indices data as
# reproduced by Slickcharts "S&P 500 Total Returns by Year" (also used by 07b). 2000-2006 confirmed by
# web search (UMD Smith School / David Kass "S&P 500 Total Return Up in 80% of Past 78 Years", Motley
# Fool "S&P 500 annual returns"); 2007-2025 cross-checked by the 07b writer against YCharts, US500.com,
# History of Market and NYU Stern (Damodaran).
SP = {2000: -9.10, 2001: -11.89, 2002: -22.10, 2003: 28.68, 2004: 10.88, 2005: 4.91, 2006: 15.79,
      2007: 5.49, 2008: -37.00, 2009: 26.46, 2010: 15.06, 2011: 2.11, 2012: 16.00, 2013: 32.39,
      2014: 13.69, 2015: 1.38, 2016: 11.96, 2017: 21.83, 2018: -4.38, 2019: 31.49, 2020: 18.40,
      2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02, 2025: 17.88}

# Gold, annual % change of the year-end (closing) price, 2000-2024: Visual Capitalist, "Charted: Gold's
# Annual Returns (2000-2025)" (Jul 2025; same table posted by World of Statistics and Voronoi). Its 2024
# value (27.2%) matches Macrotrends' 2024 close $2,624.60 (+27.23%). 2013 is a 1-dp table value, and other
# price bases give -27.3% to -28.3%, so it is shown as "≈ 28%".
GOLD = {2000: -5.4, 2001: 2.4, 2002: 24.8, 2003: 19.5, 2004: 5.4, 2005: 17.5, 2006: 23.5, 2007: 31.0,
        2008: 5.6, 2009: 24.6, 2010: 29.6, 2011: 10.1, 2012: 7.1, 2013: -28.0, 2014: -1.8, 2015: -10.4,
        2016: 8.4, 2017: 13.2, 2018: -1.6, 2019: 18.3, 2020: 25.1, 2021: -3.6, 2022: -0.4, 2023: 13.2,
        2024: 27.2}
# 2025 from the two year-end closes: $2,624.60 (Macrotrends 2024 close) -> $4,319.37 (Dec 31, 2025 close,
# "up 64.58%"); thegoldprice.net 64.6%; VanEck/WGC (LBMA basis) 64.4%; other closes $4,323 / $4,325.45.
GOLD_CLOSE_2024, GOLD_CLOSE_2025 = 2624.60, 4319.37
# Second, independent gold table (thegoldprice.net / chartrow, a different price basis): years it gave.
GOLD_B = {2000: -3.5, 2002: 24.7, 2007: 31.7, 2011: 10.2, 2013: -28.1, 2016: 8.7, 2019: 18.8, 2020: 24.6,
          2021: -3.6, 2022: -0.2, 2023: 13.0, 2024: 27.2, 2025: 64.6}

# FDIC national average savings rate (APY, %), the January reading of each year.
#   2010 0.21, 2012 0.11, 2014 0.06, 2016 0.06, 2018 0.06, 2020 0.09: Forbes Advisor "History of Savings
#     Account Interest Rates" / wealthvieu "Savings Account Interest Rate History" (FDIC data). The round-2
#     verifier found 0.22 for early 2010: both are tested in the robustness sweep below.
#   2022 0.06, 2023 0.33, 2024 0.47, 2025 0.41: FRED series SNDR "National Rate: Savings" (FDIC), table
#     observations 2022-01-01, 2023-01-01, 2024-01-01, 2025-01-01 (2022 also on the FDIC page of 2022-01-18).
#     The verifier found 0.46 "as of January 31, 2024" (the next monthly reading): tested below too.
#   2021 0.06: no January 2021 reading was found (FRED's old weekly series SAVNRNJ ends 2021-03-29 and its
#     values could not be read). SNDR's first observation, 2021-04-01, is 0.06 (0.0610), and it stays 0.06
#     through 2021-12. So 2021 uses the April reading: the method is "the January reading, or the first
#     reading of the year where January could not be found". Earlier drafts used 0.04 ("the 2021 low",
#     unsourced); 0.04 and 0.05 are tested below.
#   Not found: 2011, 2013, 2015, 2017, 2019 -> midpoint of the two neighbouring Januaries (an assumption,
#     stated in the write-up); either neighbour is tested below.
FDIC_KNOWN = {2010: 0.21, 2012: 0.11, 2014: 0.06, 2016: 0.06, 2018: 0.06, 2020: 0.09, 2021: 0.06,
              2022: 0.06, 2023: 0.33, 2024: 0.47, 2025: 0.41}
FDIC_INTERP = [2011, 2013, 2015, 2017, 2019]
FDIC_ALT = {2010: [0.21, 0.22], 2021: [0.04, 0.05, 0.06], 2024: [0.46, 0.47]}

# CPI-U, all items, U.S. city average, not seasonally adjusted (1982-84 = 100). BLS CPI news releases:
# December 2009 = 215.949 (release of 2010-01-15); December 2025 = 324.054 (release of 2026-01-13).
CPI_DEC09, CPI_DEC25 = 215.949, 324.054

# MSCI Europe Index (USD), net total return, calendar years, %. MSCI index factsheet "MSCI Europe Index
# (USD)" (2012-2025 table); 2019-2025 identical on YCharts ^MSEURNTR.
EU = {2016: -0.40, 2017: 25.51, 2018: -14.86, 2019: 23.77, 2020: 5.38, 2021: 16.30, 2022: -15.06,
      2023: 19.89, 2024: 1.79, 2025: 35.41}
YCHARTS_EU = {2019: 23.77, 2020: 5.38, 2021: 16.30, 2022: -15.06, 2023: 19.89, 2024: 1.79, 2025: 35.41}
# Xtrackers MSCI Europe UCITS ETF 1C (DWS), fund returns (fees, share-class effects): close, not equal.
DWS_EU = {2016: -1.32, 2017: 24.97, 2018: -14.67, 2019: 24.41, 2020: 5.51, 2021: 16.58, 2022: -14.85,
          2023: 20.18, 2024: 2.02, 2025: 35.77}

# The teasers' own settings. 04a and 04b open mid-race: raceT starts at -0.4 s, so frame 1 already shows the
# race moving (04a: both tips under the stake, ChartOrbit's "open in the red"; 04b: S&P $1,041 vs savings
# $1,001, hook pass 2); 04c holds the stake for 1.0 s.
A_STAKE, A_Y0, A_Y1, A_RACE = 10_000, 2000, 2025, (-0.4, 31.6)
B_STAKE, B_Y0, B_Y1, B_RACE = 1_000, 2010, 2025, (-0.4, 23.6)
C_STAKE, C_Y0, C_Y1, C_RACE = 10_000, 2016, 2025, (1.0, 21.0)
DUR = {"a": 45.5, "b": 40.1, "c": 38.0}

# ============================================================== formatting (rules used on screen)


def rnd(x, step=1.0):
    q = (Decimal(repr(x)) / Decimal(repr(step))).quantize(Decimal(1), rounding=ROUND_HALF_UP)
    return float(q * Decimal(repr(step)))


def sig(x, n=3):
    e = math.floor(math.log10(abs(x)))
    return rnd(x, 10.0 ** (e - n + 1))


def approx(x, shown):
    """'≈ ' when the shown value is a rounding of x (not exact to the cent)."""
    return "" if abs(x - shown) < 0.005 else "≈ "


def usd_sig(x, n=3):
    s = sig(x, n)
    return f"{approx(x, s)}${s:,.0f}"


def usd_round(x):
    s = rnd(x)
    return f"{approx(x, s)}${s:,.0f}"


def int_round(x):
    return int(rnd(x))


def pct_signed2(p):
    return ("+" if p >= 0 else "−") + f"{abs(p):.2f}%"


def ye(y):
    """x of a Dec-31 close: y + 0.99 (so a year counter that floors x still reads y)."""
    return round(y + 0.99, 2)


def t_of(x, race, x0, x1):
    return race[0] + (x - x0) / (x1 - x0) * (race[1] - race[0])


def x_of(t, race, x0, x1):
    """the race clock: x drawn at time t (clamped to the race)"""
    t = min(max(t, race[0]), race[1])
    return x0 + (t - race[0]) / (race[1] - race[0]) * (x1 - x0)


def val_at(pts, x):
    """a tip counter's value at x: linear between the chart points (what the kits draw)"""
    if x <= pts[0][0]:
        return pts[0][1]
    for (xa, va), (xb, vb) in zip(pts, pts[1:]):
        if xa <= x <= xb:
            return va + (vb - va) * (x - xa) / (xb - xa)
    return pts[-1][1]


# ============================================================== models

def grow(rates, y0, y1, stake):
    v, vals, pts = float(stake), {y0 - 1: float(stake)}, [(float(y0), float(stake))]
    for y in range(y0, y1 + 1):
        v *= 1 + rates[y] / 100
        vals[y] = v
        pts.append((ye(y), round(v, 2)))
    return vals, pts


def clock(race, y0, y1):
    x1 = ye(y1)
    tl = {y: t_of(ye(y), race, y0, x1) for y in range(y0, y1 + 1)}
    ts = {y: t_of(ye(y - 1) if y > y0 else y0, race, y0, x1) for y in range(y0, y1 + 1)}
    return x1, tl, ts


# ---- 04a: S&P 500 vs gold, $10,000 each at the Dec 31, 1999 close
GOLD_A = dict(GOLD)
GOLD_A[2025] = (GOLD_CLOSE_2025 / GOLD_CLOSE_2024 - 1) * 100
A_sp, A_sp_pts = grow(SP, A_Y0, A_Y1, A_STAKE)
A_au, A_au_pts = grow(GOLD_A, A_Y0, A_Y1, A_STAKE)
A = {}
A["years"] = A_Y1 - A_Y0 + 1                                     # "26 years": Jan 2000 -> Dec 2025
A["m_sp"], A["m_au"] = A_sp[2025] / A_STAKE, A_au[2025] / A_STAKE
A["fin_sp"], A["fin_au"] = usd_sig(A_sp[2025]), usd_sig(A_au[2025])
A["dd02"] = int_round((1 - A_sp[2002] / A_STAKE) * 100)          # stocks down by end-2002 (cumulative)
A["up02"] = int_round((A_au[2002] / A_STAKE - 1) * 100)          # gold up by end-2002 (cumulative)
A["ratio"] = A["m_au"] / A["m_sp"]
A["dbl_sp"], A["dbl_au"] = math.log2(A["m_sp"]), math.log2(A["m_au"])
A["x1"], A["tl"], A["ts"] = clock(A_RACE, A_Y0, A_Y1)
# second gold source, its years swapped in
GOLD_ALT = dict(GOLD_A)
GOLD_ALT.update(GOLD_B)
A_alt, _ = grow(GOLD_ALT, A_Y0, A_Y1, A_STAKE)
# pinned comment: start in 2010 instead
A["m_sp10"] = A_sp[2025] / A_sp[2009]
A["m_au10"] = A_au[2025] / A_au[2009]
A["cagr_sp"], A["cagr_au"] = A["m_sp"] ** (1 / 26) - 1, A["m_au"] ** (1 / 26) - 1


# ---- 04b: savings account vs S&P 500, $1,000 each at the Dec 31, 2009 close
def fdic_table(known):
    out = dict(known)
    for y in FDIC_INTERP:
        out[y] = (known[y - 1] + known[y + 1]) / 2
    return out


FDIC = fdic_table(FDIC_KNOWN)
B_sp, B_sp_pts = grow(SP, B_Y0, B_Y1, B_STAKE)
B_sv, B_sv_pts = grow(FDIC, B_Y0, B_Y1, B_STAKE)
B = {}
B["fin_sp"], B["fin_sv"] = usd_sig(B_sp[2025]), usd_sig(B_sv[2025])   # 3 s.f., like every final: the savings
# dollars and cents rest on the five midpoint years, so nearest-dollar precision is not shown (see the sweep)
B["drop22"] = int_round(abs(SP[2022]))
B["infl"] = CPI_DEC25 / CPI_DEC09
B["infl_pct"] = int_round((B["infl"] - 1) * 100)
B["need"] = B_STAKE * B["infl"]                                 # $1,000 of Dec-2009 prices, in Dec-2025 $
B["real_sv"] = B_sv[2025] / B["infl"]                          # savings balance in Dec-2009 dollars
B["real_disp"] = usd_sig(B["real_sv"], 2)                       # "≈ $680" (2 s.f.: robust to every FDIC scenario)
B["earn_cap"] = 10                                              # "Savings? Under $10 so far."
B["years"] = B_Y1 - B_Y0 + 1                                    # "16 years of savings": Jan 2010 -> Dec 2025
B["y1"] = B_sp[B_Y0] - B_STAKE                                  # the S&P 500's first year (2010) on $1,000: $150.60
B["y1_disp"] = usd_round(B["y1"])                               # "≈ $151"
B["int16"] = B_sv[B_Y1] - B_STAKE                               # 16 years of savings interest: $23.85
B["int_cap"] = 30                                               # "savings made under $30 in 16 years"
B["understate"] = 2.0                                           # January-rate model: 2022-2023 understated ≈ $1 each
B["cagr_sp"] = B_sp[B_Y1] / B_STAKE                             # (multiple; CAGR below)
B["cagr_sp"] = B["cagr_sp"] ** (1 / B["years"]) - 1             # 14.13% a year: 2010's 15.06% is a typical year
B["mean_sp"] = sum(SP[y] for y in range(B_Y0, B_Y1 + 1)) / B["years"]
B["real_sp"] = B_sp[2025] / B["infl"]
B["lost"] = int_round((1 - B["real_sv"] / B_STAKE) * 100)
B["x1"], B["tl"], B["ts"] = clock(B_RACE, B_Y0, B_Y1)
B["sv_hi"] = B_STAKE * (1 + max(FDIC.values()) / 100) ** 16
B["sv_lo"] = B_STAKE * (1 + min(FDIC.values()) / 100) ** 16
B["m_sp"] = B_sp[2025] / B_STAKE
B["m_sv"] = B_sv[2025] / B_STAKE
B["cum_rate"] = (B_sv[2025] / B_STAKE - 1) * 100                # what savings earned in 16 years, %

# ---- 04c: USA (S&P 500) vs Europe (MSCI Europe net, USD), $10,000 each at the Dec 31, 2015 close
C_us, C_us_pts = grow(SP, C_Y0, C_Y1, C_STAKE)
C_eu, C_eu_pts = grow(EU, C_Y0, C_Y1, C_STAKE)
C = {}
C["m_us"], C["m_eu"] = C_us[2025] / C_STAKE, C_eu[2025] / C_STAKE
C["fin_us"], C["fin_eu"] = usd_sig(C_us[2025]), usd_sig(C_eu[2025])
C["drop18"] = int_round(abs(EU[2018]))
C["jump25"] = int_round(EU[2025])
C["us25"] = int_round(SP[2025])
C["ratio25"] = EU[2025] / SP[2025]
C["cagr_us"], C["cagr_eu"] = C["m_us"] ** 0.1 - 1, C["m_eu"] ** 0.1 - 1
C["dbl_us"], C["dbl_eu"] = math.log2(C["m_us"]), math.log2(C["m_eu"])
C["x1"], C["tl"], C["ts"] = clock(C_RACE, C_Y0, C_Y1)
C["first_double_us"] = min(y for y in range(C_Y0, C_Y1 + 1) if C_us[y] >= 2 * C_STAKE)
C["first_double_eu"] = min(y for y in range(C_Y0, C_Y1 + 1) if C_eu[y] >= 2 * C_STAKE)
C["eu_cap"] = 17_000                                           # "Europe? Still under $17,000."

# ============================================================== check plumbing

ROWS = []
FAILS = 0


def claim(tid, what, got, want, ok=None):
    global FAILS
    if ok is None:
        ok = got == want
    ROWS.append((tid, what, str(got), str(want), ok))
    if not ok:
        FAILS += 1
    return ok


NUM_RE = re.compile(r"(≈ )?(×)?([−+]?)(\$?)(\d{1,3}(?:,\d{3})+(?:\.\d+)?|\d+(?:\.\d+)?)(%|×)?")
NAMES = [("S&P 500", "S&P"), ("US$", "US")]


def nums(s):
    for a, b in NAMES:
        s = s.replace(a, b)
    s = s.replace("**", "").replace("__", "")
    return [m.group(0) for m in NUM_RE.finditer(s)]


class Spec:
    def __init__(self, key):
        self.key = key
        self.id = IDS[key]
        with open(os.path.join(SPECS, self.id + ".json"), encoding="utf-8") as f:
            self.d = json.load(f)
        self.covered = set()

    def get(self, path):
        v = self.d
        for p in path:
            v = v[p]
        return v

    def s(self, path, want, what=None):
        """display string must equal `want` exactly"""
        self.covered.add(tuple(path))
        return claim(self.key, what or "/".join(map(str, path)), self.get(path), want)

    def n(self, path, want_tokens, what=None):
        """every number in the string at path equals the expected formatted tokens, in order"""
        self.covered.add(tuple(path))
        got = nums(self.get(path))
        return claim(self.key, (what or "/".join(map(str, path))) + " numbers", got, want_tokens)

    def v(self, path, want, tol=0.0051, what=None):
        got = self.get(path)
        return claim(self.key, what or "/".join(map(str, path)), got, round(want, 3),
                     ok=isinstance(got, (int, float)) and abs(got - want) <= tol)

    def uncovered(self):
        out = []

        def walk(v, path):
            if isinstance(v, dict):
                for k, x in v.items():
                    walk(x, path + (k,))
            elif isinstance(v, list):
                for i, x in enumerate(v):
                    walk(x, path + (i,))
            elif isinstance(v, str) and re.search(r"\d", v) and path not in self.covered and path != ("id",):
                out.append("/".join(map(str, path)) + ": " + v)
        walk(self.d, ())
        return out


# ---- spoken words: numbers are read out ("$75,300" = seventy-five thousand three hundred dollars)
def n_words(n):
    if n < 100:
        return 1                               # "twenty-five" counts as one word
    if n < 1000:
        return 2 + (n_words(n % 100) if n % 100 else 0)
    if n < 1_000_000:
        return n_words(n // 1000) + 1 + (n_words(n % 1000) if n % 1000 else 0)
    return n_words(n // 1_000_000) + 1 + (n_words(n % 1_000_000) if n % 1_000_000 else 0)


ACRONYMS = {"S&P": 3, "S&P's": 3, "USA": 3, "USA's": 3, "FDIC": 4}


def spoken(text):
    w = 0
    for tok in text.replace("**", "").replace("__", "").split():
        tok = tok.strip(".,:;?!\"()")
        if not tok:
            continue
        if tok in ACRONYMS:
            w += ACRONYMS[tok]
            continue
        m = re.fullmatch(r"([−+]?)(\$?)([\d,]+(?:\.\d+)?)(%|×)?", tok)
        if m:
            sign, dollar, num, unit = m.groups()
            if "." in num:
                a, b = num.split(".")
                w += n_words(int(a.replace(",", ""))) + 1 + len(b)
            else:
                w += n_words(int(num.replace(",", "")))
            w += bool(sign) + bool(dollar) + bool(unit)
            continue
        w += 1                                 # words, and "≈" read as "about"
    return w


def said_at(S, i, token):
    """(start, end) of `token` inside vo[i] as read: line start + spoken words before it / WPS"""
    line = S.d["vo"][i]
    if token not in line["text"]:                # a wrong figure fails as a claim, not as a crash
        claim(S.key, f"vo[{i}] says '{token}'", line["text"], token, ok=False)
        return math.inf, math.inf
    k = line["text"].index(token)
    t0 = line["t"] + spoken(line["text"][:k]) / WPS
    return t0, t0 + spoken(token) / WPS


def common(S, header_words_max=15):
    d, k = S.d, S.key
    claim(k, "id = file stem", d["id"], S.id)
    claim(k, "format", d["format"], "chart-race")
    claim(k, "fps", d["fps"], 30)
    claim(k, "captions on", d["captions"], True)
    claim(k, "duration", d["duration"], DUR[k])
    claim(k, "duration in lane 25-50 s", d["duration"], "25-50", ok=LANE[0] <= d["duration"] <= LANE[1])
    hw = len(d["header"].replace("**", "").replace("\n", " ").split())
    claim(k, "header <= 15 words", hw, "<= 15", ok=hw <= header_words_max)
    claim(k, "header has a $ number at t=0", "$" in d["header"], True)
    claim(k, "series count 2 (max 3)", len(d["data"]["series"]), 2)
    hold = d["duration"] - d["data"]["raceT"][1]
    S.v(("data", "hold"), hold, tol=0.011, what="hold = duration − race end")
    # VO timing
    vo = d["vo"]
    claim(k, "first VO at t=0", vo[0]["t"], 0.0)
    for i, line in enumerate(vo):
        need = spoken(line["text"]) / WPS
        claim(k, f"vo[{i}] d fits {spoken(line['text'])} spoken words", line["d"], f"{need:.2f}..{need + 0.6:.2f}",
              ok=need - 1e-9 <= line["d"] <= need + 0.6)
        if i + 1 < len(vo):
            end = line["t"] + line["d"]
            claim(k, f"vo[{i}] ends before vo[{i + 1}]", round(end, 2), f"<= {vo[i + 1]['t']}", ok=end <= vo[i + 1]["t"] + 1e-9)
    end = vo[-1]["t"] + vo[-1]["d"]
    claim(k, "last VO ends inside the video", round(end, 2), f"<= {d['duration']}", ok=end <= d["duration"])
    # every kit hides (becker-rig, live-sheet) or must avoid (scoreboard) captions under the verdict
    claim(k, "verdict lands after the last VO line ends", d["verdict"]["t"], f">= {end:.2f}", ok=d["verdict"]["t"] >= end - 1e-9)
    claim(k, "verdict holds >= 2.5 s", round(d["duration"] - d["verdict"]["t"], 2), ">= 2.5", ok=d["duration"] - d["verdict"]["t"] >= 2.5)


def chart(S, race, x0, x1, series_pts, finals, names):
    d = S.d["data"]
    claim(S.key, "raceT", d["raceT"], list(race))
    claim(S.key, "x.from / x.to", [d["x"]["from"], d["x"]["to"]], [x0, x1])
    claim(S.key, "y axis", d["y"], {"prefix": "$", "dp": 0, "compact": False, "log": False})
    for i, (pts, fin, name) in enumerate(zip(series_pts, finals, names)):
        S.s(("data", "series", i, "name"), name)
        S.s(("data", "series", i, "final"), fin, f"series[{i}] final")
        got = S.get(("data", "series", i, "points"))
        ok = len(got) == len(pts) and all(abs(g[0] - p[0]) < 0.006 and abs(g[1] - p[1]) < 0.006 for g, p in zip(got, pts))
        claim(S.key, f"series[{i}] {len(pts)} points = computed", f"{len(got)} pts, last {got[-1]}", f"last {list(pts[-1])}", ok=ok)
        claim(S.key, f"series[{i}] final ≈ last point", fin, f"{pts[-1][1]:,.2f}",
              ok=fin.replace("≈ ", "") in (usd_sig(pts[-1][1]).replace("≈ ", ""), usd_round(pts[-1][1]).replace("≈ ", "")))


def year_sync(S, M, start_year, race_end, hook_years=()):
    """each VO line that names a year starts while that year's segment is drawn; returns {year: vo t}.
    Exempt: the stake year in vo[0] or after the race (a reference to the start, not a beat), and the
    years the hook line vo[0] names as its setup (their claims are checked separately)."""
    seen = {}
    for i, line in enumerate(S.d["vo"]):
        years = [int(y) for y in re.findall(r"\b(20[0-3]\d)\b", line["text"])]
        for y in years:
            if y == start_year and (i == 0 or line["t"] >= race_end):
                claim(S.key, f"vo[{i}] names the stake year {y} (reference, not a beat)", line["t"], "t=0 or after the race",
                      ok=i == 0 or line["t"] >= race_end)
                continue
            if i == 0 and y in hook_years:
                claim(S.key, f"vo[0] hook names {y} as its setup", y, "a hook year", ok=True)
                continue
            lo, hi = M["ts"][y] - PRE, M["tl"][y] + POST
            claim(S.key, f"vo[{i}] '{y}' in sync with the race", line["t"], f"{lo:.2f}..{hi:.2f}", ok=lo <= line["t"] <= hi)
            seen[y] = line["t"]
    return seen


def events(S, M, race, x0, x1, want, seen):
    """each flag lands inside its own year's segment; a flag the VO describes ("2008: stocks crash
    again") lands within EVENT_TOL of that VO line"""
    got = S.d["data"]["events"]
    claim(S.key, "event count", len(got), len(want))
    for i, (x, label, narrated) in enumerate(want):
        if i >= len(got):
            claim(S.key, f"event '{label}' present", "missing", "present", ok=False)
            continue
        S.v(("data", "events", i, "x"), x, tol=0.001)
        S.s(("data", "events", i, "label"), label)
        y = int(math.floor(x))
        te = t_of(x, race, x0, x1)
        claim(S.key, f"event '{label}' lands in its {y} segment", round(te, 2), f"{M['ts'][y] - PRE:.2f}..{M['tl'][y] + POST:.2f}",
              ok=M["ts"][y] - PRE <= te <= M["tl"][y] + POST)
        if narrated:
            claim(S.key, f"event '{label}' lands with its VO line", round(te, 2), f"{seen.get(y)} ± {EVENT_TOL}",
                  ok=y in seen and abs(te - seen[y]) <= EVENT_TOL)


def vo_numbers(S, want):
    claim(S.key, "VO line count", len(S.d["vo"]), len(want))
    for i, toks in enumerate(want):
        S.n(("vo", i, "text"), toks, f"vo[{i}] '{S.d['vo'][i]['text']}'")


def sfx_on(S, want):
    got = [(c["t"], c["kind"]) for c in S.d.get("sfx", [])]
    claim(S.key, "sfx cues on their beats", got, [(round(t, 2), k) for t, k in want],
          ok=len(got) == len(want) and all(abs(g[0] - w[0]) < 0.006 and g[1] == w[1] for g, w in zip(got, want)))


def vo_t(S, i):
    return S.d["vo"][i]["t"]


def vo_end(S, i):
    return S.d["vo"][i]["t"] + S.d["vo"][i]["d"]


def shown_while_said(S, i, token, t_on, t_off, what):
    """sync: the figure `token` in vo[i] starts being said while the thing showing it is on screen"""
    s0, _ = said_at(S, i, token)
    claim(S.key, f"sync: '{token}' said at {s0:.2f} s while {what} shows", round(s0, 2), f"{t_on:.2f}..{t_off:.2f}",
          ok=t_on <= s0 < t_off)


# ============================================================== 04a
Sa = Spec("a")
common(Sa)
Sa.n(("header",), ["2000", "$10,000"])
Sa.n(("footer",), ["2000", "2025"])
Sa.s(("data", "stake"), f"${A_STAKE:,} each · Jan {A_Y0}")
chart(Sa, A_RACE, A_Y0, A["x1"], [A_sp_pts, A_au_pts], [A["fin_sp"], A["fin_au"]], ["S&P 500", "Gold"])
claim("a", "x tickEvery", Sa.d["data"]["x"]["tickEvery"], 5)
vo_numbers(Sa, [
    [str(A["years"])],
    [str(2002), f"≈ −{A['dd02']}%", f"≈ +{A['up02']}%"],
    ["2008"],
    ["2013", f"≈ {abs(GOLD[2013]):.0f}%"],
    [],
    ["2021"],
    ["2025", A["fin_sp"]],
    [A["fin_au"]],
    [f"≈ {round(A['dbl_au'])}", f"≈ {round(A['dbl_sp'])}"],
])
claim("a", "'26 years' = Jan 2000 -> Dec 2025", A["years"], 26)
seen_a = year_sync(Sa, A, A_Y0, A_RACE[1])
flag02 = f"S&P __≈ −{A['dd02']}%__ · gold **≈ +{A['up02']}%**"
flag13 = f"Gold ≈ −{abs(GOLD[2013]):.0f}%"
want_ev_a = [(2001.0, "Dot-com crash", False), (ye(2002), flag02, True), (2008.75, "2008 crash", True),
             (2013.3, flag13, True), (2022.5, "2022 bear market", False)]
events(Sa, A, A_RACE, A_Y0, A["x1"], want_ev_a, seen_a)
claim("a", "flag at the 2002 close is tone neutral (gold's gain not in red)", Sa.d["data"]["events"][1].get("tone"), "neutral")
claim("a", "'≈ −38%' is cumulative since Jan 2000, and the VO says 'By 2002'", Sa.d["vo"][1]["text"].startswith("By 2002"), True)
claim("a", "2002 alone was −22.10% (why 'By' matters)", SP[2002], -22.10)
claim("a", "gold 2013 is a rounded table value -> '≈'", "≈ 28%" in Sa.d["vo"][3]["text"], True)
# frame 1 opens mid-race, both tips already under the stake (ChartOrbit's 'open in the red')
x_f1 = x_of(0.0, A_RACE, A_Y0, A["x1"])
claim("a", "frame 1: race already moving, year counter still 2000", round(x_f1, 3), "2000 < x < 2001", ok=2000 < x_f1 < 2001)
claim("a", "frame 1: S&P tip under $10,000", round(val_at(A_sp_pts, x_f1)), f"< {A_STAKE}", ok=val_at(A_sp_pts, x_f1) < A_STAKE)
claim("a", "frame 1: gold tip under $10,000", round(val_at(A_au_pts, x_f1)), f"< {A_STAKE}", ok=val_at(A_au_pts, x_f1) < A_STAKE)
# spoken-number sync: each figure is on a flag (in the spec) that is showing when it is said; a flag shows
# from its own t until the next flag (conservative: the kit retires a label only when a newer one overlaps it)
def flag_window(S, race, x0, x1, label):
    evs = sorted(S.d["data"]["events"], key=lambda e: e["x"])
    hold = S.d.get("lookOpts", {}).get("flagHold")          # the Scoreboard clears a flag label after flagHold s
    for k, e in enumerate(evs):
        if e.get("label") == label:
            t0 = t_of(e["x"], race, x0, x1)
            nxt = t_of(evs[k + 1]["x"], race, x0, x1) if k + 1 < len(evs) else S.d["duration"]
            return t0, min(nxt, t0 + hold) if hold else nxt
    return None


for i, tok, lab in ((1, f"≈ −{A['dd02']}%", flag02), (1, f"≈ +{A['up02']}%", flag02), (3, f"≈ {abs(GOLD[2013]):.0f}%", flag13)):
    w = flag_window(Sa, A_RACE, A_Y0, A["x1"], lab)
    if w is None:
        claim("a", f"sync: flag '{lab}' carrying '{tok}' is in the spec", "missing", "present", ok=False)
    else:
        shown_while_said(Sa, i, tok, w[0], w[1], f"the flag '{lab}'")
Sa.s(("verdict", "text"), f"Gold ended **≈ {round(A['ratio'])}×** the S&P 500.\n≈ one extra doubling.")
fs = ("lookOpts", "footerSteps")
claim("a", "lookOpts.stakeLine", Sa.d["lookOpts"]["stakeLine"], A_STAKE)
Sa.s(fs + (0, "text"), f"${A_STAKE:,} grew ≈ ×{sig(A['m_sp']):.2f} → {A['fin_sp']}")
Sa.s(fs + (1, "text"), f"${A_STAKE:,} grew ≈ ×{sig(A['m_au']):.1f} → {A['fin_au']}")
Sa.s(fs + (2, "text"), f"≈ ×{sig(A['m_au']):.1f} → ≈ {A['dbl_au']:.1f} doublings · ≈ ×{sig(A['m_sp']):.2f} → ≈ {A['dbl_sp']:.1f}")
claim("a", "multiples are roundings (so they carry ≈)", f"{A['m_sp']:.4f} / {A['m_au']:.4f}", "not exact",
      ok=abs(A["m_sp"] - sig(A["m_sp"])) > 1e-6 and abs(A["m_au"] - sig(A["m_au"])) > 1e-6)
for i, j in ((0, 6), (1, 7), (2, 8)):
    claim("a", f"footerStep[{i}] t = vo[{j}] t", Sa.get(fs + (i, "t")), vo_t(Sa, j))
claim("a", "footerStep 0 arithmetic", round(A_STAKE * sig(A["m_sp"])), round(sig(A_sp[2025])))
claim("a", "footerStep 1 arithmetic", round(A_STAKE * sig(A["m_au"])), round(sig(A_au[2025])))
# the gold reveal's cash (and hit, riser) are the kit's own climax cues at lookOpts.finalT[1], so the spec has none
sfx_on(Sa, [(A["tl"][2002], "thud"), (A["tl"][2008], "thud"), (A["tl"][2013], "hit"), (A_RACE[1], "roll"),
            (Sa.d["verdict"]["t"], "ding")])
# staggered finish: the hero shows each final when the VO names it (S&P at the race end, gold last = the climax)
claim("a", "lookOpts.finalT = [race end, vo[7] t]", Sa.d["lookOpts"]["finalT"], [A_RACE[1], vo_t(Sa, 7)])
claim("a", "the S&P final takes the hero as vo[6] names it", Sa.d["lookOpts"]["finalT"][0], vo_t(Sa, 6))
claim("a", "the winner (gold) is revealed last", A_au[2025] > A_sp[2025] and Sa.d["lookOpts"]["finalT"][1] > Sa.d["lookOpts"]["finalT"][0], True)
claim("a", "lookOpts.flagHold (s)", Sa.d["lookOpts"]["flagHold"], 5.0)
claim("a", "final roll on the race end", A_RACE[1], A["tl"][2025], ok=abs(A_RACE[1] - A["tl"][2025]) < 1e-9)
claim("a", "the finals are said only after the race ends", vo_t(Sa, 6), f">= {A_RACE[1]}", ok=vo_t(Sa, 6) >= A_RACE[1])
# what the words claim
claim("a", "'Stocks should crush gold' is then wrong: gold ahead at all 26 year-ends", sum(A_au[y] > A_sp[y] for y in range(2000, 2026)), 26)
claim("a", "'2008: stocks crash again'", SP[2008], "< 0", ok=SP[2008] < 0)
claim("a", "'Gold keeps climbing' in 2008", GOLD_A[2008], "> 0", ok=GOLD_A[2008] > 0)
claim("a", "'close in' 2013 -> 2021 (S&P/gold)", f"{A_sp[2013] / A_au[2013]:.2f} -> {A_sp[2021] / A_au[2021]:.2f}", "rising",
      ok=A_sp[2021] / A_au[2021] > A_sp[2013] / A_au[2013])
claim("a", "'2021: still behind'", f"{A_sp[2021]:,.0f} < {A_au[2021]:,.0f}", "", ok=A_sp[2021] < A_au[2021])
claim("a", "'≈ one extra doubling' = log2 gap (a rounding)", round(A["dbl_au"] - A["dbl_sp"], 3), "≈ 1, not exact",
      ok=round(A["dbl_au"] - A["dbl_sp"]) == 1 and abs(A["dbl_au"] - A["dbl_sp"] - 1) > 1e-6)
claim("a", "gold 2025 close-to-close %", round(GOLD_A[2025], 2), 64.57, ok=abs(GOLD_A[2025] - 64.58) < 0.02)
claim("a", "robust: 2nd gold source keeps '≈ 2×'", f"{A_alt[2025]:,.0f} → ×{A_alt[2025] / A_sp[2025]:.2f}", "rounds to 2",
      ok=round(A_alt[2025] / A_sp[2025]) == 2)
claim("a", "robust: 2nd gold source, gold still up by 2002 (flag uses the primary table's ≈ +21%)",
      f"{(A_alt[2002] / A_STAKE - 1) * 100:+.1f}%", "> 0", ok=A_alt[2002] > A_STAKE)
claim("a", "implied 1999 gold close ≈ $288 (sanity)", round(GOLD_CLOSE_2024 / (A_au[2024] / A_STAKE), 2), "285-292",
      ok=285 <= GOLD_CLOSE_2024 / (A_au[2024] / A_STAKE) <= 292)
for u in Sa.uncovered():
    claim("a", "uncovered string with a digit", u, "covered", ok=False)

# ============================================================== 04b
# Hook pass 2 (2026-10-07): the handicap duel "Your $1,000: 16 years of savings VS 1 year of the S&P 500".
Sb = Spec("b")
common(Sb)
y1_tok = B["y1_disp"]                                            # "≈ $151"
y1_note = f"year 1: ≈ +{y1_tok[2:]}"                        # U+00A0: the label never splits "≈" from its number
goal_note = f"goal: ≈ +{y1_tok[2:]}"
int_tok = f"${B['int_cap']}"                                     # "$30"
Sb.n(("header",), [f"${B_STAKE:,}", str(B["years"]), "1"])
claim("b", "header '16 years of savings' = Jan 2010 -> Dec 2025", B["years"], 16)
claim("b", "header: the viewer's stake ('Your $1,000') and both rivals named (R6, R7)",
      all(w in Sb.d["header"] for w in ("Your", "savings", "S&P 500")), True)
Sb.n(("footer",), ["0.5%", str(B_Y0), str(B_Y1)])
claim("b", "footer 'under 0.5%': every savings rate used", max(FDIC.values()), "< 0.5", ok=max(FDIC.values()) < 0.5)
Sb.s(("data", "stake"), f"${B_STAKE:,} each · Jan {B_Y0}")
chart(Sb, B_RACE, B_Y0, B["x1"], [B_sp_pts, B_sv_pts], [B["fin_sp"], B["fin_sv"]], ["S&P 500", "Savings account"])
claim("b", "x tickEvery", Sb.d["data"]["x"]["tickEvery"], 5)
i_earn = 2                                                       # "Savings? Under $10 so far."
earn_tok = f"${B['earn_cap']}"
vo_numbers(Sb, [
    [y1_tok],                                                    # "Year one in the S&P: ≈ $151."
    [str(B["years"])],                                           # "Savings gets 16 years to match it."
    [earn_tok],                                                  # "Savings? Under $10 so far."
    ["2022", f"≈ {B['drop22']}%"],
    ["2025", int_tok, str(B["years"])],                          # "2025: savings made under $30 in 16 years."
    [y1_tok],                                                    # "The S&P's first year alone: ≈ $151."
    [B["fin_sp"]],                                               # "It ended at ≈ $8,280."
])
seen_b = year_sync(Sb, B, B_Y0, B_RACE[1])
events(Sb, B, B_RACE, B_Y0, B["x1"], [(2020.2, "COVID", False), (2022.5, "2022 bear market", True)], seen_b)
# the verdict names the year: "1 year of the S&P 500" would read as any year, and 4 of the 16 earned less (judge 2)
Sb.s(("verdict", "text"), f"{B['years']} years of savings: under **{int_tok}**.\nThe S&P 500 in {B_Y0} alone: {y1_tok}.")
# frame 1: the race is already moving (raceT starts at -0.4 s)
x_f1b = x_of(0.0, B_RACE, B_Y0, B["x1"])
claim("b", "frame 1: race already moving, year counter still 2010", round(x_f1b, 4), "2010 < x < 2011", ok=B_Y0 < x_f1b < B_Y0 + 1)
claim("b", "frame 1: S&P tip reads $1,041", usd_round(val_at(B_sp_pts, x_f1b)), "≈ $1,041")
claim("b", "frame 1: savings tip reads $1,001", usd_round(val_at(B_sv_pts, x_f1b)), "≈ $1,001")
# figure beats
bt = ("lookOpts", "beats")
t_y1 = round(B["tl"][B_Y0], 2)                                   # the 2010 close lands at 1.086 s
want_beats = [
    (t_y1, "cheer", 0, y1_note, None),
    (vo_t(Sb, 1), "think", 1, goal_note, round(B_RACE[1] - vo_t(Sb, 1), 2)),   # the goal note holds to the race end
    (vo_t(Sb, 3), "impact", 0, f"≈ −{B['drop22']}%", None),
    (B_RACE[1], "grow", 0, None, None),
    (vo_t(Sb, 4), "shrug", 1, f"under +{int_tok}", None),
    (vo_t(Sb, 5), "point", 0, y1_note, Sb.d["vo"][5]["d"]),
]
claim("b", "figure beat count", len(Sb.get(bt)), len(want_beats))
for i, (t, act, ser, label, dur) in enumerate(want_beats):
    claim("b", f"beat[{i}] {act} t", Sb.get(bt + (i, "t")), t, ok=abs(Sb.get(bt + (i, "t")) - t) < 0.006)
    claim("b", f"beat[{i}] act", Sb.get(bt + (i, "act")), act)
    claim("b", f"beat[{i}] series", Sb.get(bt + (i, "series")), ser)
    claim("b", f"beat[{i}] d", Sb.d["lookOpts"]["beats"][i].get("d"), dur,
          ok=(dur is None and "d" not in Sb.d["lookOpts"]["beats"][i]) or (dur is not None and abs(Sb.get(bt + (i, "d")) - dur) < 0.006))
    if label is not None:
        Sb.s(bt + (i, "label"), label)
Sb.n(("lookOpts", "gag"), ["2018", "2022", str(B["years"])])
claim("b", "'year 1' note pops as the 2010 close lands (not before)", t_y1, f"{B['tl'][B_Y0]:.3f}..+0.05",
      ok=0 <= t_y1 - B["tl"][B_Y0] <= 0.05)
claim("b", "the S&P tip shows the 2010 close when 'year 1' pops", round(val_at(B_sp_pts, x_of(t_y1, B_RACE, B_Y0, B["x1"])), 2),
      f">= {B_sp[B_Y0]:,.2f}", ok=val_at(B_sp_pts, x_of(t_y1, B_RACE, B_Y0, B["x1"])) >= round(B_sp[B_Y0], 2))
claim("b", "first payoff by ~3 s: '≈ +$151' on screen at", t_y1, "<= 3.0", ok=t_y1 <= 3.0)
# a beat note shows for max(2.6 s, d), cut by the next note on the same figure (chart-race.js)
def note_window(series, k):
    beats = [b for b in Sb.d["lookOpts"]["beats"] if b.get("series") == series and b.get("label")]
    b = beats[k]
    t1 = b["t"] + max(BECKER_NOTE, b.get("d", 1.4))
    if k + 1 < len(beats):
        t1 = min(t1, beats[k + 1]["t"])
    return b["t"], t1


w_y1, w_goal, w_point = note_window(0, 0), note_window(1, 0), note_window(0, 2)
shown_while_said(Sb, 0, y1_tok, *w_y1, "the 'year 1: ≈ +$151' note")
claim("b", "spoken '≈ $151' (vo[0]) by ~3 s", round(said_at(Sb, 0, y1_tok)[0], 2), "<= 3.0", ok=said_at(Sb, 0, y1_tok)[0] <= 3.0)
claim("b", "the goal note holds from 'Savings gets 16 years' to the race end", [round(w_goal[0], 2), round(w_goal[1], 2)],
      [vo_t(Sb, 1), B_RACE[1]], ok=abs(w_goal[0] - vo_t(Sb, 1)) < 0.006 and abs(w_goal[1] - B_RACE[1]) < 0.006)
claim("b", "'16 years' (vo[1]) is the race window", Sb.d["vo"][1]["text"], "16 years", ok=f"{B['years']} years" in Sb.d["vo"][1]["text"])
# spoken-number sync
EARN_WIN = (vo_t(Sb, 2), max(vo_end(Sb, 2), vo_t(Sb, 2) + BECKER_NOTE))  # conservative: the line, or 2.6 s if longer
earn_ts = [EARN_WIN[0] + k * 0.01 for k in range(int((EARN_WIN[1] - EARN_WIN[0]) * 100) + 1)]
earn_max = max(val_at(B_sv_pts, x_of(tt, B_RACE, B_Y0, B["x1"])) - B_STAKE for tt in earn_ts)
claim("b", f"sync: 'Under $10 so far' holds on the savings tip {EARN_WIN[0]:.1f}-{EARN_WIN[1]:.1f} s", round(earn_max, 2),
      f"< {B['earn_cap']}", ok=earn_max < B["earn_cap"])
shown_while_said(Sb, 3, f"≈ {B['drop22']}%", vo_t(Sb, 3), vo_t(Sb, 3) + BECKER_NOTE, "the impact label '≈ −18%'")
shown_while_said(Sb, 4, int_tok, vo_t(Sb, 4), vo_t(Sb, 4) + BECKER_NOTE, "the shrug label 'under +$30'")
shown_while_said(Sb, 5, y1_tok, *w_point, "the point label 'year 1: ≈ +$151'")
claim("b", "the 16-year total is said once the race has ended", vo_t(Sb, 4), f">= {B_RACE[1]}", ok=vo_t(Sb, 4) >= B_RACE[1])
claim("b", "the finals are said only after the race ends", vo_t(Sb, 6), f">= {B_RACE[1]}", ok=vo_t(Sb, 6) >= B_RACE[1])
sfx_on(Sb, [(t_y1, "pop"), (vo_t(Sb, 1), "swipe"), (vo_t(Sb, 3), "hit"), (B_RACE[1], "roll"),
            (round(vo_t(Sb, 4) + 0.1, 2), "boing"), (Sb.d["verdict"]["t"], "thud")])
claim("b", "'2022: stocks drop' (S&P 2022 %) on the 2022 close", f"{SP[2022]} @ {B['tl'][2022]:.2f}", "< 0", ok=SP[2022] < 0)
# what the words claim
claim("b", "'Year one in the S&P: ≈ $151' = $1,000 × 15.06% (2010)", f"{B['y1']:.2f}", "150.60", ok=abs(B["y1"] - 150.60) < 0.005)
claim("b", "'16 years to match it' fails: 16 years of interest < year 1", f"{B['int16']:.2f} < {B['y1']:.2f}", "", ok=B["int16"] < B["y1"])
claim("b", "'under $30 in 16 years'", f"{B['int16']:.2f}", f"< {B['int_cap']}", ok=B["int16"] < B["int_cap"])
claim("b", "2010 is a typical S&P year, not a cherry-pick: within 1 pt of the 16-year CAGR",
      f"{SP[B_Y0]:.2f}% vs {B['cagr_sp'] * 100:.2f}%", "|gap| < 1", ok=abs(SP[B_Y0] - B["cagr_sp"] * 100) < 1)
best = max(range(B_Y0, B_Y1 + 1), key=lambda y: SP[y])
claim("b", "... and not the best year in the window", f"best {best} {SP[best]}%", "not 2010", ok=best != B_Y0)
claim("b", "savings line never dips (gag): every rate positive", all(FDIC[y] > 0 for y in range(2010, 2026)), True)
claim("b", "savings ends below $1,000 of buying power (pinned comment)", round(B["real_sv"], 2), f"< {B_STAKE}", ok=B["real_sv"] < B_STAKE)
claim("b", "CPI ratio Dec-09 -> Dec-25", round(B["infl"], 4), 1.5006, ok=abs(B["infl"] - 1.5006) < 0.0001)
claim("b", "robust: savings at the max rate every year (S&P still ≥ 7×)", usd_round(B["sv_hi"]), "S&P still ≥ 7×", ok=B_sp[2025] / B["sv_hi"] >= 7)
claim("b", "robust: savings at the max rate every year still below prices", usd_round(B["sv_hi"]), f"< {usd_round(B['need'])}", ok=B["sv_hi"] < B["need"])
for y in FDIC_INTERP:
    claim("b", f"FDIC {y} = midpoint of its neighbours (assumption)", round(FDIC[y], 4),
          f"({FDIC_KNOWN[y - 1]}+{FDIC_KNOWN[y + 1]})/2", ok=abs(FDIC[y] - (FDIC_KNOWN[y - 1] + FDIC_KNOWN[y + 1]) / 2) < 1e-12)
# robustness sweep: every plausible value of every uncertain FDIC input leaves every on-screen savings figure unchanged
sweep, worst, int_lo, int_hi, earn_hi = 0, [], 1e9, 0.0, 0.0
alt_keys = sorted(FDIC_ALT)
for combo in itertools.product(*[FDIC_ALT[k] for k in alt_keys]):
    known = dict(FDIC_KNOWN)
    known.update(dict(zip(alt_keys, combo)))
    mids = [((known[y - 1], known[y + 1]), y) for y in FDIC_INTERP]
    for pick in itertools.product(*[(0, 1, 2)] * len(FDIC_INTERP)):
        table = dict(known)
        for (lo_hi, y), p in zip(mids, pick):
            table[y] = (lo_hi[0], (lo_hi[0] + lo_hi[1]) / 2, lo_hi[1])[p]
        vals, pts = grow(table, B_Y0, B_Y1, B_STAKE)
        sweep += 1
        i16 = vals[B_Y1] - B_STAKE
        e_max = max(val_at(pts, x_of(tt, B_RACE, B_Y0, B["x1"])) - B_STAKE for tt in earn_ts)
        int_lo, int_hi, earn_hi = min(int_lo, i16), max(int_hi, i16), max(earn_hi, e_max)
        shown = (usd_sig(vals[2025]), usd_sig(vals[2025] / B["infl"], 2), int_round((1 - vals[2025] / B["infl"] / B_STAKE) * 100),
                 e_max < B["earn_cap"], i16 + B["understate"] < B["int_cap"], i16 + B["understate"] < B["y1"],
                 all(r > 0 for r in table.values()))
        if shown != (B["fin_sv"], B["real_disp"], B["lost"], True, True, True, True):
            worst.append((combo, pick, shown))
claim("b", f"robust: FDIC sweep ({sweep} input tables) leaves ≈ $1,020 / ≈ $680 / ≈ 32% / under $10 / under $30 (+$2) / never down",
      len(worst), 0, ok=not worst)
claim("b", "robust: 16-year interest range over the sweep", f"{int_lo:.2f}-{int_hi:.2f}", f"< {B['int_cap']} even + ${B['understate']:.0f}",
      ok=int_hi + B["understate"] < B["int_cap"])
claim("b", "robust: verdict ratio year 1 ÷ worst 16-year interest", round(B["y1"] / (int_hi + B["understate"]), 2), ">= 5",
      ok=B["y1"] / (int_hi + B["understate"]) >= 5)
# pinned comment: the S&P years that earned less on $1,000 than 16 years of savings did (in every table)
slow = [y for y in range(B_Y0, B_Y1 + 1) if B_STAKE * SP[y] / 100 < int_lo]
claim("b", "pinned: S&P years that made less on $1,000 than 16 years of savings (every table)", slow, [2011, 2015, 2018, 2022])
claim("b", "pinned: 2011 ≈ $21, 2015 ≈ $14", [usd_round(B_STAKE * SP[2011] / 100), usd_round(B_STAKE * SP[2015] / 100)], ["≈ $21", "≈ $14"])
for u in Sb.uncovered():
    claim("b", "uncovered string with a digit", u, "covered", ok=False)

# ============================================================== 04c
Sc = Spec("c")
common(Sc)
Sc.n(("header",), [str(C_Y0), f"${C_STAKE:,}"])
Sc.n(("footer",), [str(C_Y0), str(C_Y1)])
Sc.s(("data", "stake"), f"${C_STAKE:,} each · Jan {C_Y0}")
chart(Sc, C_RACE, C_Y0, C["x1"], [C_us_pts, C_eu_pts], [C["fin_us"], C["fin_eu"]], ["USA · S&P 500", "Europe · MSCI Europe"])
claim("c", "x tickEvery", Sc.d["data"]["x"]["tickEvery"], 2)
vo_numbers(Sc, [
    [str(C_Y1), f"≈ {round(C['ratio25'])}", "1"],
    ["2018", f"≈ {C['drop18']}%"],
    ["2020"],
    [f"${C['eu_cap']:,}"],
    ["2025", f"≈ {C['jump25']}%", f"≈ {C['us25']}%"],
    [C["fin_us"]],
    [C["fin_eu"]],
    [],
])
claim("c", "hook '2025: Europe beat the USA ≈ 2 to 1' (35.41 ÷ 17.88)", round(C["ratio25"], 3), "1.9-2.1, rounds to 2",
      ok=1.9 <= C["ratio25"] < 2.1 and round(C["ratio25"]) == 2)
seen_c = year_sync(Sc, C, C_Y0, C_RACE[1], hook_years=(C_Y1,))
events(Sc, C, C_RACE, C_Y0, C["x1"], [(2018.9, "2018 sell-off", True), (2020.2, "COVID", False), (2022.5, "2022 bear market", False)], seen_c)
Sc.s(("verdict", "text"), f"Europe won **{C_Y1}**.\nThe USA won the **decade**.")
fm = ("lookOpts", "formulaSteps")
Sc.s(fm + (0, "text"), f"= ${C_STAKE:,}\n× (1 + each year's return)")
Sc.s(fm + (1, "text"), f"= ${C_STAKE:,} × {1 + SP[2016] / 100:.4f} · = ${C_STAKE:,} × {1 + EU[2016] / 100:.4f}")
Sc.s(fm + (2, "text"), f"≈ ${C_STAKE:,} × {sig(C['m_us']):.2f} · ≈ ${C_STAKE:,} × {sig(C['m_eu']):.2f}")
Sc.s(fm + (3, "text"), f"≈ {C['cagr_us'] * 100:.1f}% a year vs ≈ {C['cagr_eu'] * 100:.1f}% a year")
claim("c", "formulaStep[0] t", Sc.get(fm + (0, "t")), 0.0)
Sc.v(fm + (1, "t"), C["tl"][2016], tol=0.006, what="formulaStep[1] t = 2016 close lands")
Sc.v(fm + (2, "t"), C["tl"][2025], tol=0.006, what="formulaStep[2] t = race end")
claim("c", "formulaStep[3] t = vo[7] t (the doublings line)", Sc.get(fm + (3, "t")), vo_t(Sc, 7))
claim("c", "formula: ≈ ×3.98 → ≈ $39,800", f"{C_STAKE * sig(C['m_us']):,.0f}", C["fin_us"].replace("≈ $", ""))
claim("c", "formula: ≈ ×2.27 → ≈ $22,700", f"{C_STAKE * sig(C['m_eu']):,.0f}", C["fin_eu"].replace("≈ $", ""))
lg = ("lookOpts", "ledger")
claim("c", "ledger columns", Sc.get(lg + ("columns",)), ["Year", "USA", "Europe"])
claim("c", "ledger rows", len(Sc.get(lg + ("rows",))), 10)
rowT = Sc.get(lg + ("rowT",))
for i, y in enumerate(range(C_Y0, C_Y1 + 1)):
    Sc.s(lg + ("rows", i, 0), str(y))
    Sc.s(lg + ("rows", i, 1), pct_signed2(SP[y]))
    Sc.s(lg + ("rows", i, 2), pct_signed2(EU[y]))
    Sc.v(lg + ("rowT", i), C["tl"][y], tol=0.006, what=f"ledger rowT[{i}] = {y} close lands")
# spoken-number sync (the Live Sheet's ledger is ONE row showing the latest year, replaced at each rowT)
shown_while_said(Sc, 1, f"≈ {C['drop18']}%", rowT[2], rowT[3], "the 2018 ledger row (−14.86%)")
shown_while_said(Sc, 4, f"≈ {C['jump25']}%", rowT[9], Sc.d["duration"], "the 2025 ledger row (+35.41%)")
shown_while_said(Sc, 4, f"≈ {C['us25']}%", rowT[9], Sc.d["duration"], "the 2025 ledger row (+17.88%)")
eu_max = max(val_at(C_eu_pts, x_of(vo_t(Sc, 3) + k * 0.01, C_RACE, C_Y0, C["x1"])) for k in range(int(Sc.d["vo"][3]["d"] * 100) + 1))
claim("c", "sync: 'Still under $17,000' holds on the Europe tip for the whole line", round(eu_max, 2), f"< {C['eu_cap']:,}", ok=eu_max < C["eu_cap"])
claim("c", "'Still under $17,000': every Europe year-end 2016-2024", round(max(C_eu[y] for y in range(2016, 2025)), 2), f"< {C['eu_cap']:,}",
      ok=max(C_eu[y] for y in range(2016, 2025)) < C["eu_cap"])
us_min = min(val_at(C_us_pts, x_of(vo_t(Sc, 2) + k * 0.01, C_RACE, C_Y0, C["x1"])) for k in range(int(Sc.d["vo"][2]["d"] * 100) + 1))
claim("c", "sync: 'the USA has doubled' holds on the USA tip for the whole line", round(us_min, 2), f">= {2 * C_STAKE:,}", ok=us_min >= 2 * C_STAKE)
claim("c", "the finals are said only after the race ends", vo_t(Sc, 5), f">= {C_RACE[1]}", ok=vo_t(Sc, 5) >= C_RACE[1])
sfx_on(Sc, [(C["tl"][2018], "thud"), (C["tl"][2020], "ding"), (19.1, "riser"), (C_RACE[1], "roll"), (Sc.d["verdict"]["t"], "ding")])
# the clock above (x.from at raceT[0], linear) is the kit's only when it opens without a preroll
claim("c", "lookOpts.preroll = 0 (the race sweeps x.from → x.to over raceT)", Sc.d["lookOpts"]["preroll"], 0)
# each final cell lands again as the VO names it
claim("c", "lookOpts.finalT = [vo[5] t, vo[6] t]", Sc.d["lookOpts"]["finalT"], [vo_t(Sc, 5), vo_t(Sc, 6)])
# what the words claim
claim("c", "'2020: the USA has doubled your money' (first year-end >= $20,000)", C["first_double_us"], 2020)
claim("c", "Europe first >= $20,000 only in 2025", C["first_double_eu"], 2025)
claim("c", "'The USA ≈ doubled twice' (log2 ×, a rounding: needs ≈)", round(C["dbl_us"], 3), "rounds to 2, below 2",
      ok=round(C["dbl_us"]) == 2 and C["dbl_us"] < 2 and "USA ≈ doubled twice" in Sc.d["vo"][7]["text"])
claim("c", "'Europe, once' (log2 ×: 1 completed doubling, rounds to 1)", round(C["dbl_eu"], 3), "1 <= x < 1.5", ok=1 <= C["dbl_eu"] < 1.5)
claim("c", "'Europe won 2025' (EU% > US%)", f"{EU[2025]} > {SP[2025]}", "", ok=EU[2025] > SP[2025])
claim("c", "'The USA won the decade'", f"{C_us[2025]:,.0f} > {C_eu[2025]:,.0f}", "", ok=C_us[2025] > C_eu[2025])
claim("c", "YCharts = MSCI factsheet, 2019-2025", all(YCHARTS_EU[y] == EU[y] for y in YCHARTS_EU), True)
claim("c", "DWS ETF within 1 pt of MSCI, 2016-2025", max(abs(DWS_EU[y] - EU[y]) for y in EU), "<= 1.0",
      ok=max(abs(DWS_EU[y] - EU[y]) for y in EU) <= 1.0)
for u in Sc.uncovered():
    claim("c", "uncovered string with a digit", u, "covered", ok=False)

# ============================================================== write-up quotes the same numbers
if os.path.exists(WRITEUP):
    with open(WRITEUP, encoding="utf-8") as f:
        md = f.read()
    must = [
        ("a", A["fin_sp"]), ("a", A["fin_au"]), ("a", f"≈ ×{A['m_sp10']:.1f}"), ("a", f"≈ ×{A['m_au10']:.1f}"),
        ("a", f"≈ {A['cagr_sp'] * 100:.1f}% a year"), ("a", f"≈ {A['cagr_au'] * 100:.1f}% a year"),
        ("a", usd_sig(A_alt[2025])), ("a", f"≈ ×{sig(A['m_au']):.1f} for gold"), ("a", f"≈ ×{sig(A['m_sp']):.2f} for the S&P 500"),
        ("b", B["fin_sp"]), ("b", B["fin_sv"]), ("b", usd_round(B["need"])), ("b", B["real_disp"]), ("b", f"{B_sv[2025]:,.2f}"),
        ("b", usd_round(B["sv_hi"])), ("b", f"≈ {B['lost']}%"), ("b", f"{B['sv_hi']:,.2f}"),
        ("b", f"≈ ×{sig(B['m_sp']):.2f}"), ("b", f"≈ ×{sig(B['m_sv']):.2f}"), ("b", f"≈ {B['cum_rate']:.1f}%"),
        ("b", B["y1_disp"]), ("b", f"${B['y1']:,.2f}"), ("b", f"${B['int16']:,.2f}"), ("b", f"under ${B['int_cap']}"),
        ("b", f"{B['cagr_sp'] * 100:.2f}%"), ("b", f"${int_lo:,.2f}-${int_hi:,.2f}"),
        ("c", C["fin_us"]), ("c", C["fin_eu"]), ("c", f"≈ {C['cagr_us'] * 100:.1f}%"), ("c", f"≈ {C['cagr_eu'] * 100:.1f}%"),
        ("c", f"≈ ×{sig(C['m_us']):.2f} vs ≈ ×{sig(C['m_eu']):.2f}"),
        ("-", "## Review log"),
    ]
    for k, s in must:
        claim(k, f"write-up quotes '{s}'", s in md, True)
    stale = ["$1,077.97", "(exact, no ≈)", "now buys", "The USA doubled twice", "× 15.0 for gold", "× 8.28 for",
             "× 3.98 vs × 2.27", "Europe? ≈ $13,900", "Savings has earned ≈ $6", "(0.04%–0.47%)", "Twice the USA's year",
             "10 ledger rows", "One extra doubling.", "≈ $1,024", "≈ $682", "≈ +$8", "× 1.024"]
    for s in stale:
        claim("-", f"write-up has no stale '{s}'", s in md, False)
    # the 04b section itself (the review log may quote the old hooks): no text left from the pre-pass-2 hook
    sec_b = md[md.find("### 04b"):md.find("### 04c")]
    claim("b", "write-up has a 04b section", len(sec_b) > 0, True)
    for s in ["never had a down year", "Which One Lost", '"safe" savings', "Under $10 of interest", "doubled it",
              "t 1.0 → 25.0", "1.0-6.99", "41.5-44.5"]:
        claim("b", f"04b section has no stale '{s}'", s in sec_b, False)
    claim("b", "04b section quotes the new header", "Your **$1,000**: 16 years of savings" in sec_b, True)
else:
    claim("-", "write-up exists", WRITEUP, "exists", ok=False)

# ============================================================== report
w1 = max(len(r[1]) for r in ROWS)
print(f"{'':2} {'id':2}  {'check':<{w1}}  {'spec / computed':<40}  expected")
for tid, what, got, want, ok in ROWS:
    g = got if len(got) <= 40 else got[:37] + "..."
    print(f"{'ok' if ok else 'XX'} {tid:2}  {what:<{w1}}  {g:<40}  {want if not ok or want else ''}")
print()
print("04a  S&P 500", A["fin_sp"], f"(×{A['m_sp']:.4f})", "| gold", A["fin_au"], f"(×{A['m_au']:.4f})",
      f"| ratio {A['ratio']:.3f} | 2010 start: S&P ×{A['m_sp10']:.2f}, gold ×{A['m_au10']:.2f}",
      f"| frame 1 x {x_f1:.3f}: S&P {val_at(A_sp_pts, x_f1):,.0f}, gold {val_at(A_au_pts, x_f1):,.0f}")
print("04b  S&P 500", B["fin_sp"], "| savings", B["fin_sv"], f"({B_sv[2025]:.2f})", f"| year 1 {B['y1']:.2f} vs 16-yr interest",
      f"{B['int16']:.2f} (sweep {int_lo:.2f}-{int_hi:.2f}) | frame 1 x {x_f1b:.4f}", f"| prices ×{B['infl']:.5f}",
      f"| real savings {B['real_sv']:.2f} | lost {(1 - B['real_sv'] / B_STAKE) * 100:.2f}% | max-rate {B['sv_hi']:.2f}",
      f"| interest by {EARN_WIN[1]:.1f} s: {earn_max:.2f} | FDIC sweep {sweep} tables")
print("04c  USA", C["fin_us"], "| Europe", C["fin_eu"], f"| {C['cagr_us'] * 100:.2f}% vs {C['cagr_eu'] * 100:.2f}% a year",
      f"| log2 {C['dbl_us']:.3f} / {C['dbl_eu']:.3f} | 2025 ratio {C['ratio25']:.3f}")
print(f"\n{len(ROWS)} checks, {FAILS} failed")
sys.exit(1 if FAILS else 0)
