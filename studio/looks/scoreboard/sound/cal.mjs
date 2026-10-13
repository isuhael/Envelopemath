// The pack's calibration (calibrate.mjs writes calibration.json from a full render of the 15 teasers): the bed table of
// the music-stem model (at the bus's 0 dB: sfx.mjs adds the energy curve back), the model's fit, the master-gain
// relation and the logo's level.
// Read once at load time; a missing file falls back to these defaults (measured 2026-10-11).
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// The defaults: the tables at the bus's 0 dB (the energy curve taken out), measured 2026-10-11 on all 15
const DEFAULTS = {
  BEDS: { HOOK: { 3: -19.3, 4: -17.5 }, BUILD: { 3: -19.5, 4: -18.3 }, TENSION: { 4: -18.6 }, DROP: { 5: -18.9 }, HOLD: { 3: -18 }, BREAK: { 2: -18.1 }, VERDICT: { 4: -18.2 }, CADENCE: { 3: -18.6 }, HOLD2: { 3: -18.3 } },
  OFF_EFF: 0.65, M_FIT: 1.67, GM: -16.07, GM_PLAN: -15.98, LOGO_PRE: -16.24, OPEN_FIT: 1.94,
  GM_SFX: 0, LOGO_SLOPE: 0, PAY_LOSS: 1.4, PAY_HIT: 1.6, BAND_REF: { w: 1 }, BAND_FIT: {}, BAND_SD: {},
}
const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), 'calibration.json')
let loaded = {}
try { if (fs.existsSync(FILE)) loaded = JSON.parse(fs.readFileSync(FILE, 'utf8')) } catch { loaded = {} }
export const CAL = { ...DEFAULTS, ...loaded }
/** a table lookup by section name and energy, falling back to the section's first entry, then `dflt` */
export function lookup(table, sec, E, dflt) {
  const o = table[sec]
  if (!o) return dflt
  return o[E] ?? Object.values(o)[0] ?? dflt
}
/** sound/acceptance.json (the thresholds, §9.0): the pack aims inside the windows it holds (BANDS, B8), read once */
const ACC = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '..', 'sound', 'acceptance.json')
let ACCEPT = null
export function acceptance() {
  if (!ACCEPT) { try { ACCEPT = JSON.parse(fs.readFileSync(ACC, 'utf8')) } catch { ACCEPT = { checks: {} } } }
  return ACCEPT
}
