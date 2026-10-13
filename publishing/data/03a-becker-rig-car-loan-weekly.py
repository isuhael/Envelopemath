# 03a publishing data: weekly and biweekly vs monthly on a $44,000 car loan (Becker Rig, what-difference).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig sheet), laid out like the Scoreboard sheets of the same batch.
#
# Facts come only from teasers/v2/03-what-difference.md (section 03a) and python3 teasers/v2/checks/03-what-difference.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense round-2 cut: the 03 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (the finished board), so the ship step only re-runs the build with --covers on the final file.

TEASER = "03a Becker Rig, what-difference: \"What difference do weekly and biweekly payments really make on a $44,000 car loan?\""
PREPARED = "2026-10-13"
SHORT_ID = "03a"
MD_TITLE = "03a publishing sheet: weekly and biweekly payments on a $44,000 car loan"
MATH_RUN = "528 checks, 0 failed"      # python3 teasers/v2/checks/03-what-difference.py on studio/specs/, 2026-10-13 at the adversarial check (it prints "0 failures"; 525 at the first build, before the check became cut-aware)
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "4b1c8e0702aa891c4e46c2387f1244bfba022d316c645b0ea0667b4770d4559b"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense round-2 cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 03 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the finished board), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/03-what-difference.md` (03a) and its check, "
    f"`python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). The builder runs it through "
    "`publishing/data/checks/03-what-difference.py`, which passes its output through and adds the summary line in the builder's form. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, re-runs the four schedules day by day, "
    "keeps every rounded figure 'about' or '≈', and keeps every 13 as '13 monthly payments' or '13 ×'.",
    "- **Honesty rules kept.** The title asks and never gives the result; the Instagram caption keeps every result below 'more'. "
    "The cover is the finished board, as the write-up's Instagram note asks (as on 06c). Every claim stays inside the video's verdict, \"Round up to $200 a week: ≈ 1 year sooner\", "
    "and the copy says its condition: simple interest charged daily, each payment applied the day it lands (the pinned comment asks whether the viewer's lender does). "
    "The year and the ≈ $1,800 are against paying monthly, and the copy says so wherever it gives them. "
    "No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Sources and brand.** $44,000 at 7% over 72 months is a round loan just under Edmunds' Q3 2026 averages ($44,664 at 7.0%), so the copy says '≈ the average new-car loan', "
    "never 'the average'. Edmunds is named only as that source, and both platforms' copy says 'Not affiliated with or endorsed by Edmunds.'",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense round-2 cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "round-2 cut (pre-condense)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 03 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay). "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/03-what-difference.md section 03a; teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$44,000 new-car loan at 7% APR over 72 months: a round loan just under Edmunds' Q3 2026 averages ($44,664 at 7.0%; Q2 $44,156); '≈ the average', not 'the average'",
    "model": "simple interest charged daily (APR ÷ 365), rounded to the cent each period; each payment applied the day it is paid; a month is 365/12 days; the last payment is whatever is left",
    "payments": "monthly $750.16 (the 72-month payment); biweekly $375.08 (÷ 2); weekly $187.54 (÷ 4); round up $200 a week ($187.54 + $12.46)",
    "monthly": "72 payments; interest $10,011.20 ≈ $10,000",
    "biweekly": "142 payments × 14 days = 65.36 months ≈ 65; interest $8,916.74 ≈ $8,900; ≈ $1,100 less (shown 10,000 − 8,900)",
    "weekly": "282 payments × 7 days = 64.90 months ≈ 65; interest $8,881.25 ≈ $8,900; $35.49 ≈ $35 less than biweekly",
    "lever": "$375.08 × 26 = $187.54 × 52 = 13 × $750.16 = $9,752.08 a year: both are 13 monthly payments a year, not 12",
    "round_up": "261 payments × 7 days = 60.07 months ≈ 60; interest $8,184.40 ≈ $8,200; ≈ $1,800 less (shown 10,000 − 8,200); 72 − 60 ≈ 12 months ≈ 1 year sooner (0.99)",
    "verdict": "Round up to $200 a week: ≈ 1 year sooner (caption line: 'Weekly barely beats biweekly. Rounding up is the real trick!')",
    "sensitivity": "write-up only, not in the copy: at 6%, 8% and Edmunds' exact $44,664, weekly beats biweekly by under $50 and rounding up takes 0.90-1.13 years off",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What Difference Do Weekly Car Payments Really Make on a $44,000 Car Loan?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 93,
     "note": "PICK. Tied top score of the 9 scored. The write-up's own title (H48's grammar and its 'really' doubt cue) with 'Car Loan' added, the biggest exact phrase in the cluster. "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "Weekly vs Biweekly Car Payments on a $44,000 Loan: What Difference Does It Make?", "vidiq_score": 93,
     "note": "The same score, and it names both schedules, but its 'X vs Y' opening is the shape the write-up designs against (FinCalC's 'which is better?' bucket, median 13,322)."},
    {"rank": 3, "title": "Do Biweekly Car Payments Really Pay Off Your Car Loan Faster?", "vidiq_score": 91,
     "note": "A yes/no question, 2 points lower; the video's answer is 'yes, a little', and its real lever (rounding up) sits outside the question."},
]
YT_TITLES_ALSO_SCORED = [
    ("What Difference Do Weekly Car Payments Really Make on $44,000?", 92, "the write-up's title"),
    ("Weekly vs Biweekly Car Payments on a $44,000 Car Loan: What Difference Does It Make?", 93, "84 chars, no gain over option 2"),
    ("Weekly vs Biweekly vs Monthly Car Payments on $44,000: What Difference Does It Make?", 92, ""),
    ("Weekly vs Biweekly Car Payments: What Difference Do They Really Make?", 84, "without the stake: 8-9 points lower"),
    ("What Difference Do Weekly and Biweekly Car Payments Really Make?", 84, "without the stake"),
    ("Weekly vs Biweekly Car Payments: What Difference Do They Really Make? #carloan #biweekly #debtpayoff", 84, "the house 3-hashtag form"),
]
TITLE_BULLETS = [
    "The stake carries the score: every title with '$44,000' scored 92-93, and the 'what difference' titles without it 84. The pick keeps the write-up's question word for word "
    "('What Difference Do Weekly Car Payments Really Make on …'), the frame of the 1.9M H48 TikTok, and adds 'Car Loan' (18,346 searches a month).",
    "It names no result: weekly vs biweekly, the 13 payments and the rounding lever are all the video's. 'Really' is the write-up's R5 cue that the popular hack is oversold.",
    "Options 1 and 2 tie at 93; the pick is decided on shape (a question, not 'X vs Y') and length (73 vs 80 characters). vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """What difference do weekly car payments really make on a $44,000 car loan? Weekly beats biweekly by only about $35: both add up to 13 monthly payments a year, not 12. Rounding the weekly payment up to $200, about $12 more a week, pays it off about a year sooner than paying monthly and saves about $1,800 of interest.

The math, shown ($44,000 at 7% APR over 72 months):
• Monthly: $750.16 a month for 72 months. About $10,000 of interest.
• Biweekly: $375.08 × 26 = $9,752.08 a year. About 65 months and about $8,900 of interest: about $1,100 less.
• Weekly: $187.54 × 52 = $9,752.08 a year, the same. About 65 months and about $8,900 too: only about $35 better than biweekly.
• Why: 13 × $750.16 = $9,752.08. Both are 13 monthly payments a year, not 12.
• Round up: $187.54 + $12.46 = $200 a week. About 60 months and about $8,200 of interest: about $1,800 less than monthly.
• 72 − 60 ≈ 12 months: about a year sooner than monthly.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $44,000 at 7% APR over 72 months ≈ the average new-car loan (Edmunds, Q3 2026: $44,664 at 7.0%). Simple interest charged daily; assumes each payment is applied the day it lands. Not financial advice. Not affiliated with or endorsed by Edmunds.
#carloan #biweekly #debtpayoff"""
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b and 06c.")

YT_HASHTAGS = ["#carloan", "#biweekly", "#debtpayoff"]
YT_HASHTAG_NOTES = [
    ("#carloan", "the topic ('car loan' 18,346 searches a month, down 30.3% on its 30-day baseline but the biggest exact phrase), and the H48 outlier's own tag."),
    ("#biweekly", "the schedule the hook names; the write-up's tag."),
    ("#debtpayoff", "the outcome ('pay off debt' 32,458 a month, up 66.2%); the H48 outlier's and the write-up's tag."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["biweekly car payments", "weekly car payments", "car loan", "how to pay off car loan", "payoff car loan early",
           "how to reduce car loan interest", "car loan interest", "car loan explained", "biweekly payments", "car payment",
           "auto loan", "daily simple interest", "pay off debt", "debt payoff", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags; 'biweekly car payments' is under 750 a month but names the video exactly. "
             "Left out on purpose: 'should i pay off car loan early' (5,252) is advice intent; 'car payment trap' (15,474, up 239.1%) is about long loans and investing the payment, not this question.")

YT_PINNED = """Does your lender apply a weekly payment the day it lands, or hold it until the due date? These numbers assume the day it lands. Drop your loan amount, APR and months and we'll run yours next.

The working: interest $10,011.20 paying monthly (72 payments), $8,916.74 biweekly (142), $8,881.25 weekly (282; $35.49 less than biweekly) and $8,184.40 at $200 a week (261 payments, about 60 months)."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's pinned comment, and it starts the argument the write-up expects "
               "(whether the lender posts a weekly payment the day it lands). Its second sentence is the write-up's assumption, not its 'That decides whether any of this works': "
               "a lender that holds weekly payments still gets the 13th monthly payment a year, so the extra payments still count; only the exact figures move. "
               "The ask for the viewer's numbers sets up the comment-reply sequel (H50's 127.3x was one). "
               "The second paragraph is the exact working behind the rounded board, for the commenters who check it.")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months.",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "Same viewer, same idea from the other side: what a payment schedule does to a debt. It is October's debt Short (642 views), and its Instagram twin is the channel's best Reel (7,302 plays, 27.4% skip). "
                    "(June's 'Why the minimum payment keeps you in debt for 19 years' has more views, 1,230, but is an older, narrated Short.)"},
    "swap_when_live": "03c (just $100 extra on a mortgage) or 03b (card minimum), the same what-difference series, once published. Then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the finished-board frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the finished-board frame (four lanes run, the gold plate on ≈ $8,200, the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 03b and 03c. Suggested order within the series: 03c, then 03a, then 03b.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'pay off debt' runs +66.2% over its 30-day baseline, while 'car loan' is down 30.3%. Edmunds' Q3 release (October 2026) is the news peg for the $44,000.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What difference do weekly and biweekly car payments really make on a $44,000 car loan at 7% over 72 months? "
           "Worked out, payment by payment.")

IG_CAPTION = IG_HOOK + """

Weekly barely beats biweekly. Rounding up is the real trick.

The math, shown:
• Monthly: $750.16 a month. 72 months, about $10,000 of interest.
• Biweekly: $375.08 × 26 = $9,752.08 a year. About 65 months, about $1,100 less interest.
• Weekly: $187.54 × 52 = $9,752.08 a year, the same 13 monthly payments. About 65 months too, only about $35 better than biweekly.
• Round up to $200 a week ($12.46 more): about 60 months. Against monthly: about $1,800 less interest and about a year sooner.

$44,000 at 7% ≈ the average new-car loan (Edmunds, Q3 2026: $44,664 at 7.0%). Simple interest charged daily; assumes each payment is applied the day it lands. Not financial advice. Not affiliated with or endorsed by Edmunds.

Does your lender apply a weekly payment the day it lands?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#carloan #biweekly #debtpayoff #micropayments #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the question, the 'weekly', 'biweekly' and 'car loan' keywords and the inputs ($44,000 at 7% over 72 months), no result: "
                   "the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question plus the inputs, with no result. The write-up's caption line 1 is the verdict ('Weekly barely beats biweekly. Rounding up is the real trick!'); "
    "the house rule moves it below 'more', because the caption overlays the Reel from frame 1, and drops its exclamation mark. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The posting condition (daily interest, each payment applied the day it lands) sits right under the math, and the closing question asks the viewer to check their own lender.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#carloan", "#biweekly", "#debtpayoff", "#micropayments", "#personalfinance"]
IG_HASHTAG_MD = [
    "Four are the write-up's own (`#carloan #debtpayoff #biweekly #micropayments`; its `#mathtok` is a TikTok tag):",
    "",
    "- `#carloan` and `#debtpayoff` are on the H48 outlier this Short is modelled on (1.9M views), and `#micropayments` is the tag 4 of that creator's 5 breakouts carried.",
    "- `#biweekly` names the schedule the hook asks about.",
    "",
    "`#personalfinance` is the broad layer, as on 06b and 06c.",
]

IG_ALT_SHORT = "Chart: a $44,000 car loan paid 4 ways; rounding up to $200 a week beats monthly by about a year."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the verdict's lever, its 'about' and its baseline (monthly).")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white background. The header asks: what difference do weekly and biweekly payments really make on a $44,000 car loan? "
               "4 lanes, each a stick figure behind a crate on a time lane. Monthly ($750.16 a month) has already run: 72 months and about $10,000 of interest. "
               "Biweekly ($375.08) and Weekly ($187.54) both land at about 65 months and about $8,900: both add up to 13 monthly payments a year, so weekly is only about $35 better. "
               "Round up ($200 a week) lands at about 60 months and about $8,200 of interest, about $1,800 less than Monthly, and a banner shows about 12 months saved against Monthly's 72. "
               "Verdict: round up to $200 a week, about 1 year sooner.")

IG_FIRST_COMMENT = ("Weekly beats biweekly by only about $35: both are 13 monthly payments a year. Rounding up to $200 a week ($12.46 more) "
                    "saves about $1,800 and about a year against paying monthly. Does your lender apply weekly payments the day they land?")

# ---------------------------------------------------------------- the cover frame
# The finished board, picked by content: the write-up's Instagram note names "the finished board (four lanes run, the
# gold plate on ≈ $8,200, the '≈ 12 mo' banner on the winner's flag, the winner arms up in a V)". On this render the
# last read (on "year") settles by frame 1040 (34.67 s); from then only the winner's idle wave moves (frame-to-frame
# mean luma change ≤ 0.014) until the end card cuts in at 37.2 s. Frame 1050 is a still point of the wave (0.002).
COVER_T = 35.0
COVER_FRAME = 1050
COVER_CROP = "crop=1080:1440:0:72"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The finished board: all 4 lanes run (Monthly 72 and ≈ $10,000; Biweekly and Weekly ≈ 65 and ≈ $8,900; Round up ≈ 60 with the gold plate on ≈ $8,200 "
                          "and the '≈ 12 mo' banner on its flag), the winner with his arms up, the working slot '= 72 − 60 ≈ 12 months / ≈ 1 year sooner' and the verdict "
                          "'Round up to $200 a week: ≈ 1 year sooner', under the question. The write-up names the finished board as the Instagram cover. "
                          "On any cut, use a frame after the last read settles and before the end card.")
COVER_FRAME_MEASURED = ("On the pre-condense 39.7 s render the last read settles by frame 1040 (34.67 s); from then only the winner's idle wave moves "
                        "(frame-to-frame mean luma change ≤ 0.014) until the end card cuts in at 37.2 s. Frame 1050 (35.00 s) is used, a still point of the wave (0.002).")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 72 to 1512 of the 1080×1920 frame: the badge, the question, the footer, the working slot, the 4 lanes and the verdict, "
                   "with even margins (40 px above the badge and below the verdict); it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the question.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the finished-board frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the question.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the question, Monthly already run at 72 and ≈ $10,000, the other 3 lanes waiting with '?' crates). It carries only the baseline, "
    "but the write-up names the finished board as the cover (Gage's one A/B favoured a finished-table cover).",
    "**When the condensed cut ships:** re-pick the finished board by content on the shipped file (a frame after the last read settles, before the end card) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 03a-39.7s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Weekly vs biweekly car loan — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 03b and 03c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("car loan", 18346, 63.6, 61.0, 53.8, "seed; -30.3% vs its 30-day baseline (26,309); the biggest exact phrase, crowded", "2026-10-12"),
    ("car payment trap", 15474, 62.5, 36.1, 63.1, "+239.1% vs its baseline (4,563); long loans and investing the payment, not this question", "2026-10-12"),
    ("car loan explained", 9373, 59.3, 30.7, 63.3, "", "2026-10-12"),
    ("payoff car loan early", 5422, 55.7, 43.2, 56.2, "", "2026-02-25"),
    ("how to way to pay off your car loan in half the time!", 5317, 55.6, 30.0, 61.4, "a hack title indexed as a query", "2026-06-09"),
    ("should i pay off car loan early", 5252, 55.5, 28.4, 62.0, "advice intent: not in the tags", "2026-05-04"),
    ("how to reduce car loan interest", 5249, 55.5, 26.3, 62.8, "", "2026-05-23"),
    ("how to pay off car loan", 5207, 55.5, 32.5, 60.3, "", "2026-08-14"),
    ("biweekly mortgage payments", 4353, 54.3, 27.3, 61.7, "the same 13-payment idea, on mortgages", "2026-06-10"),
    ("pay off debt", 32458, 67.3, 44.2, 62.7, "+66.2% vs its baseline (19,529)", "2026-10-12"),
    ("biweekly car payments", 0, 0, 20.2, 31.9, "<750/month; names the video exactly, so it stays in the tags", None),
    ("pay off car loan", 0, 0, 37.5, 25.0, "<750/month as typed; 'how to pay off car loan' carries the demand", None),
]
KEYWORD_MD_NOTE = {"car payment trap": "+239.1%; long loans and investing the payment, not this question",
                   "biweekly car payments": "<750/month; in the tags because it names the video"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; six rows are older snapshots (2026-02-25 to 2026-08-14).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Six rows are older snapshots.")
KW_OUTRO = ("Nobody searches the hook's exact words ('biweekly car payments' and 'pay off car loan' are under 750 a month); people search 'car loan' (18,346) and the how-to questions around it "
            "(5,207-5,422 each, competition 26-43). So the title keeps the write-up's question and ends on 'Car Loan', and the how-to phrases go to the tags. "
            "'Biweekly' is searched for mortgages (4,353), which is the 03c viewer.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Never Make A Car Payment Without Doing This 🤫🚘 #carshopping #cars #personalfinance #money", "Garner Ted", 101000, 252915, "2024-09-11",
     "47 s; a car-loan payment hack that 'gives you a extra payment' (its description), and a title that hides the answer"),
    ("A Biweekly Mortgage Payment Is Not Magic", "The Ramsey Show Highlights", 4600000, 223682, "2026-08-07", "1:27; the same hack, for mortgages (title only read)"),
    ("Bi-Weekly Payments 101", "VOB TV", 518, 106464, "2015-10-27", "2:56; a dealer explainer"),
    ("Stitch: Bi-weekly Payments Can Save You a TON on your Loan Balance for Cars or Mortgages", "Humphrey Yang", 2090000, 36997, "2024-07-28"),
    ("Is it better to pay car loan twice a month?", "People·WHYS", 42500, 7282, "2022-08-25"),
    ("💰 Monthly vs. Bi-Weekly Car Payments: Which Is Better for You?", "Gaby Rincon", 719, 3390, "2025-04-04", "the neutral 'which is better?' frame the write-up designs against"),
    ("Hack Your Car Payments Round Up or Go Bi-Weekly", "Regina The Queen of Car Loans", 4700, 1149, "2026-01-03", "26 s; names both levers in its title"),
    ("Slash your car loan without a refi: bi-weekly payments, spare-change round-up straight to principal!", "FinanciallyFitPodcast", 6, 995, "2025-08-02"),
    ("Instead of paying once a month, switch to biweekly car payments", "BillyTheCarKid", 2770, 747, "2025-09-02", "3:01"),
]
SAME_IDEA_HEADING = "**2. The biweekly hack is old on YouTube; the weekly-vs-biweekly answer is not (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "'Pay your car biweekly' has been posted for a decade: Garner Ted's 2024 Short (252,915 views, a title that hides the answer) and VOB TV's 2015 explainer (106,464) lead; "
    "Ramsey's 'A Biweekly Mortgage Payment Is Not Magic' (223,682, Aug 2026) takes on the same hack for mortgages. "
    "Regina's 'Round Up or Go Bi-Weekly' (Jan 2026) names both of this Short's levers in its title.",
    "",
    "No title or description read here compares weekly with biweekly on one real loan, sizes the gap (≈ $35) or shows that rounding up, not the schedule, moves the date. "
    "The one 'Monthly vs. Bi-Weekly' title asks 'which is better?' (3,390), the shape the write-up designs against; the pick asks 'what difference … really make'.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): the biweekly car-payment hack has been posted since 2015 (VOB TV 106,464; Garner Ted 252,915 in 2024); "
                  "no title or description read here compares weekly with biweekly on one loan or sizes the gap. Regina's Jan 2026 Short names both levers in its title.")

OUTLIERS = [
    {"handle": "@thedebtfreedomproject", "platform": "TikTok", "id": "7668828789551418637",
     "on_screen": "What difference does monthly, biweekly, and weekly payments make on paying off a car loan?",
     "caption": "Look what a difference rounding makes! #debt #micropayments #debtpayoffjourney #carloan #debtpayoff",
     "views": "1.9M (902.5x the account median of 2.1K)",
     "note": "the write-up's H48 model: a CPA with a spreadsheet; its caption names the lever (rounding) with no number"},
    {"handle": "@julian_miles85", "platform": "TikTok", "id": "7664639380874677517",
     "on_screen": "Fastest way to pay off Car Loans💎", "views": "1.1M (1214.1x the account median of 906)",
     "note": "weekly instead of monthly payments, talking head; his 'Car Interest Math Explained' (7665432807170166030) has 211.3K (233.2x)"},
    {"handle": "@maplelens2", "platform": "TikTok", "id": "7679183987813764382",
     "on_screen": "How Are Americans Affording $100,000 Trucks On Average Salaries?", "views": "348.8K (497.9x)",
     "note": "an animated explainer of long car loans"},
    {"handle": "@sarahsellsrides", "platform": "Instagram", "id": "DctalRsu84F",
     "on_screen": "What payments will realistically look like on a $40,000 car in 2026", "views": "214.3K (133.8x the account median of 1.6K)",
     "note": "a calculator walk-through on a loan the size of this one"},
]
OUTLIERS_HEADING = "**3. Car-loan payment maths is breaking out on TikTok and Instagram right now (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@thedebtfreedomproject** (TikTok), \"What difference does monthly, biweekly, and weekly payments make on paying off a car loan?\": 1.9M (902.5x). The write-up's H48 model. "
    "Its caption, \"Look what a difference rounding makes!\", names the lever with no number, which is what this Short's caption does above the fold.",
    "- **@julian_miles85** (TikTok), \"Fastest way to pay off Car Loans💎\": 1.1M (1214.1x). Weekly instead of monthly, talking head; his \"Car Interest Math Explained\" has 211.3K (233.2x).",
    "- **@maplelens2** (TikTok), \"How Are Americans Affording $100,000 Trucks On Average Salaries?\": 348.8K (497.9x). An animated explainer, the closest outlier to this Short's look.",
    "- **@sarahsellsrides** (Instagram), \"What payments will realistically look like on a $40,000 car in 2026\": 214.3K (133.8x), on a loan the size of this one.",
    "- None puts a result in its on-screen hook: two ask a question, one names the stake, one promises a method.",
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
    "Debt-payoff maths is the channel's best-performing topic on Instagram: the 5 Oct '$5,000 on the minimum' Reel leads on plays (7,302) and skip rate (27.4%). "
    "The channel's only car Short so far is June's 'The $1.3 million mistake you're making every month' (`0PFU6V3XSuo`, 176 views), an invest-the-payment argument, not this one. "
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
    "The write-up's sources rest on search-result text: its egress proxy blocked the primary pages. Before posting, open Edmunds' Q3 2026 new-vehicle finance release and confirm $44,664 at 7.0% (the write-up's open item 1).",
    "Whether a lender posts a weekly payment the day it lands is the video's stated assumption, not a fact about any lender; the pinned comment asks the viewer to check theirs.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "own_channel_same_topic": [
        {"id": "0PFU6V3XSuo", "title": "The $1.3 million mistake you're making every month #carpayment #money #investing", "published": "2026-06-05", "views": 176,
         "note": "the channel's only car-payment Short: investing a $500 payment instead; not linked (a different argument)"},
    ],
    "titles_scored": "9 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "100 credits for this teaser (8 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 9 title scores; 5 each), plus 15 shared across 03a-03c for the channel's own stats and its older Shorts, and 10 for the re-query (1 title score, 1 keyword). The adversarial check used 35 more across 03a-03c (balance 4,030 → 3,995): 3 title scores, 6 keyword re-queries and 1 lookup of 5 of the channel's own videos.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through "
                "publishing/data/checks/03-what-difference.py; the four 03a schedules re-run day by day in MATH_RELATIONS (payments, months, every interest total, the shown differences); "
                "COPY_RULES keep every rounded figure 'about' or '≈', every 13 as '13 monthly payments' or '13 ×', each difference beside its schedule, the $1,800 and the year beside their baseline "
                "(paying monthly), and the posting condition in the copy; re-run at the adversarial check with the same result")
VIDIQ_REQUERIED = ("pulled 2026-10-13: car loan 18,346 / 61.0 (-30.3%); how to pay off car loan 5,207 / 32.5; pay off debt 32,458 (+66.2%); "
                   "title scores 93 (pick), 92 (write-up title), 84 (best hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried the same day after the build: the pick's title score 93 and 'car loan' 18,346 / 61.0. "
                   "Re-queried at the adversarial check: the pick's title score 93; 'car loan' 18,346 / 61.0 (-30.3%); 'pay off debt' 32,458 / 44.2 (+66.2%); "
                   "the related video 8__HTUa2PoU 642 views (25.99% APR, $25 floor in its description). All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN}. Every public figure traces to the 03a maths table: $750.16, $375.08, $187.54; "
    "$9,752.08 = 13 × $750.16 = $375.08 × 26 = $187.54 × 52; monthly 72 payments, $10,011.20 ≈ $10,000; biweekly 142 (65.36 months ≈ 65), $8,916.74 ≈ $8,900, ≈ $1,100 less; "
    "weekly 282 (64.90 months ≈ 65), $8,881.25, $35.49 ≈ $35 better; round up $187.54 + $12.46 = $200, 261 payments (60.07 months ≈ 60), $8,184.40 ≈ $8,200, ≈ $1,800 less; "
    "72 − 60 ≈ 12 months ≈ 1 year. The data file re-runs the four schedules and gets every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 9 titles scored against this channel: the pick 93 (tied with option 2), the write-up's title 92. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 93; 'car loan' 18,346 / 61.0 (snapshot 2026-10-12). "
    "Again at the adversarial check: the pick 93; 'car loan' 18,346 / 61.0 (−30.3%); 'pay off debt' 32,458 / 44.2 (+66.2%); 8__HTUa2PoU 642 views. All match.",
    "- **Mutation test.** Seven breaks on scratch copies of this file all fail by name: '$1,800' without its 'about', '13 payments' for '13 monthly payments', the Edmunds line dropped from the caption, "
    "a title that names the round-up, a '$36' gap, the 'day it lands' condition dropped from the pinned comment, and a spelled-out 'twelve'.",
    "- **Kept on purpose.**",
    "  - The cover and the YouTube frame show the finished board, as the write-up's Instagram note asks (as on 06c). The no-result rule covers the title and the caption's first 125 characters.",
    "  - The write-up's caption line 1 (the verdict) sits below the fold, without its exclamation mark.",
    "  - '≈ the average new-car loan', never 'the average': $44,000 is a round loan under Edmunds' $44,664, not its rounding.",
    "- **Adversarial pass (2026-10-13): changed.**",
    "  - The round-up's 'about a year sooner' and '≈ $1,800 less' never named their baseline. Read after 'rounding the weekly payment up', they say a year sooner than weekly, "
    "but both are against paying monthly (the round-up's crate lands about 5 months before weekly's). The description, the caption, the first comment and both alt texts now say 'than monthly' "
    "or 'against paying monthly', and a new COPY_RULE requires it on every line that gives the $1,800 or the year. Five breaks (each phrase dropped in turn) fail by name.",
    "  - The pinned comment said 'That decides whether any of this works.' That overstates the condition: a lender that holds weekly payments until the due date still gets 13 monthly payments a year, "
    "so the extra payment still counts and only the exact figures move. It now says 'These numbers assume the day it lands.', the write-up's own assumption.",
    "  - The long alt text said Round up 'strains, then lands'. That is a round-2 beat the condensed cut's spec drops (its round-up lane no longer has the long lead-in the kit strains on), "
    "so the alt text no longer describes it (copy stays cut-independent).",
    "  - The related video's note called '238 Months' the channel's best debt Short. June's 'Why the minimum payment keeps you in debt for 19 years' has 1,230 views to its 642; "
    "the note now says October's debt Short, with the best Reel as its Instagram twin.",
    "  - The maths count is now 528 checks, 0 failed: the 03 check became cut-aware during the parallel condense (525 at the first build).",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 03a table and the check's output; the title, description, tags, hashtags, caption and alt text against both platforms' limits; "
    "Edmunds named only as the source, with its affiliation line in both; no advice; the cover (35.0 s) read as a still: the finished board, the question and the verdict, all on the 3:4 crop.",
    "- **Still to do.** The primary-source check above, and the ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 03a maths table (teasers/v2/03-what-difference.md, section 03a) and
# recomputed below; $44,000, 7% over 72 months, the $200 round-up and Edmunds' $44,664 at 7.0% are the write-up's inputs.
FIGURES = {
    "$44,000", "7", "72", "$750.16", "$375.08", "$187.54", "$200", "$12.46", "$12", "$9,752.08", "13", "12", "26", "52",
    "$10,000", "$8,900", "$1,100", "$35", "$35.49", "65", "60", "$8,200", "$1,800", "1", "4",
    "$44,664", "7.0", "2026", "3", "$10,011.20", "$8,916.74", "$8,881.25", "$8,184.40", "142", "282", "261",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_c = lambda x: x.quantize(_D("0.01"), _UP)
_apr, _month = _D("0.07"), _D(365) / 12


def _car(pay, days):
    """simple interest charged daily (APR ÷ 365), rounded to the cent each period, payment applied the day it is paid -> (payments, interest, months)"""
    bal, n, tot = _D(44000), 0, _D(0)
    while bal > 0:
        i = _c(bal * _apr / 365 * days); tot += i; bal += i; n += 1
        bal -= min(pay, bal)
    return n, tot, float(n * days / _month)


_pmt = _c(_D(44000) * (_apr / 12) / (1 - (1 + _apr / 12) ** -72))
_mo, _bi, _wk, _up = _car(_pmt, _month), _car(_pmt / 2, _D(14)), _car(_pmt / 4, _D(7)), _car(_D(200), _D(7))
MATH_RELATIONS = [
    (_pmt == _D("750.16") and _pmt / 2 == _D("375.08") and _pmt / 4 == _D("187.54"), "$44,000 at 7% over 72 months: $750.16; ÷ 2 = $375.08; ÷ 4 = $187.54"),
    (_D("375.08") * 26 == _D("187.54") * 52 == 13 * _D("750.16") == _D("9752.08"), "$375.08 × 26 = $187.54 × 52 = 13 × $750.16 = $9,752.08"),
    (_D(200) - _D("187.54") == _D("12.46") and round(12.46) == 12, "$187.54 + $12.46 = $200 (about $12 more a week)"),
    (_mo[:2] == (72, _D("10011.20")) and round(_mo[1], -3) == 10000, "monthly: 72 payments, $10,011.20 ≈ $10,000"),
    (_bi[:2] == (142, _D("8916.74")) and round(_bi[2]) == 65 and round(_bi[1], -2) == 8900, "biweekly: 142 payments, 65.36 months ≈ 65, $8,916.74 ≈ $8,900"),
    (_wk[:2] == (282, _D("8881.25")) and round(_wk[2]) == 65 and round(_wk[1], -2) == 8900, "weekly: 282 payments, 64.90 months ≈ 65, $8,881.25 ≈ $8,900"),
    (_bi[1] - _wk[1] == _D("35.49") and round(_bi[1] - _wk[1]) == 35, "weekly beats biweekly by $35.49 ≈ $35"),
    (round(_mo[1] - _bi[1], -2) == 1100 == 10000 - 8900, "biweekly ≈ $1,100 less (= shown 10,000 − 8,900)"),
    (_up[:2] == (261, _D("8184.40")) and round(_up[2]) == 60 and round(_up[1], -2) == 8200, "round up: 261 payments, 60.07 months ≈ 60, $8,184.40 ≈ $8,200"),
    (round(_mo[1] - _up[1], -2) == 1800 == 10000 - 8200, "round up ≈ $1,800 less (= shown 10,000 − 8,200)"),
    (72 - 60 == 12 and round((72 - _up[2]) / 12) == 1, "72 − 60 ≈ 12 months ≈ 1 year sooner (0.99)"),
]
MATH_SCRIPT = "publishing/data/checks/03-what-difference.py"
MATH_KEY_LINES = ["03a car: payment $750.16 / $375.08 / $187.54 / $200",
                  "monthly   n=  72  months= 72.00  interest= $10,011.20", "biweekly  n= 142  months= 65.36  interest=  $8,916.74",
                  "weekly    n= 282  months= 64.90  interest=  $8,881.25", "rounded   n= 261  months= 60.07  interest=  $8,184.40"]
RESULT_RE_TITLE = r"13|35|year|12 mo|1,8|8,2|8,9|1,1|\b60\b|\b65\b|[Rr]ound|\$200|10,0"
RESULT_RE_CAPTION = r"\$35|13 |9,7|year sooner|a year|12 mo|1,8|8,2|8,9|1,1|\b60\b|\b65\b|[Rr]ound|\$200|10,0|barely|trick|\$12"   # prefixes, so a figure cut by the fold still fails

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
    (all(_approx(p) for p in (r"\$10,000", r"\$8,900", r"\$8,200", r"\$1,100", r"\$1,800", r"\$35\b(?!\.)", r"\b65 months", r"\b60 months",
                              r"\$12\b(?!\.)", r"(?<!− )\b12 months", r"\b(?:a|1) year sooner")),
     "every rounded figure is 'about' or '≈' ($10,000, $8,900, $8,200, $1,100, $1,800, $35, 65 and 60 months, $12, 12 months, a year sooner)"),
    (all(_re.match(r"13 (?:monthly|×)", v[m.start():]) for v in _COPY.values() for m in _re.finditer(r"\b13\b", v)),
     "every 13 is '13 monthly payments' or '13 ×' (the lever's unit)"),
    (_with(r"\$35\b", (r"[Bb]iweekly",)), "the $35 gap always names biweekly, the schedule it is measured against"),
    (_with(r"\$1,100", (r"[Bb]iweekly",)), "$1,100 less sits beside biweekly"),
    (_with(r"\$1,800|\$8,200", (r"\$200",)), "$1,800 less and $8,200 sit beside the $200 round-up that earns them"),
    (_with(r"\$1,800|year sooner|about a year|\b1 year", (r"(?:than|against|beats|before) (?:paying )?[Mm]onthly|Against monthly",)),
     "the $1,800 and the year saved always name their baseline, paying monthly (not weekly or biweekly)"),
    (all("day it lands" in _COPY[k] or "day they land" in _COPY[k] for k in ("description", "pinned comment", "caption", "first comment")),
     "the posting condition (each payment applied the day it lands) is in the description, both comments and the caption"),
    (all("Not affiliated with or endorsed by Edmunds." in v for v in _COPY.values() if "Edmunds" in v), "wherever Edmunds is named, the copy says it is not affiliated with or endorsed by Edmunds"),
    (not _re.search(r"the average new-car loan\b(?! \()", _ALL.replace("≈ the average", "")) and "≈ the average new-car loan" in YT_DESCRIPTION,
     "$44,000 is '≈ the average new-car loan', never 'the average'"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    (not _NUMBER_WORDS.findall(_ALL), "no spelled-out figures (the figure check can't see them)"),
]
