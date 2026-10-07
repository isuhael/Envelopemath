// Synthesised UI sound design for the studio looks: clean digital ticks, pops and counters (no paper foley).
// Everything comes from seeded noise and oscillators, so renders need no audio assets.
// The voice-over is recorded separately; this track only carries SFX, mixed low enough to sit under a voice.
import fs from 'node:fs'

export const RATE = 48000
const sec = s => Math.max(1, Math.round(s * RATE))
const TAU = Math.PI * 2

function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let x = Math.imul(a ^ (a >>> 15), 1 | a)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
}
function lowpass(b, hz) { const a = Math.exp(-TAU * hz / RATE); let y = 0; for (let i = 0; i < b.length; i++) { y = (1 - a) * b[i] + a * y; b[i] = y } return b }
function highpass(b, hz) { const a = Math.exp(-TAU * hz / RATE); let y = 0, px = 0; for (let i = 0; i < b.length; i++) { y = a * (y + b[i] - px); px = b[i]; b[i] = y } return b }
const noise = (n, r) => Float32Array.from({ length: n }, () => r() * 2 - 1)
const env = (t, a, d) => (t < a ? t / a : Math.exp(-(t - a) / d))

/** sine/triangle blip with a pitch glide */
function blip(f0, f1, dur, { decay = dur / 4, tri = 0, gain = 0.6 } = {}) {
  const n = sec(dur), b = new Float32Array(n)
  let ph = 0
  for (let i = 0; i < n; i++) {
    const t = i / RATE, f = f0 * Math.pow(f1 / f0, t / dur)
    ph += TAU * f / RATE
    const sine = Math.sin(ph), triw = (2 / Math.PI) * Math.asin(Math.sin(ph))
    b[i] = gain * ((1 - tri) * sine + tri * triw) * env(t, 0.002, decay)
  }
  return b
}
function click(r, { dur = 0.03, hz = 3500, gain = 0.5 } = {}) {
  const b = highpass(lowpass(noise(sec(dur), r), hz * 1.6), hz * 0.4)
  for (let i = 0; i < b.length; i++) b[i] *= gain * env(i / RATE, 0.0005, dur / 5)
  return b
}
function addInto(dst, src, at, g = 1) { for (let i = 0; i < src.length && at + i < dst.length; i++) if (at + i >= 0) dst[at + i] += src[i] * g; return dst }

const SYNTH = {
  // a single soft UI tick (row lands, cell fills)
  tick: r => click(r, { dur: 0.035, hz: 4200, gain: 0.45 }),
  // keyboard typing over `dur` seconds (formula bar, typed formula)
  type(r, { dur = 0.6, n } = {}) {
    const count = n || Math.max(3, Math.round(dur * 14))
    const out = new Float32Array(sec(dur + 0.06))
    for (let k = 0; k < count; k++) addInto(out, click(r, { dur: 0.03, hz: 2600 + r() * 1800, gain: 0.32 + r() * 0.12 }), Math.floor((k / count) * dur * RATE + r() * 0.012 * RATE))
    return out
  },
  // bubbly pop (a value lands / highlighter appears)
  pop: () => blip(520, 1250, 0.12, { decay: 0.03, gain: 0.5 }),
  // two-note confirmation (an answer lands)
  ding() {
    const out = new Float32Array(sec(0.7))
    addInto(out, blip(1318.5, 1318.5, 0.7, { decay: 0.16, tri: 0.2, gain: 0.32 }), 0)
    addInto(out, blip(1975.5, 1975.5, 0.6, { decay: 0.14, tri: 0.2, gain: 0.24 }), sec(0.07))
    return out
  },
  // the big reveal: low thump + chime
  reveal(r) {
    const out = new Float32Array(sec(1.1))
    addInto(out, blip(150, 48, 0.45, { decay: 0.12, gain: 0.9 }), 0)
    addInto(out, SYNTH.ding(r), sec(0.03), 0.9)
    return out
  },
  // low thud (a weight drops, a bar slams, a crash row)
  thud: () => blip(120, 42, 0.4, { decay: 0.09, gain: 0.95 }),
  // airy whoosh (scene change, pointer glide)
  whoosh(r, { dur = 0.35 } = {}) {
    const n = sec(dur), b = noise(n, r)
    let y = 0
    for (let i = 0; i < n; i++) {
      const p = i / n, hz = 600 + 4200 * Math.sin(Math.PI * p)
      const a = Math.exp(-TAU * hz / RATE); y = (1 - a) * b[i] + a * y
      b[i] = y * 0.55 * Math.sin(Math.PI * p)
    }
    return highpass(b, 300)
  },
  // rising riser over `dur` (counter running, race running)
  riser(r, { dur = 2 } = {}) {
    const n = sec(dur), b = new Float32Array(n), nz = noise(n, r)
    let ph = 0
    for (let i = 0; i < n; i++) {
      const p = i / n, f = 180 * Math.pow(4, p)
      ph += TAU * f / RATE
      b[i] = (0.16 * Math.sin(ph) + 0.05 * nz[i]) * Math.min(1, p * 4) * (0.35 + 0.65 * p)
    }
    return lowpass(b, 3000)
  },
  // counter roll: ticks accelerating then settling over `dur`
  roll(r, { dur = 1.5, rate = 22 } = {}) {
    const out = new Float32Array(sec(dur + 0.05))
    let t = 0, k = 0
    while (t < dur) {
      const p = t / dur
      addInto(out, click(r, { dur: 0.02, hz: 3000 + 2000 * p, gain: 0.26 }), Math.floor(t * RATE))
      t += 1 / (rate * (0.6 + 0.8 * Math.sin(Math.PI * Math.min(1, p * 1.2)))); k++
    }
    return out
  },
  // cash register (a money total lands)
  cash(r) {
    const out = new Float32Array(sec(0.9))
    for (let k = 0; k < 6; k++) addInto(out, click(r, { dur: 0.04, hz: 5000, gain: 0.25 }), sec(k * 0.025))
    addInto(out, blip(2637, 2637, 0.8, { decay: 0.2, tri: 0.4, gain: 0.25 }), sec(0.12))
    addInto(out, blip(3520, 3520, 0.6, { decay: 0.15, tri: 0.4, gain: 0.16 }), sec(0.16))
    return out
  },
  // wrong / loss buzz
  buzz: () => {
    const n = sec(0.35), b = new Float32Array(n)
    for (let i = 0; i < n; i++) { const t = i / RATE; b[i] = 0.22 * Math.sign(Math.sin(TAU * 110 * t)) * env(t, 0.005, 0.12) }
    return lowpass(b, 1800)
  },
  // cartoon bounce (Becker rig: objects land)
  boing: () => blip(220, 660, 0.25, { decay: 0.08, tri: 0.6, gain: 0.45 }),
  // light step / pat (Becker rig: figure walks or pushes)
  step: r => highpass(lowpass(click(r, { dur: 0.06, hz: 900, gain: 0.5 }), 1400), 120),
  // strike / impact (Becker rig: something hits)
  hit(r) {
    const out = new Float32Array(sec(0.5))
    addInto(out, blip(200, 55, 0.3, { decay: 0.07, gain: 0.9 }), 0)
    addInto(out, click(r, { dur: 0.08, hz: 2200, gain: 0.5 }), 0)
    return out
  },
  // soft swipe for a pointer / highlighter stroke
  swipe(r, { dur = 0.22 } = {}) {
    const b = highpass(lowpass(noise(sec(dur), r), 6000), 2000)
    for (let i = 0; i < b.length; i++) { const p = i / b.length; b[i] *= 0.3 * Math.sin(Math.PI * p) }
    return b
  },
}
export const KINDS = Object.keys(SYNTH)

/** Mix cue list [{ t, kind, gain?, ...opts }] into a mono buffer of `duration` seconds. */
export function mix(cues, duration, { seed = 7, master = 0.8 } = {}) {
  const out = new Float32Array(sec(duration))
  const r = rng(seed)
  for (const c of cues) {
    const fn = SYNTH[c.kind]
    if (!fn) throw new Error(`unknown sfx kind "${c.kind}" (have: ${KINDS.join(', ')})`)
    addInto(out, fn(r, c), Math.floor(c.t * RATE), c.gain ?? 1)
  }
  let peak = 0
  for (const v of out) peak = Math.max(peak, Math.abs(v))
  const g = peak > 0 ? Math.min(master / peak, 1.6) : 1
  for (let i = 0; i < out.length; i++) out[i] = Math.tanh(out[i] * g * 1.1) * 0.85
  // 8 ms fades so the clip never starts or ends on a click
  const f = sec(0.008)
  for (let i = 0; i < f && i < out.length; i++) { out[i] *= i / f; out[out.length - 1 - i] *= i / f }
  return out
}

export function writeWav(file, mono) {
  const n = mono.length, buf = Buffer.alloc(44 + n * 2)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 2, 4); buf.write('WAVE', 8); buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(1, 22); buf.writeUInt32LE(RATE, 24)
  buf.writeUInt32LE(RATE * 2, 28); buf.writeUInt16LE(2, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 2, 40)
  for (let i = 0; i < n; i++) buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(mono[i] * 32767))), 44 + i * 2)
  fs.writeFileSync(file, buf)
}
