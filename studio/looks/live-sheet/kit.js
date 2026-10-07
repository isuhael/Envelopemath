// Live Sheet kit: a designed spreadsheet on near-black, one yellow accent.
// Every format lives in ./formats/<id>.js: default export (spec, ctx) => ({ duration, seek(t), chrome? }),
// optional named export `css` (a string injected once). Shared pieces are in ./lib.js; tokens in ./theme.js.
import { defineKit } from '../../runtime/core.js'
import { chrome } from './lib.js'
import * as findYourRow from './formats/find-your-row.js'
import * as deadSimpleList from './formats/dead-simple-list.js'
import * as whatDifference from './formats/what-difference.js'
import * as chartRace from './formats/chart-race.js'
import * as povRace from './formats/pov-race.js'
import * as ledgerDuel from './formats/ledger-duel.js'
import * as growthLadder from './formats/growth-ladder.js'
import * as costCounter from './formats/cost-counter.js'

const MODULES = {
  'find-your-row': findYourRow,
  'dead-simple-list': deadSimpleList,
  'what-difference': whatDifference,
  'chart-race': chartRace,
  'pov-race': povRace,
  'ledger-duel': ledgerDuel,
  'growth-ladder': growthLadder,
  'cost-counter': costCounter,
}

// Load every face the kit uses before any format measures text (fitText, column widths).
const FACES = [
  '400 40px Inter', '500 40px Inter', '600 40px Inter', '700 40px Inter', '800 40px Inter', '900 40px Inter',
  '700 40px "JetBrains Mono"', '800 40px "JetBrains Mono"',
]
const SYMBOLS = '≈×÷−→←↑↓✓'
await Promise.all([
  ...FACES.map(f => document.fonts.load(f, 'Aa$0123456789,.%')),
  ...[600, 700, 800, 900].map(w => document.fonts.load(`${w} 40px "Inter Full"`, SYMBOLS)),
]).catch(() => {})

const injected = new Set()
function injectCss(id, text) {
  if (!text || injected.has(id)) return
  injected.add(id)
  const el = document.createElement('style')
  el.dataset.format = id
  el.textContent = text
  document.head.append(el)
}

const formats = {}
for (const [id, mod] of Object.entries(MODULES)) {
  formats[id] = (spec, ctx) => {
    injectCss(id, mod.css)
    return mod.default(spec, ctx)
  }
}

defineKit({ name: 'live-sheet', formats, chrome })
