// Small math, easing, randomness and number-formatting helpers shared by every op.

export const clamp = (v, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, v))
export const lerp = (a, b, k) => a + (b - a) * k

export const ease = {
  linear: k => k,
  in: k => k * k * k,
  out: k => 1 - Math.pow(1 - k, 3),
  inOut: k => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2),
  back: k => {
    const c1 = 1.70158, c3 = c1 + 1
    return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2)
  },
  // overshoot then settle, used for "slam" style entrances
  slam: k => (k < 0.6 ? lerp(1.9, 0.94, ease.in(k / 0.6)) : lerp(0.94, 1, ease.out((k - 0.6) / 0.4))),
}

// progress of time t through [start, start+dur], clamped to 0..1
export const prog = (t, start, dur) => (dur <= 0 ? (t >= start ? 1 : 0) : clamp((t - start) / dur))

// Deterministic PRNG so every render of a spec is pixel-identical.
export function rng(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function hash(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// fmtNum(1234567, {prefix:'$'}) -> "$1,234,567"; {compact:true} -> "$1.2M"
export function fmtNum(value, { prefix = '', suffix = '', decimals = 0, compact = false } = {}) {
  const neg = value < 0
  let v = Math.abs(value)
  let unit = ''
  if (compact) {
    for (const [div, u] of [[1e12, 'T'], [1e9, 'B'], [1e6, 'M'], [1e3, 'K']]) {
      if (v >= div) { v /= div; unit = u; break }
    }
  }
  const fixed = v.toFixed(decimals)
  const [int, frac] = fixed.split('.')
  const withCommas = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${neg ? '-' : ''}${prefix}${withCommas}${frac ? '.' + frac : ''}${unit}${suffix}`
}
