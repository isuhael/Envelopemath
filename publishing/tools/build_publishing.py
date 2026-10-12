#!/usr/bin/env python3
"""Builds one teaser's publishing sheet, publishing/<id>.{md,json}, from its data file, publishing/data/<id>.py.

The house template (section order, platform rules, settings, the JSON schema, every count) lives here; the copy, the
research and the teaser's own notes live in the data file. The copy-paste sheet and the machine-readable twin are made
from one set of strings, so they can never drift apart.

    python3 publishing/tools/build_publishing.py <id>              # writes the .md and .json, then checks them
    python3 publishing/tools/build_publishing.py <id> --covers     # also re-exports both cover JPGs from the current MP4
    python3 publishing/tools/build_publishing.py <id> --check      # checks the files on disk, writes nothing
    python3 publishing/tools/build_publishing.py <id> --out DIR    # writes (or, with --check, reads) DIR instead of publishing/

<id> is the teaser id (the spec's file stem, e.g. 06b-scoreboard-netflix-bill) or a path to its data file.

The check (the sheet's numbers check) asserts the platform limits, that every paste block in the .md equals its JSON
string, that the title and the first 125 characters of the Instagram caption carry no result, that every figure in the
copy is one of the teaser's maths figures (FIGURES, from its write-up and maths check, which it runs), and that the
render's sha256 and the covers' sizes match. It exits 1 on any failure.

A data file is Python run in a namespace that already holds BASE, VIDEO_S, VIDEO_SHA, BODY_S, CARD_S, tag_chars and
the paths, so its strings can be f-strings over the render's facts. publishing/data/README.md lists the names it must
define and the optional ones (each optional name has a house default below).
"""
import hashlib, json, os, re, subprocess, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
PUB = os.path.join(ROOT, "publishing")
DATA = os.path.join(PUB, "data")

# ---------------------------------------------------------------- house constants (both platforms' rules)
HASHTAG_RULES = ("Title hashtags show as links in the title; with none in the title, the first 3 description hashtags "
                 "show above it. Over 60 hashtags and YouTube ignores all of them. #Shorts is not needed (vertical, under 3 min).")
YT_SETTINGS = {"category": "Education", "audience": "Not made for kids",
               "altered_or_synthetic_content": "No (animated chart, not realistic footage)",
               "remixing": "Allow", "captions": "None needed (no narration; all text is on screen)"}
YT_SETTINGS_MD = ("- **Settings:** Category Education. Not made for kids. Altered or synthetic content: No (it's an animated "
                  "chart, not realistic footage). Remixing allowed. No captions needed: there's no narration and all the text is on screen.")
END_SCREEN = "Shorts have no end screens or cards. The Related video link is the Shorts equivalent."
IG_HASHTAG_RULE = "Instagram caps a post at 5 hashtags (since Dec 2025)."
ALT_TEXT_WHERE = "Advanced settings → Accessibility → Alt text, if your app shows it for Reels."
FIRST_COMMENT_ACTION = "Post it right after publishing and pin it."
GOOGLE_INDEXING = ("Public professional-account posts can appear in Google/Bing since 10 Jul 2025, so the caption is "
                   "written as a searchable question.")
PLATFORM_RULES_MD = [
    "- **YouTube title:** 100 characters. The Shorts player shows only the opening, so the keywords come first.",
    "- **YouTube description:** 5,000 characters.",
    "- **YouTube hashtags:** the first 3 show; over 60 and all are ignored; `#Shorts` isn't needed.",
    "- **YouTube tags:** 500 characters, low weight.",
    "- **YouTube Shorts:** no end screens. The Related video link is the Shorts equivalent.",
    "- **YouTube AI disclosure:** only for realistic altered content.",
    "- **Instagram caption:** 2,200 characters, about 125 shown before 'more'.",
    "- **Instagram hashtags:** 5 at most.",
    "- **Instagram search and Google:** keywords in the caption feed Instagram search, and Google indexes public professional posts (since 10 Jul 2025).",
    "- **Instagram grid:** a 3:4 crop of the 9:16 cover.",
    "- **Trial Reels:** shown to non-followers only.",
]
COVER_SIZES = {"3x4": "1080,1440", "9x16": "1080,1920"}
# multi-byte characters the description note names, in the house order (the note lists those the description uses)
MULTIBYTE_ORDER = "≈×•—–÷→…"

REQUIRED = ["TEASER", "PREPARED", "SHORT_ID", "MD_TITLE", "MD_INTRO", "FOR_VIDEO_NOTE", "CUT", "FACTS",
            "YT_TITLES", "YT_TITLE", "YT_TITLES_ALSO_SCORED", "TITLE_BULLETS", "YT_DESCRIPTION", "DESC_NOTE",
            "YT_HASHTAGS", "YT_HASHTAG_NOTES", "YT_HASHTAG_PLACEMENT", "YT_TAGS", "TAGS_NOTE", "YT_PINNED", "PINNED_NOTE",
            "RELATED_VIDEO", "THUMBNAIL_FRAME", "THUMB_MD", "YT_POSTING_WINDOW",
            "IG_CAPTION", "IG_CAPTION_RULE", "IG_CAPTION_BULLETS", "IG_HASHTAGS", "IG_HASHTAG_MD",
            "IG_ALT_SHORT", "IG_ALT_SHORT_NOTE", "IG_ALT_RULE", "IG_ALT_LONG",
            "COVER_T", "COVER_FRAME", "COVER_CROP", "COVER_RENDER_WORD", "COVER_FRAME_BY_CONTENT", "COVER_FRAME_MEASURED",
            "COVER_CROP_NOTE", "COVER_HOW_TO_SET", "IG_FIRST_COMMENT", "TRIAL_REELS", "IG_AUDIO", "IG_POSTING_WINDOW",
            "KEYWORDS", "KW_HEADING_MD", "KW_OUTRO", "KEYWORDS_SOURCE", "YT_SAME_IDEA", "SAME_IDEA_HEADING", "SAME_IDEA_MD",
            "SAME_IDEA_NOTE", "OUTLIERS", "OUTLIERS_HEADING", "OUTLIERS_MD", "OWN_YT", "OWN_IG", "OWN_HEADING", "OWN_MD",
            "CHANNEL_STATS", "LIMITS", "CHECK_LOG_TITLE", "CHECK_LOG", "CHECKED_BY", "CHECKED_MATH", "VIDIQ_REQUERIED",
            "FIGURES", "MATH_RELATIONS", "MATH_SCRIPT", "MATH_KEY_LINES", "RESULT_RE_TITLE", "RESULT_RE_CAPTION"]
OPTIONAL = {  # name -> house default
    "TITLE_LIMIT_NOTE": "",          # appended to "- N of 100 characters."
    "DESC_MULTIBYTE": None,          # None: list the description's multi-byte characters in MULTIBYTE_ORDER
    "KEYWORD_MD_NOTE": {},           # keyword -> shorter note for the .md table
    "COVER_EXTRA_BULLETS": [],       # bullets after the cover's Re-export line
    "FOR_VIDEO_EXTRA": {},           # keys appended to for_video
    "RESEARCH_EXTRA": {},            # keys appended to research
    "MATH_ARGS": [],                 # arguments for MATH_SCRIPT
    "COPY_RULES": [],                # (bool, label) pairs over the copy strings: each figure in its own context
    "BUILD_CMD": None,               # None: python3 publishing/tools/build_publishing.py <id>
    "CHECKED_DATE": None,            # None: PREPARED
    "GOOGLE_INDEXING": GOOGLE_INDEXING,
}


def sha256_of(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def duration_of(path):
    out = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                         check=True, capture_output=True, text=True).stdout
    return round(float(out), 3)


def tag_chars(tags):
    """YouTube's count: commas count, and a tag with a space counts 2 more for the quotes it adds."""
    return sum(len(t) + (2 if " " in t else 0) for t in tags) + len(tags) - 1


class Data(dict):
    __getattr__ = dict.__getitem__


def load(arg):
    path = arg if arg.endswith(".py") else os.path.join(DATA, f"{arg}.py")
    path = os.path.abspath(path)
    base = os.path.splitext(os.path.basename(path))[0]
    video = os.path.join(ROOT, "renders", "channel", f"{base}.mp4")
    spec = os.path.join(ROOT, "studio", "specs", f"{base}.json")
    with open(spec, encoding="utf-8") as f:
        body_s = json.load(f)["duration"]          # the body; the brand's 2.5 s end card follows
    video_s = duration_of(video)
    ns = {"BASE": base, "ROOT": ROOT, "VIDEO": video, "SPEC": spec, "VIDEO_S": video_s, "VIDEO_SHA": sha256_of(video),
          "BODY_S": body_s, "CARD_S": round(video_s - body_s, 3), "tag_chars": tag_chars, "__file__": path}
    with open(path, encoding="utf-8") as f:
        exec(compile(f.read(), path, "exec"), ns)
    missing = [k for k in REQUIRED if k not in ns]
    if missing:
        sys.exit(f"{os.path.relpath(path, ROOT)}: missing {', '.join(missing)}")
    for k, v in OPTIONAL.items():
        ns.setdefault(k, v)
    if ns["BUILD_CMD"] is None:
        ns["BUILD_CMD"] = f"python3 publishing/tools/build_publishing.py {base}"
    if ns["CHECKED_DATE"] is None:
        ns["CHECKED_DATE"] = ns["PREPARED"]
    return Data(ns)


def cover_cmds(D):
    b, t = D.BASE, D.COVER_T
    return (f'ffmpeg -ss {t} -i renders/channel/{b}.mp4 -frames:v 1 -vf "{D.COVER_CROP}" -q:v 2 publishing/{b}-cover-3x4.jpg',
            f'ffmpeg -ss {t} -i renders/channel/{b}.mp4 -frames:v 1 -q:v 2 publishing/{b}-cover-9x16.jpg')


def build_meta(D):
    b = D.BASE
    yt_title, desc, tags = D.YT_TITLE, D.YT_DESCRIPTION, D.YT_TAGS
    cap = D.IG_CAPTION
    cmd3, cmd9 = cover_cmds(D)
    meta = {
        "id": b,
        "teaser": D.TEASER,
        "prepared": D.PREPARED,
        "for_video": {
            "current_render": f"renders/channel/{b}.mp4",
            "current_duration_s": D.VIDEO_S,
            "current_sha256": D.VIDEO_SHA,
            "note": D.FOR_VIDEO_NOTE,
            "cut": D.CUT,
            **D.FOR_VIDEO_EXTRA},
        "facts": D.FACTS,
        "youtube": {
            "titles_ranked": [{"rank": t["rank"], "title": t["title"], "vidiq_score": t["vidiq_score"],
                               "chars": len(t["title"]), "note": t["note"]} for t in D.YT_TITLES],
            "titles_also_scored": [{"title": t, "vidiq_score": s, "chars": len(t), "note": n} for t, s, n in D.YT_TITLES_ALSO_SCORED],
            "title_pick": yt_title,
            "title_pick_chars": len(yt_title),
            "description": desc,
            "description_chars": len(desc),
            "hashtags_in_order": D.YT_HASHTAGS,
            "hashtag_rules": HASHTAG_RULES,
            "tags": tags,
            "tags_chars_as_youtube_counts": tag_chars(tags),
            "pinned_comment": D.YT_PINNED,
            "related_video": {**D.RELATED_VIDEO, "end_screen": END_SCREEN},
            "thumbnail_frame": D.THUMBNAIL_FRAME,
            "settings": YT_SETTINGS,
            "posting_window": D.YT_POSTING_WINDOW,
            "description_utf8_bytes": len(desc.encode("utf-8")),
        },
        "instagram": {
            "caption": cap,
            "caption_chars": len(cap),
            "caption_first_125": cap[:125],
            "caption_rule": D.IG_CAPTION_RULE,
            "hashtags_in_order": D.IG_HASHTAGS,
            "hashtag_rule": IG_HASHTAG_RULE,
            "alt_text_short": D.IG_ALT_SHORT,
            "alt_text_long": D.IG_ALT_LONG,
            "alt_text_where": ALT_TEXT_WHERE,
            "cover": {
                "files": {"3x4": f"publishing/{b}-cover-3x4.jpg", "9x16": f"publishing/{b}-cover-9x16.jpg"},
                "frame_in_current_render_s": D.COVER_T,
                "frame_index": D.COVER_FRAME,
                "frame_by_content": D.COVER_FRAME_BY_CONTENT,
                "frame_measured": D.COVER_FRAME_MEASURED,
                "crop": D.COVER_CROP_NOTE,
                "how_to_set": D.COVER_HOW_TO_SET,
                "re_export": cmd3,
                "re_export_9x16": cmd9,
            },
            "first_comment": D.IG_FIRST_COMMENT,
            "first_comment_action": FIRST_COMMENT_ACTION,
            "trial_reels": D.TRIAL_REELS,
            "settings": {"audio": D.IG_AUDIO, "share_to_feed": "On", "google_indexing": D.GOOGLE_INDEXING},
            "posting_window": D.IG_POSTING_WINDOW,
            "alt_text_rule": D.IG_ALT_RULE,
        },
        "research": {
            "keywords_youtube": [
                {"keyword": k, "est_monthly_searches": v, "volume": vol, "competition": c, "overall": o, "note": n, "metrics_as_of": asof}
                for k, v, vol, c, o, n, asof in D.KEYWORDS],
            "keywords_source": D.KEYWORDS_SOURCE,
            "same_idea_youtube_shorts": [
                {"title": x[0], "channel": x[1], "subscribers": x[2], "views": x[3], "published": x[4], **({"note": x[5]} if len(x) > 5 else {})}
                for x in D.YT_SAME_IDEA],
            "same_idea_note": D.SAME_IDEA_NOTE,
            "instagram_tiktok_outliers": D.OUTLIERS,
            "own_channel_youtube_october_shorts": [{"id": i, "title": t, "posted_et": p, "views": v} for i, t, p, v in D.OWN_YT],
            "own_channel_instagram_october_reels": [
                {"shortcode": s, "topic": t, "posted_et": p, "plays": pl, "skip_rate_pct": sk, "avg_watched_pct": aw}
                for s, t, p, pl, sk, aw in D.OWN_IG],
            "channel_stats": D.CHANNEL_STATS,
            "limits": D.LIMITS,
            **D.RESEARCH_EXTRA,
        },
    }
    meta["checked"] = {
        "date": D.CHECKED_DATE,
        "by": D.CHECKED_BY,
        "math": D.CHECKED_MATH,
        "limits": {
            "youtube_title_chars": len(yt_title),
            "youtube_description_chars": len(desc),
            "youtube_description_utf8_bytes": len(desc.encode("utf-8")),
            "youtube_tags_chars_as_youtube_counts": tag_chars(tags),
            "youtube_hashtags": len(D.YT_HASHTAGS),
            "instagram_caption_chars": len(cap),
            "instagram_hashtags": len(D.IG_HASHTAGS),
            "instagram_alt_text_short_chars": len(D.IG_ALT_SHORT),
        },
        "vidiq_requeried": D.VIDIQ_REQUERIED,
    }
    return meta


def multibyte_note(desc):
    return ", ".join(f"`{c}`" for c in MULTIBYTE_ORDER if c in desc)


def build_md(D, meta):
    b = D.BASE
    yt, ig, r = meta["youtube"], meta["instagram"], meta["research"]
    title, desc, tags, cap = D.YT_TITLE, D.YT_DESCRIPTION, D.YT_TAGS, D.IG_CAPTION
    cmd3, cmd9 = cover_cmds(D)
    L = []
    a = L.append
    a(f"# {D.MD_TITLE}")
    a("")
    a(f"YouTube Shorts (@envelopemath) and Instagram Reels (@envelopemath). Prepared {D.PREPARED}. "
      f"Machine-readable twin: `publishing/{b}.json`.")
    a("")
    L.extend(D.MD_INTRO)
    a("")
    a("---")
    a("")
    a("## YouTube Shorts")
    a("")
    a("### Title (vidIQ title score, short-form, scored against this channel)")
    a("")
    a("| # | Title | Score | Chars |")
    a("|---|---|---:|---:|")
    for t in yt["titles_ranked"]:
        a(f"| {t['rank']} | {t['title']} | {t['vidiq_score']} | {t['chars']} |")
    a("")
    a("**Pick (paste):**")
    a("")
    a("```")
    a(title)
    a("```")
    a("")
    a(f"- {len(title)} of 100 characters." + (f" {D.TITLE_LIMIT_NOTE}" if D.TITLE_LIMIT_NOTE else ""))
    for x in D.TITLE_BULLETS:
        a(f"- {x}")
    a("- Also scored, not used: " + "; ".join(f"\"{t}\" {s}" + (f" ({n})" if n else "") for t, s, n in D.YT_TITLES_ALSO_SCORED) + ".")
    a("")
    a("### Description (paste)")
    a("")
    a("```")
    a(desc)
    a("```")
    a("")
    mb = D.DESC_MULTIBYTE if D.DESC_MULTIBYTE is not None else multibyte_note(desc)
    a(f"{len(desc):,} of 5,000 characters ({len(desc.encode('utf-8')):,} UTF-8 bytes; YouTube counts this limit in bytes, and {mb} take 2-3 each). "
      "No `<` or `>`, which YouTube rejects. It follows the house template: an answer-first opening line for the search snippet, "
      "then 'The math, shown:' bullets, then the follow line. "
      f"The credit, assumptions and 'Not financial advice.' line comes next, and the {len(D.YT_HASHTAGS)} hashtags close it."
      + (f" {D.DESC_NOTE}" if D.DESC_NOTE else ""))
    a("")
    a("### Hashtags (order matters)")
    a("")
    for i, (h, why) in enumerate(D.YT_HASHTAG_NOTES, 1):
        a(f"{i}. `{h}`: {why}")
    a("")
    a(D.YT_HASHTAG_PLACEMENT)
    a("")
    a(f"### Tags (paste; {tag_chars(tags)} of 500 characters as YouTube counts them: commas count, and a tag with a space counts 2 more for the quotes YouTube adds)")
    a("")
    a("```")
    a(", ".join(tags))
    a("```")
    a("")
    a(D.TAGS_NOTE)
    a("")
    a("### Pinned comment (post it, then pin it)")
    a("")
    a("```")
    a(D.YT_PINNED)
    a("```")
    a("")
    a(D.PINNED_NOTE)
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
    a(f"- **Thumbnail:** {D.THUMB_MD}")
    a(YT_SETTINGS_MD)
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
    a(cap)
    a("```")
    a("")
    a(f"- {len(cap):,} of 2,200 characters.")
    for x in D.IG_CAPTION_BULLETS:
        a(f"- {x}")
    a("")
    n = len(D.IG_HASHTAGS)
    a(f"### Hashtags ({n}, Instagram's cap since Dec 2025)" if n == 5 else f"### Hashtags ({n}; Instagram's cap is 5 since Dec 2025)")
    a("")
    a("`" + " ".join(D.IG_HASHTAGS) + "`")
    a("")
    L.extend(D.IG_HASHTAG_MD)
    a("")
    a("### Alt text")
    a("")
    a(f"- **Short ({len(D.IG_ALT_SHORT)} characters; paste this one into Instagram):** {D.IG_ALT_SHORT}")
    a(f"  - {D.IG_ALT_SHORT_NOTE}")
    a(f"- **Long (for anywhere with room, such as a website embed):** {D.IG_ALT_LONG}")
    a(f"- **Where:** {ALT_TEXT_WHERE}")
    a("")
    a("### Cover")
    a("")
    a(f"![{D.SHORT_ID} cover, 3:4]({b}-cover-3x4.jpg)")
    a("")
    a(f"- **Files:** `publishing/{b}-cover-3x4.jpg` (1080×1440) and `publishing/{b}-cover-9x16.jpg` (1080×1920). "
      f"Both come from the {D.COVER_RENDER_WORD} ({D.VIDEO_S:g} s) render at {D.COVER_T:g} s (frame {D.COVER_FRAME}).")
    a(f"- **Frame, by content:** {D.COVER_FRAME_BY_CONTENT} {D.COVER_FRAME_MEASURED} If the cut changes, re-pick it by content.")
    a(f"- **Crop:** {D.COVER_CROP_NOTE}")
    a(f"- **How to set it:** {D.COVER_HOW_TO_SET}")
    a(f"- **Re-export:** `{cmd3}` and `{cmd9}`, or `{D.BUILD_CMD} --covers`.")
    for x in D.COVER_EXTRA_BULLETS:
        a(f"- {x}")
    a("")
    a("### First comment (post it, then pin it)")
    a("")
    a("```")
    a(D.IG_FIRST_COMMENT)
    a("```")
    a("")
    a("### Trial Reels")
    a("")
    tr = ig["trial_reels"]
    a(f"**{tr['recommendation']}** {tr['why']} {tr['use_trial_for']}")
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
    a(D.KW_HEADING_MD)
    a("")
    a("| Keyword | Est. searches/month | Competition | Overall | Note | vidIQ as of |")
    a("|---|---:|---:|---:|---|---|")
    for k, v, vol, c, o, nt, asof in D.KEYWORDS:
        a(f"| {k} | {v:,}{'' if v else ' (<750)'} | {'' if c is None else c} | {'' if o is None else o} | "
          f"{D.KEYWORD_MD_NOTE.get(k, nt)} | {asof or 'no snapshot'} |")
    a("")
    a(D.KW_OUTRO)
    a("")
    a(D.SAME_IDEA_HEADING)
    a("")
    a("| Title | Channel (subs) | Views | Date |")
    a("|---|---|---:|---|")
    for x in D.YT_SAME_IDEA:
        a(f"| {x[0]} | {x[1]} ({x[2]:,}) | {x[3]:,} | {x[4]} |")
    a("")
    L.extend(D.SAME_IDEA_MD)
    a("")
    a(D.OUTLIERS_HEADING)
    a("")
    L.extend(D.OUTLIERS_MD)
    a("")
    a(D.OWN_HEADING)
    a("")
    a("| YouTube Short | Posted (ET) | Views |")
    a("|---|---|---:|")
    for i, t, p, v in D.OWN_YT:
        a(f"| {t} (`{i}`) | {p} | {v:,} |")
    a("")
    a("| Instagram Reel | Posted (ET) | Plays | Skip rate | Avg watched |")
    a("|---|---|---:|---:|---:|")
    for s, t, p, pl, sk, aw in D.OWN_IG:
        a(f"| {t} (`{s}`) | {p} | {pl:,} | {sk}% | {aw}% |")
    a("")
    L.extend(D.OWN_MD)
    a("")
    a("**5. Platform rules applied.**")
    a("")
    L.extend(PLATFORM_RULES_MD)
    a("")
    a("**6. Limits.**")
    a("")
    for x in r["limits"]:
        a(f"- {x}")
    a("")
    a("---")
    a("")
    a(f"## Check log ({D.CHECK_LOG_TITLE})")
    a("")
    limits_line = (f"- **Limits.** Title {len(title)}/100. Description {len(desc):,} characters ({len(desc.encode('utf-8')):,} bytes) of 5,000. "
                   f"{len(D.YT_HASHTAGS)} hashtags. Tags {tag_chars(tags)}/500 as YouTube counts them. "
                   f"Instagram caption {len(cap):,}/2,200, with the first 125 characters result-free. {len(D.IG_HASHTAGS)} hashtags. "
                   f"Short alt text {len(D.IG_ALT_SHORT)}. No `<` or `>`.")
    for x in D.CHECK_LOG:
        a(limits_line if x == "{LIMITS}" else x)
    a("")
    return "\n".join(L)


def numbers_check(D, md, js):
    """-> list of failures (empty: pass)"""
    bad = []
    J = json.loads(js)
    yt, ig = J["youtube"], J["instagram"]
    # the arithmetic behind the figures (the maths table's own relations, recomputed in the data file)
    bad += [f"maths: {w}" for ok, w in D.MATH_RELATIONS if not ok]
    # the data file's own rules on the copy (a figure in its own context; no spelled-out figures the FIGURES check can't see)
    bad += [f"copy: {w}" for ok, w in D.COPY_RULES if not ok]
    # the maths check itself, on the specs as they stand
    r = subprocess.run([sys.executable, os.path.join(ROOT, D.MATH_SCRIPT)] + list(D.MATH_ARGS), capture_output=True, text=True)
    m = re.search(r"(\d+) checks, (\d+) failed", r.stdout)
    if r.returncode != 0 or not m or m.group(2) != "0":
        bad.append(f"{D.MATH_SCRIPT}: {m.group(0) if m else 'no summary'} (exit {r.returncode})")
    for line in D.MATH_KEY_LINES:
        if line not in r.stdout:
            bad.append(f"{D.MATH_SCRIPT}: the {D.SHORT_ID} key figures moved ({line!r} not in its output)")
    # platform limits
    title_tags = re.findall(r"#\w+", yt["title_pick"])
    lim = [(len(yt["title_pick"]) <= 100, "title <= 100"), (len(yt["description"]) <= 5000, "description <= 5,000"),
           (len(yt["description"].encode("utf-8")) <= 5000, "description <= 5,000 bytes"),
           (not re.search("[<>]", yt["title_pick"] + yt["description"]), "no < or > on YouTube"),
           (tag_chars(yt["tags"]) <= 500, "tags <= 500 as YouTube counts them"),
           (len(re.findall(r"#\w+", yt["description"])) <= 60, "YouTube hashtags <= 60"),
           (re.findall(r"#\w+", yt["description"])[:len(yt["hashtags_in_order"])] == yt["hashtags_in_order"],
            "the description's first hashtags = hashtags_in_order"),
           (title_tags in ([], yt["hashtags_in_order"]), "title hashtags: none, or hashtags_in_order"),
           (len(ig["caption"]) <= 2200, "caption <= 2,200"), (len(ig["hashtags_in_order"]) <= 5, "IG hashtags <= 5"),
           (re.findall(r"#\w+", ig["caption"]) == ig["hashtags_in_order"], "IG caption hashtags = hashtags_in_order"),
           (len(ig["alt_text_short"]) <= 100, "short alt text <= 100"),
           (not re.search(D.RESULT_RE_CAPTION, ig["caption"][:125]), "caption's first 125 characters result-free"),
           (not re.search(D.RESULT_RE_TITLE, yt["title_pick"]), "title result-free")]
    bad += [f"limit: {w}" for ok, w in lim if not ok]
    # stated counts equal the strings
    cnt = [(yt["title_pick_chars"], len(yt["title_pick"]), "title_pick_chars"), (yt["description_chars"], len(yt["description"]), "description_chars"),
           (yt["description_utf8_bytes"], len(yt["description"].encode("utf-8")), "description_utf8_bytes"),
           (yt["tags_chars_as_youtube_counts"], tag_chars(yt["tags"]), "tags_chars"), (ig["caption_chars"], len(ig["caption"]), "caption_chars"),
           (ig["caption_first_125"], ig["caption"][:125], "caption_first_125")]
    bad += [f"count: {w} {a!r} != {b!r}" for a, b, w in cnt if a != b]
    bad += [f"count: titles_ranked {t['title']!r}" for t in yt["titles_ranked"] + yt["titles_also_scored"] if t["chars"] != len(t["title"])]
    if yt["title_pick"] not in [t["title"] for t in yt["titles_ranked"]]:
        bad.append("title_pick is not one of titles_ranked")
    # every paste block in the .md is its JSON string, character for character
    blocks = re.findall(r"```\n(.*?)\n```", md, re.S)
    for name, v in [("title", yt["title_pick"]), ("description", yt["description"]), ("tags", ", ".join(yt["tags"])),
                    ("pinned comment", yt["pinned_comment"]), ("IG caption", ig["caption"]), ("first comment", ig["first_comment"])]:
        if v not in blocks:
            bad.append(f"md: the {name} block differs from the JSON")
    for name, v in [("alt short", ig["alt_text_short"]), ("alt long", ig["alt_text_long"])]:
        if v not in md:
            bad.append(f"md: the {name} differs from the JSON")
    # every figure in the copy is a maths figure
    copy = "\n".join([yt["title_pick"], yt["description"], ", ".join(yt["tags"]), yt["pinned_comment"], ig["caption"],
                      ig["first_comment"], ig["alt_text_short"], ig["alt_text_long"]])
    for tok in re.findall(r"\$?\d[\d,./–]*\d×?|\$?\d×?", copy):
        t = tok.rstrip(".,")
        if t not in D.FIGURES:
            bad.append(f"figure not in the maths table: {t!r}")
    # the video and the covers
    fv = J["for_video"]
    if not os.path.exists(os.path.join(ROOT, fv["current_render"])):
        bad.append("for_video: no such render")
    elif sha256_of(os.path.join(ROOT, fv["current_render"])) != fv["current_sha256"]:
        bad.append("for_video: sha256 differs from the render")
    for k, f in ig["cover"]["files"].items():
        path = os.path.join(ROOT, f)
        if not os.path.exists(path):
            bad.append(f"cover {k}: missing")
            continue
        wh = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", path],
                            capture_output=True, text=True).stdout.strip()
        if wh != COVER_SIZES[k]:
            bad.append(f"cover {k}: {wh}")
    return bad


def export_covers(D, out):
    for k, vf in (("9x16", None), ("3x4", D.COVER_CROP)):
        dst = os.path.join(out, f"{D.BASE}-cover-{k}.jpg")
        cmd = ["ffmpeg", "-v", "error", "-y", "-ss", str(D.COVER_T), "-i", D.VIDEO, "-frames:v", "1"] + (["-vf", vf] if vf else []) + ["-q:v", "2", dst]
        subprocess.run(cmd, check=True)
        print("cover", k, "->", os.path.relpath(dst, ROOT))


def main(argv):
    flags = [x for x in argv if x.startswith("--")]
    pos = [x for x in argv if not x.startswith("--")]
    out = PUB
    if "--out" in argv:
        i = argv.index("--out")
        if i + 1 >= len(argv):
            sys.exit("--out needs a directory")
        out = os.path.abspath(argv[i + 1])
        pos.remove(argv[i + 1])
    unknown = [x for x in flags if x not in ("--check", "--covers", "--out")]
    if unknown or len(pos) != 1:
        sys.exit(f"usage: build_publishing.py <id or data file> [--covers] [--check] [--out DIR]"
                 + (f" (unknown {unknown})" if unknown else ""))
    D = load(pos[0])
    meta = build_meta(D)
    JSON = json.dumps(meta, ensure_ascii=False, indent=2) + "\n"
    MD = build_md(D, meta)
    md_path, js_path = os.path.join(out, f"{D.BASE}.md"), os.path.join(out, f"{D.BASE}.json")
    if "--check" in flags and "--covers" not in flags:
        md = open(md_path, encoding="utf-8").read()
        js = open(js_path, encoding="utf-8").read()
        if md != MD or js != JSON:
            print("FAIL: the files on disk differ from this generator's output (regenerate them)")
            return 1
    else:
        os.makedirs(out, exist_ok=True)
        if "--covers" in flags:
            export_covers(D, out)
        with open(js_path, "w", encoding="utf-8") as f:
            f.write(JSON)
        with open(md_path, "w", encoding="utf-8") as f:
            f.write(MD)
        md, js = MD, JSON
    print("title", len(D.YT_TITLE), "desc", len(D.YT_DESCRIPTION), "ig caption", len(D.IG_CAPTION),
          "first125", repr(D.IG_CAPTION[:125]), "tags", tag_chars(D.YT_TAGS))
    fails = numbers_check(D, md, js)
    for x in fails:
        print("FAIL:", x)
    print("numbers check:", "PASS" if not fails else f"{len(fails)} failure(s)")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
