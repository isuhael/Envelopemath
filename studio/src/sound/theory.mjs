// Pitch and harmony utilities (bible §1, §4.2, §6.2): MIDI <-> Hz and names, scales, chord symbols, chord tones in a
// register, nearest/above/below tone, and voice-led voicings.
import { mtof, ftom } from './dsp.mjs'

export { mtof, ftom }
const NAMES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
const NAMES_FLAT = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
const LETTER = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }
export const mod12 = x => ((x % 12) + 12) % 12

/** 'D', 'F#', 'Bb', 'Eb' -> pitch class 0..11 */
export function pc(name) {
  const m = /^([A-Ga-g])([#b♯♭]*)/.exec(String(name).trim())
  if (!m) throw new Error(`pc: cannot read "${name}"`)
  let v = LETTER[m[1].toUpperCase()]
  for (const a of m[2]) v += a === '#' || a === '♯' ? 1 : -1
  return mod12(v)
}
/** 'D4' -> 62, 'F#6' -> 90, 'Bb1' -> 34 (C4 = 60) */
export function midi(name) {
  if (typeof name === 'number') return name
  const m = /^([A-Ga-g][#b♯♭]*)(-?\d+)$/.exec(String(name).trim())
  if (!m) throw new Error(`midi: cannot read "${name}"`)
  const p = pc(m[1])
  // the octave belongs to the letter: Cb4 = B3, B#3 = C4
  const letter = LETTER[m[1][0].toUpperCase()]
  const acc = p - letter > 6 ? p - letter - 12 : p - letter < -6 ? p - letter + 12 : p - letter
  return (+m[2] + 1) * 12 + letter + acc
}
export const hz = name => mtof(midi(name))
export function noteName(m, { flats = false } = {}) {
  const r = Math.round(m)
  return (flats ? NAMES_FLAT : NAMES_SHARP)[mod12(r)] + (Math.floor(r / 12) - 1)
}

// ---------------------------------------------------------------- scales and keys
export const MODES = {
  major: [0, 2, 4, 5, 7, 9, 11], ionian: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10], aeolian: [0, 2, 3, 5, 7, 8, 10],
  dorian: [0, 2, 3, 5, 7, 9, 10], mixolydian: [0, 2, 4, 5, 7, 9, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11], majorPent: [0, 2, 4, 7, 9], minorPent: [0, 3, 5, 7, 10],
}
/** key('D', 'minor') -> { tonic: 2, mode: 'minor', pcs: [2, 4, 5, 7, 9, 10, 0], name: 'D minor' } */
export function key(tonic, mode = 'major') {
  const t = typeof tonic === 'number' ? mod12(tonic) : pc(tonic)
  const iv = MODES[mode]
  if (!iv) throw new Error(`key: unknown mode ${mode}`)
  return { tonic: t, mode, pcs: iv.map(i => mod12(t + i)), name: `${NAMES_FLAT[t]} ${mode}` }
}
/** the n-th scale degree (1-based, may exceed 7 or be negative) of a key as a pitch class */
export function degree(k, n) { const i = n - 1, o = Math.floor(i / k.pcs.length); return k.pcs[i - o * k.pcs.length] }
export const inKey = (m, k) => k.pcs.includes(mod12(m))

// ---------------------------------------------------------------- chords
const QUAL = [
  // [regex suffix, intervals]   (longest first)
  [/^m\(?add9\)?/, [0, 3, 7, 14]], [/^\(?add9\)?/, [0, 4, 7, 14]],
  [/^maj9/, [0, 4, 7, 11, 14]], [/^maj7/, [0, 4, 7, 11]], [/^m7b5|^ø7?/, [0, 3, 6, 10]],
  [/^m9/, [0, 3, 7, 10, 14]], [/^m7/, [0, 3, 7, 10]], [/^m6/, [0, 3, 7, 9]],
  [/^(dim7|°7|o7)/, [0, 3, 6, 9]], [/^(dim|°|o)/, [0, 3, 6]], [/^aug|^\+/, [0, 4, 8]],
  [/^7sus4/, [0, 5, 7, 10]], [/^9sus4/, [0, 5, 7, 10, 14]], [/^sus4/, [0, 5, 7]], [/^sus2/, [0, 2, 7]],
  [/^9/, [0, 4, 7, 10, 14]], [/^7/, [0, 4, 7, 10]], [/^6/, [0, 4, 7, 9]], [/^5/, [0, 7]],
  [/^m/, [0, 3, 7]], [/^/, [0, 4, 7]],
]
const CACHE = new Map()
/**
 * Parse a chord symbol: 'Dm', 'Dm(add9)', 'Bbmaj7', 'Gm9', 'A7sus4', 'Bb/D', 'D/F#', 'G#°7', 'Dadd9'.
 * -> { sym, root (pc), bass (pc: the slash bass, else the root), intervals, tones (pcs, root first, unique), quality }
 */
export function chord(sym) {
  if (typeof sym === 'object' && sym && sym.tones) return sym
  if (CACHE.has(sym)) return CACHE.get(sym)
  const s = String(sym).trim()
  const [head, slash] = s.split('/')
  const m = /^([A-G][#b♯♭]?)(.*)$/.exec(head)
  if (!m) throw new Error(`chord: cannot read "${sym}"`)
  const root = pc(m[1])
  let rest = m[2], iv = null, quality = ''
  for (const [re, ints] of QUAL) {
    const mm = re.exec(rest)
    if (mm) { iv = ints; quality = mm[0]; rest = rest.slice(mm[0].length); break }
  }
  if (rest.trim()) throw new Error(`chord: unread suffix "${rest}" in "${sym}"`)
  const tones = []
  for (const i of iv) { const p = mod12(root + i); if (!tones.includes(p)) tones.push(p) }
  const bass = slash ? pc(slash) : root
  const out = { sym: s, root, bass, intervals: iv.slice(), tones, quality }
  CACHE.set(sym, out)
  return out
}
/** the chord's tones as MIDI notes in [lo, hi], ascending */
export function tonesIn(ch, lo, hi) {
  const c = chord(ch), out = []
  for (let m = Math.ceil(lo); m <= hi; m++) if (c.tones.includes(mod12(m))) out.push(m)
  return out
}
/** the chord tone nearest to `m` (ties go up) */
export function nearestTone(ch, m) {
  const c = chord(ch)
  for (let d = 0; d < 12; d++) { if (c.tones.includes(mod12(m + d))) return m + d; if (c.tones.includes(mod12(m - d))) return m - d }
  return m
}
/** next chord tone strictly above / below m */
export function toneAbove(ch, m) { const c = chord(ch); for (let d = 1; d <= 12; d++) if (c.tones.includes(mod12(m + d))) return m + d; return m + 12 }
export function toneBelow(ch, m) { const c = chord(ch); for (let d = 1; d <= 12; d++) if (c.tones.includes(mod12(m - d))) return m - d; return m - 12 }
/** the pitch class `p` placed in [lo, lo + 11] */
export const placePc = (p, lo) => lo + mod12(p - lo)
/** the chord's root (or slash bass with {bass: true}) as a MIDI note in [lo, hi] (lowest fit) */
export function rootIn(ch, lo, hi, { bass = false } = {}) {
  const c = chord(ch), m = placePc(bass ? c.bass : c.root, lo)
  return m <= hi ? m : m - 12
}

/**
 * Voice a chord with `n` voices in [lo, hi]. Every chord tone is used once before any is doubled (tones beyond n are
 * dropped from the end of the tone list, so extensions go first, then the 5th). With `prev` (the previous voicing, same
 * n), the voicing that moves least (sum of |moves|, then the largest single move) wins; voices are kept in order.
 * Without prev, the voicing whose centre is nearest (lo + hi) / 2 wins (close position preferred).
 * opts: { avoidSemitone: true } rejects voicings with an adjacent minor 2nd (bible §4.2: no E4-F4 cluster in a supersaw).
 */
export function voicing(ch, { n = 4, lo = 55, hi = 76, prev = null, avoidSemitone = true, require = null } = {}) {
  const c = chord(ch)
  const pool = tonesIn(c, lo, hi)
  // which pitch classes must appear: root, 3rd/sus, 7th, then 9th, then 5th (drop order for n < tones)
  let need = require ? require.map(x => (typeof x === 'number' ? x : pc(x))) : priorityTones(c).slice(0, Math.min(n, c.tones.length))
  let best = null
  const cand = []
  const rec = (start, picked) => {
    if (picked.length === n) { cand.push(picked.slice()); return }
    for (let i = start; i < pool.length; i++) { picked.push(pool[i]); rec(i + 1, picked); picked.pop() }
  }
  if (pool.length <= 22) rec(0, [])
  for (const v of cand) {
    const pcs = new Set(v.map(mod12))
    if (!need.every(p => pcs.has(p))) continue
    if (avoidSemitone && v.some((m, i) => i > 0 && m - v[i - 1] === 1)) continue
    let cost
    if (prev && prev.length === n) {
      let sum = 0, mx = 0
      for (let i = 0; i < n; i++) { const d = Math.abs(v[i] - prev[i]); sum += d; mx = Math.max(mx, d) }
      cost = sum + 0.01 * mx + (mx > 5 ? 100 : 0)
    } else {
      const ctr = v.reduce((a, b) => a + b, 0) / n
      cost = Math.abs(ctr - (lo + hi) / 2) + 0.2 * (v[n - 1] - v[0])
    }
    if (!best || cost < best.cost - 1e-9) best = { v, cost }
  }
  if (!best) {
    if (avoidSemitone) return voicing(ch, { n, lo, hi, prev, avoidSemitone: false, require })
    if (need.length > 1) return voicing(ch, { n, lo, hi, prev, avoidSemitone, require: need.slice(0, need.length - 1) })
    return pool.slice(0, n)
  }
  return best.v
}
/** chord tones by importance: root, 3rd (or sus), 7th, 9th, 5th, others */
export function priorityTones(ch) {
  const c = chord(ch), r = c.root, out = [r]
  const has = i => c.intervals.some(x => mod12(x) === i)
  for (const i of [3, 4, 5, 2]) if (has(i) && i !== 2) { out.push(mod12(r + i)); break }
  for (const i of [10, 11, 9]) if (has(i)) { out.push(mod12(r + i)); break }
  if (c.intervals.some(x => x === 14 || x === 2)) out.push(mod12(r + 2))
  for (const i of [7, 6, 8]) if (has(i)) { out.push(mod12(r + i)); break }
  for (const p of c.tones) if (!out.includes(p)) out.push(p)
  return out.filter((p, i, a) => a.indexOf(p) === i)
}
/** is pitch class of m a tone of the chord */
export const isChordTone = (ch, m) => chord(ch).tones.includes(mod12(m))
