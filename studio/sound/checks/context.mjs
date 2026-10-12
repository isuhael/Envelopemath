// What a check sees of one teaser: the engine's outputs (report, score, master WAV, stems, the AAC or the muxed MP4),
// the cue record and the pack, each loaded once and only when a check asks for it.
// Two layouts are understood (both written by src/cli.mjs):
//   audio --stems      <dir>/<id>.{wav,m4a,score.json,report.json}, <dir>/stems/<id>.<stem>.wav
//   sound --score --wav --stems
//                      <dir>/<id>.mp4, <dir>/sound/<id>.{wav,score.json,report.json}, <dir>/stems/<id>.<stem>.wav
import fs from 'node:fs'
import path from 'node:path'
import { readWav } from '../../src/sound/wav.mjs'
import { loudness } from '../../src/sound/loudness.mjs'
import { decodeAudio, probe } from '../../src/sound/ffmpeg.mjs'
import { buildTimeline } from '../../src/sound/timeline.mjs'
import * as D from '../../src/sound/dsp.mjs'
import * as Th from '../../src/sound/theory.mjs'
import { bandsOf } from './delivery.mjs'

export const STEMS = ['music.dry', 'music', 'sfx', 'returns', 'mix']

/** the files of one teaser under `dir` (either layout); missing ones are null */
export function locate(dir, id) {
  const d = path.resolve(dir)
  const first = cands => cands.find(f => fs.existsSync(f)) || null
  // `dir` may also be the sound/ folder of a `sound` run (the MP4s and stems then sit one level up)
  const up = path.basename(d) === 'sound' ? path.dirname(d) : null
  const side = [d, path.join(d, 'sound')]
  const stemDirs = [path.join(d, 'stems'), path.join(d, 'sound', 'stems'), ...(up ? [path.join(up, 'stems')] : [])]
  return {
    report: first(side.map(x => path.join(x, `${id}.report.json`))),
    score: first(side.map(x => path.join(x, `${id}.score.json`))),
    wav: first(side.map(x => path.join(x, `${id}.wav`))),
    m4a: first(side.map(x => path.join(x, `${id}.m4a`))),
    mp4: first([path.join(d, `${id}.mp4`), path.join(d, 'mp4', `${id}.mp4`), ...(up ? [path.join(up, `${id}.mp4`)] : [])]),
    stems: Object.fromEntries(STEMS.map(s => [s, first(stemDirs.map(x => path.join(x, `${id}.${s}.wav`)))])),
  }
}

export class Missing extends Error {
  constructor(what) { super(`missing input: ${what}`); this.missing = true }
}

export class SpecContext {
  /** { id, look, rec, files (locate()), pack (normalised), picture ({ same, md5, md5Src } | null), determinism } */
  constructor({ id, look, rec, files, pack, picture = null, determinism = null }) {
    Object.assign(this, { id, look, rec, files, pack, picture, determinism })
    this.memo = new Map()
  }
  once(k, fn) { if (!this.memo.has(k)) this.memo.set(k, fn()); return this.memo.get(k) }
  need(k) { if (!this.files[k]) throw new Missing(`${this.id} ${k}`); return this.files[k] }
  get report() { return this.once('report', () => JSON.parse(fs.readFileSync(this.need('report'), 'utf8'))) }
  get score() { return this.once('score', () => JSON.parse(fs.readFileSync(this.need('score'), 'utf8'))) }
  get master() { return this.once('master', () => readWav(this.need('wav'))) }
  /** the delivery file: the muxed MP4 when there is one, else the verified .m4a */
  get deliveryFile() { return this.files.mp4 || this.files.m4a || null }
  get deliveryKind() { return this.files.mp4 ? 'mp4' : this.files.m4a ? 'm4a' : null }
  get delivery() { return this.once('delivery', () => { const f = this.deliveryFile; if (!f) throw new Missing(`${this.id} delivery (.m4a or .mp4)`); return decodeAudio(f) }) }
  get deliveryProbe() { return this.once('probe', () => (this.deliveryFile ? probe(this.deliveryFile) : null)) }
  get loud() { return this.once('loud', () => loudness(this.delivery)) }
  get bands() { return this.once('bands', () => bandsOf(this)) }
  get fps() { return (this.rec && this.rec.fps) || 30 }
  stem(name) {
    return this.once(`stem:${name}`, () => {
      const f = this.files.stems[name]
      if (!f) throw new Missing(`${this.id} stem ${name} (build with --stems)`)
      return readWav(f)
    })
  }
  loudOf(name) { return this.once(`loud:${name}`, () => loudness(this.stem(name))) }
  /** the pack's timeline, harmony and composition for this teaser (as the engine builds them before rendering) */
  composed() {
    return this.once('composed', () => {
      if (!this.rec) throw new Missing(`${this.id} cue record`)
      const tl = buildTimeline(this.rec, this.pack, {})
      const lib = { D, T: Th }
      tl.setHarmony(this.pack.harmony(tl, tl.stream('arr'), lib) || [])
      const comp = this.pack.compose(tl, tl.stream('arr:compose'), lib) || {}
      return { tl, comp }
    })
  }
}
