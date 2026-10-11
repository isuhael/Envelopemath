// Mount a spec for its cues only (no frames): what the sound engine needs from the kit.
// Returns a plain, JSON-able "mounted spec" record; everything downstream (timeline, packs, mixer) reads only this.
import { openSpec } from '../page.mjs'

/**
 * The engine's input record for one spec.
 * { id, look, format, fps, duration, base, brand: { logo, card, t0, dur } | null, sfx: [{ t, kind, gain?, dur?, ... }],
 *   vo: [{ t, d?, text }], verdict: { t, text } | null, beats: [...] }
 */
export function cueRecord(spec, info) {
  const lo = spec.lookOpts || {}
  return {
    id: spec.id,
    look: spec.look,
    format: spec.format,
    fps: info.fps,
    duration: info.duration,
    base: info.base,
    brand: info.brand && info.brand.t0 != null ? { logo: !!info.brand.logo, card: info.brand.card, t0: info.brand.t0, dur: info.brand.dur } : null,
    sfx: info.sfx.map(c => ({ ...c })),
    vo: (spec.vo || []).map(v => ({ t: v.t, d: v.d, text: v.text })),
    verdict: spec.verdict && Number.isFinite(+spec.verdict.t) ? { t: +spec.verdict.t, text: spec.verdict.text || '' } : null,
    beats: Array.isArray(lo.beats) ? lo.beats.map(b => ({ ...b })) : [],
  }
}

/** Mount `spec` in an open browser and return its cue record (the page is closed again; no frames are grabbed). */
export async function mountCues(browser, spec) {
  const { page, info, errors } = await openSpec(browser, spec)
  try {
    if (errors.length) throw new Error(`${spec.id}: page errors while mounting:\n${errors.join('\n')}`)
    return cueRecord(spec, info)
  } finally {
    await page.close()
  }
}
