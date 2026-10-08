#!/usr/bin/env node
// envelope studio CLI
//   node src/cli.mjs render specs/a.json [specs/b.json ...] [--out out] [--jobs 2] [--crf 18] [--sheet]   (or --all)
//   node src/cli.mjs check  specs/*.json [--every 0.25] [--json]
//   node src/cli.mjs stills specs/a.json --at 0,1.5,end [--out out/stills]
//   node src/cli.mjs sheet  specs/*.json [--n 12 | --at 0,1.5,3] [--out out/sheets]
// With no spec arguments, check/stills/sheet use every specs/*.json; render needs --all for that.
// Brand (studio/brand/brand.json: the logo in the look's mark + the CTA end card) is on by default:
//   --no-brand          render/lint exactly as before the brand layer (no end card, the look's own mark)
//   --brand file.json   use another brand config
//   --logo file.png     use this logo instead of brand.logo (e.g. a test logo; nothing is copied into studio/brand/)
import fs from 'node:fs'
import path from 'node:path'
import { ROOT, readSpec as readSpecFile, launch, loadBrand, brandSummary } from './page.mjs'
import { renderSpec, renderStills, contactSheet } from './render.mjs'
import { checkSpec, formatReport } from './check.mjs'

const [cmd, ...rest] = process.argv.slice(2)
const files = [], opt = {}
// flags that never take a value (so "--no-brand specs/a.json" keeps the spec)
const BOOL = new Set(['all', 'sheet', 'json', 'no-brand', 'help', 'h'])
for (let i = 0; i < rest.length; i++) {
  const a = rest[i]
  if (a.startsWith('--')) {
    const k = a.slice(2)
    const v = !BOOL.has(k) && rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true
    opt[k] = v
  } else files.push(a)
}
const brandOpt = opt['no-brand'] ? false : { ...(typeof opt.brand === 'string' ? { config: opt.brand } : {}), ...(typeof opt.logo === 'string' ? { logo: opt.logo } : {}) }
const readSpec = f => readSpecFile(f, { brand: brandOpt })
if (opt.help || opt.h) {
  console.log('usage: cli.mjs render|check|stills|sheet <specs...> [--options]   (render needs explicit specs, or --all)')
  process.exit(0)
}
// rendering everything by accident is slow and overwrites finished MP4s, so render needs explicit specs or --all
if (cmd === 'render' && !files.length && !opt.all) {
  console.error('render: name the specs to render (or pass --all)')
  process.exit(2)
}
const specFiles = files.length ? files : fs.readdirSync(path.join(ROOT, 'specs')).filter(f => f.endsWith('.json')).sort().map(f => path.join(ROOT, 'specs', f))
const outDir = path.resolve(opt.out || path.join(ROOT, 'out'))

async function pool(items, jobs, fn) {
  const res = new Array(items.length)
  let next = 0
  await Promise.all(Array.from({ length: Math.min(jobs, items.length) }, async () => {
    while (next < items.length) { const i = next++; res[i] = await fn(items[i], i) }
  }))
  return res
}

async function main() {
  if (!['render', 'check', 'stills', 'sheet'].includes(cmd)) {
    console.error('usage: cli.mjs render|check|stills|sheet [specs...] [--options]')
    process.exit(2)
  }
  if (brandOpt && typeof opt.logo === 'string' && !fs.existsSync(path.resolve(opt.logo))) {
    console.error(`--logo ${opt.logo}: no such file`)
    process.exit(2)
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
          const r = await renderSpec(browser, spec, { outDir, crf: +(opt.crf || 18), preset: opt.preset || 'medium' })
          console.log(`✓ ${spec.id}: ${r.duration.toFixed(1)} s, ${r.frames} frames, ${r.sfx} sfx → ${path.relative(process.cwd(), r.mp4)} (${((Date.now() - t0) / 1000).toFixed(0)} s)`)
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
