// The acceptance thresholds (studio/sound/acceptance.json): load once, resolve per look.
//   limits(id, look)  -> the thresholds of check `id` for `look` (the entry's top-level values, with looks[look] or
//                        looks['*'] over them), or null when the check has no thresholds for that look (skipped)
//   gated(id, look)   -> false when the entry (or its look override) says gate: false
//   pending()         -> every value marked "pending bible sync", with its reason
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// SOUND_ACCEPTANCE=<file> points the harness at another thresholds file (e.g. to try a tighter window); default sound/acceptance.json
export const FILE = path.resolve(process.env.SOUND_ACCEPTANCE || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'acceptance.json'))
/** keys that describe a check and are never thresholds */
export const META = new Set(['bible', 'name', 'on', 'note', 'pending', 'gate', 'looks', 'manual'])

let cache = null
/** the parsed acceptance.json (pass a file to read another one, e.g. in tests) */
export function load(file = FILE) {
  if (file === FILE && cache) return cache
  const a = JSON.parse(fs.readFileSync(file, 'utf8'))
  if (!a || typeof a.checks !== 'object') throw new Error(`${file}: no "checks" object`)
  if (file === FILE) cache = a
  return a
}
export const entry = (id, a = load()) => a.checks[id] || null
const strip = o => Object.fromEntries(Object.entries(o || {}).filter(([k]) => !META.has(k)))

/** the thresholds of `id` for `look`: an object, or null when the check does not apply to the look */
export function limits(id, look, a = load()) {
  const e = entry(id, a)
  if (!e) throw new Error(`acceptance.json has no check ${id}`)
  if (e.manual) return null
  const base = strip(e)
  if (!e.looks) return base
  const over = e.looks[look] ?? e.looks['*']
  if (over === undefined) return Object.keys(base).length ? base : null
  return { ...base, ...strip(over) }
}
/** does a failure of `id` fail the run for `look`? */
export function gated(id, look, a = load()) {
  const e = entry(id, a)
  if (!e) return true
  const over = e.looks ? (e.looks[look] ?? e.looks['*']) : null
  if (over && over.gate === false) return false
  return e.gate !== false
}
/** the pending-bible-sync markers: [{ id, look | null, bibleSays, passesNow, reason, sync?, see? }] */
export function pending(a = load()) {
  const out = []
  for (const [id, e] of Object.entries(a.checks)) {
    if (e.pending) out.push({ id, look: null, ...e.pending })
    for (const [look, o] of Object.entries(e.looks || {})) if (o && o.pending) out.push({ id, look, ...o.pending })
  }
  return out
}
/** the check IDs in file order */
export const ids = (a = load()) => Object.keys(a.checks)
