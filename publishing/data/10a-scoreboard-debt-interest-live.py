# 10a publishing data: US debt interest since you hit play: when does it pass your salary? (Scoreboard, cost-counter).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 08a-scoreboard-costco-hot-dogs.py (the nearest
# Scoreboard precedent of the same kind), itself laid out from 06b.
#
# THE RECUT (2026-10-13, owner-approved, "Mixed"): 10a now stops on its $500,000 pass, verdict "$500K a year: ≈ 16
# seconds." (18.6 s body + the 2.5 s card = 21.1 s). Every claim, number, alt text and comment below describes that cut.
# Facts come only from teasers/v2/10-cost-counter.md (section 10a and the Review log's "Recut" entries) and
# python3 teasers/v2/checks/10-cost-counter.py --spec on the WIP specs (studio/specs-wip/10a-*.json and 10c-*.json).
#
# The builder reads only studio/specs/<id>.json and renders/channel/<id>.mp4, which hold the round-2 cut until the ship
# step promotes the recut. So this file builds in two states (SHIPPED below): before the ship step the video facts and the
# two cover JPGs are the round-2 file's and the sheet says they are stale; once both hold the recut, the same file builds
# the shipped sheet, and `build_publishing.py <id> --covers` re-exports both covers from the recut's verdict hold.
# The write-up's preferred posting plan rebuilds 10a on FY2026 net interest once Treasury's September 2026 statement is
# out; if that happens, every figure here changes, and MATH_KEY_LINES and MATH_RELATIONS fail by name until this file
# is rebuilt on the new numbers.
import os as _os, json as _json

TEASER = "10a Scoreboard, cost-counter: \"US debt interest since you hit play: when does it pass your salary?\""
PREPARED = "2026-10-13"
SHORT_ID = "10a"
MD_TITLE = "10a publishing sheet: US debt interest vs your salary"

# ---------------------------------------------------------------- which cut the files on disk hold
RECUT_BODY_S, RECUT_S = 18.6, 21.1                                  # the recut: body + the 2.5 s end card
RECUT_WIP = f"studio/specs-wip/{BASE}.json"
RECUT_MP4 = f"/tmp/cond/10/{BASE}/final/{BASE}.mp4"                 # the recut fix pass's final render (picture + sound)
RECUT_SHA = "a6acf7c14c26ded82ed9aec73bfef9e5d02cdb3e57c8fe745ce5f415b16ffc70"
R2_COMMIT = "471c793"                                               # renders/channel's round-2 render
R2_SHA = "e46306dc33a2b162d37ea402b0e4a60cc3b7e62022a4e956c2eb6b0932314196"
SHIPPED = abs(BODY_S - RECUT_BODY_S) < 0.01
if SHIPPED != (abs(VIDEO_S - RECUT_S) < 0.05):
    raise SystemExit(f"{BASE}: studio/specs ({BODY_S:g} s body) and renders/channel ({VIDEO_S:g} s) do not both hold the recut "
                     f"({RECUT_BODY_S:g} s body, {RECUT_S:g} s): promote spec and render together, or, if the recut's length "
                     "changed, re-pick the cover frame and update RECUT_BODY_S and RECUT_S")
_CUT_SPEC_REL = f"studio/specs/{BASE}.json" if SHIPPED else RECUT_WIP
with open(_os.path.join(ROOT, _CUT_SPEC_REL), encoding="utf-8") as _f:
    _CUT = _json.load(_f)                                           # the spec of the cut this copy describes
_pre = lambda before, after: after if SHIPPED else before

_WIP_ARGS = [x for p in (RECUT_WIP, "studio/specs-wip/10c-scoreboard-amazon-makes.json") if _os.path.exists(_os.path.join(ROOT, p))
             for x in ("--spec", _os.path.join(ROOT, p))]
MATH_ARGS = _pre(_WIP_ARGS, [])
MATH_RUN = _pre("992 checks, 0 failures with --spec on the 10a and 10c WIP specs (the recut; 10b from studio/specs/), run 2026-10-13",
                "the default run on studio/specs/, which holds the recut (0 failures required at every build)")

MD_INTRO = [
    _pre(f"- **Video: the recut, not yet in `renders/channel/`.** This sheet describes the recut to the earlier verdict (owner-approved 2026-10-13): "
         f"the counter stops on its $500,000 pass and the verdict reads \"$500K a year: ≈ 16 seconds.\" ({RECUT_BODY_S:g} s body + the 2.5 s card = {RECUT_S:g} s; "
         f"spec `{RECUT_WIP}`, render `{RECUT_MP4}`, sha256 `{RECUT_SHA[:8]}…`). "
         f"`renders/channel/{BASE}.mp4` still holds the round-2 cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`), "
         "which runs past this verdict: **do not post it with this copy**, and do not upload the two cover JPGs yet (Cover, below). "
         f"The ship step promotes the recut's spec and render, then `python3 publishing/tools/build_publishing.py {BASE} --covers` rebuilds this sheet on it and re-exports both covers; nothing else in this file needs an edit.",
         f"- **Video.** `renders/channel/{BASE}.mp4`: the recut to the earlier verdict (owner-approved 2026-10-13; {VIDEO_S:g} s: the {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
         "The counter stops on its $500,000 pass and the verdict reads \"$500K a year: ≈ 16 seconds.\". Nothing below names a timestamp except the cover, which is picked by content (the verdict hold)."),
    "- **Numbers.** Every figure comes from `teasers/v2/10-cost-counter.md` (10a, the recut) and its check, "
    f"`python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN} (the builder runs it through the adapter `publishing/data/checks/10-cost-counter.py`). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the rate and every salary row from $970 billion, "
    "reads the cut's spec and holds the copy to its stop and verdict, holds every figure to the write-up's one rounding (≈ $30,800 a second; ≈ 1.0 / 2.1 / 3.3 / 8 / 16 seconds), keeps $970 billion beside fiscal 2025 and the 12% beside its own line (net interest on the public debt, 11 months), "
    "bans the write-up's overclaims ('live', 'in real time') and bans any row past the recut's stop.",
    "- **Honesty rules kept.** The title asks and never gives the result, and so does the YouTube thumbnail (frame 1: the $0 odometer and the five-pip salary ladder). The Instagram caption keeps every result below 'more'. "
    "The Instagram cover is the verdict frame, as the write-up's Instagram note asks. Every claim stays inside the video's verdict, \"$500K a year: ≈ 16 seconds.\": "
    "$500,000 is the ladder's top row and the counter's stop, and any other salary (between the rows, under $30,000 or over $500,000) goes through the swap-in rule, as the video captions it. "
    "The copy says its conditions: fiscal 2025's $970 billion of net interest, spread evenly over the year (an average rate; fiscal 2026 ran higher, so the counter runs slow), and gross salaries. "
    "No advice, no urgency, and 'Not financial advice.' is in both. The copy names no party, person or policy, as the write-up's tone rule asks.",
    "- **Brand.** No company or brand is named. The sources are public agencies (U.S. Treasury, CBO, BLS); the video has no logo. "
    "Because nothing branded is named, no 'Not affiliated with or endorsed by …' line is needed, and no share price is named.",
    "- **If 10a is rebuilt on FY2026.** The write-up's preferred posting plan rebuilds this Short on fiscal 2026 net interest once Treasury's September 2026 statement is out (due about 2026-10-13). "
    "Then every figure here changes, the verdict's included (at $1.0-1.1 trillion the $500,000 row moves from ≈ 16 s to ≈ 14-16 s, the write-up says); this sheet's numbers check fails by name (MATH_KEY_LINES, MATH_RELATIONS) until the data file is rebuilt on the new numbers. "
    "If it ships on FY2025, the copy below is correct as it stands.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = _pre("current_* is what renders/channel holds today: the round-2 cut, which runs past this copy's verdict. The copy describes the recut (copy_describes); post only the recut with it. "
                      "The ship step promotes the recut and re-runs the build with --covers, which refreshes current_*, the cut and both covers.",
                      "current_* is the shipped recut, the cut this copy describes. The copy names no timestamp except the cover frame, which is picked by content.")
CUT = _pre({"name": "round-2 cut (still in renders/channel; not the cut this copy describes)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
            "card_s": CARD_S, "shipped": None, "git": R2_COMMIT,
            "status": "the recut (copy_describes) is WIP until the ship step promotes it; this sheet's copy is the recut's."},
           {"name": "recut to the earlier verdict (owner-approved 2026-10-13; recut fix pass)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
            "card_s": CARD_S, "shipped": None, "git": None,
            "status": "promoted by the ship step; this sheet was rebuilt on it with --covers."})
FOR_VIDEO_EXTRA = _pre({"copy_describes": {"cut": "recut to the earlier verdict (owner-approved 2026-10-13; recut fix pass)", "spec": RECUT_WIP,
                                           "render": RECUT_MP4, "duration_s": RECUT_S, "body_s": RECUT_BODY_S, "card_s": 2.5, "sha256": RECUT_SHA,
                                           "cover_t": 18.5, "cover_frame": 555,
                                           "status": "WIP: not in renders/channel yet. The ship step promotes it and rebuilds this sheet with --covers."}},
                       {})

FACTS = {
    "source": f"teasers/v2/10-cost-counter.md section 10a and the Review log's 'Recut to the earlier verdict' and 'Recut, fix pass' entries; teasers/v2/checks/10-cost-counter.py: {MATH_RUN}",
    "basis": "FY2025 net interest of $970 billion (Treasury's final Monthly Treasury Statement for FY2025, via the American Action Forum; CBO, The Budget and Economic Outlook: 2026 to 2036, Feb 2026), spread evenly over a 365-day year of 31,536,000 seconds",
    "rate": "$970B ÷ 31,536,000 = $30,758.498 a second ≈ $30,800 (3 significant figures, the write-up's one rounding); × 3,600 = $110,730,594 an hour ≈ $111 million",
    "rows": "pass time = salary ÷ rate: $30,000 0.975 s ≈ 1.0; median pay ($1,251 × 52 = $65,052, BLS Q2 2026) 2.115 s ≈ 2.1; $100,000 3.251 s ≈ 3.3; $250,000 8.128 s ≈ 8; $500,000 16.256 s ≈ 16 (the top row)",
    "ladder": "5 pips, $30K · Median $65K · $100K · $250K · $500K; any other salary (between the rows, under $30,000 or over $500,000) goes through the swap-in rule, which the video captions and works for the median",
    "swap_in": "your seconds = yearly pay ÷ 30,800 (approximate by design; for the median, $65,052 ÷ 30,800 = 2.112 ≈ 2.1, the same as the exact 2.115)",
    "stop": "the counter stops on exactly $500,000 (r × 16.25568 = $500,000.30; $500,000.33 at the stored rate), so the final carries no '≈'",
    "zero_off_the_debt": "$0 of the interest pays the debt down: interest is the cost of carrying the debt, not a repayment",
    "fy2026": "CBO's Monthly Budget Review for August 2026: net interest on the public debt $1,052 billion in the first 11 months of FY2026 vs $941 billion a year earlier, +12% (a wider line than the $970B net-interest total); so this counter runs slow",
    "assumptions": "an average rate (real payments are lumpy); the salary rows are yearly gross salaries; median pay = BLS median usual weekly earnings of full-time wage and salary workers × 52",
    "verdict": "$500K a year: ≈ 16 seconds.",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "US Debt Interest Since You Hit Play: When Does It Pass Your Salary?"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 93,
     "note": "PICK. The write-up's own title, word for word the on-screen header, so the title, the thumbnail (frame 1) and the first frame ask the same question. "
             "'US Debt Interest' leads ('us debt' 44,622 searches a month, 'national debt interest' 4,591), and 'since you hit play' keeps HD Guy's real-time premise without the banned word 'live'. No hashtags in the title; the description's first three show above it. "
             "Unchanged by the recut: it asks the same question and names no row."},
    {"rank": 2, "title": "The US Pays Interest on Its Debt Every Second. When Does It Pass Your Salary?", "vidiq_score": 95,
     "note": "Top score, 2 points over the pick, at 77 characters. Not picked: 'pays … every second' states as fact what the write-up calls an average (real interest payments are lumpy, on coupon dates). The pick says only what the counter shows."},
    {"rank": 3, "title": "When Does US Debt Interest Pass Your Salary? #NationalDebt #USDebt #MoneyMath", "vidiq_score": 93,
     "note": "The house 3-hashtag form (77 characters), the same score as the pick, with the description's three hashtags in its order, which the builder's check requires of a title that carries any. "
             "Re-scored at the adversarial check; the first build's form (#NationalDebt #USDebt #Debt) would have failed that check if picked, and moves to 'also scored'."},
]
YT_TITLES_ALSO_SCORED = [
    ("When Does US Debt Interest Pass Your Salary? #NationalDebt #USDebt #Debt", 93, "option 3 at the first build: '#Debt' is not one of the description's hashtags, so the check would refuse it as the title"),
    ("When Does US Debt Interest Pass Your Salary? Counted Since You Hit Play", 93, ""),
    ("Find Your Salary: When Does US Debt Interest Pass It?", 93, "the VO's first line as the title"),
    ("US Debt Interest Adds Up Every Second. When Does It Pass Your Salary?", 93, "the honest wording of option 2, 2 points lower"),
    ("US National Debt Interest Since You Hit Play: When Does It Pass Your Salary?", 92, "adding 'National' costs a point"),
    ("National Debt Interest vs Your Salary: How Many Seconds?", 92, "names the answer's unit, seconds"),
    ("How Fast Does Interest on the National Debt Pass Your Salary?", 90, ""),
    ("How Many Seconds of US Debt Interest Equal Your Salary?", 89, ""),
]
TITLE_BULLETS = [
    "The pick is the write-up's title and the on-screen header, unchanged: 'US Debt Interest' in the first 16 characters, then the viewer's own stake, 'your salary'. "
    "The Shorts player shows the opening, so 'US Debt Interest Since You Hit Play' is what a scroller reads; the question finishes it.",
    "It names no result: no rate, no seconds, no row, and no top row, so the recut needs no new title (the write-up re-checked the hook: the question is about the viewer's salary, and the recut still answers it). "
    "The answer's unit is not even hinted ('how many seconds' scored 89-92 and gives the surprise away).",
    "Option 2 scores 2 points higher but says the US 'pays' interest every second; the write-up's rate is fiscal 2025's total spread evenly over the year, so the pick keeps the counter's own wording. "
    "vidIQ's model ranks titles but does not predict views; 10 of the 11 titles scored sit between 90 and 95.",
]

YT_DESCRIPTION = """When does US debt interest pass your salary? At fiscal 2025's rate, about $30,800 a second: a year of median full-time pay goes by in about 2.1 seconds, $100,000 in about 3.3 seconds and $500,000 in about 16 seconds.

The math, shown:
• Net interest the US paid in fiscal 2025: $970 billion (Treasury; CBO).
• ÷ 31,536,000 seconds in a year ≈ $30,800 a second, ≈ $111 million an hour.
• $30,000 a year: ≈ 1.0 second.
• Median full-time pay, $1,251 a week × 52 = $65,052 (BLS): ≈ 2.1 seconds.
• $100,000: ≈ 3.3 seconds. $250,000: ≈ 8 seconds.
• $500,000, the top row: ≈ 16 seconds.
• Any other salary: yearly pay ÷ 30,800 = your seconds.
• And $0 of it pays the debt down: interest is the cost of carrying the debt, not a repayment.

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. Net interest, fiscal 2025: $970 billion (U.S. Treasury's final Monthly Treasury Statement for fiscal 2025; CBO, The Budget and Economic Outlook: 2026 to 2036). Spread evenly over a 365-day year; real interest payments are lumpy, so this is the average rate. Fiscal 2026 ran hotter: CBO's August 2026 review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow. Salaries are yearly gross pay. Median pay: BLS median usual weekly earnings of full-time wage and salary workers, Q2 2026, × 52. Not financial advice.
#NationalDebt #USDebt #MoneyMath"""
DESC_NOTE = ("The opening line is the title's question with the write-up's caption answer, for the search snippet: the $100,000 row and the verdict's $500,000, as the write-up's caption line 1 pairs them, with the median between. "
             "'$500,000, the top row' says where the ladder ends, and the swap-in line covers every other salary, above it included, as the video does. "
             "The credit line names which interest line each figure is: $970 billion is net interest (the write-up's basis), and the 12% is CBO's wider 'net interest on the public debt' line, with its 11 months. "
             "The 'Doesn't Add Up' series line is left out, as on 06b, 06c and 08a: the counter is an average rate, not a number that shouldn't be true.")

YT_HASHTAGS = ["#NationalDebt", "#USDebt", "#MoneyMath"]
YT_HASHTAG_NOTES = [
    ("#NationalDebt", "the topic ('national debt' 25,193 searches a month, +2.0% on its 30-day baseline) and the write-up's own first tag."),
    ("#USDebt", "the bigger phrase ('us debt' 44,622 a month; -33.1% as the August $40 trillion spike fades, still the largest debt phrase). It replaces the write-up's #interest, which reaches rate and savings posts."),
    ("#MoneyMath", "the write-up's tag and the format's shared third tag: 10a, 10b and 10c all carry it, so the counter series links up."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["us debt interest", "national debt interest", "interest on national debt", "national debt", "us national debt", "us debt",
           "national debt explained", "how the national debt works", "can we pay off the national debt", "debt crisis", "net interest",
           "salary", "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'interest on national debt' (4,270 a month) is the question as people type it; with 'the' it is under 750. "
             "'can we pay off the national debt' (5,321 a month) is answered by the '$0 of it pays the debt down' line; "
             "'how the national debt works' (5,231) has the lowest competition of the debt questions (37.5). "
             "Left out on purpose: 'national debt clock live' (8,779), the biggest counter phrase, because the write-up bans 'live' and 'in real time' for 10a (a fixed average is not a live feed); "
             "'interest rates' (63,613) is a different topic; and every phrase that names a politician or a party (the write-up's tone rule). The recut changes no tag: none names a row.")

YT_PINNED = """Which row are you? Your seconds = yearly pay ÷ 30,800 (median pay: $65,052 ÷ 30,800 ≈ 2.1 seconds).

The $970 billion is fiscal 2025 net interest (a gross figure is bigger), spread evenly over 31,536,000 seconds. Fiscal 2026 ran hotter (CBO: net interest on the public debt up 12% over the same 11 months), so this counter runs slow. The rows are gross salaries, before tax. And $0 of it pays the debt down."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own row (R3), with the write-up's swap-in rule worked for the median, as the video's own label works it ($65,052 ÷ 30,800 ≈ 2.1 seconds). "
               "The rule is also how a salary above the ladder's top row ($500,000) gets its answer, so the comment carries it for everyone. "
               "The write-up's pinned comment pairs the rule with '$100,000 ≈ 3.3', but 3.3 is the exact rate's answer: the rule's rounded 30,800 gives 100,000 ÷ 30,800 = 3.247, so 3.2, and a viewer checking it on a calculator would catch it. The median is the row where both give 2.1. "
               "The second paragraph answers the four comment fights the write-up expects: net vs gross interest, 'that's last year's number', 'my salary is before tax' and 'does any of it pay the debt down?'. "
               "It answers with the CBO line, not a new number, as the write-up asks. The recut changes nothing here: it names no row past the stop.")

RELATED_VIDEO = {
    "pick": {"id": "8__HTUa2PoU", "title": "Pay the Minimum on $5,000? 238 Months. #CreditCard #PersonalFinance #maths",
             "url": "https://www.youtube.com/shorts/8__HTUa2PoU",
             "why": "The cost of carrying a debt, at household size: interest that never pays the balance down, as this Short's '$0 of it pays the debt down'. It is the channel's best post on Instagram (7,303 plays, 27.4% skip rate) and has 642 views on YouTube."},
    "swap_when_live": "10b (40 years of your pay vs 1 minute of new US debt), the same counter on the debt itself, once published; then point 10b's Related video back at this Short, so the pair links both ways.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the question frame: the header, the $0 odometer, the five-pip salary ladder with $30K lit as the next target, and the label stack. The Instagram cover is the verdict frame instead."
THUMB_MD = ("in the YouTube app, pick frame 1: the header 'US DEBT INTEREST SINCE YOU HIT PLAY: / WHEN DOES IT PASS YOUR SALARY?', the odometer on '$0', the footer 'FY25: $970B ÷ 31,536,000 s · median $1,251 × 52', "
            "the five-pip salary ladder '$30K · Median $65K · $100K · $250K · $500K' (bottom to top) with $30K lit as the next target, the empty bill tagged '$30K', the label stack '≈ $30,800 / EVERY SECOND' and the caption 'Find your salary.' (read on the recut's frame 1). "
            "It asks without answering, like the title beside it in search. The Instagram cover below is the verdict frame, as the write-up asks.")
YT_POSTING_WINDOW = {
    "when": "After the owner's FY2026 decision (see the intro) and once the recut ships and passes QA: the first free Tue-Thu evening, 21:30-22:30 ET (01:30-02:30 UTC the next day). Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel. 10a and 10b are both about the federal debt: post them at least a week apart, or as a labelled pair (10b as 'Part 2: the debt itself'), as the write-up asks. Suggested order within the series: 10c, then 10a, then 10b.",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 75, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "10a waits for the FY2026 decision: the write-up prefers to post it on fiscal 2026's figure once Treasury's September statement is out. Interest on the debt is in the news ('debt crisis' +235.9% over its 30-day baseline; "
           "U.S. Money Reserve's '$1 Trillion Interest Payments' Short broke out at 52.92x in September).",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("When does US debt interest pass your salary? Find your row on the ladder: the counter starts at $0 the moment you hit play.")

IG_CAPTION = IG_HOOK + """

$100,000 a year of pay ≈ 3.3 seconds of US debt interest. $500,000 ≈ 16 seconds.

The math, shown:
• Net interest, fiscal 2025: $970 billion (Treasury; CBO).
• ÷ 31,536,000 seconds in a year ≈ $30,800 a second, ≈ $111 million an hour.
• $30,000 a year: ≈ 1.0 second.
• A year of median full-time pay, $1,251 a week × 52 = $65,052 (BLS): ≈ 2.1 seconds.
• $100,000: ≈ 3.3 seconds. $250,000: ≈ 8 seconds.
• $500,000, the top row: ≈ 16 seconds.

Any other salary (between the rows, under $30,000 or over $500,000): divide your yearly pay by 30,800.

And $0 of it pays the debt down: interest is the cost of carrying the debt, not a repayment. Fiscal 2026 ran hotter: CBO's August review put net interest on the public debt 12% above the same 11 months of fiscal 2025, so this counter runs slow.

An average rate (real interest payments are lumpy); salaries are gross. Not financial advice.

Which row are you?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#nationaldebt #usdebt #interest #economy #moneymath"""
IG_CAPTION_RULE = ("The first 125 characters are the title's question, the 'US debt interest' keywords and the video's frame-1 instruction (find your salary; the counter starts at $0), no result: "
                   "the caption overlays the Reel from frame 1, so the rate, every row and the verdict sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question plus the VO's first instruction ('Find your salary.', here 'Find your row on the ladder'), with no figure but the counter's $0 start; the hook is 123 characters, so it shows whole before 'more'. The write-up's caption line 1 is the result "
    "('$100,000 a year of pay ≈ 3.3 seconds of US debt interest. $500,000 ≈ 16 seconds.', the recut's); the house rule moves it to the second paragraph, below 'more', because the caption overlays the Reel from frame 1. "
    "The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The write-up's caption sentences are kept, in its order: the $970 billion, the division (with the recut's '≈ $111 million an hour'), median pay, the swap-in rule, '$0 of it pays the debt down' and the fiscal 2026 sentence, which names CBO's line and its 11 months. "
    "The ladder stops at '$500,000, the top row', the counter's stop, and the swap-in line says it covers every other salary, under $30,000 and over $500,000 included.",
    "No brand is named and no handle is tagged. The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#nationaldebt", "#usdebt", "#interest", "#economy", "#moneymath"]
IG_HASHTAG_MD = [
    "Three are the write-up's own (`#nationaldebt #interest #moneymath`), plus two:",
    "",
    "- `#nationaldebt` and `#usdebt` name the topic the way it is searched ('national debt' 25,193 a month, 'us debt' 44,622).",
    "- `#interest` is the write-up's word for what the counter counts, and `#moneymath` says what kind of video it is.",
    "",
    "`#economy` is the broad layer ('economy' 378,531 a month, +9.8%): for a federal-debt Short it fits better than the house's usual `#personalfinance`.",
]

IG_ALT_SHORT = "Chart: US debt interest passes $100,000 in about 3.3 seconds and $500,000 in about 16 seconds."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is. It says 'about', not '≈', "
                     "so screen readers read it cleanly, and it pairs the verdict's $500,000 with the $100,000 row, as the write-up's caption does.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes 'about' instead of '≈' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a black scoreboard. The header asks: US debt interest since you hit play: when does it pass your salary? "
               "A green counter starts at $0 and climbs at about $30,800 a second, fiscal 2025's $970 billion of net interest divided by the 31,536,000 seconds in a year, about $111 million an hour. "
               "It lights a ladder of yearly salaries as it passes them: $30,000 at about 1.0 second, median pay ($65,052) at about 2.1, $100,000 at about 3.3 and $250,000 at about 8. "
               "A caption gives the rule for any other salary: yearly pay divided by 30,800. "
               "The counter stops on exactly $500,000, the top row, as a coin pops. Payoff: $500K a year: about 16 seconds.")

IG_FIRST_COMMENT = "Yearly pay ÷ 30,800 = your seconds (median pay: $65,052 ÷ 30,800 ≈ 2.1 seconds). Which row are you?"

# ---------------------------------------------------------------- the cover frame
# The verdict frame, picked by content: the write-up's Instagram note names the settled verdict hold once the last
# caption has gone, 18.4-18.55 s in the recut. On the recut render (RECUT_MP4) the last caption ("$500,000: passed.")
# clears at frame 551 (18.37 s), frames 552-558 hold still (frame-to-frame mean luma change under 0.001 at 270x480),
# and the end card starts at frame 559 (18.63 s). Frame 555 (18.50 s) is used. Before the ship step the two JPGs on
# disk are still the round-2 render's verdict frame (35.5 s, frame 1065), so COVER_T and COVER_FRAME name that until then.
COVER_T = _pre(35.5, 18.5)
COVER_FRAME = _pre(1065, 555)
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = _pre("stale round-2", "recut")
COVER_FRAME_BY_CONTENT = ("The recut's verdict frame, as the write-up's Instagram note asks: the header 'US DEBT INTEREST SINCE YOU HIT PLAY: / WHEN DOES IT PASS YOUR SALARY?', the odometer on '$500,000', "
                          "the footer's working 'FY25: $970B ÷ 31,536,000 s · median $1,251 × 52', the ladder with all five pips lit ($30K · Median $65K · $100K · $250K · $500K), the big lit coin tagged '$500K', "
                          "and the verdict '$500K A YEAR: ≈ 16 SECONDS.' with nothing under it (the last caption has gone).")
COVER_FRAME_MEASURED = ("On the recut's 21.1 s render the counter stops on $500,000 at its pass and the verdict follows; the last caption ('$500,000: passed.') clears at frame 551 (18.37 s), "
                        "the board then holds still (frame-to-frame mean luma change under 0.001) to frame 558, and the end card starts at frame 559 (18.63 s): the write-up's 18.4-18.55 s window. "
                        "Frame 555 (18.50 s) is the cover, read from the recut render's frame (a preview export, not the JPGs on disk).")
COVER_CROP_NOTE = ("3:4 = 1080×1440 from y 0 to 1440 of the 1080×1920 frame: the badge (from y 141), the header, the odometer, the footer's working, the lit ladder and coin, and the verdict (to y 1262 on the recut's frame 555), "
                   "with 141 px above and 177 px below; it drops the empty black below. A centred grid crop (y 240-1680) cuts the badge and the header.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick the verdict frame from the video (or upload the 9:16 JPG once the ship step has re-exported it), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = _pre(
    [f"**Stale until the ship step: do not upload these two JPGs.** They are still the round-2 render's verdict frame (35.5 s, frame 1065), not this cut's. "
     f"Once the ship step has put the recut in `renders/channel/`, `python3 publishing/tools/build_publishing.py {BASE} --covers` re-exports both from its frame 555 (18.50 s) and this section names that frame. "
     "Running `--covers` before then only re-exports this stale frame.",
     "**Not used on Instagram:** frame 1 (the $0 odometer, the unlit ladder and 'Find your salary.'). It asks without answering, so it is the YouTube thumbnail, "
     "where it sits beside a title that asks; on Instagram the write-up picks the verdict frame, the save-able answer."],
    ["**Not used on Instagram:** frame 1 (the $0 odometer, the unlit ladder and 'Find your salary.'). It asks without answering, so it is the YouTube thumbnail, "
     "where it sits beside a title that asks; on Instagram the write-up picks the verdict frame, the save-able answer.",
     "**If the cut changes again:** re-pick the verdict frame by content (a settled frame of the verdict hold, after the last caption and before the end card), update RECUT_BODY_S, RECUT_S, COVER_T and COVER_FRAME, and re-export with `--covers`."])

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": "A hook test afterwards, if you want one: the same recut as a Trial with a different caption opening or cover (for example frame 1 as the cover), with MANUAL graduation 48-72 h later. "
                     "Not the round-2 cut: it runs past this verdict, so this copy (the caption's top row and the alt text) would not describe it. "
                     "Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'US debt interest vs your salary — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, after the FY2026 decision and once the recut ships, and at least a week apart from 10b (or as a labelled pair).",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,303 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense and the recut (21.1 s with the card, was 39.0 s) matter more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("national debt", 25193, 65.7, 62.0, 54.6, "seed; +2.0% vs its 30-day baseline (24,706)", "2026-10-12"),
    ("us debt", 44622, 69.4, 66.0, 55.2, "-33.1% vs its baseline (66,734): the August $40 trillion spike fading; still the biggest debt phrase", "2026-10-12"),
    ("us national debt", 10191, 59.8, 62.0, 51.1, "-66.1% vs its baseline (30,039)", "2026-10-12"),
    ("national debt interest", 4591, 54.7, 43.0, 55.6, "the exact topic", "2026-03-01"),
    ("national debt clock live", 8779, 58.9, 37.8, 60.2, "the biggest counter phrase, but 'live' is a claim this video can't make (the write-up bans it): not in the tags", "2026-10-12"),
    ("national debt clock", 4838, 55.0, 43.7, 55.5, "", "2026-10-12"),
    ("debt crisis", 31084, 67.1, 63.3, 54.9, "+235.9% vs its baseline (9,254)", "2026-10-12"),
    ("how the national debt works", 5231, 55.5, 37.5, 58.3, "question intent the description answers", "2026-10-12"),
    ("can we pay off the national debt", 5321, 55.6, 41.0, 57.0, "the '$0 of it pays the debt down' line answers it", "2026-08-02"),
    ("interest rates", 63613, 71.7, 66.5, 56.4, "+22.8%; a different topic (rates, not the interest bill): not in the tags", "2026-10-12"),
    ("economy", 378531, 83.3, 75.5, 59.8, "+9.8% vs its baseline (344,793); the broad layer (#economy on Instagram)", "2026-10-12"),
    ("average salary in america", 0, 0, 38.5, 24.6, "<750/month: the salary side has no search demand of its own", None),
    ("interest on national debt", 4270, 54.2, 40.0, 56.5, "the question as people type it (no 'the'): in the tags; found at the adversarial check", "2026-10-12"),
    ("interest on the national debt", 0, 0, 47.0, 21.2, "<750/month with 'the': the tag uses the searched form above", None),
]
KEYWORD_MD_NOTE = {"national debt clock live": "the biggest counter phrase; 'live' is banned by the write-up, so not in the tags",
                   "us debt": "-33.1%: the August spike fading; still the biggest debt phrase"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; two rows are older snapshots (2026-03-01 and 2026-08-02). Not re-pulled for the recut: no keyword or tag depends on the stop.")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Two rows are older snapshots.")
KW_OUTRO = ("The debt is searched as a topic and as questions: 'us debt' (44,622) and 'national debt' (25,193) lead, and the questions people type ('how the national debt works', 'can we pay off the national debt', about 5,200-5,300 each) "
            "are ones the description answers. The interest bill itself is a mid-sized phrase ('national debt interest' 4,591; 'interest on national debt' 4,270, though under 750 with 'the'), so the title leads with 'US Debt Interest' and lets 'debt' carry the volume. "
            "The counter phrases ('national debt clock live' 8,779) promise a live feed, which the write-up bans for this average-rate counter, and money 'per second' has no search demand of its own "
            "(every 'per second' phrase vidIQ returns is anime, gaming or code). Salary searches are tiny ('average salary in america' under 750): the salary is the hook, not the search term.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("Interest is the United States' Second Largest Expenditure", "Principles by Ray Dalio", 3190000, 1805286, "2025-10-28", "94 s; 13.56x its channel (vidIQ breakout score)"),
    ("America Spends $222,000+ Per Second…", "The Iced Coffee Hour", 1660000, 810279, "2025-12-15", "24 s; federal spending per second, 22.32x"),
    ("US Debt Crisis: $1 Trillion Interest Payments Explained #shorts", "U.S. Money Reserve", 12100, 25935, "2026-09-12", "19 s; 52.92x, the biggest breakout on the interest bill"),
    ("US DEBT CLOCK Live Stream", "DEBT CLOCK", 195, 26839, "2018-12-08", "16 s: a debt clock, counting"),
    ("The INSANE Cost to Run America (Per SECOND!)", "MentalForge", 67, 17638, "2026-04-28", "24 s; 22.88x from a 67-subscriber channel"),
    ("¿Sabías que EE.UU. pierde $11,000 por segundo? #shortsfinancieros", "Simple Finanzas", 25900, 3068, "2025-06-26", "Spanish; debt interest per second (its own figure, not verified here)"),
    ("Nick Shirley Watches America’s Debt Grow in Real Time ⏳", "RealTalk America", 192, 1443, "2026-09-26", "59 s; the debt, not the interest"),
    ("Government debt is growing by $10,000 per second", "Boyce Watkins", 389000, 1224, "2023-05-04", "3:03"),
]
SAME_IDEA_HEADING = "**2. The interest bill per second is a proven idea, but nobody measures it against a salary (vidIQ YouTube search and outliers, Shorts, under 4 min).**"
SAME_IDEA_MD = [
    "Per-second government money travels: The Iced Coffee Hour's 'America Spends $222,000+ Per Second…' has 810,279 views (22.32x its channel), a 67-subscriber channel's 'The INSANE Cost to Run America (Per SECOND!)' 17,638 (22.88x), "
    "and the interest bill itself is breaking out this autumn (U.S. Money Reserve's '$1 Trillion Interest Payments Explained', 52.92x in September; Ray Dalio's 'Interest is the United States' Second Largest Expenditure', 1,805,286).",
    "",
    "None of them gives the viewer a row. They state the per-second figure (their own, not verified here) and stop; this Short turns it into a question about the viewer's salary and answers it on a ladder. "
    "Most of the debt Shorts that top the searches are news clips that name politicians; the write-up's tone rule keeps this copy to the maths. "
    "The two that travel best run 19-24 s, the recut's length (21.1 s with the card).",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search and outliers (Shorts; under 4 min): per-second government money is a proven Shorts idea (America Spends $222,000+ Per Second…, 810,279, 22.32x), and the interest bill is breaking out "
                  "(U.S. Money Reserve, 52.92x, Sep 2026). None measures the interest against a viewer's salary; the per-second figures in their titles and descriptions are their own, not verified here.")

OUTLIERS = [
    {"handle": "@americafirstalert", "platform": "Instagram", "id": "DcUN1I9Oj27",
     "on_screen": "BREAKING: Just as economic fears of a market crash and inflation rise, U.S. national debt surpasses $40 trillion.",
     "views": "319.6K (170.8x the account median of 1.9K)",
     "note": "a screen recording of a debt-clock website counting up, music only, looped: a counter as the whole video"},
    {"handle": "@aiisfunne", "platform": "Instagram", "id": "Dca-dgBzJAh",
     "on_screen": "(a digital debt counter ticking up over archive campaign footage)", "views": "1.7M (326.7x the account median of 5.2K)",
     "note": "the ticker carries it; the political framing is the creator's, and this Short names no person"},
    {"handle": "@tommoneymays", "platform": "Instagram", "id": "DbOYHlPucRw",
     "on_screen": "IMAGINE SOMEONE HANDS YOU $1,000,000,000,000", "views": "1.1M (87.2x the account median of 13K)",
     "note": "the scale of government-sized money, made personal; talking head"},
]
OUTLIERS_HEADING = "**3. Debt counters travel on Instagram (vidIQ IG/TikTok outlier search, since June 2025, at least 10K views).**"
OUTLIERS_MD = [
    "- **@americafirstalert** (Instagram), a debt-clock screen recording: 319.6K (170.8x). Music only and looped, a counter as the whole video, which is this Short's format.",
    "- **@aiisfunne** (Instagram), a debt counter ticking over archive campaign footage: 1.7M (326.7x). The ticker carries it; the political framing is the creator's, and this Short names no person.",
    "- **@tommoneymays** (Instagram), \"IMAGINE SOMEONE HANDS YOU $1,000,000,000,000\": 1.1M (87.2x). Government-sized money made personal, the move this Short makes with a salary.",
    "- None of them asks the viewer a question or gives the viewer a row; the counter alone carried two of them past 300K.",
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
    "The channel has no counter Short yet. Its two brand Shorts, 06c (Starbucks: 760 views, 1,711 plays) and 06b (Netflix, Mon 12 Oct 12:14 ET: 75 views so far), "
    "are too young to compare, and 06b's Reel shows 7 plays while Instagram's owner insights catch up.",
    "",
    "Medians by posting slot (n = 2-3 each, confounded by topic; 06b and 06c left out as too young):",
    "",
    "- **YouTube:** Sunday early morning ET 1,198, weekday 22:00-00:30 ET 642, weekday midday 263.",
    "- **Instagram:** weekday 22:00-00:30 ET 5,449, midday 1,212, Sunday early morning 1,087.",
    "",
    "One weekday evening is the best Instagram slot and the second-best YouTube slot, so the plan posts both then. "
    "On Instagram, skip rate predicts plays better than the hour does (27.0-27.4% for the top two, 56.9-65.1% for the bottom two). "
    "So the window is a light-touch test, and the cut's length and pace (fewer still moments) are the bigger reach lever.",
]
CHANNEL_STATS = {"youtube_subscribers": 53, "youtube_views": 10221, "youtube_videos": 41,
                 "youtube_30d": "+27 subscribers, +5,127 views, 11 videos",
                 "instagram_followers": 8, "instagram_30d_views": 20519}
LIMITS = [
    "@envelopemath's YouTube Analytics (audience hours, geography) were not read here; the 06b and 06c sheets found vidIQ's YouTube authorization is a different channel. Check Studio → Analytics → Audience → 'When your viewers are on YouTube' before posting.",
    "vidIQ has no hashtag-volume data; hashtag picks lean on keyword volume and on the write-up's and the outliers' own tags.",
    "Title scores are vidIQ's short-form CTR model for this channel; they rank options but do not predict views.",
    "The write-up's sources were confirmed from search results: Treasury's statement and cbo.gov were blocked to direct fetches, and the $970 billion and the CBO August review are marked [click-check] there. Open them once before posting.",
    "The figures in other creators' titles and descriptions (per-second spending, interest and debt) are theirs, not verified here; the copy states only the write-up's maths.",
    "The write-up prefers to post 10a on fiscal 2026 net interest once Treasury's September 2026 statement is out; this sheet is built on fiscal 2025, as the video is today.",
] + _pre(["Until the ship step, renders/channel, the video facts above (current_*) and the two cover JPGs are the round-2 cut, which runs past this copy's verdict. "
          "The copy describes the recut (WIP render in /tmp/cond/10/, read for frame 1 and the cover frame); the ship step's --covers build refreshes the rest. "
          "The recut's sound is the ship step's to re-verify (the write-up: 10a passes verify 42/42 on both Scoreboard packs, with margins under 0.5 on A5, A2 and A1)."], [])
RESEARCH_EXTRA = {
    "titles_scored": "11 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13: 10 at the first build and option 3 with the description's own hashtags at the adversarial check; all are in youtube.titles_ranked and youtube.titles_also_scored. "
                     "None re-scored at the recut update: the title does not change.",
    "vidiq_credits": "105 credits for this teaser by listed cost (8 keyword queries, 2 YouTube searches, 1 Shorts outlier search, 1 Instagram/TikTok outlier search and 9 title scores at up to 5 each), plus 10 shared across 10a-10c for the channel's stats and Shorts list (Instagram owner insights cost 0), and 5 for the re-score after the build. "
                     "Account balance: 4,375 at the start of the 10 research and 4,135 when it ended, a 240 drop for 56 calls (the balance is shared with sheets built in parallel, so the drop is an upper bound; keyword queries cost less than 5); 4,060 after the 3 re-scores (15 credits by listed cost; the rest of that 75 drop is other sheets'). About 255 for the three 10 sheets, against a budget of about 450. "
                     "Adversarial check: 10 for this teaser by listed cost (the pick's title score and option 3's) plus 4 keyword queries ('national debt interest' twice, 'interest on the national debt', 'interest on national debt'), and 5 shared across 10a-10c for the three related videos' titles. "
                     "Balance 3,695 at the check's start and 3,635 after its last call (a 60 drop for 18 calls across 10a-10c, 30 of it listed title and video costs; the balance is shared with sheets checked in parallel). "
                     "Recut update (2026-10-13): 0 credits, no vidIQ call (the title, tags and hashtags do not depend on the stop).",
    "recut_update": "2026-10-13: the copy rewritten for the owner-approved recut to the earlier verdict (the counter stops on $500,000; '$500K a year: ≈ 16 seconds.'). "
                    "Changed: the description's opening line and its top row, the caption's result line and ladder, the swap-in line (now 'any other salary', above the top row included), both alt texts, the cover frame, the thumbnail's ladder (five pips), the video facts and the posting notes. "
                    "Unchanged: the title, tags, hashtags, pinned and first comments (none names a row past the stop).",
    "related_debt_counter_note": "10b (new US debt) shares this Short's topic; the write-up asks for the two to go out at least a week apart or as a labelled pair.",
}

# ---------------------------------------------------------------- the check log
CHECKED_BY = "publishing editor's recut update, then an adversarial re-check of this sheet against the write-up and the platform limits"
CHECKED_MATH = (f"python3 teasers/v2/checks/10-cost-counter.py: {MATH_RUN}, run by the builder through publishing/data/checks/10-cost-counter.py; "
                "the rate and every row recomputed from $970 billion in MATH_RELATIONS ($30,758.50 ≈ $30,800; ≈ $111 million an hour; 1.0 / 2.1 / 3.3 / 8 / 16 seconds; $1,251 × 52 = $65,052; the swap-in 2.112 ≈ 2.1; CBO's 12%), "
                "and the cut's spec read for its stop (r × 16.25568 = $500,000.30), its five rows and its verdict; "
                "COPY_RULES hold every figure to the write-up's one rounding, put '≈' or 'about' on every rounded figure, keep $970 billion beside fiscal 2025 and the 12% beside its own line, keep the swap-in rule's worked example to what the rule gives, "
                "ban any row past the recut's stop, and ban 'live', 'in real time', politics and advice wording")
VIDIQ_REQUERIED = ("pulled 2026-10-13: national debt 25,193 / 62.0 (+2.0%); us debt 44,622 (-33.1%); national debt interest 4,591; national debt clock live 8,779; "
                   "title scores 93 (pick = the write-up's title), 95 (top); channel 53 subs / 10,221 views / 41 videos; Instagram 8 followers, 20,519 views in 30 days. "
                   "Re-queried after the build: the pick's title score 93. Match. "
                   "Re-queried at the adversarial check: the pick's title score 93; national debt interest 4,591 / 43.0 (snapshot 2026-03-01); "
                   "the related video 8__HTUa2PoU 642 views, title as in the pick. All match. New: 'interest on national debt' 4,270 / 40.0 (the tag now uses it); 'interest on the national debt' still under 750. "
                   "Not re-queried at the recut update (2026-10-13): the title is unchanged, so no title needed a score.")
CHECK_LOG_TITLE = "recut update and adversarial re-check, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/10-cost-counter.py`: {MATH_RUN}. Every public figure traces to the 10a maths table: $970,000,000,000 ÷ 31,536,000 = $30,758.50 ≈ $30,800 a second; × 3,600 = $110,730,594 ≈ $111 million an hour; "
    "$30,000 ÷ r = 0.975 ≈ 1.0 s; $65,052 ÷ r = 2.115 ≈ 2.1 s; $100,000 ÷ r = 3.251 ≈ 3.3 s; $250,000 ÷ r = 8.128 ≈ 8 s; $500,000 ÷ r = 16.256 ≈ 16 s; the stop r × 16.25568 = $500,000.30 ($500,000.33 at the stored rate), so '$500,000' with no '≈'; $65,052 ÷ 30,800 = 2.112 ≈ 2.1; "
    "CBO: ($1,052B − $941B) ÷ $941B = 11.8% ≈ 12%. The data file recomputes every one and reads the cut's spec (its verdict, final, stop and five rows).",
    "{LIMITS}",
    "- **The recut (owner-approved 2026-10-13).** The video now stops on its $500,000 pass, and the verdict is '$500K a year: ≈ 16 seconds.' (the write-up's 10a section and its Review log, 'Recut to the earlier verdict' and 'Recut, fix pass'). Rewritten to match:",
    "  - the description's opening line and its math (the top row is '$500,000, the top row: ≈ 16 seconds', and '≈ $111 million an hour' follows the rate, as the write-up's caption now has it);",
    "  - the caption's result line (the write-up's new line 1, '$100,000 a year of pay ≈ 3.3 seconds of US debt interest. $500,000 ≈ 16 seconds.') and its ladder;",
    "  - the swap-in line, now 'any other salary (between the rows, under $30,000 or over $500,000)': the recut's ladder tops out at $500K, and the write-up says the rule covers salaries above it;",
    "  - both alt texts (the short one pairs $100,000 with the top row, $500,000; the long one has the stop on exactly $500,000, the coin and the verdict, quoted), the thumbnail's ladder (five pips, read on the recut's frame 1), the cover frame (the recut's frame 555, 18.50 s, inside the write-up's 18.4-18.55 s), the video facts, the trial note and the posting notes.",
    "  - Unchanged, because none names a row past the stop: the title (it asks the same question, and the write-up re-checked the hook), the tags, the hashtags, the pinned comment and the first comment.",
    "- **New guards (COPY_RULES, MATH_RELATIONS).** A rule bans any row past the stop anywhere in the copy, tags and hashtags. A relation reads the cut's spec (the WIP spec before the ship step, `studio/specs/` after) and holds the copy to it: the stop at 16.25568 s on '$500,000', five rows topping out at $500,000, and the verdict '$500K a year: ≈ 16 seconds.', which the long alt text quotes word for word (≈ as 'about').",
    "- **Mutation test** (scratch copies of this file, each built with `--out` to a scratch folder; each must exit 1 and fail by name): the earlier cuts' top row (its figure and its time) back in the description, the same in the caption's result line, "
    "the long alt text's payoff off the spec's verdict ('about 17 seconds'), '$500K in 16 Seconds' in the title, '$500,000' moved into the caption's first 125 characters, the spec's verdict changed under the copy, "
    "a sixth row past the stop added to the cut's spec, a beat timestamp in the caption, '≈ 17 seconds' for the top row and 'Not financial advice.' dropped from the caption: 10 of 10 caught (20 of 20 across 10a and 10c). "
    "The adversarial pass's guards (a title that gives the result, 'live', a second rounding of the rate, the 12% without its line, a politician's name, $970 billion beside 2026, the swap-in example) are in COPY_RULES unchanged.",
    "- **Kept on purpose.**",
    "  - The pick is the write-up's own title (93), not the top score (95): the top one says the US 'pays' interest every second, which the write-up calls an average.",
    "  - The YouTube thumbnail is frame 1 (the question) and the Instagram cover is the verdict frame, as the write-up's Instagram note asks. The no-result rule covers the title and the caption's first 125 characters.",
    "  - 'Fiscal 2025' wherever the $970 billion appears, and the fiscal 2026 sentence in the past tense with CBO's own line (net interest on the public debt, 11 months), as the write-up's caption has it.",
    "  - 'national debt clock live' (8,779 a month) stays out of the tags: the write-up bans 'live' and 'in real time' for this counter.",
    "  - The pinned and first comments work the swap-in rule for the median ($65,052 ÷ 30,800 ≈ 2.1 seconds), not '$100,000 ≈ 3.3' as the write-up's pinned comment does: 100,000 ÷ 30,800 = 3.247 is 3.2 (the adversarial pass's fix, kept).",
    "- **Checked and kept.** Every figure in the copy against the 10a maths table and the check's output; the title (67/100), description (bytes), tags, hashtags, caption, first 125 characters and both alt texts against the platform limits; "
    "no brand, party or person anywhere; no beat timestamp in the copy; frame 1 (thumbnail) and frame 555 (cover) read from the recut render.",
    "- **Generator.** Unchanged. `MATH_SCRIPT` is the adapter `publishing/data/checks/10-cost-counter.py` (it runs the 10 check unchanged and adds the builder's summary line); `MATH_ARGS` points it at the WIP specs until the ship step, then at `studio/specs/`.",
    "- **Still to do (the ship step).** Promote the recut's spec and render (the write-up's 'To promote'), then run `--covers`: the cover JPGs on disk are the round-2 frame until then. Re-run `verify` on both Scoreboard packs if 10a's duration or verdict time moves. "
    "The owner's FY2026 decision (a rebuild changes every figure here, the verdict's included).",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 10a maths table (teasers/v2/10-cost-counter.md, section 10a) and
# recomputed below from its inputs; years and dates are the sources' own, quoted from the write-up.
FIGURES = {
    "$970", "31,536,000", "365", "$30,800", "30,800", "$111", "$30,000", "1.0", "$1,251", "52", "$65,052", "2.1",
    "$100,000", "3.3", "$250,000", "8", "$500,000", "$500", "16", "$0", "12", "11",
    "2025", "2026", "2036", "2",
}
from fractions import Fraction as _F
_r = _F(970 * 10**9, 31536000)                  # net interest per second, FY2025
_t = lambda v: _F(v) / _r                       # pass time of a salary row
_r1 = lambda x: round(float(x), 1)
_D = _CUT["data"]
MATH_RELATIONS = [
    (round(float(_r), 2) == 30758.50 and round(float(_r), -2) == 30800, "$970B ÷ 31,536,000 = $30,758.50 ≈ $30,800 a second (3 significant figures)"),
    (round(float(_r * 3600) / 1e6) == 111, "× 3,600 = $110,730,594 ≈ $111 million an hour"),
    (_r1(_t(30000)) == 1.0, "$30,000 ÷ rate = 0.975 ≈ 1.0 second"),
    (1251 * 52 == 65052 and _r1(_t(65052)) == 2.1, "median pay $1,251 × 52 = $65,052; ÷ rate = 2.115 ≈ 2.1 seconds"),
    (_r1(_t(100000)) == 3.3, "$100,000 ÷ rate = 3.251 ≈ 3.3 seconds"),
    (round(float(_t(250000))) == 8, "$250,000 ÷ rate = 8.128 ≈ 8 seconds"),
    (round(float(_t(500000))) == 16, "$500,000 ÷ rate = 16.256 ≈ 16 seconds (the recut's top row and verdict)"),
    (_r1(_F(65052, 30800)) == 2.1 == _r1(_t(65052)), "the swap-in rule for the median, $65,052 ÷ 30,800 = 2.112, rounds the same as the exact 2.115"),
    (_r1(_F(100000, 30800)) == 3.2 and _r1(_t(100000)) == 3.3, "the swap-in rule is approximate by design (100,000 ÷ 30,800 = 3.247 ≈ 3.2; the exact rate gives 3.3), so the copy never pairs $100,000 ≈ 3.3 with the rule: its worked example is the median, where both give 2.1"),
    (round(float(_F(1052 - 941, 941)) * 100) == 12, "CBO: ($1,052B − $941B) ÷ $941B = 11.8% ≈ 12% (net interest on the public debt, 11 months)"),
    (_F(30000) < _r and (_r - 30000) / _r < _F(1, 20), "$30,000 is an exact salary input 2.5% under the rate, not a second rounding of it (the check's exemption)"),
    # the cut this copy describes, read from its spec (the WIP spec before the ship step, studio/specs/ after)
    (_D["counterT"][1] == 16.25568 and _t(500000) < _F("16.25568") and abs(float(_r * _F("16.25568")) - 500000) < 0.5
     and abs(_D["perSecond"] * 16.25568 - 500000) < 0.5 and _D["final"] == "$500,000",
     f"the cut's counter stops on exactly $500,000 after its pass (r × 16.25568 = $500,000.30; stored rate $500,000.33), final '$500,000' with no '≈' ({_CUT_SPEC_REL})"),
    ([m["value"] for m in _D["milestones"]] == [30000, 65052, 100000, 250000, 500000],
     f"the cut's ladder is five rows, $30,000 to $500,000: no row past the stop ({_CUT_SPEC_REL})"),
    (_CUT["verdict"]["text"] == "**$500K** a year: ≈ 16 seconds." and abs(_CUT["duration"] - RECUT_BODY_S) < 0.01,
     f"the cut's verdict is '$500K a year: ≈ 16 seconds.' and its body {RECUT_BODY_S:g} s, as this copy says ({_CUT_SPEC_REL})"),
]
MATH_SCRIPT = "publishing/data/checks/10-cost-counter.py"
MATH_KEY_LINES = ["30,758.4982  ≈ $30,800 every second", "110.7306  ≈ $111 million", "0.9753  ≈ 1.0 second", "2.1149  ≈ 2.1 seconds",
                  "3.2511  ≈ 3.3 seconds", "8.1278  ≈ 8 seconds", "16.2557  ≈ 16 seconds",
                  "500,000.3044  $500,000 (the recut stops on the $500K pass)",
                  f"$500,000          18.6  recut to the earlier verdict (2026-10-13) ({_CUT_SPEC_REL})"]
RESULT_RE_TITLE = r"30,8|30\.8|\b16\b|3\.3|2\.1|1\.0|\b8\b|\$111|970|500|≈|[Aa]bout|[Ss]econds?\b"
RESULT_RE_CAPTION = r"\$10|\$50|\$25|30,8|30\.8|\b16\b|3\.3|2\.1|1\.0|\b8 sec|\$111|970|≈|[Aa]bout|seconds?\b"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_ALL = "\n".join(_COPY.values())
_ALL_TAGS = _ALL + "\n" + ", ".join(YT_TAGS) + "\n" + " ".join(YT_HASHTAGS + IG_HASHTAGS)
_YEAR = _re.compile(r"(?<![/\d])20[123]\d(?!\d)")
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]
_num = lambda s: float(s.replace(",", ""))


def _beside(fig, year, reach=45):
    """every occurrence of fig has its year on the same line, within reach characters, with no other year between them"""
    return all(any(y.group() == year and abs(y.start() - m.start()) <= reach
                   and not _YEAR.search(ln[min(y.end(), m.end()):max(y.start(), m.start())]) for y in _YEAR.finditer(ln))
               for ln in _lines() for m in _re.finditer(fig, ln))


def _approx(pat):
    """every occurrence of pat comes right after '≈ ' or 'about ' (or, for a time, after '$…: ≈ ')"""
    return all(_re.search(r"(?:≈|[Aa]bout) $", v[max(0, m.start() - 6):m.start()]) for v in _COPY.values() for m in _re.finditer(pat, v))


# One rounding per quantity (the write-up's rule, unit-aware): a time in seconds near a pass time, or a dollar figure near
# the rate, must be that quantity's one shown rounding. ("$30,000" is an exact salary, the check's own exemption.)
_TIMES = {"$30K": (float(_t(30000)), 1.0), "median": (float(_t(65052)), 2.1), "$100K": (float(_t(100000)), 3.3),
          "$250K": (float(_t(250000)), 8), "$500K": (float(_t(500000)), 16)}
_TIME_RE = _re.compile(r"(?<![\d,.$])(\d+(?:\.\d+)?)(?= (?:seconds?|s)\b)")
_bad_times = [(m.group(1), k) for m in _TIME_RE.finditer(_ALL) for k, (ex, shown) in _TIMES.items()
              if abs(_num(m.group(1)) - ex) <= ex / 20 and _num(m.group(1)) != shown]
_DOLLAR_RE = _re.compile(r"\$?(\d[\d,]*(?:\.\d+)?)")
_bad_rate = [m.group(0) for m in _DOLLAR_RE.finditer(_ALL) if m.group(1) not in ("30,000", "30,800")
             and abs(_num(m.group(1)) - float(_r)) <= float(_r) / 20]
_bad_hour = [m.group(0) for m in _re.finditer(r"\$(\d[\d,.]*) million", _ALL) if abs(_num(m.group(1)) - 110.73) <= 110.73 / 20 and m.group(1) != "111"]
# A worked example on a swap-in line (one that says '÷ 30,800' or 'by 30,800') must be what the rule itself gives:
# '$100,000 ≈ 3.3' there would be the exact rate's answer, and 100,000 ÷ 30,800 = 3.247 is 3.2.
_bad_swap = [m.group(0) for ln in _lines() if _re.search(r"(?:÷|by) 30,800", ln)
             for m in _re.finditer(r"\$([\d,]+)(?: ÷ 30,800)?:? ≈ (\d+(?:\.\d+)?) seconds?", ln)
             if round(_num(m.group(1)) / 30800, len(m.group(2).split(".")[1]) if "." in m.group(2) else 0) != float(m.group(2))]
# The recut stops on $500,000: no row, figure or time past it (the earlier cuts' top row and its ≈ 33 seconds).
_PAST_STOP = _re.compile(r"(?i)\$1M\b|\b1M\b|\$1 million\b|\b1,000,000\b|\bmillion a year\b|\bmillionaire|\b3[2-4](?:\.\d+)? (?:seconds?|s)\b")
# The verdict as the long alt text quotes it: the cut's own words, '≈' read as 'about', markdown and line breaks dropped.
_VERDICT_PLAIN = _re.sub(r"\s+", " ", _CUT["verdict"]["text"].replace("**", "").replace("≈", "about")).strip()

_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (not _re.search(r"(?i)\blive\b|\bin real time\b|\breal-time\b", _ALL_TAGS), "no 'live' or 'in real time' in the copy, tags or hashtags (the write-up's banned overclaims for 10a)"),
    (not _PAST_STOP.search(_ALL_TAGS), f"no row past the recut's stop ($500,000) in the copy, tags or hashtags: {_PAST_STOP.findall(_ALL_TAGS)}"),
    (_VERDICT_PLAIN.lower() in IG_ALT_LONG.lower() and "$500,000, the top row" in YT_DESCRIPTION and "$500,000, the top row" in IG_CAPTION,
     f"the long alt text quotes the cut's verdict ('{_VERDICT_PLAIN}'), and the description and the caption name $500,000 as the top row"),
    (not _re.search(r"\b\d+(?:\.\d+)? ?s\b|\b\d+:\d\d\b", _ALL.replace("31,536,000 s", "")),
     "no beat timestamp in the copy (only the cover section names a frame)"),
    (not _bad_times, f"every time is its row's one rounding (≈ 1.0 / 2.1 / 3.3 / 8 / 16 seconds): {_bad_times}"),
    (not _bad_rate, f"the rate is only ever $30,800 (one rounding of $30,758.50): {_bad_rate}"),
    (not _bad_hour, f"the hourly figure is only ever $111 million: {_bad_hour}"),
    (not _bad_swap and "$65,052 ÷ 30,800 ≈ 2.1 seconds" in YT_PINNED and "$65,052 ÷ 30,800 ≈ 2.1 seconds" in IG_FIRST_COMMENT,
     f"the swap-in rule's worked example is what the rule gives ($65,052 ÷ 30,800 = 2.112 ≈ 2.1, as the video's label), never '$100,000 ≈ 3.3' beside '÷ 30,800': {_bad_swap}"),
    (all(_approx(p) for p in (r"\$30,800", r"\$111 million", r"(?<![\d.])(?:1\.0|2\.1|3\.3|8|16) seconds?\b")),
     "≈ $30,800, ≈ $111 million and every pass time come with '≈' or 'about' ($500,000 is the exact stop and goes without)"),
    (_beside(r"\$970 billion", "2025"), "$970 billion always sits beside (fiscal) 2025"),
    (all("public debt" in ln and "11 months" in ln for ln in _lines() if _re.search(r"\b12%", ln)),
     "the 12% always names its own line: net interest on the public debt, over the same 11 months (the write-up's caption)"),
    (all("$0 of it pays the debt down" in _COPY[k] for k in ("description", "caption", "pinned comment")),
     "'$0 of it pays the debt down' is in the description, the caption and the pinned comment"),
    (all("Not financial advice." in _COPY[k] for k in ("description", "caption")), "'Not financial advice.' is in the description and the caption"),
    (not _re.search(r"(?i)\b(?:trump|biden|obama|bessent|powell|republicans?|democrats?|gop|congress|white house|president|administration|party)\b", _ALL_TAGS),
     "no party, person or policy is named (the write-up's tone rule)"),
    (all(_re.search(r"\d (?:million|billion|trillion)\b", ln) for ln in _lines() if _re.search(r"(?i)\b(?:million|billion|trillion)\b", ln))
     and not _NUMBER_WORDS.search(_ALL), "no spelled-out figures ('million' and 'billion' only after a numeral)"),
    (not _re.search(r"(?i)\byou should\b|\bmust\b|\bbuy now\b|\bworth it\b|\binvest\b", _ALL), "no advice wording"),
]
