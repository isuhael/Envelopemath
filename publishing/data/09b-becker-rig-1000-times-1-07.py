# 09b publishing data: POV, someone invested just $1,000 for you at birth; what's it worth at 65? (Becker Rig, growth-ladder).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 08b-becker-rig-hours-at-15.py (the nearest
# Becker Rig sheet of the same batch), laid out like 09a.
#
# Facts come only from teasers/v2/09-growth-ladder.md (section 09b, "Decisions shared by all three" and the Sources
# under 09a that 09b cites) and python3 teasers/v2/checks/09-growth-ladder.py. Research: vidIQ, pulled 2026-10-13.
# The video is the pre-condense cut: the 09 condense is in progress in parallel (timing only; numbers, caption facts
# and the verdict stay). This sheet names no timestamp except the cover, which is picked by content (the heave), so
# the ship step only re-runs the build with --covers on the final file.

TEASER = "09b Becker Rig, growth-ladder: \"POV: someone invested just $1,000 for you at birth. What's it worth at 65?\""
PREPARED = "2026-10-13"
SHORT_ID = "09b"
MD_TITLE = "09b publishing sheet: $1,000 invested for you at birth, what's it worth at 65?"
MATH_RUN = "509 checks, 0 failed"      # python3 teasers/v2/checks/09-growth-ladder.py on studio/specs/ (via publishing/data/checks/09-growth-ladder.py), 2026-10-13
MATH_SCRIPT = "publishing/data/checks/09-growth-ladder.py"   # runs the 09 check unchanged, adds the builder's summary form
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "5d8f22d554a8575404ac05fdff6033e5dd2c4c0ffee4be74f473bbe64bdc522c"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the assembly-fix-pass cut (2026-10-08). The 09 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the heave), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/09-growth-ladder.md` (09b) and its check, "
    f"`python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13; the builder runs it through the adapter `publishing/data/checks/09-growth-ladder.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every rung from $1,000 × 1.07 per birthday, "
    "the 'over 81 times', the pinned at-25 figure and its × 5.4, keeps every rung's figure beside its own age and every rounded figure 'about' or '≈'.",
    "- **Honesty rules kept.** The title asks what the gift is worth at 65 and never says, and neither does the cover (the heave: the last, heavy coin on its way to the empty age-65 rung). "
    "The Instagram caption keeps every result below 'more'. The copy says the 7% is an assumption, not a forecast, credited once a year with nothing added or taken out, "
    "and that the figures read as rough today's dollars only because 7% is close to the S&P 500's return after inflation, as the write-up's caption does. "
    "No 'millionaire' anywhere: ≈ $81,273 is the answer. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** No company or product is in the video. The copy names the S&P 500 only to explain the 7% (the write-up's caption line); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' No share price is named.",
    "- **[click-check].** The '≈ 6.8% a year after inflation since 1928' is the Official Data Foundation figure (6.81%, a live figure read 2026-10-07) that the write-up marks for a hand check before posting "
    "(confirmed in search results; the proxy blocked the page). Nothing here changes that.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "pre-condense cut (assembly fix pass, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 09 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay); no 09 WIP spec was in studio/specs-wip/ at this build. "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/09-growth-ladder.md section 09b; teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "basis": "V(a) = $1,000 × 1.07^a at age a: one $1,000 at birth, 7% credited once a year (on each birthday), nothing added or withdrawn; no fees, taxes or inflation adjustment; not a forecast",
    "rungs": "age 1 $1,070 (exact); 10 ≈ $1,967; 18 ≈ $3,380; 25 ≈ $5,427; 30 ≈ $7,612; 40 ≈ $14,974; 50 ≈ $29,457; 65 ≈ $81,273 (put in: $1,000 on every rung)",
    "multiple": "81,272.86 ÷ 1,000 = 81.27: 'over 81 times the gift'",
    "doubling": "72 ÷ 7 = 10.3; the first age with V ≥ $2,000 is 11: 'roughly doubles every 10 years (72 ÷ 7 ≈ 10)'",
    "scaling": "every rung scales with the gift: $500 halves them, $5,000 multiplies them by 5",
    "pinned": "the same $1,000 at 25: 1,000 × 1.07^40 = 14,974.46 ≈ $14,974 at 65 (the age-40 rung's figure); 81,272.86 ÷ 14,974.46 = 1.07^25 = 5.43 ≈ × 5.4",
    "sp500": "7% is close to the S&P 500's return after inflation since 1928, 6.81% ≈ 6.8% a year (Official Data Foundation, live figure read 2026-10-07) [click-check]; read the rungs as rough today's dollars only on that reading",
    "verdict": "≈ $81,273 at 65. Over 81× the gift, never topped up.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What If Someone Invested $1,000 for You the Day You Were Born? What's It Worth at 65?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score of the 6 scored (tied). The header's gift and question as a 'what if' (the searched grammar of 'what if you invested $1000 in', 4,986 a month): the first question is the first 62 characters, "
             "and 'What's It Worth at 65?' is the header's own. 'The day you were born' is the write-up caption's phrase. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "What If Someone Invested Just $1,000 for You the Day You Were Born? What's It Worth at 65?", "vidiq_score": 98,
     "note": "The same score with the header's 'just', the word that carries the wrong belief ('a token gift'). 5 characters longer; the pick leaves it to the header, which says it on frame 1."},
    {"rank": 3, "title": "Someone Invested $1,000 for You at Birth and Never Added a Cent. What's It Worth at 65?", "vidiq_score": 96,
     "note": "Puts 'never topped up' in the title, for 2 points less."},
]
YT_TITLES_ALSO_SCORED = [
    ("POV: Someone Invested Just $1,000 for You at Birth. What's It Worth at 65? Compound Interest, Age by Age", 96, "104 characters, over YouTube's 100"),
    ("POV: Someone Invested Just $1,000 for You at Birth. What's It Worth at 65?", 90, "the write-up's title"),
    ("$1,000 Invested at Birth and Never Touched: What's It Worth at 65?", 86, ""),
]
TITLE_BULLETS = [
    "It asks the header's question and names no result: not ≈ $81,273, not 'over 81 times', no rung. '$1,000' and '65' are the inputs, on screen at frame 1 in the header.",
    "It raises the write-up's title from 90 to 98: the 'POV:' opener scores 8 points under the same question as a 'What if'. The video still opens on the POV header, so the title and frame 1 say the same thing two ways. "
    "vidIQ's model ranks titles but does not predict views.",
    "The same idea is up on YouTube with the answer in the title ('$1,000 at birth becomes $81,000 by 65', research section 2); the pick keeps the question.",
]

YT_DESCRIPTION = """What if someone invested $1,000 for you the day you were born, and nobody touched it again? At an assumed 7% a year it's about $81,273 at 65: over 81 times the gift.

The math, shown (worth = $1,000 × 1.07 for every birthday):
• Age 1: $1,000 × 1.07 = $1,070.
• Age 10: ≈ $1,967. It roughly doubles every 10 years (72 ÷ 7 ≈ 10).
• Age 18: ≈ $3,380.
• Age 30: ≈ $7,612.
• Age 40: ≈ $14,974.
• Age 50: ≈ $29,457.
• Age 65: ≈ $81,273, over 81 times the $1,000. Never topped up.
• A different gift? Scale every rung: $500 halves them, $5,000 multiplies them by 5.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. One $1,000 at birth at an assumed 7% a year, credited once a year on each birthday; nothing added or taken out. 7% is an assumption, not a forecast. It is close to what the S&P 500 has returned after inflation since 1928 (about 6.8% a year: Official Data Foundation, read Oct 2026), so read these as rough today's dollars. No fees or taxes. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#compoundinterest #investingforkids #generationalwealth"""
DESC_NOTE = ("The opening line is the title's question with the answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08b: the verdict is a plain reading of an assumed rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#compoundinterest", "#investingforkids", "#generationalwealth"]
YT_HASHTAG_NOTES = [
    ("#compoundinterest", "the mechanism, and the write-up's first caption tag ('compound interest' 137,873 searches a month, competition 50.6)."),
    ("#investingforkids", "the parents who would make this gift: the tag the same-idea Shorts and the 'invest for your kid' outliers use ('how to start investing for kids' 5,322 a month)."),
    ("#generationalwealth", "the frame those posts travel under ('generational wealth' 43,615 a month; 'how to build generational wealth' 24,160, +35.1% on its baseline). The copy itself only says what one $1,000 becomes."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["1000 invested at birth", "invest 1000 at birth", "investing for kids", "how to start investing for kids", "investing account for kids",
           "stock investing for kids", "generational wealth", "how to build generational wealth", "compound interest", "the power of compound interest",
           "1000 dollars invested", "what if you invested 1000", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. vidIQ indexes no 'at birth' money phrase (its 'at birth' matches are all stories), "
             "so the first two tags are the video's own words; 'how to start investing for kids' (5,322) and 'investing account for kids' (3,960) carry the parent intent. "
             "Left out on purpose: 'trump account' (22,489, +20.2%), the 2025 law's $1,000-at-birth account: the write-up doesn't cover it, its terms are not verified here, and naming it would tie the maths to a program; "
             "'make your kid a millionaire' phrasings, because the answer is ≈ $81,273, not a million.")

YT_PINNED = """Got the $1,000 at 25 instead of at birth? It's ≈ $14,974 at 65, not ≈ $81,273. Those first 25 years multiply it by 5.4.

Same 7% a year, credited once a year, nothing added. How old were you when your first $1,000 went in?"""
PINNED_NOTE = ("The write-up's pinned comment, unchanged, then its conditions and a question that invites 'I got mine at …' replies, as the write-up wants. "
               "≈ $14,974 is the age-40 rung's own figure (40 years of growth either way), so the viewer can check it on the ladder. The caption answers the two comment fights the write-up expects "
               "('where do you get 7%?' and 'inflation') with the after-inflation framing.")

RELATED_VIDEO = {
    "pick": {"id": "EqFQCJheCMU", "title": "Start Investing 10 Years Late? You Get Half. #investing #compoundinterest #personalfinance",
             "url": "https://www.youtube.com/shorts/EqFQCJheCMU",
             "why": "The channel's own lump-sum start-age Short ($10,000 at 25 vs at 35, at 7%), live since Tue 6 Oct 2026. This Short's pinned comment asks the same 'what if it went in later?' with $1,000 at birth vs at 25."},
    "swap_when_live": "09a ($100 a month) or 09c ($1 a day × your number), the same growth-ladder series, once published. Then point EqFQCJheCMU's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the heave frame (the cover below): the POV header, rungs 1 to 50 filled, the age-65 rung empty, and the figure buckling under the last, heavy coin."
THUMB_MD = ("in the YouTube app, pick the heave frame, the same content as the Instagram cover below: the POV header over the 7% footer, rungs 1 to 50 filled ($1,070 up to ≈ $29,457), "
            "the age-65 rung still empty at the top, and the figure buckling under the last, heavy coin. It asks without answering, like the title beside it in search.")
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the 09 condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 09a and 09c. Suggested order within the series: 09a, then 09b, then 09c.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Money set aside at birth is in the news: 'how to build generational wealth' runs +35.1% and 'trump account' +20.2% over their baselines, and several 2026 Shorts describe a federal $1,000-at-birth account "
           "(per their descriptions; not verified here, and not in the copy).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What if someone invested $1,000 for you the day you were born, and nobody touched it again? What's it worth at 65? "
           "One gift. Never topped up.")

IG_CAPTION = IG_HOOK + """

At an assumed 7% a year, credited once a year, it roughly doubles every 10 years (72 ÷ 7 ≈ 10):
• Age 10: ≈ $1,967.
• Age 30: ≈ $7,612.
• Age 50: ≈ $29,457.
• Age 65: ≈ $81,273, over 81 times the gift.

7% is close to what the S&P 500 has returned after inflation since 1928 (≈ 6.8% a year), so read these as rough today's dollars. A different gift? Scale every rung: $500 halves them, $5,000 multiplies them by 5.

7% is an assumption, not a forecast. Nothing added or taken out; no fees or taxes. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

How old were you when your first $1,000 went in?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#compoundinterest #investingforkids #generationalwealth #moneymath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the title's question, the header's age (65) and the write-up's numberless caption line 1 ('One gift. Never topped up.'), "
                   "no result: the caption overlays the Reel from frame 1, so every rung's figure sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the gift, the question and the write-up's line 1, with no figure but the $1,000 input and the age 65. The numbers sit below 'more', where Instagram search and Google indexing still read them.",
    "The rate paragraph is the write-up's caption: 7% is close to the S&P 500's after-inflation return, so the rungs read as rough today's dollars, with the scaling rule for other gifts.",
    "The caption follows the house close: the write-up's 'I got mine at …' question, then the follow line plus the credit.",
]

IG_HASHTAGS = ["#compoundinterest", "#investingforkids", "#generationalwealth", "#moneymath", "#personalfinance"]
IG_HASHTAG_MD = [
    "The write-up tags `#compoundinterest #investing #moneymath #mathtok`; two give way to the parent audience:",
    "",
    "- `#compoundinterest` and `#moneymath` stay; `#investingforkids` and `#generationalwealth` replace `#investing` and `#mathtok` (a TikTok tag).",
    "- The three Instagram outliers for this idea ('How to make your kid a millionaire (2026 edition)', 0.2-1.4M views, research section 3) reach parents under these tags. This Short borrows the audience, not the claim.",
    "",
    "`#personalfinance` is the broad layer, as on 07a and 09c.",
]

IG_ALT_SHORT = "Chart: $1,000 at birth at 7% a year, never topped up: about $81,273 at 65, over 81 times the gift."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the 7% and 'never topped up' beside the result.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page with a green stick figure at the foot of a ladder whose rungs are ages. The header says: POV: someone invested just $1,000 for you at birth. What's it worth at 65? "
               "The footer: assumes 7% a year, added once a year, never topped up, not a forecast. Columns: age, put in, worth. "
               "The figure throws a coin up to each rung, and each coin becomes its row's worth, with $1,000 put in on every rung: age 1, $1,070; age 10, about $1,967; age 18, about $3,380; "
               "age 25, about $5,427; age 30, about $7,612; age 40, about $14,974; age 50, about $29,457. "
               "The last coin is too heavy: he buckles under it, presses it overhead and heaves it onto a gold plate at age 65, about $81,273. "
               "Verdict: about $81,273 at 65, over 81 times the gift, never topped up.")

IG_FIRST_COMMENT = ("Age 10: ≈ $1,967. Age 30: ≈ $7,612. Age 50: ≈ $29,457. Age 65: ≈ $81,273, over 81 times the gift, never topped up. "
                    "Got it at 25 instead? ≈ $14,974 at 65.")

# ---------------------------------------------------------------- the cover frame
# The heave, picked by content: the write-up's Instagram note offers frame 1 (the POV header over the empty age ladder)
# or the heave frame. The heave asks the title's question with the ladder half-built: rungs 1-50 filled, the age-65 rung
# empty, the figure buckling under the last coin. On this render the heavy coin drops into his arms at about frame 426
# (14.2 s) and he buckles; the frame holds nearly still until he hitches it up at about frame 447 (14.9 s).
COVER_T = 14.6
COVER_FRAME = 438
COVER_CROP = "crop=1080:1440:0:50"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The heave, its first beat: the header 'POV: someone invested just / $1,000 for you at birth. / What's it worth at 65?' ($1,000 in green), "
                          "the footer 'ASSUMES 7% a year, added once a year / never topped up · not a forecast', the heads Age / Put in / Worth, "
                          "rungs 1 to 50 filled ($1,070, ≈ $1,967, ≈ $3,380, ≈ $5,427, ≈ $7,612, ≈ $14,974, ≈ $29,457, with $1,000 put in on each), the age-65 rung empty at the top, "
                          "the figure buckled at the foot of the ladder with the last, heavy gold coin in his arms, and the caption 'At 50: about $29,457.' "
                          "It asks and does not answer: the age-65 shelf the title asks about is still empty. On any cut, use a frame from the buckle, after the heavy coin is in his arms and before he lifts it.")
COVER_FRAME_MEASURED = ("On the pre-condense 29.5 s render the heavy coin drops into his arms at about frame 426 (14.2 s); from about frame 432 (14.40 s) to frame 446 (14.87 s) the frame-to-frame mean luma change "
                        "stays under 0.0009 (his strain wobble), and he hitches the coin up from about frame 447. Frame 438 (14.60 s) is inside that buckle, with the caption fully lit.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 50 to 1490 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1428 (the caption), so the crop centres it (62 px above and below): "
                   "badge, header, footer, heads, the whole ladder with the figure and the coin, and the caption; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the heave frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the POV header over eight empty age rungs, the figure thinking), the write-up's other cover option. It asks too, but shows nothing climbing; the heave shows the ladder and the strain, the format's own gag.",
    "**Not used:** the gold plate and the verdict ('≈ $81,273 at 65. / Over 81× the gift, never topped up.'), the answer to the title.",
    "**When the condensed cut ships:** re-pick the buckle by content on the shipped file and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 09b-29.5s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. A cover test (the heave vs frame 1) is the other use. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '$1,000 at birth, age by age — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 09a and 09c.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("compound interest", 137873, 76.7, 50.6, 65.8, "the mechanism; −17.3% vs its 30-day baseline (166,772)", "2026-10-12"),
    ("generational wealth", 43615, 69.3, 61.0, 57.2, "−17.9% vs its baseline (53,133); the US is its top market", "2026-10-12"),
    ("how to build generational wealth", 24160, 65.4, 52.0, 58.5, "+35.1% vs its baseline (17,888)", "2026-10-12"),
    ("trump account", 22489, 65.0, 43.0, 61.8, "+20.2% vs its baseline (18,708); not used (see the tags note)", "2026-10-12"),
    ("how to start investing for kids", 5322, 55.6, 44.5, 55.6, "the parent intent", "2026-04-11"),
    ("what if you invested $1000 in", 4986, 55.2, 39.7, 57.2, "the title's grammar", "2026-10-12"),
    ("stock investing for kids", 4912, 55.1, 44.0, 55.5, "", "2026-02-25"),
    ("$1000 invested", 4705, 54.8, 32.7, 59.8, "", "2026-09-15"),
    ("invested $1000 at 22 and forgot about it", 4379, 54.4, 36.0, 58.2, "the same left-alone lump, from 22", "2026-08-17"),
    ("investing account for kids", 3960, 53.7, 32.7, 59.1, "", "2026-06-11"),
    ("investing for your child", 0, 0, 36.0, 25.6, "<750/month (seed, US research mode)", None),
    ("at birth (matching terms)", 0, 0, None, None, "no money phrase indexed: every match is a story ('switched at birth')", None),
]
KEYWORD_MD_NOTE = {"trump account": "+20.2%; not used (see the tags note)"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'investing for your child' with US volumes and 'trump account'; matching_terms for 'at birth', 'investing for kids' and 'invested $1000'; "
                   "questions for 'generational wealth'), pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; "
                   "six rows are older snapshots (2026-02-25 to 2026-09-15).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Six rows are older snapshots.")
KW_OUTRO = ("Nobody searches 'at birth' for money: the gift is searched as a parent's project ('generational wealth' 43,615; 'how to build generational wealth' 24,160, +35.1%; "
            "'how to start investing for kids' 5,322) or as a 'what if you invested $1000' (4,986). So the title uses the 'what if' grammar, the hashtags carry the parent words, and the copy "
            "says only what one $1,000 becomes. 'trump account' (22,489, rising) is the news hook next door, left out of the copy (tags note).")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("QUANTO TERIA INVESTINDO R$ 100 POR MÊS DESDE QUE NASCEU?", "PROJETO TRIVIA", 105000, 1613770, "2026-07-26",
     "Portuguese: R$100 a month since birth, valued at ages 1, 5, 10, 18, 25 and 30 (per its description): the age ladder, with monthly deposits"),
    ("How to save money for your child!!! #wealth #savings #money #investing #finance #529 #investments", "Your Rich BFF", 1290000, 289876, "2023-01-23", "adjacent: saving for a child"),
    ("Can $1,000 at birth change a child's future? A Republican proposal aims to find out", "WTHR", 403000, 4899, "2025-06-10", "local news on the $1,000-at-birth accounts proposal"),
    ("The POWER of Compound Growth", "Krish Kara", 852, 3604, "2026-03-18", "£1,000 at birth at 8%, age by age in its description"),
    ("$1,000 invested at birth.Add $100/month.", "Lloyd Ross", 11600, 1374, "2025-08-26"),
    ("$1,000 at birth becomes $81,000 by 65 #Shorts", "Money_Charts", 16, 621, "2026-06-18",
     "this Short's maths (7%, never added to) with the answer in its title; outlier score 27.6"),
    ("Could $1,000 Turn Into $490,000? 🤯", "Pinnacle Financial Advisors ", 53, 142, "2026-09-18", "the same gift at an assumed 10%"),
    ("$1,000 Invested at Birth Becomes $148,780 by Age 65", "YAWN & EARN", 0, 74, "2026-08-10", "at 8%, with the answer in its title and an inflation note in its description"),
]
SAME_IDEA_HEADING = "**2. The $1,000-at-birth idea is up on YouTube, small and with the answer in the title (vidIQ YouTube search, under 4 min, by relevance and by views).**"
SAME_IDEA_MD = [
    "Five channels have posted a 1,000-at-birth ladder (Krish Kara's in pounds, Lloyd Ross's with $100 a month added on); the biggest is Krish Kara's £1,000 at 8% (3,604 views). Money_Charts' '$1,000 at birth becomes $81,000 by 65' (621 views) is this Short's maths "
    "with the answer in the title, and two others do the same at 8% and 10%. None asks, and none frames the gift as yours ('for you'), which is the POV header's move. The pick asks.",
    "",
    "Next door, a by-age ladder from birth travels when it is monthly (PROJETO TRIVIA, Portuguese, 1,613,770), and a 2025 news clip on $1,000-at-birth accounts (WTHR, 4,899) shows the gift is in the news.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by relevance and by views): five channels with a 1,000-at-birth ladder (one in pounds, one with monthly additions), all under 3,700 views, three with the answer in the title "
                  "(Money_Charts' is this Short's 7% maths: '$81,000 by 65'). None asks, and none says 'for you'. A monthly from-birth ladder in Portuguese has 1.6M views.")

OUTLIERS = [
    {"handle": "@billionaireunions", "platform": "Instagram", "id": "Db_mZkjhujh",
     "on_screen": "How to make your kid a millionaire (2026 edition)", "views": "1.4M (32.7x the account median of 42.3K)",
     "note": "faceless text on screen, music only: a step-by-step plan for a child, ending on its projected total"},
    {"handle": "@iamginakaur", "platform": "Instagram", "id": "Da20-ffsxh3",
     "on_screen": "HOW TO MAKE YOUR KID A MILLIONAIRE (2026 EDITION)", "views": "614.3K (41.2x the account median of 14.9K)",
     "note": "the same text over a mirror selfie with a child, music only"},
    {"handle": "@bossymommas", "platform": "Instagram", "id": "DcmSYNKoy4U",
     "on_screen": "How to make your kid a millionaire (2026 edition)", "views": "201.8K (62.8x the account median of 3.2K)",
     "note": "the same text again, over a mother and baby"},
    {"handle": "@george.kamel", "platform": "TikTok", "id": "7662399859114151199",
     "on_screen": "SO WHAT IS A THE MILLIONAIRE LOOPHOLE INSIDE TRUMP ACCOUNTS", "views": "831.2K (13.8x the account median of 60.3K)",
     "note": "a compound-interest calculator on a child's account, talking head"},
    {"handle": "@valeefloressx", "platform": "TikTok", "id": "7666578436340649246",
     "on_screen": "I kept my son's $250 birthday money", "views": "71.5K (93.8x the account median of 762.5)",
     "note": "a gift invested for a child instead of spent: the same idea at a smaller stake"},
]
OUTLIERS_HEADING = "**3. Money for a child travels on Instagram and TikTok, mostly as a millionaire plan (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@billionaireunions** (Instagram), \"How to make your kid a millionaire (2026 edition)\": 1.4M (32.7x). Faceless text with music, the form closest to this Short. "
    "The same line went out on **@iamginakaur** (614.3K, 41.2x) and **@bossymommas** (201.8K, 62.8x): one template, three outliers.",
    "- **@george.kamel** (TikTok), \"…the millionaire loophole inside Trump Accounts\": 831.2K (13.8x). A calculator on a child's account.",
    "- **@valeefloressx** (TikTok), \"I kept my son's $250 birthday money\": 71.5K (93.8x). A gift invested instead of spent.",
    "- The audience is parents, and the hook is a million. This Short answers ≈ $81,273 at 65 for one $1,000 never topped up, so it takes the parents' hashtags (`#investingforkids`, `#generationalwealth`) and leaves the millionaire promise alone.",
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
    "The closest past post is '10 years late' (a $10,000 lump sum at 25 vs 35, at 7%, dominoes): 161 YouTube views, and on Instagram 219 plays with the month's highest skip rate (65.1%) and lowest average watched (30.6%). "
    "It opened on its answer ('You Get Half.'); this Short opens on a POV question with an age ladder on frame 1. 06c (760 views, 1,711 plays) and 06b (Mon 12 Oct 12:14 ET: 75 views so far; its Reel shows 7 plays "
    "while Instagram's owner insights catch up) are left out of the medians as too young.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic):",
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
    "The '≈ 6.8% after inflation since 1928' is a live Official Data Foundation figure read from search results (the write-up's [click-check]); it will drift.",
    "The federal $1,000-at-birth account ('Trump Accounts') appears here only from keyword data and third-party Short descriptions; none of it is verified, and none is in the copy.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "titles_scored": "6 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "09b: 80 by listed cost (6 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 6 title scores and 1 re-score after the build, 5 credits each), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel Shorts list 5; Instagram owner insights and the balance cost 0); 265 for the three 09 sheets. The balance read 4,640 before the first 09 call and 4,375 "
                     "when the research ended: a 265 drop, so 15 were parallel sheets' calls. It read 4,130 after the build's re-scores: of that 245, 15 were the three 09 re-scores and 230 parallel sheets' calls. At the adversarial check: 10 by listed cost (1 title score, 1 keyword pull), plus a third of 5 shared (one lookup of the three related videos); the three 09 checks used 35 in all. The balance read 3,730 before them and 3,695 after, with no other spend in that window.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/09-growth-ladder.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through publishing/data/checks/09-growth-ladder.py; "
                "every rung recomputed in MATH_RELATIONS from $1,000 × 1.07 per birthday ($1,070 exact; ≈ $1,967 … ≈ $81,273), 81.27 ('over 81 times'), 72 ÷ 7 ≈ 10 and the first doubling at 11, "
                "the pinned at-25 figure (1.07^40 → ≈ $14,974) and its × 5.4 (1.07^25), the $500 / $5,000 scaling and 6.81% ≈ 6.8%; COPY_RULES keep every rung's figure beside its own age, "
                "every rounded figure 'about' or '≈', the after-inflation framing with its date and source, and no 'millionaire'")
VIDIQ_REQUERIED = ("pulled 2026-10-13: compound interest 137,873 / 50.6 (−17.3%); generational wealth 43,615; how to build generational wealth 24,160 (+35.1%); trump account 22,489 (+20.2%); "
                   "6 titles scored: pick 98, write-up title 90; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. Re-queried after the build: the pick's title score 98. Re-queried at the adversarial check: the pick's title score 98; 'generational wealth' 43,615 / 61.0 (−17.9%, baseline 53,133); the related video EqFQCJheCMU 162 views (161 at the build), live since Tue 6 Oct 22:27 ET. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/09-growth-ladder.py`: {MATH_RUN} on `studio/specs/`. Every public figure traces to the 09b maths table: V(a) = $1,000 × 1.07^a; "
    "age 1 $1,070; 10 ≈ $1,967; 18 ≈ $3,380; 25 ≈ $5,427; 30 ≈ $7,612; 40 ≈ $14,974; 50 ≈ $29,457; 65 ≈ $81,273 (81.27×, 'over 81'); 72 ÷ 7 = 10.3 ≈ 10; "
    "the gift at 25: ≈ $14,974 at 65, × 5.4 short of birth (1.07^25 = 5.43). The data file recomputes every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 6 titles scored against this channel: the pick 98 (tied with the 'Just' version), the write-up's title 90. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 98, as first scored.",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 98; 'generational wealth' 43,615 / 61.0 (−17.9%, baseline 53,133); the related video EqFQCJheCMU 162 views (161 at the build), live since Tue 6 Oct 22:27 ET. All match.",
    "- **Changed.**",
    "  - Section 2 said five channels posted 'the one-gift-at-birth ladder'; of the five, Krish Kara's is in pounds and Lloyd Ross's adds $100 a month. It now says so, and so does the research note.",
    "  - Section 4 called '10 years late' the weakest Reel of the month; by plays 'Speed limit (e)' is lower (177 vs 219). It now says what holds: the month's highest skip rate (65.1%) and lowest average watched (30.6%).",
    "  - The Instagram hashtag note said `#personalfinance` is used 'as on the other sheets of the batch'; 09a doesn't use it. It now names 07a and 09c.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 09b maths table and a fresh run of the 09 check (509 checks, 0 failures, exit 0), by hand and by the builder's FIGURES, MATH_RELATIONS and COPY_RULES.",
    "  - Platform limits, recounted from the JSON: title 85/100 with no hashtags (the description's first three show above it), description 1,171 characters (1,206 bytes) of 5,000, tags 393/500 as YouTube counts them, caption 990/2,200 with 5 hashtags and a result-free first 125, short alt text 98/100, no < or >.",
    "  - Policy: no brand in the video; the S&P 500 is named only for the rate's context, with 'Not affiliated with or endorsed by S&P Dow Jones Indices.' in the description and the caption; sources are named descriptively, as 06b and 06c name theirs; no share price; 'Not financial advice.' in both; no advice, urgency or promise wording (a copy rule). No 'millionaire' and no 'Trump Account' in the copy (a copy rule).",
    "  - `#generationalwealth` re-weighed as possible hype beyond the verdict: kept, because a gift at birth is money passed down a generation and the copy never claims more than ≈ $81,273; the millionaire framing its outliers use stays out.",
    "  - The cover JPG (read by eye) shows rungs 1 to 50 filled, the age-65 shelf empty and the figure buckled under the last coin: no answer. The render's sha256 equals `git show 471c793:renders/channel/09b-becker-rig-1000-times-1-07.mp4`.",
    "  - No timestamp outside the cover section and the video facts, and no pacing claim.",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/09-growth-ladder.py` (see the 09a sheet).",
    "- **Mutation test.** Five mutations of a scratch copy each fail by name: ≈ $7,612 moved to age 40, 'over 81 times' cut to '81 times', a 'millionaire' line, "
    "≈ $81,273 in the caption's first 125 characters, and the pinned ≈ $14,974 without its 'at 25'. At the adversarial check, 3 more on a scratch copy also fail by name: the short alt text without 'never topped up', the caption without 'rough today's dollars', and a 'your kid could be a millionaire' line. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - The cover is the heave (the empty age-65 rung over a half-built ladder), the write-up's second option, not frame 1 (eight empty rungs) and not the verdict (the answer).",
    "  - The title drops the header's 'POV:' (8 points lower in vidIQ) but keeps its gift and its question; the video still opens on the POV header.",
    "  - No 'millionaire', and no 'Trump Account', though both are where the attention is: the answer is ≈ $81,273, and the account is not in the write-up.",
    "  - ≈ $14,974 appears twice on purpose: the age-40 rung, and the same $1,000 put in at 25 (40 years of growth either way); the copy rules allow it only beside age 40 or with 'at 25'.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 09b maths table (teasers/v2/09-growth-ladder.md, section 09b) and
# recomputed below from its inputs ($1,000 at birth, × 1.07 per birthday); the S&P 500 figure and dates are inputs,
# quoted from the write-up's Sources.
FIGURES = {
    "$1,000", "$1,070", "$1,967", "$3,380", "$5,427", "$7,612", "$14,974", "$29,457", "$81,273", "1", "10", "18", "25", "30", "40", "50", "65",
    "1.07", "7", "72", "81", "5.4", "6.8", "1928", "2026", "$500", "$5,000", "5",
    "500",    # the index's name, "S&P 500"
    "1000",   # the tags' "1000 invested at birth" and friends, as typed in search
}
_V = lambda a: 1000 * 1.07 ** a
_AGES = {1: 1070, 10: 1967, 18: 3380, 25: 5427, 30: 7612, 40: 14974, 50: 29457, 65: 81273}
MATH_RELATIONS = [
    (all(round(_V(a)) == v for a, v in _AGES.items()) and round(_V(1), 2) == 1070.00, "every rung: $1,000 × 1.07^age, to the dollar ($1,070 exact)"),
    (81 <= _V(65) / 1000 < 82, "≈ $81,273 ÷ $1,000 = 81.27: 'over 81 times the gift'"),
    (round(72 / 7) == 10 and min(a for a in range(1, 66) if _V(a) >= 2000) == 11 and 1.9 < _V(10) / 1000 < 2, "roughly doubles every 10 years: 72 ÷ 7 = 10.3; the first age at $2,000+ is 11 (1.97× at 10)"),
    (round(1000 * 1.07 ** 40) == 14974 and round(_V(65) / (1000 * 1.07 ** 40), 1) == 5.4 and round(1.07 ** 25, 2) == 5.43, "pinned: the $1,000 at 25 is ≈ $14,974 at 65; birth vs 25 = 1.07^25 = 5.43 ≈ 5.4"),
    (all(round(500 * 1.07 ** a) * 2 - round(_V(a)) in (-1, 0, 1) and round(5000 * 1.07 ** a) == round(5 * _V(a)) for a in _AGES), "$500 halves every rung, $5,000 multiplies it by 5"),
    (round(6.81, 1) == 6.8, "the S&P 500 since 1928 after inflation: 6.81% ≈ 6.8%"),
]
MATH_KEY_LINES = ["age 65 ≈ $81,273", "age 10 ≈ $1,967", "age 40 ≈ $14,974", "claim: pinned: the same $1,000 put in at 25"]
RESULT_RE_TITLE = r"81|29,457|14,974|7,612|1,967|times|×|double"
RESULT_RE_CAPTION = r"81|29,4|14,97|7,61|5,42|3,38|1,96|1,070|times|×|doubles|6\.8"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right age.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_AGE = _re.compile(r"\b(?:[Aa]ge|[Aa]t) (\d+)\b")
_FIG = lambda f: _re.compile(_re.escape(f) + r"(?!\d|,\d|\.\d)")
_RUNG = {f"${v:,}": a for a, v in _AGES.items()}


def _own_age(fig, age, also=None):
    """every occurrence of fig has age as the nearest age before it (within 24 characters), or right after it (' at NN');
    with also, a line containing also is accepted too (the pinned at-25 figure)"""
    for ln in _lines():
        for m in _FIG(fig).finditer(ln):
            if also and also in ln:
                continue
            before = [int(x.group(1)) for x in _AGE.finditer(ln[max(0, m.start() - 24):m.start()])]
            after = _re.match(r" at (\d+)\b", ln[m.end():])
            if not ((before and before[-1] == age) or (after and int(after.group(1)) == age)):
                return False
    return True


def _before(fig, ok):
    """every occurrence of fig is preceded (within 10 characters) by a match of ok"""
    return all(_re.search(ok + r"$", v[max(0, m.start() - 10):m.start()]) for v in _COPY.values() for m in _FIG(fig).finditer(v))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (all(_own_age(f, a, "at 25" if a == 40 else None) for f, a in _RUNG.items()), "every rung's figure sits beside its own age (≈ $14,974 also with the pinned 'at 25')"),
    (all(_before(f, r"(?:≈|about) ") for f in _RUNG if f != "$1,070") and _before("$1,070", r"(?:= |, |: )"), "every rounded rung comes with '≈' or 'about'; the exact $1,070 without"),
    (all(_re.search(r"over 81 times", ln) for ln in _lines() if _re.search(r"\b81\b(?!,)", ln)), "81 only ever as 'over 81 times'"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("assumed 7%", "not a forecast", "after inflation since 1928", "6.8% a year", "rough today's dollars",
                                                                     "Not financial advice.", "Not affiliated with or endorsed by S&P Dow Jones Indices.")),
     "the description and the caption call 7% an assumption, give the after-inflation framing with its dates, and carry 'Not financial advice.' and the affiliation line"),
    (all(_re.search(r"(?i)never topped up|nobody touched|nothing added", _COPY[k]) for k in ("description", "caption", "short alt text", "long alt text")),
     "the description, the caption and both alt texts say the gift is never topped up"),
    (all("7%" in _COPY[k] for k in ("short alt text", "long alt text")), "the alt texts carry the 7%"),
    (not _re.search(r"(?i)millionaire|trump", _ALL), "no 'millionaire' and no 'Trump Account' in the copy"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"one", "doubles", "halves"},
     "no spelled-out figures beyond the write-up's 'one gift', 'roughly doubles' and '$500 halves them'"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bstart now\b|\bstart today\b|\bguarantee", _ALL), "no advice or promise wording"),
]
