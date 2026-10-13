// The music bus energy curve (sound bible §2.5, §9 A3, B7). compose() hands it to the engine as automation.musicDb; the
// SFX fader's music model (balance.mjs, via sfx.mjs), the clearance (clearance.mjs) and calibrate.mjs read the bus level
// from it at any t.
//
// The arrangement adds layers per energy, and the bus level follows it so the sections read as tiers: E3 -6 dB, E4 -3,
// E5 0; the HOOK's first bar -2.5. The BUILD starts at its tier's nominal level (no dip after the hook: the first
// seconds decide whether a viewer stays) and crescendos +2 dB over its length; the range comes from the arrangement
// (the ticker gated 3+3+2 in E3, straight 16ths, 16th hats and the lead in E4). The TENSION ramps -7 -> +1 dB into the
// gap. The DROP sits +2 dB (+3 dB for a 1-bar DROP); a 2-bar DROP before a 1-bar HOLD settles +2 -> -8 dB over its
// second bar. After a DROP the half-time HOLD settles from -5 to -8 dB over its first bar (a release, not a cliff); a
// DROP shorter than 2 bars leaves an afterglow until P + 2 bars. BREAK -4 (a held dominant, drums out), the VERDICT bar
// -3, HOLD 2 back to -8 over its first 2 beats, the CADENCE at E3. A point every beat, 30 ms crossfades at bar lines.
const E_DB = { 2: -7, 3: -6, 4: -3, 5: 0 }
const HOLD_DB = -8
/**
 * Short bodies (2026-10-13, the condensed cuts). B7 and A3 read 3 s short-term windows, and the first one ends at 3 s:
 *   SHORT_BUILD  a BUILD shorter than two windows (6 s) has the first half of B7's "second half >= first" read through
 *                windows that are mostly HOOK (01a: a 1.8 s hook bar at -2.5 dB with the frame-1 hit, then a 4 s BUILD
 *                whose E3 bar is the quietest of the body). Such a BUILD climbs harder: its crescendo grows by the least
 *                that brings B7's predicted halves (edge and centred windows, on the band model's music.dry,
 *                bands.mjs dryST, with the clearance's dips and the guard's levers) to B7_MARGIN, by at most
 *                maxExtraDb; a BUILD whose halves already pass is left alone (03b). No dip after the hook (§4.7.1).
 *   EARLY_P      when fewer than a tenth of the teaser's short-term windows end before P (05c: P at 3.63 s in an
 *                11.39 s file, 7 of 85), A3's 10th percentile cannot come from the opening without making the first
 *                seconds the quietest of the set (the opening keeps its lift and its TENSION ramp). The range comes
 *                from the payoff on: a drop-then-breakdown. The DROP sits dropDb over a normal DROP (the top of the
 *                range: its windows are the 95th percentile), and the sections between the DROP and the card (05c's
 *                BREAK and VERDICT) break down to breathDb (-11 -> -14 dB over their first bar; the verdict's stab
 *                and cue carry it), so the windows that hold the breakdown and the card's start are the 10th
 *                percentile, not the opening. Measured on 05c's stems (opening lift kept): +2 / -6 dB gives LRA 4.9
 *                with every window at or under p10 ending at 9.8-10.6 s, the opening at -15.5 LUFS short-term (it was
 *                -15.6 before this pass) and A7 -12.6 (-13.0); the DROP alone needs +3 dB for 5.0 and drags the
 *                opening to -15.9, as the louder body masters lower.
 */
export const SHORT_BUILD = { windows: 2, maxExtraDb: 4, passes: 3 }
export const B7_MARGIN = 0.5
export const CRESC_DB = 2
export const EARLY_P = { share: 0.1, dropDb: 2, breathDb: [-11, -14] }
const ST_WIN = 3
export const shortBuild = tl => { const b = tl.section('BUILD'); return !!(b && b.t1 - b.t0 < SHORT_BUILD.windows * ST_WIN - 1e-6) }
export const earlyPayoff = tl => Math.max(0, tl.anchors.P.t - ST_WIN) < EARLY_P.share * Math.max(0, (tl.duration ?? tl.base) - ST_WIN)
/** a short BUILD's extra crescendo (dB at its end; compose.mjs sets it from the B7 prediction, 0 before) */
const BUILD_X = new WeakMap()
export const setBuildExtra = (tl, x) => BUILD_X.set(tl, x)
export const buildExtra = tl => BUILD_X.get(tl) || 0
/**
 * B7's BUILD halves as the harness reads them (sound/checks/stems.mjs B7: music.dry short-term loudness every 100 ms,
 * windows ending at t or centred on t and clipped at base; the means of the two halves of the BUILD), predicted from
 * 100 ms K-weighted block energies of music.dry (bands.mjs dryST) with `x` dB more crescendo over the BUILD (0 at its
 * start). -> { edge, centred } (second half minus first, LU), null when there is no BUILD or no window in a half
 */
export function b7Halves(tl, blocks, x = 0) {
  const B = tl.section('BUILD')
  if (!B || !blocks || !blocks.length) return null
  const base = tl.base, H = blocks.length
  const e = Float64Array.from(blocks, (v, h) => { const t = (h + 0.5) / 10; return t > B.t0 && t < B.t1 ? v * Math.pow(10, x * (t - B.t0) / Math.max(0.1, B.t1 - B.t0) / 10) : v })
  const st = tEnd => { const h = Math.round(tEnd / 0.1) - 1; if (h < 29 || h >= H) return null; let s = 0; for (let k = h - 29; k <= h; k++) s += e[k]; return -0.691 + 10 * Math.log10(Math.max(1e-30, s / 30)) }
  const mST = (t0, t1, centred) => { const v = []; for (let t = t0; t <= t1 + 1e-9; t += 0.1) { const y = st(centred ? Math.min(base, t + 1.5) : t); if (y != null) v.push(y) } return v.length ? v.reduce((a, b) => a + b, 0) / v.length : null }
  const mid = (B.t0 + B.t1) / 2, out = {}
  for (const c of [false, true]) { const h1 = mST(B.t0, mid, c), h2 = mST(mid, B.t1, c); out[c ? 'centred' : 'edge'] = h1 == null || h2 == null ? null : h2 - h1 }
  return out
}
export function energyCurve(tl) {
  const P = tl.anchors.P.t, build = tl.section('BUILD'), drop = tl.section('DROP')
  const sb = shortBuild(tl), early = earlyPayoff(tl), xb = buildExtra(tl)
  const glowEnd = tl.timeAt(tl.anchors.P.beat + 8)
  const hold = tl.section('HOLD')
  const shortHold = !!(drop && hold && Math.abs(hold.b0 - drop.b1) < 1e-6 && hold.b1 - hold.b0 <= 4 + 1e-6 && drop.b1 - drop.b0 >= 8 - 1e-6)
  const level = (s, b, t) => {
    let d = E_DB[b.energy] ?? -6
    if (s.name === 'VERDICT') d = -3
    if (s.name === 'HOOK' && b.i === 0) d = -2.5
    if (s.name === 'BREAK') d = -4
    if ((s.name === 'HOLD' || s.name === 'HOLD2') && b.energy <= 3) d = HOLD_DB
    // the BUILD's crescendo: CRESC_DB over its length, and a short BUILD's extra climb (SHORT_BUILD, compose.mjs)
    if (s.name === 'BUILD' && build) d += (CRESC_DB + (sb ? xb : 0)) * (t - build.t0) / Math.max(0.1, build.t1 - build.t0)
    // an early payoff: the sections between its DROP and the card are the breakdown (EARLY_P)
    if (early && drop && t >= drop.t1 - 1e-6 && s.name !== 'CARD') {
      const bl = 4 * tl.beatLen(drop.t1 + 1e-6), k = (t - drop.t1) / bl, [b0, b1] = EARLY_P.breathDb
      d = k < 1 ? b0 + (b1 - b0) * k : b1
    }
    // the HOLD after the DROP releases into its level over its first bar; HOLD 2 after the VERDICT bar over 2 beats
    if (s.name === 'HOLD' && drop && Math.abs(s.t0 - drop.t1) < 1e-6) { const bl = 4 * tl.beatLen(s.t0 + 1e-6), k = (t - s.t0) / bl; if (k < 1) d = Math.max(d, -5 + (d + 5) * k) }
    if (s.name === 'HOLD2') { const bl = 2 * tl.beatLen(s.t0 + 1e-6), k = (t - s.t0) / bl; if (k < 1) d = Math.max(d, -3 + (d + 3) * k) }
    // a DROP of 2 bars followed by a 1-bar HOLD settles over its second bar (+2 -> -8 dB): the impact rings out into the
    // breath, so the HOLD reads as a breath even in 3 s windows that are mostly DROP (B7)
    if (s.name === 'DROP' && shortHold && t >= tl.timeAt(tl.anchors.P.beat + 4) - 1e-6) d = 2 + (HOLD_DB - 2) * Math.min(1, (t - tl.timeAt(tl.anchors.P.beat + 4)) / Math.max(0.1, s.t1 - tl.timeAt(tl.anchors.P.beat + 4)))
    // the DROP sits 2 dB over E5's nominal, 3 dB when it is a single bar (A3: the teasers need their peak)
    if (s.name === 'DROP' && !(shortHold && t >= tl.timeAt(tl.anchors.P.beat + 4) - 1e-6)) d += drop && drop.b1 - drop.b0 < 8 - 1e-6 ? 3 : 2
    // an early payoff's DROP carries the top of the loudness range (EARLY_P)
    if (s.name === 'DROP' && early) d += EARLY_P.dropDb
    if (drop && t >= drop.t1 - 1e-6 && t < glowEnd && s.name !== 'CARD') {
      const k = (t - drop.t1) / Math.max(0.1, glowEnd - drop.t1)
      d = Math.max(d, -0.5 + (d + 0.5) * k)
    }
    return d
  }
  const pts = []
  for (const s of tl.sections) {
    if (s.name === 'CARD') continue
    if (s.name === 'TENSION') { pts.push({ t: s.t0 + 0.012, db: -7 }, { t: s.t1 - 0.018, db: 1 }); continue }
    for (const b of tl.bars) {
      const t0 = Math.max(b.t, s.t0), t1 = Math.min(b.t1, s.t1)
      if (t1 - t0 < 0.05) continue
      // a point every beat inside the bar, so ramps (crescendo, afterglow) are followed
      const nb = Math.max(1, Math.round((t1 - t0) / tl.beatLen(t0 + 1e-6)))
      for (let k = 0; k <= nb; k++) {
        const t = k === 0 ? t0 + 0.012 : k === nb ? t1 - 0.018 : t0 + (t1 - t0) * k / nb
        pts.push({ t, db: level(s, b, Math.min(t, t1 - 1e-3)) })
      }
    }
  }
  pts.sort((a, b) => a.t - b.t)
  return pts
}

/** the curve's level (dB) at t: piecewise linear between the points, held before the first and after the last (as the
 * engine evaluates automation.musicDb) */
export function evalDb(pts, t) {
  if (!pts.length) return 0
  if (t <= pts[0].t) return pts[0].db
  const last = pts[pts.length - 1]
  if (t >= last.t) return last.db
  let lo = 0, hi = pts.length - 1
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (pts[mid].t <= t) lo = mid; else hi = mid }
  const a = pts[lo], b = pts[hi]
  return a.db + (b.db - a.db) * (t - a.t) / Math.max(1e-9, b.t - a.t)
}
const CURVES = new WeakMap()
/** the teaser's curve: energyCurve(tl), or what compose() settled on (setCurve: the opening lift), cached per timeline */
export function curveFor(tl) {
  if (!CURVES.has(tl)) CURVES.set(tl, energyCurve(tl))
  return CURVES.get(tl)
}
export function setCurve(tl, pts) { CURVES.set(tl, pts) }
/**
 * The opening lift (compose.mjs openingLift): `lift` dB on the music bus from 0.30 s (the frame-1 hit keeps its level) to
 * 3.0 s, back to 0 by 5.0 s; added to the curve's points, with the lift's own corners inserted.
 */
export function withOpening(pts, lift) {
  const f = t => (t < 0.25 ? 0 : t < 0.3 ? lift * (t - 0.25) / 0.05 : t <= 3 ? lift : t < 5 ? lift * (5 - t) / 2 : 0)
  const ts = [...new Set([...pts.map(p => p.t), 0.25, 0.3, 3, 5])].sort((a, b) => a - b)
  return ts.map(t => ({ t, db: +(evalDb(pts, t) + f(t)).toFixed(3) }))
}
