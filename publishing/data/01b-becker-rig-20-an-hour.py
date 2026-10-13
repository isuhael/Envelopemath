# 01b publishing data: you pay 6.2% Social Security; what does a $1M salary pay? (Becker Rig, dead-simple-list).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig sheet). The id keeps its round-2 slug (20-an-hour); since hook pass 2 the topic is the Social Security wage cap.
#
# Facts come only from teasers/v2/01-dead-simple-list.md (section (b) 01b) and python3 teasers/v2/checks/01-dead-simple-list.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "01b Becker Rig, dead-simple-list: \"You pay 6.2% Social Security. What does a $1M salary pay?\""
PREPARED = "2026-10-13"
SHORT_ID = "01b"
MD_TITLE = "01b publishing sheet: you pay 6.2% Social Security, what does a $1M salary pay?"
MATH_RUN = "400 checks, 0 failed"      # python3 teasers/v2/checks/01-dead-simple-list.py on studio/specs/, re-run at the adversarial check 2026-10-13
MATH_RUN_WIP = "392 checks, 0 failed"  # the same script with --spec on the three studio/specs-wip/ condensed specs, 2026-10-13
MATH_RUN_SHIP = "396 checks, 0 failed"  # python3 teasers/v2/checks/01-dead-simple-list.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 26.5 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}. "
    "The id keeps its round-2 slug (`20-an-hour`); viewers never see it, and since the write-up's hook pass 2 the topic is the Social Security wage cap.",
    "- **Numbers.** Every figure comes from `teasers/v2/01-dead-simple-list.md` (01b) and its check, "
    f"`python3 teasers/v2/checks/01-dead-simple-list.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every figure from the 2026 rate and wage base, "
    "keeps $184,500 beside its year, keeps every rounded figure 'about' or '≈', and keeps 'employee share' and the Medicare exclusion in the copy.",
    "- **Honesty rules kept.** The title asks and never gives the result, and neither does the cover (frame 1: the question, the $20/hr input and 3 empty ledges). "
    "The Instagram caption keeps every result below 'more', the struck $62,000 guess and the $184,500 cap included. Every claim stays inside the video's verdict, "
    "\"You pay 6.2%. A $1M salary pays ≈ 1.1%\", with its conditions: 2026 figures, employee share, Medicare not counted. The series takes no side on the cap; "
    "the pinned comment gives both sides in numbers, as the write-up asks. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Sources.** The 6.2% employee rate and the 2026 wage base of $184,500: SSA's '2026 Social Security Changes' fact sheet and Kiplinger, as in the write-up. "
    "SSA is a government agency and Kiplinger is cited only as a source, so, as on 06b and 06c (whose sources are named without one), the copy needs no affiliation line: no company or brand is its subject.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 26.5, "sha256": "869e23a73d7e07ae360671291c0ef2e9d6060fd0b6cc1e5d90b8f86ea8198533",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/01-dead-simple-list.md section (b) 01b; teasers/v2/checks/01-dead-simple-list.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "rate": "Social Security tax, employee share: 6.2% (statutory; employers pay a matching 6.2% to the same cap); Medicare 1.45% has no cap and is not counted",
    "wage_base": "2026: $184,500 (SSA '2026 Social Security Changes' fact sheet, released with the 2026 COLA in October 2025; Kiplinger)",
    "row_1": "$20/hr × 2,080 hours (40 × 52) × 6.2% = $2,579.20 ≈ $2,579 a year; $41,600 of pay, all under the cap",
    "guess": "the flat-rate guess, struck: $1,000,000 × 6.2% = $62,000",
    "row_2": "$184,500 × 6.2% = $11,439, the most anyone's wages pay in 2026",
    "row_3": "$11,439 ÷ $1,000,000 = 1.1439% ≈ 1.1% of their pay",
    "verdict": "You pay 6.2%. A $1M salary pays ≈ 1.1%. VO: 'You pay more than five times their rate' (6.2 ÷ 1.1439 = 5.42; 5.64 on the shown 1.1%)",
    "pinned": "in dollars the $1M salary pays 4.4× the $20/hr worker ($11,439 ÷ $2,579.20 = 4.44) on 24× the pay ($1,000,000 ÷ $41,600 = 24.04); pay above the cap does not count toward benefits either (SSA: 'contribution and benefit base')",
    "not_modelled": "self-employment tax (12.4% to the same cap), the employer's share, Medicare and its 0.9% surtax, two jobs (each employer withholds to the cap; the excess is refunded at tax time)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "You Pay 6.2% Social Security. What Does a Million-Dollar Salary Pay?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 92,
     "note": "PICK. The write-up's title with the VO's own words for the rival ('A million-dollar salary'), 11 points over the write-up's '$1M Salary'. "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "You Pay 6.2% Social Security. What Does a Millionaire Pay?", "vidiq_score": 92,
     "note": "The same score, 9 characters shorter, but not used: 'millionaire' usually means wealth, and the video is about a $1M salary. A millionaire on a modest salary pays 6.2% too."},
    {"rank": 3, "title": "You Pay 6.2% Social Security Tax. What Does a $1M Salary Pay? #SocialSecurity #taxes #paycheck", "vidiq_score": 83,
     "note": "The house 3-hashtag form (95 characters). The channel's live Shorts carry title hashtags, so this is the option if the owner keeps that habit; it scores 9 points under the pick."},
]
YT_TITLES_ALSO_SCORED = [
    ("You Pay 6.2% Social Security. What Does a Millionaire Pay on a $1M Salary?", 92, "both words, no gain, 74 chars"),
    ("You Pay 6.2% in Social Security Tax. What Does a $1 Million Salary Pay?", 84, ""),
    ("You Pay 6.2% Social Security Tax. What Does a $1M Salary Pay?", 82, ""),
    ("Social Security Tax: You Pay 6.2%. What Does a $1M Salary Pay?", 82, ""),
    ("You Pay 6.2% Social Security Tax. What Does Someone Earning $1 Million Pay?", 82, ""),
    ("You Pay 6.2% Social Security. What Does a $1M Salary Pay?", 81, "the write-up's title"),
    ("You Pay 6.2% Social Security. What Does a $1M Earner Pay?", 81, ""),
]
TITLE_BULLETS = [
    "'Social Security' sits at characters 14-28, and the whole title is 68 characters, so the Shorts player shows it uncut. "
    "It plants the viewer's own rate (6.2%) and leaves the rival's open, the write-up's R5 move: the viewer's flat-rate guess is the wrong answer the video strikes out.",
    "'Million-dollar salary' is what the VO says, and it scores 92 against 81 for the write-up's '$1M salary'. It also keeps the rival a salary, not a fortune, which is what the maths is about.",
    "Left out on purpose: 'cap', 'wage base' and '$184,500'. They name the twist the second ledge pays off, so they sit in the description, the tags and below the caption's fold instead.",
    "vidIQ's model ranks titles but does not predict views; options 1 and 2 tie, so the pick is decided on accuracy.",
]

YT_DESCRIPTION = """You pay 6.2% Social Security tax on every paycheck. What does a million-dollar salary pay? In 2026 the 6.2% stops at $184,500 of wages, so a $1M salary pays $11,439: about 1.1% of its pay. You pay more than five times their rate.

The math, shown:
• At $20 an hour, full time (40 hrs × 52 wks = 2,080 hours): $20 × 2,080 × 6.2% ≈ $2,579 a year. All $41,600 is under the 2026 cap of $184,500, so every dollar pays 6.2%.
• The flat-rate guess: $1,000,000 × 6.2% = $62,000. No.
• In 2026 it stops at $184,500 (the wage base): $184,500 × 6.2% = $11,439, the most anyone's wages pay.
• $11,439 ÷ $1,000,000 ≈ 1.1% of their pay.
• You: 6.2% on every dollar, all year. Them: about 1.1%. More than five times their rate.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 2026 Social Security tax, employee share: 6.2% of wages up to $184,500 (SSA, 2026 Social Security Changes; Kiplinger). Employers pay a matching 6.2% to the same cap. Medicare (1.45%, no cap) is not counted. Not modelled: self-employment tax, and a second job (each employer withholds to the cap; the excess comes back at tax time). Not financial advice.
#SocialSecurity #taxes #paycheck"""
DESC_NOTE = ("Every line that names $184,500 also names 2026: SSA updates the wage base each year. "
             "The on-screen series name 'dead simple numbers' is left out: it is Master Money's phrase (the write-up's risk note), so the copy uses the house 'The math, shown:'.")

YT_HASHTAGS = ["#SocialSecurity", "#taxes", "#paycheck"]
YT_HASHTAG_NOTES = [
    ("#SocialSecurity", "the topic ('social security' 318,231 searches a month, up 19.8% on its 30-day baseline; 'social security taxes' 7,310)."),
    ("#taxes", "the category ('taxes' 82,933 a month, up 11.0%), shared with 01c."),
    ("#paycheck", "where the 6.2% shows up ('paycheck' 38,765 a month), shared with 01a, so the series shares it."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["social security tax", "social security taxes", "social security", "social security tax cap",
           "the social security cap", "social security wage base", "social security tax limit", "social security 2026",
           "fica tax", "fica taxes", "fica", "payroll taxes", "6.2% social security", "millionaires social security",
           "taxes", "paycheck", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. The cap phrases carry the twist the title keeps back. "
             "Left out on purpose: 'social security cap proposal' (3,590 a month) and 'scrap the cap' (under 750) are policy intent, and the series takes no side; "
             "'how to pay no social security tax' (4,117) is avoidance intent; 'medicare tax' (5,169) is a tax the video does not count; "
             "'social security benefits' (58,949) and 'social security update' (80,835) want benefit news.")

YT_PINNED = """What's your hourly wage? Up to $184,500 of pay in 2026, Social Security takes 6.2% of every dollar: at $20 an hour full time, ≈ $2,579 a year.

Both sides, in numbers: in dollars the $1M salary still pays 4.4× what you pay (≈ $2,579), on 24× the pay. And the cap works both ways: pay above $184,500 (2026) doesn't count toward their Social Security benefit either. Social Security only, employee share: Medicare (1.45%) has no cap."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own number (R3): under the cap, any wage pays 6.2% on every dollar. "
               "The second paragraph is the write-up's pinned comment: it answers the fairness comments the write-up expects ('scrap the cap') with both sides in numbers, "
               "so the series takes no side. It also repeats the conditions (2026, employee share, no Medicare).")

RELATED_VIDEO = {
    "pick": {"id": "hJBvmGA6sZ0", "title": "You Can Lean on $1 Million. Not on $1 Billion.",
             "url": "https://www.youtube.com/shorts/hJBvmGA6sZ0",
             "why": "The same $1 million, seen another way (a stack of bills), for the viewer this title draws. It is the channel's second-best Short (1,221 views)."},
    "swap_when_live": "01c (the same dead-simple-list series, also a paycheck tax), once published; then 01a. Then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the clean cover (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick frame 1 (the clean cover: the question with the red 6.2%, the $20/hr input and 3 empty ledges), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day): Tue 13 Oct 2026 at the earliest. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 01a and 01c (the same series). Suggested order: 01b first, then 01c, then 01a (see why).",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61 a day or less after posting, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Why first: 'social security' runs +19.8% and 'social security benefits' +31.7% over their 30-day baselines, and SSA published the 2026 wage base ($184,500) with its COLA fact sheet "
           "in October 2025 (the write-up's source), so the 2027 figure may come out about now. Every line naming $184,500 also names 2026, so the copy stays true; "
           "posting early avoids 'that's last year's cap' comments, and the pinned reply can name the new figure once SSA publishes it.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("You pay 6.2% Social Security tax on every paycheck. What does a million-dollar salary pay? "
           "The math, on a $20/hr wage.")

IG_CAPTION = IG_HOOK + """

At $20 an hour, full time: $20 × 2,080 hours × 6.2% ≈ $2,579 a year. All $41,600 is taxed: every dollar, all year.

A million-dollar salary at a flat 6.2% would pay $62,000. It doesn't. In 2026 the tax stops at $184,500 of wages:
• $184,500 × 6.2% = $11,439, the most anyone's wages pay in 2026.
• $11,439 ÷ $1,000,000 ≈ 1.1% of their pay.

You pay 6.2%. A $1M salary pays ≈ 1.1%. You pay more than five times their rate.

2026 figures, employee share (employers match it to the same cap). Medicare (1.45%) has no cap and isn't counted. Not financial advice.

What's your hourly wage?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#socialsecurity #taxes #paycheck #moneymath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the header's question with the 'Social Security tax' and 'million-dollar salary' keywords and the $20/hr input, no result: "
                   "the caption overlays the Reel from frame 1, so every result, the struck $62,000 guess and the $184,500 cap sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the question with the keywords 'Social Security tax' and 'million-dollar salary' and the $20/hr input, with no result. "
    "The write-up says caption line 1 is the verdict (R11) and its own caption opens with the cap; the house rule moves both below 'more', because the caption overlays the Reel from frame 1. "
    "The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The verdict is the write-up's share line ('You pay 6.2%. A $1M salary pays ≈ 1.1%'), and the conditions line follows it (2026, employee share, no Medicare).",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#socialsecurity", "#taxes", "#paycheck", "#moneymath", "#personalfinance"]
IG_HASHTAG_MD = [
    "Four are the write-up's own (`#socialsecurity #paycheck #moneymath #taxes`, all kept):",
    "",
    "- `#socialsecurity` names the topic. The Social Security hearing clip in the outlier search (1.8M on Instagram) is in the same news stream.",
    "- `#taxes` and `#paycheck` name the category and where the 6.2% shows up.",
    "",
    "`#personalfinance` is the broad layer, as on 06b and 06c, and `#moneymath` is the write-up's series tag.",
]

IG_ALT_SHORT = "Animation: you pay 6.2% Social Security on all your pay; a $1M salary pays about 1.1% (2026)."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly. The 1.1% keeps its 'about', as everywhere else, and the year stays with it.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white background. The header reads: 3 dead simple numbers. You pay 6.2% to Social Security. A $1M salary pays…? "
               "A green stick figure throws formula plates onto 3 numbered ledges. Yours, a year: $20 an hour × 2,080 hours × 6.2% ≈ $2,579, in red. "
               "A $1M salary pays: he works the flat-rate guess, $1,000,000 × 6.2% = $62,000, and strikes it out in red; the real block, $184,500 (the 2026 cap), "
               "crushes it: × 6.2% = $11,439. Their rate: $11,439 ÷ $1,000,000 ≈ 1.1%, on a gold plate, and he jumps, shocked. "
               "Verdict: You pay 6.2%. A $1M salary pays about 1.1%.")

IG_FIRST_COMMENT = ("You pay 6.2% on every dollar. A $1M salary pays ≈ 1.1%: the 6.2% stops at $184,500 of pay in 2026. "
                    "Employee share; Medicare not counted. What's your hourly wage?")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up's Instagram note says "the cover is frame 1, with 'A $1M SALARY PAYS…?'
# and the 3 empty sockets showing". On the shipped condensed cut frame 0 is the only still frame: the hook caption is
# already complete on it (it holds no result), and from frame 1 the figure dips to flip the plate.
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The clean cover, frame 1: the header '3 DEAD SIMPLE NUMBERS / YOU PAY 6.2% TO SOCIAL SECURITY. / A $1M SALARY PAYS…?' ('6.2%' in red), "
                          "the footer 'ASSUMES 40 hrs × 52 wks · 2026 rates / employee share, no Medicare', the input line 'Your pay $20/hr 40 hrs a week', "
                          "3 numbered ledges labelled 'Yours, a year / A $1M salary pays / Their rate' (the last two with empty sockets), ① active with its '$20' block, "
                          "and the green stick figure holding the '× 2,080 × 6.2%' plate. No result: it asks and does not answer, like the title and the caption. "
                          "The write-up names frame 1 as the Instagram cover. On any cut, use the opening frame, before the figure flips the plate. "
                          "A cut whose hook caption is already up on its first frame (the shipped condensed cut's is) still gives a clean cover: 'At $20 an hour, you pay about' holds no result.")
COVER_FRAME_MEASURED = ("On the shipped 14.5 s condensed cut, frame 0 (0.00 s) is that frame and the only still one: the complete hook caption 'At $20 an hour, you pay about' "
                        "is already up (it holds no result), and from frame 1 (0.03 s) the figure dips to flip the plate (mean frame-to-frame luma change 1.57, 270×480 "
                        "greyscale). On the 26.5 s pre-condense render frame 0 had no caption.")
COVER_CROP_NOTE = ("3:4 = 1080×1440, the top 1440 rows (y 0 to 1440) of the 1080×1920 frame: the badge, the header, the footer, the input line, the 3 ledges, the figure and the floor line, with even margins above the badge and below the floor; "
                   "it drops the empty floor below. A crop from y 60 (as on 01a) leaves 200 px of empty floor. A centred grid crop (y 240-1680) cuts the badge and leaves the header on the edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the verdict hold (the finished sheet with 'You pay 6.2%. A $1M salary pays ≈ 1.1%.'). It is the save-worthy frame, but it shows the answer, "
    "against the write-up's cover note and the title's no-result rule.",
    "**Shipped cut (2026-10-13):** frame 1 was re-picked by content on the shipped file and both JPGs re-exported from it: the same picture as the pre-condense cut's frame 1, plus the complete hook caption, which holds no result.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut replaced the pre-condense render in renders/channel on 2026-10-13; get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 01b-26.5s.mp4` (sha256 869e23a7…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Social Security vs a $1M salary — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, Tue 13 Oct 2026 at the earliest, on a different evening from 01a and 01c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("social security", 318231, 82.1, 76.0, 58.9, "+19.8% vs its 30-day baseline (265,693); very high competition", "2026-10-12"),
    ("social security benefits", 58949, 71.2, 52.6, 61.7, "+31.7% vs its baseline (44,753); benefit news, not in the tags", "2026-10-12"),
    ("fica", 23427, 65.2, 54.4, 57.4, "-32.3% vs its baseline (34,616)", "2026-10-12"),
    ("social security taxes", 7310, 57.7, 50.2, 54.5, "", "2026-10-12"),
    ("social security tax", 5251, 55.5, 50.3, 53.2, "seed; -46.2% vs its baseline (9,765)", "2026-10-12"),
    ("fica taxes", 5031, 55.3, 32.6, 60.1, "", "2026-09-17"),
    ("payroll taxes", 4429, 54.4, 46.8, 53.9, "", "2026-09-03"),
    ("how to pay no social security tax", 4117, 54.0, 32.5, 59.4, "avoidance intent: not in the tags", "2026-07-30"),
    ("the social security cap", 3857, 53.5, 51.9, 51.4, "the twist: in the tags, not in the title", "2026-05-01"),
    ("social security cap proposal", 3590, 53.1, 19.9, 63.9, "policy intent: the series takes no side, so not in the tags", "2026-05-02"),
    ("fica tax", 3430, 52.8, 22.8, 62.5, "", "2026-09-19"),
    ("taxes", 82933, 73.4, 52.5, 63.1, "+11.0% vs its baseline (74,718)", "2026-10-12"),
    ("social security wage base", 0, 0, 23.9, 30.4, "<750/month: SSA's own term", None),
    ("social security tax limit", 0, 0, 27.3, 29.1, "<750/month", None),
    ("social security tax cap", 0, 0, 35.5, 25.8, "<750/month", None),
    ("scrap the cap", 0, 0, 23.3, 30.7, "<750/month; the slogan the write-up expects in the comments", None),
]
KEYWORD_MD_NOTE = {"social security cap proposal": "policy intent: not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; six rows are older snapshots (2026-05-01 to 2026-09-19).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Six rows are older snapshots.")
KW_OUTRO = ("'Social Security' is the big, crowded word (318,231 a month, competition 76.0, rising 19.8%); the tax phrases are mid-sized ('social security taxes' 7,310, "
            "'social security tax' 5,251, 'fica taxes' 5,031). So the title leads with the viewer's '6.2% Social Security' and the description's first line says 'Social Security tax'. "
            "The cap itself is barely searched by name ('the social security cap' 3,857; 'wage base', 'tax limit', 'tax cap' and 'scrap the cap' all under 750), "
            "which suits a title that keeps the twist for the video.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Social Security Tax Hits Working People Hardest, Senator Says", "Viral Flux Daily", 4780, 46137, "2026-09-28",
     "a 6 s politics clip; the biggest same-topic Short found (vidIQ outliers, breakout 6.3)"),
    ("The Social Security FICA payroll tax on your earnings caps out at $184,500 and 2026", "The Medicare Family", 200000, 2756, "2026-08-08", "1:00; 12 comments"),
    ("The Social Security tax cap means millionaires stop paying in #Shorts", "The WLTH Hub", 38, 1094, "2026-09-25",
     "13 s; 'millionaires stop paying in April'; 7 comments"),
    ("Social Security Tax Hike: Are You Ready for 2026? #shorts", "Guardian Financial, Inc.", 41900, 523, "2026-04-06"),
    ("Millionaires Stop Paying Social Security #Shorts", "FinanceGuyFi", 15, 338, "2026-03-10", "'stopped paying on March 10th'"),
    ("High-Income Paycheck Mystery: Social Security Tax Explained! #shorts", "Guardian Financial, Inc.", 41900, 249, "2026-10-11"),
    ("2026 Social Security Tax Cap: $184,500 - What High Earners Should Know", "TaxSaveUSA", 1, 83, "2026-09-30"),
    ("The Day Millionaires Stop Paying Social Security Tax", "The Cents of It", 7, 4, "2026-09-17", "still on the 2025 wage base"),
]
SAME_IDEA_HEADING = "**2. The cap is covered on YouTube, but as a date, not a rate (vidIQ YouTube search and outliers, Shorts, by views and by relevance).**"
SAME_IDEA_MD = [
    "The cap gets posted in two ways: 'the day millionaires stop paying' (a date in March or April) and high-earner tips ('what high earners should know'). "
    "The biggest same-topic Short found is a 6-second politics clip (46,137 views); the explainers are all under 2,800, and three were posted in the last month.",
    "",
    "None sets the rate a $1M salary pays (≈ 1.1%) against the viewer's own 6.2%, and none works the flat-rate guess and strikes it out. "
    "So the pick plants the viewer's rate and asks the rival's, the one question only this video answers on screen.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search and outliers (Shorts): the biggest same-topic Short is a 6 s politics clip (46,137); explainers are under 2,800, framed as "
                  "'the day millionaires stop paying' or high-earner tips. None compares the rates (6.2% vs ≈ 1.1%), which is this video's angle.")

OUTLIERS = [
    {"handle": "@rogue_knigh_t", "platform": "Instagram", "id": "DbKyOmosNWK",
     "on_screen": "a static tweet whose first line is about giving 6.2% of your paycheck to Social Security",
     "views": "1.3M (42.8x the account median of 30K)",
     "note": "a tweet screenshot over music; the hook is the viewer's own 6.2%, as in this header"},
    {"handle": "@oddsonpolitics_", "platform": "Instagram", "id": "DayHO5zRq76",
     "on_screen": "Murray: Is it true that people making under $184,000 pay a 12.4% Social Security tax rate?",
     "views": "1.8M (3.7x the account median of 473K); the TikTok post (@oddsonpolitics, 7662448653700762910) 328.5K (114.6x)",
     "note": "a Senate hearing clip on the rates by income; 12.4% counts the employer's half too"},
    {"handle": "@mcbnnews0", "platform": "TikTok", "id": "7667064818800659725",
     "on_screen": "Murray: Is it true that people making under $184,000 pay a 12.4% Social Security tax rate?",
     "views": "129K (113.0x the account median of 1.1K)", "note": "the same hearing clip, reposted"},
]
OUTLIERS_HEADING = "**3. The rate gap travels on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@rogue_knigh_t** (Instagram), a static tweet that opens on giving 6.2% of your paycheck to Social Security: 1.3M (42.8x).",
    "  - The viewer's own 6.2% is the hook, as in this header.",
    "- **@oddsonpolitics_** (Instagram), \"Murray: Is it true that people making under $184,000 pay a 12.4% Social Security tax rate?\": 1.8M (3.7x); the TikTok post 328.5K (114.6x).",
    "- **@mcbnnews0** (TikTok), the same hearing clip: 129K (113.0x).",
    "- The hearing clip asks the same question as this Short, the rate by income, and opens on the question, not the answer. "
    "Its 12.4% counts the employer's half; this Short and its copy use the employee share (6.2%), as the footer says.",
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
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; refreshed 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,518 views in 30 days.",
    "",
    "06b went live on both on Mon 12 Oct at about 12:14 ET (YouTube `krfZEHhb0xU`, Instagram `DeZov75oo9o`), with the house 3-hashtag title (its sheet's option 3): "
    "61 views and 7 plays the next morning, too young to compare. 06c, a day older, has 760 views and 1,711 plays (40.3% skip).",
    "",
    "The two $1 million Shorts split: the Burj Khalifa stack drew 1,221 views and 5,449 plays (27.0% skip), the pennies one 177 and 598: the same $1 million, very different results.",
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
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "@envelopemath's YouTube Analytics (audience hours, geography) were not read here; the 06b and 06c sheets found vidIQ's YouTube authorization is a different channel. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the write-up's and the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The 2026 wage base ($184,500) is the write-up's figure (SSA and Kiplinger). SSA's 2027 figure was not looked up here; when it is published, the copy stays true because it names 2026 wherever it names $184,500.",
    "The video, the cover and the video facts are the shipped condensed cut (2026-10-13); the copy is cut-independent and carried over from the pre-condense cut unchanged.",
]
RESEARCH_EXTRA = {
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "120 credits for this teaser (9 keyword queries, 2 YouTube searches, 1 YouTube outlier search, 1 Instagram/TikTok outlier search, 11 title scores, the last of each a re-query; 5 each), plus 10 shared across 01a-01c for the channel's own stats; "
                     "10 more at the adversarial check (1 title score, 1 keyword query).",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/01-dead-simple-list.py: {MATH_RUN} on studio/specs/ (the pre-condense specs; 397 at the first build, before the condense's "
                f"check-script update), re-run at the adversarial check 2026-10-13; with --spec on the three studio/specs-wip/ condensed specs {MATH_RUN_WIP}, so the copy's figures hold on both cuts; "
                "every public figure traced to the 01b maths table and recomputed in MATH_RELATIONS from the 2026 rate and wage base; COPY_RULES keep $184,500 beside 2026, "
                "≈ $2,579 and ≈ 1.1% 'about', and 'employee share' and the Medicare exclusion in the copy"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: social security 318,231 (+19.8%); social security taxes 7,310; social security tax 5,251 (-46.2%); the social security cap 3,857; "
                   "title scores 92 (pick), 81 (write-up title), 83 (hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried the same day after the build: the pick's title score 92 and 'social security taxes' 7,310 / 50.2. "
                   "Re-queried at the adversarial check: the pick's title score 92; 'social security tax' 5,251 / 50.3 (-46.2% on 9,765). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/01-dead-simple-list.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed WIP specs. "
    "Every public figure traces to the 01b maths table: 40 × 52 = 2,080; "
    "$20 × 2,080 × 6.2% = $2,579.20 ≈ $2,579; $20 × 2,080 = $41,600, under $184,500; the struck guess $1,000,000 × 6.2% = $62,000; $184,500 × 6.2% = $11,439; "
    "$11,439 ÷ $1,000,000 = 1.1439% ≈ 1.1%; 6.2 ÷ 1.1439 = 5.42 ('more than five times'); pinned 4.4× and 24×. The data file recomputes each one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 92, the write-up's title 81. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** After the build: the pick's title score 92; 'social security taxes' 7,310 / 50.2. "
    "At the adversarial check: the pick's title score 92; 'social security tax' 5,251 / 50.3 (-46.2% on its 9,765 baseline). All match.",
    "- **Changed.**",
    "  - The cover note said 'on any cut, use the last frame before the first caption word appears'. The condensed WIP spec starts its hook caption before frame 1, "
    "so that cut has no caption-free frame and the rule would point at nothing. The cover is now 'the opening frame, before the figure flips the plate', and the note says the hook caption "
    "('At $20 an hour, you pay about') holds no result.",
    "  - The pinned comment's '$20 an hour, ≈ $2,579 a year' now says 'full time': the $2,579 is $20 × 2,080 hours (40 × 52), as the description and the caption already say.",
    "  - The math run said 397 checks: the condense updated the check script since, and it now runs 400 on `studio/specs/` (392 on the WIP specs), 0 failed.",
    "  - The no-result patterns matched 'cap', 'stops' and 'wage base' in lower case only, so a title-case 'Hits the Cap' passed. Both patterns are now case-blind and also catch 'less' and 'lower' "
    "(the rival's rate is the payoff). Each of this sheet's rules now fails a broken copy by name ('Hits the Cap', 'Pay Less?', $184,500 without 2026, 1.1% without 'about').",
    "- **Checked.**",
    "  - The cover, frame 1, carries no result (both JPGs read by eye): on the render frame 0 is the only caption-free frame (the first caption word fades in at frame 1, the plate flip starts at frame 4, measured).",
    "  - The long alt text names only beats both cuts keep (the struck $62,000, the crushing $184,500 block, the shocked jump), and the copy names no timestamp.",
    "  - Brands: SSA is a government agency and Kiplinger is named only as a source, as 06b and 06c name their sources (Macrotrends, CNBC, FinanceBuzz) with no affiliation line; no company is the copy's subject.",
    "  - 'Not financial advice.' is in the description and the caption. No side on the cap: the pinned comment gives both sides in numbers, as the write-up asks.",
    "  - The pre-condense render in git (`471c793`) had the same sha256 as `renders/channel` before the ship, so the Trial Reels `git show` command fetches this file.",
    "- **Kept on purpose.**",
    "  - The cover is frame 1 (no result), as the write-up asks.",
    "  - 'Million-dollar salary', not 'millionaire': the same score, and accurate (the maths is about a salary).",
    "  - 'Cap', 'wage base' and $184,500 stay out of the title and the caption's first 125 characters: they name what the second ledge pays off.",
    "  - The write-up's caption opens with the cap ('6.2% of every dollar you earn, up to $184,500'); the house rule moves it below 'more'.",
    "  - The short alt text keeps the verdict's 'you pay 6.2%' framing: it is the video's own verdict, and the year stays with it.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). Frame 1 was re-picked by content and is still frame 0, now with the complete hook caption on it. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 01b maths table (teasers/v2/01-dead-simple-list.md, section (b) 01b)
# and recomputed below; 6.2%, 1.45% and the 2026 wage base are the write-up's sourced inputs, $20/hr and 40 × 52 its example.
FIGURES = {
    "6.2", "1.1", "1.45", "$1", "$20", "40", "52", "2,080", "$2,579", "$41,600", "$1,000,000", "$62,000", "$184,500", "$11,439",
    "4.4×", "24×", "2026", "3",
}
_rate, _base, _wage, _hours = 0.062, 184500, 20, 40 * 52
MATH_RELATIONS = [
    (_hours == 2080, "40 hrs × 52 wks = 2,080 hours"),
    (_wage * _hours == 41600 and round(_wage * _hours * _rate) == 2579, "$20 × 2,080 × 6.2% = $2,579.20 ≈ $2,579; pay $41,600"),
    (_wage * _hours < _base, "$41,600 is under the 2026 cap, so every dollar pays 6.2%"),
    (round(1_000_000 * _rate) == 62000, "the flat-rate guess: $1,000,000 × 6.2% = $62,000"),
    (round(_base * _rate) == 11439, "$184,500 × 6.2% = $11,439"),
    (round(11439 / 1_000_000 * 100, 1) == 1.1, "$11,439 ÷ $1,000,000 = 1.1439% ≈ 1.1%"),
    (6.2 / 1.1439 > 5 and 6.2 / 1.1 > 5 and 6.2 / 1.1439 < 6, "6.2% vs ≈ 1.1%: more than five times (5.42; 5.64 on the shown 1.1%)"),
    (round(11439 / 2579.2, 1) == 4.4, "pinned: $11,439 ÷ $2,579.20 = 4.4× in dollars"),
    (round(1_000_000 / 41600) == 24, "pinned: $1,000,000 ÷ $41,600 = 24× the pay"),
]
MATH_SCRIPT = "teasers/v2/checks/01-dead-simple-list.py"
MATH_KEY_LINES = ["items[0] '$20 × 2,080 × 6.2%' = 2,579.2000", "items[1] '$184,500 × 6.2%' = 11,439.0000",
                  "items[2] '$11,439 ÷ $1,000,000' = 1.1439", "flat-rate guess: $1,000,000 × 6.2% (struck)",
                  "'more than five times their rate'"]
RESULT_RE_TITLE = r"(?i)1\.1|11,439|184,500|62,000|2,579|five|\bcap\b|stops|wage base|\bless\b|\blower\b"
RESULT_RE_CAPTION = r"(?i)1\.1|\$11|\$18|\$62|\$2,5|\$41|five|\bcap\b|stops|wage base|\bless\b|\blower\b"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _with(fig, needs, skip=()):
    """every line that names fig also names one of needs"""
    return all(any(n in ln for n in needs) for ln in _lines(skip) if _re.search(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (_with(r"\$184,500", ("2026",)), "$184,500 always comes with 2026 (the 2026 wage base)"),
    (all(_re.search(r"(?:≈|about) 1\.1%", ln) for ln in _lines() if "1.1%" in ln), "1.1% is always 'about' or '≈' (1.1439% rounded)"),
    (all(_re.search(r"(?:≈|about) \$2,579", ln) for ln in _lines() if "$2,579" in ln), "$2,579 is always 'about' or '≈' ($2,579.20 rounded)"),
    (all(_re.search(r"more than five times", v[max(0, m.start() - 10):m.end() + 6], _re.I) for v in _COPY.values() for m in _re.finditer(r"\bfive\b", v, _re.I)),
     "'five' only in 'more than five times' (5.42, not 5)"),
    (all("employee share" in _COPY[k].lower() for k in ("description", "pinned comment", "caption", "first comment")),
     "'employee share' is in the description, both comments and the caption"),
    (all("Medicare" in _COPY[k] for k in ("description", "pinned comment", "caption", "first comment")),
     "the Medicare exclusion is in the description, both comments and the caption"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"five", "million"},
     "no spelled-out figures beyond 'more than five times' and 'million-dollar salary' (the figure check can't see them)"),
]
