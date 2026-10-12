#!/usr/bin/env node
// The bible's §2.3 reference table (the tempo-map test vectors) for a cue-record file, and what to do when it moved.
//   node sound/tools/tempo-table.mjs [--cues <cues.json>] [--write] [--no-ref]       (run from studio/)
// 1. Runs Appendix B's Python reference implementation, straight from sound/BIBLE.md, on the records (default
//    test/fixtures/cues.json). It is the independent source of the rows; it needs python3 (no packages).
// 2. Checks the engine (src/sound/timeline.mjs buildTimeline) against every row, with the test's tolerances. If they
//    disagree, it stops: fix the engine or the rule (§2.2-2.4 and Appendix B), never the table.
// 3. Compares the rows with the §2.3 table in sound/BIBLE.md and lists the rows that moved (P, V, base or L).
//    --write rewrites the table's rows. test/sound.test.mjs reads its vectors from that table, so there is no copy
//    to edit. --no-ref (no python3) uses the engine's own rows, which then checks nothing: say so in the change.
// 4. Prints the values test/sound.test.mjs pins from Appendix A (09c, 09b) and the clock trains, for a hand update.
// See BIBLE.md §11.1. The module also exports the table parser and the row check the test uses.
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { buildTimeline } from '../../src/sound/timeline.mjs'

export const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')
export const BIBLE = path.join(STUDIO, 'sound', 'BIBLE.md')
export const FIXTURE = path.join(STUDIO, 'test', 'fixtures', 'cues.json')
const HEAD = '| Spec | P rule | P (s) |'
/** what a failing tempo-map test or this tool tells the maintainer */
export const REGEN_HINT = 'If the cue records changed (a kit, spec or brand change, then a new test/fixtures/cues.json), regenerate the table: node sound/tools/tempo-table.mjs --write (BIBLE.md §11.1). If they did not, the engine\'s tempo map changed: fix src/sound/timeline.mjs'

/** the §2.3 table in BIBLE.md: all lines, and the index range of its rows */
export function tableLines(md = fs.readFileSync(BIBLE, 'utf8')) {
  const lines = md.split('\n')
  const h = lines.findIndex(l => l.startsWith(HEAD))
  if (h < 0) throw new Error(`sound/BIBLE.md: the §2.3 reference table (a line starting "${HEAD}") is missing`)
  let to = h + 2
  while (to < lines.length && lines[to].startsWith('|')) to++
  return { lines, from: h + 2, to, rows: lines.slice(h + 2, to) }
}

/** one §2.3 row -> { id, rule, P, n1, r1, bpm1, later: [{ to, b, n, r, bpm } | { to, b, free }], L } */
export function parseRow(line) {
  const c = line.split('|').slice(1, -1).map(s => s.trim())
  const fail = why => { throw new Error(`BIBLE.md §2.3 row "${line}": ${why}`) }
  if (c.length !== 7) fail('7 cells expected')
  const [id, rule, P, n1, bpm1, later, L] = c
  const m = /^(\d+) \(r(\d)\)$/.exec(n1) || fail(`N1 "${n1}"`)
  const segs = later.split(' · ').map(s => {
    let x = /^(V|base) ([\d.]+): (\d+) \(r(\d)\) @ ([\d.]+)$/.exec(s)
    if (x) return { to: x[1], b: +x[2], n: +x[3], r: +x[4], bpm: +x[5] }
    x = /^(V|base) ([\d.]+): free$/.exec(s)
    if (x) return { to: x[1], b: +x[2], free: true }
    return fail(`segment "${s}"`)
  })
  const num = (s, what) => (/^\d+(\.\d+)?$/.test(s) ? +s : fail(`${what} "${s}"`))
  return { id, rule, P: num(P, 'P'), n1: +m[1], r1: +m[2], bpm1: num(bpm1, 'BPM1'), later: segs, L: L === '—' ? null : num(L, 'L'), line }
}

/** the §2.3 rows of BIBLE.md, parsed */
export const readTable = md => tableLines(md).rows.map(parseRow)

/** where an engine timeline disagrees with a row ([] = it reproduces it): P and the anchors exact, BPM 0.01, L 0.006 */
export function checkRow(row, tl) {
  const bad = [], P = tl.anchors.P, s1 = tl.tempo[0], segs = tl.tempo.slice(1)
  if (P.t !== row.P) bad.push(`P ${P.t} (table ${row.P})`)
  if (P.rule !== row.rule) bad.push(`P rule ${P.rule} (table ${row.rule})`)
  if (s1.n !== row.n1) bad.push(`N1 ${s1.n} (table ${row.n1})`)
  if (!(Math.abs(s1.bpm - row.bpm1) < 0.01)) bad.push(`BPM1 ${s1.bpm.toFixed(3)} (table ${row.bpm1})`)
  if (row.n1 % 4 !== row.r1) bad.push(`the table's N1 ${row.n1} is r${row.n1 % 4}, not r${row.r1}`)
  if (segs.length !== row.later.length) bad.push(`${segs.length} later segments (table ${row.later.length})`)
  else row.later.forEach((w, j) => {
    const g = segs[j], k = `segment ${j + 2}`
    if (g.to !== w.to || Math.abs(g.b - w.b) >= 1e-9) bad.push(`${k} ends at ${g.to} ${g.b} (table ${w.to} ${w.b})`)
    if (!!g.free !== !!w.free) bad.push(`${k} ${g.free ? 'free' : `${g.n} beats`} (table ${w.free ? 'free' : `${w.n} beats`})`)
    else if (!w.free) {
      if (g.n !== w.n || !(Math.abs(g.bpm - w.bpm) < 0.01)) bad.push(`${k} ${g.n} @ ${g.bpm.toFixed(2)} (table ${w.n} @ ${w.bpm})`)
      if (w.n % 4 !== w.r) bad.push(`the table's ${k} ${w.n} is r${w.n % 4}, not r${w.r}`)
    }
  })
  const L = tl.card ? tl.card.L : null
  if ((L == null) !== (row.L == null) || (L != null && !(Math.abs(L - row.L) < 0.006))) bad.push(`L ${L == null ? '—' : L.toFixed(3)} (table ${row.L ?? '—'})`)
  return bad
}

/** the engine's row for a record, formatted as Appendix B prints it */
export function engineRow(rec) {
  const tl = buildTimeline(rec, null, { overrides: {} })
  const num = (x, d) => { const s = x.toFixed(d); return +s === x ? s : String(x) }
  const s1 = tl.tempo[0], P = tl.anchors.P
  const later = tl.tempo.slice(1).map(g => `${g.to} ${num(g.b, 2)}: ` + (g.free ? 'free' : `${g.n} (r${g.n % 4}) @ ${g.bpm.toFixed(2)}`)).join(' · ')
  return `| ${rec.id.split('-')[0]} | ${P.rule} | ${num(P.t, 3)} | ${s1.n} (r${s1.n % 4}) | ${s1.bpm.toFixed(3)} | ${later} | ${tl.card ? tl.card.L.toFixed(2) : '—'} |`
}

/** Appendix B's code block, from BIBLE.md */
export function appendixB(md = fs.readFileSync(BIBLE, 'utf8')) {
  const i = md.indexOf('## Appendix B')
  const s = i < 0 ? -1 : md.indexOf('```python\n', i)
  if (s < 0) throw new Error('sound/BIBLE.md: Appendix B\'s ```python block is missing')
  return md.slice(s + 10, md.indexOf('\n```', s + 10)) + '\n'
}

/** run Appendix B on a cue file: { rows } or { missing: true } (no python3) or { error } */
export function runReference(cuesFile, md) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'tempo-ref-'))
  try {
    const py = path.join(dir, 'ref.py')
    fs.writeFileSync(py, appendixB(md))
    const r = spawnSync('python3', ['-I', py, cuesFile], { encoding: 'utf8', env: { ...process.env, PYTHONIOENCODING: 'utf-8' } })
    if (r.error && r.error.code === 'ENOENT') return { missing: true }
    if (r.error || r.status !== 0) return { error: (r.error && r.error.message) || r.stderr.trim() }
    return { rows: r.stdout.split('\n').filter(l => l.startsWith('|')) }
  } finally { fs.rmSync(dir, { recursive: true, force: true }) }
}

/** what test/sound.test.mjs pins from Appendix A and the cue prep, in the test's own notation */
export function appendixPins(recs) {
  const by = p => recs.find(r => r.id.startsWith(p + '-'))
  const tl = p => (by(p) ? buildTimeline(by(p), null, { overrides: {} }) : null)
  const out = []
  const a = tl('09c'), b = tl('09b')
  if (a) {
    out.push(`09c sections (b1 of CARD not pinned): ${JSON.stringify(a.sections.map(s => [s.name, s.b0, s.b1]).slice(0, -1)).replace(/"/g, "'")}`)
    out.push(`09c energy: '${a.bars.map(x => x.energy).join('')}'   bar 0: ${a.bars[0].beats} beats${a.bars[0].pickup ? ' (pickup)' : ''}   bar 10 split: ${JSON.stringify(a.bars[10] && a.bars[10].split)}`)
    out.push(`09c first cue: t ${a.cues[0].t}, tCue ${a.cues[0].tCue}, ${a.cues[0].kind}`)
  }
  if (b) out.push(`09b energy: '${b.bars.map(x => x.energy).join('')}'   V: ${b.anchors.V ? b.anchors.V.t : null}`)
  const trains = [['10a', 'tick'], ['10b', 'tick'], ['02a', 'thud'], ['09b', 'thud']].map(([p, k]) => {
    const t = tl(p), tr = t && t.trains.find(x => x.kind === k)
    return `${p} ${k} ${tr ? tr.period.toFixed(3) : 'none'}`
  })
  out.push(`clock trains (period, s): ${trains.join(', ')}`)
  return out
}

function cli(argv) {
  const flags = { write: false, ref: true, cues: FIXTURE }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '--write') flags.write = true
    else if (a === '--no-ref') flags.ref = false
    else if (a === '--cues' && argv[i + 1]) flags.cues = path.resolve(argv[++i])
    else if (a.startsWith('--cues=')) flags.cues = path.resolve(a.slice(7))
    else if (a === '-h' || a === '--help') { console.log('usage: node sound/tools/tempo-table.mjs [--cues <cues.json>] [--write] [--no-ref]'); return 0 }
    else { console.error(`unknown argument ${a}\nusage: node sound/tools/tempo-table.mjs [--cues <cues.json>] [--write] [--no-ref]`); return 2 }
  }
  const md = fs.readFileSync(BIBLE, 'utf8')
  const cues = JSON.parse(fs.readFileSync(flags.cues, 'utf8'))
  const recs = Object.keys(cues).sort().map(k => cues[k])
  const recOf = id => recs.find(r => r.id.startsWith(id + '-'))
  console.log(`cue records: ${path.relative(process.cwd(), flags.cues) || flags.cues} (${recs.length})`)
  if (path.resolve(flags.cues) !== FIXTURE && flags.write) console.log('note: the test reads test/fixtures/cues.json; the table you write must describe the records stored there')

  // 1-2. the reference, and the engine against it
  let rows
  if (flags.ref) {
    const r = runReference(flags.cues, md)
    if (r.missing) { console.error('python3 not found: it runs Appendix B, the independent reference. Install it, or pass --no-ref to use the engine\'s own rows (they then check nothing).'); return 2 }
    if (r.error) { console.error(`Appendix B failed on these records:\n${r.error}`); return 1 }
    rows = r.rows
    const ids = rows.map(l => parseRow(l).id), missing = recs.map(x => x.id.split('-')[0]).filter(id => !ids.includes(id))
    const disagree = []
    for (const line of rows) {
      const row = parseRow(line), rec = recOf(row.id)
      const bad = rec ? checkRow(row, buildTimeline(rec, null, { overrides: {} })) : ['no record']
      if (bad.length) disagree.push(`  ${row.id}: ${bad.join('; ')}`)
    }
    if (missing.length) disagree.push(`  Appendix B printed no row for ${missing.join(', ')}`)
    if (disagree.length) {
      console.error(`The engine and Appendix B (the bible's reference implementation) disagree:\n${disagree.join('\n')}\nDo not regenerate the table. Fix the engine (src/sound/timeline.mjs) or, if the rule itself changes, §2.2-2.4 and Appendix B together.`)
      return 1
    }
    console.log(`Appendix B (python3) and the engine agree on all ${rows.length} rows.`)
  } else {
    rows = recs.map(engineRow)
    console.log(`--no-ref: the engine's own rows (${rows.length}), not checked against Appendix B.`)
  }

  // 3. against the table in BIBLE.md
  const t = tableLines(md)
  const key = l => l.split('|')[1].trim()
  const old = new Map(t.rows.map(l => [key(l), l])), now = new Map(rows.map(l => [key(l), l]))
  const changes = []
  for (const [id, l] of now) if (!old.has(id)) changes.push(`  + ${l}`); else if (old.get(id) !== l) changes.push(`  ${id} was ${old.get(id)}\n  ${id} now ${l}`)
  for (const [id, l] of old) if (!now.has(id)) changes.push(`  - ${l}`)
  if (!changes.length) console.log(`BIBLE.md §2.3 already holds these ${rows.length} rows: nothing to regenerate.`)
  else {
    console.log(`BIBLE.md §2.3 differs in ${changes.length} row(s):\n${changes.join('\n')}`)
    if (flags.write) {
      const lines = [...t.lines.slice(0, t.from), ...rows, ...t.lines.slice(t.to)]
      fs.writeFileSync(BIBLE, lines.join('\n'))
      console.log(`wrote ${path.relative(process.cwd(), BIBLE)}: the §2.3 rows. Record the change in the bible's status block (which specs moved, and why).`)
    } else console.log('Run again with --write to rewrite them (BIBLE.md §11.1).')
  }

  // 4. the hand-kept pins
  console.log('\nValues test/sound.test.mjs pins ("timeline: Appendix A ..."). If 09c or 09b moved, update them there and Appendix A by hand:')
  for (const l of appendixPins(recs)) console.log(`  ${l}`)
  return 0
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) process.exitCode = cli(process.argv.slice(2))
