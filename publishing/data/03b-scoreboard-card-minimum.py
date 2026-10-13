# 03b publishing data: paying the same minimum every month on a $5,000 credit card (Scoreboard, what-difference).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06b-scoreboard-netflix-bill.py (the nearest
# Scoreboard sheet).
#
# Facts come only from teasers/v2/03-what-difference.md (section 03b) and python3 teasers/v2/checks/03-what-difference.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "03b Scoreboard, what-difference: \"What difference does paying the SAME minimum every month make on $5,000?\""
PREPARED = "2026-10-13"
SHORT_ID = "03b"
MD_TITLE = "03b publishing sheet: paying the same card minimum every month on $5,000"
MATH_RUN = "528 checks, 0 failed"      # python3 teasers/v2/checks/03-what-difference.py on studio/specs/, 2026-10-13 at the adversarial check (it prints "0 failures"; 525 at the first build, before the check became cut-aware)
MATH_RUN_SHIP = "565 checks, 0 failed"  # python3 teasers/v2/checks/03-what-difference.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13 (it prints "0 failures")
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "5a95cc3d29b1e8382a01b70e70c3c4a00dcd4f62a4e5033cbf30c20669459e64"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 33.1 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/03-what-difference.md` (03b) and its check, "
    f"`python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). The builder runs it through "
    "`publishing/data/checks/03-what-difference.py`, which passes its output through and adds the summary line in the builder's form. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, re-runs the card month by month, "
    "keeps every '$0 more' tied to the first minimum, and keeps any interest saving out of the copy (the write-up's rule: the shown totals would drift).",
    "- **Honesty rules kept.** The title asks and never gives the result; the Instagram caption keeps every result below 'more'. "
    "The cover is the payoff frame, as the write-up's Instagram note asks (as on 06c). Every claim stays inside the video's verdict, \"Same payment, $0 more: ≈ 10 years sooner\", "
    "and the copy says its anchor and conditions: '$0 more' is measured against the first minimum, at 22% APR, with no new charges, on one issuer's formula. "
    "The write-up's imperative caption line 1 ('Never let your minimum shrink!') became the title's question, so the copy describes a calculation and gives no advice. "
    "No urgency, and 'Not financial advice.' is in both.",
    "- **Sources and brand.** 22% is the write-up's rounding of the Federal Reserve's Q2 2026 rate for card accounts that pay interest (22.15%). "
    "The minimum formula is one big bank's cardmember agreement; as in the write-up's caption, the copy does not name the bank, so no company is named and no affiliation line is needed.",
    "- **Same topic, different card.** The channel already posted this mechanism on 5 Oct ('Pay the Minimum on $5,000? 238 Months.', its best Reel) at 25.99% APR and a $25 floor, "
    "so its numbers differ (238 months, not about 15 years). Both state their inputs; see the related video and the posting order.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 33.1, "sha256": "5a95cc3d29b1e8382a01b70e70c3c4a00dcd4f62a4e5033cbf30c20669459e64",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/03-what-difference.md section 03b; teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$5,000 card balance at 22% APR (≈ Federal Reserve G.19, Q2 2026: 22.15% on accounts assessed interest); no new charges",
    "formula": "interest billed monthly at 22%/12, rounded to the cent; minimum = the larger of $40, or 1% of the new balance + the interest billed (a big-bank cardmember agreement); the whole balance when it is under $40",
    "first_minimum": "$91.67 of interest + 1% of $5,091.67 ($50.92) = $142.59",
    "shrinks": "$127.40 in month 12, $99.66 in month 36 (the first month under $100; 36 = 3 × 12)",
    "minimum_path": "181 payments ≈ 15.1 years (15.08); interest $7,340.79 ≈ $7,300, more than the $5,000 owed",
    "held_first_minimum": "$142.59 − $142.59 = $0 more than the first minimum; 57 payments ≈ 4.8 years (4.75, rounded half-up); interest $3,081.74 ≈ $3,100",
    "verdict": "Same payment, $0 more: ≈ 10 years sooner ((181 − 57) ÷ 12 = 10.33; shown 15.1 − 4.8 = 10.3)",
    "anchor": "'$0 more' is against the first minimum; by month 36 the held payment is $42.93 above that month's $99.66",
    "flat_250": "$250 − $142.59 = $107.41 more; 26 payments ≈ 2.2 years (2.17); interest $1,285.71 ≈ $1,300",
    "pinned": "a flat $150 ($7.41 above the first minimum): 52 payments instead of 57",
    "not_stated": "the interest saving ($7,340.79 − $3,081.74 = $4,259.05 ≈ $4,300, but the shown 7,300 − 3,100 = 4,200 drifts), so neither the screen nor the copy states one",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What If You Never Let Your Credit Card Minimum Payment Shrink? $5,000 at 22%"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. The top score of the 10 scored. It asks the hook's lever as a question ('paying the SAME minimum' = never letting it shrink) and closes on the stake. "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "What If You Never Let Your Credit Card Minimum Payment Shrink?", "vidiq_score": 96,
     "note": "The same question without the stake, 1 point lower and 14 characters shorter."},
    {"rank": 3, "title": "What Difference Does Paying the Same Credit Card Minimum Every Month Make on $5,000?", "vidiq_score": 90,
     "note": "The write-up's title with 'Credit Card' spelled out (the same score as the write-up's own). The H48 grammar, 7 points lower."},
]
YT_TITLES_ALSO_SCORED = [
    ("What Difference Does Paying the Same Card Minimum Every Month Make on $5,000?", 90, "the write-up's title"),
    ("The Credit Card Minimum Payment Trap: What If You Paid the Same Minimum Every Month?", 90, "'trap' is the searched word, but the copy does not call the minimum a trap"),
    ("What Difference Does Paying the SAME Credit Card Minimum Every Month Make?", 89, "the on-screen header's words"),
    ("Your Credit Card Minimum Payment Shrinks. What If You Paid the Same One Every Month?", 88, ""),
    ("Credit Card Minimum Payment on $5,000: What If You Keep Paying the First One?", 87, ""),
    ("$5,000 on a Credit Card: What Difference Does Paying the Same Minimum Every Month Make?", 87, ""),
    ("Credit Card Minimum Payment on $5,000: What Difference Does Paying the Same One Make?", 85, ""),
]
TITLE_BULLETS = [
    "It asks the hook's question in the viewer's words: 'paying the SAME minimum every month' is never letting the minimum shrink. "
    "The frame-1 label stack already shows it shrinking ('starts at $142.59, then shrinks'), so the title reveals nothing the first second doesn't, and it names no result.",
    "'Credit Card Minimum Payment' (5,182 searches a month) sits at characters 28-54, and the stake ($5,000 at 22%) closes it. It raises the write-up's title from 90 to 97.",
    "Left to the tags: 'credit card minimum payment trap' (7,301 a month, up 81.3%). The copy never calls the minimum a trap; the video's own words are 'more than you owed'. "
    "vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """What if you never let your credit card minimum payment shrink? On $5,000 at 22% APR, paying the minimum takes about 15 years and about $7,300 of interest, more than the $5,000 owed. Paying the first minimum, $142.59, every month ($0 more than the first bill) clears it in about 4.8 years with about $3,100 of interest: about 10 years sooner.

The math, shown:
• The minimum is 1% of the balance plus the interest, with a $40 floor. Month 1: $91.67 of interest + 1% of $5,091.67 ($50.92) = $142.59.
• It shrinks as the balance shrinks: $127.40 in month 12, $99.66 in month 36.
• Paid that way: 181 payments (about 15.1 years) and about $7,300 of interest.
• Held at the first minimum: $142.59 − $142.59 = $0 more. 57 payments (about 4.8 years) and about $3,100 of interest.
• (181 − 57) ÷ 12 ≈ 10.3 years: about 10 years sooner.
• A flat $250 ($107.41 more than the first minimum): about 2.2 years and about $1,300 of interest.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 22% ≈ the Federal Reserve's Q2 2026 average for credit card accounts that pay interest (22.15%). Assumes no new charges. Minimum formula from a big-bank cardmember agreement (1% of the new balance + interest, $40 floor); yours is in your agreement under "Minimum Payment", and formulas vary by issuer. "$0 more" is measured against the first minimum: by month 36 the held payment is $42.93 above that month's $99.66 minimum. Not financial advice.
#creditcarddebt #minimumpayment #debtpayoff"""
DESC_NOTE = ("The opening line is the title's question with both pairs of totals, as the write-up's caption gives them, and no interest saving (the write-up's rule). "
             "The '$0 more' anchor and its month-36 gap answer the comment the write-up expects ('that IS paying more'). The 'Doesn't Add Up' series line is left out, as on 06b and 06c.")

YT_HASHTAGS = ["#creditcarddebt", "#minimumpayment", "#debtpayoff"]
YT_HASHTAG_NOTES = [
    ("#creditcarddebt", "the topic ('credit card debt' 94,095 searches a month, up 41.0% on its 30-day baseline), and the write-up's first tag."),
    ("#minimumpayment", "the exact subject ('credit card minimum payment' 5,182 a month; 'credit card minimum payment trap' 7,301, up 81.3%)."),
    ("#debtpayoff", "the outcome, and the write-up's second tag; the same third-layer tag as 03a."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["credit card minimum payment", "credit card minimum payment trap", "minimum payment", "how long to pay off credit card",
           "what happens if i only pay the minimum payment on my credit card", "minimum payment calculator", "pay off credit card debt",
           "how to pay off debt fast", "credit card debt", "credit card interest", "debt payoff", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'credit card minimum payment trap' (7,301 a month, up 81.3%) is here, not in the copy. "
             "Left out on purpose: 'why you should not pay the minimum credit card payment' (4,879) is advice framing; 'why your minimum payment never goes down' (3,349) states the opposite belief.")

YT_PINNED = """What formula does your card use: 1%, 2% or 3%? Rounding up to $150 ($7.41 above the first minimum) only takes it from 57 months to 52.

The working: first minimum $91.67 + $50.92 = $142.59. On the minimum: 181 payments, $7,340.79 of interest. Held at $142.59: 57 payments, $3,081.74 of interest. 22% APR, no new charges."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's pinned comment, reordered, and it asks for the viewer's own card (R3); "
               "posted formulas are the 'now do 2%' sequel the write-up plans. The $150 line answers 'just round up' with the write-up's own figure. "
               "The second paragraph is the exact working, with no interest saving stated (the write-up's rule).")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months.",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "The channel's own Short on the same mechanism at a different card: 25.99% APR and a $25 floor, so its numbers differ (238 months on the minimum; $158.29 held, 54 months). "
                    "Both state their inputs, and side by side they show the rate and the floor move the answer while the lever (hold the first payment) does the same work. "
                    "It is also the channel's best Reel (7,302 plays, 27.4% skip)."},
    "swap_when_live": "03c (just $100 extra on a mortgage) or 03a (car loan: weekly vs biweekly), the same what-difference series, once published.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the verdict-hold frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the verdict-hold frame ('PAID OFF IN ≈ 4.8 YEARS' over the board and the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 03a and 03c. Suggested order within the series: 03c, 03a, then 03b last, "
               "the furthest from the channel's 5 Oct Short on the same mechanism ('238 Months', at 25.99%).",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'credit card debt' runs +41.0% and 'credit card minimum payment trap' +81.3% over their 30-day baselines.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What if you never let your credit card minimum payment shrink? The same payment every month, worked out on $5,000 at 22% APR.")

IG_CAPTION = IG_HOOK + """

Same payment, $0 more than the first minimum: about 10 years sooner.

The math, shown:
• The minimum is 1% of the balance plus interest, with a $40 floor: $142.59 in month 1, $99.66 in month 36.
• Paid that way: about 15 years and about $7,300 of interest, more than the $5,000 owed.
• Held at the first minimum, $142.59 ($0 more than the first bill): about 4.8 years and about $3,100 of interest.
• A flat $250: about 2.2 years.

"$0 more" is against the first minimum: by month 36 the held payment is $42.93 above that month's minimum. 22% ≈ the Federal Reserve's Q2 2026 average for cards that charge interest (22.15%). Assumes no new charges. Minimum formula from a big-bank cardmember agreement; yours is in your agreement under "Minimum Payment". Not financial advice.

What formula does your card use: 1%, 2% or 3%?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#creditcarddebt #minimumpayment #debtpayoff #creditcard #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the question, the 'credit card minimum payment' keyword and the inputs ($5,000 at 22% APR), no result: "
                   "the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the title's question plus 'the same payment every month' and the inputs, with no result. The write-up's caption line 1 ('Never let your minimum shrink!') "
    "is an instruction, so the copy asks it as a question instead, and the verdict sits just below 'more', in the screen's own words plus its anchor ('than the first minimum').",
    "Both totals, never a saving: the write-up keeps the interest saving off the screen and out of the caption because the shown totals would drift (7,300 − 3,100 ≠ the exact 4,259.05).",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#creditcarddebt", "#minimumpayment", "#debtpayoff", "#creditcard", "#personalfinance"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#creditcarddebt #debtpayoff #minimumpayment`; its `#mathtok` is a TikTok tag):",
    "",
    "- `#minimumpayment` names the subject, `#creditcarddebt` the debt and `#debtpayoff` the outcome.",
    "- `#creditcard` and `#personalfinance` are the broad layer; the channel's 5 Oct Short on the same mechanism (its best Reel) carries both.",
]

IG_ALT_SHORT = "Chart: $5,000 at 22%: the minimum takes about 15 years; holding the first $142.59, about 4.8 years."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and both payoffs keep their 'about'.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a dark scoreboard. The header asks: what difference does paying the same minimum every month make on $5,000? "
               "At 22% APR, with a minimum of 1% plus interest and a $40 floor, a red counter reads paid off in about 15.1 years: the card minimum starts at $142.59, "
               "shrinks to $99.66 by year 3, and costs about $7,300 of interest, more than the $5,000 owed. "
               "The row 'Keep paying $142.59' is $0 more than the first minimum, and its bar lands at about 4.8 years and about $3,100 of interest. "
               "A flat $250 lands at about 2.2 years. Verdict: same payment, $0 more, about 10 years sooner.")

IG_FIRST_COMMENT = ("Same payment, $0 more than the first minimum: about 4.8 years instead of about 15, on $5,000 at 22% with no new charges. "
                    "What formula does your card use: 1%, 2% or 3%?")

# ---------------------------------------------------------------- the cover frame
# The verdict hold, picked by content: the write-up's Instagram note names "the payoff frame: the hero 'PAID OFF IN ≈
# 4.8 YEARS' in green over the board (the red 15.1-year bar, the glowing green 4.8-year row) and the verdict". On the
# shipped condensed cut the last caption stays under the verdict until the last body frame, so the cover is the settled
# verdict hold with that caption on it: from 11.43 s (frame 343) the frame-to-frame mean luma change stays ≤ 0.033 until
# the caption clears on the last body frame (11.63 s) and the end card cuts in.
COVER_T = 11.5
COVER_FRAME = 345
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The payoff hold: the hero 'PAID OFF IN ≈ 4.8 YEARS' in green, the footer '22% APR · minimum = 1% + interest, $40 floor', the board "
                          "(THE CARD MINIMUM ≈ $7,300 over its red ≈ 15.1-year bar; KEEP PAYING $142.59 lit green, ≈ $3,100 and ≈ 4.8 YEARS; A FLAT $250 ≈ $1,300 and ≈ 2.2 YEARS) "
                          "and the verdict 'SAME PAYMENT, $0 MORE: ≈ 10 YEARS SOONER', under the question. The write-up names this payoff frame as the Instagram cover. "
                          "On the condensed cut the last caption ('Same payment: about 10 years sooner.', the verdict's own words) stays under the verdict until the last body frame, so use a settled frame of the verdict hold, with the caption on it, before the end card.")
COVER_FRAME_MEASURED = ("On the shipped 14.167 s condensed cut the board settles in the verdict hold by 11.43 s (frame 343), and from then the picture is near-still "
                        "(frame-to-frame mean luma change ≤ 0.033) with the last caption ('Same payment: about 10 years sooner.') under the verdict; the caption clears only on"
                        " the last body frame (11.63 s) before the end card. Frame 345 (11.50 s) is used. On the 33.1 s pre-condense render it was frame 858 (28.60 s), after "
                        "the caption cleared.")
COVER_CROP_NOTE = ("3:4 = 1080×1440, the top 1440 rows (y 0 to 1440) of the 1080×1920 frame: the badge, the question, the hero, the footer, the board and the verdict, "
                   "with even margins (141 px above the badge, 145 px below the verdict); it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the question.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the question.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the question over the red '≈ 15.1 YEARS' hero, with the two other rows still showing '?'). It carries only the baseline, "
    "but the write-up names the payoff frame as the cover, and the save-worthy thing here is the worked board.",
    "**Shipped cut (2026-10-13):** the payoff hold was re-picked by content on the shipped file (a settled frame of the verdict hold, 11.5 s; the last caption now stays under the verdict) and both JPGs re-exported from it. It shows the same hero, board and verdict as the pre-condense cover, plus that caption.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut replaced the pre-condense render in renders/channel on 2026-10-13; get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 03b-33.1s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; the 5 Oct minimum-payment Reel 27.4%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Same minimum, every month — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 03a and 03c (03b last).",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). The best of all is the 5 Oct '$5,000 on the minimum' Reel (7,302 plays, 27.4% skip, 12 saves), this Short's topic twin. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("credit card minimum payment trap", 7301, 57.7, 15.0, 68.6, "+81.3% vs its 30-day baseline (4,027); in the tags, not the copy", "2026-10-12"),
    ("minimum bill payment credit card", 5316, 55.6, 16.9, 66.6, "", "2026-10-12"),
    ("credit card minimum payment", 5182, 55.4, 21.9, 64.5, "seed; flat (0%)", "2026-10-02"),
    ("minimum payment calculator", 5086, 55.3, 10.3, 69.1, "", "2026-10-02"),
    ("why you should not pay the minimum credit card payment", 4879, 55.1, 27.2, 62.2, "advice framing: not in the tags", "2026-09-28"),
    ("how does the credit card minimum payment trap work", 3922, 53.6, 9.0, 68.6, "", "2026-07-06"),
    ("why is the minimum credit card payment a trap?", 3689, 53.2, 5.3, 69.8, "competition 5.3, the lowest here", "2026-10-03"),
    ("what happens if i only pay the minimum payment on my credit card", 3382, 52.7, 26.1, 61.2, "the video's baseline question", "2026-09-07"),
    ("why your minimum payment never goes down", 3349, 52.6, 16.0, 65.2, "the opposite belief: the video shows it does go down", "2026-09-28"),
    ("pay off credit card debt", 9231, 59.2, 44.0, 57.9, "", "2026-10-12"),
    ("how to pay off debt fast", 22921, 65.1, 28.0, 67.9, "-25.7% vs its baseline (30,851)", "2026-10-12"),
    ("credit card debt", 94095, 74.2, 64.2, 58.9, "+41.0% vs its baseline (66,734)", "2026-10-12"),
]
KEYWORD_MD_NOTE = {"why your minimum payment never goes down": "the opposite belief: the video shows it does"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; seven rows are older snapshots (2026-07-06 to 2026-10-03).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Seven rows are older snapshots.")
KW_OUTRO = ("Every minimum-payment phrase sits at about 3,300-7,300 searches a month at low competition (5.3-27.2), and the 'trap' framing is the one rising (+81.3%). "
            "The title carries 'credit card minimum payment'; 'trap' stays in the tags because the copy describes the maths, not a villain. "
            "The broad layer is 'credit card debt' (94,095, up 41.0%) and 'how to pay off debt fast' (22,921).")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Minimum Amount Due is a TRAP! | Credit Card Best Practices | Ankur Warikoo #shorts", "warikoo", 7150000, 775317, "2023-05-30", "India-facing"),
    ("What happens if we pay only minimum amount due on credit card?", "Rupyz B2B E-Commerce", 11900, 346000, "2022-05-26", "India-facing"),
    ("How Minimum Credit Card Payment Works", "The Credit Brothers", 65400, 12364, "2024-11-10"),
    ("The Credit Card Minimum Payment Trap (and the Simple Fix)", "The One Man Tech Startup", 1070, 5624, "2026-09-26",
     "26 s; the same lever ($5,000 at 24%, keep paying the first $150); AI presenter"),
    ("Why Does Paying the Minimum Keep You in Debt?", "Theo Asks Why", 2360, 1078, "2026-10-02", "a fixed amount above the minimum"),
    ("Why Does Paying the Minimum Keep You in Debt for Years?", "Money, Decoded", 2, 204, "2026-10-01", "$5,000 at 22% vs a fixed $200"),
    ("Why Your Credit Card WANTS You to Pay the Minimum", "Paid In Full with Walt", 3, 33, "2026-09-26", "the same lever: 'never let it go down'"),
    ("credit card minimum payments be like 🏃", "US Money Mechanics", 4, 18, "2026-09-28", "the same lever ($6,000 at 23.99%)"),
    ("Your Minimum Payment Is Designed to Shrink", "SmartSpendFinance", 1, 7, "2026-10-03", "the same lever (a 3% minimum)"),
    ("Credit Card Minimum Payment: How Long to Pay Off $5,000?", "The Dollar Candy", 0, 4, "2026-10-06", "the same lever: $5,000 at 21%, keep the first $137.50"),
]
SAME_IDEA_HEADING = "**2. The same lever on YouTube: a crowded week of small channels (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "The minimum-payment explainer is old and big in India (warikoo 775,317; Rupyz 346,000) and steady in the US (The Credit Brothers 12,364). "
    "The exact lever, 'keep paying your first minimum', went up on at least 7 small channels between 26 Sep and 6 Oct 2026, all under 5,700 views; the biggest is The One Man Tech Startup's (5,624).",
    "",
    "This channel has covered the shrinking minimum three times, all on $5,000 at 25.99% APR: 'Why the minimum payment keeps you in debt for 19 years' (June, 1,230 views, against a fixed $200), "
    "'Why your credit-card balance barely moves' (June, 80, the first payment frozen) and 'Pay the Minimum on $5,000? 238 Months.' (5 Oct, 642 views and the best Reel, 7,302 plays, the first payment held). "
    "This Short's new angle is the question 'what difference does the SAME payment make', at the Fed's 22%, with the $0 lever named and a $250 row for scale. "
    "None of the same-idea titles asks it that way.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): the explainer is big in India (warikoo 775,317) and steady in the US (12,364); "
                  "the 'keep paying the first minimum' lever went up on at least 7 small channels from 26 Sep to 6 Oct 2026, all under 5,700 views. "
                  "The channel's own 5 Oct Short ('238 Months', 25.99% APR) is the same mechanism with different inputs.")

OUTLIERS = [
    {"handle": "@ashallaboutmoney", "platform": "Instagram", "id": "DbEMwEZhb5b",
     "on_screen": "Paying Off Maxed Out $5500 CREDIT CARD IN 1 YEAR",
     "views": "666.2K (69.7x the account median of 9.6K)",
     "note": "the maths written out by hand, top-down, voice only: the worked-board idea, with a presenter's hand"},
    {"handle": "@priceofavocadotoast", "platform": "TikTok", "id": "7674070599236586766",
     "on_screen": "Stop paying extra on all of your credit cards", "views": "113.6K (87.8x)",
     "note": "a counter-intuitive card-payment claim; talking head"},
    {"handle": "@debtefficiency", "platform": "TikTok", "id": "7672165195187293470",
     "on_screen": "$160,000 in credit card debt paid off with no lifestyle changes or strict budget needed", "views": "380K (17.3x)"},
    {"handle": "@envelopemath", "platform": "Instagram", "id": "DeIvYk7I4Qr",
     "on_screen": "$5,000 on the minimum: 238 months", "views": "7,302 plays (the channel's best Reel; 27.4% skip, 12 saves)",
     "note": "our own 5 Oct Reel on the same mechanism at 25.99% APR"},
]
OUTLIERS_HEADING = "**3. Worked card maths travels on Instagram; the exact lever has no outlier yet (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@ashallaboutmoney** (Instagram), \"Paying Off Maxed Out $5500 CREDIT CARD IN 1 YEAR\": 666.2K (69.7x). The maths written out by hand on paper, the closest outlier to a worked board.",
    "- **@priceofavocadotoast** (TikTok), \"Stop paying extra on all of your credit cards\": 113.6K (87.8x); **@debtefficiency** (TikTok), \"$160,000 in credit card debt paid off…\": 380K (17.3x).",
    "- The concept search found no Reel or TikTok of 'keep paying the first minimum' itself at 5K views or more. The nearest proof is our own: the 5 Oct '$5,000 on the minimum' Reel, "
    "7,302 plays with a 27.4% skip rate, the channel's best.",
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
    "This topic is the channel's proven one: the 5 Oct '$5,000 on the minimum' Short (YouTube `8__HTUa2PoU`, Instagram `DeIvYk7I4Qr`) is the best Reel by plays and skip rate. "
    "It used 25.99% APR and a $25 floor, so its answer (238 months) differs from this Short's (about 15 years at 22% and a $40 floor). "
    "A viewer who saw both may ask why; the copy names the 22%, the formula and the $40 floor, and the related video makes the comparison explicit. "
    "06b (Mon 12 Oct, 12:14 ET) and 06c (Mon 12 Oct, 03:45 ET) are too young to compare.",
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
    "The write-up's sources rest on search-result text: its egress proxy blocked the primary pages. Before posting, open the Fed's G.19 release of Aug 7, 2026 (22.15%) and the cardmember agreement PDF the write-up cites (the formula), its open item 1.",
    "The video, the cover and the video facts are the shipped condensed cut (2026-10-13); the copy is cut-independent and carried over from the pre-condense cut unchanged.",
]
RESEARCH_EXTRA = {
    "own_channel_same_topic": [
        {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months.", "published": "2026-10-06", "views": 642,
         "note": "the same mechanism at 25.99% APR, $25 floor: 238 months on the minimum, $158.29 held 54 months; Instagram twin DeIvYk7I4Qr, 7,302 plays; this Short's related video"},
        {"id": "iQD6UlkCEqs", "title": "Why the minimum payment keeps you in debt for 19 years", "published": "2026-06-03", "views": 1230,
         "note": "the same $5,000 at 25.99%, against a fixed $200"},
        {"id": "VYSpI3gRN6o", "title": "Why your credit-card balance barely moves (and the one fix)", "published": "2026-06-15", "views": 80,
         "note": "the same lever (freeze month one's payment) at 25.99%"},
    ],
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "90 credits for this teaser (5 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 10 title scores; 5 each), plus 15 shared across 03a-03c for the channel's own stats and its older Shorts, and 10 for the re-query (1 title score, 1 keyword). The adversarial check used 35 more across 03a-03c (balance 4,030 → 3,995): 3 title scores, 6 keyword re-queries and 1 lookup of 5 of the channel's own videos.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through "
                "publishing/data/checks/03-what-difference.py; the 03b card re-run month by month in MATH_RELATIONS (the first minimum, months 12 and 36, 181/57/52/26 payments, every interest total); "
                "COPY_RULES keep every rounded figure 'about' or '≈', every '$0 more' tied to the first minimum, every payoff with its unit (years), and no interest saving in the copy; "
                "re-run at the adversarial check with the same result"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: credit card minimum payment 5,182 / 21.9; credit card minimum payment trap 7,301 / 15.0 (+81.3%); credit card debt 94,095 (+41.0%); "
                   "title scores 97 (pick), 90 (write-up title); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried the same day after the build: the pick's title score 97 and 'credit card minimum payment' 5,182 / 21.9. "
                   "Re-queried at the adversarial check: the pick's title score 97; 'credit card minimum payment' 5,182 / 21.9; 'credit card minimum payment trap' 7,301 / 15.0 (+81.3%); "
                   "8__HTUa2PoU 642 views, iQD6UlkCEqs 1,230, VYSpI3gRN6o 80, and 8__HTUa2PoU's description gives 25.99% APR, a $25 floor, 238 months and $158.29 held for 54 months. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN}. Every public figure traces to the 03b maths table: $91.67 + $50.92 = $142.59; $127.40 (month 12), $99.66 (month 36); "
    "181 payments ≈ 15.1 years, $7,340.79 ≈ $7,300; 57 payments ≈ 4.8 years, $3,081.74 ≈ $3,100; (181 − 57) ÷ 12 ≈ 10.3 ≈ 10 years; $250 − $142.59 = $107.41, 26 payments ≈ 2.2 years, ≈ $1,300; "
    "$150: 52 payments; $142.59 − $99.66 = $42.93. The data file re-runs the card and gets every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 97, the write-up's title 90. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 97; 'credit card minimum payment' 5,182 / 21.9 (snapshot 2026-10-02). "
    "Again at the adversarial check: the pick 97; 'credit card minimum payment' 5,182 / 21.9; 'credit card minimum payment trap' 7,301 / 15.0 (+81.3%); the three own Shorts' views (642, 1,230, 80). All match.",
    "- **Mutation test.** Six breaks on scratch copies of this file all fail by name: a stated '$4,200' saving, '$0 more' without its first-minimum anchor, $99.66 without month 36, "
    "'4.8 years' without its 'about', a result in the caption's first 125 characters, and the word 'trap' in the caption.",
    "- **Found on the way.** The channel's 5 Oct Short and two June Shorts cover the same mechanism at 25.99% APR (238 months). The copy states this Short's inputs so the two answers can sit side by side; "
    "the related video links them and the posting order puts 03b last in the series.",
    "- **Kept on purpose.**",
    "  - The cover and the YouTube frame show the payoff, as the write-up's Instagram note asks (as on 06c). The no-result rule covers the title and the caption's first 125 characters.",
    "  - No interest saving anywhere (the write-up's rule), only the two totals.",
    "  - The card issuer is not named, as in the write-up's caption ('a big-bank cardmember agreement').",
    "- **Adversarial pass (2026-10-13): changed.**",
    "  - The short alt text ended 'the first $142.59, held, about 4.8.', a bare 4.8 that a screen reader reads without its unit. It now reads 'holding the first $142.59, about 4.8 years.' (99 characters), "
    "and a new COPY_RULE keeps 15.1, 4.8 and 2.2 with 'years' everywhere; the old text fails it by name.",
    "  - The maths count is now 528 checks, 0 failed: the 03 check became cut-aware during the parallel condense (525 at the first build).",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 03b table and the check's output (the card re-run month by month); limits on both platforms; "
    "no company named (the formula is 'a big-bank cardmember agreement', as in the write-up's caption; the Federal Reserve is a source, not a brand), so no affiliation line; "
    "no advice and no 'trap' in the copy; the channel's 5 Oct Short's inputs (25.99%, $25 floor, 1% of the balance + interest) re-checked against its own description and re-computed: 238 months, $158.29 held for 54. "
    "The cover (28.6 s) read as a still: the payoff hold, the question and the verdict, all on the 3:4 crop.",
    "- **Still to do.** The primary-source check above.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The payoff hold was re-picked by content at 11.5 s (frame 345), with the last caption under the verdict. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 03b maths table (teasers/v2/03-what-difference.md, section 03b) and
# recomputed below; $5,000, 22% (22.15%), the 1% + interest formula and the $40 floor are the write-up's inputs.
FIGURES = {
    "$5,000", "22", "22.15", "2026", "2", "1", "3", "$40", "$142.59", "$91.67", "$5,091.67", "$50.92", "$127.40", "$99.66", "12", "36",
    "181", "15", "15.1", "$7,300", "57", "4.8", "$3,100", "10", "10.3", "$0", "$250", "$107.41", "2.2", "$1,300", "$42.93",
    "$150", "$7.41", "52", "$7,340.79", "$3,081.74",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_c = lambda x: x.quantize(_D("0.01"), _UP)


def _card(flat=None, apr=_D("0.22"), bal=_D("5000")):
    """interest billed monthly, rounded to the cent; minimum = max($40, 1% of the new balance + interest) -> (payments, interest, minimums)"""
    n, tot, mins = 0, _D(0), {}
    while bal > 0:
        i = _c(bal * apr / 12); tot += i; nb = bal + i; n += 1
        m = nb if nb < 40 else max(_D(40), _c(nb * _D("0.01")) + i)
        mins[n] = m
        bal = nb - min(m if flat is None else flat, nb)
    return n, tot, mins


_min, _held, _f150, _f250 = _card(), _card(_D("142.59")), _card(_D("150")), _card(_D("250"))
_r1 = lambda x: float(_D(x).quantize(_D("0.1"), _UP))
MATH_RELATIONS = [
    (_c(_D(5000) * _D("0.22") / 12) == _D("91.67") and _c(_D("5091.67") * _D("0.01")) == _D("50.92") and _min[2][1] == _D("142.59"),
     "first minimum: $91.67 of interest + 1% of $5,091.67 ($50.92) = $142.59"),
    (_min[2][12] == _D("127.40") and _min[2][36] == _D("99.66") and _min[2][35] >= 100, "the minimum shrinks: $127.40 in month 12, $99.66 in month 36 (the first under $100)"),
    (_min[0] == 181 and _r1(_D(181) / 12) == 15.1 and _min[1] == _D("7340.79") and round(_min[1], -2) == 7300 and _min[1] > 5000,
     "the minimum: 181 payments ≈ 15.1 years, $7,340.79 ≈ $7,300, more than the $5,000 owed"),
    (_held[0] == 57 and _r1(_D(57) / 12) == 4.8 and _held[1] == _D("3081.74") and round(_held[1], -2) == 3100,
     "held at $142.59: 57 payments ≈ 4.8 years (4.75 half-up), $3,081.74 ≈ $3,100"),
    (_D("142.59") - _D("142.59") == 0 and _D("142.59") - _D("99.66") == _D("42.93"), "$0 more than the first minimum; $42.93 above the month-36 minimum"),
    (round((181 - 57) / 12, 1) == 10.3 and round((181 - 57) / 12) == 10 and round(15.1 - 4.8, 1) == 10.3, "(181 − 57) ÷ 12 ≈ 10.3 ≈ 10 years sooner (= shown 15.1 − 4.8)"),
    (_D(250) - _D("142.59") == _D("107.41") and _f250[0] == 26 and _r1(_D(26) / 12) == 2.2 and round(_f250[1], -2) == 1300,
     "a flat $250: $107.41 more, 26 payments ≈ 2.2 years, ≈ $1,300"),
    (_D(150) - _D("142.59") == _D("7.41") and _f150[0] == 52, "pinned: $150 is $7.41 above the first minimum, 52 payments"),
    (round(_min[1] - _held[1], 2) == _D("4259.05") and 7300 - 3100 != round(_min[1] - _held[1], -2),
     "why no saving is stated: $4,259.05 rounds to $4,300 but the shown totals give $4,200"),
]
MATH_SCRIPT = "publishing/data/checks/03-what-difference.py"
MATH_KEY_LINES = ["03b card: first minimum $142.59", "min   n= 181  years=15.08  interest=  $7,340.79",
                  "flat1 n=  57  years= 4.75  interest=  $3,081.74", "250   n=  26  years= 2.17  interest=  $1,285.71",
                  "minimum: month 12 $127.40, month 36 $99.66"]
RESULT_RE_TITLE = r"15|7,3|4\.8|3,1|\b10\b|sooner|\$0|181|57|2\.2|142"
RESULT_RE_CAPTION = r"15 y|15\.1|7,3|4\.8|3,1|10 y|sooner|\$0|181|57 |2\.2|\$99|\$142|1,3"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _approx(pat):
    """every occurrence of pat in the copy is preceded by 'about ' or '≈ '"""
    return all(_re.search(r"(?i)(?:about|≈) $", v[max(0, m.start() - 6):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


def _with(pat, needs, skip=()):
    """every line that names pat also matches one of needs (regexes)"""
    return all(any(_re.search(n, ln) for n in needs) for ln in _lines(skip) if _re.search(pat, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_approx(p) for p in (r"(?<![\d.$,])15(?:\.1)?(?![\d,%])", r"\$7,300", r"\$3,100", r"\$1,300", r"(?<![\d.])4\.8\b", r"\b2\.2\b", r"\b10 years", r"\b10\.3\b")),
     "every rounded figure is 'about' or '≈' (15 and 15.1 years, $7,300, 4.8, $3,100, 2.2, $1,300, 10 and 10.3 years)"),
    (not _re.search(r"\$?4,2\d\d|\$?4,3\d\d|4,259|\bsaves?\b|\bsaving", _ALL), "no interest saving is stated anywhere (the write-up's rule: the shown totals drift)"),
    (_with(r"\$0 more", (r"first",)), "every '$0 more' sits beside the first minimum it is measured against"),
    (_with(r"\$99\.66", (r"\b36\b", r"year 3")), "$99.66 always comes with month 36 (or 'year 3', the screen's words)"),
    (_with(r"\$250", (r"[Ff]lat",)), "$250 is always the flat payment"),
    (not _re.search(r"(?:15\.1|4\.8|2\.2)(?! years)", "\n".join(_COPY.values())), "15.1, 4.8 and 2.2 always carry their unit, years (the short alt text once left 4.8 bare)"),
    (all("22%" in _COPY[k] and "no new charges" in _COPY[k].lower() for k in ("description", "pinned comment", "caption", "first comment")),
     "22% and 'no new charges' are in the description, both comments and the caption"),
    (all("$40 floor" in _COPY[k] for k in ("description", "caption", "long alt text")), "the $40 floor is in the description, the caption and the long alt text"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    (not _re.search(r"\btrap\b|\bscam\b|\bbanks? (?:hope|want|hate)", _ALL, _re.I), "no 'trap'/'scam'/'banks hate' hype in the copy (the tags carry the searched word)"),
    (not _NUMBER_WORDS.findall(_ALL), "no spelled-out figures (the figure check can't see them)"),
]
