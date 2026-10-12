// The acceptance harness's single source of truth (sound/acceptance.json): well formed, consistent with the engine's
// own constants and the packs' tempo, and every threshold read by a check. Fast: no rendering.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { ROOT } from '../src/page.mjs'
import { PLR_MAX, DELIVERY_TP, TARGET_LUFS } from '../src/sound/engine.mjs'
import { LOOK_DEFAULTS } from '../src/sound/timeline.mjs'
import { load, limits, gated, pending, META } from '../sound/checks/acceptance.mjs'
import { implemented } from '../sound/checks/run.mjs'
import { readBaseline } from '../sound/checks/baseline.mjs'

const LOOKS = ['scoreboard', 'becker-rig']

test('acceptance.json: every check is described, every pending value says why', () => {
  const a = load()
  for (const [id, e] of Object.entries(a.checks)) {
    assert.ok(e.bible && e.name, `${id}: needs "bible" and "name"`)
    for (const [where, p] of [[id, e.pending], ...Object.entries(e.looks || {}).map(([l, o]) => [`${id}[${l}]`, o && o.pending])]) {
      if (!p) continue
      for (const k of ['bibleSays', 'passesNow', 'reason']) assert.ok(typeof p[k] === 'string' && p[k].length > 10, `${where}: pending.${k}`)
    }
  }
  assert.ok(pending().length >= 1)
  assert.ok(META.has('pending') && !META.has('min'))
})

test('acceptance.json: thresholds resolve per look (top level, then looks.<look>, then looks["*"])', () => {
  assert.deepEqual(limits('A3', 'scoreboard'), { min: 4, max: 9 })
  assert.deepEqual(limits('A3', 'becker-rig'), { min: 3, max: 8 })
  assert.equal(limits('A3', 'no-such-look'), null, 'a look-only check does not apply to an unlisted look')
  assert.deepEqual(limits('U4', 'scoreboard').exemptKinds, ['buzz'])
  assert.deepEqual(limits('U4', 'becker-rig').exemptKinds, [])
  assert.equal(limits('TRAIN', 'becker-rig'), null)
  assert.equal(limits('MALLET', 'scoreboard'), null)
  assert.equal(limits('SPECTROGRAM', 'scoreboard'), null, 'manual checks have no thresholds')
  assert.equal(gated('B1w', 'becker-rig'), false)
  assert.equal(gated('INFO', 'scoreboard'), false)
  assert.equal(gated('B1', 'becker-rig'), true)
  assert.equal(limits('S9', 'no-such-look').lo, LOOK_DEFAULTS['*'].tempo.lo)
})

test('acceptance.json: agrees with the engine and the packs (one source of truth)', async () => {
  // A5's upper bound is what the engine's encode loop enforces; A2 and A1 are the engine's delivery targets
  assert.equal(limits('A5', 'scoreboard').max, PLR_MAX, 'A5.max must equal PLR_MAX in src/sound/engine.mjs')
  assert.equal(limits('A2', 'scoreboard').maxDbtp, DELIVERY_TP, 'A2.maxDbtp must equal DELIVERY_TP in src/sound/engine.mjs')
  assert.equal(limits('A1', 'scoreboard').target, TARGET_LUFS, 'A1.target must equal TARGET_LUFS in src/sound/engine.mjs')
  // S9's tempo ranges are the ones the engine solves the tempo map in (LOOK_DEFAULTS, the pack's own `tempo`)
  for (const look of LOOKS) {
    const s9 = limits('S9', look), pack = await import(path.join(ROOT, 'looks', look, 'sound.mjs'))
    for (const k of ['lo', 'hi', 'absLo', 'absHi']) {
      assert.equal(s9[k], LOOK_DEFAULTS[look].tempo[k], `S9.${k} (${look}) vs LOOK_DEFAULTS`)
      assert.equal(s9[k], pack.tempo[k], `S9.${k} (${look}) vs looks/${look}/sound.mjs tempo`)
    }
  }
})

test('acceptance.json: every check that has thresholds for a look is run by the harness', async () => {
  for (const id of Object.keys(load().checks)) for (const look of LOOKS) {
    if (limits(id, look) == null) continue
    assert.ok(await implemented(id, look), `${id} has thresholds for ${look} but no check reads them`)
  }
})

test('sound baseline: one master-WAV sha256 per spec', () => {
  const b = readBaseline(path.join(ROOT, 'test', 'fixtures', 'sound-baseline.sha256'))
  const ids = fs.readdirSync(path.join(ROOT, 'specs')).filter(f => f.endsWith('.json')).map(f => f.replace(/\.json$/, '')).sort()
  assert.deepEqual(Object.keys(b).sort(), ids, 'test/fixtures/sound-baseline.sha256 must list every spec: after a verified audio change, npm run sound:baseline')
  for (const h of Object.values(b)) assert.match(h, /^[0-9a-f]{64}$/)
})
