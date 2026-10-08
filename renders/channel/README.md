# Channel renders: branded for @envelopemath

The 30 teasers in their two looks (15 Scoreboard, 15 Becker Rig), branded for **The Back of the Envelope** ([@envelopemath](https://www.youtube.com/@envelopemath)). These are the files to post.

- The **em** badge sits in the top-left channel mark.
- Each teaser ends on a 2.5 s end card with the channel's CTA: "Follow for the math behind your money", "shown, not hand-waved." and "@envelopemath". The teaser's final frame stays visible underneath, dimmed. In Scoreboard the badge pops in on the dark board. In Becker Rig it drops onto the floor line and the stick figure points at it.
- Everything else (hooks, numbers, timing, look) is the same as [`renders/v3/`](../v3/README.md), which keeps the unbranded versions.

1080×1920, 30 fps, H.264 + AAC. The audio is the synthesised sound-effect track only; captions show the guide voice-over until it is recorded.

To download on a phone or PC from GitHub, open a file and use **Download raw file**. To bring the whole set into the Finance Channel project, see [`HANDOFF-finance-channel.md`](../../HANDOFF-finance-channel.md).

The brand lives in [`studio/brand/`](../../studio/brand) (logo, CTA wording, card length). To rebuild: `cd studio && node src/cli.mjs render specs/<id>.json`; add `--no-brand` for an unbranded version.
