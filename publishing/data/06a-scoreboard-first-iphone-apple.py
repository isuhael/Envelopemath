# 06a publishing data: the $499 first iPhone vs Apple stock (Scoreboard, pov-race).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from 06b-scoreboard-netflix-bill.py (the nearest sheet: same look,
# same format).
#
# Facts come only from teasers/v2/06-pov-race.md (section (b) 06a: the maths, Sources, Assumptions, caption and pinned
# comment) and python3 teasers/v2/checks/06-pov-race.py. Research: vidIQ, pulled 2026-10-13. The video is the condensed
# cut, promoted and shipped on 2026-10-13 (the pre-condense round-2 cut is in git, 471c793). This sheet names no
# timestamp except the cover, which is picked by content, so the copy carried over unchanged; the ship rebuilt it with
# --covers from the shipped file.

TEASER = "06a Scoreboard, pov-race: \"What If You Invested $499 in Apple Instead of the First iPhone?\""
PREPARED = "2026-10-13"
SHORT_ID = "06a"
MD_TITLE = "06a publishing sheet: the $499 first iPhone vs Apple stock"
MATH_RUN = "445 checks, 0 failed"      # python3 teasers/v2/checks/06-pov-race.py on studio/specs/, re-run at the adversarial check, 2026-10-13
MATH_RUN_WIP = "454 checks, 0 failed"  # the same script with --spec studio/specs-wip/06a-scoreboard-first-iphone-apple.json (the condensed cut), 2026-10-13
MATH_RUN_SHIP = "468 checks, 0 failed"  # python3 teasers/v2/checks/06-pov-race.py on studio/specs/ with the condensed cut promoted, at the ship 2026-10-13

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the condensed cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
    "promoted and shipped on 2026-10-13. It replaces the 29.0 s round-2 cut (the owner: \"too many still moments\"), which is in git (`471c793`). "
    "The condense moved the clock and merged some captions; the numbers, the captions' facts and the verdict stay, so the copy carried over unchanged. "
    "Nothing below names a timestamp except the cover, which was re-picked by content on the shipped file. "
    f"The ship rebuilt this sheet and re-exported both covers from it (`python3 publishing/tools/build_publishing.py {BASE} --covers`); on the shipped specs the maths check runs {MATH_RUN_SHIP}.",
    "- **Numbers.** Every figure comes from `teasers/v2/06-pov-race.md` (06a) and its check, "
    f"`python3 teasers/v2/checks/06-pov-race.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes every figure "
    "from the write-up's closes, and keeps each year's figure beside its year.",
    "- **Honesty rules kept.** The title asks and never gives the result, and neither does the cover (frame 1: both counters at $499, the race not started). "
    "The Instagram caption keeps every figure but the $499 input (and the year 2007) below 'more'. The copy says the buy is at the launch-day close (the phone went on sale at 6 p.m.), "
    "shows the 2008 dip below $499 as well as the finish, and dates the finish: the 12/31/2025 close, and Apple has moved since. "
    "No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Brand.** \"Apple\", \"iPhone\" and \"AAPL\" are used only to name the company, its phone and the stock the maths is about. Both platforms' copy says "
    "'Not affiliated with or endorsed by Apple.' The video has no Apple logo and no product photo: the names are text only, and the phone is the kit's generic icon.",
    "- **Prices.** AAPL prices are adjusted for splits and dividends (Macrotrends, bridged to StatMuse's 2007 close), so the 2007 prices sit far below the ones quoted at the time: "
    "the launch-day close was $122.04 as quoted (ATPM) and is $3.65 adjusted. The copy says \"adjusted\" wherever it names a share price, and the description and the pinned comment "
    "give both, because the same-idea Shorts quote at least six different launch-day prices.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds: the condensed cut, promoted and shipped on 2026-10-13.")
CUT = {"name": "condensed (2026-10-13)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": "2026-10-13",
       "replaces": {"duration_s": 29.0, "sha256": "9707256d2230e67107128c4292dc08787d0f3689dc280aa9fe38512aa9810509",
                    "note": "the round-2 cut (pre-condense) + card, retired; in git history (471c793)"}}

FACTS = {
    "source": f"teasers/v2/06-pov-race.md section (b) 06a; teasers/v2/checks/06-pov-race.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "stake": "$499, the 4GB first iPhone's US price, on sale 6/29/2007 at 6 p.m. (Apple Newsroom); invested instead at Apple's 4 p.m. close that day",
    "buy_price": "$3.65 adjusted for splits and dividends = 5.92 × 122.04 ÷ 198.08 = 3.6474 (StatMuse's adjusted 2007 close × the raw launch-day close ÷ the raw 2007 close); "
                 "$122.04 as quoted at the time (ATPM); StatMuse shows $3.66, which is off its own $5.92 on the raw ratio (cross-check only)",
    "shares": "$499 ÷ $3.65 = 136.712 ≈ 136.7 shares (adjusted)",
    "method": "year-end values = 136.712 × Macrotrends' adjusted close (2007-2011 bridged by 5.92 ÷ 5.97); dividends reinvested (Apple began paying them in 2012); splits adjusted; no fees or taxes",
    "end_2007": "$809 (136.712 × 5.92 = 809.34)",
    "end_2008": "$348 (348.41): below the $499; the line crosses $499 in 2008 and is back above it in 2009",
    "end_2012": "$2,196 (2,195.60) ≈ $2,200",
    "end_2017": "$5,403 (5,402.87) = 10.83× the $499: 'over 10 times'",
    "passes_10k": "between the 2019 close ($9,660) and the 2020 close ($17,611): it passes $10,000 in 2020",
    "drop_2022": "$23,713 (end of 2021) → $17,451 (end of 2022): −26.4%, 'about a quarter'",
    "final": "136.712 × $271.12 (12/31/2025 adjusted close, Macrotrends) = $37,065.45 ≈ $37,000 (nearest $1,000); footer and pinned 136.7 × $271.12 ≈ $37,062; StatMuse-only cross-check $36,997 (0.18% apart)",
    "multiple": "37,065.45 ÷ 499 = 74.28 ≈ 74×",
    "doublings": "log2 74.28 = 6.21 ≈ 6.2 doublings in 18.51 ≈ 18.5 years (6/29/2007 → 12/31/2025): one every 2.98 ≈ 3 years",
    "assumptions": "bought at the 6/29/2007 close (the phone went on sale at 6 p.m., after the close); valued at the 12/31/2025 close, and Apple has moved since; no fees or taxes",
    "verdict": "≈ 74× your $499. 2× every ≈ 3 yrs.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE_CORE = "What If You Bought Apple Stock Instead of the $499 First iPhone?"
YT_TITLE_TAGS = "#Apple #AppleStock #stocks"
YT_TITLE = f"{YT_TITLE_CORE} {YT_TITLE_TAGS}"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97,
     "note": "PICK. The house form the owner used for 06c and 06b: the question, then 3 hashtags in the title. 'Apple Stock' at characters 20-30; "
             "the $499 is the video's one input, never its result, and it sets this title apart from Alpha Paradox's identical core (section 2)."},
    {"rank": 2, "title": "What If You Bought Apple Stock Instead of the First iPhone? #Apple #AppleStock #stocks", "vidiq_score": 97,
     "note": "Same score, 5 characters shorter. Its core is word for word Alpha Paradox's 3:55 video from 10 Oct 2026, and close to GrowthShares' Short (section 2)."},
    {"rank": 3, "title": "What If You Invested $499 in Apple Instead of the First iPhone? #Apple #AppleStock #stocks", "vidiq_score": 96,
     "note": "The write-up's title plus the house hashtags. 'what if you invested' word for word (9,269 searches a month, +79.0%), but 'Apple Stock' only in the hashtag."},
]
YT_TITLES_ALSO_SCORED = [
    ("What If You Bought Apple Stock Instead of the First iPhone in 2007? #Apple #AppleStock #stocks", 97, "95 chars; the year clock shows 2007 on frame 1"),
    ("What If You Bought Apple Stock Instead of the First iPhone? #iPhone #AppleStock #stocks", 97, "#iPhone in place of #Apple: no difference in score"),
    ("What If You Bought Apple Stock Instead of the First iPhone?", 97, "the core alone"),
    ("What If You Invested $499 in Apple Instead of the First iPhone?", 96, "the write-up's title"),
    ("The First iPhone Cost $499. What If You Bought Apple Stock Instead?", 90, ""),
    ("POV: You Invested in Apple Instead of Paying $499 for the First iPhone", 88, "the on-screen header as a title"),
    ("Skip the $499 First iPhone, Buy Apple Stock on Launch Day: What Did It Become?", 88, ""),
]
TITLE_BULLETS = [
    "'What If You Bought Apple Stock' is the first 30 characters, so a title cut short still asks it; it carries 'apple stock' (18,675 searches a month) "
    "and the 'what if you …' grammar of 'what if you invested' (9,269, +79.0%). The ticker phrase 'aapl stock' (12,269, +40.2%) is in the tags and the Instagram hashtags.",
    "'$499 First iPhone' is the header's one input. Seven of the ten scored titles land at 96-97, so the pick is decided on angle: the $499 is what the video races, "
    "and the one-off-purchase POV posts in the write-up's evidence (GoPro $400, Crocs $50, GeForce 256 $599) all name their price.",
    "It raises the write-up's title from 96 to 97. vidIQ's model ranks titles but does not predict views. The 3 hashtags are the description's first 3, as the house rule asks (none or all).",
]

YT_DESCRIPTION = """What if you skipped the $499 first iPhone on launch day, 6/29/2007, and bought Apple stock instead? At the 12/31/2025 close: about $37,000, about 74× your $499.

The math, shown:
• $499 ÷ $3.65 (Apple's 6/29/2007 close, adjusted for splits and dividends) ≈ 136.7 shares. The phone went on sale at 6 p.m., so you buy at the 4 p.m. close instead of standing in line.
• End of 2007: $809. End of 2008: $348, below the $499 you put in.
• End of 2012: about $2,200. End of 2017: $5,403, over 10× your $499.
• In 2020 it passes $10,000.
• End of 2021: $23,713. 2022 knocks off about a quarter: $17,451.
• End (12/31/2025 close): 136.7 shares × $271.12 (adjusted) ≈ $37,062. On screen: ≈ $37,000.
• That is ≈ 74× your $499: about 6.2 doublings in 18.5 years, a doubling about every 3 years.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $499 is the 4GB first iPhone's US price on 6/29/2007 (Apple Newsroom). Apple's close that day was $122.04 as quoted at the time (ATPM); adjusted for the splits and dividends since, it is $3.65 (StatMuse's adjusted 2007 close × the raw ratio). Year-end closes adjusted for splits and dividends (Macrotrends, StatMuse); dividends reinvested, and Apple began paying them in 2012. Valued at the 12/31/2025 close ($271.12 adjusted), and Apple has moved since. No fees or taxes. Not financial advice. Not affiliated with or endorsed by Apple.
#Apple #AppleStock #stocks"""
DESC_NOTE = ("The 'Doesn't Add Up' series line is left out, as on 06c and 06b: the POV races run without it. The raw $122.04 is named once, beside its adjusted $3.65, "
             "to answer the comment the same-idea Shorts draw ('Apple was $122 in 2007').")

YT_HASHTAGS = ["#Apple", "#AppleStock", "#stocks"]
YT_HASHTAG_NOTES = [
    ("#Apple", "the brand ('apple' 2,244,206 searches a month; down 79.7% on its 30-day baseline after the September iPhone launch, still by far the biggest)."),
    ("#AppleStock", "the exact topic ('apple stock' 18,675 a month, competition 42.2; down 21.5% on its baseline)."),
    ("#stocks", "the broad category ('stocks' 221,285 a month, down 17.4%), and the same third tag as 06c and 06b, so the series shares it."),
]
YT_HASHTAG_PLACEMENT = ("The title carries the same 3, so they show as links in the title. Over 60 hashtags and YouTube ignores all of them. "
                        "`#Shorts` isn't needed. '#iPhone' in place of '#Apple' scored the same (97); '#Apple' keeps the series' brand-first pattern.")

YT_TAGS = ["apple stock", "what if you invested", "first iphone", "iphone vs apple stock", "aapl stock", "aapl",
           "first iphone launch", "apple", "iphone", "stocks", "long term investing", "power of compounding",
           "opportunity cost", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'iphone vs apple stock' and 'what if you invested in apple' "
             "are under 750 a month, so only the first is kept, as the video's exact phrase. Left out on purpose: 'apple stock analysis' (11,644, +232.3%), "
             "'how to invest money in apple stock' and 'aapl stock forecast' are advice intent; 'first iphone launch steve jobs 2007' (31,939) and "
             "'steve jobs first iphone presentation' (20,794) want the keynote; 'iphone 18 pro' and 'iphone duo' want this year's phones.")

YT_PINNED = """What was your first iPhone, and what did you pay?

The working: $499 ÷ $3.65 (Apple's 6/29/2007 close, adjusted for splits and dividends) ≈ 136.7 shares. 136.7 × $271.12 (the adjusted 12/31/2025 close) ≈ $37,062, about 74× your $499. Apple closed at $122.04 that day as quoted at the time; adjusted for the splits and dividends since, that is $3.65 (some sites show $3.66). Apple has moved since 12/31/2025. Ignores taxes and fees."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview: it is the write-up's own pinned question, and it asks for the viewer's own phone (R3). "
               "The second paragraph is the write-up's working, multiplied out. It also answers the comments to expect: 'Apple was $122 in 2007' "
               "(the same-idea Shorts quote at least six launch-day prices, from $3.65 adjusted to $102 as quoted, against ATPM's $122.04), 'some sites say $3.66' (the write-up's own note), and "
               "'the stock has moved since' (the close is dated; third-party descriptions from Sep-Oct 2026 value AAPL above its 2025 close, not verified here).")

RELATED_VIDEO = {
    "pick": {"id": "krfZEHhb0xU", "title": "What If You Bought Netflix Stock Instead of Paying for Netflix? #Netflix #NetflixStock #stocks",
             "url": "https://www.youtube.com/shorts/krfZEHhb0xU",
             "why": "06b, the same POV-race series and mechanic, live since Mon 12 Oct 2026 (12:14 ET) and the slowest start of the three (75 views at the last check), "
                    "so this Short sends it traffic. One phone in Apple gave about 74×; 14 years of Netflix bills in Netflix stock about 8.7×, so the pair shows the answer depends on the stock."},
    "swap_when_live": "Nothing to swap: with this Short live, all three POV races are up. Point 06c's Related video at this Short, so the three link in a loop (06a → 06b → 06c → 06a; 06b's already points at 06c).",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the clean cover (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick frame 1 (the clean cover: the POV header and both counters at $499), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the final cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day): Tue 13 Oct 2026 at the earliest. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and give each evening slot to one Short when several formats ship together. 06c (Mon 03:45 ET) and 06b (Mon 12:14 ET) are already up, so any Tue-Thu evening clears them.",
    "why": "The channel's own October Shorts, median views by posting slot (refreshed 2026-10-13): Sunday 05:00-08:00 ET 1,199 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2). "
           "06c, posted Mon 03:45 ET, has 760 views after a day; 06b, posted Mon 12:14 ET, has 75 after about 11 hours (both too young to compare). The evening slot is also the best one on Instagram, so one evening serves both. "
           "n = 7 (06c and 06b left out) and confounded by topic, so treat it as a test. Search demand: 'aapl stock' runs +40.2% and 'what if you invested' +79.0% over their 30-day baselines; "
           "the September 2026 iPhone launch keeps 'iphone 18 pro' (2,532,128 a month) and 'iphone duo' (3,998,667) huge, so iPhones are in the feed. The copy stays on the 2007 phone.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What if you skipped the $499 first iPhone in 2007 and bought Apple stock instead? "
           "The phone got old. The shares didn't.")

IG_CAPTION = IG_HOOK + """

POV: on launch day, 6/29/2007, you buy Apple stock at the close instead of standing in line for the phone. Then you just hold.

The math, shown:
• $499 ÷ $3.65 (the 6/29/2007 close, adjusted for splits and dividends) ≈ 136.7 shares.
• End of 2008: $348, below the $499 you put in.
• End of 2017: $5,403, over 10× your $499.
• In 2020 it passes $10,000. Then 2022 knocks off about a quarter.
• End of 2025: 136.7 shares × $271.12 (adjusted close) ≈ $37,062. About 74× your $499.
• About 6.2 doublings in 18.5 years: a doubling about every 3 years.

Bought at the launch-day close, the most hyped day there was, and below $499 by the end of 2008, it still came to about 74× your $499. Valued at the 12/31/2025 close; Apple has moved since.

Dividends reinvested (Apple began paying them in 2012). No fees or taxes. Not financial advice. Not affiliated with or endorsed by Apple.

What was your first iPhone?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#apple #iphone #AAPL #stocks #investing"""
IG_CAPTION_RULE = ("The first 125 characters are the question, the 'first iPhone' and 'Apple stock' keywords and the write-up's numberless caption line, "
                   "with the $499 input and no result: the caption overlays the Reel from frame 1, so every other number sits below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the question plus the keywords 'first iPhone' and 'Apple stock', and the write-up's own numberless verdict ('The phone got old. The shares didn't.'). "
    "The $499 is the header's input, on the cover too, and never the result. This follows the write-up's caption rule: the caption overlays the Reel from frame 1. "
    "The numbers sit below 'more', where Instagram search and Google indexing still read them.",
    "The paragraph after the math names the honest parts in plain words: the buy is at the launch-day close, the stake falls below $499 in 2008, and the finish is dated.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#apple", "#iphone", "#AAPL", "#stocks", "#investing"]
IG_HASHTAG_MD = [
    "Three are specific:",
    "",
    "- `#apple` names the company and `#iphone` the phone, the video's two sides; the write-up's caption tags both. The September iPhone launch keeps `#iphone` busy.",
    "- `#AAPL` is the ticker ('aapl stock' 12,269 searches a month on YouTube, +40.2%), as `#NFLX` is on 06b.",
    "",
    "`#stocks` and `#investing` are the broad layer, as on 06b (06c carries `#investing` but not `#stocks`). The write-up's caption tags `#apple #iphone #usa #investment #stocks`; `#usa` and `#investment` are dropped, as on 06c and 06b, "
    "and `#personalfinance` gives way to `#iphone` here.",
]

IG_ALT_SHORT = "Chart: $499 in Apple stock on iPhone launch day 2007 grows to about $37,000 by 2025, about 74×."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'to' and 'about', not '→' and '≈', "
                     "so screen readers read it cleanly. The 74 and the $37,000 keep their 'about', as everywhere else.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'to' and 'about' instead of '→' and '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header reads: POV: in 2007 you invested in Apple instead of paying $499 for the first iPhone. "
               "Both counters start at $499: the iPhone, in white, and the same $499 in Apple stock, in green. A race runs from 2007 to 2025: "
               "the green line dips below $499 in 2008, passes $10,000 in 2020 and loses about a quarter in 2022, while the white line stays flat at $499 spent. "
               "It finishes at about $37,000, with the working underneath: about 136.7 shares × $271.12, the adjusted 12/31/2025 close. "
               "Payoff: about 74× your $499, a doubling about every 3 years.")

IG_FIRST_COMMENT = ("Phone: $499. Apple stock: ≈ $37,000 at the 12/31/2025 close (adjusted), ≈ 74× your $499, "
                    "a doubling about every 3 years. What was your first iPhone?")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up's own Instagram note says "the cover is frame 1 (header + $499 tips)".
# On the shipped condensed cut frame 0 shows it with both counters at $499 and the race not yet left its start; from
# frame 1 the start dot pings.
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:60"
COVER_RENDER_WORD = "shipped"
COVER_FRAME_BY_CONTENT = ("The clean cover, frame 1: the header 'POV: IN 2007 YOU INVESTED IN APPLE / INSTEAD OF PAYING $499 / FOR THE FIRST IPHONE', "
                          "both counters at $499 (THE IPHONE | IN APPLE STOCK), the footer '6/29/07 close → 12/31/25 · dividends reinvested', "
                          "and the empty 2007-2025 race with only the green start dot under the 2007 year clock. $499 is the only price. It asks and does "
                          "not answer, like the title and the caption. The write-up names frame 1 as the Instagram cover ('header + $499 tips'). "
                          "On any cut, use a frame where both counters still read $499 and the race has not left its start.")
COVER_FRAME_MEASURED = ("On the shipped 17.8 s condensed cut, frame 0 (0.00 s) is that frame: both counters read $499, the race has not left its start and the phone icon has "
                        "not dropped; from frame 1 the start dot pings (mean frame-to-frame luma change 0.06-0.10 over the first frames, 270×480 greyscale). It also shows the "
                        "whole first caption, 'Launch day 2007: you skip the $499 iPhone and buy Apple stock.', with 'Launch day 2007:' lit (the kit lights it word by word); "
                        "the grey words still read. On the 29.0 s pre-condense render only 'Launch' was lit.")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame: the badge, the header, both counters, the footer, the empty race "
                   "and the first caption; it drops the empty floor. A centred grid crop (y 240-1680) cuts the badge and leaves the header on the edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the verdict hold (≈ $37,000 on the green counter, the finished race and '≈ 74× your $499. 2× every ≈ 3 yrs.'). "
    "It is the save-worthy frame, but it shows the answer, against the write-up's cover note and the caption rule.",
    "**Shipped cut (2026-10-13):** frame 1 was re-picked by content on the shipped condensed cut and both JPGs re-exported from it: the same picture as the pre-condense cover, with 'Launch day 2007:' lit in the hook caption (the old frame lit only 'Launch'). The copy did not change.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. The pre-condense render "
                     f"(sha256 9707256d…) is in git: `git show 471c793:renders/channel/{BASE}.mp4 > 06a-pre-condense.mp4`. Compare skip rate (October Reels ran 27.0-65.1%; "
                     "06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'First iPhone vs Apple stock — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, Tue 13 Oct 2026 at the earliest.",
    "why": "October Reels, median plays by posting slot (refreshed 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), "
           "Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate; 06b, posted Mon 12:14 ET, shows 7 plays so far (Instagram insights may lag). "
           "Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("apple stock", 18675, 63.8, 42.2, 61.4, "seed; −21.5% vs its 30-day baseline (23,783); top market India (40%)", "2026-10-12"),
    ("aapl stock", 12269, 61.0, 44.0, 59.0, "the ticker phrase; +40.2% vs its baseline (8,751)", "2026-10-12"),
    ("apple stock analysis", 11644, 60.7, 43.1, 59.2, "+232.3% vs its baseline (3,504); analysis/advice intent, not in the tags", "2026-10-12"),
    ("first iphone launch", 9633, 59.5, 29.7, 63.8, "history intent next door to the video's launch day", "2026-10-12"),
    ("first iphone", 9281, 59.2, 50.0, 55.5, "−54.4% vs its baseline (20,370)", "2026-10-12"),
    ("what if you invested", 9269, 59.2, 37.5, 60.5, "+79.0% vs its baseline (5,178); the title's grammar", "2026-10-12"),
    ("first iphone launch steve jobs 2007", 31939, 67.2, 23.3, 71.0, "+706.5% vs its baseline (3,960); keynote seekers, not in the tags", "2026-10-12"),
    ("apple first iphone launch", 10496, 60.0, 50.5, 55.8, "+160.1% vs its baseline (4,035); keynote/history intent", "2026-10-12"),
    ("what if you invested $1000 in apple in 2010", 5339, 55.6, 26.0, 63.0, "question form; a different stake and year", "2026-10-12"),
    ("what if you invested $100 in apple in 2000", 5325, 55.6, 22.0, 64.6, "question form; a different stake and year", "2026-09-19"),
    ("power of compounding", 28342, 66.5, 46.1, 61.4, "+24.9% vs its baseline", "2026-10-12"),
    ("long term investing", 24666, 65.6, 39.3, 63.6, "", "2026-10-12"),
    ("opportunity cost", 13526, 61.7, 43.5, 59.6, "−27.3% vs its baseline", "2026-10-12"),
    ("stocks", 221285, 79.8, 67.0, 61.1, "−17.4% vs its baseline", "2026-10-12"),
    ("apple (topic)", 2244206, 94.8, 62.8, 71.8, "−79.7% vs its 30-day baseline (11,079,820), after the September iPhone launch", "2026-10-12"),
    ("what if you invested in apple", 0, 0, 28.0, 28.8, "<750/month (overall 28.8): too small to target", None),
    ("iphone vs apple stock", 0, 0, 43.0, 22.8, "<750/month; kept as one tag, the video's exact phrase", None),
]
KEYWORD_MD_NOTE = {"what if you invested in apple": "<750/month: too small to target"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; one row is an older snapshot (2026-09-19).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. One row is an older snapshot.")
KW_OUTRO = ("'apple stock' is the biggest on-topic phrase (18,675 a month) at moderate competition (42.2); its ticker twin 'aapl stock' (12,269) is rising (+40.2%). "
            "The title and the hashtags carry both. 'what if you invested' (9,269, +79.0%) gives the title its grammar, and vidIQ's question index has two 'what if you invested … in apple' "
            "questions at about 5,300 a month each, with other stakes and years. The biggest 'first iphone' phrases want Steve Jobs' 2007 keynote, so they stay out of the tags. "
            "The exact phrases, 'what if you invested in apple' and 'iphone vs apple stock', are under 750 a month.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("👉 iPhone vs Apple Shares – 2010 to 2025 Reality Check! #shorts   #finance  #money  #education", "Fintech Neeraj", 444000, 29739419, "2025-07-26",
     "India-facing, in rupees, from 2010"),
    ("iPhone vs Apple Shares - Price Zyada par GROWTH kitni?! … Ankur Warikoo #shorts", "warikoo", 7150000, 27636101, "2024-11-04",
     "India-facing; a product vs its own shares. The title's vertical bar before 'Ankur Warikoo' is written as … so the .md table holds"),
    ("Stop Buying iPhones Instead do this! 🍎💰#iphone #sanjaykathuria #apple", "Sanjay Kathuria ", 1420000, 146640, "2026-09-19",
     "every iPhone from the $499 first one; 2:58 long"),
    ("Apple Stock to $21,000 if you Invested THIS Much", "Bob Sharpe", 230000, 27498, "2022-09-03", "$499 in June 2007; the result in the title"),
    ("What If You Invested Your iPhone MONEY?", "Valuetainment Short Clips", 772000, 9630, "2026-09-22", "a Tony Robbins clip"),
    ("What if you bought #Apple stock instead of buying the first iPhone in 2007? #aapl #shorts #iphone", "GrowthShares", 18300, 3159, "2025-06-10",
     "near-twin of the pick's core; $4.39 split-adjusted in its description"),
    ("What if you bought Apple stock instead of every iPhone?", "The Market Feed", 9, 1320, "2026-09-27", "first iPhone ≈ $39,000 'today', price only"),
    ("The $499 Decision: Gadget vs. Growth 📱📈", "Asset vs. Time", 1400, 1258, "2026-01-17"),
    ("POV you invested $499 in Apple stock instead of buying the original iPhone in 2007", "tickkertokk", 6, 1160, "2026-09-14",
     "the POV header as a title; outlier score 82.9"),
    ("“If You Bought Apple Stock Instead of the First iPhone… 😱📱💰”", "Dollar Secrets", 6, 1132, "2025-09-30"),
    ("Every iPhone vs Apple Stock Since 2007 📱📈 #shorts", "TwansFinanceStudio", 1, 1127, "2026-10-05", "every iPhone, 17.5x; outlier score 375.7"),
    ("“What If You Invested $499 in Apple?", "Money Matters by VJ", 74, 937, "2026-02-16", "the write-up's title, nearly word for word"),
    ("Iphone vs Apple stock", "Spendvest", 24, 639, "2026-08-05", "$102 a share as quoted, $3.65 split-adjusted in its description"),
    ("Buying an iPhone Every Year vs. Buying Apple Stock", "Race Charts", 21, 350, "2026-09-21"),
    ("The first iPhone cost $599 in 2007. In Apple stock, that's $46,200 today.", "Assetly - Invest Smarter", 34, 22, "2026-10-07",
     "the 8GB price; valued at a 7 Oct 2026 close, per its description (not verified here)"),
    ("What If You Bought Apple Stock Instead of the First iPhone?", "Alpha Paradox", 1, 3, "2026-10-10",
     "3:55 long; the exact core of option 2; valued at a 28 Sep 2026 close, per its description (not verified here)"),
]
SAME_IDEA_HEADING = "**2. The same idea on YouTube is crowded, and its giants are India-facing (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "Sixteen videos in the two searches set the first iPhone (or every iPhone) against Apple stock, nine of them since August 2026. The two giants, Fintech Neeraj (29.7M) and warikoo (27.6M), "
    "are India-facing, in rupees. Among the US-dollar versions, only Sanjay Kathuria's every-iPhone video (146,640) and Bob Sharpe's 2022 Short (27,498) pass 10,000 views, and Bob Sharpe's "
    "puts the result in the title. The rest sit between 3 and 3,159 views.",
    "",
    "Two titles nearly match this sheet's: Alpha Paradox's 'What If You Bought Apple Stock Instead of the First iPhone?' (option 2's core) and Money Matters by VJ's 'What If You Invested $499 in Apple?' "
    "(the write-up's). The pick adds the $499 to the first and the house hashtags to both. Two titles in the table give the answer ('$21,000', '$46,200 today'); this one asks.",
    "",
    "Their descriptions quote at least six launch-day prices: $3.65, $3.69, $4.37, $4.359 and $4.39 split-adjusted, and $102 as quoted, against the $122.04 close ATPM reported, "
    "and they value the stake on different dates. So this sheet's copy names the $122.04 as quoted, the $3.65 adjusted, and the dated 12/31/2025 close.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): 16 first-iPhone-or-every-iPhone vs Apple stock videos, 9 since August 2026; the two over 27M are India-facing; "
                  "of the US-dollar ones only two pass 10,000 views. Two titles nearly match the candidates (Alpha Paradox, Money Matters by VJ). Descriptions quote at least six launch-day prices "
                  "and value the stake on different dates (several after 12/31/2025, not verified here), which is why the copy names the raw and adjusted prices and dates its close.")

OUTLIERS = [
    {"handle": "@claudiagadelha", "platform": "Instagram", "id": "Dbd-C6xjEmE",
     "on_screen": "WHAT IF A BOOMER INVESTED ONLY $10 A MONTH IN APPLE STOCK STARTING IN 1986? HERE'S HOW MUCH IT WOULD BE WORTH TODAY.",
     "views": "886.6K (24.2x the account median of 36.7K)",
     "note": "Apple stock on an animated line chart, music only, looped; frame 1 is the question"},
    {"handle": "@race_charts", "platform": "Instagram", "id": "Dct04VesZPy",
     "on_screen": "SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD",
     "views": "1.6M (60.9x the account median of 26.7K)",
     "note": "a product against its own maker's stock on a line chart, music only"},
    {"handle": "@investment_timeline", "platform": "TikTok", "id": "7671760671867997473",
     "on_screen": "POV: You invested in Monster instead of paying $3/day for a Monster Energy",
     "caption": "the POV line + #monster #energydrink #usa #investment #stocks", "views": "1.5M (140.6x)"},
    {"handle": "@data.dragonn", "platform": "TikTok", "id": "7680694072218029344",
     "on_screen": "POV: Someone invested $100 every month in the GoPro Stock over the last 12 years",
     "views": "1.4M (49.6x)", "note": "an honest loss; the premise on frame 1, no result"},
]
OUTLIERS_HEADING = "**3. The format travels on Instagram and TikTok; the iPhone version hasn't yet (vidIQ IG/TikTok outlier search).**"
OUTLIERS_MD = [
    "- **@claudiagadelha** (Instagram), \"WHAT IF A BOOMER INVESTED ONLY $10 A MONTH IN APPLE STOCK STARTING IN 1986? …\": 886.6K (24.2x). Apple stock on an animated chart, music only, looped.",
    "- **@race_charts** (Instagram), \"SMOKING A PACK OF MARLBORO A DAY VS BUYING THE STOCK INSTEAD\": 1.6M (60.9x). A product against its own maker's stock, the pairing this Short uses.",
    "- **@investment_timeline** (TikTok), \"POV: You invested in Monster instead of paying $3/day for a Monster Energy\": 1.5M (140.6x). Its caption is the POV line plus hashtags, with no result.",
    "- **@data.dragonn** (TikTok), \"POV: Someone invested $100 every month in the GoPro Stock over the last 12 years\": 1.4M (49.6x).",
    "- All four open on the premise with no number from the result on frame 1, which is what this Short's cover (frame 1) and caption do. "
    "Two concept searches for an iPhone-vs-Apple-stock Reel or TikTok (since 2024, at least 5K views) found none; the nearest is @claudiagadelha's Apple-stock chart.",
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
    ("DeIvYk7I4Qr", "$5,000 on the minimum", "Mon 22:46", 7302, 27.4, 56.5),
    ("DeOEthJJ1TG", "$1M stack vs Burj Khalifa", "Thu 00:28", 5449, 27.0, 83.1),
    ("DeWgFZRoR_S", "Missing dollar", "Sun 07:05", 1997, 32.0, 81.3),
    ("DeMvZv9IqRw", "Powerball $6.98", "Wed 12:05", 1825, 58.7, 57.9),
    ("DeYuqT4pjVC", "06c latte vs Starbucks stock", "Mon 03:46", 1711, 40.3, 69.1),
    ("DePe11HIHwn", "$1M in pennies", "Thu 13:37", 598, 42.0, 66.7),
    ("DeLSd9io8UK", "10 years late", "Tue 22:30", 219, 65.1, 30.6),
    ("DeEW2ZMIiYd", "Speed limit (e)", "Sun 05:54", 177, 56.9, 31.2),
    ("DeZov75oo9o", "06b Netflix bills vs Netflix stock", "Mon 12:14", 7, 100.0, 126.9),
]
OWN_HEADING = "**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights; refreshed 2026-10-13).**"
OWN_MD = [
    "Channel totals:",
    "",
    "- **YouTube:** 53 subscribers, 10,221 views and 41 videos (+27 subscribers, +5,127 views and 11 videos in 30 days).",
    "- **Instagram:** 8 followers and 20,518 views in 30 days.",
    "",
    "06c and 06b are live on both. 06c (Mon 03:45 ET): 760 views on YouTube and 1,711 plays on Instagram, with a 40.3% skip rate and 69.1% watched. "
    "06b went up at Mon 12:14 ET, midday, with option 3 of its sheet as the title: 75 views on YouTube after about 11 hours, and 7 plays on Instagram so far "
    "(its 100% skip rate and 126.9% watched are on a handful of plays, and Instagram's insights may lag).",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic; 06c and 06b left out, too young):",
    "",
    "- **YouTube:** Sunday early morning ET 1,199, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "One weekday evening is the best Instagram slot and the second-best YouTube slot, so the plan posts both then. "
    "On Instagram, skip rate predicts plays better than the hour does (27.0-27.4% for the top two, 56.9-65.1% for the bottom two). "
    "So the window is a light-touch test, and skip rate is the number to watch.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20518}
LIMITS = [
    "vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the same-idea Shorts' and outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views. Seven of the ten titles scored 96-97.",
    "vidIQ's YouTube outlier search returned only iPhone-review and phone-comparison Shorts for this topic (3 searches), so the same-idea table comes from YouTube search instead.",
    "AAPL's moves after 12/31/2025 come only from third-party descriptions (e.g. a 28 Sep 2026 close of $338.40 in Alpha Paradox's, a 7 Oct 2026 close of $336.55 in Assetly's); none is verified here, and none is in the copy, which says only that Apple has moved since.",
]
RESEARCH_EXTRA = {
    "search_context": [
        {"keyword": "iphone 18 pro", "est_monthly_searches": 2532128, "note": "+18.3% vs its baseline; the September 2026 launch"},
        {"keyword": "iphone duo", "est_monthly_searches": 3998667, "note": "−14.3% vs its baseline; a search for this year's phones, not the 2007 one"},
    ],
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "145 credits by this sheet's own calls (9 keyword queries, 2 YouTube searches, 3 outlier searches, 2 IG/TikTok searches, channel videos and stats, 11 title scores at 5 each; Instagram insights are free); the shared balance went from 5,330 to 5,180 over the same time. The adversarial check added about 30 (1 title score, 1 keyword query, channel stats and 3 YouTube searches); the shared balance went from 3,970 to 3,885 over that pass, with other agents drawing on it",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/06-pov-race.py: {MATH_RUN} on studio/specs/ (2026-10-13, re-run at the adversarial check; the first pass ran it at 442); "
                f"{MATH_RUN_WIP} with --spec on the condensed cut in studio/specs-wip/, whose header, footer, captions, verdict and data points equal the shipped cut's; "
                "every public figure traced to the 06a maths table and recomputed in this data file from the write-up's closes, "
                "each year's figure pinned beside its year and each direction word ('below', 'over', 'passes', 'knocks off') beside its figure, and every share price kept with 'adjusted' (COPY_RULES)"
                f"; re-run at the ship (2026-10-13), with the condensed cuts promoted into studio/specs/: {MATH_RUN_SHIP}")
VIDIQ_REQUERIED = ("pulled 2026-10-13: apple stock 18,675 / 42.2 (−21.5%); aapl stock 12,269 (+40.2%); what if you invested 9,269 (+79.0%); first iphone 9,281; "
                   "title scores 97 (pick), 96 (write-up title); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,518 views in 30 days; "
                   "06c (fbpdKf4Wy8c) 760 views, 06b (krfZEHhb0xU) 75 views, published 16:14 UTC (12:14 ET). Re-queried at the end of the pass: the pick's title score 97. Matches. "
                   "Re-queried at the adversarial check (2026-10-13): the pick's title score 97; apple stock 18,675 / 42.2 / 61.4 (−21.5%, baseline 23,783); "
                   "channel 53 subs / 10,221 views / 41 videos (+27 / +5,127 / 11 in 30 days); 06b's live title 'What If You Bought Netflix Stock Instead of Paying for Netflix? "
                   "#Netflix #NetflixStock #stocks' (75 views, 16:14 UTC) and 06c's 'What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? #Starbucks #LatteFactor #stocks' (760 views). All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/06-pov-race.py`: {MATH_RUN} on `studio/specs/` at this check (the first pass ran it at 442; the script has gained checks since), "
    f"and {MATH_RUN_WIP} with `--spec` on the condensed cut in `studio/specs-wip/`, which keeps the header, the footer, all 7 captions, the verdict and every data point word for word and value for value, "
    "so the copy carries over. Every public figure traces to the 06a maths table: $499 ÷ $3.65 (5.92 × 122.04 ÷ 198.08 = 3.6474) ≈ 136.7 shares; "
    "2007 $809; 2008 $348 (below $499); 2012 ≈ $2,200; 2017 $5,403 (10.83×); passes $10,000 in 2020; 2021 $23,713 → 2022 $17,451 (−26.4%, 'about a quarter'); "
    "136.7 × $271.12 ≈ $37,062 ≈ $37,000; $37,065.45 ÷ $499 = 74.28 ≈ 74×; log₂ 74.28 = 6.21 ≈ 6.2 doublings in 18.51 ≈ 18.5 years, one every 2.98 ≈ 3. "
    "The data file recomputes each one from the write-up's closes.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 97, the write-up's title 96. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days). 145 credits by this sheet's own calls (the shared balance went from 5,330 to 5,180). Re-queried at the end: the pick's title score 97 again.",
    "- **vidIQ re-queried (adversarial check).** The pick's title score 97; 'apple stock' 18,675 / 42.2 / 61.4 (−21.5%); channel 53 subscribers / 10,221 views / 41 videos; "
    "06b's live title (the Related video pick, `krfZEHhb0xU`, 75 views) and 06c's (`fbpdKf4Wy8c`, 760 views, the hashtag form too). All match. About 30 credits.",
    "- **Mutations.** Eight edits to a scratch copy of this data file each fail the numbers check by name: $809 and $348 swapped between 2007 and 2008, a bare '74×', '$271.12 (close)' without 'adjusted', a spelled-out 'seventy-four', $10,000 moved to 2021, '74×' in the title, '$37,000' in the caption's first 125 characters, and $122.04 without 'as quoted'. "
    "The adversarial check found ten more that passed, because each used a figure that is in FIGURES: '$348, above the $499', '$499 ÷ $3.66', 'a doubling about every 6 years', "
    "'3 doublings', 'Apple began paying them in 2017', 'the 6 p.m. close', 'under 10×', '2022 adds about a quarter', 'falls below $10,000' and 'doublings in 3 years'. "
    "The new COPY_RULES below catch all ten by name, and the first eight still fail.",
    "- **Changed.**",
    "  - The maths-check count in the intro, the facts and this log: 442 → 445 (the current run on `studio/specs/`; the write-up says 445 too).",
    "  - 'Eight of the ten scored titles land at 96-97' (title notes and Limits): it is seven (97, 97, 96 ranked; 97, 97, 97, 96 also scored; then 90, 88, 88).",
    "  - The pinned-comment note said the same-idea Shorts quote prices 'from $3.65 to $122.04'. Theirs run from $3.65 adjusted to $102 as quoted; the $122.04 is ATPM's, not theirs.",
    "  - Instagram hashtags: '#stocks and #investing are the broad layer, as on 06c and 06b'. 06c's caption has `#investing` but no `#stocks`, so the note now says so.",
    "  - Section 2 quoted a third answer-giving title, 'Your First iPhone Cost You a Car', that is not in the table, and a search did not find it. It is dropped; the two titles in the table that give the answer stay.",
    "  - The intro said the caption keeps 'every number but the $499' below 'more'. The year 2007 is in the first line too, so it now says so.",
    "  - Section 4 called the condense '(fewer still moments) the bigger reach lever'. That describes pacing, which this sheet does not, so it now says only that skip rate is the number to watch.",
    "  - The research note on 'iphone duo' called it 'Apple's first foldable', a product claim that no vidIQ result or write-up source carries. It now says only that the search is for this year's phones.",
    "  - COPY_RULES: ten new rules (see Mutations). Each direction word stays with its figure: $348 with 'below'; 10× with 'over'; $10,000 with 'passes'; 'a quarter' with 'knocks off' or 'loses'. "
    "'Below $499' sits beside 2008, and Apple's first dividend beside 2012. The buy price after '$499 ÷' is $3.65, and $3.66 appears only as 'some sites show $3.66'. "
    "The doublings read 6.2 in 18.5 years, one every 3. The 4 p.m. is the close, and the 6 p.m. is the phone's sale.",
    "  - No copy a viewer sees changed: the title, description, tags, pinned comment, caption, hashtags, alt text and first comment are as the first pass wrote them.",
    "- **Found on the way.** 06b is live on both platforms (YouTube `krfZEHhb0xU`, Instagram `DeZov75oo9o`, Mon 12 Oct 12:14 ET), with its sheet's option 3 as the title "
    "(the hashtag form) and at midday rather than the evening slot. So this sheet's pick is the hashtag form the owner has now used twice, its related video is 06b, and the October tables include both races.",
    "- **Kept on purpose.**",
    "  - The cover is frame 1 (no result), as the write-up's own Instagram note says, not a verdict frame as on 06c.",
    "  - The title keeps the $499 but not the 2007: the header and the year clock show 2007 on frame 1, and the 2007 variant scored the same at 95 characters.",
    "  - The description and the pinned comment name the raw $122.04 beside the adjusted $3.65. It is in the write-up's sources, and same-idea descriptions quote at least six launch-day prices.",
    "  - The caption's first line carries the write-up's numberless verdict ('The phone got old. The shares didn't.'): it hints at the direction, not the size, as 06b's does.",
    "  - The audio name carries 'iPhone' and 'Apple', as 06c's carries 'Starbucks': it names the topic, and the copy says 'Not affiliated with or endorsed by Apple.'",
    f"- **Done on ship (2026-10-13).** Rebuilt with `--covers` from the shipped condensed cut ({VIDEO_S:g} s). Frame 1 was re-picked by content and is still frame 0, now with 'Launch day 2007:' lit in the hook caption. "
    f"The Video bullet, the cut and the check counts follow the shipped file ({MATH_RUN_SHIP} on `studio/specs/`), and the long alt text was re-read against the condensed beat sheet: "
    "every beat it names is in the shipped cut, so no copy changed.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 06a maths table (teasers/v2/06-pov-race.md, section (b) 06a) and
# recomputed below from its inputs; dates, the $499 price, the 4GB model, the 6 p.m. launch and the 4 p.m. close are inputs,
# quoted from the write-up's sources and assumptions.
FIGURES = {
    "$499", "4", "6", "$3.65", "$3.66", "$122.04", "136.7", "$271.12", "$37,062", "$37,000", "74", "74×", "6.2", "18.5", "3", "10×",
    "$809", "$348", "$2,200", "$5,403", "$10,000", "$23,713", "$17,451",
    "2007", "2008", "2012", "2017", "2020", "2021", "2022", "2025", "6/29/2007", "12/31/2025", "12/31/25",
}
# the write-up's inputs (06a, The maths and Sources)
_price, _raw_launch, _raw_ye2007, _sm_ye2007, _sm_launch = 499, 122.04, 198.08, 5.92, 3.66
_mt = {2007: 5.97, 2008: 2.57, 2012: 16.06, 2017: 39.52, 2019: 70.66, 2020: 128.82, 2021: 173.45, 2022: 127.65, 2025: 271.12}
_k = _sm_ye2007 / _mt[2007]                                   # bridges Macrotrends' 2007-2011 rows to the 2012+ basis
_close = {y: (c * _k if y < 2012 else c) for y, c in _mt.items()}
_buy_exact = _sm_ye2007 * _raw_launch / _raw_ye2007           # 3.6474
_buy = 3.65
_sh = _price / _buy                                           # 136.712
_v = {y: _sh * c for y, c in _close.items()}
_final = _v[2025]
import datetime as _dt
import math as _math
_years = (_dt.date(2025, 12, 31) - _dt.date(2007, 6, 29)).days / 365.25
_dbl = _math.log2(_final / _price)
MATH_RELATIONS = [
    (round(_buy_exact, 4) == 3.6474 and round(_buy_exact, 2) == _buy, "5.92 × 122.04 ÷ 198.08 = 3.6474 → $3.65 (adjusted)"),
    (round(_sm_launch / _sm_ye2007, 4) != round(_raw_launch / _raw_ye2007, 4), "StatMuse's $3.66 is off its own $5.92 on the raw ratio (cross-check only)"),
    (round(_sh, 1) == 136.7, "$499 ÷ $3.65 ≈ 136.7 shares"),
    (round(_v[2007]) == 809, "end of 2007: $809"),
    (round(_v[2008]) == 348 and _v[2008] < _price, "end of 2008: $348, below the $499"),
    (round(_v[2012], -2) == 2200, "end of 2012: about $2,200"),
    (round(_v[2017]) == 5403 and 10 < _v[2017] / _price < 11, "end of 2017: $5,403, over 10× the $499"),
    (_v[2019] < 10000 < _v[2020], "passes $10,000 in 2020"),
    (round(_v[2021]) == 23713 and round(_v[2022]) == 17451, "end of 2021 $23,713 → end of 2022 $17,451"),
    (0.20 <= 1 - _v[2022] / _v[2021] <= 0.30, "2022 knocks off 'about a quarter' (26.4%)"),
    (round(136.7 * 271.12) == 37062, "136.7 × $271.12 ≈ $37,062"),
    (round(_final, -3) == 37000 and round(37062, -3) == 37000, "$37,065.45 and $37,062 ≈ $37,000"),
    (round(_final / _price) == 74 and round(37062 / _price) == 74, "≈ 74× the $499 (74.28; 74.27 on $37,062)"),
    (round(_dbl, 1) == 6.2 and round(_years, 1) == 18.5 and round(_years / _dbl) == 3, "6.2 doublings in 18.5 years: one every ≈ 3 years"),
]
MATH_SCRIPT = "teasers/v2/checks/06-pov-race.py"
MATH_KEY_LINES = ["$499 at 3.65 (adj; exact 3.6474) -> 37,065.45 at 12/31/2025", "= x74.28, 6.21 doublings in 18.51 y (1 per 2.98 y)",
                  "2008.99:nan|348", "2017.99:nan|5,403", "2022.99:nan|17,451", "2025.99:499|37,065"]
RESULT_RE_TITLE = r"74|37,0|136\.7|6\.2|doubl|\$809|\$348|2,200|5,403|10,000|10×|quarter|23,713|17,451|271\.12"
RESULT_RE_CAPTION = r"74|37,0|136\.7|6\.2|doubl|\$809|\$348|2,200|5,403|10,000|10×|quarter|23,713|17,451|271\.12|\$3\.65"

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits beside the right year, so a
# swapped "End of 2008: $809" or a spelled-out "seventy-four" would pass it. These pin each figure to its context.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_YEAR = _re.compile(r"(?<![/\d])20[012]\d(?!\d)")      # a year, 2000-2029 (not the 6/29/2007 or 12/31/2025 dates)
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _beside(fig, year, reach=60):
    """every occurrence of fig has its year on the same line, within reach characters, with no other year between them"""
    return all(any(y.group() == year and abs(y.start() - m.start()) <= reach
                   and not _YEAR.search(ln[min(y.end(), m.end()):max(y.start(), m.start())]) for y in _YEAR.finditer(ln))
               for ln in _lines() for m in _re.finditer(fig, ln))


def _with(fig, needs, skip=()):
    """every line that names fig also names one of needs"""
    return all(any(n in ln for n in needs) for ln in _lines(skip) if _re.search(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|quarter)\b", _re.I)
COPY_RULES = [
    (_beside(r"\$809", "2007") and _beside(r"\$348", "2008"), "$809 sits beside 2007 and $348 beside 2008"),
    (_beside(r"\$2,200", "2012") and _beside(r"\$5,403", "2017") and _beside(r"10×", "2017"), "$2,200 sits beside 2012, and $5,403 and 10× beside 2017"),
    (_beside(r"\$10,000", "2020"), "$10,000 sits beside 2020"),
    (_beside(r"\$23,713", "2021") and _beside(r"\$17,451", "2022") and _beside(r"quarter", "2022"), "$23,713 sits beside 2021, and $17,451 and 'a quarter' beside 2022"),
    (all(_re.search(r"(?:≈|about) \$37,000", ln, _re.I) for ln in _lines() if "$37,000" in ln), "$37,000 is always 'about' or '≈'"),
    (all(_re.search(r"(?:≈|about) 74\b", ln, _re.I) for ln in _lines() if _re.search(r"\b74\b", ln)), "74 is always 'about' or '≈'"),
    (all(_re.search(r"(?:≈|about) \$2,200", ln, _re.I) for ln in _lines() if "$2,200" in ln), "$2,200 is always 'about'"),
    (all(_re.search(r"(?:≈ |about |about every )3 years", ln, _re.I) for ln in _lines() if _re.search(r"\b3 years", ln)), "the 3 years is always 'about' or '≈'"),
    (_with(r"\b74\b", ("$499",)), "74 comes with the $499 it multiplies"),
    (_with(r"\$3\.65|\$3\.66|\$271\.12", ("adjusted",)), "every share price ($3.65, $3.66, $271.12) comes with 'adjusted'"),
    (_with(r"\$122\.04", ("as quoted",)), "the raw $122.04 is always 'as quoted at the time'"),
    (_with(r"\$37,0", ("12/31/2025", "2025")), "the finish always comes with its date"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} <= {"quarter"},
     "no spelled-out figures beyond 'a quarter' (2022, −26.4%)"),
    # adversarial check: a figure that is in FIGURES can still be put in the wrong place or turned the wrong way
    (_with(r"\$348", ("below the $499",)), "$348 always comes with 'below the $499'"),
    (_beside(r"below (?:the )?\$499", "2008"), "'below $499' sits beside 2008"),
    (all(m.group(1) == "over" for ln in _lines() for m in _re.finditer(r"(\w+) 10×", ln)), "10× is always 'over 10×'"),
    (all(m.group(1) == "passes" for ln in _lines() for m in _re.finditer(r"(\w+) \$10,000", ln)), "$10,000 is always 'passes $10,000'"),
    (all(_re.search(r"(?:knocks off|loses) about a quarter", ln) for ln in _lines() if "quarter" in ln), "'a quarter' is always 'knocks off' or 'loses about a quarter'"),
    (all(m.group(1) == "3.65" for ln in _lines() for m in _re.finditer(r"\$499 ÷ \$([\d.]+)", ln)), "the buy price after '$499 ÷' is $3.65"),
    (_with(r"\$3\.66", ("some sites show $3.66",)), "$3.66 appears only as 'some sites show $3.66'"),
    (all(m.groups() == ("6.2", "18.5") for ln in _lines() for m in _re.finditer(r"([\d.]+) doublings in ([\d.]+) years", ln))
     and all(m.group(1) == "3" for ln in _lines() for m in _re.finditer(r"every (?:≈ )?(\S+) (?:years|yrs)", ln)),
     "6.2 doublings in 18.5 years, one every 3"),
    (_beside(r"began paying", "2012"), "Apple's first dividend sits beside 2012"),
    (all((m.group(1) == "4") == bool(m.group(2)) for ln in _lines() for m in _re.finditer(r"(\d) p\.m\.( close)?", ln))
     and _with(r"6 p\.m\.", ("on sale",)), "the 4 p.m. is the close and the 6 p.m. is the phone's sale"),
]
