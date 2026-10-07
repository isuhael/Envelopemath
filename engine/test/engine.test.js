import { test } from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { createCanvas } from '@napi-rs/canvas'
import { fmtNum } from '../src/util.js'
import { prepare, drawFrame } from '../src/timeline.js'
import { lint } from '../src/check.js'
import { mix, RATE } from '../src/audio.js'
import { series } from '../src/ops/charts.js'

const demo = JSON.parse(fs.readFileSync(new URL('../specs/_demo-all-ops.json', import.meta.url)))

test('fmtNum formats money', () => {
  assert.equal(fmtNum(1234567, { prefix: '$' }), '$1,234,567')
  assert.equal(fmtNum(1234567, { prefix: '$', compact: true, decimals: 1 }), '$1.2M')
  assert.equal(fmtNum(-42.5, { decimals: 2, suffix: '%' }), '-42.50%')
  assert.equal(fmtNum(999, { compact: true }), '999')
})

test('compound series matches the closed form', () => {
  const s = series({ type: 'compound', principal: 1000, rate: 0.07, years: 10, contrib: 0 })
  assert.equal(s.length, 11)
  assert.ok(Math.abs(s[10] - 1000 * 1.07 ** 10) < 1e-6)
  const c = series({ type: 'compound', principal: 0, rate: 0.07, years: 30, contrib: 1300 })
  assert.ok(Math.abs(c[30] - (1300 * (1.07 ** 30 - 1)) / 0.07) < 1e-6)
})

test('clear and flip end earlier ops, persist survives', () => {
  const spec = prepare({
    ops: [
      { type: 'postmark', t: 0, x: 200, y: 300, persist: true },
      { type: 'write', t: 0, text: 'a', x: 100, y: 700 },
      { type: 'clear', t: 2 },
      { type: 'write', t: 2.1, text: 'b', x: 100, y: 700 },
      { type: 'flip', t: 4, dur: 0.6 },
      { type: 'write', t: 5, text: 'c', x: 100, y: 700 },
    ],
  })
  const [pm, a, b, c] = spec._ops
  assert.equal(pm.until, undefined)
  assert.equal(a.until, 2)
  assert.equal(b.until, 4.3)
  assert.equal(b.fadeOut, 0)
  assert.equal(c.until, undefined)
})

test('unknown op types are rejected', () => {
  assert.throws(() => prepare({ ops: [{ type: 'nope', t: 0 }] }), /unknown type "nope"/)
})

test('lint flags text in the button rail and overlaps', () => {
  const spec = prepare({
    ops: [
      { type: 'write', t: 0, text: 'far too far right', x: 900, y: 1000 },
      { type: 'write', t: 0, text: 'overlap', x: 100, y: 700 },
      { type: 'write', t: 0.5, text: 'overlap', x: 120, y: 710 },
    ],
  })
  const w = lint(spec)
  assert.ok(w.some(m => m.includes('leaves the safe area')))
  assert.ok(w.some(m => m.includes('overlaps')))
})

test('frames are deterministic', () => {
  const spec = prepare(demo)
  const hashAt = t => {
    const c = createCanvas(270, 480)
    const g = c.getContext('2d')
    g.setTransform(0.25, 0, 0, 0.25, 0, 0)
    drawFrame(g, spec, t)
    return crypto.createHash('sha1').update(c.data()).digest('hex')
  }
  for (const t of [0.5, 5.6, 23.4]) assert.equal(hashAt(t), hashAt(t))
})

test('audio covers the whole duration without clipping', () => {
  const spec = prepare(demo)
  const a = mix(spec)
  assert.equal(a.length, Math.round(spec.duration * RATE))
  let peak = 0
  for (const v of a) peak = Math.max(peak, Math.abs(v))
  assert.ok(peak > 0.05 && peak <= 0.9)
})
