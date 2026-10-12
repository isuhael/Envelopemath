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
npm test                                 # expect 28/28 pass (under a minute)
node src/cli.mjs check                   # lint all 30 teasers (expect 30/30 clean)
node src/cli.mjs render specs/02c-scoreboard-salary-per-hour.json --out ../renders/local   # one teaser, about a minute
```

The finished MP4s are already in `renders/channel/`, so rendering is only needed after you change a spec or the brand. `node src/cli.mjs render --all --out ../renders/local` re-renders all 30 (about 20 minutes on 4 cores).

These steps were checked from a fresh clone on 2026-10-11 (the suite had 8 tests then): 30/30 specs clean, and the re-rendered teasers matched the committed `renders/channel/` files frame for frame. The picture still does. The soundtrack does not: since 2026-10-12, `render` makes the new audio (see [Sound](#sound)), and that audio was shipped into `renders/channel/` the same day. 06c's picture is the condensed cut, re-rendered on 2026-10-12, then re-rendered again the same day for its opening (Becker Rig pov-race `heft`: the figure weighs the $4 coin until the first purchase, so the hook never holds still).

If the Finance Channel folder is itself a git repository, either add `back-of-the-envelope/` to its `.gitignore`, or use `git submodule add -b claude/viral-finance-shorts-research-q9az4u https://github.com/isuhael/Envelopemath.git back-of-the-envelope` instead of `git clone`, so the two histories stay separate.

The fonts are bundled in `studio/fonts/`, so local renders match the cloud renders.

## Sound

The teasers carry a synthesised soundtrack: music and sound effects, no narration. Start with [`studio/sound/README.md`](studio/sound/README.md) (the engine and its commands). The design rules and acceptance checks are in [`studio/sound/BIBLE.md`](studio/sound/BIBLE.md), and its §11, "Changing things safely", is the maintenance procedure.

**State on 2026-10-12: shipped.** `renders/channel/` carries the current soundtrack: the AAC pre-roll, Becker Rig's hook brass at full level, Becker Rig's refit `MODEL` and its reference-octave rule (BIBLE §6.7, §11.2), and 06c's condensed cut (18.2 s; it was 30.5 s). All 30 teasers pass every gated check (`verify --strict-cues`: 42/42 each, units 69/69 and 77/77), and `studio/test/fixtures/sound-baseline.sha256` holds the shipped masters. Against the previous delivery, 24 of the 30 master WAVs changed (all 15 Becker Rig, and nine Scoreboard). Every MP4's audio stream changed, and every video stream is bit-identical to its source. One owner decision is still open: A8's stereo-width target for Becker Rig (BIBLE §9.1, `npm run sound:pending`). It is reported, not gated.

Later on 2026-10-12, 06c was re-shipped for its opening by the same procedure. No cue moved, every master equals the baseline, and its AAC stream is packet-identical. Only 06c's video stream and its publishing sheet's sha256 and covers changed. BIBLE §11.2 now lists the tightest BANDS margins, which will flip first on the next Becker pack change: 02a, 04b and 09a at 0.1 dB, and 01c at 0.2.

To ship a later sound change (BIBLE §11.5), from `studio/`:

```bash
df -h /tmp                                                       # needs about 2.3 GB free
node src/cli.mjs sound specs/*.json --video ../renders/channel --out /tmp/sound/mp4 --score --wav --stems --jobs 4
node src/cli.mjs verify --from /tmp/sound/mp4 --strict-cues     # every check on exactly these files
cp /tmp/sound/mp4/*.mp4 ../renders/channel/
node src/cli.mjs verify --from /tmp/sound/mp4 --write-baseline test/fixtures/sound-baseline.sha256
rm -rf /tmp/sound/mp4
```

**Extra prerequisites for sound maintenance** (not needed to render):
- `python3`. It runs the bible's tempo-map reference: `npm test` uses it when it is installed, and `sound/tools/tempo-table.mjs` needs it.
- `numpy`, for Becker Rig's calibration (`fitsolve.py`, `opt.py`).
- About 2.1 GB of free temp space per full `verify` (about 5-6 minutes on 4 cores), and 4.2 GB if you rebuild the baseline with `npm run sound:baseline` while another build is still in `/tmp`.

Changing a spec, a kit or the end card's timing (`cta.dur`) can move the cues the sound is fitted on. After such a change, run `node --test test/cues.test.mjs`. If it fails, follow BIBLE §11.1 before shipping.

## 3. Ask Claude to do it on your machine

Open the Finance Channel (1) folder in the Claude desktop app (Code), or run `claude` in a terminal there, and paste:

> Clone https://github.com/isuhael/Envelopemath.git (branch `claude/viral-finance-shorts-research-q9az4u`) into `./back-of-the-envelope` as a slim sparse clone (`--filter=blob:none --sparse --depth 1`, then `git sparse-checkout set studio renders/channel teasers/v2`). If this folder is a git repo, add `back-of-the-envelope/` to its .gitignore. Then read `back-of-the-envelope/HANDOFF-finance-channel.md` and `back-of-the-envelope/studio/brand/README.md`, install the studio (`npm install`, `npx playwright install chromium`, check ffmpeg is on PATH), run `npm test` and lint all 30 specs, render one teaser to `back-of-the-envelope/renders/local` to prove the setup works, and tell me where the branded MP4s are (`back-of-the-envelope/renders/channel/`).

## Changing the brand

Everything brand-related is in [`studio/brand/`](studio/brand):

- `logo.png`: the channel badge (800×800 PNG with transparent corners). Replace the file to change the logo everywhere.
- `brand.json`: channel name, handle, the CTA line and kicker, and how long the end card runs (`cta.dur`, in seconds). Changing `cta.dur` moves the end card's cues, and with them the sound's logo landing on every teaser. Follow `studio/sound/BIBLE.md` §11.1 (the cue-drift guard will fail until you do).
- `node src/cli.mjs render <spec> --no-brand` renders a teaser without the logo or the end card.

See [`studio/brand/README.md`](studio/brand/README.md) for the details.
