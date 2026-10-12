// Mount a spec for its cues only (no frames): what the sound engine needs from the kit.
// Returns a plain, JSON-able "mounted spec" record; everything downstream (timeline, packs, mixer) reads only this.
import fs from 'node:fs'
import path from 'node:path'
import { openSpec, ROOT } from '../page.mjs'

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

// ---------------------------------------------------------------- cue drift (BIBLE.md §11.1)
// Both look packs carry values fitted on the records in test/fixtures/cues.json (Scoreboard calibration.json, Becker
// balance.mjs MODEL). A record that differs from its fixture entry means those values describe a teaser that no longer
// exists. test/cues.test.mjs gates on it; render, audio, sound and verify report it.
export const CUE_FIXTURE = path.join(ROOT, 'test', 'fixtures', 'cues.json')
const REFIT_DOC = { scoreboard: 'looks/scoreboard/sound/tools/README.md', 'becker-rig': 'looks/becker-rig/sound/tools/README.md' }
/** the look's refit procedure */
export const refitDoc = look => REFIT_DOC[look] || 'sound/README.md (the pack contract)'
/** the command that stores the current records as the fixture (after the refit and a passing verify) */
export const STORE_CUES = 'node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json'

/** the first few paths where two JSON values differ, e.g. "sfx[3].t: 2.7 -> 2.75" */
export function diffPaths(a, b, at = '', out = []) {
  if (out.length >= 4) return out
  if (a === b) return out
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) { out.push(`${at || '(record)'}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`); return out }
  if (Array.isArray(a) && a.length !== b.length) out.push(`${at}: ${a.length} -> ${b.length} entries`)
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], Array.isArray(a) ? `${at}[${k}]` : at ? `${at}.${k}` : k, out)
  return out
}

/** the fixture's records ({} when it is missing) */
export function readCueFixture(file = CUE_FIXTURE) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {}
}

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b) || diffPaths(a, b).length === 0
/**
 * Compare cue records with the fixture. Returns one entry per record that differs or has no fixture entry:
 * { id, look, kind: 'changed' | 'new', diff: [paths], line } where line is the guard's message.
 */
export function cueDrift(recs, fixture = readCueFixture()) {
  const out = []
  for (const rec of recs) {
    const want = fixture[rec.id]
    if (!want) out.push({ id: rec.id, look: rec.look, kind: 'new', diff: [], line: `no cue record for ${rec.id} in test/fixtures/cues.json: a new spec. Fit the sound pack on it, see ${refitDoc(rec.look)}` })
    else if (!same(want, rec)) {
      const diff = diffPaths(want, rec)
      out.push({ id: rec.id, look: rec.look, kind: 'changed', diff, line: `cue list changed for ${rec.id}: refit the sound pack, see ${refitDoc(rec.look)} (${diff.join('; ')})` })
    }
  }
  return out
}
