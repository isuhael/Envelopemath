# Bringing the teasers into the Finance Channel project

This branch holds the 30 Back of the Envelope teasers, branded for the channel ([@envelopemath](https://www.youtube.com/@envelopemath)): the **em** badge in the top-left channel mark and the channel's CTA on a closing end card ("Follow for the math behind your money", "shown, not hand-waved.", "@envelopemath"). The looks (Scoreboard and Becker Rig) are unchanged.

The cloud session that built this cannot reach your computer, so the last step happens on your machine. There are three ways to do it, from least to most setup.

## 1. Just the videos

The branded MP4s are in [`renders/channel/`](renders/channel) (1080×1920, 30 fps). Open one on GitHub and use **Download raw file**, or download the branch as a ZIP (**Code → Download ZIP**) and copy `renders/channel/` into the Finance Channel folder.

## 2. The whole studio, in the Finance Channel folder

You need Node 20 or later, ffmpeg on your PATH, and git. In a terminal:

```bash
cd "path/to/Finance Channel (1)"
git clone --branch claude/viral-finance-shorts-research-q9az4u https://github.com/isuhael/Envelopemath.git back-of-the-envelope
cd back-of-the-envelope/studio
npm install
npx playwright install chromium          # the headless browser the renderer drives
node src/cli.mjs check                   # lint all 30 teasers (expect 30/30 clean)
node src/cli.mjs render --all --out ../renders/local
```

If the Finance Channel folder is itself a git repository, either add `back-of-the-envelope/` to its `.gitignore`, or use `git submodule add -b claude/viral-finance-shorts-research-q9az4u https://github.com/isuhael/Envelopemath.git back-of-the-envelope` instead of `git clone`, so the two histories stay separate.

The fonts are bundled in `studio/fonts/`, so local renders match the cloud renders.

## 3. Ask Claude to do it on your machine

Open the Finance Channel (1) folder in the Claude desktop app (Code), or run `claude` in a terminal there, and paste:

> Clone https://github.com/isuhael/Envelopemath.git (branch `claude/viral-finance-shorts-research-q9az4u`) into `./back-of-the-envelope`. If this folder is a git repo, add it as a submodule instead. Then read `back-of-the-envelope/HANDOFF-finance-channel.md` and `back-of-the-envelope/studio/brand/README.md`, install the studio (`npm install`, `npx playwright install chromium`, check ffmpeg is on PATH), lint all 30 specs and render them to `back-of-the-envelope/renders/local`. Tell me where the MP4s are.

## Changing the brand

Everything brand-related is in [`studio/brand/`](studio/brand):

- `logo.png`: the channel badge (800×800 PNG with transparent corners). Replace the file to change the logo everywhere.
- `brand.json`: channel name, handle, the CTA line and kicker, and how long the end card runs (`cta.dur`, in seconds).
- `node src/cli.mjs render <spec> --no-brand` renders a teaser without the logo or the end card.

See [`studio/brand/README.md`](studio/brand/README.md) for the details.
