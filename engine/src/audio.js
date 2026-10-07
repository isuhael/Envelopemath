// Synthesised foley for the paper world: pen scribbles, stamp thumps, tape, paper, ticks, dings.
// Everything is generated from seeded noise and sines, so renders need no audio assets.
import fs from 'node:fs'
import { OPS } from './timeline.js'
import { rng } from './util.js'

export const RATE = 48000

// one-pole low/high-pass filters
function lowpass(buf, hz) {
  const a = Math.exp((-2 * Math.PI * hz) / RATE)
  let y = 0
  for (let i = 0; i < buf.length; i++) { y = (1 - a) * buf[i] + a * y; buf[i] = y }
  return buf
}
function highpass(buf, hz) {
  const a = Math.exp((-2 * Math.PI * hz) / RATE)
  let y = 0, px = 0
  for (let i = 0; i < buf.length; i++) { y = a * (y + buf[i] - px); px = buf[i]; buf[i] = y }
  return buf
}
const noise = (n, r) => Float32Array.from({ length: n }, () => r() * 2 - 1)
const sec = s => Math.max(1, Math.round(s * RATE))

const SYNTH = {
  // ballpoint on paper: band-limited noise in stroke-shaped bursts
  scribble(r, { dur = 0.5, n = 10 }) {
    const len = sec(dur)
    const b = highpass(lowpass(noise(len, r), 5200), 1400)
    const rate = Math.max(6, Math.min(16, n / Math.max(dur, 0.1)))
    for (let i = 0; i < len; i++) {
      const t = i / RATE
      const stroke = Math.max(0, Math.sin(2 * Math.PI * rate * t + Math.sin(t * 13) * 2))
      b[i] *= 0.55 * Math.pow(stroke, 1.6) * Math.min(1, t * 30, (dur - t) * 30)
    }
    return b
  },
  type(r, { dur = 0.5, n = 10 }) {
    const out = new Float32Array(sec(dur + 0.05))
    for (let k = 0; k < n; k++) {
      const at = Math.floor((k / n) * dur * RATE)
      const click = highpass(noise(sec(0.012), r), 2000)
      for (let i = 0; i < click.length && at + i < out.length; i++) out[at + i] += click[i] * Math.exp(-i / 90) * 0.8
    }
    return out
  },
  stamp(r) {
    const len = sec(0.32)
    const b = new Float32Array(len)
    const thud = lowpass(noise(len, r), 900)
    for (let i = 0; i < len; i++) {
      const t = i / RATE
      const f = 90 - 45 * Math.min(1, t / 0.12)
      b[i] = Math.sin(2 * Math.PI * f * t) * Math.exp(-t * 18) * 0.9 + thud[i] * Math.exp(-t * 45) * 1.4
    }
    return b
  },
  tape(r) {
    const len = sec(0.16)
    const b = highpass(noise(len, r), 600)
    for (let i = 0; i < len; i++) b[i] *= 0.45 * Math.exp(-(i / RATE) * 18) * (0.6 + 0.4 * Math.sin(i / 37))
    return b
  },
  paper(r) {
    const len = sec(0.4)
    const b = highpass(lowpass(noise(len, r), 3500), 300)
    for (let i = 0; i < len; i++) { const t = i / RATE; b[i] *= 0.5 * Math.sin(Math.PI * Math.min(1, t / 0.4)) * (0.5 + 0.5 * Math.abs(Math.sin(t * 60))) }
    return b
  },
  whoosh(r) {
    const len = sec(0.45)
    const b = noise(len, r)
    let y = 0
    for (let i = 0; i < len; i++) {
      const t = i / RATE
      const hz = 200 + 2600 * Math.sin(Math.PI * (t / 0.45))
      const a = Math.exp((-2 * Math.PI * hz) / RATE)
      y = (1 - a) * b[i] + a * y
      b[i] = y * 0.7 * Math.sin(Math.PI * (t / 0.45))
    }
    return b
  },
  tick(r) {
    const b = highpass(noise(sec(0.02), r), 3000)
    for (let i = 0; i < b.length; i++) b[i] *= Math.exp(-i / 60) * 0.5
    return b
  },
  ticks(r, { dur = 1 }) {
    const out = new Float32Array(sec(dur + 0.05))
    for (let at = 0; at < dur; at += 0.06) {
      const tk = SYNTH.tick(r)
      const o = sec(at)
      for (let i = 0; i < tk.length && o + i < out.length; i++) out[o + i] += tk[i] * 0.45
    }
    return out
  },
  pop(r) {
    const len = sec(0.09)
    const b = new Float32Array(len)
    for (let i = 0; i < len; i++) { const t = i / RATE; b[i] = Math.sin(2 * Math.PI * (380 + 5200 * t) * t) * Math.exp(-t * 40) * 0.4 }
    return b
  },
  ding() {
    const len = sec(1.3)
    const b = new Float32Array(len)
    for (let i = 0; i < len; i++) { const t = i / RATE; b[i] = (Math.sin(2 * Math.PI * 1318.5 * t) + 0.35 * Math.sin(2 * Math.PI * 2637 * t)) * Math.exp(-t * 4) * 0.3 }
    return b
  },
  chime() {
    const len = sec(1.6)
    const b = new Float32Array(len)
    for (let i = 0; i < len; i++) {
      const t = i / RATE
      b[i] = Math.sin(2 * Math.PI * 1046.5 * t) * Math.exp(-t * 3.5) * 0.22
      if (t > 0.14) b[i] += Math.sin(2 * Math.PI * 1568 * (t - 0.14)) * Math.exp(-(t - 0.14) * 3.5) * 0.22
    }
    return b
  },
  cash(r) {
    const len = sec(0.07)
    const b = highpass(noise(len, r), 2500)
    for (let i = 0; i < len; i++) b[i] *= Math.exp(-(i / RATE) * 50) * 0.5
    return b
  },
  print(r) {
    const len = sec(0.12)
    const b = lowpass(noise(len, r), 2400)
    for (let i = 0; i < len; i++) { const t = i / RATE; b[i] = b[i] * 0.35 * (Math.sin(2 * Math.PI * 120 * t) > 0 ? 1 : 0.3) }
    return b
  },
}

export function sfxEvents(spec) {
  const ev = []
  for (const op of spec._ops) {
    for (const e of OPS[op.type].sfx?.(op) || []) {
      if (op.until != null && e.at >= op.until) continue
      ev.push(e)
    }
  }
  for (const f of spec._flips) ev.push({ at: f.t, kind: 'whoosh' })
  return ev.filter(e => e.at < spec.duration).sort((a, b) => a.at - b.at)
}

/** Mix the spec's foley into a mono float buffer covering the whole duration. */
export function mix(spec) {
  const out = new Float32Array(sec(spec.duration))
  const r = rng(99)
  for (const e of sfxEvents(spec)) {
    const synth = SYNTH[e.kind]
    if (!synth) throw new Error(`no synth for sfx "${e.kind}"`)
    const buf = synth(r, e)
    const o = sec(e.at)
    const gain = (e.gain ?? 1) * (spec.sfxGain ?? 1)
    for (let i = 0; i < buf.length && o + i < out.length; i++) out[o + i] += buf[i] * gain
  }
  for (let i = 0; i < out.length; i++) out[i] = Math.tanh(out[i] * 1.2) * 0.9
  return out
}

export function writeWav(file, mono) {
  const n = mono.length
  const buf = Buffer.alloc(44 + n * 4)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVE', 8)
  buf.write('fmt ', 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22)
  buf.writeUInt32LE(RATE, 24); buf.writeUInt32LE(RATE * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34)
  buf.write('data', 36); buf.writeUInt32LE(n * 4, 40)
  for (let i = 0; i < n; i++) {
    const s = Math.max(-1, Math.min(1, mono[i])) * 32767
    buf.writeInt16LE(s | 0, 44 + i * 4)
    buf.writeInt16LE(s | 0, 46 + i * 4)
  }
  fs.writeFileSync(file, buf)
}
