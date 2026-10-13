# 10b publishing data: your pay for 40 years vs 1 minute of new US debt (Becker Rig, cost-counter).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 08b-becker-rig-hours-at-15.py (the nearest
# Becker Rig precedent: a pre-condense render, pay as the yardstick), laid out like 10a.
#
# Facts come only from teasers/v2/10-cost-counter.md (section 10b) and python3 teasers/v2/checks/10-cost-counter.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense cut: the 10 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (the end hold), so the ship step only re-runs the build with --covers on the final file.

TEASER = "10b Becker Rig, cost-counter: \"Your pay for 40 years vs 1 minute of new US debt?\""
PREPARED = "2026-10-13"
SHORT_ID = "10b"
MD_TITLE = "10b publishing sheet: 40 years of your pay vs 1 minute of new US debt"
MATH_RUN = "1005 checks, 0 failed"     # python3 teasers/v2/checks/10-cost-counter.py on studio/specs/ (via publishing/data/checks/10-cost-counter.py), 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "8eebe2472d13691637c0feb22a97b583e49b8cff67df0506cc05565717e6c745"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 10 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the end hold), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/10-cost-counter.md` (10b) and its check, "
    f"`python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/10-cost-counter.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the 364-day growth and the rate from the two Debt to the Penny readings, "
    "holds every figure to the write-up's one rounding (≈ $2.46 trillion, ≈ $78,000 a second, ≈ $4.7 million a minute, ≈ 33 seconds, ≈ 72 years, ≈ $117,000), keeps each reading beside its date, "
    "keeps every '≈ 33 seconds' with the median pay it measures, and bans the write-up's overclaims ('live', 'fiscal 2026', 'FY2026', 'under 1 second').",
    "- **Honesty rules kept.** The title asks and never gives the result, and so does the YouTube thumbnail (frame 1: the $0 board, the full stack of 40 bricks and the stopwatch at 0:00). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the end hold, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, \"40 years of median pay: ≈ 33 seconds. 1 minute of new US debt ≈ $4.7 million.\", "
    "and the copy says its conditions: the 364 days between two confirmed Debt to the Penny readings (never 'fiscal 2026', which could not be confirmed), an average rate, gross federal debt, and median pay with no raises. "
    "The header's 'your pay' is answered for every viewer by the flip point (≈ $117,000 a year) and the swap-in rule. No advice, no urgency, and 'Not financial advice.' is in both. "
    "The copy names no party, person or policy, as the write-up's tone rule asks.",
    "- **Brand.** No company or brand is named in the copy except the source of the debt readings: PrimeRates, which published both Debt to the Penny readings, is named in the description's credit line as a publisher, as 06b names CNBC and Variety. "
    "The video's board is a generic 'debt clock' with no real branding; no share price is named.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (assembly pass 4, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 10 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay); no 10 WIP spec was in studio/specs-wip/ at this build. "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/10-cost-counter.md section 10b; teasers/v2/checks/10-cost-counter.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "total public debt outstanding (Treasury's Debt to the Penny, via PrimeRates): $37,637,553,494,935.61 on 2025-09-30 and $40,096,954,633,566.68 on 2026-09-29 (the final reading published before the fiscal year ended); Δ = $2,459,401,138,631.07 ≈ $2.46 trillion in 364 days",
    "rate": "Δ ÷ (364 × 86,400 s = 31,449,600 s) = $78,201.35 a second ≈ $78,000 (2 significant figures, the write-up's one rounding); × 60 = $4,692,080.93 ≈ $4.7 million a minute",
    "pay": "median full-time pay $1,251 a week (BLS Q2 2026) × 52 = $65,052 a year; × 40 = $2,602,080 ≈ $2.6 million, a working life with no raises",
    "duel": "1 minute ($4,692,081) ÷ 40 years of median pay ($2,602,080) = 1.80: 1 minute is bigger (md only); the counter passes $2,602,080 at 33.274 s ≈ 33 seconds and stops on it exactly",
    "flip_point": "1 minute ÷ 40 = $117,302 ≈ $117,000 a year: anyone earning more has a 40-year pay bigger than 1 minute",
    "minute_in_pay": "1 minute ÷ $65,052 = 72.13 ≈ 72 years of median pay",
    "public_part": "of the $2.46 trillion, $2.09 trillion is held by the public (PrimeRates): $2.09T ÷ 31,449,600 s = $66,455.54 ≈ $66,000 a second; × 60 = $3,987,332 ≈ $4.0 million a minute, still more than 40 years of median pay",
    "assumptions": "the 364-day growth spread evenly (the debt grows in steps, so this is the average rate); gross federal debt, including intragovernmental holdings; no 'fiscal 2026' claim, because the 2026-09-30 reading could not be confirmed",
    "verdict": "40 years of median pay: ≈ 33 seconds. / 1 minute of new US debt ≈ $4.7 million.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US Debt?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 96,
     "note": "PICK. The write-up's own title, tied top score of the 7 scored. HD Guy's rare question grammar ('Which is cheaper? A or B', the write-up's H07), the header's two sides in the header's words, "
             "and 'US Debt' ('us debt' 44,622 searches a month) inside its 65 characters. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US National Debt?", "vidiq_score": 96,
     "note": "The same score with 'National' added (74 characters): it carries the exact phrase 'national debt' (25,193 a month) as well. The fallback if search matters more than matching the header."},
    {"rank": 3, "title": "Which Is Bigger: 40 Years of Your Pay or 1 Minute of New Debt? #NationalDebt #DebtClock #MoneyMath", "vidiq_score": 96,
     "note": "The house 3-hashtag form (98 characters), the same score, with the description's three hashtags in its order, which the builder's check requires of a title that carries any. "
             "The pick plus those three runs 101 characters, over YouTube's 100, so this one drops 'US' and lets #NationalDebt carry it. Re-scored at the adversarial check; "
             "the first build's form (#NationalDebt #USDebt #Debt) would have failed that check if picked, and moves to 'also scored'."},
]
YT_TITLES_ALSO_SCORED = [
    ("Which Is Bigger: 40 Years of Your Pay or 1 Minute of New US Debt? #NationalDebt #USDebt #Debt", 96, "option 3 at the first build: '#USDebt #Debt' are not the description's hashtags, so the check would refuse it as the title"),
    ("Which Is Bigger: Your Whole Working Life or 1 Minute of US National Debt?", 96, "'working life' is the video's own phrase, but the title loses the header's '40 years'"),
    ("Your Pay for 40 Years vs 1 Minute of New US Debt: Which Is Bigger?", 88, "the on-screen header first, the question last: 8 points lower"),
    ("40 Years of Your Paychecks vs 1 Minute of US National Debt: Which Is Bigger?", 88, ""),
]
TITLE_BULLETS = [
    "The question comes first ('Which Is Bigger:'), then the two sides exactly as the header sets them: 40 years of your pay, 1 minute of new US debt. Both sides are inputs, so a title cut short still asks.",
    "It names no result: not which side wins, not ≈ $4.7 million, not ≈ 33 seconds. The answer is lopsided, and the title leaves the viewer holding the wrong answer the write-up exploits ('my 40 years, obviously').",
    "'New US debt' is the growth, not the total, which is what the counter counts; 'national debt' is in the description, the tags and the hashtags, and option 2 puts it in the title at the same score. "
    "vidIQ's model ranks titles but does not predict views; the question-first titles all scored 96, and the header-first ones 88.",
]

YT_DESCRIPTION = """Which is bigger: 40 years of your pay or 1 minute of new US debt? 1 minute of new US debt is about $4.7 million. 40 years of median pay ($2,602,080) goes by in about 33 seconds.

The math, shown:
• Treasury's Debt to the Penny: $37.638 trillion on Sept. 30, 2025; $40.097 trillion on Sept. 29, 2026.
• That's ≈ $2.46 trillion more in 364 days.
• ÷ (364 × 86,400 seconds) ≈ $78,000 a second, ≈ $4.7 million a minute, ≈ 72 years of median pay.
• 40 years of median pay: $1,251 a week × 52 × 40 = $2,602,080. At ≈ $78,000 a second: ≈ 33 seconds.
• Earn more than ≈ $117,000 a year? Your 40 years beat 1 minute.
• Yours: yearly pay × 40 ÷ 78,000 = your working life in seconds.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Debt: U.S. Treasury, Debt to the Penny (total public debt outstanding), the readings of Sept. 30, 2025 and Sept. 29, 2026 (the final reading before the fiscal year ended), via PrimeRates. The growth is spread evenly over those 364 days; the debt grows in steps, so this is the average rate. It is gross federal debt, including debt the government owes itself. Pay: BLS median usual weekly earnings of full-time wage and salary workers, Q2 2026, × 52; a working life is 40 years of it, with no raises. Not financial advice.
#NationalDebt #DebtClock #MoneyMath"""
DESC_NOTE = ("The opening line is the title's question with the write-up's verdict, for the search snippet. "
             "The credit line says why the window is 364 days and not a fiscal year (the last confirmed reading is Sept. 29), as the write-up's Review log asks; nothing says 'fiscal 2026'. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08a: the counter is an average rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#NationalDebt", "#DebtClock", "#MoneyMath"]
YT_HASHTAG_NOTES = [
    ("#NationalDebt", "the topic ('national debt' 25,193 searches a month, +2.0% on its 30-day baseline) and the write-up's own first tag, shared with 10a."),
    ("#DebtClock", "the genre the video's board belongs to ('national debt clock' 4,838 a month; 'the debt clock is ticking' 5,151) and the write-up's tag. The board is a generic counter, with no real branding."),
    ("#MoneyMath", "the write-up's tag and the format's shared third tag: 10a, 10b and 10c all carry it, so the counter series links up."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["new us debt", "national debt", "us national debt", "us debt", "us debt 40 trillion", "40 trillion debt animated", "national debt clock",
           "debt clock", "the debt clock is ticking", "how fast is the national debt growing", "debt per second", "lifetime earnings", "working life",
           "median pay", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. '40 trillion debt animated' (5,396 a month) has the lowest competition in the set (17.3) and asks for exactly this kind of video; "
             "'us debt 40 trillion' (6,189) is the August milestone's phrase (the debt passed $40 trillion in August 2026, the write-up's Euronews source). "
             "Left out on purpose: 'national debt clock live' (8,779), because the write-up bans 'live' for this average-rate counter; 'us debt clock' (5,153), which is also a website's name; "
             "any 'fiscal 2026' phrase (the 364-day window is not the fiscal year); and every phrase that names a politician or a party (the write-up's tone rule).")

YT_PINNED = """Earn more than ≈ $117,000 a year? Your 40 years beat 1 minute. Yours: yearly pay × 40 ÷ 78,000 = your working life in seconds.

"The debt includes what the government owes itself": of the ≈ $2.46 trillion, $2.09 trillion is held by the public. That part alone is ≈ $66,000 a second, ≈ $4.0 million a minute, still more than 40 years of median pay ($2,602,080). Why 364 days? Those are the official readings either side of the fiscal year we could confirm."""
PINNED_NOTE = ("The first paragraph is the write-up's pinned comment: the flip point first, so it shows in the collapsed preview, then the swap-in rule, which answers the header's 'your pay' for every viewer (R3). "
               "The second paragraph answers the comments the write-up expects: 'the debt includes money the government owes itself' (with its PrimeRates figure, $2.09 trillion held by the public) "
               "and 'why 364 days?' (the write-up's own answer).")

RELATED_VIDEO = {
    "pick": {"id": "hJBvmGA6sZ0", "title": "You Can Lean on $1 Million. Not on $1 Billion. #moneyfacts #billion #Animation",
             "url": "https://www.youtube.com/shorts/hJBvmGA6sZ0",
             "why": "Big money made physical, the same move as this Short's 40 bricks of pay, and one of the channel's best Shorts (1,221 views on YouTube; its Reel 5,449 plays at a 27.0% skip rate)."},
    "swap_when_live": "10a (US debt interest vs your salary), the counter on the same debt's interest, once published; then point 10a's Related video at this Short, so the pair links both ways.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame: the header, the board on $0, the figure hugging the full stack of 40 bricks and the '1 MINUTE' stopwatch at 0:00. The Instagram cover is the end hold instead."
THUMB_MD = ("in the YouTube app, pick frame 1: the header 'Your pay for 40 years vs / 1 minute of new US debt?' ('40 years' in green, '1 minute' in red), the 2-line footer, "
            "the board 'New US debt since you hit play' on '$0' over '≈ $78,000 every second', the figure hugging the full stack of 40 cash bricks on the plinth '40 × $65,052 / 40 years left', "
            "and the '1 MINUTE' stopwatch at 0:00. It asks without answering, like the title beside it in search. The Instagram cover below is the end hold, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, at least a week after 10a, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel. 10a and 10b are both about the federal debt: post them at least a week apart, or as a labelled pair (this one as 'Part 2: the debt itself'), as the write-up asks. Suggested order within the series: 10c, then 10a, then 10b.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "10b goes last of the three: it shares 10a's topic, and the $40 trillion news has cooled ('us debt 40 trillion' -68.1% on its 30-day baseline), while 'debt crisis' runs +235.9%. "
           "Its numbers are dated readings, so they do not go stale.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("Which is bigger: 40 years of your pay, or 1 minute of new US debt? The new-debt counter starts at $0 the moment you hit play.")

IG_CAPTION = IG_HOOK + """

40 years of median pay ≈ 33 seconds of new US debt. 1 minute of it ≈ $4.7 million, or ≈ 72 years of median pay.

The math, shown:
• Treasury's Debt to the Penny: $37.638 trillion on Sept. 30, 2025; $40.097 trillion on Sept. 29, 2026.
• That's ≈ $2.46 trillion more in 364 days.
• ÷ (364 × 86,400 seconds) ≈ $78,000 a second.
• 40 years of median pay: $1,251 a week × 52 × 40 = $2,602,080. At ≈ $78,000 a second: ≈ 33 seconds.

Earn more than ≈ $117,000 a year? Your 40 years beat 1 minute. Yours: yearly pay × 40 ÷ 78,000 = your working life in seconds.

An average over those 364 days (the debt grows in steps). Gross federal debt, including debt the government owes itself. Median full-time pay (BLS), with no raises. Not financial advice.

What should we race against the counter next?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#nationaldebt #debtclock #usdebt #economy #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the title's question, the 'new US debt' keywords and the counter's $0 start, no result: "
                   "the caption overlays the Reel from frame 1, so the verdict, the rate and every figure from the readings sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's two sides as a question plus the counter's $0 start, with no figure but the inputs (40 years, 1 minute). The write-up's caption line 1 is the verdict "
    "('40 years of median pay ≈ 33 seconds of new US debt. 1 minute of it ≈ $4.7 million, or ≈ 72 years of median pay.'); the house rule moves it to the second paragraph, below 'more', because the caption overlays the Reel from frame 1. "
    "The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The write-up's caption sentences are kept: the two Debt to the Penny readings with their dates, the 364-day growth, the division and the 40-year working life. Its pinned comment (the flip point and the swap-in rule) follows the math, "
    "so the header's 'your pay' is answered in the caption too.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#nationaldebt", "#debtclock", "#usdebt", "#economy", "#moneymath"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#nationaldebt #debtclock #moneymath`), plus two:",
    "",
    "- `#nationaldebt` and `#usdebt` name the topic the way it is searched ('national debt' 25,193 a month, 'us debt' 44,622), as on 10a.",
    "- `#debtclock` names the genre of the video's board, and `#moneymath` says what kind of video it is.",
    "",
    "`#economy` is the broad layer ('economy' 378,531 a month, +9.8%), as on 10a.",
]

IG_ALT_SHORT = "Chart: new US debt eats 40 years of median pay in about 33 seconds; 1 minute is about $4.7 million."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps both halves of the verdict, each with its basis (median pay; new debt).")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white page. The header asks: your pay for 40 years vs 1 minute of new US debt? A green stick figure hugs a stack of 40 cash bricks, each a year of median pay ($65,052), "
               "beside a 1-minute stopwatch. A debt board counts up from $0 at about $78,000 a second (about $2.46 trillion of new debt in 364 days) and swallows the bricks in turn: "
               "3, 10, 20 and 30 years of median pay go by as the board turns red and starts to steam. It stops on $2,602,080 as the last brick goes; the board cracks and the blast knocks the figure to the floor. "
               "The stopwatch stops at 0:33. Payoff: 40 years of median pay: about 33 seconds; 1 minute of new US debt is about $4.7 million.")

IG_FIRST_COMMENT = "Earn more than ≈ $117,000 a year? Your 40 years beat 1 minute. Yours: yearly pay × 40 ÷ 78,000 = your working life in seconds."

# ---------------------------------------------------------------- the cover frame
# The end hold, picked by content: the write-up's Instagram note names "the end hold: the counter on $2,602,080, the
# green '≈ 33 SECONDS' stamp and the verdict" (and not the burst, a white impact frame). On this render the burst lands
# with the stop, the impact settles by about frame 1022, the figure sits up and looks at the board, and from then on the
# frame changes only by the board's steam until the end card. Frame 1065 is inside that hold, after he has sat up.
COVER_T = 35.5
COVER_FRAME = 1065
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The end hold, as the write-up's Instagram note asks: the header 'Your pay for 40 years vs / 1 minute of new US debt?', the 2-line footer, the cracked red board on '$2,602,080' "
                          "with '✓ 40 years of median pay: $2,602,080' under it, the green '≈ 33 SECONDS' stamp over the emptied plinth ('40 × $65,052 / 0 years left'), the stopwatch stopped at 0:33 with its end label '≈ $4.7 million', "
                          "the figure sitting on the floor looking up at the board, and the verdict '40 years of median pay: ≈ 33 seconds. / 1 minute of new US debt ≈ $4.7 million.' "
                          "On any cut, use a frame of the end hold after the figure has sat up and before the end card (not the white impact frame of the burst).")
COVER_FRAME_MEASURED = ("On the pre-condense 39.1 s render the counter stops on the 40-year pass with the burst at about frame 999 (33.3 s); the impact settles by about frame 1022 (34.07 s), the figure sits up between about 34.6 and 35.0 s, "
                        "and from then on the frame changes only by the board's steam and vibration (frame-to-frame mean luma change about 0.03) until the end card at about frame 1099 (36.63 s). "
                        "Frame 1065 (35.50 s) is used; the write-up's suggestion (≈ 34.5 s) falls just before he sits up.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame. The content runs from y 113 (the badge) to y 1447 (the verdict's second line), "
                   "so the crop centres it (53 px above and below): badge, header, footer, board, stamp, plinth, stopwatch, the figure and the verdict; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the end-hold frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the $0 board, the full stack and the stopwatch at 0:00). It asks without answering, so it is the YouTube thumbnail, "
    "where it sits beside a title that asks; on Instagram the write-up picks the end hold, the save-able answer.",
    "**Not used:** the burst itself, a white impact frame, as the write-up's Instagram note warns.",
    "**When the condensed cut ships:** re-pick the end hold by content on the shipped file (after the figure sits up, before the end card) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 10b-39.1s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Your 40 years vs 1 minute of US debt — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, at least a week after 10a (or as its labelled Part 2).",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("national debt", 25193, 65.7, 62.0, 54.6, "seed; +2.0% vs its 30-day baseline (24,706)", "2026-10-12"),
    ("us debt", 44622, 69.4, 66.0, 55.2, "-33.1% vs its baseline (66,734); still the biggest debt phrase", "2026-10-12"),
    ("us national debt", 10191, 59.8, 62.0, 51.1, "-66.1% vs its baseline (30,039)", "2026-10-12"),
    ("us debt 40 trillion", 6189, 56.6, 50.0, 54.0, "-68.1% vs its baseline (19,376): the August milestone fading", "2026-10-12"),
    ("40 trillion debt animated", 5396, 55.7, 17.3, 66.5, "searchers asking for an animation; the lowest competition here", "2026-09-20"),
    ("40 trillion dollar debt", 5037, 55.3, 37.3, 58.2, "", "2026-10-04"),
    ("the debt clock is ticking", 5151, 55.4, 32.2, 60.4, "", "2026-09-16"),
    ("national debt clock", 4838, 55.0, 43.7, 55.5, "", "2026-10-12"),
    ("national debt clock live", 8779, 58.9, 37.8, 60.2, "'live' is a claim this video can't make (the write-up bans it): not in the tags", "2026-10-12"),
    ("us debt clock", 5153, 55.4, 58.7, 49.8, "flat (0%); also a website's name: not in the tags", "2026-06-19"),
    ("debt crisis", 31084, 67.1, 63.3, 54.9, "+235.9% vs its baseline (9,254)", "2026-10-12"),
    ("how fast is the national debt growing", 0, 0, None, None, "<750/month: the video's question is not searched as such", None),
    ("lifetime earnings", 0, 0, 40.1, 24.0, "<750/month: the pay side has no search demand of its own", None),
]
KEYWORD_MD_NOTE = {"national debt clock live": "'live' is banned by the write-up: not in the tags",
                   "how fast is the national debt growing": "<750/month: not searched as such"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and matching_terms modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; four rows are older snapshots (2026-06-19 to 2026-10-04).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("The debt is searched by its size and its milestone: 'us debt' (44,622) and 'national debt' (25,193) lead, and the $40 trillion milestone left a long tail ('us debt 40 trillion' 6,189, fading; "
            "'40 trillion debt animated' 5,396 at competition 17.3, people asking for exactly this kind of video). The clock phrases ('the debt clock is ticking' 5,151, 'national debt clock' 4,838) are the counter's genre. "
            "The video's own question ('how fast is the national debt growing') and its yardstick ('lifetime earnings') are not searched, so the copy leads with the searched words and lets the duel carry the idea.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Joe sounds alarm over national debt surpassing $40 trillion", "MS NOW", 10000000, 839517, "2026-08-20", "a news clip at the milestone; 3.98x its channel"),
    ("The U.S. National Debt Hit a Record High of $40 Trillion", "The New York Times", 5300000, 235279, "2026-08-20", "2:17; 11.77x"),
    ("The US National Debt Has Surpassed $40 Trillion For the First Time In History.", "Kagan Dunlap", 1090000, 210296, "2026-08-21", "1:03; the milestone, talking head"),
    ("U.s. National Debt Grows To Large For National Debt Clock", "SaveOurSovereignty2", 1250, 100523, "2008-10-07", "36 s; the debt clock as the story"),
    ("National Debt In America Is Now Over $40 Trillion", "Noor", 389, 1834, "2026-08-20", "its description: growing about $92,065 a second (its own figure, not verified here)"),
    ("The US debt is growing at a terrifying speed  #america", "WealthForge", 181, 191, "2026-04-06", "per day, hour, minute and second, spoken"),
    ("America Borrows $80,000 Every Second  #usa #economics #nationaldebt", "The Cost of Everything", 4, 34, "2026-10-08",
     "the closest twin: a per-second and per-minute debt counter (its own Treasury maths, not verified here); no yardstick the viewer owns"),
]
SAME_IDEA_HEADING = "**2. The debt's growth is big news, but nobody measures it against a working life (vidIQ YouTube search and outliers, Shorts, under 4 min).**"
SAME_IDEA_MD = [
    "The $40 trillion milestone in August drew news Shorts in the hundreds of thousands (MS NOW 839,517; The New York Times 235,279; Kagan Dunlap 210,296), most of them naming politicians. "
    "Per-second versions exist but stay tiny: 'America Borrows $80,000 Every Second' (34 views, five days before this sheet) is the closest twin, and 'The US debt is growing at a terrifying speed' has 191.",
    "",
    "None of them puts the viewer's pay against the counter. This Short's duel (40 years of your pay vs 1 minute) is the twist the write-up adds to HD Guy's counters, and the copy keeps to the maths, with no party or person, as its tone rule asks.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search and outliers (Shorts; under 4 min): the debt's growth is a news topic (the August $40 trillion milestone: MS NOW 839,517, NYT 235,279), and per-second debt Shorts exist but stay small "
                  "('America Borrows $80,000 Every Second', 34 views, 2026-10-08). None measures the debt against a working life; the figures in their titles and descriptions are theirs, not verified here.")

OUTLIERS = [
    {"handle": "@infostorylab", "platform": "TikTok", "id": "7677680082189667598",
     "on_screen": "While the world watched the Iran war, America quietly crossed a 40 trillion dollar debt bomb.",
     "caption": "America’s $40 Trillion Debt Bomb — How Fast Can It Grow?", "views": "470.9K (247.3x the account median of 1.9K)",
     "note": "how fast the debt grows is the hook; an AI-voiced essay"},
    {"handle": "@realmizkif", "platform": "TikTok", "id": "7676161638919130381",
     "on_screen": "we are in America's $40 Trillion Debt Problem 🤯", "views": "236.8K (28.2x the account median of 8.4K)",
     "note": "the milestone, split screen with a debt display"},
    {"handle": "@americafirstalert", "platform": "Instagram", "id": "DcUN1I9Oj27",
     "on_screen": "BREAKING: Just as economic fears of a market crash and inflation rise, U.S. national debt surpasses $40 trillion.",
     "views": "319.6K (170.8x the account median of 1.9K)", "note": "a debt-clock screen recording counting up, music only, looped"},
    {"handle": "@kriskrohn", "platform": "Instagram", "id": "DbTlfULuMFp",
     "on_screen": "BREAKING: New study finds that a minimum wage worker in 1971 had a lifestyle affordability similar to someone making $100,000 today.",
     "caption": "A six-figure salary isn’t what it used to be.", "views": "1.7M (184.0x the account median of 9.5K)",
     "note": "pay as the yardstick travels: a static text post about what a salary is worth"},
]
OUTLIERS_HEADING = "**3. Debt counters and pay yardsticks both travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@infostorylab** (TikTok), \"America’s $40 Trillion Debt Bomb — How Fast Can It Grow?\": 470.9K (247.3x). How fast the debt grows is the hook, which is this Short's counter.",
    "- **@americafirstalert** (Instagram), a debt-clock screen recording: 319.6K (170.8x). Music only and looped, a counter as the whole video.",
    "- **@realmizkif** (TikTok), \"we are in America's $40 Trillion Debt Problem 🤯\": 236.8K (28.2x). The milestone itself.",
    "- **@kriskrohn** (Instagram), \"A six-figure salary isn’t what it used to be.\": 1.7M (184.0x). The other half of this Short: a salary as the yardstick.",
    "- The debt Reels state the size or the speed; none sets it against the viewer's own pay. That pairing is what this Short adds.",
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
    "The channel has no counter Short yet. The two 'big money made physical' Shorts are among its best: the $1M stack vs the Burj Khalifa (1,221 views, 5,449 plays at a 27.0% skip rate) "
    "and $1M in pennies (177 views, 598 plays). Its two brand Shorts, 06c and 06b, are too young to compare, and 06b's Reel shows 7 plays while Instagram's owner insights catch up.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic; 06b and 06c left out as too young):",
    "",
    "- **YouTube:** Sunday early morning ET 1,198, weekday 22:00-00:30 ET 642, weekday midday 263.",
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
    "The two Debt to the Penny readings rest on search results (PrimeRates, citing Treasury; the API and page fetches were blocked) and are marked [click-check] in the write-up. Open them once before posting. "
    "If the 2026-09-30 reading can be read, the write-up's optional upgrade (a full fiscal year, 'FY2026' in the footer) changes the footer, the rate and this sheet.",
    "The figures in other creators' titles and descriptions (per-second debt growth) are theirs, not verified here; the copy states only the write-up's maths.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "7 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 6 at the first build and option 3 with the description's own hashtags at the adversarial check; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "60 credits for this teaser by listed cost (3 keyword queries, 1 YouTube search, 1 Shorts outlier search, 1 Instagram/TikTok outlier search and 6 title scores at up to 5 each), plus 10a's debt keyword queries (shared), 10 shared across 10a-10c for the channel's stats and Shorts list (Instagram owner insights cost 0), and 5 for the re-score after the build. "
                     "Account balance: 4,375 at the start of the 10 research and 4,135 when it ended, a 240 drop for 56 calls (the balance is shared with sheets built in parallel, so the drop is an upper bound; keyword queries cost less than 5); 4,060 after the 3 re-scores (15 credits by listed cost; the rest of that 75 drop is other sheets'). About 255 for the three 10 sheets, against a budget of about 450. "
                     "Adversarial check: 10 for this teaser by listed cost (the pick's title score and option 3's) plus 2 keyword queries ('40 trillion debt animated' twice), and 5 shared across 10a-10c for the three related videos' titles. "
                     "Balance 3,695 at the check's start and 3,635 after its last call (a 60 drop for 18 calls across 10a-10c, 30 of it listed title and video costs; the balance is shared with sheets checked in parallel).",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/10-cost-counter.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/10-cost-counter.py; "
                "the growth, the rate and every figure recomputed from the two readings in MATH_RELATIONS (≈ $2.46 trillion in 364 days; ≈ $78,000 a second; ≈ $4.7 million a minute; $2,602,080; ≈ 33 seconds; ≈ $117,000; ≈ 72 years; the public part ≈ $66,000 and ≈ $4.0 million); "
                "COPY_RULES hold every figure to the write-up's one rounding, put '≈' or 'about' on every rounded figure, keep each reading beside its date and every '≈ 33 seconds' with median pay, and ban 'live', 'fiscal 2026', 'FY2026', 'under 1 second', politics and advice wording. Re-run at the adversarial check (2026-10-13) with the same result")
VIDIQ_REQUERIED = ("pulled 2026-10-13: national debt 25,193 / 62.0 (+2.0%); us debt 40 trillion 6,189 (-68.1%); 40 trillion debt animated 5,396 / 17.3; "
                   "title scores 96 (pick = the write-up's title; three others tie); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried after the build: the pick's title score 96. Match. "
                   "Re-queried at the adversarial check: the pick's title score 96; 40 trillion debt animated 5,396 / 17.3 (snapshot 2026-09-20); "
                   "the related video hJBvmGA6sZ0 1,222 views (1,221 at the build), title as in the pick. All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 10b maths table: $40,096,954,633,566.68 − $37,637,553,494,935.61 = $2,459,401,138,631.07 ≈ $2.46 trillion; "
    "÷ 31,449,600 s = $78,201.35 ≈ $78,000 a second; × 60 = $4,692,081 ≈ $4.7 million; $1,251 × 52 × 40 = $2,602,080 ≈ $2.6 million; $2,602,080 ÷ r = 33.27 ≈ 33 s; 1 minute ÷ 40 = $117,302 ≈ $117,000; 1 minute ÷ $65,052 = 72.1 ≈ 72 years; "
    "$2.09T ÷ 31,449,600 s = $66,456 ≈ $66,000, × 60 ≈ $4.0 million. The data file recomputes every one, and the 364 days from the two dates.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above; the debt rows shared with 10a). 7 titles scored against this channel (6 at the first build, option 3 with the description's hashtags at the adversarial check): the pick (the write-up's own title) 96, tied with four others. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 96, as first scored. At the adversarial check: the pick's title score 96; '40 trillion debt animated' 5,396 / 17.3 (snapshot 2026-09-20); "
    "the related video (`hJBvmGA6sZ0`) 1,222 views, its title as in the pick. All match.",
    "- **Changed at the adversarial check.**",
    "  - Option 3 used `#NationalDebt #USDebt #Debt`, which are not the description's hashtags, so the builder's check would have refused it if picked. The pick plus the description's three runs 101 characters, so option 3 is now "
    "'Which Is Bigger: 40 Years of Your Pay or 1 Minute of New Debt? #NationalDebt #DebtClock #MoneyMath' (98 characters, scored 96); the old form moves to 'also scored'.",
    "  - Two title notes miscounted: option 2 is 74 characters (not 75), and the pick ties the top score of 7 titles now scored (was 'of the 6').",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/10-cost-counter.py`, shared with 10a and 10c.",
    "- **Mutation test.** Breaks on scratch copies of this file all fail by name: a title that gives the verdict, 'fiscal 2026' in the description, a second rounding of the rate ('$78,201'), "
    "'≈ 33 seconds' with 'your working life' in place of median pay (the first version of that rule read whole lines and missed it in the one-line long alt text; it now looks 90 characters back), a reading moved beside the wrong date, and a result in the caption's first 125 characters. (20 of 20 across 10a-10c.)",
    "- **Kept on purpose.**",
    "  - The YouTube thumbnail is frame 1 (the question) and the Instagram cover is the end hold, as the write-up's Instagram note asks; not the burst, which is a white impact frame.",
    "  - Every '≈ 33 seconds' names median pay: the counter eats the median's 40 years, not the viewer's; the flip point (≈ $117,000) and the swap-in rule answer 'your pay'.",
    "  - '364 days', never a fiscal year: the 2026-09-30 reading could not be confirmed (the write-up's Review log, V4).",
    "  - The public-debt answer ($2.09 trillion, ≈ $66,000 a second) sits in the pinned comment, as the write-up's TikTok reply, not in the description.",
    "- **Checked and kept.** Every figure in the copy against the 10b maths table and the check's output (the swap-in rule gives the median ≈ 33 seconds and the flip point ≈ $117,000, the same as the exact rate); "
    "the title (65/100), description (bytes), tags, hashtags, caption, first 125 characters and both alt texts against the platform limits; PrimeRates named only as the publisher of the Treasury readings, as 06b names its sources, and the board a generic counter; "
    "frame 1 (thumbnail) and frame 1065 (cover) read from the render.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file, re-reading the long alt text against it.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 10b maths table (teasers/v2/10-cost-counter.md, section 10b) and
# recomputed below from its inputs; dates are the readings' own, quoted from the write-up.
FIGURES = {
    "$37.638", "$40.097", "$2.46", "364", "86,400", "$78,000", "78,000", "$4.7", "72", "$1,251", "52", "40", "$2,602,080",
    "33", "$117,000", "1", "$2.09", "$66,000", "$4.0", "$65,052", "$0", "3", "10", "20", "30", "0",
    "2025", "2026", "29", "2",
}
from fractions import Fraction as _F
import datetime as _dt
_d0, _d1 = _F("37637553494935.61"), _F("40096954633566.68")
_g = _d1 - _d0                                   # growth over the window
_days = (_dt.date(2026, 9, 29) - _dt.date(2025, 9, 30)).days
_r = _g / (_days * 86400)                        # new debt per second
_min = _r * 60
_life = 1251 * 52 * 40
_pub = _F("2.09") * 10**12 / (_days * 86400)
MATH_RELATIONS = [
    (_days == 364, "2025-09-30 to 2026-09-29 is 364 days"),
    (round(float(_d0) / 1e12, 3) == 37.638 and round(float(_d1) / 1e12, 3) == 40.097, "the readings: $37.638 trillion and $40.097 trillion"),
    (_g == _F("2459401138631.07") and round(float(_g) / 1e12, 2) == 2.46, "Δ = $2,459,401,138,631.07 ≈ $2.46 trillion"),
    (round(float(_r), 2) == 78201.35 and round(float(_r), -3) == 78000, "Δ ÷ (364 × 86,400 s) = $78,201.35 ≈ $78,000 a second (2 significant figures)"),
    (round(float(_min) / 1e6, 1) == 4.7, "× 60 = $4,692,081 ≈ $4.7 million a minute"),
    (_life == 2602080 and round(_life / 1e6, 1) == 2.6, "$1,251 × 52 × 40 = $2,602,080 ≈ $2.6 million"),
    (round(float(_F(_life) / _r)) == 33, "$2,602,080 ÷ rate = 33.27 ≈ 33 seconds"),
    (_min > _life and round(float(_min / _life), 1) == 1.8, "1 minute is bigger: 1.80x a working life of median pay (md only)"),
    (round(float(_min / 40), -3) == 117000, "flip point: 1 minute ÷ 40 = $117,302 ≈ $117,000 a year"),
    (round(float(_min / 65052)) == 72, "1 minute ÷ $65,052 = 72.1 ≈ 72 years of median pay"),
    (round(float(_pub), -3) == 66000 and round(float(_pub * 60) / 1e6, 1) == 4.0 and _pub * 60 > _life,
     "the public part: $2.09T ÷ 31,449,600 s = $66,456 ≈ $66,000 a second, ≈ $4.0 million a minute, still more than $2,602,080"),
    (abs(float(_r * _F("33.27411")) - _life) < 0.5, "the counter stops on exactly $2,602,080 (r × 33.27411 = $2,602,080.28), so its final has no '≈'"),
]
MATH_SCRIPT = "publishing/data/checks/10-cost-counter.py"
MATH_KEY_LINES = ["2.4594  ≈ $2.46T", "78,201.3488  ≈ $78,000 every second", "4,692,080.9269  ≈ $4.7 million", "2,602,080.0000  $2,602,080",
                  "117,302.0232  ≈ $117,000 a year", "72.1282  ≈ 72 years of median pay", "33.2741  ≈ 33 seconds", "66,455.5352  ≈ $66,000 a second"]
RESULT_RE_TITLE = r"\b33\b|4\.7|2,602|2\.6|1\.8|117|\b72\b|78,0|2\.46|≈|[Aa]bout|[Ww]ins|[Bb]eats?"
RESULT_RE_CAPTION = r"\b33\b|4\.7|2,602|2\.6|1\.8|117|\b72\b|78,0|2\.46|≈|[Aa]bout|seconds?\b|[Ww]ins|[Bb]eats?"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_ALL_TAGS = _ALL + "\n" + ", ".join(YT_TAGS) + "\n" + " ".join(YT_HASHTAGS + IG_HASHTAGS)
_YEAR = _re.compile(r"(?<![/\d])20[123]\d(?!\d)")
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_num = lambda s: float(s.replace(",", ""))
_MULT = {"": 1, " million": 1e6, " billion": 1e9, " trillion": 1e12}


def _beside(fig, year, reach=45):
    """every occurrence of fig has its year on the same line, within reach characters, with no other year between them"""
    return all(any(y.group() == year and abs(y.start() - m.start()) <= reach
                   and not _YEAR.search(ln[min(y.end(), m.end()):max(y.start(), m.start())]) for y in _YEAR.finditer(ln))
               for ln in _lines() for m in _re.finditer(fig, ln))


def _approx(pat):
    """every occurrence of pat comes right after '≈ ' or 'about '"""
    return all(_re.search(r"(?:≈|[Aa]bout) $", v[max(0, m.start() - 6):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


# One rounding per quantity (the write-up's rule, unit-aware): a dollar amount near a computed quantity must be its one
# shown rounding; so must a time in seconds and a count of years. Exact inputs (the readings, $2,602,080, $65,052) pass.
_DOLLARS = {"growth": (float(_g), [2.46e12]), "rate": (float(_r), [78000]), "minute": (float(_min), [4.7e6]),
            "working life": (_life, [2602080, 2.6e6]), "flip point": (float(_min / 40), [117000]),
            "public rate": (float(_pub), [66000]), "public minute": (float(_pub * 60), [4.0e6])}
_EXACT = {65052, 2602080, 1251}   # exact inputs shown verbatim (a year of median pay sits 2.1% under the public part's ≈ $66,000; not a rounding of it)
_bad_dollars = []
for _m in _re.finditer(r"\$(\d[\d,]*(?:\.\d+)?)( million| billion| trillion)?", _ALL):
    _v = _num(_m.group(1)) * _MULT[_m.group(2) or ""]
    for _k, (_ex, _shown) in _DOLLARS.items():
        if abs(_v - _ex) <= _ex / 20 and _v not in _shown and _v not in _EXACT:
            _bad_dollars.append((_m.group(0), _k))
_bad_times = [m.group(0) for m in _re.finditer(r"(?<![\d,.$])(\d+(?:\.\d+)?) seconds?\b", _ALL)
              if abs(_num(m.group(1)) - float(_F(_life) / _r)) <= 33.274 / 20 and m.group(1) != "33"]
_bad_years = [m.group(0) for m in _re.finditer(r"(?<![\d,.$])(\d+(?:\.\d+)?) years\b", _ALL)
              if abs(_num(m.group(1)) - float(_min / 65052)) <= 72.13 / 20 and m.group(1) != "72"]

_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (not _re.search(r"(?i)\blive\b|fiscal 2026|FY ?2026|under 1 second", _ALL_TAGS),
     "no 'live', 'fiscal 2026', 'FY2026' or 'under 1 second' in the copy, tags or hashtags (the write-up's banned overclaims for 10b)"),
    (not _bad_dollars, f"every dollar figure is its quantity's one rounding (≈ $2.46 trillion, ≈ $78,000, ≈ $4.7 million, ≈ $117,000, ≈ $66,000, ≈ $4.0 million): {_bad_dollars}"),
    (not _bad_times and not _bad_years, f"the pass time is only ever ≈ 33 seconds and the minute only ever ≈ 72 years: {_bad_times + _bad_years}"),
    (all(_approx(p) for p in (r"\$2\.46 trillion", r"\$78,000", r"\$4\.7 million", r"\$117,000", r"\$66,000", r"\$4\.0 million", r"\b72 years", r"\b33 seconds", r"\$2\.6 million")),
     "every rounded figure comes with '≈' or 'about' ($2,602,080 and the readings are exact and go without)"),
    (not _re.search(r"(?:≈|about) \$2,602,080", _ALL), "$2,602,080 is exact (the counter stops on it) and never carries '≈'"),
    (all("median pay" in v[max(0, m.start() - 90):m.start()] for v in _COPY.values() for m in _re.finditer(r"\b33 seconds", v)),
     "every '33 seconds' names the median pay it measures, within the 90 characters before it (the counter eats the median's 40 years, not the viewer's)"),
    (_beside(r"\$37\.638 trillion", "2025") and _beside(r"\$40\.097 trillion", "2026"), "each Debt to the Penny reading sits beside its own date"),
    (all("364" in ln for ln in _lines() if _re.search(r"\$2\.46 trillion", ln)), "the $2.46 trillion always comes with its 364 days"),
    (all(_re.search(r"Earn more than|a year", ln) for ln in _lines() if "$117,000" in ln), "≈ $117,000 is always the yearly flip point"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    (not _re.search(r"(?i)\b(?:trump|biden|obama|bessent|powell|republicans?|democrats?|gop|congress|white house|president|administration|party)\b", _ALL_TAGS),
     "no party, person or policy is named (the write-up's tone rule)"),
    (all(_re.search(r"\d (?:million|billion|trillion)\b", ln) for ln in _lines() if _re.search(r"(?i)\b(?:million|billion|trillion)\b", ln))
     and not _NUMBER_WORDS.search(_ALL), "no spelled-out figures ('million', 'billion' and 'trillion' only after a numeral)"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bbuy now\b|\bworth it\b|\binvest\b", _ALL), "no advice wording"),
]
