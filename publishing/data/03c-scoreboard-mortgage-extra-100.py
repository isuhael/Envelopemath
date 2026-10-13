# 03c publishing data: just $100 extra a month on a 30-year mortgage (Scoreboard, what-difference).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06b-scoreboard-netflix-bill.py (the nearest
# Scoreboard sheet).
#
# Facts come only from teasers/v2/03-what-difference.md (section 03c) and python3 teasers/v2/checks/03-what-difference.py.
# Research: vidIQ, pulled 2026-10-13. The video is the condensed cut, promoted and shipped on 2026-10-13 (the
# pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp except the cover, which is picked by
# content, so the copy carried over unchanged; the ship rebuilt it with --covers from the shipped file.

TEASER = "03c Scoreboard, what-difference: \"How much difference does just $100 extra a month make on a 30-year mortgage?\""
PREPARED = "2026-10-13"
SHORT_ID = "03c"
MD_TITLE = "03c publishing sheet: just $100 extra a month on a 30-year mortgage"
MATH_RUN = "528 checks, 0 failed"      # python3 teasers/v2/checks/03-what-difference.py on studio/specs/, 2026-10-13 at the adversarial check (it prints "0 failures"; 525 at the first build, before the check became cut-aware)
MATH_RUN_SHIP = "565 checks, 0 failed"  # python3 teasers/v2/checks/03-what-difference.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13 (it prints "0 failures")
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render
RENDER_SHA_PRE = "06a5286a7a8fd4587f9714873f5f25482433c0fc4d9b9f932893f58d0cbff0a0"

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 32.3 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/03-what-difference.md` (03c) and its check, "
    f"`python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). The builder runs it through "
    "`publishing/data/checks/03-what-difference.py`, which passes its output through and adds the summary line in the builder's form "
    "(the check prints '0 failures', the builder reads '0 failed'). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, re-runs the amortisation "
    "payment by payment, keeps every rounded figure 'about' or '≈', and keeps each saving beside the extra payment that earns it.",
    "- **Honesty rules kept.** The title asks and never gives the result; the Instagram caption keeps every result below 'more'. "
    "The cover is the verdict hold, as the write-up's Instagram note asks (as on 06c). Every claim stays inside the video's own verdict, "
    "\"+$100 a month: each $1 saves ≈ $2.46\", and the copy says its conditions: a fixed 7.3% rate, every extra dollar applied to principal, "
    "principal and interest only. No advice (the 'pay it down or invest it' argument is left alone, as the write-up asks), no urgency, and 'Not financial advice.' is in both.",
    "- **Sources and brand.** 7.3% is the write-up's rounding of Freddie Mac's 30-year average for the week of Oct 1, 2026 (7.28%). Freddie Mac is named only as that source, "
    "and both platforms' copy says 'Not affiliated with or endorsed by Freddie Mac.' The write-up's second rate source (MBA, 7.30%) stays out of the copy because the "
    "write-up could not confirm which page holds it (its open item 2). The $400,000 loan is a round example; its NAR anchor stays in the write-up.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 32.3, "sha256": "06a5286a7a8fd4587f9714873f5f25482433c0fc4d9b9f932893f58d0cbff0a0",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/03-what-difference.md section 03c; teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$400,000, 30-year fixed at 7.3% (≈ Freddie Mac PMMS 7.28%, week of Oct 1, 2026); principal and interest only (no taxes, insurance or PMI)",
    "model": "monthly amortisation at 7.3%/12, interest rounded to the cent; the payment rounded up to the cent so 360 payments clear the loan; every extra dollar goes to principal the month it is paid",
    "baseline": "$2,742.29 a month × 360; interest $587,216.16 ≈ $587,200, more than the loan (footer working $2,742.29 × 360 − $400,000 = $587,224.40 ≈ $587,200)",
    "plus_100": "$2,842.29 a month; 320 payments ≈ 26.7 years (26.67); interest $508,590.78 ≈ $508,600; 360 − 320 = 40 months sooner; $78,625.38 ≈ $78,600 less (shown 587,200 − 508,600 = 78,600)",
    "plus_500": "$3,242.29 a month; 229 payments ≈ 19.1 years (19.08); interest $342,178.64 ≈ $342,200; (360 − 229) ÷ 12 = 10.92 ≈ 11 years sooner; $245,037.52 ≈ $245,000 less",
    "per_dollar": "the full $100 goes in for 319 months ($100 × 319 = $31,900; the 320th payment is the smaller remainder); ≈ $78,600 ÷ $31,900 = 2.464 ≈ $2.46 (exact $78,625.38 ÷ $31,900 = 2.4647)",
    "verdict": "+$100 a month: each $1 saves ≈ $2.46 (the hero holds '≈ $78,600 LESS')",
    "sensitivity": "write-up only, not in the copy: at Freddie Mac's exact 7.28%, +$100 is still 320 months (40 sooner) and saves ≈ $78,200",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What Happens If You Pay Just $100 Extra a Month on a 30-Year Mortgage?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. The top score of the 8 scored. 'Just $100 Extra a Month' (the hook's R5 cue) sits at characters 25-47, and '30-Year Mortgage', the header's own words, ends it. "
             "No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "What Happens If You Pay Just $100 Extra a Month on Your Mortgage? #mortgage #homeloan #debtfree", "vidiq_score": 97,
     "note": "The house 3-hashtag form, 1 point lower. The channel's live Shorts carry title hashtags, so this is the option if the owner keeps that habit (95 characters)."},
    {"rank": 3, "title": "How Much Difference Does Just $100 Extra a Month Make on a Mortgage?", "vidiq_score": 94,
     "note": "The write-up's title, the H50 grammar word for word. 4 points lower than the pick."},
]
YT_TITLES_ALSO_SCORED = [
    ("What Happens If You Pay Just $100 Extra a Month on Your Mortgage?", 97, "the pick with 'Your Mortgage'"),
    ("How Much Does Just $100 Extra a Month Save on a $400,000 Mortgage?", 95, "'save' presumes the direction of the answer"),
    ("How Much Difference Does Just $100 Extra a Month Make on a 30-Year Mortgage?", 94, "the on-screen header"),
    ("Just $100 Extra a Month on a 30-Year Mortgage: How Much Difference Does It Make?", 94, ""),
    ("Can Just $100 Extra a Month Pay Off Your Mortgage Early?", 85, "a yes/no question scores lowest"),
]
TITLE_BULLETS = [
    "'What happens if you pay … extra … on your mortgage' is the grammar of the two biggest question-titled same-idea Shorts in the research (Tim Hart, 25,292 views; Ace Alfalla's '… an extra $100 every month?', 17,855). "
    "The pick keeps the write-up's 'just' (the R5 word that says $100 is too small to matter) and the header's '30-Year Mortgage'.",
    "It raises the write-up's title from 94 to 98. It names no result: the 40 months, the ≈ $78,600 and the ≈ $2.46 are all the video's.",
    "Several same-idea titles give the answer away ('Cuts 3 YEARS Off', 'Skip 39 Payments', 'Saves $61,698'); this one asks it. "
    "vidIQ's model ranks titles but does not predict views.",
]

YT_DESCRIPTION = """What happens if you pay just $100 extra a month on a 30-year mortgage? On $400,000 at 7.3%, about $78,600 less interest and 40 months sooner: each extra $1 saves about $2.46. $500 extra a month: about 11 years sooner and about $245,000 less.

The math, shown:
• The payment: $2,742.29 a month for 360 months. The interest alone is about $587,200, more than the loan ($2,742.29 × 360 − $400,000).
• +$100: $2,742.29 + $100 = $2,842.29 a month. 320 payments (about 26.7 years): 40 months sooner. Interest about $508,600: about $78,600 less.
• +$500: $2,742.29 + $500 = $3,242.29 a month. 229 payments (about 19.1 years): about 11 years sooner. Interest about $342,200: about $245,000 less.
• The full $100 goes in for 319 months: $100 × 319 = $31,900. About $78,600 ÷ $31,900 ≈ $2.46 of interest saved per extra $1.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 7.3% ≈ the Freddie Mac 30-year fixed average for the week of Oct 1, 2026 (7.28%). Assumes a fixed rate and that every extra dollar is applied to principal the month it is paid; principal and interest only (taxes, insurance and PMI not included). Not financial advice. Not affiliated with or endorsed by Freddie Mac.
#mortgage #homeloan #debtfree"""
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet. "
             "The 'Doesn't Add Up' series line is left out, as on 06b and 06c. MBA's 7.30% stays out (the write-up's open item 2).")

YT_HASHTAGS = ["#mortgage", "#homeloan", "#debtfree"]
YT_HASHTAG_NOTES = [
    ("#mortgage", "the topic ('mortgage' 158,339 searches a month, up 43.0% on its 30-day baseline)."),
    ("#homeloan", "the write-up's second tag; the mortgage Shorts in the research carry it (#HomeLoan, #homeloans)."),
    ("#debtfree", "the outcome the video measures ('debt free' 27,923 a month, flat), and the write-up's third tag."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["extra mortgage payment", "extra $100 a month mortgage", "how to pay off your mortgage early", "pay off mortgage early",
           "30 year mortgage", "mortgage payoff", "mortgage interest", "extra principal payment", "biweekly mortgage payments",
           "mortgage tips", "mortgage", "home loan", "debt free", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'how to pay off your mortgage early' (13,722 a month, up 306.3%) is the fastest-rising phrase in the cluster. "
             "Left out on purpose: 'paying off the mortgage early vs. investing the extra payment' (3,462) and 'when paying off your mortgage is the wrong move' (5,674) are the advice argument "
             "the write-up leaves alone; 'why did my mortgage payment go up' (46,825, up 626.3%) is about escrow, not this video.")

YT_PINNED = """Does your servicer apply extra payments to principal? Extra payments only shorten the loan if it does; some apply them to next month's payment instead. Drop your balance, rate and extra amount and we'll put your row on the board.

The working: interest $587,216.16 with no extra, $508,590.78 with +$100 (320 payments) and $342,178.64 with +$500 (229 payments). $78,625.38 ÷ $31,900 ≈ $2.46 per extra $1. Fixed 7.3%, principal and interest only."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview; it is the write-up's pinned comment turned into a question, and it asks for the viewer's own numbers (R3), "
               "the comment-reply sequel engine ('now do $50', 'now do 6%'). The second paragraph is the exact working, for the commenters who check the rounding. "
               "It does not take a side on 'invest the $100 instead', the comment fight the write-up expects and leaves alone.")

RELATED_VIDEO = {
    "pick": {"id": "hW38hkzo_vY", "title": "Your $400,000 house costs you $958,000",
             "url": "https://www.youtube.com/shorts/hW38hkzo_vY",
             "why": "The channel's own Short on the same $400,000, 30-year loan with a different lever (one extra payment a year). It was made in June at that month's rate, "
                    "so its totals differ from this Short's 7.3%; both name their inputs. Same viewer, next question."},
    "swap_when_live": "03a (car loan: weekly vs biweekly) or 03b (card minimum), the same what-difference series, once published. Then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the verdict-hold frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the verdict-hold frame ('≈ $78,600 LESS' over the board and the verdict), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First free Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 03a and 03b. Suggested order within the series: 03c first (the strongest title score and rising mortgage demand), then 03a, then 03b.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'mortgage' runs +43.0% and 'how to pay off your mortgage early' +306.3% over their 30-day baselines, while 'pay off mortgage early' is down 62.9%.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What happens if you pay just $100 extra a month on a 30-year mortgage? Worked out on a $400,000 loan at 7.3%, "
           "principal and interest only.")

IG_CAPTION = IG_HOOK + """

Yes, just $100 a month really makes a difference.

The math, shown:
• The payment: $2,742.29 a month. Over 360 months the interest alone is about $587,200, more than the loan.
• +$100 a month ($2,842.29): 40 months sooner and about $78,600 less interest.
• +$500 a month ($3,242.29): about 11 years sooner and about $245,000 less.
• The $100 goes in for 319 months ($31,900), so each extra $1 saves about $2.46 of interest.

7.3% ≈ the Freddie Mac average for the week of Oct 1, 2026 (7.28%). Assumes a fixed rate and that every extra dollar is applied to principal; taxes, insurance and PMI not included. Not financial advice. Not affiliated with or endorsed by Freddie Mac.

Does your servicer apply extra payments to principal?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#mortgage #homeloan #debtfree #mortgagetips #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the question, the '$100 extra' and '30-year mortgage' keywords and the inputs ($400,000 at 7.3%), no result: "
                   "the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question plus the inputs, with no result. The write-up's caption line 1 is the verdict ('Yes, just $100 a month really makes a difference!'); "
    "the house rule moves it below 'more', because the caption overlays the Reel from frame 1, and drops its exclamation mark. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The conditions (a fixed rate, extra applied to principal, principal and interest only) sit right under the math, so the 40 months is never quoted without them.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#mortgage", "#homeloan", "#debtfree", "#mortgagetips", "#personalfinance"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#mortgage #homeloan #debtfree`; its `#mathtok` is a TikTok tag):",
    "",
    "- `#mortgage` and `#homeloan` name the debt; `#debtfree` names the outcome.",
    "- `#mortgagetips` is the tag of the faceless text-on-screen mortgage Reels that lead the outlier search ('mortgage tips' 6,769 searches a month on YouTube).",
    "",
    "`#personalfinance` is the broad layer, as on 06b and 06c.",
]

IG_ALT_SHORT = "Chart: just $100 extra a month on a $400,000 mortgage at 7.3% saves about $78,600 of interest."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it keeps the rate and the loan size with the saving.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a dark scoreboard. The header asks: how much difference does just $100 extra a month make on a 30-year mortgage? "
               "A red counter shows about $587,200 of interest on $400,000 at 7.3% over 30 years, more than the loan, at $2,742.29 a month. "
               "Adding $100 a month, the bar lands at about 26.7 years: 40 months sooner and about $78,600 less interest. "
               "Adding $500 a month, it lands at about 19.1 years: about 11 years sooner and about $245,000 less. "
               "Verdict: +$100 a month, each $1 saves about $2.46.")

IG_FIRST_COMMENT = ("+$100 a month on $400,000 at 7.3%: 40 months sooner and about $78,600 less interest, about $2.46 per extra $1. "
                    "Does your servicer apply extra payments to principal?")

# ---------------------------------------------------------------- the cover frame
# The verdict hold, picked by content: the write-up's Instagram note names "the verdict frame (hero '≈ $78,600 LESS',
# verdict '+$100 a month: each $1 saves ≈ $2.46') over the three lanes". On the shipped condensed cut the last caption
# stays under the verdict until the last body frames, so the cover is the settled verdict hold with that caption on it:
# from 12.47 s (frame 374) the frame-to-frame mean luma change stays ≤ 0.026 until the caption clears at 12.80 s, just
# before the end card at 12.85 s.
COVER_T = 12.6
COVER_FRAME = 378
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The verdict hold: the hero 'INTEREST ≈ $78,600 LESS', the footer '≈ $78,600 ÷ ($100 × 319) ≈ $2.46', the board "
                          "(JUST THE PAYMENT ≈ $587,200 over its red 30-year bar; +$100 A MONTH lit, ≈ $508,600 and ≈ 26.7 YEARS; +$500 A MONTH ≈ $342,200 and ≈ 19.1 YEARS) "
                          "and the verdict '+$100 A MONTH: EACH $1 SAVES ≈ $2.46', with the question still in the header. The write-up names this frame as the Instagram cover. "
                          "On the condensed cut the last caption ('Each dollar of that $100 saves about $2.46.', the verdict's own words) stays under the verdict until the last body frames, so use a settled frame of the verdict hold, with the caption on it, before the end card.")
COVER_FRAME_MEASURED = ("On the shipped 15.367 s condensed cut the verdict hold settles by 12.47 s (frame 374), and from then the picture is near-still (frame-to-frame mean "
                        "luma change ≤ 0.026) with the last caption ('Each dollar of that $100 saves about $2.46.') under the verdict; the caption clears at 12.80 s, two "
                        "frames before the end card. Frame 378 (12.60 s) is used. On the 32.3 s pre-condense render it was frame 834 (27.80 s), after the caption cleared.")
COVER_CROP_NOTE = ("3:4 = 1080×1440, the top 1440 rows (y 0 to 1440) of the 1080×1920 frame: the badge, the question, the hero, the footer, the board and the verdict, "
                   "with even margins (141 px above the badge, 145 px below the verdict); it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the question.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the question.")
COVER_EXTRA_BULLETS = [
    "**Not used:** frame 1 (the question over the red ≈ $587,200 counter, with the +$100 and +$500 lanes still showing '?'). It carries no answer, "
    "but the write-up names the verdict frame as the cover, and the faceless mortgage Reels that lead the outlier search show their numbers on the cover too.",
    "**Shipped cut (2026-10-13):** the verdict hold was re-picked by content on the shipped file (a settled frame, 12.6 s; the last caption now stays under the verdict) and both JPGs re-exported from it. It shows the same hero, board and verdict as the pre-condense cover, plus that caption.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut replaced the pre-condense render in renders/channel on 2026-10-13; get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 03c-32.3s.mp4` (sha256 {RENDER_SHA_PRE[:8]}…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Just $100 extra a month — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, on a different evening from 03a and 03b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("how to pay off your mortgage early", 13722, 61.8, 35.2, 63.0, "+306.3% vs its 30-day baseline (3,377): the fastest-rising phrase here", "2026-10-12"),
    ("pay off mortgage early", 7158, 57.5, 23.9, 65.0, "-62.9% vs its baseline (19,269)", "2026-10-12"),
    ("mortgage tips", 6769, 57.2, 29.9, 62.3, "-74.3% vs its baseline (26,313)", "2026-10-12"),
    ("how i plan to pay off my 30 year mortgage faster", 5410, 55.7, 23.0, 64.2, "", "2026-07-26"),
    ("what one extra payment a year does to a 30-year mortgage", 5033, 55.3, 22.4, 64.2, "the neighbouring lever (the channel's June Short)", "2026-09-04"),
    ("how to pay 30 year mortgage in 10 years", 4829, 55.0, 37.0, 58.2, "", "2026-10-12"),
    ("biweekly mortgage payments", 4353, 54.3, 27.3, 61.7, "", "2026-06-10"),
    ("extra mortgage payment", 4274, 54.2, 13.6, 67.1, "seed; competition 13.6, the lowest here", "2026-09-01"),
    ("paying off the mortgage early vs. investing the extra payment", 3462, 52.8, 44.5, 53.9, "the comment fight to expect; the copy stays out of it (no advice)", "2026-10-12"),
    ("mortgage (topic)", 158339, 77.6, 70.0, 58.6, "+43.0% vs its 30-day baseline (110,700)", "2026-10-12"),
    ("why did my mortgage payment go up", 46825, 69.7, 23.2, 72.6, "+626.3% vs its baseline (6,447); escrow and insurance, not this video", "2026-10-12"),
    ("extra $100 a month on mortgage", 0, 0, None, None, "<750/month; no competition score", None),
]
KEYWORD_MD_NOTE = {"paying off the mortgage early vs. investing the extra payment": "the comment fight to expect; the copy stays out of it",
                   "why did my mortgage payment go up": "+626.3%; escrow and insurance, not this video"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; four rows are older snapshots (2026-06-10 to 2026-09-04).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Four rows are older snapshots.")
KW_OUTRO = ("The exact phrase ('extra $100 a month on mortgage') is under 750 a month, but the questions around it are not: 'how to pay off your mortgage early' (13,722, up 306.3%) "
            "and 'extra mortgage payment' (4,274, competition 13.6) are in the tags, and 'mortgage' itself is up 43.0%. "
            "The 'pay it down or invest' phrases (3,462-5,674) are the argument the write-up leaves alone, so they stay out of the copy.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Banks Hate This Mortgage Trick (Saves $100,000)", "Meres Mortgage", 11300, 42340, "2025-10-21", "34 s; three levers, the result in the title"),
    ("What Happens If You Pay Extra On Your Mortgage Every Month?", "Tim Hart Loan Officer", 1870, 25292, "2025-07-24", "1:46; the pick's grammar"),
    ("What happens to your mortgage when you pay an extra $100 every month?", "Ace Alfalla", 2610, 17855, "2021-11-11", "28 s; the closest twin to the pick"),
    ("Unlock Huge Mortgage Savings with Just $100! | Melissa Kerick", "Melissa Kerick - Sr. Loan Advisor", 275, 2263, "2024-04-23"),
    ("The \"Secret Mortgage Trick\" to pay off your mortgage faster is a LIE 💡", "Sophie Matthews", 24, 1233, "2026-09-12", "$300,000 at 6.5%, +$100"),
    ("Why Does $100 Extra a Month Save So Much on a Mortgage?", "AutoPayPlus", 41, 1058, "2026-06-05"),
    ("The $100 Trick That Cuts 3 YEARS Off Your Mortgage", "Larry Mastropieri", 167, 833, "2025-12-05", "$400,000 at 6.5%"),
    ("Pay Off Your Mortgage Faster With Just $100 Extra Per Month", "MoneyInNumbers", 1, 173, "2026-09-19", "$400,000 at 6.8%"),
    ("$100 Extra a Month Saves $61,698 in Interest #personalfinance #money #mortgage #homeowner", "The Total Cost", 5, 24, "2026-10-06"),
    ("Pay $100 Extra on Your Mortgage, Skip 39 Payments", "Receipt Math", 9320, 16, "2026-09-30",
     "the closest twin in inputs: $400,000 at Freddie Mac's 7.03% (Sep 24), 39 payments sooner; its title gives the answer"),
]
SAME_IDEA_HEADING = "**2. The same idea on YouTube is crowded and small (vidIQ YouTube search, under 4 min, by views and by relevance since Oct 2025).**"
SAME_IDEA_MD = [
    "'Extra $100 a month on a mortgage' is a staple: ten Shorts in the table, five posted since June 2026, and three of the ten on a $400,000 loan. "
    "The biggest is Meres Mortgage's 'Banks Hate This Mortgage Trick (Saves $100,000)' (42,340); the question-titled ones are older (Tim Hart 25,292, Ace Alfalla 17,855 in 2021). "
    "Half the titles since December 2025 give the answer ('Cuts 3 YEARS', 'Skip 39 Payments', 'Saves $61,698'), and all of those sit under 1,300 views.",
    "",
    "None of the titles or descriptions read turns the saving into a per-dollar rate (this Short's ≈ $2.46 per extra $1) or sets a $500 option beside the $100 one. "
    "So the pick asks the familiar question and keeps both payoffs for the video. Receipt Math's 30 Sep Short ($400,000 at 7.03%, 39 payments sooner) agrees with this one's 40 at 7.3%.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views, and by relevance since Oct 2025): the biggest same-idea Short is Meres Mortgage's (42,340); the question-titled ones are older "
                  "(Tim Hart 25,292; Ace Alfalla 17,855, 2021). Half the titles since December 2025 put the answer in the title, all under 1,300 views. None of the titles or descriptions read gives a per-dollar rate.")

OUTLIERS = [
    {"handle": "@kirstenodonnell_mortgages_", "platform": "Instagram", "id": "DeJ2GS9FUfG",
     "on_screen": "YOUR BANK HOPES YOU NEVER LEARN THIS",
     "views": "2.4M (856.2x the account median of 2.8K)",
     "note": "faceless text on screen over a static video, music only: extra principal payments on a 30-year mortgage"},
    {"handle": "@bri_thetxmlo", "platform": "Instagram", "id": "DcrQaT-tVyQ",
     "on_screen": "Your bank hopes you never learn this",
     "views": "922.5K (4231.8x the account median of 218)", "note": "the same faceless template; caption opens 'A 30-year mortgage doesn't have to be 30 years...'"},
    {"handle": "@tommysellsit", "platform": "Instagram", "id": "Dcejdgdjaj9",
     "on_screen": "Mortgage Tips. Most people think a 30-year mortgage means you're locked in for 30 years.",
     "views": "1.2M (139.4x the account median of 8.7K)", "note": "faceless text over a house exterior"},
    {"handle": "@moneymovesjake", "platform": "TikTok", "id": "7662537428804128030",
     "on_screen": "Your Bank Doesn't Want YOU To Know THIS!", "views": "909.9K (2171.6x)", "note": "7 s, text over b-roll"},
    {"handle": "@buynotrentguy", "platform": "TikTok", "id": "7661690063822081294",
     "on_screen": "Paying your mortgage off faster", "views": "932.9K (377.6x)", "note": "talking head; a round-down lever"},
]
OUTLIERS_HEADING = "**3. Faceless mortgage-payoff Reels are the biggest outliers on Instagram (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@kirstenodonnell_mortgages_** (Instagram), \"YOUR BANK HOPES YOU NEVER LEARN THIS\": 2.4M (856.2x). Faceless text over a static video, music only.",
    "- **@bri_thetxmlo** (Instagram), \"Your bank hopes you never learn this\": 922.5K (4231.8x). The same template.",
    "- **@tommysellsit** (Instagram), \"Mortgage Tips. Most people think a 30-year mortgage means you're locked in for 30 years.\": 1.2M (139.4x).",
    "- **@moneymovesjake** (TikTok), \"Your Bank Doesn't Want YOU To Know THIS!\": 909.9K (2171.6x); **@buynotrentguy** (TikTok), \"Paying your mortgage off faster\": 932.9K (377.6x).",
    "- Faceless and music-only, like this Short, is the format that travels. Their shared hook ('your bank hopes you never learn this') is a claim this channel does not make (no hype): "
    "the header here is the question, and the numbers do the work. That is also why `#mortgagetips` is in the Instagram tags.",
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
    "The channel has covered this loan before: 'Your $400,000 house costs you $958,000' (`hW38hkzo_vY`, June 2026, 364 views) used one extra payment a year at June's rate. "
    "It is this Short's related video. 06b (Mon 12 Oct, 12:14 ET) and 06c (Mon 12 Oct, 03:45 ET) are too young to compare.",
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
    "The write-up's sources rest on search-result text: its egress proxy blocked the primary pages. Before posting, open Freddie Mac's PMMS for Oct 1, 2026 and confirm 7.28% (the write-up's open item 1).",
    "The video, the cover and the video facts are the shipped condensed cut (2026-10-13); the copy is cut-independent and carried over from the pre-condense cut unchanged.",
]
RESEARCH_EXTRA = {
    "own_channel_same_topic": [
        {"id": "hW38hkzo_vY", "title": "Your $400,000 house costs you $958,000", "published": "2026-06-04", "views": 364,
         "note": "the same $400,000, 30-year loan; one extra payment a year at June's rate ('6 years sooner'); this Short's related video"},
    ],
    "titles_scored": "8 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "85 credits for this teaser (6 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 8 title scores; 5 each), plus 15 shared across 03a-03c for the channel's own stats and its older Shorts, and 10 for the re-query (1 title score, 1 keyword). The adversarial check used 35 more across 03a-03c (balance 4,030 → 3,995): 3 title scores, 6 keyword re-queries and 1 lookup of 5 of the channel's own videos.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/03-what-difference.py: {MATH_RUN} on studio/specs/ (2026-10-13, the pre-condense specs), run by the builder through "
                "publishing/data/checks/03-what-difference.py; the 03c amortisation re-run payment by payment in MATH_RELATIONS (payment, 360/320/229 payments, every interest total, "
                "the $31,900 put in); COPY_RULES keep every rounded figure 'about' or '≈', each saving beside its extra payment and the principal condition in the copy; "
                "re-run at the adversarial check with the same result"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: how to pay off your mortgage early 13,722 / 35.2 (+306.3%); extra mortgage payment 4,274 / 13.6; mortgage 158,339 (+43.0%); "
                   "title scores 98 (pick), 94 (write-up title), 97 (best hashtag form); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried the same day after the build: the pick's title score 98 and 'extra mortgage payment' 4,274 / 13.6. "
                   "Re-queried at the adversarial check: the pick's title score 98; 'extra mortgage payment' 4,274 / 13.6; 'how to pay off your mortgage early' 13,722 / 35.2 (+306.3%); "
                   "the related video hW38hkzo_vY 364 views ($958,036 over 30 years, one extra payment a year: 6 years sooner, in its description). All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/03-what-difference.py`: {MATH_RUN}. Every public figure traces to the 03c maths table: $2,742.29 × 360, interest $587,216.16 ≈ $587,200 (more than the loan); "
    "+$100: $2,842.29, 320 payments ≈ 26.7 years, 40 months sooner, ≈ $78,600 less; +$500: $3,242.29, 229 payments ≈ 19.1 years, ≈ 11 years sooner, ≈ $245,000 less; "
    "$100 × 319 = $31,900; ≈ $78,600 ÷ $31,900 ≈ $2.46. The data file re-runs the amortisation and gets every one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 8 titles scored against this channel: the pick 98, the write-up's title 94. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried** after the build: the pick's title score 98; 'extra mortgage payment' 4,274 / 13.6 (snapshot 2026-09-01). "
    "Again at the adversarial check: the pick 98; 'extra mortgage payment' 4,274 / 13.6; 'how to pay off your mortgage early' 13,722 / 35.2 (+306.3%); hW38hkzo_vY 364 views. All match.",
    "- **Mutation test.** Six breaks on scratch copies of this file: '$78,600' without its 'about', the $500 results moved off their '$500', the Freddie Mac line dropped from the caption, "
    "'$2.46' without its per-$1 unit, a result in the caption's first 125 characters, and the principal assumption dropped from the caption. "
    "The last one first passed (the caption's closing question still says 'principal'), so the rule now requires the stated assumption ('Assumes … applied to principal'); all six now fail by name.",
    "- **Kept on purpose.**",
    "  - The cover and the YouTube frame show the verdict, as the write-up's Instagram note asks (as on 06c). The no-result rule covers the title and the caption's first 125 characters.",
    "  - The write-up's caption line 1 ('Yes, just $100 a month really makes a difference!') sits below the fold, without its exclamation mark.",
    "  - The pinned comment takes no side on 'invest the $100 instead'; the write-up leaves that argument to a later P4 duel.",
    "  - MBA's 7.30% stays out of the copy (unconfirmed page); NAR's $429,100 stays in the write-up.",
    "- **Adversarial pass (2026-10-13): changed** (notes only; the copy passed).",
    "  - The pick's note said 'Just $100 extra a month' is 'in the first 37 characters'; it sits at characters 25-47.",
    "  - A title bullet called Tim Hart's and Ace Alfalla's 'the two biggest same-idea Shorts'; Meres Mortgage's (42,340) is bigger. They are the two biggest question-titled ones.",
    "  - The keyword note said 'how to pay off your mortgage early' and 'extra mortgage payment' are in the description; neither phrase is. They are in the tags.",
    "  - The maths count is now 528 checks, 0 failed: the 03 check became cut-aware during the parallel condense (525 at the first build).",
    "- **Adversarial pass: checked, no change.** Every figure in the copy against the write-up's 03c table and the check's output (the amortisation re-run payment by payment); limits on both platforms; "
    "Freddie Mac named only as the rate source, with its affiliation line in both; MBA and NAR kept out; no advice, and the pinned comment takes no side on investing the $100; "
    "the exact 40 months never gets an 'about'. The cover (27.8 s) read as a still: the verdict hold, the question and the $2.46 kicker, all on the 3:4 crop. "
    "Kept on purpose: the tag 'biweekly mortgage payments' (the neighbouring extra-principal lever, low weight).",
    "- **Still to do.** The primary-source check above.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). The verdict hold was re-picked by content at 12.6 s (frame 378), with the last caption under the verdict. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 03c maths table (teasers/v2/03-what-difference.md, section 03c) and
# recomputed below; $400,000, 7.3% (7.28%), 30 years and the extra amounts are the write-up's inputs.
FIGURES = {
    "$100", "$500", "$1", "30", "$400,000", "7.3", "7.28", "2026", "1",
    "$2,742.29", "$2,842.29", "$3,242.29", "360", "320", "229", "319", "$31,900",
    "$587,200", "$508,600", "$342,200", "$78,600", "$245,000", "40", "11", "26.7", "19.1", "$2.46", "2.46",
    "$587,216.16", "$508,590.78", "$342,178.64", "$78,625.38",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP, ROUND_CEILING as _CEIL
_c = lambda x: x.quantize(_D("0.01"), _UP)
_r = _D("0.073") / 12
_pmt = (_D(400000) * _r / (1 - (1 + _r) ** -360)).quantize(_D("0.01"), _CEIL)


def _mortgage(extra):
    """monthly amortisation at 7.3%/12, interest rounded to the cent, extra to principal -> (payments, interest, extra put in)"""
    bal, n, tot, put = _D(400000), 0, _D(0), _D(0)
    while bal > 0:
        i = _c(bal * _r); tot += i; bal += i; n += 1
        pay = min(_pmt + extra, bal); put += max(_D(0), pay - _pmt); bal -= pay
    return n, tot, put


_m0, _m1, _m5 = _mortgage(_D(0)), _mortgage(_D(100)), _mortgage(_D(500))
_round = lambda x, step: int((_D(x) / step).quantize(_D(1), _UP) * step)
MATH_RELATIONS = [
    (_pmt == _D("2742.29"), "$400,000 at 7.3% for 30 years: $2,742.29 a month (rounded up)"),
    (_pmt + 100 == _D("2842.29") and _pmt + 500 == _D("3242.29"), "$2,742.29 + $100 = $2,842.29; + $500 = $3,242.29"),
    (_m0[:2] == (360, _D("587216.16")) and _round(_m0[1], 100) == 587200 and _m0[1] > 400000, "no extra: 360 payments, $587,216.16 ≈ $587,200, more than the loan"),
    (_round(_pmt * 360 - 400000, 100) == 587200, "footer working $2,742.29 × 360 − $400,000 ≈ $587,200"),
    (_m1[:2] == (320, _D("508590.78")) and _round(_m1[1], 100) == 508600, "+$100: 320 payments, $508,590.78 ≈ $508,600"),
    (round(320 / 12, 1) == 26.7 and 360 - 320 == 40, "+$100: 26.7 years, 40 months sooner"),
    (_m0[1] - _m1[1] == _D("78625.38") and _round(_m0[1] - _m1[1], 100) == 78600 == 587200 - 508600, "+$100 saves $78,625.38 ≈ $78,600 (= shown 587,200 − 508,600)"),
    (_m5[:2] == (229, _D("342178.64")) and _round(_m5[1], 100) == 342200, "+$500: 229 payments, $342,178.64 ≈ $342,200"),
    (round(229 / 12, 1) == 19.1 and round((360 - 229) / 12) == 11, "+$500: 19.1 years, about 11 years sooner"),
    (_round(_m0[1] - _m5[1], 1000) == 245000, "+$500 saves $245,037.52 ≈ $245,000"),
    (_m1[2] == _D("31900.00") and 100 * 319 == 31900, "the full $100 goes in for 319 months: $31,900"),
    (round(78600 / 31900, 2) == 2.46 and round(float(_m0[1] - _m1[1]) / 31900, 2) == 2.46, "≈ $78,600 ÷ $31,900 ≈ $2.46 (exact 2.4647)"),
]
MATH_SCRIPT = "publishing/data/checks/03-what-difference.py"
MATH_KEY_LINES = ["03c mortgage: payment $2,742.29", "+$0    n= 360  years= 30.00  interest=  $587,216.16",
                  "+$100  n= 320  years= 26.67  interest=  $508,590.78  saves $78,625.38  extra in $31,900.00",
                  "+$500  n= 229  years= 19.08  interest=  $342,178.64  saves $245,037.52"]
RESULT_RE_TITLE = r"78,6|40 months|sooner|2\.46|26\.7|245|11 years|19\.1|587|508|342|less|save"
RESULT_RE_CAPTION = r"78,6|40 mo|sooner|2\.46|26\.7|245|11 y|19\.1|587|508|342|less|makes a diff|31,9|\$2,8|\$3,2|320|229"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
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
    (all(_approx(p) for p in (r"\$587,200", r"\$508,600", r"\$342,200", r"\$78,600", r"\$245,000", r"26\.7", r"19\.1", r"\b11 years", r"\$2\.46"))
     and not _re.search(r"≈ 40|about 40", "\n".join(_COPY.values())),
     "every rounded figure is 'about' or '≈' ($587,200, $508,600, $342,200, $78,600, $245,000, 26.7, 19.1, 11 years, $2.46); the exact 40 months is not"),
    (_with(r"\b40 months|\$78,6|\$508,6|26\.7", (r"\$100\b",)), "40 months, $78,600, $508,600 and 26.7 years sit beside the $100 that earns them"),
    (_with(r"\$245,0|\b11 years|\$342,2|19\.1", (r"\$500\b",)), "$245,000, 11 years, $342,200 and 19.1 years sit beside the $500 that earns them"),
    (_with(r"\$2\.46|2\.46 per", (r"\$1(?![\d,])",)), "$2.46 always comes with its per-$1 unit"),
    (all(_re.search(r"Assumes[^.]*applied to principal", _COPY[k]) for k in ("description", "caption"))
     and all("principal" in _COPY[k] for k in ("pinned comment", "first comment")),
     "the principal condition is stated as an assumption in the description and the caption, and asked about in both comments"),
    (all("fixed" in _COPY[k].lower() for k in ("description", "pinned comment", "caption")), "the fixed-rate condition is in the description, the pinned comment and the caption"),
    (all("Not affiliated with or endorsed by Freddie Mac." in v for v in _COPY.values() if "Freddie Mac" in v) and "Freddie Mac" in YT_DESCRIPTION + IG_CAPTION,
     "wherever Freddie Mac is named, the copy says it is not affiliated with or endorsed by Freddie Mac"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    (not _NUMBER_WORDS.findall("\n".join(_COPY.values())), "no spelled-out figures (the figure check can't see them)"),
]
