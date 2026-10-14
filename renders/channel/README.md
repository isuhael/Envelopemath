# Channel renders: branded for @envelopemath

The 30 teasers in their two looks (15 Scoreboard, 15 Becker Rig), branded for **The Back of the Envelope** ([@envelopemath](https://www.youtube.com/@envelopemath)). These are the files to post.

- The **em** badge sits in the top-left channel mark.
- Each teaser ends on a 2.5 s end card with the channel's CTA: "Follow for the math behind your money", "shown, not hand-waved." and "@envelopemath". The teaser's final frame stays visible underneath, dimmed. In Scoreboard the badge pops in on the dark board. In Becker Rig it drops onto the floor line and the stick figure points at it.
- Everything else (hooks, numbers, look) is the same as [`renders/v3/`](../v3/README.md), which keeps the unbranded versions, except the timing: since 2026-10-13 all 30 here are condensed cuts (06c and 06b first, then the 16 of 01a-06a, then the 12 of 07a-10c), and 10a and 10c are recut to end on an earlier verdict. 06c's condensed cut replaced the old one here on 2026-10-12: 18.2 s (a 15.7 s body + the end card), against `renders/v3/`'s 28.0 s. Later the same day its picture was re-rendered so the opening never holds still (the figure weighs the $4 coin until the first purchase). Its soundtrack did not change. 06b's condensed cut replaced its 33.0 s Scoreboard cut here the same day: 20.8 s (an 18.3 s body + the end card), with the same captions, numbers and sound cues on a faster clock (about 1 s per year) and short pauses on the answer row's landings, so no still moment before the verdict reaches 0.4 s.
- On 2026-10-13 the condensed cuts of 01a-06a (16 teasers) replaced their earlier cuts here. Every hook, number, display string and verdict is kept. The clock is faster, and captions were merged where a lone caption would have held a still beat, so no still moment before the verdict hold reaches 0.4 s. Each has the same 2.5 s end card. The earlier cuts are in git history (commit 471c793). The lengths below are the files' own, in whole 30 fps frames (what `ffprobe` reads and the publishing sheets' `current_duration_s` give). Where a body ends between two frames (01c, 03b, 03c, 05a, 05b; and 08a, 08b, 10b, 10c below), the card starts on the next whole frame, so the file runs a fraction of a frame past body + 2.5 s.
- Later on 2026-10-13 the condensed cuts of 07a-10c (12 teasers) replaced their earlier cuts here, in the same way: every hook, number and display string is kept, captions are reading-paced and back to back, and no still moment before the verdict hold reaches 0.4 s. Three differ:
  - **10b** runs in real time (its counter adds the new US debt at the real rate), so it stays long: 38.667 s (a 36.15 s body: the counter's 33.3 s, then the verdict at 34.1 s held 2.05 s). Only its tail got shorter.
  - **10a** and **10c** are recut to end on an earlier verdict (owner-approved): 10a's counter stops on its $500,000 pass, "$500K a year: ≈ 16 seconds." (it ran on to $1 million, ≈ 33 seconds); 10c's stops on half a year of median pay, "Half a year of median pay: ≈ 13 seconds." (it ran on to a year, ≈ 26 seconds).
  - The earlier cuts are in git history (commit c4a3014; 471c793 with the older soundtrack).

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
  | 07a-scoreboard-start-at-25 | 17.1 s | 25.3 s |
  | 07b-becker-rig-panic-sell-2008 | 16.6 s | 29.9 s |
  | 07c-becker-rig-savings-rate | 15.8 s | 21.6 s |
  | 08a-scoreboard-costco-hot-dogs | 16.433 s | 24.5 s |
  | 08b-becker-rig-hours-at-15 | 15.367 s | 29.5 s |
  | 08c-becker-rig-college-in-big-macs | 14.6 s | 24.5 s |
  | 09a-becker-rig-100-a-month-doubles | 16.5 s | 31.0 s |
  | 09b-becker-rig-1000-times-1-07 | 16.4 s | 29.5 s |
  | 09c-scoreboard-5-a-day-millionaire | 15.3 s | 34.0 s |
  | 10a-scoreboard-debt-interest-live | 21.1 s | 39.0 s |
  | 10b-becker-rig-debt-vs-your-pay | 38.667 s | 39.1 s |
  | 10c-scoreboard-amazon-makes | 18.067 s | 33.5 s |

1080×1920, 30 fps, H.264 + AAC stereo 48 kHz (about 200 kb/s). **Full sound design, no narration**: an original score generated in code for each look (Scoreboard: dark electro-trap pulse; Becker Rig: swung toy-box funk), layered sound effects on every on-screen event, and the channel's "em sting" on the end card. Every teaser is tempo-mapped so its payoff lands on a downbeat, mastered to −14 LUFS with true peak ≤ −1 dBTP, and has no silent gaps. The sound bible is [`studio/sound/BIBLE.md`](../../studio/sound/BIBLE.md); `node src/cli.mjs sound` rebuilds the audio onto these videos without re-rendering the picture. The current soundtrack shipped on the evening of 2026-10-13 (bible v2.5), with the condensed 07a-10c; it replaced v2.4's of the same morning. Both looks' sound packs gained rules for the payoff of short bodies (Scoreboard: the payoff's own range and room; Becker Rig: the payoff stack, its landing and a refit), so all 30 soundtracks changed again; the pictures of the 18 teasers outside 07a-10c did not. All 30 pass every gated check, at −14.08 to −14.18 LUFS, true peak −1.20 to −1.59 dBTP and PLR 12.56 to 12.95 (`verify`'s A1, A2 and A5, the values the bible quotes). The on-screen captions are the specs' own, and the sound adds none.

To download on a phone or PC from GitHub, open a file and use **Download raw file**. To bring the whole set into the Finance Channel project, see [`HANDOFF-finance-channel.md`](../../HANDOFF-finance-channel.md).

The brand lives in [`studio/brand/`](../../studio/brand) (logo, CTA wording, card length). To rebuild: `cd studio && node src/cli.mjs render specs/<id>.json`; add `--no-brand` for an unbranded version.
