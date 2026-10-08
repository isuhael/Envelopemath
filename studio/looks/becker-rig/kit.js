// becker-rig kit entry. Loads every format module, injects each module's optional `css` export once,
// waits for the fonts (layout measures text), then defines the kit.
//
// Format modules live in ./formats/<format>.js:  export default (spec, ctx) => ({ duration, seek(t) })
//                                                export const css = `...`   (optional, injected once)
// A module that fails to load only breaks its own format (mounting it throws with the load error);
// the other formats keep working, so formats can be developed in parallel.
import { defineKit } from '../../runtime/core.js'
import { chrome, preloadFonts } from './lib.js'

const FORMATS = [
  'growth-ladder',
  'dead-simple-list',
  'chart-race',
  'split-sheet',
  'pov-race',
  'ledger-duel',
  'unit-ladder',
  'cost-counter',
  'find-your-row',
  'what-difference',
]

const mods = await Promise.all(FORMATS.map(name =>
  import(`./formats/${name}.js`).then(
    m => [name, m],
    err => {
      console.warn(`becker-rig: format "${name}" failed to load: ${err && err.message}`)
      return [name, { default: () => { throw new Error(`becker-rig format "${name}" failed to load: ${err && err.message}`) } }]
    },
  ),
))

const style = document.createElement('style')
style.id = 'br-format-css'
style.textContent = mods.map(([name, m]) => (m.css ? `/* ${name} */\n${m.css}` : '')).join('\n')
document.head.append(style)

await preloadFonts()

defineKit({
  name: 'becker-rig',
  formats: Object.fromEntries(mods.map(([name, m]) => [name, m.default])),
  chrome,
})
