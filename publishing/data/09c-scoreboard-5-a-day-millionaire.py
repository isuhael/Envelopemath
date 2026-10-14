# 09c publishing data: take what you could invest a day; year 40 = that × ? (Scoreboard, growth-ladder).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 07a-scoreboard-start-at-25.py (the nearest
# Scoreboard sheet: the same compounding topic and look), laid out like 09a.
#
# Facts come only from teasers/v2/09-growth-ladder.md (section 09c, "Decisions shared by all three" and the Sources
# under 09a that 09c cites) and python3 teasers/v2/checks/09-growth-ladder.py. Research: vidIQ, pulled 2026-10-13.
# The video is the condensed cut, promoted and shipped on 2026-10-13 (timing only; numbers, caption facts and the
# verdict stay; the pre-condense render is in git, 471c793 and c4a3014). This sheet names no timestamp except the cover,
# which is picked by content (the question frame), so the ship re-ran the build with --covers on the shipped file.

TEASER = "09c Scoreboard, growth-ladder: \"Take what you could invest a day. Year 40 = that × ?\""
PREPARED = "2026-10-13"
SHORT_ID = "09c"
MD_TITLE = "09c publishing sheet: take what you could invest a day, year 40 = that × ?"
MATH_RUN = "509 checks, 0 failed"      # python3 teasers/v2/checks/09-growth-ladder.py on studio/specs/ (via publishing/data/checks/09-growth-ladder.py), 2026-10-13
MATH_SCRIPT = "publishing/data/checks/09-growth-ladder.py"   # runs the 09 check unchanged, adds the builder's summary form
MATH_RUN_SHIP = "536 checks, 0 failed"  # the same check on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
RENDER_COMMIT = "c4a3014"              # the last commit that holds the pre-condense render (with the v2.4 soundtrack)
RENDER_SHA_PRE = "20c57655f4c5615a845ec7b60381548783ca85ea622096681b4f6915b1d68659"   # at 471c793 (v2.2 soundtrack): cd58e2ea…

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    f"promoted and shipped on 2026-10-13. It replaces the 34.0 s pre-condense cut (the assembly fix pass, 2026-10-08; the owner: \"too many still moments\"), which is in git (`{RENDER_COMMIT}`). "
    "The condense moved the clock; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content (the question frame) on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/09-growth-ladder.md` (09c) and its check, "
    f"`python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/09-growth-ladder.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every row from $1 × 365 ÷ 12 a month at an effective 7% a year, "
    "the × 75,176 multiplier, the $5 and $10 lines, the ≈ $13.30 a day and the 7% ÷ 12 variant, keeps every row's figures beside their own year and every rounded figure 'about' or '≈'.",
    "- **Honesty rules kept.** The title asks what $1 a day becomes and never says, and neither does the cover (the question frame: the blank '× ?' over year 1's ≈ $377). "
    "The Instagram caption keeps every result below 'more'. The copy says the 7% is an assumption, not a forecast, and which 7% it is (each dollar grows 7% a year), gives the other "
    "calculator convention (7% ÷ 12 a month → ≈ 79,838), and reads the rows as rough today's dollars only if the daily amount rises with prices, as the write-up's caption does. "
    "The $5-a-day meme is busted, not promised: $5 a day is ≈ $375,880, and a million takes ≈ $13.30 a day. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** No company or product is in the video. The copy names the S&P 500 only to explain the 7% (the write-up's caption line); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' No share price is named.",
    "- **[click-check].** The S&P 500 figures behind '≈ 7% after inflation, ≈ 10% before' (Official Data Foundation 6.81% / 10.09%, a live figure read 2026-10-07) come from search results; "
    "the write-up marks the page for a hand check before posting (the proxy blocked fetching it). Nothing here changes that.",
    "- **Overlap.** Two other Shorts start from a daily amount: 02a ('\"It's Just $3 a Day.\" What It Really Costs You by 65 — Find Your Age'), $3 a day at 7% by age, not yet posted, "
    "and 06c, a $4 latte a day into one stock, live. This one answers for any daily amount with one multiplier and busts the $5 meme, so it goes out on a different evening from 02a.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 34.0, "sha256": RENDER_SHA_PRE,
                    "note": f"the pre-condense cut (assembly fix pass, 2026-10-08) + card, retired; in git history ({RENDER_COMMIT}; 471c793 with the v2.2 soundtrack)"}}

FACTS = {
    "source": f"teasers/v2/09-growth-ladder.md section 09c; teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "m = $1 × 365 ÷ 12 = $30.4167 deposited at each month-end at an effective 7% a year (monthly rate (1.07)^(1/12) − 1 = 0.5654%, so each dollar grows exactly 7% a year); no fees or taxes; not a forecast",
    "rows": "Year 1 $365 in / ≈ $377; 5 $1,825 / ≈ $2,166; 10 $3,650 / ≈ $5,203; 20 $7,300 / ≈ $15,438; 30 $10,950 / ≈ $35,571; 40 $14,600 / ≈ $75,176",
    "multiplier": "W(480) for $1 a day = 75,176.07: year 40 ≈ your daily amount × 75,176 (W is linear in the deposit)",
    "five_a_day": "5 × 75,176.07 = 375,880.35 ≈ $375,880 at year 40: still not a million",
    "ten_a_day": "10 × 75,176.07 = 751,760.69 ≈ $751,761 (pinned)",
    "million": "1,000,000 ÷ 75,176.07 = 13.302 ≈ $13.30 a day ($13.30 a day reaches $999,842; $13.31 reaches $1,000,593)",
    "other_convention": "at 7% ÷ 12 a month (≈ 7.2% a year effective) the multiplier is 79,838.07 ≈ 79,838",
    "sp500": "≈ 7% a year after inflation since 1928, ≈ 10% before (Official Data Foundation 6.81% / 10.09%, live figure read 2026-10-07) [click-check]; rough today's dollars only if the daily amount rises with prices",
    "verdict": "A MILLION BY YEAR 40: ≈ $13.30 A DAY (hero beat: × 75,176, tagged YEAR 40 ≈ DAILY AMOUNT)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What Is $1 a Day Worth After 40 Years of Investing? Now Multiply by Your Own Daily Amount"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score of the 7 scored. The board's own question ($1 a day, year 40) is the first 51 characters, and the second sentence is the header's job for the viewer "
             "('take what you could invest a day … × ?'), without the multiplier. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "If You Invested Every Day for 40 Years, What Would You Multiply Your Daily Amount By?", "vidiq_score": 97,
     "note": "The header's blank as one question, one point lower; it doesn't name the $1 board."},
    {"rank": 3, "title": "What Is $1 a Day Worth After 40 Years of Investing? Multiply by Yours", "vidiq_score": 96,
     "note": "The pick, 20 characters shorter; the fallback if the pick reads long in the player."},
]
YT_TITLES_ALSO_SCORED = [
    ("Does $5 a Day Really Make You a Millionaire in 40 Years?", 94, "the meme the verdict busts; not used, because the write-up's hook passes moved every 09 hook off 'millionaire' and the header asks '× ?'"),
    ("Invest What You Can Every Day for 40 Years. Your Daily Amount × What?", 90, ""),
    ("Invest $1 a Day for 40 Years. What's It Worth? Now Multiply by What You Could Invest", 90, ""),
    ("Take What You Could Invest a Day. Year 40 = That × What?", 87, "the write-up's title"),
]
TITLE_BULLETS = [
    "It asks and names no result: not ≈ $75,176, not × 75,176, not ≈ $13.30 a day. '$1 a day' and '40 years' are the inputs, on screen at frame 1 (the input strip and the header's YEAR 40).",
    "It raises the write-up's title from 87 to 98. The header's symbols ('= That × What?') score lowest; the same job in words scores highest. "
    "vidIQ's model ranks titles but does not predict views.",
    "'Does $5 a Day Really Make You a Millionaire in 40 Years?' scores 94 and rides the biggest search phrase ('your life if you invested $5 a day', 43,958). It is left out on purpose: "
    "the write-up's judges found millionaire hooks the benchmark's weakest, and the video answers it only in the verdict. The $5 example lives in the description and the caption.",
]

YT_DESCRIPTION = """What is $1 a day worth after 40 years of investing? At an assumed 7% a year, year 40 comes to about $75,176: your daily amount × 75,176. A million by year 40 takes about $13.30 a day, not $5.

The math, shown ($1 a day = $1 × 365 ÷ 12 ≈ $30.42 a month, put in at each month-end):
• Year 1: $365 in, ≈ $377.
• Year 10: $3,650 in, ≈ $5,203.
• Year 20: $7,300 in, ≈ $15,438.
• Year 30: $10,950 in, ≈ $35,571.
• Year 40: $14,600 in, ≈ $75,176.
• Every row scales with the amount, so year 40 ≈ your daily amount × 75,176.
• $5 a day: ≈ $375,880, not the million the meme promises. $10 a day: ≈ $751,761.
• A million by year 40: $1,000,000 ÷ 75,176 ≈ $13.30 a day.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $1 × 365 ÷ 12 deposited at each month-end at an assumed 7% a year, effective: each dollar grows 7% a year. If your calculator uses 7% ÷ 12 a month (about 7.2% a year), the multiplier is about 79,838. 7% is an assumption, not a forecast: the S&P 500 has returned about 7% a year after inflation since 1928, about 10% before (Official Data Foundation: 6.81% and 10.09%, read Oct 2026), so read these as rough today's dollars if your daily amount rises with prices. No fees or taxes. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#compoundinterest #investing #personalfinance"""
DESC_NOTE = ("The opening line is the title's question with the answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08b: the verdict is a plain reading of an assumed rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#compoundinterest", "#investing", "#personalfinance"]
YT_HASHTAG_NOTES = [
    ("#compoundinterest", "the mechanism, and the biggest on-topic phrase ('compound interest' 137,873 searches a month, competition 50.6; −17.3% on its 30-day baseline)."),
    ("#investing", "the broad category and the write-up's first caption tag ('investing' 613,566 a month, flat at −2.0%)."),
    ("#personalfinance", "the channel's layer ('personal finance' 1,436,792 a month), as on 07a and 02a."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["your life if you invested $5 a day", "your life if you invested 5 dollars a day", "what happens if you invested $10 a day", "invest 5 dollar a day",
           "pov you invested just $5 a day", "how much to invest to become a millionaire", "compound interest", "compound interest explained",
           "how compound interest works", "investing for beginners", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. The '$5 a day' phrases are the meme the verdict busts ('your life if you invested $5 a day' 43,958 a month), "
             "'what happens if you invested $10 a day' (5,384, competition 23.9) is the pinned comment's $10, and 'how much to invest to become a millionaire' (3,517) is the verdict's own question. "
             "Left out on purpose: 'how to become a millionaire' (121,786) and 'how to get rich', which are how-to intent the Short doesn't serve; the 'dollar a day' phrases, which are all about earning one online.")

YT_PINNED = """$10 a day? ≈ $751,761 by year 40. Reply with yours.

The rule: year 40 ≈ your daily amount × 75,176, at an assumed 7% a year, put in monthly. A million by year 40 takes ≈ $13.30 a day."""
PINNED_NOTE = ("The write-up's pinned comment ('$10 a day? ≈ $751,761. Reply with yours.'), with its year added, then the rule for working out the viewer's own number, as the write-up wants "
               "('the comments should be viewers' own multiplications'). The caption answers the comment fight it expects ('S&P does 10%!') with the after-inflation framing and the other convention.")

RELATED_VIDEO = {
    "pick": {"id": "fbpdKf4Wy8c", "title": "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? #Starbucks #LatteFactor #stocks",
             "url": "https://www.youtube.com/shorts/fbpdKf4Wy8c",
             "why": "The channel's live daily-amount Short (a $4 latte a day into one stock), live since Mon 12 Oct 2026 (760 views by 13 Oct). This one is the same habit's maths at a stated rate, for any daily amount."},
    "swap_when_live": "09a ($100 a month) or 09b ($1,000 at birth), the same growth-ladder series, once published. Then point that Short's Related video at this one.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the question frame (the cover below): the header with its boxed '× ?', the hero at ≈ $377 tagged YEAR 1 / $1 A DAY, the input strip and row 1 over five dark slots."
THUMB_MD = ("in the YouTube app, pick the question frame, the same content as the Instagram cover below: 'TAKE WHAT YOU COULD INVEST A DAY. / YEAR 40 = THAT × ?' with the green boxed blank, "
            "the hero at ≈ $377 tagged 'YEAR 1 / $1 A DAY', the footer working '$1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast', the strip '$1 A DAY · 7% A YEAR' and row 1 lit over five dark slots. "
            "It asks without answering, like the title beside it in search.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening, 21:30-22:30 ET (01:30-02:30 UTC the next day); the condensed cut shipped on 2026-10-13. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, on a different evening from 09a and 09b, and away from 02a (the other daily-amount compounding Short). Suggested order within the series: 09a, then 09b, then 09c.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "The topic is evergreen ('your life if you invested $5 a day' −1.8% on its baseline), so no date matters more than the slot; 09c goes last of the three: its hook scored 6.75 with the write-up's judges, level with 09b and under 09a (7.0), and both judges flagged '× 75,176' as a long number to remember.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "Take what you could invest a day. What does it become after 40 years of investing? Multiply by your own number."

IG_CAPTION = IG_HOOK + """

The board is $1 a day (≈ $30.42 a month), put in at each month-end at an assumed 7% a year. Every row scales with the amount, so year 40 ≈ your daily amount × 75,176.

The math, shown:
• Year 1: ≈ $377 ($365 in).
• Year 10: ≈ $5,203 ($3,650 in).
• Year 20: ≈ $15,438 ($7,300 in).
• Year 30: ≈ $35,571 ($10,950 in).
• Year 40: ≈ $75,176 ($14,600 in).

$5 a day ≈ $375,880: not the million the meme promises. $10 a day ≈ $751,761. A million in 40 years takes ≈ $13.30 a day.

Why 7%? The S&P 500 has returned ≈ 7% a year after inflation since 1928 (≈ 10% before), so read these as rough today's dollars if your daily amount rises with prices. "7% a year" here means each dollar grows 7% a year; if your calculator uses 7% ÷ 12 a month (≈ 7.2% a year), the multiplier is ≈ 79,838. 7% is an assumption, not a forecast. No fees or taxes. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

What's your daily number?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#compoundinterest #investing #personalfinance #moneymath #investingforbeginners"""
IG_CAPTION_RULE = ("The first 125 characters are the header's job for the viewer in words, '40 years of investing', and the write-up's caption line 1 ('Multiply by your own number.'), "
                   "no result: the caption overlays the Reel from frame 1, so the multiplier and every figure sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question without its symbols, plus the write-up's numberless line 1. The multiplier, the rows and the million line sit below 'more', "
    "where Instagram search and Google indexing still read them.",
    "The rate paragraph is the write-up's: which 7% this is (each dollar grows 7% a year), the other calculator convention, and the after-inflation reading.",
    "The caption follows the house close: the write-up's 'reply with yours' as a question, then the follow line plus the credit.",
]

IG_HASHTAGS = ["#compoundinterest", "#investing", "#personalfinance", "#moneymath", "#investingforbeginners"]
IG_HASHTAG_MD = [
    "The write-up tags `#investing #compoundinterest #moneymath #mathtok`:",
    "",
    "- `#compoundinterest`, `#investing` and `#moneymath` stay; `#personalfinance` is the same third tag as YouTube.",
    "- `#investingforbeginners` replaces `#mathtok` (a TikTok tag), as on 07a and 02a: 'investing for beginners' is 295,600 searches a month on YouTube, and the channel's own start-age Short (`EqFQCJheCMU`) carries it as a tag.",
]

IG_ALT_SHORT = "Chart: $1 a day at 7% a year; year 40, about $75,176. So year 40 is your daily amount times 75,176."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about' and 'times', not '≈' and '×', "
                     "so screen readers read it cleanly, and it keeps the 7% beside the result.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' and 'times' instead of '≈' and '×' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header reads: take what you could invest a day; year 40 equals that times a blank. A strip says $1 a day, 7% a year, "
               "and the footer works it out: $1 times 365 divided by 12 is about $30.42 a month, not a forecast. A board fills year by year while a big counter tagged with the year counts up: "
               "year 1, $365 in, about $377; year 5, $1,825 in, about $2,166; year 10, $3,650 in, about $5,203; year 20, $7,300 in, about $15,438; "
               "year 30, $10,950 in, about $35,571; year 40, $14,600 in, about $75,176. "
               "Then the counter becomes times 75,176, tagged: year 40, about, daily amount. "
               "Verdict: a million by year 40 takes about $13.30 a day.")

IG_FIRST_COMMENT = ("Year 40 on $1 a day: ≈ $75,176, so year 40 ≈ your daily amount × 75,176. $5 a day ≈ $375,880. "
                    "A million by year 40 takes ≈ $13.30 a day. What's your daily number?")

# ---------------------------------------------------------------- the cover frame
# The question frame, picked by content: the write-up's Instagram note offers frame 1 (the "× ?" header, the tagged
# odometer and the board) or the "× 75,176" beat; the beat shows the answer, so this sheet uses the question. On the
# shipped condensed cut row 1 has landed at frame 0; its bump and glow settle by about frame 11 (0.37 s), and the frame
# holds still until the row 5 cut at frame 15 (0.50 s). Frame 12 (0.40 s) is used. (On the pre-condense render: 75.)
COVER_T = 0.4
COVER_FRAME = 12
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The question frame, settled: the header 'TAKE WHAT YOU COULD INVEST A DAY. / YEAR 40 = THAT × ?' ('A DAY' in green, the '?' a green boxed blank), "
                          "the hero odometer at ≈ $377 tagged 'YEAR 1 / $1 A DAY', the footer working '$1 × 365 ÷ 12 ≈ $30.42/mo · not a forecast', the input strip '$1 A DAY · 7% A YEAR', "
                          "the heads Year / You put in / Worth, row 1 lit (1 · $365 · ≈ $377) over five dark slots, and the caption 'Year 1: about $377.' "
                          "(on the shipped cut its last word, '$377.', lights at about 1.0 s, after the row 5 cut, so the cover shows it still grey). "
                          "It asks and does not answer: the multiplier is still a blank. On any cut, use the last settled frame on row 1, after its glow fades, before the row 5 cut.")
COVER_FRAME_MEASURED = (f"On the shipped {VIDEO_S:g} s condensed cut row 1 has landed at frame 0; its bump and glow settle over frames 1-11 (frame-to-frame mean luma change 0.92 at frame 2, 0.02 at frame 11, on 270×480 greyscale), "
                        "frames 12-14 hold still (0.005-0.011), and the row 5 cut comes at frame 15 (0.50 s). Frame 12 (0.40 s) is used. "
                        "On the 34.0 s pre-condense render the hold ran from about frame 13 to the row 5 cut at frame 90 (3.0 s), and frame 75 (2.50 s), with the caption fully lit, was used.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1417 (the caption), so the crop centres it (81 px above, 83 below): "
                   "badge, header, hero and tag, footer, input strip, the whole board and the caption; it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the question frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the hero beat ('× 75,176' under the header's blank, tagged YEAR 40 ≈ DAILY AMOUNT), the write-up's other cover option. It fills the blank: the answer to the title.",
    "**Not used:** the verdict hold ('A MILLION BY YEAR 40: / ≈ $13.30 A DAY').",
    "**Shipped cut (2026-10-13):** the question frame was re-picked by content on the shipped file (frame 12, 0.40 s; was frame 75) and both JPGs re-exported, with the same crop. "
    "The picture is the same except the caption's last word, '$377.', which is still grey (it lights after the row 5 cut in this cut; the hero and row 1 show ≈ $377). The copy did not change.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The pre-condense render is in git: `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 09c-34.0s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…; at 471c793 it carries the v2.2 soundtrack, cd58e2ea…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Your daily amount × ? — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 09a and 09b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("compound interest", 137873, 76.7, 50.6, 65.8, "the mechanism; −17.3% vs its 30-day baseline (166,772)", "2026-10-12"),
    ("how to become a millionaire", 121786, 75.9, 53.5, 64.1, "−1.1%; US 22,452; how-to intent, not in the copy", "2026-10-12"),
    ("your life if you invested $5 a day", 43958, 69.3, 56.5, 59.0, "−1.8% vs its baseline (44,753): the meme the verdict busts", "2026-10-12"),
    ("your life if you invested 5 dollars a day", 5410, 55.7, 31.2, 61.0, "", "2026-08-16"),
    ("what happens if you invested $10 a day", 5384, 55.7, 23.9, 63.9, "the pinned comment's $10", "2026-08-24"),
    ("invest 5 dollar a day", 5320, 55.6, 24.9, 63.4, "", "2026-07-22"),
    ("pov your life if you invested $10 a day", 5314, 55.6, 38.0, 58.2, "", "2026-08-28"),
    ("pov: you invested just $5 a day", 4849, 55.0, 13.0, 67.8, "the lowest competition here", "2026-10-10"),
    ("how much to invest to become a millionaire", 3517, 52.9, 41.5, 55.2, "the verdict's own question", "2026-03-22"),
    ("make 1 dollar a day online", 8568, 58.7, 31.7, 62.5, "the top 'dollar a day' phrase: earning, not investing; not used", "2026-06-10"),
]
KEYWORD_MD_NOTE = {"make 1 dollar a day online": "earning, not investing; not used"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'how to become a millionaire' with US volumes and 'how much to invest to become a millionaire'; matching_terms for "
                   "'invested a day' and 'dollar a day'), pulled 2026-10-13, plus 'compound interest' from the 09a pull. vidIQ refreshes each keyword on its own schedule, so each row carries its "
                   "snapshot date in metrics_as_of; six rows are older snapshots (2026-03-22 to 2026-10-10).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Six rows are older snapshots.")
KW_OUTRO = ("The daily-amount idea is searched as the $5 meme ('your life if you invested $5 a day' 43,958, and a dozen long-tail versions at about 5,000 each, several at low competition: "
            "'pov: you invested just $5 a day' 13.0). That is the belief the verdict busts, so it rides in the description, the caption and the tags, not the title. "
            "'how to become a millionaire' (121,786) is how-to intent; the Short answers only 'how much a day for a million at 7% in 40 years' (≈ $13.30), which is in the copy and the tags.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Invest just $5 per day in SCHD for Financial Freedom", "Investing Simplified - Professor G", 475000, 459944, "2023-06-24", "the biggest $5-a-day Short found; a dividend fund, not a stated rate"),
    ("How $5 a Day Can Make You a Millionaire", "True Worth Investing", 23500, 1449, "2025-05-13", "at 10%: ≈ $948,000 in 40 years, per its description"),
    ("Skip Coffee, Become a Millionaire: The $5 Daily Investment That Changes Everything", "Compounded Daily", 64, 1394, "2026-05-01", "'$5 coffee = $1M in 40 years', per its description"),
    ("How $5/Day Makes You $500,000", "CashCapy", 106, 1271, "2026-06-16", "'$531,000+' in 40 years, per its description"),
    ("$5 a Day = Millionaire?! 💰 #shorts #personalfinance #compoundinterest", "Explaining stuff using animation", 19, 1184, "2026-08-28"),
    ("$5 a Day Could Make You a Millionaire (Coffee Money) #shorts", "Money Decoded", 9, 1179, "2026-07-04", "at 10%: ≈ $948,000 at 40 years, per its description"),
    ("She Said NO to $5 Coffee — Now She's a Millionaire", "RichToons Studio", 104, 1173, "2026-04-17", "'$5/day invested for 40 years at 8% = $1,000,000+', per its description"),
    ("The $1 Rule That Can Make You a Millionaire! 💵 (SHOCKING!)", "İnvestopia", 8, 520, "2025-02-06", "$1 a day at 10% → $230,000 in 40 years, per its description: the $1 unit, at another rate"),
]
SAME_IDEA_HEADING = "**2. '$5 a day makes you a millionaire' is a crowded, small meme on YouTube (vidIQ YouTube search, under 4 min, by views).**"
SAME_IDEA_MD = [
    "Since 2025, seven small channels have posted a daily-amount Short aimed at a big round number, all between 500 and 1,500 views: five put '$5 a day' (or '$5 coffee') and 'millionaire' in the title, CashCapy says '$500,000' and İnvestopia 'The $1 Rule'; their rates are 8-10% a year per their descriptions (not checked here). "
    "Most say yes in the title. None gives a multiplier for any daily amount, and none says what a million takes at 7%: this Short's '× 75,176' and '≈ $13.30 a day'. "
    "The pick asks about $1 a day instead of repeating the meme, and the description and caption bust it with the write-up's $5 line (≈ $375,880).",
    "",
    "Next door, an animated saving explainer is the biggest Short the searches returned (Zack D. Films' 'How Saving Every Month Builds Wealth', 30,892,724 views).",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min, by views): seven 2025-2026 daily-amount Shorts from small channels, five of them '$5 a day … millionaire', all 500-1,500 views, each at 8-10% (per their descriptions; not checked here). "
                  "None gives a multiplier for any daily amount or the daily price of a million at 7%.")

OUTLIERS = [
    {"handle": "@itsjoeyviola", "platform": "Instagram", "id": "DcbhwFUx5sg",
     "on_screen": "How to be financially free (in 5 steps)", "caption": "Multiply your monthly income by these 5 numbers. That's your whole budget.",
     "views": "276K (152.1x the account median of 1.8K)", "note": "the 'take your number × a constant' grammar this Short's header uses (the write-up's H84, H55, H76)"},
    {"handle": "@daily.money.matters", "platform": "Instagram", "id": "DbT14owE1IU",
     "on_screen": "How much money do you need to spend in a day to blow $10,000 in a year?", "views": "2.7M (36.9x the account median of 72.8K)",
     "note": "a daily amount against investing it, interview with text overlay"},
    {"handle": "@kliqclip", "platform": "TikTok", "id": "7679159700285312277",
     "on_screen": "OKAY. HOW", "caption": "He shows how $27.40 a day adds up to $10,000 a year and, invested over 40 years…",
     "views": "755.2K (327.4x the account median of 2.3K)", "note": "a daily amount invested for 40 years, interview clip"},
    {"handle": "@betterwavefinance", "platform": "Instagram", "id": "Db6ci6yhMMr",
     "on_screen": "How much you need to invest monthly to retire with $5 million", "views": "482.1K (116.3x the account median of 4.1K)",
     "note": "a stick-figure animation: the amount needed for a target, the verdict's direction"},
    {"handle": "@trellthetrainer", "platform": "TikTok", "id": "7667356169433861406",
     "on_screen": "HOW TO RETIRE WITH $5M", "views": "2.7M (33.4x the account median of 80.9K)", "note": "monthly amounts by starting age, talking head"},
]
OUTLIERS_HEADING = "**3. 'Your number × a constant' and 'how much a day' travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@itsjoeyviola** (Instagram), \"Multiply your monthly income by these 5 numbers\": 276K (152.1x). The P1 multiplier grammar the header uses ('take what you could invest a day … × ?').",
    "- **@daily.money.matters** (Instagram), \"How much money do you need to spend in a day to blow $10,000 in a year?\": 2.7M (36.9x). **@kliqclip** (TikTok), $27.40 a day invested over 40 years: 755.2K (327.4x). The daily amount is the hook on both.",
    "- **@betterwavefinance** (Instagram), \"How much you need to invest monthly to retire with $5 million\": 482.1K (116.3x), a stick-figure animation; **@trellthetrainer** (TikTok), \"HOW TO RETIRE WITH $5M\": 2.7M (33.4x). The amount needed for a target, the verdict's direction (≈ $13.30 a day for a million).",
    "- All of them state the question on frame 1 and leave the number for later, which the cover (the blank '× ?') and the caption's first line do too.",
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
    "The two best Reels are a big number made physical ('$1M stack vs Burj Khalifa', 27.0% skip) and a bill measured in time ('$5,000 on the minimum', 27.4%); the channel's '$1 million' Shorts "
    "also lead on YouTube (1,221 views). This Short ends on a million made daily (≈ $13.30 a day). The compounding Shorts so far have two of the month's three worst skip rates ('10 years late' 65.1%, 'Speed limit (e)' 56.9%; 'Powerball $6.98' 58.7% sits between them). "
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
    "The S&P 500 figures behind the caption's '≈ 7% / ≈ 10%' come from search results the write-up could not open (the proxy blocked the page); they are marked [click-check] there, and the live figure will drift.",
    "The same-idea Shorts' 8-10% results come from their own descriptions and are not checked here; none is in the copy.",
    "The video, the cover and the video facts are the condensed cut, shipped on 2026-10-13; the copy is cut-independent and carried over unchanged.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "How Saving Every Month Builds Wealth 😮", "channel": "Zack D. Films", "subscribers": 29100000, "views": 30892724, "published": "2026-06-06",
         "note": "an animated saving explainer; the biggest Short the 09c searches returned"},
    ],
    "titles_scored": "7 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "09c: 75 by listed cost (4 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 7 title scores and 1 re-score after the build, 5 credits each), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel Shorts list 5; Instagram owner insights and the balance cost 0); 265 for the three 09 sheets. The balance read 4,640 before the first 09 call and 4,375 "
                     "when the research ended: a 265 drop, so 15 were parallel sheets' calls. It read 4,130 after the build's re-scores: of that 245, 15 were the three 09 re-scores and 230 parallel sheets' calls. At the adversarial check: 10 by listed cost (1 title score, 1 keyword pull), plus a third of 5 shared (one lookup of the three related videos); the three 09 checks used 35 in all. The balance read 3,730 before them and 3,695 after, with no other spend in that window.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/09-growth-ladder.py; "
                "every row recomputed in MATH_RELATIONS from $1 × 365 ÷ 12 a month at an effective 7% a year ((1 + r)^12 = 1.07), the × 75,176 multiplier, $5 → ≈ $375,880, $10 → ≈ $751,761, "
                "a million → ≈ $13.30 a day (with $13.30 just short and $13.31 just over), ≈ $30.42 a month, the 7% ÷ 12 variant (≈ 79,838, ≈ 7.2% a year) and the S&P 500's ≈ 7% / ≈ 10%; "
                "COPY_RULES keep every row's figures beside their own year, every rounded figure 'about' or '≈', the $5 and $10 lines with their amounts, ≈ $13.30 with its year-40 horizon, and the 7% called an assumption"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: your life if you invested $5 a day 43,958 (−1.8%); how to become a millionaire 121,786; what happens if you invested $10 a day 5,384; "
                   "7 titles scored: pick 98, write-up title 87; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. Re-queried after the build: the pick's title score 98. Re-queried at the adversarial check: the pick's title score 98; 'your life if you invested $5 a day' 43,958 / 56.5 (−1.8%, baseline 44,753); the related video fbpdKf4Wy8c 760 views, live since Mon 12 Oct 03:45 ET. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 09c maths table: m = $1 × 365 ÷ 12 ≈ $30.42 at r = 1.07^(1/12) − 1; "
    "year 1 $365 / ≈ $377; 5 $1,825 / ≈ $2,166; 10 $3,650 / ≈ $5,203; 20 $7,300 / ≈ $15,438; 30 $10,950 / ≈ $35,571; 40 $14,600 / ≈ $75,176 (× 75,176); "
    "$5 a day ≈ $375,880; $10 a day ≈ $751,761; a million ≈ $13.30 a day; 7% ÷ 12 → ≈ 79,838 (≈ 7.2% a year). The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 7 titles scored against this channel: the pick 98, the write-up's title 87. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 98, as first scored.",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 98; 'your life if you invested $5 a day' 43,958 / 56.5 (−1.8%, baseline 44,753); the related video fbpdKf4Wy8c 760 views, live since Mon 12 Oct 03:45 ET. All match.",
    "- **Changed.**",
    "  - The pinned comment and the Instagram first comment said 'A million takes ≈ $13.30 a day' with no horizon (it holds only for year 40). Both now say 'A million by year 40 takes ≈ $13.30 a day', and the ≈ $13.30 copy rule now requires 'a million by year 40' or 'a million in 40 years' before it; the old rule passed the bare line.",
    "  - The short alt text ended on a fragment ('so your daily amount times 75,176'). It is now 'Chart: $1 a day at 7% a year; year 40, about $75,176. So year 40 is your daily amount times 75,176.' (99 characters).",
    "  - The Related video note called 06c 'its second-best YouTube start', which the research does not show; it now gives the views with their date (760 by 13 Oct). It and the intro also each called a different Short 'the channel's other daily-amount Short' (06c, 02a): 06c is now the live one and 02a the not-yet-posted $3-a-day Short, with 02a's full title.",
    "  - The posting order's reason cited 09c's length, a pacing claim the condense will change; it now cites the judges' score (6.75, level with 09b, under 09a's 7.0) and their note that '× 75,176' is a long number to remember. The Trial Reels line about length is cut for the same reason.",
    "  - `#personalfinance` was 'as on 07a, the other compounding Short of the batch' (09a and 09b are compounding Shorts too): now 'as on 07a and 02a'. `#investingforbeginners` was 'tagged by the same-idea $5 a day Shorts', which the research does not show: now the channel's own `EqFQCJheCMU` tag.",
    "  - Section 2 said 'at least seven channels have posted $5 a day makes you a millionaire'; of the seven listed since 2025, five say so, CashCapy says $500,000 and İnvestopia 'The $1 Rule'. It now says that, and so does the research note.",
    "  - Section 4 said the compounding Shorts have 'the worst skip rates'; 'Powerball $6.98' (58.7%) sits between them. It now says two of the three worst.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 09c maths table and a fresh run of the 09 check (509 checks, 0 failures, exit 0), by hand and by the builder's FIGURES, MATH_RELATIONS and COPY_RULES.",
    "  - Platform limits, recounted from the JSON: title 89/100 with no hashtags (the description's first three show above it), description 1,400 characters (1,446 bytes) of 5,000, tags 402/500 as YouTube counts them, caption 1,267/2,200 with 5 hashtags and a result-free first 125, short alt text 99/100, no < or >.",
    "  - Policy: no brand in the video; the S&P 500 is named only for the rate's context, with 'Not affiliated with or endorsed by S&P Dow Jones Indices.' in the description and the caption; sources are named descriptively, as 06b and 06c name theirs; no share price; 'Not financial advice.' in both; no advice, urgency or promise wording (a copy rule). The $5 meme is busted, not promised ('not the million the meme promises'), and no 'millionaire' is in the copy (copy rules); the tags carry the searched '$5 a day' phrases, which the description and the caption answer.",
    "  - The cover JPG (read by eye) shows the boxed '× ?' blank, the hero at ≈ $377 tagged YEAR 1 / $1 A DAY and row 1 over five dark slots: no answer. The render's sha256 equals `git show 471c793:renders/channel/09c-scoreboard-5-a-day-millionaire.mp4`.",
    "  - No timestamp outside the cover section and the video facts, and no pacing claim.",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/09-growth-ladder.py` (see the 09a sheet).",
    "- **Mutation test.** Five mutations of a scratch copy each fail by name: the $5 line moved to $10, the multiplier one off (75,177), row 20's figures under year 30, "
    "the caption without 'each dollar grows 7% a year', and ≈ $13.30 without its '≈'. At the adversarial check, 3 more on a scratch copy also fail by name: the pinned comment's million line without its horizon, the same in the first comment, and the alt text's multiplier without 'times'. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - The cover is the question frame (the blank '× ?'), not the hero beat the write-up also offers ('× 75,176' fills the blank).",
    "  - The title asks about $1 a day, the board's unit, not about '$5 a day … millionaire' (94 in vidIQ): the write-up moved every 09 hook off 'millionaire', and the header asks '× ?'.",
    "  - The spec's file name says '5-a-day-millionaire'; the copy says what the video does ($1 a day as the unit, the $5 meme as an example).",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The question frame was re-picked by content (frame 12, 0.40 s; was frame 75): the boxed '× ?', the hero at ≈ $377 and row 1 over five dark slots, no answer; "
    "the caption's '$377.' is still grey there, because it lights after the row 5 cut in this cut. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`; the check prints '536 checks, 0 failures'), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names (the six rows and their figures, the × 75,176 hero and the ≈ $13.30 verdict) is in the shipped cut, so no copy changed. "
    "The adversarial pass's note that the render's sha256 equals `git show 471c793:…` is about the pre-condense render; the Trial Reels command now names `c4a3014`.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 09c maths table (teasers/v2/09-growth-ladder.md, section 09c) and
# recomputed below from its inputs ($1 × 365 ÷ 12 a month, an effective 7% a year); the S&P 500 figures and dates are
# inputs, quoted from the write-up's Sources.
FIGURES = {
    "$1", "1", "40", "$365", "$377", "$1,825", "$2,166", "$3,650", "$5,203", "$7,300", "$15,438", "$10,950", "$35,571", "$14,600", "$75,176", "75,176",
    "5", "10", "20", "30", "$5", "$10", "$375,880", "$751,761", "$1,000,000", "$13.30", "$30.42", "365", "12", "7", "7.2", "79,838",
    "1928", "6.81", "10.09", "2026",
    "500",   # the index's name, "S&P 500"
}
_m = 365 / 12
_r = 1.07 ** (1 / 12) - 1
_W = lambda n, d=1.0, r=_r: d * _m * ((1 + r) ** n - 1) / r
_ROWS = {1: (365, 377), 5: (1825, 2166), 10: (3650, 5203), 20: (7300, 15438), 30: (10950, 35571), 40: (14600, 75176)}
_X = _W(480)
MATH_RELATIONS = [
    (abs((1 + _r) ** 12 - 1.07) < 1e-12 and round(_m, 2) == 30.42, "an effective 7% a year: (1 + r)^12 = 1.07; $1 × 365 ÷ 12 ≈ $30.42 a month"),
    (all((365 * y, round(_W(12 * y))) == v for y, v in _ROWS.items()), "every row: put in $365 × years, worth W(12 × years), to the dollar"),
    (round(_X, 2) == 75176.07 and round(_X) == 75176, "the multiplier: year 40 for $1 a day ≈ 75,176"),
    (round(_W(480, 5.0)) == 375880 and round(5 * _X) == 375880 and _W(480, 5.0) < 1e6, "$5 a day ≈ $375,880 at year 40, under a million"),
    (round(_W(480, 10.0)) == 751761, "pinned: $10 a day ≈ $751,761"),
    (round(1e6 / _X, 2) == 13.30 and _W(480, 13.30) < 1e6 <= _W(480, 13.31), "a million by year 40 ≈ $13.30 a day ($13.30 just short, $13.31 just over)"),
    (round(_W(480, 1.0, 0.07 / 12)) == 79838 and round(((1 + 0.07 / 12) ** 12 - 1) * 100, 1) == 7.2, "at 7% ÷ 12 a month (≈ 7.2% a year) the multiplier is ≈ 79,838"),
    (round(6.81) == 7 and round(10.09) == 10, "the S&P 500 since 1928: 6.81% ≈ 7% after inflation, 10.09% ≈ 10% before"),
]
MATH_KEY_LINES = ["Y40 $14,600→≈ $75,176", "(× ≈ 75,176.07; $1M ≈ ≈ $13.30 a day)", "claim: pinned: $10 a day", "claim: caption: at 7% ÷ 12 a month the mult"]
RESULT_RE_TITLE = r"75,176|13\.30|375,880|751,761|[Mm]illion|×"
RESULT_RE_CAPTION = r"75,1|13\.3|375,8|751,7|×|[Mm]illion|377|5,20|15,43|35,57|79,8"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right year.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_YR = _re.compile(r"\b[Yy]ear (\d+)\b")
_FIG = lambda f: _re.compile(_re.escape(f) + r"(?!\d|,\d|\.\d)")
_RUNG = {f"${p:,}": y for y, (p, w) in _ROWS.items()} | {f"${w:,}": y for y, (p, w) in _ROWS.items()}


def _own_year(fig, year):
    """every occurrence of fig has year as the nearest 'year N' before it on its line"""
    for ln in _lines():
        for m in _FIG(fig).finditer(ln):
            ys = [int(y.group(1)) for y in _YR.finditer(ln[:m.start()])]
            if not ys or ys[-1] != year:
                return False
    return True


def _before(fig, ok, reach=10):
    """every occurrence of fig is preceded (within reach characters) by a match of ok"""
    return all(_re.search(ok + r"$", v[max(0, m.start() - reach):m.start()]) for v in _COPY.values() for m in _FIG(fig).finditer(v))


_MULT = _re.compile(r"(?<![\d$,])75,176(?!\d)")
_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_own_year(f, y) for f, y in _RUNG.items()), "every row's put-in and worth sit after their own year"),
    (all(_before(f, r"(?:≈|about) ") for f, y in _RUNG.items() if f"${_ROWS[y][1]:,}" == f)
     and all(_before(f, r"(?:≈|about) ") for f in ("$375,880", "$751,761", "$13.30", "79,838")),
     "every rounded worth, the $5 and $10 lines, ≈ $13.30 and ≈ 79,838 come with '≈' or 'about'"),
    (all(_re.search(r"(?:× |times |÷ )$", ln[:m.start()]) and _re.search(r"≈|about", ln) for ln in _lines() for m in _MULT.finditer(ln)),
     "the bare multiplier 75,176 always follows '×', 'times' or '÷', with '≈' or 'about' on its line"),
    (all("$5 a day" in ln for ln in _lines() if "$375,880" in ln) and all("$10 a day" in ln for ln in _lines() if "$751,761" in ln),
     "≈ $375,880 always with its $5 a day, ≈ $751,761 with its $10 a day"),
    (all("a day" in ln and _re.search(r"(?i)a million (?:by year 40|in 40 years)\b.*\$13\.30", ln) for ln in _lines() if "$13.30" in ln),
     "≈ $13.30 always as 'a day' for a million, with its horizon ('a million by year 40' or 'in 40 years') before it"),
    (all("7% ÷ 12" in ln for ln in _lines() if "79,838" in ln), "≈ 79,838 always with its 7% ÷ 12 convention"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("assumed 7%", "not a forecast", "after inflation since 1928", "rough today's dollars", "each dollar grows 7% a year",
                                                                     "Not financial advice.", "Not affiliated with or endorsed by S&P Dow Jones Indices.")),
     "the description and the caption call 7% an assumption, say which 7%, give the after-inflation framing with its dates, and carry 'Not financial advice.' and the affiliation line"),
    (all("not the million" in _COPY[k] for k in ("description", "caption")), "the $5 meme is busted, not promised, in the description and the caption"),
    (all("7%" in _COPY[k] for k in ("short alt text", "long alt text")), "the alt texts carry the 7%"),
    (not _re.search(r"(?i)millionaire", _ALL), "no 'millionaire' in the copy (the tags carry the searched phrase)"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"million"}, "no spelled-out figures beyond the verdict's 'a million'"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bstart now\b|\bstart today\b|\bguarantee", _ALL), "no advice or promise wording"),
]
