import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fmtNum, money, typed, markup, plain, captionAt, prog, tween, ease } from '../runtime/core.js'
import { mix, KINDS, RATE } from '../src/audio.mjs'
import { launch, readSpec } from '../src/page.mjs'
import { checkSpec } from '../src/check.mjs'
import { renderSpec } from '../src/render.mjs'

const here = path.dirname(new URL(import.meta.url).pathname)

test('number formatting', () => {
  assert.equal(money(185535.4), '$185,535')
  assert.equal(money(4160, { approx: true }), '≈ $4,160')
  assert.equal(money(-57.5, { dp: 2 }), '−$57.50')
  assert.equal(money(1.2345e12, { compact: true, dp: 2 }), '$1.23T')
  assert.equal(fmtNum(7, { suffix: '%', sign: true }), '+7%')
})

test('typing counts graphemes, markup escapes', () => {
  assert.equal(typed('$20 × 40', 0.5), '$20 ')
  assert.equal(typed('👍🏽ab', 1 / 3), '👍🏽')
  assert.equal(markup('a **$5** <b> __x__\nz'), 'a <em>$5</em> &lt;b&gt; <u class="mark2">x</u><br>z')
  assert.equal(plain('**$5** __a__'), '$5 a')
})

test('time helpers', () => {
  assert.equal(prog(1, 0, 2), 0.5)
  assert.equal(tween(5, 0, 1, 0, 10), 10)
  for (const e of Object.values(ease)) { assert.ok(Math.abs(e(0)) < 1e-9); assert.ok(Math.abs(e(1) - 1) < 1e-3) }
  const vo = [{ t: 0, text: 'a' }, { t: 2, d: 1, text: 'b' }]
  assert.equal(captionAt(vo, 1).line.text, 'a')
  assert.equal(captionAt(vo, 2.5).line.text, 'b')
  assert.equal(captionAt(vo, 3.5), null)
})

test('every sfx kind synthesises into a clean, bounded mix', () => {
  const cues = KINDS.map((kind, i) => ({ t: i * 0.3, kind }))
  const out = mix(cues, KINDS.length * 0.3 + 1)
  assert.equal(out.length, Math.round((KINDS.length * 0.3 + 1) * RATE))
  let peak = 0
  for (const v of out) { assert.ok(Number.isFinite(v)); peak = Math.max(peak, Math.abs(v)) }
  assert.ok(peak > 0.1 && peak <= 1)
  assert.throws(() => mix([{ t: 0, kind: 'nope' }], 1))
})

test('linter: clean spec passes, bad spec fails with the right rules', async () => {
  const b = await launch()
  try {
    const good = await checkSpec(b, readSpec(path.join(here, 'specs/counter.json')), { every: 1 })
    assert.deepEqual(good.errors, [])
    const bad = await checkSpec(b, readSpec(path.join(here, 'specs/bad.json')), { every: 1 })
    const rules = new Set(bad.errors.map(e => e.rule))
    assert.ok(rules.has('hook-number'))
    assert.ok(rules.has('type-floor'))
  } finally { await b.close() }
})

test('render: mp4 with video + audio of the spec duration', async () => {
  const b = await launch()
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'studio-'))
  try {
    const r = await renderSpec(b, readSpec(path.join(here, 'specs/counter.json')), { outDir: dir, preset: 'ultrafast' })
    const probe = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height,duration', '-of', 'json', r.mp4]).toString()
    const streams = JSON.parse(probe).streams
    const v = streams.find(s => s.codec_type === 'video'), a = streams.find(s => s.codec_type === 'audio')
    assert.equal(v.width, 1080); assert.equal(v.height, 1920)
    assert.ok(Math.abs(+v.duration - 6) < 0.05)
    assert.ok(a && Math.abs(+a.duration - 6) < 0.06)
    assert.ok(!fs.existsSync(path.join(dir, 't-counter.sfx.wav')))
  } finally { await b.close(); fs.rmSync(dir, { recursive: true, force: true }) }
})
