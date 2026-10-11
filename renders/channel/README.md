# Channel renders: branded for @envelopemath

The 30 teasers in their two looks (15 Scoreboard, 15 Becker Rig), branded for **The Back of the Envelope** ([@envelopemath](https://www.youtube.com/@envelopemath)). These are the files to post.

- The **em** badge sits in the top-left channel mark.
- Each teaser ends on a 2.5 s end card with the channel's CTA: "Follow for the math behind your money", "shown, not hand-waved." and "@envelopemath". The teaser's final frame stays visible underneath, dimmed. In Scoreboard the badge pops in on the dark board. In Becker Rig it drops onto the floor line and the stick figure points at it.
- Everything else (hooks, numbers, timing, look) is the same as [`renders/v3/`](../v3/README.md), which keeps the unbranded versions.

1080×1920, 30 fps, H.264 + AAC stereo 48 kHz (about 200 kb/s). **Full sound design, no narration**: an original score generated in code for each look (Scoreboard: dark electro-trap pulse; Becker Rig: swung toy-box funk), layered sound effects on every on-screen event, and the channel's "em sting" on the end card. Every teaser is tempo-mapped so its payoff lands on a downbeat, mastered to −14 LUFS with true peak ≤ −1 dBTP, and has no silent gaps. The sound bible is [`studio/sound/BIBLE.md`](../../studio/sound/BIBLE.md); `node src/cli.mjs sound` rebuilds the audio onto these videos without re-rendering the picture. The on-screen captions are unchanged.

To download on a phone or PC from GitHub, open a file and use **Download raw file**. To bring the whole set into the Finance Channel project, see [`HANDOFF-finance-channel.md`](../../HANDOFF-finance-channel.md).

The brand lives in [`studio/brand/`](../../studio/brand) (logo, CTA wording, card length). To rebuild: `cd studio && node src/cli.mjs render specs/<id>.json`; add `--no-brand` for an unbranded version.
