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
   - VO timing: each line's d >= written words / 2.6 AND >= spoken words / 2.8 (numbers
     counted as read aloud: "$17,532" = 5 words, "2025" = 2, "$7.99" = 2, "8.7" = 3),
     no overlaps, last line ends at least 0.4 s before the end,
   - beat sync: each beat a VO line mentions lands (on the chart's x -> t clock) inside
     that line's window, +/- 0.3 s; every sfx cue sits on its beat,
   - motion and payoff timing: the race starts by 1.0 s and the first year-end payoff
     lands by 3.0 s (R10).
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
WPS = 2.6            # VO read speed, written words per second
SPOKEN_WPS = 2.8     # VO read speed, spoken words per second (numbers read out in full)
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
SM_AAPL_LAUNCH = 3.66            # cross-check only: see AAPL_LAUNCH_ADJ
SM_AAPL_YE2007 = 5.92
SM_AAPL_YE2025 = 271.36          # StatMuse, 2025-12-31 close (cross-check only)
# Raw (unadjusted) closes: ATPM 13.07 "Apple's share price ended June trading at $122.04"
# (6/29/2007, launch day); 1stock1 "Apple yearly stock prices": 2007 began at $84.84 and ended
# at $198.08 (+133.47%). Apple paid no dividend and did no split between these two dates, so
# the launch-day close on ANY adjusted basis is that basis's 2007 close x 122.04 / 198.08.
RAW_AAPL_LAUNCH = 122.04
RAW_AAPL_YE2007 = 198.08
# On the 5.92 basis that is 5.92 x 122.04 / 198.08 = 3.6474 -> $3.65. StatMuse's own $3.66 is
# 0.3% off its $5.92 on the raw ratio (more than 2-dp rounding of either), so the launch price
# used is the derived $3.65 (2 dp, like every other input), and StatMuse is the cross-check.
AAPL_LAUNCH_ADJ = 3.65
# Macrotrends, "Apple - 45 Year Stock Price History | AAPL" (adjusted for splits and dividends):
# year close and annual % change.
MT_AAPL_CLOSE = {2007: 5.97, 2008: 2.57, 2009: 6.36, 2010: 9.73, 2011: 12.21, 2012: 16.06,
                 2013: 17.35, 2014: 24.40, 2015: 23.67, 2016: 26.62, 2017: 39.52, 2018: 37.39,
                 2019: 70.66, 2020: 128.82, 2021: 173.45, 2022: 127.65, 2023: 190.21,
                 2024: 248.62, 2025: 271.12}
# The search returned the 2007-2011 rows on an older adjustment basis than the 2012+ rows: the
# 2012 % change (32.57%) can't be reproduced from 12.21 -> 16.06 (31.53%). StatMuse's 2007 close
# ($5.92) is the bridge: rescaling 2007-2011 by 5.92 / 5.97 makes 2012 reproduce (checked below),
# and the launch-day close ($3.65, derived from 5.92 by the raw ratio above) sits on that basis.
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
# dividend): average close of the year, year close, annual % change. 2012-2014 at the table's
# own 4-dp precision (a 2-dp copy of 2012's close, $1.33, broke the 2013 % change; $1.3227
# reproduces +297.64% exactly).
MT_NFLX_AVG = {2012: 1.1855, 2013: 3.5272, 2014: 5.7495, 2015: 9.19, 2016: 10.20, 2017: 16.54,
               2018: 31.93, 2019: 32.89, 2020: 44.68, 2021: 55.82, 2022: 28.46, 2023: 39.02,
               2024: 67.15, 2025: 109.71}
MT_NFLX_CLOSE = {2011: 0.99, 2012: 1.3227, 2013: 5.2596, 2014: 4.8801, 2015: 11.44, 2016: 12.38,
                 2017: 19.20, 2018: 26.77, 2019: 32.36, 2020: 54.07, 2021: 60.24, 2022: 29.49,
                 2023: 48.69, 2024: 89.13, 2025: 93.76}
MT_NFLX_CHG = {2012: 33.62, 2013: 297.64, 2014: -7.22, 2015: 134.38, 2016: 8.24, 2017: 55.06,
               2018: 39.44, 2019: 20.89, 2020: 67.11, 2021: 11.41, 2022: -51.05, 2023: 65.11,
               2024: 83.07, 2025: 5.19}
SM_NFLX_YE2025 = 93.76           # StatMuse, 2025-12-31 close (second source)
# Hook pass 2 (2026-10-08): the hook's unit is today's Standard bill. CNBC, "Netflix raises prices
# across all streaming plans", 2026-03-26 (Standard $17.99 -> $19.99 from March 2026); subkept.com and
# keepingupwithinflation.com, accessed 2026-10-07. It is NOT a race input (the race stops at the
# 12/31/2025 close with the Jan 2025 $17.99 bill): it only converts the stake into years of Netflix.
NFLX_STD_NOW = 19.99

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


ONES = ("zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen "
        "fifteen sixteen seventeen eighteen nineteen").split()
TENS = "_ _ twenty thirty forty fifty sixty seventy eighty ninety".split()


def say_int(n):
    """formal reading, compound tens hyphenated (one word): 17532 -> seventeen thousand five
    hundred thirty-two (5 words). "dollars" is not counted."""
    if n < 20:
        return [ONES[n]]
    if n < 100:
        return [TENS[n // 10] + ("-" + ONES[n % 10] if n % 10 else "")]
    if n < 1000:
        return [ONES[n // 100], "hundred"] + (say_int(n % 100) if n % 100 else [])
    for div, name in ((10 ** 9, "billion"), (10 ** 6, "million"), (1000, "thousand")):
        if n >= div:
            return say_int(n // div) + [name] + (say_int(n % div) if n % div else [])


def say_year(y):
    if 2000 <= y <= 2009:
        return say_int(y)                     # two thousand seven
    hi, lo = divmod(y, 100)
    return say_int(hi) + (say_int(lo) if lo >= 10 else (["oh"] + say_int(lo) if lo else ["hundred"]))


def spoken_words(text):
    """the words a VO line takes to say, numbers read out: $499 -> four hundred ninety-nine,
    $7.99 -> seven ninety-nine, 2012 -> twenty twelve, 8.7 -> eight point seven"""
    out = []
    for tok in re.findall(r"\$?\d[\d,]*(?:\.\d+)?|[A-Za-z][A-Za-z'’-]*", text):
        if tok[0].isalpha():
            out.append(tok)
            continue
        money = tok.startswith("$")
        num = tok.lstrip("$").rstrip(",")
        if "." in num:
            whole, frac = num.split(".")
            w = say_int(int(whole.replace(",", "")))
            out += w + (say_int(int(frac)) if money else ["point"] + [ONES[int(c)] for c in frac])
        elif not money and "," not in num and len(num) == 4 and 1900 <= int(num) <= 2099:
            out += say_year(int(num))
        else:
            out += say_int(int(num.replace(",", "")))
    return out


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


def table_consistency(name, close, chg):
    """each annual % change must be reproducible from the 2-dp closes (within their rounding)"""
    bad = []
    for y, c in chg.items():
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
A["adj_buy_exact"] = AAPL_CLOSE[2007] * RAW_AAPL_LAUNCH / RAW_AAPL_YE2007  # 3.6474 on the 2012+ basis
A["adj_buy"] = AAPL_LAUNCH_ADJ                                           # 3.65, the input used
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
A["v2012"] = A["shares"] * AAPL_CLOSE[2012]                              # spoken "2012: about $2,200"
A["mult_2017"] = A["shares"] * AAPL_CLOSE[2017] / IPHONE_PRICE           # spoken "2017: over 10 times"
A["statmuse_only"] = IPHONE_PRICE * SM_AAPL_YE2025 / SM_AAPL_LAUNCH     # cross-check
check("06a", "launch-day close: 5.92 x 122.04 / 198.08, to 2 dp = the input",
      f"{A['adj_buy_exact']:.4f} -> {rnd(A['adj_buy_exact'], 2):.2f}", f"{AAPL_LAUNCH_ADJ:.2f}",
      ok=rnd(A["adj_buy_exact"], 2) == AAPL_LAUNCH_ADJ)
check("06a", "raw closes reproduce 2007's +133.47% (84.84 -> 198.08)",
      f"{(RAW_AAPL_YE2007 / 84.84 - 1) * 100:.2f}%", "133.47%",
      ok=abs((RAW_AAPL_YE2007 / 84.84 - 1) * 100 - 133.47) < 0.006)
check("06a", "StatMuse's 3.66/5.92 vs the raw ratio (why 3.66 is not used)",
      f"{SM_AAPL_LAUNCH / SM_AAPL_YE2007:.4f} vs {RAW_AAPL_LAUNCH / RAW_AAPL_YE2007:.4f}",
      "differ by more than 2-dp rounding",
      ok=SM_AAPL_LAUNCH / SM_AAPL_YE2007 - 0.005 / SM_AAPL_YE2007 > RAW_AAPL_LAUNCH / RAW_AAPL_YE2007)
check("06a", "cross-check: StatMuse-only value within 0.5%",
      f"{A['statmuse_only']:,.0f} vs {A['final']:,.0f}", "≤ 0.5%",
      ok=abs(A["statmuse_only"] / A["final"] - 1) <= 0.005)
check("06a", "2022 drop is 'a quarter' (20-30%)", f"{A['drop_2022']:.3f}", "0.20-0.30",
      ok=0.20 <= A["drop_2022"] <= 0.30)
check("06a", "2008 dip under $499 happens in 2008", int(A["x_below"]), 2008)
check("06a", "passes $10,000 in 2020", int(A["x_10k"]), 2020)
check("06a", "vo: 2012 close ≈ $2,200 (2 s.f.)", f"{A['v2012']:,.2f}", "2,200", ok=f"{sig(A['v2012'], 2):,.0f}" == "2,200")
check("06a", "vo: 2017 'over 10 times' (10-11×)", f"{A['mult_2017']:.2f}", "10-11", ok=10 < A["mult_2017"] < 11)

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
# Hook pass 2: the stake re-priced in years of today's $19.99 Standard bill ("free for how many years").
# Shown rounding: months to the whole month; years to 2 significant figures (2.4, 38, 22, 74), the
# same rule as mult(). Each step must round the same from the exact stake and from the whole-dollar
# figure the formula bar shows ($107, $568, $9,181, $5,289, ≈ $17,700).
B["unit_y"] = rnd(12 * NFLX_STD_NOW, 2)                                # $239.88 a year
B["months"] = {y: B["value"][y] / NFLX_STD_NOW for y in B["value"]}
B["years"] = {y: B["value"][y] / B["unit_y"] for y in B["value"]}
B["months_shown"] = rnd(B["months"][2012])                             # ≈ 5 months
B["yrs_shown"] = {y: mult(B["years"][y]) for y in (2013, 2020, 2022, NFLX_END)}
check("06b", "unit: 12 × $19.99 = $239.88 a year", usd(B["unit_y"], 2), "$239.88")
check("06b", "bar 2012: $107 ÷ $19.99 and exact both ≈ 5 months",
      f"{rnd(B['value'][2012]) / NFLX_STD_NOW:.3f} / {B['months'][2012]:.3f}", "both 5",
      ok=rnd(rnd(B["value"][2012]) / NFLX_STD_NOW) == B["months_shown"] == 5)
for y, want in ((2020, "38"), (2022, "22")):
    check("06b", f"bar {y}: {usd(B['value'][y])} ÷ $239.88 and exact both ≈ {want} years",
          f"{rnd(B['value'][y]) / B['unit_y']:.3f} / {B['years'][y]:.3f}", f"both {want}",
          ok=mult(rnd(B["value"][y]) / B["unit_y"]) == B["yrs_shown"][y] == want)
check("06b", "bar verdict: $17,706 ÷ $239.88 and exact both ≈ 74 years",
      f"{rnd(B['final']) / B['unit_y']:.3f} / {B['years'][NFLX_END]:.3f}", "both 74",
      ok=mult(rnd(B["final"]) / B["unit_y"]) == B["yrs_shown"][NFLX_END] == "74")


# Assembly round 2: the answer row (Live Sheet lookOpts.unit) shows the stake live in years of today's bill. It
# formats exactly like this (looks/live-sheet/formats/pov-race.js, unitText): under a year, whole months
# (÷ unit.perMonth); 1-10 years, 1 dp; 10+ years, whole years. At each hold (a spoken year-end) it shows that
# year-end's exact value, so what it shows there must equal what the VO and the bar say.
def answer_cell(v):
    yrs = v / B["unit_y"]
    if yrs < 1:
        m = rnd(v / NFLX_STD_NOW)
        return "< 1 month" if m < 1 else f"≈ {m:.0f} {'month' if m == 1 else 'months'}"
    r1 = rnd(yrs, 1)
    return f"≈ {r1:.1f} years" if r1 < 10 else f"≈ {rnd(yrs):.0f} years"


B["holds"] = {2012: f"≈ {B['months_shown']:.0f} months", 2020: f"≈ {B['yrs_shown'][2020]} years",
              2022: f"≈ {B['yrs_shown'][2022]} years"}
for y, want in B["holds"].items():
    check("06b", f"answer row lands {y}: {answer_cell(B['value'][y])}", answer_cell(B["value"][y]), want)
check("06b", "answer row at the finish (live, exact) = unit.final, so the landing never jumps",
      answer_cell(B["final"]), f"≈ {B['yrs_shown'][NFLX_END]} years")
check("06b", "2022 'halves' in years too: 2021 peak → 2022 (45-55% down)",
      f"{B['years'][2021]:.2f} → {B['years'][2022]:.2f}", "0.45-0.55",
      ok=0.45 <= 1 - B["years"][2022] / B["years"][2021] <= 0.55)
check("06b", "pinned: $17,706 ÷ $239.88 ≈ 73.8 years", f"{rnd(rnd(B['final']) / B['unit_y'], 1):.1f}", "73.8")
check("06b", "pinned: ≈ 8.7× the $2,037.32 of bills", mult(B["mult"]), "8.7")
check("06b", "md: ≈ 885.7 months of Netflix", f"{rnd(B['months'][NFLX_END], 1):.1f}", "885.7")
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
C["x2021_k"] = math.floor(C["x2021"])          # the "2×" mark: the whole multiple the tower has reached by then
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
# The final is shown to the nearest $1,000 (2 significant figures: $37,065 -> ≈ $37,000), the
# rounding a viewer can say in one breath; 06b and 06c use 3 (≈ $17,700, ≈ $24,900).
A["final_disp"] = approx_usd(A["final"], 2)
A["final_say"] = f"{sig(A['final'], 2):,.0f}"
EXP["a"] = {
    "raceT": [0.3, 21.4], "x": {"from": 2007, "to": ye(2025), "tickEvery": 3},
    "first_payoff_x": ye(2007),
    "strings": {
        "header": f"POV: IN {LAUNCH.year} YOU INVESTED IN APPLE\nINSTEAD OF PAYING **${IPHONE_PRICE}**\n"
                  f"FOR THE FIRST IPHONE",
        "footer": f"{LAUNCH.month}/{LAUNCH.day}/{LAUNCH:%y} close → {VALUE_DATE.month}/{VALUE_DATE.day}/"
                  f"{VALUE_DATE:%y} · dividends reinvested",
        "verdict.text": f"**≈ {mult(A['mult'])}×** your ${IPHONE_PRICE}.\n"
                        f"2× every **≈ {rnd(A['yrs_per_doubling']):.0f} yrs**.",
        "data.spend.final": f"{usd(IPHONE_PRICE)} spent",
        "data.own.label": f"Same {usd(IPHONE_PRICE)} in Apple stock",
        "data.own.final": A["final_disp"],
        "data.purchases.0.label": f"iPhone {IPHONE_GB}GB",
        "data.purchases.0.price": usd(IPHONE_PRICE),
        # assembly round 2: the finish's working line shows what is not on screen elsewhere (shares × close),
        # not a third copy of ≈ $37,000
        "lookOpts.footerSteps.0.text": f"≈ {rnd(A['shares'], 1)} shares × {usd(MT_AAPL_CLOSE[2025], 2)} "
                                        f"({VALUE_DATE.month}/{VALUE_DATE.day}/{VALUE_DATE:%y} close)",
    },
    "points": {"spend": A["spend"], "own": A["own"]},
    "purchases_x": [A["buy_x"]],
    # VO: numbers in order per line; 'about' required before rounded figures
    # assembly round 2: the hook line carries the POV and the stake; the middle lines each land a number
    "vo_numbers": [
        [str(LAUNCH.year), str(IPHONE_PRICE)],
        ["2012", f"{sig(A['v2012'], 2):,.0f}"],
        ["2017", "10"],
        [str(int(A["x_10k"])), "10,000"],
        ["2022"],
        [str(VALUE_DATE.year), A["final_say"]],
        [mult(A["mult"]), f"{rnd(A['yrs_per_doubling']):.0f}"],
    ],
    "vo_about": {1: [f"{sig(A['v2012'], 2):,.0f}"], 5: [A["final_say"]],
                 6: [mult(A["mult"]), f"{rnd(A['yrs_per_doubling']):.0f}"]},
    # beat sync: (vo line, x on the chart). The 2008 dip (t 2.1-2.8) plays under vo[0] on purpose:
    # the chart opens in the red while the premise is spoken (ChartOrbit's open-in-the-red device).
    "sync": [(0, A["buy_x"], "purchase tick"), (0, ye(2007), "first payoff (end of 2007)"),
             (1, ye(2012), "2012 close ≈ $2,200"), (2, ye(2017), "2017 close, over 10×"),
             (3, A["x_10k"], "passes $10,000"), (4, ye(2022) - 0.5, "2022 drop"),
             (5, ye(2025), "final value")],
    "sfx": {0: A["buy_x"], 1: ye(2008), 2: ye(2012), 3: ye(2017), 4: A["x_10k"], 5: ye(2025)},
    "lookOpts_t": {"footerSteps.0": ye(2025)},
}

# sanity on the claims baked into the strings above
check("06a", "footer step: 136.7 × $271.12 to the nearest $1,000 = the final display",
      f"≈ ${sig(rnd(A['shares'], 1) * MT_AAPL_CLOSE[2025], 2):,.0f}", A["final_disp"])
check("06a", "pinned: 136.7 shares x $271.12 ≈ $37,062", usd(rnd(A["shares"], 1) * MT_AAPL_CLOSE[2025]), "$37,062")

# ---- 06b
# Hook pass 2: the bar asks the hook's question on frame 1 ("= ? years") and answers it in the
# hook's unit at each beat: 2012 (in months), 2013, 2020, the 2022 halving, then the verdict.
NOW = usd(NFLX_STD_NOW, 2)                                             # "$19.99"
UNIT = usd(B["unit_y"], 2)                                             # "$239.88"
# Assembly round 2: one line each (no wrap), no leading "≈" after the bar's ≈ chip, and every landed step names its
# year (the race row has moved on by the time it shows). The "? years" slot is now the answer row's own cell.
fb = [
    f"= stock ÷ ({NOW} × 12)",
    f"2012: {usd(B['value'][2012])} ÷ {NOW} ≈ {B['months_shown']:.0f} months",
    "each year: bills ÷ avg price",
    f"2020: {usd(B['value'][2020])} ÷ {UNIT} ≈ {B['yrs_shown'][2020]} yrs",
    f"2022: {usd(B['value'][2022])} ÷ {UNIT} ≈ {B['yrs_shown'][2022]} yrs",
    f"{rnd(B['cum_shares'][NFLX_END], 1)} shares × {usd(MT_NFLX_CLOSE[NFLX_END], 2)} ≈ "
    f"${sig(rnd(B['cum_shares'][NFLX_END], 1) * MT_NFLX_CLOSE[NFLX_END], 3):,.0f}",
    f"{usd(B['final'])} ÷ {UNIT} ≈ {B['yrs_shown'][NFLX_END]} years",
]
# purchase tags: the start bill, then the hikes counted ("Hike 1" ... "Hike 7", R9)
B["tag_labels"] = [lab if i == 0 else f"Hike {i} · {lab}" for i, (_, lab, _) in enumerate(B["ticks"])]
EXP["b"] = {
    "raceT": [0.3, 23.0], "x": {"from": NFLX_START, "to": ye(NFLX_END), "tickEvery": 3},
    "first_payoff_x": ye(NFLX_START),
    "strings": {
        # hook pass 2: today's bill is the hook's only $ figure and the unit of the answer.
        # Assembly round 2: two lines broken by sense, set at 64 px (three lines capped the banner at ~46 px); the
        # mechanism ("Paid to Netflix" vs "Same bills in Netflix stock") and the "? years" slot are the sheet's own
        # frame-1 cells, and the ÷ $19.99 conversion is the formula bar's frame-1 formula.
        "header": f"**{NOW}** Netflix, free\nfor how many years?",
        "footer": f"Standard plan list price · {VALUE_DATE.month}/{VALUE_DATE.day}/{VALUE_DATE:%y} close",
        "lookOpts.startLabel": str(NFLX_START),
        "lookOpts.unit.final": f"≈ {B['yrs_shown'][NFLX_END]} years",
        "verdict.text": f"**≈ {B['yrs_shown'][NFLX_END]} years** of Netflix\nat {NOW} a month",
        "data.spend.final": f"{usd(B['total'], 2)} spent",
        "data.own.final": approx_usd(B["final"]),
        **{f"data.purchases.{i}.label": lab for i, lab in enumerate(B["tag_labels"])},
        **{f"data.purchases.{i}.price": pr for i, (_, _, pr) in enumerate(B["ticks"])},
        **{f"lookOpts.formulaBar.{i}.text": s for i, s in enumerate(fb)},
    },
    "points": {"spend": B["spend"], "own": B["own"]},
    "purchases_x": [x for (x, _, _) in B["ticks"]],
    "vo_numbers": [
        [],
        [str(NFLX_START)],
        [], [],
        ["2020", B["yrs_shown"][2020]],
        ["2022"],
        [],
        [f"{rnd(B['total']):,.0f}", f"{sig(B['final'], 3):,.0f}"],
        [f"{NFLX_STD_NOW:.2f}", B["yrs_shown"][NFLX_END]],
    ],
    "vo_about": {4: [B["yrs_shown"][2020]], 7: [f"{rnd(B['total']):,.0f}", f"{sig(B['final'], 3):,.0f}"],
                 8: [B["yrs_shown"][NFLX_END]]},
    "sync": [(0, float(NFLX_START), "first bill"), (0, ye(NFLX_START), "first payoff (end of 2012)"),
             (2, B["ticks"][2][0], "Oct 2015 hike"), (3, B["ticks"][3][0], "Oct 2017 hike"),
             (4, B["ticks"][5][0], "Oct 2020 hike"), (4, ye(2020), "2020: ≈ 38 years"),
             (5, ye(2022) - 0.5, "2022 drop"), (7, ye(NFLX_END), "final value")],
    "sfx": {0: B["ticks"][1][0], 1: B["ticks"][2][0], 2: B["ticks"][3][0], 3: B["ticks"][4][0],
            4: B["ticks"][5][0], 5: B["ticks"][6][0], 6: ye(2022), 7: B["ticks"][7][0],
            8: ye(NFLX_END)},
    # bar steps 1, 3, 4 land on their year-ends (within 0.05 s); the rest start with a VO line
    "lookOpts_t": {"formulaBar.1": ye(2012), "formulaBar.3": ye(2020), "formulaBar.4": ye(2022)},
    "formulaBar_vo": {0: 0, 2: 3, 5: 7, 6: 8},          # bar step -> the VO line it starts with
    # the answer row's landings: (spoken year-end x, the VO line that says it)
    "holds": [(ye(2012), 0), (ye(2020), 4), (ye(2022), 5)],
}
check("06b", "table: 2015 bills = 9 old + 3 new months", m_old_2015, 9)
check("06b", "pinned: 188.84 shares x $93.76 ≈ $17,706",
      usd(rnd(B["cum_shares"][NFLX_END], 2) * MT_NFLX_CLOSE[NFLX_END]), "$17,706")
check("06b", "7 hikes after the $7.99 start", len(B["ticks"]) - 1, 7)

# ---- 06c
EXP["c"] = {
    "raceT": [0.5, 20.4], "x": {"from": SBUX_START, "to": ye(SBUX_END), "tickEvery": 4},
    "first_payoff_x": ye(SBUX_START),
    "strings": {
        "header": f"POV: Since {SBUX_START} you invested\nin Starbucks instead of paying\n"
                  f"**{usd(LATTE_STAKE)}/day** for a Starbucks latte",
        "footer": f"{usd(LATTE_STAKE)} ≈ a grande latte · each year at its avg price · dividends reinvested",
        # one line: the Becker Rig verdict band overflows by 6 px on any 2-line verdict (kit issue,
        # logged); the judge's 2-line "Cups: $0. Stock: ≈ $24,900." version swaps in once it is fixed
        "verdict.text": f"**≈ {mult(C['mult'])}×**. Not rich. Not zero.",
        "data.spend.final": f"{usd(C['total'])} spent",
        "data.own.label": f"Same {usd(LATTE_STAKE)}/day in Starbucks stock",
        "data.own.final": approx_usd(C["final"]),
        "data.purchases.0.label": "Day 1",
        "data.purchases.0.price": usd(LATTE_STAKE),
        # assembly round 2: the "doubled" beat. A green dotted line at 2 × the 2021 spend, labelled, lands with
        # the 2021 year-end (the ding) while vo[4] says "doubled"; the tower top is just above it (2.08×)
        "lookOpts.multiple.label": f"{C['x2021_k']}×",
    },
    "points": {"spend": C["spend"], "own": C["own"]},
    "purchases_x": [float(SBUX_START)],
    "vo_numbers": [
        [f"{LATTE_STAKE:.0f}"],
        [str(SBUX_START)],
        [f"{C['per_year']:,.0f}"],
        [],
        ["2021"],
        [],
        [str(SBUX_END), f"{C['total']:,.0f}"],
        [f"{sig(C['final'], 3):,.0f}"],
        [mult(C["mult"])],
    ],
    "vo_about": {7: [f"{sig(C['final'], 3):,.0f}"], 8: [mult(C["mult"])]},
    "sync": [(0, float(SBUX_START), "day-1 tick"), (0, ye(SBUX_START), "first payoff (end of 2014)"),
             (4, ye(2021), "2021: doubled"), (5, ye(2022), "2022 dip: the stall"),
             (6, ye(SBUX_END), "spend final"), (7, ye(SBUX_END), "own final")],
    "sfx": {0: float(SBUX_START), 1: ye(2021), 2: ye(SBUX_END)},
    "lookOpts_t": {"multiple": ye(2021)},
}
check("06c", "2015 is a 365-day year ($1,460 rung)", C["spend_y"][2015], C["per_year"])
check("06c", "'2×' mark: tower ≥ 2 × spend at the end of 2021",
      f"{C['value'][2021]:,.0f} vs 2 × {C['cum_spend'][2021]:,.0f} = {2 * C['cum_spend'][2021]:,.0f}", "tower above",
      ok=C["x2021_k"] == 2 and C["value"][2021] >= 2 * C["cum_spend"][2021])
check("06c", "pinned: 296.0 shares x $84.21 ≈ $24,926",
      usd(rnd(C["final"] / MT_SBUX_CLOSE[2025], 1) * MT_SBUX_CLOSE[2025]), "$24,926")
check("06c", "'climbs faster than the cups' while vo[3] plays (x 2018.9-2021.0)",
      ", ".join(f"{y}: +{C['value'][y] - C['value'][y - 1]:,.0f}" for y in (2019, 2020, 2021)),
      f"each > +{C['per_year']:,.0f}", ok=all(C["value"][y] - C["value"][y - 1] > C["per_year"] for y in (2019, 2020, 2021)))

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
        ns = len(spoken_words(line["text"]))
        need_s = ns / SPOKEN_WPS
        check(sid, f"vo[{i}] d ≥ {ns} spoken words / {SPOKEN_WPS}", line["d"], f"≥ {need_s:.2f}",
              ok=line["d"] + 1e-9 >= need_s)
        check(sid, f"vo[{i}] starts after vo[{i - 1}]", line["t"], f"≥ {end_prev:.2f}",
              ok=line["t"] + 1e-9 >= end_prev)
        end_prev = line["t"] + line["d"]
        got = vo_numbers(line["text"])
        want = e["vo_numbers"][i] if i < len(e["vo_numbers"]) else None
        check(sid, f"vo[{i}] numbers", got, want)
        for num in e["vo_about"].get(i, []):
            ok = re.search(r"\babout\s+(?:every\s+)?\$?" + re.escape(num) + r"\b", line["text"], re.I) is not None
            check(sid, f"vo[{i}] 'about' before rounded {num}", ok, True)
    check(sid, "vo starts at 0.0 (hook spoken on frame 1)", vo[0]["t"], 0.0)
    check(sid, "last vo ends ≥ 0.4 s before the end", rnd(end_prev, 2), f"≤ {dur - 0.4:.1f}",
          ok=end_prev <= dur - 0.4 + 1e-9)

    # --- motion within 1 s, first payoff by 3 s (R10)
    check(sid, "race moving by 1.0 s", d["raceT"][0], "≤ 1.0", ok=d["raceT"][0] <= 1.0)
    t_pay = chart_t(spec, e["first_payoff_x"])
    check(sid, "first payoff (first year-end) by 3.0 s (R10)", f"t={t_pay:.2f}", "≤ 3.00", ok=t_pay <= 3.0)

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
        # formula bar steps line up with the VO lines they illustrate, or sit on a beat (above);
        # every step is one or the other
        bar = spec["lookOpts"]["formulaBar"]
        on_beat = {int(p.split(".")[1]) for p, x in e["lookOpts_t"].items() if p.startswith("formulaBar.") and x}
        check(sid, "every formulaBar step is on a beat or a VO line", sorted(on_beat | set(e["formulaBar_vo"])),
              list(range(len(bar))))
        fb_t = [bar[j]["t"] for j in e["formulaBar_vo"]]
        want = [vo[i]["t"] for i in e["formulaBar_vo"].values()]
        check(sid, "formulaBar t = its VO line t", fb_t, want)
        # the answer row converts at today's bill, and lands on the spoken year-ends, each inside its VO line
        unit = spec["lookOpts"]["unit"]
        check(sid, "lookOpts.unit.per = 12 × $19.99", unit["per"], B["unit_y"])
        check(sid, "lookOpts.unit.perMonth = $19.99", unit["perMonth"], NFLX_STD_NOW)
        check(sid, "lookOpts.unit.holds = the spoken year-ends", unit["holds"], [x for x, _ in e["holds"]])
        for x, i in e["holds"]:
            t = chart_t(spec, x)
            lo, hi = vo[i]["t"] - BEAT_TOL, vo[i]["t"] + vo[i]["d"] + BEAT_TOL
            check(sid, f"answer row lands {int(x)} (t {t:.2f}) in vo[{i}]", f"t={t:.2f}", f"{lo:.2f}-{hi:.2f}", ok=lo <= t <= hi)

    if key == "c":
        # the "2×" mark's line height is k × the spend at x (the format reads both): the 2021 year-end, k = 2
        mu = spec["lookOpts"]["multiple"]
        check(sid, "lookOpts.multiple.x = end of 2021", mu["x"], ye(2021))
        check(sid, "lookOpts.multiple.k = the label's multiple", mu["k"], C["x2021_k"])
        t_mu = chart_t(spec, mu["x"])
        lo, hi = vo[4]["t"], vo[4]["t"] + vo[4]["d"]
        check(sid, "'2×' mark shown inside vo[4] ('doubled')", f"t={t_mu:.2f}-{t_mu + mu['hold']:.2f}",
              f"starts {lo:.2f}-{hi:.2f}", ok=lo <= t_mu <= hi)

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
print(f"  06a  $499 at {A['adj_buy']:.2f} (adj; exact {A['adj_buy_exact']:.4f}) -> {A['final']:,.2f} at 12/31/2025  "
      f"= x{A['mult']:.2f}, {A['doublings']:.2f} doublings in {A['years']:.2f} y "
      f"(1 per {A['yrs_per_doubling']:.2f} y); StatMuse-only {A['statmuse_only']:,.0f}")
print(f"  06b  bills {B['total']:,.2f} -> {B['final']:,.2f} ({B['cum_shares'][NFLX_END]:.3f} sh) = x{B['mult']:.3f}; "
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
