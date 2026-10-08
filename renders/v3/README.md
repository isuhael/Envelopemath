# Teaser renders: Scoreboard and Becker Rig

The 30 round-2 teasers in the two kept looks, 15 in **Scoreboard** and 15 in **Becker Rig**. These are the current finals. `renders/v2/` keeps the earlier four-look set for comparison.

Fourteen teasers were first made in Clean Sheet or Live Sheet and were rebuilt in one of the kept looks. Their hook, numbers, voice-over and verdict are the same, and the rebuilds went through lint, the math check, a fresh-eyes QA and a fix pass. The other 16 were already in Scoreboard or Becker Rig and were re-rendered from the current kits.

| Format | Scoreboard | Becker Rig |
|---|---|---|
| 01 Dead simple numbers | 01a paid biweekly | 01b $20 an hour, 01c $60k a year |
| 02 Find your row | 02b trillion at your wage, 02c salary per hour | 02a $3 a day by age |
| 03 What difference | 03b card minimum, 03c mortgage +$100 | 03a car loan weekly |
| 04 Chart race | 04a S&P 500 vs gold, 04c USA vs Europe | 04b savings vs S&P 500 |
| 05 Split sheet | 05c Costco $100 | 05a Chipotle $10, 05b $3,000 paycheck |
| 06 POV race | 06a first iPhone vs Apple, 06b Netflix bill | 06c latte vs Starbucks |
| 07 Ledger duel | 07a start at 25 | 07b panic sell 2008, 07c savings rate |
| 08 Unit ladder | 08a Costco hot dogs | 08b hours at $15, 08c college in Big Macs |
| 09 Growth ladder | 09c $5 a day millionaire | 09a $100 a month doubles, 09b $1,000 × 1.07 |
| 10 Cost counter | 10a debt interest live, 10c Amazon makes | 10b debt vs your pay |

- 1080×1920, 30 fps, H.264 + AAC. The audio is the synthesised sound-effect track only; the voice-over is recorded separately (the guide script is in each format's write-up in `teasers/v2/`).
- Captions on screen are the guide VO, so the timing can be judged before recording.
- File names: `NN` format number, `a/b/c` teaser, then the look and topic.

To download on a phone or PC from GitHub, open a file and use **Download raw file**.

To rebuild any of them: `cd studio && npm install && node src/cli.mjs render specs/<id>.json`.
