#!/usr/bin/env node
// envelope-render: render Envelope Math teaser specs.
//   render <spec.json...> [-o out.mp4|dir] [--scale 1] [--no-audio]
//   sheet  <spec.json> [-o sheet.png] [--n 12] [--times 1,2.5,4] [--safe]
//   still  <spec.json> --t 3.2 [-o still.png] [--scale 0.5] [--safe]
//   check  <spec.json...>
import fs from 'node:fs'
import path from 'node:path'
import { prepare } from './timeline.js'
import { lint } from './check.js'
import { renderVideo, renderStill, renderSheet } from './render.js'

function parse(argv) {
  const [cmd, ...rest] = argv
  const files = [], opt = {}
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i]
    if (a === '-o') opt.out = rest[++i]
    else if (a.startsWith('--no-')) opt[a.slice(5)] = false
    else if (a.startsWith('--')) {
      const next = rest[i + 1]
      if (next == null || next.startsWith('-')) opt[a.slice(2)] = true
      else opt[a.slice(2)] = rest[++i]
    } else files.push(a)
  }
  return { cmd, files, opt }
}

const load = f => prepare(JSON.parse(fs.readFileSync(f, 'utf8')))
const stem = f => path.basename(f).replace(/\.json$/, '')

async function main() {
  const { cmd, files, opt } = parse(process.argv.slice(2))
  if (!cmd || !files.length) {
    console.log('usage: envelope-render <render|sheet|still|check> <spec.json...> [options]')
    process.exit(cmd ? 1 : 0)
  }
  let failed = 0
  for (const file of files) {
    let spec
    try {
      spec = load(file)
    } catch (e) {
      console.error(`✗ ${file}: ${e.message}`)
      failed++
      continue
    }
    const warnings = lint(spec)
    if (cmd === 'check') {
      console.log(`${warnings.length ? '⚠' : '✓'} ${file} (${spec.duration}s, ${spec._ops.length} ops)`)
      for (const w of warnings) console.log(`   - ${w}`)
      continue
    }
    for (const w of warnings) console.warn(`⚠ ${stem(file)}: ${w}`)
    const multi = files.length > 1 || (opt.out && !path.extname(opt.out))
    const outFor = ext => (multi ? path.join(opt.out || 'out', `${stem(file)}${ext}`) : opt.out || path.join('out', `${stem(file)}${ext}`))
    if (cmd === 'render') {
      const t0 = Date.now()
      const res = await renderVideo(spec, {
        out: outFor('.mp4'),
        scale: opt.scale ? Number(opt.scale) : 1,
        audio: opt.audio !== false,
        onProgress: p => process.stdout.write(`\r${stem(file)} ${Math.round(p * 100)}%  `),
      })
      console.log(`\r✓ ${res.out} (${res.size}, ${res.frames} frames, ${((Date.now() - t0) / 1000).toFixed(1)}s)`)
    } else if (cmd === 'sheet') {
      const out = renderSheet(spec, {
        out: outFor('.sheet.png'),
        n: opt.n ? Number(opt.n) : 12,
        times: typeof opt.times === 'string' ? opt.times.split(',').map(Number) : undefined,
        safe: !!opt.safe,
      })
      console.log(`✓ ${out}`)
    } else if (cmd === 'still') {
      const out = renderStill(spec, Number(opt.t ?? 0), { out: outFor(`.${opt.t ?? 0}s.png`), scale: opt.scale ? Number(opt.scale) : 0.5, safe: !!opt.safe })
      console.log(`✓ ${out}`)
    } else {
      console.error(`unknown command ${cmd}`)
      process.exit(1)
    }
  }
  process.exit(failed ? 1 : 0)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
