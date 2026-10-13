# 04c publishing data: $10,000 in the USA vs Europe, Jan 2016 to Dec 2025 (Scoreboard, chart-race).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet, same look).
#
# Facts come only from teasers/v2/04-chart-race.md (section (b) 04c, Decisions, Sources) and
# python3 teasers/v2/checks/04-chart-race.py. Research: vidIQ, pulled 2026-10-13. The video is the condensed cut,
# promoted and shipped on 2026-10-13 (the pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp
# except the cover, which is picked by content, so the copy carried over unchanged; the ship rebuilt it with --covers
# from the shipped file.

TEASER = "04c Scoreboard, chart-race: \"POV: In 2016 you invested $10,000 in USA vs EUROPE\""
PREPARED = "2026-10-13"
SHORT_ID = "04c"
MD_TITLE = "04c publishing sheet: $10,000 in the USA vs Europe since 2016"
MATH_RUN = "657 checks, 0 failed"      # python3 teasers/v2/checks/04-chart-race.py on studio/specs/ (the round-2 cuts), re-run at the adversarial check 2026-10-13
MATH_RUN_WIP = "698 checks, 0 failed"  # the same script with --spec on the three condensed cuts in studio/specs-wip/, 2026-10-13
MATH_RUN_SHIP = "698 checks, 0 failed"  # python3 teasers/v2/checks/04-chart-race.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
MATH_RUN_FIRST = "614 checks, 0 failed"  # at the first build, before the condense's check-script update

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 39.0 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/04-chart-race.md` (04c) and its check, "
    f"`python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/` (run 2026-10-13), so the copy's figures hold on both cuts. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every figure from the S&P 500 and MSCI Europe returns, "
    "keeps each figure with its own side (the USA or Europe) and each year's figure beside its year.",
    "- **Honesty rules kept.** The title asks and never gives the decade's winner, and neither does the cover (frame 1 shows the hook's 2025 claim and the question). "
    "The Instagram caption's first 125 characters carry only that 2025 claim, which frame 1 shows, and the question. The copy names the basis wherever it gives the result: "
    "total return in US dollars (so Europe's line includes currency moves), MSCI Europe net vs the S&P 500 gross, no fees or personal tax. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"S&P 500\" and \"MSCI Europe\" name the two indexes the maths is about; both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices or MSCI.' The video has no flags or logos: the names are text only. No share price is named.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 39.0, "sha256": "1a7f8c5e37ce31e6ab5dbba5fc772a9f810d1ceb0e33d3d2c55fe149a558af78",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/04-chart-race.md section (b) 04c; teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/, {MATH_RUN_WIP} with --spec on the condensed cuts (2026-10-13)",
    "stake": "$10,000 in each, from the Dec 31, 2015 close to the Dec 31, 2025 close (Jan 2016 → Dec 2025, 10 years)",
    "method": "V(year) = V(year − 1) × (1 + that year's total return in US dollars): USA = S&P 500 (gross), Europe = MSCI Europe Index (USD, net); no fund fees or personal tax",
    "hook_2025": "Europe +35.41% vs the USA +17.88%: 35.41 ÷ 17.88 = 1.98, ≈ 2 to 1",
    "y2018": "Europe −14.86% (≈ −15%), the USA −4.38%",
    "y2020": "the USA's first year-end at or over $20,000: $20,305.34 (≈ × 2.03), 'doubled your money'",
    "europe_cap": "Europe's highest year-end before 2025 is $16,734.97 (2024): still under $17,000",
    "finals": "USA $39,832.91 ≈ $39,800 (≈ ×3.98); Europe $22,660.82 ≈ $22,700 (≈ ×2.27)",
    "per_year": "3.9833^(1/10) − 1 = 14.82% ≈ 14.8%; 2.2661^(1/10) − 1 = 8.52% ≈ 8.5%",
    "doublings": "log2 3.9833 = 1.994 (≈ doubled twice); log2 2.2661 = 1.18 (once); rule of 72: 72 ÷ 14.8 ≈ 4.9 years, 72 ÷ 8.5 ≈ 8.5",
    "basis": "both in US dollars, so Europe's line includes the euro/pound moves; MSCI Europe is net of dividend withholding tax, the S&P 500 series gross, a tilt of roughly 0.3-0.5 points a year toward the USA, far smaller than the 6.3-point gap",
    "verdict": "Europe won 2025. The USA won the decade.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What If You Invested $10,000 in the USA and Europe in 2016? Which One Won?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. Top score, 7 points over the write-up's title. ChartOrbit's 'What If You Invested $X in USA and EUROPE?' grammar (its 345x winner) with the start year, "
             "and an open question with no winner in it."},
    {"rank": 2, "title": "USA vs Europe Stocks: What Did $10,000 in Each Become Since 2016?", "vidiq_score": 92,
     "note": "Keyword-first ('usa vs europe'); it drops the benchmark's grammar."},
    {"rank": 3, "title": "What If You Invested $10,000 in the USA and Europe in 2016? #USAvsEurope #sp500 #linechart", "vidiq_score": 90,
     "note": "The house 3-hashtag form, paste-ready: its hashtags are the description's first three. 06b and 06c went up with titles in this form. It drops 'Which One Won?' to fit."},
]
YT_TITLES_ALSO_SCORED = [
    ("What If You Invested $10,000 in the USA and EUROPE in 2016?", 90, "the write-up's title, ChartOrbit's exact grammar, without the question"),
    ("Europe Beat the S&P 500 in 2025. What If You Invested $10,000 in Each in 2016?", 90, "the hook's claim first"),
    ("Europe Won 2025. What If You Invested $10,000 in the USA and Europe in 2016? Who Won the Decade?", 89, "both questions, 95 characters"),
    ("Europe Won 2025. Who Won the Decade?", 80, "the write-up's A/B title; it is also the Instagram caption's first line"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 90 to 97. 'USA' and 'Europe' sit in the first 50 characters, as in ChartOrbit's title, which is itself among the searched 'what if you invested' phrasings.",
    "No winner in it: the decade's answer (the USA ≈ $39,800 vs Europe ≈ $22,700) is what the video pays off. The only figures are the stake and the start year, both on frame 1.",
    "The write-up's A/B title ('Europe Won 2025. Who Won the Decade?') scores 80 here; it leads the Instagram caption instead, where the first line overlays the Reel.",
    "06b and 06c went up with the house 3-hashtag form in the title. To post this one that way, paste option 3 as it stands: its hashtags are the description's first three, as YouTube needs.",
]

YT_DESCRIPTION = """What if you invested $10,000 in the USA and $10,000 in Europe at the start of 2016? Europe won 2025, +35.41% to the USA's +17.88%. But over the decade the USA (the S&P 500) grew to about $39,800 and Europe (MSCI Europe) to about $22,700, total return in US dollars.

The math, shown:
• Each line is $10,000 grown by each year's total return in US dollars, compounded from the Dec 31, 2015 close.
• 2018: Europe −14.86%, the USA −4.38%.
• 2020: the USA has doubled your money ($20,305).
• Europe's best year-end before 2025 was $16,735, still under $17,000.
• 2025: Europe +35.41%, the USA +17.88%. Europe beat the USA ≈ 2 to 1 that year.
• End of 2025: the USA ≈ $39,800 (≈ ×3.98), Europe ≈ $22,700 (≈ ×2.27).
• Per year: the USA ≈ 14.8%, Europe ≈ 8.5%. The USA ≈ doubled twice, Europe once.
• Europe won 2025. The USA won the decade.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. USA: S&P 500 total return by year (S&P Dow Jones Indices data via Slickcharts). Europe: MSCI Europe Index (USD), net total return by year (MSCI factsheet; YCharts). Both in US dollars, so Europe's line includes the euro and pound against the dollar. MSCI Europe is net of dividend withholding tax and the S&P 500 series is gross, a tilt of about 0.3 to 0.5 points a year toward the USA, far less than the gap. Bought at the Dec 31, 2015 close and valued at the Dec 31, 2025 close; no fund fees or personal tax. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices or MSCI.
#USAvsEurope #sp500 #linechart"""
# the description's multi-byte characters, the minus sign (U+2212) included: the builder's house list has the en dash but not the minus
DESC_MULTIBYTE = ", ".join(f"`{c}`" for c in "≈×•—–−÷→…" if c in YT_DESCRIPTION)
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the verdict is a decade's total return in one currency, which the credit spells out, "
             "so 'a number that shouldn't be true' would oversell it. The verdict closes the bullets, in the video's own two lines.")

YT_HASHTAGS = ["#USAvsEurope", "#sp500", "#linechart"]
YT_HASHTAG_NOTES = [
    ("#USAvsEurope", "the rivalry. 'usa vs europe' is a big culture cluster on YouTube (8,000-9,400 a month for its top phrasings; 'europe vs usa income comparison' 8,566, +84.5%), "
                     "and the write-up's country pair drew about 4× the comments per view; the tag puts the race in front of that crowd."),
    ("#sp500", "the USA's index ('s&p 500' 95,512 a month), named on the hook's column."),
    ("#linechart", "the write-up's YouTube note ('ChartOrbit's exact title grammar, plus #linechart'): the tail of the benchmark's winning era."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["usa vs europe", "s&p 500 vs europe", "european stocks", "european stocks beating the s&p 500", "msci europe", "european stocks etf",
           "what if you invested", "what if you invested in stock 10 years ago", "s&p 500", "stock market", "line chart race", "money math",
           "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags; 'european stocks beating the s&p 500' is the searched phrase "
             "'european stocks being the s&p' (3,993 a month, competition 21.0) with its typo fixed, the belief the hook plants. "
             "Left out on purpose: 'european stocks to buy' (5,082) and 'best european stocks' (3,676) are advice intent; 'european defense stocks' (4,113) is a sector; "
             "'european stocks vs us stocks', the seed, is under 750 a month.")

YT_PINNED = """One great year isn't a great decade. Per year: the USA ≈ 14.8%, Europe ≈ 8.5%. Rule of 72: at those rates the USA doubles every ≈ 4.9 years, Europe every ≈ 8.5. Swap in your own amount: the USA ≈ ×3.98, Europe ≈ ×2.27. Next race: USA vs Japan, or USA vs China?

The basis: total return in US dollars, from the Dec 31, 2015 close to the Dec 31, 2025 close. USA = S&P 500. Europe = MSCI Europe (net), so its line includes the euro and pound against the dollar. No fund fees or personal tax."""
PINNED_NOTE = ("The write-up's pinned comment, reworded so every rate and multiple sits after its own side. It turns the verdict into numbers a viewer can carry "
               "(the yearly rates, the rule of 72), gives the multiples for the viewer's own amount (R3) and ends on the next race, for the rivalry comments the write-up expects. "
               "The second paragraph answers the 'what about currency / dividends?' comments with the footer's basis, as the write-up's YouTube note asks.")

RELATED_VIDEO = {
    "pick": {"id": "krfZEHhb0xU", "title": "What If You Bought Netflix Stock Instead of Paying for Netflix?",
             "url": "https://www.youtube.com/shorts/krfZEHhb0xU",
             "why": "The same 'what if you invested' viewer and the same race-chart idea in 06b, the Scoreboard POV race, live since Mon 12 Oct 2026 (61 views by 13 Oct, posted midday): it can use the traffic."},
    "swap_when_live": "04a (S&P 500 vs gold), the other Scoreboard chart race, once published; then point 04a's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the cover (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick frame 1 (the 2025 columns, '+17.88%' USA vs '+35.41%' EUROPE lit, under '2016 → 2025: WHO WON?'), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 04c condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, post one chart race (04a, 04b, 04c) per evening, and keep the two Scoreboard races (04a, 04c) at least a day apart.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both, and an evening ET reaches Europe's next morning for the rivalry crowd. "
           "n = 7 and confounded by topic, so treat it as a test. Search demand: 'europe vs usa income comparison' is up 84.5% on its baseline; the market phrases are small and flat.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "Europe won 2025. Who won the decade? What if you invested $10,000 in the USA and $10,000 in Europe in 2016?"

IG_CAPTION = IG_HOOK + """

POV: Jan 2016, $10,000 in each. USA = the S&P 500, Europe = MSCI Europe, both total return in US dollars, raced year by year to Dec 2025.

The math, shown:
• 2025: Europe +35.41%, the USA +17.88%. Europe beat the USA ≈ 2 to 1.
• 2018: Europe drops ≈ 15%.
• 2020: the USA has doubled your money.
• Europe's best year-end before 2025: $16,735, still under $17,000.
• End of 2025: the USA ≈ $39,800. Europe ≈ $22,700.
• Per year: the USA ≈ 14.8%, Europe ≈ 8.5%. The USA ≈ doubled twice, Europe once.

Europe won 2025. The USA won the decade.

Europe's line includes the euro and pound against the dollar. MSCI Europe is net of dividend withholding tax, a tilt of about 0.3 to 0.5 points a year toward the USA, far less than the gap. No fund fees or personal tax. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices or MSCI.

Next race: USA vs Japan, or USA vs China?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#usavseurope #sp500 #europe #linechart #investing"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 ('Europe won 2025. Who won the decade?') and the title's question, with the 'USA', 'Europe' and "
                   "'what if you invested' keywords. The only result in them is 2025's, the hook's claim, which frame 1 shows; the decade's answer sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's curiosity line, then the title's question. The figures are 2025 (the hook's year, on frame 1), the stake and the start year. "
    "The decade's finals and the verdict sit below 'more', where Instagram search and Google indexing still read them.",
    "The basis paragraph follows the verdict, so the decade's result is never quoted without its currency and net-vs-gross caveats.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#usavseurope", "#sp500", "#europe", "#linechart", "#investing"]
IG_HASHTAG_MD = [
    "Four are specific:",
    "",
    "- `#usavseurope` is the rivalry, and `#europe` and `#sp500` the two sides (the write-up's caption tags `#europe #sp500`).",
    "- `#linechart` is the format's tag, from the write-up's caption (`#linechart #investing #europe #sp500`).",
    "",
    "`#investing`, from the write-up's caption, is the broad layer.",
]

IG_ALT_SHORT = "Chart: $10,000 in the USA vs Europe, 2016 to 2025: USA about $39,800, Europe about $22,700."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'to' and 'about', not '-' and '≈', "
                     "so screen readers read it cleanly. The long version carries 2025's result and the verdict.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'to' and 'about' instead of '-' and '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. Header: POV: in 2016 you invested $10,000 in USA vs Europe. It opens on the 2025 result: Europe +35.41% and USA +17.88%, "
               "two columns to scale, about 2 to 1, under the question: who won from 2016 to 2025? Then two lines race from 2016 over a dashed $10,000 line. Europe drops about 15% in 2018; "
               "the USA doubles by 2020; Europe's best year-end before 2025 is still under $17,000. Europe jumps about 35% in 2025, then the USA finishes at about $39,800 "
               "and Europe at about $22,700. The USA about doubled twice, Europe once. Verdict: Europe won 2025. The USA won the decade.")

IG_FIRST_COMMENT = ("Per year: the USA ≈ 14.8%, Europe ≈ 8.5%. Swap in your own amount: the USA ≈ ×3.98, Europe ≈ ×2.27. "
                    "Next race: USA vs Japan, or USA vs China?")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up's Instagram note says "Cover = frame 1 (the two 2025 columns with
# Europe lit, the ask, '$10,000' in the hero)". On the shipped condensed cut frame 0 is that frame and the only still
# one: from frame 1 Europe's column bumps (mean frame-to-frame luma change 0.48, 270x480 greyscale).
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:73"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("Frame 1, which the write-up names as the Instagram cover: the header 'POV: IN 2016 YOU INVESTED $10,000 IN / USA VS EUROPE' with $10,000 the only accent, "
                          "the hero 'EACH $10,000', the footer 'Total return in US$ · no fees or tax', the ask '2016 → 2025: WHO WON?', the dim 2025 clock, and the two 2025 columns "
                          "to scale: '+17.88%' over the green USA bar and '+35.41%' over the lit yellow EUROPE bar, 'S&P 500' and 'MSCI Europe' under the floor, with the first caption "
                          "'2025: Europe beat the USA ≈ 2 to 1.' It shows the hook's claim and asks the decade's question; the decade's answer is not on it. "
                          "On any cut, use the first frame, while the two 2025 columns stand under the ask.")
COVER_FRAME_MEASURED = ("On the shipped 18.4 s condensed cut, frame 0 (0.00 s) is that frame and the only still one: from frame 1 (0.03 s) Europe's column bumps (mean "
                        "frame-to-frame luma change 0.48, 270×480 greyscale). On the 39.0 s pre-condense render the hook held still from frame 0 until the bump.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 73 to 1513 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1445 (the caption's second line), "
                   "so the crop centres it: badge, header, hero, footer, the ask, both columns with their index names and the caption; it drops the empty black floor. "
                   "A centred grid crop (y 240-1680) loses the badge and leaves the header on the top edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the climax ('USA ≈ $39,800' over both finished lines), which the write-up suggests testing against frame 1. It shows the decade's answer the title asks about; "
    "it is the A/B in Trial Reels below.",
    "**Shipped cut (2026-10-13):** frame 1 was re-picked by content on the shipped file (the first frame, the 2025 columns under the ask) and both JPGs re-exported from it: the same picture as the pre-condense cover.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "The write-up's cover A/B afterwards, if you want it: the other cut with the climax frame ('USA ≈ $39,800') as its cover, as a Trial with MANUAL graduation 48-72 h later. The condensed cut shipped on 2026-10-13, and "
                     "the pre-condense render is in git: `git show 471c793:renders/channel/04c-scoreboard-usa-vs-europe.mp4 > 04c-pre-condense.mp4` (sha256 1a7f8c5e…). Compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'USA vs Europe since 2016 — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("stock market (topic)", 589214, 86.1, 62.0, 66.9, "+8.8% vs its 30-day baseline (541,592)", "2026-10-12"),
    ("s&p 500 (topic)", 95512, 74.3, 63.1, 59.4, "-33.1% vs its baseline (142,756)", "2026-10-12"),
    ("usa vs europe language comparison", 9386, 59.3, 40.0, 59.6, "the 'usa vs europe' cluster is culture, not markets", "2026-07-20"),
    ("europe vs usa income comparison", 8566, 58.7, 35.4, 61.1, "+84.5% vs its baseline (4,642): the money side of the rivalry", "2026-05-27"),
    ("i simulated the usa vs europe", 8156, 58.4, 13.1, 69.8, "a searched video title, competition 13.1", "2026-05-10"),
    ("spending power usa vs europe", 5267, 55.6, 38.0, 58.1, "", "2026-03-06"),
    ("europe vs usa shorts", 5217, 55.5, 37.0, 58.5, "", "2026-02-25"),
    ("european stocks to buy", 5082, 55.3, 34.2, 59.5, "advice intent, not a tag", "2026-05-20"),
    ("what if you invested $10,000 in 10 years ago", 5025, 55.2, 34.6, 59.3, "the stake and the window", "2026-10-12"),
    ("what if you invested in stock 10 years ago", 4615, 54.7, 35.6, 58.6, "the window", "2026-10-12"),
    ("european stocks etf", 4275, 54.2, 22.2, 63.6, "low competition; product intent", "2026-05-20"),
    ("european defense stocks", 4113, 54.0, 14.4, 66.6, "a sector, not a tag", "2026-10-12"),
    ("european stocks being the s&p", 3993, 53.8, 21.0, 63.9, "sic ('beating'): the belief the hook plants, searched", "2026-04-15"),
    ("best european stocks", 3676, 53.2, 32.4, 59.0, "advice intent, not a tag", "2026-10-04"),
    ("european stocks vs us stocks", 0, 0, 37.7, 24.9, "<750/month: the seed, too small to target (competition and overall from the adversarial check's re-pull; the first pull had none)", None),
]
KEYWORD_MD_NOTE = {"european stocks vs us stocks": "<750/month: the seed, too small to target"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'european stocks vs us stocks' with US volumes; matching_terms for 'usa vs europe', 'european stocks' and 'what if you invested'), "
                   "pulled 2026-10-13. vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; nine rows are older snapshots (2026-02-25 to 2026-10-04).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Nine rows are older snapshots.")
KW_OUTRO = ("The market phrases are small: 'european stocks vs us stocks' is under 750 a month, and the European-stock phrases sit at 3,300-5,100, mostly advice. "
            "The searched belief 'european stocks being the s&p' (3,993, competition 21.0) is the hook's wrong answer. The reach is in the rivalry: 'usa vs europe' phrasings run 5,200-9,400 a month "
            "on culture topics, and 'europe vs usa income comparison' is up 84.5%. So the title keeps ChartOrbit's 'USA and EUROPE' grammar and the hashtag names the rivalry.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("💴What If You Invested $5,000 in USA and EUROPE? #linechart  #datavisualization", "ChartOrbit", 15400, 2808312, "2025-10-26",
     "the write-up's H17 (345.09x), re-pulled; from 2008"),
    ("$10K in 2005: USA vs EUROPE", "PatiencePays", 102, 1638, "2025-12-20"),
    ("What If You Invested £10,000 Into the S&P 500 14 Years Ago?", "Your Money Mate", 6820, 1528, "2026-05-27", "UK viewer, the S&P 500 alone"),
    ("What If You Invested $50/Month in Europe Instead of the US?", "CalculatorInvest", 10, 179, "2026-04-01", "Germany's DAX, monthly"),
    ("S&P 500 or the Whole World? For UK Investors #Shorts", "Boring Bill", 76, 38, "2026-10-02"),
    ("Without AI, The U.S. Stock Market Is Actually Losing to Europe!", "W Investors", 0, 1, "2026-10-12", "2:54; the 2026 'Europe is winning' talking point"),
]
SAME_IDEA_HEADING = "**2. The race is ChartOrbit's 345x winner; since then the USA-vs-Europe Shorts are small (vidIQ YouTube search, under 4 min, since 2025).**"
SAME_IDEA_MD = [
    "The exact race is ChartOrbit's 'What If You Invested $5,000 in USA and EUROPE?' (2,808,312 views, re-pulled; 345.09x in the write-up), from 2008. "
    "The USA-vs-Europe Shorts found since are small (1-1,638 views) and state their angle in the title ('$10K in 2005: USA vs EUROPE', 'Without AI, The U.S. Stock Market Is Actually Losing to Europe!'). "
    "None opens on 2025's Europe win and asks about the decade, which is this Short's hook, so the pick keeps the benchmark's question and adds 'Which One Won?'.",
    "",
    "Next door, fincrisper's 'S&P 500 vs. Nasdaq 100: 100 $/month invested since 2005 🚀' (71,887 views on 104 subscribers, outlier score 519.0) shows a two-index race can travel from a small channel, "
    "and ChartOrbit's 'What If You Invested $5,000 in USA and CHINA?' (1,068,787) shows the country pairs do.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min, by relevance since 2025) plus ChartOrbit's benchmarks re-pulled by id: the USA-and-EUROPE race has 2,808,312 views; "
                  "the USA-vs-Europe Shorts since run 1-1,638 views; none opens on 2025's Europe win.")

OUTLIERS = [
    {"handle": "@alanintelligence", "platform": "Instagram", "id": "DcOWksJAYP2",
     "on_screen": "Sell when it drops? Sell US stocks when they drop below the 200-day SMA",
     "views": "479.5K (123.6x the account median of 3.9K)",
     "note": "a music-only line race on a black background: this Short's look"},
    {"handle": "@race_charts", "platform": "Instagram", "id": "Dct04VesZPy",
     "on_screen": "SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD", "views": "1.6M (60.9x the account median of 26.7K)",
     "note": "two lines diverging from frame 1, music only"},
    {"handle": "@getinfinityinsights", "platform": "Instagram", "id": "DbtfXQ9J6Zq",
     "on_screen": "WHAT IF YOU WERE THE LUCKIEST INVESTOR ALIVE? S&P 500, SEVEN CRASHES", "views": "74.7K (16.0x the account median of 4.7K)",
     "note": "an animated S&P 500 line with the question on frame 1"},
    {"handle": "@data.dragonn", "platform": "TikTok", "id": "7680694072218029344",
     "on_screen": "POV: Someone invested $100 every month in the GoPro Stock over the last 12 years", "views": "1.4M (49.6x)",
     "note": "the POV line race, music only"},
]
OUTLIERS_HEADING = "**3. Line races travel on Instagram and TikTok; no USA-vs-Europe one has yet (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@alanintelligence** (Instagram), \"Sell when it drops? Sell US stocks when they drop below the 200-day SMA\": 479.5K (123.6x). A two-line race on black, music only.",
    "- **@race_charts** (Instagram), \"SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD\": 1.6M (60.9x). **@data.dragonn** (TikTok), \"POV: Someone invested $100 every month in the GoPro Stock over the last 12 years\": 1.4M (49.6x).",
    "- **@getinfinityinsights** (Instagram), \"WHAT IF YOU WERE THE LUCKIEST INVESTOR ALIVE? S&P 500, SEVEN CRASHES\": 74.7K (16.0x). The question on frame 1 over the line.",
    "- All four open on the premise or the question, with no final on frame 1, which is what this Reel's cover and caption do. A concept search for a USA-vs-Europe market Reel or TikTok since Oct 2025 found none.",
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
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; pulled 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,518 views in 30 days.",
    "",
    "06b went up on both platforms on Mon 12 Oct at 12:14 ET, midday: 61 views on YouTube by 13 Oct, and its Reel's insights are not in yet (Instagram lags). "
    "It is left out of the medians, as is 06c (760 views, 1,711 plays, 40.3% skip), both too young.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic):",
    "",
    "- **YouTube:** Sunday early morning ET 1,198, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "The channel has no country race yet. Its best Reels are comparisons that land on one picture ('$1M stack vs Burj Khalifa': 27.0% skip, 83.1% watched), "
    "which is what this Reel's frame 1 does with the two 2025 columns.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "As the 06b and 02b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume, the write-up's notes and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the shipped condensed cut (2026-10-13). The cover's time and frame are measured on it; the copy names no other timestamp and carried over from the pre-condense cut unchanged.",
    "The write-up's caveat that a 2012 start widens the gap (≈ ×7.1 vs ≈ ×3.1) is not in the 04 check, so the copy does not use it.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "S&P 500 vs. Nasdaq 100: 100 $/month invested since 2005 🚀", "channel": "fincrisper", "subscribers": 104, "views": 71887, "published": "2025-07-10",
         "note": "a two-index chart race, outlier score 519.0"},
        {"title": "💴What If You Invested $5,000 in USA and CHINA? #linechart  #datavisualization", "channel": "ChartOrbit", "subscribers": 15400, "views": 1068787,
         "published": "2025-11-08", "note": "the write-up's H19, re-pulled"},
    ],
    "chartorbit_benchmarks_refreshed": [
        {"id": "VwfZNjxu6fU", "title": "💴What If You Invested $5,000 in USA and EUROPE? #linechart  #datavisualization", "views": 2808312, "likes": 10937, "comments": 1219, "published": "2025-10-26"},
        {"id": "KmtLGAPIutg", "title": "💴What If You Invested $5,000 in NETFLIX and DISNEY? #linechart #datavisualization", "views": 15876430, "published": "2025-11-05"},
        {"id": "q0qVAKymIh4", "title": "💴What If You Invested $5,000 in USA and CHINA? #linechart  #datavisualization", "views": 1068787, "published": "2025-11-08"},
    ],
    "titles_scored": "7 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 6 at the first build, the hashtag form at the adversarial check (the pick re-scored); all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "04c: 105 by listed cost (3 keyword pulls × 20, 1 YouTube search × 5, 1 video lookup × 5, 1 IG/TikTok outlier search × 5, 6 title scores × 5), plus a third of the format's "
                     "30 shared credits (channel stats 5, channel videos 5, the 'what if you invested' matching terms 20); 310 for the three 04 sheets. Account balance: 6,010 at the start, "
                     "5,625 when the 04 research ended (a 385 drop, so at least 75 were parallel sheets' calls), 5,385 at the end of the build with no further 04 calls. "
                     "The adversarial check of the three 04 sheets: 3,945 → 3,885, a 60-credit drop at most (the balance is shared) for 7 title scores, 3 keyword pulls and 1 video lookup; "
                     "this sheet's share is 2 title scores and the 'european stocks vs us stocks' pull.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/ (the round-2 cuts; {MATH_RUN_FIRST} at the first build, before the condense's check-script update), "
                f"re-run at the adversarial check 2026-10-13; with --spec on the three studio/specs-wip/ condensed cuts {MATH_RUN_WIP}, so the copy's figures hold on both cuts; every public figure traced to the 04c year-end table and "
                "recomputed in MATH_RELATIONS from the S&P 500 and MSCI Europe returns, each figure pinned to its own side and its year (COPY_RULES)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: european stocks vs us stocks <750; european stocks being the s&p 3,993 / 21.0; europe vs usa income comparison 8,566 (+84.5%); "
                   "6 titles scored: pick 97, write-up's title 90, its A/B 80; ChartOrbit's USA and EUROPE re-pulled at 2,808,312; channel 53 subs / 10,221 views / 41 videos; "
                   "Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried at the adversarial check: the pick's title score 97; 'european stocks vs us stocks' <750 (competition 37.7, overall 24.9); 'stock market' 589,214 (+8.8%); "
                   "ChartOrbit's USA and EUROPE 2,808,312 (10,937 likes, 1,219 comments) and USA and CHINA 1,068,787; 06b (krfZEHhb0xU) 75 views (61 at the build). All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/`. Every public figure traces to the 04c year-end table: 2025 +35.41% vs +17.88% (ratio 1.98, ≈ 2 to 1); "
    "2018 −14.86% / −4.38%; 2020 $20,305 (doubled); Europe's best pre-2025 year-end $16,735; finals ≈ $39,800 (≈ ×3.98) and ≈ $22,700 (≈ ×2.27); ≈ 14.8% vs ≈ 8.5% a year; "
    "log2 1.994 (≈ twice) and 1.18 (once); rule of 72 ≈ 4.9 and ≈ 8.5 years. The data file recomputes each from the returns.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 6 titles scored against this channel: the pick 97, the write-up's title 90, its A/B title 80. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 97; 'european stocks vs us stocks' under 750 a month (competition 37.7, overall 24.9: the first pull returned none); "
    "'stock market' 589,214 (+8.8%); ChartOrbit's USA and EUROPE 2,808,312 (10,937 likes, 1,219 comments), USA and CHINA 1,068,787; 06b, the related video, 75 views (61 at the build). All match.",
    "- **Changed.**",
    f"  - The math run said {MATH_RUN_FIRST}: the condense updated the check script since, and it now runs {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the condensed cuts. "
    "The 04c key lines the builder looks for are the cut-independent ones (the finals, rates and doublings, Europe's year-ends under $17,000), so the check keeps passing when the condensed cut is promoted.",
    "  - Title option 3 is now the paste-ready hashtag form, '… in 2016? #USAvsEurope #sp500 #linechart' (vidIQ 90, the same as the write-up's title, which moved to 'also scored'): "
    "06b and 06c went up with hashtag titles, and the sheet had none.",
    "  - The pinned comment's rule of 72 read as a forecast ('the USA doubles every ≈ 4.9 years'); it now says 'at those rates', the decade's own rates.",
    "  - `#sp500` was 'the tag the same-idea Shorts use': none of the 6 same-idea titles carries it. The note now says it names the USA's index, as the hook's column does.",
    "  - The description note listed its 2-3-byte characters without the minus sign (−, 3 bytes) the description uses; `DESC_MULTIBYTE` now lists it.",
    "  - The seed keyword row had no competition score; the re-pull gives 37.7 (overall 24.9).",
    "- **Checked.**",
    "  - Platform limits: title 74/100 with no hashtags (the description's first three show above it), description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags, short alt text 91.",
    "  - The cover JPGs (read by eye) show frame 1: the two 2025 columns, '+17.88%' USA and '+35.41%' EUROPE lit, the ask '2016 → 2025: WHO WON?', the first caption; no decade result. "
    "The write-up's condensed beat sheet keeps that picture on frame 1 (the bump starts on frame 2).",
    "  - The caption's first 125 characters carry 'Europe won 2025', the hook's claim on frame 1 and the write-up's caption line 1; the decade's result is below 'more'.",
    "  - The pre-condense render in git (`471c793`) had the same sha256 as `renders/channel` before the ship (`1a7f8c5e…`), so the Trial Reels `git show` command fetches this file.",
    "  - Brand: 'S&P 500' and 'MSCI Europe' are named only as the indexes the maths uses; 'Not affiliated with or endorsed by S&P Dow Jones Indices or MSCI.' is in the description and the caption. No flags or logos.",
    "- **Mutation test.** Five mutations of a scratch copy each fail by name: the two finals swapped between the USA and Europe, Europe's 2018 drop moved to 2020, the net-of-tax basis cut from the caption, the decade's result in the caption's first 125 characters, and the affiliation line cut. At the adversarial check, 2 more on scratch copies also fail by name: a bare 4.9 in the pinned comment, and '2 to 1' without its '≈' in the caption. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 04 check already prints the builder's 'N checks, F failed' line, so `MATH_SCRIPT` runs it directly.",
    "- **Kept on purpose.**",
    "  - 'Europe won 2025' is in the Instagram caption's first line: it is the hook's claim on frame 1, not the payoff; the decade's result stays below 'more'.",
    "  - The basis (US dollars, net vs gross, no fees) sits in every long item, since the decade's gap is the claim the comments will test.",
    "  - `#USAvsEurope` leads the YouTube hashtags for the rivalry crowd; the market phrases are too small to lead.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). Frame 1 was re-picked by content and is still frame 0, the 2025 columns under the ask. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 04c maths (teasers/v2/04-chart-race.md, section (b) 04c) and recomputed
# below from the sourced returns; dates are inputs from the write-up.
FIGURES = {
    "$10,000", "2016", "2025", "35.41", "17.88", "$39,800", "$22,700", "500", "31", "2015", "2018", "14.86", "4.38", "2020", "$20,305",
    "$16,735", "$17,000", "2", "1", "3.98", "2.27", "14.8", "8.5", "0.3", "0.5", "15", "35", "4.9", "72", "10",
}
# The sourced returns, % (the write-up's Sources table, as teasers/v2/checks/04-chart-race.py holds them): S&P 500 total return
# (S&P DJI data via Slickcharts) and MSCI Europe Index (USD) net total return (MSCI factsheet; 2019-2025 also YCharts).
_US = {2016: 11.96, 2017: 21.83, 2018: -4.38, 2019: 31.49, 2020: 18.40, 2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02, 2025: 17.88}
_EU = {2016: -0.40, 2017: 25.51, 2018: -14.86, 2019: 23.77, 2020: 5.38, 2021: 16.30, 2022: -15.06, 2023: 19.89, 2024: 1.79, 2025: 35.41}


def _grow(rates, stake=10000.0):
    v, out = stake, {2015: stake}
    for y in range(2016, 2026):
        v *= 1 + rates[y] / 100
        out[y] = v
    return out


_us, _eu = _grow(_US), _grow(_EU)
_mu, _me = _us[2025] / 10000, _eu[2025] / 10000
import math as _m
MATH_RELATIONS = [
    (len(_US) == len(_EU) == 10, "10 calendar years, 2016-2025"),
    (round(_us[2025], 2) == 39832.91 and round(_eu[2025], 2) == 22660.82, "finals: the USA $39,832.91, Europe $22,660.82 (the write-up's table)"),
    (round(_us[2025], -2) == 39800 and round(_eu[2025], -2) == 22700, "≈ $39,800 and ≈ $22,700 (3 significant figures)"),
    (round(_mu, 2) == 3.98 and round(_me, 2) == 2.27, "≈ ×3.98 and ≈ ×2.27"),
    (round((_mu ** 0.1 - 1) * 100, 1) == 14.8 and round((_me ** 0.1 - 1) * 100, 1) == 8.5, "≈ 14.8% and ≈ 8.5% a year"),
    (round(_m.log2(_mu)) == 2 and _m.log2(_mu) < 2 and int(_m.log2(_me)) == 1, "the USA ≈ doubled twice (log2 1.994), Europe once (1.18)"),
    (round(_EU[2025] / _US[2025]) == 2 and round(_EU[2025]) == 35 and round(-_EU[2018]) == 15, "2025 ≈ 2 to 1 (1.98); ≈ +35%; 2018 ≈ −15%"),
    (min(y for y in _us if y >= 2016 and _us[y] >= 20000) == 2020 and round(_us[2020]) == 20305, "2020: the USA's first year-end at 2× ($20,305)"),
    (max(_eu[y] for y in range(2016, 2025)) == _eu[2024] and round(_eu[2024]) == 16735 < 17000, "Europe's best year-end before 2025: $16,735, under $17,000"),
    (round(72 / 14.8, 1) == 4.9 and round(72 / 8.5, 1) == 8.5, "rule of 72: ≈ 4.9 and ≈ 8.5 years per doubling"),
    (round((_mu ** 0.1 - _me ** 0.1) * 100, 1) == 6.3 and 0.5 < 6.3, "the net-vs-gross tilt (0.3-0.5 points a year) is far below the 6.3-point gap"),
]
MATH_SCRIPT = "teasers/v2/checks/04-chart-race.py"
MATH_KEY_LINES = ["04c  USA ≈ $39,800 | Europe ≈ $22,700 | 14.82% vs 8.52% a year | log2 1.994 / 1.180 | 2025 ratio 1.980",
                  "'Still under $17,000': every Europe year-end 2016-2024"]
RESULT_RE_TITLE = r"39,8|22,7|×|14\.8|8\.5|doubl|twice|USA Won|Europe Won|[Dd]ecade"
RESULT_RE_CAPTION = r"39,8|22,7|×|14\.8|8\.5|doubl|twice|USA won|decade\."

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it belongs to the right side or year,
# so a swapped "Europe ≈ $39,800" or "2018: … +35.41%" would pass it. These pin each figure to its side and its year.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_SIDE = _re.compile(r"USA|S&P 500|S&P|Europe")


def _owner(fig, who):
    """every occurrence of fig has, as the nearest side named before it on its line, the right side ('usa' or 'eu')"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            before = [a.group() for a in _SIDE.finditer(ln[:m.start()])]
            if not before or ("eu" if before[-1] == "Europe" else "usa") != who:
                return False
    return True


def _with(fig, needs, skip=()):
    """every line that names fig also names one of needs"""
    return all(any(n in ln for n in needs) for ln in _lines(skip) if _re.search(fig, ln))


_YEAR = _re.compile(r"(?<![/\d])20[0-3]\d(?!\d)")      # a year (not part of a date like 12/31/2025)


def _near(fig, year):
    """every occurrence of fig has year as the nearest year on its line"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            ys = [(min(abs(y.start() - m.end()), abs(m.start() - y.end())), y.group()) for y in _YEAR.finditer(ln)]
            if not ys or min(ys)[1] != year:
                return False
    return True


def _after(fig, lead):
    """every occurrence of fig comes right after the lead pattern"""
    return all(_re.search(lead + r"$", ln[:m.start()]) for ln in _lines() for m in _re.finditer(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?)\b", _re.I)
_US_FIGS = [r"\$39,800", r"×3\.98", r"14\.8%", r"17\.88", r"4\.38", r"\$20,305", r"4\.9 years"]
_EU_FIGS = [r"\$22,700", r"×2\.27", r"8\.5%", r"35\.41", r"14\.86", r"15%", r"35%", r"\$16,735", r"\$17,000", r"≈ 8\.5\."]
COPY_RULES = [
    (all(_owner(f, "usa") for f in _US_FIGS) and all(_owner(f, "eu") for f in _EU_FIGS),
     "every figure sits after its own side's name (the USA/S&P 500 or Europe)"),
    (all(_near(f, y) for f, y in [(r"35\.41", "2025"), (r"17\.88", "2025"), (r"(?<![\d.])35%", "2025"), (r"14\.86", "2018"), (r"4\.38", "2018"),
                                  (r"(?<![\d.])15%", "2018"), (r"\$20,305", "2020")]) and _with(r"\$16,735|\$17,000", ("2025",)),
     "each year's figure sits beside its year (2018, 2020, 2025; Europe's best before 2025)"),
    (all(_after(f, r"(?:≈|about) ") for f in (r"\$39,800", r"\$22,700", r"×\d", r"14\.8(?!\d)", r"(?<![\d.])8\.5", r"4\.9", r"(?<![\d.])15%", r"(?<![\d.])35%", r"2 to 1")),
     "every rounded figure, multiple and rate is 'about' or '≈'"),
    (_with(r"\$39,800|\$22,700", ("2025", "decade")), "the finals keep their end year or 'the decade'"),
    (all(_re.search(r"US dollars|US\$", _COPY[k]) and "net" in _COPY[k] for k in ("description", "caption", "pinned comment")),
     "every long item names the basis: US dollars, MSCI Europe net"),
    (all("Not affiliated with or endorsed by S&P Dow Jones Indices or MSCI." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "both platforms carry the affiliation and no-advice lines"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"one", "two", "doubled", "doubles"},
     "no spelled-out figures beyond 'One great year', 'Which One', 'two' columns/lines and 'doubled'"),
]
