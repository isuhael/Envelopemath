#!/usr/bin/env node
// Where each §9.2 octave's energy comes from, for Scoreboard teasers: the mix, its music / SFX / returns stems, each SFX
// kind and each music instrument, in dB re the mix's 1 kHz octave over [0, base]. The first thing to run when a BANDS
// check fails (BIBLE §11.3). The mix and the stems are the engine's own render (renderMix, pre-limiter, through the
// master's HP and low-mono filters); the SFX kinds are the engine's rendered cue buffers at their final gain (before the
// SFX bus compressor); the instruments are re-rendered from compose()'s events with their level, the bus trim and the
// energy curve (no dips, sidechain, glue or duck), then scaled together to the music.dry stem in the 1 kHz octave.
// The last column, "1k%", is each part's share of the mix's 1 kHz octave (the §9.2 reference).
// usage (from studio/): node looks/scoreboard/sound/tools/bandparts.mjs <id prefix...> --cues <cues.json> [--parts]
//   --parts adds the per-kind and per-instrument rows (slower: compose() runs again)
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { loadPack, renderMix, masterFilters } from '../../../../src/sound/engine.mjs'
import { buildTimeline } from '../../../../src/sound/timeline.mjs'
import { ltas, BANDS } from '../../../../src/sound/audit.mjs'
import * as D from '../../../../src/sound/dsp.mjs'
import * as Th from '../../../../src/sound/theory.mjs'
import { eventRenderer } from '../clearance.mjs'
import { mix as MIX } from '../mix.mjs'
import { evalDb } from '../energy.mjs'

const SR = 48000
const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', '..')
const USAGE = 'usage: node looks/scoreboard/sound/tools/bandparts.mjs <id prefix...> --cues <cues.json> [--parts]'
const argv = process.argv.slice(2), pre = [], opt = { cues: null, parts: false }
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--parts') { opt.parts = true; continue }
  if (a.startsWith('--cues')) { opt.cues = a.includes('=') ? a.slice(a.indexOf('=') + 1) : argv[++i]; continue }
  if (a.startsWith('--')) { console.error(`unknown flag ${a}\n${USAGE}`); process.exit(2) }
  pre.push(a)
}
if (!opt.cues) console.error('cue records: test/fixtures/cues.json. After a kit or spec change pass a fresh dump with --cues (node src/cli.mjs cues specs/*-scoreboard-*.json --out <file>).')
const recs = JSON.parse(fs.readFileSync(opt.cues ? path.resolve(opt.cues) : path.join(STUDIO, 'test', 'fixtures', 'cues.json'), 'utf8'))
const ids = Object.keys(recs).sort().filter(id => recs[id].look === 'scoreboard' && (!pre.length || pre.some(p => id.startsWith(p))))
if (!ids.length) { console.error(`no Scoreboard teaser matches ${pre.join(' ')}\n${USAGE}`); process.exit(2) }
const pack = await loadPack('scoreboard')
const octaves = (b, n) => {
  const P = ltas(b.L, b.R, 0, Math.min(b.L.length, n))
  return BANDS.map(f => { let x = 0; for (let k = Math.ceil(f / Math.SQRT2 * 8192 / SR); k <= Math.floor(f * Math.SQRT2 * 8192 / SR); k++) x += P[k] || 0; return x })
}
for (const id of ids) {
  const rec = recs[id]
  const m = renderMix(rec, pack, {})
  const N = Math.round(rec.base * SR)
  const ref = octaves(masterFilters(m.sum), N)[5]
  const row = (name, o) => console.log(name.padEnd(12), o.map(x => (10 * Math.log10(x / ref + 1e-30)).toFixed(1).padStart(6)).join(''), (100 * o[5] / ref).toFixed(0).padStart(5))
  const cues = m.tl.cues.filter(c => !c.inCard && c.t < rec.base)
  console.log(`\n${id}  body ${rec.base.toFixed(2)} s, ${cues.length} body cues (${(cues.length / rec.base).toFixed(2)}/s), P ${m.tl.anchors.P.t.toFixed(2)} (${m.tl.anchors.P.rule})`)
  console.log(''.padEnd(12), BANDS.map(f => String(f).padStart(6)).join(''), '  1k%')
  row('MIX', octaves(masterFilters(m.sum), N))
  for (const k of ['musicDry', 'music', 'sfx', 'returns']) row(k, octaves(masterFilters(m.stems[k]), N))
  if (!opt.parts) continue
  // the SFX by kind, at their final gain (the cluster cap included), before the SFX bus
  const byKind = {}
  for (const c of m.tl.cues) {
    const r = m.rendered[c.i]
    if (!r || c.t >= rec.base) continue
    const b = byKind[c.kind] || (byKind[c.kind] = D.stereo(N + SR))
    D.addAt(b, r.buf, Math.round(c.t * SR) - (r.buf.offset || 0), r.gain)
  }
  for (const [k, b] of Object.entries(byKind).sort()) row(`sfx:${k}`, octaves(masterFilters(b), N))
  // the instruments, re-rendered from compose()'s events (level, bus trim and energy curve; no dips, sidechain, glue or
  // duck), scaled together to the music.dry stem in the 1 kHz octave
  const tl = buildTimeline(rec, pack, {})
  tl.setHarmony(pack.harmony(tl, tl.stream('arr'), { D, T: Th }) || [])
  const comp = pack.compose(tl, tl.stream('arr:compose'), { D, T: Th })
  const er = eventRenderer(tl, comp.notes, comp.drums)
  const inst = {}
  for (const x of er.all) {
    if (x.e.t >= rec.base) continue
    const b = er.render(x)
    if (!b) continue
    const lvl = D.dbToGain(MIX.levels[x.e.inst] ?? 0) * x.fader
    const dst = inst[x.e.inst + (x.route.duck ? '' : '@react')] || (inst[x.e.inst + (x.route.duck ? '' : '@react')] = D.stereo(N + SR))
    const at = Math.round(x.e.t * SR) - (b.offset || 0)
    for (let i = Math.max(0, at); i < Math.min(N + SR, at + b.L.length); i++) {
      const g = lvl * (x.route.musicDb ? Math.pow(10, evalDb(comp.automation.musicDb, i / SR) / 20) : 1)
      dst.L[i] += b.L[i - at] * g; dst.R[i] += b.R[i - at] * g
    }
  }
  const tot = D.stereo(N + SR)
  for (const b of Object.values(inst)) D.addAt(tot, b, 0, 1)
  const k = octaves(masterFilters(m.stems.musicDry), N)[5] / Math.max(1e-30, octaves(masterFilters(tot), N)[5])
  for (const [name, b] of Object.entries(inst).sort()) { D.scale(b, Math.sqrt(k)); row(name, octaves(masterFilters(b), N)) }
}
