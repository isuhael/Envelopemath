# 07b publishing data: 2 people invest $10,000 right before 2008, one sells to cut his losses (Becker Rig, ledger-duel).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig sheet), in the newer data-file form of 06b-scoreboard-netflix-bill.py (COPY_RULES), as 04b did.
#
# Facts come only from teasers/v2/07-ledger-duel.md (section 07b, its Sources and Assumptions) and
# python3 teasers/v2/checks/07-ledger-duel.py. Research: vidIQ, pulled 2026-10-13. The render in renders/channel is the
# pre-condense cut; a condensed cut (timing only: numbers, captions and verdict stay) is in progress. This sheet names no
# timestamp except the cover, which is picked by content (the 2008 impact), so the copy carries over; the ship step
# rebuilds it with --covers.

TEASER = "07b Becker Rig, ledger-duel: \"2 people invest $10,000 right before 2008. One sells to cut his losses.\""
PREPARED = "2026-10-13"
SHORT_ID = "07b"
MD_TITLE = "07b publishing sheet: $10,000 right before 2008, one sells to cut his losses"
MATH_RUN = "461 checks, 0 failures"    # python3 teasers/v2/checks/07-ledger-duel.py on studio/specs/, 2026-10-13
MATH_SCRIPT = "publishing/data/checks/07-ledger-duel.py"   # runs the 07 check unchanged, adds the builder's summary form

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "the round-2 fix-pass cut (2026-10-08) as `renders/channel` holds it on 2026-10-13. A condensed cut is in progress (timing only: the numbers, captions and verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (the 2008 impact), so the copy carries over. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`.",
    "- **Numbers.** Every figure comes from `teasers/v2/07-ledger-duel.md` (07b) and its check, "
    f"`python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recompounds every row from the 18 S&P 500 total returns, "
    "keeps each year's figure beside its year and every Alex figure with Alex, and keeps Sam's exact $6,300 without an '≈'.",
    "- **Honesty rules kept.** The title asks how far apart they are by 2025 (the video's last row) and never says, and so does the cover (the 2008 impact, no later row). The Instagram caption keeps every result below 'more'. "
    "The copy says the data are past calendar-year returns, not a prediction; that both trades are at year-end closes (not the March 2009 low); that Sam's cash earns 0% "
    "(and the pinned comment gives the 5% case); and that the index has no fees or taxes. Nothing in it ties the 2008 duel to today's markets. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"S&P 500\" names the index the maths is about (S&P Dow Jones Indices' total-return series); both platforms' copy says "
    "'Not affiliated with or endorsed by S&P Dow Jones Indices.' No logos in the video, and no share price is named: every figure is the index's total return with dividends reinvested, and the copy says so.",
    "- **[click-check].** The write-up marks the Slickcharts total-return page for a hand check before posting (the proxy blocked fetching it); the verifier matched 2007-2025 against two sources. Nothing here changes that.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds on 2026-10-13: the pre-condense cut. The ship step rebuilds this file with --covers from the condensed cut.")
CUT = {"name": "pre-condense (07b round-2 fix pass, 2026-10-08)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "status": "in renders/channel on 2026-10-13 (git 471c793); a condensed cut (timing only) is in progress",
       "on_ship": f"python3 publishing/tools/build_publishing.py {BASE} --covers (re-picks the cover by content, re-exports both JPGs, refreshes for_video)"}

FACTS = {
    "source": f"teasers/v2/07-ledger-duel.md section 07b; teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$10,000 each in the S&P 500 at the Dec 31, 2007 close ('right before 2008')",
    "data": "calendar-year S&P 500 total returns, dividends reinvested (S&P Dow Jones Indices; Slickcharts [click-check], US500.com, History of Market, YCharts): "
            "2008 −37.00, 2009 +26.46, 2010 +15.06, 2011 +2.11, 2012 +16.00, 2013 +32.39, 2014 +13.69, 2015 +1.38, 2016 +11.96, 2017 +21.83, 2018 −4.38, "
            "2019 +31.49, 2020 +18.40, 2021 +28.71, 2022 −18.11, 2023 +26.29, 2024 +25.02, 2025 +17.88 %",
    "crash": "2008 −37.00%: $10,000 × 0.63 = $6,300.00 exactly for both (no '≈')",
    "sam": "sells at the 2008 year-end close (not the March 2009 low) to cut his losses; cash at 0%: $6,300 from then on",
    "alex": "holds: 2009 ≈ $8,000 (7,966.98); 2012 ≈ $10,900 (10,857.86, the first year-end back above $10,000; 2011 ended at 9,360.23); 2016 ≈ $18,500; 2019 ≈ $28,400; "
            "2021 ≈ $43,300; 2022 ≈ $35,500 (dip ≈ −18%, −18.11%); 2025 ≈ $66,000 (65,995.78)",
    "multiples": "65,995.78 ÷ 6,300 = 10.48 ≈ 10.5×; 65,995.78 ÷ 10,000 = 6.60 ≈ 6.6×",
    "pinned": "Sam's cash at 5% every year 2009-2025: 6,300 × 1.05^17 = 14,439.72 ≈ $14,400, 0.22 of Alex's (under a quarter)",
    "assumptions": "year-end values; both buy at the Dec 31, 2007 close; an index with no fees or taxes; cash at 0%; not inflation-adjusted; past returns, not a prediction",
    "verdict": "'Selling didn't dodge the crash. It dodged the recovery.'",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "One Sold in the 2008 Stock Market Crash to Cut His Losses. One Held. How Far Apart by 2025?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. The header's bet in the past tense, with the exact phrase '2008 stock market crash' at characters 17-39 and the write-up's question, dated to the video's last row ('How far apart by 2025?' for its 'How far apart now?'). No answer, no hashtags."},
    {"rank": 2, "title": "One Sold in the 2008 Crash to Cut His Losses. One Held. How Far Apart Are They Now?", "vidiq_score": 98,
     "note": "Top score, 1 point over the pick, but it drops 'Stock Market' and with it the 'stock market crash' search phrase (140,294 a month); its 'Now' would also need to become 'by 2025'."},
    {"rank": 3, "title": "2 People Invest $10,000 Right Before 2008. One Sells in the Crash. How Far Apart Now?", "vidiq_score": 94,
     "note": "The write-up's title. It carries the $10,000 and 'right before 2008', for 3 points less."},
]
YT_TITLES_ALSO_SCORED = [
    ("One Sold in the 2008 Stock Market Crash to Cut His Losses. One Held. How Far Apart Now?", 97, "the first build's pick; 'Now' reads as today, while the video's figures are end-of-2025 values, so the pick dates it for the same score"),
    ("He Sold in the 2008 Crash to Cut His Losses. His Friend Held. How Far Apart Are They Now?", 98, "'his friend' is not in the video: Alex and Sam are '2 people'"),
    ("What If You Sold in the 2008 Crash? Your $10,000 vs the Friend Who Held", 98, "second person over a duel of named people; the write-up turned down a 'you' title over named columns"),
    ("Sam Sold in the 2008 Crash to Cut His Losses. Alex Held. How Far Apart Are They Now?", 97, ""),
    ("$10,000 Right Before the 2008 Stock Market Crash: Sold vs Held. How Far Apart Now?", 90, ""),
]
TITLE_BULLETS = [
    "It is the header's bet ('2 people invest $10,000 / right before 2008 / One sells to cut his losses') told as what happened, plus the write-up's question, 'How Far Apart Now?', "
    "dated as 'by 2025': the video's last row is the end of 2025, and the copy ties nothing to today's market. "
    "'To Cut His Losses' names the belief the verdict breaks (the write-up's R5); the title never says who comes out ahead or by how much.",
    "It carries '2008 stock market crash' word for word (8,277 searches a month, +88.7% on its baseline), which contains 'stock market crash' (140,294, +64.7%). "
    "The top score (98) drops 'Stock Market' for 1 point; vidIQ's model ranks titles but does not predict views, so the pick keeps the search phrase.",
    "It raises the write-up's title from 94 to 97, the same score as the undated 'How Far Apart Now?'. Both scored 'he/his friend' and 'you' versions reach 98 but add a friend or a 'you' the video doesn't have.",
]

YT_DESCRIPTION = """2 people put $10,000 each in the S&P 500 at the last close of 2007, right before the 2008 stock market crash. Both drop to $6,300. Sam sells at the end of 2008 to cut his losses and keeps cash. Alex holds: about $66,000 by the end of 2025, about 10.5× Sam's $6,300.

The math, shown:
• 2008: the S&P 500's total return is −37%, so $10,000 × 0.63 = $6,300 for both.
• Sam sells at the 2008 year-end close and holds cash at 0%: $6,300 from then on.
• Alex holds. 2009: ≈ $8,000. 2012: ≈ $10,900, his first year-end back above $10,000.
• 2016: ≈ $18,500. 2019: ≈ $28,400. 2021: ≈ $43,300.
• 2022 dips ≈ −18%: ≈ $35,500. Alex holds again.
• End of 2025: Alex ≈ $66,000, about 6.6× his $10,000. Sam: still $6,300.
• Selling didn't dodge the crash. It dodged the recovery.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Calendar-year S&P 500 total returns with dividends reinvested, 2008-2025 (S&P Dow Jones Indices). Both buy at the Dec 31, 2007 close, and every value is a year-end value. Sam sells at the 2008 year-end close, not the March 2009 low, and his cash earns 0%. An index with no fees or taxes; not adjusted for inflation. Past returns, not a prediction. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.
#StockMarketCrash #2008crash #investing"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06b and 06c: the verdict is a plain reading of the index's own returns, "
             "and the copy keeps it to the one duel (the dates, the year-end rule and the 0% cash).")

YT_HASHTAGS = ["#StockMarketCrash", "#2008crash", "#investing"]
YT_HASHTAG_NOTES = [
    ("#StockMarketCrash", "the event, and the biggest on-topic phrase ('stock market crash' 140,294 searches a month, competition 60.3; +64.7% on its 30-day baseline)."),
    ("#2008crash", "the crash the video is about ('2008 stock market crash' 8,277 a month, competition 36.0, +88.7%); the write-up's caption tag."),
    ("#investing", "the broad category ('investing' 613,566 a month, −2.0%), the same third layer as 07a."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["2008 stock market crash", "stock market crash", "2008 financial crisis", "market crash",
           "stock market crash history", "panic selling", "behavioral finance", "long term investing", "s&p 500", "s&p 500 total return",
           "what happens if you start investing and the market crashes", "investing", "money math", "math animation",
           "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'panic selling' (3,102 a month) is what Sam does; "
             "'what happens if you start investing and the market crashes' (12,953) is the viewer's question the duel answers with history. Left out on purpose: "
             "'stock market crash today' (16,833, +83.6%) and 'is stock market crash coming' (6,828) are news and prediction intent, and this Short says nothing about today's market; "
             "'2008 financial crisis explained' (26,448) promises an explainer of the crisis, which this Short is not.")

YT_PINNED = """Would you have sold in 2008? "Sam's cash would've earned interest": even at 5% every single year from 2009 to 2025, his $6,300 grows to ≈ $14,400. That's under a quarter of Alex's ≈ $66,000.

Both buy at the Dec 31, 2007 close, and Sam sells at the Dec 31, 2008 close, not the March 2009 low. Total returns, dividends reinvested; no fees or taxes."""
PINNED_NOTE = ("The write-up's pinned comment, with a question in front so it shows in the collapsed preview. It answers the comment the write-up expects first ('but cash earns interest') "
               "with the 5% bound, and the second paragraph answers the timing argument ('nobody sells at the year-end', the March 2009 low) with the year-end rule the footer states.")

RELATED_VIDEO = {
    "pick": {"id": "qGS_IphmCHs", "title": "A 50% loss needs a 100% gain",
             "url": "https://www.youtube.com/shorts/qGS_IphmCHs",
             "why": "The channel's own crash maths (1,097 views, June 2026): why a fall takes a bigger rise to undo. It is the step before this Short's verdict, that the money was in the recovery."},
    "swap_when_live": "07a or 07c, the other ledger duels, once published; then point one of them at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick the 2008 impact frame (both figures blown off their stacks, the red 2008 row and the 'crash −37%' pill), the same content as the IG cover."
THUMB_MD = "in the YouTube app, pick the 2008 impact frame (both figures in the air, '$6,300 / $6,300' in red under the 'crash −37%' pill, no later row), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the 07b condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and post one ledger duel (07a, 07b, 07c) per evening.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Search demand: 'stock market crash' is +64.7% and '2008 stock market crash' +88.7% on their 30-day baselines, so crash searches are high now. "
           "The copy stays on the 2008 duel and names no current event; post on the normal schedule rather than chasing a news day.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = "2 people invest $10,000 right before the 2008 stock market crash. One sells to cut his losses. How far apart by 2025?"

IG_CAPTION = IG_HOOK + """

Both bought the S&P 500 at its last close of 2007. Both drop to $6,300 in 2008, when it returns −37%.

Sam sells at the end of 2008 to cut his losses, and keeps cash at 0%. Alex holds.

The math, shown:
• 2009: Alex ≈ $8,000. Sam $6,300.
• 2012: Alex ≈ $10,900, back above $10,000.
• 2021: Alex ≈ $43,300.
• 2022 dips ≈ −18%: Alex ≈ $35,500. He holds again.
• End of 2025: Alex ≈ $66,000. Sam: still $6,300.

Holding finished with ≈ 10.5× as much. Selling didn't skip the drop. It skipped the recovery.

S&P 500 total return with dividends reinvested, 2008-2025 calendar years (S&P Dow Jones Indices). Year-end closes; an index with no fees or taxes; cash at 0%. Past returns, not a prediction. Not financial advice. Not affiliated with or endorsed by S&P Dow Jones Indices.

Would you have sold?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#stockmarket #investing #2008crash #sp500 #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the header's bet in its own words, with the '2008 stock market crash' keyword and the write-up's question dated to the last row, "
                   "no result: the caption overlays the Reel from frame 1, so Alex's numbers sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's bet in its own words (2 people invest $10,000, right before the 2008 stock market crash, one sells to cut his losses) and 'How far apart by 2025?', "
    "117 characters, with no result; 'S&P 500' opens the next line. "
    "The write-up's line 1 ('Same $10,000. Same −37%. Only one of them got the recovery.') moves below 'more' as the verdict's set-up, since 'got the recovery' says which choice did.",
    "The data line names the series, the publisher, the year-end rule and the 0% cash, and says the returns are past returns, not a prediction.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#stockmarket", "#investing", "#2008crash", "#sp500", "#moneymath"]
IG_HASHTAG_MD = [
    "The write-up's four caption tags, plus one:",
    "",
    "- `#stockmarket`, `#investing` and `#2008crash` are the write-up's topic tags; `#moneymath` is its series tag on all three ledger duels.",
    "- `#sp500` is the fifth: the index the duel runs on, and the tag 04b uses on both platforms.",
]

IG_ALT_SHORT = "Chart: $10,000 each before 2008. Holding grew to about $66,000 by 2025; selling kept $6,300."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', so screen readers read it cleanly; "
                     "Sam's $6,300 is exact and has no 'about', as everywhere else.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a light page: 2 stick figures stand on coin stacks beside a year-by-year ledger. Header: 2 people invest $10,000 right before 2008. "
               "One sells to cut his losses. 2008 takes 37%: coins burst off both stacks, and both drop to $6,300. Sam, in grey, sells, and his stack turns into a brick of cash "
               "that never grows. Alex, in green, holds: back above $10,000 by 2012, about $43,300 by 2021, a dip in 2022, then about $66,000 at the end of 2025 on a gold plate, "
               "while Sam is still at $6,300. Verdict: Selling didn't dodge the crash. It dodged the recovery.")

IG_FIRST_COMMENT = ("Alex held: ≈ $66,000 at the end of 2025. Sam sold at the end of 2008: $6,300. Even at 5% a year from 2009 to 2025, "
                    "Sam's cash would be ≈ $14,400. Would you have sold?")

# ---------------------------------------------------------------- the cover frame
# The 2008 impact, picked by content on the pre-condense MP4 (2026-10-13): the −37% impact hits at 1.0 s (frame 30, the
# opening's biggest frame-to-frame luma change, 5.9-6.2), the crash pill is up from 1.1 s, and at 1.2 s (frame 36) both
# figures are in the air above their stacks with the lost coins bursting. The write-up names "about 1.2 s".
COVER_T = 1.2
COVER_FRAME = 36
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The 2008 impact, which the write-up names as the Instagram cover: the header '2 people invest $10,000 / right before 2008 / One sells to cut his losses', "
                          "the footer, the column heads (Alex, 'Holds through the crash'; Sam, 'Sells when 2008 ends'), both figures blown up off their stacks with the lost coins bursting, "
                          "the 'Dec 2007' row at $10,000 / $10,000 under the red '2008' row at $6,300 / $6,300, the 'crash −37%' pill, the later years dim over empty shelves, and the caption "
                          "'2008 takes 37%.'. No later row and no final number. On any cut, use a frame between the pill appearing and the figures landing.")
COVER_FRAME_MEASURED = (f"On the pre-condense {VIDEO_S:g} s render the impact hits at 1.0 s (frame 30; the opening's biggest frame-to-frame luma change, 5.9-6.2), the 'crash −37%' pill "
                        "is up from about 1.1 s, the figures land squashed at 1.4 s and stand again at 2.6 s. Frame 36 (1.20 s) has the pill up and both figures in the air: "
                        "it is a motion frame (the luma change stays near 1.1-1.3 a frame from 1.17 to 1.47 s), and any frame from 1.1 to 1.4 s shows the same content.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame. The content runs from y 112 (the badge) to y 1419 (the caption), so the tile keeps the badge, the header, "
                   "the footer, the column heads, the figures, the ledger and the caption, and drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the 2008 impact frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile matches the 3:4 JPG. "
                    "Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the finished ledger (Alex's ≈ $66,000 on the gold plate, Sam's ringed $6,300 and the verdict). The write-up suggests it as a second cover to test; "
    "it answers the title, so it belongs in the Trial Reels test below, not on the first post.",
    "**On ship:** the condensed cut may move the impact. `--covers` exports at COVER_T, so first re-pick a frame with the pill up and the figures in the air by content and update COVER_T and COVER_FRAME.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "The write-up's second cover afterwards, if you want it: the same Reel with the finished ledger as its cover, as a Trial with MANUAL graduation 48-72 h later. "
                     "Once the condensed cut ships, the pre-condense render is in git: "
                     f"`git show 471c793:renders/channel/{BASE}.mp4 > 07b-pre-condense.mp4` (sha256 d6d3739f…), for a cut test instead. Compare skip rate "
                     "(October Reels ran 27.0-65.1%; 06c, the other Becker Rig Reel, 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'Sold in 2008 vs held — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), "
           "weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. "
           "The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("stock market crash", 140294, 76.8, 60.3, 62.0, "+64.7% vs its 30-day baseline (85,194): crash searches are high now; the copy names no current event", "2026-10-12"),
    ("market crash", 114853, 75.5, 50.2, 65.2, "+59.4% vs its baseline (72,070)", "2026-10-12"),
    ("2008 financial crisis", 104111, 74.9, 51.5, 64.3, "−8.0%", "2026-10-12"),
    ("2008 financial crisis explained", 26448, 66.0, 45.2, 61.5, "+67.2%; explainer intent, not in the tags", "2026-10-12"),
    ("stock market crash today", 16833, 63.1, 57.0, 55.1, "+83.6%; news intent, not in the copy", "2026-10-12"),
    ("what happens if you start investing and the market crashes", 12953, 61.4, 43.0, 59.6, "the viewer's question the duel answers with history; no baseline", "2026-10-12"),
    ("2008 stock market crash", 8277, 58.5, 36.0, 60.7, "seed; +88.7% vs its baseline (4,387); in the title word for word", "2026-10-12"),
    ("stock market crash history", 8105, 58.3, 36.1, 60.6, "no baseline", "2026-10-12"),
    ("is stock market crash coming", 6828, 57.2, 41.2, 57.9, "prediction intent: not in the copy", "2026-08-20"),
    ("pov: you buy your first stock the day before a market crash", 5490, 55.8, 19.6, 65.7, "the same 'bought right before' set-up; competition 19.6", "2026-10-12"),
    ("panic selling", 3102, 52.1, 30.4, 59.1, "seed; what Sam does", "2026-10-12"),
    ("behavioral finance", 49748, 70.1, 31.6, 69.4, "−33.4%", "2026-10-12"),
    ("long term investing", 24666, 65.6, 39.3, 63.6, "−12.4%", "2026-10-12"),
]
KEYWORDS_SOURCE = ("vidIQ keyword research (research mode for '2008 stock market crash' with US volumes and for 'panic selling'; matching_terms for 'stock market crash'), pulled 2026-10-13. "
                   "vidIQ refreshes each keyword on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-08-20).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("'stock market crash' is the biggest on-topic phrase (140,294 a month) and it is up 64.7% on its baseline; '2008 stock market crash' (8,277) is up 88.7% at lower competition (36.0). "
            "The title carries the second word for word, which contains the first, and the hashtags carry both. The news and prediction phrases ('… today', 'is … coming') stay out of "
            "the copy: this Short is a 2008-2025 duel, not a call on today's market. 'panic selling' (3,102) names Sam's move and goes in the tags.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("$1,000 at the 2008 Crash: Gold vs S&P 500 vs Apple #shorts", "Money in Data", 1, 71, "2026-10-12", "bought at the crash, not before it; price only"),
    ("What Caused the 2008 Financial Crisis? The Crash That Wiped Out $13 Trillion Explained", "Patient Bull Investing", 9, 164, "2026-09-25",
     "an explainer that ends on 'the investors who held on recovered everything within four years'"),
    ("2008: The Crash That Felt Like the End", "Emirbek Dzhanyshbekov", 7, 57, "2026-10-02", "an AI-narrated clip on holding through 2008"),
    ("$100,000 at the 2008 peak. Held on vs sold at the bottom #shorts", "DataOverDrama", 2, 14, "2026-10-10",
     "the sell-vs-hold duel itself, sold at the bottom; AI voice"),
]
SAME_IDEA_HEADING = "**2. The 2008 crash is a big topic on YouTube Shorts; the sell-vs-hold duel is new and tiny (vidIQ YouTube search, under 4 min).**"
SAME_IDEA_MD = [
    "The crash itself draws big numbers (research.adjacent_youtube_outliers): Danny Cheek's 'Stock Market Crash of 2008' (14,446,806 views), Jessica Spangler's "
    "'A brief history of The 2008 Housing Crash' (490,682), History Intrigue's 'Live reaction to 2008 stock crash!' (70,181, September 2026). "
    "The duel this Short runs, one sells and one holds, has only tiny takes, all from the last three weeks; the closest is DataOverDrama's "
    "'$100,000 at the 2008 peak. Held on vs sold at the bottom' (14 views), which sells at the March 2009 low, the timing argument this Short's year-end rule avoids.",
    "",
    "So the title leads with '2008 Stock Market Crash', the phrase the big crash videos are found by, and asks the one thing they don't: how far apart the seller and the holder end up.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): 4 Shorts on selling or holding through 2008, all from Sep-Oct 2026 and all under 200 views; "
                  "the crash itself is a big topic (Danny Cheek's 'Stock Market Crash of 2008', 14,446,806 views). None runs the sell-vs-hold duel at year-end closes.")

OUTLIERS = [
    {"handle": "@matildehere", "platform": "Instagram", "id": "Da1U--ZBjmv",
     "on_screen": "Saving VS investing 10k 10 years ago",
     "views": "534.5K (122.1x the account median of 4.4K)", "note": "cash vs invested side by side, music only: Sam's choice against Alex's"},
    {"handle": "@getinfinityinsights", "platform": "Instagram", "id": "DbtfXQ9J6Zq",
     "on_screen": "WHAT IF YOU WERE THE LUCKIEST INVESTOR ALIVE? S&P 500, SEVEN CRASHES",
     "views": "74.7K (16.0x the account median of 4.7K)", "note": "$10,000 at every S&P 500 bottom since 2008, as an animated chart with a voice-over"},
    {"handle": "@allsense01", "platform": "TikTok", "id": "7667948024043212063",
     "on_screen": "Vanguard CEO tells what to do if the stock market crashes",
     "views": "709.9K (316.8x the account median of 2.2K)", "note": "an interview clip giving advice; this Short gives the history instead"},
    {"handle": "@moneystocker", "platform": "TikTok", "id": "7679097683058953494",
     "on_screen": "'The markets are hideously inflated' (a 2016 news clip)",
     "views": "82.7K (34.9x the account median of 2.4K)", "note": "years of crash warnings set against what the S&P 500 did next"},
]
OUTLIERS_HEADING = "**3. Crash-and-hold content travels on Instagram and TikTok; the duel form is the write-up's own benchmark (vidIQ IG/TikTok outlier search, since Oct 2025).**"
OUTLIERS_MD = [
    "- **@matildehere** (Instagram), \"Saving VS investing 10k 10 years ago\": 534.5K (122.1x). Cash vs invested, side by side, music only: Sam's choice against Alex's.",
    "- **@getinfinityinsights** (Instagram), \"WHAT IF YOU WERE THE LUCKIEST INVESTOR ALIVE? S&P 500, SEVEN CRASHES\": 74.7K (16.0x). $10,000 at every bottom since 2008, as an animated chart.",
    "- **@allsense01** (TikTok), \"Vanguard CEO tells what to do if the stock market crashes\": 709.9K (316.8x). Advice from an interview; the demand is for the crash question.",
    "- **@moneystocker** (TikTok), a 2016 'markets are hideously inflated' clip set against the S&P 500 since: 82.7K (34.9x).",
    "- The write-up's benchmark for the duel itself (not re-pulled here): Jake (@jacobdoesmoney)'s three '2 people invest $10,000' duels at 5.7-6.6x his median, and The Market Hustle's "
    "'How Long It Took To Recover After the Worst Crashes' (190,187, 4.5x). The lecture version of the idea flopped (Master Money, 0.3x), which is why 07b is a duel. "
    "None of the outliers opens on a result; the cover (the impact) and the caption's first line don't either.",
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
    "This is the channel's first Short on a real market crash. The nearest past post is June's 'A 50% loss needs a 100% gain' (1,097 YouTube views), the related video above. "
    "06c is the only Becker Rig Reel so far (40.3% skip, 69.1% watched); this one opens on the 2008 impact itself, with no number from the answer on screen.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20519}
LIMITS = [
    "As the 06b and 04b sheets found (not re-checked here), vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and the same-idea Shorts' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The render in renders/channel is the pre-condense cut. The cover's time and frame are measured on it; the copy names no other timestamp, and the ship step re-picks the cover on the final file.",
    "The S&P 500 returns are the write-up's, from search results ([click-check] on Slickcharts); the verifier matched them against two sources. The Jake and Market Hustle figures are the write-up's benchmark, not re-pulled.",
    "The vidIQ credit balance is shared with the other sheets being built in parallel; this sheet's spend is counted from each tool's listed cost, checked against the balance (see research.vidiq_credits).",
]
RESEARCH_EXTRA = {
    "adjacent_youtube_outliers": [
        {"title": "Stock Market Crash of 2008", "channel": "Danny Cheek", "subscribers": 9000, "views": 14446806,
         "published": "2019-12-17", "note": "3:13 long; a montage of the crash itself, the topic's biggest"},
        {"title": "A brief history of The 2008 Housing Crash", "channel": "Jessica Spangler", "subscribers": 39400, "views": 490682,
         "published": "2023-05-10", "note": "an explainer"},
        {"title": "Live reaction to 2008 stock crash!🤯", "channel": "History Intrigue", "subscribers": 68800, "views": 70181,
         "published": "2026-09-22", "note": "archive footage; recent"},
    ],
    "titles_scored": "7 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "07b: 65 (3 keyword pulls × 5, 2 YouTube searches × 5, 1 IG/TikTok outlier search × 5, 7 title scores × 5), plus a third of the format's 10 shared credits "
                     "(channel stats 5, channel videos 5; Instagram insights are free). The three 07 sheets used 210 in all. The balance read 5,180 before the first 07 call and 4,980 "
                     "after the first 200 of them, with no other spend in that window, which confirms keyword research at 5 a call; the last 2 title scores (10) followed. "
                     "It read 4,640 at the end of the build: the other 330 were parallel sheets' calls. At the adversarial check: 20 by listed cost (2 title scores, 2 keyword pulls), plus a third of 15 shared (channel stats 5, two video lookups 10); the three 07 checks used 55 in all. The balance read 3,845 before them and 3,745 after: the other 45 were parallel sheets' calls.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/07-ledger-duel.py: {MATH_RUN} on studio/specs/ (2026-10-13), run by the builder through publishing/data/checks/07-ledger-duel.py; "
                "every public figure traced to the 07b maths table and recompounded in MATH_RELATIONS from the 18 S&P 500 total returns (2008-2025); "
                "each year's figure pinned beside its year, every Alex figure with Alex, Sam's $6,300 kept exact (COPY_RULES)")
VIDIQ_REQUERIED = ("pulled 2026-10-13: stock market crash 140,294 / 60.3 (+64.7%); 2008 stock market crash 8,277 / 36.0 (+88.7%); 2008 financial crisis 104,111; panic selling 3,102; "
                   "7 titles scored: pick 97, top 98, write-up's title 94; channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried at the adversarial check: the first build's pick 97, the dated pick ('… by 2025?') 97; '2008 stock market crash' 8,277 / 36.0 / 60.7 (+88.7%, baseline 4,387); "
                   "channel 53 / 10,221 / 41; the related video qGS_IphmCHs 1,097 views (posted 2026-06-02). All match.")
CHECK_LOG_TITLE = "first build and adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/07-ledger-duel.py`: {MATH_RUN}. Every public figure traces to the 07b maths table: 2008 −37% → $10,000 × 0.63 = $6,300 exactly; "
    "2009 ≈ $8,000; 2012 ≈ $10,900 (first year-end back above $10,000); 2016 ≈ $18,500; 2019 ≈ $28,400; 2021 ≈ $43,300; 2022 ≈ −18% → ≈ $35,500; 2025 ≈ $66,000; "
    "≈ 10.5× Sam's $6,300; ≈ 6.6× the $10,000; 5% from 2009 to 2025 → ≈ $14,400, under a quarter. The data file recompounds each from the 18 yearly returns.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 7 titles scored against this channel: the pick 97, the top 98, the write-up's title 94. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,519 views in 30 days).",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is `publishing/data/checks/07-ledger-duel.py` (see the 07a sheet): the 07 check prints 'N checks, F failures', and the adapter adds the builder's form.",
    "- **vidIQ re-queried.** At the adversarial check: the first build's pick 97 and the dated pick 97; '2008 stock market crash' 8,277 / 36.0 (+88.7%, baseline 4,387); "
    "channel 53 subscribers / 10,221 views / 41 videos; the related video 'A 50% loss needs a 100% gain' 1,097 views, posted 2 Jun 2026. All match.",
    "- **Changed.**",
    "  - The title asked 'How Far Apart Now?', but the video's last row is the end of 2025 and the copy ties nothing to today's market (crash searches are up 64.7% this month). "
    "The pick is now '… How Far Apart by 2025?' (91 characters), which vidIQ scores the same, 97; the undated version moved to 'also scored'.",
    "  - The Instagram hook ended 'How far apart now?' at exactly 125 characters, so the dated question would not fit. It is now the header's own words, '2 people invest $10,000 right before the 2008 stock market crash. "
    "One sells to cut his losses. How far apart by 2025?' (117), and 'S&P 500' moves to the next line ('Both bought the S&P 500 at its last close of 2007.').",
    "  - The research section said 'this one opens on an impact at 1.0 s, the write-up's answer to the opening hold the condense is fixing': a timestamp outside the cover and a pacing claim. It now says what the opening shows.",
    "  - The tag '2008 financial crisis explained' promised an explainer of the crisis, which this Short is not; it is out of the tags and the tags note says why.",
    "  - The title note put '2008 stock market crash' at characters 13-35; it is 17-39.",
    "  - `#sp500` was 'the tag the savings-vs-index posts in 04b's research use', which 04b's research does not show (its own adversarial pass found none of its same-idea titles carries it). It now says 04b uses it.",
    "- **Checked.**",
    "  - Every copy figure against the write-up's 07b maths table and a fresh run of the 07 check (461 checks, 0 failures): all 18 total returns recompounded, $6,300 exact, ≈ 10.5× and ≈ 6.6×, the 5% case ≈ $14,400.",
    "  - Platform limits: title 91/100 with no hashtags, description under 5,000 bytes, tags under 500, caption under 2,200 with 5 hashtags and a result-free first 125, short alt text 92.",
    "  - Brand: 'S&P 500' only names the index the maths runs on, and both long texts carry 'Not affiliated with or endorsed by S&P Dow Jones Indices.'; no share price is named.",
    "  - The cover JPG (read by eye) shows the 2008 impact: both figures in the air, '$6,300 / $6,300' in red under 'crash −37%', no later row. The render's sha256 equals the file at `471c793`.",
    "- **Mutation test.** Eight mutations of a scratch copy each fail by name: the 2016 and 2019 rows swapped, Sam's $6,300 made 'about', the pinned 5% case without its 5%, 10.5× without its '≈', the caption without the S&P DJI line, Alex's ≈ $66,000 given to Sam, Sam's $6,300 given to Alex, and a caption hook with the result. At the adversarial check, 5 more on scratch copies also fail by name: the title back to 'Now', the caption's hook back to 'now', a hook with the result, the new line's $6,300 made 'about', and its −37% moved off 2008. The files on disk were not touched.",
    "- **Kept on purpose.**",
    "  - The pick is 1 point under the top title, to keep the '2008 stock market crash' search phrase whole.",
    "  - 'Sold in the 2008 Stock Market Crash' is the write-up's 'One Sells in the Crash'; the description, the caption and the pinned comment give the exact sale, the Dec 31, 2008 close.",
    "  - The pinned comment gives the 5% case and the year-end rule, the two comment fights the write-up expects; the copy never says what anyone should do in a crash.",
    "  - The cover is the impact, as the write-up names it; the finished ledger is the Trial Reels test.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 07b maths table (teasers/v2/07-ledger-duel.md, section 07b) and
# recomputed below from its inputs (the 18 calendar-year total returns; the dates are inputs from the write-up).
FIGURES = {
    "2", "$10,000", "$6,300", "$66,000", "$8,000", "$10,900", "$18,500", "$28,400", "$43,300", "$35,500", "$14,400",
    "10.5×", "6.6×", "37", "18", "0.63", "0", "5", "500", "31",
    "2007", "2008", "2009", "2012", "2016", "2019", "2021", "2022", "2025",
}
_TR = {2008: -37.00, 2009: 26.46, 2010: 15.06, 2011: 2.11, 2012: 16.00, 2013: 32.39, 2014: 13.69, 2015: 1.38, 2016: 11.96,
       2017: 21.83, 2018: -4.38, 2019: 31.49, 2020: 18.40, 2021: 28.71, 2022: -18.11, 2023: 26.29, 2024: 25.02, 2025: 17.88}


def _V(year):
    v = 10000.0
    for y in range(2008, year + 1):
        v *= 1 + _TR[y] / 100
    return v


_ROWS = {2009: 8000, 2012: 10900, 2016: 18500, 2019: 28400, 2021: 43300, 2022: 35500, 2025: 66000}   # Alex, to the nearest $100
MATH_RELATIONS = [
    (sorted(_TR) == list(range(2008, 2026)), "a total return for every calendar year 2008-2025"),
    (round(_V(2008), 2) == 6300.00 and round(10000 * 0.63, 2) == 6300.00, "2008 −37%: $10,000 × 0.63 = $6,300 exactly"),
    (all(round(_V(y), -2) == v for y, v in _ROWS.items()), "Alex's rows to the nearest $100 (2009, 2012, 2016, 2019, 2021, 2022, 2025)"),
    (round(_V(2025), 2) == 65995.78, "2025 exact: 65,995.78"),
    (_V(2011) < 10000 <= _V(2012), "2012 is the first year-end back above $10,000"),
    (round(_TR[2022]) == -18 and _V(2022) < _V(2021), "2022 dips ≈ −18%"),
    (round(_V(2025) / 6300, 1) == 10.5, "≈ 10.5× Sam's $6,300"),
    (round(_V(2025) / 10000, 1) == 6.6, "≈ 6.6× the $10,000"),
    (round(6300 * 1.05 ** 17, -2) == 14400 and 6300 * 1.05 ** 17 / _V(2025) < 0.25, "5% a year 2009-2025: ≈ $14,400, under a quarter of Alex's"),
]
MATH_KEY_LINES = ["claim: both at $6,300 exactly after 2008", "claim: first year-end back above $10,000", "claim: caption: Alex ÷ Sam",
                  "claim: pinned: Sam at 5% a year 2009-2025"]
RESULT_RE_TITLE = r"66,000|10\.5|6\.6|6,300|14,400|[Rr]ecover|[Dd]odge|×|[Ww]ins|[Bb]eat"
RESULT_RE_CAPTION = r"66,000|10\.5|6\.6|14,400|[Rr]ecover|43,300|35,500|28,400|18,500|10,900|8,000|skipped|[Dd]odge"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right year or
# person, so a swapped "2016: ≈ $28,400" or an "≈ $6,300" would pass it. These pin each figure to its context.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_YEAR = _re.compile(r"(?<![/\d])20[0-3]\d(?!\d)")
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _beside(fig, year, reach=60):
    """every occurrence of fig has its year on the same line, within reach characters, with no other year between them"""
    return all(any(y.group() == year and abs(y.start() - m.start()) <= reach
                   and not _YEAR.search(ln[min(y.end(), m.end()):max(y.start(), m.start())]) for y in _YEAR.finditer(ln))
               for ln in _lines() for m in _re.finditer(fig, ln))


_WHO = _re.compile(r"\b(Alex|Sam|[Bb]oth|[Hh]olding|[Ss]elling)\b")


def _owner(fig, ok):
    """for every occurrence of fig, the nearest person word before it on its line (if any) is one of ok"""
    for ln in _lines():
        for m in _re.finditer(fig, ln):
            who = _WHO.findall(ln[:m.start()])
            if who and who[-1] not in ok:
                return False
    return True


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|third|quarter|twice)\b", _re.I)
COPY_RULES = [
    (all(_beside(_re.escape(f"${v:,}"), str(y)) for y, v in _ROWS.items() if y != 2025),
     "each of Alex's rows sits beside its year (2009 ≈ $8,000 … 2022 ≈ $35,500)"),
    (_beside(r"37%", "2008") and _beside(r"18%", "2022"), "−37% sits beside 2008 and ≈ −18% beside 2022"),
    (all(_re.search(r"(?:≈|about) \$66,000", ln) for ln in _lines() if "$66,000" in ln)
     and _owner(r"\$66,000", ("Alex", "Holding", "holding")) and all(_owner(_re.escape(f"${v:,}"), ("Alex",)) for y, v in _ROWS.items() if y != 2025),
     "≈ $66,000 is always 'about' or '≈', and it and every other Alex row belong to Alex (the nearest name before them, or 'holding')"),
    (_owner(r"\$6,300", ("Sam", "Both", "both", "Selling", "selling")), "$6,300 belongs to Sam, or to both after 2008 (never to Alex or 'holding')"),
    (all(_re.search(r"(?:≈|about) \$" + f, ln) for f in ("8,000", "10,900", "18,500", "28,400", "43,300", "35,500", "14,400")
         for ln in _lines() if "$" + f in ln),
     "Alex's rounded rows and the 5% case keep their '≈' or 'about'"),
    (not any(_re.search(r"(?:≈|about) \$6,300", ln) for ln in _lines()), "Sam's $6,300 is exact: never '≈' or 'about'"),
    (all(_re.search(r"(?:≈|about) (?:10\.5|6\.6)×", ln) for ln in _lines() if _re.search(r"10\.5×|6\.6×", ln)), "≈ 10.5× and ≈ 6.6× keep their '≈' or 'about'"),
    (all("5%" in ln for ln in _lines() if "$14,400" in ln), "≈ $14,400 comes with its 5%"),
    (all(k in _COPY[c] for c in ("description", "caption") for k in ("dividends reinvested", "Past returns, not a prediction.", "Not financial advice.",
                                                                       "Not affiliated with or endorsed by S&P Dow Jones Indices.", "0%")),
     "the description and the caption name the series (dividends reinvested), the 0% cash, 'Past returns, not a prediction.', 'Not financial advice.' and the S&P DJI line"),
    ("2025" in YT_TITLE and "2025" in IG_HOOK and not _re.search(r"\b[Nn]ow\b", YT_TITLE + " " + IG_HOOK),
     "the title and the caption's hook date the question to 2025, the video's last row (no 'now': the figures are end-of-2025 values)"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"one", "quarter"},
     "no spelled-out figures beyond the header's 'One sells' and the pinned comment's 'under a quarter'"),
]
