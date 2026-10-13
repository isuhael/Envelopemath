# 02b publishing data: how fast Elon's $1 trillion pay plan earns your whole career's pay (Scoreboard, find-your-row).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet, same look).
#
# Facts come only from teasers/v2/02-find-your-row.md (section 02b) and python3 teasers/v2/checks/02-find-your-row.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "02b Scoreboard, find-your-row: \"How fast Elon's $1 trillion pay plan earns your whole career's pay\""
PREPARED = "2026-10-13"
SHORT_ID = "02b"
MD_TITLE = "02b publishing sheet: Elon's $1 trillion pay plan vs your career's pay"
MATH_RUN = "PASSED: all 183 checks"      # python3 teasers/v2/checks/02-find-your-row.py on studio/specs/, at the adversarial check, 2026-10-13
MATH_RUN_FIRST = "PASSED: all 177 checks"    # the same script at the first build, before the condense pass made it cut-aware
MATH_RUN_WIP = "PASSED: all 216 checks"      # the same script with --spec on the three condensed cuts in studio/specs-wip/
MATH_RUN_SHIP = "PASSED: all 225 checks"   # python3 teasers/v2/checks/02-find-your-row.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 16.5 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/02-find-your-row.md` (02b) and its check, "
    f"`python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13), and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cuts "
    "in `studio/specs-wip/`, which carry every string and number the copy quotes. The builder runs it through "
    "`publishing/data/checks/02-find-your-row.py`, which passes its output through and adds the summary line in the builder's form. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the plan's ≈ $3,169 a second "
    "and every row it names, and keeps each row's figures beside their wage.",
    "- **Honesty rules kept.** The title asks and never gives a result, and the Instagram caption's first 125 characters carry no figure but the $1 trillion and the 40 years, both on frame 1. "
    "The description, the caption, the pinned comment and the long alt text say the $1 trillion is the plan's maximum ('up to', 'max', 'if every target is hit'), and the first three say it is Tesla stock, not cash; "
    "the title and the short alt text use the header's own words ('$1 trillion pay plan'). ≈ $3,169 a second is that maximum "
    "averaged over 10 years, not a forecast. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand and person.** \"Tesla\" names the company whose shareholders approved the plan, and \"Elon Musk\" the person it is for; neither is used for anything else. "
    "Both platforms' copy says 'Not affiliated with or endorsed by Tesla or Elon Musk.' The video has no logo or photo: the names are text only. "
    "No share price is named, so no adjusted-price wording is needed.",
    "- **News context.** Third-party videos in the research report that Musk became a trillionaire by net worth in June 2026 after a SpaceX listing (not verified here). "
    "That is a different $1 trillion, so every copy item says 'pay plan' and none says 'his trillion'.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 16.5, "sha256": "33ca241089a0de4b5a61effd21a215797d58b33bac5235a7b7f6358c02b3d2c0",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/02-find-your-row.md section 02b; teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "plan": "Tesla pay plan for Elon Musk worth up to $1 trillion in Tesla stock over the next decade if every target is hit, paid in tranches; approved by shareholders on 2025-11-06 with over 75% support (Reuters via Business Standard; Anadolu Agency; Malay Mail)",
    "plan_clock": "10 × 365.25 × 24 × 3,600 = 315,576,000 s; $1,000,000,000,000 ÷ 315,576,000 = $3,168.81 a second ≈ $3,169 (about $11.4 million an hour): the maximum averaged evenly over 10 years, day and night",
    "career": "wage × 2,080 hours a year × 40 years = wage × 83,200 hours; whole dollars, exact; before tax",
    "rows": "$7.25 $603,200 ≈ 3.2 min; $15 $1,248,000 ≈ 6.6 min; $20 $1,664,000 ≈ 8.8 min; $25 $2,080,000 ≈ 10.9 min; $30 $2,496,000 ≈ 13.1 min; "
            "$40 $3,328,000 ≈ 17.5 min; $50 $4,160,000 ≈ 21.9 min; $75 $6,240,000 ≈ 32.8 min; $100 $8,320,000 ≈ 43.8 min; $500 $41,600,000 ≈ 3.6 hrs; $1,000 $83,200,000 ≈ 7.3 hrs",
    "minimum_wage": "$7.25 an hour, the US federal minimum since 2009-07-24 (US Department of Labor; BLS)",
    "caption_roundings": "the on-screen captions say '≈ 3 minutes' (3.173 min), 'under 9 minutes' (8.752) and '≈ 7 hours' (7.293 hrs); the rows and the verdict say ≈ 3.2 min and ≈ 7.3 hours",
    "verdict": "Even $1,000/hr for 40 years: ≈ 7.3 hours of his",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Long Would It Take Elon Musk's $1 Trillion Pay Plan to Earn Your Whole Career's Pay?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score. 'How long would it take … to earn' is the grammar of the search 'how long would it take to earn elon musk salary shorts' (3,963 a month), "
             "'Elon Musk' is spelled out for search, and the rest is the video's own header ('$1 trillion pay plan', 'whole career's pay')."},
    {"rank": 2, "title": "How Long Would It Take Elon Musk's Pay Plan to Earn Your Whole Career's Pay? Find Your Wage", "vidiq_score": 98,
     "note": "Same score, 92 characters. It swaps '$1 Trillion' for the format's task; the trillion is the hook's object, so the pick keeps it."},
    {"rank": 3, "title": "40 Years at Your Wage vs Elon Musk's $1 Trillion Pay Plan: How Fast Does He Earn It?", "vidiq_score": 95,
     "note": "The versus framing; 'How Fast Does He Earn It' reads as his pay, not the plan's maximum."},
]
YT_TITLES_ALSO_SCORED = [
    ("How Long Would It Take Elon Musk's Pay Plan to Earn Your 40-Year Salary? Find Your Wage", 98, "'salary' for an hourly wage"),
    ("How Long Would It Take Elon Musk's $1 Trillion Pay Plan to Earn Your 40-Year Pay?", 97, ""),
    ("How Fast Does Elon Musk's $1 Trillion Pay Plan Earn Your Whole Career's Pay? #ElonMusk #Tesla #money", 94, "the house 3-hashtag form, exactly 100 chars"),
    ("How Fast Elon's $1 Trillion Pay Plan Earns Your Whole Career's Pay", 93, "the write-up's title"),
    ("How Fast Does Elon Musk's $1 Trillion Pay Plan Earn Your Whole Career's Pay?", 93, ""),
    ("Your Whole Career's Pay vs Elon Musk's $1 Trillion Pay Plan, by Wage", 92, ""),
]
TITLE_BULLETS = [
    "'Elon Musk's $1 Trillion Pay Plan' sits at characters 24-55, and the whole question is 88 characters. Every 'How long would it take' version scores 97-98, every title that opens 'How Fast' 93-94.",
    "No result in it: the only figure is the plan's $1 trillion, which the header shows on frame 1, and the answer (minutes, then hours) is what the video pays off. "
    "It raises the write-up's title from 93 to 98.",
    "'Pay Plan', not 'his trillion': third-party videos report Musk's net worth passing $1 trillion in June 2026, a different number, so the title names the plan.",
]

YT_DESCRIPTION = """How long would it take Elon Musk's $1 trillion Tesla pay plan to earn your whole career's pay? At the $7.25 federal minimum wage, 40 years of pay is $603,200: the plan's average earns that in about 3.2 minutes. Even at $1,000 an hour, 40 years ($83,200,000) takes it about 7.3 hours.

The math, shown:
• The plan: up to $1 trillion in Tesla stock over the next decade, if every target is hit. Spread evenly over 10 years, day and night (315,576,000 seconds): ≈ $3,169 a second, about $11.4 million an hour.
• Your career: your wage × 2,080 hours a year × 40 years = your wage × 83,200 hours, before tax.
• $7.25/hr: $603,200 ≈ 3.2 minutes of the plan.
• $20/hr: $1,664,000 ≈ 8.8 minutes. Under 9.
• $100/hr: $8,320,000 ≈ 43.8 minutes.
• $1,000/hr: $83,200,000 ≈ 7.3 hours.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. In Nov 2025, Tesla shareholders approved a pay plan that could give Elon Musk up to $1 trillion in Tesla stock over the next decade, paid in tranches only if targets are hit (Reuters; Anadolu Agency). ≈ $3,169 a second is that maximum averaged evenly over 10 years of 365.25 days, 24 hours a day: stock, not cash, and not a forecast. $7.25 is the US federal minimum wage, in force since July 2009 (US Department of Labor). Not financial advice. Not affiliated with or endorsed by Tesla or Elon Musk.
#ElonMusk #Tesla #MinimumWage"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the minutes rest on the plan's maximum spread evenly over 10 years, "
             "so 'a number that shouldn't be true' would oversell it.")

YT_HASHTAGS = ["#ElonMusk", "#Tesla", "#MinimumWage"]
YT_HASHTAG_NOTES = [
    ("#ElonMusk", "the person the plan is for ('elon musk' 1,516,854 searches a month; down 3.9% on its 30-day baseline, by far the biggest phrase here)."),
    ("#Tesla", "the company whose shareholders approved it ('tesla' 1,116,464 a month)."),
    ("#MinimumWage", "the video's first row and first caption ('minimum wage' 11,780 a month; down 33.9% on its baseline, but the only wage phrase with volume)."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["elon musk", "elon musk trillion dollar pay package", "tesla shareholders approve $1 trillion pay package for elon musk",
           "elon musk 1 trillion", "how long would it take to earn elon musk salary", "how much does elon musk make per minute",
           "how much money does elon musk make per second", "tesla", "minimum wage", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags; 'elon musk trillion dollar pay package' (3,720) and the shareholder-vote phrase (3,660) are the exact topic. "
             "Left out on purpose: 'spacex elon musk pay package' (3,378) is another company's plan; 'why elon musk has no salary' (4,407) and the other 'elon musk salary' phrases want his base salary; "
             "'andrew tate on elon musk pay package' (5,039) is about another person.")

YT_PINNED = """Which row is yours? Your 40-year career is 83,200 hours (2,080 a year × 40), before tax.

It's Tesla stock, paid in tranches only if targets are hit, so ≈ $3,169 a second is the plan's $1 trillion maximum averaged over 10 years (315,576,000 seconds): about $11.4 million an hour."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own row (R3); the hours let a viewer whose wage is not on the board do their own. "
               "The second paragraph is the write-up's pinned comment: it answers the two comments to expect, 'it's stock, not cash' and 'he only gets it if the targets are hit'.")

RELATED_VIDEO = {
    "pick": {"id": "hJBvmGA6sZ0", "title": "You Can Lean on $1 Million. Not on $1 Billion.",
             "url": "https://www.youtube.com/shorts/hJBvmGA6sZ0",
             "why": "The same viewer intent, the scale of a fortune in something you can picture; it is the channel's second-best October Short (1,221 views). Live since Thu 8 Oct 2026, 00:25 ET."},
    "swap_when_live": "02a or 02c, the other find-your-row tables, once published; then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the finished-board frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the finished-board frame (all 11 rows, the $1,000/hr row lit and the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 02b condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one find-your-row teaser (02a, 02b, 02c) per evening. "
               "Keep it at least a few days from 10b: the write-up flags that 10b uses the same device (40 years of your pay against a mega-rate clock).",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "06c (Mon 03:45 ET) had 760 views by 13 Oct; 06b (Mon 12:14 ET, the day before) had 61. The evening slot is also the best one on Instagram, so one evening serves both. "
           "n = 7 and confounded by topic, so treat it as a test. There is no news peg: the plan was approved in Nov 2025, and 'elon musk' searches are flat (-3.9%).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "Find your wage: how long would Elon Musk's $1 trillion pay plan take to earn your whole 40-year career's pay?"

IG_CAPTION = IG_HOOK + """

Your career: your wage × 2,080 hours a year × 40 years = your wage × 83,200 hours, before tax. The plan: up to $1 trillion in Tesla stock over the next decade if every target is hit, spread evenly over 10 years, day and night: ≈ $3,169 a second.

The math, shown:
• $7.25/hr (the federal minimum): $603,200 ≈ 3.2 minutes of the plan.
• $20/hr: $1,664,000 ≈ 8.8 minutes.
• $100/hr: $8,320,000 ≈ 43.8 minutes.
• $1,000/hr: $83,200,000 ≈ 7.3 hours.

Even $1,000 an hour for 40 years: ≈ 7.3 hours of his.

Why a trillion? In Nov 2025, Tesla shareholders approved a pay plan that could give Elon Musk up to $1 trillion in Tesla stock over the next decade, if every target is hit. It's stock, paid in tranches, not cash, and ≈ $3,169 a second is that maximum averaged. Not financial advice. Not affiliated with or endorsed by Tesla or Elon Musk.

Which row is yours?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#elonmusk #tesla #minimumwage #moneyfacts #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the task ('Find your wage') and the question, with the 'Elon Musk', '$1 trillion pay plan' and 'career' keywords and no result: "
                   "the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's caption line 1 ('Find your wage'), then the header as a question. The only figures are the $1 trillion and the 40 years, both on frame 1. "
    "The minutes and hours sit below 'more', where Instagram search and Google indexing still read them.",
    "The second paragraph gives both inputs before any result: the career (wage × 83,200 hours, before tax) and the plan's maximum spread over 10 years. "
    "The 'Why a trillion?' paragraph is the write-up's caption, with 'stock, not cash' added.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#elonmusk", "#tesla", "#minimumwage", "#moneyfacts", "#personalfinance"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#elonmusk` and `#tesla` name the person and the company the plan is about (the two biggest phrases in the research).",
    "- `#minimumwage` names the first row, the one most viewers measure themselves against.",
    "",
    "`#moneyfacts` is the tag on the channel's own 'You Can Lean on $1 Million. Not on $1 Billion.' (1,221 views), the same big-number scale, and `#personalfinance` is the broad layer.",
]

IG_ALT_SHORT = "Table: how long Elon Musk's $1 trillion pay plan takes to earn 40 years of your pay, by wage."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It carries no result, and the long version gives the rows. "
                     "'Pay plan' keeps it from reading as his net worth.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. Header: Elon's $1 trillion pay plan earns your whole career's pay in… Footer: plan max ÷ 10 years, 24/7; "
               "you: 40 years × 2,080 hours. 11 rows, a wage on each, from the $7.25 federal minimum to $1,000 an hour: 40 years of that pay, and how long "
               "the plan's average (about $3,169 a second) takes to earn it. A pointer lights $7.25 an hour: $603,200, about 3.2 minutes. "
               "Then $20 an hour: $1,664,000, about 8.8 minutes. Then $1,000 an hour: $83,200,000, about 7.3 hours. "
               "Verdict: even $1,000 an hour for 40 years: about 7.3 hours of his.")

IG_FIRST_COMMENT = ("At $7.25 an hour, 40 years of pay ($603,200) takes the plan ≈ 3.2 minutes. At $1,000 an hour, ≈ 7.3 hours. "
                    "Which row is yours?")

# ---------------------------------------------------------------- the cover frame
# The finished board, picked by content on the shipped condensed cut (2026-10-13): the verdict slams in at 6.05 s and
# settles by 6.33 s (frame 190); from there the mean frame-to-frame luma change (270×480 greyscale) stays at or under
# 0.007 until the end card cuts in at 7.60 s. The cover is taken at 6.5 s (frame 195).
COVER_T = 6.5
COVER_FRAME = 195
COVER_CROP = "crop=1080:1440:0:76"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The finished board with the $1,000/hr row lit, which the write-up names as the Instagram cover ('the completed table, with the $1,000/hr row lit'): "
                          "the header 'ELON'S $1 TRILLION PAY PLAN / EARNS YOUR WHOLE CAREER'S PAY IN…', the footer, all 11 wage rows from $7.25/hr to $1,000/hr with their "
                          "40-year pay and their time, the pointer and glow on '$1,000/HR · $83,200,000 · ≈ 7.3 HRS', and the verdict 'EVEN $1,000/HR / FOR 40 YEARS: / "
                          "≈ 7.3 HOURS OF HIS.' in the strip. Use the first settled frame after the verdict lands, before the end card.")
COVER_FRAME_MEASURED = ("On the shipped 10.1 s condensed cut the verdict slams in at 6.05 s and settles by 6.33 s (frame 190); from there the mean frame-to-frame luma change "
                        "(270×480 greyscale) stays at or under 0.007 until the end card cuts in at 7.60 s. The cover is taken at 6.5 s (frame 195), inside that hold. On the "
                        "16.5 s pre-condense render it was 11.0 s (frame 330).")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 76 to 1516 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1452 (the verdict's last line), "
                   "so the crop centres it: badge, header, footer, the whole board and the verdict; it drops the empty black floor. "
                   "A centred grid crop (y 240-1680) loses the badge and leaves the header on the top edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the finished-board frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header and the verdict.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the header over the $7.25 row only, '≈ 3.2 MIN' already on it). The write-up chooses the completed table, after Gage Heward's one cover A/B "
    "(4,348 vs 2,844, n = 1); every viewer still has to find their own wage on it.",
    "**Shipped cut (2026-10-13):** the finished board was re-picked by content on the shipped file (the first settled frame after the verdict lands, 6.5 s) and both JPGs re-exported from it. It shows the same board, lit $1,000/hr row and verdict as the pre-condense cover.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A version test afterwards, if you want one: the same spec rendered with \"captions\": false (the write-up says the music-only cut with the pointer labels works on this look, "
                     "as HD Guy's Shorts run). It is not in renders/channel, so it needs a studio render first. Post it as a Trial with MANUAL graduation 48-72 h later and compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Your career vs a $1 trillion pay plan — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The best of them, '$1M stack vs Burj Khalifa' (5,449 plays, 27.0% skip), is the same big-number scale as this Reel.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("elon musk (topic)", 1516854, 92.3, 58.6, 71.9, "-3.9% vs its 30-day baseline (1,578,257)", "2026-10-12"),
    ("tesla (topic)", 1116464, 90.3, 57.2, 71.3, "-10.0% vs its baseline (1,240,321)", "2026-10-12"),
    ("minimum wage", 11780, 60.8, 61.0, 52.1, "-33.9% vs its baseline (17,822)", "2026-10-12"),
    ("how much does elon musk make per minute", 5322, 55.6, 36.9, 58.6, "the per-time framing", "2026-06-04"),
    ("elon musk 1 trillion", 5270, 55.6, 51.0, 52.9, "-0.8% vs its baseline (5,310); much of it may now be his reported net worth, not the plan", "2026-10-12"),
    ("how much does elon musk make in a day?", 4831, 55.0, 36.5, 58.4, "", "2026-09-30"),
    ("how much money does elon musk make per second?", 4824, 55.0, 52.0, 52.2, "", "2026-10-12"),
    ("why elon musk has no salary", 4407, 54.4, 38.0, 57.4, "base-salary intent, not a tag", "2026-10-12"),
    ("how long would it take to earn elon musk salary shorts", 3963, 53.7, 40.8, 55.9, "the title's grammar", "2026-10-12"),
    ("elon musk trillion dollar pay package", 3720, 53.3, 50.5, 51.8, "seed: the exact topic", "2026-08-22"),
    ("tesla shareholders approve $1 trillion pay package for elon musk", 3660, 53.2, 58.0, 48.7, "the news event (Nov 2025)", "2026-02-25"),
    ("spacex elon musk pay package", 3378, 52.7, 56.0, 49.2, "another company's plan, not a tag", "2026-05-30"),
]
KEYWORD_MD_NOTE = {"elon musk 1 trillion": "-0.8%; may now mean his reported net worth, not the plan"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and matching_terms modes), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, "
                   "so each row carries its snapshot date in metrics_as_of; five rows are older snapshots (2026-02-25 to 2026-09-30).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Five rows are older snapshots.")
KW_OUTRO = ("'elon musk' (1,516,854 a month) and 'tesla' (1,116,464) dwarf everything specific, so they lead the hashtags. The specific phrases are a cluster of 3,700-5,300 a month at "
            "competition 37-58: 'how much does elon musk make per minute / per second / in a day', 'how long would it take to earn elon musk salary' and the pay-package phrases. "
            "The title takes the 'how long would it take' grammar and the pay-plan words; the tags take the rest.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How rich is Elon Musk ACTUALLY!! #shorts #interestingfacts", "Think Witus", 164000, 3775532, "2025-10-22", "net worth, 23 s"),
    ("how much money does Elon Musk make?", "Finance Data", 3110, 721054, "2023-09-26", "16 s; about 232× the channel's subscribers"),
    ("🤯 $1 TRILLION PAYDAY! 💰 Elon Musk's Historic Tesla Stock Compensation Approved by Shareholders! 🚀", "Manish Talks", 2280, 1242, "2025-11-07",
     "its description gives $2,784 a second from an $878 billion net figure; ours is the $1 trillion maximum ÷ 10 years (not checked here)"),
    ("Tesla VP Said ONE Sentence… Elon Made $1 Trillion. 😳", "The Wade Report", 7140, 1104, "2025-11-13"),
    ("Elon Musk’s $1 Trillion Paycheck! #shorts #viral #fyp", "Money Mechanics with Nash", 1350, 337, "2025-10-02", "2:19 long"),
    ("Elon Musk is a Trillionaire", "Thomas Mulligan", 2150000, 7599420, "2026-06-13", "net worth after a reported SpaceX listing, not the pay plan"),
]
SAME_IDEA_HEADING = "**2. The pay plan itself is covered as news; nobody prices it in the viewer's own career (vidIQ YouTube search, under 4 min).**"
SAME_IDEA_MD = [
    "The pay-plan Shorts are news reads with hype titles and small views (337-1,242). The ones that travel re-price his money for the viewer: Finance Data's 16-second "
    "'how much money does Elon Musk make?' (721,054 on 3,110 subscribers) and Think Witus' 'How rich is Elon Musk ACTUALLY!!' (3,775,532). "
    "None found sets the plan against a whole career's pay, row by row. Since June 2026 the biggest Musk Shorts are about his reported trillionaire net worth "
    "(Thomas Mulligan, 7,599,420; FactTechz, 5,682,014), a different number, which is why the copy always says 'pay plan'.",
    "",
    "Next door, Mark Tilbury's 'What if everyone got $1 billion? 😳' (37,854,551) shows how far a big-number re-pricing can go.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance since Sep 2025): pay-plan Shorts are news reads at 337-1,242 views; the re-pricing ones travel "
                  "(721,054 and 3,775,532); none prices the plan in the viewer's career. Musk's reported trillionaire net worth (June 2026) dominates the topic and is not verified here.")

OUTLIERS = [
    {"handle": "@money_reel", "platform": "TikTok", "id": "7680121852244610335",
     "on_screen": "Making $300 A Second, Jeff Bezos Pays His $1,000 Illegal Fence Fine In 4 Seconds.", "views": "1.5M (3,333.3x the account median of 450)",
     "note": "a billionaire's per-second rate set against a small sum, 8 s, music only"},
    {"handle": "@rich.empire769", "platform": "TikTok", "id": "7676168327663766815",
     "on_screen": "Jeff Bezos spends $25 million a year to keep his superyacht afloat, except he earns that in JUST 3 HOURS", "views": "464.6K (175.9x)",
     "note": "the same 'he earns it in' grammar, 7 s, music only"},
    {"handle": "@plumbriteservices", "platform": "Instagram", "id": "DdUs982T_zd",
     "on_screen": "Billionaires' sallary in minutes:", "views": "866.3K (36.6x the account median of 23.7K)",
     "note": "billionaire earnings in minutes beside a tradesman's pay, music only"},
    {"handle": "@histainment", "platform": "Instagram", "id": "Db5ZL90ywEo",
     "on_screen": "If you have a $1 net worth, you are closer to the 2nd richest person on earth than he is to Elon.", "views": "661.2K (86.2x)",
     "note": "Musk's wealth re-priced against 'you', a static graphic, music only"},
]
OUTLIERS_HEADING = "**3. 'He earns your money in minutes' travels on TikTok and Instagram, with no voice (vidIQ IG/TikTok outlier search, last 30 days).**"
OUTLIERS_MD = [
    "- **@money_reel** (TikTok), \"Making $300 A Second, Jeff Bezos Pays His $1,000 Illegal Fence Fine In 4 Seconds.\": 1.5M (3,333.3x).",
    "- **@rich.empire769** (TikTok), \"Jeff Bezos spends $25 million a year to keep his superyacht afloat, except he earns that in JUST 3 HOURS\": 464.6K (175.9x).",
    "- **@plumbriteservices** (Instagram), \"Billionaires' sallary in minutes:\": 866.3K (36.6x). **@histainment** (Instagram), \"If you have a $1 net worth, you are closer to the 2nd richest person on earth than he is to Elon.\": 661.2K (86.2x).",
    "- All four are music only, with the comparison in static text: a billionaire's rate turned into a unit the viewer owns. None uses the viewer's own wage or a whole career, which 02b does on every row. "
    "Their on-screen line states a result; this Reel's caption keeps it below 'more' because the board shows it from frame 1.",
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
    "The channel's two big-number scale posts ('You Can Lean on $1 Million. Not on $1 Billion.': 1,221 views, 5,449 plays, 27.0% skip) are among its best, "
    "which is the closest read on how 02b's 'a trillion in your units' may do.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the shipped condensed cut (2026-10-13). The cover's time and frame are measured on it; the copy names no other timestamp and carried over from the pre-condense cut unchanged.",
    "Musk's reported trillionaire net worth after a SpaceX listing (June 2026) comes only from third-party video titles and descriptions; it is not verified here and is not in the copy.",
    "dol.gov and the Reuters original could not be opened in the write-up's research (the proxy blocks dol.gov); the plan and the minimum wage rest on the write-up's named sources.",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "What if everyone got $1 billion? 😳", "channel": "Mark Tilbury", "subscribers": 9200000, "views": 37854551, "published": "2025-09-25"},
        {"title": "Billionaires Are Crying Today! Elon Musk is NOW 1st EVER 'Trillionaire' After Spacex IPO #shorts", "channel": "FactTechz",
         "subscribers": 21600000, "views": 5682014, "published": "2026-06-15", "note": "net worth, not the pay plan; India-facing"},
    ],
    "write_up_benchmarks": "HD Guy, 'Cost in Units of RTX 5090': 30,617,461 (62.49x) and 'F-16 Afterburner Fuel Cost in Real Time': 28,289,823 (110.85x) (H01, H02 in the write-up; not re-pulled here).",
    "titles_scored": "9 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ at the adversarial check (2026-10-13; {MATH_RUN_FIRST.split(': ')[1]} at the first build, "
                f"before the condense pass made the check cut-aware), and {MATH_RUN_WIP.split(': ')[1]} with --spec on the condensed cuts in studio/specs-wip/; run by the builder through "
                "publishing/data/checks/02-find-your-row.py; every public figure traced to the 02b maths table and recomputed in MATH_RELATIONS (the plan's $3,168.81 a second, wage × 83,200), "
                "each row's figures pinned beside their wage (COPY_RULES)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: elon musk 1,516,854 (-3.9%); elon musk trillion dollar pay package 3,720 / 50.5; how long would it take to earn elon musk salary shorts 3,963 / 40.8; 9 titles scored: pick 98, write-up's title 93; "
                   "channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. Re-scored at the end of the build: the pick 98. "
                   "Re-queried at the adversarial check: the pick's title score 98; 'how long would it take to earn elon musk salary' has one matching term, the 'shorts' one, 3,963 / 40.8; "
                   "channel 53 / 10,221 / 41; the related Short hJBvmGA6sZ0 1,222 views (1,221 at the build), published 04:25 UTC 8 Oct (Thu 00:25 ET), title hashtags #moneyfacts #billion #Animation. All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} at this check ({MATH_RUN_FIRST.split(': ')[1]} at the first build; the condense pass has since made the check cut-aware), "
    f"and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cut, which keeps every string and number the copy quotes. Every public figure traces to the 02b maths table: 315,576,000 s; ≈ $3,169 a second; about $11.4 million an hour; "
    "83,200 hours; $7.25 $603,200 ≈ 3.2 min; $20 $1,664,000 ≈ 8.8 min (under 9); $100 $8,320,000 ≈ 43.8 min; $1,000 $83,200,000 ≈ 7.3 hrs. The data file recomputes each.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 9 titles scored against this channel: the pick 98, the write-up's title 93. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** The pick's title score 98; the title's search phrase, 'how long would it take to earn elon musk salary shorts', 3,963 / 40.8 (the only matching term); "
    "the channel 53 / 10,221 / 41; the related Short (`hJBvmGA6sZ0`) 1,222 views, Thu 8 Oct 00:25 ET, with #moneyfacts first among its title hashtags. All match (one view of drift).",
    "- **Changed.**",
    "  - The intro said every copy item that names the $1 trillion calls it the maximum and says it is stock. The title and the short alt text do neither (they use the header's words), "
    "and the long alt text says 'max' but not 'stock', so the intro now names which items say what. The copy rules already held each item to that.",
    "  - A new copy rule, line by line: any '$1 trillion' that is not the header's '$1 trillion (Tesla) pay plan' must carry 'up to', 'max' or 'maximum' on its own line. "
    "The item-level rule let a bare '$1 trillion in Tesla stock' through as long as 'maximum' appeared anywhere else in the item. The copy already met the new rule; no copy changed.",
    "  - The pick's note quoted the search as 'how long would it take to earn elon musk salary'; vidIQ indexes it only with 'shorts' on the end, so the note now quotes that.",
    "  - Title bullet: 'every How fast version 93-94' missed option 3, which ends 'How Fast Does He Earn It?' and scores 95; it now says 'every title that opens How Fast'.",
    "  - #MinimumWage note: 'first spoken line' became 'first caption'. The video has no narration; its captions are on-screen text. `facts.vo_roundings` became `facts.caption_roundings` for the same reason.",
    "  - The maths count: the sheet said 177 checks; the 02 check now prints 183 on `studio/specs/` (and 216 on the condensed cuts with `--spec`), so the intro, `facts` and this log say so.",
    "- **Mutation test.** At the first build, four mutations of a scratch copy each failed by name: a time under the wrong wage, a dropped '≈', 'his $1 trillion', and a result in the caption's first 125 characters. "
    "At this check, four more fail by name: the description without either 'up to', the caption's inputs paragraph without 'up to', the caption without the affiliation line, and '≈ 7.3 hours' moved under $100/hr. "
    "The two 'up to' mutations passed at first: the item-level rule was still met by 'that maximum' further down. The new line-level rule (below) catches both. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 02 check prints 'PASSED: all N checks', and the builder reads only 'N checks, F failed', so `MATH_SCRIPT` is "
    "`publishing/data/checks/02-find-your-row.py`, a pass-through that runs the 02 check unchanged and adds that line (exit code passed through).",
    "- **Kept on purpose.**",
    "  - The rows and the verdict keep one rounding (≈ 3.2 minutes, ≈ 7.3 hours) everywhere in the copy; the captions' '≈ 3 minutes' and '≈ 7 hours' stay in the video only.",
    "  - The title and the short alt text say '$1 trillion pay plan' without 'up to', as the header does; every longer item says it is the maximum (in the description, the first bullet).",
    "  - #ElonMusk and #Tesla lead the hashtags: they name the person and the company the video is about (descriptive use), and both platforms carry 'Not affiliated with or endorsed by Tesla or Elon Musk.'",
    "  - The cover is the finished board with the verdict, as the write-up names it. Re-exported to a scratch folder, both JPGs are byte-identical to the files here, "
    "and the condensed cut's spec carries the same header, footer, rows, captions, pick labels and verdict, so no copy changes on ship.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The finished board was re-picked by content at 6.5 s (frame 195), inside the settled verdict hold. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 02b maths table (teasers/v2/02-find-your-row.md, section 02b) and
# recomputed below from its inputs ($1 trillion over 10 years; wage × 2,080 × 40); dates are inputs from the write-up's sources.
FIGURES = {
    "$1", "$7.25", "$20", "$100", "$1,000", "$603,200", "$1,664,000", "$8,320,000", "$83,200,000",
    "3.2", "8.8", "43.8", "7.3", "9", "$3,169", "$11.4", "1", "315,576,000", "365.25", "24", "24/7",
    "2,080", "40", "83,200", "10", "11", "2025", "2009",
}
_per_s = 1e12 / (10 * 365.25 * 24 * 3600)
_min = lambda wage: wage * 83200 / _per_s / 60
MATH_RELATIONS = [
    (10 * 365.25 * 24 * 3600 == 315576000, "10 × 365.25 × 24 × 3,600 = 315,576,000 s"),
    (round(_per_s) == 3169, "$1 trillion ÷ 315,576,000 s ≈ $3,169 a second"),
    (round(_per_s * 3600 / 1e6, 1) == 11.4, "≈ $11.4 million an hour"),
    (2080 * 40 == 83200, "2,080 hours × 40 years = 83,200 hours"),
    ([w * 83200 for w in (7.25, 20, 100, 1000)] == [603200, 1664000, 8320000, 83200000], "wage × 83,200 for $7.25, $20, $100, $1,000"),
    (round(_min(7.25), 1) == 3.2, "$7.25: ≈ 3.2 minutes"),
    (round(_min(20), 1) == 8.8 and _min(20) < 9, "$20: ≈ 8.8 minutes, under 9"),
    (round(_min(100), 1) == 43.8, "$100: ≈ 43.8 minutes"),
    (round(_min(1000) / 60, 1) == 7.3, "$1,000: ≈ 7.3 hours"),
]
MATH_SCRIPT = "publishing/data/checks/02-find-your-row.py"
MATH_KEY_LINES = ["10 × 365.25 × 24 × 3,600 = 315,576,000 s; $1,000,000,000,000 ÷ 315,576,000 = $3,168.81/s → ≈ $3,169",
                  "$7.25 × 83,200 = $603,200;  ÷ $3,168.81/s = 190.4 s = 3.173 min → ≈ 3.2 min",
                  "$1,000.00 × 83,200 = $83,200,000;  ÷ $3,168.81/s = 26,255.9 s = 437.599 min → ≈ 7.3 hrs"]
RESULT_RE_TITLE = r"\d+\.\d|minute|hour|second|\$603|\$83|\$1,664|\$8,320|\$3,169"
RESULT_RE_CAPTION = r"\d+\.\d|minute|\$603|\$83|\$1,664|\$8,320|\$3,169|≈"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right wage, so a
# swapped "$20/hr: … ≈ 7.3 hours" or a bare "$1 trillion" with no "up to" would pass it. These pin each figure to its context.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_WAGE = _re.compile(r"\$(7\.25|15|20|100|500|1,000)(?!\d|[,.]\d)")


def _wage_of(fig, wage):
    """every occurrence of fig has, as the nearest wage before it on its line, the right wage"""
    for ln in _lines():
        for m in _re.finditer(_re.escape(fig), ln):
            before = [w.group(1) for w in _WAGE.finditer(ln[:m.start()])]
            if not before or before[-1] != wage:
                return False
    return True


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?)\b", _re.I)
COPY_RULES = [
    (all(_wage_of(f, w) for f, w in [("$603,200", "7.25"), ("3.2", "7.25"), ("$1,664,000", "20"), ("8.8", "20"), ("$8,320,000", "100"),
                                     ("43.8", "100"), ("$83,200,000", "1,000"), ("7.3", "1,000")]),
     "each row's pay and time sit after their own wage ($7.25, $20, $100, $1,000)"),
    (all(_re.search(r"(?:≈|about) " + _re.escape(f), ln) for f in ("3.2", "8.8", "43.8", "7.3", "$3,169", "$11.4")
         for ln in _lines() if f in ln), "every rounded time and rate is 'about' or '≈'"),
    (all(_re.search(r"up to|maximum|max\b", v) for k, v in _COPY.items()
         if k not in ("title", "short alt text") and _re.search(r"\$1 trillion", v, _re.I)),
     "every copy item that names the $1 trillion says it is the plan's maximum"),
    (all(_re.search(r"up to|maximum|\bmax\b", ln) or not _re.search(r"\$1 trillion(?! (?:Tesla )?pay plan)", ln, _re.I)
         for ln in _lines() if _re.search(r"\$1 trillion", ln, _re.I)),
     "line by line: a $1 trillion that is not the header's '$1 trillion pay plan' is qualified on its own line ('up to', 'max', 'maximum')"),
    (all("stock" in v for k, v in _COPY.items() if k in ("description", "caption", "pinned comment")), "the long items say the plan is stock"),
    (all("Not affiliated with or endorsed by Tesla or Elon Musk." in _COPY[k] for k in ("description", "caption")), "both platforms carry the affiliation line"),
    (not any(_re.search(r"his \$1 trillion|his trillion", v, _re.I) for v in _COPY.values()), "never 'his trillion' (his net worth is another number)"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"million"},
     "no spelled-out figures beyond 'million' in '$11.4 million an hour'"),
]
