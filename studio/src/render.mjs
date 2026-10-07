// Render a spec to MP4 (frames seeked in Chromium, piped to ffmpeg), and stills / contact sheets for review.
import fs from 'node:fs'
import path from 'node:path'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { openSpec, grabber } from './page.mjs'
import { mix, writeWav } from './audio.mjs'

function ffmpeg(args) {
  const p = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: ['pipe', 'inherit', 'pipe'] })
  let err = ''
  p.stderr.on('data', d => { err += d })
  const done = new Promise((res, rej) => p.on('close', code => (code === 0 ? res() : rej(new Error(`ffmpeg exited ${code}: ${err.slice(-800)}`)))))
  return { p, done }
}

/**
 * Render one spec. Returns { mp4, duration, frames, sfx }.
 * opts: { outDir, crf = 18, preset = 'medium', onProgress(f, N) }
 */
export async function renderSpec(browser, spec, { outDir, crf = 18, preset = 'medium', onProgress } = {}) {
  fs.mkdirSync(outDir, { recursive: true })
  const { page, info, errors } = await openSpec(browser, spec)
  try {
    const fps = info.fps, N = Math.round(info.duration * fps)
    const wav = path.join(outDir, `${spec.id}.sfx.wav`)
    writeWav(wav, mix(info.sfx, info.duration))
    const mp4 = path.join(outDir, `${spec.id}.mp4`)
    const { p, done } = ffmpeg([
      '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
      '-i', wav,
      '-map', '0:v', '-map', '1:a',
      '-c:v', 'libx264', '-preset', preset, '-tune', 'animation', '-crf', String(crf), '-pix_fmt', 'yuv420p', '-r', String(fps),
      '-c:a', 'aac', '-b:a', '160k', '-movflags', '+faststart', '-shortest', mp4,
    ])
    const grab = await grabber(page)
    for (let f = 0; f < N; f++) {
      await page.evaluate(x => window.STUDIO.seek(x), f / fps)
      const buf = await grab()
      if (!p.stdin.write(buf)) await once(p.stdin, 'drain')
      if (onProgress && f % fps === 0) onProgress(f, N)
    }
    p.stdin.end()
    await done
    fs.rmSync(wav, { force: true })
    if (errors.length) throw new Error(`${spec.id}: page errors during render:\n${errors.join('\n')}`)
    return { mp4, duration: info.duration, frames: N, sfx: info.sfx.length }
  } finally {
    await page.close()
  }
}

/** times: numbers (seconds) or 'end'. Writes <dir>/<id>@<t>.png and returns the paths. */
export async function renderStills(browser, spec, times, dir) {
  fs.mkdirSync(dir, { recursive: true })
  const { page, info } = await openSpec(browser, spec)
  const out = []
  try {
    const grab = await grabber(page, { format: 'png' })
    for (const x of times) {
      const t = x === 'end' ? info.duration - 1 / info.fps : Math.min(+x, info.duration - 1 / info.fps)
      await page.evaluate(v => window.STUDIO.seek(v), t)
      const f = path.join(dir, `${spec.id}@${t.toFixed(2)}.png`)
      fs.writeFileSync(f, await grab())
      out.push({ t, file: f })
    }
  } finally {
    await page.close()
  }
  return { stills: out, info }
}

/**
 * Contact sheet: n frames spread over the video (plus t = 0 and the last frame), tiled with timestamps.
 * Good for review: one image shows the whole teaser.
 */
export async function contactSheet(browser, spec, file, { n = 12, cols = 6, times } = {}) {
  const { page, info } = await openSpec(browser, spec)
  const shots = []
  try {
    const grab = await grabber(page, { format: 'jpeg', quality: 88 })
    const last = info.duration - 1 / info.fps
    const ts = times || Array.from({ length: n }, (_, i) => (i === n - 1 ? last : (i * info.duration) / (n - 1)))
    for (const t of ts) {
      await page.evaluate(v => window.STUDIO.seek(v), t)
      shots.push({ t, b64: (await grab()).toString('base64') })
    }
  } finally {
    await page.close()
  }
  const sheet = await browser.newPage({ viewport: { width: 100, height: 100 } })
  const w = 270, hgt = 480
  const html = `<html><body style="margin:0;background:#202227;padding:14px;font:600 18px system-ui;color:#ddd;width:${cols * (w + 14) + 14}px">
    <div style="font:700 22px system-ui;color:#fff;margin:0 0 10px">${spec.id} · ${spec.look} · ${spec.format} · ${info.duration.toFixed(1)} s</div>
    <div style="display:grid;grid-template-columns:repeat(${cols},${w}px);gap:14px">
    ${shots.map(s => `<figure style="margin:0"><img src="data:image/jpeg;base64,${s.b64}" style="width:${w}px;height:${hgt}px;display:block;border-radius:6px"><figcaption style="padding-top:4px">${s.t.toFixed(2)} s</figcaption></figure>`).join('')}
    </div></body></html>`
  await sheet.setContent(html, { waitUntil: 'load' })
  const size = await sheet.evaluate(() => ({ width: document.body.scrollWidth, height: document.body.scrollHeight }))
  await sheet.setViewportSize(size)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  await sheet.screenshot({ path: file, fullPage: true })
  await sheet.close()
  return { file, info }
}
