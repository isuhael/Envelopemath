# Channel renders: branded for @envelopemath

The 30 teasers in their two looks (15 Scoreboard, 15 Becker Rig), branded for **The Back of the Envelope** ([@envelopemath](https://www.youtube.com/@envelopemath)). These are the files to post.

- The **em** badge sits in the top-left channel mark.
- Each teaser ends on a 2.5 s end card with the channel's CTA: "Follow for the math behind your money", "shown, not hand-waved." and "@envelopemath". The teaser's final frame stays visible underneath, dimmed. In Scoreboard the badge pops in on the dark board. In Becker Rig it drops onto the floor line and the stick figure points at it.
- Everything else (hooks, numbers, timing, look) is the same as [`renders/v3/`](../v3/README.md), which keeps the unbranded versions, except the 18 condensed cuts: 06c, 06b and the 16 teasers of 01a-06a. 06c's condensed cut replaced the old one here on 2026-10-12: 18.2 s (a 15.7 s body + the end card), against `renders/v3/`'s 28.0 s. Later the same day its picture was re-rendered so the opening never holds still (the figure weighs the $4 coin until the first purchase). Its soundtrack did not change. 06b's condensed cut replaced its 33.0 s Scoreboard cut here the same day: 20.8 s (an 18.3 s body + the end card), with the same captions, numbers and sound cues on a faster clock (about 1 s per year) and short pauses on the answer row's landings, so no still moment before the verdict reaches 0.4 s.
- On 2026-10-13 the condensed cuts of 01a-06a (16 teasers) replaced their earlier cuts here. Every hook, number, display string and verdict is kept. The clock is faster, and captions were merged where a lone caption would have held a still beat, so no still moment before the verdict hold reaches 0.4 s. Each has the same 2.5 s end card. The earlier cuts are in git history (commit 471c793). The lengths below are the files' own, in whole 30 fps frames (what `ffprobe` reads and the publishing sheets' `current_duration_s` give). Where a body ends between two frames (01c, 03b, 03c, 05a, 05b), the card starts on the next whole frame, so the file runs a fraction of a frame past body + 2.5 s.

  | Teaser | Now | Was |
  |---|---|---|
  | 01a-scoreboard-paid-biweekly | 13.9 s | 27.0 s |
  | 01b-becker-rig-20-an-hour | 14.5 s | 26.5 s |
  | 01c-becker-rig-60k-a-year | 14.767 s | 27.8 s |
  | 02a-becker-rig-3-a-day-by-age | 10.3 s | 15.9 s |
  | 02b-scoreboard-trillion-at-your-wage | 10.1 s | 16.5 s |
  | 02c-scoreboard-salary-per-hour | 10.1 s | 15.5 s |
  | 03a-becker-rig-car-loan-weekly | 17.3 s | 39.7 s |
  | 03b-scoreboard-card-minimum | 14.167 s | 33.1 s |
  | 03c-scoreboard-mortgage-extra-100 | 15.367 s | 32.3 s |
  | 04a-scoreboard-sp500-vs-gold | 19.9 s | 48.0 s |
  | 04b-becker-rig-savings-vs-sp500 | 18.8 s | 38.5 s |
  | 04c-scoreboard-usa-vs-europe | 18.4 s | 39.0 s |
  | 05a-becker-rig-chipotle-10 | 15.233 s | 27.2 s |
  | 05b-becker-rig-3000-paycheck | 13.967 s | 24.6 s |
  | 05c-scoreboard-costco-100 | 11.4 s | 25.3 s |
  | 06a-scoreboard-first-iphone-apple | 17.8 s | 29.0 s |

1080×1920, 30 fps, H.264 + AAC stereo 48 kHz (about 200 kb/s). **Full sound design, no narration**: an original score generated in code for each look (Scoreboard: dark electro-trap pulse; Becker Rig: swung toy-box funk), layered sound effects on every on-screen event, and the channel's "em sting" on the end card. Every teaser is tempo-mapped so its payoff lands on a downbeat, mastered to −14 LUFS with true peak ≤ −1 dBTP, and has no silent gaps. The sound bible is [`studio/sound/BIBLE.md`](../../studio/sound/BIBLE.md); `node src/cli.mjs sound` rebuilds the audio onto these videos without re-rendering the picture. The current soundtrack shipped on 2026-10-13 (bible v2.4). Both looks' sound packs gained rules for short, dense bodies, so all 30 soundtracks changed; the pictures of the 14 teasers outside 01a-06a did not. All 30 pass every gated check, at −14.07 to −14.18 LUFS, true peak −1.17 to −1.56 dBTP and PLR 12.56 to 12.95 (`verify`'s A1, A2 and A5, the values the bible quotes). The on-screen captions are the specs' own, and the sound adds none.

To download on a phone or PC from GitHub, open a file and use **Download raw file**. To bring the whole set into the Finance Channel project, see [`HANDOFF-finance-channel.md`](../../HANDOFF-finance-channel.md).

The brand lives in [`studio/brand/`](../../studio/brand) (logo, CTA wording, card length). To rebuild: `cd studio && node src/cli.mjs render specs/<id>.json`; add `--no-brand` for an unbranded version.
