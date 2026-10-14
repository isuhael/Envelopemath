# 07c publishing data: you save $100 a month for 5 years; what does a big bank add? (Becker Rig, ledger-duel).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig sheet), in the newer data-file form of 06b-scoreboard-netflix-bill.py (COPY_RULES), as 04b did.
#
# Facts come only from teasers/v2/07-ledger-duel.md (section 07c, its Sources and Assumptions) and
# python3 teasers/v2/checks/07-ledger-duel.py. Research: vidIQ, pulled 2026-10-13. The video is the condensed cut,
# promoted and shipped on 2026-10-13 (the pre-condense cut's render is in git, 471c793 and c4a3014). This sheet names no
# timestamp except the cover, which is picked by content (the frame-1 picture with its first caption), so the copy
# carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "07c Becker Rig, ledger-duel: \"You save $100 a month. 5 years = $6,000. A big bank adds: ?\""
PREPARED = "2026-10-13"
SHORT_ID = "07c"
MD_TITLE = "07c publishing sheet: $100 a month for 5 years, big bank vs high-yield"
MATH_RUN = "461 checks, 0 failures"    # python3 teasers/v2/checks/07-ledger-duel.py on studio/specs/, 2026-10-13
MATH_RUN_SHIP = "535 checks, 0 failures"  # the same check on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
MATH_SCRIPT = "publishing/data/checks/07-ledger-duel.py"   # runs the 07 check unchanged, adds the builder's summary form

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 21.6 s pre-condense cut (the Becker Rig port, fix pass 2026-10-08; the owner: \"too many still moments\"), which is in git (`c4a3014`). "
    "The condense moved the clock; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content (the frame-1 picture) on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/07-ledger-duel.md` (07c) and its check, "
    f"`python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every year's interest from $100 a month at each "
    "APY's monthly rate, keeps each year's pair together with the big bank first, and keeps every lone figure with its own account.",
    "- **Honesty rules kept.** The title asks how much interest a big bank pays and never says, and so does the cover (frame 1: the '?', no number from the answer). "
    "The Instagram caption keeps every result below 'more'. The copy says both rates are held for 5 years and that rates move, that deposits are at each month-end, and that "
    "4.00% is a round rate below the top offers found; the write-up's ≈ 419× is kept out, as the write-up keeps it off screen and out of the caption. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Chase\" is named only as the source of the 0.01% (Chase Savings' standard APY on its Oct 2, 2026 rate sheet), where the write-up's caption names it; the video says "
    "'a big bank' and shows no logo. Both platforms' copy says 'Not affiliated with or endorsed by Chase.' The FDIC is named only as the source of the national average. No share price is named.",
    "- **[click-check] before posting.** The write-up's sources mark Chase's Oct 2, 2026 rate sheet (read through a search engine; the fetch was blocked) and The College Investor's Sep 28 list "
    "for a hand check. The copy names Chase, so open the rate sheet first; if the standard rate has changed, the 0.01% line and the figures need the write-up's rework, not an edit here.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 21.6, "sha256": "cba00966f93951237a6c5e83d45de1b405fdf4244f2b2c83c758726f1089166a",
                    "note": "the pre-condense cut (Becker Rig port, fix pass 2026-10-08) + card, retired; in git history (c4a3014; 471c793 with the v2.2 soundtrack)"}}

FACTS = {
    "source": f"teasers/v2/07-ledger-duel.md section 07c; teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "deposits": "$100 at the end of each month for 60 months, $6,000 in all, in both accounts ('You' at a big bank, Leo at a high-yield account)",
    "rates": "big bank 0.01% APY (Chase Savings' standard rate on its Oct 2, 2026 rate sheet, unchanged from Sep 11 [click-check]); high-yield 4.00% APY, a round rate below every named "
             "top offer (4.01-4.15%) and every 'up to' headline (4.21-4.50%) in late Sep and early Oct 2026; both held for 5 years (they will move)",
    "method": "each APY applied as its monthly equivalent q = (1 + APY)^(1/12) − 1, so 12 months give exactly the APY; interest after n deposits = 100 × ((1 + q)^n − 1) ÷ q − 100n; "
              "interest left in, nothing withdrawn; no taxes; Chase Savings' waivable $5 monthly fee ignored",
    "rows": "interest so far, big bank / high-yield: Year 1 ≈ $0.05 (5.4999 cents) / ≈ $21.84; Year 2 ≈ $0.23 / ≈ $92.56; Year 3 ≈ $0.53 (52.503 cents) / ≈ $214.11; "
            "Year 4 ≈ $0.94 / ≈ $388.52; Year 5 ≈ $1.48 (1.47517) / ≈ $617.90 (617.9024; 'about $618' in the VO)",
    "double": "$200 a month doubles both exactly: ≈ $2.95 and ≈ $1,235.80",
    "fdic": "the FDIC national average, 0.37% APY (Sep 2026), on the same deposits: ≈ $55 (54.81), under a tenth of ≈ $617.90 (pinned comment)",
    "kept_out": "617.9024 ÷ 1.47517 ≈ 419×: off screen and out of the caption in the write-up, and out of this copy",
    "verdict": "'Same $6,000, different account: ≈ $1.48 vs ≈ $617.90'",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Much Interest Does a Big Bank Pay on $100 a Month for 5 Years? Big Bank vs High-Yield"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. The header's question ('A big bank adds: ?') as a search question, with the stake ($100 a month, 5 years) and both options. No answer, no hashtags."},
    {"rank": 2, "title": "You Save $100 a Month for 5 Years. How Much Interest Does a Big Bank Pay You?", "vidiq_score": 94,
     "note": "Second person, like the header and the 'You' column; it leaves out the high-yield side."},
    {"rank": 3, "title": "You Save $100 a Month for 5 Years. How Much Does a Big Bank Add?", "vidiq_score": 89,
     "note": "The write-up's title, 8 points lower."},
]
YT_TITLES_ALSO_SCORED = [
    ("How Much Interest Does a Big Bank Pay on $6,000 of Savings? Big Bank vs High-Yield", 94,
     "'on $6,000 of savings' reads as a $6,000 balance for 5 years; the deposits build up over 60 months"),
    ("Save $100 a Month for 5 Years: Big Bank Savings vs High-Yield Savings. How Much Interest?", 90, ""),
    ("Big Bank Savings vs High-Yield Savings: What Does $100 a Month Earn in 5 Years?", 90, ""),
]
TITLE_BULLETS = [
    "It asks the header's one blank ('A big bank adds: ?') in search words: 'How much interest does a big bank pay', then the stake ($100 a month for 5 years) and the duel "
    "('Big Bank vs High-Yield', the write-up's search words). The answer, ≈ $1.48, is not in it.",
    "It raises the write-up's title from 89 to 97. 'Chase' stays out of the title, as the write-up decided: the screen says 'big bank', and the rate sheet is still a [click-check].",
    "The '$6,000 of savings' version scores 94 but misstates the stake (a $6,000 balance would earn more than $100 a month building up to it), so it is not used.",
]

YT_DESCRIPTION = """$100 a month for 5 years is $6,000 saved. At a big bank's 0.01% APY, it earns about $1.48 of interest. In a high-yield savings account at 4.00% APY, the same deposits earn about $617.90.

The math, shown:
• $100 at each month-end for 60 months: $6,000 in each account.
• Each APY is applied as its monthly rate, so 12 months compound to exactly the APY.
• Year 1: ≈ $0.05 at the big bank vs ≈ $21.84 at high-yield.
• Year 3: ≈ $0.53 vs ≈ $214.11.
• Year 5: ≈ $1.48 vs ≈ $617.90.
• Save $200 a month? Double both: ≈ $2.95 vs ≈ $1,235.80.
• Same $6,000. Different account.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 0.01% APY is Chase Savings' standard rate on its Oct 2, 2026 rate sheet. Top high-yield offers in late Sep and early Oct 2026 ran about 4.15-4.50%; 4.00% is a round rate below all of them. Both rates are held for 5 years, and rates move. Interest is left in; no taxes or fees. Not financial advice. Not affiliated with or endorsed by Chase.
#HighYieldSavings #SavingsAccount #personalfinance"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the write-up's judges noted that 'a big bank pays almost nothing' is a familiar fact, "
             "so the copy lets the dollar figures do the work.")

YT_HASHTAGS = ["#HighYieldSavings", "#SavingsAccount", "#personalfinance"]
YT_HASHTAG_NOTES = [
    ("#HighYieldSavings", "the option the duel prices ('high yield savings account' 56,330 searches a month, competition 46.7, +77.0% on its 30-day baseline; 64.7% of the searches from the US); the write-up's caption tag."),
    ("#SavingsAccount", "the account the viewer already has, the 'You' side of the duel."),
    ("#personalfinance", "the broad layer ('personal finance' 1,436,792 a month, −18.1%), as on 07a; the write-up's caption tag."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["high yield savings account", "hysa", "savings account", "savings account interest", "high interest savings account",
           "big bank savings account", "savings account interest rate truth",
           "save $100 a month", "saving money", "compound interest", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'savings account interest rate truth' (4,676 a month) is this Short's angle; "
             "'big bank savings account' and 'save $100 a month' are the video's own words, with no vidIQ volume. Left out on purpose: 'best high yield savings account' (25,784) and "
             "'best interest rate savings account' (5,228) and 'which bank pays highest interest on savings account' (5,190) are product-pick intent this Short doesn't answer, and 'chase savings account' (4,035) names a brand the video doesn't show, with its rate sheet still a [click-check].")

YT_PINNED = """What does your savings account pay? Not at Chase? The FDIC's national average is 0.37% APY (Sep 2026): ≈ $55 on the same $100 a month over 5 years, still under a tenth of 4.00%'s ≈ $618.

Both rates held for 5 years; rates move. Deposits at each month-end, interest left in."""
PINNED_NOTE = ("The write-up's pinned comment, with its closing question moved to the front so it shows in the collapsed preview (R3: the viewer's own rate). "
               "It answers the comment the write-up expects first ('my bank pays more') with the FDIC national average, and the second line repeats the rate assumption.")

RELATED_VIDEO = {
    "pick": {"id": "XVUeMcTg9OQ", "title": "Your Interest Has a Speed Limit",
             "url": "https://www.youtube.com/shorts/XVUeMcTg9OQ",
             "why": "The same 'interest' viewer: what compounding can and can't do. It is the channel's most-engaged October Short (1,141 views, 28 likes, 6 comments), live since Sun 4 Oct 2026."},
    "swap_when_live": "04b (16 years of savings vs 1 year of the S&P 500), the other savings-rate Short, once published; or 07a or 07b.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the frame-1 picture (the '?', both plans, the empty rows, You pondering beside Leo), the same content as the IG cover."
THUMB_MD = "in the YouTube app, pick the frame-1 picture ('A big bank adds: ?', the empty Year rows over $0.00 / $0.00, You pondering beside Leo), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening, 21:30-22:30 ET (01:30-02:30 UTC the next day); the condensed cut shipped on 2026-10-13. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, post one ledger duel (07a, 07b, 07c) per evening, and keep it off 04b's evening (both show how little a low-rate savings account earns).",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'high yield savings account' is up 77.0% on its 30-day baseline and 'hysa' 28.1%, so savings rates are in people's searches now.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "$100 a month for 5 years = $6,000 saved. What does a big bank add? Big bank savings vs a high-yield account, year by year."

IG_CAPTION = IG_HOOK + """

You save $100 at the end of every month at a big bank, at 0.01% APY. Leo saves the same $100 a month in a high-yield account at 4.00% APY. The ledger shows the interest so far, year by year.

The math, shown:
• Year 1: ≈ $0.05 vs ≈ $21.84.
• Year 3: ≈ $0.53 vs ≈ $214.11.
• Year 5: ≈ $1.48 vs ≈ $617.90.

Same $6,000. Different account.

Save $200 a month? Double both. 0.01% is Chase Savings' standard APY on its Oct 2, 2026 rate sheet; top high-yield offers in late Sep and early Oct 2026 ran about 4.15-4.50%. Both rates held for 5 years; rates move. Interest left in; no taxes or fees. Not financial advice. Not affiliated with or endorsed by Chase.

What does your savings account pay?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#savings #highyieldsavings #hysa #personalfinance #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 ('$100 a month for 5 years = $6,000 saved. What does a big bank add?') and the duel with its keywords, "
                   "no result: the caption overlays the Reel from frame 1, so every number from the answer sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's numberless line 1 and 'Big bank savings vs a high-yield account', with no result. The numbers sit below 'more', where Instagram search and Google indexing still read them.",
    "The rates paragraph is the write-up's caption line 2 without its numbers' repeat: the Chase sheet date, 'double both', the high-yield range and the rates-move caveat.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#savings", "#highyieldsavings", "#hysa", "#personalfinance", "#moneymath"]
IG_HASHTAG_MD = [
    "The write-up's four caption tags, plus one:",
    "",
    "- `#savings`, `#highyieldsavings` and `#personalfinance` are the write-up's topic tags; `#moneymath` is its series tag on all three ledger duels.",
    "- `#hysa` is the fifth: 'hysa' is 32,445 searches a month on YouTube (+28.1%), and John Liang's 'Bank account vs high yield saving account #hysa' (section 2) carries it in its title.",
]

IG_ALT_SHORT = "Chart: $100 a month for 5 years: about $1.48 of interest at 0.01% vs about $617.90 at 4.00%."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', so screen readers read it cleanly, "
                     "and each figure keeps its rate.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page: 2 stick figures beside a year-by-year ledger of interest. Header: You save $100 a month. 5 years = $6,000. A big bank adds: ? "
               "'You', in grey, saves at a big bank at 0.01% APY; Leo, in green, at a high-yield account at 4.00% APY. Each year's interest lands in the ledger, and Leo's coin "
               "stack grows while You stands on a bare floor. Year 1: about $0.05 vs about $21.84. Year 3: about $0.53 vs about $214.11. Year 5: about $1.48 vs about $617.90, "
               "and Leo's total grows onto a gold plate. Verdict: Same $6,000, different account.")

IG_FIRST_COMMENT = ("Big bank, 0.01% APY: ≈ $1.48 in 5 years. High-yield, 4.00% APY: ≈ $617.90. The FDIC's national average, 0.37%: ≈ $55. "
                    "What does yours pay?")

# ---------------------------------------------------------------- the cover frame
# The frame-1 picture with its first caption complete, re-picked by content on the shipped condensed MP4 (2026-10-13):
# the caption 'Year 1 at a big bank:' is whole on frame 0 there (the condense put it up before t = 0), and Year 1 starts to
# drop at about 0.3 s (it lands at 0.4 s). Frame 0 is the write-up's frame 1. (On the pre-condense render the caption
# popped in word by word to 0.33 s, so the cover was frame 15, 0.50 s.)
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The frame-1 picture, which the write-up names as the Instagram cover: the header 'You save $100 a month / 5 years = $6,000 / A big bank adds: ?' "
                          "with '$100 a month' in green, the 2-line footer, the stake line 'Interest so far · $100 a month each', the column heads (You: Big bank, 0.01% APY; "
                          "Leo: High-yield, 4.00% APY), the Start row at $0.00 / $0.00 with Years 1-5 dim over empty shelves, You pondering on the bare floor beside Leo, and the "
                          "caption 'Year 1 at a big bank:' with no number. It asks and does not answer. Not the end frame (Leo on his gold tower), which answers the question. "
                          "On any cut, use the first still frame after the first caption is complete and before Year 1 drops.")
COVER_FRAME_MEASURED = (f"On the shipped {VIDEO_S:g} s condensed cut frame 0 already shows the whole first caption, 'Year 1 at a big bank:', over the Start row at $0.00 / $0.00 and Years 1-5 empty; "
                        "only You's ponder moves over the next frames (frame-to-frame luma change 0.01-0.34 on 270×480 greyscale), and Year 1 starts to drop at about 0.3 s (it lands at 0.4 s). "
                        "Frame 0 is the write-up's frame-1 picture. On the 21.6 s pre-condense render frame 0 showed only 'Year', so the cover was frame 15 (0.50 s).")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1429 (the caption), so the tile keeps the badge, the header, "
                   "the footer, the stake line, both column heads, the figures, the ledger and the caption, and drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the opening frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile matches the 3:4 JPG. "
                    "Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the end frame (Leo's ≈ $617.90 on the gold plate, the red-ringed ≈ $1.48 and the verdict), which answers the title.",
    "**Shipped cut (2026-10-13):** the first caption is whole on frame 0 and Year 1 drops at 0.3-0.4 s, so the cover was re-picked by content on the shipped file (frame 0, was frame 15) and both JPGs re-exported: the same picture as the pre-condense cover. The copy did not change.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The pre-condense render "
                     f"is in git: `git show c4a3014:renders/channel/{BASE}.mp4 > 07c-pre-condense.mp4` (sha256 cba00966…; at 471c793 it carries the v2.2 soundtrack, dcafa5e0…). Compare skip rate (October Reels ran 27.0-65.1%; "
                     "06c, the other Becker Rig Reel, 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Big bank vs high-yield — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("high yield savings account", 56330, 70.9, 46.7, 63.9, "seed; +77.0% vs its 30-day baseline (31,816); 64.7% of searches from the US", "2026-10-12"),
    ("hysa", 32445, 67.3, 46.8, 61.7, "+28.1%", "2026-10-12"),
    ("best high yield savings account", 25784, 65.9, 42.6, 62.5, "−12.1%; product-pick intent, not in the copy", "2026-10-12"),
    ("chase bank", 22976, 65.1, 39.2, 63.4, "+15.8%; Chase is named only as the 0.01% source", "2026-10-12"),
    ("which bank pays highest interest on savings account", 5190, 55.5, 24.8, 63.4, "product-pick intent; not in the tags", "2026-05-13"),
    ("best interest rate savings account", 5228, 55.5, 45.5, 55.1, "product intent", "2026-10-12"),
    ("high interest savings account", 4751, 54.9, 39.8, 57.0, "", "2026-09-22"),
    ("savings account interest rate truth", 4676, 54.8, 33.0, 59.7, "this Short's angle", "2026-07-23"),
    ("chase savings account", 4035, 53.8, 29.4, 60.5, "seed; not in the title or tags (the rate sheet is a [click-check])", "2026-05-31"),
    ("saving money", 92579, 74.1, 45.5, 66.3, "−31.7%", "2026-10-12"),
    ("compound interest", 137873, 76.7, 50.6, 65.8, "−17.3% (the 07a pull)", "2026-10-12"),
]
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'high yield savings account' and 'chase savings account' with US volumes; matching_terms for 'savings account interest'; "
                   "'compound interest' from the 07a pull), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; "
                   "four rows are older snapshots (2026-05-13 to 2026-09-22).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("'high yield savings account' is the biggest on-topic phrase (56,330 a month), it is up 77.0% on its baseline, and two-thirds of its searches are from the US, this channel's market. "
            "The title carries 'big bank' and 'high-yield' rather than the full phrase, which scored lower; the hashtags and tags carry it whole. The product-pick phrases "
            "('best high yield savings account') stay out: this Short compares two rates and recommends no account. The 'savings account interest' long tail is mostly other countries' banks.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("How To Grow Your Savings Account 🏦📈 #personalfinance #money #bank #banking", "Garner Ted", 101000, 598517, "2024-11-05",
     "'Savings accounts with Big Banks are known to give you very little interest'; outlier score 36.1"),
    ("Why HYSA’s Are a Bad Idea", "Steve | Call to Leap", 748000, 421681, "2023-11-17", "the contrarian take"),
    ("What RICH PEOPLE know about HYSA that you don’t (High Yield Savings Account)", "Investing Simplified - Professor G", 475000, 389107, "2023-11-22"),
    ("Know THIS Before You Open a High Yield Savings Account", "Investing with Matt", 6930, 318303, "2023-02-26", "3:04 long"),
    ("What’s The Best HYSA For 2026?", "Steve | Call to Leap", 748000, 205270, "2026-01-14", "a product list; 1,465 comments from a keyword CTA"),
    ("$10,000 HYSA vs S&P 500", "Investing with Matt", 6930, 191735, "2023-07-17", "outlier score 428.9: a two-account duel"),
    ("Bank account vs high yield saving account #hysa", "John Liang", 658000, 58298, "2023-11-18", "the closest 'X vs Y' title"),
]
SAME_IDEA_HEADING = "**2. Big bank vs high-yield is a big, settled topic on YouTube Shorts, mostly advice and product picks (vidIQ YouTube search, under 4 min, by relevance).**"
SAME_IDEA_MD = [
    "The idea travels: Garner Ted's 'How To Grow Your Savings Account' (598,517 views) says outright that big banks pay very little, and Investing with Matt's two-account "
    "'$10,000 HYSA vs S&P 500' (191,735) has a vidIQ outlier score of 428.9. Nearly all of them are talking heads recommending an account or a list of them, several with affiliate links, "
    "and none shows the interest year by year on the same monthly deposits.",
    "",
    "So the title asks the number question in search words and recommends nothing; the ledger, the '?' and the 0.01% source are what this Short adds.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min, by relevance): the big-bank-vs-high-yield idea has Shorts at 58,298-598,517 views from 2023-2026, nearly all advice or product picks; "
                  "the biggest is Garner Ted's (598,517). None prices a monthly deposit year by year.")

OUTLIERS = [
    {"handle": "@trusted.finance", "platform": "Instagram", "id": "Da_85q0NOw5",
     "on_screen": "There's only 24 weeks left of 2026",
     "views": "771.4K (104.8x the account median of 7.4K)", "note": "faceless text over a static background, a weekly-savings table: numbers on screen, no voice"},
    {"handle": "@vinnyrodriguez", "platform": "Instagram", "id": "Dar2kOCiE3N",
     "on_screen": "Ranking High Yield Savings Accounts tier list",
     "views": "76.6K (28.3x the account median of 2.7K)", "note": "a tier list of accounts, talking head"},
    {"handle": "@josuesegoviano2", "platform": "TikTok", "id": "7662941262143638798",
     "on_screen": "Open a High yield savings account",
     "views": "318.2K (77.9x the account median of 4.1K)", "note": "talking head over bank statements showing interest paid; advice"},
    {"handle": "@falatinglwfs", "platform": "TikTok", "id": "7675895955937381663",
     "on_screen": "You can lose your money in an HYSA",
     "views": "639.9K (103.9x the account median of 6.2K)", "note": "a contrarian HYSA warning (dormant accounts)"},
    {"handle": "@only.living.trust.book", "platform": "TikTok", "id": "7663773795768995102",
     "on_screen": "YOUR BANK IS PRAYING YOU NEVER FIGURE THIS OUT",
     "views": "73.3K (62.9x the account median of 1.2K)", "note": "an animated explainer on moving savings out of a bank, ending in a product pitch"},
]
OUTLIERS_HEADING = "**3. Savings-rate content travels on Instagram and TikTok, mostly as advice (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@trusted.finance** (Instagram), \"There's only 24 weeks left of 2026\": 771.4K (104.8x). Faceless text and a savings table, no voice: the closest in form to this Short.",
    "- **@vinnyrodriguez** (Instagram), \"Ranking High Yield Savings Accounts tier list\": 76.6K (28.3x).",
    "- **@josuesegoviano2** (TikTok), \"Open a High yield savings account\": 318.2K (77.9x). Talking head over statements showing interest paid.",
    "- **@falatinglwfs** (TikTok), \"You can lose your money in an HYSA\": 639.9K (103.9x). The contrarian warning.",
    "- **@only.living.trust.book** (TikTok), \"YOUR BANK IS PRAYING YOU NEVER FIGURE THIS OUT\": 73.3K (62.9x). An animated explainer that ends in a product pitch.",
    "- The demand is real and mostly met with advice; this Short shows the year-by-year numbers and leaves the choice to the viewer, which is why the copy asks 'What does your savings account pay?' instead of telling anyone to switch.",
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
    "The channel's interest Shorts split by platform: 'Your Interest Has a Speed Limit' is its most-engaged YouTube Short (1,141 views, 28 likes, 6 comments) but drew 177 plays "
    "and a 56.9% skip on Instagram. This one opens on a question the viewer can answer about their own account, the 'You' column, which the two best Reels' openers (27.0-27.4% skip) share: a number to react to on frame 1.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20519}
LIMITS = [
    "As the 06b and 04b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the condensed cut, shipped on 2026-10-13. The cover's time and frame were re-measured on it; the copy names no other timestamp.",
    "Chase's 0.01% and the high-yield offers are the write-up's, read from search results; the rate sheet and The College Investor's list are [click-check] items that were not opened here.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel; this sheet's spend is counted from each tool's listed cost, checked against the balance (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "titles_scored": "6 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "07c: 55 (3 keyword pulls × 5, 1 YouTube search × 5, 1 IG/TikTok outlier search × 5, 6 title scores × 5), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel videos 5; Instagram insights are free). The three 07 sheets used 210 in all. The balance read 5,180 before the first 07 call and 4,980 "
                     "after the first 200 of them, with no other spend in that window, which confirms keyword research at 5 a call; the last 2 title scores (10) followed. "
                     "It read 4,640 at the end of the build: the other 330 were parallel sheets' calls. At the adversarial check: 10 by listed cost (1 title score, 1 keyword pull), plus a third of 15 shared (channel stats 5, two video lookups 10); the three 07 checks used 55 in all. The balance read 3,845 before them and 3,745 after: the other 45 were parallel sheets' calls.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13), run by the builder through publishing/data/checks/07-ledger-duel.py; "
                "every public figure traced to the 07c maths table and recomputed in MATH_RELATIONS from $100 a month at each APY's monthly rate (all 5 years, the doubling, the FDIC case); "
                "each year's pair kept together with the big bank first, and every lone figure kept with its account (COPY_RULES)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: high yield savings account 56,330 / 46.7 (+77.0%); hysa 32,445 (+28.1%); chase savings account 4,035; savings account interest rate truth 4,676; "
                   "6 titles scored: pick 97, write-up's title 89; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried at the adversarial check: the pick's title score 97; 'best high yield savings account' 25,784 / 42.6 (−12.1%, baseline 29,330); channel 53 / 10,221 / 41; "
                   "the related video XVUeMcTg9OQ 1,141 views, 28 likes, 6 comments, posted Sun 4 Oct 05:49 ET, still the most-engaged October Short. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN}. Every public figure traces to the 07c maths table: 60 × $100 = $6,000; Year 1 ≈ $0.05 / ≈ $21.84; "
    "Year 3 ≈ $0.53 / ≈ $214.11; Year 5 ≈ $1.48 / ≈ $617.90 (≈ $618); $200 a month ≈ $2.95 / ≈ $1,235.80; the FDIC's 0.37% ≈ $55, under a tenth. The data file recomputes each "
    "from q = (1 + APY)^(1/12) − 1, including the two rounding edges (5.4999 and 52.503 cents).",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 6 titles scored against this channel: the pick 97, the write-up's title 89. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is `publishing/data/checks/07-ledger-duel.py` (see the 07a sheet): the 07 check prints 'N checks, F failures', and the adapter adds the builder's form.",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 97; 'best high yield savings account' 25,784 / 42.6 (−12.1%); channel 53 subscribers / 10,221 views / 41 videos; "
    "the related video 'Your Interest Has a Speed Limit' 1,141 views, 28 likes, 6 comments (the other October Shorts have 1-10 likes and 1 comment each). All match.",
    "- **Changed.**",
    "  - The tag 'which bank pays highest interest on savings account' is product-pick intent, which the tags note already rules out for 'best high yield savings account'; this Short names no bank to switch to. It is out of the tags.",
    "  - `#hysa` was 'tagged by the high-yield Shorts and outliers in sections 2 and 3', which the research does not show; it now cites the one that does (John Liang's '… #hysa' title).",
    "  - 'is a 428.9 outlier' now says what the number is: vidIQ's outlier score.",
    "  - The spacing note said 04b is about savings 'at a big bank'; 04b uses the national average. It now says both show how little a low-rate savings account earns.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 07c maths table and a fresh run of the 07 check (461 checks, 0 failures): each year to the cent from q = (1 + APY)^(1/12) − 1, both rounding edges, $200 a month doubled, the FDIC's 0.37% ≈ $55.",
    "  - Platform limits: title 89/100 with no hashtags, description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags and a result-free first 125, short alt text 92.",
    "  - Brand: 'Chase' only as the dated source of the 0.01%, in the description and the caption, each with 'Not affiliated with or endorsed by Chase.'; never in the title, the hashtags, the tags or the picture.",
    "  - The cover JPG (read by eye) shows the frame-1 picture: 'A big bank adds: ?', both plans, the Start row at $0.00 / $0.00, empty Year rows, and the caption 'Year 1 at a big bank:' with no number. The render's sha256 equals the file at `471c793`.",
    "- **Mutation test.** Six mutations of a scratch copy each fail by name: the Year 3 pair reversed, the two accounts swapped in the first comment, the ≈ 419× ratio added, Chase's 0.01% without its sheet date, ≈ $55 without the FDIC, and a wrong Year 1 cent. At the adversarial check, 1 more on a scratch copy also fails by name: Chase's 0.01% without its Oct 2, 2026 rate sheet. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - Section 2 keeps vidIQ's channel names as spelled, and two of them contain a '|' ('Steve | Call to Leap'). The builder does not escape '|' in table cells, so those rows show one cell too many in rendered Markdown (the views and the date shift right); the JSON is exact. Flagged for a one-line generator fix rather than respelled here.",
    "  - The cover is the frame-1 picture, as the write-up names it, taken once the first caption is complete (frame 0 shows only 'Year').",
    "  - Chase is named in the description and the caption only, as the source of the 0.01%, as the write-up's caption does; never in the title, the hashtags or the tags.",
    "  - The ≈ 419× ratio stays out of every line, as the write-up keeps it off screen and out of the caption.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). Its first caption is whole on frame 0, so the cover was re-picked by content (frame 0; was frame 15) and shows the same picture. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names (Years 1, 3 and 5 with their pairs, Leo's stack, the gold plate and the verdict) is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 07c maths table (teasers/v2/07-ledger-duel.md, section 07c) and
# recomputed below from its inputs ($100 a month, 60 months, 0.01% and 4.00% APY; the dates and rate ranges are inputs).
FIGURES = {
    "$100", "$6,000", "$200", "$0.05", "$21.84", "$0.53", "$214.11", "$1.48", "$617.90", "$618", "$2.95", "$1,235.80", "$55",
    "0.01", "4.00", "0.37", "4.15", "4.50", "5", "60", "12", "1", "3", "2", "2026",
}
_qb, _qh = 1.0001 ** (1 / 12) - 1, 1.04 ** (1 / 12) - 1
_I = lambda n, q: 100 * ((1 + q) ** n - 1) / q - 100 * n
_ROWS = {1: (0.05, 21.84), 2: (0.23, 92.56), 3: (0.53, 214.11), 4: (0.94, 388.52), 5: (1.48, 617.90)}   # interest so far, big bank / high-yield
MATH_RELATIONS = [
    (60 * 100 == 6000, "5 years of $100 a month = $6,000"),
    (abs((1 + _qb) ** 12 - 1.0001) < 1e-12 and abs((1 + _qh) ** 12 - 1.04) < 1e-12, "12 months at each monthly rate compound to exactly the APY"),
    (all((round(_I(12 * y, _qb), 2), round(_I(12 * y, _qh), 2)) == v for y, v in _ROWS.items()), "every year's interest, both accounts, to the cent"),
    (0.0549 < _I(12, _qb) < 0.055 and 0.525 < _I(36, _qb) < 0.5251, "the rounding edges: Year 1 5.4999 cents → $0.05, Year 3 52.503 cents → $0.53"),
    (round(_I(60, _qh)) == 618, "≈ $617.90 is 'about $618'"),
    (round(2 * _I(60, _qb), 2) == 2.95 and round(2 * _I(60, _qh), 2) == 1235.80, "$200 a month doubles both: ≈ $2.95, ≈ $1,235.80"),
    (round(_I(60, 1.0037 ** (1 / 12) - 1)) == 55 and _I(60, 1.0037 ** (1 / 12) - 1) < 0.1 * _I(60, _qh), "the FDIC's 0.37%: ≈ $55, under a tenth of ≈ $617.90"),
    (4.00 < 4.01 <= 4.15 < 4.50, "4.00% sits below every top offer found (4.01-4.15% named, up to 4.50% in the headlines)"),
]
MATH_KEY_LINES = ["claim: year 1 at the big bank, in cents", "claim: the big bank adds under $2 on $6,000", "claim: caption: $200 a month doubles both",
                  "claim: pinned: FDIC avg 0.37% on the same dep"]
RESULT_RE_TITLE = r"1\.48|617|618|21\.84|0\.05|[Cc]ents|[Nn]othing|[Pp]enn|419|\$55|×|[Ll]ittle"
RESULT_RE_CAPTION = r"1\.48|617|618|21\.84|0\.05|0\.53|214|[Cc]ents|[Nn]othing|[Pp]enn|419|\$55|2\.95|1,235|[Ll]ittle"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right year or with
# the right account, so a swapped "Year 3: ≈ $1.48 …" or a high-yield figure on the big bank's side would pass it.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_YEARROW = _re.compile(r"Year (\d): (?:≈|about) \$([\d.,]+?)(?: at the big bank)? vs (?:≈|about) \$([\d.,]+?)(?=[^\d.,]|[.,](?:\s|$))")
_BANK = ("$0.05", "$0.53", "$1.48", "$2.95")
_HY = ("$21.84", "$214.11", "$617.90", "$618", "$1,235.80")
_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|third|quarter|tenth|twice)\b", _re.I)


def _rows_ok():
    found = [(int(y), float(a), float(b.replace(",", ""))) for ln in _lines() for y, a, b in _YEARROW.findall(ln)]
    named = sum(len(_re.findall(r"Year \d:", ln)) for ln in _lines())
    return bool(found) and len(found) == named and all(_ROWS[y] == (a, b) for y, a, b in found)


def _sides_ok():
    for ln in (st for ln in _lines() for st in _re.split(r"(?<=[.?!])\s+", ln)):   # sentence by sentence
        bank = [ln.find(f) for f in _BANK if f in ln]
        hy = [ln.find(f) for f in _HY if f in ln]
        if bank and hy and max(bank) > min(hy):
            return False                                    # a pair in one sentence: the big bank first
        if bank and not hy and not _re.search(r"big bank|0\.01%", ln):
            return False                                    # a lone big-bank figure names its account
        if hy and not bank and not _re.search(r"[Hh]igh-yield|4\.00%|Leo", ln):
            return False                                    # a lone high-yield figure names its account
    return True


COPY_RULES = [
    (_rows_ok(), "every 'Year N:' row gives that year's pair, big bank first (Year 1 ≈ $0.05 / ≈ $21.84 … Year 5 ≈ $1.48 / ≈ $617.90)"),
    (_sides_ok(), "in a sentence with both accounts the big bank comes first, and a lone figure names its own account"),
    (all(_re.search(r"(?:≈|about) \$" + _re.escape(f[1:]), ln) for f in _BANK + _HY for ln in _lines() if f in ln),
     "every interest figure keeps its '≈' or 'about' (all are rounded)"),
    (all(_re.search(r"0\.37%|FDIC", ln) for ln in _lines() if "$55" in ln), "≈ $55 comes with the FDIC's 0.37%"),
    (all("$200" in ln for ln in _lines() if "$2.95" in ln or "$1,235.80" in ln), "≈ $2.95 and ≈ $1,235.80 come with their $200 a month"),
    (all("Oct 2, 2026" in ln for ln in _lines() if "Chase Savings" in ln), "Chase's 0.01% always carries its rate-sheet date"),
    (all("Not affiliated with or endorsed by Chase." in _COPY[c] for c in _COPY if "Chase" in _COPY[c] and c not in ("pinned comment", "first comment")),
     "every long-form text that names Chase says 'Not affiliated with or endorsed by Chase.'"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("held for 5 years", "rates move", "Not financial advice.")),
     "the description and the caption say both rates are held for 5 years, that rates move, and 'Not financial advice.'"),
    (not any("419" in v for v in _COPY.values()), "the ≈ 419× ratio stays out of the copy"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"double", "tenth"},
     "no spelled-out figures beyond 'Double both' ($200 a month) and the pinned comment's 'under a tenth'"),
]
