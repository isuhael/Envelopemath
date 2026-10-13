# 02a publishing data: "It's just $3 a day": what it costs you by 65, by age (Becker Rig, find-your-row).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet).
#
# Facts come only from teasers/v2/02-find-your-row.md (section 02a) and python3 teasers/v2/checks/02-find-your-row.py.
# Research: vidIQ, pulled 2026-10-13. The render in renders/channel is the pre-condense cut; a condensed cut (timing
# only) is in progress. This sheet names no timestamp except the cover, which is picked by content (the finished
# table), so the copy carries over; the ship step rebuilds it with --covers from the final file.

TEASER = "02a Becker Rig, find-your-row: \"It's just $3 a day\": what it costs you by 65, by age"
PREPARED = "2026-10-13"
SHORT_ID = "02a"
MD_TITLE = "02a publishing sheet: \"It's just $3 a day\", by age"
MATH_RUN = "PASSED: all 183 checks"      # python3 teasers/v2/checks/02-find-your-row.py on studio/specs/, at the adversarial check, 2026-10-13
MATH_RUN_FIRST = "PASSED: all 177 checks"    # the same script at the first build, before the condense pass made it cut-aware
MATH_RUN_WIP = "PASSED: all 216 checks"      # the same script with --spec on the three condensed cuts in studio/specs-wip/

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the round-2 Becker Rig port of 2026-10-08 as `renders/channel` holds it on 2026-10-13. A condensed cut is in progress (timing only: the numbers, captions and verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the finished table), so the copy carries over. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/02-find-your-row.md` (02a) and its check, "
    f"`python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13), and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cuts "
    "in `studio/specs-wip/`, which carry every string and number the copy quotes. The builder runs it through "
    "`publishing/data/checks/02-find-your-row.py`, which passes its output through and adds the summary line in the builder's form. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every row it names from "
    "$91.25 a month at 7% ÷ 12, and keeps each row's figures beside their age.",
    "- **Honesty rules kept.** The title asks and never gives a result, and the Instagram caption's first 125 characters carry no figure but $3 and 65. "
    "Every claim stays inside the video's own verdict (\"10 years younger? It costs more than double.\") and its footer (7% a year until 65; no tax, fees or inflation). "
    "The copy calls 7% an assumption, not a forecast, and says what \"costs you\" means: what the same $3 a day would have grown to. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** None is named. The video's $3 is a generic daily amount with no product or logo, and the copy keeps it that way, so no affiliation line is needed.",
    "- **Cover.** The write-up picks the completed table as the cover (Gage Heward's one cover A/B: 4,348 vs 2,844, n = 1), so the cover shows every row's answer, "
    "as a find-your-row table has to. The title and the caption's opening stay result-free.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds on 2026-10-13: the pre-condense cut. The ship step rebuilds this file with --covers from the condensed cut.")
CUT = {"name": "pre-condense (round-2 Becker Rig port, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "status": "in renders/channel on 2026-10-13; a condensed cut (timing only) is in progress",
       "on_ship": f"python3 publishing/tools/build_publishing.py {BASE} --covers (re-picks the cover by content, re-exports both JPGs, refreshes for_video)"}

FACTS = {
    "source": f"teasers/v2/02-find-your-row.md section 02a; teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$3 a day, hypothetical: $3 × 365 = $1,095 a year; ÷ 12 = $91.25 a month, deposited at the end of each month until 65",
    "rate": "7% a year compounded monthly (7% ÷ 12 each month, about 7.23% a year effective): an assumption, not a forecast; no tax, fees or inflation",
    "red": "what you think it costs = $1,095 × (65 − age), exact",
    "green": "what it really costs you = FV of $91.25 a month at 7%/12 until 65, rounded to the nearest $1,000 ($100 below $10,000)",
    "rows": "18 $51,465 ≈ $400,000; 20 $49,275 ≈ $346,000; 25 $43,800 ≈ $240,000; 30 $38,325 ≈ $164,000; 35 $32,850 ≈ $111,000; "
            "40 $27,375 ≈ $74,000; 45 $21,900 ≈ $48,000; 50 $16,425 ≈ $29,000; 55 $10,950 ≈ $16,000; 60 $5,475 ≈ $6,500",
    "picks": "18: $400,261.67 ÷ $51,465 = 7.777 ≈ 7.8×; 25: $239,514.22 ÷ $43,800 = 5.468 ≈ 5.5×; 25 vs 35: $239,514.22 ÷ $111,322.35 = 2.152 ≈ 2.2×",
    "verdict": "10 years younger? It costs more than double: FV(age) ÷ FV(age + 10) > 2 for every whole age 18-54 (min 2.092 at 18, max 15.98 at 54)",
    "why": "at 7% money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and starting 10 years younger also adds 10 years of deposits",
    "at_10pct": "pinned comment only: 25 → ≈ $577,000; 18 → ≈ $1,170,000",
    "scaling": "every cell is linear in the daily amount: $6 a day doubles a row (pinned comment and caption)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "\"It's Just $3 a Day.\" What It Really Costs You by 65 — Find Your Age"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. The video's own header (the viewer's excuse, quoted) plus the format's task. All 68 characters show in most players, and it needs no investing verb, so it reads as maths, not advice."},
    {"rank": 2, "title": "\"It's Just $3 a Day.\" What It Really Costs You by 65 If You Don't Invest It. Find Your Age", "vidiq_score": 98,
     "note": "Top score, 1 point over the pick, and it says the mechanism ('invest'), but at 90 characters the Shorts player cuts it after 'by 65', and 'If You Don't Invest It' leans toward telling the viewer what to do."},
    {"rank": 3, "title": "\"It's Just $3 a Day.\" What It Really Costs You by 65, by Age", "vidiq_score": 96,
     "note": "The shortest strong option (60 characters): the header plus 'by age'."},
]
YT_TITLES_ALSO_SCORED = [
    ("\"It's Just $3 a Day.\" What It Really Costs You by 65 If You Invested It Instead. Find Your Age", 98, "95 chars; 'what it costs you if you invested it' reads backwards"),
    ("\"It's Just $3 a Day.\" What It Really Costs You by 65, Find Your Age", 97, "the pick with a comma splice"),
    ("What $3 a Day Really Costs You by 65 If You'd Invested It Instead, by Age", 95, ""),
    ("\"It's Just $3 a Day.\" What It Really Costs You by 65 #compoundinterest #investing #personalfinance", 95, "the house 3-hashtag form, 97 chars"),
    ("\"It's Just $3 a Day\": What It Costs You by 65, by Age", 94, "the write-up's title"),
    ("Your Life If You Invested $3 a Day Instead of Spending It, by Age", 94, "borrows the 'your life if you invested $5 a day' search phrase"),
    ("What $3 a Day Really Costs You by 65, by Age", 88, "without the quote"),
    ("What Spending $3 a Day Really Costs You by 65 #compoundinterest #investing #personalfinance", 88, ""),
]
TITLE_BULLETS = [
    "The quote is the hook the write-up's hook pass adopted (7.5 from two judges): the viewer's own excuse, read back. Every quoted version scores 94-98 and every unquoted one 88-95, so the quote stays.",
    "'Really' comes from the green column's label ('What it really costs you') and lifts the write-up's title from 94 to 96-98. '— Find Your Age' is the format's one instruction: the viewer's job is to find their row.",
    "No result in it: the only figures are the $3 input and the 65 horizon, both on frame 1. The 'invest' versions (98) are kept as option 2; vidIQ's model ranks titles but does not predict views, so the pick is decided on what shows first and on staying advice-free.",
]

YT_DESCRIPTION = """"It's just $3 a day." Find your age. Red is the $3 a day you'd hand over by 65; green is what it would have grown to at 7% a year. At 25: $43,800 handed over vs about $240,000. Every 10 years younger, it costs you more than double.

The math, shown:
• $3 × 365 = $1,095 a year. ÷ 12 = $91.25 a month, added at the end of each month until 65.
• Red, what you think it costs: $1,095 × the years left to 65. At 18 that's $51,465.
• Green, what it really costs you: the same $91.25 a month grown at 7% ÷ 12 each month. At 18: ≈ $400,000 (≈ 7.8× the red).
• At 25: $43,800 vs ≈ $240,000 (≈ 5.5×). At 35: $32,850 vs ≈ $111,000.
• 25 vs 35: it costs ≈ 2.2× as much at 25.
• It holds for every pair of whole ages 10 years apart, from 18 vs 28 up to 54 vs 64: the younger age always costs more than double (the closest is 18 vs 28, ≈ 2.09×).
• Why: at 7%, money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and 10 years younger also adds 10 years of deposits.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $3 a day is a hypothetical amount, and 7% a year is an assumption, not a forecast: 7% ÷ 12 each month (about 7.23% a year effective), deposits at the end of each month, stopping at 65. Green is rounded to the nearest $1,000 ($100 below $10,000). No tax, fees or inflation. Not financial advice.
#CompoundInterest #PersonalFinance #investing"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the 'more than double' rests on a stated 7% and on no tax, fees or inflation, "
             "so 'a number that shouldn't be true' would oversell it.")

YT_HASHTAGS = ["#CompoundInterest", "#PersonalFinance", "#investing"]
YT_HASHTAG_NOTES = [
    ("#CompoundInterest", "the exact topic of the green column ('compound interest' 137,873 searches a month; down 17.3% on its 30-day baseline, still the biggest on-topic phrase)."),
    ("#PersonalFinance", "the broad category ('personal finance' 1,436,792 a month) and the most used hashtag in the channel's titles (5 of the 29 recent Shorts vidIQ lists)."),
    ("#investing", "the alternative the red column is measured against ('investing' 613,566 a month), and the first title hashtag on the channel's 'Start Investing 10 Years Late?' Short, the same idea in another format."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["compound interest", "compound interest explained", "compound interest by age", "what if you invested $3 a day",
           "cost of waiting to invest", "what happens if you invest at the age of 18", "latte factor", "small daily expenses",
           "opportunity cost", "personal finance", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'cost of waiting to invest' (3,507 a month, competition 22.6) is the verdict's idea; "
             "'latte factor' and 'small daily expenses' name the habit the $3 stands for without naming a product. "
             "Left out on purpose: 'how to invest at 18' (8,452) and 'what should i invest in at 18 years old' (4,956) are how-to and advice intent; "
             "'your life if you invested $5 a day' (43,958) names a different amount; vidIQ's matching terms for '3 a day' return only meals and water.")

YT_PINNED = """What rate would you plug in? 7% is a round, middle-of-the-road rate, not a prediction (7% ÷ 12 each month, about 7.23% a year effective). At 10%, the 25 row becomes ≈ $577,000 and the 18 row ≈ $1,170,000.

Rule of thumb: at 7%, money roughly doubles every decade (72 ÷ 7 ≈ 10.3 years), and starting 10 years younger also adds 10 years of deposits, so each decade younger costs you more than double. Spend $6 a day? Double your row."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: the write-up found that comments on by-age tables argue about the rate (Gage Heward's: '10% vs 7% vs 8%'), "
               "so the pinned comment invites that argument and answers it with the 10% rows. The rest is the write-up's pinned comment: why each decade more than doubles, "
               "and the scaling rule (every cell is linear in the daily amount), which lets a viewer who spends more than $3 find their own number.")

RELATED_VIDEO = {
    "pick": {"id": "EqFQCJheCMU", "title": "Start Investing 10 Years Late? You Get Half.",
             "url": "https://www.youtube.com/shorts/EqFQCJheCMU",
             "why": "The verdict's twin in another format: $10,000 once at 25 vs 35 halves; $3 a day, with the extra 10 years of deposits, more than doubles. Live since Tue 6 Oct 2026, 22:27 ET."},
    "swap_when_live": "02b or 02c, the other find-your-row tables, once published; then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the finished-table frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the finished-table frame (all 10 rows, the gold plate on the 25 row and the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 02a condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one find-your-row teaser (02a, 02b, 02c) per evening: the three share a format and a cover style.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "06c (Mon 03:45 ET) had 760 views by 13 Oct; 06b (Mon 12:14 ET, the day before) had 61. The evening slot is also the best one on Instagram, so one evening serves both. "
           "n = 7 and confounded by topic, so treat it as a test. Search demand for 'compound interest' is down 17.3% on its baseline and 'financial literacy' up 11.9%; neither is a reason to rush.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("\"It's just $3 a day.\" Find your age: what $3 a day really costs you by 65, next to what you think it costs. "
           "Compound interest, by age.")

IG_CAPTION = IG_HOOK + """

Red is what you'd hand over by 65. Green is what that $3 a day really costs you, if you'd invested it at 7% a year instead of spending it.

The math, shown:
• $3 × 365 = $1,095 a year, or $91.25 a month.
• At 18: $51,465 handed over vs ≈ $400,000 (≈ 7.8×).
• At 25: $43,800 vs ≈ $240,000 (≈ 5.5×).
• At 35: $32,850 vs ≈ $111,000.
• Every 10 years younger, it costs you more than double: 25 vs 35 is ≈ 2.2×.

7% ÷ 12 each month (about 7.23% a year), deposits at the end of each month until 65. 7% is an assumption, not a forecast. No tax, fees or inflation. Not financial advice.

Spend $6 a day? Double your row. What rate would you plug in?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#compoundinterest #personalfinance #investingforbeginners #financialliteracy #moneytips"""
IG_CAPTION_RULE = ("The first 125 characters are the quoted excuse, the task ('Find your age') and the 'compound interest' keyword, with no result: "
                   "the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's caption line 1 ('\"It's just $3 a day.\" Find your age.'), then the question in the viewer's words and the keyword 'compound interest'. "
    "The only figures are $3 and 65, both inputs on frame 1. The numbers sit below 'more', where Instagram search and Google indexing still read them.",
    "The second paragraph is the write-up's caption, which says what red and green mean, so the 'costs you' framing is explained before any number.",
    "The assumptions paragraph says 7% is an assumption, not a forecast, and repeats the footer's 'no tax, fees or inflation'. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#compoundinterest", "#personalfinance", "#investingforbeginners", "#financialliteracy", "#moneytips"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#compoundinterest` names the topic ('compound interest' 137,873 searches a month on YouTube).",
    "- `#investingforbeginners` and `#financialliteracy` are the tags two of the by-age outliers in section 3 use (@mike.cpa, @robeverydayfinance); 'financial literacy' is rising (+11.9%).",
    "",
    "`#personalfinance` is the broad layer, and `#moneytips` ('money tips' 111,384 a month, +81.6%) is the habit angle the caption's '$6 a day' line plays to.",
]

IG_ALT_SHORT = "Table by age: $3 a day handed over by 65 vs grown at 7%. At 25: $43,800 vs about $240,000."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', so screen readers read it cleanly, "
                     "and it names the 25 row, the one the video's verdict lands on.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white page. The header quotes: 'It's just $3 a day.' What it costs you by 65. Footer: at 7% a year until 65, "
               "no tax, fees or inflation. A green stick figure stands beside shelves with a row for each age from 18 to 60: what you think it costs, in red "
               "($3 a day times the years left to 65), and what it really costs you, the same money grown at 7% a year. He shrugs, then points "
               "at 18: about $400,000, about 7.8 times the red $51,465; then at 25: about $240,000. Then he draws a bracket from the 35 row up to the 25 row, "
               "and the 25 row's figure lands on a gold plate: about 2.2 times the cost at 35. Verdict: 10 years younger? It costs more than double.")

IG_FIRST_COMMENT = ("At 25: $43,800 handed over vs ≈ $240,000 at 7% a year. 10 years younger costs more than double. "
                    "What rate would you plug in?")

# ---------------------------------------------------------------- the cover frame
# The finished table, picked by content on the pre-condense render (2026-10-13): the payoff lands at 10.70 s (frame 321)
# with the impact's shake; from 11.30 s (frame 339) the mean frame-to-frame luma change (270×480 greyscale) stays at or
# under 0.016 until the end card cuts in at 13.40 s. The cover is taken at 11.4 s (frame 342), inside that hold.
COVER_T = 11.4
COVER_FRAME = 342
COVER_CROP = "crop=1080:1440:0:78"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The finished table, which the write-up names as the cover (its beat sheet marks the hold after the payoff 'the cover frame', and its Instagram note says "
                          "'Cover: the completed table'): all 10 rows from 18 to 60, red beside green; the 25 row's ≈ $240,000 on the gold plate; the bracket from the 35 row "
                          "up to the 25 row; the pill '≈ 2.2× the cost at 35'; the figure pointing at the plate, pencil in hand; and the verdict '10 years younger? / It costs "
                          "more than double.' under the table. Use the first settled frame of that hold, after the impact's shake and before the end card.")
COVER_FRAME_MEASURED = ("On the pre-condense 15.9 s render the payoff lands at 10.70 s (frame 321) with the impact's shake; from 11.30 s (frame 339) the mean frame-to-frame "
                        "luma change (270×480 greyscale) stays at or under 0.016 until the end card cuts in at 13.40 s. The cover is taken at 11.4 s (frame 342), inside that hold.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 78 to 1518 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1484 (the verdict's underline), "
                   "so the crop centres it: badge, quoted header, footer, all 10 rows with the plate, bracket and pill, and the verdict; it drops the empty floor. "
                   "A centred grid crop (y 240-1680) loses the badge and leaves the header on the top edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the finished-table frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header and the verdict.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the quoted header over the 18 row only). It asks without answering, but the write-up chooses the completed table, after Gage Heward's one cover A/B "
    "(4,348 vs 2,844, n = 1), and a by-age table shows every viewer a different answer, so the cover gives no single result away.",
    "**Condensed cut:** the ship step re-picks this frame by content on the final file (the first settled frame after the gold plate lands) and re-exports both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A version test afterwards, if you want one. The write-up's Instagram A version is this cut with captions off (the same spec rendered with \"captions\": false); "
                     "it is not in renders/channel, so it needs a studio render first. Post it as a Trial with MANUAL graduation 48-72 h later and compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = ("Rename the original audio to '$3 a day, by age — The Back of the Envelope' if the app allows; it is the score, with no voice. "
            "The write-up suggests trending in-app audio for the Instagram cut (Gage Heward's 1,150,974-play version ran a pop track); if you try it, test it as the Trial above.")
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The same idea's other Reel ('10 years late', 219 plays) had the worst skip rate (65.1%), so the cover and the first 125 characters matter more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("compound interest", 137873, 76.7, 50.6, 65.8, "seed; -17.3% vs its 30-day baseline (166,772); the green column's topic", "2026-10-12"),
    ("compound interest explained", 51994, 70.4, 40.3, 66.1, "-11.3% vs its baseline (58,623); the US is its top market", "2026-10-12"),
    ("your life if you invested $5 a day", 43958, 69.3, 56.5, 59.0, "-1.8% vs its baseline (44,753): a daily amount over a lifetime has demand; another amount, so not a tag", "2026-10-12"),
    ("how to invest at 18", 8452, 58.6, 44.0, 57.6, "how-to intent, not a tag", "2026-10-12"),
    ("your life if you invested 5 dollars a day", 5410, 55.7, 31.2, 61.0, "", "2026-08-16"),
    ("what happens if you invested $10 a day", 5384, 55.7, 23.9, 63.9, "competition 23.9", "2026-08-24"),
    ("what happens if you invest at the age of 18", 4027, 53.8, 37.0, 57.5, "the first row's question", "2026-08-11"),
    ("cost of waiting to invest", 3507, 52.9, 22.6, 62.7, "the verdict's idea; low competition", "2026-09-13"),
    ("your life if you invest $300 a month starting at 18 vs. 28", 3172, 52.3, 23.3, 62.0, "the same 10-year gap, monthly", "2026-10-12"),
    ("financial literacy", 256914, 80.8, 46.7, 69.8, "+11.9% vs its baseline (229,567)", "2026-10-12"),
    ("personal finance (topic)", 1436792, 91.9, 60.0, 71.1, "-18.1% vs its baseline (1,754,064)", "2026-10-12"),
    ("money tips", 111384, 75.3, 42.0, 68.4, "+81.6% vs its baseline (61,342)", "2026-10-12"),
    ("3 a day (matching terms)", 0, 0, None, None, "every match is about meals or water: no '$3 a day' money phrase is indexed", None),
]
KEYWORD_MD_NOTE = {"your life if you invested $5 a day": "-1.8%: a daily amount over a lifetime has demand; another amount, so not a tag"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and matching_terms modes), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, "
                   "so each row carries its snapshot date in metrics_as_of; four rows are older snapshots (2026-08-11 to 2026-09-13).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("'compound interest' is the big on-topic phrase (137,873 a month at competition 50.6), so it leads the hashtags. The long tail around this video is "
            "'a daily amount, invested, over a lifetime' ('your life if you invested $5 a day', 43,958 at competition 56.5; the '$10 a day' and '5 dollars' versions 5,384-5,410 at 23.9-31.2) "
            "and 'starting at 18' (3,172-8,452 at 23.3-44.0), plus 'cost of waiting to invest' (3,507 at 22.6), "
            "but most of it is how-to intent or names another amount, so the title keeps the video's own words and the tags take the neutral phrases. "
            "No '$3 a day' money phrase reaches vidIQ's index.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("What happens if you invest $1 per day starting at 18🤯💰📈", "Nick Meyer, CFP®", 296000, 2061, "2021-09-30", "15 s; one age, $1 a day"),
    ("Just invest $1 per day, everyday, and thank me later... 🤝😎", "Infinity Investing", 11200, 1580, "2022-07-23", "talked, 58 s"),
    ("$1 a Day From Age 18 Could Become $132,000 #shorts", "FinancialShift", 5, 307, "2026-06-20",
     "the same 7% maths for one age, with the '10 years late' version in its description"),
    ("The $3 Decision That Costs You $1 Million by Age 65 (The Math Will Shock You) #Shorts", "TopFindsNow", 64, 103, "2026-07-18",
     "the same $3 a day as a coffee habit, with a hype title; its $1 million is not checked here"),
    ("$1 a day makes you a millionaire", "Money Minute Lab", 3, 56, "2026-04-19"),
]
SAME_IDEA_HEADING = "**2. The same idea on YouTube is small and talked through (vidIQ YouTube search, under 4 min).**"
SAME_IDEA_MD = [
    "Five channels have posted 'a small daily amount, invested from a young age'. None passes 2,100 views: the biggest is a CFP's 15-second $1-a-day Short from 2021 (2,061). "
    "All of them give one age, not a row for every age, and the only $3 version ('The $3 Decision That Costs You $1 Million by Age 65 (The Math Will Shock You)') "
    "has 103 views with the kind of hype title the house avoids. So the pick keeps the video's own quote and asks the viewer to find their row.",
    "",
    "Next door, the compounding explainers travel: Zack D. Films' 'How Saving Every Month Builds Wealth 😮' (30,891,874 views), Graham Stephan's "
    "'Do THIS in Your 20's To Become a MILLIONAIRE' (3,865,020) and Brian Feroldi's 'The Power of Compounding' (3,281,518, outlier score 127) are among the biggest Shorts the searches returned.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): 5 channels with the daily-amount-from-a-young-age idea, all under 2,100 views, each for one age only; "
                  "the only $3 version has 103 views. The by-age table is unclaimed on YouTube Shorts.")

OUTLIERS = [
    {"handle": "@keysfinance", "platform": "TikTok", "id": "7666160850981408013",
     "on_screen": "How to retire with $2M", "views": "3.3M (1,457.8x the account median of 2.3K)",
     "note": "a list of starting ages beside the creator, one amount per age: the find-your-row grammar, talked"},
    {"handle": "@mike.cpa", "platform": "TikTok", "id": "7677353915838401823",
     "on_screen": "why you need to start early ROTH IRA", "views": "1.7M (385.0x the account median of 4.4K)",
     "note": "18 vs 25 as static text over b-roll, music only, 5 s, looped"},
    {"handle": "@robeverydayfinance", "platform": "TikTok", "id": "7674692215729425694",
     "on_screen": "How much you need to invest monthly for $2m", "views": "602.8K (145.7x)",
     "note": "the by-age list again; caption tags #PersonalFinance #financialliteracy #investingforbeginners"},
    {"handle": "@felix.padilla.eng", "platform": "TikTok", "id": "7673438595176320269",
     "on_screen": "HOW MUCH MONEY YOU WASTE WITHOUT NOTICING", "views": "260.8K (243.9x)",
     "note": "small daily expenses added up, static text, music only, 6 s"},
    {"handle": "@spendshiftofficial", "platform": "Instagram", "id": "Dcnv5ngT_gA",
     "on_screen": "A $150 Saturday, $150 a week, $7,800 a year, $78,000 every 10 years", "views": "201K (101.7x the account median of 2K)",
     "note": "a small habit re-priced over years, static text, no voice, looped"},
]
OUTLIERS_HEADING = "**3. The by-age list and the small-habit sum travel on TikTok and Instagram (vidIQ IG/TikTok outlier search, last 30 days).**"
OUTLIERS_MD = [
    "- **@keysfinance** (TikTok), \"How to retire with $2M\": 3.3M (1,457.8x). **@robeverydayfinance** (TikTok), \"How much you need to invest monthly for $2m\": 602.8K (145.7x). "
    "**@trellthetrainer** (Instagram), \"HOW TO RETIRE WITH $5M\": 1.5M (3.7x). All three are a column of starting ages with one number each: the find-your-row grammar.",
    "- **@mike.cpa** (TikTok), \"why you need to start early ROTH IRA\": 1.7M (385.0x), 18 vs 25 as static text with music only.",
    "- **@felix.padilla.eng** (TikTok), \"HOW MUCH MONEY YOU WASTE WITHOUT NOTICING\": 260.8K (243.9x), and **@spendshiftofficial** (Instagram), \"A $150 Saturday … $78,000 every 10 years\": 201K (101.7x). Small habits added up, no voice.",
    "- The no-voice ones (@mike.cpa, @felix.padilla.eng, @spendshiftofficial) reach 100-385x their medians, which backs the write-up's music-only Instagram cut. "
    "None of them puts what you think it costs beside what it really costs, row by row; 02a does.",
]

OWN_YT = [  # id, title, posted (ET), views (vidIQ, 2026-10-13)
    ("LjHDFzVxRyM", "Can You Find the Missing Dollar?", "Sun 07:04", 1254),
    ("hJBvmGA6sZ0", "You Can Lean on $1 Million. Not on $1 Billion.", "Thu 00:25", 1221),
    ("XVUeMcTg9OQ", "Your Interest Has a Speed Limit", "Sun 05:49", 1141),
    ("fbpdKf4Wy8c", "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? (06c)", "Mon 03:45", 760),
    ("8__HTUa2PoU", "Pay the Minimum on $5,000? 238 Months.", "Mon 22:09", 642),
    ("FW_oxA3kbsM", "A $2 Lottery Ticket Was Worth $6.98. Until the Fine Print.", "Wed 12:03", 348),
    ("mXbKY_R63h4", "You Can Carry $1 Million. Not in Pennies.", "Thu 13:38", 177),
    ("EqFQCJheCMU", "Start Investing 10 Years Late? You Get Half.", "Tue 22:27", 161),
    ("krfZEHhb0xU", "What If You Bought Netflix Stock Instead of Paying for Netflix? (06b)", "Mon 12:14", 61),
]
OWN_IG = [  # shortcode, topic, posted (ET), plays, skip rate %, avg watched % (owner insights, 2026-10-13)
    ("DeIvYk7I4Qr", "$5,000 on the minimum", "Mon 22:46", 7302, 27.4, 56.5),
    ("DeOEthJJ1TG", "$1M stack vs Burj Khalifa", "Thu 00:28", 5449, 27.0, 83.1),
    ("DeWgFZRoR_S", "Missing dollar", "Sun 07:05", 1997, 32.0, 81.3),
    ("DeMvZv9IqRw", "Powerball $6.98", "Wed 12:05", 1825, 58.7, 57.9),
    ("DeYuqT4pjVC", "06c latte vs Starbucks stock", "Mon 03:46", 1711, 40.3, 69.1),
    ("DePe11HIHwn", "$1M in pennies", "Thu 13:37", 598, 42.0, 66.7),
    ("DeLSd9io8UK", "10 years late", "Tue 22:30", 219, 65.1, 30.6),
    ("DeEW2ZMIiYd", "Speed limit (e)", "Sun 05:54", 177, 56.9, 31.2),
]
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; pulled 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,518 views in 30 days.",
    "",
    "06b went up on both platforms on Mon 12 Oct at 12:14 ET, midday: 61 views on YouTube by 13 Oct, and its Reel's insights are not in yet (Instagram lags). "
    "It is left out of the medians, as is 06c (760 views, 1,711 plays, 40.3% skip), both too young.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic):",
    "",
    "- **YouTube:** Sunday early morning ET 1,198, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "**A warning for 02a:** 'Start Investing 10 Years Late? You Get Half.' is 02a's verdict in a domino format, and it is the channel's weakest October post on both platforms "
    "(161 views; 219 plays with a 65.1% skip rate). 02a changes the frame-1 hook (the viewer's own excuse, quoted), shows a row for every age, and puts the 'you think' number in red beside the real one. "
    "Skip rate is the number to watch on day 1.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the pre-condense cut. The cover's time and frame are measured on it; the copy names no other timestamp, and the ship step re-picks the cover on the final file.",
    "Outlier views and medians are vidIQ's index at pull time; the same-idea Shorts' own maths (for example a $3 habit 'costing $1 million') is not checked here and is not in the copy.",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "How Saving Every Month Builds Wealth 😮", "channel": "Zack D. Films", "subscribers": 29100000, "views": 30891874, "published": "2026-06-06"},
        {"title": "Do THIS in Your 20's To Become a MILLIONAIRE", "channel": "Graham Stephan", "subscribers": 5180000, "views": 3865020, "published": "2025-02-27"},
        {"title": "The Power of Compounding", "channel": "Brian Feroldi", "subscribers": 319000, "views": 3281518, "published": "2025-05-23", "note": "outlier score 127.35"},
    ],
    "write_up_benchmarks": "Gage Heward, 'What $1 costs you by age': 1,150,974 plays (210x his median), 14 s, no voice, 48 rows (H64 in the write-up; not re-pulled here).",
    "titles_scored": "11 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ at the adversarial check (2026-10-13; {MATH_RUN_FIRST.split(': ')[1]} at the first build, "
                f"before the condense pass made the check cut-aware), and {MATH_RUN_WIP.split(': ')[1]} with --spec on the condensed cuts in studio/specs-wip/; run by the builder through "
                "publishing/data/checks/02-find-your-row.py; every public figure traced to the 02a maths table and recomputed in MATH_RELATIONS (FV of $91.25 a month at 7%/12), "
                "each row's figures pinned beside their age and the verdict's range pinned to its pairs (COPY_RULES)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: compound interest 137,873 / 50.6 (-17.3%); your life if you invested $5 a day 43,958; cost of waiting to invest 3,507 / 22.6; 11 titles scored: pick 97, top 98, write-up's title 94; "
                   "channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. Re-scored at the end of the build: the pick 97. "
                   "Re-queried at the adversarial check: the pick's title score 97; compound interest 137,873 / 50.6 (-17.3% on 166,772); channel 53 / 10,221 / 41; "
                   "the related Short EqFQCJheCMU 162 views (161 at the build), published 02:27 UTC 7 Oct (Tue 6 Oct 22:27 ET). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} at this check ({MATH_RUN_FIRST.split(': ')[1]} at the first build; the condense pass has since made the check cut-aware), "
    f"and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cut, which keeps every string and number the copy quotes. Every public figure traces to the 02a maths table: $1,095 / $91.25; 18 $51,465 / ≈ $400,000 (≈ 7.8×); "
    "25 $43,800 / ≈ $240,000 (≈ 5.5×); 35 $32,850 / ≈ $111,000; 25 vs 35 ≈ 2.2×; the verdict holds for every pair 10 years apart from 18 vs 28 to 54 vs 64 (closest ≈ 2.09×, 18 vs 28); "
    "72 ÷ 7 ≈ 10.3; at 10% ≈ $577,000 and ≈ $1,170,000. The data file recomputes each from $91.25 a month at 7% ÷ 12.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 11 titles scored against this channel: the pick 97, the top 98 (twice), the write-up's title 94. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** The pick's title score 97; 'compound interest' 137,873 / 50.6 (−17.3%); the channel 53 / 10,221 / 41; the related Short (`EqFQCJheCMU`) 162 views, "
    "Tue 6 Oct 22:27 ET. All match (one view of drift). The channel's 29 recent Shorts carry #PersonalFinance in 5 titles, the most of any hashtag.",
    "- **Changed.**",
    "  - The description's verdict-range bullet said 'At every whole age from 18 to 54, 10 years younger costs more than double (2.09× at 18 is the closest)', which reads as 54 vs 44 "
    "and leaves '2.09× at 18' unexplained. It now names the pairs the check asserts (18 vs 28 up to 54 vs 64) and gives ≈ 2.09× its '≈' and its pair. "
    "A new copy rule keeps 2.09 with '18 vs 28' and 64 with '54 vs 64', and the rounded-ratio rule now covers 2.09.",
    "  - The maths count: the sheet said 177 checks; the 02 check now prints 183 on `studio/specs/` (and 216 on the condensed cuts with `--spec`), so the intro, `facts` and this log say so.",
    "  - Hashtag notes: #investing is the first title hashtag on 'Start Investing 10 Years Late?', not 'the third tag' (it is not among that Short's tags); "
    "#PersonalFinance is in 5 of the 29 recent Shorts vidIQ lists, not '5 of the last 30'.",
    "  - Keyword outro: 'at low competition (22.6-44.0)' covered 'your life if you invested $5 a day', which is at 56.5; it now gives each cluster's own range.",
    "- **Mutation test.** At the first build, five mutations of a scratch copy each failed by name: a green figure under the wrong age, a dropped '≈', the verdict without '10 years younger', a result in the title, and a spelled-out '$6'. "
    "At this check, four more fail by name: '≈ 2.09×' moved away from '18 vs 28', '2.09×' without its '≈', '54 vs 44' (44 is no maths figure), and 'up to age 64' without its 54. "
    "The first of them passed until the rule was tightened to the pair itself, not just the line. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 02 check prints 'PASSED: all N checks', and the builder reads only 'N checks, F failed', so `MATH_SCRIPT` is "
    "`publishing/data/checks/02-find-your-row.py`, a pass-through that runs the 02 check unchanged and adds that line (exit code passed through).",
    "- **Kept on purpose.**",
    "  - The cover is the finished table with the verdict, not frame 1: the write-up names it, and a by-age table answers a different row for each viewer.",
    "  - The title keeps the quote and drops 'invest': the 'invest' versions score 1 point higher but read as a nudge, and the description's first line explains the comparison.",
    "  - The copy names no product: the write-up's $3 is generic, so 'latte factor' appears only as a tag, the generic concept 06c's sheet also uses.",
    "  - The cover frame was re-exported to a scratch folder: both JPGs are byte-identical to the files here. The condensed cut's spec carries the same header, footer, rows, captions, pick labels and verdict, so no copy changes on ship.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 02a maths table (teasers/v2/02-find-your-row.md, section 02a) and
# recomputed below from its inputs ($3 a day, 7% a year ÷ 12, until 65).
FIGURES = {
    "$3", "$6", "$1,095", "$91.25", "365", "12", "65", "7", "7.23", "10", "72", "10.3", "54", "64",
    "18", "25", "28", "35", "60",
    "$51,465", "$43,800", "$32,850", "$400,000", "$240,000", "$111,000", "$577,000", "$1,170,000",
    "7.8×", "5.5×", "2.2×", "2.09×", "7.8", "2.2",
    "$1,000", "$100", "$10,000",
}
_r = 0.07 / 12
_fv = lambda age, rate=0.07: 91.25 * ((1 + rate / 12) ** ((65 - age) * 12) - 1) / (rate / 12)
_red = lambda age: 1095 * (65 - age)
MATH_RELATIONS = [
    (3 * 365 == 1095 and round(1095 / 12, 2) == 91.25, "$3 × 365 = $1,095; ÷ 12 = $91.25"),
    (round((1 + _r) ** 12 - 1, 4) == 0.0723, "7% ÷ 12 monthly = 7.23% a year effective"),
    ((_red(18), _red(25), _red(35)) == (51465, 43800, 32850), "red: $1,095 × years to 65 at 18, 25, 35"),
    (round(_fv(18), -3) == 400000, "FV at 18 ≈ $400,000"),
    (round(_fv(25), -3) == 240000, "FV at 25 ≈ $240,000"),
    (round(_fv(35), -3) == 111000, "FV at 35 ≈ $111,000"),
    (round(_fv(18) / _red(18), 1) == 7.8, "18: ≈ 7.8× the red"),
    (round(_fv(25) / _red(25), 1) == 5.5, "25: ≈ 5.5× the red"),
    (round(_fv(25) / _fv(35), 1) == 2.2, "25 vs 35: ≈ 2.2×"),
    (all(_fv(a) / _fv(a + 10) > 2 for a in range(18, 55)), "10 years younger costs more than double, every pair from 18 vs 28 to 54 vs 64"),
    (min(range(18, 55), key=lambda a: _fv(a) / _fv(a + 10)) == 18 and round(_fv(18) / _fv(28), 2) == 2.09, "the closest: 2.09× at 18"),
    (round(72 / 7, 1) == 10.3, "72 ÷ 7 ≈ 10.3 years"),
    (round(_fv(25, 0.10), -3) == 577000 and round(_fv(18, 0.10), -4) == 1170000, "at 10%: ≈ $577,000 (25), ≈ $1,170,000 (18)"),
]
MATH_SCRIPT = "publishing/data/checks/02-find-your-row.py"
MATH_KEY_LINES = ["FV($91.25/mo, 7%/12, 564 mo) = $400,261.67 → ≈ $400,000", "FV($91.25/mo, 7%/12, 480 mo) = $239,514.22 → ≈ $240,000",
                  "FV(age) ÷ FV(age + 10), ages 18-54: min 2.092 (age 18), max 15.98 (all > 2)", "at 10%: age 25 → $577,000, age 18 → $1,170,000"]
RESULT_RE_TITLE = r"\d{2,3},\d{3}|double|×|7\.8|5\.5|2\.2|\$1,095|\$91"
RESULT_RE_CAPTION = r"\d{2,3},\d{3}|double|×|≈|7\.8|5\.5|2\.2|\$1,095|\$91"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right age, so a
# swapped "At 25: … ≈ $400,000" or a spelled-out "four hundred thousand" would pass it. These pin each figure to its context.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_AGE = _re.compile(r"\b[Aa]t (\d{2})\b(?!%)")              # "At 25", "at 18" (not "at 10%")


def _age_of(fig, age):
    """every occurrence of fig has, as the nearest 'At NN' before it on its line, the right age"""
    for ln in _lines():
        for m in _re.finditer(_re.escape(fig), ln):
            before = [a.group(1) for a in _AGE.finditer(ln[:m.start()])]
            if not before or before[-1] != age:
                return False
    return True


def _with(fig, needs, skip=()):
    """every line that names fig also names one of needs"""
    return all(any(n in ln for n in needs) for ln in _lines(skip) if _re.search(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?)\b", _re.I)
COPY_RULES = [
    (all(_age_of(f, a) for f, a in [("$51,465", "18"), ("$400,000", "18"), ("7.8", "18"), ("$43,800", "25"), ("$240,000", "25"),
                                     ("5.5×", "25"), ("$32,850", "35"), ("$111,000", "35")]),
     "each row's figures sit after their own 'At NN' (18, 25, 35)"),
    (all(_re.search(r"(?:≈|about) \$" + f, ln) for f in ("400,000", "240,000", "111,000", "577,000", "1,170,000")
         for ln in _lines() if "$" + f in ln), "every rounded green figure is 'about' or '≈'"),
    (all(_re.search(r"(?:≈|about) " + _re.escape(f), ln) for f in ("7.8", "5.5×", "2.2", "2.09", "10.3")
         for ln in _lines() if f in ln), "every rounded ratio is 'about' or '≈'"),
    (all(len(_re.findall(r"2\.09", ln)) == len(_re.findall(r"18 vs 28, (?:≈|about) 2\.09", ln)) for ln in _lines())
     and all(len(_re.findall(r"\b64\b", ln)) == len(_re.findall(r"\b54 vs 64\b", ln)) for ln in _lines()),
     "≈ 2.09× is always 18 vs 28, and 64 only ever pairs with 54 (the verdict's range, ages 18-54 vs 10 years older)"),
    (_with(r"2\.2", ("35",)) and _with(r"2\.2", ("25",), skip=("long alt text",)), "≈ 2.2× always says it is 25 against 35"),
    (_with(r"more than double", ("10 years",)), "'more than double' always comes with '10 years younger'"),
    (_with(r"\$577,000|\$1,170,000", ("10%",)), "the 10% rows always say 10%"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"double", "doubles"},
     "no spelled-out figures beyond 'double' (the verdict and the scaling rule)"),
]
