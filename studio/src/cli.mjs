#!/usr/bin/env node
// envelope studio CLI
//   node src/cli.mjs render specs/a.json [specs/b.json ...] [--out out] [--jobs 2] [--crf 18] [--sheet] [--legacy-audio]   (or --all)
//   node src/cli.mjs check  specs/*.json [--every 0.25] [--json]
//   node src/cli.mjs stills specs/a.json --at 0,1.5,end [--out out/stills]
//   node src/cli.mjs sheet  specs/*.json [--n 12 | --at 0,1.5,3] [--out out/sheets]
// Sound (src/sound, contract in sound/README.md):
//   node src/cli.mjs audio  specs/*.json --out /tmp/sound [--stems [dir]] [--no-encode] [--pack file.mjs] [--cues cues.json] [--jobs 4]
//        master WAV (float32) + verified AAC .m4a + <id>.score.json + <id>.report.json (+ stems), no video frames
//   node src/cli.mjs sound  specs/*.json --video ../renders/channel --out /tmp/sound/mp4 [--stems [dir]] [--score] [--wav] [--jobs 4]
//        new audio muxed onto the finished MP4s, picture copied bit for bit (video-stream md5 checked)
//   node src/cli.mjs remux  specs/a.json --video a.mp4 --out new.mp4
//   node src/cli.mjs audit  /tmp/sound/mp4 [more files or dirs] [--out dir] [--json] [--cues cues.json]
//        loudness, true peak, LRA, crest, silence, stereo, phone proxy, bands, onsets + a spectrogram PNG per file
//   node src/cli.mjs cues   specs/*.json --out cues.json          the cue records (what the engine reads) as JSON
//   node src/cli.mjs score  specs/*.json --out dir [--cues cues.json]   timeline + harmony + notes only (no audio)
//   node src/cli.mjs verify specs/*.json [--from dir] [--json] [--detail] [--jobs 4] [--cues cues.json] [--video dir | --no-video]
//        [--out dir] [--keep] [--twice] [--no-units | --units-only] [--expect-identical] [--baseline file] [--write-baseline file] [--pending]
//        [--strict-cues]
//        the acceptance harness (sound/checks/, thresholds in sound/acceptance.json): builds the audio + stems into a temp
//        dir unless --from names prebuilt outputs, muxes onto the finished MP4s (read only) for A12/A13, runs every check,
//        prints the pass table and the failures, exits 1 on any failure. It also compares the cue records with
//        test/fixtures/cues.json (cue drift: the packs' fitted values may be stale); --strict-cues makes that a failure
// With no spec arguments, check/stills/sheet/audio/sound/cues/score/verify use every specs/*.json; render needs --all for that.
// Nothing is written into renders/channel/ unless --final is passed.
// Brand (studio/brand/brand.json: the logo in the look's mark + the CTA end card) is on by default:
//   --no-brand          render/lint exactly as before the brand layer (no end card, the look's own mark)
//   --brand file.json   use another brand config
//   --logo file.png     use this logo instead of brand.logo (e.g. a test logo; nothing is copied into studio/brand/)
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, readSpec as readSpecFile, launch, loadBrand, brandSummary } from './page.mjs'
import { renderSpec, renderStills, contactSheet } from './render.mjs'
import { checkSpec, formatReport } from './check.mjs'
import { cueDrift, STORE_CUES } from './sound/cues.mjs'

const [cmd, ...rest] = process.argv.slice(2)
const files = [], opt = {}
// flags that never take a value (so "--no-brand specs/a.json" keeps the spec)
const BOOL = new Set(['all', 'sheet', 'json', 'no-brand', 'help', 'h', 'legacy-audio', 'score', 'wav', 'no-encode', 'no-check', 'final', 'no-spectrogram',
  'detail', 'keep', 'twice', 'no-units', 'units-only', 'no-video', 'expect-identical', 'pending', 'strict-cues'])
// flags whose value is optional: taken only when the next token is not a flag and not a spec/media file
const OPTIONAL = new Set(['stems'])
for (let i = 0; i < rest.length; i++) {
  const a = rest[i]
  if (a.startsWith('--')) {
    const k = a.slice(2), nx = rest[i + 1]
    let v = true
    if (!BOOL.has(k) && nx && !nx.startsWith('--') && !(OPTIONAL.has(k) && /\.(json|mp4|m4a|wav)$/i.test(nx))) v = rest[++i]
    opt[k] = v
  } else files.push(a)
}
const brandOpt = opt['no-brand'] ? false : { ...(typeof opt.brand === 'string' ? { config: opt.brand } : {}), ...(typeof opt.logo === 'string' ? { logo: opt.logo } : {}) }
// the cue fixture (test/fixtures/cues.json) was mounted with the default brand; any other brand changes every record
const defaultBrand = brandOpt !== false && !brandOpt.config && !brandOpt.logo
const readSpec = f => readSpecFile(f, { brand: brandOpt })
const COMMANDS = ['render', 'check', 'stills', 'sheet', 'audio', 'sound', 'remux', 'audit', 'cues', 'score', 'verify']
if (opt.help || opt.h) {
  console.log(`usage: cli.mjs ${COMMANDS.join('|')} <specs...> [--options]   (render needs explicit specs, or --all)`)
  process.exit(0)
}
// rendering everything by accident is slow and overwrites finished MP4s, so render needs explicit specs or --all
if (cmd === 'render' && !files.length && !opt.all) {
  console.error('render: name the specs to render (or pass --all)')
  process.exit(2)
}
const allSpecs = () => fs.readdirSync(path.join(ROOT, 'specs')).filter(f => f.endsWith('.json')).sort().map(f => path.join(ROOT, 'specs', f))
const specFiles = cmd === 'audit' ? [] : files.length ? files : allSpecs()
const outDir = path.resolve(opt.out || path.join(ROOT, 'out'))

async function pool(items, jobs, fn) {
  const res = new Array(items.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(jobs, items.length) }, async () => {
    while (next < items.length) { const i = next++; res[i] = await fn(items[i], i) }
  }))
  return res
}

const fmtS = ms => (ms / 1000).toFixed(1) + ' s'
function soundLine(r) {
  const L = r.report.loudness
  return `${r.id}: ${L.integrated} LUFS, TP ${L.truePeak}${L.postEncode ? ` (AAC ${L.postEncode.truePeak})` : ''} dBTP, LRA ${L.lra}, P ${r.report.P.t} (${r.report.P.rule}), ${r.report.bpm.join('/')} BPM, cue onset max ${r.report.cueStartMaxErrMs} ms, ${fmtS(r.report.timing.totalMs)}`
}

// cue drift (BIBLE.md §11.1): a mounted record that differs from test/fixtures/cues.json means the packs' fitted values
// (Scoreboard calibration.json, Becker MODEL) were fitted on a teaser that no longer exists. Report it; npm test gates it.
function warnCueDrift(recs, dumping = false) {
  const drift = cueDrift(recs)
  if (!drift.length) return
  for (const d of drift) console.error(`! ${d.line}`)
  console.error(dumping
    ? `! ${drift.length} record(s) differ from test/fixtures/cues.json. Refit the pack on this dump before storing it as the fixture (BIBLE.md §11.1).`
    : `! The audio was made with fitted values that may be stale. Refit, verify, then store the records (${STORE_CUES}) and regenerate the tempo table (BIBLE.md §11.1).`)
}

async function soundCommands() {
  const S = await import('./sound/batch.mjs')
  const jobs = +(opt.jobs || S.defaultJobs())
  if (cmd === 'audit') {
    const { auditFile, formatAudit } = await import('./sound/audit.mjs')
    const targets = []
    for (const f of files.length ? files : []) {
      const p = path.resolve(f)
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) for (const x of fs.readdirSync(p).sort()) { if (/\.(mp4|m4a)$/i.test(x)) targets.push(path.join(p, x)) }
      else targets.push(p)
    }
    if (!targets.length) { console.error('audit: name MP4/M4A/WAV files or directories'); return 2 }
    const recs = opt.cues ? JSON.parse(fs.readFileSync(opt.cues, 'utf8')) : {}
    const sidecarDirs = typeof opt.reports === 'string' ? [path.resolve(opt.reports)] : []
    // the sidecars (<id>.audit.json, <id>.spectrogram.png, ~3 MB each) go next to each file unless --out is given, but never
    // into the delivery folders under renders/: there they would land in the next commit
    const renders = path.resolve(ROOT, '..', 'renders') + path.sep
    let outDir = typeof opt.out === 'string' ? path.resolve(opt.out) : null
    if (!outDir && targets.some(f => f.startsWith(renders))) {
      outDir = fs.mkdtempSync(path.join((await import('node:os')).tmpdir(), 'studio-audit-'))
      console.error(`audit: sidecars go to ${outDir} (not into renders/); pass --out <dir> to choose`)
    }
    const rows = []
    for (const f of targets) {
      const id = path.basename(f).replace(/\.(mp4|m4a|wav)$/i, '')
      try { rows.push(auditFile(f, { outDir, rec: recs[id] || null, sidecarDirs, spectro: !opt['no-spectrogram'] })) }
      catch (e) { console.error(`✗ ${id}: ${e.message}`) }
    }
    if (opt.json) console.log(JSON.stringify(rows, null, 1))
    else console.log(formatAudit(rows))
    return rows.length === targets.length ? 0 : 1
  }
  const specs = specFiles.map(readSpec)
  if (cmd === 'remux' && specs.length !== 1) { console.error('remux: exactly one spec'); return 2 }
  if ((cmd === 'sound' || cmd === 'remux') && !opt.video) { console.error(`${cmd}: --video <mp4 or dir of finished MP4s> is required`); return 2 }
  console.error(brandSummary(brandOpt === false ? null : loadBrand(brandOpt)))
  const t0 = Date.now()
  const recs = await S.gatherRecords(specs, { cuesFile: typeof opt.cues === 'string' ? opt.cues : null, launch, log: m => console.error(m) })
  if (typeof opt.cues !== 'string' && defaultBrand) warnCueDrift(recs, cmd === 'cues')
  if (cmd === 'cues') {
    const out = typeof opt.out === 'string' && opt.out.endsWith('.json') ? path.resolve(opt.out) : path.join(outDir, 'cues.json')
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, JSON.stringify(Object.fromEntries(recs.map(r => [r.id, r])), null, 1))
    console.log(`${recs.length} cue records → ${path.relative(process.cwd(), out)}`)
    return 0
  }
  if (cmd === 'score') {
    const { scoreOnly } = await import('./sound/engine.mjs')
    const od = S.guardOut(outDir, opt.final)
    fs.mkdirSync(od, { recursive: true })
    for (const rec of recs) {
      const { tl, comp, logo } = await scoreOnly(rec, { pack: typeof opt.pack === 'string' ? opt.pack : null })
      const f = path.join(od, `${rec.id}.plan.json`)
      fs.writeFileSync(f, JSON.stringify({ id: rec.id, anchors: tl.anchors, tempo: tl.tempo, sections: tl.sections, bars: tl.bars, harmony: tl.harmony.map(h => ({ t0: h.t0, t1: h.t1, sym: h.sym })), notes: comp.notes || [], drums: comp.drums || [], logo }, null, 1))
      console.log(`${rec.id}: P ${tl.anchors.P.t} (${tl.anchors.P.rule}), ${tl.tempo.map(s => s.bpm.toFixed(2)).join('/')} BPM, ${tl.bars.length} bars, ${(comp.notes || []).length} notes → ${path.relative(process.cwd(), f)}`)
    }
    return 0
  }
  const od = cmd === 'remux' ? null : S.guardOut(outDir, opt.final)
  const soundOpts = {
    encode: !opt['no-encode'], ffmpegCheck: !opt['no-check'],
    pack: typeof opt.pack === 'string' ? path.resolve(opt.pack) : null,
  }
  const items = recs.map(rec => {
    if (cmd === 'audio') return { rec, opts: { ...soundOpts, outDir: od, stems: opt.stems ? (typeof opt.stems === 'string' ? path.resolve(opt.stems) : true) : false } }
    if (cmd === 'remux') {
      const out = S.guardOut(path.resolve(String(opt.out || `${rec.id}.mp4`)), opt.final)
      const work = path.join(path.dirname(out), `.${rec.id}.sound`)
      return { rec, opts: { ...soundOpts, encode: true, outDir: work, stems: false }, video: S.videoFor(rec.id, opt.video), outMp4: out }
    }
    // sound: audio + mux into od; the WAV/score/report go to od/sound/
    return { rec, opts: { ...soundOpts, encode: true, outDir: path.join(od, 'sound'), score: !!opt.score, stems: opt.stems ? (typeof opt.stems === 'string' ? path.resolve(opt.stems) : path.join(od, 'stems')) : false, keepWav: !!opt.wav }, video: S.videoFor(rec.id, opt.video), outMp4: path.join(od, `${rec.id}.mp4`) }
  })
  let failed = 0
  await S.runPool(items, jobs, r => {
    if (r.error) { failed++; console.error(`✗ ${r.id}: ${r.error}`); return }
    let line = '✓ ' + soundLine(r)
    if (r.muxed) {
      line += `\n    → ${path.relative(process.cwd(), r.muxed.out)}  video md5 ${r.muxed.same ? 'identical' : 'DIFFERENT'} (${r.muxed.md5.slice(0, 12)}), audio ${r.muxed.audio.codec} ${r.muxed.audio.channels} ch ${r.muxed.audio.rate} Hz ${r.muxed.audio.kbps} kb/s ${r.muxed.audio.duration} s / video ${r.muxed.video.duration} s`
      if (!r.muxed.ok) { failed++; line += '  ✗ delivery check failed' }
    }
    console.log(line)
  })
  if (cmd === 'remux') for (const it of items) fs.rmSync(it.opts.outDir, { recursive: true, force: true })
  console.log(`\n${items.length - failed}/${items.length} ok (${fmtS(Date.now() - t0)})`)
  return failed ? 1 : 0
}

// the acceptance harness (sound/checks/run.mjs): every check of sound/acceptance.json on every spec
async function verifyCommand() {
  const V = await import('../sound/checks/run.mjs')
  if (opt.pending) {
    const { pending } = await import('../sound/checks/acceptance.mjs')
    for (const p of pending()) console.log(`${p.id}${p.look ? ` [${p.look}]` : ''}\n  bible says:  ${p.bibleSays}\n  passes now: ${p.passesNow}\n  why:        ${p.reason}${p.sync ? `\n  sync:       ${p.sync}` : ''}${p.see ? `\n  see:        ${p.see}` : ''}\n`)
    return 0
  }
  const S = await import('./sound/batch.mjs')
  const jobs = +(opt.jobs || S.defaultJobs())
  const from = typeof opt.from === 'string' ? path.resolve(opt.from) : null
  if (from && !fs.existsSync(from)) { console.error(`verify: --from ${opt.from}: no such directory`); return 2 }
  const specs = specFiles.map(readSpec)
  console.error(brandSummary(brandOpt === false ? null : loadBrand(brandOpt)))
  // the cue records: --cues, else the build's own dump (<from>/cues.json), else mounted in Chromium
  const cuesFile = typeof opt.cues === 'string' ? opt.cues : from && fs.existsSync(path.join(from, 'cues.json')) ? path.join(from, 'cues.json') : null
  const recs = await S.gatherRecords(specs, { cuesFile, launch, log: m => console.error(m) })
  const video = opt['no-video'] ? null : typeof opt.video === 'string' ? path.resolve(opt.video) : fs.existsSync(S.CHANNEL_DIR) ? S.CHANNEL_DIR : null
  // verify never writes into renders/channel (no --final here)
  const buildDir = !from && typeof opt.out === 'string' ? S.guardOut(path.resolve(opt.out)) : null
  const { code } = await V.verify({
    recs, dir: from, buildDir, jobs, video, units: !opt['no-units'], unitsOnly: !!opt['units-only'], twice: !!opt.twice,
    baseline: typeof opt.baseline === 'string' ? path.resolve(opt.baseline) : null, expectIdentical: !!opt['expect-identical'],
    writeBaseline: typeof opt['write-baseline'] === 'string' ? path.resolve(opt['write-baseline']) : null,
    json: !!opt.json, detail: !!opt.detail, keep: !!opt.keep,
    cuesFrom: cuesFile ? path.resolve(cuesFile) : null, strictCues: !!opt['strict-cues'], cueCheck: defaultBrand,
    renderAudio: (items, n, onDone) => S.runPool(items, n, onDone),
  })
  return code
}

async function main() {
  if (!COMMANDS.includes(cmd)) {
    console.error(`usage: cli.mjs ${COMMANDS.join('|')} [specs...] [--options]`)
    process.exit(2)
  }
  if (brandOpt && typeof opt.logo === 'string' && !fs.existsSync(path.resolve(opt.logo))) {
    console.error(`--logo ${opt.logo}: no such file`)
    process.exit(2)
  }
  if (cmd === 'verify') {
    let code
    try { code = await verifyCommand() } catch (e) { console.error(`✗ ${e.stack || e.message}`); code = 1 }
    process.exit(code)
  }
  if (['audio', 'sound', 'remux', 'audit', 'cues', 'score'].includes(cmd)) {
    let code
    try { code = await soundCommands() } catch (e) { console.error(`✗ ${e.message}`); code = 1 }
    process.exit(code)
  }
  console.error(brandSummary(brandOpt === false ? null : loadBrand(brandOpt)))
  const browser = await launch()
  let failed = 0
  try {
    if (cmd === 'render') {
      const jobs = +(opt.jobs || 2)
      await pool(specFiles, jobs, async f => {
        const spec = readSpec(f)
        const t0 = Date.now()
        try {
          const r = await renderSpec(browser, spec, { outDir, crf: +(opt.crf || 18), preset: opt.preset || 'medium', legacyAudio: !!opt['legacy-audio'] })
          const snd = r.sound ? `, sound ${r.sound.loudness.integrated} LUFS / TP ${r.sound.loudness.postEncode ? r.sound.loudness.postEncode.truePeak : r.sound.loudness.truePeak} dBTP` : ', legacy SFX audio'
          console.log(`✓ ${spec.id}: ${r.duration.toFixed(1)} s, ${r.frames} frames, ${r.sfx} sfx${snd} → ${path.relative(process.cwd(), r.mp4)} (${((Date.now() - t0) / 1000).toFixed(0)} s)`)
          if (r.record && defaultBrand) warnCueDrift([r.record])
          if (opt.sheet) await contactSheet(browser, spec, path.join(outDir, 'sheets', `${spec.id}.png`))
        } catch (e) { failed++; console.error(`✗ ${spec.id}: ${e.message}`) }
      })
    } else if (cmd === 'check') {
      const reports = await pool(specFiles, +(opt.jobs || 2), async f => {
        const spec = readSpec(f)
        try { return await checkSpec(browser, spec, { every: +(opt.every || 0.25) }) }
        catch (e) { return { id: spec.id, duration: 0, errors: [{ rule: 'mount', msg: e.message }], warnings: [] } }
      })
      for (const r of reports) { if (r.errors.length) failed++; if (!opt.json) console.log(formatReport(r)) }
      if (opt.json) console.log(JSON.stringify(reports, null, 2))
      console.log(`\n${reports.length - failed}/${reports.length} specs clean`)
    } else if (cmd === 'stills') {
      const at = String(opt.at || '0,end').split(',').map(x => (x === 'end' ? 'end' : +x))
      for (const f of specFiles) {
        const spec = readSpec(f)
        const { stills } = await renderStills(browser, spec, at, path.join(outDir, 'stills', spec.id))
        for (const s of stills) console.log(path.relative(process.cwd(), s.file))
      }
    } else if (cmd === 'sheet') {
      await pool(specFiles, +(opt.jobs || 2), async f => {
        const spec = readSpec(f)
        try {
          const times = opt.at ? String(opt.at).split(',').map(Number) : undefined
          const { file } = await contactSheet(browser, spec, path.join(outDir, 'sheets', `${spec.id}.png`), { n: +(opt.n || 12), times })
          console.log(path.relative(process.cwd(), file))
        } catch (e) { failed++; console.error(`✗ ${spec.id}: ${e.message}`) }
      })
    }
  } finally {
    await browser.close()
  }
  process.exit(failed ? 1 : 0)
}
main().catch(e => { console.error(e); process.exit(1) })
