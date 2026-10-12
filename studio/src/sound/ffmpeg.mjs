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

/** samples per AAC-LC frame, and the encoder's priming (ffmpeg writes it as a 1024-sample edit list) */
export const AAC_FRAME = 1024
/**
 * The silent pre-roll encodeAac puts in front of the audio, in samples: 3 frames = 64 ms. A whole number of frames (the
 * dropped packets are exactly the silence) and of milliseconds (ffmpeg's encoder then sizes the last packet exactly: with
 * 1024 or 2048 samples the file came out 16-32 samples short).
 */
export const AAC_PREROLL = 3 * AAC_FRAME
const secs = n => (n / 48000).toFixed(9)
/** the audio packets of a file: [{ pts, size }] and the stream's duration_ts */
function packets(file) {
  const r = run('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'packet=pts,size:stream=duration_ts', '-of', 'json', file])
  const j = JSON.parse(String(r.stdout))
  return { pk: (j.packets || []).map(p => ({ pts: +p.pts, size: +p.size })), durationTs: j.streams && j.streams[0] ? +j.streams[0].duration_ts : null }
}
/**
 * Encode a WAV to AAC-LC (bible §8.6: 192k, 48 kHz, stereo) in an .m4a, single-threaded (deterministic).
 *
 * The first frame (sound/README.md "The AAC first frame"): ffmpeg's encoder starts a file with an empty bit reservoir,
 * so a hard hit at t = 0 is coded with far fewer bits than the same hit later on (05b: 392 bytes where it gets 1039
 * after silence; the decoded first 50 ms at 12.9 dB SNR instead of 30.5, and up to +3 dB of true peak over the master).
 * So the encoder first sees `preroll` samples of digital silence (adelay), and a stream copy then drops the silent
 * packets, keeping the last one as the codec's priming packet (pts -1024 under the usual 1024-sample edit list). AAC
 * frames do not reference each other's bits (the reservoir is the encoder's bookkeeping), so the result decodes
 * sample-aligned and has the plain encode's shape: same packet count, edit list and duration. It is checked (the kept
 * packets are the pre-roll encode's own, byte for byte in size, and the durations agree); when the check fails (another
 * ffmpeg's seek or muxer behaving differently) the plain encode is used and `warning` says so. preroll 0 = plain encode.
 * Returns { file, preroll (samples used), warning? }.
 */
export function encodeAac(wav, out, { bitrate = '192k', preroll = AAC_PREROLL } = {}) {
  const codec = ['-c:a', 'aac', '-b:a', bitrate, '-ar', '48000', '-ac', '2']
  const plain = () => ff(['-loglevel', 'error', '-threads', '1', '-i', wav, ...codec, '-movflags', '+faststart', out])
  if (!preroll) { plain(); return { file: out, preroll: 0 } }
  if (preroll % AAC_FRAME) throw new Error(`encodeAac: preroll ${preroll} is not a multiple of ${AAC_FRAME}`)
  const tmp = `${out}.preroll.m4a`
  try {
    ff(['-loglevel', 'error', '-threads', '1', '-i', wav, '-af', `adelay=${preroll}S:all=1`, ...codec, tmp])
    // keep the packets from pts preroll - 1024 on (the last silent one becomes the priming packet), shifted by -preroll
    ff(['-loglevel', 'error', '-ss', secs(preroll - AAC_FRAME), '-i', tmp, '-map', '0:a:0', '-c:a', 'copy', '-copyts',
      '-output_ts_offset', '-' + secs(preroll), '-avoid_negative_ts', 'disabled', '-movflags', '+faststart', out])
    const a = packets(tmp), b = packets(out), drop = preroll / AAC_FRAME
    const sameTail = b.pk.length === a.pk.length - drop && b.pk.every((p, i) => p.size === a.pk[i + drop].size)
    const ok = sameTail && b.pk.length > 0 && b.pk[0].pts === -AAC_FRAME && b.durationTs === a.durationTs - preroll
    if (!ok) {
      plain()
      return { file: out, preroll: 0, warning: `AAC pre-roll trim did not check out (${b.pk.length} of ${a.pk.length} packets, first pts ${b.pk[0] && b.pk[0].pts}, duration ${b.durationTs} vs ${a.durationTs} - ${preroll}): plain encode used` }
    }
    return { file: out, preroll }
  } finally { fs.rmSync(tmp, { force: true }) }
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
