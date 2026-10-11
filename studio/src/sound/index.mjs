// The sound engine's public surface (packs import from here): DSP primitives, theory, the instrument kit, effects,
// meters, the timeline and the renderer. See studio/sound/README.md for the pack contract.
export * as dsp from './dsp.mjs'
export * as theory from './theory.mjs'
export * as kit from './kit.mjs'
export * as fx from './fx.mjs'
export * as meter from './loudness.mjs'
export { buildTimeline, logoMotif, LOOK_DEFAULTS, LOGO_CHORD } from './timeline.mjs'
export { renderSound, renderMix, masterMix, loadPack, normalizePack, scoreOnly, KINDS, DEFAULT_DUCK, TARGET_LUFS, CEILING_DBTP } from './engine.mjs'
export { mountCues, cueRecord } from './cues.mjs'
export { readWav, writeWavF32 } from './wav.mjs'
export { checkScore } from './scorecheck.mjs'
export { auditFile } from './audit.mjs'
