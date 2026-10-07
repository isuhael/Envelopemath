// Scoreboard: chart-race — same-stake line-chart race (P4). ChartOrbit's mechanic, played as a live scoreboard.
//
// The same stake goes into 2 (max 3) named rivals on the same date; one continuous race, no cuts:
//   - the stage is a neon line race: glowing lines and tips, a live counter at every tip ("GOLD $58,204", fixed
//     digit slots so nothing jitters), an auto-rescaling y axis (dim, in the left margin), a dashed stake line
//     ("below the line = losing money"), and the year as a big rolling scoreboard clock in the plot's corner
//   - tip labels ride beside their tips and never sit on a tip or another label: their spot is planned at mount,
//     frame by frame (right of the tip = the empty future first, then above/below/left, scored on line ink under
//     the label, tip order and attribution), glides on a spring when it changes, and sits on a soft stage-colour
//     plate so a line that must pass behind a label is knocked out. Long names stack name over value.
//   - the hero odometer in the top bar is the score: the leader's live value in the leader's colour, with the
//     leader's name beside it. A lead change is a hard cut (tag + colour), a bump and a swipe
//   - event flags: a red dashed rule wipes down the plot (a 20% band with `until`) and the flag label slams into
//     the strip above the plot (captions on). Captions off (ChartOrbit's voice-free grammar): the flag text is a
//     hard cut in the bottom-bar label stack instead (HD Guy: the label stack is the caption)
//   - the finish: the lines stop at raceT[1]; the counters roll their last digits (running format) and, SETTLE s
//     later, land exactly on each series' `final` display string: hero bump, glow flare, floor bloom, the winner's
//     tip flares (a riser leads in, then hit + cash); the label stack reads FINAL
//   - the verdict slams into the bottom bar (with captions on: into the caption band once the VO has ended; if VO
//     runs past verdict.t it sits on a black band over the foot of the chart instead)
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
//   footerSteps  [{ t, text }]: the footer rewrites to a one-line working at each t (spec.footer before the first)
//   flags        'chart' (labels above the plot) | 'labels' (label stack); default: chart with captions, else labels
//   yearSize     px of the corner clock (default 176); yearPrefix for a non-calendar x (default "YEAR ")
//   stageBottom  y where the stage ends (default 1300 with captions, 1240 without)
import { h, s, css as style, setText, attr, prog, ease, clamp, lerp, fitText, fmtNum } from '../../../runtime/core.js'
import { C, SIZE, M, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, heroRow, labelStack, stageFlash, flashAt, parseDisplay, displayValue, odometer, bump, slam,
  durationOf, toneColor, verdict, valueAt,
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
.cr-foot { position: absolute; font: 600 40px/1.2 'Inter', 'Inter Full', sans-serif; color: #9AA4B2; text-align: center; white-space: nowrap; }
.cr-foot em { font-style: normal; color: #FFFFFF; }
.cr-vs { color: #9AA4B2; }
.cr-vband { position: absolute; left: 0; width: 1080px; background: #000; box-shadow: inset 0 2px 0 #1E2530; }
`

const SETTLE = 0.45    // s: once the lines stop, tips and hero roll their last digits, then land on `final`
const TAGGAP = 26      // px between the hero tag and the number
const LEAD = 1.004     // a challenger must lead by 0.4% to take the hero (no flicker on near-ties)
const K = 1.2          // the y axis keeps the running max at 1/K of the plot height

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
    return Math.max(yFloor, (acc / 6) * K)
  }
  const pos = allVals.filter(v => v > 0)
  const logMin = Y.min > 0 ? +Y.min : (pos.length ? Math.min(...pos) : 1) * 0.8
  const logMax = Y.max != null ? +Y.max : allMax * 1.3
  const pyFor = ymax => (Y.log
    ? v => P.h - ((Math.log10(Math.max(v, logMin)) - Math.log10(logMin)) / (Math.log10(logMax) - Math.log10(logMin))) * P.h
    : v => P.h - ((v - Y.min) / (ymax - Y.min)) * P.h)

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

  // the clock: a big rolling year in the plot's bottom-right corner, behind the lines (decoration: the x axis and
  // the VO carry the year too). Bottom-right is where a race's lines go last.
  const YS = +lo.yearSize || 176
  const yearBox = h('div', { class: 'cr-year', 'data-deco': '' })
  root.append(yearBox)
  const yearOdo = odometer(yearBox, { size: YS, color: 'rgba(255, 255, 255, 0.15)', maxInt: calendar ? 4 : 3, maxDp: 0 })
  const yearTpl = { prefix: calendar ? '' : (lo.yearPrefix ?? 'YEAR '), suffix: '', dp: 0, group: false, scale: 1, value: 0 }
  style(yearBox, { right: '4px', bottom: Math.round(-0.11 * YS + 6) + 'px' })
  const rollF = clamp(0.24 / Math.max(1e-6, secPerYear), 0.04, 0.4)    // the year digits roll in ~0.24 s
  const yearV = x => {
    const y = Math.floor(x + 1e-6)
    if (y <= Math.floor(X.from + 1e-6)) return y
    return y - 1 + clamp((x - y) / rollF)
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
  gGrid.append(s('line', { x1: 0, x2: P.w, y1: P.h, y2: P.h, stroke: '#2A3340', 'stroke-width': 3 }))
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
    if (stakeTok) { stakeLab = h('div', { class: 'cr-stake', 'data-deco': '' }, stakeTok); root.append(stakeLab) }
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
    evEls.forEach((ev, k) => {
      if (!ev.lab) return
      for (let j = k + 1; j < evEls.length; j++) {
        const o = evEls[j]
        if (o.lab && o.left < ev.left + ev.w + 28 && o.left + o.w + 28 > ev.left) { ev.retire = o.e.t; break }
      }
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
  // a label wider than 60% of the plot (long names) stacks its name over its value
  for (const o of S) {
    let wmax = 0
    const mx = Math.max(...o.sr.points.map(p => p[1]))
    for (const show of [() => o.odo.set(snapT(mx, tplAt(mx)), tplAt(mx)), () => o.sr.final && o.odo.show(o.sr.final)]) {
      show()
      wmax = Math.max(wmax, o.lab.offsetWidth)
    }
    o.two = wmax > P.w * 0.6
    if (o.two) o.lab.classList.add('two')
  }

  // ---------- hero: the stake on frame 1, then the leader's live value with the leader's name ----------
  const hero = heroRow(stage, L, { size: SIZE.hero, maxDp: 2 })
  const tags = new Map()
  for (const sr of racers) {
    const el = h('div', { class: 'cr-tag', html: richUI(nameOf(sr)), style: { color: sr.color } })
    stage.append(el)
    const w1 = Math.ceil(el.offsetWidth) + 2
    const two = w1 > 300
    const tw = Math.min(300, w1)
    hero.el.append(el)
    style(el, { height: L.hero.h + 'px', width: tw + 'px', whiteSpace: two ? 'normal' : 'nowrap', textWrap: 'balance', display: 'flex' })
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
    if (f < 1) style(hero.odo.el, { fontSize: Math.floor(SIZE.hero * Math.max(0.45, f)) + 'px' })
  }

  // ---------- label stack (captions off): the matchup, then each event as a hard cut, then FINAL ----------
  let labels = null
  const chapters = []
  if (stackMode) {
    const l1 = d.stake ? rich(d.stake) : ''
    const vs = racers.map(sr => `<span style="color:${sr.color}">${rich(nameOf(sr))}</span>`).join(' <span class="cr-vs">VS</span> ')
    const items = [{ l1, l2: vs }]
    chapters.push({ t: 0, idx: 0 })
    for (const e of events) {
      if (!e.label) continue
      chapters.push({ t: e.t, idx: items.length })
      items.push({ l1, l2: rich(e.label), l2Color: e.tone === 'neutral' ? C.white : e.col })
    }
    chapters.push({ t: TF, idx: items.length })
    items.push({ l1, l2: 'FINAL' })
    labels = labelStack(stage, L, items)
  }

  // ---------- verdict: the bottom bar's closing line ----------
  let verd = null, vBand = null, vBandY = 0
  if (spec.verdict && spec.verdict.text) {
    const vt = Math.max(0, +spec.verdict.t || 0)
    const vo = spec.vo || []
    const voLate = capsOn && vo.some((v, i) => {
      const end = v.d != null ? v.t + v.d : vo[i + 1] ? vo[i + 1].t : Infinity
      return end + 0.15 > vt + 0.06          // the last caption is gone before the verdict text shows
    })
    let slot
    if (!capsOn) slot = { ...L.verdict, boxed: false }
    else if (!voLate) slot = { y: 1304, h: 172, w: 800, boxed: false }        // the caption band is free by then
    else {
      // VO still running: a black band rises over the foot of the chart and carries the verdict
      slot = { y: L.stage.y + L.stage.h - 200, h: 196, w: 800, boxed: false }
      vBandY = slot.y - 8
      vBand = h('div', { class: 'cr-vband', 'data-deco': '', style: { top: vBandY + 'px', height: L.stage.y + L.stage.h - vBandY + 'px', display: 'none' } })
      stage.append(vBand)
    }
    verd = verdict(stage, spec, { ...L, verdict: slot })
    if (verd) {
      // lib's verdict() fits its text while hidden (it measures 0): fit again here with the box measurable
      const vbox = [...stage.querySelectorAll('.sb-verdict')].pop()
      const vtxt = vbox && vbox.querySelector('.sb-verdict-text')
      if (vtxt) {
        vbox.style.display = 'flex'
        vbox.style.gap = '12px'
        fitText(vtxt, slot.w, { maxH: slot.h - 8 - 12 - 6, minPx: SIZE.verdictMin })
        vbox.style.display = ''
      }
    }
  }

  // ---------- footer steps (lookOpts.footerSteps): the working line rewrites at each beat ----------
  let foot = null
  if (Array.isArray(lo.footerSteps) && lo.footerSteps.length) {
    const fw = L.footer.w
    const mk = text => {
      const el = h('div', { class: 'cr-foot', html: richUI(text), style: { top: L.footer.y + 'px', left: (1080 - fw) / 2 + 'px', width: fw + 'px' } })
      stage.append(el)
      fitText(el, fw, { maxH: L.footer.h + 4, minPx: 34 })
      style(el, { display: 'none' })
      return el
    }
    foot = {
      base: spec.footer ? mk(spec.footer) : null,
      steps: lo.footerSteps.filter(x => x && x.text).map(x => ({ t: +x.t || 0, el: mk(x.text) })).sort((a, b) => a.t - b.t),
    }
  }

  // ---------- sound: whoosh at the start, a tick per flag (thud per label cut), swipe on a pass, riser → hit ----------
  const cue = (t, kind, o) => { if (t >= 0) ctx.cue(t, kind, o) }
  if (R0 > 0.05) cue(R0, 'whoosh', { dur: 0.6, gain: 0.5 })
  for (const e of events) cue(e.t, stackMode && e.label ? 'thud' : 'tick', { gain: stackMode && e.label ? 0.65 : 0.55 })
  for (const sg of changes) cue(sg.t, 'swipe', { gain: 0.45 })
  const riseDur = Math.min(2.4, (R1 - R0) * 0.2)
  if (riseDur > 0.6) cue(TF - riseDur, 'riser', { dur: riseDur, gain: 0.4 })
  cue(TF, 'hit', { gain: 0.85 })
  cue(TF + 0.06, 'cash', { gain: 0.5 })
  if (verd) cue(verd.t + 0.06, 'reveal', { gain: 0.7 })

  const duration = durationOf(spec, TF, d.hold ?? M.hold)
  const yearRect = { x: 0, y: 0, w: 0, h: 0 }
  {
    yearOdo.set(Math.floor(X.to + 1e-6), yearTpl)
    yearRect.w = yearBox.offsetWidth; yearRect.h = YS * 0.9
    yearRect.x = P.w - 4 - yearRect.w; yearRect.y = P.h - 6 - YS * 0.86
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
  const YB = P.h + 50                    // labels may drop into the x-tick strip (the ticks step aside)
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
    const t0 = Math.min(0, R0), t1 = TF + 0.25
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
      const py = pyFor(Y.log ? logMax : yMaxAt(t))
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
  function separate(items) {
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
    footer: foot ? false : undefined,
    verdict: false,
    seek(t) {
      const x = xAt(t)
      const ymax = Y.log ? logMax : yMaxAt(t)
      const py = pyFor(ymax)
      const done = t >= R1

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
        attr(ev.rule, 'y2', (P.h * ease.out(prog(t, ev.e.t, 0.22))).toFixed(1))
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
        pts.forEach((p, k) => { dd += (k ? 'L' : 'M') + pxOf(p[0]).toFixed(1) + ' ' + py(p[1]).toFixed(1) })
        dd += (pts.length ? 'L' : 'M') + tx.toFixed(1) + ' ' + ty.toFixed(1)
        attr(o.path, 'd', started ? dd : 'M0 0')
        attr(o.glow, 'd', started ? dd : 'M0 0')
        const win = o.sr === winner ? flashAt(t, TF, 0.9) : 0
        for (const c of [o.halo, o.dot, o.core]) { attr(c, 'cx', tx.toFixed(1)); attr(c, 'cy', ty.toFixed(1)); attr(c, 'visibility', started ? 'visible' : 'hidden') }
        attr(o.halo, 'r', (26 + 48 * win).toFixed(1))
        attr(o.halo, 'opacity', (0.28 + 0.18 * win).toFixed(3))
        const c = counter(o.sr, t, x)
        showOn(o.odo, c)
        style(o.lab, { display: started ? 'flex' : 'none' })
        return { o, tx, ty, started, c }
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
        items.push({ tp, w: sz.w, h: sz.h, x: clamp(tp.tx + dx, PL.xl, PL.xr - sz.w), y: clamp(tp.ty + dy, 0, YB - sz.h) })
      })
      separate(items)
      const rects = []
      const lb = bump(t, TF, { amp: 0.08, dur: 0.4 })
      for (const it of items) {
        const right = it.x + it.w / 2 > it.tp.tx            // scale away from the tip, never over it
        style(it.tp.o.lab, {
          left: it.x.toFixed(1) + 'px', top: it.y.toFixed(1) + 'px',
          transformOrigin: right ? '0% 60%' : '100% 60%', ...(it.tp.o.two ? { alignItems: right ? 'flex-start' : 'flex-end' } : {}),
          transform: lb !== 1 ? `scale(${lb.toFixed(4)})` : 'none',
        })
        rects.push({ x: it.x, y: it.y, w: it.w, h: it.h })
      }
      for (const tk of xTicks) {
        const r = { x: pxOf(tk.xv) - tk.w / 2 - 6, y: P.h + 8, w: tk.w + 12, h: 38 }
        style(tk.lab, { visibility: rects.some(q => hit(q, r)) ? 'hidden' : 'visible' })
      }

      // ---- stake line: its label gives way to tip labels and the clock ----
      if (stakeLine) {
        const sy = py(stakeV)
        attr(stakeLine, 'y1', sy.toFixed(1)); attr(stakeLine, 'y2', sy.toFixed(1))
        if (stakeLab) {
          const sw = stakeLab.offsetWidth
          const r = { x: P.w - 6 - sw, y: sy - 42, w: sw, h: 32 }
          const hidden = sy < 46 || rects.some(q => hit(q, r)) || hit(yearRect, r)
          style(stakeLab, { left: r.x.toFixed(1) + 'px', top: r.y.toFixed(1) + 'px', display: hidden ? 'none' : 'block' })
        }
      }

      // ---- hero: stake → leader (hard cut on a pass) → the winner's final ----
      let hsr = null, c
      if (done) { hsr = winner; c = counter(winner, t, x) }
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
      sc *= bump(t, TF, { amp: 0.13, dur: 0.5 })
      if (t >= TF) glow = Math.max(glow, 1 - ease.out(prog(t, TF, 1.1)))
      fl = Math.max(fl, 0.5 * flashAt(t, TF, 0.9))
      style(hero.el, { transform: `scale(${sc.toFixed(4)})` })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })
      flash.set(fl)

      // ---- label stack (captions off) ----
      if (labels) {
        let ch = chapters[0]
        for (const c2 of chapters) if (t >= c2.t) ch = c2
        labels.seek(t, ch.idx, ch.t)
      }

      // ---- verdict ----
      if (verd) {
        verd.seek(t)
        const y = verd.yieldAt(t)
        if (labels) style(labels.el, { opacity: String(1 - y), transform: `translateY(${(14 * y).toFixed(1)}px)`, visibility: y >= 1 ? 'hidden' : 'visible' })
        if (vBand) {
          const p = ease.out(prog(t, verd.t - 0.12, 0.24))
          const top0 = L.stage.y + L.stage.h
          style(vBand, { display: t >= verd.t - 0.12 ? 'block' : 'none', top: lerp(top0, vBandY, p).toFixed(1) + 'px', height: (top0 - lerp(top0, vBandY, p)).toFixed(1) + 'px' })
        }
      }

      // ---- footer steps ----
      if (foot) {
        let cur = foot.base
        for (const st of foot.steps) if (t >= st.t) cur = st.el
        if (foot.base) style(foot.base, { display: cur === foot.base ? 'block' : 'none' })
        for (const st of foot.steps) style(st.el, { display: cur === st.el ? 'block' : 'none' })
      }
    },
  }
}
