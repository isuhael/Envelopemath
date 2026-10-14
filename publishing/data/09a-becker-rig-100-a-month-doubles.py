# 09a publishing data: you add $100 a month; when does it earn $100 a month? (Becker Rig, growth-ladder).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 08b-becker-rig-hours-at-15.py (the nearest
# Becker Rig sheet of the same batch: a pre-condense render, a cover picked by content, the same house sections).
#
# Facts come only from teasers/v2/09-growth-ladder.md (section 09a, "Decisions shared by all three" and the Sources
# under 09a) and python3 teasers/v2/checks/09-growth-ladder.py. Research: vidIQ, pulled 2026-10-13. The video is the
# condensed cut, promoted and shipped on 2026-10-13 (timing only; numbers, caption facts and the verdict stay; the
# pre-condense render is in git, 471c793 and c4a3014). This sheet names no timestamp except the cover, which is picked
# by content (the question frame), so the ship re-ran the build with --covers on the shipped file.

TEASER = "09a Becker Rig, growth-ladder: \"You add $100 a month. When does it earn $100 a month?\""
PREPARED = "2026-10-13"
SHORT_ID = "09a"
MD_TITLE = "09a publishing sheet: you add $100 a month, when does it earn $100 a month?"
MATH_RUN = "509 checks, 0 failed"      # python3 teasers/v2/checks/09-growth-ladder.py on studio/specs/ (via publishing/data/checks/09-growth-ladder.py), 2026-10-13
MATH_SCRIPT = "publishing/data/checks/09-growth-ladder.py"   # runs the 09 check unchanged, adds the builder's summary form
MATH_RUN_SHIP = "536 checks, 0 failed"  # the same check on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
RENDER_COMMIT = "c4a3014"              # the last commit that holds the pre-condense render (with the v2.4 soundtrack)
RENDER_SHA_PRE = "ccf60e082f389a6cda295cfea565ace6b5abb70c17dbbdb56cbeddece5718c02"   # at 471c793 (v2.2 soundtrack): 3dddeb79…

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    f"promoted and shipped on 2026-10-13. It replaces the 31.0 s pre-condense cut (the Becker Rig port after its QA fix pass, 2026-10-08; the owner: \"too many still moments\"), which is in git (`{RENDER_COMMIT}`). "
    "The condense moved the clock; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content (the question frame) on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/09-growth-ladder.md` (09a) and its check, "
    f"`python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/09-growth-ladder.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every rung from $100 a month at 8% ÷ 12, "
    "re-finds the crossing month (106) and the pinned 7% and 10% years, keeps every rung's figures beside their own year and every rounded figure 'about' or '≈'.",
    "- **Honesty rules kept.** The title asks when the growth reaches $100 a month and never says the year, and neither does the cover (the question frame: ≈ $8 a month against the $100 asked about). "
    "The Instagram caption keeps the year below 'more'. 'Earns' is defined everywhere it is used, as the write-up does: the balance × 8% ÷ 12, growth that stays in the account, not a payout. "
    "The 8% is called an assumption, not a forecast, with the deposit convention (month-end, compounded monthly) and no fees, taxes or inflation. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** No company or product is in the video. The copy names the S&P 500 only to say where the 8% comes from (the write-up's caption line); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' No share price is named.",
    "- **[click-check].** The S&P 500 figures behind '≈ 10% before inflation, ≈ 7% after' (Official Data Foundation 10.09% / 6.81%, a live figure read 2026-10-07; A Wealth of Common Sense 9.94% for 1928-2024) "
    "come from search results; the write-up marks both pages for a hand check before posting (the proxy blocked fetching them). Nothing here changes that.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 31.0, "sha256": RENDER_SHA_PRE,
                    "note": f"the pre-condense cut (Becker Rig port + port QA fix pass, 2026-10-08) + card, retired; in git history ({RENDER_COMMIT}; 471c793 with the v2.2 soundtrack)"}}

FACTS = {
    "source": f"teasers/v2/09-growth-ladder.md section 09a; teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "$100 at each month-end at an assumed 8% a year, compounded monthly (r = 8% ÷ 12 a month); no fees, no taxes, no inflation adjustment; the rate is not a forecast",
    "earns": "'Earns a month' at a year-end = Worth × 8% ÷ 12, the next month's growth; it stays in the balance, it is not a payout",
    "rungs": "Year 1 ≈ $1,245 / ≈ $8; 5 ≈ $7,348 / ≈ $49; 8 ≈ $13,387 / ≈ $89; 9 ≈ $15,743 / ≈ $105; 15 ≈ $34,604 / ≈ $231; 20 ≈ $58,902 / ≈ $393; 25 ≈ $95,103 / ≈ $634; 30 ≈ $149,036 / ≈ $994 (Worth / earns a month)",
    "year_1": "'By year 1 it's earning about $8 a month' is the rate at the end of year 1: month 13 grows $8.30 (month 12 $7.58; the year-1 average $3.75)",
    "crossing": "month k grows W(k − 1) × r ≥ $100 exactly when (1 + r)^(k − 1) ≥ 2: month 106 grows ≈ $100.91 (month 105 ≈ $99.58), so year 9",
    "any_amount": "the deposit cancels out of (1 + r)^(k − 1) ≥ 2: month 106 for $50, $500, $1,000 or $5,000 a month (still year 9)",
    "year_30": "≈ $994 a month = 9.94 × the $100 deposit ('almost 10 times')",
    "pinned": "72 ÷ 8 = 9; (1 + 8%/12)^n = 2 at n = 104.32 months ≈ 8.7 years (a lump sum's doubling time); the same crossing at 7% is month 121 (year 11), at 10% month 85 (year 8)",
    "sp500": "S&P 500 since 1928: 10.09% a year nominal, 6.81% after inflation (Official Data Foundation, live figure read 2026-10-07); 9.94% nominal 1928-2024 (A Wealth of Common Sense, from Damodaran's NYU Stern data) [click-check]",
    "verdict": "From year 9 it earns more than you add. ($50 or $500 a month: still year 9)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "You Invest $100 a Month. When Does It Earn $100 a Month? Compound Interest, Year by Year"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 93,
     "note": "PICK. Top score of the 9 scored. The header's question with 'Invest' for 'add' (the searched 'invest 100 a month', 7,909) is the first 55 characters, so a title cut short still asks it whole; "
             "'Compound Interest, Year by Year' adds the topic's biggest phrase (137,873) and the ladder. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "You Add $100 a Month. When Does It Earn $100 a Month?", "vidiq_score": 92,
     "note": "The write-up's title, word for word as the header. One point lower; the fallback if the pick reads long in the player."},
    {"rank": 3, "title": "You Invest $100 a Month. When Does It Earn $100 a Month?", "vidiq_score": 92,
     "note": "The pick without its tail: the same score as the write-up's title, with the searched verb."},
]
YT_TITLES_ALSO_SCORED = [
    ("You Add $100 a Month. When Does Your Money Earn $100 a Month?", 92, ""),
    ("If You Invest $100 a Month, When Does It Earn $100 a Month on Its Own?", 90, ""),
    ("Invest $100 a Month: When Does It Earn More Than You Put In?", 89, ""),
    ("You Invest $100 a Month. What Year Does Your Money Earn More Than You Add?", 89, ""),
    ("The Compound Interest Crossover: When Does $100 a Month Earn $100 a Month?", 87, "the keyword up front loses 5"),
    ("You Add $100 a Month. When Does It Earn $100 a Month? #compoundinterest #investing #ruleof72", 82, "the house 3-hashtag form"),
]
TITLE_BULLETS = [
    "It asks the header's question, the one the ladder answers, and names no result: not the year, not ≈ $105, not ≈ $994. '$100 a month' is the input, on screen at frame 1 in the header. "
    "The topic words ride in the tail, after the whole question.",
    "It raises the write-up's title from 92 to 93. Every hashtag-free version that keeps the header's 'When does it earn $100 a month?' scores 90-93; the keyword-first version scores 87, and the header's question with three hashtags scores lowest (82). "
    "vidIQ's model ranks titles but does not predict views, so the pick is decided on the searched words it adds without moving the question.",
    "'Earn' is the write-up's own word, and the description, the caption and the pinned comment define it (growth that stays in the account, not a payout), as the write-up asks.",
]

YT_DESCRIPTION = """When does $100 a month start earning $100 a month on its own? At an assumed 8% a year, the crossover comes in year 9: month 106 grows about $100.91, more than you add. By year 30 it earns about $994 a month.

The math, shown (Earns a month = the balance × 8% ÷ 12, the next month's growth):
• Year 1: ≈ $1,245, earning ≈ $8 a month.
• Year 5: ≈ $7,348, earning ≈ $49 a month.
• Year 8: ≈ $13,387, earning ≈ $89 a month. Not yet.
• Year 9: ≈ $15,743, earning ≈ $105 a month. More than the $100 you add.
• Year 20: ≈ $58,902, earning ≈ $393 a month.
• Year 30: ≈ $149,036, earning ≈ $994 a month, almost 10 times your $100.
• The amount cancels out: $50 or $500 a month, it's still year 9.
• "Earns" is growth at the assumed rate that stays in the account, not a payout.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $100 deposited at each month-end at an assumed 8% a year, compounded monthly. 8% is an assumption, not a forecast: the S&P 500 has returned about 10% a year since 1928 before inflation, about 7% after (Official Data Foundation: 10.09% and 6.81%, read Oct 2026; A Wealth of Common Sense, from NYU Stern data: 9.94% before inflation, 1928-2024). No fees, taxes or inflation adjustment. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#compoundinterest #investing #ruleof72"""
DESC_NOTE = ("The opening line is the title's question with the answer, for the search snippet, and carries 'crossover' (the searched name for this moment: 'crossover point' 20,589 a month, +233.5%). "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08b: the verdict is a plain reading of an assumed rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#compoundinterest", "#investing", "#ruleof72"]
YT_HASHTAG_NOTES = [
    ("#compoundinterest", "the mechanism, and the biggest on-topic phrase ('compound interest' 137,873 searches a month, competition 50.6; −17.3% on its 30-day baseline)."),
    ("#investing", "the broad category ('investing' 613,566 a month, competition 65.0, flat at −2.0%)."),
    ("#ruleof72", "the write-up's own tag and the pinned comment's explanation ('rule of 72' 7,756 a month, +86.9% on its baseline, the one rising phrase here). It names the shortcut, not the year: 72 ÷ 8 needs the footer's 8% and the pinned comment."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["invest 100 a month", "investing 100 a month", "what happens when you invest 100 dollars a month", "if you invest 100 dollars a month",
           "crossover point", "crossover point investing", "compound interest", "compound interest explained", "how compound interest works",
           "rule of 72", "power of compounding", "investing for beginners", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. The four '$100 a month' phrases are the video's own stake (7,909, 3,372, 5,295 and 5,286 a month); "
             "'crossover point investing' (4,868) has the lowest competition here (24.4). Left out on purpose: 'passive income' (235,675) and 'how to make money', because 'earns' here is growth that stays "
             "in the account, not income; 'how to invest 100 dollars a month' and 'investing 100 a month on roth' are how-to intent; 'how long to double your money' is under 750 a month.")

YT_PINNED = """Year 9 isn't a coincidence: 72 ÷ 8 = 9. Monthly growth passes your deposit exactly when (1 + 8%/12)^n = 2, the lump-sum doubling time (≈ 8.7 years). At 7% it's year 11. At 10%, year 8.

Which rate would you use? The year doesn't depend on the amount, only on the rate."""
PINNED_NOTE = ("The write-up's pinned comment, unchanged, then a question for the viewer's own rate. It answers the two comments the write-up expects: '8% is too high or too low' "
               "(7% → year 11, 10% → year 8, both asserted by the check) and 'why 9?' (the Rule of 72). The caption and the description define 'earns' for the third ('that's compounding, not earning').")

RELATED_VIDEO = {
    "pick": {"id": "XVUeMcTg9OQ", "title": "Your Interest Has a Speed Limit #CompoundInterest #Math #personalfinance",
             "url": "https://www.youtube.com/shorts/XVUeMcTg9OQ",
             "why": "The channel's compounding-frequency Short ($1 at 100% compounded every second only reaches $2.72), and its best YouTube breakout (score 21.3, 1,141 views, 6 comments). Someone who watches growth pass a deposit is the viewer for the limit on compounding."},
    "swap_when_live": "09b ($1,000 at birth) or 09c ($1 a day × your number), the same growth-ladder series, once published. Then point that Short's Related video at this one.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the question frame (the cover below): the header's question, the working line '$1,245 × 8% ÷ 12 ≈ $8/mo', rung 1 at ≈ $8 against its $100 gauge and the dim rungs above."
THUMB_MD = ("in the YouTube app, pick the question frame, the same content as the Instagram cover below: 'You add $100 a month. / When does it earn $100 a month?' over the 8% footer, "
            "the working line '$1,245 × 8% ÷ 12 ≈ $8/mo', rung 1 at ≈ $1,245 / ≈ $8 with its gauge a sliver of the way to $100, and seven dim rungs. It asks without answering, like the title beside it in search.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening, 21:30-22:30 ET (01:30-02:30 UTC the next day); the condensed cut shipped on 2026-10-13. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, on a different evening from 09b and 09c, and away from 07a (the other $-a-month compounding Short). Suggested order within the series: 09a, then 09b, then 09c.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "09a goes first of the three: its hook scored highest with the write-up's judges (7.0 of 10), and its search words are the ones rising ('rule of 72' +86.9%, 'crossover point' +233.5% on their baselines).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("You invest $100 a month. When does it earn $100 a month on its own? Compound interest, worked out year by year. "
           "Sooner than you'd guess.")

IG_CAPTION = IG_HOOK + """

At an assumed 8% a year, compounded monthly. "Earns" here means the balance × 8% ÷ 12: growth that stays in the account, not a payout.

The math, shown:
• Year 1: ≈ $1,245, earning ≈ $8 a month.
• Year 8: ≈ $13,387, earning ≈ $89 a month. Not yet.
• Year 9: ≈ $15,743, earning ≈ $105 a month. Month 106 grows ≈ $100.91 on its own, more than you add.
• Year 30: ≈ $149,036, earning ≈ $994 a month, almost 10 times your $100.
• And the year doesn't depend on the amount: $50 or $500 a month, it's still year 9.

8% is an assumption, not a forecast: the S&P 500 has returned ≈ 10% a year since 1928 before inflation, ≈ 7% after. Deposits at month-end; no fees, taxes or inflation. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

Which rate would you use?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#compoundinterest #investing #ruleof72 #moneymath #investingforbeginners"""
IG_CAPTION_RULE = ("The first 125 characters are the header's question with the 'invest $100 a month' and 'compound interest' keywords, and the write-up's caption line 1 "
                   "('Sooner than you'd guess.'), no result: the caption overlays the Reel from frame 1, so the year and every figure sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question, the searched words and the write-up's numberless line 1, which hints that the answer is sooner than the viewer guesses without giving it. "
    "The write-up keeps 'year 9' out of the first 100 characters; here it first appears below 'more'. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The definition of 'earns' comes right after the hook, before any figure, as the write-up's caption does: the comment fight it expects is 'that's compounding, not earning'.",
    "The caption follows the house close: the write-up's rate question, then the follow line plus the credit.",
]

IG_HASHTAGS = ["#compoundinterest", "#investing", "#ruleof72", "#moneymath", "#investingforbeginners"]
IG_HASHTAG_MD = [
    "The write-up's four caption tags, plus one:",
    "",
    "- `#compoundinterest`, `#investing` and `#ruleof72` are the same three as YouTube; `#moneymath` is the write-up's series tag.",
    "- `#investingforbeginners` is the fifth, as on 07a and 02a: 'investing for beginners' is 295,600 searches a month on YouTube, and the channel's own start-age Short (`EqFQCJheCMU`) carries it as a tag.",
]

IG_ALT_SHORT = "Chart: $100 a month at 8%: its growth passes $100 a month in year 9; by year 30, about $994 a month."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the 8% beside the result.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page with a green stick figure at the foot of a ladder whose rungs are years. The header asks: you add $100 a month; when does it earn $100 a month? "
               "The footer: assumes 8% a year, compounded monthly, $100 in at month-end, not a forecast. A working line multiplies each year's worth by 8% and divides by 12. "
               "The figure throws a coin up to each rung, and a gauge under each monthly figure shows how far it is from $100: year 1, about $1,245, earning about $8 a month; "
               "year 5, about $7,348, earning about $49; year 8, about $13,387, earning about $89, tagged under $100; year 9, about $15,743, earning about $105, tagged beats your $100; "
               "year 15, about $34,604, earning about $231; year 20, about $58,902, earning about $393; year 25, about $95,103, earning about $634; "
               "year 30, about $149,036, earning about $994 a month, heaved onto a gold plate. "
               "Verdict: from year 9 it earns more than you add, and $50 or $500 a month is still year 9.")

IG_FIRST_COMMENT = ("Year 1: ≈ $8 a month. Year 8: ≈ $89. Year 9: ≈ $105, more than the $100 you add (month 106 grows ≈ $100.91). "
                    "Any monthly amount: still year 9. Which rate would you use?")

# ---------------------------------------------------------------- the cover frame
# The question frame, picked by content: the write-up's Instagram note offers frame 1 (the question, the ≈ $8/mo working
# line and the dim rungs) or the crossing; the crossing shows the answer (rung 9 beating $100), so this sheet uses the
# question. On the shipped condensed cut rung 1 is settled at frame 0 with the first caption complete; the figure shrugs
# from frame 2, the $100 gauge fills to 8% by about frame 15 (0.50 s), and he stands hand to chin at frames 18-20 before
# the wind-up for the first throw (about 0.8 s). Frame 18 (0.60 s) is used. (On the pre-condense render: frame 54.)
COVER_T = 0.6
COVER_FRAME = 18
COVER_CROP = "crop=1080:1440:0:62"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The question frame, settled: the header 'You add $100 a month. / When does it earn $100 a month?' ('$100 a month' in green), "
                          "the footer 'ASSUMES 8% a year, compounded monthly / $100 in at month-end · not a forecast', the working line '$1,245 × 8% ÷ 12 ≈ $8/mo', "
                          "the column heads Year / Worth / Earns a month, rung 1 at ≈ $1,245 / ≈ $8 with its $100 gauge filled a sliver (8%), seven dim rungs (5 to 30) over empty shelves, "
                          "the figure at the foot of the ladder with a hand on his chin, and the first caption 'By year 1 it's earning / about $8 a month.' fully lit. "
                          "It asks and does not answer: ≈ $8 against the $100 the header asks about. On any cut, use a settled frame after rung 1's gauge has filled and the first caption is fully lit, before the first throw.")
COVER_FRAME_MEASURED = (f"On the shipped {VIDEO_S:g} s condensed cut rung 1 is settled and the first caption complete at frame 0, but the gauge is not drawn yet; the figure shrugs from frame 2, "
                        "the gauge fills to 8% by about frame 15 (0.50 s), and at frames 18-20 (0.60-0.67 s) he stands hand to chin (frame-to-frame mean luma change 0.11-0.19 on 270×480 greyscale) "
                        "before the first throw winds up at about 0.8 s. The condense left no still hold here (it filled the opening with the shrug), so frame 18 (0.60 s) is used: the gauge filled and the figure's chin pose, as on the old cover. "
                        "On the 31.0 s pre-condense render the hold was frames 30-68, and frame 54 (1.80 s) was used.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 62 to 1502 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1452 (the caption), so the crop centres it (50 px above and below): "
                   "badge, header, footer, working line, column heads, the whole ladder with the figure, and the caption; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the question frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the crossing (the 'beats your $100' tag over ≈ $105, the figure celebrating), the write-up's other cover option. It is livelier, but rung 9 beating $100 is the answer to the title.",
    "**Not used:** the end hold ('From year 9 / it earns more than you add.' with rung 9 relit), the verdict.",
    "**Shipped cut (2026-10-13):** the question frame was re-picked by content on the shipped file (frame 18, 0.60 s; was frame 54) and both JPGs re-exported: the same picture, the same crop. "
    "Frame 1 itself is not used, because the gauge is not drawn yet there. The copy did not change.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The pre-condense render is in git: `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 09a-31.0s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…; at 471c793 it carries the v2.2 soundtrack, 3dddeb79…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. A cover test (the question frame vs the crossing) is the other use. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '$100 a month, year by year — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 09b and 09c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("compound interest", 137873, 76.7, 50.6, 65.8, "the mechanism; −17.3% vs its 30-day baseline (166,772)", "2026-10-12"),
    ("crossover point", 20589, 64.4, 33.1, 65.4, "+233.5% vs its baseline (6,173): the searched name for growth passing the deposit", "2026-10-12"),
    ("how compound interest works", 18742, 63.8, 43.5, 60.9, "−12.4%", "2026-10-12"),
    ("invest 100 a month", 7909, 58.2, 52.0, 54.1, "the video's stake", "2026-10-12"),
    ("rule of 72", 7756, 58.1, 59.0, 51.2, "+86.9% vs its baseline (4,149); the pinned comment's shortcut", "2026-10-12"),
    ("what happens when you invests 100 dollars a month", 5295, 55.6, 31.7, 60.7, "as typed in search", "2026-10-12"),
    ("if you invest 100 dollars a month", 5286, 55.6, 39.2, 57.7, "", "2026-10-12"),
    ("the compound interest secret 100 a month", 4984, 55.2, 22.9, 64.0, "an older snapshot", "2026-04-21"),
    ("crossover point investing", 4868, 55.0, 24.4, 63.3, "the lowest competition here", "2026-10-12"),
    ("investing $100 a month", 3372, 52.7, 51.6, 51.0, "seed; US research mode", "2026-09-30"),
    ("passive income", 235675, 80.2, 59.0, 64.5, "−22.3%; not used: 'earns' here is growth that stays in the account", "2026-10-12"),
    ("investing for beginners", 295600, 81.7, 49.0, 69.4, "−22.0%; the fifth Instagram tag", "2026-10-12"),
    ("how long to double your money", 0, 0, 34.7, 26.1, "<750/month", None),
]
KEYWORD_MD_NOTE = {"what happens when you invests 100 dollars a month": "the same stake, as typed in search"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'investing $100 a month' with US volumes, 'rule of 72', 'crossover point investing' and 'how long to double your money'; "
                   "matching_terms for '100 a month'; questions for 'compound interest'), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date "
                   "in metrics_as_of; two rows are older snapshots (2026-04-21 and 2026-09-30).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Two rows are older snapshots.")
KW_OUTRO = ("'compound interest' is the biggest on-topic phrase (137,873 a month), so it leads the hashtags and rides in the title's tail. The moment this Short is about has its own rising name, "
            "'crossover point' (20,589, +233.5%), and 'crossover point investing' has the lowest competition in the set (24.4), so the description's first line uses the word. "
            "The stake is searched as typed ('invest 100 a month' 7,909; 'what happens when you invests 100 dollars a month' 5,295), and 'rule of 72' is rising (+86.9%). "
            "'passive income' (235,675) is left out: the growth stays in the account.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How $100 a Month Can Make You a Millionaire", "The Ramsey Show Highlights", 4600000, 5145566, "2024-08-05", "12 s; outlier score 29.38; the $100 stake, aimed at a million"),
    ("The Power of Compounding", "Brian Feroldi", 319000, 3281682, "2025-05-23", "outlier score 127.35; the topic, not the crossover"),
    ("Will investing $100 every month till you're 65 make you a millionaire? Debatable. @GeorgeKamel", "Humphrey Yang", 2090000, 313583, "2024-08-05"),
    ("This Is When Your Money Starts Working Harder Than You", "The Money Guy Show", 705000, 195754, "2026-04-10", "the crossover as a talk clip"),
    ("The Wealth Crossover Point: When Your Portfolio Grows Faster Than You Can Contribute", "Erin Talks Money | Erin Moriarity", 441000, 17584, "2026-02-07"),
    ("Is your money earning more than you are yet? #finance #money #investing", "Vantage Point", 15, 299, "2026-10-02",
     "$500 a month: a year's growth passes a year's deposits after about ten and a half years, per its description"),
    ("When Does Your Money Start Making More Than You Put In? | The Investing Crossover Point", "Money Made Simple", 17, 6, "2026-09-09", "2:12 long"),
    ("How $100 A Month Actually Makes You Wealthy (The Year 9 Crossover)", "FinAndCare", 0, 5, "2026-09-22",
     "this Short's answer in its title; its description ties it to an S&P 500 index fund (not checked here)"),
    ("How Much Can $100 a Month Grow in 20 Years? 📈💰 #diyinvestor #diyinvesting #financialsense #financial", "DollarMira", 6, 20, "2026-10-10", "7% compounded monthly, ≈ $52,000 by year 20, per its description"),
]
SAME_IDEA_HEADING = "**2. $100 a month is a proven stake; the crossover is a small, new idea (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "$100 a month travels when it is aimed at a million (Ramsey's 12-second clip, 5,145,566 views; Humphrey Yang's 'Debatable.', 313,583). The crossover, the month the growth passes the deposit, "
    "is a newer idea with a talk-clip hit (The Money Guy's 'This Is When Your Money Starts Working Harder Than You', 195,754) and a run of small 2026 Shorts. "
    "One of them, FinAndCare's 'How $100 A Month Actually Makes You Wealthy (The Year 9 Crossover)' (5 views), puts this Short's answer in its title; the pick asks instead.",
    "",
    "None of them shows the crossing on a ladder with the monthly figure against a $100 gauge, and none says the year is the same for any amount, this Short's second bust.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): '$100 a month' is a proven stake when aimed at a million (Ramsey 5.1M; Humphrey Yang 313,583); "
                  "the crossover itself has one talk-clip hit (The Money Guy, 195,754) and several small 2026 Shorts, one with 'Year 9' in its title. None shows the amount cancelling out.")

OUTLIERS = [
    {"handle": "@theschoolofmoneysg", "platform": "Instagram", "id": "Db7XpGGCDOf",
     "on_screen": "Your money makes money at $100k", "views": "55.9K (79.3x the account median of 705)",
     "note": "an animated tipping point in compound interest (8% on $1k vs on $100k): the closest concept to this Short"},
    {"handle": "@propertywithharley", "platform": "Instagram", "id": "Db2tfLtz3RU",
     "on_screen": "Future Portfolio Value (now vs 2046)", "views": "1.3M (33.9x the account median of 37K)",
     "note": "a year-by-year value table over a still shot, music only, looped"},
    {"handle": "@aaronlevi__", "platform": "Instagram", "id": "Dbs5KFOuURH",
     "on_screen": "In your 20s, someone will tell you to start investing... it's a good idea to listen to them:", "views": "228.8K (67.8x the account median of 3.4K)",
     "note": "a balance climbing over b-roll, music only"},
    {"handle": "@data.dragonn", "platform": "TikTok", "id": "7680694072218029344",
     "on_screen": "POV: Someone invested $100 every month in the GoPro Stock over the last 12 years", "views": "1.4M (49.6x)",
     "note": "the same $100-a-month stake as an animated data visualization, music only"},
    {"handle": "@keysfinance", "platform": "TikTok", "id": "7666160850981408013",
     "on_screen": "How to retire with $2M", "views": "3.3M (1457.8x the account median of 2.3K)",
     "note": "monthly amounts by starting age, talking head"},
]
OUTLIERS_HEADING = "**3. Monthly-amount growth travels on Instagram and TikTok as a table or a climb with music (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@theschoolofmoneysg** (Instagram), \"Your money makes money at $100k\": 55.9K (79.3x). An animated tipping point in compound interest: the closest concept to this Short.",
    "- **@propertywithharley** (Instagram), \"Future Portfolio Value (now vs 2046)\": 1.3M (33.9x). A year-by-year table, music only, looped. **@aaronlevi__** (Instagram): 228.8K (67.8x), a balance climbing, music only.",
    "- **@data.dragonn** (TikTok), \"POV: Someone invested $100 every month in the GoPro Stock over the last 12 years\": 1.4M (49.6x). The same $100-a-month stake as an animated chart.",
    "- **@keysfinance** (TikTok), \"How to retire with $2M\": 3.3M (1457.8x). Monthly amounts by starting age.",
    "- The music-only table and climb formats, this Short's form, are the ones that travel without a voice. None of the outliers names the month the growth passes the deposit.",
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
    "The channel's compounding Shorts so far: 'Your Interest Has a Speed Limit' is the best YouTube breakout (1,141 views, score 21.3) but one of the weakest Reels (177 plays, 56.9% skip), "
    "and '10 years late' (the start-age lump sum) the weakest of the month on YouTube (161 views) and the Reel with the month's highest skip rate (65.1%; 219 plays). Both open on a claim with the answer in it; this Short opens on a question with ≈ $8 against $100 on frame 1. "
    "06c (760 views, 1,711 plays) and 06b (Mon 12 Oct 12:14 ET: 75 views so far; its Reel shows 7 plays while Instagram's owner insights catch up) are left out of the medians as too young.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic):",
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
    "The S&P 500 figures behind the caption's '≈ 10% / ≈ 7%' come from search results the write-up could not open (the proxy blocked the pages); they are marked [click-check] there, and the 10.09% / 6.81% figure is a live one that will drift.",
    "The video, the cover and the video facts are the condensed cut, shipped on 2026-10-13; the copy is cut-independent and carried over unchanged.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "titles_scored": "9 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "09a: 100 by listed cost (6 keyword queries, 3 YouTube searches, 1 Instagram/TikTok outlier search, 9 title scores and 1 re-score after the build, 5 credits each), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel Shorts list 5; Instagram owner insights and the balance cost 0); 265 for the three 09 sheets. The balance read 4,640 before the first 09 call, 4,635 after it "
                     "(a keyword query at 5) and 4,375 when the research ended: a 265 drop, so 15 were parallel sheets' calls. It read 4,130 after the build's re-scores: of that 245, 15 were the three 09 re-scores and 230 parallel sheets' calls. At the adversarial check: 10 by listed cost (1 title score, 1 keyword pull), plus a third of 5 shared (one lookup of the three related videos); the three 09 checks used 35 in all. The balance read 3,730 before them and 3,695 after, with no other spend in that window.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/09-growth-ladder.py; "
                "every rung recomputed in MATH_RELATIONS from $100 a month at 8% ÷ 12 (Worth and Earns a month, each to the dollar), the crossing month 106 (≈ $100.91; month 105 ≈ $99.58), "
                "the amount cancelling ($50 to $5,000), 9.94 ('almost 10 times'), 72 ÷ 8 = 9, 104.32 months ≈ 8.7 years, the 7% and 10% years (11 and 8), and the S&P 500's ≈ 10% / ≈ 7%; "
                "COPY_RULES keep every rung's figures beside their own year, every rounded figure 'about' or '≈', 'earns' defined as growth that stays in the account, and the 8% called an assumption"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: compound interest 137,873 / 50.6 (−17.3%); crossover point 20,589 (+233.5%); rule of 72 7,756 (+86.9%); invest 100 a month 7,909; "
                   "9 titles scored: pick 93, write-up title 92; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. Re-queried after the build: the pick's title score 93. Re-queried at the adversarial check: the pick's title score 93; 'crossover point' 20,589 / 33.1 (+233.5%, baseline 6,173); the related video XVUeMcTg9OQ 1,141 views and 6 comments, live since Sun 4 Oct 05:49 ET. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 09a maths table: W(n) = 100 × ((1 + r)^n − 1) ÷ r at r = 8% ÷ 12; "
    "year 1 ≈ $1,245 / ≈ $8; 5 ≈ $7,348 / ≈ $49; 8 ≈ $13,387 / ≈ $89; 9 ≈ $15,743 / ≈ $105; 15 ≈ $34,604 / ≈ $231; 20 ≈ $58,902 / ≈ $393; 25 ≈ $95,103 / ≈ $634; 30 ≈ $149,036 / ≈ $994 (9.94 × $100); "
    "month 106 grows ≈ $100.91 (year 9); 72 ÷ 8 = 9; 104.32 months ≈ 8.7 years; at 7% year 11, at 10% year 8. The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 9 titles scored against this channel: the pick 93, the write-up's title 92. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 93, as first scored.",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 93; 'crossover point' 20,589 / 33.1 (+233.5%, baseline 6,173); the related video XVUeMcTg9OQ 1,141 views and 6 comments, live since Sun 4 Oct 05:49 ET. All match.",
    "- **Changed.**",
    "  - The Related video note called XVUeMcTg9OQ 'the channel's other compounding Short'; section 4 counts '10 years late' as one too. It now says the compounding-frequency Short.",
    "  - Section 4 called '10 years late' the weakest of the month 'on both'; by Reel plays 'Speed limit (e)' is lower (177 vs 219). It now says what holds: the weakest YouTube views and the month's highest Reel skip rate (65.1%).",
    "  - `#investingforbeginners` was 'tagged by the same-idea $100 a month Shorts in section 2', which the research does not show (no tags were pulled for them). It now cites what vidIQ does show: the channel's own start-age Short `EqFQCJheCMU` carries the tag.",
    "  - A title bullet said every version keeping the header's question scores 90-93; the 3-hashtag version keeps it and scores 82. It now says 'hashtag-free'.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 09a maths table and a fresh run of the 09 check (509 checks, 0 failures, exit 0), by hand and by the builder's FIGURES, MATH_RELATIONS and COPY_RULES.",
    "  - Platform limits, recounted from the JSON: title 88/100 with no hashtags (the description's first three show above it), description 1,406 characters (1,450 bytes) of 5,000, tags 392/500 as YouTube counts them, caption 1,130/2,200 with 5 hashtags and a result-free first 125, short alt text 100/100, no < or >.",
    "  - Policy: no brand in the video; the S&P 500 is named only for the rate's context, with 'Not affiliated with or endorsed by S&P Dow Jones Indices.' in the description and the caption; sources are named descriptively, as 06b and 06c name theirs; no share price; 'Not financial advice.' in both; no advice, urgency or promise wording (a copy rule). 'Earns' is defined as growth that stays in the account, not a payout, in the description, the caption and the pinned comment's context, and nothing calls it income (a copy rule).",
    "  - The title asks the header's question and the video answers it (year 9); the description's first line gives the answer for the search snippet, as the house template does.",
    "  - The cover JPG (read by eye) shows the header's question, the working line '$1,245 × 8% ÷ 12 ≈ $8/mo', rung 1 at ≈ $8 with its gauge well short of $100 and seven dim rungs: no answer. The render's sha256 equals `git show 471c793:renders/channel/09a-becker-rig-100-a-month-doubles.mp4`, so the Trial Reels command fetches this file.",
    "  - No timestamp outside the cover section and the video facts, and no pacing claim.",
    "- **Generator.** Unchanged. The 09 check prints '509 checks, 0 failures', and the builder reads only 'N checks, F failed', so `MATH_SCRIPT` is "
    "`publishing/data/checks/09-growth-ladder.py`, a copy of the 07 adapter: it runs the 09 check unchanged, passes its output and exit code through and adds the summary line.",
    "- **Mutation test.** Six mutations of a scratch copy each fail by name: year 8 given year 9's ≈ $105, year 30's ≈ $994 without its '≈', a title that says year 9, "
    "the caption without 'not a payout', a spelled-out 'ten', and year 20's worth a dollar off. At the adversarial check, 3 more on a scratch copy also fail by name: the caption without its affiliation line, the S&P 500 figures without 'since 1928', and 'Year 9' in the caption's first 125 characters. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - The cover is the question frame (≈ $8 against $100), not the crossing the write-up also offers: the crossing shows rung 9 beating $100, the title's answer.",
    "  - 'Earns' is defined in the description, the caption and the pinned note; 'passive income' stays out of the tags, because the growth is not paid out.",
    "  - `#ruleof72` above the title: it names the shortcut, not the year; working out 9 needs the footer's 8% and 72 ÷ 8, which only the pinned comment does.",
    "  - The S&P 500 is named only for the 8%'s context, with the affiliation line; the write-up's [click-check] on its two sources stands.",
    "  - Section 2 keeps vidIQ's spelling of two names that contain a '|' (the channel 'Erin Talks Money | Erin Moriarity' and the title '… | The Investing Crossover Point'). The builder does not escape '|' in table cells, so those two rows show one cell too many in rendered Markdown (the views and the date shift right); the JSON is exact. The same generator issue the 07a check flagged; left for its one-line generator fix.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The question frame was re-picked by content (frame 18, 0.60 s; was frame 54): the gauge filled, the figure's chin pose and the first caption, no answer. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`; the check prints '536 checks, 0 failures'), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names (the eight rungs and their figures, the year-9 crossing and the ≈ $994 plate) is in the shipped cut, so no copy changed. "
    "The adversarial pass's note that the render's sha256 equals `git show 471c793:…` is about the pre-condense render; the Trial Reels command now names `c4a3014`.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 09a maths table (teasers/v2/09-growth-ladder.md, section 09a) and
# recomputed below from its inputs ($100 a month, 8% a year compounded monthly); the S&P 500 figures and dates are
# inputs, quoted from the write-up's Sources.
FIGURES = {
    "$100", "100", "$1,245", "$8", "$7,348", "$49", "$13,387", "$89", "$15,743", "$105", "$34,604", "$231", "$58,902", "$393",
    "$95,103", "$634", "$149,036", "$994", "$100.91", "$50", "$500", "1", "5", "8", "9", "15", "20", "25", "30", "12", "106",
    "10", "7", "11", "72", "2", "8.7", "1928", "10.09", "6.81", "9.94", "2024", "2026",
    "500",   # the index's name, "S&P 500"
}
import math as _m
_r = 0.08 / 12
_W = lambda n, d=100.0, r=_r: d * ((1 + r) ** n - 1) / r
_ROWS = {1: (1245, 8), 5: (7348, 49), 8: (13387, 89), 9: (15743, 105), 15: (34604, 231), 20: (58902, 393), 25: (95103, 634), 30: (149036, 994)}


def _cross(d=100.0, r=_r):
    """the first month whose growth, W(k − 1) × r, is at least the deposit"""
    k = 1
    while _W(k - 1, d, r) * r < d:
        k += 1
    return k


MATH_RELATIONS = [
    (all((round(_W(12 * y)), round(_W(12 * y) * _r)) == v for y, v in _ROWS.items()), "every rung: Worth and Earns a month (= Worth × 8% ÷ 12), each to the dollar"),
    (all(round(v[0] * _r) == v[1] for v in _ROWS.values()), "the shown Worth × 8% ÷ 12 rounds to the shown Earns (the working line)"),
    (round(_W(12) * _r, 2) == 8.30 and round(_W(11) * _r, 2) == 7.58 and round(_W(12) - 1200, 2) / 12 < 3.76, "'by year 1 it's earning about $8': month 13 grows $8.30 (month 12 $7.58; year-1 average $3.75)"),
    (_cross() == 106 and round(_W(105) * _r, 2) == 100.91 and round(_W(104) * _r, 2) == 99.58, "the crossing: month 106 grows ≈ $100.91 (month 105 ≈ $99.58)"),
    (_m.ceil(_cross() / 12) == 9 and round(_W(96) * _r) < 100 < round(_W(108) * _r), "month 106 is in year 9; year 8 earns under $100, year 9 over"),
    (all(_cross(d) == 106 for d in (50.0, 500.0, 1000.0, 5000.0)), "the amount cancels: month 106 for $50, $500, $1,000 and $5,000 a month"),
    (9.9 <= _W(360) * _r / 100 < 10, "year 30: ≈ $994 = 9.94 × $100, 'almost 10 times'"),
    (72 / 8 == 9 and round(_m.log(2) / _m.log(1 + _r), 2) == 104.32 and round(_m.log(2) / _m.log(1 + _r) / 12, 1) == 8.7, "72 ÷ 8 = 9; (1 + 8%/12)^n = 2 at 104.32 months ≈ 8.7 years"),
    ((_m.ceil(_cross(100.0, 0.07 / 12) / 12), _m.ceil(_cross(100.0, 0.10 / 12) / 12)) == (11, 8), "pinned: at 7% year 11, at 10% year 8"),
    (round(10.09) == round(9.94) == 10 and round(6.81) == 7, "the S&P 500 since 1928: 10.09% and 9.94% ≈ 10% before inflation, 6.81% ≈ 7% after"),
]
MATH_KEY_LINES = ["Y9 $10,800→≈ $15,743 (earns ≈ $105/mo)", "Y30 $36,000→≈ $149,036 (earns ≈ $994/mo)", "(first month ≥ $100: 106, year 9)",
                  "claim: pinned: same crossing at 7% → year 1"]
RESULT_RE_TITLE = r"\b9\b|105|100\.91|994|149,036|15,743|8\.7|72"
RESULT_RE_CAPTION = r"\b9\b|105|100\.9|994|149,0|15,74|8\.7|72|13,38|\b89\b|[Nn]ot yet|crossover|beats"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right year.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_YR = _re.compile(r"\b[Yy]ear (\d+)\b")
_FIG = lambda f: _re.compile(_re.escape(f) + r"(?!\d|,\d|\.\d)")
_RUNG = {f"${w:,}": y for y, (w, e) in _ROWS.items()} | {f"${e}": y for y, (w, e) in _ROWS.items()} | {"$100.91": 9}


def _own_year(fig, year):
    """every occurrence of fig has year as the nearest 'year N' before it on its line"""
    for ln in _lines():
        for m in _FIG(fig).finditer(ln):
            ys = [int(y.group(1)) for y in _YR.finditer(ln[:m.start()])]
            if not ys or ys[-1] != year:
                return False
    return True


def _before(fig, ok):
    """every occurrence of fig is preceded (within 10 characters) by a match of ok"""
    return all(_re.search(ok + r"$", v[max(0, m.start() - 10):m.start()]) for v in _COPY.values() for m in _FIG(fig).finditer(v))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_own_year(f, y) for f, y in _RUNG.items()), "every rung's Worth and Earns (and ≈ $100.91) sit after their own year"),
    (all(_before(f, r"(?:≈|about) ") for f in _RUNG) and _before("8.7", r"≈ "), "every rounded figure (each rung, ≈ $100.91, ≈ 8.7 years) comes with '≈' or 'about'"),
    (all(_re.search(r"not a payout", _COPY[k]) for k in ("description", "caption")), "the description and the caption say 'earns' is growth that stays in the account, not a payout"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("assumed 8%", "not a forecast", "since 1928", "Not financial advice.", "Not affiliated with or endorsed by S&P Dow Jones Indices.")),
     "the description and the caption call 8% an assumption, not a forecast, give the S&P 500 context with its dates, and carry 'Not financial advice.' and the affiliation line"),
    (all(_re.search(r"(?:≈|about) 10% a year since 1928 before inflation, (?:≈|about) 7% after", _COPY[k]) for k in ("description", "caption")),
     "the S&P 500's ≈ 10% / ≈ 7% always come with 'since 1928' and 'before / after inflation'"),
    (all("8%" in _COPY[k] for k in ("short alt text", "long alt text")), "the alt texts carry the 8%"),
    (not _re.search(r"(?i)passive income|payout(?! )|pays you|paid to you", _ALL.replace("not a payout", "")), "nothing calls the growth income or a payout"),
    (not _NUMBER_WORDS.search(_ALL), "no spelled-out figures"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bstart now\b|\bstart today\b|\bguarantee", _ALL), "no advice or promise wording"),
]
