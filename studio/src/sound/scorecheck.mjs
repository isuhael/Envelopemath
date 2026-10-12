// Symbolic-score checks (bible §9.4 S1-S14, plus B2 and B10 from §9.3) on an engine <id>.score.json.
// The code lives in the acceptance harness (studio/sound/checks/score.mjs) and reads its thresholds from
// studio/sound/acceptance.json; this module keeps the engine's import path for `cli.mjs audit`, index.mjs and the tests.
export { checkScore, REGISTERS, SCORE_IDS } from '../../sound/checks/score.mjs'
