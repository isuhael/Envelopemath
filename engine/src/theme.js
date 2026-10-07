// The Envelope Math look: fonts, ink colours, frame geometry and platform safe zones.
import { GlobalFonts } from '@napi-rs/canvas'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)

const FONT_FILES = [
  ['Caveat', '@fontsource/caveat/files/caveat-latin-700-normal.woff2'],
  ['Caveat', '@fontsource/caveat/files/caveat-latin-ext-700-normal.woff2'],
  ['Kalam', '@fontsource/kalam/files/kalam-latin-700-normal.woff2'],
  ['Special Elite', '@fontsource/special-elite/files/special-elite-latin-400-normal.woff2'],
  ['Permanent Marker', '@fontsource/permanent-marker/files/permanent-marker-latin-400-normal.woff2'],
  ['Inter', '@fontsource/inter/files/inter-latin-800-normal.woff2'],
  ['Inter', '@fontsource/inter/files/inter-latin-900-normal.woff2'],
]

let registered = false
export function registerFonts() {
  if (registered) return
  for (const [family, rel] of FONT_FILES) {
    const file = require.resolve(rel)
    GlobalFonts.registerFromPath(file, family)
  }
  registered = true
}

// Font stacks fall back to DejaVu for glyphs the handwriting faces lack (≈, ✓, →, ₹ ...).
export const FONTS = {
  hand: 'Caveat, Kalam, "DejaVu Sans"',
  type: '"Special Elite", "DejaVu Sans Mono"',
  marker: '"Permanent Marker", Kalam, "DejaVu Sans"',
  sans: 'Inter, "DejaVu Sans"',
}

export const font = (kind, size, weight = 700) => `${kind === 'sans' ? weight : 700} ${size}px ${FONTS[kind] || FONTS.hand}`

export const INK = {
  ink: '#1c2d5e', // ballpoint blue: the default for all working
  pencil: '#3a3a3a',
  red: '#c0322a', // corrections, verdicts, stamps
  green: '#23704a', // "you keep" / gains
  black: '#141414',
  white: '#fbf8f1',
  gold: '#b8862b',
  highlight: 'rgba(255, 221, 64, 0.55)',
  tape: '#efe3c2',
}
export const ink = c => INK[c] || c || INK.ink

export const W = 1080
export const H = 1920

// Areas the YouTube/Instagram/TikTok overlays cover (top bar, right-hand button rail, caption block).
// Keep anything that must be read inside SAFE; below railY the right edge tightens to railX.
export const SAFE = { x0: 60, x1: 1020, y0: 230, y1: 1480, railX: 940, railY: 820 }

// Captions (spec.captions) are drawn centred on this band; keep content out of it while they play.
export const CAPTION_BAND = { y0: 1320, y1: 1480 }
