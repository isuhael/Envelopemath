#!/usr/bin/env python3
"""Math + spec check for format 6, "pov-race" (teasers 06a, 06b, 06c).

1. Recomputes every on-screen number from its inputs (below, each with its source).
2. Cross-checks the source tables against themselves (closes vs annual % change) and
   against the second source where one exists.
3. Loads the three spec JSONs and asserts that
   - every display string (header, footer, labels, finals, purchase ticks, verdict, lookOpts)
     equals the string rebuilt here from the computed values, character for character,
   - every chart point equals the computed value (x and y to the cent),
   - every number spoken in the VO equals the computed, formatted value, in order,
     and every rounded figure in the VO is preceded by "about",
   - every string in the spec that contains a digit is covered by one of those checks,
   - the hook rules the linter can't see: header <= 15 words with exactly one $ figure,
     a number in the header at t = 0, duration inside the 18-35 s lane for this format,
   - VO timing: each line's d >= words / 2.6, no overlaps, last line ends before the end,
   - beat sync: each beat a VO line mentions lands (on the chart's x -> t clock) inside
     that line's window, +/- 0.3 s; every sfx cue sits on its beat.
4. Prints a table and exits 1 on any mismatch.

Run:  python3 teasers/v2/checks/06-pov-race.py
"""
import calendar
import datetime as dt
import json
import math
import os
import re
import sys
from decimal import Decimal, ROUND_HALF_UP

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))
SPECS = os.path.join(ROOT, "studio", "specs")
WPS = 2.6            # VO read speed, words per second
LANE = (18.0, 35.0)  # duration lane for pov-race (task brief)
BEAT_TOL = 0.3       # s: a mentioned beat must land inside its VO line's window +/- this

IDS = {
    "a": "06a-scoreboard-first-iphone-apple",
    "b": "06b-live-sheet-netflix-bill",
    "c": "06c-becker-rig-latte-starbucks",
}

# =====================================================================================
# INPUTS (all verified by web search on 2026-10-07; publisher + URL in the write-up)
# =====================================================================================

# ---- 06a: the first iPhone vs Apple stock -------------------------------------------
# Apple Newsroom, "iPhone Premieres This Friday Night at Apple Retail Stores", 2007-06-28:
# on sale Fri June 29, 2007 at 6 p.m.; 4GB $499, 8GB $599. Same prices in Apple Newsroom,
# "Apple Reinvents the Phone with iPhone", 2007-01-09.
IPHONE_PRICE = 499
IPHONE_GB = 4
LAUNCH = dt.date(2007, 6, 29)
VALUE_DATE = dt.date(2025, 12, 31)
# StatMuse Money, AAPL closes (split- and dividend-adjusted): 2007-06-29 $3.66, 2007-12-31 $5.92.
# Apple paid no dividend between 1995 and 2012, so the ratio of these two adjusted closes is the
# same on any adjustment basis: it carries the launch-day price onto Macrotrends' basis.
SM_AAPL_LAUNCH = 3.66
SM_AAPL_YE2007 = 5.92
SM_AAPL_YE2025 = 271.36          # StatMuse, 2025-12-31 close (cross-check only)
# Macrotrends, "Apple - 45 Year Stock Price History | AAPL" (adjusted for splits and dividends):
# year close and annual % change.
MT_AAPL_CLOSE = {2007: 5.97, 2008: 2.57, 2009: 6.36, 2010: 9.73, 2011: 12.21, 2012: 16.06,
                 2013: 17.35, 2014: 24.40, 2015: 23.67, 2016: 26.62, 2017: 39.52, 2018: 37.39,
                 2019: 70.66, 2020: 128.82, 2021: 173.45, 2022: 127.65, 2023: 190.21,
                 2024: 248.62, 2025: 271.12}
# The search returned the 2007-2011 rows on an older adjustment basis than the 2012+ rows: the
# 2012 % change (32.57%) can't be reproduced from 12.21 -> 16.06 (31.53%). StatMuse's 2007 close
# ($5.92) is the bridge: rescaling 2007-2011 by 5.92 / 5.97 makes 2012 reproduce (checked below),
# and puts the launch-day close ($3.66, same StatMuse basis) on the 2012+ basis directly.
AAPL_OLD_BASIS = range(2007, 2012)
MT_AAPL_CHG = {2008: -56.91, 2009: 146.91, 2010: 53.07, 2011: 25.56, 2012: 32.57, 2013: 8.07,
               2014: 40.62, 2015: -3.01, 2016: 12.48, 2017: 48.46, 2018: -5.39, 2019: 88.96,
               2020: 82.31, 2021: 34.65, 2022: -26.40, 2023: 49.01, 2024: 30.71, 2025: 9.05}

# ---- 06b: the Netflix bill vs Netflix stock -----------------------------------------
# US Standard plan list price for new members, (year, month it took effect, $/month).
# Android Authority "A 94% increase: A timeline of Netflix price hikes" (Jul 2011 $7.99, May 2014
# $8.99, Oct 2015 $9.99, Oct 2017 $10.99, Jan 2019 $12.99, Oct 2020 $13.99, Jan 2022 $15.49,
# Jan 2025 $17.99); Variety 2019-01-15 ($10.99 -> $12.99); CNBC 2025-01-21 ($15.49 -> $17.99);
# Android Police, flixed.io, Tom's Guide for the rest. Rule: a new price counts from the
# month it was announced.
NFLX_PLAN = [(2012, 1, 7.99), (2014, 5, 8.99), (2015, 10, 9.99), (2017, 10, 10.99),
             (2019, 1, 12.99), (2020, 10, 13.99), (2022, 1, 15.49), (2025, 1, 17.99)]
NFLX_START, NFLX_END = 2012, 2025
# Macrotrends, "Netflix - 24 Year Stock Price History | NFLX" (split-adjusted; Netflix pays no
# dividend): average close of the year, year close, annual % change.
MT_NFLX_AVG = {2012: 1.19, 2013: 3.53, 2014: 5.75, 2015: 9.19, 2016: 10.20, 2017: 16.54,
               2018: 31.93, 2019: 32.89, 2020: 44.68, 2021: 55.82, 2022: 28.46, 2023: 39.02,
               2024: 67.15, 2025: 109.71}
MT_NFLX_CLOSE = {2011: 0.99, 2012: 1.33, 2013: 5.26, 2014: 4.88, 2015: 11.44, 2016: 12.38,
                 2017: 19.20, 2018: 26.77, 2019: 32.36, 2020: 54.07, 2021: 60.24, 2022: 29.49,
                 2023: 48.69, 2024: 89.13, 2025: 93.76}
MT_NFLX_CHG = {2012: 33.62, 2013: 297.64, 2014: -7.22, 2015: 134.38, 2016: 8.24, 2017: 55.06,
               2018: 39.44, 2019: 20.89, 2020: 67.11, 2021: 11.41, 2022: -51.05, 2023: 65.11,
               2024: 83.07, 2025: 5.19}
SM_NFLX_YE2025 = 93.76           # StatMuse, 2025-12-31 close (second source)

# ---- 06c: a $4 latte a day vs Starbucks stock ---------------------------------------
# FinanceBuzz menu-price analysis (archived menus via the Wayback Machine), charted by Visual
# Capitalist, "Charted: Starbucks Price Inflation (2014-2024)": grande caffe latte $3.65 (2014),
# $4.45 (2024). One dataset, so the stake is a round $4 inside that bracket, not a precise price.
LATTE_STAKE = 4.00
FB_LATTE_2014 = 3.65
FB_LATTE_2024 = 4.45
SBUX_START, SBUX_END = 2014, 2025
# Macrotrends, "Starbucks - 34 Year Stock Price History | SBUX" (adjusted for splits and
# dividends): average close of the year, year close, annual % change. (Two searches: 2014-2021
# and 2022-2026 rows; the 2021 -> 2022 seam reproduces the 2022 % change, so one basis.)
MT_SBUX_AVG = {2014: 30.40, 2015: 43.04, 2016: 46.31, 2017: 47.65, 2018: 48.87, 2019: 70.72,
               2020: 73.36, 2021: 100.98, 2022: 80.5685, 2023: 94.7216, 2024: 85.8583,
               2025: 89.5521}
MT_SBUX_CLOSE = {2014: 33.02, 2015: 48.77, 2016: 45.78, 2017: 48.23, 2018: 55.34, 2019: 76.97,
                 2020: 95.59, 2021: 106.24, 2022: 92.2427, 2023: 91.1495, 2024: 88.89,
                 2025: 84.21}
MT_SBUX_CHG = {2015: 47.67, 2016: -6.13, 2017: 5.36, 2018: 14.74, 2019: 39.09, 2020: 24.19,
               2021: 11.15, 2022: -13.18, 2023: -1.19, 2024: -2.48, 2025: -5.26}
ALT_SBUX_YE2025 = 82.71          # second search result for the 2025 year-end (later basis)

# =====================================================================================
# helpers
# =====================================================================================
FAIL = []
ROWS = []


def rnd(x, places=0):
    q = Decimal(1).scaleb(-places)
    return float(Decimal(repr(x)).quantize(q, rounding=ROUND_HALF_UP))


def sig(x, n=3):
    """round to n significant figures, half up"""
    e = int(math.floor(math.log10(abs(x))))
    step = Decimal(1).scaleb(e - n + 1)
    return float((Decimal(repr(x)) / step).quantize(Decimal(1), rounding=ROUND_HALF_UP) * step)


def usd(x, dp=0):
    return f"${rnd(x, dp):,.{dp}f}"


def approx_usd(x, n=3):
    return f"≈ ${sig(x, n):,.0f}"


def mult(x):
    """multiple as shown: 2 significant figures (73, 8.7, 1.4)"""
    v = sig(x, 2)
    return f"{v:.0f}" if v >= 10 else f"{v:.1f}"


def yearfrac(d):
    return d.year + (d.timetuple().tm_yday - 1) / (366 if calendar.isleap(d.year) else 365)


def ye(y):
    """x of a Dec-31 close: y + 0.99 (so a year counter that floors x still reads y)"""
    return rnd(y + 0.99, 2)


def cross_x(points, level, below):
    """first x where the polyline crosses `level` (going below if below=True, else above)"""
    for (x0, y0), (x1, y1) in zip(points, points[1:]):
        if (below and y0 >= level > y1) or (not below and y0 < level <= y1):
            return x0 + (level - y0) / (y1 - y0) * (x1 - x0)
    raise ValueError("no crossing")


def check(sid, field, shown, want, ok=None, why=""):
    if ok is None:
        ok = shown == want
    ROWS.append((sid, field, str(shown), str(want), ok))
    if not ok:
        FAIL.append(f"{sid} {field}: shown {shown!r} != computed {want!r} {why}")


# Known source quirk, documented in the write-up: Macrotrends' NFLX 2013 change (297.64%) needs a
# 2012 close of ~$1.3229, the search returned $1.33 (the 2012 change, 33.62%, also points to
# ~$1.323). Only the 2012 year-end chart point uses it (80.6 shares x $0.007 = $0.55); no display
# string does. Accepted with this note instead of silently widening every tolerance.
KNOWN_SOURCE_ROUNDING = {("NFLX", 2013): "2012 close returned as $1.33; % changes imply ~$1.323"}


def table_consistency(name, close, chg):
    """each annual % change must be reproducible from the 2-dp closes (within their rounding)"""
    bad = []
    for y, c in chg.items():
        if (name, y) in KNOWN_SOURCE_ROUNDING:
            check("src", f"{name} {y} % change (known quirk)", KNOWN_SOURCE_ROUNDING[(name, y)],
                  "noted", ok=True)
            continue
        if y - 1 not in close:
            continue
        c0, c1 = close[y - 1], close[y]
        h0 = 0.005 if c0 == rnd(c0, 2) else 0.00005
        h1 = 0.005 if c1 == rnd(c1, 2) else 0.00005
        lo = ((c1 - h1) / (c0 + h0) - 1) * 100 - 0.005
        hi = ((c1 + h1) / (c0 - h0) - 1) * 100 + 0.005
        if not lo <= c <= hi:
            bad.append(f"{y}: {c}% vs {lo:.2f}..{hi:.2f}%")
    check("src", f"{name} closes reproduce annual % change", "; ".join(bad) or "all years",
          "all years")


# =====================================================================================
# COMPUTE
# =====================================================================================
table_consistency("NFLX", MT_NFLX_CLOSE, MT_NFLX_CHG)
table_consistency("SBUX", MT_SBUX_CLOSE, MT_SBUX_CHG)

# ---------------------------------------------------------------- 06a
A = {}
A["k"] = SM_AAPL_YE2007 / MT_AAPL_CLOSE[2007]                            # old -> 2012+ basis
AAPL_CLOSE = {y: (c * A["k"] if y in AAPL_OLD_BASIS else c) for y, c in MT_AAPL_CLOSE.items()}
A["k_from_2012"] = MT_AAPL_CLOSE[2012] / (1 + MT_AAPL_CHG[2012] / 100) / MT_AAPL_CLOSE[2011]
check("src", "AAPL seam: 5.92/5.97 vs factor implied by 2012 % change (< 0.2%)",
      f"{A['k']:.5f} vs {A['k_from_2012']:.5f}", "< 0.2%", ok=abs(A["k_from_2012"] / A["k"] - 1) < 0.002)
# within each basis block the 2-dp closes must reproduce the % changes; the 2012 seam is the
# k check above (12.21 x k -> 16.06 must give 32.57%)
table_consistency("AAPL", MT_AAPL_CLOSE, {y: c for y, c in MT_AAPL_CHG.items() if y != 2012})
check("src", "AAPL 2012 % change across the bridged seam", f"{(AAPL_CLOSE[2012] / AAPL_CLOSE[2011] - 1) * 100:.2f}%",
      f"{MT_AAPL_CHG[2012]:.2f}% ± 0.15", ok=abs((AAPL_CLOSE[2012] / AAPL_CLOSE[2011] - 1) * 100 - MT_AAPL_CHG[2012]) <= 0.15)
A["buy_x"] = rnd(yearfrac(LAUNCH), 2)                                    # 2007.49
A["adj_buy"] = AAPL_CLOSE[2007] * SM_AAPL_LAUNCH / SM_AAPL_YE2007        # = 3.66 on the 2012+ basis
A["shares"] = IPHONE_PRICE / A["adj_buy"]                                # adjusted shares
A["own"] = [(A["buy_x"], float(IPHONE_PRICE))] + \
    [(ye(y), A["shares"] * AAPL_CLOSE[y]) for y in range(2007, 2026)]
A["spend"] = [(A["buy_x"], float(IPHONE_PRICE)), (ye(2025), float(IPHONE_PRICE))]
A["final"] = A["own"][-1][1]
A["mult"] = A["final"] / IPHONE_PRICE
A["years"] = (VALUE_DATE - LAUNCH).days / 365.25
A["doublings"] = math.log2(A["mult"])
A["yrs_per_doubling"] = A["years"] / A["doublings"]
A["x_below"] = cross_x(A["own"], IPHONE_PRICE, below=True)               # 2008 dip under $499
A["x_10k"] = cross_x(A["own"], 10_000, below=False)                      # passes $10,000
A["drop_2022"] = 1 - AAPL_CLOSE[2022] / AAPL_CLOSE[2021]
A["statmuse_only"] = IPHONE_PRICE * SM_AAPL_YE2025 / SM_AAPL_LAUNCH     # cross-check
check("06a", "launch-day close on the 2012+ basis", f"{A['adj_buy']:.4f}", "3.6600")
check("06a", "cross-check: StatMuse-only value within 0.5%",
      f"{A['statmuse_only']:,.0f} vs {A['final']:,.0f}", "≤ 0.5%",
      ok=abs(A["statmuse_only"] / A["final"] - 1) <= 0.005)
check("06a", "2022 drop is 'a quarter' (20-30%)", f"{A['drop_2022']:.3f}", "0.20-0.30",
      ok=0.20 <= A["drop_2022"] <= 0.30)
check("06a", "2008 dip under $499 happens in 2008", int(A["x_below"]), 2008)
check("06a", "passes $10,000 in 2020", int(A["x_10k"]), 2020)

# ---------------------------------------------------------------- 06b


def plan_price(y, m):
    p = None
    for (yy, mm, price) in NFLX_PLAN:
        if (y, m) >= (yy, mm):
            p = price
    return p


B = {"spend_y": {}, "shares_y": {}, "cum_spend": {}, "cum_shares": {}, "value": {}}
cs = csh = 0.0
for y in range(NFLX_START, NFLX_END + 1):
    sp = rnd(sum(plan_price(y, m) for m in range(1, 13)), 2)
    sh = sp / MT_NFLX_AVG[y]
    cs = rnd(cs + sp, 2)
    csh += sh
    B["spend_y"][y], B["shares_y"][y] = sp, sh
    B["cum_spend"][y], B["cum_shares"][y] = cs, csh
    B["value"][y] = csh * MT_NFLX_CLOSE[y]
P0 = NFLX_PLAN[0][2]
B["spend"] = [(float(NFLX_START), P0)] + [(ye(y), B["cum_spend"][y]) for y in range(NFLX_START, NFLX_END + 1)]
B["own"] = [(float(NFLX_START), P0)] + [(ye(y), B["value"][y]) for y in range(NFLX_START, NFLX_END + 1)]
B["final"] = B["value"][NFLX_END]
B["total"] = B["cum_spend"][NFLX_END]
B["mult"] = B["final"] / B["total"]
B["share_2012"] = B["shares_y"][2012] * MT_NFLX_CLOSE[NFLX_END] / B["final"]
B["x2013_ratio"] = MT_NFLX_CLOSE[2013] / MT_NFLX_CLOSE[2012]
B["drop_2022"] = 1 - B["value"][2022] / B["value"][2021]
B["ticks"] = [(rnd(y + (m - 1) / 12, 2), f"{calendar.month_abbr[m]} {y}", usd(p, 2))
              for (y, m, p) in NFLX_PLAN]
B["spend_2015"] = B["spend_y"][2015]
m_old_2015 = sum(1 for m in range(1, 13) if plan_price(2015, m) == 8.99)
check("06b", "2013 'quadruples' (stock x3.5-4.5)", f"{B['x2013_ratio']:.3f}", "3.5-4.5",
      ok=3.5 <= B["x2013_ratio"] <= 4.5)
check("06b", "2022 'halves' (stake down 45-55%)", f"{B['drop_2022']:.3f}", "0.45-0.55",
      ok=0.45 <= B["drop_2022"] <= 0.55)
check("06b", "2020 stake 'over $9,000' (9,000-9,999)", f"{B['value'][2020]:,.2f}", "9,000-9,999",
      ok=9000 < B["value"][2020] < 10000)
check("06b", "2012's bills 'almost half' (40-50%)", f"{B['share_2012']:.3f}", "0.40-0.50",
      ok=0.40 <= B["share_2012"] < 0.50)
check("06b", "second source: 2025 close", SM_NFLX_YE2025, MT_NFLX_CLOSE[2025])

# ---------------------------------------------------------------- 06c
C = {"spend_y": {}, "cum_spend": {}, "value": {}}
cs = csh = 0.0
for y in range(SBUX_START, SBUX_END + 1):
    days = 366 if calendar.isleap(y) else 365
    sp = rnd(LATTE_STAKE * days, 2)
    cs = rnd(cs + sp, 2)
    csh += sp / MT_SBUX_AVG[y]
    C["spend_y"][y], C["cum_spend"][y] = sp, cs
    C["value"][y] = csh * MT_SBUX_CLOSE[y]
C["spend"] = [(float(SBUX_START), LATTE_STAKE)] + [(ye(y), C["cum_spend"][y]) for y in range(SBUX_START, SBUX_END + 1)]
C["own"] = [(float(SBUX_START), LATTE_STAKE)] + [(ye(y), C["value"][y]) for y in range(SBUX_START, SBUX_END + 1)]
C["final"] = C["value"][SBUX_END]
C["total"] = C["cum_spend"][SBUX_END]
C["mult"] = C["final"] / C["total"]
C["per_year"] = LATTE_STAKE * 365
C["x2021"] = C["value"][2021] / C["cum_spend"][2021]
C["since2021_in"] = C["total"] - C["cum_spend"][2021]
C["since2021_gain"] = C["final"] - C["value"][2021]
C["alt_final"] = C["final"] * ALT_SBUX_YE2025 / MT_SBUX_CLOSE[2025]
check("06c", "$4 sits inside the latte bracket", f"{FB_LATTE_2014} ≤ {LATTE_STAKE} ≤ {FB_LATTE_2024}",
      "true", ok=FB_LATTE_2014 <= LATTE_STAKE <= FB_LATTE_2024)
check("06c", "'doubled your money' by 2021 (x1.9-2.3)", f"{C['x2021']:.3f}", "1.9-2.3",
      ok=1.9 <= C["x2021"] <= 2.3)
check("06c", "cross-check: alt 2025 close moves final < 2%",
      f"{C['alt_final']:,.0f} vs {C['final']:,.0f}", "< 2%",
      ok=abs(C["alt_final"] / C["final"] - 1) < 0.02)
check("06c", "'climbs faster than the cups' until 2021",
      ", ".join(f"{C['value'][y] / C['cum_spend'][y]:.2f}" for y in range(2014, 2022)),
      "rising to 2021", ok=C["value"][2021] / C["cum_spend"][2021] == max(
          C["value"][y] / C["cum_spend"][y] for y in range(2014, 2026)))
check("06c", "'it stalls': 2021->2025 stake gain < 15% of new money",
      f"{C['since2021_gain']:,.0f} vs {C['since2021_in']:,.0f}", "< 15%",
      ok=C["since2021_gain"] < 0.15 * C["since2021_in"])

# =====================================================================================
# EXPECTED SPEC CONTENT
# =====================================================================================
EXP = {}

# ---- 06a
EXP["a"] = {
    "raceT": [2.4, 21.4], "x": {"from": 2007, "to": ye(2025), "tickEvery": 3},
    "strings": {
        "header": f"POV: YOU INVESTED IN APPLE\nINSTEAD OF PAYING **${IPHONE_PRICE}**\nFOR THE FIRST IPHONE",
        "footer": f"Bought at the {LAUNCH.month}/{LAUNCH.day}/{LAUNCH.year} close · dividends reinvested"
                  f" · valued {VALUE_DATE.month}/{VALUE_DATE.day}/{VALUE_DATE.year}",
        "verdict.text": f"**≈ {mult(A['mult'])}×** your ${IPHONE_PRICE}.\n"
                        f"One doubling every **≈ {rnd(A['yrs_per_doubling']):.0f} years**.",
        "data.spend.final": f"{usd(IPHONE_PRICE)} spent",
        "data.own.label": f"Same {usd(IPHONE_PRICE)} in Apple stock",
        "data.own.final": approx_usd(A["final"]),
        "data.purchases.0.label": f"iPhone {IPHONE_GB}GB",
        "data.purchases.0.price": usd(IPHONE_PRICE),
        "lookOpts.footerSteps.0.text": f"{usd(IPHONE_PRICE)} × {rnd(A['mult'], 1)} ≈ "
                                        f"${sig(IPHONE_PRICE * rnd(A['mult'], 1), 3):,.0f}",
    },
    "points": {"spend": A["spend"], "own": A["own"]},
    "purchases_x": [A["buy_x"]],
    # VO: numbers in order per line; 'about' required before rounded figures
    "vo_numbers": [
        [str(LAUNCH.year), str(IPHONE_PRICE)],
        [],
        [str(int(A["x_below"])), str(IPHONE_PRICE)],
        [], [],
        [str(int(A["x_10k"])), "10,000"],
        ["2022"],
        [str(VALUE_DATE.year), f"{sig(A['final'], 3):,.0f}"],
        [mult(A["mult"]), f"{rnd(A['yrs_per_doubling']):.0f}"],
    ],
    "vo_about": {7: [f"{sig(A['final'], 3):,.0f}"], 8: [mult(A["mult"])]},
    # beat sync: (vo line, x on the chart)
    "sync": [(1, A["buy_x"], "purchase tick"), (2, A["x_below"], "line dips under $499"),
             (5, A["x_10k"], "passes $10,000"), (6, ye(2022) - 0.5, "2022 drop"),
             (7, ye(2025), "final value")],
    "sfx": {0: A["buy_x"], 1: ye(2008), 2: A["x_10k"], 3: ye(2025)},
    "lookOpts_t": {"footerSteps.0": ye(2025)},
}

# sanity on the claims baked into the strings above
check("06a", "footer step result = final display", EXP["a"]["strings"]["lookOpts.footerSteps.0.text"].split("≈ ")[1],
      approx_usd(A["final"]).split("≈ ")[1])

# ---- 06b
fb = [
    f"= {usd(P0, 2)} × 12 = {usd(B['spend_y'][2012], 2)}",
    f"≈ {usd(B['spend_y'][2012], 2)} ÷ {usd(MT_NFLX_AVG[2012], 2)} ≈ {rnd(B['shares_y'][2012], 1)} shares",
    f"= {m_old_2015} × {usd(plan_price(2015, 1), 2)} + {12 - m_old_2015} × {usd(plan_price(2015, 12), 2)}"
    f" = {usd(B['spend_2015'], 2)}",
    "≈ each year's bills ÷ that year's avg price",
    f"≈ {rnd(B['cum_shares'][NFLX_END], 1)} shares × {usd(MT_NFLX_CLOSE[NFLX_END], 2)} ≈ "
    f"${sig(rnd(B['cum_shares'][NFLX_END], 1) * MT_NFLX_CLOSE[NFLX_END], 3):,.0f}",
    f"≈ {usd(B['final'])} ÷ {usd(B['total'], 2)} ≈ {mult(B['mult'])}×",
]
EXP["b"] = {
    "raceT": [2.0, 23.0], "x": {"from": NFLX_START, "to": ye(NFLX_END), "tickEvery": 3},
    "strings": {
        "header": f"POV: Since {NFLX_START} you put\nyour **{usd(P0, 2)}** Netflix bill\ninto Netflix stock",
        "footer": "Standard plan list price · each year at its avg price · split-adjusted",
        "verdict.text": f"**≈ {mult(B['mult'])}×** what Netflix\ncharged you",
        "data.spend.final": f"{usd(B['total'], 2)} spent",
        "data.own.final": approx_usd(B["final"]),
        **{f"data.purchases.{i}.label": lab for i, (_, lab, _) in enumerate(B["ticks"])},
        **{f"data.purchases.{i}.price": pr for i, (_, _, pr) in enumerate(B["ticks"])},
        **{f"lookOpts.formulaBar.{i}.text": s for i, s in enumerate(fb)},
    },
    "points": {"spend": B["spend"], "own": B["own"]},
    "purchases_x": [x for (x, _, _) in B["ticks"]],
    "vo_numbers": [
        [str(NFLX_START), f"{P0:.2f}"],
        [],
        ["2013"],
        [], [],
        ["2020", f"{plan_price(2020, 12):.2f}", "9,000"],
        ["2022"],
        [],
        [f"{rnd(B['total']):,.0f}", f"{sig(B['final'], 3):,.0f}"],
        [mult(B["mult"]), str(NFLX_START), f"{B['spend_y'][NFLX_START]:.2f}"],
    ],
    "vo_about": {8: [f"{rnd(B['total']):,.0f}", f"{sig(B['final'], 3):,.0f}"], 9: [mult(B["mult"])]},
    "sync": [(0, float(NFLX_START), "first bill"), (2, ye(2013), "2013 close"),
             (3, B["ticks"][2][0], "Oct 2015 hike"), (4, B["ticks"][3][0], "Oct 2017 hike"),
             (5, B["ticks"][5][0], "Oct 2020 hike"), (5, ye(2020), "2020 stake"),
             (6, ye(2022) - 0.5, "2022 drop"), (8, ye(NFLX_END), "final value")],
    "sfx": {0: B["ticks"][1][0], 1: B["ticks"][2][0], 2: B["ticks"][3][0], 3: B["ticks"][4][0],
            4: B["ticks"][5][0], 5: B["ticks"][6][0], 6: ye(2022), 7: B["ticks"][7][0],
            8: ye(NFLX_END)},
    "lookOpts_t": {"formulaBar.0": None, "formulaBar.1": None, "formulaBar.2": None,
                   "formulaBar.3": None, "formulaBar.4": None, "formulaBar.5": None},
}
check("06b", "check line: 2015 bills = 9 old + 3 new months", m_old_2015, 9)

# ---- 06c
EXP["c"] = {
    "raceT": [2.4, 20.4], "x": {"from": SBUX_START, "to": ye(SBUX_END), "tickEvery": 4},
    "strings": {
        "header": f"POV: Since {SBUX_START} you invested\nin Starbucks instead of paying\n"
                  f"**{usd(LATTE_STAKE)}/day** for lattes",
        "footer": f"{usd(LATTE_STAKE)} ≈ a grande latte · each year at its avg price · dividends reinvested",
        "verdict.text": f"**≈ {mult(C['mult'])}×** your latte money.\nNot rich. Not **$0**.",
        "data.spend.final": f"{usd(C['total'])} spent",
        "data.own.label": f"Same {usd(LATTE_STAKE)}/day in Starbucks stock",
        "data.own.final": approx_usd(C["final"]),
        "data.purchases.0.label": "Day 1",
        "data.purchases.0.price": usd(LATTE_STAKE),
    },
    "points": {"spend": C["spend"], "own": C["own"]},
    "purchases_x": [float(SBUX_START)],
    "vo_numbers": [
        [f"{LATTE_STAKE:.0f}", str(SBUX_START)],
        [],
        [f"{C['per_year']:,.0f}"],
        [],
        ["2021"],
        [],
        [str(SBUX_END), f"{C['total']:,.0f}"],
        [f"{sig(C['final'], 3):,.0f}"],
        [mult(C["mult"])],
    ],
    "vo_about": {7: [f"{sig(C['final'], 3):,.0f}"], 8: [mult(C["mult"])]},
    "sync": [(1, float(SBUX_START), "day-1 tick"), (2, ye(SBUX_START), "first year-end: $1,460 in"),
             (4, ye(2021), "2021: doubled"), (5, ye(2022) - 0.5, "stall starts"),
             (6, ye(SBUX_END), "spend final"), (7, ye(SBUX_END), "own final")],
    "sfx": {0: float(SBUX_START), 1: ye(2021), 2: ye(SBUX_END)},
    "lookOpts_t": {},
}
check("06c", "2015 is a 365-day year ($1,460 rung)", C["spend_y"][2015], C["per_year"])

# =====================================================================================
# SPEC CHECKS
# =====================================================================================


def strip_markup(s):
    return s.replace("**", "").replace("__", "")


def words(s):
    return [w for w in re.split(r"\s+", strip_markup(s).strip()) if w]


NUM_RE = re.compile(r"\$?(\d[\d,]*(?:\.\d+)?)")


def vo_numbers(text):
    return [m.group(1).rstrip(",") for m in NUM_RE.finditer(text)]


def leaves(obj, path=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from leaves(v, f"{path}.{k}" if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            yield from leaves(v, f"{path}.{i}")
    else:
        yield path, obj


def chart_t(spec, x):
    d = spec["data"]
    t0, t1 = d["raceT"]
    return t0 + (x - d["x"]["from"]) / (d["x"]["to"] - d["x"]["from"]) * (t1 - t0)


def check_spec(key):
    sid = IDS[key]
    path = os.path.join(SPECS, sid + ".json")
    with open(path, encoding="utf-8") as f:
        spec = json.load(f)
    e = EXP[key]
    d = spec["data"]

    # --- common fields
    check(sid, "id = file stem", spec["id"], sid)
    check(sid, "format", spec["format"], "pov-race")
    check(sid, "look", spec["look"], {"a": "scoreboard", "b": "live-sheet", "c": "becker-rig"}[key])
    check(sid, "fps", spec.get("fps"), 30)
    check(sid, "captions", spec.get("captions"), True)
    dur = spec["duration"]
    check(sid, "duration in lane", dur, f"{LANE[0]}-{LANE[1]} s", ok=LANE[0] <= dur <= LANE[1])

    # --- hook rules on the header
    hw = words(spec["header"])
    check(sid, "header ≤ 15 words", len(hw), "≤ 15", ok=len(hw) <= 15)
    dollars = re.findall(r"\$\d", spec["header"])
    check(sid, "header has exactly one $ input (R2)", len(dollars), 1)
    check(sid, "number in header at t=0 (R1)", bool(re.search(r"\d", spec["header"])), True)
    check(sid, "header ≤ 4 lines (R8)", spec["header"].count("\n") + 1, "≤ 4",
          ok=spec["header"].count("\n") + 1 <= 4)

    # --- display strings
    covered = set()
    for p, want in e["strings"].items():
        node = spec
        for part in p.split("."):
            node = node[int(part)] if isinstance(node, list) else node[part]
        check(sid, p, node, want)
        covered.add(p)

    # --- chart geometry
    check(sid, "data.raceT", d["raceT"], e["raceT"])
    check(sid, "data.x", d["x"], e["x"])
    check(sid, "data.y", d["y"], {"prefix": "$", "dp": 0})
    for line in ("spend", "own"):
        pts = d[line]["points"]
        want = [[rnd(x, 2), rnd(y, 2)] for (x, y) in e["points"][line]]
        got = [[rnd(x, 2), rnd(y, 2)] for (x, y) in pts]
        check(sid, f"data.{line}.points ({len(want)} pts)", "match" if got == want else got,
              "match" if got == want else want)
    check(sid, "last point x = x.to", d["own"]["points"][-1][0], d["x"]["to"])
    check(sid, "purchases x", [p["x"] for p in d.get("purchases", [])], e["purchases_x"])
    check(sid, "hold = duration − raceT end", rnd(d["hold"], 2), rnd(dur - d["raceT"][1], 2))
    # frame 1: the lines start on the stake, so a $ number is on screen at t=0 too
    check(sid, "frame-1 tip value = stake", d["own"]["points"][0][1], d["spend"]["points"][0][1])

    # --- VO
    vo = spec["vo"]
    check(sid, "vo line count", len(vo), len(e["vo_numbers"]))
    end_prev = 0.0
    for i, line in enumerate(vo):
        n = len(words(line["text"]))
        need = n / WPS
        check(sid, f"vo[{i}] d ≥ {n} words / {WPS}", line["d"], f"≥ {need:.2f}", ok=line["d"] + 1e-9 >= need)
        check(sid, f"vo[{i}] starts after vo[{i - 1}]", line["t"], f"≥ {end_prev:.2f}",
              ok=line["t"] + 1e-9 >= end_prev)
        end_prev = line["t"] + line["d"]
        got = vo_numbers(line["text"])
        want = e["vo_numbers"][i] if i < len(e["vo_numbers"]) else None
        check(sid, f"vo[{i}] numbers", got, want)
        for num in e["vo_about"].get(i, []):
            ok = re.search(r"\babout\s+\$?" + re.escape(num), line["text"], re.I) is not None
            check(sid, f"vo[{i}] 'about' before rounded {num}", ok, True)
    check(sid, "vo starts at 0.0 (hook spoken on frame 1)", vo[0]["t"], 0.0)
    check(sid, "last vo ends before duration", rnd(end_prev, 2), f"≤ {dur}", ok=end_prev <= dur + 1e-9)

    # --- verdict after the race lands
    check(sid, "verdict.t ≥ race end", spec["verdict"]["t"], f"≥ {d['raceT'][1]}",
          ok=spec["verdict"]["t"] >= d["raceT"][1])
    check(sid, "verdict.t = last vo line t", spec["verdict"]["t"], vo[-1]["t"])

    # --- beat sync
    for (i, x, what) in e["sync"]:
        t = chart_t(spec, x)
        lo, hi = vo[i]["t"] - BEAT_TOL, vo[i]["t"] + vo[i]["d"] + BEAT_TOL
        check(sid, f"sync: {what} (x {x:.2f}) in vo[{i}]", f"t={t:.2f}", f"{lo:.2f}-{hi:.2f}",
              ok=lo <= t <= hi)

    # --- sfx on their beats
    sfx = spec.get("sfx", [])
    check(sid, "sfx count", len(sfx), len(e["sfx"]))
    for j, x in e["sfx"].items():
        want_t = rnd(chart_t(spec, x), 2)
        check(sid, f"sfx[{j}] {sfx[j]['kind']} on beat x {x:.2f}", sfx[j]["t"], want_t,
              ok=abs(sfx[j]["t"] - want_t) <= 0.05)

    # --- lookOpts timings that sit on beats
    for p, x in e["lookOpts_t"].items():
        if x is None:
            continue
        node = spec["lookOpts"]
        for part in p.split("."):
            node = node[int(part)] if isinstance(node, list) else node[part]
        want_t = rnd(chart_t(spec, x), 2)
        check(sid, f"lookOpts.{p}.t on beat", node["t"], want_t, ok=abs(node["t"] - want_t) <= 0.05)
    if key == "b":
        # formula bar steps line up with the VO lines they illustrate
        fb_t = [s["t"] for s in spec["lookOpts"]["formulaBar"]]
        want = [vo[0]["t"], vo[1]["t"], vo[3]["t"], vo[4]["t"], vo[8]["t"], vo[9]["t"]]
        check(sid, "formulaBar t = its VO line t", fb_t, want)

    # --- coverage: every string with a digit must have been checked
    for p, v in leaves(spec):
        if not isinstance(v, str) or not re.search(r"\d", v):
            continue
        if p in ("id",) or re.fullmatch(r"vo\.\d+\.text", p):
            continue
        check(sid, f"covered: {p}", "checked" if p in covered else f"UNCHECKED {v!r}", "checked")
    return spec


specs = {k: check_spec(k) for k in IDS}

# =====================================================================================
# REPORT
# =====================================================================================
print("\nKey figures")
print(f"  06a  $499 at {A['adj_buy']:.4f} (adj) -> {A['final']:,.2f} at 12/31/2025  "
      f"= x{A['mult']:.2f}, {A['doublings']:.2f} doublings in {A['years']:.2f} y "
      f"(1 per {A['yrs_per_doubling']:.2f} y); StatMuse-only {A['statmuse_only']:,.0f}")
print(f"  06b  bills {B['total']:,.2f} -> {B['final']:,.2f}  = x{B['mult']:.2f}; "
      f"2012 share {B['share_2012']:.1%}; 2022 stake drop {B['drop_2022']:.1%}")
print(f"  06c  lattes {C['total']:,.2f} -> {C['final']:,.2f}  = x{C['mult']:.3f}; "
      f"x{C['x2021']:.2f} at 2021; since 2021: +{C['since2021_in']:,.0f} in, "
      f"+{C['since2021_gain']:,.0f} stake; alt close {C['alt_final']:,.0f}")
print("\nYear-end series (spend | own)")
for key, S in (("06a", A), ("06b", B), ("06c", C)):
    sp = dict((round(x, 2), y) for x, y in S["spend"])
    print(f"  {key}: " + "  ".join(f"{x:.2f}:{sp.get(round(x, 2), float('nan')):,.0f}|{y:,.0f}"
                                     for x, y in S["own"]))

w1 = max(len(r[0]) for r in ROWS)
w2 = min(60, max(len(r[1]) for r in ROWS))
print(f"\n{'spec':<{w1}}  {'check':<{w2}}  {'ok':<3} shown  ->  computed")
for sid, field, shown, want, ok in ROWS:
    s = shown.replace("\n", "⏎")
    w = want.replace("\n", "⏎")
    if len(s) > 70:
        s = s[:67] + "..."
    if len(w) > 70:
        w = w[:67] + "..."
    print(f"{sid:<{w1}}  {field[:w2]:<{w2}}  {'OK' if ok else 'XX':<3} {s}  ->  {w}")

print(f"\n{len(ROWS)} checks, {len(FAIL)} failed")
if FAIL:
    print("\nFAILURES")
    for f in FAIL:
        print("  " + f.replace("\n", "⏎"))
    sys.exit(1)
print("ALL PASS")
