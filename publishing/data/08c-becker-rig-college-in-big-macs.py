# 08c publishing data: community? in-state? out-of-state? private? your year of college in Big Macs (Becker Rig, unit-ladder).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 05b-becker-rig-3000-paycheck.py (the nearest
# Becker Rig precedent of the same batch), laid out like 08a and 08b.
#
# Facts come only from teasers/v2/08-unit-ladder.md (section 08c) and python3 teasers/v2/checks/08-unit-ladder.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense cut: the 08 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (the end state), so the ship step only re-runs the build with --covers on the final file.

TEASER = "08c Becker Rig, unit-ladder: \"Community? In-state? Out-of-state? Private? Your year of college in Big Macs\""
PREPARED = "2026-10-13"
SHORT_ID = "08c"
MD_TITLE = "08c publishing sheet: a year of college in Big Macs"
MATH_RUN = "677 checks, 0 failed"      # python3 teasers/v2/checks/08-unit-ladder.py on studio/specs/ (via publishing/data/checks/08-unit-ladder.py), 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "3424714c7d5e25abfaacaa82aa5efe692a52927bded2610cfaf634360b6a8fc5"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 08 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the end state), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/08-unit-ladder.md` (08c) and its check, "
    f"`python3 teasers/v2/checks/08-unit-ladder.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/08-unit-ladder.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, re-divides every row by $6.22, recomputes the ≈ 10.8 ratio both ways and the pinned full-budget figures, "
    "keeps every count beside its own row and every row's price with its own count, keeps every rounded figure 'about' or '≈', and keeps 'tuition & fees' and 'before grants' in the copy.",
    "- **Honesty rules kept.** The title asks and never gives the result: the YouTube thumbnail is frame 1, which the hook pre-fills with the first row only (community ≈ 667), the other three rows and the ≈ 10.8 still to come. "
    "The Instagram caption keeps every result below 'more'. The Instagram cover is the end state, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, "
    "\"One private year = ≈ 10.8 community-college years.\", and the copy says its basis: 1 year of College Board 2025-26 average published tuition & fees, sticker prices before grants or aid. "
    "No advice (nothing on which school is worth it), no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Big Mac\" (McDonald's) is used only as the unit, at The Economist's Big Mac index price; The Economist and the College Board are named as the sources. "
    "Both platforms' copy says 'Not affiliated with or endorsed by McDonald's, The Economist or the College Board.' The video draws a generic burger icon, with no logo. No brand handle is tagged.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (Becker Rig port + QA fix pass, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 08 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay); no 08 WIP spec was in studio/specs-wip/ at this build. "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/08-unit-ladder.md section 08c; teasers/v2/checks/08-unit-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "unit": "US Big Mac $6.22, July 2026 (The Economist's Big Mac index dataset on GitHub; Econlife, July 2026)",
    "rows": "1 year of College Board 2025-26 average published tuition & fees: public 2-year in-district $4,150 ≈ 667; public 4-year in-state $11,950 ≈ 1,921; out-of-state $31,880 ≈ 5,125; private nonprofit 4-year $45,000 ≈ 7,235 Big Macs",
    "rule": "Big Macs = cost ÷ $6.22, to the nearest Big Mac, with '≈'",
    "ratio": "$45,000 ÷ $4,150 = 10.8434 ≈ 10.8 community-college years; the same in Big Macs (7,234.727 ÷ 667.203)",
    "assumption": "sticker (published) prices, before grants, scholarships or aid; tuition & fees only, no housing, food or books",
    "pinned_budget": "College Board's full private budget (tuition, fees, housing, food, books, transport, other) $65,470 a year: 4 × $65,470 = $261,880 ≈ 42,103 Big Macs, a Big Mac a day for ≈ 115 years; 4 years in-state all-in 4 × $30,990 = $123,960 ≈ 19,929 Big Macs",
    "verdict": "One private year = ≈ 10.8 community-college years.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Many Big Macs Is a Year of College? Community vs In-State vs Out-of-State vs Private"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. Top score of the 9 scored. The first question (39 characters) is the whole idea in the Shorts player's opening; the second names all four rows, as the header does. "
             "No hashtags in the title (no room for three at 88 characters); the description's first three show above it."},
    {"rank": 2, "title": "How Many Big Macs Is a Year of College? Community vs In-State vs Private", "vidiq_score": 96,
     "note": "One point lower, 15 characters shorter; it drops the out-of-state row the header names. The fallback if the pick reads long in the player."},
    {"rank": 3, "title": "How Many Big Macs Is a Year of College? Community? In-State? Private?", "vidiq_score": 95,
     "note": "The header's question form, one row short."},
]
YT_TITLES_ALSO_SCORED = [
    ("How Many Big Macs Is One Year of College Tuition? Community vs Private", 95, "'tuition' in the title, two rows"),
    ("How Many Big Macs Is a Year of College? #college #tuition #bigmac", 94, "the house 3-hashtag form; if used, write the hashtags as the description does (#College #Tuition #BigMac), which the builder's check requires"),
    ("Community College vs Private College: How Many Big Macs Is One Year?", 93, ""),
    ("How Many Big Macs Does One Year of College Cost?", 90, ""),
    ("A Year of College in Big Macs: Community, In-State, Out-of-State or Private?", 86, "a statement of the same idea"),
    ("Community? In-State? Private? Your Year of College in Big Macs", 81, "the write-up's title"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 81 to 97. The write-up's three bare questions come first and the unit last; the pick asks the unit question first ('How Many Big Macs…') and then names the rows.",
    "It names no result: not a count and not ≈ 10.8. 'A year of college' is the header's 'your year'; the description's first line says it is 1 year of published tuition & fees, before aid, as the footer does.",
    "No same-idea Short prices college in Big Macs (research, section 2), and HD Guy's Big Mac ladder (1,749,195 views) shows the unit travels. vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """How many Big Macs is a year of college? 1 year of published tuition & fees, at $6.22 a Big Mac: community college ≈ 667, in-state ≈ 1,921, out-of-state ≈ 5,125, private ≈ 7,235. One private year ≈ 10.8 community-college years.

The math, shown (Big Macs = 1 year of tuition & fees ÷ $6.22):
• Community college (public 2-year, in-district): $4,150 ÷ $6.22 ≈ 667 Big Macs.
• In-state (public 4-year): $11,950 ÷ $6.22 ≈ 1,921 Big Macs.
• Out-of-state (public 4-year): $31,880 ÷ $6.22 ≈ 5,125 Big Macs.
• Private (nonprofit 4-year): $45,000 ÷ $6.22 ≈ 7,235 Big Macs.
• Private vs community: $45,000 ÷ $4,150 ≈ 10.8 community-college years, the same ratio in Big Macs.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Big Mac: $6.22, US, July 2026 (The Economist's Big Mac index). Tuition & fees: College Board, Trends in College Pricing and Student Aid 2025, average published prices for 2025-26, 1 year. Sticker prices, before grants, scholarships or aid; tuition & fees only, no housing, food or books. Not financial advice. Not affiliated with or endorsed by McDonald's, The Economist or the College Board.
#College #Tuition #BigMac"""
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 05c: the order of the rows is what viewers expect, and only the size of the gap surprises.")

YT_HASHTAGS = ["#College", "#Tuition", "#BigMac"]
YT_HASHTAG_NOTES = [
    ("#College", "the subject ('college' 120,886 searches a month)."),
    ("#Tuition", "the basis of every row ('tuition' 26,212 a month, +11.8%; 'why college tuition is so expensive' 8,331)."),
    ("#BigMac", "the unit ('big mac' 33,042 a month; 'big mac index' 9,861); the write-up's own caption tag."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["college tuition", "cost of college", "community college vs university", "community college", "in-state vs out-of-state tuition",
           "private college", "why college tuition is so expensive", "college tuition explained", "college tuition tier list", "student loans",
           "big mac", "big mac index", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'college tuition tier list' (5,286 a month, competition 20.4) is the searched form of a ranked list like this one; "
             "'student loans' (47,897) runs +105.6% over its baseline. "
             "Left out on purpose: 'is college worth it' (18,538) asks for a verdict this video does not give, and 'free college' and the scholarship phrasings promise a how-to.")

YT_PINNED = """Which row was yours?

These are sticker tuition & fees for 1 year, before grants or scholarships. With housing, food and books (College Board's full budget), private runs $65,470 a year: 4 years = $261,880 ≈ 42,103 Big Macs, a Big Mac a day for ≈ 115 years. 4 years in-state, all-in ($123,960): ≈ 19,929 Big Macs."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's own pinned ask. "
               "The second paragraph is the write-up's pinned comment: the full-budget figures moved there when hook pass 2 made every on-screen row 1 year of tuition & fees, "
               "and it answers the comment to expect, 'nobody pays sticker' (before grants, and here is the all-in budget).")

RELATED_VIDEO = {
    "pick": {"id": "hJBvmGA6sZ0", "title": "You Can Lean on $1 Million. Not on $1 Billion. #moneyfacts #billion #Animation",
             "url": "https://www.youtube.com/shorts/hJBvmGA6sZ0",
             "why": "A big number made visible in everyday things (stacks of bills), the same move as this Short's piles of Big Macs, and the channel's second-best YouTube Short (1,221 views)."},
    "swap_when_live": "08a (a Costco hot dog risen like a house) or 08b (rent in hours of work at $15/hr), the same unit-ladder series, once published. Then point that Short's Related video at this one.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1: the header naming all four rows, the community row pre-filled (≈ 667 Big Macs) and its pile. The Instagram cover is the end state instead."
THUMB_MD = ("in the YouTube app, pick frame 1: the header 'Community? In-state? / Out-of-state? Private? / Your year in Big Macs', the footer '$6.22 Big Mac (Jul 2026) · 1 year of / "
            "College Board 2025-26 tuition & fees', the HUD 'Community / $4,150 ÷ $6.22 ≈ / 667 Big Macs' and the figure pointing at the community pile. The hook pre-fills the first row by design; "
            "the other three rows and the ≈ 10.8 stay open, so it asks more than it answers, like the title beside it. The Instagram cover below is the end state, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 08a and 08b. Suggested order within the series: 08b, then 08c, then 08a.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "08c goes second: 'student loans' runs +105.6% over its baseline, while 'community college' is down 66.1% as the start-of-term peak passes, so sooner is better than later.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("Community college, in-state, out-of-state or private: which row is yours? "
           "A year of college tuition & fees, priced in Big Macs.")

IG_CAPTION = IG_HOOK + """

The math, shown (1 year of published tuition & fees ÷ $6.22 a Big Mac):
• Community college: $4,150 ÷ $6.22 ≈ 667 Big Macs.
• In-state: $11,950 ÷ $6.22 ≈ 1,921 Big Macs.
• Out-of-state: $31,880 ÷ $6.22 ≈ 5,125 Big Macs.
• Private: $45,000 ÷ $6.22 ≈ 7,235 Big Macs.

One private year = ≈ 10.8 community-college years ($45,000 ÷ $4,150).

Sticker prices, before grants, scholarships or aid; tuition & fees only, no housing, food or books. Big Mac: $6.22, US, July 2026 (The Economist's Big Mac index). College Board 2025-26 averages. Not financial advice. Not affiliated with or endorsed by McDonald's, The Economist or the College Board.

Which row was yours?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#college #tuition #bigmac #studentloans #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 (the four rows as a question, no number) and the unit, no result: "
                   "the caption overlays the Reel from frame 1, so every count and the ≈ 10.8 sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's own caption line 1, 'Community, in-state, out-of-state or private: which row is yours?', with 'college' added for search, then the unit. "
    "It has no figure, so it needs no move below 'more'; the counts and the verdict follow, where Instagram search and Google indexing still read them.",
    "Each row keeps its own name and working ('In-state: $11,950 ÷ $6.22 ≈ 1,921 Big Macs'), and the basis follows the math: sticker tuition & fees for 1 year, before aid, with no housing, food or books.",
    "No brand handle is tagged. The caption follows the house close: the write-up's own question, then the follow line plus the credit.",
]

IG_HASHTAGS = ["#college", "#tuition", "#bigmac", "#studentloans", "#moneymath"]
IG_HASHTAG_MD = [
    "Four are the write-up's own (`#college #tuition #bigmac #moneymath`), and its Instagram note adds the student-loans crowd:",
    "",
    "- `#college` and `#tuition` name the subject and the basis; `#bigmac` the unit.",
    "- `#studentloans` reaches the people paying for it ('student loans' 47,897 searches a month, +105.6% on its baseline), as the write-up's Instagram note asks.",
    "",
    "`#moneymath` says what kind of video it is. `#personalfinance`, the broad layer on 06b, 06c and 08a, gives way to `#studentloans` here.",
]

IG_ALT_SHORT = "Chart: 1 year of college tuition in $6.22 Big Macs: about 667 community to about 7,235 private."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps each count beside its row.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page with a green stick figure. The header asks: community? In-state? Out-of-state? Private? Your year in Big Macs. "
               "The footer: $6.22 Big Mac (July 2026), 1 year of College Board 2025-26 tuition & fees. Frame 1 already shows community college at about 667 Big Macs "
               "($4,150 divided by $6.22), a pyramid of burgers. The figure punches a gold coin for each next row and the burgers pile up: in-state, $11,950, about 1,921; "
               "out-of-state, $31,880, about 5,125; private, $45,000, about 7,235, on a gold plate. A recap lists all 4 rows. Then private vs community: $45,000 divided by $4,150 "
               "is about 10.8 community-college years, and the community pile hops over to stand at the foot of the private mountain.")

IG_FIRST_COMMENT = ("1 year of tuition & fees in $6.22 Big Macs: community ≈ 667, in-state ≈ 1,921, out-of-state ≈ 5,125, private ≈ 7,235. "
                    "One private year = ≈ 10.8 community-college years. Sticker prices, before grants or aid. Which row was yours?")

# ---------------------------------------------------------------- the cover frame
# The end state, picked by content: the write-up's Instagram note names "the end state: 'Private vs community /
# $45,000 ÷ $4,150 ≈ [10.8] community-college years' on the big gold plate, the four-row recap (the screenshot people
# save), the lit community pile standing beside the lit private mountain, and the verdict". On this render the answer
# lands at frame 520 (17.35 s); the figure's hop and slump settle by about frame 559; the frame then holds still until
# the end card at frame 660 (22.00 s). Frame 600 is a still point inside that hold.
COVER_T = 20.0
COVER_FRAME = 600
COVER_CROP = "crop=1080:1440:0:68"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The end state, as the write-up's Instagram note asks: the header naming all four rows, the footer, the HUD 'Private vs community / $45,000 ÷ $4,150 ≈' with 10.8 on the big gold plate "
                          "and 'community-college years', the four-row recap (≈ 7,235 Private, ≈ 5,125 Out-of-state, ≈ 1,921 In-state, ≈ 667 Community), the lit community pile at the foot of the lit private mountain "
                          "with the in-state and out-of-state piles dimmed, the slumped figure, and the verdict 'One private year = / ≈ 10.8 community-college years.' "
                          "On any cut, use a settled frame of the end hold, after the figure's slump and before the end card.")
COVER_FRAME_MEASURED = ("On the pre-condense 24.5 s render the answer lands at frame 520 (17.35 s); the figure's hop and slump settle by about frame 559 (18.63 s), and the frame then holds still "
                        "(frame-to-frame mean luma change under 0.0001) until the end card at frame 660 (22.00 s). Frame 600 (20.00 s) is used.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 68 to 1508 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1465 (the verdict's underline), "
                   "so the crop centres it (44 px above, 43 below): badge, header, footer, the plate, the recap, the piles and the verdict; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the end-state frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the community row pre-filled, the other three to come). It asks more than it answers, so it is the YouTube thumbnail, "
    "where it sits beside a title that asks; on Instagram the write-up picks the end state, the four-row recap people save.",
    "**When the condensed cut ships:** re-pick the end state by content on the shipped file (a settled frame of the end hold, before the end card) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 08c-24.5s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'A year of college in Big Macs — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 08a and 08b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("college", 120886, 75.9, 65.5, 59.3, "-5.6% vs its 30-day baseline (128,093)", "2026-10-12"),
    ("student loans", 47897, 69.9, 53.1, 60.7, "+105.6% vs its baseline (23,294)", "2026-10-12"),
    ("big mac", 33042, 67.5, 58.0, 57.3, "-4.0% vs its baseline (34,401); the unit", "2026-10-12"),
    ("tuition", 26212, 66.0, 70.0, 51.6, "+11.8% vs its baseline (23,445)", "2026-10-12"),
    ("is college worth it", 18538, 63.7, 52.0, 57.4, "+11.0%; asks for a verdict this video does not give, so not in the tags", "2026-10-12"),
    ("big mac index", 9861, 59.6, 45.1, 57.7, "flat (+0.6%); the unit's own source", "2026-10-12"),
    ("community college", 8597, 58.7, 40.6, 59.0, "-66.1% vs its baseline (25,329): the start-of-term peak passing", "2026-10-12"),
    ("why college tuition is so expensive", 8331, 58.5, 43.0, 57.9, "", "2026-08-30"),
    ("college tuition explained", 6560, 57.0, 28.1, 62.9, "", "2026-10-12"),
    ("us college tuition", 5427, 55.7, 42.5, 56.4, "", "2026-09-27"),
    ("college tuition tier list", 5286, 55.6, 20.4, 65.2, "a ranked list of schools' costs, like this one", "2026-10-12"),
    ("how much does college really cost for parents", 3825, 53.5, 21.2, 63.6, "", "2026-10-12"),
    ("community college vs university", 3746, 53.3, 23.6, 62.6, "the first row against the rest", "2026-06-28"),
    ("cost of college", 0, 0, 44.5, 22.2, "<750/month", None),
    ("out of state tuition", 0, 0, 16.4, 33.4, "<750/month", None),
]
KEYWORD_MD_NOTE = {"is college worth it": "+11.0%; a verdict this video does not give, not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; three rows are older snapshots (2026-06-28 to 2026-09-27).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Three rows are older snapshots.")
KW_OUTRO = ("College cost is searched as a question about why it is so high ('why college tuition is so expensive' 8,331) and as a ranking ('college tuition tier list' 5,286, competition 20.4), "
            "and the money behind it is rising ('student loans' 47,897, +105.6%). The unit has its own demand ('big mac' 33,042; 'big mac index' 9,861). 'Cost of college' and 'out of state tuition' "
            "are under 750 a month as typed, so the title uses 'a year of college' and the row names, the header's own words.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How to Go to College for Free", "Gohar Khan", 7960000, 12492633, "2025-05-10", "adjacent: the cost of college as a hook"),
    ("Cost in Units of Big Macs", "HD Guy", 189000, 1749195, "2026-08-02",
     "the write-up's H11: the same unit as a ruler for military prices, 56x its channel; its description prices the Big Mac at $5.79 (2025)"),
    ("SOVIEL KOSTET DAS COLLEGE IN DEN USA!", "Die Achtermeiers in Texas", 15000, 95914, "2025-11-01",
     "German; the same College Board rows (2024-25 prices: community, in-state, out-of-state, private), in dollars"),
    ("Going to a big college vs community college", "Matthew McKenna", 26300, 30057, "2025-10-24", "the first row against the rest, as an opinion"),
    ("Why are Big Mac prices studied by economists?", "Uptin", 273000, 22778, "2023-02-19", "the unit's own story"),
    ("How Much Should You Save for College?", "Beyond the Waypoint", 162, 750, "2026-03-03", "names the same four paths"),
    ("What Is The Average College Tuition Cost? - College Admissions Insider", "College Admissions Insider", 94, 445, "2025-08-15", "3:24 long; the same rows, explained"),
]
SAME_IDEA_HEADING = "**2. The four rows are a known list; nobody prices them in Big Macs (vidIQ YouTube search, under 4 min, by relevance).**"
SAME_IDEA_MD = [
    "A search for college tuition in Big Macs returned nothing on topic. The College Board's four rows travel as a plain list in dollars (a German Short with the same rows, 95,914 views), "
    "and the community-college question travels as an opinion ('Going to a big college vs community college', 30,057).",
    "",
    "The unit is proven on its own: HD Guy's 'Cost in Units of Big Macs' (1,749,195 views, 56x) used it on military prices. HD Guy's 'University Degrees' as the unit got 64,954 "
    "(the write-up's contrast), which is why this Short keeps college as the subject and the Big Mac as the ruler, and the title asks in that order.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by relevance): no Short prices college in Big Macs. The four College Board rows appear as a list in dollars (95,914 views, German) "
                  "and community college vs university as an opinion (30,057). HD Guy's Big Mac ladder (1,749,195) shows the unit travels.")

OUTLIERS = [
    {"handle": "@tineocollegeprep", "platform": "Instagram", "id": "DeTE825Ph12",
     "on_screen": "Top ROI Colleges Best Value Schools",
     "views": "1.1M (24.3x the account median of 45.9K)",
     "note": "a static ranked list with music only, looped: a save-able college-cost table, like this Short's four-row recap"},
    {"handle": "@highiquniversity", "platform": "Instagram", "id": "Db6qWHvpplO",
     "on_screen": "Community College Is For Bums 🥀", "views": "796.9K (19.7x the account median of 40.4K)",
     "note": "the community-college stigma, argued against on cost"},
    {"handle": "@dani_versity", "platform": "TikTok", "id": "7672219409624108319",
     "on_screen": "community college is for bums 😭🙏", "views": "628.6K (6.9x the account median of 91.3K)",
     "note": "the same argument on TikTok"},
    {"handle": "@mikelrutkowski", "platform": "TikTok", "id": "7672201465414421774",
     "on_screen": "College degrees ranked by ROI", "views": "385.3K (54.5x the account median of 7.1K)",
     "note": "a ranked list filled in on screen, row by row"},
    {"handle": "@remyw.anders", "platform": "Instagram", "id": "Da-l8UzPT5G",
     "on_screen": "Well, my grandkids ain't going to college now.", "views": "424.2K (39.4x the account median of 10.8K)",
     "note": "rising tuition as a skit"},
]
OUTLIERS_HEADING = "**3. College-cost rankings travel on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@tineocollegeprep** (Instagram), \"Top ROI Colleges Best Value Schools\": 1.1M (24.3x). A static ranked list with music only, looped: the save-able table, like this Short's recap and its Instagram cover.",
    "- **@highiquniversity** (Instagram), \"Community College Is For Bums 🥀\": 796.9K (19.7x), and **@dani_versity** (TikTok), the same line: 628.6K (6.9x). The community-college row is a live argument; this Short prices it instead of arguing it.",
    "- **@mikelrutkowski** (TikTok), \"College degrees ranked by ROI\": 385.3K (54.5x). A ranked list filled in on screen, row by row, as this Short's header promises.",
    "- **@remyw.anders** (Instagram), \"Well, my grandkids ain't going to college now.\": 424.2K (39.4x). Rising tuition as a skit.",
    "- Ranked, row-by-row lists of college costs travel on both platforms; none prices them in a unit the viewer buys.",
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
    "The channel's 'big number in everyday things' Shorts are among its best: the $1M stack (1,221 views on YouTube, this Short's related video; 5,449 plays and 83.1% watched on Instagram). "
    "06c (760 views, 1,711 plays) and 06b (Mon 12 Oct 12:14 ET: 75 views so far) are too young to compare.",
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
    "The write-up's College Board figures were read from search text that quotes the report plus one independent summary (collegeboard.org was blocked), then confirmed by its verifier. "
    "The $6.22 Big Mac was read from The Economist's own dataset on GitHub.",
    "The same-idea and outlier posts' own figures (HD Guy's $5.79 Big Mac, the German Short's 2024-25 prices) are theirs, not verified here, and not in the copy.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "9 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "100 credits for this teaser by listed cost (6 keyword queries, 3 YouTube searches, 1 Instagram/TikTok outlier search, 9 title scores and 1 re-score; 5 each), plus 10 shared across 08a-08c for the channel's stats and Shorts list (Instagram owner insights cost 0). "
                     "Adversarial check: 10 for this teaser (the pick's title score, 'student loans'), plus 5 shared across 08a-08c for the related videos' titles; 60 for the three 08 sheets (balance 3,790 → 3,695, a 95 drop shared with sheets built in parallel).",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/08-unit-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/08-unit-ladder.py; "
                "every row re-divided by $6.22 in MATH_RELATIONS (667, 1,921, 5,125, 7,235), the ≈ 10.8 ratio in dollars and in Big Macs, and the pinned full-budget figures ($261,880, 42,103, 115 years, $123,960, 19,929); "
                "COPY_RULES keep every count beside its own row, keep every rounded figure 'about' or '≈', keep 10.8 as community-college years, keep the full-budget figures with 'housing, food and books', "
                "keep each row's price paired with its own count, and keep 'tuition & fees' and 'before grants' in the description, the caption and the pinned comment. "
                "Re-run at the adversarial check (2026-10-13) with the same result")
VIDIQ_REQUERIED = ("pulled 2026-10-13: college 120,886 / 65.5; student loans 47,897 (+105.6%); big mac 33,042; big mac index 9,861; "
                   "title scores 97 (pick), 81 (write-up title); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried after the build: the pick's title score 97. Match. "
                   "Re-queried at the adversarial check: the pick's title score 97; student loans 47,897 / 53.1 (+105.6%); hJBvmGA6sZ0's title as in the related-video pick (1,222 views). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/08-unit-ladder.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 08c maths table: $4,150 ÷ $6.22 = 667.20 ≈ 667; $11,950 → 1,921.22 ≈ 1,921; "
    "$31,880 → 5,125.40 ≈ 5,125; $45,000 → 7,234.73 ≈ 7,235; $45,000 ÷ $4,150 = 10.843 ≈ 10.8 (the same in Big Macs); pinned 4 × $65,470 = $261,880 → 42,102.89 ≈ 42,103, ÷ 365 = 115.35 ≈ 115 years; "
    "4 × $30,990 = $123,960 → ≈ 19,929. The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 9 titles scored against this channel: the pick 97, the write-up's title 81. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 97, as first scored. At the adversarial check: the pick's title score 97; 'student loans' 47,897 / 53.1 (+105.6%); "
    "the related video `hJBvmGA6sZ0`'s title as in the pick (1,222 views, 1,221 at the first build). All match.",
    "- **Changed at the adversarial check.**",
    "  - The numbers check let a wrong price through: 'In-state: $31,880 ÷ $6.22 ≈ 1,921 Big Macs' passed, because the count sat beside its own row. `COPY_RULES` now pair each row's price with its own count "
    "($4,150 → 667, $11,950 → 1,921, $31,880 → 5,125, $45,000 → 7,235, in the 11 places a price is followed by a count). The swap now fails by name, as do a wrong price in the long alt text and in the description.",
    "  - The 'also scored' hashtag title is written in lower case; its note now says to use the description's capitalisation if it is ever picked, which the builder's check requires.",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/08-unit-ladder.py` (see the 08a sheet).",
    "- **Mutation test.** Six breaks on scratch copies of this file all fail by name: two rows' counts swapped, '≈ 10.8×' instead of community-college years, 'before grants' dropped from the pinned comment, a full-budget figure before its basis, a spelled-out 'four', and counts in the title. (19 of 19 across 08a-08c.) At the adversarial check, three more on scratch copies also fail by name: $31,880 on the in-state row of the caption, $45,000 on the out-of-state row of the long alt text, and $31,880 on the private row of the description.",
    "- **Kept on purpose.**",
    "  - The YouTube thumbnail is frame 1 (one row pre-filled, as the hook designs it) and the Instagram cover is the end state, as the write-up's Instagram note asks. The no-result rule covers the title and the caption's first 125 characters.",
    "  - 'A year of college' in the title, as the header's 'your year': the description's first line and the caption's first sentence both say it is 1 year of published tuition & fees.",
    "  - The College Board's 2-year and 4-year categories are written with digits, and 'One private year' is the only spelled-out number (the verdict's own words).",
    "  - The full-budget figures ($65,470 a year, ≈ 42,103 Big Macs, ≈ 115 years) stay in the pinned comment, labelled, as in the write-up.",
    "- **Checked and kept.** Every figure in the copy against the 08c maths table and the check's output (each row re-divided, the 10.8 both ways, the pinned budgets); the limits; "
    "'Big Mac' only as the unit, McDonald's, The Economist and the College Board in the affiliation line of both long texts, no handles; frame 1 (thumbnail: the community row pre-filled, as the hook designs it) "
    "and frame 600 (cover) read from the render, and the covers re-exported byte for byte.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 08c maths table (teasers/v2/08-unit-ladder.md, section 08c) and
# recomputed below from its inputs; dates are the sources' dates, quoted from the write-up.
FIGURES = {
    "$6.22", "$4,150", "$11,950", "$31,880", "$45,000", "667", "1,921", "5,125", "7,235", "10.8",
    "$65,470", "$261,880", "42,103", "115", "$123,960", "19,929", "1", "2", "4", "2025", "26", "2026",
}
from fractions import Fraction as _F
_mac = _F(622, 100)
_rnd = lambda x: int(x + _F(1, 2))
_rows = {"community": 4150, "in-state": 11950, "out-of-state": 31880, "private": 45000}
MATH_RELATIONS = [
    ([_rnd(_F(c) / _mac) for c in _rows.values()] == [667, 1921, 5125, 7235] and all(_F(c) / _mac != _rnd(_F(c) / _mac) for c in _rows.values()),
     "÷ $6.22: ≈ 667 / ≈ 1,921 / ≈ 5,125 / ≈ 7,235 Big Macs (none exact, so '≈')"),
    (round(45000 / 4150, 1) == 10.8 and abs(float((_F(45000) / _mac) / (_F(4150) / _mac)) - 45000 / 4150) < 1e-12,
     "$45,000 ÷ $4,150 = 10.843 ≈ 10.8, the same ratio in Big Macs"),
    (4 * 65470 == 261880 and _rnd(_F(261880) / _mac) == 42103 and _rnd(_F(261880) / _mac / 365) == 115, "pinned: 4 × $65,470 = $261,880 ≈ 42,103 Big Macs, ≈ 115 years of one a day"),
    (4 * 30990 == 123960 and _rnd(_F(123960) / _mac) == 19929, "pinned: 4 × $30,990 = $123,960 ≈ 19,929 Big Macs"),
]
MATH_SCRIPT = "publishing/data/checks/08-unit-ladder.py"
MATH_KEY_LINES = ["08c private full budget          $65,470  $261,880  ≈ 42,103  ≈ 115 years", "08c 4 yrs in-state all-in        $123,960  ≈ 19,929",
                  "$45,000 ÷ $4,150 ≈ [10.8] community-college years"]
RESULT_RE_TITLE = r"667|1,921|5,125|7,235|10\.8|≈"
RESULT_RE_CAPTION = r"667|1,92|5,12|7,23|10\.8|≈|about|\$"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda: [ln for v in _COPY.values() for ln in v.split("\n")]
_LABELS = {"667": r"[Cc]ommunity", "1,921": r"[Ii]n-state", "5,125": r"[Oo]ut-of-state", "7,235": r"[Pp]rivate"}
_ANY_LABEL = _re.compile(r"[Cc]ommunity|[Ii]n-state|[Oo]ut-of-state|[Pp]rivate")


def _labelled(count, label, reach=70):
    """every occurrence of count has its own row's label within reach on the same line, with no other row's label between them"""
    return all(any(abs(lab.start() - m.start()) <= reach
                   and not _ANY_LABEL.search(ln[min(lab.end(), m.end()):max(lab.start(), m.start())]) for lab in _re.finditer(label, ln))
               for ln in _lines() for m in _re.finditer(_re.escape(count), ln))


def _approx(pat):
    """every occurrence of pat comes right after '≈ ' or 'about '"""
    return all(_re.search(r"(?:≈|about) $", v[max(0, m.start() - 6):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
_PRICE = {"$4,150": "667", "$11,950": "1,921", "$31,880": "5,125", "$45,000": "7,235"}
_PAIRS = [(m.group(1), m.group(2)) for v in _COPY.values() for m in _re.finditer(
    r"(\$4,150|\$11,950|\$31,880|\$45,000)\b(?:(?: ÷| divided by) \$6\.22)?[^$\n]{0,30}?\b(667|1,921|5,125|7,235)\b", v)]
COPY_RULES = [
    (len(_PAIRS) >= 11 and all(_PRICE[p] == c for p, c in _PAIRS),
     "each row's price is followed only by its own count ($4,150 → 667, $11,950 → 1,921, $31,880 → 5,125, $45,000 → 7,235)"),
    (all(_labelled(c, lab) for c, lab in _LABELS.items()), "each count sits beside its own row (667 community, 1,921 in-state, 5,125 out-of-state, 7,235 private)"),
    (all(_approx(p) for p in (r"\b667\b", r"1,921", r"5,125", r"7,235", r"10\.8", r"42,103", r"115 years", r"19,929")),
     "every rounded figure comes with '≈' or 'about'"),
    (all(v[m.end():m.end() + 23] == " community-college year" for v in _COPY.values() for m in _re.finditer(r"10\.8", v)),
     "≈ 10.8 is always 'community-college years' (the verdict's unit)"),
    (all("housing, food and books" in v[max(0, m.start() - 250):m.start()] for v in _COPY.values() for m in _re.finditer(r"42,103|\$65,470|19,929|\$123,960|115 years|\$261,880", v)),
     "the full-budget figures always follow 'housing, food and books' (within 250 characters)"),
    (all("tuition & fees" in _COPY[k] and "before grants" in _COPY[k] for k in ("description", "caption", "pinned comment")),
     "'tuition & fees' and 'before grants' (the basis) are in the description, the caption and the pinned comment"),
    (all("Not affiliated with or endorsed by McDonald's, The Economist or the College Board." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "'Not financial advice.' and the McDonald's / Economist / College Board affiliation line are in the description and the caption"),
    ({w.lower() for w in _NUMBER_WORDS.findall(_ALL)} <= {"one"} and all(_re.match(r"(?i)one private year", _ALL[m.start():m.start() + 16]) for m in _re.finditer(r"(?i)\bone\b", _ALL)),
     "no spelled-out figures except the verdict's 'One private year'"),
    (not _re.search(r"@mcdonalds|@theeconomist|@collegeboard", _ALL, _re.I), "no brand handles"),
    (not _re.search(r"(?i)\bworth it\b|\byou should\b|\bmust\b|\bchoose\b|\bbetter deal\b", _ALL), "no advice wording (nothing on which school is worth it)"),
]
