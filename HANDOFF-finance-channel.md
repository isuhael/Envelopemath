# Bringing the teasers into the Finance Channel project

This branch holds the 30 Back of the Envelope teasers, branded for the channel ([@envelopemath](https://www.youtube.com/@envelopemath)): the **em** badge in the top-left channel mark and the channel's CTA on a closing end card ("Follow for the math behind your money", "shown, not hand-waved.", "@envelopemath"). The looks (Scoreboard and Becker Rig) are unchanged.

The cloud session that built this cannot reach your computer, so the last step happens on your machine. There are three ways to do it, from least to most setup.

## 1. Just the videos

The branded MP4s are in [`renders/channel/`](renders/channel) (1080×1920, 30 fps). Open one on GitHub and use **Download raw file**. (**Code → Download ZIP** also works but is about 500 MB, because the branch keeps the older unbranded and four-look sets too; copy just `renders/channel/` out of it.)

## 2. The whole studio, in the Finance Channel folder

You need Node 20 or later, ffmpeg on your PATH, and git. In a terminal:

```bash
cd "path/to/Finance Channel (1)"
# a slim clone: only the studio, the branded MP4s and the write-ups (about 220 MB instead of 520 MB)
git clone --filter=blob:none --sparse --depth 1 --branch claude/viral-finance-shorts-research-q9az4u https://github.com/isuhael/Envelopemath.git back-of-the-envelope
cd back-of-the-envelope
git sparse-checkout set studio renders/channel teasers/v2
cd studio
npm install
npx playwright install chromium          # the headless browser the renderer drives
npm test                                 # expect 8/8 pass
node src/cli.mjs check                   # lint all 30 teasers (expect 30/30 clean)
node src/cli.mjs render specs/02c-scoreboard-salary-per-hour.json --out ../renders/local   # one teaser, about a minute
```

The finished MP4s are already in `renders/channel/`, so rendering is only needed after you change a spec or the brand. `node src/cli.mjs render --all --out ../renders/local` re-renders all 30 (about 20 minutes on 4 cores).

These exact steps were checked from a fresh clone on 2026-10-11: 8/8 tests, 30/30 specs clean, and the re-rendered teasers matched the committed `renders/channel/` files frame for frame.

If the Finance Channel folder is itself a git repository, either add `back-of-the-envelope/` to its `.gitignore`, or use `git submodule add -b claude/viral-finance-shorts-research-q9az4u https://github.com/isuhael/Envelopemath.git back-of-the-envelope` instead of `git clone`, so the two histories stay separate.

The fonts are bundled in `studio/fonts/`, so local renders match the cloud renders.

## 3. Ask Claude to do it on your machine

Open the Finance Channel (1) folder in the Claude desktop app (Code), or run `claude` in a terminal there, and paste:

> Clone https://github.com/isuhael/Envelopemath.git (branch `claude/viral-finance-shorts-research-q9az4u`) into `./back-of-the-envelope` as a slim sparse clone (`--filter=blob:none --sparse --depth 1`, then `git sparse-checkout set studio renders/channel teasers/v2`). If this folder is a git repo, add `back-of-the-envelope/` to its .gitignore. Then read `back-of-the-envelope/HANDOFF-finance-channel.md` and `back-of-the-envelope/studio/brand/README.md`, install the studio (`npm install`, `npx playwright install chromium`, check ffmpeg is on PATH), run `npm test` and lint all 30 specs, render one teaser to `back-of-the-envelope/renders/local` to prove the setup works, and tell me where the branded MP4s are (`back-of-the-envelope/renders/channel/`).

## Changing the brand

Everything brand-related is in [`studio/brand/`](studio/brand):

- `logo.png`: the channel badge (800×800 PNG with transparent corners). Replace the file to change the logo everywhere.
- `brand.json`: channel name, handle, the CTA line and kicker, and how long the end card runs (`cta.dur`, in seconds).
- `node src/cli.mjs render <spec> --no-brand` renders a teaser without the logo or the end card.

See [`studio/brand/README.md`](studio/brand/README.md) for the details.
