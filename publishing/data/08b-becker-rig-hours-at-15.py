# 08b publishing data: at $15/hr, you work for rent from the 1st until… (Becker Rig, unit-ladder).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 05b-becker-rig-3000-paycheck.py (the nearest
# Becker Rig precedent of the same batch: rent, take-home pay, a light page), laid out like 08a.
#
# Facts come only from teasers/v2/08-unit-ladder.md (section 08b) and python3 teasers/v2/checks/08-unit-ladder.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense cut: the 08 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (the landed blank), so the ship step only re-runs the build with --covers on the final file.

TEASER = "08b Becker Rig, unit-ladder: \"At $15/hr, you work for rent from the 1st until…\""
PREPARED = "2026-10-13"
SHORT_ID = "08b"
MD_TITLE = "08b publishing sheet: at $15/hr, rent in hours of work"
MATH_RUN = "677 checks, 0 failed"      # python3 teasers/v2/checks/08-unit-ladder.py on studio/specs/ (via publishing/data/checks/08-unit-ladder.py), 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "95b2084480bb66e10f035c2d0411047d8bb165c500c941e93b20ea8781148910"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 08 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the landed blank), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/08-unit-ladder.md` (08b) and its check, "
    f"`python3 teasers/v2/checks/08-unit-ladder.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/08-unit-ladder.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the take-home from the 2026 tax parameters, re-divides every rung by $13.10, pairs each price with its own count and rung, "
    "re-derives '≈ the 20th' and the 19th-21st calendar range (and keeps the 19th and 21st inside it), keeps every rounded figure 'about' or '≈', and keeps the rent named as the median and the 14 years as 'every cent you keep'.",
    "- **Honesty rules kept.** The title asks and never gives the result, and so does the YouTube thumbnail (frame 1: the blank and '? hours of work'). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the landed blank with the 117-hour pile, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, \"≈ 14 years of full-time work. Every cent you keep.\", "
    "and the copy says its conditions: the Census median rent (not yours), 2026 federal tax + FICA for a single filer with no state tax, and sticker prices with no loan interest. "
    "The copy never calls $15 the minimum wage, not even as a hashtag. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** Kelley Blue Book (Cox Automotive) is named only as the source of the average new-car price; both platforms' copy says 'Not affiliated with or endorsed by Kelley Blue Book or Cox Automotive.' "
    "The Census Bureau, the IRS and the SSA are public sources. The video draws no logo and names no car or brand.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (fix pass, round-2 QA, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 08 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay); no 08 WIP spec was in studio/specs-wip/ at this build. "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/08-unit-ladder.md section 08b; teasers/v2/checks/08-unit-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "take_home": "$15 × 2,080 = $31,200 a year; taxable $31,200 − $16,100 = $15,100; federal tax 10% × $12,400 + 12% × $2,700 = $1,564.00; FICA 7.65% = $2,386.80; kept $27,249.20 ÷ 2,080 = $13.10058 ≈ $13.10 (87.3% of $15); 2026, single, standard deduction, no state income tax, no benefit premiums or retirement deferrals",
    "unit": "the defined unit $13.10 (the kept hourly, rounded to the cent), the operand on screen in every '÷ $13.10'",
    "rungs": "Census median asking rent, Q2 2026: $1,531 ≈ 117 hours a month; × 12 = $18,372 ≈ 1,402 hours; KBB average new-vehicle transaction price, Aug 2026: $50,089 ≈ 3,824 hours; Census median new house, Aug 2026: $393,700 ≈ 30,053 hours",
    "blank": "116.870 ÷ (2,080 ÷ 12 = 173.33) = 67.4% of a full-time month: 20.23 days of a 30-day month (20.51 of the average month) from rent day, the 1st, so '≈ the 20th'; on a Monday-Friday calendar of 8-hour days the 19th, 20th or 21st, depending on the weekday of the 1st",
    "years": "30,053 hours ÷ 2,080 a year = 14.45 ≈ 14 years of full-time work, if every cent you keep goes to the house, with no interest",
    "pinned_wages": "at $20/hr you keep ≈ $17.12 (85.6%); at $25/hr ≈ $21.14 (84.5%); at $15/hr 87.3%; before state tax",
    "verdict": "≈ 14 years of full-time work. Every cent you keep. (the header's blank: '≈ the 20th')",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Many Hours of Work Is Rent at $15 an Hour? Until What Day of the Month?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score of the 10 scored. The first question (46 characters) is the video's first count, rent in hours; the second is the header's blank, the day of the month, which the video fills in. "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "How Many Hours of Work Is Rent at $15 an Hour? A Car? A House?", "vidiq_score": 97,
     "note": "One point lower, 12 characters shorter. It names the whole ladder instead of the blank; the fallback if the pick reads long in the player."},
    {"rank": 3, "title": "How Many Hours Do You Work Just to Pay Rent at $15 an Hour?", "vidiq_score": 95,
     "note": "The same question in the viewer's own words ('just to pay rent'), without the day."},
]
YT_TITLES_ALSO_SCORED = [
    ("How Many Hours of Work Is Rent at $15 an Hour?", 94, "the first question alone"),
    ("How Many Hours of Work Is Rent at $15 an Hour? #Rent #HourlyWage #PersonalFinance", 94, "the house 3-hashtag form, with the description's hashtags (re-scored at the adversarial check)"),
    ("How Many Hours of Work Is Rent at $15 an Hour? #rent #minimumwage #personalfinance", 94, "the first build's hashtag form; #minimumwage is dropped (see the hashtags)"),
    ("At $15 an Hour, How Many Days a Month Do You Work Just for Rent?", 91, ""),
    ("Rent, a Car, a House: How Many Hours of Work at $15 an Hour?", 89, "close to the round-1 judge's title"),
    ("At $15 an Hour, You Work for Rent From the 1st Until When?", 85, "the header as a question"),
    ("At $15/hr, You Work for Rent From the 1st Until…", 82, "the write-up's title"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 82 to 98. The write-up's '…' cliffhanger scores lowest of the 10; two plain questions in the viewer's terms (hours of work, the day of the month) score highest. "
    "The video answers both: ≈ 117 hours, and from the 1st to ≈ the 20th.",
    "It names no result: not ≈ 117, not ≈ the 20th, not ≈ 14 years. '$15 an hour' is the input, on screen at frame 1 in the header.",
    "'Rent' here is the Census median asking rent, as the video's HUD and the description say ('Median rent, 1 month'); the title asks about rent in general, as the header does, and never says 'your rent'. "
    "vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """How many hours of work is rent at $15 an hour? After 2026 federal tax and FICA, $15 an hour keeps about $13.10. Median rent, $1,531 a month, takes about 117 of a full-time month's 173 work hours, so from the 1st you work for rent until about the 20th.

The math, shown (hours = price ÷ $13.10):
• Kept per hour: $15 × 2,080 hours = $31,200 a year, minus $1,564.00 federal income tax and $2,386.80 FICA = $27,249.20; ÷ 2,080 ≈ $13.10.
• Median rent, 1 month: $1,531 ÷ $13.10 ≈ 117 hours, 67.4% of a full-time month (2,080 ÷ 12 ≈ 173.33 hours). From the 1st, that runs to about the 20th.
• Median rent, 1 year: $18,372 ÷ $13.10 ≈ 1,402 hours.
• An average new car: $50,089 ÷ $13.10 ≈ 3,824 hours.
• A median new house: $393,700 ÷ $13.10 ≈ 30,053 hours, ÷ 2,080 a year ≈ 14 years of full-time work, every cent you keep.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Rent: U.S. Census Bureau median asking rent, Q2 2026. Car: Kelley Blue Book average new-vehicle transaction price, Aug 2026 (Cox Automotive). House: U.S. Census Bureau median sales price of new houses sold, Aug 2026. Take-home: 2026 federal income tax for a single filer ($16,100 standard deduction, 10% and 12% brackets) and 7.65% FICA (IRS; SSA); 40 hours a week, 52 weeks; no state income tax, benefit premiums or retirement deferrals. The median rent, not yours. Sticker prices, no loan interest. Not financial advice. Not affiliated with or endorsed by Kelley Blue Book or Cox Automotive.
#Rent #HourlyWage #PersonalFinance"""
DESC_NOTE = ("The opening line is the title's two questions with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 05c: the verdict is a plain count of hours, not a number that shouldn't be true.")

YT_HASHTAGS = ["#Rent", "#HourlyWage", "#PersonalFinance"]
YT_HASHTAG_NOTES = [
    ("#Rent", "the bill the video prices ('rent' 67,558 searches a month; 'why is rent so high' +81.4% on its baseline)."),
    ("#HourlyWage", "the ruler, and the write-up's own caption tag ('hourly wage' 5,307 searches a month at competition 23.5, overall 64.0; 'minimum wage' has 11,780 at 61.0, overall 52.1). "
                     "It replaces the first build's #MinimumWage: shown as a link above a title that says '$15 an Hour', that would label $15 the minimum wage, which the copy rules out, and on this slate #MinimumWage already tags 02b's $7.25 federal-minimum row."),
    ("#PersonalFinance", "the broad category, and the channel's own most-used title tag (4 of its October Shorts carry it)."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["rent", "why is rent so high", "why rent is so expensive", "rent due", "living on 15 an hour", "budgeting 15 an hour",
           "15 an hour", "hourly wage", "real hourly wage", "minimum wage", "cost of living", "how many hours of work does it cost",
           "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'why is rent so high' (7,855 a month) is rising (+81.4%), and 'budgeting 15 an hour' (4,556) has the lowest competition in the set (7.6). "
             "'how many hours of work does it cost' carries the unit idea ('how many hours of your life does it cost…', 4,219), and 'rent due' (31,369) the day the count starts from, the 1st. "
             "'minimum wage' stays a tag only: tags are not shown, and the visible copy never calls $15 the minimum wage. "
             "Left out on purpose: 'how much rent can i afford' (3,386) asks for advice the video does not give (the copy rules out 'afford', as 06b's sheet leaves out advice-intent tags), "
             "'15 an hour online jobs' and the side-hustle phrasings (job-search intent), and 'take home pay' (lane 1's subject; here it lives only in the footer).")

YT_PINNED = """Your wage? Divide the price by what you KEEP per hour, not by your wage. At $15/hr you keep 87.3% (≈ $13.10). At $20/hr it's ≈ $17.12 (85.6%), at $25/hr ≈ $21.14 (84.5%), before state tax. Your rent ÷ that = your hours.

Median rent at $15/hr: ≈ 117 of 173 work hours (67.4% of the month), so you work for rent from the 1st to ≈ the 20th. That's 20.2 days of a 30-day month; on a Monday-Friday calendar it's the 19th, 20th or 21st, depending on the weekday of the 1st."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own number (R3): the write-up's pinned rule for any wage and rent. "
               "The second paragraph is the write-up's working, plus the calendar range its check asserts. It answers the two comments to expect: 'my rent isn't $1,531' "
               "(divide your own) and 'it depends on the month' (20.2 days of a 30-day month; the 19th to the 21st on a real calendar). 'Not every state…' is answered by 'before state tax'.")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months. #CreditCard #PersonalFinance #maths",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "A bill measured in time (238 months), the same move as this Short's rent in hours, and the channel's best post on Instagram (7,303 plays, 27.4% skip rate)."},
    "swap_when_live": "08a (a Costco hot dog risen like a house) or 08c (a year of college in Big Macs), the same unit-ladder series, once published. Then point that Short's Related video at this one.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame: the header with its blank, the HUD '$1,531 ÷ $13.10 = / ? hours of work' and the gold $1,531 coin. The Instagram cover is the landed blank instead."
THUMB_MD = ("in the YouTube app, pick frame 1: the header 'At $15/hr, you work for rent / from the 1st to the ___', the footer '≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax', "
            "the HUD 'Median rent, 1 month / $1,531 ÷ $13.10 = / ? hours of work' and the figure beside the gold $1,531 coin. It asks without answering, like the title beside it in search. "
            "The Instagram cover below is the landed blank, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 08a and 08c. Suggested order within the series: 08b, then 08c, then 08a.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "08b goes first of the three: its hook scored highest with the write-up's judges (7.0 of 10), 'why is rent so high' runs +81.4% over its baseline, and the $15 wage is in the news "
           "(a same-idea Short's description says Florida's minimum reached $15 on Sept 30, 2026; not verified here, and not in the copy).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("At $15 an hour, how many hours of work is rent? Count every hour you work from the 1st of the month: "
           "which day does rent stop taking them?")

IG_CAPTION = IG_HOOK + """

At $15/hr, rent takes every hour you work from the 1st to ≈ the 20th.

The math, shown (hours = price ÷ $13.10, what $15 an hour keeps after 2026 federal tax and FICA):
• Median rent, 1 month, $1,531: ≈ 117 hours, 67.4% of a full-time month's 173.33. From the 1st, ≈ the 20th.
• Median rent, 1 year, $18,372: ≈ 1,402 hours.
• An average new car, $50,089: ≈ 3,824 hours.
• A median new house, $393,700: ≈ 30,053 hours, ≈ 14 years of full-time work, every cent you keep.

Single filer, $16,100 standard deduction, 7.65% FICA, no state income tax; 40 hours a week, 52 weeks. The Census median rent, not yours. Sticker prices, no loan interest. Rent: Census, Q2 2026. Car: Kelley Blue Book, Aug 2026. House: Census, Aug 2026. Not financial advice. Not affiliated with or endorsed by Kelley Blue Book or Cox Automotive.

Your wage? Divide the price by what you keep per hour, not by your wage.

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#rent #hourlywage #costofliving #personalfinance #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the title's question, the '$15 an hour' and 'rent' keywords and the header's blank as a question, no result: "
                   "the caption overlays the Reel from frame 1, so the day, the hours and the years sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the two questions the header asks (hours of work, and the day of the month), with no figure but the $15 input. The write-up's caption line 1 "
    "('At $15/hr, rent takes every hour you work from the 1st to ≈ the 20th.') is the answer, so the house rule moves it below 'more', because the caption overlays the Reel from frame 1. "
    "The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The conditions follow the math, as on screen in the footer: single, no state tax, 2026 federal tax + FICA; the median rent, not yours; sticker prices with no loan interest.",
    "The caption follows the house close: the write-up's own question for the viewer's wage, then the follow line plus the credit.",
]

IG_HASHTAGS = ["#rent", "#hourlywage", "#costofliving", "#personalfinance", "#moneymath"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#hourlywage #rent #moneymath`); its `#housing` gives way to `#costofliving`:",
    "",
    "- `#rent` names the bill and `#hourlywage` the ruler.",
    "- `#costofliving` is what the ladder measures, rent, a car and a house in hours of work ('cost of living' 129,747 searches a month). It replaces the first build's `#minimumwage`, "
    "which would label $15 the minimum wage; the caption never does.",
    "",
    "`#personalfinance` is the broad layer, as on 06b, 06c and 08a.",
]

IG_ALT_SHORT = "Chart: at $15 an hour, median rent is about 117 hours of work: the 1st to about the 20th."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps 'median' on the rent.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page with a green stick figure. The header says: at $15/hr, you work for rent from the 1st to the blank. "
               "The footer: about $13.10 kept after 2026 federal tax and FICA, single, no state tax. The figure punches a gold $1,531 coin (median rent, 1 month) "
               "into a pyramid of clock icons: $1,531 divided by $13.10 is about 117 hours of work. The header's blank ticks through the days while a month grid fills, "
               "and lands on about the 20th. Then a year of median rent, $18,372, is about 1,402 hours; an average new car, $50,089, about 3,824 hours; "
               "a median new house, $393,700, about 30,053 hours on a gold plate. Payoff: about 14 years of full-time work, every cent you keep.")

IG_FIRST_COMMENT = ("Median rent at $15/hr: ≈ 117 of 173 work hours a month (67.4%), so you work for rent from the 1st to ≈ the 20th. "
                    "A median new house: ≈ 30,053 hours, ≈ 14 years of full-time work, every cent you keep. What's your wage?")

# ---------------------------------------------------------------- the cover frame
# The landed blank, picked by content: the write-up's Instagram note names "the 117-hour pile with the header's
# '≈ 20th' above it and the month grid filled to the 20th". On this render the blank lands at frame 192 (6.40 s); the
# frame settles by about frame 200 and holds still with the caption '≈ the 20th.' until that caption clears at about
# frame 236, before rung 2 cuts at frame 252 (8.40 s). Frame 219 is a still point inside that hold.
COVER_T = 7.3
COVER_FRAME = 219
COVER_CROP = "crop=1080:1440:0:45"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The landed blank, as the write-up's Instagram note asks: the header 'At $15/hr, you work for rent / from the 1st to the ≈ 20th' with its green rule, "
                          "the footer '≈ $13.10 kept: 2026 federal tax + FICA, single, no state tax', the HUD 'Median rent, 1 month / $1,531 ÷ $13.10 ≈ / 117 hours of work', "
                          "the month grid filled to the 20th (20 green days of 30), the 117-hour pyramid of clocks with the figure pointing up at the header, and the caption '≈ the 20th.' "
                          "On any cut, use a settled frame after the blank lands and before the next rung's cut, with the caption still up.")
COVER_FRAME_MEASURED = ("On the pre-condense 29.5 s render the blank lands at frame 192 (6.40 s); the frame settles by about frame 200 (6.67 s) and holds still "
                        "(frame-to-frame mean luma change under 0.0002) with the caption '≈ the 20th.' until it clears at about frame 236 (7.87 s); rung 2 cuts at frame 252 (8.40 s). Frame 219 (7.30 s) is used.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 45 to 1485 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1418 (the caption), "
                   "so the crop centres it (67 px above and below): badge, header, footer, HUD, month grid, the pile with the figure, and the caption; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the landed-blank frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the blank '___', '? hours of work' and the $1,531 coin). It asks without answering, so it is the YouTube thumbnail, "
    "where it sits beside a title that asks; on Instagram the write-up picks the landed blank, the date that travels.",
    "**Not used:** the end screen ('≈ 14 years' on the gold plate). It is the payoff; the write-up's cover note picks the blank instead.",
    "**When the condensed cut ships:** re-pick the landed blank by content on the shipped file and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 08b-29.5s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Rent in hours at $15/hr — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 08a and 08c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("rent", 67558, 72.1, 42.8, 66.1, "seed; -27.3% vs its 30-day baseline (92,940)", "2026-10-12"),
    ("why rent is so expensive", 13473, 61.6, 41.6, 60.3, "", "2026-10-12"),
    ("minimum wage", 11780, 60.8, 61.0, 52.1, "-33.9% vs its baseline (17,822)", "2026-10-12"),
    ("why is rent so high", 7855, 58.1, 40.8, 58.6, "+81.4% vs its baseline (4,331)", "2026-10-12"),
    ("budgeting 15 an hour", 4556, 54.6, 7.6, 69.7, "the lowest competition here", "2026-06-02"),
    ("how many hours of your life does it cost purchase hourly wage", 4219, 54.1, 20.9, 64.1, "the same idea: a price in hours of work", "2026-10-05"),
    ("living on 15 an hour", 3580, 53.1, 39.5, 56.0, "", "2026-03-30"),
    ("real hourly wage", 3540, 53.0, 26.3, 61.3, "", "2026-10-12"),
    ("how much rent can i afford", 3386, 52.7, 34.9, 57.7, "advice intent (what you can afford); not in the tags", "2026-02-25"),
    ("cost of living", 129747, 76.3, 81.5, 53.2, "-2.4%; the highest competition here", "2026-10-12"),
    ("rent due", 31369, 67.1, 42.1, 63.4, "-8.3%; rent day, where the count starts (adversarial check)", "2026-10-12"),
    ("hourly wage", 5307, 55.6, 23.5, 64.0, "the ruler; the write-up's own tag (adversarial check)", "2026-08-20"),
    ("$15 an hour", 0, 0, 35.5, 25.8, "<750/month as typed", None),
    ("how many hours to pay rent", 0, 0, None, None, "<750/month", None),
]
KEYWORD_MD_NOTE = {"how many hours of your life does it cost purchase hourly wage": "a price in hours of work, the same idea",
                   "how much rent can i afford": "advice intent; not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; five rows are older snapshots (2026-02-25 to 2026-10-05). "
                   "'rent due' (matching_terms) and 'hourly wage' were pulled at the adversarial check, 2026-10-13.")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Five rows are older snapshots.")
KW_OUTRO = ("Rent is searched as a complaint ('why rent is so expensive' 13,473; 'why is rent so high' 7,855, +81.4%), and the wage as a budget ('budgeting 15 an hour' 4,556 at competition 7.6; "
            "'living on 15 an hour' 3,580). The exact idea, a price in hours of work, has its own long-tail search (4,219). The video's own phrasings ('$15 an hour', 'how many hours to pay rent') "
            "are under 750 a month, so the title uses the searched words ('hours of work', 'rent', '$15 an hour') in a question.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Businesses CUTTING WAGES? ($15/hour to work at Taco Bell)", "Reventure Consulting", 688000, 2439837, "2023-06-16", "adjacent: $15 an hour as the subject"),
    ("Would you work for $15 an hour? 🤔💵#shorts #finance #interview", "Chris Stocks", 671000, 11499, "2023-01-23"),
    ("How Much Rent Can You REALLY Afford?", "NerdWallet", 304000, 6700, "2025-07-10", "the 30% rule, not hours of work"),
    ("Budget $17/hr Full Time. Rent $1,200/mo #howtobudget", "Jaimie Hines", 803, 1915, "2025-08-25", "an hourly wage against rent, as a budget"),
    ("Why $15/hr is the new minimum #finance #inflation #work", "Mike The Vet 2.0", 3370, 174, "2026-09-08"),
    ("$1,000 Rent Costs 138 Work Hours at Minimum Wage", "ThePriceSignal", 1, 9, "2026-10-12",
     "the same division, on gross pay and a hypothetical $1,000 rent: 'nearly 67' hours at $15 before tax, per its description"),
    ("Florida's $15 Minimum Wage Is Here — Here's What It Actually Buys You", "Floriflation", 3, 9, "2026-10-12",
     "3:56 long; its description says Florida's $15 took effect Sept 30, 2026 (not verified here)"),
    ("How Long to Earn $1 Million on Minimum Wage? 😩 #shorts", "Cash Cubed", 12, 5, "2026-10-11", "a big number in hours of work"),
]
SAME_IDEA_HEADING = "**2. Rent in hours of work is a fresh idea on YouTube; the $15 wage is not (vidIQ YouTube search, under 4 min, by relevance and by views).**"
SAME_IDEA_MD = [
    "Two searches built for this idea ('how many hours you work just to pay rent', 'hours of work to afford rent car house') returned no Shorts at all. "
    "The nearest twin is a day old: ThePriceSignal's '$1,000 Rent Costs 138 Work Hours at Minimum Wage' (9 views), which divides a hypothetical rent by gross pay. "
    "Nobody puts the hours on the calendar, which is this Short's blank, or divides by what you keep after tax.",
    "",
    "The $15 wage itself is a crowded, proven subject (Reventure's '$15/hour to work at Taco Bell', 2,439,837 views), and two new Shorts on 11-12 Oct tie it to the minimum wage. "
    "That is why the title asks in hours and days and leaves the minimum-wage framing out of the visible copy and the hashtags (it stays a tag).",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by relevance and by views): no Short puts rent on the calendar in hours of work. The nearest is a day-old Short dividing a hypothetical "
                  "$1,000 rent by gross pay (9 views). $15 an hour is a proven subject (2.4M views for Reventure's), and Florida's $15 minimum (Sept 30, 2026, per a same-idea description; "
                  "not verified here) makes it topical.")

OUTLIERS = [
    {"handle": "@moneymovesjake", "platform": "TikTok", "id": "7662503699599691039",
     "on_screen": "If you make $25/hour, you take home about $17.50 after taxes.",
     "views": "166.4K (397.1x the account median of 419)",
     "note": "text on screen, music only, looped: prices reframed as hours of take-home work, the closest concept to this Short"},
    {"handle": "@saadmughal228", "platform": "Instagram", "id": "Dbwa9rbhbnc",
     "on_screen": "$35 AN HOUR IS THE NEW 'JUST GETTING BY.'", "views": "901K (72.1x the account median of 12.5K)",
     "note": "an hourly wage against the bills"},
    {"handle": "@tyskywalka2.0", "platform": "TikTok", "id": "7672492623310982413",
     "on_screen": "If you make 20/hr you can't afford to live on your own", "views": "796K (49.9x the account median of 15.9K)",
     "note": "the wage-vs-rent claim as an opinion; this Short does the division instead"},
    {"handle": "@mastermoneyco", "platform": "Instagram", "id": "DcyPOmNxMYP",
     "on_screen": "4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make", "views": "1.8M (28.4x the account median of 62.8K)",
     "note": "true hourly take-home pay, the footer's ≈ $13.10 idea"},
    {"handle": "@stacknreps", "platform": "Instagram", "id": "Db4Z_UFNV22",
     "on_screen": "If I made $15/hour these would be my 3 choices as a financially responsible Guy", "views": "93.3K (24.7x the account median of 3.8K)",
     "note": "$15 an hour as the filter in the hook"},
]
OUTLIERS_HEADING = "**3. Wage-against-bills posts travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@moneymovesjake** (TikTok), \"If you make $25/hour, you take home about $17.50 after taxes.\": 166.4K (397.1x). Text on screen and music only, reframing prices as hours of take-home work: the closest concept to this Short.",
    "- **@saadmughal228** (Instagram), \"$35 AN HOUR IS THE NEW 'JUST GETTING BY.'\": 901K (72.1x). **@tyskywalka2.0** (TikTok), \"If you make 20/hr you can't afford to live on your own\": 796K (49.9x). The wage-vs-rent claim as an opinion; this Short does the division instead.",
    "- **@mastermoneyco** (Instagram), \"4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make\": 1.8M (28.4x). True hourly take-home pay, the idea in this Short's footer.",
    "- **@stacknreps** (Instagram), \"If I made $15/hour these would be my 3 choices…\": 93.3K (24.7x). $15 an hour as the filter in the hook, as in the write-up's H57.",
    "- The wage in the hook filters the viewer in on both platforms; none of the outliers lays the hours on a calendar.",
]

OWN_YT = [  # id, title, posted (ET), views (vidIQ, 2026-10-13)
    ("LjHDFzVxRyM", "Can You Find the Missing Dollar?", "Sun 07:04", 1256),
    ("hJBvmGA6sZ0", "You Can Lean on $1 Million. Not on $1 Billion.", "Thu 00:25", 1221),
    ("XVUeMcTg9OQ", "Your Interest Has a Speed Limit", "Sun 05:49", 1141),
    ("fbpdKf4Wy8c", "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? (06c)", "Mon 03:45", 760),
    ("8__HTUa2PoU", "Pay the Minimum on $5,000? 238 Months.", "Mon 22:09", 642),
    ("FW_oxA3kbsM", "A $2 Lottery Ticket Was Worth $6.98. Until the Fine Print.", "Wed 12:03", 348),
    ("mXbKY_R63h4", "You Can Carry $1 Million. Not in Pennies.", "Thu 13:38", 177),
    ("EqFQCJheCMU", "Start Investing 10 Years Late? You Get Half.", "Tue 22:27", 161),
    ("krfZEHhb0xU", "What If You Bought Netflix Stock Instead of Paying for Netflix? (06b)", "Mon 12:14", 75),
]
OWN_IG = [  # shortcode, topic, posted (ET), plays, skip rate %, avg watched % (owner insights, 2026-10-13)
    ("DeIvYk7I4Qr", "$5,000 on the minimum", "Mon 22:46", 7303, 27.4, 56.5),
    ("DeOEthJJ1TG", "$1M stack vs Burj Khalifa", "Thu 00:28", 5449, 27.0, 83.1),
    ("DeWgFZRoR_S", "Missing dollar", "Sun 07:05", 1997, 32.0, 81.3),
    ("DeMvZv9IqRw", "Powerball $6.98", "Wed 12:05", 1825, 58.7, 57.9),
    ("DeYuqT4pjVC", "06c latte vs Starbucks stock", "Mon 03:46", 1711, 40.3, 69.1),
    ("DePe11HIHwn", "$1M in pennies", "Thu 13:37", 598, 42.0, 66.7),
    ("DeLSd9io8UK", "10 years late", "Tue 22:30", 219, 65.1, 30.6),
    ("DeEW2ZMIiYd", "Speed limit (e)", "Sun 05:54", 177, 56.9, 31.2),
]
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; refreshed 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,519 views in 30 days.",
    "",
    "The channel's best Reel is also a bill measured in time ('$5,000 on the minimum': 7,303 plays, 27.4% skip rate), this Short's related video. "
    "06c (760 views, 1,711 plays) and 06b (Mon 12 Oct 12:14 ET: 75 views so far) are too young to compare, and 06b's Reel shows 7 plays while Instagram's owner insights catch up.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic; 06b and 06c left out as too young):",
    "",
    "- **YouTube:** Sunday early morning ET 1,199, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "One weekday evening is the best Instagram slot and the second-best YouTube slot, so the plan posts both then. "
    "On Instagram, skip rate predicts plays better than the hour does (27.0-27.4% for the top two, 56.9-65.1% for the bottom two). "
    "So the window is a light-touch test, and the condense (fewer still moments) is the bigger reach lever.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20519}
LIMITS = [
    "@envelopemath's YouTube Analytics (audience hours, geography) were not read here; the 06b and 06c sheets found vidIQ's YouTube authorization is a different channel. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the write-up's and the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The write-up's rent ($1,531) is a single-publisher Census figure, cross-checked only against the same series' previous quarter and by its verifier; census.gov was blocked to direct fetches. The Aug 2026 house price is preliminary.",
    "Florida's $15 minimum wage (Sept 30, 2026) comes only from a same-idea Short's description; it is not verified here and is not in the copy.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 9 at the first build and the hashtag form with #HourlyWage at the adversarial check; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "110 credits for this teaser by listed cost (7 keyword queries, 4 YouTube searches (two came back empty), 1 Instagram/TikTok outlier search, 9 title scores and 1 re-score; 5 each), plus 10 shared across 08a-08c for the channel's stats and Shorts list (Instagram owner insights cost 0). "
                     "Adversarial check: 30 for this teaser (the pick's title score, the #HourlyWage hashtag form, 'why is rent so high', 'hourly wage', 'rent to income ratio' (under 750) and the 'rent' matching terms), "
                     "plus 5 shared across 08a-08c for the related videos' titles; 60 for the three 08 sheets (balance 3,790 → 3,695, a 95 drop shared with sheets built in parallel).",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/08-unit-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/08-unit-ladder.py; "
                "the take-home recomputed from the 2026 tax parameters in MATH_RELATIONS ($1,564.00, $2,386.80, $27,249.20, $13.10, 87.3%), every rung re-divided by $13.10 (117, 1,402, 3,824, 30,053), "
                "the 67.4% month, '≈ the 20th' on 30 days and the average month, the 19th-21st on a Monday-Friday calendar, 14 years, and the pinned $20/$25 wages; "
                "COPY_RULES keep every rounded figure 'about' or '≈', keep $1,531 named as the median, pair each price with its own count and each rung with its car, house or year, "
                "keep the 19th and the 21st inside the calendar range and 20.2 days with its 30-day month, keep 14 years with 'every cent you keep', and never call $15 the minimum wage, "
                "not even as a hashtag. Re-run at the adversarial check (2026-10-13) with the same result")
VIDIQ_REQUERIED = ("pulled 2026-10-13: rent 67,558 / 42.8 (-27.3%); why is rent so high 7,855 (+81.4%); minimum wage 11,780 (-33.9%); "
                   "title scores 98 (pick), 82 (write-up title); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried after the build: the pick's title score 98. Match. "
                   "Re-queried at the adversarial check: the pick's title score 98; why is rent so high 7,855 / 40.8 (+81.4%); 8__HTUa2PoU's title as in the related-video pick (642 views). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/08-unit-ladder.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 08b maths table: $15 × 2,080 = $31,200; "
    "tax 10% × $12,400 + 12% × ($15,100 − $12,400) = $1,564.00; FICA 7.65% = $2,386.80; kept $27,249.20 ÷ 2,080 = $13.10058 ≈ $13.10 (87.3%); "
    "$1,531 ÷ $13.10 = 116.87 ≈ 117 (67.4% of 173.33; 20.23 days of 30 → ≈ the 20th); $18,372 → ≈ 1,402; $50,089 → ≈ 3,824; $393,700 → ≈ 30,053 ÷ 2,080 = 14.45 ≈ 14 years. The data file recomputes every one, and the calendar range.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel (9 at the first build, the #HourlyWage hashtag form at the adversarial check): the pick 98, the write-up's title 82. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 98, as first scored. At the adversarial check: the pick's title score 98; 'why is rent so high' 7,855 / 40.8 (+81.4%); "
    "the related video `8__HTUa2PoU`'s title as in the pick. All match.",
    "- **Changed at the adversarial check.**",
    "  - `#MinimumWage` was the second of the three hashtags shown as links above the title, right over '$15 an Hour', and `#minimumwage` was in the caption. "
    "That labels $15 the minimum wage, the claim the copy rules out ($15 is not the federal minimum, which this slate's 02b tags with the same hashtag at $7.25). "
    "YouTube now shows `#Rent #HourlyWage #PersonalFinance` ('hourly wage' 5,307 a month at competition 23.5, overall 64.0, against 'minimum wage' 52.1; `#hourlywage` is the write-up's own tag), "
    "and Instagram uses `#costofliving` ('cost of living' 129,747) in its place. The `COPY_RULES` minimum-wage rule now covers hashtags. 'minimum wage' stays an unshown tag.",
    "  - The tag 'how much rent can i afford' asked for advice the video does not give (the copy rules out 'afford'; 06b's sheet leaves advice-intent tags out). It is now 'rent due' (31,369), the day the count starts from. Tags 299/500.",
    "  - The numbers check let a wrong day through: 'From the 1st, ≈ the 21st' passed, because 21 is in FIGURES for the 19th-21st range. `COPY_RULES` now keep the 19th and the 21st inside "
    "'the 19th, 20th or 21st', and 20.2 with 'days of a 30-day month'. They also pair each price with its own count ($1,531 → 117, $18,372 → 1,402, $50,089 → 3,824, $393,700 → 30,053) and each of the last three with its rung (year, car, house).",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/08-unit-ladder.py` (see the 08a sheet).",
    "- **Mutation test.** Six breaks on scratch copies of this file all fail by name: a bare 'the 20th', '≈ 117' not named as the median rent, '14 years' without 'every cent you keep', a bare '$13.10', 'minimum wage' in the copy, and ≈ 1,402 changed to 1,400. (19 of 19 across 08a-08c.) At the adversarial check, five more on scratch copies also fail by name: 'From the 1st, ≈ the 21st', $18,372 → ≈ 3,824, the car and house rows swapped, `#minimumwage` back in the caption, and 20.2 moved off its 30-day month.",
    "- **Kept on purpose.**",
    "  - The YouTube thumbnail is frame 1 (the blank) and the Instagram cover is the landed blank, as the write-up's Instagram note asks. The no-result rule covers the title and the caption's first 125 characters.",
    "  - '$13.10' appears either as the defined unit ('÷ $13.10', the operand on screen) or as what you keep ('≈ $13.10'), never as a bare wage.",
    "  - The rent is always 'median', and the copy says 'the median rent, not yours', as the write-up's honesty change for the VO did ('Median rent', not 'Your rent').",
    "  - 'minimum wage' as an unshown tag only: neither the copy nor the hashtags call $15 the minimum wage.",
    "- **Checked and kept.** Every figure in the copy against the 08b maths table and the check's output (the take-home, the 67.4% month, the 19th-21st range and the $20/$25 wages recomputed); the limits; "
    "Kelley Blue Book and Cox Automotive named only as the car price's source, with the affiliation line in both long texts; frame 1 (thumbnail) and frame 219 (cover) read from the render, and the covers re-exported byte for byte.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 08b maths table (teasers/v2/08-unit-ladder.md, section 08b) and
# recomputed below from its inputs; dates and the tax parameters are inputs, quoted from the write-up's sources.
FIGURES = {
    "$15", "15", "$13.10", "$1,531", "117", "173", "173.33", "67.4", "1", "20", "$18,372", "1,402", "$50,089", "3,824", "$393,700", "30,053",
    "14", "2,080", "12", "$31,200", "$1,564.00", "$2,386.80", "$27,249.20", "$16,100", "10", "7.65", "40", "52", "2026", "2",
    "87.3", "$20", "$17.12", "85.6", "$25", "$21.14", "84.5", "20.2", "30", "19", "21",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
import datetime as _dt
_q = lambda x, e="0.01": _D(x).quantize(_D(e), _UP)


def _kept(wage):
    gross = _D(wage) * 2080
    taxable = max(gross - 16100, _D(0))
    tax = _D("0.10") * min(taxable, _D(12400)) + _D("0.12") * max(min(taxable, _D(50400)) - 12400, _D(0))
    fica = _D("0.0765") * gross
    return gross, tax, fica, gross - tax - fica


_g, _tax, _fica, _k = _kept(15)
_U = _q(_k / 2080)                       # the defined unit, $13.10
_hrs = lambda price: _D(price) / _U
_rent = _hrs(1531)
_share = _rent / (_D(2080) / 12)


def _rent_day(first_weekday):
    """the calendar day rent's last hour falls on, 8-hour Mon-Fri days from the 1st (0 = Monday)"""
    left, day, wd = _rent, 0, first_weekday
    while left > 0:
        day += 1
        if wd < 5:
            left -= 8
        wd = (wd + 1) % 7
    return day


MATH_RELATIONS = [
    (_g == 31200 and _tax == _D("1564.00") and _fica == _D("2386.80") and _k == _D("27249.20"), "$15 × 2,080 = $31,200; tax $1,564.00; FICA $2,386.80; kept $27,249.20"),
    (_U == _D("13.10") and _q(100 * _k / _g, "0.1") == _D("87.3"), "kept per hour ≈ $13.10 (87.3% of $15)"),
    ([int(_q(_hrs(p), "1")) for p in (1531, 18372, 50089, 393700)] == [117, 1402, 3824, 30053], "÷ $13.10: ≈ 117 / ≈ 1,402 / ≈ 3,824 / ≈ 30,053 hours"),
    (1531 * 12 == 18372 and _q(_D(2080) / 12) == _D("173.33") and int(_q(_D(2080) / 12, "1")) == 173, "a year of rent $18,372; a full-time month 173.33 hours"),
    (_q(100 * _share, "0.1") == _D("67.4") and _q(30 * _share, "0.1") == _D("20.2") and abs(30 * _share - 20) < _D("0.6") and abs(_D(365) / 12 * _share - 20) < _D("0.6"),
     "67.4% of the month: 20.2 days of 30 and 20.5 of the average month, both within 0.6 of a day of the 20th"),
    (sorted({_rent_day(w) for w in range(7)}) == [19, 20, 21], "on a Monday-Friday calendar, rent's last hour falls on the 19th, 20th or 21st"),
    (int(_q(_D(30053) / 2080, "1")) == 14 and int(_q(_hrs(393700) / 2080, "1")) == 14, "30,053 hours ÷ 2,080 a year ≈ 14 years"),
    ([(_q(_kept(w)[3] / 2080), _q(100 * _kept(w)[3] / _kept(w)[0], "0.1")) for w in (20, 25)] == [(_D("17.12"), _D("85.6")), (_D("21.14"), _D("84.5"))],
     "pinned: at $20/hr ≈ $17.12 (85.6%), at $25/hr ≈ $21.14 (84.5%)"),
]
MATH_SCRIPT = "publishing/data/checks/08-unit-ladder.py"
MATH_KEY_LINES = ["13.10058  ≈ $13.10", "116.870  ≈ 117", "1,402.443  ≈ 1,402", "3,823.588  ≈ 3,824", "30,053.435  ≈ 30,053", "20.23 (20.51)  ≈ the 20th",
                  "08b keep at $20/hr               ≈ $17.12  85.6%"]
RESULT_RE_TITLE = r"117|20th|\b20\b|67|1,402|3,824|30,053|\b14\b|≈"
RESULT_RE_CAPTION = r"117|20th|\b20\b|67|1,40|3,82|30,0|\b14\b|13\.1|≈|about"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _before(pat, ok):
    """every occurrence of pat is preceded (within 10 characters) by a match of ok"""
    return all(_re.search(ok + r"$", v[max(0, m.start() - 10):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
_PRICE = {"$1,531": "117", "$18,372": "1,402", "$50,089": "3,824", "$393,700": "30,053"}
_PAIRS = [(m.group(1), m.group(2)) for v in _COPY.values() for m in _re.finditer(
    r"(\$1,531|\$18,372|\$50,089|\$393,700)\b(?:(?: ÷| divided by) \$13\.10)?[^$\n]{0,30}?\b(117|1,402|3,824|30,053)\b", v)]
_RUNG_WORD = {"$18,372": "year", "$50,089": "car", "$393,700": "house"}


def _rung_named(price, word, reach=40):
    """the last rung word before every occurrence of price (within reach, same line) is its own"""
    return all((lambda w: bool(w) and w[-1] == word)(_re.findall(r"\b(year|car|house)\b", v[max(0, m.start() - reach):m.start()].split("\n")[-1]))
               for v in _COPY.values() for m in _re.finditer(_re.escape(price), v))


COPY_RULES = [
    (_before(r"\b20th\b", r"(?:(?:≈|about) the |≈ |19th, )"), "'20th' is always '≈ the 20th' or 'about the 20th' (or inside the calendar range '19th, 20th or 21st')"),
    (all(_before(p, r"(?:≈|about) ") for p in (r"\b117\b", r"1,402", r"3,824", r"30,053", r"\b14 years")),
     "every rounded count (117, 1,402, 3,824, 30,053) and the 14 years come with '≈' or 'about'"),
    (_before(r"\$13\.10", r"(?:≈|about|÷|by) "), "$13.10 is either the defined unit ('÷ $13.10') or what you keep ('≈ $13.10'), never bare"),
    (all("every cent you keep" in ln.lower() and "full-time" in ln for ln in _lines() if "14 years" in ln), "≈ 14 years always comes with 'full-time work' and 'every cent you keep'"),
    (all("edian rent" in v[max(0, m.start() - 100):m.end() + 30] for v in _COPY.values() for m in _re.finditer(r"\$1,531|\b117\b", v)),
     "$1,531 and its ≈ 117 hours are always named as the median rent (within 100 characters before, or 30 after)"),
    (all("no state" in _COPY[k] and "not yours" in _COPY[k] for k in ("description", "caption")), "the conditions (no state tax; the median rent, not yours) are in the description and the caption"),
    (all("Not affiliated with or endorsed by Kelley Blue Book or Cox Automotive." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "'Not financial advice.' and the Kelley Blue Book affiliation line are in the description and the caption"),
    (not _re.search(r"(?i)minimum ?wage", _ALL), "the copy never calls $15 the minimum wage, not even as a hashtag (#MinimumWage)"),
    (all("the 19th, 20th or 21st" in v[max(0, m.start() - 25):m.end() + 25] for v in _COPY.values() for m in _re.finditer(r"\b(?:19th|21st)\b", v)),
     "the 19th and the 21st appear only inside the calendar range 'the 19th, 20th or 21st' (the day is '≈ the 20th')"),
    (all(v[m.end():m.end() + 23] == " days of a 30-day month" for v in _COPY.values() for m in _re.finditer(r"\b20\.2\b", v)), "20.2 is always 'days of a 30-day month'"),
    (len(_PAIRS) >= 10 and all(_PRICE[p] == c for p, c in _PAIRS),
     "each price is followed only by its own count ($1,531 → 117, $18,372 → 1,402, $50,089 → 3,824, $393,700 → 30,053)"),
    (all(_rung_named(p, w) for p, w in _RUNG_WORD.items()), "$18,372, $50,089 and $393,700 each sit after their own rung word (year, car, house)"),
    (not _re.search(r"(?i)\byour rent (?:is|takes|costs)\b", _ALL), "never 'your rent is/takes/costs': the rent is the Census median"),
    (not _NUMBER_WORDS.search(_ALL), "no spelled-out figures"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bafford\b|\bworth it\b", _ALL), "no advice wording (nothing on what anyone can afford)"),
]
