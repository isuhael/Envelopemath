#!/usr/bin/env python3
"""Builds publishing/06c-becker-rig-latte-starbucks.{md,json} from one set of strings,
so the copy-paste sheet and the machine-readable file can never drift apart."""
import json, os

OUT = "/home/user/Envelopemath/publishing"
BASE = "06c-becker-rig-latte-starbucks"

# ---------------------------------------------------------------- YouTube
YT_TITLE_CORE = "What If You Bought Starbucks Stock Instead of a $4 Latte Every Day?"
YT_TITLE_TAGS = "#Starbucks #LatteFactor #stocks"
YT_TITLE = f"{YT_TITLE_CORE} {YT_TITLE_TAGS}"

YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 97, "chars": len(YT_TITLE),
     "note": "PICK. The core title alone also scores 97 (67 chars). House template: 3 hashtags in the title. "
             "Fallback if YouTube Studio counts it over 100: drop '#stocks' (91 chars)."},
    {"rank": 2, "title": "What If You Invested in Starbucks Instead of Buying a $4 Latte Every Day Since 2014?",
     "vidiq_score": 96,
     "chars": len("What If You Invested in Starbucks Instead of Buying a $4 Latte Every Day Since 2014?"),
     "note": "Carries the start year and the 'what if you invested' phrase; at 84 chars there is no room for the house hashtags."},
    {"rank": 3, "title": "What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?", "vidiq_score": 89,
     "chars": len("What If Every $4 Starbucks Latte Bought Starbucks Stock Instead?"),
     "note": "The write-up's title. Same idea, 8 points lower, and 'Starbucks Stock' sits at the end."},
]
YT_TITLES_ALSO_SCORED = [
    ("What If You Bought Starbucks Stock Instead of a $4 Latte Every Day Since 2014?", 97, "78 chars, no room for hashtags"),
    ("What If You Bought Starbucks Stock Instead of a $4 Latte Every Day? #starbucks #lattefactor #investing", 97, "102 chars: over the 100 limit"),
    ("What If You Invested in Starbucks Instead of Buying a $4 Latte?", 94, ""),
    ("What If You Invested in Starbucks Instead of Buying a $4 Latte? #starbucks #lattefactor #investing", 94, ""),
    ("The Latte Factor, Tested on Starbucks Stock: $4 a Day Since 2014", 84, ""),
    ("$4 Latte Every Day Since 2014 vs Starbucks Stock: The Latte Factor Tested", 84, ""),
    ("Skip the $4 Latte, Buy Starbucks Stock? 12 Years of Math", 82, ""),
    ("The Latte Factor, Tested on Starbucks Itself", 82, ""),
]

YT_DESCRIPTION = """What if every $4 Starbucks latte since 2014 had bought Starbucks stock instead? The latte factor, tested on Starbucks itself: $17,532 of lattes vs about $24,900 in stock. About 1.4×. Not rich. Not zero.

The math, shown:
• $4 × 365 = $1,460 a year, each year's money buying SBUX at that year's average price (dividends reinvested).
• By the end of 2021: $11,688 in, $24,343 in stock. Doubled (2.08×).
• Then it stalls. 2022–2025: another $5,844 in, but the stake grew just $585. The 229 shares held at the end of 2021 fell from $106.24 to $84.21.
• End (12/31/2025 close): 296.0 shares × $84.21 ≈ $24,926, vs $17,532 of lattes. ≈ 1.4×.
• The cups are worth $0. The stock is not zero.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. $4 ≈ a grande latte ($3.65 in 2014, $4.45 in 2024; FinanceBuzz via Visual Capitalist), held flat every day from 1/1/2014 to 12/31/2025. Each year buys at that year's average SBUX price, adjusted for splits and dividends (Macrotrends); valued at the 12/31/2025 close; no fees or taxes. Not financial advice.
#Starbucks #LatteFactor #stocks"""

YT_HASHTAGS = ["#Starbucks", "#LatteFactor", "#stocks"]

YT_TAGS = ["starbucks stock", "latte factor", "the latte factor", "what if you invested",
           "buying starbucks coffee stock", "starbucks stock vs coffee", "invest instead of buying coffee",
           "skip coffee and invest", "latte factor myth", "the latte factor investing", "$4 a day invested",
           "sbux", "starbucks stock dividends reinvested", "what happened to starbucks stock",
           "dollar cost averaging", "opportunity cost", "money math", "math animation",
           "the back of the envelope", "envelope math"]

YT_PINNED = """A grande latte was $3.65 in 2014 and $4.45 in 2024 (FinanceBuzz). What does your daily coffee cost now?

Check the end: 296.0 shares × $84.21 (12/31/2025 close) ≈ $24,926, vs $17,532 of lattes. ≈ 1.4×."""

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("What if every $4 Starbucks latte since 2014 had bought Starbucks stock instead? "
           "The latte factor, tested on Starbucks itself.")

IG_CAPTION = IG_HOOK + """

POV: since 2014 you invested in Starbucks instead of paying $4/day for a Starbucks latte. Each year's latte money buys SBUX at that year's average price, dividends reinvested.

The math, shown:
• $4 × 365 = $1,460 a year of lattes.
• By the end of 2021: $11,688 in, $24,343 in stock. Doubled.
• 2022–2025: another $5,844 in, but the stake grew just $585.
• End of 2025: $17,532 of lattes vs ≈ $24,900 in stock. ≈ 1.4×.

Not rich. Not zero. The cups are worth $0; the stock isn't.

Is the latte factor real? On Starbucks itself, 12 years of lattes came to about 1.4 times the money, with almost no growth after 2021.

$4 ≈ a grande latte ($3.65 in 2014, $4.45 in 2024; FinanceBuzz), held flat. Valued at the 12/31/2025 close ($84.21); no fees or taxes. Not financial advice.

What do you pay for your latte now?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#thelattefactor #starbucks #SBUX #investing #personalfinance"""

IG_HASHTAGS = ["#thelattefactor", "#starbucks", "#SBUX", "#investing", "#personalfinance"]

IG_ALT_SHORT = ("Animated chart: $4/day Starbucks lattes since 2014 = $17,532 spent vs about $24,900 "
                "in Starbucks stock, about 1.4x.")
IG_ALT_LONG = ("Animation on a white background. A green stick figure pays $4 for a latte every day from 2014 "
               "to 2025, drinks it and tosses the cup onto a growing pile, while a coin lands on a tower of "
               "gold coins labelled SBUX. Counters: $17,532 spent on lattes vs about $24,900 in Starbucks stock. "
               "The stock doubles the money by 2021, then stalls. Verdict: about 1.4 times. Not rich. Not zero.")

IG_FIRST_COMMENT = ("Cups: $0. Stock: ≈ $24,900, on $17,532 of lattes. A grande latte was $3.65 in 2014 and "
                    "$4.45 in 2024 (FinanceBuzz). What does yours cost now?")

COVER_FFMPEG = ('ffmpeg -ss <T> -i <condensed.mp4> -frames:v 1 -vf "crop=1080:1440:0:60" -q:v 2 '
                f'publishing/{BASE}-cover-3x4.jpg')

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note
    ("what if you invested", 9302, 59.2, 37.5, 60.5, "+79.6% vs its 30-day baseline (5,178)"),
    ("starbucks stock", 7441, 57.8, 39.5, 58.9, "seed; 'is starbucks stock a buy now' (4,548) is advice intent, not used"),
    ("the latte factor", 5052, 55.3, 27.8, 62.1, "flat (0% growth)"),
    ("if you invested $2 a day in coca-cola stock instead of drinking coca-cola", 5237, 55.5, 21.2, 64.8, "same format, other brand"),
    ("the latte factor is a lie", 4511, 54.5, 23.0, 63.5, "demand for the sceptical angle; our answer is 'not rich, not zero', so it is not in the copy"),
    ("latte factor", 4455, 54.5, 29.2, 61.0, "low competition"),
    ("buying starbucks coffee stock", 3577, 53.0, 28.1, 60.6, ""),
    ("the latte factor investing", 3465, 52.8, 13.3, 66.4, "lowest competition in the cluster"),
    ("starbucks (topic)", 156350, 77.5, 69.4, 58.8, "+55.4% vs 30-day baseline (100,602): seasonal tailwind"),
    ("invest instead of buying coffee", 0, 0, None, None, "<750/month: too small to target"),
]

YT_SAME_IDEA = [  # title, channel, subs, views, date
    ("How Much Would YOU Make Buying STARBUCKS instead of STARBUCKS?", "Weekly Theta", 1160, 9575, "2024-01-17"),
    ("$6 Starbucks a Day Since 2010: Coffee vs $SBUX Stock", "Stocks with Josh", 196000, 5636, "2026-06-23"),
    ("What If You Bought Starbucks Stock Instead of their Coffee? World's most expensive coffee! #stock", "TickerTimeMachine", 6, 1901, "2025-05-08"),
    ("If you invested your Starbucks order instead…", "Patrick Kenney", 41400, 1256, "2025-09-16"),
    ("☕ What if you invested $2 a day in Starbucks instead of buying coffee? 🤯💰", "Market Data Daily", 4, 570, "2025-03-12"),
    ("Skip the $5 latte, buy Starbucks stock? 10 years of data.", "Assetly - Invest Smarter", 29, 71, "2026-10-08"),
    ("Skip your $5 latte and become a millionaire? #shorts", "Money, Drawn", 2, 32, "2026-09-28"),
]

OWN_YT = [  # id, title, posted (ET), views
    ("hJBvmGA6sZ0", "You Can Lean on $1 Million. Not on $1 Billion.", "Thu 00:25", 1221),
    ("LjHDFzVxRyM", "Can You Find the Missing Dollar?", "Sun 07:04", 1215),
    ("XVUeMcTg9OQ", "Your Interest Has a Speed Limit", "Sun 05:49", 1141),
    ("8__HTUa2PoU", "Pay the Minimum on $5,000? 238 Months.", "Mon 22:09", 642),
    ("FW_oxA3kbsM", "A $2 Lottery Ticket Was Worth $6.98. Until the Fine Print.", "Wed 12:03", 348),
    ("mXbKY_R63h4", "You Can Carry $1 Million. Not in Pennies.", "Thu 13:38", 175),
    ("EqFQCJheCMU", "Start Investing 10 Years Late? You Get Half.", "Tue 22:27", 160),
]
OWN_IG = [  # shortcode, topic, posted (ET), plays, skip rate %, avg watched %
    ("DeIvYk7I4Qr", "$5,000 on the minimum", "Mon 22:46", 7251, 27.5, 56.5),
    ("DeOEthJJ1TG", "$1M stack vs Burj Khalifa", "Thu 00:28", 5431, 27.0, 83.1),
    ("DeWgFZRoR_S", "Missing dollar", "Sun 07:05", 1907, 32.4, 80.4),
    ("DeMvZv9IqRw", "Powerball $6.98", "Wed 12:05", 1759, 59.7, 58.0),
    ("DePe11HIHwn", "$1M in pennies", "Thu 13:37", 596, 41.7, 67.2),
    ("DeLSd9io8UK", "10 years late", "Tue 22:30", 219, 65.1, 30.6),
    ("DeEW2ZMIiYd", "Speed limit (e)", "Sun 05:54", 177, 56.9, 31.2),
]


def tag_chars(tags):
    return sum(len(t) + (2 if " " in t else 0) for t in tags) + len(tags) - 1


meta = {
    "id": BASE,
    "teaser": "06c Becker Rig, pov-race: \"What if every $4 Starbucks latte bought Starbucks stock instead?\"",
    "prepared": "2026-10-12",
    "for_video": {
        "current_render": "renders/channel/06c-becker-rig-latte-starbucks.mp4",
        "current_duration_s": 30.5,
        "current_sha256": "ca342ff6b8a4f50284e25808fb52fb906e65dcc589e2dc77218523a0e3af718b",
        "note": "Metadata is cut-independent: it names no timestamps. A condensed cut is in progress; "
                "re-export the cover from the final render by content (see instagram.cover)."},
    "facts": {
        "source": "teasers/v2/06-pov-race.md section (b) 06c; teasers/v2/checks/06-pov-race.py: 436 checks, 0 failed (run 2026-10-12)",
        "stake": "$4/day, every day 1/1/2014-12/31/2025, held flat ($4 ≈ a grande latte: $3.65 in 2014, $4.45 in 2024, FinanceBuzz via Visual Capitalist)",
        "per_year": "$1,460 ($4 × 365; $1,464 in 2016, 2020, 2024)",
        "spent_total": "$17,532 ($4 × 4,383 days)",
        "end_2021": "$11,688 in, $24,343 in stock (2.08×, 'doubled')",
        "stall_2022_2025": "another $5,844 in, stake +$585 ($24,343 → $24,928); the 229 shares held at end-2021 fell $106.24 → $84.21",
        "final": "296.03 shares × $84.21 = $24,928.31 ≈ $24,900 (pinned: 296.0 × $84.21 ≈ $24,926)",
        "multiple": "24,928.31 ÷ 17,532 = 1.42 ≈ 1.4×",
        "method": "each year buys at that year's average SBUX close, adjusted for splits and dividends (Macrotrends), so dividends are reinvested; no fees or taxes",
        "verdict": "≈ 1.4×. Not rich. Not zero.",
    },
    "youtube": {
        "titles_ranked": YT_TITLES,
        "titles_also_scored": [{"title": t, "vidiq_score": s, "chars": len(t), "note": n} for t, s, n in YT_TITLES_ALSO_SCORED],
        "title_pick": YT_TITLE,
        "title_pick_chars": len(YT_TITLE),
        "description": YT_DESCRIPTION,
        "description_chars": len(YT_DESCRIPTION),
        "hashtags_in_order": YT_HASHTAGS,
        "hashtag_rules": "Title hashtags show as links in the title; with none in the title, the first 3 description hashtags show above it. Over 60 hashtags and YouTube ignores all of them. #Shorts is not needed (vertical, under 3 min).",
        "tags": YT_TAGS,
        "tags_chars_as_youtube_counts": tag_chars(YT_TAGS),
        "pinned_comment": YT_PINNED,
        "related_video": {
            "pick": {"id": "EqFQCJheCMU", "title": "Start Investing 10 Years Late? You Get Half.",
                     "url": "https://www.youtube.com/shorts/EqFQCJheCMU",
                     "why": "Same viewer intent: a small amount invested over years. It pairs this Short's stall with the cost of waiting, without repeating it."},
            "swap_when_live": "06a (first iPhone vs Apple stock) or 06b (Netflix bill vs Netflix stock): the same POV-race series, once published.",
            "end_screen": "Shorts have no end screens or cards. The Related video link is the Shorts equivalent."},
        "thumbnail_frame": "In the YouTube app, pick the verdict-hold frame (the same content as the IG cover).",
        "settings": {"category": "Education", "audience": "Not made for kids",
                     "altered_or_synthetic_content": "No (animated chart, not realistic footage)",
                     "remixing": "Allow", "captions": "None needed (no narration; all text is on screen)"},
        "posting_window": {
            "when": "First Tue-Thu evening after the condensed render passes QA; earliest Wed 14 Oct 2026, 21:30-22:30 ET (Thu 01:30-02:30 UTC). Sunday 06:00-08:00 ET is the alternative.",
            "spacing": "Keep it at least 6 h from any other upload on the channel.",
            "why": "The channel's own October Shorts, median views by posting slot: Sunday 05:00-08:00 ET 1,178 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 262 (n = 2). The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. Search demand: 'starbucks' runs +55.4% over its 30-day baseline (fall menu season). Starbucks' next quarterly report is due in late October, per a third-party Short's description (not verified). Posting about two weeks earlier gives the Short time to be indexed if 'starbucks stock' interest rises then. The copy mentions neither.",
        },
    },
    "instagram": {
        "caption": IG_CAPTION,
        "caption_chars": len(IG_CAPTION),
        "caption_first_125": IG_CAPTION[:125],
        "caption_rule": "The first 125 characters are the question and the 'latte factor' keyword, no result: the caption overlays the Reel from frame 1, so the result sits below 'more'.",
        "hashtags_in_order": IG_HASHTAGS,
        "hashtag_rule": "Instagram caps a post at 5 hashtags (since Dec 2025).",
        "alt_text_short": IG_ALT_SHORT,
        "alt_text_long": IG_ALT_LONG,
        "alt_text_where": "Advanced settings → Accessibility → Alt text, if your app shows it for Reels.",
        "cover": {
            "files": {"3x4": f"publishing/{BASE}-cover-3x4.jpg", "9x16": f"publishing/{BASE}-cover-9x16.jpg"},
            "frame_in_current_render_s": 24.5,
            "frame_by_content": "The verdict hold: '$0 left' in the empty spent column, the '≈ 1.4×' mark on the tower top, '$17,532 spent' vs '≈ $24,900', and the line '≈ 1.4×. Not rich. Not zero.' fully drawn. Use the first settled frame of that hold, before the em end card.",
            "crop": "3:4 = 1080×1440 from y 60 to 1500 of the 1080×1920 frame (badge, header, both numbers, both piles and the verdict line; drops the empty floor). A centred grid crop (y 240-1680) cuts the badge.",
            "how_to_set": "In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab and cuts both numbers.",
            "re_export": COVER_FFMPEG,
        },
        "first_comment": IG_FIRST_COMMENT,
        "first_comment_action": "Post it right after publishing and pin it.",
        "trial_reels": {
            "recommendation": "Post as a regular Reel, not a Trial.",
            "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
            "use_trial_for": "A hook test afterwards, if you want one: the other cut (for example the 30.5 s render against the condensed one) as a Trial with MANUAL graduation 48-72 h later. Compare skip rate (October Reels ran 27.0-65.1%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
        },
        "settings": {"audio": "Rename the original audio to 'Latte vs Starbucks stock — The Back of the Envelope' if the app allows; it is the score, with no voice.",
                     "share_to_feed": "On", "google_indexing": "Public professional-account posts can appear in Google/Bing since 10 Jul 2025, so the caption is written as a searchable question."},
        "posting_window": {
            "when": "Same evening as YouTube: earliest Wed 14 Oct 2026, 21:45-22:45 ET, about 15 min after the Short.",
            "why": "October Reels, median plays by posting slot: weekday 22:00-00:30 ET 5,431 (n = 3, including the two best: 7,251 and 5,431), weekday midday 1,178 (n = 2), Sunday 05:00-08:00 ET 1,042 (n = 2). Skip rate tracks plays more closely than the hour does: 27.0-27.5% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
        },
    },
    "research": {
        "keywords_youtube": [
            {"keyword": k, "est_monthly_searches": v, "volume": vol, "competition": c, "overall": o, "note": n}
            for k, v, vol, c, o, n in KEYWORDS],
        "keywords_source": "vidIQ keyword research (research and matching_terms modes), metrics as of 2026-10-11",
        "same_idea_youtube_shorts": [
            {"title": t, "channel": ch, "subscribers": s, "views": v, "published": d} for t, ch, s, v, d in YT_SAME_IDEA],
        "same_idea_note": "vidIQ YouTube search, short, by view count: the biggest English Short on this exact idea has 9,575 views. The niche is thin; no channel owns it. Assetly's 2026-10-08 Short reaches the same 'meh' verdict on 10 years at $5/day (≈ $21,277 on $18,265, price only).",
        "instagram_tiktok_outliers": [
            {"handle": "@davidlbach", "platform": "Instagram", "id": "Dc_YjEkKJg2",
             "on_screen": "The Latte Factor! DRINKING A STARBUCKS COFFEE A DAY VS BUYING THE STOCK INSTEAD (SBUX)",
             "caption_opens": "#thelattefactor math is real.",
             "views": "1.9M in vidIQ's outlier index (201.5x the account median of 9.7K); the profile endpoint shows 16.7K plays for the same reel",
             "span": "1992-2026, the IPO-era run"},
            {"handle": "@investment_timeline", "platform": "TikTok", "id": "7671760671867997473",
             "on_screen": "POV: You invested in Monster instead of paying $3/day for a Monster Energy",
             "caption": "the POV line + #monster #energydrink #usa #investment #stocks", "views": "1.5M (140.6x)"},
        ],
        "own_channel_youtube_october_shorts": [
            {"id": i, "title": t, "posted_et": p, "views": v} for i, t, p, v in OWN_YT],
        "own_channel_instagram_october_reels": [
            {"shortcode": s, "topic": t, "posted_et": p, "plays": pl, "skip_rate_pct": sk, "avg_watched_pct": aw}
            for s, t, p, pl, sk, aw in OWN_IG],
        "channel_stats": {"youtube_subscribers": 53, "youtube_views": 8995, "youtube_videos": 39,
                          "youtube_30d": "+27 subscribers, +3,901 views, 9 videos",
                          "instagram_followers": 8, "instagram_30d_views": 18600},
        "limits": [
            "vidIQ's YouTube authorization is a different channel (UCRC5v_El2fibbkqsZs6uFjA), so @envelopemath's YouTube Analytics (audience hours, geography) were not readable. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
            "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the outliers' own tags.",
            "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
        ],
    },
}

# ---------------------------------------------------------------- write JSON
os.makedirs(OUT, exist_ok=True)
with open(f"{OUT}/{BASE}.json", "w", encoding="utf-8") as f:
    json.dump(meta, f, ensure_ascii=False, indent=2)
    f.write("\n")

# ---------------------------------------------------------------- write MD
yt, ig, r = meta["youtube"], meta["instagram"], meta["research"]
L = []
a = L.append
a("# 06c publishing sheet: $4 latte vs Starbucks stock")
a("")
a("YouTube Shorts (@envelopemath) and Instagram Reels (@envelopemath). Prepared 2026-10-12. "
  "Machine-readable twin: `publishing/06c-becker-rig-latte-starbucks.json`.")
a("")
a("- **Video.** `renders/channel/06c-becker-rig-latte-starbucks.mp4` (30.5 s now). A condensed cut is in progress. "
  "Nothing below names a timestamp except the cover, which is picked by content.")
a("- **Numbers.** Every figure comes from `teasers/v2/06-pov-race.md` (06c) and its check, "
  "`python3 teasers/v2/checks/06-pov-race.py`: 436 checks, 0 failed (run 2026-10-12).")
a("- **Honesty rules kept.** The title asks and never gives the result. The Instagram caption keeps the result below 'more'. "
  "Every claim stays inside \"≈ 1.4×. Not rich. Not zero.\" No advice, no urgency, and 'Not financial advice.' is in both.")
a("")
a("---")
a("")
a("## YouTube Shorts")
a("")
a("### Title (vidIQ title score, short-form, scored against this channel)")
a("")
a("| # | Title | Score | Chars |")
a("|---|---|---:|---:|")
for t in YT_TITLES:
    a(f"| {t['rank']} | {t['title']} | {t['vidiq_score']} | {t['chars']} |")
a("")
a("**Pick (paste):**")
a("")
a("```")
a(YT_TITLE)
a("```")
a("")
a(f"- {len(YT_TITLE)} of 100 characters. If YouTube Studio counts it over 100, drop `#stocks` (91 chars).")
a("- 'Starbucks Stock' sits at characters 20-34, inside what the Shorts player shows before it truncates. It has the exact phrase 'starbucks stock' (7,441 searches a month). It also uses the 'what if you …' grammar of 'what if you invested' (9,302, +79.6%); option 2 carries that phrase word for word, for 1 point less.")
a("- Still a question, still second person, still the same brand on both sides. It raises the write-up's title from 89 to 97.")
a("- Also scored, not used: " + "; ".join(f"\"{t}\" {s}" + (f" ({n})" if n else "") for t, s, n in YT_TITLES_ALSO_SCORED) + ".")
a("")
a("### Description (paste)")
a("")
a("```")
a(YT_DESCRIPTION)
a("```")
a("")
a(f"{len(YT_DESCRIPTION)} of 5,000 characters. It follows the house template: an answer-first opening line for the search snippet, then 'The math, shown:' bullets, then the follow line. "
  "The credit, assumptions and 'Not financial advice.' line comes next, and the 3 hashtags close it. "
  "The 'Doesn't Add Up' series line is left out on purpose: it promises 'a number that shouldn't be true', and 06c is an honest 'meh'.")
a("")
a("### Hashtags (order matters)")
a("")
a("1. `#Starbucks`: the brand ('starbucks' 156,350 searches a month, +55.4% over baseline).")
a("2. `#LatteFactor`: the debate the video answers (4,455 a month, competition 29.2).")
a("3. `#stocks`: the broad category ('stocks' 211,921 a month).")
a("")
a("In the title they show as links. With no hashtags in the title, YouTube would show the first 3 description hashtags above it instead. "
  "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")
a("")
a(f"### Tags (paste; {tag_chars(YT_TAGS)} of 500 characters as YouTube counts them)")
a("")
a("```")
a(", ".join(YT_TAGS))
a("```")
a("")
a("Tags carry little weight. These mirror the keyword research plus the house's channel tags. "
  "'what happened to starbucks stock' covers the stall years. 'is starbucks stock a buy now' (4,548 a month) is left out because its intent is advice.")
a("")
a("### Pinned comment (post it, then pin it)")
a("")
a("```")
a(YT_PINNED)
a("```")
a("")
a("The question comes first so it shows in the collapsed preview. It asks for the viewer's own number (R3), and the second line answers the commenters who check the multiplication.")
a("")
a("### Related video and end screen")
a("")
rv = yt["related_video"]
a(f"- **Related video:** [{rv['pick']['title']}]({rv['pick']['url']}) (`{rv['pick']['id']}`). {rv['pick']['why']}")
a(f"- **Swap later:** {rv['swap_when_live']}")
a(f"- **End screen:** {rv['end_screen']}")
a("")
a("### Thumbnail and settings")
a("")
a("- **Thumbnail:** in the YouTube app, pick the verdict-hold frame, the same content as the Instagram cover below.")
a("- **Settings:** Category Education. Not made for kids. Altered or synthetic content: No (it's an animated chart, not realistic footage). Remixing allowed. No captions needed: there's no narration and all the text is on screen.")
a("")
a("### Posting window")
a("")
a(f"- **When:** {yt['posting_window']['when']}")
a(f"- **Spacing:** {yt['posting_window']['spacing']}")
a(f"- **Why:** {yt['posting_window']['why']}")
a("")
a("---")
a("")
a("## Instagram Reels")
a("")
a("### Caption (paste)")
a("")
a("```")
a(IG_CAPTION)
a("```")
a("")
a(f"- {len(IG_CAPTION)} of 2,200 characters.")
a("- **First 125 characters:** the question plus the keywords 'Starbucks latte', 'Starbucks stock' and 'latte factor', with no result. This follows the write-up's caption rule: the caption overlays the Reel from frame 1. The numbers sit below 'more', where Instagram search and Google indexing still read them.")
a("- The caption follows the house close: the follow line plus the credit.")
a("")
a("### Hashtags (5, Instagram's cap since Dec 2025)")
a("")
a("`#thelattefactor #starbucks #SBUX #investing #personalfinance`")
a("")
a("Two are specific:")
a("")
a("- `#thelattefactor` is the tag @davidlbach opens his outlier caption with. On YouTube, 'the latte factor' also out-searches 'latte factor', 5,052 to 4,455.")
a("- `#SBUX` reaches people who follow the ticker.")
a("")
a("`#starbucks`, `#investing` and `#personalfinance` are the broad layer. The write-up's 6-tag caption is over the cap, so `#latte`, `#usa` and `#investment` are dropped.")
a("")
a("### Alt text")
a("")
a(f"- **Short (≤ 125):** {IG_ALT_SHORT}")
a(f"- **Long:** {IG_ALT_LONG}")
a(f"- **Where:** {ig['alt_text_where']}")
a("")
a("### Cover")
a("")
a(f"![06c cover, 3:4]({BASE}-cover-3x4.jpg)")
a("")
a(f"- **Files:** `publishing/{BASE}-cover-3x4.jpg` (1080×1440) and `publishing/{BASE}-cover-9x16.jpg` (1080×1920). Both come from the current render at 24.5 s.")
a(f"- **Frame, by content:** {ig['cover']['frame_by_content']} The condense will move this time, so re-pick it by content.")
a(f"- **Crop:** {ig['cover']['crop']}")
a(f"- **How to set it:** {ig['cover']['how_to_set']}")
a(f"- **Re-export from the condensed render:** `{COVER_FFMPEG}`")
a("")
a("### First comment (post it, then pin it)")
a("")
a("```")
a(IG_FIRST_COMMENT)
a("```")
a("")
a("### Trial Reels")
a("")
a(f"**{ig['trial_reels']['recommendation']}** {ig['trial_reels']['why']} {ig['trial_reels']['use_trial_for']}")
a("")
a("### Posting window and settings")
a("")
a(f"- **When:** {ig['posting_window']['when']}")
a(f"- **Why:** {ig['posting_window']['why']}")
a(f"- **Audio:** {ig['settings']['audio']}")
a("- **Share to feed:** On.")
a("")
a("---")
a("")
a("## Why these choices (research evidence)")
a("")
a("**1. Search demand (vidIQ keyword research, metrics as of 2026-10-11).**")
a("")
a("| Keyword | Est. searches/month | Competition | Overall | Note |")
a("|---|---:|---:|---:|---|")
for k, v, vol, c, o, n in KEYWORDS:
    a(f"| {k} | {v:,}{'' if v else ' (<750)'} | {'' if c is None else c} | {'' if o is None else o} | {n} |")
a("")
a("The cluster is medium volume with low competition (21-40). The title takes the two largest specific phrases ('what if you invested', 'starbucks stock'). The hashtags and caption carry 'latte factor'.")
a("")
a("**2. The same idea on YouTube is unclaimed (vidIQ YouTube search, Shorts, by views).**")
a("")
a("| Title | Channel (subs) | Views | Date |")
a("|---|---|---:|---|")
for t, ch, s, v, d in YT_SAME_IDEA:
    a(f"| {t} | {ch} ({s:,}) | {v:,} | {d} |")
a("")
a("Nobody owns 'Starbucks stock instead of the latte' on YouTube; the top English Short has 9,575 views. "
  "4 of the top 5 titles frame it as '… instead of …', and 3 of those as '(what) if you bought/invested'. That's the frame the pick uses.")
a("")
a("**3. The idea travels on Instagram and TikTok (vidIQ IG/TikTok outlier search).**")
a("")
a("- **@davidlbach** (Instagram), \"The Latte Factor! DRINKING A STARBUCKS COFFEE A DAY VS BUYING THE STOCK INSTEAD (SBUX)\":")
a("  - The outlier index reports 1.9M views (201.5x his 9.7K median). The profile endpoint shows 16.7K plays for the same reel; the two sources disagree.")
a("  - His caption opens with `#thelattefactor`.")
a("  - His chart runs from 1992, the IPO-era run. Ours is the 2014-2025 version, which answers his framing honestly.")
a("- **@investment_timeline** (TikTok), \"POV: You invested in Monster instead of paying $3/day for a Monster Energy\": 1.5M (140.6x).")
a("  - Its caption is the POV line plus hashtags, with no result. Our caption keeps that rule above the fold.")
a("")
a("**4. Our own October numbers (vidIQ: public YouTube stats, Instagram owner insights).**")
a("")
a("| YouTube Short | Posted (ET) | Views |")
a("|---|---|---:|")
for i, t, p, v in OWN_YT:
    a(f"| {t} (`{i}`) | {p} | {v:,} |")
a("")
a("| Instagram Reel | Posted (ET) | Plays | Skip rate | Avg watched |")
a("|---|---|---:|---:|---:|")
for s, t, p, pl, sk, aw in OWN_IG:
    a(f"| {t} (`{s}`) | {p} | {pl:,} | {sk}% | {aw}% |")
a("")
a("Channel totals:")
a("")
a("- **YouTube:** 53 subscribers, 8,995 views and 39 videos (+27 subscribers and +3,901 views in 30 days).")
a("- **Instagram:** 8 followers and 18,600 views in 30 days.")
a("")
a("Medians by posting slot (n = 2-3 each, confounded by topic):")
a("")
a("- **YouTube:** Sunday early morning ET 1,178, weekday 22:00-00:30 ET 642, weekday midday 262.")
a("- **Instagram:** weekday 22:00-00:30 ET 5,431, midday 1,178, Sunday early morning 1,042.")
a("")
a("One weekday evening is the best Instagram slot and the second-best YouTube slot, so the plan posts both then. "
  "On Instagram, skip rate predicts plays better than the hour does (27.0-27.5% for the top two, 56.9-65.1% for the bottom two). "
  "So the window is a light-touch test, and the owner's condense (fewer still moments) is the bigger reach lever.")
a("")
a("**5. Platform rules applied.**")
a("")
a("- **YouTube title:** 100 characters. The Shorts player shows only the opening, so the keywords come first.")
a("- **YouTube description:** 5,000 characters.")
a("- **YouTube hashtags:** the first 3 show; over 60 and all are ignored; `#Shorts` isn't needed.")
a("- **YouTube tags:** 500 characters, low weight.")
a("- **YouTube Shorts:** no end screens. The Related video link is the Shorts equivalent.")
a("- **YouTube AI disclosure:** only for realistic altered content.")
a("- **Instagram caption:** 2,200 characters, about 125 shown before 'more'.")
a("- **Instagram hashtags:** 5 at most.")
a("- **Instagram search and Google:** keywords in the caption feed Instagram search, and Google indexes public professional posts (since 10 Jul 2025).")
a("- **Instagram grid:** a 3:4 crop of the 9:16 cover.")
a("- **Trial Reels:** shown to non-followers only.")
a("")
a("**6. Limits.**")
a("")
for x in r["limits"]:
    a(f"- {x}")
a("")
with open(f"{OUT}/{BASE}.md", "w", encoding="utf-8") as f:
    f.write("\n".join(L))

print("title", len(YT_TITLE), "desc", len(YT_DESCRIPTION), "ig caption", len(IG_CAPTION),
      "first125", repr(IG_CAPTION[:125]), "tags", tag_chars(YT_TAGS))
