#!/usr/bin/env python3
"""Build the Back of the Envelope playbook page (playbook/dist/index.html + media/).

Inputs:
  research/top-10.json           ranked approaches from the research workflow
  teasers/teasers.json           teaser metadata + verification results
  teasers/NN-*.md                per-approach write-ups (upgrade section, scripts)
  engine/out/NN-*.mp4            full-res renders (re-encoded to small previews here)

Usage: python3 playbook/build.py [--no-media]
"""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'playbook' / 'dist'
MEDIA = DIST / 'media'


# ---------- tiny markdown → html (headings, lists, tables, code, inline marks) ----------

def inline(text):
    t = html.escape(text, quote=False)
    t = re.sub(r'`([^`]+)`', r'<code>\1</code>', t)
    t = re.sub(r'\*\*([^*]+)\*\*', r'<strong>\1</strong>', t)
    t = re.sub(r'(?<![\w*])\*([^*\n]+)\*(?![\w*])', r'<em>\1</em>', t)
    t = re.sub(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', r'<a href="\2" target="_blank" rel="noopener">\1</a>', t)
    t = re.sub(r'(?<![">])(https?://[^\s<)]+)', short_link, t)
    return t


def short_link(m):
    url = m.group(1).rstrip('.,;')
    tail = m.group(1)[len(url):]
    host = re.sub(r'^https?://(www\.)?', '', url).split('/')[0]
    return f'<a href="{url}" target="_blank" rel="noopener">{host} ↗</a>{tail}'


def md(src, base_level=3):
    out, lines, i = [], src.strip('\n').split('\n'), 0
    while i < len(lines):
        line = lines[i]
        if line.startswith('```'):
            j = i + 1
            while j < len(lines) and not lines[j].startswith('```'):
                j += 1
            out.append('<pre><code>' + html.escape('\n'.join(lines[i + 1:j])) + '</code></pre>')
            i = j + 1
            continue
        m = re.match(r'^(#{1,6})\s+(.*)', line)
        if m:
            lvl = min(6, max(base_level, len(m.group(1)) + base_level - 3))
            out.append(f'<h{lvl}>{inline(m.group(2))}</h{lvl}>')
            i += 1
            continue
        if line.startswith('|'):
            rows = []
            while i < len(lines) and lines[i].startswith('|'):
                if not re.match(r'^\|[\s:|-]+\|?\s*$', lines[i]):
                    rows.append([c.strip() for c in lines[i].strip().strip('|').split('|')])
                i += 1
            if rows:
                head, body = rows[0], rows[1:]
                out.append('<div class="tablewrap"><table><thead><tr>' + ''.join(f'<th>{inline(c)}</th>' for c in head) + '</tr></thead><tbody>'
                           + ''.join('<tr>' + ''.join(f'<td>{inline(c)}</td>' for c in r) + '</tr>' for r in body) + '</tbody></table></div>')
            continue
        if re.match(r'^\s*([-*]|\d+\.)\s+', line):
            ordered = bool(re.match(r'^\s*\d+\.', line))
            items = []
            while i < len(lines) and (re.match(r'^\s*([-*]|\d+\.)\s+', lines[i]) or (lines[i].startswith('  ') and items)):
                if re.match(r'^\s*([-*]|\d+\.)\s+', lines[i]):
                    items.append(re.sub(r'^\s*([-*]|\d+\.)\s+', '', lines[i]))
                else:
                    items[-1] += ' ' + lines[i].strip()
                i += 1
            tag = 'ol' if ordered else 'ul'
            out.append(f'<{tag}>' + ''.join(f'<li>{inline(it)}</li>' for it in items) + f'</{tag}>')
            continue
        if line.startswith('>'):
            quote = []
            while i < len(lines) and lines[i].startswith('>'):
                quote.append(lines[i].lstrip('> '))
                i += 1
            out.append('<blockquote>' + inline(' '.join(quote)) + '</blockquote>')
            continue
        if not line.strip() or re.match(r'^-{3,}$', line.strip()):
            i += 1
            continue
        para = [line]
        i += 1
        while i < len(lines) and lines[i].strip() and not re.match(r'^(#|\||```|>|\s*([-*]|\d+\.)\s)', lines[i]):
            para.append(lines[i])
            i += 1
        out.append('<p>' + inline(' '.join(para)) + '</p>')
    return '\n'.join(out)


def section(text, heading_pattern):
    """Body of the first markdown heading matching heading_pattern, up to the next heading of the same or higher level."""
    m = re.search(rf'^(#{{2,4}})\s+{heading_pattern}.*$', text, re.M | re.I)
    if not m:
        return ''
    level = len(m.group(1))
    rest = text[m.end():]
    stop = re.search(rf'^#{{2,{level}}}\s', rest, re.M)
    return rest[:stop.start()] if stop else rest


def teaser_block(text, tid, next_ids):
    """The write-up for one teaser: from its heading to the next teaser / math-check heading."""
    m = re.search(rf'^(#{{3,5}})[^\n]*\b{tid}\b[^\n]*$', text, re.M)
    if not m:
        return ''
    rest = text[m.end():]
    stops = [rf'^#{{2,{len(m.group(1))}}}\s[^\n]*\b{n}\b' for n in next_ids] + [r'^#{2,4}\s+Math check', r'^#{2,4}\s+Verification log']
    ends = [s.start() for p in stops for s in [re.search(p, rest, re.M | re.I)] if s]
    return rest[:min(ends)] if ends else rest


# ---------- media ----------

def encode(src, dst_mp4, dst_poster, poster_t):
    MEDIA.mkdir(parents=True, exist_ok=True)
    if not dst_mp4.exists() or dst_mp4.stat().st_mtime < src.stat().st_mtime:
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(src), '-vf', 'scale=540:960', '-c:v', 'libx264', '-preset', 'slow',
                        '-crf', '27', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', str(dst_mp4)], check=True)
    if not dst_poster.exists() or dst_poster.stat().st_mtime < src.stat().st_mtime:
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', str(poster_t), '-i', str(src), '-frames:v', '1', '-vf', 'scale=360:640',
                        '-q:v', '4', str(dst_poster)], check=True)


def why_html(text):
    # "PSYCHOLOGICAL: … ALGORITHMIC: …" → two labelled paragraphs
    parts = re.split(r'\b(PSYCHOLOGICAL|ALGORITHMIC):\s*', text)
    if len(parts) < 3:
        return f'<p>{inline(text)}</p>'
    out = [f'<p>{inline(parts[0])}</p>'] if parts[0].strip() else []
    for label, body in zip(parts[1::2], parts[2::2]):
        out.append(f'<p><strong>{label.capitalize()}.</strong> {inline(body.strip())}</p>')
    return ''.join(out)


def esc(s):
    return html.escape(str(s if s is not None else ''))


def main():
    with_media = '--no-media' not in sys.argv
    top = json.loads((ROOT / 'research' / 'top-10.json').read_text())
    teasers_path = ROOT / 'teasers' / 'teasers.json'
    slate = json.loads(teasers_path.read_text()) if teasers_path.exists() else []
    by_rank = {s['n']: s for s in slate}

    approach_html = []
    toc = []
    hero = None
    for idx, a in enumerate(top['approaches'], start=1):
        name = re.sub(r'^\d+\.\s*', '', a['name'])
        weighted = round(0.4 * a['virality'] + 0.3 * a['replicability'] + 0.3 * a['envelope_fit'], 2)
        s = by_rank.get(idx, {})
        mdfile = ROOT / s['file'] if s.get('file') else None
        mdtext = mdfile.read_text() if mdfile and mdfile.exists() else ''
        upgrade = section(mdtext, r'(The )?Envelope Math upgrade')
        ids = [t['id'] for t in s.get('teasers', [])]
        cards = []
        for k, t in enumerate(s.get('teasers', [])):
            stem = Path(t['spec']).stem
            src = ROOT / 'engine' / 'out' / f'{stem}.mp4'
            vid = poster = None
            if src.exists():
                vid, poster = f'media/{stem}.mp4', f'media/{stem}.jpg'
                if with_media:
                    encode(src, DIST / vid, DIST / poster, 0.9)
                if hero is None and idx == 1:
                    hero = (vid, poster, t)
            title = t.get('final_title') or t['title']
            hook = t.get('final_hook') or t['hook']
            hb, ha = t.get('hook_score_before'), t.get('hook_score_after')
            score = f'<span class="chip">hook {esc(hb)}→{esc(ha)}/10</span>' if ha is not None else ''
            checks = ''.join([
                '<span class="chip ok">math ✓</span>' if t.get('math_ok') else '',
                '<span class="chip ok">facts ✓</span>' if t.get('facts_ok') else '',
            ])
            nums = ''.join(f'<li>{esc(n)}</li>' for n in t.get('key_numbers', [])[:4])
            block = teaser_block(mdtext, t['id'], ids[k + 1:])
            media_html = (f'<video controls muted playsinline loop preload="none" poster="{poster}"><source src="{vid}" type="video/mp4"></video>'
                          if vid else '<div class="novideo">render pending</div>')
            cards.append(f'''
      <article class="teaser" id="t{esc(t['id'])}">
        <div class="phone">{media_html}</div>
        <div class="tmeta">
          <p class="tid">{esc(t['id'])} · {esc(round(t.get('runtime_s') or 0))} s</p>
          <h4>{esc(title)}</h4>
          <p class="hook"><span>Frame 1</span> {esc(hook)}</p>
          <div class="chips">{score}{checks}</div>
          <ul class="nums">{nums}</ul>
          {f'<details><summary>Script, beats &amp; math</summary><div class="script">{md(block, 5)}</div></details>' if block.strip() else ''}
        </div>
      </article>''')
        ev = ''.join(f'<li>{inline(e)}</li>' for e in a['evidence'][:4])
        anat = ''.join(f'<li>{inline(x)}</li>' for x in a['anatomy'][:5])
        hooks = ''.join(f'<li>{inline(h)}</li>' for h in a['hook_formulas'][:5])
        series = s.get('series_name', '')
        toc.append(f'<li><a href="#a{idx}"><span class="tocn">{idx:02d}</span>{esc(name)}</a></li>')
        approach_html.append(f'''
  <section class="approach" id="a{idx}">
    <header class="ahead">
      <div class="postmark" aria-hidden="true"><span>No.</span><b>{idx:02d}</b></div>
      <div>
        <p class="eyebrow">Approach {idx} of 10 · weighted score {weighted:.2f}{f' · series: “{esc(series)}”' if series else ''}</p>
        <h2>{esc(name)}</h2>
        <p class="lede">{inline(a['one_liner'])}</p>
        <dl class="scores">
          <div><dt>Virality</dt><dd>{a['virality']}</dd></div>
          <div><dt>Replicability</dt><dd>{a['replicability']}</dd></div>
          <div><dt>Envelope fit</dt><dd>{a['envelope_fit']}</dd></div>
        </dl>
      </div>
    </header>
    <h3 class="tease-h">Teasers</h3>
    <div class="teasers">{''.join(cards) if cards else '<p class="muted">Teasers pending.</p>'}</div>
    <div class="cols why-h">
      <div class="why">
        <h3>Why it goes viral</h3>
        {why_html(a['why_it_goes_viral'])}
        <h3>Evidence</h3>
        <ul class="evidence">{ev}</ul>
        <details><summary>Anatomy of the originals, hook formulas, pitfalls</summary>
          <h4>Beat by beat</h4><ul>{anat}</ul>
          <h4>Hook formulas</h4><ul>{hooks}</ul>
          <h4>Best platforms</h4><p>{inline(a['best_platforms'])}</p>
          <h4>Pitfalls</h4><p>{inline(a['pitfalls'])}</p>
        </details>
      </div>
      <div class="upgrade">
        <h3>The Envelope Math upgrade</h3>
        {md(upgrade, 4) if upgrade.strip() else '<p class="muted">Write-up pending.</p>'}
      </div>
    </div>
  </section>''')

    principles = ''.join(f'<li>{inline(p)}</li>' for p in top['cross_cutting_principles'])
    rules = ''.join(f'<li>{inline(p)}</li>' for p in top['platform_rules'])
    n_teasers = sum(len(s.get('teasers', [])) for s in slate)
    trailer = ROOT / 'engine' / 'out' / '00-channel-trailer.mp4'
    if trailer.exists():
        if with_media:
            encode(trailer, MEDIA / '00-channel-trailer.mp4', MEDIA / '00-channel-trailer.jpg', 5.6)
        hero = ('media/00-channel-trailer.mp4', 'media/00-channel-trailer.jpg', {'title': 'Channel trailer: $1B at $1 a second'})
    hero_html = ''
    if hero:
        vid, poster, t = hero
        hero_html = f'<figure class="herovid"><video autoplay muted playsinline loop poster="{poster}"><source src="{vid}" type="video/mp4"></video><figcaption>{esc(t.get("final_title") or t["title"])}</figcaption></figure>'

    page = TEMPLATE
    for key, value in {
        'hero_video': hero_html,
        'toc': ''.join(toc),
        'approaches': ''.join(approach_html),
        'principles': principles,
        'rules': rules,
        'whitespace': inline(top['whitespace']),
        'n_teasers': str(n_teasers or 30),
    }.items():
        page = page.replace(f'%%{key}%%', value)
    DIST.mkdir(parents=True, exist_ok=True)
    (DIST / 'index.html').write_text(page)
    size = sum(p.stat().st_size for p in DIST.rglob('*') if p.is_file())
    print(f'wrote {DIST / "index.html"} ({size / 1e6:.1f} MB with media)')


TEMPLATE = (Path(__file__).parent / 'template.html').read_text()

if __name__ == '__main__':
    main()
