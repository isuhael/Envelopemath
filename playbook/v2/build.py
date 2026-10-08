#!/usr/bin/env python3
"""Build the round-2 teaser page: playbook/v2/dist/index.html + media/ (small previews and posters).

Inputs:
  teasers/v2/slate.json      the ten formats and the look each teaser uses
  teasers/v2/teasers.json    teaser metadata (titles, hooks, numbers, review results)
  studio/specs/*.json        the specs (header, footer, vo)
  renders/channel/<id>.mp4   final full-res branded renders (the path is each teaser's mp4 field; re-encoded to 540x960 previews here)

Usage: python3 playbook/v2/build.py [--no-media]
"""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
HERE = Path(__file__).resolve().parent
DIST = HERE / 'dist'
MEDIA = DIST / 'media'
REPO = 'https://github.com/isuhael/envelopemath/blob/claude/viral-finance-shorts-research-q9az4u/'

LOOKS = {
    'scoreboard': ('Scoreboard', 'Black stage, neon counters, unit stacks and race lines. From HD Guy and ChartOrbit.'),
    'becker-rig': ('Becker Rig', 'A faceless stick figure works the maths: numbers are objects, operators are tools. After Alan Becker.'),
}


def esc(s):
    return html.escape(str(s if s is not None else ''))


def marks(s):
    """spec markup (**x**, __x__, \\n) → html"""
    t = esc(s)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    t = re.sub(r'__(.+?)__', r'<b class="cost">\1</b>', t)
    return t.replace('\n', '<br>')


def encode(src, mp4, poster):
    MEDIA.mkdir(parents=True, exist_ok=True)
    if not mp4.exists() or mp4.stat().st_mtime < src.stat().st_mtime:
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', str(src), '-vf', 'scale=540:960:flags=lanczos', '-c:v', 'libx264',
                        '-preset', 'slow', '-crf', '26', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '96k',
                        '-movflags', '+faststart', str(mp4)], check=True)
    if not poster.exists() or poster.stat().st_mtime < src.stat().st_mtime:
        # frame 1 is the hook: that is the honest thumbnail
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-ss', '0.05', '-i', str(src), '-frames:v', '1', '-vf', 'scale=540:960:flags=lanczos',
                        '-q:v', '3', str(poster)], check=True)


def duration(p):
    out = subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', str(p)], capture_output=True, text=True).stdout
    return float(out.strip() or 0)


def clean_title(title):
    # drop A/B alternates the write-ups keep in the title field
    return re.sub(r'\s*\(A/B:.*$', '', title).strip()


def card(t, fmt, with_media):
    spec = json.loads((ROOT / t['spec']).read_text())
    look_name = LOOKS[t['look']][0]
    sid = t['id']
    src = ROOT / t['mp4']
    secs = duration(src) if src.exists() else t['runtime_s']
    title = clean_title(t['title'])
    if with_media and src.exists():
        encode(src, MEDIA / f'{sid}.mp4', MEDIA / f'{sid}.jpg')
    has = (MEDIA / f'{sid}.mp4').exists()
    video = (f'<video controls playsinline preload="none" poster="media/{sid}.jpg" aria-label="{esc(title)}">'
             f'<source src="media/{sid}.mp4" type="video/mp4"></video>') if has else '<div class="novideo">Render pending</div>'
    nums = ''.join(f'<li>{esc(n)}</li>' for n in t.get('key_numbers', [])[:4])
    vo = ' '.join(v['text'] for v in spec.get('vo', []))
    checks = []
    checks.append('maths checked' if t.get('math_ok') else 'maths: open item')
    checks.append('facts sourced' if t.get('facts_ok') else 'facts: open item')
    return f'''
    <article class="card" data-look="{t['look']}" data-format="{fmt['format']}" id="{sid}">
      <div class="screen look-{t['look']}">{video}</div>
      <div class="meta">
        <p class="tags"><span class="tag look-tag look-{t['look']}">{look_name}</span><span class="tag">{esc(fmt['name'])}</span><span class="tag mono">{secs:.0f} s</span></p>
        <h3>{esc(title)}</h3>
        <p class="hook" title="On screen at 0.0 s">{marks(spec.get('header', ''))}</p>
        {f'<ul class="nums">{nums}</ul>' if nums else ''}
        <details><summary>Guide voice-over</summary><p>{esc(vo)}</p></details>
        <p class="foot mono">{' · '.join(checks)} ·
          <a href="{REPO}{t['mp4']}" target="_blank" rel="noopener">full-size MP4</a> ·
          <a href="{REPO}{t['spec']}" target="_blank" rel="noopener">spec</a></p>
      </div>
    </article>'''


def main():
    with_media = '--no-media' not in sys.argv
    slate = json.loads((ROOT / 'teasers/v2/teasers.json').read_text())
    sections, counts = [], {k: 0 for k in LOOKS}
    for f in slate:
        cards = []
        for t in f['teasers']:
            counts[t['look']] += 1
            cards.append(card(t, f, with_media))
        writeup = f'<a href="{REPO}{f["file"]}" target="_blank" rel="noopener">Write-up, sources and maths</a>' if f.get('file') else ''
        sections.append(f'''
  <section class="format" data-format="{f['format']}" id="f{f['n']:02d}">
    <header class="fhead">
      <p class="rank mono">Format {f['n']} of 10 · pattern {esc(f['pattern'])}</p>
      <h2>{esc(f['name'])}</h2>
      <p class="fnote">{writeup}</p>
    </header>
    <div class="cards">{''.join(cards)}</div>
  </section>''')
    total = sum(counts.values())
    chips = ''.join(f'<button type="button" class="chip" data-filter="{k}" aria-pressed="false"><i class="dot look-{k}"></i>{v[0]} <span class="mono">{counts[k]}</span></button>'
                    for k, v in LOOKS.items())
    looks = ''.join(f'<div class="lk"><p class="lk-name"><i class="dot look-{k}"></i>{v[0]}</p><p>{esc(v[1])}</p></div>' for k, v in LOOKS.items())
    opts = ''.join(f'<option value="{f["format"]}">{f["n"]}. {esc(f["name"])}</option>' for f in slate)
    page = TEMPLATE.replace('{{TOTAL}}', str(total)).replace('{{CHIPS}}', chips).replace('{{LOOKS}}', looks) \
        .replace('{{OPTIONS}}', opts).replace('{{SECTIONS}}', ''.join(sections))
    DIST.mkdir(parents=True, exist_ok=True)
    (DIST / 'index.html').write_text(page)
    size = sum(p.stat().st_size for p in MEDIA.glob('*')) if MEDIA.exists() else 0
    print(f'wrote {DIST / "index.html"} · {total} teasers · media {size / 1e6:.1f} MB')


TEMPLATE = (HERE / 'template.html').read_text()

if __name__ == '__main__':
    main()
