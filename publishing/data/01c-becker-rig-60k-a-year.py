# 01c publishing data: will a 3% raise push $65,000 into a higher tax bracket? (Becker Rig, dead-simple-list).
# Built by publishing/tools/build_publishing.py (see publishing/data/README.md). Runs with BASE, VIDEO_S, VIDEO_SHA,
# BODY_S, CARD_S and tag_chars already defined. Started from a copy of 06c-becker-rig-latte-starbucks.py (the nearest
# Becker Rig sheet). The id keeps its round-2 slug (60k-a-year); since the hook pass the topic is the bracket myth.
#
# Facts come only from teasers/v2/01-dead-simple-list.md (section (b) 01c) and python3 teasers/v2/checks/01-dead-simple-list.py.
# Research: vidIQ, pulled 2026-10-13. The video is the pre-condense round-2 cut: the 01 condense is in progress in parallel
# (timing only; numbers, caption facts and the verdict stay). This sheet names no timestamp except the cover, which is
# picked by content (frame 1), so the ship step only re-runs the build with --covers on the final file.

TEASER = "01c Becker Rig, dead-simple-list: \"Will a 3% raise push you into a higher tax bracket?\""
PREPARED = "2026-10-13"
SHORT_ID = "01c"
MD_TITLE = "01c publishing sheet: will a 3% raise push you into a higher tax bracket?"
MATH_RUN = "400 checks, 0 failed"      # python3 teasers/v2/checks/01-dead-simple-list.py on studio/specs/, re-run at the adversarial check 2026-10-13
MATH_RUN_WIP = "392 checks, 0 failed"  # the same script with --spec on the three studio/specs-wip/ condensed specs, 2026-10-13
RENDER_COMMIT = "471c793"              # the commit that holds this pre-condense render

MD_INTRO = [
    f"- **Video.** `renders/channel/{BASE}.mp4`: the pre-condense round-2 cut ({VIDEO_S:g} s: a {BODY_S:g} s body + the {CARD_S:g} s card; sha256 `{VIDEO_SHA[:8]}…`). "
    "The 01 condense is in progress in parallel (timing only: the numbers, the captions' facts and the verdict stay). "
    "Nothing below names a timestamp except the cover, which is picked by content (frame 1), so the copy carries over to the condensed cut unchanged. "
    f"The ship step rebuilds this sheet and re-exports both covers from the final file: `python3 publishing/tools/build_publishing.py {BASE} --covers`. "
    "The id keeps its round-2 slug (`60k-a-year`); viewers never see it, and since the write-up's hook pass the topic is the bracket myth on a 3% raise.",
    "- **Numbers.** Every figure comes from `teasers/v2/01-dead-simple-list.md` (01c) and its check, "
    f"`python3 teasers/v2/checks/01-dead-simple-list.py`: {MATH_RUN} on `studio/specs/` (run 2026-10-13). "
    f"`python3 publishing/tools/build_publishing.py {BASE} --check` checks this sheet's limits, paste blocks and figures, recomputes the full 2026 federal tax before and after the raise, "
    "keeps the 2026 bracket figures beside their year and the $45 beside 'a year', and keeps 'single filer' and 'federal income tax only' in the copy.",
    "- **Honesty rules kept.** The title asks and never gives the result ('Yes', $45), and neither does the cover (frame 1: the question, the $65,000 block and 4 empty ledges). "
    "The title's 'What It Really Costs' echoes the last ledge's label, 'What the bracket costs you', which is on screen from frame 1. "
    "The Instagram caption keeps every result below 'more'. Every claim stays inside the video's verdict, \"Higher bracket? Yes. It costs you $45 a year\", "
    "with its conditions: 2026, single filer, standard deduction, federal income tax only, and only for salaries a 3% raise carries across the line. No advice, no urgency, and 'Not financial advice.' is in both.",
    "- **Sources.** The 2026 single brackets (12% to $50,400 of taxable income, 22% above) and the $16,100 standard deduction: the IRS (Rev. Proc. 2025-32 and its newsroom release), "
    "the Tax Foundation and CPA Practice Advisor, as in the write-up. They are cited as sources only; no company or brand is the copy's subject, so, as on 06b and 06c, no affiliation line is needed.",
]

# ---------------------------------------------------------------- the video
FOR_VIDEO_NOTE = ("Metadata is cut-independent: it names no timestamps except the cover frame, which is picked by content. "
                  "current_* is what renders/channel holds today: the pre-condense round-2 cut. The ship step re-runs the build with --covers on the condensed file.")
CUT = {"name": "round-2 cut (pre-condense)", "spec": f"studio/specs/{BASE}.json", "body_s": BODY_S,
       "card_s": CARD_S, "shipped": None, "git": RENDER_COMMIT,
       "status": "the 01 condense is in progress in parallel (timing only; numbers, caption facts and the verdict stay). "
                 "The ship step rebuilds this sheet with --covers from the final file, which refreshes current_*, this cut and both covers."}

FACTS = {
    "source": f"teasers/v2/01-dead-simple-list.md section (b) 01c; teasers/v2/checks/01-dead-simple-list.py: {MATH_RUN} on studio/specs/ (2026-10-13)",
    "inputs": "$65,000 salary (≈ BLS Q2 2026 median full-time pay, $1,251 × 52 = $65,052; write-up only) and a 3% raise (2026 raise budgets 3.1-3.5%; write-up only)",
    "tax_law": "2026, single filer: standard deduction $16,100; 10% to $12,400 of taxable income, 12% to $50,400, 22% to $105,700 (IRS Rev. Proc. 2025-32; IRS newsroom; Tax Foundation; CPA Practice Advisor)",
    "slot_1": "$65,000 × 1.03 = $66,950 (+$1,950 raise)",
    "slot_2": "the 22% line in pay: $50,400 + $16,100 = $66,500",
    "slot_3": "$66,950 − $66,500 = $450 over the line, taxed 22%, not 12%",
    "slot_4": "$450 × 10% (22% − 12%) = $45 a year; every result exact, so no '≈'",
    "cross_check": "full 2026 federal tax $5,620.00 → $5,899.00: $279 on the raise = 12% × $1,500 + 22% × $450; the same raise all at 12% = $234; difference $45",
    "rule": "(new pay − $66,500) × 10% matches the full calculation to the cent for every salary a 3% raise carries across the line, $64,564 to $66,499",
    "pinned": "myth (all taxed pay 10 points more): 10% × $50,850 = $5,085 (113× the real $45); FICA on the raise 7.65% × $1,950 = $149.18; kept $1,950 − $279 − $149.18 ≈ $1,522",
    "verdict": "Higher bracket? Yes. It costs you $45 a year",
    "not_modelled": "state income tax; FICA (flat, so a bracket never changes it); pre-tax 401(k) or HSA deferrals (they move the line up); credits; other filing statuses",
}

# ---------------------------------------------------------------- YouTube
YT_TITLE = "Does a 3% Raise Put You in a Higher Tax Bracket? What It Really Costs on $65,000"
YT_TITLES = [
    {"rank": 1, "title": YT_TITLE, "vidiq_score": 94,
     "note": "PICK. The searched question ('does a raise put you in a higher tax bracket', 4,364 a month) with the video's own 3% and $65,000, "
             "then the last ledge's label as the second question. 9 points over the write-up's title. No hashtags in the title; the description's first three show above it."},
    {"rank": 2, "title": "Does a Raise Put You in a Higher Tax Bracket? What It Really Costs on $65,000", "vidiq_score": 94,
     "note": "The same score and the search phrase word for word, but it drops '3%'. The video's honest 'yes' holds only for a raise that crosses the line, so the pick keeps the 3%."},
    {"rank": 3, "title": "Will a 3% Raise Push You Into a Higher Tax Bracket? #taxbracket #raise #taxes", "vidiq_score": 85,
     "note": "The write-up's title in the house 3-hashtag form, its hashtags in the description's order (the hashtags cost nothing here: 85 with or without). The channel's live Shorts carry title hashtags, so this is the option if the owner keeps that habit."},
]
YT_TITLES_ALSO_SCORED = [
    ("Does a Raise Put You in a Higher Tax Bracket? What It Really Costs", 91, ""),
    ("Will a 3% Raise Push You Into a Higher Tax Bracket? What It Really Costs", 90, ""),
    ("Will Your Raise Push You Into a Higher Tax Bracket? The 2026 Math on $65,000", 89, ""),
    ("Does a Raise Put You in a Higher Tax Bracket? What the Bracket Costs on $65,000", 89, "the last ledge's label word for word"),
    ("Will a 3% Raise Push You Into a Higher Tax Bracket?", 85, "the write-up's title"),
    ("Will a 3% Raise Push $65,000 Into a Higher Tax Bracket?", 84, "the on-screen header's grammar"),
    ("Will a 3% Raise Push You Into a Higher Tax Bracket? #taxes #taxbracket #raise", 85, "option 3's first hashtag order, not the description's"),
]
TITLE_BULLETS = [
    "The first question, 'Does a 3% Raise Put You in a Higher Tax Bracket?', is the first 48 characters, so a title cut short still asks it whole. "
    "It is the searched question ('does a raise put you in a higher tax bracket', 4,364 a month) with the video's 3%, and it carries 'higher tax bracket' (4,543, competition 15.3).",
    "The second question, 'What It Really Costs on $65,000', is the last ledge's label ('What the bracket costs you', on screen from frame 1) on the header's input. "
    "It promises a cost and does not give it; the description's first line answers it ('Yes. It costs $45 a year'), as the house template does.",
    "Most same-idea titles in the research answer 'no' outright ('No, It Doesn't', 'A Raise Will Never Lower Your Paycheck'), and the ones that only ask ('Can a Raise Make You Take Home Less Money?') answer 'no' in their descriptions where they have one. "
    "This video's honest answer is 'yes, and it costs $45 a year', so the title asks and lets the video say it.",
    "It raises the write-up's title from 85 to 94. vidIQ's model ranks titles but does not predict views; options 1 and 2 tie, so the pick is decided on accuracy.",
]

YT_DESCRIPTION = """Does a 3% raise push $65,000 into a higher tax bracket? Yes. It costs $45 a year, not your raise. In 2026, 22% starts at $66,500 of pay for a single filer on the standard deduction, and a 3% raise takes $65,000 to $66,950: $450 over the line.

The math, shown:
• $65,000 × 1.03 = $66,950 (a $1,950 raise).
• Where 22% starts in 2026: $50,400 of taxed pay + the $16,100 standard deduction = $66,500 of pay.
• $66,950 − $66,500 = $450 over the line.
• Only those $450 pay 22% instead of 12%: 10 points more. $450 × 10% = $45 a year.
• Not your whole raise. Not your whole pay. Every other dollar is taxed exactly as before.
• Check, full 2026 federal tax: $5,620 before, $5,899 after. The $279 of tax on the raise is $45 a year more than the same $1,950 taxed all at 12% ($234).

Crossed the line too? (new pay − $66,500) × 10% is all the bracket costs you, for any salary a 3% raise carries across it ($64,564 to $66,499).

Follow for the math behind your money — shown, not hand-waved. @envelopemath

Animation and original sound: The Back of the Envelope. 2026 federal income tax, single filer: standard deduction $16,100; 12% bracket to $50,400 of taxable income, 22% above it (IRS; Tax Foundation; CPA Practice Advisor). Federal income tax only: no state tax, FICA or credits; pre-tax 401(k) or HSA deferrals move the line up; other filing statuses have their own lines. Not financial advice.
#taxbracket #raise #taxes"""
DESC_NOTE = ("The opening line answers the title, as the house template does for the search snippet; the title and the caption's first 125 characters do not. "
             "Every line that names $50,400 or $16,100 also names 2026: the IRS updates both each year. "
             "The on-screen series name 'dead simple numbers' is left out: it is Master Money's phrase (the write-up's risk note), so the copy uses the house 'The math, shown:'.")

YT_HASHTAGS = ["#taxbracket", "#raise", "#taxes"]
YT_HASHTAG_NOTES = [
    ("#taxbracket", "the exact topic ('tax bracket' 5,134 searches a month, competition 28.2; '2026 tax brackets' 8,249)."),
    ("#raise", "the trigger ('pay raise' 9,533 a month, up 76.6% on its 30-day baseline)."),
    ("#taxes", "the category ('taxes' 82,933 a month, up 11.0%), shared with 01b, so the series shares it."),
]
YT_HASHTAG_PLACEMENT = ("The title carries no hashtags, so YouTube shows these 3, the description's first, above the title. "
                        "Over 60 hashtags and YouTube ignores all of them. `#Shorts` isn't needed.")

YT_TAGS = ["tax bracket", "tax brackets", "higher tax bracket", "does a raise put you in a higher tax bracket",
           "will a raise put me in a higher tax bracket", "tax bracket myth", "2026 tax brackets", "tax brackets explained",
           "income tax bracket explained", "marginal tax rate", "pay raise", "raise", "taxes",
           "money math", "math animation", "the back of the envelope", "envelope math"]
TAGS_NOTE = ("Tags carry little weight. These mirror the keyword research plus the house's channel tags. 'Marginal tax rate' is under 750 a month but names the rule the video shows. "
             "Left out on purpose: 'will bonus push me into higher tax bracket' (3,429 a month): bonuses are withheld differently, and the video is about a raise; "
             "'income tax' (64,908, up 149.6%) is mostly searched outside the US.")

YT_PINNED = """What's your salary? If a 3% raise carries it over $66,500 (2026, single filer, standard deduction), the bracket costs (new pay − $66,500) × 10% a year. That covers salaries from $64,564 to $66,499: below, a 3% raise doesn't reach the line; above, you were already in 22%.

If the myth were true (all taxed pay 10 points more): 10% × $50,850 = $5,085 a year. Real extra: $45 a year. On the whole $1,950 raise: federal income tax $279, FICA $149.18, so you keep ≈ $1,522."""
PINNED_NOTE = ("The question comes first so it shows in the collapsed preview, and it asks for the viewer's own number (R3). It answers the comment the write-up expects "
               "('what about my salary?') with the caption's rule and its salary window, and says what happens on either side of it. "
               "The second paragraph is the write-up's pinned comment: the myth's $5,085 against the real $45, and what the raise leaves after federal tax and FICA.")

RELATED_VIDEO = {
    "pick": {"id": "FW_oxA3kbsM", "title": "A $2 Lottery Ticket Was Worth $6.98. Until the Fine Print.",
             "url": "https://www.youtube.com/shorts/FW_oxA3kbsM",
             "why": "The same 'what do you really keep after tax?' question, on a jackpot instead of a raise; its Reel works through cash, the crowd and tax."},
    "swap_when_live": "01b (the same dead-simple-list series, also a paycheck tax), once published; then 01a. Then point theirs at this Short.",
}
THUMBNAIL_FRAME = "In the YouTube app, pick frame 1, the clean cover (the same content as the IG cover)."
THUMB_MD = "in the YouTube app, pick frame 1 (the clean cover: the question with the green $65,000 and 4 labelled, empty ledges), the same content as the Instagram cover below."
YT_POSTING_WINDOW = {
    "when": "First Tue-Thu evening after the condensed cut ships and passes QA, 21:30-22:30 ET (01:30-02:30 UTC the next day): Tue 13 Oct 2026 at the earliest; in the suggested order (01b, 01c, 01a, one evening each) that is Wed 14 Oct. Sunday 06:00-08:00 ET is the alternative.",
    "spacing": "Keep it at least 6 h from any other upload on the channel, and on a different evening from 01a and 01b (the same series). Suggested order: 01b, then 01c, then 01a (see why).",
    "why": "The channel's own October Shorts, median views by posting slot (vidIQ, 2026-10-13): Sunday 05:00-08:00 ET 1,198 (n = 2), weekday 22:00-00:30 ET 642 (n = 3), weekday midday 263 (n = 2); 06c (Mon 03:45 ET) has 760 and 06b (Mon 12:14 ET) 61 a day or less after posting, too young to compare. "
           "The evening slot is also the best one on Instagram, so one evening serves both. n = 7 and confounded by topic, so treat it as a test. "
           "Why second: 'pay raise' runs +76.6% over its 30-day baseline, and the IRS published the 2026 brackets on 9 Oct 2025 (the write-up's sources), "
           "so the 2027 ones may come out about now. Every line naming $50,400 or $16,100 also names 2026, so the copy stays true; posting early avoids 'those are last year's brackets' comments.",
}

# ---------------------------------------------------------------- Instagram
IG_HOOK = ("Will a 3% raise push $65,000 into a higher tax bracket? And if it does, what does the bracket cost you? "
           "The 2026 math, shown.")

IG_CAPTION = IG_HOOK + """

Single filer, standard deduction, 2026 federal income tax:
• Pay after 3%: $65,000 × 1.03 = $66,950 (a $1,950 raise).
• Where 22% starts in 2026: $50,400 of taxed pay + the $16,100 deduction = $66,500 of pay.
• Pay over the line: $66,950 − $66,500 = $450.
• What the bracket costs you: those $450 pay 22% instead of 12%. $450 × 10% = $45 a year.

Higher bracket? Yes. It costs you $45 a year. Not your whole raise, not your whole pay: every other dollar is taxed exactly as before.

Crossed the line too? (new pay − $66,500) × 10% is all the bracket costs you, for salaries from $64,564 to $66,499 with a 3% raise. Federal income tax only: no state tax or FICA, and pre-tax 401(k) or HSA deferrals move the line up. Not financial advice.

What's your salary?

Follow for the math behind your money — shown, not hand-waved. @envelopemath
Animation and original sound: The Back of the Envelope.

#taxbracket #taxes #raise #moneymath #personalfinance"""
IG_CAPTION_RULE = ("The first 125 characters are the header's question, the 'tax bracket' keyword, the last ledge's question and the year, no result: "
                   "the caption overlays the Reel from frame 1, so the 'Yes' and every number after $65,000 sit below 'more'.")
IG_CAPTION_BULLETS = [
    "**First 125 characters:** the header's question with the keyword 'higher tax bracket', the last ledge's question ('what does the bracket cost you?') and '2026', with no result. "
    "The write-up says caption line 1 is the verdict (R11) and its own caption opens with 'Higher bracket? Yes. It costs $45'; the house rule moves the verdict below 'more', "
    "because the caption overlays the Reel from frame 1. The numbers sit below the fold, where Instagram search and Google indexing still read them.",
    "The 4 bullets carry the 4 ledges' own labels, so the caption reads like the sheet. The conditions line keeps 'federal income tax only' and the 401(k)/HSA caveat from the write-up's footer.",
    "The caption follows the house close: the follow line plus the credit.",
]

IG_HASHTAGS = ["#taxbracket", "#taxes", "#raise", "#moneymath", "#personalfinance"]
IG_HASHTAG_MD = [
    "Four are the write-up's own (`#taxbracket #raise #moneymath #taxes`, all kept):",
    "",
    "- `#taxbracket` names the myth. The biggest myth Reel in the outlier search (@kaciebarrett, 326.4K) is about a promotion that 'cost' take-home pay.",
    "- `#raise` and `#taxes` name the trigger and the category.",
    "",
    "`#personalfinance` is the broad layer, as on 06b and 06c, and `#moneymath` is the write-up's series tag.",
]

IG_ALT_SHORT = "Animation: a 3% raise on $65,000 crosses the 22% line by $450 (2026). It costs $45 a year."
IG_ALT_SHORT_NOTE = ("It stays at or under 100 characters, so it fits the field however short it is, with no '×', '−' or '=', "
                     "so screen readers read it cleanly. Every figure is exact, so none needs 'about'; the $45 keeps its 'a year' and the line keeps its year.")
IG_ALT_RULE = ("Paste the short version into Instagram: it is kept at or under 100 characters so it fits the field however "
               "short it is, and it writes words instead of '×', '−' and '=' so screen readers read it cleanly. "
               "The long version is for anywhere with room (a website embed, a newsletter).")
IG_ALT_LONG = ("Animation on a white background. The header reads: 4 dead simple numbers. Will a 3% raise push $65,000 into a higher bracket? "
               "A green stick figure throws formula plates onto 4 numbered ledges. Pay after 3%: $65,000 × 1.03 = $66,950 (+$1,950 raise). "
               "Where 22% starts in 2026 (single filer): $50,400 + $16,100 = $66,500 of pay. Pay over the line: $66,950 − $66,500 = $450, taxed 22%, not 12%. "
               "What the bracket costs you: $450 × 10% = $45, slammed onto a gold plate with a 'yes!' jump; he points at the $450 and at the $45, and shrugs. "
               "Verdict: Higher bracket? Yes. It costs you $45 a year.")

IG_FIRST_COMMENT = ("Higher bracket? Yes: the $450 over the 2026 line ($66,500 of pay, single filer, standard deduction) pays 22%, not 12%. "
                    "It costs you $45 a year, federal income tax only. What's your salary?")

# ---------------------------------------------------------------- the cover frame
# Frame 1 (t 0), picked by content: the write-up's Instagram note says "the cover is frame 1". On this render frame 0 is
# the only frame without a caption: from frame 1 the first caption word fades in, and from frame 4 the figure starts to
# flip the plate. The condensed WIP spec starts its hook caption before frame 1 (it holds no result), so on that cut
# frame 0 carries the caption and is still the cover.
COVER_T = 0
COVER_FRAME = 0
COVER_CROP = "crop=1080:1440:0:0"
COVER_RENDER_WORD = "pre-condense"
COVER_FRAME_BY_CONTENT = ("The clean cover, frame 1: the header '4 DEAD SIMPLE NUMBERS / WILL A 3% RAISE PUSH $65,000 / INTO A HIGHER BRACKET?' ('$65,000' in green), "
                          "the footer 'ASSUMES single, standard deduction / 2026 federal income tax only', 4 numbered ledges labelled "
                          "'Pay after 3% / Where 22% starts / Pay over the line / What the bracket costs you' (the last three with empty sockets), ① active with its '$65,000' block, "
                          "and the green stick figure holding the '× 1.03' plate. No result: it asks and does not answer, like the title and the caption. "
                          "The write-up names frame 1 as the Instagram cover. On any cut, use the opening frame, before the figure flips the plate. "
                          "A cut whose hook caption is already up on its first frame (the condensed WIP spec's is) still gives a clean cover: '$65,000, plus 3%:' holds no result.")
COVER_FRAME_MEASURED = ("On the pre-condense 27.8 s render, frame 0 is that frame and the only one without a caption: from frame 1 the first caption word ('$65,000,') fades in, "
                        "and from frame 4 he starts to flip the plate.")
COVER_CROP_NOTE = ("3:4 = 1080×1440, the top 1440 rows (y 0 to 1440) of the 1080×1920 frame: the badge, the header, the footer, the 4 ledges, the figure and the floor line, with even margins above the badge and below the floor; "
                   "it drops the empty floor below. A crop from y 60 (as on 01a) leaves 200 px of empty floor. A centred grid crop (y 240-1680) cuts the badge and leaves the header on the edge.")
COVER_HOW_TO_SET = ("In 'Edit cover', pick frame 1 of the video (or upload the 9:16 JPG), then drag 'Profile grid' to the top so the tile "
                    "matches the 3:4 JPG. Do not upload the 3:4 JPG as the Reel cover: Instagram centre-crops it to 9:16 in the Reels tab "
                    "and cuts the header.")
COVER_EXTRA_BULLETS = [
    "**Not used:** the verdict hold (the finished sheet with '$45' on its gold plate and 'Higher bracket? Yes. It costs you $45 a year'). It is the save-worthy frame, but it shows the answer, "
    "against the write-up's cover note and the title's no-result rule.",
    "**When the condensed cut ships:** re-pick frame 1 by content on the shipped file (the opening frame, before the figure flips the plate; its hook caption may already be up, which holds no result) and re-export both JPGs with `--covers`.",
]

TRIAL_REELS = {
    "recommendation": "Post as a regular Reel, not a Trial.",
    "why": "@envelopemath has 8 followers, so a regular Reel is already shown almost entirely to non-followers, which is all a Trial Reel adds. A Trial would also keep it off the profile grid until shared.",
    "use_trial_for": f"A hook test afterwards, if you want one: the other cut as a Trial with MANUAL graduation 48-72 h later. Once the condensed cut replaces this render in renders/channel, get the pre-condense one from git with `git show {RENDER_COMMIT}:renders/channel/{BASE}.mp4 > 01c-27.8s.mp4` (sha256 8d9f9761…). Compare skip rate (October Reels ran 27.0-65.1%; 06c's condensed cut 40.3%) and average watched %, then share the winner. vidIQ's publish tool exposes Trial (MANUAL or SS_PERFORMANCE) for this connected account. Confirm eligibility in the app.",
}
IG_AUDIO = "Rename the original audio to 'A 3% raise vs the tax bracket — The Back of the Envelope' if the app allows; it is the score, with no voice."
IG_POSTING_WINDOW = {
    "when": "Same evening as YouTube, about 15 min after the Short: 21:45-22:45 ET, Tue 13 Oct 2026 at the earliest (Wed 14 Oct in the suggested order), on a different evening from 01a and 01b.",
    "why": "October Reels, median plays by posting slot (owner insights, 2026-10-13): weekday 22:00-00:30 ET 5,449 (n = 3, including the two best: 7,302 and 5,449), weekday midday 1,212 (n = 2), Sunday 05:00-08:00 ET 1,087 (n = 2). 06c, posted Mon 03:46 ET, has 1,711 plays with a 40.3% skip rate. Skip rate tracks plays more closely than the hour does: 27.0-27.4% for the top two, 56.9-65.1% for the bottom two. The condense matters more than the hour.",
}

# ---------------------------------------------------------------- research
KEYWORDS = [  # keyword, est. monthly YouTube searches, volume score, competition, overall, note, vidIQ snapshot date
    ("taxes", 82933, 73.4, 52.5, 63.1, "+11.0% vs its 30-day baseline (74,718)", "2026-10-12"),
    ("pay raise", 9533, 59.4, 50.7, 55.4, "+76.6% vs its baseline (5,399): the fastest-rising phrase here", "2026-10-12"),
    ("2026 tax brackets", 8249, 58.5, 41.7, 58.4, "", "2026-10-12"),
    ("tax bracket", 5134, 55.4, 28.2, 62.0, "seed", "2026-09-19"),
    ("income tax bracket explained", 4922, 55.1, 35.7, 58.8, "", "2026-05-17"),
    ("why your paycheck is smaller after a raise tax bracket myth", 4801, 55.0, 18.5, 65.6, "the same myth, as a question", "2026-08-26"),
    ("higher tax bracket", 4543, 54.6, 15.3, 66.6, "competition 15.3, the lowest here", "2026-09-05"),
    ("does a raise put you in a higher tax bracket", 4364, 54.3, 30.8, 60.3, "the title's question, but for '3%'", "2026-10-12"),
    ("tax bracket myth", 3992, 53.8, 21.0, 63.9, "", "2026-09-19"),
    ("tax brackets", 3655, 53.2, 42.5, 54.9, "", "2026-09-04"),
    ("will bonus push me into higher tax bracket", 3429, 52.8, 21.2, 63.2, "a bonus, not a raise: not in the tags", "2026-10-12"),
    ("marginal tax rate", 0, 0, 26.9, 29.2, "<750/month: the textbook name for what the video shows", None),
]
KEYWORD_MD_NOTE = {"will bonus push me into higher tax bracket": "a bonus, not a raise: not in the tags"}
KEYWORDS_SOURCE = ("vidIQ keyword research (research, matching_terms and questions modes), pulled 2026-10-13. vidIQ refreshes each keyword "
                   "on its own schedule, so each row carries its snapshot date in metrics_as_of; six rows are older snapshots (2026-05-17 to 2026-09-19).")
KW_HEADING_MD = ("**1. Search demand (vidIQ keyword research, pulled 2026-10-13).** "
                 "vidIQ refreshes each keyword on its own schedule, so the last column gives each row's snapshot date. Six rows are older snapshots.")
KW_OUTRO = ("The myth is searched as a question: 'does a raise put you in a higher tax bracket' (4,364), 'why your paycheck is smaller after a raise' (4,801) and 'tax bracket myth' (3,992), "
            "all at low competition (18.5-30.8). The pick asks the first one, word for word but for the 3%. 'Higher tax bracket' (4,543) has the lowest competition here (15.3). "
            "'Pay raise' (9,533) is rising fastest (+76.6%), and '2026 tax brackets' (8,249) is the dated search the copy's year answers. "
            "'Marginal tax rate' is under 750: viewers say 'bracket', so the copy does too.")

YT_SAME_IDEA = [  # title, channel, subs, views, date[, note]
    ("STOP Panicking About Higher Tax Brackets! 🛑", "Stuff Deconstructed", 5670, 5730, "2026-01-09", "2:12; outlier score 440.8"),
    ("How Tax Brackets Actually Work — Explained Simply", "Gordon Tax", 560, 3612, "2025-12-01"),
    ("The Tax Bracket Mistake That's Costing You Money!", "Mike's Financial Edge", 35400, 3410, "2025-05-07", "22 comments"),
    ("This Tax Myth Is Costing You Money", "Figure Finance", 348, 2303, "2026-07-16", "a stickman animation, like this Becker Rig look; outlier score 92.1"),
    ("The tax bracket myth that's costing people raises and bonuses", "Afford Anything Podcast", 66600, 1812, "2026-08-14"),
    ("Should You Turn Down a Raise or Bonus if it puts You in a Higher Tax Bracket? #tax #shorts", "Trey Taurman CPA", 984, 1372, "2022-09-30"),
    ("The Tax Bracket Lie That Costs You Money 💸 #shorts #viral #trending #explorerpage #reels #fyp", "OutOfContext", 18, 1275, "2026-10-01"),
    ("Can a Raise Make You Take Home Less Money?", "Numbers Behind the News", 16, 1135, "2026-10-02",
     "the closest twin: 2026 single brackets, a $2,000 raise on $66,000; its title asks, its answer is 'no'"),
    ("Why You Should NEVER Turn Down a Raise", "Policy Pulse", 0, 1099, "2026-09-04"),
    ("A Raise Will Never Lower Your Paycheck (Tax Bracket Myth)", "Zackery Atlas", 130, 534, "2026-10-07"),
    ("\"A Raise Puts Me in a Higher Tax Bracket\" — No, It Doesn't. #taxes #personalfinance  #payrise", "Hustle Lab", 52, 282, "2026-09-15"),
    ("Will a Raise Put You in a Higher Tax Bracket? (The Real Math)", "Paycheck Math", 1, 62, "2026-08-08", "near-twin of the write-up's title"),
]
SAME_IDEA_HEADING = "**2. The myth is crowded on YouTube, and nearly every title answers 'no' (vidIQ YouTube search, under 4 min, by views and by relevance).**"
SAME_IDEA_MD = [
    "Twelve same-idea Shorts and short videos, eight of them since July 2026, all under 5,800 views. Almost every title gives its answer away ('No, It Doesn't', 'A Raise Will Never Lower Your Paycheck', "
    "'Why You Should NEVER Turn Down a Raise'). One, Figure Finance's stickman animation, is the same kind of look as this Becker Rig cut.",
    "",
    "This video's honest answer differs: for $65,000 and a 3% raise the answer is 'yes, and it costs $45 a year', worked on the 2026 brackets. "
    "So the pick asks the searched question and keeps both the 'yes' and the $45 for the video.",
]
SAME_IDEA_NOTE = ("vidIQ YouTube search (under 4 min; by views and by relevance): 12 same-idea videos, 8 since July 2026, all under 5,800 views; nearly every title answers 'no' "
                  "(the myth is false). None lands this video's 'yes, it costs $45 a year'. Numbers Behind the News (2 Oct 2026) is the closest twin, on a $2,000 raise from $66,000.")

OUTLIERS = [
    {"handle": "@kaciebarrett", "platform": "Instagram", "id": "DcT4c17TgHj",
     "on_screen": "I JUST GOT A PROMOTION AT WORK",
     "views": "326.4K (34.3x the account median of 9.5K)",
     "note": "the myth itself: a promotion blamed for lower take-home pay because of the bracket; the comments this Short answers"},
    {"handle": "@moneywithpete", "platform": "TikTok", "id": "7668809628330855702",
     "on_screen": "THE HIDDEN UK SALARY TRAP!",
     "views": "372.2K (108.5x the account median of 3.4K)",
     "note": "UK thresholds where a raise can cut net pay; a drawn whiteboard animation, faceless like this one"},
    {"handle": "@mastermoneyco", "platform": "TikTok", "id": "7680913784143105310",
     "on_screen": "4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make",
     "views": "3M (140.0x the account median of 21.4K); the Instagram mirror 1.8M (28.4x)",
     "note": "the format's model (the write-up's H84), with a presenter"},
]
OUTLIERS_HEADING = "**3. The raise-and-tax worry travels on Instagram and TikTok (vidIQ IG/TikTok outlier search, since June 2024, at least 5K views).**"
OUTLIERS_MD = [
    "- **@kaciebarrett** (Instagram), \"I JUST GOT A PROMOTION AT WORK\": 326.4K (34.3x). The myth itself: a promotion blamed for lower take-home pay.",
    "- **@moneywithpete** (TikTok), \"THE HIDDEN UK SALARY TRAP!\": 372.2K (108.5x). A drawn, faceless whiteboard animation about UK thresholds.",
    "- **@mastermoneyco** (TikTok), \"4 DEAD SIMPLE NUMBERS That Tell You What You Actually Make\": 3M (140.0x). The format's model, with a presenter.",
    "- The worry ('will my raise cost me?') draws views as a story or a trap; the numbered, worked answer is this Short's angle. "
    "The concept search found no US Reel or TikTok that works a real raise across a 2026 bracket line at 5K views or more.",
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
    "06b went live on both on Mon 12 Oct at about 12:14 ET (YouTube `krfZEHhb0xU`, Instagram `DeZov75oo9o`), with the house 3-hashtag title (its sheet's option 3): "
    "61 views and 7 plays the next morning, too young to compare. 06c, a day older, has 760 views and 1,711 plays (40.3% skip).",
    "",
    "The channel's best Reel ('Pay the Minimum on $5,000? 238 Months.', 7,302 plays) is, like this one, a question a viewer already worries about, answered with one exact number.",
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
    "The 2026 brackets and standard deduction are the write-up's figures (IRS, Tax Foundation, CPA Practice Advisor). The 2027 figures were not looked up here; when the IRS publishes them, the copy stays true because it names 2026 wherever it names $50,400 or $16,100.",
    "The video, the cover and the video facts are the pre-condense cut; the copy is cut-independent, and the ship step refreshes the rest from the final file.",
]
RESEARCH_EXTRA = {
    "titles_scored": "10 titles scored with vidiq_score_title (short-form, channel UC8BJj7Y74vhhG0iI5FLVN5g) on 2026-10-13; all are in youtube.titles_ranked and youtube.titles_also_scored.",
    "vidiq_credits": "115 credits for this teaser (10 keyword queries, 2 YouTube searches, 1 Instagram/TikTok outlier search, 10 title scores, the last of each a re-query; 5 each), plus 10 shared across 01a-01c for the channel's own stats; "
                     "15 more at the adversarial check (2 title scores, one of them option 3 with the hashtags in the description's order, and 1 keyword query).",
}
# the description's multi-byte characters, the minus sign (U+2212) included: the builder's house list has the en dash but not the minus
DESC_MULTIBYTE = ", ".join(f"`{c}`" for c in "≈×•—–−÷→…" if c in YT_DESCRIPTION)

# ---------------------------------------------------------------- the check log
CHECKED_BY = "adversarial check of this sheet"
CHECKED_MATH = (f"python3 teasers/v2/checks/01-dead-simple-list.py: {MATH_RUN} on studio/specs/ (the pre-condense specs; 397 at the first build, before the condense's "
                f"check-script update), re-run at the adversarial check 2026-10-13; with --spec on the three studio/specs-wip/ condensed specs {MATH_RUN_WIP}, so the copy's figures hold on both cuts; "
                "every public figure traced to the 01c maths table and recomputed in MATH_RELATIONS, the full 2026 federal tax before and after the raise included; "
                "COPY_RULES keep $50,400 and $16,100 beside 2026, $45 beside 'a year', and 'single filer' and 'federal income tax only' in the copy")
VIDIQ_REQUERIED = ("pulled 2026-10-13: does a raise put you in a higher tax bracket 4,364 / 30.8; higher tax bracket 4,543 / 15.3; tax bracket 5,134; 2026 tax brackets 8,249; "
                   "pay raise 9,533 (+76.6%); title scores 94 (pick), 85 (write-up title and hashtag form); channel 53 subs / 10,221 views / 41 videos; "
                   "Instagram 8 followers, 20,518 views in 30 days. Re-queried the same day after the build: the pick's title score 94 and 'does a raise put you in a higher tax bracket' 4,364 / 30.8. "
                   "Re-queried at the adversarial check: the pick's title score 94; 'higher tax bracket' 4,543 / 15.3 (snapshot 2026-09-05); option 3 with its hashtags in the description's order 85, the same as before. All match.")
CHECK_LOG_TITLE = "adversarial pass, 2026-10-13"
CHECK_LOG = [
    f"- **Maths.** `python3 teasers/v2/checks/01-dead-simple-list.py`: {MATH_RUN} on `studio/specs/` and {MATH_RUN_WIP} with `--spec` on the three condensed WIP specs. "
    "Every public figure traces to the 01c maths table: $65,000 × 1.03 = $66,950 (+$1,950); "
    "$50,400 + $16,100 = $66,500; $66,950 − $66,500 = $450; $450 × 10% = $45; full 2026 tax $5,620 → $5,899, $279 on the raise vs $234 all at 12%; "
    "the rule's window $64,564 to $66,499; pinned 10% × $50,850 = $5,085, FICA $149.18, kept ≈ $1,522. The data file recomputes each one.",
    "{LIMITS}",
    "- **vidIQ.** Keywords pulled 2026-10-13 (table above). 10 titles scored against this channel: the pick 94, the write-up's title 85. "
    "Channel 53 subscribers / 10,221 views / 41 videos; Instagram owner insights refreshed (8 followers, 20,518 views in 30 days).",
    "- **vidIQ re-queried.** After the build: the pick's title score 94; 'does a raise put you in a higher tax bracket' 4,364 / 30.8. "
    "At the adversarial check: the pick's title score 94; 'higher tax bracket' 4,543 / 15.3 (snapshot 2026-09-05). All match.",
    "- **Changed.**",
    "  - The long alt text said he 'wags no, no' after the slam. The condensed WIP spec drops the wag (he points at the $450, then at the $45), so the alt text now names only what both cuts show: "
    "he points at the $450 and at the $45, and shrugs.",
    "  - The cover note said 'on any cut, use the last frame before the first caption word appears'. The condensed WIP spec starts its hook caption before frame 1, "
    "so that cut has no caption-free frame and the rule would point at nothing. The cover is now 'the opening frame, before the figure flips the plate', and the note says the hook caption "
    "('$65,000, plus 3%:') holds no result.",
    "  - The short alt text said 'a 3% raise puts $65,000 into the 22% bracket by $450': it is the raised pay, not $65,000, that crosses. It now reads 'a 3% raise on $65,000 crosses the 22% line by $450 (2026)' (90 characters), with the year the line belongs to.",
    "  - The Instagram first comment names the standard deduction beside the single filer: the $66,500 line depends on both.",
    "  - Title option 3 had its hashtags in another order than the description's (#taxes #taxbracket #raise). It now uses the description's order (#taxbracket #raise #taxes), re-scored: 85, the same.",
    "  - Posting window: all three 01 sheets said 'Tue 13 Oct at the earliest' but ask for three different evenings in the order 01b, 01c, 01a, so this one now names Wed 14 Oct for that order.",
    "  - The no-result patterns now also catch 'whole' ('Not your whole raise' is the video's payoff line). Broken copies with that title, a 'Yes' before the fold, $45 without 'a year' and a $46 each fail by name.",
    "  - The math run said 397 checks: the condense updated the check script since, and it now runs 400 on `studio/specs/` (392 on the WIP specs), 0 failed. "
    "The description note now lists the minus sign (−, 3 bytes) among its multi-byte characters (`DESC_MULTIBYTE`).",
    "- **Checked.**",
    "  - The cover, frame 1, carries no result (both JPGs read by eye): on the render frame 0 is the only caption-free frame (the first caption word fades in at frame 1, the plate flip starts at frame 4, measured).",
    "  - Brands: the IRS is a government agency, and the Tax Foundation and CPA Practice Advisor are named only as sources, as 06b and 06c name their sources with no affiliation line; no company is the copy's subject.",
    "  - 'Not financial advice.' is in the description and the caption; the '(new pay − $66,500) × 10%' rule and the 401(k)/HSA line are the write-up's calculation and footer, not advice.",
    "  - The pre-condense render in git (`471c793`) has the same sha256 as `renders/channel` today, so the Trial Reels `git show` command fetches this file.",
    "- **Kept on purpose.**",
    "  - The cover is frame 1 (no result), as the write-up asks.",
    "  - The title keeps '3%' and '$65,000': the honest 'yes' holds only for a raise that crosses the line, and option 2 (no 3%) scores the same.",
    "  - 'What It Really Costs' promises a cost without naming it, and hints no more than frame 1 does: it is the last ledge's own label ('What the bracket costs you'), on screen from frame 1. The video pays it off with the $45.",
    "  - The write-up's caption opens with the verdict ('Higher bracket? Yes. It costs $45'); the house rule moves it below 'more'.",
    "- **Still to do.** The ship rebuild (`--covers`) on the condensed file.",
]

# ---------------------------------------------------------------- the numbers check
# Every figure the copy may show, each traced to the 01c maths table (teasers/v2/01-dead-simple-list.md, section (b) 01c)
# and recomputed below from the 2026 single bracket table and standard deduction (the write-up's sourced inputs).
FIGURES = {
    "3", "4", "$65,000", "1.03", "$66,950", "$1,950", "22", "12", "10", "$50,400", "$16,100", "$66,500", "$450", "$45",
    "$5,620", "$5,899", "$279", "$234", "$64,564", "$66,499", "$50,850", "$5,085", "$149.18", "$1,522", "401", "2026",
}
from decimal import Decimal as _D, ROUND_HALF_UP as _UP
_SD, _B10, _B12, _B22 = 16100, 12400, 50400, 105700


def _tax(pay):
    """2026 federal income tax, single filer, standard deduction, wages only (the write-up's cross-check)"""
    t = pay - _SD
    return 0.10 * min(t, _B10) + 0.12 * max(0, min(t, _B12) - _B10) + 0.22 * max(0, min(t, _B22) - _B12)


_new = round(65000 * 1.03)
MATH_RELATIONS = [
    (_new == 66950 and _new - 65000 == 1950, "$65,000 × 1.03 = $66,950 (+$1,950)"),
    (_B12 + _SD == 66500, "22% starts at $50,400 + $16,100 = $66,500 of pay"),
    (_new - 66500 == 450, "$66,950 − $66,500 = $450 over the line"),
    (22 - 12 == 10 and round(450 * 0.10) == 45, "$450 × 10% (22% − 12%) = $45"),
    (round(_tax(65000), 2) == 5620.00 and round(_tax(_new), 2) == 5899.00, "full 2026 federal tax: $5,620 before, $5,899 after"),
    (round(_tax(_new) - _tax(65000)) == 279 and round(1950 * 0.12) == 234 and 279 - 234 == 45, "$279 on the raise vs $234 all at 12%: $45 more"),
    (all(abs((_tax(round(s * 1.03)) - _tax(s)) - (0.12 * (round(s * 1.03) - s) + 0.10 * (round(s * 1.03) - 66500))) < 0.005
         for s in range(64564, 66500, 25)), "(new pay − $66,500) × 10% is the bracket cost for salaries $64,564 to $66,499"),
    (64563 * 1.03 < 66500 <= 64564 * 1.03, "a 3% raise first reaches the line at $64,564"),
    (_new - _SD == 50850 and round(0.10 * 50850) == 5085, "the myth: 10% × $50,850 = $5,085"),
    ((_D(1950) * _D("0.0765")).quantize(_D("0.01"), _UP) == _D("149.18"), "FICA on the raise: 7.65% × $1,950 = $149.18"),
    (round(1950 - 279 - 149.18) == 1522, "kept: $1,950 − $279 − $149.18 ≈ $1,522"),
]
MATH_SCRIPT = "teasers/v2/checks/01-dead-simple-list.py"
MATH_KEY_LINES = ["items[0] '$65,000 × 1.03' = 66,950.0000", "items[1] '$50,400 + $16,100' = 66,500.0000",
                  "items[2] '$66,950 − $66,500' = 450.0000", "items[3] '$450 × 10%' = 45.0000",
                  "raise's tax − the same raise all at 12% = the $45"]
RESULT_RE_TITLE = r"(?i)\$45\b|\b45\b|450|66,500|66,950|1,950|\byes\b|10 points|5,085|279|1,522|22%|whole"
RESULT_RE_CAPTION = r"(?i)\$4|\b45\b|\$66|\$1,[59]|\byes\b|10 points|\$5,|\$27|\$64|\$50|\$16|\$23|\$14|whole"   # prefixes, so a figure cut by the fold still fails

# The copy's own rules (COPY_RULES): FIGURES says a figure is a maths figure, not that it sits in the right place.
import re as _re
_COPY = {"title": YT_TITLE, "description": YT_DESCRIPTION, "pinned comment": YT_PINNED, "caption": IG_CAPTION,
         "first comment": IG_FIRST_COMMENT, "short alt text": IG_ALT_SHORT, "long alt text": IG_ALT_LONG}
_lines = lambda skip=(): [ln for k, v in _COPY.items() if k not in skip for ln in v.split("\n")]


def _with(fig, needs, skip=()):
    """every line that names fig also names one of needs"""
    return all(any(n in ln for n in needs) for ln in _lines(skip) if _re.search(fig, ln))


_NUMBER_WORDS = _re.compile(r"\b(?:zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|"
                            r"sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|"
                            r"thousand|million|billion|dozen|half|halve[sd]?|double[sd]?|triple[sd]?|quadruple[sd]?|twice)\b", _re.I)
COPY_RULES = [
    (_with(r"\$50,400|\$16,100", ("2026",)), "$50,400 and $16,100 always come with 2026 (the 2026 bracket and deduction)"),
    (_with(r"\$45\b", ("a year",)), "$45 always comes with 'a year'"),
    (all("single" in _COPY[k].lower() for k in ("description", "pinned comment", "caption", "first comment")),
     "the single-filer condition is in the description, both comments and the caption"),
    (all("federal income tax" in _COPY[k] for k in ("description", "pinned comment", "caption", "first comment")),
     "'federal income tax' is in the description, both comments and the caption"),
    ("3%" in YT_TITLE and "$65,000" in YT_TITLE, "the title keeps the 3% raise and the $65,000 the 'yes' depends on"),
    ({w.lower() for v in _COPY.values() for w in _NUMBER_WORDS.findall(v)} == set(),
     "no spelled-out figures (the figure check can't see them)"),
]
