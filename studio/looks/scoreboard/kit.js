// Scoreboard look kit: money as a live score. Black bars, a neon odometer, a pile of everyday objects,
// the one-line working in the bottom bar. See README.md for the design system and the format module contract.
//
// Every format lives in ./formats/<id>.js and default-exports a factory (spec, ctx) => ({ duration, seek, ... }).
// A module may also export `css` (a string), injected once into a <style> tag.
// Modules are imported one by one, so a broken format only breaks itself (its mount throws the import error).
import { defineKit, h } from '../../runtime/core.js'
import { chrome, loadFonts } from './lib.js'
import { brand } from './cta.js'

export const FORMATS = [
  'unit-ladder',
  'find-your-row',
  'what-difference',
  'chart-race',
  'split-sheet',
  'pov-race',
  'growth-ladder',
  'cost-counter',
  'dead-simple-list',
  'ledger-duel',
]

const loaded = await Promise.allSettled(FORMATS.map(id => import(`./formats/${id}.js`)))
const formats = {}
FORMATS.forEach((id, i) => {
  const r = loaded[i]
  if (r.status === 'fulfilled' && typeof r.value.default === 'function') {
    formats[id] = r.value.default
    if (r.value.css) document.head.append(h('style', { 'data-format': id }, r.value.css))
  } else {
    const why = r.status === 'rejected' ? (r.reason && (r.reason.stack || r.reason.message)) || String(r.reason) : 'no default export'
    console.warn(`scoreboard: format "${id}" failed to load: ${why}`)
    formats[id] = () => { throw new Error(`scoreboard format "${id}" failed to load: ${why}`) }
  }
})

await loadFonts()

// brand: the channel logo in the brand row and the CTA end card (cta.js; studio/README.md "Brand layer")
defineKit({ name: 'scoreboard', formats, chrome, brand })
