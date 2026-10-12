# Publishing data files

One file per teaser, `publishing/data/<id>.py`, where `<id>` is the spec's file stem (`studio/specs/<id>.json`). `publishing/tools/build_publishing.py <id>` turns it into the copy-paste sheet `publishing/<id>.md` and its JSON twin `publishing/<id>.json`. With `--covers` it also exports both cover JPGs from `renders/channel/<id>.mp4`.

The builder holds the house template: section order, both platforms' rules and settings, the JSON schema and every count. The data file holds the copy, the research and the teaser's own notes. Start a new teaser by copying the nearest sheet's data file, for example `06b-scoreboard-netflix-bill.py` for a pov-race teaser.

```
python3 publishing/tools/build_publishing.py <id> --covers   # first build: sheet + covers, then the numbers check
python3 publishing/tools/build_publishing.py <id> --check    # files on disk = generator output, plus the numbers check
python3 publishing/tools/build_publishing.py <id> --out DIR  # build somewhere else (to diff, or to test a change)
```

## What the data file gets

The file is Python, run in a namespace that already holds:

| Name | What it is |
|---|---|
| `BASE` | the teaser id |
| `VIDEO_S`, `VIDEO_SHA` | the current render's duration (ffprobe, 3 dp) and sha256 |
| `BODY_S`, `CARD_S` | the spec's `duration`, and the end card (`VIDEO_S − BODY_S`) |
| `tag_chars(tags)` | YouTube's tag count (commas count; a tag with a space counts 2 more) |
| `ROOT`, `VIDEO`, `SPEC` | paths |

So its strings can be f-strings over the render's facts. The builder computes every length, byte count and `chars` field itself.

## What it must define

- **Sheet:** `TEASER`, `PREPARED`, `SHORT_ID` (for example "06b"), `MD_TITLE`, `MD_INTRO` (the intro bullets, as .md lines).
- **Video:** `FOR_VIDEO_NOTE`, `CUT` (dict), `FACTS` (dict).
- **YouTube:**
  - Title: `YT_TITLE`; `YT_TITLES` (dicts with `rank`, `title`, `vidiq_score`, `note`); `YT_TITLES_ALSO_SCORED` (tuples of title, score, note); `TITLE_BULLETS`.
  - Description: `YT_DESCRIPTION`, `DESC_NOTE`.
  - Hashtags: `YT_HASHTAGS`; `YT_HASHTAG_NOTES` (tuples of hashtag, why); `YT_HASHTAG_PLACEMENT`.
  - Tags and comment: `YT_TAGS`, `TAGS_NOTE`, `YT_PINNED`, `PINNED_NOTE`.
  - Related video and posting: `RELATED_VIDEO` (`pick` and `swap_when_live`), `THUMBNAIL_FRAME` (JSON), `THUMB_MD` (.md), `YT_POSTING_WINDOW` (`when`, `spacing`, `why`).
- **Instagram:**
  - Caption: `IG_CAPTION`, `IG_CAPTION_RULE`, `IG_CAPTION_BULLETS`.
  - Hashtags: `IG_HASHTAGS`, `IG_HASHTAG_MD` (.md lines).
  - Alt text: `IG_ALT_SHORT`, `IG_ALT_SHORT_NOTE`, `IG_ALT_RULE`, `IG_ALT_LONG`.
  - Comment, Trial Reels and posting: `IG_FIRST_COMMENT`, `TRIAL_REELS` (`recommendation`, `why`, `use_trial_for`), `IG_AUDIO`, `IG_POSTING_WINDOW` (`when`, `why`).
- **Cover:** `COVER_T`, `COVER_FRAME`, `COVER_CROP` (an ffmpeg crop), `COVER_RENDER_WORD` ("shipped", "pre-condense" and so on), `COVER_FRAME_BY_CONTENT`, `COVER_FRAME_MEASURED`, `COVER_CROP_NOTE`, `COVER_HOW_TO_SET`.
- **Research:**
  - Keywords: `KEYWORDS` (tuples of keyword, monthly searches, volume, competition, overall, note, snapshot date or None), `KEYWORDS_SOURCE`, `KW_HEADING_MD`, `KW_OUTRO`.
  - Same-idea Shorts: `YT_SAME_IDEA` (tuples of title, channel, subs, views, date, optional note), `SAME_IDEA_HEADING`, `SAME_IDEA_MD`, `SAME_IDEA_NOTE`.
  - Instagram and TikTok outliers: `OUTLIERS` (dicts), `OUTLIERS_HEADING`, `OUTLIERS_MD`.
  - Own channel: `OWN_YT` (tuples of id, title, posted ET, views), `OWN_IG` (tuples of shortcode, topic, posted ET, plays, skip %, watched %), `OWN_HEADING`, `OWN_MD`, `CHANNEL_STATS`.
  - `LIMITS`.
- **Check log:**
  - `CHECK_LOG_TITLE`.
  - `CHECK_LOG`: .md lines. The line `"{LIMITS}"` becomes the computed limits line.
  - `CHECKED_BY`, `CHECKED_MATH`, `VIDIQ_REQUERIED`.
- **Numbers check:**
  - `FIGURES`: every figure the copy may show.
  - `MATH_RELATIONS`: a list of (bool, label) pairs. The file recomputes the maths here.
  - `MATH_SCRIPT`: the teaser's maths check, which the builder runs.
  - `MATH_KEY_LINES`: strings its output must contain.
  - `RESULT_RE_TITLE`, `RESULT_RE_CAPTION`: the result tokens that must not appear in the title or in the caption's first 125 characters.

## Optional names

Each has a house default in the builder's `OPTIONAL`:

| Name | Default |
|---|---|
| `TITLE_LIMIT_NOTE` | "" |
| `DESC_MULTIBYTE` | lists the description's multi-byte characters |
| `KEYWORD_MD_NOTE` | {} |
| `COVER_EXTRA_BULLETS` | [] |
| `FOR_VIDEO_EXTRA` | {} |
| `RESEARCH_EXTRA` | {} |
| `MATH_ARGS` | [] |
| `COPY_RULES` | [] |
| `BUILD_CMD` | `python3 publishing/tools/build_publishing.py <id>` |
| `CHECKED_DATE` | `PREPARED` |
| `GOOGLE_INDEXING` | the house line |

## What the numbers check asserts

- **Platform limits:**
  - YouTube: title ≤ 100; description ≤ 5,000 characters and bytes; no `<` or `>`; tags ≤ 500 as YouTube counts them; ≤ 60 hashtags.
  - YouTube hashtags: the description's first hashtags are `YT_HASHTAGS`, and the title has none of them or all of them.
  - Instagram: caption ≤ 2,200; ≤ 5 hashtags, and the caption's hashtags are `IG_HASHTAGS`; short alt text ≤ 100.
- **No result:** none in the title or in the caption's first 125 characters.
- **Counts:** every stated count matches its string.
- **Paste blocks:** each paste block in the .md is its JSON string, character for character.
- **Figures:** every figure in the copy is in `FIGURES`.
- **Copy rules:** each (bool, label) in `COPY_RULES` holds. `FIGURES` only says a figure is a maths figure; these say it sits in the right place. For example, a year's figure stays beside its year, a rounded figure keeps its 'about', and a figure isn't spelled out where the figure check can't see it. `06b-scoreboard-netflix-bill.py` has a set to copy.
- **Maths:** `MATH_RELATIONS` hold, and `MATH_SCRIPT` passes with `MATH_KEY_LINES` in its output.
- **Files:** the render's sha256 matches `for_video`, and both covers have the right size.

## Proof of the move

`06c-becker-rig-latte-starbucks.py` holds the strings of the original `build_06c_publishing.py` unchanged. The builder reproduces the shipped 06c sheet byte for byte from it: the .md, the .json and both cover JPGs. `build_06c_publishing.py` is now a shim that calls the builder, so the commands in the 06c sheet and the write-up still work.
