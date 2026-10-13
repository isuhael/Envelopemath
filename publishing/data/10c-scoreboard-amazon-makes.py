# 10c publishing data: how long do you work for 1 second of Amazon's profit? (Scoreboard, cost-counter).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 08a-scoreboard-costco-hot-dogs.py (the nearest
# Scoreboard precedent with a brand: a pre-condense render, a verdict-frame cover, 'Not affiliated with …'), laid out like 10a.
#
# Facts come only from teasers/v2/10-cost-counter.md (section 10c) and python3 teasers/v2/checks/10-cost-counter.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense cut: the 10 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (the finished board with the verdict), so the ship step only re-runs the build with --covers on the final file.

TEASER = "10c Scoreboard, cost-counter: \"How long do you work for 1 second of Amazon's profit?\""
PREPARED = "2026-10-13"
SHORT_ID = "10c"
MD_TITLE = "10c publishing sheet: 1 second of Amazon's profit in weeks of your work"
MATH_RUN = "1005 checks, 0 failed"     # python3 teasers/v2/checks/10-cost-counter.py on studio/specs/ (via publishing/data/checks/10-cost-counter.py), 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "261e3e9f0b47f4ec20aa25057b764ed0de055ed9acc7c52c569e411322c8a929"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 10 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the finished board with the verdict), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/10-cost-counter.md` (10c) and its check, "
    f"`python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/10-cost-counter.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the profit rate and every answer from $77.7 billion and $1,251 a week, "
    "holds every figure to the write-up's one rounding (≈ $2,464 a second; ≈ 2 and ≈ 10 weeks; ≈ $12,319; ≈ 13 and ≈ 26 seconds), keeps $77.7 billion beside 2025 and named as net income, and bans 'live', a share price and any person's name.",
    "- **Honesty rules kept.** The title asks and never gives the result, and so does the YouTube thumbnail (frame 1: the $0 odometer and the ladder of profit targets, no answer on screen). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the finished board with the verdict, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, \"A year of median pay: ≈ 26 seconds.\", "
    "and the copy says its conditions: Amazon's full-year 2025 net income as Amazon reports it (profit, not sales), spread evenly over the year (an average rate), and gross median full-time pay. "
    "No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Amazon\" is used only to name the company whose reported profit the maths divides. Both platforms' copy says 'Not affiliated with or endorsed by Amazon.' "
    "The video has no Amazon logo or brand colours: the name is text in the header. No brand handle is tagged, no share price or ticker is named, and no person is named.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (Scoreboard port and fixer pass, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 10 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay); no 10 WIP spec was in studio/specs-wip/ at this build. "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/10-cost-counter.md section 10c; teasers/v2/checks/10-cost-counter.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "Amazon's 2025 net income of $77.7 billion (GAAP, its Q4 2025 results release, February 2026; the same figures in a press-release copy and an independent report), spread evenly over a 365-day year of 31,536,000 seconds",
    "rate": "$77.7B ÷ 31,536,000 = $2,463.85 a second ≈ $2,464 (to the dollar, the write-up's one rounding, because the swap-in rule divides by it)",
    "pay": "median full-time pay $1,251 a week (BLS Q2 2026); a year of it × 52 = $65,052; half a year $32,526 (6 months, exact)",
    "answers": "1 second: $2,463.85 ÷ $1,251 = 1.97 ≈ 2 weeks; 5 seconds: $12,319.25 ≈ $12,319, ÷ $1,251 = 9.85 ≈ 10 weeks; half a year ($32,526) passes at 13.20 s ≈ 13 seconds; a year ($65,052) at 26.40 s ≈ 26 seconds",
    "swap_in": "2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit (median: $2,464 ÷ $1,251 = 1.97 ≈ 2)",
    "stop": "the counter stops on exactly $65,052 (k × 26.4026 = $65,052.07), so the final carries no '≈'",
    "assumptions": "an average rate (profit is seasonal and lumpy); 'profit' = GAAP net income for the full year as Amazon reports it; the weeks are gross median pay, before tax",
    "verdict": "A year of median pay: ≈ 26 seconds.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Long Would You Have to Work for 1 Second of Amazon's Profit?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score of the 6 scored, 10 points over the write-up's title (88) with the same question: 'Would You Have to' only makes it a hypothetical. "
             "It carries 'Amazon's profit' ('amazon profit' 3,398 searches a month) and the header's own '1 second'. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "How Much Profit Does Amazon Make Every Second? How Long Do You Work for It?", "vidiq_score": 97,
     "note": "One point lower at 75 characters, and it carries the searched question ('how much money does amazon make every second?', 4,651 a month at competition 25.0). "
             "Its first question's answer (≈ $2,464) is on screen from frame 1, so it gives nothing away; the fallback if search matters more than the shorter title."},
    {"rank": 3, "title": "1 Second of Amazon's Profit: How Long Would You Have to Work for It?", "vidiq_score": 97,
     "note": "The same question with the stake first (68 characters)."},
]
YT_TITLES_ALSO_SCORED = [
    ("Amazon Makes a Profit Every Second. How Long Do You Work for 1 Second of It?", 89, ""),
    ("How Long Do You Work for 1 Second of Amazon's Profit?", 88, "the write-up's title and the on-screen header"),
    ("How Long Do You Work for 1 Second of Amazon's Profit? #Amazon #MoneyMath #Profit", 88, "the house 3-hashtag form, but not in the description's order (#Amazon #Profit #MoneyMath), so the check would refuse it as the title as written"),
]
TITLE_BULLETS = [
    "The pick is the header's question with 'Would You Have to', which raises it from 88 to 98: 'How Long' opens it, 'Amazon's Profit' closes it, and '1 Second' (the input) sits in the middle. A title cut short still asks.",
    "It names no result and not even the answer's unit: no weeks, no ≈ $2,464, no ≈ 26 seconds. The wrong answer the viewer holds ('a few minutes of my work') stays intact until the first pass.",
    "'Profit' is the word on screen and in the copy, and the copy says it is net income, not sales: the same-idea Shorts on Amazon divide its revenue instead ('Amazon makes $22,700 every second'). "
    "vidIQ's model ranks titles but does not predict views; the three question-first titles scored 97-98, the header itself 88.",
]

YT_DESCRIPTION = """How long would you have to work for 1 second of Amazon's profit? About 2 weeks, at median full-time pay. Amazon kept $77.7 billion in 2025: about $2,464 a second. A year of median pay goes by in about 26 seconds.

The math, shown:
• Amazon's 2025 net income: $77.7 billion.
• ÷ 31,536,000 seconds in a year ≈ $2,464 a second.
• Median full-time pay is $1,251 a week (BLS): $2,464 ÷ $1,251 ≈ 2 weeks of work per second.
• 5 seconds: ≈ $12,319, ≈ 10 weeks of median pay.
• Half a year of median pay, $32,526: ≈ 13 seconds.
• A year of it, $1,251 × 52 = $65,052: ≈ 26 seconds.
• Yours: 2,464 ÷ your weekly pay = your weeks per second.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Profit: Amazon's net income for full-year 2025 (GAAP, as Amazon reports it), from its Q4 2025 results (February 2026), spread evenly over a 365-day year; profit is seasonal and lumpy, so this is the year's average rate. Pay: BLS median usual weekly earnings of full-time wage and salary workers, Q2 2026 (gross, before tax). Not financial advice. Not affiliated with or endorsed by Amazon.
#Amazon #Profit #MoneyMath"""
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The credit line answers the comment fights the write-up expects before they start: 'that's before tax' (the weeks are gross median pay) and 'net income includes one-off gains' (it is the net income Amazon reports). "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08a: the counter is an average rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#Amazon", "#Profit", "#MoneyMath"]
YT_HASHTAG_NOTES = [
    ("#Amazon", "the brand ('amazon' 873,376 searches a month, +4.2% on its 30-day baseline) and the write-up's first tag."),
    ("#Profit", "the counter's subject and the write-up's tag ('amazon profit' 3,398 a month): profit, not sales, is the point."),
    ("#MoneyMath", "the write-up's tag and the format's shared third tag: 10a, 10b and 10c all carry it, so the counter series links up."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["amazon profit", "amazon profit per second", "how much money does amazon make every second", "how much does amazon make every minute",
           "how much does amazon make", "amazon net income", "amazon 2025", "amazon", "profit per second", "median pay", "weeks of work", "salary",
           "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'how much money does amazon make every second' (4,651 a month) is the video's question as people type it, at the lowest competition of the set (25.0); "
             "'how much does amazon make every minute' (5,275) is its sibling. "
             "Left out on purpose: 'amazon stock' (34,058, +69.3%), because this Short names no share price and is not about the stock; 'jeff bezos' (198,267), because the write-up names no person; "
             "and 'amazon fba', 'amazon earnings' and the seller phrases, which want how-to-sell videos.")

YT_PINNED = """How many weeks is yours? 2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2.

The $77.7 billion is Amazon's net income for 2025, as Amazon reports it, not its sales, spread evenly over the year. The weeks are median full-time pay before tax."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own number (R3): the write-up's pinned comment, with its swap-in rule and the median's answer. "
               "The second paragraph answers the comment fights the write-up expects: 'that's before tax' and 'net income includes one-off gains'. 'AWS makes all the profit' is answered only if asked, with the release's own segment figures, as the write-up says.")

RELATED_VIDEO = {
    "pick": {"id": "fbpdKf4Wy8c", "title": "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? #Starbucks #LatteFactor #stocks",
             "url": "https://www.youtube.com/shorts/fbpdKf4Wy8c",
             "why": "06c, live since Mon 12 Oct 2026 and the channel's best-performing brand Short (760 views): a household brand's money set against the viewer's own, the same move as this Short."},
    "swap_when_live": "10a (US debt interest vs your salary), the same Scoreboard counter on a salary ladder, once published; then point 10a's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame: the header, the $0 odometer, the ladder of profit targets with no answer yet, and the caption 'How long do you work for this?'. The Instagram cover is the finished board with the verdict instead."
THUMB_MD = ("in the YouTube app, pick frame 1: the header 'HOW LONG DO YOU WORK FOR / 1 SECOND OF AMAZON'S PROFIT?', the odometer on '$0', the footer 'Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52', "
            "the ladder of profit targets '≈ $2,464 · ≈ $12,319 · $32,526 · $65,052' (no answer yet) beside the empty bill tagged '≈ $2,464', the label stack '≈ $2,464 every second / AMAZON'S PROFIT SINCE YOU HIT PLAY' "
            "and the caption 'How long do you work for this?'. It asks without answering, like the title beside it in search. The Instagram cover below is the finished board with the verdict, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 10a and 10b. Suggested order within the series: 10c, then 10a, then 10b.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "10c goes first of the three: it waits on no data decision (10a waits for fiscal 2026's interest figure), it is not about the federal debt (so 10a and 10b can be spaced a week apart after it), "
           "and its question is searched as people type it ('how much money does amazon make every second?', 4,651 a month). Its figure is dated full-year 2025, so a newer Amazon report does not make it wrong.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("How long would you have to work for 1 second of Amazon's profit? The profit counter starts at $0 the moment you hit play.")

IG_CAPTION = IG_HOOK + """

1 second of Amazon's profit ≈ 2 weeks of median full-time pay.

The math, shown:
• Amazon kept $77.7 billion in 2025 (net income).
• ÷ 31,536,000 seconds in a year ≈ $2,464 a second.
• Median full-time pay is $1,251 a week (BLS): $2,464 ÷ $1,251 ≈ 2 weeks of it per second.
• 5 seconds: ≈ $12,319, ≈ 10 weeks.
• Half a year of median pay, $32,526: ≈ 13 seconds.
• A year of it, $1,251 × 52 = $65,052: ≈ 26 seconds.

Yours: 2,464 ÷ your weekly pay.

Source: Amazon's Q4 2025 results (February 2026); pay: BLS, gross. The year's average rate: profit is seasonal and lumpy. Not financial advice. Not affiliated with or endorsed by Amazon.

How many weeks is yours?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#amazon #profit #salary #moneymath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the title's question, the 'Amazon's profit' keywords and the counter's $0 start, no result: "
                   "the caption overlays the Reel from frame 1, so the rate, every answer and the verdict sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question plus the counter's $0 start, with no figure but the input (1 second); the hook is 121 characters, so it shows whole before 'more'. The write-up's caption line 1 is the hook's answer "
    "('1 second of Amazon's profit ≈ 2 weeks of median full-time pay.'); the house rule moves it to the second paragraph, below 'more', because the caption overlays the Reel from frame 1. "
    "The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The write-up's caption sentences are kept: net income, the division, the median's weeks, the year in ≈ 26 seconds, the swap-in rule and its source line. "
    "The 5-second and half-year rows are added from its maths table, so the caption carries the whole ladder.",
    "No brand handle is tagged. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#amazon", "#profit", "#salary", "#moneymath", "#personalfinance"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#amazon #moneymath #profit`), plus two:",
    "",
    "- `#amazon` names the brand and `#profit` the counter's subject; `#salary` is the unit the answers come in (weeks of pay).",
    "- `#moneymath` says what kind of video it is, as on 10a and 10b.",
    "",
    "`#personalfinance` is the broad layer, as on 06b, 06c and 08a: the answers are about the viewer's own pay.",
]

IG_ALT_SHORT = "Chart: 1 second of Amazon's 2025 profit, about $2,464, is about 2 weeks of median full-time pay."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the hook's answer with its basis (2025 profit; median full-time pay).")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header asks: how long do you work for 1 second of Amazon's profit? A green counter starts at $0 and climbs at about $2,464 a second: "
               "Amazon's 2025 net income, $77.7 billion, spread over the year. A ladder of targets turns into answers in weeks of median full-time pay ($1,251 a week): "
               "1 second, about $2,464, is about 2 weeks; 5 seconds, about $12,319, about 10 weeks; $32,526, at about 13 seconds, is 6 months. "
               "The counter stops on exactly $65,052 as a coin pops and grows to the biggest object on the stage. Payoff: a year of median pay: about 26 seconds.")

IG_FIRST_COMMENT = "2,464 ÷ your weekly pay = weeks of your work per second of Amazon's profit. Median ($1,251): ≈ 2. Yours?"

# ---------------------------------------------------------------- the cover frame
# The finished board with the verdict, picked by content: the write-up's Instagram note names "the finished board with
# the verdict (the hero at $65,052, the big lit coin, the ladder reading ≈ 2 weeks · ≈ 10 weeks · 6 months · 1 year,
# the verdict)". On this render the coin grows and settles by about frame 823, the last caption ("≈ 26 seconds.")
# clears at frame 845, and the board then holds still until the end card. Frame 900 is inside that hold.
COVER_T = 30.0
COVER_FRAME = 900
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The finished board with the verdict, as the write-up's Instagram note asks: the header 'HOW LONG DO YOU WORK FOR / 1 SECOND OF AMAZON'S PROFIT?', the odometer on '$65,052', "
                          "the 2-line footer 'Amazon 2025 net income: $77.7B / Pay: BLS median $1,251 a week × 52', the ladder reading '≈ 2 weeks · ≈ 10 weeks · 6 months · 1 year' beside the big lit coin, "
                          "and the two-line verdict 'A YEAR OF MEDIAN PAY: / ≈ 26 SECONDS.' with nothing under it. The hook's own answer (≈ 2 weeks) is the ladder's bottom row. "
                          "On any cut, use a settled frame of the verdict hold, after the last caption clears and before the end card.")
COVER_FRAME_MEASURED = ("On the pre-condense 33.5 s render the counter lands on $65,052 with the verdict at about frame 792 (26.4 s); the coin's growth and glow settle by about frame 823 (27.43 s), the last caption clears at frame 845 (28.17 s), "
                        "and the board then holds still (frame-to-frame mean luma change under 0.001) until the end card at about frame 931 (31.03 s). Frame 900 (30.00 s) is used.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 0 to 1440 of the 1080×1920 frame: the badge (from y 141), the header, the odometer, the footer, the ladder and the coin, and the verdict (to y 1293), "
                   "with 141 px above and 147 px below; it drops the empty black below. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the $0 odometer, the ladder of profit targets and 'How long do you work for this?'). It asks without answering, so it is the YouTube thumbnail, "
    "where it sits beside a title that asks; on Instagram the write-up picks the finished board, the save-able answer.",
    "**When the condensed cut ships:** re-pick the verdict frame by content on the shipped file (a settled frame of the verdict hold, after the last caption and before the end card) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 10c-33.5s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '1 second of Amazon's profit — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 10a and 10b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("amazon profit", 3398, 52.7, 44.5, 53.8, "seed: the exact topic", "2026-10-12"),
    ("how much does amazon make every minute?", 5275, 55.6, 36.0, 58.9, "the same per-time question, in minutes", "2026-07-21"),
    ("how much money does amazon make every second?", 4651, 54.7, 25.0, 62.8, "the video's question as people type it; low competition", "2026-10-12"),
    ("how much money does amazon actually make per order?", 4113, 54.0, 23.9, 62.8, "", "2026-10-12"),
    ("amazon", 873376, 88.7, 64.6, 67.4, "+4.2% vs its 30-day baseline (837,907); the brand", "2026-10-12"),
    ("amazon stock", 34058, 67.7, 37.6, 65.6, "+69.3% vs its baseline (20,117); stock intent, and no share price in this Short: not in the tags", "2026-10-12"),
    ("amazon web services", 27004, 66.2, 57.5, 56.7, "+48.1%; the segment the 'AWS makes all the profit' comment names", "2026-10-12"),
    ("jeff bezos", 198267, 79.1, 71.0, 59.0, "-25.4%; a person the write-up does not name: not in the copy or tags", "2026-10-12"),
    ("personal finance", 1436792, 91.9, 60.0, 71.1, "-18.1% vs its baseline (1,754,064); the broad layer", "2026-10-12"),
]
KEYWORD_MD_NOTE = {"amazon stock": "+69.3%; stock intent, no share price here: not in the tags",
                   "jeff bezos": "a person the write-up does not name: not in the copy or tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and matching_terms modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-07-21).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("People ask this exact question: 'how much money does amazon make every second?' (4,651, competition 25.0) and 'every minute?' (5,275). 'amazon profit' itself is small (3,398), and the brand is huge (873,376). "
            "The searches around the brand pull elsewhere: 'amazon stock' is rising (+69.3%) and 'jeff bezos' is big, but this Short names no share price and no person, so neither is in the copy or tags; "
            "'amazon earnings' and its matching terms are all seller and self-publishing phrases. The title asks the question; the tags carry the searched phrasings.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How Much Money Amazon Warehouse Employees Make", "Caleb Hammer", 3970000, 4590278, "2025-03-20", "46 s; the pay side of Amazon, the other half of this Short"),
    ("America Spends $222,000+ Per Second…", "The Iced Coffee Hour", 1660000, 810279, "2025-12-15", "24 s; the per-second framing, on federal spending (22.32x)"),
    ("How much Amazon earns in 1 Minute #shorts #mangeshshinde", "Mangesh Shinde Shorts", 1300000, 401502, "2024-10-21", "India-facing; revenue, in rupees"),
    ("How Companies Make $1,000,000 In SECONDS! 😱💸", "SnipStory", 4220, 203086, "2026-10-04", "41 s; 6.97x"),
    ("Amazon makes $22,700 every second 🤯💸 #amazon #money #shorts", "Dollar Clock", 0, 32, "2026-10-10", "revenue per second (2025), not profit; its own figure, not verified here"),
    ("💰 Biggest Companies’ Revenue Per Second 🤯", "PerSecond World", 0, 1, "2026-10-12", "2:43; revenue"),
]
SAME_IDEA_HEADING = "**2. Amazon per second is a known idea, always as revenue and never in the viewer's own time (vidIQ YouTube search and outliers, Shorts, under 4 min).**"
SAME_IDEA_MD = [
    "Company-money-per-time Shorts travel: 'How much Amazon earns in 1 Minute' has 401,502 views and 'How Companies Make $1,000,000 In SECONDS!' 203,086 (6.97x). "
    "Two brand-new channels posted the same idea in the last week ('Amazon makes $22,700 every second', 32 views; 'Biggest Companies' Revenue Per Second', 1), both on revenue.",
    "",
    "None uses profit, and none answers in the viewer's own unit. The biggest Amazon money Short in the searches is the other side of the ledger: Caleb Hammer's 'How Much Money Amazon Warehouse Employees Make' (4,590,278). "
    "This Short joins the two: Amazon's profit, priced in weeks of median pay. The copy names net income and its source, so it is not read as another revenue counter.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search and outliers (Shorts; under 4 min): company-money-per-time is a proven idea ('How much Amazon earns in 1 Minute', 401,502; 'How Companies Make $1,000,000 In SECONDS!', 203,086), "
                  "always as revenue (the figures are theirs, not verified here). None uses profit or answers in weeks of the viewer's pay; Caleb Hammer's Amazon-pay Short (4,590,278) shows the pay side draws too.")

OUTLIERS = [
    {"handle": "@money_reel", "platform": "TikTok", "id": "7680121852244610335",
     "on_screen": "Making $300 A Second, Jeff Bezos Pays His $1,000 Illegal Fence Fine In 4 Seconds.",
     "views": "1.5M (3333.3x the account median of 450)",
     "note": "a fortune re-priced per second against a cost; the per-second figure is the creator's, not verified here, and this Short names no person"},
    {"handle": "@xsfund", "platform": "Instagram", "id": "DbwHHaJDFwT",
     "on_screen": "Jeff Bezos knows his giant fence is illegal", "views": "953.1K (45.6x the account median of 20.9K)",
     "note": "the same per-second story, stock footage with text"},
    {"handle": "@cbseveningnews", "platform": "TikTok", "id": "7680209016575872286",
     "on_screen": "U.S. CORPORATE PROFITS", "caption": "Corporate profits are at record highs while workers’ share of national income has fallen to historic…",
     "views": "1M (18.5x the account median of 53.9K)", "note": "profit set against pay, as a news chart"},
    {"handle": "@tc_theinvestor", "platform": "Instagram", "id": "DcbkMr_APWP",
     "on_screen": "The number of hours needed to escape poverty living on minimum wage 😳😳", "views": "172.2K (33.1x the account median of 5.2K)",
     "note": "work time as the unit, the unit this Short answers in"},
]
OUTLIERS_HEADING = "**3. Per-second fortunes and profit-vs-pay both travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since January 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@money_reel** (TikTok), \"Making $300 A Second, … Pays His $1,000 Illegal Fence Fine In 4 Seconds.\": 1.5M (3333.3x). The same story as **@xsfund** (Instagram): 953.1K (45.6x).",
    "  - A fortune re-priced per second against a cost: the move this Short makes with a company's profit and a week of pay. Their per-second figure is theirs, not verified here, and they are about a person; this Short names none.",
    "- **@cbseveningnews** (TikTok), \"U.S. CORPORATE PROFITS\": 1M (18.5x). Profit set against pay, as a news chart.",
    "- **@tc_theinvestor** (Instagram), \"The number of hours needed to escape poverty living on minimum wage\": 172.2K (33.1x). Work time as the unit.",
    "- The per-second Reels state a dollar figure; none converts it into the viewer's own working time, which is this Short's answer.",
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
    "The channel has no counter Short yet. Its brand Shorts are the nearest kind: 06c (Starbucks: 760 views, 1,711 plays at a 40.3% skip rate) and 06b (Netflix, Mon 12 Oct 12:14 ET: 75 views so far), "
    "both too young to compare; 06b's Reel shows 7 plays while Instagram's owner insights catch up.",
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
    "The $77.7 billion rests on Amazon's own Q4 2025 release (company newsroom) and two copies of its figures, found by search; the write-up's round could not fetch pages directly. Open the release once before posting.",
    "The figures in other creators' titles and descriptions (revenue per second, a person's earnings per second) are theirs, not verified here; the copy states only the write-up's maths.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "6 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "65 credits for this teaser by listed cost (3 keyword queries, 2 YouTube searches, 1 Shorts outlier search, 1 Instagram/TikTok outlier search and 6 title scores at up to 5 each), plus 10 shared across 10a-10c for the channel's stats and Shorts list (Instagram owner insights cost 0), and 5 for the re-score after the build. "
                     "Account balance: 4,375 at the start of the 10 research and 4,135 when it ended, a 240 drop for 56 calls (the balance is shared with sheets built in parallel, so the drop is an upper bound; keyword queries cost less than 5); 4,060 after the 3 re-scores (15 credits by listed cost; the rest of that 75 drop is other sheets'). About 255 for the three 10 sheets, against a budget of about 450. "
                     "Adversarial check: 5 for this teaser by listed cost (the pick's title score) plus 2 keyword queries ('how much money does amazon make every second', questions and research), and 5 shared across 10a-10c for the three related videos' titles. "
                     "Balance 3,695 at the check's start and 3,635 after its last call (a 60 drop for 18 calls across 10a-10c, 30 of it listed title and video costs; the balance is shared with sheets checked in parallel).",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/10-cost-counter.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/10-cost-counter.py; "
                "the rate and every answer recomputed from $77.7 billion and $1,251 a week in MATH_RELATIONS ($2,463.85 ≈ $2,464; ≈ 2 weeks; ≈ $12,319 and ≈ 10 weeks; $32,526 at ≈ 13 seconds; $65,052 at ≈ 26 seconds; the swap-in rule's 1.97); "
                "COPY_RULES hold every figure to the write-up's one rounding, put '≈' or 'about' on every rounded figure, keep $77.7 billion beside 2025 and named as net income, and ban 'live', a share price, a ticker, any person's name and advice wording. Re-run at the adversarial check (2026-10-13) with the same result")
VIDIQ_REQUERIED = ("pulled 2026-10-13: amazon profit 3,398 / 44.5; how much money does amazon make every second? 4,651 / 25.0; amazon 873,376 (+4.2%); "
                   "title scores 98 (pick), 88 (the write-up's title); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried after the build: the pick's title score 98. Match. "
                   "Re-queried at the adversarial check: the pick's title score 98; how much money does amazon make every second? 4,651 / 25.0 (2026-10-12); "
                   "the related video fbpdKf4Wy8c 760 views, title as in the pick. All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 10c maths table: $77,700,000,000 ÷ 31,536,000 = $2,463.85 ≈ $2,464 a second; ÷ $1,251 = 1.97 ≈ 2 weeks; "
    "× 5 = $12,319.25 ≈ $12,319, ÷ $1,251 = 9.85 ≈ 10 weeks; $65,052 ÷ 2 = $32,526, ÷ k = 13.20 ≈ 13 s; $1,251 × 52 = $65,052, ÷ k = 26.40 ≈ 26 s (and $65,052 ÷ $2,464 = 26.40 too). The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 6 titles scored against this channel: the pick 98, the write-up's title 88. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 98, as first scored. At the adversarial check: the pick's title score 98; 'how much money does amazon make every second?' 4,651 / 25.0 (2026-10-12); "
    "the related video (`fbpdKf4Wy8c`) 760 views, its title as in the pick. All match.",
    "- **Changed at the adversarial check.**",
    "  - The caption's hook ran 126 characters, so Instagram's fold cut its last character. It now says 'The profit counter' (121 characters), so the whole sentence shows before 'more'.",
    "  - The long alt text said the coin 'grows to fill the stage'; on the cover it grows to the biggest object on the stage, beside the ladder. It now says that.",
    "  - The pick's note said 'Top score of the 9 scored'; 6 titles were scored. The 'also scored' hashtag form now says its hashtags are not in the description's order.",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/10-cost-counter.py`, shared with 10a and 10b.",
    "- **Mutation test.** Breaks on scratch copies of this file all fail by name: a title that gives the answer ('… ≈ 2 Weeks'), the affiliation line dropped from the caption, 'amazon stock' in the tags, "
    "a second rounding of the rate ('$2,463.85'), '≈ 3 weeks' for the 1-second answer (caught by the figures check: 3 is no maths figure), and a result in the caption's first 125 characters. (20 of 20 across 10a-10c.)",
    "- **Kept on purpose.**",
    "  - The pick (98) is not the write-up's title (88): it adds 'Would You Have to' and keeps every word of the question; the on-screen header stays as it is.",
    "  - The YouTube thumbnail is frame 1 (the question) and the Instagram cover is the finished board with the verdict, as the write-up's Instagram note asks.",
    "  - 'Profit' is always named as net income (as Amazon reports it), and never as sales: the same-idea Shorts divide revenue.",
    "  - No share price, ticker or person: 'amazon stock' (+69.3%) and 'jeff bezos' are big searches, and neither is in the write-up's video.",
    "- **Checked and kept.** Every figure in the copy against the 10c maths table and the check's output (the swap-in rule's 2,464 ÷ 1,251 = 1.97 ≈ 2 matches the exact rate); the title (64/100), description (bytes), tags, hashtags, caption, first 125 characters "
    "and both alt texts against the platform limits; 'Amazon' only as the company whose reported net income is divided, the affiliation line in both long texts, '#Amazon' as a descriptive tag, no handle, logo, stock or person; "
    "frame 1 (thumbnail) and frame 900 (cover) read from the render.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file, re-reading the long alt text against it.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 10c maths table (teasers/v2/10-cost-counter.md, section 10c) and
# recomputed below from its inputs; dates are the sources' own, quoted from the write-up.
FIGURES = {
    "1", "$77.7", "31,536,000", "365", "$2,464", "2,464", "$1,251", "2", "5", "$12,319", "10", "$32,526", "13", "52", "$65,052", "26",
    "6", "$0", "2025", "2026", "4",
}
from fractions import Fraction as _F
_k = _F("77.7") * 10**9 / 31536000                 # Amazon's profit per second, 2025
_wk = lambda dollars: _F(dollars) / 1251
MATH_RELATIONS = [
    (round(float(_k), 2) == 2463.85 and round(float(_k)) == 2464, "$77.7B ÷ 31,536,000 = $2,463.85 ≈ $2,464 a second (to the dollar)"),
    (round(float(_wk(_k))) == 2 and round(float(_wk(2464))) == 2, "1 second: $2,463.85 ÷ $1,251 = 1.97 ≈ 2 weeks (the working's $2,464 ÷ $1,251 = 1.97 too)"),
    (round(float(_k * 5)) == 12319 and round(float(_wk(_k * 5))) == 10 and round(float(_wk(12319))) == 10, "5 seconds: $12,319.25 ≈ $12,319, ÷ $1,251 = 9.85 ≈ 10 weeks"),
    (1251 * 52 == 65052 and 65052 // 2 == 32526 and 65052 % 2 == 0, "a year of median pay: $1,251 × 52 = $65,052; half of it $32,526, exactly 6 months"),
    (round(float(_F(32526) / _k)) == 13, "half a year: $32,526 ÷ k = 13.20 ≈ 13 seconds"),
    (round(float(_F(65052) / _k)) == 26 and round(65052 / 2464) == 26, "a year: $65,052 ÷ k = 26.40 ≈ 26 seconds ($65,052 ÷ $2,464 = 26.40 too)"),
    (abs(float(_k * _F("26.4026")) - 65052) < 0.5, "the counter stops on exactly $65,052 (k × 26.4026 = $65,052.07), so its final has no '≈'"),
]
MATH_SCRIPT = "publishing/data/checks/10-cost-counter.py"
MATH_KEY_LINES = ["2,463.8508  ≈ $2,464", "1.9695  ≈ 2 weeks", "12,319.2542  ≈ $12,319", "9.8475  ≈ 10 weeks", "32,526.0000  $32,526",
                  "13.2013  ≈ 13 seconds", "26.4026  ≈ 26 seconds"]
RESULT_RE_TITLE = r"2,46|2\.46|12,3|32,5|65,0|\b13\b|\b26\b|≈|[Aa]bout|[Ww]eeks?|77\.7"
RESULT_RE_CAPTION = r"2,46|\$2,4|12,3|32,5|65,0|\b13\b|\b26\b|≈|[Aa]bout|[Ww]eeks?|77\.7|seconds\b"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_ALL_TAGS = _ALL + "\n" + ", ".join(YT_TAGS) + "\n" + " ".join(YT_HASHTAGS + IG_HASHTAGS)
_YEAR = _re.compile(r"(?<![/\d])20[123]\d(?!\d)")
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_num = lambda s: float(s.replace(",", ""))


def _beside(fig, year, reach=45):
    """every occurrence of fig has its year on the same line, within reach characters, with no other year between them"""
    return all(any(y.group() == year and abs(y.start() - m.start()) <= reach
                   and not _YEAR.search(ln[min(y.end(), m.end()):max(y.start(), m.start())]) for y in _YEAR.finditer(ln))
               for ln in _lines() for m in _re.finditer(fig, ln))


def _approx(pat):
    """every occurrence of pat comes right after '≈ ' or 'about '"""
    return all(_re.search(r"(?:≈|[Aa]bout) $", v[max(0, m.start() - 6):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


# One rounding per quantity (the write-up's rule, unit-aware): a dollar figure near the rate or the 5-second profit, a
# count of weeks near an answer, and a time near a pass must each be that quantity's one shown rounding.
_bad = []
for _m in _re.finditer(r"\$?(\d[\d,]*(?:\.\d+)?)", _ALL):
    _v = _num(_m.group(1))
    for _ex, _shown in ((float(_k), 2464), (float(_k * 5), 12319)):
        if abs(_v - _ex) <= _ex / 20 and _v != _shown:
            _bad.append(_m.group(0))
for _m in _re.finditer(r"(?<![\d,.$])(\d+(?:\.\d+)?) weeks?\b", _ALL):
    _v = _num(_m.group(1))
    for _ex, _shown in ((float(_wk(_k)), 2), (float(_wk(_k * 5)), 10)):
        if abs(_v - _ex) <= _ex / 20 and _v != _shown:
            _bad.append(_m.group(0))
for _m in _re.finditer(r"(?<![\d,.$])(\d+(?:\.\d+)?) seconds?\b", _ALL):
    _v = _num(_m.group(1))
    for _ex, _shown in ((float(_F(32526) / _k), 13), (float(_F(65052) / _k), 26)):
        if abs(_v - _ex) <= _ex / 20 and _v != _shown:
            _bad.append(_m.group(0))

_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|dozen|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (not _re.search(r"(?i)\blive\b", _ALL_TAGS), "no 'live' in the copy, tags or hashtags (the write-up's banned overclaim for 10c)"),
    (not _bad, f"every figure is its quantity's one rounding (≈ $2,464; ≈ $12,319; ≈ 2 and ≈ 10 weeks; ≈ 13 and ≈ 26 seconds): {_bad}"),
    (all(_approx(p) for p in (r"\$2,464(?! ÷)", r"\$12,319", r"(?<![\d,.$])2 weeks", r"\b10 weeks", r"\b13 seconds", r"\b26 seconds")),
     "every rounded figure comes with '≈' or 'about' (the working '$2,464 ÷ $1,251' and the swap-in '2,464 ÷' are the write-up's own, without)"),
    (_beside(r"\$77\.7 billion", "2025"), "$77.7 billion always sits beside 2025"),
    (all("net income" in _COPY[k] for k in ("description", "caption", "pinned comment", "long alt text")),
     "Amazon's profit is named as net income in the description, the caption, the pinned comment and the long alt text"),
    (not _re.search(r"(?i)\brevenue\b|\bsales\b(?!, spread)", _ALL.replace("not its sales", "")), "profit is never called revenue or sales"),
    (all("Not affiliated with or endorsed by Amazon." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "'Not financial advice.' and 'Not affiliated with or endorsed by Amazon.' are in the description and the caption"),
    (not _re.search(r"(?i)\bstock\b|\bshares?\b|share price|\bAMZN\b|@amazon", _ALL_TAGS), "no share price, stock, ticker or brand handle (none is in the video)"),
    (not _re.search(r"(?i)\bbezos\b|\bjassy\b", _ALL_TAGS), "no person is named"),
    (all(_re.search(r"\d (?:million|billion|trillion)\b", ln) for ln in _lines() if _re.search(r"(?i)\b(?:million|billion|trillion)\b", ln))
     and not _NUMBER_WORDS.search(_ALL) and all(w.lower() == "half" for w in _re.findall(r"(?i)\bhalf\b", _ALL)),
     "no spelled-out figures beyond the write-up's 'half a year' ('billion' only after a numeral)"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bbuy now\b|\bworth it\b|\binvest\b", _ALL), "no advice wording"),
]
