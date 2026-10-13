# 04a publishing data: $10,000 in the S&P 500 vs gold, Jan 2000 to Dec 2025 (Scoreboard, chart-race).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet, same look).
#
# Facts come only from teasers/v2/04-chart-race.md (section (b) 04a, Decisions, Sources, Caveats) and
# python3 teasers/v2/checks/04-chart-race.py. Research: vidIQ, pulled 2026-10-13. The video is the condensed cut,
# promoted and shipped on 2026-10-13 (the pre-condense round-2 cut is in git, 471c793). This sheet names no timestamp
# except the cover, which is picked by content, so the copy carried over unchanged; the ship rebuilt it with --covers
# from the shipped file.

TEASER = "04a Scoreboard, chart-race: \"POV: In 2000 you put $10,000 in the S&P 500 VS gold\""
PREPARED = "2026-10-13"
SHORT_ID = "04a"
MD_TITLE = "04a publishing sheet: $10,000 in the S&P 500 vs gold since 2000"
MATH_RUN = "657 checks, 0 failed"      # python3 teasers/v2/checks/04-chart-race.py on studio/specs/ (the round-2 cuts), re-run at the adversarial check 2026-10-13
MATH_RUN_WIP = "698 checks, 0 failed"  # the same script with --spec on the three condensed cuts in studio/specs-wip/, 2026-10-13
MATH_RUN_SHIP = "698 checks, 0 failed"  # python3 teasers/v2/checks/04-chart-race.py on studio/specs/ with the condensed cuts promoted, at the ship 2026-10-13
MATH_RUN_FIRST = "614 checks, 0 failed"  # at the first build, before the condense's check-script update

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 48.0 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/04-chart-race.md` (04a) and its check, "
    f"`python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/` (run 2026-10-13), so the copy's figures hold on both cuts. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every figure from the 04a "
    "year-end table, keeps each figure with its own asset (gold or the S&P 500) and each year's figure beside its year.",
    "- **Honesty rules kept.** The title asks and never gives the winner, and the cover (frame 1, both lines just under $10,000) does not show it either. "
    "The Instagram caption keeps every result below 'more'. The copy names the start year's effect wherever it gives the verdict: start in 2010 and the S&P 500 wins "
    "(≈ ×8.3 vs ≈ ×3.9), the write-up's own answer to 'cherry-picked'. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"S&P 500\" names the index the maths is about (S&P Dow Jones Indices' total-return series); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' The video has no logos or flags: the names are text only. "
    "No share price is named; gold is named by its price an ounce, a commodity price, so no split-adjusted wording applies.",
    "- **News context.** Third-party Reels in the research show gold in the news in 2026 (not verified here). The copy stops at the Dec 31, 2025 close, as the video does, "
    "and the write-up's single-source Sep 30, 2026 gold close is not used.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 48.0, "sha256": "0127a0136f14d4392766294b0d133186ebc49f22fc51682b54d80cb81b9bcbc2",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/04-chart-race.md section (b) 04a; teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/, {MATH_RUN_WIP} with --spec on the condensed cuts (2026-10-13)",
    "stake": "$10,000 in each, bought at the Dec 31, 1999 close, valued at the Dec 31, 2025 close (Jan 2000 → Dec 2025, 26 year-ends)",
    "method": "V(year) = V(year − 1) × (1 + that year's return): the S&P 500's total return (dividends reinvested), gold's change in year-end price; no fees, tax, gold storage or dealer spread",
    "by_2002": "S&P 500 $6,239.17 (≈ −38% since Jan 2000), gold $12,089.43 (≈ +21%): cumulative, not 2002's own returns (−22.10%, +24.8%)",
    "y2008": "S&P 500 −37.00%, gold +5.6% (2008 close $7,186.72 vs $30,567.10)",
    "y2013": "gold −28.0% in one year ($58,204.17 → $41,907.00), shown as ≈ −28%",
    "y2021": "S&P 500 $49,395.43 vs gold $63,517.87: the S&P closes in (ratio 0.39 in 2013 → 0.78 in 2021) but is still behind",
    "y2025": "gold +64.57% ($2,624.60 → $4,319.37 an ounce)",
    "finals": "S&P 500 $75,284.61 ≈ $75,300 (≈ ×7.53); gold $149,915.35 ≈ $150,000 (≈ ×15.0)",
    "per_year": "S&P 500 7.5285^(1/26) − 1 = 8.07% ≈ 8.1%; gold 14.9915^(1/26) − 1 = 10.97% ≈ 11.0%",
    "doublings": "log2 7.5285 = 2.91 ≈ 2.9; log2 14.9915 = 3.91 ≈ 3.9; gap 0.994 ≈ one extra doubling",
    "ahead": "gold is ahead at all 26 year-ends 2000-2025 (the check asserts it)",
    "start_2010": "Jan 2010 → Dec 2025: S&P 500 ×8.28 ≈ ×8.3, gold ×3.94 ≈ ×3.9, so the S&P 500 wins from 2010",
    "robustness": "on the second gold table (thegoldprice.net basis) gold ends ≈ $154,000 (154,066), ×2.05 the S&P 500: still ≈ 2×",
    "verdict": "Gold ended ≈ 2× the S&P 500. That's ≈ one extra doubling. (14.9915 ÷ 7.5285 = 1.99)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What If You Invested $10,000 in Gold and the S&P 500 in 2000? Which One Won?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score. ChartOrbit's 'What If You Invested $X in A and B?' grammar (its 345x and 100x winners), the stake and the start year, "
             "and an open question with no winner in it. 'Gold' and 'S&P 500' both sit in the first 50 characters."},
    {"rank": 2, "title": "Gold vs the S&P 500 Since 2000: What Did $10,000 in Each Become?", "vidiq_score": 97,
     "note": "One point lower and keyword-first ('gold vs the s&p 500'; 's&p 500 vs gold' 5,261 a month). It drops the 'what if you invested' grammar the benchmark's winners share."},
    {"rank": 3, "title": "What If You Invested $10,000 in Gold and the S&P 500 in 2000? #gold #sp500 #linechart", "vidiq_score": 94,
     "note": "The house 3-hashtag form, paste-ready: its hashtags are the description's first three. 06b and 06c went up with titles in this form. It drops 'Which One Won?' to fit."},
]
YT_TITLES_ALSO_SCORED = [
    ("What If You Invested $10,000 in Gold vs the S&P 500 in 2000?", 95, "the pick without its question"),
    ("What If You Invested $10,000 in the S&P 500 and GOLD in 2000?", 94, "the write-up's title"),
    ("Gold vs Stocks Since 2000: What Did $10,000 in Each Become?", 90, "'gold vs stocks' is the biggest phrase (10,983 a month) but scores lower here"),
    ("$10,000 in 2000: Stocks or Gold?", 60, "the write-up's A/B title"),
    ("What If You Put $10,000 in Gold and $10,000 in the S&P 500 in 2000? #gold #sp500 #investing", 95,
     "the first build's option 3; '#investing' is not among the description's first three hashtags, so it can't be pasted as is"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 94 to 98. The first question is the write-up's own title with the two names swapped and 'GOLD' in title case; "
    "'Which One Won?' asks for the payoff without naming it.",
    "No winner in it: the video's whole turn is that gold beat stocks, so neither 'gold' nor 'stocks' is the subject of a verb. The only figures are the stake and the start year, both on frame 1.",
    "Option 2 is one point lower and keyword-first; vidIQ's model ranks titles but does not predict views, so the pick is the benchmark's grammar.",
    "06b and 06c went up with the house 3-hashtag form in the title. To post this one that way, paste option 3 as it stands: its hashtags are the description's first three, as YouTube needs.",
]

YT_DESCRIPTION = """What if you invested $10,000 in gold and $10,000 in the S&P 500 at the start of 2000? By the Dec 31, 2025 close, gold was worth about $150,000 and the S&P 500, with dividends reinvested, about $75,300. Gold was ahead at all 26 year-ends.

The math, shown:
• Each line is $10,000 grown by each year's return, compounded: the S&P 500's total return, and gold's change in year-end price.
• By 2002: the S&P 500 ≈ −38% and gold ≈ +21%, both counted from the start.
• 2008: the S&P 500 −37.00%, gold +5.6%.
• 2013: gold drops ≈ 28% in one year. Stocks run and close in, but in 2021 the S&P 500 ($49,395) is still behind gold ($63,518).
• 2025: gold +64.57%. Final: the S&P 500 ≈ $75,300 (≈ ×7.53), gold ≈ $150,000 (≈ ×15.0).
• Per year: the S&P 500 ≈ 8.1%, gold ≈ 11.0%. Doublings: the S&P 500 ≈ 2.9, gold ≈ 3.9. So gold ended ≈ 2× the S&P 500, ≈ one extra doubling.
• The start year picks the winner: start in 2010 and the S&P 500 grows ≈ ×8.3, gold only ≈ ×3.9.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. S&P 500 total return by year, dividends reinvested (S&P Dow Jones Indices data via Slickcharts; checked against UMD, YCharts and NYU Stern). Gold: the change in its year-end price (Visual Capitalist), up to a Dec 31, 2025 close of $4,319.37 an ounce (metalcharts.org and pricegold.net; checked against VanEck and thegoldprice.net). Bought at the Dec 31, 1999 close and valued at the Dec 31, 2025 close; no fees, tax, gold storage or dealer spread. On thegoldprice.net's table (a different price basis) gold ends at ≈ $154,000, still ≈ 2× the S&P 500. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#gold #sp500 #linechart"""
# the description's multi-byte characters, the minus sign (U+2212) included: the builder's house list has the en dash but not the minus
DESC_MULTIBYTE = ", ".join(f"`{c}`" for c in "≈×•—–−÷→…" if c in YT_DESCRIPTION)
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the verdict depends on the start year, which the last bullet says, "
             "so 'a number that shouldn't be true' would oversell it. The 2002 figures are cumulative since Jan 2000, as the video's VO says ('By 2002').")

YT_HASHTAGS = ["#gold", "#sp500", "#linechart"]
YT_HASHTAG_NOTES = [
    ("#gold", "the winner's name and the bigger phrase ('gold' 617,868 searches a month, down 6.1% on its 30-day baseline)."),
    ("#sp500", "the other racer ('s&p 500' 95,512 a month, down 33.1%). Of the 11 same-idea Shorts in the research, 3 carry it in the title and 6 have no hashtag there; ChartOrbit's own gold race has it in its description."),
    ("#linechart", "the write-up's YouTube note: the tail of ChartOrbit's winning era ('#linechart #datavisualization'). Its NETFLIX and DISNEY title is itself a searched phrase "
                   "with the tail (5,397 a month), so the tag ties this race to the format's searchers."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["gold vs stocks", "s&p 500 vs gold", "gold vs s&p 500", "what if you invested", "what if you invested in gold",
           "gold investment", "s&p 500", "s&p 500 total return", "stock market crash", "line chart race", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags; 'stock market crash' (140,294 a month, +64.7%) covers the race's 2002, 2008 and 2022 drops. "
             "Left out on purpose: 'how to invest in gold' (27,832, +37.2%) and 'gold price' (81,421) want a how-to or today's price; "
             "'gold vs s&p 500 last 20 years' (3,934, competition 8.9) names a 20-year window, and this race runs 26; 'gold vs silver' (28,892) is another race.")

YT_PINNED = """Start in Jan 2010 instead and the S&P 500 grows ≈ ×8.3 by Dec 2025, gold only ≈ ×3.9: stocks win. Same race, different start year. Swap in your own amount: since 2000, gold ≈ ×15.0 and the S&P 500 ≈ ×7.53. Which start year should we race next?

The basis: the S&P 500's total return (dividends reinvested) and gold's year-end price, from the Dec 31, 1999 close to the Dec 31, 2025 close. No fees, tax, storage or dealer spread."""
PINNED_NOTE = ("The first paragraph is the write-up's pinned comment, reworded so every multiple sits after its own asset. It answers the comment the write-up expects "
               "('start date cherry-picked') with numbers before anyone asks, gives the multiples for the viewer's own amount (R3), and ends on a question. "
               "The second paragraph is the assumption line the one-line Scoreboard footer can't hold, which the write-up sends here and to the description.")

RELATED_VIDEO = {
    "pick": {"id": "fbpdKf4Wy8c", "title": "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day?",
             "url": "https://www.youtube.com/shorts/fbpdKf4Wy8c",
             "why": "The same 'what if you invested' viewer and the same race-chart idea; 06c is the channel's best stock 'what if' so far (760 views by 13 Oct). Live since Mon 12 Oct 2026, 03:45 ET."},
    "swap_when_live": "04c (USA vs Europe), the other Scoreboard chart race, once published; then point 04c's Related video at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the cover (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick frame 1 (the header, gold's tip on top and both lines just under the dashed $10,000 line), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 04a condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, post one chart race (04a, 04b, 04c) per evening, and keep the two Scoreboard races (04a, 04c) at least a day apart.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'gold vs stocks' is down 37.3% on its 30-day baseline and 'how to invest in gold' up 37.2%, and third-party Reels on gold's 2026 price are travelling (section 3), "
           "so gold is in the news; the copy stops at the Dec 31, 2025 close.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "The start year picks the winner. What if you invested $10,000 in gold and $10,000 in the S&P 500 in 2000?"

IG_CAPTION = IG_HOOK + """

POV: Jan 2000, $10,000 in each. One line is the S&P 500 with dividends reinvested, the other is gold at its year-end price, raced year by year to Dec 2025.

The math, shown:
• By 2002: stocks ≈ −38%, gold ≈ +21%.
• 2008: stocks crash again (−37.00%). Gold keeps climbing (+5.6%).
• 2013: gold drops ≈ 28% in one year. Stocks close in, but in 2021 they're still behind.
• End of 2025: the S&P 500 ≈ $75,300. Gold ≈ $150,000.
• Per year: the S&P 500 ≈ 8.1%, gold ≈ 11.0%. Gold ended ≈ 2× the S&P 500, ≈ one extra doubling.

Gold was ahead at all 26 year-ends. Start in 2010 instead and the S&P 500 grows ≈ ×8.3, gold ≈ ×3.9.

Bought at the Dec 31, 1999 close, valued at the Dec 31, 2025 close. No fees, tax or storage costs. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

Which start year should we race next?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#gold #sp500 #linechart #investing #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 ('The start year picks the winner.') and the question, with the 'gold', 'S&P 500' and "
                   "'what if you invested' keywords and no result: the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's curiosity line, then the title's question. The only figures are the stake and the start year, both on frame 1. "
    "The finals and the verdict sit below 'more', where Instagram search and Google indexing still read them.",
    "The 2010 line follows the verdict, so the verdict is never quoted without its start year; it is the write-up's answer to the 'cherry-picked' comments it expects.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#gold", "#sp500", "#linechart", "#investing", "#personalfinance"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#gold` and `#sp500` name the two racers. They are the tags the same-idea Shorts use: 3 of the 11 carry each in the title, and ChartOrbit's own gold race carries both in its description.",
    "- `#linechart` is the format's tag, from the write-up's caption (`#linechart #investing #gold #sp500`).",
    "",
    "`#investing` (from the write-up's caption) and `#personalfinance` are the broad layer, as on 06b.",
]

IG_ALT_SHORT = "Chart: $10,000 in gold vs the S&P 500, 2000 to 2025: gold about $150,000, stocks about $75,300."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'to' and 'about', not '-' and '≈', "
                     "so screen readers read it cleanly. The long version carries the 2010 caveat and the verdict.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'to' and 'about' instead of '-' and '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. Header: POV: in 2000 you put $10,000 in the S&P 500 vs gold. Two lines race year by year from 2000 to 2025 "
               "over a dashed $10,000 line, both starting just under it. Stocks are down about 38% and gold up about 21% by 2002. Stocks crash again in 2008 "
               "while gold keeps climbing; gold drops about 28% in 2013; stocks climb and close in but are still behind in 2021. Finish: the S&P 500 about $75,300, "
               "then gold about $150,000 after a spike in 2025. Gold made about 3.9 doublings, the S&P 500 about 2.9. "
               "Verdict: gold ended about 2× the S&P 500, about one extra doubling.")

IG_FIRST_COMMENT = ("Start in 2010 instead and the S&P 500 grows ≈ ×8.3, gold ≈ ×3.9. Since 2000: gold ≈ ×15.0, the S&P 500 ≈ ×7.53. "
                    "Which start year should we race next?")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up's Instagram note says "Cover = frame 1 (header, both tips already under
# the $10,000 line)". On the shipped condensed cut the race is already moving on frame 0 (mean frame-to-frame luma
# change about 1.0-1.5 from frame 1 on, 270x480 greyscale); frame 0 is the first and cleanest frame of that state.
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:64"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("Frame 1, which the write-up names as the Instagram cover: the header 'POV: IN 2000 YOU PUT $10,000 IN / THE S&P 500 VS GOLD' with $10,000 the only accent, "
                          "the hero 'GOLD $9,724', the footer 'S&P + dividends · gold · year-ends 2000–2025', the dim 2000 year clock, both tips already just under the dashed "
                          "$10,000 line ('GOLD $9,724', 'S&P 500 $9,535' on the shipped cut; the pre-condense render showed $9,823 and $9,701) on the empty 2000-2025 axis, and the first caption 'Stocks should crush gold.' "
                          "It sets up the race and the wrong belief, and shows neither final. On any cut, use the first frame, while both tips sit under the stake line.")
COVER_FRAME_MEASURED = ("On the shipped 19.9 s condensed cut, frame 0 (0.00 s) shows that state: the race is already moving (mean frame-to-frame luma change about 1.0-1.5 from"
                        " frame 1 on, 270×480 greyscale), with the hero 'GOLD $9,724' and the tips at 'GOLD $9,724' and 'S&P 500 $9,535' under the dashed $10,000 line. On the "
                        "48.0 s pre-condense render frame 0 read 'GOLD $9,823' and 'S&P 500 $9,701'.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 64 to 1504 of the 1080×1920 frame. The content runs from y 141 (the badge) to y 1427 (the caption), "
                   "so the crop centres it: badge, header, hero, footer, the whole plot and the first caption; it drops the empty black floor. "
                   "A centred grid crop (y 240-1680) loses the badge and leaves the header on the top edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the climax ('GOLD ≈ $150,000' over both finished lines) and the verdict hold ('Gold ended ≈ 2× the S&P 500'). They are the save-worthy frames, "
    "but they show the winner the title asks about, against the write-up's cover note.",
    "**Shipped cut (2026-10-13):** frame 1 was re-picked by content on the shipped file (the first frame, both tips under the stake line) and both JPGs re-exported from it. It is the same composition as the pre-condense cover, with the tips now reading a clean 2000 at $9,724 and $9,535.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The condensed cut shipped on 2026-10-13; the pre-condense render "
                     "is in git: `git show 471c793:renders/channel/04a-scoreboard-sp500-vs-gold.mp4 > 04a-pre-condense.mp4` (sha256 0127a013…). Compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Gold vs the S&P 500 since 2000 — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("gold (topic)", 617868, 86.4, 71.0, 63.5, "-6.1% vs its 30-day baseline (658,202)", "2026-10-12"),
    ("stock market crash", 140294, 76.8, 60.3, 62.0, "+64.7% vs its baseline (85,194); the race's 2002, 2008 and 2022 drops", "2026-10-12"),
    ("s&p 500 (topic)", 95512, 74.3, 63.1, 59.4, "-33.1% vs its baseline (142,756)", "2026-10-12"),
    ("gold price", 81421, 73.3, 42.7, 66.9, "-9.9%; today's-price intent, not a tag", "2026-10-12"),
    ("gold investment", 47256, 69.8, 46.5, 63.3, "-6.2% vs its baseline (50,361)", "2026-10-12"),
    ("gold vs silver", 28892, 66.6, 53.3, 58.6, "-45.6%; another race, not a tag", "2026-10-12"),
    ("how to invest in gold", 27832, 66.3, 40.5, 63.6, "+37.2% vs its baseline (20,282); how-to intent, not a tag", "2026-10-12"),
    ("gold vs stocks", 10983, 60.3, 25.7, 65.9, "seed; -37.3% vs its 30-day baseline (17,516)", "2026-10-12"),
    ("💴what if you invested $5,000 in netflix and disney? #linechart #datavisualization", 5397, 55.7, 30.9, 61.1,
     "ChartOrbit's H16 title, searched as typed, hashtag tail and all", "2026-09-20"),
    ("s&p 500 vs gold", 5261, 55.5, 22.6, 64.3, "the exact pair, low competition", "2026-05-23"),
    ("what if you invested $10,000 in 10 years ago", 5025, 55.2, 34.6, 59.3, "the stake grammar", "2026-10-12"),
    ("what if you invested in", 4930, 55.1, 29.5, 61.3, "the title's grammar ('what if you invested' matching terms: 40 variants at 4,400-5,700 a month)", "2026-10-01"),
    ("gold vs s&p 500 last 20 years", 3934, 53.7, 8.9, 68.6, "lowest competition, but a 20-year window; this race runs 26, so not a tag", "2026-07-16"),
    ("s&p 500 vs real estate vs gold", 3789, 53.4, 16.9, 65.3, "a three-way race", "2026-05-25"),
]
KEYWORD_MD_NOTE = {"💴what if you invested $5,000 in netflix and disney? #linechart #datavisualization": "ChartOrbit's H16 title, searched as typed"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'gold vs stocks' with US volumes; matching_terms for 'gold vs s&p 500' and 'what if you invested'), pulled 2026-10-13. "
                   "vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; five rows are older snapshots (2026-05-23 to 2026-10-01).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Five rows are older snapshots.")
KW_OUTRO = ("'gold vs stocks' (10,983 a month, competition 25.7) and 's&p 500 vs gold' (5,261, competition 22.6) are the exact topic at low competition, though 'gold vs stocks' "
            "is down 37.3% on its baseline. The 'what if you invested …' family is a long tail of 40 phrasings at 4,400-5,700 a month each, ChartOrbit's NETFLIX and DISNEY "
            "title among them, which is why the title keeps that grammar. 'how to invest in gold' is rising (+37.2%) but wants a how-to.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("if your dad invested $1000 in S&P 500 vs Gold in 1995📈 #SPX #gold #investments #stocks", "Infomapas Global", 4760, 369220, "2025-10-03",
     "24 s; outlier score 75.2; asks, from a 1995 start"),
    ("S&P 500 vs. Gold vs. Dollar 1957-2024 #inflation #gold #sp500", "Living Charts", 5810, 11769, "2025-03-14"),
    ("Gold VS the S&P 500 did you think there would be this much of a difference?", "Financial Education for Retirement", 333, 10715, "2025-04-05",
     "outlier score 630.3"),
    ("Gold vs Stocks: The Shocking 10-Year Winner", "Mike's Financial Edge", 35400, 6112, "2025-10-22"),
    ("Gold vs. S&P 500: The Surprising 25-Year Shift You Didn’t See Coming", "Capital.com", 283000, 5406, "2025-11-08",
     "2:08; its description gives $10,000 from 2000 as about $75,000 in the S&P 500 vs $136,000 in gold (a 2025 end; not checked here)"),
    ("$10,000 in Gold vs. Stocks (2000-2026) 📈", "ChartOrbit", 15400, 4876, "2026-03-25",
     "the benchmark channel's own version of this race: a statement title, 40 s, from after it left its 'What If You Invested' formula"),
    ("S&P 500 vs Gold since 2000 #finance #investing #stocks #stockmarket #money #trading #sp500 #gold", "Financial Skills", 172, 2186, "2025-04-10"),
    ("¿ORO o S&P 500? El MISTERO de los $10,000 Revelado 📈💰 #oro  #sp500", "SavannaTrading", 48400, 1782, "2026-09-20", "Spanish; $10,000 from 2000"),
    ("Gold vs. S&P 500: Which is the Real King? 🟡 vs 🇺🇸  (2000-2026) #finance #Investing #finanzen", "GELDATEN", 17, 1762, "2026-02-22",
     "total return from 2000; outlier score 440.5"),
    ("$1/Day Since 2000: S&P 500 vs Gold — The Gap Will Shock You", "InvestedInTime", 63, 195, "2026-05-24"),
    ("Gold vs S&P 500: The Real Winner Since 2000 || Credonomics", "CREDONOMICS", 6, 64, "2026-10-04"),
]
SAME_IDEA_HEADING = "**2. Gold vs the S&P 500 is a crowded race with one breakout, and it asked (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "Eleven Shorts race gold against the S&P 500, seven of them from 2000. Ten sit under 12,000 views. The breakout is Infomapas Global's "
    "'if your dad invested $1000 in S&P 500 vs Gold in 1995' (369,220 views on 4,760 subscribers, outlier score 75.2): a 'what if' framed as a person, with the winner left out of the title. "
    "The rest state or tease the answer ('The Shocking 10-Year Winner', 'The Gap Will Shock You'), and ChartOrbit's own '$10,000 in Gold vs. Stocks (2000-2026)', this exact race, "
    "drew 4,876 views after the channel dropped its 'What If You Invested $5,000 in A and B?' titles. So the pick keeps that question form and adds 'Which One Won?'.",
    "",
    "Next door: George Kamel's 'Is Gold Really Worth The Investment?' (1,542,017) and warikoo's India-facing 'Gold vs Nifty50 ke Units' (5,658,043) show the gold-vs-stocks argument travels. "
    "ChartOrbit's benchmarks, re-pulled: 'What If You Invested $5,000 in NETFLIX and DISNEY?' 15,876,430 and 'in USA and EUROPE?' 2,808,312.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views, and by relevance since 2025): 11 gold-vs-S&P 500 Shorts, 10 under 12,000 views; the breakout "
                  "(Infomapas Global, 369,220) asks and keeps the winner out of its title. ChartOrbit's own 2000-2026 version of this race has 4,876. "
                  "Capital.com's description gives gold about $136,000 on its own basis and end date; the copy here uses only the write-up's table.")

OUTLIERS = [
    {"handle": "@alanintelligence", "platform": "Instagram", "id": "DcOWksJAYP2",
     "on_screen": "Sell when it drops? Sell US stocks when they drop below the 200-day SMA",
     "views": "479.5K (123.6x the account median of 3.9K)",
     "note": "a music-only line race on a black background, two strategies over decades: this Short's format"},
    {"handle": "@bigbullionsg", "platform": "Instagram", "id": "Db5b07fJ1Jw",
     "on_screen": "1g of Gold (USD)", "views": "1.2M (562.6x the account median of 2.2K)",
     "note": "gold's price year by year to 2026, gold bars on a table; its caption gives the gain. Not verified here"},
    {"handle": "@race_charts", "platform": "Instagram", "id": "Dct04VesZPy",
     "on_screen": "SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD", "views": "1.6M (60.9x the account median of 26.7K)",
     "note": "two lines diverging from frame 1, music only"},
    {"handle": "@investment_timeline", "platform": "TikTok", "id": "7671760671867997473",
     "on_screen": "POV: You invested in Monster instead of paying $3/day for a Monster Energy", "views": "1.5M (140.6x)",
     "note": "the POV line race; caption = the POV line + hashtags, no result"},
]
OUTLIERS_HEADING = "**3. Music-only line races travel on Instagram and TikTok, and gold is in the feed (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@alanintelligence** (Instagram), \"Sell when it drops? Sell US stocks when they drop below the 200-day SMA\": 479.5K (123.6x). A two-line race on black, music only: the closest match to this Short's look.",
    "- **@race_charts** (Instagram), \"SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD\": 1.6M (60.9x). **@investment_timeline** (TikTok), \"POV: You invested in Monster instead of paying $3/day for a Monster Energy\": 1.5M (140.6x).",
    "- **@bigbullionsg** (Instagram), \"1g of Gold (USD)\": 1.2M (562.6x). Gold's price by year to 2026; it shows gold is in the feed this year (its figures are not verified here).",
    "- All four open on the premise or the setup, with no final on frame 1, which is what this Reel's cover and caption do. None found races gold against the S&P 500 on Instagram or TikTok.",
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
    "The channel's two 'what if you bought the stock' races (06c, 06b) are its closest kin, and both are too young to read. On Instagram, skip rate predicts plays "
    "better than the hour does (27.0-27.4% for the top two, 56.9-65.1% for the bottom two), so the first frame matters more than the slot: this one opens with the race already moving.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "As the 06b and 02b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume, the write-up's notes and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the shipped condensed cut (2026-10-13). The cover's time and frame are measured on it; the copy names no other timestamp and carried over from the pre-condense cut unchanged.",
    "The write-up marks gold's Dec 31, 2025 close ($4,319.37, named in the description) and its 2024 close ($2,624.60, behind the +64.57%) as [click-check]: seen in search summaries, not on the page. Open metalcharts.org/gold-price-history/2025 or pricegold.net/2025/december/ and the Macrotrends gold chart once before posting.",
    "Gold's 2026 moves come only from third-party Reels and the write-up's single-source Sep 30, 2026 close; none is verified here and none is in the copy, which stops at the Dec 31, 2025 close.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "Is Gold Really Worth The Investment?", "channel": "George Kamel", "subscribers": 616000, "views": 1542017, "published": "2023-05-09"},
        {"title": "Gold vs Nifty50 ke Units - Aaj VALUE kitni hain?! | Ankur Warikoo #shorts", "channel": "warikoo",
         "subscribers": 7150000, "views": 5658043, "published": "2026-01-15", "note": "India-facing"},
    ],
    "chartorbit_benchmarks_refreshed": [
        {"id": "KmtLGAPIutg", "title": "💴What If You Invested $5,000 in NETFLIX and DISNEY? #linechart #datavisualization", "views": 15876430, "published": "2025-11-05"},
        {"id": "VwfZNjxu6fU", "title": "💴What If You Invested $5,000 in USA and EUROPE? #linechart  #datavisualization", "views": 2808312, "published": "2025-10-26"},
        {"id": "YPQnpVev9Eo", "title": "$10,000 in Gold vs. Stocks (2000-2026) 📈", "views": 4876, "published": "2026-03-25"},
    ],
    "titles_scored": "8 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 7 at the first build, the hashtag form at the adversarial check (the pick re-scored); all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "04a: 90 by listed cost (2 keyword pulls × 20, 2 YouTube searches × 5, 1 IG/TikTok outlier search × 5, 7 title scores × 5), plus a third of the format's "
                     "30 shared credits (channel stats 5, channel videos 5, the 'what if you invested' matching terms 20); 310 for the three 04 sheets. Account balance: 6,010 at the start, "
                     "5,625 when the 04 research ended (a 385 drop, so at least 75 were parallel sheets' calls), 5,385 at the end of the build with no further 04 calls. "
                     "The adversarial check of the three 04 sheets: 3,945 → 3,885, a 60-credit drop at most (the balance is shared) for 7 title scores, 3 keyword pulls and 1 video lookup; "
                     "this sheet's share is 2 title scores, the 'gold vs stocks' pull and the video lookup.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/ (the round-2 cuts; {MATH_RUN_FIRST} at the first build, before the condense's check-script update), "
                f"re-run at the adversarial check 2026-10-13; with --spec on the three studio/specs-wip/ condensed cuts {MATH_RUN_WIP}, so the copy's figures hold on both cuts; every public figure traced to the 04a year-end table and "
                "recomputed in MATH_RELATIONS from the sourced returns, each figure pinned to its own asset and its year (COPY_RULES)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: gold vs stocks 10,983 / 25.7 (-37.3%); s&p 500 vs gold 5,261 / 22.6; gold 617,868 (-6.1%); s&p 500 95,512 (-33.1%); "
                   "7 titles scored: pick 98, write-up's title 94; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days; "
                   "ChartOrbit's benchmarks re-pulled (15,876,430 and 2,808,312). "
                   "Re-queried at the adversarial check: the pick's title score 98; 'gold vs stocks' 10,983 / 25.7 (-37.3%); 'gold' 617,868 (-6.1%); 's&p 500' 95,512 (-33.1%); "
                   "ChartOrbit 15,876,430 / 2,808,312 / 4,876 (its gold race); 06c (fbpdKf4Wy8c) 760 views. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/`. Every public figure traces to the 04a year-end table: $75,284.61 ≈ $75,300 (≈ ×7.53), "
    "$149,915.35 ≈ $150,000 (≈ ×15.0), ≈ 8.1% vs ≈ 11.0% a year, ≈ 2.9 vs ≈ 3.9 doublings, ratio 1.99 ≈ 2×; by 2002 ≈ −38% / ≈ +21%; 2008 −37.00% / +5.6%; 2013 ≈ −28%; "
    "2021 $49,395 vs $63,518; 2025 +64.57%; from 2010 ≈ ×8.3 vs ≈ ×3.9; second gold table ≈ $154,000. The data file recomputes each from the sourced returns.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 7 titles scored against this channel: the pick 98, the write-up's title 94, its A/B title 60. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 98; 'gold vs stocks' 10,983 / 25.7 (−37.3%); 'gold' 617,868 (−6.1%); 's&p 500' 95,512 (−33.1%); "
    "ChartOrbit's NETFLIX and DISNEY 15,876,430 and USA and EUROPE 2,808,312, its gold race 4,876; 06c 760 views. All match.",
    "- **Changed.**",
    f"  - The math run said {MATH_RUN_FIRST}: the condense updated the check script since, and it now runs {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the condensed cuts. "
    "The 04a key lines the builder looks for are the cut-independent ones (the finals, the 26 year-ends, the second gold table), so the check keeps passing when the condensed cut is promoted.",
    "  - Title option 3 was a hashtag form whose '#investing' is not among the description's first three hashtags, so it could not be pasted as is. 06b and 06c went up with hashtag titles, "
    "so option 3 is now the paste-ready form, '… in 2000? #gold #sp500 #linechart' (vidIQ 94, 85 characters); the old one is in 'also scored'.",
    "  - The description credited VanEck for the $4,319.37 close (VanEck gives 2025's return, not the close) and listed thegoldprice.net beside Visual Capitalist for the race's own table "
    "(it is the second table, on another price basis). Each source is now credited for what it gave, and the ≈ $154,000 line names thegoldprice.net's table.",
    "  - `#sp500` was 'the tag every same-idea Short uses', and the Instagram note said every same-idea post tags both racers: 3 of the 11 titles carry each, 6 carry none. Both notes now say so.",
    "  - The YouTube thumbnail line named 'GOLD $9,823', the pre-condense render's frame-1 tip; the condensed cut's frame 1 reads $9,724 (the write-up). The line now describes the frame by content, "
    "and the cover note gives both cuts' values.",
    "  - The description note listed its 2-3-byte characters without the minus sign (−, 3 bytes) the description uses; `DESC_MULTIBYTE` now lists it.",
    "  - Limits: the write-up's [click-check] rows behind the description's gold close ($4,319.37) and the 2024 close are named, with the pages to open once before posting.",
    "- **Checked.**",
    "  - Platform limits: title 76/100 with no hashtags (the description's first three show above it), description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags, short alt text under 100.",
    "  - The cover JPGs (read by eye) show frame 1: the header, both tips under the dashed $10,000 line, the first caption; no final. The write-up's condensed beat sheet keeps that picture on frame 1.",
    "  - The pre-condense render in git (`471c793`) had the same sha256 as `renders/channel` before the ship (`0127a013…`), so the Trial Reels `git show` command fetches this file.",
    "  - Brand: 'S&P 500' is named only as the index the maths uses; the affiliation line is in the description and the caption. Gold is a commodity, and no share price is named.",
    "- **Mutation test.** Six mutations of a scratch copy each fail by name: the two rates swapped between gold and the S&P 500, a final without '≈', the 2013 drop moved to 2008, a result in the caption's first 125 characters, a winner in the title, and the 2010 caveat cut from the caption. At the adversarial check, 4 more on scratch copies also fail by name: a winner in the title ('Gold Won 2×'), the description's hashtags out of order, the ≈ dropped from the second table's $154,000, and a final in the caption's first 125 characters. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 04 check already prints the builder's 'N checks, F failed' line, so `MATH_SCRIPT` runs it directly.",
    "- **Kept on purpose.**",
    "  - The 2002 figures say 'since Jan 2000' (description) or sit under 'By 2002', as the VO does: they are cumulative, not 2002's own returns.",
    "  - Every multiple and rate sits after its own asset's name (COPY_RULES), so a swapped '≈ 11.0%' or '≈ ×7.53' fails the build.",
    "  - The cover is frame 1, as the write-up names it; the finals and the verdict stay off it.",
    "  - Hashtag `#linechart`, not `#investing`, closes the YouTube three: the write-up's YouTube note asks for ChartOrbit's tail, and `#investing` stays on Instagram.",
    "  - The description's first line gives the finals (the house's answer-first snippet, as on 06b); the title and the caption's first 125 characters still ask.",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). Frame 1 was re-picked by content and is still frame 0, with the tips at $9,724 and $9,535. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 04a maths (teasers/v2/04-chart-race.md, section (b) 04a) and recomputed
# below from the sourced annual returns; dates are inputs from the write-up.
FIGURES = {
    "$10,000", "2000", "500", "$150,000", "$75,300", "$154,000", "26", "2002", "38", "21", "2008", "37.00", "5.6", "2013", "28",
    "2021", "$49,395", "$63,518", "2025", "64.57", "15.0", "7.53", "11.0", "8.1", "3.9", "2.9", "2×", "2010", "8.3",
    "31", "1999", "$4,319.37",
}
# The sourced annual returns, % (the write-up's Sources table, as teasers/v2/checks/04-chart-race.py holds them):
# S&P 500 total return (S&P DJI data via Slickcharts; 2000-2006 also UMD/Kass, 2007-2025 the 07b cross-checks), and gold's change
# in year-end price 2000-2024 (Visual Capitalist), 2025 from the closes $2,624.60 -> $4,319.37. _GOLD_B: the second gold table's years.
_SPR = {2000: -9.10, 2001: -11.89, 2002: -22.10, 2003: 28.68, 2004: 10.88, 2005: 4.91, 2006: 15.79, 2007: 5.49, 2008: -37.00,
        2009: 26.46, 2010: 15.06, 2011: 2.11, 2012: 16.00, 2013: 32.39, 2014: 13.69, 2015: 1.38, 2016: 11.96, 2017: 21.83,
        2018: -4.38, 2019: 31.49, 2020: 18.40, 2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02, 2025: 17.88}
_GOLDR = {2000: -5.4, 2001: 2.4, 2002: 24.8, 2003: 19.5, 2004: 5.4, 2005: 17.5, 2006: 23.5, 2007: 31.0, 2008: 5.6, 2009: 24.6,
          2010: 29.6, 2011: 10.1, 2012: 7.1, 2013: -28.0, 2014: -1.8, 2015: -10.4, 2016: 8.4, 2017: 13.2, 2018: -1.6, 2019: 18.3,
          2020: 25.1, 2021: -3.6, 2022: -0.4, 2023: 13.2, 2024: 27.2, 2025: (4319.37 / 2624.60 - 1) * 100}
_GOLD_B = {2000: -3.5, 2002: 24.7, 2007: 31.7, 2011: 10.2, 2013: -28.1, 2016: 8.7, 2019: 18.8, 2020: 24.6, 2021: -3.6, 2022: -0.2,
           2023: 13.0, 2024: 27.2, 2025: 64.6}


def _grow(rates, y0=2000, y1=2025, stake=10000.0):
    v, out = stake, {y0 - 1: stake}
    for y in range(y0, y1 + 1):
        v *= 1 + rates[y] / 100
        out[y] = v
    return out


_sp_ye, _gold_ye = _grow(_SPR), _grow(_GOLDR)
_gold_alt = _grow({**_GOLDR, **_GOLD_B})
_spF, _gF = _sp_ye[2025], _gold_ye[2025]
import math as _m
MATH_RELATIONS = [
    (len(_SPR) == 26 == len(_GOLDR), "26 calendar years, 2000-2025"),
    (round(_spF, 2) == 75284.61 and round(_gF, 2) == 149915.35, "$10,000 compounded by the sourced returns: S&P 500 $75,284.61, gold $149,915.35 (the write-up's table)"),
    (all(_gold_ye[y] > _sp_ye[y] for y in range(2000, 2026)), "gold ahead at all 26 year-ends"),
    (round(_spF, -2) == 75300 and round(_gF, -3) == 150000, "finals ≈ $75,300 and ≈ $150,000 (3 significant figures)"),
    (round(_spF / 10000, 2) == 7.53 and round(_gF / 10000, 1) == 15.0, "multiples ≈ ×7.53 and ≈ ×15.0"),
    (round(((_spF / 10000) ** (1 / 26) - 1) * 100, 1) == 8.1 and round(((_gF / 10000) ** (1 / 26) - 1) * 100, 1) == 11.0, "≈ 8.1% and ≈ 11.0% a year over 26 years"),
    (round(_m.log2(_spF / 10000), 1) == 2.9 and round(_m.log2(_gF / 10000), 1) == 3.9, "≈ 2.9 and ≈ 3.9 doublings"),
    (round(_gF / _spF) == 2 and round(_m.log2(_gF / 10000) - _m.log2(_spF / 10000)) == 1, "gold ≈ 2× the S&P 500, ≈ one extra doubling"),
    (round(_sp_ye[2002], 2) == 6239.17 and round((1 - _sp_ye[2002] / 10000) * 100) == 38, "by 2002 the S&P 500 is ≈ −38% ($6,239.17)"),
    (round((_gold_ye[2002] / 10000 - 1) * 100) == 21, "by 2002 gold is ≈ +21% ($12,089.43)"),
    (_GOLDR[2008] == 5.6 and _SPR[2008] == -37.00, "2008: S&P 500 −37.00%, gold +5.6%"),
    (round((1 - _gold_ye[2013] / _gold_ye[2012]) * 100) == 28, "2013: gold ≈ −28% ($58,204.17 → $41,907.00)"),
    (round(_sp_ye[2021]) == 49395 and round(_gold_ye[2021]) == 63518 and _sp_ye[2021] < _gold_ye[2021], "2021: $49,395 still behind $63,518"),
    (round(_GOLDR[2025], 2) == 64.57, "2025: gold +64.57% ($2,624.60 → $4,319.37 an ounce)"),
    (round(_spF / _sp_ye[2009], 1) == 8.3 and round(_gF / _gold_ye[2009], 1) == 3.9 and _spF / _sp_ye[2009] > _gF / _gold_ye[2009],
     "from 2010: ≈ ×8.3 vs ≈ ×3.9, so the S&P 500 wins"),
    (round(_gold_alt[2025], -3) == 154000 and round(_gold_alt[2025] / _spF) == 2, "second gold table: ≈ $154,000, still ≈ 2×"),
]
MATH_SCRIPT = "teasers/v2/checks/04-chart-race.py"
MATH_KEY_LINES = ["04a  S&P 500 ≈ $75,300 (×7.5285) | gold ≈ $150,000 (×14.9915) | ratio 1.991 | 2010 start: S&P ×8.28, gold ×3.94",
                  "gold ahead at all 26 year-ends", "robust: 2nd gold source keeps '≈ 2×'"]
RESULT_RE_TITLE = r"150,0|75,3|154,0|×|2×|doubl|8\.1|11\.0|ahead|[Bb]eat|crush|38|21%|28%|Gold Won|Stocks Won"
RESULT_RE_CAPTION = r"150,0|75,3|154,0|×|2×|doubl|8\.1|11\.0|ahead|won|beat|crush|38|21%|28%|49,395|63,518|64\.57"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it belongs to the right asset or year,
# so a swapped "gold ≈ 8.1%" or "2013: … ≈ 38%" would pass it. These pin each figure to its asset and its year.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_ASSET = _re.compile(r"S&P 500|S&P|[Ss]tocks|[Gg]old")


def _owner(fig, who):
    """every occurrence of fig has, as the nearest asset name before it on its line, the right asset ('sp' or 'gold')"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            before = [a.group() for a in _ASSET.finditer(ln[:m.start()])]
            if not before or ("gold" if before[-1].lower() == "gold" else "sp") != who:
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


def _approx(fig):
    """every occurrence of fig comes right after '≈ ' or 'about '"""
    return all(_re.search(r"(?:≈|about) $", ln[:m.start()]) for ln in _lines() for m in _re.finditer(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?)\b", _re.I)
_SP = [r"\$75,300", r"×7\.53", r"8\.1%", r"×8\.3", r"−38%", r"−37\.00%", r"\$49,395", r"about 38%", r"about 2\.9", r"≈ 2\.9"]
_GOLD = [r"\$150,000", r"\$154,000", r"×15\.0", r"11\.0%", r"×3\.9", r"\+21%", r"\+5\.6%", r"28%", r"\$63,518", r"64\.57%", r"\$4,319\.37", r"2×",
         r"about 21%", r"about 3\.9", r"≈ 3\.9"]
COPY_RULES = [
    (all(_owner(f, "sp") for f in _SP) and all(_owner(f, "gold") for f in _GOLD),
     "every final, multiple, rate and drop sits after its own asset's name (S&P 500/stocks or gold)"),
    (all(_near(f, y) for f, y in [(r"38%", "2002"), (r"21%", "2002"), (r"37\.00", "2008"), (r"5\.6%", "2008"), (r"28%", "2013"),
                                  (r"\$49,395", "2021"), (r"\$63,518", "2021"), (r"64\.57", "2025")]) and _with(r"×8\.3|×3\.9", ("2010",)),
     "each year's figure sits beside its year (2002, 2008, 2013, 2021, 2025, the 2010 start)"),
    (all(_approx(f) for f in (r"\$75,300", r"\$150,000", r"\$154,000", r"×\d", r"(?<![\d×.])(?:8\.1|11\.0|2\.9|3\.9)", r"\b2×",
                               r"[−+]?38%", r"[−+]?21%", r"[−+]?28%")), "every rounded figure, multiple and rate is 'about' or '≈'"),
    (_with(r"8\.1|11\.0", ("a year", "Per year", "per year")), "≈ 8.1% and ≈ 11.0% are always 'a year'"),
    (_with(r"[Gg]old ended", ("≈ 2×", "about 2×")) and _with(r"\$75,300|\$150,000", ("2025",), skip=("caption", "long alt text")),
     "the verdict keeps its ≈ 2×, and the finals keep their 2025 end in the short items"),
    (all("Not affiliated with or endorsed by S&P Dow Jones Indices." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "both platforms carry the affiliation and no-advice lines"),
    (all("2010" in _COPY[k] for k in ("description", "caption", "pinned comment", "first comment")), "the 2010 start-year caveat is in every long item"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"one", "two"},
     "no spelled-out figures beyond 'one' extra doubling, 'Which One' and 'Two lines'"),
]
