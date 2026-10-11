// Batch plumbing for the CLI: gather cue records (mount in Chromium, or read a cues JSON), render audio in worker threads,
// mux onto finished MP4s with the picture copied bit for bit, and verify (video-stream md5, durations).
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'
import { mountCues } from './cues.mjs'
import { renderSound } from './engine.mjs'
import { mux, videoMd5, probe } from './ffmpeg.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
export const CHANNEL_DIR = path.resolve(HERE, '../../../renders/channel')

/** cue records for specs: from a cues JSON (keyed by id) when it has the spec, else mounted in `browser` (lazily launched) */
export async function gatherRecords(specs, { cuesFile = null, launch, log = () => {} } = {}) {
  const cached = cuesFile ? JSON.parse(fs.readFileSync(cuesFile, 'utf8')) : {}
  const out = []
  let browser = null
  try {
    for (const spec of specs) {
      if (cached[spec.id]) { out.push(cached[spec.id]); continue }
      if (!browser) browser = await launch()
      const t0 = Date.now()
      out.push(await mountCues(browser, spec))
      log(`  mounted ${spec.id} (${Date.now() - t0} ms)`)
    }
  } finally { if (browser) await browser.close() }
  return out
}

/** the source MP4 for a spec: --video may be a directory (<dir>/<id>.mp4) or a file */
export function videoFor(id, video) {
  if (!video) return null
  const v = path.resolve(video)
  if (fs.existsSync(v) && fs.statSync(v).isDirectory()) return path.join(v, `${id}.mp4`)
  return v
}

/** refuse to write into renders/channel unless the caller says this is the final stage */
export function guardOut(dir, final = false) {
  const d = path.resolve(dir)
  if (!final && (d === CHANNEL_DIR || d.startsWith(CHANNEL_DIR + path.sep))) throw new Error(`refusing to write into ${CHANNEL_DIR} (pass --final for the final stage)`)
  return d
}

/**
 * Mux rendered audio onto a source MP4 and verify: video stream md5 equal, audio duration = video duration ± 1/fps,
 * AAC stereo 48 kHz. Returns { out, md5, md5Src, same, audio, video, ok }.
 */
export function muxVerified(src, audio, out, { duration, fps = 30 }) {
  if (!fs.existsSync(src)) throw new Error(`no source video ${src}`)
  const pv = probe(src)
  const vs = pv.streams.find(s => s.codec_type === 'video')
  if (vs && Math.abs(+vs.duration - duration) > 1.5 / fps) throw new Error(`${path.basename(src)}: video lasts ${vs.duration} s, the spec ${duration} s: is it the same teaser?`)
  fs.mkdirSync(path.dirname(out), { recursive: true })
  mux(src, audio, out, duration)
  const md5Src = videoMd5(src), md5 = videoMd5(out)
  const po = probe(out)
  const a = po.streams.find(s => s.codec_type === 'audio'), v = po.streams.find(s => s.codec_type === 'video')
  const audioInfo = a ? { codec: a.codec_name, profile: a.profile, channels: a.channels, rate: +a.sample_rate, kbps: a.bit_rate ? Math.round(a.bit_rate / 1000) : null, duration: +a.duration } : null
  const ok = md5 === md5Src && !!a && a.codec_name === 'aac' && a.channels === 2 && +a.sample_rate === 48000 && Math.abs(+a.duration - +v.duration) <= 1 / fps + 1e-6
  return { out, md5, md5Src, same: md5 === md5Src, audio: audioInfo, video: v ? { duration: +v.duration, frames: +v.nb_frames } : null, ok }
}

/** one job (in a worker or inline): render the audio for a record, optionally mux it. */
export async function runJob({ rec, opts, video = null, outMp4 = null }) {
  const r = await renderSound(rec, opts)
  let muxed = null
  if (video && outMp4) muxed = muxVerified(video, r.m4a, outMp4, { duration: rec.duration, fps: rec.fps })
  return { id: rec.id, files: r.files, report: r.report, muxed }
}

/** run jobs over `jobs` worker threads (1 = inline). onDone(result | { id, error }) per job. Results in input order. */
export async function runPool(items, jobs, onDone = () => {}) {
  const n = Math.max(1, Math.min(jobs | 0 || 1, items.length))
  const res = new Array(items.length)
  if (n === 1) {
    for (let i = 0; i < items.length; i++) {
      try { res[i] = await runJob(items[i]) } catch (e) { res[i] = { id: items[i].rec.id, error: e.stack || String(e) } }
      onDone(res[i])
    }
    return res
  }
  let next = 0
  await Promise.all(Array.from({ length: n }, () => new Promise(resolve => {
    const w = new Worker(path.join(HERE, 'worker.mjs'))
    let cur = -1
    const feed = () => {
      if (next >= items.length) { w.terminate().then(resolve); return }
      cur = next++
      w.postMessage(items[cur])
    }
    w.on('message', m => { res[cur] = m; onDone(m); feed() })
    w.on('error', e => { if (cur >= 0 && !res[cur]) { res[cur] = { id: items[cur].rec.id, error: e.stack || String(e) }; onDone(res[cur]) } feed() })
    feed()
  })))
  return res
}
export const defaultJobs = () => Math.max(1, Math.min(4, os.cpus().length))
