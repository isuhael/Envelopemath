import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { fmtNum, money, typed, markup, plain, captionAt, prog, tween, ease } from '../runtime/core.js'
import { mix, KINDS, RATE } from '../src/audio.mjs'
import { launch, readSpec, loadBrand, openSpec, grabber } from '../src/page.mjs'
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
    const r = await renderSpec(b, readSpec(path.join(here, 'specs/counter.json'), { brand: false }), { outDir: dir, preset: 'ultrafast' })
    const probe = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height,duration', '-of', 'json', r.mp4]).toString()
    const streams = JSON.parse(probe).streams
    const v = streams.find(s => s.codec_type === 'video'), a = streams.find(s => s.codec_type === 'audio')
    assert.equal(v.width, 1080); assert.equal(v.height, 1920)
    assert.ok(Math.abs(+v.duration - 6) < 0.05)
    assert.ok(a && Math.abs(+a.duration - 6) < 0.06)
    assert.ok(!fs.existsSync(path.join(dir, 't-counter.sfx.wav')))
  } finally { await b.close(); fs.rmSync(dir, { recursive: true, force: true }) }
})

// ---------- brand layer ----------
function tmpBrand(over = {}, logoPng = null) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'brand-'))
  const cfg = { name: 'Test', handle: '@test', logo: 'logo.png', logoShape: 'circle',
    cta: { line: 'Follow for the math behind your money', kicker: 'shown, not hand-waved.', dur: 2.5 }, ...over }
  fs.writeFileSync(path.join(dir, 'brand.json'), JSON.stringify(cfg))
  if (logoPng) fs.writeFileSync(path.join(dir, 'logo.png'), logoPng)
  return { dir, config: path.join(dir, 'brand.json') }
}

test('brand: config resolution (default on, opt-outs, missing logo falls back)', () => {
  const spec = path.join(here, 'specs/counter.json')
  const def = readSpec(spec)
  assert.ok(def.brand && def.brand.cta && def.brand.cta.line === 'Follow for the math behind your money')
  assert.equal(def.brand.handle, '@envelopemath')
  assert.equal(readSpec(spec, { brand: false }).brand, null)
  const t = tmpBrand()
  try {
    const b = loadBrand({ config: t.config })
    assert.equal(b.logoUrl, null)                       // no logo.png: the look keeps its mark
    fs.writeFileSync(path.join(t.dir, 'logo.png'), 'x')
    assert.match(loadBrand({ config: t.config }).logoUrl, /^http:\/\/studio\.local\/__brand\/[0-9a-f]+\/logo\.png$/)
    fs.writeFileSync(t.config, JSON.stringify({ cta: { line: 'x' }, logoShape: 'blob' }))
    assert.throws(() => loadBrand({ config: t.config }), /logoShape/)
    fs.writeFileSync(t.config, JSON.stringify({ enabled: false }))
    assert.equal(loadBrand({ config: t.config }), null)
    const off = path.join(t.dir, 'off.json')
    fs.writeFileSync(off, JSON.stringify({ ...JSON.parse(fs.readFileSync(spec, 'utf8')), brand: false }))
    assert.equal(readSpec(off).brand, null)             // a spec can opt out
  } finally { fs.rmSync(t.dir, { recursive: true, force: true }) }
})

test('brand: end card after the teaser, teaser frames untouched, card linted', async () => {
  const b = await launch()
  const t = tmpBrand()
  try {
    const file = path.join(here, 'specs/counter.json')
    // a square test logo, drawn by Chromium
    const pg = await b.newPage({ viewport: { width: 64, height: 64 } })
    await pg.setContent('<body style="margin:0;background:#e8572a"></body>')
    fs.writeFileSync(path.join(t.dir, 'logo.png'), await pg.screenshot())
    await pg.close()

    const grabAt = async (spec, times) => {
      const { page, info, errors } = await openSpec(b, spec)
      const grab = await grabber(page, { format: 'png' })
      const out = []
      for (const x of times) { await page.evaluate(v => window.STUDIO.seek(v), typeof x === 'function' ? x(info) : x); out.push(await grab()) }
      const img = await page.evaluate(() => [...document.images].map(i => ({ ok: i.complete && i.naturalWidth > 0, r: getComputedStyle(i.parentElement).borderRadius })))
      await page.close()
      return { out, info, errors, img }
    }
    const hold = i => i.base - 1 / i.fps
    const plain = await grabAt(readSpec(file, { brand: false }), [1, hold])
    const branded = await grabAt(readSpec(file, { brand: { config: t.config } }), [1, hold, i => i.base + 2])
    assert.equal(plain.info.duration, 6)
    assert.equal(branded.info.base, 6)
    assert.ok(Math.abs(branded.info.duration - 8.5) < 1e-9)
    assert.deepEqual(branded.info.brand, { logo: true, card: 'generic', t0: 6, dur: 2.5 })
    assert.ok(branded.info.sfx.some(c => c.kind === 'whoosh' && Math.abs(c.t - 6) < 1e-6))
    assert.ok(branded.out[0].equals(plain.out[0]), 'frame at 1 s unchanged by the brand')
    assert.ok(branded.out[1].equals(plain.out[1]), 'last teaser frame unchanged by the brand')
    assert.ok(!branded.out[2].equals(plain.out[1]), 'the end card shows')
    assert.deepEqual(branded.img, [{ ok: true, r: '50%' }])   // the logo is decoded before frame 0, circle-cropped
    assert.deepEqual(branded.errors, [])

    const clean = await checkSpec(b, readSpec(file, { brand: { config: t.config } }), { every: 0.5 })
    assert.deepEqual(clean.errors, [])
    assert.ok(Math.abs(clean.duration - 8.5) < 1e-9)
    // the card is linted like the rest: a handle too long for the safe zone fails
    fs.writeFileSync(t.config, JSON.stringify({ ...JSON.parse(fs.readFileSync(t.config, 'utf8')), handle: '@' + 'envelopemath'.repeat(4) }))
    const bad = await checkSpec(b, readSpec(file, { brand: { config: t.config } }), { every: 0.5 })
    assert.ok(bad.errors.some(e => e.rule === 'safe-zone' && /envelopemath/.test(e.text)))
  } finally { await b.close(); fs.rmSync(t.dir, { recursive: true, force: true }) }
})
