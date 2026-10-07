// becker-rig · chart-race (FORMATS.md §4): the same stake in 2-3 named rivals, one line each, live tip counters,
// an auto-rescaling value axis, a big year counter and event flags. It ends dead on the verified finals.
//
// Every rival is a stick figure travelling the tip of his own line: the line is terrain, drawn out under him as the
// race runs. The chart is a treadmill: after a short roll-out from the start line the tips sit at a fixed x, the
// history compresses to the left and the value axis rescales upward (the "$K → $M" pull-back), so the tip counters
// live in one fixed column right of the figures, at head height (name over a live value; red while under the stake).
//   - gait from the terrain: feet are planted ON the line (they ride the terrain as it flows), so gentle slopes are a
//     walk, moderate drops a slide on the seat; on very steep stretches he rides the tip itself (running in place
//     going up, crouched with arms up going down); a crest that falls away faster than gravity launches him (he
//     lands with a squash and a thud)
//   - figures whose tips share a height walk one behind the other (the leader in front), but only on flat terrain:
//     nobody ever stands on a value that is not his; a lead change is an overtake (fist pump, whoosh) and the tip
//     counters swap places in a quick timed exchange
//   - events: a red crash band grows over a real drop, the figure that falls is shocked (hop, hit, red hit lines) and
//     rides his tip down; a flag drops onto the terrain once he is clear of the spot; the label shows in the HUD row
//   - finale: the tips stop on the spec's final display strings and a summit ledge pops under each one; the axis
//     pulls back a little; the winner crouches, jumps and lands as his number hits a gold plate (impact kit) and
//     celebrates arms up; the others slump and sit down on their ledges (close finishers step back: a podium)
//
// lookOpts (all optional; it renders fully without them):
//   figure: false                 no figures (tip dots + counters only)
//   figureScale: 0.76             figure size
//   fill: false                   no pale hill under the hero line
//   figures: [{ series, color }]  colour per series: 'hero' (green) | 'neutral' (slate) | 'ink'
//   beats: [{ t, act, series, label, to, d }]   scripted reactions on top of the race:
//          act = cheer | shrug | impact | grow | peek | flood | any POSES name; label = a note under that figure's
//          counter (or on the tide for flood); flood = a red "prices" tide rising from the stake to value `to`.
//          An impact beat near an event on the same figure replaces that event's automatic hit.
//          Beats add no sound of their own (put cues in spec.sfx).
import {
  h, s, style, attr, setText, setHTML, markup, prog, clamp, lerp,
  C, F, L, E, RIG, POSES, blendPose, secondary, fk, pinLimb, Figure, makeWorld, makeFx, camera,
  chromeParts, durationOf, measure, squashAt, popIn, swapAt, hop, fall, fmtNum, num,
} from '../lib.js'

export const css = `
.cr-fixed { position: absolute; left: 0; top: 0; width: 1080px; height: 0; }
.cr-year { position: absolute; right: 68px; font: 900 96px/96px ${F.head}; letter-spacing: -0.035em; color: ${C.grey}; white-space: nowrap; transform-origin: 100% 55%; }
.cr-stake { position: absolute; left: 62px; display: flex; align-items: center; gap: 14px; font: 800 44px/52px ${F.head}; letter-spacing: -0.015em; color: ${C.ink}; white-space: nowrap; }
.cr-stake em { color: ${C.heroInk}; }
.cr-ev { position: absolute; left: 62px; display: flex; align-items: center; gap: 16px; white-space: nowrap; transform-origin: 0 50%; }
.cr-ev span { font: 800 48px/58px ${F.head}; letter-spacing: -0.015em; }
.cr-grid, .cr-tick { position: absolute; left: 0; top: 0; font: 700 34px/34px ${F.mono}; letter-spacing: -0.03em; color: ${C.dim}; white-space: nowrap; }
.cr-tag { position: absolute; left: 0; top: 0; transform-origin: 0 50%; }
.cr-name { font-family: ${F.head}; font-weight: 800; letter-spacing: -0.01em; }
.cr-vrow { position: relative; margin-top: 8px; }
.cr-val { position: relative; font-family: ${F.head}; font-weight: 900; letter-spacing: -0.03em; white-space: nowrap; }
.cr-plate { position: absolute; background: ${C.coin}; border: 6px solid ${C.ink}; border-radius: 16px; transform-origin: 50% 50%; }
.cr-note { margin-top: 8px; font: 800 40px/42px ${F.head}; letter-spacing: -0.01em; }
.cr-tide { position: absolute; left: 0; top: 0; padding: 2px 12px; border-radius: 10px; background: ${C.void}; font: 800 40px/42px ${F.head}; letter-spacing: -0.01em; color: ${C.red}; white-space: nowrap; }
`

// ---------------------------------------------------------------------------------------------- helpers
const PAL = {
  hero: { line: C.hero, fig: C.hero, text: C.heroInk, fill: C.heroSoft },
  neutral: { line: C.grey, fig: C.grey, text: C.grey, fill: '#E5E8EC' },
  ink: { line: C.ink, fig: C.ink, text: C.ink, fill: C.lineSoft },
}
PAL.grey = PAL.neutral
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))
const mix = (a, b, p) => { const x = hex(a), y = hex(b); return `rgb(${x.map((v, i) => Math.round(v + (y[i] - v) * clamp(p))).join(',')})` }
const smooth = (a, b, x) => { const p = clamp((x - a) / (b - a)); return p * p * (3 - 2 * p) }
const bump = (t, t0, d) => (t <= t0 || t >= t0 + d ? 0 : Math.sin(Math.PI * (t - t0) / d))
const lerp2 = (a, b, p) => [a[0] + (b[0] - a[0]) * p, a[1] + (b[1] - a[1]) * p]
const f1 = v => v.toFixed(1)
const DT = 1 / 240                                       // precompute step (gait, physics, axis follower)
const sampleAt = (arr, t) => {
  const f = clamp(t / DT, 0, arr.length - 1), i = Math.floor(f), p = f - i
  return i + 1 < arr.length ? arr[i] + (arr[i + 1] - arr[i]) * p : arr[i]
}

// poses (arms relative to the torso; the feet are pinned to the line, the ledge or the tip by IK)
const P_READY = { lean: 30, tilt: -12, aF: [-52, 40], aB: [-70, 30] }
const P_SLIDE = { lean: -16, tilt: -18, aF: [128, 14], aB: [-128, -14] }
const P_SHOCK = { lean: -12, tilt: -20, aF: [152, 30], aB: [-152, -30] }
const P_PUMP = { lean: 4, tilt: -14, aF: [164, -26], aB: [-52, -22] }
const P_SLUMP = { lean: 12, tilt: 38, aF: [6, 4], aB: [-4, 4] }
const P_SIT = { lean: 20, tilt: 30, aF: [58, 34], aB: [48, 40] }        // sat on the ledge, hands on his knees
const P_PEEK = { lean: -4, tilt: -24, aF: [118, 96], aB: [-14, 14] }
const P_FALL = { lean: -10, tilt: -22, aF: [148, 34], aB: [-150, -30] }  // riding a dropping tip: arms up, "whoa"
const P_WIN = { lean: -6, tilt: -18, aF: [144, -16], aB: [-144, 16] }    // both arms up in a wide V
const ACT_POSE = { cheer: 'celebrate', shrug: 'shrug', impact: P_SHOCK, shocked: P_SHOCK, grow: 'pointUp', peek: P_PEEK, celebrate: 'celebrate', slump: P_SLUMP }

export default function chartRace(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}

  // ============================================================================ data
  const SER = (d.series || []).slice(0, 3).map((sr, i) => {
    const pts = (sr.points || []).map(p => [+p[0], +p[1]]).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1])).sort((a, b) => a[0] - b[0])
    if (pts.length < 2) throw new Error(`chart-race: series ${i} needs at least 2 points`)
    return { name: String(sr.name ?? `Series ${i + 1}`), pts, final: sr.final != null ? String(sr.final) : null }
  })
  const N = SER.length
  if (!N) throw new Error('chart-race: data.series is empty')
  const xf = d.x?.from ?? Math.min(...SER.map(q => q.pts[0][0]))
  const xt = d.x?.to ?? Math.max(...SER.map(q => q.pts[q.pts.length - 1][0]))
  const span = Math.max(1e-6, xt - xf)
  const [T0, T1] = Array.isArray(d.raceT) && d.raceT.length === 2 ? d.raceT.map(Number) : [1.5, 1.5 + clamp(span * 2, 12, 40)]
  const hold = d.hold ?? 4
  const yo = d.y || {}
  const LOG = !!yo.log
  const tipText = v => fmtNum(v, { prefix: yo.prefix ?? '$', dp: yo.dp ?? 0, compact: !!yo.compact })
  const calendar = xf >= 1000
  const yearText = x => (calendar ? String(Math.floor(x + 1e-6)) : `Year ${Math.floor(x + 1e-6)}`)

  const valueAt = (i, x) => {
    const p = SER[i].pts
    if (x <= p[0][0]) return p[0][1]
    const n = p.length - 1
    if (x >= p[n][0]) return p[n][1]
    let a = 0, b = n
    while (b - a > 1) { const m = (a + b) >> 1; if (p[m][0] <= x) a = m; else b = m }
    return p[a][1] + (p[b][1] - p[a][1]) * (x - p[a][0]) / (p[b][0] - p[a][0])
  }
  const xNow = t => xf + span * clamp((t - T0) / (T1 - T0))
  const tOfX = x => T0 + (x - xf) / span * (T1 - T0)
  const stakeV = SER[0].pts[0][1]
  const finals = SER.map((q, i) => q.final ?? tipText(valueAt(i, xt)))
  const endV = SER.map((_, i) => valueAt(i, xt))
  const winner = N > 1 ? endV.indexOf(Math.max(...endV)) : 0
  const losers = SER.map((_, i) => i).filter(i => i !== winner && endV[i] < endV[winner] * 0.995)
  const colKey = SER.map((_, i) => (['hero', 'neutral', 'ink'])[i])
  for (const f of lo.figures || []) if (f && f.series != null && f.series < N && PAL[f.color]) colKey[f.series] = f.color
  const pal = colKey.map(k => PAL[k])
  const showFig = lo.figure !== false
  const showFill = lo.fill !== false

  // ============================================================================ layout
  const parts = chromeParts(spec, ctx)
  const FK = lo.figureScale ?? 0.76
  const kk = FK / 0.68
  const hudTop = parts.workTop - 12
  const YEAR_PX = 96
  const hudBottom = hudTop + YEAR_PX
  const BASE = L.floorY                                          // value 0 (or the log floor) sits on the floor line
  const FIGH = showFig ? Math.round(186 * kk) : 36               // figure height above his line (feet to head top)
  const TOPF = 0.86                                              // the highest tip rides at most this high up the axis
  const plotH = (BASE - (hudBottom + 8 + FIGH)) / TOPF
  const colTop = hudBottom + 22, colBot = L.floorY - 4           // tag column (x >= X_LAB)

  // tip counters: one fixed column on the right. Size the value so the widest string ever shown fits.
  const valFont = px => `900 ${px}px ${F.head}`
  const wVal = (str, px) => measure(str, valFont(px), { letterSpacing: '-0.03em' })
  const peak = SER.map((q, i) => Math.max(...q.pts.map(p => p[1]), valueAt(i, xt)))
  const strs = SER.flatMap((_, i) => [finals[i], tipText(peak[i]), tipText(stakeV)])
  let VAL_PX = 64
  while (VAL_PX > 52 && Math.max(...strs.map(x => wVal(x, VAL_PX))) > 940 - (566 + 46)) VAL_PX -= 2
  const valW = Math.max(...strs.map(x => wVal(x, VAL_PX)))
  const LAB_GAP = 58
  const X_TIP = clamp(940 - valW - 10 - LAB_GAP, 520, 700)
  const colW = 940 - (X_TIP + LAB_GAP)

  // ============================================================================ value axis (precomputed follower)
  const allV = SER.flatMap(q => q.pts.map(p => p[1]))
  const vmin = LOG ? Math.max(1e-9, Math.min(...allV, stakeV) * 0.55) : 0
  const lnMin = LOG ? Math.log(vmin) : 0
  const U = LOG ? (v => Math.log(Math.max(v, vmin)) - lnMin) : (v => Math.max(0, v))
  const axisVal = u => (LOG ? Math.exp(lnMin + u) : u)
  const pref = SER.map(q => { let m = -Infinity; return q.pts.map(p => (m = Math.max(m, p[1]))) })
  const histMax = x => {
    let mx = -Infinity
    for (let i = 0; i < N; i++) {
      const p = SER[i].pts
      let a = -1, b = p.length
      while (b - a > 1) { const m = (a + b) >> 1; if (p[m][0] <= x) a = m; else b = m }
      mx = Math.max(mx, a >= 0 ? pref[i][a] : -Infinity, valueAt(i, x))
    }
    return mx
  }
  const duration = durationOf(spec, T1 + 1.8, hold)
  const NS = Math.ceil((duration + 1) / DT) + 2
  const AX = new Float64Array(NS)
  {
    // the stake starts 42% up; at the finish the axis pulls back a little (headroom for the winner's jump)
    const topf = t => lerp(TOPF, showFig ? 0.75 : TOPF, smooth(T1 - 0.15, T1 + 0.35, t))
    const tgt = t => Math.max(U(histMax(xNow(t))) / topf(t), U(stakeV) / 0.42, 1e-9)
    let y = tgt(0), v = 0
    const w = 7.5
    for (let k = 0; k < NS; k++) {
      const t = k * DT, g = tgt(t)
      v = Math.max(0, v + (w * w * (g - y) - 2 * w * v) * DT)
      y += v * DT
      y = Math.max(y, U(histMax(xNow(t))) / 0.94)              // never let a tip outrun the top of the axis
      AX[k] = y
    }
  }
  const Ys = (v, uA) => BASE - plotH * U(v) / uA

  // gridlines + value labels (built once, faded in seek)
  const gridLabel = v => {
    const pre = yo.prefix ?? '$'
    const [div, unit] = v >= 1e12 ? [1e12, 'T'] : v >= 1e9 ? [1e9, 'B'] : v >= 1e6 ? [1e6, 'M'] : v >= 1e3 ? [1e3, 'K'] : [1, '']
    const m = v / div
    const dp = Math.abs(m - Math.round(m)) < 1e-9 ? 0 : Math.abs(m * 10 - Math.round(m * 10)) < 1e-6 ? 1 : 2
    return pre + m.toFixed(dp) + unit
  }
  // linear axis: ONE "nice" step family (1-2-5 ladder) at a time: the smallest step whose lines sit at least GSP px
  // apart (with hysteresis). When the axis outgrows it, the next family crossfades in over 0.45 s. The switch times
  // are precomputed from the axis follower, so seek stays pure in t and a settled axis never shows two families.
  const GSP = 94
  const ladder = idx => [1, 2, 5][((idx % 3) + 3) % 3] * Math.pow(10, Math.floor(idx / 3))
  const idealIdx = uA => {
    let idx = 3 * Math.floor(Math.log10(Math.max(1e-12, GSP * uA / plotH))) - 1
    while (plotH * ladder(idx) / uA < GSP) idx++
    return idx
  }
  const isMult = (v, st) => Math.abs(v / st - Math.round(v / st)) < 1e-6
  const FAMS = []                                            // [{ t, idx }]: the family switched in at t
  const GRIDV = new Set()
  if (LOG) {
    for (let k = 0; k < NS; k += 6) {
      const uA = AX[k], A = axisVal(uA)
      const e0 = Math.floor(Math.log10(Math.max(A, 1e-9))) - 2
      for (let e = e0; e <= e0 + 3; e++) for (const m of [1, 2, 5]) {
        const st = m * Math.pow(10, e)
        if (st < vmin * 1.15 || st > A) continue
        if (m !== 1 && plotH * Math.LN10 / uA < 250) continue
        GRIDV.add(+st.toPrecision(6))
      }
    }
  } else {
    let cur = idealIdx(AX[0]), top = AX[0]
    FAMS.push({ t: -1, idx: cur })
    const addFam = (idx, uMax) => { const st = ladder(idx); for (let v = st; v <= axisVal(uMax) * 1.0001; v += st) GRIDV.add(+v.toPrecision(6)) }
    for (let k = 0; k < NS; k += 4) {
      const uA = AX[k]
      top = Math.max(top, uA)
      if (plotH * ladder(cur) / uA < 0.94 * GSP || plotH * ladder(cur - 1) / uA >= 1.08 * GSP) {
        addFam(cur, top)
        cur = idealIdx(uA); top = uA
        FAMS.push({ t: k * DT, idx: cur })
      }
    }
    addFam(cur, Math.max(top, AX[NS - 1]))
  }
  const famAt = t => { let k = FAMS.length - 1; while (k > 0 && FAMS[k].t > t) k--; return k }
  const gridVals = [...GRIDV].filter(v => v > 0).sort((a, b) => a - b)
  const isDecade = v => Math.abs(Math.log10(v) - Math.round(Math.log10(v))) < 1e-6
  const GUT = Math.max(60, ...gridVals.map(v => measure(gridLabel(v), `700 34px ${F.mono}`, { letterSpacing: '-0.03em' })))
  const PLOT_L = Math.round(66 + GUT + 18)
  const DX = X_TIP - PLOT_L
  // at the start line the figures stand one behind the other; the rearmost must clear the value labels
  const LAG = showFig ? (N > 1 ? Math.min(116 * kk, Math.max(84 * kk, (X_TIP - 60 - PLOT_L - 50 * kk) / (N - 1))) : 0) : 0
  const S0 = Math.min(X_TIP - 60, PLOT_L + 70 + LAG * (N - 1))  // where the start line sits at t = 0
  const W0 = 0.22 * span                                         // roll-out: the tips travel S0 -> X_TIP over this much x

  // ============================================================================ x mapping (treadmill)
  const mapAt = t => {
    const xn = xNow(t), e = xn - xf
    const p1 = clamp(e / W0)
    if (p1 < 1) {
      const eo = 1 - (1 - p1) * (1 - p1)
      const O = S0 + (PLOT_L - S0) * eo
      const k = p1 > 1e-7 ? DX * eo / (W0 * p1) : 2 * DX / W0
      return { xn, O, k, tip: O + e * k }
    }
    return { xn, O: PLOT_L, k: DX / e, tip: X_TIP }
  }
  const Xs = (x, m) => m.O + (x - xf) * m.k
  const Xd = (sx, m) => xf + (sx - m.O) / m.k
  // a point on series i's terrain at data x (beyond the tip the terrain continues flat, unseen)
  const onLine = (i, x, m, uA) => [Xs(x, m), Ys(valueAt(i, Math.min(x, m.xn)), uA)]


  // ============================================================================ events, overtakes, beats
  const firstDropEnd = (i, x0) => {
    // end of the steepest decline after x0: walk forward while segments keep falling faster than 5%/yr
    const p = SER[i].pts
    let x = x0, v = valueAt(i, x0)
    for (const q of p) {
      if (q[0] <= x0 + 1e-9) continue
      const r = (q[1] / v - 1) / Math.max(1e-6, q[0] - x)
      if (r > -0.05) break
      x = q[0]; v = q[1]
      if (x > x0 + 2) break
    }
    return x
  }
  const EVENTS = (d.events || []).filter(e => e && Number.isFinite(+e.x) && +e.x >= xf && +e.x <= xt).map(e => {
    const x = +e.x
    let victim = -1, drop = 0, mover = 0, rise = 0
    for (let i = 0; i < N; i++) {
      const v0 = valueAt(i, x)
      let mn = v0, mx = v0
      for (let k = 1; k <= 24; k++) { const v = valueAt(i, Math.min(xt, x + k / 20)); mn = Math.min(mn, v); mx = Math.max(mx, v) }
      if (mn / v0 - 1 < drop) { drop = mn / v0 - 1; victim = i }
      if (mx / v0 - 1 > rise) { rise = mx / v0 - 1; mover = i }
    }
    const tone = e.tone || (drop <= -0.05 ? 'bad' : rise >= 0.2 ? 'good' : 'neutral')
    const on = tone === 'bad' && victim >= 0 ? victim : tone === 'good' ? mover : endV.indexOf(Math.max(...SER.map((_, i) => valueAt(i, x))))
    const bandEnd = tone === 'bad' && victim >= 0 ? Math.max(x + 0.15, firstDropEnd(victim, x)) : x
    return { x, t: tOfX(x), label: String(e.label || ''), tone, victim: tone === 'bad' ? victim : -1, on: Math.max(0, on), bandEnd }
  }).sort((a, b) => a.x - b.x)
  const toneCol = tn => (tn === 'bad' ? C.red : C.ink)
  const toneFill = tn => (tn === 'bad' ? C.red : C.white)

  // lead changes: sign changes of the value gap that then open up past 3% of the stake
  const OVERTAKES = []
  if (N > 1) {
    const STEPS = 600
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      let sgn = 0, cand = null
      for (let k = 0; k <= STEPS; k++) {
        const x = xf + span * k / STEPS
        const gp = valueAt(i, x) - valueAt(j, x)
        if (Math.abs(gp) < stakeV * 0.03) { if (sgn && cand == null) cand = x; continue }
        const sg = Math.sign(gp)
        if (sgn && sg !== sgn) OVERTAKES.push({ x: cand ?? x, t: tOfX(cand ?? x), leader: sg > 0 ? i : j })
        sgn = sg; cand = null
      }
    }
    OVERTAKES.sort((a, b) => a.t - b.t)
  }

  // per-figure scripted motion: pose acts, hops, crouches, landings, sit-down
  const ACTS = SER.map(() => []), HOPS = SER.map(() => []), CROUCH = SER.map(() => [])
  const LANDS = SER.map(() => []), SIT = SER.map(() => null), STAND = SER.map(() => [])
  const NOTES = SER.map(() => [])
  const BEATS = (lo.beats || []).filter(b => b && Number.isFinite(+b.t)).map(b => ({ ...b, t: +b.t, act: String(b.act || ''), i: b.series != null && +b.series < N ? +b.series : null }))
  for (let i = 0; i < N; i++) {
    ACTS[i].push({ t0: -1, t1: T0 + 0.3, fin: 0.01, fout: 0.3, pose: P_READY })
    CROUCH[i].push({ t0: T0 - 0.42, d: 0.5, amt: 0.1 })                  // anticipation dip before the start
  }
  for (const ev of EVENTS) {
    if (ev.victim < 0) continue
    const i = ev.victim
    // a scripted "impact" beat on the same figure near the event replaces the automatic one (one hit, not two)
    const sb = BEATS.find(bt => bt.act === 'impact' && bt.i === i && Math.abs(bt.t - ev.t) <= 1.2)
    if (sb) { ev.hitT = sb.t; ev.scripted = true; continue }
    ACTS[i].push({ t0: ev.t, t1: ev.t + 1.0, fin: 0.08, fout: 0.35, pose: P_SHOCK })
    HOPS[i].push({ t0: ev.t + 0.02, d: 0.36, h: 26 * kk })
    LANDS[i].push({ t: ev.t + 0.38, amt: 0.12 })
  }
  for (const o of OVERTAKES) ACTS[o.leader].push({ t0: o.t, t1: o.t + 0.95, fin: 0.12, fout: 0.3, pose: P_PUMP })
  // finale: the winner crouches, jumps, lands as his number hits the plate, celebrates; the others slump and sit
  const tJump = T1 + 0.2, tLand = tJump + 0.5
  {
    const w = winner
    CROUCH[w].push({ t0: T1 - 0.04, d: 0.28, amt: 0.22 })
    ACTS[w].push({ t0: T1 - 0.04, t1: tJump + 0.04, fin: 0.1, fout: 0.06, pose: { ...P_READY, aF: [-60, 70], aB: [-80, 50] } })
    ACTS[w].push({ t0: tJump, t1: Infinity, fin: 0.14, fout: 0, pose: P_WIN })
    const room = Ys(endV[w], AX[NS - 1]) - FIGH - 24 * kk - (hudBottom + 6)     // head + raised hands stay under the HUD
    HOPS[w].push({ t0: tJump, d: 0.5, h: clamp(room, 30 * kk, 96 * kk) }, { t0: tLand + 0.62, d: 0.34, h: clamp(room * 0.4, 16 * kk, 30 * kk) })
    LANDS[w].push({ t: tLand, amt: 0.16 }, { t: tLand + 0.96, amt: 0.1 })
    for (const i of losers) {
      ACTS[i].push({ t0: T1 + 0.15, t1: Infinity, fin: 0.5, fout: 0, pose: P_SLUMP })
      SIT[i] = T1 + 1.05
    }
  }
  // lookOpts.beats
  let TIDE = null
  for (const b of BEATS) {
    const i = b.i
    const dur = b.d ?? (b.act === 'peek' ? Infinity : 1.4)
    if (b.act === 'flood') { TIDE = { t: b.t, to: Number.isFinite(+b.to) ? +b.to : stakeV * 1.5, label: b.label || '' }; continue }
    if (i == null) continue
    const pose = ACT_POSE[b.act] || (POSES[b.act] ? b.act : null)
    if (pose) ACTS[i].push({ t0: b.t, t1: b.t + dur, fin: 0.12, fout: 0.35, pose })
    if (b.act === 'cheer') { HOPS[i].push({ t0: b.t + 0.04, d: 0.4, h: 34 * kk }); LANDS[i].push({ t: b.t + 0.44, amt: 0.1 }) }
    if (b.act === 'impact') { HOPS[i].push({ t0: b.t + 0.02, d: 0.36, h: 26 * kk }); LANDS[i].push({ t: b.t + 0.38, amt: 0.12 }) }
    if (b.act === 'peek') STAND[i].push({ t0: b.t, d: dur })
    if (b.label) NOTES[i].push({ t: b.t, t1: b.t + Math.max(2.6, Number.isFinite(dur) ? dur : 99), text: b.label, tone: b.act === 'impact' ? 'bad' : (b.act === 'cheer' || b.act === 'grow') ? 'good' : null, grow: b.act === 'grow' })
  }
  for (const ns of NOTES) { ns.sort((a, b) => a.t - b.t); ns.forEach((n, k) => { if (ns[k + 1]) n.t1 = Math.min(n.t1, ns[k + 1].t) }) }

  // Figures whose tips share a height walk one behind the other (the lower value steps back LAG px), but only while
  // the terrain behind his tip is flat: otherwise he would stand on a value that is not his (a crash victim stays on
  // his falling tip). The lag shrinks fast (a dash forward) and grows no faster than the ground under him slides
  // back, so a figure that loses the lead slows down instead of moonwalking. Precomputed per frame: pure in t.
  const BACK = 6 * kk                                            // the body stands just behind his tip
  const LGA = SER.map(() => new Float32Array(NS))
  const VICT = SER.map((_, i) => EVENTS.filter(ev => ev.victim === i).map(ev => [ev.t - 0.5, tOfX(ev.bandEnd) + 0.6]))
  const lagTarget = (i, t, m, uA) => {
    const yi = Ys(valueAt(i, m.xn), uA)
    let acc = 0
    for (let j = 0; j < N; j++) {
      if (j === i) continue
      const yj = Ys(valueAt(j, m.xn), uA)
      const close = 1 - smooth(0.55 * FIGH, 0.95 * FIGH, Math.abs(yi - yj))
      if (close > 0) acc += close * smooth(-1, 1, (yi - yj) / (plotH * 0.03) + (i > j ? 1 : -1))
    }
    if (acc <= 1e-3 || VICT[i].some(([a, b]) => t >= a && t <= b)) return 0
    let dev = 0
    for (let k = 1; k <= 5; k++) dev = Math.max(dev, Math.abs(Ys(valueAt(i, Math.min(m.xn, Xd(m.tip - BACK - LAG * acc * k / 5, m))), uA) - yi))
    return LAG * acc * (1 - smooth(30, 70, dev))
  }
  if (showFig && N > 1 && LAG > 0) for (let i = 0; i < N; i++) {
    let lag = 0
    for (let k = 0; k < NS; k++) {
      const t = k * DT, m = mapAt(t), tg = lagTarget(i, t, m, AX[k])
      if (k === 0) lag = tg
      else {
        const xd = Xd(m.tip - BACK - lag, m)
        const flow = Math.max(0, (Xs(xd, m) - Xs(xd, mapAt(t + DT))) / DT)     // px/s the ground under him slides back
        lag = tg < lag ? Math.max(tg, lag - 520 * DT) : Math.min(tg, lag + Math.max(24, 0.92 * flow) * DT)
      }
      LGA[i][k] = lag
    }
  }
  const lagOf = (i, t) => (showFig && N > 1 && LAG > 0 ? sampleAt(LGA[i], t) : 0)

  // ============================================================================ figures: terrain gait (pure)
  const LEG = (RIG.thigh + RIG.shin) * FK
  const SL = 40 * kk               // step length on the flat (screen px of arc); steeper = shorter, quicker steps
  const REACH = 6 * kk             // a foot plants this far (arc) ahead of the body
  const STANCE = 0.6
  const GA = SER.map(() => ({ s: new Float64Array(NS), ph: new Float64Array(NS), v: new Float32Array(NS), air: new Float32Array(NS), sus: new Float32Array(NS) }))
  const bodyX = (i, t, m) => m.tip - lagOf(i, t) - BACK
  // terrain slope under body i: { th (degrees, + = uphill), tx, ty (unit tangent) } over the 26 px up to his tip
  const slopeAt = (i, bx, m, uA) => {
    const xb = Math.min(bx + 12, m.tip), pa = onLine(i, Xd(xb - 26, m), m, uA), pb = onLine(i, Xd(xb, m), m, uA)
    const ang = Math.atan2(pb[1] - pa[1], pb[0] - pa[0])
    return { th: -ang * 180 / Math.PI, tx: Math.cos(ang), ty: Math.sin(ang) }
  }
  const stepLen = th => SL * lerp(1, 0.42, smooth(12, 55, th))

  // arc progress s(t) of each body over its own terrain, the gait phase (integrated, so changing step length never
  // jumps it), and a vertical physics pass (air time, knee suspension). Deterministic, sampled once at mount.
  if (showFig) {
    for (let i = 0; i < N; i++) {
      const A = GA[i]
      let sArc = 0, ph = 0, prevXd = 0, yb = 0, vb = 0, prevG = 0, prevVb = 0, q = 0, qv = 0, air = false
      const G_ = 4200, W_ = 15, Z_ = 0.5
      for (let k = 0; k < NS; k++) {
        const t = k * DT, m = mapAt(t), uA = AX[k]
        const bx = bodyX(i, t, m), xd = Xd(bx, m)
        const G = Ys(valueAt(i, Math.min(xd, m.xn)), uA)
        if (k === 0) { yb = G; prevG = G; prevXd = xd; continue }
        const dxs = (xd - prevXd) * m.k
        if (dxs > 0) {
          const ds = Math.hypot(dxs, Ys(valueAt(i, Math.min(xd, m.xn)), uA) - Ys(valueAt(i, Math.min(prevXd, m.xn)), uA))
          sArc += ds
          ph += ds / (2 * stepLen(slopeAt(i, bx, m, uA).th))
        }
        A.s[k] = sArc; A.ph[k] = ph
        // vertical: the body follows the ground unless the ground falls away faster than gravity
        const vg = (G - prevG) / DT
        const vn = vb + G_ * DT, yn = yb + vn * DT
        if (yn >= G) {
          if (air && vn - vg > 360 && t > T0 && t < T1) { LANDS[i].push({ t, amt: clamp((vn - vg) / 2600, 0.08, 0.2) }); ctx.cue(t, 'thud', { gain: clamp((vn - vg) / 1600, 0.25, 0.7) }) }
          yb = G; vb = vg; air = false
        } else { yb = yn; vb = vn; air = true }
        A.air[k] = Math.max(0, G - yb)
        const ab = (vb - prevVb) / DT
        qv += (-W_ * W_ * q - 2 * Z_ * W_ * qv - 0.3 * ab) * DT
        q = clamp(q + qv * DT, -6 * kk, 18 * kk)
        A.sus[k] = q
        prevG = G; prevXd = xd; prevVb = vb
      }
      const w = 30                                                    // speed: arc px / s over a 0.25 s window
      for (let k = 0; k < NS; k++) A.v[k] = (A.s[Math.min(NS - 1, k + w)] - A.s[Math.max(0, k - w)]) / ((Math.min(NS - 1, k + w) - Math.max(0, k - w)) * DT)
    }
  }
  // the point on series i's terrain at arc distance d (screen px, + = ahead) from screen x bx
  const alongLine = (i, bx, d, m, uA) => {
    const dir = d >= 0 ? 1 : -1, STEP = 3
    let x = bx, p = onLine(i, Xd(bx, m), m, uA), left = Math.abs(d)
    for (let k = 0; k < 80 && left > 1e-6; k++) {
      const q = onLine(i, Xd(x + dir * STEP, m), m, uA)
      const seg = Math.hypot(q[0] - p[0], q[1] - p[1])
      if (seg >= left) { const f = left / seg; return [p[0] + (q[0] - p[0]) * f, p[1] + (q[1] - p[1]) * f] }
      left -= seg; x += dir * STEP; p = q
    }
    return p
  }
  // a foot, body-relative: planted at +REACH (arc) and carried back with the terrain while in stance, then swung
  // forward with a lift arc. The phase advances with the body's own travel over its terrain, so planted feet stick.
  const cycle = (phase, off, sl, top) => {             // { d: arc offset of the limb's contact, q: swing 0..1 or -1 }
    const f = (phase - off) - Math.floor(phase - off)
    if (f < STANCE) return { d: top - f * 2 * sl, q: -1 }
    const q = (f - STANCE) / (1 - STANCE)
    return { d: lerp(top - STANCE * 2 * sl, top, E.inOutSine(q)), q }
  }
  const footAt = (i, bx, phase, off, sl, m, uA, lift) => {
    const c = cycle(phase, off, sl, REACH)
    const pt = alongLine(i, bx, c.d, m, uA)
    return [pt[0], pt[1] - (c.q < 0 ? 0 : lift * Math.sin(Math.PI * c.q))]
  }
  const applyActs = (i, t, p) => {
    for (const a of ACTS[i]) {
      if (t < a.t0) continue
      const w = Math.min(prog(t, a.t0, a.fin), 1 - (Number.isFinite(a.t1) ? prog(t, a.t1 - a.fout, a.fout) : 0))
      if (w > 0) p = blendPose(p, a.pose, E.inOut(w))
    }
    return p
  }
  // the finish: a short summit ledge pops under every tip (flat footing whatever the last slope was)
  const LEDGE = [-40 * kk, 18 * kk]
  // close finishers step back along longer ledges (a podium staircase) instead of piling onto one spot
  const OFFS = SER.map(() => 0)
  {
    const yEnd = SER.map((_, i) => Ys(endV[i], AX[NS - 1]))
    const rank = SER.map((_, i) => i).sort((a, b) => endV[b] - endV[a] || a - b)
    rank.forEach((i, r) => { for (const j of rank.slice(0, r)) if (Math.abs(yEnd[i] - yEnd[j]) < 0.9 * FIGH) OFFS[i] = Math.max(OFFS[i], OFFS[j] + 68 * kk) })
  }
  const ledgeP = t => (showFig && t >= T1 - 0.05 ? E.back(prog(t, T1 - 0.05, 0.3), 2.2) : 0)

  const figure = (i, t, m, uA) => {
    const A = GA[i]
    const phase = sampleAt(A.ph, t), speed = sampleAt(A.v, t)
    const settle = E.inOut(prog(t, T1, 0.3))                                     // race over: onto the ledge
    let lift = sampleAt(A.air, t) * (1 - settle)
    for (const hp of HOPS[i]) lift += hop(t, hp.t0, hp.d, hp.h)
    let crouch = 0
    for (const c of CROUCH[i]) crouch += c.amt * bump(t, c.t0, c.d)
    let stand = 0
    for (const st of STAND[i]) stand = Math.max(stand, E.inOut(prog(t, st.t0, 0.4)) * (1 - prog(t, st.t0 + st.d - 0.4, 0.4)))
    const sitW = SIT[i] != null ? E.inOut(prog(t, SIT[i], 0.5)) * (1 - stand) : 0
    const tipY = Ys(valueAt(i, m.xn), uA), tipX = m.tip - OFFS[i] * settle         // (finale: his spot on the ledge)
    const bx = bodyX(i, t, m)
    const { th, tx, ty } = slopeAt(i, bx, m, uA)
    const amt = smooth(4, 46, speed) * (1 - settle)
    // very steep: he rides the tip itself (both feet on it): running in place going up, crouched "whoa" going down
    const rUp = smooth(36, 54, th) * (1 - settle), rDn = smooth(36, 54, -th) * (1 - settle), ride = Math.max(rUp, rDn)
    const wsl = smooth(24, 40, -th) * (1 - rDn) * (1 - settle)                   // a moderate drop: slides on his seat
    const cl = smooth(10, 45, th) * (1 - wsl) * (1 - rUp) * (1 - settle)          // a climb: weight over the upper foot
    const P0 = onLine(i, Xd(bx, m), m, uA)
    // feet: planted on the terrain (a walk; steep rises are short, quick, knee-high step-ups), or out ahead (slide)
    const sl = stepLen(th)
    const LIFT = 12 * kk * (0.4 + 0.6 * amt) * (1 + 0.9 * smooth(18, 60, th))
    let fF = footAt(i, bx, phase, 0, sl, m, uA, LIFT), fB = footAt(i, bx, phase, 0.5, sl, m, uA, LIFT)
    if (wsl > 0) {
      fF = lerp2(fF, [P0[0] + tx * LEG * 0.9, P0[1] + ty * LEG * 0.9 - 6 * kk], wsl)
      fB = lerp2(fB, [P0[0] + tx * LEG * 0.72, P0[1] + ty * LEG * 0.72 - 6 * kk], wsl)
    }
    if (ride > 0) {
      const sw2 = Math.sin(2 * Math.PI * phase), kn = 16 * kk * rUp
      fF = lerp2(fF, [tipX + 2 * kk, tipY - kn * Math.max(0, sw2)], ride)
      fB = lerp2(fB, [tipX - 16 * kk, tipY - kn * Math.max(0, -sw2)], ride)
      crouch += 0.12 * rDn
    }
    if (settle > 0) {                                                             // standing on the ledge
      fF = lerp2(fF, [tipX + 1 * kk, tipY], settle)
      fB = lerp2(fB, [tipX - 23 * kk, tipY], settle)
    }
    // hip: over the feet (over the upper foot on steep rises), on the line (slide), on the ledge's edge (sit)
    const lowY = Math.max(fF[1], fB[1]), avgY = (fF[1] + fB[1]) / 2
    const hi = fF[1] <= fB[1] ? fF : fB
    const sus = sampleAt(A.sus, t) * (1 - settle)
    const refY = lerp(avgY, hi[1], 0.75 * cl)
    const hipX = lerp(lerp(lerp(bx - 4 * kk, hi[0] - 6 * kk, 0.6 * cl), tipX - 8 * kk, ride), tipX - 11 * kk, settle)
    let hip = [hipX, Math.max(refY - LEG * (0.91 - crouch + 0.06 * stand), lowY - LEG * 0.98) + sus]
    hip = lerp2(hip, [P0[0] - 6 * kk, P0[1] - 12 * kk], wsl)
    // pose: walk (arms swing against the legs; lean into rises), slide, then the scripted acts on top
    const sw = Math.sin(2 * Math.PI * phase)
    const up = clamp(th, -20, 65) * (1 - settle)
    const pump = 1 + 0.5 * smooth(20, 55, th)
    let p = {
      lean: 4 + 0.42 * up, tilt: -4 - 0.3 * up,
      aF: [14 - 38 * pump * sw * amt + 0.5 * Math.max(0, up), 18 + 20 * amt + 30 * cl],
      aB: [-14 + 38 * pump * sw * amt + 0.3 * Math.max(0, up), 18 + 20 * amt + 30 * cl],
    }
    if (wsl > 0) p = blendPose(p, P_SLIDE, wsl)
    if (rUp > 0) p = blendPose(p, { lean: 22, tilt: -14, aF: [34 - 52 * sw, 76], aB: [-34 + 52 * sw, 76] }, rUp)
    if (rDn > 0) p = blendPose(p, { ...P_FALL, aF: [P_FALL.aF[0] + 14 * Math.sin(2 * Math.PI * 5 * t), P_FALL.aF[1]], aB: [P_FALL.aB[0] - 14 * Math.sin(2 * Math.PI * 5 * t + 1), P_FALL.aB[1]] }, rDn)
    p = applyActs(i, t, p)
    if (i === winner && t > tLand) {                                              // victory: the arms keep pumping
      const wv = 11 * Math.sin(2 * Math.PI * 1.6 * (t - tLand)) * Math.exp(-(t - tLand) / 2.6)
      p = { ...p, aF: [p.aF[0] + wv, p.aF[1]], aB: [p.aB[0] - wv, p.aB[1]] }
    }
    if (sitW > 0) {                                                               // sits down on the ledge, knees up
      p = blendPose(p, P_SIT, sitW)
      hip = lerp2(hip, [tipX - 24 * kk, tipY - 8 * kk], sitW)
      fF = lerp2(fF, [hip[0] + 0.6 * LEG, tipY - 3 * kk], sitW)
      fB = lerp2(fB, [hip[0] + 0.5 * LEG, tipY - 3 * kk], sitW)
    }
    p = secondary({ ...p, lift: 0, rot: 0 }, t, { breathe: 1 })
    const J = fk(p, { x: hip[0], y: hip[1] - lift, scale: FK, face: 1 })
    pinLimb(J, 'fF', [fF[0], fF[1] - lift], 1)
    pinLimb(J, 'fB', [fB[0], fB[1] - lift], 1)
    J.ground = lerp(lowY, tipY, sitW) - lift
    return { J, th, P0 }
  }
  // ============================================================================ build: world + layers
  const world = makeWorld(ctx)
  const g = world.g
  const fixed = h('div', { class: 'cr-fixed' })
  ctx.stage.append(fixed)

  // crash bands, gridlines, stake line, event flags (back)
  const bands = EVENTS.map(() => { const el = s('rect', { y: f1(BASE - plotH * 0.95), height: f1(plotH * 0.95), fill: C.redSoft, opacity: 0 }); g.back.append(el); return el })
  const grids = gridVals.map(v => {
    const line = s('line', { x1: 62, stroke: C.lineSoft, 'stroke-width': 3, 'stroke-linecap': 'round', opacity: 0 })
    g.back.append(line)
    const lab = h('div', { class: 'cr-grid', 'data-deco': '' }, gridLabel(v))
    world.html.append(lab)
    return { v, line, lab }
  })
  const stakeLine = s('line', { x1: 62, stroke: C.dim, 'stroke-width': 4, 'stroke-dasharray': '2 14', 'stroke-linecap': 'round', opacity: 0.85 })
  g.back.append(stakeLine)
  // a flag drops onto the terrain where the event happened once the walker is clear of the spot (it never lands
  // under his feet); an event too close to the finish keeps only its HUD chip and band
  const POLE = 62 * kk
  for (const ev of EVENTS) {
    ev.flagT = showFig ? null : ev.t - 0.16
    if (showFig) for (let k = Math.floor(Math.max(0, ev.t) / DT); k < NS; k += 4) {
      const t = k * DT, m = mapAt(t)
      if (t > T1) break
      if (Xs(ev.x, m) <= m.tip - lagOf(ev.on, t) - 44 * kk) { ev.flagT = t; break }
    }
  }
  const flags = EVENTS.map(ev => {
    const gg = s('g', { opacity: 0 })
    gg.append(
      s('line', { x1: 0, x2: 0, y1: 0, y2: f1(-POLE), stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }),
      s('path', { d: `M2,${f1(-POLE + 2)} L${f1(40 * kk)},${f1(-POLE + 14 * kk)} L2,${f1(-POLE + 28 * kk)} Z`, fill: toneFill(ev.tone), stroke: C.ink, 'stroke-width': 3.5, 'stroke-linejoin': 'round' }),
    )
    g.mid.append(gg)
    return gg
  })

  // year ticks on the floor (built once; families thin out as the axis compresses)
  const te = d.x?.tickEvery ?? Math.max(1, Math.round(span / 4))
  const tick0 = Math.ceil((xf - 1e-9) / te) * te
  const ticks = []
  for (let x = tick0; x <= xt + 1e-9; x += te) {
    const txt = String(Math.round(x))
    const lab = h('div', { class: 'cr-tick', 'data-deco': '' }, txt)
    world.html.append(lab)
    const mark = s('line', { y1: BASE - 12, y2: BASE, stroke: C.ink, 'stroke-width': 4, 'stroke-linecap': 'round', opacity: 0 })
    g.back.append(mark)
    const n = Math.round((x - tick0) / te)
    ticks.push({ x, lab, mark, w: measure(txt, `700 34px ${F.mono}`, { letterSpacing: '-0.03em' }), fams: [1, 2, 5, 10, 20].filter(f => n % f === 0) })
  }

  // series: pale hill under the hero line only, the lines, tip dots (the "pen")
  const heroIdx = colKey.indexOf('hero')
  const fill = s('path', { fill: heroIdx >= 0 ? pal[heroIdx].fill : 'none', opacity: showFill && heroIdx >= 0 ? 0.85 : 0 })
  g.back.append(fill)
  const lines = SER.map((_, i) => s('path', { fill: 'none', stroke: pal[i].line, 'stroke-width': 9, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }))
  for (let i = N - 1; i >= 0; i--) g.mid.append(lines[i])
  const ledges = SER.map((_, i) => { const el = s('path', { fill: 'none', stroke: pal[i].line, 'stroke-width': 9, 'stroke-linecap': 'round', opacity: 0 }); g.front.append(el); return el })
  const dots = SER.map((_, i) => { const el = s('circle', { r: showFig ? 9 : 13, fill: pal[i].line, stroke: C.void, 'stroke-width': 4 }); g.mid.append(el); return el })

  // tide (lookOpts flood beat): in front of the figures, semi-transparent
  let tideEl = null, tideEdge = null, tideLab = null
  if (TIDE) {
    tideEl = s('path', { fill: C.redSoft, opacity: 0 })
    tideEdge = s('path', { fill: 'none', stroke: C.red, 'stroke-width': 5, 'stroke-linecap': 'round', opacity: 0 })
    g.front.append(tideEl, tideEdge)
    if (TIDE.label) { tideLab = h('div', { class: 'cr-tide' }, TIDE.label); world.html.append(tideLab) }
  }

  // figures; series 0 drawn last (in front)
  const figs = []
  if (showFig) for (let i = N - 1; i >= 0; i--) {
    figs[i] = new Figure(g.fig, { scale: FK, color: pal[i].fig, outline: null })   // a knockout would chop his line
  }

  // tip counters ("tags"): name over value (+ an optional beat note), all in one column
  const wrapLines = (text, font, o = {}) => {
    let lines = 1, cur = ''
    for (const w of String(text).split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (!cur || measure(nx, font, o) <= colW) cur = nx; else { lines++; cur = w } }
    return lines
  }
  const nameFit = name => {
    for (let px = 40; px >= 34; px -= 2) {
      const font = `800 ${px}px ${F.head}`, o = { letterSpacing: '-0.01em' }
      if (name.split(/\s+/).some(w => measure(w, font, o) > colW)) continue
      const lines = wrapLines(name, font, o)
      if (lines <= 2) return { px, lines }
    }
    return { px: 34, lines: 2 }
  }
  const tags = SER.map((q, i) => {
    const nf = nameFit(q.name)
    const nameLH = nf.px + 2
    const tag = h('div', { class: 'cr-tag' })
    const name = h('div', { class: 'cr-name', style: { fontSize: nf.px + 'px', lineHeight: nameLH + 'px', width: colW + 'px', color: pal[i].text } }, q.name)
    const vrow = h('div', { class: 'cr-vrow', style: { height: VAL_PX + 'px' } })
    const plate = h('div', { class: 'cr-plate', style: { opacity: '0' } })
    const val = h('div', { class: 'cr-val', style: { fontSize: VAL_PX + 'px', lineHeight: VAL_PX + 'px' } })
    vrow.append(plate, val)
    const note = h('div', { class: 'cr-note', style: { width: colW + 'px', display: 'none' } })
    tag.append(name, vrow, note)
    world.html.append(tag)
    const fw = wVal(finals[i], VAL_PX)
    const PADX = 18, PADY = 9
    style(plate, { left: -PADX + 'px', top: -PADY + 'px', width: (fw + 2 * PADX).toFixed(0) + 'px', height: (VAL_PX + 2 * PADY).toFixed(0) + 'px' })
    const noteLines = NOTES[i].map(n => wrapLines(n.text, `800 40px ${F.head}`))
    const wMax = Math.max(fw, wVal(tipText(peak[i]), VAL_PX), Math.min(colW, measure(q.name, `800 ${nf.px}px ${F.head}`, { letterSpacing: '-0.01em' })))
    return { tag, name, val, plate, note, baseH: nf.lines * nameLH + 8 + VAL_PX, nameH: nf.lines * nameLH, noteLines, fw, wMax, PADX, PADY }
  })
  const noteAt = (i, t) => { for (let k = NOTES[i].length - 1; k >= 0; k--) { const n = NOTES[i][k]; if (t >= n.t && t < n.t1) return k } return -1 }
  const tagH = (i, t) => { const k = noteAt(i, t); return tags[i].baseH + (k >= 0 ? 8 + 42 * tags[i].noteLines[k] : 0) }

  // HUD row: stake (left; an event chip replaces it while the event is fresh) / big year (right)
  const yearEl = h('div', { class: 'cr-year', style: { top: hudTop + 'px' } })
  fixed.append(yearEl)
  const yearW = measure(yearText(xt), `900 ${YEAR_PX}px ${F.head}`, { letterSpacing: '-0.035em' })
  const hudLW = Math.max(240, 1012 - yearW - 40 - 62)
  const stakeEl = h('div', { class: 'cr-stake' })
  const sw = s('svg', { width: 44, height: 12, viewBox: '0 0 44 12' })           // the dotted stake line, as a legend
  sw.append(s('line', { x1: 3, x2: 41, y1: 6, y2: 6, stroke: C.dim, 'stroke-width': 4, 'stroke-dasharray': '2 14', 'stroke-linecap': 'round' }))
  const stakeTx = h('span', {})
  setHTML(stakeTx, markup(d.stake || ''))
  stakeEl.append(sw, stakeTx)
  fixed.append(stakeEl)
  {
    let px = 44
    while (px > 34 && stakeEl.offsetWidth > hudLW) { px -= 2; style(stakeEl, { fontSize: px + 'px', lineHeight: Math.round(px * 1.2) + 'px' }) }
    style(stakeEl, { top: (hudTop + (YEAR_PX - stakeEl.offsetHeight) / 2).toFixed(0) + 'px', display: d.stake ? '' : 'none' })
  }
  const chips = EVENTS.map(ev => {
    const el = h('div', { class: 'cr-ev', style: { opacity: '0' } })
    const ic = s('svg', { width: 40, height: 48, viewBox: '0 0 40 48' })
    ic.append(s('line', { x1: 5, y1: 3, x2: 5, y2: 45, stroke: C.ink, 'stroke-width': 5, 'stroke-linecap': 'round' }),
      s('path', { d: 'M7,5 L37,15 L7,25 Z', fill: toneFill(ev.tone), stroke: C.ink, 'stroke-width': 3, 'stroke-linejoin': 'round' }))
    const sp = h('span', { style: { color: toneCol(ev.tone) } }, ev.label)
    el.append(ic, sp)
    fixed.append(el)
    let px = 48
    while (px > 36 && measure(ev.label, `800 ${px}px ${F.head}`, { letterSpacing: '-0.015em' }) + 56 > hudLW) px -= 2
    style(sp, { fontSize: px + 'px', lineHeight: Math.round(px * 1.2) + 'px' })
    style(el, { top: (hudTop + (YEAR_PX - Math.round(px * 1.2)) / 2).toFixed(0) + 'px' })
    return el
  })
  const evWin = EVENTS.map((ev, k) => [ev.t, Math.min(ev.t + 3.2, EVENTS[k + 1] ? EVENTS[k + 1].t - 0.15 : Infinity)])

  // ============================================================================ tag layout (pure)
  const restY = (i, t, m, uA) => {
    if (!showFig) return Ys(valueAt(i, m.xn), uA) - 50
    const yb = Ys(valueAt(i, Math.min(m.xn, Xd(bodyX(i, t, m), m))), uA)
    return lerp(yb, Ys(valueAt(i, m.xn), uA), E.inOut(prog(t, T1, 0.3))) - 0.62 * FIGH
  }
  // Tag order per pair i < j (1 = i sits below j): set by the tips with hysteresis (the values must be clearly apart)
  // and every swap is a quick timed exchange, however slowly the values cross. Precomputed: pure in t.
  const SWAP = 0.35, HYS = Math.max(5, plotH * 0.012)
  const ORDER = {}
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const fl = []
    let st = null
    for (let k = 0; k < NS; k += 4) {
      const t = k * DT, m = mapAt(t), uA = AX[k]
      const dy = Ys(valueAt(i, m.xn), uA) - Ys(valueAt(j, m.xn), uA)          // + = i lower on screen
      if (st == null) st = dy > 0.5 ? 1 : 0
      if (st === 0 && dy > HYS) { st = 1; fl.push(t) } else if (st === 1 && dy < -HYS) { st = 0; fl.push(t) }
    }
    const d0 = Ys(valueAt(i, xf), AX[0]) - Ys(valueAt(j, xf), AX[0])
    const want = endV[i] < endV[j] ? 1 : endV[i] > endV[j] ? 0 : null    // the finish shows the true order
    const stEnd = (d0 > 0.5 ? 1 : 0) ^ (fl.filter(t => t < T1 - 0.1).length % 2)
    const keep = fl.filter(t => t < T1 - 0.1)
    if (want != null && stEnd !== want) keep.push(T1 - 0.1)
    ORDER[i * 8 + j] = { st0: d0 > 0.5 ? 1 : 0, fl: keep }
  }
  const orderAt = (i, j, t) => {                       // { sg: 0..1 (1 = i below j), down: index of the tag going down }
    const o = ORDER[i * 8 + j]
    let st = o.st0, last = -Infinity
    for (const tf of o.fl) { if (tf > t) break; st = 1 - st; last = tf }
    const p = E.inOut(prog(t, last, SWAP))
    return { sg: st ? p : 1 - p, down: st ? i : j }
  }
  const layoutTags = (t, m, uA) => {
    const ys = SER.map((_, i) => restY(i, t, m, uA)), Hs = SER.map((_, i) => tagH(i, t)), op = SER.map(() => 1)
    const ord = {}
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) ord[i * 8 + j] = orderAt(i, j, t)
    for (let pass = 0; pass < 24; pass++) {
      for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
        const sg = ord[i * 8 + j].sg, sep = (Hs[i] + Hs[j]) / 2 + 26
        const G = (2 * sg - 1) * sep, gap = ys[i] - ys[j]
        if (sg >= 0.5 ? gap < G : gap > G) { const dd = (G - gap) / 2; ys[i] += dd; ys[j] -= dd }
      }
      for (let i = 0; i < N; i++) ys[i] = clamp(ys[i], colTop + Hs[i] / 2, colBot - Hs[i] / 2)
    }
    // during a swap (0.35 s) the tag going down dims as they pass, so they never overlap readably
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const o = ord[i * 8 + j], w = 1 - Math.abs(2 * o.sg - 1)
      op[o.down] = Math.min(op[o.down], 1 - 0.9 * smooth(0.02, 0.2, w))
    }
    return { ys, Hs, op }
  }

  // ============================================================================ cues + impacts (registered at mount)
  const fxk = makeFx(world, ctx)
  const cam = camera(world)
  if (showFig) ctx.cue(Math.max(0.05, T0), 'step', { gain: 0.55 })
  for (const ev of EVENTS) {
    if (ev.tone === 'bad' && ev.victim >= 0 && showFig) {
      const te0 = (ev.hitT ?? ev.t) + 0.04, m = mapAt(te0), uA = sampleAt(AX, te0)
      const J = figure(ev.victim, te0, m, uA).J
      fxk.impact(te0, { x: J.head[0], y: J.head[1], shake: 7, r: 30, lines: 8, cue: ev.scripted ? null : 'hit', gain: 0.5, color: C.red })
    } else ctx.cue(ev.t, ev.tone === 'bad' ? 'thud' : 'pop', { gain: 0.5 })
  }
  for (const o of OVERTAKES) ctx.cue(o.t, 'whoosh', { gain: 0.35, dur: 0.35 })
  // finale: jump, and the winner's number lands on the gold plate
  const plateAt = (() => {
    const m = mapAt(tLand), uA = sampleAt(AX, tLand)
    const lay = layoutTags(tLand, m, uA)
    const tg = tags[winner]
    const top = lay.ys[winner] - lay.Hs[winner] / 2 + tg.nameH + 8
    return { x: m.tip + LAB_GAP + tg.fw / 2, y: top + VAL_PX / 2, w: tg.fw + 2 * tg.PADX, hh: VAL_PX + 2 * tg.PADY }
  })()
  if (showFig) ctx.cue(tJump, 'swipe', { gain: 0.45, dur: 0.2 })
  fxk.impact(tLand, { x: plateAt.x, y: plateAt.y, shake: 12, punch: 0.025, rx: plateAt.w / 2 + 12, ry: plateAt.hh / 2 + 10, r: 40, lines: 12, cue: 'hit', gain: 0.9 })
  ctx.cue(tLand + 0.1, 'cash', { gain: 0.6 })

  // ============================================================================ seek
  const pathOf = (i, m, uA) => {
    let out = `M${f1(Xs(xf, m))},${f1(Ys(valueAt(i, xf), uA))}`
    for (const q of SER[i].pts) if (q[0] > xf && q[0] < m.xn) out += `L${f1(Xs(q[0], m))},${f1(Ys(q[1], uA))}`
    return out + `L${f1(Xs(m.xn, m))},${f1(Ys(valueAt(i, m.xn), uA))}`
  }

  function seek(t) {
    const m = mapAt(t), uA = sampleAt(AX, t)
    const started = m.xn > xf + 1e-9
    // ---- gridlines + labels (deco)
    const gx1 = m.tip + 22
    const fam = LOG ? 0 : famAt(t)
    const stN = LOG ? 0 : ladder(FAMS[fam].idx), stP = !LOG && fam > 0 ? ladder(FAMS[fam - 1].idx) : 0
    const xa = stP ? E.inOut(prog(t, FAMS[fam].t, 0.45)) : 1
    for (const gr of grids) {
      let a = 0
      if (LOG) a = isDecade(gr.v) ? 1 : smooth(250, 330, plotH * Math.LN10 / uA)
      else {
        const inN = isMult(gr.v, stN), inP = stP > 0 && isMult(gr.v, stP)
        a = inN && inP ? 1 : inN ? xa : inP ? 1 - xa : 0
      }
      const y = Ys(gr.v, uA)
      a *= clamp((y - (hudBottom + 30)) / 30) * clamp((BASE - 30 - y) / 20)
      attr(gr.line, 'y1', f1(y)); attr(gr.line, 'y2', f1(y)); attr(gr.line, 'x2', f1(gx1))
      attr(gr.line, 'opacity', (a * 0.9).toFixed(3))
      style(gr.lab, { transform: `translate(66px,${f1(y - 41)}px)`, opacity: a.toFixed(3), display: a > 0.01 ? '' : 'none' })
    }
    // ---- stake line
    const ys0 = Ys(stakeV, uA)
    attr(stakeLine, 'y1', f1(ys0)); attr(stakeLine, 'y2', f1(ys0)); attr(stakeLine, 'x2', f1(gx1))
    // ---- year ticks on the floor
    for (const tk of ticks) {
      const sx = Xs(tk.x, m)
      let a = 0
      for (const f of tk.fams) a = Math.max(a, smooth(96, 120, m.k * te * f))
      a *= (tk.x <= m.xn + 1e-6 ? 1 : 0) * clamp((m.tip - 40 - sx) / 40) * clamp((sx - PLOT_L + 40) / 30)
      style(tk.lab, { transform: `translate(${f1(sx - tk.w / 2)}px,${BASE - 48}px)`, opacity: a.toFixed(3), display: a > 0.01 ? '' : 'none' })
      attr(tk.mark, 'x1', f1(sx)); attr(tk.mark, 'x2', f1(sx)); attr(tk.mark, 'opacity', (a * 0.8).toFixed(3))
    }
    // ---- events: crash bands grow with the tip; flags drop onto the terrain where the event happens
    EVENTS.forEach((ev, k) => {
      const on = t >= ev.t
      const x0 = Xs(ev.x, m), x1 = Xs(Math.min(m.xn, ev.bandEnd), m)
      attr(bands[k], 'x', f1(x0)); attr(bands[k], 'width', f1(Math.max(0, x1 - x0)))
      attr(bands[k], 'opacity', on && ev.tone === 'bad' ? (0.7 * prog(t, ev.t, 0.2)).toFixed(3) : '0')
      const base = onLine(ev.on, ev.x, m, uA)
      const fl = ev.flagT != null ? fall(t, ev.flagT, 120, { e: 0.25, n: 1 }) : { y: 0 }
      attr(flags[k], 'transform', `translate(${f1(base[0])},${f1(base[1] - 4 - fl.y)})`)
      attr(flags[k], 'opacity', ev.flagT != null && t >= ev.flagT ? '1' : '0')
    })
    // ---- lines, hero hill, tip dots
    for (let i = 0; i < N; i++) {
      const pd = started ? pathOf(i, m, uA) : ''
      attr(lines[i], 'd', pd)
      if (i === heroIdx) attr(fill, 'd', started ? `${pd}L${f1(Xs(m.xn, m))},${BASE}L${f1(Xs(xf, m))},${BASE}Z` : '')
      attr(dots[i], 'cx', f1(m.tip)); attr(dots[i], 'cy', f1(Ys(valueAt(i, m.xn), uA)))
      attr(dots[i], 'opacity', started || !showFig ? '1' : '0')
      const lp = ledgeP(t), ly = Ys(valueAt(i, m.xn), uA)
      attr(ledges[i], 'd', lp > 0 ? `M${f1(m.tip + (LEDGE[0] - OFFS[i]) * lp)},${f1(ly)}L${f1(m.tip + LEDGE[1] * lp)},${f1(ly)}` : '')
      attr(ledges[i], 'opacity', lp > 0 ? '1' : '0')
    }
    // ---- figures
    if (showFig) for (let i = 0; i < N; i++) {
      const { J } = figure(i, t, m, uA)
      let sx = 1, sy = 1
      for (const ld of LANDS[i]) if (t >= ld.t && t < ld.t + 0.6) { const q = squashAt(t, ld.t, ld.amt); sx *= q.sx; sy *= q.sy }
      figs[i].draw(J, { sx, sy })
    }
    // ---- tags (tip counters)
    const lay = layoutTags(t, m, uA)
    const xLab = m.tip + LAB_GAP
    const swp = swapAt(t, T1 - 0.1, 0.26)
    for (let i = 0; i < N; i++) {
      const tg = tags[i]
      const v = valueAt(i, m.xn)
      const fin = swp.phase === 1
      setText(tg.val, fin ? finals[i] : tipText(v))
      const red = fin ? (num(finals[i]) < stakeV ? 1 : 0) : smooth(0.0, 0.006, (stakeV - v) / stakeV)
      const gold = i === winner && N > 1 ? popIn(t, tLand - 0.02, 0.3, 0.5) : null
      const goldOn = gold && t >= tLand - 0.02
      style(tg.val, { color: goldOn ? C.ink : mix(pal[i].text, C.red, red), transform: `scale(${Math.min(1, swp.sx).toFixed(3)},${swp.sy.toFixed(3)})`, transformOrigin: '0 100%', opacity: swp.opacity.toFixed(3) })
      if (gold) style(tg.plate, { opacity: goldOn ? '1' : '0', transform: `scale(${gold.scale.toFixed(3)})` })
      const nk = noteAt(i, t)
      if (nk >= 0) {
        const n = NOTES[i][nk]
        setText(tg.note, n.text)
        style(tg.note, { display: '', color: n.tone === 'bad' ? C.red : n.tone === 'good' ? C.heroInk : pal[i].text, opacity: popIn(t, n.t, 0.22).opacity.toFixed(3) })
      } else style(tg.note, { display: 'none' })
      let sc = 1
      for (const n of NOTES[i]) if (n.grow) sc += 0.12 * bump(t, n.t, 0.6)
      sc = Math.min(sc, Math.max(1, (L.railX - xLab) / tg.wMax))            // a growing tag never enters the rail
      style(tg.tag, { transform: `translate(${f1(xLab)}px,${f1(lay.ys[i] - lay.Hs[i] / 2)}px) scale(${sc.toFixed(3)})`, opacity: lay.op[i].toFixed(3) })
    }
    // ---- tide (beat)
    if (TIDE) {
      const p = E.out(prog(t, TIDE.t, 1.3)), on = t >= TIDE.t
      const lv = Ys(lerp(stakeV, TIDE.to, p), uA)
      const x0 = PLOT_L - 8, x1 = m.tip + 34
      let edge = `M${f1(x0)},${f1(lv)}`
      for (let x = x0; x <= x1 + 1; x += 24) edge += `L${f1(x)},${f1(lv + 4 * Math.sin(x / 26 + t * 5))}`
      attr(tideEl, 'd', `${edge}L${f1(x1)},${BASE}L${f1(x0)},${BASE}Z`)
      attr(tideEdge, 'd', edge)
      const a = on ? clamp(prog(t, TIDE.t, 0.25)) : 0
      attr(tideEl, 'opacity', (0.62 * a).toFixed(3)); attr(tideEdge, 'opacity', a.toFixed(3))
      if (tideLab) style(tideLab, { transform: `translate(${f1(PLOT_L + 6)}px,${f1(lv - 52)}px)`, opacity: a.toFixed(3), display: a > 0.01 ? '' : 'none' })
    }
    // ---- HUD: year, stake, event chip
    const yr = Math.floor(m.xn + 1e-6)
    setText(yearEl, yearText(m.xn))
    const yp = started && yr > Math.floor(xf + 1e-6) ? 1 + 0.07 * (1 - E.out(prog(t, tOfX(yr), 0.2))) : 1
    style(yearEl, { transform: `scale(${yp.toFixed(3)})` })
    let evA = 0
    EVENTS.forEach((ev, k) => {
      const [a0, a1] = evWin[k]
      const pp = popIn(t, a0, 0.24)
      const a = t < a0 ? 0 : Math.min(pp.opacity, 1 - prog(t, a1 - 0.3, 0.3))
      evA = Math.max(evA, a)
      style(chips[k], { opacity: a.toFixed(3), display: a > 0.01 ? '' : 'none', transform: `scale(${(t < a1 - 0.3 ? pp.scale : 1).toFixed(3)})` })
    })
    style(stakeEl, { opacity: clamp(1 - 3.4 * evA).toFixed(3) })        // never both readable at once
    // ---- impacts + camera
    const { shake, zoom } = fxk.seek(t)
    cam.set({ fx: plateAt.x, fy: plateAt.y, x: plateAt.x, y: plateAt.y, zoom, shake })
  }

  return { duration, seek }
}
