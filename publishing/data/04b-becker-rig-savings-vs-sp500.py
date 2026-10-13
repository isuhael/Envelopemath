# 04b publishing data: your $1,000, 16 years of savings vs 1 year of the S&P 500, Jan 2010 to Dec 2025 (Becker rig, chart-race).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06c-becker-rig-latte-starbucks.py (the nearest Becker rig sheet)
# in the newer data-file form of 06b-scoreboard-netflix-bill.py (COPY_RULES).
#
# Facts come only from teasers/v2/04-chart-race.md (section (b) 04b, Decisions, Sources) and
# python3 teasers/v2/checks/04-chart-race.py. Research: vidIQ, pulled 2026-10-13. The render in renders/channel is the
# pre-condense cut; a condensed cut (timing only: numbers, captions and verdict stay) is in studio/specs-wip/, not yet shipped. This sheet names no
# timestamp except the cover, which is picked by content (the payoff card), so the copy carries over; the ship step rebuilds
# it with --covers.

TEASER = "04b Becker rig, chart-race: \"Your $1,000: 16 years of savings VS 1 year of the S&P 500\""
PREPARED = "2026-10-13"
SHORT_ID = "04b"
MD_TITLE = "04b publishing sheet: 16 years of savings vs 1 year of the S&P 500"
MATH_RUN = "657 checks, 0 failed"      # python3 teasers/v2/checks/04-chart-race.py on studio/specs/ (the round-2 cuts), re-run at the adversarial check 2026-10-13
MATH_RUN_WIP = "698 checks, 0 failed"  # the same script with --spec on the three condensed cuts in studio/specs-wip/, 2026-10-13
MATH_RUN_FIRST = "614 checks, 0 failed"  # at the first build, before the condense's check-script update

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the hook-pass-2 Becker rig cut as `renders/channel` holds it on 2026-10-13. A condensed cut is built in `studio/specs-wip/` and not yet shipped (timing only: the numbers, captions and verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the payoff card), so the copy carries over. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/04-chart-race.md` (04b) and its check, "
    f"`python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/` (run 2026-10-13), so the copy's figures hold on both cuts. "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every figure from the FDIC and S&P 500 tables, "
    "re-runs the check's 2,916-table sweep over the uncertain FDIC inputs, keeps each figure with its own side (savings or the S&P 500) and each year's figure beside its year.",
    "- **Honesty rules kept.** The title asks and never gives the answer. The Instagram caption keeps every result below 'more'. The savings figures are the ones that hold in every "
    "plausible FDIC table (under $30, ≈ $1,020, ≈ $680); the dollar-and-cents $1,023.85 is never shown, as in the video. The copy says the rate is the national average, not a high-yield rate, "
    "names 2010 wherever it gives the verdict, and says which years made less (2011, 2015) or lost (2018, 2022). No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"S&P 500\" names the index the maths is about (S&P Dow Jones Indices' total-return series); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' The FDIC, FRED and BLS are named only as data sources. No logos in the video; no share price is named.",
    "- **Cover.** The write-up names the payoff card as this Reel's cover (frame 1 as its A/B), so unlike 04a and 04c the cover shows the answer to the title's question. See the cover section.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds on 2026-10-13: the pre-condense cut. The ship step rebuilds this file with --covers from the condensed cut.")
CUT = {"name": "pre-condense (hook-pass-2 Becker rig cut)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "status": "in renders/channel on 2026-10-13 (git 471c793); a condensed cut (timing only) is in studio/specs-wip/, not yet shipped",
       "on_ship": f"python3 publishing/tools/build_publishing.py {BASE} --covers (re-picks the cover by content, re-exports both JPGs, refreshes for_video)"}

FACTS = {
    "source": f"teasers/v2/04-chart-race.md section (b) 04b; teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/, {MATH_RUN_WIP} with --spec on the condensed cuts (2026-10-13)",
    "stake": "$1,000 in each, from the Dec 31, 2009 close to the Dec 31, 2025 close (Jan 2010 → Dec 2025, 16 years)",
    "savings": "compounded once a year at that year's January FDIC national average savings rate (APY): 2010 0.21, 2012 0.11, 2014-2018 0.06, 2020 0.09, 2021 0.06 (April, the first reading of FDIC's revised series), "
               "2022 0.06, 2023 0.33, 2024 0.47, 2025 0.41 %; 2011, 2013, 2015, 2017 and 2019 are the midpoint of their neighbours (not found); under 0.5% a year throughout",
    "year_one": "the S&P 500's 2010 total return, +15.06%: $1,000 × 15.06% = $150.60 ≈ $151",
    "interest_16": "$1,023.85 − $1,000 = $23.85, under $30; $22.62-$24.97 across the check's 2,916-table sweep, about $26.97 at worst with the January-rate model's 2022-2023 understatement",
    "finals": "S&P 500 $8,283.66 ≈ $8,280 (≈ ×8.28); savings $1,023.85 ≈ $1,020 (≈ ×1.02), 3 significant figures (the dollar digit rests on the midpoint years)",
    "beats": "2014: the S&P 500's first year-end at 2× ($2,051.29), savings interest $6.26 (under $10); 2020: the S&P 500 passes $4,000 ($4,222.70 close); 2022: −18.11%",
    "not_cherry_picked": "16-year CAGR 8.28366^(1/16) − 1 = 14.13% ≈ 14.1%; 2010's 15.06% sits next to it; best year 2013 (+32.39%)",
    "years_that_made_less": "on $1,000: 2011 +2.11% ≈ $21, 2015 +1.38% ≈ $14; 2018 (−4.38%) and 2022 (−18.11%) lost money",
    "prices": "CPI-U Dec 2025 ÷ Dec 2009 = 324.054 ÷ 215.949 = 1.50060 (≈ 50%); $1,023.85 ÷ 1.50060 = $682.29 ≈ $680 in 2010 dollars (≈ 32% of buying power lost)",
    "max_rate": "$1,000 × 1.0047^16 = $1,077.91 ≈ $1,078 (0.47%, the highest January rate in the table, every year)",
    "verdict": "The S&P 500's 2010 alone beat 16 years of savings (≈ +$151 vs under +$30, on the payoff card)",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "What If You Kept $1,000 in a Savings Account for 16 Years? Can It Beat 1 Year of the S&P 500?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 98,
     "note": "PICK. Top score, 10 points over the write-up's title. The 'what if you …' grammar the channel's best titles score on, the stake, 'savings account' "
             "in the first 40 characters, then the video's own handicap question."},
    {"rank": 2, "title": "What If You Put $1,000 in Savings and $1,000 in the S&P 500 in 2010? Can 16 Years Beat 1?", "vidiq_score": 98,
     "note": "Same score; it names 2010, but 'Can 16 Years Beat 1?' reads as a riddle until the video explains it."},
    {"rank": 3, "title": "What If You Kept $1,000 in a Savings Account for 16 Years? #SavingsAccount #sp500 #investing", "vidiq_score": 90,
     "note": "The house 3-hashtag form, paste-ready: its hashtags are the description's first three. 06b and 06c went up with titles in this form. It drops the handicap question to fit."},
]
YT_TITLES_ALSO_SCORED = [
    ("What If You Kept $1,000 in an Average Savings Account for 16 Years? Can It Beat 1 Year of Stocks?", 96,
     "names the basis in the title, 2 points under the pick, and trades 'the S&P 500' for 'Stocks' to fit; the description's and the caption's first lines say 'national average' instead"),
    ("Can 16 Years in a Savings Account Beat 1 Year in the S&P 500?", 88, "the write-up's title: the handicap duel in 61 characters, without the stake"),
    ("Can 16 Years in a Savings Account Beat 1 Year in the S&P 500? #savings #sp500 #investing", 88,
     "the house 3-hashtag form of the write-up's title; '#savings' is not among the description's first three hashtags, so it can't be pasted as is"),
    ("16 Years of Savings Interest vs 1 Year of the S&P 500", 87, "the write-up's A/B title"),
    ("Your $1,000: Can 16 Years of Savings Interest Beat 1 Year of the S&P 500?", 86, "the on-screen header as a question"),
    ("Savings Account vs S&P 500: Can 16 Years of Interest Beat 1 Year of Stocks?", 85, "keyword-first"),
]
TITLE_BULLETS = [
    "It raises the write-up's title from 88 to 98, and keeps its question whole: 16 years of savings against 1 year of the S&P 500. 'It' is the savings account, so the question "
    "compares the two gains, as the video's payoff card does.",
    "No answer in it: the only figures are the stake and the handicap (16 years vs 1), all on frame 1's header. The answer (the S&P 500's 2010 alone) is what the video pays off.",
    "The '1 Year' is 2010; the description, the caption and the pinned comment name it, say 2010 was a typical year, and give the years that made less.",
    "The savings rate is the FDIC national average, not a high-yield rate. The title says 'a Savings Account', as the write-up's does, and the first line of the description and of the caption say 'national average'. "
    "'An Average Savings Account' scores 96 if you want the basis in the title too (see 'also scored').",
    "06b and 06c went up with the house 3-hashtag form in the title. To post this one that way, paste option 3 as it stands: its hashtags are the description's first three, as YouTube needs.",
]

YT_DESCRIPTION = """Can 16 years in a savings account beat 1 year in the S&P 500? $1,000 at the FDIC national average savings rate earned under $30 of interest from Jan 2010 to Dec 2025: about $1,020 in all. The same $1,000 in the S&P 500, with dividends reinvested, made about $151 in 2010 alone.

The math, shown:
• Savings: each January's FDIC national average rate, compounded once a year. It stays under 0.5% a year, and 16 years of interest come to under $30.
• S&P 500: 2010's total return was +15.06%, so $1,000 made $150.60, about $151, in its first year.
• By 2014 the S&P 500 had doubled. Savings: under $10 of interest so far.
• 2020: the S&P 500 tops $4,000.
• 2022: the S&P 500 drops ≈ 18%.
• End of 2025: the S&P 500 ≈ $8,280 (≈ ×8.28), savings ≈ $1,020 (≈ ×1.02).
• So the S&P 500's 2010 alone (≈ +$151) beat 16 years of savings (under +$30).
• 2010 wasn't a lucky pick: the S&P 500 averaged ≈ 14.1% a year over these 16 years. But some years made less: on $1,000 it made ≈ $21 in 2011 and ≈ $14 in 2015, and lost money in 2018 and 2022.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Savings: the FDIC national average savings rate, the January reading of each year (Forbes Advisor and wealthvieu for 2010-2020; FRED series SNDR for 2021-2025), compounded once a year. Januaries that could not be found are the midpoint of their neighbours, and 2021 uses FDIC's April reading; across every plausible value of those inputs, 16 years of interest stay under $30. It is the national average, not a high-yield rate. S&P 500: total return by year, dividends reinvested (S&P Dow Jones Indices data via Slickcharts). Prices rose about 50% over the same years (CPI-U, BLS), so savings' about $1,020 buys what about $680 did in 2010. No fees or tax. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#SavingsAccount #sp500 #investing"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the verdict compares one named year with 16 years of a national average, which the copy spells out, "
             "so 'a number that shouldn't be true' would oversell it. The buying-power line (≈ $680) is the twist the write-up moved to the pinned comment; it sits in the credit paragraph here too.")

YT_HASHTAGS = ["#SavingsAccount", "#sp500", "#investing"]
YT_HASHTAG_NOTES = [
    ("#SavingsAccount", "the side the belief is about. Savings accounts are a live search ('high yield savings account' 56,330 a month, +77.0% on its 30-day baseline), "
                        "though this video uses the national average, not a high-yield rate."),
    ("#sp500", "the rival ('s&p 500' 95,512 a month), the index the video races."),
    ("#investing", "the broad layer ('investing' 613,566 a month, flat) and the other half of 'saving vs investing' (32,141), the video's question."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["saving vs investing", "savings account", "savings account interest", "s&p 500", "s&p 500 total return", "compound interest",
           "what if you invested", "what if you invested $1000 in", "stock market", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. "
             "Left out on purpose: 'high yield savings account' (56,330, +77.0%) and 'best high yield savings account' (25,784) are product shopping, and this video uses the national average; "
             "'savings account vs investing', the seed, is under 750 a month.")

YT_PINNED = """What does your savings account pay? Even at the highest January rate in our table, 0.47%, every single year since 2010, savings would be ≈ $1,078.

2010 wasn't a lucky pick: the S&P 500 averaged ≈ 14.1% a year over these 16 years, and 2010 was +15.06%. But not every year wins: on $1,000 the S&P 500 made ≈ $21 in 2011 and ≈ $14 in 2015, and lost money in 2018 and 2022. And prices rose ≈ 50% (CPI-U), so savings' ≈ $1,020 buys what ≈ $680 did in 2010.

Swap in your own amount: the S&P 500 ≈ ×8.28, average savings ≈ ×1.02."""
PINNED_NOTE = ("The write-up's pinned comment, reordered so its question shows first in the collapsed preview and every multiple sits after its own side. "
               "It answers the comments to expect: 'my account pays 4%' (the video uses the national average and the copy says so; even 0.47%, the table's highest January, every year gives ≈ $1,078), "
               "'you picked a good year' (2010 sat next to the 16-year average, and the weaker years are named), and it carries the buying-power twist the write-up moved here.")

RELATED_VIDEO = {
    "pick": {"id": "XVUeMcTg9OQ", "title": "Your Interest Has a Speed Limit",
             "url": "https://www.youtube.com/shorts/XVUeMcTg9OQ",
             "why": "The same 'interest' viewer: what compounding can and can't do. It is the channel's most-engaged October Short (1,141 views, 28 likes, 6 comments, breakout score 21.3). Live since Sun 4 Oct 2026."},
    "swap_when_live": "04a or 04c, the other chart races, once published; then point one of them at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the payoff-card frame (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick the payoff-card frame (the 'under +$30' stub against the full '≈ +$151' bar), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 04b condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one chart race (04a, 04b, 04c) per evening.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'high yield savings account' is up 77.0% on its 30-day baseline, so savings rates are in people's searches; 'saving vs investing' is down 45.2%.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "Can 16 years of savings beat 1 year of stocks? $1,000 in a savings account at the national average vs $1,000 in the S&P 500, from 2010."

IG_CAPTION = IG_HOOK + """

POV: your $1,000. Savings gets 16 years to match what the S&P 500 made in its first year.

The math, shown:
• The S&P 500 in 2010: +15.06%, so $1,000 made ≈ $151.
• Savings: each January's FDIC national average rate, under 0.5% a year throughout.
• By 2014 the S&P 500 had doubled. Savings: under $10 of interest so far.
• 2022: the S&P 500 drops ≈ 18%.
• End of 2025: savings ≈ $1,020, under $30 of interest in 16 years. The S&P 500 ≈ $8,280.

The S&P 500's 2010 alone beat 16 years of savings.

2010 wasn't a lucky pick: the S&P 500 averaged ≈ 14.1% a year. But not every year wins: on $1,000 it made ≈ $21 in 2011 and ≈ $14 in 2015, and lost money in 2018 and 2022. And prices rose ≈ 50%, so savings' ≈ $1,020 buys what ≈ $680 did in 2010.

S&P 500 with dividends reinvested. No fees or tax. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

What does your savings account pay?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#savingsaccount #sp500 #investing #personalfinance #compoundinterest"""
IG_CAPTION_RULE = ("The first 125 characters are the write-up's caption line 1 ('Can 16 years of savings beat 1 year of stocks?') and the setup, with the 'savings account' and 'S&P 500' keywords "
                   "and no result: the caption overlays the Reel from frame 1, so every result sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the write-up's caption line 1, then the stake, the national-average basis and the start year. The only figures are the stake, the 16 years, the 1 year and 2010, all on the header. "
    "The results sit below 'more', where Instagram search and Google indexing still read them.",
    "The paragraph after the verdict is the write-up's pinned comment in short: 2010 was a typical year, the weaker years by name, and the buying-power twist.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#savingsaccount", "#sp500", "#investing", "#personalfinance", "#compoundinterest"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#savingsaccount` and `#sp500` name the two sides.",
    "- `#compoundinterest` is what both lines do (137,873 searches a month) and the tag on the channel's 'Your Interest Has a Speed Limit', the related video.",
    "",
    "`#investing` and `#personalfinance` are the broad layer, as on 06b.",
]

IG_ALT_SHORT = "Chart, $1,000 from 2010: the S&P 500 made about $151 in 2010 alone; savings, under $30 in 16 years."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', so screen readers read it cleanly, "
                     "and keeps 'under $30' as a bound, as everywhere else.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'to' and 'about' instead of '-' and '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page: two stick figures each climb their own line from 2010 to 2025. Header: Your $1,000: 16 years of savings VS 1 year of the S&P 500. "
               "The S&P 500 figure cheers its first year, about $151, which becomes the savings figure's goal. The S&P 500 doubles by 2014, tops $4,000 in 2020 and drops "
               "about 18% in 2022, while savings crawls along the bottom, still under $10 of interest midway. Finish: the S&P 500 about $8,280; savings about $1,020, "
               "under $30 of interest in 16 years. A payoff card draws the two gains to scale: savings under $30, the S&P 500 about $151. "
               "Verdict: the S&P 500's 2010 alone beat 16 years of savings.")

IG_FIRST_COMMENT = ("16 years of interest at the national average savings rate: under $30. The S&P 500's 2010 on its own: ≈ $151. "
                    "What does your savings account pay?")

# ---------------------------------------------------------------- the cover frame
# The payoff card, picked by content: the write-up's Instagram note says "Cover = the 29.5 s frame (the payoff card: the grey
# 'under +$30' stub on its dashed track against the full green '≈ +$151' bar, the dimmed gold '≈ $8,280' beside it) as an A/B
# against frame 1". On the pre-condense render the card's S&P row lands with a punch at 28.87 s (frame 866), the frame settles by
# 29.40 s (frame 882) and holds still (mean frame-to-frame luma change 0.0000, 270x480 greyscale) until the verdict at 32.70 s.
COVER_T = 29.5
COVER_FRAME = 885
COVER_CROP = "crop=1080:1440:0:50"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The payoff card, which the write-up names as the Instagram cover: the header 'Your $1,000: 16 years of savings / VS 1 year of the S&P 500' with $1,000 the only accent, "
                          "the footer 'Savings: FDIC avg · S&P w/ dividends', and over the finished race the card: '16 years of savings / under +$30' with a grey stub on its dashed track, "
                          "and 'S&P 500 in 2010 / ≈ +$151' with a full green bar. Beside it the S&P figure stands on its '≈ $8,280' plate and the grey figure sits at '≈ $1,020'; "
                          "the caption reads 'The S&P's first year alone: ≈ $151.' Use the first settled frame after the card's S&P row lands, before the verdict comes in.")
COVER_FRAME_MEASURED = ("On the pre-condense 38.5 s render the card's S&P row lands with a punch at 28.87 s (frame 866), the frame settles by 29.40 s (frame 882) and then holds still "
                        "(mean frame-to-frame luma change 0.0000, 270×480 greyscale) until the verdict comes in at 32.70 s. The cover is taken at 29.5 s (frame 885), the write-up's own time, inside that hold.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 50 to 1490 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1428 (the caption), "
                   "so the crop centres it: badge, header, footer, the card, both figures, the axis and the caption; it drops the empty page below. "
                   "A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the payoff-card frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Why the answer is on this cover:** the write-up picks the payoff card for this Reel (the Becker look's test: the benchmark has no Becker-style precedent) and names frame 1 as its A/B. "
    "Frame 1 is the header over two small figures at the stake line and an empty page; the card is the biggest thing the video draws. The title and the caption's first 125 characters still ask.",
    "**Not used:** frame 1 (the header, both figures at the $1,000 line, tips '$1,041' and '$1,001'). It keeps the question open; it is the A/B in Trial Reels below.",
    "**Condensed cut:** the ship step re-picks this frame by content on the final file and re-exports both JPGs with `--covers`. On the condensed cut the hero punches the air as the card's S&P row lands and then hops into the verdict, "
    "so there is no fully still frame there: take the one after the card's shake and before his last hop (the write-up's choice), or any frame of the verdict hold, where the card stays up.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "The write-up's cover A/B afterwards, if you want it: the other cut with frame 1 as its cover, as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut ships, the pre-condense render "
                     "is in git: `git show 471c793:renders/channel/04b-becker-rig-savings-vs-sp500.mp4 > 04b-pre-condense.mp4` (sha256 8d243eee…). Compare skip rate "
                     "(October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to '16 years of savings vs 1 year of the S&P 500 — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("investing (topic)", 613566, 86.4, 65.0, 65.8, "-2.0% vs its 30-day baseline (626,326)", "2026-10-12"),
    ("compound interest", 137873, 76.7, 50.6, 65.8, "-17.3% vs its baseline (166,772)", "2026-10-12"),
    ("s&p 500 (topic)", 95512, 74.3, 63.1, 59.4, "-33.1% vs its baseline (142,756)", "2026-10-12"),
    ("high yield savings account", 56330, 70.9, 46.7, 63.9, "+77.0% vs its baseline (31,816), 65% of it US; product shopping, and the video uses the national average, so not a tag", "2026-10-12"),
    ("saving", 39177, 68.6, 61.0, 56.7, "-41.3% vs its baseline (66,734)", "2026-10-12"),
    ("saving vs investing", 32141, 67.3, 39.7, 64.5, "the video's question; -45.2% vs its baseline (58,623)", "2026-10-12"),
    ("best high yield savings account", 25784, 65.9, 42.6, 62.5, "-12.1%; product shopping, not a tag", "2026-10-12"),
    ("high yield savings account explained", 10482, 60.0, 32.2, 63.1, "flat (+0.2%)", "2026-10-12"),
    ("what every american with a savings account should know — and do", 8897, 59.0, 18.5, 68.0, "a searched video title", "2026-10-12"),
    ("the savings account trap nobody warns you about", 8784, 58.9, 13.5, 69.9, "a searched video title: the 'savings loses' angle at low competition", "2026-05-28"),
    ("what if you invested $1000 in", 4986, 55.2, 39.7, 57.2, "the stake grammar", "2026-10-12"),
    ("savings account vs investing", 0, 0, 37.0, 25.2, "<750/month (overall 25.2): the seed, too small to target", None),
]
KEYWORD_MD_NOTE = {"savings account vs investing": "<750/month: the seed, too small to target"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for 'savings account vs investing' with US volumes; matching_terms for 'savings account' and 'what if you invested'), pulled 2026-10-13. "
                   "vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-05-28).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("'saving vs investing' (32,141 a month, competition 39.7) is the video's question, though it is down 45.2% on its baseline. Savings accounts themselves are rising "
            "('high yield savings account' +77.0%, mostly US), which is the audience the hook's belief comes from, but those searchers want a product, so the copy names the national average plainly "
            "instead of chasing the phrase. Two searched video titles ('the savings account trap nobody warns you about', 'what every american with a savings account should know') sit at low competition: "
            "the 'savings loses' angle has demand.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("When To Use an Index Fund vs a High Yield Savings Account", "George Kamel", 616000, 28829, "2026-01-11", "advice framing"),
    ("HYSA vs. S&P 500: Are You Playing It Too Safe?", "Simply Money", 112000, 1970, "2025-06-30"),
    ("I put $1,000 in the S&P 500 in 1950… 😳 #Shorts #stockmarket #stocks #money", "marketsense", 3, 1348, "2026-05-08", "its description sets a savings account against it"),
    ("DAY 11 - Your Money Doesn’t Grow in a Savings Account — Here’s Why", "GProf Trades", 74, 331, "2025-11-10"),
    ("Trump Account vs Savings Account: What $1,000 Invested in the S&P 500 Actually Did Over 18 Years", "Asset vs. Time", 1400, 89, "2026-06-02",
     "the same inputs as ours (FDIC national rate via FRED SNDR, S&P 500 total return), from 2007; not checked here"),
    ("\"$1,000 In Savings vs Stocks: Here's What Actually Won\"", "PawMind", 46, 35, "2026-07-03"),
    ("$1,000 Saved vs $1,000 Invested: What 10 Years Does to Your Money", "Billion Dollar Industries", 8, 27, "2026-07-19"),
    ("$1,000 invested in S&P 500 10 years ago...😳", "Money Mechanics", 10, 9, "2026-06-18"),
    ("What the Average Savings Account Does to $1,000", "Quiet Wealth", 1, 3, "2026-08-06"),
    ("$1,000 in 2016: Savings vs S&P 500 vs Bitcoin — The Gap Will Shock You", "Deadpieee", 1, 0, "2026-08-13"),
]
SAME_IDEA_HEADING = "**2. $1,000 in savings vs the S&P 500 is crowded and small; nobody runs the handicap (vidIQ YouTube search, under 4 min, since 2025).**"
SAME_IDEA_MD = [
    "Ten Shorts since 2025 set $1,000 in savings against the S&P 500. Nine are under 2,000 views, and the one above them, George Kamel's (28,829), is advice ('When To Use…'). "
    "Most give the answer in the title ('Here's What Actually Won', 'The Gap Will Shock You'), and Asset vs. Time's Short uses the same inputs as this one (the FDIC national rate, S&P 500 total return) "
    "under a statement title, for 89 views. None runs the handicap: 16 years of savings against one year of stocks. The pick asks that question.",
    "",
    "Next door, the 'start early' comparisons travel on Instagram and TikTok with static text and music (section 3).",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min, by relevance since 2025): 10 savings-vs-S&P 500 Shorts, 9 under 2,000 views; the biggest (George Kamel, 28,829) is advice. "
                  "Most titles state the result; none uses the 16-years-vs-1-year handicap.")

OUTLIERS = [
    {"handle": "@matildehere", "platform": "Instagram", "id": "Da1U--ZBjmv",
     "on_screen": "Saving VS investing 10k 10 years ago", "views": "534.5K (122.1x the account median of 4.4K)",
     "note": "this Short's comparison as a split screen, music only"},
    {"handle": "@josuesegoviano2", "platform": "TikTok", "id": "7662941262143638798",
     "on_screen": "Open a High yield savings account", "views": "318.2K (77.9x)",
     "note": "the high-yield pitch: the belief the hook plants, from the other side"},
    {"handle": "@itsshwetadawar", "platform": "Instagram", "id": "DcNJSV8A0Fg",
     "on_screen": "Why starting a Roth IRA early is important", "views": "1.3M (156.5x the account median of 8.2K)",
     "note": "two choices, one number, static text and music"},
    {"handle": "@race_charts", "platform": "Instagram", "id": "Dct04VesZPy",
     "on_screen": "SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD", "views": "1.6M (60.9x the account median of 26.7K)",
     "note": "two lines diverging from frame 1, music only: the race format"},
]
OUTLIERS_HEADING = "**3. 'Saving vs investing' travels on Instagram and TikTok as a two-sided picture with music (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@matildehere** (Instagram), \"Saving VS investing 10k 10 years ago\": 534.5K (122.1x). The same comparison as a split screen, music only.",
    "- **@itsshwetadawar** (Instagram), \"Why starting a Roth IRA early is important\": 1.3M (156.5x). Two choices and one number in static text, with music.",
    "- **@josuesegoviano2** (TikTok), \"Open a High yield savings account\": 318.2K (77.9x). The high-yield pitch the hook's belief comes from.",
    "- **@race_charts** (Instagram), \"SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD\": 1.6M (60.9x). The two-line race, music only.",
    "- None found runs a handicap (years of one against a year of the other); the travelling posts set two choices side by side and let the gap speak, which the payoff card does.",
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
    "The channel's interest Shorts split by platform: 'Your Interest Has a Speed Limit' is its most-engaged YouTube Short (1,141 views, 28 likes, 6 comments) but drew 177 plays "
    "and a 56.9% skip on Instagram, while '10 years late' (also compounding) skipped 65.1%. This is the first Becker rig race on the channel, so the cover A/B in Trial Reels is worth running.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "As the 06b and 02b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the pre-condense cut. The cover's time and frame are measured on it; the copy names no other timestamp, and the ship step re-picks the cover on the final file.",
    "Several FDIC readings are [click-check] rows in the write-up's sources (seen in search summaries, not on the page). The copy shows only figures that hold across the check's 2,916-table sweep.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel, so this sheet's spend is counted from each tool's listed cost (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "How Much Can You Make By Investing In The S&P 500?", "channel": "@themakeshiftproject (Instagram)", "subscribers": 1000000, "views": 948100,
         "published": "since 2025-10", "note": "Instagram Reel DceeezJKxV4, 6.7x the account median; talking heads"},
    ],
    "titles_scored": "9 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 7 at the first build, the hashtag form and the 'Average Savings Account' variant at the adversarial check (the pick re-scored); all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "04b: 85 by listed cost (2 keyword pulls × 20, 1 YouTube search × 5, 1 IG/TikTok outlier search × 5, 7 title scores × 5), plus a third of the format's "
                     "30 shared credits (channel stats 5, channel videos 5, the 'what if you invested' matching terms 20); 310 for the three 04 sheets. Account balance: 6,010 at the start, "
                     "5,625 when the 04 research ended (a 385 drop, so at least 75 were parallel sheets' calls), 5,385 at the end of the build with no further 04 calls. "
                     "The adversarial check of the three 04 sheets: 3,945 → 3,885, a 60-credit drop at most (the balance is shared) for 7 title scores, 3 keyword pulls and 1 video lookup; "
                     "this sheet's share is 3 title scores and the 'saving vs investing' pull.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/04-chart-race.py: {MATH_RUN} on studio/specs/ (the round-2 cuts; {MATH_RUN_FIRST} at the first build, before the condense's check-script update), "
                f"re-run at the adversarial check 2026-10-13; with --spec on the three studio/specs-wip/ condensed cuts {MATH_RUN_WIP}, so the copy's figures hold on both cuts; every public figure traced to the 04b tables and "
                "recomputed in MATH_RELATIONS from the FDIC, S&P 500 and CPI-U inputs, including the 2,916-table FDIC sweep; each figure pinned to its own side and its year (COPY_RULES)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: saving vs investing 32,141 / 39.7 (-45.2%); high yield savings account 56,330 (+77.0%); savings account vs investing <750; "
                   "7 titles scored: pick 98, write-up's title 88; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days. "
                   "Re-queried at the adversarial check: the pick's title score 98; 'saving vs investing' 32,141 / 39.7 (-45.2%); 'compound interest' 137,873 (-17.3%); 'investing' 613,566 (-2.0%); "
                   "'Your Interest Has a Speed Limit' (XVUeMcTg9OQ) 1,141 views, 28 likes, 6 comments. All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/04-chart-race.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed cuts in `studio/specs-wip/`. Every public figure traces to the 04b tables: 2010 +15.06% → $150.60 ≈ $151; 16 years of interest $23.85, "
    "under $30 in all 2,916 tables; savings ≈ $1,020 (≈ ×1.02), the S&P 500 ≈ $8,280 (≈ ×8.28); doubled by 2014; over $4,000 in 2020; 2022 ≈ −18%; ≈ 14.1% a year; "
    "2011 ≈ $21, 2015 ≈ $14; prices ≈ +50%, ≈ $680; 0.47% every year ≈ $1,078. The data file recomputes each, the sweep included.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 7 titles scored against this channel: the pick 98, the write-up's title 88, its A/B title 87. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** At the adversarial check: the pick's title score 98; 'saving vs investing' 32,141 / 39.7 (−45.2%); 'compound interest' 137,873 (−17.3%); "
    "'investing' 613,566 (−2.0%); the related video, 'Your Interest Has a Speed Limit', 1,141 views, 28 likes, 6 comments. All match.",
    "- **Changed.**",
    f"  - The math run said {MATH_RUN_FIRST}: the condense updated the check script since, and it now runs {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the condensed cuts. "
    "The 04b key lines the builder looks for are the cut-independent ones (the finals and the year-1 gain, the 2,916-table sweep, the pinned years), so the check keeps passing when the condensed cut is promoted.",
    "  - Title option 3 is now the paste-ready hashtag form, '… for 16 Years? #SavingsAccount #sp500 #investing' (vidIQ 90): 06b and 06c went up with hashtag titles, and the only hashtag form on the sheet "
    "used '#savings', which is not among the description's first three. The write-up's title moved to 'also scored'.",
    "  - Scored 'What If You Kept $1,000 in an Average Savings Account for 16 Years? Can It Beat 1 Year of Stocks?' (96), which puts the national-average basis in the title. The pick stays (98), "
    "since the description's and the caption's first lines say 'national average'; the title bullets name the option.",
    "  - The Instagram first comment said '16 years of savings interest: under $30' with no basis; it now says 'at the national average savings rate', as every other long item does.",
    "  - `#sp500` was 'the tag the same-idea Shorts use': none of the 10 same-idea titles carries it. The note now just names the index.",
    "  - The pinned-comment note said 'the national average is what most accounts paid', which the write-up does not say; it now says the copy names the national average.",
    "  - The cover note for the condensed cut asked for 'the first settled frame after the card's S&P row lands'. On the condensed cut the hero punches the air and hops into the verdict, so no frame there is still; "
    "the note now gives the write-up's pick by content (after the card's shake, before the last hop) or a verdict-hold frame.",
    "- **Checked.**",
    "  - Platform limits: title 93/100 with no hashtags (the description's first three show above it), description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags, short alt text 99.",
    "  - The cover JPGs (read by eye) show the payoff card ('under +$30' stub vs the full '≈ +$151' bar), the '≈ $8,280' plate and the '≈ $1,020' label, with the caption 'The S&P's first year alone: ≈ $151.'",
    "  - Frame 1's tips, '$1,041' and '$1,001', are the same on the condensed cut (x 2010.2667 vs 2010.2665 in the write-up), so the A/B note holds.",
    "  - The pre-condense render in git (`471c793`) has the same sha256 as `renders/channel` today (`8d243eee…`), so the Trial Reels `git show` command fetches this file.",
    "  - No result in the title, which asks; the cover shows the answer, as the write-up chooses for this Reel, and the sheet says so.",
    "- **Mutation test.** Five mutations of a scratch copy each fail by name: the two finals swapped between savings and the S&P 500, the savings final to the cent ($1,023.85), 2011's and 2015's figures swapped, 'under $30' turned into '$30', and the verdict without 2010. At the adversarial check, 2 more on scratch copies also fail by name: $23.85 in the first comment, and a pick whose hashtags ('#savings') are not the description's first three. The files on disk were not touched.",
    "- **Generator.** Unchanged. The 04 check already prints the builder's 'N checks, F failed' line, so `MATH_SCRIPT` runs it directly.",
    "- **Kept on purpose.**",
    "  - The savings final is ≈ $1,020 everywhere; $1,023.85 and $23.85 never appear in the copy (their last digits rest on the midpoint years), and 'under $30' stays a bound.",
    "  - 'It is the national average, not a high-yield rate': the hook's belief comes from today's high-yield accounts (the write-up's R5), so the copy names the basis plainly.",
    "  - The cover shows the payoff card, as the write-up names it; frame 1 is the A/B.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 04b maths (teasers/v2/04-chart-race.md, section (b) 04b) and recomputed
# below from its inputs; dates are inputs from the write-up.
FIGURES = {
    "$1,000", "16", "1", "2010", "2025", "$30", "$1,020", "$151", "$150.60", "15.06", "0.5", "2014", "$10", "2020", "$4,000", "2022", "18",
    "$8,280", "8.28", "1.02", "14.1", "2011", "$21", "2015", "$14", "2018", "50", "$680", "0.47", "$1,078", "500", "2021", "2009",
    "$1000",   # the stake as the searched tag spells it ("what if you invested $1000 in", 4,986 a month)
}
# The inputs, as teasers/v2/checks/04-chart-race.py holds them (write-up Sources): S&P 500 total return %, FDIC January national
# savings rate % (APY; midpoint years filled below), CPI-U Dec 2009 and Dec 2025.
_SPR = {2010: 15.06, 2011: 2.11, 2012: 16.00, 2013: 32.39, 2014: 13.69, 2015: 1.38, 2016: 11.96, 2017: 21.83, 2018: -4.38, 2019: 31.49,
        2020: 18.40, 2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02, 2025: 17.88}
_FDIC_KNOWN = {2010: 0.21, 2012: 0.11, 2014: 0.06, 2016: 0.06, 2018: 0.06, 2020: 0.09, 2021: 0.06, 2022: 0.06, 2023: 0.33, 2024: 0.47, 2025: 0.41}
_MID = [2011, 2013, 2015, 2017, 2019]
_CPI09, _CPI25 = 215.949, 324.054


def _grow(rates, stake=1000.0):
    v, out = stake, {2009: stake}
    for y in range(2010, 2026):
        v *= 1 + rates[y] / 100
        out[y] = v
    return out


_fdic = {**_FDIC_KNOWN, **{y: (_FDIC_KNOWN[y - 1] + _FDIC_KNOWN[y + 1]) / 2 for y in _MID}}
_sp, _sv = _grow(_SPR), _grow(_fdic)
_infl = _CPI25 / _CPI09
# the check's sweep: Jan 2010 in {0.21, 0.22}, 2021 in {0.04, 0.05, 0.06}, Jan 2024 in {0.46, 0.47}, each midpoint year at its left
# neighbour, the midpoint or its right neighbour: 2 × 3 × 2 × 3^5 = 2,916 tables
import itertools as _it
_finals = []
for _a, _b, _c in _it.product([0.21, 0.22], [0.04, 0.05, 0.06], [0.46, 0.47]):
    _k = {**_FDIC_KNOWN, 2010: _a, 2021: _b, 2024: _c}
    for _pick in _it.product((0, 1, 2), repeat=5):
        _t = dict(_k)
        for _y, _p in zip(_MID, _pick):
            _t[_y] = (_k[_y - 1], (_k[_y - 1] + _k[_y + 1]) / 2, _k[_y + 1])[_p]
        _finals.append(_grow(_t)[2025])
MATH_RELATIONS = [
    (len(_SPR) == 16 and max(_fdic.values()) < 0.5, "16 years, 2010-2025; every January rate under 0.5%"),
    (round(_sp[2010] - 1000, 2) == 150.60 and round(_sp[2010] - 1000) == 151, "2010: $1,000 × 15.06% = $150.60 ≈ $151"),
    (round(_sv[2025], 2) == 1023.85 and _sv[2025] - 1000 < 30, "savings: $1,023.85, so $23.85 of interest, under $30"),
    (len(_finals) == 2916 and all(round(f, -1) == 1020 and f - 1000 + 2.0 < 30 for f in _finals),
     "all 2,916 FDIC tables: ≈ $1,020, and interest under $30 even with the 2022-2023 understatement (+$2)"),
    (round(_sp[2025], -1) == 8280 and round(_sp[2025] / 1000, 2) == 8.28 and round(_sv[2025] / 1000, 2) == 1.02, "finals ≈ $8,280 (≈ ×8.28) and ≈ $1,020 (≈ ×1.02)"),
    (min(y for y in _sp if y >= 2010 and _sp[y] >= 2000) == 2014 and _sv[2014] - 1000 < 10, "2014: the S&P 500's first year-end at 2×; savings interest under $10"),
    (_sp[2019] < 4000 < _sp[2020] and all(_sp[y] > 4000 for y in range(2020, 2026)), "2020: the S&P 500 tops $4,000 and stays over it"),
    (round(-_SPR[2022]) == 18, "2022: −18.11% ≈ 18%"),
    (round(((_sp[2025] / 1000) ** (1 / 16) - 1) * 100, 1) == 14.1 and abs(_SPR[2010] - 14.13) < 1, "≈ 14.1% a year; 2010 within a point of it"),
    (round(_SPR[2011] * 10) == 21 and round(_SPR[2015] * 10) == 14 and _SPR[2018] < 0 and _SPR[2022] < 0, "on $1,000: 2011 ≈ $21, 2015 ≈ $14; 2018 and 2022 lost"),
    (round((_infl - 1) * 100) == 50 and round(_sv[2025] / _infl, -1) == 680, "prices ≈ +50%; ≈ $1,020 buys what ≈ $680 did in 2010"),
    (round(1000 * 1.0047 ** 16) == 1078 and max(_FDIC_KNOWN.values()) == 0.47, "0.47% (the table's highest) every year: ≈ $1,078"),
]
MATH_SCRIPT = "teasers/v2/checks/04-chart-race.py"
MATH_KEY_LINES = ["04b  S&P 500 ≈ $8,280 | savings ≈ $1,020 (1023.85) | year 1 150.60 vs 16-yr interest 23.85 (sweep 22.62-24.97)",
                  "robust: FDIC sweep (2916 input tables) leaves ≈ $1,020 / ≈ $680 / ≈ 32% / under $10 / under $30",
                  "pinned: 2011 ≈ $21, 2015 ≈ $14"]
RESULT_RE_TITLE = r"151|\$30|8,280|1,020|23\.85|alone|680|×|\$21|\$14|1,078|[Nn]o\b|Never|Only"
RESULT_RE_CAPTION = r"151|\$30|8,280|1,020|23|alone|680|×|\$21|\$14|1,078|doubled|4,000|18%|15\.06|14\.1"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it belongs to the right side or year,
# so a swapped "savings ≈ $8,280" or "≈ $14 in 2011" would pass it. These pin each figure to its side and its year.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_SIDE = _re.compile(r"S&P 500|S&P|[Ss]tocks|[Ss]avings")


def _owner(fig, who):
    """every occurrence of fig has, as the nearest side named before it on its line, the right side ('sp' or 'savings')"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            before = [a.group() for a in _SIDE.finditer(ln[:m.start()])]
            if not before or ("savings" if before[-1].lower() == "savings" else "sp") != who:
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
_SP_FIGS = [r"\$151", r"\$150\.60", r"15\.06", r"\$8,280", r"×8\.28", r"14\.1%", r"\$21\b", r"\$14\b", r"18%", r"\$4,000"]
_SV_FIGS = [r"\$1,020", r"×1\.02", r"\$30", r"\$10(?![\d,])", r"\$680", r"\$1,078", r"0\.47%", r"0\.5%"]
COPY_RULES = [
    (all(_owner(f, "sp") for f in _SP_FIGS) and all(_owner(f, "savings") for f in _SV_FIGS),
     "every figure sits after its own side's name (the S&P 500/stocks or savings)"),
    (all(_near(f, y) for f, y in [(r"\$21\b", "2011"), (r"\$14\b", "2015"), (r"18%", "2022"), (r"\$4,000", "2020"), (r"15\.06", "2010")])
     and _with(r"\$150\.60|\$151", ("2010",)) and _with(r"\$680", ("2010",)),
     "each year's figure sits beside its year (2010, 2011, 2015, 2020, 2022; ≈ $680 in 2010 dollars)"),
    (all(_after(f, r"(?:≈|about) \+?") for f in (r"\$151", r"\$1,020", r"\$8,280", r"×\d", r"14\.1", r"\$21\b", r"\$14\b", r"18%", r"50%", r"\$680", r"\$1,078"))
     and _after(r"\$151", r"(?:≈ \+?|about )"),
     "every rounded figure, multiple and rate is 'about' or '≈'"),
    (_after(r"\$30\b", r"under \+?") and _after(r"\$10(?![\d,])", r"under \+?") and _after(r"0\.5%", r"under "), "under $30, under $10 and under 0.5% stay bounds"),
    (not any(_re.search(r"1,023|1,024|23\.85|\$24\b|\$23\b", v) for v in _COPY.values()), "the savings dollar digit is never shown (≈ $1,020, under $30)"),
    (_with(r"alone", ("2010",)), "the verdict always names 2010"),
    (all("average" in _COPY[k] for k in ("description", "caption", "pinned comment")), "every long item says the savings rate is an average"),
    (all("Not affiliated with or endorsed by S&P Dow Jones Indices." in _COPY[k] and "Not financial advice." in _COPY[k] for k in ("description", "caption")),
     "both platforms carry the affiliation and no-advice lines"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"two", "doubled", "doubles"},
     "no spelled-out figures beyond 'two' figures and gains, and 'doubled'"),
]
