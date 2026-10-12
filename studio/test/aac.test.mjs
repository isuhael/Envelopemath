// The AAC encode's silent pre-roll (src/sound/ffmpeg.mjs encodeAac, sound/README.md "The AAC first frame"): a hard hit
// at t = 0, encoded plain and behind the trimmed pre-roll. The trimmed file must have the plain encode's shape (packets,
// edit list, duration), decode sample-aligned, and code the first frame at least as faithfully.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import * as D from '../src/sound/dsp.mjs'
import { writeWavF32 } from '../src/sound/wav.mjs'
import { limitTruePeak } from '../src/sound/fx.mjs'
import * as FF from '../src/sound/ffmpeg.mjs'

const probe = f => JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a:0', '-show_entries', 'packet=pts,size:stream=duration_ts', '-of', 'json', f]))
/** a 2 s teaser opening: a kick and a noise burst at full level from sample 0, limited to -1.5 dBTP, over a quiet tone */
function hardHit() {
  const n = 96000, L = new Float32Array(n), R = new Float32Array(n), rng = D.rngFor('aac-test', 'hit')
  for (let i = 0; i < n; i++) {
    const t = i / 48000, k = Math.sin(2 * Math.PI * (55 * t + 12 * (1 - Math.exp(-t / 0.03)))) * Math.exp(-t / 0.15), e = 0.45 * Math.exp(-t / 0.06)
    L[i] = 0.54 * k + e * rng.bi() + 0.05 * Math.sin(2 * Math.PI * 440 * t)
    R[i] = 0.54 * k + e * rng.bi() + 0.05 * Math.sin(2 * Math.PI * 440 * t)
  }
  return limitTruePeak({ L, R }, { ceiling: -1.5 }).out
}
const snr = (w, d, i0, i1, lag = 0) => { let s = 0, e = 0; for (let i = i0; i < i1; i++) for (const c of ['L', 'R']) { s += w[c][i] ** 2; e += (d[c][i + lag] - w[c][i]) ** 2 } return 10 * Math.log10(s / e) }

test('aac: the trimmed silent pre-roll keeps the plain encode\'s shape, decodes aligned, and codes the first frame better', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'aac-test-'))
  try {
    const w = hardHit(), wav = path.join(dir, 'hit.wav')
    writeWavF32(wav, w)
    const pre = FF.encodeAac(wav, path.join(dir, 'pre.m4a')), plain = FF.encodeAac(wav, path.join(dir, 'plain.m4a'), { preroll: 0 })
    assert.equal(pre.preroll, FF.AAC_PREROLL, pre.warning || 'pre-roll used')
    assert.equal(plain.preroll, 0)
    assert.equal(fs.readdirSync(dir).filter(f => /preroll/.test(f)).length, 0, 'the pre-roll intermediate is removed')
    const a = probe(pre.file), b = probe(plain.file)
    assert.equal(a.packets.length, b.packets.length, 'packet count')
    assert.equal(a.streams[0].duration_ts, b.streams[0].duration_ts, 'edit-list duration')
    assert.equal(+a.streams[0].duration_ts, w.L.length, 'duration = the WAV')
    assert.equal(+a.packets[0].pts, -FF.AAC_FRAME, 'priming packet at -1024')
    // the first frame now gets the bits a hit gets later on
    assert.ok(+a.packets[0].size + +a.packets[1].size > +b.packets[0].size + +b.packets[1].size, `first frames ${a.packets[0].size}+${a.packets[1].size} vs ${b.packets[0].size}+${b.packets[1].size} bytes`)
    const dp = FF.decodeAudio(pre.file), dq = FF.decodeAudio(plain.file)
    // sample-aligned: the residual against the master is smallest at lag 0 (a frame or a sample off is far worse)
    const s0 = snr(w, dp, 3000, 90000)
    for (const lag of [-1024, -1, 1, 1024]) assert.ok(s0 > snr(w, dp, 3000, 90000, lag) + 3, `lag ${lag}`)
    // the first 50 ms: at least as faithful as the plain encode (on 05b: 30.5 dB against 12.9)
    assert.ok(snr(w, dp, 0, 2400) >= snr(w, dq, 0, 2400), `first 50 ms SNR ${snr(w, dp, 0, 2400).toFixed(1)} vs plain ${snr(w, dq, 0, 2400).toFixed(1)} dB`)
  } finally { fs.rmSync(dir, { recursive: true, force: true }) }
})
