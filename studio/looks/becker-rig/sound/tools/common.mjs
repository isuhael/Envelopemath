// Shared plumbing for the Becker Rig calibration tools: the cue records (test/fixtures/cues.json unless --cues), the
// Becker teasers to work on (id prefixes on the command line, else all), the octave bands. Run the tools from studio/.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ltas, BANDS } from '../../../../src/sound/audit.mjs'
import { SR } from '../../../../src/sound/dsp.mjs'

export const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')
export const FIXTURE = path.join(STUDIO, 'test', 'fixtures', 'cues.json')
export { BANDS, SR }

/**
 * argv -> { prefixes, flags }: `--name value` or `--name=value` for the flags in `known` (anything else starting with -- is
 * an error, so a typo cannot silently fall back to the fixture); every other argument is an id prefix.
 */
export function args(argv = process.argv.slice(2), known = ['cues']) {
  const prefixes = [], flags = {}
  const usage = `flags: ${known.map(k => `--${k} <value>`).join(' ')} (or --name=value); other arguments are id prefixes`
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-h' || a === '--help') { console.error(usage); process.exit(0) }
    if (!a.startsWith('--')) { prefixes.push(a); continue }
    const eq = a.indexOf('=')
    const k = eq > 0 ? a.slice(2, eq) : a.slice(2)
    if (!known.includes(k)) { console.error(`unknown flag ${a}; ${usage}`); process.exit(2) }
    const v = eq > 0 ? a.slice(eq + 1) : argv[i + 1] != null && !argv[i + 1].startsWith('--') ? argv[++i] : null
    if (v == null || v === '') { console.error(`${a} needs a value; ${usage}`); process.exit(2) }
    flags[k] = v
  }
  return { prefixes, flags }
}
/** the Becker cue records, sorted by id, filtered by id prefixes (none = all) */
export function beckerRecords({ prefixes = [], cues = null } = {}) {
  if (!cues) console.error('cue records: test/fixtures/cues.json, the records MODEL was fitted on. After a kit or spec change, dump fresh ones (node src/cli.mjs cues specs/*-becker-rig-*.json --out /tmp/snd-br/cues.json) and pass --cues /tmp/snd-br/cues.json, or this works on the old cue lists.')
  const recs = JSON.parse(fs.readFileSync(cues ? path.resolve(cues) : FIXTURE, 'utf8'))
  return Object.keys(recs).sort().filter(id => recs[id].look === 'becker-rig' && (!prefixes.length || prefixes.some(p => id.startsWith(p)))).map(id => recs[id])
}
/** octave-band powers (linear, the §9.2 bands) of a stereo buffer over [0, n) */
export function octavePowers(b, n, F = 8192) {
  const P = ltas(b.L, b.R, 0, Math.min(b.L.length, n), F)
  return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * F / SR); k <= Math.floor(f * Math.SQRT2 * F / SR); k++) x += P[k] || 0; return x })
}
