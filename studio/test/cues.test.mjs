// Cue-drift guard: both sound packs carry values fitted on today's cue lists (Scoreboard calibration.json, Becker
// balance.mjs MODEL). A kit or spec change that moves a cue silently invalidates them, so every spec is mounted here and
// its cue record must equal the one in test/fixtures/cues.json, the records the packs were fitted on.
// The mounts take about 5 s in Chromium (4 pages at a time). SOUND_SKIP_CUE_DRIFT=1 skips them (never in CI).
// Stand-alone, after editing a spec or a kit: node --test test/cues.test.mjs (BIBLE.md §11.1). The comparison itself is
// src/sound/cues.mjs cueDrift, which render, audio, sound and verify also report.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, readSpec, launch } from '../src/page.mjs'
import { mountCues, cueDrift, refitDoc, STORE_CUES, CUE_FIXTURE } from '../src/sound/cues.mjs'

const FIXTURE = CUE_FIXTURE
const docFor = refitDoc
const REGEN = STORE_CUES
const specFiles = () => fs.readdirSync(path.join(ROOT, 'specs')).filter(f => f.endsWith('.json')).sort().map(f => path.join(ROOT, 'specs', f))
const NEXT = 'Then, if a row of BIBLE.md §2.3 moved (P, V, base or L): node sound/tools/tempo-table.mjs --write, and npm test (BIBLE.md §11.1)'

test('cue fixture: covers exactly the specs in specs/', () => {
  const fixture = JSON.parse(fs.readFileSync(FIXTURE, 'utf8'))
  const looks = Object.fromEntries(specFiles().map(f => readSpec(f)).map(s => [s.id, s.look]))
  const ids = Object.keys(looks)
  const missing = ids.filter(id => !fixture[id]), extra = Object.keys(fixture).filter(id => !looks[id])
  assert.deepEqual(missing, [], `no cue record for ${missing.join(', ')} in test/fixtures/cues.json: a new spec. Fit the sound pack on it (see ${[...new Set(missing.map(id => docFor(looks[id])))].join(', ')}), then: ${REGEN}. ${NEXT}`)
  assert.deepEqual(extra, [], `test/fixtures/cues.json holds records for specs that are gone (${extra.join(', ')}): ${REGEN}. ${NEXT}`)
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
  const changed = cueDrift(live, fixture).map(d => d.line)
  assert.equal(changed.length, 0, `${changed.join('\n')}\nOnce the pack is refitted and verified, store the new records: ${REGEN}\n${NEXT}`)
})
