#!/usr/bin/env python3
"""Math + spec check for format 4, "chart-race" (teasers 04a, 04b, 04c).

1. Recomputes every on-screen number from its sourced inputs (below, each with its source).
2. Loads the three spec JSONs and asserts that
   - every display string (finals, stake, labels, footer steps, formula steps, ledger cells, verdict)
     equals the string rebuilt here from the computed values, character for character;
   - every chart point equals the computed value (x to 0.01, value to the cent);
   - every number inside every VO line equals the computed, formatted value, in order
     (rounded values carry "≈", exact ones don't);
   - every string anywhere in a spec that contains a digit is covered by a check;
   - VO timing fits ~2.6 spoken words per second (numbers expanded into spoken words), lines don't
     overlap and end inside the video; each VO line that names a year starts while that year's
     segment of the race is being drawn (on the chart's x -> t clock, -0.3 s / +0.6 s); event flags,
     footer/formula steps, figure beats and sfx sit on the beat they belong to;
   - header <= 15 words with a $ number at t = 0, captions on, duration in the 25-50 s lane;
   - the claims the VO makes in words ("still behind", "doubled", "twice") hold in the data;
   - robustness: the verdicts survive the second source's numbers.
3. Checks that the write-up quotes the same numbers (captions, pinned comments).
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/04-chart-race.py
"""
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
# value (27.2%) matches Macrotrends' 2024 close $2,624.60 (+27.23%).
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

# FDIC national average savings rate (APY, %), the January reading of each year. Known: 2010 0.21,
# 2012 0.11, 2014 0.06, 2016 0.06, 2018 0.06, 2020 0.09 (Forbes Advisor "History of Savings Account
# Interest Rates" / wealthvieu "Savings Account Interest Rate History"), 2022 0.06 (FDIC National Rates
# and Rate Caps, 2022-01-18), 2023 0.33, 2024 0.47, 2025 0.41 (search summary of FDIC monthly values),
# 2021 0.04 (the reported 2021 low). Not found: 2011, 2013, 2015, 2017, 2019 -> midpoint of the two
# neighbouring Januaries (an assumption, stated in the write-up).
FDIC_KNOWN = {2010: 0.21, 2012: 0.11, 2014: 0.06, 2016: 0.06, 2018: 0.06, 2020: 0.09, 2021: 0.04,
              2022: 0.06, 2023: 0.33, 2024: 0.47, 2025: 0.41}
FDIC_INTERP = [2011, 2013, 2015, 2017, 2019]

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

# The teasers' own settings
A_STAKE, A_Y0, A_Y1, A_RACE = 10_000, 2000, 2025, (0.6, 32.6)
B_STAKE, B_Y0, B_Y1, B_RACE = 1_000, 2010, 2025, (1.0, 25.0)
C_STAKE, C_Y0, C_Y1, C_RACE = 10_000, 2016, 2025, (1.0, 21.0)
DUR = {"a": 46.5, "b": 42.0, "c": 36.5}

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


# ============================================================== models

def grow(rates, y0, y1, stake):
    v, vals, pts = float(stake), {y0 - 1: float(stake)}, [(float(y0), float(stake))]
    for y in range(y0, y1 + 1):
        v *= 1 + rates[y] / 100
        vals[y] = v
        pts.append((ye(y), round(v, 2)))
    return vals, pts


# ---- 04a: S&P 500 vs gold, $10,000 each at the Dec 31, 1999 close
GOLD_A = dict(GOLD)
GOLD_A[2025] = (GOLD_CLOSE_2025 / GOLD_CLOSE_2024 - 1) * 100
A_sp, A_sp_pts = grow(SP, A_Y0, A_Y1, A_STAKE)
A_au, A_au_pts = grow(GOLD_A, A_Y0, A_Y1, A_STAKE)
A = {}
A["m_sp"], A["m_au"] = A_sp[2025] / A_STAKE, A_au[2025] / A_STAKE
A["fin_sp"], A["fin_au"] = usd_sig(A_sp[2025]), usd_sig(A_au[2025])
A["dd02"] = int_round((1 - A_sp[2002] / A_STAKE) * 100)          # stocks down by end-2002
A["up02"] = int_round((A_au[2002] / A_STAKE - 1) * 100)          # gold up by end-2002
A["ratio"] = A["m_au"] / A["m_sp"]
A["dbl_sp"], A["dbl_au"] = math.log2(A["m_sp"]), math.log2(A["m_au"])
A["x1"] = ye(A_Y1)
A["tl"] = {y: t_of(ye(y), A_RACE, A_Y0, A["x1"]) for y in range(A_Y0, A_Y1 + 1)}
A["ts"] = {y: t_of(ye(y - 1) if y > A_Y0 else A_Y0, A_RACE, A_Y0, A["x1"]) for y in range(A_Y0, A_Y1 + 1)}
# second gold source, its years swapped in
GOLD_ALT = dict(GOLD_A)
GOLD_ALT.update(GOLD_B)
A_alt, _ = grow(GOLD_ALT, A_Y0, A_Y1, A_STAKE)
# pinned comment: start in 2010 instead
A["m_sp10"] = A_sp[2025] / A_sp[2009]
A["m_au10"] = A_au[2025] / A_au[2009]
A["cagr_sp"], A["cagr_au"] = A["m_sp"] ** (1 / 26) - 1, A["m_au"] ** (1 / 26) - 1

# ---- 04b: savings account vs S&P 500, $1,000 each at the Dec 31, 2009 close
FDIC = dict(FDIC_KNOWN)
for y in FDIC_INTERP:
    FDIC[y] = (FDIC_KNOWN[y - 1] + FDIC_KNOWN[y + 1]) / 2
B_sp, B_sp_pts = grow(SP, B_Y0, B_Y1, B_STAKE)
B_sv, B_sv_pts = grow(FDIC, B_Y0, B_Y1, B_STAKE)
B = {}
B["fin_sp"], B["fin_sv"] = usd_sig(B_sp[2025]), usd_round(B_sv[2025])
B["earned14"] = B_sv[2014] - B_STAKE
B["drop22"] = int_round(abs(SP[2022]))
B["infl"] = CPI_DEC25 / CPI_DEC09
B["infl_pct"] = int_round((B["infl"] - 1) * 100)
B["need"] = B_STAKE * B["infl"]                                 # $1,000 of Dec-2009 prices, in Dec-2025 $
B["real_sv"] = B_sv[2025] / B["infl"]                          # savings balance in Dec-2009 dollars
B["lost"] = int_round((1 - B["real_sv"] / B_STAKE) * 100)
B["x1"] = ye(B_Y1)
B["tl"] = {y: t_of(ye(y), B_RACE, B_Y0, B["x1"]) for y in range(B_Y0, B_Y1 + 1)}
B["ts"] = {y: t_of(ye(y - 1) if y > B_Y0 else B_Y0, B_RACE, B_Y0, B["x1"]) for y in range(B_Y0, B_Y1 + 1)}
B["sv_hi"] = B_STAKE * (1 + max(FDIC.values()) / 100) ** 16
B["sv_lo"] = B_STAKE * (1 + min(FDIC.values()) / 100) ** 16
B["m_sp"] = B_sp[2025] / B_STAKE

# ---- 04c: USA (S&P 500) vs Europe (MSCI Europe net, USD), $10,000 each at the Dec 31, 2015 close
C_us, C_us_pts = grow(SP, C_Y0, C_Y1, C_STAKE)
C_eu, C_eu_pts = grow(EU, C_Y0, C_Y1, C_STAKE)
C = {}
C["m_us"], C["m_eu"] = C_us[2025] / C_STAKE, C_eu[2025] / C_STAKE
C["fin_us"], C["fin_eu"] = usd_sig(C_us[2025]), usd_sig(C_eu[2025])
C["drop18"] = int_round(abs(EU[2018]))
C["eu20"] = usd_sig(C_eu[2020])
C["jump25"] = int_round(EU[2025])
C["ratio25"] = EU[2025] / SP[2025]
C["cagr_us"], C["cagr_eu"] = C["m_us"] ** 0.1 - 1, C["m_eu"] ** 0.1 - 1
C["dbl_us"], C["dbl_eu"] = math.log2(C["m_us"]), math.log2(C["m_eu"])
C["x1"] = ye(C_Y1)
C["tl"] = {y: t_of(ye(y), C_RACE, C_Y0, C["x1"]) for y in range(C_Y0, C_Y1 + 1)}
C["ts"] = {y: t_of(ye(y - 1) if y > C_Y0 else C_Y0, C_RACE, C_Y0, C["x1"]) for y in range(C_Y0, C_Y1 + 1)}
C["first_double_us"] = min(y for y in range(C_Y0, C_Y1 + 1) if C_us[y] >= 2 * C_STAKE)
C["first_double_eu"] = min(y for y in range(C_Y0, C_Y1 + 1) if C_eu[y] >= 2 * C_STAKE)

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


ACRONYMS = {"S&P": 3, "USA": 3, "USA's": 3, "FDIC": 4}


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
    claim(k, "verdict after the last caption clears (no overlap)", d["verdict"]["t"], "",
          ok=all(not (v["t"] < d["verdict"]["t"] < v["t"] + v["d"]) for v in vo) or k != "a")


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


def year_sync(S, M, start_year):
    """each VO line that names a year (other than the stake year in line 0) starts while that
    year's segment is drawn; returns {year: vo t}"""
    seen = {}
    for i, line in enumerate(S.d["vo"]):
        years = [int(y) for y in re.findall(r"\b(20[0-3]\d)\b", line["text"])]
        for y in years:
            if i == 0 and y == start_year:
                claim(S.key, f"vo[0] names the stake year {y} at t=0", line["t"], 0.0)
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


# ============================================================== 04a
Sa = Spec("a")
common(Sa)
Sa.n(("header",), ["2000", "$10,000"])
Sa.n(("footer",), ["2000", "2025"])
Sa.s(("data", "stake"), f"${A_STAKE:,} each · Jan {A_Y0}")
chart(Sa, A_RACE, A_Y0, A["x1"], [A_sp_pts, A_au_pts], [A["fin_sp"], A["fin_au"]], ["S&P 500", "Gold"])
claim("a", "x tickEvery", Sa.d["data"]["x"]["tickEvery"], 5)
vo_numbers(Sa, [
    [f"${A_STAKE:,}", str(A_Y0)],
    [],
    ["2002", f"≈ −{A['dd02']}%", f"≈ +{A['up02']}%"],
    ["2008"],
    ["2013", f"{abs(GOLD[2013]):.0f}%"],
    [],
    ["2021"],
    ["2025", A["fin_sp"]],
    [A["fin_au"]],
    [f"≈ {round(A['dbl_au'])}", f"≈ {round(A['dbl_sp'])}"],
])
seen_a = year_sync(Sa, A, A_Y0)
events(Sa, A, A_RACE, A_Y0, A["x1"], [(2001.0, "Dot-com crash", False), (2008.75, "2008 crash", True),
                                     (2013.3, f"Gold −{abs(GOLD[2013]):.0f}%", True), (2022.5, "2022 bear market", False)], seen_a)
Sa.s(("verdict", "text"), f"Gold ended **≈ {round(A['ratio'])}×** the S&P 500.\nOne extra doubling.")
claim("a", "verdict lands after the last VO line", Sa.d["verdict"]["t"], "",
      ok=Sa.d["verdict"]["t"] >= vo_t(Sa, 9) + Sa.d["vo"][9]["d"])
fs = ("lookOpts", "footerSteps")
claim("a", "lookOpts.stakeLine", Sa.d["lookOpts"]["stakeLine"], A_STAKE)
Sa.s(fs + (0, "text"), f"${A_STAKE:,} × {sig(A['m_sp']):.2f} {A['fin_sp']}")
Sa.s(fs + (1, "text"), f"${A_STAKE:,} × {sig(A['m_au']):.1f} {A['fin_au']}")
Sa.s(fs + (2, "text"), f"×{sig(A['m_au']):.1f} ≈ {A['dbl_au']:.1f} doublings · ×{sig(A['m_sp']):.2f} ≈ {A['dbl_sp']:.1f}")
for i, j in ((0, 7), (1, 8), (2, 9)):
    claim("a", f"footerStep[{i}] t = vo[{j}] t", Sa.get(fs + (i, "t")), vo_t(Sa, j))
claim("a", "footerStep 0 arithmetic", round(A_STAKE * sig(A["m_sp"])), round(sig(A_sp[2025])))
claim("a", "footerStep 1 arithmetic", round(A_STAKE * sig(A["m_au"])), round(sig(A_au[2025])))
sfx_on(Sa, [(A["tl"][2002], "thud"), (A["tl"][2008], "thud"), (A["tl"][2013], "hit"), (32.6, "roll"),
            (vo_t(Sa, 8), "cash"), (Sa.d["verdict"]["t"], "ding")])
claim("a", "final roll on the race end", A_RACE[1], A["tl"][2025], ok=abs(A_RACE[1] - A["tl"][2025]) < 1e-9)
# what the words claim
claim("a", "'Stocks should win' is then wrong: gold ahead at all 26 year-ends", sum(A_au[y] > A_sp[y] for y in range(2000, 2026)), 26)
claim("a", "'2008: stocks crash again'", SP[2008], "< 0", ok=SP[2008] < 0)
claim("a", "'Gold keeps climbing' in 2008", GOLD_A[2008], "> 0", ok=GOLD_A[2008] > 0)
claim("a", "'close in' 2013 -> 2021 (S&P/gold)", f"{A_sp[2013] / A_au[2013]:.2f} -> {A_sp[2021] / A_au[2021]:.2f}", "rising",
      ok=A_sp[2021] / A_au[2021] > A_sp[2013] / A_au[2013])
claim("a", "'2021: still behind'", f"{A_sp[2021]:,.0f} < {A_au[2021]:,.0f}", "", ok=A_sp[2021] < A_au[2021])
claim("a", "'one extra doubling' = log2 gap", round(A["dbl_au"] - A["dbl_sp"], 2), "≈ 1", ok=round(A["dbl_au"] - A["dbl_sp"]) == 1)
claim("a", "gold 2025 close-to-close %", round(GOLD_A[2025], 2), 64.57, ok=abs(GOLD_A[2025] - 64.58) < 0.02)
claim("a", "robust: 2nd gold source keeps '≈ 2×'", f"{A_alt[2025]:,.0f} → ×{A_alt[2025] / A_sp[2025]:.2f}", "rounds to 2",
      ok=round(A_alt[2025] / A_sp[2025]) == 2)
claim("a", "implied 1999 gold close ≈ $288 (sanity)", round(GOLD_CLOSE_2024 / (A_au[2024] / A_STAKE), 2), "285-292",
      ok=285 <= GOLD_CLOSE_2024 / (A_au[2024] / A_STAKE) <= 292)
for u in Sa.uncovered():
    claim("a", "uncovered string with a digit", u, "covered", ok=False)

# ============================================================== 04b
Sb = Spec("b")
common(Sb)
Sb.n(("header",), ["2", f"${B_STAKE:,}", str(B_Y0)])
Sb.n(("footer",), [f"{min(FDIC.values()):.2f}%", f"{max(FDIC.values()):.2f}%", str(B_Y0), str(B_Y1)])
Sb.s(("data", "stake"), f"${B_STAKE:,} each · Jan {B_Y0}")
chart(Sb, B_RACE, B_Y0, B["x1"], [B_sp_pts, B_sv_pts], [B["fin_sp"], B["fin_sv"]], ["S&P 500", "Savings account"])
claim("b", "x tickEvery", Sb.d["data"]["x"]["tickEvery"], 5)
earned = usd_round(B["earned14"])
vo_numbers(Sb, [
    [f"${B_STAKE:,}", str(B_Y0)],
    [],
    ["2014"],
    [earned],
    ["2022", f"≈ {B['drop22']}%"],
    ["2025", B["fin_sp"]],
    [B["fin_sv"]],
    [f"≈ {B['infl_pct']}%"],
    [B["fin_sv"], usd_round(B["real_sv"])],
])
seen_b = year_sync(Sb, B, B_Y0)
events(Sb, B, B_RACE, B_Y0, B["x1"], [(2020.2, "COVID", False), (2022.5, "2022 bear market", True)], seen_b)
Sb.s(("verdict", "text"), f"The \"safe\" choice lost **≈ {B['lost']}%**\nof its buying power.")
claim("b", "verdict t = vo[8] t", Sb.d["verdict"]["t"], vo_t(Sb, 8))
bt = ("lookOpts", "beats")
want_beats = [
    (8.5, "cheer", "doubled", 2), (12.5, "shrug", "≈ +" + earned.replace("≈ ", ""), 3),
    (20.5, "impact", f"≈ −{B['drop22']}%", 4), (25.0, "grow", None, 5),
    (31.9, "flood", f"prices ≈ +{B['infl_pct']}%", 7), (34.4, "peek", f"{usd_round(B['need'])} now = ${B_STAKE:,} in {B_Y0}", 8),
]
claim("b", "figure beat count", len(Sb.get(bt)), len(want_beats))
for i, (t, act, label, j) in enumerate(want_beats):
    claim("b", f"beat[{i}] {act} t = vo[{j}] t", Sb.get(bt + (i, "t")), vo_t(Sb, j), ok=Sb.get(bt + (i, "t")) == t == vo_t(Sb, j))
    claim("b", f"beat[{i}] act", Sb.get(bt + (i, "act")), act)
    if label is not None:
        Sb.s(bt + (i, "label"), label)
Sb.v(bt + (4, "to"), B["need"], tol=0.006, what="flood rises to $1,000 × CPI ratio")
Sb.n(("lookOpts", "gag"), ["2018", "2022", f"${B_STAKE:,}"])
claim("b", "beat 'doubled' lands as 2014 closes", Sb.get(bt + (0, "t")), f"{B['tl'][2014]:.2f}", ok=abs(Sb.get(bt + (0, "t")) - B["tl"][2014]) <= POST)
sfx_on(Sb, [(8.5, "pop"), (12.5, "boing"), (20.5, "hit"), (25.0, "roll"), (31.9, "whoosh"), (34.4, "buzz")])
# what the words claim
claim("b", "'2014: the S&P has doubled it' (first year-end >= $2,000)", min(y for y in range(2010, 2026) if B_sp[y] >= 2 * B_STAKE), 2014)
claim("b", "'2022: stocks drop' (S&P 2022 %)", SP[2022], "< 0", ok=SP[2022] < 0)
claim("b", "CPI ratio Dec-09 -> Dec-25", round(B["infl"], 4), 1.5006, ok=abs(B["infl"] - 1.5006) < 0.0001)
claim("b", "robust: savings at the max rate every year", usd_round(B["sv_hi"]), "S&P still ≥ 7×", ok=B_sp[2025] / B["sv_hi"] >= 7)
claim("b", "robust: savings at the min rate every year", usd_round(B["sv_lo"]), "still below prices", ok=B["sv_hi"] < B["need"])
for y in FDIC_INTERP:
    claim("b", f"FDIC {y} = midpoint of its neighbours (assumption)", round(FDIC[y], 4),
          f"({FDIC_KNOWN[y - 1]}+{FDIC_KNOWN[y + 1]})/2", ok=abs(FDIC[y] - (FDIC_KNOWN[y - 1] + FDIC_KNOWN[y + 1]) / 2) < 1e-12)
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
    [f"${C_STAKE:,}", str(C_Y0)],
    [],
    ["2018", f"≈ {C['drop18']}%"],
    ["2020"],
    [C["eu20"]],
    ["2025", f"≈ {C['jump25']}%"],
    [C["fin_us"]],
    [C["fin_eu"]],
    [],
])
seen_c = year_sync(Sc, C, C_Y0)
events(Sc, C, C_RACE, C_Y0, C["x1"], [(2018.9, "2018 sell-off", True), (2020.2, "COVID", False), (2022.5, "2022 bear market", False)], seen_c)
Sc.s(("verdict", "text"), f"Europe won **{C_Y1}**.\nThe USA won the **decade**.")
claim("c", "verdict t = vo[8] t", Sc.d["verdict"]["t"], vo_t(Sc, 8))
fm = ("lookOpts", "formulaSteps")
Sc.s(fm + (0, "text"), f"= ${C_STAKE:,} × (1 + each year's return)")
Sc.s(fm + (1, "text"), f"= ${C_STAKE:,} × {1 + SP[2016] / 100:.4f} · = ${C_STAKE:,} × {1 + EU[2016] / 100:.4f}")
Sc.s(fm + (2, "text"), f"≈ ${C_STAKE:,} × {sig(C['m_us']):.2f} · ≈ ${C_STAKE:,} × {sig(C['m_eu']):.2f}")
Sc.s(fm + (3, "text"), f"≈ {C['cagr_us'] * 100:.1f}% a year vs ≈ {C['cagr_eu'] * 100:.1f}% a year")
claim("c", "formulaStep[0] t", Sc.get(fm + (0, "t")), 0.0)
Sc.v(fm + (1, "t"), C["tl"][2016], tol=0.006, what="formulaStep[1] t = 2016 close lands")
Sc.v(fm + (2, "t"), C["tl"][2025], tol=0.006, what="formulaStep[2] t = race end")
claim("c", "formulaStep[3] t = verdict t", Sc.get(fm + (3, "t")), Sc.d["verdict"]["t"])
claim("c", "formula: ≈ ×3.98 → ≈ $39,800", f"{C_STAKE * sig(C['m_us']):,.0f}", C["fin_us"].replace("≈ $", ""))
claim("c", "formula: ≈ ×2.27 → ≈ $22,700", f"{C_STAKE * sig(C['m_eu']):,.0f}", C["fin_eu"].replace("≈ $", ""))
lg = ("lookOpts", "ledger")
claim("c", "ledger columns", Sc.get(lg + ("columns",)), ["Year", "USA", "Europe"])
claim("c", "ledger rows", len(Sc.get(lg + ("rows",))), 10)
for i, y in enumerate(range(C_Y0, C_Y1 + 1)):
    Sc.s(lg + ("rows", i, 0), str(y))
    Sc.s(lg + ("rows", i, 1), pct_signed2(SP[y]))
    Sc.s(lg + ("rows", i, 2), pct_signed2(EU[y]))
    Sc.v(lg + ("rowT", i), C["tl"][y], tol=0.006, what=f"ledger rowT[{i}] = {y} close lands")
sfx_on(Sc, [(C["tl"][2018], "thud"), (C["tl"][2020], "ding"), (19.1, "riser"), (21.0, "roll"), (31.4, "ding")])
# what the words claim
claim("c", "'2020: the USA has doubled your money' (first year-end >= $20,000)", C["first_double_us"], 2020)
claim("c", "Europe first >= $20,000 only in 2025", C["first_double_eu"], 2025)
claim("c", "'Twice the USA's year' (2025 EU% / US%)", round(C["ratio25"], 2), "1.9-2.1", ok=1.9 <= C["ratio25"] < 2.1)
claim("c", "'The USA doubled twice' (log2 ×)", round(C["dbl_us"], 2), "rounds to 2", ok=round(C["dbl_us"]) == 2)
claim("c", "'Europe, once' (log2 ×)", round(C["dbl_eu"], 2), "rounds to 1", ok=round(C["dbl_eu"]) == 1)
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
        ("a", A["fin_sp"]), ("a", A["fin_au"]), ("a", f"×{A['m_sp10']:.1f}"), ("a", f"×{A['m_au10']:.1f}"),
        ("a", f"≈ {A['cagr_sp'] * 100:.1f}% a year"), ("a", f"≈ {A['cagr_au'] * 100:.1f}% a year"),
        ("a", usd_sig(A_alt[2025])),
        ("b", B["fin_sp"]), ("b", B["fin_sv"]), ("b", usd_round(B["need"])), ("b", usd_round(B["real_sv"])),
        ("b", usd_round(B["sv_hi"])), ("b", f"≈ {B['lost']}%"),
        ("c", C["fin_us"]), ("c", C["fin_eu"]), ("c", f"≈ {C['cagr_us'] * 100:.1f}%"), ("c", f"≈ {C['cagr_eu'] * 100:.1f}%"),
    ]
    for k, s in must:
        claim(k, f"write-up quotes '{s}'", s in md, True)
else:
    claim("-", "write-up exists", WRITEUP, "exists", ok=False)

# ============================================================== report
w1 = max(len(r[1]) for r in ROWS)
print(f"{'':2} {'id':2}  {'check':<{w1}}  {'spec / computed':<40}  expected")
for tid, what, got, want, ok in ROWS:
    g = got if len(got) <= 40 else got[:37] + "..."
    print(f"{'ok' if ok else 'XX'} {tid:2}  {what:<{w1}}  {g:<40}  {want if not ok or want else ''}")
print()
print("04a  S&P 500", A["fin_sp"], f"(×{A['m_sp']:.3f})", "| gold", A["fin_au"], f"(×{A['m_au']:.3f})",
      f"| ratio {A['ratio']:.3f} | 2010 start: S&P ×{A['m_sp10']:.2f}, gold ×{A['m_au10']:.2f}")
print("04b  S&P 500", B["fin_sp"], "| savings", B["fin_sv"], f"| prices ×{B['infl']:.4f} | real savings {B['real_sv']:.2f}")
print("04c  USA", C["fin_us"], "| Europe", C["fin_eu"], f"| {C['cagr_us'] * 100:.2f}% vs {C['cagr_eu'] * 100:.2f}% a year")
print(f"\n{len(ROWS)} checks, {FAILS} failed")
sys.exit(1 if FAILS else 0)
