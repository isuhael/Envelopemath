// ffmpeg / ffprobe helpers for the sound engine: encode, decode, mux, and measure. ffmpeg is never an effect in the
// master chain (bible §0.6); it encodes, muxes and gives independent measurements.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'

function run(bin, args, { input = null, maxBuffer = 1 << 30 } = {}) {
  const r = spawnSync(bin, args, { input, maxBuffer })
  if (r.error) throw r.error
  if (r.status !== 0) throw new Error(`${bin} ${args.join(' ')}\n${String(r.stderr).slice(-1500)}`)
  return r
}
const ff = (args, o) => run('ffmpeg', ['-hide_banner', '-nostdin', '-y', ...args], o)

/** encode a WAV to AAC-LC (bible §8.6: 192k, 48 kHz, stereo) in an .m4a, single-threaded (deterministic) */
export function encodeAac(wav, out, { bitrate = '192k' } = {}) {
  ff(['-loglevel', 'error', '-threads', '1', '-i', wav, '-c:a', 'aac', '-b:a', bitrate, '-ar', '48000', '-ac', '2', '-movflags', '+faststart', out])
  return out
}
/** decode any file's first audio stream to 48 kHz stereo float -> { L, R } */
export function decodeAudio(file, { stream = '0:a:0' } = {}) {
  const r = ff(['-loglevel', 'error', '-i', file, '-map', stream, '-f', 'f32le', '-ac', '2', '-ar', '48000', '-'])
  const f = new Float32Array(r.stdout.buffer, r.stdout.byteOffset, r.stdout.length / 4)
  const n = f.length / 2, L = new Float32Array(n), R = new Float32Array(n)
  for (let i = 0; i < n; i++) { L[i] = f[2 * i]; R[i] = f[2 * i + 1] }
  return { L, R }
}
/** ffmpeg ebur128 (peak=true): { I, LRA, lraLow, lraHigh, TP } in LUFS / LU / dBTP */
export function ebur128(file, { filterPrefix = '' } = {}) {
  const r = ff(['-nostats', '-i', file, '-map', '0:a:0', '-af', `${filterPrefix}ebur128=peak=true`, '-f', 'null', '-'])
  const s = String(r.stderr)
  const tail = s.slice(s.lastIndexOf('Summary:'))
  const num = re => { const m = re.exec(tail); return m ? +m[1] : null }
  return { I: num(/I:\s+(-?[\d.]+) LUFS/), LRA: num(/LRA:\s+(-?[\d.]+) LU/), lraLow: num(/LRA low:\s+(-?[\d.]+)/), lraHigh: num(/LRA high:\s+(-?[\d.]+)/), TP: num(/Peak:\s+(-?[\d.inf]+) dBFS/) }
}
/** ffmpeg loudnorm, measurement pass only (print_format json): { input_i, input_tp, input_lra, input_thresh, target_offset } */
export function loudnormMeasure(file, { I = -14, TP = -1.5, LRA = 11 } = {}) {
  const r = ff(['-nostats', '-i', file, '-map', '0:a:0', '-af', `loudnorm=I=${I}:TP=${TP}:LRA=${LRA}:print_format=json`, '-f', 'null', '-'])
  const s = String(r.stderr), j = s.slice(s.lastIndexOf('{'), s.lastIndexOf('}') + 1)
  const o = JSON.parse(j)
  return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, isNaN(+v) ? v : +v]))
}
/** md5 of the first video stream's packets (stream copy): equal md5 = bit-identical picture (bible A13) */
export function videoMd5(mp4) {
  const r = ff(['-loglevel', 'error', '-i', mp4, '-map', '0:v:0', '-c', 'copy', '-f', 'md5', '-'])
  return String(r.stdout).trim().replace(/^MD5=/, '')
}
/** ffprobe streams -> [{ codec_type, codec_name, profile, sample_rate, channels, bit_rate, duration, nb_frames, r_frame_rate }] */
export function probe(file) {
  const r = run('ffprobe', ['-v', 'error', '-show_entries', 'stream=index,codec_type,codec_name,profile,sample_rate,channels,bit_rate,duration,nb_frames,r_frame_rate,width,height', '-show_entries', 'format=duration', '-of', 'json', file])
  const j = JSON.parse(String(r.stdout))
  return { streams: j.streams || [], duration: j.format ? +j.format.duration : null }
}
/**
 * Mux new audio onto a finished MP4 without touching its picture (bible §8.6 step 10): -map 0:v:0 -map 1:a:0 -c:v copy.
 * audio: an .m4a (copied as is: what was verified is what ships) or a WAV (encoded AAC-LC 192k 48 kHz stereo).
 * duration: info.duration (-t). Returns out.
 */
export function mux(video, audio, out, duration) {
  const copy = /\.(m4a|mp4|aac)$/i.test(audio)
  ff(['-loglevel', 'error', '-i', video, '-i', audio, '-map', '0:v:0', '-map', '1:a:0', '-c:v', 'copy',
    ...(copy ? ['-c:a', 'copy'] : ['-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-ac', '2']),
    '-t', String(duration), '-movflags', '+faststart', out])
  return out
}
/** spectrogram PNG (bible §9.1): showspectrumpic 1920x1080, log frequency, log scale, legend */
export function spectrogram(file, png, { size = '1920x1080' } = {}) {
  ff(['-loglevel', 'error', '-i', file, '-lavfi', `[0:a:0]showspectrumpic=s=${size}:legend=1:fscale=log:scale=log:color=intensity`, png])
  return png
}
export const exists = f => fs.existsSync(f)
