# 05b publishing data: $1,200 rent on 50/30/20 leaves food and every bill this much a day (Becker Rig, split-sheet).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig precedent), laid out like 06b and the sheets of the same batch.
#
# Facts come only from teasers/v2/05-split-sheet.md (section 05b) and python3 teasers/v2/checks/05-split-sheet.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense cut: the 05 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (frame 1, the question), so the ship step only re-runs the build with --covers on the final file.

TEASER = "05b Becker Rig, split-sheet: \"Rent $1,200 on 50/30/20? Food and every bill get this much a day\""
PREPARED = "2026-10-13"
SHORT_ID = "05b"
MD_TITLE = "05b publishing sheet: $1,200 rent on the 50/30/20 rule"
MATH_RUN = "560 checks, 0 failed"      # python3 teasers/v2/checks/05-split-sheet.py on studio/specs/ (the full cuts; the check is cut-aware since 2026-10-13)
MATH_RUN_WIP = "583 checks, 0 failed"  # the same check with --spec on the three condensed WIP specs in studio/specs-wip/, re-run at the adversarial check after the condense critic fixes (579 at the first build)
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "435bd70783cf6ca134b52a51c556aa1fd0e328a865e8f60aa11931384a2cffff"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 05 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (frame 1, the question), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/05-split-sheet.md` (05b) and its check, "
    f"`python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; {MATH_RUN_WIP} with `--spec` on the condensed WIP specs, whose strings, numbers and verdicts are unchanged). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, re-adds the bricks and the pinned comment's other rents, "
    "keeps every $10 'a day', and keeps the copy free of '≈' (nothing in 05b is rounded).",
    "- **Honesty rules kept.** The title asks and never gives the result, and so does the cover (frame 1, the '$?' slot). The Instagram caption keeps every result below 'more'. "
    "Every claim stays inside the video's verdict, \"$1,200 rent leaves food and every bill $10 a day\", and the copy says its conditions: $3,000 a month after tax, a 30-day month, and example numbers, not statistics. "
    "The copy never says whether anyone can afford anything: no advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Source.** The rule is Elizabeth Warren and Amelia Warren Tyagi's (All Your Worth, 2005), named as the write-up's caption names it: as the rule's origin, not as an endorsement. No company or brand is named.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (hook pass 2 + QA fix pass, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": f"the 05 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay): the WIP cut is studio/specs-wip/05b-becker-rig-3000-paycheck.json, 13.95 s with the card per the write-up, and passes the 05 check with --spec ({MATH_RUN_WIP} for the three). "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/05-split-sheet.md section 05b; teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "rule": "50/30/20 of after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments (Elizabeth Warren & Amelia Warren Tyagi, All Your Worth, 2005, via two independent summaries); rent is a need",
    "inputs": "$3,000 a month after tax and $1,200 rent: example inputs, not statistics (both in the footer); a 30-day month",
    "bricks": "$3,000 ÷ 10 = $300 a brick; needs 5 bricks ($1,500), wants 3 ($900), savings 2 ($600); rent 4 bricks ($1,200)",
    "food_and_bills": "$1,500 − $1,200 = $300 a month, 1 brick, 10% of take-home; $300 ÷ 30 = $10 a day (in an average 30.44-day month $9.86, which still rounds to $10)",
    "belief": "'my rent is under half my take-home, so 50/30/20 works': rent is 40%, under the 50% line, and food and every bill still get only 10%",
    "check": "$1,200 + $300 + $900 + $600 = $3,000; shares 40 + 10 + 30 + 20 = 100; bricks 4 + 1 + 3 + 2 = 10; nothing rounded, so no '≈'",
    "pinned_rents": "on $3,000: $1,000 rent leaves $500 = $16.67 a day; $1,400 leaves $100 = $3.33 a day; $1,500 leaves $0; on $4,000 with $1,200 rent: $800 = $26.67 a day",
    "verdict": "$1,200 rent leaves food and every bill $10 a day",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "The 50/30/20 Rule With $1,200 Rent: How Much a Day for Food and Every Bill?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 96,
     "note": "PICK. Tied top score of the 10 scored. It opens on the exact phrase '50/30/20 rule' (19,324 searches a month), names the viewer's input ($1,200 rent) and asks in the video's own words ('food and every bill', a day). "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "Does the 50/30/20 Rule Work With $1,200 Rent? How Much a Day for Food and Bills?", "vidiq_score": 96,
     "note": "The same score, 5 characters longer. 'Does it work?' asks for a yes/no judgment the video leaves to the viewer: its verdict is a number ($10 a day), not a ruling."},
    {"rank": 3, "title": "The 50/30/20 Rule With $1,200 Rent: How Much a Day for Food and Bills?", "vidiq_score": 94,
     "note": "The pick with 'Bills' for 'Every Bill': 2 points lower; 'every bill' is the header's and the verdict's own phrase."},
]
YT_TITLES_ALSO_SCORED = [
    ("50/30/20 Budget on $3,000 With $1,200 Rent: How Much Is Left for Food a Day?", 90, "both inputs"),
    ("The 50/30/20 Rule With $1,200 Rent: How Much a Day for Food? #503020 #budgeting #rent", 90, "the house 3-hashtag form"),
    ("Does the 50/30/20 Rule Work If Your Rent Is $1,200?", 88, ""),
    ("50/30/20 Rule With $1,200 Rent: How Much a Day for Food and Bills?", 87, "option 3 without 'The'"),
    ("Rent $1,200 on 50/30/20? Food and Every Bill Get This Much a Day", 86, "the on-screen header"),
    ("Pay $1,200 Rent? 50/30/20 Leaves Food and Bills How Much a Day?", 82, "the write-up's title"),
    ("The 50/30/20 Rule on a $3,000 Paycheck With $1,200 Rent", 73, "no question: 21 points lower"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 82 to 96. '50/30/20 Rule' is the first 17 characters, so the searched phrase shows however short the title is cut; "
    "the viewer's own input, '$1,200 Rent', follows, and the question asks for the answer in the unit the video gives it (a day).",
    "It names no result: not the $300 brick, not the 10% and not $10 a day. '$1,200' is the input the viewer holds up against their own rent, as in the header.",
    "Options 1 and 2 tie at 96; the pick is decided on shape (a question that asks for a number, not for a ruling) and length (75 vs 80 characters). vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """The 50/30/20 rule with $1,200 rent: how much a day is left for food and every bill? On $3,000 a month after tax, $10 a day.

The math, shown ($3,000 a month after tax, $1,200 rent, a 30-day month):
• $3,000 ÷ 10 = $300 a brick: 10 bricks.
• 50/30/20 gives needs 50% (5 bricks, $1,500), wants 30% (3 bricks, $900) and savings 20% (2 bricks, $600).
• Rent is a need: $1,200 = 4 bricks.
• So food and every other bill share the last brick: $300 a month.
• $300 ÷ 30 = $10 a day.
• Check: $1,200 + $300 + $900 + $600 = $3,000.
Rent at 40% of take-home is under the 50% line, and it still leaves food and every bill 10%.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. The 50/30/20 rule (Elizabeth Warren and Amelia Warren Tyagi, All Your Worth, 2005) splits after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments. Rent is a need, so whatever rent leaves of the needs half is what food and every other bill share. $3,000 take-home and $1,200 rent are example numbers, not statistics; in an average 30.44-day month the $300 is $9.86 a day. Not financial advice.
#503020rule #budgeting #rent"""
DESC_MULTIBYTE = "`•`, `÷`, `—`"
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 03a.")

YT_HASHTAGS = ["#503020rule", "#budgeting", "#rent"]
YT_HASHTAG_NOTES = [
    ("#503020rule", "the rule ('50/30/20 rule' 19,324 searches a month, flat; '50/30/20 budget' 17,517, +169.5%). The write-up's `#503020` gets a word on the end: a hashtag of digits only does not link reliably."),
    ("#budgeting", "the topic ('budgeting' 166,248 a month at competition 25.8, the cluster's top opportunity)."),
    ("#rent", "the viewer's own input ('rent' 67,558 a month, down 27.3% on its baseline)."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["50/30/20 rule", "50/30/20 budget", "50 30 20 rule", "the 50 30 20 rule", "50 30 20 budget rule explained",
           "how much rent can i afford", "rent", "budgeting", "how to budget", "budgeting tips", "budgeting for beginners",
           "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'how much rent can i afford' (3,386, an older snapshot) is the viewer's own question; "
             "the video does not answer it for them, it shows what one rent leaves. Left out on purpose: 'why is rent so high' (7,855, +81.4%) is housing-market news, and 'how to save money' (201,913) is advice intent.")

YT_PINNED = """What's your rent, in bricks?

Take-home ÷ 10 = 1 brick, and needs get 5. Whatever rent doesn't take is food and every bill. On $3,000: $1,000 rent leaves $500 = $16.67 a day; $1,400 leaves $100 = $3.33 a day; $1,500 leaves $0. On $4,000 with $1,200 rent: $800 = $26.67 a day (30-day months)."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's own pinned ask, and the brick count lets every viewer run it on their own rent (R3). "
               "Yannick's 'run the numbers with your own income' CTA drew 79 comments on 50,206 plays (the write-up), and rent replies can become reply videos. "
               "The other rents are the write-up's own, checked by its script.")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months.",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "The same viewer, a monthly budget under pressure. It is October's debt Short (642 views), and its Instagram twin is the channel's best Reel (7,302 plays, 27.4% skip). "
                    "(June's 'Why the minimum payment keeps you in debt for 19 years' has more views, 1,230, but is an older, narrated Short.)"},
    "swap_when_live": "01b ($20 an hour) or 01c ($60k a year), the paycheck series, once published; then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame (the write-up's cover; the same content as the IG cover)."
THUMB_MD = ("in the YouTube app, pick frame 1 (the question with its '$?' slot, the $3,000 slab and the four bins, the 10% bin visibly the smallest), the same content as the Instagram cover below. "
            "On the condensed cut frame 1 also carries the complete hook caption, as the write-up's condense rule asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 05a and 05c. Suggested order within the series: 05c, then 05b, then 05a.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: '50/30/20 budget' runs +169.5% and 'budgeting tips' +154.7% over their 30-day baselines, so 05b goes second, soon after 05c.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("The 50/30/20 rule gives needs half of your take-home. On $3,000 a month after tax with $1,200 rent, "
           "how much a day is left for food and every bill?")

IG_CAPTION = IG_HOOK + """

$10 a day.

The math, shown:
• $3,000 ÷ 10 = $300 a brick: 10 bricks.
• Needs get 50%: 5 bricks, $1,500. Wants 30%: 3 bricks, $900. Savings 20%: 2 bricks, $600.
• Rent eats 4 bricks: $1,200.
• Food and every other bill share the last brick: $300 a month. $300 ÷ 30 = $10 a day.
• Check: $1,200 + $300 + $900 + $600 = $3,000.

Rent at 40% of take-home is under the 50% line, and it still leaves food and every bill 10%.

The rule (Elizabeth Warren and Amelia Warren Tyagi, All Your Worth, 2005) splits after-tax pay: 50% needs, 30% wants, 20% savings and extra debt payments. $3,000 take-home and $1,200 rent are example numbers, with a 30-day month. Not financial advice.

What's your rent, in bricks?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#503020rule #budgeting #budgetingtips #rent #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the rule, both inputs ($3,000 a month after tax, $1,200 rent) and the question, no result: "
                   "the caption overlays the Reel from frame 1, so the $300 brick and the $10 a day sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the rule's needs half, the two inputs and the header's question, with no result. The write-up's caption line 1 is the verdict ('$10 a day for food and every bill.'); "
    "the house rule moves it below 'more', because the caption overlays the Reel from frame 1. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "Nothing in 05b is rounded, so the copy carries no '≈' or 'about'; the conditions (after tax, example numbers, a 30-day month) sit under the math.",
    "The closing question is the write-up's pinned ask. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#503020rule", "#budgeting", "#budgetingtips", "#rent", "#personalfinance"]
IG_HASHTAG_MD = [
    "One is the write-up's own, made linkable (`#503020` becomes `#503020rule`; its `#budgetmath`, `#backoftheenvelope` and `#moneymath` give way):",
    "",
    "- `#503020rule` names the rule; `#budgeting` and `#budgetingtips` the topic ('budgeting tips' +154.7% on YouTube); `#rent` the viewer's own input.",
    "- The 50/30/20 outliers in the research (@smobydayig, @yomamafinances) are budgeting Reels, so the budgeting layer is the one that travels.",
    "",
    "`#personalfinance` is the broad layer, as on 06b, 06c and 03a.",
]

IG_ALT_SHORT = "Chart: $3,000 take-home in $300 bricks. $1,200 rent leaves food and every bill $10 a day."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It needs no 'about': "
                     "every figure in 05b is exact, and it keeps the verdict whole.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes plain words, not symbols, so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white background. The header asks: rent $1,200 on 50/30/20? Food and every bill get this much a day, with an empty answer slot. "
               "A stick figure on a gold $3,000 take-home slab cracks it into 10 bricks of $300. Rent takes 4 bricks, $1,200. "
               "A bracket marks needs at 50%, 5 bricks, so food and every bill get the 1 brick left: $300 a month, and $300 ÷ 30 = $10 a day, which stamps into the header's slot. "
               "Wants get 3 bricks, $900, and savings 2, $600. The check reads $1,200 + $300 + $900 + $600 = $3,000. "
               "Verdict: $1,200 rent leaves food and every bill $10 a day.")

IG_FIRST_COMMENT = ("$1,200 rent on $3,000 a month after tax leaves food and every bill $10 a day under 50/30/20 (30-day month). "
                    "What's your rent, in bricks? Take-home ÷ 10 = 1 brick; needs get 5.")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up names frame 0 as the cover ("header with its '$?' slot, slab, the tiny
# 10% bin"). On this render frame 0 is the only frame with no caption: from frame 1 the first caption word fades in.
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("Frame 1, the question, as the write-up names it: the header 'Rent $1,200 on 50/30/20? Food and every bill get this much a day:' with its dashed '$?' answer slot, "
                          "the footer 'ASSUMES $3,000 a month after tax · $1,200 rent · 30-day month', the gold 'TAKE-HOME, A MONTH $3,000' slab scored at its brick seams with the figure on it, "
                          "and the four empty bins RENT 40% · FOOD + BILLS 10% · WANTS 30% · SAVINGS 20%, the 10% bin visibly the smallest. It asks and does not answer, like the title and the caption. "
                          "On any cut, use frame 1: on the condensed cut it also carries the complete hook caption ('Ten bricks of $300. Rent eats four.'), as the write-up's condense rule asks "
                          "(frame 1 is the thumbnail), and the answer, $10 a day, is still not on it.")
COVER_FRAME_MEASURED = ("On the pre-condense 24.6 s render the first frame (index 0, 0.00 s) is that clean frame, and the only one: from the second (index 1, 0.03 s) the first caption word ('Ten') starts to fade in "
                        "(frame-to-frame mean luma change 0.0004), and the cleaver comes out after that. On the condensed WIP render the first frame already carries the whole hook caption, and the '$?' slot is still empty.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 0 to 1440 of the 1080×1920 frame: the badge (from y 112), the header and its slot, the footer, the slab with the figure and the four bins down to the floor line (y 1302), "
                   "with near-even margins (112 px above, 138 px below); it drops the empty caption band. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the finished state ('$10' in the header slot, the gold 'FOOD + EVERY BILL $10 a day' slab, the check and the verdict). It is the save-worthy frame, "
    "but it shows the answer, and the write-up names frame 1 as the cover (as 06b's write-up does).",
    "**When the condensed cut ships:** re-pick frame 1 by content on the shipped file (now with the hook caption complete on it) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 05b-24.6s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '50/30/20 with $1,200 rent — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 05a and 05c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("50/30/20 rule", 19324, 64.0, 51.8, 57.7, "seed; +0.6% vs its 30-day baseline (19,206)", "2026-10-12"),
    ("50/30/20 budget", 17517, 63.3, 22.3, 69.1, "+169.5% vs its baseline (6,499); low competition", "2026-10-12"),
    ("50 30 20 rule of money", 15265, 62.5, 28.1, 66.2, "-42.2% vs its baseline (26,417)", "2026-10-12"),
    ("50 30 20 budget rule explained", 8289, 58.5, 26.3, 64.6, "+79.0% vs its baseline (4,630)", "2026-10-12"),
    ("the 50 30 20 rule", 7554, 57.9, 36.7, 60.1, "", "2026-10-12"),
    ("50 30 20 rule", 4934, 55.1, 30.3, 61.0, "", "2026-10-07"),
    ("budgeting", 166248, 77.9, 25.8, 76.4, "-26.1% vs its baseline (225,000); the cluster's top opportunity", "2026-10-12"),
    ("how to budget", 66391, 72.0, 33.5, 69.8, "flat (-0.5%)", "2026-10-12"),
    ("budgeting tips", 49832, 70.1, 39.0, 66.5, "+154.7% vs its baseline (19,564)", "2026-10-12"),
    ("rent", 67558, 72.1, 42.8, 66.1, "-27.3% vs its baseline (92,940)", "2026-10-12"),
    ("why is rent so high", 7855, 58.1, 40.8, 58.6, "+81.4% vs its baseline (4,331); housing news, not in the tags", "2026-10-12"),
    ("how much rent can i afford", 3386, 52.7, 34.9, 57.7, "the viewer's own question", "2026-02-25"),
]
KEYWORD_MD_NOTE = {"why is rent so high": "+81.4%; housing news, not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; two rows are older snapshots (2026-02-25 and 2026-10-07).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Two rows are older snapshots.")
KW_OUTRO = ("The rule is searched by name in every spelling: '50/30/20 rule' (19,324, flat), '50/30/20 budget' (17,517, +169.5%, competition 22.3) and the '50 30 20' variants (4,934-15,265). "
            "So the title opens on '50/30/20 Rule' and the variants go to the tags. 'budgeting' (166,248) is the cluster's best opportunity (competition 25.8) and leads the hashtags after the rule. "
            "Rent is searched as news ('why is rent so high', +81.4%) and as the viewer's own question ('how much rent can i afford', 3,386); the video answers neither for them, it shows what one rent leaves, so only the second is a tag.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("50/30/20 Budget Rule for $20/hour #budgeting", "Kasey Gammons", 6700, 951837, "2022-11-29",
     "51 s; outlier score 11,467.9; the rule run on one pay figure"),
    ("How I Budget My 105K Salary", "Margaret Skiff", 54600, 606442, "2023-08-01", "59 s; the rule on a real salary"),
    ("The Easiest Budget Ever: 50/30/20 #shorts", "STICKMAN MONEY", 12, 1133, "2026-10-02",
     "a stick-figure explainer on a $3,000 paycheck: the same $1,500 / $900 / $600, with no rent figure and no per-day answer"),
    ("Bills Over 50% Of Your Pay?", "Katrania Lowers", 143, 1118, "2026-09-20", "30 s; the same tension (needs over half), told, not counted"),
    ("$4,200 Monthly Take-Home: How Much Should You Actually Save?", "The Money Muse", 173, 939, "2026-04-18", "rent at $1,400 on a calculator"),
    ("$3,500/Month Take-Home: Can You Actually Afford to Live Alone in 2026?", "The Money Muse", 173, 506, "2026-04-11", "median rent on a calculator"),
    ("The Hidden Rule Poor People Follow Without Realizing It", "The Wealth Logic", 21, 189, "2026-07-02", "2:27; argues the rule is out of date (not verified here)"),
]
SAME_IDEA_HEADING = "**2. The 50/30/20 split is everywhere on YouTube; rent's per-day answer is not (vidIQ YouTube search, under 4 min, by views).**"
SAME_IDEA_MD = [
    "The rule run on one pay figure is a proven Short: Kasey Gammons' '50/30/20 Budget Rule for $20/hour' (951,837 views from 6,700 subscribers) and Margaret Skiff's '$105K' (606,442). "
    "This month a stick-figure channel posted the same $3,000 split ($1,500 / $900 / $600) as STICKMAN MONEY's 'Easiest Budget Ever' (1,133), with no rent figure in it.",
    "",
    "The rent tension is being told, not counted: 'Bills Over 50% Of Your Pay?' (Sept 2026) and The Money Muse's take-home calculators say the rule 'breaks', but none read here "
    "takes a rent out of the needs half and prices what is left per day. That unit ($10 a day) is this Short's own, so the title asks for it.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views): the rule on one paycheck breaks out (Kasey Gammons 951,837; Margaret Skiff 606,442); "
                  "a stick-figure Short posted the same $3,000 split this month (1,133) without a rent figure. None read here prices what rent leaves of the needs half per day.")

OUTLIERS = [
    {"handle": "@tylerworley3", "platform": "TikTok", "id": "7673258359549693214",
     "on_screen": "Budget my paycheck ($713.59)", "views": "768.2K (18.7x the account median of 41K)",
     "note": "one real paycheck, split on camera"},
    {"handle": "@moneymovesjake", "platform": "TikTok", "id": "7664616112612494623",
     "on_screen": "People think $20,000 a month automatically means you're rich", "views": "604.4K (139.3x the account median of 4.3K)",
     "note": "a belief named on screen, then a text budget that tests it"},
    {"handle": "@yomamafinances", "platform": "TikTok", "id": "7676636562909580557",
     "on_screen": "Why Your", "caption": "Why yo mama use the 50/30/20 budget", "views": "573.4K (51.4x the account median of 11.2K)",
     "note": "an animated 50/30/20 explainer: the closest format"},
    {"handle": "@smobydayig", "platform": "Instagram", "id": "DZYo5e3ldvQ",
     "on_screen": "how I would budget: $1200 bi-weekly paycheck", "views": "468.2K (94.1x the account median of 5K)",
     "note": "the 50/30/20 rule on one paycheck"},
    {"handle": "@everydayfinance101", "platform": "TikTok", "id": "7666850547235867935",
     "on_screen": "I make $65k/year & feel broke", "views": "53.8K (28.3x the account median of 1.9K)", "note": "a salary that 'should' work, line by line"},
]
OUTLIERS_HEADING = "**3. One paycheck through a rule travels on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@tylerworley3** (TikTok), \"Budget my paycheck ($713.59)\": 768.2K (18.7x). One real paycheck, split on camera.",
    "- **@moneymovesjake** (TikTok), \"People think $20,000 a month automatically means you're rich\": 604.4K (139.3x). A belief on screen, then the budget that tests it: this Short's shape.",
    "- **@yomamafinances** (TikTok), \"Why yo mama use the 50/30/20 budget\": 573.4K (51.4x). An animated 50/30/20 explainer, the closest format.",
    "- **@smobydayig** (Instagram), \"how I would budget: $1200 bi-weekly paycheck\": 468.2K (94.1x). The rule on one paycheck.",
    "- **@everydayfinance101** (TikTok), \"I make $65k/year & feel broke\": 53.8K (28.3x).",
    "- Each opens on the pay figure or the belief, with no answer on screen: the shape of this Short's frame 1 and of the caption's first line. None prices rent's leftover per day.",
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
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; refreshed 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,518 views in 30 days.",
    "",
    "The nearest proven topic is a monthly payment under pressure: the 5 Oct '$5,000 on the minimum' Reel (debt payoff, not budgeting) leads the channel on Instagram plays (7,302) and skip rate (27.4%). "
    "The channel has no budgeting-rule Short yet; June's 'What You ACTUALLY Spend on Subscriptions Every Month' (`GZVld5Pt4WM`, 24 views) is the nearest. "
    "06b (Mon 12 Oct, 12:14 ET) and 06c (Mon 12 Oct, 03:45 ET) are too young to compare.",
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
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "@envelopemath's YouTube Analytics (audience hours, geography) were not read here; the 06b and 06c sheets found vidIQ's YouTube authorization is a different channel. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the write-up's and the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The rule's definition rests on two independent summaries of the book (Wealthsimple; Citizens Bank, via search on Oct 7, 2026); the book itself was not opened (the write-up's sources). "
    "$3,000 and $1,200 are example inputs, not statistics, and the copy says so.",
    "The same-idea Shorts' claims (the rule 'breaks', is 'out of date') are their own, not verified here, and none is in the copy.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "85 credits for this teaser (4 keyword queries, 1 YouTube search, 1 Instagram/TikTok outlier search, 10 title scores and 1 re-score; 5 each), plus 10 shared across 05a-05c for the channel's stats and Shorts list (Instagram owner insights cost 0). "
                     "The adversarial check used 40 more across 05a-05c at 5 each: 3 title scores, 3 keyword re-queries, 1 lookup of the 3 related videos and 1 list of the channel's Shorts by views; Instagram owner insights cost 0. The account's shared balance went 3,885 → 3,795 over the check, because other agents draw on it in parallel.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), and {MATH_RUN_WIP} with --spec on the condensed WIP specs, whose strings, numbers and verdicts are the same; "
                "the bricks, the bins, the $10 a day (and $9.86 in a 30.44-day month) and the pinned comment's other rents recomputed in MATH_RELATIONS; "
                "COPY_RULES keep every $10 'a day', keep the copy free of '≈' and 'about', keep $1,200 named as rent, keep the after-tax and 30-day conditions in the copy, and allow no judgment of what anyone can afford; "
                "re-run at the adversarial check with the same result (583 with --spec after the condense critic fixes)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: 50/30/20 rule 19,324 / 51.8 (+0.6%); 50/30/20 budget 17,517 / 22.3 (+169.5%); budgeting 166,248 / 25.8 (-26.1%); "
                   "title scores 96 (pick), 82 (write-up title), 90 (best hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried after the build: the pick's title score 96. Match. "
                   "Re-queried at the adversarial check: the pick's title score 96; '50/30/20 budget' 17,517 / 22.3 (+169.5%, snapshot 2026-10-12); the related video 8__HTUa2PoU 642 views; "
                   "the channel's Shorts by views put June's narrated debt Short (iQD6UlkCEqs, 1,230) above it; Instagram 8 followers, 20,520 views in 30 days.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` ({MATH_RUN_WIP} with `--spec` on the condensed WIP specs). Every public figure traces to the 05b maths table: $3,000 ÷ 10 = $300; needs 5 bricks ($1,500), wants 3 ($900), savings 2 ($600); "
    "rent 4 bricks ($1,200, 40%); food and every bill $1,500 − $1,200 = $300 (1 brick, 10%); $300 ÷ 30 = $10 a day ($9.86 in a 30.44-day month); $1,200 + $300 + $900 + $600 = $3,000. "
    "Pinned: $500 ÷ 30 = $16.67, $100 ÷ 30 = $3.33, $0, $4,000 ÷ 2 − $1,200 = $800, ÷ 30 = $26.67. The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 96 (tied with option 2), the write-up's title 82. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 96, as first scored. Again at the adversarial check: the pick 96; '50/30/20 budget' 17,517 / 22.3 (+169.5%); "
    "8__HTUa2PoU 642 views. All match.",
    "- **Mutation test.** Seven breaks on scratch copies of this file all fail by name: a bare '$10' without 'a day', 'About $10 a day', a title that gives the answer, 'example numbers' dropped from the caption, a 'can't afford' judgment, a wrong pinned figure ('$16.66'), and the $300 brick moved above the fold. (22 of 22 across 05a-05c.)",
    "- **Kept on purpose.**",
    "  - The cover and the YouTube frame are frame 1 (the question, the '$?' slot), as the write-up names; the finished state shows the answer.",
    "  - No 'can you afford it' or 'does it work' in the pick: the video gives a number ($10 a day) and leaves the judgment to the viewer, and the copy does too.",
    "  - `#503020rule`, not the write-up's `#503020`: a digits-only hashtag does not link reliably.",
    "  - The rule's authors are named as its origin (the write-up's caption does the same); no company or brand is named, so there is no affiliation line.",
    "- **Adversarial pass (2026-10-13): changed.**",
    "  - The related video's note called '238 Months' the channel's best debt Short on YouTube. The channel's Shorts by views put June's 'Why the minimum payment keeps you in debt for 19 years' "
    "at 1,230 to its 642 (the 03a sheet's check found the same). The note now says October's debt Short, with the best Reel as its Instagram twin.",
    "  - The research said 'Monthly-budget maths is the channel's best-performing topic on Instagram', citing the '$5,000 on the minimum' Reel, which is debt payoff. "
    "It now calls that the nearest proven topic, a monthly payment under pressure, and says it is not budgeting.",
    "  - The cover's measurement mixed 'frame 1' (the first frame, as the write-up and the YouTube app say) with frame index 1. It now gives indexes, and adds what the condensed WIP render's first frame shows.",
    "  - The maths count with `--spec` on the WIP specs is now 583 checks, 0 failed: the condense's critic fixes split 05b's 'Needs get five.' into its own caption after the first build (579). "
    "No caption word, number or verdict changed, so the copy stands.",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 05b table and both runs of the check (560 on studio/specs/, 583 with --spec), including the pinned comment's other rents; "
    "the title, description (bytes), tags, hashtags, caption (first 125) and both alt texts against the limits; the rule's authors named only as its origin, no brand; no advice and no judgment of what anyone can afford; "
    "the cover and the condensed WIP render's first frame read as stills: the question with its empty '$?' slot, no $10 a day on either.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 05b maths table (teasers/v2/05-split-sheet.md, section 05b) and
# recomputed below; $3,000, $1,200, the 30-day month and the rule's 50/30/20 are the write-up's inputs.
FIGURES = {
    "$3,000", "$1,200", "$300", "$1,500", "$900", "$600", "$10", "$9.86", "30.44",
    "10", "5", "4", "3", "2", "1", "50", "30", "20", "40", "50/30/20", "503020", "2005",
    "$1,000", "$500", "$16.67", "$1,400", "$100", "$3.33", "$0", "$4,000", "$800", "$26.67",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_q = lambda x: _D(x).quantize(_D("0.01"), _UP)
_take, _rent, _days = 3000, 1200, 30
_brick = _take // 10
_needs, _wants, _save = _take * 50 // 100, _take * 30 // 100, _take * 20 // 100
_food = _needs - _rent
_left = lambda take, rent: take * 50 // 100 - rent
MATH_RELATIONS = [
    (_brick == 300 and _take == 10 * _brick, "$3,000 ÷ 10 = $300 a brick: 10 bricks"),
    ((_needs, _wants, _save) == (1500, 900, 600) and (_needs // _brick, _wants // _brick, _save // _brick) == (5, 3, 2),
     "50/30/20: needs $1,500 (5 bricks), wants $900 (3), savings $600 (2)"),
    (_rent == 4 * _brick and _rent * 100 // _take == 40, "rent $1,200 = 4 bricks = 40% of take-home"),
    (_food == 300 == _brick and _food * 100 // _take == 10, "food and every bill: $1,500 − $1,200 = $300 = 1 brick = 10%"),
    (_food / _days == 10 and _q(_D(_food) / _D("30.44")) == _D("9.86"), "$300 ÷ 30 = $10 a day; $9.86 in an average 30.44-day month"),
    (_rent + _food + _wants + _save == _take and 40 + 10 + 30 + 20 == 100 and 4 + 1 + 3 + 2 == 10, "check: $1,200 + $300 + $900 + $600 = $3,000; 100%; 10 bricks"),
    (_rent * 2 < _take, "the belief: rent is under half the take-home"),
    (_left(3000, 1000) == 500 and _q(_D(500) / 30) == _D("16.67"), "pinned: $1,000 rent leaves $500 = $16.67 a day"),
    (_left(3000, 1400) == 100 and _q(_D(100) / 30) == _D("3.33"), "pinned: $1,400 rent leaves $100 = $3.33 a day"),
    (_left(3000, 1500) == 0, "pinned: $1,500 rent leaves $0"),
    (_left(4000, 1200) == 800 and _q(_D(800) / 30) == _D("26.67"), "pinned: $4,000 with $1,200 rent leaves $800 = $26.67 a day"),
]
MATH_SCRIPT = "teasers/v2/checks/05-split-sheet.py"
MATH_KEY_LINES = ["05b  $3,000 ÷ 10 = $300; rule pieces [5, 3, 2] -> [1500, 900, 600]; rent $1,200 = 4 bricks; food + bills $300 = 1 brick = $10 a day"]
RESULT_RE_TITLE = r"(?i)\$10\b|\$300|\$900|\$600|\$1,500|brick|10%|\$9\.86"
RESULT_RE_CAPTION = r"(?i)\$10\b|\$30\b|\$300|\$90|\$60|\$1,5|bric|10%|\$9\.|leaves"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines_of = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _with(pat, needs, skip=()):
    """every line that names pat also matches one of needs (regexes)"""
    return all(any(_re.search(n, ln) for n in needs) for ln in _lines_of(skip) if _re.search(pat, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_re.match(r" a day", v[m.end():]) for v in _COPY.values() for m in _re.finditer(r"\$10\b(?![,.]\d)", v)),
     "every $10 is '$10 a day' (the verdict's unit)"),
    (not _re.search(r"(?i)≈|\babout \$|\baround \$|\broughly\b", _ALL), "nothing in 05b is rounded, so the copy has no '≈', 'about', 'around' or 'roughly'"),
    (_with(r"\$1,200", (r"[Rr]ent", r"Check")), "$1,200 is always named as rent (the check line excepted)"),
    (all(_re.search(r"after tax|take-home", _COPY[k]) for k in ("description", "caption", "first comment", "short alt text")),
     "the take-home is after tax: 'after tax' or 'take-home' is in the description, the caption, the first comment and the short alt text"),
    (all("30-day" in _COPY[k] or "÷ 30" in _COPY[k] for k in ("description", "caption", "pinned comment", "first comment")),
     "the per-day unit's month (30 days) is in the description, the caption, the pinned comment and the first comment"),
    (all("example numbers" in _COPY[k] for k in ("description", "caption")), "the description and the caption say $3,000 and $1,200 are example numbers"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    ({w.lower() for w in _NUMBER_WORDS.findall(_ALL)} <= {"half"}
     and all(_re.search(r"(?:needs|the 50%|needs get) half|half of your take-home|under half", _ALL[max(0, m.start() - 12):m.end() + 18]) for m in _re.finditer(r"\bhalf\b", _ALL)),
     "no spelled-out figures except the rule's needs 'half'"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bafford\b|\bcan't\b|\btoo (?:much|high)\b|\bdoesn't work\b|\bbroke\b", _ALL),
     "no advice and no judgment of what anyone can afford"),
]
