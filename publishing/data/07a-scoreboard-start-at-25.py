# 07a publishing data: 2 people invest $200 a month, 10 years vs 30 years, who wins at 65? (Scoreboard, ledger-duel).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06b-scoreboard-netflix-bill.py (the nearest
# Scoreboard sheet) and kept its form (COPY_RULES, research tables), as 04b did.
#
# Facts come only from teasers/v2/07-ledger-duel.md (section 07a, "Decisions shared by all three") and
# python3 teasers/v2/checks/07-ledger-duel.py. Research: vidIQ, pulled 2026-10-13. The render in renders/channel is the
# pre-condense cut; a condensed cut (timing only: numbers, captions and verdict stay) is in progress. This sheet names no
# timestamp except the cover, which is picked by content (the Age 30 row landed), so the copy carries over; the ship step
# rebuilds it with --covers.

TEASER = "07a Scoreboard, ledger-duel: \"2 people invest $200 a month. 10 years vs 30 years. Who wins at 65?\""
PREPARED = "2026-10-13"
SHORT_ID = "07a"
MD_TITLE = "07a publishing sheet: 2 people invest $200 a month, 10 years vs 30 years"
MATH_RUN = "461 checks, 0 failures"    # python3 teasers/v2/checks/07-ledger-duel.py on studio/specs/, 2026-10-13
MATH_SCRIPT = "publishing/data/checks/07-ledger-duel.py"   # runs the 07 check unchanged, adds the builder's summary form

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the Scoreboard port (fix pass 2026-10-08) as `renders/channel` holds it on 2026-10-13. A condensed cut is in progress (timing only: the numbers, captions and verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the Age 30 row landed), so the copy carries over. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/07-ledger-duel.md` (07a) and its check, "
    f"`python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every ledger row, the gap, the 6% case and the "
    "≈ 6.1% break-even from $200 a month at 7%/12, keeps each figure with its own person (Ava or Ben) and each Age row's pair together.",
    "- **Honesty rules kept.** The title asks who has more at 65 and never says, and so does the cover (the Age 30 row, no final). The Instagram caption keeps every result below 'more'. "
    "The reversal rests on the assumed 7%: the description and the caption both say it is an assumption, not a forecast, and give the condition, Ben edges ahead at 6% and Ava's head start "
    "wins above about 6.1%, as the write-up's caption does. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** None. No company, fund or index is named (the 7% is a stated assumption, not a market series), so no affiliation line is needed.",
    "- **Overlap.** The channel already posted the same ages as a lump sum ('Start Investing 10 Years Late? You Get Half.': 161 views; on Instagram a 65.1% skip rate, the highest of its October Reels). "
    "This Short's angle is the reversal (Ava stops at 35, Ben puts in 3 times as much, and Ava still finishes ahead), so the title and the caption lead with the stop, not with 'start early'.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds on 2026-10-13: the pre-condense cut. The ship step rebuilds this file with --covers from the condensed cut.")
CUT = {"name": "pre-condense (Scoreboard port, fix pass 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "status": "in renders/channel on 2026-10-13 (git 471c793); a condensed cut (timing only) is in progress",
       "on_ship": f"python3 publishing/tools/build_publishing.py {BASE} --covers (re-picks the cover by content, re-exports both JPGs, refreshes for_video)"}

FACTS = {
    "source": f"teasers/v2/07-ledger-duel.md section 07a; teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "plans": "Ava: $200 a month from 25 to 35 (120 months, $24,000), then stops and leaves it invested; Ben: $200 a month from 35 to 65 (360 months, $72,000), 3 times Ava's",
    "basis": "$200 at each month-end at an assumed 7% a year, compounded monthly (7%/12 a month); no fees, no taxes, no inflation adjustment; the rate is not a forecast",
    "formula": "B(n) = 200 × ((1 + 0.07/12)^n − 1) ÷ (0.07/12); Ava at age a = B(min(m, 120)) × (1 + 0.07/12)^(m − 120 if m > 120), m = 12 × (a − 25); Ben = B(12 × (a − 35))",
    "rows": "Age 30 ≈ $14,000 / $0; 35 ≈ $35,000 / $0; 40 ≈ $49,000 / ≈ $14,000; 45 ≈ $70,000 / ≈ $35,000; 50 ≈ $99,000 / ≈ $63,000; "
            "55 ≈ $140,000 / ≈ $104,000; 60 ≈ $198,000 / ≈ $162,000; 65 ≈ $281,000 / ≈ $244,000 (Ava / Ben; Ava ahead at every row)",
    "finals": "Ava 280,968.48 ≈ $281,000; Ben 243,994.20 ≈ $244,000; gap 36,974.28 ≈ $37,000 (the shown finals' difference too)",
    "sensitivity": "break-even 6.109% ≈ 6.1% (nominal, compounded monthly): above it Ava wins, below it Ben does; at 6% Ava ≈ $197,000 (197,395.14), Ben ≈ $201,000 (200,903.01)",
    "pinned": "had Ava never stopped, B(480) = 524,962.68 ≈ $525,000",
    "verdict": "Ava wins by ≈ $37,000 with a third of the money ('A third of the money, and Ava still wins.')",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "She Invests for 10 Years, Then Stops. He Invests for 30. Who Has More at 65?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 94,
     "note": "PICK. The header's bet as a story: she (Ava) stops after 10 years, he (Ben) keeps going for 30. It asks, and the twist ('Then Stops') is in it, not the answer. No hashtags (three would take it to 122 characters)."},
    {"rank": 2, "title": "She Invests $200 a Month for 10 Years. He Invests for 30. Who Has More at 65?", "vidiq_score": 90,
     "note": "Adds '$200 a Month' for 4 points less; the header shows it in green on frame 1, and the description's first line says it."},
    {"rank": 3, "title": "Start Investing at 25 or at 35? One Stops After 10 Years. Who Has More at 65?", "vidiq_score": 88,
     "note": "Leads with the 'start investing' search words and both ages, for 6 points less."},
]
YT_TITLES_ALSO_SCORED = [
    ("She Invests $200 a Month From 25 to 35. He Invests From 35 to 65. Who Has More at 65?", 88, ""),
    ("She Starts Investing at 25 and Stops at 35. He Starts at 35. Who Has More at 65?", 88, ""),
    ("2 People Invest $200 a Month. One Stops at 35. Who Has More at 65?", 87, "the write-up's title"),
    ("2 People Invest $200 a Month: 10 Years vs 30 Years. Who Wins at 65?", 87, "the on-screen header"),
    ("Start Investing at 25 and Stop at 35, or Start at 35 and Never Stop? Who Has More at 65?", 87, ""),
    ("Compound Interest: Invest $200 a Month for 10 Years or 30 Years? Who Has More at 65?", 87, "the keyword up front gains nothing"),
    ("Invest $200 a Month for 10 Years or for 30 Years: Who Has More at 65?", 86, ""),
    ("Invest From 25 to 35 or From 35 to 65: Who Has More at 65? #compoundinterest #investing #money", 85, "the 3-hashtag form"),
]
TITLE_BULLETS = [
    "It asks the header's question ('Who wins at 65?') as 'Who Has More at 65?' and carries the twist the write-up's title adds ('One Stops at 35') as 'Then Stops', without the answer. "
    "'She' and 'He' are Ava and Ben, the video's two panels; their plans are on screen from frame 1.",
    "It scores 94, 7 points over the write-up's title (87). The keyword-led versions score lower ('Compound Interest: …' 87; 'Start Investing at 25 or at 35? …' 88), "
    "so the search words ride in the description's first line, the hashtags and the tags, and the title is written for the feed. vidIQ's model ranks titles; it does not predict views.",
    "The same idea is already up on at least nine small channels (ten Shorts; research, section 2), mostly as '10 years vs 30 years, who wins?'. None tells it as two people with the stop in the title.",
]

YT_DESCRIPTION = """Ava invests $200 a month from age 25 to 35, then stops: $24,000 in. Ben invests $200 a month from 35 to 65: $72,000 in. At an assumed 7% a year, Ava has about $281,000 at 65 and Ben about $244,000. A third of the money, and Ava still wins.

The math, shown:
• Ava: $200 × 120 months = $24,000. Ben: $200 × 360 months = $72,000, 3 times as much.
• Age 35: Ava ≈ $35,000, Ben $0. Ava stops adding; her balance keeps compounding.
• Age 45: Ava ≈ $70,000, Ben ≈ $35,000.
• Age 55: Ava ≈ $140,000, Ben ≈ $104,000.
• Age 65: Ava ≈ $281,000, Ben ≈ $244,000. Ava wins by ≈ $37,000.
• It hangs on the rate. At 6% a year, Ben edges ahead: Ben ≈ $201,000, Ava ≈ $197,000. Ava's head start wins above about 6.1%.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $200 deposited at each month-end at an assumed 7% a year, compounded monthly. 7% is an assumption, not a forecast. No fees or taxes; not adjusted for inflation. Not financial advice.
#compoundinterest #investing #personalfinance"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the verdict holds only above about 6.1% a year, which the copy says, "
             "so 'a number that shouldn't be true' would oversell it.")

YT_HASHTAGS = ["#compoundinterest", "#investing", "#personalfinance"]
YT_HASHTAG_NOTES = [
    ("#compoundinterest", "the mechanism, and the biggest on-topic phrase ('compound interest' 137,873 searches a month, competition 50.6; down 17.3% on its 30-day baseline)."),
    ("#investing", "the broad category ('investing' 613,566 a month, competition 65.0, flat at −2.0%)."),
    ("#personalfinance", "the channel's layer ('personal finance' 1,436,792 a month, −18.1%); the write-up's caption tags all three, and so did the channel's earlier start-age Short."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["compound interest", "power of compound interest", "the power of compound interest", "compound interest explained",
           "how compound interest works", "start investing early", "too late to start investing", "investing at 25",
           "invest $200 a month", "investing for beginners", "investing", "personal finance", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'too late to start investing' (10,525 a month) is Ben's side of the question; "
             "'investing at 25' and 'invest $200 a month' are the video's own words, with no vidIQ volume. Left out on purpose: 'how to start investing' (105,784, +13.8%) and its "
             "'with $100' variants are how-to intent this Short doesn't answer, and the 'simple and compound interest' phrases are exam intent.")

YT_PINNED = """What age did you start? If Ava had never stopped at 35, she'd have ≈ $525,000 at 65.

Why 7%? It's an assumption, not a forecast, and the result hangs on it: the flip point is about 6.1% a year. At 6%, Ben's 30 years come out ahead (Ben ≈ $201,000, Ava ≈ $197,000). Month-end deposits; no fees or taxes."""
PINNED_NOTE = ("The write-up's pinned comment, reordered so its question shows first in the collapsed preview: had Ava never stopped (the seed's original version), she'd have ≈ $525,000. "
               "The second paragraph answers the comment the write-up expects ('but 7% isn't guaranteed') with the break-even and the 6% case, so the verdict is never quoted without its condition.")

RELATED_VIDEO = {
    "pick": {"id": "EqFQCJheCMU", "title": "Start Investing 10 Years Late? You Get Half.",
             "url": "https://www.youtube.com/shorts/EqFQCJheCMU",
             "why": "The channel's own lump-sum version of the same ages ($10,000 at 25 vs at 35), live since Tue 6 Oct 2026. This Short is its sequel: the early starter stops, and the late one puts in 3 times as much."},
    "swap_when_live": "07b or 07c, the other ledger duels, once published. Then point EqFQCJheCMU's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the Age 30 frame (Ava ≈ $14,000, Ben $0, the question still open), the same content as the IG cover."
THUMB_MD = "in the YouTube app, pick the Age 30 frame (Ava's first row landed at ≈ $14,000, Ben at $0, no final), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 07a condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one ledger duel (07a, 07b, 07c) per evening.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "The topic is evergreen ('compound interest' −17.3%, 'the power of compound interest' +40.6% on their baselines), so no date matters more than the slot.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "10 years of $200 a month vs 30 years of $200 a month. Who has more at 65? Compound interest, worked out row by row."

IG_CAPTION = IG_HOOK + """

Ava invests $200 a month from 25 to 35, then stops: $24,000 in. Ben starts at 35 and never stops: $72,000 in, 3 times as much.

The math, shown:
• $200 at each month-end, at an assumed 7% a year, compounded monthly.
• Age 35: Ava ≈ $35,000, Ben $0. Ava stops adding; her balance keeps compounding.
• Age 45: Ava ≈ $70,000, Ben ≈ $35,000.
• Age 55: Ava ≈ $140,000, Ben ≈ $104,000.
• Age 65: Ava ≈ $281,000, Ben ≈ $244,000.

A third of the money, and Ava still wins, by ≈ $37,000.

7% is an assumption, not a forecast, and the result hangs on it. At 6% a year, Ben edges ahead: Ben ≈ $201,000, Ava ≈ $197,000. Ava's head start wins above about 6.1%. No fees or taxes; not adjusted for inflation. Not financial advice.

What age did you start?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#compoundinterest #investing #personalfinance #investingforbeginners #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 ('10 years of $200 vs 30 years of $200'), the header's question and the 'compound interest' keyword, "
                   "no result: the caption overlays the Reel from frame 1, so every number from the answer sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the bet, the question ('Who has more at 65?') and 'compound interest', with no result. The write-up's 'Watch the Age 65 row.' becomes the "
    "'row by row' line, so the hook points at the ledger without the answer. The numbers sit below 'more', where Instagram search and Google indexing still read them.",
    "The rate paragraph gives the verdict's condition in plain words, as the write-up's caption does: 7% is an assumption, Ben edges ahead at 6%, and Ava wins above about 6.1%.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#compoundinterest", "#investing", "#personalfinance", "#investingforbeginners", "#moneymath"]
IG_HASHTAG_MD = [
    "The write-up's four caption tags, plus one:",
    "",
    "- `#compoundinterest`, `#investing` and `#personalfinance` are the same three as YouTube; `#moneymath` is the write-up's series tag on all three ledger duels.",
    "- `#investingforbeginners` is the fifth: 'investing for beginners' is 295,600 searches a month on YouTube, and the channel's own start-age Short ('Start Investing 10 Years Late? You Get Half.') carries it as a tag.",
]

IG_ALT_SHORT = "Chart: $200 a month at 7%, age 25 to 35 vs 35 to 65: Ava about $281,000, Ben about $244,000 at 65."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'to' and 'about', not '→' and '≈', "
                     "so screen readers read it cleanly. The 7% is in it, so the two finals are never given without their rate.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'to' and 'about' instead of '→' and '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header reads: 2 people invest $200 a month. 10 years vs 30 years. Who wins at 65? "
               "Ava, in green, invests from age 25 to 35 and puts in $24,000; Ben, in yellow, invests from 35 to 65 and puts in $72,000. "
               "An age ticker steps from 30 to 65 while both counters roll: Ava about $35,000 at 35 while Ben has $0, then both grow. "
               "At 65, Ava has about $281,000 and Ben about $244,000. Verdict: Ava wins by about $37,000 with a third of the money. "
               "Footer: assumes 7% a year, compounded monthly; not a forecast.")

IG_FIRST_COMMENT = ("Ava: $24,000 in, ≈ $281,000 at 65. Ben: $72,000 in, ≈ $244,000. Had Ava never stopped at 35: ≈ $525,000. "
                    "What age did you start?")

# ---------------------------------------------------------------- the cover frame
# The Age 30 row landed and settled, picked by content on the pre-condense MP4 (2026-10-13): the count lands at 2.0 s
# (frame 60) with a bump and a glow, the frame-to-frame luma change reaches the idle level by 2.43 s (frame 73) and stays
# at 0.000 until the Age 35 cut at 3.2 s. Frame 75 (2.50 s) sits inside that still hold.
COVER_T = 2.5
COVER_FRAME = 75
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The Age 30 row, landed and settled: the header '2 PEOPLE INVEST $200 A MONTH / 10 YEARS VS 30 YEARS. WHO WINS AT 65?' over the 7% footer, "
                          "the AGE 30 ticker with its first pip lit and seven to come, the two LED-off strip slots, AVA (Age 25 → 35, put in $24,000) at ≈ $14,000 "
                          "and BEN (Age 35 → 65, put in $72,000) at $0, the working line 'Ava: $200 × 120 months = $24,000' over 'AVA VS BEN', and the first caption. "
                          "It asks and does not answer: no final, no verdict. The write-up names this frame (Age 30 landed) as the Instagram cover: not frame 1, where "
                          "Ava's odometer is mid-roll and reads as a wrong Age 30 value in a still, and not the finished table, which answers the question. "
                          "On any cut, use the first settled frame after the Age 30 count lands.")
COVER_FRAME_MEASURED = (f"On the pre-condense {VIDEO_S:g} s render the Age 30 count lands at 2.0 s (frame 60) with a bump and a glow; the frame-to-frame luma change "
                        "reaches the idle level by 2.43 s (frame 73) and stays at 0.000 until the Age 35 cut at 3.2 s. Frame 75 (2.50 s) is inside that still hold; "
                        "the first caption reads 'Ava invests from 25 / to 35, then stops.', lit up to 'then' (the kit lights it word by word; the grey word still reads). "
                        "The write-up's 2.1 s is mid-glow on this render.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1454 (the caption), so the tile keeps the badge, "
                   "the header and footer, the whole stage, the working line, the matchup and the caption, and drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the Age 30 frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (Ava's odometer mid-roll reads as a wrong Age 30 value in a still) and the verdict hold (the flooded AVA panel over the finished table and "
    "'AVA WINS BY ≈ $37,000'), which answers the title.",
    "**On ship:** the condensed cut may move the Age 30 landing. `--covers` exports at COVER_T, so first re-pick the first settled frame after the landing by content and update COVER_T and COVER_FRAME.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut ships, the pre-condense render "
                     f"is in git: `git show 471c793:renders/channel/{BASE}.mp4 > 07a-pre-condense.mp4` (sha256 d922b569…). Compare skip rate (October Reels ran 27.0-65.1%; "
                     "'10 years late', the same ages, 65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '10 years vs 30 years — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("compound interest", 137873, 76.7, 50.6, 65.8, "the mechanism; −17.3% vs its 30-day baseline (166,772)", "2026-10-12"),
    ("compound interest explained", 51994, 70.4, 40.3, 66.1, "−11.3% vs its baseline (58,623)", "2026-10-12"),
    ("how compound interest works", 18742, 63.8, 43.5, 60.9, "−12.4%", "2026-10-12"),
    ("the power of compound interest", 12634, 61.2, 46.6, 58.1, "+40.6% vs its baseline (8,988): the one compounding phrase rising", "2026-10-12"),
    ("too late to start investing", 10525, 60.0, 40.2, 59.9, "Ben's side of the question", "2026-10-12"),
    ("start investing early", 4755, 54.9, 49.0, 53.3, "seed; no baseline", "2026-09-07"),
    ("what $100 a month becomes at every age you start investing", 15809, 62.7, 35.0, 63.6, "the start-age idea as a by-age table; not used", "2026-10-12"),
    ("how to start investing", 105784, 75.0, 47.5, 66.0, "+13.8%; how-to intent, not in the copy", "2026-10-12"),
    ("investing for beginners", 295600, 81.7, 49.0, 69.4, "−22.0%; the fifth Instagram tag", "2026-10-12"),
    ("investing", 613566, 86.4, 65.0, 65.8, "−2.0%", "2026-10-12"),
    ("personal finance", 1436792, 91.9, 60.0, 71.1, "−18.1%", "2026-10-12"),
]
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'start investing early' with US volumes; matching_terms for 'compound interest' and 'start investing'), pulled 2026-10-13. "
                   "vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-09-07).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("'compound interest' is the biggest on-topic phrase (137,873 a month) at medium competition (50.6), so it leads the hashtags; 'the power of compound interest' is the one "
            "compounding phrase rising (+40.6%). The start-age phrases are small ('start investing early' 4,755) or how-to ('how to start investing' 105,784), which this Short "
            "doesn't answer. Search is not this Short's main door: the same idea is up on many small channels and none of it is big (section 2), so the title is written for the feed "
            "and the search words ride in the description, the hashtags and the tags.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("This Is What Happens When You Start Investing at 25 vs 35", "Rich & Wise", 28, 931, "2025-04-14",
     "$1,000 a month, 25-35 then stop vs 35-65; outlier score 66.5; the biggest same-idea Short found"),
    ("Invest Only 10 Years vs 30: Who Wins? 🤯", "The Money Rewind", 1, 277, "2026-10-09", "Alex and Sam, $300 a month, 7%"),
    ("Waiting 10 Years to Invest Cost $600,000 #shorts", "Money In 60", 26, 235, "2026-10-09", "the stop-at-35 twist is in its description, at 8%"),
    ("The Magic of Compound Interest: Why Starting at 25 Beats Starting at 35", "Plootus | Retirement & 401k Tips", 215, 216, "2026-06-13"),
    ("Two friends, one wins with a third of the money #startinvesting", "Richard Sterling | Simple Wealth Rules", 27, 121, "2026-10-07",
     "$200 a month, 25 to 35 vs 35 to 65, at 8%: this Short's idea, with the answer in the title"),
    ("The Easiest (& Laziest) Way to Get Rich", "Nas The Finance Dude", 183, 49, "2026-08-16",
     "the same $200, 7% and finals as this Short ($280,968 vs $243,994), 1:33 long"),
    ("Why Your First 10 Years of Investing Beat the Next 30", "100xwealthlab", 17, 15, "2026-09-23"),
    ("Invest for 10 Years, Then Stop - and Still Beat 30 Years #shorts", "FinancialShift", 5, 13, "2026-06-30"),
    ("10 Years vs 30 Years: Who Ends Up Richer? 💰", "The Money Rewind", 1, 7, "2026-10-08"),
    ("He Invested 3x As Much As His Twin. She Still Has More. #shorts", "小辉 | Holdings Vista", 0, 0, "2026-10-06", "the answer in the title"),
]
SAME_IDEA_HEADING = "**2. The same idea on YouTube is crowded, recent and small (vidIQ YouTube search, under 4 min, by views).**"
SAME_IDEA_MD = [
    "'Stop at 35 and still win' is the classic compound-interest example, and at least nine channels have posted it as a Short (ten Shorts, six of them since mid-September 2026). "
    "None has reached 1,000 views: the biggest is Rich & Wise's from April 2025 (931). Nas The Finance Dude's has this Short's exact numbers ($200, 7%, $280,968 vs $243,994) and 49 views. "
    "Three titles give the answer away ('Two friends, one wins with a third of the money'; 'Invest for 10 Years, Then Stop - and Still Beat 30 Years'; 'She Still Has More'); "
    "most of the rest ask '10 years vs 30, who wins?'. The pick keeps the question and tells it as two people: she stops, he doesn't.",
    "",
    "The channel has a near-neighbour of its own: 'Start Investing 10 Years Late? You Get Half.' (the same 25 vs 35 ages, a lump sum) drew 161 views and a 65.1% Instagram skip rate. "
    "So the copy leads with the stop and the 3× deposits, not with 'start early'.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min, by views): 10 same-idea Shorts from 9 channels, 6 of them since mid-September 2026, all under 1,000 views; the biggest is Rich & Wise's (931, April 2025). "
                  "Nas The Finance Dude's uses this Short's exact numbers. Three titles give the answer away; the pick asks.")

OUTLIERS = [
    {"handle": "@ramsey.solutions", "platform": "TikTok", "id": "7664637230660570399",
     "on_screen": "Why starting your Roth IRA young is so important",
     "views": "2.7M (60.5x the account median of 44.6K)", "note": "a 20-year-old vs a 30-year-old side by side, music only"},
    {"handle": "@mike.cpa", "platform": "TikTok", "id": "7677353915838401823",
     "on_screen": "why you need to start early ROTH IRA",
     "views": "1.7M (385.0x the account median of 4.4K)", "note": "an 18-year-old vs a 25-year-old as static text, music only, 5 s"},
    {"handle": "@cashflowinmotion", "platform": "Instagram", "id": "DbBojn6B596",
     "on_screen": "WHEN YOU RETIRE AT 62 VS 70",
     "views": "3.3M (1323.5x the account median of 2.5K)", "note": "faceless text on screen, music only: an age duel with no voice, like this Short"},
    {"handle": "@betterwavefinance", "platform": "Instagram", "id": "Db6ci6yhMMr",
     "on_screen": "How much you need to invest monthly to retire with $5 million",
     "views": "482.1K (116.3x the account median of 4.1K)", "note": "a stick-figure animation of the start-age idea, with a voice-over"},
    {"handle": "@its.kimberly.ash", "platform": "Instagram", "id": "Db9BKh3M0DB",
     "on_screen": "monthly investing by age to have $1M by 65",
     "views": "4.1M (2293.6x the account median of 1.8K)", "note": "talking head over a by-age list"},
]
OUTLIERS_HEADING = "**3. Start-age comparisons travel on Instagram and TikTok as a side-by-side with music (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@ramsey.solutions** (TikTok), \"Why starting your Roth IRA young is so important\": 2.7M (60.5x). A 20-year-old vs a 30-year-old side by side, music only.",
    "- **@mike.cpa** (TikTok), \"why you need to start early ROTH IRA\": 1.7M (385.0x). An 18 vs 25 comparison as static text, music only, 5 s.",
    "- **@cashflowinmotion** (Instagram), \"WHEN YOU RETIRE AT 62 VS 70\": 3.3M (1323.5x). Faceless text with music: an age duel with no voice, the closest in form to this Short.",
    "- **@betterwavefinance** (Instagram), \"How much you need to invest monthly to retire with $5 million\": 482.1K (116.3x). A stick-figure animation of the start-age idea.",
    "- **@its.kimberly.ash** (Instagram), \"monthly investing by age to have $1M by 65\": 4.1M (2293.6x). Talking head over a by-age list.",
    "- The exact 'stops at 35' duel did not surface as an outlier on either platform; these are its cousins. Every one states the comparison on frame 1 and leaves the answer for later, which the cover (Age 30) and the caption's first line do too.",
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
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; pulled 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,519 views in 30 days.",
    "",
    "06b went up on both platforms on Mon 12 Oct at 12:14 ET (75 views on YouTube by 13 Oct; its Reel shows 7 plays, Instagram's insights lag), and 06c the same morning "
    "(760 views, 1,711 plays, 40.3% skip). Both are left out of the medians as too young.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic):",
    "",
    "- **YouTube:** Sunday early morning ET 1,199, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "The closest past post is '10 years late' (the same 25 vs 35 ages, a lump sum, dominoes): 161 YouTube views, and on Instagram 219 plays with a 65.1% skip rate and 30.6% watched, "
    "the weakest of the month. The channel's compounding Shorts have not travelled on Instagram yet ('Speed limit (e)' 56.9% skip). This one opens on a bet with a number on frame 1 "
    "and a count already rolling, which the two best Reels (27.0-27.4% skip) share; the cover A/B in Trial Reels is the test.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20519}
LIMITS = [
    "As the 06b and 04b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the pre-condense cut. The cover's time and frame are measured on it; the copy names no other timestamp, and the ship step re-picks the cover on the final file.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel; this sheet's spend is counted from each tool's listed cost, checked against the balance (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "titles_scored": "11 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "07a: 80 (3 keyword pulls × 5, 1 YouTube search × 5, 1 IG/TikTok outlier search × 5, 11 title scores × 5), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel videos 5; Instagram insights are free). The three 07 sheets used 210 in all. The balance read 5,180 before the first 07 call and 4,980 "
                     "after the first 200 of them, with no other spend in that window, which confirms keyword research at 5 a call; the last 2 title scores (10) followed. "
                     "It read 4,640 at the end of the build: the other 330 were parallel sheets' calls. At the adversarial check: 10 by listed cost (1 title score, 1 keyword pull), plus a third of 15 shared (channel stats 5, two video lookups 10); the three 07 checks used 55 in all. The balance read 3,845 before them and 3,745 after: the other 45 were parallel sheets' calls.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13), run by the builder through publishing/data/checks/07-ledger-duel.py; "
                "every public figure traced to the 07a maths table and recomputed in MATH_RELATIONS from $200 a month at 7%/12 (each Age row, the gap, the 6% case, the 6.109% break-even, B(480)); "
                "each figure pinned to its own person and each Age row's pair kept together (COPY_RULES)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: compound interest 137,873 / 50.6 (−17.3%); the power of compound interest 12,634 (+40.6%); too late to start investing 10,525; start investing early 4,755; "
                   "11 titles scored: pick 94, write-up's title 87, header 87; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried at the adversarial check: the pick's title score 94; 'compound interest explained' 51,994 / 40.3 (−11.3%, baseline 58,623); "
                   "'how compound interest works' 18,742 / 43.5 (−12.4%); channel 53 / 10,221 / 41 (+27 / +5,127 / 11 in 30 days); EqFQCJheCMU 162 views, tagged "
                   "'investing for beginners', hashtags #investing #compoundinterest #personalfinance. All match (161 → 162 views is a day's drift).")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN}. Every public figure traces to the 07a maths table: $200 × 120 = $24,000; $200 × 360 = $72,000 (3×); "
    "Age 35 ≈ $35,000 / $0; Age 45 ≈ $70,000 / ≈ $35,000; Age 55 ≈ $140,000 / ≈ $104,000; Age 65 ≈ $281,000 / ≈ $244,000, gap ≈ $37,000; at 6% ≈ $197,000 / ≈ $201,000; "
    "break-even 6.109% ≈ 6.1%; B(480) ≈ $525,000. The data file recomputes each from the formula.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 11 titles scored against this channel: the pick 94, the write-up's title 87, the header 87. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **Generator.** Unchanged. The 07 check prints '461 checks, 0 failures', and the builder reads only 'N checks, F failed', so `MATH_SCRIPT` is "
    "`publishing/data/checks/07-ledger-duel.py`, a copy of the 03 adapter: it runs the 07 check unchanged, passes its output and exit code through and adds the summary line.",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 94; 'compound interest explained' 51,994 / 40.3 (−11.3%) and 'how compound interest works' 18,742 / 43.5 (−12.4%); "
    "channel 53 subscribers / 10,221 views / 41 videos (+27 / +5,127 / 11 in 30 days); the related video EqFQCJheCMU 162 views (161 at the build), live since Tue 6 Oct 22:27 ET. All match.",
    "- **Changed.**",
    "  - The Instagram caption said 'No fees, taxes or inflation.', which reads as an assumption of zero inflation; it now says 'No fees or taxes; not adjusted for inflation.', as the description and the write-up do.",
    "  - The Overlap bullet called '10 years late' the channel's 'weakest October Reel'; by plays 'Speed limit (e)' is lower (177 vs 219). It now says what holds: the highest skip rate of the month (65.1%).",
    "  - A title bullet said the idea is up on 'at least ten small channels'; section 2 lists ten Shorts from nine channels. It now says nine channels, ten Shorts, and section 2's 'six of them' is pinned to the Shorts.",
    "  - `#investingforbeginners` was 'tagged by the same-idea Shorts and the start-age outliers', which the research does not show. It now cites what vidIQ does show: the channel's own start-age Short carries the tag.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 07a maths table and a fresh run of the 07 check (461 checks, 0 failures): the eight Age rows, the gap, the 6% pair, the 6.109% break-even and B(480).",
    "  - Platform limits: title 76/100 with no hashtags (the description's first three show above it), description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags and a result-free first 125, short alt text 98.",
    "  - The cover JPG (read by eye) shows AGE 30, Ava ≈ $14,000 and Ben $0 with both plans, no final; the render's sha256 equals `git show 471c793:renders/channel/07a-scoreboard-start-at-25.mp4`, so the Trial Reels command fetches this file.",
    "  - No timestamp outside the cover section and no pacing claim; no brand named, so no affiliation line.",
    "- **Mutation test.** Seven mutations of a scratch copy each fail by name: Ava's and Ben's finals swapped, the Age 45 pair swapped, a final without its '≈', the caption without the 6.1% condition, the 6% pair moved off its 6%, a spelled-out 'sixty-five', and a title that gives the result. At the adversarial check, 1 more on a scratch copy also fails by name: the caption's rate paragraph without 'Not financial advice.'. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - Section 2 keeps vidIQ's channel names as spelled, and three of them contain a '|' ('Plootus | Retirement & 401k Tips'). The builder does not escape '|' in table cells, so those rows show one cell too many in rendered Markdown (the views and the date shift right); the JSON is exact. Flagged for a one-line generator fix rather than respelled here.",
    "  - The cover is the Age 30 row, as the write-up names it, not frame 1 (a mid-roll odometer) and not the verdict (the answer).",
    "  - The rate's condition is in the description, the caption and the pinned comment, so the verdict is never quoted without it; the alt texts carry the 7%.",
    "  - No '$200 a month' in the title: the header shows it on frame 1, and the title scores 4 points more without it.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 07a maths table (teasers/v2/07-ledger-duel.md, section 07a) and
# recomputed below from its inputs ($200 a month, ages 25, 35 and 65, 7% compounded monthly).
FIGURES = {
    "$200", "$24,000", "$72,000", "$0", "$14,000", "$35,000", "$70,000", "$140,000", "$104,000", "$281,000", "$244,000",
    "$37,000", "$197,000", "$201,000", "$525,000", "7", "6", "6.1", "3", "120", "360", "10", "30", "65", "25", "35", "45", "55",
    "2",   # the header's "2 people", quoted in the long alt text
}
_g = lambda r: 1 + r / 12
_B = lambda n, r=0.07: 200 * (_g(r) ** n - 1) / (r / 12)


def _ava(age, r=0.07):
    m = 12 * (age - 25)
    return _B(min(m, 120), r) * _g(r) ** max(m - 120, 0)


def _ben(age, r=0.07):
    return _B(12 * (age - 35), r) if age > 35 else 0.0


_ROWS = {30: (14000, 0), 35: (35000, 0), 40: (49000, 14000), 45: (70000, 35000), 50: (99000, 63000),
         55: (140000, 104000), 60: (198000, 162000), 65: (281000, 244000)}   # the ledger, Ava / Ben, to the nearest $1,000
_lo, _hi = 0.05, 0.07
for _ in range(60):                                       # the break-even rate, by bisection
    _mid = (_lo + _hi) / 2
    _lo, _hi = (_lo, _mid) if _ava(65, _mid) > _ben(65, _mid) else (_mid, _hi)
MATH_RELATIONS = [
    (200 * 120 == 24000 and 200 * 360 == 72000, "$200 × 120 = $24,000; $200 × 360 = $72,000"),
    (72000 / 24000 == 3, "Ben puts in 3 times Ava's $24,000"),
    ((35 - 25, 65 - 35) == (10, 30), "10 years vs 30 years"),
    (all((round(_ava(a), -3), round(_ben(a), -3)) == v for a, v in _ROWS.items()), "every Age row, Ava / Ben, to the nearest $1,000"),
    (round(_ava(65), 2) == 280968.48 and round(_ben(65), 2) == 243994.20, "Age 65 exact: 280,968.48 / 243,994.20"),
    (round(_ava(65) - _ben(65), -3) == 37000 and 281000 - 244000 == 37000, "gap ≈ $37,000, also the shown finals' difference"),
    (all(_ava(a) > _ben(a) for a in _ROWS), "Ava ahead at every row"),
    (round(_mid * 100, 3) == 6.109 and round(_mid * 100, 1) == 6.1, "break-even 6.109% ≈ 6.1%"),
    (round(_ava(65, 0.06), -3) == 197000 and round(_ben(65, 0.06), -3) == 201000 and _ben(65, 0.06) > _ava(65, 0.06), "at 6%: Ava ≈ $197,000, Ben ≈ $201,000, Ben ahead"),
    (round(_B(480), -3) == 525000, "had Ava never stopped: B(480) ≈ $525,000"),
]
MATH_KEY_LINES = ["≈ $281,000 − ≈ $244,000 = ≈ $37,000", "claim: caption: break-even rate", "6.109%",
                  "≈ $197,000 vs ≈ $201,000", "claim: pinned: Ava never stops"]
RESULT_RE_TITLE = r"281|244|37,000|525|third|[Ww]ins|[Bb]eats|ahead|6\.1|197|201|Still"
RESULT_RE_CAPTION = r"281|244|37,000|525|third|still wins|beats|ahead|6\.1|197|201|35,000|14,000|70,000"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits with the right person or
# age, so a swapped "Ava ≈ $244,000" or "Age 45: Ava ≈ $35,000" would pass it. These pin each figure to its context.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_WHO = _re.compile(r"\b(Ava|Ben)\b")


def _owner(fig, who):
    """every occurrence of fig has who as the nearest name before it on its line"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            names = _WHO.findall(ln[:m.start()])
            if not names or names[-1] != who:
                return False
    return True


_AGE = _re.compile(r"Age (\d\d): Ava ≈ (\$[\d,]+), Ben (?:≈ )?(\$[\d,]+)")
_money = lambda s: int(s.replace("$", "").replace(",", ""))
_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|third|quarter|twice)\b", _re.I)
COPY_RULES = [
    (all(_owner(f, "Ava") for f in (r"\$24,000", r"\$281,000", r"\$197,000", r"\$525,000", r"\$140,000", r"\$70,000", r"\$14,000"))
     and all(_owner(f, "Ben") for f in (r"\$72,000", r"\$244,000", r"\$201,000", r"\$104,000")),
     "each figure belongs to its own person (Ava's $24,000, $281,000, $197,000 …; Ben's $72,000, $244,000, $201,000 …)"),
    (all(_ROWS[int(a)] == (_money(x), _money(y)) for ln in _lines() for a, x, y in _AGE.findall(ln))
     and sum(len(_AGE.findall(ln)) for ln in _lines()) == sum(len(_re.findall(r"Age \d\d:", ln)) for ln in _lines()),
     "every 'Age NN:' row gives that age's Ava / Ben pair"),
    (all(_re.search(r"(?:≈|about) \$" + f, ln) for f in ("281,000", "244,000", "37,000", "197,000", "201,000", "525,000", "35,000", "70,000", "140,000", "104,000", "14,000")
         for ln in _lines() for _ in _re.finditer(r"\$" + f, ln)),
     "every rounded result keeps its '≈' or 'about'"),
    (all(("6%" in ln) for ln in _lines() if "$197,000" in ln or "$201,000" in ln), "the ≈ $197,000 / ≈ $201,000 pair sits beside its 6%"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("assumed 7%", "not a forecast", "6.1%", "Not financial advice.")),
     "the description and the caption give the 7% as an assumption, the ≈ 6.1% break-even and 'Not financial advice.'"),
    ("7%" in IG_ALT_SHORT and "7%" in IG_ALT_LONG and "not a forecast" in IG_ALT_LONG, "the alt texts carry the 7% (and the long one 'not a forecast')"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"third"},
     "no spelled-out figures beyond 'a third of the money' (24,000 ÷ 72,000)"),
]
