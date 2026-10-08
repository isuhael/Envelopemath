// Scoreboard: what-difference — "What difference does X make?" (P5).
//
// One fixed debt (or pot of money) handled 2-4 ways, played as a scoreboard:
//   - the stage holds a leaderboard: one row per option, all named from frame 1 with "?" in the score slots, so the
//     viewer can guess before the maths arrives (the research's "summary grid at 0.0 s, then walked")
//   - each option is a hard cut: the label stack slams in (line 1: the payment in green, line 2: the option's name),
//     the row lights and a pointer jumps to it
//   - the row's time bar then races left to right at one shared speed and scale (a shorter bar is a sooner payoff),
//     the payoff rides the bar's end on a rolling odometer, and the hero odometer in the top bar rolls the money
//     metric (interest) on the same clock, from the previous option's landed score (so ≈ $587,200 rolls down to
//     ≈ $508,600 and the gap is the motion itself; up from zero for the first race). All three stop together: bump,
//     glow flare, a ding, and the money value is posted into the row
//   - the option's delta then slams into the label stack ("≈ $487 LESS") in the option's tone
//   - at verdict.t the winning row flashes neon (its bar turns solid green), the others dim, and the hero rolls to
//     the winner's money delta ("≈ $1,288 LESS", tagged with the hero metric's label): the payoff is the last number
//     to land in the top bar. A winner without a money delta rolls to its own value that the verdict quotes, if any,
//     else keeps its own value
// Frame 1 (first option at t ≥ 0.5 s): the stake in the hero ("$28,000"), its terms + label in the label stack,
// every option named on the board. First option before 0.5 s: frame 1 is already 0.45 s into the first race.
//
// Layout: the kit grid (captions on: stage ≈ 595-1130; the label stack and then the verdict take the slot above the
// caption band). Rows are two lines (name + money on top, time bar below) when there is room (≥ 90 px a row);
// otherwise one line (name, payoff, money) over a full-row time fill. On two-line rows the bar's label rides inside
// the bar's end when its landed label fits there (it waits at the track's start, the passing edge dimmed, until the end
// reaches it), else just past the end: the side is decided from the landed bar, never switched mid-race. The bar
// metric needs no column head on two-line
// rows (its value rides the bar's end: "60 MONTHS"); every other metric gets its own column, right-aligned and
// measured, with its head over it (a head may reach left over the next column's slack). At most two value columns
// (the hero's metric first): a third value metric is left off the board. A metric that can't be a bar (dates, words)
// is posted, not rolled. Names: one size per board: one line at >= 44 px; else the value columns give up a few px;
// else every row in two-line mode (>= 40 px) when the top line has the height; else "values below": the name gets the
// whole top line and the value columns move into the bar line (the bar track ends 24 px short of them). Running
// values (hero, cells, bar labels) show their "≈" as an unlit ghost until they land.
//
// data (FORMATS.md §3): { stake: { label, value, terms }, metrics: [{ key, label }], options: [{ t, name, detail,
//   values: { [key]: display }, delta?, tone?, resultT?, deltaT? }], winner, hold }
//   resultT (optional) pins when an option's race lands; deltaT (optional) when its delta slams in.
// lookOpts (all optional):
//   counter      metric key the hero rolls (default "interest", else the first money metric); "stake" keeps the
//                stake in the hero throughout (every row cell then rolls with its bar)
//   bar          metric key that drives the bars (default: the first metric whose displays are all durations,
//                "60 months" / "≈ 18.3 years" / "26 weeks", compared in months; else the first numeric metric)
//   intro        true / false forces the stake intro on or off (default: on when the first option starts ≥ 0.5 s)
//   race         seconds the longest bar takes (default 2.4); every bar moves at that one speed
//   footerSteps  [{ t, text }]: kit-wide (the chrome draws it): the footer rewrites to a working line at each t;
//                a line too long for 960 px at 40 px breaks at its " · " into two lines
//   stageBottom  y where the stage ends (default: the kit grid)
//   reads        [{ t } | t]: the VO speaks the number the hero is holding (e.g. the frame-1 score); at each t the hero
//                bumps (6%) and its glow flares, a smaller cousin of a landing, on a soft tick (ignored at t <= 0.05).
//                { t, option, metric? }: the VO speaks a number already posted in that option's row instead: that cell
//                (metric: default the hero's metric, else the first value column; the bar metric = the bar's label)
//                swells (up in 0.08 s, held 0.3 s, down in 0.25 s; 16%, less where the cell has less room) and glows
//                in its own colour for as long, on a soft tick, while the label stack steps back to 55%
//   keepSpeed    true: an option.resultT later than its race needs keeps the one shared bar speed (the bar waits, lit
//                but empty, and starts so it lands on resultT) instead of crawling from the cut to resultT
//   endTag       the hero's tag for the winner's payoff (default: the hero metric's label; false: no tag). A winner
//                whose delta is a duration ("≈ 10 years sooner") rolls the hero to it when the hero's metric is a
//                duration too, as a money delta does on a money hero
//   heroEnd      'value': the winner beat rolls the hero from the FIRST option's value of its metric (in that option's
//                colour) to the winner's own (turning to its colour as it rolls), tagged with the metric's label: the
//                gap between them is the motion, and the delta is left to the verdict, so the hero and the verdict
//                never say the same words (03b: ≈ 15.1 → ≈ 4.8 years under "≈ 10 years sooner")
//   labelSteps   [{ t, option, text, small? }]: the label stack slams a line 2 of its own while that option is active
//                (e.g. "40 months sooner" as the VO says it, before the delta slams); line 1 stays the option's detail.
//                small: true sets that line 2 one size down (x 0.88, >= 54 px), so the hero stays the focal number
//   firstName    false: the first option, already landed at frame 1 (no intro), shows only its line 1 (the payment) in
//                the label stack, so the frame-1 stack doesn't repeat lane 1's name under the hero
//   heads        false: no column heads over the board (the hero's tag already names its metric); the rows take the room
//   heroRoll     'from' (default) | 'zero': the hero rolls each race from the previous option's landed value (≈ $587,200
//                down to ≈ $508,600: the gap is the motion itself) or, 'zero', up from zero
// data.winnerT (optional): when the winner's payoff LANDS in the hero; the hero's roll to it and the board's winner beat
//   start 1.04 s before (not before verdict.t). Default: the winner beat at verdict.t, the payoff 1.04 s later
// The verdict and the footer are the chrome's (the kit's one verdict slot, at the foot of the frame).
import { css as style, setHTML, attr, h, s, prog, ease, clamp, lerp, fitText } from '../../../runtime/core.js'
import { C, SIZE, M, W, layoutFor } from '../theme.js'
import {
  rich, richUI, esc, ax, bare, inkWidth, heroRow, labelStack, stageFlash, flashAt, parseDisplay, displayValue, odometer,
  bump, slam, durationOf, beatTimes, toneColor,
} from '../lib.js'

export const css = `
.wd-head { position: absolute; font: 700 40px/1.1 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; color: #9AA4B2; white-space: nowrap; }
.wd-row { position: absolute; border-radius: 14px; background: #07090C; --lit: 0; --tone: #FFFFFF;
  border: 3px solid color-mix(in srgb, var(--tone) calc(var(--lit) * 100%), #232B36);
  box-shadow: 0 0 calc(var(--lit) * 34px) color-mix(in srgb, var(--tone) 50%, transparent); transform-origin: 50% 50%; }
.wd-track { position: absolute; left: 0; right: 0; bottom: 0; overflow: hidden; border-radius: 0 0 11px 11px; background: #10151C; }
.wd-row.one .wd-track { top: 0; border-radius: 11px; background: transparent; }
.wd-fill { position: absolute; left: 0; top: 0; bottom: 0; width: 0; }
.wd-edge { position: absolute; top: 0; bottom: 0; width: 6px; margin-left: -6px; }
.wd-name { position: absolute; display: flex; align-items: center; font-family: 'Anton', 'Inter Full', sans-serif; font-weight: 400; line-height: 1; text-transform: uppercase; letter-spacing: 0.01em; white-space: nowrap; }
.wd-name.two { white-space: normal; text-wrap: balance; }
.wd-cell { position: absolute; display: flex; align-items: center; justify-content: flex-end; text-transform: uppercase; transform-origin: 100% 55%; }
.wd-blab { position: absolute; top: 0; height: 100%; display: flex; align-items: center; text-transform: uppercase; }
.wd-cell .ax, .wd-blab .ax { font-size: 1em; top: -0.07em; }
.wd-name > span, .wd-tag > span { display: block; }   /* one flex child: the spaces around a hyphenated word survive */
.wd-txt { font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; white-space: nowrap; }
.wd-q { font-family: 'Anton', 'Inter Full', sans-serif; line-height: 1; color: #6B7584; }
.wd-ptr { position: absolute; }
.wd-tag { position: absolute; top: 0; display: flex; align-items: center; justify-content: flex-end; text-align: right; font: 700 42px/1.08 'Inter', 'Inter Full', sans-serif; text-transform: uppercase; letter-spacing: 0.04em; color: #9AA4B2; white-space: nowrap; }
`

const RACE = 2.4          // seconds the longest bar takes to run (all bars share one speed)
const CUT_TO_RACE = 0.35  // a cut lands (label slam, row lights) before its bar starts
const DELTA_AFTER = 0.55  // a delta slams this long after its race lands
const DEEP = { red: '#4A1119', green: '#0B3D24', white: '#2A313C' }

// a duration display ("60 months", "≈ 18.3 years", "26 weeks") in months; NaN if it is not a duration
function monthsOf(disp) {
  const p = parseDisplay(disp == null ? '' : String(disp))
  if (!isFinite(p.value)) return NaN
  const u = p.suffix.toLowerCase()
  const f = /\byears?\b|\byrs?\b/.test(u) ? 12 : /\bmonths?\b|\bmos?\b/.test(u) ? 1 : /\bweeks?\b|\bwks?\b/.test(u) ? 12 / 52 : /\bdays?\b/.test(u) ? 12 / 365 : NaN
  return p.value * p.scale * f
}
const isMoney = disp => /\$/.test(String(disp || ''))
// a calendar date ("Oct 2031", "6/1/28", "2031") is not a quantity: it never rolls and never drives a bar
const MONTH_RE = /\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?(?=[\s\d'’,]|$)/i
const dateLike = disp => { const x = String(disp || ''); return MONTH_RE.test(x) || /\d+\/\d+/.test(x) || (/\b(19|20)\d{2}\b/.test(x) && !/\$/.test(x) && !isFinite(monthsOf(x))) }
// cumulative interest on an amortising loan is front-loaded: the hero rolls on this concave curve
const accrue = p => 1 - Math.pow(1 - clamp(p), 1.7)
const rgba = (hex, a) => { const x = parseInt(hex.slice(1), 16); return `rgba(${x >> 16}, ${(x >> 8) & 255}, ${x & 255}, ${a})` }
const mixHex = (a, b, p) => {
  const x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16), q = clamp(p)
  const ch = sh => Math.round(((x >> sh) & 255) + (((y >> sh) & 255) - ((x >> sh) & 255)) * q)
  return '#' + ((1 << 24) + (ch(16) << 16) + (ch(8) << 8) + ch(0)).toString(16).slice(1)
}

export default function whatDifference(spec, ctx) {
  const d = spec.data || {}
  const lo = spec.lookOpts || {}
  const opts = (d.options || []).filter(o => o && o.name != null)
  if (!opts.length) throw new Error('what-difference: data.options is empty')
  const n = opts.length
  const L = layoutFor(spec, lo.stageBottom ? { stageBottom: +lo.stageBottom } : {})
  const stage = ctx.stage
  const stake = { label: '', value: '', terms: '', ...(d.stake || {}) }
  const metrics = d.metrics && d.metrics.length ? d.metrics : Object.keys(opts[0].values || {}).map(k => ({ key: k, label: k }))
  const val = (o, k) => (o.values && o.values[k] != null ? String(o.values[k]) : '')
  const winner = d.winner != null && d.winner >= 0 && d.winner < n ? d.winner : -1

  // ---------- roles: which metric drives the bars, which one the hero rolls ----------
  const barKey = (lo.bar && metrics.some(m => m.key === lo.bar) ? lo.bar : null)
    || (metrics.find(m => opts.every(o => isFinite(monthsOf(val(o, m.key))))) || {}).key
    || (metrics.find(m => opts.every(o => isFinite(displayValue(val(o, m.key))) && !dateLike(val(o, m.key)))) || {}).key
    || null
  const barLen = o => { if (!barKey) return 0; const m = monthsOf(val(o, barKey)); return isFinite(m) ? m : displayValue(val(o, barKey)) || 0 }
  const maxLen = Math.max(1e-9, ...opts.map(barLen))
  let heroKey = null
  if (lo.counter !== 'stake') {
    heroKey = (lo.counter && metrics.some(m => m.key === lo.counter) ? lo.counter : null)
      || (metrics.some(m => m.key === 'interest' && m.key !== barKey) ? 'interest' : null)
      || (metrics.find(m => m.key !== barKey && opts.some(o => isMoney(val(o, m.key)))) || {}).key
      || null
  }
  const heroMetric = metrics.find(m => m.key === heroKey) || null
  const barMetric = metrics.find(m => m.key === barKey) || null
  // value columns at the row's right: at most two, the hero's metric first in priority, kept in spec order
  let sideMetrics = metrics.filter(m => m.key !== barKey)
  if (sideMetrics.length > 2) {
    const keep = new Set([heroKey, ...sideMetrics.map(m => m.key)].filter(Boolean).slice(0, 2))
    sideMetrics = sideMetrics.filter(m => keep.has(m.key))
  }

  // ---------- timing ----------
  const times = beatTimes(opts, { first: 1.6, every: 5.4 })
  const intro = lo.intro === true || (lo.intro !== false && times[0] >= 0.5)
  const raceMax = lo.race || RACE
  const beats = opts.map((o, i) => {
    const first = i === 0 && !intro
    const cut = first ? Math.min(times[0], 0) : times[i]
    let start = first ? cut - 0.45 : cut + CUT_TO_RACE          // no intro: frame 1 is already 0.45 s into the race
    let dur = barKey ? clamp(raceMax * (barLen(o) / maxLen), 0.7, raceMax) : Math.min(raceMax, 1.4)
    const next = i + 1 < n ? times[i + 1] : Infinity
    dur = Math.min(dur, Math.max(0.5, next - start - 1.0))
    let land = start + dur
    if (o.resultT != null && o.resultT > start + 0.2) {
      // keepSpeed: a late resultT keeps the shared speed (the race starts late); else the race stretches to it
      if (lo.keepSpeed === true && +o.resultT - dur > start) start = +o.resultT - dur
      land = +o.resultT; dur = land - start
    }
    const deltaT = o.delta ? (o.deltaT != null ? +o.deltaT : land + DELTA_AFTER) : null
    return { cut, start, dur, land, deltaT }
  })
  const lastBeat = Math.max(...beats.map(b => Math.max(b.land, b.deltaT || 0)))
  const vT = spec.verdict && spec.verdict.text && spec.verdict.t != null ? Math.max(0, +spec.verdict.t) : null
  let winT = winner >= 0 ? (vT != null ? vT : lastBeat + 0.9) : null      // (data.winnerT: see the end roll below)

  // ---------- tones ----------
  const toneOf = o => o.tone || 'neutral'
  const moneyCol = o => (toneOf(o) === 'bad' ? C.red : C.green)
  const barKind = o => { const tn = toneOf(o); return tn === 'bad' ? 'red' : tn === 'good' || tn === 'goal' ? 'green' : 'white' }
  const bright = { red: C.red, green: C.green, white: C.white }
  const cellCol = (o, disp) => (isMoney(disp) ? moneyCol(o) : C.white)

  // ---------- stage geometry ----------
  const box = { x: L.inner.x, y: L.stage.y + 12, w: L.inner.w, h: L.stage.h - 24 }
  const showHeads = lo.heads !== false
  const headH = showHeads ? 44 : 0, headGap = showHeads ? 6 : 0
  const gap = n >= 4 ? 10 : 12
  const rowsY = box.y + headH + headGap
  const fitH = Math.floor((box.y + box.h - rowsY - gap * (n - 1)) / n)
  const rowH = Math.min(n <= 2 ? 156 : 136, fitH)
  const two = !!barKey && rowH >= 90                                // two-line rows (name + money / time bar)
  const rowsH = rowH * n + gap * (n - 1)
  const rowsTop = rowsY + Math.max(0, Math.floor((box.y + box.h - rowsY - rowsH) / 2))
  const rowY = i => rowsTop + i * (rowH + gap)
  const PAD = 22, COLGAP = 30, BORDER = 3
  const innerW = box.w - 2 * BORDER, innerH = rowH - 2 * BORDER
  const barH = two ? clamp(Math.round(innerH * 0.45), 42, 62) : innerH
  const topH = two ? innerH - barH : innerH
  let fs = two ? clamp(Math.round(topH * 0.8), 40, 64) : clamp(Math.round(rowH * 0.5), 40, 64)   // row text (Anton)
  const barFs = two ? clamp(Math.round(barH * 0.86), 42, 54) : fs
  const TOPPAD = two ? 4 : 0

  // ---------- board: rows ----------
  const rows = opts.map((o, i) => {
    const el = h('div', { class: 'wd-row' + (two ? '' : ' one'), style: { left: box.x + 'px', top: rowY(i) + 'px', width: box.w + 'px', height: rowH + 'px' } })
    const track = h('div', { class: 'wd-track', 'data-deco': '', style: { height: two ? barH + 'px' : 'auto' } })
    const kind = barKind(o)
    const fill = h('div', { class: 'wd-fill', style: { background: DEEP[kind] } })
    const edge = h('div', { class: 'wd-edge', style: { backgroundImage: `linear-gradient(${bright[kind]}, ${bright[kind]})` } })
    track.append(fill, edge)
    // the name sits in ONE inner span: as direct flex children, a hyphenated word's nowrap span and the text after
    // it would become separate flex items and the space between them would collapse ("30-YEARAT 6%")
    const name = h('div', { class: 'wd-name', html: `<span>${rich(o.name)}</span>`, style: { left: PAD + 'px', top: TOPPAD + 'px', height: topH - TOPPAD + 'px' } })
    el.append(track, name)
    // money / side columns (right of the top line, or of the single line)
    const cells = sideMetrics.map(m => {
      const disp = val(o, m.key)
      const cell = h('div', { class: 'wd-cell', style: { top: TOPPAD + 'px', height: topH - TOPPAD + 'px' } })
      const q = h('span', { class: 'wd-q' }, '?')
      const odo = odometer(cell, { size: fs, color: cellCol(o, disp), maxInt: 8, maxDp: 2 })
      cell.prepend(q)
      el.append(cell)
      const tpl = parseDisplay(disp)
      const ok = disp !== '' && isFinite(tpl.value)
      // a display without digits ("Never") is shown as plain Anton text
      const txt = !ok && disp ? h('span', { class: 'wd-txt', html: ax(esc(disp)), style: { color: cellCol(o, disp) } }) : null
      if (txt) cell.append(txt)
      return { m, disp, tpl, cell, q, odo, txt, ok, roll: ok && !dateLike(disp), posted: m.key === heroKey, from: 1.35 }
    })
    // the bar metric: rides the bar's end (two-line) or sits in its own column (one-line)
    let blab = null
    if (barMetric) {
      const disp = val(o, barKey)
      const wrap = h('div', { class: two ? 'wd-blab' : 'wd-cell', style: two ? {} : { top: TOPPAD + 'px', height: topH - TOPPAD + 'px' } })
      const q = h('span', { class: 'wd-q' }, '?')
      const odo = odometer(wrap, { size: barFs, color: C.white, maxInt: 8, maxDp: 2 })
      wrap.prepend(q)
      ;(two ? track.parentNode : el).append(wrap)
      const tpl = parseDisplay(disp)
      blab = { m: barMetric, disp, tpl, cell: wrap, q, odo, ok: disp !== '' && isFinite(tpl.value), from: 1.35 }
      if (two) { track.after(wrap); style(wrap, { top: (topH) + 'px', height: barH + 'px' }) }
    }
    stage.append(el)
    return { o, i, el, track, fill, edge, name, cells, blab, kind }
  })

  // ---------- column widths: from the widest landed display; names get what is left ----------
  // Names: one size for the board. One line at >= 44 px when every name fits; else every row in two-line mode
  // (balanced; a short name stays on one line) at one size >= 40 px when the top line has the height. Two-line rows
  // whose names still don't fit move the value columns down into the bar line ("values below"): the name gets the
  // whole top line and the bar track ends before the columns. Only then (cramped one-line rows) a name may go
  // under 44 px on one line (40 px floor).
  const lineCols = two ? sideMetrics : [...(barMetric ? [barMetric] : []), ...sideMetrics]
  const cellsOf = r => (two ? r.cells : [...(r.blab ? [r.blab] : []), ...r.cells])
  let colW = [], nameW = 0, below = false
  const cellFs = () => (below ? Math.min(fs, barFs) : fs)
  const measure = () => {
    const cf = cellFs()
    for (const r of rows) for (const c of cellsOf(r)) {
      style(c.odo.el, { fontSize: cf + 'px' }); style(c.q, { fontSize: cf + 'px' })
      if (c.txt) style(c.txt, { fontSize: cf + 'px' })
      if (c.ok) c.odo.show(c.disp)
    }
    const wOf = c => (c.ok ? c.odo.el.offsetWidth : c.txt ? c.txt.offsetWidth : 0)
    colW = lineCols.map((m, k) => Math.ceil(Math.max(cf * 0.5, ...rows.map(r => wOf(cellsOf(r)[k])))))
    nameW = below ? innerW - 2 * PAD : innerW - 2 * PAD - colW.reduce((a, b) => a + b, 0) - COLGAP * lineCols.length
  }
  measure()
  while (nameW < 260 && fs > 40) { fs -= 2; measure() }
  const nameFs = two ? clamp(Math.round(fs * 0.92), 44, 60) : clamp(Math.round(fs * 0.88), 44, 56)
  const h2 = () => (below ? topH : topH - TOPPAD) - 2
  // the largest size (step 1) at which a name fits nameW on one line (>= 44), or on two lines in h2 (>= 40)
  const fitOne = r => { r.name.classList.remove('two'); style(r.name, { fontSize: nameFs + 'px', width: nameW + 'px', height: 'auto' }); const px = fitText(r.name, nameW, { minPx: 44, step: 1 }); return r.name.scrollWidth <= nameW + 0.5 ? px : 0 }
  const fitTwo = r => {
    if (h2() < 2 * 40) return 0
    r.name.classList.add('two')
    style(r.name, { fontSize: nameFs + 'px', width: nameW + 'px', height: 'auto' })
    const px = fitText(r.name, nameW, { maxH: h2(), minPx: 40, step: 1 })
    return r.name.scrollWidth <= nameW + 0.5 && r.name.scrollHeight <= h2() + 0.5 ? px : 0
  }
  const plan = () => {
    const one = rows.map(fitOne)
    if (one.every(px => px > 0)) return { mode: 'one', px: Math.min(...one) }
    // the value columns give up a few px (12 at most, never under 46) before any name goes onto two lines
    if (!below) {
      const fs0 = fs
      for (fs = fs0 - 2; fs >= Math.max(46, fs0 - 12); fs -= 2) {
        measure()
        const o2 = rows.map(fitOne)
        if (o2.every(px => px > 0)) return { mode: 'one', px: Math.min(...o2) }
      }
      fs = fs0
      measure()
    }
    const tw = rows.map(fitTwo)
    if (tw.every(px => px > 0)) return { mode: 'two', px: Math.min(...tw) }
    return null
  }
  let np = plan()
  if (!np && two && lineCols.length) { below = true; measure(); np = plan() }
  if (!np) np = { mode: 'one', px: 40, squeeze: true }              // cramped one-line rows: the 40 px floor
  rows.forEach(r => {
    r.name.classList.toggle('two', np.mode === 'two')
    style(r.name, { fontSize: np.px + 'px', width: nameW + 'px', height: (below ? topH : topH - TOPPAD) + 'px', top: (below ? 0 : TOPPAD) + 'px' })
    if (np.squeeze) fitText(r.name, nameW, { minPx: 40, step: 1 })
    r.nameFs = parseFloat(r.name.style.fontSize)
  })
  if (below) rows.forEach(r => r.cells.forEach(c => style(c.cell, { top: topH + 'px', height: barH + 'px' })))
  const colRight = []
  let xr = innerW - PAD
  for (let k = lineCols.length - 1; k >= 0; k--) { colRight[k] = xr; xr -= colW[k] + COLGAP }
  rows.forEach(r => cellsOf(r).forEach((c, k) => style(c.cell, { right: (innerW - colRight[k]) + 'px', width: colW[k] + 'px' })))
  // the bar's track: the full row, or (values below) up to 24 px short of the first value column
  const trackW = below ? Math.max(120, colRight[0] - colW[0] - 24) : innerW
  if (below) rows.forEach(r => style(r.track, { right: (innerW - trackW) + 'px', borderRadius: '0 0 0 11px' }))
  // a posted value slams in from up to 1.35×, scaled about its right edge: cap it so it never grows into the name
  // (or the column to its left)
  rows.forEach(r => {
    const nameRight = below ? trackW : PAD + Math.min(nameW, inkWidth(r.name))
    cellsOf(r).forEach((c, k) => {
      const ink = c.ok ? c.odo.el.offsetWidth : c.txt ? c.txt.offsetWidth : 0
      if (!ink) return
      const leftWall = k > 0 ? colRight[k - 1] : nameRight
      c.from = clamp(1 + (colRight[k] - ink - leftWall - 8) / ink, 1.04, 1.35)
    })
  })
  // two-line rows: the money cell sits right on the bar line, so its slam grows up and left from the figure's
  // baseline (never down into the bar label riding the bar's end) and starts no bigger than the room above it
  // inside the row allows (about 1.15×)
  if (two && !below) rows.forEach(r => r.cells.forEach(c => {
    const cellH = topH - TOPPAD, f = cellFs(), base = Math.min(cellH, (cellH + f) / 2)
    style(c.cell, { transformOrigin: `100% ${((base / cellH) * 100).toFixed(1)}%` })
    c.from = Math.max(1, Math.min(c.from, (base + TOPPAD) / f))
  }))
  if (two) rows.forEach(r => { if (r.blab) { style(r.blab.odo.el, { fontSize: barFs + 'px' }); style(r.blab.q, { fontSize: barFs + 'px' }) } })
  // two-line rows: the bar label's side is decided once, from the landed bar (inside its end when the landed label
  // fits there, else just past it) and kept for the whole race: an inside label waits at the track's start until the
  // bar's end reaches it, then rides it (it never jumps across the bar's end on the landing frames)
  if (two) rows.forEach(r => {
    const c = r.blab
    if (!c || !c.ok) return
    style(c.cell, { display: 'flex' }); style(c.odo.el, { display: 'inline-flex' }); c.odo.show(c.disp)
    const lwEnd = c.odo.el.offsetWidth, fullW = barKey ? (barLen(r.o) / maxLen) * trackW : 0
    c.inside = fullW - 16 - lwEnd >= 16
    style(c.cell, { display: 'none' })
  })

  // ---------- column heads ----------
  // Every value column has its head right-aligned over it. The bar metric has none on two-line rows: its value
  // rides the bar's end ("60 MONTHS"), so a "PAID OFF IN" head over the names would label the wrong thing.
  const headEl = m => { const el = h('div', { class: 'wd-head', html: richUI(m.label || m.key), style: { top: rowsTop - headH - headGap + 'px' } }); stage.append(el); return el }
  const X0 = box.x + BORDER
  const colHeads = showHeads ? lineCols.map(m => headEl(m)) : []
  const leftLimit = X0 + PAD
  // right-to-left: each head right-aligned over its column, pushed left of its right-hand neighbour (24 px apart,
  // so a long head reaches over the next column's slack); if the leftmost one then runs past the names' edge,
  // every head shrinks together (36 px at worst)
  const placeHeads = px => {
    let nextLeft = Infinity
    const pos = []
    for (let k = colHeads.length - 1; k >= 0; k--) {
      style(colHeads[k], { fontSize: px + 'px', width: 'auto' })
      const w = Math.ceil(colHeads[k].scrollWidth) + 1
      const right = Math.min(X0 + colRight[k], nextLeft - 24)
      pos[k] = { left: right - w, w }
      nextLeft = right - w
    }
    return { pos, fits: nextLeft >= leftLimit }
  }
  let headPx = 40, hp = placeHeads(headPx)
  while (!hp.fits && headPx > 36) hp = placeHeads(--headPx)
  hp.pos.forEach((q, k) => style(colHeads[k], { left: q.left + 'px', width: q.w + 'px', textAlign: 'right' }))

  // ---------- pointer (decoration): a chevron in the left margin that jumps to the active row ----------
  const ptr = s('svg', { class: 'wd-ptr', 'data-deco': '', width: 34, height: 44, viewBox: '0 0 34 44', style: { left: box.x - 50 + 'px' } },
    s('path', { d: 'M4 4L30 22L4 40Z', fill: C.white }))
  stage.append(ptr)
  const ptrPath = ptr.firstChild

  // ---------- hero: the stake on the intro, then the money metric of the active option ----------
  // the metric tag beside the number (Inter caps; a long label wraps to two balanced lines); one inner span, so a
  // label with markup stays one flex child
  const mkTag = label => {
    const el = h('div', { class: 'wd-tag', html: `<span>${richUI(label)}</span>` })
    stage.append(el)
    const w1 = Math.ceil(el.offsetWidth) + 2
    el.remove()
    return { el, two: w1 > 260, w: Math.min(260, w1) }
  }
  const tag0 = heroMetric ? mkTag(heroMetric.label) : null
  const tagEl = tag0 ? tag0.el : h('div', { class: 'wd-tag' })
  const tagW = tag0 ? tag0.w : 0
  const TAGGAP = 26
  const hero = heroRow(stage, L, { maxInt: 9, maxDp: 2 })
  const heroBox = L.hero
  // the payoff the hero rolls to when the winner lands (see the header): a winner value the verdict quotes, else the
  // winner's money delta, else nothing (the hero keeps the winner's own value)
  let endKey = null, endDisp = null, endTag = null, endFrom = null, endFromCol = null
  if (winner >= 0) {
    const wo = opts[winner]
    const vtext = bare(spec.verdict && spec.verdict.text ? spec.verdict.text : '')
    const quoted = metrics.find(m => { const dv = val(wo, m.key); return dv && isFinite(parseDisplay(dv).value) && vtext.includes(dv) })
    const deltaOK = wo.delta && heroMetric && isFinite(parseDisplay(wo.delta).value)
    // a money delta on a money hero, or a duration delta ("≈ 10 years sooner") on a duration hero
    const sameKind = deltaOK && ((isMoney(wo.delta) && isMoney(val(wo, heroKey))) || (!isMoney(wo.delta) && isFinite(monthsOf(wo.delta)) && isFinite(monthsOf(val(wo, heroKey)))))
    const own = heroKey ? parseDisplay(val(wo, heroKey)) : null, base0 = heroKey ? parseDisplay(val(opts[0], heroKey)) : null
    if (lo.heroEnd === 'value' && own && isFinite(own.value) && winner > 0 && isFinite(base0.value)) {
      // heroEnd 'value': the winner's own value, rolled down (or up) from the first option's: the gap between them is
      // the motion, and the delta is left to the verdict
      endDisp = val(wo, heroKey); endTag = heroMetric.label; endFrom = base0.value * base0.scale; endFromCol = moneyCol(opts[0])
    } else if (sameKind) { endDisp = String(wo.delta); endTag = heroMetric.label }
    else if (quoted) { endKey = quoted.key; endDisp = val(wo, quoted.key); endTag = quoted.label }
    // lookOpts.endTag: the payoff's own tag (false: none)
    if (endDisp && lo.endTag === false) endTag = null
    else if (endDisp && typeof lo.endTag === 'string' && lo.endTag) endTag = lo.endTag
  }
  const END_ROLL = 1.0
  // data.winnerT: the payoff lands on it; the roll (and the board's winner beat) starts END_ROLL + 0.04 s before, not
  // before verdict.t (a shorter roll then still lands on it)
  let endRoll = END_ROLL
  if (winner >= 0 && d.winnerT != null && Number.isFinite(+d.winnerT)) {
    if (endDisp) {
      winT = Math.max(vT != null ? vT : -Infinity, +d.winnerT - 0.04 - END_ROLL)
      endRoll = Math.max(0.4, +d.winnerT - 0.04 - winT)
    } else winT = +d.winnerT
  }
  const tagEnd = !endTag ? null : heroMetric && endTag !== heroMetric.label ? mkTag(endTag) : tag0
  const endTpl = endDisp ? parseDisplay(endDisp) : null
  {
    // measure every display the hero will land on at full size (the metric values carry the tag beside them, the
    // stake doesn't) and shrink the odometer until the widest group fits the 960 px row at the biggest landing
    // bump (×1.1, plus a little air)
    const room = heroBox.w / 1.12
    let f = 1
    const shows = [...(heroKey ? opts.map(o => ({ disp: val(o, heroKey), sp: tagW ? tagW + TAGGAP : 0 })) : []), { disp: stake.value, sp: 0 },
      ...(endDisp ? [{ disp: endDisp, sp: tagEnd ? tagEnd.w + TAGGAP : 0 }] : [])]
    for (const { disp, sp } of shows) {
      if (!disp || !isFinite(parseDisplay(disp).value)) continue
      hero.show(disp)
      const ow = hero.odo.el.offsetWidth
      if (ow + sp > room) f = Math.min(f, (room - sp) / ow)
    }
    if (f < 1) style(hero.odo.el, { fontSize: Math.floor(heroBox.size * Math.max(0.4, f)) + 'px' })
  }
  for (const tg of new Set([tag0, tagEnd].filter(Boolean))) {
    hero.el.append(tg.el)
    style(tg.el, { height: heroBox.h + 'px', width: tg.w + 'px', whiteSpace: tg.two ? 'normal' : 'nowrap', textWrap: 'balance' })
    fitText(tg.el, tg.w, { maxH: heroBox.h - 8, minPx: 42 })   // 42: the hero's 3% dip keeps it >= 40
    style(tg.el, { display: 'none' })
  }
  const glowFor = col => `drop-shadow(0 0 var(--glow, 16px) ${rgba(col, 'var(--glowA, 0.38)')})`

  // ---------- label stack: [intro], then per option [payment / NAME] and [payment / DELTA] ----------
  const items = [], idx = []
  if (intro) items.push({ l1: ax(esc(stake.terms || '')), l2: rich(stake.label || '') })
  const labelSteps = (Array.isArray(lo.labelSteps) ? lo.labelSteps : []).filter(x => x && Number.isFinite(+x.t) && Number.isInteger(x.option) && x.option >= 0 && x.option < n && x.text)
  opts.forEach((o, oi) => {
    const at = { name: items.length, steps: [] }
    const bare1 = oi === 0 && !intro && lo.firstName === false && !!o.detail
    items.push({ l1: o.detail ? rich(o.detail) : '', l2: bare1 ? '' : rich(o.name) })
    for (const st of labelSteps.filter(x => x.option === oi).sort((a, b) => a.t - b.t)) {
      at.steps.push({ t: +st.t, idx: items.length })
      items.push({ l1: o.detail ? rich(o.detail) : '', l2: rich(String(st.text)), l2Color: toneOf(o) === 'neutral' ? C.white : toneColor(toneOf(o)) })
    }
    if (o.delta) { at.delta = items.length; items.push({ l1: o.detail ? rich(o.detail) : '', l2: rich(o.delta), l2Color: toneOf(o) === 'neutral' ? C.white : toneColor(toneOf(o)) }) }
    idx.push(at)
  })
  const labels = labelStack(stage, L, items)
  // labelSteps[].small: that step's line 2 one size down (x 0.88, 54 px at least), so the hero stays the focal number
  opts.forEach((o, oi) => idx[oi].steps.forEach(st => {
    const src = labelSteps.find(x => x.option === oi && +x.t === st.t)
    if (!src || !src.small) return
    const l2 = labels.groups[st.idx].children[1]
    style(l2, { fontSize: Math.max(54, Math.round(parseFloat(getComputedStyle(l2).fontSize) * 0.88)) + 'px' })
  }))
  const flash = stageFlash(stage, L)

  // ---------- sound: thud on each cut, a roll while the bar races, ding on landing, pop for the delta ----------
  beats.forEach(b => {
    if (b.cut > 0.05) ctx.cue(b.cut, 'thud', { gain: 0.65 })
    const r0 = Math.max(0, b.start)
    if (b.land - r0 > 0.25) ctx.cue(r0, 'roll', { dur: Math.max(0.3, b.land - r0 - 0.05), gain: 0.6 })
    ctx.cue(b.land, 'ding', { gain: 0.5 })
    if (b.deltaT != null) ctx.cue(b.deltaT, 'pop', { gain: 0.45 })
  })
  for (const st of labelSteps) ctx.cue(+st.t, 'pop', { gain: 0.4 })
  if (winT != null) ctx.cue(winT + 0.3, 'cash', { gain: 0.55 })
  // reads: the hero answers the voice when it speaks the number on screen
  const readList = (Array.isArray(lo.reads) ? lo.reads : []).map(r => (r && typeof r === 'object' ? r : { t: r }))
    .filter(r => Number.isFinite(+r.t) && +r.t > 0.05)
  const heroReads = readList.filter(r => r.option == null).map(r => +r.t)
  // cell reads: { t, option, metric }: that row's posted cell (or the bar's label) bumps and glows
  const cellReads = readList.filter(r => Number.isInteger(r.option) && r.option >= 0 && r.option < n).map(r => {
    const key = r.metric || (sideMetrics.some(m => m.key === heroKey) ? heroKey : (sideMetrics[0] || barMetric || {}).key)
    const row = rows[r.option]
    const c = key === barKey ? row.blab : row.cells.find(x => x.m.key === key)
    return c ? { t: +r.t, c } : null
  }).filter(Boolean)
  for (const rt of heroReads) ctx.cue(rt, 'tick', { gain: 0.45 })
  for (const r of cellReads) ctx.cue(r.t, 'tick', { gain: 0.45 })
  // (a held peak: up in 0.08 s, held 0.3 s, down in 0.25 s; up to 16%, less where the cell has less room)
  const readEnv = (t, t0) => (t < t0 ? 0 : t < t0 + 0.08 ? ease.out(prog(t, t0, 0.08)) : t < t0 + 0.38 ? 1 : 1 - ease.inOut(prog(t, t0 + 0.38, 0.25)))
  const readOf = (c, t) => {
    let sc = 1, gl = 0
    for (const r of cellReads) if (r.c === c) { const e = readEnv(t, r.t); sc *= 1 + clamp(c.from - 1, 0.08, 0.16) * e; gl = Math.max(gl, e) }
    return { sc, gl }
  }
  // the label stack steps back (to 55%) while a row cell is read, so the read cell is the one focal number
  const labelDim = t => { let e = 0; for (const r of cellReads) e = Math.max(e, readEnv(t, r.t)); return 1 - 0.45 * e }
  const readGlow = (gl, col) => (gl > 0.001 ? `drop-shadow(0 0 ${(4 + 18 * gl).toFixed(1)}px ${rgba(col, (0.85 * gl).toFixed(3))})` : 'none')
  if (winT != null && endDisp) ctx.cue(winT + 0.04, 'roll', { dur: endRoll - 0.1, gain: 0.45 })

  const duration = durationOf(spec, lastBeat, d.hold ?? M.hold)
  const activeAt = t => { let k = -1; for (let j = 0; j < n; j++) if (t >= beats[j].cut) k = j; return k }

  return {
    duration,
    layout: L,
    seek(t) {
      const k = activeAt(t)
      const won = winT != null && t >= winT
      const wp = won ? prog(t, winT, 0.5) : 0

      // ---- rows ----
      rows.forEach((r, i) => {
        const b = beats[i]
        const started = t >= b.cut
        const isWin = won && i === winner
        const p = clamp((t - b.start) / Math.max(0.05, b.dur))
        const running = t >= b.start
        // fill: honest length on one shared scale; races linearly (a clock) and stops dead at the payoff
        const fullW = barKey ? (barLen(r.o) / maxLen) * trackW : 0
        const fw = running ? fullW * p : 0
        const racing = running && t < b.land
        const edgeA = racing ? 1 : running ? 0.55 + 0.45 * flashAt(t, b.land, 0.5) : 0
        if (isWin) {
          style(r.fill, { width: fw.toFixed(1) + 'px', background: two ? C.green : DEEP.green, boxShadow: two ? `0 0 ${(18 * wp).toFixed(1)}px ${rgba(C.green, 0.7)}` : 'none' })
          style(r.edge, { left: fw.toFixed(1) + 'px', opacity: '1', backgroundImage: `linear-gradient(${C.green}, ${C.green})`, boxShadow: `0 0 22px ${rgba(C.green, 0.9)}` })
        } else {
          style(r.fill, { width: fw.toFixed(1) + 'px', background: DEEP[r.kind], boxShadow: 'none' })
          style(r.edge, { left: fw.toFixed(1) + 'px', opacity: (fw > 1 ? edgeA : 0).toFixed(3), backgroundImage: `linear-gradient(${bright[r.kind]}, ${bright[r.kind]})`,
            boxShadow: `0 0 ${racing ? 22 : 10}px ${rgba(bright[r.kind], 0.8)}` })
        }

        // row light: white while active (a flare on landing); the winner glows green from winT, the rest dim
        let lit = 0, tone = C.white
        if (i === k && !won) lit = clamp(prog(t, b.cut, 0.12)) * (0.7 + 0.3 * flashAt(t, b.land, 0.6))
        if (isWin) { tone = C.green; lit = Math.min(1, wp * 2) + 0.6 * flashAt(t, winT, 0.9) }
        // (no undershoot below 1: the row's 40 px text never dips under the type floor)
        const rs = Math.max(1, bump(t, b.cut, { amp: 0.03, dur: 0.3 })) * (isWin ? Math.max(1, bump(t, winT, { amp: 0.045, dur: 0.45 })) : 1)
        style(r.el, { '--lit': clamp(lit, 0, 1.6).toFixed(3), '--tone': tone, transform: `scale(${rs.toFixed(4)})`,
          opacity: won && i !== winner ? (1 - 0.5 * wp).toFixed(3) : '1' })
        style(r.name, { color: started || won ? C.white : C.grey })

        // side cells: the hero's metric (and anything that can't roll: dates, words) is posted with a slam when the
        // race lands; the others roll with the bar
        for (const c of r.cells) {
          if (!c.ok && !c.txt) { style(c.q, { display: 'none' }); style(c.odo.el, { display: 'none' }); continue }
          let show = false, v = null, sc = 1
          if (c.posted || !c.roll) {
            show = t >= b.land
            // the slam lands with an undershoot; keep it off rows whose text would dip under the 40 px floor
            if (show) { sc = slam(t, b.land, { from: c.from }).s; if (cellFs() * 0.94 < 40) sc = Math.max(1, sc) }
          } else if (running) {
            show = true
            if (t < b.land) v = p * c.tpl.value * c.tpl.scale
          }
          style(c.q, { display: show ? 'none' : 'inline' })
          style(c.odo.el, { display: show && c.ok ? 'inline-flex' : 'none' })
          if (c.txt) style(c.txt, { display: show ? 'inline' : 'none' })
          if (show && c.ok) { if (v != null) c.odo.set(v, c.tpl, true); else c.odo.show(c.disp) }   // "≈" unlit while it runs
          // a read: the VO speaks this posted value (bump + glow in its own colour)
          const rd = show ? readOf(c, t) : { sc: 1, gl: 0 }
          sc *= rd.sc
          style(c.cell, { transform: sc !== 1 ? `scale(${sc.toFixed(4)})` : 'none', filter: readGlow(rd.gl, cellCol(r.o, c.disp)) })
        }
        // the bar metric: rolls with the bar; rides inside the bar's end when it fits, else just past it
        if (r.blab) {
          const c = r.blab
          if (!c.ok) { style(c.cell, { display: 'none' }) }
          else {
            const show = running
            if (show) { if (t < b.land) c.odo.set(p * c.tpl.value * c.tpl.scale, c.tpl, true); else c.odo.show(c.disp) }
            style(c.q, { display: show || two ? 'none' : 'inline' })
            style(c.odo.el, { display: show ? 'inline-flex' : 'none' })
            const rd = show ? readOf(c, t) : { sc: 1, gl: 0 }
            style(c.cell, { transform: rd.sc !== 1 ? `scale(${rd.sc.toFixed(4)})` : 'none', transformOrigin: '0% 50%', filter: readGlow(rd.gl, C.white) })
            if (two) {
              style(c.cell, { display: show ? 'flex' : 'none' })
              const lw = show ? c.odo.el.offsetWidth : 0
              const inside = c.inside && fw - 16 - lw >= 16
              const x = c.inside ? Math.max(16, fw - 16 - lw) : Math.min(fw + 14, trackW - lw - 8)
              // (while the bar's end passes under the waiting label, its bright edge steps back)
              if (c.inside && !inside && fw > 1) style(r.edge, { opacity: '0.25' })
              style(c.cell, { left: x.toFixed(1) + 'px' })
              style(c.odo.el, { color: isWin && inside ? C.panel : C.white })
            } else {
              style(c.cell, { display: 'flex' })
            }
          }
        }
      })

      // ---- pointer ----
      if (k < 0 && !won) style(ptr, { display: 'none' })
      else {
        const target = won ? winner : k
        const from = won ? (k >= 0 ? k : target) : Math.max(0, k - 1)
        const mv = won ? prog(t, winT, 0.22) : k > 0 ? prog(t, beats[k].cut, 0.2) : 1
        const y = lerp(rowY(from), rowY(target), ease.out(mv)) + rowH / 2 - 22
        const pulse = won ? bump(t, winT, { amp: 0.3, dur: 0.4 }) : bump(t, beats[k].cut, { amp: 0.3, dur: 0.4 })
        style(ptr, { display: 'block', top: y.toFixed(1) + 'px', transform: `scale(${pulse.toFixed(3)})` })
        attr(ptrPath, 'fill', won ? C.green : C.white)
      }

      // ---- hero ----
      let hDisp = null, hTpl = null, hv = 0, hCol = C.green, tagOn = false, ghost = false
      const ending = won && !!endDisp
      if (ending) {
        // the payoff: rolls up from zero to the winner's delta (or the value the verdict quotes) and lands on it
        const p = prog(t, winT + 0.04, endRoll)
        tagOn = true; hCol = toneOf(opts[winner]) === 'bad' ? C.red : C.green
        if (p >= 1) hDisp = endDisp
        else if (endFrom != null) {
          // from the baseline's value, in its colour, to the winner's own (it turns as it rolls)
          hTpl = endTpl; hv = lerp(endFrom, endTpl.value * endTpl.scale, ease.inOut(p)); ghost = true
          hCol = mixHex(endFromCol, hCol, ease.inOut(prog(p, 0.35, 0.65)))
        } else { hTpl = endTpl; hv = ease.out(p) * endTpl.value * endTpl.scale; ghost = true }
      } else if (!heroKey) hDisp = stake.value
      else if (won) { hDisp = val(opts[winner], heroKey); hCol = moneyCol(opts[winner]); tagOn = true }
      else if (k < 0) hDisp = stake.value
      else {
        const o = opts[k], b = beats[k]
        const disp = val(o, heroKey), tpl = parseDisplay(disp)
        tagOn = true; hCol = moneyCol(o)
        if (t >= b.land || !isFinite(tpl.value)) hDisp = disp
        else if (t < b.start) {
          // cut → race start: the hero holds the previous option's exact score (or the stake)
          if (k > 0) { hDisp = val(opts[k - 1], heroKey); hCol = moneyCol(opts[k - 1]) } else { hDisp = stake.value; tagOn = false; hCol = C.green }
        } else {
          // the race: from the previous option's landed score (or zero) to this one's, on the race clock
          const pv = k > 0 && lo.heroRoll !== 'zero' ? parseDisplay(val(opts[k - 1], heroKey)) : null
          const from = pv && isFinite(pv.value) ? pv.value * pv.scale : 0
          hTpl = tpl; hv = lerp(from, tpl.value * tpl.scale, accrue(prog(t, b.start, b.dur))); ghost = true
        }
      }
      if (hTpl) hero.set(hv, hTpl, ghost)
      else if (hDisp && isFinite(parseDisplay(hDisp).value)) hero.show(hDisp)
      else hero.show(stake.value || '0')
      style(hero.odo.el, { color: hCol })
      style(hero.glow, { filter: glowFor(hCol) })
      // the metric tag beside the number; the group stays centred on x 540
      const tg = tagOn ? (ending ? tagEnd : tag0) : null
      const space = tg ? tg.w + TAGGAP : 0
      for (const x of new Set([tag0, tagEnd].filter(Boolean))) style(x.el, { display: x === tg ? 'flex' : 'none' })
      style(hero.glow, { paddingLeft: space + 'px' })
      if (tg) style(tg.el, { left: (heroBox.w / 2 - (hero.odo.el.offsetWidth + space) / 2).toFixed(1) + 'px' })

      // landing bumps + glow flares; a small dip on each cut
      let sc = 1, glow = 0
      for (const b of beats) {
        if (b.cut > 0.05) sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, b.cut, 0.28))
        sc *= bump(t, b.land, { amp: 0.08, dur: M.bump })
        if (t >= b.land) glow = Math.max(glow, 0.6 * (1 - ease.out(prog(t, b.land, 0.6))))
      }
      for (const rt of heroReads) {
        sc *= bump(t, rt, { amp: 0.06, dur: M.bump })
        if (t >= rt) glow = Math.max(glow, 0.5 * (1 - ease.out(prog(t, rt, 0.6))))
      }
      if (winT != null) {
        const hit = endDisp ? winT + 0.04 + endRoll : winT
        if (endDisp) sc *= 1 - 0.03 * Math.sin(Math.PI * prog(t, winT, 0.28))
        sc *= bump(t, hit, { amp: 0.1, dur: 0.45 })
        if (t >= hit) glow = Math.max(glow, 1 - ease.out(prog(t, hit, 1.1)))
      }
      style(hero.el, { transform: `scale(${sc.toFixed(4)})` })
      style(hero.glow, { '--glow': (16 + 30 * glow).toFixed(1) + 'px', '--glowA': (0.38 + 0.45 * glow).toFixed(3) })

      // ---- stage bloom: a small one on each landing, a big one for the winner ----
      let fl = 0
      for (const b of beats) fl = Math.max(fl, 0.16 * flashAt(t, b.land, 0.45))
      if (winT != null) fl = Math.max(fl, 0.5 * flashAt(t, winT, 0.9))
      flash.set(fl)

      // ---- label stack ----
      if (k < 0) labels.seek(t, intro ? 0 : idx[0].name, 0)
      else {
        const at = idx[k], b = beats[k]
        let cur = at.name, t0 = k === 0 && !intro ? 0 : b.cut
        for (const st of at.steps) if (t >= st.t) { cur = st.idx; t0 = st.t }
        if (at.delta != null && b.deltaT != null && t >= b.deltaT) { cur = at.delta; t0 = b.deltaT }
        labels.seek(t, cur, t0)
        const dim = labelDim(t)
        if (dim < 0.999) style(labels.groups[cur], { opacity: (parseFloat(labels.groups[cur].style.opacity || '1') * dim).toFixed(3) })
      }
      // (the verdict, the label stack's yield and the footer steps are the chrome's)
    },
  }
}
