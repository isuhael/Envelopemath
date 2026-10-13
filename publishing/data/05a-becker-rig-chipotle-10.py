# 05a publishing data: what your $10 at Chipotle pays for (Becker Rig, split-sheet).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig precedent), laid out like 06b and the sheets of the same batch.
#
# Facts come only from teasers/v2/05-split-sheet.md (section 05a) and python3 teasers/v2/checks/05-split-sheet.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "05a Becker Rig, split-sheet: \"What you're really paying for when you spend $10 at Chipotle\""
PREPARED = "2026-10-13"
SHORT_ID = "05a"
MD_TITLE = "05a publishing sheet: what your $10 at Chipotle pays for"
MATH_RUN = "560 checks, 0 failed"      # python3 teasers/v2/checks/05-split-sheet.py on studio/specs/ (the full cuts; the check is cut-aware since 2026-10-13)
MATH_RUN_WIP = "583 checks, 0 failed"  # the same check with --spec on the three condensed WIP specs in studio/specs-wip/, re-run at the adversarial check after the condense critic fixes (579 at the first build)
MATH_RUN_SHIP = "583 checks, 0 failed"  # python3 teasers/v2/checks/05-split-sheet.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "693b20b6a45abd3adfdd869b41f3ba7c86ce9ced4dcaf690462bbd2060f097e1"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 27.2 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/05-split-sheet.md` (05a) and its check, "
    f"`python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; {MATH_RUN_WIP} with `--spec` on the condensed WIP specs, whose strings, numbers and verdicts are unchanged). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes all 7 lines from Chipotle's FY2025 dollar lines, "
    "keeps every rounded amount 'about' or '≈' (the exact check line excepted), and never lets the $7.04 guess stand as a claim.",
    "- **Honesty rules kept.** The title asks and never gives the result, and the YouTube thumbnail is frame 1 (the guess, no answer). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the finished sheet, as the write-up's Instagram note asks (as on 06c and 03a). Every claim stays inside the video's verdict, \"Chipotle keeps ≈ $1.29, not $7.04\", "
    "and the copy says its condition: a company-wide average of Chipotle's 2025 revenue, not your order. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Chipotle\" is used only to name the company whose 10-K the maths reads. Both platforms' copy says 'Not affiliated with or endorsed by Chipotle.' "
    "The video has no logo and no store footage: the name is text only. No share price is named anywhere.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 27.2, "sha256": "693b20b6a45abd3adfdd869b41f3ba7c86ce9ced4dcaf690462bbd2060f097e1",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/05-split-sheet.md section 05a; teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "method": "each line is that cost's FY2025 dollar line ÷ Chipotle's total revenue ($11,925,601K, 'total revenue increased 5.4% to $11.9 billion'), shown to 0.1 pt and × $10 to the cent; a company-wide average, not your order",
    "lines": "food, drinks & packaging 29.6% ≈ $2.96; crew pay 25.1% ≈ $2.51; rent (occupancy) 5.2% ≈ $0.52; ads, delivery & card fees (other operating costs) 14.7% ≈ $1.47; "
             "HQ, wear & tear, new stores (G&A + D&A + pre-opening + impairment) 9.1% ≈ $0.91; tax − interest earned 3.4% ≈ $0.34; profit (net income) 12.9% ≈ $1.29",
    "tax_line": "provision for income taxes $473,758K minus interest and other income $73,721K = $400,037K; the provision alone would be ≈ $0.40 per $10, which is why the row is labelled net of interest",
    "adds_up": "2.96 + 2.51 + 0.52 + 1.47 + 0.91 + 0.34 + 1.29 = $10.00; shares add to 100.0; no plug",
    "guess": "the frame-1 wrong guess: $10 − $2.96 = $7.04 profit? (exact on the shown numbers)",
    "check": "$10 − $8.71 of costs = $1.29 (= the profit row)",
    "crew_vs_profit": "2,991,680 ÷ 1,535,761 = 1.95: the crew gets almost twice the profit",
    "verdict": "Chipotle keeps ≈ $1.29, not $7.04 (caption line 1: 'Nowhere near $7.')",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "Where Does Your $10 Actually Go at Chipotle? How Much Is Profit?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 94,
     "note": "PICK. Top score of the 10 scored. The whole first question is the first 44 characters, so a title cut short still asks it whole; "
             "the second question is the one the video answers. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "How Much Profit Does Chipotle Make on Your $10 Order?", "vidiq_score": 93,
     "note": "1 point lower and shorter (53 characters), with 'Chipotle' earlier. It asks only for the last line, where the pick asks for the whole split the video walks."},
    {"rank": 3, "title": "Does Chipotle Really Keep $7 of Your $10?", "vidiq_score": 92,
     "note": "The write-up's hook-bank rewrite B: the frame-1 guess as a yes/no question. Kept as the fallback; a title that names $7 can be quoted as a claim out of context."},
]
YT_TITLES_ALSO_SCORED = [
    ("Where Does Your $10 Actually Go at Chipotle?", 93, "the pick's first question alone"),
    ("How Much Profit Does Chipotle Really Make on Your $10 Order?", 93, "'Really' adds nothing here"),
    ("How Much Profit Does Chipotle Make on Your $10 Order? #chipotle #businessmath #moneymath", 93, "the house 3-hashtag form"),
    ("What You're Really Paying For When You Spend $10 at Chipotle", 90, "the on-screen header"),
    ("What's the Profit Margin on a $10 Chipotle Order?", 90, "Earning Earth's '$5 Lemonade' grammar"),
    ("What's Chipotle's Real Profit on a $10 Order?", 87, ""),
    ("Chipotle Keeps How Much of Your $10?", 82, "the write-up's title"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 82 to 94. 'Where does your $10 go' is the sheet itself (every line of the $10, not only the profit), and 'Actually' is the write-up's R5 doubt cue ('Really' on screen). "
    "'Chipotle' (72,674 searches a month, +24.0%) sits inside the first 44 characters.",
    "It names no result: no line, no profit figure and not the $7.04 guess. The second question promises the payoff the video lands last.",
    "Options 1-3 sit within 2 points (94, 93, 92); vidIQ's model ranks titles but does not predict views, so the pick is decided on what shows first and on asking for the whole sheet.",
]

YT_DESCRIPTION = """Where does your $10 actually go at Chipotle? Food, drinks and packaging take about $2.96 and the crew about $2.51. After rent, ads, delivery and card fees, HQ, and tax (minus the interest it earns), Chipotle keeps about $1.29. Nowhere near $7.

The math, shown (each line's share of Chipotle's 2025 revenue, applied to $10):
• Food, drinks & packaging: 29.6%, about $2.96. So Chipotle keeps $10 − $2.96 = $7.04? Not even close.
• Crew pay: 25.1%, about $2.51.
• Rent: 5.2%, about $0.52.
• Ads, delivery & card fees: 14.7%, about $1.47.
• HQ, wear & tear, new stores: 9.1%, about $0.91.
• Tax minus the interest Chipotle earns: 3.4%, about $0.34 (the tax alone would be about $0.40).
• Profit: 12.9%, about $1.29. Check: $10 − $8.71 of costs = $1.29.
• The crew gets almost twice what Chipotle keeps.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Each line is that cost's share of Chipotle's 2025 revenue ($11.9 billion; FY2025 Form 10-K and Q4 2025 results, Feb 3, 2026), applied to $10: a company-wide average, not your order. Rent is occupancy; ads, delivery & card fees are other operating costs (marketing, delivery service fees, credit card fees, utilities, maintenance, restaurant technology); HQ, wear & tear, new stores is G&A, depreciation, pre-opening costs and impairment. Not financial advice. Not affiliated with or endorsed by Chipotle.
#Chipotle #ProfitMargin #FastFood"""
DESC_MULTIBYTE = "`•`, `−`, `—`"
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 03a.")

YT_HASHTAGS = ["#Chipotle", "#ProfitMargin", "#FastFood"]
YT_HASHTAG_NOTES = [
    ("#Chipotle", "the brand ('chipotle' 72,674 searches a month, +24.0% on its 30-day baseline)."),
    ("#ProfitMargin", "what the sheet measures ('restaurant profit margin' 4,250 a month); the phrase of the 21.8M-view '$5 Lemonade' Short."),
    ("#FastFood", "the broad category ('fast food' 141,454 a month, down 20.8% on its baseline but by far the biggest food-business phrase)."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["chipotle", "chipotle profit", "how much profit does a restaurant make", "restaurant profit margin", "profit margin",
           "chipotle mexican grill", "fast food", "restaurant business", "business explained",
           "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags; 'chipotle profit' is under 750 a month but names the video exactly. "
             "Left out on purpose: 'chipotle order' (8,938, +157.4%) and 'best chipotle order' (9,283) are ordering intent, 'why chipotle collapsed' (7,289) is a different story, "
             "and 'chipotle price increase' (4,225) is price-hike news the video does not cover.")

YT_PINNED = """Which chain's $10 next?

The working, FY2025 ($ thousands): revenue 11,925,601. Food, beverage & packaging 3,527,043 (29.58%) · labor 2,991,680 (25.09%) · occupancy 624,898 (5.24%) · other operating costs 1,755,824 (14.72%) · G&A + depreciation + pre-opening + impairment 1,090,358 (9.14%) · income tax 473,758 minus interest and other income 73,721 = 400,037 (3.35%) · net income 1,535,761 (12.88%)."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's own pinned ask, and it feeds reply videos (the write-up cites a reply sticker at 127.3x, H50). "
               "The second paragraph is the write-up's exact table, for the commenters who check the shares; it answers 'where is tax?' and 'what is HQ?' before they are asked.")

RELATED_VIDEO = {
    "pick": {"id": "LjHDFzVxRyM", "title": "Can You Find the Missing Dollar?",
             "url": "https://www.youtube.com/shorts/LjHDFzVxRyM",
             "why": "The same question, where did the money go, to the cent. It is the channel's best Short on YouTube (1,256 views) and holds 81.3% on Instagram."},
    "swap_when_live": "05c (follow your $100 Costco cart), the same split-sheet series, once published. Then point 05c's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame (the write-up's YouTube cover): the red '$7.04 profit?' guess, the $10.00 slab and the sheet with profit '?'. The Instagram cover is the finished sheet instead."
THUMB_MD = ("in the YouTube app, pick frame 1, the write-up's YouTube cover: the red '$7.04 profit?' guess in the header, the $10.00 slab with the figure on it, "
            "and the sheet with every share but profit's '?'. It asks without answering. On the condensed cut frame 1 also carries the complete hook caption "
            "('Food: ≈ $2.96 of your $10. So Chipotle keeps $7.04?'), as the write-up's condense rule asks. The Instagram cover below is the finished sheet, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 05b and 05c. Suggested order within the series: 05c, then 05b, then 05a.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "05a goes last of the three: 'chipotle' runs +24.0% over its 30-day baseline, but the question is evergreen (the FY2025 10-K stands until Feb 2027), while 05c's Costco factoid is circulating right now.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("Where does your $10 actually go at Chipotle? Food, crew pay, rent, fees, HQ and tax all take their cut before anything is left as profit.")

IG_CAPTION = IG_HOOK + """

Nowhere near $7.

The math, shown (each line's share of Chipotle's 2025 revenue, applied to $10):
• Food, drinks & packaging: about $2.96. So Chipotle keeps $10 − $2.96 = $7.04? Not even close.
• Crew pay: about $2.51.
• Rent: about $0.52.
• Ads, delivery & card fees: about $1.47.
• HQ, wear & tear, new stores: about $0.91.
• Tax minus the interest Chipotle earns: about $0.34.
• Profit: about $1.29. The crew gets almost twice that.
• Check: $10 − $8.71 of costs = $1.29.

A company-wide average from Chipotle's FY2025 10-K and Q4 2025 results (Feb 3, 2026), not your order. Not financial advice. Not affiliated with or endorsed by Chipotle.

Which chain's $10 next?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#chipotle #fastfood #profitmargin #businessmath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the question, the 'Chipotle' keyword and the list of what takes a cut, no result: "
                   "the caption overlays the Reel from frame 1, so the verdict and every dollar sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the title's question and the cost lines the sheet walks, with no figure but the $10 stake. The write-up's caption line 1 is the verdict ('Nowhere near $7.'); "
    "the house rule moves it below 'more', because the caption overlays the Reel from frame 1. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The $7.04 guess appears once, as the video's own question with its working ($10 − $2.96), and is answered on the same line ('Not even close').",
    "The average line (FY2025 10-K, not your order) sits right under the math, and the closing question is the write-up's pinned ask. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#chipotle", "#fastfood", "#profitmargin", "#businessmath", "#personalfinance"]
IG_HASHTAG_MD = [
    "Two are the write-up's own (`#chipotle #businessmath`; its `#backoftheenvelope` repeats the handle and `#moneymath` gives way to the broad layer):",
    "",
    "- `#chipotle` names the brand, `#fastfood` the category (141,454 YouTube searches a month) and `#profitmargin` what the sheet measures.",
    "- `#businessmath` says what kind of video it is: the cost breakdown, not a food review.",
    "",
    "`#personalfinance` is the broad layer, as on 06b, 06c and 03a.",
]

IG_ALT_SHORT = "Chart: where $10 at Chipotle goes, line by line. Profit is about $1.29, not $7.04."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the verdict with its 'about'.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white background. The header asks what you're really paying for when you spend $10 at Chipotle, with a red guess beside it: $7.04 profit? "
               "A stick figure stands on a gold $10.00 slab and saws it into 7 pieces, a piece per cost line, each dropping into its row: food, drinks and packaging about $2.96, "
               "crew pay about $2.51, rent about $0.52, ads, delivery and card fees about $1.47, HQ, wear and tear and new stores about $0.91, and tax minus interest earned about $0.34. "
               "The last piece, profit, drops out from under him: about $1.29, stamped on a gold slab, with the check $10 − $8.71 of costs = $1.29. "
               "Verdict: Chipotle keeps about $1.29, not $7.04.")

IG_FIRST_COMMENT = ("Of your $10: food about $2.96, crew about $2.51, rent about $0.52, ads, delivery & card fees about $1.47, HQ about $0.91, "
                    "tax minus interest about $0.34, profit about $1.29. A 2025 company-wide average, not your order. Which chain's $10 next?"
                    "\n\n" + YT_PINNED.split("\n\n", 1)[1])   # the write-up's Instagram note: "Put the pinned comment's exact table in the first comment."

# ---------------------------------------------------------------- the cover frame
# The finished sheet, picked by content: the write-up's Instagram note names "the finished-sheet frame: the header
# reading 'at Chipotle: ≈ $1.29 profit', the gold 'PROFIT ≈ $1.29' slab, the check line, the bar chart of the $10 with
# the full dollar column, and the verdict". On the shipped condensed cut the verdict and the header's stamp land at
# 11.22 s; the sheet settles by 11.87 s (frame 356) and holds near-still (frame-to-frame mean luma change ≤ 0.004) until
# the end card cuts in at 12.72 s. Frame 357 (11.90 s) is used.
COVER_T = 11.9
COVER_FRAME = 357
COVER_CROP = "crop=1080:1440:0:78"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The finished sheet: the header reading '…at Chipotle: ≈ $1.29 profit' (the answer stamped over the struck guess), the gold 'PROFIT ≈ $1.29' slab, "
                          "the check '$10 − $8.71 of costs = $1.29', all 7 rows with their shares and dollars over the lanes' bar chart of the $10, the figure on the bracket, "
                          "and the verdict 'Chipotle keeps ≈ $1.29, not $7.04.' The write-up names it as the Instagram cover, a save-able cheat sheet like Yannick's finished sheet. "
                          "On any cut, use a frame after the last stamp settles and before the end card.")
COVER_FRAME_MEASURED = ("On the shipped 15.233 s condensed cut the sheet settles by 11.87 s (frame 356) and holds near-still (frame-to-frame mean luma change ≤ 0.004, 270×480 "
                        "greyscale) until the end card cuts in at 12.72 s. Frame 357 (11.90 s) is used. On the 27.2 s pre-condense render it was frame 690 (23.00 s).")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 78 to 1518 of the 1080×1920 frame: the badge, the header with its answer, the footer, the PROFIT slab, the check, the 7 rows and the verdict, "
                   "with even margins (34 px above the badge and below the verdict); it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the finished-sheet frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' up so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the red '$7.04 profit?' guess, the $10.00 slab, every share but profit's '?'). It asks without answering, so it is the YouTube thumbnail, "
    "as the write-up's YouTube note asks; on Instagram the write-up picks the finished sheet, the frame worth saving.",
    "**Shipped cut (2026-10-13):** the finished sheet was re-picked by content on the shipped file (the first settled frame after the last stamp, 11.9 s) and both JPGs re-exported from it. It shows the same header stamp, slab, check line, rows and verdict as the pre-condense cover.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut replaced the pre-condense render in renders/channel on 2026-10-13; get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 05a-27.2s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Where your $10 goes at Chipotle — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 05b and 05c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("chipotle", 72674, 72.6, 56.5, 60.9, "seed; +24.0% vs its 30-day baseline (58,623); mostly food, order and hack intent", "2026-10-12"),
    ("fast food", 141454, 76.9, 71.0, 57.7, "-20.8% vs its baseline (178,607); broad and crowded", "2026-10-12"),
    ("business explained", 103071, 74.8, 36.0, 70.5, "+2.5%; the business-breakdown viewer", "2026-10-12"),
    ("restaurant business", 26475, 66.0, 43.7, 62.1, "-45.6% vs its baseline (48,682)", "2026-10-12"),
    ("best chipotle order", 9283, 59.2, 39.0, 59.9, "ordering intent: not in the tags", "2026-10-12"),
    ("chipotle order", 8938, 59.0, 55.9, 53.0, "+157.4% vs its baseline (3,473); ordering intent: not in the tags", "2026-10-12"),
    ("why chipotle collapsed", 7289, 57.7, 36.5, 60.0, "the 2015 crisis story, not this question", "2026-06-02"),
    ("restaurant profit margin", 4250, 54.2, 38.2, 57.2, "the sheet's subject, said generally", "2026-08-31"),
    ("chipotle price increase", 4225, 54.1, 33.8, 59.0, "price-hike news: the video does not cover it, so not in the tags", "2026-04-17"),
    ("how much profit does a starbucks store really make?", 3824, 53.5, 21.3, 63.6, "the same question about another chain", "2026-10-12"),
    ("how much profit does a restaurant make", 3346, 52.6, 29.6, 59.7, "", "2026-09-18"),
    ("chipotle profit", 0, 0, 30.5, 27.8, "<750/month; names the video exactly, so it stays in the tags", None),
]
KEYWORD_MD_NOTE = {"chipotle profit": "<750/month; in the tags because it names the video",
                   "how much profit does a starbucks store really make?": "the same question about another chain"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; four rows are older snapshots (2026-04-17 to 2026-09-18).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("Nobody searches the hook's exact words ('chipotle profit' is under 750 a month); people search 'chipotle' (72,674, rising) for food, orders and hacks, "
            "and ask the profit question about restaurants in general ('how much profit does a restaurant make' 3,346; 'restaurant profit margin' 4,250). "
            "So the title leads with the viewer's own $10 and the brand, and the profit phrases go to the tags and hashtags. Ordering searches ('chipotle order' +157.4%) stay out: this video does not answer them.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("What's the Profit Margin on a $5 Lemonade?", "Earning Earth", 73600, 21797912, "2025-07-29",
     "17 s; outlier score 1,273.2; the title grammar: one round price and a profit question"),
    ("The Secret of McDonald's Employee Salaries", "Finance USA", 341, 158455, "2025-08-07", "21 s; outlier score 13,778.7"),
    ("How Much Profit Is In A Sandwich?", "CORNER KITCHEN ROTHERHAM", 73800, 33998, "2026-01-14", "1:45; an owner's own costs"),
    ("The real cost of a Big Mac meal 🍔💸", "Real Money Patterns", 21100, 24265, "2026-06-21",
     "a $10 meal priced on ingredients, staff and packaging only; its description puts McDonald's take at nearly $4.40 a meal, the belief this Short tests"),
    ("This is how restaurants calculate if they're going broke!", "Learn with Owner.com", 54300, 12003, "2025-12-08",
     "its description: '$10 Pizza → $3 food cost → $7 contribution margin', and it names Chipotle"),
    ("Chipotle’s Revenue Per Store 🤯 @chipotle 🌯🥑", "Humphrey Talks", 28600, 199, "2021-09-15", "the only Chipotle business Short the searches returned"),
]
SAME_IDEA_HEADING = "**2. Food-cost breakdowns travel on YouTube; Chipotle's own $10 has not been split (vidIQ YouTube search, under 4 min, by relevance and by views).**"
SAME_IDEA_MD = [
    "The 'what does it really cost them' question breaks out on YouTube: Earning Earth's 17-second '$5 Lemonade' (21,797,912 views) and Finance USA's McDonald's Short (158,455 from a 341-subscriber channel). "
    "Two of the closest put the food cost against the price and call the rest profit (Real Money Patterns' $10 Big Mac meal, Owner.com's '$10 pizza → $7 contribution margin'): "
    "the exact belief this Short names on frame 1 and then strikes.",
    "",
    "No Short the searches returned splits a Chipotle order into its 10-K lines, or walks past the food cost to the crew, rent, fees, HQ and tax. "
    "Chipotle itself is a huge Shorts subject, but for food: '$3 Burrito Hack at Chipotle' has 36,997,480 views and 'INSANE $3 CHIPOTLE BURRITO BOWL HACK' 27,615,379. "
    "The pick leads with the viewer's $10 and asks where it goes, which no title read here does.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by relevance and by views): food-cost Shorts break out (Earning Earth's '$5 Lemonade' 21.8M; Finance USA 158K from 341 subscribers); "
                  "two put food cost against the price and call the rest profit, the belief this Short strikes. None splits a Chipotle order into its 10-K lines; Chipotle's big Shorts are food hacks.")

OUTLIERS = [
    {"handle": "@yourgrandmas_bf", "platform": "TikTok", "id": "7685809892430548238",
     "on_screen": "Why your latte costs $7", "views": "2.1M (13.4x the account median of 156.8K)",
     "note": "a coffee-shop owner splits a $7 latte into ingredients, labor and overhead: the same split, on one drink"},
    {"handle": "@icedcoffeehour", "platform": "Instagram", "id": "DdQozPKgk0a",
     "on_screen": "WHAT'S THE PROFIT MARGIN ON A PIZZA?", "views": "1.1M (3.2x the account median of 333.9K)",
     "note": "a podcast clip; the hook is the question, no number"},
    {"handle": "@flickman", "platform": "Instagram", "id": "Da3YK59IJZ5",
     "on_screen": "How does this business afford rent in NYC? $4.8k/mo??", "views": "265.5K (18.5x the account median of 14.4K)",
     "note": "an estimated monthly P&L of one açaí franchise, line by line"},
    {"handle": "@owner_dot_com", "platform": "TikTok", "id": "7669822451299159310",
     "on_screen": "Five Guys / $13+", "views": "148.7K (61.8x the account median of 2.4K)", "note": "why a chain's price is what it is"},
    {"handle": "@officialshawnlynch", "platform": "Instagram", "id": "DbJdUpwspWi",
     "on_screen": "WHAT A $5.73 MCDONALD'S BURGER ACTUALLY COSTS TO MAKE", "views": "47.4K (28.8x the account median of 1.6K)",
     "note": "'actually' plus one chain price: the same hook grammar as the pick"},
]
OUTLIERS_HEADING = "**3. 'What does it really cost them?' breaks out on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@yourgrandmas_bf** (TikTok), \"Why your latte costs $7\": 2.1M (13.4x). A coffee-shop owner splits one drink into ingredients, labor and overhead, the same split as this Short.",
    "- **@icedcoffeehour** (Instagram), \"WHAT'S THE PROFIT MARGIN ON A PIZZA?\": 1.1M (3.2x). A podcast clip that opens on the question.",
    "- **@flickman** (Instagram), \"How does this business afford rent in NYC? $4.8k/mo??\": 265.5K (18.5x). One franchise's P&L, line by line.",
    "- **@owner_dot_com** (TikTok), \"Why Five Guys Is So Expensive 🍔\": 148.7K (61.8x). **@officialshawnlynch** (Instagram), \"WHAT A $5.73 MCDONALD'S BURGER ACTUALLY COSTS TO MAKE\": 47.4K (28.8x).",
    "- All five open on a chain's price and a cost question, with no answer on screen: the shape of this Short's frame 1 and of the caption's first line. All five are talking heads or b-roll; none draws the split as a sheet.",
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
    "The channel has no company-breakdown Short yet; the nearest is 06c (Starbucks, a chain's product against its stock: 760 views, 1,711 plays). "
    "The missing-dollar puzzle, the other 'where did the money go' Short, is the best on YouTube (1,256) and holds 81.3% on Instagram. "
    "06b (Mon 12 Oct, 12:14 ET) is too young to compare; its Reel shows 7 plays so far, and Instagram's owner insights lag.",
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
    "The write-up's sources rest on search-result text: its egress proxy blocked the primary pages. Chipotle's labor, occupancy and other operating costs ($ thousands) rest on its round-1 read of the release; "
    "the 10-K's percentages (25.1 / 5.2 / 14.7) agree, but within that 0.1-pt rounding each cent could move by ±1¢. Before posting, open the FY2025 10-K's income statement and re-run the check (the write-up's open item 1).",
    "Third-party claims in the research tables (a Big Mac meal's 'nearly $4.40', a pizza's '$7 contribution margin') are those videos' own descriptions, not verified here, and none is in the copy.",
    "The video, the cover and the video facts are the shipped condensed cut (2026-10-13); the copy is cut-independent and carried over from the pre-condense cut unchanged.",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "$3 Burrito Hack at Chipotle // Food Hacks", "channel": "HellthyJunkFood Shorts", "subscribers": 356000, "views": 36997480,
         "published": "2022-09-09", "note": "Chipotle's Shorts audience is food and hacks"},
        {"title": "INSANE $3 CHIPOTLE BURRITO BOWL HACK #shorts", "channel": "David Paykin", "subscribers": 807000, "views": 27615379,
         "published": "2021-10-31", "note": "outlier score 939.1"},
    ],
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "100 credits for this teaser (5 keyword queries, 3 YouTube searches, 1 Instagram/TikTok outlier search, 10 title scores and 1 re-score; 5 each), plus 10 shared across 05a-05c for the channel's stats and Shorts list (Instagram owner insights cost 0). "
                     "The adversarial check used 40 more across 05a-05c at 5 each: 3 title scores, 3 keyword re-queries, 1 lookup of the 3 related videos and 1 list of the channel's Shorts by views; Instagram owner insights cost 0. The account's shared balance went 3,885 → 3,795 over the check, because other agents draw on it in parallel.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), and {MATH_RUN_WIP} with --spec on the condensed WIP specs, whose strings, numbers and verdicts are the same; "
                "the 7 lines recomputed from the FY2025 dollar lines in MATH_RELATIONS (shares, cents, the $10.00 total with no plug, the $8.71 check, the $7.04 guess, crew ≈ 1.95× profit); "
                "COPY_RULES keep every rounded amount 'about' or '≈' (the exact check and guess workings excepted), keep $7 a question or a 'not', keep the tax line net of interest wherever it sits beside the $1.29 or the $0.34, "
                "keep the exact table in the Instagram first comment, and keep the average condition and both disclaimers in the copy; re-run at the adversarial check with the same result (583 with --spec after the condense critic fixes)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: chipotle 72,674 / 56.5 (+24.0%); restaurant profit margin 4,250 / 38.2; fast food 141,454 (-20.8%); "
                   "title scores 94 (pick), 82 (write-up title), 93 (best hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried after the build: the pick's title score 94. Match. "
                   "Re-queried at the adversarial check: the pick's title score 94; 'chipotle' 72,674 / 56.5 (+24.0%, snapshot 2026-10-12); the related video LjHDFzVxRyM 1,254 views, still the channel's most-viewed Short "
                   "(next: June's 'Why the minimum payment keeps you in debt for 19 years', 1,230); Instagram 8 followers, 20,520 views in 30 days. All match within view-count drift.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` ({MATH_RUN_WIP} with `--spec` on the condensed WIP specs). Every public figure traces to the 05a maths table: revenue 11,925,601 ($11.9 billion); "
    "food 3,527,043 (29.6%, ≈ $2.96), labor 2,991,680 (25.1%, ≈ $2.51), occupancy 624,898 (5.2%, ≈ $0.52), other operating 1,755,824 (14.7%, ≈ $1.47), "
    "the residual 1,090,358 (9.1%, ≈ $0.91), tax 473,758 − interest 73,721 = 400,037 (3.4%, ≈ $0.34; the tax alone ≈ $0.40), net income 1,535,761 (12.9%, ≈ $1.29); "
    "cents add to $10.00; $10 − $2.96 = $7.04; $10 − $8.71 = $1.29; crew ÷ profit = 1.95. The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 94, the write-up's title 82. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 94, as first scored. Again at the adversarial check: the pick 94; 'chipotle' 72,674 / 56.5 (+24.0%); "
    "LjHDFzVxRyM 1,254 views (1,256 at the build), still the channel's most-viewed Short. All match.",
    "- **Mutation test.** Eight breaks on scratch copies of this file all fail by name: a bare '$1.29' in the caption, '$7.04' stated as a claim, a title that gives the profit, the affiliation line dropped from the caption, the tax line without the interest, a wrong cent ('$1.30'), 'nearly twice', and the verdict moved above the fold. (22 of 22 across 05a-05c.)",
    "- **Kept on purpose.**",
    "  - The YouTube thumbnail is frame 1 (the guess, no answer) and the Instagram cover is the finished sheet, each as the write-up's per-platform note asks. The no-result rule covers the title and the caption's first 125 characters.",
    "  - The write-up's caption line 1 ('Nowhere near $7.') sits below the fold on Instagram, and in the description's opening, which is written for the search snippet.",
    "  - The tax line is always 'minus the interest Chipotle earns' (the write-up's labelled fact), and the description says the tax alone would be about $0.40.",
    "  - The pinned comment opens on the write-up's own question ('Which chain's $10 next?') and keeps its exact table, with 'interest and other income', the 10-K line's name.",
    "- **Adversarial pass (2026-10-13): changed.**",
    "  - The description's opening said 'After rent, ads, delivery and card fees, HQ and tax, Chipotle keeps about $1.29'. Read literally that is 6¢ off: after the tax alone (≈ $0.40) "
    "it would keep ≈ $1.23, and the $1.29 is after tax minus the interest Chipotle earns. It now says 'HQ, and tax (minus the interest it earns)', the write-up caption's own wording, "
    "and a new COPY_RULE requires 'interest' on every line that puts tax beside the $1.29 or the $0.34.",
    "  - The Instagram first comment was a rounded summary. The write-up's Instagram note says 'Put the pinned comment's exact table in the first comment', "
    "so the summary and its question stay first (the collapsed preview) and the pinned comment's exact FY2025 table follows; a new COPY_RULE requires it.",
    "  - The tag 'chipotle price increase' is dropped: the video does not cover price increases, and YouTube's spam policy counts tags that do not describe the video as misleading metadata. "
    "Its keyword row stays, marked 'not in the tags'.",
    "  - The maths count with `--spec` on the WIP specs is now 583 checks, 0 failed: the condense's critic fixes (05b, 05c) added rows after the first build (579). Strings, numbers and verdicts are unchanged.",
    "  - Mutation test of the new rules on scratch copies: the old 'HQ and tax' opening and a first comment without the table each fail by name.",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 05a table and both runs of the check (560 on studio/specs/, 583 with --spec); "
    "the title, description (bytes), tags, hashtags, caption (first 125) and both alt texts against the limits; 'Chipotle' used only to name the 10-K's company, with the affiliation line in both; "
    "no advice; frame 1 of the condensed WIP render read as a still: the hook caption is complete on it and the answer is not; the cover read as a still: the finished sheet on the 3:4 crop.",
    "- **Still to do.** The primary-source check above.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The finished sheet was re-picked by content at 11.9 s (frame 357), after the last stamp settles. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 05a maths table (teasers/v2/05-split-sheet.md, section 05a) and
# recomputed below from Chipotle's FY2025 dollar lines ($ thousands); dates and the 10-K's name are inputs.
FIGURES = {
    "$10", "$2.96", "$2.51", "$0.52", "$1.47", "$0.91", "$0.34", "$0.40", "$1.29", "$7.04", "$7", "$8.71", "$11.9", "$10.00",
    "29.6", "25.1", "5.2", "14.7", "9.1", "3.4", "12.9", "7",
    "2025", "2026", "10", "4", "3",
    "11,925,601", "3,527,043", "29.58", "2,991,680", "25.09", "624,898", "5.24", "1,755,824", "14.72",
    "1,090,358", "9.14", "473,758", "73,721", "400,037", "3.35", "1,535,761", "12.88",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_q = lambda x, e="0.01": _D(x).quantize(_D(e), _UP)
_rev = 11925601
_lines = {"food": 3527043, "labor": 2991680, "occupancy": 624898, "other": 1755824}
_opinc, _tax, _int = 1935798, 473758, 73721
_hq = _rev - sum(_lines.values()) - _opinc
_taxnet = _tax - _int
_ni = _opinc + _int - _tax
_parts = [_lines["food"], _lines["labor"], _lines["occupancy"], _lines["other"], _hq, _taxnet, _ni]
_cents = [_q(_D(10) * p / _rev) for p in _parts]
_pct1 = [_q(_D(100) * p / _rev, "0.1") for p in _parts]
_pct2 = [_q(_D(100) * p / _rev) for p in _parts]
MATH_RELATIONS = [
    (_hq == 1090358 and _taxnet == 400037 and _ni == 1535761, "residual 1,090,358; tax − interest 400,037; net income 1,535,761 (= 1,935,798 + 73,721 − 473,758)"),
    ([str(c) for c in _cents] == ["2.96", "2.51", "0.52", "1.47", "0.91", "0.34", "1.29"], "× $10: $2.96 / $2.51 / $0.52 / $1.47 / $0.91 / $0.34 / $1.29"),
    ([str(p) for p in _pct1] == ["29.6", "25.1", "5.2", "14.7", "9.1", "3.4", "12.9"], "shares to 0.1 pt: 29.6 / 25.1 / 5.2 / 14.7 / 9.1 / 3.4 / 12.9"),
    ([str(p) for p in _pct2] == ["29.58", "25.09", "5.24", "14.72", "9.14", "3.35", "12.88"], "pinned shares to 0.01 pt"),
    (sum(_parts) == _rev and sum(_cents) == _D("10.00") and sum(_pct1) == _D("100.0"), "the 7 lines add to revenue, $10.00 and 100.0 with no plug"),
    (sum(_cents[:6]) == _D("8.71") and _D(10) - _D("8.71") == _cents[6], "check: $10 − $8.71 of costs = $1.29"),
    (_D(10) - _cents[0] == _D("7.04"), "the guess: $10 − $2.96 = $7.04"),
    (_q(_D(10) * _tax / _rev) == _D("0.40"), "the tax alone ≈ $0.40 per $10 (why the row is net of interest)"),
    (_q(_D(_rev) / 1000000, "0.1") == _D("11.9"), "revenue 11,925,601K ≈ $11.9 billion"),
    (1.9 <= _lines["labor"] / _ni < 2, "crew ÷ profit = 1.95: 'almost twice'"),
]
MATH_SCRIPT = "teasers/v2/checks/05-split-sheet.py"
MATH_KEY_LINES = ["profit                           1,535,761   12.8778%  ->  12.9%  $1.2878 -> ≈ $1.29",
                  "costs shown $8.71; guess $10 − $2.96 = $7.04"]
RESULT_RE_TITLE = r"(?i)1\.2|12\.9|2\.9|2\.5|\.52|1\.4|\.91|\.34|8\.7|7\.0|twice|nowhere|not even|not \$7"
RESULT_RE_CAPTION = r"(?i)1\.2|12\.9|2\.9|2\.5|\.52|1\.4|\.91|\.34|8\.7|7\.0|\$7|twice|nowh|not even|not \$|keeps"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines_of = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _approx_or_working(pat):
    """every occurrence of pat is 'about '/'≈ ' or sits inside an exact working ('$10 − $2.96 = …', '… = $1.29')"""
    ok = True
    for v in _COPY.values():
        for m in _re.finditer(pat, v):
            before, after = v[max(0, m.start() - 6):m.start()], v[m.end():m.end() + 3]
            ok &= bool(_re.search(r"(?:about|≈) $", before) or _re.search(r"[−=] $", before) or _re.match(r" =", after))
    return ok


def _with(pat, needs, skip=()):
    """every line that names pat also matches one of needs (regexes)"""
    return all(any(_re.search(n, ln) for n in needs) for ln in _lines_of(skip) if _re.search(pat, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_approx_or_working(p) for p in (r"\$2\.96", r"\$2\.51", r"\$0\.52", r"\$1\.47", r"\$0\.91", r"\$0\.34", r"\$0\.40", r"\$1\.29")),
     "every rounded amount is 'about' or '≈', except inside the exact workings ($10 − $2.96 = $7.04; $10 − $8.71 of costs = $1.29)"),
    (_with(r"\$7\b|\$7\.04", (r"\?", r"[Nn]ot\b", r"[Nn]owhere near")) and not _re.search(r"(?:about|≈) \$7", _ALL),
     "the $7.04 guess is always a question or a 'not', never a claim and never 'about $7'"),
    (_with(r"\$0\.34", (r"interest",)), "the $0.34 tax line is always net of the interest Chipotle earns (the write-up's labelled fact)"),
    (all("not your order" in _COPY[k] for k in ("description", "caption", "first comment")) and "average" in YT_DESCRIPTION and "average" in IG_CAPTION,
     "the condition (a company-wide average, not your order) is in the description, the caption and the first comment"),
    (all("Not affiliated with or endorsed by Chipotle." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "'Not financial advice.' and 'Not affiliated with or endorsed by Chipotle.' are in the description and the caption"),
    ({w.lower() for w in _NUMBER_WORDS.findall(_ALL)} <= {"twice", "billion"}
     and all(_re.search(r"almost $", _ALL[max(0, m.start() - 7):m.start()]) for m in _re.finditer(r"twice", _ALL))
     and all(_re.search(r"\$11\.9 $", _ALL[max(0, m.start() - 6):m.start()]) for m in _re.finditer(r"billion", _ALL)),
     "no spelled-out figures except 'almost twice' (crew ÷ profit = 1.95) and the release's '$11.9 billion'"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bstop (?:buying|eating)\b|\bdon't (?:buy|eat)\b", _ALL), "no advice wording"),
    (all("interest" in ln for ln in _lines_of() if _re.search(r"(?i)\btax\b", ln) and _re.search(r"\$(?:1\.29|0\.34)", ln)),
     "every line that puts tax beside the $1.29 or the $0.34 says it is net of the interest Chipotle earns (the tax alone is ≈ $0.40)"),
    (all(x in IG_FIRST_COMMENT for x in ("11,925,601", "1,535,761", "473,758", "73,721")),
     "the Instagram first comment carries the exact FY2025 table (the write-up's Instagram note)"),
]
