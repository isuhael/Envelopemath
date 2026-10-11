// WAV I/O: 32-bit float stereo (the engine's master and stems) and a reader for float/PCM WAVs (audit, tests).
import fs from 'node:fs'
import crypto from 'node:crypto'
import { SR } from './dsp.mjs'

/** encode a stereo (or mono) buffer as a 32-bit IEEE float WAV (format 3), 48 kHz. Returns a Buffer. */
export function encodeWavF32(b, rate = SR) {
  const chans = b.L ? [b.L, b.R] : [b]
  const C = chans.length, n = chans[0].length, bytes = n * C * 4
  const buf = Buffer.alloc(44 + bytes)
  buf.write('RIFF', 0); buf.writeUInt32LE(36 + bytes, 4); buf.write('WAVE', 8); buf.write('fmt ', 12)
  buf.writeUInt32LE(16, 16); buf.writeUInt16LE(3, 20); buf.writeUInt16LE(C, 22); buf.writeUInt32LE(rate, 24)
  buf.writeUInt32LE(rate * C * 4, 28); buf.writeUInt16LE(C * 4, 32); buf.writeUInt16LE(32, 34); buf.write('data', 36); buf.writeUInt32LE(bytes, 40)
  const f = new Float32Array(n * C)
  for (let i = 0; i < n; i++) for (let c = 0; c < C; c++) f[i * C + c] = chans[c][i]
  Buffer.from(f.buffer).copy(buf, 44)
  return buf
}
export function writeWavF32(file, b, rate = SR) {
  const buf = encodeWavF32(b, rate)
  fs.writeFileSync(file, buf)
  return crypto.createHash('sha256').update(buf).digest('hex')
}
export const sha256 = buf => crypto.createHash('sha256').update(buf).digest('hex')

/** read a WAV (PCM 16/24/32 or float 32) -> { rate, L, R } (mono files give L === R) */
export function readWav(file) {
  const buf = fs.readFileSync(file)
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WAVE') throw new Error(`${file}: not a WAV`)
  let p = 12, fmt = null, data = null
  while (p + 8 <= buf.length) {
    const id = buf.toString('ascii', p, p + 4), size = buf.readUInt32LE(p + 4)
    if (id === 'fmt ') fmt = { format: buf.readUInt16LE(p + 8), ch: buf.readUInt16LE(p + 10), rate: buf.readUInt32LE(p + 12), bits: buf.readUInt16LE(p + 22) }
    if (id === 'data') { data = { off: p + 8, size: Math.min(size, buf.length - p - 8) }; break }
    p += 8 + size + (size & 1)
  }
  if (!fmt || !data) throw new Error(`${file}: no fmt/data chunk`)
  const B = fmt.bits / 8, n = Math.floor(data.size / (B * fmt.ch))
  const ch = Array.from({ length: fmt.ch }, () => new Float32Array(n))
  const fmtCode = fmt.format === 0xfffe ? (fmt.bits === 32 ? 3 : 1) : fmt.format
  for (let i = 0; i < n; i++) for (let c = 0; c < fmt.ch; c++) {
    const o = data.off + (i * fmt.ch + c) * B
    ch[c][i] = fmtCode === 3 ? buf.readFloatLE(o) : B === 2 ? buf.readInt16LE(o) / 32768 : B === 3 ? buf.readIntLE(o, 3) / 8388608 : buf.readInt32LE(o) / 2147483648
  }
  return { rate: fmt.rate, L: ch[0], R: ch[1] || ch[0] }
}
