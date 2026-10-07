// Clean Sheet look kit: a typeset worked page (formulas in grey mono, results on highlighters) on a dark desk.
// Each format lives in ./formats/<id>.js: default export (spec, ctx) => ({ duration, seek(t) }), optional
// `export const css = '...'` (injected once below). The shared page (header, footer, captions, verdict) is
// built by lib.mountPage BEFORE the format runs, so a format only draws into ctx.page.layer.
import { defineKit } from '../../runtime/core.js'
import { preloadFonts, mountPage, chrome } from './lib.js'
import * as deadSimpleList from './formats/dead-simple-list.js'
import * as findYourRow from './formats/find-your-row.js'
import * as whatDifference from './formats/what-difference.js'
import * as splitSheet from './formats/split-sheet.js'
import * as ledgerDuel from './formats/ledger-duel.js'
import * as unitLadder from './formats/unit-ladder.js'

const MODULES = {
  'dead-simple-list': deadSimpleList,
  'find-your-row': findYourRow,
  'what-difference': whatDifference,
  'split-sheet': splitSheet,
  'ledger-duel': ledgerDuel,
  'unit-ladder': unitLadder,
}

// format CSS, injected once
const style = document.createElement('style')
style.id = 'cs-format-css'
style.textContent = Object.entries(MODULES).map(([id, m]) => (m.css ? `/* ${id} */\n${m.css}` : '')).join('\n')
document.head.append(style)

// every face measured at mount must be loaded first
await preloadFonts()

const formats = {}
for (const [id, m] of Object.entries(MODULES)) {
  formats[id] = (spec, ctx) => {
    mountPage(spec, ctx)
    return m.default(spec, ctx)
  }
}

defineKit({ name: 'clean-sheet', formats, chrome })
