# 02c publishing data: what time your 9-to-5 starts paying you, by salary (Scoreboard, find-your-row).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet, same look).
#
# Facts come only from teasers/v2/02-find-your-row.md (section 02c) and python3 teasers/v2/checks/02-find-your-row.py.
# Research: vidIQ, pulled 2026-10-13. The render in renders/channel is the pre-condense cut; a condensed cut (timing
# only) is in progress. This sheet names no timestamp except the cover, which is picked by content (the finished
# board with the $200,000 row lit), so the copy carries over; the ship step rebuilds it with --covers.

TEASER = "02c Scoreboard, find-your-row: \"What time your 9-to-5 starts paying you, by salary\""
PREPARED = "2026-10-13"
SHORT_ID = "02c"
MD_TITLE = "02c publishing sheet: what time your 9-to-5 starts paying you"
MATH_RUN = "PASSED: all 183 checks"      # python3 teasers/v2/checks/02-find-your-row.py on studio/specs/, at the adversarial check, 2026-10-13
MATH_RUN_FIRST = "PASSED: all 177 checks"    # the same script at the first build, before the condense pass made it cut-aware
MATH_RUN_WIP = "PASSED: all 216 checks"      # the same script with --spec on the three condensed cuts in studio/specs-wip/

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the round-2 Scoreboard port of 2026-10-08 as `renders/channel` holds it on 2026-10-13. A condensed cut is in progress (timing only: the numbers, captions and verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the finished board), so the copy carries over. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/02-find-your-row.md` (02c) and its check, "
    f"`python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13), and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cuts "
    "in `studio/specs-wip/`, which carry every string and number the copy quotes. The builder runs it through "
    "`publishing/data/checks/02-find-your-row.py`, which passes its output through and adds the summary line in the builder's form. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes 2026 federal tax + FICA for every salary it names, "
    "and keeps each clock time beside its salary.",
    "- **Honesty rules kept.** The title asks and never gives a result (no clock time), and so do the Instagram caption's first 125 characters. "
    "The description, the caption and the pinned comment say what the clock is: the tax share of the year read as the same share of each 8-hour day, an average (tax comes out of every paycheck, not the first hour). "
    "The description and the caption state the basis (single filer, 2026 federal income tax + FICA, no state tax), and all three say state tax, 401(k) and health premiums would push the time later. "
    "The short items (title, first comment, short alt text) carry the video's own words; the long alt text gives the footer's basis. "
    "No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** None is named in the video. The copy names 'Tax Freedom Day' (a Tax Foundation term) to explain the average, so both platforms' copy says "
    "'Not affiliated with or endorsed by the Tax Foundation.' The IRS, SSA and BLS are cited as sources only.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds on 2026-10-13: the pre-condense cut. The ship step rebuilds this file with --covers from the condensed cut.")
CUT = {"name": "pre-condense (round-2 Scoreboard port, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "status": "in renders/channel on 2026-10-13; a condensed cut (timing only) is in progress",
       "on_ship": f"python3 publishing/tools/build_publishing.py {BASE} --covers (re-picks the cover by content, re-exports both JPGs, refreshes for_video)"}

FACTS = {
    "source": f"teasers/v2/02-find-your-row.md section 02c; teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "2026, single filer, $16,100 standard deduction, wages only, no state or local tax; brackets 10% to $12,400, 12% to $50,400, 22% to $105,700, 24% to $201,775 (IRS Rev. Proc. 2025-32)",
    "fica": "6.2% Social Security on wages up to $184,500 + 1.45% Medicare on all wages (SSA); no row reaches the 0.9% Additional Medicare Tax",
    "clock": "minutes a day = 480 × (federal tax + FICA) ÷ salary; paying you from = 9:00 am + those minutes; an average (the Tax Freedom Day idea for one workday)",
    "rows": "$200,000 ≈ 123 min ≈ 11:03 am; $150,000 ≈ 116 ≈ 10:56; $100,000 ≈ 100 ≈ 10:40; $90,000 ≈ 95 ≈ 10:35; $80,000 ≈ 89 ≈ 10:29; $70,000 ≈ 82 ≈ 10:22; "
            "$65,000 ≈ 78 ≈ 10:18; $60,000 ≈ 77 ≈ 10:17; $50,000 ≈ 73 ≈ 10:13; $40,000 ≈ 68 ≈ 10:08; $35,000 ≈ 64 ≈ 10:04; $30,000 ≈ 59 ≈ 9:59 am",
    "worked_65000": "taxable $48,900; tax $1,240 + 12% × $36,500 = $5,620; FICA 7.65% = $4,972.50; together $10,592.50 = 16.30% of pay; × 480 = 78.22 min → ≈ 10:18 am",
    "worked_200000": "$36,734 tax + $14,339 FICA = $51,073 = 25.54% of pay; × 480 = 122.58 min → ≈ 123 min → ≈ 11:03 am",
    "worked_100000": "99.94 min → ≈ 100 min = 1 hr 40 min → ≈ 10:40 am",
    "share": "rises with every row, from 12.38% at $30,000 to 25.54% at $200,000",
    "median": "BLS median usual weekly earnings, full-time, Q2 2026: $1,251 × 52 = $65,052 ≈ $65,000",
    "verdict": "$200,000: you work for tax till ≈ 11:03, every workday",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Much of Your 9-to-5 Goes to Taxes? What Time It Starts Paying You, by Salary"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. 'How much of your 9-to-5 goes to taxes?' is the question in search words, and the second half is the video's own header ('starts paying you, by salary'), "
             "which keeps the clock a reading of the day, not a payroll claim."},
    {"rank": 2, "title": "How Much of Your 9-to-5 Goes to Taxes? What Time You Start Getting Paid, by Salary", "vidiq_score": 98,
     "note": "1 point higher, but 'start getting paid' reads as a literal payroll fact; the clock is an average, so the pick keeps the header's 'starts paying you'."},
    {"rank": 3, "title": "What Time Does Your 9-to-5 Start Paying You After Taxes? Find Your Salary", "vidiq_score": 95,
     "note": "The header as a question plus the format's task."},
]
YT_TITLES_ALSO_SCORED = [
    ("What Time Does Your 9-to-5 Start Paying You? #taxes #salary #personalfinance", 94, "the house 3-hashtag form"),
    ("What Time Your 9-to-5 Actually Starts Paying You After Taxes, by Salary", 89, ""),
    ("What Time Your 9-to-5 Starts Paying You, by Salary", 87, "the write-up's title"),
    ("You Work for Taxes Until What Time Every Day? Find Your Salary", 87, ""),
]
TITLE_BULLETS = [
    "The first question, 'How Much of Your 9-to-5 Goes to Taxes?', is the first 38 characters, so a title cut short still asks it whole, with 'taxes' (82,933 searches a month, +11.0%) in it.",
    "No result in it: no clock time, no minutes and no salary figure; the answer is the time on your row. It raises the write-up's title from 87 to 97.",
    "'Taxes' here means 2026 federal income tax + FICA for a single filer, which the description's first line and the video's footer say.",
]

YT_DESCRIPTION = """What time does your 9-to-5 start paying you? Find your salary. 2026 federal income tax + FICA take a share of your pay; the same share of an 8-hour day is how long you work for tax each morning. At $65,000, about the US median full-time pay, that's till about 10:18 am. At $100,000, about 10:40. At $200,000, about 11:03.

The math, shown:
• A 9-to-5 is 480 minutes. Minutes of tax a day = 480 × (federal income tax + FICA) ÷ salary. Your clock = 9:00 am + those minutes.
• At $65,000: $65,000 − $16,100 standard deduction = $48,900 taxable. Federal tax $5,620 + FICA (7.65%) $4,972.50 = $10,592.50, 16.30% of pay: ≈ 78 minutes, so ≈ 10:18 am.
• At $100,000: ≈ 100 minutes (1 hr 40 min) a day, so ≈ 10:40 am.
• At $200,000: $36,734 tax + $14,339 FICA = $51,073, 25.54% of pay: ≈ 123 minutes, so ≈ 11:03 am.
• The share rises with every row: at $30,000 it's 12.38% (≈ 9:59 am); at $200,000, 25.54%.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 2026 federal brackets and the $16,100 standard deduction for a single filer (IRS, Rev. Proc. 2025-32); FICA is 6.2% Social Security on wages up to $184,500 plus 1.45% Medicare (SSA). Median full-time pay: $1,251 a week in Q2 2026 (BLS), about $65,000 a year. Wages only; no state or local tax, 401(k) or health premiums, which would push your time later. It's an average, the idea behind Tax Freedom Day applied to a single workday: tax comes out of every paycheck, not the first hour of each morning. Not financial advice. Not affiliated with or endorsed by the Tax Foundation.
#taxes #salary #PersonalFinance"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the clock is an average on a stated basis, "
             "so 'a number that shouldn't be true' would oversell it.")

YT_HASHTAGS = ["#taxes", "#salary", "#PersonalFinance"]
YT_HASHTAG_NOTES = [
    ("#taxes", "the topic ('taxes' 82,933 searches a month, +11.0% on its 30-day baseline; the US is its top market)."),
    ("#salary", "the viewer's row ('100k salary' 12,623 a month; the after-tax salary phrases run 3,650-7,394 at competition 14.6-25.9)."),
    ("#PersonalFinance", "the broad category ('personal finance' 1,436,792 a month) and the most used hashtag in the channel's titles (5 of the 29 recent Shorts vidIQ lists)."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["taxes", "salary after taxes", "how much you actually keep from a $100k salary after taxes", "80k salary after taxes",
           "100k salary", "federal income tax", "fica", "tax freedom day", "take home pay", "personal finance", "money math",
           "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'how much you actually keep from a $100k salary after taxes' (5,111 a month, competition 25.9) "
             "is the closest search to the video's question; 'tax freedom day' is under 750 a month but is the idea the clock borrows. "
             "Left out on purpose: 'income tax' (64,908) is mostly India; 'working 9 to 5' (44,885) is mostly the song; '9 to 5 trap' (17,829) wants to quit the job.")

YT_PINNED = """What time does your day start paying you?

It's an average, the same idea as Tax Freedom Day: tax comes out of every paycheck, not the first hour of each morning. FICA (Social Security + Medicare) is a payroll tax, so it's in. State income tax, 401(k) and health premiums would push your time later."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it invites the line the write-up expects viewers to repeat about themselves ('I work for tax till 10:18'). "
               "The rest is the write-up's pinned comment, which answers the comments to expect: 'FICA isn't income tax', state tax, and 'tax isn't taken in the morning'.")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months.",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "The same viewer, an everyday paycheck question. Its Instagram twin is the channel's best October Reel (7,302 plays, 27.4% skip); the Short has 642 views. Live since Mon 5 Oct 2026, 22:09 ET."},
    "swap_when_live": "02a or 02b, the other find-your-row tables, once published; then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the finished-board frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the finished-board frame (all 12 rows, the $200,000 row lit and the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 02c condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one find-your-row teaser (02a, 02b, 02c) per evening.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "06c (Mon 03:45 ET) had 760 views by 13 Oct; 06b (Mon 12:14 ET, the day before) had 61. The evening slot is also the best one on Instagram, so one evening serves both. "
           "n = 7 and confounded by topic, so treat it as a test. 'taxes' searches run +11.0% over their baseline; the basis is 2026 tax, so post it in 2026.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "Find your salary: what time does your 9-to-5 start paying you, after 2026 federal income tax + FICA?"

IG_CAPTION = IG_HOOK + """

Federal income tax + FICA take a share of your pay. Read it as the same share of every 8-hour workday, and that's how long you work for tax each morning before your 9-to-5 starts paying you.

The math, shown:
• Minutes of tax a day = 480 × (tax + FICA) ÷ salary. Your clock = 9:00 am + those minutes.
• At $30,000: ≈ 59 minutes, so ≈ 9:59 am.
• At $65,000, about the US median full-time pay: ≈ 78 minutes, so ≈ 10:18 am.
• At $100,000: ≈ 1 hr 40 min, so ≈ 10:40 am.
• At $200,000: ≈ 123 minutes, so ≈ 11:03 am, every workday.

Single filer, $16,100 standard deduction, 2026 brackets; FICA = 6.2% Social Security (to $184,500) + 1.45% Medicare. No state tax, 401(k) or health premiums, which would push your time later. It's an average, the Tax Freedom Day idea applied to a single workday: tax comes out of every paycheck, not the first hour. Not financial advice. Not affiliated with or endorsed by the Tax Foundation.

What time does your day start paying you?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#taxes #paycheck #salary #personalfinance #financialliteracy"""
IG_CAPTION_RULE = ("The first 125 characters are the task ('Find your salary') and the question with its basis (2026 federal income tax + FICA), with no result: "
                   "the caption overlays the Reel from frame 1, so every clock time sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's caption line 1 ('Find your salary'), then the header as a question with its tax basis. No clock time, no minutes and no salary figure; "
    "the times sit below 'more', where Instagram search and Google indexing still read them.",
    "The second paragraph says what the clock means before any number, so no time is read as a payroll fact.",
    "The rows quoted are the board's own: the bottom row, the median, six figures and the verdict's top row. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#taxes", "#paycheck", "#salary", "#personalfinance", "#financialliteracy"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#taxes` names the topic ('taxes' 82,933 a month on YouTube, rising).",
    "- `#paycheck` is the word on the biggest after-tax outlier in section 3 ('your paycheck AFTER TAXES!', 14.2M), and `#salary` names the viewer's row.",
    "",
    "`#personalfinance` and `#financialliteracy` ('financial literacy' 256,914 a month, +11.9%) are the broad layer.",
]

IG_ALT_SHORT = "Table by salary: what time a 9-to-5 starts paying you after 2026 federal tax and FICA."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It carries no result, and the long version gives the rows.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. Header: What time your 9-to-5 starts paying you, by salary. Footer: single, 2026 federal tax + FICA, no state tax. "
               "12 rows, a salary on each from $200,000 down to $30,000: minutes of tax a day, and the time the day starts paying you; at $200,000, about 11:03 am; "
               "at $30,000, about 9:59 am. A pointer lights $65,000, about the US median full-time pay: about 78 minutes, about 10:18 am. "
               "Then $100,000: about 1 hr 40 min, about 10:40 am. Verdict: $200,000: you work for tax till about 11:03, every workday.")

IG_FIRST_COMMENT = ("At $65,000, about the US median full-time pay, you work for tax till ≈ 10:18 am. At $200,000, till ≈ 11:03. "
                    "What time does your day start paying you?")

# ---------------------------------------------------------------- the cover frame
# The finished board, picked by content on the pre-condense render (2026-10-13): the verdict slams in at 10.0 s with the
# $200,000 row lit; from 11.50 s to 12.17 s the other rows come back to full brightness; from 12.20 s (frame 366) the mean
# frame-to-frame luma change (270×480 greyscale) stays at or under 0.006 until the end card cuts in at 13.03 s.
COVER_T = 12.5
COVER_FRAME = 375
COVER_CROP = "crop=1080:1440:0:72"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The finished board with the $200,000 row lit, which the write-up names as the cover ('the finished board with the $200,000 row lit'): "
                          "the header 'WHAT TIME YOUR 9-TO-5 / STARTS PAYING YOU, BY SALARY', the footer, all 12 salary rows from $200,000 to $30,000 at full brightness with "
                          "their minutes and their clock, the pointer and glow on '$200,000 · ≈ 123 MIN · ≈ 11:03 AM', and the verdict '$200,000: YOU WORK FOR TAX / TILL ≈ 11:03, "
                          "EVERY WORKDAY.' in the strip. Use the settled frame after the other rows come back to full brightness, before the end card, so every viewer can read their row.")
COVER_FRAME_MEASURED = ("On the pre-condense 15.5 s render the verdict slams in at 10.0 s with the $200,000 row lit and the others dimmed; from 11.50 s to 12.17 s the other rows "
                        "come back to full brightness; from 12.20 s (frame 366) the mean frame-to-frame luma change (270×480 greyscale) stays at or under 0.006 until the end card "
                        "cuts in at 13.03 s. The cover is taken at 12.5 s (frame 375), inside that hold.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 72 to 1512 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1444 (the verdict's last line), "
                   "so the crop centres it: badge, header, footer, the whole board and the verdict; it drops the empty black floor. "
                   "A centred grid crop (y 240-1680) loses the badge and leaves the header on the top edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the finished-board frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header and the verdict.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the frame just after the verdict lands, with the other rows dimmed: it reads as one salary's answer, and the point of the board is that every viewer finds their own. "
    "Frame 1 (the header over the $200,000 row only) is not used either: the write-up chooses the finished board, after Gage Heward's one cover A/B (4,348 vs 2,844, n = 1).",
    "**Condensed cut:** the ship step re-picks this frame by content on the final file (the settled finished board, every row at full brightness) and re-exports both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A version test afterwards, if you want one. The write-up's Instagram cut is music-only with captions off (the same spec rendered with \"captions\": false: the header and the clock column carry it); "
                     "it is not in renders/channel, so it needs a studio render first. Post it as a Trial with MANUAL graduation 48-72 h later and compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'What time your 9-to-5 starts paying you — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The best of them ('$5,000 on the minimum', 7,302 plays) is the same everyday-paycheck viewer.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("taxes", 82933, 73.4, 52.5, 63.1, "+11.0% vs its 30-day baseline (74,718); the US is its top market", "2026-10-12"),
    ("income tax", 64908, 71.8, 54.7, 61.2, "+149.6% vs its baseline, but 55% India: not the US federal tax here", "2026-10-12"),
    ("irs", 62989, 71.6, 42.1, 66.1, "+7.4% vs its baseline", "2026-10-12"),
    ("working 9 to 5", 44885, 69.4, 54.0, 60.1, "-45.7% vs its baseline; mostly the song, not a tag", "2026-10-12"),
    ("9 to 5 trap", 17829, 63.5, 19.2, 70.4, "+34.7% vs its baseline (13,236): quitting-the-job intent, not a tag", "2026-10-12"),
    ("100k salary", 12623, 61.2, 56.5, 54.1, "the six-figure row", "2026-10-12"),
    ("reality of my 48 lpa microsoft salary after taxes", 7394, 57.8, 25.3, 64.5, "India; shows 'salary after taxes' demand", "2026-09-30"),
    ("how much you actually keep from a $100k salary after taxes", 5111, 55.4, 25.9, 62.9, "the closest search to the video's question", "2026-06-24"),
    ("80k salary after taxes", 4215, 54.1, 14.6, 66.6, "competition 14.6", "2026-05-15"),
    ("what a $100k salary actually looks like after taxes and bills", 3650, 53.2, 19.7, 64.0, "", "2026-09-15"),
    ("tax freedom day", 0, 0, 41.2, 23.5, "<750/month: the idea the clock borrows; a tag only", None),
    ("how much tax do i pay", 0, 0, 35.6, 25.8, "<750/month", None),
    ("paycheck taxes", 0, 0, 19.0, 32.4, "<750/month", None),
]
KEYWORD_MD_NOTE = {"income tax": "+149.6%, but 55% India: not this video's tax"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and matching_terms modes), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, "
                   "so each row carries its snapshot date in metrics_as_of; four rows are older snapshots (2026-05-15 to 2026-09-30).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("'taxes' is the big on-topic phrase (82,933 a month) and it is rising (+11.0%), so it leads the title's search words and the hashtags. "
            "The after-tax salary phrases are small (3,650-7,394) but low in competition (14.6-25.9), so they go in the tags. "
            "The 9-to-5 phrases are big but about the song or quitting, and 'tax freedom day' is under 750 a month, so neither carries the title.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How Do Taxes Work?", "Gohar Khan", 7960000, 24131064, "2024-03-24", "the broad explainer"),
    ("|| DAY 41/100 || 🇺🇸 America Mein 👉 $8,000 Salary… Account Mein Kitna Aata Hai? 😳🇺🇸", "Inspiring Bharat 🇮🇳", 14800, 2693076, "2026-02-27",
     "Hindi-language; a US salary's take-home, outlier score 109"),
    ("How Much Of Lebron James’s Salary Does He Get To Keep? #fyp #nba #lebronjames #money", "Makeshift Project", 2470000, 1490051, "2025-12-15", "take-home share of one famous salary"),
    ("Why $250,000 From Your Own Business Beats a $400,000 Salary", "Karlton Dennis", 1140000, 514614, "2026-08-29", "advice intent"),
    ("You Work For The Government! #shorts #taxes #employees", "Mark Cassara | Legacy Wealth Academy", 23600, 148, "2022-01-11", "the closest framing found, 16 s"),
]
SAME_IDEA_HEADING = "**2. 'How much of my pay is tax' travels; nobody tells it as clock time (vidIQ YouTube search, under 4 min).**"
SAME_IDEA_MD = [
    "Take-home-pay Shorts travel when they price one salary the viewer can picture: a US salary's take-home for a Hindi-language audience (2,693,076), LeBron James' (1,490,051), "
    "and the broad 'How Do Taxes Work?' (24,131,064). None found reads the tax share as a time of day, and none tabulates it by salary. The closest framing, "
    "'You Work For The Government!', has 148 views. So the title asks the familiar question ('how much goes to taxes') and promises the new unit (what time).",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): take-home and tax Shorts travel (514,614-24,131,064 views), but none reads tax as clock time "
                  "or tabulates it by salary; the closest framing has 148 views.")

OUTLIERS = [
    {"handle": "@builtbymali", "platform": "Instagram", "id": "DczIgZiS_Os",
     "on_screen": "your paycheck AFTER TAXES!", "views": "14.2M (9,981.0x the account median of 1.4K)",
     "note": "an ice cube lifted out of a glass: the after-tax shrink as a picture, no voice, looped"},
    {"handle": "@mastermoneyco", "platform": "TikTok", "id": "7680913784143105310",
     "on_screen": "4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make", "views": "3M (140.0x); 1.8M on Instagram (28.4x)",
     "note": "the write-up's H84: true hourly take-home after tax and commute, talked"},
    {"handle": "@moneymovesjake", "platform": "TikTok", "id": "7662503699599691039",
     "on_screen": "If you make $25/hour, you take home about $17.50 after taxes.", "views": "166.4K (397.1x the account median of 419)",
     "note": "after-tax pay re-priced in hours of work, static text, music only"},
    {"handle": "@recipesbyaisha", "platform": "Instagram", "id": "Dcs2d5QCt4I",
     "on_screen": "Salary before tax", "views": "344.9K (106.6x)", "note": "spinach cooking down as the after-tax salary, music only"},
]
OUTLIERS_HEADING = "**3. 'Your pay after taxes' is a proven Reel topic, mostly as a picture (vidIQ IG/TikTok outlier search, last 30 days).**"
OUTLIERS_MD = [
    "- **@builtbymali** (Instagram), \"your paycheck AFTER TAXES!\": 14.2M (9,981.0x). **@recipesbyaisha** (Instagram), \"Salary before tax\": 344.9K (106.6x). The shrink as a visual metaphor, no voice.",
    "- **@mastermoneyco** (TikTok and Instagram), \"4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make\": 3M (140.0x) and 1.8M (28.4x). The write-up's H84, the payout frame its header borrows.",
    "- **@moneymovesjake** (TikTok), \"If you make $25/hour, you take home about $17.50 after taxes.\": 166.4K (397.1x). After-tax pay re-priced in work time, static text, music only.",
    "- None states the bite as a time of day, and none puts every salary on one board; 02c does both. The two picture Reels and the static-text one run without a voice, which backs the write-up's music-only Instagram cut.",
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
    "The Powerball Short, where 'cash, the crowd and tax take their cut', is the channel's only other tax read (348 views; 1,825 plays, 58.7% skip). "
    "02c leads with the viewer's own salary instead of someone else's jackpot.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the pre-condense cut. The cover's time and frame are measured on it; the copy names no other timestamp, and the ship step re-picks the cover on the final file.",
    "irs.gov and bls.gov could not be opened in the write-up's research (the proxy blocks them); the brackets, the wage base and the median rest on the write-up's named sources.",
    "The figures are for a single filer in 2026; married filers, other years and state tax give other times, and the copy says so only for state tax, 401(k) and health premiums.",
]
RESEARCH_EXTRA = {
    "write_up_benchmarks": "Master Money, '4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make': 3,000,000 (140x) (H84); HD Guy's re-pricing in a unit you own (H01) (write-up; H84 re-pulled above).",
    "titles_scored": "7 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/02-find-your-row.py: {MATH_RUN} on studio/specs/ at the adversarial check (2026-10-13; {MATH_RUN_FIRST.split(': ')[1]} at the first build, "
                f"before the condense pass made the check cut-aware), and {MATH_RUN_WIP.split(': ')[1]} with --spec on the condensed cuts in studio/specs-wip/; run by the builder through "
                "publishing/data/checks/02-find-your-row.py; every public figure traced to the 02c maths table and recomputed in MATH_RELATIONS (2026 federal tax + FICA), "
                "each clock time pinned beside its salary (COPY_RULES)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: taxes 82,933 / 52.5 (+11.0%); how much you actually keep from a $100k salary after taxes 5,111 / 25.9; tax freedom day <750; 7 titles scored: pick 97, top 98, write-up's title 87; "
                   "channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. Re-scored at the end of the build: the pick 97. "
                   "Re-queried at the adversarial check: the pick's title score 97; taxes 82,933 / 52.5 (+11.0% on 74,718; US 25% of searches); channel 53 / 10,221 / 41; "
                   "the related Short 8__HTUa2PoU 642 views, published 02:09 UTC 6 Oct (Mon 5 Oct 22:09 ET). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/02-find-your-row.py`: {MATH_RUN} at this check ({MATH_RUN_FIRST.split(': ')[1]} at the first build; the condense pass has since made the check cut-aware), "
    f"and {MATH_RUN_WIP.split(': ')[1]} with `--spec` on the condensed cut, which keeps every string and number the copy quotes. Every public figure traces to the 02c maths table: $65,000 → $48,900 taxable, $5,620 + $4,972.50 = $10,592.50 "
    "(16.30%), ≈ 78 min, ≈ 10:18 am; $100,000 ≈ 100 min (1 hr 40 min), ≈ 10:40 am; $200,000 $36,734 + $14,339 = $51,073 (25.54%), ≈ 123 min, ≈ 11:03 am; $30,000 12.38%, ≈ 59 min, ≈ 9:59 am; "
    "$1,251 × 52 ≈ $65,000. The data file recomputes each from the 2026 brackets and FICA.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 7 titles scored against this channel: the pick 97, the top 98, the write-up's title 87. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** The pick's title score 97; 'taxes' 82,933 / 52.5 (+11.0%); the channel 53 / 10,221 / 41; the related Short (`8__HTUa2PoU`) 642 views, Mon 5 Oct 22:09 ET. All match. "
    "The channel's 29 recent Shorts carry #PersonalFinance in 5 titles, the most of any hashtag.",
    "- **Changed.**",
    "  - The intro said every copy item explains the average and states the basis. The title, the first comment and the short alt text do neither (they carry the video's own words), "
    "and the pinned comment explains the average but not 'single filer' or '2026'. The intro now names which items say what, and two copy rules hold it: "
    "the description and the caption name the single filer, 2026 and no state tax, and those two plus the pinned comment say 401(k) and health premiums would push the time later.",
    "  - Related video: its 'why' cited the Instagram Reel's plays as if they were the Short's; it now gives both (7,302 plays on Instagram, 642 views on YouTube).",
    "  - #PersonalFinance note: 5 of the 29 recent Shorts vidIQ lists, not '5 of its last 30'.",
    "  - The maths count: the sheet said 177 checks; the 02 check now prints 183 on `studio/specs/` (and 216 on the condensed cuts with `--spec`), so the intro, `facts` and this log say so.",
    "- **Mutation test.** At the first build, five mutations of a scratch copy each failed by name: a clock time under the wrong salary, a bare clock time, the caption without 'average', the caption without the Tax Foundation line, and a result in the title. "
    "At this check, two more fail by name: the caption without 'single filer', and the pinned comment without its 401(k) line. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 02 check prints 'PASSED: all N checks', and the builder reads only 'N checks, F failed', so `MATH_SCRIPT` is "
    "`publishing/data/checks/02-find-your-row.py`, a pass-through that runs the 02 check unchanged and adds that line (exit code passed through).",
    "- **Kept on purpose.**",
    "  - The pick is 1 point under the top score: 'start getting paid' would state the average as a payroll fact.",
    "  - 'Taxes' in the title: the video counts 2026 federal income tax + FICA for a single filer. State tax would make the time later; a married filer or one with credits pays less and gets an earlier time. "
    "The title asks the question the board answers on its stated basis, which the description's first line and the footer give (the limits list names the other filers).",
    "  - 'Tax Freedom Day' is named to explain the average, so both platforms carry the Tax Foundation line.",
    "  - The cover is the settled finished board with every row at full brightness, not the moment the verdict lands with the others dimmed. Re-exported to a scratch folder, both JPGs are byte-identical to the files here, "
    "and the condensed cut's spec carries the same header, footer, rows, captions, pick labels and verdict, so no copy changes on ship.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 02c maths table (teasers/v2/02-find-your-row.md, section 02c) and
# recomputed below from its inputs (2026 brackets, standard deduction, FICA, a 480-minute day). The figure scan splits a
# clock time at its colon ("10:18" → "10", "18"), so the COPY_RULES below check the times whole.
FIGURES = {
    "9", "5", "8", "480", "00", "2026", "2025", "32", "401", "2", "52", "1", "40", "12",
    "$16,100", "$184,500", "6.2", "1.45", "7.65", "$1,251",
    "$30,000", "$65,000", "$100,000", "$200,000", "$100",
    "$48,900", "$5,620", "$4,972.50", "$10,592.50", "16.30", "$36,734", "$14,339", "$51,073", "25.54", "12.38",
    "59", "78", "100", "123", "10", "18", "11", "03", "80",
}


def _fed(s):
    t = max(0, s - 16100)
    tax, lo = 0.0, 0
    for hi, rate in ((12400, .10), (50400, .12), (105700, .22), (201775, .24), (10 ** 9, .32)):
        tax += max(0, min(t, hi) - lo) * rate
        lo = hi
    return round(tax, 2)


_fica = lambda s: round(min(s, 184500) * 0.062 + s * 0.0145, 2)
_mins = lambda s: 480 * (_fed(s) + _fica(s)) / s
_clock = lambda s: (lambda m: f"{9 + m // 60}:{m % 60:02d}")(round(_mins(s)))
_rows = (200000, 150000, 100000, 90000, 80000, 70000, 65000, 60000, 50000, 40000, 35000, 30000)
MATH_RELATIONS = [
    ((_fed(65000), _fica(65000)) == (5620.0, 4972.5), "$65,000: tax $5,620, FICA $4,972.50"),
    (round((_fed(65000) + _fica(65000)) / 65000 * 100, 2) == 16.30 and round(_mins(65000)) == 78, "$65,000: 16.30% of pay, ≈ 78 minutes"),
    ((_fed(200000), _fica(200000)) == (36734.0, 14339.0), "$200,000: tax $36,734, FICA $14,339"),
    (round(_mins(200000)) == 123 and round((_fed(200000) + _fica(200000)) / 200000 * 100, 2) == 25.54, "$200,000: 25.54% of pay, ≈ 123 minutes"),
    (round(_mins(100000)) == 100, "$100,000: ≈ 100 minutes = 1 hr 40 min"),
    (round(_mins(30000)) == 59 and round((_fed(30000) + _fica(30000)) / 30000 * 100, 2) == 12.38, "$30,000: 12.38% of pay, ≈ 59 minutes"),
    ([_clock(s) for s in (30000, 65000, 100000, 200000)] == ["9:59", "10:18", "10:40", "11:03"], "clocks: ≈ 9:59, 10:18, 10:40, 11:03"),
    (all(_mins(a) > _mins(b) for a, b in zip(_rows, _rows[1:])), "the share rises with every row"),
    (abs(1251 * 52 - 65000) / 65000 < 0.01, "$1,251 a week × 52 ≈ $65,000"),
    (round(0.062 + 0.0145, 4) == 0.0765, "FICA 6.2% + 1.45% = 7.65%"),
]
MATH_SCRIPT = "publishing/data/checks/02-find-your-row.py"
MATH_KEY_LINES = ["fed $5,620.00 + FICA $4,972.50 = $10,592.50 (16.30%) × 480 min = 78.22 min → ≈ 78 min → ≈ 10:18 am",
                  "fed $36,734.00 + FICA $14,339.00 = $51,073.00 (25.54%) × 480 min = 122.58 min → ≈ 123 min → ≈ 11:03 am",
                  "fed $13,170.00 + FICA $7,650.00 = $20,820.00 (20.82%) × 480 min = 99.94 min → ≈ 100 min → ≈ 10:40 am",
                  "BLS $1,251/wk × 52 = $65,052 → ≈ $65,000 (row 6)"]
RESULT_RE_TITLE = r"\d{1,2}:\d\d|\d+ ?min|\d+%|\$\d"
RESULT_RE_CAPTION = r"\d{1,2}:\d\d|minute|\d+%|\$\d|≈"

# The copy's own rules (COPY_RULES): FIGURES only sees the pieces of a clock time, and says nothing about which salary a
# time belongs to, so a swapped "At $100,000: … ≈ 10:18" would pass it. These check the times whole, beside their salary.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_SAL = _re.compile(r"\$(30,000|35,000|40,000|50,000|60,000|65,000|70,000|80,000|90,000|100,000|150,000|200,000)(?!\d|[,.]\d)")


def _salary_of(fig, sal):
    """every occurrence of fig has, as the nearest salary before it on its line, the right salary"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            before = [s.group(1) for s in _SAL.finditer(ln[:m.start()])]
            if not before or before[-1] != sal:
                return False
    return True


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?)\b", _re.I)
_CLOCKS = {"9:59": "30,000", "10:18": "65,000", "10:40": "100,000", "11:03": "200,000"}
COPY_RULES = [
    (all(_salary_of(r"(?<![\d:])" + _re.escape(t) + r"(?!\d)", s) for t, s in _CLOCKS.items()), "each clock time sits after its own salary"),
    (all(_salary_of(f, s) for f, s in [(r"\b59 min", "30,000"), (r"\b78 min", "65,000"), (r"\b100 min", "100,000"), (r"1 hr 40 min", "100,000"),
                                        (r"\b123 min", "200,000"), (r"\$10,592\.50", "65,000"), (r"16\.30%", "65,000"), (r"\$51,073", "200,000"), (r"12\.38%", "30,000")]),
     "each row's minutes and tax sit after their own salary"),
    (all(_re.search(r"(?:≈|about|till|until) " + _re.escape(t), ln) for t in _CLOCKS for ln in _lines() if _re.search(r"(?<![\d:])" + _re.escape(t), ln)),
     "every clock time is 'about', '≈' or 'till' (each is rounded to the minute)"),
    (all(_re.search(r"(?:≈|about) (?:59|78|100|123) min|(?:≈|about) 1 hr 40", ln) for ln in _lines() if _re.search(r"\b(?:59|78|100|123) min|1 hr 40", ln)),
     "every minutes figure is 'about' or '≈'"),
    (_lines() and all(_re.search(r"about|≈", ln) for ln in _lines() if "median" in ln), "the median is always 'about'"),
    (all(_re.search(r"average", _COPY[k]) for k in ("description", "caption", "pinned comment")), "the long items say the clock is an average"),
    (all("state" in _COPY[k] and "2026" in _COPY[k] and _re.search(r"single filer", _COPY[k], _re.I) for k in ("description", "caption")),
     "the description and the caption state the basis (single filer, 2026, no state tax)"),
    (all(_re.search(r"401\(k\)", _COPY[k]) and _re.search(r"push your time later", _COPY[k]) for k in ("description", "caption", "pinned comment")),
     "the long items say state tax, 401(k) and health premiums would push the time later"),
    (all("Not affiliated with or endorsed by the Tax Foundation." in _COPY[k] for k in ("description", "caption")), "both platforms carry the Tax Foundation line"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= set(), "no spelled-out figures"),
]
