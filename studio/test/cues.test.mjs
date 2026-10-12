// Cue-drift guard: both sound packs carry values fitted on today's cue lists (Scoreboard calibration.json, Becker
// balance.mjs MODEL). A kit or spec change that moves a cue silently invalidates them, so every spec is mounted here and
// its cue record must equal the one in test/fixtures/cues.json, the records the packs were fitted on.
// The mounts take about 5 s in Chromium (4 pages at a time). SOUND_SKIP_CUE_DRIFT=1 skips them (never in CI).
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, readSpec, launch } from '../src/page.mjs'
import { mountCues } from '../src/sound/cues.mjs'

const FIXTURE = path.join(ROOT, 'test', 'fixtures', 'cues.json')
const REFIT = { scoreboard: 'looks/scoreboard/sound/tools/README.md', 'becker-rig': 'looks/becker-rig/sound/tools/README.md' }
const docFor = look => REFIT[look] || 'sound/README.md (the pack contract)'
const REGEN = 'node src/cli.mjs cues specs/*.json --out test/fixtures/cues.json'
const specFiles = () => fs.readdirSync(path.join(ROOT, 'specs')).filter(f => f.endsWith('.json')).sort().map(f => path.join(ROOT, 'specs', f))

/** the first few paths where two JSON values differ, e.g. "sfx[3].t: 2.7 -> 2.75" */
function diffPaths(a, b, at = '', out = []) {
  if (out.length >= 4) return out
  if (a === b) return out
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null || Array.isArray(a) !== Array.isArray(b)) { out.push(`${at || '(record)'}: ${JSON.stringify(a)} -> ${JSON.stringify(b)}`); return out }
  if (Array.isArray(a) && a.length !== b.length) out.push(`${at}: ${a.length} -> ${b.length} entries`)
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) diffPaths(a[k], b[k], Array.isArray(a) ? `${at}[${k}]` : at ? `${at}.${k}` : k, out)
  return out
}

test('cue fixture: covers exactly the specs in specs/', () => {
  const fixture = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'))
  const looks = Object.fromEntries(specFiles().map(f => readSpec(f)).map(s => [s.id, s.look]))
  const ids = Object.keys(looks)
  const missing = ids.filter(id => !fixture[id]), extra = Object.keys(fixture).filter(id => !looks[id])
  assert.deepEqual(missing, [], `no cue record for ${missing.join(', ')} in test/fixtures/cues.json: a new spec. Fit the sound pack on it (see ${[...new Set(missing.map(id => docFor(looks[id])))].join(', ')}), then: ${REGEN}`)
  assert.deepEqual(extra, [], `test/fixtures/cues.json holds records for specs that are gone (${extra.join(', ')}): ${REGEN}`)
})

test('cue drift: every spec mounts to exactly the cue record the sound packs were fitted on', { skip: process.env.SOUND_SKIP_CUE_DRIFT === '1' && 'SOUND_SKIP_CUE_DRIFT=1' }, async () => {
  const fixture = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'))
  const specs = specFiles().map(f => readSpec(f)).filter(s => fixture[s.id])
  const browser = await launch()
  const live = new Array(specs.length)
  try {
    let next = 0
    await Promise.all(Array.from({ length: 4 }, async () => {
      while (next < specs.length) { const i = next++; live[i] = await mountCues(browser, specs[i]) }
    }))
  } finally { await browser.close() }
  const changed = []
  live.forEach((rec, i) => {
    const want = fixture[specs[i].id]
    try { assert.deepStrictEqual(rec, want) } catch {
      changed.push(`cue list changed for ${rec.id}: refit the sound pack, see ${docFor(rec.look)} (${diffPaths(want, rec).join('; ')})`)
    }
  })
  assert.equal(changed.length, 0, `${changed.join('\n')}\nOnce the pack is refitted and verified, store the new records: ${REGEN}`)
})
