# 05c publishing data: is Costco's profit all membership fees? Follow your $100 cart (Scoreboard, split-sheet).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06b-scoreboard-netflix-bill.py (the nearest
# Scoreboard precedent).
#
# Facts come only from teasers/v2/05-split-sheet.md (section 05c) and python3 teasers/v2/checks/05-split-sheet.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "05c Scoreboard, split-sheet: \"Is Costco's profit all membership fees? Follow your $100 cart\""
PREPARED = "2026-10-13"
SHORT_ID = "05c"
MD_TITLE = "05c publishing sheet: is Costco's profit all membership fees?"
MATH_RUN = "560 checks, 0 failed"      # python3 teasers/v2/checks/05-split-sheet.py on studio/specs/ (the full cuts; the check is cut-aware since 2026-10-13)
MATH_RUN_WIP = "583 checks, 0 failed"  # the same check with --spec on the three condensed WIP specs in studio/specs-wip/, re-run at the adversarial check after the condense critic fixes (579 at the first build)
MATH_RUN_SHIP = "583 checks, 0 failed"  # python3 teasers/v2/checks/05-split-sheet.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "38179927b7c1128789734f5a06be67cb97cfefaa5c5f7b768861f99bb319e993"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 25.3 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/05-split-sheet.md` (05c) and its check, "
    f"`python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; {MATH_RUN_WIP} with `--spec` on the condensed WIP specs, whose strings, numbers and verdicts are unchanged). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every line from Costco's FY2026 income statement, "
    "keeps every rounded amount 'about' or '≈' (the exact workings excepted), keeps '≈ $1.94' with its 'before tax', and keeps every 'half' an 'about' or 'almost'.",
    "- **Honesty rules kept.** The title asks and never gives the result, and the YouTube thumbnail is frame 1 (the rows all '?'). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the verdict frame, as the write-up's Instagram note asks (as on 06c and 03a). Every claim stays inside the video's verdict, \"Not all fees: your cart leaves ≈ $1.94. Membership fees: ≈ $1.99.\", "
    "and the copy says its conditions: company-wide FY2026 averages, before interest and tax, not your receipt. The copy never says 'Costco keeps' (the write-up's rule). "
    "No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Costco\" is used only to name the company whose 10-K the maths reads. Both platforms' copy says 'Not affiliated with or endorsed by Costco.' "
    "The video has no logo and no store footage; the bag icon is the kit's own. No brand handle is tagged (the write-up's Instagram note), and no share price is named.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 25.3, "sha256": "38179927b7c1128789734f5a06be67cb97cfefaa5c5f7b768861f99bb319e993",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/05-split-sheet.md section 05c; teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "period": "Costco FY2026, the 52 weeks ended Aug 30, 2026 ($ millions): FY2026 Form 10-K (filed Oct 6, 2026) and the Sept 24, 2026 results release",
    "net_sales": "297,247 = total revenue 303,154 − membership fees 5,907 (reported as $297.2 billion)",
    "rows": "the stuff itself (merchandise costs) 264,279 ≈ $88.91 per $100; staff & warehouses (SG&A) 27,190 ≈ $9.15; left from your cart 5,778 ≈ $1.94, before tax; rows add to $100.00 with no plug",
    "fees": "membership fees 5,907 ≈ $1.99 per $100 of sales (not part of your $100)",
    "operating_income": "11,685 = cart 5,778 (49.4%) + fees 5,907 (50.6%) ≈ $3.93 per $100 of sales; the cart makes 97.8% as much as the fees; reported $11.69B",
    "net_income": "9,226 ≈ $3.10 per $100 of sales after interest and tax; the fees are 64% of it, so not all of it either (pinned comment and description only)",
    "assumption": "company-wide totals ÷ company-wide net sales × $100, before interest and income tax: not one receipt and not a markup on any item",
    "verdict": "Not all fees: your cart leaves ≈ $1.94. Membership fees: ≈ $1.99. (VO: 'Profit: ≈ $3.93. Your cart makes almost half.')",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "How Much Does Costco Make on Your $100 Cart? Is It Really All Membership Fees?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 96,
     "note": "PICK. Top score of the 11 scored. The first question (44 characters) is the viewer's own cart; the second is the header's factoid, with the write-up's 'Really' doubt cue "
             "('how costco really makes money' +237.6%). No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "How Much Does Costco Make on Your $100 Cart? Is It All Membership Fees?", "vidiq_score": 95,
     "note": "The pick without 'Really': 1 point lower, 7 characters shorter. The fallback if the pick reads as too long in the player."},
    {"rank": 3, "title": "How Much Does Costco Make on Your $100 Cart?", "vidiq_score": 93,
     "note": "The first question alone (44 characters). It drops the factoid the video busts, the reason the header exists."},
]
YT_TITLES_ALSO_SCORED = [
    ("Does Costco Make All Its Profit From Membership Fees?", 92, "the factoid as a yes/no, without the $100 cart"),
    ("How Does Costco Make Money? Is It Really All Membership Fees?", 90, "the exact phrase 'how does costco make money' (38,579)"),
    ("How Costco Really Makes Money: Is It All Membership Fees? Follow Your $100 Cart", 90, ""),
    ("How Costco Makes Money: Is It All Membership Fees? Follow Your $100 Cart", 89, "the exact phrase 'how costco makes money' (89,426)"),
    ("Does Costco Really Make All Its Money From Membership Fees? Follow Your $100 Cart", 87, ""),
    ("Does Costco Make All Its Profit From Membership Fees? Follow Your $100 Cart", 86, ""),
    ("Does Costco Make All Its Profit From Membership Fees? #costco #businessmath #moneymath", 83, "the house 3-hashtag form"),
    ("Is Costco's Profit All Membership Fees? Follow Your $100 Cart", 82, "the write-up's title and header"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 82 to 96. The first question puts the viewer's own $100 cart first ('Costco' at characters 15-20); the second asks the header's question, "
    "the factoid a dozen Shorts posted since mid-September repeat (research, section 2).",
    "It names no result: not ≈ $1.94, not ≈ $1.99, and not 'not all'. Both questions are the ones the video answers, in its own unit (per $100).",
    "The 'how costco makes money' phrasings (89,426 and 38,579 searches a month) score 89-90 as titles; the pick keeps them for the tags and the description's opening. "
    "vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """How much does Costco make on your $100 cart, and is it all membership fees? Not all fees. Of every $100 rung up in fiscal 2026, the cart leaves about $1.94 before tax, and membership fees bring in about $1.99. About half each.

The math, shown (Costco FY2026, the 52 weeks ended Aug 30, 2026; per $100 of net sales):
• The stuff itself (merchandise costs): $264,279M ÷ $297,247M × $100 ≈ $88.91.
• Staff & warehouses (SG&A): $27,190M ÷ $297,247M × $100 ≈ $9.15.
• Left from your cart, before tax: $100 − $88.91 − $9.15 = $1.94.
• Check: $88.91 + $9.15 + $1.94 = $100.00.
• Membership fees: $5,907M ÷ $297,247M × $100 ≈ $1.99 per $100 of sales.
• Operating profit: cart $5,778M + fees $5,907M = $11,685M, about $3.93 per $100. The cart makes almost half (49.4%).

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Source: Costco's FY2026 Form 10-K (filed Oct 6, 2026) and its Q4 and fiscal 2026 results (Sept 24, 2026). Net sales $297,247M = total revenue $303,154M − membership fees $5,907M. Company-wide averages before interest and income tax: not your receipt, and not a markup on any item. Merchandise costs include inbound freight, depot costs and fresh-food prep; SG&A is mainly wages and warehouse running costs. After interest and tax, net income was $9,226M, about $3.10 per $100 of sales, and the fees are 64% of it: not all of it either. Not financial advice. Not affiliated with or endorsed by Costco.
#Costco #CostcoMembership #BusinessModel"""
DESC_MULTIBYTE = "`÷`, `×`, `≈`, `•`, `−`, `—`"
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 03a: the verdict is 'about half each', not a number that shouldn't be true.")

YT_HASHTAGS = ["#Costco", "#CostcoMembership", "#BusinessModel"]
YT_HASHTAG_NOTES = [
    ("#Costco", "the brand ('costco' 329,799 searches a month, flat)."),
    ("#CostcoMembership", "the header's factoid ('how costco membership makes money' 7,618 a month; 'costco membership fees' 4,179)."),
    ("#BusinessModel", "the broad category ('business model explained' 46,153 a month, +119.0% on its 30-day baseline); the tag the same-idea Shorts use."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["how costco makes money", "how does costco make money", "how costco really makes money", "how costco membership makes money",
           "costco membership fees", "costco", "how costco works", "why costco is so cheap", "how companies make money",
           "business model explained", "business breakdown", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. "
             "Left out on purpose: 'costco deals' (47,392, +324.9%) and 'costco shopping' (11,242) are shopping intent, and 'how costco actually makes money' (21,802) is falling (-54.2%).")

YT_PINNED = """Which store's $100 next?

The working, FY2026 ($ millions): net sales 297,247 (= total revenue 303,154 − membership fees 5,907). Merchandise costs 264,279 (88.909%) · SG&A 27,190 (9.147%) · left 5,778 (1.944%). Membership fees 5,907 = 1.987% of sales. Operating income 11,685 = 5,778 (49.4%) + 5,907 (50.6%). Net income 9,226, about $3.10 per $100 of sales after interest and tax; the fees are 64% of it, so not all of it either."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's own pinned ask. "
               "The second paragraph is the write-up's exact table. It answers the two comments to expect: 'the fees are over half' (they are 50.6% of operating income: about half each) "
               "and 'what about after tax?' (the fees are 64% of net income, still not all of it).")

RELATED_VIDEO = {
    "pick": {"id": "krfZEHhb0xU", "title": "What If You Bought Netflix Stock Instead of Paying for Netflix?",
             "url": "https://www.youtube.com/shorts/krfZEHhb0xU",
             "why": "06b, live since Mon 12 Oct 2026: a company's recurring fee (a Netflix bill) in money math, next to this Short's membership fee. Both name a brand and say they are not affiliated with it."},
    "swap_when_live": "05a (where your $10 at Chipotle goes), the same split-sheet series, once published. Then point 05a's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame (the write-up's YouTube cover): hero $100.00, the three cart rows all '?', the membership row ≈ $1.99. The Instagram cover is the verdict frame instead."
THUMB_MD = ("in the YouTube app, pick frame 1, the write-up's YouTube cover: the header question, the hero at $100.00, the three cart rows all '?' and the membership-fees row ≈ $1.99 under them. "
            "Its hook caption ('≈ $88.91 of your $100 buys the stuff.') is already up, a row, not the answer. It asks without answering. The Instagram cover below is the verdict frame, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, on a different evening from 05a and 05b, and in a different week from 08a (also Costco on the Scoreboard look; the write-up's open item 4). Suggested order within the series: 05c, then 05b, then 05a.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "05c goes first: the factoid is circulating now (a dozen same-idea Shorts since mid-September, one on 12 Oct), 'how costco really makes money' runs +237.6% and 'how costco works' +244.7% over their 30-day baselines, "
           "and Costco's FY2026 results are under three weeks old (Sept 24).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("How much does Costco make on your $100 cart? Is its profit really all membership fees? "
           "Follow your $100 line by line, from Costco's own 10-K.")

IG_CAPTION = IG_HOOK + """

Not all fees. Your cart makes almost as much.

The math, shown (FY2026, per $100 of sales):
• The stuff itself: about $88.91.
• Staff & warehouses: about $9.15.
• Left from your cart: $100 − $88.91 − $9.15 = $1.94, before tax.
• Membership fees: about $1.99 per $100 of sales.
• Operating profit: about $3.93 per $100. Cart $5,778M + fees $5,907M = $11,685M, about half each.

Costco FY2026 Form 10-K (filed Oct 6, 2026) and Q4 and fiscal 2026 results (Sept 24, 2026), the 52 weeks ended Aug 30, 2026. Company-wide averages before interest and tax, not your receipt. Not financial advice. Not affiliated with or endorsed by Costco.

Which store's $100 next?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#costco #costcomembership #businessmodel #businessmath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the viewer's $100 cart, the 'Costco' and 'membership fees' keywords and the header's question, no result: "
                   "the caption overlays the Reel from frame 1, so the verdict and every dollar sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the title's two questions, with no figure but the $100 stake. The write-up's caption line 1 is the verdict ('Not all fees. Your cart makes almost as much.'); "
    "the house rule moves it below 'more', because the caption overlays the Reel from frame 1. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "'Before tax' sits on the ≈ $1.94 line and in the averages line, as on screen, and 'about half each' is the write-up's own wording (49.4% and 50.6%).",
    "No brand handle is tagged, as the write-up's Instagram note asks. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#costco", "#costcomembership", "#businessmodel", "#businessmath", "#personalfinance"]
IG_HASHTAG_MD = [
    "Two are the write-up's own (`#costco #businessmath`; its `#backoftheenvelope` repeats the handle and `#moneymath` gives way to the broad layer):",
    "",
    "- `#costco` names the brand and `#costcomembership` the factoid the header asks about.",
    "- `#businessmodel` is the tag the same-idea Shorts and the @cashepreneurs outlier's subject share; `#businessmath` says what kind of video it is.",
    "",
    "`#personalfinance` is the broad layer, as on 06b, 06c and 03a.",
]

IG_ALT_SHORT = "Chart: per $100 at Costco, the cart leaves about $1.94 before tax; fees bring about $1.99."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps both halves of the verdict with 'before tax'.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header asks: is Costco's profit all membership fees? Follow your $100 cart. "
               "A counter starts at $100.00 and counts down to what is left as the rows land: the stuff itself about $88.91, staff and warehouses about $9.15, "
               "and left from your cart about $1.94 before tax. The rows add back to $100.00. A membership-fees row shows about $1.99 per $100 of sales. "
               "The counter turns to operating profit per $100, about $3.93: the cart makes almost half. "
               "Verdict: not all fees: your cart leaves about $1.94 before tax, and membership fees bring about $1.99.")

IG_FIRST_COMMENT = ("Per $100 rung up at Costco in fiscal 2026: the cart leaves about $1.94 before tax, and membership fees bring in about $1.99. "
                    "Not all fees: about half each. Which store's $100 next?")

# ---------------------------------------------------------------- the cover frame
# The verdict frame, picked by content: the write-up's Instagram note names "the verdict frame (≈ $1.94 against ≈
# $1.99)". On the shipped condensed cut the verdict lands at 7.29 s and the board settles by about 7.77 s; the last
# caption ('Profit: ≈ $3.93. Your cart makes almost half.') stays under the verdict until the end card at 8.89 s. Frame
# 249 (8.30 s) is used, the frame the condense critic kept.
COVER_T = 8.3
COVER_FRAME = 249
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The verdict frame, as the write-up's Instagram note asks (≈ $1.94 against ≈ $1.99): the header question, the hero 'PROFIT PER $100 ≈ $3.93', "
                          "the footer 'cart $5,778M + fees $5,907M = $11,685M', the three landed rows (≈ $88.91, ≈ $9.15 and ≈ $1.94, with the pointer on 'Left from your cart'), "
                          "the membership-fees row ≈ $1.99, and the verdict 'Not all fees: your cart leaves ≈ $1.94. Membership fees: ≈ $1.99.' "
                          "On any cut, use a settled frame of the verdict hold, before the end card: on the shipped condensed cut the last caption stays under the verdict (on the pre-condense cut it had cleared by then).")
COVER_FRAME_MEASURED = ("On the shipped 11.4 s condensed cut the verdict lands at 7.29 s and the board settles by about 7.77 s (from then the frame-to-frame mean luma change "
                        "is mostly under 0.005, with blips to 0.15, 270×480 greyscale); the last caption stays under the verdict until the end card at 8.89 s. Frame 249 (8.30 "
                        "s) is used. On the 25.3 s pre-condense render it was frame 660 (22.00 s), after the caption had cleared.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 0 to 1440 of the 1080×1920 frame: the badge (from y 141), the header, the hero, the footer, the board and the verdict (to y 1281), "
                   "with near-even margins (141 px above, 159 px below); it drops the empty black below. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used on Instagram:** frame 1 (the hero at $100.00, the three cart rows all '?', the membership row ≈ $1.99 already landed). It asks without answering, so it is the YouTube thumbnail, "
    "as the write-up's YouTube note asks; on Instagram the write-up picks the verdict frame.",
    "**Shipped cut (2026-10-13):** the verdict frame was re-picked by content on the shipped file (8.3 s, the first settled frame of the verdict hold that the condense critic kept: ≈ $1.94, ≈ $1.99 and ≈ $3.93 on the board, the verdict, and the last caption under it) and both JPGs re-exported from it.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut replaced the pre-condense render in renders/channel on 2026-10-13; get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 05c-25.3s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Your $100 Costco cart vs the fees — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 05a and 05b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("how costco makes money", 89426, 73.9, 33.5, 70.9, "+19.7% vs its 30-day baseline (74,718); the biggest Costco question", "2026-10-12"),
    ("how does costco make money", 38579, 68.5, 31.0, 68.7, "seed; +20.2% vs its baseline (32,088)", "2026-10-12"),
    ("how costco actually makes money", 21802, 64.8, 26.9, 68.1, "-54.2% vs its baseline (47,568)", "2026-10-12"),
    ("how costco works", 17539, 63.4, 46.0, 59.6, "+244.7% vs its baseline (5,088)", "2026-10-12"),
    ("how costco really makes money", 17420, 63.3, 39.5, 62.2, "+237.6% vs its baseline (5,160)", "2026-10-12"),
    ("how costco membership makes money", 7618, 57.9, 23.0, 65.6, "the factoid the header names", "2026-10-12"),
    ("why costco is so cheap", 6936, 57.3, 30.3, 62.3, "-48.2% vs its baseline (13,401)", "2026-10-12"),
    ("costco membership fees", 4179, 54.1, 35.7, 58.2, "", "2026-10-10"),
    ("costco", 329799, 82.4, 61.2, 64.9, "-2.5% vs its baseline (338,300); the brand, crowded", "2026-10-12"),
    ("how companies make money", 126774, 76.2, 38.4, 70.3, "+40.3% vs its baseline (90,367)", "2026-10-12"),
    ("business model explained", 46153, 69.6, 42.5, 64.8, "+119.0% vs its baseline (21,071)", "2026-10-12"),
    ("costco deals", 47392, 69.8, 40.8, 65.6, "+324.9% vs its baseline (11,154); shopping intent, not in the tags", "2026-10-12"),
]
KEYWORD_MD_NOTE = {"costco deals": "+324.9%; shopping intent, not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-10-10).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("This is the strongest search cluster of the three: 'how costco makes money' (89,426) and 'how does costco make money' (38,579) are both rising (about +20%) at low competition (31-34), "
            "and the 'really' and 'works' variants have more than tripled their baselines (+237.6%, +244.7%). The video answers that question with the fees in it, "
            "so the phrases go to the tags and the description's opening, and the title adds the 'Really' cue. Shopping searches ('costco deals', +324.9%) stay out.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Why everyone loves Costco", "Morning Brew", 695000, 7635239, "2025-06-30", "56 s; the brand's pull for business Shorts"),
    ("How Does Costco Make Money?", "The Motley Fool", 468000, 34911, "2019-02-12",
     "3:13; the same split on 2018 results: its description leaves about $1B from the merchandise against $3.1B of fees"),
    ("Costco Doesn't Make Money From Food (Here's the Real Trick)", "How They Profit", 2, 1506, "2026-10-09",
     "its description: fees 'about half of operating income' (FY2025)"),
    ("Costco Makes More From the Card Than the Groceries", "How It Pays Off", 2, 1321, "2026-10-12", "the same FY2026 figures"),
    ("How Costco Actually Makes Billions (It’s Not Groceries)", "The Value Ledger", 9, 1253, "2026-09-23",
     "its description: 'Over 70% of Costco's operating profit' from fees"),
    ("Costco Barely Makes Money Selling You Anything — Here's the Real Trick", "Behind The Brand", 24, 1214, "2026-09-26"),
    ("Costco (COST) Makes Half Its Profit Before You Buy Anything", "SORA FINANCE CREATOR", 121, 1185, "2026-09-28",
     "its description: fees about half of FY2026's $11.7 billion operating income"),
    ("Costco barely profits on what it sells", "Raza Zaidi", 441, 1051, "2026-09-21", "its description: 'Two-thirds of its $8 billion profit comes from membership fees alone'"),
    ("Costco Doesn't Make Money Selling You Food #shorts", "Ridvise", 411, 707, "2026-09-13", "its description: 'The membership fee is more than half the profit. The groceries are the bait.'"),
]
SAME_IDEA_HEADING = "**2. The factoid is everywhere on YouTube right now; nobody follows the $100 (vidIQ YouTube search, under 4 min, by views).**"
SAME_IDEA_MD = [
    "At least a dozen small channels posted 'Costco makes its money on the membership, not the food' between mid-September and 12 Oct 2026, all under 1,600 views. "
    "Their descriptions disagree on the size: 'about half' (How They Profit, SORA), 'two-thirds' (Raza Zaidi), 'over 70%' (The Value Ledger), 'more than half' (Ridvise). "
    "The Motley Fool's 2019 version did the split on 2018 results.",
    "",
    "None read here follows one $100 cart to the cent or sets the cart's leftover beside the fees per $100, which is this Short's whole sheet. "
    "That is why the title asks the factoid back ('Is It Really All Membership Fees?') and the copy answers with the write-up's FY2026 split (about half each), not with any of theirs.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views): at least a dozen 'Costco profits from membership, not food' Shorts since mid-September 2026, all under 1,600 views, "
                  "with descriptions claiming the fees are 'about half', 'two-thirds' or 'over 70%' of profit (not verified here). None follows a $100 cart or compares the two per $100.")

OUTLIERS = [
    {"handle": "@cashepreneurs", "platform": "Instagram", "id": "Db_LCDwBXxU",
     "on_screen": "Costco sells products at near-zero markup. Not because they're generous - because the products were never the business model.",
     "views": "1.6M (6.3x the account median of 260.9K)", "note": "the factoid this Short tests, as static text over b-roll"},
    {"handle": "@adivitius", "platform": "Instagram", "id": "DcuHE7nj4te",
     "on_screen": "Costco and Sam's Club sell similar products. But the viral pay comparison is wrong.", "views": "1.5M (11.8x the account median of 128K)",
     "note": "a Costco myth-bust: the viral claim named on screen, then checked"},
    {"handle": "@wealth.cap", "platform": "Instagram", "id": "DbHQpliFGFk",
     "on_screen": "Costco's $1.50 hot dog combo stayed $1.50 since 1985.", "views": "1.4M (7.9x the account median of 170.5K)",
     "note": "the hot-dog angle is 08a's (the write-up's open item 4)"},
    {"handle": "@nogood.io", "platform": "TikTok", "id": "7669867062939946271",
     "on_screen": "Are you following Costco's TikTok account yet?", "views": "1.4M (76.9x the account median of 18.2K)", "note": "Costco's business model as marketing commentary"},
    {"handle": "@revuence", "platform": "TikTok", "id": "7669867834452774166",
     "on_screen": "DO YOU KNOW WHY SUPERMARKET ROTISSERIE CHICKEN IS CHEAPER THAN A RAW ONE?", "views": "614.1K (55.2x the account median of 11.1K)",
     "note": "a retail-pricing question with no answer on screen"},
]
OUTLIERS_HEADING = "**3. Costco's business model travels on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@cashepreneurs** (Instagram), \"Costco sells products at near-zero markup. Not because they're generous - because the products were never the business model.\": 1.6M (6.3x). The factoid itself, which this Short tests.",
    "- **@adivitius** (Instagram), \"Costco and Sam's Club sell similar products. But the viral pay comparison is wrong.\": 1.5M (11.8x). A Costco myth-bust, the same move as this Short's verdict.",
    "- **@wealth.cap** (Instagram), \"Costco's $1.50 hot dog combo stayed $1.50 since 1985.\": 1.4M (7.9x). The hot-dog angle belongs to 08a.",
    "- **@nogood.io** (TikTok), Costco's business model as marketing commentary: 1.4M (76.9x). **@revuence** (TikTok), \"DO YOU KNOW WHY SUPERMARKET ROTISSERIE CHICKEN IS CHEAPER THAN A RAW ONE?\": 614.1K (55.2x).",
    "- The two Instagram business posts are static text with no voice, like this Short; @adivitius's is a myth-bust that names the claim first. A concept search for the membership factoid returned Costco shopping hacks, not breakdowns: the breakdown has not broken out on Instagram yet.",
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
    "The channel has no company-breakdown Short yet. Its two brand Shorts, 06c (Starbucks: 760 views, 1,711 plays) and 06b (Netflix, Mon 12 Oct 12:14 ET: 61 views so far), "
    "are too young to compare, and 06b's Reel shows 7 plays while Instagram's owner insights catch up.",
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
    "The write-up's sources rest on search-result text: its egress proxy blocked the primary pages. Costco's merchandise costs (264,279) and SG&A (27,190) are attributed to the FY2026 10-K by search; "
    "the identity 303,154 − 264,279 − 27,190 = 11,685 matches the independently reported $11.69B operating income. Before posting, re-run the check against the 10-K's own table (the write-up's open item 1).",
    "The same-idea Shorts' shares of profit from fees ('about half', 'two-thirds', 'over 70%') are their own descriptions, not verified here; the copy states only the write-up's FY2026 split.",
    "Slate overlap: 08a (Costco hot dogs as a unit) shares the brand and the Scoreboard look (the write-up's open item 4). Post them in different weeks, or move one, as the owner decides.",
    "The video, the cover and the video facts are the shipped condensed cut (2026-10-13); the copy is cut-independent and carried over from the pre-condense cut unchanged.",
]
RESEARCH_EXTRA = {
    "titles_scored": "11 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "95 credits for this teaser (4 keyword queries, 1 YouTube search, 2 Instagram/TikTok outlier searches, 11 title scores and 1 re-score; 5 each), plus 10 shared across 05a-05c for the channel's stats and Shorts list (Instagram owner insights cost 0). "
                     "The adversarial check used 40 more across 05a-05c at 5 each: 3 title scores, 3 keyword re-queries, 1 lookup of the 3 related videos and 1 list of the channel's Shorts by views; Instagram owner insights cost 0. The account's shared balance went 3,885 → 3,795 over the check, because other agents draw on it in parallel.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/05-split-sheet.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), and {MATH_RUN_WIP} with --spec on the condensed WIP specs, whose strings, numbers and verdicts are the same; "
                "every line recomputed from Costco's FY2026 income statement in MATH_RELATIONS (net sales, the 3 rows to the cent with no plug, the fees, operating and net income per $100, the 49.4/50.6 split, 64%); "
                "COPY_RULES keep every rounded amount 'about' or '≈' (the exact workings excepted), keep ≈ $1.94 'before tax', keep each per-$100 figure with its kind of profit, keep 'half' an 'about' or 'almost', and never say 'Costco keeps'; "
                "re-run at the adversarial check with the same result (583 with --spec after the condense critic fixes)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: how costco makes money 89,426 / 33.5 (+19.7%); how does costco make money 38,579 / 31.0 (+20.2%); costco membership fees 4,179 / 35.7; "
                   "title scores 96 (pick), 82 (write-up title), 83 (best hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried after the build: the pick's title score 96. Match. "
                   "Re-queried at the adversarial check: the pick's title score 96; 'how costco makes money' 89,426 / 33.5 (+19.7%, snapshot 2026-10-12); the related video krfZEHhb0xU 75 views (61 at the build, it is a day old); "
                   "Instagram 8 followers, 20,520 views in 30 days.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/05-split-sheet.py`: {MATH_RUN} on `studio/specs/` ({MATH_RUN_WIP} with `--spec` on the condensed WIP specs). Every public figure traces to the 05c maths table: net sales 303,154 − 5,907 = 297,247; "
    "264,279 ÷ 297,247 × $100 ≈ $88.91; 27,190 → ≈ $9.15; 5,778 → ≈ $1.94 (= $100 − $88.91 − $9.15); $88.91 + $9.15 + $1.94 = $100.00; fees 5,907 → ≈ $1.99; "
    "operating income 11,685 = 5,778 + 5,907 (49.4% / 50.6%) → ≈ $3.93; net income 9,226 → ≈ $3.10, fees 64% of it. The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 11 titles scored against this channel: the pick 96, the write-up's title 82. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 96, as first scored. Again at the adversarial check: the pick 96; 'how costco makes money' 89,426 / 33.5 (+19.7%); "
    "krfZEHhb0xU 75 views (growing; 61 at the build). All match.",
    "- **Mutation test.** Seven breaks on scratch copies of this file all fail by name: a bare '$1.99' in the caption, '$1.94' without 'before tax', 'Costco keeps', a bare 'half each', a title that gives the verdict ('Not All Membership Fees'), the affiliation line dropped from the description, and '$3.93' not named as operating profit. (22 of 22 across 05a-05c.)",
    "- **Kept on purpose.**",
    "  - The YouTube thumbnail is frame 1 (the rows all '?') and the Instagram cover is the verdict frame, each as the write-up's per-platform note asks. The no-result rule covers the title and the caption's first 125 characters.",
    "  - Dollar lines in millions, as the video's footer shows them ($5,778M + $5,907M = $11,685M), not the write-up caption's rounded billions, so every figure traces to the footer.",
    "  - Net income ($9,226M, ≈ $3.10 per $100, fees 64% of it) appears only in the description and the pinned comment, as in the write-up: the video's 'profit' is operating profit, before tax.",
    "  - No brand handle and no 'Costco keeps': the write-up's rules for 05c.",
    "- **Adversarial pass (2026-10-13): changed.**",
    "  - The long alt text put the counter's turn to ≈ $3.93 after the verdict, and said it counts down 'as each row lands'. On the condensed cut (what ships) the counter reaches ≈ $3.93 before the verdict, "
    "and it counts down with the first two rows only. It now lists the counter's turn and the verdict as two sentences, in the shipping cut's order, and says the counter counts down to what is left.",
    "  - The cover note for the condensed cut now names the write-up critic's pick: the first settled frame of the verdict hold, with the last caption under the verdict.",
    "  - The maths count with `--spec` on the WIP specs is now 583 checks, 0 failed: the condense's critic fixes dropped 05c's footer return to the assumption line at the check after the first build (579). "
    "The footer's text, every figure and the verdict are unchanged, so the copy stands.",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 05c table and both runs of the check (560 on studio/specs/, 583 with --spec); "
    "the title, description (bytes), tags, hashtags, caption (first 125) and both alt texts against the limits; 'Costco' used only to name the 10-K's company, no handle, the affiliation line in both; "
    "no 'Costco keeps'; no advice; the cover and the condensed WIP render's frame 1 and verdict hold read as stills.",
    "- **Still to do.** The primary-source check above.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The verdict frame was re-picked by content at 8.3 s (frame 249), with the last caption under the verdict. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 05c maths table (teasers/v2/05-split-sheet.md, section 05c) and
# recomputed below from Costco's FY2026 lines ($ millions); dates and the filings' names are inputs.
FIGURES = {
    "$100", "$100.00", "$88.91", "$9.15", "$1.94", "$1.99", "$3.93", "$3.10",
    "$264,279", "$297,247", "$27,190", "$5,907", "$5,778", "$11,685", "$303,154", "$9,226", "49.4", "64",
    "2026", "52", "30", "6", "24", "10", "4",
    "297,247", "303,154", "5,907", "264,279", "88.909", "27,190", "9.147", "5,778", "1.944", "1.987", "11,685", "50.6", "9,226",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_q = lambda x, e="0.01": _D(x).quantize(_D(e), _UP)
_rev, _fees, _merch, _sga, _ni = 303154, 5907, 264279, 27190, 9226
_sales = _rev - _fees
_left = _sales - _merch - _sga
_op = _rev - _merch - _sga
_per = lambda x: _q(_D(100) * x / _sales)
MATH_RELATIONS = [
    (_sales == 297247 and _q(_D(_sales) / 1000, "0.1") == _D("297.2"), "net sales 303,154 − 5,907 = 297,247 ($297.2 billion)"),
    ((_per(_merch), _per(_sga), _per(_left)) == (_D("88.91"), _D("9.15"), _D("1.94")) and _left == 5778, "per $100: ≈ $88.91 / ≈ $9.15 / ≈ $1.94 (left 5,778)"),
    (_D("88.91") + _D("9.15") + _D("1.94") == _D("100.00") and _D(100) - _D("88.91") - _D("9.15") == _D("1.94"), "rows add to $100.00 with no plug; $100 − $88.91 − $9.15 = $1.94"),
    (_per(_fees) == _D("1.99"), "membership fees 5,907 ≈ $1.99 per $100 of sales"),
    (_op == 11685 == _left + _fees and _q(_D(_op) / 1000) == _D("11.69"), "operating income 11,685 = cart 5,778 + fees 5,907 (reported $11.69B)"),
    (_per(_op) == _D("3.93") == _D("1.94") + _D("1.99"), "operating profit ≈ $3.93 per $100 = ≈ $1.94 + ≈ $1.99 on the shown rows"),
    (_q(_D(100) * _left / _op, "0.1") == _D("49.4") and _q(_D(100) * _fees / _op, "0.1") == _D("50.6"), "cart 49.4% / fees 50.6% of operating income: about half each"),
    (0.95 <= _left / _fees < 1 and 0.45 <= _left / _op < 0.5, "'almost as much' (97.8%) and 'almost half' (49.4%)"),
    (_per(_ni) == _D("3.10") and _q(_D(100) * _fees / _ni, "1") == _D("64") and _fees < _ni, "net income 9,226 ≈ $3.10 per $100; fees 64% of it, not all"),
    ([str(_q(_D(100) * x / _sales, "0.001")) for x in (_merch, _sga, _left, _fees)] == ["88.909", "9.147", "1.944", "1.987"], "pinned shares to 0.001 pt"),
]
MATH_SCRIPT = "teasers/v2/checks/05-split-sheet.py"
MATH_KEY_LINES = ["membership fees 5,907 -> ≈ $1.99 per $100; remaining hero $11.09 -> $1.94",
                  "operating income 11,685 = cart 5,778 (49.4%) + fees 5,907 (50.6%)"]
RESULT_RE_TITLE = r"(?i)1\.9|3\.9|88\.9|9\.15|half|not all|almost|\bno\b"
RESULT_RE_CAPTION = r"(?i)1\.9|3\.9|3\.1|88\.9|9\.1|11\.|49\.|50\.|64%|half|not all|almost|\bno\b|leaves"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines_of = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _approx_or_working(pat):
    """every occurrence of pat is 'about '/'≈ ' or sits inside an exact working ('$100 − $88.91 − $9.15 = $1.94', '$88.91 + …')"""
    ok = True
    for v in _COPY.values():
        for m in _re.finditer(pat, v):
            before, after = v[max(0, m.start() - 6):m.start()], v[m.end():m.end() + 3]
            ok &= bool(_re.search(r"(?:about|≈) $", before) or _re.search(r"[−+=] $", before) or _re.match(r" [−+=]", after))
    return ok


def _with(pat, needs, skip=()):
    """every line that names pat also matches one of needs (regexes)"""
    return all(any(_re.search(n, ln) for n in needs) for ln in _lines_of(skip) if _re.search(pat, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_approx_or_working(p) for p in (r"\$88\.91", r"\$9\.15", r"\$1\.94", r"\$1\.99", r"\$3\.93", r"\$3\.10")),
     "every rounded amount is 'about' or '≈', except inside the exact workings ($100 − $88.91 − $9.15 = $1.94; $88.91 + $9.15 + $1.94 = $100.00)"),
    (_with(r"\$1\.94", (r"before tax", r"\+ \$1\.94")), "≈ $1.94 always says 'before tax' (the check line excepted)"),
    (_with(r"\$1\.99", (r"[Ff]ee",)), "≈ $1.99 is always named as the membership fees"),
    (_with(r"\$3\.93", (r"[Oo]perating",)) and _with(r"\$3\.10", (r"(?i)after interest and tax",)),
     "≈ $3.93 is always operating profit, and ≈ $3.10 always after interest and tax"),
    (not _re.search(r"(?i)\bkeeps?\b", _ALL), "never 'Costco keeps' (the write-up's rule for the header and the verdict)"),
    ({w.lower() for w in _NUMBER_WORDS.findall(_ALL)} <= {"half"}
     and all(_re.search(r"(?:about|almost) $", _ALL[max(0, m.start() - 7):m.start()].lower()) for m in _re.finditer(r"\bhalf\b", _ALL, _re.I)),
     "no spelled-out figures except 'about half' and 'almost half' (49.4% / 50.6%)"),
    (all("not your receipt" in _COPY[k] for k in ("description", "caption")), "the condition (company-wide averages, not your receipt) is in the description and the caption"),
    (all("Not affiliated with or endorsed by Costco." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "'Not financial advice.' and 'Not affiliated with or endorsed by Costco.' are in the description and the caption"),
    (not _re.search(r"@costco", _ALL, _re.I), "no brand handle (the write-up's Instagram note)"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bcancel\b|\brenew\b|\bworth it\b", _ALL), "no advice wording (nothing on whether a membership is worth it)"),
]
