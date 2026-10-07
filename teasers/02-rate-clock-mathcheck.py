#!/usr/bin/env python3
"""Math check for Envelope Math #2, The Rate Clock (teasers 02A, 02B, 02C).

Recomputes every number that appears on screen, in the voice-over or in a pinned
comment. Run: python3 teasers/02-rate-clock-mathcheck.py
"""
from datetime import date

TODAY = date(2026, 10, 7)  # publish/as-of date


def pct(envelope, exact):
    return abs(envelope - exact) / exact * 100


def jd_gregorian(y, m, d):
    """Julian Day Number at 00:00 UT for a Gregorian calendar date."""
    a = (14 - m) // 12
    yy = y + 4800 - a
    mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - yy // 100 + yy // 400 - 32045 - 0.5


def jd_julian(y, m, d):
    """Julian Day Number at 00:00 UT for a Julian calendar date (astronomical year: 1 BC = 0)."""
    a = (14 - m) // 12
    yy = y + 4800 - a
    mm = m + 12 * a - 3
    return d + (153 * mm + 2) // 5 + 365 * yy + yy // 4 - 32083 - 0.5


def julian_date_from_jd(jd):
    """Meeus: JD -> Julian calendar date. Returns (astronomical year, month, day)."""
    z = int(jd + 0.5)
    f = jd + 0.5 - z
    b = z + 1524
    c = int((b - 122.1) / 365.25)
    d = int(365.25 * c)
    e = int((b - d) / 30.6001)
    day = b - d - int(30.6001 * e) + f
    month = e - 1 if e < 14 else e - 13
    year = c - 4716 if month > 2 else c - 4715
    return year, month, day


def era(astro_year):
    return f"{1 - astro_year} BC" if astro_year <= 0 else f"AD {astro_year}"


print("=" * 72)
print("02A  The Trillion Dare: $50,000 an hour since Year 1")
print("=" * 72)
TRILLION = 1_000_000_000_000
RATE_HR = 50_000                      # hypothetical rate from the viral claim
HRS_PER_YR = 365.25 * 24              # Julian year, includes leap days
hours = TRILLION / RATE_HR
years = hours / HRS_PER_YR
per_year = RATE_HR * HRS_PER_YR
print(f"line 1  $1T / $50K per hr        = {hours:,.0f} hours   (envelope: 20,000,000 hrs)")
print(f"line 2  hours per year           = 365.25 x 24 = {HRS_PER_YR:,.0f}")
print(f"        20M / 8,766              = {years:,.2f} years  (envelope: ~2,282 yrs, off {pct(2282, years):.3f}%)")
print(f"        earned per year          = ${per_year:,.0f}  (= $438.3M)")
print(f"        earned per day           = ${RATE_HR*24:,.0f}  (TikTok cut: $1.2M a day)")
viral_years = 2026 + 33
print(f"        viral video's AD slip    = 2026 + 33 = {viral_years:,} yrs x $438M (365-day) = ${viral_years*RATE_HR*24*365/1e9:,.1f}B (their $901.8B)")

jd_now = jd_gregorian(TODAY.year, TODAY.month, TODAY.day)
jd_year1 = jd_julian(1, 1, 1)            # 1 Jan AD 1, Julian calendar (historians' convention)
jd_caesar = jd_julian(-99, 7, 12)        # 12 Jul 100 BC (astronomical -99), Julian calendar
hrs_since_year1 = (jd_now - jd_year1) * 24
hrs_since_caesar = (jd_now - jd_caesar) * 24
earned_year1 = hrs_since_year1 * RATE_HR
earned_caesar = hrs_since_caesar * RATE_HR
print(f"ladder  start 1 Jan AD 1   -> {hrs_since_year1:,.0f} hrs -> ${earned_year1/1e9:,.1f}B  (screen: $888B, short by ${(TRILLION-earned_year1)/1e9:,.0f}B)")
print(f"ladder  start 12 Jul 100 BC -> {hrs_since_caesar:,.0f} hrs -> ${earned_caesar/1e9:,.1f}B  (screen: $931B, short by ${(TRILLION-earned_caesar)/1e9:,.0f}B)")
jd_start = jd_now - hours / 24
y, m, d = julian_date_from_jd(jd_start)
print(f"ladder  start for exactly $1T  -> {era(y)}, month {m}, day {d:.1f} (Julian calendar)  (screen: ~256 BC)")
print(f"        naive 2,282 - 2,026 = 256 BC lands on the right year because two errors cancel: no year 0 (+1 yr)")
print(f"        vs. starting from Oct 2026 with 2,281.5 yrs, not 2,282 (2026.77 - 2281.54 = astronomical -254.8 -> 256 BC)")
print(f"        Caesar born 100 BC -> the start is {(1 - y) - 100} years before his birth")
# the screen-3 timeline is drawn to scale: 256 BC at x=120, Year 1 at x=208, 2026 at x=905 (spec 02-rate-clock-a)
X_START, X_NOW = 120, 905
px_per_yr = (X_NOW - X_START) / years
x_year1 = X_START + (jd_year1 - jd_start) / 365.25 * px_per_yr
print(f"        timeline scale {px_per_yr:.3f} px/yr -> Year 1 tick belongs at x = {x_year1:.0f}  (spec: 208)")

print()
print("=" * 72)
print("02B  Apple's stopwatch: how long to make your salary")
print("=" * 72)
APPLE_REV = 416_161_000_000            # FY2025 net sales (Form 10-K)
APPLE_NI = 112_010_000_000             # FY2025 net income (Form 10-K)
SEC_365 = 365 * 86_400
SEC_FY = 364 * 86_400                  # FY2025 was a 52-week year (29 Sep 2024 - 27 Sep 2025)
fy_days = (date(2025, 9, 27) - date(2024, 9, 28)).days
WEEKLY = 1_251                         # BLS median usual weekly earnings, full-time, Q2 2026
salary = WEEKLY * 52
rev_ps = APPLE_REV / SEC_365
rev_ps_fy = APPLE_REV / SEC_FY
t_salary = salary / rev_ps
t_salary_fy = salary / rev_ps_fy
career = 40 * salary
t_career = career / rev_ps
t_career_fy = career / rev_ps_fy
print(f"seconds in a 365-day year        = {SEC_365:,}  (screen: 31.5M sec)")
print(f"FY2025 length                    = {fy_days} days")
print(f"line 1  $416.161B / 31.536M s    = ${rev_ps:,.1f}/sec  (screen: ~$13.2K/sec, off {pct(13_200, rev_ps):.2f}%)")
print(f"        exact over 364 days      = ${rev_ps_fy:,.1f}/sec")
print(f"        median salary            = $1,251 x 52 = ${salary:,}  (screen: $65K)")
print(f"line 2  $65,052 / $13,196/sec    = {t_salary:.3f} s  (screen: ~4.9 sec)")
print(f"        exact (364-day FY)       = {t_salary_fy:.3f} s  -> envelope off {pct(4.9, t_salary_fy):.2f}%")
print(f"        envelope check $65K/$13.2K = {65_000/13_200:.3f} s")
print(f"line 3  4.9 s x 40 yrs           = {4.9*40:.0f} s = {4.9*40/60:.2f} min  (screen and VO: ~3.3 min)")
print(f"        QA: 'three and a quarter' (3.25) was dropped from the VO; exact is {career/rev_ps_fy/60:.2f}-{career/rev_ps/60:.2f} min")
print(f"        exact career $2,602,080  = {t_career:.1f} s = {t_career/60:.2f} min (365-day) / {t_career_fy/60:.2f} min (364-day)")
print(f"        envelope 3.3 min vs exact {t_career_fy/60:.3f} min -> off {pct(3.3, t_career_fy/60):.2f}%")
ni_ps = APPLE_NI / SEC_365
ni_ps_fy = APPLE_NI / SEC_FY
print(f"profit  $112.010B / 31.536M s    = ${ni_ps:,.1f}/sec; exact 364-day ${ni_ps_fy:,.1f}/sec")
print(f"        salary in profit         = {salary/ni_ps:.1f} s (365-day) / {salary/ni_ps_fy:.1f} s (364-day)")
print(f"        career in profit         = {career/ni_ps/60:.1f} min (365-day) / {career/ni_ps_fy/60:.1f} min (364-day)")
print(f"extended cut: sales per minute ${rev_ps*60:,.0f}/min, per day ${APPLE_REV/365/1e9:,.2f}B (365-day)")
print(f"counter runs $0 -> ${salary:,} over {t_salary:.2f} s in the video (real time at the 365-day rate)")
print(f"        counter speed ${salary/round(t_salary, 2):,.0f}/s vs Apple ${rev_ps:,.0f}/s; stopwatch 0.0 -> {round(t_salary, 2)} s (shows 4.9)")
print(f"        career on the clock: {t_career:.0f} s = {int(t_career // 60)} min {t_career % 60:.0f} s (stamp: 3.3 MINUTES)")

print()
print("=" * 72)
print("02C  Spend $1 billion in 24 hours: the heartbeat clock")
print("=" * 72)
BILLION = 1_000_000_000
per_hr = BILLION / 24
per_min = BILLION / (24 * 60)
per_sec = BILLION / 86_400
print(f"line 1  $1B / 24 hrs             = ${per_hr:,.0f}/hr  (screen: ~$41.7M/hr)")
print(f"        per minute               = ${per_min:,.0f}/min")
print(f"line 2  $1B / 86,400 s         = ${per_sec:,.2f}/sec  (screen: $11,574/sec)")
print(f"        check $41.7M/3,600       = ${41_700_000/3600:,.0f}  (rounding the hourly first would give $11,583)")
BEATS = 100_000                         # ~100,000 beats/day (AHA, Cleveland Clinic, Texas Heart Institute)
per_beat = BILLION / BEATS
print(f"line 3  $1B / 100,000 beats      = ${per_beat:,.0f}/beat  (screen: $10,000/beat)")
print(f"        100,000 beats/day        = {BEATS/1440:.1f} beats per minute average")
for bpm in (60, 70, 100):
    beats = bpm * 1440
    print(f"        at {bpm:>3} bpm: {beats:>7,} beats/day -> ${BILLION/beats:,.0f}/beat  (envelope $10K off {pct(10_000, BILLION/beats):.1f}%)")
RUNTIME = 17.0                          # length of the 02C video in seconds (QA retime, was 17.8)
print(f"        VO 'over eleven and a half grand': ${per_sec:,.2f} > $11,500 -> {per_sec > 11_500}")
print(f"        bonus: 8 hrs asleep -> ${BILLION/(16*3600):,.0f}/sec while awake")
print(f"        bonus: this {RUNTIME}-second video = ${per_sec * RUNTIME:,.0f} of the billion")
# animation timing in spec 02-rate-clock-c
CLOCK_FROM, CLOCK_DUR = 86_400, 4.0
end = CLOCK_FROM - CLOCK_DUR
print(f"anim    countdown 24:00:00 -> {int(end // 3600):02d}:{int(end % 3600 // 60):02d}:{int(end % 60):02d} over {CLOCK_DUR} s (1 clock second per real second)")
HEART_BPM = 70
period = 60 / HEART_BPM
# engine pulse = 1 + scale*max(0, sin(pi*t*bpm/60))^8 beats once every 120/bpm s, so the spec passes bpm 140
print(f"        heart: pulse bpm 2 x {HEART_BPM} -> one beat every {120 / (2 * HEART_BPM):.3f} s = {60 / (120 / (2 * HEART_BPM)):.0f} bpm")
beats_shown = 4
print(f"        running total: +$10,000 on each of {beats_shown} beats, {period:.3f} s apart -> ${10_000 * beats_shown:,} spent after {period * (beats_shown - 1):.3f} s")
