import { test } from 'node:test'
import assert from 'node:assert/strict'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { createCanvas } from '@napi-rs/canvas'
import { fmtNum } from '../src/util.js'
import { prepare, drawFrame, OPS } from '../src/timeline.js'
import { lint } from '../src/check.js'
import { mix, RATE, sfxEvents } from '../src/audio.js'
import { series } from '../src/ops/charts.js'

const sfxKinds = spec => sfxEvents(spec)

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

test('a hook at t=0 is finished in frame 0 and makes no sound', () => {
  const spec = prepare({ ops: [{ type: 'hook', t: 0, text: 'hi' }, { type: 'hook', t: 2, text: 'later' }] })
  const [first, second] = spec._ops
  assert.equal(first.instant, true)
  assert.equal(second.instant, false)
  assert.ok(!sfxKinds(spec).some(e => e.at === 0 && e.kind === 'tape'))
})

test('counter steps run a total through each value', () => {
  const spec = prepare({ ops: [{ type: 'counter', t: 0, x: 540, y: 900, prefix: '$', decimals: 2, steps: [[0, 0], [1, 2.5], [2, 7.25]] }] })
  const op = spec._ops[0]
  assert.equal(op.to, 7.25)
  assert.equal(OPS.counter.duration(op), 2.35)
})

test('annotate target lands on the matched text and inherits fixed', () => {
  const spec = prepare({
    ops: [
      { type: 'write', id: 'sum', t: 0, text: '$5 × 52 = $260', x: 100, y: 800 },
      { type: 'annotate', t: 1, kind: 'circle', target: { op: 'sum', match: '$260' } },
      { type: 'hook', id: 'h', t: 0, text: 'Dinner is FREE' },
      { type: 'annotate', t: 1, kind: 'strike', target: { op: 'h', match: 'FREE' } },
    ],
  })
  const circle = spec._ops.find(o => o.type === 'annotate' && o.kind === 'circle')
  const strike = spec._ops.find(o => o.type === 'annotate' && o.kind === 'strike')
  assert.ok(circle.x > 300 && circle.w > 60 && circle.w < 250, `circle at ${circle.x}, w ${circle.w}`)
  assert.equal(circle._fixed, false)
  assert.equal(strike._fixed, true)
  assert.throws(() => prepare({ ops: [{ type: 'write', id: 'a', t: 0, text: 'x', x: 0, y: 0 }, { type: 'annotate', t: 0, kind: 'circle', target: { op: 'a', match: 'zzz' } }] }), /not found/)
})

test('receipt rows honour per-row times; default schedule is one row per 1/lps', () => {
  const spec = prepare({
    ops: [
      { type: 'receipt', t: 0, x: 540, y: 400, header: 'H', items: [['a', '$1'], ['b', '$2']], total: ['T', '$3'] },
      { type: 'receipt', t: 0, x: 540, y: 400, header: 'H', compact: true, items: [{ label: 'a', value: '$1', at: 1 }, { label: 'b', value: '$2', at: 3 }], total: { label: 'T', value: '$3', at: 5 }, running: {} },
    ],
  })
  const [plain, timed] = spec._ops
  assert.deepEqual(plain._rows.map(r => r.at), [0, 0.25, 0.5, 0.75, 1, 1.25])
  assert.deepEqual(timed._rows.map(r => r.at), [0, 0, 1, 3, 3.25, 5])
})

test('an envelope without openAt stays sealed and silent after landing', () => {
  const spec = prepare({ ops: [{ type: 'envelope', t: 0.5, note: 'answer in the pin' }] })
  assert.deepEqual(sfxKinds(spec).map(e => e.kind), ['whoosh'])
})

test('loop crossfades the tail into frame 0', () => {
  const spec = prepare({ loop: true, duration: 3, ops: [{ type: 'hook', t: 0, text: 'start' }, { type: 'clear', t: 1 }, { type: 'write', t: 1.2, text: 'end', x: 100, y: 900 }] })
  const frame = t => {
    const c = createCanvas(270, 480)
    const g = c.getContext('2d')
    g.setTransform(0.25, 0, 0, 0.25, 0, 0)
    drawFrame(g, spec, t)
    return c.data()
  }
  // frame 0 is cached at full size and resampled, so compare the mean pixel difference
  const meanDiff = (a, b) => a.reduce((m, v, i) => m + Math.abs(v - b[i]), 0) / a.length
  const end = meanDiff(frame(2.999), frame(0)), mid = meanDiff(frame(2.0), frame(0))
  assert.ok(end < 1.5, `last frame should match frame 0 (mean diff ${end})`)
  assert.ok(mid > end * 3, `mid-video frame should differ from frame 0 (mean diff ${mid})`)
})

test('lint warns when frame 0 has no readable hook', () => {
  const bare = lint(prepare({ ops: [{ type: 'write', t: 0.5, text: 'late', x: 100, y: 900 }] }))
  assert.ok(bare.some(w => w.startsWith('frame 0')))
  const ok = lint(prepare({ ops: [{ type: 'hook', t: 0, text: 'number first' }] }))
  assert.ok(!ok.some(w => w.startsWith('frame 0')))
})
