// Output: MP4 (raw frames piped into ffmpeg + synthesised foley), single stills, contact sheets.
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createCanvas } from '@napi-rs/canvas'
import { W, H, SAFE, CAPTION_BAND } from './theme.js'
import { drawFrame } from './timeline.js'
import { mix, writeWav } from './audio.js'
import { fmtNum } from './util.js'

function surface(scale) {
  const w = Math.round((W * scale) / 2) * 2
  const h = Math.round((H * scale) / 2) * 2
  const c = createCanvas(w, h)
  const g = c.getContext('2d')
  return { c, g, w, h, reset: () => g.setTransform(w / W, 0, 0, h / H, 0, 0) }
}

export async function renderVideo(spec, { out, scale = 1, audio = true, crf = 20, onProgress } = {}) {
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
  const { c, g, w, h, reset } = surface(scale)
  let wav = null
  if (audio) {
    wav = path.join(os.tmpdir(), `envelope-${process.pid}-${Date.now()}.wav`)
    writeWav(wav, mix(spec))
  }
  const args = [
    '-y', '-loglevel', 'error',
    '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${w}x${h}`, '-r', String(spec.fps), '-i', '-',
    ...(wav ? ['-i', wav] : []),
    '-c:v', 'libx264', '-preset', 'veryfast', '-crf', String(crf), '-pix_fmt', 'yuv420p',
    ...(wav ? ['-c:a', 'aac', '-b:a', '160k', '-shortest'] : []),
    '-movflags', '+faststart', out,
  ]
  const ff = spawn('ffmpeg', args, { stdio: ['pipe', 'inherit', 'inherit'] })
  const done = once(ff, 'close')
  const frames = Math.round(spec.duration * spec.fps)
  for (let f = 0; f < frames; f++) {
    reset()
    drawFrame(g, spec, f / spec.fps)
    if (!ff.stdin.write(c.data())) await once(ff.stdin, 'drain')
    if (onProgress && f % spec.fps === 0) onProgress(f / frames)
  }
  ff.stdin.end()
  const [code] = await done
  if (wav) fs.rmSync(wav, { force: true })
  if (code !== 0) throw new Error(`ffmpeg exited with ${code}`)
  return { out, frames, size: `${w}x${h}` }
}

function safeOverlay(g) {
  g.save()
  g.fillStyle = 'rgba(255,0,80,0.18)'
  g.fillRect(0, 0, W, SAFE.y0)
  g.fillRect(0, SAFE.y1, W, H - SAFE.y1)
  g.fillRect(SAFE.x1, SAFE.y0, W - SAFE.x1, SAFE.railY - SAFE.y0)
  g.fillRect(SAFE.railX, SAFE.railY, W - SAFE.railX, SAFE.y1 - SAFE.railY)
  g.fillRect(0, SAFE.y0, SAFE.x0, SAFE.y1 - SAFE.y0)
  g.strokeStyle = 'rgba(255,0,80,0.8)'
  g.setLineDash([16, 10])
  g.lineWidth = 3
  g.beginPath()
  g.moveTo(SAFE.x0, SAFE.y0); g.lineTo(SAFE.x1, SAFE.y0); g.lineTo(SAFE.x1, SAFE.railY); g.lineTo(SAFE.railX, SAFE.railY)
  g.lineTo(SAFE.railX, SAFE.y1); g.lineTo(SAFE.x0, SAFE.y1); g.closePath()
  g.stroke()
  g.fillStyle = 'rgba(255,200,0,0.12)'
  g.fillRect(SAFE.x0, CAPTION_BAND.y0, SAFE.railX - SAFE.x0, CAPTION_BAND.y1 - CAPTION_BAND.y0)
  g.restore()
}

export function renderStill(spec, t, { out, scale = 0.5, safe = false } = {}) {
  const { c, g, reset } = surface(scale)
  reset()
  drawFrame(g, spec, t)
  if (safe) safeOverlay(g)
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
  fs.writeFileSync(out, c.toBuffer('image/png'))
  return out
}

/** A grid of thumbnails across the timeline — the fastest way to eyeball a whole teaser. */
export function renderSheet(spec, { out, n = 12, times, cols = 6, thumb = 0.25, safe = false } = {}) {
  const ts = times || Array.from({ length: n }, (_, i) => +(((i + 0.5) / n) * spec.duration).toFixed(2))
  const { c: fc, g: fg, reset } = surface(thumb)
  const tw = fc.width, th = fc.height, pad = 8, label = 36
  const rows = Math.ceil(ts.length / cols)
  const sheet = createCanvas(cols * (tw + pad) + pad, rows * (th + pad + label) + pad)
  const sg = sheet.getContext('2d')
  sg.fillStyle = '#222'
  sg.fillRect(0, 0, sheet.width, sheet.height)
  ts.forEach((t, i) => {
    reset()
    drawFrame(fg, spec, t)
    if (safe) safeOverlay(fg)
    const x = pad + (i % cols) * (tw + pad), y = pad + Math.floor(i / cols) * (th + pad + label)
    sg.drawImage(fc, x, y)
    sg.fillStyle = '#eee'
    sg.font = '700 24px Inter'
    sg.fillText(`${fmtNum(t, { decimals: 2 })}s`, x + 6, y + th + 28)
  })
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
  fs.writeFileSync(out, sheet.toBuffer('image/png'))
  return out
}
