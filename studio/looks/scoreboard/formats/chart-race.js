// Scoreboard: chart-race — same-stake line-chart race (P4). ChartOrbit's mechanic, played as a live scoreboard.
//
// The same stake goes into 2 (max 3) named rivals on the same date; one continuous race, no cuts:
//   - the stage is a neon line race: glowing lines and tips, a live counter at every tip ("GOLD $58,204", fixed
//     digit slots so nothing jitters), an auto-rescaling y axis (dim, in the left margin), a dashed stake line
//     ("below the line = losing money"), and the year as a big rolling scoreboard clock in the plot's top-left
//     corner (the same spot as pov-race: money races climb to the top-right). It is decoration and faint, and it dims
//     further while a line or a tip label passes through it
//   - tip labels ride beside their tips and never sit on a tip or another label: their spot is planned at mount,
//     frame by frame (right of the tip = the empty future first, then above/below/left, scored on line ink under
//     the label, tip order and attribution), glides on a spring when it changes, and sits on a soft stage-colour
//     plate so a line that must pass behind a label is knocked out. Long names stack name over value.
//   - the hero odometer in the top bar is the score: the leader's live value in the leader's colour, with the
//     leader's name beside it (Inter caps, at most two balanced lines at >= 42 px; the number shrinks so name and
//     number fit the row at the finish's 1.13 bump). A lead change is a hard cut (tag + colour), a bump and a swipe
//   - event flags: a red dashed rule wipes down the plot (a 20% band with `until`) and the flag label slams into
//     the strip above the plot (captions on). Captions off (ChartOrbit's voice-free grammar): the flag text is a
//     hard cut in the bottom-bar label stack instead (HD Guy: the label stack is the caption), held FLAG_HOLD s (or
//     until the next flag), then the stack cuts back to the matchup (stake / NAME VS NAME)
//   - the finish: the lines stop at raceT[1]; the counters roll their last digits (running format) and, SETTLE s
//     later, land exactly on each series' `final` display string: hero bump, glow flare, floor bloom, the winner's
//     tip flares (a riser leads in, then hit + cash)
//   - the verdict is the chrome's: the kit's one verdict slot at the foot of the frame. With captions on it lands on
//     the band over the stage foot, so the plot box compresses (same y range, squeezed) over the 0.3 s before
//     verdict.t: both lines, their tips and the x ticks stay above the band
//   - long names: a tip label wider than 60% of the plot stacks name over value, the name fitted to
//     min(plot - 60, 560) px (one line, two balanced lines, else its leading words); the captions-off matchup never
//     wraps inside a name (NAME VS NAME, broken only at a VS, else NAME / VS / NAME, each fitted on its own line)
// Frame 1: the header (POV + stake), the stake in the hero, the footer, both tips at the stake with their counters,
// the clock at the start year. raceT[0] < 0 opens mid-race (already moving at 0.0 s, the hero on the leader).
//
// data (FORMATS.md §4): { stake, series: [{ name, points: [[x, v]...], final, label?, color?, basis? }],
//   x: { from, to, tickEvery }, y: { prefix, dp, compact, log, min?, max? }, raceT: [t0, t1],
//   events: [{ x, label, until?, tone? }], hold }
//   series.label   shorter name for the tip and the hero tag (default: name)
//   series.color   a theme colour key (green, yellow, white, grey, red) or a hex; default green, yellow, white
//   series.basis   a "money in" reference line: grey, dashed, never the leader
// lookOpts (all optional):
//   stakeLine    number: the dashed stake line's value; false: none (default: the common start value, if any)
//   footerSteps  [{ t, text }]: kit-wide (the chrome draws it): the footer rewrites to a working line at each t
//   flags        'chart' (labels above the plot) | 'labels' (label stack); default: chart with captions, else labels
//   yearSize     px of the corner clock (default 160); yearPrefix for a non-calendar x (default "YEAR ")
//   stageBottom  y where the stage ends (default 1300 with captions, 1240 without)
//   finalT       [t per series, in data.series order]: a staggered finish that follows the VO ("stocks ≈ $75,300"
//                … "gold ≈ $150,000"). The tips still land together at the finish; the hero shows the latest series
//                whose finalT has passed: a time at or before raceT[1] lands with the tips, a later one is a hard
//                cut. The winner's reveal is the climax (riser → hit + cash, the 1.13 bump, glow and floor flare,
//                the winner's tip flare); an earlier reveal lands with a pop and a smaller bump. Default: the
//                winner takes the hero at the finish.
//   flagHold     s a chart-strip flag label holds before it clears (default: until a newer label needs its spot).
//                In chart mode every flag label clears as the finals land: the finish gets a clean strip.
import { h, s, css as style, setText, setHTML, attr, prog, ease, clamp, lerp, fitText, fmtNum } from '../../../runtime/core.js'
import { C, SIZE, M, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, bare, heroRow, labelStack, stageFlash, flashAt, parseDisplay, displayValue, odometer, bump, slam,
  durationOf, toneColor, valueAt, measureText,
} from '../lib.js'

export const css = `
.cr-root { position: absolute; }
.cr-svg { position: absolute; left: 0; top: 0; overflow: visible; }
.cr-axis { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #6B7584; white-space: nowrap; }
.cr-axis-x { transform: translateX(-50%); }
.cr-year { position: absolute; }
.cr-tip { position: absolute; left: 0; top: 0; display: flex; align-items: flex-start; gap: 14px;
  font: 400 48px/1 'Anton', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.01em; white-space: nowrap;
  transform-origin: 100% 60%; text-shadow: 0 2px 12px #0E1116, 0 0 6px #0E1116, 0 0 2px #0E1116;
  background: rgba(14, 17, 22, 0.82); box-shadow: 0 0 12px 8px rgba(14, 17, 22, 0.82); border-radius: 12px; }
.cr-tip.two { flex-direction: column; align-items: flex-end; gap: 6px; }
.cr-tip.two .cr-name { font-size: 42px; }
.cr-name { display: block; line-height: 1; }
.cr-flag { position: absolute; font: 700 42px/1.1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; transform-origin: 50% 100%; }
.cr-stake { position: absolute; font: 600 30px/1 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; white-space: nowrap; }
.cr-tag { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; text-align: right; font: 700 42px/1.08 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; }
.cr-tag > span { display: block; }   /* one flex child: spaces around markup survive */
.cr-vs { color: #9AA4B2; }
.cr-mline { display: block; white-space: nowrap; line-height: 1; }
.cr-mline.two { white-space: normal; text-wrap: balance; }
.cr-mvs { display: block; font-family: 'Inter', 'Inter Full', sans-serif; font-weight: 700; line-height: 1; letter-spacing: 0.06em; color: #9AA4B2; }
`

const SETTLE = 0.45    // s: once the lines stop, tips and hero roll their last digits, then land on `final`
const TAGGAP = 26      // px between the hero tag and the number
const LEAD = 1.004     // a challenger must lead by 0.4% to take the hero (no flicker on near-ties)
const K = 1.2          // the y axis keeps the running max at 1/K of the plot height
const FLAG_HOLD = 2.5  // s an event flag holds the label stack (captions off) before the matchup comes back

const rgba = (hex, a) => {
  if (!/^#[0-9a-f]{6}$/i.test(hex)) hex = C.white
  const x = parseInt(hex.slice(1), 16)
  return `rgba(${x >> 16}, ${(x >> 8) & 255}, ${x & 255}, ${a})`
}
const glowFor = col => `drop-shadow(0 0 var(--glow, 16px) ${rgba(col, 'var(--glowA, 0.38)')})`

function niceStep(range, target = 4) {
  const raw = range / target
  const mag = Math.pow(10, Math.floor(Math.log10(raw || 1)))
  const n = raw / mag
  return (n < 1.5 ? 1 : n < 3 ? 2 : n < 7 ? 5 : 10) * mag
}
// axis tick text (decoration): compact, one decimal only when it is needed ("$1.5K", "$20K", "$2M")
function axisText(v, prefix) {
  const a = Math.abs(v)
  const unit = a >= 1e12 ? 1e12 : a >= 1e9 ? 1e9 : a >= 1e6 ? 1e6 : a >= 1e3 ? 1e3 : 1
  const m = v / unit
  return fmtNum(v, { prefix, dp: Math.abs(m - Math.round(m)) < 1e-6 ? 0 : 1, compact: unit > 1 })
}
const digitsOf = n => Math.max(1, String(Math.floor(Math.abs(n) + 1e-9)).length)

export default function chartRace(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const stage = ctx.stage

  // ---------- series ----------
  const PAL = [C.green, C.yellow, C.white]
  let pal = 0
  const ser = (d.series || []).filter(sr => sr && Array.isArray(sr.points) && sr.points.length).slice(0, 3).map((sr, i) => {
    const points = sr.points.map(p => [+p[0], +p[1]]).filter(p => isFinite(p[0]) && isFinite(p[1])).sort((a, b) => a[0] - b[0])
    const basis = !!(sr.basis || sr.role === 'basis')
    const color = sr.color ? (C[sr.color] || sr.color) : basis ? C.grey : PAL[pal++ % PAL.length]
    const final = sr.final != null ? String(sr.final) : null
    const ft = final ? parseDisplay(final) : null
    return { i, name: String(sr.name || ''), label: sr.label != null ? String(sr.label) : null, points, basis, color, final, finalTpl: ft && isFinite(ft.value) ? ft : null }
  }).filter(sr => sr.points.length)
  if (!ser.length) throw new Error('chart-race: data.series is empty')
  const racers = ser.some(sr => !sr.basis) ? ser.filter(sr => !sr.basis) : ser
  const nameOf = sr => sr.label || sr.name
  const lastV = sr => sr.points[sr.points.length - 1][1]
  const endV = sr => (sr.finalTpl ? sr.finalTpl.value * sr.finalTpl.scale : lastV(sr))
  const winner = racers.reduce((a, b) => (endV(b) > endV(a) ? b : a))

  // ---------- clock: x sweeps linearly over raceT ----------
  const xs = ser.flatMap(sr => sr.points.map(p => p[0]))
  const X = { from: Math.min(...xs), to: Math.max(...xs), ...(d.x || {}) }
  X.from = +X.from; X.to = +X.to
  if (!(X.to > X.from)) X.to = X.from + 1
  const span = X.to - X.from
  const calendar = X.from >= 1800 && X.to <= 2300
  X.tickEvery = +X.tickEvery > 0 ? +X.tickEvery : Math.max(1, niceStep(span, 5))
  const Y = { prefix: '$', suffix: '', dp: 0, compact: false, log: false, min: 0, ...(d.y || {}) }
  Y.dp = Math.max(0, Math.min(2, +Y.dp || 0))
  const rt = Array.isArray(d.raceT) && d.raceT.length === 2 && +d.raceT[1] > +d.raceT[0] ? d.raceT.map(Number) : [0.6, 0.6 + clamp(span * 1.6, 8, 48)]
  const [R0, R1] = rt
  const TF = R1 + SETTLE                // the finish: counters land on the final display strings
  // staggered finish (lookOpts.finalT): when each racer's final takes the hero, and when it lands there
  const finTs = Array.isArray(lo.finalT) ? lo.finalT : null
  const revealT = sr => { const v = finTs ? +finTs[sr.i] : NaN; return isFinite(v) ? Math.max(R1, v) : R1 }
  const landT = sr => (revealT(sr) <= R1 + 1e-6 ? TF : revealT(sr))
  // the hero after the finish: the racer revealed last so far (ties: the winner, so without finalT it is the winner)
  const heroOrder = racers.slice().sort((a, b) => revealT(a) - revealT(b) || (a === winner) - (b === winner))
  const heroAfter = t => { let sr = null; for (const r of heroOrder) if (t >= revealT(r)) sr = r; return sr }
  const TW = landT(winner)                // the climax: the winner's final lands in the hero
  const xAt = t => lerp(X.from, X.to, prog(t, R0, R1 - R0))
  const tAtX = x => R0 + ((x - X.from) / span) * (R1 - R0)
  const secPerYear = (R1 - R0) / span

  // ---------- layout: a tall stage; captions on: the chart runs to 1300, the caption band below ----------
  const L0 = layoutFor(spec)
  const capsOn = L0.captionsOn
  const L = layoutFor(spec, { stageBottom: lo.stageBottom ?? (capsOn ? 1300 : 1240) })
  const events = (d.events || []).filter(e => e && isFinite(+e.x) && +e.x >= X.from && +e.x <= X.to)
    .map(e => ({ x: +e.x, until: e.until != null && isFinite(+e.until) ? Math.min(+e.until, X.to) : null, label: String(e.label || ''), tone: e.tone || 'bad' }))
    .sort((a, b) => a.x - b.x)
  events.forEach(e => { e.t = tAtX(e.x); e.col = toneColor(e.tone) })
  const stackMode = L.label.h >= 150 && (lo.flags ? lo.flags === 'labels' : !capsOn)
  const flagStrip = !stackMode && events.some(e => e.label)
  const P = { x: 160, w: 740 }                                  // plot: x 160-900 (tip halos clear the rail)
  P.y = L.stage.y + (flagStrip ? 72 : 30)                       // flag strip above the plot
  P.h = L.stage.y + L.stage.h - 58 - P.y                        // x tick labels below it
  const pxOf = x => ((x - X.from) / span) * P.w
  // the verdict never covers the chart: when it lands on a band over the stage foot (L.verdict.boxed), the plot box
  // compresses over the 0.3 s before verdict.t so both lines, the tips and the x ticks end above the band (the y range
  // is unchanged, only squeezed; nothing reads as a camera move)
  const vT = spec.verdict && spec.verdict.text ? Math.max(0, +spec.verdict.t || 0) : null
  const PH0 = P.h
  const PH1 = vT != null && L.verdict.boxed ? clamp(L.verdict.y - 10 - 54 - P.y, PH0 * 0.45, PH0) : PH0
  const phAt = t => (PH1 >= PH0 ? PH0 : lerp(PH0, PH1, ease.inOut(prog(t, vT - 0.3, 0.3))))

  // ---------- values, y scale (auto-rescaling, smoothed, monotonic) ----------
  const vAt = (sr, x) => valueAt(sr.points, x)
  const allVals = ser.flatMap(sr => sr.points.map(p => p[1]))
  const allMax = Math.max(...allVals, ...ser.map(endV))
  const startMax = Math.max(...ser.map(sr => vAt(sr, X.from)))
  function runMax(x) {
    let m = -Infinity
    for (const sr of ser) {
      for (const p of sr.points) { if (p[0] > x) break; if (p[1] > m) m = p[1] }
      m = Math.max(m, vAt(sr, x))
    }
    return m
  }
  // never zoom in past the first ~12% of the race, so an opening near the stake still has an axis
  const yFloor = Math.max(startMax * 1.6, runMax(X.from + span * 0.12) * 1.25, allMax * 0.05, 1e-6)
  const yMaxAt = t => {
    if (Y.max != null) return +Y.max
    let acc = 0
    for (let k = 0; k < 6; k++) acc += runMax(xAt(t - k * 0.07))
    return Math.max(yFloor, (acc / 6) * K, runMax(xAt(t)) * 1.06)   // the smoothing lags a steep climb: never let a line run off the top
  }
  const pos = allVals.filter(v => v > 0)
  const logMin = Y.min > 0 ? +Y.min : (pos.length ? Math.min(...pos) : 1) * 0.8
  const logMax = Y.max != null ? +Y.max : allMax * 1.3
  const pyFor = (ymax, ph = P.h) => (Y.log
    ? v => ph - ((Math.log10(Math.max(v, logMin)) - Math.log10(logMin)) / (Math.log10(logMax) - Math.log10(logMin))) * ph
    : v => ph - ((v - Y.min) / (ymax - Y.min)) * ph)

  // running counter templates (the finals are display strings; only running values are formatted here)
  const runTpl = { prefix: Y.prefix, suffix: Y.suffix, dp: Y.dp, group: true, scale: 1, value: 0 }
  const tplAt = v => {
    if (!Y.compact) return runTpl
    const a = Math.abs(v)
    const [scale, suffix] = a >= 1e9 ? [1e9, 'B'] : a >= 1e6 ? [1e6, 'M'] : a >= 1e3 ? [1e3, 'K'] : [1, '']
    return { prefix: Y.prefix, suffix: suffix + Y.suffix, dp: scale > 1 ? Math.max(1, Y.dp) : Y.dp, group: true, scale, value: 0 }
  }
  const snapT = (v, tpl) => { const q = Math.pow(10, tpl.dp) / tpl.scale; return Math.round(v * q) / q }
  const maxInt = Math.min(10, Y.compact ? 3 : digitsOf(allMax * 1.05))

  // ---------- the stake (dashed line + hero on frame 1) ----------
  const starts = racers.map(sr => sr.points[0][1])
  const sameStart = starts.every(v => Math.abs(v - starts[0]) <= Math.abs(starts[0]) * 1e-6 + 1e-9)
  const sl = lo.stakeLine
  const stakeV = sl === false ? null : typeof sl === 'number' && isFinite(sl) ? sl : sameStart ? starts[0] : null
  const tok = /≈?\s?[$€£]\s?\d[\d,]*(?:\.\d+)?(?:\s?[KMBT](?![a-z]))?/.exec(String(d.stake || ''))
  const stakeTok = tok && stakeV != null && Math.abs(displayValue(tok[0]) - stakeV) < 0.5 ? tok[0] : null
  const stakeMode = sameStart && racers.length > 1

  // ---------- who leads (hysteresis, precomputed: seek only looks it up) ----------
  const leads = (() => {
    const N = 1200, segs = []
    let cur = null
    for (let k = 0; k <= N; k++) {
      const x = X.from + (span * k) / N
      let best = null, bv = -Infinity, sv = -Infinity
      for (const sr of racers) { const v = vAt(sr, x); if (v > bv) { sv = bv; bv = v; best = sr } else if (v > sv) sv = v }
      if (!cur) {
        if (racers.length === 1 || bv > sv * LEAD + 1e-9 || k === N) { cur = best; segs.push({ x: X.from, sr: best }) }
        continue
      }
      if (best !== cur && bv > vAt(cur, x) * LEAD) { cur = best; segs.push({ x, sr: best }) }
    }
    return segs.map((sg, k) => ({ ...sg, t: k ? tAtX(sg.x) : R0 }))
  })()
  const leaderAt = t => { let sr = leads[0].sr; for (const sg of leads) if (t >= sg.t) sr = sg.sr; return sr }
  const changes = leads.slice(1).filter(sg => sg.t < R1 - 0.35)   // a pass in the last instant merges with the finish

  // =============================================================================================== DOM
  const flash = stageFlash(stage, L)
  const root = h('div', { class: 'cr-root', style: { left: P.x + 'px', top: P.y + 'px', width: P.w + 'px', height: P.h + 'px' } })
  stage.append(root)

  // the clock: a big rolling year in the plot's top-left corner, behind the lines (decoration: the x axis and the VO
  // carry the year too). Money races climb to the top-right, so that corner stays clear; it dims while a line or a
  // tip label passes through it.
  const YS = +lo.yearSize || 160
  const yearBox = h('div', { class: 'cr-year', 'data-deco': '' })
  root.append(yearBox)
  const yearOdo = odometer(yearBox, { size: YS, color: 'rgba(255, 255, 255, 0.15)', maxInt: calendar ? 4 : 3, maxDp: 0 })
  const yearTpl = { prefix: calendar ? '' : (lo.yearPrefix ?? 'YEAR '), suffix: '', dp: 0, group: false, scale: 1, value: 0 }
  style(yearBox, { left: '12px', top: Math.round(-0.02 * YS) + 'px' })
  const rollF = clamp(0.24 / Math.max(1e-6, secPerYear), 0.04, 0.4)    // the year digits roll in ~0.24 s
  // the year rolls into y + 1 over the last rollF of year y, and never past the clock's last year (x.to = 2025 holds
  // "2025"; x.to = 2025.99 holds "2025" too)
  const yearEnd = Math.floor(X.to + 1e-6)
  const yearV = x => {
    const y = Math.floor(x + 1e-6)
    return Math.max(Math.floor(X.from + 1e-6), Math.min(yearEnd, y + clamp((x - (y + 1 - rollF)) / rollF)))
  }

  const svg = s('svg', { class: 'cr-svg', width: P.w, height: P.h, viewBox: `0 0 ${P.w} ${P.h}`, 'data-deco': '' })
  svg.append(s('defs', {}, s('filter', { id: 'crGlow', x: '-50%', y: '-50%', width: '200%', height: '200%' }, s('feGaussianBlur', { stdDeviation: 7 }))))
  const gBand = s('g'), gGrid = s('g'), gStake = s('g'), gRule = s('g'), gLine = s('g'), gTip = s('g')
  svg.append(gBand, gGrid, gStake, gRule, gLine, gTip)
  root.append(svg)

  // y grid + labels in the left margin (decoration)
  const grid = Array.from({ length: 9 }, () => {
    const line = s('line', { x1: 0, x2: P.w, stroke: C.edge, 'stroke-width': 2, opacity: 0 })
    gGrid.append(line)
    const lab = h('div', { class: 'cr-axis', 'data-deco': '', style: { right: P.w + 16 + 'px', display: 'none' } })
    root.append(lab)
    return { line, lab }
  })
  const baseLine = s('line', { x1: 0, x2: P.w, y1: P.h, y2: P.h, stroke: '#2A3340', 'stroke-width': 3 })
  gGrid.append(baseLine)
  const logTicks = []
  if (Y.log) {
    // fixed log ticks: 1-2-5 per decade, at least 56 px apart
    const py = pyFor(logMax)
    const vals = []
    for (let e = Math.floor(Math.log10(logMin)); e <= Math.ceil(Math.log10(logMax)); e++) for (const m of [1, 2, 5]) vals.push(m * Math.pow(10, e))
    let lastY = Infinity, k = 0
    for (const v of vals) {
      if (v < logMin || v > logMax * 0.97 || k >= grid.length) continue
      const yy = py(v)
      if (lastY - yy < 56) continue
      lastY = yy
      const g = grid[k++]
      attr(g.line, 'opacity', '1'); attr(g.line, 'y1', yy.toFixed(1)); attr(g.line, 'y2', yy.toFixed(1))
      setText(g.lab, axisText(v, Y.prefix))
      style(g.lab, { display: 'block', top: (yy - 15).toFixed(1) + 'px' })
      logTicks.push({ g, v })
    }
  }
  // x ticks under the plot (decoration): passed years bright, future years dim
  const xTicks = []
  for (let k = Math.ceil(X.from / X.tickEvery - 1e-9); k * X.tickEvery <= X.to + 1e-9; k++) {
    const xv = +(k * X.tickEvery).toFixed(6)
    const lab = h('div', { class: 'cr-axis cr-axis-x', 'data-deco': '', style: { left: pxOf(xv).toFixed(1) + 'px', top: P.h + 12 + 'px' } }, String(Math.round(xv * 100) / 100))
    root.append(lab)
    xTicks.push({ xv, lab, w: lab.offsetWidth })
  }

  // stake line: dashed, with the stake display (from data.stake) at its right end (decoration)
  let stakeLine = null, stakeLab = null
  if (stakeV != null) {
    stakeLine = s('line', { x1: 0, x2: P.w, stroke: C.grey, 'stroke-width': 3, 'stroke-dasharray': '3 13', 'stroke-linecap': 'round', opacity: 0.6 })
    gStake.append(stakeLine)
    if (stakeTok) { stakeLab = h('div', { class: 'cr-stake', 'data-deco': '' }, stakeTok); root.append(stakeLab); stakeLab.__w = stakeLab.offsetWidth }   // measured once: seek may find it hidden
  }

  // events: dashed rule (+ band), flag label in the strip above the plot (chart mode)
  const evEls = events.map(e => {
    const band = e.until != null && e.until > e.x ? s('rect', { y: 0, height: P.h, width: 0, fill: e.col, opacity: 0 }) : null
    if (band) gBand.append(band)
    const rule = s('line', { x1: pxOf(e.x).toFixed(1), x2: pxOf(e.x).toFixed(1), y1: 0, y2: 0, stroke: e.col, 'stroke-width': 3, 'stroke-dasharray': '10 10', opacity: 0 })
    gRule.append(rule)
    let lab = null
    if (flagStrip && e.label) {
      lab = h('div', { class: 'cr-flag', html: richUI(e.label), style: { color: e.col, top: L.stage.y + 14 + 'px' } })
      stage.append(lab)
    }
    return { e, band, rule, lab, retire: Infinity }
  })
  if (flagStrip) {
    // fixed spots, centred on the event (clamped to the safe zone); an older label retires (hard cut) when a newer
    // one would touch it
    for (const ev of evEls) if (ev.lab) {
      ev.w = ev.lab.offsetWidth
      ev.left = clamp(P.x + pxOf(ev.e.x) - ev.w / 2, 80, 1004 - ev.w)
      style(ev.lab, { left: ev.left.toFixed(1) + 'px', display: 'none' })
    }
    const hold = +lo.flagHold > 0 ? +lo.flagHold : Infinity
    evEls.forEach((ev, k) => {
      if (!ev.lab) return
      for (let j = k + 1; j < evEls.length; j++) {
        const o = evEls[j]
        if (o.lab && o.left < ev.left + ev.w + 28 && o.left + o.w + 28 > ev.left) { ev.retire = o.e.t; break }
      }
      // a label holds at most flagHold s, and the strip clears as the finals land (the finish owns the frame)
      ev.retire = Math.min(ev.retire, ev.e.t + hold, Math.max(TF, ev.e.t + 1.5))
    })
  }

  // lines, tips, tip labels (name + live odometer)
  const thick = ser.length > 2 ? 8 : 9
  const S = ser.map(sr => {
    const w = sr.basis ? 5 : thick
    const glow = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': w * 2.6, opacity: sr.basis ? 0.12 : 0.3, filter: 'url(#crGlow)', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    const path = s('path', { fill: 'none', stroke: sr.color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' })
    if (sr.basis) attr(path, 'stroke-dasharray', '2 16')
    gLine.append(glow, path)
    const halo = s('circle', { r: 26, fill: sr.color, opacity: 0.28, filter: 'url(#crGlow)' })
    const dot = s('circle', { r: sr.basis ? 8 : 11, fill: sr.color })
    const core = s('circle', { r: 4.5, fill: '#FFFFFF' })
    gTip.append(halo, dot, core)
    const lab = h('div', { class: 'cr-tip', style: { color: sr.color } }, h('span', { class: 'cr-name', html: rich(nameOf(sr)) }))
    const odo = odometer(lab, { size: SIZE.tip, color: sr.color, maxInt, maxDp: Math.max(Y.dp, Y.compact ? 1 : 0) })
    root.append(lab)
    return { sr, glow, path, halo, dot, core, lab, odo }
  })
  // a label wider than 60% of the plot (long names) stacks its name over its value; the name then fits TIPMAX on
  // one line at 42 px, else on two balanced lines, else (no series.label given) as its leading words that fit
  const TIPMAX = Math.min(P.w - 60, 560)
  for (const o of S) {
    const mx = Math.max(...o.sr.points.map(p => p[1]))
    const widest = () => {
      let w = 0
      for (const show of [() => o.odo.set(snapT(mx, tplAt(mx)), tplAt(mx)), () => o.sr.final && o.odo.show(o.sr.final)]) { show(); w = Math.max(w, o.lab.offsetWidth) }
      return w
    }
    o.two = widest() > P.w * 0.6
    if (!o.two) continue
    o.lab.classList.add('two')
    const nameEl = o.lab.firstChild
    const wOf = html => { nameEl.innerHTML = html; return nameEl.offsetWidth }
    if (wOf(rich(nameOf(o.sr))) <= TIPMAX) continue
    const words = bare(nameOf(o.sr)).split(/\s+/).filter(Boolean)
    let best = null
    for (let n = words.length; n >= 1 && !best; n--) {
      const ws = words.slice(0, n)
      if (wOf(rich(ws.join(' '))) <= TIPMAX) { best = rich(ws.join(' ')); break }
      let cand = null
      for (let k = 1; k < ws.length; k++) {
        const a = rich(ws.slice(0, k).join(' ')), b = rich(ws.slice(k).join(' '))
        const w = Math.max(wOf(a), wOf(b))
        if (w <= TIPMAX && (!cand || w < cand.w)) cand = { w, html: a + '<br>' + b }
      }
      if (cand) best = cand.html
    }
    nameEl.innerHTML = best || rich(words[0] || '')
  }

  // ---------- hero: the stake on frame 1, then the leader's live value with the leader's name ----------
  const hero = heroRow(stage, L, { maxDp: 2 })
  const HS = L.hero.size
  // the leader's name beside the number: one line, or two balanced lines at the word break that makes it narrowest
  // (never more: a three-line tag overflows its box); 42 px, so the hero's 3% dip keeps it >= 40
  const tags = new Map()
  for (const sr of racers) {
    const name = nameOf(sr)
    const el = h('div', { class: 'cr-tag', html: `<span>${richUI(name)}</span>`, style: { color: sr.color } })
    stage.append(el)
    const wOf = html => { setHTML(el, `<span>${html}</span>`); return Math.ceil(el.offsetWidth) + 2 }
    let tw = wOf(richUI(name)), html = richUI(name)
    if (tw > 300) {
      const words = bare(name).split(/\s+/).filter(Boolean)
      for (let k = 1; k < words.length; k++) {
        const a = esc(words.slice(0, k).join(' ')), b = esc(words.slice(k).join(' '))
        const w = Math.max(wOf(a), wOf(b))
        if (w < tw) { tw = w; html = a + '<br>' + b }
      }
    }
    setHTML(el, `<span>${html}</span>`)
    hero.el.append(el)
    style(el, { height: L.hero.h + 'px', width: tw + 'px', display: 'flex' })
    fitText(el, tw, { maxH: L.hero.h - 8, minPx: 42 })
    style(el, { display: 'none' })
    tags.set(sr, { el, w: tw })
  }
  {
    // one hero size for the whole video: the widest group (tag + number) fits the 960 px row at its biggest bump
    const room = L.hero.w / 1.14
    let f = 1
    const fit = (fn, sp) => { fn(); const ow = hero.odo.el.offsetWidth; if (ow + sp > room) f = Math.min(f, (room - sp) / ow) }
    if (stakeTok) fit(() => hero.show(stakeTok), 0)
    for (const sr of racers) {
      const sp = tags.get(sr).w + TAGGAP
      const mx = Math.max(...sr.points.map(p => p[1]))
      fit(() => hero.set(snapT(mx, tplAt(mx)), tplAt(mx)), sp)
      if (sr.finalTpl) fit(() => hero.show(sr.final), sp)
    }
    if (f < 1) style(hero.odo.el, { fontSize: Math.floor(HS * Math.max(0.45, f)) + 'px' })
  }

  // ---------- label stack (captions off): the matchup at rest; each event a hard cut held FLAG_HOLD s ----------
  let labels = null
  const chapters = []
  if (stackMode) {
    const l1 = d.stake ? rich(d.stake) : ''
    // the matchup never wraps inside a name: "NAME VS NAME" on one line, or broken only at a VS; names too long for
    // that stack as NAME / VS / NAME, each name fitted to the 800 px slot on its own line (>= 40 px)
    const T = L.type
    const avail = L.label.h - (l1 ? T.l1 + 6 : 0)
    const W1 = str => measureText(bare(str).toUpperCase(), "400 100px 'Anton', 'Inter Full', sans-serif") * 1.01 / 100
    const names = racers.map(nameOf)
    const vsW = W1(' VS ')
    const sizeOf2 = lines => Math.min(T.l2, 780 / Math.max(...lines.map(l => l.reduce((a, n, k) => a + W1(n) + (k ? vsW : 0), 0))), avail / lines.length)
    let fitsInline = sizeOf2([names]) >= T.l2Min
    for (let k = 1; k < names.length && !fitsInline; k++) fitsInline = sizeOf2([names.slice(0, k), names.slice(k)]) >= T.l2Min
    let vs, l1m = l1
    if (fitsInline) vs = racers.map(sr => `<span class="nb" style="color:${sr.color}">${rich(nameOf(sr))}</span>`).join(' <span class="cr-vs">VS</span> ')
    else {
      // a name too wide for 780 px even at 40 px takes two balanced lines of its own; the stake line (it is in the
      // header and the footer too) gives its row up when the stack needs it
      const VSPX = 40
      const nl = names.map(n => (W1(n) * 40 > 780 ? 2 : 1))
      const minH = nl.reduce((a, k) => a + 40 * k, 0) + VSPX * (names.length - 1) + 4
      const room0 = (l1 && minH <= avail ? avail : L.label.h) - VSPX * (names.length - 1) - 4
      if (!(l1 && minH <= avail)) l1m = ''
      let px = names.map((n, k) => Math.min(T.l2, nl[k] === 1 ? 780 / W1(n) : (780 * 1.8) / W1(n)))
      const hOf = v => v.reduce((a, x, k) => a + x * nl[k], 0)
      if (hOf(px) > room0) px = px.map(v => Math.max(40, (v * room0) / hOf(px)))
      for (let it = 0; it < 4; it++) {                 // names held at the 40 px floor: the others give up the rest
        const over = hOf(px) - room0, free = px.map((v, k) => (v > 40.5 ? (v - 40) * nl[k] : 0))
        const fs = free.reduce((a, b) => a + b, 0)
        if (over <= 0.5 || !fs) break
        px = px.map((v, k) => (v > 40.5 ? Math.max(40, v - (over * (v - 40)) / fs) : v))
      }
      vs = racers.map((sr, k) => `<span class="cr-mline${nl[k] > 1 ? ' two' : ''}" style="color:${sr.color}; font-size:${(px[k] / T.l2).toFixed(4)}em">${rich(nameOf(sr))}</span>`)
        .join(`<span class="cr-mvs" style="font-size:${(VSPX / T.l2).toFixed(4)}em">VS</span>`)
    }
    const items = [{ l1: l1m, l2: vs }]
    chapters.push({ t: 0, idx: 0 })
    const flagged = events.filter(e => e.label)
    flagged.forEach((e, k) => {
      chapters.push({ t: e.t, idx: items.length })
      items.push({ l1, l2: rich(e.label), l2Color: e.tone === 'neutral' ? C.white : e.col })
      const next = k + 1 < flagged.length ? flagged[k + 1].t : Infinity
      if (e.t + FLAG_HOLD < next) chapters.push({ t: e.t + FLAG_HOLD, idx: 0 })   // back to the matchup
    })
    labels = labelStack(stage, L, items)
  }

  // ---------- sound: whoosh at the start, a tick per flag (thud per label cut), swipe on a pass, riser → hit ----------
  const cue = (t, kind, o) => { if (t >= 0) ctx.cue(t, kind, o) }
  if (R0 > 0.05) cue(R0, 'whoosh', { dur: 0.6, gain: 0.5 })
  else cue(0, 'whoosh', { dur: 0.45, gain: 0.3 })            // opening mid-race: a soft whoosh under frame 1
  for (const e of events) cue(e.t, stackMode && e.label ? 'thud' : 'tick', { gain: stackMode && e.label ? 0.65 : 0.55 })
  for (const sg of changes) cue(sg.t, 'swipe', { gain: 0.5 })   // a lead change: the hero cuts to the new leader
  const riseDur = Math.min(2.4, (R1 - R0) * 0.2)
  if (riseDur > 0.6) cue(TW - riseDur, 'riser', { dur: riseDur, gain: 0.4 })
  cue(TW, 'hit', { gain: 0.85 })
  cue(TW + 0.06, 'cash', { gain: 0.5 })
  if (TW > TF + 0.05) cue(TF, 'pop', { gain: 0.6 })            // staggered: the tips (and the first reveal) land

  const duration = durationOf(spec, TW, d.hold ?? M.hold)
  const yearRect = { x: 0, y: 0, w: 0, h: 0 }
  {
    yearOdo.set(Math.floor(X.to + 1e-6), yearTpl)
    yearRect.w = yearBox.offsetWidth; yearRect.h = YS * 0.88
    yearRect.x = 12; yearRect.y = 0
  }
  const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

  // a counter's value at t: live (snapped to its display precision) while the race runs; once the lines stop, the
  // last digits roll onto the final value (still in the running format: no "≈" before an unrounded figure) and land
  // exactly on the `final` display string at TF
  function counter(sr, t, x) {
    let v = vAt(sr, x)
    if (t >= R1 && sr.finalTpl) {
      if (t >= TF) return { disp: sr.final }
      v = lerp(lastV(sr), sr.finalTpl.value * sr.finalTpl.scale, ease.out(prog(t, R1, SETTLE)))
    }
    const tpl = tplAt(v)
    return { v: snapT(v, tpl), tpl }
  }
  const showOn = (odo, c) => (c.disp ? odo.show(c.disp) : odo.set(c.v, c.tpl))

  // ---------- tip-label placement ----------
  // A tip label must never sit on a line, on a tip or on another label, and it must not flicker. Where it goes is
  // decided once, here, frame by frame in time order (so it can have hysteresis and glide): each label tries five
  // spots around its tip (right of the tip, which is the empty future and ChartOrbit's spot; right above/below;
  // left above/below), every combination is scored (line ink under the label, tips covered, labels touching, a small
  // preference, a cost for switching spot), and the chosen offset from the tip is smoothed by a critically damped
  // spring. seek() only reads this table (interpolated between frames), so it stays a pure function of t.
  const sizeCache = new Map()
  // labels stay inside the plot (YB = its height - 4): the x ticks under it always read
  function sizeOf(o, c) {
    const tpl = c.disp ? parseDisplay(c.disp) : c.tpl
    const v = c.disp ? tpl.value * tpl.scale : c.v
    const key = [o.sr.i, tpl.prefix, tpl.suffix, tpl.dp, tpl.group ? 1 : 0, digitsOf(Math.max(0, v) / tpl.scale)].join('|')
    let sz = sizeCache.get(key)
    if (!sz) {
      showOn(o.odo, c)
      style(o.lab, { display: 'flex' })
      sz = { w: o.lab.offsetWidth, h: o.lab.offsetHeight }
      sizeCache.set(key, sz)
    }
    return sz
  }
  // length of segment (x0,y0)-(x1,y1) inside the rect [rx0, rx1] x [ry0, ry1] (Liang-Barsky)
  function clipLen(x0, y0, x1, y1, rx0, ry0, rx1, ry1) {
    if (Math.max(x0, x1) < rx0 || Math.min(x0, x1) > rx1 || Math.max(y0, y1) < ry0 || Math.min(y0, y1) > ry1) return 0
    const dx = x1 - x0, dy = y1 - y0
    let a = 0, b = 1
    const pq = [[-dx, x0 - rx0], [dx, rx1 - x0], [-dy, y0 - ry0], [dy, ry1 - y0]]
    for (const [p, q] of pq) {
      if (p === 0) { if (q < 0) return 0; continue }
      const u = q / p
      if (p < 0) { if (u > b) return 0; if (u > a) a = u } else { if (u < a) return 0; if (u < b) b = u }
    }
    return (b - a) * Math.hypot(dx, dy)
  }
  const PL = (() => {
    const fps = spec.fps || 30
    const t0 = Math.min(0, R0), t1 = Math.max(TF + 0.25, PH1 < PH0 ? vT + 0.05 : 0)
    const n = Math.max(2, Math.ceil((t1 - t0) * fps) + 1)
    const xl = 0, xr = Math.min(P.w + 40, 940 - P.x)          // labels may reach x 940 (the rail), never the axis
    const GX = 24, GY = 12, PAD = 7
    // spots: [anchor, vertical, stand-off d px, preference]. anchor R = right of the tip (clamped at the rail),
    // L = left of it, C = over it (mostly to its left); vertical 0 = centred on the tip, -1 above, +1 below
    const SPOTS = [['R', 0, 0, 0], ['L', 0, 0, 34]]
    for (const d of [0, 60, 120]) for (const v of [-1, 1]) {
      SPOTS.push(['R', v, d, 8 + (v > 0 ? 4 : 0)])
      SPOTS.push(['L', v, d, 22 + (v > 0 ? 6 : 0)])
    }
    for (const d of [34, 94]) for (const v of [-1, 1]) SPOTS.push(['C', v, d, 18 + (v > 0 ? 6 : 0)])
    const KEEP = 6
    const off = S.map(() => new Float32Array(n * 2))
    const prevK = S.map(() => -1)
    const cur = S.map(() => null)
    const w0 = 2 * Math.PI * 2.1                                // spring: settles in ~0.3 s
    const sub = 3, dt = 1 / fps / sub
    for (let f = 0; f < n; f++) {
      const t = t0 + f / fps
      const x = xAt(t)
      const YB = phAt(t) - 4
      const py = pyFor(Y.log ? logMax : yMaxAt(t), phAt(t))
      const lines = S.map(o => {
        const a = []
        for (const p of o.sr.points) { if (p[0] > x + 1e-9) break; a.push(pxOf(p[0]), py(p[1])) }
        if (a.length) a.push(pxOf(x), py(vAt(o.sr, x)))
        return a
      })
      const tipXY = lines.map(a => (a.length ? [a[a.length - 2], a[a.length - 1]] : null))
      const sy = stakeV != null ? py(stakeV) : null
      const rules = events.filter(e => t >= e.t).map(e => pxOf(e.x))
      const act = []
      S.forEach((o, k) => {
        if (!tipXY[k]) { cur[k] = null; prevK[k] = -1; return }
        const [tx, ty] = tipXY[k]
        const { w, h } = sizeOf(o, counter(o.sr, t, x))
        const ax = { R: Math.min(tx + GX, xr - w), L: Math.max(xl, tx - GX - w), C: clamp(tx - w * 0.72, xl, xr - w) }
        const cands = SPOTS.map(([an, v, d, pref], j) => {
          const rx = ax[an]
          const ry = clamp(v === 0 ? ty - h / 2 : v < 0 ? ty - GY - d - h : ty + GY + d, 0, YB - h)
          const x0 = rx - PAD, x1 = rx + w + PAD, y0 = ry - PAD, y1 = ry + h + PAD
          let c = pref + 0.4 * d + (prevK[k] >= 0 && prevK[k] !== j ? 26 : 0)
          lines.forEach((a, m) => {
            const wt = S[m].sr.basis ? 0.5 : 1
            for (let i = 2; i < a.length; i += 2) c += wt * clipLen(a[i - 2], a[i - 1], a[i], a[i + 1], x0, y0, x1, y1)
          })
          for (const tp of tipXY) if (tp && tp[0] > x0 - 16 && tp[0] < x1 + 16 && tp[1] > y0 - 16 && tp[1] < y1 + 16) c += 5000
          // attribution: a label sits nearer its own tip than any rival's
          const dist = (px2, py2) => Math.hypot(Math.max(rx - px2, 0, px2 - rx - w), Math.max(ry - py2, 0, py2 - ry - h))
          const own = dist(tx, ty)
          tipXY.forEach((tp, m) => {
            if (!tp || m === k || Math.hypot(tp[0] - tx, tp[1] - ty) < 8) return
            const other = dist(tp[0], tp[1])
            if (other < own + 12) c += 160 + 3 * (own + 12 - other)
          })
          if (sy != null) c += 0.04 * clipLen(0, sy, P.w, sy, x0, y0, x1, y1)
          for (const rx2 of rules) c += 0.1 * clipLen(rx2, 0, rx2, P.h, x0, y0, x1, y1)
          return { j, x: rx, y: ry, w, h, c }
        }).sort((a, b) => a.c - b.c || a.j - b.j).slice(0, KEEP)
        act.push({ k, tx, ty, cands })
      })
      // best combination (at most 5^3 = 125): labels must not touch
      let best = null, bestC = Infinity
      const pick = new Array(act.length)
      const walk = (i, acc) => {
        if (acc >= bestC) return
        if (i === act.length) { bestC = acc; best = pick.slice(); return }
        for (const cd of act[i].cands) {
          let c = acc + cd.c
          for (let m = 0; m < i; m++) {
            const q = pick[m]
            const ox = Math.min(cd.x + cd.w, q.x + q.w) - Math.max(cd.x, q.x) + 6
            const oy = Math.min(cd.y + cd.h, q.y + q.h) - Math.max(cd.y, q.y) + 6
            if (ox > 0 && oy > 0) c += 3000 + (ox * oy) / 10
            // labels sharing a column keep their tips' order (the higher tip has the higher label)
            const dty = act[i].ty - act[m].ty
            if (ox > -40 && Math.abs(dty) > 4 && (cd.y - q.y) * dty < 0) c += 300
          }
          pick[i] = cd
          walk(i + 1, c)
        }
      }
      walk(0, 0)
      act.forEach((a, i) => {
        const cd = best[i]
        prevK[a.k] = cd.j
        const gx = cd.x - a.tx, gy = cd.y - a.ty
        let s = cur[a.k]
        if (!s) s = cur[a.k] = { x: gx, y: gy, vx: 0, vy: 0 }
        else for (let u = 0; u < sub; u++) {
          s.vx += (w0 * w0 * (gx - s.x) - 2 * w0 * s.vx) * dt; s.x += s.vx * dt
          s.vy += (w0 * w0 * (gy - s.y) - 2 * w0 * s.vy) * dt; s.y += s.vy * dt
        }
        // mid-glide, a label never slides across a tip: it hops to the side its spot is on
        const lx = clamp(a.tx + s.x, xl, xr - cd.w)
        for (const tp of tipXY) {
          if (!tp) continue
          const ly = clamp(a.ty + s.y, 0, YB - cd.h)
          if (tp[0] > lx - 18 && tp[0] < lx + cd.w + 18 && tp[1] > ly - 18 && tp[1] < ly + cd.h + 18) {
            const up = tp[1] - 19 - cd.h, down = tp[1] + 19
            const okUp = up >= 0, okDown = down <= YB - cd.h
            const wantUp = cd.y + cd.h / 2 < tp[1]
            s.y = ((wantUp && okUp) || !okDown ? up : down) - a.ty
            s.vy = 0
          }
        }
        off[a.k][f * 2] = s.x; off[a.k][f * 2 + 1] = s.y
      })
    }
    return { fps, t0, n, off, xl, xr }
  })()
  // labels caught mid-glide may touch: push them apart vertically, inside the plot
  function separate(items, YB) {
    items.sort((a, b) => a.y - b.y || a.tp.o.sr.i - b.tp.o.sr.i)
    for (let pass = 0; pass < 4; pass++) {
      let moved = false
      for (let i = 0; i < items.length; i++) for (let j = i + 1; j < items.length; j++) {
        const a = items[i], b = items[j]
        if (!(a.x < b.x + b.w + 4 && b.x < a.x + a.w + 4 && a.y < b.y + b.h + 4 && b.y < a.y + a.h + 4)) continue
        const need = a.y + a.h + 4 - b.y
        const up = Math.min(need / 2, a.y)
        a.y -= up; b.y += need - up
        if (b.y + b.h > YB) { const o = b.y + b.h - YB; b.y -= o; a.y = Math.max(0, a.y - o) }
        moved = true
      }
      if (!moved) break
    }
  }

  return {
    duration,
    layout: L,
    seek(t) {
      const x = xAt(t)
      const ymax = Y.log ? logMax : yMaxAt(t)
      const ph = phAt(t), YBt = ph - 4
      const py = pyFor(ymax, ph)
      const done = t >= R1
      // ---- the plot box (compresses before a boxed verdict) ----
      attr(baseLine, 'y1', ph.toFixed(1)); attr(baseLine, 'y2', ph.toFixed(1))
      for (const tk of xTicks) style(tk.lab, { top: (ph + 12).toFixed(1) + 'px' })
      for (const lt of logTicks) {
        const yy = py(lt.v)
        attr(lt.g.line, 'y1', yy.toFixed(1)); attr(lt.g.line, 'y2', yy.toFixed(1))
        style(lt.g.lab, { top: (yy - 15).toFixed(1) + 'px' })
      }

      // ---- y grid (linear: rescales with the race) ----
      if (!Y.log) {
        const step = niceStep(ymax - Y.min, 4)
        grid.forEach((g, k) => {
          const v = Y.min + step * (k + 1)
          const on = v < ymax * 0.97
          attr(g.line, 'opacity', on ? '1' : '0')
          style(g.lab, { display: on ? 'block' : 'none' })
          if (!on) return
          const yy = py(v)
          attr(g.line, 'y1', yy.toFixed(1)); attr(g.line, 'y2', yy.toFixed(1))
          setText(g.lab, axisText(v, Y.prefix))
          style(g.lab, { top: (yy - 15).toFixed(1) + 'px' })
        })
      }
      for (const tk of xTicks) style(tk.lab, { opacity: tk.xv <= x + 1e-6 ? '1' : '0.4' })
      yearOdo.set(yearV(x), yearTpl)

      // ---- events ----
      for (const ev of evEls) {
        const on = t >= ev.e.t
        const retired = t >= ev.retire
        attr(ev.rule, 'y2', (ph * ease.out(prog(t, ev.e.t, 0.22))).toFixed(1))
        if (ev.band) attr(ev.band, 'height', ph.toFixed(1))
        attr(ev.rule, 'opacity', on ? (retired ? '0.4' : '0.85') : '0')
        if (ev.band) {
          const x1 = Math.min(x, ev.e.until)
          attr(ev.band, 'x', pxOf(ev.e.x).toFixed(1))
          attr(ev.band, 'width', Math.max(0, pxOf(x1) - pxOf(ev.e.x)).toFixed(1))
          attr(ev.band, 'opacity', on ? '0.2' : '0')
        }
        if (ev.lab) {
          if (!on || retired) { style(ev.lab, { display: 'none' }); continue }
          const k = slam(t, ev.e.t, { from: 1.08 })
          style(ev.lab, { display: 'block', opacity: k.o.toFixed(3), transform: `scale(${k.s.toFixed(4)})` })
        }
      }

      // ---- lines + tips ----
      const tips = S.map(o => {
        const pts = []
        for (const p of o.sr.points) { if (p[0] > x + 1e-9) break; pts.push(p) }
        const started = pts.length > 0
        const vx = vAt(o.sr, x)
        const tx = pxOf(x), ty = py(vx)
        let dd = ''
        const poly = []
        pts.forEach((p, k) => { const X1 = pxOf(p[0]), Y1 = py(p[1]); poly.push(X1, Y1); dd += (k ? 'L' : 'M') + X1.toFixed(1) + ' ' + Y1.toFixed(1) })
        poly.push(tx, ty)
        dd += (pts.length ? 'L' : 'M') + tx.toFixed(1) + ' ' + ty.toFixed(1)
        attr(o.path, 'd', started ? dd : 'M0 0')
        attr(o.glow, 'd', started ? dd : 'M0 0')
        const win = o.sr === winner ? flashAt(t, TW, 0.9) : 0
        for (const c of [o.halo, o.dot, o.core]) { attr(c, 'cx', tx.toFixed(1)); attr(c, 'cy', ty.toFixed(1)); attr(c, 'visibility', started ? 'visible' : 'hidden') }
        attr(o.halo, 'r', (26 + 48 * win).toFixed(1))
        attr(o.halo, 'opacity', (0.28 + 0.18 * win).toFixed(3))
        const c = counter(o.sr, t, x)
        showOn(o.odo, c)
        style(o.lab, { display: started ? 'flex' : 'none' })
        return { o, tx, ty, started, c, poly: started ? poly : [] }
      })

      // ---- tip labels: the precomputed, smoothed offset from the tip (see place()), clamped, pushed apart ----
      const fr = clamp((t - PL.t0) * PL.fps, 0, PL.n - 1)
      const f0 = Math.floor(fr), f1 = Math.min(PL.n - 1, f0 + 1), fa = fr - f0
      const items = []
      tips.forEach((tp, k) => {
        if (!tp.started) return
        const tab = PL.off[k]
        const dx = lerp(tab[f0 * 2], tab[f1 * 2], fa), dy = lerp(tab[f0 * 2 + 1], tab[f1 * 2 + 1], fa)
        const sz = sizeOf(tp.o, tp.c)
        items.push({ tp, w: sz.w, h: sz.h, x: Math.max(68 - P.x, clamp(tp.tx + dx, PL.xl, PL.xr - sz.w)), y: clamp(tp.ty + dy, 0, YBt - sz.h) })
      })
      separate(items, YBt)
      const rects = []
      const lb = bump(t, TF, { amp: 0.08, dur: 0.4 })
      for (const it of items) {
        const right = it.x + it.w / 2 > it.tp.tx            // scale away from the tip, never over it
        style(it.tp.o.lab, {
          left: it.x.toFixed(1) + 'px', top: it.y.toFixed(1) + 'px',
          transformOrigin: right ? '0% 60%' : '100% 60%', ...(it.tp.o.two ? { alignItems: right ? 'flex-start' : 'flex-end', textAlign: right ? 'left' : 'right' } : {}),
          transform: lb !== 1 ? `scale(${lb.toFixed(4)})` : 'none',
        })
        rects.push({ x: it.x, y: it.y, w: it.w, h: it.h })
      }
      for (const tk of xTicks) {
        const r = { x: pxOf(tk.xv) - tk.w / 2 - 6, y: ph + 8, w: tk.w + 12, h: 38 }
        style(tk.lab, { visibility: rects.some(q => hit(q, r)) ? 'hidden' : 'visible' })
      }
      // the clock dims while a line or a tip label runs through it (a pure function of this frame's geometry)
      {
        const yr = yearRect
        let ink = 0
        for (const tp of tips) {
          const a = tp.poly
          for (let i = 2; i < a.length; i += 2) ink += clipLen(a[i - 2], a[i - 1], a[i], a[i + 1], yr.x, yr.y, yr.x + yr.w, yr.y + yr.h)
        }
        for (const q of rects) {
          const ox = Math.min(q.x + q.w, yr.x + yr.w) - Math.max(q.x, yr.x), oy = Math.min(q.y + q.h, yr.y + yr.h) - Math.max(q.y, yr.y)
          if (ox > 0 && oy > 0) ink += (ox * oy) / 40
        }
        style(yearBox, { opacity: (1 - 0.6 * clamp(ink / 160)).toFixed(3) })
      }

      // ---- stake line: its label gives way to tip labels and the clock ----
      if (stakeLine) {
        const sy = py(stakeV)
        attr(stakeLine, 'y1', sy.toFixed(1)); attr(stakeLine, 'y2', sy.toFixed(1))
        if (stakeLab) {
          const sw = stakeLab.__w
          const r = { x: P.w - 6 - sw, y: sy - 42, w: sw, h: 32 }
          // it also gives way while a line runs within 24 px of it (a line crossing "$10,000" reads as a strike-through)
          let near = false
          for (const tp of tips) {
            const a = tp.poly
            for (let i = 2; i < a.length && !near; i += 2) near = clipLen(a[i - 2], a[i - 1], a[i], a[i + 1], r.x - 24, r.y - 24, r.x + r.w + 24, r.y + r.h + 24) > 0
          }
          const hidden = sy < 46 || near || rects.some(q => hit(q, r)) || hit(yearRect, r)
          style(stakeLab, { left: r.x.toFixed(1) + 'px', top: r.y.toFixed(1) + 'px', display: hidden ? 'none' : 'block' })
        }
      }

      // ---- hero: stake → leader (hard cut on a pass) → the winner's final ----
      let hsr = null, c
      if (done) { hsr = heroAfter(t) || leaderAt(t); c = counter(hsr, t, x) }
      else if (stakeMode && t <= R0) c = stakeTok ? { disp: stakeTok } : { v: starts[0], tpl: tplAt(starts[0]) }
      else { hsr = leaderAt(t); c = counter(hsr, t, x) }
      showOn(hero, c)
      const hcol = hsr ? hsr.color : C.green
      style(hero.odo.el, { color: hcol })
      style(hero.glow, { filter: glowFor(hcol) })
      for (const [sr, tg] of tags) style(tg.el, { display: sr === hsr ? 'flex' : 'none' })
      const tg = hsr ? tags.get(hsr) : null
      const space = tg ? tg.w + TAGGAP : 0
      style(hero.glow, { paddingLeft: space + 'px' })
      if (tg) style(tg.el, { left: (L.hero.w / 2 - (hero.odo.el.offsetWidth + space) / 2).toFixed(1) + 'px' })
      let sc = 1, glow = 0, fl = 0
      for (const sg of changes) {
        sc *= bump(t, sg.t, { amp: 0.06 })
        if (t >= sg.t) glow = Math.max(glow, 0.5 * (1 - ease.out(prog(t, sg.t, 0.5))))
        fl = Math.max(fl, 0.14 * flashAt(t, sg.t, 0.45))
      }
      // each final lands in the hero: the winner's is the climax, an earlier (staggered) reveal a smaller land
      for (const r of heroOrder) {
        const tl = landT(r), top = r === winner
        if (!top && Math.abs(tl - TW) < 1e-6) continue        // lands with the winner: one land, the climax
        sc *= bump(t, tl, { amp: top ? 0.13 : 0.08, dur: 0.5 })
        if (t >= tl) glow = Math.max(glow, (top ? 1 : 0.5) * (1 - ease.out(prog(t, tl, top ? 1.1 : 0.6))))
        fl = Math.max(fl, (top ? 0.5 : 0.18) * flashAt(t, tl, top ? 0.9 : 0.5))
      }
      style(hero.el, { transform: `scale(${sc.toFixed(4)})` })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })
      flash.set(fl)

      // ---- label stack (captions off) ----
      if (labels) {
        let ch = chapters[0]
        for (const c2 of chapters) if (t >= c2.t) ch = c2
        labels.seek(t, ch.idx, ch.t)
      }

      // (the verdict, the label stack's yield and the footer steps are the chrome's)
    },
  }
}
