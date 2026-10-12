// The acceptance harness: every check of sound/acceptance.json on every teaser, plus each look's DSP unit checks.
//   checkSpec(job)   one teaser's checks (runs in a worker thread): § 9.1-9.4 and the pack's own rules
//   runUnits(job)    one look's unit checks (§9.5 U1-U4, LOGO)
//   verify(opts)     build what is missing (audio + stems + mux into a temp dir), run everything over a worker pool,
//                    print the pass table and the failures; resolves to the exit code
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { Worker } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'
import { truePeakEnvelope } from '../../src/sound/loudness.mjs'
import { loadPack, CEILING_DBTP } from '../../src/sound/engine.mjs'
import { muxVerified } from '../../src/sound/batch.mjs'
import { cueDrift, CUE_FIXTURE, STORE_CUES } from '../../src/sound/cues.mjs'
import { videoMd5 } from '../../src/sound/ffmpeg.mjs'
import { load, limits, gated, pending, ids as allIds, FILE as ACCEPTANCE } from './acceptance.mjs'
import { SpecContext, locate } from './context.mjs'
import { checks as DELIVERY, deliveryTp } from './delivery.mjs'
import { checks as STEMS } from './stems.mjs'
import { checkScore, SCORE_IDS } from './score.mjs'
import { readBaseline, writeBaseline, sha256File } from './baseline.mjs'
import { SR, fix } from './measure.mjs'

const HERE = path.dirname(fileURLToPath(import.meta.url))
export const UNIT_IDS = ['U1', 'U2', 'U3', 'U4', 'LOGO']
const LOOK_MODULES = { scoreboard: './looks/scoreboard.mjs', 'becker-rig': './looks/becker-rig.mjs' }
const lookModule = async look => (LOOK_MODULES[look] ? import(LOOK_MODULES[look]) : null)
export const SHORT = { scoreboard: 'SB', 'becker-rig': 'BR' }

/** the spec-level check IDs, in acceptance.json order */
export const specIds = () => allIds().filter(id => !UNIT_IDS.includes(id) && !load().checks[id].manual)
/** does the harness run check `id` for `look`? (every threshold in acceptance.json must be read by some check) */
export async function implemented(id, look) {
  if (SCORE_IDS.includes(id) || DELIVERY[id] || STEMS[id] || id === 'INFO') return true
  const mod = await lookModule(look)
  if (UNIT_IDS.includes(id)) return !!(mod && mod.units)
  return !!(mod && mod.checks && mod.checks[id])
}

// ---------------------------------------------------------------- one teaser (worker side)
/**
 * job: { id, look, rec, dir, video (source MP4 or null), muxDir (where to mux when dir has no MP4), determinism }
 * -> { id, look, results: [{ id, pass (true | false | null = skipped), gate, detail, value? }], partial, metrics }
 */
export async function checkSpec(job) {
  const { id, look, rec } = job
  const files = locate(job.dir, id)
  // the picture (A12/A13): the MP4 next to the audio, or the audio muxed onto the finished MP4 now (into muxDir)
  let picture = null, muxError = null
  if (job.video && fs.existsSync(job.video)) {
    try {
      if (!files.mp4 && files.m4a && job.muxDir && rec) {
        const m = muxVerified(job.video, files.m4a, path.join(job.muxDir, `${id}.mp4`), { duration: rec.duration, fps: rec.fps || 30 })
        files.mp4 = m.out
        picture = { same: m.same, md5: m.md5, md5Src: m.md5Src }
      } else if (files.mp4) {
        const md5 = videoMd5(files.mp4), md5Src = videoMd5(job.video)
        picture = { same: md5 === md5Src, md5, md5Src }
      }
    } catch (e) { muxError = e.message.split('\n')[0] }
  }
  const pack = await loadPack(look)
  const ctx = new SpecContext({ id, look, rec, files, pack, picture, determinism: job.determinism })
  const mod = await lookModule(look)
  const results = []
  const run = (cid, fn) => {
    const lim = limits(cid, look)
    if (lim == null) return
    let r
    try { r = fn(ctx, lim) } catch (e) { r = { pass: false, detail: e.missing ? e.message : `error: ${e.message}` } }
    results.push({ id: cid, gate: gated(cid, look), ...r })
  }
  let score = null
  for (const cid of specIds()) {
    if (SCORE_IDS.includes(cid)) {
      if (!score) {
        try { score = Object.fromEntries(checkScore(ctx.score, { look }).checks.map(c => [c.id, c])) } catch (e) { score = { error: e } }
      }
      if (limits(cid, look) == null) continue
      if (score.error) results.push({ id: cid, gate: gated(cid, look), pass: false, detail: score.error.missing ? score.error.message : `error: ${score.error.message}` })
      else if (score[cid]) results.push({ id: cid, gate: score[cid].gate, pass: score[cid].pass, detail: score[cid].detail })
      continue
    }
    if (cid === 'A13' && muxError) { results.push({ id: cid, gate: gated(cid, look), pass: false, detail: `mux: ${muxError}` }); continue }
    if (cid === 'INFO') { run(cid, (c, lim) => infoOf(c, lim, mod)); continue }
    const fn = DELIVERY[cid] || STEMS[cid] || (mod && mod.checks && mod.checks[cid])
    if (fn) run(cid, fn)
  }
  // the look's per-teaser share of its unit checks (Becker: U3/U4 over the teaser's own cues)
  let partial = null
  if (mod && mod.specUnits && rec) { try { partial = { id, ...(await mod.specUnits(ctx)) } } catch (e) { partial = { id, error: e.message } } }
  const metrics = {}
  try {
    metrics.I = +ctx.loud.integrated.toFixed(2)
    metrics.TP = +deliveryTp(ctx).tp.toFixed(2)
    metrics.PLR = +(metrics.TP - metrics.I).toFixed(2)
    metrics.LRA = +ctx.loud.lra.toFixed(2)
  } catch { /* reported by the checks */ }
  return { id, look, results, partial, metrics, files: { ...files } }
}
/** INFO: never gated. AAC0 for every look (the codec's first-frame overshoot), plus the look's reported measurements */
function infoOf(ctx, lim, mod) {
  const parts = {}
  {
    // the 4x envelope over the first 30 ms (computed on 30 ms + the interpolator's 48 taps, so it is exact there)
    const n = Math.round(0.03 * SR)
    const head = b => { let p = 0; for (const ch of [b.L, b.R]) { const e = truePeakEnvelope(ch.subarray(0, n + 48)); for (let i = 0; i < n; i++) if (e[i] > p) p = e[i] } return 20 * Math.log10(p || 1e-12) }
    const d = head(ctx.delivery), m = head(ctx.master), ms = ctx.report.master || {}
    const trials = ms.encodeTrials || []
    parts.AAC0 = `first 30 ms: decoded ${fix(d)} dBTP vs master ${fix(m)} (${d - m >= 0 ? '+' : ''}${fix(d - m)} dB); ${trials.length} encode${trials.length === 1 ? '' : 's'}, final ceiling ${ms.ceiling}${ms.ceiling < CEILING_DBTP ? ' (the global fallback)' : ''}`
  }
  if (mod && mod.info) Object.assign(parts, mod.info(ctx, lim))
  return { pass: null, value: parts, detail: Object.entries(parts).map(([k, v]) => `${k}: ${v}`).join(' | ') }
}

// ---------------------------------------------------------------- one look's units (worker side)
/** a teaser's share of its look's unit checks, without the audio (--units-only) */
export async function specUnitsOnly({ id, look, rec }) {
  const mod = await lookModule(look)
  if (!mod || !mod.specUnits) return { id, look, partial: null }
  const ctx = new SpecContext({ id, look, rec, files: { stems: {} }, pack: await loadPack(look) })
  return { id, look, partial: { id, ...(await mod.specUnits(ctx)) } }
}
export async function runUnits({ look }) {
  const mod = await lookModule(look)
  if (!mod || !mod.units) return { look, results: [] }
  const r = await mod.units()
  return { look, results: r.results, own: r.own || null }
}

// ---------------------------------------------------------------- the pool
function pool(jobs, n, onDone = () => {}) {
  const res = new Array(jobs.length)
  if (!jobs.length) return Promise.resolve(res)
  let next = 0
  return Promise.all(Array.from({ length: Math.max(1, Math.min(n, jobs.length)) }, () => new Promise(resolve => {
    const w = new Worker(path.join(HERE, 'worker.mjs'))
    let cur = -1
    const feed = () => { if (next >= jobs.length) { w.terminate().then(resolve); return } cur = next++; w.postMessage(jobs[cur]) }
    w.on('message', m => { res[cur] = m; onDone(m, jobs[cur]); feed() })
    w.on('error', e => { if (cur >= 0 && !res[cur]) { res[cur] = { ok: false, error: e.stack || String(e) }; onDone(res[cur], jobs[cur]) } feed() })
    feed()
  }))).then(() => res)
}

// ---------------------------------------------------------------- the whole run
const pad = (s, n) => String(s).padEnd(n)
const sym = r => (r.pass === null ? (r.gate ? '-' : 'i') : r.pass ? '✓' : r.gate ? '✗' : 'w')

/**
 * opts: { recs (cue records), dir (prebuilt outputs) | null, buildDir (where to build; null = a temp dir), jobs,
 *   video (dir of finished MP4s | null), units = true, twice = false, baseline (sha256 file), expectIdentical,
 *   writeBaseline (file), json, detail, keep, log, renderAudio (async (items, jobs) -> results: the CLI's batch runner),
 *   cuesFrom (the file the records came from; null = mounted in Chromium), strictCues (cue drift is a failure),
 *   cueCheck (false: skip the comparison with test/fixtures/cues.json, for a non-default brand) }
 * Resolves to { code, report }.
 */
export async function verify(opts) {
  const t0 = Date.now()
  const log = opts.log || (m => console.error(m))
  const recs = opts.recs
  const ids = recs.map(r => r.id)
  if (opts.unitsOnly) return verifyUnits(opts, t0, log)
  let dir = opts.dir ? path.resolve(opts.dir) : null
  let made = null
  const buildFailures = []
  // 1. build what is missing: audio + verified AAC + score + report + stems, into a temp dir (never renders/)
  if (!dir) {
    dir = opts.buildDir ? path.resolve(opts.buildDir) : (made = fs.mkdtempSync(path.join(os.tmpdir(), 'envelope-verify-')))
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'cues.json'), JSON.stringify(Object.fromEntries(recs.map(r => [r.id, r])), null, 1))
    log(`building ${recs.length} soundtracks into ${dir} (${opts.jobs} jobs)`)
    const tb = Date.now()
    const res = await opts.renderAudio(recs.map(rec => ({ rec, opts: { outDir: dir, stems: true, encode: true, ffmpegCheck: true } })), opts.jobs, r => log(r.error ? `  ✗ ${r.id}: ${r.error.split('\n')[0]}` : `  built ${r.id}`))
    for (const r of res) if (r.error) buildFailures.push({ id: r.id, error: r.error })
    log(`built in ${((Date.now() - tb) / 1000).toFixed(1)} s`)
  }
  // 2. determinism inputs: the masters' sha256 (A14), the baseline, an optional second render
  const shas = Object.fromEntries(ids.map(id => { const f = locate(dir, id).wav; return [id, f ? sha256File(f) : null] }))
  const baselineFile = opts.baseline || path.join(HERE, '..', '..', 'test', 'fixtures', 'sound-baseline.sha256')
  const base = fs.existsSync(baselineFile) ? readBaseline(baselineFile) : {}
  let twice = {}
  if (opts.twice) {
    const d2 = fs.mkdtempSync(path.join(os.tmpdir(), 'envelope-verify-twice-'))
    log(`second render for A14 into ${d2}`)
    const res = await opts.renderAudio(recs.map(rec => ({ rec, opts: { outDir: d2, stems: false, encode: true, ffmpegCheck: true } })), opts.jobs)
    twice = Object.fromEntries(res.filter(r => !r.error).map(r => [r.id, r.report.wavSha256]))
    if (!opts.keep) fs.rmSync(d2, { recursive: true, force: true })
  }
  // 3. the checks, over a worker pool (each look's units run alongside)
  const muxDir = opts.video ? path.join(made || opts.buildDir ? dir : fs.mkdtempSync(path.join(os.tmpdir(), 'envelope-verify-mux-')), 'mp4') : null
  if (muxDir) fs.mkdirSync(muxDir, { recursive: true })
  const looks = [...new Set(recs.map(r => r.look))]
  const jobs = [
    ...(opts.units === false ? [] : looks.filter(l => LOOK_MODULES[l]).map(look => ({ type: 'units', look }))),
    ...recs.map(rec => ({
      type: 'spec', id: rec.id, look: rec.look, rec, dir, muxDir,
      video: opts.video ? (fs.existsSync(opts.video) && fs.statSync(opts.video).isDirectory() ? path.join(opts.video, `${rec.id}.mp4`) : opts.video) : null,
      determinism: { sha: shas[rec.id], sameAs: ids.filter(x => x !== rec.id && shas[x] && shas[x] === shas[rec.id]), twice: twice[rec.id] || null, baseline: base[rec.id] || null },
    })),
  ]
  log(`checking ${recs.length} teasers${opts.units === false ? '' : ` and the units of ${looks.join(', ')}`} (${opts.jobs} workers)`)
  const out = await pool(jobs, opts.jobs, (m, job) => { if (job.type === 'spec') log(`  checked ${job.id}${m.ok ? '' : ' (error)'}`) })
  const specs = [], units = []
  out.forEach((m, i) => {
    const job = jobs[i]
    if (job.type === 'units') units.push(m.ok ? m.r : { look: job.look, results: [{ id: 'U*', name: 'run', pass: false, detail: m.error }] })
    else specs.push(m.ok ? m.r : { id: job.id, look: job.look, results: [{ id: 'RUN', gate: true, pass: false, detail: m.error }], metrics: {} })
  })
  for (const f of buildFailures) { const s = specs.find(x => x.id === f.id); if (s) s.results.unshift({ id: 'BUILD', gate: true, pass: false, detail: f.error.split('\n')[0] }) }
  // Becker's U3/U4 come from every Becker teaser's own cues
  for (const u of units) {
    const mod = await lookModule(u.look)
    if (mod && mod.aggregateUnits) u.results.push(...mod.aggregateUnits(specs.filter(s => s.look === u.look && s.partial && !s.partial.error).map(s => s.partial).sort((a, b) => (a.id < b.id ? -1 : 1))))
  }
  // 4. the baseline, and the cue records against the ones the packs were fitted on (BIBLE.md §11.1)
  const baseCmp = ids.map(id => ({ id, sha: shas[id], base: base[id] || null })).filter(x => x.base)
  const changed = baseCmp.filter(x => x.sha !== x.base)
  const cuesFrom = opts.cuesFrom ? path.resolve(opts.cuesFrom) : null
  // a non-default brand (--no-brand, --brand, --logo) changes every record by design: no comparison then
  const drift = opts.cueCheck === false ? [] : cueDrift(recs)
  const cueReport = opts.cueCheck === false ? null : { fixture: CUE_FIXTURE, from: cuesFrom || 'mounted', live: !cuesFrom || cuesFrom !== CUE_FIXTURE, changed: drift.map(d => d.line), strict: !!opts.strictCues }
  // 5. report
  const failing = s => s.results.filter(r => r.gate && r.pass === false)
  const unitFails = units.flatMap(u => u.results.filter(r => r.pass === false && gated(r.id, u.look)).map(r => ({ look: u.look, ...r })))
  const baselineFail = !!opts.expectIdentical && (changed.length > 0 || baseCmp.length < ids.length)
  const code = specs.some(s => failing(s).length) || unitFails.length || buildFailures.length || baselineFail || (cueReport && cueReport.strict && drift.length) ? 1 : 0
  if (opts.writeBaseline) {
    if (code === 0) { writeBaseline(opts.writeBaseline, { ...readBaselineIf(opts.writeBaseline), ...Object.fromEntries(ids.filter(id => shas[id]).map(id => [id, shas[id]])) }); log(`wrote ${opts.writeBaseline}`) }
    else log(`not writing ${opts.writeBaseline}: the run failed`)
  }
  const report = {
    acceptance: path.relative(process.cwd(), ACCEPTANCE), dir, specs, units,
    baseline: { file: baselineFile, compared: baseCmp.length, changed: changed.map(x => x.id), missing: ids.filter(id => !base[id]), expectIdentical: !!opts.expectIdentical, failed: baselineFail },
    cues: cueReport,
    pending: pending().map(p => `${p.id}${p.look ? `[${p.look}]` : ''}`), seconds: +((Date.now() - t0) / 1000).toFixed(1), code,
  }
  if (opts.json) console.log(JSON.stringify(report, null, 1))
  else console.log(formatReport(report, opts))
  if (made && !opts.keep && code === 0) fs.rmSync(made, { recursive: true, force: true })
  else if (made) log(`outputs kept in ${made}`)
  if (muxDir && !made && !opts.buildDir && !opts.keep) fs.rmSync(path.dirname(muxDir), { recursive: true, force: true })
  return { code, report }
}

const readBaselineIf = f => (fs.existsSync(f) ? readBaseline(f) : {})

/** --units-only: each look's §9.5 unit checks (Becker's U3/U4 over the teasers' cues), no audio build */
async function verifyUnits(opts, t0, log) {
  const looks = [...new Set(opts.recs.map(r => r.look))].filter(l => LOOK_MODULES[l])
  const jobs = [...looks.map(look => ({ type: 'units', look })), ...opts.recs.filter(r => looks.includes(r.look)).map(rec => ({ type: 'specUnits', id: rec.id, look: rec.look, rec }))]
  log(`unit checks for ${looks.join(', ')} (${opts.jobs} workers)`)
  const out = await pool(jobs, opts.jobs)
  const units = [], partials = []
  out.forEach((m, i) => {
    const job = jobs[i]
    if (!m.ok) { units.push({ look: job.look, results: [{ id: job.type === 'units' ? 'U*' : 'U3', name: job.id || 'run', pass: false, detail: m.error }] }); return }
    if (job.type === 'units') units.push(m.r)
    else if (m.r.partial) partials.push({ look: job.look, ...m.r.partial })
  })
  for (const u of units) {
    const mod = await lookModule(u.look)
    if (mod && mod.aggregateUnits) u.results.push(...mod.aggregateUnits(partials.filter(p => p.look === u.look && !p.error).sort((a, b) => (a.id < b.id ? -1 : 1))))
  }
  const code = units.some(u => u.results.some(r => r.pass === false && gated(r.id, u.look))) ? 1 : 0
  const report = { acceptance: path.relative(process.cwd(), ACCEPTANCE), specs: [], units, baseline: { compared: 0, changed: [] }, pending: pending().map(p => `${p.id}${p.look ? `[${p.look}]` : ''}`), seconds: +((Date.now() - t0) / 1000).toFixed(1), code }
  if (opts.json) console.log(JSON.stringify(report, null, 1))
  else console.log(formatReport(report, opts))
  return { code, report }
}

/** the per-teaser table, the units, the failures */
export function formatReport(rep, { detail = false } = {}) {
  const L = []
  const cols = specIds()
  // a compact matrix: one character per check, in acceptance.json order
  L.push(`acceptance: ${rep.acceptance} (${cols.length} teaser checks; ✓ pass, ✗ fail, w waived/reported, i info, - skipped; a blank: not for this look)`)
  L.push('')
  if (rep.specs.length) {
  L.push(`${pad('teaser', 34)}${pad('look', 5)}${pad('pass', 7)}${pad('I', 8)}${pad('TP', 7)}${pad('PLR', 7)}${pad('LRA', 6)}checks`)
  L.push(`${' '.repeat(34 + 5 + 7 + 8 + 7 + 7 + 6)}${cols.map(c => c[0]).join('')}`)
  for (const s of rep.specs) {
    const by = Object.fromEntries(s.results.map(r => [r.id, r]))
    const g = s.results.filter(r => r.gate && r.pass !== null)
    const ok = g.filter(r => r.pass).length
    const m = s.metrics || {}
    L.push(`${pad(s.id.slice(0, 33), 34)}${pad(SHORT[s.look] || s.look.slice(0, 4), 5)}${pad(`${ok}/${g.length}`, 7)}${pad(fix(m.I), 8)}${pad(fix(m.TP), 7)}${pad(fix(m.PLR), 7)}${pad(fix(m.LRA), 6)}${cols.map(c => (by[c] ? sym(by[c]) : ' ')).join('')}${s.results.some(r => r.id === 'BUILD' || r.id === 'RUN') ? '  BUILD/RUN FAILED' : ''}`)
  }
  L.push(`${' '.repeat(34 + 5 + 7 + 8 + 7 + 7 + 6)}${cols.map((c, i) => (i % 5 === 0 ? '|' : ' ')).join('')}`)
  L.push(`columns: ${cols.map((c, i) => `${i + 1}:${c}`).join(' ')}`)
  // per check, per look
  L.push('')
  const looks = [...new Set(rep.specs.map(s => s.look))]
  const row = cid => looks.map(l => { const rs = rep.specs.filter(s => s.look === l).map(s => s.results.find(r => r.id === cid)).filter(Boolean); if (!rs.length) return pad('', 14); const gate = rs[0].gate; const ok = rs.filter(r => r.pass === true).length, n = rs.filter(r => r.pass !== null).length; return pad(`${SHORT[l] || l} ${n ? `${ok}/${n}` : rs[0].pass === null && !gate ? 'info' : 'skip'}${gate ? '' : ' (r)'}`, 14) }).join('')
  for (let i = 0; i < cols.length; i += 3) L.push(cols.slice(i, i + 3).map(c => `${pad(c, 7)}${row(c)}`).join('  '))
  }
  // units
  if (rep.units.length) {
    L.push('')
    for (const u of rep.units) {
      const by = {}
      for (const r of u.results) { const b = by[r.id] || (by[r.id] = { ok: 0, n: 0 }); if (r.pass !== null) { b.n++; if (r.pass) b.ok++ } }
      L.push(`units ${pad(u.look, 11)} ${Object.entries(by).map(([k, v]) => `${k} ${v.ok}/${v.n}`).join('  ')}`)
    }
  }
  // failures
  const fails = rep.specs.flatMap(s => s.results.filter(r => r.gate && r.pass === false).map(r => `  ${pad(s.id.slice(0, 33), 34)}${pad(r.id, 7)}${r.detail}`))
  const ufails = rep.units.flatMap(u => u.results.filter(r => r.pass === false).map(r => `  ${pad(u.look, 34)}${pad(r.id, 7)}${r.name}: ${r.detail}`))
  L.push('')
  if (fails.length || ufails.length) L.push(`FAILURES (${fails.length + ufails.length}):`, ...fails, ...ufails)
  else L.push('failures: none')
  if (detail) {
    for (const s of rep.specs) { L.push('', s.id); for (const r of s.results) L.push(`  ${sym(r)} ${pad(r.id, 7)}${r.detail}`) }
    for (const u of rep.units) { L.push('', `units ${u.look}`); for (const r of u.results) L.push(`  ${r.pass === null ? '-' : r.pass ? '✓' : '✗'} ${pad(r.id, 5)}${pad(r.name, 18)}${r.detail}`) }
  }
  L.push('')
  L.push(rep.pending.length ? `pending bible sync: ${rep.pending.length} values (${rep.pending.join(', ')}); see ${rep.acceptance} or \`node src/cli.mjs verify --pending\`` : 'pending bible sync: none')
  const b = rep.baseline
  if (b.compared) L.push(`baseline: ${b.compared - b.changed.length}/${b.compared} master WAVs identical to ${path.relative(process.cwd(), b.file)}${b.changed.length ? `; changed: ${b.changed.join(', ')}` : ''}${b.missing && b.missing.length ? `; not in it: ${b.missing.join(', ')}` : ''}`)
  if (b.failed) L.push('--expect-identical: the audio differs from the baseline (a failure)')
  const c = rep.cues
  if (c) {
    const rel = f => path.relative(process.cwd(), f) || f
    if (c.changed.length) {
      L.push(`CUE DRIFT (${c.changed.length}${c.strict ? ', a failure with --strict-cues' : ''}): these records differ from ${rel(c.fixture)}, the records the packs' fitted values (calibration.json, MODEL) were fitted on. Every check above can pass with stale fitted values: refit, verify, then store the records (${STORE_CUES}) and regenerate the tempo table (BIBLE.md §11.1).`)
      for (const line of c.changed) L.push(`  ${line}`)
    } else if (!c.live) L.push(`cue records: read from ${rel(c.fixture)} itself, so no drift check (mount the specs, or run node --test test/cues.test.mjs)`)
    else L.push(`cue records: all ${rep.specs.length} match ${rel(c.fixture)}${c.from === 'mounted' ? ' (mounted now)' : ` (from ${rel(c.from)})`}`)
  }
  const nSpec = rep.specs.filter(s => !s.results.some(r => r.gate && r.pass === false)).length
  const nUnit = rep.units.filter(u => !u.results.some(r => r.pass === false)).length
  const also = [b.failed && 'the baseline (--expect-identical)', c && c.strict && c.changed.length && 'cue drift (--strict-cues)'].filter(Boolean)
  L.push(`${rep.code ? 'FAIL' : 'PASS'}: ${rep.specs.length ? `${nSpec}/${rep.specs.length} teasers pass` : 'unit checks only'}${rep.units.length ? `, units ${nUnit}/${rep.units.length} looks` : ''}${also.length ? `; failed on ${also.join(' and ')}` : ''} (${rep.seconds} s)`)
  return L.join('\n')
}
