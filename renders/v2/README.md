# Round-2 teaser renders (four looks, archived)

**Superseded by [`renders/v3/`](../v3/README.md)**, where all 30 teasers are in the two kept looks, Scoreboard and Becker Rig. This folder keeps the four-look set (Clean Sheet, Live Sheet, Scoreboard, Becker Rig) for comparison. The specs have moved on since these files were made (the retired looks' specs are in `studio/specs/retired/`), so a rebuild now produces the v3 versions.

Final MP4s of the round-2 teasers, copied here from `studio/out/` (which is not in git) once each teaser has passed assembly: lint clean, every on-screen number checked against its math script, fresh-eyes QA, fixes applied.

- 1080×1920, 30 fps, H.264 + AAC. The audio is the synthesised sound-effect track only; the voice-over is recorded separately (the guide script is in each format's write-up in `teasers/v2/`).
- Captions on screen are the guide VO, so the timing can be judged before recording.
- File names: `NN` format number, `a/b/c` teaser, then the look and topic.

To download on a phone or PC from GitHub, open a file and use **Download raw file**.

To rebuild any of them: `cd studio && npm install && node src/cli.mjs render specs/<id>.json`.
