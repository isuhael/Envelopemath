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

/** argv -> { prefixes, flags }: `--name value` pairs; everything else is an id prefix */
export function args(argv = process.argv.slice(2)) {
  const prefixes = [], flags = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) { const k = argv[i].slice(2); const v = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; flags[k] = v }
    else prefixes.push(argv[i])
  }
  return { prefixes, flags }
}
/** the Becker cue records, sorted by id, filtered by id prefixes (none = all) */
export function beckerRecords({ prefixes = [], cues = null } = {}) {
  const recs = JSON.parse(fs.readFileSync(cues ? path.resolve(cues) : FIXTURE, 'utf8'))
  return Object.keys(recs).sort().filter(id => recs[id].look === 'becker-rig' && (!prefixes.length || prefixes.some(p => id.startsWith(p)))).map(id => recs[id])
}
/** octave-band powers (linear, the §9.2 bands) of a stereo buffer over [0, n) */
export function octavePowers(b, n, F = 8192) {
  const P = ltas(b.L, b.R, 0, Math.min(b.L.length, n), F)
  return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * F / SR); k <= Math.floor(f * Math.SQRT2 * F / SR); k++) x += P[k] || 0; return x })
}
